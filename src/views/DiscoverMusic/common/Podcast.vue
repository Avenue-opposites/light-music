<template>
    <div class="podcast transition-background-color">
        <div class="podcast-wrap">
            <img :src="$props.src" alt="">
            <PlayIcon size="small" class="play-icon" />
        </div>
        <div class="podcast-details">
            <h4>{{ $props.title }}</h4>
            <div class="tags">
                <Tag class="tag" v-for="tag in $props.tags" color="var(--GRAY-L-2)" :type="tag" />
            </div>
            <p class="podcast-description">
                <span>{{ $props.description }}</span>
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    title: string;
    description: string;
    src: string;
    alt: string;
    tags: string[];
}>();
</script>

<style lang="less" scoped>
.podcast {
    @h: 100px;
    @r: 10px;
    width: 100%;
    height: @h;
    border-radius: @r;
    display: flex;

    &:hover {
        background-color: var(--WL-3);
    }

    .podcast-wrap {
        position: relative;
        width: @h;
        height: @h;
        border-radius: @r;
        overflow: hidden;

        img {
            width: 100%;
            object-fit: cover;
        }

        .play-icon {
            position: absolute;
            background-color: var(--WL-2);
        }
    }

    .podcast-details {
        margin-left: 10px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-evenly;

        .tags {
            display: flex;

            .tag {
                font-weight: normal;
                border-width: 1px;
                padding: 1px;
                transform-origin: 0 0;
                transform: scale(0.9);
            }

            :nth-child(even) {
                margin: 0 5px;
            }
        }

        .podcast-description {
            font-size: 12px;
        }
    }
}
</style>