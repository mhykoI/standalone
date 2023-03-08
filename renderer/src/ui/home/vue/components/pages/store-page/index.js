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
            searchText: ""
          }
        },
        methods: {
          i18nFormat: i18n.format,
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
          this.extensions = await (await fetch("https://raw.githubusercontent.com/acord-standalone/verified-extensions/main/index.json", { cache: "no-store" })).json();
        }
      }
    );
  }
}