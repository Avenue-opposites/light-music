import { App, Ref } from "vue";

export function random(from: number, to: number): number {
  return Math.floor(Math.random() * (to - from + 1) + from);
}

export const toString = Object.prototype.toString;

export function getType(value: unknown): string {
  return toString.call(value).slice(8, -1);
}

export function createStore(initialStore?: Record<string, any>) {
  const store = Object.assign(Object.create(null), initialStore || {});
  function set(key: PropertyKey, value: unknown) {
    store[key] = value;
  }
  function get(key: PropertyKey): unknown {
    return store[key];
  }
  function remove(key: PropertyKey): unknown {
    const value = store[key];
    store[key] = void 0;
    return value;
  }
  function clear() {
    Object.keys(store).forEach((key) => {
      store[key] = void 0;
    });
  }
  return {
    get,
    set,
    remove,
    clear,
  };
}

export function registerGlobal<K extends PropertyKey, V>(
  app: App,
  type: "component" | "directive" | "plugin",
  values: Record<K, V>
): void {
  if (type === "plugin") {
    (type as typeof type | string) = "use";
  }
  for (const [key, value] of Object.entries(values)) {
    app[type as keyof App](key, value);
  }
}

export function stringRefTrim(ref: Ref<string>): string {
  return ref.value.trim();
}

export function transition(
  time: number,
  from: number,
  to: number,
  callback: Function,
  cubicBezier?: [number, number, number, number]
): void {
  //差值
  const difference = to - from;
  //速度
  const speed = difference / time;
  //开始时间
  const startTime = performance.now();
  //当前值
  let currentValue = from;
  const [p1_x, p1_y, p2_x, p2_y] = cubicBezier || [0, 0, 1, 1];
  callback(currentValue);

  function _run() {
    //当前时间
    const now = performance.now();
    //过去的时间
    const pastTime = now - startTime;
    const newValue = speed * pastTime - currentValue;
    if (pastTime >= time) {
      currentValue = to;
      callback(currentValue);
      return;
    }
    currentValue += newValue;
    callback(currentValue);
    requestAnimationFrame(_run);
  }
  requestAnimationFrame(_run);
}

export function percentageIfy(dividend: number, divisor: number) {
  return `${((dividend / divisor) * 100).toFixed(2)}%`;
}

export function transformPlayCount(count: number): string {
  const hundredMillion = 1e8;
  const tenThousand = 1e4;
  if (count >= hundredMillion) {
    return `${to(count, hundredMillion)}亿`;
  } else if (count >= tenThousand) {
    return `${to(count, tenThousand)}万`;
  } else {
    return count.toString();
  }
  function to(n: number, d: number) {
    return (n / d).toFixed(0);
  }
}
