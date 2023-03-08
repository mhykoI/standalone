import modules from "../api/modules/index.js";
import i18n from "../api/i18n/index.js";

let isConnectionOpen = false;

export function waitUntilConnectionOpen() {
  return new Promise(async (resolve) => {
    if (isConnectionOpen) return resolve(true);
    function onEvent() {
      modules.common.FluxDispatcher.unsubscribe("CONNECTION_OPEN", onEvent);
      isConnectionOpen = true;
      resolve(true);
      console.log("Connection opened");
    }
    while (!modules?.common?.FluxDispatcher) {
      await new Promise((r) => setTimeout(r, 100));
    }
    modules.common.FluxDispatcher.subscribe("CONNECTION_OPEN", onEvent);
  });
}
