import storeExtensionCard from "./store-extension-card/index.js";
import pages from "./pages/index.js";

export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    storeExtensionCard.load(vueApp);
    pages.load(vueApp);
  }
}