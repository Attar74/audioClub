<template>
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <div class="col-span-1">
        <app-upload ref="upload" :addAudio="addAudio" />
      </div>
      <div class="col-span-2">
        <div
          class="bg-white rounded border border-gray-200 relative flex flex-col"
        >
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">My Songs</span>
            <i
              class="fa fa-compact-disc float-right text-green-400 text-2xl"
            ></i>
          </div>
          <div class="p-6">
            <composition-item
              v-for="(audio, i) in audios"
              :key="audio.docId"
              :audio="audio"
              :updateAudio="updateAudio"
              :removeAudio="removeAudio"
              :updateUnsavedFlag="updateUnsavedFlag"
              :index="i"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// import useUserStore from "@/stores/user";
import AppUpload from "@/components/Upload.vue";
import CompositionItem from "@/components/CompositionItem.vue";
import { audiosCollection, auth } from "@/includes/firebase";
export default {
  name: "Manage",
  components: { AppUpload, CompositionItem },
  data() {
    return {
      audios: [],
      unsavedFlag: false,
    };
  },
  methods: {
    async getAudios() {
      const snapshot = await audiosCollection
        .where("uid", "==", auth.currentUser.uid)
        .get();
      snapshot.forEach(this.addAudio);
    },
    updateAudio(audioIndex, values) {
      this.audios[audioIndex].modified_name = values.modified_name;
      this.audios[audioIndex].genrre = values.genrre;
    },
    removeAudio(audioIndex) {
      this.audios.splice(audioIndex, 1);
    },
    addAudio(document) {
      const audio = {
        ...document.data(),
        docId: document.id,
      };
      this.audios.push(audio);
    },
    updateUnsavedFlag(val) {
      this.unsavedFlag = val;
    },
  },
  async created() {
    await this.getAudios();
  },
  beforeRouteLeave(to, from, next) {
    if (!this.unsavedFlag) {
      next();
    } else {
      const leave = confirm(
        "You have unsaved changes, Are You sure you want to leave!"
      );
      next(leave);
    }
  },
  // beforeRouteLeave(to, from, next) {
  //   this.$refs.upload.cancelUploads();
  //   next();
  // },
  /////////////local guard///////////////
  //   beforeRouteEnter(to, from, next) {
  //     const store = useUserStore();
  //     if (store.userLoggedIn) {
  //       next();
  //     } else {
  //       next({ name: "home" });
  //     }
  //   },
};
</script>
