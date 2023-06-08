import webpack from "../modules/webpack.js";
import patcher from "../patcher/index.js";
import logger from "../utils/logger.js";

import common from "../modules/common.js";
import { finderMap } from "../modules/raw/complex-finder.js";

const { React } = common;

let isReady = false;

let Components = null;

let Actions = null;

let actionsOgModule = null;

(async () => {
  Actions = await (async () => {
    let moduleId;
    while (true) {
      moduleId = Object.entries(webpack.require.m).find(i => i[1]?.toString().includes(`type:"CONTEXT_MENU_OPEN"`))[0];
      if (moduleId) break;
      await new Promise(r => setTimeout(r, 100));
    }
    let ogModule = webpack.find((_, idx) => idx == moduleId).exports;
    actionsOgModule = ogModule;
    const out = finderMap(ogModule, {
      close: ["CONTEXT_MENU_CLOSE"],
      open: ["renderLazy"]
    });

    isReady = !!out.close && !!out.open;
    return out;
  })();

  Components = await (async () => {
    const out = {};
    // const componentMap = {
    //   separator: "Separator",
    //   checkbox: "CheckboxItem",
    //   radio: "RadioItem",
    //   control: "ControlItem",
    //   groupstart: "Group",
    //   customitem: "Item"
    // };
    const componentTypes = [
      "Separator",
      "CheckboxItem",
      "RadioItem",
      "ControlItem",
      "Group",
      "Item"
    ]

    try {
      let moduleId;
      while (true) {
        moduleId = Object.entries(webpack.require.m).find(([, m]) => m?.toString().includes("menuitemcheckbox"))[0]
        if (moduleId) break;
        await new Promise(r => setTimeout(r, 100));
      }

      const contextMenuModule = webpack.find((_, idx) => idx == moduleId).exports;

      // const moduleString = webpack.require.m[moduleId].toString();
      // const rawMatches = moduleString.matchAll(/if\(\w+\.type===(?:\w+\.)?(\w+)\).+?type:"(.+?)"/gs);

      out.Menu = contextMenuModule.Menu;

      componentTypes.forEach((value) => {
        out[value] = contextMenuModule[`Menu${value}`];
      });

      // [...rawMatches].forEach(([, functionName, type]) => {
      //   // let moduleKey = moduleString.match(new RegExp(new RegExp(`(\\w+):\\(\\)\\=\\>${functionName}`)))?.[1]
      //   out[componentMap[type]] = contextMenuModule[moduleKey];
      // });

      isReady = Object.keys(out).length > 1;
    } catch (err) {
      isReady = false;
      logger.error("Failed to load context menu components", err);
    }

    return out;
  })();

  MenuPatcher.initialize();
})();


class MenuPatcher {
  static MAX_PATCH_ITERATIONS = 16;
  static patches = new Map();
  static subPatches = new WeakMap();

  static initialize() {
    if (!isReady) return logger.warn("Unable to load context menu.");

    const keyToPatch = Object.keys(actionsOgModule).find(k => actionsOgModule[k]?.length === 3);

    patcher.before(
      keyToPatch,
      actionsOgModule,
      function (methodArgs) {
        const promise = methodArgs[1];
        methodArgs[1] = async function (...args) {
          const render = await promise.call(this, ...args);

          return (props) => {
            const res = render(props);

            if (res?.props.navId) {
              MenuPatcher.executePatches(res.props.navId, res, props);
            } else if (typeof res?.type === "function") {
              MenuPatcher.patchRecursive(res, "type");
            }

            return res;
          }
        }

        return methodArgs;
      }
    )
  }

  static patchRecursive(target, method, iteration = 0) {
    if (iteration >= this.MAX_PATCH_ITERATIONS) return;

    const proxyFunction = this.subPatches.get(target[method]) ?? (() => {
      const originalFunction = target[method];
      const depth = ++iteration;
      function patch(...args) {
        const res = originalFunction.call(this, ...args);

        if (!res) return res;

        const navId = res.props?.navId ?? res.props?.children?.props?.navId;
        if (navId) {
          MenuPatcher.executePatches(navId, res, args[0]);
        } else {
          const layer = res.props.children ? res.props.children : res;

          if (typeof layer?.type == "function") {
            MenuPatcher.patchRecursive(layer, "type", depth);
          }
        }

        return res;
      }

      patch.__original__ = originalFunction;
      Object.assign(patch, originalFunction);
      this.subPatches.set(originalFunction, patch);

      return patch;
    })();

    target[method] = proxyFunction;
  }

  static executePatches(id, res, props) {
    if (!this.patches.has(id)) return;

    this.patches.get(id).forEach(patch => {
      try {
        patch(res, props);
      } catch (err) {
        logger.error("Failed to patch context menu", patch, err);
      }
    });
  }
}


// Copied from bd's source
function buildItem(props) {
  const { type } = props;
  if (type === "separator") return React.createElement(Components.Separator);

  let component = Components.Item;
  if (type === "submenu") {
    if (!props.children) props.children = buildMenuChildren(props.render || props.items);
  } else if (type === "toggle" || type === "radio") {
    component = type === "toggle" ? Components.CheckboxItem : Components.RadioItem;
    if (props.active) props.checked = props.active;
  } else if (type === "control") {
    component = Components.ControlItem;
  }
  if (!props.id) props.id = `${props.label.replace(/^[^a-z]+|[^\w-]+/gi, "-")}`;
  if (props.danger) props.color = "danger";
  props.extended = true;

  if (type === "toggle") {
    const [active, doToggle] = React.useState(props.checked || false);
    const originalAction = props.action;
    props.checked = active;
    props.action = function (ev) {
      originalAction(ev);
      doToggle(!active);
    };
  }

  return React.createElement(component, props);
}

// Copied from bd's source
function buildMenuChildren(setup) {
  const mapper = s => {
    if (s.type === "group") return buildGroup(s);
    return buildItem(s);
  };
  const buildGroup = function (group) {
    const items = group.items.map(mapper).filter(i => i);
    return React.createElement(Components.Group, null, items);
  };
  return setup.map(mapper).filter(i => i);
}

export default {
  __cache__: {
    patches: MenuPatcher.patches,
    subPatches: MenuPatcher.subPatches
  },
  patch(navId, cb) {
    if (!MenuPatcher.patches.has(navId)) MenuPatcher.patches.set(navId, new Set());
    MenuPatcher.patches.get(navId).add(cb);

    return () => {
      MenuPatcher.patches.get(navId).delete(cb);
    }
  },
  open(event, component, config) {
    return Actions.open(event, (e) => React.createElement(component, Object.assign({}, e, { onClose: Actions.close })), config);
  },
  close() {
    return Actions.close();
  },
  build: {
    item(setup) {
      return buildMenuChildren([setup]);
    },
    menu(setup) {
      return (props) => React.createElement(Components.Menu, props, buildMenuChildren(setup));
    }
  }
};