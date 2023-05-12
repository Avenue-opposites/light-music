<template>
    <div class="tic-tac-toe">
        <Cell style="font-size: 80px;" @click="downChess(i)" v-for="chess, i of board">{{ chess }}</Cell>
    </div>
    <p> {{ gameState ? `${gameState}为胜利者` : isFull ? "平局" : "" }} </p>
    <button @click="previous">上一步</button>
    <button @click="reset">重置</button>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import Cell from './Cell.vue';
type Chess = "O" | "X";
const currentChess = ref<Chess>("O");
const board = reactive<Chess[]>(new Array(9));
let history = reactive<Array<{ type: Chess, azimuth: number } | null>>([]);
const gameState = computed(() => {
    const reg = /OOO|XXX/ig;
    const b: Chess[][] = split(board, 3);
    for (let i = 0; i < b.length; i++) {
        const el = b[i].join("");
        if (reg.test(el)) {
            return el.charAt(0);
        }
    }
    for (let i = 0; i < b.length; i++) {
        let str = "";
        for (let j = 0; j < b[i].length; j++) {
            str += b[j][i];
        }
        if (reg.test(str)) {
            return str.charAt(0);
        }
    }
    const angle1 = b[0][0] + b[1][1] + b[2][2];
    const angle2 = b[2][0] + b[1][1] + b[0][2];
    if (reg.test(angle1)) {
        return angle1.charAt(0);
    }
    if (reg.test(angle2)) {
        return angle2.charAt(0);
    }
    return "";
});
const step = ref(0);
const isFull = computed(() => step.value === board.length);


let previousStep: Chess = "X";
//落子函数
function downChess(azimuth: number) {
    if (board[azimuth] || isFull.value || gameState.value) return;
    const chess = currentChess.value;
    board[azimuth] = chess;
    step.value++;
    history.push({
        type: chess,
        azimuth
    });
    currentChess.value = previousStep;
    previousStep = chess;
}
function previous() {
    const chess = history.pop();
    if (chess) {
        board[chess.azimuth] = "" as Chess;
        step.value--;
    }
}
function reset() {
    board.fill("" as Chess);
    history.fill(null);
}
function split(arr: any[], count: number) {
    const res = [];
    for (let i = 0; i < Math.ceil(arr.length / count); i++) {
        const start = i * count;
        const end = start + count;
        res[i] = arr.slice(start, end);
    }
    return res;
}
</script>

<style lang="less" scoped>
.tic-tac-toe {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    width: 100%;
    height: 100%;
    border: 5px solid black;
}
</style>