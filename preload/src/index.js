import { contextBridge, ipcRenderer } from "electron";
import { patchDevTools } from "./patches/devtools.js";
import { patchWindowActions } from "./patches/window-actions.js";
import { patchPreload } from "./patches/preload.js";
import { patchWebpackChunk } from "./patches/webpack-chunk.js";

contextBridge.exposeInMainWorld(process.env.ACORD_PRELOAD_KEY, {
  require,
  process: {
    cwd: process.cwd(),
    kill: process.kill,
    platform: process.platform,
    version: process.version,
    versions: process.versions,
    env: (() => {
      let env = JSON.parse(JSON.stringify(process.env));
      delete env.ACORD_PRELOAD_KEY;
      return env;
    })()
  },
  isDevToolsOpen() {
    return ipcRenderer.sendSync("IsDevToolsOpen");
  }
});

patchWindowActions();
patchWebpackChunk();
patchDevTools();
patchPreload();

setInterval(() => {
  try {
    DiscordNative.processUtils.purgeMemory();
  } catch { };
}, 60000);