<!-- 精品歌单 -->
<template>
    <article class="boutique-playlist">
        <p class="title-bar">
        <h3>
            精品歌单
            <a href="https://music.163.com/#/topic?id=202001" target="_blank">
                <i class="bi bi-question-circle"></i>
            </a>
        </h3>
        <Popover>
            <template #reference>
                <button class="filter-playlist round-large">
                    <el-icon>
                        <Filter />
                    </el-icon>
                    全部歌单
                </button>
            </template>
            <template #default>
                <SelectionPanel />
            </template>
        </Popover>
        </p>
        <div v-infinite-scroll="load" :infinite-scroll-distance="200" class="playlist-area">
            <div :key="id"
                v-for="{ coverImgUrl, highQuality, playCount, tags, copywriter, name, id, creator: { nickname } } of boutiquePlaylistData.value.playlists"
                class="playlist transition-background-color round-medium">
                <div class="show round-medium">
                    <img class="transition-transform" :src="coverImgUrl" alt="">
                    <playCount class="play-count" :count="playCount" />
                    <HighQualityIcon v-if="highQuality" />
                </div>
                <div class="description">
                    <h4 class="title text-overflow-single">{{ name }}</h4>
                    <p class="author">by {{ nickname }}</p>
                    <p class="tags">
                        <Tag class="tag" v-for="tag in tags" :type="tag" />
                    </p>
                    <p v-if="copywriter" class="copywriter">{{ copywriter }}</p>
                </div>
            </div>
        </div>
    </article>
</template>

<script setup lang="ts">
import getBoutiquePlaylist from "@/api/boutiquePlaylist";
import SelectionPanel from "@views/common/SelectionPanel.vue";
import Popover from "@/common/Popover.vue";
import { BoutiquePlaylistData } from "@/types";
import HighQualityIcon from "@views/DiscoverMusic/common/HighQualityIcon.vue";
import { reactive } from "vue";
type Custom = {
    value: BoutiquePlaylistData
    offset: number
}
const boutiquePlaylistData = reactive<Custom>(JSON.parse(history.state.boutiquePlaylistData));

async function load() {
    if (boutiquePlaylistData.value.more) {
        boutiquePlaylistData.offset++;
        const before = boutiquePlaylistData.value.lasttime;
        const { data: { playlists, more, lasttime } } = await getBoutiquePlaylist("全部", 50, before);
        boutiquePlaylistData.value.playlists.push(...playlists);
        boutiquePlaylistData.value.more = more;
        boutiquePlaylistData.value.lasttime = lasttime;
    }
}
</script>

<style lang="less" scoped>
.boutique-playlist {
    .title-bar {
        display: flex;
        justify-content: space-between;

        >h3 {
            font-size: 24px;

            >a {
                color: var(--GRAY-L-4);
            }
        }

        .filter-playlist {
            background-color: var(--WL-1);
            padding: 2px 10px;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            outline: none;
            border: 1px solid var(--GRAY-L-4);
        }
    }

    .playlist-area {
        margin-top: 20px;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;

        .playlist {
            display: flex;

            &:hover {
                background-color: var(--GRAY-L-1);
            }

            .show {
                @size: 180px;
                position: relative;
                width: @size;
                height: @size;

                &:hover {
                    >img {
                        transform: scale(1.1);
                    }
                }

                >img {
                    width: 100%;
                    object-fit: cover;
                }

                .play-count {
                    position: absolute;
                    top: 0;
                    right: 4%;
                }
            }

            .description {
                margin-left: 20px;
                display: inline-flex;
                flex-direction: column;
                align-items: start;
                justify-content: space-evenly;

                .title {
                    width: 270px;
                    font-size: 24px;
                }

                .tags {
                    display: flex;

                    .tag {
                        margin-right: 4px;
                    }
                }

                .author {
                    font-size: 16px;
                    color: var(--GRAY-L-4);
                }

                .copywriter {
                    font-size: 18px;
                }
            }
        }
    }
}
</style>