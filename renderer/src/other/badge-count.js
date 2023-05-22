import modules from "../api/modules";
import { waitUntilConnectionOpen } from "./utils.js";

function update() {
  let unreadPrivateCount = modules.common.PrivateChannelReadStateStore.__getLocalVars().unreadPrivateChannelIds.length;
  let unreadGuildCount = modules.common.GuildReadStateStore.__getLocalVars().unreadGuilds.size;
  let count = unreadPrivateCount || (unreadGuildCount && undefined);
  modules.native.app.setBadgeCount(count);
}

waitUntilConnectionOpen().then(() => {
  update();
  setInterval(update, 1000);
});