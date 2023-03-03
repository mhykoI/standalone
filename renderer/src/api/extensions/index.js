import { BasicEventEmitter } from "../../lib/BasicEventEmitter.js";
import dev from "../dev/index.js";
import i18n from "../i18n/index.js";
import modules from "../modules/index.js";
import storage from "../storage/index.js";
import { buildExtensionI18N } from "./i18n.js";
import * as nests from "nests";
import events from "../events/index.js";
import patcher from "../patcher/index.js";
import findInTree from "../utils/raw/find-in-tree.js";

/**
 * @param {{ modules: { node: { name: string, reason: string }[], common: { name: string, reason: string }[], custom: { reason: string, name: string, lazy: boolean, finder: { filter: { export: boolean, in: "properties" | "strings" | "prototypes", by: [string[], string[]?] }, path: { before: string | string[], after: string | string[] }, map: { [k: string]: string[] } } }[], mode?: "development" | "production" }, about: { name: string | { [k: string]: string }, description: string | { [k: string]: string }, slug: string } }} manifest 
 */
async function buildPluginAPI(manifest, persistKey) {
  const devMode = dev.enabled || manifest?.modules?.mode === "development";
  const persist = await storage.createPersistNest(persistKey);
  const out = {
    modules: {
      __cache__: {
        common: {},
        node: {},
        custom: {},
        customLazy: {}
      },
      require(name) {
        if (!devMode) {
          if (typeof out.modules.__cache__.node[name] !== "undefined") return out.modules.__cache__.node[name];
          if (manifest?.modules?.node?.some?.(i => i.name === name)) return out.modules.__cache__.node[name] = modules.require(name);
        } else {
          return modules.require(name);
        }
        return null;
      },
      common: new Proxy({}, {
        get(_, prop) {
          if (!devMode) {
            if (typeof out.modules.__cache__.common[prop] !== "undefined") return out.modules.__cache__.common[prop];
            if (manifest?.modules?.common?.some?.(i => i.name === prop)) return out.modules.__cache__.common[prop] = modules.common[prop];
          } else {
            return modules.common[prop];
          }
          return null;
        },
      }),
      custom: new Proxy({}, {
        get(_, prop) {
          if (typeof out.modules.__cache__.custom[prop] !== "undefined") return out.modules.__cache__.custom[prop];
          let data = manifest?.modules?.custom?.some?.(i => i.name === prop);
          if (!data) return null;
          if (data.lazy) {
            let prom = new Promise(async (resolve, reject) => {
              let r = await modules.webpack.lazyFindByFinder(data.finder);
              out.modules.__cache__.customLazy[prop] = r;
              resolve(r);
            });
            out.modules.__cache__.custom[prop] = {
              get() {
                return prom;
              },
              get value() {
                return out.modules.__cache__.customLazy[prop];
              }
            };
          } else {
            let value = modules.webpack.findByFinder(data.finder);
            try {
              if (typeof value?.value !== "undefined") {
                out.modules.__cache__.custom[prop] = value ? Object.assign(value, { value, get() { return value } }) : null;
              } else {
                out.modules.__cache__.custom[prop] = value;
              }
            } catch {
              out.modules.__cache__.custom[prop] = value ? { value, get() { return value } } : null;
            }
          }
          return out.modules.__cache__.custom[prop];
        }
      }),
    },
    i18n,
    extension: {
      config: JSON.parse(JSON.stringify(manifest)),
      persist,
      i18n: await buildExtensionI18N(manifest),
      events: new BasicEventEmitter(),
      subscriptions: []
    }
  };

  return out;
}

function showConfirmationModal() {

}

const out = {
  __cache__: {
    initialized: false,
    loaded: nests.make({})
  },
  storage: {
    /** @type {nests.Nest} */
    installed: {}
  },
  async init() {
    if (out.__cache__.initialized) return;
    out.__cache__.initialized = true;
    out.storage.installed = await storage.createPersistNest("Extensions;Installed");
  },
  /**
   * @param {string} url 
   */
  async install(url, defaultConfig = {}) {
    if (!out.__cache__.initialized) await out.init();
    if (url.endsWith("/")) url = url.slice(0, -1);
    if (out.storage.installed.ghost[url]) throw new Error(`"${url}" extension is already installed.`);

    let metaResp = await fetch(`${url}/metadata.json`);
    if (metaResp.status !== 200) throw new Error(`"${url}" extension metadata is not responded with 200 status code.`);
    let metadata = await metaResp.json();

    let readmeResp = await fetch(`${url}/readme.md`);
    let readme = readmeResp.status === 200 ? await readmeResp.text() : null;

    // TODO: Show modal for user to accept the extension (terms, privacy, etc.)
    showConfirmationModal({
      metadata,
      readme,
      config: {
        autoUpdate: true,
        enabled: true,
        order: 0,
        ...defaultConfig
      }
    });

    let sourceResp = await fetch(`${url}/source.js`);
    if (sourceResp.status !== 200) throw new Error(`"${url}" extension source is not responded with 200 status code.`);
    let source = await sourceResp.text();

    out.storage.installed.store[url] = {
      metadata,
      source,
      readme,
      config: {
        autoUpdate: true,
        enabled: true,
        order: 0,
        ...defaultConfig
      },
      extra: {
        lastUpdatedAt: Date.now()
      }
    };

    await out.load(url);
  },
  async update(url) {
    if (!out.__cache__.initialized) await out.init();
    if (!out.storage.installed.ghost[url]) throw new Error(`"${url}" extension is not installed.`);
    if (out.__cache__.loaded.ghost[url]) throw new Error(`"${url}" extension is loaded. Please unload it first.`);

    let data = out.storage.installed.ghost[url];

    let metaResp = await fetch(`${url}/metadata.json`);
    if (metaResp.status !== 200) throw new Error(`"${url}" extension metadata is not responded with 200 status code.`);
    let metadata = await metaResp.json();

    if (data.metadata.hash === metadata.hash) return false;

    let readmeResp = await fetch(`${url}/readme.md`);
    let readme = readmeResp.status === 200 ? await readmeResp.text() : null;

    let sourceResp = await fetch(`${url}/source.js`);
    if (sourceResp.status !== 200) throw new Error(`"${url}" extension source is not responded with 200 status code.`);
    let source = await sourceResp.text();

    ut.storage.installed.store[url] = {
      metadata,
      source,
      readme,
      config: data.config,
      extra: {
        lastUpdatedAt: Date.now()
      }
    };

    return true;
  },
  async uninstall(url) {
    if (!out.__cache__.initialized) await out.init();
    if (!out.storage.installed.ghost[url]) throw new Error(`"${url}" extension is not installed.`);

    delete out.storage.installed.store[url];

    try {
      await out.unload(url);
    } catch { }
  },
  async load(url) {
    if (!out.__cache__.initialized) await out.init();
    if (!out.storage.installed.ghost[url]) throw new Error(`"${url}" extension is not installed.`);
    let data = out.storage.installed.ghost[url];

    if (out.__cache__.loaded.ghost[url]) throw new Error(`"${url}" extension is already loaded.`);

    await out.loader.load(data);
  },
  async unload(url) {
    if (!out.__cache__.initialized) await out.init();
    if (!out.storage.installed.ghost[url]) throw new Error(`"${url}" extension is not installed.`);

    if (!out.__cache__.loaded.ghost[url]) throw new Error(`"${url}" extension is not loaded.`);

    await out.loader.unload(url);
  },
  evaluate(source, api) {
    const $acord = api;
    return eval(source);
  },
  async loadAll() {
    if (!out.__cache__.initialized) await out.init();
    return Promise.all(Object.entries(out.storage.installed.ghost).sort(([, a], [, b]) => b.config.order - a.config.order).map(([url]) => out.load(url)));
  },
  async unloadAll() {
    if (!out.__cache__.initialized) await out.init();
    return Promise.all(Object.keys(out.__cache__.loaded.ghost).map(url => out.unload(url)));
  },
  get(url) {
    return {
      loaded: out.__cache__.loaded.ghost[url],
      installed: out.storage.installed.ghost[url]
    };
  },
  loader: {
    async load(id, data) {
      if (data.metadata.type === 'plugin') {
        let api = await buildPluginAPI(data.metadata, `Extension;Persist;${id}`);
        findInTree(data.metadata.config, (i) => i.id && i.hasOwnProperty("default"), { all: true }).forEach(
          (i) => {
            api.extension.persist.store.settings[i.id] ??= i.default;
            if (i.hasOwnProperty("value")) i.value ??= api.extension.persist.store.settings[i.id];
          }
        );

        let evaluated = out.evaluate(data.source, api);

        await evaluated?.load?.();
        const offConfigListener =
          events.on("extension-config-interaction", (data) => {
            if (data.extension !== id) return;
            if (data.item.id) {
              api.extension.persist.store.settings[data.item.id] = data.item.value;
            }
            evaluated?.config?.({
              item: data.item,
              data: data.data,
              getItem(itemId) {
                return findInTree(data.manifest.config, (i) => i.id === itemId);
              },
              getItems() {
                return findInTree(data.manifest.config, (i) => i.id, { all: true });
              },
              save() {
                if (!data.item.id) return false;
                api.extension.persist.store.settings[data.item.id] = data.item.value;
                return true;
              }
            });
          });
        function unload() {
          offConfigListener();
          api.extension.subscriptions.forEach(i => typeof i === "function" && i());
          api.extension.events.emit("unload");
          evaluated?.unload?.();
          Object.values(api.persist.listeners).forEach(i => i.clear());
        }
        return { evaluated, api, unload };
      } else if (data.metadata.type === 'theme') {
        let evaluated = out.evaluate(data.source, null);
        const persist = await storage.createPersistNest(`Extension;Persist;${id}`);
        if (persist.ghost.settings === undefined) persist.store.settings = {};
        findInTree(data.metadata.config, (i) => i.id && i.hasOwnProperty("default"), { all: true }).forEach(
          (i) => {
            persist.store.settings[i.id] ??= i.default;
            if (i.hasOwnProperty("value")) i.value ??= persist.store.settings[i.id];
          }
        );
        let cssText = evaluated();
        let injectedRes = patcher.injectCSS(cssText, persist.ghost.settings);

        const offConfigListener =
          events.on("extension-config-interaction", (data) => {
            if (data.extension !== id) return;
            if (!data.config.id) return;
            persist.store.settings[data.config.id] = data.data.value;
            injectedRes(persist.ghost.settings);
          });
        function unload() {
          offConfigListener();
          injectedRes();
          Object.values(persist.listeners).forEach(i => i.clear());
        }

        out.__cache__.loaded.store[id] = { evaluated, unload };
        return { evaluated, unload };
      }
    },
    unload(id) {
      out.__cache__.loaded.store[id]?.unload?.();
      delete out.__cache__.loaded.store[id];
    }
  }
};

export default out;