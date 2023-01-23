import loadingAnimation from "./other/loading-animation";
import api from "./api";

loadingAnimation.show();
Object.defineProperty(window, "acord", {
  get() {
    return api.exposedAPI;
  }
});
window.global = window;

{
  // if (api.unexposedAPI.modules.common.UserStore.getCurrentUser()) {
  //   loadingAnimation.hide();
  // } else {
  //   function onEvent() {
  //     api.unexposedAPI.modules.common.FluxDispatcher.unsubscribe("CONNECTION_OPEN", onEvent);
  //     loadingAnimation.hide();
  //   }
  //   api.unexposedAPI.modules.common.FluxDispatcher.subscribe("CONNECTION_OPEN", onEvent);
  // }

  function onEvent() {
    api.unexposedAPI.modules.common.FluxDispatcher.unsubscribe("CONNECTION_OPEN", onEvent);
    loadingAnimation.hide();
  }
  api.unexposedAPI.modules.common.FluxDispatcher.subscribe("CONNECTION_OPEN", onEvent);
}
