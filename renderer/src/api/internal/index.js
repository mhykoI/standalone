export default {
  process: globalThis["<PRELOAD_KEY>"].process,
  isDevToolsOpen: globalThis["<PRELOAD_KEY>"].isDevToolsOpen,
  openExternal(url) {
    globalThis["<PRELOAD_KEY>"].ipcRenderer.send("OpenExternal", url);
  }
}

