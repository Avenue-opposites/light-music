import DiscoverMusic from "@views/DiscoverMusic/DiscoverMusic.vue";
import PersonalizedRecommendation from "@views/DiscoverMusic/components/PersonalizedRecommendation.vue";
import { RouteRecordRaw } from "vue-router";
// 发现音乐路由
const routes: RouteRecordRaw = {
  path: "/",
  name: "discoverMusic",
  redirect: "/personalizedRecommendation", //重定向
  component: DiscoverMusic,
  children: [
    // 个性推荐页
    {
      path: "/personalizedRecommendation",
      name: "personalizedRecommendation",
      component: PersonalizedRecommendation,
    },
    // 专属定制页
    {
      path: "/exclusiveCustomization",
      name: "exclusiveCustomization",
      component: () =>
        import("@views/DiscoverMusic/components/ExclusiveCustomization.vue"),
    },
    //歌单包装
    {
      path: "/playlistWrapper",
      name: "playlistWrapper",
      component: () =>
        import("@views/DiscoverMusic/components/PlaylistWrapper.vue"),
      children: [
        //歌单
        {
          path: "/playlist",
          name: "playlist",
          component: () =>
            import("@views/DiscoverMusic/components/Playlist.vue"),
        },
        //精品歌单
        {
          path: "/boutiquePlaylist",
          name: "boutiquePlaylist",
          component: () =>
            import("@views/DiscoverMusic/components/BoutiquePlaylist.vue"),
        },
      ],
    },
  ],
};

export default routes;
