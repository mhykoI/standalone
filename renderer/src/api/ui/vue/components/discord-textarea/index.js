import webpack from "../../../../modules/webpack.js";
import patcher from "../../../../patcher/index.js";

import cssText from "./style.scss";
patcher.injectCSS(cssText);

let inputClasses = webpack.findByProperties("textArea", "maxLength", "characterCount");
let inputClasses2 = webpack.findByProperties("inputWrapper", "inputDefault");
let scrollClasses = webpack.findByProperties("scrollbarDefault", "scrollbar", "scrollbarGhost");

export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    vueApp.component("discord-textarea", {
      template: `
        <div class="${inputClasses2.inputWrapper} acord--discord-textarea">
          <textarea class="${inputClasses2.inputDefault} ${inputClasses.textArea} ${scrollClasses.scrollbarDefault}" v-bind="value" :placeholder="placeholder" :maxlength="maxlength" :cols="cols" :rows="rows" :style="style"></textarea>
        </div>
      `,
      props: ["value", "placeholder", "maxlength", "style", "cols", "rows"],
      emits: ["change"],
      methods: {
        onChange(event) {
          this.$emit("change", { event, value: event.target.value });
        }
      }
    });
  }
}
