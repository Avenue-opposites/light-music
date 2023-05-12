<template>
    <div class="dropdown">
        <div @click="spread">
            <slot />
        </div>
        <div ref="menu" :class="['menu', !isFold && $props['fold-class']]">
            <slot name="dropdown"></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const menu = ref<HTMLDivElement | null>(null);
const isFold = ref(false);
defineProps<{
    "fold-class": string
}>();
const emit = defineEmits<{
    (e: "fold", state: boolean): void
}>();
function spread() {
    isFold.value = !isFold.value;
    emit("fold", isFold.value);
    const div = menu.value as HTMLElement;
    if (isFold.value) {
        let h: number;
        div.style.height = "auto";
        h = div.clientHeight;
        div.style.height = "0px";
        requestAnimationFrame(() => {
            div.style.height = `${h}px`;
        });
    } else {
        div.style.height = "0px";
    }
}
</script>

<style lang="less" scoped>
.dropdown {
    >div {
        width: 100%;
    }

    .menu {
        transition: height .3s var(--smooth);
        height: 0;
        overflow: hidden;
    }
}
</style>