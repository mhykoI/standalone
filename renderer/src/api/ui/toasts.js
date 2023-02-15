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


function show(
  content,
  {
    style = "default",
    timeout = 10000,
    onClick = null
  } = {}
) {
  const container = getContainer();

  const toastElm = dom.parse(`
    <div class="acord--toast style-${style} hidden">
        <div class="content"></div>
    </div>
  `);

}

export default {

}