
import installedExtensionCard from "./installed-extension-card/index.js";
import inventory from "./inventory/index.js";
import profileCard from "./profile-card/index.js";
import exploreExtensionCard from "./explore-extension-card/index.js"

export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    profileCard.load(vueApp);
    exploreExtensionCard.load(vueApp);
    installedExtensionCard.load(vueApp);
    inventory.load(vueApp);
  }
}