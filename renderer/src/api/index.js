import modules from './modules';
import dev from './dev';
import utils from './utils';
import extensions from './extensions';
import i18n from './i18n';
import storage from './storage';

utils.logger.debug(`PRELOAD_KEY: <PRELOAD_KEY>`);

export default {
  exposedAPI: {
    dev,
    utils,
    i18n,
    get storage() {
      if (!dev.enabled) throw new Error("Storage API can only be accessed when Dev mode is enabled!");
      return storage;
    },
    get modules() {
      if (!dev.enabled) throw new Error("Modules API can only be accessed when Dev mode is enabled!");
      return modules;
    },
    get extensions() {
      if (!dev.enabled) throw new Error("Extensions API can only be accessed when Dev mode is enabled!");
      return extensions;
    },
    get internal() {
      if (!dev.enabled) throw new Error("Internal API can only be accessed when Dev mode is enabled!");
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
    i18n,
    storage,
    internal: {
      process: globalThis["<PRELOAD_KEY>"].process,
      isDevToolsOpen: globalThis["<PRELOAD_KEY>"].isDevToolsOpen,
    }
  }
}