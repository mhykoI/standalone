import * as nests from "nests";
import * as idbKeyval from "idb-keyval";
import { deCycled, revive } from "../../lib/json-decycled";
export default {
  async createPersistNest(suffix) {
    let cached = await idbKeyval.get(`AcordStore;${suffix}`);
    if (typeof cached == "string") cached = revive(cached);
    const nest = nests.make(cached ?? {});

    const save = () => {
      try {
        idbKeyval.set(`AcordStore;${suffix}`, deCycled({ ...nest.ghost }));
      } catch {
        idbKeyval.set(`AcordStore;${suffix}`, deCycled({}));
      }
    }

    nest.on(nests.Events.SET, save);
    nest.on(nests.Events.UPDATE, save);
    nest.on(nests.Events.DELETE, save);

    return nest;
  }
}