<template>
  <main>
    <!-- Introduction -->
    <section class="mb-8 py-20 text-white text-center relative">
      <div
        class="absolute inset-0 w-full h-full bg-contain introduction-bg"
        style="background-image: url(assets/img/header.png)"
      ></div>
      <div class="container mx-auto">
        <div class="text-white main-header-content">
          <h1 class="font-bold text-5xl mb-5">Listen to Great Music!</h1>
          <p class="w-full md:w-8/12 mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            et dolor mollis, congue augue non, venenatis elit. Nunc justo eros,
            suscipit ac aliquet imperdiet, venenatis et sapien. Duis sed magna
            pulvinar, fringilla lorem eget, ullamcorper urna.
          </p>
        </div>
      </div>

      <img
        class="relative block mx-auto mt-5 -mb-20 w-auto max-w-full"
        src="/assets/img/introduction-music.png"
      />
    </section>

    <!-- Main Content -->
    <section class="container mx-auto">
      <div
        class="bg-white rounded border border-gray-200 relative flex flex-col"
      >
        <div
          class="px-6 pt-6 pb-5 font-bold border-b border-gray-200"
          v-icon-secondry="{ icon: 'headphones-alt', right: true }"
        >
          <span class="card-title">Audios</span>
          <!-- Icon -->
          <!-- I'm using a locale directive to show this icon-->
        </div>
        <!-- Playlist -->
        <ol id="playlist">
          <template v-for="audio in audios" :key="audio.uid">
            <AppAudioItem :audio="audio" />
          </template>
        </ol>
        <!-- .. end Playlist -->
      </div>
    </section>
  </main>
</template>

<script>
import { audiosCollection } from "@/includes/firebase";
import AppAudioItem from "../components/audioItem.vue";
import IconSecondary from "@/directives/icon-secondary";
export default {
  name: "Home",
  components: { AppAudioItem },
  directives: {
    "icon-secondry": IconSecondary,
  },
  data() {
    return {
      audios: [],
      maxPerPage: 6,
      pendingReq: false,
    };
  },
  methods: {
    async getAudios() {
      if (this.pendingReq) return;

      this.pendingReq = true;

      let snapshots;

      if (this.audios.length) {
        const lastDoc = await audiosCollection
          .doc(this.audios[this.audios.length - 1].docId)
          .get();
        snapshots = await audiosCollection
          .orderBy("modified_name")
          .startAfter(lastDoc)
          .limit(this.maxPerPage)
          .get();
      } else {
        snapshots = await audiosCollection
          .orderBy("modified_name")
          .limit(this.maxPerPage)
          .get();
      }
      snapshots.forEach((doc) => {
        this.audios.push({
          docId: doc.id,
          ...doc.data(),
        });
      });

      this.pendingReq = false;
    },
    handlScroll() {
      const { scrollTop, offsetHeight } = document.documentElement;
      const { innerHeight } = window;
      const bottomOfWindow =
        Math.round(scrollTop) + innerHeight === offsetHeight;
      if (bottomOfWindow) {
        this.getAudios();
      }
    },
  },
  async created() {
    this.getAudios();
    window.addEventListener("scroll", this.handlScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handlScroll);
  },
};
</script>

<style></style>
