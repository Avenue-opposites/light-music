import { onBeforeMount, reactive, UnwrapNestedRefs } from "vue";
import { ObjectExtension } from "@/types/utils";

export default function useLazyLoad<
  T extends ObjectExtension<{ value: R }>,
  R = Awaited<unknown>,
  F extends () => Promise<R> = () => Promise<R>
>(initial: T, request: F): UnwrapNestedRefs<T> {
  const data = reactive<T>(initial);
  onBeforeMount(async () => {
    const d = await request();
    (data.value as R) = d;
  });
  return data;
}
