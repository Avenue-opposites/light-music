<template>
    <div class="profile">
        <a class="photo" href="#">
            <img :src="$props.avatarUrl" alt="">
        </a>
        <a class="username" href="#">{{ $props.nickname }}</a>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    avatarUrl: string;
    nickname: string;
}>();
</script>

<style lang="less" scoped>
.profile {
    height: 100%;
    display: inline-flex;
    align-items: center;

    a {
        display: inline-block;
    }

    .photo {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        overflow: hidden;

        img {
            width: 100%;
            height: 100%;
        }
    }

    .username {
        margin-left: 10px;
        color: var(--WL-1);
        font-size: 18px;
    }
}
</style>