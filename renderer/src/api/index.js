import modules from './modules';
import dev from './dev';
import utils from './utils';
import extensions from './extensions';
import i18n from './i18n';
import storage from './storage';
import events from './events';
import patcher from './patcher';
import internal from './internal';
import ui from './ui/index.js';

utils.logger.debug(`PRELOAD_KEY: <PRELOAD_KEY>`);

function devError(api) {
  return new Error(`The ${api} API can only be accessed when Dev mode is enabled!`);
}

export default {
  exposedAPI: {
    dev,
    utils,
    i18n,
    events,
    ui,
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
      return internal;
    }
  },
  unexposedAPI: {
    dev,
    modules,
    utils,
    extensions,
    i18n,
    storage,
    events,
    patcher,
    internal,
    ui
  }
}