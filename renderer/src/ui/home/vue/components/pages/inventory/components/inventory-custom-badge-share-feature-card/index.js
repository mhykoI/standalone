import patcher from "../../../../../../../../api/patcher/index.js";
import i18n from "../../../../../../../../api/i18n/index.js";

import cssText from "./style.scss";
import authentication from "../../../../../../../../api/authentication/index.js";
import events from "../../../../../../../../api/events/index.js";
import common from "../../../../../../../../api/modules/common.js";
patcher.injectCSS(cssText);

export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    vueApp.component(
      "inventory-custom-badge-share-feature-card",
      {
        template: `
          <div class="acord--inventory-custom-badge-share-feature-card">
            <div class="content" :class="{'enabled': feature.enabled, 'selected': selected}">
              <div class="top">
                <div class="left">
                  <div class="left">
                    <div class="template">
                      <img :src="fetched?.badge_url" />
                    </div>
                  </div>
                  <div class="right">
                    <div class="name">{{i18nFormat('INVENTORY_BADGE_FEATURE', i18nFormat(fetched?.badge_name ?? 'LOADING'))}}</div>
                    <div v-if="durationText" class="duration">{{i18nFormat('ENDS_IN', durationText)}}</div>
                  </div>
                </div>
                <div class="right">
                  <div class="top">
                    <div class="control" @click="toggleEnabled">
                      <svg v-if="!feature?.enabled" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                        <path fill="currentColor" d="M8 7a5 5 0 1 0 0 10h8a5 5 0 0 0 0-10H8zm0-2h8a7 7 0 0 1 0 14H8A7 7 0 0 1 8 5zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                      </svg>
                      <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                        <path fill="currentColor" d="M8 5h8a7 7 0 0 1 0 14H8A7 7 0 0 1 8 5zm8 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
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
            this.fetched = (await (await fetch(`https://api.acord.app/feature/custom-badge/${this.feature.feature_id}`)).json()).data;
          },
          i18nFormat: i18n.format,
          async toggleEnabled() {
            if (this.settingsLoading) return;
            this.settingsLoading = true;
            let newState = !this.feature.enabled;
            await fetch(
              `https://api.acord.app/user/@me/profile/item/${this.feature.id}`,
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