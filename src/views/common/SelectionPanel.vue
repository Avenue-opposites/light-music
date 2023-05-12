<!-- 待写 -->
<template>
    <article class="selection-panel">123</article>
</template>

<script setup lang="ts">
import getBoutiquePlaylistCategory from '@/api/boutiquePlaylistCategory';
import { onBeforeMount } from 'vue';

onBeforeMount(async () => {
    const { data } = await getBoutiquePlaylistCategory();
    console.log(data);
});
</script>

<style lang="less" scoped>
.selection-panel {}
</style>