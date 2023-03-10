import { waitUntilConnectionOpen } from "../../other/utils.js";
import common from "../modules/common.js";
import events from "../events/index.js";
import { createPersistNest } from "./createPersistNest.js";

let authStore;

export default {
  async when() {
    if (authStore) return authStore;
    while (!authStore) await new Promise(r => setTimeout(r, 100));
    return authStore;
  },
  get is() {
    return !!authStore;
  },
  get token() {
    let currentUserId = common.UserStore.getCurrentUser()?.id;
    if (!currentUserId) return null;
    return authStore?.ghost?.acordTokens?.[currentUserId] ?? null;
  },
  get store() {
    return authStore;
  }
};

async function checkTokens() {
  await Promise.all(
    Object.entries(authStore.ghost.acordTokens ?? {}).map(async ([id, token]) => {
      let res = await (await fetch(`https://api.acord.app/auth/exchange?acordToken=${token}`)).json();
      if (res.data.id !== id) {
        delete authStore.store.acordTokens[id];
      }
    })
  );
  await new Promise(r => setTimeout(r, 1));
  const userId = common.UserStore.getCurrentUser()?.id;
  const acordToken = authStore.ghost?.acordTokens?.[userId];
  if (userId && acordToken) {
    events.emit("AuthenticationSuccess", { userId, acordToken });
  } else {
    events.emit("AuthenticationFailure");
  }
}

(async () => {
  authStore = await createPersistNest("Authentication");
})();

waitUntilConnectionOpen().then(checkTokens);
events.on("CurrentUserChange", checkTokens);