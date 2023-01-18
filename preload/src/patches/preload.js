import { ipcRenderer } from "electron";
export function patchPreload() {
  const originalPreload = process.env.ORIGINAL_DISCORD_PRELOAD;
  if (originalPreload) {
    ipcRenderer.send("RegisterPreload", originalPreload);

    const originalKill = process.kill;
    process.kill = () => { };
    try {
      require(originalPreload);
    }
    catch (e) { console.error(e); }
    process.kill = originalKill;
  }
}