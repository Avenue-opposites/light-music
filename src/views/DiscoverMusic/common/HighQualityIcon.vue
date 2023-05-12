<template>
    <span :style="{ background: $props.background }" class="high-quality-icon">
        <CrownIcon class="crown-icon" :color="$props.color" :size="16" />
    </span>
</template>

<script setup lang="ts">
import CrownIcon from "@/common/icons/CrownIcon.vue";
withDefaults(defineProps<{
    color?: string;
    background?: string;
}>(), {
    color: "var(--WL-1)",
    background: "var(--YELLOW-M-1)"
});
</script>

<style lang="less" scoped>
.high-quality-icon {
    position: absolute;
    top: -1%;
    left: -19%;
    transform: rotate(-45deg);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    height: 15%;

    .crown-icon {
        @size: 18px;
        width: @size;
        height: @size;
    }
}
</style>