import storeExtensionCard from "./store-extension-card/index.js";

export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    storeExtensionCard.load(vueApp);
  }
}