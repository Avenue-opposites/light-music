<!-- 热门播客 -->
<template>
    <article class="popular-podcasts">
        <Target>
            热门播客
            <template #icon>
                <AngleRightIcon class="more" :size="16" />
            </template>
        </Target>
        <div class="podcasts">
            <Podcast v-for="{ picUrl, alg, name, rcmdText, category, secondCategory } of personalizeRecommendList"
                :src="picUrl" :alt="alg" :title="name" :description="rcmdText" :tags="[category, secondCategory]" />
        </div>
    </article>
</template>

<script setup lang="ts">
import Podcast from "@views/DiscoverMusic/common/Podcast.vue";
import getPersonalizeRecommend from "@api/personalizeRecommend";
import { onBeforeMount, ref } from "vue";
import { PersonalizeRecommendData } from "@/types";
const personalizeRecommendList = ref<PersonalizeRecommendData>([]);
onBeforeMount(async () => {
    const { data } = await getPersonalizeRecommend();
    personalizeRecommendList.value = data;
});
</script>

<style lang="less" scoped>
.popular-podcasts {
    margin: 40px 0;

    .podcasts {
        margin-top: 10px;
        display: grid;
        width: 98.5%;
        grid-template-rows: repeat(3, 1fr);
        grid-template-columns: repeat(2, 1fr);
        row-gap: 20px;
        column-gap: 30px;
    }
}
</style>