import patcher from "../../../../../../../api/patcher/index.js";
import i18n from "../../../../../../../api/i18n/index.js";

import cssText from "./style.scss";
import { playSpotifyData } from "../../../../../../other/utils/spotify.js";
import common from "../../../../../../../api/modules/common.js";
patcher.injectCSS(cssText);

export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    vueApp.component(
      "inventory-profile-music-feature-card",
      {
        template: `
          <div class="acord--inventory-profile-music-feature-card">
            <div class="content" :class="{'enabled': feature.enabled, 'selected': selected}">
              <div class="template">
                <div @click="spotifyAction" v-if="feature?.data" class="spotify-action" :class="{'disabled': spotifyLoading}">
                  <svg v-if="!spotifyPlaying" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path fill="currentColor" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM10.622 8.415l4.879 3.252a.4.4 0 0 1 0 .666l-4.88 3.252a.4.4 0 0 1-.621-.332V8.747a.4.4 0 0 1 .622-.332z"/>
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path fill="currentColor" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM9 9h2v6H9V9zm4 0h2v6h-2V9z"/>
                  </svg>
                </div>
              </div>
              <div class="top">
                <div class="name">
                  {{i18nFormat('INVENTORY_PROFILE_MUSIC_FEATURE')}}
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
            spotifyPlaying: false,
            spotifyLoading: false,
            _pauseSpotify: null,
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
          async spotifyAction() {
            if (this._pauseSpotify) {
              this.pauseSpotify();
            } else {
              this.playSpotify();
            }
          },
          async playSpotify() {
            this.spotifyLoading = true;
            this._pauseSpotify = await playSpotifyData(this.feature.data);
            this.spotifyPlaying = true;
            this.spotifyLoading = false;
          },
          async pauseSpotify() {
            this.spotifyLoading = true;
            if (this._pauseSpotify) {
              await this._pauseSpotify();
              this._pauseSpotify = null;
              this.spotifyPlaying = false;
            }
            this.spotifyLoading = false;
          },
          updateDuration() {
            this.durationText = common.moment.duration(this.feature.durations.end - this.feature.durations.start).locale(i18n.locale).humanize();
          }
        }
      }
    );
  }
}