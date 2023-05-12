<template>
    <div class="navigation">
        <div class="logo">
            网易云音乐
        </div>
        <div class="search">
            <input type="text" placeholder="请输入歌曲或者作者......">
        </div>
        <div class="login">
            <button v-if="!profile" @click="show">登录</button>
            <Profile :avatarUrl="profile?.avatarUrl" :nickname="profile?.nickname" v-else />
        </div>
    </div>
    <Backdrop :cover="isShowLoginPanel">
        <Login @close="close" />
    </Backdrop>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from "pinia";
import Login from "@/components/Login.vue";
import useLoginState from "@/stores/loginState";
const isShowLoginPanel = ref(false);
const { profile } = storeToRefs(useLoginState());

function show() {
    isShowLoginPanel.value = true;
}

function close() {
    isShowLoginPanel.value = false;
}
</script>

<style lang="less" scoped>
.navigation {
    display: grid;
    grid-template-columns: max-content auto auto;
    grid-auto-flow: column;
    column-gap: 20px;
    width: 100%;
    height: var(--navigation-h);
    font-size: var(--FM-2);
    padding: 0 20px;
    background-color: var(--primary-bg);
    color: var(--fc);

    .logo {
        line-height: var(--navigation-h);
    }

    .search {
        display: inline-flex;
        align-items: center;

        input {
            font-size: 12px;
            border: none;
            outline: none;
            height: 40px;
            padding: 0 20px 0 35px;
            border-radius: 20px;
            background-image: url(@/assets/svg/search.svg);
            background-repeat: no-repeat;
            background-size: 20px;
            background-position: 10px center;
        }
    }

    .login {
        width: 100%;
        height: 100%;
        display: inline-flex;
        align-items: center;
        justify-content: end;
        justify-self: end;

        button {
            font-weight: bold;
            width: 80px;
            height: 40px;
            border: none;
            background-color: rgb(255, 0, 0);
            color: var(--fc);
            font-size: var(--fs);
            border-radius: 5px;
        }
    }
}
</style>