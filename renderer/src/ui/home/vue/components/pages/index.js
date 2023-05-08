import homePage from "./home-page/index.js"
import extensionsPage from "./extensions-page/index.js";
import settingsPage from "./settings-page/index.js";
import storePage from "./store-page/index.js";
import inventoryPage from "./inventory-page/index.js";
import cosmetics from "./cosmetics/index.js";

export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    inventoryPage.load(vueApp);
    homePage.load(vueApp);
    extensionsPage.load(vueApp);
    settingsPage.load(vueApp);
    storePage.load(vueApp);
    cosmetics.load(vueApp);
  }
}