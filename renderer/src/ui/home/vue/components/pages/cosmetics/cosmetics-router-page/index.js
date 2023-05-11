import patcher from "../../../../../../../api/patcher/index.js";
import i18n from "../../../../../../../api/i18n/index.js";
import cssText from "./style.scss";
import events from "../../../../../../../api/events/index.js";
import cosmeticsData from "../cosmetics-data.js";
patcher.injectCSS(cssText);

export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    vueApp.component(
      "cosmetics-router-page",
      {
        template: `
        <div class="acord--cosmetics-router-page">
          <div v-if="!page.hideNav" class="nav">
            <div class="title">{{i18nFormat("ACORD_COSMETICS_SHOP")}}</div>
            <cosmetics-cart-button />
          </div>
          <keep-alive>
            <component :is="\`cosmetics-\${page.name}-page\`" :page-data="page.data" />
          </keep-alive>
        </div>
        `,
        data() {
          return {
            page: { name: "landing", data: {}, hideNav: false },
            reactive: cosmeticsData.reactive
          }
        },
        mounted() {
          events.on("CosmeticsSubPageChange", this.onCosmeticsSubPageChange);
        },
        methods: {
          i18nFormat: i18n.format,
          onCosmeticsSubPageChange({ name, data = {}, hideNav = false } = {}) {
            this.page = { name, data, hideNav };
            this.$el.scrollIntoView();
          }
        },
        unmounted() {
          events.off("CosmeticsSubPageChange", this.onCosmeticsSubPageChange);
        }
      }
    );
  }
}