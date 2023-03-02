import * as spitRoast from "../../lib/spitroast/dist/esm";

function propReplacer(css, props = {}) {
  return css.replace(/var\(--acord--([\S\s]+)\)/g, (match, group1) => {
    let splitted = group1.split(",");
    let key = splitted.shift().trim();
    let defaultValue = splitted.join(",").trim();
    return props[key] ?? (defaultValue || match);
  });
}

export default {
  __cache__: {
    patched: spitRoast.patched,
  },
  before: spitRoast.before,
  after: spitRoast.after,
  instead: spitRoast.instead,
  unPatchAll: spitRoast.unPatchAll,
  injectCSS(css, customProps = {}) {
    const style = document.createElement("style");
    style.className = `acord--injected-css`;
    style.textContent = propReplacer(css, customProps);
    document.head.appendChild(style);

    return (...args) => {
      if (typeof args[0] === "string") {
        style.textContent = propReplacer(args[0], args[1]);
        css = args[0];
      } else if (typeof args[0] === "object") {
        style.textContent = propReplacer(css, args[0]);
      } else {
        style?.remove();
      }
    };
  },
  unPatchAllCSS() {
    document.querySelectorAll(".acord--injected-css").forEach(element => {
      element.remove();
    })
  }
}