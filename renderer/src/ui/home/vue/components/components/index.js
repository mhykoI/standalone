import installedExtensionsPage from "../pages/installed-extensions-page/index.js"
import storeExtensionCard from "./store-extension-card/index.js";

export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    installedExtensionsPage.load(vueApp);
    storeExtensionCard.load(vueApp);
  }
}