import * as idbKeyVal from "idb-keyval";
import { deCycled, revive } from "../../lib/json-decycled";

import authentication from "../authentication";
import { createPersistNest } from "./createPersistNest.js";


export default {
  createPersistNest,
  authentication,
  shared: {
    async get(key) {
      let val = await idbKeyVal.get(`AcordStore;Shared;${key}`);
      return val ? revive(val) : undefined;
    },
    async set(key, val) {
      return idbKeyVal.set(`AcordStore;Shared;${key}`, deCycled(val));
    },
    async delete(key) {
      return idbKeyVal.del(`AcordStore;Shared;${key}`);
    }
  }
};