import * as VueRouter from "vue-router";
import { RouteRecordRaw } from "vue-router";
import DiscoverMusicRoute from "@views/DiscoverMusic/routes";
import Podcast from "@views/Podcast/routes";

const routes: Readonly<RouteRecordRaw[]> = [DiscoverMusicRoute, Podcast];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
});

export default router;
