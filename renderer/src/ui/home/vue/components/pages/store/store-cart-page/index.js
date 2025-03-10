import patcher from "../../../../../../../api/patcher/index.js";
import events from "../../../../../../../api/events/index.js";
import i18n from "../../../../../../../api/i18n/index.js";
import cssText from "./style.scss";
import storeData from "../store-data.js";
import countries from "./countries.json";
import internal from "../../../../../../../api/internal/index.js";
import authentication from "../../../../../../../api/authentication/index.js";
import ui from "../../../../../../../api/ui/index.js";
import common from "../../../../../../../api/modules/common.js";
patcher.injectCSS(cssText);

export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    vueApp.component(
      "store-cart-page",
      {
        template: `
        <div class="acord--store-cart-page">
          <div class="container">
            <div class="nav">
              <div class="left">
                <div class="back" @click="goBack">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path>
                  </svg>
                </div>
                <div class="title">{{i18nFormat("STORE_CART")}}</div>
              </div>
              <div class="right"></div>
            </div>
            <div v-if="!inCheckout" class="items-content">
              <div class="items">
                <div class="item" v-for="item in reactive.cartItems" :key="item.id">
                  <div class="left">
                    <div class="image" :style="\`background-image: url('\${item.image[0]}');\`"></div>
                    <div class="name">{{item.name}}</div>
                  </div>
                  <div class="right">
                    <store-price-card :item="item" :small="true" />
                  </div>
                </div>
              </div>
              <div class="total">
                <div class="info-line">
                  <strong>{{i18nFormat("STORE_BALANCE")}}:</strong> {{reactive.balance.toFixed(2)}}$
                </div>
                <div class="info-line">
                  <strong>{{i18nFormat("STORE_TOTAL")}}:</strong> {{reactive.cartItems.reduce((all,i)=>all+i.prices.try,0).toFixed(2)}}₺ ({{reactive.cartItems.reduce((all,i)=>all+i.prices.usd,0).toFixed(2)}}$)
                </div>
                <strong class="info-line">
                  {{i18nFormat("STORE_KDV_INCLUDED")}}
                </strong>
                <div class="checkout-button" @click="checkout" :class="{'disabled': !reactive.cartItems.length || paymentLoading}">
                  {{i18nFormat("STORE_CHECKOUT")}}
                </div>
                <div class="checkout-button" @click="checkoutWithBalance" :class="{'disabled': !reactive.cartItems.length || reactive.cartItems.reduce((all,i)=>all+i.prices.usd,0) > reactive.balance || paymentLoading}">
                  {{i18nFormat("STORE_CHECKOUT_BALANCE")}}
                </div>
                <div class="old-payments">
                  <div class="title">{{i18nFormat("STORE_OLD_PAYMENTS")}}</div>
                  <div class="items">
                    <store-old-payment-card v-for="item in oldPayments" :item="item" :key="item.id" />
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="checkout-content">
              <form @submit="onCheckoutSubmit" class="checkout-form">
                <div class="input-line">
                  <div class="label">{{i18nFormat("BUYER_NAME")}}:</div>
                  <input v-model="buyerData.buyer_name" type="text" required tabindex="1"/>
                </div>
                <div class="input-line">
                  <div class="label">{{i18nFormat("BUYER_SURNAME")}}:</div>
                  <input v-model="buyerData.buyer_surname" type="text" required tabindex="2" />
                </div>
                <div class="input-line">
                  <div class="label">{{i18nFormat("BUYER_MAIL")}}:</div>
                  <input v-model="buyerData.buyer_mail" type="email" required tabindex="3" />
                </div>
                <div class="input-line">
                  <div class="label">{{i18nFormat("BUYER_GSM_NO")}}:</div>
                  <input v-model="buyerData.buyer_gsm_no" type="tel" required tabindex="4" />
                </div>
                <div class="input-line">
                  <div class="label">{{i18nFormat("BUYER_CITY")}}:</div>
                  <input v-model="buyerData.buyer_city" type="text" required tabindex="6" />
                </div>
                <div class="input-line">
                  <div class="label">{{i18nFormat("BUYER_DISTRICT")}}:</div>
                  <input v-model="buyerData.buyer_district" type="text" required tabindex="7" />
                </div>
                <div class="input-line">
                  <div class="label">{{i18nFormat("BUYER_COUNTRY")}}:</div>
                  <select v-model="buyerData.buyer_country" required tabindex="8"  @change="onCountryChange">
                    <option value="" disabled selected>{{i18nFormat("SELECT")}}</option>
                    <option v-for="country in countries" :key="country" :value="country">{{country}}</option>
                  </select>
                </div>
                <div class="price-line">
                  <div class="label">{{i18nFormat("STORE_TOTAL")}}:</div>
                  <div class="price">
                    {{(buyerData.buyer_country === "Turkey" || !buyerData.buyer_country) ? reactive.cartItems.reduce((all,i)=>all+i.prices.try,0).toFixed(2) : (reactive.cartItems.reduce((all,i)=>all+i.prices.usd,0) + ((buyerData.buyer_country === "Turkey" || !buyerData.buyer_country) ? 0 : 0.5)).toFixed(2)}}{{(buyerData.buyer_country === "Turkey" || !buyerData.buyer_country) ? "₺" : "$"}}
                  </div>
                </div>
                <button type="submit" class="submit-button" :class="{'disabled': paymentLoading}" tabindex="9">
                  {{i18nFormat(paymentLoading ? "LOADING" : "STORE_CHECKOUT")}}
                </button>
              </form>
            </div>
          </div>
        </div>
        `,
        data() {
          return {
            reactive: storeData.reactive,
            oldPayments: [],
            inCheckout: false,
            paymentLoading: false,
            buyerData: {
              buyer_name: '',
              buyer_surname: '',
              buyer_mail: '',
              buyer_gsm_no: '',
              buyer_address: '...',
              buyer_city: '',
              buyer_country: '',
              buyer_district: ''
            },
            countries,
            paymentPageUrl: ""
          }
        },
        mounted() {
          this.resetBuyerData();
          this.fetchOldPayments();
          events.on("StorePaymentOk", this.paymentOk);
        },
        unmounted() {
          events.off("StorePaymentOk", this.paymentOk);
        },
        methods: {
          i18nFormat: i18n.format,
          resetBuyerData() {
            let currentUser = common.UserStore.getCurrentUser();
            this.buyerData = {
              buyer_name: '',
              buyer_surname: '',
              buyer_mail: currentUser.email || "",
              buyer_gsm_no: currentUser.phone || "",
              buyer_address: '...',
              buyer_city: '',
              buyer_country: '',
              buyer_district: ''
            };
          },
          paymentOk() {
            this.paymentPageUrl = "";
            this.inCheckout = false;
            this.reactive.cartItems.splice(0, this.reactive.cartItems.length);
            events.emit("StoreSubPageChange", { name: "landing" });
            ui.notifications.show.success(i18n.format("STORE_PAYMENT_OK"));
            this.fetchOldPayments();
            storeData.fetchBalance();
          },
          async checkoutWithBalance() {
            if (this.reactive.cartItems.reduce((all, i) => all + i.prices.usd, 0) > this.reactive.balance) return;
            this.paymentLoading = true;
            let req = await fetch(
              "https://api.acord.app/store/payment/deposit-pay",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "x-acord-token": authentication.token
                },
                body: JSON.stringify({
                  items: this.reactive.cartItems.map(i => ({ id: i.id, type: i.type }))
                }),
              }
            );
            let res = await req.json();
            if (!req.ok) {
              this.paymentLoading = false;
              ui.notifications.show.error(res.error, { timeout: 30000 });
              return;
            }
            this.paymentLoading = false;
            this.paymentOk();
          },
          goBack() {
            if (this.inCheckout) {
              this.inCheckout = false;
              return;
            }
            events.emit("StoreSubPageChange", { name: "landing" });
          },
          checkout() {
            if (this.inCheckout) return;
            this.inCheckout = true;
          },
          async fetchOldPayments() {
            const list = await fetch("https://api.acord.app/store/payment/list", {
              method: "GET",
              headers: {
                "x-acord-token": authentication.token
              }
            }).then((res) => res.json());
            this.oldPayments = list?.data.reverse() ?? [];
          },
          async onCountryChange() {
            if (this.buyerData.buyer_country !== "Turkey") {
              ui.notifications.show.error(i18n.format("EXTRA_COMMISSION"), { timeout: 8000 })
            }
          },
          async onCheckoutSubmit(e) {
            e.preventDefault();
            await storeData.fetchBalance();
            let usdTotal = this.reactive.cartItems.reduce((all, i) => all + i.prices.usd, 0);
            if (usdTotal < 0.5 && this.buyerData.buyer_country !== "Turkey") {
              ui.notifications.show.error(i18n.format("STORE_MINIMUM_USD"));
              return;
            }
            if (this.paymentPageUrl) {
              internal.openExternal(this.paymentPageUrl);
              return;
            }
            this.paymentLoading = true;
            let req = await fetch(
              "https://api.acord.app/store/payment/create-checkout-session",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "x-acord-token": authentication.token
                },
                body: JSON.stringify({
                  ...this.buyerData,
                  buyer_locale: i18n.locale === "tr" ? "tr" : "en",
                  items: this.reactive.cartItems.map(i => ({ id: i.id, type: i.type }))
                }),
              }
            );
            let res = await req.json();
            if (!req.ok) {
              this.paymentLoading = false;
              ui.notifications.show.error(res.error, { timeout: 30000 });
              return;
            }
            this.paymentPageUrl = res.data.payment_page_url;
            this.paymentLoading = false;
            internal.openExternal(this.paymentPageUrl);
            this.reactive.cartItems.splice(0, this.reactive.cartItems.length);
            this.resetBuyerData();
            this.inCheckout = false;
            storeData.fetchBalance();
            setTimeout(() => {
              this.fetchOldPayments();
            }, 1000);
          }
        }
      }
    );
  }
}