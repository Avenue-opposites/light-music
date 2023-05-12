<template>
    <BaseCard class="mv-card" :title="$props.title">
        <template #show>
            <div class="mv-show round-medium transition-box-shadow">
                <img class="transition-transform" :src="$props.src" alt="">
                <PlayCount class="play-count" :count="$props.playCount" />
                <span v-if="$props.remark" class="mv-remark transition-transform">{{ $props.remark }}</span>
            </div>
        </template>
        <template #default>
            <Singers :singers="$props.singers" />
        </template>
    </BaseCard>
</template>

<script setup lang="ts">
import BaseCard from "@/common/BaseCard.vue";
defineProps<{
    src: string;
    playCount: number;
    title: string;
    singers: string[]
    remark?: string;
}>();
</script>

<style lang="less" scoped>
.mv-card {
    width: 400px;

    &:hover {
        .mv-show {
            box-shadow: 0 0 10px 5px gray;
        }
    }

    .mv-show {
        width: 100%;
        position: relative;

        &:hover {
            >img {
                transform: scale(1.1);
            }

            .mv-remark {
                transform: translateY(0);
            }

            .play-count {
                display: none;
            }
        }

        >img {
            width: 100%;
            object-fit: cover;
        }

        .mv-remark {
            top: 0;
            left: 0;
            transform: translateY(-100%);
            transition-delay: .5s;
            position: absolute;
            z-index: 9999;
            padding: 10px 20px;
            width: 100%;
            font-size: 18px;
            background-color: var(--BLACK-D-4);
            color: var(--WL-1);
        }

        .play-count {
            position: absolute;
            top: 2%;
            right: 2%;
        }
    }
}
</style>