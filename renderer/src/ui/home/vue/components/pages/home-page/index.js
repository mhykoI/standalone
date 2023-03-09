import patcher from "../../../../../../api/patcher/index.js";
import i18n from "../../../../../../api/i18n/index.js";
import cssText from "./style.scss";
import internal from "../../../../../../api/internal/index.js";
import storage from "../../../../../../api/storage/index.js";
import events from "../../../../../../api/events/index.js";
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
              <dev class="description">
                {{ i18nFormat(isConnected ? "ACCOUNT_IS_CONNECTED" : "ACCOUNT_IS_NOT_CONNECTED") }}
                <br /><br />
                <a @click="open">{{i18nFormat("CLICK_HERE_TO_CONNECT")}}</a>
              </dev>
            </div>
          </div>
        `,
        data() {
          return {
            isConnected: false,
          }
        },
        methods: {
          i18nFormat: i18n.format,
          open() {
            internal.openExternal("https://discord.com/oauth2/authorize?client_id=1083403277980409937&redirect_uri=https%3A%2F%2Fapi.acord.app%2Fstatic%2Fcallback%2Fstep1&response_type=token&scope=identify%20guilds.join");
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