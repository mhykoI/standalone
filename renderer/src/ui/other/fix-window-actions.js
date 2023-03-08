import events from "../../api/events";

const ipcRenderer = window["<PRELOAD_KEY>"].ipcRenderer;
export async function patchWindowActions() {
  while (true) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (document.querySelector('[class*="winButtonClose-"] ~ div ~ div')) break;
  }

  const closeButton = document.querySelector('[class*="winButtonClose-"]');
  const maximizeButton = document.querySelector('[class*="winButtonClose-"] ~ div');
  const minimizeButton = document.querySelector('[class*="winButtonClose-"] ~ div ~ div');

  closeButton.addEventListener("click", (e) => {
    ipcRenderer.send(e.ctrlKey ? "QuitApp" : "HideWindow");
  });

  maximizeButton.addEventListener("click", () => {
    ipcRenderer.send("ToggleMaximizeWindow");
  });

  minimizeButton.addEventListener("click", () => {
    ipcRenderer.send("ToggleMinimizeWindow");
  });
}

patchWindowActions();

events.on("MainWindowFullScreenExit", patchWindowActions);
events.on("CurrentUserChange", patchWindowActions);
events.on("LocaleChange", patchWindowActions);
