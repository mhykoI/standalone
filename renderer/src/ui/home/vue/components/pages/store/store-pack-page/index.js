import patcher from "../../../../../../../api/patcher/index.js";
import modules from "../../../../../../../api/modules/index.js";
import i18n from "../../../../../../../api/i18n/index.js";
import cssText from "./style.scss";
import events from "../../../../../../../api/events/index.js";
patcher.injectCSS(cssText);

export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    vueApp.component(
      "store-pack-page",
      {
        template: `
        <div class="acord--store-pack-page">
          <div class="container">
            <div class="nav">
              <div class="left">
                <div class="back" @click="goBack">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path>
                  </svg>
                </div>
                <div class="title">{{pack?.name || "..."}}</div>
              </div>
              <store-cart-button />
            </div>
            <div v-if="pack" class="pack">
              <div class="top">
                <div class="image" :style="\`background-image: url('\${pack.image[0]}')\`">
                  <store-price-card :item="pack" />
                </div>
              </div>
              <div class="bottom">
                <div class="left">
                  <div class="description">{{pack.description || i18nFormat("NO_DESCRIPTION")}}</div>
                </div>
                <div class="right">
                  <div class="title">{{i18nFormat("STORE_ITEMS")}}</div>
                  <div class="items">
                    <store-item-card v-for="item in pack.items" :item="item" :key="item.id" :small="true" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        `,
        props: ["pageData"],
        data() {
          return {
            pack: null
          }
        },
        watch: {
          pageData() {
            this.fetchItem();
          }
        },
        mounted() {
          this.fetchItem();
        },
        unmounted() { },
        methods: {
          i18nFormat: i18n.format,
          async fetchItem() {
            this.pack = null;
            let data = await (await fetch(`https://api.acord.app/store/pack/${this.pageData.id}`, { cache: "no-store" })).json();
            this.pack = data.data;
          },
          goBack() {
            events.emit("StoreSubPageChange", { name: "landing" });
          }
        }
      }
    );
  }
}