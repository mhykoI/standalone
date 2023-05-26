import storeCartPage from "./store-cart-page/index.js";
import storeLandingPage from "./store-landing-page/index.js"
import storeRouterPage from "./store-router-page/index.js";
import components from "./components/index.js";
import storeItemsPage from "./store-items-page/index.js";


export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    storeLandingPage.load(vueApp);
    storeCartPage.load(vueApp);
    storeRouterPage.load(vueApp);
    storeItemsPage.load(vueApp);
    components.load(vueApp);
  }
}