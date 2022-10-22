import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import Manage from "@/views/Manage.vue";
import useUserStore from "@/stores/user";

const routes = [
  {
    name: "home",
    path: "/",
    component: Home,
  },
  {
    name: "about",
    path: "/about",
    component: About,
  },
  {
    name: "manage",
    // alias: "/manage", //Solve redirecting old url to new url
    path: "/manage-music",
    component: Manage,
    meta: {
      requiresAuth: true,
    },
    // beforeEnter: (to, from, next) => { //local guard
    //   console.log(to, from, next);
    // },
  },
  // {
  //   path: "/manage",
  //   redirect: { name: "manage" },
  // },
  {
    path: "/:catchAll(.*)*",
    redirect: { name: "home" },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkExactActiveClass: "text-yellow-500",
});

//Global Guard
router.beforeEach((to, from, next) => {
  if (!to.meta.requiresAuth) {
    next();
    return;
  }
  const store = useUserStore();
  store.userLoggedIn ? next() : next({ name: "home" });
});
export default router;
