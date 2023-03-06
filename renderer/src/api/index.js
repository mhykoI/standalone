import modules from './modules';
import dev from './dev';
import utils from './utils';
import extensions from './extensions';
import i18n from './i18n';
import storage from './storage';
import events from './events';
import patcher from './patcher';
import internal from './internal';
import websocket from './websocket';
import dom from './dom';
import ui from './ui/index.js';
import shared from './shared/index.js';

// utils.logger.debug(`PRELOAD_KEY: <PRELOAD_KEY>`);

function devError(api) {
  return new Error(`The ${api} API can only be accessed when Dev mode is enabled!`);
}

export default {
  exposedAPI: {
    dev,
    get utils() {
      if (!dev.enabled) throw devError("Utils");
      return utils;
    },
    get i18n() {
      if (!dev.enabled) throw devError("i18n");
      return i18n;
    },
    get events() {
      if (!dev.enabled) throw devError("Events");
      return events;
    },
    get ui() {
      if (!dev.enabled) throw devError("UI");
      return ui;
    },
    get shared() {
      if (!dev.enabled) throw devError("Shared");
      return shared;
    },
    get dom() {
      if (!dev.enabled) throw devError("DOM");
      return dom;
    },
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
    },
    get websocket() {
      if (!dev.enabled) throw devError("Websocket");
      return websocket;
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
    websocket,
    shared,
    ui,
    dom
  }
}