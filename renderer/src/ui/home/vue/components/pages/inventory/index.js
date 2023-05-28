import components from "./components/index.js";
import inventoryPage from "./inventory-page/index.js"

export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    inventoryPage.load(vueApp);
    components.load(vueApp);
  }
}