import dom from "../../api/dom/index.js";
import patcher from "../../api/patcher/index.js";

import cssText from "./style.scss";
patcher.injectCSS(cssText);

async function show() {
  while (true) {
    if (document.querySelector("#app-mount")) break;
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  if (document.querySelector(".acord--startup-loading")) return;
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
    }, 500);
  }
}

export default {
  show,
  hide
}