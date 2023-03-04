import { waitUntilConnectionOpen } from "./other/utils.js";
import loadingAnimation from "./other/loading-animation";
import api from "./api";

Object.defineProperty(window, "acord", {
  get() {
    return api.exposedAPI;
  }
});
window.global = window;

(async () => {
  loadingAnimation.show();
  await waitUntilConnectionOpen();
  loadingAnimation.hide();
})();

// extras
import "./other/document-title-change.js";
import "./other/websocket-triggers.js";
import "./ui/index.js";