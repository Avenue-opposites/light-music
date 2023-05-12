<template>
    <div class="cell">
        <slot />
    </div>
</template>

<script setup lang="ts">

</script>

<style lang="less" scoped>
.cell {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border: 5px solid black;
    overflow: hidden;
}
</style>