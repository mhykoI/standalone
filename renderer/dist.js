var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// node_modules/nests/cjs/Events.js
var require_Events = __commonJS({
  "node_modules/nests/cjs/Events.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Object.freeze({
      GET: "GET",
      SET: "SET",
      DELETE: "DELETE",
      UPDATE: "UPDATE"
    });
  }
});

// node_modules/nests/cjs/EventEmitter.js
var require_EventEmitter = __commonJS({
  "node_modules/nests/cjs/EventEmitter.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var Events_1 = __importDefault(require_Events());
    var EventEmitter = class {
      constructor() {
        this.listeners = Object.values(Events_1.default).reduce((acc, val) => (acc[val] = /* @__PURE__ */ new Set(), acc), {});
        this.on = function(event, listener) {
          if (this.listeners[event].has(listener)) {
            throw Error(`This listener on ${event} already exists.`);
          }
          this.listeners[event].add(listener);
        };
        this.once = function(event, listener) {
          const onceListener = (event2, data) => {
            this.off(event2, onceListener);
            listener(event2, data);
          };
          this.on(event, onceListener);
        };
        this.off = function(event, listener) {
          this.listeners[event].delete(listener);
        };
        this.emit = function(event, data) {
          for (const listener of this.listeners[event]) {
            listener(event, data);
          }
        };
        for (const event of Object.values(Events_1.default)) {
          this[event.toLowerCase()] = (data) => {
            this.emit(event, data);
          };
        }
      }
    };
    exports.default = EventEmitter;
  }
});

// node_modules/nests/cjs/make.js
var require_make = __commonJS({
  "node_modules/nests/cjs/make.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventEmitter_1 = __importDefault(require_EventEmitter());
    function make3(data = {}, { nestArrays = true } = {}) {
      const emitter = new EventEmitter_1.default();
      function createProxy(target, root, path) {
        return new Proxy(target, {
          get(target2, property) {
            const newPath = [...path, property];
            const value = target2[property];
            if (value !== void 0 && value !== null) {
              emitter.get({
                path: newPath,
                value
              });
              if (!nestArrays && Array.isArray(value)) {
                return value;
              }
              if (typeof value === "object") {
                return createProxy(value, root, newPath);
              }
              return value;
            }
            return createProxy(target2[property] = {}, root, newPath);
          },
          set(target2, property, value) {
            target2[property] = value;
            emitter.set({
              path: [...path, property],
              value
            });
            return true;
          },
          deleteProperty(target2, property) {
            if (delete target2[property]) {
              emitter.delete({
                path: [...path, property]
              });
              return true;
            }
            return false;
          },
          has(target2, property) {
            if (typeof target2[property] === "object" && Object.keys(target2[property]).length === 0) {
              return false;
            }
            return property in target2;
          }
        });
      }
      return Object.assign({
        store: createProxy(data, data, []),
        // This can be safely ignored, the Data will always be an object or it won't work anyway.
        // @ts-ignore
        ghost: data
      }, emitter);
    }
    exports.default = make3;
  }
});

// node_modules/nests/cjs/index.js
var require_cjs = __commonJS({
  "node_modules/nests/cjs/index.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.make = exports.Events = void 0;
    var Events_1 = require_Events();
    Object.defineProperty(exports, "Events", { enumerable: true, get: function() {
      return __importDefault(Events_1).default;
    } });
    var make_1 = require_make();
    Object.defineProperty(exports, "make", { enumerable: true, get: function() {
      return __importDefault(make_1).default;
    } });
  }
});

// src/data/common.json
var common_default = {
  common: {
    modals: {
      components: {
        other: {
          __: true,
          filter: {
            export: false,
            in: "properties",
            by: [
              [
                "Header",
                "Footer"
              ]
            ]
          },
          path: {
            after: [
              "exports.Z",
              "exports.ZP",
              "exports.default",
              "exports"
            ]
          }
        },
        Root: {
          __: true,
          filter: {
            export: false,
            in: "strings",
            by: [
              [
                "ENTERING"
              ]
            ]
          },
          path: {
            after: [
              "exports.Z",
              "exports.ZP",
              "exports.default",
              "exports"
            ]
          }
        }
      },
      actions: {
        open: {
          __: true,
          filter: {
            export: false,
            in: "strings",
            by: [
              [
                "onCloseCallback",
                "Layer"
              ]
            ]
          },
          path: {
            before: [
              "exports.Z",
              "exports.ZP",
              "exports.default",
              "exports"
            ],
            after: [
              "open"
            ]
          },
          map: {
            open: [
              "onCloseCallback",
              "Layer"
            ]
          }
        },
        close: {
          __: true,
          filter: {
            export: false,
            in: "strings",
            by: [
              [
                "onCloseCallback()"
              ]
            ]
          },
          path: {
            before: [
              "exports.Z",
              "exports.ZP",
              "exports.default",
              "exports"
            ],
            after: [
              "close"
            ]
          },
          map: {
            close: [
              "onCloseCallback()"
            ]
          }
        }
      }
    },
    components: {
      Button: {
        __: true,
        filter: {
          export: false,
          in: "properties",
          by: [
            [
              "BorderColors"
            ]
          ]
        },
        path: {
          before: [
            "exports.Z",
            "exports.ZP",
            "exports.default",
            "exports"
          ],
          after: "Button"
        },
        map: {
          Button: [
            ".FILLED",
            ".onMouseLeave"
          ]
        }
      },
      ConfirmationModal: {
        __: true,
        filter: {
          export: false,
          in: "strings",
          by: [
            [
              ".confirmButtonColor"
            ]
          ]
        },
        path: {
          before: [
            "exports.Z",
            "exports.ZP",
            "exports.default",
            "exports"
          ]
        }
      },
      Text: {
        __: true,
        filter: "$?.Sizes?.SIZE_32 && $.Colors",
        path: {
          before: [
            "exports.Z",
            "exports.ZP",
            "exports.default",
            "exports"
          ]
        }
      },
      Markdown: {
        __: true,
        filter: "$?.prototype?.render && $.rules",
        path: {
          after: [
            "exports.Z",
            "exports.ZP",
            "exports.default",
            "exports"
          ]
        }
      }
    },
    FluxDispatcher: {
      __: true,
      path: {
        after: [
          "exports.Z",
          "exports.ZP",
          "exports.default",
          "exports"
        ]
      },
      filter: {
        export: false,
        in: "properties",
        by: [
          [
            "_currentDispatchActionType",
            "dispatch"
          ]
        ]
      }
    },
    React: {
      __: true,
      path: {
        after: [
          "exports.Z",
          "exports.ZP",
          "exports.default",
          "exports"
        ]
      },
      filter: {
        export: false,
        in: "properties",
        by: [
          [
            "createElement",
            "useState"
          ]
        ]
      }
    },
    Rest: {
      __: true,
      path: {
        after: [
          "exports.Z",
          "exports.ZP",
          "exports.default",
          "exports"
        ]
      },
      filter: {
        export: false,
        in: "properties",
        by: [
          [
            "get",
            "post",
            "getAPIBaseURL"
          ]
        ]
      }
    },
    Flux: {
      __: true,
      path: {
        after: [
          "exports.Z",
          "exports.ZP",
          "exports.default",
          "exports"
        ]
      },
      filter: {
        export: false,
        in: "properties",
        by: [
          [
            "connectStores",
            "destroy"
          ]
        ]
      }
    },
    ActivityActions: {
      __: true,
      path: {
        after: [
          "exports.Z",
          "exports.ZP",
          "exports.default",
          "exports"
        ]
      },
      filter: {
        export: false,
        in: "properties",
        by: [
          [
            "sendActivityInvite",
            "updateActivity"
          ]
        ]
      }
    },
    PrivateChannelActions: {
      __: true,
      path: {
        after: [
          "exports.Z",
          "exports.ZP",
          "exports.default",
          "exports"
        ]
      },
      filter: {
        export: false,
        in: "properties",
        by: [
          [
            "openPrivateChannel",
            "ensurePrivateChannel"
          ]
        ]
      }
    },
    AckActions: {
      __: true,
      filter: {
        in: "strings",
        by: [
          [
            'type:"BULK_ACK"'
          ],
          []
        ]
      },
      path: {
        export: true,
        before: "exports"
      },
      map: {
        ack: [
          'type:"CHANNEL_ACK"',
          "messageId",
          "channelId"
        ],
        bulkAck: [
          'type:"BULK_ACK"'
        ]
      }
    },
    AnalyticsActions: {
      __: true,
      filter: {
        export: false,
        in: "properties",
        by: [
          [
            "isThrottled",
            "track"
          ]
        ]
      },
      path: {
        after: [
          "exports.Z",
          "exports.ZP",
          "exports.default",
          "exports"
        ]
      }
    },
    AnimationActions: {
      __: true,
      export: false,
      filter: {
        in: "properties",
        by: [
          [
            "spring",
            "decay"
          ]
        ]
      },
      path: {
        after: [
          "exports.Z",
          "exports.ZP",
          "exports.default",
          "exports"
        ]
      }
    },
    ConnectionActions: {
      __: true,
      filter: {
        export: false,
        in: "properties",
        by: [
          [
            "setShowActivity",
            "setVisibility"
          ]
        ]
      },
      path: {
        after: [
          "exports.Z",
          "exports.ZP",
          "exports.default",
          "exports"
        ]
      }
    },
    RTCConnectionActions: {
      __: true,
      filter: {
        export: false,
        in: "properties",
        by: [
          [
            "getChannelId",
            "getGuildId",
            "getRTCConnectionId"
          ]
        ]
      },
      path: {
        after: [
          "exports.Z",
          "exports.ZP",
          "exports.default",
          "exports"
        ]
      }
    },
    EmojiActions: {
      __: true,
      filter: {
        export: false,
        in: "properties",
        by: [
          [
            "translateInlineEmojiToSurrogates",
            "translateSurrogatesToInlineEmoji"
          ]
        ]
      },
      path: {
        after: [
          "exports.Z",
          "exports.ZP",
          "exports.default",
          "exports"
        ]
      }
    },
    EmojiStateActions: {
      __: true,
      filter: {
        export: false,
        in: "properties",
        by: [
          [
            "getURL",
            "isEmojiDisabled"
          ]
        ]
      },
      path: {
        after: [
          "exports.Z",
          "exports.ZP",
          "exports.default",
          "exports"
        ]
      }
    },
    GuildNotificationsActions: {
      __: true,
      filter: {
        export: false,
        in: "properties",
        by: [
          [
            "updateChannelOverrideSettings",
            "updateGuildNotificationSettings"
          ]
        ]
      },
      path: {
        after: [
          "exports.Z",
          "exports.ZP",
          "exports.default",
          "exports"
        ]
      }
    },
    InternalReact: {
      __: true,
      filter: {
        export: false,
        in: "properties",
        by: [
          [
            "jsx",
            "jsxs",
            "Fragment"
          ]
        ]
      },
      path: {
        after: [
          "exports.Z",
          "exports.ZP",
          "exports.default",
          "exports"
        ]
      }
    },
    LoginActions: {
      __: true,
      filter: {
        export: false,
        in: "properties",
        by: [
          [
            "login",
            "logout"
          ]
        ]
      },
      path: {
        after: [
          "exports.Z",
          "exports.ZP",
          "exports.default",
          "exports"
        ]
      }
    },
    QueryActions: {
      __: true,
      filter: {
        export: false,
        in: "properties",
        by: [
          [
            "queryEmojiResults",
            "queryFriends"
          ]
        ]
      },
      path: {
        after: [
          "exports.Z",
          "exports.ZP",
          "exports.default",
          "exports"
        ]
      }
    },
    MessageActions: {
      __: true,
      filter: {
        export: false,
        in: "properties",
        by: [
          [
            "receiveMessage",
            "sendMessage"
          ]
        ]
      },
      path: {
        after: [
          "exports.Z",
          "exports.ZP",
          "exports.default",
          "exports"
        ]
      }
    },
    PremiumActions: {
      __: true,
      filter: {
        export: false,
        in: "properties",
        by: [
          [
            "isPremium",
            "canUseEmojisEverywhere"
          ]
        ]
      },
      path: {
        after: [
          "exports.Z",
          "exports.ZP",
          "exports.default",
          "exports"
        ]
      }
    },
    VoiceActions: {
      __: true,
      filter: {
        export: false,
        in: "properties",
        by: [
          [
            "selectVoiceChannel",
            "disconnect"
          ]
        ]
      },
      path: {
        after: [
          "exports.Z",
          "exports.ZP",
          "exports.default",
          "exports"
        ]
      }
    },
    TypingActions: {
      __: true,
      filter: {
        export: false,
        in: "properties",
        by: [
          [
            "startTyping",
            "stopTyping"
          ]
        ]
      },
      path: {
        after: [
          "exports.Z",
          "exports.ZP",
          "exports.default",
          "exports"
        ]
      }
    },
    GuildActions: {
      __: true,
      filter: {
        export: false,
        in: "properties",
        by: [
          [
            "setChannel",
            "setServerMute"
          ]
        ]
      },
      path: {
        after: [
          "exports.Z",
          "exports.ZP",
          "exports.default",
          "exports"
        ]
      }
    },
    InviteActions: {
      __: true,
      filter: {
        export: false,
        in: "properties",
        by: [
          [
            "acceptInvite",
            "acceptInviteAndTransitionToInviteChannel"
          ]
        ]
      },
      path: {
        after: [
          "exports.Z",
          "exports.ZP",
          "exports.default",
          "exports"
        ]
      }
    },
    MediaEngineActions: {
      __: true,
      filter: {
        export: false,
        in: "properties",
        by: [
          [
            "toggleSelfDeaf",
            "toggleSelfMute"
          ]
        ]
      },
      path: {
        after: [
          "exports.Z",
          "exports.ZP",
          "exports.default",
          "exports"
        ]
      }
    },
    i18n: {
      __: true,
      filter: {
        export: false,
        in: "properties",
        by: [
          [
            "_requestedLocale",
            "getDefaultLocale"
          ]
        ]
      },
      path: {
        after: [
          "exports.Z",
          "exports.ZP",
          "exports.default",
          "exports"
        ]
      }
    },
    uuid: {
      __: true,
      filter: {
        export: false,
        in: "properties",
        by: [
          [
            "v1",
            "v4"
          ]
        ]
      },
      path: {
        after: [
          "exports.Z",
          "exports.ZP",
          "exports.default",
          "exports"
        ]
      }
    },
    hljs: {
      __: true,
      filter: {
        export: false,
        in: "properties",
        by: [
          [
            "highlightAll",
            "highlight"
          ]
        ]
      },
      path: {
        after: [
          "exports.Z",
          "exports.ZP",
          "exports.default",
          "exports"
        ]
      }
    }
  }
};

// src/api/utils/raw/find-in-tree.js
function findInTree(tree, searchFilter, { walkable = null, ignore = [], limit = 100 } = {}) {
  let iteration = 0;
  function doSearch(tree2, searchFilter2, { walkable: walkable2 = null, ignore: ignore2 = [] } = {}) {
    iteration += 1;
    if (iteration > limit)
      return;
    if (typeof searchFilter2 === "string") {
      if (tree2.hasOwnProperty(searchFilter2))
        return tree2[searchFilter2];
    } else if (searchFilter2(tree2))
      return tree2;
    if (!tree2)
      return;
    if (Array.isArray(tree2)) {
      for (const item of tree2) {
        const found2 = doSearch(item, searchFilter2, { walkable: walkable2, ignore: ignore2 });
        if (found2)
          return found2;
      }
    } else if (typeof tree2 === "object") {
      for (const key of Object.keys(tree2)) {
        if (walkable2 != null && !walkable2.includes(key))
          continue;
        if (ignore2.includes(key))
          continue;
        try {
          const found2 = doSearch(tree2[key], searchFilter2, {
            walkable: walkable2,
            ignore: ignore2
          });
          if (found2)
            return found2;
        } catch {
        }
      }
    }
  }
  return doSearch(tree, searchFilter, { walkable, ignore });
}

// src/api/utils/logger.js
function build(prefix = "Acord", type, color) {
  return (...input) => console[type](
    `%c${prefix}%c`,
    `background-color: ${color}; color: white; border-radius: 4px; padding: 0px 6px 0px 6px; font-weight: bold`,
    "",
    ...input
  );
}
var logger_default = {
  log: build("Acord", "log", "#00fbb0"),
  debug: build("Acord Debug", "debug", "#00fbb0"),
  info: build("Acord Info", "log", "#82aaff"),
  warn: build("Acord Warn", "warn", "#debf18"),
  error: build("Acord Error", "error", "#ef5858"),
  build
};

// src/api/utils/react.js
var react_default = {
  getInstance(node) {
    return Object.entries(node).find((i) => i[0].startsWith("__reactInternalInstance") || i[0].startsWith("__reactFiber"))?.[1];
  },
  getOwnerInstance(node) {
    let instance = this.getInstance(node);
    for (let el = instance; el; el = el.return)
      if (el.stateNode?.forceUpdate)
        return el.stateNode;
  },
  findInTree(tree, filter) {
    return findInTree(tree, filter, {
      walkable: ["props", "state", "children", "return"]
    });
  },
  getComponents(node) {
    const instance = this.getInstance(node);
    const components2 = [];
    let lastInstance = instance;
    while (lastInstance && lastInstance.return) {
      if (typeof lastInstance.return.type === "string")
        break;
      if (lastInstance.return.type)
        components2.push(lastInstance.return.type);
      lastInstance = lastInstance.return;
    }
    return components2;
  },
  getStateNodes(node) {
    const instance = this.getInstance(node);
    const stateNodes = [];
    let lastInstance = instance;
    while (lastInstance && lastInstance.return) {
      if (lastInstance.return.stateNode instanceof HTMLElement)
        break;
      if (lastInstance.return.stateNode)
        stateNodes.push(lastInstance.return.stateNode);
      lastInstance = lastInstance.return;
    }
    return stateNodes;
  },
  getProps(el, filter = (i) => i, max = 1e4) {
    const instance = this.getInstance(el);
    if (!instance?.return)
      return null;
    for (let current = instance?.return, i = 0; i > max || current !== null; current = current?.return, i++) {
      if (current?.pendingProps && filter(current.pendingProps))
        return current.pendingProps;
    }
    return null;
  }
};

// src/api/utils/index.js
var utils_default = {
  logger: logger_default,
  react: react_default,
  findInTree,
  format(val, ...args) {
    return `${val}`.replaceAll(/{(\d+)}/g, (_2, cap) => {
      return args[Number(cap)];
    });
  },
  interval(cb, dur) {
    let interval = setInterval(cb, dur);
    return () => {
      clearInterval(interval);
    };
  },
  timeout(cb, dur) {
    let timeout = setTimeout(cb, dur);
    return () => {
      clearTimeout(timeout);
    };
  },
  ifExists(val, cb) {
    if (val)
      cb(val);
  },
  copyText(text) {
    if (window.DiscordNative) {
      DiscordNative.clipboard.copy(text);
      return;
    }
    navigator.clipboard.writeText(text).catch(() => {
      const copyArea = document.createElement("textarea");
      copyArea.style.visibility = "hidden";
      copyArea.style.position = "fixed";
      copyArea.style.top = "0";
      copyArea.style.left = "0";
      document.body.appendChild(copyArea);
      copyArea.focus();
      copyArea.select();
      try {
        document.execCommand("copy");
      } catch (err) {
        console.error(err);
      }
      document.body.removeChild(copyArea);
    });
  }
};

// src/api/modules/raw/complex-finder.js
function wrapFilter(filter) {
  return (...args) => {
    try {
      if (args[0]?.document && args[0]?.window)
        return false;
      if (args[0]?.default?.remove && args[0]?.default?.set && args[0]?.default?.clear && args[0]?.default?.get && !args[0]?.default?.sort)
        return false;
      if (args[0].remove && args[0].set && args[0].clear && args[0].get && !args[0].sort)
        return false;
      if (args[0]?.default?.getToken || args[0]?.default?.getEmail || args[0]?.default?.showToken)
        return false;
      if (args[0]?.getToken || args[0]?.getEmail || args[0]?.showToken)
        return false;
      return filter(...args);
    } catch (err) {
      logger_default.warn("Module filter threw an exception.", filter, err);
      return false;
    }
  };
}
function checkModuleStrings(m, strings, hasNot) {
  const check2 = (s1, s2) => {
    return hasNot ? s1.toString().indexOf(s2.toString()) == -1 : s1.toString().indexOf(s2.toString()) > -1;
  };
  return strings.every((j) => {
    return check2(m?.toString?.() || "", j) || check2(m?.__original__?.toString?.() || "", j) || check2(m?.type?.toString?.() || "", j) || check2(m?.type?.__original__?.toString?.() || "", j) || Object.entries(["function", "object"].includes(typeof m?.prototype) ? typeof m?.prototype : {}).filter((i) => i[0]?.includes?.("render")).some((i) => check2(i[1]?.toString?.() || "", j));
  });
}
function checkModuleProps(m, properties, hasNot) {
  return properties.every((prop) => {
    const value = m[prop]?.__original__ || m[prop];
    return hasNot ? value === void 0 : value !== void 0 && !(typeof value == "string" && !value);
  });
}
function checkModulePrototypes(m, protoProps, hasNot) {
  return m.prototype && protoProps.every((prop) => {
    const value = m.prototype[prop];
    return hasNot ? value === void 0 : value !== void 0 && !(typeof value == "string" && !value);
  });
}
var webpackChunkName = "webpackChunkdiscord_app";
var pushListeners = /* @__PURE__ */ new Set();
{
  let handlePush = function(chunk) {
    const [, modules2] = chunk;
    for (const moduleId in Object.keys(modules2 || {})) {
      const ogModule = modules2[moduleId];
      modules2[moduleId] = (module2, exports, require2) => {
        try {
          ogModule.call(null, module2, exports, require2);
          pushListeners.forEach((listener) => {
            try {
              listener(exports);
            } catch (error) {
              utils_default.logger.error("Push listener threw an exception.", listener, error);
            }
          });
        } catch (error) {
          utils_default.logger.error("Unable to patch pushed module.", error);
        }
      };
      Object.assign(modules2[moduleId], ogModule, {
        __original__: ogModule,
        toString: () => ogModule.toString()
      });
    }
    return ogPush.call(window[webpackChunkName], chunk);
  };
  let ogPush = window[webpackChunkName].push;
  Object.defineProperty(window[webpackChunkName], "push", {
    configurable: true,
    get() {
      return handlePush;
    },
    set(value) {
      ogPush = value;
      Object.defineProperty(window[this.chunkName], "push", {
        value: this.handlePush,
        configurable: true,
        writable: true
      });
    }
  });
}
async function lazyFind(filter, { signal = null, searchExports = false }) {
  return new Promise((resolve, reject) => {
    const cancel = () => pushListeners.delete(listener);
    const listener = (exports) => {
      if (!exports || exports === window || exports === document.documentElement)
        return;
      let found2 = null;
      if (typeof exports == "object" && searchExports) {
        for (const key in exports) {
          let exported = exports[key];
          if (!exported)
            continue;
          if (filter(exported)) {
            found2 = exported;
            break;
          }
        }
      } else {
        let paths = [
          "exports.Z",
          "exports.ZP",
          "exports.default",
          "exports",
          ""
        ];
        found2 = paths.map((i) => {
          let pathed = !i ? exports : _.get(exports, i);
          if (pathed && filter(pathed))
            return pathed;
        }).find((i) => i);
      }
      if (!found2)
        return;
      cancel();
      resolve(found2);
    };
    pushListeners.add(listener);
    signal?.addEventListener("abort", () => {
      cancel();
      resolve(null);
    });
  });
}
function find(req, filter, config = {}) {
  let defaultExport = typeof config.defaultExport != "boolean" ? false : config.defaultExport;
  let unloaded = typeof config.unloaded != "boolean" ? false : config.unloaded;
  let all = typeof config.all != "boolean" ? false : config.all;
  const found2 = [];
  if (!unloaded) {
    for (let i in req.c)
      if (req.c.hasOwnProperty(i)) {
        let m = req.c[i].exports, r = null;
        if (m && (typeof m == "object" || typeof m == "function")) {
          if (!!(r = filter(m, i))) {
            if (all)
              found2.push(defaultExport ? r : req.c[i]);
            else
              return defaultExport ? r : req.c[i];
          } else
            for (let key of Object.keys(m))
              if (key.length < 4 && m[key] && !!(r = filter(m[key], i))) {
                if (all)
                  found2.push(defaultExport ? r : req.c[i]);
                else
                  return defaultExport ? r : req.c[i];
              }
        }
        if (m && m.__esModule && m.default && (typeof m.default == "object" || typeof m.default == "function")) {
          if (!!(r = filter(m.default, i))) {
            if (all)
              found2.push(defaultExport ? r : req.c[i]);
            else
              return defaultExport ? r : req.c[i];
          } else if (m.default.type && (typeof m.default.type == "object" || typeof m.default.type == "function") && !!(r = filter(m.default.type, i))) {
            if (all)
              found2.push(defaultExport ? r : req.c[i]);
            else
              return defaultExport ? r : req.c[i];
          }
        }
      }
  }
  for (let i in req.m)
    if (req.m.hasOwnProperty(i)) {
      let m = req.m[i];
      if (m && typeof m == "function") {
        if (req.c[i] && !unloaded && filter(m, i)) {
          if (all)
            found2.push(defaultExport ? req.c[i].exports : req.c[i]);
          else
            return defaultExport ? req.c[i].exports : req.c[i];
        }
        if (!req.c[i] && unloaded && filter(m, i)) {
          const resolved = {}, resolved2 = {};
          m(resolved, resolved2, req);
          const trueResolved = resolved2 && Object.getOwnPropertyNames(resolved2 || {}).length == 0 ? resolved : resolved2;
          if (all)
            found2.push(defaultExport ? trueResolved.exports : trueResolved);
          else
            return defaultExport ? trueResolved.exports : trueResolved;
        }
      }
    }
  if (all)
    return found2;
}
function finderFindFunction(entries, strings) {
  return entries.find((n) => {
    let funcString = typeof n[1] == "function" ? n[1]?.__original__?.toString?.() || n[1]?.toString?.() || "" : (() => {
      try {
        return JSON.stringify(n[1]);
      } catch (err) {
        return n[1].toString();
      }
    })();
    let renderFuncString = n[1]?.render?.__original__?.toString?.() || n[1]?.render?.toString?.() || "";
    return strings.every((string) => funcString.indexOf(string) != -1 || renderFuncString.indexOf(string) != -1);
  });
}
function finderToFilter(finder) {
  let found = () => false;
  if (typeof finder?.filter === "string") {
    found = wrapFilter(eval(`(($)=>{ try { return (${finder.filter}); } catch { return false; } })`));
  } else if (typeof finder?.filter === "function") {
    found = wrapFilter(finder.filter);
  } else {
    switch (finder.filter.in) {
      case "properties": {
        if (finder.filter.by?.[1]?.length) {
          found = wrapFilter((m) => checkModuleProps(m, finder.filter.by?.[0] || []) && checkModuleProps(m, finder.filter.by?.[1] || [], true));
        } else {
          found = wrapFilter((m) => checkModuleProps(m, finder.filter.by?.[0] || []));
        }
        break;
      }
      case "prototypes": {
        if (finder.filter.by?.[1]?.length) {
          found = wrapFilter((m) => checkModulePrototypes(m, finder.filter.by?.[0] || []) && checkModulePrototypes(m, finder.filter.by?.[1] || [], true));
        } else {
          found = wrapFilter((m) => checkModulePrototypes(m, finder.filter.by?.[0] || []));
        }
        break;
      }
      case "strings": {
        if (finder.filter.by?.[1]?.length) {
          found = wrapFilter((m) => checkModuleStrings(m, finder.filter.by?.[0] || []) && checkModuleStrings(m, finder.filter.by?.[1] || [], true));
        } else {
          found = wrapFilter((m) => checkModuleStrings(m, finder.filter.by?.[0] || []));
        }
        break;
      }
    }
  }
  return found;
}
function finderMap(__original__, map) {
  let __mapped__ = {};
  let temp = {
    __original__,
    __mapped__,
    ...__original__
  };
  Object.entries(map).forEach(([key, strings]) => {
    Object.defineProperty(temp, key, {
      get() {
        if (__mapped__[key])
          return __original__[__mapped__[key]];
        let foundFunc = finderFindFunction(Object.entries(__original__ || {}), map[key] || []);
        if (!foundFunc?.length)
          return;
        __mapped__[key] = foundFunc[0];
        return foundFunc[1];
      }
    });
  });
  return temp;
}
function findByFinder(req, finder2 = {}) {
  const defaultExport = !!finder2?.filter?.export;
  let found2 = find(req, finderToFilter(finder2), { defaultExport, all: true }).find((i) => i !== globalThis.window || i?.exports !== globalThis.window);
  if (!found2)
    return null;
  if (finder2.path?.before)
    found2 = (Array.isArray(finder2.path.before) ? finder2.path.before.map((i) => _.get(found2, i)).find((i) => i) : _.get(found2, finder2.path.before)) || found2;
  if (finder2.assign)
    found2 = Object.assign({}, found2);
  if (!found2)
    return null;
  if (finder2.map)
    found2 = finderMap(found2, finder2.map);
  if (finder2.path?.after)
    found2 = (Array.isArray(finder2.path.after) ? finder2.path.after.map((i) => _.get(found2, i)).find((i) => i) : _.get(found2, finder2.path.after)) || found2;
  return found2;
}
async function lazyFindByFinder(finder2 = {}) {
  let found2 = await lazyFind(finderToFilter(finder2), { searchExports: false });
  if (!found2)
    return null;
  if (finder2.path?.before)
    found2 = (Array.isArray(finder2.path.before) ? finder2.path.before.map((i) => _.get(found2, i)).find((i) => i) : _.get(found2, finder2.path.before)) || found2;
  if (finder2.assign)
    found2 = Object.assign({}, found2);
  if (!found2)
    return null;
  if (finder2.map)
    found2 = finderMap(found2, finder2.map);
  if (finder2.path?.after)
    found2 = (Array.isArray(finder2.path.after) ? finder2.path.after.map((i) => _.get(found2, i)).find((i) => i) : _.get(found2, finder2.path.after)) || found2;
  return found2;
}

// src/api/modules/webpack.js
var webpack_default = {
  __cache__: {},
  get require() {
    if (this.__cache__.require)
      return this.__cache__.require;
    let reqId = `AcordWebpackModules${Date.now()}`;
    const req = window.webpackChunkdiscord_app.push([[reqId], {}, (req2) => req2]);
    delete req.m[reqId];
    delete req.c[reqId];
    window.webpackChunkdiscord_app.pop();
    this.__cache__.require = req;
    return req;
  },
  find(filter, config = {}) {
    return find(this.require, wrapFilter(filter), config);
  },
  lazyFind(filter, config = {}) {
    return lazyFind(wrapFilter(filter), config);
  },
  lazyFindByFinder(finder2) {
    return lazyFindByFinder(finder2);
  },
  filter(filter, config = {}) {
    return find(this.require, wrapFilter(filter), { ...config, all: true });
  },
  findByFinder(finder2) {
    return findByFinder(this.require, finder2);
  },
  findByProperties(...props) {
    return this.findByFinder({
      filter: {
        export: false,
        in: "properties",
        by: [props]
      },
      path: {
        before: [
          "exports.Z",
          "exports.ZP",
          "exports.default",
          "exports"
        ]
      }
    });
  },
  findByPrototypes(...props) {
    return this.findByFinder({
      filter: {
        export: false,
        in: "properties",
        by: [props]
      },
      path: {
        before: [
          "exports.Z",
          "exports.ZP",
          "exports.default",
          "exports"
        ]
      }
    });
  },
  findByStrings(...props) {
    return this.findByFinder({
      filter: {
        export: false,
        in: "properties",
        by: [props]
      },
      path: {
        before: [
          "exports.Z",
          "exports.ZP",
          "exports.default",
          "exports"
        ]
      }
    });
  }
};

// src/api/modules/common.js
function mapObject(temp, inp) {
  if (!temp?.__cache__)
    temp.__cache__ = {};
  for (const key in inp) {
    if (inp?.[key]?.__ === true) {
      Object.defineProperty(temp, key, {
        get() {
          if (temp.__cache__[key])
            return temp.__cache__[key];
          return temp.__cache__[key] = webpack_default.findByFinder(inp[key]);
        }
      });
    } else {
      if (typeof temp[key] === "undefined")
        temp[key] = {};
      mapObject(temp[key], inp[key]);
    }
  }
}
var common = {
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
  }
};
mapObject(common, common_default.common);
{
  let paths = [
    "exports.Z",
    "exports.ZP",
    "exports.default",
    "exports"
  ];
  webpack_default.filter((i) => i?.getName?.()?.endsWith?.("Store"), { defaultExport: false }).forEach((m) => {
    let obj = paths.map((path) => _.get(m, path)).find((i) => i);
    if (!obj)
      return;
    let name = obj?.getName?.();
    if (!name)
      return;
    if (common[name])
      return;
    Object.defineProperty(common, name, {
      get() {
        if (common.__cache__[name])
          return common.__cache__[name];
        return common.__cache__[name] = obj;
      }
    });
  });
}
var common_default2 = common;

// src/api/modules/index.js
var modules_default = {
  common: common_default2,
  webpack: webpack_default,
  require: globalThis["<PRELOAD_KEY>"].require
};

// src/other/utils.js
var isConnectionOpen = false;
function waitUntilConnectionOpen() {
  return new Promise((resolve) => {
    if (isConnectionOpen)
      return resolve(true);
    function onEvent() {
      modules_default.common.FluxDispatcher.unsubscribe("CONNECTION_OPEN", onEvent);
      isConnectionOpen = true;
      resolve(true);
    }
    modules_default.common.FluxDispatcher.subscribe("CONNECTION_OPEN", onEvent);
  });
}

// src/lib/BasicEventEmitter.js
var BasicEventEmitter = class {
  constructor() {
    this.listeners = /* @__PURE__ */ new Map();
  }
  _prepareListenersMap(eventName) {
    if (!this.listeners.has(eventName))
      this.listeners.set(eventName, /* @__PURE__ */ new Map());
  }
  /**
   * @param {string} eventName
   * @param {(...args: any[])=>void} listener
   */
  on(eventName, listener) {
    this._prepareListenersMap(eventName);
    this.listeners.get(eventName).set(listener, { once: false });
    return () => {
      this.listeners.get(eventName).delete(listener);
    };
  }
  /**
   * @param {string} eventName
   * @param {(...args: any[])=>void} listener
   */
  once(eventName, listener) {
    this._prepareListenersMap(eventName);
    this.listeners.get(eventName)?.set(listener, { once: true });
    return () => {
      this.listeners.get(eventName).delete(listener);
    };
  }
  /**
   * @param {string?} eventName
   * @param {((...args: any[])=>void)?} listener
   */
  off(eventName, listener) {
    if (!eventName)
      return this.listeners = /* @__PURE__ */ new Map();
    if (!listener)
      return this.listeners?.delete(eventName);
    this.listeners.get(eventName)?.delete(listener);
  }
  /**
   * @param {string} eventName
   * @param  {...any} args
   */
  emit(eventName, ...args) {
    if (!this.listeners.has(eventName))
      return;
    let eventMap = this.listeners.get(eventName);
    eventMap.forEach(({ once }, listener) => {
      if (once)
        eventMap?.delete(listener);
      listener(...args);
    });
  }
};

// src/api/events/index.js
var events = new BasicEventEmitter();
var events_default = events;

// src/api/dom/index.js
var scrollbarClasses = webpack_default.findByProperties("scrollbarGhostHairline", "spinner");
var formatRegexes = {
  bold: /\*\*([^*]+)\*\*/g,
  italic: /\*([^*]+)\*/g,
  underline: /\_([^*]+)\_/g,
  strike: /\~\~([^*]+)\~\~/g,
  url: /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig,
  inline: /\`([^*]+)\`/g,
  codeblockSingle: /\`\`\`([^*]+)\`\`\`/g,
  codeblockMulti: /\`\`\`(\w+)\n((?:(?!\`\`\`)[\s\S])*)\`\`\`/g
};
var dom_default = {
  parse(html) {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.firstElementChild;
  },
  toCSSProp(o) {
    let elm = document.createElement("div");
    Object.entries(o).forEach((i) => {
      if (elm.style.hasOwnProperty(i[0])) {
        elm.style[i[0]] = i[1];
      } else {
        elm.style.setProperty(i[0], i[1]);
      }
    });
    return elm.getAttribute("style");
  },
  toHTMLProps(o) {
    return Object.entries(o).map(
      (i) => `${i[0].replace(/ +/, "-")}="${i[0] == "style" && typeof i[1] != "string" ? this.toCSSProp(i[1]) : this.escapeHTML(i[1])}"`
    ).join(" ");
  },
  escape(html) {
    return new Option(html).innerHTML;
  },
  /**
   * @param {Element} elm 
   * @param {number|string} selectorOrNumber 
   * @returns {Element[]}
   */
  parents(elm, selectorOrNumber) {
    let parents = [];
    if (typeof selectorOrNumber === "number") {
      for (let i = 0; i < selectorOrNumber; i++) {
        if (elm.parentElement) {
          elm = elm.parentElement;
          parents.push(elm);
        }
      }
    } else {
      while (elm.parentElement && elm.parentElement.closest(selectorOrNumber)) {
        elm = elm.parentElement.closest(selectorOrNumber);
        parents.push(elm);
      }
    }
    return parents;
  },
  patch: (selector, cb) => (() => {
    function nodeAdded(node) {
      if (node.nodeType === Node.TEXT_NODE)
        return;
      node.querySelectorAll(selector).forEach(async (elm) => {
        if (!elm.acord) {
          elm.acord = { unmount: [], patched: /* @__PURE__ */ new Set() };
          elm.classList.add("acord--patched");
        }
        if (elm.acord.patched.has(cb))
          return;
        elm.acord.patched.add(cb);
        let unPatchCb = await cb(elm);
        if (typeof unPatchCb === "function")
          elm.acord.unmount.push(unPatchCb);
      });
    }
    function nodeRemoved(node) {
      if (node.nodeType === Node.TEXT_NODE)
        return;
      node.querySelectorAll(selector).forEach(async (elm) => {
        if (!elm.acord)
          return;
        elm.acord.unmount.forEach((f) => f());
      });
    }
    document.querySelectorAll(selector).forEach(nodeAdded);
    return events_default.on(
      "dom-mutation",
      /** @param {MutationRecord} mut */
      (mut) => {
        if (mut.type === "childList") {
          mut.addedNodes.forEach(nodeAdded);
          mut.removedNodes.forEach(nodeRemoved);
        }
      }
    );
  })(),
  formatContent(msg) {
    if (!msg)
      return "";
    const { bold, italic, underline, strike, codeblockMulti, codeblockSingle, inline, url } = formatRegexes;
    const codeBlocksMap = Object.fromEntries([
      ...msg.matchAll(codeblockMulti) || [],
      ...msg.matchAll(codeblockSingle) || []
    ].map(
      ([_2, codeBlockOrCode, codeBlockContent], i) => {
        msg = msg.replace(_2, `{{CODEBLOCK_${i}}}`);
        return [
          `{{CODEBLOCK_${i}}}`,
          codeBlockContent ? `<pre><code class="${scrollbarClasses.scrollbarGhostHairline} hljs ${codeBlockOrCode}" style="position: relative;">${modules.common.hljs.highlight(codeBlockOrCode, codeBlockContent).value}</code></pre>` : `<pre><code class="${scrollbarClasses.scrollbarGhostHairline} hljs" style="position: relative;">${codeBlockOrCode}</code></pre>`
        ];
      }
    ));
    const inlineMap = Object.fromEntries(
      [...msg.matchAll(inline) || []].map(
        ([_2, inlineContent], i) => {
          msg = msg.replace(_2, `{{INLINE_${i}}}`);
          return [`{{INLINE_${i}}}`, `<code class="inline">${inlineContent}</code>`];
        }
      )
    );
    msg = msg.replace(bold, "<b>$1</b>").replace(italic, "<i>$1</i>").replace(underline, "<U>$1</U>").replace(strike, "<s>$1</s>").replace(url, '<a href="$1">$1</a>');
    for (const [key, value] of Object.entries(codeBlocksMap)) {
      msg = msg.replace(key, value);
    }
    for (const [key, value] of Object.entries(inlineMap)) {
      msg = msg.replace(key, value);
    }
    return msg;
  },
  resolve(htmlOrElm) {
    if (htmlOrElm instanceof Element)
      return htmlOrElm;
    return this.parse(htmlOrElm);
  }
};
{
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      events_default.emit("dom-mutation", mutation);
    });
  });
  observer.observe(document, {
    attributes: true,
    childList: true,
    subtree: true
  });
}

// src/lib/spitroast/dist/esm/shared.js
var patchTypes = ["a", "b", "i"];
var patchedObjects = /* @__PURE__ */ new Map();

// src/lib/spitroast/dist/esm/hook.js
function hook_default(funcName, funcParent, funcArgs, ctxt, isConstruct) {
  const patch = patchedObjects.get(funcParent)?.[funcName];
  if (!patch)
    return isConstruct ? Reflect.construct(funcParent[funcName], funcArgs, ctxt) : funcParent[funcName].apply(ctxt, funcArgs);
  for (const hook of patch.b.values()) {
    const maybefuncArgs = hook.call(ctxt, funcArgs);
    if (Array.isArray(maybefuncArgs))
      funcArgs = maybefuncArgs;
  }
  let insteadPatchedFunc = (...args) => isConstruct ? Reflect.construct(patch.o, args, ctxt) : patch.o.apply(ctxt, args);
  for (const callback of patch.i.values()) {
    const oldPatchFunc = insteadPatchedFunc;
    insteadPatchedFunc = (...args) => callback.call(ctxt, args, oldPatchFunc);
  }
  let workingRetVal = insteadPatchedFunc(...funcArgs);
  for (const hook of patch.a.values())
    workingRetVal = hook.call(ctxt, funcArgs, workingRetVal) ?? workingRetVal;
  return workingRetVal;
}

// src/lib/spitroast/dist/esm/un-patch.js
function unPatch(funcParent, funcName, hookId, type) {
  const patchedObject = patchedObjects.get(funcParent);
  const patch = patchedObject?.[funcName];
  if (!patch?.[type].has(hookId))
    return false;
  patch[type].delete(hookId);
  if (patchTypes.every((t) => patch[t].size === 0)) {
    const success = Reflect.defineProperty(funcParent, funcName, {
      value: patch.o,
      writable: true,
      configurable: true
    });
    if (!success)
      funcParent[funcName] = patch.o;
    delete patchedObject[funcName];
  }
  if (Object.keys(patchedObject).length == 0)
    patchedObjects.delete(funcParent);
  return true;
}
function unPatchAll() {
  for (const [parentObject, patchedObject] of patchedObjects.entries())
    for (const funcName in patchedObject)
      for (const hookType of patchTypes)
        for (const hookId of patchedObject[funcName]?.[hookType].keys() ?? [])
          unPatch(parentObject, funcName, hookId, hookType);
}

// src/lib/spitroast/dist/esm/get-patch-func.js
var get_patch_func_default = (patchType) => (funcName, funcParent, callback, oneTime = false) => {
  if (typeof funcParent[funcName] !== "function")
    throw new Error(`${funcName} is not a function in ${funcParent.constructor.name}`);
  if (!patchedObjects.has(funcParent))
    patchedObjects.set(funcParent, {});
  const parentInjections = patchedObjects.get(funcParent);
  if (!parentInjections[funcName]) {
    const origFunc = funcParent[funcName];
    parentInjections[funcName] = {
      o: origFunc,
      b: /* @__PURE__ */ new Map(),
      i: /* @__PURE__ */ new Map(),
      a: /* @__PURE__ */ new Map()
    };
    const runHook = (ctxt, args, construct) => {
      const ret = hook_default(funcName, funcParent, args, ctxt, construct);
      if (oneTime)
        unpatchThisPatch();
      return ret;
    };
    const replaceProxy = new Proxy(origFunc, {
      apply: (_2, ctxt, args) => runHook(ctxt, args, false),
      construct: (_2, args) => runHook(origFunc, args, true),
      get: (target, prop, receiver) => prop == "toString" ? origFunc.toString.bind(origFunc) : Reflect.get(target, prop, receiver)
    });
    const success = Reflect.defineProperty(funcParent, funcName, {
      value: replaceProxy,
      configurable: true,
      writable: true
    });
    if (!success)
      funcParent[funcName] = replaceProxy;
    funcParent[funcName].__original__ = parentInjections[funcName].o;
  }
  const hookId = Symbol();
  const unpatchThisPatch = () => unPatch(funcParent, funcName, hookId, patchType);
  parentInjections[funcName][patchType].set(hookId, callback);
  return unpatchThisPatch;
};

// src/lib/spitroast/dist/esm/index.js
var before = get_patch_func_default("b");
var instead = get_patch_func_default("i");
var after = get_patch_func_default("a");

// src/api/patcher/index.js
var patcher_default = {
  __cache__: {
    patched: patchedObjects
  },
  before,
  after,
  instead,
  unPatchAll,
  injectCSS(css) {
    const style = document.createElement("style");
    style.className = `acord--injected-css`;
    style.textContent = css;
    document.head.appendChild(style);
    return () => {
      style?.remove();
    };
  },
  unPatchAllCSS() {
    document.querySelectorAll(".acord--injected-css").forEach((element) => {
      element.remove();
    });
  }
};

// src/other/loading-animation/style.scss
var style_default = `
@keyframes acordLoadingFade{0%{opacity:.1}100%{opacity:.9}}.acord--startup-loading{animation:acordLoadingFade .5s alternate infinite linear;position:absolute;transition:all .5s linear;right:8px;bottom:8px;width:16px;height:16px;background-image:url("https://raw.githubusercontent.com/AcordPlugin/assets/main/Acord.svg");filter:grayscale(1) brightness(1);background-position:center;background-repeat:no-repeat;background-size:contain;z-index:999999}.acord--startup-loading.hidden{opacity:0 !important}`;

// src/other/loading-animation/index.js
var unInject;
async function show() {
  if (document.querySelector(".acord--startup-loading"))
    return;
  while (true) {
    if (document.querySelector("#app-mount"))
      break;
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  console.log("acord--startup-loading");
  unInject = patcher_default.injectCSS(style_default);
  const element = dom_default.parse(`
    <div class="acord--startup-loading"></div>
  `);
  document.querySelector("#app-mount").appendChild(element);
}
function hide() {
  let elm = document.querySelector(".acord--startup-loading");
  if (elm) {
    elm.classList.add("hidden");
    setTimeout(() => {
      elm.remove();
      unInject?.();
      unInject = null;
    }, 500);
  }
}
var loading_animation_default = {
  show,
  hide
};

// src/api/dev/index.js
var devModeEnabled = false;
var dev_default = {
  get enabled() {
    return devModeEnabled;
  },
  set enabled(value) {
    if (!globalThis["<PRELOAD_KEY>"].isDevToolsOpen())
      throw new Error("Dev mode status can only be modified when DevTools is open!");
    devModeEnabled = value;
  }
};

// src/api/i18n/index.js
var BASE_URL = "https://raw.githubusercontent.com/AcordPlugin/i18n/main";
var noStore2 = { cache: "no-store" };
var out = {
  __cache__: {
    localeIds: [],
    localizations: {}
  },
  get locale() {
    return modules_default.common.i18n._requestedLocale;
  },
  get(key) {
    check();
    return out.__cache__.localizations[out.locale]?.[key] || out.__cache__.localizations.default?.[key] || modules_default.common.i18n.Messages[key] || key;
  },
  messages: new Proxy({}, {
    get(_2, prop) {
      return out.get(prop);
    }
  }),
  localize(str) {
    if (typeof str === "string")
      return str;
    return str?.[out.locale] || str?.default || Object.values(str)[0];
  },
  format(key, ...args) {
    return utils_default.format(out.get(key), ...args);
  }
};
async function check() {
  const locale = out.locale;
  if (!out.__cache__.localeIds.length) {
    try {
      out.__cache__.localeIds = await (await fetch(`${BASE_URL}/locales.json`, noStore2)).json();
    } catch {
    }
    try {
      out.__cache__.localizations.default = await (await fetch(`${BASE_URL}/default.json`, noStore2)).json();
    } catch {
    }
  }
  if (out.__cache__.localeIds.includes(locale) && !out.__cache__.localizations?.[locale]) {
    try {
      out.__cache__.localizations[locale] = await (await fetch(`${BASE_URL}/${locale}.json`, noStore2)).json();
    } catch {
    }
    ;
  }
}
check();
var i18n_default = out;

// src/api/storage/index.js
var nests = __toESM(require_cjs(), 1);

// node_modules/idb-keyval/dist/index.js
function promisifyRequest(request) {
  return new Promise((resolve, reject) => {
    request.oncomplete = request.onsuccess = () => resolve(request.result);
    request.onabort = request.onerror = () => reject(request.error);
  });
}
function createStore(dbName, storeName) {
  const request = indexedDB.open(dbName);
  request.onupgradeneeded = () => request.result.createObjectStore(storeName);
  const dbp = promisifyRequest(request);
  return (txMode, callback) => dbp.then((db) => callback(db.transaction(storeName, txMode).objectStore(storeName)));
}
var defaultGetStoreFunc;
function defaultGetStore() {
  if (!defaultGetStoreFunc) {
    defaultGetStoreFunc = createStore("keyval-store", "keyval");
  }
  return defaultGetStoreFunc;
}
function get(key, customStore = defaultGetStore()) {
  return customStore("readonly", (store) => promisifyRequest(store.get(key)));
}
function set(key, value, customStore = defaultGetStore()) {
  return customStore("readwrite", (store) => {
    store.put(value, key);
    return promisifyRequest(store.transaction);
  });
}

// src/lib/json-decycled/index.js
function deCycler(val, config) {
  config = typeof config === "number" ? { deep: config } : config || {};
  config.deep = config.deep || 10;
  return decycleWalker([], [], val, config);
}
function deCycled(val, config) {
  config = typeof config === "number" ? { deep: config } : config || {};
  val = deCycler(val, config);
  try {
    return JSON.stringify(val, void 0, config.spacer);
  } catch (e) {
    return e;
  }
}
var reviverDate = /^\[Date:((\d{4}-\d{2}-\d{2})[A-Z]+(\d{2}:\d{2}:\d{2}).([0-9+-:]+)Z)\]$/;
var reviverRegExp = /^\[Regexp:\/(.+)\/\]$/;
var reviverError = /^\[Error:([\W\w]+)\]$/;
var reviverFunction = /^\[Function:(.+)\]$/;
function revive(val, functions) {
  try {
    return JSON.parse(val, reviver);
  } catch (e) {
    return e;
  }
  function reviver(key, val2) {
    if (reviverDate.test(val2)) {
      val2 = reviverDate.exec(val2);
      val2 = new Date(val2[1]);
      return new Date(val2);
    } else if (reviverRegExp.test(val2)) {
      val2 = reviverRegExp.exec(val2)[1];
      return new RegExp(val2);
    } else if (reviverError.test(val2)) {
      val2 = reviverError.exec(val2)[1];
      var error = new Error(val2.split("\n")[0]);
      if (error.stack) {
        error.stack = val2;
      }
      return error;
    } else if (functions && reviverFunction.test(val2)) {
      val2 = reviverFunction.exec(val2)[1];
      try {
        return new Function("return " + val2 + ";")();
      } catch (error2) {
        return error2;
      }
    } else {
      return val2;
    }
  }
}
function decycleWalker(parents, path, val, config) {
  if (["undefined", "number", "boolean", "string"].indexOf(typeof val) >= 0 || val === null) {
    return val;
  } else if (typeof val === "object" && val.constructor === Date) {
    return config.dates !== false ? "[Date:" + val.toISOString() + "]" : val;
  } else if (typeof val === "object" && val.constructor === RegExp) {
    return config.regexps !== false ? "[Regexp:" + val.toString() + "]" : val;
  } else if (typeof val === "object" && val.constructor && typeof val.constructor.name === "string" && val.constructor.name.slice(-5) === "Error") {
    var stack = (val.stack || "").split("\n").slice(1);
    var message = val.message || val.toString();
    var error = message + "\n" + stack;
    return config.errors !== false ? "[Error:" + error + "]" : val;
  } else if (typeof val === "object") {
    if (parents.indexOf(val) >= 0) {
      var point = path.slice(0, parents.indexOf(val)).join(".");
      return "[Circular" + (point ? ":" + point : "") + "]";
    } else {
      var copy, i, k, l;
      if (val.constructor && typeof val.constructor.name === "string" && val.constructor.name.slice(-5) === "Array") {
        if (parents.length >= config.deep) {
          return "[Array:" + val.constructor.name + "]";
        } else {
          copy = [];
          for (i = 0, l = val.length; i < l; i++) {
            copy[i] = decycleWalker(parents.concat([val]), path.concat(i), val[i], config);
          }
          return copy;
        }
      } else {
        if (parents.length >= config.deep) {
          return "[Object:" + (val.constructor && val.constructor.name ? val.constructor.name : "Object") + "]";
        } else {
          copy = {};
          for (i = 0, k = Object.keys(val), l = k.length; i < l; i++) {
            copy[k[i]] = decycleWalker(parents.concat([val]), path.concat([k[i]]), val[k[i]], config);
          }
          return copy;
        }
      }
    }
  } else if (typeof val === "function") {
    return config.functions === true ? "[Function:" + val.toString() + "]" : void 0;
  } else {
    return val.toString();
  }
}

// src/api/storage/index.js
var storage_default = {
  async createPersistNest(suffix) {
    let cached = await get(`AcordStore;${suffix}`);
    if (typeof cached == "string")
      cached = revive(cached);
    const nest = nests.make(cached ?? {});
    const save = () => {
      try {
        set(`AcordStore;${suffix}`, deCycled({ ...nest.ghost }));
      } catch {
        set(`AcordStore;${suffix}`, deCycled({}));
      }
    };
    nest.on(nests.Events.SET, save);
    nest.on(nests.Events.UPDATE, save);
    nest.on(nests.Events.DELETE, save);
    return nest;
  }
};

// src/api/extensions/i18n.js
async function buildExtensionI18N(cfg) {
  if (!cfg?.i18n)
    return null;
  let out3 = {
    __cache__: {
      localeIds: [],
      localizations: {}
    },
    format(key, ...args) {
      return utils_default.format(out3.get(key), ...args);
    },
    get(key) {
      if (typeof cfg.i18n === "string")
        check2();
      return out3.__cache__.localizations[out3.locale]?.[key] || out3.__cache__.localizations.default?.[key] || out3.get(key);
    },
    messages: new Proxy({}, {
      get(_2, prop) {
        return out3.get(prop);
      }
    })
  };
  async function check2() {
    const locale = i18n_default.locale;
    if (typeof cfg.i18n === "string") {
      const BASE_URL2 = cfg.i18n.endsWith("/") ? cfg.i18n.slice(0, -1) : cfg.i18n;
      if (!out3.__cache__.localeIds.length) {
        try {
          out3.__cache__.localeIds = await (await fetch(`${BASE_URL2}/locales.json`, noStore)).json();
        } catch {
        }
        try {
          out3.__cache__.localizations.default = await (await fetch(`${BASE_URL2}/default.json`, noStore)).json();
        } catch {
        }
      }
      if (out3.__cache__.localeIds.includes(locale) && !out3.__cache__.localizations?.[locale]) {
        try {
          out3.__cache__.localizations[locale] = await (await fetch(`${BASE_URL2}/${locale}.json`, noStore)).json();
        } catch {
        }
        ;
      }
    } else {
      out3.__cache__.localeIds = Object.keys(cfg.i18n);
      out3.__cache__.localizations = cfg.i18n;
    }
  }
  await check2();
  return out3;
}

// src/api/extensions/index.js
var nests2 = __toESM(require_cjs(), 1);
async function buildAPI(cfg) {
  const persist = await storage_default.createPersistNest(`Extension;Persist;${cfg.about.slug}`);
  const out3 = {
    modules: {
      __cache__: {
        common: {},
        node: {},
        custom: {},
        customLazy: {}
      },
      require(name) {
        if (!dev_default.enabled) {
          if (typeof out3.modules.__cache__.node[name] !== "undefined")
            return out3.modules.__cache__.node[name];
          if (cfg?.modules?.node?.some?.((i) => i.name === name))
            return out3.modules.__cache__.node[name] = modules_default.require(name);
        } else {
          return modules_default.require(name);
        }
        return null;
      },
      common: new Proxy({}, {
        get(_2, prop) {
          if (!dev_default.enabled) {
            if (typeof out3.modules.__cache__.common[prop] !== "undefined")
              return out3.modules.__cache__.common[prop];
            if (cfg?.modules?.common?.some?.((i) => i.name === prop))
              return out3.modules.__cache__.common[prop] = modules_default.common[prop];
          } else {
            return modules_default.common[prop];
          }
          return null;
        }
      }),
      custom: new Proxy({}, {
        get(_2, prop) {
          if (typeof out3.modules.__cache__.custom[prop] !== "undefined")
            return out3.modules.__cache__.custom[prop];
          let data = cfg?.modules?.custom?.some?.((i) => i.name === prop);
          if (!data)
            return null;
          if (data.lazy) {
            let prom = new Promise(async (resolve, reject) => {
              let r = await modules_default.webpack.lazyFindByFinder(data.finder);
              out3.modules.__cache__.customLazy[prop] = r;
              resolve(r);
            });
            out3.modules.__cache__.custom[prop] = {
              get() {
                return prom;
              },
              get value() {
                return out3.modules.__cache__.customLazy[prop];
              }
            };
          } else {
            let value = modules_default.webpack.findByFinder(data.finder);
            try {
              if (typeof value?.value !== "undefined") {
                out3.modules.__cache__.custom[prop] = value ? Object.assign(value, { value, get() {
                  return value;
                } }) : null;
              } else {
                out3.modules.__cache__.custom[prop] = value;
              }
            } catch {
              out3.modules.__cache__.custom[prop] = value ? { value, get() {
                return value;
              } } : null;
            }
          }
          return out3.modules.__cache__.custom[prop];
        }
      })
    },
    i18n: i18n_default,
    extension: {
      config: JSON.parse(JSON.stringify(cfg)),
      persist,
      i18n: await buildExtensionI18N(cfg),
      events: new BasicEventEmitter()
    }
  };
  return out3;
}
var out2 = {
  __cache__: {
    initialized: false,
    loaded: nests2.make({})
  },
  storage: {
    /** @type {nests.Nest} */
    installed: {}
  },
  buildAPI,
  async init() {
    if (out2.__cache__.initialized)
      return;
    out2.__cache__.initialized = true;
    out2.storage.installed = await storage_default.createPersistNest("Extensions;Installed");
  },
  /**
   * @param {string} url 
   */
  async install(url, defaultConfig = {}) {
    if (!out2.__cache__.initialized)
      await out2.init();
    if (url.endsWith("/"))
      url = url.slice(0, -1);
    if (out2.storage.installed.ghost[url])
      throw new Error(`"${url}" extension is already installed.`);
    let metaResp = await fetch(`${url}/metadata.json`);
    if (metaResp.status !== 200)
      throw new Error(`"${url}" extension metadata is not responded with 200 status code.`);
    let metadata = await metaResp.json();
    let readmeResp = await fetch(`${url}/readme.md`);
    let readme = readmeResp.status === 200 ? await readmeResp.text() : null;
    let sourceResp = await fetch(`${url}/source.js`);
    if (sourceResp.status !== 200)
      throw new Error(`"${url}" extension source is not responded with 200 status code.`);
    let source2 = await sourceResp.text();
    out2.storage.installed.store[url] = {
      metadata: {
        current: metadata,
        last: metadata
      },
      source: source2,
      readme,
      config: {
        autoUpdate: true,
        enabled: true,
        ...defaultConfig
      }
    };
    out2.load(url);
  },
  async uninstall(url) {
    if (!out2.__cache__.initialized)
      await out2.init();
    if (!out2.storage.installed.ghost[url])
      throw new Error(`"${url}" extension is not installed.`);
    delete out2.storage.installed.store[url];
    try {
      await out2.unload(url);
    } catch {
    }
  },
  async load(url) {
    if (!out2.__cache__.initialized)
      await out2.init();
    if (!out2.storage.installed.ghost[url])
      throw new Error(`"${url}" extension is not installed.`);
    let data = out2.storage.installed.ghost[url];
    if (out2.__cache__.loaded.ghost[url])
      throw new Error(`"${url}" extension is already loaded.`);
    let api2 = await out2.buildAPI(data.metadata);
    let evaluated = out2.evaluate(data.source, api2);
    await evaluated?.load?.();
    out2.__cache__.loaded.store[url] = {
      evaluated,
      api: api2
    };
  },
  async unload(url) {
    if (!out2.__cache__.initialized)
      await out2.init();
    if (!out2.storage.installed.ghost[url])
      throw new Error(`"${url}" extension is not installed.`);
    if (!out2.__cache__.loaded.ghost[url])
      throw new Error(`"${url}" extension is not loaded.`);
    let { evaluated } = out2.__cache__.loaded.ghost[url];
    await evaluated?.unload?.();
    delete out2.__cache__.loaded.store[url];
  },
  evaluate(source, api) {
    const $acord = api;
    return eval(source);
  },
  async loadAll() {
    if (!out2.__cache__.initialized)
      await out2.init();
    return Promise.all(Object.keys(out2.storage.installed.ghost).map((url) => out2.load(url)));
  }
};
var extensions_default = out2;

// src/api/internal/index.js
var internal_default = {
  process: globalThis["<PRELOAD_KEY>"].process,
  isDevToolsOpen: globalThis["<PRELOAD_KEY>"].isDevToolsOpen
};

// src/api/ui/styles.scss
var styles_default = `
.acord--layer-container{--top-offset: 0px;width:100vw;height:calc(100vh - var(--top-offset));z-index:9999999;pointer-events:none;position:absolute;top:var(--top-offset);left:0px}.acord--layer-container *{z-index:99999999999999}.acord--tooltip-layer{opacity:0;transition:50ms linear opacity;position:absolute;pointer-events:none}.acord--tooltip-layer.visible{opacity:1;pointer-events:all}.acord--tooltip.vertical{transform:translateX(-50%)}.acord--tooltip.horizontal{transform:translateY(-50%)}.acord--notification-layer{width:100vw;height:calc(100vh - var(--top-offset));display:flex;position:absolute;top:0;left:0;pointer-events:none}.acord--notification-layer .acord--notification{display:flex;flex-direction:column;pointer-events:all;transition:transform 250ms ease-in-out,opacity 250ms ease-in-out;margin:4px;backdrop-filter:blur(16px) brightness(0.75);-webkit-app-region:no-drag;--animation-size: 50px}.acord--notification-layer .acord--notification.hidden,.acord--notification-layer .acord--notification.closing{opacity:0}.acord--notification-layer .acord--notification>.container{display:flex;align-items:center;justify-content:space-between;padding:8px;color:#fff;min-width:250px}.acord--notification-layer .acord--notification>.container>.close{width:24px;height:24px;color:#fff;opacity:.5;cursor:pointer;margin-left:8px;z-index:999999999}.acord--notification-layer .acord--notification>.container>.close.hidden{display:none}.acord--notification-layer .acord--notification>.progress-container{width:100%;height:5px}.acord--notification-layer .acord--notification>.progress-container>.progress{width:0%;height:5px;transition:width var(--duration) linear;background-color:var(--bar-color)}.acord--notification-layer .acord--notification>.progress-container>.progress.progressing{width:100%}.acord--notification-layer .acord--notification.style-info{--bar-color: #4a8fe1}.acord--notification-layer .acord--notification.style-warning{--bar-color: #faa81a}.acord--notification-layer .acord--notification.style-error{--bar-color: #ed4245}.acord--notification-layer .acord--notification.style-success{--bar-color: #3ba55d}.acord--notification-layer .acord--notification.style-default{--bar-color: whitesmoke}.acord--notification-layer.top-right{justify-content:flex-end;align-items:flex-start}.acord--notification-layer.top-right .acord--notification.hidden{transform:translate(0, calc(var(--animation-size) * -1))}.acord--notification-layer.top-right .acord--notification.closing{transform:translate(0, var(--animation-size))}.acord--notification-layer.top-left{justify-content:flex-start;align-items:flex-start}.acord--notification-layer.top-left .acord--notification.hidden{transform:translate(0, calc(var(--animation-size) * -1))}.acord--notification-layer.top-left .acord--notification.closing{transform:translate(0, var(--animation-size))}.acord--notification-layer.bottom-right{justify-content:flex-end;align-items:flex-end}.acord--notification-layer.bottom-right .acord--notification.hidden{transform:translate(0, var(--animation-size))}.acord--notification-layer.bottom-right .acord--notification.closing{transform:translate(0, calc(var(--animation-size) * -1))}.acord--notification-layer.bottom-left{justify-content:flex-start;align-items:flex-end}.acord--notification-layer.bottom-left .acord--notification.hidden{transform:translate(0, var(--animation-size))}.acord--notification-layer.bottom-left .acord--notification.closing{transform:translate(0, calc(var(--animation-size) * -1))}.acord--notification-layer.top-center{justify-content:center;align-items:flex-start}.acord--notification-layer.top-center .acord--notification.hidden{transform:translate(0, calc(var(--animation-size) * -1))}.acord--notification-layer.top-center .acord--notification.closing{transform:translate(0, var(--animation-size))}.acord--notification-layer.bottom-center{justify-content:center;align-items:flex-end}.acord--notification-layer.bottom-center .acord--notification.hidden{transform:translate(0, var(--animation-size))}.acord--notification-layer.bottom-center .acord--notification.closing{transform:translate(0, calc(var(--animation-size) * -1))}.acord--notification-layer.center{justify-content:center;align-items:center}.acord--notification-layer.center .acord--notification.hidden{transform:scale(0.5)}.acord--notification-layer.center .acord--notification.closing{transform:scale(0.5)}.acord--notification-layer.left-center{justify-content:flex-start;align-items:center}.acord--notification-layer.left-center .acord--notification.hidden{transform:translate(calc(var(--animation-size) * -1), 0)}.acord--notification-layer.left-center .acord--notification.closing{transform:translate(var(--animation-size), 0)}.acord--notification-layer.right-center{justify-content:flex-end;align-items:center}.acord--notification-layer.right-center .acord--notification.hidden{transform:translate(var(--animation-size), 0)}.acord--notification-layer.right-center .acord--notification.closing{transform:translate(calc(var(--animation-size) * -1), 0)}`;

// src/api/ui/tooltips.js
var tooltipClasses = webpack_default.findByProperties("tooltipContentAllowOverflow", "tooltip");
var tooltipPositions = {
  top: tooltipClasses.tooltipTop,
  bottom: tooltipClasses.tooltipBottom,
  left: tooltipClasses.tooltipLeft,
  right: tooltipClasses.tooltipRight
};
var Tooltip = class {
  /**
   * @param {HTMLDivElement} target 
   * @param {string|HTMLDivElement} content
   */
  constructor(target, content, position = "auto") {
    this.layerElement = dom_default.parse(`
      <div class="acord--tooltip-layer">
        <div class="${tooltipClasses.tooltip} ${tooltipClasses.tooltipPrimary} acord--tooltip">
          <div class="${tooltipClasses.tooltipPointer} acord--tooltip-pointer"></div>
          <div class="${tooltipClasses.tooltipContent} acord--tooltip-content"></div>
        </div>
      </div>
    `);
    this.tooltipElement = this.layerElement.querySelector(".acord--tooltip");
    this.contentElement = this.layerElement.querySelector(".acord--tooltip-content");
    this.content = content;
    this.target = target;
    this.position = position;
    this.visible = false;
    this.disabled = false;
    this.paused = false;
    const onMouseEnter = () => {
      if (this.disabled || this.paused)
        return;
      this.show();
    };
    const onMouseLeave = () => {
      if (this.paused)
        return;
      this.hide();
    };
    this.target.addEventListener("mouseenter", onMouseEnter);
    this.target.addEventListener("mouseleave", onMouseLeave);
    let unPatchObserver = events_default.on(
      "dom-mutation",
      /** @param {MutationRecord} mut */
      (mut) => {
        if (mut.type === "attributes") {
          if (mut.target.isSameNode(this.target)) {
            switch (mut.attributeName) {
              case "acord--tooltip-disabled": {
                this.disabled = this.target.getAttribute("acord--tooltip-disabled") === "true";
                break;
              }
              case "acord--tooltip-content": {
                this.content = this.target.getAttribute("acord--tooltip-content");
                break;
              }
              case "acord--tooltip-position": {
                this.position = this.target.getAttribute("acord--tooltip-position");
                break;
              }
            }
          }
        }
      }
    );
    this.destroy = () => {
      this.target.removeEventListener("mouseenter", onMouseEnter);
      this.target.removeEventListener("mouseleave", onMouseLeave);
      this.hide();
      unPatchObserver();
    };
  }
  get content() {
    return this.contentElement.firstElementChild;
  }
  set content(value) {
    if (typeof value === "string") {
      this.contentElement.innerHTML = value;
    } else {
      this.contentElement.innerHTML = "";
      this.contentElement.appendChild(value);
    }
  }
  static getContainer() {
    const appElm = document.querySelector('[class*="notDevTools-"]');
    let container = appElm.querySelector(".acord--tooltip-container");
    if (!container) {
      container = dom_default.parse(`<div class="acord--layer-container acord--tooltip-container"></div>`);
      appElm.appendChild(container);
    }
    container.style.setProperty("--top-offset", `${appElm.getBoundingClientRect().top.toFixed(1)}px`);
    return container;
  }
  show() {
    if (this.visible)
      return;
    this.visible = true;
    const container = Tooltip.getContainer();
    if (this.position === "auto") {
      this.calculatePosition(
        this.canShowAtTop ? "top" : this.canShowAtBottom ? "bottom" : this.canShowAtLeft ? "left" : this.canShowAtRight ? "right" : "top"
      );
    } else {
      this.calculatePosition(this.position);
    }
    container.appendChild(this.layerElement);
    this.layerElement.classList.add("visible");
  }
  calculatePosition(position) {
    const boundingRect = this.target.getBoundingClientRect();
    this.layerElement.classList.remove(...Object.values(tooltipPositions));
    this.tooltipElement.classList.remove("vertical", "horizontal");
    switch (position) {
      case "top": {
        this.layerElement.style.top = `${boundingRect.top - this.target.offsetHeight - 10}px`;
        this.layerElement.style.left = `${boundingRect.left}px`;
        this.layerElement.classList.add(tooltipPositions.top);
        this.tooltipElement.classList.add("vertical");
        this.centerPosition("horizontal");
        break;
      }
      case "bottom": {
        this.layerElement.style.top = `${boundingRect.top + this.target.offsetHeight + 10}px`;
        this.layerElement.style.left = `${boundingRect.left}px`;
        this.layerElement.classList.add(tooltipPositions.bottom);
        this.tooltipElement.classList.add("vertical");
        this.centerPosition("horizontal");
        break;
      }
      case "left": {
        this.layerElement.style.top = `${boundingRect.top}px`;
        this.layerElement.style.left = `${boundingRect.left - this.target.offsetWidth - 10}px`;
        this.layerElement.classList.add(tooltipPositions.left);
        this.tooltipElement.classList.add("horizontal");
        this.centerPosition("vertical");
        break;
      }
      case "right": {
        this.layerElement.style.top = `${boundingRect.top}px`;
        this.layerElement.style.left = `${boundingRect.left + this.target.offsetWidth + 10}px`;
        this.layerElement.classList.add(tooltipPositions.right);
        this.tooltipElement.classList.add("horizontal");
        this.centerPosition("vertical");
        break;
      }
    }
  }
  centerPosition(direction) {
    switch (direction) {
      case "horizontal": {
        const center = this.target.getBoundingClientRect().left + this.target.offsetWidth / 2;
        this.layerElement.style.setProperty("left", `${center - this.layerElement.offsetWidth / 2}px`);
        break;
      }
      case "vertical": {
        const center = this.target.getBoundingClientRect().top + this.target.offsetHeight / 2;
        this.layerElement.style.setProperty("top", `${center - this.layerElement.offsetHeight / 2}px`);
      }
    }
  }
  hide() {
    if (!this.visible)
      return;
    this.visible = false;
    this.layerElement.classList.remove("visible");
    setTimeout(() => {
      this.layerElement.remove();
    }, 50);
  }
  get canShowAtTop() {
    return this.target.getBoundingClientRect().top - this.layerElement.offsetHeight >= 0;
  }
  get canShowAtBottom() {
    return this.target.getBoundingClientRect().top + this.target.offsetHeight + this.layerElement.offsetHeight <= window.innerHeight;
  }
  get canShowAtLeft() {
    return this.target.getBoundingClientRect().left - this.layerElement.offsetWidth >= 0;
  }
  get canShowAtRight() {
    return this.target.getBoundingClientRect().left + this.target.offsetWidth + this.layerElement.offsetWidth <= window.innerWidth;
  }
};
function create(target, content, position = "auto") {
  return new Tooltip(target, content, position);
}
dom_default.patch(
  "[acord--tooltip-content]",
  (elm) => {
    let tooltip = create(elm, elm.getAttribute("acord--tooltip-content"), elm.getAttribute("acord--tooltip-position"));
    tooltip.disabled = elm.getAttribute("acord--tooltip-disabled") === "true";
    return () => {
      tooltip.destroy();
    };
  }
);
var tooltips_default = { create };

// src/api/ui/notifications.js
var validPositions = [
  "top-right",
  "top-left",
  "bottom-right",
  "bottom-left",
  "top-center",
  "bottom-center",
  "center",
  "left-center",
  "right-center"
];
function getContainer(position) {
  if (!validPositions.includes(position))
    throw new Error(`Invalid position "${position}". Valid positions are: ${validPositions.join(", ")}`);
  const appElm = document.querySelector('[class*="notAppAsidePanel-"]');
  let topContainer = appElm.querySelector(".acord--notification-layer-container");
  if (!topContainer) {
    topContainer = dom_default.parse(`<div class="acord--layer-container acord--notification-layer-container"></div>`);
    appElm.appendChild(topContainer);
  }
  topContainer.style.setProperty("--top-offset", `${appElm.getBoundingClientRect().top.toFixed(1)}px`);
  let positionContainer = topContainer.querySelector(`.acord--notification-layer.${position}`);
  if (!positionContainer) {
    positionContainer = dom_default.parse(`<div class="acord--notification-layer ${position}"></div>`);
    topContainer.appendChild(positionContainer);
  }
  return positionContainer;
}
function show2(content, {
  style = "default",
  timeout = 1e4,
  position = "top-right",
  closable = true,
  onClick = null,
  onClose = null
} = {}) {
  const container = getContainer(position);
  const notifElm = dom_default.parse(`
    <div class="acord--notification style-${style} hidden">
        <div class="container">
            <div class="content"></div>
            <svg class="close ${!closable ? "hidden" : ""}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="currentColor" d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"/>
            </svg>
        </div>
        <div class="progress-container" style="--duration: ${timeout}ms;">
            <div class="progress"></div>
        </div>
    </div>
  `);
  notifElm.querySelector(".content").innerHTML = content;
  let closed = false;
  function close(closeType) {
    if (closed)
      return;
    closed = true;
    notifElm.classList.add("closing");
    setTimeout(() => {
      notifElm.remove();
    }, 275);
    onClose?.(closeType);
  }
  if (typeof onClick == "function") {
    notifElm.classList.add("clickable");
    notifElm.onclick = () => {
      onClick(close);
    };
  }
  utils_default.ifExists(notifElm.querySelector(".close"), (elm) => {
    elm.onclick = () => {
      close("user");
    };
  });
  container.prepend(notifElm);
  requestAnimationFrame(() => {
    notifElm.classList.remove("hidden");
    notifElm.querySelector(".progress").classList.add("progressing");
  });
  setTimeout(() => {
    close("timeout");
  }, timeout);
  return () => {
    close("force");
  };
}
var notifications_default = {
  show: Object.assign(show2, {
    info: (html, obj = {}) => show2(html, { ...obj, style: "info" }),
    error: (html, obj = {}) => show2(html, { ...obj, style: "error" }),
    warning: (html, obj = {}) => show2(html, { ...obj, style: "warning" }),
    success: (html, obj = {}) => show2(html, { ...obj, style: "success" })
  })
};

// src/api/ui/contextMenus.js
var { React } = common_default2;
var isReady = false;
var Components = (() => {
  const out3 = {};
  const componentMap = {
    separator: "Separator",
    checkbox: "CheckboxItem",
    radio: "RadioItem",
    control: "ControlItem",
    groupstart: "Group",
    customitem: "Item"
  };
  try {
    const moduleId = Object.entries(webpack_default.require.m).find(([, m]) => m?.toString().includes("menuitemcheckbox"))[0];
    const contextMenuModule = webpack_default.find((_2, idx) => idx == moduleId).exports;
    const rawMatches = webpack_default.require.m[moduleId].toString().matchAll(/if\(\w+\.type===\w+\.(\w+)\).+?type:"(.+?)"/g);
    out3.Menu = Object.values(contextMenuModule).find((v) => v.toString().includes(".isUsingKeyboardNavigation"));
    [...rawMatches].forEach(([, id, type]) => {
      out3[componentMap[type]] = contextMenuModule[id];
    });
    isReady = Object.values(componentMap).every((k) => out3[k]) && !!out3.Menu;
  } catch (err) {
    isReady = false;
    logger_default.error("Failed to load context menu components", err);
  }
  return out3;
})();
var Actions = (() => {
  let ogModule = webpack_default.filter((m) => Object.values(m).some((v) => typeof v === "function" && v.toString().includes("CONTEXT_MENU_CLOSE"))).find((m) => m.exports !== window).exports;
  const out3 = finderMap(ogModule, {
    close: ["CONTEXT_MENU_CLOSE"],
    open: ["renderLazy"]
  });
  isReady = isReady && !!out3.close && !!out3.open;
  return out3;
})();
var _MenuPatcher = class {
  static initialize() {
    if (!isReady)
      return logger_default.warn("Unable to load context menu.");
    const moduleToPatch = webpack_default.filter((m) => Object.values(m).some((v) => typeof v === "function" && v.toString().includes("CONTEXT_MENU_CLOSE"))).find((m) => m.exports !== window).exports;
    const keyToPatch = Object.keys(moduleToPatch).find((k) => moduleToPatch[k]?.length === 3);
    console.log(moduleToPatch, keyToPatch);
    patcher_default.before(
      keyToPatch,
      moduleToPatch,
      function(methodArgs) {
        const promise = methodArgs[1];
        methodArgs[1] = async function(...args) {
          const render = await promise.call(this, ...args);
          return (props) => {
            const res = render(props);
            if (res?.props.navId) {
              _MenuPatcher.executePatches(res.props.navId, res, props);
            } else if (typeof res?.type === "function") {
              _MenuPatcher.patchRecursive(res, "type");
            }
            return res;
          };
        };
        return methodArgs;
      }
    );
  }
  static patchRecursive(target, method, iteration = 0) {
    if (iteration >= this.MAX_PATCH_ITERATIONS)
      return;
    const proxyFunction = this.subPatches.get(target[method]) ?? (() => {
      const originalFunction = target[method];
      const depth = ++iteration;
      function patch(...args) {
        const res = originalFunction.call(this, ...args);
        if (!res)
          return res;
        const navId = res.props?.navId ?? res.props?.children?.props?.navId;
        if (navId) {
          _MenuPatcher.executePatches(navId, res, args[0]);
        } else {
          const layer = res.props.children ? res.props.children : res;
          if (typeof layer?.type == "function") {
            _MenuPatcher.patchRecursive(layer, "type", depth);
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
    if (!this.patches.has(id))
      return;
    this.patches.get(id).forEach((patch) => {
      try {
        patch(res, props);
      } catch (err) {
        logger_default.error("Failed to patch context menu", patch, err);
      }
    });
  }
};
var MenuPatcher = _MenuPatcher;
__publicField(MenuPatcher, "MAX_PATCH_ITERATIONS", 16);
__publicField(MenuPatcher, "patches", /* @__PURE__ */ new Map());
__publicField(MenuPatcher, "subPatches", /* @__PURE__ */ new WeakMap());
MenuPatcher.initialize();
function buildItem(props) {
  const { type } = props;
  if (type === "separator")
    return React.createElement(Components.Separator);
  let component = Components.Item;
  if (type === "submenu") {
    if (!props.children)
      props.children = buildMenuChildren(props.render || props.items);
  } else if (type === "toggle" || type === "radio") {
    component = type === "toggle" ? Components.CheckboxItem : Components.RadioItem;
    if (props.active)
      props.checked = props.active;
  } else if (type === "control") {
    component = Components.ControlItem;
  }
  if (!props.id)
    props.id = `${props.label.replace(/^[^a-z]+|[^\w-]+/gi, "-")}`;
  if (props.danger)
    props.color = "colorDanger";
  props.extended = true;
  if (type === "toggle") {
    const [active, doToggle] = React.useState(props.checked || false);
    const originalAction = props.action;
    props.checked = active;
    props.action = function(ev) {
      originalAction(ev);
      doToggle(!active);
    };
  }
  return React.createElement(component, props);
}
function buildMenuChildren(setup) {
  const mapper = (s) => {
    if (s.type === "group")
      return buildGroup(s);
    return buildItem(s);
  };
  const buildGroup = function(group) {
    const items = group.items.map(mapper).filter((i) => i);
    return React.createElement(MenuComponents.Group, null, items);
  };
  return setup.map(mapper).filter((i) => i);
}
var contextMenus_default = {
  __cache__: {
    patches: MenuPatcher.patches,
    subPatches: MenuPatcher.subPatches
  },
  patch(navId, cb) {
    if (!MenuPatcher.patches.has(navId))
      MenuPatcher.patches.set(navId, /* @__PURE__ */ new Set());
    MenuPatcher.patches.get(navId).add(cb);
    return () => {
      MenuPatcher.patches.get(navId).delete(cb);
    };
  },
  open(event, component, config) {
    return Actions.open(event, (e) => React.createElement(component, Object.assign({}, e, { onClose: Actions.close })), config);
  },
  close() {
    return Actions.close();
  },
  build: {
    item(setup) {
      return buildMenuChildren(setup);
    },
    menu(setup) {
      return (props) => React.createElement(MenuComponents.Menu, props, this.buildMenuChildren(setup));
    }
  }
};

// src/lib/components/ErrorBoundary.jsx
var { React: React2 } = common_default2;
var ErrorBoundary = class extends React2.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  componentDidCatch(error) {
    this.setState({ error });
    logger_default.error(error);
    if (typeof this.props.onError === "function")
      this.props.onError(error);
  }
  render() {
    if (this.state.error)
      return /* @__PURE__ */ React2.createElement("div", { className: "acord--react-error" }, /* @__PURE__ */ React2.createElement("p", null, "Unexpected React Error Happened."), /* @__PURE__ */ React2.createElement("p", null, `${this.state.error}`));
    return this.props.children;
  }
};
var originalRender = ErrorBoundary.prototype.render;
Object.defineProperty(ErrorBoundary.prototype, "render", {
  enumerable: false,
  configurable: false,
  set: function() {
    throw new Error("Cannot set render method of ErrorBoundary");
  },
  get: () => originalRender
});

// src/api/ui/components.js
var components_default = {
  ErrorBoundary,
  Button: common_default2.components.Button,
  Markdown: common_default2.components.Markdown,
  Text: common_default2.components.Text,
  ConfirmationModal: common_default2.components.ConfirmationModal,
  ModalRoot: common_default2.modals.components.Root,
  ModalCloseButton: common_default2.modals.components.other.CloseButton,
  ModalHeader: common_default2.modals.components.other.Header,
  ModalContent: common_default2.modals.components.other.Content,
  ModalFooter: common_default2.modals.components.other.Footer,
  ModalListContent: common_default2.modals.components.other.ListContent
};

// src/api/ui/modals.jsx
var { React: React3, FluxDispatcher, components, modals, UserStore } = common_default2;
var modals_default = {
  show: {
    confirmation(title, content, { confirm = null, cancel = null, danger = false, key = void 0, timeout = 6e4 * 60 } = {}) {
      return new Promise((resolve) => {
        if (!Array.isArray(content))
          content = [content];
        content = content.map((i) => typeof i === "string" ? React3.createElement(components.Markdown, null, i) : i);
        const modalKey = modals.actions.open((props) => {
          let interacted2 = false;
          return /* @__PURE__ */ React3.createElement(ErrorBoundary, { onError: () => {
            resolve(false);
          } }, /* @__PURE__ */ React3.createElement(
            components.ConfirmationModal,
            {
              header: title,
              confirmButtonColor: danger ? components.Button.Colors.RED : components.Button.Colors.BRAND,
              confirmText: confirm || i18n_default.format("CONFIRM"),
              cancelText: cancel,
              onCancel: () => {
                resolve(false);
                modals.actions.close(modalKey);
                interacted2 = true;
              },
              onConfirm: () => {
                resolve(true);
                modals.actions.close(modalKey);
                interacted2 = true;
              },
              ...props,
              onClose: () => {
                props.onClose();
                resolve(false);
                modals.actions.close(modalKey);
              }
            },
            /* @__PURE__ */ React3.createElement(ErrorBoundary, { onError: () => {
              resolve(false);
            } }, content)
          ));
        }, { modalKey: key });
        if (timeout) {
          setTimeout(() => {
            if (!interacted) {
              resolve(false);
              modals.actions.close(modalKey);
            }
          }, timeout);
        }
      });
    },
    close(key) {
      return modals.actions.close(key);
    },
    user(userId) {
      if (!UserStore.getUser(userId))
        return false;
      FluxDispatcher.dispatch({ type: "USER_PROFILE_MODAL_OPEN", userId });
      return true;
    },
    alert(title, content, { confirm = null, key = void 0, timeout = 6e4 * 60 } = {}) {
      return this.confirmation(title, content, { confirm, cancel: null, key, timeout });
    }
  }
};

// src/api/ui/index.js
patcher_default.injectCSS(styles_default);
var ui_default = {
  tooltips: tooltips_default,
  notifications: notifications_default,
  contextMenus: contextMenus_default,
  components: components_default,
  modals: modals_default
};

// src/api/index.js
utils_default.logger.debug(`PRELOAD_KEY: <PRELOAD_KEY>`);
function devError(api2) {
  return new Error(`The ${api2} API can only be accessed when Dev mode is enabled!`);
}
var api_default = {
  exposedAPI: {
    dev: dev_default,
    utils: utils_default,
    i18n: i18n_default,
    events: events_default,
    ui: ui_default,
    get patcher() {
      if (!dev_default.enabled)
        throw devError("Patcher");
      return patcher_default;
    },
    get storage() {
      if (!dev_default.enabled)
        throw devError("Storage");
      return storage_default;
    },
    get modules() {
      if (!dev_default.enabled)
        throw devError("Modules");
      return modules_default;
    },
    get extensions() {
      if (!dev_default.enabled)
        throw devError("Extensions");
      return extensions_default;
    },
    get internal() {
      if (!dev_default.enabled)
        throw devError("Internal");
      return internal_default;
    }
  },
  unexposedAPI: {
    dev: dev_default,
    modules: modules_default,
    utils: utils_default,
    extensions: extensions_default,
    i18n: i18n_default,
    storage: storage_default,
    events: events_default,
    patcher: patcher_default,
    internal: internal_default,
    ui: ui_default
  }
};

// src/index.js
Object.defineProperty(window, "acord", {
  get() {
    return api_default.exposedAPI;
  }
});
window.global = window;
(async () => {
  loading_animation_default.show();
  await waitUntilConnectionOpen();
  loading_animation_default.hide();
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibm9kZV9tb2R1bGVzL25lc3RzL2Nqcy9FdmVudHMuanMiLCAibm9kZV9tb2R1bGVzL25lc3RzL2Nqcy9FdmVudEVtaXR0ZXIuanMiLCAibm9kZV9tb2R1bGVzL25lc3RzL2Nqcy9tYWtlLmpzIiwgIm5vZGVfbW9kdWxlcy9uZXN0cy9janMvaW5kZXguanMiLCAic3JjL2RhdGEvY29tbW9uLmpzb24iLCAic3JjL2FwaS91dGlscy9yYXcvZmluZC1pbi10cmVlLmpzIiwgInNyYy9hcGkvdXRpbHMvbG9nZ2VyLmpzIiwgInNyYy9hcGkvdXRpbHMvcmVhY3QuanMiLCAic3JjL2FwaS91dGlscy9pbmRleC5qcyIsICJzcmMvYXBpL21vZHVsZXMvcmF3L2NvbXBsZXgtZmluZGVyLmpzIiwgInNyYy9hcGkvbW9kdWxlcy93ZWJwYWNrLmpzIiwgInNyYy9hcGkvbW9kdWxlcy9jb21tb24uanMiLCAic3JjL2FwaS9tb2R1bGVzL2luZGV4LmpzIiwgInNyYy9vdGhlci91dGlscy5qcyIsICJzcmMvbGliL0Jhc2ljRXZlbnRFbWl0dGVyLmpzIiwgInNyYy9hcGkvZXZlbnRzL2luZGV4LmpzIiwgInNyYy9hcGkvZG9tL2luZGV4LmpzIiwgInNyYy9saWIvc3BpdHJvYXN0L2Rpc3QvZXNtL3NoYXJlZC5qcyIsICJzcmMvbGliL3NwaXRyb2FzdC9kaXN0L2VzbS9ob29rLmpzIiwgInNyYy9saWIvc3BpdHJvYXN0L2Rpc3QvZXNtL3VuLXBhdGNoLmpzIiwgInNyYy9saWIvc3BpdHJvYXN0L2Rpc3QvZXNtL2dldC1wYXRjaC1mdW5jLmpzIiwgInNyYy9saWIvc3BpdHJvYXN0L2Rpc3QvZXNtL2luZGV4LmpzIiwgInNyYy9hcGkvcGF0Y2hlci9pbmRleC5qcyIsICJzcmMvb3RoZXIvbG9hZGluZy1hbmltYXRpb24vc3R5bGUuc2NzcyIsICJzcmMvb3RoZXIvbG9hZGluZy1hbmltYXRpb24vaW5kZXguanMiLCAic3JjL2FwaS9kZXYvaW5kZXguanMiLCAic3JjL2FwaS9pMThuL2luZGV4LmpzIiwgInNyYy9hcGkvc3RvcmFnZS9pbmRleC5qcyIsICJub2RlX21vZHVsZXMvaWRiLWtleXZhbC9kaXN0L2luZGV4LmpzIiwgInNyYy9saWIvanNvbi1kZWN5Y2xlZC9pbmRleC5qcyIsICJzcmMvYXBpL2V4dGVuc2lvbnMvaTE4bi5qcyIsICJzcmMvYXBpL2V4dGVuc2lvbnMvaW5kZXguanMiLCAic3JjL2FwaS9pbnRlcm5hbC9pbmRleC5qcyIsICJzcmMvYXBpL3VpL3N0eWxlcy5zY3NzIiwgInNyYy9hcGkvdWkvdG9vbHRpcHMuanMiLCAic3JjL2FwaS91aS9ub3RpZmljYXRpb25zLmpzIiwgInNyYy9hcGkvdWkvY29udGV4dE1lbnVzLmpzIiwgInNyYy9saWIvY29tcG9uZW50cy9FcnJvckJvdW5kYXJ5LmpzeCIsICJzcmMvYXBpL3VpL2NvbXBvbmVudHMuanMiLCAic3JjL2FwaS91aS9tb2RhbHMuanN4IiwgInNyYy9hcGkvdWkvaW5kZXguanMiLCAic3JjL2FwaS9pbmRleC5qcyIsICJzcmMvaW5kZXguanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuZGVmYXVsdCA9IE9iamVjdC5mcmVlemUoe1xyXG4gICAgR0VUOiBcIkdFVFwiLFxyXG4gICAgU0VUOiBcIlNFVFwiLFxyXG4gICAgREVMRVRFOiBcIkRFTEVURVwiLFxyXG4gICAgVVBEQVRFOiBcIlVQREFURVwiLFxyXG59KTtcclxuIiwgIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IEV2ZW50c18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL0V2ZW50c1wiKSk7XHJcbmNsYXNzIEV2ZW50RW1pdHRlciB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmxpc3RlbmVycyA9IE9iamVjdC52YWx1ZXMoRXZlbnRzXzEuZGVmYXVsdCkucmVkdWNlKChhY2MsIHZhbCkgPT4gKChhY2NbdmFsXSA9IG5ldyBTZXQoKSksIGFjYyksIHt9KTtcclxuICAgICAgICB0aGlzLm9uID0gZnVuY3Rpb24gKGV2ZW50LCBsaXN0ZW5lcikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5saXN0ZW5lcnNbZXZlbnRdLmhhcyhsaXN0ZW5lcikpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IEVycm9yKGBUaGlzIGxpc3RlbmVyIG9uICR7ZXZlbnR9IGFscmVhZHkgZXhpc3RzLmApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubGlzdGVuZXJzW2V2ZW50XS5hZGQobGlzdGVuZXIpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5vbmNlID0gZnVuY3Rpb24gKGV2ZW50LCBsaXN0ZW5lcikge1xyXG4gICAgICAgICAgICBjb25zdCBvbmNlTGlzdGVuZXIgPSAoZXZlbnQsIGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMub2ZmKGV2ZW50LCBvbmNlTGlzdGVuZXIpO1xyXG4gICAgICAgICAgICAgICAgbGlzdGVuZXIoZXZlbnQsIGRhdGEpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0aGlzLm9uKGV2ZW50LCBvbmNlTGlzdGVuZXIpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5vZmYgPSBmdW5jdGlvbiAoZXZlbnQsIGxpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGlzdGVuZXJzW2V2ZW50XS5kZWxldGUobGlzdGVuZXIpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5lbWl0ID0gZnVuY3Rpb24gKGV2ZW50LCBkYXRhKSB7XHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgbGlzdGVuZXIgb2YgdGhpcy5saXN0ZW5lcnNbZXZlbnRdKSB7XHJcbiAgICAgICAgICAgICAgICBsaXN0ZW5lcihldmVudCwgZGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIGZvciAoY29uc3QgZXZlbnQgb2YgT2JqZWN0LnZhbHVlcyhFdmVudHNfMS5kZWZhdWx0KSkge1xyXG4gICAgICAgICAgICB0aGlzW2V2ZW50LnRvTG93ZXJDYXNlKCldID0gKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZW1pdChldmVudCwgZGF0YSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuZGVmYXVsdCA9IEV2ZW50RW1pdHRlcjtcclxuIiwgIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IEV2ZW50RW1pdHRlcl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL0V2ZW50RW1pdHRlclwiKSk7XHJcbmZ1bmN0aW9uIG1ha2UoXHJcbi8vIFRoaXMgY2FuIGJlIHNhZmVseSBpZ25vcmVkLCB0aGUgRGF0YSB3aWxsIGFsd2F5cyBiZSBhbiBvYmplY3Qgb3IgaXQgd29uJ3Qgd29yayBhbnl3YXkuXHJcbi8vIEB0cy1pZ25vcmVcclxuZGF0YSA9IHt9LCB7IG5lc3RBcnJheXMgPSB0cnVlLCB9ID0ge30pIHtcclxuICAgIGNvbnN0IGVtaXR0ZXIgPSBuZXcgRXZlbnRFbWl0dGVyXzEuZGVmYXVsdCgpO1xyXG4gICAgZnVuY3Rpb24gY3JlYXRlUHJveHkodGFyZ2V0LCByb290LCBwYXRoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm94eSh0YXJnZXQsIHtcclxuICAgICAgICAgICAgZ2V0KHRhcmdldCwgcHJvcGVydHkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG5ld1BhdGggPSBbLi4ucGF0aCwgcHJvcGVydHldO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSB0YXJnZXRbcHJvcGVydHldO1xyXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbWl0dGVyLmdldCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGg6IG5ld1BhdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghbmVzdEFycmF5cyAmJiBBcnJheS5pc0FycmF5KHZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZVByb3h5KHZhbHVlLCByb290LCBuZXdQYXRoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZVByb3h5KCh0YXJnZXRbcHJvcGVydHldID0ge30pLCByb290LCBuZXdQYXRoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0KHRhcmdldCwgcHJvcGVydHksIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXRbcHJvcGVydHldID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBlbWl0dGVyLnNldCh7XHJcbiAgICAgICAgICAgICAgICAgICAgcGF0aDogWy4uLnBhdGgsIHByb3BlcnR5XSxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgLy8gVGhpcyBuZWVkcyB0byByZXR1cm4gdHJ1ZSBvciBpdCBlcnJvcnMuIC9zaHJ1Z1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGRlbGV0ZVByb3BlcnR5KHRhcmdldCwgcHJvcGVydHkpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkZWxldGUgdGFyZ2V0W3Byb3BlcnR5XSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVtaXR0ZXIuZGVsZXRlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogWy4uLnBhdGgsIHByb3BlcnR5XSxcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaGFzKHRhcmdldCwgcHJvcGVydHkpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGFyZ2V0W3Byb3BlcnR5XSA9PT0gXCJvYmplY3RcIiAmJlxyXG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKHRhcmdldFtwcm9wZXJ0eV0pLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBwcm9wZXJ0eSBpbiB0YXJnZXQ7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7IHN0b3JlOiBjcmVhdGVQcm94eShkYXRhLCBkYXRhLCBbXSksIFxyXG4gICAgICAgIC8vIFRoaXMgY2FuIGJlIHNhZmVseSBpZ25vcmVkLCB0aGUgRGF0YSB3aWxsIGFsd2F5cyBiZSBhbiBvYmplY3Qgb3IgaXQgd29uJ3Qgd29yayBhbnl3YXkuXHJcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgIGdob3N0OiBkYXRhIH0sIGVtaXR0ZXIpO1xyXG59XHJcbmV4cG9ydHMuZGVmYXVsdCA9IG1ha2U7XHJcbiIsICJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLm1ha2UgPSBleHBvcnRzLkV2ZW50cyA9IHZvaWQgMDtcclxudmFyIEV2ZW50c18xID0gcmVxdWlyZShcIi4vRXZlbnRzXCIpO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJFdmVudHNcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIF9faW1wb3J0RGVmYXVsdChFdmVudHNfMSkuZGVmYXVsdDsgfSB9KTtcclxudmFyIG1ha2VfMSA9IHJlcXVpcmUoXCIuL21ha2VcIik7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIm1ha2VcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIF9faW1wb3J0RGVmYXVsdChtYWtlXzEpLmRlZmF1bHQ7IH0gfSk7XHJcbiIsICJ7XHJcbiAgXCJjb21tb25cIjoge1xyXG4gICAgXCJtb2RhbHNcIjoge1xyXG4gICAgICBcImNvbXBvbmVudHNcIjoge1xyXG4gICAgICAgIFwib3RoZXJcIjoge1xyXG4gICAgICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgXCJIZWFkZXJcIixcclxuICAgICAgICAgICAgICAgIFwiRm9vdGVyXCJcclxuICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJSb290XCI6IHtcclxuICAgICAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgICAgIFwiaW5cIjogXCJzdHJpbmdzXCIsXHJcbiAgICAgICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgIFwiRU5URVJJTkdcIlxyXG4gICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBcImFjdGlvbnNcIjoge1xyXG4gICAgICAgIFwib3BlblwiOiB7XHJcbiAgICAgICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgICAgICBcImluXCI6IFwic3RyaW5nc1wiLFxyXG4gICAgICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICBcIm9uQ2xvc2VDYWxsYmFja1wiLFxyXG4gICAgICAgICAgICAgICAgXCJMYXllclwiXHJcbiAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICAgICAgXCJiZWZvcmVcIjogW1xyXG4gICAgICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgICAgICBcIm9wZW5cIlxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgXCJtYXBcIjoge1xyXG4gICAgICAgICAgICBcIm9wZW5cIjogW1xyXG4gICAgICAgICAgICAgIFwib25DbG9zZUNhbGxiYWNrXCIsXHJcbiAgICAgICAgICAgICAgXCJMYXllclwiXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiY2xvc2VcIjoge1xyXG4gICAgICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICAgICAgXCJpblwiOiBcInN0cmluZ3NcIixcclxuICAgICAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgXCJvbkNsb3NlQ2FsbGJhY2soKVwiXHJcbiAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICAgICAgXCJiZWZvcmVcIjogW1xyXG4gICAgICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgICAgICBcImNsb3NlXCJcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIFwibWFwXCI6IHtcclxuICAgICAgICAgICAgXCJjbG9zZVwiOiBbXHJcbiAgICAgICAgICAgICAgXCJvbkNsb3NlQ2FsbGJhY2soKVwiXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcImNvbXBvbmVudHNcIjoge1xyXG4gICAgICBcIkJ1dHRvblwiOiB7XHJcbiAgICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgXCJCb3JkZXJDb2xvcnNcIlxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgICAgXCJiZWZvcmVcIjogW1xyXG4gICAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICAgIF0sXHJcbiAgICAgICAgICBcImFmdGVyXCI6IFwiQnV0dG9uXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwibWFwXCI6IHtcclxuICAgICAgICAgIFwiQnV0dG9uXCI6IFtcclxuICAgICAgICAgICAgXCIuRklMTEVEXCIsXHJcbiAgICAgICAgICAgIFwiLm9uTW91c2VMZWF2ZVwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBcIkNvbmZpcm1hdGlvbk1vZGFsXCI6IHtcclxuICAgICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgICBcImluXCI6IFwic3RyaW5nc1wiLFxyXG4gICAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICBcIi5jb25maXJtQnV0dG9uQ29sb3JcIlxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgICAgXCJiZWZvcmVcIjogW1xyXG4gICAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIFwiVGV4dFwiOiB7XHJcbiAgICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICAgIFwiZmlsdGVyXCI6IFwiJD8uU2l6ZXM/LlNJWkVfMzIgJiYgJC5Db2xvcnNcIixcclxuICAgICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgICAgXCJiZWZvcmVcIjogW1xyXG4gICAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIFwiTWFya2Rvd25cIjoge1xyXG4gICAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgICBcImZpbHRlclwiOiBcIiQ/LnByb3RvdHlwZT8ucmVuZGVyICYmICQucnVsZXNcIixcclxuICAgICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiRmx1eERpc3BhdGNoZXJcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcIl9jdXJyZW50RGlzcGF0Y2hBY3Rpb25UeXBlXCIsXHJcbiAgICAgICAgICAgIFwiZGlzcGF0Y2hcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiUmVhY3RcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcImNyZWF0ZUVsZW1lbnRcIixcclxuICAgICAgICAgICAgXCJ1c2VTdGF0ZVwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJSZXN0XCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJnZXRcIixcclxuICAgICAgICAgICAgXCJwb3N0XCIsXHJcbiAgICAgICAgICAgIFwiZ2V0QVBJQmFzZVVSTFwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJGbHV4XCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJjb25uZWN0U3RvcmVzXCIsXHJcbiAgICAgICAgICAgIFwiZGVzdHJveVwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJBY3Rpdml0eUFjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcInNlbmRBY3Rpdml0eUludml0ZVwiLFxyXG4gICAgICAgICAgICBcInVwZGF0ZUFjdGl2aXR5XCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIlByaXZhdGVDaGFubmVsQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwib3BlblByaXZhdGVDaGFubmVsXCIsXHJcbiAgICAgICAgICAgIFwiZW5zdXJlUHJpdmF0ZUNoYW5uZWxcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiQWNrQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiaW5cIjogXCJzdHJpbmdzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwidHlwZTpcXFwiQlVMS19BQ0tcXFwiXCJcclxuICAgICAgICAgIF0sXHJcbiAgICAgICAgICBbXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiB0cnVlLFxyXG4gICAgICAgIFwiYmVmb3JlXCI6IFwiZXhwb3J0c1wiXHJcbiAgICAgIH0sXHJcbiAgICAgIFwibWFwXCI6IHtcclxuICAgICAgICBcImFja1wiOiBbXHJcbiAgICAgICAgICBcInR5cGU6XFxcIkNIQU5ORUxfQUNLXFxcIlwiLFxyXG4gICAgICAgICAgXCJtZXNzYWdlSWRcIixcclxuICAgICAgICAgIFwiY2hhbm5lbElkXCJcclxuICAgICAgICBdLFxyXG4gICAgICAgIFwiYnVsa0Fja1wiOiBbXHJcbiAgICAgICAgICBcInR5cGU6XFxcIkJVTEtfQUNLXFxcIlwiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJBbmFseXRpY3NBY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJpc1Rocm90dGxlZFwiLFxyXG4gICAgICAgICAgICBcInRyYWNrXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIkFuaW1hdGlvbkFjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJzcHJpbmdcIixcclxuICAgICAgICAgICAgXCJkZWNheVwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJDb25uZWN0aW9uQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwic2V0U2hvd0FjdGl2aXR5XCIsXHJcbiAgICAgICAgICAgIFwic2V0VmlzaWJpbGl0eVwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJSVENDb25uZWN0aW9uQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwiZ2V0Q2hhbm5lbElkXCIsXHJcbiAgICAgICAgICAgIFwiZ2V0R3VpbGRJZFwiLFxyXG4gICAgICAgICAgICBcImdldFJUQ0Nvbm5lY3Rpb25JZFwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJFbW9qaUFjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcInRyYW5zbGF0ZUlubGluZUVtb2ppVG9TdXJyb2dhdGVzXCIsXHJcbiAgICAgICAgICAgIFwidHJhbnNsYXRlU3Vycm9nYXRlc1RvSW5saW5lRW1vamlcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiRW1vamlTdGF0ZUFjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcImdldFVSTFwiLFxyXG4gICAgICAgICAgICBcImlzRW1vamlEaXNhYmxlZFwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJHdWlsZE5vdGlmaWNhdGlvbnNBY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJ1cGRhdGVDaGFubmVsT3ZlcnJpZGVTZXR0aW5nc1wiLFxyXG4gICAgICAgICAgICBcInVwZGF0ZUd1aWxkTm90aWZpY2F0aW9uU2V0dGluZ3NcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiSW50ZXJuYWxSZWFjdFwiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwianN4XCIsXHJcbiAgICAgICAgICAgIFwianN4c1wiLFxyXG4gICAgICAgICAgICBcIkZyYWdtZW50XCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIkxvZ2luQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwibG9naW5cIixcclxuICAgICAgICAgICAgXCJsb2dvdXRcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiUXVlcnlBY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJxdWVyeUVtb2ppUmVzdWx0c1wiLFxyXG4gICAgICAgICAgICBcInF1ZXJ5RnJpZW5kc1wiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJNZXNzYWdlQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwicmVjZWl2ZU1lc3NhZ2VcIixcclxuICAgICAgICAgICAgXCJzZW5kTWVzc2FnZVwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJQcmVtaXVtQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwiaXNQcmVtaXVtXCIsXHJcbiAgICAgICAgICAgIFwiY2FuVXNlRW1vamlzRXZlcnl3aGVyZVwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJWb2ljZUFjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcInNlbGVjdFZvaWNlQ2hhbm5lbFwiLFxyXG4gICAgICAgICAgICBcImRpc2Nvbm5lY3RcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiVHlwaW5nQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwic3RhcnRUeXBpbmdcIixcclxuICAgICAgICAgICAgXCJzdG9wVHlwaW5nXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIkd1aWxkQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwic2V0Q2hhbm5lbFwiLFxyXG4gICAgICAgICAgICBcInNldFNlcnZlck11dGVcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiSW52aXRlQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwiYWNjZXB0SW52aXRlXCIsXHJcbiAgICAgICAgICAgIFwiYWNjZXB0SW52aXRlQW5kVHJhbnNpdGlvblRvSW52aXRlQ2hhbm5lbFwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJNZWRpYUVuZ2luZUFjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcInRvZ2dsZVNlbGZEZWFmXCIsXHJcbiAgICAgICAgICAgIFwidG9nZ2xlU2VsZk11dGVcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiaTE4blwiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwiX3JlcXVlc3RlZExvY2FsZVwiLFxyXG4gICAgICAgICAgICBcImdldERlZmF1bHRMb2NhbGVcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwidXVpZFwiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwidjFcIixcclxuICAgICAgICAgICAgXCJ2NFwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJobGpzXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJoaWdobGlnaHRBbGxcIixcclxuICAgICAgICAgICAgXCJoaWdobGlnaHRcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufSIsICJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBmaW5kSW5UcmVlKFxyXG4gIHRyZWUsXHJcbiAgc2VhcmNoRmlsdGVyLFxyXG4gIHsgd2Fsa2FibGUgPSBudWxsLCBpZ25vcmUgPSBbXSwgbGltaXQgPSAxMDAgfSA9IHt9XHJcbikge1xyXG4gIGxldCBpdGVyYXRpb24gPSAwO1xyXG5cclxuICBmdW5jdGlvbiBkb1NlYXJjaCh0cmVlLCBzZWFyY2hGaWx0ZXIsIHsgd2Fsa2FibGUgPSBudWxsLCBpZ25vcmUgPSBbXSB9ID0ge30pIHtcclxuICAgIGl0ZXJhdGlvbiArPSAxO1xyXG4gICAgaWYgKGl0ZXJhdGlvbiA+IGxpbWl0KSByZXR1cm47XHJcblxyXG4gICAgaWYgKHR5cGVvZiBzZWFyY2hGaWx0ZXIgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgaWYgKHRyZWUuaGFzT3duUHJvcGVydHkoc2VhcmNoRmlsdGVyKSkgcmV0dXJuIHRyZWVbc2VhcmNoRmlsdGVyXTtcclxuICAgIH0gZWxzZSBpZiAoc2VhcmNoRmlsdGVyKHRyZWUpKSByZXR1cm4gdHJlZTtcclxuXHJcbiAgICBpZiAoIXRyZWUpIHJldHVybjtcclxuXHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh0cmVlKSkge1xyXG4gICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgdHJlZSkge1xyXG4gICAgICAgIGNvbnN0IGZvdW5kID0gZG9TZWFyY2goaXRlbSwgc2VhcmNoRmlsdGVyLCB7IHdhbGthYmxlLCBpZ25vcmUgfSk7XHJcbiAgICAgICAgaWYgKGZvdW5kKSByZXR1cm4gZm91bmQ7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHRyZWUgPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXModHJlZSkpIHtcclxuICAgICAgICBpZiAod2Fsa2FibGUgIT0gbnVsbCAmJiAhd2Fsa2FibGUuaW5jbHVkZXMoa2V5KSkgY29udGludWU7XHJcblxyXG4gICAgICAgIGlmIChpZ25vcmUuaW5jbHVkZXMoa2V5KSkgY29udGludWU7XHJcblxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICBjb25zdCBmb3VuZCA9IGRvU2VhcmNoKHRyZWVba2V5XSwgc2VhcmNoRmlsdGVyLCB7XHJcbiAgICAgICAgICAgIHdhbGthYmxlLFxyXG4gICAgICAgICAgICBpZ25vcmUsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGlmIChmb3VuZCkgcmV0dXJuIGZvdW5kO1xyXG4gICAgICAgIH0gY2F0Y2ggeyB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiBkb1NlYXJjaCh0cmVlLCBzZWFyY2hGaWx0ZXIsIHsgd2Fsa2FibGUsIGlnbm9yZSB9KTtcclxufTtcclxuIiwgImZ1bmN0aW9uIGJ1aWxkKHByZWZpeCA9IFwiQWNvcmRcIiwgdHlwZSwgY29sb3IpIHtcclxuICByZXR1cm4gKC4uLmlucHV0KSA9PiBjb25zb2xlW3R5cGVdKFxyXG4gICAgYCVjJHtwcmVmaXh9JWNgLFxyXG4gICAgYGJhY2tncm91bmQtY29sb3I6ICR7Y29sb3J9OyBjb2xvcjogd2hpdGU7IGJvcmRlci1yYWRpdXM6IDRweDsgcGFkZGluZzogMHB4IDZweCAwcHggNnB4OyBmb250LXdlaWdodDogYm9sZGAsXHJcbiAgICBcIlwiLFxyXG4gICAgLi4uaW5wdXRcclxuICApO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgbG9nOiBidWlsZChcIkFjb3JkXCIsIFwibG9nXCIsIFwiIzAwZmJiMFwiKSxcclxuICBkZWJ1ZzogYnVpbGQoXCJBY29yZCBEZWJ1Z1wiLCBcImRlYnVnXCIsIFwiIzAwZmJiMFwiKSxcclxuICBpbmZvOiBidWlsZChcIkFjb3JkIEluZm9cIiwgXCJsb2dcIiwgXCIjODJhYWZmXCIpLFxyXG4gIHdhcm46IGJ1aWxkKFwiQWNvcmQgV2FyblwiLCBcIndhcm5cIiwgXCIjZGViZjE4XCIpLFxyXG4gIGVycm9yOiBidWlsZChcIkFjb3JkIEVycm9yXCIsIFwiZXJyb3JcIiwgXCIjZWY1ODU4XCIpLFxyXG4gIGJ1aWxkXHJcbn0iLCAiaW1wb3J0IGZpbmRJblRyZWUgZnJvbSBcIi4vcmF3L2ZpbmQtaW4tdHJlZS5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGdldEluc3RhbmNlKG5vZGUpIHtcclxuICAgIHJldHVybiBPYmplY3QuZW50cmllcyhub2RlKS5maW5kKGkgPT4gaVswXS5zdGFydHNXaXRoKFwiX19yZWFjdEludGVybmFsSW5zdGFuY2VcIikgfHwgaVswXS5zdGFydHNXaXRoKFwiX19yZWFjdEZpYmVyXCIpKT8uWzFdO1xyXG4gIH0sXHJcbiAgZ2V0T3duZXJJbnN0YW5jZShub2RlKSB7XHJcbiAgICBsZXQgaW5zdGFuY2UgPSB0aGlzLmdldEluc3RhbmNlKG5vZGUpO1xyXG4gICAgZm9yIChsZXQgZWwgPSBpbnN0YW5jZTsgZWw7IGVsID0gZWwucmV0dXJuKVxyXG4gICAgICBpZiAoZWwuc3RhdGVOb2RlPy5mb3JjZVVwZGF0ZSkgcmV0dXJuIGVsLnN0YXRlTm9kZTtcclxuICB9LFxyXG4gIGZpbmRJblRyZWUodHJlZSwgZmlsdGVyKSB7XHJcbiAgICByZXR1cm4gZmluZEluVHJlZSh0cmVlLCBmaWx0ZXIsIHtcclxuICAgICAgd2Fsa2FibGU6IFtcInByb3BzXCIsIFwic3RhdGVcIiwgXCJjaGlsZHJlblwiLCBcInJldHVyblwiXVxyXG4gICAgfSk7XHJcbiAgfSxcclxuICBnZXRDb21wb25lbnRzKG5vZGUpIHtcclxuICAgIGNvbnN0IGluc3RhbmNlID0gdGhpcy5nZXRJbnN0YW5jZShub2RlKTtcclxuICAgIGNvbnN0IGNvbXBvbmVudHMgPSBbXTtcclxuICAgIGxldCBsYXN0SW5zdGFuY2UgPSBpbnN0YW5jZTtcclxuICAgIHdoaWxlIChsYXN0SW5zdGFuY2UgJiYgbGFzdEluc3RhbmNlLnJldHVybikge1xyXG4gICAgICBpZiAodHlwZW9mIGxhc3RJbnN0YW5jZS5yZXR1cm4udHlwZSA9PT0gXCJzdHJpbmdcIikgYnJlYWs7XHJcbiAgICAgIGlmIChsYXN0SW5zdGFuY2UucmV0dXJuLnR5cGUpIGNvbXBvbmVudHMucHVzaChsYXN0SW5zdGFuY2UucmV0dXJuLnR5cGUpO1xyXG4gICAgICBsYXN0SW5zdGFuY2UgPSBsYXN0SW5zdGFuY2UucmV0dXJuO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNvbXBvbmVudHM7XHJcbiAgfSxcclxuICBnZXRTdGF0ZU5vZGVzKG5vZGUpIHtcclxuICAgIGNvbnN0IGluc3RhbmNlID0gdGhpcy5nZXRJbnN0YW5jZShub2RlKTtcclxuICAgIGNvbnN0IHN0YXRlTm9kZXMgPSBbXTtcclxuICAgIGxldCBsYXN0SW5zdGFuY2UgPSBpbnN0YW5jZTtcclxuICAgIHdoaWxlIChsYXN0SW5zdGFuY2UgJiYgbGFzdEluc3RhbmNlLnJldHVybikge1xyXG4gICAgICBpZiAobGFzdEluc3RhbmNlLnJldHVybi5zdGF0ZU5vZGUgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkgYnJlYWs7XHJcbiAgICAgIGlmIChsYXN0SW5zdGFuY2UucmV0dXJuLnN0YXRlTm9kZSlcclxuICAgICAgICBzdGF0ZU5vZGVzLnB1c2gobGFzdEluc3RhbmNlLnJldHVybi5zdGF0ZU5vZGUpO1xyXG4gICAgICBsYXN0SW5zdGFuY2UgPSBsYXN0SW5zdGFuY2UucmV0dXJuO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN0YXRlTm9kZXM7XHJcbiAgfSxcclxuICBnZXRQcm9wcyhlbCwgZmlsdGVyID0gKGkpID0+IGksIG1heCA9IDEwMDAwKSB7XHJcbiAgICBjb25zdCBpbnN0YW5jZSA9IHRoaXMuZ2V0SW5zdGFuY2UoZWwpO1xyXG5cclxuICAgIGlmICghaW5zdGFuY2U/LnJldHVybikgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgZm9yIChcclxuICAgICAgbGV0IGN1cnJlbnQgPSBpbnN0YW5jZT8ucmV0dXJuLCBpID0gMDtcclxuICAgICAgaSA+IG1heCB8fCBjdXJyZW50ICE9PSBudWxsO1xyXG4gICAgICBjdXJyZW50ID0gY3VycmVudD8ucmV0dXJuLCBpKytcclxuICAgICkge1xyXG4gICAgICBpZiAoY3VycmVudD8ucGVuZGluZ1Byb3BzICYmIGZpbHRlcihjdXJyZW50LnBlbmRpbmdQcm9wcykpXHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnQucGVuZGluZ1Byb3BzO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH0sXHJcbn0iLCAiaW1wb3J0IGZpbmRJblRyZWUgZnJvbSBcIi4vcmF3L2ZpbmQtaW4tdHJlZS5qc1wiO1xyXG5pbXBvcnQgbG9nZ2VyIGZyb20gXCIuL2xvZ2dlci5qc1wiO1xyXG5pbXBvcnQgcmVhY3QgZnJvbSBcIi4vcmVhY3QuanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBsb2dnZXIsXHJcbiAgcmVhY3QsXHJcbiAgZmluZEluVHJlZSxcclxuICBmb3JtYXQodmFsLCAuLi5hcmdzKSB7XHJcbiAgICByZXR1cm4gYCR7dmFsfWAucmVwbGFjZUFsbCgveyhcXGQrKX0vZywgKF8sIGNhcCkgPT4ge1xyXG4gICAgICByZXR1cm4gYXJnc1tOdW1iZXIoY2FwKV07XHJcbiAgICB9KTtcclxuICB9LFxyXG4gIGludGVydmFsKGNiLCBkdXIpIHtcclxuICAgIGxldCBpbnRlcnZhbCA9IHNldEludGVydmFsKGNiLCBkdXIpO1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgdGltZW91dChjYiwgZHVyKSB7XHJcbiAgICBsZXQgdGltZW91dCA9IHNldFRpbWVvdXQoY2IsIGR1cik7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgaWZFeGlzdHModmFsLCBjYikge1xyXG4gICAgaWYgKHZhbCkgY2IodmFsKTtcclxuICB9LFxyXG4gIGNvcHlUZXh0KHRleHQpIHtcclxuICAgIGlmICh3aW5kb3cuRGlzY29yZE5hdGl2ZSkge1xyXG4gICAgICBEaXNjb3JkTmF0aXZlLmNsaXBib2FyZC5jb3B5KHRleHQpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgbmF2aWdhdG9yLmNsaXBib2FyZC53cml0ZVRleHQodGV4dCkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICBjb25zdCBjb3B5QXJlYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZXh0YXJlYVwiKTtcclxuXHJcbiAgICAgIGNvcHlBcmVhLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xyXG4gICAgICBjb3B5QXJlYS5zdHlsZS5wb3NpdGlvbiA9IFwiZml4ZWRcIjtcclxuICAgICAgY29weUFyZWEuc3R5bGUudG9wID0gXCIwXCI7XHJcbiAgICAgIGNvcHlBcmVhLnN0eWxlLmxlZnQgPSBcIjBcIjtcclxuXHJcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY29weUFyZWEpO1xyXG4gICAgICBjb3B5QXJlYS5mb2N1cygpO1xyXG4gICAgICBjb3B5QXJlYS5zZWxlY3QoKTtcclxuXHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoXCJjb3B5XCIpO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoY29weUFyZWEpO1xyXG4gICAgfSk7XHJcbiAgfSxcclxufSIsICJpbXBvcnQgdXRpbHMgZnJvbSBcIi4uLy4uL3V0aWxzL2luZGV4LmpzXCI7XHJcbmltcG9ydCBsb2dnZXIgZnJvbSBcIi4uLy4uL3V0aWxzL2xvZ2dlci5qc1wiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHdyYXBGaWx0ZXIoZmlsdGVyKSB7XHJcbiAgcmV0dXJuICguLi5hcmdzKSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICBpZiAoYXJnc1swXT8uZG9jdW1lbnQgJiYgYXJnc1swXT8ud2luZG93KSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIGlmIChhcmdzWzBdPy5kZWZhdWx0Py5yZW1vdmUgJiYgYXJnc1swXT8uZGVmYXVsdD8uc2V0ICYmIGFyZ3NbMF0/LmRlZmF1bHQ/LmNsZWFyICYmIGFyZ3NbMF0/LmRlZmF1bHQ/LmdldCAmJiAhYXJnc1swXT8uZGVmYXVsdD8uc29ydCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICBpZiAoYXJnc1swXS5yZW1vdmUgJiYgYXJnc1swXS5zZXQgJiYgYXJnc1swXS5jbGVhciAmJiBhcmdzWzBdLmdldCAmJiAhYXJnc1swXS5zb3J0KSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIGlmIChhcmdzWzBdPy5kZWZhdWx0Py5nZXRUb2tlbiB8fCBhcmdzWzBdPy5kZWZhdWx0Py5nZXRFbWFpbCB8fCBhcmdzWzBdPy5kZWZhdWx0Py5zaG93VG9rZW4pIHJldHVybiBmYWxzZTtcclxuICAgICAgaWYgKGFyZ3NbMF0/LmdldFRva2VuIHx8IGFyZ3NbMF0/LmdldEVtYWlsIHx8IGFyZ3NbMF0/LnNob3dUb2tlbikgcmV0dXJuIGZhbHNlO1xyXG4gICAgICByZXR1cm4gZmlsdGVyKC4uLmFyZ3MpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycikge1xyXG4gICAgICBsb2dnZXIud2FybihcIk1vZHVsZSBmaWx0ZXIgdGhyZXcgYW4gZXhjZXB0aW9uLlwiLCBmaWx0ZXIsIGVycik7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBjaGVja01vZHVsZVN0cmluZ3MobSwgc3RyaW5ncywgaGFzTm90KSB7XHJcbiAgY29uc3QgY2hlY2sgPSAoczEsIHMyKSA9PiB7XHJcbiAgICByZXR1cm4gaGFzTm90ID8gczEudG9TdHJpbmcoKS5pbmRleE9mKHMyLnRvU3RyaW5nKCkpID09IC0xIDogczEudG9TdHJpbmcoKS5pbmRleE9mKHMyLnRvU3RyaW5nKCkpID4gLTE7XHJcbiAgfTtcclxuICByZXR1cm4gc3RyaW5ncy5ldmVyeShqID0+IHtcclxuICAgIHJldHVybiBjaGVjayhtPy50b1N0cmluZz8uKCkgfHwgXCJcIiwgailcclxuICAgICAgfHwgY2hlY2sobT8uX19vcmlnaW5hbF9fPy50b1N0cmluZz8uKCkgfHwgXCJcIiwgailcclxuICAgICAgfHwgY2hlY2sobT8udHlwZT8udG9TdHJpbmc/LigpIHx8IFwiXCIsIGopXHJcbiAgICAgIHx8IGNoZWNrKG0/LnR5cGU/Ll9fb3JpZ2luYWxfXz8udG9TdHJpbmc/LigpIHx8IFwiXCIsIGopXHJcbiAgICAgIHx8IE9iamVjdC5lbnRyaWVzKFsnZnVuY3Rpb24nLCAnb2JqZWN0J10uaW5jbHVkZXModHlwZW9mIG0/LnByb3RvdHlwZSkgPyB0eXBlb2YgbT8ucHJvdG90eXBlIDoge30pLmZpbHRlcihpID0+IGlbMF0/LmluY2x1ZGVzPy4oXCJyZW5kZXJcIikpLnNvbWUoaSA9PiBjaGVjayhpWzFdPy50b1N0cmluZz8uKCkgfHwgXCJcIiwgaikpXHJcbiAgfSk7XHJcbn07XHJcbmZ1bmN0aW9uIGNoZWNrTW9kdWxlUHJvcHMobSwgcHJvcGVydGllcywgaGFzTm90KSB7XHJcbiAgcmV0dXJuIHByb3BlcnRpZXMuZXZlcnkocHJvcCA9PiB7XHJcbiAgICBjb25zdCB2YWx1ZSA9IG1bcHJvcF0/Ll9fb3JpZ2luYWxfXyB8fCBtW3Byb3BdO1xyXG4gICAgcmV0dXJuIGhhc05vdCA/IHZhbHVlID09PSB1bmRlZmluZWQgOiAodmFsdWUgIT09IHVuZGVmaW5lZCAmJiAhKHR5cGVvZiB2YWx1ZSA9PSBcInN0cmluZ1wiICYmICF2YWx1ZSkpO1xyXG4gIH0pO1xyXG59O1xyXG5mdW5jdGlvbiBjaGVja01vZHVsZVByb3RvdHlwZXMobSwgcHJvdG9Qcm9wcywgaGFzTm90KSB7XHJcbiAgcmV0dXJuIG0ucHJvdG90eXBlICYmIHByb3RvUHJvcHMuZXZlcnkocHJvcCA9PiB7XHJcbiAgICBjb25zdCB2YWx1ZSA9IG0ucHJvdG90eXBlW3Byb3BdO1xyXG4gICAgcmV0dXJuIGhhc05vdCA/IHZhbHVlID09PSB1bmRlZmluZWQgOiAodmFsdWUgIT09IHVuZGVmaW5lZCAmJiAhKHR5cGVvZiB2YWx1ZSA9PSBcInN0cmluZ1wiICYmICF2YWx1ZSkpO1xyXG4gIH0pO1xyXG59O1xyXG5cclxuY29uc3Qgd2VicGFja0NodW5rTmFtZSA9IFwid2VicGFja0NodW5rZGlzY29yZF9hcHBcIjtcclxuY29uc3QgcHVzaExpc3RlbmVycyA9IG5ldyBTZXQoKTtcclxuXHJcblxyXG57XHJcbiAgbGV0IG9nUHVzaCA9IHdpbmRvd1t3ZWJwYWNrQ2h1bmtOYW1lXS5wdXNoO1xyXG5cclxuICBmdW5jdGlvbiBoYW5kbGVQdXNoKGNodW5rKSB7XHJcbiAgICBjb25zdCBbLCBtb2R1bGVzXSA9IGNodW5rO1xyXG5cclxuICAgIGZvciAoY29uc3QgbW9kdWxlSWQgaW4gT2JqZWN0LmtleXMobW9kdWxlcyB8fCB7fSkpIHtcclxuICAgICAgY29uc3Qgb2dNb2R1bGUgPSBtb2R1bGVzW21vZHVsZUlkXTtcclxuXHJcbiAgICAgIG1vZHVsZXNbbW9kdWxlSWRdID0gKG1vZHVsZSwgZXhwb3J0cywgcmVxdWlyZSkgPT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICBvZ01vZHVsZS5jYWxsKG51bGwsIG1vZHVsZSwgZXhwb3J0cywgcmVxdWlyZSk7XHJcblxyXG4gICAgICAgICAgcHVzaExpc3RlbmVycy5mb3JFYWNoKGxpc3RlbmVyID0+IHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICBsaXN0ZW5lcihleHBvcnRzKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICB1dGlscy5sb2dnZXIuZXJyb3IoXCJQdXNoIGxpc3RlbmVyIHRocmV3IGFuIGV4Y2VwdGlvbi5cIiwgbGlzdGVuZXIsIGVycm9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgdXRpbHMubG9nZ2VyLmVycm9yKFwiVW5hYmxlIHRvIHBhdGNoIHB1c2hlZCBtb2R1bGUuXCIsIGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcblxyXG4gICAgICBPYmplY3QuYXNzaWduKG1vZHVsZXNbbW9kdWxlSWRdLCBvZ01vZHVsZSwge1xyXG4gICAgICAgIF9fb3JpZ2luYWxfXzogb2dNb2R1bGUsXHJcbiAgICAgICAgdG9TdHJpbmc6ICgpID0+IG9nTW9kdWxlLnRvU3RyaW5nKCksXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBvZ1B1c2guY2FsbCh3aW5kb3dbd2VicGFja0NodW5rTmFtZV0sIGNodW5rKTtcclxuICB9XHJcblxyXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3dbd2VicGFja0NodW5rTmFtZV0sIFwicHVzaFwiLCB7XHJcbiAgICBjb25maWd1cmFibGU6IHRydWUsXHJcbiAgICBnZXQoKSB7IHJldHVybiBoYW5kbGVQdXNoOyB9LFxyXG4gICAgc2V0KHZhbHVlKSB7XHJcbiAgICAgIG9nUHVzaCA9IHZhbHVlO1xyXG5cclxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvd1t0aGlzLmNodW5rTmFtZV0sIFwicHVzaFwiLCB7XHJcbiAgICAgICAgdmFsdWU6IHRoaXMuaGFuZGxlUHVzaCxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXHJcbiAgICAgICAgd3JpdGFibGU6IHRydWVcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn1cclxuXHJcblxyXG5cclxuLyoqXHJcbiAqIFxyXG4gKiBAcGFyYW0ge2FueX0gZmlsdGVyIFxyXG4gKiBAcGFyYW0ge3sgc2lnbmFsOiBBYm9ydFNpZ25hbCwgc2VhcmNoRXhwb3J0czogYm9vbGVhbiB9fSBwYXJhbTEgXHJcbiAqIEByZXR1cm5zIFxyXG4gKi9cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGxhenlGaW5kKGZpbHRlciwgeyBzaWduYWwgPSBudWxsLCBzZWFyY2hFeHBvcnRzID0gZmFsc2UgfSkge1xyXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICBjb25zdCBjYW5jZWwgPSAoKSA9PiBwdXNoTGlzdGVuZXJzLmRlbGV0ZShsaXN0ZW5lcik7XHJcbiAgICBjb25zdCBsaXN0ZW5lciA9IChleHBvcnRzKSA9PiB7XHJcbiAgICAgIGlmICghZXhwb3J0cyB8fCBleHBvcnRzID09PSB3aW5kb3cgfHwgZXhwb3J0cyA9PT0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSByZXR1cm47XHJcblxyXG4gICAgICBsZXQgZm91bmQgPSBudWxsO1xyXG5cclxuICAgICAgaWYgKHR5cGVvZiBleHBvcnRzID09IFwib2JqZWN0XCIgJiYgc2VhcmNoRXhwb3J0cykge1xyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIGV4cG9ydHMpIHtcclxuICAgICAgICAgIGxldCBleHBvcnRlZCA9IGV4cG9ydHNba2V5XTtcclxuICAgICAgICAgIGlmICghZXhwb3J0ZWQpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgaWYgKGZpbHRlcihleHBvcnRlZCkpIHtcclxuICAgICAgICAgICAgZm91bmQgPSBleHBvcnRlZDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGxldCBwYXRocyA9IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIixcclxuICAgICAgICAgIFwiXCJcclxuICAgICAgICBdO1xyXG4gICAgICAgIGZvdW5kID0gcGF0aHMubWFwKGkgPT4ge1xyXG4gICAgICAgICAgbGV0IHBhdGhlZCA9ICFpID8gZXhwb3J0cyA6IF8uZ2V0KGV4cG9ydHMsIGkpO1xyXG4gICAgICAgICAgaWYgKHBhdGhlZCAmJiBmaWx0ZXIocGF0aGVkKSkgcmV0dXJuIHBhdGhlZDtcclxuICAgICAgICB9KS5maW5kKGkgPT4gaSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICghZm91bmQpIHJldHVybjtcclxuICAgICAgY2FuY2VsKCk7XHJcbiAgICAgIHJlc29sdmUoZm91bmQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1c2hMaXN0ZW5lcnMuYWRkKGxpc3RlbmVyKTtcclxuXHJcbiAgICBzaWduYWw/LmFkZEV2ZW50TGlzdGVuZXIoXCJhYm9ydFwiLCAoKSA9PiB7XHJcbiAgICAgIGNhbmNlbCgpO1xyXG4gICAgICByZXNvbHZlKG51bGwpO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBmaW5kKHJlcSwgZmlsdGVyLCBjb25maWcgPSB7fSkge1xyXG4gIGxldCBkZWZhdWx0RXhwb3J0ID0gdHlwZW9mIGNvbmZpZy5kZWZhdWx0RXhwb3J0ICE9IFwiYm9vbGVhblwiID8gZmFsc2UgOiBjb25maWcuZGVmYXVsdEV4cG9ydDtcclxuICBsZXQgdW5sb2FkZWQgPSB0eXBlb2YgY29uZmlnLnVubG9hZGVkICE9IFwiYm9vbGVhblwiID8gZmFsc2UgOiBjb25maWcudW5sb2FkZWQ7XHJcbiAgbGV0IGFsbCA9IHR5cGVvZiBjb25maWcuYWxsICE9IFwiYm9vbGVhblwiID8gZmFsc2UgOiBjb25maWcuYWxsO1xyXG4gIGNvbnN0IGZvdW5kID0gW107XHJcbiAgaWYgKCF1bmxvYWRlZCkgZm9yIChsZXQgaSBpbiByZXEuYykgaWYgKHJlcS5jLmhhc093blByb3BlcnR5KGkpKSB7XHJcbiAgICBsZXQgbSA9IHJlcS5jW2ldLmV4cG9ydHMsIHIgPSBudWxsO1xyXG4gICAgaWYgKG0gJiYgKHR5cGVvZiBtID09IFwib2JqZWN0XCIgfHwgdHlwZW9mIG0gPT0gXCJmdW5jdGlvblwiKSkge1xyXG4gICAgICBpZiAoISEociA9IGZpbHRlcihtLCBpKSkpIHtcclxuICAgICAgICBpZiAoYWxsKSBmb3VuZC5wdXNoKGRlZmF1bHRFeHBvcnQgPyByIDogcmVxLmNbaV0pO1xyXG4gICAgICAgIGVsc2UgcmV0dXJuIGRlZmF1bHRFeHBvcnQgPyByIDogcmVxLmNbaV07XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBmb3IgKGxldCBrZXkgb2YgT2JqZWN0LmtleXMobSkpIGlmIChrZXkubGVuZ3RoIDwgNCAmJiBtW2tleV0gJiYgISEociA9IGZpbHRlcihtW2tleV0sIGkpKSkge1xyXG4gICAgICAgIGlmIChhbGwpIGZvdW5kLnB1c2goZGVmYXVsdEV4cG9ydCA/IHIgOiByZXEuY1tpXSk7XHJcbiAgICAgICAgZWxzZSByZXR1cm4gZGVmYXVsdEV4cG9ydCA/IHIgOiByZXEuY1tpXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKG0gJiYgbS5fX2VzTW9kdWxlICYmIG0uZGVmYXVsdCAmJiAodHlwZW9mIG0uZGVmYXVsdCA9PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBtLmRlZmF1bHQgPT0gXCJmdW5jdGlvblwiKSkge1xyXG4gICAgICBpZiAoISEociA9IGZpbHRlcihtLmRlZmF1bHQsIGkpKSkge1xyXG4gICAgICAgIGlmIChhbGwpIGZvdW5kLnB1c2goZGVmYXVsdEV4cG9ydCA/IHIgOiByZXEuY1tpXSk7XHJcbiAgICAgICAgZWxzZSByZXR1cm4gZGVmYXVsdEV4cG9ydCA/IHIgOiByZXEuY1tpXTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIGlmIChtLmRlZmF1bHQudHlwZSAmJiAodHlwZW9mIG0uZGVmYXVsdC50eXBlID09IFwib2JqZWN0XCIgfHwgdHlwZW9mIG0uZGVmYXVsdC50eXBlID09IFwiZnVuY3Rpb25cIikgJiYgISEociA9IGZpbHRlcihtLmRlZmF1bHQudHlwZSwgaSkpKSB7XHJcbiAgICAgICAgaWYgKGFsbCkgZm91bmQucHVzaChkZWZhdWx0RXhwb3J0ID8gciA6IHJlcS5jW2ldKTtcclxuICAgICAgICBlbHNlIHJldHVybiBkZWZhdWx0RXhwb3J0ID8gciA6IHJlcS5jW2ldO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIGZvciAobGV0IGkgaW4gcmVxLm0pIGlmIChyZXEubS5oYXNPd25Qcm9wZXJ0eShpKSkge1xyXG4gICAgbGV0IG0gPSByZXEubVtpXTtcclxuICAgIGlmIChtICYmIHR5cGVvZiBtID09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICBpZiAocmVxLmNbaV0gJiYgIXVubG9hZGVkICYmIGZpbHRlcihtLCBpKSkge1xyXG4gICAgICAgIGlmIChhbGwpIGZvdW5kLnB1c2goZGVmYXVsdEV4cG9ydCA/IHJlcS5jW2ldLmV4cG9ydHMgOiByZXEuY1tpXSk7XHJcbiAgICAgICAgZWxzZSByZXR1cm4gZGVmYXVsdEV4cG9ydCA/IHJlcS5jW2ldLmV4cG9ydHMgOiByZXEuY1tpXTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoIXJlcS5jW2ldICYmIHVubG9hZGVkICYmIGZpbHRlcihtLCBpKSkge1xyXG4gICAgICAgIGNvbnN0IHJlc29sdmVkID0ge30sIHJlc29sdmVkMiA9IHt9O1xyXG4gICAgICAgIG0ocmVzb2x2ZWQsIHJlc29sdmVkMiwgcmVxKTtcclxuICAgICAgICBjb25zdCB0cnVlUmVzb2x2ZWQgPSByZXNvbHZlZDIgJiYgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMocmVzb2x2ZWQyIHx8IHt9KS5sZW5ndGggPT0gMCA/IHJlc29sdmVkIDogcmVzb2x2ZWQyO1xyXG4gICAgICAgIGlmIChhbGwpIGZvdW5kLnB1c2goZGVmYXVsdEV4cG9ydCA/IHRydWVSZXNvbHZlZC5leHBvcnRzIDogdHJ1ZVJlc29sdmVkKTtcclxuICAgICAgICBlbHNlIHJldHVybiBkZWZhdWx0RXhwb3J0ID8gdHJ1ZVJlc29sdmVkLmV4cG9ydHMgOiB0cnVlUmVzb2x2ZWQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgaWYgKGFsbCkgcmV0dXJuIGZvdW5kO1xyXG59O1xyXG5cclxuXHJcbmZ1bmN0aW9uIGZpbmRlckZpbmRGdW5jdGlvbihlbnRyaWVzLCBzdHJpbmdzKSB7XHJcbiAgcmV0dXJuIChlbnRyaWVzLmZpbmQobiA9PiB7XHJcbiAgICBsZXQgZnVuY1N0cmluZyA9IHR5cGVvZiBuWzFdID09IFwiZnVuY3Rpb25cIiA/IChuWzFdPy5fX29yaWdpbmFsX18/LnRvU3RyaW5nPy4oKSB8fCBuWzFdPy50b1N0cmluZz8uKCkgfHwgXCJcIikgOiAoKCkgPT4geyB0cnkgeyByZXR1cm4gSlNPTi5zdHJpbmdpZnkoblsxXSkgfSBjYXRjaCAoZXJyKSB7IHJldHVybiBuWzFdLnRvU3RyaW5nKCkgfSB9KSgpO1xyXG4gICAgbGV0IHJlbmRlckZ1bmNTdHJpbmcgPSBuWzFdPy5yZW5kZXI/Ll9fb3JpZ2luYWxfXz8udG9TdHJpbmc/LigpIHx8IG5bMV0/LnJlbmRlcj8udG9TdHJpbmc/LigpIHx8IFwiXCI7XHJcbiAgICByZXR1cm4gc3RyaW5ncy5ldmVyeShzdHJpbmcgPT4gZnVuY1N0cmluZy5pbmRleE9mKHN0cmluZykgIT0gLTEgfHwgcmVuZGVyRnVuY1N0cmluZy5pbmRleE9mKHN0cmluZykgIT0gLTEpO1xyXG4gIH0pKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRlclRvRmlsdGVyKGZpbmRlcikge1xyXG4gIGxldCBmb3VuZCA9ICgpID0+IGZhbHNlO1xyXG4gIGlmICh0eXBlb2YgZmluZGVyPy5maWx0ZXIgPT09IFwic3RyaW5nXCIpIHtcclxuICAgIGZvdW5kID0gd3JhcEZpbHRlcihldmFsKGAoKCQpPT57IHRyeSB7IHJldHVybiAoJHtmaW5kZXIuZmlsdGVyfSk7IH0gY2F0Y2ggeyByZXR1cm4gZmFsc2U7IH0gfSlgKSk7XHJcbiAgfSBlbHNlIGlmICh0eXBlb2YgZmluZGVyPy5maWx0ZXIgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgZm91bmQgPSB3cmFwRmlsdGVyKGZpbmRlci5maWx0ZXIpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBzd2l0Y2ggKGZpbmRlci5maWx0ZXIuaW4pIHtcclxuICAgICAgY2FzZSBcInByb3BlcnRpZXNcIjoge1xyXG4gICAgICAgIGlmIChmaW5kZXIuZmlsdGVyLmJ5Py5bMV0/Lmxlbmd0aCkge1xyXG4gICAgICAgICAgZm91bmQgPSB3cmFwRmlsdGVyKChtKSA9PiBjaGVja01vZHVsZVByb3BzKG0sIGZpbmRlci5maWx0ZXIuYnk/LlswXSB8fCBbXSkgJiYgY2hlY2tNb2R1bGVQcm9wcyhtLCBmaW5kZXIuZmlsdGVyLmJ5Py5bMV0gfHwgW10sIHRydWUpKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZm91bmQgPSB3cmFwRmlsdGVyKChtKSA9PiBjaGVja01vZHVsZVByb3BzKG0sIGZpbmRlci5maWx0ZXIuYnk/LlswXSB8fCBbXSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlIFwicHJvdG90eXBlc1wiOiB7XHJcbiAgICAgICAgaWYgKGZpbmRlci5maWx0ZXIuYnk/LlsxXT8ubGVuZ3RoKSB7XHJcbiAgICAgICAgICBmb3VuZCA9IHdyYXBGaWx0ZXIoKG0pID0+IGNoZWNrTW9kdWxlUHJvdG90eXBlcyhtLCBmaW5kZXIuZmlsdGVyLmJ5Py5bMF0gfHwgW10pICYmIGNoZWNrTW9kdWxlUHJvdG90eXBlcyhtLCBmaW5kZXIuZmlsdGVyLmJ5Py5bMV0gfHwgW10sIHRydWUpKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZm91bmQgPSB3cmFwRmlsdGVyKChtKSA9PiBjaGVja01vZHVsZVByb3RvdHlwZXMobSwgZmluZGVyLmZpbHRlci5ieT8uWzBdIHx8IFtdKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgXCJzdHJpbmdzXCI6IHtcclxuICAgICAgICBpZiAoZmluZGVyLmZpbHRlci5ieT8uWzFdPy5sZW5ndGgpIHtcclxuICAgICAgICAgIGZvdW5kID0gd3JhcEZpbHRlcigobSkgPT4gY2hlY2tNb2R1bGVTdHJpbmdzKG0sIGZpbmRlci5maWx0ZXIuYnk/LlswXSB8fCBbXSkgJiYgY2hlY2tNb2R1bGVTdHJpbmdzKG0sIGZpbmRlci5maWx0ZXIuYnk/LlsxXSB8fCBbXSwgdHJ1ZSkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBmb3VuZCA9IHdyYXBGaWx0ZXIoKG0pID0+IGNoZWNrTW9kdWxlU3RyaW5ncyhtLCBmaW5kZXIuZmlsdGVyLmJ5Py5bMF0gfHwgW10pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIGZvdW5kO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZmluZGVyTWFwKF9fb3JpZ2luYWxfXywgbWFwKSB7XHJcbiAgbGV0IF9fbWFwcGVkX18gPSB7fTtcclxuXHJcbiAgbGV0IHRlbXAgPSB7XHJcbiAgICBfX29yaWdpbmFsX18sXHJcbiAgICBfX21hcHBlZF9fLFxyXG4gICAgLi4uX19vcmlnaW5hbF9fXHJcbiAgfTtcclxuXHJcbiAgT2JqZWN0LmVudHJpZXMobWFwKS5mb3JFYWNoKChba2V5LCBzdHJpbmdzXSkgPT4ge1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRlbXAsIGtleSwge1xyXG4gICAgICBnZXQoKSB7XHJcbiAgICAgICAgaWYgKF9fbWFwcGVkX19ba2V5XSkgcmV0dXJuIF9fb3JpZ2luYWxfX1tfX21hcHBlZF9fW2tleV1dO1xyXG5cclxuICAgICAgICBsZXQgZm91bmRGdW5jID0gZmluZGVyRmluZEZ1bmN0aW9uKE9iamVjdC5lbnRyaWVzKF9fb3JpZ2luYWxfXyB8fCB7fSksIG1hcFtrZXldIHx8IFtdKTtcclxuICAgICAgICBpZiAoIWZvdW5kRnVuYz8ubGVuZ3RoKSByZXR1cm47XHJcblxyXG4gICAgICAgIF9fbWFwcGVkX19ba2V5XSA9IGZvdW5kRnVuY1swXTtcclxuICAgICAgICByZXR1cm4gZm91bmRGdW5jWzFdO1xyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gdGVtcDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRCeUZpbmRlcihyZXEsIGZpbmRlciA9IHt9KSB7XHJcbiAgY29uc3QgZGVmYXVsdEV4cG9ydCA9ICEhZmluZGVyPy5maWx0ZXI/LmV4cG9ydDtcclxuICBsZXQgZm91bmQgPSBmaW5kKHJlcSwgZmluZGVyVG9GaWx0ZXIoZmluZGVyKSwgeyBkZWZhdWx0RXhwb3J0LCBhbGw6IHRydWUgfSkuZmluZChpID0+IGkgIT09IGdsb2JhbFRoaXMud2luZG93IHx8IGk/LmV4cG9ydHMgIT09IGdsb2JhbFRoaXMud2luZG93KTtcclxuXHJcbiAgaWYgKCFmb3VuZCkgcmV0dXJuIG51bGw7XHJcblxyXG4gIGlmIChmaW5kZXIucGF0aD8uYmVmb3JlKSBmb3VuZCA9IChBcnJheS5pc0FycmF5KGZpbmRlci5wYXRoLmJlZm9yZSkgPyBmaW5kZXIucGF0aC5iZWZvcmUubWFwKGkgPT4gXy5nZXQoZm91bmQsIGkpKS5maW5kKGkgPT4gaSkgOiBfLmdldChmb3VuZCwgZmluZGVyLnBhdGguYmVmb3JlKSkgfHwgZm91bmQ7XHJcbiAgaWYgKGZpbmRlci5hc3NpZ24pIGZvdW5kID0gT2JqZWN0LmFzc2lnbih7fSwgZm91bmQpO1xyXG5cclxuICBpZiAoIWZvdW5kKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgaWYgKGZpbmRlci5tYXApIGZvdW5kID0gZmluZGVyTWFwKGZvdW5kLCBmaW5kZXIubWFwKTtcclxuXHJcbiAgaWYgKGZpbmRlci5wYXRoPy5hZnRlcikgZm91bmQgPSAoQXJyYXkuaXNBcnJheShmaW5kZXIucGF0aC5hZnRlcikgPyBmaW5kZXIucGF0aC5hZnRlci5tYXAoaSA9PiBfLmdldChmb3VuZCwgaSkpLmZpbmQoaSA9PiBpKSA6IF8uZ2V0KGZvdW5kLCBmaW5kZXIucGF0aC5hZnRlcikpIHx8IGZvdW5kO1xyXG5cclxuICByZXR1cm4gZm91bmQ7XHJcbn1cclxuXHJcblxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGxhenlGaW5kQnlGaW5kZXIoZmluZGVyID0ge30pIHtcclxuICBsZXQgZm91bmQgPSBhd2FpdCBsYXp5RmluZChmaW5kZXJUb0ZpbHRlcihmaW5kZXIpLCB7IHNlYXJjaEV4cG9ydHM6IGZhbHNlIH0pO1xyXG5cclxuICBpZiAoIWZvdW5kKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgaWYgKGZpbmRlci5wYXRoPy5iZWZvcmUpIGZvdW5kID0gKEFycmF5LmlzQXJyYXkoZmluZGVyLnBhdGguYmVmb3JlKSA/IGZpbmRlci5wYXRoLmJlZm9yZS5tYXAoaSA9PiBfLmdldChmb3VuZCwgaSkpLmZpbmQoaSA9PiBpKSA6IF8uZ2V0KGZvdW5kLCBmaW5kZXIucGF0aC5iZWZvcmUpKSB8fCBmb3VuZDtcclxuICBpZiAoZmluZGVyLmFzc2lnbikgZm91bmQgPSBPYmplY3QuYXNzaWduKHt9LCBmb3VuZCk7XHJcblxyXG4gIGlmICghZm91bmQpIHJldHVybiBudWxsO1xyXG5cclxuICBpZiAoZmluZGVyLm1hcCkgZm91bmQgPSBmaW5kZXJNYXAoZm91bmQsIGZpbmRlci5tYXApO1xyXG5cclxuICBpZiAoZmluZGVyLnBhdGg/LmFmdGVyKSBmb3VuZCA9IChBcnJheS5pc0FycmF5KGZpbmRlci5wYXRoLmFmdGVyKSA/IGZpbmRlci5wYXRoLmFmdGVyLm1hcChpID0+IF8uZ2V0KGZvdW5kLCBpKSkuZmluZChpID0+IGkpIDogXy5nZXQoZm91bmQsIGZpbmRlci5wYXRoLmFmdGVyKSkgfHwgZm91bmQ7XHJcblxyXG4gIHJldHVybiBmb3VuZDtcclxufSIsICJpbXBvcnQgKiBhcyBjb21wbGV4RmluZGVyIGZyb20gXCIuL3Jhdy9jb21wbGV4LWZpbmRlci5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIF9fY2FjaGVfXzoge30sXHJcbiAgZ2V0IHJlcXVpcmUoKSB7XHJcbiAgICBpZiAodGhpcy5fX2NhY2hlX18ucmVxdWlyZSkgcmV0dXJuIHRoaXMuX19jYWNoZV9fLnJlcXVpcmU7XHJcbiAgICBsZXQgcmVxSWQgPSBgQWNvcmRXZWJwYWNrTW9kdWxlcyR7RGF0ZS5ub3coKX1gO1xyXG4gICAgY29uc3QgcmVxID0gd2luZG93LndlYnBhY2tDaHVua2Rpc2NvcmRfYXBwLnB1c2goW1tyZXFJZF0sIHt9LCByZXEgPT4gcmVxXSk7XHJcbiAgICBkZWxldGUgcmVxLm1bcmVxSWRdO1xyXG4gICAgZGVsZXRlIHJlcS5jW3JlcUlkXTtcclxuICAgIHdpbmRvdy53ZWJwYWNrQ2h1bmtkaXNjb3JkX2FwcC5wb3AoKTtcclxuICAgIHRoaXMuX19jYWNoZV9fLnJlcXVpcmUgPSByZXE7XHJcbiAgICByZXR1cm4gcmVxO1xyXG4gIH0sXHJcbiAgZmluZChmaWx0ZXIsIGNvbmZpZyA9IHt9KSB7XHJcbiAgICByZXR1cm4gY29tcGxleEZpbmRlci5maW5kKHRoaXMucmVxdWlyZSwgY29tcGxleEZpbmRlci53cmFwRmlsdGVyKGZpbHRlciksIGNvbmZpZyk7XHJcbiAgfSxcclxuICBsYXp5RmluZChmaWx0ZXIsIGNvbmZpZyA9IHt9KSB7XHJcbiAgICByZXR1cm4gY29tcGxleEZpbmRlci5sYXp5RmluZChjb21wbGV4RmluZGVyLndyYXBGaWx0ZXIoZmlsdGVyKSwgY29uZmlnKTtcclxuICB9LFxyXG4gIGxhenlGaW5kQnlGaW5kZXIoZmluZGVyKSB7XHJcbiAgICByZXR1cm4gY29tcGxleEZpbmRlci5sYXp5RmluZEJ5RmluZGVyKGZpbmRlcik7XHJcbiAgfSxcclxuICBmaWx0ZXIoZmlsdGVyLCBjb25maWcgPSB7fSkge1xyXG4gICAgcmV0dXJuIGNvbXBsZXhGaW5kZXIuZmluZCh0aGlzLnJlcXVpcmUsIGNvbXBsZXhGaW5kZXIud3JhcEZpbHRlcihmaWx0ZXIpLCB7IC4uLmNvbmZpZywgYWxsOiB0cnVlIH0pO1xyXG4gIH0sXHJcbiAgZmluZEJ5RmluZGVyKGZpbmRlcikge1xyXG4gICAgcmV0dXJuIGNvbXBsZXhGaW5kZXIuZmluZEJ5RmluZGVyKHRoaXMucmVxdWlyZSwgZmluZGVyKTtcclxuICB9LFxyXG4gIGZpbmRCeVByb3BlcnRpZXMoLi4ucHJvcHMpIHtcclxuICAgIHJldHVybiB0aGlzLmZpbmRCeUZpbmRlcih7XHJcbiAgICAgIGZpbHRlcjoge1xyXG4gICAgICAgIGV4cG9ydDogZmFsc2UsXHJcbiAgICAgICAgaW46IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIGJ5OiBbcHJvcHNdXHJcbiAgICAgIH0sXHJcbiAgICAgIHBhdGg6IHtcclxuICAgICAgICBiZWZvcmU6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSxcclxuICBmaW5kQnlQcm90b3R5cGVzKC4uLnByb3BzKSB7XHJcbiAgICByZXR1cm4gdGhpcy5maW5kQnlGaW5kZXIoe1xyXG4gICAgICBmaWx0ZXI6IHtcclxuICAgICAgICBleHBvcnQ6IGZhbHNlLFxyXG4gICAgICAgIGluOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBieTogW3Byb3BzXVxyXG4gICAgICB9LFxyXG4gICAgICBwYXRoOiB7XHJcbiAgICAgICAgYmVmb3JlOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgZmluZEJ5U3RyaW5ncyguLi5wcm9wcykge1xyXG4gICAgcmV0dXJuIHRoaXMuZmluZEJ5RmluZGVyKHtcclxuICAgICAgZmlsdGVyOiB7XHJcbiAgICAgICAgZXhwb3J0OiBmYWxzZSxcclxuICAgICAgICBpbjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgYnk6IFtwcm9wc11cclxuICAgICAgfSxcclxuICAgICAgcGF0aDoge1xyXG4gICAgICAgIGJlZm9yZTogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9LFxyXG59OyIsICJpbXBvcnQgY29tbW9uRGF0YSBmcm9tICcuLi8uLi9kYXRhL2NvbW1vbi5qc29uJztcclxuaW1wb3J0IHdlYnBhY2sgZnJvbSAnLi93ZWJwYWNrLmpzJztcclxuXHJcblxyXG5mdW5jdGlvbiBtYXBPYmplY3QodGVtcCwgaW5wKSB7XHJcbiAgaWYgKCF0ZW1wPy5fX2NhY2hlX18pIHRlbXAuX19jYWNoZV9fID0ge307XHJcbiAgZm9yIChjb25zdCBrZXkgaW4gaW5wKSB7XHJcbiAgICBpZiAoaW5wPy5ba2V5XT8uX18gPT09IHRydWUpIHtcclxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRlbXAsIGtleSwge1xyXG4gICAgICAgIGdldCgpIHtcclxuICAgICAgICAgIGlmICh0ZW1wLl9fY2FjaGVfX1trZXldKSByZXR1cm4gdGVtcC5fX2NhY2hlX19ba2V5XTtcclxuICAgICAgICAgIHJldHVybiB0ZW1wLl9fY2FjaGVfX1trZXldID0gd2VicGFjay5maW5kQnlGaW5kZXIoaW5wW2tleV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICh0eXBlb2YgdGVtcFtrZXldID09PSBcInVuZGVmaW5lZFwiKSB0ZW1wW2tleV0gPSB7fTtcclxuICAgICAgbWFwT2JqZWN0KHRlbXBba2V5XSwgaW5wW2tleV0pO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuXHJcbmxldCBjb21tb24gPSB7XHJcbiAgX19jYWNoZV9fOiB7fSxcclxuICBMYXllckFjdGlvbnM6IHtcclxuICAgIHB1c2goY29tcG9uZW50KSB7XHJcbiAgICAgIGNvbW1vbi5GbHV4RGlzcGF0Y2hlci5kaXNwYXRjaCh7XHJcbiAgICAgICAgdHlwZTogXCJMQVlFUl9QVVNIXCIsXHJcbiAgICAgICAgY29tcG9uZW50XHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIHBvcCgpIHtcclxuICAgICAgY29tbW9uLkZsdXhEaXNwYXRjaGVyLmRpc3BhdGNoKHtcclxuICAgICAgICB0eXBlOiBcIkxBWUVSX1BPUFwiXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIHBvcEFsbCgpIHtcclxuICAgICAgY29tbW9uLkZsdXhEaXNwYXRjaGVyLmRpc3BhdGNoKHtcclxuICAgICAgICB0eXBlOiBcIkxBWUVSX1BPUF9BTExcIlxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9LFxyXG59O1xyXG5tYXBPYmplY3QoY29tbW9uLCBjb21tb25EYXRhLmNvbW1vbik7XHJcbntcclxuICBsZXQgcGF0aHMgPSBbXHJcbiAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgXCJleHBvcnRzXCJcclxuICBdO1xyXG4gIHdlYnBhY2suZmlsdGVyKChpKSA9PiBpPy5nZXROYW1lPy4oKT8uZW5kc1dpdGg/LihcIlN0b3JlXCIpLCB7IGRlZmF1bHRFeHBvcnQ6IGZhbHNlIH0pLmZvckVhY2goKG0pID0+IHtcclxuICAgIGxldCBvYmogPSBwYXRocy5tYXAocGF0aCA9PiBfLmdldChtLCBwYXRoKSkuZmluZChpID0+IGkpO1xyXG4gICAgaWYgKCFvYmopIHJldHVybjtcclxuICAgIGxldCBuYW1lID0gb2JqPy5nZXROYW1lPy4oKTtcclxuICAgIGlmICghbmFtZSkgcmV0dXJuO1xyXG4gICAgaWYgKGNvbW1vbltuYW1lXSkgcmV0dXJuO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb21tb24sIG5hbWUsIHtcclxuICAgICAgZ2V0KCkge1xyXG4gICAgICAgIGlmIChjb21tb24uX19jYWNoZV9fW25hbWVdKSByZXR1cm4gY29tbW9uLl9fY2FjaGVfX1tuYW1lXTtcclxuICAgICAgICByZXR1cm4gY29tbW9uLl9fY2FjaGVfX1tuYW1lXSA9IG9iajtcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9KVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb21tb247IiwgImltcG9ydCBjb21tb24gZnJvbSBcIi4vY29tbW9uLmpzXCI7XHJcbmltcG9ydCB3ZWJwYWNrIGZyb20gXCIuL3dlYnBhY2suanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBjb21tb24sXHJcbiAgd2VicGFjayxcclxuICByZXF1aXJlOiBnbG9iYWxUaGlzW1wiPFBSRUxPQURfS0VZPlwiXS5yZXF1aXJlXHJcbn0iLCAiaW1wb3J0IG1vZHVsZXMgZnJvbSBcIi4uL2FwaS9tb2R1bGVzL2luZGV4LmpzXCI7XHJcblxyXG5sZXQgaXNDb25uZWN0aW9uT3BlbiA9IGZhbHNlO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHdhaXRVbnRpbENvbm5lY3Rpb25PcGVuKCkge1xyXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG4gICAgaWYgKGlzQ29ubmVjdGlvbk9wZW4pIHJldHVybiByZXNvbHZlKHRydWUpO1xyXG4gICAgZnVuY3Rpb24gb25FdmVudCgpIHtcclxuICAgICAgbW9kdWxlcy5jb21tb24uRmx1eERpc3BhdGNoZXIudW5zdWJzY3JpYmUoXCJDT05ORUNUSU9OX09QRU5cIiwgb25FdmVudCk7XHJcbiAgICAgIGlzQ29ubmVjdGlvbk9wZW4gPSB0cnVlO1xyXG4gICAgICByZXNvbHZlKHRydWUpO1xyXG4gICAgfVxyXG4gICAgbW9kdWxlcy5jb21tb24uRmx1eERpc3BhdGNoZXIuc3Vic2NyaWJlKFwiQ09OTkVDVElPTl9PUEVOXCIsIG9uRXZlbnQpO1xyXG4gIH0pO1xyXG59IiwgImV4cG9ydCBjbGFzcyBCYXNpY0V2ZW50RW1pdHRlciB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAvKiogQHR5cGUge01hcDxzdHJpbmcsIE1hcDwoLi4uYXJnczogYW55W10pPT52b2lkLCB7b25jZTogYm9vbGVhbn0+Pn0gKi9cclxuICAgIHRoaXMubGlzdGVuZXJzID0gbmV3IE1hcCgpO1xyXG4gIH1cclxuXHJcbiAgX3ByZXBhcmVMaXN0ZW5lcnNNYXAoZXZlbnROYW1lKSB7XHJcbiAgICBpZiAoIXRoaXMubGlzdGVuZXJzLmhhcyhldmVudE5hbWUpKVxyXG4gICAgICB0aGlzLmxpc3RlbmVycy5zZXQoZXZlbnROYW1lLCBuZXcgTWFwKCkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50TmFtZVxyXG4gICAqIEBwYXJhbSB7KC4uLmFyZ3M6IGFueVtdKT0+dm9pZH0gbGlzdGVuZXJcclxuICAgKi9cclxuICBvbihldmVudE5hbWUsIGxpc3RlbmVyKSB7XHJcbiAgICB0aGlzLl9wcmVwYXJlTGlzdGVuZXJzTWFwKGV2ZW50TmFtZSk7XHJcbiAgICB0aGlzLmxpc3RlbmVycy5nZXQoZXZlbnROYW1lKS5zZXQobGlzdGVuZXIsIHsgb25jZTogZmFsc2UgfSk7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICB0aGlzLmxpc3RlbmVycy5nZXQoZXZlbnROYW1lKS5kZWxldGUobGlzdGVuZXIpO1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudE5hbWVcclxuICAgKiBAcGFyYW0geyguLi5hcmdzOiBhbnlbXSk9PnZvaWR9IGxpc3RlbmVyXHJcbiAgICovXHJcbiAgb25jZShldmVudE5hbWUsIGxpc3RlbmVyKSB7XHJcbiAgICB0aGlzLl9wcmVwYXJlTGlzdGVuZXJzTWFwKGV2ZW50TmFtZSk7XHJcbiAgICB0aGlzLmxpc3RlbmVycy5nZXQoZXZlbnROYW1lKT8uc2V0KGxpc3RlbmVyLCB7IG9uY2U6IHRydWUgfSk7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICB0aGlzLmxpc3RlbmVycy5nZXQoZXZlbnROYW1lKS5kZWxldGUobGlzdGVuZXIpO1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nP30gZXZlbnROYW1lXHJcbiAgICogQHBhcmFtIHsoKC4uLmFyZ3M6IGFueVtdKT0+dm9pZCk/fSBsaXN0ZW5lclxyXG4gICAqL1xyXG4gIG9mZihldmVudE5hbWUsIGxpc3RlbmVyKSB7XHJcbiAgICBpZiAoIWV2ZW50TmFtZSkgcmV0dXJuICh0aGlzLmxpc3RlbmVycyA9IG5ldyBNYXAoKSk7XHJcbiAgICBpZiAoIWxpc3RlbmVyKSByZXR1cm4gdGhpcy5saXN0ZW5lcnM/LmRlbGV0ZShldmVudE5hbWUpO1xyXG4gICAgdGhpcy5saXN0ZW5lcnMuZ2V0KGV2ZW50TmFtZSk/LmRlbGV0ZShsaXN0ZW5lcik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnROYW1lXHJcbiAgICogQHBhcmFtICB7Li4uYW55fSBhcmdzXHJcbiAgICovXHJcbiAgZW1pdChldmVudE5hbWUsIC4uLmFyZ3MpIHtcclxuICAgIGlmICghdGhpcy5saXN0ZW5lcnMuaGFzKGV2ZW50TmFtZSkpIHJldHVybjtcclxuICAgIGxldCBldmVudE1hcCA9IHRoaXMubGlzdGVuZXJzLmdldChldmVudE5hbWUpO1xyXG4gICAgZXZlbnRNYXAuZm9yRWFjaCgoeyBvbmNlIH0sIGxpc3RlbmVyKSA9PiB7XHJcbiAgICAgIGlmIChvbmNlKSBldmVudE1hcD8uZGVsZXRlKGxpc3RlbmVyKTtcclxuICAgICAgbGlzdGVuZXIoLi4uYXJncyk7XHJcbiAgICB9KTtcclxuICB9XHJcbn07XHJcbiIsICJpbXBvcnQgeyBCYXNpY0V2ZW50RW1pdHRlciB9IGZyb20gXCIuLi8uLi9saWIvQmFzaWNFdmVudEVtaXR0ZXIuanNcIjtcclxuXHJcbmNvbnN0IGV2ZW50cyA9IG5ldyBCYXNpY0V2ZW50RW1pdHRlcigpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZXZlbnRzOyIsICJpbXBvcnQgZXZlbnRzIGZyb20gXCIuLi9ldmVudHNcIjtcclxuaW1wb3J0IHdlYnBhY2sgZnJvbSBcIi4uL21vZHVsZXMvd2VicGFjay5qc1wiO1xyXG5cclxuY29uc3Qgc2Nyb2xsYmFyQ2xhc3NlcyA9IHdlYnBhY2suZmluZEJ5UHJvcGVydGllcyhcInNjcm9sbGJhckdob3N0SGFpcmxpbmVcIiwgXCJzcGlubmVyXCIpO1xyXG5cclxuY29uc3QgZm9ybWF0UmVnZXhlcyA9IHtcclxuICBib2xkOiAvXFwqXFwqKFteKl0rKVxcKlxcKi9nLFxyXG4gIGl0YWxpYzogL1xcKihbXipdKylcXCovZyxcclxuICB1bmRlcmxpbmU6IC9cXF8oW14qXSspXFxfL2csXHJcbiAgc3RyaWtlOiAvXFx+XFx+KFteKl0rKVxcflxcfi9nLFxyXG4gIHVybDogLyhcXGIoaHR0cHM/fGZ0cHxmaWxlKTpcXC9cXC9bLUEtWjAtOSsmQCNcXC8lPz1+X3whOiwuO10qWy1BLVowLTkrJkAjXFwvJT1+X3xdKS9pZyxcclxuICBpbmxpbmU6IC9cXGAoW14qXSspXFxgL2csXHJcbiAgY29kZWJsb2NrU2luZ2xlOiAvXFxgXFxgXFxgKFteKl0rKVxcYFxcYFxcYC9nLFxyXG4gIGNvZGVibG9ja011bHRpOiAvXFxgXFxgXFxgKFxcdyspXFxuKCg/Oig/IVxcYFxcYFxcYClbXFxzXFxTXSkqKVxcYFxcYFxcYC9nXHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgcGFyc2UoaHRtbCkge1xyXG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBkaXYuaW5uZXJIVE1MID0gaHRtbDtcclxuICAgIHJldHVybiBkaXYuZmlyc3RFbGVtZW50Q2hpbGQ7XHJcbiAgfSxcclxuICB0b0NTU1Byb3Aobykge1xyXG4gICAgbGV0IGVsbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBPYmplY3QuZW50cmllcyhvKS5mb3JFYWNoKChpKSA9PiB7XHJcbiAgICAgIGlmIChlbG0uc3R5bGUuaGFzT3duUHJvcGVydHkoaVswXSkpIHtcclxuICAgICAgICBlbG0uc3R5bGVbaVswXV0gPSBpWzFdO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGVsbS5zdHlsZS5zZXRQcm9wZXJ0eShpWzBdLCBpWzFdKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gZWxtLmdldEF0dHJpYnV0ZShcInN0eWxlXCIpO1xyXG4gIH0sXHJcbiAgdG9IVE1MUHJvcHMobykge1xyXG4gICAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKG8pXHJcbiAgICAgIC5tYXAoXHJcbiAgICAgICAgKGkpID0+XHJcbiAgICAgICAgICBgJHtpWzBdLnJlcGxhY2UoLyArLywgXCItXCIpfT1cIiR7aVswXSA9PSBcInN0eWxlXCIgJiYgdHlwZW9mIGlbMV0gIT0gXCJzdHJpbmdcIlxyXG4gICAgICAgICAgICA/IHRoaXMudG9DU1NQcm9wKGlbMV0pXHJcbiAgICAgICAgICAgIDogdGhpcy5lc2NhcGVIVE1MKGlbMV0pfVwiYFxyXG4gICAgICApXHJcbiAgICAgIC5qb2luKFwiIFwiKTtcclxuICB9LFxyXG4gIGVzY2FwZShodG1sKSB7XHJcbiAgICByZXR1cm4gbmV3IE9wdGlvbihodG1sKS5pbm5lckhUTUw7XHJcbiAgfSxcclxuICAvKipcclxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsbSBcclxuICAgKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IHNlbGVjdG9yT3JOdW1iZXIgXHJcbiAgICogQHJldHVybnMge0VsZW1lbnRbXX1cclxuICAgKi9cclxuICBwYXJlbnRzKGVsbSwgc2VsZWN0b3JPck51bWJlcikge1xyXG4gICAgbGV0IHBhcmVudHMgPSBbXTtcclxuICAgIGlmICh0eXBlb2Ygc2VsZWN0b3JPck51bWJlciA9PT0gXCJudW1iZXJcIikge1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlbGVjdG9yT3JOdW1iZXI7IGkrKykge1xyXG4gICAgICAgIGlmIChlbG0ucGFyZW50RWxlbWVudCkge1xyXG4gICAgICAgICAgZWxtID0gZWxtLnBhcmVudEVsZW1lbnQ7XHJcbiAgICAgICAgICBwYXJlbnRzLnB1c2goZWxtKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHdoaWxlIChlbG0ucGFyZW50RWxlbWVudCAmJiBlbG0ucGFyZW50RWxlbWVudC5jbG9zZXN0KHNlbGVjdG9yT3JOdW1iZXIpKSB7XHJcbiAgICAgICAgZWxtID0gZWxtLnBhcmVudEVsZW1lbnQuY2xvc2VzdChzZWxlY3Rvck9yTnVtYmVyKTtcclxuICAgICAgICBwYXJlbnRzLnB1c2goZWxtKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBhcmVudHM7XHJcbiAgfSxcclxuICBwYXRjaDogKHNlbGVjdG9yLCBjYikgPT5cclxuICAgICgoKSA9PiB7XHJcbiAgICAgIGZ1bmN0aW9uIG5vZGVBZGRlZChub2RlKSB7XHJcbiAgICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IE5vZGUuVEVYVF9OT0RFKSByZXR1cm47XHJcbiAgICAgICAgbm9kZS5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKS5mb3JFYWNoKGFzeW5jIChlbG0pID0+IHtcclxuICAgICAgICAgIGlmICghZWxtLmFjb3JkKSB7XHJcbiAgICAgICAgICAgIGVsbS5hY29yZCA9IHsgdW5tb3VudDogW10sIHBhdGNoZWQ6IG5ldyBTZXQoKSB9O1xyXG4gICAgICAgICAgICBlbG0uY2xhc3NMaXN0LmFkZChcImFjb3JkLS1wYXRjaGVkXCIpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChlbG0uYWNvcmQucGF0Y2hlZC5oYXMoY2IpKSByZXR1cm47XHJcbiAgICAgICAgICBlbG0uYWNvcmQucGF0Y2hlZC5hZGQoY2IpO1xyXG5cclxuICAgICAgICAgIGxldCB1blBhdGNoQ2IgPSBhd2FpdCBjYihlbG0pO1xyXG4gICAgICAgICAgaWYgKHR5cGVvZiB1blBhdGNoQ2IgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICAgICAgZWxtLmFjb3JkLnVubW91bnQucHVzaCh1blBhdGNoQ2IpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBmdW5jdGlvbiBub2RlUmVtb3ZlZChub2RlKSB7XHJcbiAgICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IE5vZGUuVEVYVF9OT0RFKSByZXR1cm47XHJcbiAgICAgICAgbm9kZS5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKS5mb3JFYWNoKGFzeW5jIChlbG0pID0+IHtcclxuICAgICAgICAgIGlmICghZWxtLmFjb3JkKSByZXR1cm47XHJcbiAgICAgICAgICBlbG0uYWNvcmQudW5tb3VudC5mb3JFYWNoKChmKSA9PiBmKCkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKS5mb3JFYWNoKG5vZGVBZGRlZCk7XHJcblxyXG4gICAgICByZXR1cm4gZXZlbnRzLm9uKFxyXG4gICAgICAgIFwiZG9tLW11dGF0aW9uXCIsXHJcbiAgICAgICAgLyoqIEBwYXJhbSB7TXV0YXRpb25SZWNvcmR9IG11dCAqLyhtdXQpID0+IHtcclxuICAgICAgICAgIGlmIChtdXQudHlwZSA9PT0gXCJjaGlsZExpc3RcIikge1xyXG4gICAgICAgICAgICBtdXQuYWRkZWROb2Rlcy5mb3JFYWNoKG5vZGVBZGRlZCk7XHJcbiAgICAgICAgICAgIG11dC5yZW1vdmVkTm9kZXMuZm9yRWFjaChub2RlUmVtb3ZlZCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICApO1xyXG4gICAgfSkoKSxcclxuICBmb3JtYXRDb250ZW50KG1zZykge1xyXG4gICAgaWYgKCFtc2cpIHJldHVybiAnJztcclxuICAgIGNvbnN0IHsgYm9sZCwgaXRhbGljLCB1bmRlcmxpbmUsIHN0cmlrZSwgY29kZWJsb2NrTXVsdGksIGNvZGVibG9ja1NpbmdsZSwgaW5saW5lLCB1cmwgfSA9IGZvcm1hdFJlZ2V4ZXM7XHJcblxyXG4gICAgY29uc3QgY29kZUJsb2Nrc01hcCA9IE9iamVjdC5mcm9tRW50cmllcyhbXHJcbiAgICAgIC4uLihtc2cubWF0Y2hBbGwoY29kZWJsb2NrTXVsdGkpIHx8IFtdKSwgLi4uKG1zZy5tYXRjaEFsbChjb2RlYmxvY2tTaW5nbGUpIHx8IFtdKVxyXG4gICAgXS5tYXAoXHJcbiAgICAgIChbXywgY29kZUJsb2NrT3JDb2RlLCBjb2RlQmxvY2tDb250ZW50XSwgaSkgPT4ge1xyXG4gICAgICAgIG1zZyA9IG1zZy5yZXBsYWNlKF8sIGB7e0NPREVCTE9DS18ke2l9fX1gKTtcclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgYHt7Q09ERUJMT0NLXyR7aX19fWAsXHJcbiAgICAgICAgICBjb2RlQmxvY2tDb250ZW50ID9cclxuICAgICAgICAgICAgYDxwcmU+PGNvZGUgY2xhc3M9XCIke3Njcm9sbGJhckNsYXNzZXMuc2Nyb2xsYmFyR2hvc3RIYWlybGluZX0gaGxqcyAke2NvZGVCbG9ja09yQ29kZX1cIiBzdHlsZT1cInBvc2l0aW9uOiByZWxhdGl2ZTtcIj4ke21vZHVsZXMuY29tbW9uLmhsanMuaGlnaGxpZ2h0KGNvZGVCbG9ja09yQ29kZSwgY29kZUJsb2NrQ29udGVudCkudmFsdWV9PC9jb2RlPjwvcHJlPmAgOlxyXG4gICAgICAgICAgICBgPHByZT48Y29kZSBjbGFzcz1cIiR7c2Nyb2xsYmFyQ2xhc3Nlcy5zY3JvbGxiYXJHaG9zdEhhaXJsaW5lfSBobGpzXCIgc3R5bGU9XCJwb3NpdGlvbjogcmVsYXRpdmU7XCI+JHtjb2RlQmxvY2tPckNvZGV9PC9jb2RlPjwvcHJlPmBcclxuICAgICAgICBdO1xyXG4gICAgICB9XHJcbiAgICApKTtcclxuXHJcbiAgICBjb25zdCBpbmxpbmVNYXAgPSBPYmplY3QuZnJvbUVudHJpZXMoXHJcbiAgICAgIFsuLi4obXNnLm1hdGNoQWxsKGlubGluZSkgfHwgW10pXS5tYXAoXHJcbiAgICAgICAgKFtfLCBpbmxpbmVDb250ZW50XSwgaSkgPT4ge1xyXG4gICAgICAgICAgbXNnID0gbXNnLnJlcGxhY2UoXywgYHt7SU5MSU5FXyR7aX19fWApO1xyXG4gICAgICAgICAgcmV0dXJuIFtge3tJTkxJTkVfJHtpfX19YCwgYDxjb2RlIGNsYXNzPVwiaW5saW5lXCI+JHtpbmxpbmVDb250ZW50fTwvY29kZT5gXTtcclxuICAgICAgICB9XHJcbiAgICAgIClcclxuICAgICk7XHJcblxyXG4gICAgbXNnID0gbXNnLnJlcGxhY2UoYm9sZCwgXCI8Yj4kMTwvYj5cIilcclxuICAgICAgLnJlcGxhY2UoaXRhbGljLCBcIjxpPiQxPC9pPlwiKVxyXG4gICAgICAucmVwbGFjZSh1bmRlcmxpbmUsIFwiPFU+JDE8L1U+XCIpXHJcbiAgICAgIC5yZXBsYWNlKHN0cmlrZSwgXCI8cz4kMTwvcz5cIilcclxuICAgICAgLnJlcGxhY2UodXJsLCAnPGEgaHJlZj1cIiQxXCI+JDE8L2E+Jyk7XHJcblxyXG4gICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMoY29kZUJsb2Nrc01hcCkpIHtcclxuICAgICAgbXNnID0gbXNnLnJlcGxhY2Uoa2V5LCB2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMoaW5saW5lTWFwKSkge1xyXG4gICAgICBtc2cgPSBtc2cucmVwbGFjZShrZXksIHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbXNnO1xyXG4gIH0sXHJcbiAgcmVzb2x2ZShodG1sT3JFbG0pIHtcclxuICAgIGlmIChodG1sT3JFbG0gaW5zdGFuY2VvZiBFbGVtZW50KSByZXR1cm4gaHRtbE9yRWxtO1xyXG4gICAgcmV0dXJuIHRoaXMucGFyc2UoaHRtbE9yRWxtKTtcclxuICB9XHJcbn1cclxuXHJcbntcclxuICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKChtdXRhdGlvbnMpID0+IHtcclxuICAgIG11dGF0aW9ucy5mb3JFYWNoKChtdXRhdGlvbikgPT4ge1xyXG4gICAgICBldmVudHMuZW1pdChcImRvbS1tdXRhdGlvblwiLCBtdXRhdGlvbik7XHJcbiAgICB9KTtcclxuICB9KTtcclxuICBvYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LCB7XHJcbiAgICBhdHRyaWJ1dGVzOiB0cnVlLFxyXG4gICAgY2hpbGRMaXN0OiB0cnVlLFxyXG4gICAgc3VidHJlZTogdHJ1ZVxyXG4gIH0pO1xyXG59IiwgIi8vIHdlIHVzZSB0aGlzIGFycmF5IG11bHRpcGxlIHRpbWVzXHJcbmV4cG9ydCBjb25zdCBwYXRjaFR5cGVzID0gW1wiYVwiLCBcImJcIiwgXCJpXCJdO1xyXG5leHBvcnQgY29uc3QgcGF0Y2hlZE9iamVjdHMgPSBuZXcgTWFwKCk7XHJcbiIsICIvLyBjYWxscyByZWxldmFudCBwYXRjaGVzIGFuZCByZXR1cm5zIHRoZSBmaW5hbCByZXN1bHRcclxuaW1wb3J0IHsgcGF0Y2hlZE9iamVjdHMgfSBmcm9tIFwiLi9zaGFyZWQuanNcIjtcclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKGZ1bmNOYW1lLCBmdW5jUGFyZW50LCBmdW5jQXJncywgXHJcbi8vIHRoZSB2YWx1ZSBvZiBgdGhpc2AgdG8gYXBwbHlcclxuY3R4dCwgXHJcbi8vIGlmIHRydWUsIHRoZSBmdW5jdGlvbiBpcyBhY3R1YWxseSBjb25zdHJ1Y3RvclxyXG5pc0NvbnN0cnVjdCkge1xyXG4gICAgY29uc3QgcGF0Y2ggPSBwYXRjaGVkT2JqZWN0cy5nZXQoZnVuY1BhcmVudCk/LltmdW5jTmFtZV07XHJcbiAgICAvLyBUaGlzIGlzIGluIHRoZSBldmVudCB0aGF0IHRoaXMgZnVuY3Rpb24gaXMgYmVpbmcgY2FsbGVkIGFmdGVyIGFsbCBwYXRjaGVzIGFyZSByZW1vdmVkLlxyXG4gICAgaWYgKCFwYXRjaClcclxuICAgICAgICByZXR1cm4gaXNDb25zdHJ1Y3RcclxuICAgICAgICAgICAgPyBSZWZsZWN0LmNvbnN0cnVjdChmdW5jUGFyZW50W2Z1bmNOYW1lXSwgZnVuY0FyZ3MsIGN0eHQpXHJcbiAgICAgICAgICAgIDogZnVuY1BhcmVudFtmdW5jTmFtZV0uYXBwbHkoY3R4dCwgZnVuY0FyZ3MpO1xyXG4gICAgLy8gQmVmb3JlIHBhdGNoZXNcclxuICAgIGZvciAoY29uc3QgaG9vayBvZiBwYXRjaC5iLnZhbHVlcygpKSB7XHJcbiAgICAgICAgY29uc3QgbWF5YmVmdW5jQXJncyA9IGhvb2suY2FsbChjdHh0LCBmdW5jQXJncyk7XHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkobWF5YmVmdW5jQXJncykpXHJcbiAgICAgICAgICAgIGZ1bmNBcmdzID0gbWF5YmVmdW5jQXJncztcclxuICAgIH1cclxuICAgIC8vIEluc3RlYWQgcGF0Y2hlc1xyXG4gICAgbGV0IGluc3RlYWRQYXRjaGVkRnVuYyA9ICguLi5hcmdzKSA9PiBpc0NvbnN0cnVjdFxyXG4gICAgICAgID8gUmVmbGVjdC5jb25zdHJ1Y3QocGF0Y2gubywgYXJncywgY3R4dClcclxuICAgICAgICA6IHBhdGNoLm8uYXBwbHkoY3R4dCwgYXJncyk7XHJcbiAgICBmb3IgKGNvbnN0IGNhbGxiYWNrIG9mIHBhdGNoLmkudmFsdWVzKCkpIHtcclxuICAgICAgICBjb25zdCBvbGRQYXRjaEZ1bmMgPSBpbnN0ZWFkUGF0Y2hlZEZ1bmM7XHJcbiAgICAgICAgaW5zdGVhZFBhdGNoZWRGdW5jID0gKC4uLmFyZ3MpID0+IGNhbGxiYWNrLmNhbGwoY3R4dCwgYXJncywgb2xkUGF0Y2hGdW5jKTtcclxuICAgIH1cclxuICAgIGxldCB3b3JraW5nUmV0VmFsID0gaW5zdGVhZFBhdGNoZWRGdW5jKC4uLmZ1bmNBcmdzKTtcclxuICAgIC8vIEFmdGVyIHBhdGNoZXNcclxuICAgIGZvciAoY29uc3QgaG9vayBvZiBwYXRjaC5hLnZhbHVlcygpKVxyXG4gICAgICAgIHdvcmtpbmdSZXRWYWwgPSBob29rLmNhbGwoY3R4dCwgZnVuY0FyZ3MsIHdvcmtpbmdSZXRWYWwpID8/IHdvcmtpbmdSZXRWYWw7XHJcbiAgICByZXR1cm4gd29ya2luZ1JldFZhbDtcclxufVxyXG4iLCAiaW1wb3J0IHsgcGF0Y2hlZE9iamVjdHMsIHBhdGNoVHlwZXMgfSBmcm9tIFwiLi9zaGFyZWQuanNcIjtcclxuZXhwb3J0IGZ1bmN0aW9uIHVuUGF0Y2goZnVuY1BhcmVudCwgZnVuY05hbWUsIGhvb2tJZCwgdHlwZSkge1xyXG4gICAgY29uc3QgcGF0Y2hlZE9iamVjdCA9IHBhdGNoZWRPYmplY3RzLmdldChmdW5jUGFyZW50KTtcclxuICAgIGNvbnN0IHBhdGNoID0gcGF0Y2hlZE9iamVjdD8uW2Z1bmNOYW1lXTtcclxuICAgIGlmICghcGF0Y2g/Llt0eXBlXS5oYXMoaG9va0lkKSlcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICBwYXRjaFt0eXBlXS5kZWxldGUoaG9va0lkKTtcclxuICAgIC8vIElmIHRoZXJlIGFyZSBubyBtb3JlIGhvb2tzIGZvciBldmVyeSB0eXBlLCByZW1vdmUgdGhlIHBhdGNoXHJcbiAgICBpZiAocGF0Y2hUeXBlcy5ldmVyeSgodCkgPT4gcGF0Y2hbdF0uc2l6ZSA9PT0gMCkpIHtcclxuICAgICAgICAvLyByZWZsZWN0IGRlZmluZXByb3BlcnR5IGlzIGxpa2Ugb2JqZWN0IGRlZmluZXByb3BlcnR5XHJcbiAgICAgICAgLy8gYnV0IGluc3RlYWQgb2YgZXJyb3JpbmcgaXQgcmV0dXJucyBpZiBpdCB3b3JrZWQgb3Igbm90LlxyXG4gICAgICAgIC8vIHRoaXMgaXMgbW9yZSBlYXNpbHkgbWluaWZpYWJsZSwgaGVuY2UgaXRzIHVzZS4gLS0gc2lua1xyXG4gICAgICAgIGNvbnN0IHN1Y2Nlc3MgPSBSZWZsZWN0LmRlZmluZVByb3BlcnR5KGZ1bmNQYXJlbnQsIGZ1bmNOYW1lLCB7XHJcbiAgICAgICAgICAgIHZhbHVlOiBwYXRjaC5vLFxyXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICghc3VjY2VzcylcclxuICAgICAgICAgICAgZnVuY1BhcmVudFtmdW5jTmFtZV0gPSBwYXRjaC5vO1xyXG4gICAgICAgIGRlbGV0ZSBwYXRjaGVkT2JqZWN0W2Z1bmNOYW1lXTtcclxuICAgIH1cclxuICAgIGlmIChPYmplY3Qua2V5cyhwYXRjaGVkT2JqZWN0KS5sZW5ndGggPT0gMClcclxuICAgICAgICBwYXRjaGVkT2JqZWN0cy5kZWxldGUoZnVuY1BhcmVudCk7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gdW5QYXRjaEFsbCgpIHtcclxuICAgIGZvciAoY29uc3QgW3BhcmVudE9iamVjdCwgcGF0Y2hlZE9iamVjdF0gb2YgcGF0Y2hlZE9iamVjdHMuZW50cmllcygpKVxyXG4gICAgICAgIGZvciAoY29uc3QgZnVuY05hbWUgaW4gcGF0Y2hlZE9iamVjdClcclxuICAgICAgICAgICAgZm9yIChjb25zdCBob29rVHlwZSBvZiBwYXRjaFR5cGVzKVxyXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBob29rSWQgb2YgcGF0Y2hlZE9iamVjdFtmdW5jTmFtZV0/Lltob29rVHlwZV0ua2V5cygpID8/IFtdKVxyXG4gICAgICAgICAgICAgICAgICAgIHVuUGF0Y2gocGFyZW50T2JqZWN0LCBmdW5jTmFtZSwgaG9va0lkLCBob29rVHlwZSk7XHJcbn1cclxuIiwgIi8vIGN1cnJpZWQgLSBnZXRQYXRjaEZ1bmMoXCJiZWZvcmVcIikoLi4uKVxyXG4vLyBhbGxvd3MgdXMgdG8gYXBwbHkgYW4gYXJndW1lbnQgd2hpbGUgbGVhdmluZyB0aGUgcmVzdCBvcGVuIG11Y2ggY2xlYW5lci5cclxuLy8gZnVuY3Rpb25hbCBwcm9ncmFtbWluZyBzdHJpa2VzIGFnYWluISAtLSBzaW5rXHJcbmltcG9ydCBob29rIGZyb20gXCIuL2hvb2suanNcIjtcclxuaW1wb3J0IHsgcGF0Y2hlZE9iamVjdHMgfSBmcm9tIFwiLi9zaGFyZWQuanNcIjtcclxuaW1wb3J0IHsgdW5QYXRjaCB9IGZyb20gXCIuL3VuLXBhdGNoLmpzXCI7XHJcbi8vIGNyZWF0ZXMgYSBob29rIGlmIG5lZWRlZCwgZWxzZSBqdXN0IGFkZHMgb25lIHRvIHRoZSBwYXRjaGVzIGFycmF5XHJcbmV4cG9ydCBkZWZhdWx0IChwYXRjaFR5cGUpID0+IChmdW5jTmFtZSwgZnVuY1BhcmVudCwgY2FsbGJhY2ssIG9uZVRpbWUgPSBmYWxzZSkgPT4ge1xyXG4gICAgaWYgKHR5cGVvZiBmdW5jUGFyZW50W2Z1bmNOYW1lXSAhPT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtmdW5jTmFtZX0gaXMgbm90IGEgZnVuY3Rpb24gaW4gJHtmdW5jUGFyZW50LmNvbnN0cnVjdG9yLm5hbWV9YCk7XHJcbiAgICBpZiAoIXBhdGNoZWRPYmplY3RzLmhhcyhmdW5jUGFyZW50KSlcclxuICAgICAgICBwYXRjaGVkT2JqZWN0cy5zZXQoZnVuY1BhcmVudCwge30pO1xyXG4gICAgY29uc3QgcGFyZW50SW5qZWN0aW9ucyA9IHBhdGNoZWRPYmplY3RzLmdldChmdW5jUGFyZW50KTtcclxuICAgIGlmICghcGFyZW50SW5qZWN0aW9uc1tmdW5jTmFtZV0pIHtcclxuICAgICAgICBjb25zdCBvcmlnRnVuYyA9IGZ1bmNQYXJlbnRbZnVuY05hbWVdO1xyXG4gICAgICAgIC8vIG5vdGUgdG8gZnV0dXJlIG1lIG9wdGltaXNpbmcgZm9yIHNpemU6IGV4dHJhY3RpbmcgbmV3IE1hcCgpIHRvIGEgZnVuYyBpbmNyZWFzZXMgc2l6ZSAtLXNpbmtcclxuICAgICAgICBwYXJlbnRJbmplY3Rpb25zW2Z1bmNOYW1lXSA9IHtcclxuICAgICAgICAgICAgbzogb3JpZ0Z1bmMsXHJcbiAgICAgICAgICAgIGI6IG5ldyBNYXAoKSxcclxuICAgICAgICAgICAgaTogbmV3IE1hcCgpLFxyXG4gICAgICAgICAgICBhOiBuZXcgTWFwKCksXHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCBydW5Ib29rID0gKGN0eHQsIGFyZ3MsIGNvbnN0cnVjdCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCByZXQgPSBob29rKGZ1bmNOYW1lLCBmdW5jUGFyZW50LCBhcmdzLCBjdHh0LCBjb25zdHJ1Y3QpO1xyXG4gICAgICAgICAgICBpZiAob25lVGltZSlcclxuICAgICAgICAgICAgICAgIHVucGF0Y2hUaGlzUGF0Y2goKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJldDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IHJlcGxhY2VQcm94eSA9IG5ldyBQcm94eShvcmlnRnVuYywge1xyXG4gICAgICAgICAgICBhcHBseTogKF8sIGN0eHQsIGFyZ3MpID0+IHJ1bkhvb2soY3R4dCwgYXJncywgZmFsc2UpLFxyXG4gICAgICAgICAgICBjb25zdHJ1Y3Q6IChfLCBhcmdzKSA9PiBydW5Ib29rKG9yaWdGdW5jLCBhcmdzLCB0cnVlKSxcclxuICAgICAgICAgICAgZ2V0OiAodGFyZ2V0LCBwcm9wLCByZWNlaXZlcikgPT4gcHJvcCA9PSBcInRvU3RyaW5nXCJcclxuICAgICAgICAgICAgICAgID8gb3JpZ0Z1bmMudG9TdHJpbmcuYmluZChvcmlnRnVuYylcclxuICAgICAgICAgICAgICAgIDogUmVmbGVjdC5nZXQodGFyZ2V0LCBwcm9wLCByZWNlaXZlciksXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gdGhpcyB3b3JrcyBhcm91bmQgYnJlYWtpbmcgc29tZSBhc3luYyBmaW5kIGltcGxlbWVudGF0aW9uIHdoaWNoIGxpc3RlbnMgZm9yIGFzc2lnbnMgdmlhIHByb3h5XHJcbiAgICAgICAgLy8gc2VlIGNvbW1lbnQgaW4gdW5wYXRjaC50c1xyXG4gICAgICAgIGNvbnN0IHN1Y2Nlc3MgPSBSZWZsZWN0LmRlZmluZVByb3BlcnR5KGZ1bmNQYXJlbnQsIGZ1bmNOYW1lLCB7XHJcbiAgICAgICAgICAgIHZhbHVlOiByZXBsYWNlUHJveHksXHJcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKCFzdWNjZXNzKVxyXG4gICAgICAgICAgICBmdW5jUGFyZW50W2Z1bmNOYW1lXSA9IHJlcGxhY2VQcm94eTtcclxuICAgICAgICBmdW5jUGFyZW50W2Z1bmNOYW1lXS5fX29yaWdpbmFsX18gPSBwYXJlbnRJbmplY3Rpb25zW2Z1bmNOYW1lXS5vO1xyXG4gICAgfVxyXG4gICAgY29uc3QgaG9va0lkID0gU3ltYm9sKCk7XHJcbiAgICBjb25zdCB1bnBhdGNoVGhpc1BhdGNoID0gKCkgPT4gdW5QYXRjaChmdW5jUGFyZW50LCBmdW5jTmFtZSwgaG9va0lkLCBwYXRjaFR5cGUpO1xyXG4gICAgcGFyZW50SW5qZWN0aW9uc1tmdW5jTmFtZV1bcGF0Y2hUeXBlXS5zZXQoaG9va0lkLCBjYWxsYmFjayk7XHJcbiAgICByZXR1cm4gdW5wYXRjaFRoaXNQYXRjaDtcclxufTtcclxuIiwgImltcG9ydCBnZXRQYXRjaEZ1bmMgZnJvbSBcIi4vZ2V0LXBhdGNoLWZ1bmMuanNcIjtcclxuaW1wb3J0IHsgdW5QYXRjaEFsbCB9IGZyb20gXCIuL3VuLXBhdGNoLmpzXCI7XHJcbmltcG9ydCB7IHBhdGNoZWRPYmplY3RzIGFzIHBhdGNoZWQgfSBmcm9tIFwiLi9zaGFyZWQuanNcIjtcclxuY29uc3QgYmVmb3JlID0gZ2V0UGF0Y2hGdW5jKFwiYlwiKTtcclxuY29uc3QgaW5zdGVhZCA9IGdldFBhdGNoRnVuYyhcImlcIik7XHJcbmNvbnN0IGFmdGVyID0gZ2V0UGF0Y2hGdW5jKFwiYVwiKTtcclxuZXhwb3J0IHsgaW5zdGVhZCwgYmVmb3JlLCBhZnRlciwgdW5QYXRjaEFsbCwgcGF0Y2hlZCB9O1xyXG4iLCAiaW1wb3J0ICogYXMgc3BpdFJvYXN0IGZyb20gXCIuLi8uLi9saWIvc3BpdHJvYXN0L2Rpc3QvZXNtXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgX19jYWNoZV9fOiB7XHJcbiAgICBwYXRjaGVkOiBzcGl0Um9hc3QucGF0Y2hlZCxcclxuICB9LFxyXG4gIGJlZm9yZTogc3BpdFJvYXN0LmJlZm9yZSxcclxuICBhZnRlcjogc3BpdFJvYXN0LmFmdGVyLFxyXG4gIGluc3RlYWQ6IHNwaXRSb2FzdC5pbnN0ZWFkLFxyXG4gIHVuUGF0Y2hBbGw6IHNwaXRSb2FzdC51blBhdGNoQWxsLFxyXG4gIGluamVjdENTUyhjc3MpIHtcclxuICAgIGNvbnN0IHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xyXG4gICAgc3R5bGUuY2xhc3NOYW1lID0gYGFjb3JkLS1pbmplY3RlZC1jc3NgO1xyXG4gICAgc3R5bGUudGV4dENvbnRlbnQgPSBjc3M7XHJcbiAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcclxuXHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBzdHlsZT8ucmVtb3ZlKCk7XHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgdW5QYXRjaEFsbENTUygpIHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYWNvcmQtLWluamVjdGVkLWNzc1wiKS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICBlbGVtZW50LnJlbW92ZSgpO1xyXG4gICAgfSlcclxuICB9XHJcbn0iLCAiZXhwb3J0IGRlZmF1bHQgYFxuQGtleWZyYW1lcyBhY29yZExvYWRpbmdGYWRlezAle29wYWNpdHk6LjF9MTAwJXtvcGFjaXR5Oi45fX0uYWNvcmQtLXN0YXJ0dXAtbG9hZGluZ3thbmltYXRpb246YWNvcmRMb2FkaW5nRmFkZSAuNXMgYWx0ZXJuYXRlIGluZmluaXRlIGxpbmVhcjtwb3NpdGlvbjphYnNvbHV0ZTt0cmFuc2l0aW9uOmFsbCAuNXMgbGluZWFyO3JpZ2h0OjhweDtib3R0b206OHB4O3dpZHRoOjE2cHg7aGVpZ2h0OjE2cHg7YmFja2dyb3VuZC1pbWFnZTp1cmwoXCJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vQWNvcmRQbHVnaW4vYXNzZXRzL21haW4vQWNvcmQuc3ZnXCIpO2ZpbHRlcjpncmF5c2NhbGUoMSkgYnJpZ2h0bmVzcygxKTtiYWNrZ3JvdW5kLXBvc2l0aW9uOmNlbnRlcjtiYWNrZ3JvdW5kLXJlcGVhdDpuby1yZXBlYXQ7YmFja2dyb3VuZC1zaXplOmNvbnRhaW47ei1pbmRleDo5OTk5OTl9LmFjb3JkLS1zdGFydHVwLWxvYWRpbmcuaGlkZGVue29wYWNpdHk6MCAhaW1wb3J0YW50fWA7XG4iLCAiaW1wb3J0IGRvbSBmcm9tIFwiLi4vLi4vYXBpL2RvbS9pbmRleC5qc1wiO1xyXG5pbXBvcnQgcGF0Y2hlciBmcm9tIFwiLi4vLi4vYXBpL3BhdGNoZXIvaW5kZXguanNcIjtcclxuXHJcbmltcG9ydCBjc3NUZXh0IGZyb20gXCIuL3N0eWxlLnNjc3NcIjtcclxubGV0IHVuSW5qZWN0O1xyXG5cclxuYXN5bmMgZnVuY3Rpb24gc2hvdygpIHtcclxuICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hY29yZC0tc3RhcnR1cC1sb2FkaW5nXCIpKSByZXR1cm47XHJcbiAgd2hpbGUgKHRydWUpIHtcclxuICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FwcC1tb3VudFwiKSkgYnJlYWs7XHJcbiAgICBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gc2V0VGltZW91dChyZXNvbHZlLCAxMDApKTtcclxuICB9XHJcbiAgY29uc29sZS5sb2coXCJhY29yZC0tc3RhcnR1cC1sb2FkaW5nXCIpO1xyXG4gIHVuSW5qZWN0ID0gcGF0Y2hlci5pbmplY3RDU1MoY3NzVGV4dCk7XHJcbiAgY29uc3QgZWxlbWVudCA9IGRvbS5wYXJzZShgXHJcbiAgICA8ZGl2IGNsYXNzPVwiYWNvcmQtLXN0YXJ0dXAtbG9hZGluZ1wiPjwvZGl2PlxyXG4gIGApXHJcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhcHAtbW91bnRcIikuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhpZGUoKSB7XHJcbiAgbGV0IGVsbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWNvcmQtLXN0YXJ0dXAtbG9hZGluZ1wiKTtcclxuICBpZiAoZWxtKSB7XHJcbiAgICBlbG0uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBlbG0ucmVtb3ZlKCk7XHJcbiAgICAgIHVuSW5qZWN0Py4oKTtcclxuICAgICAgdW5JbmplY3QgPSBudWxsO1xyXG4gICAgfSwgNTAwKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBzaG93LFxyXG4gIGhpZGVcclxufSIsICJsZXQgZGV2TW9kZUVuYWJsZWQgPSBmYWxzZTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBnZXQgZW5hYmxlZCgpIHtcclxuICAgIHJldHVybiBkZXZNb2RlRW5hYmxlZDtcclxuICB9LFxyXG4gIHNldCBlbmFibGVkKHZhbHVlKSB7XHJcbiAgICBpZiAoIWdsb2JhbFRoaXNbXCI8UFJFTE9BRF9LRVk+XCJdLmlzRGV2VG9vbHNPcGVuKCkpIHRocm93IG5ldyBFcnJvcihcIkRldiBtb2RlIHN0YXR1cyBjYW4gb25seSBiZSBtb2RpZmllZCB3aGVuIERldlRvb2xzIGlzIG9wZW4hXCIpO1xyXG4gICAgZGV2TW9kZUVuYWJsZWQgPSB2YWx1ZTtcclxuICB9XHJcbn0iLCAiaW1wb3J0IG1vZHVsZXMgZnJvbSBcIi4uL21vZHVsZXMvaW5kZXguanNcIlxyXG5pbXBvcnQgdXRpbHMgZnJvbSBcIi4uL3V0aWxzL2luZGV4LmpzXCI7XHJcblxyXG5jb25zdCBCQVNFX1VSTCA9IFwiaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL0Fjb3JkUGx1Z2luL2kxOG4vbWFpblwiO1xyXG5jb25zdCBub1N0b3JlID0geyBjYWNoZTogXCJuby1zdG9yZVwiIH07XHJcblxyXG5cclxuY29uc3Qgb3V0ID0ge1xyXG4gIF9fY2FjaGVfXzoge1xyXG4gICAgbG9jYWxlSWRzOiBbXSxcclxuICAgIGxvY2FsaXphdGlvbnM6IHt9XHJcbiAgfSxcclxuICBnZXQgbG9jYWxlKCkge1xyXG4gICAgcmV0dXJuIG1vZHVsZXMuY29tbW9uLmkxOG4uX3JlcXVlc3RlZExvY2FsZTtcclxuICB9LFxyXG4gIGdldChrZXkpIHtcclxuICAgIGNoZWNrKCk7XHJcbiAgICByZXR1cm4gb3V0Ll9fY2FjaGVfXy5sb2NhbGl6YXRpb25zW291dC5sb2NhbGVdPy5ba2V5XVxyXG4gICAgICB8fCBvdXQuX19jYWNoZV9fLmxvY2FsaXphdGlvbnMuZGVmYXVsdD8uW2tleV1cclxuICAgICAgfHwgbW9kdWxlcy5jb21tb24uaTE4bi5NZXNzYWdlc1trZXldXHJcbiAgICAgIHx8IGtleTtcclxuICB9LFxyXG4gIG1lc3NhZ2VzOiBuZXcgUHJveHkoe30sIHtcclxuICAgIGdldChfLCBwcm9wKSB7XHJcbiAgICAgIHJldHVybiBvdXQuZ2V0KHByb3ApO1xyXG4gICAgfVxyXG4gIH0pLFxyXG4gIGxvY2FsaXplKHN0cikge1xyXG4gICAgaWYgKHR5cGVvZiBzdHIgPT09IFwic3RyaW5nXCIpIHJldHVybiBzdHI7XHJcbiAgICByZXR1cm4gc3RyPy5bb3V0LmxvY2FsZV1cclxuICAgICAgfHwgc3RyPy5kZWZhdWx0XHJcbiAgICAgIHx8IE9iamVjdC52YWx1ZXMoc3RyKVswXTtcclxuICB9LFxyXG4gIGZvcm1hdChrZXksIC4uLmFyZ3MpIHtcclxuICAgIHJldHVybiB1dGlscy5mb3JtYXQob3V0LmdldChrZXkpLCAuLi5hcmdzKTtcclxuICB9XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGNoZWNrKCkge1xyXG4gIGNvbnN0IGxvY2FsZSA9IG91dC5sb2NhbGU7XHJcbiAgaWYgKCFvdXQuX19jYWNoZV9fLmxvY2FsZUlkcy5sZW5ndGgpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIG91dC5fX2NhY2hlX18ubG9jYWxlSWRzID0gYXdhaXQgKGF3YWl0IGZldGNoKGAke0JBU0VfVVJMfS9sb2NhbGVzLmpzb25gLCBub1N0b3JlKSkuanNvbigpO1xyXG4gICAgfSBjYXRjaCB7IH1cclxuICAgIHRyeSB7XHJcbiAgICAgIG91dC5fX2NhY2hlX18ubG9jYWxpemF0aW9ucy5kZWZhdWx0ID0gYXdhaXQgKGF3YWl0IGZldGNoKGAke0JBU0VfVVJMfS9kZWZhdWx0Lmpzb25gLCBub1N0b3JlKSkuanNvbigpO1xyXG4gICAgfSBjYXRjaCB7IH1cclxuICB9XHJcbiAgaWYgKFxyXG4gICAgb3V0Ll9fY2FjaGVfXy5sb2NhbGVJZHMuaW5jbHVkZXMobG9jYWxlKVxyXG4gICAgJiYgIW91dC5fX2NhY2hlX18ubG9jYWxpemF0aW9ucz8uW2xvY2FsZV1cclxuICApIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIG91dC5fX2NhY2hlX18ubG9jYWxpemF0aW9uc1tsb2NhbGVdID0gYXdhaXQgKGF3YWl0IGZldGNoKGAke0JBU0VfVVJMfS8ke2xvY2FsZX0uanNvbmAsIG5vU3RvcmUpKS5qc29uKCk7XHJcbiAgICB9IGNhdGNoIHsgfTtcclxuICB9XHJcbn1cclxuXHJcbmNoZWNrKCk7XHJcbmV4cG9ydCBkZWZhdWx0IG91dDsiLCAiaW1wb3J0ICogYXMgbmVzdHMgZnJvbSBcIm5lc3RzXCI7XHJcbmltcG9ydCAqIGFzIGlkYktleXZhbCBmcm9tIFwiaWRiLWtleXZhbFwiO1xyXG5pbXBvcnQgeyBkZUN5Y2xlZCwgcmV2aXZlIH0gZnJvbSBcIi4uLy4uL2xpYi9qc29uLWRlY3ljbGVkXCI7XHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBhc3luYyBjcmVhdGVQZXJzaXN0TmVzdChzdWZmaXgpIHtcclxuICAgIGxldCBjYWNoZWQgPSBhd2FpdCBpZGJLZXl2YWwuZ2V0KGBBY29yZFN0b3JlOyR7c3VmZml4fWApO1xyXG4gICAgaWYgKHR5cGVvZiBjYWNoZWQgPT0gXCJzdHJpbmdcIikgY2FjaGVkID0gcmV2aXZlKGNhY2hlZCk7XHJcbiAgICBjb25zdCBuZXN0ID0gbmVzdHMubWFrZShjYWNoZWQgPz8ge30pO1xyXG5cclxuICAgIGNvbnN0IHNhdmUgPSAoKSA9PiB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgaWRiS2V5dmFsLnNldChgQWNvcmRTdG9yZTske3N1ZmZpeH1gLCBkZUN5Y2xlZCh7IC4uLm5lc3QuZ2hvc3QgfSkpO1xyXG4gICAgICB9IGNhdGNoIHtcclxuICAgICAgICBpZGJLZXl2YWwuc2V0KGBBY29yZFN0b3JlOyR7c3VmZml4fWAsIGRlQ3ljbGVkKHt9KSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBuZXN0Lm9uKG5lc3RzLkV2ZW50cy5TRVQsIHNhdmUpO1xyXG4gICAgbmVzdC5vbihuZXN0cy5FdmVudHMuVVBEQVRFLCBzYXZlKTtcclxuICAgIG5lc3Qub24obmVzdHMuRXZlbnRzLkRFTEVURSwgc2F2ZSk7XHJcblxyXG4gICAgcmV0dXJuIG5lc3Q7XHJcbiAgfVxyXG59IiwgImZ1bmN0aW9uIHByb21pc2lmeVJlcXVlc3QocmVxdWVzdCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmUgLSBmaWxlIHNpemUgaGFja3NcbiAgICAgICAgcmVxdWVzdC5vbmNvbXBsZXRlID0gcmVxdWVzdC5vbnN1Y2Nlc3MgPSAoKSA9PiByZXNvbHZlKHJlcXVlc3QucmVzdWx0KTtcbiAgICAgICAgLy8gQHRzLWlnbm9yZSAtIGZpbGUgc2l6ZSBoYWNrc1xuICAgICAgICByZXF1ZXN0Lm9uYWJvcnQgPSByZXF1ZXN0Lm9uZXJyb3IgPSAoKSA9PiByZWplY3QocmVxdWVzdC5lcnJvcik7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBjcmVhdGVTdG9yZShkYk5hbWUsIHN0b3JlTmFtZSkge1xuICAgIGNvbnN0IHJlcXVlc3QgPSBpbmRleGVkREIub3BlbihkYk5hbWUpO1xuICAgIHJlcXVlc3Qub251cGdyYWRlbmVlZGVkID0gKCkgPT4gcmVxdWVzdC5yZXN1bHQuY3JlYXRlT2JqZWN0U3RvcmUoc3RvcmVOYW1lKTtcbiAgICBjb25zdCBkYnAgPSBwcm9taXNpZnlSZXF1ZXN0KHJlcXVlc3QpO1xuICAgIHJldHVybiAodHhNb2RlLCBjYWxsYmFjaykgPT4gZGJwLnRoZW4oKGRiKSA9PiBjYWxsYmFjayhkYi50cmFuc2FjdGlvbihzdG9yZU5hbWUsIHR4TW9kZSkub2JqZWN0U3RvcmUoc3RvcmVOYW1lKSkpO1xufVxubGV0IGRlZmF1bHRHZXRTdG9yZUZ1bmM7XG5mdW5jdGlvbiBkZWZhdWx0R2V0U3RvcmUoKSB7XG4gICAgaWYgKCFkZWZhdWx0R2V0U3RvcmVGdW5jKSB7XG4gICAgICAgIGRlZmF1bHRHZXRTdG9yZUZ1bmMgPSBjcmVhdGVTdG9yZSgna2V5dmFsLXN0b3JlJywgJ2tleXZhbCcpO1xuICAgIH1cbiAgICByZXR1cm4gZGVmYXVsdEdldFN0b3JlRnVuYztcbn1cbi8qKlxuICogR2V0IGEgdmFsdWUgYnkgaXRzIGtleS5cbiAqXG4gKiBAcGFyYW0ga2V5XG4gKiBAcGFyYW0gY3VzdG9tU3RvcmUgTWV0aG9kIHRvIGdldCBhIGN1c3RvbSBzdG9yZS4gVXNlIHdpdGggY2F1dGlvbiAoc2VlIHRoZSBkb2NzKS5cbiAqL1xuZnVuY3Rpb24gZ2V0KGtleSwgY3VzdG9tU3RvcmUgPSBkZWZhdWx0R2V0U3RvcmUoKSkge1xuICAgIHJldHVybiBjdXN0b21TdG9yZSgncmVhZG9ubHknLCAoc3RvcmUpID0+IHByb21pc2lmeVJlcXVlc3Qoc3RvcmUuZ2V0KGtleSkpKTtcbn1cbi8qKlxuICogU2V0IGEgdmFsdWUgd2l0aCBhIGtleS5cbiAqXG4gKiBAcGFyYW0ga2V5XG4gKiBAcGFyYW0gdmFsdWVcbiAqIEBwYXJhbSBjdXN0b21TdG9yZSBNZXRob2QgdG8gZ2V0IGEgY3VzdG9tIHN0b3JlLiBVc2Ugd2l0aCBjYXV0aW9uIChzZWUgdGhlIGRvY3MpLlxuICovXG5mdW5jdGlvbiBzZXQoa2V5LCB2YWx1ZSwgY3VzdG9tU3RvcmUgPSBkZWZhdWx0R2V0U3RvcmUoKSkge1xuICAgIHJldHVybiBjdXN0b21TdG9yZSgncmVhZHdyaXRlJywgKHN0b3JlKSA9PiB7XG4gICAgICAgIHN0b3JlLnB1dCh2YWx1ZSwga2V5KTtcbiAgICAgICAgcmV0dXJuIHByb21pc2lmeVJlcXVlc3Qoc3RvcmUudHJhbnNhY3Rpb24pO1xuICAgIH0pO1xufVxuLyoqXG4gKiBTZXQgbXVsdGlwbGUgdmFsdWVzIGF0IG9uY2UuIFRoaXMgaXMgZmFzdGVyIHRoYW4gY2FsbGluZyBzZXQoKSBtdWx0aXBsZSB0aW1lcy5cbiAqIEl0J3MgYWxzbyBhdG9taWMgXHUyMDEzIGlmIG9uZSBvZiB0aGUgcGFpcnMgY2FuJ3QgYmUgYWRkZWQsIG5vbmUgd2lsbCBiZSBhZGRlZC5cbiAqXG4gKiBAcGFyYW0gZW50cmllcyBBcnJheSBvZiBlbnRyaWVzLCB3aGVyZSBlYWNoIGVudHJ5IGlzIGFuIGFycmF5IG9mIGBba2V5LCB2YWx1ZV1gLlxuICogQHBhcmFtIGN1c3RvbVN0b3JlIE1ldGhvZCB0byBnZXQgYSBjdXN0b20gc3RvcmUuIFVzZSB3aXRoIGNhdXRpb24gKHNlZSB0aGUgZG9jcykuXG4gKi9cbmZ1bmN0aW9uIHNldE1hbnkoZW50cmllcywgY3VzdG9tU3RvcmUgPSBkZWZhdWx0R2V0U3RvcmUoKSkge1xuICAgIHJldHVybiBjdXN0b21TdG9yZSgncmVhZHdyaXRlJywgKHN0b3JlKSA9PiB7XG4gICAgICAgIGVudHJpZXMuZm9yRWFjaCgoZW50cnkpID0+IHN0b3JlLnB1dChlbnRyeVsxXSwgZW50cnlbMF0pKTtcbiAgICAgICAgcmV0dXJuIHByb21pc2lmeVJlcXVlc3Qoc3RvcmUudHJhbnNhY3Rpb24pO1xuICAgIH0pO1xufVxuLyoqXG4gKiBHZXQgbXVsdGlwbGUgdmFsdWVzIGJ5IHRoZWlyIGtleXNcbiAqXG4gKiBAcGFyYW0ga2V5c1xuICogQHBhcmFtIGN1c3RvbVN0b3JlIE1ldGhvZCB0byBnZXQgYSBjdXN0b20gc3RvcmUuIFVzZSB3aXRoIGNhdXRpb24gKHNlZSB0aGUgZG9jcykuXG4gKi9cbmZ1bmN0aW9uIGdldE1hbnkoa2V5cywgY3VzdG9tU3RvcmUgPSBkZWZhdWx0R2V0U3RvcmUoKSkge1xuICAgIHJldHVybiBjdXN0b21TdG9yZSgncmVhZG9ubHknLCAoc3RvcmUpID0+IFByb21pc2UuYWxsKGtleXMubWFwKChrZXkpID0+IHByb21pc2lmeVJlcXVlc3Qoc3RvcmUuZ2V0KGtleSkpKSkpO1xufVxuLyoqXG4gKiBVcGRhdGUgYSB2YWx1ZS4gVGhpcyBsZXRzIHlvdSBzZWUgdGhlIG9sZCB2YWx1ZSBhbmQgdXBkYXRlIGl0IGFzIGFuIGF0b21pYyBvcGVyYXRpb24uXG4gKlxuICogQHBhcmFtIGtleVxuICogQHBhcmFtIHVwZGF0ZXIgQSBjYWxsYmFjayB0aGF0IHRha2VzIHRoZSBvbGQgdmFsdWUgYW5kIHJldHVybnMgYSBuZXcgdmFsdWUuXG4gKiBAcGFyYW0gY3VzdG9tU3RvcmUgTWV0aG9kIHRvIGdldCBhIGN1c3RvbSBzdG9yZS4gVXNlIHdpdGggY2F1dGlvbiAoc2VlIHRoZSBkb2NzKS5cbiAqL1xuZnVuY3Rpb24gdXBkYXRlKGtleSwgdXBkYXRlciwgY3VzdG9tU3RvcmUgPSBkZWZhdWx0R2V0U3RvcmUoKSkge1xuICAgIHJldHVybiBjdXN0b21TdG9yZSgncmVhZHdyaXRlJywgKHN0b3JlKSA9PiBcbiAgICAvLyBOZWVkIHRvIGNyZWF0ZSB0aGUgcHJvbWlzZSBtYW51YWxseS5cbiAgICAvLyBJZiBJIHRyeSB0byBjaGFpbiBwcm9taXNlcywgdGhlIHRyYW5zYWN0aW9uIGNsb3NlcyBpbiBicm93c2Vyc1xuICAgIC8vIHRoYXQgdXNlIGEgcHJvbWlzZSBwb2x5ZmlsbCAoSUUxMC8xMSkuXG4gICAgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBzdG9yZS5nZXQoa2V5KS5vbnN1Y2Nlc3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHN0b3JlLnB1dCh1cGRhdGVyKHRoaXMucmVzdWx0KSwga2V5KTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHByb21pc2lmeVJlcXVlc3Qoc3RvcmUudHJhbnNhY3Rpb24pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9KSk7XG59XG4vKipcbiAqIERlbGV0ZSBhIHBhcnRpY3VsYXIga2V5IGZyb20gdGhlIHN0b3JlLlxuICpcbiAqIEBwYXJhbSBrZXlcbiAqIEBwYXJhbSBjdXN0b21TdG9yZSBNZXRob2QgdG8gZ2V0IGEgY3VzdG9tIHN0b3JlLiBVc2Ugd2l0aCBjYXV0aW9uIChzZWUgdGhlIGRvY3MpLlxuICovXG5mdW5jdGlvbiBkZWwoa2V5LCBjdXN0b21TdG9yZSA9IGRlZmF1bHRHZXRTdG9yZSgpKSB7XG4gICAgcmV0dXJuIGN1c3RvbVN0b3JlKCdyZWFkd3JpdGUnLCAoc3RvcmUpID0+IHtcbiAgICAgICAgc3RvcmUuZGVsZXRlKGtleSk7XG4gICAgICAgIHJldHVybiBwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLnRyYW5zYWN0aW9uKTtcbiAgICB9KTtcbn1cbi8qKlxuICogRGVsZXRlIG11bHRpcGxlIGtleXMgYXQgb25jZS5cbiAqXG4gKiBAcGFyYW0ga2V5cyBMaXN0IG9mIGtleXMgdG8gZGVsZXRlLlxuICogQHBhcmFtIGN1c3RvbVN0b3JlIE1ldGhvZCB0byBnZXQgYSBjdXN0b20gc3RvcmUuIFVzZSB3aXRoIGNhdXRpb24gKHNlZSB0aGUgZG9jcykuXG4gKi9cbmZ1bmN0aW9uIGRlbE1hbnkoa2V5cywgY3VzdG9tU3RvcmUgPSBkZWZhdWx0R2V0U3RvcmUoKSkge1xuICAgIHJldHVybiBjdXN0b21TdG9yZSgncmVhZHdyaXRlJywgKHN0b3JlKSA9PiB7XG4gICAgICAgIGtleXMuZm9yRWFjaCgoa2V5KSA9PiBzdG9yZS5kZWxldGUoa2V5KSk7XG4gICAgICAgIHJldHVybiBwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLnRyYW5zYWN0aW9uKTtcbiAgICB9KTtcbn1cbi8qKlxuICogQ2xlYXIgYWxsIHZhbHVlcyBpbiB0aGUgc3RvcmUuXG4gKlxuICogQHBhcmFtIGN1c3RvbVN0b3JlIE1ldGhvZCB0byBnZXQgYSBjdXN0b20gc3RvcmUuIFVzZSB3aXRoIGNhdXRpb24gKHNlZSB0aGUgZG9jcykuXG4gKi9cbmZ1bmN0aW9uIGNsZWFyKGN1c3RvbVN0b3JlID0gZGVmYXVsdEdldFN0b3JlKCkpIHtcbiAgICByZXR1cm4gY3VzdG9tU3RvcmUoJ3JlYWR3cml0ZScsIChzdG9yZSkgPT4ge1xuICAgICAgICBzdG9yZS5jbGVhcigpO1xuICAgICAgICByZXR1cm4gcHJvbWlzaWZ5UmVxdWVzdChzdG9yZS50cmFuc2FjdGlvbik7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBlYWNoQ3Vyc29yKHN0b3JlLCBjYWxsYmFjaykge1xuICAgIHN0b3JlLm9wZW5DdXJzb3IoKS5vbnN1Y2Nlc3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghdGhpcy5yZXN1bHQpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNhbGxiYWNrKHRoaXMucmVzdWx0KTtcbiAgICAgICAgdGhpcy5yZXN1bHQuY29udGludWUoKTtcbiAgICB9O1xuICAgIHJldHVybiBwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLnRyYW5zYWN0aW9uKTtcbn1cbi8qKlxuICogR2V0IGFsbCBrZXlzIGluIHRoZSBzdG9yZS5cbiAqXG4gKiBAcGFyYW0gY3VzdG9tU3RvcmUgTWV0aG9kIHRvIGdldCBhIGN1c3RvbSBzdG9yZS4gVXNlIHdpdGggY2F1dGlvbiAoc2VlIHRoZSBkb2NzKS5cbiAqL1xuZnVuY3Rpb24ga2V5cyhjdXN0b21TdG9yZSA9IGRlZmF1bHRHZXRTdG9yZSgpKSB7XG4gICAgcmV0dXJuIGN1c3RvbVN0b3JlKCdyZWFkb25seScsIChzdG9yZSkgPT4ge1xuICAgICAgICAvLyBGYXN0IHBhdGggZm9yIG1vZGVybiBicm93c2Vyc1xuICAgICAgICBpZiAoc3RvcmUuZ2V0QWxsS2V5cykge1xuICAgICAgICAgICAgcmV0dXJuIHByb21pc2lmeVJlcXVlc3Qoc3RvcmUuZ2V0QWxsS2V5cygpKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpdGVtcyA9IFtdO1xuICAgICAgICByZXR1cm4gZWFjaEN1cnNvcihzdG9yZSwgKGN1cnNvcikgPT4gaXRlbXMucHVzaChjdXJzb3Iua2V5KSkudGhlbigoKSA9PiBpdGVtcyk7XG4gICAgfSk7XG59XG4vKipcbiAqIEdldCBhbGwgdmFsdWVzIGluIHRoZSBzdG9yZS5cbiAqXG4gKiBAcGFyYW0gY3VzdG9tU3RvcmUgTWV0aG9kIHRvIGdldCBhIGN1c3RvbSBzdG9yZS4gVXNlIHdpdGggY2F1dGlvbiAoc2VlIHRoZSBkb2NzKS5cbiAqL1xuZnVuY3Rpb24gdmFsdWVzKGN1c3RvbVN0b3JlID0gZGVmYXVsdEdldFN0b3JlKCkpIHtcbiAgICByZXR1cm4gY3VzdG9tU3RvcmUoJ3JlYWRvbmx5JywgKHN0b3JlKSA9PiB7XG4gICAgICAgIC8vIEZhc3QgcGF0aCBmb3IgbW9kZXJuIGJyb3dzZXJzXG4gICAgICAgIGlmIChzdG9yZS5nZXRBbGwpIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLmdldEFsbCgpKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpdGVtcyA9IFtdO1xuICAgICAgICByZXR1cm4gZWFjaEN1cnNvcihzdG9yZSwgKGN1cnNvcikgPT4gaXRlbXMucHVzaChjdXJzb3IudmFsdWUpKS50aGVuKCgpID0+IGl0ZW1zKTtcbiAgICB9KTtcbn1cbi8qKlxuICogR2V0IGFsbCBlbnRyaWVzIGluIHRoZSBzdG9yZS4gRWFjaCBlbnRyeSBpcyBhbiBhcnJheSBvZiBgW2tleSwgdmFsdWVdYC5cbiAqXG4gKiBAcGFyYW0gY3VzdG9tU3RvcmUgTWV0aG9kIHRvIGdldCBhIGN1c3RvbSBzdG9yZS4gVXNlIHdpdGggY2F1dGlvbiAoc2VlIHRoZSBkb2NzKS5cbiAqL1xuZnVuY3Rpb24gZW50cmllcyhjdXN0b21TdG9yZSA9IGRlZmF1bHRHZXRTdG9yZSgpKSB7XG4gICAgcmV0dXJuIGN1c3RvbVN0b3JlKCdyZWFkb25seScsIChzdG9yZSkgPT4ge1xuICAgICAgICAvLyBGYXN0IHBhdGggZm9yIG1vZGVybiBicm93c2Vyc1xuICAgICAgICAvLyAoYWx0aG91Z2gsIGhvcGVmdWxseSB3ZSdsbCBnZXQgYSBzaW1wbGVyIHBhdGggc29tZSBkYXkpXG4gICAgICAgIGlmIChzdG9yZS5nZXRBbGwgJiYgc3RvcmUuZ2V0QWxsS2V5cykge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgICAgICBwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLmdldEFsbEtleXMoKSksXG4gICAgICAgICAgICAgICAgcHJvbWlzaWZ5UmVxdWVzdChzdG9yZS5nZXRBbGwoKSksXG4gICAgICAgICAgICBdKS50aGVuKChba2V5cywgdmFsdWVzXSkgPT4ga2V5cy5tYXAoKGtleSwgaSkgPT4gW2tleSwgdmFsdWVzW2ldXSkpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGl0ZW1zID0gW107XG4gICAgICAgIHJldHVybiBjdXN0b21TdG9yZSgncmVhZG9ubHknLCAoc3RvcmUpID0+IGVhY2hDdXJzb3Ioc3RvcmUsIChjdXJzb3IpID0+IGl0ZW1zLnB1c2goW2N1cnNvci5rZXksIGN1cnNvci52YWx1ZV0pKS50aGVuKCgpID0+IGl0ZW1zKSk7XG4gICAgfSk7XG59XG5cbmV4cG9ydCB7IGNsZWFyLCBjcmVhdGVTdG9yZSwgZGVsLCBkZWxNYW55LCBlbnRyaWVzLCBnZXQsIGdldE1hbnksIGtleXMsIHByb21pc2lmeVJlcXVlc3QsIHNldCwgc2V0TWFueSwgdXBkYXRlLCB2YWx1ZXMgfTtcbiIsICJcInVzZSBzdHJpY3RcIjtcclxuXHJcbmZ1bmN0aW9uIGRlQ3ljbGVyKHZhbCwgY29uZmlnKSB7XHJcbiAgY29uZmlnID0gdHlwZW9mIGNvbmZpZyA9PT0gJ251bWJlcicgPyB7IGRlZXA6IGNvbmZpZyB9IDogKGNvbmZpZyB8fCB7fSk7XHJcbiAgY29uZmlnLmRlZXAgPSBjb25maWcuZGVlcCB8fCAxMDtcclxuICByZXR1cm4gZGVjeWNsZVdhbGtlcihbXSwgW10sIHZhbCwgY29uZmlnKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZGVDeWNsZWQodmFsLCBjb25maWcpIHtcclxuICBjb25maWcgPSB0eXBlb2YgY29uZmlnID09PSAnbnVtYmVyJyA/IHsgZGVlcDogY29uZmlnIH0gOiAoY29uZmlnIHx8IHt9KTtcclxuICB2YWwgPSBkZUN5Y2xlcih2YWwsIGNvbmZpZyk7XHJcbiAgdHJ5IHtcclxuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh2YWwsIHVuZGVmaW5lZCwgY29uZmlnLnNwYWNlcik7XHJcbiAgfSBjYXRjaCAoZSkge1xyXG4gICAgcmV0dXJuIGU7XHJcbiAgfVxyXG59XHJcblxyXG52YXIgcmV2aXZlckRhdGUgPSAvXlxcW0RhdGU6KChcXGR7NH0tXFxkezJ9LVxcZHsyfSlbQS1aXSsoXFxkezJ9OlxcZHsyfTpcXGR7Mn0pLihbMC05Ky06XSspWilcXF0kLztcclxudmFyIHJldml2ZXJSZWdFeHAgPSAvXlxcW1JlZ2V4cDpcXC8oLispXFwvXFxdJC87XHJcbnZhciByZXZpdmVyRXJyb3IgPSAvXlxcW0Vycm9yOihbXFxXXFx3XSspXFxdJC87XHJcbnZhciByZXZpdmVyRnVuY3Rpb24gPSAvXlxcW0Z1bmN0aW9uOiguKylcXF0kLztcclxuZnVuY3Rpb24gcmV2aXZlKHZhbCwgZnVuY3Rpb25zKSB7XHJcbiAgdHJ5IHtcclxuICAgIHJldHVybiBKU09OLnBhcnNlKHZhbCwgcmV2aXZlcik7XHJcbiAgfSBjYXRjaCAoZSkge1xyXG4gICAgcmV0dXJuIGU7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiByZXZpdmVyKGtleSwgdmFsKSB7XHJcbiAgICBpZiAocmV2aXZlckRhdGUudGVzdCh2YWwpKSB7XHJcbiAgICAgIHZhbCA9IHJldml2ZXJEYXRlLmV4ZWModmFsKTtcclxuICAgICAgdmFsID0gbmV3IERhdGUodmFsWzFdKTtcclxuICAgICAgcmV0dXJuIG5ldyBEYXRlKHZhbCk7XHJcbiAgICB9IGVsc2UgaWYgKHJldml2ZXJSZWdFeHAudGVzdCh2YWwpKSB7XHJcbiAgICAgIHZhbCA9IHJldml2ZXJSZWdFeHAuZXhlYyh2YWwpWzFdO1xyXG4gICAgICByZXR1cm4gbmV3IFJlZ0V4cCh2YWwpO1xyXG4gICAgfSBlbHNlIGlmIChyZXZpdmVyRXJyb3IudGVzdCh2YWwpKSB7XHJcbiAgICAgIHZhbCA9IHJldml2ZXJFcnJvci5leGVjKHZhbClbMV07XHJcbiAgICAgIHZhciBlcnJvciA9IG5ldyBFcnJvcih2YWwuc3BsaXQoJ1xcbicpWzBdKTtcclxuICAgICAgaWYgKGVycm9yLnN0YWNrKSB7XHJcbiAgICAgICAgZXJyb3Iuc3RhY2sgPSB2YWw7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGVycm9yO1xyXG4gICAgfSBlbHNlIGlmIChmdW5jdGlvbnMgJiYgcmV2aXZlckZ1bmN0aW9uLnRlc3QodmFsKSkge1xyXG4gICAgICB2YWwgPSByZXZpdmVyRnVuY3Rpb24uZXhlYyh2YWwpWzFdO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIHJldHVybiAobmV3IEZ1bmN0aW9uKFwicmV0dXJuIFwiICsgdmFsICsgXCI7XCIpKSgpO1xyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIHJldHVybiBlcnJvcjtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHZhbDtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRlY3ljbGVXYWxrZXIocGFyZW50cywgcGF0aCwgdmFsLCBjb25maWcpIHtcclxuICBpZiAoWyd1bmRlZmluZWQnLCAnbnVtYmVyJywgJ2Jvb2xlYW4nLCAnc3RyaW5nJ10uaW5kZXhPZih0eXBlb2YgdmFsKSA+PSAwIHx8IHZhbCA9PT0gbnVsbCkge1xyXG4gICAgcmV0dXJuIHZhbDtcclxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdvYmplY3QnICYmIHZhbC5jb25zdHJ1Y3RvciA9PT0gRGF0ZSkge1xyXG4gICAgcmV0dXJuIGNvbmZpZy5kYXRlcyAhPT0gZmFsc2UgPyAnW0RhdGU6JyArIHZhbC50b0lTT1N0cmluZygpICsgJ10nIDogdmFsO1xyXG4gICAgLy92YWwuZm9ybWF0KCd7WVlZWX0ve01NfS97RER9IHtoaH06e21tfTp7c3N9IFVUQzpcdTAwQjd7cGFyYW1zLnR6Pj0wP1wiK1wiK3BhcmFtcy50ejpwYXJhbXMudHp9XHUwMEI3Jyk7XHJcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnb2JqZWN0JyAmJiB2YWwuY29uc3RydWN0b3IgPT09IFJlZ0V4cCkge1xyXG4gICAgcmV0dXJuIGNvbmZpZy5yZWdleHBzICE9PSBmYWxzZSA/ICdbUmVnZXhwOicgKyB2YWwudG9TdHJpbmcoKSArICddJyA6IHZhbDtcclxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdvYmplY3QnICYmIHZhbC5jb25zdHJ1Y3RvciAmJiB0eXBlb2YgdmFsLmNvbnN0cnVjdG9yLm5hbWUgPT09ICdzdHJpbmcnICYmIHZhbC5jb25zdHJ1Y3Rvci5uYW1lLnNsaWNlKC01KSA9PT0gJ0Vycm9yJykge1xyXG4gICAgdmFyIHN0YWNrID0gKHZhbC5zdGFjayB8fCAnJykuc3BsaXQoJ1xcbicpLnNsaWNlKDEpO1xyXG4gICAgdmFyIG1lc3NhZ2UgPSAodmFsLm1lc3NhZ2UgfHwgdmFsLnRvU3RyaW5nKCkpO1xyXG4gICAgdmFyIGVycm9yID0gbWVzc2FnZSArIFwiXFxuXCIgKyBzdGFjaztcclxuICAgIHJldHVybiBjb25maWcuZXJyb3JzICE9PSBmYWxzZSA/ICdbRXJyb3I6JyArIGVycm9yICsgJ10nIDogdmFsO1xyXG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcclxuICAgIGlmIChwYXJlbnRzLmluZGV4T2YodmFsKSA+PSAwKSB7XHJcbiAgICAgIHZhciBwb2ludCA9IHBhdGguc2xpY2UoMCwgcGFyZW50cy5pbmRleE9mKHZhbCkpLmpvaW4oJy4nKTtcclxuICAgICAgcmV0dXJuICdbQ2lyY3VsYXInICsgKHBvaW50ID8gJzonICsgcG9pbnQgOiAnJykgKyAnXSc7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB2YXIgY29weSwgaSwgaywgbDtcclxuICAgICAgaWYgKHZhbC5jb25zdHJ1Y3RvciAmJiB0eXBlb2YgdmFsLmNvbnN0cnVjdG9yLm5hbWUgPT09ICdzdHJpbmcnICYmIHZhbC5jb25zdHJ1Y3Rvci5uYW1lLnNsaWNlKC01KSA9PT0gJ0FycmF5Jykge1xyXG4gICAgICAgIGlmIChwYXJlbnRzLmxlbmd0aCA+PSBjb25maWcuZGVlcCkge1xyXG4gICAgICAgICAgcmV0dXJuICdbQXJyYXk6JyArIHZhbC5jb25zdHJ1Y3Rvci5uYW1lICsgJ10nO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb3B5ID0gW107XHJcbiAgICAgICAgICBmb3IgKGkgPSAwLCBsID0gdmFsLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgICAgICBjb3B5W2ldID0gZGVjeWNsZVdhbGtlcihwYXJlbnRzLmNvbmNhdChbdmFsXSksIHBhdGguY29uY2F0KGkpLCB2YWxbaV0sIGNvbmZpZyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gY29weTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKHBhcmVudHMubGVuZ3RoID49IGNvbmZpZy5kZWVwKSB7XHJcbiAgICAgICAgICByZXR1cm4gJ1tPYmplY3Q6JyArICh2YWwuY29uc3RydWN0b3IgJiYgdmFsLmNvbnN0cnVjdG9yLm5hbWUgPyB2YWwuY29uc3RydWN0b3IubmFtZSA6ICdPYmplY3QnKSArICddJztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29weSA9IHt9O1xyXG4gICAgICAgICAgZm9yIChpID0gMCwgayA9IE9iamVjdC5rZXlzKHZhbCksIGwgPSBrLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgICAgICBjb3B5W2tbaV1dID0gZGVjeWNsZVdhbGtlcihwYXJlbnRzLmNvbmNhdChbdmFsXSksIHBhdGguY29uY2F0KFtrW2ldXSksIHZhbFtrW2ldXSwgY29uZmlnKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBjb3B5O1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgcmV0dXJuIGNvbmZpZy5mdW5jdGlvbnMgPT09IHRydWUgPyAnW0Z1bmN0aW9uOicgKyB2YWwudG9TdHJpbmcoKSArICddJyA6IHVuZGVmaW5lZDtcclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIHZhbC50b1N0cmluZygpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IHtcclxuICBkZUN5Y2xlcixcclxuICBkZUN5Y2xlZCxcclxuICByZXZpdmVcclxufSIsICJpbXBvcnQgaTE4biBmcm9tIFwiLi4vaTE4blwiO1xyXG5pbXBvcnQgdXRpbHMgZnJvbSBcIi4uL3V0aWxzXCI7XHJcblxyXG4vKipcclxuICogQHBhcmFtIHt7IGkxOG46IHN0cmluZyB8IHsgW2xhbmc6IHN0cmluZ106IHsgW2s6IHN0cmluZ106IHN0cmluZyB9IH19fSBjZmcgXHJcbiAqIEByZXR1cm5zIFxyXG4gKi9cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGJ1aWxkRXh0ZW5zaW9uSTE4TihjZmcpIHtcclxuICBpZiAoIWNmZz8uaTE4bikgcmV0dXJuIG51bGw7XHJcbiAgbGV0IG91dCA9IHtcclxuICAgIF9fY2FjaGVfXzoge1xyXG4gICAgICBsb2NhbGVJZHM6IFtdLFxyXG4gICAgICBsb2NhbGl6YXRpb25zOiB7fVxyXG4gICAgfSxcclxuICAgIGZvcm1hdChrZXksIC4uLmFyZ3MpIHtcclxuICAgICAgcmV0dXJuIHV0aWxzLmZvcm1hdChvdXQuZ2V0KGtleSksIC4uLmFyZ3MpO1xyXG4gICAgfSxcclxuICAgIGdldChrZXkpIHtcclxuICAgICAgaWYgKHR5cGVvZiBjZmcuaTE4biA9PT0gXCJzdHJpbmdcIikgY2hlY2soKTtcclxuICAgICAgcmV0dXJuIG91dC5fX2NhY2hlX18ubG9jYWxpemF0aW9uc1tvdXQubG9jYWxlXT8uW2tleV1cclxuICAgICAgICB8fCBvdXQuX19jYWNoZV9fLmxvY2FsaXphdGlvbnMuZGVmYXVsdD8uW2tleV1cclxuICAgICAgICB8fCBvdXQuZ2V0KGtleSk7XHJcbiAgICB9LFxyXG4gICAgbWVzc2FnZXM6IG5ldyBQcm94eSh7fSwge1xyXG4gICAgICBnZXQoXywgcHJvcCkge1xyXG4gICAgICAgIHJldHVybiBvdXQuZ2V0KHByb3ApO1xyXG4gICAgICB9XHJcbiAgICB9KSxcclxuICB9XHJcbiAgYXN5bmMgZnVuY3Rpb24gY2hlY2soKSB7XHJcbiAgICBjb25zdCBsb2NhbGUgPSBpMThuLmxvY2FsZTtcclxuICAgIGlmICh0eXBlb2YgY2ZnLmkxOG4gPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgY29uc3QgQkFTRV9VUkwgPSBjZmcuaTE4bi5lbmRzV2l0aChcIi9cIikgPyBjZmcuaTE4bi5zbGljZSgwLCAtMSkgOiBjZmcuaTE4bjtcclxuICAgICAgaWYgKCFvdXQuX19jYWNoZV9fLmxvY2FsZUlkcy5sZW5ndGgpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgb3V0Ll9fY2FjaGVfXy5sb2NhbGVJZHMgPSBhd2FpdCAoYXdhaXQgZmV0Y2goYCR7QkFTRV9VUkx9L2xvY2FsZXMuanNvbmAsIG5vU3RvcmUpKS5qc29uKCk7XHJcbiAgICAgICAgfSBjYXRjaCB7IH1cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgb3V0Ll9fY2FjaGVfXy5sb2NhbGl6YXRpb25zLmRlZmF1bHQgPSBhd2FpdCAoYXdhaXQgZmV0Y2goYCR7QkFTRV9VUkx9L2RlZmF1bHQuanNvbmAsIG5vU3RvcmUpKS5qc29uKCk7XHJcbiAgICAgICAgfSBjYXRjaCB7IH1cclxuICAgICAgfVxyXG4gICAgICBpZiAoXHJcbiAgICAgICAgb3V0Ll9fY2FjaGVfXy5sb2NhbGVJZHMuaW5jbHVkZXMobG9jYWxlKVxyXG4gICAgICAgICYmICFvdXQuX19jYWNoZV9fLmxvY2FsaXphdGlvbnM/Lltsb2NhbGVdXHJcbiAgICAgICkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICBvdXQuX19jYWNoZV9fLmxvY2FsaXphdGlvbnNbbG9jYWxlXSA9IGF3YWl0IChhd2FpdCBmZXRjaChgJHtCQVNFX1VSTH0vJHtsb2NhbGV9Lmpzb25gLCBub1N0b3JlKSkuanNvbigpO1xyXG4gICAgICAgIH0gY2F0Y2ggeyB9O1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBvdXQuX19jYWNoZV9fLmxvY2FsZUlkcyA9IE9iamVjdC5rZXlzKGNmZy5pMThuKTtcclxuICAgICAgb3V0Ll9fY2FjaGVfXy5sb2NhbGl6YXRpb25zID0gY2ZnLmkxOG47XHJcbiAgICB9XHJcbiAgfVxyXG4gIGF3YWl0IGNoZWNrKCk7XHJcbiAgcmV0dXJuIG91dDtcclxufSIsICJpbXBvcnQgeyBCYXNpY0V2ZW50RW1pdHRlciB9IGZyb20gXCIuLi8uLi9saWIvQmFzaWNFdmVudEVtaXR0ZXIuanNcIjtcclxuaW1wb3J0IGRldiBmcm9tIFwiLi4vZGV2L2luZGV4LmpzXCI7XHJcbmltcG9ydCBpMThuIGZyb20gXCIuLi9pMThuL2luZGV4LmpzXCI7XHJcbmltcG9ydCBtb2R1bGVzIGZyb20gXCIuLi9tb2R1bGVzL2luZGV4LmpzXCI7XHJcbmltcG9ydCBzdG9yYWdlIGZyb20gXCIuLi9zdG9yYWdlL2luZGV4LmpzXCI7XHJcbmltcG9ydCB7IGJ1aWxkRXh0ZW5zaW9uSTE4TiB9IGZyb20gXCIuL2kxOG4uanNcIjtcclxuaW1wb3J0ICogYXMgbmVzdHMgZnJvbSBcIm5lc3RzXCI7XHJcblxyXG4vKipcclxuICogQHBhcmFtIHt7IG1vZHVsZXM6IHsgbm9kZTogeyBuYW1lOiBzdHJpbmcsIHJlYXNvbjogc3RyaW5nIH1bXSwgY29tbW9uOiB7IG5hbWU6IHN0cmluZywgcmVhc29uOiBzdHJpbmcgfVtdLCBjdXN0b206IHsgcmVhc29uOiBzdHJpbmcsIG5hbWU6IHN0cmluZywgbGF6eTogYm9vbGVhbiwgZmluZGVyOiB7IGZpbHRlcjogeyBleHBvcnQ6IGJvb2xlYW4sIGluOiBcInByb3BlcnRpZXNcIiB8IFwic3RyaW5nc1wiIHwgXCJwcm90b3R5cGVzXCIsIGJ5OiBbc3RyaW5nW10sIHN0cmluZ1tdP10gfSwgcGF0aDogeyBiZWZvcmU6IHN0cmluZyB8IHN0cmluZ1tdLCBhZnRlcjogc3RyaW5nIHwgc3RyaW5nW10gfSwgbWFwOiB7IFtrOiBzdHJpbmddOiBzdHJpbmdbXSB9IH0gfVtdIH0sIGFib3V0OiB7IG5hbWU6IHN0cmluZyB8IHsgW2s6IHN0cmluZ106IHN0cmluZyB9LCBkZXNjcmlwdGlvbjogc3RyaW5nIHwgeyBbazogc3RyaW5nXTogc3RyaW5nIH0sIHNsdWc6IHN0cmluZyB9LCByZWFzb246IHN0cmluZyB9fSBjZmcgXHJcbiAqL1xyXG5hc3luYyBmdW5jdGlvbiBidWlsZEFQSShjZmcpIHtcclxuICBjb25zdCBwZXJzaXN0ID0gYXdhaXQgc3RvcmFnZS5jcmVhdGVQZXJzaXN0TmVzdChgRXh0ZW5zaW9uO1BlcnNpc3Q7JHtjZmcuYWJvdXQuc2x1Z31gKTtcclxuICBjb25zdCBvdXQgPSB7XHJcbiAgICBtb2R1bGVzOiB7XHJcbiAgICAgIF9fY2FjaGVfXzoge1xyXG4gICAgICAgIGNvbW1vbjoge30sXHJcbiAgICAgICAgbm9kZToge30sXHJcbiAgICAgICAgY3VzdG9tOiB7fSxcclxuICAgICAgICBjdXN0b21MYXp5OiB7fVxyXG4gICAgICB9LFxyXG4gICAgICByZXF1aXJlKG5hbWUpIHtcclxuICAgICAgICBpZiAoIWRldi5lbmFibGVkKSB7XHJcbiAgICAgICAgICBpZiAodHlwZW9mIG91dC5tb2R1bGVzLl9fY2FjaGVfXy5ub2RlW25hbWVdICE9PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gb3V0Lm1vZHVsZXMuX19jYWNoZV9fLm5vZGVbbmFtZV07XHJcbiAgICAgICAgICBpZiAoY2ZnPy5tb2R1bGVzPy5ub2RlPy5zb21lPy4oaSA9PiBpLm5hbWUgPT09IG5hbWUpKSByZXR1cm4gb3V0Lm1vZHVsZXMuX19jYWNoZV9fLm5vZGVbbmFtZV0gPSBtb2R1bGVzLnJlcXVpcmUobmFtZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJldHVybiBtb2R1bGVzLnJlcXVpcmUobmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICB9LFxyXG4gICAgICBjb21tb246IG5ldyBQcm94eSh7fSwge1xyXG4gICAgICAgIGdldChfLCBwcm9wKSB7XHJcbiAgICAgICAgICBpZiAoIWRldi5lbmFibGVkKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb3V0Lm1vZHVsZXMuX19jYWNoZV9fLmNvbW1vbltwcm9wXSAhPT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIG91dC5tb2R1bGVzLl9fY2FjaGVfXy5jb21tb25bcHJvcF07XHJcbiAgICAgICAgICAgIGlmIChjZmc/Lm1vZHVsZXM/LmNvbW1vbj8uc29tZT8uKGkgPT4gaS5uYW1lID09PSBwcm9wKSkgcmV0dXJuIG91dC5tb2R1bGVzLl9fY2FjaGVfXy5jb21tb25bcHJvcF0gPSBtb2R1bGVzLmNvbW1vbltwcm9wXTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtb2R1bGVzLmNvbW1vbltwcm9wXTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pLFxyXG4gICAgICBjdXN0b206IG5ldyBQcm94eSh7fSwge1xyXG4gICAgICAgIGdldChfLCBwcm9wKSB7XHJcbiAgICAgICAgICBpZiAodHlwZW9mIG91dC5tb2R1bGVzLl9fY2FjaGVfXy5jdXN0b21bcHJvcF0gIT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBvdXQubW9kdWxlcy5fX2NhY2hlX18uY3VzdG9tW3Byb3BdO1xyXG4gICAgICAgICAgbGV0IGRhdGEgPSBjZmc/Lm1vZHVsZXM/LmN1c3RvbT8uc29tZT8uKGkgPT4gaS5uYW1lID09PSBwcm9wKTtcclxuICAgICAgICAgIGlmICghZGF0YSkgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICBpZiAoZGF0YS5sYXp5KSB7XHJcbiAgICAgICAgICAgIGxldCBwcm9tID0gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICAgIGxldCByID0gYXdhaXQgbW9kdWxlcy53ZWJwYWNrLmxhenlGaW5kQnlGaW5kZXIoZGF0YS5maW5kZXIpO1xyXG4gICAgICAgICAgICAgIG91dC5tb2R1bGVzLl9fY2FjaGVfXy5jdXN0b21MYXp5W3Byb3BdID0gcjtcclxuICAgICAgICAgICAgICByZXNvbHZlKHIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgb3V0Lm1vZHVsZXMuX19jYWNoZV9fLmN1c3RvbVtwcm9wXSA9IHtcclxuICAgICAgICAgICAgICBnZXQoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvbTtcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIGdldCB2YWx1ZSgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBvdXQubW9kdWxlcy5fX2NhY2hlX18uY3VzdG9tTGF6eVtwcm9wXTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgdmFsdWUgPSBtb2R1bGVzLndlYnBhY2suZmluZEJ5RmluZGVyKGRhdGEuZmluZGVyKTtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlPy52YWx1ZSAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICAgICAgb3V0Lm1vZHVsZXMuX19jYWNoZV9fLmN1c3RvbVtwcm9wXSA9IHZhbHVlID8gT2JqZWN0LmFzc2lnbih2YWx1ZSwgeyB2YWx1ZSwgZ2V0KCkgeyByZXR1cm4gdmFsdWUgfSB9KSA6IG51bGw7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG91dC5tb2R1bGVzLl9fY2FjaGVfXy5jdXN0b21bcHJvcF0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gY2F0Y2gge1xyXG4gICAgICAgICAgICAgIG91dC5tb2R1bGVzLl9fY2FjaGVfXy5jdXN0b21bcHJvcF0gPSB2YWx1ZSA/IHsgdmFsdWUsIGdldCgpIHsgcmV0dXJuIHZhbHVlIH0gfSA6IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBvdXQubW9kdWxlcy5fX2NhY2hlX18uY3VzdG9tW3Byb3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgfSksXHJcbiAgICB9LFxyXG4gICAgaTE4bixcclxuICAgIGV4dGVuc2lvbjoge1xyXG4gICAgICBjb25maWc6IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoY2ZnKSksXHJcbiAgICAgIHBlcnNpc3QsXHJcbiAgICAgIGkxOG46IGF3YWl0IGJ1aWxkRXh0ZW5zaW9uSTE4TihjZmcpLFxyXG4gICAgICBldmVudHM6IG5ldyBCYXNpY0V2ZW50RW1pdHRlcigpXHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIG91dDtcclxufVxyXG5cclxuY29uc3Qgb3V0ID0ge1xyXG4gIF9fY2FjaGVfXzoge1xyXG4gICAgaW5pdGlhbGl6ZWQ6IGZhbHNlLFxyXG4gICAgbG9hZGVkOiBuZXN0cy5tYWtlKHt9KVxyXG4gIH0sXHJcbiAgc3RvcmFnZToge1xyXG4gICAgLyoqIEB0eXBlIHtuZXN0cy5OZXN0fSAqL1xyXG4gICAgaW5zdGFsbGVkOiB7fVxyXG4gIH0sXHJcbiAgYnVpbGRBUEksXHJcbiAgYXN5bmMgaW5pdCgpIHtcclxuICAgIGlmIChvdXQuX19jYWNoZV9fLmluaXRpYWxpemVkKSByZXR1cm47XHJcbiAgICBvdXQuX19jYWNoZV9fLmluaXRpYWxpemVkID0gdHJ1ZTtcclxuICAgIG91dC5zdG9yYWdlLmluc3RhbGxlZCA9IGF3YWl0IHN0b3JhZ2UuY3JlYXRlUGVyc2lzdE5lc3QoXCJFeHRlbnNpb25zO0luc3RhbGxlZFwiKTtcclxuICB9LFxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgXHJcbiAgICovXHJcbiAgYXN5bmMgaW5zdGFsbCh1cmwsIGRlZmF1bHRDb25maWcgPSB7fSkge1xyXG4gICAgaWYgKCFvdXQuX19jYWNoZV9fLmluaXRpYWxpemVkKSBhd2FpdCBvdXQuaW5pdCgpO1xyXG4gICAgaWYgKHVybC5lbmRzV2l0aChcIi9cIikpIHVybCA9IHVybC5zbGljZSgwLCAtMSk7XHJcbiAgICBpZiAob3V0LnN0b3JhZ2UuaW5zdGFsbGVkLmdob3N0W3VybF0pIHRocm93IG5ldyBFcnJvcihgXCIke3VybH1cIiBleHRlbnNpb24gaXMgYWxyZWFkeSBpbnN0YWxsZWQuYCk7XHJcblxyXG4gICAgbGV0IG1ldGFSZXNwID0gYXdhaXQgZmV0Y2goYCR7dXJsfS9tZXRhZGF0YS5qc29uYCk7XHJcbiAgICBpZiAobWV0YVJlc3Auc3RhdHVzICE9PSAyMDApIHRocm93IG5ldyBFcnJvcihgXCIke3VybH1cIiBleHRlbnNpb24gbWV0YWRhdGEgaXMgbm90IHJlc3BvbmRlZCB3aXRoIDIwMCBzdGF0dXMgY29kZS5gKTtcclxuICAgIGxldCBtZXRhZGF0YSA9IGF3YWl0IG1ldGFSZXNwLmpzb24oKTtcclxuXHJcbiAgICBsZXQgcmVhZG1lUmVzcCA9IGF3YWl0IGZldGNoKGAke3VybH0vcmVhZG1lLm1kYCk7XHJcbiAgICBsZXQgcmVhZG1lID0gcmVhZG1lUmVzcC5zdGF0dXMgPT09IDIwMCA/IGF3YWl0IHJlYWRtZVJlc3AudGV4dCgpIDogbnVsbDtcclxuXHJcbiAgICAvLyBUT0RPOiBTaG93IG1vZGFsIGZvciB1c2VyIHRvIGFjY2VwdCB0aGUgZXh0ZW5zaW9uICh0ZXJtcywgcHJpdmFjeSwgZXRjLilcclxuXHJcbiAgICBsZXQgc291cmNlUmVzcCA9IGF3YWl0IGZldGNoKGAke3VybH0vc291cmNlLmpzYCk7XHJcbiAgICBpZiAoc291cmNlUmVzcC5zdGF0dXMgIT09IDIwMCkgdGhyb3cgbmV3IEVycm9yKGBcIiR7dXJsfVwiIGV4dGVuc2lvbiBzb3VyY2UgaXMgbm90IHJlc3BvbmRlZCB3aXRoIDIwMCBzdGF0dXMgY29kZS5gKTtcclxuICAgIGxldCBzb3VyY2UgPSBhd2FpdCBzb3VyY2VSZXNwLnRleHQoKTtcclxuXHJcblxyXG4gICAgb3V0LnN0b3JhZ2UuaW5zdGFsbGVkLnN0b3JlW3VybF0gPSB7XHJcbiAgICAgIG1ldGFkYXRhOiB7XHJcbiAgICAgICAgY3VycmVudDogbWV0YWRhdGEsXHJcbiAgICAgICAgbGFzdDogbWV0YWRhdGFcclxuICAgICAgfSxcclxuICAgICAgc291cmNlLFxyXG4gICAgICByZWFkbWUsXHJcbiAgICAgIGNvbmZpZzoge1xyXG4gICAgICAgIGF1dG9VcGRhdGU6IHRydWUsXHJcbiAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICAuLi5kZWZhdWx0Q29uZmlnXHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgb3V0LmxvYWQodXJsKTtcclxuICB9LFxyXG4gIGFzeW5jIHVuaW5zdGFsbCh1cmwpIHtcclxuICAgIGlmICghb3V0Ll9fY2FjaGVfXy5pbml0aWFsaXplZCkgYXdhaXQgb3V0LmluaXQoKTtcclxuICAgIGlmICghb3V0LnN0b3JhZ2UuaW5zdGFsbGVkLmdob3N0W3VybF0pIHRocm93IG5ldyBFcnJvcihgXCIke3VybH1cIiBleHRlbnNpb24gaXMgbm90IGluc3RhbGxlZC5gKTtcclxuXHJcbiAgICBkZWxldGUgb3V0LnN0b3JhZ2UuaW5zdGFsbGVkLnN0b3JlW3VybF07XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgYXdhaXQgb3V0LnVubG9hZCh1cmwpO1xyXG4gICAgfSBjYXRjaCB7IH1cclxuICB9LFxyXG4gIGFzeW5jIGxvYWQodXJsKSB7XHJcbiAgICBpZiAoIW91dC5fX2NhY2hlX18uaW5pdGlhbGl6ZWQpIGF3YWl0IG91dC5pbml0KCk7XHJcbiAgICBpZiAoIW91dC5zdG9yYWdlLmluc3RhbGxlZC5naG9zdFt1cmxdKSB0aHJvdyBuZXcgRXJyb3IoYFwiJHt1cmx9XCIgZXh0ZW5zaW9uIGlzIG5vdCBpbnN0YWxsZWQuYCk7XHJcbiAgICBsZXQgZGF0YSA9IG91dC5zdG9yYWdlLmluc3RhbGxlZC5naG9zdFt1cmxdO1xyXG5cclxuICAgIGlmIChvdXQuX19jYWNoZV9fLmxvYWRlZC5naG9zdFt1cmxdKSB0aHJvdyBuZXcgRXJyb3IoYFwiJHt1cmx9XCIgZXh0ZW5zaW9uIGlzIGFscmVhZHkgbG9hZGVkLmApO1xyXG5cclxuICAgIGxldCBhcGkgPSBhd2FpdCBvdXQuYnVpbGRBUEkoZGF0YS5tZXRhZGF0YSk7XHJcblxyXG4gICAgbGV0IGV2YWx1YXRlZCA9IG91dC5ldmFsdWF0ZShkYXRhLnNvdXJjZSwgYXBpKTtcclxuXHJcbiAgICBhd2FpdCBldmFsdWF0ZWQ/LmxvYWQ/LigpO1xyXG5cclxuICAgIG91dC5fX2NhY2hlX18ubG9hZGVkLnN0b3JlW3VybF0gPSB7XHJcbiAgICAgIGV2YWx1YXRlZCxcclxuICAgICAgYXBpXHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgYXN5bmMgdW5sb2FkKHVybCkge1xyXG4gICAgaWYgKCFvdXQuX19jYWNoZV9fLmluaXRpYWxpemVkKSBhd2FpdCBvdXQuaW5pdCgpO1xyXG4gICAgaWYgKCFvdXQuc3RvcmFnZS5pbnN0YWxsZWQuZ2hvc3RbdXJsXSkgdGhyb3cgbmV3IEVycm9yKGBcIiR7dXJsfVwiIGV4dGVuc2lvbiBpcyBub3QgaW5zdGFsbGVkLmApO1xyXG5cclxuICAgIGlmICghb3V0Ll9fY2FjaGVfXy5sb2FkZWQuZ2hvc3RbdXJsXSkgdGhyb3cgbmV3IEVycm9yKGBcIiR7dXJsfVwiIGV4dGVuc2lvbiBpcyBub3QgbG9hZGVkLmApO1xyXG5cclxuICAgIGxldCB7IGV2YWx1YXRlZCB9ID0gb3V0Ll9fY2FjaGVfXy5sb2FkZWQuZ2hvc3RbdXJsXTtcclxuXHJcbiAgICBhd2FpdCBldmFsdWF0ZWQ/LnVubG9hZD8uKCk7XHJcblxyXG4gICAgZGVsZXRlIG91dC5fX2NhY2hlX18ubG9hZGVkLnN0b3JlW3VybF07XHJcbiAgfSxcclxuICBldmFsdWF0ZShzb3VyY2UsIGFwaSkge1xyXG4gICAgY29uc3QgJGFjb3JkID0gYXBpO1xyXG4gICAgcmV0dXJuIGV2YWwoc291cmNlKTtcclxuICB9LFxyXG4gIGFzeW5jIGxvYWRBbGwoKSB7XHJcbiAgICBpZiAoIW91dC5fX2NhY2hlX18uaW5pdGlhbGl6ZWQpIGF3YWl0IG91dC5pbml0KCk7XHJcbiAgICByZXR1cm4gUHJvbWlzZS5hbGwoT2JqZWN0LmtleXMob3V0LnN0b3JhZ2UuaW5zdGFsbGVkLmdob3N0KS5tYXAodXJsID0+IG91dC5sb2FkKHVybCkpKTtcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBvdXQ7IiwgImV4cG9ydCBkZWZhdWx0IHtcclxuICBwcm9jZXNzOiBnbG9iYWxUaGlzW1wiPFBSRUxPQURfS0VZPlwiXS5wcm9jZXNzLFxyXG4gIGlzRGV2VG9vbHNPcGVuOiBnbG9iYWxUaGlzW1wiPFBSRUxPQURfS0VZPlwiXS5pc0RldlRvb2xzT3BlblxyXG59XHJcblxyXG4iLCAiZXhwb3J0IGRlZmF1bHQgYFxuLmFjb3JkLS1sYXllci1jb250YWluZXJ7LS10b3Atb2Zmc2V0OiAwcHg7d2lkdGg6MTAwdnc7aGVpZ2h0OmNhbGMoMTAwdmggLSB2YXIoLS10b3Atb2Zmc2V0KSk7ei1pbmRleDo5OTk5OTk5O3BvaW50ZXItZXZlbnRzOm5vbmU7cG9zaXRpb246YWJzb2x1dGU7dG9wOnZhcigtLXRvcC1vZmZzZXQpO2xlZnQ6MHB4fS5hY29yZC0tbGF5ZXItY29udGFpbmVyICp7ei1pbmRleDo5OTk5OTk5OTk5OTk5OX0uYWNvcmQtLXRvb2x0aXAtbGF5ZXJ7b3BhY2l0eTowO3RyYW5zaXRpb246NTBtcyBsaW5lYXIgb3BhY2l0eTtwb3NpdGlvbjphYnNvbHV0ZTtwb2ludGVyLWV2ZW50czpub25lfS5hY29yZC0tdG9vbHRpcC1sYXllci52aXNpYmxle29wYWNpdHk6MTtwb2ludGVyLWV2ZW50czphbGx9LmFjb3JkLS10b29sdGlwLnZlcnRpY2Fse3RyYW5zZm9ybTp0cmFuc2xhdGVYKC01MCUpfS5hY29yZC0tdG9vbHRpcC5ob3Jpem9udGFse3RyYW5zZm9ybTp0cmFuc2xhdGVZKC01MCUpfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVye3dpZHRoOjEwMHZ3O2hlaWdodDpjYWxjKDEwMHZoIC0gdmFyKC0tdG9wLW9mZnNldCkpO2Rpc3BsYXk6ZmxleDtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtsZWZ0OjA7cG9pbnRlci1ldmVudHM6bm9uZX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllciAuYWNvcmQtLW5vdGlmaWNhdGlvbntkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1uO3BvaW50ZXItZXZlbnRzOmFsbDt0cmFuc2l0aW9uOnRyYW5zZm9ybSAyNTBtcyBlYXNlLWluLW91dCxvcGFjaXR5IDI1MG1zIGVhc2UtaW4tb3V0O21hcmdpbjo0cHg7YmFja2Ryb3AtZmlsdGVyOmJsdXIoMTZweCkgYnJpZ2h0bmVzcygwLjc1KTstd2Via2l0LWFwcC1yZWdpb246bm8tZHJhZzstLWFuaW1hdGlvbi1zaXplOiA1MHB4fS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyIC5hY29yZC0tbm90aWZpY2F0aW9uLmhpZGRlbiwuYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllciAuYWNvcmQtLW5vdGlmaWNhdGlvbi5jbG9zaW5ne29wYWNpdHk6MH0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllciAuYWNvcmQtLW5vdGlmaWNhdGlvbj4uY29udGFpbmVye2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47cGFkZGluZzo4cHg7Y29sb3I6I2ZmZjttaW4td2lkdGg6MjUwcHh9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24+LmNvbnRhaW5lcj4uY2xvc2V7d2lkdGg6MjRweDtoZWlnaHQ6MjRweDtjb2xvcjojZmZmO29wYWNpdHk6LjU7Y3Vyc29yOnBvaW50ZXI7bWFyZ2luLWxlZnQ6OHB4O3otaW5kZXg6OTk5OTk5OTk5fS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyIC5hY29yZC0tbm90aWZpY2F0aW9uPi5jb250YWluZXI+LmNsb3NlLmhpZGRlbntkaXNwbGF5Om5vbmV9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24+LnByb2dyZXNzLWNvbnRhaW5lcnt3aWR0aDoxMDAlO2hlaWdodDo1cHh9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24+LnByb2dyZXNzLWNvbnRhaW5lcj4ucHJvZ3Jlc3N7d2lkdGg6MCU7aGVpZ2h0OjVweDt0cmFuc2l0aW9uOndpZHRoIHZhcigtLWR1cmF0aW9uKSBsaW5lYXI7YmFja2dyb3VuZC1jb2xvcjp2YXIoLS1iYXItY29sb3IpfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyIC5hY29yZC0tbm90aWZpY2F0aW9uPi5wcm9ncmVzcy1jb250YWluZXI+LnByb2dyZXNzLnByb2dyZXNzaW5ne3dpZHRoOjEwMCV9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24uc3R5bGUtaW5mb3stLWJhci1jb2xvcjogIzRhOGZlMX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllciAuYWNvcmQtLW5vdGlmaWNhdGlvbi5zdHlsZS13YXJuaW5ney0tYmFyLWNvbG9yOiAjZmFhODFhfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyIC5hY29yZC0tbm90aWZpY2F0aW9uLnN0eWxlLWVycm9yey0tYmFyLWNvbG9yOiAjZWQ0MjQ1fS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyIC5hY29yZC0tbm90aWZpY2F0aW9uLnN0eWxlLXN1Y2Nlc3N7LS1iYXItY29sb3I6ICMzYmE1NWR9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24uc3R5bGUtZGVmYXVsdHstLWJhci1jb2xvcjogd2hpdGVzbW9rZX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci50b3AtcmlnaHR7anVzdGlmeS1jb250ZW50OmZsZXgtZW5kO2FsaWduLWl0ZW1zOmZsZXgtc3RhcnR9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIudG9wLXJpZ2h0IC5hY29yZC0tbm90aWZpY2F0aW9uLmhpZGRlbnt0cmFuc2Zvcm06dHJhbnNsYXRlKDAsIGNhbGModmFyKC0tYW5pbWF0aW9uLXNpemUpICogLTEpKX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci50b3AtcmlnaHQgLmFjb3JkLS1ub3RpZmljYXRpb24uY2xvc2luZ3t0cmFuc2Zvcm06dHJhbnNsYXRlKDAsIHZhcigtLWFuaW1hdGlvbi1zaXplKSl9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIudG9wLWxlZnR7anVzdGlmeS1jb250ZW50OmZsZXgtc3RhcnQ7YWxpZ24taXRlbXM6ZmxleC1zdGFydH0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci50b3AtbGVmdCAuYWNvcmQtLW5vdGlmaWNhdGlvbi5oaWRkZW57dHJhbnNmb3JtOnRyYW5zbGF0ZSgwLCBjYWxjKHZhcigtLWFuaW1hdGlvbi1zaXplKSAqIC0xKSl9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIudG9wLWxlZnQgLmFjb3JkLS1ub3RpZmljYXRpb24uY2xvc2luZ3t0cmFuc2Zvcm06dHJhbnNsYXRlKDAsIHZhcigtLWFuaW1hdGlvbi1zaXplKSl9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIuYm90dG9tLXJpZ2h0e2p1c3RpZnktY29udGVudDpmbGV4LWVuZDthbGlnbi1pdGVtczpmbGV4LWVuZH0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci5ib3R0b20tcmlnaHQgLmFjb3JkLS1ub3RpZmljYXRpb24uaGlkZGVue3RyYW5zZm9ybTp0cmFuc2xhdGUoMCwgdmFyKC0tYW5pbWF0aW9uLXNpemUpKX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci5ib3R0b20tcmlnaHQgLmFjb3JkLS1ub3RpZmljYXRpb24uY2xvc2luZ3t0cmFuc2Zvcm06dHJhbnNsYXRlKDAsIGNhbGModmFyKC0tYW5pbWF0aW9uLXNpemUpICogLTEpKX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci5ib3R0b20tbGVmdHtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1zdGFydDthbGlnbi1pdGVtczpmbGV4LWVuZH0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci5ib3R0b20tbGVmdCAuYWNvcmQtLW5vdGlmaWNhdGlvbi5oaWRkZW57dHJhbnNmb3JtOnRyYW5zbGF0ZSgwLCB2YXIoLS1hbmltYXRpb24tc2l6ZSkpfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLmJvdHRvbS1sZWZ0IC5hY29yZC0tbm90aWZpY2F0aW9uLmNsb3Npbmd7dHJhbnNmb3JtOnRyYW5zbGF0ZSgwLCBjYWxjKHZhcigtLWFuaW1hdGlvbi1zaXplKSAqIC0xKSl9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIudG9wLWNlbnRlcntqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO2FsaWduLWl0ZW1zOmZsZXgtc3RhcnR9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIudG9wLWNlbnRlciAuYWNvcmQtLW5vdGlmaWNhdGlvbi5oaWRkZW57dHJhbnNmb3JtOnRyYW5zbGF0ZSgwLCBjYWxjKHZhcigtLWFuaW1hdGlvbi1zaXplKSAqIC0xKSl9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIudG9wLWNlbnRlciAuYWNvcmQtLW5vdGlmaWNhdGlvbi5jbG9zaW5ne3RyYW5zZm9ybTp0cmFuc2xhdGUoMCwgdmFyKC0tYW5pbWF0aW9uLXNpemUpKX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci5ib3R0b20tY2VudGVye2p1c3RpZnktY29udGVudDpjZW50ZXI7YWxpZ24taXRlbXM6ZmxleC1lbmR9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIuYm90dG9tLWNlbnRlciAuYWNvcmQtLW5vdGlmaWNhdGlvbi5oaWRkZW57dHJhbnNmb3JtOnRyYW5zbGF0ZSgwLCB2YXIoLS1hbmltYXRpb24tc2l6ZSkpfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLmJvdHRvbS1jZW50ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24uY2xvc2luZ3t0cmFuc2Zvcm06dHJhbnNsYXRlKDAsIGNhbGModmFyKC0tYW5pbWF0aW9uLXNpemUpICogLTEpKX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci5jZW50ZXJ7anVzdGlmeS1jb250ZW50OmNlbnRlcjthbGlnbi1pdGVtczpjZW50ZXJ9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIuY2VudGVyIC5hY29yZC0tbm90aWZpY2F0aW9uLmhpZGRlbnt0cmFuc2Zvcm06c2NhbGUoMC41KX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci5jZW50ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24uY2xvc2luZ3t0cmFuc2Zvcm06c2NhbGUoMC41KX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci5sZWZ0LWNlbnRlcntqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1zdGFydDthbGlnbi1pdGVtczpjZW50ZXJ9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIubGVmdC1jZW50ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24uaGlkZGVue3RyYW5zZm9ybTp0cmFuc2xhdGUoY2FsYyh2YXIoLS1hbmltYXRpb24tc2l6ZSkgKiAtMSksIDApfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLmxlZnQtY2VudGVyIC5hY29yZC0tbm90aWZpY2F0aW9uLmNsb3Npbmd7dHJhbnNmb3JtOnRyYW5zbGF0ZSh2YXIoLS1hbmltYXRpb24tc2l6ZSksIDApfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLnJpZ2h0LWNlbnRlcntqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1lbmQ7YWxpZ24taXRlbXM6Y2VudGVyfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLnJpZ2h0LWNlbnRlciAuYWNvcmQtLW5vdGlmaWNhdGlvbi5oaWRkZW57dHJhbnNmb3JtOnRyYW5zbGF0ZSh2YXIoLS1hbmltYXRpb24tc2l6ZSksIDApfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLnJpZ2h0LWNlbnRlciAuYWNvcmQtLW5vdGlmaWNhdGlvbi5jbG9zaW5ne3RyYW5zZm9ybTp0cmFuc2xhdGUoY2FsYyh2YXIoLS1hbmltYXRpb24tc2l6ZSkgKiAtMSksIDApfWA7XG4iLCAiaW1wb3J0IGRvbSBmcm9tIFwiLi4vZG9tL2luZGV4LmpzXCI7XHJcbmltcG9ydCBldmVudHMgZnJvbSBcIi4uL2V2ZW50cy9pbmRleC5qc1wiO1xyXG5pbXBvcnQgd2VicGFjayBmcm9tIFwiLi4vbW9kdWxlcy93ZWJwYWNrLmpzXCI7XHJcblxyXG5jb25zdCB0b29sdGlwQ2xhc3NlcyA9IHdlYnBhY2suZmluZEJ5UHJvcGVydGllcyhcInRvb2x0aXBDb250ZW50QWxsb3dPdmVyZmxvd1wiLCBcInRvb2x0aXBcIik7XHJcblxyXG5jb25zdCB0b29sdGlwUG9zaXRpb25zID0ge1xyXG4gIHRvcDogdG9vbHRpcENsYXNzZXMudG9vbHRpcFRvcCxcclxuICBib3R0b206IHRvb2x0aXBDbGFzc2VzLnRvb2x0aXBCb3R0b20sXHJcbiAgbGVmdDogdG9vbHRpcENsYXNzZXMudG9vbHRpcExlZnQsXHJcbiAgcmlnaHQ6IHRvb2x0aXBDbGFzc2VzLnRvb2x0aXBSaWdodCxcclxufVxyXG5cclxuY2xhc3MgVG9vbHRpcCB7XHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtIVE1MRGl2RWxlbWVudH0gdGFyZ2V0IFxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfEhUTUxEaXZFbGVtZW50fSBjb250ZW50XHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IodGFyZ2V0LCBjb250ZW50LCBwb3NpdGlvbiA9IFwiYXV0b1wiKSB7XHJcbiAgICAvKiogQHR5cGUge0hUTUxEaXZFbGVtZW50fSAqL1xyXG4gICAgdGhpcy5sYXllckVsZW1lbnQgPSBkb20ucGFyc2UoYFxyXG4gICAgICA8ZGl2IGNsYXNzPVwiYWNvcmQtLXRvb2x0aXAtbGF5ZXJcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiJHt0b29sdGlwQ2xhc3Nlcy50b29sdGlwfSAke3Rvb2x0aXBDbGFzc2VzLnRvb2x0aXBQcmltYXJ5fSBhY29yZC0tdG9vbHRpcFwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cIiR7dG9vbHRpcENsYXNzZXMudG9vbHRpcFBvaW50ZXJ9IGFjb3JkLS10b29sdGlwLXBvaW50ZXJcIj48L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCIke3Rvb2x0aXBDbGFzc2VzLnRvb2x0aXBDb250ZW50fSBhY29yZC0tdG9vbHRpcC1jb250ZW50XCI+PC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgYCk7XHJcbiAgICB0aGlzLnRvb2x0aXBFbGVtZW50ID0gdGhpcy5sYXllckVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5hY29yZC0tdG9vbHRpcFwiKTtcclxuICAgIHRoaXMuY29udGVudEVsZW1lbnQgPSB0aGlzLmxheWVyRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmFjb3JkLS10b29sdGlwLWNvbnRlbnRcIik7XHJcbiAgICB0aGlzLmNvbnRlbnQgPSBjb250ZW50O1xyXG4gICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XHJcblxyXG4gICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XHJcbiAgICB0aGlzLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLnBhdXNlZCA9IGZhbHNlO1xyXG5cclxuICAgIGNvbnN0IG9uTW91c2VFbnRlciA9ICgpID0+IHtcclxuICAgICAgaWYgKHRoaXMuZGlzYWJsZWQgfHwgdGhpcy5wYXVzZWQpIHJldHVybjtcclxuICAgICAgdGhpcy5zaG93KCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgb25Nb3VzZUxlYXZlID0gKCkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5wYXVzZWQpIHJldHVybjtcclxuICAgICAgdGhpcy5oaWRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy50YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgb25Nb3VzZUVudGVyKTtcclxuICAgIHRoaXMudGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIG9uTW91c2VMZWF2ZSk7XHJcblxyXG4gICAgbGV0IHVuUGF0Y2hPYnNlcnZlciA9IGV2ZW50cy5vbihcclxuICAgICAgXCJkb20tbXV0YXRpb25cIixcclxuICAgICAgLyoqIEBwYXJhbSB7TXV0YXRpb25SZWNvcmR9IG11dCAqLyhtdXQpID0+IHtcclxuICAgICAgICBpZiAobXV0LnR5cGUgPT09IFwiYXR0cmlidXRlc1wiKSB7XHJcbiAgICAgICAgICBpZiAobXV0LnRhcmdldC5pc1NhbWVOb2RlKHRoaXMudGFyZ2V0KSkge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG11dC5hdHRyaWJ1dGVOYW1lKSB7XHJcbiAgICAgICAgICAgICAgY2FzZSBcImFjb3JkLS10b29sdGlwLWRpc2FibGVkXCI6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlzYWJsZWQgPSB0aGlzLnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJhY29yZC0tdG9vbHRpcC1kaXNhYmxlZFwiKSA9PT0gXCJ0cnVlXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgY2FzZSBcImFjb3JkLS10b29sdGlwLWNvbnRlbnRcIjoge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50ID0gdGhpcy50YXJnZXQuZ2V0QXR0cmlidXRlKFwiYWNvcmQtLXRvb2x0aXAtY29udGVudFwiKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBjYXNlIFwiYWNvcmQtLXRvb2x0aXAtcG9zaXRpb25cIjoge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHRoaXMudGFyZ2V0LmdldEF0dHJpYnV0ZShcImFjb3JkLS10b29sdGlwLXBvc2l0aW9uXCIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICApXHJcblxyXG4gICAgdGhpcy5kZXN0cm95ID0gKCkgPT4ge1xyXG4gICAgICB0aGlzLnRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCBvbk1vdXNlRW50ZXIpO1xyXG4gICAgICB0aGlzLnRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCBvbk1vdXNlTGVhdmUpO1xyXG4gICAgICB0aGlzLmhpZGUoKTtcclxuICAgICAgdW5QYXRjaE9ic2VydmVyKCk7XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgZ2V0IGNvbnRlbnQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jb250ZW50RWxlbWVudC5maXJzdEVsZW1lbnRDaGlsZDtcclxuICB9XHJcblxyXG4gIHNldCBjb250ZW50KHZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgIHRoaXMuY29udGVudEVsZW1lbnQuaW5uZXJIVE1MID0gdmFsdWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmNvbnRlbnRFbGVtZW50LmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICAgIHRoaXMuY29udGVudEVsZW1lbnQuYXBwZW5kQ2hpbGQodmFsdWUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIGdldENvbnRhaW5lcigpIHtcclxuICAgIGNvbnN0IGFwcEVsbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tjbGFzcyo9XCJub3REZXZUb29scy1cIl0nKTtcclxuXHJcbiAgICBsZXQgY29udGFpbmVyID0gYXBwRWxtLnF1ZXJ5U2VsZWN0b3IoXCIuYWNvcmQtLXRvb2x0aXAtY29udGFpbmVyXCIpO1xyXG4gICAgaWYgKCFjb250YWluZXIpIHtcclxuICAgICAgY29udGFpbmVyID0gZG9tLnBhcnNlKGA8ZGl2IGNsYXNzPVwiYWNvcmQtLWxheWVyLWNvbnRhaW5lciBhY29yZC0tdG9vbHRpcC1jb250YWluZXJcIj48L2Rpdj5gKTtcclxuICAgICAgYXBwRWxtLmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XHJcbiAgICB9XHJcbiAgICBjb250YWluZXIuc3R5bGUuc2V0UHJvcGVydHkoXCItLXRvcC1vZmZzZXRcIiwgYCR7YXBwRWxtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcC50b0ZpeGVkKDEpfXB4YCk7XHJcblxyXG4gICAgcmV0dXJuIGNvbnRhaW5lcjtcclxuICB9XHJcblxyXG4gIHNob3coKSB7XHJcbiAgICBpZiAodGhpcy52aXNpYmxlKSByZXR1cm47XHJcbiAgICB0aGlzLnZpc2libGUgPSB0cnVlO1xyXG5cclxuICAgIGNvbnN0IGNvbnRhaW5lciA9IFRvb2x0aXAuZ2V0Q29udGFpbmVyKCk7XHJcblxyXG4gICAgaWYgKHRoaXMucG9zaXRpb24gPT09IFwiYXV0b1wiKSB7XHJcbiAgICAgIHRoaXMuY2FsY3VsYXRlUG9zaXRpb24oXHJcbiAgICAgICAgdGhpcy5jYW5TaG93QXRUb3AgPyBcInRvcFwiXHJcbiAgICAgICAgICA6IHRoaXMuY2FuU2hvd0F0Qm90dG9tID8gXCJib3R0b21cIlxyXG4gICAgICAgICAgICA6IHRoaXMuY2FuU2hvd0F0TGVmdCA/IFwibGVmdFwiXHJcbiAgICAgICAgICAgICAgOiB0aGlzLmNhblNob3dBdFJpZ2h0ID8gXCJyaWdodFwiXHJcbiAgICAgICAgICAgICAgICA6IFwidG9wXCJcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuY2FsY3VsYXRlUG9zaXRpb24odGhpcy5wb3NpdGlvbik7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmxheWVyRWxlbWVudCk7XHJcbiAgICB0aGlzLmxheWVyRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwidmlzaWJsZVwiKTtcclxuICB9XHJcblxyXG4gIGNhbGN1bGF0ZVBvc2l0aW9uKHBvc2l0aW9uKSB7XHJcbiAgICBjb25zdCBib3VuZGluZ1JlY3QgPSB0aGlzLnRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHJcbiAgICB0aGlzLmxheWVyRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKC4uLk9iamVjdC52YWx1ZXModG9vbHRpcFBvc2l0aW9ucykpO1xyXG4gICAgdGhpcy50b29sdGlwRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwidmVydGljYWxcIiwgXCJob3Jpem9udGFsXCIpO1xyXG5cclxuICAgIHN3aXRjaCAocG9zaXRpb24pIHtcclxuICAgICAgY2FzZSBcInRvcFwiOiB7XHJcbiAgICAgICAgdGhpcy5sYXllckVsZW1lbnQuc3R5bGUudG9wID0gYCR7Ym91bmRpbmdSZWN0LnRvcCAtIHRoaXMudGFyZ2V0Lm9mZnNldEhlaWdodCAtIDEwfXB4YDtcclxuICAgICAgICB0aGlzLmxheWVyRWxlbWVudC5zdHlsZS5sZWZ0ID0gYCR7Ym91bmRpbmdSZWN0LmxlZnR9cHhgO1xyXG4gICAgICAgIHRoaXMubGF5ZXJFbGVtZW50LmNsYXNzTGlzdC5hZGQodG9vbHRpcFBvc2l0aW9ucy50b3ApO1xyXG4gICAgICAgIHRoaXMudG9vbHRpcEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInZlcnRpY2FsXCIpO1xyXG4gICAgICAgIHRoaXMuY2VudGVyUG9zaXRpb24oXCJob3Jpem9udGFsXCIpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgXCJib3R0b21cIjoge1xyXG4gICAgICAgIHRoaXMubGF5ZXJFbGVtZW50LnN0eWxlLnRvcCA9IGAke2JvdW5kaW5nUmVjdC50b3AgKyB0aGlzLnRhcmdldC5vZmZzZXRIZWlnaHQgKyAxMH1weGA7XHJcbiAgICAgICAgdGhpcy5sYXllckVsZW1lbnQuc3R5bGUubGVmdCA9IGAke2JvdW5kaW5nUmVjdC5sZWZ0fXB4YDtcclxuICAgICAgICB0aGlzLmxheWVyRWxlbWVudC5jbGFzc0xpc3QuYWRkKHRvb2x0aXBQb3NpdGlvbnMuYm90dG9tKTtcclxuICAgICAgICB0aGlzLnRvb2x0aXBFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJ2ZXJ0aWNhbFwiKTtcclxuICAgICAgICB0aGlzLmNlbnRlclBvc2l0aW9uKFwiaG9yaXpvbnRhbFwiKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlIFwibGVmdFwiOiB7XHJcbiAgICAgICAgdGhpcy5sYXllckVsZW1lbnQuc3R5bGUudG9wID0gYCR7Ym91bmRpbmdSZWN0LnRvcH1weGA7XHJcbiAgICAgICAgdGhpcy5sYXllckVsZW1lbnQuc3R5bGUubGVmdCA9IGAke2JvdW5kaW5nUmVjdC5sZWZ0IC0gdGhpcy50YXJnZXQub2Zmc2V0V2lkdGggLSAxMH1weGA7XHJcbiAgICAgICAgdGhpcy5sYXllckVsZW1lbnQuY2xhc3NMaXN0LmFkZCh0b29sdGlwUG9zaXRpb25zLmxlZnQpO1xyXG4gICAgICAgIHRoaXMudG9vbHRpcEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImhvcml6b250YWxcIik7XHJcbiAgICAgICAgdGhpcy5jZW50ZXJQb3NpdGlvbihcInZlcnRpY2FsXCIpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgXCJyaWdodFwiOiB7XHJcbiAgICAgICAgdGhpcy5sYXllckVsZW1lbnQuc3R5bGUudG9wID0gYCR7Ym91bmRpbmdSZWN0LnRvcH1weGA7XHJcbiAgICAgICAgdGhpcy5sYXllckVsZW1lbnQuc3R5bGUubGVmdCA9IGAke2JvdW5kaW5nUmVjdC5sZWZ0ICsgdGhpcy50YXJnZXQub2Zmc2V0V2lkdGggKyAxMH1weGA7XHJcbiAgICAgICAgdGhpcy5sYXllckVsZW1lbnQuY2xhc3NMaXN0LmFkZCh0b29sdGlwUG9zaXRpb25zLnJpZ2h0KTtcclxuICAgICAgICB0aGlzLnRvb2x0aXBFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJob3Jpem9udGFsXCIpO1xyXG4gICAgICAgIHRoaXMuY2VudGVyUG9zaXRpb24oXCJ2ZXJ0aWNhbFwiKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY2VudGVyUG9zaXRpb24oZGlyZWN0aW9uKSB7XHJcbiAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xyXG4gICAgICBjYXNlIFwiaG9yaXpvbnRhbFwiOiB7XHJcbiAgICAgICAgY29uc3QgY2VudGVyID0gdGhpcy50YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCArICh0aGlzLnRhcmdldC5vZmZzZXRXaWR0aCAvIDIpO1xyXG4gICAgICAgIHRoaXMubGF5ZXJFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KFwibGVmdFwiLCBgJHtjZW50ZXIgLSAodGhpcy5sYXllckVsZW1lbnQub2Zmc2V0V2lkdGggLyAyKX1weGApO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgXCJ2ZXJ0aWNhbFwiOiB7XHJcbiAgICAgICAgY29uc3QgY2VudGVyID0gdGhpcy50YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgKHRoaXMudGFyZ2V0Lm9mZnNldEhlaWdodCAvIDIpO1xyXG4gICAgICAgIHRoaXMubGF5ZXJFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KFwidG9wXCIsIGAke2NlbnRlciAtICh0aGlzLmxheWVyRWxlbWVudC5vZmZzZXRIZWlnaHQgLyAyKX1weGApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBoaWRlKCkge1xyXG4gICAgaWYgKCF0aGlzLnZpc2libGUpIHJldHVybjtcclxuICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMubGF5ZXJFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJ2aXNpYmxlXCIpO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHRoaXMubGF5ZXJFbGVtZW50LnJlbW92ZSgpO1xyXG4gICAgfSwgNTApO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGNhblNob3dBdFRvcCgpIHsgcmV0dXJuIHRoaXMudGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCAtIHRoaXMubGF5ZXJFbGVtZW50Lm9mZnNldEhlaWdodCA+PSAwOyB9XHJcbiAgZ2V0IGNhblNob3dBdEJvdHRvbSgpIHsgcmV0dXJuIHRoaXMudGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCArIHRoaXMudGFyZ2V0Lm9mZnNldEhlaWdodCArIHRoaXMubGF5ZXJFbGVtZW50Lm9mZnNldEhlaWdodCA8PSB3aW5kb3cuaW5uZXJIZWlnaHQ7IH1cclxuICBnZXQgY2FuU2hvd0F0TGVmdCgpIHsgcmV0dXJuIHRoaXMudGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQgLSB0aGlzLmxheWVyRWxlbWVudC5vZmZzZXRXaWR0aCA+PSAwOyB9XHJcbiAgZ2V0IGNhblNob3dBdFJpZ2h0KCkgeyByZXR1cm4gdGhpcy50YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCArIHRoaXMudGFyZ2V0Lm9mZnNldFdpZHRoICsgdGhpcy5sYXllckVsZW1lbnQub2Zmc2V0V2lkdGggPD0gd2luZG93LmlubmVyV2lkdGg7IH1cclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlKHRhcmdldCwgY29udGVudCwgcG9zaXRpb24gPSBcImF1dG9cIikge1xyXG4gIHJldHVybiBuZXcgVG9vbHRpcCh0YXJnZXQsIGNvbnRlbnQsIHBvc2l0aW9uKTtcclxufVxyXG5cclxuZG9tLnBhdGNoKFxyXG4gIFwiW2Fjb3JkLS10b29sdGlwLWNvbnRlbnRdXCIsXHJcbiAgKGVsbSkgPT4ge1xyXG4gICAgbGV0IHRvb2x0aXAgPSBjcmVhdGUoZWxtLCBlbG0uZ2V0QXR0cmlidXRlKFwiYWNvcmQtLXRvb2x0aXAtY29udGVudFwiKSwgZWxtLmdldEF0dHJpYnV0ZShcImFjb3JkLS10b29sdGlwLXBvc2l0aW9uXCIpKTtcclxuICAgIHRvb2x0aXAuZGlzYWJsZWQgPSBlbG0uZ2V0QXR0cmlidXRlKFwiYWNvcmQtLXRvb2x0aXAtZGlzYWJsZWRcIikgPT09IFwidHJ1ZVwiO1xyXG5cclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIHRvb2x0aXAuZGVzdHJveSgpO1xyXG4gICAgfVxyXG4gIH0sXHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7IGNyZWF0ZSB9OyIsICJpbXBvcnQgZG9tIGZyb20gXCIuLi9kb20vaW5kZXguanNcIjtcclxuaW1wb3J0IHV0aWxzIGZyb20gXCIuLi91dGlscy9pbmRleC5qc1wiO1xyXG5cclxuY29uc3QgdmFsaWRQb3NpdGlvbnMgPSBbXHJcbiAgXCJ0b3AtcmlnaHRcIixcclxuICBcInRvcC1sZWZ0XCIsXHJcbiAgXCJib3R0b20tcmlnaHRcIixcclxuICBcImJvdHRvbS1sZWZ0XCIsXHJcbiAgXCJ0b3AtY2VudGVyXCIsXHJcbiAgXCJib3R0b20tY2VudGVyXCIsXHJcbiAgXCJjZW50ZXJcIixcclxuICBcImxlZnQtY2VudGVyXCIsXHJcbiAgXCJyaWdodC1jZW50ZXJcIlxyXG5dXHJcblxyXG5mdW5jdGlvbiBnZXRDb250YWluZXIocG9zaXRpb24pIHtcclxuICBpZiAoIXZhbGlkUG9zaXRpb25zLmluY2x1ZGVzKHBvc2l0aW9uKSkgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHBvc2l0aW9uIFwiJHtwb3NpdGlvbn1cIi4gVmFsaWQgcG9zaXRpb25zIGFyZTogJHt2YWxpZFBvc2l0aW9ucy5qb2luKFwiLCBcIil9YCk7XHJcbiAgY29uc3QgYXBwRWxtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2NsYXNzKj1cIm5vdEFwcEFzaWRlUGFuZWwtXCJdJyk7XHJcblxyXG4gIGxldCB0b3BDb250YWluZXIgPSBhcHBFbG0ucXVlcnlTZWxlY3RvcihcIi5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLWNvbnRhaW5lclwiKTtcclxuICBpZiAoIXRvcENvbnRhaW5lcikge1xyXG4gICAgdG9wQ29udGFpbmVyID0gZG9tLnBhcnNlKGA8ZGl2IGNsYXNzPVwiYWNvcmQtLWxheWVyLWNvbnRhaW5lciBhY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLWNvbnRhaW5lclwiPjwvZGl2PmApO1xyXG4gICAgYXBwRWxtLmFwcGVuZENoaWxkKHRvcENvbnRhaW5lcik7XHJcbiAgfVxyXG4gIHRvcENvbnRhaW5lci5zdHlsZS5zZXRQcm9wZXJ0eShcIi0tdG9wLW9mZnNldFwiLCBgJHthcHBFbG0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wLnRvRml4ZWQoMSl9cHhgKTtcclxuXHJcbiAgbGV0IHBvc2l0aW9uQ29udGFpbmVyID0gdG9wQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoYC5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLiR7cG9zaXRpb259YCk7XHJcbiAgaWYgKCFwb3NpdGlvbkNvbnRhaW5lcikge1xyXG4gICAgcG9zaXRpb25Db250YWluZXIgPSBkb20ucGFyc2UoYDxkaXYgY2xhc3M9XCJhY29yZC0tbm90aWZpY2F0aW9uLWxheWVyICR7cG9zaXRpb259XCI+PC9kaXY+YCk7XHJcbiAgICB0b3BDb250YWluZXIuYXBwZW5kQ2hpbGQocG9zaXRpb25Db250YWluZXIpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHBvc2l0aW9uQ29udGFpbmVyO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93KGNvbnRlbnQsIHtcclxuICBzdHlsZSA9IFwiZGVmYXVsdFwiLFxyXG4gIHRpbWVvdXQgPSAxMDAwMCxcclxuICBwb3NpdGlvbiA9IFwidG9wLXJpZ2h0XCIsXHJcbiAgY2xvc2FibGUgPSB0cnVlLFxyXG4gIG9uQ2xpY2sgPSBudWxsLFxyXG4gIG9uQ2xvc2UgPSBudWxsXHJcbn0gPSB7fSkge1xyXG4gIGNvbnN0IGNvbnRhaW5lciA9IGdldENvbnRhaW5lcihwb3NpdGlvbik7XHJcblxyXG4gIGNvbnN0IG5vdGlmRWxtID0gZG9tLnBhcnNlKGBcclxuICAgIDxkaXYgY2xhc3M9XCJhY29yZC0tbm90aWZpY2F0aW9uIHN0eWxlLSR7c3R5bGV9IGhpZGRlblwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRlbnRcIj48L2Rpdj5cclxuICAgICAgICAgICAgPHN2ZyBjbGFzcz1cImNsb3NlICR7IWNsb3NhYmxlID8gXCJoaWRkZW5cIiA6IFwiXCJ9XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMjRcIj5cclxuICAgICAgICAgICAgICAgIDxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTEyIDEwLjU4Nmw0Ljk1LTQuOTUgMS40MTQgMS40MTQtNC45NSA0Ljk1IDQuOTUgNC45NS0xLjQxNCAxLjQxNC00Ljk1LTQuOTUtNC45NSA0Ljk1LTEuNDE0LTEuNDE0IDQuOTUtNC45NS00Ljk1LTQuOTVMNy4wNSA1LjYzNnpcIi8+XHJcbiAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJwcm9ncmVzcy1jb250YWluZXJcIiBzdHlsZT1cIi0tZHVyYXRpb246ICR7dGltZW91dH1tcztcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2dyZXNzXCI+PC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICBgKTtcclxuXHJcbiAgbm90aWZFbG0ucXVlcnlTZWxlY3RvcihcIi5jb250ZW50XCIpLmlubmVySFRNTCA9IGNvbnRlbnQ7XHJcblxyXG4gIGxldCBjbG9zZWQgPSBmYWxzZTtcclxuICBmdW5jdGlvbiBjbG9zZShjbG9zZVR5cGUpIHtcclxuICAgIGlmIChjbG9zZWQpIHJldHVybjtcclxuICAgIGNsb3NlZCA9IHRydWU7XHJcblxyXG4gICAgbm90aWZFbG0uY2xhc3NMaXN0LmFkZChcImNsb3NpbmdcIik7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgbm90aWZFbG0ucmVtb3ZlKCk7XHJcbiAgICB9LCAyNzUpO1xyXG4gICAgb25DbG9zZT8uKGNsb3NlVHlwZSk7XHJcbiAgfVxyXG5cclxuICBpZiAodHlwZW9mIG9uQ2xpY2sgPT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICBub3RpZkVsbS5jbGFzc0xpc3QuYWRkKFwiY2xpY2thYmxlXCIpO1xyXG4gICAgbm90aWZFbG0ub25jbGljayA9ICgpID0+IHtcclxuICAgICAgb25DbGljayhjbG9zZSk7XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgdXRpbHMuaWZFeGlzdHMobm90aWZFbG0ucXVlcnlTZWxlY3RvcihcIi5jbG9zZVwiKSwgKGVsbSkgPT4ge1xyXG4gICAgZWxtLm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgIGNsb3NlKFwidXNlclwiKTtcclxuICAgIH07XHJcbiAgfSk7XHJcblxyXG4gIGNvbnRhaW5lci5wcmVwZW5kKG5vdGlmRWxtKTtcclxuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xyXG4gICAgbm90aWZFbG0uY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcclxuICAgIG5vdGlmRWxtLnF1ZXJ5U2VsZWN0b3IoXCIucHJvZ3Jlc3NcIikuY2xhc3NMaXN0LmFkZChcInByb2dyZXNzaW5nXCIpO1xyXG4gIH0pO1xyXG5cclxuICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgIGNsb3NlKFwidGltZW91dFwiKTtcclxuICB9LCB0aW1lb3V0KTtcclxuXHJcbiAgcmV0dXJuICgpID0+IHtcclxuICAgIGNsb3NlKFwiZm9yY2VcIik7XHJcbiAgfTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIHNob3c6IE9iamVjdC5hc3NpZ24oc2hvdywge1xyXG4gICAgaW5mbzogKGh0bWwsIG9iaiA9IHt9KSA9PiBzaG93KGh0bWwsIHsgLi4ub2JqLCBzdHlsZTogXCJpbmZvXCIgfSksXHJcbiAgICBlcnJvcjogKGh0bWwsIG9iaiA9IHt9KSA9PiBzaG93KGh0bWwsIHsgLi4ub2JqLCBzdHlsZTogXCJlcnJvclwiIH0pLFxyXG4gICAgd2FybmluZzogKGh0bWwsIG9iaiA9IHt9KSA9PiBzaG93KGh0bWwsIHsgLi4ub2JqLCBzdHlsZTogXCJ3YXJuaW5nXCIgfSksXHJcbiAgICBzdWNjZXNzOiAoaHRtbCwgb2JqID0ge30pID0+IHNob3coaHRtbCwgeyAuLi5vYmosIHN0eWxlOiBcInN1Y2Nlc3NcIiB9KSxcclxuICB9KSxcclxufTsiLCAiaW1wb3J0IHdlYnBhY2sgZnJvbSBcIi4uL21vZHVsZXMvd2VicGFjay5qc1wiO1xyXG5pbXBvcnQgcGF0Y2hlciBmcm9tIFwiLi4vcGF0Y2hlci9pbmRleC5qc1wiO1xyXG5pbXBvcnQgbG9nZ2VyIGZyb20gXCIuLi91dGlscy9sb2dnZXIuanNcIjtcclxuXHJcbmltcG9ydCBjb21tb24gZnJvbSBcIi4uL21vZHVsZXMvY29tbW9uLmpzXCI7XHJcbmltcG9ydCB7IGZpbmRlck1hcCB9IGZyb20gXCIuLi9tb2R1bGVzL3Jhdy9jb21wbGV4LWZpbmRlci5qc1wiO1xyXG5jb25zdCB7IFJlYWN0IH0gPSBjb21tb247XHJcblxyXG5sZXQgaXNSZWFkeSA9IGZhbHNlO1xyXG5cclxuY29uc3QgQ29tcG9uZW50cyA9ICgoKSA9PiB7XHJcbiAgY29uc3Qgb3V0ID0ge307XHJcbiAgY29uc3QgY29tcG9uZW50TWFwID0ge1xyXG4gICAgc2VwYXJhdG9yOiBcIlNlcGFyYXRvclwiLFxyXG4gICAgY2hlY2tib3g6IFwiQ2hlY2tib3hJdGVtXCIsXHJcbiAgICByYWRpbzogXCJSYWRpb0l0ZW1cIixcclxuICAgIGNvbnRyb2w6IFwiQ29udHJvbEl0ZW1cIixcclxuICAgIGdyb3Vwc3RhcnQ6IFwiR3JvdXBcIixcclxuICAgIGN1c3RvbWl0ZW06IFwiSXRlbVwiXHJcbiAgfTtcclxuXHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IG1vZHVsZUlkID0gT2JqZWN0LmVudHJpZXMod2VicGFjay5yZXF1aXJlLm0pLmZpbmQoKFssIG1dKSA9PiBtPy50b1N0cmluZygpLmluY2x1ZGVzKFwibWVudWl0ZW1jaGVja2JveFwiKSlbMF07XHJcbiAgICBjb25zdCBjb250ZXh0TWVudU1vZHVsZSA9IHdlYnBhY2suZmluZCgoXywgaWR4KSA9PiBpZHggPT0gbW9kdWxlSWQpLmV4cG9ydHM7XHJcbiAgICBjb25zdCByYXdNYXRjaGVzID0gd2VicGFjay5yZXF1aXJlLm1bbW9kdWxlSWRdLnRvU3RyaW5nKCkubWF0Y2hBbGwoL2lmXFwoXFx3K1xcLnR5cGU9PT1cXHcrXFwuKFxcdyspXFwpLis/dHlwZTpcIiguKz8pXCIvZyk7XHJcblxyXG4gICAgb3V0Lk1lbnUgPSBPYmplY3QudmFsdWVzKGNvbnRleHRNZW51TW9kdWxlKS5maW5kKHYgPT4gdi50b1N0cmluZygpLmluY2x1ZGVzKFwiLmlzVXNpbmdLZXlib2FyZE5hdmlnYXRpb25cIikpO1xyXG5cclxuICAgIFsuLi5yYXdNYXRjaGVzXS5mb3JFYWNoKChbLCBpZCwgdHlwZV0pID0+IHtcclxuICAgICAgb3V0W2NvbXBvbmVudE1hcFt0eXBlXV0gPSBjb250ZXh0TWVudU1vZHVsZVtpZF07XHJcbiAgICB9KTtcclxuXHJcbiAgICBpc1JlYWR5ID0gT2JqZWN0LnZhbHVlcyhjb21wb25lbnRNYXApLmV2ZXJ5KGsgPT4gb3V0W2tdKSAmJiAhIW91dC5NZW51O1xyXG4gIH0gY2F0Y2ggKGVycikge1xyXG4gICAgaXNSZWFkeSA9IGZhbHNlO1xyXG4gICAgbG9nZ2VyLmVycm9yKFwiRmFpbGVkIHRvIGxvYWQgY29udGV4dCBtZW51IGNvbXBvbmVudHNcIiwgZXJyKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBvdXQ7XHJcbn0pKCk7XHJcblxyXG5jb25zdCBBY3Rpb25zID0gKCgpID0+IHtcclxuICBsZXQgb2dNb2R1bGUgPSB3ZWJwYWNrLmZpbHRlcihtID0+IE9iamVjdC52YWx1ZXMobSkuc29tZSh2ID0+IHR5cGVvZiB2ID09PSBcImZ1bmN0aW9uXCIgJiYgdi50b1N0cmluZygpLmluY2x1ZGVzKFwiQ09OVEVYVF9NRU5VX0NMT1NFXCIpKSkuZmluZChtID0+IG0uZXhwb3J0cyAhPT0gd2luZG93KS5leHBvcnRzXHJcbiAgY29uc3Qgb3V0ID0gZmluZGVyTWFwKG9nTW9kdWxlLCB7XHJcbiAgICBjbG9zZTogW1wiQ09OVEVYVF9NRU5VX0NMT1NFXCJdLFxyXG4gICAgb3BlbjogW1wicmVuZGVyTGF6eVwiXVxyXG4gIH0pO1xyXG4gIGlzUmVhZHkgPSBpc1JlYWR5ICYmICEhb3V0LmNsb3NlICYmICEhb3V0Lm9wZW47XHJcbiAgcmV0dXJuIG91dDtcclxufSkoKTtcclxuXHJcblxyXG5jbGFzcyBNZW51UGF0Y2hlciB7XHJcbiAgc3RhdGljIE1BWF9QQVRDSF9JVEVSQVRJT05TID0gMTY7XHJcbiAgc3RhdGljIHBhdGNoZXMgPSBuZXcgTWFwKCk7XHJcbiAgc3RhdGljIHN1YlBhdGNoZXMgPSBuZXcgV2Vha01hcCgpO1xyXG5cclxuICBzdGF0aWMgaW5pdGlhbGl6ZSgpIHtcclxuICAgIGlmICghaXNSZWFkeSkgcmV0dXJuIGxvZ2dlci53YXJuKFwiVW5hYmxlIHRvIGxvYWQgY29udGV4dCBtZW51LlwiKTtcclxuXHJcbiAgICBjb25zdCBtb2R1bGVUb1BhdGNoID0gd2VicGFjay5maWx0ZXIobSA9PiBPYmplY3QudmFsdWVzKG0pLnNvbWUodiA9PiB0eXBlb2YgdiA9PT0gXCJmdW5jdGlvblwiICYmIHYudG9TdHJpbmcoKS5pbmNsdWRlcyhcIkNPTlRFWFRfTUVOVV9DTE9TRVwiKSkpLmZpbmQobSA9PiBtLmV4cG9ydHMgIT09IHdpbmRvdykuZXhwb3J0cztcclxuICAgIGNvbnN0IGtleVRvUGF0Y2ggPSBPYmplY3Qua2V5cyhtb2R1bGVUb1BhdGNoKS5maW5kKGsgPT4gbW9kdWxlVG9QYXRjaFtrXT8ubGVuZ3RoID09PSAzKTtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhtb2R1bGVUb1BhdGNoLCBrZXlUb1BhdGNoKTtcclxuXHJcbiAgICBwYXRjaGVyLmJlZm9yZShcclxuICAgICAga2V5VG9QYXRjaCxcclxuICAgICAgbW9kdWxlVG9QYXRjaCxcclxuICAgICAgZnVuY3Rpb24gKG1ldGhvZEFyZ3MpIHtcclxuICAgICAgICBjb25zdCBwcm9taXNlID0gbWV0aG9kQXJnc1sxXTtcclxuICAgICAgICBtZXRob2RBcmdzWzFdID0gYXN5bmMgZnVuY3Rpb24gKC4uLmFyZ3MpIHtcclxuICAgICAgICAgIGNvbnN0IHJlbmRlciA9IGF3YWl0IHByb21pc2UuY2FsbCh0aGlzLCAuLi5hcmdzKTtcclxuXHJcbiAgICAgICAgICByZXR1cm4gKHByb3BzKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlcyA9IHJlbmRlcihwcm9wcyk7XHJcblxyXG4gICAgICAgICAgICBpZiAocmVzPy5wcm9wcy5uYXZJZCkge1xyXG4gICAgICAgICAgICAgIE1lbnVQYXRjaGVyLmV4ZWN1dGVQYXRjaGVzKHJlcy5wcm9wcy5uYXZJZCwgcmVzLCBwcm9wcyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHJlcz8udHlwZSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgICAgICAgTWVudVBhdGNoZXIucGF0Y2hSZWN1cnNpdmUocmVzLCBcInR5cGVcIik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZXM7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbWV0aG9kQXJncztcclxuICAgICAgfVxyXG4gICAgKVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIHBhdGNoUmVjdXJzaXZlKHRhcmdldCwgbWV0aG9kLCBpdGVyYXRpb24gPSAwKSB7XHJcbiAgICBpZiAoaXRlcmF0aW9uID49IHRoaXMuTUFYX1BBVENIX0lURVJBVElPTlMpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBwcm94eUZ1bmN0aW9uID0gdGhpcy5zdWJQYXRjaGVzLmdldCh0YXJnZXRbbWV0aG9kXSkgPz8gKCgpID0+IHtcclxuICAgICAgY29uc3Qgb3JpZ2luYWxGdW5jdGlvbiA9IHRhcmdldFttZXRob2RdO1xyXG4gICAgICBjb25zdCBkZXB0aCA9ICsraXRlcmF0aW9uO1xyXG4gICAgICBmdW5jdGlvbiBwYXRjaCguLi5hcmdzKSB7XHJcbiAgICAgICAgY29uc3QgcmVzID0gb3JpZ2luYWxGdW5jdGlvbi5jYWxsKHRoaXMsIC4uLmFyZ3MpO1xyXG5cclxuICAgICAgICBpZiAoIXJlcykgcmV0dXJuIHJlcztcclxuXHJcbiAgICAgICAgY29uc3QgbmF2SWQgPSByZXMucHJvcHM/Lm5hdklkID8/IHJlcy5wcm9wcz8uY2hpbGRyZW4/LnByb3BzPy5uYXZJZDtcclxuICAgICAgICBpZiAobmF2SWQpIHtcclxuICAgICAgICAgIE1lbnVQYXRjaGVyLmV4ZWN1dGVQYXRjaGVzKG5hdklkLCByZXMsIGFyZ3NbMF0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb25zdCBsYXllciA9IHJlcy5wcm9wcy5jaGlsZHJlbiA/IHJlcy5wcm9wcy5jaGlsZHJlbiA6IHJlcztcclxuXHJcbiAgICAgICAgICBpZiAodHlwZW9mIGxheWVyPy50eXBlID09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgICAgICBNZW51UGF0Y2hlci5wYXRjaFJlY3Vyc2l2ZShsYXllciwgXCJ0eXBlXCIsIGRlcHRoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiByZXM7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHBhdGNoLl9fb3JpZ2luYWxfXyA9IG9yaWdpbmFsRnVuY3Rpb247XHJcbiAgICAgIE9iamVjdC5hc3NpZ24ocGF0Y2gsIG9yaWdpbmFsRnVuY3Rpb24pO1xyXG4gICAgICB0aGlzLnN1YlBhdGNoZXMuc2V0KG9yaWdpbmFsRnVuY3Rpb24sIHBhdGNoKTtcclxuXHJcbiAgICAgIHJldHVybiBwYXRjaDtcclxuICAgIH0pKCk7XHJcblxyXG4gICAgdGFyZ2V0W21ldGhvZF0gPSBwcm94eUZ1bmN0aW9uO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGV4ZWN1dGVQYXRjaGVzKGlkLCByZXMsIHByb3BzKSB7XHJcbiAgICBpZiAoIXRoaXMucGF0Y2hlcy5oYXMoaWQpKSByZXR1cm47XHJcblxyXG4gICAgdGhpcy5wYXRjaGVzLmdldChpZCkuZm9yRWFjaChwYXRjaCA9PiB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgcGF0Y2gocmVzLCBwcm9wcyk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGxvZ2dlci5lcnJvcihcIkZhaWxlZCB0byBwYXRjaCBjb250ZXh0IG1lbnVcIiwgcGF0Y2gsIGVycik7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG5cclxuTWVudVBhdGNoZXIuaW5pdGlhbGl6ZSgpO1xyXG5cclxuXHJcbi8vIENvcGllZCBmcm9tIGJkJ3Mgc291cmNlXHJcbmZ1bmN0aW9uIGJ1aWxkSXRlbShwcm9wcykge1xyXG4gIGNvbnN0IHsgdHlwZSB9ID0gcHJvcHM7XHJcbiAgaWYgKHR5cGUgPT09IFwic2VwYXJhdG9yXCIpIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KENvbXBvbmVudHMuU2VwYXJhdG9yKTtcclxuXHJcbiAgbGV0IGNvbXBvbmVudCA9IENvbXBvbmVudHMuSXRlbTtcclxuICBpZiAodHlwZSA9PT0gXCJzdWJtZW51XCIpIHtcclxuICAgIGlmICghcHJvcHMuY2hpbGRyZW4pIHByb3BzLmNoaWxkcmVuID0gYnVpbGRNZW51Q2hpbGRyZW4ocHJvcHMucmVuZGVyIHx8IHByb3BzLml0ZW1zKTtcclxuICB9IGVsc2UgaWYgKHR5cGUgPT09IFwidG9nZ2xlXCIgfHwgdHlwZSA9PT0gXCJyYWRpb1wiKSB7XHJcbiAgICBjb21wb25lbnQgPSB0eXBlID09PSBcInRvZ2dsZVwiID8gQ29tcG9uZW50cy5DaGVja2JveEl0ZW0gOiBDb21wb25lbnRzLlJhZGlvSXRlbTtcclxuICAgIGlmIChwcm9wcy5hY3RpdmUpIHByb3BzLmNoZWNrZWQgPSBwcm9wcy5hY3RpdmU7XHJcbiAgfSBlbHNlIGlmICh0eXBlID09PSBcImNvbnRyb2xcIikge1xyXG4gICAgY29tcG9uZW50ID0gQ29tcG9uZW50cy5Db250cm9sSXRlbTtcclxuICB9XHJcbiAgaWYgKCFwcm9wcy5pZCkgcHJvcHMuaWQgPSBgJHtwcm9wcy5sYWJlbC5yZXBsYWNlKC9eW15hLXpdK3xbXlxcdy1dKy9naSwgXCItXCIpfWA7XHJcbiAgaWYgKHByb3BzLmRhbmdlcikgcHJvcHMuY29sb3IgPSBcImNvbG9yRGFuZ2VyXCI7XHJcbiAgcHJvcHMuZXh0ZW5kZWQgPSB0cnVlO1xyXG5cclxuICBpZiAodHlwZSA9PT0gXCJ0b2dnbGVcIikge1xyXG4gICAgY29uc3QgW2FjdGl2ZSwgZG9Ub2dnbGVdID0gUmVhY3QudXNlU3RhdGUocHJvcHMuY2hlY2tlZCB8fCBmYWxzZSk7XHJcbiAgICBjb25zdCBvcmlnaW5hbEFjdGlvbiA9IHByb3BzLmFjdGlvbjtcclxuICAgIHByb3BzLmNoZWNrZWQgPSBhY3RpdmU7XHJcbiAgICBwcm9wcy5hY3Rpb24gPSBmdW5jdGlvbiAoZXYpIHtcclxuICAgICAgb3JpZ2luYWxBY3Rpb24oZXYpO1xyXG4gICAgICBkb1RvZ2dsZSghYWN0aXZlKTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChjb21wb25lbnQsIHByb3BzKTtcclxufVxyXG5cclxuLy8gQ29waWVkIGZyb20gYmQncyBzb3VyY2VcclxuZnVuY3Rpb24gYnVpbGRNZW51Q2hpbGRyZW4oc2V0dXApIHtcclxuICBjb25zdCBtYXBwZXIgPSBzID0+IHtcclxuICAgIGlmIChzLnR5cGUgPT09IFwiZ3JvdXBcIikgcmV0dXJuIGJ1aWxkR3JvdXAocyk7XHJcbiAgICByZXR1cm4gYnVpbGRJdGVtKHMpO1xyXG4gIH07XHJcbiAgY29uc3QgYnVpbGRHcm91cCA9IGZ1bmN0aW9uIChncm91cCkge1xyXG4gICAgY29uc3QgaXRlbXMgPSBncm91cC5pdGVtcy5tYXAobWFwcGVyKS5maWx0ZXIoaSA9PiBpKTtcclxuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KE1lbnVDb21wb25lbnRzLkdyb3VwLCBudWxsLCBpdGVtcyk7XHJcbiAgfTtcclxuICByZXR1cm4gc2V0dXAubWFwKG1hcHBlcikuZmlsdGVyKGkgPT4gaSk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBfX2NhY2hlX186IHtcclxuICAgIHBhdGNoZXM6IE1lbnVQYXRjaGVyLnBhdGNoZXMsXHJcbiAgICBzdWJQYXRjaGVzOiBNZW51UGF0Y2hlci5zdWJQYXRjaGVzXHJcbiAgfSxcclxuICBwYXRjaChuYXZJZCwgY2IpIHtcclxuICAgIGlmICghTWVudVBhdGNoZXIucGF0Y2hlcy5oYXMobmF2SWQpKSBNZW51UGF0Y2hlci5wYXRjaGVzLnNldChuYXZJZCwgbmV3IFNldCgpKTtcclxuICAgIE1lbnVQYXRjaGVyLnBhdGNoZXMuZ2V0KG5hdklkKS5hZGQoY2IpO1xyXG5cclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIE1lbnVQYXRjaGVyLnBhdGNoZXMuZ2V0KG5hdklkKS5kZWxldGUoY2IpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgb3BlbihldmVudCwgY29tcG9uZW50LCBjb25maWcpIHtcclxuICAgIHJldHVybiBBY3Rpb25zLm9wZW4oZXZlbnQsIChlKSA9PiBSZWFjdC5jcmVhdGVFbGVtZW50KGNvbXBvbmVudCwgT2JqZWN0LmFzc2lnbih7fSwgZSwgeyBvbkNsb3NlOiBBY3Rpb25zLmNsb3NlIH0pKSwgY29uZmlnKTtcclxuICB9LFxyXG4gIGNsb3NlKCkge1xyXG4gICAgcmV0dXJuIEFjdGlvbnMuY2xvc2UoKTtcclxuICB9LFxyXG4gIGJ1aWxkOiB7XHJcbiAgICBpdGVtKHNldHVwKSB7XHJcbiAgICAgIHJldHVybiBidWlsZE1lbnVDaGlsZHJlbihzZXR1cCk7XHJcbiAgICB9LFxyXG4gICAgbWVudShzZXR1cCkge1xyXG4gICAgICByZXR1cm4gKHByb3BzKSA9PiBSZWFjdC5jcmVhdGVFbGVtZW50KE1lbnVDb21wb25lbnRzLk1lbnUsIHByb3BzLCB0aGlzLmJ1aWxkTWVudUNoaWxkcmVuKHNldHVwKSk7XHJcbiAgICB9XHJcbiAgfVxyXG59OyIsICJpbXBvcnQgY29tbW9uIGZyb20gXCIuLi8uLi9hcGkvbW9kdWxlcy9jb21tb25cIjtcclxuaW1wb3J0IGxvZ2dlciBmcm9tIFwiLi4vLi4vYXBpL3V0aWxzL2xvZ2dlci5qc1wiO1xyXG5jb25zdCB7IFJlYWN0IH0gPSBjb21tb247XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFcnJvckJvdW5kYXJ5IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgc3VwZXIocHJvcHMpO1xyXG4gICAgdGhpcy5zdGF0ZSA9IHsgZXJyb3I6IG51bGwgfTtcclxuICB9XHJcblxyXG4gIGNvbXBvbmVudERpZENhdGNoKGVycm9yKSB7XHJcbiAgICB0aGlzLnNldFN0YXRlKHsgZXJyb3IgfSk7XHJcbiAgICBsb2dnZXIuZXJyb3IoZXJyb3IpO1xyXG4gICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLm9uRXJyb3IgPT09IFwiZnVuY3Rpb25cIikgdGhpcy5wcm9wcy5vbkVycm9yKGVycm9yKTtcclxuICB9XHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIGlmICh0aGlzLnN0YXRlLmVycm9yKSByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJhY29yZC0tcmVhY3QtZXJyb3JcIj5cclxuICAgICAgPHA+VW5leHBlY3RlZCBSZWFjdCBFcnJvciBIYXBwZW5lZC48L3A+XHJcbiAgICAgIDxwPntgJHt0aGlzLnN0YXRlLmVycm9yfWB9PC9wPlxyXG4gICAgPC9kaXY+O1xyXG4gICAgcmV0dXJuIHRoaXMucHJvcHMuY2hpbGRyZW47XHJcbiAgfVxyXG59XHJcblxyXG5jb25zdCBvcmlnaW5hbFJlbmRlciA9IEVycm9yQm91bmRhcnkucHJvdG90eXBlLnJlbmRlcjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KEVycm9yQm91bmRhcnkucHJvdG90eXBlLCBcInJlbmRlclwiLCB7XHJcbiAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgY29uZmlndXJhYmxlOiBmYWxzZSxcclxuICBzZXQ6IGZ1bmN0aW9uICgpIHsgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IHNldCByZW5kZXIgbWV0aG9kIG9mIEVycm9yQm91bmRhcnlcIik7IH0sXHJcbiAgZ2V0OiAoKSA9PiBvcmlnaW5hbFJlbmRlclxyXG59KTsiLCAiaW1wb3J0IEVycm9yQm91bmRhcnkgZnJvbSBcIi4uLy4uL2xpYi9jb21wb25lbnRzL0Vycm9yQm91bmRhcnkuanN4XCI7XHJcbmltcG9ydCBjb21tb24gZnJvbSBcIi4uL21vZHVsZXMvY29tbW9uLmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgRXJyb3JCb3VuZGFyeSxcclxuICBCdXR0b246IGNvbW1vbi5jb21wb25lbnRzLkJ1dHRvbixcclxuICBNYXJrZG93bjogY29tbW9uLmNvbXBvbmVudHMuTWFya2Rvd24sXHJcbiAgVGV4dDogY29tbW9uLmNvbXBvbmVudHMuVGV4dCxcclxuICBDb25maXJtYXRpb25Nb2RhbDogY29tbW9uLmNvbXBvbmVudHMuQ29uZmlybWF0aW9uTW9kYWwsXHJcbiAgTW9kYWxSb290OiBjb21tb24ubW9kYWxzLmNvbXBvbmVudHMuUm9vdCxcclxuICBNb2RhbENsb3NlQnV0dG9uOiBjb21tb24ubW9kYWxzLmNvbXBvbmVudHMub3RoZXIuQ2xvc2VCdXR0b24sXHJcbiAgTW9kYWxIZWFkZXI6IGNvbW1vbi5tb2RhbHMuY29tcG9uZW50cy5vdGhlci5IZWFkZXIsXHJcbiAgTW9kYWxDb250ZW50OiBjb21tb24ubW9kYWxzLmNvbXBvbmVudHMub3RoZXIuQ29udGVudCxcclxuICBNb2RhbEZvb3RlcjogY29tbW9uLm1vZGFscy5jb21wb25lbnRzLm90aGVyLkZvb3RlcixcclxuICBNb2RhbExpc3RDb250ZW50OiBjb21tb24ubW9kYWxzLmNvbXBvbmVudHMub3RoZXIuTGlzdENvbnRlbnQsXHJcbn0iLCAiaW1wb3J0IEVycm9yQm91bmRhcnkgZnJvbSBcIi4uLy4uL2xpYi9jb21wb25lbnRzL0Vycm9yQm91bmRhcnkuanN4XCI7XHJcbmltcG9ydCBjb21tb24gZnJvbSBcIi4uL21vZHVsZXMvY29tbW9uLmpzXCI7XHJcbmltcG9ydCBpMThuIGZyb20gXCIuLi9pMThuL2luZGV4LmpzXCJcclxuY29uc3QgeyBSZWFjdCwgRmx1eERpc3BhdGNoZXIsIGNvbXBvbmVudHMsIG1vZGFscywgVXNlclN0b3JlIH0gPSBjb21tb247XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgc2hvdzoge1xyXG4gICAgY29uZmlybWF0aW9uKHRpdGxlLCBjb250ZW50LCB7IGNvbmZpcm0gPSBudWxsLCBjYW5jZWwgPSBudWxsLCBkYW5nZXIgPSBmYWxzZSwga2V5ID0gdW5kZWZpbmVkLCB0aW1lb3V0ID0gNjAwMDAgKiA2MCB9ID0ge30pIHtcclxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGNvbnRlbnQpKSBjb250ZW50ID0gW2NvbnRlbnRdO1xyXG4gICAgICAgIGNvbnRlbnQgPSBjb250ZW50Lm1hcChpID0+IHR5cGVvZiBpID09PSBcInN0cmluZ1wiID8gUmVhY3QuY3JlYXRlRWxlbWVudChjb21wb25lbnRzLk1hcmtkb3duLCBudWxsLCBpKSA6IGkpO1xyXG4gICAgICAgIGNvbnN0IG1vZGFsS2V5ID0gbW9kYWxzLmFjdGlvbnMub3BlbigocHJvcHMpID0+IHtcclxuICAgICAgICAgIGxldCBpbnRlcmFjdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICByZXR1cm4gPEVycm9yQm91bmRhcnkgb25FcnJvcj17KCkgPT4geyByZXNvbHZlKGZhbHNlKTsgfX0+XHJcbiAgICAgICAgICAgIDxjb21wb25lbnRzLkNvbmZpcm1hdGlvbk1vZGFsXHJcbiAgICAgICAgICAgICAgaGVhZGVyPXt0aXRsZX1cclxuICAgICAgICAgICAgICBjb25maXJtQnV0dG9uQ29sb3I9e2RhbmdlciA/IGNvbXBvbmVudHMuQnV0dG9uLkNvbG9ycy5SRUQgOiBjb21wb25lbnRzLkJ1dHRvbi5Db2xvcnMuQlJBTkR9XHJcbiAgICAgICAgICAgICAgY29uZmlybVRleHQ9e2NvbmZpcm0gfHwgaTE4bi5mb3JtYXQoXCJDT05GSVJNXCIpfVxyXG4gICAgICAgICAgICAgIGNhbmNlbFRleHQ9e2NhbmNlbH1cclxuICAgICAgICAgICAgICBvbkNhbmNlbD17KCkgPT4geyByZXNvbHZlKGZhbHNlKTsgbW9kYWxzLmFjdGlvbnMuY2xvc2UobW9kYWxLZXkpOyBpbnRlcmFjdGVkID0gdHJ1ZTsgfX1cclxuICAgICAgICAgICAgICBvbkNvbmZpcm09eygpID0+IHsgcmVzb2x2ZSh0cnVlKTsgbW9kYWxzLmFjdGlvbnMuY2xvc2UobW9kYWxLZXkpOyBpbnRlcmFjdGVkID0gdHJ1ZTsgfX1cclxuICAgICAgICAgICAgICB7Li4ucHJvcHN9XHJcbiAgICAgICAgICAgICAgb25DbG9zZT17KCkgPT4geyBwcm9wcy5vbkNsb3NlKCk7IHJlc29sdmUoZmFsc2UpOyBtb2RhbHMuYWN0aW9ucy5jbG9zZShtb2RhbEtleSk7IH19XHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICA8RXJyb3JCb3VuZGFyeSBvbkVycm9yPXsoKSA9PiB7IHJlc29sdmUoZmFsc2UpOyB9fT5cclxuICAgICAgICAgICAgICAgIHtjb250ZW50fVxyXG4gICAgICAgICAgICAgIDwvRXJyb3JCb3VuZGFyeT5cclxuICAgICAgICAgICAgPC9jb21wb25lbnRzLkNvbmZpcm1hdGlvbk1vZGFsPlxyXG4gICAgICAgICAgPC9FcnJvckJvdW5kYXJ5PlxyXG4gICAgICAgIH0sIHsgbW9kYWxLZXk6IGtleSB9KTtcclxuICAgICAgICBpZiAodGltZW91dCkge1xyXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghaW50ZXJhY3RlZCkge1xyXG4gICAgICAgICAgICAgIHJlc29sdmUoZmFsc2UpO1xyXG4gICAgICAgICAgICAgIG1vZGFscy5hY3Rpb25zLmNsb3NlKG1vZGFsS2V5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSwgdGltZW91dCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBjbG9zZShrZXkpIHtcclxuICAgICAgcmV0dXJuIG1vZGFscy5hY3Rpb25zLmNsb3NlKGtleSk7XHJcbiAgICB9LFxyXG4gICAgdXNlcih1c2VySWQpIHtcclxuICAgICAgaWYgKCFVc2VyU3RvcmUuZ2V0VXNlcih1c2VySWQpKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIEZsdXhEaXNwYXRjaGVyLmRpc3BhdGNoKHsgdHlwZTogXCJVU0VSX1BST0ZJTEVfTU9EQUxfT1BFTlwiLCB1c2VySWQgfSk7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSxcclxuICAgIGFsZXJ0KHRpdGxlLCBjb250ZW50LCB7IGNvbmZpcm0gPSBudWxsLCBrZXkgPSB1bmRlZmluZWQsIHRpbWVvdXQgPSA2MDAwMCAqIDYwIH0gPSB7fSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5jb25maXJtYXRpb24odGl0bGUsIGNvbnRlbnQsIHsgY29uZmlybSwgY2FuY2VsOiBudWxsLCBrZXksIHRpbWVvdXQgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG59IiwgImltcG9ydCBwYXRjaGVyIGZyb20gXCIuLi9wYXRjaGVyL2luZGV4LmpzXCI7XHJcbmltcG9ydCBzdHlsZUNTU1RleHQgZnJvbSBcIi4vc3R5bGVzLnNjc3NcIjtcclxucGF0Y2hlci5pbmplY3RDU1Moc3R5bGVDU1NUZXh0KTtcclxuXHJcbmltcG9ydCB0b29sdGlwcyBmcm9tIFwiLi90b29sdGlwcy5qc1wiO1xyXG5pbXBvcnQgbm90aWZpY2F0aW9ucyBmcm9tIFwiLi9ub3RpZmljYXRpb25zLmpzXCI7XHJcbmltcG9ydCBjb250ZXh0TWVudXMgZnJvbSBcIi4vY29udGV4dE1lbnVzLmpzXCI7XHJcbmltcG9ydCBjb21wb25lbnRzIGZyb20gXCIuL2NvbXBvbmVudHMuanNcIjtcclxuaW1wb3J0IG1vZGFscyBmcm9tIFwiLi9tb2RhbHMuanN4XCI7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIHRvb2x0aXBzLFxyXG4gIG5vdGlmaWNhdGlvbnMsXHJcbiAgY29udGV4dE1lbnVzLFxyXG4gIGNvbXBvbmVudHMsXHJcbiAgbW9kYWxzXHJcbn0iLCAiaW1wb3J0IG1vZHVsZXMgZnJvbSAnLi9tb2R1bGVzJztcclxuaW1wb3J0IGRldiBmcm9tICcuL2Rldic7XHJcbmltcG9ydCB1dGlscyBmcm9tICcuL3V0aWxzJztcclxuaW1wb3J0IGV4dGVuc2lvbnMgZnJvbSAnLi9leHRlbnNpb25zJztcclxuaW1wb3J0IGkxOG4gZnJvbSAnLi9pMThuJztcclxuaW1wb3J0IHN0b3JhZ2UgZnJvbSAnLi9zdG9yYWdlJztcclxuaW1wb3J0IGV2ZW50cyBmcm9tICcuL2V2ZW50cyc7XHJcbmltcG9ydCBwYXRjaGVyIGZyb20gJy4vcGF0Y2hlcic7XHJcbmltcG9ydCBpbnRlcm5hbCBmcm9tICcuL2ludGVybmFsJztcclxuaW1wb3J0IHVpIGZyb20gJy4vdWkvaW5kZXguanMnO1xyXG5cclxudXRpbHMubG9nZ2VyLmRlYnVnKGBQUkVMT0FEX0tFWTogPFBSRUxPQURfS0VZPmApO1xyXG5cclxuZnVuY3Rpb24gZGV2RXJyb3IoYXBpKSB7XHJcbiAgcmV0dXJuIG5ldyBFcnJvcihgVGhlICR7YXBpfSBBUEkgY2FuIG9ubHkgYmUgYWNjZXNzZWQgd2hlbiBEZXYgbW9kZSBpcyBlbmFibGVkIWApO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgZXhwb3NlZEFQSToge1xyXG4gICAgZGV2LFxyXG4gICAgdXRpbHMsXHJcbiAgICBpMThuLFxyXG4gICAgZXZlbnRzLFxyXG4gICAgdWksXHJcbiAgICBnZXQgcGF0Y2hlcigpIHtcclxuICAgICAgaWYgKCFkZXYuZW5hYmxlZCkgdGhyb3cgZGV2RXJyb3IoXCJQYXRjaGVyXCIpO1xyXG4gICAgICByZXR1cm4gcGF0Y2hlcjtcclxuICAgIH0sXHJcbiAgICBnZXQgc3RvcmFnZSgpIHtcclxuICAgICAgaWYgKCFkZXYuZW5hYmxlZCkgdGhyb3cgZGV2RXJyb3IoXCJTdG9yYWdlXCIpO1xyXG4gICAgICByZXR1cm4gc3RvcmFnZTtcclxuICAgIH0sXHJcbiAgICBnZXQgbW9kdWxlcygpIHtcclxuICAgICAgaWYgKCFkZXYuZW5hYmxlZCkgdGhyb3cgZGV2RXJyb3IoXCJNb2R1bGVzXCIpO1xyXG4gICAgICByZXR1cm4gbW9kdWxlcztcclxuICAgIH0sXHJcbiAgICBnZXQgZXh0ZW5zaW9ucygpIHtcclxuICAgICAgaWYgKCFkZXYuZW5hYmxlZCkgdGhyb3cgZGV2RXJyb3IoXCJFeHRlbnNpb25zXCIpO1xyXG4gICAgICByZXR1cm4gZXh0ZW5zaW9ucztcclxuICAgIH0sXHJcbiAgICBnZXQgaW50ZXJuYWwoKSB7XHJcbiAgICAgIGlmICghZGV2LmVuYWJsZWQpIHRocm93IGRldkVycm9yKFwiSW50ZXJuYWxcIik7XHJcbiAgICAgIHJldHVybiBpbnRlcm5hbDtcclxuICAgIH1cclxuICB9LFxyXG4gIHVuZXhwb3NlZEFQSToge1xyXG4gICAgZGV2LFxyXG4gICAgbW9kdWxlcyxcclxuICAgIHV0aWxzLFxyXG4gICAgZXh0ZW5zaW9ucyxcclxuICAgIGkxOG4sXHJcbiAgICBzdG9yYWdlLFxyXG4gICAgZXZlbnRzLFxyXG4gICAgcGF0Y2hlcixcclxuICAgIGludGVybmFsLFxyXG4gICAgdWlcclxuICB9XHJcbn0iLCAiaW1wb3J0IHsgd2FpdFVudGlsQ29ubmVjdGlvbk9wZW4gfSBmcm9tIFwiLi9vdGhlci91dGlscy5qc1wiO1xyXG5pbXBvcnQgbG9hZGluZ0FuaW1hdGlvbiBmcm9tIFwiLi9vdGhlci9sb2FkaW5nLWFuaW1hdGlvblwiO1xyXG5pbXBvcnQgYXBpIGZyb20gXCIuL2FwaVwiO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdywgXCJhY29yZFwiLCB7XHJcbiAgZ2V0KCkge1xyXG4gICAgcmV0dXJuIGFwaS5leHBvc2VkQVBJO1xyXG4gIH1cclxufSk7XHJcbndpbmRvdy5nbG9iYWwgPSB3aW5kb3c7XHJcblxyXG4oYXN5bmMgKCkgPT4ge1xyXG4gIGxvYWRpbmdBbmltYXRpb24uc2hvdygpO1xyXG4gIGF3YWl0IHdhaXRVbnRpbENvbm5lY3Rpb25PcGVuKCk7XHJcbiAgbG9hZGluZ0FuaW1hdGlvbi5oaWRlKCk7XHJcbn0pKCk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQ0EsV0FBTyxlQUFlLFNBQVMsY0FBYyxFQUFFLE9BQU8sS0FBSyxDQUFDO0FBQzVELFlBQVEsVUFBVSxPQUFPLE9BQU87QUFBQSxNQUM1QixLQUFLO0FBQUEsTUFDTCxLQUFLO0FBQUEsTUFDTCxRQUFRO0FBQUEsTUFDUixRQUFRO0FBQUEsSUFDWixDQUFDO0FBQUE7QUFBQTs7O0FDUEQ7QUFBQTtBQUFBO0FBQ0EsUUFBSSxrQkFBbUIsV0FBUSxRQUFLLG1CQUFvQixTQUFVLEtBQUs7QUFDbkUsYUFBUSxPQUFPLElBQUksYUFBYyxNQUFNLEVBQUUsV0FBVyxJQUFJO0FBQUEsSUFDNUQ7QUFDQSxXQUFPLGVBQWUsU0FBUyxjQUFjLEVBQUUsT0FBTyxLQUFLLENBQUM7QUFDNUQsUUFBTSxXQUFXLGdCQUFnQixnQkFBbUI7QUFDcEQsUUFBTSxlQUFOLE1BQW1CO0FBQUEsTUFDZixjQUFjO0FBQ1YsYUFBSyxZQUFZLE9BQU8sT0FBTyxTQUFT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VTtBQUFBLFlBQ1YsSUFBTTtBQUFBLFlBQ04sSUFBTTtBQUFBLGNBQ0o7QUFBQSxnQkFDRTtBQUFBLGdCQUNBO0FBQUEsY0FDRjtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsVUFDQSxNQUFRO0FBQUEsWUFDTixPQUFTO0FBQUEsY0FDUDtBQUFBLGNBQ0E7QUFBQSxjQUNBO0FBQUEsY0FDQTtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLFFBQ0EsTUFBUTtBQUFBLFVBQ04sSUFBTTtBQUFBLFVBQ04sUUFBVTtBQUFBLFlBQ1IsUUFBVTtBQUFBLFlBQ1YsSUFBTTtBQUFBLFlBQ04sSUFBTTtBQUFBLGNBQ0o7QUFBQSxnQkFDRTtBQUFBLGNBQ0Y7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFVBQ0EsTUFBUTtBQUFBLFlBQ04sT0FBUztBQUFBLGNBQ1A7QUFBQSxjQUNBO0FBQUEsY0FDQTtBQUFBLGNBQ0E7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsTUFDQSxTQUFXO0FBQUEsUUFDVCxNQUFRO0FBQUEsVUFDTixJQUFNO0FBQUEsVUFDTixRQUFVO0FBQUEsWUFDUixRQUFVO0FBQUEsWUFDVixJQUFNO0FBQUEsWUFDTixJQUFNO0FBQUEsY0FDSjtBQUFBLGdCQUNFO0FBQUEsZ0JBQ0E7QUFBQSxjQUNGO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxVQUNBLE1BQVE7QUFBQSxZQUNOLFFBQVU7QUFBQSxjQUNSO0FBQUEsY0FDQTtBQUFBLGNBQ0E7QUFBQSxjQUNBO0FBQUEsWUFDRjtBQUFBLFlBQ0EsT0FBUztBQUFBLGNBQ1A7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFVBQ0EsS0FBTztBQUFBLFlBQ0wsTUFBUTtBQUFBLGNBQ047QUFBQSxjQUNBO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsUUFDQSxPQUFTO0FBQUEsVUFDUCxJQUFNO0FBQUEsVUFDTixRQUFVO0FBQUEsWUFDUixRQUFVO0FBQUEsWUFDVixJQUFNO0FBQUEsWUFDTixJQUFNO0FBQUEsY0FDSjtBQUFBLGdCQUNFO0FBQUEsY0FDRjtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsVUFDQSxNQUFRO0FBQUEsWUFDTixRQUFVO0FBQUEsY0FDUjtBQUFBLGNBQ0E7QUFBQSxjQUNBO0FBQUEsY0FDQTtBQUFBLFlBQ0Y7QUFBQSxZQUNBLE9BQVM7QUFBQSxjQUNQO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxVQUNBLEtBQU87QUFBQSxZQUNMLE9BQVM7QUFBQSxjQUNQO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLFlBQWM7QUFBQSxNQUNaLFFBQVU7QUFBQSxRQUNSLElBQU07QUFBQSxRQUNOLFFBQVU7QUFBQSxVQUNSLFFBQVU7QUFBQSxVQUNWLElBQU07QUFBQSxVQUNOLElBQU07QUFBQSxZQUNKO0FBQUEsY0FDRTtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLFFBQ0EsTUFBUTtBQUFBLFVBQ04sUUFBVTtBQUFBLFlBQ1I7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxVQUNGO0FBQUEsVUFDQSxPQUFTO0FBQUEsUUFDWDtBQUFBLFFBQ0EsS0FBTztBQUFBLFVBQ0wsUUFBVTtBQUFBLFlBQ1I7QUFBQSxZQUNBO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsTUFDQSxtQkFBcUI7QUFBQSxRQUNuQixJQUFNO0FBQUEsUUFDTixRQUFVO0FBQUEsVUFDUixRQUFVO0FBQUEsVUFDVixJQUFNO0FBQUEsVUFDTixJQUFNO0FBQUEsWUFDSjtBQUFBLGNBQ0U7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxRQUNBLE1BQVE7QUFBQSxVQUNOLFFBQVU7QUFBQSxZQUNSO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsTUFDQSxNQUFRO0FBQUEsUUFDTixJQUFNO0FBQUEsUUFDTixRQUFVO0FBQUEsUUFDVixNQUFRO0FBQUEsVUFDTixRQUFVO0FBQUEsWUFDUjtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLE1BQ0EsVUFBWTtBQUFBLFFBQ1YsSUFBTTtBQUFBLFFBQ04sUUFBVTtBQUFBLFFBQ1YsTUFBUTtBQUFBLFVBQ04sT0FBUztBQUFBLFlBQ1A7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxnQkFBa0I7QUFBQSxNQUNoQixJQUFNO0FBQUEsTUFDTixNQUFRO0FBQUEsUUFDTixPQUFTO0FBQUEsVUFDUDtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsTUFDQSxRQUFVO0FBQUEsUUFDUixRQUFVO0FBQUEsUUFDVixJQUFNO0FBQUEsUUFDTixJQUFNO0FBQUEsVUFDSjtBQUFBLFlBQ0U7QUFBQSxZQUNBO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsT0FBUztBQUFBLE1BQ1AsSUFBTTtBQUFBLE1BQ04sTUFBUTtBQUFBLFFBQ04sT0FBUztBQUFBLFVBQ1A7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLE1BQ0EsUUFBVTtBQUFBLFFBQ1IsUUFBVTtBQUFBLFFBQ1YsSUFBTTtBQUFBLFFBQ04sSUFBTTtBQUFBLFVBQ0o7QUFBQSxZQUNFO0FBQUEsWUFDQTtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLE1BQVE7QUFBQSxNQUNOLElBQU07QUFBQSxNQUNOLE1BQVE7QUFBQSxRQUNOLE9BQVM7QUFBQSxVQUNQO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLFFBQVU7QUFBQSxR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O0FBQUEsSUFDQSxJQUFJLFVBQVU7QUFDWixVQUFJLENBQUMsWUFBSTtBQUFTLGNBQU0sU0FBUyxTQUFTO0FBQzFDLGFBQU87QUFBQSxJQUNUO0FBQUEsSUFDQSxJQUFJLFVBQVU7QUFDWixVQUFJLENBQUMsWUFBSTtBQUFTLGNBQU0sU0FBUyxTQUFTO0FBQzFDLGFBQU87QUFBQSxJQUNUO0FBQUEsSUFDQSxJQUFJLFVBQVU7QUFDWixVQUFJLENBQUMsWUFBSTtBQUFTLGNBQU0sU0FBUyxTQUFTO0FBQzFDLGFBQU87QUFBQSxJQUNUO0FBQUEsSUFDQSxJQUFJLGFBQWE7QUFDZixVQUFJLENBQUMsWUFBSTtBQUFTLGNBQU0sU0FBUyxZQUFZO0FBQzdDLGFBQU87QUFBQSxJQUNUO0FBQUEsSUFDQSxJQUFJLFdBQVc7QUFDYixVQUFJLENBQUMsWUFBSTtBQUFTLGNBQU0sU0FBUyxVQUFVO0FBQzNDLGFBQU87QUFBQSxJQUNUO0FBQUEsRUFDRjtBQUFBLEVBQ0EsY0FBYztBQUFBLElBQ1o7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQ0Y7OztBQ3JEQSxPQUFPLGVBQWUsUUFBUSxTQUFTO0FBQUEsRUFDckMsTUFBTTtBQUNKLFdBQU8sWUFBSTtBQUFBLEVBQ2I7QUFDRixDQUFDO0FBQ0QsT0FBTyxTQUFTO0FBQUEsQ0FFZixZQUFZO0FBQ1gsNEJBQWlCLEtBQUs7QUFDdEIsUUFBTSx3QkFBd0I7QUFDOUIsNEJBQWlCLEtBQUs7QUFDeEIsR0FBRzsiLAogICJuYW1lcyI6IFsiZXZlbnQiLCAibWFrZSIsICJ0YXJnZXQiLCAidHJlZSIsICJzZWFyY2hGaWx0ZXIiLCAid2Fsa2FibGUiLCAiaWdub3JlIiwgImZvdW5kIiwgImNvbXBvbmVudHMiLCAiXyIsICJjaGVjayIsICJtb2R1bGVzIiwgIm1vZHVsZSIsICJyZXF1aXJlIiwgImZvdW5kIiwgImZpbmRlciIsICJmb3VuZCIsICJyZXEiLCAiZmluZGVyIiwgImNvbW1vbl9kZWZhdWx0IiwgImNvbW1vbl9kZWZhdWx0IiwgIl8iLCAiXyIsICJub1N0b3JlIiwgIl8iLCAidmFsIiwgImVycm9yIiwgIm91dCIsICJjaGVjayIsICJfIiwgIkJBU0VfVVJMIiwgIm5lc3RzIiwgIm91dCIsICJfIiwgInNvdXJjZSIsICJhcGkiLCAic2hvdyIsICJjb21tb25fZGVmYXVsdCIsICJvdXQiLCAiXyIsICJSZWFjdCIsICJjb21tb25fZGVmYXVsdCIsICJjb21tb25fZGVmYXVsdCIsICJSZWFjdCIsICJjb21tb25fZGVmYXVsdCIsICJpbnRlcmFjdGVkIiwgImFwaSJdCn0K
