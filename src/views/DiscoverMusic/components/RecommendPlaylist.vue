<!-- 推荐歌单组件 -->
<template>
    <div class="recommend-playlist">
        <Target>
            推荐歌单
            <template #icon>
                <AngleRightIcon class="more" :size="16" />
            </template>
        </Target>
        <ul class="playlist">
            <el-skeleton class="el-skeleton" :loading="!Boolean(recommendPlaylist.length)" animated>
                <template #default>
                    <PlaylistCard title="每日歌曲推荐" :img="everyDay" remark="根据您的音乐口味生成每日更新">
                        <div class="mask">
                            <i :data-day="today" :class="['bi', 'bi-calendar4', today < 10 && 'dual']"></i>
                        </div>
                    </PlaylistCard>
                    <div class="splide-playlist">
                        <Splide class="splide" :has-track="false" @splide:move="move" :options="splideOptions">
                            <SplideTrack>
                                <SplideSlide class="splide-slide" v-for="{ picUrl }, i of splidePlaylist">
                                    <a :class="['slide', 'transition-transform', active === i && 'active']" href="#">
                                        <img :src="picUrl" alt="">
                                    </a>
                                </SplideSlide>
                            </SplideTrack>
                            <i class="bi bi-infinity"></i>
                        </Splide>
                        <h4 class="title text-overflow-double">{{ names[active] }}</h4>
                    </div>
                    <li :key="playcount" v-for="{ picUrl, name, playcount } of playlist">
                        <PlaylistCard :title="name" :img="picUrl" :playCount="playcount" />
                    </li>
                </template>
                <template #template>
                    <li :key="v" v-for="v in 10" class="el-skeleton-item">
                        <el-skeleton-item class="el-skeleton-item-image" variant="image" />
                        <el-skeleton-item class="el-skeleton-item-h3" variant="h3" />
                    </li>
                </template>
            </el-skeleton>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue';
import getRecommendPlaylist from "@/api/recommendPlaylist";

import { RecommendPlaylist } from '@/types';
import { SplideTrack, Options } from "@splidejs/vue-splide";
import { random } from '@/utils';
//列表数
const playlistAmount = 8;
const today = new Date().getDate();
const recommendPlaylist = ref<RecommendPlaylist[]>([]);
const playlist = computed(() => recommendPlaylist.value.slice(0, playlistAmount));
const splidePlaylist = computed(() => recommendPlaylist.value.slice(playlistAmount));
const names = computed(() => splidePlaylist.value.map(({ name }) => name));
const splideOptions: Options = {
    type: "loop",
    width: "1.40625rem",
    height: "1.40625rem",
    direction: "ttb",
    pagination: false,
    arrows: false,/* 取消箭头 */
    autoplay: true,
    interval: 3000,
};
//当前活动项
const active = ref(0);
const everyDay = computed(() => recommendPlaylist.value[random(0, recommendPlaylist.value.length - 1)].picUrl);
onBeforeMount(async () => {
    const { data } = await getRecommendPlaylist();
    if (data) {
        recommendPlaylist.value = data.recommend;
    }
});
function move(_: unknown, index: number) {
    active.value = index;
}
</script>

<style lang="less" scoped>
.recommend-playlist {
    margin: 40px 0;

    .playlist {
        margin-top: 10px;
        display: grid;
        grid-template-rows: repeat(2, 1fr);
        grid-template-columns: repeat(5, 1fr);
        row-gap: 25px;

        .splide-playlist {
            display: inline-block;
            width: 270px;

            .splide {
                position: relative;
                width: 100%;
                height: 270px;
                background: #3C3B3F;
                /* fallback for old browsers */
                background: -webkit-linear-gradient(to right, #605C3C, #3C3B3F);
                /* Chrome 10-25, Safari 5.1-6 */
                background: linear-gradient(to right, #605C3C, #3C3B3F);
                /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
                border-radius: 10px;
                overflow: hidden;

                .splide-slide {
                    width: 100%;
                    height: 270px;

                    .slide {
                        display: block;
                        transform: scale(0.8);
                        width: 100%;
                        height: 100%;
                        border-radius: 10px;
                        overflow: hidden;

                        >img {
                            filter: brightness(0.9);
                            width: 100%;
                            object-fit: cover;
                        }
                    }

                    .active {
                        transform: scale(1);
                    }
                }

                .bi-infinity {
                    position: absolute;
                    top: 10px;
                    right: 20px;
                    color: var(--WL-1);
                    font-size: 30px;

                    &::before {
                        font-weight: bolder !important;
                    }
                }
            }

            .title {
                width: 100%;
                font-weight: normal;
                font-size: 18px;
                margin-top: 8px;
            }
        }

        .mask {
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            backdrop-filter: blur(20px);

            .bi-calendar4 {
                font-size: 100px;
                color: var(--WL-1);

                &::after {
                    position: absolute;
                    content: attr(data-day);
                    font-weight: bold;
                    font-family: Helvetica;
                    top: 44%;
                    left: 40%;
                    font-size: 45px;
                }
            }

            .dual {
                &::after {
                    top: 44%;
                    left: 44%;
                }
            }
        }
    }

    .el-skeleton {
        grid-row: 1 / 6;
        grid-column: 1 / 6;
        width: 100%;
        display: grid;
        grid-template-rows: repeat(2, 1fr);
        grid-template-columns: repeat(5, 1fr);
        row-gap: 20px;
        column-gap: 29px;

        .el-skeleton-item {
            width: 270px;

            .el-skeleton-item-image {
                width: 270px;
                height: 270px;
            }

            .el-skeleton-item-h3 {
                margin-top: 10px;
                width: 100%;
                height: 24px;
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