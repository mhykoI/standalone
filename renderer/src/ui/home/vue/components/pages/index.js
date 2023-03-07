import homePage from "./home-page/index.js"
import extensionsPage from "./extensions-page/index.js";
import settingsPage from "./settings-page/index.js";
import storePage from "./store-page/index.js";

export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    homePage.load(vueApp);
    extensionsPage.load(vueApp);
    settingsPage.load(vueApp);
    storePage.load(vueApp);
  }
}