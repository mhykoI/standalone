import patcher from "../../../../../../../api/patcher/index.js";
import i18n from "../../../../../../../api/i18n/index.js";
import cssText from "./style.scss";
patcher.injectCSS(cssText);

export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    vueApp.component(
      "cosmetics-items-page",
      {
        template: `
        <div class="acord--cosmetics-items-page">
          <div class="container">
            
          </div>
        </div>
        `,
        data() {
          return {
            visibleItems: [],
            items: []
          }
        },
        mounted() {

        },
        methods: {
          i18nFormat: i18n.format,
        }
      }
    );
  }
}