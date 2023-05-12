<!-- 我的发现页面 -->
<template>
    <div v-size="(size: Size) => discoverMusicHeight = size.height" class="discover-music">
        <nav v-size="(size: Size) => navHeight = size.height">
            <NavLink class="nav-link" to="/personalizedRecommendation">个性推荐</NavLink>
            <NavLink class="nav-link" to="/exclusiveCustomization">专属定制</NavLink>
            <NavLink class="nav-link" to="/playlistWrapper">歌单</NavLink>
            <NavLink class="nav-link" to="/exclusiveCustomization">排行榜</NavLink>
            <NavLink class="nav-link" to="/exclusiveCustomization">歌手</NavLink>
            <NavLink class="nav-link" to="/exclusiveCustomization">最新音乐</NavLink>
        </nav>
        <el-scrollbar :height="scrollbarHeight">
            <main>
                <RouterView v-slot="{ Component }">
                    <KeepAlive>
                        <component :is="Component"></component>
                    </KeepAlive>
                </RouterView>
            </main>
        </el-scrollbar>
    </div>
</template>

<script setup lang="ts">
import NavLink from "@views/common/NavLink.vue";
import { Size } from "@/directives/size";
import { ref, computed } from "vue";
const navHeight = ref(0);
const discoverMusicHeight = ref(0);
const scrollbarHeight = computed(() => discoverMusicHeight.value - navHeight.value);
</script>
<style lang="less" scoped>
.discover-music {

    >nav {
        padding: 20px 30px;

        .nav-link {
            margin-right: 30px;
        }
    }

    main {
        padding: 0 100px;
    }
}
</style>