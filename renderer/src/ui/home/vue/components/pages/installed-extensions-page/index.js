import patcher from "../../../../../../api/patcher/index.js";
import cssText from "./style.scss";
patcher.injectCSS(cssText);

export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    vueApp.component(
      "installed-extensions-page",
      {
        template: `
          <div class="acord--installed-extensions-page">
            
          </div>
        `,
      }
    );
  }
}