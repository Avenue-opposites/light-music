<template>
    <form class="SMS-login">
        <div class="field">
            <p class="phone-number">
                <span @click="isShowCountryCode = true">
                    <span class="country-code">
                        <span>+</span>86
                    </span>
                    <el-icon class="arrow-down-bold" color="var(--GRAY-L-2)">
                        <ArrowDownBold />
                    </el-icon>
                    <OnClickOutside @trigger="isShowCountryCode = false">
                        <CountryCode v-if="isShowCountryCode" />
                    </OnClickOutside>
                </span>
                <input maxlength="15" type="text" :value="phoneNumber" @input="phoneNumberInputHandler"
                    placeholder="请输入手机号">
                <button :class="['get-auth-code', 'transition-color', isAuth && 'active']"
                    :disabled="!isAuth">获取验证码</button>
            </p>
            <p class="auth-code">
                <span>验证码</span>
                <input maxlength="6" type="text" :value="authCode" @input="authCodeInputHandler" placeholder="请输入验证码">
            </p>
        </div>

        <Button @click="login" :class="['login-register', 'transition-opacity', !isReady && 'disabled']"
            round>登录/注册</Button>
        <Transition name="bounce">
            <span v-if="Boolean(tipMessage)" class="tip-message">
                {{ tipMessage }}
            </span>
        </Transition>
    </form>
</template>

<script setup lang="ts">
import { OnClickOutside } from "@vueuse/components";
import useLoginForm from "@/hooks/useLoginForm";
import CountryCode from "@/components/CountryCode.vue";
import { computed, Ref, ref } from "vue";
const { username: phoneNumber, password: authCode, isReady, tipMessage, showTipMessage } = useLoginForm();
const phoneNumberBit = 11;
const phoneNumberReg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
const isAuth = computed(() => (phoneNumber.value.length === phoneNumberBit) && phoneNumberReg.test(phoneNumber.value));
//是否展示国家码
const isShowCountryCode = ref(false);
const phoneNumberInputHandler = createInputHandler(phoneNumber);
const authCodeInputHandler = createInputHandler(authCode);
//登录
function login() {
    //手机号和验证码都输入
    if (isReady.value) {

    } else {
        showTipMessage("手机号", "验证码");
    }
}
//创建输入处理器(判断是否为数字)
function createInputHandler(ref: Ref<unknown>) {
    return (event: Event) => {
        const target = event.target as HTMLInputElement;
        const value = target.value;
        if (/^\d*$/g.test(value)) {
            ref.value = value;
        } else {
            target.value = value.replace(/[^\d]/g, "");
        }
    }
}
</script>

<style lang="less" scoped>
.SMS-login {
    position: relative;
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;

    .field {
        width: 100%;
        margin: 30px 0;
        border: 1px solid var(--thin-border);
        border-radius: 10px;

        .phone-number,
        .auth-code {
            position: relative;
            display: flex;
            align-items: center;
            padding: 15px 25px;

            >span {
                margin-right: 25px;
                font-size: 20px;
            }

            input {
                border: none;
                outline: none;
                width: 200px;
                margin-right: 50px;

                // 谷歌
                &::-webkit-inner-spin-button,
                &::-webkit-outer-spin-button {
                    -webkit-appearance: none;
                    appearance: none;
                }

                // 火狐
                -moz-appearance: none;

                &::placeholder {
                    color: var(--GRAY-L-6);
                }
            }
        }

        .phone-number {
            border-bottom: 1px solid var(--thin-border);

            >span {
                margin-right: 5px;
                cursor: pointer;
                position: relative;
                width: 80px;
                display: inline-flex;
                justify-content: space-between;
                align-items: center;

                .country-code {
                    margin: 0;

                    >span {
                        vertical-align: 2px;
                        margin: 0;
                    }
                }

                .arrow-down-bold {
                    font-size: 20px;
                }
            }

            .get-auth-code {
                cursor: not-allowed;
                position: relative;
                margin-left: 30px;
                border: none;
                font-weight: bold;
                color: var(--GRAY-L-2);
                background-color: transparent;

                &::before {
                    position: absolute;
                    left: -50%;
                    top: -20%;
                    content: "";
                    width: 1px;
                    height: 150%;
                    background-color: var(--thin-border);
                }
            }

            .active {
                cursor: pointer;
                color: var(--RD-3);
            }
        }
    }

    .login-register {
        width: 250px;
        height: 50px;
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