import webpack from "../../../../modules/webpack.js";
import patcher from "../../../../patcher/index.js";
import cssText from "./style.scss";
patcher.injectCSS(cssText);

const checkClasses = webpack.findByProperties("checked", "container", "slider");

export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    vueApp.component("discord-check", {
      template: `
        <div class="${checkClasses.container} default-colors acord--discord-check" 
          :class="{'${checkClasses.checked}': value, 'checked': modelValue}" 
          @click="onClick"
        >
          <svg class="${checkClasses.slider} slider" viewBox="0 0 28 20" preserveAspectRatio="xMinYMid meet">
            <rect fill="white" x="4" y="0" rx="10" width="20" height="20"></rect>
            <svg v-if="modelValue" viewBox="0 0 20 20" fill="none">
              <path fill="currentColor" d="M7.89561 14.8538L6.30462 13.2629L14.3099 5.25755L15.9009 6.84854L7.89561 14.8538Z"></path>
              <path fill="currentColor" d="M4.08643 11.0903L5.67742 9.49929L9.4485 13.2704L7.85751 14.8614L4.08643 11.0903Z"></path>
            </svg>
            <svg v-else viewBox="0 0 20 20" fill="none">
              <path fill="currentColor" d="M5.13231 6.72963L6.7233 5.13864L14.855 13.2704L13.264 14.8614L5.13231 6.72963Z"></path>
              <path fill="currentColor" d="M13.2704 5.13864L14.8614 6.72963L6.72963 14.8614L5.13864 13.2704L13.2704 5.13864Z"></path>
            </svg>
          </svg>
        </div>
      `,
      props: {
        modelValue: {
          default() {
            return false;
          }
        }
      },
      emits: ['update:modelValue', 'change'],
      methods: {
        onClick(event) {
          let newValue = !this.modelValue;
          this.$emit("update:modelValue", newValue);
          this.$emit("change", { value: newValue, event });
        }
      }
    });
  }
}