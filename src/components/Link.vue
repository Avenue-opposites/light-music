<template>
    <li class="link">
        <RouterLink active-class="active" :to="$props.to" class="router-link" href="#">
            <slot name="icon"></slot>
            <span>
                <slot />
            </span>
        </RouterLink>
    </li>
</template>

<script setup lang="ts">
import { RouteLocationRaw } from 'vue-router';

defineProps<{
    to: RouteLocationRaw
}>();
</script>

<style lang="less" scoped>
.link {

    .router-link {
        transition: background-color .3s var(--smooth);
        padding-left: 10px;
        line-height: 40px;
        display: flex;
        align-items: center;
        width: 100%;
        height: 40px;
        color: var(--BLACK-D-1);

        &:hover {
            background-color: var(--GRAY-L-3);
        }

        span {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-left: 2px;
        }
    }
}

.active {
    font-family: PingFangBold;
    font-weight: bold;
    background-color: var(--GRAY-L-3);
}
</style>