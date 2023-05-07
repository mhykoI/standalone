import patcher from "../../../../../../../api/patcher/index.js";
import i18n from "../../../../../../../api/i18n/index.js";

import cssText from "./style.scss";
import authentication from "../../../../../../../api/authentication/index.js";
import events from "../../../../../../../api/events/index.js";
import common from "../../../../../../../api/modules/common.js";
patcher.injectCSS(cssText);

export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    vueApp.component(
      "inventory-badge-feature-card",
      {
        template: `
          <div class="acord--inventory-badge-feature-card">
            <div class="content" :class="{'enabled': feature.enabled, 'selected': selected}">
              <div class="template">
                <img :src="fetched?.image" />
              </div>
              <div class="top">
                <div class="name">
                  {{i18nFormat('INVENTORY_BADGE_FEATURE', i18nFormat(fetched?.display_name ?? 'LOADING'))}}
                </div>
                <div class="settings" v-if="settingsVisible" :class="{'loading': settingsLoading}">
                  <div class="line">
                    <div class="control" @click="toggleEnabled">
                      <svg v-if="feature?.enabled" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                        <path fill="currentColor" d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h14V5H5zm6.003 11L6.76 11.757l1.414-1.414 2.829 2.829 5.656-5.657 1.415 1.414L11.003 16z"/>
                      </svg>
                      <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                        <path fill="currentColor" d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h14V5H5z"/>
                      </svg>
                    </div>
                    <div class="label">{{i18nFormat('ENABLED_QUESTION')}}</div>
                  </div>
                </div>
              </div>
              <div class="bottom">
                <div></div>
                <div class="settings-toggle" @click="settingsVisible = !settingsVisible">
                  {{i18nFormat(settingsVisible ? 'HIDE_SETTINGS' : 'SHOW_SETTINGS')}}
                </div>
              </div>
              <div v-if="durationText" class="duration">{{i18nFormat('ENDS_IN', durationText)}}</div>
            </div>
          </div>
        `,
        props: ["feature", "selected"],
        data() {
          return {
            fetched: null,
            settingsVisible: false,
            settingsLoading: false,
            durationText: ""
          }
        },
        methods: {
          async fetch() {
            if (this.feature.durations) this.durationText = common.moment.duration(this.feature.durations.end - this.feature.durations.now).locale(i18n.locale).humanize();
            this.fetched = (await (await fetch(`https://api.acord.app/feature/badge/${this.feature.feature_id}`)).json()).data;
          },
          i18nFormat: i18n.format,
          async toggleEnabled() {
            if (this.settingsLoading) return;
            this.settingsLoading = true;
            let newState = !this.feature.enabled;
            await fetch(
              `https://api.acord.app/user/@me/profile/item/${this.feature.id}?role_connection_id=${this.feature.role_connection_id}`,
              {
                method: "PATCH",
                headers: {
                  "x-acord-token": authentication.token,
                  "content-type": "application/json"
                },
                body: JSON.stringify({
                  enabled: newState
                })
              }
            )
            this.settingsLoading = false;
            events.emit("InventoryFeatureUpdate", { ...this.feature, enabled: newState });
          }
        },
        watch: {
          feature() {
            this.fetch();
          }
        },
        mounted() {
          this.fetch();
        }
      }
    );
  }
}