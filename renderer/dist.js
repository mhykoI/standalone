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
    WebSocket: {
      __: true,
      filter: "$?.__proto__?.handleConnection",
      path: {
        before: [
          "exports.Z",
          "exports.ZP",
          "exports.default",
          "exports"
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
        in: "prototypes",
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
        in: "strings",
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
  require: globalThis["<PRELOAD_KEY>"].require,
  native: DiscordNative
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

// src/api/websocket/index.js
var sockets = /* @__PURE__ */ new Set();
var handlers = /* @__PURE__ */ new Map();
waitUntilConnectionOpen().then(() => {
  patcher_default.instead(
    "handleConnection",
    common_default2.WebSocket,
    (args, orig) => {
      const ws = args[0];
      if (ws.upgradeReq().url !== "/acord")
        return orig(...args);
      sockets.add(ws);
      ws.on("message", async (msg) => {
        let json;
        try {
          json = JSON.parse(msg);
          if (!Array.isArray(json) || json.length < 1 || json.length > 3)
            throw "Array expected as message.";
          if (typeof json[0] != "string")
            throw "Array[0] needs to be string.";
          if (typeof json[1] != "string")
            throw "Array[1] needs to be string.";
        } catch (err) {
          ws.send(
            JSON.stringify([
              null,
              {
                ok: false,
                error: `${err}`
              }
            ])
          );
        }
        const [eventId, eventName, eventData] = json;
        const handler = handlers.get(eventName);
        if (!handler)
          return ws.send(
            JSON.stringify([
              eventId,
              {
                ok: false,
                error: `Unable to find handler.`
              }
            ])
          );
        try {
          let response = await handler(eventData);
          ws.send(
            JSON.stringify([
              eventId,
              {
                ok: true,
                data: response
              }
            ])
          );
        } catch (err) {
          ws.send(
            JSON.stringify([
              eventId,
              {
                ok: false,
                error: `${err}`
              }
            ])
          );
        }
      });
      ws.on("close", () => sockets.delete(ws));
    }
  );
});
function set2(eventName, callback) {
  if (typeof eventName != "string")
    throw new Error("EventName needs to be a string.");
  if (typeof callback != "function")
    throw new Error("Callback needs to be a function.");
  if (handlers.has(eventName))
    throw new Error("EventName already in use.");
  handlers.set(eventName, callback);
  return () => {
    handlers.delete(eventName);
  };
}
function trigger(eventName, ...args) {
  if (!socketEvents.has(eventName))
    throw new Error("Unable to find handler!");
  return socketEvents.get(eventName)(...args);
}
var websocket_default = {
  set: set2,
  trigger
};

// src/api/ui/styles.scss
var styles_default = `
.acord--layer-container{--top-offset: 0px;width:100vw;height:calc(100vh - var(--top-offset));z-index:9999999;pointer-events:none;position:absolute;top:var(--top-offset);left:0px}.acord--layer-container *{z-index:99999999999999}.acord--tooltip-layer{opacity:0;transition:50ms linear opacity;position:absolute;pointer-events:none}.acord--tooltip-layer.visible{opacity:1;pointer-events:all}.acord--tooltip.vertical{transform:translateX(-50%)}.acord--tooltip.horizontal{transform:translateY(-50%)}.acord--toasts-container{display:flex;align-items:center;justify-content:flex-end;flex-direction:column;width:100vw;height:calc(100vh - var(--top-offset));position:absolute;top:0;left:0;pointer-events:none;padding-bottom:32px}.acord--toasts-container .acord--toast{transition:transform 250ms ease-in-out,opacity 250ms ease-in-out;display:flex;align-items:center;pointer-events:none;border-radius:4px;padding:8px;box-shadow:0px 2px 8px rgba(0,0,0,.25);opacity:1;gap:8px;font-size:14px;margin:4px}.acord--toasts-container .acord--toast svg{width:16px;height:16px}.acord--toasts-container .acord--toast.clickable{cursor:pointer;pointer-events:all}.acord--toasts-container .acord--toast.closing{opacity:0;transform:translate(0, -50px)}.acord--toasts-container .acord--toast.hidden{opacity:0;transform:translate(0, 50px)}.acord--toasts-container .acord--toast.style-info{background-color:#4a8fe1;color:#f5f5f5}.acord--toasts-container .acord--toast.style-warning{background-color:#faa81a;color:#000}.acord--toasts-container .acord--toast.style-error{background-color:#ed4245;color:#000}.acord--toasts-container .acord--toast.style-success{background-color:#3ba55d;color:#f5f5f5}.acord--toasts-container .acord--toast.style-default{background-color:#f5f5f5;color:#000}.acord--notification-layer{width:100vw;height:calc(100vh - var(--top-offset));display:flex;position:absolute;top:0;left:0;pointer-events:none}.acord--notification-layer .acord--notification{display:flex;flex-direction:column;pointer-events:all;transition:transform 250ms ease-in-out,opacity 250ms ease-in-out;margin:4px;backdrop-filter:blur(16px) brightness(0.75);-webkit-app-region:no-drag;--animation-size: 50px}.acord--notification-layer .acord--notification.hidden,.acord--notification-layer .acord--notification.closing{opacity:0}.acord--notification-layer .acord--notification>.container{display:flex;align-items:center;justify-content:space-between;padding:8px;color:#fff;min-width:250px}.acord--notification-layer .acord--notification>.container>.close{width:24px;height:24px;color:#fff;opacity:.5;cursor:pointer;margin-left:8px;z-index:999999999}.acord--notification-layer .acord--notification>.container>.close.hidden{display:none}.acord--notification-layer .acord--notification>.progress-container{width:100%;height:5px}.acord--notification-layer .acord--notification>.progress-container>.progress{width:0%;height:5px;transition:width var(--duration) linear;background-color:var(--bar-color)}.acord--notification-layer .acord--notification>.progress-container>.progress.progressing{width:100%}.acord--notification-layer .acord--notification.style-info{--bar-color: #4a8fe1}.acord--notification-layer .acord--notification.style-warning{--bar-color: #faa81a}.acord--notification-layer .acord--notification.style-error{--bar-color: #ed4245}.acord--notification-layer .acord--notification.style-success{--bar-color: #3ba55d}.acord--notification-layer .acord--notification.style-default{--bar-color: whitesmoke}.acord--notification-layer.top-right{justify-content:flex-end;align-items:flex-start}.acord--notification-layer.top-right .acord--notification.hidden{transform:translate(0, calc(var(--animation-size) * -1))}.acord--notification-layer.top-right .acord--notification.closing{transform:translate(0, var(--animation-size))}.acord--notification-layer.top-left{justify-content:flex-start;align-items:flex-start}.acord--notification-layer.top-left .acord--notification.hidden{transform:translate(0, calc(var(--animation-size) * -1))}.acord--notification-layer.top-left .acord--notification.closing{transform:translate(0, var(--animation-size))}.acord--notification-layer.bottom-right{justify-content:flex-end;align-items:flex-end}.acord--notification-layer.bottom-right .acord--notification.hidden{transform:translate(0, var(--animation-size))}.acord--notification-layer.bottom-right .acord--notification.closing{transform:translate(0, calc(var(--animation-size) * -1))}.acord--notification-layer.bottom-left{justify-content:flex-start;align-items:flex-end}.acord--notification-layer.bottom-left .acord--notification.hidden{transform:translate(0, var(--animation-size))}.acord--notification-layer.bottom-left .acord--notification.closing{transform:translate(0, calc(var(--animation-size) * -1))}.acord--notification-layer.top-center{justify-content:center;align-items:flex-start}.acord--notification-layer.top-center .acord--notification.hidden{transform:translate(0, calc(var(--animation-size) * -1))}.acord--notification-layer.top-center .acord--notification.closing{transform:translate(0, var(--animation-size))}.acord--notification-layer.bottom-center{justify-content:center;align-items:flex-end}.acord--notification-layer.bottom-center .acord--notification.hidden{transform:translate(0, var(--animation-size))}.acord--notification-layer.bottom-center .acord--notification.closing{transform:translate(0, calc(var(--animation-size) * -1))}.acord--notification-layer.center{justify-content:center;align-items:center}.acord--notification-layer.center .acord--notification.hidden{transform:scale(0.5)}.acord--notification-layer.center .acord--notification.closing{transform:scale(0.5)}.acord--notification-layer.left-center{justify-content:flex-start;align-items:center}.acord--notification-layer.left-center .acord--notification.hidden{transform:translate(calc(var(--animation-size) * -1), 0)}.acord--notification-layer.left-center .acord--notification.closing{transform:translate(var(--animation-size), 0)}.acord--notification-layer.right-center{justify-content:flex-end;align-items:center}.acord--notification-layer.right-center .acord--notification.hidden{transform:translate(var(--animation-size), 0)}.acord--notification-layer.right-center .acord--notification.closing{transform:translate(calc(var(--animation-size) * -1), 0)}`;

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
      utils_default.ifExists(
        document.querySelector(`.acord--notification-layer.${position}`),
        /** @param {HTMLDivElement} elm */
        (elm) => {
          if (!elm.childElementCount)
            elm.remove();
        }
      );
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
    confirmation(title, content, { confirm = null, cancel = null, danger = false, key = void 0, timeout = 6e4 * 5 } = {}) {
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
    alert(title, content, { confirm = null, key = void 0, timeout = 6e4 * 5 } = {}) {
      return this.confirmation(title, content, { confirm, cancel: null, key, timeout });
    }
  }
};

// src/api/ui/toasts.js
function getContainer2() {
  const appElm = document.querySelector('[class*="notAppAsidePanel-"]');
  let topContainer = appElm.querySelector(".acord--toasts-container");
  if (!topContainer) {
    topContainer = dom_default.parse(`<div class="acord--layer-container acord--toasts-container"></div>`);
    appElm.appendChild(topContainer);
  }
  topContainer.style.setProperty("--top-offset", `${appElm.getBoundingClientRect().top.toFixed(1)}px`);
  return topContainer;
}
var icons = {
  info: `<svg viewBox="0 0 24 24" width="24" height="24"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11v6h2v-6h-2zm0-4v2h2V7h-2z" fill="currentColor" /></svg>`,
  warning: `<svg viewBox="0 0 24 24" width="24" height="24"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-7v2h2v-2h-2zm0-8v6h2V7h-2z" fill="currentColor" /></svg>`,
  error: `<svg viewBox="0 0 24 24" width="24" height="24"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-7v2h2v-2h-2zm0-8v6h2V7h-2z"fill="currentColor" /></svg>`,
  success: `<svg viewBox="0 0 24 24" width="24" height="24"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-.997-6l7.07-7.071-1.414-1.414-5.656 5.657-2.829-2.829-1.414 1.414L11.003 16z" fill="currentColor" /></svg>`
};
function show3(content, {
  style = "default",
  timeout = 3500,
  onClick = null,
  hideIcon = false
} = {}) {
  const container = getContainer2();
  const toastElm = dom_default.parse(`
    <div class="acord--toast style-${style} hidden">
      ${hideIcon ? "" : icons[style] || ""}
      <div class="content"></div>
    </div>
  `);
  toastElm.querySelector(".content").innerHTML = content;
  let closed = false;
  function close() {
    if (closed)
      return;
    closed = true;
    toastElm.classList.add("closing");
    setTimeout(() => {
      toastElm.remove();
    }, 275);
  }
  if (typeof onClick == "function") {
    toastElm.classList.add("clickable");
    toastElm.onclick = () => {
      onClick(close);
    };
  }
  container.appendChild(toastElm);
  requestAnimationFrame(() => {
    toastElm.classList.remove("hidden");
  });
  setTimeout(close, timeout);
  return () => {
    close();
  };
}
var toasts_default = {
  show: Object.assign(show3, {
    info: (html, obj = {}) => show3(html, { ...obj, style: "info" }),
    error: (html, obj = {}) => show3(html, { ...obj, style: "error" }),
    warning: (html, obj = {}) => show3(html, { ...obj, style: "warning" }),
    success: (html, obj = {}) => show3(html, { ...obj, style: "success" })
  })
};

// src/api/ui/index.js
patcher_default.injectCSS(styles_default);
var ui_default = {
  tooltips: tooltips_default,
  notifications: notifications_default,
  contextMenus: contextMenus_default,
  components: components_default,
  modals: modals_default,
  toasts: toasts_default
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
    },
    get websocket() {
      if (!dev_default.enabled)
        throw devError("Websocket");
      return websocket_default;
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
    websocket: websocket_default,
    ui: ui_default
  }
};

// src/other/websocket-triggers.js
websocket_default.set("InstallExtension", async ({ url } = {}) => {
  if (!url)
    return;
  await modules_default.native.window.setAlwaysOnTop(0, true);
  await new Promise((r) => setTimeout(r, 250));
  await modules_default.native.window.setAlwaysOnTop(0, true);
  const success = await modals_default.show.confirmation(
    acord.i18n.format("IMPORT_EXTENSION"),
    acord.i18n.format("IMPORT_EXTENSION_DESCRIPTION", url)
  );
  if (!success)
    return;
  try {
    await extensions_default.load(url);
  } catch (err) {
    notifications_default.show.error(`${err}`, { timeout: 3e4 });
  }
});

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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibm9kZV9tb2R1bGVzL25lc3RzL2Nqcy9FdmVudHMuanMiLCAibm9kZV9tb2R1bGVzL25lc3RzL2Nqcy9FdmVudEVtaXR0ZXIuanMiLCAibm9kZV9tb2R1bGVzL25lc3RzL2Nqcy9tYWtlLmpzIiwgIm5vZGVfbW9kdWxlcy9uZXN0cy9janMvaW5kZXguanMiLCAic3JjL2RhdGEvY29tbW9uLmpzb24iLCAic3JjL2FwaS91dGlscy9yYXcvZmluZC1pbi10cmVlLmpzIiwgInNyYy9hcGkvdXRpbHMvbG9nZ2VyLmpzIiwgInNyYy9hcGkvdXRpbHMvcmVhY3QuanMiLCAic3JjL2FwaS91dGlscy9pbmRleC5qcyIsICJzcmMvYXBpL21vZHVsZXMvcmF3L2NvbXBsZXgtZmluZGVyLmpzIiwgInNyYy9hcGkvbW9kdWxlcy93ZWJwYWNrLmpzIiwgInNyYy9hcGkvbW9kdWxlcy9jb21tb24uanMiLCAic3JjL2FwaS9tb2R1bGVzL2luZGV4LmpzIiwgInNyYy9vdGhlci91dGlscy5qcyIsICJzcmMvbGliL0Jhc2ljRXZlbnRFbWl0dGVyLmpzIiwgInNyYy9hcGkvZXZlbnRzL2luZGV4LmpzIiwgInNyYy9hcGkvZG9tL2luZGV4LmpzIiwgInNyYy9saWIvc3BpdHJvYXN0L2Rpc3QvZXNtL3NoYXJlZC5qcyIsICJzcmMvbGliL3NwaXRyb2FzdC9kaXN0L2VzbS9ob29rLmpzIiwgInNyYy9saWIvc3BpdHJvYXN0L2Rpc3QvZXNtL3VuLXBhdGNoLmpzIiwgInNyYy9saWIvc3BpdHJvYXN0L2Rpc3QvZXNtL2dldC1wYXRjaC1mdW5jLmpzIiwgInNyYy9saWIvc3BpdHJvYXN0L2Rpc3QvZXNtL2luZGV4LmpzIiwgInNyYy9hcGkvcGF0Y2hlci9pbmRleC5qcyIsICJzcmMvb3RoZXIvbG9hZGluZy1hbmltYXRpb24vc3R5bGUuc2NzcyIsICJzcmMvb3RoZXIvbG9hZGluZy1hbmltYXRpb24vaW5kZXguanMiLCAic3JjL2FwaS9kZXYvaW5kZXguanMiLCAic3JjL2FwaS9pMThuL2luZGV4LmpzIiwgInNyYy9hcGkvc3RvcmFnZS9pbmRleC5qcyIsICJub2RlX21vZHVsZXMvaWRiLWtleXZhbC9kaXN0L2luZGV4LmpzIiwgInNyYy9saWIvanNvbi1kZWN5Y2xlZC9pbmRleC5qcyIsICJzcmMvYXBpL2V4dGVuc2lvbnMvaTE4bi5qcyIsICJzcmMvYXBpL2V4dGVuc2lvbnMvaW5kZXguanMiLCAic3JjL2FwaS9pbnRlcm5hbC9pbmRleC5qcyIsICJzcmMvYXBpL3dlYnNvY2tldC9pbmRleC5qcyIsICJzcmMvYXBpL3VpL3N0eWxlcy5zY3NzIiwgInNyYy9hcGkvdWkvdG9vbHRpcHMuanMiLCAic3JjL2FwaS91aS9ub3RpZmljYXRpb25zLmpzIiwgInNyYy9hcGkvdWkvY29udGV4dE1lbnVzLmpzIiwgInNyYy9saWIvY29tcG9uZW50cy9FcnJvckJvdW5kYXJ5LmpzeCIsICJzcmMvYXBpL3VpL2NvbXBvbmVudHMuanMiLCAic3JjL2FwaS91aS9tb2RhbHMuanN4IiwgInNyYy9hcGkvdWkvdG9hc3RzLmpzIiwgInNyYy9hcGkvdWkvaW5kZXguanMiLCAic3JjL2FwaS9pbmRleC5qcyIsICJzcmMvb3RoZXIvd2Vic29ja2V0LXRyaWdnZXJzLmpzIiwgInNyYy9pbmRleC5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5kZWZhdWx0ID0gT2JqZWN0LmZyZWV6ZSh7XHJcbiAgICBHRVQ6IFwiR0VUXCIsXHJcbiAgICBTRVQ6IFwiU0VUXCIsXHJcbiAgICBERUxFVEU6IFwiREVMRVRFXCIsXHJcbiAgICBVUERBVEU6IFwiVVBEQVRFXCIsXHJcbn0pO1xyXG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgRXZlbnRzXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vRXZlbnRzXCIpKTtcclxuY2xhc3MgRXZlbnRFbWl0dGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMubGlzdGVuZXJzID0gT2JqZWN0LnZhbHVlcyhFdmVudHNfMS5kZWZhdWx0KS5yZWR1Y2UoKGFjYywgdmFsKSA9PiAoKGFjY1t2YWxdID0gbmV3IFNldCgpKSwgYWNjKSwge30pO1xyXG4gICAgICAgIHRoaXMub24gPSBmdW5jdGlvbiAoZXZlbnQsIGxpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxpc3RlbmVyc1tldmVudF0uaGFzKGxpc3RlbmVyKSkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoYFRoaXMgbGlzdGVuZXIgb24gJHtldmVudH0gYWxyZWFkeSBleGlzdHMuYCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5saXN0ZW5lcnNbZXZlbnRdLmFkZChsaXN0ZW5lcik7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLm9uY2UgPSBmdW5jdGlvbiAoZXZlbnQsIGxpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG9uY2VMaXN0ZW5lciA9IChldmVudCwgZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vZmYoZXZlbnQsIG9uY2VMaXN0ZW5lcik7XHJcbiAgICAgICAgICAgICAgICBsaXN0ZW5lcihldmVudCwgZGF0YSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMub24oZXZlbnQsIG9uY2VMaXN0ZW5lcik7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLm9mZiA9IGZ1bmN0aW9uIChldmVudCwgbGlzdGVuZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5saXN0ZW5lcnNbZXZlbnRdLmRlbGV0ZShsaXN0ZW5lcik7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmVtaXQgPSBmdW5jdGlvbiAoZXZlbnQsIGRhdGEpIHtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBsaXN0ZW5lciBvZiB0aGlzLmxpc3RlbmVyc1tldmVudF0pIHtcclxuICAgICAgICAgICAgICAgIGxpc3RlbmVyKGV2ZW50LCBkYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgZm9yIChjb25zdCBldmVudCBvZiBPYmplY3QudmFsdWVzKEV2ZW50c18xLmRlZmF1bHQpKSB7XHJcbiAgICAgICAgICAgIHRoaXNbZXZlbnQudG9Mb3dlckNhc2UoKV0gPSAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KGV2ZW50LCBkYXRhKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5kZWZhdWx0ID0gRXZlbnRFbWl0dGVyO1xyXG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgRXZlbnRFbWl0dGVyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vRXZlbnRFbWl0dGVyXCIpKTtcclxuZnVuY3Rpb24gbWFrZShcclxuLy8gVGhpcyBjYW4gYmUgc2FmZWx5IGlnbm9yZWQsIHRoZSBEYXRhIHdpbGwgYWx3YXlzIGJlIGFuIG9iamVjdCBvciBpdCB3b24ndCB3b3JrIGFueXdheS5cclxuLy8gQHRzLWlnbm9yZVxyXG5kYXRhID0ge30sIHsgbmVzdEFycmF5cyA9IHRydWUsIH0gPSB7fSkge1xyXG4gICAgY29uc3QgZW1pdHRlciA9IG5ldyBFdmVudEVtaXR0ZXJfMS5kZWZhdWx0KCk7XHJcbiAgICBmdW5jdGlvbiBjcmVhdGVQcm94eSh0YXJnZXQsIHJvb3QsIHBhdGgpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb3h5KHRhcmdldCwge1xyXG4gICAgICAgICAgICBnZXQodGFyZ2V0LCBwcm9wZXJ0eSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbmV3UGF0aCA9IFsuLi5wYXRoLCBwcm9wZXJ0eV07XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHRhcmdldFtwcm9wZXJ0eV07XHJcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVtaXR0ZXIuZ2V0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogbmV3UGF0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUsXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFuZXN0QXJyYXlzICYmIEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY3JlYXRlUHJveHkodmFsdWUsIHJvb3QsIG5ld1BhdGgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY3JlYXRlUHJveHkoKHRhcmdldFtwcm9wZXJ0eV0gPSB7fSksIHJvb3QsIG5ld1BhdGgpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQodGFyZ2V0LCBwcm9wZXJ0eSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHRhcmdldFtwcm9wZXJ0eV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIGVtaXR0ZXIuc2V0KHtcclxuICAgICAgICAgICAgICAgICAgICBwYXRoOiBbLi4ucGF0aCwgcHJvcGVydHldLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvLyBUaGlzIG5lZWRzIHRvIHJldHVybiB0cnVlIG9yIGl0IGVycm9ycy4gL3NocnVnXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGVsZXRlUHJvcGVydHkodGFyZ2V0LCBwcm9wZXJ0eSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRlbGV0ZSB0YXJnZXRbcHJvcGVydHldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZW1pdHRlci5kZWxldGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRoOiBbLi4ucGF0aCwgcHJvcGVydHldLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBoYXModGFyZ2V0LCBwcm9wZXJ0eSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0YXJnZXRbcHJvcGVydHldID09PSBcIm9iamVjdFwiICYmXHJcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmtleXModGFyZ2V0W3Byb3BlcnR5XSkubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb3BlcnR5IGluIHRhcmdldDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHsgc3RvcmU6IGNyZWF0ZVByb3h5KGRhdGEsIGRhdGEsIFtdKSwgXHJcbiAgICAgICAgLy8gVGhpcyBjYW4gYmUgc2FmZWx5IGlnbm9yZWQsIHRoZSBEYXRhIHdpbGwgYWx3YXlzIGJlIGFuIG9iamVjdCBvciBpdCB3b24ndCB3b3JrIGFueXdheS5cclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgZ2hvc3Q6IGRhdGEgfSwgZW1pdHRlcik7XHJcbn1cclxuZXhwb3J0cy5kZWZhdWx0ID0gbWFrZTtcclxuIiwgIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMubWFrZSA9IGV4cG9ydHMuRXZlbnRzID0gdm9pZCAwO1xyXG52YXIgRXZlbnRzXzEgPSByZXF1aXJlKFwiLi9FdmVudHNcIik7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkV2ZW50c1wiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gX19pbXBvcnREZWZhdWx0KEV2ZW50c18xKS5kZWZhdWx0OyB9IH0pO1xyXG52YXIgbWFrZV8xID0gcmVxdWlyZShcIi4vbWFrZVwiKTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwibWFrZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gX19pbXBvcnREZWZhdWx0KG1ha2VfMSkuZGVmYXVsdDsgfSB9KTtcclxuIiwgIntcclxuICBcImNvbW1vblwiOiB7XHJcbiAgICBcIm1vZGFsc1wiOiB7XHJcbiAgICAgIFwiY29tcG9uZW50c1wiOiB7XHJcbiAgICAgICAgXCJvdGhlclwiOiB7XHJcbiAgICAgICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICBcIkhlYWRlclwiLFxyXG4gICAgICAgICAgICAgICAgXCJGb290ZXJcIlxyXG4gICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIlJvb3RcIjoge1xyXG4gICAgICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICAgICAgXCJpblwiOiBcInN0cmluZ3NcIixcclxuICAgICAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgXCJFTlRFUklOR1wiXHJcbiAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIFwiYWN0aW9uc1wiOiB7XHJcbiAgICAgICAgXCJvcGVuXCI6IHtcclxuICAgICAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgICAgIFwiaW5cIjogXCJzdHJpbmdzXCIsXHJcbiAgICAgICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgIFwib25DbG9zZUNhbGxiYWNrXCIsXHJcbiAgICAgICAgICAgICAgICBcIkxheWVyXCJcclxuICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgICAgICBcImJlZm9yZVwiOiBbXHJcbiAgICAgICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgICAgIFwib3BlblwiXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBcIm1hcFwiOiB7XHJcbiAgICAgICAgICAgIFwib3BlblwiOiBbXHJcbiAgICAgICAgICAgICAgXCJvbkNsb3NlQ2FsbGJhY2tcIixcclxuICAgICAgICAgICAgICBcIkxheWVyXCJcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJjbG9zZVwiOiB7XHJcbiAgICAgICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgICAgICBcImluXCI6IFwic3RyaW5nc1wiLFxyXG4gICAgICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICBcIm9uQ2xvc2VDYWxsYmFjaygpXCJcclxuICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgICAgICBcImJlZm9yZVwiOiBbXHJcbiAgICAgICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgICAgIFwiY2xvc2VcIlxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgXCJtYXBcIjoge1xyXG4gICAgICAgICAgICBcImNsb3NlXCI6IFtcclxuICAgICAgICAgICAgICBcIm9uQ2xvc2VDYWxsYmFjaygpXCJcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiY29tcG9uZW50c1wiOiB7XHJcbiAgICAgIFwiQnV0dG9uXCI6IHtcclxuICAgICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICBcIkJvcmRlckNvbG9yc1wiXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgICBcImJlZm9yZVwiOiBbXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgICAgXSxcclxuICAgICAgICAgIFwiYWZ0ZXJcIjogXCJCdXR0b25cIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJtYXBcIjoge1xyXG4gICAgICAgICAgXCJCdXR0b25cIjogW1xyXG4gICAgICAgICAgICBcIi5GSUxMRURcIixcclxuICAgICAgICAgICAgXCIub25Nb3VzZUxlYXZlXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIFwiQ29uZmlybWF0aW9uTW9kYWxcIjoge1xyXG4gICAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICAgIFwiaW5cIjogXCJzdHJpbmdzXCIsXHJcbiAgICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgIFwiLmNvbmZpcm1CdXR0b25Db2xvclwiXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgICBcImJlZm9yZVwiOiBbXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgXCJUZXh0XCI6IHtcclxuICAgICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgICAgXCJmaWx0ZXJcIjogXCIkPy5TaXplcz8uU0laRV8zMiAmJiAkLkNvbG9yc1wiLFxyXG4gICAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgICBcImJlZm9yZVwiOiBbXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgXCJNYXJrZG93blwiOiB7XHJcbiAgICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICAgIFwiZmlsdGVyXCI6IFwiJD8ucHJvdG90eXBlPy5yZW5kZXIgJiYgJC5ydWxlc1wiLFxyXG4gICAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJGbHV4RGlzcGF0Y2hlclwiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwiX2N1cnJlbnREaXNwYXRjaEFjdGlvblR5cGVcIixcclxuICAgICAgICAgICAgXCJkaXNwYXRjaFwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJSZWFjdFwiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwiY3JlYXRlRWxlbWVudFwiLFxyXG4gICAgICAgICAgICBcInVzZVN0YXRlXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIlJlc3RcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcImdldFwiLFxyXG4gICAgICAgICAgICBcInBvc3RcIixcclxuICAgICAgICAgICAgXCJnZXRBUElCYXNlVVJMXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIkZsdXhcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcImNvbm5lY3RTdG9yZXNcIixcclxuICAgICAgICAgICAgXCJkZXN0cm95XCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIldlYlNvY2tldFwiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjogXCIkPy5fX3Byb3RvX18/LmhhbmRsZUNvbm5lY3Rpb25cIixcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImJlZm9yZVwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIkFjdGl2aXR5QWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwic2VuZEFjdGl2aXR5SW52aXRlXCIsXHJcbiAgICAgICAgICAgIFwidXBkYXRlQWN0aXZpdHlcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiUHJpdmF0ZUNoYW5uZWxBY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJvcGVuUHJpdmF0ZUNoYW5uZWxcIixcclxuICAgICAgICAgICAgXCJlbnN1cmVQcml2YXRlQ2hhbm5lbFwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJBY2tBY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJpblwiOiBcInN0cmluZ3NcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJ0eXBlOlxcXCJCVUxLX0FDS1xcXCJcIlxyXG4gICAgICAgICAgXSxcclxuICAgICAgICAgIFtdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IHRydWUsXHJcbiAgICAgICAgXCJiZWZvcmVcIjogXCJleHBvcnRzXCJcclxuICAgICAgfSxcclxuICAgICAgXCJtYXBcIjoge1xyXG4gICAgICAgIFwiYWNrXCI6IFtcclxuICAgICAgICAgIFwidHlwZTpcXFwiQ0hBTk5FTF9BQ0tcXFwiXCIsXHJcbiAgICAgICAgICBcIm1lc3NhZ2VJZFwiLFxyXG4gICAgICAgICAgXCJjaGFubmVsSWRcIlxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgXCJidWxrQWNrXCI6IFtcclxuICAgICAgICAgIFwidHlwZTpcXFwiQlVMS19BQ0tcXFwiXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIkFuYWx5dGljc0FjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcImlzVGhyb3R0bGVkXCIsXHJcbiAgICAgICAgICAgIFwidHJhY2tcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiQW5pbWF0aW9uQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcInNwcmluZ1wiLFxyXG4gICAgICAgICAgICBcImRlY2F5XCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIkNvbm5lY3Rpb25BY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJzZXRTaG93QWN0aXZpdHlcIixcclxuICAgICAgICAgICAgXCJzZXRWaXNpYmlsaXR5XCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIlJUQ0Nvbm5lY3Rpb25BY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJnZXRDaGFubmVsSWRcIixcclxuICAgICAgICAgICAgXCJnZXRHdWlsZElkXCIsXHJcbiAgICAgICAgICAgIFwiZ2V0UlRDQ29ubmVjdGlvbklkXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIkVtb2ppQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwidHJhbnNsYXRlSW5saW5lRW1vamlUb1N1cnJvZ2F0ZXNcIixcclxuICAgICAgICAgICAgXCJ0cmFuc2xhdGVTdXJyb2dhdGVzVG9JbmxpbmVFbW9qaVwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJFbW9qaVN0YXRlQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwiZ2V0VVJMXCIsXHJcbiAgICAgICAgICAgIFwiaXNFbW9qaURpc2FibGVkXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIkd1aWxkTm90aWZpY2F0aW9uc0FjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcInVwZGF0ZUNoYW5uZWxPdmVycmlkZVNldHRpbmdzXCIsXHJcbiAgICAgICAgICAgIFwidXBkYXRlR3VpbGROb3RpZmljYXRpb25TZXR0aW5nc1wiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJJbnRlcm5hbFJlYWN0XCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJqc3hcIixcclxuICAgICAgICAgICAgXCJqc3hzXCIsXHJcbiAgICAgICAgICAgIFwiRnJhZ21lbnRcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiTG9naW5BY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJsb2dpblwiLFxyXG4gICAgICAgICAgICBcImxvZ291dFwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJRdWVyeUFjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcInF1ZXJ5RW1vamlSZXN1bHRzXCIsXHJcbiAgICAgICAgICAgIFwicXVlcnlGcmllbmRzXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIk1lc3NhZ2VBY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJyZWNlaXZlTWVzc2FnZVwiLFxyXG4gICAgICAgICAgICBcInNlbmRNZXNzYWdlXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIlByZW1pdW1BY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJpc1ByZW1pdW1cIixcclxuICAgICAgICAgICAgXCJjYW5Vc2VFbW9qaXNFdmVyeXdoZXJlXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIlZvaWNlQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwic2VsZWN0Vm9pY2VDaGFubmVsXCIsXHJcbiAgICAgICAgICAgIFwiZGlzY29ubmVjdFwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJUeXBpbmdBY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJzdGFydFR5cGluZ1wiLFxyXG4gICAgICAgICAgICBcInN0b3BUeXBpbmdcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiR3VpbGRBY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJzZXRDaGFubmVsXCIsXHJcbiAgICAgICAgICAgIFwic2V0U2VydmVyTXV0ZVwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJJbnZpdGVBY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJhY2NlcHRJbnZpdGVcIixcclxuICAgICAgICAgICAgXCJhY2NlcHRJbnZpdGVBbmRUcmFuc2l0aW9uVG9JbnZpdGVDaGFubmVsXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIk1lZGlhRW5naW5lQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwidG9nZ2xlU2VsZkRlYWZcIixcclxuICAgICAgICAgICAgXCJ0b2dnbGVTZWxmTXV0ZVwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJpMThuXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJfcmVxdWVzdGVkTG9jYWxlXCIsXHJcbiAgICAgICAgICAgIFwiZ2V0RGVmYXVsdExvY2FsZVwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJ1dWlkXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJ2MVwiLFxyXG4gICAgICAgICAgICBcInY0XCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcImhsanNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcImhpZ2hsaWdodEFsbFwiLFxyXG4gICAgICAgICAgICBcImhpZ2hsaWdodFwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59IiwgImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGZpbmRJblRyZWUoXHJcbiAgdHJlZSxcclxuICBzZWFyY2hGaWx0ZXIsXHJcbiAgeyB3YWxrYWJsZSA9IG51bGwsIGlnbm9yZSA9IFtdLCBsaW1pdCA9IDEwMCB9ID0ge31cclxuKSB7XHJcbiAgbGV0IGl0ZXJhdGlvbiA9IDA7XHJcblxyXG4gIGZ1bmN0aW9uIGRvU2VhcmNoKHRyZWUsIHNlYXJjaEZpbHRlciwgeyB3YWxrYWJsZSA9IG51bGwsIGlnbm9yZSA9IFtdIH0gPSB7fSkge1xyXG4gICAgaXRlcmF0aW9uICs9IDE7XHJcbiAgICBpZiAoaXRlcmF0aW9uID4gbGltaXQpIHJldHVybjtcclxuXHJcbiAgICBpZiAodHlwZW9mIHNlYXJjaEZpbHRlciA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICBpZiAodHJlZS5oYXNPd25Qcm9wZXJ0eShzZWFyY2hGaWx0ZXIpKSByZXR1cm4gdHJlZVtzZWFyY2hGaWx0ZXJdO1xyXG4gICAgfSBlbHNlIGlmIChzZWFyY2hGaWx0ZXIodHJlZSkpIHJldHVybiB0cmVlO1xyXG5cclxuICAgIGlmICghdHJlZSkgcmV0dXJuO1xyXG5cclxuICAgIGlmIChBcnJheS5pc0FycmF5KHRyZWUpKSB7XHJcbiAgICAgIGZvciAoY29uc3QgaXRlbSBvZiB0cmVlKSB7XHJcbiAgICAgICAgY29uc3QgZm91bmQgPSBkb1NlYXJjaChpdGVtLCBzZWFyY2hGaWx0ZXIsIHsgd2Fsa2FibGUsIGlnbm9yZSB9KTtcclxuICAgICAgICBpZiAoZm91bmQpIHJldHVybiBmb3VuZDtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdHJlZSA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyh0cmVlKSkge1xyXG4gICAgICAgIGlmICh3YWxrYWJsZSAhPSBudWxsICYmICF3YWxrYWJsZS5pbmNsdWRlcyhrZXkpKSBjb250aW51ZTtcclxuXHJcbiAgICAgICAgaWYgKGlnbm9yZS5pbmNsdWRlcyhrZXkpKSBjb250aW51ZTtcclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIGNvbnN0IGZvdW5kID0gZG9TZWFyY2godHJlZVtrZXldLCBzZWFyY2hGaWx0ZXIsIHtcclxuICAgICAgICAgICAgd2Fsa2FibGUsXHJcbiAgICAgICAgICAgIGlnbm9yZSxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgaWYgKGZvdW5kKSByZXR1cm4gZm91bmQ7XHJcbiAgICAgICAgfSBjYXRjaCB7IH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGRvU2VhcmNoKHRyZWUsIHNlYXJjaEZpbHRlciwgeyB3YWxrYWJsZSwgaWdub3JlIH0pO1xyXG59O1xyXG4iLCAiZnVuY3Rpb24gYnVpbGQocHJlZml4ID0gXCJBY29yZFwiLCB0eXBlLCBjb2xvcikge1xyXG4gIHJldHVybiAoLi4uaW5wdXQpID0+IGNvbnNvbGVbdHlwZV0oXHJcbiAgICBgJWMke3ByZWZpeH0lY2AsXHJcbiAgICBgYmFja2dyb3VuZC1jb2xvcjogJHtjb2xvcn07IGNvbG9yOiB3aGl0ZTsgYm9yZGVyLXJhZGl1czogNHB4OyBwYWRkaW5nOiAwcHggNnB4IDBweCA2cHg7IGZvbnQtd2VpZ2h0OiBib2xkYCxcclxuICAgIFwiXCIsXHJcbiAgICAuLi5pbnB1dFxyXG4gICk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBsb2c6IGJ1aWxkKFwiQWNvcmRcIiwgXCJsb2dcIiwgXCIjMDBmYmIwXCIpLFxyXG4gIGRlYnVnOiBidWlsZChcIkFjb3JkIERlYnVnXCIsIFwiZGVidWdcIiwgXCIjMDBmYmIwXCIpLFxyXG4gIGluZm86IGJ1aWxkKFwiQWNvcmQgSW5mb1wiLCBcImxvZ1wiLCBcIiM4MmFhZmZcIiksXHJcbiAgd2FybjogYnVpbGQoXCJBY29yZCBXYXJuXCIsIFwid2FyblwiLCBcIiNkZWJmMThcIiksXHJcbiAgZXJyb3I6IGJ1aWxkKFwiQWNvcmQgRXJyb3JcIiwgXCJlcnJvclwiLCBcIiNlZjU4NThcIiksXHJcbiAgYnVpbGRcclxufSIsICJpbXBvcnQgZmluZEluVHJlZSBmcm9tIFwiLi9yYXcvZmluZC1pbi10cmVlLmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgZ2V0SW5zdGFuY2Uobm9kZSkge1xyXG4gICAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKG5vZGUpLmZpbmQoaSA9PiBpWzBdLnN0YXJ0c1dpdGgoXCJfX3JlYWN0SW50ZXJuYWxJbnN0YW5jZVwiKSB8fCBpWzBdLnN0YXJ0c1dpdGgoXCJfX3JlYWN0RmliZXJcIikpPy5bMV07XHJcbiAgfSxcclxuICBnZXRPd25lckluc3RhbmNlKG5vZGUpIHtcclxuICAgIGxldCBpbnN0YW5jZSA9IHRoaXMuZ2V0SW5zdGFuY2Uobm9kZSk7XHJcbiAgICBmb3IgKGxldCBlbCA9IGluc3RhbmNlOyBlbDsgZWwgPSBlbC5yZXR1cm4pXHJcbiAgICAgIGlmIChlbC5zdGF0ZU5vZGU/LmZvcmNlVXBkYXRlKSByZXR1cm4gZWwuc3RhdGVOb2RlO1xyXG4gIH0sXHJcbiAgZmluZEluVHJlZSh0cmVlLCBmaWx0ZXIpIHtcclxuICAgIHJldHVybiBmaW5kSW5UcmVlKHRyZWUsIGZpbHRlciwge1xyXG4gICAgICB3YWxrYWJsZTogW1wicHJvcHNcIiwgXCJzdGF0ZVwiLCBcImNoaWxkcmVuXCIsIFwicmV0dXJuXCJdXHJcbiAgICB9KTtcclxuICB9LFxyXG4gIGdldENvbXBvbmVudHMobm9kZSkge1xyXG4gICAgY29uc3QgaW5zdGFuY2UgPSB0aGlzLmdldEluc3RhbmNlKG5vZGUpO1xyXG4gICAgY29uc3QgY29tcG9uZW50cyA9IFtdO1xyXG4gICAgbGV0IGxhc3RJbnN0YW5jZSA9IGluc3RhbmNlO1xyXG4gICAgd2hpbGUgKGxhc3RJbnN0YW5jZSAmJiBsYXN0SW5zdGFuY2UucmV0dXJuKSB7XHJcbiAgICAgIGlmICh0eXBlb2YgbGFzdEluc3RhbmNlLnJldHVybi50eXBlID09PSBcInN0cmluZ1wiKSBicmVhaztcclxuICAgICAgaWYgKGxhc3RJbnN0YW5jZS5yZXR1cm4udHlwZSkgY29tcG9uZW50cy5wdXNoKGxhc3RJbnN0YW5jZS5yZXR1cm4udHlwZSk7XHJcbiAgICAgIGxhc3RJbnN0YW5jZSA9IGxhc3RJbnN0YW5jZS5yZXR1cm47XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY29tcG9uZW50cztcclxuICB9LFxyXG4gIGdldFN0YXRlTm9kZXMobm9kZSkge1xyXG4gICAgY29uc3QgaW5zdGFuY2UgPSB0aGlzLmdldEluc3RhbmNlKG5vZGUpO1xyXG4gICAgY29uc3Qgc3RhdGVOb2RlcyA9IFtdO1xyXG4gICAgbGV0IGxhc3RJbnN0YW5jZSA9IGluc3RhbmNlO1xyXG4gICAgd2hpbGUgKGxhc3RJbnN0YW5jZSAmJiBsYXN0SW5zdGFuY2UucmV0dXJuKSB7XHJcbiAgICAgIGlmIChsYXN0SW5zdGFuY2UucmV0dXJuLnN0YXRlTm9kZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSBicmVhaztcclxuICAgICAgaWYgKGxhc3RJbnN0YW5jZS5yZXR1cm4uc3RhdGVOb2RlKVxyXG4gICAgICAgIHN0YXRlTm9kZXMucHVzaChsYXN0SW5zdGFuY2UucmV0dXJuLnN0YXRlTm9kZSk7XHJcbiAgICAgIGxhc3RJbnN0YW5jZSA9IGxhc3RJbnN0YW5jZS5yZXR1cm47XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3RhdGVOb2RlcztcclxuICB9LFxyXG4gIGdldFByb3BzKGVsLCBmaWx0ZXIgPSAoaSkgPT4gaSwgbWF4ID0gMTAwMDApIHtcclxuICAgIGNvbnN0IGluc3RhbmNlID0gdGhpcy5nZXRJbnN0YW5jZShlbCk7XHJcblxyXG4gICAgaWYgKCFpbnN0YW5jZT8ucmV0dXJuKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgICBmb3IgKFxyXG4gICAgICBsZXQgY3VycmVudCA9IGluc3RhbmNlPy5yZXR1cm4sIGkgPSAwO1xyXG4gICAgICBpID4gbWF4IHx8IGN1cnJlbnQgIT09IG51bGw7XHJcbiAgICAgIGN1cnJlbnQgPSBjdXJyZW50Py5yZXR1cm4sIGkrK1xyXG4gICAgKSB7XHJcbiAgICAgIGlmIChjdXJyZW50Py5wZW5kaW5nUHJvcHMgJiYgZmlsdGVyKGN1cnJlbnQucGVuZGluZ1Byb3BzKSlcclxuICAgICAgICByZXR1cm4gY3VycmVudC5wZW5kaW5nUHJvcHM7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfSxcclxufSIsICJpbXBvcnQgZmluZEluVHJlZSBmcm9tIFwiLi9yYXcvZmluZC1pbi10cmVlLmpzXCI7XHJcbmltcG9ydCBsb2dnZXIgZnJvbSBcIi4vbG9nZ2VyLmpzXCI7XHJcbmltcG9ydCByZWFjdCBmcm9tIFwiLi9yZWFjdC5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGxvZ2dlcixcclxuICByZWFjdCxcclxuICBmaW5kSW5UcmVlLFxyXG4gIGZvcm1hdCh2YWwsIC4uLmFyZ3MpIHtcclxuICAgIHJldHVybiBgJHt2YWx9YC5yZXBsYWNlQWxsKC97KFxcZCspfS9nLCAoXywgY2FwKSA9PiB7XHJcbiAgICAgIHJldHVybiBhcmdzW051bWJlcihjYXApXTtcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgaW50ZXJ2YWwoY2IsIGR1cikge1xyXG4gICAgbGV0IGludGVydmFsID0gc2V0SW50ZXJ2YWwoY2IsIGR1cik7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcclxuICAgIH07XHJcbiAgfSxcclxuICB0aW1lb3V0KGNiLCBkdXIpIHtcclxuICAgIGxldCB0aW1lb3V0ID0gc2V0VGltZW91dChjYiwgZHVyKTtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcclxuICAgIH07XHJcbiAgfSxcclxuICBpZkV4aXN0cyh2YWwsIGNiKSB7XHJcbiAgICBpZiAodmFsKSBjYih2YWwpO1xyXG4gIH0sXHJcbiAgY29weVRleHQodGV4dCkge1xyXG4gICAgaWYgKHdpbmRvdy5EaXNjb3JkTmF0aXZlKSB7XHJcbiAgICAgIERpc2NvcmROYXRpdmUuY2xpcGJvYXJkLmNvcHkodGV4dCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBuYXZpZ2F0b3IuY2xpcGJvYXJkLndyaXRlVGV4dCh0ZXh0KS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgIGNvbnN0IGNvcHlBcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRleHRhcmVhXCIpO1xyXG5cclxuICAgICAgY29weUFyZWEuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XHJcbiAgICAgIGNvcHlBcmVhLnN0eWxlLnBvc2l0aW9uID0gXCJmaXhlZFwiO1xyXG4gICAgICBjb3B5QXJlYS5zdHlsZS50b3AgPSBcIjBcIjtcclxuICAgICAgY29weUFyZWEuc3R5bGUubGVmdCA9IFwiMFwiO1xyXG5cclxuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjb3B5QXJlYSk7XHJcbiAgICAgIGNvcHlBcmVhLmZvY3VzKCk7XHJcbiAgICAgIGNvcHlBcmVhLnNlbGVjdCgpO1xyXG5cclxuICAgICAgdHJ5IHtcclxuICAgICAgICBkb2N1bWVudC5leGVjQ29tbWFuZChcImNvcHlcIik7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChjb3B5QXJlYSk7XHJcbiAgICB9KTtcclxuICB9LFxyXG59IiwgImltcG9ydCB1dGlscyBmcm9tIFwiLi4vLi4vdXRpbHMvaW5kZXguanNcIjtcclxuaW1wb3J0IGxvZ2dlciBmcm9tIFwiLi4vLi4vdXRpbHMvbG9nZ2VyLmpzXCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gd3JhcEZpbHRlcihmaWx0ZXIpIHtcclxuICByZXR1cm4gKC4uLmFyZ3MpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGlmIChhcmdzWzBdPy5kb2N1bWVudCAmJiBhcmdzWzBdPy53aW5kb3cpIHJldHVybiBmYWxzZTtcclxuICAgICAgaWYgKGFyZ3NbMF0/LmRlZmF1bHQ/LnJlbW92ZSAmJiBhcmdzWzBdPy5kZWZhdWx0Py5zZXQgJiYgYXJnc1swXT8uZGVmYXVsdD8uY2xlYXIgJiYgYXJnc1swXT8uZGVmYXVsdD8uZ2V0ICYmICFhcmdzWzBdPy5kZWZhdWx0Py5zb3J0KSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIGlmIChhcmdzWzBdLnJlbW92ZSAmJiBhcmdzWzBdLnNldCAmJiBhcmdzWzBdLmNsZWFyICYmIGFyZ3NbMF0uZ2V0ICYmICFhcmdzWzBdLnNvcnQpIHJldHVybiBmYWxzZTtcclxuICAgICAgaWYgKGFyZ3NbMF0/LmRlZmF1bHQ/LmdldFRva2VuIHx8IGFyZ3NbMF0/LmRlZmF1bHQ/LmdldEVtYWlsIHx8IGFyZ3NbMF0/LmRlZmF1bHQ/LnNob3dUb2tlbikgcmV0dXJuIGZhbHNlO1xyXG4gICAgICBpZiAoYXJnc1swXT8uZ2V0VG9rZW4gfHwgYXJnc1swXT8uZ2V0RW1haWwgfHwgYXJnc1swXT8uc2hvd1Rva2VuKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIHJldHVybiBmaWx0ZXIoLi4uYXJncyk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGxvZ2dlci53YXJuKFwiTW9kdWxlIGZpbHRlciB0aHJldyBhbiBleGNlcHRpb24uXCIsIGZpbHRlciwgZXJyKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNoZWNrTW9kdWxlU3RyaW5ncyhtLCBzdHJpbmdzLCBoYXNOb3QpIHtcclxuICBjb25zdCBjaGVjayA9IChzMSwgczIpID0+IHtcclxuICAgIHJldHVybiBoYXNOb3QgPyBzMS50b1N0cmluZygpLmluZGV4T2YoczIudG9TdHJpbmcoKSkgPT0gLTEgOiBzMS50b1N0cmluZygpLmluZGV4T2YoczIudG9TdHJpbmcoKSkgPiAtMTtcclxuICB9O1xyXG4gIHJldHVybiBzdHJpbmdzLmV2ZXJ5KGogPT4ge1xyXG4gICAgcmV0dXJuIGNoZWNrKG0/LnRvU3RyaW5nPy4oKSB8fCBcIlwiLCBqKVxyXG4gICAgICB8fCBjaGVjayhtPy5fX29yaWdpbmFsX18/LnRvU3RyaW5nPy4oKSB8fCBcIlwiLCBqKVxyXG4gICAgICB8fCBjaGVjayhtPy50eXBlPy50b1N0cmluZz8uKCkgfHwgXCJcIiwgailcclxuICAgICAgfHwgY2hlY2sobT8udHlwZT8uX19vcmlnaW5hbF9fPy50b1N0cmluZz8uKCkgfHwgXCJcIiwgailcclxuICAgICAgfHwgT2JqZWN0LmVudHJpZXMoWydmdW5jdGlvbicsICdvYmplY3QnXS5pbmNsdWRlcyh0eXBlb2YgbT8ucHJvdG90eXBlKSA/IHR5cGVvZiBtPy5wcm90b3R5cGUgOiB7fSkuZmlsdGVyKGkgPT4gaVswXT8uaW5jbHVkZXM/LihcInJlbmRlclwiKSkuc29tZShpID0+IGNoZWNrKGlbMV0/LnRvU3RyaW5nPy4oKSB8fCBcIlwiLCBqKSlcclxuICB9KTtcclxufTtcclxuZnVuY3Rpb24gY2hlY2tNb2R1bGVQcm9wcyhtLCBwcm9wZXJ0aWVzLCBoYXNOb3QpIHtcclxuICByZXR1cm4gcHJvcGVydGllcy5ldmVyeShwcm9wID0+IHtcclxuICAgIGNvbnN0IHZhbHVlID0gbVtwcm9wXT8uX19vcmlnaW5hbF9fIHx8IG1bcHJvcF07XHJcbiAgICByZXR1cm4gaGFzTm90ID8gdmFsdWUgPT09IHVuZGVmaW5lZCA6ICh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmICEodHlwZW9mIHZhbHVlID09IFwic3RyaW5nXCIgJiYgIXZhbHVlKSk7XHJcbiAgfSk7XHJcbn07XHJcbmZ1bmN0aW9uIGNoZWNrTW9kdWxlUHJvdG90eXBlcyhtLCBwcm90b1Byb3BzLCBoYXNOb3QpIHtcclxuICByZXR1cm4gbS5wcm90b3R5cGUgJiYgcHJvdG9Qcm9wcy5ldmVyeShwcm9wID0+IHtcclxuICAgIGNvbnN0IHZhbHVlID0gbS5wcm90b3R5cGVbcHJvcF07XHJcbiAgICByZXR1cm4gaGFzTm90ID8gdmFsdWUgPT09IHVuZGVmaW5lZCA6ICh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmICEodHlwZW9mIHZhbHVlID09IFwic3RyaW5nXCIgJiYgIXZhbHVlKSk7XHJcbiAgfSk7XHJcbn07XHJcblxyXG5jb25zdCB3ZWJwYWNrQ2h1bmtOYW1lID0gXCJ3ZWJwYWNrQ2h1bmtkaXNjb3JkX2FwcFwiO1xyXG5jb25zdCBwdXNoTGlzdGVuZXJzID0gbmV3IFNldCgpO1xyXG5cclxuXHJcbntcclxuICBsZXQgb2dQdXNoID0gd2luZG93W3dlYnBhY2tDaHVua05hbWVdLnB1c2g7XHJcblxyXG4gIGZ1bmN0aW9uIGhhbmRsZVB1c2goY2h1bmspIHtcclxuICAgIGNvbnN0IFssIG1vZHVsZXNdID0gY2h1bms7XHJcblxyXG4gICAgZm9yIChjb25zdCBtb2R1bGVJZCBpbiBPYmplY3Qua2V5cyhtb2R1bGVzIHx8IHt9KSkge1xyXG4gICAgICBjb25zdCBvZ01vZHVsZSA9IG1vZHVsZXNbbW9kdWxlSWRdO1xyXG5cclxuICAgICAgbW9kdWxlc1ttb2R1bGVJZF0gPSAobW9kdWxlLCBleHBvcnRzLCByZXF1aXJlKSA9PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIG9nTW9kdWxlLmNhbGwobnVsbCwgbW9kdWxlLCBleHBvcnRzLCByZXF1aXJlKTtcclxuXHJcbiAgICAgICAgICBwdXNoTGlzdGVuZXJzLmZvckVhY2gobGlzdGVuZXIgPT4ge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgIGxpc3RlbmVyKGV4cG9ydHMpO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgIHV0aWxzLmxvZ2dlci5lcnJvcihcIlB1c2ggbGlzdGVuZXIgdGhyZXcgYW4gZXhjZXB0aW9uLlwiLCBsaXN0ZW5lciwgZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICB1dGlscy5sb2dnZXIuZXJyb3IoXCJVbmFibGUgdG8gcGF0Y2ggcHVzaGVkIG1vZHVsZS5cIiwgZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuXHJcbiAgICAgIE9iamVjdC5hc3NpZ24obW9kdWxlc1ttb2R1bGVJZF0sIG9nTW9kdWxlLCB7XHJcbiAgICAgICAgX19vcmlnaW5hbF9fOiBvZ01vZHVsZSxcclxuICAgICAgICB0b1N0cmluZzogKCkgPT4gb2dNb2R1bGUudG9TdHJpbmcoKSxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG9nUHVzaC5jYWxsKHdpbmRvd1t3ZWJwYWNrQ2h1bmtOYW1lXSwgY2h1bmspO1xyXG4gIH1cclxuXHJcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvd1t3ZWJwYWNrQ2h1bmtOYW1lXSwgXCJwdXNoXCIsIHtcclxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcclxuICAgIGdldCgpIHsgcmV0dXJuIGhhbmRsZVB1c2g7IH0sXHJcbiAgICBzZXQodmFsdWUpIHtcclxuICAgICAgb2dQdXNoID0gdmFsdWU7XHJcblxyXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93W3RoaXMuY2h1bmtOYW1lXSwgXCJwdXNoXCIsIHtcclxuICAgICAgICB2YWx1ZTogdGhpcy5oYW5kbGVQdXNoLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcclxuICAgICAgICB3cml0YWJsZTogdHJ1ZVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9KTtcclxufVxyXG5cclxuXHJcblxyXG4vKipcclxuICogXHJcbiAqIEBwYXJhbSB7YW55fSBmaWx0ZXIgXHJcbiAqIEBwYXJhbSB7eyBzaWduYWw6IEFib3J0U2lnbmFsLCBzZWFyY2hFeHBvcnRzOiBib29sZWFuIH19IHBhcmFtMSBcclxuICogQHJldHVybnMgXHJcbiAqL1xyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbGF6eUZpbmQoZmlsdGVyLCB7IHNpZ25hbCA9IG51bGwsIHNlYXJjaEV4cG9ydHMgPSBmYWxzZSB9KSB7XHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgIGNvbnN0IGNhbmNlbCA9ICgpID0+IHB1c2hMaXN0ZW5lcnMuZGVsZXRlKGxpc3RlbmVyKTtcclxuICAgIGNvbnN0IGxpc3RlbmVyID0gKGV4cG9ydHMpID0+IHtcclxuICAgICAgaWYgKCFleHBvcnRzIHx8IGV4cG9ydHMgPT09IHdpbmRvdyB8fCBleHBvcnRzID09PSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpIHJldHVybjtcclxuXHJcbiAgICAgIGxldCBmb3VuZCA9IG51bGw7XHJcblxyXG4gICAgICBpZiAodHlwZW9mIGV4cG9ydHMgPT0gXCJvYmplY3RcIiAmJiBzZWFyY2hFeHBvcnRzKSB7XHJcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gZXhwb3J0cykge1xyXG4gICAgICAgICAgbGV0IGV4cG9ydGVkID0gZXhwb3J0c1trZXldO1xyXG4gICAgICAgICAgaWYgKCFleHBvcnRlZCkgY29udGludWU7XHJcbiAgICAgICAgICBpZiAoZmlsdGVyKGV4cG9ydGVkKSkge1xyXG4gICAgICAgICAgICBmb3VuZCA9IGV4cG9ydGVkO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbGV0IHBhdGhzID0gW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiLFxyXG4gICAgICAgICAgXCJcIlxyXG4gICAgICAgIF07XHJcbiAgICAgICAgZm91bmQgPSBwYXRocy5tYXAoaSA9PiB7XHJcbiAgICAgICAgICBsZXQgcGF0aGVkID0gIWkgPyBleHBvcnRzIDogXy5nZXQoZXhwb3J0cywgaSk7XHJcbiAgICAgICAgICBpZiAocGF0aGVkICYmIGZpbHRlcihwYXRoZWQpKSByZXR1cm4gcGF0aGVkO1xyXG4gICAgICAgIH0pLmZpbmQoaSA9PiBpKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCFmb3VuZCkgcmV0dXJuO1xyXG4gICAgICBjYW5jZWwoKTtcclxuICAgICAgcmVzb2x2ZShmb3VuZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVzaExpc3RlbmVycy5hZGQobGlzdGVuZXIpO1xyXG5cclxuICAgIHNpZ25hbD8uYWRkRXZlbnRMaXN0ZW5lcihcImFib3J0XCIsICgpID0+IHtcclxuICAgICAgY2FuY2VsKCk7XHJcbiAgICAgIHJlc29sdmUobnVsbCk7XHJcbiAgICB9KTtcclxuICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGZpbmQocmVxLCBmaWx0ZXIsIGNvbmZpZyA9IHt9KSB7XHJcbiAgbGV0IGRlZmF1bHRFeHBvcnQgPSB0eXBlb2YgY29uZmlnLmRlZmF1bHRFeHBvcnQgIT0gXCJib29sZWFuXCIgPyBmYWxzZSA6IGNvbmZpZy5kZWZhdWx0RXhwb3J0O1xyXG4gIGxldCB1bmxvYWRlZCA9IHR5cGVvZiBjb25maWcudW5sb2FkZWQgIT0gXCJib29sZWFuXCIgPyBmYWxzZSA6IGNvbmZpZy51bmxvYWRlZDtcclxuICBsZXQgYWxsID0gdHlwZW9mIGNvbmZpZy5hbGwgIT0gXCJib29sZWFuXCIgPyBmYWxzZSA6IGNvbmZpZy5hbGw7XHJcbiAgY29uc3QgZm91bmQgPSBbXTtcclxuICBpZiAoIXVubG9hZGVkKSBmb3IgKGxldCBpIGluIHJlcS5jKSBpZiAocmVxLmMuaGFzT3duUHJvcGVydHkoaSkpIHtcclxuICAgIGxldCBtID0gcmVxLmNbaV0uZXhwb3J0cywgciA9IG51bGw7XHJcbiAgICBpZiAobSAmJiAodHlwZW9mIG0gPT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgbSA9PSBcImZ1bmN0aW9uXCIpKSB7XHJcbiAgICAgIGlmICghIShyID0gZmlsdGVyKG0sIGkpKSkge1xyXG4gICAgICAgIGlmIChhbGwpIGZvdW5kLnB1c2goZGVmYXVsdEV4cG9ydCA/IHIgOiByZXEuY1tpXSk7XHJcbiAgICAgICAgZWxzZSByZXR1cm4gZGVmYXVsdEV4cG9ydCA/IHIgOiByZXEuY1tpXTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIGZvciAobGV0IGtleSBvZiBPYmplY3Qua2V5cyhtKSkgaWYgKGtleS5sZW5ndGggPCA0ICYmIG1ba2V5XSAmJiAhIShyID0gZmlsdGVyKG1ba2V5XSwgaSkpKSB7XHJcbiAgICAgICAgaWYgKGFsbCkgZm91bmQucHVzaChkZWZhdWx0RXhwb3J0ID8gciA6IHJlcS5jW2ldKTtcclxuICAgICAgICBlbHNlIHJldHVybiBkZWZhdWx0RXhwb3J0ID8gciA6IHJlcS5jW2ldO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAobSAmJiBtLl9fZXNNb2R1bGUgJiYgbS5kZWZhdWx0ICYmICh0eXBlb2YgbS5kZWZhdWx0ID09IFwib2JqZWN0XCIgfHwgdHlwZW9mIG0uZGVmYXVsdCA9PSBcImZ1bmN0aW9uXCIpKSB7XHJcbiAgICAgIGlmICghIShyID0gZmlsdGVyKG0uZGVmYXVsdCwgaSkpKSB7XHJcbiAgICAgICAgaWYgKGFsbCkgZm91bmQucHVzaChkZWZhdWx0RXhwb3J0ID8gciA6IHJlcS5jW2ldKTtcclxuICAgICAgICBlbHNlIHJldHVybiBkZWZhdWx0RXhwb3J0ID8gciA6IHJlcS5jW2ldO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYgKG0uZGVmYXVsdC50eXBlICYmICh0eXBlb2YgbS5kZWZhdWx0LnR5cGUgPT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgbS5kZWZhdWx0LnR5cGUgPT0gXCJmdW5jdGlvblwiKSAmJiAhIShyID0gZmlsdGVyKG0uZGVmYXVsdC50eXBlLCBpKSkpIHtcclxuICAgICAgICBpZiAoYWxsKSBmb3VuZC5wdXNoKGRlZmF1bHRFeHBvcnQgPyByIDogcmVxLmNbaV0pO1xyXG4gICAgICAgIGVsc2UgcmV0dXJuIGRlZmF1bHRFeHBvcnQgPyByIDogcmVxLmNbaV07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgZm9yIChsZXQgaSBpbiByZXEubSkgaWYgKHJlcS5tLmhhc093blByb3BlcnR5KGkpKSB7XHJcbiAgICBsZXQgbSA9IHJlcS5tW2ldO1xyXG4gICAgaWYgKG0gJiYgdHlwZW9mIG0gPT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgIGlmIChyZXEuY1tpXSAmJiAhdW5sb2FkZWQgJiYgZmlsdGVyKG0sIGkpKSB7XHJcbiAgICAgICAgaWYgKGFsbCkgZm91bmQucHVzaChkZWZhdWx0RXhwb3J0ID8gcmVxLmNbaV0uZXhwb3J0cyA6IHJlcS5jW2ldKTtcclxuICAgICAgICBlbHNlIHJldHVybiBkZWZhdWx0RXhwb3J0ID8gcmVxLmNbaV0uZXhwb3J0cyA6IHJlcS5jW2ldO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICghcmVxLmNbaV0gJiYgdW5sb2FkZWQgJiYgZmlsdGVyKG0sIGkpKSB7XHJcbiAgICAgICAgY29uc3QgcmVzb2x2ZWQgPSB7fSwgcmVzb2x2ZWQyID0ge307XHJcbiAgICAgICAgbShyZXNvbHZlZCwgcmVzb2x2ZWQyLCByZXEpO1xyXG4gICAgICAgIGNvbnN0IHRydWVSZXNvbHZlZCA9IHJlc29sdmVkMiAmJiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhyZXNvbHZlZDIgfHwge30pLmxlbmd0aCA9PSAwID8gcmVzb2x2ZWQgOiByZXNvbHZlZDI7XHJcbiAgICAgICAgaWYgKGFsbCkgZm91bmQucHVzaChkZWZhdWx0RXhwb3J0ID8gdHJ1ZVJlc29sdmVkLmV4cG9ydHMgOiB0cnVlUmVzb2x2ZWQpO1xyXG4gICAgICAgIGVsc2UgcmV0dXJuIGRlZmF1bHRFeHBvcnQgPyB0cnVlUmVzb2x2ZWQuZXhwb3J0cyA6IHRydWVSZXNvbHZlZDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICBpZiAoYWxsKSByZXR1cm4gZm91bmQ7XHJcbn07XHJcblxyXG5cclxuZnVuY3Rpb24gZmluZGVyRmluZEZ1bmN0aW9uKGVudHJpZXMsIHN0cmluZ3MpIHtcclxuICByZXR1cm4gKGVudHJpZXMuZmluZChuID0+IHtcclxuICAgIGxldCBmdW5jU3RyaW5nID0gdHlwZW9mIG5bMV0gPT0gXCJmdW5jdGlvblwiID8gKG5bMV0/Ll9fb3JpZ2luYWxfXz8udG9TdHJpbmc/LigpIHx8IG5bMV0/LnRvU3RyaW5nPy4oKSB8fCBcIlwiKSA6ICgoKSA9PiB7IHRyeSB7IHJldHVybiBKU09OLnN0cmluZ2lmeShuWzFdKSB9IGNhdGNoIChlcnIpIHsgcmV0dXJuIG5bMV0udG9TdHJpbmcoKSB9IH0pKCk7XHJcbiAgICBsZXQgcmVuZGVyRnVuY1N0cmluZyA9IG5bMV0/LnJlbmRlcj8uX19vcmlnaW5hbF9fPy50b1N0cmluZz8uKCkgfHwgblsxXT8ucmVuZGVyPy50b1N0cmluZz8uKCkgfHwgXCJcIjtcclxuICAgIHJldHVybiBzdHJpbmdzLmV2ZXJ5KHN0cmluZyA9PiBmdW5jU3RyaW5nLmluZGV4T2Yoc3RyaW5nKSAhPSAtMSB8fCByZW5kZXJGdW5jU3RyaW5nLmluZGV4T2Yoc3RyaW5nKSAhPSAtMSk7XHJcbiAgfSkpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZmluZGVyVG9GaWx0ZXIoZmluZGVyKSB7XHJcbiAgbGV0IGZvdW5kID0gKCkgPT4gZmFsc2U7XHJcbiAgaWYgKHR5cGVvZiBmaW5kZXI/LmZpbHRlciA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgZm91bmQgPSB3cmFwRmlsdGVyKGV2YWwoYCgoJCk9PnsgdHJ5IHsgcmV0dXJuICgke2ZpbmRlci5maWx0ZXJ9KTsgfSBjYXRjaCB7IHJldHVybiBmYWxzZTsgfSB9KWApKTtcclxuICB9IGVsc2UgaWYgKHR5cGVvZiBmaW5kZXI/LmZpbHRlciA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICBmb3VuZCA9IHdyYXBGaWx0ZXIoZmluZGVyLmZpbHRlcik7XHJcbiAgfSBlbHNlIHtcclxuICAgIHN3aXRjaCAoZmluZGVyLmZpbHRlci5pbikge1xyXG4gICAgICBjYXNlIFwicHJvcGVydGllc1wiOiB7XHJcbiAgICAgICAgaWYgKGZpbmRlci5maWx0ZXIuYnk/LlsxXT8ubGVuZ3RoKSB7XHJcbiAgICAgICAgICBmb3VuZCA9IHdyYXBGaWx0ZXIoKG0pID0+IGNoZWNrTW9kdWxlUHJvcHMobSwgZmluZGVyLmZpbHRlci5ieT8uWzBdIHx8IFtdKSAmJiBjaGVja01vZHVsZVByb3BzKG0sIGZpbmRlci5maWx0ZXIuYnk/LlsxXSB8fCBbXSwgdHJ1ZSkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBmb3VuZCA9IHdyYXBGaWx0ZXIoKG0pID0+IGNoZWNrTW9kdWxlUHJvcHMobSwgZmluZGVyLmZpbHRlci5ieT8uWzBdIHx8IFtdKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgXCJwcm90b3R5cGVzXCI6IHtcclxuICAgICAgICBpZiAoZmluZGVyLmZpbHRlci5ieT8uWzFdPy5sZW5ndGgpIHtcclxuICAgICAgICAgIGZvdW5kID0gd3JhcEZpbHRlcigobSkgPT4gY2hlY2tNb2R1bGVQcm90b3R5cGVzKG0sIGZpbmRlci5maWx0ZXIuYnk/LlswXSB8fCBbXSkgJiYgY2hlY2tNb2R1bGVQcm90b3R5cGVzKG0sIGZpbmRlci5maWx0ZXIuYnk/LlsxXSB8fCBbXSwgdHJ1ZSkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBmb3VuZCA9IHdyYXBGaWx0ZXIoKG0pID0+IGNoZWNrTW9kdWxlUHJvdG90eXBlcyhtLCBmaW5kZXIuZmlsdGVyLmJ5Py5bMF0gfHwgW10pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSBcInN0cmluZ3NcIjoge1xyXG4gICAgICAgIGlmIChmaW5kZXIuZmlsdGVyLmJ5Py5bMV0/Lmxlbmd0aCkge1xyXG4gICAgICAgICAgZm91bmQgPSB3cmFwRmlsdGVyKChtKSA9PiBjaGVja01vZHVsZVN0cmluZ3MobSwgZmluZGVyLmZpbHRlci5ieT8uWzBdIHx8IFtdKSAmJiBjaGVja01vZHVsZVN0cmluZ3MobSwgZmluZGVyLmZpbHRlci5ieT8uWzFdIHx8IFtdLCB0cnVlKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGZvdW5kID0gd3JhcEZpbHRlcigobSkgPT4gY2hlY2tNb2R1bGVTdHJpbmdzKG0sIGZpbmRlci5maWx0ZXIuYnk/LlswXSB8fCBbXSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gZm91bmQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBmaW5kZXJNYXAoX19vcmlnaW5hbF9fLCBtYXApIHtcclxuICBsZXQgX19tYXBwZWRfXyA9IHt9O1xyXG5cclxuICBsZXQgdGVtcCA9IHtcclxuICAgIF9fb3JpZ2luYWxfXyxcclxuICAgIF9fbWFwcGVkX18sXHJcbiAgICAuLi5fX29yaWdpbmFsX19cclxuICB9O1xyXG5cclxuICBPYmplY3QuZW50cmllcyhtYXApLmZvckVhY2goKFtrZXksIHN0cmluZ3NdKSA9PiB7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGVtcCwga2V5LCB7XHJcbiAgICAgIGdldCgpIHtcclxuICAgICAgICBpZiAoX19tYXBwZWRfX1trZXldKSByZXR1cm4gX19vcmlnaW5hbF9fW19fbWFwcGVkX19ba2V5XV07XHJcblxyXG4gICAgICAgIGxldCBmb3VuZEZ1bmMgPSBmaW5kZXJGaW5kRnVuY3Rpb24oT2JqZWN0LmVudHJpZXMoX19vcmlnaW5hbF9fIHx8IHt9KSwgbWFwW2tleV0gfHwgW10pO1xyXG4gICAgICAgIGlmICghZm91bmRGdW5jPy5sZW5ndGgpIHJldHVybjtcclxuXHJcbiAgICAgICAgX19tYXBwZWRfX1trZXldID0gZm91bmRGdW5jWzBdO1xyXG4gICAgICAgIHJldHVybiBmb3VuZEZ1bmNbMV07XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiB0ZW1wO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZmluZEJ5RmluZGVyKHJlcSwgZmluZGVyID0ge30pIHtcclxuICBjb25zdCBkZWZhdWx0RXhwb3J0ID0gISFmaW5kZXI/LmZpbHRlcj8uZXhwb3J0O1xyXG4gIGxldCBmb3VuZCA9IGZpbmQocmVxLCBmaW5kZXJUb0ZpbHRlcihmaW5kZXIpLCB7IGRlZmF1bHRFeHBvcnQsIGFsbDogdHJ1ZSB9KS5maW5kKGkgPT4gaSAhPT0gZ2xvYmFsVGhpcy53aW5kb3cgfHwgaT8uZXhwb3J0cyAhPT0gZ2xvYmFsVGhpcy53aW5kb3cpO1xyXG5cclxuICBpZiAoIWZvdW5kKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgaWYgKGZpbmRlci5wYXRoPy5iZWZvcmUpIGZvdW5kID0gKEFycmF5LmlzQXJyYXkoZmluZGVyLnBhdGguYmVmb3JlKSA/IGZpbmRlci5wYXRoLmJlZm9yZS5tYXAoaSA9PiBfLmdldChmb3VuZCwgaSkpLmZpbmQoaSA9PiBpKSA6IF8uZ2V0KGZvdW5kLCBmaW5kZXIucGF0aC5iZWZvcmUpKSB8fCBmb3VuZDtcclxuICBpZiAoZmluZGVyLmFzc2lnbikgZm91bmQgPSBPYmplY3QuYXNzaWduKHt9LCBmb3VuZCk7XHJcblxyXG4gIGlmICghZm91bmQpIHJldHVybiBudWxsO1xyXG5cclxuICBpZiAoZmluZGVyLm1hcCkgZm91bmQgPSBmaW5kZXJNYXAoZm91bmQsIGZpbmRlci5tYXApO1xyXG5cclxuICBpZiAoZmluZGVyLnBhdGg/LmFmdGVyKSBmb3VuZCA9IChBcnJheS5pc0FycmF5KGZpbmRlci5wYXRoLmFmdGVyKSA/IGZpbmRlci5wYXRoLmFmdGVyLm1hcChpID0+IF8uZ2V0KGZvdW5kLCBpKSkuZmluZChpID0+IGkpIDogXy5nZXQoZm91bmQsIGZpbmRlci5wYXRoLmFmdGVyKSkgfHwgZm91bmQ7XHJcblxyXG4gIHJldHVybiBmb3VuZDtcclxufVxyXG5cclxuXHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbGF6eUZpbmRCeUZpbmRlcihmaW5kZXIgPSB7fSkge1xyXG4gIGxldCBmb3VuZCA9IGF3YWl0IGxhenlGaW5kKGZpbmRlclRvRmlsdGVyKGZpbmRlciksIHsgc2VhcmNoRXhwb3J0czogZmFsc2UgfSk7XHJcblxyXG4gIGlmICghZm91bmQpIHJldHVybiBudWxsO1xyXG5cclxuICBpZiAoZmluZGVyLnBhdGg/LmJlZm9yZSkgZm91bmQgPSAoQXJyYXkuaXNBcnJheShmaW5kZXIucGF0aC5iZWZvcmUpID8gZmluZGVyLnBhdGguYmVmb3JlLm1hcChpID0+IF8uZ2V0KGZvdW5kLCBpKSkuZmluZChpID0+IGkpIDogXy5nZXQoZm91bmQsIGZpbmRlci5wYXRoLmJlZm9yZSkpIHx8IGZvdW5kO1xyXG4gIGlmIChmaW5kZXIuYXNzaWduKSBmb3VuZCA9IE9iamVjdC5hc3NpZ24oe30sIGZvdW5kKTtcclxuXHJcbiAgaWYgKCFmb3VuZCkgcmV0dXJuIG51bGw7XHJcblxyXG4gIGlmIChmaW5kZXIubWFwKSBmb3VuZCA9IGZpbmRlck1hcChmb3VuZCwgZmluZGVyLm1hcCk7XHJcblxyXG4gIGlmIChmaW5kZXIucGF0aD8uYWZ0ZXIpIGZvdW5kID0gKEFycmF5LmlzQXJyYXkoZmluZGVyLnBhdGguYWZ0ZXIpID8gZmluZGVyLnBhdGguYWZ0ZXIubWFwKGkgPT4gXy5nZXQoZm91bmQsIGkpKS5maW5kKGkgPT4gaSkgOiBfLmdldChmb3VuZCwgZmluZGVyLnBhdGguYWZ0ZXIpKSB8fCBmb3VuZDtcclxuXHJcbiAgcmV0dXJuIGZvdW5kO1xyXG59IiwgImltcG9ydCAqIGFzIGNvbXBsZXhGaW5kZXIgZnJvbSBcIi4vcmF3L2NvbXBsZXgtZmluZGVyLmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgX19jYWNoZV9fOiB7fSxcclxuICBnZXQgcmVxdWlyZSgpIHtcclxuICAgIGlmICh0aGlzLl9fY2FjaGVfXy5yZXF1aXJlKSByZXR1cm4gdGhpcy5fX2NhY2hlX18ucmVxdWlyZTtcclxuICAgIGxldCByZXFJZCA9IGBBY29yZFdlYnBhY2tNb2R1bGVzJHtEYXRlLm5vdygpfWA7XHJcbiAgICBjb25zdCByZXEgPSB3aW5kb3cud2VicGFja0NodW5rZGlzY29yZF9hcHAucHVzaChbW3JlcUlkXSwge30sIHJlcSA9PiByZXFdKTtcclxuICAgIGRlbGV0ZSByZXEubVtyZXFJZF07XHJcbiAgICBkZWxldGUgcmVxLmNbcmVxSWRdO1xyXG4gICAgd2luZG93LndlYnBhY2tDaHVua2Rpc2NvcmRfYXBwLnBvcCgpO1xyXG4gICAgdGhpcy5fX2NhY2hlX18ucmVxdWlyZSA9IHJlcTtcclxuICAgIHJldHVybiByZXE7XHJcbiAgfSxcclxuICBmaW5kKGZpbHRlciwgY29uZmlnID0ge30pIHtcclxuICAgIHJldHVybiBjb21wbGV4RmluZGVyLmZpbmQodGhpcy5yZXF1aXJlLCBjb21wbGV4RmluZGVyLndyYXBGaWx0ZXIoZmlsdGVyKSwgY29uZmlnKTtcclxuICB9LFxyXG4gIGxhenlGaW5kKGZpbHRlciwgY29uZmlnID0ge30pIHtcclxuICAgIHJldHVybiBjb21wbGV4RmluZGVyLmxhenlGaW5kKGNvbXBsZXhGaW5kZXIud3JhcEZpbHRlcihmaWx0ZXIpLCBjb25maWcpO1xyXG4gIH0sXHJcbiAgbGF6eUZpbmRCeUZpbmRlcihmaW5kZXIpIHtcclxuICAgIHJldHVybiBjb21wbGV4RmluZGVyLmxhenlGaW5kQnlGaW5kZXIoZmluZGVyKTtcclxuICB9LFxyXG4gIGZpbHRlcihmaWx0ZXIsIGNvbmZpZyA9IHt9KSB7XHJcbiAgICByZXR1cm4gY29tcGxleEZpbmRlci5maW5kKHRoaXMucmVxdWlyZSwgY29tcGxleEZpbmRlci53cmFwRmlsdGVyKGZpbHRlciksIHsgLi4uY29uZmlnLCBhbGw6IHRydWUgfSk7XHJcbiAgfSxcclxuICBmaW5kQnlGaW5kZXIoZmluZGVyKSB7XHJcbiAgICByZXR1cm4gY29tcGxleEZpbmRlci5maW5kQnlGaW5kZXIodGhpcy5yZXF1aXJlLCBmaW5kZXIpO1xyXG4gIH0sXHJcbiAgZmluZEJ5UHJvcGVydGllcyguLi5wcm9wcykge1xyXG4gICAgcmV0dXJuIHRoaXMuZmluZEJ5RmluZGVyKHtcclxuICAgICAgZmlsdGVyOiB7XHJcbiAgICAgICAgZXhwb3J0OiBmYWxzZSxcclxuICAgICAgICBpbjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgYnk6IFtwcm9wc11cclxuICAgICAgfSxcclxuICAgICAgcGF0aDoge1xyXG4gICAgICAgIGJlZm9yZTogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9LFxyXG4gIGZpbmRCeVByb3RvdHlwZXMoLi4ucHJvcHMpIHtcclxuICAgIHJldHVybiB0aGlzLmZpbmRCeUZpbmRlcih7XHJcbiAgICAgIGZpbHRlcjoge1xyXG4gICAgICAgIGV4cG9ydDogZmFsc2UsXHJcbiAgICAgICAgaW46IFwicHJvdG90eXBlc1wiLFxyXG4gICAgICAgIGJ5OiBbcHJvcHNdXHJcbiAgICAgIH0sXHJcbiAgICAgIHBhdGg6IHtcclxuICAgICAgICBiZWZvcmU6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSxcclxuICBmaW5kQnlTdHJpbmdzKC4uLnByb3BzKSB7XHJcbiAgICByZXR1cm4gdGhpcy5maW5kQnlGaW5kZXIoe1xyXG4gICAgICBmaWx0ZXI6IHtcclxuICAgICAgICBleHBvcnQ6IGZhbHNlLFxyXG4gICAgICAgIGluOiBcInN0cmluZ3NcIixcclxuICAgICAgICBieTogW3Byb3BzXVxyXG4gICAgICB9LFxyXG4gICAgICBwYXRoOiB7XHJcbiAgICAgICAgYmVmb3JlOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0sXHJcbn07IiwgImltcG9ydCBjb21tb25EYXRhIGZyb20gJy4uLy4uL2RhdGEvY29tbW9uLmpzb24nO1xyXG5pbXBvcnQgd2VicGFjayBmcm9tICcuL3dlYnBhY2suanMnO1xyXG5cclxuXHJcbmZ1bmN0aW9uIG1hcE9iamVjdCh0ZW1wLCBpbnApIHtcclxuICBpZiAoIXRlbXA/Ll9fY2FjaGVfXykgdGVtcC5fX2NhY2hlX18gPSB7fTtcclxuICBmb3IgKGNvbnN0IGtleSBpbiBpbnApIHtcclxuICAgIGlmIChpbnA/LltrZXldPy5fXyA9PT0gdHJ1ZSkge1xyXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGVtcCwga2V5LCB7XHJcbiAgICAgICAgZ2V0KCkge1xyXG4gICAgICAgICAgaWYgKHRlbXAuX19jYWNoZV9fW2tleV0pIHJldHVybiB0ZW1wLl9fY2FjaGVfX1trZXldO1xyXG4gICAgICAgICAgcmV0dXJuIHRlbXAuX19jYWNoZV9fW2tleV0gPSB3ZWJwYWNrLmZpbmRCeUZpbmRlcihpbnBba2V5XSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKHR5cGVvZiB0ZW1wW2tleV0gPT09IFwidW5kZWZpbmVkXCIpIHRlbXBba2V5XSA9IHt9O1xyXG4gICAgICBtYXBPYmplY3QodGVtcFtrZXldLCBpbnBba2V5XSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5cclxubGV0IGNvbW1vbiA9IHtcclxuICBfX2NhY2hlX186IHt9LFxyXG4gIExheWVyQWN0aW9uczoge1xyXG4gICAgcHVzaChjb21wb25lbnQpIHtcclxuICAgICAgY29tbW9uLkZsdXhEaXNwYXRjaGVyLmRpc3BhdGNoKHtcclxuICAgICAgICB0eXBlOiBcIkxBWUVSX1BVU0hcIixcclxuICAgICAgICBjb21wb25lbnRcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgcG9wKCkge1xyXG4gICAgICBjb21tb24uRmx1eERpc3BhdGNoZXIuZGlzcGF0Y2goe1xyXG4gICAgICAgIHR5cGU6IFwiTEFZRVJfUE9QXCJcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgcG9wQWxsKCkge1xyXG4gICAgICBjb21tb24uRmx1eERpc3BhdGNoZXIuZGlzcGF0Y2goe1xyXG4gICAgICAgIHR5cGU6IFwiTEFZRVJfUE9QX0FMTFwiXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0sXHJcbn07XHJcbm1hcE9iamVjdChjb21tb24sIGNvbW1vbkRhdGEuY29tbW9uKTtcclxue1xyXG4gIGxldCBwYXRocyA9IFtcclxuICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICBcImV4cG9ydHMuWlBcIixcclxuICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICBcImV4cG9ydHNcIlxyXG4gIF07XHJcbiAgd2VicGFjay5maWx0ZXIoKGkpID0+IGk/LmdldE5hbWU/LigpPy5lbmRzV2l0aD8uKFwiU3RvcmVcIiksIHsgZGVmYXVsdEV4cG9ydDogZmFsc2UgfSkuZm9yRWFjaCgobSkgPT4ge1xyXG4gICAgbGV0IG9iaiA9IHBhdGhzLm1hcChwYXRoID0+IF8uZ2V0KG0sIHBhdGgpKS5maW5kKGkgPT4gaSk7XHJcbiAgICBpZiAoIW9iaikgcmV0dXJuO1xyXG4gICAgbGV0IG5hbWUgPSBvYmo/LmdldE5hbWU/LigpO1xyXG4gICAgaWYgKCFuYW1lKSByZXR1cm47XHJcbiAgICBpZiAoY29tbW9uW25hbWVdKSByZXR1cm47XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvbW1vbiwgbmFtZSwge1xyXG4gICAgICBnZXQoKSB7XHJcbiAgICAgICAgaWYgKGNvbW1vbi5fX2NhY2hlX19bbmFtZV0pIHJldHVybiBjb21tb24uX19jYWNoZV9fW25hbWVdO1xyXG4gICAgICAgIHJldHVybiBjb21tb24uX19jYWNoZV9fW25hbWVdID0gb2JqO1xyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbW1vbjsiLCAiaW1wb3J0IGNvbW1vbiBmcm9tIFwiLi9jb21tb24uanNcIjtcclxuaW1wb3J0IHdlYnBhY2sgZnJvbSBcIi4vd2VicGFjay5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGNvbW1vbixcclxuICB3ZWJwYWNrLFxyXG4gIHJlcXVpcmU6IGdsb2JhbFRoaXNbXCI8UFJFTE9BRF9LRVk+XCJdLnJlcXVpcmUsXHJcbiAgbmF0aXZlOiBEaXNjb3JkTmF0aXZlLFxyXG59IiwgImltcG9ydCBtb2R1bGVzIGZyb20gXCIuLi9hcGkvbW9kdWxlcy9pbmRleC5qc1wiO1xyXG5cclxubGV0IGlzQ29ubmVjdGlvbk9wZW4gPSBmYWxzZTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB3YWl0VW50aWxDb25uZWN0aW9uT3BlbigpIHtcclxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuICAgIGlmIChpc0Nvbm5lY3Rpb25PcGVuKSByZXR1cm4gcmVzb2x2ZSh0cnVlKTtcclxuICAgIGZ1bmN0aW9uIG9uRXZlbnQoKSB7XHJcbiAgICAgIG1vZHVsZXMuY29tbW9uLkZsdXhEaXNwYXRjaGVyLnVuc3Vic2NyaWJlKFwiQ09OTkVDVElPTl9PUEVOXCIsIG9uRXZlbnQpO1xyXG4gICAgICBpc0Nvbm5lY3Rpb25PcGVuID0gdHJ1ZTtcclxuICAgICAgcmVzb2x2ZSh0cnVlKTtcclxuICAgIH1cclxuICAgIG1vZHVsZXMuY29tbW9uLkZsdXhEaXNwYXRjaGVyLnN1YnNjcmliZShcIkNPTk5FQ1RJT05fT1BFTlwiLCBvbkV2ZW50KTtcclxuICB9KTtcclxufSIsICJleHBvcnQgY2xhc3MgQmFzaWNFdmVudEVtaXR0ZXIge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgLyoqIEB0eXBlIHtNYXA8c3RyaW5nLCBNYXA8KC4uLmFyZ3M6IGFueVtdKT0+dm9pZCwge29uY2U6IGJvb2xlYW59Pj59ICovXHJcbiAgICB0aGlzLmxpc3RlbmVycyA9IG5ldyBNYXAoKTtcclxuICB9XHJcblxyXG4gIF9wcmVwYXJlTGlzdGVuZXJzTWFwKGV2ZW50TmFtZSkge1xyXG4gICAgaWYgKCF0aGlzLmxpc3RlbmVycy5oYXMoZXZlbnROYW1lKSlcclxuICAgICAgdGhpcy5saXN0ZW5lcnMuc2V0KGV2ZW50TmFtZSwgbmV3IE1hcCgpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudE5hbWVcclxuICAgKiBAcGFyYW0geyguLi5hcmdzOiBhbnlbXSk9PnZvaWR9IGxpc3RlbmVyXHJcbiAgICovXHJcbiAgb24oZXZlbnROYW1lLCBsaXN0ZW5lcikge1xyXG4gICAgdGhpcy5fcHJlcGFyZUxpc3RlbmVyc01hcChldmVudE5hbWUpO1xyXG4gICAgdGhpcy5saXN0ZW5lcnMuZ2V0KGV2ZW50TmFtZSkuc2V0KGxpc3RlbmVyLCB7IG9uY2U6IGZhbHNlIH0pO1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgdGhpcy5saXN0ZW5lcnMuZ2V0KGV2ZW50TmFtZSkuZGVsZXRlKGxpc3RlbmVyKTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnROYW1lXHJcbiAgICogQHBhcmFtIHsoLi4uYXJnczogYW55W10pPT52b2lkfSBsaXN0ZW5lclxyXG4gICAqL1xyXG4gIG9uY2UoZXZlbnROYW1lLCBsaXN0ZW5lcikge1xyXG4gICAgdGhpcy5fcHJlcGFyZUxpc3RlbmVyc01hcChldmVudE5hbWUpO1xyXG4gICAgdGhpcy5saXN0ZW5lcnMuZ2V0KGV2ZW50TmFtZSk/LnNldChsaXN0ZW5lciwgeyBvbmNlOiB0cnVlIH0pO1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgdGhpcy5saXN0ZW5lcnMuZ2V0KGV2ZW50TmFtZSkuZGVsZXRlKGxpc3RlbmVyKTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge3N0cmluZz99IGV2ZW50TmFtZVxyXG4gICAqIEBwYXJhbSB7KCguLi5hcmdzOiBhbnlbXSk9PnZvaWQpP30gbGlzdGVuZXJcclxuICAgKi9cclxuICBvZmYoZXZlbnROYW1lLCBsaXN0ZW5lcikge1xyXG4gICAgaWYgKCFldmVudE5hbWUpIHJldHVybiAodGhpcy5saXN0ZW5lcnMgPSBuZXcgTWFwKCkpO1xyXG4gICAgaWYgKCFsaXN0ZW5lcikgcmV0dXJuIHRoaXMubGlzdGVuZXJzPy5kZWxldGUoZXZlbnROYW1lKTtcclxuICAgIHRoaXMubGlzdGVuZXJzLmdldChldmVudE5hbWUpPy5kZWxldGUobGlzdGVuZXIpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50TmFtZVxyXG4gICAqIEBwYXJhbSAgey4uLmFueX0gYXJnc1xyXG4gICAqL1xyXG4gIGVtaXQoZXZlbnROYW1lLCAuLi5hcmdzKSB7XHJcbiAgICBpZiAoIXRoaXMubGlzdGVuZXJzLmhhcyhldmVudE5hbWUpKSByZXR1cm47XHJcbiAgICBsZXQgZXZlbnRNYXAgPSB0aGlzLmxpc3RlbmVycy5nZXQoZXZlbnROYW1lKTtcclxuICAgIGV2ZW50TWFwLmZvckVhY2goKHsgb25jZSB9LCBsaXN0ZW5lcikgPT4ge1xyXG4gICAgICBpZiAob25jZSkgZXZlbnRNYXA/LmRlbGV0ZShsaXN0ZW5lcik7XHJcbiAgICAgIGxpc3RlbmVyKC4uLmFyZ3MpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59O1xyXG4iLCAiaW1wb3J0IHsgQmFzaWNFdmVudEVtaXR0ZXIgfSBmcm9tIFwiLi4vLi4vbGliL0Jhc2ljRXZlbnRFbWl0dGVyLmpzXCI7XHJcblxyXG5jb25zdCBldmVudHMgPSBuZXcgQmFzaWNFdmVudEVtaXR0ZXIoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGV2ZW50czsiLCAiaW1wb3J0IGV2ZW50cyBmcm9tIFwiLi4vZXZlbnRzXCI7XHJcbmltcG9ydCB3ZWJwYWNrIGZyb20gXCIuLi9tb2R1bGVzL3dlYnBhY2suanNcIjtcclxuXHJcbmNvbnN0IHNjcm9sbGJhckNsYXNzZXMgPSB3ZWJwYWNrLmZpbmRCeVByb3BlcnRpZXMoXCJzY3JvbGxiYXJHaG9zdEhhaXJsaW5lXCIsIFwic3Bpbm5lclwiKTtcclxuXHJcbmNvbnN0IGZvcm1hdFJlZ2V4ZXMgPSB7XHJcbiAgYm9sZDogL1xcKlxcKihbXipdKylcXCpcXCovZyxcclxuICBpdGFsaWM6IC9cXCooW14qXSspXFwqL2csXHJcbiAgdW5kZXJsaW5lOiAvXFxfKFteKl0rKVxcXy9nLFxyXG4gIHN0cmlrZTogL1xcflxcfihbXipdKylcXH5cXH4vZyxcclxuICB1cmw6IC8oXFxiKGh0dHBzP3xmdHB8ZmlsZSk6XFwvXFwvWy1BLVowLTkrJkAjXFwvJT89fl98ITosLjtdKlstQS1aMC05KyZAI1xcLyU9fl98XSkvaWcsXHJcbiAgaW5saW5lOiAvXFxgKFteKl0rKVxcYC9nLFxyXG4gIGNvZGVibG9ja1NpbmdsZTogL1xcYFxcYFxcYChbXipdKylcXGBcXGBcXGAvZyxcclxuICBjb2RlYmxvY2tNdWx0aTogL1xcYFxcYFxcYChcXHcrKVxcbigoPzooPyFcXGBcXGBcXGApW1xcc1xcU10pKilcXGBcXGBcXGAvZ1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIHBhcnNlKGh0bWwpIHtcclxuICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgZGl2LmlubmVySFRNTCA9IGh0bWw7XHJcbiAgICByZXR1cm4gZGl2LmZpcnN0RWxlbWVudENoaWxkO1xyXG4gIH0sXHJcbiAgdG9DU1NQcm9wKG8pIHtcclxuICAgIGxldCBlbG0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgT2JqZWN0LmVudHJpZXMobykuZm9yRWFjaCgoaSkgPT4ge1xyXG4gICAgICBpZiAoZWxtLnN0eWxlLmhhc093blByb3BlcnR5KGlbMF0pKSB7XHJcbiAgICAgICAgZWxtLnN0eWxlW2lbMF1dID0gaVsxXTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBlbG0uc3R5bGUuc2V0UHJvcGVydHkoaVswXSwgaVsxXSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGVsbS5nZXRBdHRyaWJ1dGUoXCJzdHlsZVwiKTtcclxuICB9LFxyXG4gIHRvSFRNTFByb3BzKG8pIHtcclxuICAgIHJldHVybiBPYmplY3QuZW50cmllcyhvKVxyXG4gICAgICAubWFwKFxyXG4gICAgICAgIChpKSA9PlxyXG4gICAgICAgICAgYCR7aVswXS5yZXBsYWNlKC8gKy8sIFwiLVwiKX09XCIke2lbMF0gPT0gXCJzdHlsZVwiICYmIHR5cGVvZiBpWzFdICE9IFwic3RyaW5nXCJcclxuICAgICAgICAgICAgPyB0aGlzLnRvQ1NTUHJvcChpWzFdKVxyXG4gICAgICAgICAgICA6IHRoaXMuZXNjYXBlSFRNTChpWzFdKX1cImBcclxuICAgICAgKVxyXG4gICAgICAuam9pbihcIiBcIik7XHJcbiAgfSxcclxuICBlc2NhcGUoaHRtbCkge1xyXG4gICAgcmV0dXJuIG5ldyBPcHRpb24oaHRtbCkuaW5uZXJIVE1MO1xyXG4gIH0sXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtFbGVtZW50fSBlbG0gXHJcbiAgICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBzZWxlY3Rvck9yTnVtYmVyIFxyXG4gICAqIEByZXR1cm5zIHtFbGVtZW50W119XHJcbiAgICovXHJcbiAgcGFyZW50cyhlbG0sIHNlbGVjdG9yT3JOdW1iZXIpIHtcclxuICAgIGxldCBwYXJlbnRzID0gW107XHJcbiAgICBpZiAodHlwZW9mIHNlbGVjdG9yT3JOdW1iZXIgPT09IFwibnVtYmVyXCIpIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWxlY3Rvck9yTnVtYmVyOyBpKyspIHtcclxuICAgICAgICBpZiAoZWxtLnBhcmVudEVsZW1lbnQpIHtcclxuICAgICAgICAgIGVsbSA9IGVsbS5wYXJlbnRFbGVtZW50O1xyXG4gICAgICAgICAgcGFyZW50cy5wdXNoKGVsbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB3aGlsZSAoZWxtLnBhcmVudEVsZW1lbnQgJiYgZWxtLnBhcmVudEVsZW1lbnQuY2xvc2VzdChzZWxlY3Rvck9yTnVtYmVyKSkge1xyXG4gICAgICAgIGVsbSA9IGVsbS5wYXJlbnRFbGVtZW50LmNsb3Nlc3Qoc2VsZWN0b3JPck51bWJlcik7XHJcbiAgICAgICAgcGFyZW50cy5wdXNoKGVsbSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBwYXJlbnRzO1xyXG4gIH0sXHJcbiAgcGF0Y2g6IChzZWxlY3RvciwgY2IpID0+XHJcbiAgICAoKCkgPT4ge1xyXG4gICAgICBmdW5jdGlvbiBub2RlQWRkZWQobm9kZSkge1xyXG4gICAgICAgIGlmIChub2RlLm5vZGVUeXBlID09PSBOb2RlLlRFWFRfTk9ERSkgcmV0dXJuO1xyXG4gICAgICAgIG5vZGUucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikuZm9yRWFjaChhc3luYyAoZWxtKSA9PiB7XHJcbiAgICAgICAgICBpZiAoIWVsbS5hY29yZCkge1xyXG4gICAgICAgICAgICBlbG0uYWNvcmQgPSB7IHVubW91bnQ6IFtdLCBwYXRjaGVkOiBuZXcgU2V0KCkgfTtcclxuICAgICAgICAgICAgZWxtLmNsYXNzTGlzdC5hZGQoXCJhY29yZC0tcGF0Y2hlZFwiKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoZWxtLmFjb3JkLnBhdGNoZWQuaGFzKGNiKSkgcmV0dXJuO1xyXG4gICAgICAgICAgZWxtLmFjb3JkLnBhdGNoZWQuYWRkKGNiKTtcclxuXHJcbiAgICAgICAgICBsZXQgdW5QYXRjaENiID0gYXdhaXQgY2IoZWxtKTtcclxuICAgICAgICAgIGlmICh0eXBlb2YgdW5QYXRjaENiID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgICAgIGVsbS5hY29yZC51bm1vdW50LnB1c2godW5QYXRjaENiKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgZnVuY3Rpb24gbm9kZVJlbW92ZWQobm9kZSkge1xyXG4gICAgICAgIGlmIChub2RlLm5vZGVUeXBlID09PSBOb2RlLlRFWFRfTk9ERSkgcmV0dXJuO1xyXG4gICAgICAgIG5vZGUucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikuZm9yRWFjaChhc3luYyAoZWxtKSA9PiB7XHJcbiAgICAgICAgICBpZiAoIWVsbS5hY29yZCkgcmV0dXJuO1xyXG4gICAgICAgICAgZWxtLmFjb3JkLnVubW91bnQuZm9yRWFjaCgoZikgPT4gZigpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikuZm9yRWFjaChub2RlQWRkZWQpO1xyXG5cclxuICAgICAgcmV0dXJuIGV2ZW50cy5vbihcclxuICAgICAgICBcImRvbS1tdXRhdGlvblwiLFxyXG4gICAgICAgIC8qKiBAcGFyYW0ge011dGF0aW9uUmVjb3JkfSBtdXQgKi8obXV0KSA9PiB7XHJcbiAgICAgICAgICBpZiAobXV0LnR5cGUgPT09IFwiY2hpbGRMaXN0XCIpIHtcclxuICAgICAgICAgICAgbXV0LmFkZGVkTm9kZXMuZm9yRWFjaChub2RlQWRkZWQpO1xyXG4gICAgICAgICAgICBtdXQucmVtb3ZlZE5vZGVzLmZvckVhY2gobm9kZVJlbW92ZWQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgKTtcclxuICAgIH0pKCksXHJcbiAgZm9ybWF0Q29udGVudChtc2cpIHtcclxuICAgIGlmICghbXNnKSByZXR1cm4gJyc7XHJcbiAgICBjb25zdCB7IGJvbGQsIGl0YWxpYywgdW5kZXJsaW5lLCBzdHJpa2UsIGNvZGVibG9ja011bHRpLCBjb2RlYmxvY2tTaW5nbGUsIGlubGluZSwgdXJsIH0gPSBmb3JtYXRSZWdleGVzO1xyXG5cclxuICAgIGNvbnN0IGNvZGVCbG9ja3NNYXAgPSBPYmplY3QuZnJvbUVudHJpZXMoW1xyXG4gICAgICAuLi4obXNnLm1hdGNoQWxsKGNvZGVibG9ja011bHRpKSB8fCBbXSksIC4uLihtc2cubWF0Y2hBbGwoY29kZWJsb2NrU2luZ2xlKSB8fCBbXSlcclxuICAgIF0ubWFwKFxyXG4gICAgICAoW18sIGNvZGVCbG9ja09yQ29kZSwgY29kZUJsb2NrQ29udGVudF0sIGkpID0+IHtcclxuICAgICAgICBtc2cgPSBtc2cucmVwbGFjZShfLCBge3tDT0RFQkxPQ0tfJHtpfX19YCk7XHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgIGB7e0NPREVCTE9DS18ke2l9fX1gLFxyXG4gICAgICAgICAgY29kZUJsb2NrQ29udGVudCA/XHJcbiAgICAgICAgICAgIGA8cHJlPjxjb2RlIGNsYXNzPVwiJHtzY3JvbGxiYXJDbGFzc2VzLnNjcm9sbGJhckdob3N0SGFpcmxpbmV9IGhsanMgJHtjb2RlQmxvY2tPckNvZGV9XCIgc3R5bGU9XCJwb3NpdGlvbjogcmVsYXRpdmU7XCI+JHttb2R1bGVzLmNvbW1vbi5obGpzLmhpZ2hsaWdodChjb2RlQmxvY2tPckNvZGUsIGNvZGVCbG9ja0NvbnRlbnQpLnZhbHVlfTwvY29kZT48L3ByZT5gIDpcclxuICAgICAgICAgICAgYDxwcmU+PGNvZGUgY2xhc3M9XCIke3Njcm9sbGJhckNsYXNzZXMuc2Nyb2xsYmFyR2hvc3RIYWlybGluZX0gaGxqc1wiIHN0eWxlPVwicG9zaXRpb246IHJlbGF0aXZlO1wiPiR7Y29kZUJsb2NrT3JDb2RlfTwvY29kZT48L3ByZT5gXHJcbiAgICAgICAgXTtcclxuICAgICAgfVxyXG4gICAgKSk7XHJcblxyXG4gICAgY29uc3QgaW5saW5lTWFwID0gT2JqZWN0LmZyb21FbnRyaWVzKFxyXG4gICAgICBbLi4uKG1zZy5tYXRjaEFsbChpbmxpbmUpIHx8IFtdKV0ubWFwKFxyXG4gICAgICAgIChbXywgaW5saW5lQ29udGVudF0sIGkpID0+IHtcclxuICAgICAgICAgIG1zZyA9IG1zZy5yZXBsYWNlKF8sIGB7e0lOTElORV8ke2l9fX1gKTtcclxuICAgICAgICAgIHJldHVybiBbYHt7SU5MSU5FXyR7aX19fWAsIGA8Y29kZSBjbGFzcz1cImlubGluZVwiPiR7aW5saW5lQ29udGVudH08L2NvZGU+YF07XHJcbiAgICAgICAgfVxyXG4gICAgICApXHJcbiAgICApO1xyXG5cclxuICAgIG1zZyA9IG1zZy5yZXBsYWNlKGJvbGQsIFwiPGI+JDE8L2I+XCIpXHJcbiAgICAgIC5yZXBsYWNlKGl0YWxpYywgXCI8aT4kMTwvaT5cIilcclxuICAgICAgLnJlcGxhY2UodW5kZXJsaW5lLCBcIjxVPiQxPC9VPlwiKVxyXG4gICAgICAucmVwbGFjZShzdHJpa2UsIFwiPHM+JDE8L3M+XCIpXHJcbiAgICAgIC5yZXBsYWNlKHVybCwgJzxhIGhyZWY9XCIkMVwiPiQxPC9hPicpO1xyXG5cclxuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKGNvZGVCbG9ja3NNYXApKSB7XHJcbiAgICAgIG1zZyA9IG1zZy5yZXBsYWNlKGtleSwgdmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKGlubGluZU1hcCkpIHtcclxuICAgICAgbXNnID0gbXNnLnJlcGxhY2Uoa2V5LCB2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG1zZztcclxuICB9LFxyXG4gIHJlc29sdmUoaHRtbE9yRWxtKSB7XHJcbiAgICBpZiAoaHRtbE9yRWxtIGluc3RhbmNlb2YgRWxlbWVudCkgcmV0dXJuIGh0bWxPckVsbTtcclxuICAgIHJldHVybiB0aGlzLnBhcnNlKGh0bWxPckVsbSk7XHJcbiAgfVxyXG59XHJcblxyXG57XHJcbiAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigobXV0YXRpb25zKSA9PiB7XHJcbiAgICBtdXRhdGlvbnMuZm9yRWFjaCgobXV0YXRpb24pID0+IHtcclxuICAgICAgZXZlbnRzLmVtaXQoXCJkb20tbXV0YXRpb25cIiwgbXV0YXRpb24pO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbiAgb2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudCwge1xyXG4gICAgYXR0cmlidXRlczogdHJ1ZSxcclxuICAgIGNoaWxkTGlzdDogdHJ1ZSxcclxuICAgIHN1YnRyZWU6IHRydWVcclxuICB9KTtcclxufSIsICIvLyB3ZSB1c2UgdGhpcyBhcnJheSBtdWx0aXBsZSB0aW1lc1xyXG5leHBvcnQgY29uc3QgcGF0Y2hUeXBlcyA9IFtcImFcIiwgXCJiXCIsIFwiaVwiXTtcclxuZXhwb3J0IGNvbnN0IHBhdGNoZWRPYmplY3RzID0gbmV3IE1hcCgpO1xyXG4iLCAiLy8gY2FsbHMgcmVsZXZhbnQgcGF0Y2hlcyBhbmQgcmV0dXJucyB0aGUgZmluYWwgcmVzdWx0XHJcbmltcG9ydCB7IHBhdGNoZWRPYmplY3RzIH0gZnJvbSBcIi4vc2hhcmVkLmpzXCI7XHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChmdW5jTmFtZSwgZnVuY1BhcmVudCwgZnVuY0FyZ3MsIFxyXG4vLyB0aGUgdmFsdWUgb2YgYHRoaXNgIHRvIGFwcGx5XHJcbmN0eHQsIFxyXG4vLyBpZiB0cnVlLCB0aGUgZnVuY3Rpb24gaXMgYWN0dWFsbHkgY29uc3RydWN0b3JcclxuaXNDb25zdHJ1Y3QpIHtcclxuICAgIGNvbnN0IHBhdGNoID0gcGF0Y2hlZE9iamVjdHMuZ2V0KGZ1bmNQYXJlbnQpPy5bZnVuY05hbWVdO1xyXG4gICAgLy8gVGhpcyBpcyBpbiB0aGUgZXZlbnQgdGhhdCB0aGlzIGZ1bmN0aW9uIGlzIGJlaW5nIGNhbGxlZCBhZnRlciBhbGwgcGF0Y2hlcyBhcmUgcmVtb3ZlZC5cclxuICAgIGlmICghcGF0Y2gpXHJcbiAgICAgICAgcmV0dXJuIGlzQ29uc3RydWN0XHJcbiAgICAgICAgICAgID8gUmVmbGVjdC5jb25zdHJ1Y3QoZnVuY1BhcmVudFtmdW5jTmFtZV0sIGZ1bmNBcmdzLCBjdHh0KVxyXG4gICAgICAgICAgICA6IGZ1bmNQYXJlbnRbZnVuY05hbWVdLmFwcGx5KGN0eHQsIGZ1bmNBcmdzKTtcclxuICAgIC8vIEJlZm9yZSBwYXRjaGVzXHJcbiAgICBmb3IgKGNvbnN0IGhvb2sgb2YgcGF0Y2guYi52YWx1ZXMoKSkge1xyXG4gICAgICAgIGNvbnN0IG1heWJlZnVuY0FyZ3MgPSBob29rLmNhbGwoY3R4dCwgZnVuY0FyZ3MpO1xyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KG1heWJlZnVuY0FyZ3MpKVxyXG4gICAgICAgICAgICBmdW5jQXJncyA9IG1heWJlZnVuY0FyZ3M7XHJcbiAgICB9XHJcbiAgICAvLyBJbnN0ZWFkIHBhdGNoZXNcclxuICAgIGxldCBpbnN0ZWFkUGF0Y2hlZEZ1bmMgPSAoLi4uYXJncykgPT4gaXNDb25zdHJ1Y3RcclxuICAgICAgICA/IFJlZmxlY3QuY29uc3RydWN0KHBhdGNoLm8sIGFyZ3MsIGN0eHQpXHJcbiAgICAgICAgOiBwYXRjaC5vLmFwcGx5KGN0eHQsIGFyZ3MpO1xyXG4gICAgZm9yIChjb25zdCBjYWxsYmFjayBvZiBwYXRjaC5pLnZhbHVlcygpKSB7XHJcbiAgICAgICAgY29uc3Qgb2xkUGF0Y2hGdW5jID0gaW5zdGVhZFBhdGNoZWRGdW5jO1xyXG4gICAgICAgIGluc3RlYWRQYXRjaGVkRnVuYyA9ICguLi5hcmdzKSA9PiBjYWxsYmFjay5jYWxsKGN0eHQsIGFyZ3MsIG9sZFBhdGNoRnVuYyk7XHJcbiAgICB9XHJcbiAgICBsZXQgd29ya2luZ1JldFZhbCA9IGluc3RlYWRQYXRjaGVkRnVuYyguLi5mdW5jQXJncyk7XHJcbiAgICAvLyBBZnRlciBwYXRjaGVzXHJcbiAgICBmb3IgKGNvbnN0IGhvb2sgb2YgcGF0Y2guYS52YWx1ZXMoKSlcclxuICAgICAgICB3b3JraW5nUmV0VmFsID0gaG9vay5jYWxsKGN0eHQsIGZ1bmNBcmdzLCB3b3JraW5nUmV0VmFsKSA/PyB3b3JraW5nUmV0VmFsO1xyXG4gICAgcmV0dXJuIHdvcmtpbmdSZXRWYWw7XHJcbn1cclxuIiwgImltcG9ydCB7IHBhdGNoZWRPYmplY3RzLCBwYXRjaFR5cGVzIH0gZnJvbSBcIi4vc2hhcmVkLmpzXCI7XHJcbmV4cG9ydCBmdW5jdGlvbiB1blBhdGNoKGZ1bmNQYXJlbnQsIGZ1bmNOYW1lLCBob29rSWQsIHR5cGUpIHtcclxuICAgIGNvbnN0IHBhdGNoZWRPYmplY3QgPSBwYXRjaGVkT2JqZWN0cy5nZXQoZnVuY1BhcmVudCk7XHJcbiAgICBjb25zdCBwYXRjaCA9IHBhdGNoZWRPYmplY3Q/LltmdW5jTmFtZV07XHJcbiAgICBpZiAoIXBhdGNoPy5bdHlwZV0uaGFzKGhvb2tJZCkpXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgcGF0Y2hbdHlwZV0uZGVsZXRlKGhvb2tJZCk7XHJcbiAgICAvLyBJZiB0aGVyZSBhcmUgbm8gbW9yZSBob29rcyBmb3IgZXZlcnkgdHlwZSwgcmVtb3ZlIHRoZSBwYXRjaFxyXG4gICAgaWYgKHBhdGNoVHlwZXMuZXZlcnkoKHQpID0+IHBhdGNoW3RdLnNpemUgPT09IDApKSB7XHJcbiAgICAgICAgLy8gcmVmbGVjdCBkZWZpbmVwcm9wZXJ0eSBpcyBsaWtlIG9iamVjdCBkZWZpbmVwcm9wZXJ0eVxyXG4gICAgICAgIC8vIGJ1dCBpbnN0ZWFkIG9mIGVycm9yaW5nIGl0IHJldHVybnMgaWYgaXQgd29ya2VkIG9yIG5vdC5cclxuICAgICAgICAvLyB0aGlzIGlzIG1vcmUgZWFzaWx5IG1pbmlmaWFibGUsIGhlbmNlIGl0cyB1c2UuIC0tIHNpbmtcclxuICAgICAgICBjb25zdCBzdWNjZXNzID0gUmVmbGVjdC5kZWZpbmVQcm9wZXJ0eShmdW5jUGFyZW50LCBmdW5jTmFtZSwge1xyXG4gICAgICAgICAgICB2YWx1ZTogcGF0Y2gubyxcclxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoIXN1Y2Nlc3MpXHJcbiAgICAgICAgICAgIGZ1bmNQYXJlbnRbZnVuY05hbWVdID0gcGF0Y2gubztcclxuICAgICAgICBkZWxldGUgcGF0Y2hlZE9iamVjdFtmdW5jTmFtZV07XHJcbiAgICB9XHJcbiAgICBpZiAoT2JqZWN0LmtleXMocGF0Y2hlZE9iamVjdCkubGVuZ3RoID09IDApXHJcbiAgICAgICAgcGF0Y2hlZE9iamVjdHMuZGVsZXRlKGZ1bmNQYXJlbnQpO1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHVuUGF0Y2hBbGwoKSB7XHJcbiAgICBmb3IgKGNvbnN0IFtwYXJlbnRPYmplY3QsIHBhdGNoZWRPYmplY3RdIG9mIHBhdGNoZWRPYmplY3RzLmVudHJpZXMoKSlcclxuICAgICAgICBmb3IgKGNvbnN0IGZ1bmNOYW1lIGluIHBhdGNoZWRPYmplY3QpXHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgaG9va1R5cGUgb2YgcGF0Y2hUeXBlcylcclxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaG9va0lkIG9mIHBhdGNoZWRPYmplY3RbZnVuY05hbWVdPy5baG9va1R5cGVdLmtleXMoKSA/PyBbXSlcclxuICAgICAgICAgICAgICAgICAgICB1blBhdGNoKHBhcmVudE9iamVjdCwgZnVuY05hbWUsIGhvb2tJZCwgaG9va1R5cGUpO1xyXG59XHJcbiIsICIvLyBjdXJyaWVkIC0gZ2V0UGF0Y2hGdW5jKFwiYmVmb3JlXCIpKC4uLilcclxuLy8gYWxsb3dzIHVzIHRvIGFwcGx5IGFuIGFyZ3VtZW50IHdoaWxlIGxlYXZpbmcgdGhlIHJlc3Qgb3BlbiBtdWNoIGNsZWFuZXIuXHJcbi8vIGZ1bmN0aW9uYWwgcHJvZ3JhbW1pbmcgc3RyaWtlcyBhZ2FpbiEgLS0gc2lua1xyXG5pbXBvcnQgaG9vayBmcm9tIFwiLi9ob29rLmpzXCI7XHJcbmltcG9ydCB7IHBhdGNoZWRPYmplY3RzIH0gZnJvbSBcIi4vc2hhcmVkLmpzXCI7XHJcbmltcG9ydCB7IHVuUGF0Y2ggfSBmcm9tIFwiLi91bi1wYXRjaC5qc1wiO1xyXG4vLyBjcmVhdGVzIGEgaG9vayBpZiBuZWVkZWQsIGVsc2UganVzdCBhZGRzIG9uZSB0byB0aGUgcGF0Y2hlcyBhcnJheVxyXG5leHBvcnQgZGVmYXVsdCAocGF0Y2hUeXBlKSA9PiAoZnVuY05hbWUsIGZ1bmNQYXJlbnQsIGNhbGxiYWNrLCBvbmVUaW1lID0gZmFsc2UpID0+IHtcclxuICAgIGlmICh0eXBlb2YgZnVuY1BhcmVudFtmdW5jTmFtZV0gIT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7ZnVuY05hbWV9IGlzIG5vdCBhIGZ1bmN0aW9uIGluICR7ZnVuY1BhcmVudC5jb25zdHJ1Y3Rvci5uYW1lfWApO1xyXG4gICAgaWYgKCFwYXRjaGVkT2JqZWN0cy5oYXMoZnVuY1BhcmVudCkpXHJcbiAgICAgICAgcGF0Y2hlZE9iamVjdHMuc2V0KGZ1bmNQYXJlbnQsIHt9KTtcclxuICAgIGNvbnN0IHBhcmVudEluamVjdGlvbnMgPSBwYXRjaGVkT2JqZWN0cy5nZXQoZnVuY1BhcmVudCk7XHJcbiAgICBpZiAoIXBhcmVudEluamVjdGlvbnNbZnVuY05hbWVdKSB7XHJcbiAgICAgICAgY29uc3Qgb3JpZ0Z1bmMgPSBmdW5jUGFyZW50W2Z1bmNOYW1lXTtcclxuICAgICAgICAvLyBub3RlIHRvIGZ1dHVyZSBtZSBvcHRpbWlzaW5nIGZvciBzaXplOiBleHRyYWN0aW5nIG5ldyBNYXAoKSB0byBhIGZ1bmMgaW5jcmVhc2VzIHNpemUgLS1zaW5rXHJcbiAgICAgICAgcGFyZW50SW5qZWN0aW9uc1tmdW5jTmFtZV0gPSB7XHJcbiAgICAgICAgICAgIG86IG9yaWdGdW5jLFxyXG4gICAgICAgICAgICBiOiBuZXcgTWFwKCksXHJcbiAgICAgICAgICAgIGk6IG5ldyBNYXAoKSxcclxuICAgICAgICAgICAgYTogbmV3IE1hcCgpLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29uc3QgcnVuSG9vayA9IChjdHh0LCBhcmdzLCBjb25zdHJ1Y3QpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcmV0ID0gaG9vayhmdW5jTmFtZSwgZnVuY1BhcmVudCwgYXJncywgY3R4dCwgY29uc3RydWN0KTtcclxuICAgICAgICAgICAgaWYgKG9uZVRpbWUpXHJcbiAgICAgICAgICAgICAgICB1bnBhdGNoVGhpc1BhdGNoKCk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXQ7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCByZXBsYWNlUHJveHkgPSBuZXcgUHJveHkob3JpZ0Z1bmMsIHtcclxuICAgICAgICAgICAgYXBwbHk6IChfLCBjdHh0LCBhcmdzKSA9PiBydW5Ib29rKGN0eHQsIGFyZ3MsIGZhbHNlKSxcclxuICAgICAgICAgICAgY29uc3RydWN0OiAoXywgYXJncykgPT4gcnVuSG9vayhvcmlnRnVuYywgYXJncywgdHJ1ZSksXHJcbiAgICAgICAgICAgIGdldDogKHRhcmdldCwgcHJvcCwgcmVjZWl2ZXIpID0+IHByb3AgPT0gXCJ0b1N0cmluZ1wiXHJcbiAgICAgICAgICAgICAgICA/IG9yaWdGdW5jLnRvU3RyaW5nLmJpbmQob3JpZ0Z1bmMpXHJcbiAgICAgICAgICAgICAgICA6IFJlZmxlY3QuZ2V0KHRhcmdldCwgcHJvcCwgcmVjZWl2ZXIpLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIHRoaXMgd29ya3MgYXJvdW5kIGJyZWFraW5nIHNvbWUgYXN5bmMgZmluZCBpbXBsZW1lbnRhdGlvbiB3aGljaCBsaXN0ZW5zIGZvciBhc3NpZ25zIHZpYSBwcm94eVxyXG4gICAgICAgIC8vIHNlZSBjb21tZW50IGluIHVucGF0Y2gudHNcclxuICAgICAgICBjb25zdCBzdWNjZXNzID0gUmVmbGVjdC5kZWZpbmVQcm9wZXJ0eShmdW5jUGFyZW50LCBmdW5jTmFtZSwge1xyXG4gICAgICAgICAgICB2YWx1ZTogcmVwbGFjZVByb3h5LFxyXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICghc3VjY2VzcylcclxuICAgICAgICAgICAgZnVuY1BhcmVudFtmdW5jTmFtZV0gPSByZXBsYWNlUHJveHk7XHJcbiAgICAgICAgZnVuY1BhcmVudFtmdW5jTmFtZV0uX19vcmlnaW5hbF9fID0gcGFyZW50SW5qZWN0aW9uc1tmdW5jTmFtZV0ubztcclxuICAgIH1cclxuICAgIGNvbnN0IGhvb2tJZCA9IFN5bWJvbCgpO1xyXG4gICAgY29uc3QgdW5wYXRjaFRoaXNQYXRjaCA9ICgpID0+IHVuUGF0Y2goZnVuY1BhcmVudCwgZnVuY05hbWUsIGhvb2tJZCwgcGF0Y2hUeXBlKTtcclxuICAgIHBhcmVudEluamVjdGlvbnNbZnVuY05hbWVdW3BhdGNoVHlwZV0uc2V0KGhvb2tJZCwgY2FsbGJhY2spO1xyXG4gICAgcmV0dXJuIHVucGF0Y2hUaGlzUGF0Y2g7XHJcbn07XHJcbiIsICJpbXBvcnQgZ2V0UGF0Y2hGdW5jIGZyb20gXCIuL2dldC1wYXRjaC1mdW5jLmpzXCI7XHJcbmltcG9ydCB7IHVuUGF0Y2hBbGwgfSBmcm9tIFwiLi91bi1wYXRjaC5qc1wiO1xyXG5pbXBvcnQgeyBwYXRjaGVkT2JqZWN0cyBhcyBwYXRjaGVkIH0gZnJvbSBcIi4vc2hhcmVkLmpzXCI7XHJcbmNvbnN0IGJlZm9yZSA9IGdldFBhdGNoRnVuYyhcImJcIik7XHJcbmNvbnN0IGluc3RlYWQgPSBnZXRQYXRjaEZ1bmMoXCJpXCIpO1xyXG5jb25zdCBhZnRlciA9IGdldFBhdGNoRnVuYyhcImFcIik7XHJcbmV4cG9ydCB7IGluc3RlYWQsIGJlZm9yZSwgYWZ0ZXIsIHVuUGF0Y2hBbGwsIHBhdGNoZWQgfTtcclxuIiwgImltcG9ydCAqIGFzIHNwaXRSb2FzdCBmcm9tIFwiLi4vLi4vbGliL3NwaXRyb2FzdC9kaXN0L2VzbVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIF9fY2FjaGVfXzoge1xyXG4gICAgcGF0Y2hlZDogc3BpdFJvYXN0LnBhdGNoZWQsXHJcbiAgfSxcclxuICBiZWZvcmU6IHNwaXRSb2FzdC5iZWZvcmUsXHJcbiAgYWZ0ZXI6IHNwaXRSb2FzdC5hZnRlcixcclxuICBpbnN0ZWFkOiBzcGl0Um9hc3QuaW5zdGVhZCxcclxuICB1blBhdGNoQWxsOiBzcGl0Um9hc3QudW5QYXRjaEFsbCxcclxuICBpbmplY3RDU1MoY3NzKSB7XHJcbiAgICBjb25zdCBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcclxuICAgIHN0eWxlLmNsYXNzTmFtZSA9IGBhY29yZC0taW5qZWN0ZWQtY3NzYDtcclxuICAgIHN0eWxlLnRleHRDb250ZW50ID0gY3NzO1xyXG4gICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XHJcblxyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgc3R5bGU/LnJlbW92ZSgpO1xyXG4gICAgfTtcclxuICB9LFxyXG4gIHVuUGF0Y2hBbGxDU1MoKSB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmFjb3JkLS1pbmplY3RlZC1jc3NcIikuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgZWxlbWVudC5yZW1vdmUoKTtcclxuICAgIH0pXHJcbiAgfVxyXG59IiwgImV4cG9ydCBkZWZhdWx0IGBcbkBrZXlmcmFtZXMgYWNvcmRMb2FkaW5nRmFkZXswJXtvcGFjaXR5Oi4xfTEwMCV7b3BhY2l0eTouOX19LmFjb3JkLS1zdGFydHVwLWxvYWRpbmd7YW5pbWF0aW9uOmFjb3JkTG9hZGluZ0ZhZGUgLjVzIGFsdGVybmF0ZSBpbmZpbml0ZSBsaW5lYXI7cG9zaXRpb246YWJzb2x1dGU7dHJhbnNpdGlvbjphbGwgLjVzIGxpbmVhcjtyaWdodDo4cHg7Ym90dG9tOjhweDt3aWR0aDoxNnB4O2hlaWdodDoxNnB4O2JhY2tncm91bmQtaW1hZ2U6dXJsKFwiaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL0Fjb3JkUGx1Z2luL2Fzc2V0cy9tYWluL0Fjb3JkLnN2Z1wiKTtmaWx0ZXI6Z3JheXNjYWxlKDEpIGJyaWdodG5lc3MoMSk7YmFja2dyb3VuZC1wb3NpdGlvbjpjZW50ZXI7YmFja2dyb3VuZC1yZXBlYXQ6bm8tcmVwZWF0O2JhY2tncm91bmQtc2l6ZTpjb250YWluO3otaW5kZXg6OTk5OTk5fS5hY29yZC0tc3RhcnR1cC1sb2FkaW5nLmhpZGRlbntvcGFjaXR5OjAgIWltcG9ydGFudH1gO1xuIiwgImltcG9ydCBkb20gZnJvbSBcIi4uLy4uL2FwaS9kb20vaW5kZXguanNcIjtcclxuaW1wb3J0IHBhdGNoZXIgZnJvbSBcIi4uLy4uL2FwaS9wYXRjaGVyL2luZGV4LmpzXCI7XHJcblxyXG5pbXBvcnQgY3NzVGV4dCBmcm9tIFwiLi9zdHlsZS5zY3NzXCI7XHJcbmxldCB1bkluamVjdDtcclxuXHJcbmFzeW5jIGZ1bmN0aW9uIHNob3coKSB7XHJcbiAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWNvcmQtLXN0YXJ0dXAtbG9hZGluZ1wiKSkgcmV0dXJuO1xyXG4gIHdoaWxlICh0cnVlKSB7XHJcbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhcHAtbW91bnRcIikpIGJyZWFrO1xyXG4gICAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgMTAwKSk7XHJcbiAgfVxyXG4gIGNvbnNvbGUubG9nKFwiYWNvcmQtLXN0YXJ0dXAtbG9hZGluZ1wiKTtcclxuICB1bkluamVjdCA9IHBhdGNoZXIuaW5qZWN0Q1NTKGNzc1RleHQpO1xyXG4gIGNvbnN0IGVsZW1lbnQgPSBkb20ucGFyc2UoYFxyXG4gICAgPGRpdiBjbGFzcz1cImFjb3JkLS1zdGFydHVwLWxvYWRpbmdcIj48L2Rpdj5cclxuICBgKVxyXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYXBwLW1vdW50XCIpLmFwcGVuZENoaWxkKGVsZW1lbnQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBoaWRlKCkge1xyXG4gIGxldCBlbG0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFjb3JkLS1zdGFydHVwLWxvYWRpbmdcIik7XHJcbiAgaWYgKGVsbSkge1xyXG4gICAgZWxtLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgZWxtLnJlbW92ZSgpO1xyXG4gICAgICB1bkluamVjdD8uKCk7XHJcbiAgICAgIHVuSW5qZWN0ID0gbnVsbDtcclxuICAgIH0sIDUwMCk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgc2hvdyxcclxuICBoaWRlXHJcbn0iLCAibGV0IGRldk1vZGVFbmFibGVkID0gZmFsc2U7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgZ2V0IGVuYWJsZWQoKSB7XHJcbiAgICByZXR1cm4gZGV2TW9kZUVuYWJsZWQ7XHJcbiAgfSxcclxuICBzZXQgZW5hYmxlZCh2YWx1ZSkge1xyXG4gICAgaWYgKCFnbG9iYWxUaGlzW1wiPFBSRUxPQURfS0VZPlwiXS5pc0RldlRvb2xzT3BlbigpKSB0aHJvdyBuZXcgRXJyb3IoXCJEZXYgbW9kZSBzdGF0dXMgY2FuIG9ubHkgYmUgbW9kaWZpZWQgd2hlbiBEZXZUb29scyBpcyBvcGVuIVwiKTtcclxuICAgIGRldk1vZGVFbmFibGVkID0gdmFsdWU7XHJcbiAgfVxyXG59XHJcblxyXG4vLyBUT0RPOiBhZGQgbGl2ZSBkZXZlbG9wbWVudCBtb2RlIiwgImltcG9ydCBtb2R1bGVzIGZyb20gXCIuLi9tb2R1bGVzL2luZGV4LmpzXCJcclxuaW1wb3J0IHV0aWxzIGZyb20gXCIuLi91dGlscy9pbmRleC5qc1wiO1xyXG5cclxuY29uc3QgQkFTRV9VUkwgPSBcImh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9BY29yZFBsdWdpbi9pMThuL21haW5cIjtcclxuY29uc3Qgbm9TdG9yZSA9IHsgY2FjaGU6IFwibm8tc3RvcmVcIiB9O1xyXG5cclxuXHJcbmNvbnN0IG91dCA9IHtcclxuICBfX2NhY2hlX186IHtcclxuICAgIGxvY2FsZUlkczogW10sXHJcbiAgICBsb2NhbGl6YXRpb25zOiB7fVxyXG4gIH0sXHJcbiAgZ2V0IGxvY2FsZSgpIHtcclxuICAgIHJldHVybiBtb2R1bGVzLmNvbW1vbi5pMThuLl9yZXF1ZXN0ZWRMb2NhbGU7XHJcbiAgfSxcclxuICBnZXQoa2V5KSB7XHJcbiAgICBjaGVjaygpO1xyXG4gICAgcmV0dXJuIG91dC5fX2NhY2hlX18ubG9jYWxpemF0aW9uc1tvdXQubG9jYWxlXT8uW2tleV1cclxuICAgICAgfHwgb3V0Ll9fY2FjaGVfXy5sb2NhbGl6YXRpb25zLmRlZmF1bHQ/LltrZXldXHJcbiAgICAgIHx8IG1vZHVsZXMuY29tbW9uLmkxOG4uTWVzc2FnZXNba2V5XVxyXG4gICAgICB8fCBrZXk7XHJcbiAgfSxcclxuICBtZXNzYWdlczogbmV3IFByb3h5KHt9LCB7XHJcbiAgICBnZXQoXywgcHJvcCkge1xyXG4gICAgICByZXR1cm4gb3V0LmdldChwcm9wKTtcclxuICAgIH1cclxuICB9KSxcclxuICBsb2NhbGl6ZShzdHIpIHtcclxuICAgIGlmICh0eXBlb2Ygc3RyID09PSBcInN0cmluZ1wiKSByZXR1cm4gc3RyO1xyXG4gICAgcmV0dXJuIHN0cj8uW291dC5sb2NhbGVdXHJcbiAgICAgIHx8IHN0cj8uZGVmYXVsdFxyXG4gICAgICB8fCBPYmplY3QudmFsdWVzKHN0cilbMF07XHJcbiAgfSxcclxuICBmb3JtYXQoa2V5LCAuLi5hcmdzKSB7XHJcbiAgICByZXR1cm4gdXRpbHMuZm9ybWF0KG91dC5nZXQoa2V5KSwgLi4uYXJncyk7XHJcbiAgfVxyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBjaGVjaygpIHtcclxuICBjb25zdCBsb2NhbGUgPSBvdXQubG9jYWxlO1xyXG4gIGlmICghb3V0Ll9fY2FjaGVfXy5sb2NhbGVJZHMubGVuZ3RoKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBvdXQuX19jYWNoZV9fLmxvY2FsZUlkcyA9IGF3YWl0IChhd2FpdCBmZXRjaChgJHtCQVNFX1VSTH0vbG9jYWxlcy5qc29uYCwgbm9TdG9yZSkpLmpzb24oKTtcclxuICAgIH0gY2F0Y2ggeyB9XHJcbiAgICB0cnkge1xyXG4gICAgICBvdXQuX19jYWNoZV9fLmxvY2FsaXphdGlvbnMuZGVmYXVsdCA9IGF3YWl0IChhd2FpdCBmZXRjaChgJHtCQVNFX1VSTH0vZGVmYXVsdC5qc29uYCwgbm9TdG9yZSkpLmpzb24oKTtcclxuICAgIH0gY2F0Y2ggeyB9XHJcbiAgfVxyXG4gIGlmIChcclxuICAgIG91dC5fX2NhY2hlX18ubG9jYWxlSWRzLmluY2x1ZGVzKGxvY2FsZSlcclxuICAgICYmICFvdXQuX19jYWNoZV9fLmxvY2FsaXphdGlvbnM/Lltsb2NhbGVdXHJcbiAgKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBvdXQuX19jYWNoZV9fLmxvY2FsaXphdGlvbnNbbG9jYWxlXSA9IGF3YWl0IChhd2FpdCBmZXRjaChgJHtCQVNFX1VSTH0vJHtsb2NhbGV9Lmpzb25gLCBub1N0b3JlKSkuanNvbigpO1xyXG4gICAgfSBjYXRjaCB7IH07XHJcbiAgfVxyXG59XHJcblxyXG5jaGVjaygpO1xyXG5leHBvcnQgZGVmYXVsdCBvdXQ7IiwgImltcG9ydCAqIGFzIG5lc3RzIGZyb20gXCJuZXN0c1wiO1xyXG5pbXBvcnQgKiBhcyBpZGJLZXl2YWwgZnJvbSBcImlkYi1rZXl2YWxcIjtcclxuaW1wb3J0IHsgZGVDeWNsZWQsIHJldml2ZSB9IGZyb20gXCIuLi8uLi9saWIvanNvbi1kZWN5Y2xlZFwiO1xyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgYXN5bmMgY3JlYXRlUGVyc2lzdE5lc3Qoc3VmZml4KSB7XHJcbiAgICBsZXQgY2FjaGVkID0gYXdhaXQgaWRiS2V5dmFsLmdldChgQWNvcmRTdG9yZTske3N1ZmZpeH1gKTtcclxuICAgIGlmICh0eXBlb2YgY2FjaGVkID09IFwic3RyaW5nXCIpIGNhY2hlZCA9IHJldml2ZShjYWNoZWQpO1xyXG4gICAgY29uc3QgbmVzdCA9IG5lc3RzLm1ha2UoY2FjaGVkID8/IHt9KTtcclxuXHJcbiAgICBjb25zdCBzYXZlID0gKCkgPT4ge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGlkYktleXZhbC5zZXQoYEFjb3JkU3RvcmU7JHtzdWZmaXh9YCwgZGVDeWNsZWQoeyAuLi5uZXN0Lmdob3N0IH0pKTtcclxuICAgICAgfSBjYXRjaCB7XHJcbiAgICAgICAgaWRiS2V5dmFsLnNldChgQWNvcmRTdG9yZTske3N1ZmZpeH1gLCBkZUN5Y2xlZCh7fSkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbmVzdC5vbihuZXN0cy5FdmVudHMuU0VULCBzYXZlKTtcclxuICAgIG5lc3Qub24obmVzdHMuRXZlbnRzLlVQREFURSwgc2F2ZSk7XHJcbiAgICBuZXN0Lm9uKG5lc3RzLkV2ZW50cy5ERUxFVEUsIHNhdmUpO1xyXG5cclxuICAgIHJldHVybiBuZXN0O1xyXG4gIH1cclxufSIsICJmdW5jdGlvbiBwcm9taXNpZnlSZXF1ZXN0KHJlcXVlc3QpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAvLyBAdHMtaWdub3JlIC0gZmlsZSBzaXplIGhhY2tzXG4gICAgICAgIHJlcXVlc3Qub25jb21wbGV0ZSA9IHJlcXVlc3Qub25zdWNjZXNzID0gKCkgPT4gcmVzb2x2ZShyZXF1ZXN0LnJlc3VsdCk7XG4gICAgICAgIC8vIEB0cy1pZ25vcmUgLSBmaWxlIHNpemUgaGFja3NcbiAgICAgICAgcmVxdWVzdC5vbmFib3J0ID0gcmVxdWVzdC5vbmVycm9yID0gKCkgPT4gcmVqZWN0KHJlcXVlc3QuZXJyb3IpO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gY3JlYXRlU3RvcmUoZGJOYW1lLCBzdG9yZU5hbWUpIHtcbiAgICBjb25zdCByZXF1ZXN0ID0gaW5kZXhlZERCLm9wZW4oZGJOYW1lKTtcbiAgICByZXF1ZXN0Lm9udXBncmFkZW5lZWRlZCA9ICgpID0+IHJlcXVlc3QucmVzdWx0LmNyZWF0ZU9iamVjdFN0b3JlKHN0b3JlTmFtZSk7XG4gICAgY29uc3QgZGJwID0gcHJvbWlzaWZ5UmVxdWVzdChyZXF1ZXN0KTtcbiAgICByZXR1cm4gKHR4TW9kZSwgY2FsbGJhY2spID0+IGRicC50aGVuKChkYikgPT4gY2FsbGJhY2soZGIudHJhbnNhY3Rpb24oc3RvcmVOYW1lLCB0eE1vZGUpLm9iamVjdFN0b3JlKHN0b3JlTmFtZSkpKTtcbn1cbmxldCBkZWZhdWx0R2V0U3RvcmVGdW5jO1xuZnVuY3Rpb24gZGVmYXVsdEdldFN0b3JlKCkge1xuICAgIGlmICghZGVmYXVsdEdldFN0b3JlRnVuYykge1xuICAgICAgICBkZWZhdWx0R2V0U3RvcmVGdW5jID0gY3JlYXRlU3RvcmUoJ2tleXZhbC1zdG9yZScsICdrZXl2YWwnKTtcbiAgICB9XG4gICAgcmV0dXJuIGRlZmF1bHRHZXRTdG9yZUZ1bmM7XG59XG4vKipcbiAqIEdldCBhIHZhbHVlIGJ5IGl0cyBrZXkuXG4gKlxuICogQHBhcmFtIGtleVxuICogQHBhcmFtIGN1c3RvbVN0b3JlIE1ldGhvZCB0byBnZXQgYSBjdXN0b20gc3RvcmUuIFVzZSB3aXRoIGNhdXRpb24gKHNlZSB0aGUgZG9jcykuXG4gKi9cbmZ1bmN0aW9uIGdldChrZXksIGN1c3RvbVN0b3JlID0gZGVmYXVsdEdldFN0b3JlKCkpIHtcbiAgICByZXR1cm4gY3VzdG9tU3RvcmUoJ3JlYWRvbmx5JywgKHN0b3JlKSA9PiBwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLmdldChrZXkpKSk7XG59XG4vKipcbiAqIFNldCBhIHZhbHVlIHdpdGggYSBrZXkuXG4gKlxuICogQHBhcmFtIGtleVxuICogQHBhcmFtIHZhbHVlXG4gKiBAcGFyYW0gY3VzdG9tU3RvcmUgTWV0aG9kIHRvIGdldCBhIGN1c3RvbSBzdG9yZS4gVXNlIHdpdGggY2F1dGlvbiAoc2VlIHRoZSBkb2NzKS5cbiAqL1xuZnVuY3Rpb24gc2V0KGtleSwgdmFsdWUsIGN1c3RvbVN0b3JlID0gZGVmYXVsdEdldFN0b3JlKCkpIHtcbiAgICByZXR1cm4gY3VzdG9tU3RvcmUoJ3JlYWR3cml0ZScsIChzdG9yZSkgPT4ge1xuICAgICAgICBzdG9yZS5wdXQodmFsdWUsIGtleSk7XG4gICAgICAgIHJldHVybiBwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLnRyYW5zYWN0aW9uKTtcbiAgICB9KTtcbn1cbi8qKlxuICogU2V0IG11bHRpcGxlIHZhbHVlcyBhdCBvbmNlLiBUaGlzIGlzIGZhc3RlciB0aGFuIGNhbGxpbmcgc2V0KCkgbXVsdGlwbGUgdGltZXMuXG4gKiBJdCdzIGFsc28gYXRvbWljIFx1MjAxMyBpZiBvbmUgb2YgdGhlIHBhaXJzIGNhbid0IGJlIGFkZGVkLCBub25lIHdpbGwgYmUgYWRkZWQuXG4gKlxuICogQHBhcmFtIGVudHJpZXMgQXJyYXkgb2YgZW50cmllcywgd2hlcmUgZWFjaCBlbnRyeSBpcyBhbiBhcnJheSBvZiBgW2tleSwgdmFsdWVdYC5cbiAqIEBwYXJhbSBjdXN0b21TdG9yZSBNZXRob2QgdG8gZ2V0IGEgY3VzdG9tIHN0b3JlLiBVc2Ugd2l0aCBjYXV0aW9uIChzZWUgdGhlIGRvY3MpLlxuICovXG5mdW5jdGlvbiBzZXRNYW55KGVudHJpZXMsIGN1c3RvbVN0b3JlID0gZGVmYXVsdEdldFN0b3JlKCkpIHtcbiAgICByZXR1cm4gY3VzdG9tU3RvcmUoJ3JlYWR3cml0ZScsIChzdG9yZSkgPT4ge1xuICAgICAgICBlbnRyaWVzLmZvckVhY2goKGVudHJ5KSA9PiBzdG9yZS5wdXQoZW50cnlbMV0sIGVudHJ5WzBdKSk7XG4gICAgICAgIHJldHVybiBwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLnRyYW5zYWN0aW9uKTtcbiAgICB9KTtcbn1cbi8qKlxuICogR2V0IG11bHRpcGxlIHZhbHVlcyBieSB0aGVpciBrZXlzXG4gKlxuICogQHBhcmFtIGtleXNcbiAqIEBwYXJhbSBjdXN0b21TdG9yZSBNZXRob2QgdG8gZ2V0IGEgY3VzdG9tIHN0b3JlLiBVc2Ugd2l0aCBjYXV0aW9uIChzZWUgdGhlIGRvY3MpLlxuICovXG5mdW5jdGlvbiBnZXRNYW55KGtleXMsIGN1c3RvbVN0b3JlID0gZGVmYXVsdEdldFN0b3JlKCkpIHtcbiAgICByZXR1cm4gY3VzdG9tU3RvcmUoJ3JlYWRvbmx5JywgKHN0b3JlKSA9PiBQcm9taXNlLmFsbChrZXlzLm1hcCgoa2V5KSA9PiBwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLmdldChrZXkpKSkpKTtcbn1cbi8qKlxuICogVXBkYXRlIGEgdmFsdWUuIFRoaXMgbGV0cyB5b3Ugc2VlIHRoZSBvbGQgdmFsdWUgYW5kIHVwZGF0ZSBpdCBhcyBhbiBhdG9taWMgb3BlcmF0aW9uLlxuICpcbiAqIEBwYXJhbSBrZXlcbiAqIEBwYXJhbSB1cGRhdGVyIEEgY2FsbGJhY2sgdGhhdCB0YWtlcyB0aGUgb2xkIHZhbHVlIGFuZCByZXR1cm5zIGEgbmV3IHZhbHVlLlxuICogQHBhcmFtIGN1c3RvbVN0b3JlIE1ldGhvZCB0byBnZXQgYSBjdXN0b20gc3RvcmUuIFVzZSB3aXRoIGNhdXRpb24gKHNlZSB0aGUgZG9jcykuXG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZShrZXksIHVwZGF0ZXIsIGN1c3RvbVN0b3JlID0gZGVmYXVsdEdldFN0b3JlKCkpIHtcbiAgICByZXR1cm4gY3VzdG9tU3RvcmUoJ3JlYWR3cml0ZScsIChzdG9yZSkgPT4gXG4gICAgLy8gTmVlZCB0byBjcmVhdGUgdGhlIHByb21pc2UgbWFudWFsbHkuXG4gICAgLy8gSWYgSSB0cnkgdG8gY2hhaW4gcHJvbWlzZXMsIHRoZSB0cmFuc2FjdGlvbiBjbG9zZXMgaW4gYnJvd3NlcnNcbiAgICAvLyB0aGF0IHVzZSBhIHByb21pc2UgcG9seWZpbGwgKElFMTAvMTEpLlxuICAgIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgc3RvcmUuZ2V0KGtleSkub25zdWNjZXNzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBzdG9yZS5wdXQodXBkYXRlcih0aGlzLnJlc3VsdCksIGtleSk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLnRyYW5zYWN0aW9uKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSkpO1xufVxuLyoqXG4gKiBEZWxldGUgYSBwYXJ0aWN1bGFyIGtleSBmcm9tIHRoZSBzdG9yZS5cbiAqXG4gKiBAcGFyYW0ga2V5XG4gKiBAcGFyYW0gY3VzdG9tU3RvcmUgTWV0aG9kIHRvIGdldCBhIGN1c3RvbSBzdG9yZS4gVXNlIHdpdGggY2F1dGlvbiAoc2VlIHRoZSBkb2NzKS5cbiAqL1xuZnVuY3Rpb24gZGVsKGtleSwgY3VzdG9tU3RvcmUgPSBkZWZhdWx0R2V0U3RvcmUoKSkge1xuICAgIHJldHVybiBjdXN0b21TdG9yZSgncmVhZHdyaXRlJywgKHN0b3JlKSA9PiB7XG4gICAgICAgIHN0b3JlLmRlbGV0ZShrZXkpO1xuICAgICAgICByZXR1cm4gcHJvbWlzaWZ5UmVxdWVzdChzdG9yZS50cmFuc2FjdGlvbik7XG4gICAgfSk7XG59XG4vKipcbiAqIERlbGV0ZSBtdWx0aXBsZSBrZXlzIGF0IG9uY2UuXG4gKlxuICogQHBhcmFtIGtleXMgTGlzdCBvZiBrZXlzIHRvIGRlbGV0ZS5cbiAqIEBwYXJhbSBjdXN0b21TdG9yZSBNZXRob2QgdG8gZ2V0IGEgY3VzdG9tIHN0b3JlLiBVc2Ugd2l0aCBjYXV0aW9uIChzZWUgdGhlIGRvY3MpLlxuICovXG5mdW5jdGlvbiBkZWxNYW55KGtleXMsIGN1c3RvbVN0b3JlID0gZGVmYXVsdEdldFN0b3JlKCkpIHtcbiAgICByZXR1cm4gY3VzdG9tU3RvcmUoJ3JlYWR3cml0ZScsIChzdG9yZSkgPT4ge1xuICAgICAgICBrZXlzLmZvckVhY2goKGtleSkgPT4gc3RvcmUuZGVsZXRlKGtleSkpO1xuICAgICAgICByZXR1cm4gcHJvbWlzaWZ5UmVxdWVzdChzdG9yZS50cmFuc2FjdGlvbik7XG4gICAgfSk7XG59XG4vKipcbiAqIENsZWFyIGFsbCB2YWx1ZXMgaW4gdGhlIHN0b3JlLlxuICpcbiAqIEBwYXJhbSBjdXN0b21TdG9yZSBNZXRob2QgdG8gZ2V0IGEgY3VzdG9tIHN0b3JlLiBVc2Ugd2l0aCBjYXV0aW9uIChzZWUgdGhlIGRvY3MpLlxuICovXG5mdW5jdGlvbiBjbGVhcihjdXN0b21TdG9yZSA9IGRlZmF1bHRHZXRTdG9yZSgpKSB7XG4gICAgcmV0dXJuIGN1c3RvbVN0b3JlKCdyZWFkd3JpdGUnLCAoc3RvcmUpID0+IHtcbiAgICAgICAgc3RvcmUuY2xlYXIoKTtcbiAgICAgICAgcmV0dXJuIHByb21pc2lmeVJlcXVlc3Qoc3RvcmUudHJhbnNhY3Rpb24pO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gZWFjaEN1cnNvcihzdG9yZSwgY2FsbGJhY2spIHtcbiAgICBzdG9yZS5vcGVuQ3Vyc29yKCkub25zdWNjZXNzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXRoaXMucmVzdWx0KVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjYWxsYmFjayh0aGlzLnJlc3VsdCk7XG4gICAgICAgIHRoaXMucmVzdWx0LmNvbnRpbnVlKCk7XG4gICAgfTtcbiAgICByZXR1cm4gcHJvbWlzaWZ5UmVxdWVzdChzdG9yZS50cmFuc2FjdGlvbik7XG59XG4vKipcbiAqIEdldCBhbGwga2V5cyBpbiB0aGUgc3RvcmUuXG4gKlxuICogQHBhcmFtIGN1c3RvbVN0b3JlIE1ldGhvZCB0byBnZXQgYSBjdXN0b20gc3RvcmUuIFVzZSB3aXRoIGNhdXRpb24gKHNlZSB0aGUgZG9jcykuXG4gKi9cbmZ1bmN0aW9uIGtleXMoY3VzdG9tU3RvcmUgPSBkZWZhdWx0R2V0U3RvcmUoKSkge1xuICAgIHJldHVybiBjdXN0b21TdG9yZSgncmVhZG9ubHknLCAoc3RvcmUpID0+IHtcbiAgICAgICAgLy8gRmFzdCBwYXRoIGZvciBtb2Rlcm4gYnJvd3NlcnNcbiAgICAgICAgaWYgKHN0b3JlLmdldEFsbEtleXMpIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLmdldEFsbEtleXMoKSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaXRlbXMgPSBbXTtcbiAgICAgICAgcmV0dXJuIGVhY2hDdXJzb3Ioc3RvcmUsIChjdXJzb3IpID0+IGl0ZW1zLnB1c2goY3Vyc29yLmtleSkpLnRoZW4oKCkgPT4gaXRlbXMpO1xuICAgIH0pO1xufVxuLyoqXG4gKiBHZXQgYWxsIHZhbHVlcyBpbiB0aGUgc3RvcmUuXG4gKlxuICogQHBhcmFtIGN1c3RvbVN0b3JlIE1ldGhvZCB0byBnZXQgYSBjdXN0b20gc3RvcmUuIFVzZSB3aXRoIGNhdXRpb24gKHNlZSB0aGUgZG9jcykuXG4gKi9cbmZ1bmN0aW9uIHZhbHVlcyhjdXN0b21TdG9yZSA9IGRlZmF1bHRHZXRTdG9yZSgpKSB7XG4gICAgcmV0dXJuIGN1c3RvbVN0b3JlKCdyZWFkb25seScsIChzdG9yZSkgPT4ge1xuICAgICAgICAvLyBGYXN0IHBhdGggZm9yIG1vZGVybiBicm93c2Vyc1xuICAgICAgICBpZiAoc3RvcmUuZ2V0QWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzaWZ5UmVxdWVzdChzdG9yZS5nZXRBbGwoKSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaXRlbXMgPSBbXTtcbiAgICAgICAgcmV0dXJuIGVhY2hDdXJzb3Ioc3RvcmUsIChjdXJzb3IpID0+IGl0ZW1zLnB1c2goY3Vyc29yLnZhbHVlKSkudGhlbigoKSA9PiBpdGVtcyk7XG4gICAgfSk7XG59XG4vKipcbiAqIEdldCBhbGwgZW50cmllcyBpbiB0aGUgc3RvcmUuIEVhY2ggZW50cnkgaXMgYW4gYXJyYXkgb2YgYFtrZXksIHZhbHVlXWAuXG4gKlxuICogQHBhcmFtIGN1c3RvbVN0b3JlIE1ldGhvZCB0byBnZXQgYSBjdXN0b20gc3RvcmUuIFVzZSB3aXRoIGNhdXRpb24gKHNlZSB0aGUgZG9jcykuXG4gKi9cbmZ1bmN0aW9uIGVudHJpZXMoY3VzdG9tU3RvcmUgPSBkZWZhdWx0R2V0U3RvcmUoKSkge1xuICAgIHJldHVybiBjdXN0b21TdG9yZSgncmVhZG9ubHknLCAoc3RvcmUpID0+IHtcbiAgICAgICAgLy8gRmFzdCBwYXRoIGZvciBtb2Rlcm4gYnJvd3NlcnNcbiAgICAgICAgLy8gKGFsdGhvdWdoLCBob3BlZnVsbHkgd2UnbGwgZ2V0IGEgc2ltcGxlciBwYXRoIHNvbWUgZGF5KVxuICAgICAgICBpZiAoc3RvcmUuZ2V0QWxsICYmIHN0b3JlLmdldEFsbEtleXMpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICAgICAgcHJvbWlzaWZ5UmVxdWVzdChzdG9yZS5nZXRBbGxLZXlzKCkpLFxuICAgICAgICAgICAgICAgIHByb21pc2lmeVJlcXVlc3Qoc3RvcmUuZ2V0QWxsKCkpLFxuICAgICAgICAgICAgXSkudGhlbigoW2tleXMsIHZhbHVlc10pID0+IGtleXMubWFwKChrZXksIGkpID0+IFtrZXksIHZhbHVlc1tpXV0pKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpdGVtcyA9IFtdO1xuICAgICAgICByZXR1cm4gY3VzdG9tU3RvcmUoJ3JlYWRvbmx5JywgKHN0b3JlKSA9PiBlYWNoQ3Vyc29yKHN0b3JlLCAoY3Vyc29yKSA9PiBpdGVtcy5wdXNoKFtjdXJzb3Iua2V5LCBjdXJzb3IudmFsdWVdKSkudGhlbigoKSA9PiBpdGVtcykpO1xuICAgIH0pO1xufVxuXG5leHBvcnQgeyBjbGVhciwgY3JlYXRlU3RvcmUsIGRlbCwgZGVsTWFueSwgZW50cmllcywgZ2V0LCBnZXRNYW55LCBrZXlzLCBwcm9taXNpZnlSZXF1ZXN0LCBzZXQsIHNldE1hbnksIHVwZGF0ZSwgdmFsdWVzIH07XG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5mdW5jdGlvbiBkZUN5Y2xlcih2YWwsIGNvbmZpZykge1xyXG4gIGNvbmZpZyA9IHR5cGVvZiBjb25maWcgPT09ICdudW1iZXInID8geyBkZWVwOiBjb25maWcgfSA6IChjb25maWcgfHwge30pO1xyXG4gIGNvbmZpZy5kZWVwID0gY29uZmlnLmRlZXAgfHwgMTA7XHJcbiAgcmV0dXJuIGRlY3ljbGVXYWxrZXIoW10sIFtdLCB2YWwsIGNvbmZpZyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRlQ3ljbGVkKHZhbCwgY29uZmlnKSB7XHJcbiAgY29uZmlnID0gdHlwZW9mIGNvbmZpZyA9PT0gJ251bWJlcicgPyB7IGRlZXA6IGNvbmZpZyB9IDogKGNvbmZpZyB8fCB7fSk7XHJcbiAgdmFsID0gZGVDeWNsZXIodmFsLCBjb25maWcpO1xyXG4gIHRyeSB7XHJcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodmFsLCB1bmRlZmluZWQsIGNvbmZpZy5zcGFjZXIpO1xyXG4gIH0gY2F0Y2ggKGUpIHtcclxuICAgIHJldHVybiBlO1xyXG4gIH1cclxufVxyXG5cclxudmFyIHJldml2ZXJEYXRlID0gL15cXFtEYXRlOigoXFxkezR9LVxcZHsyfS1cXGR7Mn0pW0EtWl0rKFxcZHsyfTpcXGR7Mn06XFxkezJ9KS4oWzAtOSstOl0rKVopXFxdJC87XHJcbnZhciByZXZpdmVyUmVnRXhwID0gL15cXFtSZWdleHA6XFwvKC4rKVxcL1xcXSQvO1xyXG52YXIgcmV2aXZlckVycm9yID0gL15cXFtFcnJvcjooW1xcV1xcd10rKVxcXSQvO1xyXG52YXIgcmV2aXZlckZ1bmN0aW9uID0gL15cXFtGdW5jdGlvbjooLispXFxdJC87XHJcbmZ1bmN0aW9uIHJldml2ZSh2YWwsIGZ1bmN0aW9ucykge1xyXG4gIHRyeSB7XHJcbiAgICByZXR1cm4gSlNPTi5wYXJzZSh2YWwsIHJldml2ZXIpO1xyXG4gIH0gY2F0Y2ggKGUpIHtcclxuICAgIHJldHVybiBlO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcmV2aXZlcihrZXksIHZhbCkge1xyXG4gICAgaWYgKHJldml2ZXJEYXRlLnRlc3QodmFsKSkge1xyXG4gICAgICB2YWwgPSByZXZpdmVyRGF0ZS5leGVjKHZhbCk7XHJcbiAgICAgIHZhbCA9IG5ldyBEYXRlKHZhbFsxXSk7XHJcbiAgICAgIHJldHVybiBuZXcgRGF0ZSh2YWwpO1xyXG4gICAgfSBlbHNlIGlmIChyZXZpdmVyUmVnRXhwLnRlc3QodmFsKSkge1xyXG4gICAgICB2YWwgPSByZXZpdmVyUmVnRXhwLmV4ZWModmFsKVsxXTtcclxuICAgICAgcmV0dXJuIG5ldyBSZWdFeHAodmFsKTtcclxuICAgIH0gZWxzZSBpZiAocmV2aXZlckVycm9yLnRlc3QodmFsKSkge1xyXG4gICAgICB2YWwgPSByZXZpdmVyRXJyb3IuZXhlYyh2YWwpWzFdO1xyXG4gICAgICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IodmFsLnNwbGl0KCdcXG4nKVswXSk7XHJcbiAgICAgIGlmIChlcnJvci5zdGFjaykge1xyXG4gICAgICAgIGVycm9yLnN0YWNrID0gdmFsO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBlcnJvcjtcclxuICAgIH0gZWxzZSBpZiAoZnVuY3Rpb25zICYmIHJldml2ZXJGdW5jdGlvbi50ZXN0KHZhbCkpIHtcclxuICAgICAgdmFsID0gcmV2aXZlckZ1bmN0aW9uLmV4ZWModmFsKVsxXTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICByZXR1cm4gKG5ldyBGdW5jdGlvbihcInJldHVybiBcIiArIHZhbCArIFwiO1wiKSkoKTtcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICByZXR1cm4gZXJyb3I7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB2YWw7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBkZWN5Y2xlV2Fsa2VyKHBhcmVudHMsIHBhdGgsIHZhbCwgY29uZmlnKSB7XHJcbiAgaWYgKFsndW5kZWZpbmVkJywgJ251bWJlcicsICdib29sZWFuJywgJ3N0cmluZyddLmluZGV4T2YodHlwZW9mIHZhbCkgPj0gMCB8fCB2YWwgPT09IG51bGwpIHtcclxuICAgIHJldHVybiB2YWw7XHJcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnb2JqZWN0JyAmJiB2YWwuY29uc3RydWN0b3IgPT09IERhdGUpIHtcclxuICAgIHJldHVybiBjb25maWcuZGF0ZXMgIT09IGZhbHNlID8gJ1tEYXRlOicgKyB2YWwudG9JU09TdHJpbmcoKSArICddJyA6IHZhbDtcclxuICAgIC8vdmFsLmZvcm1hdCgne1lZWVl9L3tNTX0ve0REfSB7aGh9OnttbX06e3NzfSBVVEM6XHUwMEI3e3BhcmFtcy50ej49MD9cIitcIitwYXJhbXMudHo6cGFyYW1zLnR6fVx1MDBCNycpO1xyXG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ29iamVjdCcgJiYgdmFsLmNvbnN0cnVjdG9yID09PSBSZWdFeHApIHtcclxuICAgIHJldHVybiBjb25maWcucmVnZXhwcyAhPT0gZmFsc2UgPyAnW1JlZ2V4cDonICsgdmFsLnRvU3RyaW5nKCkgKyAnXScgOiB2YWw7XHJcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnb2JqZWN0JyAmJiB2YWwuY29uc3RydWN0b3IgJiYgdHlwZW9mIHZhbC5jb25zdHJ1Y3Rvci5uYW1lID09PSAnc3RyaW5nJyAmJiB2YWwuY29uc3RydWN0b3IubmFtZS5zbGljZSgtNSkgPT09ICdFcnJvcicpIHtcclxuICAgIHZhciBzdGFjayA9ICh2YWwuc3RhY2sgfHwgJycpLnNwbGl0KCdcXG4nKS5zbGljZSgxKTtcclxuICAgIHZhciBtZXNzYWdlID0gKHZhbC5tZXNzYWdlIHx8IHZhbC50b1N0cmluZygpKTtcclxuICAgIHZhciBlcnJvciA9IG1lc3NhZ2UgKyBcIlxcblwiICsgc3RhY2s7XHJcbiAgICByZXR1cm4gY29uZmlnLmVycm9ycyAhPT0gZmFsc2UgPyAnW0Vycm9yOicgKyBlcnJvciArICddJyA6IHZhbDtcclxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSB7XHJcbiAgICBpZiAocGFyZW50cy5pbmRleE9mKHZhbCkgPj0gMCkge1xyXG4gICAgICB2YXIgcG9pbnQgPSBwYXRoLnNsaWNlKDAsIHBhcmVudHMuaW5kZXhPZih2YWwpKS5qb2luKCcuJyk7XHJcbiAgICAgIHJldHVybiAnW0NpcmN1bGFyJyArIChwb2ludCA/ICc6JyArIHBvaW50IDogJycpICsgJ10nO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFyIGNvcHksIGksIGssIGw7XHJcbiAgICAgIGlmICh2YWwuY29uc3RydWN0b3IgJiYgdHlwZW9mIHZhbC5jb25zdHJ1Y3Rvci5uYW1lID09PSAnc3RyaW5nJyAmJiB2YWwuY29uc3RydWN0b3IubmFtZS5zbGljZSgtNSkgPT09ICdBcnJheScpIHtcclxuICAgICAgICBpZiAocGFyZW50cy5sZW5ndGggPj0gY29uZmlnLmRlZXApIHtcclxuICAgICAgICAgIHJldHVybiAnW0FycmF5OicgKyB2YWwuY29uc3RydWN0b3IubmFtZSArICddJztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29weSA9IFtdO1xyXG4gICAgICAgICAgZm9yIChpID0gMCwgbCA9IHZhbC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICAgICAgY29weVtpXSA9IGRlY3ljbGVXYWxrZXIocGFyZW50cy5jb25jYXQoW3ZhbF0pLCBwYXRoLmNvbmNhdChpKSwgdmFsW2ldLCBjb25maWcpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIGNvcHk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChwYXJlbnRzLmxlbmd0aCA+PSBjb25maWcuZGVlcCkge1xyXG4gICAgICAgICAgcmV0dXJuICdbT2JqZWN0OicgKyAodmFsLmNvbnN0cnVjdG9yICYmIHZhbC5jb25zdHJ1Y3Rvci5uYW1lID8gdmFsLmNvbnN0cnVjdG9yLm5hbWUgOiAnT2JqZWN0JykgKyAnXSc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvcHkgPSB7fTtcclxuICAgICAgICAgIGZvciAoaSA9IDAsIGsgPSBPYmplY3Qua2V5cyh2YWwpLCBsID0gay5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICAgICAgY29weVtrW2ldXSA9IGRlY3ljbGVXYWxrZXIocGFyZW50cy5jb25jYXQoW3ZhbF0pLCBwYXRoLmNvbmNhdChba1tpXV0pLCB2YWxba1tpXV0sIGNvbmZpZyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gY29weTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicpIHtcclxuICAgIHJldHVybiBjb25maWcuZnVuY3Rpb25zID09PSB0cnVlID8gJ1tGdW5jdGlvbjonICsgdmFsLnRvU3RyaW5nKCkgKyAnXScgOiB1bmRlZmluZWQ7XHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiB2YWwudG9TdHJpbmcoKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7XHJcbiAgZGVDeWNsZXIsXHJcbiAgZGVDeWNsZWQsXHJcbiAgcmV2aXZlXHJcbn0iLCAiaW1wb3J0IGkxOG4gZnJvbSBcIi4uL2kxOG5cIjtcclxuaW1wb3J0IHV0aWxzIGZyb20gXCIuLi91dGlsc1wiO1xyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSB7eyBpMThuOiBzdHJpbmcgfCB7IFtsYW5nOiBzdHJpbmddOiB7IFtrOiBzdHJpbmddOiBzdHJpbmcgfSB9fX0gY2ZnIFxyXG4gKiBAcmV0dXJucyBcclxuICovXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBidWlsZEV4dGVuc2lvbkkxOE4oY2ZnKSB7XHJcbiAgaWYgKCFjZmc/LmkxOG4pIHJldHVybiBudWxsO1xyXG4gIGxldCBvdXQgPSB7XHJcbiAgICBfX2NhY2hlX186IHtcclxuICAgICAgbG9jYWxlSWRzOiBbXSxcclxuICAgICAgbG9jYWxpemF0aW9uczoge31cclxuICAgIH0sXHJcbiAgICBmb3JtYXQoa2V5LCAuLi5hcmdzKSB7XHJcbiAgICAgIHJldHVybiB1dGlscy5mb3JtYXQob3V0LmdldChrZXkpLCAuLi5hcmdzKTtcclxuICAgIH0sXHJcbiAgICBnZXQoa2V5KSB7XHJcbiAgICAgIGlmICh0eXBlb2YgY2ZnLmkxOG4gPT09IFwic3RyaW5nXCIpIGNoZWNrKCk7XHJcbiAgICAgIHJldHVybiBvdXQuX19jYWNoZV9fLmxvY2FsaXphdGlvbnNbb3V0LmxvY2FsZV0/LltrZXldXHJcbiAgICAgICAgfHwgb3V0Ll9fY2FjaGVfXy5sb2NhbGl6YXRpb25zLmRlZmF1bHQ/LltrZXldXHJcbiAgICAgICAgfHwgb3V0LmdldChrZXkpO1xyXG4gICAgfSxcclxuICAgIG1lc3NhZ2VzOiBuZXcgUHJveHkoe30sIHtcclxuICAgICAgZ2V0KF8sIHByb3ApIHtcclxuICAgICAgICByZXR1cm4gb3V0LmdldChwcm9wKTtcclxuICAgICAgfVxyXG4gICAgfSksXHJcbiAgfVxyXG4gIGFzeW5jIGZ1bmN0aW9uIGNoZWNrKCkge1xyXG4gICAgY29uc3QgbG9jYWxlID0gaTE4bi5sb2NhbGU7XHJcbiAgICBpZiAodHlwZW9mIGNmZy5pMThuID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgIGNvbnN0IEJBU0VfVVJMID0gY2ZnLmkxOG4uZW5kc1dpdGgoXCIvXCIpID8gY2ZnLmkxOG4uc2xpY2UoMCwgLTEpIDogY2ZnLmkxOG47XHJcbiAgICAgIGlmICghb3V0Ll9fY2FjaGVfXy5sb2NhbGVJZHMubGVuZ3RoKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIG91dC5fX2NhY2hlX18ubG9jYWxlSWRzID0gYXdhaXQgKGF3YWl0IGZldGNoKGAke0JBU0VfVVJMfS9sb2NhbGVzLmpzb25gLCBub1N0b3JlKSkuanNvbigpO1xyXG4gICAgICAgIH0gY2F0Y2ggeyB9XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIG91dC5fX2NhY2hlX18ubG9jYWxpemF0aW9ucy5kZWZhdWx0ID0gYXdhaXQgKGF3YWl0IGZldGNoKGAke0JBU0VfVVJMfS9kZWZhdWx0Lmpzb25gLCBub1N0b3JlKSkuanNvbigpO1xyXG4gICAgICAgIH0gY2F0Y2ggeyB9XHJcbiAgICAgIH1cclxuICAgICAgaWYgKFxyXG4gICAgICAgIG91dC5fX2NhY2hlX18ubG9jYWxlSWRzLmluY2x1ZGVzKGxvY2FsZSlcclxuICAgICAgICAmJiAhb3V0Ll9fY2FjaGVfXy5sb2NhbGl6YXRpb25zPy5bbG9jYWxlXVxyXG4gICAgICApIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgb3V0Ll9fY2FjaGVfXy5sb2NhbGl6YXRpb25zW2xvY2FsZV0gPSBhd2FpdCAoYXdhaXQgZmV0Y2goYCR7QkFTRV9VUkx9LyR7bG9jYWxlfS5qc29uYCwgbm9TdG9yZSkpLmpzb24oKTtcclxuICAgICAgICB9IGNhdGNoIHsgfTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgb3V0Ll9fY2FjaGVfXy5sb2NhbGVJZHMgPSBPYmplY3Qua2V5cyhjZmcuaTE4bik7XHJcbiAgICAgIG91dC5fX2NhY2hlX18ubG9jYWxpemF0aW9ucyA9IGNmZy5pMThuO1xyXG4gICAgfVxyXG4gIH1cclxuICBhd2FpdCBjaGVjaygpO1xyXG4gIHJldHVybiBvdXQ7XHJcbn0iLCAiaW1wb3J0IHsgQmFzaWNFdmVudEVtaXR0ZXIgfSBmcm9tIFwiLi4vLi4vbGliL0Jhc2ljRXZlbnRFbWl0dGVyLmpzXCI7XHJcbmltcG9ydCBkZXYgZnJvbSBcIi4uL2Rldi9pbmRleC5qc1wiO1xyXG5pbXBvcnQgaTE4biBmcm9tIFwiLi4vaTE4bi9pbmRleC5qc1wiO1xyXG5pbXBvcnQgbW9kdWxlcyBmcm9tIFwiLi4vbW9kdWxlcy9pbmRleC5qc1wiO1xyXG5pbXBvcnQgc3RvcmFnZSBmcm9tIFwiLi4vc3RvcmFnZS9pbmRleC5qc1wiO1xyXG5pbXBvcnQgeyBidWlsZEV4dGVuc2lvbkkxOE4gfSBmcm9tIFwiLi9pMThuLmpzXCI7XHJcbmltcG9ydCAqIGFzIG5lc3RzIGZyb20gXCJuZXN0c1wiO1xyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSB7eyBtb2R1bGVzOiB7IG5vZGU6IHsgbmFtZTogc3RyaW5nLCByZWFzb246IHN0cmluZyB9W10sIGNvbW1vbjogeyBuYW1lOiBzdHJpbmcsIHJlYXNvbjogc3RyaW5nIH1bXSwgY3VzdG9tOiB7IHJlYXNvbjogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIGxhenk6IGJvb2xlYW4sIGZpbmRlcjogeyBmaWx0ZXI6IHsgZXhwb3J0OiBib29sZWFuLCBpbjogXCJwcm9wZXJ0aWVzXCIgfCBcInN0cmluZ3NcIiB8IFwicHJvdG90eXBlc1wiLCBieTogW3N0cmluZ1tdLCBzdHJpbmdbXT9dIH0sIHBhdGg6IHsgYmVmb3JlOiBzdHJpbmcgfCBzdHJpbmdbXSwgYWZ0ZXI6IHN0cmluZyB8IHN0cmluZ1tdIH0sIG1hcDogeyBbazogc3RyaW5nXTogc3RyaW5nW10gfSB9IH1bXSB9LCBhYm91dDogeyBuYW1lOiBzdHJpbmcgfCB7IFtrOiBzdHJpbmddOiBzdHJpbmcgfSwgZGVzY3JpcHRpb246IHN0cmluZyB8IHsgW2s6IHN0cmluZ106IHN0cmluZyB9LCBzbHVnOiBzdHJpbmcgfSwgcmVhc29uOiBzdHJpbmcgfX0gY2ZnIFxyXG4gKi9cclxuYXN5bmMgZnVuY3Rpb24gYnVpbGRBUEkoY2ZnKSB7XHJcbiAgY29uc3QgcGVyc2lzdCA9IGF3YWl0IHN0b3JhZ2UuY3JlYXRlUGVyc2lzdE5lc3QoYEV4dGVuc2lvbjtQZXJzaXN0OyR7Y2ZnLmFib3V0LnNsdWd9YCk7XHJcbiAgY29uc3Qgb3V0ID0ge1xyXG4gICAgbW9kdWxlczoge1xyXG4gICAgICBfX2NhY2hlX186IHtcclxuICAgICAgICBjb21tb246IHt9LFxyXG4gICAgICAgIG5vZGU6IHt9LFxyXG4gICAgICAgIGN1c3RvbToge30sXHJcbiAgICAgICAgY3VzdG9tTGF6eToge31cclxuICAgICAgfSxcclxuICAgICAgcmVxdWlyZShuYW1lKSB7XHJcbiAgICAgICAgaWYgKCFkZXYuZW5hYmxlZCkge1xyXG4gICAgICAgICAgaWYgKHR5cGVvZiBvdXQubW9kdWxlcy5fX2NhY2hlX18ubm9kZVtuYW1lXSAhPT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIG91dC5tb2R1bGVzLl9fY2FjaGVfXy5ub2RlW25hbWVdO1xyXG4gICAgICAgICAgaWYgKGNmZz8ubW9kdWxlcz8ubm9kZT8uc29tZT8uKGkgPT4gaS5uYW1lID09PSBuYW1lKSkgcmV0dXJuIG91dC5tb2R1bGVzLl9fY2FjaGVfXy5ub2RlW25hbWVdID0gbW9kdWxlcy5yZXF1aXJlKG5hbWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZXR1cm4gbW9kdWxlcy5yZXF1aXJlKG5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgfSxcclxuICAgICAgY29tbW9uOiBuZXcgUHJveHkoe30sIHtcclxuICAgICAgICBnZXQoXywgcHJvcCkge1xyXG4gICAgICAgICAgaWYgKCFkZXYuZW5hYmxlZCkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIG91dC5tb2R1bGVzLl9fY2FjaGVfXy5jb21tb25bcHJvcF0gIT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBvdXQubW9kdWxlcy5fX2NhY2hlX18uY29tbW9uW3Byb3BdO1xyXG4gICAgICAgICAgICBpZiAoY2ZnPy5tb2R1bGVzPy5jb21tb24/LnNvbWU/LihpID0+IGkubmFtZSA9PT0gcHJvcCkpIHJldHVybiBvdXQubW9kdWxlcy5fX2NhY2hlX18uY29tbW9uW3Byb3BdID0gbW9kdWxlcy5jb21tb25bcHJvcF07XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbW9kdWxlcy5jb21tb25bcHJvcF07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9LFxyXG4gICAgICB9KSxcclxuICAgICAgY3VzdG9tOiBuZXcgUHJveHkoe30sIHtcclxuICAgICAgICBnZXQoXywgcHJvcCkge1xyXG4gICAgICAgICAgaWYgKHR5cGVvZiBvdXQubW9kdWxlcy5fX2NhY2hlX18uY3VzdG9tW3Byb3BdICE9PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gb3V0Lm1vZHVsZXMuX19jYWNoZV9fLmN1c3RvbVtwcm9wXTtcclxuICAgICAgICAgIGxldCBkYXRhID0gY2ZnPy5tb2R1bGVzPy5jdXN0b20/LnNvbWU/LihpID0+IGkubmFtZSA9PT0gcHJvcCk7XHJcbiAgICAgICAgICBpZiAoIWRhdGEpIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgaWYgKGRhdGEubGF6eSkge1xyXG4gICAgICAgICAgICBsZXQgcHJvbSA9IG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgICBsZXQgciA9IGF3YWl0IG1vZHVsZXMud2VicGFjay5sYXp5RmluZEJ5RmluZGVyKGRhdGEuZmluZGVyKTtcclxuICAgICAgICAgICAgICBvdXQubW9kdWxlcy5fX2NhY2hlX18uY3VzdG9tTGF6eVtwcm9wXSA9IHI7XHJcbiAgICAgICAgICAgICAgcmVzb2x2ZShyKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG91dC5tb2R1bGVzLl9fY2FjaGVfXy5jdXN0b21bcHJvcF0gPSB7XHJcbiAgICAgICAgICAgICAgZ2V0KCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb207XHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBnZXQgdmFsdWUoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb3V0Lm1vZHVsZXMuX19jYWNoZV9fLmN1c3RvbUxhenlbcHJvcF07XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IHZhbHVlID0gbW9kdWxlcy53ZWJwYWNrLmZpbmRCeUZpbmRlcihkYXRhLmZpbmRlcik7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZT8udmFsdWUgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgIG91dC5tb2R1bGVzLl9fY2FjaGVfXy5jdXN0b21bcHJvcF0gPSB2YWx1ZSA/IE9iamVjdC5hc3NpZ24odmFsdWUsIHsgdmFsdWUsIGdldCgpIHsgcmV0dXJuIHZhbHVlIH0gfSkgOiBudWxsO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBvdXQubW9kdWxlcy5fX2NhY2hlX18uY3VzdG9tW3Byb3BdID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGNhdGNoIHtcclxuICAgICAgICAgICAgICBvdXQubW9kdWxlcy5fX2NhY2hlX18uY3VzdG9tW3Byb3BdID0gdmFsdWUgPyB7IHZhbHVlLCBnZXQoKSB7IHJldHVybiB2YWx1ZSB9IH0gOiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gb3V0Lm1vZHVsZXMuX19jYWNoZV9fLmN1c3RvbVtwcm9wXTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pLFxyXG4gICAgfSxcclxuICAgIGkxOG4sXHJcbiAgICBleHRlbnNpb246IHtcclxuICAgICAgY29uZmlnOiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGNmZykpLFxyXG4gICAgICBwZXJzaXN0LFxyXG4gICAgICBpMThuOiBhd2FpdCBidWlsZEV4dGVuc2lvbkkxOE4oY2ZnKSxcclxuICAgICAgZXZlbnRzOiBuZXcgQmFzaWNFdmVudEVtaXR0ZXIoKVxyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHJldHVybiBvdXQ7XHJcbn1cclxuXHJcbmNvbnN0IG91dCA9IHtcclxuICBfX2NhY2hlX186IHtcclxuICAgIGluaXRpYWxpemVkOiBmYWxzZSxcclxuICAgIGxvYWRlZDogbmVzdHMubWFrZSh7fSlcclxuICB9LFxyXG4gIHN0b3JhZ2U6IHtcclxuICAgIC8qKiBAdHlwZSB7bmVzdHMuTmVzdH0gKi9cclxuICAgIGluc3RhbGxlZDoge31cclxuICB9LFxyXG4gIGJ1aWxkQVBJLFxyXG4gIGFzeW5jIGluaXQoKSB7XHJcbiAgICBpZiAob3V0Ll9fY2FjaGVfXy5pbml0aWFsaXplZCkgcmV0dXJuO1xyXG4gICAgb3V0Ll9fY2FjaGVfXy5pbml0aWFsaXplZCA9IHRydWU7XHJcbiAgICBvdXQuc3RvcmFnZS5pbnN0YWxsZWQgPSBhd2FpdCBzdG9yYWdlLmNyZWF0ZVBlcnNpc3ROZXN0KFwiRXh0ZW5zaW9ucztJbnN0YWxsZWRcIik7XHJcbiAgfSxcclxuICAvKipcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsIFxyXG4gICAqL1xyXG4gIGFzeW5jIGluc3RhbGwodXJsLCBkZWZhdWx0Q29uZmlnID0ge30pIHtcclxuICAgIGlmICghb3V0Ll9fY2FjaGVfXy5pbml0aWFsaXplZCkgYXdhaXQgb3V0LmluaXQoKTtcclxuICAgIGlmICh1cmwuZW5kc1dpdGgoXCIvXCIpKSB1cmwgPSB1cmwuc2xpY2UoMCwgLTEpO1xyXG4gICAgaWYgKG91dC5zdG9yYWdlLmluc3RhbGxlZC5naG9zdFt1cmxdKSB0aHJvdyBuZXcgRXJyb3IoYFwiJHt1cmx9XCIgZXh0ZW5zaW9uIGlzIGFscmVhZHkgaW5zdGFsbGVkLmApO1xyXG5cclxuICAgIGxldCBtZXRhUmVzcCA9IGF3YWl0IGZldGNoKGAke3VybH0vbWV0YWRhdGEuanNvbmApO1xyXG4gICAgaWYgKG1ldGFSZXNwLnN0YXR1cyAhPT0gMjAwKSB0aHJvdyBuZXcgRXJyb3IoYFwiJHt1cmx9XCIgZXh0ZW5zaW9uIG1ldGFkYXRhIGlzIG5vdCByZXNwb25kZWQgd2l0aCAyMDAgc3RhdHVzIGNvZGUuYCk7XHJcbiAgICBsZXQgbWV0YWRhdGEgPSBhd2FpdCBtZXRhUmVzcC5qc29uKCk7XHJcblxyXG4gICAgbGV0IHJlYWRtZVJlc3AgPSBhd2FpdCBmZXRjaChgJHt1cmx9L3JlYWRtZS5tZGApO1xyXG4gICAgbGV0IHJlYWRtZSA9IHJlYWRtZVJlc3Auc3RhdHVzID09PSAyMDAgPyBhd2FpdCByZWFkbWVSZXNwLnRleHQoKSA6IG51bGw7XHJcblxyXG4gICAgLy8gVE9ETzogU2hvdyBtb2RhbCBmb3IgdXNlciB0byBhY2NlcHQgdGhlIGV4dGVuc2lvbiAodGVybXMsIHByaXZhY3ksIGV0Yy4pXHJcblxyXG4gICAgbGV0IHNvdXJjZVJlc3AgPSBhd2FpdCBmZXRjaChgJHt1cmx9L3NvdXJjZS5qc2ApO1xyXG4gICAgaWYgKHNvdXJjZVJlc3Auc3RhdHVzICE9PSAyMDApIHRocm93IG5ldyBFcnJvcihgXCIke3VybH1cIiBleHRlbnNpb24gc291cmNlIGlzIG5vdCByZXNwb25kZWQgd2l0aCAyMDAgc3RhdHVzIGNvZGUuYCk7XHJcbiAgICBsZXQgc291cmNlID0gYXdhaXQgc291cmNlUmVzcC50ZXh0KCk7XHJcblxyXG5cclxuICAgIG91dC5zdG9yYWdlLmluc3RhbGxlZC5zdG9yZVt1cmxdID0ge1xyXG4gICAgICBtZXRhZGF0YToge1xyXG4gICAgICAgIGN1cnJlbnQ6IG1ldGFkYXRhLFxyXG4gICAgICAgIGxhc3Q6IG1ldGFkYXRhXHJcbiAgICAgIH0sXHJcbiAgICAgIHNvdXJjZSxcclxuICAgICAgcmVhZG1lLFxyXG4gICAgICBjb25maWc6IHtcclxuICAgICAgICBhdXRvVXBkYXRlOiB0cnVlLFxyXG4gICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgLi4uZGVmYXVsdENvbmZpZ1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIG91dC5sb2FkKHVybCk7XHJcbiAgfSxcclxuICBhc3luYyB1bmluc3RhbGwodXJsKSB7XHJcbiAgICBpZiAoIW91dC5fX2NhY2hlX18uaW5pdGlhbGl6ZWQpIGF3YWl0IG91dC5pbml0KCk7XHJcbiAgICBpZiAoIW91dC5zdG9yYWdlLmluc3RhbGxlZC5naG9zdFt1cmxdKSB0aHJvdyBuZXcgRXJyb3IoYFwiJHt1cmx9XCIgZXh0ZW5zaW9uIGlzIG5vdCBpbnN0YWxsZWQuYCk7XHJcblxyXG4gICAgZGVsZXRlIG91dC5zdG9yYWdlLmluc3RhbGxlZC5zdG9yZVt1cmxdO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGF3YWl0IG91dC51bmxvYWQodXJsKTtcclxuICAgIH0gY2F0Y2ggeyB9XHJcbiAgfSxcclxuICBhc3luYyBsb2FkKHVybCkge1xyXG4gICAgaWYgKCFvdXQuX19jYWNoZV9fLmluaXRpYWxpemVkKSBhd2FpdCBvdXQuaW5pdCgpO1xyXG4gICAgaWYgKCFvdXQuc3RvcmFnZS5pbnN0YWxsZWQuZ2hvc3RbdXJsXSkgdGhyb3cgbmV3IEVycm9yKGBcIiR7dXJsfVwiIGV4dGVuc2lvbiBpcyBub3QgaW5zdGFsbGVkLmApO1xyXG4gICAgbGV0IGRhdGEgPSBvdXQuc3RvcmFnZS5pbnN0YWxsZWQuZ2hvc3RbdXJsXTtcclxuXHJcbiAgICBpZiAob3V0Ll9fY2FjaGVfXy5sb2FkZWQuZ2hvc3RbdXJsXSkgdGhyb3cgbmV3IEVycm9yKGBcIiR7dXJsfVwiIGV4dGVuc2lvbiBpcyBhbHJlYWR5IGxvYWRlZC5gKTtcclxuXHJcbiAgICBsZXQgYXBpID0gYXdhaXQgb3V0LmJ1aWxkQVBJKGRhdGEubWV0YWRhdGEpO1xyXG5cclxuICAgIGxldCBldmFsdWF0ZWQgPSBvdXQuZXZhbHVhdGUoZGF0YS5zb3VyY2UsIGFwaSk7XHJcblxyXG4gICAgYXdhaXQgZXZhbHVhdGVkPy5sb2FkPy4oKTtcclxuXHJcbiAgICBvdXQuX19jYWNoZV9fLmxvYWRlZC5zdG9yZVt1cmxdID0ge1xyXG4gICAgICBldmFsdWF0ZWQsXHJcbiAgICAgIGFwaVxyXG4gICAgfTtcclxuICB9LFxyXG4gIGFzeW5jIHVubG9hZCh1cmwpIHtcclxuICAgIGlmICghb3V0Ll9fY2FjaGVfXy5pbml0aWFsaXplZCkgYXdhaXQgb3V0LmluaXQoKTtcclxuICAgIGlmICghb3V0LnN0b3JhZ2UuaW5zdGFsbGVkLmdob3N0W3VybF0pIHRocm93IG5ldyBFcnJvcihgXCIke3VybH1cIiBleHRlbnNpb24gaXMgbm90IGluc3RhbGxlZC5gKTtcclxuXHJcbiAgICBpZiAoIW91dC5fX2NhY2hlX18ubG9hZGVkLmdob3N0W3VybF0pIHRocm93IG5ldyBFcnJvcihgXCIke3VybH1cIiBleHRlbnNpb24gaXMgbm90IGxvYWRlZC5gKTtcclxuXHJcbiAgICBsZXQgeyBldmFsdWF0ZWQgfSA9IG91dC5fX2NhY2hlX18ubG9hZGVkLmdob3N0W3VybF07XHJcblxyXG4gICAgYXdhaXQgZXZhbHVhdGVkPy51bmxvYWQ/LigpO1xyXG5cclxuICAgIGRlbGV0ZSBvdXQuX19jYWNoZV9fLmxvYWRlZC5zdG9yZVt1cmxdO1xyXG4gIH0sXHJcbiAgZXZhbHVhdGUoc291cmNlLCBhcGkpIHtcclxuICAgIGNvbnN0ICRhY29yZCA9IGFwaTtcclxuICAgIHJldHVybiBldmFsKHNvdXJjZSk7XHJcbiAgfSxcclxuICBhc3luYyBsb2FkQWxsKCkge1xyXG4gICAgaWYgKCFvdXQuX19jYWNoZV9fLmluaXRpYWxpemVkKSBhd2FpdCBvdXQuaW5pdCgpO1xyXG4gICAgcmV0dXJuIFByb21pc2UuYWxsKE9iamVjdC5rZXlzKG91dC5zdG9yYWdlLmluc3RhbGxlZC5naG9zdCkubWFwKHVybCA9PiBvdXQubG9hZCh1cmwpKSk7XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgb3V0OyIsICJleHBvcnQgZGVmYXVsdCB7XHJcbiAgcHJvY2VzczogZ2xvYmFsVGhpc1tcIjxQUkVMT0FEX0tFWT5cIl0ucHJvY2VzcyxcclxuICBpc0RldlRvb2xzT3BlbjogZ2xvYmFsVGhpc1tcIjxQUkVMT0FEX0tFWT5cIl0uaXNEZXZUb29sc09wZW5cclxufVxyXG5cclxuIiwgImltcG9ydCB7IHdhaXRVbnRpbENvbm5lY3Rpb25PcGVuIH0gZnJvbSBcIi4uLy4uL290aGVyL3V0aWxzLmpzXCI7XHJcbmltcG9ydCBjb21tb24gZnJvbSBcIi4uL21vZHVsZXMvY29tbW9uLmpzXCI7XHJcbmltcG9ydCBwYXRjaGVyIGZyb20gXCIuLi9wYXRjaGVyL2luZGV4LmpzXCI7XHJcblxyXG5jb25zdCBzb2NrZXRzID0gbmV3IFNldCgpO1xyXG5jb25zdCBoYW5kbGVycyA9IG5ldyBNYXAoKTtcclxuXHJcbndhaXRVbnRpbENvbm5lY3Rpb25PcGVuKCkudGhlbigoKSA9PiB7XHJcbiAgcGF0Y2hlci5pbnN0ZWFkKFxyXG4gICAgXCJoYW5kbGVDb25uZWN0aW9uXCIsXHJcbiAgICBjb21tb24uV2ViU29ja2V0LFxyXG4gICAgKGFyZ3MsIG9yaWcpID0+IHtcclxuICAgICAgY29uc3Qgd3MgPSBhcmdzWzBdO1xyXG4gICAgICBpZiAod3MudXBncmFkZVJlcSgpLnVybCAhPT0gXCIvYWNvcmRcIikgcmV0dXJuIG9yaWcoLi4uYXJncyk7XHJcblxyXG4gICAgICBzb2NrZXRzLmFkZCh3cyk7XHJcblxyXG4gICAgICB3cy5vbihcIm1lc3NhZ2VcIiwgYXN5bmMgKG1zZykgPT4ge1xyXG4gICAgICAgIGxldCBqc29uO1xyXG5cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAganNvbiA9IEpTT04ucGFyc2UobXNnKTtcclxuICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShqc29uKSB8fCBqc29uLmxlbmd0aCA8IDEgfHwganNvbi5sZW5ndGggPiAzKVxyXG4gICAgICAgICAgICB0aHJvdyBcIkFycmF5IGV4cGVjdGVkIGFzIG1lc3NhZ2UuXCI7XHJcbiAgICAgICAgICBpZiAodHlwZW9mIGpzb25bMF0gIT0gXCJzdHJpbmdcIikgdGhyb3cgXCJBcnJheVswXSBuZWVkcyB0byBiZSBzdHJpbmcuXCI7XHJcbiAgICAgICAgICBpZiAodHlwZW9mIGpzb25bMV0gIT0gXCJzdHJpbmdcIikgdGhyb3cgXCJBcnJheVsxXSBuZWVkcyB0byBiZSBzdHJpbmcuXCI7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICB3cy5zZW5kKFxyXG4gICAgICAgICAgICBKU09OLnN0cmluZ2lmeShbXHJcbiAgICAgICAgICAgICAgbnVsbCxcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBvazogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBlcnJvcjogYCR7ZXJyfWAsXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXSlcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBbZXZlbnRJZCwgZXZlbnROYW1lLCBldmVudERhdGFdID0ganNvbjtcclxuXHJcbiAgICAgICAgY29uc3QgaGFuZGxlciA9IGhhbmRsZXJzLmdldChldmVudE5hbWUpO1xyXG5cclxuICAgICAgICBpZiAoIWhhbmRsZXIpXHJcbiAgICAgICAgICByZXR1cm4gd3Muc2VuZChcclxuICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoW1xyXG4gICAgICAgICAgICAgIGV2ZW50SWQsXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgb2s6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgZXJyb3I6IGBVbmFibGUgdG8gZmluZCBoYW5kbGVyLmAsXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXSlcclxuICAgICAgICAgICk7XHJcblxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICBsZXQgcmVzcG9uc2UgPSBhd2FpdCBoYW5kbGVyKGV2ZW50RGF0YSk7XHJcbiAgICAgICAgICB3cy5zZW5kKFxyXG4gICAgICAgICAgICBKU09OLnN0cmluZ2lmeShbXHJcbiAgICAgICAgICAgICAgZXZlbnRJZCxcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBvazogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHJlc3BvbnNlLFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIF0pXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgd3Muc2VuZChcclxuICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoW1xyXG4gICAgICAgICAgICAgIGV2ZW50SWQsXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgb2s6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgZXJyb3I6IGAke2Vycn1gLFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIF0pXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgICB3cy5vbihcImNsb3NlXCIsICgpID0+IHNvY2tldHMuZGVsZXRlKHdzKSk7XHJcbiAgICB9XHJcbiAgKTtcclxufSk7XHJcblxyXG5mdW5jdGlvbiBzZXQoZXZlbnROYW1lLCBjYWxsYmFjaykge1xyXG4gIGlmICh0eXBlb2YgZXZlbnROYW1lICE9IFwic3RyaW5nXCIpXHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJFdmVudE5hbWUgbmVlZHMgdG8gYmUgYSBzdHJpbmcuXCIpO1xyXG4gIGlmICh0eXBlb2YgY2FsbGJhY2sgIT0gXCJmdW5jdGlvblwiKVxyXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ2FsbGJhY2sgbmVlZHMgdG8gYmUgYSBmdW5jdGlvbi5cIik7XHJcbiAgaWYgKGhhbmRsZXJzLmhhcyhldmVudE5hbWUpKVxyXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiRXZlbnROYW1lIGFscmVhZHkgaW4gdXNlLlwiKTtcclxuICBoYW5kbGVycy5zZXQoZXZlbnROYW1lLCBjYWxsYmFjayk7XHJcbiAgcmV0dXJuICgpID0+IHtcclxuICAgIGhhbmRsZXJzLmRlbGV0ZShldmVudE5hbWUpO1xyXG4gIH07XHJcbn1cclxuZnVuY3Rpb24gdHJpZ2dlcihldmVudE5hbWUsIC4uLmFyZ3MpIHtcclxuICBpZiAoIXNvY2tldEV2ZW50cy5oYXMoZXZlbnROYW1lKSlcclxuICAgIHRocm93IG5ldyBFcnJvcihcIlVuYWJsZSB0byBmaW5kIGhhbmRsZXIhXCIpO1xyXG4gIHJldHVybiBzb2NrZXRFdmVudHMuZ2V0KGV2ZW50TmFtZSkoLi4uYXJncyk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBzZXQsXHJcbiAgdHJpZ2dlclxyXG59XHJcblxyXG4iLCAiZXhwb3J0IGRlZmF1bHQgYFxuLmFjb3JkLS1sYXllci1jb250YWluZXJ7LS10b3Atb2Zmc2V0OiAwcHg7d2lkdGg6MTAwdnc7aGVpZ2h0OmNhbGMoMTAwdmggLSB2YXIoLS10b3Atb2Zmc2V0KSk7ei1pbmRleDo5OTk5OTk5O3BvaW50ZXItZXZlbnRzOm5vbmU7cG9zaXRpb246YWJzb2x1dGU7dG9wOnZhcigtLXRvcC1vZmZzZXQpO2xlZnQ6MHB4fS5hY29yZC0tbGF5ZXItY29udGFpbmVyICp7ei1pbmRleDo5OTk5OTk5OTk5OTk5OX0uYWNvcmQtLXRvb2x0aXAtbGF5ZXJ7b3BhY2l0eTowO3RyYW5zaXRpb246NTBtcyBsaW5lYXIgb3BhY2l0eTtwb3NpdGlvbjphYnNvbHV0ZTtwb2ludGVyLWV2ZW50czpub25lfS5hY29yZC0tdG9vbHRpcC1sYXllci52aXNpYmxle29wYWNpdHk6MTtwb2ludGVyLWV2ZW50czphbGx9LmFjb3JkLS10b29sdGlwLnZlcnRpY2Fse3RyYW5zZm9ybTp0cmFuc2xhdGVYKC01MCUpfS5hY29yZC0tdG9vbHRpcC5ob3Jpem9udGFse3RyYW5zZm9ybTp0cmFuc2xhdGVZKC01MCUpfS5hY29yZC0tdG9hc3RzLWNvbnRhaW5lcntkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2p1c3RpZnktY29udGVudDpmbGV4LWVuZDtmbGV4LWRpcmVjdGlvbjpjb2x1bW47d2lkdGg6MTAwdnc7aGVpZ2h0OmNhbGMoMTAwdmggLSB2YXIoLS10b3Atb2Zmc2V0KSk7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7bGVmdDowO3BvaW50ZXItZXZlbnRzOm5vbmU7cGFkZGluZy1ib3R0b206MzJweH0uYWNvcmQtLXRvYXN0cy1jb250YWluZXIgLmFjb3JkLS10b2FzdHt0cmFuc2l0aW9uOnRyYW5zZm9ybSAyNTBtcyBlYXNlLWluLW91dCxvcGFjaXR5IDI1MG1zIGVhc2UtaW4tb3V0O2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7cG9pbnRlci1ldmVudHM6bm9uZTtib3JkZXItcmFkaXVzOjRweDtwYWRkaW5nOjhweDtib3gtc2hhZG93OjBweCAycHggOHB4IHJnYmEoMCwwLDAsLjI1KTtvcGFjaXR5OjE7Z2FwOjhweDtmb250LXNpemU6MTRweDttYXJnaW46NHB4fS5hY29yZC0tdG9hc3RzLWNvbnRhaW5lciAuYWNvcmQtLXRvYXN0IHN2Z3t3aWR0aDoxNnB4O2hlaWdodDoxNnB4fS5hY29yZC0tdG9hc3RzLWNvbnRhaW5lciAuYWNvcmQtLXRvYXN0LmNsaWNrYWJsZXtjdXJzb3I6cG9pbnRlcjtwb2ludGVyLWV2ZW50czphbGx9LmFjb3JkLS10b2FzdHMtY29udGFpbmVyIC5hY29yZC0tdG9hc3QuY2xvc2luZ3tvcGFjaXR5OjA7dHJhbnNmb3JtOnRyYW5zbGF0ZSgwLCAtNTBweCl9LmFjb3JkLS10b2FzdHMtY29udGFpbmVyIC5hY29yZC0tdG9hc3QuaGlkZGVue29wYWNpdHk6MDt0cmFuc2Zvcm06dHJhbnNsYXRlKDAsIDUwcHgpfS5hY29yZC0tdG9hc3RzLWNvbnRhaW5lciAuYWNvcmQtLXRvYXN0LnN0eWxlLWluZm97YmFja2dyb3VuZC1jb2xvcjojNGE4ZmUxO2NvbG9yOiNmNWY1ZjV9LmFjb3JkLS10b2FzdHMtY29udGFpbmVyIC5hY29yZC0tdG9hc3Quc3R5bGUtd2FybmluZ3tiYWNrZ3JvdW5kLWNvbG9yOiNmYWE4MWE7Y29sb3I6IzAwMH0uYWNvcmQtLXRvYXN0cy1jb250YWluZXIgLmFjb3JkLS10b2FzdC5zdHlsZS1lcnJvcntiYWNrZ3JvdW5kLWNvbG9yOiNlZDQyNDU7Y29sb3I6IzAwMH0uYWNvcmQtLXRvYXN0cy1jb250YWluZXIgLmFjb3JkLS10b2FzdC5zdHlsZS1zdWNjZXNze2JhY2tncm91bmQtY29sb3I6IzNiYTU1ZDtjb2xvcjojZjVmNWY1fS5hY29yZC0tdG9hc3RzLWNvbnRhaW5lciAuYWNvcmQtLXRvYXN0LnN0eWxlLWRlZmF1bHR7YmFja2dyb3VuZC1jb2xvcjojZjVmNWY1O2NvbG9yOiMwMDB9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXJ7d2lkdGg6MTAwdnc7aGVpZ2h0OmNhbGMoMTAwdmggLSB2YXIoLS10b3Atb2Zmc2V0KSk7ZGlzcGxheTpmbGV4O3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6MDtwb2ludGVyLWV2ZW50czpub25lfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyIC5hY29yZC0tbm90aWZpY2F0aW9ue2Rpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpjb2x1bW47cG9pbnRlci1ldmVudHM6YWxsO3RyYW5zaXRpb246dHJhbnNmb3JtIDI1MG1zIGVhc2UtaW4tb3V0LG9wYWNpdHkgMjUwbXMgZWFzZS1pbi1vdXQ7bWFyZ2luOjRweDtiYWNrZHJvcC1maWx0ZXI6Ymx1cigxNnB4KSBicmlnaHRuZXNzKDAuNzUpOy13ZWJraXQtYXBwLXJlZ2lvbjpuby1kcmFnOy0tYW5pbWF0aW9uLXNpemU6IDUwcHh9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24uaGlkZGVuLC5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyIC5hY29yZC0tbm90aWZpY2F0aW9uLmNsb3Npbmd7b3BhY2l0eTowfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyIC5hY29yZC0tbm90aWZpY2F0aW9uPi5jb250YWluZXJ7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2VlbjtwYWRkaW5nOjhweDtjb2xvcjojZmZmO21pbi13aWR0aDoyNTBweH0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllciAuYWNvcmQtLW5vdGlmaWNhdGlvbj4uY29udGFpbmVyPi5jbG9zZXt3aWR0aDoyNHB4O2hlaWdodDoyNHB4O2NvbG9yOiNmZmY7b3BhY2l0eTouNTtjdXJzb3I6cG9pbnRlcjttYXJnaW4tbGVmdDo4cHg7ei1pbmRleDo5OTk5OTk5OTl9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24+LmNvbnRhaW5lcj4uY2xvc2UuaGlkZGVue2Rpc3BsYXk6bm9uZX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllciAuYWNvcmQtLW5vdGlmaWNhdGlvbj4ucHJvZ3Jlc3MtY29udGFpbmVye3dpZHRoOjEwMCU7aGVpZ2h0OjVweH0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllciAuYWNvcmQtLW5vdGlmaWNhdGlvbj4ucHJvZ3Jlc3MtY29udGFpbmVyPi5wcm9ncmVzc3t3aWR0aDowJTtoZWlnaHQ6NXB4O3RyYW5zaXRpb246d2lkdGggdmFyKC0tZHVyYXRpb24pIGxpbmVhcjtiYWNrZ3JvdW5kLWNvbG9yOnZhcigtLWJhci1jb2xvcil9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24+LnByb2dyZXNzLWNvbnRhaW5lcj4ucHJvZ3Jlc3MucHJvZ3Jlc3Npbmd7d2lkdGg6MTAwJX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllciAuYWNvcmQtLW5vdGlmaWNhdGlvbi5zdHlsZS1pbmZvey0tYmFyLWNvbG9yOiAjNGE4ZmUxfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyIC5hY29yZC0tbm90aWZpY2F0aW9uLnN0eWxlLXdhcm5pbmd7LS1iYXItY29sb3I6ICNmYWE4MWF9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24uc3R5bGUtZXJyb3J7LS1iYXItY29sb3I6ICNlZDQyNDV9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24uc3R5bGUtc3VjY2Vzc3stLWJhci1jb2xvcjogIzNiYTU1ZH0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllciAuYWNvcmQtLW5vdGlmaWNhdGlvbi5zdHlsZS1kZWZhdWx0ey0tYmFyLWNvbG9yOiB3aGl0ZXNtb2tlfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLnRvcC1yaWdodHtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1lbmQ7YWxpZ24taXRlbXM6ZmxleC1zdGFydH0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci50b3AtcmlnaHQgLmFjb3JkLS1ub3RpZmljYXRpb24uaGlkZGVue3RyYW5zZm9ybTp0cmFuc2xhdGUoMCwgY2FsYyh2YXIoLS1hbmltYXRpb24tc2l6ZSkgKiAtMSkpfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLnRvcC1yaWdodCAuYWNvcmQtLW5vdGlmaWNhdGlvbi5jbG9zaW5ne3RyYW5zZm9ybTp0cmFuc2xhdGUoMCwgdmFyKC0tYW5pbWF0aW9uLXNpemUpKX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci50b3AtbGVmdHtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1zdGFydDthbGlnbi1pdGVtczpmbGV4LXN0YXJ0fS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLnRvcC1sZWZ0IC5hY29yZC0tbm90aWZpY2F0aW9uLmhpZGRlbnt0cmFuc2Zvcm06dHJhbnNsYXRlKDAsIGNhbGModmFyKC0tYW5pbWF0aW9uLXNpemUpICogLTEpKX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci50b3AtbGVmdCAuYWNvcmQtLW5vdGlmaWNhdGlvbi5jbG9zaW5ne3RyYW5zZm9ybTp0cmFuc2xhdGUoMCwgdmFyKC0tYW5pbWF0aW9uLXNpemUpKX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci5ib3R0b20tcmlnaHR7anVzdGlmeS1jb250ZW50OmZsZXgtZW5kO2FsaWduLWl0ZW1zOmZsZXgtZW5kfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLmJvdHRvbS1yaWdodCAuYWNvcmQtLW5vdGlmaWNhdGlvbi5oaWRkZW57dHJhbnNmb3JtOnRyYW5zbGF0ZSgwLCB2YXIoLS1hbmltYXRpb24tc2l6ZSkpfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLmJvdHRvbS1yaWdodCAuYWNvcmQtLW5vdGlmaWNhdGlvbi5jbG9zaW5ne3RyYW5zZm9ybTp0cmFuc2xhdGUoMCwgY2FsYyh2YXIoLS1hbmltYXRpb24tc2l6ZSkgKiAtMSkpfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLmJvdHRvbS1sZWZ0e2p1c3RpZnktY29udGVudDpmbGV4LXN0YXJ0O2FsaWduLWl0ZW1zOmZsZXgtZW5kfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLmJvdHRvbS1sZWZ0IC5hY29yZC0tbm90aWZpY2F0aW9uLmhpZGRlbnt0cmFuc2Zvcm06dHJhbnNsYXRlKDAsIHZhcigtLWFuaW1hdGlvbi1zaXplKSl9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIuYm90dG9tLWxlZnQgLmFjb3JkLS1ub3RpZmljYXRpb24uY2xvc2luZ3t0cmFuc2Zvcm06dHJhbnNsYXRlKDAsIGNhbGModmFyKC0tYW5pbWF0aW9uLXNpemUpICogLTEpKX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci50b3AtY2VudGVye2p1c3RpZnktY29udGVudDpjZW50ZXI7YWxpZ24taXRlbXM6ZmxleC1zdGFydH0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci50b3AtY2VudGVyIC5hY29yZC0tbm90aWZpY2F0aW9uLmhpZGRlbnt0cmFuc2Zvcm06dHJhbnNsYXRlKDAsIGNhbGModmFyKC0tYW5pbWF0aW9uLXNpemUpICogLTEpKX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci50b3AtY2VudGVyIC5hY29yZC0tbm90aWZpY2F0aW9uLmNsb3Npbmd7dHJhbnNmb3JtOnRyYW5zbGF0ZSgwLCB2YXIoLS1hbmltYXRpb24tc2l6ZSkpfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLmJvdHRvbS1jZW50ZXJ7anVzdGlmeS1jb250ZW50OmNlbnRlcjthbGlnbi1pdGVtczpmbGV4LWVuZH0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci5ib3R0b20tY2VudGVyIC5hY29yZC0tbm90aWZpY2F0aW9uLmhpZGRlbnt0cmFuc2Zvcm06dHJhbnNsYXRlKDAsIHZhcigtLWFuaW1hdGlvbi1zaXplKSl9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIuYm90dG9tLWNlbnRlciAuYWNvcmQtLW5vdGlmaWNhdGlvbi5jbG9zaW5ne3RyYW5zZm9ybTp0cmFuc2xhdGUoMCwgY2FsYyh2YXIoLS1hbmltYXRpb24tc2l6ZSkgKiAtMSkpfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLmNlbnRlcntqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO2FsaWduLWl0ZW1zOmNlbnRlcn0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci5jZW50ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24uaGlkZGVue3RyYW5zZm9ybTpzY2FsZSgwLjUpfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLmNlbnRlciAuYWNvcmQtLW5vdGlmaWNhdGlvbi5jbG9zaW5ne3RyYW5zZm9ybTpzY2FsZSgwLjUpfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLmxlZnQtY2VudGVye2p1c3RpZnktY29udGVudDpmbGV4LXN0YXJ0O2FsaWduLWl0ZW1zOmNlbnRlcn0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci5sZWZ0LWNlbnRlciAuYWNvcmQtLW5vdGlmaWNhdGlvbi5oaWRkZW57dHJhbnNmb3JtOnRyYW5zbGF0ZShjYWxjKHZhcigtLWFuaW1hdGlvbi1zaXplKSAqIC0xKSwgMCl9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIubGVmdC1jZW50ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24uY2xvc2luZ3t0cmFuc2Zvcm06dHJhbnNsYXRlKHZhcigtLWFuaW1hdGlvbi1zaXplKSwgMCl9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIucmlnaHQtY2VudGVye2p1c3RpZnktY29udGVudDpmbGV4LWVuZDthbGlnbi1pdGVtczpjZW50ZXJ9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIucmlnaHQtY2VudGVyIC5hY29yZC0tbm90aWZpY2F0aW9uLmhpZGRlbnt0cmFuc2Zvcm06dHJhbnNsYXRlKHZhcigtLWFuaW1hdGlvbi1zaXplKSwgMCl9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIucmlnaHQtY2VudGVyIC5hY29yZC0tbm90aWZpY2F0aW9uLmNsb3Npbmd7dHJhbnNmb3JtOnRyYW5zbGF0ZShjYWxjKHZhcigtLWFuaW1hdGlvbi1zaXplKSAqIC0xKSwgMCl9YDtcbiIsICJpbXBvcnQgZG9tIGZyb20gXCIuLi9kb20vaW5kZXguanNcIjtcclxuaW1wb3J0IGV2ZW50cyBmcm9tIFwiLi4vZXZlbnRzL2luZGV4LmpzXCI7XHJcbmltcG9ydCB3ZWJwYWNrIGZyb20gXCIuLi9tb2R1bGVzL3dlYnBhY2suanNcIjtcclxuXHJcbmNvbnN0IHRvb2x0aXBDbGFzc2VzID0gd2VicGFjay5maW5kQnlQcm9wZXJ0aWVzKFwidG9vbHRpcENvbnRlbnRBbGxvd092ZXJmbG93XCIsIFwidG9vbHRpcFwiKTtcclxuXHJcbmNvbnN0IHRvb2x0aXBQb3NpdGlvbnMgPSB7XHJcbiAgdG9wOiB0b29sdGlwQ2xhc3Nlcy50b29sdGlwVG9wLFxyXG4gIGJvdHRvbTogdG9vbHRpcENsYXNzZXMudG9vbHRpcEJvdHRvbSxcclxuICBsZWZ0OiB0b29sdGlwQ2xhc3Nlcy50b29sdGlwTGVmdCxcclxuICByaWdodDogdG9vbHRpcENsYXNzZXMudG9vbHRpcFJpZ2h0LFxyXG59XHJcblxyXG5jbGFzcyBUb29sdGlwIHtcclxuICAvKipcclxuICAgKiBAcGFyYW0ge0hUTUxEaXZFbGVtZW50fSB0YXJnZXQgXHJcbiAgICogQHBhcmFtIHtzdHJpbmd8SFRNTERpdkVsZW1lbnR9IGNvbnRlbnRcclxuICAgKi9cclxuICBjb25zdHJ1Y3Rvcih0YXJnZXQsIGNvbnRlbnQsIHBvc2l0aW9uID0gXCJhdXRvXCIpIHtcclxuICAgIC8qKiBAdHlwZSB7SFRNTERpdkVsZW1lbnR9ICovXHJcbiAgICB0aGlzLmxheWVyRWxlbWVudCA9IGRvbS5wYXJzZShgXHJcbiAgICAgIDxkaXYgY2xhc3M9XCJhY29yZC0tdG9vbHRpcC1sYXllclwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCIke3Rvb2x0aXBDbGFzc2VzLnRvb2x0aXB9ICR7dG9vbHRpcENsYXNzZXMudG9vbHRpcFByaW1hcnl9IGFjb3JkLS10b29sdGlwXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiJHt0b29sdGlwQ2xhc3Nlcy50b29sdGlwUG9pbnRlcn0gYWNvcmQtLXRvb2x0aXAtcG9pbnRlclwiPjwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cIiR7dG9vbHRpcENsYXNzZXMudG9vbHRpcENvbnRlbnR9IGFjb3JkLS10b29sdGlwLWNvbnRlbnRcIj48L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICBgKTtcclxuICAgIHRoaXMudG9vbHRpcEVsZW1lbnQgPSB0aGlzLmxheWVyRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmFjb3JkLS10b29sdGlwXCIpO1xyXG4gICAgdGhpcy5jb250ZW50RWxlbWVudCA9IHRoaXMubGF5ZXJFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWNvcmQtLXRvb2x0aXAtY29udGVudFwiKTtcclxuICAgIHRoaXMuY29udGVudCA9IGNvbnRlbnQ7XHJcbiAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuICAgIHRoaXMucG9zaXRpb24gPSBwb3NpdGlvbjtcclxuXHJcbiAgICB0aGlzLnZpc2libGUgPSBmYWxzZTtcclxuICAgIHRoaXMuZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgIHRoaXMucGF1c2VkID0gZmFsc2U7XHJcblxyXG4gICAgY29uc3Qgb25Nb3VzZUVudGVyID0gKCkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5kaXNhYmxlZCB8fCB0aGlzLnBhdXNlZCkgcmV0dXJuO1xyXG4gICAgICB0aGlzLnNob3coKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBvbk1vdXNlTGVhdmUgPSAoKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLnBhdXNlZCkgcmV0dXJuO1xyXG4gICAgICB0aGlzLmhpZGUoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnRhcmdldC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCBvbk1vdXNlRW50ZXIpO1xyXG4gICAgdGhpcy50YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgb25Nb3VzZUxlYXZlKTtcclxuXHJcbiAgICBsZXQgdW5QYXRjaE9ic2VydmVyID0gZXZlbnRzLm9uKFxyXG4gICAgICBcImRvbS1tdXRhdGlvblwiLFxyXG4gICAgICAvKiogQHBhcmFtIHtNdXRhdGlvblJlY29yZH0gbXV0ICovKG11dCkgPT4ge1xyXG4gICAgICAgIGlmIChtdXQudHlwZSA9PT0gXCJhdHRyaWJ1dGVzXCIpIHtcclxuICAgICAgICAgIGlmIChtdXQudGFyZ2V0LmlzU2FtZU5vZGUodGhpcy50YXJnZXQpKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAobXV0LmF0dHJpYnV0ZU5hbWUpIHtcclxuICAgICAgICAgICAgICBjYXNlIFwiYWNvcmQtLXRvb2x0aXAtZGlzYWJsZWRcIjoge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kaXNhYmxlZCA9IHRoaXMudGFyZ2V0LmdldEF0dHJpYnV0ZShcImFjb3JkLS10b29sdGlwLWRpc2FibGVkXCIpID09PSBcInRydWVcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBjYXNlIFwiYWNvcmQtLXRvb2x0aXAtY29udGVudFwiOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQgPSB0aGlzLnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJhY29yZC0tdG9vbHRpcC1jb250ZW50XCIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGNhc2UgXCJhY29yZC0tdG9vbHRpcC1wb3NpdGlvblwiOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uID0gdGhpcy50YXJnZXQuZ2V0QXR0cmlidXRlKFwiYWNvcmQtLXRvb2x0aXAtcG9zaXRpb25cIik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIClcclxuXHJcbiAgICB0aGlzLmRlc3Ryb3kgPSAoKSA9PiB7XHJcbiAgICAgIHRoaXMudGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsIG9uTW91c2VFbnRlcik7XHJcbiAgICAgIHRoaXMudGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIG9uTW91c2VMZWF2ZSk7XHJcbiAgICAgIHRoaXMuaGlkZSgpO1xyXG4gICAgICB1blBhdGNoT2JzZXJ2ZXIoKTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBnZXQgY29udGVudCgpIHtcclxuICAgIHJldHVybiB0aGlzLmNvbnRlbnRFbGVtZW50LmZpcnN0RWxlbWVudENoaWxkO1xyXG4gIH1cclxuXHJcbiAgc2V0IGNvbnRlbnQodmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgdGhpcy5jb250ZW50RWxlbWVudC5pbm5lckhUTUwgPSB2YWx1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuY29udGVudEVsZW1lbnQuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgdGhpcy5jb250ZW50RWxlbWVudC5hcHBlbmRDaGlsZCh2YWx1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZ2V0Q29udGFpbmVyKCkge1xyXG4gICAgY29uc3QgYXBwRWxtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2NsYXNzKj1cIm5vdERldlRvb2xzLVwiXScpO1xyXG5cclxuICAgIGxldCBjb250YWluZXIgPSBhcHBFbG0ucXVlcnlTZWxlY3RvcihcIi5hY29yZC0tdG9vbHRpcC1jb250YWluZXJcIik7XHJcbiAgICBpZiAoIWNvbnRhaW5lcikge1xyXG4gICAgICBjb250YWluZXIgPSBkb20ucGFyc2UoYDxkaXYgY2xhc3M9XCJhY29yZC0tbGF5ZXItY29udGFpbmVyIGFjb3JkLS10b29sdGlwLWNvbnRhaW5lclwiPjwvZGl2PmApO1xyXG4gICAgICBhcHBFbG0uYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcclxuICAgIH1cclxuICAgIGNvbnRhaW5lci5zdHlsZS5zZXRQcm9wZXJ0eShcIi0tdG9wLW9mZnNldFwiLCBgJHthcHBFbG0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wLnRvRml4ZWQoMSl9cHhgKTtcclxuXHJcbiAgICByZXR1cm4gY29udGFpbmVyO1xyXG4gIH1cclxuXHJcbiAgc2hvdygpIHtcclxuICAgIGlmICh0aGlzLnZpc2libGUpIHJldHVybjtcclxuICAgIHRoaXMudmlzaWJsZSA9IHRydWU7XHJcblxyXG4gICAgY29uc3QgY29udGFpbmVyID0gVG9vbHRpcC5nZXRDb250YWluZXIoKTtcclxuXHJcbiAgICBpZiAodGhpcy5wb3NpdGlvbiA9PT0gXCJhdXRvXCIpIHtcclxuICAgICAgdGhpcy5jYWxjdWxhdGVQb3NpdGlvbihcclxuICAgICAgICB0aGlzLmNhblNob3dBdFRvcCA/IFwidG9wXCJcclxuICAgICAgICAgIDogdGhpcy5jYW5TaG93QXRCb3R0b20gPyBcImJvdHRvbVwiXHJcbiAgICAgICAgICAgIDogdGhpcy5jYW5TaG93QXRMZWZ0ID8gXCJsZWZ0XCJcclxuICAgICAgICAgICAgICA6IHRoaXMuY2FuU2hvd0F0UmlnaHQgPyBcInJpZ2h0XCJcclxuICAgICAgICAgICAgICAgIDogXCJ0b3BcIlxyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5jYWxjdWxhdGVQb3NpdGlvbih0aGlzLnBvc2l0aW9uKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMubGF5ZXJFbGVtZW50KTtcclxuICAgIHRoaXMubGF5ZXJFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJ2aXNpYmxlXCIpO1xyXG4gIH1cclxuXHJcbiAgY2FsY3VsYXRlUG9zaXRpb24ocG9zaXRpb24pIHtcclxuICAgIGNvbnN0IGJvdW5kaW5nUmVjdCA9IHRoaXMudGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cclxuICAgIHRoaXMubGF5ZXJFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoLi4uT2JqZWN0LnZhbHVlcyh0b29sdGlwUG9zaXRpb25zKSk7XHJcbiAgICB0aGlzLnRvb2x0aXBFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJ2ZXJ0aWNhbFwiLCBcImhvcml6b250YWxcIik7XHJcblxyXG4gICAgc3dpdGNoIChwb3NpdGlvbikge1xyXG4gICAgICBjYXNlIFwidG9wXCI6IHtcclxuICAgICAgICB0aGlzLmxheWVyRWxlbWVudC5zdHlsZS50b3AgPSBgJHtib3VuZGluZ1JlY3QudG9wIC0gdGhpcy50YXJnZXQub2Zmc2V0SGVpZ2h0IC0gMTB9cHhgO1xyXG4gICAgICAgIHRoaXMubGF5ZXJFbGVtZW50LnN0eWxlLmxlZnQgPSBgJHtib3VuZGluZ1JlY3QubGVmdH1weGA7XHJcbiAgICAgICAgdGhpcy5sYXllckVsZW1lbnQuY2xhc3NMaXN0LmFkZCh0b29sdGlwUG9zaXRpb25zLnRvcCk7XHJcbiAgICAgICAgdGhpcy50b29sdGlwRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwidmVydGljYWxcIik7XHJcbiAgICAgICAgdGhpcy5jZW50ZXJQb3NpdGlvbihcImhvcml6b250YWxcIik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSBcImJvdHRvbVwiOiB7XHJcbiAgICAgICAgdGhpcy5sYXllckVsZW1lbnQuc3R5bGUudG9wID0gYCR7Ym91bmRpbmdSZWN0LnRvcCArIHRoaXMudGFyZ2V0Lm9mZnNldEhlaWdodCArIDEwfXB4YDtcclxuICAgICAgICB0aGlzLmxheWVyRWxlbWVudC5zdHlsZS5sZWZ0ID0gYCR7Ym91bmRpbmdSZWN0LmxlZnR9cHhgO1xyXG4gICAgICAgIHRoaXMubGF5ZXJFbGVtZW50LmNsYXNzTGlzdC5hZGQodG9vbHRpcFBvc2l0aW9ucy5ib3R0b20pO1xyXG4gICAgICAgIHRoaXMudG9vbHRpcEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInZlcnRpY2FsXCIpO1xyXG4gICAgICAgIHRoaXMuY2VudGVyUG9zaXRpb24oXCJob3Jpem9udGFsXCIpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgXCJsZWZ0XCI6IHtcclxuICAgICAgICB0aGlzLmxheWVyRWxlbWVudC5zdHlsZS50b3AgPSBgJHtib3VuZGluZ1JlY3QudG9wfXB4YDtcclxuICAgICAgICB0aGlzLmxheWVyRWxlbWVudC5zdHlsZS5sZWZ0ID0gYCR7Ym91bmRpbmdSZWN0LmxlZnQgLSB0aGlzLnRhcmdldC5vZmZzZXRXaWR0aCAtIDEwfXB4YDtcclxuICAgICAgICB0aGlzLmxheWVyRWxlbWVudC5jbGFzc0xpc3QuYWRkKHRvb2x0aXBQb3NpdGlvbnMubGVmdCk7XHJcbiAgICAgICAgdGhpcy50b29sdGlwRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiaG9yaXpvbnRhbFwiKTtcclxuICAgICAgICB0aGlzLmNlbnRlclBvc2l0aW9uKFwidmVydGljYWxcIik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSBcInJpZ2h0XCI6IHtcclxuICAgICAgICB0aGlzLmxheWVyRWxlbWVudC5zdHlsZS50b3AgPSBgJHtib3VuZGluZ1JlY3QudG9wfXB4YDtcclxuICAgICAgICB0aGlzLmxheWVyRWxlbWVudC5zdHlsZS5sZWZ0ID0gYCR7Ym91bmRpbmdSZWN0LmxlZnQgKyB0aGlzLnRhcmdldC5vZmZzZXRXaWR0aCArIDEwfXB4YDtcclxuICAgICAgICB0aGlzLmxheWVyRWxlbWVudC5jbGFzc0xpc3QuYWRkKHRvb2x0aXBQb3NpdGlvbnMucmlnaHQpO1xyXG4gICAgICAgIHRoaXMudG9vbHRpcEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImhvcml6b250YWxcIik7XHJcbiAgICAgICAgdGhpcy5jZW50ZXJQb3NpdGlvbihcInZlcnRpY2FsXCIpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjZW50ZXJQb3NpdGlvbihkaXJlY3Rpb24pIHtcclxuICAgIHN3aXRjaCAoZGlyZWN0aW9uKSB7XHJcbiAgICAgIGNhc2UgXCJob3Jpem9udGFsXCI6IHtcclxuICAgICAgICBjb25zdCBjZW50ZXIgPSB0aGlzLnRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0ICsgKHRoaXMudGFyZ2V0Lm9mZnNldFdpZHRoIC8gMik7XHJcbiAgICAgICAgdGhpcy5sYXllckVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoXCJsZWZ0XCIsIGAke2NlbnRlciAtICh0aGlzLmxheWVyRWxlbWVudC5vZmZzZXRXaWR0aCAvIDIpfXB4YCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSBcInZlcnRpY2FsXCI6IHtcclxuICAgICAgICBjb25zdCBjZW50ZXIgPSB0aGlzLnRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgKyAodGhpcy50YXJnZXQub2Zmc2V0SGVpZ2h0IC8gMik7XHJcbiAgICAgICAgdGhpcy5sYXllckVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoXCJ0b3BcIiwgYCR7Y2VudGVyIC0gKHRoaXMubGF5ZXJFbGVtZW50Lm9mZnNldEhlaWdodCAvIDIpfXB4YCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGhpZGUoKSB7XHJcbiAgICBpZiAoIXRoaXMudmlzaWJsZSkgcmV0dXJuO1xyXG4gICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5sYXllckVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcInZpc2libGVcIik7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGhpcy5sYXllckVsZW1lbnQucmVtb3ZlKCk7XHJcbiAgICB9LCA1MCk7XHJcbiAgfVxyXG5cclxuICBnZXQgY2FuU2hvd0F0VG9wKCkgeyByZXR1cm4gdGhpcy50YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wIC0gdGhpcy5sYXllckVsZW1lbnQub2Zmc2V0SGVpZ2h0ID49IDA7IH1cclxuICBnZXQgY2FuU2hvd0F0Qm90dG9tKCkgeyByZXR1cm4gdGhpcy50YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgdGhpcy50YXJnZXQub2Zmc2V0SGVpZ2h0ICsgdGhpcy5sYXllckVsZW1lbnQub2Zmc2V0SGVpZ2h0IDw9IHdpbmRvdy5pbm5lckhlaWdodDsgfVxyXG4gIGdldCBjYW5TaG93QXRMZWZ0KCkgeyByZXR1cm4gdGhpcy50YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCAtIHRoaXMubGF5ZXJFbGVtZW50Lm9mZnNldFdpZHRoID49IDA7IH1cclxuICBnZXQgY2FuU2hvd0F0UmlnaHQoKSB7IHJldHVybiB0aGlzLnRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0ICsgdGhpcy50YXJnZXQub2Zmc2V0V2lkdGggKyB0aGlzLmxheWVyRWxlbWVudC5vZmZzZXRXaWR0aCA8PSB3aW5kb3cuaW5uZXJXaWR0aDsgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGUodGFyZ2V0LCBjb250ZW50LCBwb3NpdGlvbiA9IFwiYXV0b1wiKSB7XHJcbiAgcmV0dXJuIG5ldyBUb29sdGlwKHRhcmdldCwgY29udGVudCwgcG9zaXRpb24pO1xyXG59XHJcblxyXG5kb20ucGF0Y2goXHJcbiAgXCJbYWNvcmQtLXRvb2x0aXAtY29udGVudF1cIixcclxuICAoZWxtKSA9PiB7XHJcbiAgICBsZXQgdG9vbHRpcCA9IGNyZWF0ZShlbG0sIGVsbS5nZXRBdHRyaWJ1dGUoXCJhY29yZC0tdG9vbHRpcC1jb250ZW50XCIpLCBlbG0uZ2V0QXR0cmlidXRlKFwiYWNvcmQtLXRvb2x0aXAtcG9zaXRpb25cIikpO1xyXG4gICAgdG9vbHRpcC5kaXNhYmxlZCA9IGVsbS5nZXRBdHRyaWJ1dGUoXCJhY29yZC0tdG9vbHRpcC1kaXNhYmxlZFwiKSA9PT0gXCJ0cnVlXCI7XHJcblxyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgdG9vbHRpcC5kZXN0cm95KCk7XHJcbiAgICB9XHJcbiAgfSxcclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHsgY3JlYXRlIH07IiwgImltcG9ydCBkb20gZnJvbSBcIi4uL2RvbS9pbmRleC5qc1wiO1xyXG5pbXBvcnQgdXRpbHMgZnJvbSBcIi4uL3V0aWxzL2luZGV4LmpzXCI7XHJcblxyXG5jb25zdCB2YWxpZFBvc2l0aW9ucyA9IFtcclxuICBcInRvcC1yaWdodFwiLFxyXG4gIFwidG9wLWxlZnRcIixcclxuICBcImJvdHRvbS1yaWdodFwiLFxyXG4gIFwiYm90dG9tLWxlZnRcIixcclxuICBcInRvcC1jZW50ZXJcIixcclxuICBcImJvdHRvbS1jZW50ZXJcIixcclxuICBcImNlbnRlclwiLFxyXG4gIFwibGVmdC1jZW50ZXJcIixcclxuICBcInJpZ2h0LWNlbnRlclwiXHJcbl1cclxuXHJcbmZ1bmN0aW9uIGdldENvbnRhaW5lcihwb3NpdGlvbikge1xyXG4gIGlmICghdmFsaWRQb3NpdGlvbnMuaW5jbHVkZXMocG9zaXRpb24pKSB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgcG9zaXRpb24gXCIke3Bvc2l0aW9ufVwiLiBWYWxpZCBwb3NpdGlvbnMgYXJlOiAke3ZhbGlkUG9zaXRpb25zLmpvaW4oXCIsIFwiKX1gKTtcclxuICBjb25zdCBhcHBFbG0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbY2xhc3MqPVwibm90QXBwQXNpZGVQYW5lbC1cIl0nKTtcclxuXHJcbiAgbGV0IHRvcENvbnRhaW5lciA9IGFwcEVsbS5xdWVyeVNlbGVjdG9yKFwiLmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXItY29udGFpbmVyXCIpO1xyXG4gIGlmICghdG9wQ29udGFpbmVyKSB7XHJcbiAgICB0b3BDb250YWluZXIgPSBkb20ucGFyc2UoYDxkaXYgY2xhc3M9XCJhY29yZC0tbGF5ZXItY29udGFpbmVyIGFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXItY29udGFpbmVyXCI+PC9kaXY+YCk7XHJcbiAgICBhcHBFbG0uYXBwZW5kQ2hpbGQodG9wQ29udGFpbmVyKTtcclxuICB9XHJcbiAgdG9wQ29udGFpbmVyLnN0eWxlLnNldFByb3BlcnR5KFwiLS10b3Atb2Zmc2V0XCIsIGAke2FwcEVsbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AudG9GaXhlZCgxKX1weGApO1xyXG5cclxuICBsZXQgcG9zaXRpb25Db250YWluZXIgPSB0b3BDb250YWluZXIucXVlcnlTZWxlY3RvcihgLmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIuJHtwb3NpdGlvbn1gKTtcclxuICBpZiAoIXBvc2l0aW9uQ29udGFpbmVyKSB7XHJcbiAgICBwb3NpdGlvbkNvbnRhaW5lciA9IGRvbS5wYXJzZShgPGRpdiBjbGFzcz1cImFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIgJHtwb3NpdGlvbn1cIj48L2Rpdj5gKTtcclxuICAgIHRvcENvbnRhaW5lci5hcHBlbmRDaGlsZChwb3NpdGlvbkNvbnRhaW5lcik7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gcG9zaXRpb25Db250YWluZXI7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3coY29udGVudCwge1xyXG4gIHN0eWxlID0gXCJkZWZhdWx0XCIsXHJcbiAgdGltZW91dCA9IDEwMDAwLFxyXG4gIHBvc2l0aW9uID0gXCJ0b3AtcmlnaHRcIixcclxuICBjbG9zYWJsZSA9IHRydWUsXHJcbiAgb25DbGljayA9IG51bGwsXHJcbiAgb25DbG9zZSA9IG51bGxcclxufSA9IHt9KSB7XHJcbiAgY29uc3QgY29udGFpbmVyID0gZ2V0Q29udGFpbmVyKHBvc2l0aW9uKTtcclxuXHJcbiAgY29uc3Qgbm90aWZFbG0gPSBkb20ucGFyc2UoYFxyXG4gICAgPGRpdiBjbGFzcz1cImFjb3JkLS1ub3RpZmljYXRpb24gc3R5bGUtJHtzdHlsZX0gaGlkZGVuXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGVudFwiPjwvZGl2PlxyXG4gICAgICAgICAgICA8c3ZnIGNsYXNzPVwiY2xvc2UgJHshY2xvc2FibGUgPyBcImhpZGRlblwiIDogXCJcIn1cIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiPlxyXG4gICAgICAgICAgICAgICAgPHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNMTIgMTAuNTg2bDQuOTUtNC45NSAxLjQxNCAxLjQxNC00Ljk1IDQuOTUgNC45NSA0Ljk1LTEuNDE0IDEuNDE0LTQuOTUtNC45NS00Ljk1IDQuOTUtMS40MTQtMS40MTQgNC45NS00Ljk1LTQuOTUtNC45NUw3LjA1IDUuNjM2elwiLz5cclxuICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInByb2dyZXNzLWNvbnRhaW5lclwiIHN0eWxlPVwiLS1kdXJhdGlvbjogJHt0aW1lb3V0fW1zO1wiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZ3Jlc3NcIj48L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIGApO1xyXG5cclxuICBub3RpZkVsbS5xdWVyeVNlbGVjdG9yKFwiLmNvbnRlbnRcIikuaW5uZXJIVE1MID0gY29udGVudDtcclxuXHJcbiAgbGV0IGNsb3NlZCA9IGZhbHNlO1xyXG4gIGZ1bmN0aW9uIGNsb3NlKGNsb3NlVHlwZSkge1xyXG4gICAgaWYgKGNsb3NlZCkgcmV0dXJuO1xyXG4gICAgY2xvc2VkID0gdHJ1ZTtcclxuXHJcbiAgICBub3RpZkVsbS5jbGFzc0xpc3QuYWRkKFwiY2xvc2luZ1wiKTtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBub3RpZkVsbS5yZW1vdmUoKTtcclxuXHJcbiAgICAgIHV0aWxzLmlmRXhpc3RzKFxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLiR7cG9zaXRpb259YCksXHJcbiAgICAgICAgLyoqIEBwYXJhbSB7SFRNTERpdkVsZW1lbnR9IGVsbSAqLyhlbG0pID0+IHtcclxuICAgICAgICAgIGlmICghZWxtLmNoaWxkRWxlbWVudENvdW50KSBlbG0ucmVtb3ZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICApO1xyXG4gICAgfSwgMjc1KTtcclxuICAgIG9uQ2xvc2U/LihjbG9zZVR5cGUpO1xyXG4gIH1cclxuXHJcbiAgaWYgKHR5cGVvZiBvbkNsaWNrID09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgbm90aWZFbG0uY2xhc3NMaXN0LmFkZChcImNsaWNrYWJsZVwiKTtcclxuICAgIG5vdGlmRWxtLm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgIG9uQ2xpY2soY2xvc2UpO1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHV0aWxzLmlmRXhpc3RzKG5vdGlmRWxtLnF1ZXJ5U2VsZWN0b3IoXCIuY2xvc2VcIiksIChlbG0pID0+IHtcclxuICAgIGVsbS5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgICBjbG9zZShcInVzZXJcIik7XHJcbiAgICB9O1xyXG4gIH0pO1xyXG5cclxuICBjb250YWluZXIucHJlcGVuZChub3RpZkVsbSk7XHJcbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcclxuICAgIG5vdGlmRWxtLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XHJcbiAgICBub3RpZkVsbS5xdWVyeVNlbGVjdG9yKFwiLnByb2dyZXNzXCIpLmNsYXNzTGlzdC5hZGQoXCJwcm9ncmVzc2luZ1wiKTtcclxuICB9KTtcclxuXHJcbiAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICBjbG9zZShcInRpbWVvdXRcIik7XHJcbiAgfSwgdGltZW91dCk7XHJcblxyXG4gIHJldHVybiAoKSA9PiB7XHJcbiAgICBjbG9zZShcImZvcmNlXCIpO1xyXG4gIH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBzaG93OiBPYmplY3QuYXNzaWduKHNob3csIHtcclxuICAgIGluZm86IChodG1sLCBvYmogPSB7fSkgPT4gc2hvdyhodG1sLCB7IC4uLm9iaiwgc3R5bGU6IFwiaW5mb1wiIH0pLFxyXG4gICAgZXJyb3I6IChodG1sLCBvYmogPSB7fSkgPT4gc2hvdyhodG1sLCB7IC4uLm9iaiwgc3R5bGU6IFwiZXJyb3JcIiB9KSxcclxuICAgIHdhcm5pbmc6IChodG1sLCBvYmogPSB7fSkgPT4gc2hvdyhodG1sLCB7IC4uLm9iaiwgc3R5bGU6IFwid2FybmluZ1wiIH0pLFxyXG4gICAgc3VjY2VzczogKGh0bWwsIG9iaiA9IHt9KSA9PiBzaG93KGh0bWwsIHsgLi4ub2JqLCBzdHlsZTogXCJzdWNjZXNzXCIgfSksXHJcbiAgfSksXHJcbn07IiwgImltcG9ydCB3ZWJwYWNrIGZyb20gXCIuLi9tb2R1bGVzL3dlYnBhY2suanNcIjtcclxuaW1wb3J0IHBhdGNoZXIgZnJvbSBcIi4uL3BhdGNoZXIvaW5kZXguanNcIjtcclxuaW1wb3J0IGxvZ2dlciBmcm9tIFwiLi4vdXRpbHMvbG9nZ2VyLmpzXCI7XHJcblxyXG5pbXBvcnQgY29tbW9uIGZyb20gXCIuLi9tb2R1bGVzL2NvbW1vbi5qc1wiO1xyXG5pbXBvcnQgeyBmaW5kZXJNYXAgfSBmcm9tIFwiLi4vbW9kdWxlcy9yYXcvY29tcGxleC1maW5kZXIuanNcIjtcclxuY29uc3QgeyBSZWFjdCB9ID0gY29tbW9uO1xyXG5cclxubGV0IGlzUmVhZHkgPSBmYWxzZTtcclxuXHJcbmNvbnN0IENvbXBvbmVudHMgPSAoKCkgPT4ge1xyXG4gIGNvbnN0IG91dCA9IHt9O1xyXG4gIGNvbnN0IGNvbXBvbmVudE1hcCA9IHtcclxuICAgIHNlcGFyYXRvcjogXCJTZXBhcmF0b3JcIixcclxuICAgIGNoZWNrYm94OiBcIkNoZWNrYm94SXRlbVwiLFxyXG4gICAgcmFkaW86IFwiUmFkaW9JdGVtXCIsXHJcbiAgICBjb250cm9sOiBcIkNvbnRyb2xJdGVtXCIsXHJcbiAgICBncm91cHN0YXJ0OiBcIkdyb3VwXCIsXHJcbiAgICBjdXN0b21pdGVtOiBcIkl0ZW1cIlxyXG4gIH07XHJcblxyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBtb2R1bGVJZCA9IE9iamVjdC5lbnRyaWVzKHdlYnBhY2sucmVxdWlyZS5tKS5maW5kKChbLCBtXSkgPT4gbT8udG9TdHJpbmcoKS5pbmNsdWRlcyhcIm1lbnVpdGVtY2hlY2tib3hcIikpWzBdO1xyXG4gICAgY29uc3QgY29udGV4dE1lbnVNb2R1bGUgPSB3ZWJwYWNrLmZpbmQoKF8sIGlkeCkgPT4gaWR4ID09IG1vZHVsZUlkKS5leHBvcnRzO1xyXG4gICAgY29uc3QgcmF3TWF0Y2hlcyA9IHdlYnBhY2sucmVxdWlyZS5tW21vZHVsZUlkXS50b1N0cmluZygpLm1hdGNoQWxsKC9pZlxcKFxcdytcXC50eXBlPT09XFx3K1xcLihcXHcrKVxcKS4rP3R5cGU6XCIoLis/KVwiL2cpO1xyXG5cclxuICAgIG91dC5NZW51ID0gT2JqZWN0LnZhbHVlcyhjb250ZXh0TWVudU1vZHVsZSkuZmluZCh2ID0+IHYudG9TdHJpbmcoKS5pbmNsdWRlcyhcIi5pc1VzaW5nS2V5Ym9hcmROYXZpZ2F0aW9uXCIpKTtcclxuXHJcbiAgICBbLi4ucmF3TWF0Y2hlc10uZm9yRWFjaCgoWywgaWQsIHR5cGVdKSA9PiB7XHJcbiAgICAgIG91dFtjb21wb25lbnRNYXBbdHlwZV1dID0gY29udGV4dE1lbnVNb2R1bGVbaWRdO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXNSZWFkeSA9IE9iamVjdC52YWx1ZXMoY29tcG9uZW50TWFwKS5ldmVyeShrID0+IG91dFtrXSkgJiYgISFvdXQuTWVudTtcclxuICB9IGNhdGNoIChlcnIpIHtcclxuICAgIGlzUmVhZHkgPSBmYWxzZTtcclxuICAgIGxvZ2dlci5lcnJvcihcIkZhaWxlZCB0byBsb2FkIGNvbnRleHQgbWVudSBjb21wb25lbnRzXCIsIGVycik7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gb3V0O1xyXG59KSgpO1xyXG5cclxuY29uc3QgQWN0aW9ucyA9ICgoKSA9PiB7XHJcbiAgbGV0IG9nTW9kdWxlID0gd2VicGFjay5maWx0ZXIobSA9PiBPYmplY3QudmFsdWVzKG0pLnNvbWUodiA9PiB0eXBlb2YgdiA9PT0gXCJmdW5jdGlvblwiICYmIHYudG9TdHJpbmcoKS5pbmNsdWRlcyhcIkNPTlRFWFRfTUVOVV9DTE9TRVwiKSkpLmZpbmQobSA9PiBtLmV4cG9ydHMgIT09IHdpbmRvdykuZXhwb3J0c1xyXG4gIGNvbnN0IG91dCA9IGZpbmRlck1hcChvZ01vZHVsZSwge1xyXG4gICAgY2xvc2U6IFtcIkNPTlRFWFRfTUVOVV9DTE9TRVwiXSxcclxuICAgIG9wZW46IFtcInJlbmRlckxhenlcIl1cclxuICB9KTtcclxuICBpc1JlYWR5ID0gaXNSZWFkeSAmJiAhIW91dC5jbG9zZSAmJiAhIW91dC5vcGVuO1xyXG4gIHJldHVybiBvdXQ7XHJcbn0pKCk7XHJcblxyXG5cclxuY2xhc3MgTWVudVBhdGNoZXIge1xyXG4gIHN0YXRpYyBNQVhfUEFUQ0hfSVRFUkFUSU9OUyA9IDE2O1xyXG4gIHN0YXRpYyBwYXRjaGVzID0gbmV3IE1hcCgpO1xyXG4gIHN0YXRpYyBzdWJQYXRjaGVzID0gbmV3IFdlYWtNYXAoKTtcclxuXHJcbiAgc3RhdGljIGluaXRpYWxpemUoKSB7XHJcbiAgICBpZiAoIWlzUmVhZHkpIHJldHVybiBsb2dnZXIud2FybihcIlVuYWJsZSB0byBsb2FkIGNvbnRleHQgbWVudS5cIik7XHJcblxyXG4gICAgY29uc3QgbW9kdWxlVG9QYXRjaCA9IHdlYnBhY2suZmlsdGVyKG0gPT4gT2JqZWN0LnZhbHVlcyhtKS5zb21lKHYgPT4gdHlwZW9mIHYgPT09IFwiZnVuY3Rpb25cIiAmJiB2LnRvU3RyaW5nKCkuaW5jbHVkZXMoXCJDT05URVhUX01FTlVfQ0xPU0VcIikpKS5maW5kKG0gPT4gbS5leHBvcnRzICE9PSB3aW5kb3cpLmV4cG9ydHM7XHJcbiAgICBjb25zdCBrZXlUb1BhdGNoID0gT2JqZWN0LmtleXMobW9kdWxlVG9QYXRjaCkuZmluZChrID0+IG1vZHVsZVRvUGF0Y2hba10/Lmxlbmd0aCA9PT0gMyk7XHJcblxyXG4gICAgY29uc29sZS5sb2cobW9kdWxlVG9QYXRjaCwga2V5VG9QYXRjaCk7XHJcblxyXG4gICAgcGF0Y2hlci5iZWZvcmUoXHJcbiAgICAgIGtleVRvUGF0Y2gsXHJcbiAgICAgIG1vZHVsZVRvUGF0Y2gsXHJcbiAgICAgIGZ1bmN0aW9uIChtZXRob2RBcmdzKSB7XHJcbiAgICAgICAgY29uc3QgcHJvbWlzZSA9IG1ldGhvZEFyZ3NbMV07XHJcbiAgICAgICAgbWV0aG9kQXJnc1sxXSA9IGFzeW5jIGZ1bmN0aW9uICguLi5hcmdzKSB7XHJcbiAgICAgICAgICBjb25zdCByZW5kZXIgPSBhd2FpdCBwcm9taXNlLmNhbGwodGhpcywgLi4uYXJncyk7XHJcblxyXG4gICAgICAgICAgcmV0dXJuIChwcm9wcykgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCByZXMgPSByZW5kZXIocHJvcHMpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHJlcz8ucHJvcHMubmF2SWQpIHtcclxuICAgICAgICAgICAgICBNZW51UGF0Y2hlci5leGVjdXRlUGF0Y2hlcyhyZXMucHJvcHMubmF2SWQsIHJlcywgcHJvcHMpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiByZXM/LnR5cGUgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgICAgICAgIE1lbnVQYXRjaGVyLnBhdGNoUmVjdXJzaXZlKHJlcywgXCJ0eXBlXCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG1ldGhvZEFyZ3M7XHJcbiAgICAgIH1cclxuICAgIClcclxuICB9XHJcblxyXG4gIHN0YXRpYyBwYXRjaFJlY3Vyc2l2ZSh0YXJnZXQsIG1ldGhvZCwgaXRlcmF0aW9uID0gMCkge1xyXG4gICAgaWYgKGl0ZXJhdGlvbiA+PSB0aGlzLk1BWF9QQVRDSF9JVEVSQVRJT05TKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgcHJveHlGdW5jdGlvbiA9IHRoaXMuc3ViUGF0Y2hlcy5nZXQodGFyZ2V0W21ldGhvZF0pID8/ICgoKSA9PiB7XHJcbiAgICAgIGNvbnN0IG9yaWdpbmFsRnVuY3Rpb24gPSB0YXJnZXRbbWV0aG9kXTtcclxuICAgICAgY29uc3QgZGVwdGggPSArK2l0ZXJhdGlvbjtcclxuICAgICAgZnVuY3Rpb24gcGF0Y2goLi4uYXJncykge1xyXG4gICAgICAgIGNvbnN0IHJlcyA9IG9yaWdpbmFsRnVuY3Rpb24uY2FsbCh0aGlzLCAuLi5hcmdzKTtcclxuXHJcbiAgICAgICAgaWYgKCFyZXMpIHJldHVybiByZXM7XHJcblxyXG4gICAgICAgIGNvbnN0IG5hdklkID0gcmVzLnByb3BzPy5uYXZJZCA/PyByZXMucHJvcHM/LmNoaWxkcmVuPy5wcm9wcz8ubmF2SWQ7XHJcbiAgICAgICAgaWYgKG5hdklkKSB7XHJcbiAgICAgICAgICBNZW51UGF0Y2hlci5leGVjdXRlUGF0Y2hlcyhuYXZJZCwgcmVzLCBhcmdzWzBdKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29uc3QgbGF5ZXIgPSByZXMucHJvcHMuY2hpbGRyZW4gPyByZXMucHJvcHMuY2hpbGRyZW4gOiByZXM7XHJcblxyXG4gICAgICAgICAgaWYgKHR5cGVvZiBsYXllcj8udHlwZSA9PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICAgICAgTWVudVBhdGNoZXIucGF0Y2hSZWN1cnNpdmUobGF5ZXIsIFwidHlwZVwiLCBkZXB0aCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBwYXRjaC5fX29yaWdpbmFsX18gPSBvcmlnaW5hbEZ1bmN0aW9uO1xyXG4gICAgICBPYmplY3QuYXNzaWduKHBhdGNoLCBvcmlnaW5hbEZ1bmN0aW9uKTtcclxuICAgICAgdGhpcy5zdWJQYXRjaGVzLnNldChvcmlnaW5hbEZ1bmN0aW9uLCBwYXRjaCk7XHJcblxyXG4gICAgICByZXR1cm4gcGF0Y2g7XHJcbiAgICB9KSgpO1xyXG5cclxuICAgIHRhcmdldFttZXRob2RdID0gcHJveHlGdW5jdGlvbjtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBleGVjdXRlUGF0Y2hlcyhpZCwgcmVzLCBwcm9wcykge1xyXG4gICAgaWYgKCF0aGlzLnBhdGNoZXMuaGFzKGlkKSkgcmV0dXJuO1xyXG5cclxuICAgIHRoaXMucGF0Y2hlcy5nZXQoaWQpLmZvckVhY2gocGF0Y2ggPT4ge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIHBhdGNoKHJlcywgcHJvcHMpO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBsb2dnZXIuZXJyb3IoXCJGYWlsZWQgdG8gcGF0Y2ggY29udGV4dCBtZW51XCIsIHBhdGNoLCBlcnIpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuXHJcbk1lbnVQYXRjaGVyLmluaXRpYWxpemUoKTtcclxuXHJcblxyXG4vLyBDb3BpZWQgZnJvbSBiZCdzIHNvdXJjZVxyXG5mdW5jdGlvbiBidWlsZEl0ZW0ocHJvcHMpIHtcclxuICBjb25zdCB7IHR5cGUgfSA9IHByb3BzO1xyXG4gIGlmICh0eXBlID09PSBcInNlcGFyYXRvclwiKSByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChDb21wb25lbnRzLlNlcGFyYXRvcik7XHJcblxyXG4gIGxldCBjb21wb25lbnQgPSBDb21wb25lbnRzLkl0ZW07XHJcbiAgaWYgKHR5cGUgPT09IFwic3VibWVudVwiKSB7XHJcbiAgICBpZiAoIXByb3BzLmNoaWxkcmVuKSBwcm9wcy5jaGlsZHJlbiA9IGJ1aWxkTWVudUNoaWxkcmVuKHByb3BzLnJlbmRlciB8fCBwcm9wcy5pdGVtcyk7XHJcbiAgfSBlbHNlIGlmICh0eXBlID09PSBcInRvZ2dsZVwiIHx8IHR5cGUgPT09IFwicmFkaW9cIikge1xyXG4gICAgY29tcG9uZW50ID0gdHlwZSA9PT0gXCJ0b2dnbGVcIiA/IENvbXBvbmVudHMuQ2hlY2tib3hJdGVtIDogQ29tcG9uZW50cy5SYWRpb0l0ZW07XHJcbiAgICBpZiAocHJvcHMuYWN0aXZlKSBwcm9wcy5jaGVja2VkID0gcHJvcHMuYWN0aXZlO1xyXG4gIH0gZWxzZSBpZiAodHlwZSA9PT0gXCJjb250cm9sXCIpIHtcclxuICAgIGNvbXBvbmVudCA9IENvbXBvbmVudHMuQ29udHJvbEl0ZW07XHJcbiAgfVxyXG4gIGlmICghcHJvcHMuaWQpIHByb3BzLmlkID0gYCR7cHJvcHMubGFiZWwucmVwbGFjZSgvXlteYS16XSt8W15cXHctXSsvZ2ksIFwiLVwiKX1gO1xyXG4gIGlmIChwcm9wcy5kYW5nZXIpIHByb3BzLmNvbG9yID0gXCJjb2xvckRhbmdlclwiO1xyXG4gIHByb3BzLmV4dGVuZGVkID0gdHJ1ZTtcclxuXHJcbiAgaWYgKHR5cGUgPT09IFwidG9nZ2xlXCIpIHtcclxuICAgIGNvbnN0IFthY3RpdmUsIGRvVG9nZ2xlXSA9IFJlYWN0LnVzZVN0YXRlKHByb3BzLmNoZWNrZWQgfHwgZmFsc2UpO1xyXG4gICAgY29uc3Qgb3JpZ2luYWxBY3Rpb24gPSBwcm9wcy5hY3Rpb247XHJcbiAgICBwcm9wcy5jaGVja2VkID0gYWN0aXZlO1xyXG4gICAgcHJvcHMuYWN0aW9uID0gZnVuY3Rpb24gKGV2KSB7XHJcbiAgICAgIG9yaWdpbmFsQWN0aW9uKGV2KTtcclxuICAgICAgZG9Ub2dnbGUoIWFjdGl2ZSk7XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoY29tcG9uZW50LCBwcm9wcyk7XHJcbn1cclxuXHJcbi8vIENvcGllZCBmcm9tIGJkJ3Mgc291cmNlXHJcbmZ1bmN0aW9uIGJ1aWxkTWVudUNoaWxkcmVuKHNldHVwKSB7XHJcbiAgY29uc3QgbWFwcGVyID0gcyA9PiB7XHJcbiAgICBpZiAocy50eXBlID09PSBcImdyb3VwXCIpIHJldHVybiBidWlsZEdyb3VwKHMpO1xyXG4gICAgcmV0dXJuIGJ1aWxkSXRlbShzKTtcclxuICB9O1xyXG4gIGNvbnN0IGJ1aWxkR3JvdXAgPSBmdW5jdGlvbiAoZ3JvdXApIHtcclxuICAgIGNvbnN0IGl0ZW1zID0gZ3JvdXAuaXRlbXMubWFwKG1hcHBlcikuZmlsdGVyKGkgPT4gaSk7XHJcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChNZW51Q29tcG9uZW50cy5Hcm91cCwgbnVsbCwgaXRlbXMpO1xyXG4gIH07XHJcbiAgcmV0dXJuIHNldHVwLm1hcChtYXBwZXIpLmZpbHRlcihpID0+IGkpO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgX19jYWNoZV9fOiB7XHJcbiAgICBwYXRjaGVzOiBNZW51UGF0Y2hlci5wYXRjaGVzLFxyXG4gICAgc3ViUGF0Y2hlczogTWVudVBhdGNoZXIuc3ViUGF0Y2hlc1xyXG4gIH0sXHJcbiAgcGF0Y2gobmF2SWQsIGNiKSB7XHJcbiAgICBpZiAoIU1lbnVQYXRjaGVyLnBhdGNoZXMuaGFzKG5hdklkKSkgTWVudVBhdGNoZXIucGF0Y2hlcy5zZXQobmF2SWQsIG5ldyBTZXQoKSk7XHJcbiAgICBNZW51UGF0Y2hlci5wYXRjaGVzLmdldChuYXZJZCkuYWRkKGNiKTtcclxuXHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBNZW51UGF0Y2hlci5wYXRjaGVzLmdldChuYXZJZCkuZGVsZXRlKGNiKTtcclxuICAgIH1cclxuICB9LFxyXG4gIG9wZW4oZXZlbnQsIGNvbXBvbmVudCwgY29uZmlnKSB7XHJcbiAgICByZXR1cm4gQWN0aW9ucy5vcGVuKGV2ZW50LCAoZSkgPT4gUmVhY3QuY3JlYXRlRWxlbWVudChjb21wb25lbnQsIE9iamVjdC5hc3NpZ24oe30sIGUsIHsgb25DbG9zZTogQWN0aW9ucy5jbG9zZSB9KSksIGNvbmZpZyk7XHJcbiAgfSxcclxuICBjbG9zZSgpIHtcclxuICAgIHJldHVybiBBY3Rpb25zLmNsb3NlKCk7XHJcbiAgfSxcclxuICBidWlsZDoge1xyXG4gICAgaXRlbShzZXR1cCkge1xyXG4gICAgICByZXR1cm4gYnVpbGRNZW51Q2hpbGRyZW4oc2V0dXApO1xyXG4gICAgfSxcclxuICAgIG1lbnUoc2V0dXApIHtcclxuICAgICAgcmV0dXJuIChwcm9wcykgPT4gUmVhY3QuY3JlYXRlRWxlbWVudChNZW51Q29tcG9uZW50cy5NZW51LCBwcm9wcywgdGhpcy5idWlsZE1lbnVDaGlsZHJlbihzZXR1cCkpO1xyXG4gICAgfVxyXG4gIH1cclxufTsiLCAiaW1wb3J0IGNvbW1vbiBmcm9tIFwiLi4vLi4vYXBpL21vZHVsZXMvY29tbW9uXCI7XHJcbmltcG9ydCBsb2dnZXIgZnJvbSBcIi4uLy4uL2FwaS91dGlscy9sb2dnZXIuanNcIjtcclxuY29uc3QgeyBSZWFjdCB9ID0gY29tbW9uO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXJyb3JCb3VuZGFyeSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuICAgIHRoaXMuc3RhdGUgPSB7IGVycm9yOiBudWxsIH07XHJcbiAgfVxyXG5cclxuICBjb21wb25lbnREaWRDYXRjaChlcnJvcikge1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7IGVycm9yIH0pO1xyXG4gICAgbG9nZ2VyLmVycm9yKGVycm9yKTtcclxuICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5vbkVycm9yID09PSBcImZ1bmN0aW9uXCIpIHRoaXMucHJvcHMub25FcnJvcihlcnJvcik7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICBpZiAodGhpcy5zdGF0ZS5lcnJvcikgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiYWNvcmQtLXJlYWN0LWVycm9yXCI+XHJcbiAgICAgIDxwPlVuZXhwZWN0ZWQgUmVhY3QgRXJyb3IgSGFwcGVuZWQuPC9wPlxyXG4gICAgICA8cD57YCR7dGhpcy5zdGF0ZS5lcnJvcn1gfTwvcD5cclxuICAgIDwvZGl2PjtcclxuICAgIHJldHVybiB0aGlzLnByb3BzLmNoaWxkcmVuO1xyXG4gIH1cclxufVxyXG5cclxuY29uc3Qgb3JpZ2luYWxSZW5kZXIgPSBFcnJvckJvdW5kYXJ5LnByb3RvdHlwZS5yZW5kZXI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShFcnJvckJvdW5kYXJ5LnByb3RvdHlwZSwgXCJyZW5kZXJcIiwge1xyXG4gIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gIGNvbmZpZ3VyYWJsZTogZmFsc2UsXHJcbiAgc2V0OiBmdW5jdGlvbiAoKSB7IHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBzZXQgcmVuZGVyIG1ldGhvZCBvZiBFcnJvckJvdW5kYXJ5XCIpOyB9LFxyXG4gIGdldDogKCkgPT4gb3JpZ2luYWxSZW5kZXJcclxufSk7IiwgImltcG9ydCBFcnJvckJvdW5kYXJ5IGZyb20gXCIuLi8uLi9saWIvY29tcG9uZW50cy9FcnJvckJvdW5kYXJ5LmpzeFwiO1xyXG5pbXBvcnQgY29tbW9uIGZyb20gXCIuLi9tb2R1bGVzL2NvbW1vbi5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIEVycm9yQm91bmRhcnksXHJcbiAgQnV0dG9uOiBjb21tb24uY29tcG9uZW50cy5CdXR0b24sXHJcbiAgTWFya2Rvd246IGNvbW1vbi5jb21wb25lbnRzLk1hcmtkb3duLFxyXG4gIFRleHQ6IGNvbW1vbi5jb21wb25lbnRzLlRleHQsXHJcbiAgQ29uZmlybWF0aW9uTW9kYWw6IGNvbW1vbi5jb21wb25lbnRzLkNvbmZpcm1hdGlvbk1vZGFsLFxyXG4gIE1vZGFsUm9vdDogY29tbW9uLm1vZGFscy5jb21wb25lbnRzLlJvb3QsXHJcbiAgTW9kYWxDbG9zZUJ1dHRvbjogY29tbW9uLm1vZGFscy5jb21wb25lbnRzLm90aGVyLkNsb3NlQnV0dG9uLFxyXG4gIE1vZGFsSGVhZGVyOiBjb21tb24ubW9kYWxzLmNvbXBvbmVudHMub3RoZXIuSGVhZGVyLFxyXG4gIE1vZGFsQ29udGVudDogY29tbW9uLm1vZGFscy5jb21wb25lbnRzLm90aGVyLkNvbnRlbnQsXHJcbiAgTW9kYWxGb290ZXI6IGNvbW1vbi5tb2RhbHMuY29tcG9uZW50cy5vdGhlci5Gb290ZXIsXHJcbiAgTW9kYWxMaXN0Q29udGVudDogY29tbW9uLm1vZGFscy5jb21wb25lbnRzLm90aGVyLkxpc3RDb250ZW50LFxyXG59IiwgImltcG9ydCBFcnJvckJvdW5kYXJ5IGZyb20gXCIuLi8uLi9saWIvY29tcG9uZW50cy9FcnJvckJvdW5kYXJ5LmpzeFwiO1xyXG5pbXBvcnQgY29tbW9uIGZyb20gXCIuLi9tb2R1bGVzL2NvbW1vbi5qc1wiO1xyXG5pbXBvcnQgaTE4biBmcm9tIFwiLi4vaTE4bi9pbmRleC5qc1wiXHJcbmNvbnN0IHsgUmVhY3QsIEZsdXhEaXNwYXRjaGVyLCBjb21wb25lbnRzLCBtb2RhbHMsIFVzZXJTdG9yZSB9ID0gY29tbW9uO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIHNob3c6IHtcclxuICAgIGNvbmZpcm1hdGlvbih0aXRsZSwgY29udGVudCwgeyBjb25maXJtID0gbnVsbCwgY2FuY2VsID0gbnVsbCwgZGFuZ2VyID0gZmFsc2UsIGtleSA9IHVuZGVmaW5lZCwgdGltZW91dCA9IDYwMDAwICogNSB9ID0ge30pIHtcclxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGNvbnRlbnQpKSBjb250ZW50ID0gW2NvbnRlbnRdO1xyXG4gICAgICAgIGNvbnRlbnQgPSBjb250ZW50Lm1hcChpID0+IHR5cGVvZiBpID09PSBcInN0cmluZ1wiID8gUmVhY3QuY3JlYXRlRWxlbWVudChjb21wb25lbnRzLk1hcmtkb3duLCBudWxsLCBpKSA6IGkpO1xyXG4gICAgICAgIGNvbnN0IG1vZGFsS2V5ID0gbW9kYWxzLmFjdGlvbnMub3BlbigocHJvcHMpID0+IHtcclxuICAgICAgICAgIGxldCBpbnRlcmFjdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICByZXR1cm4gPEVycm9yQm91bmRhcnkgb25FcnJvcj17KCkgPT4geyByZXNvbHZlKGZhbHNlKTsgfX0+XHJcbiAgICAgICAgICAgIDxjb21wb25lbnRzLkNvbmZpcm1hdGlvbk1vZGFsXHJcbiAgICAgICAgICAgICAgaGVhZGVyPXt0aXRsZX1cclxuICAgICAgICAgICAgICBjb25maXJtQnV0dG9uQ29sb3I9e2RhbmdlciA/IGNvbXBvbmVudHMuQnV0dG9uLkNvbG9ycy5SRUQgOiBjb21wb25lbnRzLkJ1dHRvbi5Db2xvcnMuQlJBTkR9XHJcbiAgICAgICAgICAgICAgY29uZmlybVRleHQ9e2NvbmZpcm0gfHwgaTE4bi5mb3JtYXQoXCJDT05GSVJNXCIpfVxyXG4gICAgICAgICAgICAgIGNhbmNlbFRleHQ9e2NhbmNlbH1cclxuICAgICAgICAgICAgICBvbkNhbmNlbD17KCkgPT4geyByZXNvbHZlKGZhbHNlKTsgbW9kYWxzLmFjdGlvbnMuY2xvc2UobW9kYWxLZXkpOyBpbnRlcmFjdGVkID0gdHJ1ZTsgfX1cclxuICAgICAgICAgICAgICBvbkNvbmZpcm09eygpID0+IHsgcmVzb2x2ZSh0cnVlKTsgbW9kYWxzLmFjdGlvbnMuY2xvc2UobW9kYWxLZXkpOyBpbnRlcmFjdGVkID0gdHJ1ZTsgfX1cclxuICAgICAgICAgICAgICB7Li4ucHJvcHN9XHJcbiAgICAgICAgICAgICAgb25DbG9zZT17KCkgPT4geyBwcm9wcy5vbkNsb3NlKCk7IHJlc29sdmUoZmFsc2UpOyBtb2RhbHMuYWN0aW9ucy5jbG9zZShtb2RhbEtleSk7IH19XHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICA8RXJyb3JCb3VuZGFyeSBvbkVycm9yPXsoKSA9PiB7IHJlc29sdmUoZmFsc2UpOyB9fT5cclxuICAgICAgICAgICAgICAgIHtjb250ZW50fVxyXG4gICAgICAgICAgICAgIDwvRXJyb3JCb3VuZGFyeT5cclxuICAgICAgICAgICAgPC9jb21wb25lbnRzLkNvbmZpcm1hdGlvbk1vZGFsPlxyXG4gICAgICAgICAgPC9FcnJvckJvdW5kYXJ5PlxyXG4gICAgICAgIH0sIHsgbW9kYWxLZXk6IGtleSB9KTtcclxuICAgICAgICBpZiAodGltZW91dCkge1xyXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghaW50ZXJhY3RlZCkge1xyXG4gICAgICAgICAgICAgIHJlc29sdmUoZmFsc2UpO1xyXG4gICAgICAgICAgICAgIG1vZGFscy5hY3Rpb25zLmNsb3NlKG1vZGFsS2V5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSwgdGltZW91dCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBjbG9zZShrZXkpIHtcclxuICAgICAgcmV0dXJuIG1vZGFscy5hY3Rpb25zLmNsb3NlKGtleSk7XHJcbiAgICB9LFxyXG4gICAgdXNlcih1c2VySWQpIHtcclxuICAgICAgaWYgKCFVc2VyU3RvcmUuZ2V0VXNlcih1c2VySWQpKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIEZsdXhEaXNwYXRjaGVyLmRpc3BhdGNoKHsgdHlwZTogXCJVU0VSX1BST0ZJTEVfTU9EQUxfT1BFTlwiLCB1c2VySWQgfSk7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSxcclxuICAgIGFsZXJ0KHRpdGxlLCBjb250ZW50LCB7IGNvbmZpcm0gPSBudWxsLCBrZXkgPSB1bmRlZmluZWQsIHRpbWVvdXQgPSA2MDAwMCAqIDUgfSA9IHt9KSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmNvbmZpcm1hdGlvbih0aXRsZSwgY29udGVudCwgeyBjb25maXJtLCBjYW5jZWw6IG51bGwsIGtleSwgdGltZW91dCB9KTtcclxuICAgIH1cclxuICB9XHJcbn0iLCAiaW1wb3J0IGRvbSBmcm9tIFwiLi4vZG9tL2luZGV4LmpzXCI7XHJcblxyXG5mdW5jdGlvbiBnZXRDb250YWluZXIoKSB7XHJcbiAgY29uc3QgYXBwRWxtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2NsYXNzKj1cIm5vdEFwcEFzaWRlUGFuZWwtXCJdJyk7XHJcblxyXG4gIGxldCB0b3BDb250YWluZXIgPSBhcHBFbG0ucXVlcnlTZWxlY3RvcihcIi5hY29yZC0tdG9hc3RzLWNvbnRhaW5lclwiKTtcclxuICBpZiAoIXRvcENvbnRhaW5lcikge1xyXG4gICAgdG9wQ29udGFpbmVyID0gZG9tLnBhcnNlKGA8ZGl2IGNsYXNzPVwiYWNvcmQtLWxheWVyLWNvbnRhaW5lciBhY29yZC0tdG9hc3RzLWNvbnRhaW5lclwiPjwvZGl2PmApO1xyXG4gICAgYXBwRWxtLmFwcGVuZENoaWxkKHRvcENvbnRhaW5lcik7XHJcbiAgfVxyXG4gIHRvcENvbnRhaW5lci5zdHlsZS5zZXRQcm9wZXJ0eShcIi0tdG9wLW9mZnNldFwiLCBgJHthcHBFbG0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wLnRvRml4ZWQoMSl9cHhgKTtcclxuXHJcbiAgcmV0dXJuIHRvcENvbnRhaW5lcjtcclxufVxyXG5cclxuY29uc3QgaWNvbnMgPSB7XHJcbiAgaW5mbzogYDxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiPjxwYXRoIGQ9XCJNMTIgMjJDNi40NzcgMjIgMiAxNy41MjMgMiAxMlM2LjQ3NyAyIDEyIDJzMTAgNC40NzcgMTAgMTAtNC40NzcgMTAtMTAgMTB6bS0xLTExdjZoMnYtNmgtMnptMC00djJoMlY3aC0yelwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIiAvPjwvc3ZnPmAsXHJcbiAgd2FybmluZzogYDxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiPjxwYXRoIGQ9XCJNMTIgMjJDNi40NzcgMjIgMiAxNy41MjMgMiAxMlM2LjQ3NyAyIDEyIDJzMTAgNC40NzcgMTAgMTAtNC40NzcgMTAtMTAgMTB6bS0xLTd2Mmgydi0yaC0yem0wLTh2NmgyVjdoLTJ6XCIgZmlsbD1cImN1cnJlbnRDb2xvclwiIC8+PC9zdmc+YCxcclxuICBlcnJvcjogYDxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiPjxwYXRoIGQ9XCJNMTIgMjJDNi40NzcgMjIgMiAxNy41MjMgMiAxMlM2LjQ3NyAyIDEyIDJzMTAgNC40NzcgMTAgMTAtNC40NzcgMTAtMTAgMTB6bS0xLTd2Mmgydi0yaC0yem0wLTh2NmgyVjdoLTJ6XCJmaWxsPVwiY3VycmVudENvbG9yXCIgLz48L3N2Zz5gLFxyXG4gIHN1Y2Nlc3M6IGA8c3ZnIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMjRcIj48cGF0aCBkPVwiTTEyIDIyQzYuNDc3IDIyIDIgMTcuNTIzIDIgMTJTNi40NzcgMiAxMiAyczEwIDQuNDc3IDEwIDEwLTQuNDc3IDEwLTEwIDEwem0tLjk5Ny02bDcuMDctNy4wNzEtMS40MTQtMS40MTQtNS42NTYgNS42NTctMi44MjktMi44MjktMS40MTQgMS40MTRMMTEuMDAzIDE2elwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIiAvPjwvc3ZnPmBcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIHNob3coXHJcbiAgY29udGVudCxcclxuICB7XHJcbiAgICBzdHlsZSA9IFwiZGVmYXVsdFwiLFxyXG4gICAgdGltZW91dCA9IDM1MDAsXHJcbiAgICBvbkNsaWNrID0gbnVsbCxcclxuICAgIGhpZGVJY29uID0gZmFsc2VcclxuICB9ID0ge31cclxuKSB7XHJcbiAgY29uc3QgY29udGFpbmVyID0gZ2V0Q29udGFpbmVyKCk7XHJcblxyXG4gIGNvbnN0IHRvYXN0RWxtID0gZG9tLnBhcnNlKGBcclxuICAgIDxkaXYgY2xhc3M9XCJhY29yZC0tdG9hc3Qgc3R5bGUtJHtzdHlsZX0gaGlkZGVuXCI+XHJcbiAgICAgICR7aGlkZUljb24gPyBcIlwiIDogKGljb25zW3N0eWxlXSB8fCBcIlwiKX1cclxuICAgICAgPGRpdiBjbGFzcz1cImNvbnRlbnRcIj48L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIGApO1xyXG5cclxuICB0b2FzdEVsbS5xdWVyeVNlbGVjdG9yKFwiLmNvbnRlbnRcIikuaW5uZXJIVE1MID0gY29udGVudDtcclxuXHJcbiAgbGV0IGNsb3NlZCA9IGZhbHNlO1xyXG4gIGZ1bmN0aW9uIGNsb3NlKCkge1xyXG4gICAgaWYgKGNsb3NlZCkgcmV0dXJuO1xyXG4gICAgY2xvc2VkID0gdHJ1ZTtcclxuXHJcbiAgICB0b2FzdEVsbS5jbGFzc0xpc3QuYWRkKFwiY2xvc2luZ1wiKTtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICB0b2FzdEVsbS5yZW1vdmUoKTtcclxuICAgIH0sIDI3NSk7XHJcbiAgfVxyXG5cclxuICBpZiAodHlwZW9mIG9uQ2xpY2sgPT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICB0b2FzdEVsbS5jbGFzc0xpc3QuYWRkKFwiY2xpY2thYmxlXCIpO1xyXG4gICAgdG9hc3RFbG0ub25jbGljayA9ICgpID0+IHtcclxuICAgICAgb25DbGljayhjbG9zZSk7XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKHRvYXN0RWxtKTtcclxuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xyXG4gICAgdG9hc3RFbG0uY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcclxuICB9KTtcclxuXHJcbiAgc2V0VGltZW91dChjbG9zZSwgdGltZW91dCk7XHJcblxyXG4gIHJldHVybiAoKSA9PiB7XHJcbiAgICBjbG9zZSgpO1xyXG4gIH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBzaG93OiBPYmplY3QuYXNzaWduKHNob3csIHtcclxuICAgIGluZm86IChodG1sLCBvYmogPSB7fSkgPT4gc2hvdyhodG1sLCB7IC4uLm9iaiwgc3R5bGU6IFwiaW5mb1wiIH0pLFxyXG4gICAgZXJyb3I6IChodG1sLCBvYmogPSB7fSkgPT4gc2hvdyhodG1sLCB7IC4uLm9iaiwgc3R5bGU6IFwiZXJyb3JcIiB9KSxcclxuICAgIHdhcm5pbmc6IChodG1sLCBvYmogPSB7fSkgPT4gc2hvdyhodG1sLCB7IC4uLm9iaiwgc3R5bGU6IFwid2FybmluZ1wiIH0pLFxyXG4gICAgc3VjY2VzczogKGh0bWwsIG9iaiA9IHt9KSA9PiBzaG93KGh0bWwsIHsgLi4ub2JqLCBzdHlsZTogXCJzdWNjZXNzXCIgfSlcclxuICB9KVxyXG59IiwgImltcG9ydCBwYXRjaGVyIGZyb20gXCIuLi9wYXRjaGVyL2luZGV4LmpzXCI7XHJcbmltcG9ydCBzdHlsZUNTU1RleHQgZnJvbSBcIi4vc3R5bGVzLnNjc3NcIjtcclxucGF0Y2hlci5pbmplY3RDU1Moc3R5bGVDU1NUZXh0KTtcclxuXHJcbmltcG9ydCB0b29sdGlwcyBmcm9tIFwiLi90b29sdGlwcy5qc1wiO1xyXG5pbXBvcnQgbm90aWZpY2F0aW9ucyBmcm9tIFwiLi9ub3RpZmljYXRpb25zLmpzXCI7XHJcbmltcG9ydCBjb250ZXh0TWVudXMgZnJvbSBcIi4vY29udGV4dE1lbnVzLmpzXCI7XHJcbmltcG9ydCBjb21wb25lbnRzIGZyb20gXCIuL2NvbXBvbmVudHMuanNcIjtcclxuaW1wb3J0IG1vZGFscyBmcm9tIFwiLi9tb2RhbHMuanN4XCI7XHJcbmltcG9ydCB0b2FzdHMgZnJvbSBcIi4vdG9hc3RzLmpzXCI7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIHRvb2x0aXBzLFxyXG4gIG5vdGlmaWNhdGlvbnMsXHJcbiAgY29udGV4dE1lbnVzLFxyXG4gIGNvbXBvbmVudHMsXHJcbiAgbW9kYWxzLFxyXG4gIHRvYXN0c1xyXG59IiwgImltcG9ydCBtb2R1bGVzIGZyb20gJy4vbW9kdWxlcyc7XHJcbmltcG9ydCBkZXYgZnJvbSAnLi9kZXYnO1xyXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi91dGlscyc7XHJcbmltcG9ydCBleHRlbnNpb25zIGZyb20gJy4vZXh0ZW5zaW9ucyc7XHJcbmltcG9ydCBpMThuIGZyb20gJy4vaTE4bic7XHJcbmltcG9ydCBzdG9yYWdlIGZyb20gJy4vc3RvcmFnZSc7XHJcbmltcG9ydCBldmVudHMgZnJvbSAnLi9ldmVudHMnO1xyXG5pbXBvcnQgcGF0Y2hlciBmcm9tICcuL3BhdGNoZXInO1xyXG5pbXBvcnQgaW50ZXJuYWwgZnJvbSAnLi9pbnRlcm5hbCc7XHJcbmltcG9ydCB3ZWJzb2NrZXQgZnJvbSAnLi93ZWJzb2NrZXQnO1xyXG5pbXBvcnQgdWkgZnJvbSAnLi91aS9pbmRleC5qcyc7XHJcblxyXG51dGlscy5sb2dnZXIuZGVidWcoYFBSRUxPQURfS0VZOiA8UFJFTE9BRF9LRVk+YCk7XHJcblxyXG5mdW5jdGlvbiBkZXZFcnJvcihhcGkpIHtcclxuICByZXR1cm4gbmV3IEVycm9yKGBUaGUgJHthcGl9IEFQSSBjYW4gb25seSBiZSBhY2Nlc3NlZCB3aGVuIERldiBtb2RlIGlzIGVuYWJsZWQhYCk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBleHBvc2VkQVBJOiB7XHJcbiAgICBkZXYsXHJcbiAgICB1dGlscyxcclxuICAgIGkxOG4sXHJcbiAgICBldmVudHMsXHJcbiAgICB1aSxcclxuICAgIGdldCBwYXRjaGVyKCkge1xyXG4gICAgICBpZiAoIWRldi5lbmFibGVkKSB0aHJvdyBkZXZFcnJvcihcIlBhdGNoZXJcIik7XHJcbiAgICAgIHJldHVybiBwYXRjaGVyO1xyXG4gICAgfSxcclxuICAgIGdldCBzdG9yYWdlKCkge1xyXG4gICAgICBpZiAoIWRldi5lbmFibGVkKSB0aHJvdyBkZXZFcnJvcihcIlN0b3JhZ2VcIik7XHJcbiAgICAgIHJldHVybiBzdG9yYWdlO1xyXG4gICAgfSxcclxuICAgIGdldCBtb2R1bGVzKCkge1xyXG4gICAgICBpZiAoIWRldi5lbmFibGVkKSB0aHJvdyBkZXZFcnJvcihcIk1vZHVsZXNcIik7XHJcbiAgICAgIHJldHVybiBtb2R1bGVzO1xyXG4gICAgfSxcclxuICAgIGdldCBleHRlbnNpb25zKCkge1xyXG4gICAgICBpZiAoIWRldi5lbmFibGVkKSB0aHJvdyBkZXZFcnJvcihcIkV4dGVuc2lvbnNcIik7XHJcbiAgICAgIHJldHVybiBleHRlbnNpb25zO1xyXG4gICAgfSxcclxuICAgIGdldCBpbnRlcm5hbCgpIHtcclxuICAgICAgaWYgKCFkZXYuZW5hYmxlZCkgdGhyb3cgZGV2RXJyb3IoXCJJbnRlcm5hbFwiKTtcclxuICAgICAgcmV0dXJuIGludGVybmFsO1xyXG4gICAgfSxcclxuICAgIGdldCB3ZWJzb2NrZXQoKSB7XHJcbiAgICAgIGlmICghZGV2LmVuYWJsZWQpIHRocm93IGRldkVycm9yKFwiV2Vic29ja2V0XCIpO1xyXG4gICAgICByZXR1cm4gd2Vic29ja2V0O1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgdW5leHBvc2VkQVBJOiB7XHJcbiAgICBkZXYsXHJcbiAgICBtb2R1bGVzLFxyXG4gICAgdXRpbHMsXHJcbiAgICBleHRlbnNpb25zLFxyXG4gICAgaTE4bixcclxuICAgIHN0b3JhZ2UsXHJcbiAgICBldmVudHMsXHJcbiAgICBwYXRjaGVyLFxyXG4gICAgaW50ZXJuYWwsXHJcbiAgICB3ZWJzb2NrZXQsXHJcbiAgICB1aVxyXG4gIH1cclxufSIsICJpbXBvcnQgbW9kdWxlcyBmcm9tIFwiLi4vYXBpL21vZHVsZXMvaW5kZXguanNcIjtcclxuaW1wb3J0IG1vZGFscyBmcm9tIFwiLi4vYXBpL3VpL21vZGFscy5qc3hcIjtcclxuaW1wb3J0IG5vdGlmaWNhdGlvbnMgZnJvbSBcIi4uL2FwaS91aS9ub3RpZmljYXRpb25zLmpzXCI7XHJcbmltcG9ydCBleHRlbnNpb25zIGZyb20gXCIuLi9hcGkvZXh0ZW5zaW9ucy9pbmRleC5qc1wiO1xyXG5pbXBvcnQgd2Vic29ja2V0IGZyb20gXCIuLi9hcGkvd2Vic29ja2V0L2luZGV4LmpzXCI7XHJcblxyXG53ZWJzb2NrZXQuc2V0KFwiSW5zdGFsbEV4dGVuc2lvblwiLCBhc3luYyAoeyB1cmwgfSA9IHt9KSA9PiB7XHJcbiAgaWYgKCF1cmwpIHJldHVybjtcclxuXHJcbiAgYXdhaXQgbW9kdWxlcy5uYXRpdmUud2luZG93LnNldEFsd2F5c09uVG9wKDAsIHRydWUpO1xyXG4gIGF3YWl0IG5ldyBQcm9taXNlKHIgPT4gc2V0VGltZW91dChyLCAyNTApKTtcclxuICBhd2FpdCBtb2R1bGVzLm5hdGl2ZS53aW5kb3cuc2V0QWx3YXlzT25Ub3AoMCwgdHJ1ZSk7XHJcblxyXG4gIGNvbnN0IHN1Y2Nlc3MgPSBhd2FpdCBtb2RhbHMuc2hvdy5jb25maXJtYXRpb24oXHJcbiAgICBhY29yZC5pMThuLmZvcm1hdChcIklNUE9SVF9FWFRFTlNJT05cIiksXHJcbiAgICBhY29yZC5pMThuLmZvcm1hdChcIklNUE9SVF9FWFRFTlNJT05fREVTQ1JJUFRJT05cIiwgdXJsKVxyXG4gICk7XHJcblxyXG4gIGlmICghc3VjY2VzcykgcmV0dXJuO1xyXG5cclxuICB0cnkge1xyXG4gICAgYXdhaXQgZXh0ZW5zaW9ucy5sb2FkKHVybCk7XHJcbiAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICBub3RpZmljYXRpb25zLnNob3cuZXJyb3IoYCR7ZXJyfWAsIHsgdGltZW91dDogMzAwMDAgfSk7XHJcbiAgfVxyXG59KTsiLCAiaW1wb3J0IHsgd2FpdFVudGlsQ29ubmVjdGlvbk9wZW4gfSBmcm9tIFwiLi9vdGhlci91dGlscy5qc1wiO1xyXG5pbXBvcnQgbG9hZGluZ0FuaW1hdGlvbiBmcm9tIFwiLi9vdGhlci9sb2FkaW5nLWFuaW1hdGlvblwiO1xyXG5pbXBvcnQgYXBpIGZyb20gXCIuL2FwaVwiO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdywgXCJhY29yZFwiLCB7XHJcbiAgZ2V0KCkge1xyXG4gICAgcmV0dXJuIGFwaS5leHBvc2VkQVBJO1xyXG4gIH1cclxufSk7XHJcbndpbmRvdy5nbG9iYWwgPSB3aW5kb3c7XHJcblxyXG4oYXN5bmMgKCkgPT4ge1xyXG4gIGxvYWRpbmdBbmltYXRpb24uc2hvdygpO1xyXG4gIGF3YWl0IHdhaXRVbnRpbENvbm5lY3Rpb25PcGVuKCk7XHJcbiAgbG9hZGluZ0FuaW1hdGlvbi5oaWRlKCk7XHJcbn0pKCk7XHJcblxyXG4vLyBleHRyYXNcclxuaW1wb3J0IFwiLi9vdGhlci93ZWJzb2NrZXQtdHJpZ2dlcnMuanNcIjsiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUNBLFdBQU8sZUFBZSxTQUFTLGNBQWMsRUFBRSxPQUFPLEtBQUssQ0FBQztBQUM1RCxZQUFRLFVBQVUsT0FBTyxPQUFPO0FBQUEsTUFDNUIsS0FBSztBQUFBLE1BQ0wsS0FBSztBQUFBLE1BQ0wsUUFBUTtBQUFBLE1BQ1IsUUFBUTtBQUFBLElBQ1osQ0FBQztBQUFBO0FBQUE7OztBQ1BEO0FBQUE7QUFBQTtBQUNBLFFBQUksa0JBQW1CLFdBQVEsUUFBSyxtQkFBb0IsU0FBVSxLQUFLO0FBQ25FLGFBQVEsT0FBTyxJQUFJLGFBQWMsTUFBTSxFQUFFLFdBQVcsSUFBSTtBQUFBLElBQzVEO0FBQ0EsV0FBTyxlQUFlLFNBQVMsY0FBYyxFQUFFLE9BQU8sS0FBSyxDQUFDO0FBQzVELFFBQU0sV0FBVyxnQkFBZ0IsZ0JBQW1CO0FBQ3BELFFBQU0sZUFBTixNQUFtQjtBQUFBLE1B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Q0EsTUFBUTtBQUFBLFFBQ04sSUFBTTtBQUFBLFFBQ04sUUFBVTtBQUFBLFFBQ1YsTUFBUTtBQUFBLFVBQ04sUUFBVTtBQUFBLFlBQ1I7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLFVBQVk7QUFBQSxRQUNWLElBQU07QUFBQSxRQUNOLFFBQVU7QUFBQSxRQUNWLE1BQVE7QUFBQSxVQUNOLE9BQVM7QUFBQSxZQUNQO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsZ0JBQWtCO0FBQUEsTUFDaEIsSUFBTTtBQUFBLE1BQ04sTUFBUTtBQUFBLFFBQ04sT0FBUztBQUFBLFVBQ1A7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLE1BQ0EsUUFBVTtBQUFBLFFBQ1IsUUFBVTtBQUFBLFFBQ1YsSUFBTTtBQUFBLFFBQ04sSUFBTTtBQUFBLFVBQ0o7QUFBQSxZQUNFO0FBQUEsWUFDQTtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLE9BQVM7QUFBQSxNQUNQLElBQU07QUFBQSxNQUNOLE1BQVE7QUFBQSxRQUNOLE9BQVM7QUFBQSxVQUNQO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLFFBQVU7QUFBQSxRQUNSLFFBQVU7QUFBQSxRQUNWLElBQU07QUFBQSxRQUNOLElBQU07QUFBQSxVQUNKO0FBQUEsWUFDRTtBQUFBLFlBQ0E7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxNQUFRO0FBQUEsTUFDTixJQUFNO0FBQUEsTUFDTixNQUFRO0FBQUEsUUFDTixPQUFTO0FBQUEsVUFDUDtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFB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QUEsUUFDUixRQUFVO0FBQUEsUUFDVixJQUFNO0FBQUEsUUFDTixJQUFNO0FBQUEsVUFDSjtBQUFBLFlBQ0U7QUFBQSxZQUNBO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsTUFDQSxNQUFRO0FBQUEsUUFDTixPQUFTO0FBQUEsVUFDUDtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsMkJBQTZCO0FBQUEsTUFDM0IsSUFBTTtBQUFBLE1BQ04sUUFBVTtBQUFBLFFBQ1IsUUFBVTtBQUFBLFFBQ1YsSUFBTTtBQUFBLFFBQ04sSUFBTTtBQUFBLFVBQ0o7QUFBQSxZQUNFO0FBQUEsWUFDQTtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLE1BQ0EsTUFBUTtBQUFBLFFBQ04sT0FBUztBQUFBLFVBQ1A7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLGVBQWlCO0FBQUEsTUFDZixJQUFNO0FBQUEsTUFDTixRQUFVO0FBQUEsUUFDUixRQUFVO0FBQUEsUUFDVixJQUFNO0FBQUEsUUFDTixJQUFNO0FBQUEsVUFDSjtBQUFBLFlBQ0U7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLE1BQ0EsTUFBUTtBQUFBLFFBQ04sT0FBUztBQUFBLFVBQ1A7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLGNBQWdCO0FBQUEsTUFDZCxJQUFNO0FBQUEsTUFDTixRQUFVO0FBQUEsUUFDUixRQUFVO0FBQUEsUUFDVixJQUFNO0FBQUEsUUFDTixJQUFNO0FBQUEsVUFDSjtBQUFBLFlBQ0U7QUFBQSxZQUNBO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsTUFDQSxNQUFRO0FBQUEsUUFDTixPQUFTO0FB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LFFBQVEsU0FBUztBQUFBLEVBQ3JDLE1BQU07QUFDSixXQUFPLFlBQUk7QUFBQSxFQUNiO0FBQ0YsQ0FBQztBQUNELE9BQU8sU0FBUztBQUFBLENBRWYsWUFBWTtBQUNYLDRCQUFpQixLQUFLO0FBQ3RCLFFBQU0sd0JBQXdCO0FBQzlCLDRCQUFpQixLQUFLO0FBQ3hCLEdBQUc7IiwKICAibmFtZXMiOiBbImV2ZW50IiwgIm1ha2UiLCAidGFyZ2V0IiwgInRyZWUiLCAic2VhcmNoRmlsdGVyIiwgIndhbGthYmxlIiwgImlnbm9yZSIsICJmb3VuZCIsICJjb21wb25lbnRzIiwgIl8iLCAiY2hlY2siLCAibW9kdWxlcyIsICJtb2R1bGUiLCAicmVxdWlyZSIsICJmb3VuZCIsICJmaW5kZXIiLCAiZm91bmQiLCAicmVxIiwgImZpbmRlciIsICJjb21tb25fZGVmYXVsdCIsICJjb21tb25fZGVmYXVsdCIsICJfIiwgIl8iLCAibm9TdG9yZSIsICJfIiwgInZhbCIsICJlcnJvciIsICJvdXQiLCAiY2hlY2siLCAiXyIsICJCQVNFX1VSTCIsICJuZXN0cyIsICJvdXQiLCAiXyIsICJzb3VyY2UiLCAiYXBpIiwgImNvbW1vbl9kZWZhdWx0IiwgInNldCIsICJzaG93IiwgImNvbW1vbl9kZWZhdWx0IiwgIm91dCIsICJfIiwgIlJlYWN0IiwgImNvbW1vbl9kZWZhdWx0IiwgImNvbW1vbl9kZWZhdWx0IiwgIlJlYWN0IiwgImNvbW1vbl9kZWZhdWx0IiwgImludGVyYWN0ZWQiLCAiZ2V0Q29udGFpbmVyIiwgInNob3ciLCAiYXBpIl0KfQo=
