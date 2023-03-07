import dom from "../dom/index.js";
import utils from "../utils/index.js";

const validPositions = [
  "top-right",
  "top-left",
  "bottom-right",
  "bottom-left"
]

function getContainer(position) {
  if (!validPositions.includes(position)) throw new Error(`Invalid position "${position}". Valid positions are: ${validPositions.join(", ")}`);
  const appElm = document.querySelector('[class*="notAppAsidePanel-"]');

  let topContainer = appElm.querySelector(".acord--notification-layer-container");
  if (!topContainer) {
    topContainer = dom.parse(`<div class="acord--layer-container acord--notification-layer-container"></div>`);
    appElm.appendChild(topContainer);
  }
  topContainer.style.setProperty("--top-offset", `${appElm.getBoundingClientRect().top.toFixed(1)}px`);

  let positionContainer = topContainer.querySelector(`.acord--notification-layer.${position}`);
  if (!positionContainer) {
    positionContainer = dom.parse(`<div class="acord--notification-layer ${position}"></div>`);
    topContainer.appendChild(positionContainer);
  }

  return positionContainer;
}

function show(content, {
  style = "default",
  timeout = 10000,
  position = "top-right",
  closable = true,
  onClick = null,
  onClose = null
} = {}) {
  const container = getContainer(position);

  const notifElm = dom.parse(`
    <div class="acord--notification style-${style} hidden">
        <div class="container">
            <div class="content"></div>
            <svg class="close ${!closable ? "hidden" : ""}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="currentColor" d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"/>
            </svg>
        </div>
        <div class="progress-container" style="--duration: ${timeout}ms;">
            <div class="progress"></div>
        </div>
    </div>
  `);

  notifElm.querySelector(".content").innerHTML = content;

  let closed = false;
  function close(closeType) {
    if (closed) return;
    closed = true;

    notifElm.classList.add("closing");
    setTimeout(() => {
      notifElm.remove();

      utils.ifExists(
        document.querySelector(`.acord--notification-layer-container`),
        /** @param {HTMLDivElement} elm */(elm) => {
          if (!([...elm.childNodes.values()].reduce((prev, curr) => prev + curr.childElementCount, 0))) elm.remove();
        }
      );
    }, 275);
    onClose?.(closeType);
  }

  if (typeof onClick == "function") {
    notifElm.classList.add("clickable");
    notifElm.onclick = () => {
      onClick(close);
    };
  }

  utils.ifExists(notifElm.querySelector(".close"), (elm) => {
    elm.onclick = () => {
      close("user");
    };
  });

  container.prepend(notifElm);
  requestAnimationFrame(() => {
    notifElm.classList.remove("hidden");
    notifElm.querySelector(".progress").classList.add("progressing");
  });

  setTimeout(() => {
    close("timeout");
  }, timeout);

  return () => {
    close("force");
  };
}

export default {
  show: Object.assign(show, {
    info: (html, obj = {}) => show(html, { ...obj, style: "info" }),
    error: (html, obj = {}) => show(html, { ...obj, style: "error" }),
    warning: (html, obj = {}) => show(html, { ...obj, style: "warning" }),
    success: (html, obj = {}) => show(html, { ...obj, style: "success" }),
  }),
};