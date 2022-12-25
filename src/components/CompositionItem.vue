<template>
  <!-- Composition Items -->
  <div class="border border-gray-200 p-3 mb-4 rounded">
    <div v-show="!showForm">
      <h4 class="inline-block text-2xl font-bold">{{ audio.modified_name }}</h4>
      <!-- I'm using a global directive to show this icon-->
      <button
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right"
        @click.prevent="deleteAudio"
        :disabled="in_submission"
        v-icon="'times'"
      />
      <button
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right"
        @click.prevent="showForm = !showForm"
        :disabled="in_submission"
        v-icon="'pencil-alt'"
      />
    </div>
    <div v-show="showForm">
      <div
        v-if="show_alert"
        :class="alert_variant"
        class="text-white text-center font-bold p- mb-4"
      >
        {{ alert_msg }}
      </div>
      <vee-form
        :validation-schema="schema"
        @submit="edit"
        :initial-values="audio"
      >
        <div class="mb-3">
          <label class="inline-block mb-2">{{
            $t("CompositionItem.audioTitle")
          }}</label>
          <vee-field
            name="modified_name"
            type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Audio Title"
            @input="updateUnsavedFlag(true)"
          />
          <ErrorMessage class="text-red-600 block" name="modified_name" />
        </div>
        <div class="mb-3">
          <label class="inline-block mb-2">genrre</label>
          <vee-field
            name="genrre"
            type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter genrre"
            @input="updateUnsavedFlag(true)"
          />
          <ErrorMessage class="text-red-600 block" name="genrre" />
        </div>
        <button
          type="submit"
          class="ml-1 py-1.5 px-3 rounded text-white bg-green-600"
          :disabled="in_submission"
        >
          {{ $t("CompositionItem.submit") }}
        </button>
        <button
          type="button"
          class="ml-1 py-1.5 px-3 rounded text-white bg-gray-600"
          :disabled="in_submission"
          @click.prevent="showForm = !showForm"
        >
          {{ $t("CompositionItem.goBack") }}
        </button>
      </vee-form>
    </div>
  </div>
</template>

<script>
import { audiosCollection, storage } from "@/includes/firebase";

export default {
  name: "CompositionItem",
  props: {
    audio: {
      default() {
        return {};
      },
      type: Object,
      required: true,
    },
    updateAudio: {
      type: Function,
      required: true,
    },
    removeAudio: {
      type: Function,
      required: true,
    },
    updateUnsavedFlag: {
      type: Function,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      showForm: false,
      schema: {
        modified_name: { required: true },
        genrre: { alpha_spaces: true },
      },
      in_submission: false,
      show_alert: false,
      alert_variant: "bg-blue-500",
      alert_msg: "Please wait! Deleting audio happening...",
    };
  },
  methods: {
    async deleteAudio() {
      this.in_submission = true;
      try {
        const storageRef = storage.ref();
        const audioRef = storageRef.child(`audios/${this.audio.original_name}`);
        await audioRef.delete();
        await audiosCollection.doc(this.audio.docId).delete();
        this.removeAudio(this.index);
      } catch {
        this.in_submission = false;
        this.alert_variant = "bg-red-500";
        this.alert_msg = "something went wrong! Try again later";
        return;
      } finally {
        this.in_submission = false;
      }
    },
    async edit(values) {
      this.in_submission = true;
      this.show_alert = true;
      this.alert_variant = "bg-blue-500";
      this.alert_msg = "Please wait! Updating audio happening...";
      try {
        await audiosCollection.doc(this.audio.docId).update(values);
        this.updateUnsavedFlag(false);
      } catch {
        this.in_submission = false;
        this.alert_variant = "bg-red-500";
        this.alert_msg = "something went wrong! Try again later";
        return;
      } finally {
        this.in_submission = false;
        this.alert_variant = "bg-green-500";
        this.alert_msg = "Audio! Updated successfully...";
        this.updateAudio(this.index, values);
      }
    },
  },
};
</script>
