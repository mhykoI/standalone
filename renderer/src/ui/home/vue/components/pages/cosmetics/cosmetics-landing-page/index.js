import patcher from "../../../../../../../api/patcher/index.js";
import i18n from "../../../../../../../api/i18n/index.js";
import cssText from "./style.scss";
import cosmeticsData from "../cosmetics-data.js";
import authentication from "../../../../../../../api/authentication/index.js";
patcher.injectCSS(cssText);

export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    vueApp.component(
      "cosmetics-landing-page",
      {
        template: `
        <div class="acord--cosmetics-landing-page">
          <div class="container">
            <div v-if="!!featuredItem" class="featured-container" :style="\`background-image: url('\${featuredItem.image[0]}');\`">
              <div class="name">{{featuredItem.name}}</div>
              <div class="page">{{mainFeaturedItemIndex + 1}}/{{mainFeaturedItems.length}}</div>
              <div class="control previous" :class="{'disabled': mainFeaturedItemIndex === 0}" @click="mainFeaturedItemIndex--">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path>
                </svg>
              </div>
              <div class="control next" :class="{'disabled': mainFeaturedItemIndex >= (mainFeaturedItems.length - 1)}" @click="mainFeaturedItemIndex++">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M13.1714 12.0007L8.22168 7.05093L9.63589 5.63672L15.9999 12.0007L9.63589 18.3646L8.22168 16.9504L13.1714 12.0007Z"></path>
                </svg>
              </div>
              <div class="price-card">
                <cosmetics-price-card :item="featuredItem" />
              </div>
            </div>
            <div class="other-featured-items">
              <div class="item" v-for="item in otherFeaturedItems" :key="item.id" :style="\`background-image: url('\${item.image[0]}');\`">
                <div class="name">{{item.name}}</div>
                <div class="price-card">
                  <cosmetics-price-card :item="item" :small="true" />
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
            reactive: cosmeticsData.reactive,
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
          this.switchInterval = setInterval(() => {
            if (this.mainFeaturedItemIndex >= (this.mainFeaturedItems.length - 1)) {
              this.mainFeaturedItemIndex = 0;
            } else {
              this.mainFeaturedItemIndex++;
            }
          }, 5000);
        },
        unmounted() {
          clearInterval(this.updateInterval);
          clearInterval(this.switchInterval);
        },
        methods: {
          i18nFormat: i18n.format,
          async fetchItems() {
            let data = await (await fetch("https://api.acord.app/store/featured", { cache: "no-store" })).json();
            this.mainFeaturedItems = data.data.main;
            this.otherFeaturedItems = data.data.other;
          }
        }
      }
    );
  }
}