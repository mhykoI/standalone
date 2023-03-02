import extensions from "../extensions/index.js";
import logger from "../utils/logger.js";
import i18n from "../i18n/index.js";
import websocket from "../websocket/index.js";

let devModeEnabled = false;

let isLoading = false;

let loaded;
let installed;

const extension = {
  get loaded() { return loaded; },
  get installed() { return installed; },
  unload() {
    if (!loaded) return false;
    loaded.api.extension.subscriptions.forEach((f) => typeof f === "function" && f());
    loaded.api.extension.events.emit("unload");
    loaded.evaluated?.unload?.();
    loaded = null;
    installed = null;
    return true;
  },
  async load(source, manifest) {
    if (!source || !manifest) throw new Error(`Source and manifest are required to load an extension!`);
    if (loaded) return false;
    if (isLoading) return false;
    isLoading = true;
    try {
      let api = await extensions.buildAPI(manifest, `Extension;Persist;Development`);
      let evaluated = extensions.evaluate(source, api);
      evaluated?.load?.();
      loaded = {
        evaluated,
        api
      };
      installed = {
        manifest
      };
    } catch (err) {
      logger.error(`Unable to load development extension.`, i18n.localize(manifest.about.name), err);
      return false;
    }
    isLoading = false;
    return true;
  }
}

const out = {
  get enabled() {
    return devModeEnabled;
  },
  set enabled(value) {
    if (!globalThis["<PRELOAD_KEY>"].isDevToolsOpen()) throw new Error("Dev mode status can only be modified when DevTools is open!");
    devModeEnabled = value;
  },
  get extension() {
    if (!devModeEnabled) throw new Error("Dev mode is not enabled!");
    return extension;
  }
}

export default out;

let isProcessing = false;
websocket.set(
  "UpdateDevelopmentExtension",
  async ({ source, manifest } = {}) => {
    if (!devModeEnabled)
      return logger.warn(`Development extension was sent before dev mode was enabled.`);

    if (!source || !manifest)
      return logger.warn(`Development extension was sent without source or manifest.`);

    if (isProcessing)
      return logger.warn(`Development extension was sent while extension was already being processed.`);

    isProcessing = true;
    extension.unload();
    await new Promise((r) => setTimeout(r, 1));
    let success = await extension.load(source, manifest);
    if (success) logger.info(`Development extension is loaded!(${i18n.localize(manifest.about.name)})`);
    isProcessing = false;
  }
)