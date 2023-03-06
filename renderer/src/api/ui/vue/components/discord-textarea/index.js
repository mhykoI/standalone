import patcher from "../../../../patcher/index.js";

import cssText from "./style.scss";
patcher.injectCSS(cssText);


export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    vueApp.component("discord-textarea", {
      template: `
        <div class="acord--discord-textarea-inputWrapper acord--discord-textarea">
          <textarea class="acord--discord-textarea-inputDefault acord--discord-textarea-input acord--discord-textarea-textArea acord--discord-textarea-scrollbarDefault acord--discord-textarea-scrollbar" :value="modelValue" :placeholder="placeholder" :maxlength="maxlength" :cols="cols" :rows="rows" :style="style" @input="onInput"></textarea>
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
