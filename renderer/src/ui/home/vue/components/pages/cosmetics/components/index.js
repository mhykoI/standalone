import cosmeticsPriceCard from "./cosmetics-price-card/index.js"

export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    cosmeticsPriceCard.load(vueApp);
  }
}