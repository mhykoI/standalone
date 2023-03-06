import patcher from "../../../../patcher/index.js";

import cssText from "./style.scss";
patcher.injectCSS(cssText);


export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    vueApp.component("discord-textarea", {
      template: `
        <div class="inputWrapper-2K8ds1 acord--discord-textarea">
          <textarea class="inputDefault-Ciwd-S input-3O04eu textArea-3wfxMA scrollbarDefault-2w-Dyz scrollbar-3vVt8d" :value="modelValue" :placeholder="placeholder" :maxlength="maxlength" :cols="cols" :rows="rows" :style="style" @input="onInput"></textarea>
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
