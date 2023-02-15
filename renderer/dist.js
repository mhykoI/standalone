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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibm9kZV9tb2R1bGVzL25lc3RzL2Nqcy9FdmVudHMuanMiLCAibm9kZV9tb2R1bGVzL25lc3RzL2Nqcy9FdmVudEVtaXR0ZXIuanMiLCAibm9kZV9tb2R1bGVzL25lc3RzL2Nqcy9tYWtlLmpzIiwgIm5vZGVfbW9kdWxlcy9uZXN0cy9janMvaW5kZXguanMiLCAic3JjL2RhdGEvY29tbW9uLmpzb24iLCAic3JjL2FwaS91dGlscy9yYXcvZmluZC1pbi10cmVlLmpzIiwgInNyYy9hcGkvdXRpbHMvbG9nZ2VyLmpzIiwgInNyYy9hcGkvdXRpbHMvcmVhY3QuanMiLCAic3JjL2FwaS91dGlscy9pbmRleC5qcyIsICJzcmMvYXBpL21vZHVsZXMvcmF3L2NvbXBsZXgtZmluZGVyLmpzIiwgInNyYy9hcGkvbW9kdWxlcy93ZWJwYWNrLmpzIiwgInNyYy9hcGkvbW9kdWxlcy9jb21tb24uanMiLCAic3JjL2FwaS9tb2R1bGVzL2luZGV4LmpzIiwgInNyYy9vdGhlci91dGlscy5qcyIsICJzcmMvbGliL0Jhc2ljRXZlbnRFbWl0dGVyLmpzIiwgInNyYy9hcGkvZXZlbnRzL2luZGV4LmpzIiwgInNyYy9hcGkvZG9tL2luZGV4LmpzIiwgInNyYy9saWIvc3BpdHJvYXN0L2Rpc3QvZXNtL3NoYXJlZC5qcyIsICJzcmMvbGliL3NwaXRyb2FzdC9kaXN0L2VzbS9ob29rLmpzIiwgInNyYy9saWIvc3BpdHJvYXN0L2Rpc3QvZXNtL3VuLXBhdGNoLmpzIiwgInNyYy9saWIvc3BpdHJvYXN0L2Rpc3QvZXNtL2dldC1wYXRjaC1mdW5jLmpzIiwgInNyYy9saWIvc3BpdHJvYXN0L2Rpc3QvZXNtL2luZGV4LmpzIiwgInNyYy9hcGkvcGF0Y2hlci9pbmRleC5qcyIsICJzcmMvb3RoZXIvbG9hZGluZy1hbmltYXRpb24vc3R5bGUuc2NzcyIsICJzcmMvb3RoZXIvbG9hZGluZy1hbmltYXRpb24vaW5kZXguanMiLCAic3JjL2FwaS9kZXYvaW5kZXguanMiLCAic3JjL2FwaS9pMThuL2luZGV4LmpzIiwgInNyYy9hcGkvc3RvcmFnZS9pbmRleC5qcyIsICJub2RlX21vZHVsZXMvaWRiLWtleXZhbC9kaXN0L2luZGV4LmpzIiwgInNyYy9saWIvanNvbi1kZWN5Y2xlZC9pbmRleC5qcyIsICJzcmMvYXBpL2V4dGVuc2lvbnMvaTE4bi5qcyIsICJzcmMvYXBpL2V4dGVuc2lvbnMvaW5kZXguanMiLCAic3JjL2FwaS9pbnRlcm5hbC9pbmRleC5qcyIsICJzcmMvYXBpL3dlYnNvY2tldC9pbmRleC5qcyIsICJzcmMvYXBpL3VpL3N0eWxlcy5zY3NzIiwgInNyYy9hcGkvdWkvdG9vbHRpcHMuanMiLCAic3JjL2FwaS91aS9ub3RpZmljYXRpb25zLmpzIiwgInNyYy9hcGkvdWkvY29udGV4dE1lbnVzLmpzIiwgInNyYy9saWIvY29tcG9uZW50cy9FcnJvckJvdW5kYXJ5LmpzeCIsICJzcmMvYXBpL3VpL2NvbXBvbmVudHMuanMiLCAic3JjL2FwaS91aS9tb2RhbHMuanN4IiwgInNyYy9hcGkvdWkvaW5kZXguanMiLCAic3JjL2FwaS9pbmRleC5qcyIsICJzcmMvb3RoZXIvd2Vic29ja2V0LXRyaWdnZXJzLmpzIiwgInNyYy9pbmRleC5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5kZWZhdWx0ID0gT2JqZWN0LmZyZWV6ZSh7XHJcbiAgICBHRVQ6IFwiR0VUXCIsXHJcbiAgICBTRVQ6IFwiU0VUXCIsXHJcbiAgICBERUxFVEU6IFwiREVMRVRFXCIsXHJcbiAgICBVUERBVEU6IFwiVVBEQVRFXCIsXHJcbn0pO1xyXG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgRXZlbnRzXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vRXZlbnRzXCIpKTtcclxuY2xhc3MgRXZlbnRFbWl0dGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMubGlzdGVuZXJzID0gT2JqZWN0LnZhbHVlcyhFdmVudHNfMS5kZWZhdWx0KS5yZWR1Y2UoKGFjYywgdmFsKSA9PiAoKGFjY1t2YWxdID0gbmV3IFNldCgpKSwgYWNjKSwge30pO1xyXG4gICAgICAgIHRoaXMub24gPSBmdW5jdGlvbiAoZXZlbnQsIGxpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxpc3RlbmVyc1tldmVudF0uaGFzKGxpc3RlbmVyKSkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoYFRoaXMgbGlzdGVuZXIgb24gJHtldmVudH0gYWxyZWFkeSBleGlzdHMuYCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5saXN0ZW5lcnNbZXZlbnRdLmFkZChsaXN0ZW5lcik7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLm9uY2UgPSBmdW5jdGlvbiAoZXZlbnQsIGxpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG9uY2VMaXN0ZW5lciA9IChldmVudCwgZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vZmYoZXZlbnQsIG9uY2VMaXN0ZW5lcik7XHJcbiAgICAgICAgICAgICAgICBsaXN0ZW5lcihldmVudCwgZGF0YSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMub24oZXZlbnQsIG9uY2VMaXN0ZW5lcik7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLm9mZiA9IGZ1bmN0aW9uIChldmVudCwgbGlzdGVuZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5saXN0ZW5lcnNbZXZlbnRdLmRlbGV0ZShsaXN0ZW5lcik7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmVtaXQgPSBmdW5jdGlvbiAoZXZlbnQsIGRhdGEpIHtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBsaXN0ZW5lciBvZiB0aGlzLmxpc3RlbmVyc1tldmVudF0pIHtcclxuICAgICAgICAgICAgICAgIGxpc3RlbmVyKGV2ZW50LCBkYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgZm9yIChjb25zdCBldmVudCBvZiBPYmplY3QudmFsdWVzKEV2ZW50c18xLmRlZmF1bHQpKSB7XHJcbiAgICAgICAgICAgIHRoaXNbZXZlbnQudG9Mb3dlckNhc2UoKV0gPSAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KGV2ZW50LCBkYXRhKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5kZWZhdWx0ID0gRXZlbnRFbWl0dGVyO1xyXG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgRXZlbnRFbWl0dGVyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vRXZlbnRFbWl0dGVyXCIpKTtcclxuZnVuY3Rpb24gbWFrZShcclxuLy8gVGhpcyBjYW4gYmUgc2FmZWx5IGlnbm9yZWQsIHRoZSBEYXRhIHdpbGwgYWx3YXlzIGJlIGFuIG9iamVjdCBvciBpdCB3b24ndCB3b3JrIGFueXdheS5cclxuLy8gQHRzLWlnbm9yZVxyXG5kYXRhID0ge30sIHsgbmVzdEFycmF5cyA9IHRydWUsIH0gPSB7fSkge1xyXG4gICAgY29uc3QgZW1pdHRlciA9IG5ldyBFdmVudEVtaXR0ZXJfMS5kZWZhdWx0KCk7XHJcbiAgICBmdW5jdGlvbiBjcmVhdGVQcm94eSh0YXJnZXQsIHJvb3QsIHBhdGgpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb3h5KHRhcmdldCwge1xyXG4gICAgICAgICAgICBnZXQodGFyZ2V0LCBwcm9wZXJ0eSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbmV3UGF0aCA9IFsuLi5wYXRoLCBwcm9wZXJ0eV07XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHRhcmdldFtwcm9wZXJ0eV07XHJcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVtaXR0ZXIuZ2V0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogbmV3UGF0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUsXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFuZXN0QXJyYXlzICYmIEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY3JlYXRlUHJveHkodmFsdWUsIHJvb3QsIG5ld1BhdGgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY3JlYXRlUHJveHkoKHRhcmdldFtwcm9wZXJ0eV0gPSB7fSksIHJvb3QsIG5ld1BhdGgpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQodGFyZ2V0LCBwcm9wZXJ0eSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHRhcmdldFtwcm9wZXJ0eV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIGVtaXR0ZXIuc2V0KHtcclxuICAgICAgICAgICAgICAgICAgICBwYXRoOiBbLi4ucGF0aCwgcHJvcGVydHldLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvLyBUaGlzIG5lZWRzIHRvIHJldHVybiB0cnVlIG9yIGl0IGVycm9ycy4gL3NocnVnXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGVsZXRlUHJvcGVydHkodGFyZ2V0LCBwcm9wZXJ0eSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRlbGV0ZSB0YXJnZXRbcHJvcGVydHldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZW1pdHRlci5kZWxldGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRoOiBbLi4ucGF0aCwgcHJvcGVydHldLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBoYXModGFyZ2V0LCBwcm9wZXJ0eSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0YXJnZXRbcHJvcGVydHldID09PSBcIm9iamVjdFwiICYmXHJcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmtleXModGFyZ2V0W3Byb3BlcnR5XSkubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb3BlcnR5IGluIHRhcmdldDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHsgc3RvcmU6IGNyZWF0ZVByb3h5KGRhdGEsIGRhdGEsIFtdKSwgXHJcbiAgICAgICAgLy8gVGhpcyBjYW4gYmUgc2FmZWx5IGlnbm9yZWQsIHRoZSBEYXRhIHdpbGwgYWx3YXlzIGJlIGFuIG9iamVjdCBvciBpdCB3b24ndCB3b3JrIGFueXdheS5cclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgZ2hvc3Q6IGRhdGEgfSwgZW1pdHRlcik7XHJcbn1cclxuZXhwb3J0cy5kZWZhdWx0ID0gbWFrZTtcclxuIiwgIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMubWFrZSA9IGV4cG9ydHMuRXZlbnRzID0gdm9pZCAwO1xyXG52YXIgRXZlbnRzXzEgPSByZXF1aXJlKFwiLi9FdmVudHNcIik7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkV2ZW50c1wiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gX19pbXBvcnREZWZhdWx0KEV2ZW50c18xKS5kZWZhdWx0OyB9IH0pO1xyXG52YXIgbWFrZV8xID0gcmVxdWlyZShcIi4vbWFrZVwiKTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwibWFrZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gX19pbXBvcnREZWZhdWx0KG1ha2VfMSkuZGVmYXVsdDsgfSB9KTtcclxuIiwgIntcclxuICBcImNvbW1vblwiOiB7XHJcbiAgICBcIm1vZGFsc1wiOiB7XHJcbiAgICAgIFwiY29tcG9uZW50c1wiOiB7XHJcbiAgICAgICAgXCJvdGhlclwiOiB7XHJcbiAgICAgICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICBcIkhlYWRlclwiLFxyXG4gICAgICAgICAgICAgICAgXCJGb290ZXJcIlxyXG4gICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIlJvb3RcIjoge1xyXG4gICAgICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICAgICAgXCJpblwiOiBcInN0cmluZ3NcIixcclxuICAgICAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgXCJFTlRFUklOR1wiXHJcbiAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIFwiYWN0aW9uc1wiOiB7XHJcbiAgICAgICAgXCJvcGVuXCI6IHtcclxuICAgICAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgICAgIFwiaW5cIjogXCJzdHJpbmdzXCIsXHJcbiAgICAgICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgIFwib25DbG9zZUNhbGxiYWNrXCIsXHJcbiAgICAgICAgICAgICAgICBcIkxheWVyXCJcclxuICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgICAgICBcImJlZm9yZVwiOiBbXHJcbiAgICAgICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgICAgIFwib3BlblwiXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBcIm1hcFwiOiB7XHJcbiAgICAgICAgICAgIFwib3BlblwiOiBbXHJcbiAgICAgICAgICAgICAgXCJvbkNsb3NlQ2FsbGJhY2tcIixcclxuICAgICAgICAgICAgICBcIkxheWVyXCJcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJjbG9zZVwiOiB7XHJcbiAgICAgICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgICAgICBcImluXCI6IFwic3RyaW5nc1wiLFxyXG4gICAgICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICBcIm9uQ2xvc2VDYWxsYmFjaygpXCJcclxuICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgICAgICBcImJlZm9yZVwiOiBbXHJcbiAgICAgICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgICAgIFwiY2xvc2VcIlxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgXCJtYXBcIjoge1xyXG4gICAgICAgICAgICBcImNsb3NlXCI6IFtcclxuICAgICAgICAgICAgICBcIm9uQ2xvc2VDYWxsYmFjaygpXCJcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiY29tcG9uZW50c1wiOiB7XHJcbiAgICAgIFwiQnV0dG9uXCI6IHtcclxuICAgICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICBcIkJvcmRlckNvbG9yc1wiXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgICBcImJlZm9yZVwiOiBbXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgICAgXSxcclxuICAgICAgICAgIFwiYWZ0ZXJcIjogXCJCdXR0b25cIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJtYXBcIjoge1xyXG4gICAgICAgICAgXCJCdXR0b25cIjogW1xyXG4gICAgICAgICAgICBcIi5GSUxMRURcIixcclxuICAgICAgICAgICAgXCIub25Nb3VzZUxlYXZlXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIFwiQ29uZmlybWF0aW9uTW9kYWxcIjoge1xyXG4gICAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICAgIFwiaW5cIjogXCJzdHJpbmdzXCIsXHJcbiAgICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgIFwiLmNvbmZpcm1CdXR0b25Db2xvclwiXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgICBcImJlZm9yZVwiOiBbXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgXCJUZXh0XCI6IHtcclxuICAgICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgICAgXCJmaWx0ZXJcIjogXCIkPy5TaXplcz8uU0laRV8zMiAmJiAkLkNvbG9yc1wiLFxyXG4gICAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgICBcImJlZm9yZVwiOiBbXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgXCJNYXJrZG93blwiOiB7XHJcbiAgICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICAgIFwiZmlsdGVyXCI6IFwiJD8ucHJvdG90eXBlPy5yZW5kZXIgJiYgJC5ydWxlc1wiLFxyXG4gICAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJGbHV4RGlzcGF0Y2hlclwiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwiX2N1cnJlbnREaXNwYXRjaEFjdGlvblR5cGVcIixcclxuICAgICAgICAgICAgXCJkaXNwYXRjaFwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJSZWFjdFwiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwiY3JlYXRlRWxlbWVudFwiLFxyXG4gICAgICAgICAgICBcInVzZVN0YXRlXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIlJlc3RcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcImdldFwiLFxyXG4gICAgICAgICAgICBcInBvc3RcIixcclxuICAgICAgICAgICAgXCJnZXRBUElCYXNlVVJMXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIkZsdXhcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcImNvbm5lY3RTdG9yZXNcIixcclxuICAgICAgICAgICAgXCJkZXN0cm95XCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIldlYlNvY2tldFwiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjogXCIkPy5fX3Byb3RvX18/LmhhbmRsZUNvbm5lY3Rpb25cIixcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImJlZm9yZVwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIkFjdGl2aXR5QWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwic2VuZEFjdGl2aXR5SW52aXRlXCIsXHJcbiAgICAgICAgICAgIFwidXBkYXRlQWN0aXZpdHlcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiUHJpdmF0ZUNoYW5uZWxBY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJvcGVuUHJpdmF0ZUNoYW5uZWxcIixcclxuICAgICAgICAgICAgXCJlbnN1cmVQcml2YXRlQ2hhbm5lbFwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJBY2tBY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJpblwiOiBcInN0cmluZ3NcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJ0eXBlOlxcXCJCVUxLX0FDS1xcXCJcIlxyXG4gICAgICAgICAgXSxcclxuICAgICAgICAgIFtdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IHRydWUsXHJcbiAgICAgICAgXCJiZWZvcmVcIjogXCJleHBvcnRzXCJcclxuICAgICAgfSxcclxuICAgICAgXCJtYXBcIjoge1xyXG4gICAgICAgIFwiYWNrXCI6IFtcclxuICAgICAgICAgIFwidHlwZTpcXFwiQ0hBTk5FTF9BQ0tcXFwiXCIsXHJcbiAgICAgICAgICBcIm1lc3NhZ2VJZFwiLFxyXG4gICAgICAgICAgXCJjaGFubmVsSWRcIlxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgXCJidWxrQWNrXCI6IFtcclxuICAgICAgICAgIFwidHlwZTpcXFwiQlVMS19BQ0tcXFwiXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIkFuYWx5dGljc0FjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcImlzVGhyb3R0bGVkXCIsXHJcbiAgICAgICAgICAgIFwidHJhY2tcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiQW5pbWF0aW9uQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcInNwcmluZ1wiLFxyXG4gICAgICAgICAgICBcImRlY2F5XCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIkNvbm5lY3Rpb25BY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJzZXRTaG93QWN0aXZpdHlcIixcclxuICAgICAgICAgICAgXCJzZXRWaXNpYmlsaXR5XCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIlJUQ0Nvbm5lY3Rpb25BY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJnZXRDaGFubmVsSWRcIixcclxuICAgICAgICAgICAgXCJnZXRHdWlsZElkXCIsXHJcbiAgICAgICAgICAgIFwiZ2V0UlRDQ29ubmVjdGlvbklkXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIkVtb2ppQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwidHJhbnNsYXRlSW5saW5lRW1vamlUb1N1cnJvZ2F0ZXNcIixcclxuICAgICAgICAgICAgXCJ0cmFuc2xhdGVTdXJyb2dhdGVzVG9JbmxpbmVFbW9qaVwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJFbW9qaVN0YXRlQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwiZ2V0VVJMXCIsXHJcbiAgICAgICAgICAgIFwiaXNFbW9qaURpc2FibGVkXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIkd1aWxkTm90aWZpY2F0aW9uc0FjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcInVwZGF0ZUNoYW5uZWxPdmVycmlkZVNldHRpbmdzXCIsXHJcbiAgICAgICAgICAgIFwidXBkYXRlR3VpbGROb3RpZmljYXRpb25TZXR0aW5nc1wiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJJbnRlcm5hbFJlYWN0XCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJqc3hcIixcclxuICAgICAgICAgICAgXCJqc3hzXCIsXHJcbiAgICAgICAgICAgIFwiRnJhZ21lbnRcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiTG9naW5BY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJsb2dpblwiLFxyXG4gICAgICAgICAgICBcImxvZ291dFwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJRdWVyeUFjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcInF1ZXJ5RW1vamlSZXN1bHRzXCIsXHJcbiAgICAgICAgICAgIFwicXVlcnlGcmllbmRzXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIk1lc3NhZ2VBY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJyZWNlaXZlTWVzc2FnZVwiLFxyXG4gICAgICAgICAgICBcInNlbmRNZXNzYWdlXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIlByZW1pdW1BY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJpc1ByZW1pdW1cIixcclxuICAgICAgICAgICAgXCJjYW5Vc2VFbW9qaXNFdmVyeXdoZXJlXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIlZvaWNlQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwic2VsZWN0Vm9pY2VDaGFubmVsXCIsXHJcbiAgICAgICAgICAgIFwiZGlzY29ubmVjdFwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJUeXBpbmdBY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJzdGFydFR5cGluZ1wiLFxyXG4gICAgICAgICAgICBcInN0b3BUeXBpbmdcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiR3VpbGRBY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJzZXRDaGFubmVsXCIsXHJcbiAgICAgICAgICAgIFwic2V0U2VydmVyTXV0ZVwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJJbnZpdGVBY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJhY2NlcHRJbnZpdGVcIixcclxuICAgICAgICAgICAgXCJhY2NlcHRJbnZpdGVBbmRUcmFuc2l0aW9uVG9JbnZpdGVDaGFubmVsXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIk1lZGlhRW5naW5lQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwidG9nZ2xlU2VsZkRlYWZcIixcclxuICAgICAgICAgICAgXCJ0b2dnbGVTZWxmTXV0ZVwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJpMThuXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJfcmVxdWVzdGVkTG9jYWxlXCIsXHJcbiAgICAgICAgICAgIFwiZ2V0RGVmYXVsdExvY2FsZVwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJ1dWlkXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJ2MVwiLFxyXG4gICAgICAgICAgICBcInY0XCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcImhsanNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcImhpZ2hsaWdodEFsbFwiLFxyXG4gICAgICAgICAgICBcImhpZ2hsaWdodFwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59IiwgImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGZpbmRJblRyZWUoXHJcbiAgdHJlZSxcclxuICBzZWFyY2hGaWx0ZXIsXHJcbiAgeyB3YWxrYWJsZSA9IG51bGwsIGlnbm9yZSA9IFtdLCBsaW1pdCA9IDEwMCB9ID0ge31cclxuKSB7XHJcbiAgbGV0IGl0ZXJhdGlvbiA9IDA7XHJcblxyXG4gIGZ1bmN0aW9uIGRvU2VhcmNoKHRyZWUsIHNlYXJjaEZpbHRlciwgeyB3YWxrYWJsZSA9IG51bGwsIGlnbm9yZSA9IFtdIH0gPSB7fSkge1xyXG4gICAgaXRlcmF0aW9uICs9IDE7XHJcbiAgICBpZiAoaXRlcmF0aW9uID4gbGltaXQpIHJldHVybjtcclxuXHJcbiAgICBpZiAodHlwZW9mIHNlYXJjaEZpbHRlciA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICBpZiAodHJlZS5oYXNPd25Qcm9wZXJ0eShzZWFyY2hGaWx0ZXIpKSByZXR1cm4gdHJlZVtzZWFyY2hGaWx0ZXJdO1xyXG4gICAgfSBlbHNlIGlmIChzZWFyY2hGaWx0ZXIodHJlZSkpIHJldHVybiB0cmVlO1xyXG5cclxuICAgIGlmICghdHJlZSkgcmV0dXJuO1xyXG5cclxuICAgIGlmIChBcnJheS5pc0FycmF5KHRyZWUpKSB7XHJcbiAgICAgIGZvciAoY29uc3QgaXRlbSBvZiB0cmVlKSB7XHJcbiAgICAgICAgY29uc3QgZm91bmQgPSBkb1NlYXJjaChpdGVtLCBzZWFyY2hGaWx0ZXIsIHsgd2Fsa2FibGUsIGlnbm9yZSB9KTtcclxuICAgICAgICBpZiAoZm91bmQpIHJldHVybiBmb3VuZDtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdHJlZSA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyh0cmVlKSkge1xyXG4gICAgICAgIGlmICh3YWxrYWJsZSAhPSBudWxsICYmICF3YWxrYWJsZS5pbmNsdWRlcyhrZXkpKSBjb250aW51ZTtcclxuXHJcbiAgICAgICAgaWYgKGlnbm9yZS5pbmNsdWRlcyhrZXkpKSBjb250aW51ZTtcclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIGNvbnN0IGZvdW5kID0gZG9TZWFyY2godHJlZVtrZXldLCBzZWFyY2hGaWx0ZXIsIHtcclxuICAgICAgICAgICAgd2Fsa2FibGUsXHJcbiAgICAgICAgICAgIGlnbm9yZSxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgaWYgKGZvdW5kKSByZXR1cm4gZm91bmQ7XHJcbiAgICAgICAgfSBjYXRjaCB7IH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGRvU2VhcmNoKHRyZWUsIHNlYXJjaEZpbHRlciwgeyB3YWxrYWJsZSwgaWdub3JlIH0pO1xyXG59O1xyXG4iLCAiZnVuY3Rpb24gYnVpbGQocHJlZml4ID0gXCJBY29yZFwiLCB0eXBlLCBjb2xvcikge1xyXG4gIHJldHVybiAoLi4uaW5wdXQpID0+IGNvbnNvbGVbdHlwZV0oXHJcbiAgICBgJWMke3ByZWZpeH0lY2AsXHJcbiAgICBgYmFja2dyb3VuZC1jb2xvcjogJHtjb2xvcn07IGNvbG9yOiB3aGl0ZTsgYm9yZGVyLXJhZGl1czogNHB4OyBwYWRkaW5nOiAwcHggNnB4IDBweCA2cHg7IGZvbnQtd2VpZ2h0OiBib2xkYCxcclxuICAgIFwiXCIsXHJcbiAgICAuLi5pbnB1dFxyXG4gICk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBsb2c6IGJ1aWxkKFwiQWNvcmRcIiwgXCJsb2dcIiwgXCIjMDBmYmIwXCIpLFxyXG4gIGRlYnVnOiBidWlsZChcIkFjb3JkIERlYnVnXCIsIFwiZGVidWdcIiwgXCIjMDBmYmIwXCIpLFxyXG4gIGluZm86IGJ1aWxkKFwiQWNvcmQgSW5mb1wiLCBcImxvZ1wiLCBcIiM4MmFhZmZcIiksXHJcbiAgd2FybjogYnVpbGQoXCJBY29yZCBXYXJuXCIsIFwid2FyblwiLCBcIiNkZWJmMThcIiksXHJcbiAgZXJyb3I6IGJ1aWxkKFwiQWNvcmQgRXJyb3JcIiwgXCJlcnJvclwiLCBcIiNlZjU4NThcIiksXHJcbiAgYnVpbGRcclxufSIsICJpbXBvcnQgZmluZEluVHJlZSBmcm9tIFwiLi9yYXcvZmluZC1pbi10cmVlLmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgZ2V0SW5zdGFuY2Uobm9kZSkge1xyXG4gICAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKG5vZGUpLmZpbmQoaSA9PiBpWzBdLnN0YXJ0c1dpdGgoXCJfX3JlYWN0SW50ZXJuYWxJbnN0YW5jZVwiKSB8fCBpWzBdLnN0YXJ0c1dpdGgoXCJfX3JlYWN0RmliZXJcIikpPy5bMV07XHJcbiAgfSxcclxuICBnZXRPd25lckluc3RhbmNlKG5vZGUpIHtcclxuICAgIGxldCBpbnN0YW5jZSA9IHRoaXMuZ2V0SW5zdGFuY2Uobm9kZSk7XHJcbiAgICBmb3IgKGxldCBlbCA9IGluc3RhbmNlOyBlbDsgZWwgPSBlbC5yZXR1cm4pXHJcbiAgICAgIGlmIChlbC5zdGF0ZU5vZGU/LmZvcmNlVXBkYXRlKSByZXR1cm4gZWwuc3RhdGVOb2RlO1xyXG4gIH0sXHJcbiAgZmluZEluVHJlZSh0cmVlLCBmaWx0ZXIpIHtcclxuICAgIHJldHVybiBmaW5kSW5UcmVlKHRyZWUsIGZpbHRlciwge1xyXG4gICAgICB3YWxrYWJsZTogW1wicHJvcHNcIiwgXCJzdGF0ZVwiLCBcImNoaWxkcmVuXCIsIFwicmV0dXJuXCJdXHJcbiAgICB9KTtcclxuICB9LFxyXG4gIGdldENvbXBvbmVudHMobm9kZSkge1xyXG4gICAgY29uc3QgaW5zdGFuY2UgPSB0aGlzLmdldEluc3RhbmNlKG5vZGUpO1xyXG4gICAgY29uc3QgY29tcG9uZW50cyA9IFtdO1xyXG4gICAgbGV0IGxhc3RJbnN0YW5jZSA9IGluc3RhbmNlO1xyXG4gICAgd2hpbGUgKGxhc3RJbnN0YW5jZSAmJiBsYXN0SW5zdGFuY2UucmV0dXJuKSB7XHJcbiAgICAgIGlmICh0eXBlb2YgbGFzdEluc3RhbmNlLnJldHVybi50eXBlID09PSBcInN0cmluZ1wiKSBicmVhaztcclxuICAgICAgaWYgKGxhc3RJbnN0YW5jZS5yZXR1cm4udHlwZSkgY29tcG9uZW50cy5wdXNoKGxhc3RJbnN0YW5jZS5yZXR1cm4udHlwZSk7XHJcbiAgICAgIGxhc3RJbnN0YW5jZSA9IGxhc3RJbnN0YW5jZS5yZXR1cm47XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY29tcG9uZW50cztcclxuICB9LFxyXG4gIGdldFN0YXRlTm9kZXMobm9kZSkge1xyXG4gICAgY29uc3QgaW5zdGFuY2UgPSB0aGlzLmdldEluc3RhbmNlKG5vZGUpO1xyXG4gICAgY29uc3Qgc3RhdGVOb2RlcyA9IFtdO1xyXG4gICAgbGV0IGxhc3RJbnN0YW5jZSA9IGluc3RhbmNlO1xyXG4gICAgd2hpbGUgKGxhc3RJbnN0YW5jZSAmJiBsYXN0SW5zdGFuY2UucmV0dXJuKSB7XHJcbiAgICAgIGlmIChsYXN0SW5zdGFuY2UucmV0dXJuLnN0YXRlTm9kZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSBicmVhaztcclxuICAgICAgaWYgKGxhc3RJbnN0YW5jZS5yZXR1cm4uc3RhdGVOb2RlKVxyXG4gICAgICAgIHN0YXRlTm9kZXMucHVzaChsYXN0SW5zdGFuY2UucmV0dXJuLnN0YXRlTm9kZSk7XHJcbiAgICAgIGxhc3RJbnN0YW5jZSA9IGxhc3RJbnN0YW5jZS5yZXR1cm47XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3RhdGVOb2RlcztcclxuICB9LFxyXG4gIGdldFByb3BzKGVsLCBmaWx0ZXIgPSAoaSkgPT4gaSwgbWF4ID0gMTAwMDApIHtcclxuICAgIGNvbnN0IGluc3RhbmNlID0gdGhpcy5nZXRJbnN0YW5jZShlbCk7XHJcblxyXG4gICAgaWYgKCFpbnN0YW5jZT8ucmV0dXJuKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgICBmb3IgKFxyXG4gICAgICBsZXQgY3VycmVudCA9IGluc3RhbmNlPy5yZXR1cm4sIGkgPSAwO1xyXG4gICAgICBpID4gbWF4IHx8IGN1cnJlbnQgIT09IG51bGw7XHJcbiAgICAgIGN1cnJlbnQgPSBjdXJyZW50Py5yZXR1cm4sIGkrK1xyXG4gICAgKSB7XHJcbiAgICAgIGlmIChjdXJyZW50Py5wZW5kaW5nUHJvcHMgJiYgZmlsdGVyKGN1cnJlbnQucGVuZGluZ1Byb3BzKSlcclxuICAgICAgICByZXR1cm4gY3VycmVudC5wZW5kaW5nUHJvcHM7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfSxcclxufSIsICJpbXBvcnQgZmluZEluVHJlZSBmcm9tIFwiLi9yYXcvZmluZC1pbi10cmVlLmpzXCI7XHJcbmltcG9ydCBsb2dnZXIgZnJvbSBcIi4vbG9nZ2VyLmpzXCI7XHJcbmltcG9ydCByZWFjdCBmcm9tIFwiLi9yZWFjdC5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGxvZ2dlcixcclxuICByZWFjdCxcclxuICBmaW5kSW5UcmVlLFxyXG4gIGZvcm1hdCh2YWwsIC4uLmFyZ3MpIHtcclxuICAgIHJldHVybiBgJHt2YWx9YC5yZXBsYWNlQWxsKC97KFxcZCspfS9nLCAoXywgY2FwKSA9PiB7XHJcbiAgICAgIHJldHVybiBhcmdzW051bWJlcihjYXApXTtcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgaW50ZXJ2YWwoY2IsIGR1cikge1xyXG4gICAgbGV0IGludGVydmFsID0gc2V0SW50ZXJ2YWwoY2IsIGR1cik7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcclxuICAgIH07XHJcbiAgfSxcclxuICB0aW1lb3V0KGNiLCBkdXIpIHtcclxuICAgIGxldCB0aW1lb3V0ID0gc2V0VGltZW91dChjYiwgZHVyKTtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcclxuICAgIH07XHJcbiAgfSxcclxuICBpZkV4aXN0cyh2YWwsIGNiKSB7XHJcbiAgICBpZiAodmFsKSBjYih2YWwpO1xyXG4gIH0sXHJcbiAgY29weVRleHQodGV4dCkge1xyXG4gICAgaWYgKHdpbmRvdy5EaXNjb3JkTmF0aXZlKSB7XHJcbiAgICAgIERpc2NvcmROYXRpdmUuY2xpcGJvYXJkLmNvcHkodGV4dCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBuYXZpZ2F0b3IuY2xpcGJvYXJkLndyaXRlVGV4dCh0ZXh0KS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgIGNvbnN0IGNvcHlBcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRleHRhcmVhXCIpO1xyXG5cclxuICAgICAgY29weUFyZWEuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XHJcbiAgICAgIGNvcHlBcmVhLnN0eWxlLnBvc2l0aW9uID0gXCJmaXhlZFwiO1xyXG4gICAgICBjb3B5QXJlYS5zdHlsZS50b3AgPSBcIjBcIjtcclxuICAgICAgY29weUFyZWEuc3R5bGUubGVmdCA9IFwiMFwiO1xyXG5cclxuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjb3B5QXJlYSk7XHJcbiAgICAgIGNvcHlBcmVhLmZvY3VzKCk7XHJcbiAgICAgIGNvcHlBcmVhLnNlbGVjdCgpO1xyXG5cclxuICAgICAgdHJ5IHtcclxuICAgICAgICBkb2N1bWVudC5leGVjQ29tbWFuZChcImNvcHlcIik7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChjb3B5QXJlYSk7XHJcbiAgICB9KTtcclxuICB9LFxyXG59IiwgImltcG9ydCB1dGlscyBmcm9tIFwiLi4vLi4vdXRpbHMvaW5kZXguanNcIjtcclxuaW1wb3J0IGxvZ2dlciBmcm9tIFwiLi4vLi4vdXRpbHMvbG9nZ2VyLmpzXCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gd3JhcEZpbHRlcihmaWx0ZXIpIHtcclxuICByZXR1cm4gKC4uLmFyZ3MpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGlmIChhcmdzWzBdPy5kb2N1bWVudCAmJiBhcmdzWzBdPy53aW5kb3cpIHJldHVybiBmYWxzZTtcclxuICAgICAgaWYgKGFyZ3NbMF0/LmRlZmF1bHQ/LnJlbW92ZSAmJiBhcmdzWzBdPy5kZWZhdWx0Py5zZXQgJiYgYXJnc1swXT8uZGVmYXVsdD8uY2xlYXIgJiYgYXJnc1swXT8uZGVmYXVsdD8uZ2V0ICYmICFhcmdzWzBdPy5kZWZhdWx0Py5zb3J0KSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIGlmIChhcmdzWzBdLnJlbW92ZSAmJiBhcmdzWzBdLnNldCAmJiBhcmdzWzBdLmNsZWFyICYmIGFyZ3NbMF0uZ2V0ICYmICFhcmdzWzBdLnNvcnQpIHJldHVybiBmYWxzZTtcclxuICAgICAgaWYgKGFyZ3NbMF0/LmRlZmF1bHQ/LmdldFRva2VuIHx8IGFyZ3NbMF0/LmRlZmF1bHQ/LmdldEVtYWlsIHx8IGFyZ3NbMF0/LmRlZmF1bHQ/LnNob3dUb2tlbikgcmV0dXJuIGZhbHNlO1xyXG4gICAgICBpZiAoYXJnc1swXT8uZ2V0VG9rZW4gfHwgYXJnc1swXT8uZ2V0RW1haWwgfHwgYXJnc1swXT8uc2hvd1Rva2VuKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIHJldHVybiBmaWx0ZXIoLi4uYXJncyk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGxvZ2dlci53YXJuKFwiTW9kdWxlIGZpbHRlciB0aHJldyBhbiBleGNlcHRpb24uXCIsIGZpbHRlciwgZXJyKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNoZWNrTW9kdWxlU3RyaW5ncyhtLCBzdHJpbmdzLCBoYXNOb3QpIHtcclxuICBjb25zdCBjaGVjayA9IChzMSwgczIpID0+IHtcclxuICAgIHJldHVybiBoYXNOb3QgPyBzMS50b1N0cmluZygpLmluZGV4T2YoczIudG9TdHJpbmcoKSkgPT0gLTEgOiBzMS50b1N0cmluZygpLmluZGV4T2YoczIudG9TdHJpbmcoKSkgPiAtMTtcclxuICB9O1xyXG4gIHJldHVybiBzdHJpbmdzLmV2ZXJ5KGogPT4ge1xyXG4gICAgcmV0dXJuIGNoZWNrKG0/LnRvU3RyaW5nPy4oKSB8fCBcIlwiLCBqKVxyXG4gICAgICB8fCBjaGVjayhtPy5fX29yaWdpbmFsX18/LnRvU3RyaW5nPy4oKSB8fCBcIlwiLCBqKVxyXG4gICAgICB8fCBjaGVjayhtPy50eXBlPy50b1N0cmluZz8uKCkgfHwgXCJcIiwgailcclxuICAgICAgfHwgY2hlY2sobT8udHlwZT8uX19vcmlnaW5hbF9fPy50b1N0cmluZz8uKCkgfHwgXCJcIiwgailcclxuICAgICAgfHwgT2JqZWN0LmVudHJpZXMoWydmdW5jdGlvbicsICdvYmplY3QnXS5pbmNsdWRlcyh0eXBlb2YgbT8ucHJvdG90eXBlKSA/IHR5cGVvZiBtPy5wcm90b3R5cGUgOiB7fSkuZmlsdGVyKGkgPT4gaVswXT8uaW5jbHVkZXM/LihcInJlbmRlclwiKSkuc29tZShpID0+IGNoZWNrKGlbMV0/LnRvU3RyaW5nPy4oKSB8fCBcIlwiLCBqKSlcclxuICB9KTtcclxufTtcclxuZnVuY3Rpb24gY2hlY2tNb2R1bGVQcm9wcyhtLCBwcm9wZXJ0aWVzLCBoYXNOb3QpIHtcclxuICByZXR1cm4gcHJvcGVydGllcy5ldmVyeShwcm9wID0+IHtcclxuICAgIGNvbnN0IHZhbHVlID0gbVtwcm9wXT8uX19vcmlnaW5hbF9fIHx8IG1bcHJvcF07XHJcbiAgICByZXR1cm4gaGFzTm90ID8gdmFsdWUgPT09IHVuZGVmaW5lZCA6ICh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmICEodHlwZW9mIHZhbHVlID09IFwic3RyaW5nXCIgJiYgIXZhbHVlKSk7XHJcbiAgfSk7XHJcbn07XHJcbmZ1bmN0aW9uIGNoZWNrTW9kdWxlUHJvdG90eXBlcyhtLCBwcm90b1Byb3BzLCBoYXNOb3QpIHtcclxuICByZXR1cm4gbS5wcm90b3R5cGUgJiYgcHJvdG9Qcm9wcy5ldmVyeShwcm9wID0+IHtcclxuICAgIGNvbnN0IHZhbHVlID0gbS5wcm90b3R5cGVbcHJvcF07XHJcbiAgICByZXR1cm4gaGFzTm90ID8gdmFsdWUgPT09IHVuZGVmaW5lZCA6ICh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmICEodHlwZW9mIHZhbHVlID09IFwic3RyaW5nXCIgJiYgIXZhbHVlKSk7XHJcbiAgfSk7XHJcbn07XHJcblxyXG5jb25zdCB3ZWJwYWNrQ2h1bmtOYW1lID0gXCJ3ZWJwYWNrQ2h1bmtkaXNjb3JkX2FwcFwiO1xyXG5jb25zdCBwdXNoTGlzdGVuZXJzID0gbmV3IFNldCgpO1xyXG5cclxuXHJcbntcclxuICBsZXQgb2dQdXNoID0gd2luZG93W3dlYnBhY2tDaHVua05hbWVdLnB1c2g7XHJcblxyXG4gIGZ1bmN0aW9uIGhhbmRsZVB1c2goY2h1bmspIHtcclxuICAgIGNvbnN0IFssIG1vZHVsZXNdID0gY2h1bms7XHJcblxyXG4gICAgZm9yIChjb25zdCBtb2R1bGVJZCBpbiBPYmplY3Qua2V5cyhtb2R1bGVzIHx8IHt9KSkge1xyXG4gICAgICBjb25zdCBvZ01vZHVsZSA9IG1vZHVsZXNbbW9kdWxlSWRdO1xyXG5cclxuICAgICAgbW9kdWxlc1ttb2R1bGVJZF0gPSAobW9kdWxlLCBleHBvcnRzLCByZXF1aXJlKSA9PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIG9nTW9kdWxlLmNhbGwobnVsbCwgbW9kdWxlLCBleHBvcnRzLCByZXF1aXJlKTtcclxuXHJcbiAgICAgICAgICBwdXNoTGlzdGVuZXJzLmZvckVhY2gobGlzdGVuZXIgPT4ge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgIGxpc3RlbmVyKGV4cG9ydHMpO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgIHV0aWxzLmxvZ2dlci5lcnJvcihcIlB1c2ggbGlzdGVuZXIgdGhyZXcgYW4gZXhjZXB0aW9uLlwiLCBsaXN0ZW5lciwgZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICB1dGlscy5sb2dnZXIuZXJyb3IoXCJVbmFibGUgdG8gcGF0Y2ggcHVzaGVkIG1vZHVsZS5cIiwgZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuXHJcbiAgICAgIE9iamVjdC5hc3NpZ24obW9kdWxlc1ttb2R1bGVJZF0sIG9nTW9kdWxlLCB7XHJcbiAgICAgICAgX19vcmlnaW5hbF9fOiBvZ01vZHVsZSxcclxuICAgICAgICB0b1N0cmluZzogKCkgPT4gb2dNb2R1bGUudG9TdHJpbmcoKSxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG9nUHVzaC5jYWxsKHdpbmRvd1t3ZWJwYWNrQ2h1bmtOYW1lXSwgY2h1bmspO1xyXG4gIH1cclxuXHJcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvd1t3ZWJwYWNrQ2h1bmtOYW1lXSwgXCJwdXNoXCIsIHtcclxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcclxuICAgIGdldCgpIHsgcmV0dXJuIGhhbmRsZVB1c2g7IH0sXHJcbiAgICBzZXQodmFsdWUpIHtcclxuICAgICAgb2dQdXNoID0gdmFsdWU7XHJcblxyXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93W3RoaXMuY2h1bmtOYW1lXSwgXCJwdXNoXCIsIHtcclxuICAgICAgICB2YWx1ZTogdGhpcy5oYW5kbGVQdXNoLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcclxuICAgICAgICB3cml0YWJsZTogdHJ1ZVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9KTtcclxufVxyXG5cclxuXHJcblxyXG4vKipcclxuICogXHJcbiAqIEBwYXJhbSB7YW55fSBmaWx0ZXIgXHJcbiAqIEBwYXJhbSB7eyBzaWduYWw6IEFib3J0U2lnbmFsLCBzZWFyY2hFeHBvcnRzOiBib29sZWFuIH19IHBhcmFtMSBcclxuICogQHJldHVybnMgXHJcbiAqL1xyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbGF6eUZpbmQoZmlsdGVyLCB7IHNpZ25hbCA9IG51bGwsIHNlYXJjaEV4cG9ydHMgPSBmYWxzZSB9KSB7XHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgIGNvbnN0IGNhbmNlbCA9ICgpID0+IHB1c2hMaXN0ZW5lcnMuZGVsZXRlKGxpc3RlbmVyKTtcclxuICAgIGNvbnN0IGxpc3RlbmVyID0gKGV4cG9ydHMpID0+IHtcclxuICAgICAgaWYgKCFleHBvcnRzIHx8IGV4cG9ydHMgPT09IHdpbmRvdyB8fCBleHBvcnRzID09PSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpIHJldHVybjtcclxuXHJcbiAgICAgIGxldCBmb3VuZCA9IG51bGw7XHJcblxyXG4gICAgICBpZiAodHlwZW9mIGV4cG9ydHMgPT0gXCJvYmplY3RcIiAmJiBzZWFyY2hFeHBvcnRzKSB7XHJcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gZXhwb3J0cykge1xyXG4gICAgICAgICAgbGV0IGV4cG9ydGVkID0gZXhwb3J0c1trZXldO1xyXG4gICAgICAgICAgaWYgKCFleHBvcnRlZCkgY29udGludWU7XHJcbiAgICAgICAgICBpZiAoZmlsdGVyKGV4cG9ydGVkKSkge1xyXG4gICAgICAgICAgICBmb3VuZCA9IGV4cG9ydGVkO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbGV0IHBhdGhzID0gW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiLFxyXG4gICAgICAgICAgXCJcIlxyXG4gICAgICAgIF07XHJcbiAgICAgICAgZm91bmQgPSBwYXRocy5tYXAoaSA9PiB7XHJcbiAgICAgICAgICBsZXQgcGF0aGVkID0gIWkgPyBleHBvcnRzIDogXy5nZXQoZXhwb3J0cywgaSk7XHJcbiAgICAgICAgICBpZiAocGF0aGVkICYmIGZpbHRlcihwYXRoZWQpKSByZXR1cm4gcGF0aGVkO1xyXG4gICAgICAgIH0pLmZpbmQoaSA9PiBpKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCFmb3VuZCkgcmV0dXJuO1xyXG4gICAgICBjYW5jZWwoKTtcclxuICAgICAgcmVzb2x2ZShmb3VuZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVzaExpc3RlbmVycy5hZGQobGlzdGVuZXIpO1xyXG5cclxuICAgIHNpZ25hbD8uYWRkRXZlbnRMaXN0ZW5lcihcImFib3J0XCIsICgpID0+IHtcclxuICAgICAgY2FuY2VsKCk7XHJcbiAgICAgIHJlc29sdmUobnVsbCk7XHJcbiAgICB9KTtcclxuICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGZpbmQocmVxLCBmaWx0ZXIsIGNvbmZpZyA9IHt9KSB7XHJcbiAgbGV0IGRlZmF1bHRFeHBvcnQgPSB0eXBlb2YgY29uZmlnLmRlZmF1bHRFeHBvcnQgIT0gXCJib29sZWFuXCIgPyBmYWxzZSA6IGNvbmZpZy5kZWZhdWx0RXhwb3J0O1xyXG4gIGxldCB1bmxvYWRlZCA9IHR5cGVvZiBjb25maWcudW5sb2FkZWQgIT0gXCJib29sZWFuXCIgPyBmYWxzZSA6IGNvbmZpZy51bmxvYWRlZDtcclxuICBsZXQgYWxsID0gdHlwZW9mIGNvbmZpZy5hbGwgIT0gXCJib29sZWFuXCIgPyBmYWxzZSA6IGNvbmZpZy5hbGw7XHJcbiAgY29uc3QgZm91bmQgPSBbXTtcclxuICBpZiAoIXVubG9hZGVkKSBmb3IgKGxldCBpIGluIHJlcS5jKSBpZiAocmVxLmMuaGFzT3duUHJvcGVydHkoaSkpIHtcclxuICAgIGxldCBtID0gcmVxLmNbaV0uZXhwb3J0cywgciA9IG51bGw7XHJcbiAgICBpZiAobSAmJiAodHlwZW9mIG0gPT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgbSA9PSBcImZ1bmN0aW9uXCIpKSB7XHJcbiAgICAgIGlmICghIShyID0gZmlsdGVyKG0sIGkpKSkge1xyXG4gICAgICAgIGlmIChhbGwpIGZvdW5kLnB1c2goZGVmYXVsdEV4cG9ydCA/IHIgOiByZXEuY1tpXSk7XHJcbiAgICAgICAgZWxzZSByZXR1cm4gZGVmYXVsdEV4cG9ydCA/IHIgOiByZXEuY1tpXTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIGZvciAobGV0IGtleSBvZiBPYmplY3Qua2V5cyhtKSkgaWYgKGtleS5sZW5ndGggPCA0ICYmIG1ba2V5XSAmJiAhIShyID0gZmlsdGVyKG1ba2V5XSwgaSkpKSB7XHJcbiAgICAgICAgaWYgKGFsbCkgZm91bmQucHVzaChkZWZhdWx0RXhwb3J0ID8gciA6IHJlcS5jW2ldKTtcclxuICAgICAgICBlbHNlIHJldHVybiBkZWZhdWx0RXhwb3J0ID8gciA6IHJlcS5jW2ldO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAobSAmJiBtLl9fZXNNb2R1bGUgJiYgbS5kZWZhdWx0ICYmICh0eXBlb2YgbS5kZWZhdWx0ID09IFwib2JqZWN0XCIgfHwgdHlwZW9mIG0uZGVmYXVsdCA9PSBcImZ1bmN0aW9uXCIpKSB7XHJcbiAgICAgIGlmICghIShyID0gZmlsdGVyKG0uZGVmYXVsdCwgaSkpKSB7XHJcbiAgICAgICAgaWYgKGFsbCkgZm91bmQucHVzaChkZWZhdWx0RXhwb3J0ID8gciA6IHJlcS5jW2ldKTtcclxuICAgICAgICBlbHNlIHJldHVybiBkZWZhdWx0RXhwb3J0ID8gciA6IHJlcS5jW2ldO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYgKG0uZGVmYXVsdC50eXBlICYmICh0eXBlb2YgbS5kZWZhdWx0LnR5cGUgPT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgbS5kZWZhdWx0LnR5cGUgPT0gXCJmdW5jdGlvblwiKSAmJiAhIShyID0gZmlsdGVyKG0uZGVmYXVsdC50eXBlLCBpKSkpIHtcclxuICAgICAgICBpZiAoYWxsKSBmb3VuZC5wdXNoKGRlZmF1bHRFeHBvcnQgPyByIDogcmVxLmNbaV0pO1xyXG4gICAgICAgIGVsc2UgcmV0dXJuIGRlZmF1bHRFeHBvcnQgPyByIDogcmVxLmNbaV07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgZm9yIChsZXQgaSBpbiByZXEubSkgaWYgKHJlcS5tLmhhc093blByb3BlcnR5KGkpKSB7XHJcbiAgICBsZXQgbSA9IHJlcS5tW2ldO1xyXG4gICAgaWYgKG0gJiYgdHlwZW9mIG0gPT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgIGlmIChyZXEuY1tpXSAmJiAhdW5sb2FkZWQgJiYgZmlsdGVyKG0sIGkpKSB7XHJcbiAgICAgICAgaWYgKGFsbCkgZm91bmQucHVzaChkZWZhdWx0RXhwb3J0ID8gcmVxLmNbaV0uZXhwb3J0cyA6IHJlcS5jW2ldKTtcclxuICAgICAgICBlbHNlIHJldHVybiBkZWZhdWx0RXhwb3J0ID8gcmVxLmNbaV0uZXhwb3J0cyA6IHJlcS5jW2ldO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICghcmVxLmNbaV0gJiYgdW5sb2FkZWQgJiYgZmlsdGVyKG0sIGkpKSB7XHJcbiAgICAgICAgY29uc3QgcmVzb2x2ZWQgPSB7fSwgcmVzb2x2ZWQyID0ge307XHJcbiAgICAgICAgbShyZXNvbHZlZCwgcmVzb2x2ZWQyLCByZXEpO1xyXG4gICAgICAgIGNvbnN0IHRydWVSZXNvbHZlZCA9IHJlc29sdmVkMiAmJiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhyZXNvbHZlZDIgfHwge30pLmxlbmd0aCA9PSAwID8gcmVzb2x2ZWQgOiByZXNvbHZlZDI7XHJcbiAgICAgICAgaWYgKGFsbCkgZm91bmQucHVzaChkZWZhdWx0RXhwb3J0ID8gdHJ1ZVJlc29sdmVkLmV4cG9ydHMgOiB0cnVlUmVzb2x2ZWQpO1xyXG4gICAgICAgIGVsc2UgcmV0dXJuIGRlZmF1bHRFeHBvcnQgPyB0cnVlUmVzb2x2ZWQuZXhwb3J0cyA6IHRydWVSZXNvbHZlZDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICBpZiAoYWxsKSByZXR1cm4gZm91bmQ7XHJcbn07XHJcblxyXG5cclxuZnVuY3Rpb24gZmluZGVyRmluZEZ1bmN0aW9uKGVudHJpZXMsIHN0cmluZ3MpIHtcclxuICByZXR1cm4gKGVudHJpZXMuZmluZChuID0+IHtcclxuICAgIGxldCBmdW5jU3RyaW5nID0gdHlwZW9mIG5bMV0gPT0gXCJmdW5jdGlvblwiID8gKG5bMV0/Ll9fb3JpZ2luYWxfXz8udG9TdHJpbmc/LigpIHx8IG5bMV0/LnRvU3RyaW5nPy4oKSB8fCBcIlwiKSA6ICgoKSA9PiB7IHRyeSB7IHJldHVybiBKU09OLnN0cmluZ2lmeShuWzFdKSB9IGNhdGNoIChlcnIpIHsgcmV0dXJuIG5bMV0udG9TdHJpbmcoKSB9IH0pKCk7XHJcbiAgICBsZXQgcmVuZGVyRnVuY1N0cmluZyA9IG5bMV0/LnJlbmRlcj8uX19vcmlnaW5hbF9fPy50b1N0cmluZz8uKCkgfHwgblsxXT8ucmVuZGVyPy50b1N0cmluZz8uKCkgfHwgXCJcIjtcclxuICAgIHJldHVybiBzdHJpbmdzLmV2ZXJ5KHN0cmluZyA9PiBmdW5jU3RyaW5nLmluZGV4T2Yoc3RyaW5nKSAhPSAtMSB8fCByZW5kZXJGdW5jU3RyaW5nLmluZGV4T2Yoc3RyaW5nKSAhPSAtMSk7XHJcbiAgfSkpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZmluZGVyVG9GaWx0ZXIoZmluZGVyKSB7XHJcbiAgbGV0IGZvdW5kID0gKCkgPT4gZmFsc2U7XHJcbiAgaWYgKHR5cGVvZiBmaW5kZXI/LmZpbHRlciA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgZm91bmQgPSB3cmFwRmlsdGVyKGV2YWwoYCgoJCk9PnsgdHJ5IHsgcmV0dXJuICgke2ZpbmRlci5maWx0ZXJ9KTsgfSBjYXRjaCB7IHJldHVybiBmYWxzZTsgfSB9KWApKTtcclxuICB9IGVsc2UgaWYgKHR5cGVvZiBmaW5kZXI/LmZpbHRlciA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICBmb3VuZCA9IHdyYXBGaWx0ZXIoZmluZGVyLmZpbHRlcik7XHJcbiAgfSBlbHNlIHtcclxuICAgIHN3aXRjaCAoZmluZGVyLmZpbHRlci5pbikge1xyXG4gICAgICBjYXNlIFwicHJvcGVydGllc1wiOiB7XHJcbiAgICAgICAgaWYgKGZpbmRlci5maWx0ZXIuYnk/LlsxXT8ubGVuZ3RoKSB7XHJcbiAgICAgICAgICBmb3VuZCA9IHdyYXBGaWx0ZXIoKG0pID0+IGNoZWNrTW9kdWxlUHJvcHMobSwgZmluZGVyLmZpbHRlci5ieT8uWzBdIHx8IFtdKSAmJiBjaGVja01vZHVsZVByb3BzKG0sIGZpbmRlci5maWx0ZXIuYnk/LlsxXSB8fCBbXSwgdHJ1ZSkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBmb3VuZCA9IHdyYXBGaWx0ZXIoKG0pID0+IGNoZWNrTW9kdWxlUHJvcHMobSwgZmluZGVyLmZpbHRlci5ieT8uWzBdIHx8IFtdKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgXCJwcm90b3R5cGVzXCI6IHtcclxuICAgICAgICBpZiAoZmluZGVyLmZpbHRlci5ieT8uWzFdPy5sZW5ndGgpIHtcclxuICAgICAgICAgIGZvdW5kID0gd3JhcEZpbHRlcigobSkgPT4gY2hlY2tNb2R1bGVQcm90b3R5cGVzKG0sIGZpbmRlci5maWx0ZXIuYnk/LlswXSB8fCBbXSkgJiYgY2hlY2tNb2R1bGVQcm90b3R5cGVzKG0sIGZpbmRlci5maWx0ZXIuYnk/LlsxXSB8fCBbXSwgdHJ1ZSkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBmb3VuZCA9IHdyYXBGaWx0ZXIoKG0pID0+IGNoZWNrTW9kdWxlUHJvdG90eXBlcyhtLCBmaW5kZXIuZmlsdGVyLmJ5Py5bMF0gfHwgW10pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSBcInN0cmluZ3NcIjoge1xyXG4gICAgICAgIGlmIChmaW5kZXIuZmlsdGVyLmJ5Py5bMV0/Lmxlbmd0aCkge1xyXG4gICAgICAgICAgZm91bmQgPSB3cmFwRmlsdGVyKChtKSA9PiBjaGVja01vZHVsZVN0cmluZ3MobSwgZmluZGVyLmZpbHRlci5ieT8uWzBdIHx8IFtdKSAmJiBjaGVja01vZHVsZVN0cmluZ3MobSwgZmluZGVyLmZpbHRlci5ieT8uWzFdIHx8IFtdLCB0cnVlKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGZvdW5kID0gd3JhcEZpbHRlcigobSkgPT4gY2hlY2tNb2R1bGVTdHJpbmdzKG0sIGZpbmRlci5maWx0ZXIuYnk/LlswXSB8fCBbXSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gZm91bmQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBmaW5kZXJNYXAoX19vcmlnaW5hbF9fLCBtYXApIHtcclxuICBsZXQgX19tYXBwZWRfXyA9IHt9O1xyXG5cclxuICBsZXQgdGVtcCA9IHtcclxuICAgIF9fb3JpZ2luYWxfXyxcclxuICAgIF9fbWFwcGVkX18sXHJcbiAgICAuLi5fX29yaWdpbmFsX19cclxuICB9O1xyXG5cclxuICBPYmplY3QuZW50cmllcyhtYXApLmZvckVhY2goKFtrZXksIHN0cmluZ3NdKSA9PiB7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGVtcCwga2V5LCB7XHJcbiAgICAgIGdldCgpIHtcclxuICAgICAgICBpZiAoX19tYXBwZWRfX1trZXldKSByZXR1cm4gX19vcmlnaW5hbF9fW19fbWFwcGVkX19ba2V5XV07XHJcblxyXG4gICAgICAgIGxldCBmb3VuZEZ1bmMgPSBmaW5kZXJGaW5kRnVuY3Rpb24oT2JqZWN0LmVudHJpZXMoX19vcmlnaW5hbF9fIHx8IHt9KSwgbWFwW2tleV0gfHwgW10pO1xyXG4gICAgICAgIGlmICghZm91bmRGdW5jPy5sZW5ndGgpIHJldHVybjtcclxuXHJcbiAgICAgICAgX19tYXBwZWRfX1trZXldID0gZm91bmRGdW5jWzBdO1xyXG4gICAgICAgIHJldHVybiBmb3VuZEZ1bmNbMV07XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiB0ZW1wO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZmluZEJ5RmluZGVyKHJlcSwgZmluZGVyID0ge30pIHtcclxuICBjb25zdCBkZWZhdWx0RXhwb3J0ID0gISFmaW5kZXI/LmZpbHRlcj8uZXhwb3J0O1xyXG4gIGxldCBmb3VuZCA9IGZpbmQocmVxLCBmaW5kZXJUb0ZpbHRlcihmaW5kZXIpLCB7IGRlZmF1bHRFeHBvcnQsIGFsbDogdHJ1ZSB9KS5maW5kKGkgPT4gaSAhPT0gZ2xvYmFsVGhpcy53aW5kb3cgfHwgaT8uZXhwb3J0cyAhPT0gZ2xvYmFsVGhpcy53aW5kb3cpO1xyXG5cclxuICBpZiAoIWZvdW5kKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgaWYgKGZpbmRlci5wYXRoPy5iZWZvcmUpIGZvdW5kID0gKEFycmF5LmlzQXJyYXkoZmluZGVyLnBhdGguYmVmb3JlKSA/IGZpbmRlci5wYXRoLmJlZm9yZS5tYXAoaSA9PiBfLmdldChmb3VuZCwgaSkpLmZpbmQoaSA9PiBpKSA6IF8uZ2V0KGZvdW5kLCBmaW5kZXIucGF0aC5iZWZvcmUpKSB8fCBmb3VuZDtcclxuICBpZiAoZmluZGVyLmFzc2lnbikgZm91bmQgPSBPYmplY3QuYXNzaWduKHt9LCBmb3VuZCk7XHJcblxyXG4gIGlmICghZm91bmQpIHJldHVybiBudWxsO1xyXG5cclxuICBpZiAoZmluZGVyLm1hcCkgZm91bmQgPSBmaW5kZXJNYXAoZm91bmQsIGZpbmRlci5tYXApO1xyXG5cclxuICBpZiAoZmluZGVyLnBhdGg/LmFmdGVyKSBmb3VuZCA9IChBcnJheS5pc0FycmF5KGZpbmRlci5wYXRoLmFmdGVyKSA/IGZpbmRlci5wYXRoLmFmdGVyLm1hcChpID0+IF8uZ2V0KGZvdW5kLCBpKSkuZmluZChpID0+IGkpIDogXy5nZXQoZm91bmQsIGZpbmRlci5wYXRoLmFmdGVyKSkgfHwgZm91bmQ7XHJcblxyXG4gIHJldHVybiBmb3VuZDtcclxufVxyXG5cclxuXHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbGF6eUZpbmRCeUZpbmRlcihmaW5kZXIgPSB7fSkge1xyXG4gIGxldCBmb3VuZCA9IGF3YWl0IGxhenlGaW5kKGZpbmRlclRvRmlsdGVyKGZpbmRlciksIHsgc2VhcmNoRXhwb3J0czogZmFsc2UgfSk7XHJcblxyXG4gIGlmICghZm91bmQpIHJldHVybiBudWxsO1xyXG5cclxuICBpZiAoZmluZGVyLnBhdGg/LmJlZm9yZSkgZm91bmQgPSAoQXJyYXkuaXNBcnJheShmaW5kZXIucGF0aC5iZWZvcmUpID8gZmluZGVyLnBhdGguYmVmb3JlLm1hcChpID0+IF8uZ2V0KGZvdW5kLCBpKSkuZmluZChpID0+IGkpIDogXy5nZXQoZm91bmQsIGZpbmRlci5wYXRoLmJlZm9yZSkpIHx8IGZvdW5kO1xyXG4gIGlmIChmaW5kZXIuYXNzaWduKSBmb3VuZCA9IE9iamVjdC5hc3NpZ24oe30sIGZvdW5kKTtcclxuXHJcbiAgaWYgKCFmb3VuZCkgcmV0dXJuIG51bGw7XHJcblxyXG4gIGlmIChmaW5kZXIubWFwKSBmb3VuZCA9IGZpbmRlck1hcChmb3VuZCwgZmluZGVyLm1hcCk7XHJcblxyXG4gIGlmIChmaW5kZXIucGF0aD8uYWZ0ZXIpIGZvdW5kID0gKEFycmF5LmlzQXJyYXkoZmluZGVyLnBhdGguYWZ0ZXIpID8gZmluZGVyLnBhdGguYWZ0ZXIubWFwKGkgPT4gXy5nZXQoZm91bmQsIGkpKS5maW5kKGkgPT4gaSkgOiBfLmdldChmb3VuZCwgZmluZGVyLnBhdGguYWZ0ZXIpKSB8fCBmb3VuZDtcclxuXHJcbiAgcmV0dXJuIGZvdW5kO1xyXG59IiwgImltcG9ydCAqIGFzIGNvbXBsZXhGaW5kZXIgZnJvbSBcIi4vcmF3L2NvbXBsZXgtZmluZGVyLmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgX19jYWNoZV9fOiB7fSxcclxuICBnZXQgcmVxdWlyZSgpIHtcclxuICAgIGlmICh0aGlzLl9fY2FjaGVfXy5yZXF1aXJlKSByZXR1cm4gdGhpcy5fX2NhY2hlX18ucmVxdWlyZTtcclxuICAgIGxldCByZXFJZCA9IGBBY29yZFdlYnBhY2tNb2R1bGVzJHtEYXRlLm5vdygpfWA7XHJcbiAgICBjb25zdCByZXEgPSB3aW5kb3cud2VicGFja0NodW5rZGlzY29yZF9hcHAucHVzaChbW3JlcUlkXSwge30sIHJlcSA9PiByZXFdKTtcclxuICAgIGRlbGV0ZSByZXEubVtyZXFJZF07XHJcbiAgICBkZWxldGUgcmVxLmNbcmVxSWRdO1xyXG4gICAgd2luZG93LndlYnBhY2tDaHVua2Rpc2NvcmRfYXBwLnBvcCgpO1xyXG4gICAgdGhpcy5fX2NhY2hlX18ucmVxdWlyZSA9IHJlcTtcclxuICAgIHJldHVybiByZXE7XHJcbiAgfSxcclxuICBmaW5kKGZpbHRlciwgY29uZmlnID0ge30pIHtcclxuICAgIHJldHVybiBjb21wbGV4RmluZGVyLmZpbmQodGhpcy5yZXF1aXJlLCBjb21wbGV4RmluZGVyLndyYXBGaWx0ZXIoZmlsdGVyKSwgY29uZmlnKTtcclxuICB9LFxyXG4gIGxhenlGaW5kKGZpbHRlciwgY29uZmlnID0ge30pIHtcclxuICAgIHJldHVybiBjb21wbGV4RmluZGVyLmxhenlGaW5kKGNvbXBsZXhGaW5kZXIud3JhcEZpbHRlcihmaWx0ZXIpLCBjb25maWcpO1xyXG4gIH0sXHJcbiAgbGF6eUZpbmRCeUZpbmRlcihmaW5kZXIpIHtcclxuICAgIHJldHVybiBjb21wbGV4RmluZGVyLmxhenlGaW5kQnlGaW5kZXIoZmluZGVyKTtcclxuICB9LFxyXG4gIGZpbHRlcihmaWx0ZXIsIGNvbmZpZyA9IHt9KSB7XHJcbiAgICByZXR1cm4gY29tcGxleEZpbmRlci5maW5kKHRoaXMucmVxdWlyZSwgY29tcGxleEZpbmRlci53cmFwRmlsdGVyKGZpbHRlciksIHsgLi4uY29uZmlnLCBhbGw6IHRydWUgfSk7XHJcbiAgfSxcclxuICBmaW5kQnlGaW5kZXIoZmluZGVyKSB7XHJcbiAgICByZXR1cm4gY29tcGxleEZpbmRlci5maW5kQnlGaW5kZXIodGhpcy5yZXF1aXJlLCBmaW5kZXIpO1xyXG4gIH0sXHJcbiAgZmluZEJ5UHJvcGVydGllcyguLi5wcm9wcykge1xyXG4gICAgcmV0dXJuIHRoaXMuZmluZEJ5RmluZGVyKHtcclxuICAgICAgZmlsdGVyOiB7XHJcbiAgICAgICAgZXhwb3J0OiBmYWxzZSxcclxuICAgICAgICBpbjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgYnk6IFtwcm9wc11cclxuICAgICAgfSxcclxuICAgICAgcGF0aDoge1xyXG4gICAgICAgIGJlZm9yZTogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9LFxyXG4gIGZpbmRCeVByb3RvdHlwZXMoLi4ucHJvcHMpIHtcclxuICAgIHJldHVybiB0aGlzLmZpbmRCeUZpbmRlcih7XHJcbiAgICAgIGZpbHRlcjoge1xyXG4gICAgICAgIGV4cG9ydDogZmFsc2UsXHJcbiAgICAgICAgaW46IFwicHJvdG90eXBlc1wiLFxyXG4gICAgICAgIGJ5OiBbcHJvcHNdXHJcbiAgICAgIH0sXHJcbiAgICAgIHBhdGg6IHtcclxuICAgICAgICBiZWZvcmU6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSxcclxuICBmaW5kQnlTdHJpbmdzKC4uLnByb3BzKSB7XHJcbiAgICByZXR1cm4gdGhpcy5maW5kQnlGaW5kZXIoe1xyXG4gICAgICBmaWx0ZXI6IHtcclxuICAgICAgICBleHBvcnQ6IGZhbHNlLFxyXG4gICAgICAgIGluOiBcInN0cmluZ3NcIixcclxuICAgICAgICBieTogW3Byb3BzXVxyXG4gICAgICB9LFxyXG4gICAgICBwYXRoOiB7XHJcbiAgICAgICAgYmVmb3JlOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0sXHJcbn07IiwgImltcG9ydCBjb21tb25EYXRhIGZyb20gJy4uLy4uL2RhdGEvY29tbW9uLmpzb24nO1xyXG5pbXBvcnQgd2VicGFjayBmcm9tICcuL3dlYnBhY2suanMnO1xyXG5cclxuXHJcbmZ1bmN0aW9uIG1hcE9iamVjdCh0ZW1wLCBpbnApIHtcclxuICBpZiAoIXRlbXA/Ll9fY2FjaGVfXykgdGVtcC5fX2NhY2hlX18gPSB7fTtcclxuICBmb3IgKGNvbnN0IGtleSBpbiBpbnApIHtcclxuICAgIGlmIChpbnA/LltrZXldPy5fXyA9PT0gdHJ1ZSkge1xyXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGVtcCwga2V5LCB7XHJcbiAgICAgICAgZ2V0KCkge1xyXG4gICAgICAgICAgaWYgKHRlbXAuX19jYWNoZV9fW2tleV0pIHJldHVybiB0ZW1wLl9fY2FjaGVfX1trZXldO1xyXG4gICAgICAgICAgcmV0dXJuIHRlbXAuX19jYWNoZV9fW2tleV0gPSB3ZWJwYWNrLmZpbmRCeUZpbmRlcihpbnBba2V5XSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKHR5cGVvZiB0ZW1wW2tleV0gPT09IFwidW5kZWZpbmVkXCIpIHRlbXBba2V5XSA9IHt9O1xyXG4gICAgICBtYXBPYmplY3QodGVtcFtrZXldLCBpbnBba2V5XSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5cclxubGV0IGNvbW1vbiA9IHtcclxuICBfX2NhY2hlX186IHt9LFxyXG4gIExheWVyQWN0aW9uczoge1xyXG4gICAgcHVzaChjb21wb25lbnQpIHtcclxuICAgICAgY29tbW9uLkZsdXhEaXNwYXRjaGVyLmRpc3BhdGNoKHtcclxuICAgICAgICB0eXBlOiBcIkxBWUVSX1BVU0hcIixcclxuICAgICAgICBjb21wb25lbnRcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgcG9wKCkge1xyXG4gICAgICBjb21tb24uRmx1eERpc3BhdGNoZXIuZGlzcGF0Y2goe1xyXG4gICAgICAgIHR5cGU6IFwiTEFZRVJfUE9QXCJcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgcG9wQWxsKCkge1xyXG4gICAgICBjb21tb24uRmx1eERpc3BhdGNoZXIuZGlzcGF0Y2goe1xyXG4gICAgICAgIHR5cGU6IFwiTEFZRVJfUE9QX0FMTFwiXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0sXHJcbn07XHJcbm1hcE9iamVjdChjb21tb24sIGNvbW1vbkRhdGEuY29tbW9uKTtcclxue1xyXG4gIGxldCBwYXRocyA9IFtcclxuICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICBcImV4cG9ydHMuWlBcIixcclxuICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICBcImV4cG9ydHNcIlxyXG4gIF07XHJcbiAgd2VicGFjay5maWx0ZXIoKGkpID0+IGk/LmdldE5hbWU/LigpPy5lbmRzV2l0aD8uKFwiU3RvcmVcIiksIHsgZGVmYXVsdEV4cG9ydDogZmFsc2UgfSkuZm9yRWFjaCgobSkgPT4ge1xyXG4gICAgbGV0IG9iaiA9IHBhdGhzLm1hcChwYXRoID0+IF8uZ2V0KG0sIHBhdGgpKS5maW5kKGkgPT4gaSk7XHJcbiAgICBpZiAoIW9iaikgcmV0dXJuO1xyXG4gICAgbGV0IG5hbWUgPSBvYmo/LmdldE5hbWU/LigpO1xyXG4gICAgaWYgKCFuYW1lKSByZXR1cm47XHJcbiAgICBpZiAoY29tbW9uW25hbWVdKSByZXR1cm47XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvbW1vbiwgbmFtZSwge1xyXG4gICAgICBnZXQoKSB7XHJcbiAgICAgICAgaWYgKGNvbW1vbi5fX2NhY2hlX19bbmFtZV0pIHJldHVybiBjb21tb24uX19jYWNoZV9fW25hbWVdO1xyXG4gICAgICAgIHJldHVybiBjb21tb24uX19jYWNoZV9fW25hbWVdID0gb2JqO1xyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbW1vbjsiLCAiaW1wb3J0IGNvbW1vbiBmcm9tIFwiLi9jb21tb24uanNcIjtcclxuaW1wb3J0IHdlYnBhY2sgZnJvbSBcIi4vd2VicGFjay5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGNvbW1vbixcclxuICB3ZWJwYWNrLFxyXG4gIHJlcXVpcmU6IGdsb2JhbFRoaXNbXCI8UFJFTE9BRF9LRVk+XCJdLnJlcXVpcmUsXHJcbiAgbmF0aXZlOiBEaXNjb3JkTmF0aXZlLFxyXG59IiwgImltcG9ydCBtb2R1bGVzIGZyb20gXCIuLi9hcGkvbW9kdWxlcy9pbmRleC5qc1wiO1xyXG5cclxubGV0IGlzQ29ubmVjdGlvbk9wZW4gPSBmYWxzZTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB3YWl0VW50aWxDb25uZWN0aW9uT3BlbigpIHtcclxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuICAgIGlmIChpc0Nvbm5lY3Rpb25PcGVuKSByZXR1cm4gcmVzb2x2ZSh0cnVlKTtcclxuICAgIGZ1bmN0aW9uIG9uRXZlbnQoKSB7XHJcbiAgICAgIG1vZHVsZXMuY29tbW9uLkZsdXhEaXNwYXRjaGVyLnVuc3Vic2NyaWJlKFwiQ09OTkVDVElPTl9PUEVOXCIsIG9uRXZlbnQpO1xyXG4gICAgICBpc0Nvbm5lY3Rpb25PcGVuID0gdHJ1ZTtcclxuICAgICAgcmVzb2x2ZSh0cnVlKTtcclxuICAgIH1cclxuICAgIG1vZHVsZXMuY29tbW9uLkZsdXhEaXNwYXRjaGVyLnN1YnNjcmliZShcIkNPTk5FQ1RJT05fT1BFTlwiLCBvbkV2ZW50KTtcclxuICB9KTtcclxufSIsICJleHBvcnQgY2xhc3MgQmFzaWNFdmVudEVtaXR0ZXIge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgLyoqIEB0eXBlIHtNYXA8c3RyaW5nLCBNYXA8KC4uLmFyZ3M6IGFueVtdKT0+dm9pZCwge29uY2U6IGJvb2xlYW59Pj59ICovXHJcbiAgICB0aGlzLmxpc3RlbmVycyA9IG5ldyBNYXAoKTtcclxuICB9XHJcblxyXG4gIF9wcmVwYXJlTGlzdGVuZXJzTWFwKGV2ZW50TmFtZSkge1xyXG4gICAgaWYgKCF0aGlzLmxpc3RlbmVycy5oYXMoZXZlbnROYW1lKSlcclxuICAgICAgdGhpcy5saXN0ZW5lcnMuc2V0KGV2ZW50TmFtZSwgbmV3IE1hcCgpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudE5hbWVcclxuICAgKiBAcGFyYW0geyguLi5hcmdzOiBhbnlbXSk9PnZvaWR9IGxpc3RlbmVyXHJcbiAgICovXHJcbiAgb24oZXZlbnROYW1lLCBsaXN0ZW5lcikge1xyXG4gICAgdGhpcy5fcHJlcGFyZUxpc3RlbmVyc01hcChldmVudE5hbWUpO1xyXG4gICAgdGhpcy5saXN0ZW5lcnMuZ2V0KGV2ZW50TmFtZSkuc2V0KGxpc3RlbmVyLCB7IG9uY2U6IGZhbHNlIH0pO1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgdGhpcy5saXN0ZW5lcnMuZ2V0KGV2ZW50TmFtZSkuZGVsZXRlKGxpc3RlbmVyKTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnROYW1lXHJcbiAgICogQHBhcmFtIHsoLi4uYXJnczogYW55W10pPT52b2lkfSBsaXN0ZW5lclxyXG4gICAqL1xyXG4gIG9uY2UoZXZlbnROYW1lLCBsaXN0ZW5lcikge1xyXG4gICAgdGhpcy5fcHJlcGFyZUxpc3RlbmVyc01hcChldmVudE5hbWUpO1xyXG4gICAgdGhpcy5saXN0ZW5lcnMuZ2V0KGV2ZW50TmFtZSk/LnNldChsaXN0ZW5lciwgeyBvbmNlOiB0cnVlIH0pO1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgdGhpcy5saXN0ZW5lcnMuZ2V0KGV2ZW50TmFtZSkuZGVsZXRlKGxpc3RlbmVyKTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge3N0cmluZz99IGV2ZW50TmFtZVxyXG4gICAqIEBwYXJhbSB7KCguLi5hcmdzOiBhbnlbXSk9PnZvaWQpP30gbGlzdGVuZXJcclxuICAgKi9cclxuICBvZmYoZXZlbnROYW1lLCBsaXN0ZW5lcikge1xyXG4gICAgaWYgKCFldmVudE5hbWUpIHJldHVybiAodGhpcy5saXN0ZW5lcnMgPSBuZXcgTWFwKCkpO1xyXG4gICAgaWYgKCFsaXN0ZW5lcikgcmV0dXJuIHRoaXMubGlzdGVuZXJzPy5kZWxldGUoZXZlbnROYW1lKTtcclxuICAgIHRoaXMubGlzdGVuZXJzLmdldChldmVudE5hbWUpPy5kZWxldGUobGlzdGVuZXIpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50TmFtZVxyXG4gICAqIEBwYXJhbSAgey4uLmFueX0gYXJnc1xyXG4gICAqL1xyXG4gIGVtaXQoZXZlbnROYW1lLCAuLi5hcmdzKSB7XHJcbiAgICBpZiAoIXRoaXMubGlzdGVuZXJzLmhhcyhldmVudE5hbWUpKSByZXR1cm47XHJcbiAgICBsZXQgZXZlbnRNYXAgPSB0aGlzLmxpc3RlbmVycy5nZXQoZXZlbnROYW1lKTtcclxuICAgIGV2ZW50TWFwLmZvckVhY2goKHsgb25jZSB9LCBsaXN0ZW5lcikgPT4ge1xyXG4gICAgICBpZiAob25jZSkgZXZlbnRNYXA/LmRlbGV0ZShsaXN0ZW5lcik7XHJcbiAgICAgIGxpc3RlbmVyKC4uLmFyZ3MpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59O1xyXG4iLCAiaW1wb3J0IHsgQmFzaWNFdmVudEVtaXR0ZXIgfSBmcm9tIFwiLi4vLi4vbGliL0Jhc2ljRXZlbnRFbWl0dGVyLmpzXCI7XHJcblxyXG5jb25zdCBldmVudHMgPSBuZXcgQmFzaWNFdmVudEVtaXR0ZXIoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGV2ZW50czsiLCAiaW1wb3J0IGV2ZW50cyBmcm9tIFwiLi4vZXZlbnRzXCI7XHJcbmltcG9ydCB3ZWJwYWNrIGZyb20gXCIuLi9tb2R1bGVzL3dlYnBhY2suanNcIjtcclxuXHJcbmNvbnN0IHNjcm9sbGJhckNsYXNzZXMgPSB3ZWJwYWNrLmZpbmRCeVByb3BlcnRpZXMoXCJzY3JvbGxiYXJHaG9zdEhhaXJsaW5lXCIsIFwic3Bpbm5lclwiKTtcclxuXHJcbmNvbnN0IGZvcm1hdFJlZ2V4ZXMgPSB7XHJcbiAgYm9sZDogL1xcKlxcKihbXipdKylcXCpcXCovZyxcclxuICBpdGFsaWM6IC9cXCooW14qXSspXFwqL2csXHJcbiAgdW5kZXJsaW5lOiAvXFxfKFteKl0rKVxcXy9nLFxyXG4gIHN0cmlrZTogL1xcflxcfihbXipdKylcXH5cXH4vZyxcclxuICB1cmw6IC8oXFxiKGh0dHBzP3xmdHB8ZmlsZSk6XFwvXFwvWy1BLVowLTkrJkAjXFwvJT89fl98ITosLjtdKlstQS1aMC05KyZAI1xcLyU9fl98XSkvaWcsXHJcbiAgaW5saW5lOiAvXFxgKFteKl0rKVxcYC9nLFxyXG4gIGNvZGVibG9ja1NpbmdsZTogL1xcYFxcYFxcYChbXipdKylcXGBcXGBcXGAvZyxcclxuICBjb2RlYmxvY2tNdWx0aTogL1xcYFxcYFxcYChcXHcrKVxcbigoPzooPyFcXGBcXGBcXGApW1xcc1xcU10pKilcXGBcXGBcXGAvZ1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIHBhcnNlKGh0bWwpIHtcclxuICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgZGl2LmlubmVySFRNTCA9IGh0bWw7XHJcbiAgICByZXR1cm4gZGl2LmZpcnN0RWxlbWVudENoaWxkO1xyXG4gIH0sXHJcbiAgdG9DU1NQcm9wKG8pIHtcclxuICAgIGxldCBlbG0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgT2JqZWN0LmVudHJpZXMobykuZm9yRWFjaCgoaSkgPT4ge1xyXG4gICAgICBpZiAoZWxtLnN0eWxlLmhhc093blByb3BlcnR5KGlbMF0pKSB7XHJcbiAgICAgICAgZWxtLnN0eWxlW2lbMF1dID0gaVsxXTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBlbG0uc3R5bGUuc2V0UHJvcGVydHkoaVswXSwgaVsxXSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGVsbS5nZXRBdHRyaWJ1dGUoXCJzdHlsZVwiKTtcclxuICB9LFxyXG4gIHRvSFRNTFByb3BzKG8pIHtcclxuICAgIHJldHVybiBPYmplY3QuZW50cmllcyhvKVxyXG4gICAgICAubWFwKFxyXG4gICAgICAgIChpKSA9PlxyXG4gICAgICAgICAgYCR7aVswXS5yZXBsYWNlKC8gKy8sIFwiLVwiKX09XCIke2lbMF0gPT0gXCJzdHlsZVwiICYmIHR5cGVvZiBpWzFdICE9IFwic3RyaW5nXCJcclxuICAgICAgICAgICAgPyB0aGlzLnRvQ1NTUHJvcChpWzFdKVxyXG4gICAgICAgICAgICA6IHRoaXMuZXNjYXBlSFRNTChpWzFdKX1cImBcclxuICAgICAgKVxyXG4gICAgICAuam9pbihcIiBcIik7XHJcbiAgfSxcclxuICBlc2NhcGUoaHRtbCkge1xyXG4gICAgcmV0dXJuIG5ldyBPcHRpb24oaHRtbCkuaW5uZXJIVE1MO1xyXG4gIH0sXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtFbGVtZW50fSBlbG0gXHJcbiAgICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBzZWxlY3Rvck9yTnVtYmVyIFxyXG4gICAqIEByZXR1cm5zIHtFbGVtZW50W119XHJcbiAgICovXHJcbiAgcGFyZW50cyhlbG0sIHNlbGVjdG9yT3JOdW1iZXIpIHtcclxuICAgIGxldCBwYXJlbnRzID0gW107XHJcbiAgICBpZiAodHlwZW9mIHNlbGVjdG9yT3JOdW1iZXIgPT09IFwibnVtYmVyXCIpIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWxlY3Rvck9yTnVtYmVyOyBpKyspIHtcclxuICAgICAgICBpZiAoZWxtLnBhcmVudEVsZW1lbnQpIHtcclxuICAgICAgICAgIGVsbSA9IGVsbS5wYXJlbnRFbGVtZW50O1xyXG4gICAgICAgICAgcGFyZW50cy5wdXNoKGVsbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB3aGlsZSAoZWxtLnBhcmVudEVsZW1lbnQgJiYgZWxtLnBhcmVudEVsZW1lbnQuY2xvc2VzdChzZWxlY3Rvck9yTnVtYmVyKSkge1xyXG4gICAgICAgIGVsbSA9IGVsbS5wYXJlbnRFbGVtZW50LmNsb3Nlc3Qoc2VsZWN0b3JPck51bWJlcik7XHJcbiAgICAgICAgcGFyZW50cy5wdXNoKGVsbSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBwYXJlbnRzO1xyXG4gIH0sXHJcbiAgcGF0Y2g6IChzZWxlY3RvciwgY2IpID0+XHJcbiAgICAoKCkgPT4ge1xyXG4gICAgICBmdW5jdGlvbiBub2RlQWRkZWQobm9kZSkge1xyXG4gICAgICAgIGlmIChub2RlLm5vZGVUeXBlID09PSBOb2RlLlRFWFRfTk9ERSkgcmV0dXJuO1xyXG4gICAgICAgIG5vZGUucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikuZm9yRWFjaChhc3luYyAoZWxtKSA9PiB7XHJcbiAgICAgICAgICBpZiAoIWVsbS5hY29yZCkge1xyXG4gICAgICAgICAgICBlbG0uYWNvcmQgPSB7IHVubW91bnQ6IFtdLCBwYXRjaGVkOiBuZXcgU2V0KCkgfTtcclxuICAgICAgICAgICAgZWxtLmNsYXNzTGlzdC5hZGQoXCJhY29yZC0tcGF0Y2hlZFwiKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoZWxtLmFjb3JkLnBhdGNoZWQuaGFzKGNiKSkgcmV0dXJuO1xyXG4gICAgICAgICAgZWxtLmFjb3JkLnBhdGNoZWQuYWRkKGNiKTtcclxuXHJcbiAgICAgICAgICBsZXQgdW5QYXRjaENiID0gYXdhaXQgY2IoZWxtKTtcclxuICAgICAgICAgIGlmICh0eXBlb2YgdW5QYXRjaENiID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgICAgIGVsbS5hY29yZC51bm1vdW50LnB1c2godW5QYXRjaENiKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgZnVuY3Rpb24gbm9kZVJlbW92ZWQobm9kZSkge1xyXG4gICAgICAgIGlmIChub2RlLm5vZGVUeXBlID09PSBOb2RlLlRFWFRfTk9ERSkgcmV0dXJuO1xyXG4gICAgICAgIG5vZGUucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikuZm9yRWFjaChhc3luYyAoZWxtKSA9PiB7XHJcbiAgICAgICAgICBpZiAoIWVsbS5hY29yZCkgcmV0dXJuO1xyXG4gICAgICAgICAgZWxtLmFjb3JkLnVubW91bnQuZm9yRWFjaCgoZikgPT4gZigpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikuZm9yRWFjaChub2RlQWRkZWQpO1xyXG5cclxuICAgICAgcmV0dXJuIGV2ZW50cy5vbihcclxuICAgICAgICBcImRvbS1tdXRhdGlvblwiLFxyXG4gICAgICAgIC8qKiBAcGFyYW0ge011dGF0aW9uUmVjb3JkfSBtdXQgKi8obXV0KSA9PiB7XHJcbiAgICAgICAgICBpZiAobXV0LnR5cGUgPT09IFwiY2hpbGRMaXN0XCIpIHtcclxuICAgICAgICAgICAgbXV0LmFkZGVkTm9kZXMuZm9yRWFjaChub2RlQWRkZWQpO1xyXG4gICAgICAgICAgICBtdXQucmVtb3ZlZE5vZGVzLmZvckVhY2gobm9kZVJlbW92ZWQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgKTtcclxuICAgIH0pKCksXHJcbiAgZm9ybWF0Q29udGVudChtc2cpIHtcclxuICAgIGlmICghbXNnKSByZXR1cm4gJyc7XHJcbiAgICBjb25zdCB7IGJvbGQsIGl0YWxpYywgdW5kZXJsaW5lLCBzdHJpa2UsIGNvZGVibG9ja011bHRpLCBjb2RlYmxvY2tTaW5nbGUsIGlubGluZSwgdXJsIH0gPSBmb3JtYXRSZWdleGVzO1xyXG5cclxuICAgIGNvbnN0IGNvZGVCbG9ja3NNYXAgPSBPYmplY3QuZnJvbUVudHJpZXMoW1xyXG4gICAgICAuLi4obXNnLm1hdGNoQWxsKGNvZGVibG9ja011bHRpKSB8fCBbXSksIC4uLihtc2cubWF0Y2hBbGwoY29kZWJsb2NrU2luZ2xlKSB8fCBbXSlcclxuICAgIF0ubWFwKFxyXG4gICAgICAoW18sIGNvZGVCbG9ja09yQ29kZSwgY29kZUJsb2NrQ29udGVudF0sIGkpID0+IHtcclxuICAgICAgICBtc2cgPSBtc2cucmVwbGFjZShfLCBge3tDT0RFQkxPQ0tfJHtpfX19YCk7XHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgIGB7e0NPREVCTE9DS18ke2l9fX1gLFxyXG4gICAgICAgICAgY29kZUJsb2NrQ29udGVudCA/XHJcbiAgICAgICAgICAgIGA8cHJlPjxjb2RlIGNsYXNzPVwiJHtzY3JvbGxiYXJDbGFzc2VzLnNjcm9sbGJhckdob3N0SGFpcmxpbmV9IGhsanMgJHtjb2RlQmxvY2tPckNvZGV9XCIgc3R5bGU9XCJwb3NpdGlvbjogcmVsYXRpdmU7XCI+JHttb2R1bGVzLmNvbW1vbi5obGpzLmhpZ2hsaWdodChjb2RlQmxvY2tPckNvZGUsIGNvZGVCbG9ja0NvbnRlbnQpLnZhbHVlfTwvY29kZT48L3ByZT5gIDpcclxuICAgICAgICAgICAgYDxwcmU+PGNvZGUgY2xhc3M9XCIke3Njcm9sbGJhckNsYXNzZXMuc2Nyb2xsYmFyR2hvc3RIYWlybGluZX0gaGxqc1wiIHN0eWxlPVwicG9zaXRpb246IHJlbGF0aXZlO1wiPiR7Y29kZUJsb2NrT3JDb2RlfTwvY29kZT48L3ByZT5gXHJcbiAgICAgICAgXTtcclxuICAgICAgfVxyXG4gICAgKSk7XHJcblxyXG4gICAgY29uc3QgaW5saW5lTWFwID0gT2JqZWN0LmZyb21FbnRyaWVzKFxyXG4gICAgICBbLi4uKG1zZy5tYXRjaEFsbChpbmxpbmUpIHx8IFtdKV0ubWFwKFxyXG4gICAgICAgIChbXywgaW5saW5lQ29udGVudF0sIGkpID0+IHtcclxuICAgICAgICAgIG1zZyA9IG1zZy5yZXBsYWNlKF8sIGB7e0lOTElORV8ke2l9fX1gKTtcclxuICAgICAgICAgIHJldHVybiBbYHt7SU5MSU5FXyR7aX19fWAsIGA8Y29kZSBjbGFzcz1cImlubGluZVwiPiR7aW5saW5lQ29udGVudH08L2NvZGU+YF07XHJcbiAgICAgICAgfVxyXG4gICAgICApXHJcbiAgICApO1xyXG5cclxuICAgIG1zZyA9IG1zZy5yZXBsYWNlKGJvbGQsIFwiPGI+JDE8L2I+XCIpXHJcbiAgICAgIC5yZXBsYWNlKGl0YWxpYywgXCI8aT4kMTwvaT5cIilcclxuICAgICAgLnJlcGxhY2UodW5kZXJsaW5lLCBcIjxVPiQxPC9VPlwiKVxyXG4gICAgICAucmVwbGFjZShzdHJpa2UsIFwiPHM+JDE8L3M+XCIpXHJcbiAgICAgIC5yZXBsYWNlKHVybCwgJzxhIGhyZWY9XCIkMVwiPiQxPC9hPicpO1xyXG5cclxuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKGNvZGVCbG9ja3NNYXApKSB7XHJcbiAgICAgIG1zZyA9IG1zZy5yZXBsYWNlKGtleSwgdmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKGlubGluZU1hcCkpIHtcclxuICAgICAgbXNnID0gbXNnLnJlcGxhY2Uoa2V5LCB2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG1zZztcclxuICB9LFxyXG4gIHJlc29sdmUoaHRtbE9yRWxtKSB7XHJcbiAgICBpZiAoaHRtbE9yRWxtIGluc3RhbmNlb2YgRWxlbWVudCkgcmV0dXJuIGh0bWxPckVsbTtcclxuICAgIHJldHVybiB0aGlzLnBhcnNlKGh0bWxPckVsbSk7XHJcbiAgfVxyXG59XHJcblxyXG57XHJcbiAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigobXV0YXRpb25zKSA9PiB7XHJcbiAgICBtdXRhdGlvbnMuZm9yRWFjaCgobXV0YXRpb24pID0+IHtcclxuICAgICAgZXZlbnRzLmVtaXQoXCJkb20tbXV0YXRpb25cIiwgbXV0YXRpb24pO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbiAgb2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudCwge1xyXG4gICAgYXR0cmlidXRlczogdHJ1ZSxcclxuICAgIGNoaWxkTGlzdDogdHJ1ZSxcclxuICAgIHN1YnRyZWU6IHRydWVcclxuICB9KTtcclxufSIsICIvLyB3ZSB1c2UgdGhpcyBhcnJheSBtdWx0aXBsZSB0aW1lc1xyXG5leHBvcnQgY29uc3QgcGF0Y2hUeXBlcyA9IFtcImFcIiwgXCJiXCIsIFwiaVwiXTtcclxuZXhwb3J0IGNvbnN0IHBhdGNoZWRPYmplY3RzID0gbmV3IE1hcCgpO1xyXG4iLCAiLy8gY2FsbHMgcmVsZXZhbnQgcGF0Y2hlcyBhbmQgcmV0dXJucyB0aGUgZmluYWwgcmVzdWx0XHJcbmltcG9ydCB7IHBhdGNoZWRPYmplY3RzIH0gZnJvbSBcIi4vc2hhcmVkLmpzXCI7XHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChmdW5jTmFtZSwgZnVuY1BhcmVudCwgZnVuY0FyZ3MsIFxyXG4vLyB0aGUgdmFsdWUgb2YgYHRoaXNgIHRvIGFwcGx5XHJcbmN0eHQsIFxyXG4vLyBpZiB0cnVlLCB0aGUgZnVuY3Rpb24gaXMgYWN0dWFsbHkgY29uc3RydWN0b3JcclxuaXNDb25zdHJ1Y3QpIHtcclxuICAgIGNvbnN0IHBhdGNoID0gcGF0Y2hlZE9iamVjdHMuZ2V0KGZ1bmNQYXJlbnQpPy5bZnVuY05hbWVdO1xyXG4gICAgLy8gVGhpcyBpcyBpbiB0aGUgZXZlbnQgdGhhdCB0aGlzIGZ1bmN0aW9uIGlzIGJlaW5nIGNhbGxlZCBhZnRlciBhbGwgcGF0Y2hlcyBhcmUgcmVtb3ZlZC5cclxuICAgIGlmICghcGF0Y2gpXHJcbiAgICAgICAgcmV0dXJuIGlzQ29uc3RydWN0XHJcbiAgICAgICAgICAgID8gUmVmbGVjdC5jb25zdHJ1Y3QoZnVuY1BhcmVudFtmdW5jTmFtZV0sIGZ1bmNBcmdzLCBjdHh0KVxyXG4gICAgICAgICAgICA6IGZ1bmNQYXJlbnRbZnVuY05hbWVdLmFwcGx5KGN0eHQsIGZ1bmNBcmdzKTtcclxuICAgIC8vIEJlZm9yZSBwYXRjaGVzXHJcbiAgICBmb3IgKGNvbnN0IGhvb2sgb2YgcGF0Y2guYi52YWx1ZXMoKSkge1xyXG4gICAgICAgIGNvbnN0IG1heWJlZnVuY0FyZ3MgPSBob29rLmNhbGwoY3R4dCwgZnVuY0FyZ3MpO1xyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KG1heWJlZnVuY0FyZ3MpKVxyXG4gICAgICAgICAgICBmdW5jQXJncyA9IG1heWJlZnVuY0FyZ3M7XHJcbiAgICB9XHJcbiAgICAvLyBJbnN0ZWFkIHBhdGNoZXNcclxuICAgIGxldCBpbnN0ZWFkUGF0Y2hlZEZ1bmMgPSAoLi4uYXJncykgPT4gaXNDb25zdHJ1Y3RcclxuICAgICAgICA/IFJlZmxlY3QuY29uc3RydWN0KHBhdGNoLm8sIGFyZ3MsIGN0eHQpXHJcbiAgICAgICAgOiBwYXRjaC5vLmFwcGx5KGN0eHQsIGFyZ3MpO1xyXG4gICAgZm9yIChjb25zdCBjYWxsYmFjayBvZiBwYXRjaC5pLnZhbHVlcygpKSB7XHJcbiAgICAgICAgY29uc3Qgb2xkUGF0Y2hGdW5jID0gaW5zdGVhZFBhdGNoZWRGdW5jO1xyXG4gICAgICAgIGluc3RlYWRQYXRjaGVkRnVuYyA9ICguLi5hcmdzKSA9PiBjYWxsYmFjay5jYWxsKGN0eHQsIGFyZ3MsIG9sZFBhdGNoRnVuYyk7XHJcbiAgICB9XHJcbiAgICBsZXQgd29ya2luZ1JldFZhbCA9IGluc3RlYWRQYXRjaGVkRnVuYyguLi5mdW5jQXJncyk7XHJcbiAgICAvLyBBZnRlciBwYXRjaGVzXHJcbiAgICBmb3IgKGNvbnN0IGhvb2sgb2YgcGF0Y2guYS52YWx1ZXMoKSlcclxuICAgICAgICB3b3JraW5nUmV0VmFsID0gaG9vay5jYWxsKGN0eHQsIGZ1bmNBcmdzLCB3b3JraW5nUmV0VmFsKSA/PyB3b3JraW5nUmV0VmFsO1xyXG4gICAgcmV0dXJuIHdvcmtpbmdSZXRWYWw7XHJcbn1cclxuIiwgImltcG9ydCB7IHBhdGNoZWRPYmplY3RzLCBwYXRjaFR5cGVzIH0gZnJvbSBcIi4vc2hhcmVkLmpzXCI7XHJcbmV4cG9ydCBmdW5jdGlvbiB1blBhdGNoKGZ1bmNQYXJlbnQsIGZ1bmNOYW1lLCBob29rSWQsIHR5cGUpIHtcclxuICAgIGNvbnN0IHBhdGNoZWRPYmplY3QgPSBwYXRjaGVkT2JqZWN0cy5nZXQoZnVuY1BhcmVudCk7XHJcbiAgICBjb25zdCBwYXRjaCA9IHBhdGNoZWRPYmplY3Q/LltmdW5jTmFtZV07XHJcbiAgICBpZiAoIXBhdGNoPy5bdHlwZV0uaGFzKGhvb2tJZCkpXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgcGF0Y2hbdHlwZV0uZGVsZXRlKGhvb2tJZCk7XHJcbiAgICAvLyBJZiB0aGVyZSBhcmUgbm8gbW9yZSBob29rcyBmb3IgZXZlcnkgdHlwZSwgcmVtb3ZlIHRoZSBwYXRjaFxyXG4gICAgaWYgKHBhdGNoVHlwZXMuZXZlcnkoKHQpID0+IHBhdGNoW3RdLnNpemUgPT09IDApKSB7XHJcbiAgICAgICAgLy8gcmVmbGVjdCBkZWZpbmVwcm9wZXJ0eSBpcyBsaWtlIG9iamVjdCBkZWZpbmVwcm9wZXJ0eVxyXG4gICAgICAgIC8vIGJ1dCBpbnN0ZWFkIG9mIGVycm9yaW5nIGl0IHJldHVybnMgaWYgaXQgd29ya2VkIG9yIG5vdC5cclxuICAgICAgICAvLyB0aGlzIGlzIG1vcmUgZWFzaWx5IG1pbmlmaWFibGUsIGhlbmNlIGl0cyB1c2UuIC0tIHNpbmtcclxuICAgICAgICBjb25zdCBzdWNjZXNzID0gUmVmbGVjdC5kZWZpbmVQcm9wZXJ0eShmdW5jUGFyZW50LCBmdW5jTmFtZSwge1xyXG4gICAgICAgICAgICB2YWx1ZTogcGF0Y2gubyxcclxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoIXN1Y2Nlc3MpXHJcbiAgICAgICAgICAgIGZ1bmNQYXJlbnRbZnVuY05hbWVdID0gcGF0Y2gubztcclxuICAgICAgICBkZWxldGUgcGF0Y2hlZE9iamVjdFtmdW5jTmFtZV07XHJcbiAgICB9XHJcbiAgICBpZiAoT2JqZWN0LmtleXMocGF0Y2hlZE9iamVjdCkubGVuZ3RoID09IDApXHJcbiAgICAgICAgcGF0Y2hlZE9iamVjdHMuZGVsZXRlKGZ1bmNQYXJlbnQpO1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHVuUGF0Y2hBbGwoKSB7XHJcbiAgICBmb3IgKGNvbnN0IFtwYXJlbnRPYmplY3QsIHBhdGNoZWRPYmplY3RdIG9mIHBhdGNoZWRPYmplY3RzLmVudHJpZXMoKSlcclxuICAgICAgICBmb3IgKGNvbnN0IGZ1bmNOYW1lIGluIHBhdGNoZWRPYmplY3QpXHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgaG9va1R5cGUgb2YgcGF0Y2hUeXBlcylcclxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaG9va0lkIG9mIHBhdGNoZWRPYmplY3RbZnVuY05hbWVdPy5baG9va1R5cGVdLmtleXMoKSA/PyBbXSlcclxuICAgICAgICAgICAgICAgICAgICB1blBhdGNoKHBhcmVudE9iamVjdCwgZnVuY05hbWUsIGhvb2tJZCwgaG9va1R5cGUpO1xyXG59XHJcbiIsICIvLyBjdXJyaWVkIC0gZ2V0UGF0Y2hGdW5jKFwiYmVmb3JlXCIpKC4uLilcclxuLy8gYWxsb3dzIHVzIHRvIGFwcGx5IGFuIGFyZ3VtZW50IHdoaWxlIGxlYXZpbmcgdGhlIHJlc3Qgb3BlbiBtdWNoIGNsZWFuZXIuXHJcbi8vIGZ1bmN0aW9uYWwgcHJvZ3JhbW1pbmcgc3RyaWtlcyBhZ2FpbiEgLS0gc2lua1xyXG5pbXBvcnQgaG9vayBmcm9tIFwiLi9ob29rLmpzXCI7XHJcbmltcG9ydCB7IHBhdGNoZWRPYmplY3RzIH0gZnJvbSBcIi4vc2hhcmVkLmpzXCI7XHJcbmltcG9ydCB7IHVuUGF0Y2ggfSBmcm9tIFwiLi91bi1wYXRjaC5qc1wiO1xyXG4vLyBjcmVhdGVzIGEgaG9vayBpZiBuZWVkZWQsIGVsc2UganVzdCBhZGRzIG9uZSB0byB0aGUgcGF0Y2hlcyBhcnJheVxyXG5leHBvcnQgZGVmYXVsdCAocGF0Y2hUeXBlKSA9PiAoZnVuY05hbWUsIGZ1bmNQYXJlbnQsIGNhbGxiYWNrLCBvbmVUaW1lID0gZmFsc2UpID0+IHtcclxuICAgIGlmICh0eXBlb2YgZnVuY1BhcmVudFtmdW5jTmFtZV0gIT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7ZnVuY05hbWV9IGlzIG5vdCBhIGZ1bmN0aW9uIGluICR7ZnVuY1BhcmVudC5jb25zdHJ1Y3Rvci5uYW1lfWApO1xyXG4gICAgaWYgKCFwYXRjaGVkT2JqZWN0cy5oYXMoZnVuY1BhcmVudCkpXHJcbiAgICAgICAgcGF0Y2hlZE9iamVjdHMuc2V0KGZ1bmNQYXJlbnQsIHt9KTtcclxuICAgIGNvbnN0IHBhcmVudEluamVjdGlvbnMgPSBwYXRjaGVkT2JqZWN0cy5nZXQoZnVuY1BhcmVudCk7XHJcbiAgICBpZiAoIXBhcmVudEluamVjdGlvbnNbZnVuY05hbWVdKSB7XHJcbiAgICAgICAgY29uc3Qgb3JpZ0Z1bmMgPSBmdW5jUGFyZW50W2Z1bmNOYW1lXTtcclxuICAgICAgICAvLyBub3RlIHRvIGZ1dHVyZSBtZSBvcHRpbWlzaW5nIGZvciBzaXplOiBleHRyYWN0aW5nIG5ldyBNYXAoKSB0byBhIGZ1bmMgaW5jcmVhc2VzIHNpemUgLS1zaW5rXHJcbiAgICAgICAgcGFyZW50SW5qZWN0aW9uc1tmdW5jTmFtZV0gPSB7XHJcbiAgICAgICAgICAgIG86IG9yaWdGdW5jLFxyXG4gICAgICAgICAgICBiOiBuZXcgTWFwKCksXHJcbiAgICAgICAgICAgIGk6IG5ldyBNYXAoKSxcclxuICAgICAgICAgICAgYTogbmV3IE1hcCgpLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29uc3QgcnVuSG9vayA9IChjdHh0LCBhcmdzLCBjb25zdHJ1Y3QpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcmV0ID0gaG9vayhmdW5jTmFtZSwgZnVuY1BhcmVudCwgYXJncywgY3R4dCwgY29uc3RydWN0KTtcclxuICAgICAgICAgICAgaWYgKG9uZVRpbWUpXHJcbiAgICAgICAgICAgICAgICB1bnBhdGNoVGhpc1BhdGNoKCk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXQ7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCByZXBsYWNlUHJveHkgPSBuZXcgUHJveHkob3JpZ0Z1bmMsIHtcclxuICAgICAgICAgICAgYXBwbHk6IChfLCBjdHh0LCBhcmdzKSA9PiBydW5Ib29rKGN0eHQsIGFyZ3MsIGZhbHNlKSxcclxuICAgICAgICAgICAgY29uc3RydWN0OiAoXywgYXJncykgPT4gcnVuSG9vayhvcmlnRnVuYywgYXJncywgdHJ1ZSksXHJcbiAgICAgICAgICAgIGdldDogKHRhcmdldCwgcHJvcCwgcmVjZWl2ZXIpID0+IHByb3AgPT0gXCJ0b1N0cmluZ1wiXHJcbiAgICAgICAgICAgICAgICA/IG9yaWdGdW5jLnRvU3RyaW5nLmJpbmQob3JpZ0Z1bmMpXHJcbiAgICAgICAgICAgICAgICA6IFJlZmxlY3QuZ2V0KHRhcmdldCwgcHJvcCwgcmVjZWl2ZXIpLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIHRoaXMgd29ya3MgYXJvdW5kIGJyZWFraW5nIHNvbWUgYXN5bmMgZmluZCBpbXBsZW1lbnRhdGlvbiB3aGljaCBsaXN0ZW5zIGZvciBhc3NpZ25zIHZpYSBwcm94eVxyXG4gICAgICAgIC8vIHNlZSBjb21tZW50IGluIHVucGF0Y2gudHNcclxuICAgICAgICBjb25zdCBzdWNjZXNzID0gUmVmbGVjdC5kZWZpbmVQcm9wZXJ0eShmdW5jUGFyZW50LCBmdW5jTmFtZSwge1xyXG4gICAgICAgICAgICB2YWx1ZTogcmVwbGFjZVByb3h5LFxyXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICghc3VjY2VzcylcclxuICAgICAgICAgICAgZnVuY1BhcmVudFtmdW5jTmFtZV0gPSByZXBsYWNlUHJveHk7XHJcbiAgICAgICAgZnVuY1BhcmVudFtmdW5jTmFtZV0uX19vcmlnaW5hbF9fID0gcGFyZW50SW5qZWN0aW9uc1tmdW5jTmFtZV0ubztcclxuICAgIH1cclxuICAgIGNvbnN0IGhvb2tJZCA9IFN5bWJvbCgpO1xyXG4gICAgY29uc3QgdW5wYXRjaFRoaXNQYXRjaCA9ICgpID0+IHVuUGF0Y2goZnVuY1BhcmVudCwgZnVuY05hbWUsIGhvb2tJZCwgcGF0Y2hUeXBlKTtcclxuICAgIHBhcmVudEluamVjdGlvbnNbZnVuY05hbWVdW3BhdGNoVHlwZV0uc2V0KGhvb2tJZCwgY2FsbGJhY2spO1xyXG4gICAgcmV0dXJuIHVucGF0Y2hUaGlzUGF0Y2g7XHJcbn07XHJcbiIsICJpbXBvcnQgZ2V0UGF0Y2hGdW5jIGZyb20gXCIuL2dldC1wYXRjaC1mdW5jLmpzXCI7XHJcbmltcG9ydCB7IHVuUGF0Y2hBbGwgfSBmcm9tIFwiLi91bi1wYXRjaC5qc1wiO1xyXG5pbXBvcnQgeyBwYXRjaGVkT2JqZWN0cyBhcyBwYXRjaGVkIH0gZnJvbSBcIi4vc2hhcmVkLmpzXCI7XHJcbmNvbnN0IGJlZm9yZSA9IGdldFBhdGNoRnVuYyhcImJcIik7XHJcbmNvbnN0IGluc3RlYWQgPSBnZXRQYXRjaEZ1bmMoXCJpXCIpO1xyXG5jb25zdCBhZnRlciA9IGdldFBhdGNoRnVuYyhcImFcIik7XHJcbmV4cG9ydCB7IGluc3RlYWQsIGJlZm9yZSwgYWZ0ZXIsIHVuUGF0Y2hBbGwsIHBhdGNoZWQgfTtcclxuIiwgImltcG9ydCAqIGFzIHNwaXRSb2FzdCBmcm9tIFwiLi4vLi4vbGliL3NwaXRyb2FzdC9kaXN0L2VzbVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIF9fY2FjaGVfXzoge1xyXG4gICAgcGF0Y2hlZDogc3BpdFJvYXN0LnBhdGNoZWQsXHJcbiAgfSxcclxuICBiZWZvcmU6IHNwaXRSb2FzdC5iZWZvcmUsXHJcbiAgYWZ0ZXI6IHNwaXRSb2FzdC5hZnRlcixcclxuICBpbnN0ZWFkOiBzcGl0Um9hc3QuaW5zdGVhZCxcclxuICB1blBhdGNoQWxsOiBzcGl0Um9hc3QudW5QYXRjaEFsbCxcclxuICBpbmplY3RDU1MoY3NzKSB7XHJcbiAgICBjb25zdCBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcclxuICAgIHN0eWxlLmNsYXNzTmFtZSA9IGBhY29yZC0taW5qZWN0ZWQtY3NzYDtcclxuICAgIHN0eWxlLnRleHRDb250ZW50ID0gY3NzO1xyXG4gICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XHJcblxyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgc3R5bGU/LnJlbW92ZSgpO1xyXG4gICAgfTtcclxuICB9LFxyXG4gIHVuUGF0Y2hBbGxDU1MoKSB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmFjb3JkLS1pbmplY3RlZC1jc3NcIikuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgZWxlbWVudC5yZW1vdmUoKTtcclxuICAgIH0pXHJcbiAgfVxyXG59IiwgImV4cG9ydCBkZWZhdWx0IGBcbkBrZXlmcmFtZXMgYWNvcmRMb2FkaW5nRmFkZXswJXtvcGFjaXR5Oi4xfTEwMCV7b3BhY2l0eTouOX19LmFjb3JkLS1zdGFydHVwLWxvYWRpbmd7YW5pbWF0aW9uOmFjb3JkTG9hZGluZ0ZhZGUgLjVzIGFsdGVybmF0ZSBpbmZpbml0ZSBsaW5lYXI7cG9zaXRpb246YWJzb2x1dGU7dHJhbnNpdGlvbjphbGwgLjVzIGxpbmVhcjtyaWdodDo4cHg7Ym90dG9tOjhweDt3aWR0aDoxNnB4O2hlaWdodDoxNnB4O2JhY2tncm91bmQtaW1hZ2U6dXJsKFwiaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL0Fjb3JkUGx1Z2luL2Fzc2V0cy9tYWluL0Fjb3JkLnN2Z1wiKTtmaWx0ZXI6Z3JheXNjYWxlKDEpIGJyaWdodG5lc3MoMSk7YmFja2dyb3VuZC1wb3NpdGlvbjpjZW50ZXI7YmFja2dyb3VuZC1yZXBlYXQ6bm8tcmVwZWF0O2JhY2tncm91bmQtc2l6ZTpjb250YWluO3otaW5kZXg6OTk5OTk5fS5hY29yZC0tc3RhcnR1cC1sb2FkaW5nLmhpZGRlbntvcGFjaXR5OjAgIWltcG9ydGFudH1gO1xuIiwgImltcG9ydCBkb20gZnJvbSBcIi4uLy4uL2FwaS9kb20vaW5kZXguanNcIjtcclxuaW1wb3J0IHBhdGNoZXIgZnJvbSBcIi4uLy4uL2FwaS9wYXRjaGVyL2luZGV4LmpzXCI7XHJcblxyXG5pbXBvcnQgY3NzVGV4dCBmcm9tIFwiLi9zdHlsZS5zY3NzXCI7XHJcbmxldCB1bkluamVjdDtcclxuXHJcbmFzeW5jIGZ1bmN0aW9uIHNob3coKSB7XHJcbiAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWNvcmQtLXN0YXJ0dXAtbG9hZGluZ1wiKSkgcmV0dXJuO1xyXG4gIHdoaWxlICh0cnVlKSB7XHJcbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhcHAtbW91bnRcIikpIGJyZWFrO1xyXG4gICAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgMTAwKSk7XHJcbiAgfVxyXG4gIGNvbnNvbGUubG9nKFwiYWNvcmQtLXN0YXJ0dXAtbG9hZGluZ1wiKTtcclxuICB1bkluamVjdCA9IHBhdGNoZXIuaW5qZWN0Q1NTKGNzc1RleHQpO1xyXG4gIGNvbnN0IGVsZW1lbnQgPSBkb20ucGFyc2UoYFxyXG4gICAgPGRpdiBjbGFzcz1cImFjb3JkLS1zdGFydHVwLWxvYWRpbmdcIj48L2Rpdj5cclxuICBgKVxyXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYXBwLW1vdW50XCIpLmFwcGVuZENoaWxkKGVsZW1lbnQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBoaWRlKCkge1xyXG4gIGxldCBlbG0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFjb3JkLS1zdGFydHVwLWxvYWRpbmdcIik7XHJcbiAgaWYgKGVsbSkge1xyXG4gICAgZWxtLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgZWxtLnJlbW92ZSgpO1xyXG4gICAgICB1bkluamVjdD8uKCk7XHJcbiAgICAgIHVuSW5qZWN0ID0gbnVsbDtcclxuICAgIH0sIDUwMCk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgc2hvdyxcclxuICBoaWRlXHJcbn0iLCAibGV0IGRldk1vZGVFbmFibGVkID0gZmFsc2U7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgZ2V0IGVuYWJsZWQoKSB7XHJcbiAgICByZXR1cm4gZGV2TW9kZUVuYWJsZWQ7XHJcbiAgfSxcclxuICBzZXQgZW5hYmxlZCh2YWx1ZSkge1xyXG4gICAgaWYgKCFnbG9iYWxUaGlzW1wiPFBSRUxPQURfS0VZPlwiXS5pc0RldlRvb2xzT3BlbigpKSB0aHJvdyBuZXcgRXJyb3IoXCJEZXYgbW9kZSBzdGF0dXMgY2FuIG9ubHkgYmUgbW9kaWZpZWQgd2hlbiBEZXZUb29scyBpcyBvcGVuIVwiKTtcclxuICAgIGRldk1vZGVFbmFibGVkID0gdmFsdWU7XHJcbiAgfVxyXG59IiwgImltcG9ydCBtb2R1bGVzIGZyb20gXCIuLi9tb2R1bGVzL2luZGV4LmpzXCJcclxuaW1wb3J0IHV0aWxzIGZyb20gXCIuLi91dGlscy9pbmRleC5qc1wiO1xyXG5cclxuY29uc3QgQkFTRV9VUkwgPSBcImh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9BY29yZFBsdWdpbi9pMThuL21haW5cIjtcclxuY29uc3Qgbm9TdG9yZSA9IHsgY2FjaGU6IFwibm8tc3RvcmVcIiB9O1xyXG5cclxuXHJcbmNvbnN0IG91dCA9IHtcclxuICBfX2NhY2hlX186IHtcclxuICAgIGxvY2FsZUlkczogW10sXHJcbiAgICBsb2NhbGl6YXRpb25zOiB7fVxyXG4gIH0sXHJcbiAgZ2V0IGxvY2FsZSgpIHtcclxuICAgIHJldHVybiBtb2R1bGVzLmNvbW1vbi5pMThuLl9yZXF1ZXN0ZWRMb2NhbGU7XHJcbiAgfSxcclxuICBnZXQoa2V5KSB7XHJcbiAgICBjaGVjaygpO1xyXG4gICAgcmV0dXJuIG91dC5fX2NhY2hlX18ubG9jYWxpemF0aW9uc1tvdXQubG9jYWxlXT8uW2tleV1cclxuICAgICAgfHwgb3V0Ll9fY2FjaGVfXy5sb2NhbGl6YXRpb25zLmRlZmF1bHQ/LltrZXldXHJcbiAgICAgIHx8IG1vZHVsZXMuY29tbW9uLmkxOG4uTWVzc2FnZXNba2V5XVxyXG4gICAgICB8fCBrZXk7XHJcbiAgfSxcclxuICBtZXNzYWdlczogbmV3IFByb3h5KHt9LCB7XHJcbiAgICBnZXQoXywgcHJvcCkge1xyXG4gICAgICByZXR1cm4gb3V0LmdldChwcm9wKTtcclxuICAgIH1cclxuICB9KSxcclxuICBsb2NhbGl6ZShzdHIpIHtcclxuICAgIGlmICh0eXBlb2Ygc3RyID09PSBcInN0cmluZ1wiKSByZXR1cm4gc3RyO1xyXG4gICAgcmV0dXJuIHN0cj8uW291dC5sb2NhbGVdXHJcbiAgICAgIHx8IHN0cj8uZGVmYXVsdFxyXG4gICAgICB8fCBPYmplY3QudmFsdWVzKHN0cilbMF07XHJcbiAgfSxcclxuICBmb3JtYXQoa2V5LCAuLi5hcmdzKSB7XHJcbiAgICByZXR1cm4gdXRpbHMuZm9ybWF0KG91dC5nZXQoa2V5KSwgLi4uYXJncyk7XHJcbiAgfVxyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBjaGVjaygpIHtcclxuICBjb25zdCBsb2NhbGUgPSBvdXQubG9jYWxlO1xyXG4gIGlmICghb3V0Ll9fY2FjaGVfXy5sb2NhbGVJZHMubGVuZ3RoKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBvdXQuX19jYWNoZV9fLmxvY2FsZUlkcyA9IGF3YWl0IChhd2FpdCBmZXRjaChgJHtCQVNFX1VSTH0vbG9jYWxlcy5qc29uYCwgbm9TdG9yZSkpLmpzb24oKTtcclxuICAgIH0gY2F0Y2ggeyB9XHJcbiAgICB0cnkge1xyXG4gICAgICBvdXQuX19jYWNoZV9fLmxvY2FsaXphdGlvbnMuZGVmYXVsdCA9IGF3YWl0IChhd2FpdCBmZXRjaChgJHtCQVNFX1VSTH0vZGVmYXVsdC5qc29uYCwgbm9TdG9yZSkpLmpzb24oKTtcclxuICAgIH0gY2F0Y2ggeyB9XHJcbiAgfVxyXG4gIGlmIChcclxuICAgIG91dC5fX2NhY2hlX18ubG9jYWxlSWRzLmluY2x1ZGVzKGxvY2FsZSlcclxuICAgICYmICFvdXQuX19jYWNoZV9fLmxvY2FsaXphdGlvbnM/Lltsb2NhbGVdXHJcbiAgKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBvdXQuX19jYWNoZV9fLmxvY2FsaXphdGlvbnNbbG9jYWxlXSA9IGF3YWl0IChhd2FpdCBmZXRjaChgJHtCQVNFX1VSTH0vJHtsb2NhbGV9Lmpzb25gLCBub1N0b3JlKSkuanNvbigpO1xyXG4gICAgfSBjYXRjaCB7IH07XHJcbiAgfVxyXG59XHJcblxyXG5jaGVjaygpO1xyXG5leHBvcnQgZGVmYXVsdCBvdXQ7IiwgImltcG9ydCAqIGFzIG5lc3RzIGZyb20gXCJuZXN0c1wiO1xyXG5pbXBvcnQgKiBhcyBpZGJLZXl2YWwgZnJvbSBcImlkYi1rZXl2YWxcIjtcclxuaW1wb3J0IHsgZGVDeWNsZWQsIHJldml2ZSB9IGZyb20gXCIuLi8uLi9saWIvanNvbi1kZWN5Y2xlZFwiO1xyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgYXN5bmMgY3JlYXRlUGVyc2lzdE5lc3Qoc3VmZml4KSB7XHJcbiAgICBsZXQgY2FjaGVkID0gYXdhaXQgaWRiS2V5dmFsLmdldChgQWNvcmRTdG9yZTske3N1ZmZpeH1gKTtcclxuICAgIGlmICh0eXBlb2YgY2FjaGVkID09IFwic3RyaW5nXCIpIGNhY2hlZCA9IHJldml2ZShjYWNoZWQpO1xyXG4gICAgY29uc3QgbmVzdCA9IG5lc3RzLm1ha2UoY2FjaGVkID8/IHt9KTtcclxuXHJcbiAgICBjb25zdCBzYXZlID0gKCkgPT4ge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGlkYktleXZhbC5zZXQoYEFjb3JkU3RvcmU7JHtzdWZmaXh9YCwgZGVDeWNsZWQoeyAuLi5uZXN0Lmdob3N0IH0pKTtcclxuICAgICAgfSBjYXRjaCB7XHJcbiAgICAgICAgaWRiS2V5dmFsLnNldChgQWNvcmRTdG9yZTske3N1ZmZpeH1gLCBkZUN5Y2xlZCh7fSkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbmVzdC5vbihuZXN0cy5FdmVudHMuU0VULCBzYXZlKTtcclxuICAgIG5lc3Qub24obmVzdHMuRXZlbnRzLlVQREFURSwgc2F2ZSk7XHJcbiAgICBuZXN0Lm9uKG5lc3RzLkV2ZW50cy5ERUxFVEUsIHNhdmUpO1xyXG5cclxuICAgIHJldHVybiBuZXN0O1xyXG4gIH1cclxufSIsICJmdW5jdGlvbiBwcm9taXNpZnlSZXF1ZXN0KHJlcXVlc3QpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAvLyBAdHMtaWdub3JlIC0gZmlsZSBzaXplIGhhY2tzXG4gICAgICAgIHJlcXVlc3Qub25jb21wbGV0ZSA9IHJlcXVlc3Qub25zdWNjZXNzID0gKCkgPT4gcmVzb2x2ZShyZXF1ZXN0LnJlc3VsdCk7XG4gICAgICAgIC8vIEB0cy1pZ25vcmUgLSBmaWxlIHNpemUgaGFja3NcbiAgICAgICAgcmVxdWVzdC5vbmFib3J0ID0gcmVxdWVzdC5vbmVycm9yID0gKCkgPT4gcmVqZWN0KHJlcXVlc3QuZXJyb3IpO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gY3JlYXRlU3RvcmUoZGJOYW1lLCBzdG9yZU5hbWUpIHtcbiAgICBjb25zdCByZXF1ZXN0ID0gaW5kZXhlZERCLm9wZW4oZGJOYW1lKTtcbiAgICByZXF1ZXN0Lm9udXBncmFkZW5lZWRlZCA9ICgpID0+IHJlcXVlc3QucmVzdWx0LmNyZWF0ZU9iamVjdFN0b3JlKHN0b3JlTmFtZSk7XG4gICAgY29uc3QgZGJwID0gcHJvbWlzaWZ5UmVxdWVzdChyZXF1ZXN0KTtcbiAgICByZXR1cm4gKHR4TW9kZSwgY2FsbGJhY2spID0+IGRicC50aGVuKChkYikgPT4gY2FsbGJhY2soZGIudHJhbnNhY3Rpb24oc3RvcmVOYW1lLCB0eE1vZGUpLm9iamVjdFN0b3JlKHN0b3JlTmFtZSkpKTtcbn1cbmxldCBkZWZhdWx0R2V0U3RvcmVGdW5jO1xuZnVuY3Rpb24gZGVmYXVsdEdldFN0b3JlKCkge1xuICAgIGlmICghZGVmYXVsdEdldFN0b3JlRnVuYykge1xuICAgICAgICBkZWZhdWx0R2V0U3RvcmVGdW5jID0gY3JlYXRlU3RvcmUoJ2tleXZhbC1zdG9yZScsICdrZXl2YWwnKTtcbiAgICB9XG4gICAgcmV0dXJuIGRlZmF1bHRHZXRTdG9yZUZ1bmM7XG59XG4vKipcbiAqIEdldCBhIHZhbHVlIGJ5IGl0cyBrZXkuXG4gKlxuICogQHBhcmFtIGtleVxuICogQHBhcmFtIGN1c3RvbVN0b3JlIE1ldGhvZCB0byBnZXQgYSBjdXN0b20gc3RvcmUuIFVzZSB3aXRoIGNhdXRpb24gKHNlZSB0aGUgZG9jcykuXG4gKi9cbmZ1bmN0aW9uIGdldChrZXksIGN1c3RvbVN0b3JlID0gZGVmYXVsdEdldFN0b3JlKCkpIHtcbiAgICByZXR1cm4gY3VzdG9tU3RvcmUoJ3JlYWRvbmx5JywgKHN0b3JlKSA9PiBwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLmdldChrZXkpKSk7XG59XG4vKipcbiAqIFNldCBhIHZhbHVlIHdpdGggYSBrZXkuXG4gKlxuICogQHBhcmFtIGtleVxuICogQHBhcmFtIHZhbHVlXG4gKiBAcGFyYW0gY3VzdG9tU3RvcmUgTWV0aG9kIHRvIGdldCBhIGN1c3RvbSBzdG9yZS4gVXNlIHdpdGggY2F1dGlvbiAoc2VlIHRoZSBkb2NzKS5cbiAqL1xuZnVuY3Rpb24gc2V0KGtleSwgdmFsdWUsIGN1c3RvbVN0b3JlID0gZGVmYXVsdEdldFN0b3JlKCkpIHtcbiAgICByZXR1cm4gY3VzdG9tU3RvcmUoJ3JlYWR3cml0ZScsIChzdG9yZSkgPT4ge1xuICAgICAgICBzdG9yZS5wdXQodmFsdWUsIGtleSk7XG4gICAgICAgIHJldHVybiBwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLnRyYW5zYWN0aW9uKTtcbiAgICB9KTtcbn1cbi8qKlxuICogU2V0IG11bHRpcGxlIHZhbHVlcyBhdCBvbmNlLiBUaGlzIGlzIGZhc3RlciB0aGFuIGNhbGxpbmcgc2V0KCkgbXVsdGlwbGUgdGltZXMuXG4gKiBJdCdzIGFsc28gYXRvbWljIFx1MjAxMyBpZiBvbmUgb2YgdGhlIHBhaXJzIGNhbid0IGJlIGFkZGVkLCBub25lIHdpbGwgYmUgYWRkZWQuXG4gKlxuICogQHBhcmFtIGVudHJpZXMgQXJyYXkgb2YgZW50cmllcywgd2hlcmUgZWFjaCBlbnRyeSBpcyBhbiBhcnJheSBvZiBgW2tleSwgdmFsdWVdYC5cbiAqIEBwYXJhbSBjdXN0b21TdG9yZSBNZXRob2QgdG8gZ2V0IGEgY3VzdG9tIHN0b3JlLiBVc2Ugd2l0aCBjYXV0aW9uIChzZWUgdGhlIGRvY3MpLlxuICovXG5mdW5jdGlvbiBzZXRNYW55KGVudHJpZXMsIGN1c3RvbVN0b3JlID0gZGVmYXVsdEdldFN0b3JlKCkpIHtcbiAgICByZXR1cm4gY3VzdG9tU3RvcmUoJ3JlYWR3cml0ZScsIChzdG9yZSkgPT4ge1xuICAgICAgICBlbnRyaWVzLmZvckVhY2goKGVudHJ5KSA9PiBzdG9yZS5wdXQoZW50cnlbMV0sIGVudHJ5WzBdKSk7XG4gICAgICAgIHJldHVybiBwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLnRyYW5zYWN0aW9uKTtcbiAgICB9KTtcbn1cbi8qKlxuICogR2V0IG11bHRpcGxlIHZhbHVlcyBieSB0aGVpciBrZXlzXG4gKlxuICogQHBhcmFtIGtleXNcbiAqIEBwYXJhbSBjdXN0b21TdG9yZSBNZXRob2QgdG8gZ2V0IGEgY3VzdG9tIHN0b3JlLiBVc2Ugd2l0aCBjYXV0aW9uIChzZWUgdGhlIGRvY3MpLlxuICovXG5mdW5jdGlvbiBnZXRNYW55KGtleXMsIGN1c3RvbVN0b3JlID0gZGVmYXVsdEdldFN0b3JlKCkpIHtcbiAgICByZXR1cm4gY3VzdG9tU3RvcmUoJ3JlYWRvbmx5JywgKHN0b3JlKSA9PiBQcm9taXNlLmFsbChrZXlzLm1hcCgoa2V5KSA9PiBwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLmdldChrZXkpKSkpKTtcbn1cbi8qKlxuICogVXBkYXRlIGEgdmFsdWUuIFRoaXMgbGV0cyB5b3Ugc2VlIHRoZSBvbGQgdmFsdWUgYW5kIHVwZGF0ZSBpdCBhcyBhbiBhdG9taWMgb3BlcmF0aW9uLlxuICpcbiAqIEBwYXJhbSBrZXlcbiAqIEBwYXJhbSB1cGRhdGVyIEEgY2FsbGJhY2sgdGhhdCB0YWtlcyB0aGUgb2xkIHZhbHVlIGFuZCByZXR1cm5zIGEgbmV3IHZhbHVlLlxuICogQHBhcmFtIGN1c3RvbVN0b3JlIE1ldGhvZCB0byBnZXQgYSBjdXN0b20gc3RvcmUuIFVzZSB3aXRoIGNhdXRpb24gKHNlZSB0aGUgZG9jcykuXG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZShrZXksIHVwZGF0ZXIsIGN1c3RvbVN0b3JlID0gZGVmYXVsdEdldFN0b3JlKCkpIHtcbiAgICByZXR1cm4gY3VzdG9tU3RvcmUoJ3JlYWR3cml0ZScsIChzdG9yZSkgPT4gXG4gICAgLy8gTmVlZCB0byBjcmVhdGUgdGhlIHByb21pc2UgbWFudWFsbHkuXG4gICAgLy8gSWYgSSB0cnkgdG8gY2hhaW4gcHJvbWlzZXMsIHRoZSB0cmFuc2FjdGlvbiBjbG9zZXMgaW4gYnJvd3NlcnNcbiAgICAvLyB0aGF0IHVzZSBhIHByb21pc2UgcG9seWZpbGwgKElFMTAvMTEpLlxuICAgIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgc3RvcmUuZ2V0KGtleSkub25zdWNjZXNzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBzdG9yZS5wdXQodXBkYXRlcih0aGlzLnJlc3VsdCksIGtleSk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLnRyYW5zYWN0aW9uKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSkpO1xufVxuLyoqXG4gKiBEZWxldGUgYSBwYXJ0aWN1bGFyIGtleSBmcm9tIHRoZSBzdG9yZS5cbiAqXG4gKiBAcGFyYW0ga2V5XG4gKiBAcGFyYW0gY3VzdG9tU3RvcmUgTWV0aG9kIHRvIGdldCBhIGN1c3RvbSBzdG9yZS4gVXNlIHdpdGggY2F1dGlvbiAoc2VlIHRoZSBkb2NzKS5cbiAqL1xuZnVuY3Rpb24gZGVsKGtleSwgY3VzdG9tU3RvcmUgPSBkZWZhdWx0R2V0U3RvcmUoKSkge1xuICAgIHJldHVybiBjdXN0b21TdG9yZSgncmVhZHdyaXRlJywgKHN0b3JlKSA9PiB7XG4gICAgICAgIHN0b3JlLmRlbGV0ZShrZXkpO1xuICAgICAgICByZXR1cm4gcHJvbWlzaWZ5UmVxdWVzdChzdG9yZS50cmFuc2FjdGlvbik7XG4gICAgfSk7XG59XG4vKipcbiAqIERlbGV0ZSBtdWx0aXBsZSBrZXlzIGF0IG9uY2UuXG4gKlxuICogQHBhcmFtIGtleXMgTGlzdCBvZiBrZXlzIHRvIGRlbGV0ZS5cbiAqIEBwYXJhbSBjdXN0b21TdG9yZSBNZXRob2QgdG8gZ2V0IGEgY3VzdG9tIHN0b3JlLiBVc2Ugd2l0aCBjYXV0aW9uIChzZWUgdGhlIGRvY3MpLlxuICovXG5mdW5jdGlvbiBkZWxNYW55KGtleXMsIGN1c3RvbVN0b3JlID0gZGVmYXVsdEdldFN0b3JlKCkpIHtcbiAgICByZXR1cm4gY3VzdG9tU3RvcmUoJ3JlYWR3cml0ZScsIChzdG9yZSkgPT4ge1xuICAgICAgICBrZXlzLmZvckVhY2goKGtleSkgPT4gc3RvcmUuZGVsZXRlKGtleSkpO1xuICAgICAgICByZXR1cm4gcHJvbWlzaWZ5UmVxdWVzdChzdG9yZS50cmFuc2FjdGlvbik7XG4gICAgfSk7XG59XG4vKipcbiAqIENsZWFyIGFsbCB2YWx1ZXMgaW4gdGhlIHN0b3JlLlxuICpcbiAqIEBwYXJhbSBjdXN0b21TdG9yZSBNZXRob2QgdG8gZ2V0IGEgY3VzdG9tIHN0b3JlLiBVc2Ugd2l0aCBjYXV0aW9uIChzZWUgdGhlIGRvY3MpLlxuICovXG5mdW5jdGlvbiBjbGVhcihjdXN0b21TdG9yZSA9IGRlZmF1bHRHZXRTdG9yZSgpKSB7XG4gICAgcmV0dXJuIGN1c3RvbVN0b3JlKCdyZWFkd3JpdGUnLCAoc3RvcmUpID0+IHtcbiAgICAgICAgc3RvcmUuY2xlYXIoKTtcbiAgICAgICAgcmV0dXJuIHByb21pc2lmeVJlcXVlc3Qoc3RvcmUudHJhbnNhY3Rpb24pO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gZWFjaEN1cnNvcihzdG9yZSwgY2FsbGJhY2spIHtcbiAgICBzdG9yZS5vcGVuQ3Vyc29yKCkub25zdWNjZXNzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXRoaXMucmVzdWx0KVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjYWxsYmFjayh0aGlzLnJlc3VsdCk7XG4gICAgICAgIHRoaXMucmVzdWx0LmNvbnRpbnVlKCk7XG4gICAgfTtcbiAgICByZXR1cm4gcHJvbWlzaWZ5UmVxdWVzdChzdG9yZS50cmFuc2FjdGlvbik7XG59XG4vKipcbiAqIEdldCBhbGwga2V5cyBpbiB0aGUgc3RvcmUuXG4gKlxuICogQHBhcmFtIGN1c3RvbVN0b3JlIE1ldGhvZCB0byBnZXQgYSBjdXN0b20gc3RvcmUuIFVzZSB3aXRoIGNhdXRpb24gKHNlZSB0aGUgZG9jcykuXG4gKi9cbmZ1bmN0aW9uIGtleXMoY3VzdG9tU3RvcmUgPSBkZWZhdWx0R2V0U3RvcmUoKSkge1xuICAgIHJldHVybiBjdXN0b21TdG9yZSgncmVhZG9ubHknLCAoc3RvcmUpID0+IHtcbiAgICAgICAgLy8gRmFzdCBwYXRoIGZvciBtb2Rlcm4gYnJvd3NlcnNcbiAgICAgICAgaWYgKHN0b3JlLmdldEFsbEtleXMpIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLmdldEFsbEtleXMoKSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaXRlbXMgPSBbXTtcbiAgICAgICAgcmV0dXJuIGVhY2hDdXJzb3Ioc3RvcmUsIChjdXJzb3IpID0+IGl0ZW1zLnB1c2goY3Vyc29yLmtleSkpLnRoZW4oKCkgPT4gaXRlbXMpO1xuICAgIH0pO1xufVxuLyoqXG4gKiBHZXQgYWxsIHZhbHVlcyBpbiB0aGUgc3RvcmUuXG4gKlxuICogQHBhcmFtIGN1c3RvbVN0b3JlIE1ldGhvZCB0byBnZXQgYSBjdXN0b20gc3RvcmUuIFVzZSB3aXRoIGNhdXRpb24gKHNlZSB0aGUgZG9jcykuXG4gKi9cbmZ1bmN0aW9uIHZhbHVlcyhjdXN0b21TdG9yZSA9IGRlZmF1bHRHZXRTdG9yZSgpKSB7XG4gICAgcmV0dXJuIGN1c3RvbVN0b3JlKCdyZWFkb25seScsIChzdG9yZSkgPT4ge1xuICAgICAgICAvLyBGYXN0IHBhdGggZm9yIG1vZGVybiBicm93c2Vyc1xuICAgICAgICBpZiAoc3RvcmUuZ2V0QWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzaWZ5UmVxdWVzdChzdG9yZS5nZXRBbGwoKSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaXRlbXMgPSBbXTtcbiAgICAgICAgcmV0dXJuIGVhY2hDdXJzb3Ioc3RvcmUsIChjdXJzb3IpID0+IGl0ZW1zLnB1c2goY3Vyc29yLnZhbHVlKSkudGhlbigoKSA9PiBpdGVtcyk7XG4gICAgfSk7XG59XG4vKipcbiAqIEdldCBhbGwgZW50cmllcyBpbiB0aGUgc3RvcmUuIEVhY2ggZW50cnkgaXMgYW4gYXJyYXkgb2YgYFtrZXksIHZhbHVlXWAuXG4gKlxuICogQHBhcmFtIGN1c3RvbVN0b3JlIE1ldGhvZCB0byBnZXQgYSBjdXN0b20gc3RvcmUuIFVzZSB3aXRoIGNhdXRpb24gKHNlZSB0aGUgZG9jcykuXG4gKi9cbmZ1bmN0aW9uIGVudHJpZXMoY3VzdG9tU3RvcmUgPSBkZWZhdWx0R2V0U3RvcmUoKSkge1xuICAgIHJldHVybiBjdXN0b21TdG9yZSgncmVhZG9ubHknLCAoc3RvcmUpID0+IHtcbiAgICAgICAgLy8gRmFzdCBwYXRoIGZvciBtb2Rlcm4gYnJvd3NlcnNcbiAgICAgICAgLy8gKGFsdGhvdWdoLCBob3BlZnVsbHkgd2UnbGwgZ2V0IGEgc2ltcGxlciBwYXRoIHNvbWUgZGF5KVxuICAgICAgICBpZiAoc3RvcmUuZ2V0QWxsICYmIHN0b3JlLmdldEFsbEtleXMpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICAgICAgcHJvbWlzaWZ5UmVxdWVzdChzdG9yZS5nZXRBbGxLZXlzKCkpLFxuICAgICAgICAgICAgICAgIHByb21pc2lmeVJlcXVlc3Qoc3RvcmUuZ2V0QWxsKCkpLFxuICAgICAgICAgICAgXSkudGhlbigoW2tleXMsIHZhbHVlc10pID0+IGtleXMubWFwKChrZXksIGkpID0+IFtrZXksIHZhbHVlc1tpXV0pKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpdGVtcyA9IFtdO1xuICAgICAgICByZXR1cm4gY3VzdG9tU3RvcmUoJ3JlYWRvbmx5JywgKHN0b3JlKSA9PiBlYWNoQ3Vyc29yKHN0b3JlLCAoY3Vyc29yKSA9PiBpdGVtcy5wdXNoKFtjdXJzb3Iua2V5LCBjdXJzb3IudmFsdWVdKSkudGhlbigoKSA9PiBpdGVtcykpO1xuICAgIH0pO1xufVxuXG5leHBvcnQgeyBjbGVhciwgY3JlYXRlU3RvcmUsIGRlbCwgZGVsTWFueSwgZW50cmllcywgZ2V0LCBnZXRNYW55LCBrZXlzLCBwcm9taXNpZnlSZXF1ZXN0LCBzZXQsIHNldE1hbnksIHVwZGF0ZSwgdmFsdWVzIH07XG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5mdW5jdGlvbiBkZUN5Y2xlcih2YWwsIGNvbmZpZykge1xyXG4gIGNvbmZpZyA9IHR5cGVvZiBjb25maWcgPT09ICdudW1iZXInID8geyBkZWVwOiBjb25maWcgfSA6IChjb25maWcgfHwge30pO1xyXG4gIGNvbmZpZy5kZWVwID0gY29uZmlnLmRlZXAgfHwgMTA7XHJcbiAgcmV0dXJuIGRlY3ljbGVXYWxrZXIoW10sIFtdLCB2YWwsIGNvbmZpZyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRlQ3ljbGVkKHZhbCwgY29uZmlnKSB7XHJcbiAgY29uZmlnID0gdHlwZW9mIGNvbmZpZyA9PT0gJ251bWJlcicgPyB7IGRlZXA6IGNvbmZpZyB9IDogKGNvbmZpZyB8fCB7fSk7XHJcbiAgdmFsID0gZGVDeWNsZXIodmFsLCBjb25maWcpO1xyXG4gIHRyeSB7XHJcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodmFsLCB1bmRlZmluZWQsIGNvbmZpZy5zcGFjZXIpO1xyXG4gIH0gY2F0Y2ggKGUpIHtcclxuICAgIHJldHVybiBlO1xyXG4gIH1cclxufVxyXG5cclxudmFyIHJldml2ZXJEYXRlID0gL15cXFtEYXRlOigoXFxkezR9LVxcZHsyfS1cXGR7Mn0pW0EtWl0rKFxcZHsyfTpcXGR7Mn06XFxkezJ9KS4oWzAtOSstOl0rKVopXFxdJC87XHJcbnZhciByZXZpdmVyUmVnRXhwID0gL15cXFtSZWdleHA6XFwvKC4rKVxcL1xcXSQvO1xyXG52YXIgcmV2aXZlckVycm9yID0gL15cXFtFcnJvcjooW1xcV1xcd10rKVxcXSQvO1xyXG52YXIgcmV2aXZlckZ1bmN0aW9uID0gL15cXFtGdW5jdGlvbjooLispXFxdJC87XHJcbmZ1bmN0aW9uIHJldml2ZSh2YWwsIGZ1bmN0aW9ucykge1xyXG4gIHRyeSB7XHJcbiAgICByZXR1cm4gSlNPTi5wYXJzZSh2YWwsIHJldml2ZXIpO1xyXG4gIH0gY2F0Y2ggKGUpIHtcclxuICAgIHJldHVybiBlO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcmV2aXZlcihrZXksIHZhbCkge1xyXG4gICAgaWYgKHJldml2ZXJEYXRlLnRlc3QodmFsKSkge1xyXG4gICAgICB2YWwgPSByZXZpdmVyRGF0ZS5leGVjKHZhbCk7XHJcbiAgICAgIHZhbCA9IG5ldyBEYXRlKHZhbFsxXSk7XHJcbiAgICAgIHJldHVybiBuZXcgRGF0ZSh2YWwpO1xyXG4gICAgfSBlbHNlIGlmIChyZXZpdmVyUmVnRXhwLnRlc3QodmFsKSkge1xyXG4gICAgICB2YWwgPSByZXZpdmVyUmVnRXhwLmV4ZWModmFsKVsxXTtcclxuICAgICAgcmV0dXJuIG5ldyBSZWdFeHAodmFsKTtcclxuICAgIH0gZWxzZSBpZiAocmV2aXZlckVycm9yLnRlc3QodmFsKSkge1xyXG4gICAgICB2YWwgPSByZXZpdmVyRXJyb3IuZXhlYyh2YWwpWzFdO1xyXG4gICAgICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IodmFsLnNwbGl0KCdcXG4nKVswXSk7XHJcbiAgICAgIGlmIChlcnJvci5zdGFjaykge1xyXG4gICAgICAgIGVycm9yLnN0YWNrID0gdmFsO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBlcnJvcjtcclxuICAgIH0gZWxzZSBpZiAoZnVuY3Rpb25zICYmIHJldml2ZXJGdW5jdGlvbi50ZXN0KHZhbCkpIHtcclxuICAgICAgdmFsID0gcmV2aXZlckZ1bmN0aW9uLmV4ZWModmFsKVsxXTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICByZXR1cm4gKG5ldyBGdW5jdGlvbihcInJldHVybiBcIiArIHZhbCArIFwiO1wiKSkoKTtcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICByZXR1cm4gZXJyb3I7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB2YWw7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBkZWN5Y2xlV2Fsa2VyKHBhcmVudHMsIHBhdGgsIHZhbCwgY29uZmlnKSB7XHJcbiAgaWYgKFsndW5kZWZpbmVkJywgJ251bWJlcicsICdib29sZWFuJywgJ3N0cmluZyddLmluZGV4T2YodHlwZW9mIHZhbCkgPj0gMCB8fCB2YWwgPT09IG51bGwpIHtcclxuICAgIHJldHVybiB2YWw7XHJcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnb2JqZWN0JyAmJiB2YWwuY29uc3RydWN0b3IgPT09IERhdGUpIHtcclxuICAgIHJldHVybiBjb25maWcuZGF0ZXMgIT09IGZhbHNlID8gJ1tEYXRlOicgKyB2YWwudG9JU09TdHJpbmcoKSArICddJyA6IHZhbDtcclxuICAgIC8vdmFsLmZvcm1hdCgne1lZWVl9L3tNTX0ve0REfSB7aGh9OnttbX06e3NzfSBVVEM6XHUwMEI3e3BhcmFtcy50ej49MD9cIitcIitwYXJhbXMudHo6cGFyYW1zLnR6fVx1MDBCNycpO1xyXG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ29iamVjdCcgJiYgdmFsLmNvbnN0cnVjdG9yID09PSBSZWdFeHApIHtcclxuICAgIHJldHVybiBjb25maWcucmVnZXhwcyAhPT0gZmFsc2UgPyAnW1JlZ2V4cDonICsgdmFsLnRvU3RyaW5nKCkgKyAnXScgOiB2YWw7XHJcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnb2JqZWN0JyAmJiB2YWwuY29uc3RydWN0b3IgJiYgdHlwZW9mIHZhbC5jb25zdHJ1Y3Rvci5uYW1lID09PSAnc3RyaW5nJyAmJiB2YWwuY29uc3RydWN0b3IubmFtZS5zbGljZSgtNSkgPT09ICdFcnJvcicpIHtcclxuICAgIHZhciBzdGFjayA9ICh2YWwuc3RhY2sgfHwgJycpLnNwbGl0KCdcXG4nKS5zbGljZSgxKTtcclxuICAgIHZhciBtZXNzYWdlID0gKHZhbC5tZXNzYWdlIHx8IHZhbC50b1N0cmluZygpKTtcclxuICAgIHZhciBlcnJvciA9IG1lc3NhZ2UgKyBcIlxcblwiICsgc3RhY2s7XHJcbiAgICByZXR1cm4gY29uZmlnLmVycm9ycyAhPT0gZmFsc2UgPyAnW0Vycm9yOicgKyBlcnJvciArICddJyA6IHZhbDtcclxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSB7XHJcbiAgICBpZiAocGFyZW50cy5pbmRleE9mKHZhbCkgPj0gMCkge1xyXG4gICAgICB2YXIgcG9pbnQgPSBwYXRoLnNsaWNlKDAsIHBhcmVudHMuaW5kZXhPZih2YWwpKS5qb2luKCcuJyk7XHJcbiAgICAgIHJldHVybiAnW0NpcmN1bGFyJyArIChwb2ludCA/ICc6JyArIHBvaW50IDogJycpICsgJ10nO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFyIGNvcHksIGksIGssIGw7XHJcbiAgICAgIGlmICh2YWwuY29uc3RydWN0b3IgJiYgdHlwZW9mIHZhbC5jb25zdHJ1Y3Rvci5uYW1lID09PSAnc3RyaW5nJyAmJiB2YWwuY29uc3RydWN0b3IubmFtZS5zbGljZSgtNSkgPT09ICdBcnJheScpIHtcclxuICAgICAgICBpZiAocGFyZW50cy5sZW5ndGggPj0gY29uZmlnLmRlZXApIHtcclxuICAgICAgICAgIHJldHVybiAnW0FycmF5OicgKyB2YWwuY29uc3RydWN0b3IubmFtZSArICddJztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29weSA9IFtdO1xyXG4gICAgICAgICAgZm9yIChpID0gMCwgbCA9IHZhbC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICAgICAgY29weVtpXSA9IGRlY3ljbGVXYWxrZXIocGFyZW50cy5jb25jYXQoW3ZhbF0pLCBwYXRoLmNvbmNhdChpKSwgdmFsW2ldLCBjb25maWcpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIGNvcHk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChwYXJlbnRzLmxlbmd0aCA+PSBjb25maWcuZGVlcCkge1xyXG4gICAgICAgICAgcmV0dXJuICdbT2JqZWN0OicgKyAodmFsLmNvbnN0cnVjdG9yICYmIHZhbC5jb25zdHJ1Y3Rvci5uYW1lID8gdmFsLmNvbnN0cnVjdG9yLm5hbWUgOiAnT2JqZWN0JykgKyAnXSc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvcHkgPSB7fTtcclxuICAgICAgICAgIGZvciAoaSA9IDAsIGsgPSBPYmplY3Qua2V5cyh2YWwpLCBsID0gay5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICAgICAgY29weVtrW2ldXSA9IGRlY3ljbGVXYWxrZXIocGFyZW50cy5jb25jYXQoW3ZhbF0pLCBwYXRoLmNvbmNhdChba1tpXV0pLCB2YWxba1tpXV0sIGNvbmZpZyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gY29weTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicpIHtcclxuICAgIHJldHVybiBjb25maWcuZnVuY3Rpb25zID09PSB0cnVlID8gJ1tGdW5jdGlvbjonICsgdmFsLnRvU3RyaW5nKCkgKyAnXScgOiB1bmRlZmluZWQ7XHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiB2YWwudG9TdHJpbmcoKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7XHJcbiAgZGVDeWNsZXIsXHJcbiAgZGVDeWNsZWQsXHJcbiAgcmV2aXZlXHJcbn0iLCAiaW1wb3J0IGkxOG4gZnJvbSBcIi4uL2kxOG5cIjtcclxuaW1wb3J0IHV0aWxzIGZyb20gXCIuLi91dGlsc1wiO1xyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSB7eyBpMThuOiBzdHJpbmcgfCB7IFtsYW5nOiBzdHJpbmddOiB7IFtrOiBzdHJpbmddOiBzdHJpbmcgfSB9fX0gY2ZnIFxyXG4gKiBAcmV0dXJucyBcclxuICovXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBidWlsZEV4dGVuc2lvbkkxOE4oY2ZnKSB7XHJcbiAgaWYgKCFjZmc/LmkxOG4pIHJldHVybiBudWxsO1xyXG4gIGxldCBvdXQgPSB7XHJcbiAgICBfX2NhY2hlX186IHtcclxuICAgICAgbG9jYWxlSWRzOiBbXSxcclxuICAgICAgbG9jYWxpemF0aW9uczoge31cclxuICAgIH0sXHJcbiAgICBmb3JtYXQoa2V5LCAuLi5hcmdzKSB7XHJcbiAgICAgIHJldHVybiB1dGlscy5mb3JtYXQob3V0LmdldChrZXkpLCAuLi5hcmdzKTtcclxuICAgIH0sXHJcbiAgICBnZXQoa2V5KSB7XHJcbiAgICAgIGlmICh0eXBlb2YgY2ZnLmkxOG4gPT09IFwic3RyaW5nXCIpIGNoZWNrKCk7XHJcbiAgICAgIHJldHVybiBvdXQuX19jYWNoZV9fLmxvY2FsaXphdGlvbnNbb3V0LmxvY2FsZV0/LltrZXldXHJcbiAgICAgICAgfHwgb3V0Ll9fY2FjaGVfXy5sb2NhbGl6YXRpb25zLmRlZmF1bHQ/LltrZXldXHJcbiAgICAgICAgfHwgb3V0LmdldChrZXkpO1xyXG4gICAgfSxcclxuICAgIG1lc3NhZ2VzOiBuZXcgUHJveHkoe30sIHtcclxuICAgICAgZ2V0KF8sIHByb3ApIHtcclxuICAgICAgICByZXR1cm4gb3V0LmdldChwcm9wKTtcclxuICAgICAgfVxyXG4gICAgfSksXHJcbiAgfVxyXG4gIGFzeW5jIGZ1bmN0aW9uIGNoZWNrKCkge1xyXG4gICAgY29uc3QgbG9jYWxlID0gaTE4bi5sb2NhbGU7XHJcbiAgICBpZiAodHlwZW9mIGNmZy5pMThuID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgIGNvbnN0IEJBU0VfVVJMID0gY2ZnLmkxOG4uZW5kc1dpdGgoXCIvXCIpID8gY2ZnLmkxOG4uc2xpY2UoMCwgLTEpIDogY2ZnLmkxOG47XHJcbiAgICAgIGlmICghb3V0Ll9fY2FjaGVfXy5sb2NhbGVJZHMubGVuZ3RoKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIG91dC5fX2NhY2hlX18ubG9jYWxlSWRzID0gYXdhaXQgKGF3YWl0IGZldGNoKGAke0JBU0VfVVJMfS9sb2NhbGVzLmpzb25gLCBub1N0b3JlKSkuanNvbigpO1xyXG4gICAgICAgIH0gY2F0Y2ggeyB9XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIG91dC5fX2NhY2hlX18ubG9jYWxpemF0aW9ucy5kZWZhdWx0ID0gYXdhaXQgKGF3YWl0IGZldGNoKGAke0JBU0VfVVJMfS9kZWZhdWx0Lmpzb25gLCBub1N0b3JlKSkuanNvbigpO1xyXG4gICAgICAgIH0gY2F0Y2ggeyB9XHJcbiAgICAgIH1cclxuICAgICAgaWYgKFxyXG4gICAgICAgIG91dC5fX2NhY2hlX18ubG9jYWxlSWRzLmluY2x1ZGVzKGxvY2FsZSlcclxuICAgICAgICAmJiAhb3V0Ll9fY2FjaGVfXy5sb2NhbGl6YXRpb25zPy5bbG9jYWxlXVxyXG4gICAgICApIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgb3V0Ll9fY2FjaGVfXy5sb2NhbGl6YXRpb25zW2xvY2FsZV0gPSBhd2FpdCAoYXdhaXQgZmV0Y2goYCR7QkFTRV9VUkx9LyR7bG9jYWxlfS5qc29uYCwgbm9TdG9yZSkpLmpzb24oKTtcclxuICAgICAgICB9IGNhdGNoIHsgfTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgb3V0Ll9fY2FjaGVfXy5sb2NhbGVJZHMgPSBPYmplY3Qua2V5cyhjZmcuaTE4bik7XHJcbiAgICAgIG91dC5fX2NhY2hlX18ubG9jYWxpemF0aW9ucyA9IGNmZy5pMThuO1xyXG4gICAgfVxyXG4gIH1cclxuICBhd2FpdCBjaGVjaygpO1xyXG4gIHJldHVybiBvdXQ7XHJcbn0iLCAiaW1wb3J0IHsgQmFzaWNFdmVudEVtaXR0ZXIgfSBmcm9tIFwiLi4vLi4vbGliL0Jhc2ljRXZlbnRFbWl0dGVyLmpzXCI7XHJcbmltcG9ydCBkZXYgZnJvbSBcIi4uL2Rldi9pbmRleC5qc1wiO1xyXG5pbXBvcnQgaTE4biBmcm9tIFwiLi4vaTE4bi9pbmRleC5qc1wiO1xyXG5pbXBvcnQgbW9kdWxlcyBmcm9tIFwiLi4vbW9kdWxlcy9pbmRleC5qc1wiO1xyXG5pbXBvcnQgc3RvcmFnZSBmcm9tIFwiLi4vc3RvcmFnZS9pbmRleC5qc1wiO1xyXG5pbXBvcnQgeyBidWlsZEV4dGVuc2lvbkkxOE4gfSBmcm9tIFwiLi9pMThuLmpzXCI7XHJcbmltcG9ydCAqIGFzIG5lc3RzIGZyb20gXCJuZXN0c1wiO1xyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSB7eyBtb2R1bGVzOiB7IG5vZGU6IHsgbmFtZTogc3RyaW5nLCByZWFzb246IHN0cmluZyB9W10sIGNvbW1vbjogeyBuYW1lOiBzdHJpbmcsIHJlYXNvbjogc3RyaW5nIH1bXSwgY3VzdG9tOiB7IHJlYXNvbjogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIGxhenk6IGJvb2xlYW4sIGZpbmRlcjogeyBmaWx0ZXI6IHsgZXhwb3J0OiBib29sZWFuLCBpbjogXCJwcm9wZXJ0aWVzXCIgfCBcInN0cmluZ3NcIiB8IFwicHJvdG90eXBlc1wiLCBieTogW3N0cmluZ1tdLCBzdHJpbmdbXT9dIH0sIHBhdGg6IHsgYmVmb3JlOiBzdHJpbmcgfCBzdHJpbmdbXSwgYWZ0ZXI6IHN0cmluZyB8IHN0cmluZ1tdIH0sIG1hcDogeyBbazogc3RyaW5nXTogc3RyaW5nW10gfSB9IH1bXSB9LCBhYm91dDogeyBuYW1lOiBzdHJpbmcgfCB7IFtrOiBzdHJpbmddOiBzdHJpbmcgfSwgZGVzY3JpcHRpb246IHN0cmluZyB8IHsgW2s6IHN0cmluZ106IHN0cmluZyB9LCBzbHVnOiBzdHJpbmcgfSwgcmVhc29uOiBzdHJpbmcgfX0gY2ZnIFxyXG4gKi9cclxuYXN5bmMgZnVuY3Rpb24gYnVpbGRBUEkoY2ZnKSB7XHJcbiAgY29uc3QgcGVyc2lzdCA9IGF3YWl0IHN0b3JhZ2UuY3JlYXRlUGVyc2lzdE5lc3QoYEV4dGVuc2lvbjtQZXJzaXN0OyR7Y2ZnLmFib3V0LnNsdWd9YCk7XHJcbiAgY29uc3Qgb3V0ID0ge1xyXG4gICAgbW9kdWxlczoge1xyXG4gICAgICBfX2NhY2hlX186IHtcclxuICAgICAgICBjb21tb246IHt9LFxyXG4gICAgICAgIG5vZGU6IHt9LFxyXG4gICAgICAgIGN1c3RvbToge30sXHJcbiAgICAgICAgY3VzdG9tTGF6eToge31cclxuICAgICAgfSxcclxuICAgICAgcmVxdWlyZShuYW1lKSB7XHJcbiAgICAgICAgaWYgKCFkZXYuZW5hYmxlZCkge1xyXG4gICAgICAgICAgaWYgKHR5cGVvZiBvdXQubW9kdWxlcy5fX2NhY2hlX18ubm9kZVtuYW1lXSAhPT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIG91dC5tb2R1bGVzLl9fY2FjaGVfXy5ub2RlW25hbWVdO1xyXG4gICAgICAgICAgaWYgKGNmZz8ubW9kdWxlcz8ubm9kZT8uc29tZT8uKGkgPT4gaS5uYW1lID09PSBuYW1lKSkgcmV0dXJuIG91dC5tb2R1bGVzLl9fY2FjaGVfXy5ub2RlW25hbWVdID0gbW9kdWxlcy5yZXF1aXJlKG5hbWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZXR1cm4gbW9kdWxlcy5yZXF1aXJlKG5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgfSxcclxuICAgICAgY29tbW9uOiBuZXcgUHJveHkoe30sIHtcclxuICAgICAgICBnZXQoXywgcHJvcCkge1xyXG4gICAgICAgICAgaWYgKCFkZXYuZW5hYmxlZCkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIG91dC5tb2R1bGVzLl9fY2FjaGVfXy5jb21tb25bcHJvcF0gIT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBvdXQubW9kdWxlcy5fX2NhY2hlX18uY29tbW9uW3Byb3BdO1xyXG4gICAgICAgICAgICBpZiAoY2ZnPy5tb2R1bGVzPy5jb21tb24/LnNvbWU/LihpID0+IGkubmFtZSA9PT0gcHJvcCkpIHJldHVybiBvdXQubW9kdWxlcy5fX2NhY2hlX18uY29tbW9uW3Byb3BdID0gbW9kdWxlcy5jb21tb25bcHJvcF07XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbW9kdWxlcy5jb21tb25bcHJvcF07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9LFxyXG4gICAgICB9KSxcclxuICAgICAgY3VzdG9tOiBuZXcgUHJveHkoe30sIHtcclxuICAgICAgICBnZXQoXywgcHJvcCkge1xyXG4gICAgICAgICAgaWYgKHR5cGVvZiBvdXQubW9kdWxlcy5fX2NhY2hlX18uY3VzdG9tW3Byb3BdICE9PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gb3V0Lm1vZHVsZXMuX19jYWNoZV9fLmN1c3RvbVtwcm9wXTtcclxuICAgICAgICAgIGxldCBkYXRhID0gY2ZnPy5tb2R1bGVzPy5jdXN0b20/LnNvbWU/LihpID0+IGkubmFtZSA9PT0gcHJvcCk7XHJcbiAgICAgICAgICBpZiAoIWRhdGEpIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgaWYgKGRhdGEubGF6eSkge1xyXG4gICAgICAgICAgICBsZXQgcHJvbSA9IG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgICBsZXQgciA9IGF3YWl0IG1vZHVsZXMud2VicGFjay5sYXp5RmluZEJ5RmluZGVyKGRhdGEuZmluZGVyKTtcclxuICAgICAgICAgICAgICBvdXQubW9kdWxlcy5fX2NhY2hlX18uY3VzdG9tTGF6eVtwcm9wXSA9IHI7XHJcbiAgICAgICAgICAgICAgcmVzb2x2ZShyKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG91dC5tb2R1bGVzLl9fY2FjaGVfXy5jdXN0b21bcHJvcF0gPSB7XHJcbiAgICAgICAgICAgICAgZ2V0KCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb207XHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBnZXQgdmFsdWUoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb3V0Lm1vZHVsZXMuX19jYWNoZV9fLmN1c3RvbUxhenlbcHJvcF07XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IHZhbHVlID0gbW9kdWxlcy53ZWJwYWNrLmZpbmRCeUZpbmRlcihkYXRhLmZpbmRlcik7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZT8udmFsdWUgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgIG91dC5tb2R1bGVzLl9fY2FjaGVfXy5jdXN0b21bcHJvcF0gPSB2YWx1ZSA/IE9iamVjdC5hc3NpZ24odmFsdWUsIHsgdmFsdWUsIGdldCgpIHsgcmV0dXJuIHZhbHVlIH0gfSkgOiBudWxsO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBvdXQubW9kdWxlcy5fX2NhY2hlX18uY3VzdG9tW3Byb3BdID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGNhdGNoIHtcclxuICAgICAgICAgICAgICBvdXQubW9kdWxlcy5fX2NhY2hlX18uY3VzdG9tW3Byb3BdID0gdmFsdWUgPyB7IHZhbHVlLCBnZXQoKSB7IHJldHVybiB2YWx1ZSB9IH0gOiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gb3V0Lm1vZHVsZXMuX19jYWNoZV9fLmN1c3RvbVtwcm9wXTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pLFxyXG4gICAgfSxcclxuICAgIGkxOG4sXHJcbiAgICBleHRlbnNpb246IHtcclxuICAgICAgY29uZmlnOiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGNmZykpLFxyXG4gICAgICBwZXJzaXN0LFxyXG4gICAgICBpMThuOiBhd2FpdCBidWlsZEV4dGVuc2lvbkkxOE4oY2ZnKSxcclxuICAgICAgZXZlbnRzOiBuZXcgQmFzaWNFdmVudEVtaXR0ZXIoKVxyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHJldHVybiBvdXQ7XHJcbn1cclxuXHJcbmNvbnN0IG91dCA9IHtcclxuICBfX2NhY2hlX186IHtcclxuICAgIGluaXRpYWxpemVkOiBmYWxzZSxcclxuICAgIGxvYWRlZDogbmVzdHMubWFrZSh7fSlcclxuICB9LFxyXG4gIHN0b3JhZ2U6IHtcclxuICAgIC8qKiBAdHlwZSB7bmVzdHMuTmVzdH0gKi9cclxuICAgIGluc3RhbGxlZDoge31cclxuICB9LFxyXG4gIGJ1aWxkQVBJLFxyXG4gIGFzeW5jIGluaXQoKSB7XHJcbiAgICBpZiAob3V0Ll9fY2FjaGVfXy5pbml0aWFsaXplZCkgcmV0dXJuO1xyXG4gICAgb3V0Ll9fY2FjaGVfXy5pbml0aWFsaXplZCA9IHRydWU7XHJcbiAgICBvdXQuc3RvcmFnZS5pbnN0YWxsZWQgPSBhd2FpdCBzdG9yYWdlLmNyZWF0ZVBlcnNpc3ROZXN0KFwiRXh0ZW5zaW9ucztJbnN0YWxsZWRcIik7XHJcbiAgfSxcclxuICAvKipcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsIFxyXG4gICAqL1xyXG4gIGFzeW5jIGluc3RhbGwodXJsLCBkZWZhdWx0Q29uZmlnID0ge30pIHtcclxuICAgIGlmICghb3V0Ll9fY2FjaGVfXy5pbml0aWFsaXplZCkgYXdhaXQgb3V0LmluaXQoKTtcclxuICAgIGlmICh1cmwuZW5kc1dpdGgoXCIvXCIpKSB1cmwgPSB1cmwuc2xpY2UoMCwgLTEpO1xyXG4gICAgaWYgKG91dC5zdG9yYWdlLmluc3RhbGxlZC5naG9zdFt1cmxdKSB0aHJvdyBuZXcgRXJyb3IoYFwiJHt1cmx9XCIgZXh0ZW5zaW9uIGlzIGFscmVhZHkgaW5zdGFsbGVkLmApO1xyXG5cclxuICAgIGxldCBtZXRhUmVzcCA9IGF3YWl0IGZldGNoKGAke3VybH0vbWV0YWRhdGEuanNvbmApO1xyXG4gICAgaWYgKG1ldGFSZXNwLnN0YXR1cyAhPT0gMjAwKSB0aHJvdyBuZXcgRXJyb3IoYFwiJHt1cmx9XCIgZXh0ZW5zaW9uIG1ldGFkYXRhIGlzIG5vdCByZXNwb25kZWQgd2l0aCAyMDAgc3RhdHVzIGNvZGUuYCk7XHJcbiAgICBsZXQgbWV0YWRhdGEgPSBhd2FpdCBtZXRhUmVzcC5qc29uKCk7XHJcblxyXG4gICAgbGV0IHJlYWRtZVJlc3AgPSBhd2FpdCBmZXRjaChgJHt1cmx9L3JlYWRtZS5tZGApO1xyXG4gICAgbGV0IHJlYWRtZSA9IHJlYWRtZVJlc3Auc3RhdHVzID09PSAyMDAgPyBhd2FpdCByZWFkbWVSZXNwLnRleHQoKSA6IG51bGw7XHJcblxyXG4gICAgLy8gVE9ETzogU2hvdyBtb2RhbCBmb3IgdXNlciB0byBhY2NlcHQgdGhlIGV4dGVuc2lvbiAodGVybXMsIHByaXZhY3ksIGV0Yy4pXHJcblxyXG4gICAgbGV0IHNvdXJjZVJlc3AgPSBhd2FpdCBmZXRjaChgJHt1cmx9L3NvdXJjZS5qc2ApO1xyXG4gICAgaWYgKHNvdXJjZVJlc3Auc3RhdHVzICE9PSAyMDApIHRocm93IG5ldyBFcnJvcihgXCIke3VybH1cIiBleHRlbnNpb24gc291cmNlIGlzIG5vdCByZXNwb25kZWQgd2l0aCAyMDAgc3RhdHVzIGNvZGUuYCk7XHJcbiAgICBsZXQgc291cmNlID0gYXdhaXQgc291cmNlUmVzcC50ZXh0KCk7XHJcblxyXG5cclxuICAgIG91dC5zdG9yYWdlLmluc3RhbGxlZC5zdG9yZVt1cmxdID0ge1xyXG4gICAgICBtZXRhZGF0YToge1xyXG4gICAgICAgIGN1cnJlbnQ6IG1ldGFkYXRhLFxyXG4gICAgICAgIGxhc3Q6IG1ldGFkYXRhXHJcbiAgICAgIH0sXHJcbiAgICAgIHNvdXJjZSxcclxuICAgICAgcmVhZG1lLFxyXG4gICAgICBjb25maWc6IHtcclxuICAgICAgICBhdXRvVXBkYXRlOiB0cnVlLFxyXG4gICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgLi4uZGVmYXVsdENvbmZpZ1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIG91dC5sb2FkKHVybCk7XHJcbiAgfSxcclxuICBhc3luYyB1bmluc3RhbGwodXJsKSB7XHJcbiAgICBpZiAoIW91dC5fX2NhY2hlX18uaW5pdGlhbGl6ZWQpIGF3YWl0IG91dC5pbml0KCk7XHJcbiAgICBpZiAoIW91dC5zdG9yYWdlLmluc3RhbGxlZC5naG9zdFt1cmxdKSB0aHJvdyBuZXcgRXJyb3IoYFwiJHt1cmx9XCIgZXh0ZW5zaW9uIGlzIG5vdCBpbnN0YWxsZWQuYCk7XHJcblxyXG4gICAgZGVsZXRlIG91dC5zdG9yYWdlLmluc3RhbGxlZC5zdG9yZVt1cmxdO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGF3YWl0IG91dC51bmxvYWQodXJsKTtcclxuICAgIH0gY2F0Y2ggeyB9XHJcbiAgfSxcclxuICBhc3luYyBsb2FkKHVybCkge1xyXG4gICAgaWYgKCFvdXQuX19jYWNoZV9fLmluaXRpYWxpemVkKSBhd2FpdCBvdXQuaW5pdCgpO1xyXG4gICAgaWYgKCFvdXQuc3RvcmFnZS5pbnN0YWxsZWQuZ2hvc3RbdXJsXSkgdGhyb3cgbmV3IEVycm9yKGBcIiR7dXJsfVwiIGV4dGVuc2lvbiBpcyBub3QgaW5zdGFsbGVkLmApO1xyXG4gICAgbGV0IGRhdGEgPSBvdXQuc3RvcmFnZS5pbnN0YWxsZWQuZ2hvc3RbdXJsXTtcclxuXHJcbiAgICBpZiAob3V0Ll9fY2FjaGVfXy5sb2FkZWQuZ2hvc3RbdXJsXSkgdGhyb3cgbmV3IEVycm9yKGBcIiR7dXJsfVwiIGV4dGVuc2lvbiBpcyBhbHJlYWR5IGxvYWRlZC5gKTtcclxuXHJcbiAgICBsZXQgYXBpID0gYXdhaXQgb3V0LmJ1aWxkQVBJKGRhdGEubWV0YWRhdGEpO1xyXG5cclxuICAgIGxldCBldmFsdWF0ZWQgPSBvdXQuZXZhbHVhdGUoZGF0YS5zb3VyY2UsIGFwaSk7XHJcblxyXG4gICAgYXdhaXQgZXZhbHVhdGVkPy5sb2FkPy4oKTtcclxuXHJcbiAgICBvdXQuX19jYWNoZV9fLmxvYWRlZC5zdG9yZVt1cmxdID0ge1xyXG4gICAgICBldmFsdWF0ZWQsXHJcbiAgICAgIGFwaVxyXG4gICAgfTtcclxuICB9LFxyXG4gIGFzeW5jIHVubG9hZCh1cmwpIHtcclxuICAgIGlmICghb3V0Ll9fY2FjaGVfXy5pbml0aWFsaXplZCkgYXdhaXQgb3V0LmluaXQoKTtcclxuICAgIGlmICghb3V0LnN0b3JhZ2UuaW5zdGFsbGVkLmdob3N0W3VybF0pIHRocm93IG5ldyBFcnJvcihgXCIke3VybH1cIiBleHRlbnNpb24gaXMgbm90IGluc3RhbGxlZC5gKTtcclxuXHJcbiAgICBpZiAoIW91dC5fX2NhY2hlX18ubG9hZGVkLmdob3N0W3VybF0pIHRocm93IG5ldyBFcnJvcihgXCIke3VybH1cIiBleHRlbnNpb24gaXMgbm90IGxvYWRlZC5gKTtcclxuXHJcbiAgICBsZXQgeyBldmFsdWF0ZWQgfSA9IG91dC5fX2NhY2hlX18ubG9hZGVkLmdob3N0W3VybF07XHJcblxyXG4gICAgYXdhaXQgZXZhbHVhdGVkPy51bmxvYWQ/LigpO1xyXG5cclxuICAgIGRlbGV0ZSBvdXQuX19jYWNoZV9fLmxvYWRlZC5zdG9yZVt1cmxdO1xyXG4gIH0sXHJcbiAgZXZhbHVhdGUoc291cmNlLCBhcGkpIHtcclxuICAgIGNvbnN0ICRhY29yZCA9IGFwaTtcclxuICAgIHJldHVybiBldmFsKHNvdXJjZSk7XHJcbiAgfSxcclxuICBhc3luYyBsb2FkQWxsKCkge1xyXG4gICAgaWYgKCFvdXQuX19jYWNoZV9fLmluaXRpYWxpemVkKSBhd2FpdCBvdXQuaW5pdCgpO1xyXG4gICAgcmV0dXJuIFByb21pc2UuYWxsKE9iamVjdC5rZXlzKG91dC5zdG9yYWdlLmluc3RhbGxlZC5naG9zdCkubWFwKHVybCA9PiBvdXQubG9hZCh1cmwpKSk7XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgb3V0OyIsICJleHBvcnQgZGVmYXVsdCB7XHJcbiAgcHJvY2VzczogZ2xvYmFsVGhpc1tcIjxQUkVMT0FEX0tFWT5cIl0ucHJvY2VzcyxcclxuICBpc0RldlRvb2xzT3BlbjogZ2xvYmFsVGhpc1tcIjxQUkVMT0FEX0tFWT5cIl0uaXNEZXZUb29sc09wZW5cclxufVxyXG5cclxuIiwgImltcG9ydCBjb21tb24gZnJvbSBcIi4uL21vZHVsZXMvY29tbW9uLmpzXCI7XHJcbmltcG9ydCBwYXRjaGVyIGZyb20gXCIuLi9wYXRjaGVyL2luZGV4LmpzXCI7XHJcblxyXG5jb25zdCBzb2NrZXRzID0gbmV3IFNldCgpO1xyXG5jb25zdCBoYW5kbGVycyA9IG5ldyBNYXAoKTtcclxuXHJcbnBhdGNoZXIuaW5zdGVhZChcclxuICBcImhhbmRsZUNvbm5lY3Rpb25cIixcclxuICBjb21tb24uV2ViU29ja2V0LFxyXG4gIChhcmdzLCBvcmlnKSA9PiB7XHJcbiAgICBjb25zdCB3cyA9IGFyZ3NbMF07XHJcbiAgICBpZiAod3MudXBncmFkZVJlcSgpLnVybCAhPT0gXCIvYWNvcmRcIikgcmV0dXJuIG9yaWcoLi4uYXJncyk7XHJcblxyXG4gICAgc29ja2V0cy5hZGQod3MpO1xyXG5cclxuICAgIHdzLm9uKFwibWVzc2FnZVwiLCBhc3luYyAobXNnKSA9PiB7XHJcbiAgICAgIGxldCBqc29uO1xyXG5cclxuICAgICAgdHJ5IHtcclxuICAgICAgICBqc29uID0gSlNPTi5wYXJzZShtc2cpO1xyXG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShqc29uKSB8fCBqc29uLmxlbmd0aCA8IDEgfHwganNvbi5sZW5ndGggPiAzKVxyXG4gICAgICAgICAgdGhyb3cgXCJBcnJheSBleHBlY3RlZCBhcyBtZXNzYWdlLlwiO1xyXG4gICAgICAgIGlmICh0eXBlb2YganNvblswXSAhPSBcInN0cmluZ1wiKSB0aHJvdyBcIkFycmF5WzBdIG5lZWRzIHRvIGJlIHN0cmluZy5cIjtcclxuICAgICAgICBpZiAodHlwZW9mIGpzb25bMV0gIT0gXCJzdHJpbmdcIikgdGhyb3cgXCJBcnJheVsxXSBuZWVkcyB0byBiZSBzdHJpbmcuXCI7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIHdzLnNlbmQoXHJcbiAgICAgICAgICBKU09OLnN0cmluZ2lmeShbXHJcbiAgICAgICAgICAgIG51bGwsXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBvazogZmFsc2UsXHJcbiAgICAgICAgICAgICAgZXJyb3I6IGAke2Vycn1gLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgXSlcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBbZXZlbnRJZCwgZXZlbnROYW1lLCBldmVudERhdGFdID0ganNvbjtcclxuXHJcbiAgICAgIGNvbnN0IGhhbmRsZXIgPSBoYW5kbGVycy5nZXQoZXZlbnROYW1lKTtcclxuXHJcbiAgICAgIGlmICghaGFuZGxlcilcclxuICAgICAgICByZXR1cm4gd3Muc2VuZChcclxuICAgICAgICAgIEpTT04uc3RyaW5naWZ5KFtcclxuICAgICAgICAgICAgZXZlbnRJZCxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIG9rOiBmYWxzZSxcclxuICAgICAgICAgICAgICBlcnJvcjogYFVuYWJsZSB0byBmaW5kIGhhbmRsZXIuYCxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIF0pXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgbGV0IHJlc3BvbnNlID0gYXdhaXQgaGFuZGxlcihldmVudERhdGEpO1xyXG4gICAgICAgIHdzLnNlbmQoXHJcbiAgICAgICAgICBKU09OLnN0cmluZ2lmeShbXHJcbiAgICAgICAgICAgIGV2ZW50SWQsXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBvazogdHJ1ZSxcclxuICAgICAgICAgICAgICBkYXRhOiByZXNwb25zZSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIF0pXHJcbiAgICAgICAgKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgd3Muc2VuZChcclxuICAgICAgICAgIEpTT04uc3RyaW5naWZ5KFtcclxuICAgICAgICAgICAgZXZlbnRJZCxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIG9rOiBmYWxzZSxcclxuICAgICAgICAgICAgICBlcnJvcjogYCR7ZXJyfWAsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICBdKVxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHdzLm9uKFwiY2xvc2VcIiwgKCkgPT4gc29ja2V0cy5kZWxldGUod3MpKTtcclxuICB9XHJcbik7XHJcblxyXG5mdW5jdGlvbiBzZXQoZXZlbnROYW1lLCBjYWxsYmFjaykge1xyXG4gIGlmICh0eXBlb2YgZXZlbnROYW1lICE9IFwic3RyaW5nXCIpXHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJFdmVudE5hbWUgbmVlZHMgdG8gYmUgYSBzdHJpbmcuXCIpO1xyXG4gIGlmICh0eXBlb2YgY2FsbGJhY2sgIT0gXCJmdW5jdGlvblwiKVxyXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ2FsbGJhY2sgbmVlZHMgdG8gYmUgYSBmdW5jdGlvbi5cIik7XHJcbiAgaWYgKGhhbmRsZXJzLmhhcyhldmVudE5hbWUpKVxyXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiRXZlbnROYW1lIGFscmVhZHkgaW4gdXNlLlwiKTtcclxuICBoYW5kbGVycy5zZXQoZXZlbnROYW1lLCBjYWxsYmFjayk7XHJcbiAgcmV0dXJuICgpID0+IHtcclxuICAgIGhhbmRsZXJzLmRlbGV0ZShldmVudE5hbWUpO1xyXG4gIH07XHJcbn1cclxuZnVuY3Rpb24gdHJpZ2dlcihldmVudE5hbWUsIC4uLmFyZ3MpIHtcclxuICBpZiAoIXNvY2tldEV2ZW50cy5oYXMoZXZlbnROYW1lKSlcclxuICAgIHRocm93IG5ldyBFcnJvcihcIlVuYWJsZSB0byBmaW5kIGhhbmRsZXIhXCIpO1xyXG4gIHJldHVybiBzb2NrZXRFdmVudHMuZ2V0KGV2ZW50TmFtZSkoLi4uYXJncyk7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgc2V0LFxyXG4gIHRyaWdnZXJcclxufVxyXG5cclxuIiwgImV4cG9ydCBkZWZhdWx0IGBcbi5hY29yZC0tbGF5ZXItY29udGFpbmVyey0tdG9wLW9mZnNldDogMHB4O3dpZHRoOjEwMHZ3O2hlaWdodDpjYWxjKDEwMHZoIC0gdmFyKC0tdG9wLW9mZnNldCkpO3otaW5kZXg6OTk5OTk5OTtwb2ludGVyLWV2ZW50czpub25lO3Bvc2l0aW9uOmFic29sdXRlO3RvcDp2YXIoLS10b3Atb2Zmc2V0KTtsZWZ0OjBweH0uYWNvcmQtLWxheWVyLWNvbnRhaW5lciAqe3otaW5kZXg6OTk5OTk5OTk5OTk5OTl9LmFjb3JkLS10b29sdGlwLWxheWVye29wYWNpdHk6MDt0cmFuc2l0aW9uOjUwbXMgbGluZWFyIG9wYWNpdHk7cG9zaXRpb246YWJzb2x1dGU7cG9pbnRlci1ldmVudHM6bm9uZX0uYWNvcmQtLXRvb2x0aXAtbGF5ZXIudmlzaWJsZXtvcGFjaXR5OjE7cG9pbnRlci1ldmVudHM6YWxsfS5hY29yZC0tdG9vbHRpcC52ZXJ0aWNhbHt0cmFuc2Zvcm06dHJhbnNsYXRlWCgtNTAlKX0uYWNvcmQtLXRvb2x0aXAuaG9yaXpvbnRhbHt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtNTAlKX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllcnt3aWR0aDoxMDB2dztoZWlnaHQ6Y2FsYygxMDB2aCAtIHZhcigtLXRvcC1vZmZzZXQpKTtkaXNwbGF5OmZsZXg7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7bGVmdDowO3BvaW50ZXItZXZlbnRzOm5vbmV9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIgLmFjb3JkLS1ub3RpZmljYXRpb257ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOmNvbHVtbjtwb2ludGVyLWV2ZW50czphbGw7dHJhbnNpdGlvbjp0cmFuc2Zvcm0gMjUwbXMgZWFzZS1pbi1vdXQsb3BhY2l0eSAyNTBtcyBlYXNlLWluLW91dDttYXJnaW46NHB4O2JhY2tkcm9wLWZpbHRlcjpibHVyKDE2cHgpIGJyaWdodG5lc3MoMC43NSk7LXdlYmtpdC1hcHAtcmVnaW9uOm5vLWRyYWc7LS1hbmltYXRpb24tc2l6ZTogNTBweH0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllciAuYWNvcmQtLW5vdGlmaWNhdGlvbi5oaWRkZW4sLmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24uY2xvc2luZ3tvcGFjaXR5OjB9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24+LmNvbnRhaW5lcntkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2p1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVuO3BhZGRpbmc6OHB4O2NvbG9yOiNmZmY7bWluLXdpZHRoOjI1MHB4fS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyIC5hY29yZC0tbm90aWZpY2F0aW9uPi5jb250YWluZXI+LmNsb3Nle3dpZHRoOjI0cHg7aGVpZ2h0OjI0cHg7Y29sb3I6I2ZmZjtvcGFjaXR5Oi41O2N1cnNvcjpwb2ludGVyO21hcmdpbi1sZWZ0OjhweDt6LWluZGV4Ojk5OTk5OTk5OX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllciAuYWNvcmQtLW5vdGlmaWNhdGlvbj4uY29udGFpbmVyPi5jbG9zZS5oaWRkZW57ZGlzcGxheTpub25lfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyIC5hY29yZC0tbm90aWZpY2F0aW9uPi5wcm9ncmVzcy1jb250YWluZXJ7d2lkdGg6MTAwJTtoZWlnaHQ6NXB4fS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyIC5hY29yZC0tbm90aWZpY2F0aW9uPi5wcm9ncmVzcy1jb250YWluZXI+LnByb2dyZXNze3dpZHRoOjAlO2hlaWdodDo1cHg7dHJhbnNpdGlvbjp3aWR0aCB2YXIoLS1kdXJhdGlvbikgbGluZWFyO2JhY2tncm91bmQtY29sb3I6dmFyKC0tYmFyLWNvbG9yKX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllciAuYWNvcmQtLW5vdGlmaWNhdGlvbj4ucHJvZ3Jlc3MtY29udGFpbmVyPi5wcm9ncmVzcy5wcm9ncmVzc2luZ3t3aWR0aDoxMDAlfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyIC5hY29yZC0tbm90aWZpY2F0aW9uLnN0eWxlLWluZm97LS1iYXItY29sb3I6ICM0YThmZTF9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24uc3R5bGUtd2FybmluZ3stLWJhci1jb2xvcjogI2ZhYTgxYX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllciAuYWNvcmQtLW5vdGlmaWNhdGlvbi5zdHlsZS1lcnJvcnstLWJhci1jb2xvcjogI2VkNDI0NX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllciAuYWNvcmQtLW5vdGlmaWNhdGlvbi5zdHlsZS1zdWNjZXNzey0tYmFyLWNvbG9yOiAjM2JhNTVkfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyIC5hY29yZC0tbm90aWZpY2F0aW9uLnN0eWxlLWRlZmF1bHR7LS1iYXItY29sb3I6IHdoaXRlc21va2V9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIudG9wLXJpZ2h0e2p1c3RpZnktY29udGVudDpmbGV4LWVuZDthbGlnbi1pdGVtczpmbGV4LXN0YXJ0fS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLnRvcC1yaWdodCAuYWNvcmQtLW5vdGlmaWNhdGlvbi5oaWRkZW57dHJhbnNmb3JtOnRyYW5zbGF0ZSgwLCBjYWxjKHZhcigtLWFuaW1hdGlvbi1zaXplKSAqIC0xKSl9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIudG9wLXJpZ2h0IC5hY29yZC0tbm90aWZpY2F0aW9uLmNsb3Npbmd7dHJhbnNmb3JtOnRyYW5zbGF0ZSgwLCB2YXIoLS1hbmltYXRpb24tc2l6ZSkpfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLnRvcC1sZWZ0e2p1c3RpZnktY29udGVudDpmbGV4LXN0YXJ0O2FsaWduLWl0ZW1zOmZsZXgtc3RhcnR9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIudG9wLWxlZnQgLmFjb3JkLS1ub3RpZmljYXRpb24uaGlkZGVue3RyYW5zZm9ybTp0cmFuc2xhdGUoMCwgY2FsYyh2YXIoLS1hbmltYXRpb24tc2l6ZSkgKiAtMSkpfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLnRvcC1sZWZ0IC5hY29yZC0tbm90aWZpY2F0aW9uLmNsb3Npbmd7dHJhbnNmb3JtOnRyYW5zbGF0ZSgwLCB2YXIoLS1hbmltYXRpb24tc2l6ZSkpfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLmJvdHRvbS1yaWdodHtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1lbmQ7YWxpZ24taXRlbXM6ZmxleC1lbmR9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIuYm90dG9tLXJpZ2h0IC5hY29yZC0tbm90aWZpY2F0aW9uLmhpZGRlbnt0cmFuc2Zvcm06dHJhbnNsYXRlKDAsIHZhcigtLWFuaW1hdGlvbi1zaXplKSl9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIuYm90dG9tLXJpZ2h0IC5hY29yZC0tbm90aWZpY2F0aW9uLmNsb3Npbmd7dHJhbnNmb3JtOnRyYW5zbGF0ZSgwLCBjYWxjKHZhcigtLWFuaW1hdGlvbi1zaXplKSAqIC0xKSl9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIuYm90dG9tLWxlZnR7anVzdGlmeS1jb250ZW50OmZsZXgtc3RhcnQ7YWxpZ24taXRlbXM6ZmxleC1lbmR9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIuYm90dG9tLWxlZnQgLmFjb3JkLS1ub3RpZmljYXRpb24uaGlkZGVue3RyYW5zZm9ybTp0cmFuc2xhdGUoMCwgdmFyKC0tYW5pbWF0aW9uLXNpemUpKX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci5ib3R0b20tbGVmdCAuYWNvcmQtLW5vdGlmaWNhdGlvbi5jbG9zaW5ne3RyYW5zZm9ybTp0cmFuc2xhdGUoMCwgY2FsYyh2YXIoLS1hbmltYXRpb24tc2l6ZSkgKiAtMSkpfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLnRvcC1jZW50ZXJ7anVzdGlmeS1jb250ZW50OmNlbnRlcjthbGlnbi1pdGVtczpmbGV4LXN0YXJ0fS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLnRvcC1jZW50ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24uaGlkZGVue3RyYW5zZm9ybTp0cmFuc2xhdGUoMCwgY2FsYyh2YXIoLS1hbmltYXRpb24tc2l6ZSkgKiAtMSkpfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLnRvcC1jZW50ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24uY2xvc2luZ3t0cmFuc2Zvcm06dHJhbnNsYXRlKDAsIHZhcigtLWFuaW1hdGlvbi1zaXplKSl9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIuYm90dG9tLWNlbnRlcntqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO2FsaWduLWl0ZW1zOmZsZXgtZW5kfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLmJvdHRvbS1jZW50ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24uaGlkZGVue3RyYW5zZm9ybTp0cmFuc2xhdGUoMCwgdmFyKC0tYW5pbWF0aW9uLXNpemUpKX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci5ib3R0b20tY2VudGVyIC5hY29yZC0tbm90aWZpY2F0aW9uLmNsb3Npbmd7dHJhbnNmb3JtOnRyYW5zbGF0ZSgwLCBjYWxjKHZhcigtLWFuaW1hdGlvbi1zaXplKSAqIC0xKSl9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIuY2VudGVye2p1c3RpZnktY29udGVudDpjZW50ZXI7YWxpZ24taXRlbXM6Y2VudGVyfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLmNlbnRlciAuYWNvcmQtLW5vdGlmaWNhdGlvbi5oaWRkZW57dHJhbnNmb3JtOnNjYWxlKDAuNSl9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIuY2VudGVyIC5hY29yZC0tbm90aWZpY2F0aW9uLmNsb3Npbmd7dHJhbnNmb3JtOnNjYWxlKDAuNSl9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIubGVmdC1jZW50ZXJ7anVzdGlmeS1jb250ZW50OmZsZXgtc3RhcnQ7YWxpZ24taXRlbXM6Y2VudGVyfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLmxlZnQtY2VudGVyIC5hY29yZC0tbm90aWZpY2F0aW9uLmhpZGRlbnt0cmFuc2Zvcm06dHJhbnNsYXRlKGNhbGModmFyKC0tYW5pbWF0aW9uLXNpemUpICogLTEpLCAwKX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci5sZWZ0LWNlbnRlciAuYWNvcmQtLW5vdGlmaWNhdGlvbi5jbG9zaW5ne3RyYW5zZm9ybTp0cmFuc2xhdGUodmFyKC0tYW5pbWF0aW9uLXNpemUpLCAwKX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci5yaWdodC1jZW50ZXJ7anVzdGlmeS1jb250ZW50OmZsZXgtZW5kO2FsaWduLWl0ZW1zOmNlbnRlcn0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci5yaWdodC1jZW50ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24uaGlkZGVue3RyYW5zZm9ybTp0cmFuc2xhdGUodmFyKC0tYW5pbWF0aW9uLXNpemUpLCAwKX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci5yaWdodC1jZW50ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24uY2xvc2luZ3t0cmFuc2Zvcm06dHJhbnNsYXRlKGNhbGModmFyKC0tYW5pbWF0aW9uLXNpemUpICogLTEpLCAwKX1gO1xuIiwgImltcG9ydCBkb20gZnJvbSBcIi4uL2RvbS9pbmRleC5qc1wiO1xyXG5pbXBvcnQgZXZlbnRzIGZyb20gXCIuLi9ldmVudHMvaW5kZXguanNcIjtcclxuaW1wb3J0IHdlYnBhY2sgZnJvbSBcIi4uL21vZHVsZXMvd2VicGFjay5qc1wiO1xyXG5cclxuY29uc3QgdG9vbHRpcENsYXNzZXMgPSB3ZWJwYWNrLmZpbmRCeVByb3BlcnRpZXMoXCJ0b29sdGlwQ29udGVudEFsbG93T3ZlcmZsb3dcIiwgXCJ0b29sdGlwXCIpO1xyXG5cclxuY29uc3QgdG9vbHRpcFBvc2l0aW9ucyA9IHtcclxuICB0b3A6IHRvb2x0aXBDbGFzc2VzLnRvb2x0aXBUb3AsXHJcbiAgYm90dG9tOiB0b29sdGlwQ2xhc3Nlcy50b29sdGlwQm90dG9tLFxyXG4gIGxlZnQ6IHRvb2x0aXBDbGFzc2VzLnRvb2x0aXBMZWZ0LFxyXG4gIHJpZ2h0OiB0b29sdGlwQ2xhc3Nlcy50b29sdGlwUmlnaHQsXHJcbn1cclxuXHJcbmNsYXNzIFRvb2x0aXAge1xyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7SFRNTERpdkVsZW1lbnR9IHRhcmdldCBcclxuICAgKiBAcGFyYW0ge3N0cmluZ3xIVE1MRGl2RWxlbWVudH0gY29udGVudFxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKHRhcmdldCwgY29udGVudCwgcG9zaXRpb24gPSBcImF1dG9cIikge1xyXG4gICAgLyoqIEB0eXBlIHtIVE1MRGl2RWxlbWVudH0gKi9cclxuICAgIHRoaXMubGF5ZXJFbGVtZW50ID0gZG9tLnBhcnNlKGBcclxuICAgICAgPGRpdiBjbGFzcz1cImFjb3JkLS10b29sdGlwLWxheWVyXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cIiR7dG9vbHRpcENsYXNzZXMudG9vbHRpcH0gJHt0b29sdGlwQ2xhc3Nlcy50b29sdGlwUHJpbWFyeX0gYWNvcmQtLXRvb2x0aXBcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCIke3Rvb2x0aXBDbGFzc2VzLnRvb2x0aXBQb2ludGVyfSBhY29yZC0tdG9vbHRpcC1wb2ludGVyXCI+PC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiJHt0b29sdGlwQ2xhc3Nlcy50b29sdGlwQ29udGVudH0gYWNvcmQtLXRvb2x0aXAtY29udGVudFwiPjwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIGApO1xyXG4gICAgdGhpcy50b29sdGlwRWxlbWVudCA9IHRoaXMubGF5ZXJFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWNvcmQtLXRvb2x0aXBcIik7XHJcbiAgICB0aGlzLmNvbnRlbnRFbGVtZW50ID0gdGhpcy5sYXllckVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5hY29yZC0tdG9vbHRpcC1jb250ZW50XCIpO1xyXG4gICAgdGhpcy5jb250ZW50ID0gY29udGVudDtcclxuICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG5cclxuICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5wYXVzZWQgPSBmYWxzZTtcclxuXHJcbiAgICBjb25zdCBvbk1vdXNlRW50ZXIgPSAoKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLmRpc2FibGVkIHx8IHRoaXMucGF1c2VkKSByZXR1cm47XHJcbiAgICAgIHRoaXMuc2hvdygpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG9uTW91c2VMZWF2ZSA9ICgpID0+IHtcclxuICAgICAgaWYgKHRoaXMucGF1c2VkKSByZXR1cm47XHJcbiAgICAgIHRoaXMuaGlkZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsIG9uTW91c2VFbnRlcik7XHJcbiAgICB0aGlzLnRhcmdldC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCBvbk1vdXNlTGVhdmUpO1xyXG5cclxuICAgIGxldCB1blBhdGNoT2JzZXJ2ZXIgPSBldmVudHMub24oXHJcbiAgICAgIFwiZG9tLW11dGF0aW9uXCIsXHJcbiAgICAgIC8qKiBAcGFyYW0ge011dGF0aW9uUmVjb3JkfSBtdXQgKi8obXV0KSA9PiB7XHJcbiAgICAgICAgaWYgKG11dC50eXBlID09PSBcImF0dHJpYnV0ZXNcIikge1xyXG4gICAgICAgICAgaWYgKG11dC50YXJnZXQuaXNTYW1lTm9kZSh0aGlzLnRhcmdldCkpIHtcclxuICAgICAgICAgICAgc3dpdGNoIChtdXQuYXR0cmlidXRlTmFtZSkge1xyXG4gICAgICAgICAgICAgIGNhc2UgXCJhY29yZC0tdG9vbHRpcC1kaXNhYmxlZFwiOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRpc2FibGVkID0gdGhpcy50YXJnZXQuZ2V0QXR0cmlidXRlKFwiYWNvcmQtLXRvb2x0aXAtZGlzYWJsZWRcIikgPT09IFwidHJ1ZVwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGNhc2UgXCJhY29yZC0tdG9vbHRpcC1jb250ZW50XCI6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudCA9IHRoaXMudGFyZ2V0LmdldEF0dHJpYnV0ZShcImFjb3JkLS10b29sdGlwLWNvbnRlbnRcIik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgY2FzZSBcImFjb3JkLS10b29sdGlwLXBvc2l0aW9uXCI6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb24gPSB0aGlzLnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJhY29yZC0tdG9vbHRpcC1wb3NpdGlvblwiKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgKVxyXG5cclxuICAgIHRoaXMuZGVzdHJveSA9ICgpID0+IHtcclxuICAgICAgdGhpcy50YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgb25Nb3VzZUVudGVyKTtcclxuICAgICAgdGhpcy50YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgb25Nb3VzZUxlYXZlKTtcclxuICAgICAgdGhpcy5oaWRlKCk7XHJcbiAgICAgIHVuUGF0Y2hPYnNlcnZlcigpO1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGdldCBjb250ZW50KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY29udGVudEVsZW1lbnQuZmlyc3RFbGVtZW50Q2hpbGQ7XHJcbiAgfVxyXG5cclxuICBzZXQgY29udGVudCh2YWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICB0aGlzLmNvbnRlbnRFbGVtZW50LmlubmVySFRNTCA9IHZhbHVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5jb250ZW50RWxlbWVudC5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgICB0aGlzLmNvbnRlbnRFbGVtZW50LmFwcGVuZENoaWxkKHZhbHVlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0YXRpYyBnZXRDb250YWluZXIoKSB7XHJcbiAgICBjb25zdCBhcHBFbG0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbY2xhc3MqPVwibm90RGV2VG9vbHMtXCJdJyk7XHJcblxyXG4gICAgbGV0IGNvbnRhaW5lciA9IGFwcEVsbS5xdWVyeVNlbGVjdG9yKFwiLmFjb3JkLS10b29sdGlwLWNvbnRhaW5lclwiKTtcclxuICAgIGlmICghY29udGFpbmVyKSB7XHJcbiAgICAgIGNvbnRhaW5lciA9IGRvbS5wYXJzZShgPGRpdiBjbGFzcz1cImFjb3JkLS1sYXllci1jb250YWluZXIgYWNvcmQtLXRvb2x0aXAtY29udGFpbmVyXCI+PC9kaXY+YCk7XHJcbiAgICAgIGFwcEVsbS5hcHBlbmRDaGlsZChjb250YWluZXIpO1xyXG4gICAgfVxyXG4gICAgY29udGFpbmVyLnN0eWxlLnNldFByb3BlcnR5KFwiLS10b3Atb2Zmc2V0XCIsIGAke2FwcEVsbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AudG9GaXhlZCgxKX1weGApO1xyXG5cclxuICAgIHJldHVybiBjb250YWluZXI7XHJcbiAgfVxyXG5cclxuICBzaG93KCkge1xyXG4gICAgaWYgKHRoaXMudmlzaWJsZSkgcmV0dXJuO1xyXG4gICAgdGhpcy52aXNpYmxlID0gdHJ1ZTtcclxuXHJcbiAgICBjb25zdCBjb250YWluZXIgPSBUb29sdGlwLmdldENvbnRhaW5lcigpO1xyXG5cclxuICAgIGlmICh0aGlzLnBvc2l0aW9uID09PSBcImF1dG9cIikge1xyXG4gICAgICB0aGlzLmNhbGN1bGF0ZVBvc2l0aW9uKFxyXG4gICAgICAgIHRoaXMuY2FuU2hvd0F0VG9wID8gXCJ0b3BcIlxyXG4gICAgICAgICAgOiB0aGlzLmNhblNob3dBdEJvdHRvbSA/IFwiYm90dG9tXCJcclxuICAgICAgICAgICAgOiB0aGlzLmNhblNob3dBdExlZnQgPyBcImxlZnRcIlxyXG4gICAgICAgICAgICAgIDogdGhpcy5jYW5TaG93QXRSaWdodCA/IFwicmlnaHRcIlxyXG4gICAgICAgICAgICAgICAgOiBcInRvcFwiXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmNhbGN1bGF0ZVBvc2l0aW9uKHRoaXMucG9zaXRpb24pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5sYXllckVsZW1lbnQpO1xyXG4gICAgdGhpcy5sYXllckVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInZpc2libGVcIik7XHJcbiAgfVxyXG5cclxuICBjYWxjdWxhdGVQb3NpdGlvbihwb3NpdGlvbikge1xyXG4gICAgY29uc3QgYm91bmRpbmdSZWN0ID0gdGhpcy50YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblxyXG4gICAgdGhpcy5sYXllckVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSguLi5PYmplY3QudmFsdWVzKHRvb2x0aXBQb3NpdGlvbnMpKTtcclxuICAgIHRoaXMudG9vbHRpcEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcInZlcnRpY2FsXCIsIFwiaG9yaXpvbnRhbFwiKTtcclxuXHJcbiAgICBzd2l0Y2ggKHBvc2l0aW9uKSB7XHJcbiAgICAgIGNhc2UgXCJ0b3BcIjoge1xyXG4gICAgICAgIHRoaXMubGF5ZXJFbGVtZW50LnN0eWxlLnRvcCA9IGAke2JvdW5kaW5nUmVjdC50b3AgLSB0aGlzLnRhcmdldC5vZmZzZXRIZWlnaHQgLSAxMH1weGA7XHJcbiAgICAgICAgdGhpcy5sYXllckVsZW1lbnQuc3R5bGUubGVmdCA9IGAke2JvdW5kaW5nUmVjdC5sZWZ0fXB4YDtcclxuICAgICAgICB0aGlzLmxheWVyRWxlbWVudC5jbGFzc0xpc3QuYWRkKHRvb2x0aXBQb3NpdGlvbnMudG9wKTtcclxuICAgICAgICB0aGlzLnRvb2x0aXBFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJ2ZXJ0aWNhbFwiKTtcclxuICAgICAgICB0aGlzLmNlbnRlclBvc2l0aW9uKFwiaG9yaXpvbnRhbFwiKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlIFwiYm90dG9tXCI6IHtcclxuICAgICAgICB0aGlzLmxheWVyRWxlbWVudC5zdHlsZS50b3AgPSBgJHtib3VuZGluZ1JlY3QudG9wICsgdGhpcy50YXJnZXQub2Zmc2V0SGVpZ2h0ICsgMTB9cHhgO1xyXG4gICAgICAgIHRoaXMubGF5ZXJFbGVtZW50LnN0eWxlLmxlZnQgPSBgJHtib3VuZGluZ1JlY3QubGVmdH1weGA7XHJcbiAgICAgICAgdGhpcy5sYXllckVsZW1lbnQuY2xhc3NMaXN0LmFkZCh0b29sdGlwUG9zaXRpb25zLmJvdHRvbSk7XHJcbiAgICAgICAgdGhpcy50b29sdGlwRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwidmVydGljYWxcIik7XHJcbiAgICAgICAgdGhpcy5jZW50ZXJQb3NpdGlvbihcImhvcml6b250YWxcIik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSBcImxlZnRcIjoge1xyXG4gICAgICAgIHRoaXMubGF5ZXJFbGVtZW50LnN0eWxlLnRvcCA9IGAke2JvdW5kaW5nUmVjdC50b3B9cHhgO1xyXG4gICAgICAgIHRoaXMubGF5ZXJFbGVtZW50LnN0eWxlLmxlZnQgPSBgJHtib3VuZGluZ1JlY3QubGVmdCAtIHRoaXMudGFyZ2V0Lm9mZnNldFdpZHRoIC0gMTB9cHhgO1xyXG4gICAgICAgIHRoaXMubGF5ZXJFbGVtZW50LmNsYXNzTGlzdC5hZGQodG9vbHRpcFBvc2l0aW9ucy5sZWZ0KTtcclxuICAgICAgICB0aGlzLnRvb2x0aXBFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJob3Jpem9udGFsXCIpO1xyXG4gICAgICAgIHRoaXMuY2VudGVyUG9zaXRpb24oXCJ2ZXJ0aWNhbFwiKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlIFwicmlnaHRcIjoge1xyXG4gICAgICAgIHRoaXMubGF5ZXJFbGVtZW50LnN0eWxlLnRvcCA9IGAke2JvdW5kaW5nUmVjdC50b3B9cHhgO1xyXG4gICAgICAgIHRoaXMubGF5ZXJFbGVtZW50LnN0eWxlLmxlZnQgPSBgJHtib3VuZGluZ1JlY3QubGVmdCArIHRoaXMudGFyZ2V0Lm9mZnNldFdpZHRoICsgMTB9cHhgO1xyXG4gICAgICAgIHRoaXMubGF5ZXJFbGVtZW50LmNsYXNzTGlzdC5hZGQodG9vbHRpcFBvc2l0aW9ucy5yaWdodCk7XHJcbiAgICAgICAgdGhpcy50b29sdGlwRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiaG9yaXpvbnRhbFwiKTtcclxuICAgICAgICB0aGlzLmNlbnRlclBvc2l0aW9uKFwidmVydGljYWxcIik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNlbnRlclBvc2l0aW9uKGRpcmVjdGlvbikge1xyXG4gICAgc3dpdGNoIChkaXJlY3Rpb24pIHtcclxuICAgICAgY2FzZSBcImhvcml6b250YWxcIjoge1xyXG4gICAgICAgIGNvbnN0IGNlbnRlciA9IHRoaXMudGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQgKyAodGhpcy50YXJnZXQub2Zmc2V0V2lkdGggLyAyKTtcclxuICAgICAgICB0aGlzLmxheWVyRWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShcImxlZnRcIiwgYCR7Y2VudGVyIC0gKHRoaXMubGF5ZXJFbGVtZW50Lm9mZnNldFdpZHRoIC8gMil9cHhgKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlIFwidmVydGljYWxcIjoge1xyXG4gICAgICAgIGNvbnN0IGNlbnRlciA9IHRoaXMudGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCArICh0aGlzLnRhcmdldC5vZmZzZXRIZWlnaHQgLyAyKTtcclxuICAgICAgICB0aGlzLmxheWVyRWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShcInRvcFwiLCBgJHtjZW50ZXIgLSAodGhpcy5sYXllckVsZW1lbnQub2Zmc2V0SGVpZ2h0IC8gMil9cHhgKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaGlkZSgpIHtcclxuICAgIGlmICghdGhpcy52aXNpYmxlKSByZXR1cm47XHJcbiAgICB0aGlzLnZpc2libGUgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLmxheWVyRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwidmlzaWJsZVwiKTtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICB0aGlzLmxheWVyRWxlbWVudC5yZW1vdmUoKTtcclxuICAgIH0sIDUwKTtcclxuICB9XHJcblxyXG4gIGdldCBjYW5TaG93QXRUb3AoKSB7IHJldHVybiB0aGlzLnRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgLSB0aGlzLmxheWVyRWxlbWVudC5vZmZzZXRIZWlnaHQgPj0gMDsgfVxyXG4gIGdldCBjYW5TaG93QXRCb3R0b20oKSB7IHJldHVybiB0aGlzLnRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgKyB0aGlzLnRhcmdldC5vZmZzZXRIZWlnaHQgKyB0aGlzLmxheWVyRWxlbWVudC5vZmZzZXRIZWlnaHQgPD0gd2luZG93LmlubmVySGVpZ2h0OyB9XHJcbiAgZ2V0IGNhblNob3dBdExlZnQoKSB7IHJldHVybiB0aGlzLnRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0IC0gdGhpcy5sYXllckVsZW1lbnQub2Zmc2V0V2lkdGggPj0gMDsgfVxyXG4gIGdldCBjYW5TaG93QXRSaWdodCgpIHsgcmV0dXJuIHRoaXMudGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQgKyB0aGlzLnRhcmdldC5vZmZzZXRXaWR0aCArIHRoaXMubGF5ZXJFbGVtZW50Lm9mZnNldFdpZHRoIDw9IHdpbmRvdy5pbm5lcldpZHRoOyB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZSh0YXJnZXQsIGNvbnRlbnQsIHBvc2l0aW9uID0gXCJhdXRvXCIpIHtcclxuICByZXR1cm4gbmV3IFRvb2x0aXAodGFyZ2V0LCBjb250ZW50LCBwb3NpdGlvbik7XHJcbn1cclxuXHJcbmRvbS5wYXRjaChcclxuICBcIlthY29yZC0tdG9vbHRpcC1jb250ZW50XVwiLFxyXG4gIChlbG0pID0+IHtcclxuICAgIGxldCB0b29sdGlwID0gY3JlYXRlKGVsbSwgZWxtLmdldEF0dHJpYnV0ZShcImFjb3JkLS10b29sdGlwLWNvbnRlbnRcIiksIGVsbS5nZXRBdHRyaWJ1dGUoXCJhY29yZC0tdG9vbHRpcC1wb3NpdGlvblwiKSk7XHJcbiAgICB0b29sdGlwLmRpc2FibGVkID0gZWxtLmdldEF0dHJpYnV0ZShcImFjb3JkLS10b29sdGlwLWRpc2FibGVkXCIpID09PSBcInRydWVcIjtcclxuXHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICB0b29sdGlwLmRlc3Ryb3koKTtcclxuICAgIH1cclxuICB9LFxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgeyBjcmVhdGUgfTsiLCAiaW1wb3J0IGRvbSBmcm9tIFwiLi4vZG9tL2luZGV4LmpzXCI7XHJcbmltcG9ydCB1dGlscyBmcm9tIFwiLi4vdXRpbHMvaW5kZXguanNcIjtcclxuXHJcbmNvbnN0IHZhbGlkUG9zaXRpb25zID0gW1xyXG4gIFwidG9wLXJpZ2h0XCIsXHJcbiAgXCJ0b3AtbGVmdFwiLFxyXG4gIFwiYm90dG9tLXJpZ2h0XCIsXHJcbiAgXCJib3R0b20tbGVmdFwiLFxyXG4gIFwidG9wLWNlbnRlclwiLFxyXG4gIFwiYm90dG9tLWNlbnRlclwiLFxyXG4gIFwiY2VudGVyXCIsXHJcbiAgXCJsZWZ0LWNlbnRlclwiLFxyXG4gIFwicmlnaHQtY2VudGVyXCJcclxuXVxyXG5cclxuZnVuY3Rpb24gZ2V0Q29udGFpbmVyKHBvc2l0aW9uKSB7XHJcbiAgaWYgKCF2YWxpZFBvc2l0aW9ucy5pbmNsdWRlcyhwb3NpdGlvbikpIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBwb3NpdGlvbiBcIiR7cG9zaXRpb259XCIuIFZhbGlkIHBvc2l0aW9ucyBhcmU6ICR7dmFsaWRQb3NpdGlvbnMuam9pbihcIiwgXCIpfWApO1xyXG4gIGNvbnN0IGFwcEVsbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tjbGFzcyo9XCJub3RBcHBBc2lkZVBhbmVsLVwiXScpO1xyXG5cclxuICBsZXQgdG9wQ29udGFpbmVyID0gYXBwRWxtLnF1ZXJ5U2VsZWN0b3IoXCIuYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci1jb250YWluZXJcIik7XHJcbiAgaWYgKCF0b3BDb250YWluZXIpIHtcclxuICAgIHRvcENvbnRhaW5lciA9IGRvbS5wYXJzZShgPGRpdiBjbGFzcz1cImFjb3JkLS1sYXllci1jb250YWluZXIgYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci1jb250YWluZXJcIj48L2Rpdj5gKTtcclxuICAgIGFwcEVsbS5hcHBlbmRDaGlsZCh0b3BDb250YWluZXIpO1xyXG4gIH1cclxuICB0b3BDb250YWluZXIuc3R5bGUuc2V0UHJvcGVydHkoXCItLXRvcC1vZmZzZXRcIiwgYCR7YXBwRWxtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcC50b0ZpeGVkKDEpfXB4YCk7XHJcblxyXG4gIGxldCBwb3NpdGlvbkNvbnRhaW5lciA9IHRvcENvbnRhaW5lci5xdWVyeVNlbGVjdG9yKGAuYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci4ke3Bvc2l0aW9ufWApO1xyXG4gIGlmICghcG9zaXRpb25Db250YWluZXIpIHtcclxuICAgIHBvc2l0aW9uQ29udGFpbmVyID0gZG9tLnBhcnNlKGA8ZGl2IGNsYXNzPVwiYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllciAke3Bvc2l0aW9ufVwiPjwvZGl2PmApO1xyXG4gICAgdG9wQ29udGFpbmVyLmFwcGVuZENoaWxkKHBvc2l0aW9uQ29udGFpbmVyKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBwb3NpdGlvbkNvbnRhaW5lcjtcclxufVxyXG5cclxuZnVuY3Rpb24gc2hvdyhjb250ZW50LCB7XHJcbiAgc3R5bGUgPSBcImRlZmF1bHRcIixcclxuICB0aW1lb3V0ID0gMTAwMDAsXHJcbiAgcG9zaXRpb24gPSBcInRvcC1yaWdodFwiLFxyXG4gIGNsb3NhYmxlID0gdHJ1ZSxcclxuICBvbkNsaWNrID0gbnVsbCxcclxuICBvbkNsb3NlID0gbnVsbFxyXG59ID0ge30pIHtcclxuICBjb25zdCBjb250YWluZXIgPSBnZXRDb250YWluZXIocG9zaXRpb24pO1xyXG5cclxuICBjb25zdCBub3RpZkVsbSA9IGRvbS5wYXJzZShgXHJcbiAgICA8ZGl2IGNsYXNzPVwiYWNvcmQtLW5vdGlmaWNhdGlvbiBzdHlsZS0ke3N0eWxlfSBoaWRkZW5cIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250ZW50XCI+PC9kaXY+XHJcbiAgICAgICAgICAgIDxzdmcgY2xhc3M9XCJjbG9zZSAkeyFjbG9zYWJsZSA/IFwiaGlkZGVuXCIgOiBcIlwifVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCI+XHJcbiAgICAgICAgICAgICAgICA8cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk0xMiAxMC41ODZsNC45NS00Ljk1IDEuNDE0IDEuNDE0LTQuOTUgNC45NSA0Ljk1IDQuOTUtMS40MTQgMS40MTQtNC45NS00Ljk1LTQuOTUgNC45NS0xLjQxNC0xLjQxNCA0Ljk1LTQuOTUtNC45NS00Ljk1TDcuMDUgNS42MzZ6XCIvPlxyXG4gICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZ3Jlc3MtY29udGFpbmVyXCIgc3R5bGU9XCItLWR1cmF0aW9uOiAke3RpbWVvdXR9bXM7XCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9ncmVzc1wiPjwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgYCk7XHJcblxyXG4gIG5vdGlmRWxtLnF1ZXJ5U2VsZWN0b3IoXCIuY29udGVudFwiKS5pbm5lckhUTUwgPSBjb250ZW50O1xyXG5cclxuICBsZXQgY2xvc2VkID0gZmFsc2U7XHJcbiAgZnVuY3Rpb24gY2xvc2UoY2xvc2VUeXBlKSB7XHJcbiAgICBpZiAoY2xvc2VkKSByZXR1cm47XHJcbiAgICBjbG9zZWQgPSB0cnVlO1xyXG5cclxuICAgIG5vdGlmRWxtLmNsYXNzTGlzdC5hZGQoXCJjbG9zaW5nXCIpO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIG5vdGlmRWxtLnJlbW92ZSgpO1xyXG4gICAgfSwgMjc1KTtcclxuICAgIG9uQ2xvc2U/LihjbG9zZVR5cGUpO1xyXG4gIH1cclxuXHJcbiAgaWYgKHR5cGVvZiBvbkNsaWNrID09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgbm90aWZFbG0uY2xhc3NMaXN0LmFkZChcImNsaWNrYWJsZVwiKTtcclxuICAgIG5vdGlmRWxtLm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgIG9uQ2xpY2soY2xvc2UpO1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHV0aWxzLmlmRXhpc3RzKG5vdGlmRWxtLnF1ZXJ5U2VsZWN0b3IoXCIuY2xvc2VcIiksIChlbG0pID0+IHtcclxuICAgIGVsbS5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgICBjbG9zZShcInVzZXJcIik7XHJcbiAgICB9O1xyXG4gIH0pO1xyXG5cclxuICBjb250YWluZXIucHJlcGVuZChub3RpZkVsbSk7XHJcbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcclxuICAgIG5vdGlmRWxtLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XHJcbiAgICBub3RpZkVsbS5xdWVyeVNlbGVjdG9yKFwiLnByb2dyZXNzXCIpLmNsYXNzTGlzdC5hZGQoXCJwcm9ncmVzc2luZ1wiKTtcclxuICB9KTtcclxuXHJcbiAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICBjbG9zZShcInRpbWVvdXRcIik7XHJcbiAgfSwgdGltZW91dCk7XHJcblxyXG4gIHJldHVybiAoKSA9PiB7XHJcbiAgICBjbG9zZShcImZvcmNlXCIpO1xyXG4gIH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBzaG93OiBPYmplY3QuYXNzaWduKHNob3csIHtcclxuICAgIGluZm86IChodG1sLCBvYmogPSB7fSkgPT4gc2hvdyhodG1sLCB7IC4uLm9iaiwgc3R5bGU6IFwiaW5mb1wiIH0pLFxyXG4gICAgZXJyb3I6IChodG1sLCBvYmogPSB7fSkgPT4gc2hvdyhodG1sLCB7IC4uLm9iaiwgc3R5bGU6IFwiZXJyb3JcIiB9KSxcclxuICAgIHdhcm5pbmc6IChodG1sLCBvYmogPSB7fSkgPT4gc2hvdyhodG1sLCB7IC4uLm9iaiwgc3R5bGU6IFwid2FybmluZ1wiIH0pLFxyXG4gICAgc3VjY2VzczogKGh0bWwsIG9iaiA9IHt9KSA9PiBzaG93KGh0bWwsIHsgLi4ub2JqLCBzdHlsZTogXCJzdWNjZXNzXCIgfSksXHJcbiAgfSksXHJcbn07IiwgImltcG9ydCB3ZWJwYWNrIGZyb20gXCIuLi9tb2R1bGVzL3dlYnBhY2suanNcIjtcclxuaW1wb3J0IHBhdGNoZXIgZnJvbSBcIi4uL3BhdGNoZXIvaW5kZXguanNcIjtcclxuaW1wb3J0IGxvZ2dlciBmcm9tIFwiLi4vdXRpbHMvbG9nZ2VyLmpzXCI7XHJcblxyXG5pbXBvcnQgY29tbW9uIGZyb20gXCIuLi9tb2R1bGVzL2NvbW1vbi5qc1wiO1xyXG5pbXBvcnQgeyBmaW5kZXJNYXAgfSBmcm9tIFwiLi4vbW9kdWxlcy9yYXcvY29tcGxleC1maW5kZXIuanNcIjtcclxuY29uc3QgeyBSZWFjdCB9ID0gY29tbW9uO1xyXG5cclxubGV0IGlzUmVhZHkgPSBmYWxzZTtcclxuXHJcbmNvbnN0IENvbXBvbmVudHMgPSAoKCkgPT4ge1xyXG4gIGNvbnN0IG91dCA9IHt9O1xyXG4gIGNvbnN0IGNvbXBvbmVudE1hcCA9IHtcclxuICAgIHNlcGFyYXRvcjogXCJTZXBhcmF0b3JcIixcclxuICAgIGNoZWNrYm94OiBcIkNoZWNrYm94SXRlbVwiLFxyXG4gICAgcmFkaW86IFwiUmFkaW9JdGVtXCIsXHJcbiAgICBjb250cm9sOiBcIkNvbnRyb2xJdGVtXCIsXHJcbiAgICBncm91cHN0YXJ0OiBcIkdyb3VwXCIsXHJcbiAgICBjdXN0b21pdGVtOiBcIkl0ZW1cIlxyXG4gIH07XHJcblxyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBtb2R1bGVJZCA9IE9iamVjdC5lbnRyaWVzKHdlYnBhY2sucmVxdWlyZS5tKS5maW5kKChbLCBtXSkgPT4gbT8udG9TdHJpbmcoKS5pbmNsdWRlcyhcIm1lbnVpdGVtY2hlY2tib3hcIikpWzBdO1xyXG4gICAgY29uc3QgY29udGV4dE1lbnVNb2R1bGUgPSB3ZWJwYWNrLmZpbmQoKF8sIGlkeCkgPT4gaWR4ID09IG1vZHVsZUlkKS5leHBvcnRzO1xyXG4gICAgY29uc3QgcmF3TWF0Y2hlcyA9IHdlYnBhY2sucmVxdWlyZS5tW21vZHVsZUlkXS50b1N0cmluZygpLm1hdGNoQWxsKC9pZlxcKFxcdytcXC50eXBlPT09XFx3K1xcLihcXHcrKVxcKS4rP3R5cGU6XCIoLis/KVwiL2cpO1xyXG5cclxuICAgIG91dC5NZW51ID0gT2JqZWN0LnZhbHVlcyhjb250ZXh0TWVudU1vZHVsZSkuZmluZCh2ID0+IHYudG9TdHJpbmcoKS5pbmNsdWRlcyhcIi5pc1VzaW5nS2V5Ym9hcmROYXZpZ2F0aW9uXCIpKTtcclxuXHJcbiAgICBbLi4ucmF3TWF0Y2hlc10uZm9yRWFjaCgoWywgaWQsIHR5cGVdKSA9PiB7XHJcbiAgICAgIG91dFtjb21wb25lbnRNYXBbdHlwZV1dID0gY29udGV4dE1lbnVNb2R1bGVbaWRdO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXNSZWFkeSA9IE9iamVjdC52YWx1ZXMoY29tcG9uZW50TWFwKS5ldmVyeShrID0+IG91dFtrXSkgJiYgISFvdXQuTWVudTtcclxuICB9IGNhdGNoIChlcnIpIHtcclxuICAgIGlzUmVhZHkgPSBmYWxzZTtcclxuICAgIGxvZ2dlci5lcnJvcihcIkZhaWxlZCB0byBsb2FkIGNvbnRleHQgbWVudSBjb21wb25lbnRzXCIsIGVycik7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gb3V0O1xyXG59KSgpO1xyXG5cclxuY29uc3QgQWN0aW9ucyA9ICgoKSA9PiB7XHJcbiAgbGV0IG9nTW9kdWxlID0gd2VicGFjay5maWx0ZXIobSA9PiBPYmplY3QudmFsdWVzKG0pLnNvbWUodiA9PiB0eXBlb2YgdiA9PT0gXCJmdW5jdGlvblwiICYmIHYudG9TdHJpbmcoKS5pbmNsdWRlcyhcIkNPTlRFWFRfTUVOVV9DTE9TRVwiKSkpLmZpbmQobSA9PiBtLmV4cG9ydHMgIT09IHdpbmRvdykuZXhwb3J0c1xyXG4gIGNvbnN0IG91dCA9IGZpbmRlck1hcChvZ01vZHVsZSwge1xyXG4gICAgY2xvc2U6IFtcIkNPTlRFWFRfTUVOVV9DTE9TRVwiXSxcclxuICAgIG9wZW46IFtcInJlbmRlckxhenlcIl1cclxuICB9KTtcclxuICBpc1JlYWR5ID0gaXNSZWFkeSAmJiAhIW91dC5jbG9zZSAmJiAhIW91dC5vcGVuO1xyXG4gIHJldHVybiBvdXQ7XHJcbn0pKCk7XHJcblxyXG5cclxuY2xhc3MgTWVudVBhdGNoZXIge1xyXG4gIHN0YXRpYyBNQVhfUEFUQ0hfSVRFUkFUSU9OUyA9IDE2O1xyXG4gIHN0YXRpYyBwYXRjaGVzID0gbmV3IE1hcCgpO1xyXG4gIHN0YXRpYyBzdWJQYXRjaGVzID0gbmV3IFdlYWtNYXAoKTtcclxuXHJcbiAgc3RhdGljIGluaXRpYWxpemUoKSB7XHJcbiAgICBpZiAoIWlzUmVhZHkpIHJldHVybiBsb2dnZXIud2FybihcIlVuYWJsZSB0byBsb2FkIGNvbnRleHQgbWVudS5cIik7XHJcblxyXG4gICAgY29uc3QgbW9kdWxlVG9QYXRjaCA9IHdlYnBhY2suZmlsdGVyKG0gPT4gT2JqZWN0LnZhbHVlcyhtKS5zb21lKHYgPT4gdHlwZW9mIHYgPT09IFwiZnVuY3Rpb25cIiAmJiB2LnRvU3RyaW5nKCkuaW5jbHVkZXMoXCJDT05URVhUX01FTlVfQ0xPU0VcIikpKS5maW5kKG0gPT4gbS5leHBvcnRzICE9PSB3aW5kb3cpLmV4cG9ydHM7XHJcbiAgICBjb25zdCBrZXlUb1BhdGNoID0gT2JqZWN0LmtleXMobW9kdWxlVG9QYXRjaCkuZmluZChrID0+IG1vZHVsZVRvUGF0Y2hba10/Lmxlbmd0aCA9PT0gMyk7XHJcblxyXG4gICAgY29uc29sZS5sb2cobW9kdWxlVG9QYXRjaCwga2V5VG9QYXRjaCk7XHJcblxyXG4gICAgcGF0Y2hlci5iZWZvcmUoXHJcbiAgICAgIGtleVRvUGF0Y2gsXHJcbiAgICAgIG1vZHVsZVRvUGF0Y2gsXHJcbiAgICAgIGZ1bmN0aW9uIChtZXRob2RBcmdzKSB7XHJcbiAgICAgICAgY29uc3QgcHJvbWlzZSA9IG1ldGhvZEFyZ3NbMV07XHJcbiAgICAgICAgbWV0aG9kQXJnc1sxXSA9IGFzeW5jIGZ1bmN0aW9uICguLi5hcmdzKSB7XHJcbiAgICAgICAgICBjb25zdCByZW5kZXIgPSBhd2FpdCBwcm9taXNlLmNhbGwodGhpcywgLi4uYXJncyk7XHJcblxyXG4gICAgICAgICAgcmV0dXJuIChwcm9wcykgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCByZXMgPSByZW5kZXIocHJvcHMpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHJlcz8ucHJvcHMubmF2SWQpIHtcclxuICAgICAgICAgICAgICBNZW51UGF0Y2hlci5leGVjdXRlUGF0Y2hlcyhyZXMucHJvcHMubmF2SWQsIHJlcywgcHJvcHMpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiByZXM/LnR5cGUgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgICAgICAgIE1lbnVQYXRjaGVyLnBhdGNoUmVjdXJzaXZlKHJlcywgXCJ0eXBlXCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG1ldGhvZEFyZ3M7XHJcbiAgICAgIH1cclxuICAgIClcclxuICB9XHJcblxyXG4gIHN0YXRpYyBwYXRjaFJlY3Vyc2l2ZSh0YXJnZXQsIG1ldGhvZCwgaXRlcmF0aW9uID0gMCkge1xyXG4gICAgaWYgKGl0ZXJhdGlvbiA+PSB0aGlzLk1BWF9QQVRDSF9JVEVSQVRJT05TKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgcHJveHlGdW5jdGlvbiA9IHRoaXMuc3ViUGF0Y2hlcy5nZXQodGFyZ2V0W21ldGhvZF0pID8/ICgoKSA9PiB7XHJcbiAgICAgIGNvbnN0IG9yaWdpbmFsRnVuY3Rpb24gPSB0YXJnZXRbbWV0aG9kXTtcclxuICAgICAgY29uc3QgZGVwdGggPSArK2l0ZXJhdGlvbjtcclxuICAgICAgZnVuY3Rpb24gcGF0Y2goLi4uYXJncykge1xyXG4gICAgICAgIGNvbnN0IHJlcyA9IG9yaWdpbmFsRnVuY3Rpb24uY2FsbCh0aGlzLCAuLi5hcmdzKTtcclxuXHJcbiAgICAgICAgaWYgKCFyZXMpIHJldHVybiByZXM7XHJcblxyXG4gICAgICAgIGNvbnN0IG5hdklkID0gcmVzLnByb3BzPy5uYXZJZCA/PyByZXMucHJvcHM/LmNoaWxkcmVuPy5wcm9wcz8ubmF2SWQ7XHJcbiAgICAgICAgaWYgKG5hdklkKSB7XHJcbiAgICAgICAgICBNZW51UGF0Y2hlci5leGVjdXRlUGF0Y2hlcyhuYXZJZCwgcmVzLCBhcmdzWzBdKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29uc3QgbGF5ZXIgPSByZXMucHJvcHMuY2hpbGRyZW4gPyByZXMucHJvcHMuY2hpbGRyZW4gOiByZXM7XHJcblxyXG4gICAgICAgICAgaWYgKHR5cGVvZiBsYXllcj8udHlwZSA9PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICAgICAgTWVudVBhdGNoZXIucGF0Y2hSZWN1cnNpdmUobGF5ZXIsIFwidHlwZVwiLCBkZXB0aCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBwYXRjaC5fX29yaWdpbmFsX18gPSBvcmlnaW5hbEZ1bmN0aW9uO1xyXG4gICAgICBPYmplY3QuYXNzaWduKHBhdGNoLCBvcmlnaW5hbEZ1bmN0aW9uKTtcclxuICAgICAgdGhpcy5zdWJQYXRjaGVzLnNldChvcmlnaW5hbEZ1bmN0aW9uLCBwYXRjaCk7XHJcblxyXG4gICAgICByZXR1cm4gcGF0Y2g7XHJcbiAgICB9KSgpO1xyXG5cclxuICAgIHRhcmdldFttZXRob2RdID0gcHJveHlGdW5jdGlvbjtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBleGVjdXRlUGF0Y2hlcyhpZCwgcmVzLCBwcm9wcykge1xyXG4gICAgaWYgKCF0aGlzLnBhdGNoZXMuaGFzKGlkKSkgcmV0dXJuO1xyXG5cclxuICAgIHRoaXMucGF0Y2hlcy5nZXQoaWQpLmZvckVhY2gocGF0Y2ggPT4ge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIHBhdGNoKHJlcywgcHJvcHMpO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBsb2dnZXIuZXJyb3IoXCJGYWlsZWQgdG8gcGF0Y2ggY29udGV4dCBtZW51XCIsIHBhdGNoLCBlcnIpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuXHJcbk1lbnVQYXRjaGVyLmluaXRpYWxpemUoKTtcclxuXHJcblxyXG4vLyBDb3BpZWQgZnJvbSBiZCdzIHNvdXJjZVxyXG5mdW5jdGlvbiBidWlsZEl0ZW0ocHJvcHMpIHtcclxuICBjb25zdCB7IHR5cGUgfSA9IHByb3BzO1xyXG4gIGlmICh0eXBlID09PSBcInNlcGFyYXRvclwiKSByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChDb21wb25lbnRzLlNlcGFyYXRvcik7XHJcblxyXG4gIGxldCBjb21wb25lbnQgPSBDb21wb25lbnRzLkl0ZW07XHJcbiAgaWYgKHR5cGUgPT09IFwic3VibWVudVwiKSB7XHJcbiAgICBpZiAoIXByb3BzLmNoaWxkcmVuKSBwcm9wcy5jaGlsZHJlbiA9IGJ1aWxkTWVudUNoaWxkcmVuKHByb3BzLnJlbmRlciB8fCBwcm9wcy5pdGVtcyk7XHJcbiAgfSBlbHNlIGlmICh0eXBlID09PSBcInRvZ2dsZVwiIHx8IHR5cGUgPT09IFwicmFkaW9cIikge1xyXG4gICAgY29tcG9uZW50ID0gdHlwZSA9PT0gXCJ0b2dnbGVcIiA/IENvbXBvbmVudHMuQ2hlY2tib3hJdGVtIDogQ29tcG9uZW50cy5SYWRpb0l0ZW07XHJcbiAgICBpZiAocHJvcHMuYWN0aXZlKSBwcm9wcy5jaGVja2VkID0gcHJvcHMuYWN0aXZlO1xyXG4gIH0gZWxzZSBpZiAodHlwZSA9PT0gXCJjb250cm9sXCIpIHtcclxuICAgIGNvbXBvbmVudCA9IENvbXBvbmVudHMuQ29udHJvbEl0ZW07XHJcbiAgfVxyXG4gIGlmICghcHJvcHMuaWQpIHByb3BzLmlkID0gYCR7cHJvcHMubGFiZWwucmVwbGFjZSgvXlteYS16XSt8W15cXHctXSsvZ2ksIFwiLVwiKX1gO1xyXG4gIGlmIChwcm9wcy5kYW5nZXIpIHByb3BzLmNvbG9yID0gXCJjb2xvckRhbmdlclwiO1xyXG4gIHByb3BzLmV4dGVuZGVkID0gdHJ1ZTtcclxuXHJcbiAgaWYgKHR5cGUgPT09IFwidG9nZ2xlXCIpIHtcclxuICAgIGNvbnN0IFthY3RpdmUsIGRvVG9nZ2xlXSA9IFJlYWN0LnVzZVN0YXRlKHByb3BzLmNoZWNrZWQgfHwgZmFsc2UpO1xyXG4gICAgY29uc3Qgb3JpZ2luYWxBY3Rpb24gPSBwcm9wcy5hY3Rpb247XHJcbiAgICBwcm9wcy5jaGVja2VkID0gYWN0aXZlO1xyXG4gICAgcHJvcHMuYWN0aW9uID0gZnVuY3Rpb24gKGV2KSB7XHJcbiAgICAgIG9yaWdpbmFsQWN0aW9uKGV2KTtcclxuICAgICAgZG9Ub2dnbGUoIWFjdGl2ZSk7XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoY29tcG9uZW50LCBwcm9wcyk7XHJcbn1cclxuXHJcbi8vIENvcGllZCBmcm9tIGJkJ3Mgc291cmNlXHJcbmZ1bmN0aW9uIGJ1aWxkTWVudUNoaWxkcmVuKHNldHVwKSB7XHJcbiAgY29uc3QgbWFwcGVyID0gcyA9PiB7XHJcbiAgICBpZiAocy50eXBlID09PSBcImdyb3VwXCIpIHJldHVybiBidWlsZEdyb3VwKHMpO1xyXG4gICAgcmV0dXJuIGJ1aWxkSXRlbShzKTtcclxuICB9O1xyXG4gIGNvbnN0IGJ1aWxkR3JvdXAgPSBmdW5jdGlvbiAoZ3JvdXApIHtcclxuICAgIGNvbnN0IGl0ZW1zID0gZ3JvdXAuaXRlbXMubWFwKG1hcHBlcikuZmlsdGVyKGkgPT4gaSk7XHJcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChNZW51Q29tcG9uZW50cy5Hcm91cCwgbnVsbCwgaXRlbXMpO1xyXG4gIH07XHJcbiAgcmV0dXJuIHNldHVwLm1hcChtYXBwZXIpLmZpbHRlcihpID0+IGkpO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgX19jYWNoZV9fOiB7XHJcbiAgICBwYXRjaGVzOiBNZW51UGF0Y2hlci5wYXRjaGVzLFxyXG4gICAgc3ViUGF0Y2hlczogTWVudVBhdGNoZXIuc3ViUGF0Y2hlc1xyXG4gIH0sXHJcbiAgcGF0Y2gobmF2SWQsIGNiKSB7XHJcbiAgICBpZiAoIU1lbnVQYXRjaGVyLnBhdGNoZXMuaGFzKG5hdklkKSkgTWVudVBhdGNoZXIucGF0Y2hlcy5zZXQobmF2SWQsIG5ldyBTZXQoKSk7XHJcbiAgICBNZW51UGF0Y2hlci5wYXRjaGVzLmdldChuYXZJZCkuYWRkKGNiKTtcclxuXHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBNZW51UGF0Y2hlci5wYXRjaGVzLmdldChuYXZJZCkuZGVsZXRlKGNiKTtcclxuICAgIH1cclxuICB9LFxyXG4gIG9wZW4oZXZlbnQsIGNvbXBvbmVudCwgY29uZmlnKSB7XHJcbiAgICByZXR1cm4gQWN0aW9ucy5vcGVuKGV2ZW50LCAoZSkgPT4gUmVhY3QuY3JlYXRlRWxlbWVudChjb21wb25lbnQsIE9iamVjdC5hc3NpZ24oe30sIGUsIHsgb25DbG9zZTogQWN0aW9ucy5jbG9zZSB9KSksIGNvbmZpZyk7XHJcbiAgfSxcclxuICBjbG9zZSgpIHtcclxuICAgIHJldHVybiBBY3Rpb25zLmNsb3NlKCk7XHJcbiAgfSxcclxuICBidWlsZDoge1xyXG4gICAgaXRlbShzZXR1cCkge1xyXG4gICAgICByZXR1cm4gYnVpbGRNZW51Q2hpbGRyZW4oc2V0dXApO1xyXG4gICAgfSxcclxuICAgIG1lbnUoc2V0dXApIHtcclxuICAgICAgcmV0dXJuIChwcm9wcykgPT4gUmVhY3QuY3JlYXRlRWxlbWVudChNZW51Q29tcG9uZW50cy5NZW51LCBwcm9wcywgdGhpcy5idWlsZE1lbnVDaGlsZHJlbihzZXR1cCkpO1xyXG4gICAgfVxyXG4gIH1cclxufTsiLCAiaW1wb3J0IGNvbW1vbiBmcm9tIFwiLi4vLi4vYXBpL21vZHVsZXMvY29tbW9uXCI7XHJcbmltcG9ydCBsb2dnZXIgZnJvbSBcIi4uLy4uL2FwaS91dGlscy9sb2dnZXIuanNcIjtcclxuY29uc3QgeyBSZWFjdCB9ID0gY29tbW9uO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXJyb3JCb3VuZGFyeSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuICAgIHRoaXMuc3RhdGUgPSB7IGVycm9yOiBudWxsIH07XHJcbiAgfVxyXG5cclxuICBjb21wb25lbnREaWRDYXRjaChlcnJvcikge1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7IGVycm9yIH0pO1xyXG4gICAgbG9nZ2VyLmVycm9yKGVycm9yKTtcclxuICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5vbkVycm9yID09PSBcImZ1bmN0aW9uXCIpIHRoaXMucHJvcHMub25FcnJvcihlcnJvcik7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICBpZiAodGhpcy5zdGF0ZS5lcnJvcikgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiYWNvcmQtLXJlYWN0LWVycm9yXCI+XHJcbiAgICAgIDxwPlVuZXhwZWN0ZWQgUmVhY3QgRXJyb3IgSGFwcGVuZWQuPC9wPlxyXG4gICAgICA8cD57YCR7dGhpcy5zdGF0ZS5lcnJvcn1gfTwvcD5cclxuICAgIDwvZGl2PjtcclxuICAgIHJldHVybiB0aGlzLnByb3BzLmNoaWxkcmVuO1xyXG4gIH1cclxufVxyXG5cclxuY29uc3Qgb3JpZ2luYWxSZW5kZXIgPSBFcnJvckJvdW5kYXJ5LnByb3RvdHlwZS5yZW5kZXI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShFcnJvckJvdW5kYXJ5LnByb3RvdHlwZSwgXCJyZW5kZXJcIiwge1xyXG4gIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gIGNvbmZpZ3VyYWJsZTogZmFsc2UsXHJcbiAgc2V0OiBmdW5jdGlvbiAoKSB7IHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBzZXQgcmVuZGVyIG1ldGhvZCBvZiBFcnJvckJvdW5kYXJ5XCIpOyB9LFxyXG4gIGdldDogKCkgPT4gb3JpZ2luYWxSZW5kZXJcclxufSk7IiwgImltcG9ydCBFcnJvckJvdW5kYXJ5IGZyb20gXCIuLi8uLi9saWIvY29tcG9uZW50cy9FcnJvckJvdW5kYXJ5LmpzeFwiO1xyXG5pbXBvcnQgY29tbW9uIGZyb20gXCIuLi9tb2R1bGVzL2NvbW1vbi5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIEVycm9yQm91bmRhcnksXHJcbiAgQnV0dG9uOiBjb21tb24uY29tcG9uZW50cy5CdXR0b24sXHJcbiAgTWFya2Rvd246IGNvbW1vbi5jb21wb25lbnRzLk1hcmtkb3duLFxyXG4gIFRleHQ6IGNvbW1vbi5jb21wb25lbnRzLlRleHQsXHJcbiAgQ29uZmlybWF0aW9uTW9kYWw6IGNvbW1vbi5jb21wb25lbnRzLkNvbmZpcm1hdGlvbk1vZGFsLFxyXG4gIE1vZGFsUm9vdDogY29tbW9uLm1vZGFscy5jb21wb25lbnRzLlJvb3QsXHJcbiAgTW9kYWxDbG9zZUJ1dHRvbjogY29tbW9uLm1vZGFscy5jb21wb25lbnRzLm90aGVyLkNsb3NlQnV0dG9uLFxyXG4gIE1vZGFsSGVhZGVyOiBjb21tb24ubW9kYWxzLmNvbXBvbmVudHMub3RoZXIuSGVhZGVyLFxyXG4gIE1vZGFsQ29udGVudDogY29tbW9uLm1vZGFscy5jb21wb25lbnRzLm90aGVyLkNvbnRlbnQsXHJcbiAgTW9kYWxGb290ZXI6IGNvbW1vbi5tb2RhbHMuY29tcG9uZW50cy5vdGhlci5Gb290ZXIsXHJcbiAgTW9kYWxMaXN0Q29udGVudDogY29tbW9uLm1vZGFscy5jb21wb25lbnRzLm90aGVyLkxpc3RDb250ZW50LFxyXG59IiwgImltcG9ydCBFcnJvckJvdW5kYXJ5IGZyb20gXCIuLi8uLi9saWIvY29tcG9uZW50cy9FcnJvckJvdW5kYXJ5LmpzeFwiO1xyXG5pbXBvcnQgY29tbW9uIGZyb20gXCIuLi9tb2R1bGVzL2NvbW1vbi5qc1wiO1xyXG5pbXBvcnQgaTE4biBmcm9tIFwiLi4vaTE4bi9pbmRleC5qc1wiXHJcbmNvbnN0IHsgUmVhY3QsIEZsdXhEaXNwYXRjaGVyLCBjb21wb25lbnRzLCBtb2RhbHMsIFVzZXJTdG9yZSB9ID0gY29tbW9uO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIHNob3c6IHtcclxuICAgIGNvbmZpcm1hdGlvbih0aXRsZSwgY29udGVudCwgeyBjb25maXJtID0gbnVsbCwgY2FuY2VsID0gbnVsbCwgZGFuZ2VyID0gZmFsc2UsIGtleSA9IHVuZGVmaW5lZCwgdGltZW91dCA9IDYwMDAwICogNSB9ID0ge30pIHtcclxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGNvbnRlbnQpKSBjb250ZW50ID0gW2NvbnRlbnRdO1xyXG4gICAgICAgIGNvbnRlbnQgPSBjb250ZW50Lm1hcChpID0+IHR5cGVvZiBpID09PSBcInN0cmluZ1wiID8gUmVhY3QuY3JlYXRlRWxlbWVudChjb21wb25lbnRzLk1hcmtkb3duLCBudWxsLCBpKSA6IGkpO1xyXG4gICAgICAgIGNvbnN0IG1vZGFsS2V5ID0gbW9kYWxzLmFjdGlvbnMub3BlbigocHJvcHMpID0+IHtcclxuICAgICAgICAgIGxldCBpbnRlcmFjdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICByZXR1cm4gPEVycm9yQm91bmRhcnkgb25FcnJvcj17KCkgPT4geyByZXNvbHZlKGZhbHNlKTsgfX0+XHJcbiAgICAgICAgICAgIDxjb21wb25lbnRzLkNvbmZpcm1hdGlvbk1vZGFsXHJcbiAgICAgICAgICAgICAgaGVhZGVyPXt0aXRsZX1cclxuICAgICAgICAgICAgICBjb25maXJtQnV0dG9uQ29sb3I9e2RhbmdlciA/IGNvbXBvbmVudHMuQnV0dG9uLkNvbG9ycy5SRUQgOiBjb21wb25lbnRzLkJ1dHRvbi5Db2xvcnMuQlJBTkR9XHJcbiAgICAgICAgICAgICAgY29uZmlybVRleHQ9e2NvbmZpcm0gfHwgaTE4bi5mb3JtYXQoXCJDT05GSVJNXCIpfVxyXG4gICAgICAgICAgICAgIGNhbmNlbFRleHQ9e2NhbmNlbH1cclxuICAgICAgICAgICAgICBvbkNhbmNlbD17KCkgPT4geyByZXNvbHZlKGZhbHNlKTsgbW9kYWxzLmFjdGlvbnMuY2xvc2UobW9kYWxLZXkpOyBpbnRlcmFjdGVkID0gdHJ1ZTsgfX1cclxuICAgICAgICAgICAgICBvbkNvbmZpcm09eygpID0+IHsgcmVzb2x2ZSh0cnVlKTsgbW9kYWxzLmFjdGlvbnMuY2xvc2UobW9kYWxLZXkpOyBpbnRlcmFjdGVkID0gdHJ1ZTsgfX1cclxuICAgICAgICAgICAgICB7Li4ucHJvcHN9XHJcbiAgICAgICAgICAgICAgb25DbG9zZT17KCkgPT4geyBwcm9wcy5vbkNsb3NlKCk7IHJlc29sdmUoZmFsc2UpOyBtb2RhbHMuYWN0aW9ucy5jbG9zZShtb2RhbEtleSk7IH19XHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICA8RXJyb3JCb3VuZGFyeSBvbkVycm9yPXsoKSA9PiB7IHJlc29sdmUoZmFsc2UpOyB9fT5cclxuICAgICAgICAgICAgICAgIHtjb250ZW50fVxyXG4gICAgICAgICAgICAgIDwvRXJyb3JCb3VuZGFyeT5cclxuICAgICAgICAgICAgPC9jb21wb25lbnRzLkNvbmZpcm1hdGlvbk1vZGFsPlxyXG4gICAgICAgICAgPC9FcnJvckJvdW5kYXJ5PlxyXG4gICAgICAgIH0sIHsgbW9kYWxLZXk6IGtleSB9KTtcclxuICAgICAgICBpZiAodGltZW91dCkge1xyXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghaW50ZXJhY3RlZCkge1xyXG4gICAgICAgICAgICAgIHJlc29sdmUoZmFsc2UpO1xyXG4gICAgICAgICAgICAgIG1vZGFscy5hY3Rpb25zLmNsb3NlKG1vZGFsS2V5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSwgdGltZW91dCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBjbG9zZShrZXkpIHtcclxuICAgICAgcmV0dXJuIG1vZGFscy5hY3Rpb25zLmNsb3NlKGtleSk7XHJcbiAgICB9LFxyXG4gICAgdXNlcih1c2VySWQpIHtcclxuICAgICAgaWYgKCFVc2VyU3RvcmUuZ2V0VXNlcih1c2VySWQpKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIEZsdXhEaXNwYXRjaGVyLmRpc3BhdGNoKHsgdHlwZTogXCJVU0VSX1BST0ZJTEVfTU9EQUxfT1BFTlwiLCB1c2VySWQgfSk7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSxcclxuICAgIGFsZXJ0KHRpdGxlLCBjb250ZW50LCB7IGNvbmZpcm0gPSBudWxsLCBrZXkgPSB1bmRlZmluZWQsIHRpbWVvdXQgPSA2MDAwMCAqIDUgfSA9IHt9KSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmNvbmZpcm1hdGlvbih0aXRsZSwgY29udGVudCwgeyBjb25maXJtLCBjYW5jZWw6IG51bGwsIGtleSwgdGltZW91dCB9KTtcclxuICAgIH1cclxuICB9XHJcbn0iLCAiaW1wb3J0IHBhdGNoZXIgZnJvbSBcIi4uL3BhdGNoZXIvaW5kZXguanNcIjtcclxuaW1wb3J0IHN0eWxlQ1NTVGV4dCBmcm9tIFwiLi9zdHlsZXMuc2Nzc1wiO1xyXG5wYXRjaGVyLmluamVjdENTUyhzdHlsZUNTU1RleHQpO1xyXG5cclxuaW1wb3J0IHRvb2x0aXBzIGZyb20gXCIuL3Rvb2x0aXBzLmpzXCI7XHJcbmltcG9ydCBub3RpZmljYXRpb25zIGZyb20gXCIuL25vdGlmaWNhdGlvbnMuanNcIjtcclxuaW1wb3J0IGNvbnRleHRNZW51cyBmcm9tIFwiLi9jb250ZXh0TWVudXMuanNcIjtcclxuaW1wb3J0IGNvbXBvbmVudHMgZnJvbSBcIi4vY29tcG9uZW50cy5qc1wiO1xyXG5pbXBvcnQgbW9kYWxzIGZyb20gXCIuL21vZGFscy5qc3hcIjtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgdG9vbHRpcHMsXHJcbiAgbm90aWZpY2F0aW9ucyxcclxuICBjb250ZXh0TWVudXMsXHJcbiAgY29tcG9uZW50cyxcclxuICBtb2RhbHNcclxufSIsICJpbXBvcnQgbW9kdWxlcyBmcm9tICcuL21vZHVsZXMnO1xyXG5pbXBvcnQgZGV2IGZyb20gJy4vZGV2JztcclxuaW1wb3J0IHV0aWxzIGZyb20gJy4vdXRpbHMnO1xyXG5pbXBvcnQgZXh0ZW5zaW9ucyBmcm9tICcuL2V4dGVuc2lvbnMnO1xyXG5pbXBvcnQgaTE4biBmcm9tICcuL2kxOG4nO1xyXG5pbXBvcnQgc3RvcmFnZSBmcm9tICcuL3N0b3JhZ2UnO1xyXG5pbXBvcnQgZXZlbnRzIGZyb20gJy4vZXZlbnRzJztcclxuaW1wb3J0IHBhdGNoZXIgZnJvbSAnLi9wYXRjaGVyJztcclxuaW1wb3J0IGludGVybmFsIGZyb20gJy4vaW50ZXJuYWwnO1xyXG5pbXBvcnQgd2Vic29ja2V0IGZyb20gJy4vd2Vic29ja2V0JztcclxuaW1wb3J0IHVpIGZyb20gJy4vdWkvaW5kZXguanMnO1xyXG5cclxudXRpbHMubG9nZ2VyLmRlYnVnKGBQUkVMT0FEX0tFWTogPFBSRUxPQURfS0VZPmApO1xyXG5cclxuZnVuY3Rpb24gZGV2RXJyb3IoYXBpKSB7XHJcbiAgcmV0dXJuIG5ldyBFcnJvcihgVGhlICR7YXBpfSBBUEkgY2FuIG9ubHkgYmUgYWNjZXNzZWQgd2hlbiBEZXYgbW9kZSBpcyBlbmFibGVkIWApO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgZXhwb3NlZEFQSToge1xyXG4gICAgZGV2LFxyXG4gICAgdXRpbHMsXHJcbiAgICBpMThuLFxyXG4gICAgZXZlbnRzLFxyXG4gICAgdWksXHJcbiAgICBnZXQgcGF0Y2hlcigpIHtcclxuICAgICAgaWYgKCFkZXYuZW5hYmxlZCkgdGhyb3cgZGV2RXJyb3IoXCJQYXRjaGVyXCIpO1xyXG4gICAgICByZXR1cm4gcGF0Y2hlcjtcclxuICAgIH0sXHJcbiAgICBnZXQgc3RvcmFnZSgpIHtcclxuICAgICAgaWYgKCFkZXYuZW5hYmxlZCkgdGhyb3cgZGV2RXJyb3IoXCJTdG9yYWdlXCIpO1xyXG4gICAgICByZXR1cm4gc3RvcmFnZTtcclxuICAgIH0sXHJcbiAgICBnZXQgbW9kdWxlcygpIHtcclxuICAgICAgaWYgKCFkZXYuZW5hYmxlZCkgdGhyb3cgZGV2RXJyb3IoXCJNb2R1bGVzXCIpO1xyXG4gICAgICByZXR1cm4gbW9kdWxlcztcclxuICAgIH0sXHJcbiAgICBnZXQgZXh0ZW5zaW9ucygpIHtcclxuICAgICAgaWYgKCFkZXYuZW5hYmxlZCkgdGhyb3cgZGV2RXJyb3IoXCJFeHRlbnNpb25zXCIpO1xyXG4gICAgICByZXR1cm4gZXh0ZW5zaW9ucztcclxuICAgIH0sXHJcbiAgICBnZXQgaW50ZXJuYWwoKSB7XHJcbiAgICAgIGlmICghZGV2LmVuYWJsZWQpIHRocm93IGRldkVycm9yKFwiSW50ZXJuYWxcIik7XHJcbiAgICAgIHJldHVybiBpbnRlcm5hbDtcclxuICAgIH0sXHJcbiAgICBnZXQgd2Vic29ja2V0KCkge1xyXG4gICAgICBpZiAoIWRldi5lbmFibGVkKSB0aHJvdyBkZXZFcnJvcihcIldlYnNvY2tldFwiKTtcclxuICAgICAgcmV0dXJuIHdlYnNvY2tldDtcclxuICAgIH1cclxuICB9LFxyXG4gIHVuZXhwb3NlZEFQSToge1xyXG4gICAgZGV2LFxyXG4gICAgbW9kdWxlcyxcclxuICAgIHV0aWxzLFxyXG4gICAgZXh0ZW5zaW9ucyxcclxuICAgIGkxOG4sXHJcbiAgICBzdG9yYWdlLFxyXG4gICAgZXZlbnRzLFxyXG4gICAgcGF0Y2hlcixcclxuICAgIGludGVybmFsLFxyXG4gICAgd2Vic29ja2V0LFxyXG4gICAgdWlcclxuICB9XHJcbn0iLCAiaW1wb3J0IG1vZHVsZXMgZnJvbSBcIi4uL2FwaS9tb2R1bGVzL2luZGV4LmpzXCI7XHJcbmltcG9ydCBtb2RhbHMgZnJvbSBcIi4uL2FwaS91aS9tb2RhbHMuanN4XCI7XHJcbmltcG9ydCBub3RpZmljYXRpb25zIGZyb20gXCIuLi9hcGkvdWkvbm90aWZpY2F0aW9ucy5qc1wiO1xyXG5pbXBvcnQgZXh0ZW5zaW9ucyBmcm9tIFwiLi4vYXBpL2V4dGVuc2lvbnMvaW5kZXguanNcIjtcclxuaW1wb3J0IHdlYnNvY2tldCBmcm9tIFwiLi4vYXBpL3dlYnNvY2tldC9pbmRleC5qc1wiO1xyXG5cclxud2Vic29ja2V0LnNldChcIkluc3RhbGxFeHRlbnNpb25cIiwgYXN5bmMgKHsgdXJsIH0gPSB7fSkgPT4ge1xyXG4gIGlmICghdXJsKSByZXR1cm47XHJcblxyXG4gIGF3YWl0IG1vZHVsZXMubmF0aXZlLndpbmRvdy5zZXRBbHdheXNPblRvcCgwLCB0cnVlKTtcclxuICBhd2FpdCBuZXcgUHJvbWlzZShyID0+IHNldFRpbWVvdXQociwgMjUwKSk7XHJcbiAgYXdhaXQgbW9kdWxlcy5uYXRpdmUud2luZG93LnNldEFsd2F5c09uVG9wKDAsIHRydWUpO1xyXG5cclxuICBjb25zdCBzdWNjZXNzID0gYXdhaXQgbW9kYWxzLnNob3cuY29uZmlybWF0aW9uKFxyXG4gICAgYWNvcmQuaTE4bi5mb3JtYXQoXCJJTVBPUlRfRVhURU5TSU9OXCIpLFxyXG4gICAgYWNvcmQuaTE4bi5mb3JtYXQoXCJJTVBPUlRfRVhURU5TSU9OX0RFU0NSSVBUSU9OXCIsIHVybClcclxuICApO1xyXG5cclxuICBpZiAoIXN1Y2Nlc3MpIHJldHVybjtcclxuXHJcbiAgdHJ5IHtcclxuICAgIGF3YWl0IGV4dGVuc2lvbnMubG9hZCh1cmwpO1xyXG4gIH0gY2F0Y2ggKGVycikge1xyXG4gICAgbm90aWZpY2F0aW9ucy5zaG93LmVycm9yKGAke2Vycn1gLCB7IHRpbWVvdXQ6IDMwMDAwIH0pO1xyXG4gIH1cclxufSk7IiwgImltcG9ydCB7IHdhaXRVbnRpbENvbm5lY3Rpb25PcGVuIH0gZnJvbSBcIi4vb3RoZXIvdXRpbHMuanNcIjtcclxuaW1wb3J0IGxvYWRpbmdBbmltYXRpb24gZnJvbSBcIi4vb3RoZXIvbG9hZGluZy1hbmltYXRpb25cIjtcclxuaW1wb3J0IGFwaSBmcm9tIFwiLi9hcGlcIjtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3csIFwiYWNvcmRcIiwge1xyXG4gIGdldCgpIHtcclxuICAgIHJldHVybiBhcGkuZXhwb3NlZEFQSTtcclxuICB9XHJcbn0pO1xyXG53aW5kb3cuZ2xvYmFsID0gd2luZG93O1xyXG5cclxuKGFzeW5jICgpID0+IHtcclxuICBsb2FkaW5nQW5pbWF0aW9uLnNob3coKTtcclxuICBhd2FpdCB3YWl0VW50aWxDb25uZWN0aW9uT3BlbigpO1xyXG4gIGxvYWRpbmdBbmltYXRpb24uaGlkZSgpO1xyXG59KSgpO1xyXG5cclxuLy8gZXh0cmFzXHJcbmltcG9ydCBcIi4vb3RoZXIvd2Vic29ja2V0LXRyaWdnZXJzLmpzXCI7Il0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFDQSxXQUFPLGVBQWUsU0FBUyxjQUFjLEVBQUUsT0FBTyxLQUFLLENBQUM7QUFDNUQsWUFBUSxVQUFVLE9BQU8sT0FBTztBQUFBLE1BQzVCLEtBQUs7QUFBQSxNQUNMLEtBQUs7QUFBQSxNQUNMLFFBQVE7QUFBQSxNQUNSLFFBQVE7QUFBQSxJQUNaLENBQUM7QUFBQTtBQUFBOzs7QUNQRDtBQUFBO0FBQUE7QUFDQSxRQUFJLGtCQUFtQixXQUFRLFFBQUssbUJBQW9CLFNBQVUsS0FBSztBQUNuRSxhQUFRLE9BQU8sSUFBSSxhQUFjLE1BQU0sRUFBRSxXQUFXLElBQUk7QUFBQSxJQUM1RDtBQUNBLFdBQU8sZUFBZSxTQUFTLGNBQWMsRUFBRSxPQUFPLEtBQUssQ0FBQztBQUM1RCxRQUFNLFdBQVcsZ0JBQWdCLGdCQUFtQjtBQUNwRCxRQUFNLGVBQU4sTUFBbUI7QUFBQSxNQUNmLGNBQWM7QUFDVixhQUFLLFlBQVksT0FBTyxPQUFPLFNBQVMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxLQUFLLFNBQVUsSUFBSSxHQUFHLElBQUksb0JBQUksSUFBSSxHQUFJLE1BQU0sQ0FBQyxDQUFDO0FBQ3ZHLGFBQUssS0FBSyxTQUFVLE9BQU8sVUFBVTtBQUNqQyxjQUFJLEtBQUssVUFBVSxLQUFLLEVBQUUsSUFBSSxRQUFRLEdBQUc7QUFDckMsa0JBQU0sTUFBTSxvQkFBb0IsdUJBQXVCO0FBQUEsVUFDM0Q7QUFDQSxlQUFLLFVBQVUsS0FBSyxFQUFFLElBQUksUUFBUTtBQUFBLFFBQ3RDO0FBQ0EsYUFBSyxPQUFPLFNBQVUsT0FBTyxVQUFVO0FBQ25DLGdCQUFNLGVBQWUsQ0FBQ0EsUUFBTyxT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QVE7QUFBQSxRQUNOLE9BQVM7QUFBQSxVQUNQO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLFFBQVU7QUFBQSxRQUNSLFFBQVU7QUFBQSxRQUNWLElBQU07QUFBQSxRQUNOLElBQU07QUFBQSxVQUNKO0FBQUEsWUFDRTtBQUFBLFlBQ0E7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxPQUFTO0FBQUEsTUFDUCxJQUFNO0FBQUEsTUFDTixNQUFRO0FBQUEsUUFDTixPQUFTO0FBQUEsVUFDUDtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsTUFDQSxRQUFVO0FBQUEsUUFDUixRQUFVO0FBQUEsUUFDVixJQUFNO0FBQUEsUUFDTixJQUFNO0FBQUEsVUFDSjtBQUFBLFlBQ0U7QUFBQSxZQUNBO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsTUFBUTtBQUFBLE1BQ04sSUFBTTtBQUFBLE1BQ04sTUFBUTtBQUFBLFFBQ04sT0FBUztBQUFBLFVBQ1A7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLE1BQ0EsUUFBVTtBQUFBLFFBQ1IsUUFBVTtBQUFBLFFBQ1YsSUFBTTtBQUFBLFFBQ04sSUFBTTtBQUFBLFVBQ0o7QUFBQSxZQUNFO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxNQUFRO0FBQUEsTUFDTixJQUFNO0FBQUEsTUFDTixNQUFRO0FBQUEsUUFDTixPQUFTO0FBQUEsVUFDUDtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsTUFDQSxRQUFVO0FBQUEsUUFDUixRQUFVO0FBQUEsUUFDVixJQUFNO0FBQUEsUUFDTixJQUFNO0FB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LDRCQUFpQixLQUFLO0FBQ3RCLFFBQU0sd0JBQXdCO0FBQzlCLDRCQUFpQixLQUFLO0FBQ3hCLEdBQUc7IiwKICAibmFtZXMiOiBbImV2ZW50IiwgIm1ha2UiLCAidGFyZ2V0IiwgInRyZWUiLCAic2VhcmNoRmlsdGVyIiwgIndhbGthYmxlIiwgImlnbm9yZSIsICJmb3VuZCIsICJjb21wb25lbnRzIiwgIl8iLCAiY2hlY2siLCAibW9kdWxlcyIsICJtb2R1bGUiLCAicmVxdWlyZSIsICJmb3VuZCIsICJmaW5kZXIiLCAiZm91bmQiLCAicmVxIiwgImZpbmRlciIsICJjb21tb25fZGVmYXVsdCIsICJjb21tb25fZGVmYXVsdCIsICJfIiwgIl8iLCAibm9TdG9yZSIsICJfIiwgInZhbCIsICJlcnJvciIsICJvdXQiLCAiY2hlY2siLCAiXyIsICJCQVNFX1VSTCIsICJuZXN0cyIsICJvdXQiLCAiXyIsICJzb3VyY2UiLCAiYXBpIiwgImNvbW1vbl9kZWZhdWx0IiwgInNldCIsICJzaG93IiwgImNvbW1vbl9kZWZhdWx0IiwgIm91dCIsICJfIiwgIlJlYWN0IiwgImNvbW1vbl9kZWZhdWx0IiwgImNvbW1vbl9kZWZhdWx0IiwgIlJlYWN0IiwgImNvbW1vbl9kZWZhdWx0IiwgImludGVyYWN0ZWQiLCAiYXBpIl0KfQo=
