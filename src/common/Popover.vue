<template>
    <span @click="pop" ref="referenceRef" class="popover-reference">
        <slot name="reference" />
    </span>
    <Teleport to="#popover-container">
        <OnClickOutside v-if="isShow" @trigger="isShow = false">
            <div ref="popoverRef" class="popover">
                <slot>{{ $props.content }}</slot>
            </div>
        </OnClickOutside>
    </Teleport>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { OnClickOutside } from "@vueuse/components";
import { useElementBounding } from "@vueuse/core";
const props = withDefaults(defineProps<{
    content?: string;
    offset?: number;
}>(), {
    content: "",
    offset: 10
});
const isShow = ref(false);
const referenceRef = ref<HTMLSpanElement>();
const popoverRef = ref<HTMLDivElement>();
function pop() {
    isShow.value = !isShow.value;
}
watch(isShow, (value) => {
    if (value) {
        const doc = document.documentElement;
        const reference = referenceRef.value!;
        const popover = popoverRef.value!;
        const offset = props.offset;
        const { offsetWidth } = popover;
        const { top, left } = useElementBounding(reference);
        const beyondWidth = left.value + offsetWidth - doc.clientWidth;
        let x, y;
        if (beyondWidth > 0) {
            x = left.value - beyondWidth - props.offset;
            y = top.value + reference.offsetHeight + offset;
        } else {
            x = left.value;
            y = top.value + reference.offsetHeight + offset;
        }
        popover.style.left = `${x}px`;
        popover.style.top = `${y}px`;
    }
}, {
    flush: "post"
});
</script>

<style lang="less" scoped>
.popover {
    background-color: var(--WL-1);
    border: 2px solid black;
    position: absolute;
    z-index: 9999;
}
</style>