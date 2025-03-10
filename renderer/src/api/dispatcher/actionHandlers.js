import patcher from "../patcher/index.js";
import common from "../modules/common.js";

const out = {
  __cache__: {
    initialized: false,
    /** @type {Map<string,Map<string, Set<{ actionHandler: Function, storeDidChange: Function }>>>} */
    patches: new Map()
  },
  init() {
    if (out.__cache__.initialized) return;
    out.__cache__.initialized = true;

    patcher.instead(
      "_computeOrderedActionHandlers",
      common.FluxDispatcher._actionHandlers,
      function ([actionName]) {
        let orderedCallbackTokens = this._orderedCallbackTokens || this._computeOrderedCallbackTokens();
        let actionHandlers = [];
        for (let i = 0; i < orderedCallbackTokens.length; i++) {
          let nodeData = this._dependencyGraph.getNodeData(orderedCallbackTokens[i]);
          let storeName = nodeData.name;
          let store = nodeData.actionHandler;
          let actionHandler = store[actionName];
          if (actionHandler) {
            actionHandlers.push({
              name: storeName,
              __original__: {
                actionHandler,
                storeDidChange: nodeData.storeDidChange
              },
              async actionHandler(e) {
                let actionPatches = out.__cache__.patches.get(actionName)?.get(storeName);
                if (e.__original__ || !actionPatches?.size) return actionHandler.call(this, e);
                let eventObj = {
                  event: e,
                  canceled: false,
                  original: patch.actionHandler.bind(this),
                  cancel() {
                    this.canceled = true;
                  }
                }
                for (const patch of actionPatches) {
                  if (!patch.actionHandler) continue;
                  await patch.actionHandler.call(this, eventObj);
                }
                if (eventObj.canceled) return;
                return actionHandler.call(this, e);
              },
              async storeDidChange(e) {
                let actionPatches = out.__cache__.patches.get(actionName)?.get(storeName);
                if (e.__original__ || !actionPatches?.size) return nodeData.storeDidChange.call(this, e);
                let eventObj = {
                  event: e,
                  canceled: false,
                  original: patch.storeDidChange.bind(this),
                  cancel() {
                    this.canceled = true;
                  }
                }
                for (const patch of actionPatches) {
                  if (!patch.storeDidChange) continue;
                  await patch.storeDidChange.call(this, eventObj);
                }
                if (eventObj.canceled) return;
                return nodeData.storeDidChange.call(this, e);
              }
            });
          }
        }
        this._orderedActionHandlers[actionName] = actionHandlers;
        return actionHandlers;
      }
    );
  },
  patch(actionName, storeName, { actionHandler = () => { }, storeDidChange = () => { } } = {}) {
    let obj = {
      actionHandler,
      storeDidChange
    };
    if (!out.__cache__.patches.has(actionName))
      out.__cache__.patches.set(actionName, new Map());

    let map = out.__cache__.patches.get(actionName);
    if (!map.has(storeName)) map.set(storeName, new Set());

    let set = map.get(storeName);
    set.add(obj);

    common.FluxDispatcher._actionHandlers._computeOrderedActionHandlers(actionName);
    return () => {
      set.delete(obj);
      common.FluxDispatcher._actionHandlers._computeOrderedActionHandlers(actionName);
    }
  }
}

export default out;