// import Podcast from "@views/Podcast/Podcast.vue";
import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw = {
  path: "/podcast",
  name: "podcast",
  component: () => import("@views/Podcast/Podcast.vue"),
};

export default routes;
