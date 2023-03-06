import patcher from "../../../../patcher/index.js";

import cssText from "./style.scss";
patcher.injectCSS(cssText);

export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    vueApp.component("discord-input", {
      template: `
        <div class="acord--discord-input">
          <div class="acord--discord-inputWrapper">
            <input :type="type ?? 'text'" class="acord--discord-inputDefault acord--discord-input-inner" :value="modelValue" :placeholder="placeholder" :maxlength="maxlength" :min="min" :step="step" :max="max" :style="style" @input="onInput" />
          </div>
        </div>
      `,
      props: ["modelValue", "placeholder", "type", "maxlength", "max", "min", "step", "style"],
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