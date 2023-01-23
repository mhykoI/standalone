import modules from './modules';
import dev from './dev';
import utils from './utils';
import extensions from './extensions';
import out from './i18n';
import storage from './storage';
import events from './events';
import patcher from './patcher/index.js';

utils.logger.debug(`PRELOAD_KEY: <PRELOAD_KEY>`);

function devError(api) {
  return new Error(`The ${api} API can only be accessed when Dev mode is enabled!`);
}

export default {
  exposedAPI: {
    dev,
    utils,
    i18n: out,
    events,
    get patcher() {
      if (!dev.enabled) throw devError("Patcher");
      return patcher;
    },
    get storage() {
      if (!dev.enabled) throw devError("Storage");
      return storage;
    },
    get modules() {
      if (!dev.enabled) throw devError("Modules");
      return modules;
    },
    get extensions() {
      if (!dev.enabled) throw devError("Extensions");
      return extensions;
    },
    get internal() {
      if (!dev.enabled) throw devError("Internal");
      return {
        process: globalThis["<PRELOAD_KEY>"].process,
        isDevToolsOpen: globalThis["<PRELOAD_KEY>"].isDevToolsOpen,
      }
    }
  },
  unexposedAPI: {
    dev,
    modules,
    utils,
    extensions,
    i18n: out,
    storage,
    events,
    patcher,
    internal: {
      process: globalThis["<PRELOAD_KEY>"].process,
      isDevToolsOpen: globalThis["<PRELOAD_KEY>"].isDevToolsOpen,
    }
  }
}