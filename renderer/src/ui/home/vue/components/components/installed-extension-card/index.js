import i18n from "../../../../../../api/i18n/index.js";
import patcher from "../../../../../../api/patcher/index.js";
import extensions from "../../../../../../api/extensions/index.js";

import cssText from "./style.scss";
import { recomputable, recompute } from "../../../../../../api/ui/vue/utils/recompute.js";
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
        data() {
          return {
            expanded: false,
            url: null,
          };
        },
        computed: {
          extension: recomputable(
            function () {
              return extensions.get(this.url);
            },
            "extension"
          )
        },
        mounted() {
          recompute(this, "extension");
        }
      }
    );
  }
}