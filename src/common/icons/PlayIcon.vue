<template>
    <span :class="['play', 'transition-opacity', $props.size]">
        <i class="bi bi-play-fill"></i>
    </span>
</template>

<script setup lang="ts">

withDefaults(defineProps<{
    size?: "large" | "medium" | "small"
}>(), {
    size: "medium"
});
</script>

<style lang="less" scoped>
.play {
    z-index: 9999;
    position: absolute;
    bottom: 5%;
    right: 5%;
    clip-path: circle(50%);
    background-color: var(--WL-1);

    .bi-play-fill {
        position: absolute;
        color: var(--RD-3);
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

}

.medium {
    @size: 40px;
    width: @size;
    height: @size;

    .bi-play-fill {
        font-size: 28px;
    }
}

.small {
    @size: 30px;
    width: @size;
    height: @size;

    .bi-play-fill {
        font-size: 24px;
    }
}
</style>