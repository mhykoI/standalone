import patcher from "../../../../../../../../api/patcher/index.js";
import i18n from "../../../../../../../../api/i18n/index.js";
import internal from "../../../../../../../../api/internal/index.js";
import cssText from "./style.scss";
patcher.injectCSS(cssText);

export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    vueApp.component(
      "store-old-payment-card",
      {
        template: `
        <div class="acord--store-old-payment-card">
          <div class="top">
            <div class="top">
              <div class="left">
                <div class="line">{{i18nFormat("STORE_NUM_PACKS", item.packs.length)}}</div>
                <div class="line">{{i18nFormat("STORE_NUM_ITEMS", item.items.length)}}</div>
              </div>
              <div class="right">
                <div v-if="!item.fulfilled" @click="onOldPaymentAction(item)" class="action" acord--tooltip-ignore-destroy :acord--tooltip-content="i18nFormat('STORE_GOTO_PAYMENT')">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM12 11H8V13H12V16L16 12L12 8V11Z"></path>
                  </svg>
                </div>
                <div v-else class="action" @click="onOldPaymentAction(item)" acord--tooltip-ignore-destroy :acord--tooltip-content="i18nFormat('STORE_PAYMENT_DONE')">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M11.602 13.7599L13.014 15.1719L21.4795 6.7063L22.8938 8.12051L13.014 18.0003L6.65 11.6363L8.06421 10.2221L10.189 12.3469L11.6025 13.7594L11.602 13.7599ZM11.6037 10.9322L16.5563 5.97949L17.9666 7.38977L13.014 12.3424L11.6037 10.9322ZM8.77698 16.5873L7.36396 18.0003L1 11.6363L2.41421 10.2221L3.82723 11.6352L3.82604 11.6363L8.77698 16.5873Z"></path>
                  </svg>
                </div>
              </div>
            </div>
            <div class="bottom">
              <div class="left">
                <div class="expand" @click="expanded = !expanded">
                  <svg v-if="!expanded" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M11.9997 13.1714L16.9495 8.22168L18.3637 9.63589L11.9997 15.9999L5.63574 9.63589L7.04996 8.22168L11.9997 13.1714Z"></path>
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M11.9997 10.8284L7.04996 15.7782L5.63574 14.364L11.9997 8L18.3637 14.364L16.9495 15.7782L11.9997 10.8284Z"></path>
                  </svg>
                </div>
              </div>
              <div class="right">
                {{item.total_price ?? i18nFormat("UNKNOWN")}}{{item.total_price ? (item.currency === "try" ? "₺" : "$") : ""}}
              </div>
            </div>
          </div>
          <div class="bottom" v-if="expanded">
            <div class="item" v-for="i in item.packs">
              {{i.name}}
            </div>
            <div class="item" v-for="i in item.items">
              {{i.name}}
            </div>
          </div>
        </div>
        `,
        props: ["item"],
        data() {
          return {
            expanded: false
          }
        },
        methods: {
          i18nFormat: i18n.format,
          onOldPaymentAction(item) {
            internal.openExternal(item.payment_page_url);
          },
        }
      }
    );
  }
}