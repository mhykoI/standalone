import patcher from "../../../../../../../api/patcher/index.js";
import i18n from "../../../../../../../api/i18n/index.js";
import cssText from "./style.scss";
import storeData from "../store-data.js";
import events from "../../../../../../../api/events/index.js";
patcher.injectCSS(cssText);

export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    vueApp.component(
      "store-landing-page",
      {
        template: `
        <div class="acord--store-landing-page">
          <div class="container">
            <div v-if="!!featuredItem" @click="goToFeatured" class="featured-container" :style="\`background-image: url('\${featuredItem.image[0]}');\`">
              <div class="name">{{featuredItem.name}}</div>
              <div class="page">{{mainFeaturedItemIndex + 1}}/{{mainFeaturedItems.length}}</div>
              <div class="control previous" :class="{'disabled': mainFeaturedItemIndex === 0}" @click="updateFeaturedIndex(-1, $event)">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path>
                </svg>
              </div>
              <div class="control next" :class="{'disabled': mainFeaturedItemIndex >= (mainFeaturedItems.length - 1)}" @click="updateFeaturedIndex(1, $event)">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M13.1714 12.0007L8.22168 7.05093L9.63589 5.63672L15.9999 12.0007L9.63589 18.3646L8.22168 16.9504L13.1714 12.0007Z"></path>
                </svg>
              </div>
              <div class="price-card">
                <store-price-card :item="featuredItem" />
              </div>
            </div>
            <div class="other-featured-items">
              <store-item-card v-for="item in otherFeaturedItems" :item="item" :key="item.id" />
            </div>
            <div class="other-page-buttons">
              <div class="title">
                {{i18nFormat('STORE_OTHER')}}
              </div>
              <div class="buttons">
                <div class="button items" @click="gotoItemsPage('items')" style="background-image: url('https://media.discordapp.net/attachments/756836048251650079/1106226686527275068/Items.png');">
                  <div class="title">{{i18nFormat('STORE_ITEMS')}}</div>
                </div>
                <div class="button packs" @click="gotoItemsPage('packs')" style="background-image: url('https://media.discordapp.net/attachments/756836048251650079/1106267998722994196/Packs.png');">
                  <div class="title">{{i18nFormat('STORE_PACKS')}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        `,
        props: ["pageData"],
        data() {
          return {
            mainFeaturedItemIndex: 0,
            mainFeaturedItems: [],
            otherFeaturedItems: [],
            updateInterval: null,
            switchInterval: null,
            reactive: storeData.reactive,
            ownedFeatures: []
          }
        },
        computed: {
          featuredItem() {
            return this.mainFeaturedItems[this.mainFeaturedItemIndex];
          }
        },
        mounted() {
          this.fetchItems();
          this.updateInterval = setInterval(() => { this.fetchItems(); }, 60000 * 60);
          this.switchInterval = setInterval(this.switchFeaturedItem, 5000);
          storeData.fetchBalance();
        },
        unmounted() {
          clearInterval(this.updateInterval);
          clearInterval(this.switchInterval);
        },
        methods: {
          i18nFormat: i18n.format,
          async fetchItems() {
            let data = await (await fetch("https://api.acord.app/store/featured", { cache: "no-store" })).json();
            this.mainFeaturedItems = data.data.main.sort((a, b) => b.view_order - a.view_order);
            this.otherFeaturedItems = data.data.other.sort((a, b) => b.view_order - a.view_order);
          },
          goToFeatured() {
            events.emit("StoreSubPageChange", { name: this.featuredItem.type ?? "single", data: { id: this.featuredItem.id }, hideNav: true });
          },
          gotoItemsPage(type) {
            events.emit("StoreSubPageChange", { name: "items", data: { type }, hideNav: true });
          },
          updateFeaturedIndex(amount, e) {
            e.stopPropagation();
            clearInterval(this.switchInterval);
            this.switchInterval = setInterval(this.switchFeaturedItem, 5000);
            this.mainFeaturedItemIndex += amount;
          },
          switchFeaturedItem() {
            if (this.mainFeaturedItemIndex >= (this.mainFeaturedItems.length - 1)) {
              this.mainFeaturedItemIndex = 0;
            } else {
              this.mainFeaturedItemIndex++;
            }
          }
        }
      }
    );
  }
}