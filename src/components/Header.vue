<template>
  <!-- Header -->
  <header id="header" class="bg-gray-700">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <!-- App Name -->
      <router-link
        class="text-white font-bold uppercase text-2xl mr-4"
        :to="{ name: 'home' }"
        exact-active-class="no-active"
      >
        {{ $t("header.music") }}
      </router-link>

      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <!-- Navigation Links -->
          <!-- <li>
            <router-link class="px-2 text-white" :to="{ name: 'about' }">
              About
            </router-link>
          </li> -->
          <li v-if="!userStore.userLoggedIn">
            <a
              class="px-2 text-white"
              href="#"
              @click.prevent="toggleAuthModel"
            >
              {{ $t("header.login") }} / {{ $t("header.register") }}</a
            >
          </li>
          <template v-else>
            <li>
              <router-link class="px-2 text-white" :to="{ name: 'manage' }">
                {{ $t("header.manage") }}
              </router-link>
            </li>
            <li>
              <a class="px-2 text-white" href="#" @click.prevent="signout">{{
                $t("header.logout")
              }}</a>
            </li>
          </template>
        </ul>
        <ul class="flex flex-row mt-1 ml-auto">
          <li>
            <a class="px-2 text-white" href="#" @click.prevent="changeLocale">
              Switch to {{ CurrentLocale }}
            </a>
            <!-- <button>
              <flag iso="us" />
            </button> -->
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapStores } from "pinia";
import useModalStore from "@/stores/modal";
import useUserStore from "@/stores/user";

export default {
  name: "AppHeader",
  methods: {
    toggleAuthModel() {
      this.modalStore.isOpen = !this.modalStore.isOpen;
    },
    signout() {
      this.userStore.signOut();
      if (this.$route.meta.requiresAuth) {
        this.$router.push({ name: "home" });
      }
    },
    changeLocale() {
      this.$i18n.locale = this.$i18n.locale === "fr" ? "en" : "fr";
    },
  },
  computed: {
    ...mapStores(useModalStore, useUserStore),
    CurrentLocale() {
      return this.$i18n.locale === "fr" ? "English" : "French";
    },
  },
};
</script>
