import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import veeValidatePlugin from "./includes/validation";
import { auth } from "./includes/firebase";
import Icon from "./directives/icon";
import i18n from "./includes/i18n";
import FlagIcon from "vue-flag-icon";

import "./assets/base.css";
import "./assets/main.css";

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

    app.use(FlagIcon);

    // For internationalization
    app.use(i18n);

    //Directive
    app.directive("Icon", Icon);

    app.mount("#app");
  }
});
