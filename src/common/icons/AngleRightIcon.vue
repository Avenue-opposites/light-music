<template>
    <svg t="1681620578112" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4254"
        :width="$props.size" :height="$props.size" :color="$props.color" fill="currentColor">
        <path
            d="M728.76 561.68c-11.785 0-23.57-4.496-32.561-13.488l-402.523-402.521c-17.984-17.984-17.984-47.14 0-65.123 17.983-17.983 47.14-17.983 65.123 0l402.521 402.522c17.984 17.984 17.984 47.14 0 65.122-8.991 8.993-20.776 13.488-32.561 13.488z"
            p-id="4255"></path>
        <path
            d="M326.238 964.202c-11.785 0-23.57-4.496-32.562-13.488-17.984-17.983-17.984-47.139 0-65.122l402.522-402.522c17.982-17.983 47.14-17.983 65.122 0 17.984 17.984 17.984 47.14 0 65.122l-402.521 402.522c-8.992 8.992-20.776 13.488-32.562 13.488z"
            p-id="4256"></path>
    </svg>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
    color?: string,
    size: number
}>(), {
    color: "gray",
});
</script>

<style lang="less" scoped>
.icon {
    display: inline-block;
}
</style>