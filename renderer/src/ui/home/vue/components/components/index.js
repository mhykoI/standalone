
import installedExtensionCard from "./installed-extension-card/index.js";
import storeExtensionCard from "./store-extension-card/index.js";

export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    installedExtensionCard.load(vueApp);
    storeExtensionCard.load(vueApp);
  }
}