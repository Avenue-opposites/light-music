<template>
    <h2>
        <a class="router-link" href="#">
            <slot />
            <slot name="icon" />
        </a>
    </h2>
</template>

<script setup lang="ts">

</script>

<style lang="less" scoped>
.router-link {
    font-size: 28px;
    color: var(--BLACK-D-1);
    display: inline-flex;
    align-items: center;
}
</style>