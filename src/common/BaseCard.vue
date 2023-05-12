<template>
    <article class="base-card">
        <div class="base-show">
            <slot name="show" />
        </div>
        <h4 class="base-title">
            {{ $props.title }}
        </h4>
        <p class="base-subtitle">
            <slot>{{ $props.subtitle }}</slot>
        </p>
    </article>
</template>

<script setup lang="ts">
defineProps<{
    title: string;
    subtitle?: string
}>();
</script>

<style lang="less" scoped>
.base-card {
    .base-show {
        position: relative;
    }

    .base-title {
        font-size: 24px;
        margin: 2px 0;
    }

    .base-subtitle {
        font-size: 18px;
        color: var(--GRAY-L-4);
    }
}
</style>