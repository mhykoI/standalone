import patcher from "../../../../patcher/index.js";

import cssText from "./style.scss";
patcher.injectCSS(cssText);

export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    vueApp.component("discord-button", {
      template: `
        <div class="button-ejjZWC lookFilled-1H2Jvj grow-2T4nbg" :class="\`\${color ? \`color\${color[0].toUpperCase()}\${color.slice(1).toLowerCase()}\` : 'colorBrand'} \${size ? \`size\${size[0].toUpperCase()}\${size.slice(1).toLowerCase()}\` : 'sizeMedium'}\`" @click="onClick">
          <div class="contents-3NembX">{{value}}</div>
        </div>
      `,
      props: ["value", "size", "color"],
      emits: ["click"],
      data() {
        return {
          buttonClasses
        }
      },
      methods: {
        onClick(e) {
          this.$emit("click", e);
        }
      }
    });
  }
}