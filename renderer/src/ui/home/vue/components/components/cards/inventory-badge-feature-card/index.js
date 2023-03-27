import patcher from "../../../../../../../api/patcher/index.js";
import i18n from "../../../../../../../api/i18n/index.js";

import cssText from "./style.scss";
patcher.injectCSS(cssText);

export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    vueApp.component(
      "inventory-badge-feature-card",
      {
        template: `
          <div class="acord--inventory-badge-feature-card">
            <div class="content" :class="{'enabled': feature.enabled, 'selected': selected}">
              <div class="template">
                <img :src="fetched?.image" />
              </div>
              <div class="top">
                <div class="name">
                  {{i18nFormat('INVENTORY_BADGE_FEATURE', i18nFormat(fetched?.name ?? 'LOADING'))}}
                </div>
              </div>
              <div class="bottom">

              </div>
            </div>
          </div>
        `,
        props: ["feature", "selected"],
        data() {
          return {
            fetched: null
          }
        },
        methods: {
          async fetch() {
            this.fetched = (await (await fetch(`https://api.acord.app/feature/badge/${this.feature.feature_id}`)).json()).data;
          },
          i18nFormat: i18n.format,
        },
        watch: {
          feature() {
            this.fetch();
          },
          toggleEnabled() {

          }
        },
        mounted() {
          this.fetch();
        }
      }
    );
  }
}