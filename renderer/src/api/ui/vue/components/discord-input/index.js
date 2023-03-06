import webpack from "../../../../../api/modules/webpack.js";

let inputClasses = webpack.findByProperties("inputDefault", "copyInput");
let inputClasses2 = webpack.findByProperties("input", "editable", "disabled", "inputWrapper");

export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    vueApp.component("discord-input", {
      template: `
        <div class="${inputClasses2?.input}">
          <div class="${inputClasses?.inputWrapper}">
            <input :type="type ?? 'text'" class="${inputClasses?.inputDefault}" v-bind="value" :placeholder="placeholder" :maxlength="maxlength" :min="min" :step="step" :max="max" :style="style" @change="onChange" />
          </div>
        </div>
      `,
      props: ["value", "placeholder", "type", "maxlength", "max", "min", "step", "style"],
      emits: ["change"],
      methods: {
        onChange(event) {
          this.$emit("change", { event, value: event.target.value });
        }
      }
    });
  }
}