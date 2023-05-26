import storeCartPage from "./store-cart-page/index.js";
import storeLandingPage from "./store-landing-page/index.js"
import storeRouterPage from "./store-router-page/index.js";
import components from "./components/index.js";
import storeItemsPage from "./store-items-page/index.js";
import storeSinglePage from "./store-single-page/index.js";
import storePackPage from "./store-pack-page/index.js";


export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    storeLandingPage.load(vueApp);
    storeCartPage.load(vueApp);
    storeRouterPage.load(vueApp);
    storeItemsPage.load(vueApp);
    storeSinglePage.load(vueApp);
    storePackPage.load(vueApp);
    components.load(vueApp);
  }
}