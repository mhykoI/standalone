import patcher from "../../../../../../../api/patcher/index.js";
import i18n from "../../../../../../../api/i18n/index.js";

import cssText from "./style.scss";
import common from "../../../../../../../api/modules/common.js";
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
                <div class="name">
                  {{i18nFormat('INVENTORY_COLORED_NAME_FEATURE')}}
                </div>
              </div>
              <div class="bottom">

              </div>
              <div class="duration">{{i18nFormat('ENDS_IN', durationText)}}</div>
            </div>
          </div>
        `,
        props: ["feature", "selected"],
        data() {
          return {
            durationText: ""
          }
        },
        mounted() {
          this.updateDuration();
        },
        watch: {
          feature() {
            this.updateDuration();
          }
        },
        methods: {
          i18nFormat: i18n.format,
          toggleEnabled() {

          },
          updateDuration() {
            this.durationText = common.moment.duration(this.feature.durations.end - this.feature.durations.now).locale(i18n.locale).humanize();
          }
        }
      }
    );
  }
}