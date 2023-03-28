import patcher from "../../../../../../api/patcher/index.js";
import i18n from "../../../../../../api/i18n/index.js";
import cssText from "./style.scss";
import authentication from "../../../../../../api/authentication/index.js";
import events from "../../../../../../api/events/index.js";
import common from "../../../../../../api/modules/common.js";
patcher.injectCSS(cssText);

export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    vueApp.component(
      "inventory-page",
      {
        template: `
        <div class="acord--inventory-page">
          <div class="container">
            <div class="left">
              <div class="top">
                <discord-input v-model="searchText" :placeholder="i18nFormat('SEARCH')"></discord-input>
                <div class="refresh" :class="{'loading': fetching}" :acord--tooltip-content="i18nFormat('REFRESH')"
                  @click="fetchAll">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path fill="currentColor"
                      d="M5.463 4.433A9.961 9.961 0 0 1 12 2c5.523 0 10 4.477 10 10 0 2.136-.67 4.116-1.81 5.74L17 12h3A8 8 0 0 0 6.46 6.228l-.997-1.795zm13.074 15.134A9.961 9.961 0 0 1 12 22C6.477 22 2 17.523 2 12c0-2.136.67-4.116 1.81-5.74L7 12H4a8 8 0 0 0 13.54 5.772l.997 1.795z" />
                  </svg>
                </div>
              </div>
              <div class="bottom">
                <span v-for="feature, idx in features" @click="selectedFeature = feature._id">
                  <component :feature="feature" :selected="selectedFeature === feature._id" :is="\`inventory-\${feature.type.replaceAll('_', '-')}-feature-card\`" :key="feature._id">
                  </component>
                </span>
              </div>
            </div>
            <div class="right">
              <profile-card :name-color-data="profileCardData.nameColorData" :badges="profileCardData.badges"
                :music-data="profileCardData.musicData" :name="profileCardData.name" :hat-data="profileCardData.hatData"
                :avatar-url="profileCardData.avatarUrl"></profile-card>
            </div>
          </div>
        </div>
        `,
        data() {
          return {
            profileCardData: {
              nameColorData: null,
              badges: [],
              musicData: null,
              name: "",
              hatData: null,
              avatarUrl: ""
            },
            features: [],
            searchText: "",
            fetching: false,
            selectedFeature: null
          }
        },
        async mounted() {
          this.fetchPreview();
          this.fetchFeatures();
          events.on("InventoryFeatureUpdate", this.onInventoryFeatureUpdate);
        },
        async unmounted() {
          events.off("InventoryFeatureUpdate", this.onInventoryFeatureUpdate);
        },
        methods: {
          i18nFormat: i18n.format,
          fetchAll() {
            this.fetchPreview();
            this.fetchFeatures();
          },
          onInventoryFeatureUpdate(feature) {
            let idx = this.features.findIndex(i => i._id === feature._id);
            if (idx === -1) return;

            if (feature.type === "hat" && feature.enabled) {
              this.features.forEach(i => {
                if (i.type === "hat") i.enabled = false;
              });
            };

            this.features.splice(idx, 1, feature);
            this.processFeatures();
            this.$forceUpdate();
          },
          async fetchPreview() {
            if (this.fetching) return;
            this.fetching = true;
            let user = common.UserStore.getCurrentUser();
            this.profileCardData.name = user.username;
            this.profileCardData.avatarUrl = user.avatar ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png` : null;
            await this.fetchFeatures();
            this.fetching = false;
            this.processFeatures();
          },
          async processFeatures() {
            this.profileCardData.nameColorData = this.features?.find(i => i.type === "colored_name" && i.enabled)?.data;
            this.profileCardData.musicData = this.features?.find(i => i.type === "profile_music" && i.enabled)?.data;

            let hatFeature = this.features?.find(i => i.type === "hat" && i.enabled);
            if (hatFeature) {
              this.profileCardData.hatData = (await (await fetch(`https://api.acord.app/feature/hat/${hatFeature.feature_id}`)).json()).data;
            } else {
              this.profileCardData.hatData = null;
            }

            this.profileCardData.badges = (await Promise.all(
              this.features.filter(i => i.type === "badge" && i.enabled).map(async i => {
                let req = await fetch(`https://api.acord.app/feature/badge/${i.feature_id}`);
                if (!req.ok) return null;
                let json = await req.json();
                return json.data;
              })
            )).filter(i => i);
          },
          async fetchFeatures() {
            let req = await fetch(`https://api.acord.app/user/@me/profile/inventory?include_disabled=true&durations=true`, {
              method: "GET",
              headers: {
                "x-acord-token": authentication.token
              }
            });
            let features = (await req.json())?.data?.features || [];
            this.features = features.filter(i => i.feature_id !== 1).map(i => ({ ...i, _id: `${i.type},${i.id},${i.feature_id}` }));
            this.processFeatures();
          }
        }
      }
    );
  }
}