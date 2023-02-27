import modals from "../../../../api/ui/modals.jsx";
import i18n from "../../../../api/i18n/index.js";
import patcher from "../../../../api/patcher/index.js";

import cssText from "./style.scss";
import { getLocalized } from "../../../../other/utils.js";
patcher.injectCSS(cssText);

export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    vueApp.component(
      "store-extension-card",
      {
        template: `
          <div class="acord--store-extension-card">
            <div v-if="extension.previews?.length" class="preview" :style="{ backgroundImage: 'url(' + extension.previews[selectedPreview].image + ')' }">
              <div class="controls">
                <div class="go go-back" @click="goBack">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path d="M11.828 12l2.829 2.828-1.414 1.415L9 12l4.243-4.243 1.414 1.415L11.828 12z" fill="currentColor" />
                  </svg>
                </div>
                <div class="go go-forward" @click="goForward">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path d="M12.172 12L9.343 9.172l1.414-1.415L15 12l-4.243 4.243-1.414-1.415z" fill="currentColor" />
                  </svg>
                </div>
              </div>
              <div class="name-container">
                <div class="name">
                  {{ extension.previews[selectedPreview].name }}
                </div>
              </div>
            </div>
            <div v-else class="preview no-preview"></div>
            <div class="info-container">
              <div class="top">
                <div class="name-container">
                  <div class="name">{{ getLocalized(extension.name) }}</div>
                  <div class="version">v{{ extension.version }}</div>
                </div>
                <div class="description">{{ getLocalized(extension.description) }}</div>
              </div>
              <div class="bottom">
                <div class="left">
                  <div class="authors">
                    <div v-for="author in extension.authors" class="author" :key="author.name" @click="showProfile(author.id)">
                      <div class="image" :style="{ backgroundImage: 'url(' + author.image + ')' }"></div>
                      <div class="name">{{ author.name }}</div>
                    </div>
                  </div>
                </div>
                <div class="right">
                  <div class="buttons">
                    <div class="button" @click="installOrUninstall">{{i18nFormat(extension.installed ? 'UNINSTALL' : 'INSTALL')}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `,
        props: ["extension"],
        data() {
          return {
            selectedPreview: 0,
          };
        },
        methods: {
          getLocalized,
          i18nFormat: i18n.format,
          installOrUninstall() {
            if (this.extension.installed) {
              // uninstall
            } else {
              // install
            }
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
          }
        }
      }
    )
  }
}