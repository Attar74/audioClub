import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import veeValidatePlugin from "./includes/validation";

import "./assets/base.css";
import "./assets/main.css";

const app = createApp(App);

//registering pinia plugin
app.use(createPinia());

//registering routerplugin
app.use(router);

//register vee-validate
app.use(veeValidatePlugin);

app.mount("#app");
