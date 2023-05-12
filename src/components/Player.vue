<!-- 播放器组件 -->
<template>
    <div class="player">
        <div class="player-controls">
            <div @click="togglePlayMode" class="play-mode">
                <!-- 顺序播放 -->
                <OrderPlayIcon v-if="playMode === PALY_MODE_TYPE.ORDER_PALY_MODE" class="icon" color="var(--GRAY-D-2)"
                    :size="20" />
                <!-- 心动模式 -->
                <i v-else-if="playMode === PALY_MODE_TYPE.HEARTBEAT_PALY_MODE" class="bi bi-heart-pulse"></i>
                <!-- 列表模式 -->
                <InfiniteLoopIcon v-else-if="playMode === PALY_MODE_TYPE.LIST_CYCLE_PLAY_MODE" class="icon"
                    color="var(--GRAY-D-2)" :size="20" />
                <!-- 单曲循环 -->
                <OnceLoopIcon v-else-if="playMode === PALY_MODE_TYPE.SINGLE_CYCLE_PLAY_MODE" class="icon"
                    color="var(--GRAY-D-2)" :size="20" />
                <!-- 随机播放 -->
                <i v-else-if="playMode === PALY_MODE_TYPE.SHUFFLE_PALY_MODE" class="bi bi-shuffle"></i>
            </div>
            <div class="core-controls">
                <PreviousIcon class="previous" :size="20" />
                <span @click="setIsPaused" class="play-control transition-background-color">
                    <i @click="play" v-show="isPaused" class="bi bi-play-fill"></i>
                    <i @click="pause" v-show="!isPaused" class="bi bi-pause"></i>
                </span>
                <NextIcon class="next" :size="20" />
            </div>
            <span class="suspension-lyric">词</span>
        </div>
        <div class="player-progressbar">
            <span class="current-time"> {{ currentTimeFormat }} </span>
            <ProgressBar @change="changeHandler" :model-value="currentTime" :max="totalTime" class="progressbar" />
            <span class="total-time">{{ totalTimeFormat }}</span>
        </div>
        <audio preload="auto" @timeupdate="timeupdateHandler" ref="audioRef"
            :src="playerStore.playerData.songs.length ? playerStore.playerData.songs[0].url : ''"></audio>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, onUpdated } from "vue";
import { PALY_MODE_TYPE } from "@/types";
import OrderPlayIcon from "@/common/icons/OrderPlayIcon.vue";
import InfiniteLoopIcon from "@/common/icons/InfiniteLoopIcon.vue";
import OnceLoopIcon from "@/common/icons/OnceLoopIcon.vue";
import usePlayerStore from "@/stores/player";
const playerStore = usePlayerStore();
//当前播放时间
const currentTime = ref(0);
const audioRef = ref<HTMLAudioElement>();
const isPaused = ref(true);
const playMode = ref(0);
const totalTime = computed(() => {
    const data = playerStore.playerData;
    const songs = data.songs;
    if (songs.length) {
        return songs[0].time / 1000;
    } else {
        return 0;
    }
});
const currentTimeFormat = computed(() => timeTransform(currentTime.value));
const totalTimeFormat = computed(() => timeTransform(totalTime.value));
//总时长
onUpdated(() => {
    if (isPaused.value) {
        audioRef.value?.pause();
    } else {
        audioRef.value?.play();
    }
});
function play() {
    const audio = audioRef.value;
    audio?.play();
}
function pause() {
    const audio = audioRef.value;
    audio?.pause();
}
function timeupdateHandler(event: Event) {
    const target = event.target as HTMLAudioElement;
    //本首歌结束
    // if(currentTime.value === totalTime.value) {

    // }
    currentTime.value = target.currentTime;
}
function changeHandler(time: number) {
    const audio = audioRef.value as HTMLAudioElement;
    audio.currentTime = time;
}
function setIsPaused() {
    isPaused.value = !isPaused.value;
}
function togglePlayMode() {
    playMode.value++;
    const mode = playMode.value;
    if (mode >= 5) {
        playMode.value = 0;
    }
}
function setVolume(volume: number) {
    const audio = audioRef.value;
    if (audio) {
        audio.volume = volume;
    }
}
function timeTransform(time: number) {
    time = Math.floor(time);
    const minute = Math.floor(time / 60);
    const seconds = time % 60;
    return `0${minute}:${seconds < 10 ? `0${seconds}` : seconds}`;
}
defineExpose({
    setVolume
});
</script>

<style lang="less" scoped>
.player {
    width: 600px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .player-controls {

        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--GRAY-D-2);

        .play-mode {
            display: inline-flex;
            align-items: center;

            >i {
                font-size: 20px;
            }

            .icon {
                @size: 24px;
                width: @size;
                height: @size;
            }
        }

        .core-controls {
            width: 200px;
            margin: 0 40px;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .previous,
            .next {
                color: var(--GRAY-D-2);
                width: 30px;
                height: 30px;
            }

            .play-control {
                @size: 50px;
                position: relative;
                background-color: var(--GRAY-L-1);
                border-radius: 50%;
                width: @size;
                height: @size;
                // display: inline-flex;
                // align-items: center;
                // justify-content: center;

                >i {
                    position: absolute;
                    font-size: 40px;
                }

                .bi-pause {
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }

                .bi-play-fill {
                    top: -3%;
                    left: 14%;
                }

                &:hover {
                    background-color: var(--GRAY-L-2);
                }

            }
        }
    }

    .player-progressbar {
        display: flex;
        justify-content: space-between;

        .progressbar {
            width: 500px;
        }

        .current-time,
        .total-time {
            font-size: 14px;
        }
    }
}
</style>