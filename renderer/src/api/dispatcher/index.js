import patcher from '../patcher/index.js';
import actionHandlers from './actionHandlers';
import common from "../modules/common.js";

const out = {
  __cache__: {
    initialized: false,
    /** @type {Map<string,Set<Function>>>} */
    patches: new Map()
  },
  actionHandlers,
  init() {
    if (out.__cache__.initialized) return;
    out.__cache__.initialized = true;
    actionHandlers.init();
    common.FluxDispatcher.__dispatch__ = common.FluxDispatcher.dispatch;
    patcher.instead(
      "dispatch",
      common.FluxDispatcher,
      async function ([event], ogFunc) {
        let set = out.__cache__.patches.get(event.type);
        if (event.__original__ || !set?.size) return ogFunc.call(this, event);
        let eventObj = {
          event,
          canceled: false,
          original: ogFunc.bind(this),
          cancel() {
            this.canceled = true;
          }
        }
        for (const patch of set) {
          await patch.call(this, eventObj);
        }
        if (eventObj.canceled) return;
        return ogFunc.call(this, event);
      }
    )
  },
  patch(actionName, cb) {
    if (!out.__cache__.patches.has(actionName)) out.__cache__.patches.set(actionName, new Set());
    out.__cache__.patches.get(actionName).add(cb);
    return () => {
      out.__cache__.patches.get(actionName)?.delete(cb);
    }
  },
  on(actionName, cb) {
    common.FluxDispatcher.subscribe(actionName, cb);
    return () => {
      out.off(actionName, cb);
    }
  },
  off(actionName, cb) {
    common.FluxDispatcher.unsubscribe(actionName, cb);
  }
}

export default out;