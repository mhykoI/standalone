import homePage from "./home-page.js"
import installedExtensionsPage from "./installed-extensions-page.js";
import settingsPage from "./settings-page.js";
import storePage from "./store-page.js";

export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    homePage.load(vueApp);
    installedExtensionsPage.load(vueApp);
    settingsPage.load(vueApp);
    storePage.load(vueApp);
  }
}