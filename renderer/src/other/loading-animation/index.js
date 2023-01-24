import dom from "../../api/dom/index.js";
import patcher from "../../api/patcher/index.js";

import cssText from "./style.scss";
let unInject;

async function show() {
  if (document.querySelector(".acord--startup-loading")) return;
  while (true) {
    if (document.querySelector("#app-mount")) break;
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  unInject = patcher.injectCSS(cssText);
  const element = dom.parse(`
    <div class="acord--startup-loading"></div>
  `)
  document.querySelector("#app-mount").appendChild(element);
}

function hide() {
  let elm = document.querySelector(".acord--startup-loading");
  if (elm) {
    elm.classList.add("hidden");
    setTimeout(() => {
      elm.remove();
      unInject?.();
      unInject = null;
    }, 500);
  }
}

export default {
  show,
  hide
}