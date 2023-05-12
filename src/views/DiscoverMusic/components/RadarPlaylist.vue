<template>
    <article class="radar-playlist">
        <Target>{{ profile?.nickname }}的雷达歌单</Target>
        <p class="description">
            根据你的红心收藏为你推荐更多宝藏歌曲
            <span class="indicator">
                <span @click="previous" class="previous round-fill transition-background-color">
                    <i class="bi bi-chevron-left"></i>
                </span>
                <span @click="next" class="next round-fill transition-background-color">
                    <i class="bi bi-chevron-right"></i>
                </span>
            </span>
        </p>
        <div class="playlist">
            <Splide ref="splide" class="playlist-splide" :options="splideOptions" :hasTrack="false">
                <SplideTrack>
                    <SplideSlide class="playlist-SplideSlide" :key="coverImgUrl"
                        v-for="{ playCount, coverImgUrl, name } of $props.playlist">
                        <PlaylistCard :title="name" :img="coverImgUrl" :playCount="playCount" />
                    </SplideSlide>
                </SplideTrack>
            </Splide>
        </div>
    </article>
</template>

<script setup lang="ts">
import useLoginState from '@/stores/loginState';
import { Splide, SplideSlide, SplideTrack, Options } from "@splidejs/vue-splide";
import { SelectedDiscPlaylist } from '@/types';
import { storeToRefs } from "pinia";
import { ref } from 'vue';
const { profile } = storeToRefs(useLoginState());
const splide = ref();
defineProps<{
    playlist: SelectedDiscPlaylist[];
}>();
const splideOptions: Options = {
    type: "loop",
    arrows: false,
    pagination: false,
    autoWidth: true,
    autoHeight: true,
    perPage: 5,
    perMove: 2
};
function previous() {
    splide.value.go("<");
}
function next() {
    splide.value.go(">");
}
</script>

<style lang="less" scoped>
.radar-playlist {
    margin-top: 15px;
    width: 100%;

    .playlist {
        margin-top: 20px;
        width: 100%;



        .playlist-splide {
            width: 1450px;

            .playlist-SplideSlide {
                margin-right: 20px;
            }
        }

    }

    .description {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 16px;
        color: var(--GRAY-L-4);

        .indicator {
            @size: 32px;
            width: 80px;
            display: inline-flex;
            justify-content: space-between;

            .previous,
            .next {
                display: inline-flex;
                justify-content: center;
                align-items: center;
                width: @size;
                height: @size;
                background-color: var(--GRAY-L-1);

                &:hover {
                    background-color: var(--GRAY-L-2);
                }

                >i {
                    color: black;
                    font-weight: bolder;
                }
            }
        }
    }
}
</style>