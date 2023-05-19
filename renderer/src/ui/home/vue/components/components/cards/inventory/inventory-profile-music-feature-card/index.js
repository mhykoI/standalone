import patcher from "../../../../../../../../api/patcher/index.js";
import i18n from "../../../../../../../../api/i18n/index.js";

import cssText from "./style.scss";
import { playSpotifyData } from "../../../../../../../other/utils/spotify.js";
import common from "../../../../../../../../api/modules/common.js";
import authentication from "../../../../../../../../api/authentication/index.js";
import events from "../../../../../../../../api/events/index.js";
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
              <div class="top">
                <div class="left">
                  <div class="left">
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
                  </div>
                  <div class="right">
                    <div class="name">{{i18nFormat('INVENTORY_PROFILE_MUSIC_FEATURE')}}</div>
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
                <div class="line">
                  <div class="label">{{i18nFormat('SPOTIFY_TRACK_LINK')}}:</div>
                  <input v-model="trackLinkInputText" type="text" class="info-input" :class="{'error': trackLinkInputError}" placeholder="https://open.spotify.com/track/1234" />
                </div>
                <div class="line">
                  <div class="label">{{i18nFormat('TRACK_START_POSITION_SECONDS')}}:</div>
                  <input v-model="trackPositionInputText" type="number" step="0.5" class="info-input" :class="{'error': trackPositionInputError}" placeholder="45" />
                </div>
              </div>
            </div>
          </div>
        `,
        props: ["feature", "selected"],
        data() {
          return {
            spotifyPlaying: false,
            spotifyLoading: false,
            _pauseSpotify: null,
            durationText: "",
            settingsVisible: false,
            settingsLoading: false,
            trackLinkInputText: "",
            trackLinkInputError: false,
            trackPositionInputText: "0",
            trackPositionInputError: false
          }
        },
        mounted() {
          this.updateSelfData();
        },
        watch: {
          feature() {
            this.updateSelfData();
          },
          trackLinkInputText(val) {
            this.trackLinkInputError = !val.startsWith("https://open.spotify.com/track/");
            if (!this.trackLinkInputError) {
              let id = val.split("?")[0].split("/").pop().trim();
              this.trackLinkInputText = `https://open.spotify.com/track/${id}`;
              this.debouncedTrackLinkInputText(id);
            }
          },
          trackPositionInputText(val) {
            if (!val) {
              this.trackPositionInputText = `0`;
              return;
            }
            let num = parseFloat(this.trackPositionInputText);
            this.trackPositionInputText = `${num}`;
            if (isNaN(num) || num < 0) {
              this.trackPositionInputError = true;
              return;
            }
            this.trackPositionInputError = false;
            this.debouncedTrackPositionInputText(num);
          },
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
            this.durationText = common.moment.duration(this.feature.durations.end - this.feature.durations.now).locale(i18n.locale).humanize();
          },
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
          },
          updateSelfData() {
            this.updateDuration();
            let id = this.feature.data.uri.split(":").pop().trim();
            if (id) this.trackLinkInputText = `https://open.spotify.com/track/${id}`;
            this.trackPositionInputText = `${Math.floor(this.feature.data.position_ms / 1000)}`;
          },
          debouncedTrackPositionInputText: _.debounce(async function (num) {
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
                  position_ms: num * 1000
                })
              }
            )
            this.settingsLoading = false;
            events.emit("InventoryFeatureUpdate", { ...this.feature, data: { ...this.feature.data, position_ms: num * 1000 } });
          }, 1500),
          debouncedTrackLinkInputText: _.debounce(async function (id) {
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
                  uri: `spotify:track:${id}`
                })
              }
            )
            this.settingsLoading = false;
            events.emit("InventoryFeatureUpdate", { ...this.feature, data: { ...this.feature.data, uri: `spotify:track:${id}` } });
          }, 1500),
        }
      }
    );
  }
}