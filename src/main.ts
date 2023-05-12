import { createApp } from "vue";
import "./var.less";
import "./global.less";
import App from "./App.vue";
import rap from "@/directives/rap";
import size from "@/directives/size";
import "amfe-flexible";
import "bootstrap-icons/font/bootstrap-icons.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import globalComponents from "@/global/components";
import { registerGlobal } from "@/utils";
import router from "@/router";
import { createPinia } from "pinia";
import VueSplide from "@splidejs/vue-splide";
import "@splidejs/vue-splide/css";

const app = createApp(App);
const pinia = createPinia();

//注册组件到全局
registerGlobal(
  app,
  "component",
  Object.assign({}, globalComponents, ElementPlusIconsVue)
);

const body = document.body;
const div = document.createElement("div");
div.id = "popover-container";
body.appendChild(div);

app
  .use(router)
  .use(pinia)
  .use(VueSplide)
  .directive("rap", rap)
  .directive("size", size)
  .mount("#app");
