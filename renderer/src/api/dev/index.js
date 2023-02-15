let devModeEnabled = false;

export default {
  get enabled() {
    return devModeEnabled;
  },
  set enabled(value) {
    if (!globalThis["<PRELOAD_KEY>"].isDevToolsOpen()) throw new Error("Dev mode status can only be modified when DevTools is open!");
    devModeEnabled = value;
  }
}

// TODO: add live development mode