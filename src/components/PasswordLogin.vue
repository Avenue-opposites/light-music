<template>
    <form class="password-login">
        <div class="field">
            <p class="username">
                <span>账号</span>
                <input type="text" v-model.trim="username" placeholder="请输入账号">
            </p>
            <p class="password">
                <span>密码</span>
                <input :type="isHide ? 'password' : 'text'" v-model.trim="password" @focus="focusHandler"
                    @blur="blurHandler" placeholder="请输入密码">
            <div class="forget-password">
                <el-icon @click="toggleHide" color="var(--GRAY-L-4)" class="hide">
                    <Hide v-if="isHide" />
                    <View v-else />
                </el-icon>
                <span>忘记密码?</span>
            </div>
            </p>
        </div>
        <div class="button-container">
            <Button class="register" round>注册</Button>
            <Button @click="login" :class="['logging', 'transition-opacity', !isReady && 'disabled']" round>登录</Button>
        </div>
        <Transition name="bounce">
            <span v-if="Boolean(tipMessage)" class="tip-message">
                {{ tipMessage }}
            </span>
        </Transition>
    </form>
</template>

<script setup lang="ts">
import useLoginForm from "@/hooks/useLoginForm";
import { ref } from 'vue';
const { username, password, isReady, tipMessage, showTipMessage } = useLoginForm();
const emits = defineEmits<{
    (e: "onPasswordFocus"): void;
    (e: "onPasswordBlur"): void;
}>();
const isHide = ref(true);
function focusHandler() {
    emits("onPasswordFocus");
}
function blurHandler() {
    emits("onPasswordBlur")
}
function login() {
    //账号和密码都输入
    if (isReady.value) {

    } else {
        showTipMessage("账号", "密码");
    }
}
function toggleHide() {
    isHide.value = !isHide.value;
}
</script>

<style lang="less" scoped>
.password-login {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;

    .field {
        margin: 30px 0;
        border: 1px solid var(--thin-border);
        border-radius: 10px;

        .username,
        .password {
            position: relative;
            display: flex;
            align-items: center;
            padding: 15px 25px;

            >span {
                font-size: 20px;
                margin-right: 25px;
            }

            input {
                border: none;
                outline: none;
                width: 300px;

                &::placeholder {
                    color: var(--GRAY-L-6);
                }
            }
        }

        .password {
            border-top: 1px solid var(--thin-border);

            input {
                width: 250px;

                &::-ms-clear,
                &::-ms-reveal {
                    display: none;
                }
            }

            .forget-password {
                cursor: pointer;
                font-size: 20px;
                position: absolute;
                display: flex;
                align-items: center;
                right: 20px;

                .hide {
                    font-size: 24px;
                    margin: 0 10px;
                }

                span {
                    color: var(--RD-3);

                }
            }
        }
    }

    .button-container {
        display: flex;
        justify-content: space-between;

        .register,
        .logging {
            width: 250px;
            height: 50px;
        }
    }

    .tip-message {
        transition: opacity, transform .15s ease-out;
        color: var(--WL-1);
        background-color: var(--BLACK-D-4);
        font-weight: normal;
        font-size: 16px;
        border-radius: 5px;
        padding: 10px 20px;
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        transform: translateX(-50%);
        left: 50%;
        top: 30%;
    }

    .bounce-enter-from {
        opacity: 0;
        transform: translate(-50%, 100%);
    }

    .bounce-enter-leave {
        opacity: 1;
        transform: translate(-50%, 0%);
    }
}
</style>