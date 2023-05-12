<!-- 文本超出指定范围隐藏鼠标移入时滚动组件 -->
<template>
    <p class="text-beyond-scroll">
    <div class="text-beyond-scroll-wrap">
        <div ref="trackRef" @mouseenter="start" @transitionend="end" class="text-beyond-scroll-track">
            <span>{{ $props.text
            }}</span>
            <span v-show="isBeyond">{{ $props.text }}</span>
        </div>
    </div>
    <slot />
    </p>
</template>

<script setup lang="ts">
import { ref, onMounted, onUpdated } from 'vue';

const props = defineProps<{
    text: string;
    width: number;
}>();
const trackRef = ref<HTMLDivElement | null>(null);
const isBeyond = ref(false);
onMounted(setAutoWidth);
onUpdated(setAutoWidth);

function start(e: MouseEvent) {
    // console.log(e);
    // console.log("过渡开始");
    const target = e.target as HTMLDivElement;
    const parent = target.parentElement;
    const offsetX = target.children[0].clientWidth;
    if (parent?.clientWidth! < offsetX) {
        isBeyond.value = true;
        target.style.transition = `transform 5s linear`;
        target.style.transform = `translateX(-${offsetX}px)`;
    } else {
        isBeyond.value = false;
    }
}
function end(e: TransitionEvent) {
    // console.log(e);
    // console.log("过渡结束");
    const target = e.target as HTMLDivElement;
    target.style.transition = `none`;
    target.style.transform = `translateX(0)`;
}
function setAutoWidth() {
    const target = trackRef.value;
    const parent = target?.parentElement;
    const childrenWidth = target?.children[0].clientWidth;
    if (props.width > childrenWidth!) {
        parent!.style.width = `${childrenWidth}px`;
    } else {
        parent!.style.width = `${props.width}px`;
    }
}
</script>

<style lang="less" scoped>
.text-beyond-scroll {
    display: inline-flex;
    align-items: center;

    .text-beyond-scroll-wrap {
        width: 100%;
        white-space: nowrap;
        overflow: hidden;

        .text-beyond-scroll-track {
            >span {
                margin-right: 10px;
                display: inline-block;
            }
        }
    }
}
</style>