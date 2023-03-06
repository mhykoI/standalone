import utils from "../../utils/index.js";
import logger from "../../utils/logger.js";

export function wrapFilter(filter) {
  return (...args) => {
    try {
      if (args[0]?.document && args[0]?.window) return false;
      if (args[0]?.default?.remove && args[0]?.default?.set && args[0]?.default?.clear && args[0]?.default?.get && !args[0]?.default?.sort) return false;
      if (args[0].remove && args[0].set && args[0].clear && args[0].get && !args[0].sort) return false;
      if (args[0]?.default?.getToken || args[0]?.default?.getEmail || args[0]?.default?.showToken) return false;
      if (args[0]?.getToken || args[0]?.getEmail || args[0]?.showToken) return false;
      return filter(...args);
    }
    catch (err) {
      logger.warn("Module filter threw an exception.", filter, err);
      return false;
    }
  };
}

function checkModuleStrings(m, strings = [], hasNot) {
  const check = (s1, s2) => {
    return hasNot ? s1.toString().indexOf(s2.toString()) == -1 : s1.toString().indexOf(s2.toString()) > -1;
  };
  return strings.every(j => {
    return check(m?.toString?.() || "", j)
      || check(m?.__original__?.toString?.() || "", j)
      || check(m?.type?.toString?.() || "", j)
      || check(m?.type?.__original__?.toString?.() || "", j)
      || Object.entries(['function', 'object'].includes(typeof m?.prototype) ? typeof m?.prototype : {}).filter(i => i[0]?.includes?.("render")).some(i => check(i[1]?.toString?.() || "", j))
  });
};
function checkModuleProps(m, properties = [], hasNot) {
  return properties.every(prop => {
    const value = m[prop]?.__original__ || m[prop];
    return hasNot ? value === undefined : (value !== undefined && !(typeof value == "string" && !value));
  });
};
function checkModulePrototypes(m, protoProps = [], hasNot) {
  return m.prototype && protoProps.every(prop => {
    const value = m.prototype[prop];
    return hasNot ? value === undefined : (value !== undefined && !(typeof value == "string" && !value));
  });
};

const webpackChunkName = "webpackChunkdiscord_app";
const pushListeners = new Set();


{
  let ogPush = window[webpackChunkName].push;

  function handlePush(chunk) {
    const [, modules] = chunk;

    for (const moduleId in Object.keys(modules || {})) {
      const ogModule = modules[moduleId];

      modules[moduleId] = (module, exports, require) => {
        try {
          ogModule.call(null, module, exports, require);

          pushListeners.forEach(listener => {
            try {
              listener(exports);
            } catch (error) {
              utils.logger.error("Push listener threw an exception.", listener, error);
            }
          })
        } catch (error) {
          utils.logger.error("Unable to patch pushed module.", error, ogModule, moduleId, chunk);
          modules[moduleId] = ogModule;
        }
      };

      Object.assign(modules[moduleId], ogModule, {
        __original__: ogModule,
        toString: () => ogModule.toString(),
      });
    }

    return ogPush.call(window[webpackChunkName], chunk);
  }

  Object.defineProperty(window[webpackChunkName], "push", {
    configurable: true,
    get() { return handlePush; },
    set(value) {
      ogPush = value;

      Object.defineProperty(window[this.chunkName], "push", {
        value: this.handlePush,
        configurable: true,
        writable: true
      });
    }
  });
}



/**
 * 
 * @param {any} filter 
 * @param {{ signal: AbortSignal, searchExports: boolean }} param1 
 * @returns 
 */
export async function lazyFind(filter, { signal = null, searchExports = false }) {
  return new Promise((resolve, reject) => {
    const cancel = () => pushListeners.delete(listener);
    const listener = (exports) => {
      if (!exports || exports === window || exports === document.documentElement) return;

      let found = null;

      if (typeof exports == "object" && searchExports) {
        for (const key in exports) {
          let exported = exports[key];
          if (!exported) continue;
          if (filter(exported)) {
            found = exported;
            break;
          }
        }
      } else {
        let paths = [
          "exports.Z",
          "exports.ZP",
          "exports.default",
          "exports",
          ""
        ];
        found = paths.map(i => {
          let pathed = !i ? exports : _.get(exports, i);
          if (pathed && filter(pathed)) return pathed;
        }).find(i => i);
      }

      if (!found) return;
      cancel();
      resolve(found);
    }

    pushListeners.add(listener);

    signal?.addEventListener("abort", () => {
      cancel();
      resolve(null);
    });
  });
}

export function find(req, filter, config = {}) {
  let defaultExport = typeof config.defaultExport != "boolean" ? false : config.defaultExport;
  let unloaded = typeof config.unloaded != "boolean" ? false : config.unloaded;
  let all = typeof config.all != "boolean" ? false : config.all;
  const found = [];
  if (!unloaded) for (let i in req.c) if (req.c.hasOwnProperty(i)) {
    let m = req.c[i].exports, r = null;
    if (m && (typeof m == "object" || typeof m == "function")) {
      if (!!(r = filter(m, i))) {
        if (all) found.push(defaultExport ? r : req.c[i]);
        else return defaultExport ? r : req.c[i];
      }
      else for (let key of Object.keys(m)) if (key.length < 4 && m[key] && !!(r = filter(m[key], i))) {
        if (all) found.push(defaultExport ? r : req.c[i]);
        else return defaultExport ? r : req.c[i];
      }
    }
    if (m && m.__esModule && m.default && (typeof m.default == "object" || typeof m.default == "function")) {
      if (!!(r = filter(m.default, i))) {
        if (all) found.push(defaultExport ? r : req.c[i]);
        else return defaultExport ? r : req.c[i];
      }
      else if (m.default.type && (typeof m.default.type == "object" || typeof m.default.type == "function") && !!(r = filter(m.default.type, i))) {
        if (all) found.push(defaultExport ? r : req.c[i]);
        else return defaultExport ? r : req.c[i];
      }
    }
  }
  for (let i in req.m) if (req.m.hasOwnProperty(i)) {
    let m = req.m[i];
    if (m && typeof m == "function") {
      if (req.c[i] && !unloaded && filter(m, i)) {
        if (all) found.push(defaultExport ? req.c[i].exports : req.c[i]);
        else return defaultExport ? req.c[i].exports : req.c[i];
      }
      if (!req.c[i] && unloaded && filter(m, i)) {
        const resolved = {}, resolved2 = {};
        m(resolved, resolved2, req);
        const trueResolved = resolved2 && Object.getOwnPropertyNames(resolved2 || {}).length == 0 ? resolved : resolved2;
        if (all) found.push(defaultExport ? trueResolved.exports : trueResolved);
        else return defaultExport ? trueResolved.exports : trueResolved;
      }
    }
  }
  if (all) return found;
};


function finderFindFunction(entries, strings) {
  return (entries.find(n => {
    let funcString = typeof n[1] == "function" ? (n[1]?.__original__?.toString?.() || n[1]?.toString?.() || "") : (() => { try { return JSON.stringify(n[1]) } catch (err) { return n[1].toString() } })();
    let renderFuncString = n[1]?.render?.__original__?.toString?.() || n[1]?.render?.toString?.() || "";
    return strings.every(string => funcString.indexOf(string) != -1 || renderFuncString.indexOf(string) != -1);
  }));
}

export function finderToFilter(finder) {
  let found = () => false;
  if (typeof finder?.filter === "string") {
    found = wrapFilter(eval(`(($)=>{ try { return (${finder.filter}); } catch { return false; } })`));
  } else if (typeof finder?.filter === "function") {
    found = wrapFilter(finder.filter);
  } else {
    switch (finder.filter.in) {
      case "properties": {
        if (finder.filter.by?.[1]?.length) {
          found = wrapFilter((m) => checkModuleProps(m, finder.filter.by?.[0] || []) && checkModuleProps(m, finder.filter.by?.[1] || [], true));
        } else {
          found = wrapFilter((m) => checkModuleProps(m, finder.filter.by?.[0] || []));
        }
        break;
      }
      case "prototypes": {
        if (finder.filter.by?.[1]?.length) {
          found = wrapFilter((m) => checkModulePrototypes(m, finder.filter.by?.[0] || []) && checkModulePrototypes(m, finder.filter.by?.[1] || [], true));
        } else {
          found = wrapFilter((m) => checkModulePrototypes(m, finder.filter.by?.[0] || []));
        }
        break;
      }
      case "strings": {
        if (finder.filter.by?.[1]?.length) {
          found = wrapFilter((m) => checkModuleStrings(m, finder.filter.by?.[0] || []) && checkModuleStrings(m, finder.filter.by?.[1] || [], true));
        } else {
          found = wrapFilter((m) => checkModuleStrings(m, finder.filter.by?.[0] || []));
        }
        break;
      }
    }
  }
  return found;
}

export function finderMap(__original__, map) {
  let __mapped__ = {};

  let temp = {
    __original__,
    __mapped__,
    ...__original__
  };

  Object.entries(map).forEach(([key, strings]) => {
    Object.defineProperty(temp, key, {
      get() {
        if (__mapped__[key]) return __original__[__mapped__[key]];

        let foundFunc = finderFindFunction(Object.entries(__original__ || {}), map[key] || []);
        if (!foundFunc?.length) return;

        __mapped__[key] = foundFunc[0];
        return foundFunc[1];
      }
    })
  });

  return temp;
}

export function findByFinder(req, finder = {}) {
  const defaultExport = !!finder?.filter?.export;
  let found = find(req, finderToFilter(finder), { defaultExport, all: true }).find(i => i !== globalThis.window || i?.exports !== globalThis.window);

  if (!found) return null;

  if (finder.path?.before) found = (Array.isArray(finder.path.before) ? finder.path.before.map(i => _.get(found, i)).find(i => i) : _.get(found, finder.path.before)) || found;
  if (finder.assign) found = Object.assign({}, found);

  if (!found) return null;

  if (finder.map) found = finderMap(found, finder.map);

  if (finder.path?.after) found = (Array.isArray(finder.path.after) ? finder.path.after.map(i => _.get(found, i)).find(i => i) : _.get(found, finder.path.after)) || found;

  return found;
}



export async function lazyFindByFinder(finder = {}) {
  let found = await lazyFind(finderToFilter(finder), { searchExports: false });

  if (!found) return null;

  if (finder.path?.before) found = (Array.isArray(finder.path.before) ? finder.path.before.map(i => _.get(found, i)).find(i => i) : _.get(found, finder.path.before)) || found;
  if (finder.assign) found = Object.assign({}, found);

  if (!found) return null;

  if (finder.map) found = finderMap(found, finder.map);

  if (finder.path?.after) found = (Array.isArray(finder.path.after) ? finder.path.after.map(i => _.get(found, i)).find(i => i) : _.get(found, finder.path.after)) || found;

  return found;
}