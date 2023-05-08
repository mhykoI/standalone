import cosmeticsItemsPage from "./cosmetics-items-page/index.js";
import cosmeticsLandingPage from "./cosmetics-landing-page/index.js"
import cosmeticsRouterPage from "./cosmetics-router-page/index.js";

export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    cosmeticsLandingPage.load(vueApp);
    cosmeticsItemsPage.load(vueApp);
    cosmeticsRouterPage.load(vueApp);
  }
}