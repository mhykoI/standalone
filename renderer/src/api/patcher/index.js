import * as spitRoast from "../../lib/spitroast/dist/esm";

const importRegex = /@import url\([\S\s]+\);?/g;
const propRegex = /var\(--acord--([\S\s]+)\)/g;
const propBoolRegex = /\(([\S\s]+)\)/;
function propReplacer(css, props = {}) {
  css = css.replace(propRegex, (match, group1) => {
    let splitted = group1.split(",");
    let key = splitted.shift().trim();
    let bool = propBoolRegex.exec(key)?.[1];
    key = key.replace(propBoolRegex, "");

    let returnValue = "";
    let defaultValue = splitted.join(",").trim();
    let propVal = props[_.camelCase(key)];
    if (bool) {
      let boolSplitted = bool.split(" ");
      returnValue = propVal ? boolSplitted[0] : boolSplitted[1];
    } else {
      returnValue = propVal ?? (defaultValue || match);
    }

    return returnValue;
  });
  css = css.replace(importRegex, (match, group1) => {
    let splitted = group1.replaceAll('"', "").split("#");
    if (splitted.length === 1) return match;
    let key = splitted[1];
    return props[_.camelCase(key)] ? match : "";
  });
  return css;
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
        css = null;
      }
    };
  },
  unPatchAllCSS() {
    document.querySelectorAll(".acord--injected-css").forEach(element => {
      element.remove();
    })
  }
}