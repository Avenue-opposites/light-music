<!-- 歌单包装器 -->
<template>
    <article class="playlist-wrapper">
        <RouterView></RouterView>
    </article>
</template>

<script setup lang="ts">
import { onActivated } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
onActivated(() => {
    const path = "/boutiquePlaylist";
    if (router.currentRoute.value.path === path) {
        router.push(path);
    } else {
        router.push("/playlist");
    }
});
</script>

<style lang="less" scoped>
.playlist-wrapper {}
</style>