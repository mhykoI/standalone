import patcher from "../../../../../../../api/patcher/index.js";
import events from "../../../../../../../api/events/index.js";
import i18n from "../../../../../../../api/i18n/index.js";
import cssText from "./style.scss";
import cosmeticsData from "../cosmetics-data.js";
import countries from "./countries.json";
import internal from "../../../../../../../api/internal/index.js";
import authentication from "../../../../../../../api/authentication/index.js";
import ui from "../../../../../../../api/ui/index.js";
patcher.injectCSS(cssText);

export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    vueApp.component(
      "cosmetics-cart-page",
      {
        template: `
        <div class="acord--cosmetics-cart-page">
          <div class="container">
            <div class="nav">
              <div class="left">
                <div class="back" @click="goBack">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path>
                  </svg>
                </div>
                <div class="title">{{i18nFormat("COSMETICS_CART")}}</div>
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
                    <cosmetics-price-card :item="item" :small="true" />
                  </div>
                </div>
              </div>
              <div class="total">
                <div class="line">
                  <strong>{{i18nFormat("COSMETICS_TOTAL")}}:</strong> {{reactive.cartItems.reduce((all,i)=>all+i.prices.try,0).toFixed(2)}}₺
                </div>
                <strong class="line">
                  {{i18nFormat("COSMETICS_KDV_INCLUDED")}}
                </strong>
                <div class="checkout-button" @click="checkout" :class="{'disabled': !reactive.cartItems.length}">
                  {{i18nFormat("COSMETICS_CHECKOUT")}}
                </div>
              </div>
            </div>
            <div v-else class="checkout-content">
              <form @submit="onCheckoutSubmit" class="checkout-form">
                <div class="input-line">
                  <div class="label">{{i18nFormat("BUYER_NAME")}}:</div>
                  <input v-model="buyerData.buyer_name" type="text" required />
                </div>
                <div class="input-line">
                  <div class="label">{{i18nFormat("BUYER_SURNAME")}}:</div>
                  <input v-model="buyerData.buyer_surname" type="text" required />
                </div>
                <div class="input-line">
                  <div class="label">{{i18nFormat("BUYER_MAIL")}}:</div>
                  <input v-model="buyerData.buyer_mail" type="email" required />
                </div>
                <div class="input-line">
                  <div class="label">{{i18nFormat("BUYER_GSM_NO")}}:</div>
                  <input v-model="buyerData.buyer_gsm_no" type="tel" required />
                </div>
                <div class="input-line">
                  <div class="label">{{i18nFormat("BUYER_ADDRESS")}}:</div>
                  <input v-model="buyerData.buyer_address" type="text" required />
                </div>
                <div class="input-line">
                  <div class="label">{{i18nFormat("BUYER_CITY")}}:</div>
                  <input v-model="buyerData.buyer_city" type="text" required />
                </div>
                <div class="input-line">
                  <div class="label">{{i18nFormat("BUYER_DISTRICT")}}:</div>
                  <input v-model="buyerData.buyer_district" type="text" required />
                </div>
                <div class="input-line">
                  <div class="label">{{i18nFormat("BUYER_COUNTRY")}}:</div>
                  <select v-model="buyerData.buyer_country" required>
                    <option value="" disabled selected>{{i18nFormat("SELECT")}}</option>
                    <option v-for="country in countries" :key="country" :value="country">{{country}}</option>
                  </select>
                </div>
                <div class="price-line">
                  <div class="label">{{i18nFormat("COSMETICS_TOTAL")}}:</div>
                  <div class="price">
                    {{reactive.cartItems.reduce((all,i)=>all+i.prices.try,0).toFixed(2)}}₺
                  </div>
                </div>
                <button type="submit" class="submit-button" :class="{'disabled': paymentLoading}">
                  {{i18nFormat(paymentLoading ? "LOADING" : "COSMETICS_CHECKOUT")}}
                </button>
              </form>
            </div>
          </div>
        </div>
        `,
        data() {
          return {
            reactive: cosmeticsData.reactive,
            inCheckout: false,
            paymentLoading: false,
            buyerData: {
              buyer_name: '',
              buyer_surname: '',
              buyer_mail: '',
              buyer_gsm_no: '',
              buyer_address: '',
              buyer_city: '',
              buyer_country: '',
              buyer_district: ''
            },
            countries,
            paymentPageUrl: ""
          }
        },
        mounted() {
          events.on("CosmeticsPaymentOk", this.paymentOk);
        },
        unmounted() {
          events.off("CosmeticsPaymentOk", this.paymentOk);
        },
        methods: {
          i18nFormat: i18n.format,
          paymentOk() {
            this.paymentPageUrl = "";
            this.inCheckout = false;
            reactive.cartItems.splice(0, reactive.cartItems.length);
            events.emit("CosmeticsSubPageChange", { name: "landing" });
          },
          goBack() {
            if (this.inCheckout) {
              this.inCheckout = false;
              return;
            }
            events.emit("CosmeticsSubPageChange", { name: "landing" });
          },
          checkout() {
            if (this.inCheckout) return;
            this.inCheckout = true;
          },
          async onCheckoutSubmit(e) {
            if (this.paymentPageUrl) {
              internal.openExternal(this.paymentPageUrl);
              return;
            }
            e.preventDefault();
            if (this.paymentLoading) return;
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
          }
        }
      }
    );
  }
}