import { getCurrentInstance } from "vue";

export default function useGlobalState() {
  const app = getCurrentInstance()?.appContext;
  const globalState = app?.config.globalProperties;
  return globalState;
}
