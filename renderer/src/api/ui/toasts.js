import dom from "../dom/index.js";
import utils from "../utils/index.js";

function getContainer() {
  const appElm = document.querySelector('[class*="notAppAsidePanel-"]');

  let topContainer = appElm.querySelector(".acord--toasts-container");
  if (!topContainer) {
    topContainer = dom.parse(`<div class="acord--layer-container acord--toasts-container"></div>`);
    appElm.appendChild(topContainer);
  }
  topContainer.style.setProperty("--top-offset", `${appElm.getBoundingClientRect().top.toFixed(1)}px`);

  return topContainer;
}

const icons = {
  info: `<svg viewBox="0 0 24 24" width="24" height="24"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11v6h2v-6h-2zm0-4v2h2V7h-2z" fill="currentColor" /></svg>`,
  warning: `<svg viewBox="0 0 24 24" width="24" height="24"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-7v2h2v-2h-2zm0-8v6h2V7h-2z" fill="currentColor" /></svg>`,
  error: `<svg viewBox="0 0 24 24" width="24" height="24"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-7v2h2v-2h-2zm0-8v6h2V7h-2z"fill="currentColor" /></svg>`,
  success: `<svg viewBox="0 0 24 24" width="24" height="24"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-.997-6l7.07-7.071-1.414-1.414-5.656 5.657-2.829-2.829-1.414 1.414L11.003 16z" fill="currentColor" /></svg>`
}


function show(
  content,
  {
    style = "default",
    timeout = 3500,
    onClick = null,
    hideIcon = false
  } = {}
) {
  const container = getContainer();

  const toastElm = dom.parse(`
    <div class="acord--toast style-${style} hidden">
      ${hideIcon ? "" : (icons[style] || "")}
      <div class="content"></div>
    </div>
  `);

  let contentElm = toastElm.querySelector(".content");
  if (typeof content == "string") {
    contentElm.innerHTML = content;
  } else {
    contentElm.appendChild(content);
  }

  let closed = false;
  function close() {
    if (closed) return;
    closed = true;

    toastElm.classList.add("closing");
    setTimeout(() => {
      toastElm.remove();

      utils.ifExists(
        document.querySelector(`.acord--toasts-container`),
        /** @param {HTMLDivElement} elm */(elm) => {
          if (!elm.childElementCount) elm.remove();
        }
      );
    }, 275);
  }

  if (typeof onClick == "function") {
    toastElm.classList.add("clickable");
    toastElm.onclick = () => {
      onClick(close);
    };
  }

  container.appendChild(toastElm);
  requestAnimationFrame(() => {
    toastElm.classList.remove("hidden");
  });

  setTimeout(close, timeout);

  return () => {
    close();
  };
}

export default {
  show: Object.assign(show, {
    info: (html, obj = {}) => show(html, { ...obj, style: "info" }),
    error: (html, obj = {}) => show(html, { ...obj, style: "error" }),
    warning: (html, obj = {}) => show(html, { ...obj, style: "warning" }),
    success: (html, obj = {}) => show(html, { ...obj, style: "success" })
  })
}