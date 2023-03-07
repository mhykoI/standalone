import patcher from "../../../../../../api/patcher/index.js";
import i18n from "../../../../../../api/i18n/index.js";
import extensions from "../../../../../../api/extensions/index.js";
import dev from "../../../../../../api/dev/index.js";
import cssText from "./style.scss";
import events from "../../../../../../api/events/index.js";
import ui from "../../../../../../api/ui/index.js";
patcher.injectCSS(cssText);

export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    vueApp.component(
      "extensions-page",
      {
        template: `
          <div class="acord--extensions-page">
            <div class="container">
              <div class="top">
                <div class="search">
                  <discord-input v-model="searchText" :placeholder="i18nFormat('SEARCH')" />
                </div>
                <div class="install" :acord--tooltip-content="i18nFormat('IMPORT_EXTENSION')">
                  <discord-input v-model="installUrl" placeholder="https://.../dist" @keyup="onInstallKeyUp" />
                </div>
                <div class="category">
                  <discord-select v-model="searchCategoryText" :options="[{value: 'all', label: i18nFormat('ALL')}, {value: 'plugin', label: i18nFormat('PLUGINS')}, {value: 'theme', label: i18nFormat('THEMES')}]" />
                </div>
              </div>
              <div class="bottom">
                <installed-extension-card v-if="developmentExtension" :id="developmentExtension.id" :extension="developmentExtension.extension" />
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
            filteredExtensions: {},
            developmentExtension: null,
            installUrl: ""
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
          },
          onExtensionLoaded({ id }) {
            if (id === "Development") {
              this.developmentExtension = {
                extension: dev.extension.installed,
                id: "Development"
              }
            }
          },
          onExtensionUnloaded({ id }) {
            if (id === "Development") {
              this.developmentExtension = null;
            }
          },
          async onInstallKeyUp(event) {
            if (event.key === "Enter") {
              let installUrl = this.installUrl;
              this.installUrl = "";
              ui.notifications.show(i18n.format("INSTALLING_EXTENSION"));
              try {
                await extensions.install(installUrl);
                ui.notifications.show.success(i18n.format("EXTENSION_INSTALLED"));
              } catch (err) {
                ui.notifications.show.error(err.message);
              }
            }
          }
        },
        watch: {
          searchText() {
            this.updateFiltered();
            this.$forceUpdate();
          },
          searchCategoryText() {
            this.updateFiltered();
            this.$forceUpdate();
          }
        },
        mounted() {
          this.onStorageUpdate();
          this.updateFiltered();
          this.$forceUpdate();
          extensions.storage.installed.on("UPDATE", this.onStorageUpdate);
          extensions.storage.installed.on("SET", this.onStorageUpdate);
          extensions.storage.installed.on("DELETE", this.onStorageUpdate);
          events.on("ExtensionLoaded", this.onExtensionLoaded);
          events.on("ExtensionUnloaded", this.onExtensionUnloaded);
        },
        unmounted() {
          extensions.storage.installed.off("UPDATE", this.onStorageUpdate);
          extensions.storage.installed.off("SET", this.onStorageUpdate);
          extensions.storage.installed.off("DELETE", this.onStorageUpdate);
          events.off("ExtensionLoaded", this.onExtensionLoaded);
          events.off("ExtensionUnloaded", this.onExtensionUnloaded);
        },
      }
    );
  }
}