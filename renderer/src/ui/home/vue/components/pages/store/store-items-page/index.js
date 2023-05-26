import patcher from "../../../../../../../api/patcher/index.js";
import i18n from "../../../../../../../api/i18n/index.js";
import cssText from "./style.scss";
import storeData from "../store-data.js";
import authentication from "../../../../../../../api/authentication/index.js";
import events from "../../../../../../../api/events/index.js";
patcher.injectCSS(cssText);

export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    vueApp.component(
      "store-items-page",
      {
        template: `
        <div class="acord--store-items-page">
          <div class="container">
            <div class="nav">
              <div class="left">
                <div class="back" @click="goBack">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path>
                  </svg>
                </div>
                <div class="title">{{i18nFormat(pageData.type === "items" ? "STORE_ITEMS" : "STORE_PACKS")}}</div>
              </div>
              <store-cart-button />
            </div>
            <div class="items">
              <store-item-card v-for="item in items" :item="item" :key="item.id" />
            </div>
          </div>
        </div>
        `,
        props: ["pageData"],
        data() {
          return {
            items: []
          }
        },
        watch: {
          pageData() {
            this.fetchItems();
          }
        },
        mounted() {
          this.fetchItems();
          this.updateInterval = setInterval(() => { this.fetchItems(); }, 60000 * 60);
        },
        unmounted() {
          clearInterval(this.updateInterval);
        },
        methods: {
          i18nFormat: i18n.format,
          async fetchItems() {
            this.items = [];
            let data = await (await fetch(`https://api.acord.app/store/${this.pageData.type}?all=true`, { cache: "no-store" })).json();
            this.items = data.data;
          },
          goBack() {
            events.emit("StoreSubPageChange", { name: "landing" });
          }
        }
      }
    );
  }
}