import pages from "./pages/index.js";
import components from "./components/index.js";

export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    components.load(vueApp);
    pages.load(vueApp);
  }
}