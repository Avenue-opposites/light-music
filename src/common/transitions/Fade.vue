<!-- 淡入淡出过渡组件 -->
<template>
    <Transition class="fade" name="fade" mode="out-in">
        <slot />
    </Transition>
</template>

<script setup lang="ts">

</script>

<style lang="less" scoped>
.fade {
    transition: opacity .3s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
    opacity: 1;
}
</style>