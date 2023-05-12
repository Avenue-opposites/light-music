<template>
    <div class="exclusive-entire">
        <div :class="['show-area', $attrs.class]">
            <img class="transition-transform" :src="$props.src" alt="">
            <i class="bi bi-play-circle"></i>
        </div>
        <h4>{{ $props.title }}</h4>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    src: string,
    title: string
}>();
</script>

<style lang="less" scoped>
.exclusive-entire {
    width: 480px;

    .show-area {
        position: relative;
        margin-top: 10px;
        width: 100%;
        border-radius: 10px;
        overflow: hidden;

        &:hover {
            img {
                transform: scale(1.1);
            }
        }

        img {
            display: block;
            width: 100%;
            object-fit: cover;
        }

        .bi-play-circle {
            position: absolute;
            top: 3%;
            left: 2%;
            color: var(--WL-1);
            font-size: 24px;
        }
    }

    h4 {
        margin-top: 10px;
    }
}
</style>