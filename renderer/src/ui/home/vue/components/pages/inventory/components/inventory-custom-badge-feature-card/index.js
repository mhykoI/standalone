import patcher from "../../../../../../../../api/patcher/index.js";
import i18n from "../../../../../../../../api/i18n/index.js";
import ui from "../../../../../../../../api/ui/index.js";

import cssText from "./style.scss";
import authentication from "../../../../../../../../api/authentication/index.js";
import events from "../../../../../../../../api/events/index.js";
import common from "../../../../../../../../api/modules/common.js";
patcher.injectCSS(cssText);

export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    vueApp.component(
      "inventory-custom-badge-feature-card",
      {
        template: `
          <div class="acord--inventory-custom-badge-feature-card">
            <div class="content" :class="{'enabled': feature.enabled, 'selected': selected}">
              <div class="top">
                <div class="left">
                  <div class="left">
                    <div class="template">
                      <img :src="fetched?.badge_url" />
                    </div>
                  </div>
                  <div class="right">
                    <div class="name">{{i18nFormat('INVENTORY_CUSTOM_BADGE_FEATURE', i18nFormat(fetched?.badge_name ?? 'LOADING'))}}</div>
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
                <div class="controls">
                  <div class="line">
                    <div class="label">{{i18nFormat('BADGE_NAME')}}</div>
                    <input v-model="badgeName" class="input" type="text" maxlength="64" />
                  </div>
                  <div class="line upload">
                    <div class="label">{{i18nFormat('BADGE_IMAGE')}}</div>
                    <div class="bottom">
                      <div class="preview" :style="\`background-image: url('\${fetched?.badge_url}');\`"></div>
                      <div class="upload-button" @click="uploadImage">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M3 19H21V21H3V19ZM13 5.82843V17H11V5.82843L4.92893 11.8995L3.51472 10.4853L12 2L20.4853 10.4853L19.0711 11.8995L13 5.82843Z"></path>
                        </svg>
                      </div>
                      <div v-if="isUploading" class="upload-text">{{i18nFormat('UPLOADING')}}</div>
                    </div>
                  </div>
                </div>
                <div class="users">
                  <div class="title">{{i18nFormat('SHARED_USERS')}} ({{i18nFormat('MAX')}}: {{feature.data.share_limit}})</div>
                  <div class="user" v-for="(user, idx) in users" :key="idx">
                    <div class="avatar" :style="\`background-image: url('https://cdn.discordapp.com/avatars/\${user.id}/\${user.avatar}.png');\`"></div>
                    <div class="name">{{user.tag || user.id}}</div>
                    <div class="remove" @click="removeUser(user.id)">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z"></path>
                      </svg>
                    </div>
                  </div>
                  <div v-if="!(userIds.length >= feature.data.share_limit)" class="user-add">
                    <div class="avatar" :style="\`background-image: url('https://cdn.discordapp.com/avatars/\${resolvedUser?.id}/\${resolvedUser?.avatar}.png');\`"></div>
                    <input v-model="resolveUserId" class="id-input" type="text" :placeholder="i18nFormat('USER_ID')" />
                    <div class="add" @click="addUser" :class="{disabled: !resolvedUser || userIds.includes(resolveUserId) }">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
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
            durationText: "",
            userIds: [],
            resolvedUser: null,
            resolveUserId: "",
            badgeName: "",
            ignoreUpdateOnce: false,
            isUploading: false
          }
        },
        computed: {
          users() {
            return this.userIds.map(id => {
              let user = common.UserStore.getUser(id);
              return { id, tag: user?.tag, avatar: user?.avatar };
            });
          }
        },
        methods: {
          async fetch() {
            if (this.feature.durations) this.durationText = common.moment.duration(this.feature.durations.end - this.feature.durations.now).locale(i18n.locale).humanize();
            this.fetched = (await (await fetch(`https://api.acord.app/feature/custom-badge/${this.feature.feature_id}`)).json()).data;
            this.userIds = this.fetched.shares.map(i => i.user_id);
            this.badgeName = this.fetched.badge_name;
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
          },
          async removeUser(id) {
            if (this.settingsLoading) return;
            this.settingsLoading = true;
            await fetch(
              `https://api.acord.app/feature/custom-badge/${this.feature.feature_id}/share/${id}`,
              {
                method: "DELETE",
                headers: {
                  "x-acord-token": authentication.token,
                  "content-type": "application/json"
                }
              }
            );
            this.settingsLoading = false;
            this.userIds = this.userIds.filter(i => i !== id);
          },
          async addUser() {
            if (!this.resolvedUser || this.settingsLoading || this.userIds.includes(this.resolveUserId)) return;
            let userId = this.resolvedUser.id;
            this.settingsLoading = true;
            await fetch(
              `https://api.acord.app/feature/custom-badge/${this.feature.feature_id}/share/${userId}`,
              {
                method: "PUT",
                headers: {
                  "x-acord-token": authentication.token,
                  "content-type": "application/json"
                }
              }
            );
            this.settingsLoading = false;
            this.userIds.push(userId);
            this.resolveUserId = "";
          },
          async uploadImage() {
            if (this.settingsLoading) return;

            let file = document.createElement("input");
            file.type = "file";
            file.accept = "image/png, image/jpeg, image/jpg, image/gif";
            file.oninput = async () => {
              if (!file.files[0]) {
                this.settingsLoading = false;
                return;
              }

              this.isUploading = true;
              this.settingsLoading = true;

              let reader = new FileReader();
              reader.onload = async () => {
                let req = await fetch(
                  `https://api.acord.app/feature/custom-badge/${this.feature.feature_id}`,
                  {
                    method: "PATCH",
                    headers: {
                      "x-acord-token": authentication.token,
                      "content-type": "application/json"
                    },
                    body: JSON.stringify({
                      image: reader.result
                    })
                  }
                );

                try {
                  let json = await req.json()
                  if (!json.ok) {
                    ui.notifications.show.error(json.error);
                  }
                } catch { }

                this.isUploading = false;
                this.settingsLoading = false;
                
                this.ignoreUpdateOnce = true;
                events.emit("InventoryFeatureUpdate", { ...this.feature });
              };

              reader.onerror = () => {
                this.isUploading = false;
                this.settingsLoading = false;
              };
              reader.readAsDataURL(file.files[0]);
            }
            file.click();
          },
          badgeNameDebounced: _.debounce(async function () {
            if (this.settingsLoading) return;
            this.settingsLoading = true;
            await fetch(
              `https://api.acord.app/feature/custom-badge/${this.feature.feature_id}`,
              {
                method: "PATCH",
                headers: {
                  "x-acord-token": authentication.token,
                  "content-type": "application/json"
                },
                body: JSON.stringify({
                  name: this.badgeName.trim()
                })
              }
            );
            this.settingsLoading = false;
            this.ignoreUpdateOnce = true;
            events.emit("InventoryFeatureUpdate", { ...this.feature });
          }, 1000)
        },
        watch: {
          feature() {
            this.fetch();
          },
          resolveUserId(val) {
            if (!val.trim()) {
              this.resolvedUser = null;
              return;
            }
            let user = common.UserStore.getUser(val.trim());
            if (!user) {
              this.resolvedUser = null;
              return;
            }
            if (user.id === common.UserStore.getCurrentUser().id) {
              this.resolvedUser = null;
              return;
            }
            this.resolvedUser = { id: user.id, avatar: user.avatar, tag: user.tag };
          },
          badgeName(val) {
            if (this.settingsLoading || !val.trim()) return;
            if (this.ignoreUpdateOnce) {
              this.ignoreUpdateOnce = false;
              return;
            }
            this.badgeNameDebounced();
          }
        },
        mounted() {
          this.fetch();
        }
      }
    );
  }
}