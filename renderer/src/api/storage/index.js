import * as idbKeyVal from "idb-keyval";
import { deCycled, revive } from "../../lib/json-decycled";

import authentication from "../authentication";
import { createPersistNest } from "./createPersistNest.js";


export default {
  createPersistNest,
  authentication,
  shared: {
    async get(key, defaultValue = undefined) {
      let val = await idbKeyVal.get(`AcordStore;Shared;${key}`);
      if (val === undefined && defaultValue !== undefined) {
        await idbKeyVal.set(`AcordStore;Shared;${key}`, defaultValue);
        return defaultValue;
      }
      return typeof val !== "undefined" ? revive(val) : defaultValue;
    },
    async set(key, val) {
      return idbKeyVal.set(`AcordStore;Shared;${key}`, deCycled(val));
    },
    async delete(key) {
      return idbKeyVal.del(`AcordStore;Shared;${key}`);
    }
  }
};