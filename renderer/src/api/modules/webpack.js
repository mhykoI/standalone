import * as complexFinder from "./raw/complex-finder.js";

const defaultBefore = [
  "exports.Z",
  "exports.ZP",
  "exports.default",
  "exports"
];

export default {
  __cache__: {},
  get require() {
    if (this.__cache__.require) return this.__cache__.require;
    let reqId = `AcordWebpackModules${Date.now()}`;
    const req = window.webpackChunkdiscord_app.push([[reqId], {}, req => req]);
    delete req.m[reqId];
    delete req.c[reqId];
    window.webpackChunkdiscord_app.pop();
    this.__cache__.require = req;
    return req;
  },
  find(filter, config = {}) {
    return complexFinder.find(this.require, complexFinder.wrapFilter(filter), config);
  },
  lazyFind(filter, config = {}) {
    return complexFinder.lazyFind(complexFinder.wrapFilter(filter), config);
  },
  lazyFindByFinder(finder) {
    return complexFinder.lazyFindByFinder(finder);
  },
  filter(filter, config = {}) {
    return complexFinder.find(this.require, complexFinder.wrapFilter(filter), { ...config, all: true });
  },
  findByFinder(finder) {
    return complexFinder.findByFinder(this.require, finder);
  },
  findByStringValues(...stringValues) {
    return this.find((a) => { let va = Object.values(a); return stringValues.every(x => va.some(y => typeof y == "string" && y.includes(x))) })?.exports;
  },
  findByProperties(...props) {
    return this.findByFinder({
      filter: {
        export: false,
        in: "properties",
        by: [props]
      },
      path: {
        before: defaultBefore
      }
    });
  },
  findByPrototypes(...props) {
    return this.findByFinder({
      filter: {
        export: false,
        in: "prototypes",
        by: [props]
      },
      path: {
        before: defaultBefore
      }
    });
  },
  findByStrings(...props) {
    return this.findByFinder({
      filter: {
        export: false,
        in: "strings",
        by: [props]
      },
      path: {
        before: defaultBefore
      }
    });
  },
};