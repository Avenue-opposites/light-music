<template>
    <aside class="sidebar">
        <el-scrollbar>
            <ul class="view">
                <div>
                    <Link :to="path" class="margin" v-for="{ title, path } of list_1">
                    {{ title }}
                    </Link>
                </div>
                <h6 class="title">我的音乐</h6>
                <div>
                    <Link to="/podcast" class="margin">
                    <template #icon>
                        <LoveIcon class="margin-right icon" color="gray" :size="16" />
                    </template>
                    我最喜欢的音乐
                    </Link>
                    <Link to="/podcast" class="margin">
                    <template #icon>
                        <DownloadIcon class="margin-right icon" color="gray" :size="16" />
                    </template>
                    本地与下载
                    </Link>
                    <Link to="/podcast" class="margin">
                    <template #icon>
                        <i class="bi bi-clock-history margin-right"></i>
                    </template>
                    最近播放
                    </Link>
                    <Link to="/podcast" class="margin">
                    <template #icon>
                        <i class="bi bi-cloud margin-right"></i>
                    </template>
                    我的音乐云盘
                    </Link>
                    <Link to="/podcast" class="margin">
                    <template #icon>
                        <i class="bi bi-boombox margin-right"></i>
                    </template>
                    我的播客
                    </Link>
                    <Link to="/podcast" class="margin">
                    <template #icon>
                        <CollectionIcon class="margin-right icon" :size="16" />
                    </template>
                    我的收藏
                    </Link>
                </div>
                <Dropdown>
                    <div class="dropdown-view">
                        <h6 class="dropdown-title">创建的歌单</h6>
                        <TriangleIcon :size="8" />
                    </div>
                    <template #dropdown>
                        <Link to="/podcast" v-for="_ in 5" class="margin">
                        欢迎━(*｀∀´*)ノ亻!
                        <template #icon>
                            <i class="bi bi-music-note-list margin-right"></i>
                        </template>
                        </Link>
                    </template>
                </Dropdown>
            </ul>
        </el-scrollbar>
    </aside>
</template>

<script setup lang="ts">
import Link from "@/components/Link.vue";
import LoveIcon from "@/common/icons/LoveIcon.vue";
import DownloadIcon from "@/common/icons/DownloadIcon.vue";
import CollectionIcon from "@/common/icons/CollectionIcon.vue";
import TriangleIcon from "@/common/icons/TriangleIcon.vue";
const list_1 = [
    { title: "我的发现", path: "/" },
    { title: "播客", path: "/podcast" },
    { title: "视频", path: "/podcast" },
    { title: "关注", path: "/podcast" },
    { title: "直播", path: "/podcast" },
    { title: "播客", path: "/podcast" },
    { title: "私人FM", path: "/podcast" },
];
</script>

<style lang="less" scoped>
.sidebar {
    position: relative;
    font-size: 20px;
    width: var(--sidebar-w);
    height: 100%;
    border-right: 2px solid var(--GRAY-L-1);

    .view {
        padding: 20px;
    }

    .margin {
        margin: 4px 0;

        .margin-right {
            margin-right: 4px;
        }

        .icon {
            width: 20px;
            height: 20px;
        }
    }

    .dropdown-view {
        display: flex;
        align-items: center;
        padding: 10px 0;
        cursor: pointer;

        .dropdown-title {
            color: var(--GRAY-L-2);
            padding-left: 10px;
        }
    }

    .title {
        padding-left: 10px;
        margin: 15px 0 10px 0;
        color: var(--GRAY-L-2);
    }
}
</style>