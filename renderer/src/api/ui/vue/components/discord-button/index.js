import webpack from "../../../../../api/modules/webpack.js";

const buttonClasses = webpack.findByProperties("lowSaturationUnderline", "button", "disabledButtonOverlay");

export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    vueApp.component("discord-button", {
      template: `
        <div class="${buttonClasses.button} ${buttonClasses.lookFilled} ${buttonClasses.grow}" :class="\`\${color ? buttonClasses[\`color\${color[0].toUpperCase()}\${color.slice(1).toLowerCase()}\`] : buttonClasses.colorBrand} \${size ? buttonClasses[\`size\${size[0].toUpperCase()}\${size.slice(1).toLowerCase()}\`] : buttonClasses.sizeSmall}\`" @click="onClick">
          <div class="${buttonClasses.contents}">{{value}}</div>
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