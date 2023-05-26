import storeCartButton from "./store-cart-button/index.js";
import storeItemCard from "./store-item-card/index.js";
import storeOldPaymentCard from "./store-old-payment-card/index.js";
import storePriceCard from "./store-price-card/index.js"

export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    storePriceCard.load(vueApp);
    storeOldPaymentCard.load(vueApp);
    storeItemCard.load(vueApp);
    storeCartButton.load(vueApp);
  }
}