<template>
    <Teleport to="body">
        <Fade>
            <div ref="backdropRef" @click="clickHandler" v-if="$props.cover" class="backdrop">
                <slot />
            </div>
        </Fade>
    </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const backdropRef = ref<HTMLDivElement | null>(null);
defineProps<{
    cover: boolean;
}>();
const emits = defineEmits<{
    (e: "touchBounds", event: MouseEvent): void;
}>();
function clickHandler(event: MouseEvent) {
    if (backdropRef.value === event.target) {
        emits("touchBounds", event);
    }
}
</script>

<style lang="less" scoped>
.backdrop {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: var(--BLACK-D-2);
    z-index: 9999;
}
</style>