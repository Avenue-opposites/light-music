<template>
    <section class="playlist">
        <article :style="{ backgroundImage: `url(${first.coverImgUrl})` }" class="boutique-playlist round-medium">
            <div class="cover">
                <div class="show round-medium">
                    <img :src="first.coverImgUrl" alt="">
                </div>
                <div class="description">
                    <button @click="redirect" class="round-large">精品歌单</button>
                    <p>{{ first.name }}</p>
                </div>
            </div>
        </article>
    </section>
</template>

<script setup lang="ts">
import { BoutiquePlaylistData } from "@/types";
import getBoutiquePlaylist from "@api/boutiquePlaylist";
import { computed, onBeforeMount, reactive } from "vue";
import { useRouter } from "vue-router";
type Custom = {
    value: BoutiquePlaylistData;
    offset: number;
}
const router = useRouter();
const boutiquePlaylistData = reactive<Custom>({
    value: {
        cat: "全部",
        more: false,
        total: 0,
        playlists: [],
        lasttime: 0
    },
    offset: 0
});
onBeforeMount(async () => {
    const { data } = await getBoutiquePlaylist();
    boutiquePlaylistData.value = data;
});
const first = computed(() => boutiquePlaylistData.value.playlists[0]);
function redirect() {
    router.push({
        name: "boutiquePlaylist",
        state: {
            boutiquePlaylistData: JSON.stringify(boutiquePlaylistData)
        }
    })
}
</script>

<style lang="less" scoped>
.playlist {
    margin-top: 10px;

    .boutique-playlist {
        background-size: 300%;
        background-position: center 15%;

        .cover {
            display: flex;
            padding: 20px;
            background-color: #8b9ea6c4;
            backdrop-filter: blur(50px);
        }

        .show {
            width: 200px;
            height: 200px;

            img {
                width: 100%;
                object-fit: cover;
            }
        }

        .description {
            margin-left: 20px;

            >button {
                margin: 30px 0;
                padding: 5px 30px;
                background-color: transparent;
                outline: none;
                border: 1px solid var(--king);
                color: var(--king);
            }

            p {
                font-size: 20px;
                color: var(--WL-1);
            }
        }
    }
}
</style>