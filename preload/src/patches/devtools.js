import { ipcRenderer } from "electron";

export function patchDevTools() {
  window.addEventListener("keyup", (e) => {
    if (e.code === "F12" || (e.code === "KeyI" && (e.ctrlKey || e.altKey) && e.shiftKey)) {
      ipcRenderer.send("ToggleDevTools");
    }
  })
}