<template>
    <div class="playlist-card">
        <div class="wrap">
            <slot />
            <img :src="$props.img" alt="">
            <PlayCount v-if="Boolean($props.playCount)" :count="$props.playCount" />
            <PlayIcon class="play-icon" />
            <span v-if="Boolean($props.remark?.trim())" class="remark transition-transform">{{ $props.remark }}</span>
        </div>
        <h4 class="title text-overflow-double">{{ $props.title }}</h4>
    </div>
</template>

<script setup lang="ts">

withDefaults(defineProps<{
    title: string;
    img: string;
    playCount?: number;
    remark?: string;
}>(), {
    remark: "",
});

</script>

<style lang="less" scoped>
.playlist-card {
    @size: 270px;
    cursor: pointer;
    width: @size;
    display: inline-flex;
    flex-direction: column;

    .wrap {
        width: 100%;
        height: @size;
        position: relative;
        overflow: hidden;
        border-radius: 10px;

        .play-icon {
            opacity: 0;
        }

        >img {
            display: block;
            width: 100%;
            height: 100%;
            filter: brightness(0.8);
        }

        .play-count {
            z-index: 1;
            position: absolute;
            top: 2%;
            right: 4%;
        }

        &:hover {
            .play {
                opacity: 1;
            }

            .remark {
                transform: translateY(0%);
            }
        }

        .remark {
            z-index: 9999;
            transition-delay: 0.5s;
            transition-timing-function: cubic-bezier(.07, .66, .62, .96);
            position: absolute;
            transform: translateY(-100%);
            top: 0;
            left: 0;
            width: 100%;
            font-size: 14px;
            background-color: var(--BLACK-D-2);
            color: var(--WL-1);
            padding: 10px;
        }
    }

    .title {
        width: 100%;
        font-weight: normal;
        font-size: 18px;
        margin-top: 8px;
    }
}
</style>