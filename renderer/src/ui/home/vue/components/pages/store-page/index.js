import patcher from "../../../../../../api/patcher/index.js";
import i18n from "../../../../../../api/i18n/index.js";
import cssText from "./style.scss";
patcher.injectCSS(cssText);

export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    vueApp.component(
      "store-page",
      {
        template: `
        <div class="acord--store-page">
          <div class="container">
            <div class="top">
              <div class="search">
                <discord-input v-model="searchText" :placeholder="i18nFormat('SEARCH')" />
              </div>
              <div class="category">
                <discord-select v-model="searchCategoryText" :options="[{value: 'all', label: i18nFormat('ALL')}, {value: 'plugin', label: i18nFormat('PLUGINS')}, {value: 'theme', label: i18nFormat('THEMES')}]" />
              </div>
              <div class="refresh" :class="{'loading': fetching}" :acord--tooltip-content="i18nFormat('REFRESH')" @click="fetchItems">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                  <path fill="currentColor" d="M5.463 4.433A9.961 9.961 0 0 1 12 2c5.523 0 10 4.477 10 10 0 2.136-.67 4.116-1.81 5.74L17 12h3A8 8 0 0 0 6.46 6.228l-.997-1.795zm13.074 15.134A9.961 9.961 0 0 1 12 22C6.477 22 2 17.523 2 12c0-2.136.67-4.116 1.81-5.74L7 12H4a8 8 0 0 0 13.54 5.772l.997 1.795z"/>
                </svg>
              </div>
            </div>
            <div class="bottom">
              <store-extension-card v-for="extension in filteredExtensions" :id="extension.meta.url" :extension="extension" :key="extension.meta.url" />
            </div>
          </div>
        </div>
        `,
        data() {
          return {
            extensions: [],
            searchCategoryText: "all",
            searchText: "",
            fetching: false
          }
        },
        methods: {
          i18nFormat: i18n.format,
          async fetchItems() {
            if (this.fetching) return;
            this.fetching = true;
            this.extensions = await (await fetch("https://raw.githubusercontent.com/acord-standalone/verified-extensions/main/index.json", { cache: "no-store" })).json();
            this.fetching = false;
          }
        },
        computed: {
          filteredExtensions() {
            const searchText = this.searchText.toLowerCase();
            const searchCategoryText = this.searchCategoryText;
            return this.extensions.filter((extension) => {
              if (searchCategoryText === "all") return true;
              return extension.manifest.type === searchCategoryText;
            }).filter((extension) => {
              if (!searchText) return true;
              return i18n.localize(extension.manifest.about.name).toLowerCase().includes(searchText) || i18n.localize(extension.manifest.about.description).toLowerCase().includes(searchText);
            })
          }
        },
        async mounted() {
          this.fetchItems();
        }
      }
    );
  }
}