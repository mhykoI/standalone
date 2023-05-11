import cosmeticsCartButton from "./cosmetics-cart-button/index.js";
import cosmeticsItemCard from "./cosmetics-item-card/index.js";
import cosmeticsOldPaymentCard from "./cosmetics-old-payment-card/index.js";
import cosmeticsPriceCard from "./cosmetics-price-card/index.js"

export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    cosmeticsPriceCard.load(vueApp);
    cosmeticsOldPaymentCard.load(vueApp);
    cosmeticsItemCard.load(vueApp);
    cosmeticsCartButton.load(vueApp);
  }
}