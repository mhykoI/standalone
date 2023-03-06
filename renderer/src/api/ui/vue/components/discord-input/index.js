import webpack from "../../../../../api/modules/webpack.js";


export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    let inputClasses = webpack.findByProperties("inputDefault", "copyInput");
    let inputClasses2 = webpack.findByProperties("input", "editable", "disabled", "inputWrapper");
    vueApp.component("discord-input", {
      template: `
        <div class="${inputClasses2?.input}">
          <div class="${inputClasses?.inputWrapper}">
            <input :type="type ?? 'text'" class="${inputClasses?.inputDefault}" :value="modelValue" :placeholder="placeholder" :maxlength="maxlength" :min="min" :step="step" :max="max" :style="style" @input="onInput" />
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