import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import veeValidatePlugin from "./includes/validation";
import { auth } from "./includes/firebase";
import Icon from "./directives/icon";
import i18n from "./includes/i18n";
import { registerSW } from "virtual:pwa-register";
//register any components globally
import GlobalComponents from "./includes/_globals"
import progressBar from "./includes/progress-bar"

import "./assets/base.css";
import "./assets/main.css";
import "nprogress/nprogress.css"

registerSW({ immediate: true });

progressBar(router);

let app;

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);

    //registering pinia plugin
    app.use(createPinia());

    //registering routerplugin
    app.use(router);

    //register vee-validate
    app.use(veeValidatePlugin);

    // For internationalization
    app.use(i18n);

    // !!!!
    app.use(GlobalComponents);

    //Directive
    app.directive("Icon", Icon);

    app.mount("#app");
  }
});
