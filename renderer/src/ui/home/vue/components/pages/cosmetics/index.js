import cosmeticsCartPage from "./cosmetics-cart-page/index.js";
import cosmeticsLandingPage from "./cosmetics-landing-page/index.js"
import cosmeticsRouterPage from "./cosmetics-router-page/index.js";
import components from "./components/index.js";
import cosmeticsItemsPage from "./cosmetics-items-page/index.js";


export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    cosmeticsLandingPage.load(vueApp);
    cosmeticsCartPage.load(vueApp);
    cosmeticsRouterPage.load(vueApp);
    cosmeticsItemsPage.load(vueApp);
    components.load(vueApp);
  }
}