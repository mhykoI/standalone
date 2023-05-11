import events from "../../../../../../../../api/events/index.js";
import patcher from "../../../../../../../../api/patcher/index.js";
import cosmeticsData from "../../cosmetics-data.js";
import cssText from "./style.scss";
patcher.injectCSS(cssText);

export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    vueApp.component(
      "cosmetics-cart-button",
      {
        template: `
        <div class="acord--cosmetics-cart-button" @click="go">
          <div v-if="reactive.cartItems.length" class="count">{{reactive.cartItems.length}}</div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12.0049 2C15.3186 2 18.0049 4.68629 18.0049 8V9H22.0049V11H20.8379L20.0813 20.083C20.0381 20.6013 19.6048 21 19.0847 21H4.92502C4.40493 21 3.97166 20.6013 3.92847 20.083L3.17088 11H2.00488V9H6.00488V8C6.00488 4.68629 8.69117 2 12.0049 2ZM18.8309 11H5.17788L5.84488 19H18.1639L18.8309 11ZM13.0049 13V17H11.0049V13H13.0049ZM9.00488 13V17H7.00488V13H9.00488ZM17.0049 13V17H15.0049V13H17.0049ZM12.0049 4C9.86269 4 8.1138 5.68397 8.00978 7.80036L8.00488 8V9H16.0049V8C16.0049 5.8578 14.3209 4.10892 12.2045 4.0049L12.0049 4Z"></path>
          </svg>
        </div>
        `,
        data() {
          return {
            reactive: cosmeticsData.reactive
          }
        },
        methods: {
          go() {
            events.emit("CosmeticsSubPageChange", { name: 'cart', data: {}, hideNav: true });
          }
        }
      }
    );
  }
}