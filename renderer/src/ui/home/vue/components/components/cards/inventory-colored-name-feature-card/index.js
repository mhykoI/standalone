import patcher from "../../../../../../../api/patcher/index.js";

import cssText from "./style.scss";
patcher.injectCSS(cssText);

export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    vueApp.component(
      "inventory-colored-name-feature-card",
      {
        template: `
          <div class="acord--inventory-colored-name-feature-card">
            <div class="content" :class="{'enabled': feature.enabled}">
              
            </div>
          </div>
        `,
        props: ["feature"],
        data() {
          return {
            
          }
        }
      }
    );
  }
}