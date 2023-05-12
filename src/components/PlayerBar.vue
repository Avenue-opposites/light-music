<template>
    <div class="player-bar">
        <div class="song-information-display">
            <div class="song-cover">
                <img :src="albumPicture" alt="">
            </div>
            <div class="song-introduction">
                <TextBeyondScroll :width="200" class="song-name" :text="hasSong ? playerData.songDetails[0].name : '汪汪汪'">
                    <LoveIcon @click="setLove" :active="isLove" class="love" :size="16" />
                </TextBeyondScroll>
                <p class="singer">
                    <span :key="author" v-for="author, i of authors">
                        <a href="#">{{ author }}</a>
                        <span v-if="i !== authors.length - 1">/</span>
                    </span>
                </p>
            </div>
        </div>
        <Player ref="playerRef" class="player" />
        <ul class="feature-area">
            <el-tooltip effect="light" placement="top">
                <template #default>
                    <VolumeKey />
                </template>
                <template #content>
                    <div class="content-container">
                        <ProgressBar @change="" v-model="volume" :max="100" :min="0" class="progressbar" vertical />
                    </div>
                </template>
            </el-tooltip>
        </ul>
    </div>
</template>

<script setup lang="ts">
import TextBeyondScroll from "@/common/TextBeyondScroll.vue";
import VolumeKey from "@/components/VolumeKey.vue";
import Player from "@/components/Player.vue";
import { storeToRefs } from "pinia";
import usePlayerStore from "@/stores/player";
import { computed, ref, watchPostEffect } from "vue";
const { playerData } = storeToRefs(usePlayerStore());
const hasSong = computed(() => !!playerData.value.songDetails.length);
const albumPicture = computed(() => hasSong.value ? playerData.value.songDetails[0].al.picUrl : "没歌了");
const authors = computed(() => hasSong.value ? playerData.value.songDetails[0].ar.map(({ name }) => name) : ["佚名"]);
const isLove = ref(false);
const playerRef = ref();
const volume = ref(50);

watchPostEffect(() => {
    const { setVolume } = playerRef.value;
    // console.log(playerRef);
    setVolume(volume.value / 100);
});
function setLove() {
    const love = isLove.value;
    isLove.value = !love;
}
</script>

<style lang="less" scoped>
.player-bar {
    position: relative;
    display: flex;
    width: 100%;
    height: var(--player-bar-h);
    border-top: 1px solid var(--GRAY-L-1);
    background-color: var(--WL-1);

    .song-information-display {
        @size: 64px;
        @margin: calc(calc(var(--player-bar-h) - @size) / 2);
        width: 400px;
        height: 100%;
        display: inline-flex;
        position: absolute;
        top: 0;
        left: 0;
        align-items: center;
        padding-left: @margin;

        .song-cover {
            width: @size;
            height: @size;
            border-radius: 5px;
            overflow: hidden;

            >img {
                width: 100%;
                object-fit: cover;
            }
        }

        .song-introduction {
            margin-left: @margin;

            .song-name {
                font-size: 22px;

                .love {
                    @size: 24px;
                    margin-left: 10px;
                    width: @size;
                    height: @size;
                }
            }

            .singer {
                font-size: 18px;

                >span {
                    font-size: 18px;

                    a> {
                        font-size: 18px;
                        color: var(--BLACK-D-1);
                    }

                    span {
                        margin: 0 3px;
                    }
                }
            }
        }
    }

    .player {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
    }

    .feature-area {
        position: absolute;
        margin-right: 100px;
        display: flex;
        height: 100%;
        align-items: center;
        right: 0;
        top: 0;
        font-size: 40px;
    }
}

.content-container {
    margin-top: 10px;
    height: 120px;
    width: 20px;

    .progressbar {
        width: 100%;
        height: 90%;
    }
}
</style>