import modals from "../../../../../../../api/ui/modals.jsx";
import i18n from "../../../../../../../api/i18n/index.js";
import patcher from "../../../../../../../api/patcher/index.js";
import extensions from "../../../../../../../api/extensions/index.js";
import common from "../../../../../../../api/modules/common.js";
import ui from "../../../../../../../api/ui/index.js";

import cssText from "./style.scss";
patcher.injectCSS(cssText);

export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    vueApp.component(
      "store-extension-card",
      {
        template: `
          <div class="acord--store-extension-card">
            <div v-if="extension.manifest.about.previews?.length" class="preview" :style="{ backgroundImage: 'url(' + extension.manifest.about.previews[selectedPreview].image + ')' }">
              <div class="controls">
                <div v-if="extension.manifest.about.previews.length > 1" class="go go-back" @click="goBack">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path d="M11.828 12l2.829 2.828-1.414 1.415L9 12l4.243-4.243 1.414 1.415L11.828 12z" fill="currentColor" />
                  </svg>
                </div>
                <div v-if="extension.manifest.about.previews.length > 1" class="go go-forward" @click="goForward">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path d="M12.172 12L9.343 9.172l1.414-1.415L15 12l-4.243 4.243-1.414-1.415z" fill="currentColor" />
                  </svg>
                </div>
              </div>
              <div class="name-container">
                <div class="name">
                  {{ i18nLocalize(extension.manifest.about.previews[selectedPreview].name) }}
                </div>
              </div>
            </div>
            <div v-else class="preview no-preview"></div>
            <div class="info-container">
              <div class="top">
                <div class="name-container">
                  <div class="name">{{ i18nLocalize(extension.manifest.about.name) }}</div>
                  <div class="version">v{{ extension.manifest.about.version }}</div>
                </div>
                <div class="description">{{ i18nLocalize(extension.manifest.about.description) }}</div>
              </div>
              <div class="bottom">
                <div class="left">
                  <div class="authors">
                    <div v-for="author in extension.manifest.about.authors" class="author" :key="author.name" @click="showProfile(author.id)">
                      <div class="image" :style="{ backgroundImage: 'url(' + getAuthorImage(author) + ')' }"></div>
                      <div class="name">{{ author.name }}</div>
                    </div>
                  </div>
                </div>
                <div class="right">
                  <div class="controls">
                    <div class="control" :class="{'uninstall': installed, 'disabled': installing}" @click="installOrUninstall" :acord--tooltip-content="i18nFormat(installed ? 'REMOVE_EXTENSION' : 'INSTALL_EXTENSION')">
                      <svg v-if="installed" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                        <path fill="currentColor" d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-9 3h2v6H9v-6zm4 0h2v6h-2v-6zM9 4v2h6V4H9z"/>
                      </svg>
                      <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                        <path fill="currentColor" d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm0 18c4.42 0 8-3.58 8-8s-3.58-8-8-8-8 3.58-8 8 3.58 8 8 8zm1-8h3l-4 4-4-4h3V8h2v4z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `,
        props: ["extension", "id"],
        data() {
          return {
            selectedPreview: 0,
            installed: false,
            installing: false
          };
        },
        methods: {
          i18nFormat: i18n.format,
          i18nLocalize: i18n.localize,
          getAuthorImage(author) {
            if (author.image) return author.image;
            let user = common.UserStore.getUser(author.id);
            if (!user) return null;
            return user?.avatar ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=128` : `https://cdn.discordapp.com/embed/avatars/${Number(user.discriminator) % 5}.png`;
          },
          async installOrUninstall() {
            this.installing = true;
            if (this.installed) {
              await extensions.uninstall(this.id);
            } else {
              ui.notifications.show(i18n.format("INSTALLING_EXTENSION", this.id));
              try {
                await extensions.install(this.id);
                ui.notifications.show.success(i18n.format("EXTENSION_INSTALLED", this.id));
              } catch (e) {
                ui.notifications.error(e.message);
              }
            }
            this.installing = false;
          },
          goBack() {
            this.selectedPreview--;
            if (this.selectedPreview < 0) this.selectedPreview = this.extension.previews.length - 1;
          },
          goForward() {
            this.selectedPreview++;
            if (this.selectedPreview >= this.extension.previews.length) this.selectedPreview = 0;
          },
          showProfile(profileId) {
            modals.show.user(profileId);
          },
          onStorageUpdate() {
            this.installed = !!extensions.storage.installed.ghost[this.id];
            this.$forceUpdate();
          }
        },
        mounted() {
          this.onStorageUpdate();
          extensions.storage.installed.on("UPDATE", this.onStorageUpdate);
          extensions.storage.installed.on("DELETE", this.onStorageUpdate);
          extensions.storage.installed.on("SET", this.onStorageUpdate);
        },
        unmounted() {
          extensions.storage.installed.off("UPDATE", this.onStorageUpdate);
          extensions.storage.installed.off("DELETE", this.onStorageUpdate);
          extensions.storage.installed.off("SET", this.onStorageUpdate);
        }
      }
    )
  }
}