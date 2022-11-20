<template>
  <!-- Music Header -->
  <section class="w-full mb-8 py-14 text-center text-white relative">
    <div
      class="absolute inset-0 w-full h-full box-border bg-contain music-bg"
      style="background-image: url(/assets/img/song-header.png)"
    ></div>
    <div class="container mx-auto flex items-center">
      <!-- Play/Pause Button -->
      <button
        @click.prevent="newAudio(audio)"
        type="button"
        class="z-50 h-24 w-24 text-3xl bg-white text-black rounded-full focus:outline-none"
      >
        <i :class="{ 'fa fa-play': !playing }" class="fa fa-pause"></i>
      </button>
      <div class="z-50 text-left ml-8">
        <!-- Song Info -->
        <div class="text-3xl font-bold">{{ audio.modified_name || `...` }}</div>
        <div>{{ audio.genrre }}</div>
      </div>
    </div>
  </section>
  <!-- Form -->
  <section class="container mx-auto mt-6">
    <div class="bg-white rounded border border-gray-200 relative flex flex-col">
      <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
        <!-- Comment Count -->
        <span class="card-title"
          >Comments ({{ audio.comment_count || `...` }})</span
        >
        <i class="fa fa-comments float-right text-green-400 text-2xl"></i>
      </div>
      <div class="p-6">
        <div
          v-if="comment_show_alert"
          class="text-white text-center font-bold p-4 mb-4"
          :class="comment_alert_variant"
        >
          {{ comment_alert_msg }}
        </div>
        <vee-form
          v-if="userLoggedIn"
          :validation-schema="commentSchema"
          @submit="addComment"
        >
          <vee-field
            as="textarea"
            name="comment"
            class="block w-full pt-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded mb-1"
            placeholder="Your comment here..."
          />
          <ErrorMessage class="text-red-600" name="comment" />
          <button
            :disabled="comment_in_submission"
            type="submit"
            class="mt-1.5 py-1.5 px-3 rounded text-white bg-green-600 block"
          >
            Add Comment
          </button>
        </vee-form>
        <!-- Sort Comments -->
        <select
          v-model="sort"
          class="block mt-4 py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        >
          <option value="1">Latest</option>
          <option value="2">Oldest</option>
        </select>
      </div>
    </div>
  </section>
  <!-- Comments -->
  <ul class="container mx-auto">
    <li
      v-for="comment in sortedComments"
      :key="comment.docId"
      class="p-6 bg-gray-50 border border-gray-200"
    >
      <!-- Comment Author -->
      <div class="mb-5">
        <div class="font-bold">{{ comment.name }}</div>
        <time>{{ comment.datePosted }}</time>
      </div>

      <p>
        {{ comment.content }}
      </p>
    </li>
  </ul>
</template>

<script>
import {
  audiosCollection,
  commentsCollection,
  auth,
} from "@/includes/firebase";
import { mapState, mapActions } from "pinia";
import useUserStore from "@/stores/user";
import usePlayerStore from "@/stores/player";

export default {
  name: "singleAudio",
  data() {
    return {
      audio: {},
      comments: [],
      commentSchema: {
        comment: { required: true, min: 3, max: 100 },
      },
      comment_in_submission: false,
      comment_show_alert: false,
      comment_alert_variant: "bg-blue-500",
      comment_alert_msg: "Please wait! your comment is being submitted.",
      sort: 1, // latest to oldest
    };
  },
  watch: {
    sort(newVal) {
      if (newVal === this.$route.query.sort) {
        return;
      }
      this.$router.push({
        query: {
          sort: newVal,
        },
      });
    },
  },
  computed: {
    ...mapState(useUserStore, ["userLoggedIn"]),
    ...mapState(usePlayerStore, ["playing"]),
    audioId() {
      return this.$route.params.id || "";
    },
    sortedComments() {
      return this.comments.slice().sort((a, b) => {
        if (this.sort == 1) {
          return new Date(b.datePosted) - new Date(a.datePosted);
        }
        return new Date(a.datePosted) - new Date(b.datePosted);
      });
    },
  },
  methods: {
    ...mapActions(usePlayerStore, ["newAudio", "toggleAudio"]),
    async addComment(values, { resetForm }) {
      this.comment_in_submission = true;
      this.comment_show_alert = true;
      this.comment_alert_variant = "bg-blue-500";
      this.comment_alert_msg = "Please wait! your comment is being submitted.";
      const comment = {
        content: values.comment,
        datePosted: new Date().toString(),
        aid: this.audioId,
        name: auth.currentUser.displayName,
        uid: auth.currentUser.uid,
      };
      await commentsCollection.add(comment);

      this.audio.comment_count += 1;
      await audiosCollection.doc(this.audioId).update({
        comment_count: this.audio.comment_count,
      });

      this.comments.push(comment); // await this.getComments(); // to save saving get comments request

      this.comment_in_submission = false;
      this.comment_alert_variant = "bg-green-500";
      this.comment_alert_msg = "Comment Added!";

      resetForm();
    },
    async getAudioData() {
      const docSnapshot = await audiosCollection.doc(this.audioId).get();
      if (!docSnapshot.exists) {
        this.$router.push({ name: "home" });
        return;
      }
      const { sort } = this.$route.query;
      this.sort = sort || "1";
      this.audio = docSnapshot.data();
      await this.getComments();
    },
    async getComments() {
      const snapshots = await commentsCollection
        .where("aid", "==", this.audioId)
        .get();
      this.comments = [];
      snapshots.forEach((doc) => {
        this.comments.push({
          docId: doc.id,
          ...doc.data(),
        });
      });
    },
  },
  async created() {
    this.getAudioData();
  },
};
</script>

<style></style>
