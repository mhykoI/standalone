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
import websocket from "../websocket/index.js";
import ui from "../ui/index.js";
import utils from "../utils/index.js";
import dom from "../dom/index.js";
import shared from "../shared/index.js";
import { waitUntilConnectionOpen } from "../../other/utils.js";
import logger from "../utils/logger.js";

/**
 * @param {{ mode?: "development" | "production", api: { patcher?: string | boolean, storage?: string | boolean, i18n?: string | boolean, events?: string | boolean, utils?: string | boolean, dom?: string | boolean, websocket?: string | boolean, ui?: string | boolean, dev?: string | boolean, modules: { node: { name: string, reason: string }[], common: { name: string, reason: string }[], custom: { reason: string, name: string, lazy: boolean, finder: { filter: { export: boolean, in: "properties" | "strings" | "prototypes", by: [string[], string[]?] }, path: { before: string | string[], after: string | string[] }, map: { [k: string]: string[] } } }[] } }, about: { name: string | { [k: string]: string }, description: string | { [k: string]: string }, slug: string } }} manifest 
 */
async function buildPluginAPI(manifest, persistKey) {
  const devMode = manifest?.mode === "development";
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
          if (manifest?.api?.modules?.node?.some?.(i => i.name === name)) return out.modules.__cache__.node[name] = modules.require(name);
        } else {
          return modules.require(name);
        }
        return null;
      },
      common: new Proxy({}, {
        get(_, prop) {
          if (!devMode) {
            if (typeof out.modules.__cache__.common[prop] !== "undefined") return out.modules.__cache__.common[prop];
            if (manifest?.api?.modules?.common?.some?.(i => i.name === prop)) return out.modules.__cache__.common[prop] = modules.common[prop];
          } else {
            return modules.common[prop];
          }
          return null;
        },
      }),
      custom: new Proxy({}, {
        get(_, prop) {
          if (typeof out.modules.__cache__.custom[prop] !== "undefined") return out.modules.__cache__.custom[prop];
          let data = manifest?.api?.modules?.custom?.find?.(i => i.name === prop);
          if (!data?.finder) return null;
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
      get native() {
        if (manifest?.modules?.native || devMode) return modules.native;
        return null;
      },
    },
    extension: {
      manifest,
      persist,
      i18n: await buildExtensionI18N(manifest),
      events: new BasicEventEmitter(),
      subscriptions: []
    },
    get shared() {
      if (manifest?.api?.shared || devMode) return shared;
      return null;
    },
    get i18n() {
      if (manifest?.api?.i18n || devMode) return i18n;
      return null;
    },
    get patcher() {
      if (manifest?.api?.patcher || devMode) return patcher;
      return null;
    },
    get events() {
      if (manifest?.api?.events || devMode) return events;
      return null;
    },
    get storage() {
      if (manifest?.api?.storage || devMode) return storage;
      return null;
    },
    get websocket() {
      if (manifest?.api?.websocket || devMode) return websocket;
      return null;
    },
    get ui() {
      if (manifest?.api?.ui || devMode) return ui;
      return null;
    },
    get utils() {
      if (manifest?.api?.utils || devMode) return utils;
      return null;
    },
    get dom() {
      if (manifest?.api?.dom || devMode) return dom;
      return null;
    },
    get dev() {
      if (manifest?.api?.dev || devMode) return dev;
      return null;
    }
  };

  return out;
}

function showConfirmationModal() {

}

const out = {
  __cache__: {
    initialized: false,
    loaded: nests.make({}),
    config: {}
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

    let metaResp = await fetch(`${url}/manifest.json`, { cache: "no-store" });
    if (metaResp.status !== 200) throw new Error(`"${url}" extension manifest is not responded with 200 status code.`);
    let manifest = await metaResp.json();

    let readmeResp = await fetch(`${url}/readme.md`, { cache: "no-store" });
    let readme = readmeResp.status === 200 ? await readmeResp.text() : null;

    // TODO: Show modal for user to accept the extension (terms, privacy, etc.)
    await showConfirmationModal({
      manifest,
      readme,
      config: {
        autoUpdate: true,
        enabled: true,
        order: 0,
        ...defaultConfig
      }
    });

    let sourceResp = await fetch(`${url}/source.js`, { cache: "no-store" });
    if (sourceResp.status !== 200) throw new Error(`"${url}" extension source is not responded with 200 status code.`);
    let source = await sourceResp.text();

    out.storage.installed.store[url] = {
      manifest,
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
    if (url.endsWith("/")) url = url.slice(0, -1);
    if (!out.storage.installed.ghost[url]) throw new Error(`"${url}" extension is not installed.`);

    let data = out.storage.installed.ghost[url];

    let metaResp = await fetch(`${url}/manifest.json`, { cache: "no-store" });
    if (metaResp.status !== 200) throw new Error(`"${url}" extension manifest is not responded with 200 status code.`);
    let manifest = JSON.parse(await metaResp.text());

    if (data.manifest.hash === manifest.hash) return false;

    let readmeResp = await fetch(`${url}/readme.md`, { cache: "no-store" });
    let readme = readmeResp.status === 200 ? await readmeResp.text() : null;

    let sourceResp = await fetch(`${url}/source.js`, { cache: "no-store" });
    if (sourceResp.status !== 200) throw new Error(`"${url}" extension source is not responded with 200 status code.`);
    let source = await sourceResp.text();

    let loadedBefore = false;
    if (out.__cache__.loaded.ghost[url]) {
      loadedBefore = true;
      await out.unload(url);
    }

    out.storage.installed.store[url] = {
      manifest,
      source,
      readme,
      config: data.config,
      extra: {
        lastUpdatedAt: Date.now()
      }
    };

    console.log("Extension updated:", url, { loadedBefore });

    if (loadedBefore) {
      await new Promise(resolve => setTimeout(resolve, 1));
      await out.load(url);
    }

    return true;
  },
  async uninstall(url) {
    if (!out.__cache__.initialized) await out.init();
    if (url.endsWith("/")) url = url.slice(0, -1);
    if (!out.storage.installed.ghost[url]) throw new Error(`"${url}" extension is not installed.`);

    delete out.storage.installed.store[url];

    try {
      await out.unload(url);
    } catch (err) {
      logger.error(err);
    }
  },
  async load(url) {
    if (!out.__cache__.initialized) await out.init();
    if (url.endsWith("/")) url = url.slice(0, -1);
    if (!out.storage.installed.ghost[url]) throw new Error(`"${url}" extension is not installed.`);
    let data = out.storage.installed.ghost[url];

    if (out.__cache__.loaded.ghost[url]) throw new Error(`"${url}" extension is already loaded.`);

    await out.loader.load(url, data);
  },
  async unload(url) {
    if (!out.__cache__.initialized) await out.init();
    if (url.endsWith("/")) url = url.slice(0, -1);
    if (!out.__cache__.loaded.ghost[url]) throw new Error(`"${url}" extension is not loaded.`);

    await out.loader.unload(url);
  },
  evaluate(source, api) {
    const $acord = api;
    return eval(source);
  },
  async loadAll() {
    if (!out.__cache__.initialized) await out.init();
    return Promise.all(Object.entries(out.storage.installed.ghost).sort(([, a], [, b]) => b.config.order - a.config.order).map(async ([url, d]) => {
      if (d.config.autoUpdate) await out.update(url);

      try {
        if (d.config.enabled) await out.load(url);
      } catch (e) {
        logger.error("Unable to load extension", url, e);
      }
    }));
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
      if (data.manifest.type === 'plugin') {
        let api = await buildPluginAPI(data.manifest, `Extension;Persist;${id}`);
        if (api.extension.persist.ghost.settings === undefined) api.extension.persist.store.settings = {};
        await ui.vue.ready.when();
        out.__cache__.config[id] = Vue.reactive(JSON.parse(JSON.stringify(data.manifest.config)));
        findInTree(out.__cache__.config[id], (i) => i.id, { all: true }).forEach(
          (i) => {
            api.extension.persist.store.settings[i.id] = api.extension.persist.ghost?.settings?.[i.id] ?? i.default;
            i.value = api.extension.persist.ghost?.settings?.[i.id];
          }
        );

        let evaluated = out.evaluate(data.source, api);
        await evaluated?.load?.();

        function onPersistUpdate(eventName, { path, value } = {}) {
          if (path[0] === "settings") {
            let item = findInTree(out.__cache__.config[id], (i) => i.id === path[1]);
            let val = eventName === "DELETE" ? null : value;
            if (item.inputType === "number") val = Number(val);
            if (item) item.value = val;
          }
        }
        api.extension.persist.on("UPDATE", onPersistUpdate);
        api.extension.persist.on("DELETE", onPersistUpdate);
        api.extension.persist.on("SET", onPersistUpdate);
        const offConfigListener =
          events.on("ExtensionConfigInteraction", (data) => {
            if (data.extension !== id) return;
            function save() {
              if (!data.item.id) return false;
              let val = data.item.value ?? data.data.value;
              if (data.item.inputType === "number") val = Number(val);
              api.extension.persist.store.settings[data.item.id] = val;
              return true;
            }
            save();
            if (data.item.id) {
              api.extension.persist.store.settings[data.item.id] = data.item.value ?? data.data.value;
            }
            evaluated?.config?.({
              item: data.item,
              data: data.data,
              getItem(itemId) {
                return findInTree(out.__cache__.config[id], (i) => i.id === itemId);
              },
              getItems() {
                return findInTree(out.__cache__.config[id], (i) => i.id, { all: true });
              },
              save
            });
          });
        function unload() {
          offConfigListener();
          api.extension.subscriptions.forEach(i => { if (typeof i === "function") i(); });
          api.extension.events.emit("unload");
          evaluated?.unload?.();
          api.extension.persist.off("UPDATE", onPersistUpdate);
          api.extension.persist.off("DELETE", onPersistUpdate);
          api.extension.persist.off("SET", onPersistUpdate);
        }
        out.__cache__.loaded.store[id] = { evaluated, api, unload };
        events.emit("ExtensionLoaded", { id });
        return { evaluated, api, unload };
      } else if (data.manifest.type === 'theme') {
        let evaluated = out.evaluate(data.source, null);
        const persist = await storage.createPersistNest(`Extension;Persist;${id}`);
        if (persist.ghost.settings === undefined) persist.store.settings = {};
        out.__cache__.config[id] = JSON.parse(JSON.stringify(data.manifest.config));
        findInTree(out.__cache__.config[id], (i) => i.id, { all: true }).forEach(
          (i) => {
            persist.store.settings[i.id] = persist.ghost?.settings?.[i.id] ?? i.default;
            i.value = persist.ghost?.settings?.[i.id];
          }
        );
        let cssText = evaluated();
        let injectedRes = patcher.injectCSS(cssText, persist.ghost.settings);

        const offConfigListener =
          events.on("ExtensionConfigInteraction", (data) => {
            if (data.extension !== id) return;
            if (!data.item.id) return;
            persist.store.settings[data.item.id] = data.data.value;
            injectedRes(persist.ghost.settings);
          });
        function unload() {
          offConfigListener();
          injectedRes();
        }
        out.__cache__.loaded.store[id] = { evaluated, unload };
        events.emit("ExtensionLoaded", { id });
        return { evaluated, unload };
      }
    },
    unload(id) {
      out.__cache__.loaded.ghost?.[id]?.unload?.();
      delete out.__cache__.loaded.store[id];
      delete out.__cache__.config[id];
      events.emit("ExtensionUnloaded", { id });
    }
  }
};

waitUntilConnectionOpen().then(async () => {
  await utils.sleep(100);
  out.loadAll();
});

export default out;