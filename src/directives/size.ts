import { DirectiveBinding } from "vue";

export type Size = {
  width: number;
  height: number;
};

const map = new WeakMap<HTMLElement, Function>();
const observer = new ResizeObserver(
  (entries: ResizeObserverEntry[], observer: ResizeObserver) => {
    for (const entry of entries) {
      const el = entry.target;
      const size = entry.borderBoxSize[0];
      const handler = map.get(el as HTMLElement);
      handler &&
        handler({
          width: size.inlineSize,
          height: size.blockSize,
        });
    }
  }
);

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const handler = binding.value;
    observer.observe(el);
    map.set(el, handler);
    handler({
      width: el.clientWidth,
      height: el.clientHeight,
    });
  },
  unmounted(el: HTMLElement) {
    observer.unobserve(el);
    map.delete(el);
  },
};
