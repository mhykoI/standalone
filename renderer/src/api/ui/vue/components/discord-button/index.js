import patcher from "../../../../patcher/index.js";

import cssText from "./style.scss";
patcher.injectCSS(cssText);

export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    vueApp.component("discord-button", {
      template: `
        <div class="acord--discord-button acord--discord-button-lookFilled acord--discord-button-grow" :class="\`\${color ? \`color\${color[0].toUpperCase()}\${color.slice(1).toLowerCase()}\` : 'colorBrand'} \${size ? \`size\${size[0].toUpperCase()}\${size.slice(1).toLowerCase()}\` : 'sizeMedium'}\`" @click="onClick">
          <div class="acord--discord-button-contents">{{value}}</div>
        </div>
      `,
      props: ["value", "size", "color"],
      emits: ["click"],
      methods: {
        onClick(e) {
          this.$emit("click", e);
        }
      }
    });
  }
}