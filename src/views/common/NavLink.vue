<template>
    <span class="nav-link">
        <h2>
            <RouterLink class="router-link" active-class="active" :to="$props.to">
                <slot>nav-link</slot>
            </RouterLink>
        </h2>
    </span>
</template>

<script setup lang="ts">
import { RouteLocationRaw } from 'vue-router';
defineProps<{
    to: RouteLocationRaw
}>();
</script>

<style lang="less" scoped>
.nav-link {
    display: inline-block;

    h2 {
        .router-link {
            position: relative;
            font-size: 20px;
            font-weight: normal;
            color: var(--BLACK-D-1);
        }

        .active {
            font-weight: bold;
            font-size: 28px;

            &::before {
                position: absolute;
                content: "";
                width: 80%;
                height: 3px;
                bottom: -15%;
                left: 10%;
                background-color: var(--RD-3);
            }
        }
    }
}
</style>