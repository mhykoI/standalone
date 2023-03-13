import modules from "../api/modules/index.js";
import modals from "../api/ui/modals.jsx";
import notifications from "../api/ui/notifications.js";
import extensions from "../api/extensions/index.js";
import websocket from "../api/websocket/index.js";
import authentication from "../api/authentication/index.js";
import i18n from "../api/i18n/index.js";
import events from "../api/events/index.js";

websocket.set("InstallExtension", async ({ url } = {}) => {
  if (!url) return;

  await modules.native.window.setAlwaysOnTop(0, true);
  await new Promise(r => setTimeout(r, 250));
  await modules.native.window.setAlwaysOnTop(0, false);

  const success = await modals.show.confirmation(
    i18n.format("IMPORT_EXTENSION_MODAL_TITLE"),
    i18n.format("IMPORT_EXTENSION_MODAL_DESCRIPTION", url)
  );

  if (!success) return;

  try {
    await extensions.load(url);
  } catch (err) {
    notifications.show.error(`${err}`, { timeout: 30000 });
  }
});

websocket.set("AuthenticationCallback", async ({ acordToken, userId } = {}) => {
  if (!acordToken || !userId) return { ok: false };

  await modules.native.window.setAlwaysOnTop(0, true);
  await new Promise(r => setTimeout(r, 250));
  await modules.native.window.setAlwaysOnTop(0, false);

  if (modules.common.UserStore.getCurrentUser()?.id !== userId) return { ok: false, error: "userIdMismatch" };

  const store = await authentication.when();

  authentication.store.acordTokens[userId] = acordToken;
  notifications.show.success(i18n.format("AUTHENTICATION_CALLBACK_SUCCESS", userId));
  events.emit("AuthenticationSuccess", { userId, acordToken });

  return { ok: true };
});