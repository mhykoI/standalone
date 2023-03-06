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
                  <discord-select v-model="searchCategoryText" :options="[{value: 'all', label: i18nFormat('ALL')}, {value: 'plugins', label: i18nFormat('PLUGINS')}, {value: 'themes', label: i18nFormat('THEMES')}]" />
                </div>
              </div>
              <div class="bottom">
                <installed-extension-card v-for="(extension, id) of extensions" :id="id" :extension="extension" :key="id" />
              </div>
            </div>
          </div>
        `,
        data() {
          return {
            searchText: "",
            searchCategoryText: "all",
            extensions: {}
          }
        },
        methods: {
          onStorageUpdate() {
            this.extensions = extensions.storage.installed.ghost;
          },
          i18nFormat: i18n.format
        },
        mounted() {
          this.onStorageUpdate();
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