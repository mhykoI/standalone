import webpack from "../../../../modules/webpack.js";
import patcher from "../../../../patcher/index.js";

import cssText from "./style.scss";
patcher.injectCSS(cssText);

const selectClasses = webpack.findByProperties("select", "searchableSelect", "multiSelectCheck");
const scrollClasses = webpack.findByProperties("managedReactiveScroller", "scrollerBase", "thin");

export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    vueApp.component("discord-select", {
      template: `
        <div class="${selectClasses.select} ${selectClasses.lookFilled} acord--discord-select" :class="{'${selectClasses.open}': active}">
          <div class="${selectClasses.value}">{{options.find(i=>i.value === modelValue)?.label}}</div>
          <div class="${selectClasses.icons}">
              <svg v-if="!active" class="icon" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M16.59 8.59003L12 13.17L7.41 8.59003L6 10L12 16L18 10L16.59 8.59003Z"></path></svg>
              <svg v-else role="img" class="icon" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M7.41 16.0001L12 11.4201L16.59 16.0001L18 14.5901L12 8.59006L6 14.5901L7.41 16.0001Z"></path></svg>
          </div>
          <div v-if="active" class="options ${selectClasses.popout} ${scrollClasses.scrollerBase} ${scrollClasses.thin}" :class="{'top-popout': position === 'top'}">
            <div v-for="option in options" class="option ${selectClasses.option}" @click="onOptionClick(option)" :key="option.value" :aria-selected="\`\${modelValue === option.value}\`">
              {{option.label}}
              <svg v-if="modelValue === option.value" class="${selectClasses.selectedIcon}" role="img" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle r="8" cx="12" cy="12" fill="white"></circle><g fill="none" fill-rule="evenodd"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></g></svg>
            </div>
          </div>
        </div>
      `,
      data() {
        return {
          selectClasses,
          active: false
        }
      },
      props: ["options", "modelValue", "position"],
      emits: ['update:modelValue'],
      mounted() {
        window.addEventListener("click", this.onClick);
      },
      unmounted() {
        window.removeEventListener("click", this.onClick);
      },
      methods: {
        onOptionClick(e) {
          this.$emit("update:modelValue", e.value);
        },
        onClick(e) {
          if (
            e.target.classList.contains(selectClasses.select)
            || e.target.classList.contains(selectClasses.value)
            || e.target.classList.contains(selectClasses.icons)
            || e.target.classList.contains(selectClasses.popout)
            || e.target.classList.contains(selectClasses.option)
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