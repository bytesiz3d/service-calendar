import { createPinia } from "pinia";
import { createApp } from "vue";
import VueCountdown from '@chenfengyuan/vue-countdown';
import App from "./App.vue";

import "@/styles/base.scss";
import "bootstrap";

import "@/common/Array.extensions";
import "@/common/types";

const pinia = createPinia();
createApp(App)
	.use(pinia)
	.component(VueCountdown.name, VueCountdown)
	.mount("#app");
