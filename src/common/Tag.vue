<template>
    <span :style="styled" class="tag">
        <slot>{{ $props.type }}</slot>
    </span>
</template>

<script setup lang="ts">
import { computed, CSSProperties } from 'vue';

const props = withDefaults(defineProps<{
    color?: string;
    type?: string;
}>(), {
    color: "var(--RD-3)",
    type: "Tag"
});
const styled = computed<CSSProperties>(() => ({
    borderColor: props.color,
    color: props.color
}));
</script>

<style lang="less" scoped>
.tag {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
    font-size: 12px;
    font-weight: bolder;
    border-width: 2px;
    border-radius: 4px;
    border-style: solid;
}
</style>