<template>
    <div @mouseenter="isShow = true" @mouseleave="isShow = false" :class="[$props.vertical ? 'vertical' : 'progress-bar']">
        <div @click="clickHandler" ref="runwayRef"
            :class="['progress-bar-runway', (isShow || isDrag) && 'bar-active', 'transition-size', $props.runwayClass]">
            <div ref="barRef" :class="['bar', $props.barClass]"></div>
            <div @mousedown.prevent.stop="mousedownHandler" ref="ballRef"
                :class="['ball', (isShow || isDrag) && 'ball-active', $props.ballClass]"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watchPostEffect } from 'vue';
//事件
const emits = defineEmits<{
    (event: "update:modelValue", payload: number): void;
    (event: "change", payload: number): void;
    (event: "input", payload: number): void;
}>();
const props = withDefaults(defineProps<{
    runwayClass?: string;
    barClass?: string;
    ballClass?: string;
    vertical?: boolean;
    modelValue?: number;
    min?: number;
    max?: number;
}>(), {
    runwayClass: "",
    barClass: "",
    ballClass: "",
    vertical: false,
    modelValue: 0,
    min: 0,
    max: 100
});
const isShow = ref(false);
const isDrag = ref(false);
const runwayRef = ref<HTMLDivElement>();
const barRef = ref<HTMLDivElement>();
const ballRef = ref<HTMLDivElement>();
const modelValue = computed({
    get() {
        return props.modelValue;
    },
    set(newValue) {
        emits("update:modelValue", newValue);
    }
});
const percentage = computed(() => {
    const value = modelValue.value;
    const min = props.min;
    const max = props.max;
    if (value > max) {
        return 1;
    } else if (value <= min) {
        return 0;
    } else {
        return +(value / max).toFixed(2);
    }
});
//改变元素的样式
watchPostEffect(() => {
    if (isDrag.value) return;
    const runway = runwayRef.value!;
    const width = props.vertical ? runway.clientHeight : runway.clientWidth;
    const position = percentage.value * width;
    setBarPosition(position);
});
//点击处理
function clickHandler(event: MouseEvent) {
    const { x, y } = event;
    const runway = runwayRef.value!;
    const size = props.vertical ? runway.clientHeight : runway.clientWidth;
    const runwayRect = runway.getBoundingClientRect();
    const offset = props.vertical ? runwayRect.top : runwayRect.left;
    const position = props.vertical ? size - (y - offset) : x - offset;
    const percentage = (position / size);
    if (percentage >= 0 && percentage <= 1) {
        const newValue = +(percentage * props.max).toFixed(2);
        modelValue.value = newValue;
        emits("change", newValue);
        emits("input", newValue);
        setBarPosition(position);
    }
}
//拖动处理
function mousedownHandler(event: MouseEvent) {
    const { x: startX, y: startY } = event;
    const runway = runwayRef.value!;
    const bar = barRef.value!;
    const total = props.vertical ? runway.clientHeight : runway.clientWidth;
    const current = props.vertical ? bar.clientHeight : bar.clientWidth;
    let newValue: number;
    const move = (event: MouseEvent) => {
        const { x, y } = event;
        const movement = props.vertical ? (y - startY) * -1 : x - startX;
        const position = current + movement;
        let pos: number;
        if (position > total) {
            pos = total;
        } else if (position < 0) {
            pos = 0;
        } else {
            pos = position;
        }
        const percentage = pos / total;
        newValue = +(percentage * props.max).toFixed(2);
        modelValue.value = newValue;
        emits("input", newValue);
        setBarPosition(pos);
    }
    isDrag.value = true;
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", function fn() {
        document.removeEventListener("mousemove", move);
        nextTick(() => document.removeEventListener("mouseup", fn));
        isDrag.value = false;
        emits("change", newValue);
    });
}
//设置进度条位置
function setBarPosition(position: number) {
    const bar = barRef.value!;
    const ball = ballRef.value!;
    if (props.vertical) {
        bar.style.height = `${position}px`;
        ball.style.transform = `translateY(-${position}px)`;
    } else {
        bar.style.width = `${position}px`;
        ball.style.transform = `translateX(${position}px)`;
    }
}
</script>

<style lang="less" scoped>
.progress-bar {
    display: flex;
    align-items: center;
    justify-content: center;

    .progress-bar-runway {
        position: relative;
        height: 3px;
        flex: 1;
        cursor: pointer;
        background-color: var(--GRAY-L-5);

        .bar {
            height: 100%;
            background-color: var(--RD-3);
        }


        .ball {
            display: none;
            @size: 15px;
            position: absolute;
            background-color: var(--RD-3);
            border-radius: 50%;
            left: calc(calc(@size / 2) * -1);
            top: -100%;
            width: @size;
            height: @size;
        }

        .ball-active {
            display: block;
        }
    }

    .bar-active {
        height: 6px;
    }
}

.vertical {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .progress-bar-runway {
        position: relative;
        background-color: var(--GRAY-L-5);
        width: 5px;
        border-radius: 5px;
        flex: 1;

        .bar {
            width: 100%;
            background-color: var(--RD-3);
            position: absolute;
            bottom: 0;
            border-radius: 5px;
        }

        .ball {
            @size: 15px;
            position: absolute;
            background-color: var(--RD-3);
            border-radius: 50%;
            left: -110%;
            bottom: calc(calc(@size / 2) * -1);
            width: @size;
            height: @size;
        }
    }
}
</style>