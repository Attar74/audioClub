<template>
  <p>About</p>
</template>

<script>
import useUserStore from "@/stores/user";

export default {
  beforeRouteEnter(to, from, next) {
    const store = useUserStore();
    if (store.userLoggedIn) {
      next();
    } else {
      next({ name: "home" });
    }
  },
};
</script>

<style></style>
