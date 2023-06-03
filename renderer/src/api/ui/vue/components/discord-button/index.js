import patcher from "../../../../patcher/index.js";

import cssText from "./style.scss";
patcher.injectCSS(cssText);

export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    vueApp.component("discord-button", {
      template: `
        <div class="acord--discord-button acord--discord-button-lookFilled acord--discord-button-grow colorBrand sizeMedium" :style="{width}" :class="{disabled}" @click="onClick">
          <div class="acord--discord-button-contents">{{content}}</div>
        </div>
      `,
      props: ["content", "disabled", "width"],
      emits: ["click"],
      methods: {
        onClick(e) {
          if (this.disabled) return;
          this.$emit("click", e);
        }
      }
    });
  }
}