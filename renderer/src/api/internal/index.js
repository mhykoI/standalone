export default {
  process: globalThis["<<PRELOAD_KEY>>"].process,
  isDevToolsOpen: globalThis["<<PRELOAD_KEY>>"].isDevToolsOpen,
  openExternal(url) {
    globalThis["<<PRELOAD_KEY>>"].ipcRenderer.send("OpenExternal", url);
  },
  showDialog(...args) {
    return globalThis["<<PRELOAD_KEY>>"].ipcRenderer.invoke("ShowDialog", ...args);
  },
  showWindow(...args) {
    return globalThis["<<PRELOAD_KEY>>"].ipcRenderer.invoke("ShowWindow", ...args);
  }
}

