<!-- 推荐MV组件 -->
<template>
    <article class="recommend-mv">
        <Target>
            推荐MV
            <template #icon>
                <AngleRightIcon class="more" :size="16" />
            </template>
        </Target>
        <div class="recommend-area">
            <MVCard class="MV" v-for="{ name, artists, copywriter, playCount, picUrl } of MVs" :src="picUrl" :title="name"
                :singers="artists.map(artist => artist.name)" :remark="copywriter" :play-count="playCount" />
        </div>
    </article>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { RecommendMV } from "@/types";
import MVCard from "@/common/MVCard.vue";
import getRecommendMV from "@api/recommendMV";
const MVs = ref<RecommendMV[]>([]);
onBeforeMount(async () => {
    const { data } = await getRecommendMV();
    MVs.value = data.result;
})
</script>

<style lang="less" scoped>
.recommend-mv {
    margin: 40px 0;

    .recommend-area {
        margin-top: 10px;
        display: flex;
        flex-wrap: wrap;

        .MV {
            margin-right: 20px;
        }
    }

    .more {
        @size: 20px;
        width: @size;
        width: @size;
    }
}
</style>