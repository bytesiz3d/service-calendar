import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";

import "@/styles/base.scss";
import "bootstrap";

import "@/common/Array.extensions";
import "@/common/types";

const pinia = createPinia();
createApp(App)
	.use(pinia)
	.mount("#app");
