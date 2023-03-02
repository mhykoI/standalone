import { ipcRenderer } from "electron";

export async function patchWindowActions() {
  while (true) {
    if (document.querySelector('[class*="winButtonClose-"] ~ div ~ div')) break;
    await new Promise((resolve) => setTimeout(resolve, 1000));
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