import events from "../api/events";
import common from "../api/modules/common";

let currentUserId = null;

const onCurrentUserChange = (e) => {
  if (e.user?.id === currentUserId) return;
  if (!currentUserId) {
    currentUserId = e.user?.id;
    return;
  }
  events.emit("CurrentUserChange", e);
};


setInterval(() => {
  if (common?.UserStore?.getCurrentUser) {
    onCurrentUserChange({ user: common.UserStore.getCurrentUser() });
  }
}, 1000);