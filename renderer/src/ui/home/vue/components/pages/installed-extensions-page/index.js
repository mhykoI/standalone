import patcher from "../../../../../../api/patcher/index.js";
import i18n from "../../../../../../api/i18n/index.js";
import extensions from "../../../../../../api/extensions/index.js";
import cssText from "./style.scss";
patcher.injectCSS(cssText);

export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    vueApp.component(
      "installed-extensions-page",
      {
        template: `
          <div class="acord--installed-extensions-page">
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
                <installed-extension-card v-for="(extension, id) of filteredExtensions" :id="id" :extension="extension" :key="id" />
              </div>
            </div>
          </div>
        `,
        data() {
          return {
            searchText: "",
            searchCategoryText: "all",
            extensions: {},
            filteredExtensions: {}
          }
        },
        methods: {
          onStorageUpdate() {
            this.extensions = extensions.storage.installed.ghost;
            this.updateFiltered();
            this.$forceUpdate();
          },
          i18nFormat: i18n.format,
          updateFiltered() {
            if (!this.searchText) return this.filteredExtensions = this.extensions;
            const searchText = this.searchText.toLowerCase();
            const searchCategoryText = this.searchCategoryText;
            this.filteredExtensions = Object.fromEntries(
              Object.entries(this.extensions)
                .filter(([id, extension]) => {
                  if (searchCategoryText === "all") return true;
                  return extension.manifest.type === searchCategoryText;
                })
                .filter(([id, extension]) => {
                  if (!searchText) return true;
                  return i18n.localize(extension.manifest.about.name).toLowerCase().includes(searchText) || i18n.localize(extension.manifest.about.description).toLowerCase().includes(searchText);
                })
            );
          }
        },
        watch: {
          searchText() {
            this.updateFiltered();
          },
          searchCategoryText() {
            this.updateFiltered();
          }
        },
        mounted() {
          this.onStorageUpdate();
          this.updateFiltered();
          extensions.storage.installed.on("UPDATE", this.onStorageUpdate);
          extensions.storage.installed.on("SET", this.onStorageUpdate);
          extensions.storage.installed.on("DELETE", this.onStorageUpdate);
        },
        unmounted() {
          extensions.storage.installed.off("UPDATE", this.onStorageUpdate);
          extensions.storage.installed.off("SET", this.onStorageUpdate);
          extensions.storage.installed.off("DELETE", this.onStorageUpdate);
        }
      }
    );
  }
}