import patcher from "../../../../../../../api/patcher/index.js";
import i18n from "../../../../../../../api/i18n/index.js";
import cssText from "./style.scss";
import events from "../../../../../../../api/events/index.js";
import storeData from "../store-data.js";
patcher.injectCSS(cssText);

export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    vueApp.component(
      "store-router-page",
      {
        template: `
        <div class="acord--store-router-page">
          <div v-if="!page.hideNav" class="nav">
            <div class="title">{{i18nFormat("ACORD_SHOP")}}</div>
            <store-cart-button />
          </div>
          <keep-alive>
            <component :is="\`store-\${page.name}-page\`" :page-data="page.data" />
          </keep-alive>
        </div>
        `,
        data() {
          return {
            page: { name: "landing", data: {}, hideNav: false },
            reactive: storeData.reactive
          }
        },
        mounted() {
          events.on("StoreSubPageChange", this.onStoreSubPageChange);
        },
        methods: {
          i18nFormat: i18n.format,
          onStoreSubPageChange({ name, data = {}, hideNav = false } = {}) {
            this.page = { name, data, hideNav };
            this.$el.scrollIntoView();
          }
        },
        unmounted() {
          events.off("StoreSubPageChange", this.onStoreSubPageChange);
        }
      }
    );
  }
}