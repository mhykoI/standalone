import patcher from "../../../../../../../api/patcher/index.js";

import cssText from "./style.scss";
patcher.injectCSS(cssText);

export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    vueApp.component(
      "inventory-hat-feature-card",
      {
        template: `
          <div class="acord--inventory-hat-feature-card">
            <div class="content" :class="{'enabled': feature.enabled}">
              <div class="top">
                <img class="preview" :src="fetched?.image" />
              </div>
              <div class="bottom">

              </div>
            </div>
          </div>
        `,
        props: ["feature"],
        data() {
          return {
            fetched: null
          }
        },
        methods: {
          async fetch() {
            this.fetched = (await (await fetch(`https://api.acord.app/feature/hat/${this.feature.feature_id}`)).json()).data;
          },
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