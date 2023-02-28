import webpack from "../../../../../api/modules/webpack.js";

let inputClasses = webpack.findByProps("inputDefault", "copyInput");
let inputClasses2 = webpack.findByProps("input", "editable", "disabled", "inputWrapper");

export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    vueApp.component("discord-input", {
      template: `
        <div class="${inputClasses2?.input}">
          <div class="${inputClasses?.inputWrapper}">
            <input type="text" class="${inputClasses?.inputDefault}" v-bind="value" />
          </div>
        </div>
      `,
      props: ["value"]
    });
  }
}