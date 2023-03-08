import events from "../api/events";
import common from "../api/modules/common";

let lastUserId = common?.UserStore?.getCurrentUser()?.id;
setInterval(() => {
  let userId = common?.UserStore?.getCurrentUser()?.id;
  if (!userId) return;
  if (userId !== lastUserId) {
    lastUserId = userId;
    events.emit("CurrentUserChange", { user: common.UserStore.getCurrentUser() });
  }
}, 1000);