import { throttle } from "lodash";
import { ref, computed } from "vue";

export default function useLoginForm() {
  const username = ref("");
  const password = ref("");
  const isReady = computed(() => Boolean(username.value && password.value));
  const tipMessage = ref("");
  const showTipMessageThrottled = throttle(
    (v1: string, v2: string) => showTipMessage(v1, v2),
    2000
  );

  function showTipMessage(v1: string, v2: string) {
    const u = !username.value ? v1 : "";
    const p = !password.value ? v2 : "";
    const and = u && p ? "和" : "";
    const message = `请输入${u}${and}${p}`;
    tipMessage.value = message;
    setTimeout(() => {
      tipMessage.value = "";
    }, 2000);
  }
  return {
    username,
    password,
    isReady,
    tipMessage,
    showTipMessage: showTipMessageThrottled,
  };
}
