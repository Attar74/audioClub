<template>
  <!-- Header -->
  <appHeader @openModel="openModel($event)" />

  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view>
  <appPlayer />

  <appAuth :modelVisibility="modelVisibility" />
</template>
<script>
import AppHeader from "@/components/Header.vue";
import AppAuth from "@/components/Auth.vue";
import appPlayer from "@/components/Player.vue";
import { mapWritableState } from "pinia";
import userStore from "@/stores/user";
import { auth } from "./includes/firebase";

export default {
  name: "App",
  components: { AppHeader, AppAuth, appPlayer },
  data() {
    return {
      modelVisibility: "hidden",
    };
  },
  computed: {
    ...mapWritableState(userStore, ["userLoggedIn"]),
  },
  methods: {
    openModel(modelVisibilityVal) {
      this.modelVisibility = modelVisibilityVal ? "" : "hidden";
    },
  },
  created() {
    this.userLoggedIn = auth.currentUser ? true : false;
  },
};
</script>
<style scoped>
.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: all 0.5s linear;
}
.fade-leave-to {
  transition: all 0.5s linear;
  opacity: 0;
}
</style>
