import patcher from "../../../../../../../api/patcher/index.js";
import i18n from "../../../../../../../api/i18n/index.js";

import cssText from "./style.scss";
import { playSpotifyData } from "../../../../../../other/utils/spotify.js";
patcher.injectCSS(cssText);

export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    vueApp.component(
      "profile-card",
      {
        template: `
          <div class="acord--profile-card">
            <div class="container">
              <div class="left">
                <div v-if="badges.length" class="badges">
                  <img v-for="badge in badges" :key="badge.id" class="badge" :src="badge.image" />
                </div>
                <div @click="spotifyAction" v-if="musicData" class="spotify-action" :class="{'disabled': spotifyLoading}">
                  <svg v-if="!spotifyPlaying" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path fill="currentColor" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM10.622 8.415l4.879 3.252a.4.4 0 0 1 0 .666l-4.88 3.252a.4.4 0 0 1-.621-.332V8.747a.4.4 0 0 1 .622-.332z"/>
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path fill="currentColor" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM9 9h2v6H9V9zm4 0h2v6h-2V9z"/>
                  </svg>
                </div>
                <div class="name-container">
                  <div class="name" :class="{'colored': nameColorData}" :style="nameColorData ? \`\${nameColorData.points.length === 1 ? \`background-color: \${nameColorData.points[0].color};\` : \`background-image: \${nameColorData.type}-gradient(\${nameColorData.angle}, \${nameColorData.points.map(i => \`\${i.color}\${i.percentage ? \` \${i.percentage}%\` : ''}\`).join(', ')}\`}\` : ''">{{name}}</div>
                </div>
              </div>
              <div class="right">
                <div class="avatar" :style="\`background-image: url('\${avatarUrl}'); --hat-image: url('\${hatData?.image}')\`"></div>
              </div>
            </div>
          </div>
        `,
        props: ["nameColorData", "badges", "musicData", "name", "hatData", "avatarUrl"],
        data() {
          return {
            spotifyPlaying: false,
            spotifyLoading: false,
            _pauseSpotify: null
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
            this._pauseSpotify = await playSpotifyData(this.musicData);
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
          }
        }
      }
    );
  }
}