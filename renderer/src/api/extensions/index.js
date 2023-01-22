import dev from "../dev/index.js";
import i18n from "../i18n/index.js";
import modules from "../modules/index.js";
import storage from "../storage/index.js";

/**
 * @param {{ modules: { node: { name: string, reason: string }[], common: { name: string, reason: string }[], custom: { reason: string, name: string, finder: { filter: { export: boolean, in: "properties" | "strings" | "prototypes", by: [string[], string[]?] }, path: { before: string | string[], after: string | string[] }, map: { [k: string]: string[] } } }[] }, about: { name: string | { [k: string]: string }, description: string | { [k: string]: string }, slug: string }, reason: string }} cfg 
 */
async function buildAPI(cfg) {
  const persist = await storage.createPersistNest(`Extension;${cfg.about.slug}`);
  const out = {
    modules: {
      __cache__: {
        common: {},
        node: {},
        custom: {}
      },
      require(name) {
        if (!dev.enabled) {
          if (out.modules.__cache__.node[prop]) return out.modules.__cache__.node[prop];
          if (cfg.modules.node.some(i => i.name === name)) return out.modules.__cache__.node[prop] = modules.require(name);
        } else {
          return modules.require(name);
        }
        return null;
      },
      common: new Proxy({}, {
        get(_, prop) {
          if (!dev.enabled) {
            if (out.modules.__cache__.common[prop]) return out.modules.__cache__.common[prop];
            if (cfg.modules.common.some(i => i.name === prop)) return out.modules.__cache__.common[prop] = modules.common[prop];
          } else {
            return modules.common[prop];
          }
          return null;
        },
      }),
      custom: new Proxy({}, {
        get(_, prop) {
          if (out.modules.__cache__.custom[prop]) return out.modules.__cache__.custom[prop];
          let data = cfg.modules.custom.find(i => i.name === prop);
          if (!data) return null;
          return out.modules.__cache__.custom[prop] = modules.webpack.findByFinder(data.finder);
        }
      }),
    },
    i18n,
    extension: {
      config: JSON.parse(JSON.stringify(cfg)),
      persist,
      // TODO: add i18n support
    }
  };

  return out;
}

export default {
  buildAPI
};