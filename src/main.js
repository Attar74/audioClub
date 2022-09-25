import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/base.css";
import "./assets/main.css";

const app = createApp(App);

//registering pinia plugin
app.use(createPinia());

//registering routerplugin
app.use(router);

app.mount("#app");
