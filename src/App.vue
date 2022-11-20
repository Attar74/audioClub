<template>
  <!-- Header -->
  <appHeader @openModel="openModel($event)" />

  <router-view />

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
