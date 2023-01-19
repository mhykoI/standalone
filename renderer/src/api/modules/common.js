import commonData from '../../data/common.json';
import webpack from './webpack.js';


function mapObject(val) {
  return Object.fromEntries(
    Object.entries(val).map(([key, value]) => {
      if (typeof value == 'object') {
        if (value?.__ === true) {
          return [key, webpack.findByFinder(value)];
        }
        return [key, mapObject(value)];
      } else {
        return [key, value];
      }
    })
  );
}

let commonAPI = {
  __cache__: {}
};
commonAPI = Object.assign(commonAPI, mapObject(commonData.common));
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