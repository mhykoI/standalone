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
      "store-single-page",
      {
        template: `
        <div class="acord--store-single-page">
          <div class="container">
            <div class="nav">
              <div class="left">
                <div class="back" @click="goBack">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path>
                  </svg>
                </div>
                <div class="title">{{item?.name || "..."}}</div>
              </div>
              <store-cart-button />
            </div>
            <div v-if="item" class="item">
              <div class="top">
                <div class="image" :style="\`background-image: url('\${item.image[0]}')\`">
                  <store-price-card :item="item" />
                </div>
              </div>
              <div class="bottom">
                <div class="left">
                  <div class="description">{{item.description || i18nFormat("NO_DESCRIPTION")}}</div>
                </div>
                <div class="right">
                  <div v-if="hatData" class="avatar" :style="\`background-image: url('\${avatarUrl}'); --hat-image: url('\${hatData?.image}')\`"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        `,
        props: ["pageData"],
        data() {
          return {
            item: null,
            avatarUrl: null,
            hatData: null
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
            this.item = null;
            this.hatData = null;
            let data = await (await fetch(`https://api.acord.app/store/item/${this.pageData.id}`, { cache: "no-store" })).json();
            this.item = data.data;

            if (this.item.feature_type === "hat") {
              this.hatData = (await (await fetch(`https://api.acord.app/feature/hat/${this.item.feature_id}`)).json()).data;
              let user = modules.common.UserStore.getCurrentUser();
              this.avatarUrl = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=1024`;
            }
          },
          goBack() {
            events.emit("StoreSubPageChange", { name: "landing" });
          }
        }
      }
    );
  }
}