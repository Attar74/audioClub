import { createRouter, createWebHashHistory } from "vue-router";
// import useUserStore from "@/stores/user";


// next approach is acvieving lazy loading approach by importing the component only when need it
const Home   = () => import("@/views/Home.vue")
const About  = () => import ("@/views/About.vue");
const Manage = () => import ("@/views/Manage.vue");
const Audio  = () => import ("@/views/Audio.vue");

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
  {
    name: "audio",
    path: "/audio/:id",
    component: Audio,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/:catchAll(.*)*",
    redirect: { name: "home" },
  },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  linkExactActiveClass: "text-yellow-500",
});

//Global Guard
// router.beforeEach((to, from, next) => {
//   if (!to.meta.requiresAuth) {
//     next();
//     return;
//   }
//   const store = useUserStore();
//   store.userLoggedIn ? next() : next({ name: "home" });
// });
export default router;
