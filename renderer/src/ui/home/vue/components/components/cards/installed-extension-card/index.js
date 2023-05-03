import i18n from "../../../../../../../api/i18n/index.js";
import patcher from "../../../../../../../api/patcher/index.js";
import ui from "../../../../../../../api/ui/index.js";
import extensions from "../../../../../../../api/extensions/index.js";
import events from "../../../../../../../api/events/index.js";

import cssText from "./style.scss";
import utils from "../../../../../../../api/utils/index.js";
import authentication from "../../../../../../../api/authentication/index.js";
patcher.injectCSS(cssText);

export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    vueApp.component(
      "installed-extension-card",
      {
        template: `
          <div class="acord--installed-extension-card" @contextmenu="onContextMenu">
            <div class="status-container">
              <div class="loaded-state" :class="{'active': !!this.configCache}" acord--tooltip-ignore-destroy :acord--tooltip-content="i18nFormat(!!this.configCache ? 'EXTENSION_ACTIVE' : 'EXTENSION_INACTIVE')"></div>
              <div v-if="extension.manifest.mode == 'development'" class="development-mode-warning" acord--tooltip-ignore-destroy :acord--tooltip-content="i18nFormat('EXTENSION_IS_IN_DEVELOPMENT_MODE')">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
                  <path fill="currentColor" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-7v2h2v-2h-2zm0-8v6h2V7h-2z"/>
                </svg>
              </div>
              <div v-if="extension.manifest?.api?.authentication && !isConnected" class="authentication-required" acord--tooltip-ignore-destroy :acord--tooltip-content="i18nFormat('EXTENSION_REQUIRES_AUTHENTICATION')">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
                <path fill="currentColor" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-9.208V16h2v-3.208a2.5 2.5 0 1 0-2 0z"/>
                </svg>
              </div>
            </div>
            <div class="top">
              <div class="left">
                <div class="top">
                  <div class="name">{{ i18nLocalize(extension.manifest.about.name) }}</div>
                  <div class="version">v{{extension.manifest.about.version}}</div>
                </div>
                <div class="bottom">
                  <div class="top">
                    <div class="authors">
                      <div class="label">{{ i18nFormat('AUTHORS') }}:</div>
                      <div v-for="(author, authorIdx) in extension.manifest.about.authors" class="author">
                        <div class="name" :class="{'hoverable': !!author.id}" @click="onAuthorClick(author)">{{ i18nLocalize(author.name) }}</div>
                        <div v-if="authorIdx != (extension.manifest.about.authors.length-1)" class="comma">,</div>
                      </div>
                    </div>
                  </div>
                  <div class="bottom">
                    <div class="description">{{ i18nLocalize(extension.manifest.about.description) }}</div>
                  </div>
                </div>
              </div>
              <div class="right">
                <div class="top">
                  <div v-if="!hideControls" class="controls">
                    <div class="control" @click="onUpdateExtension" acord--tooltip-ignore-destroy :acord--tooltip-content="i18nFormat('UPDATE_EXTENSION')">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                        <path fill="currentColor" d="M5.463 4.433A9.961 9.961 0 0 1 12 2c5.523 0 10 4.477 10 10 0 2.136-.67 4.116-1.81 5.74L17 12h3A8 8 0 0 0 6.46 6.228l-.997-1.795zm13.074 15.134A9.961 9.961 0 0 1 12 22C6.477 22 2 17.523 2 12c0-2.136.67-4.116 1.81-5.74L7 12H4a8 8 0 0 0 13.54 5.772l.997 1.795z"/>
                      </svg>
                    </div>
                    <div class="control uninstall" @click="onUninstallExtension">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                        <path fill="currentColor" d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-9 3h2v6H9v-6zm4 0h2v6h-2v-6zM9 4v2h6V4H9z"/>
                      </svg>
                    </div>
                    <div class="control" @click="onToggleExtension" acord--tooltip-ignore-destroy :acord--tooltip-content="i18nFormat(enabled ? 'DISABLE_EXTENSION' : 'ENABLE_EXTENSION')">
                      <svg v-if="!enabled" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                        <path fill="currentColor" d="M8 7a5 5 0 1 0 0 10h8a5 5 0 0 0 0-10H8zm0-2h8a7 7 0 0 1 0 14H8A7 7 0 0 1 8 5zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                      </svg>
                      <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                        <path fill="currentColor" d="M8 5h8a7 7 0 0 1 0 14H8A7 7 0 0 1 8 5zm8 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                      </svg>
                    </div>
                  </div>
                </div>
                <div class="bottom">
                  <div v-if="extension.manifest?.config?.length && !!configCache" class="settings" @click="expanded = !expanded">
                    <div class="text">{{i18nFormat(expanded ? 'HIDE_SETTINGS' : 'SHOW_SETTINGS')}}</div>
                    <svg v-if="!expanded" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                      <path fill="currentColor" d="M12 15l-4.243-4.243 1.415-1.414L12 12.172l2.828-2.829 1.415 1.414z"/>
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                      <path fill="currentColor" d="M12 11.828l-2.828 2.829-1.415-1.414L12 9l4.243 4.243-1.415 1.414L12 11.828z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="expanded" class="bottom">
              <config-column :extension="id" :item="{children: configCache, gap: '8px'}"/>
            </div>
          </div>
        `,
        data() {
          return {
            expanded: false,
            configCache: null,
            enabled: !!extensions.storage.installed.ghost[this.id]?.config?.enabled,
            isConnected: false
          };
        },
        methods: {
          i18nFormat: i18n.format,
          i18nLocalize: i18n.localize,
          onAuthorClick(author) {
            if (author.id) ui.modals.show.user(author.id);
          },
          onExtensionLoaded({ id }) {
            if (id === this.id) {
              this.configCache = extensions.__cache__.config[this.id];
            }
            this.$forceUpdate();
          },
          onExtensionUnloaded({ id }) {
            if (id === this.id) {
              this.configCache = null;
              this.expanded = false;
            }
            this.$forceUpdate();
          },
          onToggleExtension() {
            let enabled = !!extensions.storage.installed.ghost[this.id]?.config?.enabled;
            let newState = !enabled;
            extensions.storage.installed.store[this.id].config.enabled = newState;
            this.enabled = newState;
            try {
              if (newState) {
                extensions.load(this.id);
              } else {
                extensions.unload(this.id);
              }
            } catch { }
          },
          async onUpdateExtension() {
            let success = await extensions.update(this.id);
            success ? ui.toasts.show.success(i18n.format('EXTENSION_UPDATED')) : ui.toasts.show.error(i18n.format('NO_UPDATE_AVAILABLE'));
          },
          onUninstallExtension() {
            extensions.uninstall(this.id);
          },
          onContextMenu(e) {
            ui.contextMenus.open(e,
              ui.contextMenus.build.menu([
                {
                  label: i18n.format("COPY_ID"),
                  action: () => {
                    utils.copyText(this.id);
                  }
                }
              ])
            )
          },
          onAuthenticationUpdate() {
            this.isConnected = !!authentication.token;
          }
        },
        props: ["id", "extension", "hideControls"],
        mounted() {
          this.configCache = extensions.__cache__.config[this.id];
          this.onAuthenticationUpdate();
          events.on("ExtensionLoaded", this.onExtensionLoaded);
          events.on("ExtensionUnloaded", this.onExtensionUnloaded);
          events.on("AuthenticationSuccess", this.onAuthenticationUpdate);
          events.on("AuthenticationFailure", this.onAuthenticationUpdate);
        },
        unmounted() {
          events.off("ExtensionLoaded", this.onExtensionLoaded);
          events.off("ExtensionUnloaded", this.onExtensionUnloaded);
          events.off("AuthenticationSuccess", this.onAuthenticationUpdate);
          events.off("AuthenticationFailure", this.onAuthenticationUpdate);
        }
      }
    );
  }
}