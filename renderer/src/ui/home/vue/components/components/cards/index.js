import installedExtensionCard from "./installed-extension-card/index.js";
import inventoryFeatureCard from "./inventory-feature-card/index.js";
import profileCard from "./profile-card/index.js";
import storeExtensionCard from "./store-extension-card/index.js"

export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    profileCard.load(vueApp);
    inventoryFeatureCard.load(vueApp);
    storeExtensionCard.load(vueApp);
    installedExtensionCard.load(vueApp);
  }
}