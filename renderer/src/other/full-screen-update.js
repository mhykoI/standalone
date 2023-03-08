import events from "../api/events";
import common from "../api/modules/common";

function onFullscreenChange(e) {
  if (e.windowId !== "window-1") return;
  if (e.isElementFullscreen) events.emit("MainWindowFullScreenEnter", e);
  else events.emit("MainWindowFullScreenExit", e);
}

common.FluxDispatcher.subscribe("WINDOW_FULLSCREEN_CHANGE", onFullscreenChange);