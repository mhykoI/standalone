import patcher from "../../../../patcher/index.js";

import cssText from "./style.scss";
patcher.injectCSS(cssText);

export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    vueApp.component("discord-select", {
      template: `
        <div class="select-Zz0IcO lookFilled-GPyucw acord--discord-select" :class="{'open-LeyjhI': active}">
          <div class="value-2en4z7">{{options.find(i=>i.value === modelValue)?.label}}</div>
          <div class="icons-2ibyma">
              <svg v-if="!active" class="icon" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M16.59 8.59003L12 13.17L7.41 8.59003L6 10L12 16L18 10L16.59 8.59003Z"></path></svg>
              <svg v-else class="icon" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M7.41 16.0001L12 11.4201L16.59 16.0001L18 14.5901L12 8.59006L6 14.5901L7.41 16.0001Z"></path></svg>
          </div>
          <div v-if="active" class="options popout-15UxD6 scrollerBase-1Pkza4 thin-RnSY0a scrollerBase-1Pkza4" :class="{'top-popout': popoutPosition === 'top'}">
            <div v-for="option in options" class="option option-Uc12mm" @click="onOptionClick($event, option)" :key="option.value" :aria-selected="\`\${modelValue === option.value}\`">
              {{option.label}}
              <svg v-if="modelValue === option.value" class="selectedIcon-122rMx" role="img" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle r="8" cx="12" cy="12" fill="white"></circle><g fill="none" fill-rule="evenodd"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></g></svg>
            </div>
          </div>
        </div>
      `,
      data() {
        return {
          active: false
        }
      },
      props: ["options", "modelValue", "popoutPosition"],
      emits: ['update:modelValue', "change"],
      mounted() {
        window.addEventListener("click", this.onClick);
      },
      unmounted() {
        window.removeEventListener("click", this.onClick);
      },
      methods: {
        onOptionClick(event, option) {
          this.$emit("update:modelValue", option.value);
          this.$emit("change", { value: option.value, event });
        },
        onClick(e) {
          if (
            e.target.classList.contains('select-Zz0IcO')
            || e.target.classList.contains('value-2en4z7')
            || e.target.classList.contains('icons-2ibyma')
            || e.target.classList.contains('popout-15UxD6')
            || e.target.classList.contains('option-Uc12mm')
            || e.target.classList.contains("icon")
          ) {
            this.active = !this.active;
            return;
          }
          this.active = false;
        }
      }
    });
  }
}