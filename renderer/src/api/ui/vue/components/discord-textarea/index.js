import webpack from "../../../../modules/webpack.js";
import patcher from "../../../../patcher/index.js";

import cssText from "./style.scss";
patcher.injectCSS(cssText);


export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    let inputClasses = webpack.findByProperties("textArea", "maxLength", "characterCount");
    let inputClasses2 = webpack.findByProperties("inputWrapper", "inputDefault");
    let scrollClasses = webpack.findByProperties("scrollbarDefault", "scrollbar", "scrollbarGhost");
    vueApp.component("discord-textarea", {
      template: `
        <div class="${inputClasses2.inputWrapper} acord--discord-textarea">
          <textarea class="${inputClasses2.inputDefault} ${inputClasses.textArea} ${scrollClasses.scrollbarDefault}" :value="modelValue" :placeholder="placeholder" :maxlength="maxlength" :cols="cols" :rows="rows" :style="style" @input="onInput"></textarea>
        </div>
      `,
      props: ["modelValue", "placeholder", "maxlength", "style", "cols", "rows"],
      emits: ["input", 'update:modelValue'],
      methods: {
        onInput(event) {
          this.$emit("update:modelValue", event.target.value);
          this.$emit("input", { event, value: event.target.value });
        }
      }
    });
  }
}
