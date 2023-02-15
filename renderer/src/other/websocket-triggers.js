import modules from "../api/modules/index.js";
import modals from "../api/ui/modals.jsx";
import notifications from "../api/ui/notifications.js";
import extensions from "../api/extensions/index.js";
import websocket from "../api/websocket/index.js";

websocket.set("InstallExtension", async ({ url } = {}) => {
  if (!url) return;

  await modules.native.window.setAlwaysOnTop(0, true);
  await new Promise(r => setTimeout(r, 250));
  await modules.native.window.setAlwaysOnTop(0, true);

  const success = await modals.show.confirmation(
    acord.i18n.format("IMPORT_EXTENSION"),
    acord.i18n.format("IMPORT_EXTENSION_DESCRIPTION", url)
  );

  if (!success) return;

  try {
    await extensions.load(url);
  } catch (err) {
    notifications.show.error(`${err}`, { timeout: 30000 });
  }
});