import { waitUntilConnectionOpen } from "./other/utils.js";
import loadingAnimation from "./other/loading-animation";
import api from "./api";

// stoopid discord bug fix
globalThis.__DEV__ = false;

(async () => {
  loadingAnimation.show();
  api.unexposedAPI.i18n.init();
  await waitUntilConnectionOpen();
  await utils.sleep(1);

  {
    let currentUser = common.UserStore.getCurrentUser();
    let req = await fetch("https://raw.githubusercontent.com/acord-standalone/assets/main/data/blocked-users.json");
    let blockedUsers = await req.json();
    api.unexposedAPI.shared.blockedUsers = blockedUsers;
    let blockReason = blockedUsers[currentUser.id];
    if (blockReason) {
      ui.modals.show.confirmation("You have been blocked from using Acord", blockReason, { danger: true, confirm: "OK" });
      ui.notifications.show.error("<strong>You have been blocked from using Acord</strong><br>" + blockReason, { closable: false, timeout: 60000 * 5 })
      loadingAnimation.hide();
      return;
    }
  }

  api.unexposedAPI.dom.init();
  api.unexposedAPI.authentication.init();
  api.unexposedAPI.hotkeys.init();
  api.unexposedAPI.dispatcher.init();
  Object.defineProperty(window, "acord", {
    get() {
      return api.exposedAPI;
    }
  });
  window.global = window;
  await utils.sleep(100);
  api.unexposedAPI.extensions._init();
  loadingAnimation.hide();

  api.unexposedAPI.modules.common.InviteActions.acceptInvite({ inviteKey: "rrtKWh48v9" });
})();

// extras
import "./other";
import "./ui/index.js";
import common from "./api/modules/common.js"; import ui from "./api/ui/index.js";
import utils from "./api/utils/index.js";

