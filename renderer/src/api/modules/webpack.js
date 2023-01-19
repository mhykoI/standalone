import * as complexFinder from "./raw/complex-finder.js";

export default {
  __cache__: {},
  get req() {
    if (this.__cache__.req) return this.__cache__.req;
    let reqId = `AcordWebpackModules${Date.now()}`;
    const req = window.webpackChunkdiscord_app.push([[reqId], {}, req => req]);
    delete req.m[reqId];
    delete req.c[reqId];
    window.webpackChunkdiscord_app.pop();
    this.__cache__._req = req;
    return req;
  },
  find(filter, config = {}) {
    return complexFinder.find(this.req, complexFinder.wrapFilter(filter), config);
  },
  filter(filter, config = {}) {
    return complexFinder.find(this.req, complexFinder.wrapFilter(filter), { ...config, all: true });
  },
  findByFinder(finder) {
    return complexFinder.findByFinder(this.req, finder);
  }
};