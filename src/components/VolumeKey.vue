<template>
    <li class="volume-key">
        <i class="bi bi-volume-down"></i>
    </li>
</template>

<script setup lang="ts">
</script>

<style lang="less" scoped>
.volume-key {
    @size: 40px;
    position: relative;
    width: @size;
    height: @size;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}
</style>