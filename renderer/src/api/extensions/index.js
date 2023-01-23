import { BasicEventEmitter } from "../../lib/BasicEventEmitter.js";
import dev from "../dev/index.js";
import i18n from "../i18n/index.js";
import modules from "../modules/index.js";
import storage from "../storage/index.js";
import { buildExtensionI18N } from "./i18n.js";
import * as nests from "nests";

/**
 * @param {{ modules: { node: { name: string, reason: string }[], common: { name: string, reason: string }[], custom: { reason: string, name: string, lazy: boolean, finder: { filter: { export: boolean, in: "properties" | "strings" | "prototypes", by: [string[], string[]?] }, path: { before: string | string[], after: string | string[] }, map: { [k: string]: string[] } } }[] }, about: { name: string | { [k: string]: string }, description: string | { [k: string]: string }, slug: string }, reason: string }} cfg 
 */
async function buildAPI(cfg) {
  const persist = await storage.createPersistNest(`Extension;Persist;${cfg.about.slug}`);
  const out = {
    modules: {
      __cache__: {
        common: {},
        node: {},
        custom: {},
        customLazy: {}
      },
      require(name) {
        if (!dev.enabled) {
          if (typeof out.modules.__cache__.node[name] !== "undefined") return out.modules.__cache__.node[name];
          if (cfg?.modules?.node?.some?.(i => i.name === name)) return out.modules.__cache__.node[name] = modules.require(name);
        } else {
          return modules.require(name);
        }
        return null;
      },
      common: new Proxy({}, {
        get(_, prop) {
          if (!dev.enabled) {
            if (typeof out.modules.__cache__.common[prop] !== "undefined") return out.modules.__cache__.common[prop];
            if (cfg?.modules?.common?.some?.(i => i.name === prop)) return out.modules.__cache__.common[prop] = modules.common[prop];
          } else {
            return modules.common[prop];
          }
          return null;
        },
      }),
      custom: new Proxy({}, {
        get(_, prop) {
          if (typeof out.modules.__cache__.custom[prop] !== "undefined") return out.modules.__cache__.custom[prop];
          let data = cfg?.modules?.custom?.some?.(i => i.name === prop);
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
      config: JSON.parse(JSON.stringify(cfg)),
      persist,
      i18n: await buildExtensionI18N(cfg),
      events: new BasicEventEmitter()
    }
  };

  return out;
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
  buildAPI,
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

    let metaResp = await fetch(`${url}/extension.json`);
    if (metaResp.status !== 200) throw new Error(`"${url}" extension is not responded with 200 status code.`);
    let metadata = await metaResp.json();

    // TODO: Show modal for user to accept the extension (terms, privacy, etc.)

    out.storage.installed.store[url] = {
      metadata,
      lastMetadata: metadata,
      autoUpdate: true,
      enabled: true,
      ...defaultConfig
    };

    // TODO: Load extension
  },
  async unInstall(url) {
    if (!out.__cache__.initialized) await out.init();
    if (!out.storage.installed.ghost[url]) throw new Error(`"${url}" extension is not installed.`);
    delete out.storage.installed.store[url];

    // TODO: unload extension
  }
};

export default out;