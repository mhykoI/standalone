import dom from "../../dom/index.js";
import utils from "../../utils/index.js";

function getContainer() {
  const appElm = document.querySelector('[class*="notAppAsidePanel-"]');

  let topContainer = appElm.querySelector(".acord--modal-layer");
  if (!topContainer) {
    topContainer = dom.parse(`<div class="acord--layer-container acord--modal-layer"></div>`);
    appElm.appendChild(topContainer);
  }

  return topContainer;
}

const modals = new Set();

export function show(content) {
  /** @type {HTMLDivElement} */
  let layerContainer = getContainer();

  /** @type {HTMLDivElement} */
  let layerElement = dom.parse(`<div class="acord--inner-layer"></div>`);

  let closed = false;
  let onCloseCbs = [];

  async function close() {
    if (closed) return;
    closed = true;

    requestAnimationFrame(() => {
      content.classList.add("hidden");
      setTimeout(() => layerElement.remove?.(), 200);

      if (!document.querySelector(".acord--modal-root:not(.hidden)")) {
        utils.ifExists(
          layerContainer.querySelector(`.acord--backdrop`),
          (el) => {
            el.classList.add("hidden");
            setTimeout(() => el.remove(), 200);
          }
        );
      }

      onCloseCbs.forEach(f => f());
    });

    modals.delete(layerElement);
    setTimeout(() => {
      if (modals.size) [...modals.values()].at(-1)?.classList.remove("hidden");
    }, 200);
  }

  layerElement.addEventListener("click", (e) => {
    if (!e.target.classList.contains("acord--inner-layer")) return;
    close();
  });

  content = typeof content == "function" ? content({
    close,
    onClose(cb) {
      onCloseCbs.push(cb);
    }
  }) : content;
  content = typeof content == "string" ? dom.parse(content) : content;

  content.classList.add("acord--modal-root", "hidden");

  layerElement.replaceChildren(content);
  layerContainer.appendChild(layerElement);

  if (!layerContainer.querySelector(`.acord--backdrop`)) {
    let backdropElement = dom.parse(`<div class="acord--backdrop hidden"></div>`)
    layerContainer.prepend(backdropElement);
    requestAnimationFrame(() => backdropElement.classList.remove("hidden"));
  }

  requestAnimationFrame(() => {
    content.classList.remove("hidden");
  });

  modals.forEach(elm => {
    elm.classList.add("hidden");
  });

  modals.add(layerElement);

  return {
    close,
    onClose(cb) {
      onCloseCbs.push(cb);
    }
  }
}