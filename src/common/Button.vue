<template>
    <button :style="finallyStyle" class="button">
        <slot name="left-icon"></slot>
        <slot>button</slot>
        <slot name="right-icon"></slot>
    </button>
</template>

<script setup lang="ts">
import { computed, CSSProperties } from 'vue';

const props = withDefaults(defineProps<{
    color?: string;
    background?: string;
    circle?: boolean;
    round?: boolean;
}>(), {
    color: "var(--WL-1)",
    background: "var(--RD-3)",
    round: false,
    circle: false
});
const finallyStyle = computed<CSSProperties>(() => ({
    color: props.color,
    background: props.background,
    borderRadius: props.circle ? "20px" : (props.round ? "5px" : "none")
}));
</script>

<style lang="less" scoped>
.button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 20px;
    border: none;
    background-color: transparent;
    text-align: center;
}
</style>