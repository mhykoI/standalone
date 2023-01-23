import * as spitRoast from "../../lib/spitroast/dist/esm";

export default {
  __cache__: {
    patched: spitRoast.patched,
  },
  before: spitRoast.before,
  after: spitRoast.after,
  instead: spitRoast.instead,
  unPatchAll: spitRoast.unPatchAll,
  injectCSS(css) {
    const style = document.createElement("style");
    style.className = `acord--injected-css`;
    style.textContent = css;
    document.head.appendChild(style);

    return () => {
      style?.remove();
    };
  },
  unPatchAllCSS() {
    document.querySelectorAll(".acord--injected-css").forEach(element => {
      element.remove();
    })
  }
}