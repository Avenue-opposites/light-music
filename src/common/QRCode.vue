<!-- 展示二维码的组件 -->
<template>
    <div class="QR-code">
        <div :style="{ backgroundImage: `url(${$props.url})` }" class="QR-code-container"></div>
        <Fade>
            <div @click="emits('refresh')" v-if="$props.state === QR_CODE_STATE.OVERDUE" class="overdue">
                <el-icon color="var(--RD-3)" class="refresh">
                    <RefreshRight />
                </el-icon>
                <span>二维码已过期</span>
                <span>请点击刷新</span>
            </div>
            <div v-else-if="$props.state === QR_CODE_STATE.UNCONFIRMED" class="unconfirmed">
                <el-icon color="var(--RD-3)" class="check">
                    <Check />
                </el-icon>
                <span>扫码成功</span>
                <span>请在手机上确认</span>
            </div>
            <div v-else-if="$props.state === QR_CODE_STATE.LOGIN_SUCCEED" class="login-succeed">
                <el-icon color="var(--RD-3)" class="check">
                    <Check />
                </el-icon>
                <span>登录成功</span>
            </div>
        </Fade>
    </div>
</template>

<script setup lang="ts">
import { QR_CODE_STATE } from "@/types";
const emits = defineEmits<{
    (e: "refresh"): void;
}>();
defineProps<{
    state: QR_CODE_STATE;
    url: string
}>();
</script>

<style lang="less" scoped>
.QR-code {
    position: relative;
    width: 200px;
    height: 200px;
    border: 1px solid var(--GRAY-L-2);
    border-radius: 10px;
    overflow: hidden;

    .QR-code-container {
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-size: cover;
    }

    .overdue,
    .unconfirmed,
    .login-succeed {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: var(--WL-2);

        span {
            font-size: 14px;
            font-weight: 600;
            color: var(--GRAY-L-4);
        }

        .refresh,
        .check {
            @size: 70px;
            width: @size;
            height: @size;
            background-color: var(--WL-1);
            border-radius: 50%;
            font-size: 32px;
            margin-bottom: 10px;
        }
    }
}
</style>