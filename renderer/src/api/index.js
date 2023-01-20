import modules from './modules';
import dev from './dev';
import utils from './utils';

utils.logger.debug(`PRELOAD_KEY: <PRELOAD_KEY>`);

export default {
  exposedAPI: {
    dev,
    utils,
    get modules() {
      if (!dev.enabled) throw new Error("Modules API can only be accessed when Dev mode is enabled!");
      return modules;
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
    internal: {
      process: globalThis["<PRELOAD_KEY>"].process,
      isDevToolsOpen: globalThis["<PRELOAD_KEY>"].isDevToolsOpen,
    }
  }
}