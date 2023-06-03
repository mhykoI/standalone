import * as nests from "nests";
import * as idbKeyVal from "idb-keyval";
import { deCycled, revive } from "../../lib/json-decycled";

export async function createPersistNest(suffix) {
  let cached = await idbKeyVal.get(`AcordStore;${suffix}`);
  if (typeof cached == "string") cached = revive(cached);
  const nest = nests.make(cached ?? {});

  const save = () => {
    try {
      idbKeyVal.set(`AcordStore;${suffix}`, deCycled({ ...nest.ghost }));
    } catch {
      idbKeyVal.set(`AcordStore;${suffix}`, deCycled({}));
    }
  }

  nest.on(nests.Events.SET, save);
  nest.on(nests.Events.UPDATE, save);
  nest.on(nests.Events.DELETE, save);

  return nest;
}