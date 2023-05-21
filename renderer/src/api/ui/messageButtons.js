import dom from "../dom/index.js";
import tooltips from "./tooltips";

const keyEventListeners = new Set();

window.addEventListener("keydown", (e) => {
  keyEventListeners.forEach((listener) => listener(e));
});

window.addEventListener("keyup", (e) => {
  keyEventListeners.forEach((listener) => listener(e));
});

const patches = new Set();

dom.patch(
  ".buttons-3dF5Kd > .wrapper-2vIMkT",
  (elm) => {
    let unPatches = [];
    patches.forEach((patch) => {
      unPatches.push(patch(elm));
    });
    return () => {
      unPatches.forEach((unPatch) => unPatch());
    };
  }
);

const out = {
  __cache__: {
    get patches() {
      return patches;
    }
  },
  patch(obj = { icon: "", tooltip: "", hiddenByDefault: false, position: "start", action: () => { } }) {
    if (!obj.icon) throw new Error("No icon provided");
    if (!obj.tooltip) throw new Error("No tooltip provided");
    if (!obj.action) throw new Error("No action provided");
    if (obj.position !== "start" && obj.position !== "end") throw new Error("Invalid position provided (must be start or end)");
    if (typeof obj.hiddenByDefault !== "boolean") obj.hiddenByDefault = false;

    const func = (elm) => {

      let buttonElm = dom.parse(`<div class="button-3bklZh" role="button"></div>`);

      let tooltip = tooltips.create(buttonElm, obj.tooltip);

      let iconElm = dom.parse(obj.icon);
      iconElm.classList.add("icon-tZV_7s");

      buttonElm.appendChild(iconElm);

      elm.setAttribute("width", "18");
      elm.setAttribute("height", "18");

      [...elm.children].forEach((child, childIndex) => {
        child.setAttribute("tabindex", childIndex);
      });

      function onKeyEvent(e) {
        if (e.key === "Shift") {
          buttonElm.style.display = e.type === "keyup" ? "none" : "";
        }
      }

      buttonElm.onclick = obj.action;

      if (obj.hiddenByDefault) {
        keyEventListeners.add(onKeyEvent);
        buttonElm.style.display = "none";
      }

      if (obj.position === "start") {
        elm.prepend(buttonElm)
      } else if (obj.position === "end") {
        elm.appendChild(buttonElm);
      }

      return () => {
        if (obj.hiddenByDefault)
          keyEventListeners.delete(onKeyEvent);

        buttonElm.remove();
        tooltip.destroy();
      }
    };

    patches.add(func);
    return () => {
      patches.delete(func);
    }
  }
}

export default out;