import i18n from "../../../../../api/i18n/index.js";
import patcher from "../../../../../api/patcher/index.js";

import cssText from "./style.scss";
import { getLocalized } from "../../../../../other/utils.js";
patcher.injectCSS(cssText);

export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    vueApp.component(
      "installed-extension-card",
      {
        template: `
          <div class="acord--installed-extension-card">
            <div class="top">
              <div class="left">

              </div>
              <div class="right">

              </div>
            </div>
            <div class="bottom">
              
            </div>
          </div>
        `,
      }
    );
  }
}