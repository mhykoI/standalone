import commonData from '../../data/common.json';
import webpack from './webpack.js';


function mapObject(temp, inp) {
  if (!temp?.__cache__) temp.__cache__ = {};
  for (const key in inp) {
    if (inp?.[key]?.__ === true) {
      Object.defineProperty(temp, key, {
        get() {
          if (temp.__cache__[key]) return temp.__cache__[key];
          return temp.__cache__[key] = webpack.findByFinder(inp[key]);
        }
      })
    } else {
      temp[key] = {};
      mapObject(temp[key], inp[key]);
    }
  }
}


let commonAPI = { __cache__: {} };
mapObject(commonAPI, commonData.common);
{
  let paths = [
    "exports.Z",
    "exports.ZP",
    "exports.default",
    "exports"
  ];
  webpack.filter((i) => i?.getName?.()?.endsWith?.("Store"), { defaultExport: false }).forEach((m) => {
    let obj = paths.map(path => _.get(m, path)).find(i => i);
    if (!obj) return;
    let name = obj?.getName?.();
    if (!name) return;
    if (commonAPI[name]) return;

    Object.defineProperty(commonAPI, name, {
      get() {
        if (commonAPI.__cache__[name]) return commonAPI.__cache__[name];
        return commonAPI.__cache__[name] = obj;
      }
    })
  })
}

export default commonAPI;