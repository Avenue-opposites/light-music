<!-- 登录界面 -->
<template>
    <div style="min-width:600px" :class="['login', 'transition-background-image', passwordFocus && 'passwordFocus']">
        <div class="login-container">
            <div class="login-scan">
                <h2>扫描二维码登录</h2>
                <QRCode @refresh="refresh" :state="QRCodeInformation.stateCode" :url="QRCodeInformation.src" />
                <div class="description">
                    <p>
                        请使用
                        <a href="https://music.163.com/#/download">
                            网易云音乐客户端
                        </a>
                    </p>
                    <p>
                        扫码登录或扫码下载APP
                    </p>
                </div>
            </div>
            <div class="mini-line"></div>
            <div class="login-area">
                <div class="login-tab">
                    <h3 class="transition-color"
                        :style="{ color: currentForm === 'PasswordLogin' ? 'var(--RD-3)' : 'black' }"
                        @click="currentForm = 'PasswordLogin'">密码登录</h3>
                    <h3 class="transition-color" :style="{ color: currentForm === 'SMSLogin' ? 'var(--RD-3)' : 'black' }"
                        @click="currentForm = 'SMSLogin'">短信登录</h3>
                </div>
                <div class="login-form">
                    <PasswordLogin @on-password-focus="passwordFocus = true" @on-password-blur="passwordFocus = false"
                        v-show="currentForm === 'PasswordLogin'" />
                    <SMSLogin v-show="currentForm === 'SMSLogin'" />
                </div>
            </div>
        </div>
        <div class="login-agreement">
            <p>未注册过网易云音乐的手机号，我们将自动帮你注册账号</p>
            <p>
                登录或完成注册即代表你同意
                <span>
                    <a target="_blank" href="https://st.music.163.com/official-terms/service">
                        服务条款
                    </a>
                </span>
                和
                <span>
                    <a target="_blank" href="https://st.music.163.com/official-terms/privacy">
                        隐私政策
                    </a>
                </span>
                以及
                <span>
                    <a target="_blank" href="https://st.music.163.com/official-terms/children">
                        儿童隐私政策
                    </a>
                </span>
            </p>
        </div>

        <el-icon @click="close" class="close">
            <Close />
        </el-icon>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, onBeforeMount, onMounted } from "vue";
import { QR_CODE_STATE } from "@/types";
import getQRCodeKey from "@/api/QRCodeKey";
import getQRCode from "@/api/QRCode";
import getQRCodeCheck from "@/api/QRCodeCheck";
import QRCode from "@/common/QRCode.vue";
import PasswordLogin from "@/components/PasswordLogin.vue";
import SMSLogin from "@/components/SMSLogin.vue";

type QRCodeInfo = {
    src: string;
    key: string;
    stateCode: QR_CODE_STATE;
};
type currentState = "PasswordLogin" | "SMSLogin";
const QRCodeInformation = reactive<QRCodeInfo>({
    src: "",
    key: "",
    stateCode: QR_CODE_STATE.WAITING
});

const emits = defineEmits<{
    (e: "close"): void
}>();
onBeforeMount(() => {
    requestQRCode();
});
const currentForm = ref<currentState>("PasswordLogin");
const passwordFocus = ref(false);
let cancelFn: Function | null = null;
async function requestQRCode() {
    //获取二维码key
    const { data: { unikey } } = await getQRCodeKey();
    QRCodeInformation.key = unikey;
    //获取二维码
    const { data } = await getQRCode(unikey, true);
    QRCodeInformation.src = data.qrimg;
    //开始轮询
    polling(async (_, cancel) => {
        const { data } = await getQRCodeCheck(unikey);
        const { code, cookie } = data;
        console.log(data);
        switch (code) {
            //如果二维码过期,就取消轮询
            case QR_CODE_STATE.OVERDUE:
                cancel();
                console.log("二维码过期");
                QRCodeInformation.stateCode = QR_CODE_STATE.OVERDUE;
                break;
            //等待扫码
            case QR_CODE_STATE.WAITING:
                console.log("等待扫码");
                QRCodeInformation.stateCode = QR_CODE_STATE.WAITING;
                break;
            //扫码未确认和等待扫码
            case QR_CODE_STATE.UNCONFIRMED:
                console.log("扫码未确认");
                QRCodeInformation.stateCode = QR_CODE_STATE.UNCONFIRMED;
                break;
            //登录成功
            case QR_CODE_STATE.LOGIN_SUCCEED:
                console.log("登录成功");
                QRCodeInformation.stateCode = QR_CODE_STATE.LOGIN_SUCCEED;
                document.cookie = cookie;
                close();
                break;
            default:
                console.log("未知");
                cancel();
                break;
        }
    }, 3000, {
        onBeforePolling(cancel: Function) {
            cancelFn = cancel;
        }
    });
}
function refresh() {
    requestQRCode();
}
function close() {
    emits('close');
    cancelFn && cancelFn();
}
//轮询函数
function polling(task: (run: Function, cancel: Function) => void, time: number, hooks?: { onBeforePolling?: Function, onAfterPolling?: Function }) {
    let timer: number | null = null;
    const empty = () => { };
    const onBeforePolling = hooks?.onBeforePolling || empty;
    const onAfterPolling = hooks?.onAfterPolling || empty;
    function run() {
        if (timer) cancel();
        onBeforePolling && onBeforePolling(cancel);
        timer = setInterval(() => {
            task(run, cancel);
        }, time);
        onBeforePolling && onBeforePolling(cancel);
    }
    function cancel() {
        if (timer) {
            clearInterval(timer);
        }
    }
    run();
}
</script>

<style lang="less" scoped>
.login {
    position: relative;
    width: 1000px;
    height: 550px;
    padding: 52px 65px 29px 92px;
    background-color: var(--WL-1);
    background-image: url(@/assets/images/22_open.png), url(@/assets/images/33_open.png);
    background-repeat: no-repeat;
    background-size: 14%;
    background-position: 0 100%, 100% 100%;
    border-radius: 10px;


    .login-container {
        width: 100%;
        height: 100%;
        display: flex;

        .login-scan {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;

            >h2 {
                font-size: 24px;
                margin-bottom: 20px;
            }

            .description {
                margin-top: 30px;
                font-size: 18px;

                :first-child {
                    font-size: 16px;

                    a {
                        color: var(--RD-3);
                    }
                }
            }
        }

        .mini-line {
            width: 1px;
            height: 300px;
            background-color: var(--thin-border);
            margin: 50px 60px;
        }

        .login-area {
            flex: 2;

            .login-tab {
                font-size: 24px;
                position: relative;
                display: flex;
                justify-content: center;

                :first-child {
                    margin-right: 20px;
                }

                :last-child {
                    margin-left: 20px;
                }

                &::before {
                    content: "";
                    position: absolute;
                    width: 1px;
                    height: 30px;
                    background-color: var(--thin-border);
                }
            }

            .login-form {
                font-weight: bold;
            }
        }
    }

    .login-agreement {
        text-align: center;
        position: absolute;
        font-size: 17px;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);

        span {
            >a {
                color: var(--RD-3);
            }
        }
    }

    .close {
        position: absolute;
        right: 18px;
        top: 18px;
        color: var(--BLACK-D-3);
        font-size: 42px;
    }
}

.passwordFocus {
    background-image: url(@/assets/images/22_close.png), url(@/assets/images/33_close.png);
}
</style>