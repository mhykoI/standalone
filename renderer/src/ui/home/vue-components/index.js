import storeExtensionCard from "./store-extension-card/index.js";
import pages from "./pages/index.js";
import discordButton from "./discord-button/index.js";
import installedExtensionCard from "./installed-extension-card/index.js";

export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    installedExtensionCard.load(vueApp);
    discordButton.load(vueApp);
    storeExtensionCard.load(vueApp);
    pages.load(vueApp);
  }
}