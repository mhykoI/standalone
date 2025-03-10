import * as idbKeyVal from "idb-keyval";

import authentication from "../authentication";
import { createPersistNest } from "./createPersistNest.js";


export default {
  createPersistNest,
  get authentication() {
    console.warn("storage.authentication is deprecated. Use acord.authentication instead.");
    return authentication;
  },
  shared: {
    async get(key, defaultValue = undefined) {
      let val = await idbKeyVal.get(`AcordStore;Shared;${key}`);
      if (val === undefined && defaultValue !== undefined) {
        await idbKeyVal.set(`AcordStore;Shared;${key}`, JSON.stringify(defaultValue));
        return defaultValue;
      }
      return typeof val !== "undefined" ? JSON.parse(val) : undefined;
    },
    async set(key, val) {
      return idbKeyVal.set(`AcordStore;Shared;${key}`, JSON.stringify(val));
    },
    async delete(key) {
      return idbKeyVal.del(`AcordStore;Shared;${key}`);
    },
    async keys() {
      return (await idbKeyVal.keys()).filter((key) => key.startsWith("AcordStore;Shared;")).map((key) => key.replace("AcordStore;Shared;", ""));
    }
  }
};