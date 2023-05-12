<!-- 个性推荐页面 -->
<template>
    <div class="personalized-recommendation">
        <el-skeleton class="el-skeleton" :throttle="600" :loading="banners.length === 0" animated>
            <template #default>
                <Swiper :banners="banners" />
            </template>
            <template #template>
                <el-skeleton-item class="el-skeleton-item" variant="rect" />
            </template>
        </el-skeleton>
        <div class="alignment">
            <RecommendPlaylist />
            <PopularPodcasts />
            <Exclusive />
            <!-- 最新音乐 -->
            <article class="latest-music">
                <Target>
                    最新音乐
                    <template #icon>
                        <AngleRightIcon class="more" :size="16" />
                    </template>
                </Target>
                <div class="latest-music-area">
                    <div class="music round-medium transition-background-color"
                        v-for="{ name, picUrl, song }, i of recommendNewSongs">
                        <div class="music-show round-medium">
                            <img :src="picUrl" alt="">
                            <PlayIcon size="small" class="position-center" />
                        </div>
                        <div class="music-details">
                            <p class="music-name">
                            <h3 class="text-overflow-single" :title="name + alias(song)" :data-alias="alias(song)">{{ name
                            }}
                            </h3>
                            </p>
                            <p class="music-tag-and-artist">
                                <span class="tags">
                                    <Tag class="tag" color="var(--RD-3)" type="SQ" />
                                    <Tag class="tag" color="var(--RD-3)" type="Hi-Res" />
                                </span>
                                <Singers class="music-singers text-overflow-single"
                                    :singers="song.artists.map(artist => artist.name)" />
                            </p>
                        </div>
                    </div>
                </div>
            </article>
            <ThemePodcast />
            <RecommendMV />
        </div>
    </div>
</template>

<script setup lang="ts">
import Swiper from "@/views/DiscoverMusic/common/Swiper.vue";
import getBanner from "@api/banner";
import getRecommendNewSong from "@api/recommendNewSong";
import RecommendPlaylist from "@views/DiscoverMusic/components/RecommendPlaylist.vue";
import PopularPodcasts from "@views/DiscoverMusic/components/PopularPodcasts.vue";
import Exclusive from "@views/DiscoverMusic/components/Exclusive.vue";
import ThemePodcast from "@views/DiscoverMusic/components/ThemePodcast.vue";
import RecommendMV from "@views/DiscoverMusic/components/RecommendMV.vue";
import { onBeforeMount, ref } from "vue";
import { Banner, NewSong, RecommendNewSong } from "@/types";
import { random } from "@/utils";
const banners = ref<Banner[]>([]);
const recommendNewSongs = ref<RecommendNewSong[]>([]);
onBeforeMount(async () => {
    const bannerData = await getBanner();
    const recommendNewSong = await getRecommendNewSong(12);
    banners.value = bannerData.data.banners;
    recommendNewSongs.value = recommendNewSong.data.result;
});
//获取别名
function alias(song: NewSong) {
    const { transName, alias } = song;
    const to = alias.length - 1;
    const finallyAlias = transName || alias[random(0, to)] || "";
    return finallyAlias && `（${finallyAlias}）`;
}
</script>

<style lang="less" scoped>
.personalized-recommendation {
    .el-skeleton {
        display: flex;
        justify-content: center;

        .el-skeleton-item {
            margin-top: 40px;
            width: 1465px;
            height: 300px;
        }

    }


    .latest-music {
        margin: 40px 0;

        .latest-music-area {
            margin-top: 10px;
            display: grid;
            grid-template-rows: repeat(4, 70px);
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;

            .music {
                display: flex;

                &:hover {
                    background-color: var(--WL-3);
                }

                .music-show {
                    @size: 70px;
                    position: relative;
                    width: @size;
                    height: @size;
                    border: 1px solid var(--thin-border);

                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                }

                .music-details {
                    margin-left: 10px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-evenly;
                    align-items: flex-start;
                    flex: 1;

                    .music-name {
                        width: 100%;

                        >h3 {
                            width: 380px;
                            font-size: 20px;
                        }

                        ::after {
                            content: attr(data-alias);
                            color: var(--GRAY-L-2);
                            font-size: 18px;
                        }

                    }

                    .music-tag-and-artist {
                        display: flex;
                        align-items: flex-end;

                        .music-singers {
                            width: 300px;
                        }

                        .tags {
                            display: inline-flex;

                            .tag {
                                padding: 0 2px;
                                transform: scale(0.8);
                            }
                        }
                    }
                }
            }
        }
    }

    .more {
        @size: 20px;
        width: @size;
        width: @size;
    }
}
</style>