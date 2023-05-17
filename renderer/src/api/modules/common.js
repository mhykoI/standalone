import commonData from '../../data/common.json';
import { waitUntilConnectionOpen } from '../../other/utils.js';
import webpack from './webpack.js';


function mapObject(temp, inp) {
  if (!temp?.__cache__) temp.__cache__ = {};
  for (const key in inp) {
    if (inp?.[key]?.__ === true) {
      Object.defineProperty(temp, key, {
        configurable: true,
        get() {
          if (temp.__cache__[key]) return temp.__cache__[key];
          return temp.__cache__[key] = webpack.findByFinder(inp[key]);
        }
      })
    } else {
      if (typeof temp[key] === "undefined") temp[key] = {};
      mapObject(temp[key], inp[key]);
    }
  }
}


let common = {
  __cache__: {},
  LayerActions: {
    push(component) {
      common.FluxDispatcher.dispatch({
        type: "LAYER_PUSH",
        component
      });
    },
    pop() {
      common.FluxDispatcher.dispatch({
        type: "LAYER_POP"
      });
    },
    popAll() {
      common.FluxDispatcher.dispatch({
        type: "LAYER_POP_ALL"
      });
    }
  },
};
mapObject(common, commonData.common);
function findStores() {
  let paths = [
    "exports.Z",
    "exports.ZP",
    "exports.default",
    "exports"
  ];
  webpack.filter((i) => i?.getName?.()?.endsWith?.("Store"), { defaultExport: false }).forEach((m) => {
    let obj = paths.map(path => _.get(m, path)).find(i => i);
    if (!obj?._dispatchToken) return;
    let name = obj?.getName?.();
    if (!name) return;
    if (common[name]) return;

    Object.defineProperty(common, name, {
      get() {
        if (common.__cache__[name]) return common.__cache__[name];
        return common.__cache__[name] = obj;
      }
    })
  })
}
findStores();
waitUntilConnectionOpen().then(() => {
  findStores();
  mapObject(common, commonData.common);
});

export default common;