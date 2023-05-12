<template>
    <div class="my-splide">
        <div class="splide-track">
            <div @mouseenter="isTouch = true" @mouseleave="isTouch = false"
                v-for="{ imageUrl, url, typeTitle, titleColor, targetType, targetId }, i of $props.banners"
                :class="['splide-slide', i === active && 'active', i === pre && 'pre', i === nt && 'next']">
                <a @click="play(targetId, targetType)" :href="url || '#'" :target="url ? '_blank' : '_self'">
                    <img :src="imageUrl" alt="">
                    <span :style="{ backgroundColor: titleColor }" class="type">{{ typeTitle }}</span>
                </a>
            </div>
        </div>
        <div @mouseenter="isTouch = true" class="transition-opacity" :style="{ opacity: Number(isTouch) }">
            <button class="p" @click="previous">
                <AngleLeftIcon color="#fff" :size="15" />
            </button>
            <button class="n" @click="next">
                <AngleRightIcon color="#fff" :size="15" />
            </button>
        </div>
        <ul class="pagination">
            <li @mouseenter="active = i" v-for="_, i in $props.banners.length" :class="[i === active && 'active']"></li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { computed, onActivated, onDeactivated, ref } from 'vue';
import AngleLeftIcon from "@/common/icons/AngleLeftIcon.vue";
import AngleRightIcon from "@/common/icons/AngleRightIcon.vue";
import { Banner, BANNER_TARGET_TYPE } from '@/types';

import useSong from "@/hooks/useSong";
import usePlayerStore from "@/stores/player";

const active = ref(0);
const isTouch = ref(false);
const pre = computed(() => active.value === 0 ? props.banners.length - 1 : active.value - 1);
const nt = computed(() => active.value === props.banners.length - 1 ? 0 : active.value + 1);
let timer: number;
onActivated(() => timer = setInterval(() => !isTouch.value && next(), 3000));
onDeactivated(() => clearInterval(timer));

const props = defineProps<{
    banners: Banner[]
}>();

function previous() {
    const current = active.value;
    if (current <= 0) {
        active.value = props.banners.length - 1;
    }
    else {
        active.value--;
    }
}
function next() {
    const current = active.value;
    if (current >= props.banners.length - 1) {
        active.value = 0;
    }
    else {
        active.value++;
    }
}
async function play(targetId: number, targetType: BANNER_TARGET_TYPE) {
    if (targetType === BANNER_TARGET_TYPE.NEW_SONG_DEBUT) {
        const { songDetail, songURL } = await useSong(targetId, "standard");
        const playerStore = usePlayerStore();
        playerStore.$patch(({ playerData }) => {
            playerData.songDetails = songDetail.data.songs;
            playerData.songs = songURL.data;
        });
    }
}
</script>

<style lang="less" scoped>
.my-splide {
    width: 100%;
    height: 320px;
    position: relative;
    display: flex;

    .splide-track {
        .splide-slide {
            transition: all .5s var(--smooth);
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 500px;
            height: 200px;
            border-radius: 10px;
            visibility: hidden;
            overflow: hidden;

            a {
                position: relative;
                display: block;
                width: 100%;
                height: 100%;
                cursor: pointer;

                .type {
                    position: absolute;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 2px 10px;
                    border-radius: 10px 0;
                    right: 0;
                    bottom: 0;
                    color: white;
                    font-size: 12px;
                }

                img {
                    -webkit-user-drag: none;
                    width: 100%;
                    height: 100%;
                    // object-fit: cover;
                }
            }
        }

        .pre,
        .next,
        .active {
            visibility: visible;
            z-index: 1;
        }

        .pre {
            left: 20%;
        }

        .next {
            left: 80%;
        }

        .active {
            z-index: 2;
            transform: translate(-50%, -50%) scale(1.3);
        }
    }

    .pagination {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        display: flex;

        li {
            margin: 0 5px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: var(--GRAY-L-2);
            transition: background-color .3s var(--smooth);
        }

        .active {
            background-color: var(--RD-3);
        }
    }

    .p,
    .n {
        z-index: 2;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        border-radius: 50%;
        border: none;
        width: 40px;
        height: 40px;
        background-color: var(--BLACK-D-2);
        top: 50%;
        transform: translateY(-50%);
    }

    .p {
        left: 5%;
    }

    .n {
        right: 5%;
    }
}
</style>