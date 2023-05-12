import { DirectiveBinding } from "vue";
import { random } from "@/utils";
import { isString, isObject } from "lodash";
const action = {
  jump: `
  @keyframes jump {
    0% {
      transform: translateY(0%);
    }
    50% {
      transform: translateY(100%);
    }
    100% {
      transform: translateY(0%);
    }
  }`,
  rotate: `
  @keyframes rotate {
    25% {
      transform: rotate(90deg);
    }
    50% {
      transform: rotate(180deg);
    }
    75% {
      transform: rotate(270deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  `,
};

type Action = typeof action & { [key: PropertyKey]: string };
type RapAction = keyof Action;

interface RapElementOptions {
  action: RapAction | "random";
  delay: number;
  time: {
    to: number;
    from: number;
  };
}

interface RapOptions extends RapElementOptions {
  deep: boolean;
  src: string;
  pause: boolean;
}
type RapValue = RapOptions | boolean;

const defaultOptions: RapOptions = {
  action: "jump",
  deep: false,
  delay: 1000,
  src: "",
  pause: true,
  time: {
    from: 1000,
    to: 3000,
  },
};
let initialNodes: HTMLElement[];
let audio: HTMLAudioElement;
const Rap = Symbol("__v_rap");

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const value: RapValue = binding.value;
    initialNodes = [...(el.childNodes as unknown as HTMLElement[])];
    //当指令存在时
    if (value) {
      const options: RapOptions = isObject(value)
        ? Object.assign({}, defaultOptions, value)
        : defaultOptions;
      //注入动画样式
      const style = document.createElement("style");
      const head = document.getElementsByTagName("head")[0];
      style.innerText = generateAnimation(action);
      head.appendChild(style);

      audio = createMusic(options.src);
      options.pause ? audio.pause() : audio.play();
      head.appendChild(audio);

      const clone = el.cloneNode(true);
      const children = traverseChildrenNode(clone as HTMLElement, options);
      cleanup(el);
      el.append(...children);
    }
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    const value: RapValue = binding.value;
    const options: RapOptions = isObject(value)
      ? Object.assign({}, defaultOptions, value)
      : defaultOptions;
    if (value) {
      const children = [];
      for (const node of initialNodes) {
        children.push(...traverseNodeToRap(node, options));
      }
      cleanup(el);
      el.append(...children);
    } else {
      cleanup(el);
      el.append(...initialNodes);
    }
    options.pause ? audio.pause() : audio.play();
    audio.src = options.src;
  },
};

function traverseNodeToRap(
  el: HTMLElement,
  options: RapOptions
): HTMLElement[] {
  const { nodeType, textContent } = el;
  const children = [];
  switch (nodeType) {
    //文本节点
    case Node.TEXT_NODE:
      // console.log(createRapElements(textContent));
      children.push(...createRapElements(textContent, options));
      break;
    //元素节点
    case Node.ELEMENT_NODE:
      if (options.deep) {
        const child = traverseChildrenNode(el, options);
        cleanup(el);
        el.append(...child);
      } else {
        el.style.cssText += createRapStyle(options);
      }
      children.push(el);
      break;
    default:
      break;
  }
  return children;
}

function traverseChildrenNode(
  el: HTMLElement,
  options: RapOptions
): HTMLElement[] {
  let children = [];
  const nodes = Array.from(el.childNodes);
  for (const i in nodes) {
    const node = nodes[i];
    children.push(...traverseNodeToRap(node as HTMLElement, options));
  }
  return children;
}

function createRapElements(
  textContent: string | null,
  options: RapElementOptions
): HTMLElement[] {
  if (textContent === null) return [];
  //清空空格
  const text = textContent?.trim();
  //生成Rap元素数组
  const characterEls = text
    ?.split("")
    .map((el) => createRapElement(el, options));
  return characterEls;
}

function createRapElement(
  character: string,
  options: RapElementOptions
): HTMLSpanElement {
  const span = document.createElement("span");
  span.style.cssText = createRapStyle(options);
  span.innerText = character;
  return span;
}

function createRapStyle(options: RapElementOptions) {
  const delay = options.delay;
  const time = random(options.time.from, options.time.to);
  let animation;
  if (options.action === "random") {
    const actionKeys = Object.keys(action);
    animation = actionKeys[random(0, actionKeys.length - 1)];
  } else {
    animation = options.action;
  }
  const cssText = `
    display:inline-block;
    animation: ${
      isString(animation) ? animation : String(animation)
    } ${delay}ms ${time}ms infinite reverse;
    `;
  return cssText;
}

function createMusic(src: string) {
  //音乐注入
  const audio = document.createElement("audio");
  audio.src = src;
  audio.autoplay = true;
  audio.loop = true;
  return audio;
}

function generateAnimation(action: Action) {
  let animation = "";
  Object.keys(action).forEach((key) => {
    animation += action[key as RapAction];
  });
  return animation;
}

function cleanup(el: HTMLElement) {
  el.innerHTML = "";
}

function addAction(type: PropertyKey, value: string) {
  const act = (action as Action)[type];
  if (!act) {
    (action as Action)[type] = value;
  }
}
