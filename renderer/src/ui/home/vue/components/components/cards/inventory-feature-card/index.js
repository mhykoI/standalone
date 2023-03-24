import patcher from "../../../../../../../api/patcher/index.js";

import cssText from "./style.scss";
patcher.injectCSS(cssText);

export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    vueApp.component(
      "inventory-feature-card",
      {
        template: `
          <div class="acord--inventory-feature-card">
            
          </div>
        `,
        props: ["feature"],
        data() {
          return {}
        }
      }
    );
  }
}