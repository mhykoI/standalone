import patcher from "../../../../../../../../api/patcher/index.js";
import i18n from "../../../../../../../../api/i18n/index.js";

import cssText from "./style.scss";
import common from "../../../../../../../../api/modules/common.js";
import authentication from "../../../../../../../../api/authentication/index.js";
import events from "../../../../../../../../api/events/index.js";
patcher.injectCSS(cssText);

export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    vueApp.component(
      "inventory-colored-name-feature-card",
      {
        template: `
          <div class="acord--inventory-colored-name-feature-card">
            <div class="content" :class="{'enabled': feature.enabled, 'selected': selected}">
              <div class="template">
                <div class="colored" :style="feature?.data ? \`\${feature.data.points.length === 1 ? \`background-color: \${feature.data.points[0].color};\` : \`background-image: \${feature.data.type}-gradient(\${feature.data.angle}, \${feature.data.points.map(i => \`\${i.color}\${i.percentage ? \` \${i.percentage}%\` : ''}\`).join(', ')}\`}\` : ''">{{i18nFormat('COLORED_NAME')}}</div>
              </div>
              <div class="top">
                <div class="left">
                  <div class="name">{{i18nFormat('COLORED_NAME')}}</div>
                  <div v-if="durationText" class="duration">{{i18nFormat('ENDS_IN', durationText)}}</div>
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
                  <div class="bottom">
                    <div class="settings" @click="settingsVisible = !settingsVisible">
                      <div class="text">{{i18nFormat(settingsVisible ? 'HIDE_SETTINGS' : 'SHOW_SETTINGS')}}</div>
                      <svg v-if="!settingsVisible" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path fill="currentColor" d="M12 15l-4.243-4.243 1.415-1.414L12 12.172l2.828-2.829 1.415 1.414z"/>
                      </svg>
                      <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path fill="currentColor" d="M12 11.828l-2.828 2.829-1.415-1.414L12 9l4.243 4.243-1.415 1.414L12 11.828z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div class="settings" v-if="settingsVisible" :class="{'loading': settingsLoading}">
                <div class="controls">
                  <div class="button" :class="{disabled: points.length >= feature.data.max_points}" @click="addColor">{{i18nFormat("ADD_COLOR")}}</div>
                  <div class="button" @click="fixPercentages">{{i18nFormat("FIX_PERCENTAGES")}}</div>
                </div>
                <div class="colors">
                  <div class="color" v-for="(point, idx) in points" :key="idx">
                    <input v-model="point.color" type="color" class="color-input" />
                    <input v-model="point.percentage" type="number" step="0.05" class="percentage-input" max="100" min="0" />
                    <div class="remove" :class="{disabled: points.length <= 1}" @click="removeColor(idx)">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z"></path>
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
            durationText: "",
            settingsLoading: false,
            settingsVisible: false,
            points: []
          }
        },
        mounted() {
          this.updateDuration();
          this.syncPoints();
        },
        watch: {
          feature() {
            this.updateDuration();
            this.syncPoints();
          }
        },
        methods: {
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
            this.syncPoints();
          },
          removeColor(idx) {
            this.points.splice(idx, 1);
            this.points = [...this.points];
            this.saveFeature();
          },
          addColor() {
            if (this.points.length >= this.feature.data.max_points) return;
            this.points.push({
              color: "#ffffff",
              percentage: 0
            });
            this.saveFeature();
          },
          fixPercentages() {
            let totalPoints = this.points.length;
            if (totalPoints === 0) {
              return;
            }

            let maxPoints = this.feature.data.max_points;
            let amount = Math.floor(maxPoints / totalPoints);
            let remainingAmount = maxPoints % totalPoints;

            let v = amount;
            this.points.forEach((point, idx) => {
              let additionalAmount = (remainingAmount > 0) ? 1 : 0;
              let currentAmount = amount + additionalAmount;
              let percentage = parseFloat(((v + currentAmount) * 100 / maxPoints).toFixed(2));

              if (percentage > 100) {
                currentAmount -= (percentage - 100);
              }

              point.percentage = parseFloat((v * 100 / maxPoints).toFixed(2));
              v += currentAmount;
              remainingAmount--;
            });

            this.saveFeature();
          },
          updateDuration() {
            this.durationText = common.moment.duration(this.feature.durations.end - this.feature.durations.now).locale(i18n.locale).humanize();
          },
          saveFeature: _.debounce(async function () {
            if (this.settingsLoading) return;
            this.settingsLoading = true;
            await fetch(
              `https://api.acord.app/user/@me/profile/item/${this.feature.id}`,
              {
                method: "PATCH",
                headers: {
                  "x-acord-token": authentication.token,
                  "content-type": "application/json"
                },
                body: JSON.stringify({
                  points: this.points
                })
              }
            )
            this.settingsLoading = false;
            events.emit("InventoryFeatureUpdate", { ...this.feature, data: { ...this.feature.data, points: this.points } });
          }, 1000),
          syncPoints() {
            this.points = [...this.feature.data.points];
            if (this.points.find(i => i.percentage === null)) {
              this.fixPercentages();
            }
          }
        }
      }
    );
  }
}