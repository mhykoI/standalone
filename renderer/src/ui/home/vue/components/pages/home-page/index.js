import patcher from "../../../../../../api/patcher/index.js";
import i18n from "../../../../../../api/i18n/index.js";
import ui from "../../../../../../api/ui/index.js";
import cssText from "./style.scss";
import internal from "../../../../../../api/internal/index.js";
import storage from "../../../../../../api/storage/index.js";
import events from "../../../../../../api/events/index.js";
import common from "../../../../../../api/modules/common.js";
import authentication from "../../../../../../api/authentication/index.js";
patcher.injectCSS(cssText);

export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    vueApp.component(
      "home-page",
      {
        template: `
          <div class="acord--home-page">
            <div class="container">
              <div class="banner" />
              <div class="content">
                <div class="auth-card">
                  <div class="title">
                    {{i18nFormat("ENTER_ACORD_TOKEN")}}
                  </div>
                  <div class="input-container" :class="{'disabled': authenticating}">
                    <discord-input v-model="acordToken" />
                    <div class="action" @click="authenticate" :class="{'disabled': !acordToken.trim() }" acord--tooltip-ignore-destroy :acord--tooltip-content="i18nFormat('AUTHENTICATION_CONNECT_ACCOUNT')">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path fill="currentColor" d="M12 2c5.523 0 10 4.477 10 10 0 2.136-.67 4.116-1.811 5.741L17 12h3a8 8 0 1 0-2.46 5.772l.998 1.795A9.961 9.961 0 0 1 12 22C6.477 22 2 17.523 2 12S6.477 2 12 2zm0 5a3 3 0 0 1 3 3v1h1v5H8v-5h1v-1a3 3 0 0 1 3-3zm2 6h-4v1h4v-1zm-2-4a1 1 0 0 0-.993.883L11 10v1h2v-1a1 1 0 0 0-.883-.993L12 9z"/>
                      </svg>
                    </div>
                    <div class="action" @click="open" acord--tooltip-ignore-destroy :acord--tooltip-content="i18nFormat('AUTHENTICATION_OPEN_CONNECT_LINK')">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path fill="currentColor" d="M10 6v2H5v11h11v-5h2v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6zm11-3v8h-2V6.413l-7.793 7.794-1.414-1.414L17.585 5H13V3h8z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `,
        data() {
          return {
            isConnected: false,
            acordToken: "",
            authenticating: false
          }
        },
        methods: {
          i18nFormat: i18n.format,
          open() {
            internal.openExternal("https://discord.com/oauth2/authorize?client_id=1083403277980409937&redirect_uri=https%3A%2F%2Fapi.acord.app%2Fstatic%2Fcallback%2Fstep1&response_type=token&scope=identify%20guilds.join");
          },
          async authenticate() {
            if (this.authenticating) return;
            this.authenticating = true;
            let res = await (await fetch(`https://api.acord.app/auth/exchange?acordToken=${this.acordToken}`)).json();

            if (!res?.data?.id) {
              ui.notifications.show.error(i18n.format("AUTHENTICATION_INVALID_TOKEN"));
              this.authenticating = false;
              this.acordToken = "";
              return;
            }

            let currentUserId = common.UserStore.getCurrentUser().id;

            if (res?.data?.id !== currentUserId) {
              ui.notifications.show.error(i18n.format("AUTHENTICATION_USER_MISMATCH"));
              this.authenticating = false;
              this.acordToken = "";
              return;
            }

            const store = await authentication.when();
            store.store.acordTokens[currentUserId] = this.acordToken;

            ui.notifications.show.success(i18n.format("AUTHENTICATION_SUCCESS", common.UserStore.getCurrentUser().tag));

            events.emit("AuthenticationSuccess", { userId: currentUserId, acordToken: this.acordToken });

            this.authenticating = false;
            this.acordToken = "";
            this.$forceUpdate();
          },
          onAuthenticationSuccess() {
            this.isConnected = !!storage.authentication.token;
            this.$forceUpdate();
          }
        },
        mounted() {
          this.onAuthenticationSuccess();
          storage.authentication.when().then(this.onAuthenticationSuccess);
          events.on("AuthenticationSuccess", this.onAuthenticationSuccess);
          events.on("CurrentUserChange", this.onAuthenticationSuccess);
        },
        unmounted() {
          events.off("AuthenticationSuccess", this.onAuthenticationSuccess);
          events.off("CurrentUserChange", this.onAuthenticationSuccess);
        }
      }
    );
  }
}