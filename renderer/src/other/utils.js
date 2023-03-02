import modules from "../api/modules/index.js";
import i18n from "../api/i18n/index.js";

let isConnectionOpen = false;

export function waitUntilConnectionOpen() {
  return new Promise((resolve) => {
    if (isConnectionOpen) return resolve(true);
    function onEvent() {
      modules.common.FluxDispatcher.unsubscribe("CONNECTION_OPEN", onEvent);
      isConnectionOpen = true;
      resolve(true);
    }
    modules.common.FluxDispatcher.subscribe("CONNECTION_OPEN", onEvent);
  });
}
