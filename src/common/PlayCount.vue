<template>
    <span class="play-count">
        <i class="bi bi-play"></i>{{ playCount }}
    </span>
</template>

<script setup lang="ts">
import { transformPlayCount } from '@/utils';
import { computed } from 'vue';

const props = defineProps<{
    count: number;
}>();
const playCount = computed(() => transformPlayCount(props.count));
</script>

<style lang="less" scoped>
.play-count {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    color: var(--WL-1);
    font-size: 14px;
    font-weight: bold;

    .bi-play {
        font-size: 18px;
    }
}
</style>