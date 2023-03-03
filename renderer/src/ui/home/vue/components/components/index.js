
import configComponents from "./config/index.js";
import cardComponents from "./cards/index.js";

export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    configComponents.load(vueApp);
    cardComponents.load(vueApp);
  }
}