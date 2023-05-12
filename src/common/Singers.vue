<template>
    <p class="singers">
        <span class="singer" v-for="singer, i of $props.singers">
            <a class="transition-color" href="#" :title="singer">{{ singer }}</a>
            <span v-if="i !== $props.singers.length - 1">/</span>
        </span>
    </p>
</template>

<script setup lang="ts">
defineProps<{
    singers: string[];
}>();
</script>

<style lang="less" scoped>
.singers {
    display: inline-block;

    .singer {
        font-size: 16px;
        color: var(--GRAY-L-2);

        >a {
            font-size: 16px;
            color: var(--GRAY-L-2);

            &:hover {
                color: var(--BLACK-D-3);
            }
        }

        span {
            display: inline-block;
            margin: 0 2px;
        }
    }
}
</style>