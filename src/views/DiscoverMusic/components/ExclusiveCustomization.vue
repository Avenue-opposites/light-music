<!-- 专属定制组件 -->
<template>
    <div class="exclusive-customization">
        <RadarPlaylist :playlist="radarPlaylist" />
        <article class="custom-playlist">
            <Target>定制歌单</Target>
            <div :infinite-scroll-distance="200" v-infinite-scroll="load" class="wrapper">
                <PlaylistCard :key="id" v-for="{ coverImgUrl, id, name, playCount } of custom.playlistData.playlists"
                    :img="coverImgUrl" :title="name" :play-count="playCount" />
            </div>
        </article>
    </div>
</template>

<script setup lang="ts">
import RadarPlaylist from "@views/DiscoverMusic/components/RadarPlaylist.vue";
import getSelectedDiscPlaylists from "@api/selectedDiscPlaylists";
import { onBeforeMount, reactive, ref } from 'vue';
import PlaylistCard from "@/common/PlaylistCard.vue";
import { SelectedDiscPlaylist, SelectedDiscPlaylistData } from "@/types";
type Custom = {
    playlistData: SelectedDiscPlaylistData;
    limit: number;
    offset: number;
}
const radarPlaylist = ref<SelectedDiscPlaylist[]>([]);
const custom = reactive<Custom>({
    playlistData: {
        cat: "流行",
        more: false,
        total: 0,
        playlists: []
    },
    limit: 50,
    offset: 0
});
onBeforeMount(async () => {
    const radarPlaylistResponse = await getSelectedDiscPlaylists("hot", "雷达", 0, 50);
    const customPlaylistData = await RequestPlaylist();
    radarPlaylist.value = radarPlaylistResponse.data.playlists;
    custom.playlistData = customPlaylistData;
})
async function RequestPlaylist() {
    const { data } = await getSelectedDiscPlaylists("hot", custom.playlistData.cat, custom.offset, custom.limit);
    return data;
}
async function load() {
    if (custom.playlistData.more) {
        custom.offset++;
        const data = await RequestPlaylist();
        custom.playlistData.more = data.more;
        custom.playlistData.playlists.push(...data.playlists);
    }
}
</script>

<style lang="less" scoped>
.exclusive-customization {
    .custom-playlist {
        margin: 40px 0;

        .wrapper {
            margin-top: 10px;
            width: 100%;
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            row-gap: 20px;
        }
    }
}
</style>