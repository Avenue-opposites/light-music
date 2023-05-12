<template>
    <svg t="1683257448493" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4513"
        :width="$props.size" :height="$props.size" :color="$props.color" fill="currentColor">
        <path
            d="M302.4 359.9l167-210.9c18.6-23.5 52.8-27.5 76.4-8.9 3.3 2.6 6.3 5.6 8.9 8.9l167 210.9 159.8-68.5c27.6-11.8 59.6 1 71.4 28.6 4.4 10.2 5.5 21.6 3.3 32.5l-93.3 449.7c-11.3 54.4-59.3 93.5-114.9 93.5H276.1c-55.6 0-103.6-39-114.9-93.5L67.9 352.5c-6.1-29.4 12.8-58.2 42.2-64.3 10.9-2.3 22.2-1.1 32.5 3.3l159.8 68.4zM512 202.7L348.8 408.8c-15.2 19.2-41.5 25.9-64 16.2l-146.7-62.9 88.5 426.4c4.9 23.4 25.5 40.3 49.5 40.3h471.8c23.9 0 44.6-16.8 49.5-40.3l88.5-426.4L739.2 425c-22.6 9.7-48.8 3-64-16.2L512 202.7z"
            p-id="4514"></path>
    </svg>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
    color?: string,
    size: number
}>(), {
    color: "gray"
});
</script>

<style lang="less" scoped>
.icon {
    display: inline-block;
}
</style>