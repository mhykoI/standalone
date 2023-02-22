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
      Tooltip: {
        __: true,
        filter: {
          export: false,
          in: "prototypes",
          by: [
            [
              "renderTooltip"
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
  findByStringValues(...stringValues) {
    return this.find((a) => {
      let va = Object.values(a);
      return stringValues.every((x) => va.some((y) => typeof y == "string" && y.includes(x)));
    })?.exports;
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
        document.querySelector(`.acord--notification-layer-container`),
        /** @param {HTMLDivElement} elm */
        (elm) => {
          if (![...elm.childNodes.values()].reduce((prev, curr) => prev + curr.childElementCount, 0))
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
var Components = null;
var Actions = null;
(async () => {
  Actions = await (async () => {
    let ogModule;
    while (true) {
      ogModule = webpack_default.filter((m) => Object.values(m).some((v) => typeof v === "function" && v.toString().includes("CONTEXT_MENU_CLOSE"))).find((m) => m.exports !== window)?.exports;
      if (ogModule)
        break;
      await new Promise((r) => setTimeout(r, 100));
    }
    const out3 = finderMap(ogModule, {
      close: ["CONTEXT_MENU_CLOSE"],
      open: ["renderLazy"]
    });
    isReady = !!out3.close && !!out3.open;
    return out3;
  })();
  Components = (() => {
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
      isReady = Object.keys(out3).length > 1;
    } catch (err) {
      isReady = false;
      logger_default.error("Failed to load context menu components", err);
    }
    return out3;
  })();
  MenuPatcher.initialize();
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
  ModalListContent: common_default2.modals.components.other.ListContent,
  Tooltip: common_default2.components.Tooltip
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
      utils.ifExists(
        document.querySelector(`.acord--toasts-container`),
        /** @param {HTMLDivElement} elm */
        (elm) => {
          if (!elm.childElementCount)
            elm.remove();
        }
      );
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibm9kZV9tb2R1bGVzL25lc3RzL2Nqcy9FdmVudHMuanMiLCAibm9kZV9tb2R1bGVzL25lc3RzL2Nqcy9FdmVudEVtaXR0ZXIuanMiLCAibm9kZV9tb2R1bGVzL25lc3RzL2Nqcy9tYWtlLmpzIiwgIm5vZGVfbW9kdWxlcy9uZXN0cy9janMvaW5kZXguanMiLCAic3JjL2RhdGEvY29tbW9uLmpzb24iLCAic3JjL2FwaS91dGlscy9yYXcvZmluZC1pbi10cmVlLmpzIiwgInNyYy9hcGkvdXRpbHMvbG9nZ2VyLmpzIiwgInNyYy9hcGkvdXRpbHMvcmVhY3QuanMiLCAic3JjL2FwaS91dGlscy9pbmRleC5qcyIsICJzcmMvYXBpL21vZHVsZXMvcmF3L2NvbXBsZXgtZmluZGVyLmpzIiwgInNyYy9hcGkvbW9kdWxlcy93ZWJwYWNrLmpzIiwgInNyYy9hcGkvbW9kdWxlcy9jb21tb24uanMiLCAic3JjL2FwaS9tb2R1bGVzL2luZGV4LmpzIiwgInNyYy9vdGhlci91dGlscy5qcyIsICJzcmMvbGliL0Jhc2ljRXZlbnRFbWl0dGVyLmpzIiwgInNyYy9hcGkvZXZlbnRzL2luZGV4LmpzIiwgInNyYy9hcGkvZG9tL2luZGV4LmpzIiwgInNyYy9saWIvc3BpdHJvYXN0L2Rpc3QvZXNtL3NoYXJlZC5qcyIsICJzcmMvbGliL3NwaXRyb2FzdC9kaXN0L2VzbS9ob29rLmpzIiwgInNyYy9saWIvc3BpdHJvYXN0L2Rpc3QvZXNtL3VuLXBhdGNoLmpzIiwgInNyYy9saWIvc3BpdHJvYXN0L2Rpc3QvZXNtL2dldC1wYXRjaC1mdW5jLmpzIiwgInNyYy9saWIvc3BpdHJvYXN0L2Rpc3QvZXNtL2luZGV4LmpzIiwgInNyYy9hcGkvcGF0Y2hlci9pbmRleC5qcyIsICJzcmMvb3RoZXIvbG9hZGluZy1hbmltYXRpb24vc3R5bGUuc2NzcyIsICJzcmMvb3RoZXIvbG9hZGluZy1hbmltYXRpb24vaW5kZXguanMiLCAic3JjL2FwaS9kZXYvaW5kZXguanMiLCAic3JjL2FwaS9pMThuL2luZGV4LmpzIiwgInNyYy9hcGkvc3RvcmFnZS9pbmRleC5qcyIsICJub2RlX21vZHVsZXMvaWRiLWtleXZhbC9kaXN0L2luZGV4LmpzIiwgInNyYy9saWIvanNvbi1kZWN5Y2xlZC9pbmRleC5qcyIsICJzcmMvYXBpL2V4dGVuc2lvbnMvaTE4bi5qcyIsICJzcmMvYXBpL2V4dGVuc2lvbnMvaW5kZXguanMiLCAic3JjL2FwaS9pbnRlcm5hbC9pbmRleC5qcyIsICJzcmMvYXBpL3dlYnNvY2tldC9pbmRleC5qcyIsICJzcmMvYXBpL3VpL3N0eWxlcy5zY3NzIiwgInNyYy9hcGkvdWkvdG9vbHRpcHMuanMiLCAic3JjL2FwaS91aS9ub3RpZmljYXRpb25zLmpzIiwgInNyYy9hcGkvdWkvY29udGV4dE1lbnVzLmpzIiwgInNyYy9saWIvY29tcG9uZW50cy9FcnJvckJvdW5kYXJ5LmpzeCIsICJzcmMvYXBpL3VpL2NvbXBvbmVudHMuanMiLCAic3JjL2FwaS91aS9tb2RhbHMuanN4IiwgInNyYy9hcGkvdWkvdG9hc3RzLmpzIiwgInNyYy9hcGkvdWkvaW5kZXguanMiLCAic3JjL2FwaS9pbmRleC5qcyIsICJzcmMvb3RoZXIvd2Vic29ja2V0LXRyaWdnZXJzLmpzIiwgInNyYy9pbmRleC5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5kZWZhdWx0ID0gT2JqZWN0LmZyZWV6ZSh7XHJcbiAgICBHRVQ6IFwiR0VUXCIsXHJcbiAgICBTRVQ6IFwiU0VUXCIsXHJcbiAgICBERUxFVEU6IFwiREVMRVRFXCIsXHJcbiAgICBVUERBVEU6IFwiVVBEQVRFXCIsXHJcbn0pO1xyXG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgRXZlbnRzXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vRXZlbnRzXCIpKTtcclxuY2xhc3MgRXZlbnRFbWl0dGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMubGlzdGVuZXJzID0gT2JqZWN0LnZhbHVlcyhFdmVudHNfMS5kZWZhdWx0KS5yZWR1Y2UoKGFjYywgdmFsKSA9PiAoKGFjY1t2YWxdID0gbmV3IFNldCgpKSwgYWNjKSwge30pO1xyXG4gICAgICAgIHRoaXMub24gPSBmdW5jdGlvbiAoZXZlbnQsIGxpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxpc3RlbmVyc1tldmVudF0uaGFzKGxpc3RlbmVyKSkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoYFRoaXMgbGlzdGVuZXIgb24gJHtldmVudH0gYWxyZWFkeSBleGlzdHMuYCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5saXN0ZW5lcnNbZXZlbnRdLmFkZChsaXN0ZW5lcik7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLm9uY2UgPSBmdW5jdGlvbiAoZXZlbnQsIGxpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG9uY2VMaXN0ZW5lciA9IChldmVudCwgZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vZmYoZXZlbnQsIG9uY2VMaXN0ZW5lcik7XHJcbiAgICAgICAgICAgICAgICBsaXN0ZW5lcihldmVudCwgZGF0YSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMub24oZXZlbnQsIG9uY2VMaXN0ZW5lcik7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLm9mZiA9IGZ1bmN0aW9uIChldmVudCwgbGlzdGVuZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5saXN0ZW5lcnNbZXZlbnRdLmRlbGV0ZShsaXN0ZW5lcik7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmVtaXQgPSBmdW5jdGlvbiAoZXZlbnQsIGRhdGEpIHtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBsaXN0ZW5lciBvZiB0aGlzLmxpc3RlbmVyc1tldmVudF0pIHtcclxuICAgICAgICAgICAgICAgIGxpc3RlbmVyKGV2ZW50LCBkYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgZm9yIChjb25zdCBldmVudCBvZiBPYmplY3QudmFsdWVzKEV2ZW50c18xLmRlZmF1bHQpKSB7XHJcbiAgICAgICAgICAgIHRoaXNbZXZlbnQudG9Mb3dlckNhc2UoKV0gPSAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KGV2ZW50LCBkYXRhKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5kZWZhdWx0ID0gRXZlbnRFbWl0dGVyO1xyXG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgRXZlbnRFbWl0dGVyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vRXZlbnRFbWl0dGVyXCIpKTtcclxuZnVuY3Rpb24gbWFrZShcclxuLy8gVGhpcyBjYW4gYmUgc2FmZWx5IGlnbm9yZWQsIHRoZSBEYXRhIHdpbGwgYWx3YXlzIGJlIGFuIG9iamVjdCBvciBpdCB3b24ndCB3b3JrIGFueXdheS5cclxuLy8gQHRzLWlnbm9yZVxyXG5kYXRhID0ge30sIHsgbmVzdEFycmF5cyA9IHRydWUsIH0gPSB7fSkge1xyXG4gICAgY29uc3QgZW1pdHRlciA9IG5ldyBFdmVudEVtaXR0ZXJfMS5kZWZhdWx0KCk7XHJcbiAgICBmdW5jdGlvbiBjcmVhdGVQcm94eSh0YXJnZXQsIHJvb3QsIHBhdGgpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb3h5KHRhcmdldCwge1xyXG4gICAgICAgICAgICBnZXQodGFyZ2V0LCBwcm9wZXJ0eSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbmV3UGF0aCA9IFsuLi5wYXRoLCBwcm9wZXJ0eV07XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHRhcmdldFtwcm9wZXJ0eV07XHJcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVtaXR0ZXIuZ2V0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogbmV3UGF0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUsXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFuZXN0QXJyYXlzICYmIEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY3JlYXRlUHJveHkodmFsdWUsIHJvb3QsIG5ld1BhdGgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY3JlYXRlUHJveHkoKHRhcmdldFtwcm9wZXJ0eV0gPSB7fSksIHJvb3QsIG5ld1BhdGgpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQodGFyZ2V0LCBwcm9wZXJ0eSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHRhcmdldFtwcm9wZXJ0eV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIGVtaXR0ZXIuc2V0KHtcclxuICAgICAgICAgICAgICAgICAgICBwYXRoOiBbLi4ucGF0aCwgcHJvcGVydHldLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvLyBUaGlzIG5lZWRzIHRvIHJldHVybiB0cnVlIG9yIGl0IGVycm9ycy4gL3NocnVnXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGVsZXRlUHJvcGVydHkodGFyZ2V0LCBwcm9wZXJ0eSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRlbGV0ZSB0YXJnZXRbcHJvcGVydHldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZW1pdHRlci5kZWxldGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRoOiBbLi4ucGF0aCwgcHJvcGVydHldLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBoYXModGFyZ2V0LCBwcm9wZXJ0eSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0YXJnZXRbcHJvcGVydHldID09PSBcIm9iamVjdFwiICYmXHJcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmtleXModGFyZ2V0W3Byb3BlcnR5XSkubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb3BlcnR5IGluIHRhcmdldDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHsgc3RvcmU6IGNyZWF0ZVByb3h5KGRhdGEsIGRhdGEsIFtdKSwgXHJcbiAgICAgICAgLy8gVGhpcyBjYW4gYmUgc2FmZWx5IGlnbm9yZWQsIHRoZSBEYXRhIHdpbGwgYWx3YXlzIGJlIGFuIG9iamVjdCBvciBpdCB3b24ndCB3b3JrIGFueXdheS5cclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgZ2hvc3Q6IGRhdGEgfSwgZW1pdHRlcik7XHJcbn1cclxuZXhwb3J0cy5kZWZhdWx0ID0gbWFrZTtcclxuIiwgIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMubWFrZSA9IGV4cG9ydHMuRXZlbnRzID0gdm9pZCAwO1xyXG52YXIgRXZlbnRzXzEgPSByZXF1aXJlKFwiLi9FdmVudHNcIik7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkV2ZW50c1wiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gX19pbXBvcnREZWZhdWx0KEV2ZW50c18xKS5kZWZhdWx0OyB9IH0pO1xyXG52YXIgbWFrZV8xID0gcmVxdWlyZShcIi4vbWFrZVwiKTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwibWFrZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gX19pbXBvcnREZWZhdWx0KG1ha2VfMSkuZGVmYXVsdDsgfSB9KTtcclxuIiwgIntcclxuICBcImNvbW1vblwiOiB7XHJcbiAgICBcIm1vZGFsc1wiOiB7XHJcbiAgICAgIFwiY29tcG9uZW50c1wiOiB7XHJcbiAgICAgICAgXCJvdGhlclwiOiB7XHJcbiAgICAgICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICBcIkhlYWRlclwiLFxyXG4gICAgICAgICAgICAgICAgXCJGb290ZXJcIlxyXG4gICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIlJvb3RcIjoge1xyXG4gICAgICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICAgICAgXCJpblwiOiBcInN0cmluZ3NcIixcclxuICAgICAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgXCJFTlRFUklOR1wiXHJcbiAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIFwiYWN0aW9uc1wiOiB7XHJcbiAgICAgICAgXCJvcGVuXCI6IHtcclxuICAgICAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgICAgIFwiaW5cIjogXCJzdHJpbmdzXCIsXHJcbiAgICAgICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgIFwib25DbG9zZUNhbGxiYWNrXCIsXHJcbiAgICAgICAgICAgICAgICBcIkxheWVyXCJcclxuICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgICAgICBcImJlZm9yZVwiOiBbXHJcbiAgICAgICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgICAgIFwib3BlblwiXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBcIm1hcFwiOiB7XHJcbiAgICAgICAgICAgIFwib3BlblwiOiBbXHJcbiAgICAgICAgICAgICAgXCJvbkNsb3NlQ2FsbGJhY2tcIixcclxuICAgICAgICAgICAgICBcIkxheWVyXCJcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJjbG9zZVwiOiB7XHJcbiAgICAgICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgICAgICBcImluXCI6IFwic3RyaW5nc1wiLFxyXG4gICAgICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICBcIm9uQ2xvc2VDYWxsYmFjaygpXCJcclxuICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgICAgICBcImJlZm9yZVwiOiBbXHJcbiAgICAgICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgICAgIFwiY2xvc2VcIlxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgXCJtYXBcIjoge1xyXG4gICAgICAgICAgICBcImNsb3NlXCI6IFtcclxuICAgICAgICAgICAgICBcIm9uQ2xvc2VDYWxsYmFjaygpXCJcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiY29tcG9uZW50c1wiOiB7XHJcbiAgICAgIFwiQnV0dG9uXCI6IHtcclxuICAgICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICBcIkJvcmRlckNvbG9yc1wiXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgICBcImJlZm9yZVwiOiBbXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgICAgXSxcclxuICAgICAgICAgIFwiYWZ0ZXJcIjogXCJCdXR0b25cIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJtYXBcIjoge1xyXG4gICAgICAgICAgXCJCdXR0b25cIjogW1xyXG4gICAgICAgICAgICBcIi5GSUxMRURcIixcclxuICAgICAgICAgICAgXCIub25Nb3VzZUxlYXZlXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIFwiQ29uZmlybWF0aW9uTW9kYWxcIjoge1xyXG4gICAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICAgIFwiaW5cIjogXCJzdHJpbmdzXCIsXHJcbiAgICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgIFwiLmNvbmZpcm1CdXR0b25Db2xvclwiXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgICBcImJlZm9yZVwiOiBbXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgXCJUZXh0XCI6IHtcclxuICAgICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgICAgXCJmaWx0ZXJcIjogXCIkPy5TaXplcz8uU0laRV8zMiAmJiAkLkNvbG9yc1wiLFxyXG4gICAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgICBcImJlZm9yZVwiOiBbXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgXCJUb29sdGlwXCI6IHtcclxuICAgICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgICBcImluXCI6IFwicHJvdG90eXBlc1wiLFxyXG4gICAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICBcInJlbmRlclRvb2x0aXBcIlxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgICAgXCJiZWZvcmVcIjogW1xyXG4gICAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIFwiTWFya2Rvd25cIjoge1xyXG4gICAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgICBcImZpbHRlclwiOiBcIiQ/LnByb3RvdHlwZT8ucmVuZGVyICYmICQucnVsZXNcIixcclxuICAgICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiRmx1eERpc3BhdGNoZXJcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcIl9jdXJyZW50RGlzcGF0Y2hBY3Rpb25UeXBlXCIsXHJcbiAgICAgICAgICAgIFwiZGlzcGF0Y2hcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiUmVhY3RcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcImNyZWF0ZUVsZW1lbnRcIixcclxuICAgICAgICAgICAgXCJ1c2VTdGF0ZVwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJSZXN0XCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJnZXRcIixcclxuICAgICAgICAgICAgXCJwb3N0XCIsXHJcbiAgICAgICAgICAgIFwiZ2V0QVBJQmFzZVVSTFwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJGbHV4XCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJjb25uZWN0U3RvcmVzXCIsXHJcbiAgICAgICAgICAgIFwiZGVzdHJveVwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJXZWJTb2NrZXRcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IFwiJD8uX19wcm90b19fPy5oYW5kbGVDb25uZWN0aW9uXCIsXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJiZWZvcmVcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJBY3Rpdml0eUFjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcInNlbmRBY3Rpdml0eUludml0ZVwiLFxyXG4gICAgICAgICAgICBcInVwZGF0ZUFjdGl2aXR5XCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIlByaXZhdGVDaGFubmVsQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwib3BlblByaXZhdGVDaGFubmVsXCIsXHJcbiAgICAgICAgICAgIFwiZW5zdXJlUHJpdmF0ZUNoYW5uZWxcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiQWNrQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiaW5cIjogXCJzdHJpbmdzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwidHlwZTpcXFwiQlVMS19BQ0tcXFwiXCJcclxuICAgICAgICAgIF0sXHJcbiAgICAgICAgICBbXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiB0cnVlLFxyXG4gICAgICAgIFwiYmVmb3JlXCI6IFwiZXhwb3J0c1wiXHJcbiAgICAgIH0sXHJcbiAgICAgIFwibWFwXCI6IHtcclxuICAgICAgICBcImFja1wiOiBbXHJcbiAgICAgICAgICBcInR5cGU6XFxcIkNIQU5ORUxfQUNLXFxcIlwiLFxyXG4gICAgICAgICAgXCJtZXNzYWdlSWRcIixcclxuICAgICAgICAgIFwiY2hhbm5lbElkXCJcclxuICAgICAgICBdLFxyXG4gICAgICAgIFwiYnVsa0Fja1wiOiBbXHJcbiAgICAgICAgICBcInR5cGU6XFxcIkJVTEtfQUNLXFxcIlwiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJBbmFseXRpY3NBY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJpc1Rocm90dGxlZFwiLFxyXG4gICAgICAgICAgICBcInRyYWNrXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIkFuaW1hdGlvbkFjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJzcHJpbmdcIixcclxuICAgICAgICAgICAgXCJkZWNheVwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJDb25uZWN0aW9uQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwic2V0U2hvd0FjdGl2aXR5XCIsXHJcbiAgICAgICAgICAgIFwic2V0VmlzaWJpbGl0eVwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJSVENDb25uZWN0aW9uQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwiZ2V0Q2hhbm5lbElkXCIsXHJcbiAgICAgICAgICAgIFwiZ2V0R3VpbGRJZFwiLFxyXG4gICAgICAgICAgICBcImdldFJUQ0Nvbm5lY3Rpb25JZFwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJFbW9qaUFjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcInRyYW5zbGF0ZUlubGluZUVtb2ppVG9TdXJyb2dhdGVzXCIsXHJcbiAgICAgICAgICAgIFwidHJhbnNsYXRlU3Vycm9nYXRlc1RvSW5saW5lRW1vamlcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiRW1vamlTdGF0ZUFjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcImdldFVSTFwiLFxyXG4gICAgICAgICAgICBcImlzRW1vamlEaXNhYmxlZFwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJHdWlsZE5vdGlmaWNhdGlvbnNBY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJ1cGRhdGVDaGFubmVsT3ZlcnJpZGVTZXR0aW5nc1wiLFxyXG4gICAgICAgICAgICBcInVwZGF0ZUd1aWxkTm90aWZpY2F0aW9uU2V0dGluZ3NcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiSW50ZXJuYWxSZWFjdFwiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwianN4XCIsXHJcbiAgICAgICAgICAgIFwianN4c1wiLFxyXG4gICAgICAgICAgICBcIkZyYWdtZW50XCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIkxvZ2luQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwibG9naW5cIixcclxuICAgICAgICAgICAgXCJsb2dvdXRcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiUXVlcnlBY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJxdWVyeUVtb2ppUmVzdWx0c1wiLFxyXG4gICAgICAgICAgICBcInF1ZXJ5RnJpZW5kc1wiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJNZXNzYWdlQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwicmVjZWl2ZU1lc3NhZ2VcIixcclxuICAgICAgICAgICAgXCJzZW5kTWVzc2FnZVwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJQcmVtaXVtQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwiaXNQcmVtaXVtXCIsXHJcbiAgICAgICAgICAgIFwiY2FuVXNlRW1vamlzRXZlcnl3aGVyZVwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJWb2ljZUFjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcInNlbGVjdFZvaWNlQ2hhbm5lbFwiLFxyXG4gICAgICAgICAgICBcImRpc2Nvbm5lY3RcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiVHlwaW5nQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwic3RhcnRUeXBpbmdcIixcclxuICAgICAgICAgICAgXCJzdG9wVHlwaW5nXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIkd1aWxkQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwic2V0Q2hhbm5lbFwiLFxyXG4gICAgICAgICAgICBcInNldFNlcnZlck11dGVcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiSW52aXRlQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwiYWNjZXB0SW52aXRlXCIsXHJcbiAgICAgICAgICAgIFwiYWNjZXB0SW52aXRlQW5kVHJhbnNpdGlvblRvSW52aXRlQ2hhbm5lbFwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJNZWRpYUVuZ2luZUFjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcInRvZ2dsZVNlbGZEZWFmXCIsXHJcbiAgICAgICAgICAgIFwidG9nZ2xlU2VsZk11dGVcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiaTE4blwiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwiX3JlcXVlc3RlZExvY2FsZVwiLFxyXG4gICAgICAgICAgICBcImdldERlZmF1bHRMb2NhbGVcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwidXVpZFwiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwidjFcIixcclxuICAgICAgICAgICAgXCJ2NFwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJobGpzXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJoaWdobGlnaHRBbGxcIixcclxuICAgICAgICAgICAgXCJoaWdobGlnaHRcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufSIsICJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBmaW5kSW5UcmVlKFxyXG4gIHRyZWUsXHJcbiAgc2VhcmNoRmlsdGVyLFxyXG4gIHsgd2Fsa2FibGUgPSBudWxsLCBpZ25vcmUgPSBbXSwgbGltaXQgPSAxMDAgfSA9IHt9XHJcbikge1xyXG4gIGxldCBpdGVyYXRpb24gPSAwO1xyXG5cclxuICBmdW5jdGlvbiBkb1NlYXJjaCh0cmVlLCBzZWFyY2hGaWx0ZXIsIHsgd2Fsa2FibGUgPSBudWxsLCBpZ25vcmUgPSBbXSB9ID0ge30pIHtcclxuICAgIGl0ZXJhdGlvbiArPSAxO1xyXG4gICAgaWYgKGl0ZXJhdGlvbiA+IGxpbWl0KSByZXR1cm47XHJcblxyXG4gICAgaWYgKHR5cGVvZiBzZWFyY2hGaWx0ZXIgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgaWYgKHRyZWUuaGFzT3duUHJvcGVydHkoc2VhcmNoRmlsdGVyKSkgcmV0dXJuIHRyZWVbc2VhcmNoRmlsdGVyXTtcclxuICAgIH0gZWxzZSBpZiAoc2VhcmNoRmlsdGVyKHRyZWUpKSByZXR1cm4gdHJlZTtcclxuXHJcbiAgICBpZiAoIXRyZWUpIHJldHVybjtcclxuXHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh0cmVlKSkge1xyXG4gICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgdHJlZSkge1xyXG4gICAgICAgIGNvbnN0IGZvdW5kID0gZG9TZWFyY2goaXRlbSwgc2VhcmNoRmlsdGVyLCB7IHdhbGthYmxlLCBpZ25vcmUgfSk7XHJcbiAgICAgICAgaWYgKGZvdW5kKSByZXR1cm4gZm91bmQ7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHRyZWUgPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXModHJlZSkpIHtcclxuICAgICAgICBpZiAod2Fsa2FibGUgIT0gbnVsbCAmJiAhd2Fsa2FibGUuaW5jbHVkZXMoa2V5KSkgY29udGludWU7XHJcblxyXG4gICAgICAgIGlmIChpZ25vcmUuaW5jbHVkZXMoa2V5KSkgY29udGludWU7XHJcblxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICBjb25zdCBmb3VuZCA9IGRvU2VhcmNoKHRyZWVba2V5XSwgc2VhcmNoRmlsdGVyLCB7XHJcbiAgICAgICAgICAgIHdhbGthYmxlLFxyXG4gICAgICAgICAgICBpZ25vcmUsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGlmIChmb3VuZCkgcmV0dXJuIGZvdW5kO1xyXG4gICAgICAgIH0gY2F0Y2ggeyB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiBkb1NlYXJjaCh0cmVlLCBzZWFyY2hGaWx0ZXIsIHsgd2Fsa2FibGUsIGlnbm9yZSB9KTtcclxufTtcclxuIiwgImZ1bmN0aW9uIGJ1aWxkKHByZWZpeCA9IFwiQWNvcmRcIiwgdHlwZSwgY29sb3IpIHtcclxuICByZXR1cm4gKC4uLmlucHV0KSA9PiBjb25zb2xlW3R5cGVdKFxyXG4gICAgYCVjJHtwcmVmaXh9JWNgLFxyXG4gICAgYGJhY2tncm91bmQtY29sb3I6ICR7Y29sb3J9OyBjb2xvcjogd2hpdGU7IGJvcmRlci1yYWRpdXM6IDRweDsgcGFkZGluZzogMHB4IDZweCAwcHggNnB4OyBmb250LXdlaWdodDogYm9sZGAsXHJcbiAgICBcIlwiLFxyXG4gICAgLi4uaW5wdXRcclxuICApO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgbG9nOiBidWlsZChcIkFjb3JkXCIsIFwibG9nXCIsIFwiIzAwZmJiMFwiKSxcclxuICBkZWJ1ZzogYnVpbGQoXCJBY29yZCBEZWJ1Z1wiLCBcImRlYnVnXCIsIFwiIzAwZmJiMFwiKSxcclxuICBpbmZvOiBidWlsZChcIkFjb3JkIEluZm9cIiwgXCJsb2dcIiwgXCIjODJhYWZmXCIpLFxyXG4gIHdhcm46IGJ1aWxkKFwiQWNvcmQgV2FyblwiLCBcIndhcm5cIiwgXCIjZGViZjE4XCIpLFxyXG4gIGVycm9yOiBidWlsZChcIkFjb3JkIEVycm9yXCIsIFwiZXJyb3JcIiwgXCIjZWY1ODU4XCIpLFxyXG4gIGJ1aWxkXHJcbn0iLCAiaW1wb3J0IGZpbmRJblRyZWUgZnJvbSBcIi4vcmF3L2ZpbmQtaW4tdHJlZS5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGdldEluc3RhbmNlKG5vZGUpIHtcclxuICAgIHJldHVybiBPYmplY3QuZW50cmllcyhub2RlKS5maW5kKGkgPT4gaVswXS5zdGFydHNXaXRoKFwiX19yZWFjdEludGVybmFsSW5zdGFuY2VcIikgfHwgaVswXS5zdGFydHNXaXRoKFwiX19yZWFjdEZpYmVyXCIpKT8uWzFdO1xyXG4gIH0sXHJcbiAgZ2V0T3duZXJJbnN0YW5jZShub2RlKSB7XHJcbiAgICBsZXQgaW5zdGFuY2UgPSB0aGlzLmdldEluc3RhbmNlKG5vZGUpO1xyXG4gICAgZm9yIChsZXQgZWwgPSBpbnN0YW5jZTsgZWw7IGVsID0gZWwucmV0dXJuKVxyXG4gICAgICBpZiAoZWwuc3RhdGVOb2RlPy5mb3JjZVVwZGF0ZSkgcmV0dXJuIGVsLnN0YXRlTm9kZTtcclxuICB9LFxyXG4gIGZpbmRJblRyZWUodHJlZSwgZmlsdGVyKSB7XHJcbiAgICByZXR1cm4gZmluZEluVHJlZSh0cmVlLCBmaWx0ZXIsIHtcclxuICAgICAgd2Fsa2FibGU6IFtcInByb3BzXCIsIFwic3RhdGVcIiwgXCJjaGlsZHJlblwiLCBcInJldHVyblwiXVxyXG4gICAgfSk7XHJcbiAgfSxcclxuICBnZXRDb21wb25lbnRzKG5vZGUpIHtcclxuICAgIGNvbnN0IGluc3RhbmNlID0gdGhpcy5nZXRJbnN0YW5jZShub2RlKTtcclxuICAgIGNvbnN0IGNvbXBvbmVudHMgPSBbXTtcclxuICAgIGxldCBsYXN0SW5zdGFuY2UgPSBpbnN0YW5jZTtcclxuICAgIHdoaWxlIChsYXN0SW5zdGFuY2UgJiYgbGFzdEluc3RhbmNlLnJldHVybikge1xyXG4gICAgICBpZiAodHlwZW9mIGxhc3RJbnN0YW5jZS5yZXR1cm4udHlwZSA9PT0gXCJzdHJpbmdcIikgYnJlYWs7XHJcbiAgICAgIGlmIChsYXN0SW5zdGFuY2UucmV0dXJuLnR5cGUpIGNvbXBvbmVudHMucHVzaChsYXN0SW5zdGFuY2UucmV0dXJuLnR5cGUpO1xyXG4gICAgICBsYXN0SW5zdGFuY2UgPSBsYXN0SW5zdGFuY2UucmV0dXJuO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNvbXBvbmVudHM7XHJcbiAgfSxcclxuICBnZXRTdGF0ZU5vZGVzKG5vZGUpIHtcclxuICAgIGNvbnN0IGluc3RhbmNlID0gdGhpcy5nZXRJbnN0YW5jZShub2RlKTtcclxuICAgIGNvbnN0IHN0YXRlTm9kZXMgPSBbXTtcclxuICAgIGxldCBsYXN0SW5zdGFuY2UgPSBpbnN0YW5jZTtcclxuICAgIHdoaWxlIChsYXN0SW5zdGFuY2UgJiYgbGFzdEluc3RhbmNlLnJldHVybikge1xyXG4gICAgICBpZiAobGFzdEluc3RhbmNlLnJldHVybi5zdGF0ZU5vZGUgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkgYnJlYWs7XHJcbiAgICAgIGlmIChsYXN0SW5zdGFuY2UucmV0dXJuLnN0YXRlTm9kZSlcclxuICAgICAgICBzdGF0ZU5vZGVzLnB1c2gobGFzdEluc3RhbmNlLnJldHVybi5zdGF0ZU5vZGUpO1xyXG4gICAgICBsYXN0SW5zdGFuY2UgPSBsYXN0SW5zdGFuY2UucmV0dXJuO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN0YXRlTm9kZXM7XHJcbiAgfSxcclxuICBnZXRQcm9wcyhlbCwgZmlsdGVyID0gKGkpID0+IGksIG1heCA9IDEwMDAwKSB7XHJcbiAgICBjb25zdCBpbnN0YW5jZSA9IHRoaXMuZ2V0SW5zdGFuY2UoZWwpO1xyXG5cclxuICAgIGlmICghaW5zdGFuY2U/LnJldHVybikgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgZm9yIChcclxuICAgICAgbGV0IGN1cnJlbnQgPSBpbnN0YW5jZT8ucmV0dXJuLCBpID0gMDtcclxuICAgICAgaSA+IG1heCB8fCBjdXJyZW50ICE9PSBudWxsO1xyXG4gICAgICBjdXJyZW50ID0gY3VycmVudD8ucmV0dXJuLCBpKytcclxuICAgICkge1xyXG4gICAgICBpZiAoY3VycmVudD8ucGVuZGluZ1Byb3BzICYmIGZpbHRlcihjdXJyZW50LnBlbmRpbmdQcm9wcykpXHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnQucGVuZGluZ1Byb3BzO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH0sXHJcbn0iLCAiaW1wb3J0IGZpbmRJblRyZWUgZnJvbSBcIi4vcmF3L2ZpbmQtaW4tdHJlZS5qc1wiO1xyXG5pbXBvcnQgbG9nZ2VyIGZyb20gXCIuL2xvZ2dlci5qc1wiO1xyXG5pbXBvcnQgcmVhY3QgZnJvbSBcIi4vcmVhY3QuanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBsb2dnZXIsXHJcbiAgcmVhY3QsXHJcbiAgZmluZEluVHJlZSxcclxuICBmb3JtYXQodmFsLCAuLi5hcmdzKSB7XHJcbiAgICByZXR1cm4gYCR7dmFsfWAucmVwbGFjZUFsbCgveyhcXGQrKX0vZywgKF8sIGNhcCkgPT4ge1xyXG4gICAgICByZXR1cm4gYXJnc1tOdW1iZXIoY2FwKV07XHJcbiAgICB9KTtcclxuICB9LFxyXG4gIGludGVydmFsKGNiLCBkdXIpIHtcclxuICAgIGxldCBpbnRlcnZhbCA9IHNldEludGVydmFsKGNiLCBkdXIpO1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgdGltZW91dChjYiwgZHVyKSB7XHJcbiAgICBsZXQgdGltZW91dCA9IHNldFRpbWVvdXQoY2IsIGR1cik7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgaWZFeGlzdHModmFsLCBjYikge1xyXG4gICAgaWYgKHZhbCkgY2IodmFsKTtcclxuICB9LFxyXG4gIGNvcHlUZXh0KHRleHQpIHtcclxuICAgIGlmICh3aW5kb3cuRGlzY29yZE5hdGl2ZSkge1xyXG4gICAgICBEaXNjb3JkTmF0aXZlLmNsaXBib2FyZC5jb3B5KHRleHQpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgbmF2aWdhdG9yLmNsaXBib2FyZC53cml0ZVRleHQodGV4dCkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICBjb25zdCBjb3B5QXJlYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZXh0YXJlYVwiKTtcclxuXHJcbiAgICAgIGNvcHlBcmVhLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xyXG4gICAgICBjb3B5QXJlYS5zdHlsZS5wb3NpdGlvbiA9IFwiZml4ZWRcIjtcclxuICAgICAgY29weUFyZWEuc3R5bGUudG9wID0gXCIwXCI7XHJcbiAgICAgIGNvcHlBcmVhLnN0eWxlLmxlZnQgPSBcIjBcIjtcclxuXHJcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY29weUFyZWEpO1xyXG4gICAgICBjb3B5QXJlYS5mb2N1cygpO1xyXG4gICAgICBjb3B5QXJlYS5zZWxlY3QoKTtcclxuXHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoXCJjb3B5XCIpO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoY29weUFyZWEpO1xyXG4gICAgfSk7XHJcbiAgfSxcclxufSIsICJpbXBvcnQgdXRpbHMgZnJvbSBcIi4uLy4uL3V0aWxzL2luZGV4LmpzXCI7XHJcbmltcG9ydCBsb2dnZXIgZnJvbSBcIi4uLy4uL3V0aWxzL2xvZ2dlci5qc1wiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHdyYXBGaWx0ZXIoZmlsdGVyKSB7XHJcbiAgcmV0dXJuICguLi5hcmdzKSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICBpZiAoYXJnc1swXT8uZG9jdW1lbnQgJiYgYXJnc1swXT8ud2luZG93KSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIGlmIChhcmdzWzBdPy5kZWZhdWx0Py5yZW1vdmUgJiYgYXJnc1swXT8uZGVmYXVsdD8uc2V0ICYmIGFyZ3NbMF0/LmRlZmF1bHQ/LmNsZWFyICYmIGFyZ3NbMF0/LmRlZmF1bHQ/LmdldCAmJiAhYXJnc1swXT8uZGVmYXVsdD8uc29ydCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICBpZiAoYXJnc1swXS5yZW1vdmUgJiYgYXJnc1swXS5zZXQgJiYgYXJnc1swXS5jbGVhciAmJiBhcmdzWzBdLmdldCAmJiAhYXJnc1swXS5zb3J0KSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIGlmIChhcmdzWzBdPy5kZWZhdWx0Py5nZXRUb2tlbiB8fCBhcmdzWzBdPy5kZWZhdWx0Py5nZXRFbWFpbCB8fCBhcmdzWzBdPy5kZWZhdWx0Py5zaG93VG9rZW4pIHJldHVybiBmYWxzZTtcclxuICAgICAgaWYgKGFyZ3NbMF0/LmdldFRva2VuIHx8IGFyZ3NbMF0/LmdldEVtYWlsIHx8IGFyZ3NbMF0/LnNob3dUb2tlbikgcmV0dXJuIGZhbHNlO1xyXG4gICAgICByZXR1cm4gZmlsdGVyKC4uLmFyZ3MpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycikge1xyXG4gICAgICBsb2dnZXIud2FybihcIk1vZHVsZSBmaWx0ZXIgdGhyZXcgYW4gZXhjZXB0aW9uLlwiLCBmaWx0ZXIsIGVycik7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBjaGVja01vZHVsZVN0cmluZ3MobSwgc3RyaW5ncywgaGFzTm90KSB7XHJcbiAgY29uc3QgY2hlY2sgPSAoczEsIHMyKSA9PiB7XHJcbiAgICByZXR1cm4gaGFzTm90ID8gczEudG9TdHJpbmcoKS5pbmRleE9mKHMyLnRvU3RyaW5nKCkpID09IC0xIDogczEudG9TdHJpbmcoKS5pbmRleE9mKHMyLnRvU3RyaW5nKCkpID4gLTE7XHJcbiAgfTtcclxuICByZXR1cm4gc3RyaW5ncy5ldmVyeShqID0+IHtcclxuICAgIHJldHVybiBjaGVjayhtPy50b1N0cmluZz8uKCkgfHwgXCJcIiwgailcclxuICAgICAgfHwgY2hlY2sobT8uX19vcmlnaW5hbF9fPy50b1N0cmluZz8uKCkgfHwgXCJcIiwgailcclxuICAgICAgfHwgY2hlY2sobT8udHlwZT8udG9TdHJpbmc/LigpIHx8IFwiXCIsIGopXHJcbiAgICAgIHx8IGNoZWNrKG0/LnR5cGU/Ll9fb3JpZ2luYWxfXz8udG9TdHJpbmc/LigpIHx8IFwiXCIsIGopXHJcbiAgICAgIHx8IE9iamVjdC5lbnRyaWVzKFsnZnVuY3Rpb24nLCAnb2JqZWN0J10uaW5jbHVkZXModHlwZW9mIG0/LnByb3RvdHlwZSkgPyB0eXBlb2YgbT8ucHJvdG90eXBlIDoge30pLmZpbHRlcihpID0+IGlbMF0/LmluY2x1ZGVzPy4oXCJyZW5kZXJcIikpLnNvbWUoaSA9PiBjaGVjayhpWzFdPy50b1N0cmluZz8uKCkgfHwgXCJcIiwgaikpXHJcbiAgfSk7XHJcbn07XHJcbmZ1bmN0aW9uIGNoZWNrTW9kdWxlUHJvcHMobSwgcHJvcGVydGllcywgaGFzTm90KSB7XHJcbiAgcmV0dXJuIHByb3BlcnRpZXMuZXZlcnkocHJvcCA9PiB7XHJcbiAgICBjb25zdCB2YWx1ZSA9IG1bcHJvcF0/Ll9fb3JpZ2luYWxfXyB8fCBtW3Byb3BdO1xyXG4gICAgcmV0dXJuIGhhc05vdCA/IHZhbHVlID09PSB1bmRlZmluZWQgOiAodmFsdWUgIT09IHVuZGVmaW5lZCAmJiAhKHR5cGVvZiB2YWx1ZSA9PSBcInN0cmluZ1wiICYmICF2YWx1ZSkpO1xyXG4gIH0pO1xyXG59O1xyXG5mdW5jdGlvbiBjaGVja01vZHVsZVByb3RvdHlwZXMobSwgcHJvdG9Qcm9wcywgaGFzTm90KSB7XHJcbiAgcmV0dXJuIG0ucHJvdG90eXBlICYmIHByb3RvUHJvcHMuZXZlcnkocHJvcCA9PiB7XHJcbiAgICBjb25zdCB2YWx1ZSA9IG0ucHJvdG90eXBlW3Byb3BdO1xyXG4gICAgcmV0dXJuIGhhc05vdCA/IHZhbHVlID09PSB1bmRlZmluZWQgOiAodmFsdWUgIT09IHVuZGVmaW5lZCAmJiAhKHR5cGVvZiB2YWx1ZSA9PSBcInN0cmluZ1wiICYmICF2YWx1ZSkpO1xyXG4gIH0pO1xyXG59O1xyXG5cclxuY29uc3Qgd2VicGFja0NodW5rTmFtZSA9IFwid2VicGFja0NodW5rZGlzY29yZF9hcHBcIjtcclxuY29uc3QgcHVzaExpc3RlbmVycyA9IG5ldyBTZXQoKTtcclxuXHJcblxyXG57XHJcbiAgbGV0IG9nUHVzaCA9IHdpbmRvd1t3ZWJwYWNrQ2h1bmtOYW1lXS5wdXNoO1xyXG5cclxuICBmdW5jdGlvbiBoYW5kbGVQdXNoKGNodW5rKSB7XHJcbiAgICBjb25zdCBbLCBtb2R1bGVzXSA9IGNodW5rO1xyXG5cclxuICAgIGZvciAoY29uc3QgbW9kdWxlSWQgaW4gT2JqZWN0LmtleXMobW9kdWxlcyB8fCB7fSkpIHtcclxuICAgICAgY29uc3Qgb2dNb2R1bGUgPSBtb2R1bGVzW21vZHVsZUlkXTtcclxuXHJcbiAgICAgIG1vZHVsZXNbbW9kdWxlSWRdID0gKG1vZHVsZSwgZXhwb3J0cywgcmVxdWlyZSkgPT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICBvZ01vZHVsZS5jYWxsKG51bGwsIG1vZHVsZSwgZXhwb3J0cywgcmVxdWlyZSk7XHJcblxyXG4gICAgICAgICAgcHVzaExpc3RlbmVycy5mb3JFYWNoKGxpc3RlbmVyID0+IHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICBsaXN0ZW5lcihleHBvcnRzKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICB1dGlscy5sb2dnZXIuZXJyb3IoXCJQdXNoIGxpc3RlbmVyIHRocmV3IGFuIGV4Y2VwdGlvbi5cIiwgbGlzdGVuZXIsIGVycm9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgdXRpbHMubG9nZ2VyLmVycm9yKFwiVW5hYmxlIHRvIHBhdGNoIHB1c2hlZCBtb2R1bGUuXCIsIGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcblxyXG4gICAgICBPYmplY3QuYXNzaWduKG1vZHVsZXNbbW9kdWxlSWRdLCBvZ01vZHVsZSwge1xyXG4gICAgICAgIF9fb3JpZ2luYWxfXzogb2dNb2R1bGUsXHJcbiAgICAgICAgdG9TdHJpbmc6ICgpID0+IG9nTW9kdWxlLnRvU3RyaW5nKCksXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBvZ1B1c2guY2FsbCh3aW5kb3dbd2VicGFja0NodW5rTmFtZV0sIGNodW5rKTtcclxuICB9XHJcblxyXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3dbd2VicGFja0NodW5rTmFtZV0sIFwicHVzaFwiLCB7XHJcbiAgICBjb25maWd1cmFibGU6IHRydWUsXHJcbiAgICBnZXQoKSB7IHJldHVybiBoYW5kbGVQdXNoOyB9LFxyXG4gICAgc2V0KHZhbHVlKSB7XHJcbiAgICAgIG9nUHVzaCA9IHZhbHVlO1xyXG5cclxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvd1t0aGlzLmNodW5rTmFtZV0sIFwicHVzaFwiLCB7XHJcbiAgICAgICAgdmFsdWU6IHRoaXMuaGFuZGxlUHVzaCxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXHJcbiAgICAgICAgd3JpdGFibGU6IHRydWVcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn1cclxuXHJcblxyXG5cclxuLyoqXHJcbiAqIFxyXG4gKiBAcGFyYW0ge2FueX0gZmlsdGVyIFxyXG4gKiBAcGFyYW0ge3sgc2lnbmFsOiBBYm9ydFNpZ25hbCwgc2VhcmNoRXhwb3J0czogYm9vbGVhbiB9fSBwYXJhbTEgXHJcbiAqIEByZXR1cm5zIFxyXG4gKi9cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGxhenlGaW5kKGZpbHRlciwgeyBzaWduYWwgPSBudWxsLCBzZWFyY2hFeHBvcnRzID0gZmFsc2UgfSkge1xyXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICBjb25zdCBjYW5jZWwgPSAoKSA9PiBwdXNoTGlzdGVuZXJzLmRlbGV0ZShsaXN0ZW5lcik7XHJcbiAgICBjb25zdCBsaXN0ZW5lciA9IChleHBvcnRzKSA9PiB7XHJcbiAgICAgIGlmICghZXhwb3J0cyB8fCBleHBvcnRzID09PSB3aW5kb3cgfHwgZXhwb3J0cyA9PT0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSByZXR1cm47XHJcblxyXG4gICAgICBsZXQgZm91bmQgPSBudWxsO1xyXG5cclxuICAgICAgaWYgKHR5cGVvZiBleHBvcnRzID09IFwib2JqZWN0XCIgJiYgc2VhcmNoRXhwb3J0cykge1xyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIGV4cG9ydHMpIHtcclxuICAgICAgICAgIGxldCBleHBvcnRlZCA9IGV4cG9ydHNba2V5XTtcclxuICAgICAgICAgIGlmICghZXhwb3J0ZWQpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgaWYgKGZpbHRlcihleHBvcnRlZCkpIHtcclxuICAgICAgICAgICAgZm91bmQgPSBleHBvcnRlZDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGxldCBwYXRocyA9IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIixcclxuICAgICAgICAgIFwiXCJcclxuICAgICAgICBdO1xyXG4gICAgICAgIGZvdW5kID0gcGF0aHMubWFwKGkgPT4ge1xyXG4gICAgICAgICAgbGV0IHBhdGhlZCA9ICFpID8gZXhwb3J0cyA6IF8uZ2V0KGV4cG9ydHMsIGkpO1xyXG4gICAgICAgICAgaWYgKHBhdGhlZCAmJiBmaWx0ZXIocGF0aGVkKSkgcmV0dXJuIHBhdGhlZDtcclxuICAgICAgICB9KS5maW5kKGkgPT4gaSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICghZm91bmQpIHJldHVybjtcclxuICAgICAgY2FuY2VsKCk7XHJcbiAgICAgIHJlc29sdmUoZm91bmQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1c2hMaXN0ZW5lcnMuYWRkKGxpc3RlbmVyKTtcclxuXHJcbiAgICBzaWduYWw/LmFkZEV2ZW50TGlzdGVuZXIoXCJhYm9ydFwiLCAoKSA9PiB7XHJcbiAgICAgIGNhbmNlbCgpO1xyXG4gICAgICByZXNvbHZlKG51bGwpO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBmaW5kKHJlcSwgZmlsdGVyLCBjb25maWcgPSB7fSkge1xyXG4gIGxldCBkZWZhdWx0RXhwb3J0ID0gdHlwZW9mIGNvbmZpZy5kZWZhdWx0RXhwb3J0ICE9IFwiYm9vbGVhblwiID8gZmFsc2UgOiBjb25maWcuZGVmYXVsdEV4cG9ydDtcclxuICBsZXQgdW5sb2FkZWQgPSB0eXBlb2YgY29uZmlnLnVubG9hZGVkICE9IFwiYm9vbGVhblwiID8gZmFsc2UgOiBjb25maWcudW5sb2FkZWQ7XHJcbiAgbGV0IGFsbCA9IHR5cGVvZiBjb25maWcuYWxsICE9IFwiYm9vbGVhblwiID8gZmFsc2UgOiBjb25maWcuYWxsO1xyXG4gIGNvbnN0IGZvdW5kID0gW107XHJcbiAgaWYgKCF1bmxvYWRlZCkgZm9yIChsZXQgaSBpbiByZXEuYykgaWYgKHJlcS5jLmhhc093blByb3BlcnR5KGkpKSB7XHJcbiAgICBsZXQgbSA9IHJlcS5jW2ldLmV4cG9ydHMsIHIgPSBudWxsO1xyXG4gICAgaWYgKG0gJiYgKHR5cGVvZiBtID09IFwib2JqZWN0XCIgfHwgdHlwZW9mIG0gPT0gXCJmdW5jdGlvblwiKSkge1xyXG4gICAgICBpZiAoISEociA9IGZpbHRlcihtLCBpKSkpIHtcclxuICAgICAgICBpZiAoYWxsKSBmb3VuZC5wdXNoKGRlZmF1bHRFeHBvcnQgPyByIDogcmVxLmNbaV0pO1xyXG4gICAgICAgIGVsc2UgcmV0dXJuIGRlZmF1bHRFeHBvcnQgPyByIDogcmVxLmNbaV07XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBmb3IgKGxldCBrZXkgb2YgT2JqZWN0LmtleXMobSkpIGlmIChrZXkubGVuZ3RoIDwgNCAmJiBtW2tleV0gJiYgISEociA9IGZpbHRlcihtW2tleV0sIGkpKSkge1xyXG4gICAgICAgIGlmIChhbGwpIGZvdW5kLnB1c2goZGVmYXVsdEV4cG9ydCA/IHIgOiByZXEuY1tpXSk7XHJcbiAgICAgICAgZWxzZSByZXR1cm4gZGVmYXVsdEV4cG9ydCA/IHIgOiByZXEuY1tpXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKG0gJiYgbS5fX2VzTW9kdWxlICYmIG0uZGVmYXVsdCAmJiAodHlwZW9mIG0uZGVmYXVsdCA9PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBtLmRlZmF1bHQgPT0gXCJmdW5jdGlvblwiKSkge1xyXG4gICAgICBpZiAoISEociA9IGZpbHRlcihtLmRlZmF1bHQsIGkpKSkge1xyXG4gICAgICAgIGlmIChhbGwpIGZvdW5kLnB1c2goZGVmYXVsdEV4cG9ydCA/IHIgOiByZXEuY1tpXSk7XHJcbiAgICAgICAgZWxzZSByZXR1cm4gZGVmYXVsdEV4cG9ydCA/IHIgOiByZXEuY1tpXTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIGlmIChtLmRlZmF1bHQudHlwZSAmJiAodHlwZW9mIG0uZGVmYXVsdC50eXBlID09IFwib2JqZWN0XCIgfHwgdHlwZW9mIG0uZGVmYXVsdC50eXBlID09IFwiZnVuY3Rpb25cIikgJiYgISEociA9IGZpbHRlcihtLmRlZmF1bHQudHlwZSwgaSkpKSB7XHJcbiAgICAgICAgaWYgKGFsbCkgZm91bmQucHVzaChkZWZhdWx0RXhwb3J0ID8gciA6IHJlcS5jW2ldKTtcclxuICAgICAgICBlbHNlIHJldHVybiBkZWZhdWx0RXhwb3J0ID8gciA6IHJlcS5jW2ldO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIGZvciAobGV0IGkgaW4gcmVxLm0pIGlmIChyZXEubS5oYXNPd25Qcm9wZXJ0eShpKSkge1xyXG4gICAgbGV0IG0gPSByZXEubVtpXTtcclxuICAgIGlmIChtICYmIHR5cGVvZiBtID09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICBpZiAocmVxLmNbaV0gJiYgIXVubG9hZGVkICYmIGZpbHRlcihtLCBpKSkge1xyXG4gICAgICAgIGlmIChhbGwpIGZvdW5kLnB1c2goZGVmYXVsdEV4cG9ydCA/IHJlcS5jW2ldLmV4cG9ydHMgOiByZXEuY1tpXSk7XHJcbiAgICAgICAgZWxzZSByZXR1cm4gZGVmYXVsdEV4cG9ydCA/IHJlcS5jW2ldLmV4cG9ydHMgOiByZXEuY1tpXTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoIXJlcS5jW2ldICYmIHVubG9hZGVkICYmIGZpbHRlcihtLCBpKSkge1xyXG4gICAgICAgIGNvbnN0IHJlc29sdmVkID0ge30sIHJlc29sdmVkMiA9IHt9O1xyXG4gICAgICAgIG0ocmVzb2x2ZWQsIHJlc29sdmVkMiwgcmVxKTtcclxuICAgICAgICBjb25zdCB0cnVlUmVzb2x2ZWQgPSByZXNvbHZlZDIgJiYgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMocmVzb2x2ZWQyIHx8IHt9KS5sZW5ndGggPT0gMCA/IHJlc29sdmVkIDogcmVzb2x2ZWQyO1xyXG4gICAgICAgIGlmIChhbGwpIGZvdW5kLnB1c2goZGVmYXVsdEV4cG9ydCA/IHRydWVSZXNvbHZlZC5leHBvcnRzIDogdHJ1ZVJlc29sdmVkKTtcclxuICAgICAgICBlbHNlIHJldHVybiBkZWZhdWx0RXhwb3J0ID8gdHJ1ZVJlc29sdmVkLmV4cG9ydHMgOiB0cnVlUmVzb2x2ZWQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgaWYgKGFsbCkgcmV0dXJuIGZvdW5kO1xyXG59O1xyXG5cclxuXHJcbmZ1bmN0aW9uIGZpbmRlckZpbmRGdW5jdGlvbihlbnRyaWVzLCBzdHJpbmdzKSB7XHJcbiAgcmV0dXJuIChlbnRyaWVzLmZpbmQobiA9PiB7XHJcbiAgICBsZXQgZnVuY1N0cmluZyA9IHR5cGVvZiBuWzFdID09IFwiZnVuY3Rpb25cIiA/IChuWzFdPy5fX29yaWdpbmFsX18/LnRvU3RyaW5nPy4oKSB8fCBuWzFdPy50b1N0cmluZz8uKCkgfHwgXCJcIikgOiAoKCkgPT4geyB0cnkgeyByZXR1cm4gSlNPTi5zdHJpbmdpZnkoblsxXSkgfSBjYXRjaCAoZXJyKSB7IHJldHVybiBuWzFdLnRvU3RyaW5nKCkgfSB9KSgpO1xyXG4gICAgbGV0IHJlbmRlckZ1bmNTdHJpbmcgPSBuWzFdPy5yZW5kZXI/Ll9fb3JpZ2luYWxfXz8udG9TdHJpbmc/LigpIHx8IG5bMV0/LnJlbmRlcj8udG9TdHJpbmc/LigpIHx8IFwiXCI7XHJcbiAgICByZXR1cm4gc3RyaW5ncy5ldmVyeShzdHJpbmcgPT4gZnVuY1N0cmluZy5pbmRleE9mKHN0cmluZykgIT0gLTEgfHwgcmVuZGVyRnVuY1N0cmluZy5pbmRleE9mKHN0cmluZykgIT0gLTEpO1xyXG4gIH0pKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRlclRvRmlsdGVyKGZpbmRlcikge1xyXG4gIGxldCBmb3VuZCA9ICgpID0+IGZhbHNlO1xyXG4gIGlmICh0eXBlb2YgZmluZGVyPy5maWx0ZXIgPT09IFwic3RyaW5nXCIpIHtcclxuICAgIGZvdW5kID0gd3JhcEZpbHRlcihldmFsKGAoKCQpPT57IHRyeSB7IHJldHVybiAoJHtmaW5kZXIuZmlsdGVyfSk7IH0gY2F0Y2ggeyByZXR1cm4gZmFsc2U7IH0gfSlgKSk7XHJcbiAgfSBlbHNlIGlmICh0eXBlb2YgZmluZGVyPy5maWx0ZXIgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgZm91bmQgPSB3cmFwRmlsdGVyKGZpbmRlci5maWx0ZXIpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBzd2l0Y2ggKGZpbmRlci5maWx0ZXIuaW4pIHtcclxuICAgICAgY2FzZSBcInByb3BlcnRpZXNcIjoge1xyXG4gICAgICAgIGlmIChmaW5kZXIuZmlsdGVyLmJ5Py5bMV0/Lmxlbmd0aCkge1xyXG4gICAgICAgICAgZm91bmQgPSB3cmFwRmlsdGVyKChtKSA9PiBjaGVja01vZHVsZVByb3BzKG0sIGZpbmRlci5maWx0ZXIuYnk/LlswXSB8fCBbXSkgJiYgY2hlY2tNb2R1bGVQcm9wcyhtLCBmaW5kZXIuZmlsdGVyLmJ5Py5bMV0gfHwgW10sIHRydWUpKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZm91bmQgPSB3cmFwRmlsdGVyKChtKSA9PiBjaGVja01vZHVsZVByb3BzKG0sIGZpbmRlci5maWx0ZXIuYnk/LlswXSB8fCBbXSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlIFwicHJvdG90eXBlc1wiOiB7XHJcbiAgICAgICAgaWYgKGZpbmRlci5maWx0ZXIuYnk/LlsxXT8ubGVuZ3RoKSB7XHJcbiAgICAgICAgICBmb3VuZCA9IHdyYXBGaWx0ZXIoKG0pID0+IGNoZWNrTW9kdWxlUHJvdG90eXBlcyhtLCBmaW5kZXIuZmlsdGVyLmJ5Py5bMF0gfHwgW10pICYmIGNoZWNrTW9kdWxlUHJvdG90eXBlcyhtLCBmaW5kZXIuZmlsdGVyLmJ5Py5bMV0gfHwgW10sIHRydWUpKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZm91bmQgPSB3cmFwRmlsdGVyKChtKSA9PiBjaGVja01vZHVsZVByb3RvdHlwZXMobSwgZmluZGVyLmZpbHRlci5ieT8uWzBdIHx8IFtdKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgXCJzdHJpbmdzXCI6IHtcclxuICAgICAgICBpZiAoZmluZGVyLmZpbHRlci5ieT8uWzFdPy5sZW5ndGgpIHtcclxuICAgICAgICAgIGZvdW5kID0gd3JhcEZpbHRlcigobSkgPT4gY2hlY2tNb2R1bGVTdHJpbmdzKG0sIGZpbmRlci5maWx0ZXIuYnk/LlswXSB8fCBbXSkgJiYgY2hlY2tNb2R1bGVTdHJpbmdzKG0sIGZpbmRlci5maWx0ZXIuYnk/LlsxXSB8fCBbXSwgdHJ1ZSkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBmb3VuZCA9IHdyYXBGaWx0ZXIoKG0pID0+IGNoZWNrTW9kdWxlU3RyaW5ncyhtLCBmaW5kZXIuZmlsdGVyLmJ5Py5bMF0gfHwgW10pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIGZvdW5kO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZmluZGVyTWFwKF9fb3JpZ2luYWxfXywgbWFwKSB7XHJcbiAgbGV0IF9fbWFwcGVkX18gPSB7fTtcclxuXHJcbiAgbGV0IHRlbXAgPSB7XHJcbiAgICBfX29yaWdpbmFsX18sXHJcbiAgICBfX21hcHBlZF9fLFxyXG4gICAgLi4uX19vcmlnaW5hbF9fXHJcbiAgfTtcclxuXHJcbiAgT2JqZWN0LmVudHJpZXMobWFwKS5mb3JFYWNoKChba2V5LCBzdHJpbmdzXSkgPT4ge1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRlbXAsIGtleSwge1xyXG4gICAgICBnZXQoKSB7XHJcbiAgICAgICAgaWYgKF9fbWFwcGVkX19ba2V5XSkgcmV0dXJuIF9fb3JpZ2luYWxfX1tfX21hcHBlZF9fW2tleV1dO1xyXG5cclxuICAgICAgICBsZXQgZm91bmRGdW5jID0gZmluZGVyRmluZEZ1bmN0aW9uKE9iamVjdC5lbnRyaWVzKF9fb3JpZ2luYWxfXyB8fCB7fSksIG1hcFtrZXldIHx8IFtdKTtcclxuICAgICAgICBpZiAoIWZvdW5kRnVuYz8ubGVuZ3RoKSByZXR1cm47XHJcblxyXG4gICAgICAgIF9fbWFwcGVkX19ba2V5XSA9IGZvdW5kRnVuY1swXTtcclxuICAgICAgICByZXR1cm4gZm91bmRGdW5jWzFdO1xyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gdGVtcDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRCeUZpbmRlcihyZXEsIGZpbmRlciA9IHt9KSB7XHJcbiAgY29uc3QgZGVmYXVsdEV4cG9ydCA9ICEhZmluZGVyPy5maWx0ZXI/LmV4cG9ydDtcclxuICBsZXQgZm91bmQgPSBmaW5kKHJlcSwgZmluZGVyVG9GaWx0ZXIoZmluZGVyKSwgeyBkZWZhdWx0RXhwb3J0LCBhbGw6IHRydWUgfSkuZmluZChpID0+IGkgIT09IGdsb2JhbFRoaXMud2luZG93IHx8IGk/LmV4cG9ydHMgIT09IGdsb2JhbFRoaXMud2luZG93KTtcclxuXHJcbiAgaWYgKCFmb3VuZCkgcmV0dXJuIG51bGw7XHJcblxyXG4gIGlmIChmaW5kZXIucGF0aD8uYmVmb3JlKSBmb3VuZCA9IChBcnJheS5pc0FycmF5KGZpbmRlci5wYXRoLmJlZm9yZSkgPyBmaW5kZXIucGF0aC5iZWZvcmUubWFwKGkgPT4gXy5nZXQoZm91bmQsIGkpKS5maW5kKGkgPT4gaSkgOiBfLmdldChmb3VuZCwgZmluZGVyLnBhdGguYmVmb3JlKSkgfHwgZm91bmQ7XHJcbiAgaWYgKGZpbmRlci5hc3NpZ24pIGZvdW5kID0gT2JqZWN0LmFzc2lnbih7fSwgZm91bmQpO1xyXG5cclxuICBpZiAoIWZvdW5kKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgaWYgKGZpbmRlci5tYXApIGZvdW5kID0gZmluZGVyTWFwKGZvdW5kLCBmaW5kZXIubWFwKTtcclxuXHJcbiAgaWYgKGZpbmRlci5wYXRoPy5hZnRlcikgZm91bmQgPSAoQXJyYXkuaXNBcnJheShmaW5kZXIucGF0aC5hZnRlcikgPyBmaW5kZXIucGF0aC5hZnRlci5tYXAoaSA9PiBfLmdldChmb3VuZCwgaSkpLmZpbmQoaSA9PiBpKSA6IF8uZ2V0KGZvdW5kLCBmaW5kZXIucGF0aC5hZnRlcikpIHx8IGZvdW5kO1xyXG5cclxuICByZXR1cm4gZm91bmQ7XHJcbn1cclxuXHJcblxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGxhenlGaW5kQnlGaW5kZXIoZmluZGVyID0ge30pIHtcclxuICBsZXQgZm91bmQgPSBhd2FpdCBsYXp5RmluZChmaW5kZXJUb0ZpbHRlcihmaW5kZXIpLCB7IHNlYXJjaEV4cG9ydHM6IGZhbHNlIH0pO1xyXG5cclxuICBpZiAoIWZvdW5kKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgaWYgKGZpbmRlci5wYXRoPy5iZWZvcmUpIGZvdW5kID0gKEFycmF5LmlzQXJyYXkoZmluZGVyLnBhdGguYmVmb3JlKSA/IGZpbmRlci5wYXRoLmJlZm9yZS5tYXAoaSA9PiBfLmdldChmb3VuZCwgaSkpLmZpbmQoaSA9PiBpKSA6IF8uZ2V0KGZvdW5kLCBmaW5kZXIucGF0aC5iZWZvcmUpKSB8fCBmb3VuZDtcclxuICBpZiAoZmluZGVyLmFzc2lnbikgZm91bmQgPSBPYmplY3QuYXNzaWduKHt9LCBmb3VuZCk7XHJcblxyXG4gIGlmICghZm91bmQpIHJldHVybiBudWxsO1xyXG5cclxuICBpZiAoZmluZGVyLm1hcCkgZm91bmQgPSBmaW5kZXJNYXAoZm91bmQsIGZpbmRlci5tYXApO1xyXG5cclxuICBpZiAoZmluZGVyLnBhdGg/LmFmdGVyKSBmb3VuZCA9IChBcnJheS5pc0FycmF5KGZpbmRlci5wYXRoLmFmdGVyKSA/IGZpbmRlci5wYXRoLmFmdGVyLm1hcChpID0+IF8uZ2V0KGZvdW5kLCBpKSkuZmluZChpID0+IGkpIDogXy5nZXQoZm91bmQsIGZpbmRlci5wYXRoLmFmdGVyKSkgfHwgZm91bmQ7XHJcblxyXG4gIHJldHVybiBmb3VuZDtcclxufSIsICJpbXBvcnQgKiBhcyBjb21wbGV4RmluZGVyIGZyb20gXCIuL3Jhdy9jb21wbGV4LWZpbmRlci5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIF9fY2FjaGVfXzoge30sXHJcbiAgZ2V0IHJlcXVpcmUoKSB7XHJcbiAgICBpZiAodGhpcy5fX2NhY2hlX18ucmVxdWlyZSkgcmV0dXJuIHRoaXMuX19jYWNoZV9fLnJlcXVpcmU7XHJcbiAgICBsZXQgcmVxSWQgPSBgQWNvcmRXZWJwYWNrTW9kdWxlcyR7RGF0ZS5ub3coKX1gO1xyXG4gICAgY29uc3QgcmVxID0gd2luZG93LndlYnBhY2tDaHVua2Rpc2NvcmRfYXBwLnB1c2goW1tyZXFJZF0sIHt9LCByZXEgPT4gcmVxXSk7XHJcbiAgICBkZWxldGUgcmVxLm1bcmVxSWRdO1xyXG4gICAgZGVsZXRlIHJlcS5jW3JlcUlkXTtcclxuICAgIHdpbmRvdy53ZWJwYWNrQ2h1bmtkaXNjb3JkX2FwcC5wb3AoKTtcclxuICAgIHRoaXMuX19jYWNoZV9fLnJlcXVpcmUgPSByZXE7XHJcbiAgICByZXR1cm4gcmVxO1xyXG4gIH0sXHJcbiAgZmluZChmaWx0ZXIsIGNvbmZpZyA9IHt9KSB7XHJcbiAgICByZXR1cm4gY29tcGxleEZpbmRlci5maW5kKHRoaXMucmVxdWlyZSwgY29tcGxleEZpbmRlci53cmFwRmlsdGVyKGZpbHRlciksIGNvbmZpZyk7XHJcbiAgfSxcclxuICBsYXp5RmluZChmaWx0ZXIsIGNvbmZpZyA9IHt9KSB7XHJcbiAgICByZXR1cm4gY29tcGxleEZpbmRlci5sYXp5RmluZChjb21wbGV4RmluZGVyLndyYXBGaWx0ZXIoZmlsdGVyKSwgY29uZmlnKTtcclxuICB9LFxyXG4gIGxhenlGaW5kQnlGaW5kZXIoZmluZGVyKSB7XHJcbiAgICByZXR1cm4gY29tcGxleEZpbmRlci5sYXp5RmluZEJ5RmluZGVyKGZpbmRlcik7XHJcbiAgfSxcclxuICBmaWx0ZXIoZmlsdGVyLCBjb25maWcgPSB7fSkge1xyXG4gICAgcmV0dXJuIGNvbXBsZXhGaW5kZXIuZmluZCh0aGlzLnJlcXVpcmUsIGNvbXBsZXhGaW5kZXIud3JhcEZpbHRlcihmaWx0ZXIpLCB7IC4uLmNvbmZpZywgYWxsOiB0cnVlIH0pO1xyXG4gIH0sXHJcbiAgZmluZEJ5RmluZGVyKGZpbmRlcikge1xyXG4gICAgcmV0dXJuIGNvbXBsZXhGaW5kZXIuZmluZEJ5RmluZGVyKHRoaXMucmVxdWlyZSwgZmluZGVyKTtcclxuICB9LFxyXG4gIGZpbmRCeVN0cmluZ1ZhbHVlcyguLi5zdHJpbmdWYWx1ZXMpIHtcclxuICAgIHJldHVybiB0aGlzLmZpbmQoKGEpID0+IHsgbGV0IHZhID0gT2JqZWN0LnZhbHVlcyhhKTsgcmV0dXJuIHN0cmluZ1ZhbHVlcy5ldmVyeSh4ID0+IHZhLnNvbWUoeSA9PiB0eXBlb2YgeSA9PSBcInN0cmluZ1wiICYmIHkuaW5jbHVkZXMoeCkpKSB9KT8uZXhwb3J0cztcclxuICB9LFxyXG4gIGZpbmRCeVByb3BlcnRpZXMoLi4ucHJvcHMpIHtcclxuICAgIHJldHVybiB0aGlzLmZpbmRCeUZpbmRlcih7XHJcbiAgICAgIGZpbHRlcjoge1xyXG4gICAgICAgIGV4cG9ydDogZmFsc2UsXHJcbiAgICAgICAgaW46IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIGJ5OiBbcHJvcHNdXHJcbiAgICAgIH0sXHJcbiAgICAgIHBhdGg6IHtcclxuICAgICAgICBiZWZvcmU6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSxcclxuICBmaW5kQnlQcm90b3R5cGVzKC4uLnByb3BzKSB7XHJcbiAgICByZXR1cm4gdGhpcy5maW5kQnlGaW5kZXIoe1xyXG4gICAgICBmaWx0ZXI6IHtcclxuICAgICAgICBleHBvcnQ6IGZhbHNlLFxyXG4gICAgICAgIGluOiBcInByb3RvdHlwZXNcIixcclxuICAgICAgICBieTogW3Byb3BzXVxyXG4gICAgICB9LFxyXG4gICAgICBwYXRoOiB7XHJcbiAgICAgICAgYmVmb3JlOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgZmluZEJ5U3RyaW5ncyguLi5wcm9wcykge1xyXG4gICAgcmV0dXJuIHRoaXMuZmluZEJ5RmluZGVyKHtcclxuICAgICAgZmlsdGVyOiB7XHJcbiAgICAgICAgZXhwb3J0OiBmYWxzZSxcclxuICAgICAgICBpbjogXCJzdHJpbmdzXCIsXHJcbiAgICAgICAgYnk6IFtwcm9wc11cclxuICAgICAgfSxcclxuICAgICAgcGF0aDoge1xyXG4gICAgICAgIGJlZm9yZTogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9LFxyXG59OyIsICJpbXBvcnQgY29tbW9uRGF0YSBmcm9tICcuLi8uLi9kYXRhL2NvbW1vbi5qc29uJztcclxuaW1wb3J0IHdlYnBhY2sgZnJvbSAnLi93ZWJwYWNrLmpzJztcclxuXHJcblxyXG5mdW5jdGlvbiBtYXBPYmplY3QodGVtcCwgaW5wKSB7XHJcbiAgaWYgKCF0ZW1wPy5fX2NhY2hlX18pIHRlbXAuX19jYWNoZV9fID0ge307XHJcbiAgZm9yIChjb25zdCBrZXkgaW4gaW5wKSB7XHJcbiAgICBpZiAoaW5wPy5ba2V5XT8uX18gPT09IHRydWUpIHtcclxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRlbXAsIGtleSwge1xyXG4gICAgICAgIGdldCgpIHtcclxuICAgICAgICAgIGlmICh0ZW1wLl9fY2FjaGVfX1trZXldKSByZXR1cm4gdGVtcC5fX2NhY2hlX19ba2V5XTtcclxuICAgICAgICAgIHJldHVybiB0ZW1wLl9fY2FjaGVfX1trZXldID0gd2VicGFjay5maW5kQnlGaW5kZXIoaW5wW2tleV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICh0eXBlb2YgdGVtcFtrZXldID09PSBcInVuZGVmaW5lZFwiKSB0ZW1wW2tleV0gPSB7fTtcclxuICAgICAgbWFwT2JqZWN0KHRlbXBba2V5XSwgaW5wW2tleV0pO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuXHJcbmxldCBjb21tb24gPSB7XHJcbiAgX19jYWNoZV9fOiB7fSxcclxuICBMYXllckFjdGlvbnM6IHtcclxuICAgIHB1c2goY29tcG9uZW50KSB7XHJcbiAgICAgIGNvbW1vbi5GbHV4RGlzcGF0Y2hlci5kaXNwYXRjaCh7XHJcbiAgICAgICAgdHlwZTogXCJMQVlFUl9QVVNIXCIsXHJcbiAgICAgICAgY29tcG9uZW50XHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIHBvcCgpIHtcclxuICAgICAgY29tbW9uLkZsdXhEaXNwYXRjaGVyLmRpc3BhdGNoKHtcclxuICAgICAgICB0eXBlOiBcIkxBWUVSX1BPUFwiXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIHBvcEFsbCgpIHtcclxuICAgICAgY29tbW9uLkZsdXhEaXNwYXRjaGVyLmRpc3BhdGNoKHtcclxuICAgICAgICB0eXBlOiBcIkxBWUVSX1BPUF9BTExcIlxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9LFxyXG59O1xyXG5tYXBPYmplY3QoY29tbW9uLCBjb21tb25EYXRhLmNvbW1vbik7XHJcbntcclxuICBsZXQgcGF0aHMgPSBbXHJcbiAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgXCJleHBvcnRzXCJcclxuICBdO1xyXG4gIHdlYnBhY2suZmlsdGVyKChpKSA9PiBpPy5nZXROYW1lPy4oKT8uZW5kc1dpdGg/LihcIlN0b3JlXCIpLCB7IGRlZmF1bHRFeHBvcnQ6IGZhbHNlIH0pLmZvckVhY2goKG0pID0+IHtcclxuICAgIGxldCBvYmogPSBwYXRocy5tYXAocGF0aCA9PiBfLmdldChtLCBwYXRoKSkuZmluZChpID0+IGkpO1xyXG4gICAgaWYgKCFvYmopIHJldHVybjtcclxuICAgIGxldCBuYW1lID0gb2JqPy5nZXROYW1lPy4oKTtcclxuICAgIGlmICghbmFtZSkgcmV0dXJuO1xyXG4gICAgaWYgKGNvbW1vbltuYW1lXSkgcmV0dXJuO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb21tb24sIG5hbWUsIHtcclxuICAgICAgZ2V0KCkge1xyXG4gICAgICAgIGlmIChjb21tb24uX19jYWNoZV9fW25hbWVdKSByZXR1cm4gY29tbW9uLl9fY2FjaGVfX1tuYW1lXTtcclxuICAgICAgICByZXR1cm4gY29tbW9uLl9fY2FjaGVfX1tuYW1lXSA9IG9iajtcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9KVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb21tb247IiwgImltcG9ydCBjb21tb24gZnJvbSBcIi4vY29tbW9uLmpzXCI7XHJcbmltcG9ydCB3ZWJwYWNrIGZyb20gXCIuL3dlYnBhY2suanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBjb21tb24sXHJcbiAgd2VicGFjayxcclxuICByZXF1aXJlOiBnbG9iYWxUaGlzW1wiPFBSRUxPQURfS0VZPlwiXS5yZXF1aXJlLFxyXG4gIG5hdGl2ZTogRGlzY29yZE5hdGl2ZSxcclxufSIsICJpbXBvcnQgbW9kdWxlcyBmcm9tIFwiLi4vYXBpL21vZHVsZXMvaW5kZXguanNcIjtcclxuXHJcbmxldCBpc0Nvbm5lY3Rpb25PcGVuID0gZmFsc2U7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gd2FpdFVudGlsQ29ubmVjdGlvbk9wZW4oKSB7XHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICBpZiAoaXNDb25uZWN0aW9uT3BlbikgcmV0dXJuIHJlc29sdmUodHJ1ZSk7XHJcbiAgICBmdW5jdGlvbiBvbkV2ZW50KCkge1xyXG4gICAgICBtb2R1bGVzLmNvbW1vbi5GbHV4RGlzcGF0Y2hlci51bnN1YnNjcmliZShcIkNPTk5FQ1RJT05fT1BFTlwiLCBvbkV2ZW50KTtcclxuICAgICAgaXNDb25uZWN0aW9uT3BlbiA9IHRydWU7XHJcbiAgICAgIHJlc29sdmUodHJ1ZSk7XHJcbiAgICB9XHJcbiAgICBtb2R1bGVzLmNvbW1vbi5GbHV4RGlzcGF0Y2hlci5zdWJzY3JpYmUoXCJDT05ORUNUSU9OX09QRU5cIiwgb25FdmVudCk7XHJcbiAgfSk7XHJcbn0iLCAiZXhwb3J0IGNsYXNzIEJhc2ljRXZlbnRFbWl0dGVyIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIC8qKiBAdHlwZSB7TWFwPHN0cmluZywgTWFwPCguLi5hcmdzOiBhbnlbXSk9PnZvaWQsIHtvbmNlOiBib29sZWFufT4+fSAqL1xyXG4gICAgdGhpcy5saXN0ZW5lcnMgPSBuZXcgTWFwKCk7XHJcbiAgfVxyXG5cclxuICBfcHJlcGFyZUxpc3RlbmVyc01hcChldmVudE5hbWUpIHtcclxuICAgIGlmICghdGhpcy5saXN0ZW5lcnMuaGFzKGV2ZW50TmFtZSkpXHJcbiAgICAgIHRoaXMubGlzdGVuZXJzLnNldChldmVudE5hbWUsIG5ldyBNYXAoKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnROYW1lXHJcbiAgICogQHBhcmFtIHsoLi4uYXJnczogYW55W10pPT52b2lkfSBsaXN0ZW5lclxyXG4gICAqL1xyXG4gIG9uKGV2ZW50TmFtZSwgbGlzdGVuZXIpIHtcclxuICAgIHRoaXMuX3ByZXBhcmVMaXN0ZW5lcnNNYXAoZXZlbnROYW1lKTtcclxuICAgIHRoaXMubGlzdGVuZXJzLmdldChldmVudE5hbWUpLnNldChsaXN0ZW5lciwgeyBvbmNlOiBmYWxzZSB9KTtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIHRoaXMubGlzdGVuZXJzLmdldChldmVudE5hbWUpLmRlbGV0ZShsaXN0ZW5lcik7XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50TmFtZVxyXG4gICAqIEBwYXJhbSB7KC4uLmFyZ3M6IGFueVtdKT0+dm9pZH0gbGlzdGVuZXJcclxuICAgKi9cclxuICBvbmNlKGV2ZW50TmFtZSwgbGlzdGVuZXIpIHtcclxuICAgIHRoaXMuX3ByZXBhcmVMaXN0ZW5lcnNNYXAoZXZlbnROYW1lKTtcclxuICAgIHRoaXMubGlzdGVuZXJzLmdldChldmVudE5hbWUpPy5zZXQobGlzdGVuZXIsIHsgb25jZTogdHJ1ZSB9KTtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIHRoaXMubGlzdGVuZXJzLmdldChldmVudE5hbWUpLmRlbGV0ZShsaXN0ZW5lcik7XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtzdHJpbmc/fSBldmVudE5hbWVcclxuICAgKiBAcGFyYW0geygoLi4uYXJnczogYW55W10pPT52b2lkKT99IGxpc3RlbmVyXHJcbiAgICovXHJcbiAgb2ZmKGV2ZW50TmFtZSwgbGlzdGVuZXIpIHtcclxuICAgIGlmICghZXZlbnROYW1lKSByZXR1cm4gKHRoaXMubGlzdGVuZXJzID0gbmV3IE1hcCgpKTtcclxuICAgIGlmICghbGlzdGVuZXIpIHJldHVybiB0aGlzLmxpc3RlbmVycz8uZGVsZXRlKGV2ZW50TmFtZSk7XHJcbiAgICB0aGlzLmxpc3RlbmVycy5nZXQoZXZlbnROYW1lKT8uZGVsZXRlKGxpc3RlbmVyKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudE5hbWVcclxuICAgKiBAcGFyYW0gIHsuLi5hbnl9IGFyZ3NcclxuICAgKi9cclxuICBlbWl0KGV2ZW50TmFtZSwgLi4uYXJncykge1xyXG4gICAgaWYgKCF0aGlzLmxpc3RlbmVycy5oYXMoZXZlbnROYW1lKSkgcmV0dXJuO1xyXG4gICAgbGV0IGV2ZW50TWFwID0gdGhpcy5saXN0ZW5lcnMuZ2V0KGV2ZW50TmFtZSk7XHJcbiAgICBldmVudE1hcC5mb3JFYWNoKCh7IG9uY2UgfSwgbGlzdGVuZXIpID0+IHtcclxuICAgICAgaWYgKG9uY2UpIGV2ZW50TWFwPy5kZWxldGUobGlzdGVuZXIpO1xyXG4gICAgICBsaXN0ZW5lciguLi5hcmdzKTtcclxuICAgIH0pO1xyXG4gIH1cclxufTtcclxuIiwgImltcG9ydCB7IEJhc2ljRXZlbnRFbWl0dGVyIH0gZnJvbSBcIi4uLy4uL2xpYi9CYXNpY0V2ZW50RW1pdHRlci5qc1wiO1xyXG5cclxuY29uc3QgZXZlbnRzID0gbmV3IEJhc2ljRXZlbnRFbWl0dGVyKCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBldmVudHM7IiwgImltcG9ydCBldmVudHMgZnJvbSBcIi4uL2V2ZW50c1wiO1xyXG5pbXBvcnQgd2VicGFjayBmcm9tIFwiLi4vbW9kdWxlcy93ZWJwYWNrLmpzXCI7XHJcblxyXG5jb25zdCBzY3JvbGxiYXJDbGFzc2VzID0gd2VicGFjay5maW5kQnlQcm9wZXJ0aWVzKFwic2Nyb2xsYmFyR2hvc3RIYWlybGluZVwiLCBcInNwaW5uZXJcIik7XHJcblxyXG5jb25zdCBmb3JtYXRSZWdleGVzID0ge1xyXG4gIGJvbGQ6IC9cXCpcXCooW14qXSspXFwqXFwqL2csXHJcbiAgaXRhbGljOiAvXFwqKFteKl0rKVxcKi9nLFxyXG4gIHVuZGVybGluZTogL1xcXyhbXipdKylcXF8vZyxcclxuICBzdHJpa2U6IC9cXH5cXH4oW14qXSspXFx+XFx+L2csXHJcbiAgdXJsOiAvKFxcYihodHRwcz98ZnRwfGZpbGUpOlxcL1xcL1stQS1aMC05KyZAI1xcLyU/PX5ffCE6LC47XSpbLUEtWjAtOSsmQCNcXC8lPX5ffF0pL2lnLFxyXG4gIGlubGluZTogL1xcYChbXipdKylcXGAvZyxcclxuICBjb2RlYmxvY2tTaW5nbGU6IC9cXGBcXGBcXGAoW14qXSspXFxgXFxgXFxgL2csXHJcbiAgY29kZWJsb2NrTXVsdGk6IC9cXGBcXGBcXGAoXFx3KylcXG4oKD86KD8hXFxgXFxgXFxgKVtcXHNcXFNdKSopXFxgXFxgXFxgL2dcclxufVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBwYXJzZShodG1sKSB7XHJcbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGRpdi5pbm5lckhUTUwgPSBodG1sO1xyXG4gICAgcmV0dXJuIGRpdi5maXJzdEVsZW1lbnRDaGlsZDtcclxuICB9LFxyXG4gIHRvQ1NTUHJvcChvKSB7XHJcbiAgICBsZXQgZWxtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIE9iamVjdC5lbnRyaWVzKG8pLmZvckVhY2goKGkpID0+IHtcclxuICAgICAgaWYgKGVsbS5zdHlsZS5oYXNPd25Qcm9wZXJ0eShpWzBdKSkge1xyXG4gICAgICAgIGVsbS5zdHlsZVtpWzBdXSA9IGlbMV07XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZWxtLnN0eWxlLnNldFByb3BlcnR5KGlbMF0sIGlbMV0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBlbG0uZ2V0QXR0cmlidXRlKFwic3R5bGVcIik7XHJcbiAgfSxcclxuICB0b0hUTUxQcm9wcyhvKSB7XHJcbiAgICByZXR1cm4gT2JqZWN0LmVudHJpZXMobylcclxuICAgICAgLm1hcChcclxuICAgICAgICAoaSkgPT5cclxuICAgICAgICAgIGAke2lbMF0ucmVwbGFjZSgvICsvLCBcIi1cIil9PVwiJHtpWzBdID09IFwic3R5bGVcIiAmJiB0eXBlb2YgaVsxXSAhPSBcInN0cmluZ1wiXHJcbiAgICAgICAgICAgID8gdGhpcy50b0NTU1Byb3AoaVsxXSlcclxuICAgICAgICAgICAgOiB0aGlzLmVzY2FwZUhUTUwoaVsxXSl9XCJgXHJcbiAgICAgIClcclxuICAgICAgLmpvaW4oXCIgXCIpO1xyXG4gIH0sXHJcbiAgZXNjYXBlKGh0bWwpIHtcclxuICAgIHJldHVybiBuZXcgT3B0aW9uKGh0bWwpLmlubmVySFRNTDtcclxuICB9LFxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gZWxtIFxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gc2VsZWN0b3JPck51bWJlciBcclxuICAgKiBAcmV0dXJucyB7RWxlbWVudFtdfVxyXG4gICAqL1xyXG4gIHBhcmVudHMoZWxtLCBzZWxlY3Rvck9yTnVtYmVyKSB7XHJcbiAgICBsZXQgcGFyZW50cyA9IFtdO1xyXG4gICAgaWYgKHR5cGVvZiBzZWxlY3Rvck9yTnVtYmVyID09PSBcIm51bWJlclwiKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VsZWN0b3JPck51bWJlcjsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGVsbS5wYXJlbnRFbGVtZW50KSB7XHJcbiAgICAgICAgICBlbG0gPSBlbG0ucGFyZW50RWxlbWVudDtcclxuICAgICAgICAgIHBhcmVudHMucHVzaChlbG0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgd2hpbGUgKGVsbS5wYXJlbnRFbGVtZW50ICYmIGVsbS5wYXJlbnRFbGVtZW50LmNsb3Nlc3Qoc2VsZWN0b3JPck51bWJlcikpIHtcclxuICAgICAgICBlbG0gPSBlbG0ucGFyZW50RWxlbWVudC5jbG9zZXN0KHNlbGVjdG9yT3JOdW1iZXIpO1xyXG4gICAgICAgIHBhcmVudHMucHVzaChlbG0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcGFyZW50cztcclxuICB9LFxyXG4gIHBhdGNoOiAoc2VsZWN0b3IsIGNiKSA9PlxyXG4gICAgKCgpID0+IHtcclxuICAgICAgZnVuY3Rpb24gbm9kZUFkZGVkKG5vZGUpIHtcclxuICAgICAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5URVhUX05PREUpIHJldHVybjtcclxuICAgICAgICBub2RlLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpLmZvckVhY2goYXN5bmMgKGVsbSkgPT4ge1xyXG4gICAgICAgICAgaWYgKCFlbG0uYWNvcmQpIHtcclxuICAgICAgICAgICAgZWxtLmFjb3JkID0geyB1bm1vdW50OiBbXSwgcGF0Y2hlZDogbmV3IFNldCgpIH07XHJcbiAgICAgICAgICAgIGVsbS5jbGFzc0xpc3QuYWRkKFwiYWNvcmQtLXBhdGNoZWRcIik7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGVsbS5hY29yZC5wYXRjaGVkLmhhcyhjYikpIHJldHVybjtcclxuICAgICAgICAgIGVsbS5hY29yZC5wYXRjaGVkLmFkZChjYik7XHJcblxyXG4gICAgICAgICAgbGV0IHVuUGF0Y2hDYiA9IGF3YWl0IGNiKGVsbSk7XHJcbiAgICAgICAgICBpZiAodHlwZW9mIHVuUGF0Y2hDYiA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgICAgICBlbG0uYWNvcmQudW5tb3VudC5wdXNoKHVuUGF0Y2hDYik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGZ1bmN0aW9uIG5vZGVSZW1vdmVkKG5vZGUpIHtcclxuICAgICAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5URVhUX05PREUpIHJldHVybjtcclxuICAgICAgICBub2RlLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpLmZvckVhY2goYXN5bmMgKGVsbSkgPT4ge1xyXG4gICAgICAgICAgaWYgKCFlbG0uYWNvcmQpIHJldHVybjtcclxuICAgICAgICAgIGVsbS5hY29yZC51bm1vdW50LmZvckVhY2goKGYpID0+IGYoKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpLmZvckVhY2gobm9kZUFkZGVkKTtcclxuXHJcbiAgICAgIHJldHVybiBldmVudHMub24oXHJcbiAgICAgICAgXCJkb20tbXV0YXRpb25cIixcclxuICAgICAgICAvKiogQHBhcmFtIHtNdXRhdGlvblJlY29yZH0gbXV0ICovKG11dCkgPT4ge1xyXG4gICAgICAgICAgaWYgKG11dC50eXBlID09PSBcImNoaWxkTGlzdFwiKSB7XHJcbiAgICAgICAgICAgIG11dC5hZGRlZE5vZGVzLmZvckVhY2gobm9kZUFkZGVkKTtcclxuICAgICAgICAgICAgbXV0LnJlbW92ZWROb2Rlcy5mb3JFYWNoKG5vZGVSZW1vdmVkKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICk7XHJcbiAgICB9KSgpLFxyXG4gIGZvcm1hdENvbnRlbnQobXNnKSB7XHJcbiAgICBpZiAoIW1zZykgcmV0dXJuICcnO1xyXG4gICAgY29uc3QgeyBib2xkLCBpdGFsaWMsIHVuZGVybGluZSwgc3RyaWtlLCBjb2RlYmxvY2tNdWx0aSwgY29kZWJsb2NrU2luZ2xlLCBpbmxpbmUsIHVybCB9ID0gZm9ybWF0UmVnZXhlcztcclxuXHJcbiAgICBjb25zdCBjb2RlQmxvY2tzTWFwID0gT2JqZWN0LmZyb21FbnRyaWVzKFtcclxuICAgICAgLi4uKG1zZy5tYXRjaEFsbChjb2RlYmxvY2tNdWx0aSkgfHwgW10pLCAuLi4obXNnLm1hdGNoQWxsKGNvZGVibG9ja1NpbmdsZSkgfHwgW10pXHJcbiAgICBdLm1hcChcclxuICAgICAgKFtfLCBjb2RlQmxvY2tPckNvZGUsIGNvZGVCbG9ja0NvbnRlbnRdLCBpKSA9PiB7XHJcbiAgICAgICAgbXNnID0gbXNnLnJlcGxhY2UoXywgYHt7Q09ERUJMT0NLXyR7aX19fWApO1xyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICBge3tDT0RFQkxPQ0tfJHtpfX19YCxcclxuICAgICAgICAgIGNvZGVCbG9ja0NvbnRlbnQgP1xyXG4gICAgICAgICAgICBgPHByZT48Y29kZSBjbGFzcz1cIiR7c2Nyb2xsYmFyQ2xhc3Nlcy5zY3JvbGxiYXJHaG9zdEhhaXJsaW5lfSBobGpzICR7Y29kZUJsb2NrT3JDb2RlfVwiIHN0eWxlPVwicG9zaXRpb246IHJlbGF0aXZlO1wiPiR7bW9kdWxlcy5jb21tb24uaGxqcy5oaWdobGlnaHQoY29kZUJsb2NrT3JDb2RlLCBjb2RlQmxvY2tDb250ZW50KS52YWx1ZX08L2NvZGU+PC9wcmU+YCA6XHJcbiAgICAgICAgICAgIGA8cHJlPjxjb2RlIGNsYXNzPVwiJHtzY3JvbGxiYXJDbGFzc2VzLnNjcm9sbGJhckdob3N0SGFpcmxpbmV9IGhsanNcIiBzdHlsZT1cInBvc2l0aW9uOiByZWxhdGl2ZTtcIj4ke2NvZGVCbG9ja09yQ29kZX08L2NvZGU+PC9wcmU+YFxyXG4gICAgICAgIF07XHJcbiAgICAgIH1cclxuICAgICkpO1xyXG5cclxuICAgIGNvbnN0IGlubGluZU1hcCA9IE9iamVjdC5mcm9tRW50cmllcyhcclxuICAgICAgWy4uLihtc2cubWF0Y2hBbGwoaW5saW5lKSB8fCBbXSldLm1hcChcclxuICAgICAgICAoW18sIGlubGluZUNvbnRlbnRdLCBpKSA9PiB7XHJcbiAgICAgICAgICBtc2cgPSBtc2cucmVwbGFjZShfLCBge3tJTkxJTkVfJHtpfX19YCk7XHJcbiAgICAgICAgICByZXR1cm4gW2B7e0lOTElORV8ke2l9fX1gLCBgPGNvZGUgY2xhc3M9XCJpbmxpbmVcIj4ke2lubGluZUNvbnRlbnR9PC9jb2RlPmBdO1xyXG4gICAgICAgIH1cclxuICAgICAgKVxyXG4gICAgKTtcclxuXHJcbiAgICBtc2cgPSBtc2cucmVwbGFjZShib2xkLCBcIjxiPiQxPC9iPlwiKVxyXG4gICAgICAucmVwbGFjZShpdGFsaWMsIFwiPGk+JDE8L2k+XCIpXHJcbiAgICAgIC5yZXBsYWNlKHVuZGVybGluZSwgXCI8VT4kMTwvVT5cIilcclxuICAgICAgLnJlcGxhY2Uoc3RyaWtlLCBcIjxzPiQxPC9zPlwiKVxyXG4gICAgICAucmVwbGFjZSh1cmwsICc8YSBocmVmPVwiJDFcIj4kMTwvYT4nKTtcclxuXHJcbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhjb2RlQmxvY2tzTWFwKSkge1xyXG4gICAgICBtc2cgPSBtc2cucmVwbGFjZShrZXksIHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhpbmxpbmVNYXApKSB7XHJcbiAgICAgIG1zZyA9IG1zZy5yZXBsYWNlKGtleSwgdmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBtc2c7XHJcbiAgfSxcclxuICByZXNvbHZlKGh0bWxPckVsbSkge1xyXG4gICAgaWYgKGh0bWxPckVsbSBpbnN0YW5jZW9mIEVsZW1lbnQpIHJldHVybiBodG1sT3JFbG07XHJcbiAgICByZXR1cm4gdGhpcy5wYXJzZShodG1sT3JFbG0pO1xyXG4gIH1cclxufVxyXG5cclxue1xyXG4gIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKG11dGF0aW9ucykgPT4ge1xyXG4gICAgbXV0YXRpb25zLmZvckVhY2goKG11dGF0aW9uKSA9PiB7XHJcbiAgICAgIGV2ZW50cy5lbWl0KFwiZG9tLW11dGF0aW9uXCIsIG11dGF0aW9uKTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG4gIG9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQsIHtcclxuICAgIGF0dHJpYnV0ZXM6IHRydWUsXHJcbiAgICBjaGlsZExpc3Q6IHRydWUsXHJcbiAgICBzdWJ0cmVlOiB0cnVlXHJcbiAgfSk7XHJcbn0iLCAiLy8gd2UgdXNlIHRoaXMgYXJyYXkgbXVsdGlwbGUgdGltZXNcclxuZXhwb3J0IGNvbnN0IHBhdGNoVHlwZXMgPSBbXCJhXCIsIFwiYlwiLCBcImlcIl07XHJcbmV4cG9ydCBjb25zdCBwYXRjaGVkT2JqZWN0cyA9IG5ldyBNYXAoKTtcclxuIiwgIi8vIGNhbGxzIHJlbGV2YW50IHBhdGNoZXMgYW5kIHJldHVybnMgdGhlIGZpbmFsIHJlc3VsdFxyXG5pbXBvcnQgeyBwYXRjaGVkT2JqZWN0cyB9IGZyb20gXCIuL3NoYXJlZC5qc1wiO1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoZnVuY05hbWUsIGZ1bmNQYXJlbnQsIGZ1bmNBcmdzLCBcclxuLy8gdGhlIHZhbHVlIG9mIGB0aGlzYCB0byBhcHBseVxyXG5jdHh0LCBcclxuLy8gaWYgdHJ1ZSwgdGhlIGZ1bmN0aW9uIGlzIGFjdHVhbGx5IGNvbnN0cnVjdG9yXHJcbmlzQ29uc3RydWN0KSB7XHJcbiAgICBjb25zdCBwYXRjaCA9IHBhdGNoZWRPYmplY3RzLmdldChmdW5jUGFyZW50KT8uW2Z1bmNOYW1lXTtcclxuICAgIC8vIFRoaXMgaXMgaW4gdGhlIGV2ZW50IHRoYXQgdGhpcyBmdW5jdGlvbiBpcyBiZWluZyBjYWxsZWQgYWZ0ZXIgYWxsIHBhdGNoZXMgYXJlIHJlbW92ZWQuXHJcbiAgICBpZiAoIXBhdGNoKVxyXG4gICAgICAgIHJldHVybiBpc0NvbnN0cnVjdFxyXG4gICAgICAgICAgICA/IFJlZmxlY3QuY29uc3RydWN0KGZ1bmNQYXJlbnRbZnVuY05hbWVdLCBmdW5jQXJncywgY3R4dClcclxuICAgICAgICAgICAgOiBmdW5jUGFyZW50W2Z1bmNOYW1lXS5hcHBseShjdHh0LCBmdW5jQXJncyk7XHJcbiAgICAvLyBCZWZvcmUgcGF0Y2hlc1xyXG4gICAgZm9yIChjb25zdCBob29rIG9mIHBhdGNoLmIudmFsdWVzKCkpIHtcclxuICAgICAgICBjb25zdCBtYXliZWZ1bmNBcmdzID0gaG9vay5jYWxsKGN0eHQsIGZ1bmNBcmdzKTtcclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShtYXliZWZ1bmNBcmdzKSlcclxuICAgICAgICAgICAgZnVuY0FyZ3MgPSBtYXliZWZ1bmNBcmdzO1xyXG4gICAgfVxyXG4gICAgLy8gSW5zdGVhZCBwYXRjaGVzXHJcbiAgICBsZXQgaW5zdGVhZFBhdGNoZWRGdW5jID0gKC4uLmFyZ3MpID0+IGlzQ29uc3RydWN0XHJcbiAgICAgICAgPyBSZWZsZWN0LmNvbnN0cnVjdChwYXRjaC5vLCBhcmdzLCBjdHh0KVxyXG4gICAgICAgIDogcGF0Y2guby5hcHBseShjdHh0LCBhcmdzKTtcclxuICAgIGZvciAoY29uc3QgY2FsbGJhY2sgb2YgcGF0Y2guaS52YWx1ZXMoKSkge1xyXG4gICAgICAgIGNvbnN0IG9sZFBhdGNoRnVuYyA9IGluc3RlYWRQYXRjaGVkRnVuYztcclxuICAgICAgICBpbnN0ZWFkUGF0Y2hlZEZ1bmMgPSAoLi4uYXJncykgPT4gY2FsbGJhY2suY2FsbChjdHh0LCBhcmdzLCBvbGRQYXRjaEZ1bmMpO1xyXG4gICAgfVxyXG4gICAgbGV0IHdvcmtpbmdSZXRWYWwgPSBpbnN0ZWFkUGF0Y2hlZEZ1bmMoLi4uZnVuY0FyZ3MpO1xyXG4gICAgLy8gQWZ0ZXIgcGF0Y2hlc1xyXG4gICAgZm9yIChjb25zdCBob29rIG9mIHBhdGNoLmEudmFsdWVzKCkpXHJcbiAgICAgICAgd29ya2luZ1JldFZhbCA9IGhvb2suY2FsbChjdHh0LCBmdW5jQXJncywgd29ya2luZ1JldFZhbCkgPz8gd29ya2luZ1JldFZhbDtcclxuICAgIHJldHVybiB3b3JraW5nUmV0VmFsO1xyXG59XHJcbiIsICJpbXBvcnQgeyBwYXRjaGVkT2JqZWN0cywgcGF0Y2hUeXBlcyB9IGZyb20gXCIuL3NoYXJlZC5qc1wiO1xyXG5leHBvcnQgZnVuY3Rpb24gdW5QYXRjaChmdW5jUGFyZW50LCBmdW5jTmFtZSwgaG9va0lkLCB0eXBlKSB7XHJcbiAgICBjb25zdCBwYXRjaGVkT2JqZWN0ID0gcGF0Y2hlZE9iamVjdHMuZ2V0KGZ1bmNQYXJlbnQpO1xyXG4gICAgY29uc3QgcGF0Y2ggPSBwYXRjaGVkT2JqZWN0Py5bZnVuY05hbWVdO1xyXG4gICAgaWYgKCFwYXRjaD8uW3R5cGVdLmhhcyhob29rSWQpKVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIHBhdGNoW3R5cGVdLmRlbGV0ZShob29rSWQpO1xyXG4gICAgLy8gSWYgdGhlcmUgYXJlIG5vIG1vcmUgaG9va3MgZm9yIGV2ZXJ5IHR5cGUsIHJlbW92ZSB0aGUgcGF0Y2hcclxuICAgIGlmIChwYXRjaFR5cGVzLmV2ZXJ5KCh0KSA9PiBwYXRjaFt0XS5zaXplID09PSAwKSkge1xyXG4gICAgICAgIC8vIHJlZmxlY3QgZGVmaW5lcHJvcGVydHkgaXMgbGlrZSBvYmplY3QgZGVmaW5lcHJvcGVydHlcclxuICAgICAgICAvLyBidXQgaW5zdGVhZCBvZiBlcnJvcmluZyBpdCByZXR1cm5zIGlmIGl0IHdvcmtlZCBvciBub3QuXHJcbiAgICAgICAgLy8gdGhpcyBpcyBtb3JlIGVhc2lseSBtaW5pZmlhYmxlLCBoZW5jZSBpdHMgdXNlLiAtLSBzaW5rXHJcbiAgICAgICAgY29uc3Qgc3VjY2VzcyA9IFJlZmxlY3QuZGVmaW5lUHJvcGVydHkoZnVuY1BhcmVudCwgZnVuY05hbWUsIHtcclxuICAgICAgICAgICAgdmFsdWU6IHBhdGNoLm8sXHJcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKCFzdWNjZXNzKVxyXG4gICAgICAgICAgICBmdW5jUGFyZW50W2Z1bmNOYW1lXSA9IHBhdGNoLm87XHJcbiAgICAgICAgZGVsZXRlIHBhdGNoZWRPYmplY3RbZnVuY05hbWVdO1xyXG4gICAgfVxyXG4gICAgaWYgKE9iamVjdC5rZXlzKHBhdGNoZWRPYmplY3QpLmxlbmd0aCA9PSAwKVxyXG4gICAgICAgIHBhdGNoZWRPYmplY3RzLmRlbGV0ZShmdW5jUGFyZW50KTtcclxuICAgIHJldHVybiB0cnVlO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiB1blBhdGNoQWxsKCkge1xyXG4gICAgZm9yIChjb25zdCBbcGFyZW50T2JqZWN0LCBwYXRjaGVkT2JqZWN0XSBvZiBwYXRjaGVkT2JqZWN0cy5lbnRyaWVzKCkpXHJcbiAgICAgICAgZm9yIChjb25zdCBmdW5jTmFtZSBpbiBwYXRjaGVkT2JqZWN0KVxyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGhvb2tUeXBlIG9mIHBhdGNoVHlwZXMpXHJcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGhvb2tJZCBvZiBwYXRjaGVkT2JqZWN0W2Z1bmNOYW1lXT8uW2hvb2tUeXBlXS5rZXlzKCkgPz8gW10pXHJcbiAgICAgICAgICAgICAgICAgICAgdW5QYXRjaChwYXJlbnRPYmplY3QsIGZ1bmNOYW1lLCBob29rSWQsIGhvb2tUeXBlKTtcclxufVxyXG4iLCAiLy8gY3VycmllZCAtIGdldFBhdGNoRnVuYyhcImJlZm9yZVwiKSguLi4pXHJcbi8vIGFsbG93cyB1cyB0byBhcHBseSBhbiBhcmd1bWVudCB3aGlsZSBsZWF2aW5nIHRoZSByZXN0IG9wZW4gbXVjaCBjbGVhbmVyLlxyXG4vLyBmdW5jdGlvbmFsIHByb2dyYW1taW5nIHN0cmlrZXMgYWdhaW4hIC0tIHNpbmtcclxuaW1wb3J0IGhvb2sgZnJvbSBcIi4vaG9vay5qc1wiO1xyXG5pbXBvcnQgeyBwYXRjaGVkT2JqZWN0cyB9IGZyb20gXCIuL3NoYXJlZC5qc1wiO1xyXG5pbXBvcnQgeyB1blBhdGNoIH0gZnJvbSBcIi4vdW4tcGF0Y2guanNcIjtcclxuLy8gY3JlYXRlcyBhIGhvb2sgaWYgbmVlZGVkLCBlbHNlIGp1c3QgYWRkcyBvbmUgdG8gdGhlIHBhdGNoZXMgYXJyYXlcclxuZXhwb3J0IGRlZmF1bHQgKHBhdGNoVHlwZSkgPT4gKGZ1bmNOYW1lLCBmdW5jUGFyZW50LCBjYWxsYmFjaywgb25lVGltZSA9IGZhbHNlKSA9PiB7XHJcbiAgICBpZiAodHlwZW9mIGZ1bmNQYXJlbnRbZnVuY05hbWVdICE9PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke2Z1bmNOYW1lfSBpcyBub3QgYSBmdW5jdGlvbiBpbiAke2Z1bmNQYXJlbnQuY29uc3RydWN0b3IubmFtZX1gKTtcclxuICAgIGlmICghcGF0Y2hlZE9iamVjdHMuaGFzKGZ1bmNQYXJlbnQpKVxyXG4gICAgICAgIHBhdGNoZWRPYmplY3RzLnNldChmdW5jUGFyZW50LCB7fSk7XHJcbiAgICBjb25zdCBwYXJlbnRJbmplY3Rpb25zID0gcGF0Y2hlZE9iamVjdHMuZ2V0KGZ1bmNQYXJlbnQpO1xyXG4gICAgaWYgKCFwYXJlbnRJbmplY3Rpb25zW2Z1bmNOYW1lXSkge1xyXG4gICAgICAgIGNvbnN0IG9yaWdGdW5jID0gZnVuY1BhcmVudFtmdW5jTmFtZV07XHJcbiAgICAgICAgLy8gbm90ZSB0byBmdXR1cmUgbWUgb3B0aW1pc2luZyBmb3Igc2l6ZTogZXh0cmFjdGluZyBuZXcgTWFwKCkgdG8gYSBmdW5jIGluY3JlYXNlcyBzaXplIC0tc2lua1xyXG4gICAgICAgIHBhcmVudEluamVjdGlvbnNbZnVuY05hbWVdID0ge1xyXG4gICAgICAgICAgICBvOiBvcmlnRnVuYyxcclxuICAgICAgICAgICAgYjogbmV3IE1hcCgpLFxyXG4gICAgICAgICAgICBpOiBuZXcgTWFwKCksXHJcbiAgICAgICAgICAgIGE6IG5ldyBNYXAoKSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IHJ1bkhvb2sgPSAoY3R4dCwgYXJncywgY29uc3RydWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJldCA9IGhvb2soZnVuY05hbWUsIGZ1bmNQYXJlbnQsIGFyZ3MsIGN0eHQsIGNvbnN0cnVjdCk7XHJcbiAgICAgICAgICAgIGlmIChvbmVUaW1lKVxyXG4gICAgICAgICAgICAgICAgdW5wYXRjaFRoaXNQYXRjaCgpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29uc3QgcmVwbGFjZVByb3h5ID0gbmV3IFByb3h5KG9yaWdGdW5jLCB7XHJcbiAgICAgICAgICAgIGFwcGx5OiAoXywgY3R4dCwgYXJncykgPT4gcnVuSG9vayhjdHh0LCBhcmdzLCBmYWxzZSksXHJcbiAgICAgICAgICAgIGNvbnN0cnVjdDogKF8sIGFyZ3MpID0+IHJ1bkhvb2sob3JpZ0Z1bmMsIGFyZ3MsIHRydWUpLFxyXG4gICAgICAgICAgICBnZXQ6ICh0YXJnZXQsIHByb3AsIHJlY2VpdmVyKSA9PiBwcm9wID09IFwidG9TdHJpbmdcIlxyXG4gICAgICAgICAgICAgICAgPyBvcmlnRnVuYy50b1N0cmluZy5iaW5kKG9yaWdGdW5jKVxyXG4gICAgICAgICAgICAgICAgOiBSZWZsZWN0LmdldCh0YXJnZXQsIHByb3AsIHJlY2VpdmVyKSxcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyB0aGlzIHdvcmtzIGFyb3VuZCBicmVha2luZyBzb21lIGFzeW5jIGZpbmQgaW1wbGVtZW50YXRpb24gd2hpY2ggbGlzdGVucyBmb3IgYXNzaWducyB2aWEgcHJveHlcclxuICAgICAgICAvLyBzZWUgY29tbWVudCBpbiB1bnBhdGNoLnRzXHJcbiAgICAgICAgY29uc3Qgc3VjY2VzcyA9IFJlZmxlY3QuZGVmaW5lUHJvcGVydHkoZnVuY1BhcmVudCwgZnVuY05hbWUsIHtcclxuICAgICAgICAgICAgdmFsdWU6IHJlcGxhY2VQcm94eSxcclxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoIXN1Y2Nlc3MpXHJcbiAgICAgICAgICAgIGZ1bmNQYXJlbnRbZnVuY05hbWVdID0gcmVwbGFjZVByb3h5O1xyXG4gICAgICAgIGZ1bmNQYXJlbnRbZnVuY05hbWVdLl9fb3JpZ2luYWxfXyA9IHBhcmVudEluamVjdGlvbnNbZnVuY05hbWVdLm87XHJcbiAgICB9XHJcbiAgICBjb25zdCBob29rSWQgPSBTeW1ib2woKTtcclxuICAgIGNvbnN0IHVucGF0Y2hUaGlzUGF0Y2ggPSAoKSA9PiB1blBhdGNoKGZ1bmNQYXJlbnQsIGZ1bmNOYW1lLCBob29rSWQsIHBhdGNoVHlwZSk7XHJcbiAgICBwYXJlbnRJbmplY3Rpb25zW2Z1bmNOYW1lXVtwYXRjaFR5cGVdLnNldChob29rSWQsIGNhbGxiYWNrKTtcclxuICAgIHJldHVybiB1bnBhdGNoVGhpc1BhdGNoO1xyXG59O1xyXG4iLCAiaW1wb3J0IGdldFBhdGNoRnVuYyBmcm9tIFwiLi9nZXQtcGF0Y2gtZnVuYy5qc1wiO1xyXG5pbXBvcnQgeyB1blBhdGNoQWxsIH0gZnJvbSBcIi4vdW4tcGF0Y2guanNcIjtcclxuaW1wb3J0IHsgcGF0Y2hlZE9iamVjdHMgYXMgcGF0Y2hlZCB9IGZyb20gXCIuL3NoYXJlZC5qc1wiO1xyXG5jb25zdCBiZWZvcmUgPSBnZXRQYXRjaEZ1bmMoXCJiXCIpO1xyXG5jb25zdCBpbnN0ZWFkID0gZ2V0UGF0Y2hGdW5jKFwiaVwiKTtcclxuY29uc3QgYWZ0ZXIgPSBnZXRQYXRjaEZ1bmMoXCJhXCIpO1xyXG5leHBvcnQgeyBpbnN0ZWFkLCBiZWZvcmUsIGFmdGVyLCB1blBhdGNoQWxsLCBwYXRjaGVkIH07XHJcbiIsICJpbXBvcnQgKiBhcyBzcGl0Um9hc3QgZnJvbSBcIi4uLy4uL2xpYi9zcGl0cm9hc3QvZGlzdC9lc21cIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBfX2NhY2hlX186IHtcclxuICAgIHBhdGNoZWQ6IHNwaXRSb2FzdC5wYXRjaGVkLFxyXG4gIH0sXHJcbiAgYmVmb3JlOiBzcGl0Um9hc3QuYmVmb3JlLFxyXG4gIGFmdGVyOiBzcGl0Um9hc3QuYWZ0ZXIsXHJcbiAgaW5zdGVhZDogc3BpdFJvYXN0Lmluc3RlYWQsXHJcbiAgdW5QYXRjaEFsbDogc3BpdFJvYXN0LnVuUGF0Y2hBbGwsXHJcbiAgaW5qZWN0Q1NTKGNzcykge1xyXG4gICAgY29uc3Qgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XHJcbiAgICBzdHlsZS5jbGFzc05hbWUgPSBgYWNvcmQtLWluamVjdGVkLWNzc2A7XHJcbiAgICBzdHlsZS50ZXh0Q29udGVudCA9IGNzcztcclxuICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xyXG5cclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIHN0eWxlPy5yZW1vdmUoKTtcclxuICAgIH07XHJcbiAgfSxcclxuICB1blBhdGNoQWxsQ1NTKCkge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5hY29yZC0taW5qZWN0ZWQtY3NzXCIpLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgIGVsZW1lbnQucmVtb3ZlKCk7XHJcbiAgICB9KVxyXG4gIH1cclxufSIsICJleHBvcnQgZGVmYXVsdCBgXG5Aa2V5ZnJhbWVzIGFjb3JkTG9hZGluZ0ZhZGV7MCV7b3BhY2l0eTouMX0xMDAle29wYWNpdHk6Ljl9fS5hY29yZC0tc3RhcnR1cC1sb2FkaW5ne2FuaW1hdGlvbjphY29yZExvYWRpbmdGYWRlIC41cyBhbHRlcm5hdGUgaW5maW5pdGUgbGluZWFyO3Bvc2l0aW9uOmFic29sdXRlO3RyYW5zaXRpb246YWxsIC41cyBsaW5lYXI7cmlnaHQ6OHB4O2JvdHRvbTo4cHg7d2lkdGg6MTZweDtoZWlnaHQ6MTZweDtiYWNrZ3JvdW5kLWltYWdlOnVybChcImh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9BY29yZFBsdWdpbi9hc3NldHMvbWFpbi9BY29yZC5zdmdcIik7ZmlsdGVyOmdyYXlzY2FsZSgxKSBicmlnaHRuZXNzKDEpO2JhY2tncm91bmQtcG9zaXRpb246Y2VudGVyO2JhY2tncm91bmQtcmVwZWF0Om5vLXJlcGVhdDtiYWNrZ3JvdW5kLXNpemU6Y29udGFpbjt6LWluZGV4Ojk5OTk5OX0uYWNvcmQtLXN0YXJ0dXAtbG9hZGluZy5oaWRkZW57b3BhY2l0eTowICFpbXBvcnRhbnR9YDtcbiIsICJpbXBvcnQgZG9tIGZyb20gXCIuLi8uLi9hcGkvZG9tL2luZGV4LmpzXCI7XHJcbmltcG9ydCBwYXRjaGVyIGZyb20gXCIuLi8uLi9hcGkvcGF0Y2hlci9pbmRleC5qc1wiO1xyXG5cclxuaW1wb3J0IGNzc1RleHQgZnJvbSBcIi4vc3R5bGUuc2Nzc1wiO1xyXG5sZXQgdW5JbmplY3Q7XHJcblxyXG5hc3luYyBmdW5jdGlvbiBzaG93KCkge1xyXG4gIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFjb3JkLS1zdGFydHVwLWxvYWRpbmdcIikpIHJldHVybjtcclxuICB3aGlsZSAodHJ1ZSkge1xyXG4gICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYXBwLW1vdW50XCIpKSBicmVhaztcclxuICAgIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIDEwMCkpO1xyXG4gIH1cclxuICBjb25zb2xlLmxvZyhcImFjb3JkLS1zdGFydHVwLWxvYWRpbmdcIik7XHJcbiAgdW5JbmplY3QgPSBwYXRjaGVyLmluamVjdENTUyhjc3NUZXh0KTtcclxuICBjb25zdCBlbGVtZW50ID0gZG9tLnBhcnNlKGBcclxuICAgIDxkaXYgY2xhc3M9XCJhY29yZC0tc3RhcnR1cC1sb2FkaW5nXCI+PC9kaXY+XHJcbiAgYClcclxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FwcC1tb3VudFwiKS5hcHBlbmRDaGlsZChlbGVtZW50KTtcclxufVxyXG5cclxuZnVuY3Rpb24gaGlkZSgpIHtcclxuICBsZXQgZWxtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hY29yZC0tc3RhcnR1cC1sb2FkaW5nXCIpO1xyXG4gIGlmIChlbG0pIHtcclxuICAgIGVsbS5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIGVsbS5yZW1vdmUoKTtcclxuICAgICAgdW5JbmplY3Q/LigpO1xyXG4gICAgICB1bkluamVjdCA9IG51bGw7XHJcbiAgICB9LCA1MDApO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIHNob3csXHJcbiAgaGlkZVxyXG59IiwgImxldCBkZXZNb2RlRW5hYmxlZCA9IGZhbHNlO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGdldCBlbmFibGVkKCkge1xyXG4gICAgcmV0dXJuIGRldk1vZGVFbmFibGVkO1xyXG4gIH0sXHJcbiAgc2V0IGVuYWJsZWQodmFsdWUpIHtcclxuICAgIGlmICghZ2xvYmFsVGhpc1tcIjxQUkVMT0FEX0tFWT5cIl0uaXNEZXZUb29sc09wZW4oKSkgdGhyb3cgbmV3IEVycm9yKFwiRGV2IG1vZGUgc3RhdHVzIGNhbiBvbmx5IGJlIG1vZGlmaWVkIHdoZW4gRGV2VG9vbHMgaXMgb3BlbiFcIik7XHJcbiAgICBkZXZNb2RlRW5hYmxlZCA9IHZhbHVlO1xyXG4gIH1cclxufVxyXG5cclxuLy8gVE9ETzogYWRkIGxpdmUgZGV2ZWxvcG1lbnQgbW9kZSIsICJpbXBvcnQgbW9kdWxlcyBmcm9tIFwiLi4vbW9kdWxlcy9pbmRleC5qc1wiXHJcbmltcG9ydCB1dGlscyBmcm9tIFwiLi4vdXRpbHMvaW5kZXguanNcIjtcclxuXHJcbmNvbnN0IEJBU0VfVVJMID0gXCJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vQWNvcmRQbHVnaW4vaTE4bi9tYWluXCI7XHJcbmNvbnN0IG5vU3RvcmUgPSB7IGNhY2hlOiBcIm5vLXN0b3JlXCIgfTtcclxuXHJcblxyXG5jb25zdCBvdXQgPSB7XHJcbiAgX19jYWNoZV9fOiB7XHJcbiAgICBsb2NhbGVJZHM6IFtdLFxyXG4gICAgbG9jYWxpemF0aW9uczoge31cclxuICB9LFxyXG4gIGdldCBsb2NhbGUoKSB7XHJcbiAgICByZXR1cm4gbW9kdWxlcy5jb21tb24uaTE4bi5fcmVxdWVzdGVkTG9jYWxlO1xyXG4gIH0sXHJcbiAgZ2V0KGtleSkge1xyXG4gICAgY2hlY2soKTtcclxuICAgIHJldHVybiBvdXQuX19jYWNoZV9fLmxvY2FsaXphdGlvbnNbb3V0LmxvY2FsZV0/LltrZXldXHJcbiAgICAgIHx8IG91dC5fX2NhY2hlX18ubG9jYWxpemF0aW9ucy5kZWZhdWx0Py5ba2V5XVxyXG4gICAgICB8fCBtb2R1bGVzLmNvbW1vbi5pMThuLk1lc3NhZ2VzW2tleV1cclxuICAgICAgfHwga2V5O1xyXG4gIH0sXHJcbiAgbWVzc2FnZXM6IG5ldyBQcm94eSh7fSwge1xyXG4gICAgZ2V0KF8sIHByb3ApIHtcclxuICAgICAgcmV0dXJuIG91dC5nZXQocHJvcCk7XHJcbiAgICB9XHJcbiAgfSksXHJcbiAgbG9jYWxpemUoc3RyKSB7XHJcbiAgICBpZiAodHlwZW9mIHN0ciA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIHN0cjtcclxuICAgIHJldHVybiBzdHI/LltvdXQubG9jYWxlXVxyXG4gICAgICB8fCBzdHI/LmRlZmF1bHRcclxuICAgICAgfHwgT2JqZWN0LnZhbHVlcyhzdHIpWzBdO1xyXG4gIH0sXHJcbiAgZm9ybWF0KGtleSwgLi4uYXJncykge1xyXG4gICAgcmV0dXJuIHV0aWxzLmZvcm1hdChvdXQuZ2V0KGtleSksIC4uLmFyZ3MpO1xyXG4gIH1cclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gY2hlY2soKSB7XHJcbiAgY29uc3QgbG9jYWxlID0gb3V0LmxvY2FsZTtcclxuICBpZiAoIW91dC5fX2NhY2hlX18ubG9jYWxlSWRzLmxlbmd0aCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgb3V0Ll9fY2FjaGVfXy5sb2NhbGVJZHMgPSBhd2FpdCAoYXdhaXQgZmV0Y2goYCR7QkFTRV9VUkx9L2xvY2FsZXMuanNvbmAsIG5vU3RvcmUpKS5qc29uKCk7XHJcbiAgICB9IGNhdGNoIHsgfVxyXG4gICAgdHJ5IHtcclxuICAgICAgb3V0Ll9fY2FjaGVfXy5sb2NhbGl6YXRpb25zLmRlZmF1bHQgPSBhd2FpdCAoYXdhaXQgZmV0Y2goYCR7QkFTRV9VUkx9L2RlZmF1bHQuanNvbmAsIG5vU3RvcmUpKS5qc29uKCk7XHJcbiAgICB9IGNhdGNoIHsgfVxyXG4gIH1cclxuICBpZiAoXHJcbiAgICBvdXQuX19jYWNoZV9fLmxvY2FsZUlkcy5pbmNsdWRlcyhsb2NhbGUpXHJcbiAgICAmJiAhb3V0Ll9fY2FjaGVfXy5sb2NhbGl6YXRpb25zPy5bbG9jYWxlXVxyXG4gICkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgb3V0Ll9fY2FjaGVfXy5sb2NhbGl6YXRpb25zW2xvY2FsZV0gPSBhd2FpdCAoYXdhaXQgZmV0Y2goYCR7QkFTRV9VUkx9LyR7bG9jYWxlfS5qc29uYCwgbm9TdG9yZSkpLmpzb24oKTtcclxuICAgIH0gY2F0Y2ggeyB9O1xyXG4gIH1cclxufVxyXG5cclxuY2hlY2soKTtcclxuZXhwb3J0IGRlZmF1bHQgb3V0OyIsICJpbXBvcnQgKiBhcyBuZXN0cyBmcm9tIFwibmVzdHNcIjtcclxuaW1wb3J0ICogYXMgaWRiS2V5dmFsIGZyb20gXCJpZGIta2V5dmFsXCI7XHJcbmltcG9ydCB7IGRlQ3ljbGVkLCByZXZpdmUgfSBmcm9tIFwiLi4vLi4vbGliL2pzb24tZGVjeWNsZWRcIjtcclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGFzeW5jIGNyZWF0ZVBlcnNpc3ROZXN0KHN1ZmZpeCkge1xyXG4gICAgbGV0IGNhY2hlZCA9IGF3YWl0IGlkYktleXZhbC5nZXQoYEFjb3JkU3RvcmU7JHtzdWZmaXh9YCk7XHJcbiAgICBpZiAodHlwZW9mIGNhY2hlZCA9PSBcInN0cmluZ1wiKSBjYWNoZWQgPSByZXZpdmUoY2FjaGVkKTtcclxuICAgIGNvbnN0IG5lc3QgPSBuZXN0cy5tYWtlKGNhY2hlZCA/PyB7fSk7XHJcblxyXG4gICAgY29uc3Qgc2F2ZSA9ICgpID0+IHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBpZGJLZXl2YWwuc2V0KGBBY29yZFN0b3JlOyR7c3VmZml4fWAsIGRlQ3ljbGVkKHsgLi4ubmVzdC5naG9zdCB9KSk7XHJcbiAgICAgIH0gY2F0Y2gge1xyXG4gICAgICAgIGlkYktleXZhbC5zZXQoYEFjb3JkU3RvcmU7JHtzdWZmaXh9YCwgZGVDeWNsZWQoe30pKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG5lc3Qub24obmVzdHMuRXZlbnRzLlNFVCwgc2F2ZSk7XHJcbiAgICBuZXN0Lm9uKG5lc3RzLkV2ZW50cy5VUERBVEUsIHNhdmUpO1xyXG4gICAgbmVzdC5vbihuZXN0cy5FdmVudHMuREVMRVRFLCBzYXZlKTtcclxuXHJcbiAgICByZXR1cm4gbmVzdDtcclxuICB9XHJcbn0iLCAiZnVuY3Rpb24gcHJvbWlzaWZ5UmVxdWVzdChyZXF1ZXN0KSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZSAtIGZpbGUgc2l6ZSBoYWNrc1xuICAgICAgICByZXF1ZXN0Lm9uY29tcGxldGUgPSByZXF1ZXN0Lm9uc3VjY2VzcyA9ICgpID0+IHJlc29sdmUocmVxdWVzdC5yZXN1bHQpO1xuICAgICAgICAvLyBAdHMtaWdub3JlIC0gZmlsZSBzaXplIGhhY2tzXG4gICAgICAgIHJlcXVlc3Qub25hYm9ydCA9IHJlcXVlc3Qub25lcnJvciA9ICgpID0+IHJlamVjdChyZXF1ZXN0LmVycm9yKTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZVN0b3JlKGRiTmFtZSwgc3RvcmVOYW1lKSB7XG4gICAgY29uc3QgcmVxdWVzdCA9IGluZGV4ZWREQi5vcGVuKGRiTmFtZSk7XG4gICAgcmVxdWVzdC5vbnVwZ3JhZGVuZWVkZWQgPSAoKSA9PiByZXF1ZXN0LnJlc3VsdC5jcmVhdGVPYmplY3RTdG9yZShzdG9yZU5hbWUpO1xuICAgIGNvbnN0IGRicCA9IHByb21pc2lmeVJlcXVlc3QocmVxdWVzdCk7XG4gICAgcmV0dXJuICh0eE1vZGUsIGNhbGxiYWNrKSA9PiBkYnAudGhlbigoZGIpID0+IGNhbGxiYWNrKGRiLnRyYW5zYWN0aW9uKHN0b3JlTmFtZSwgdHhNb2RlKS5vYmplY3RTdG9yZShzdG9yZU5hbWUpKSk7XG59XG5sZXQgZGVmYXVsdEdldFN0b3JlRnVuYztcbmZ1bmN0aW9uIGRlZmF1bHRHZXRTdG9yZSgpIHtcbiAgICBpZiAoIWRlZmF1bHRHZXRTdG9yZUZ1bmMpIHtcbiAgICAgICAgZGVmYXVsdEdldFN0b3JlRnVuYyA9IGNyZWF0ZVN0b3JlKCdrZXl2YWwtc3RvcmUnLCAna2V5dmFsJyk7XG4gICAgfVxuICAgIHJldHVybiBkZWZhdWx0R2V0U3RvcmVGdW5jO1xufVxuLyoqXG4gKiBHZXQgYSB2YWx1ZSBieSBpdHMga2V5LlxuICpcbiAqIEBwYXJhbSBrZXlcbiAqIEBwYXJhbSBjdXN0b21TdG9yZSBNZXRob2QgdG8gZ2V0IGEgY3VzdG9tIHN0b3JlLiBVc2Ugd2l0aCBjYXV0aW9uIChzZWUgdGhlIGRvY3MpLlxuICovXG5mdW5jdGlvbiBnZXQoa2V5LCBjdXN0b21TdG9yZSA9IGRlZmF1bHRHZXRTdG9yZSgpKSB7XG4gICAgcmV0dXJuIGN1c3RvbVN0b3JlKCdyZWFkb25seScsIChzdG9yZSkgPT4gcHJvbWlzaWZ5UmVxdWVzdChzdG9yZS5nZXQoa2V5KSkpO1xufVxuLyoqXG4gKiBTZXQgYSB2YWx1ZSB3aXRoIGEga2V5LlxuICpcbiAqIEBwYXJhbSBrZXlcbiAqIEBwYXJhbSB2YWx1ZVxuICogQHBhcmFtIGN1c3RvbVN0b3JlIE1ldGhvZCB0byBnZXQgYSBjdXN0b20gc3RvcmUuIFVzZSB3aXRoIGNhdXRpb24gKHNlZSB0aGUgZG9jcykuXG4gKi9cbmZ1bmN0aW9uIHNldChrZXksIHZhbHVlLCBjdXN0b21TdG9yZSA9IGRlZmF1bHRHZXRTdG9yZSgpKSB7XG4gICAgcmV0dXJuIGN1c3RvbVN0b3JlKCdyZWFkd3JpdGUnLCAoc3RvcmUpID0+IHtcbiAgICAgICAgc3RvcmUucHV0KHZhbHVlLCBrZXkpO1xuICAgICAgICByZXR1cm4gcHJvbWlzaWZ5UmVxdWVzdChzdG9yZS50cmFuc2FjdGlvbik7XG4gICAgfSk7XG59XG4vKipcbiAqIFNldCBtdWx0aXBsZSB2YWx1ZXMgYXQgb25jZS4gVGhpcyBpcyBmYXN0ZXIgdGhhbiBjYWxsaW5nIHNldCgpIG11bHRpcGxlIHRpbWVzLlxuICogSXQncyBhbHNvIGF0b21pYyBcdTIwMTMgaWYgb25lIG9mIHRoZSBwYWlycyBjYW4ndCBiZSBhZGRlZCwgbm9uZSB3aWxsIGJlIGFkZGVkLlxuICpcbiAqIEBwYXJhbSBlbnRyaWVzIEFycmF5IG9mIGVudHJpZXMsIHdoZXJlIGVhY2ggZW50cnkgaXMgYW4gYXJyYXkgb2YgYFtrZXksIHZhbHVlXWAuXG4gKiBAcGFyYW0gY3VzdG9tU3RvcmUgTWV0aG9kIHRvIGdldCBhIGN1c3RvbSBzdG9yZS4gVXNlIHdpdGggY2F1dGlvbiAoc2VlIHRoZSBkb2NzKS5cbiAqL1xuZnVuY3Rpb24gc2V0TWFueShlbnRyaWVzLCBjdXN0b21TdG9yZSA9IGRlZmF1bHRHZXRTdG9yZSgpKSB7XG4gICAgcmV0dXJuIGN1c3RvbVN0b3JlKCdyZWFkd3JpdGUnLCAoc3RvcmUpID0+IHtcbiAgICAgICAgZW50cmllcy5mb3JFYWNoKChlbnRyeSkgPT4gc3RvcmUucHV0KGVudHJ5WzFdLCBlbnRyeVswXSkpO1xuICAgICAgICByZXR1cm4gcHJvbWlzaWZ5UmVxdWVzdChzdG9yZS50cmFuc2FjdGlvbik7XG4gICAgfSk7XG59XG4vKipcbiAqIEdldCBtdWx0aXBsZSB2YWx1ZXMgYnkgdGhlaXIga2V5c1xuICpcbiAqIEBwYXJhbSBrZXlzXG4gKiBAcGFyYW0gY3VzdG9tU3RvcmUgTWV0aG9kIHRvIGdldCBhIGN1c3RvbSBzdG9yZS4gVXNlIHdpdGggY2F1dGlvbiAoc2VlIHRoZSBkb2NzKS5cbiAqL1xuZnVuY3Rpb24gZ2V0TWFueShrZXlzLCBjdXN0b21TdG9yZSA9IGRlZmF1bHRHZXRTdG9yZSgpKSB7XG4gICAgcmV0dXJuIGN1c3RvbVN0b3JlKCdyZWFkb25seScsIChzdG9yZSkgPT4gUHJvbWlzZS5hbGwoa2V5cy5tYXAoKGtleSkgPT4gcHJvbWlzaWZ5UmVxdWVzdChzdG9yZS5nZXQoa2V5KSkpKSk7XG59XG4vKipcbiAqIFVwZGF0ZSBhIHZhbHVlLiBUaGlzIGxldHMgeW91IHNlZSB0aGUgb2xkIHZhbHVlIGFuZCB1cGRhdGUgaXQgYXMgYW4gYXRvbWljIG9wZXJhdGlvbi5cbiAqXG4gKiBAcGFyYW0ga2V5XG4gKiBAcGFyYW0gdXBkYXRlciBBIGNhbGxiYWNrIHRoYXQgdGFrZXMgdGhlIG9sZCB2YWx1ZSBhbmQgcmV0dXJucyBhIG5ldyB2YWx1ZS5cbiAqIEBwYXJhbSBjdXN0b21TdG9yZSBNZXRob2QgdG8gZ2V0IGEgY3VzdG9tIHN0b3JlLiBVc2Ugd2l0aCBjYXV0aW9uIChzZWUgdGhlIGRvY3MpLlxuICovXG5mdW5jdGlvbiB1cGRhdGUoa2V5LCB1cGRhdGVyLCBjdXN0b21TdG9yZSA9IGRlZmF1bHRHZXRTdG9yZSgpKSB7XG4gICAgcmV0dXJuIGN1c3RvbVN0b3JlKCdyZWFkd3JpdGUnLCAoc3RvcmUpID0+IFxuICAgIC8vIE5lZWQgdG8gY3JlYXRlIHRoZSBwcm9taXNlIG1hbnVhbGx5LlxuICAgIC8vIElmIEkgdHJ5IHRvIGNoYWluIHByb21pc2VzLCB0aGUgdHJhbnNhY3Rpb24gY2xvc2VzIGluIGJyb3dzZXJzXG4gICAgLy8gdGhhdCB1c2UgYSBwcm9taXNlIHBvbHlmaWxsIChJRTEwLzExKS5cbiAgICBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIHN0b3JlLmdldChrZXkpLm9uc3VjY2VzcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgc3RvcmUucHV0KHVwZGF0ZXIodGhpcy5yZXN1bHQpLCBrZXkpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUocHJvbWlzaWZ5UmVxdWVzdChzdG9yZS50cmFuc2FjdGlvbikpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0pKTtcbn1cbi8qKlxuICogRGVsZXRlIGEgcGFydGljdWxhciBrZXkgZnJvbSB0aGUgc3RvcmUuXG4gKlxuICogQHBhcmFtIGtleVxuICogQHBhcmFtIGN1c3RvbVN0b3JlIE1ldGhvZCB0byBnZXQgYSBjdXN0b20gc3RvcmUuIFVzZSB3aXRoIGNhdXRpb24gKHNlZSB0aGUgZG9jcykuXG4gKi9cbmZ1bmN0aW9uIGRlbChrZXksIGN1c3RvbVN0b3JlID0gZGVmYXVsdEdldFN0b3JlKCkpIHtcbiAgICByZXR1cm4gY3VzdG9tU3RvcmUoJ3JlYWR3cml0ZScsIChzdG9yZSkgPT4ge1xuICAgICAgICBzdG9yZS5kZWxldGUoa2V5KTtcbiAgICAgICAgcmV0dXJuIHByb21pc2lmeVJlcXVlc3Qoc3RvcmUudHJhbnNhY3Rpb24pO1xuICAgIH0pO1xufVxuLyoqXG4gKiBEZWxldGUgbXVsdGlwbGUga2V5cyBhdCBvbmNlLlxuICpcbiAqIEBwYXJhbSBrZXlzIExpc3Qgb2Yga2V5cyB0byBkZWxldGUuXG4gKiBAcGFyYW0gY3VzdG9tU3RvcmUgTWV0aG9kIHRvIGdldCBhIGN1c3RvbSBzdG9yZS4gVXNlIHdpdGggY2F1dGlvbiAoc2VlIHRoZSBkb2NzKS5cbiAqL1xuZnVuY3Rpb24gZGVsTWFueShrZXlzLCBjdXN0b21TdG9yZSA9IGRlZmF1bHRHZXRTdG9yZSgpKSB7XG4gICAgcmV0dXJuIGN1c3RvbVN0b3JlKCdyZWFkd3JpdGUnLCAoc3RvcmUpID0+IHtcbiAgICAgICAga2V5cy5mb3JFYWNoKChrZXkpID0+IHN0b3JlLmRlbGV0ZShrZXkpKTtcbiAgICAgICAgcmV0dXJuIHByb21pc2lmeVJlcXVlc3Qoc3RvcmUudHJhbnNhY3Rpb24pO1xuICAgIH0pO1xufVxuLyoqXG4gKiBDbGVhciBhbGwgdmFsdWVzIGluIHRoZSBzdG9yZS5cbiAqXG4gKiBAcGFyYW0gY3VzdG9tU3RvcmUgTWV0aG9kIHRvIGdldCBhIGN1c3RvbSBzdG9yZS4gVXNlIHdpdGggY2F1dGlvbiAoc2VlIHRoZSBkb2NzKS5cbiAqL1xuZnVuY3Rpb24gY2xlYXIoY3VzdG9tU3RvcmUgPSBkZWZhdWx0R2V0U3RvcmUoKSkge1xuICAgIHJldHVybiBjdXN0b21TdG9yZSgncmVhZHdyaXRlJywgKHN0b3JlKSA9PiB7XG4gICAgICAgIHN0b3JlLmNsZWFyKCk7XG4gICAgICAgIHJldHVybiBwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLnRyYW5zYWN0aW9uKTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGVhY2hDdXJzb3Ioc3RvcmUsIGNhbGxiYWNrKSB7XG4gICAgc3RvcmUub3BlbkN1cnNvcigpLm9uc3VjY2VzcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnJlc3VsdClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgY2FsbGJhY2sodGhpcy5yZXN1bHQpO1xuICAgICAgICB0aGlzLnJlc3VsdC5jb250aW51ZSgpO1xuICAgIH07XG4gICAgcmV0dXJuIHByb21pc2lmeVJlcXVlc3Qoc3RvcmUudHJhbnNhY3Rpb24pO1xufVxuLyoqXG4gKiBHZXQgYWxsIGtleXMgaW4gdGhlIHN0b3JlLlxuICpcbiAqIEBwYXJhbSBjdXN0b21TdG9yZSBNZXRob2QgdG8gZ2V0IGEgY3VzdG9tIHN0b3JlLiBVc2Ugd2l0aCBjYXV0aW9uIChzZWUgdGhlIGRvY3MpLlxuICovXG5mdW5jdGlvbiBrZXlzKGN1c3RvbVN0b3JlID0gZGVmYXVsdEdldFN0b3JlKCkpIHtcbiAgICByZXR1cm4gY3VzdG9tU3RvcmUoJ3JlYWRvbmx5JywgKHN0b3JlKSA9PiB7XG4gICAgICAgIC8vIEZhc3QgcGF0aCBmb3IgbW9kZXJuIGJyb3dzZXJzXG4gICAgICAgIGlmIChzdG9yZS5nZXRBbGxLZXlzKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzaWZ5UmVxdWVzdChzdG9yZS5nZXRBbGxLZXlzKCkpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGl0ZW1zID0gW107XG4gICAgICAgIHJldHVybiBlYWNoQ3Vyc29yKHN0b3JlLCAoY3Vyc29yKSA9PiBpdGVtcy5wdXNoKGN1cnNvci5rZXkpKS50aGVuKCgpID0+IGl0ZW1zKTtcbiAgICB9KTtcbn1cbi8qKlxuICogR2V0IGFsbCB2YWx1ZXMgaW4gdGhlIHN0b3JlLlxuICpcbiAqIEBwYXJhbSBjdXN0b21TdG9yZSBNZXRob2QgdG8gZ2V0IGEgY3VzdG9tIHN0b3JlLiBVc2Ugd2l0aCBjYXV0aW9uIChzZWUgdGhlIGRvY3MpLlxuICovXG5mdW5jdGlvbiB2YWx1ZXMoY3VzdG9tU3RvcmUgPSBkZWZhdWx0R2V0U3RvcmUoKSkge1xuICAgIHJldHVybiBjdXN0b21TdG9yZSgncmVhZG9ubHknLCAoc3RvcmUpID0+IHtcbiAgICAgICAgLy8gRmFzdCBwYXRoIGZvciBtb2Rlcm4gYnJvd3NlcnNcbiAgICAgICAgaWYgKHN0b3JlLmdldEFsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHByb21pc2lmeVJlcXVlc3Qoc3RvcmUuZ2V0QWxsKCkpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGl0ZW1zID0gW107XG4gICAgICAgIHJldHVybiBlYWNoQ3Vyc29yKHN0b3JlLCAoY3Vyc29yKSA9PiBpdGVtcy5wdXNoKGN1cnNvci52YWx1ZSkpLnRoZW4oKCkgPT4gaXRlbXMpO1xuICAgIH0pO1xufVxuLyoqXG4gKiBHZXQgYWxsIGVudHJpZXMgaW4gdGhlIHN0b3JlLiBFYWNoIGVudHJ5IGlzIGFuIGFycmF5IG9mIGBba2V5LCB2YWx1ZV1gLlxuICpcbiAqIEBwYXJhbSBjdXN0b21TdG9yZSBNZXRob2QgdG8gZ2V0IGEgY3VzdG9tIHN0b3JlLiBVc2Ugd2l0aCBjYXV0aW9uIChzZWUgdGhlIGRvY3MpLlxuICovXG5mdW5jdGlvbiBlbnRyaWVzKGN1c3RvbVN0b3JlID0gZGVmYXVsdEdldFN0b3JlKCkpIHtcbiAgICByZXR1cm4gY3VzdG9tU3RvcmUoJ3JlYWRvbmx5JywgKHN0b3JlKSA9PiB7XG4gICAgICAgIC8vIEZhc3QgcGF0aCBmb3IgbW9kZXJuIGJyb3dzZXJzXG4gICAgICAgIC8vIChhbHRob3VnaCwgaG9wZWZ1bGx5IHdlJ2xsIGdldCBhIHNpbXBsZXIgcGF0aCBzb21lIGRheSlcbiAgICAgICAgaWYgKHN0b3JlLmdldEFsbCAmJiBzdG9yZS5nZXRBbGxLZXlzKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgICAgIHByb21pc2lmeVJlcXVlc3Qoc3RvcmUuZ2V0QWxsS2V5cygpKSxcbiAgICAgICAgICAgICAgICBwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLmdldEFsbCgpKSxcbiAgICAgICAgICAgIF0pLnRoZW4oKFtrZXlzLCB2YWx1ZXNdKSA9PiBrZXlzLm1hcCgoa2V5LCBpKSA9PiBba2V5LCB2YWx1ZXNbaV1dKSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaXRlbXMgPSBbXTtcbiAgICAgICAgcmV0dXJuIGN1c3RvbVN0b3JlKCdyZWFkb25seScsIChzdG9yZSkgPT4gZWFjaEN1cnNvcihzdG9yZSwgKGN1cnNvcikgPT4gaXRlbXMucHVzaChbY3Vyc29yLmtleSwgY3Vyc29yLnZhbHVlXSkpLnRoZW4oKCkgPT4gaXRlbXMpKTtcbiAgICB9KTtcbn1cblxuZXhwb3J0IHsgY2xlYXIsIGNyZWF0ZVN0b3JlLCBkZWwsIGRlbE1hbnksIGVudHJpZXMsIGdldCwgZ2V0TWFueSwga2V5cywgcHJvbWlzaWZ5UmVxdWVzdCwgc2V0LCBzZXRNYW55LCB1cGRhdGUsIHZhbHVlcyB9O1xuIiwgIlwidXNlIHN0cmljdFwiO1xyXG5cclxuZnVuY3Rpb24gZGVDeWNsZXIodmFsLCBjb25maWcpIHtcclxuICBjb25maWcgPSB0eXBlb2YgY29uZmlnID09PSAnbnVtYmVyJyA/IHsgZGVlcDogY29uZmlnIH0gOiAoY29uZmlnIHx8IHt9KTtcclxuICBjb25maWcuZGVlcCA9IGNvbmZpZy5kZWVwIHx8IDEwO1xyXG4gIHJldHVybiBkZWN5Y2xlV2Fsa2VyKFtdLCBbXSwgdmFsLCBjb25maWcpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkZUN5Y2xlZCh2YWwsIGNvbmZpZykge1xyXG4gIGNvbmZpZyA9IHR5cGVvZiBjb25maWcgPT09ICdudW1iZXInID8geyBkZWVwOiBjb25maWcgfSA6IChjb25maWcgfHwge30pO1xyXG4gIHZhbCA9IGRlQ3ljbGVyKHZhbCwgY29uZmlnKTtcclxuICB0cnkge1xyXG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHZhbCwgdW5kZWZpbmVkLCBjb25maWcuc3BhY2VyKTtcclxuICB9IGNhdGNoIChlKSB7XHJcbiAgICByZXR1cm4gZTtcclxuICB9XHJcbn1cclxuXHJcbnZhciByZXZpdmVyRGF0ZSA9IC9eXFxbRGF0ZTooKFxcZHs0fS1cXGR7Mn0tXFxkezJ9KVtBLVpdKyhcXGR7Mn06XFxkezJ9OlxcZHsyfSkuKFswLTkrLTpdKylaKVxcXSQvO1xyXG52YXIgcmV2aXZlclJlZ0V4cCA9IC9eXFxbUmVnZXhwOlxcLyguKylcXC9cXF0kLztcclxudmFyIHJldml2ZXJFcnJvciA9IC9eXFxbRXJyb3I6KFtcXFdcXHddKylcXF0kLztcclxudmFyIHJldml2ZXJGdW5jdGlvbiA9IC9eXFxbRnVuY3Rpb246KC4rKVxcXSQvO1xyXG5mdW5jdGlvbiByZXZpdmUodmFsLCBmdW5jdGlvbnMpIHtcclxuICB0cnkge1xyXG4gICAgcmV0dXJuIEpTT04ucGFyc2UodmFsLCByZXZpdmVyKTtcclxuICB9IGNhdGNoIChlKSB7XHJcbiAgICByZXR1cm4gZTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHJldml2ZXIoa2V5LCB2YWwpIHtcclxuICAgIGlmIChyZXZpdmVyRGF0ZS50ZXN0KHZhbCkpIHtcclxuICAgICAgdmFsID0gcmV2aXZlckRhdGUuZXhlYyh2YWwpO1xyXG4gICAgICB2YWwgPSBuZXcgRGF0ZSh2YWxbMV0pO1xyXG4gICAgICByZXR1cm4gbmV3IERhdGUodmFsKTtcclxuICAgIH0gZWxzZSBpZiAocmV2aXZlclJlZ0V4cC50ZXN0KHZhbCkpIHtcclxuICAgICAgdmFsID0gcmV2aXZlclJlZ0V4cC5leGVjKHZhbClbMV07XHJcbiAgICAgIHJldHVybiBuZXcgUmVnRXhwKHZhbCk7XHJcbiAgICB9IGVsc2UgaWYgKHJldml2ZXJFcnJvci50ZXN0KHZhbCkpIHtcclxuICAgICAgdmFsID0gcmV2aXZlckVycm9yLmV4ZWModmFsKVsxXTtcclxuICAgICAgdmFyIGVycm9yID0gbmV3IEVycm9yKHZhbC5zcGxpdCgnXFxuJylbMF0pO1xyXG4gICAgICBpZiAoZXJyb3Iuc3RhY2spIHtcclxuICAgICAgICBlcnJvci5zdGFjayA9IHZhbDtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gZXJyb3I7XHJcbiAgICB9IGVsc2UgaWYgKGZ1bmN0aW9ucyAmJiByZXZpdmVyRnVuY3Rpb24udGVzdCh2YWwpKSB7XHJcbiAgICAgIHZhbCA9IHJldml2ZXJGdW5jdGlvbi5leGVjKHZhbClbMV07XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgcmV0dXJuIChuZXcgRnVuY3Rpb24oXCJyZXR1cm4gXCIgKyB2YWwgKyBcIjtcIikpKCk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgcmV0dXJuIGVycm9yO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gdmFsO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZGVjeWNsZVdhbGtlcihwYXJlbnRzLCBwYXRoLCB2YWwsIGNvbmZpZykge1xyXG4gIGlmIChbJ3VuZGVmaW5lZCcsICdudW1iZXInLCAnYm9vbGVhbicsICdzdHJpbmcnXS5pbmRleE9mKHR5cGVvZiB2YWwpID49IDAgfHwgdmFsID09PSBudWxsKSB7XHJcbiAgICByZXR1cm4gdmFsO1xyXG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ29iamVjdCcgJiYgdmFsLmNvbnN0cnVjdG9yID09PSBEYXRlKSB7XHJcbiAgICByZXR1cm4gY29uZmlnLmRhdGVzICE9PSBmYWxzZSA/ICdbRGF0ZTonICsgdmFsLnRvSVNPU3RyaW5nKCkgKyAnXScgOiB2YWw7XHJcbiAgICAvL3ZhbC5mb3JtYXQoJ3tZWVlZfS97TU19L3tERH0ge2hofTp7bW19Ontzc30gVVRDOlx1MDBCN3twYXJhbXMudHo+PTA/XCIrXCIrcGFyYW1zLnR6OnBhcmFtcy50en1cdTAwQjcnKTtcclxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdvYmplY3QnICYmIHZhbC5jb25zdHJ1Y3RvciA9PT0gUmVnRXhwKSB7XHJcbiAgICByZXR1cm4gY29uZmlnLnJlZ2V4cHMgIT09IGZhbHNlID8gJ1tSZWdleHA6JyArIHZhbC50b1N0cmluZygpICsgJ10nIDogdmFsO1xyXG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ29iamVjdCcgJiYgdmFsLmNvbnN0cnVjdG9yICYmIHR5cGVvZiB2YWwuY29uc3RydWN0b3IubmFtZSA9PT0gJ3N0cmluZycgJiYgdmFsLmNvbnN0cnVjdG9yLm5hbWUuc2xpY2UoLTUpID09PSAnRXJyb3InKSB7XHJcbiAgICB2YXIgc3RhY2sgPSAodmFsLnN0YWNrIHx8ICcnKS5zcGxpdCgnXFxuJykuc2xpY2UoMSk7XHJcbiAgICB2YXIgbWVzc2FnZSA9ICh2YWwubWVzc2FnZSB8fCB2YWwudG9TdHJpbmcoKSk7XHJcbiAgICB2YXIgZXJyb3IgPSBtZXNzYWdlICsgXCJcXG5cIiArIHN0YWNrO1xyXG4gICAgcmV0dXJuIGNvbmZpZy5lcnJvcnMgIT09IGZhbHNlID8gJ1tFcnJvcjonICsgZXJyb3IgKyAnXScgOiB2YWw7XHJcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnb2JqZWN0Jykge1xyXG4gICAgaWYgKHBhcmVudHMuaW5kZXhPZih2YWwpID49IDApIHtcclxuICAgICAgdmFyIHBvaW50ID0gcGF0aC5zbGljZSgwLCBwYXJlbnRzLmluZGV4T2YodmFsKSkuam9pbignLicpO1xyXG4gICAgICByZXR1cm4gJ1tDaXJjdWxhcicgKyAocG9pbnQgPyAnOicgKyBwb2ludCA6ICcnKSArICddJztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZhciBjb3B5LCBpLCBrLCBsO1xyXG4gICAgICBpZiAodmFsLmNvbnN0cnVjdG9yICYmIHR5cGVvZiB2YWwuY29uc3RydWN0b3IubmFtZSA9PT0gJ3N0cmluZycgJiYgdmFsLmNvbnN0cnVjdG9yLm5hbWUuc2xpY2UoLTUpID09PSAnQXJyYXknKSB7XHJcbiAgICAgICAgaWYgKHBhcmVudHMubGVuZ3RoID49IGNvbmZpZy5kZWVwKSB7XHJcbiAgICAgICAgICByZXR1cm4gJ1tBcnJheTonICsgdmFsLmNvbnN0cnVjdG9yLm5hbWUgKyAnXSc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvcHkgPSBbXTtcclxuICAgICAgICAgIGZvciAoaSA9IDAsIGwgPSB2YWwubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvcHlbaV0gPSBkZWN5Y2xlV2Fsa2VyKHBhcmVudHMuY29uY2F0KFt2YWxdKSwgcGF0aC5jb25jYXQoaSksIHZhbFtpXSwgY29uZmlnKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBjb3B5O1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAocGFyZW50cy5sZW5ndGggPj0gY29uZmlnLmRlZXApIHtcclxuICAgICAgICAgIHJldHVybiAnW09iamVjdDonICsgKHZhbC5jb25zdHJ1Y3RvciAmJiB2YWwuY29uc3RydWN0b3IubmFtZSA/IHZhbC5jb25zdHJ1Y3Rvci5uYW1lIDogJ09iamVjdCcpICsgJ10nO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb3B5ID0ge307XHJcbiAgICAgICAgICBmb3IgKGkgPSAwLCBrID0gT2JqZWN0LmtleXModmFsKSwgbCA9IGsubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvcHlba1tpXV0gPSBkZWN5Y2xlV2Fsa2VyKHBhcmVudHMuY29uY2F0KFt2YWxdKSwgcGF0aC5jb25jYXQoW2tbaV1dKSwgdmFsW2tbaV1dLCBjb25maWcpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIGNvcHk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICByZXR1cm4gY29uZmlnLmZ1bmN0aW9ucyA9PT0gdHJ1ZSA/ICdbRnVuY3Rpb246JyArIHZhbC50b1N0cmluZygpICsgJ10nIDogdW5kZWZpbmVkO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gdmFsLnRvU3RyaW5nKCk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQge1xyXG4gIGRlQ3ljbGVyLFxyXG4gIGRlQ3ljbGVkLFxyXG4gIHJldml2ZVxyXG59IiwgImltcG9ydCBpMThuIGZyb20gXCIuLi9pMThuXCI7XHJcbmltcG9ydCB1dGlscyBmcm9tIFwiLi4vdXRpbHNcIjtcclxuXHJcbi8qKlxyXG4gKiBAcGFyYW0ge3sgaTE4bjogc3RyaW5nIHwgeyBbbGFuZzogc3RyaW5nXTogeyBbazogc3RyaW5nXTogc3RyaW5nIH0gfX19IGNmZyBcclxuICogQHJldHVybnMgXHJcbiAqL1xyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYnVpbGRFeHRlbnNpb25JMThOKGNmZykge1xyXG4gIGlmICghY2ZnPy5pMThuKSByZXR1cm4gbnVsbDtcclxuICBsZXQgb3V0ID0ge1xyXG4gICAgX19jYWNoZV9fOiB7XHJcbiAgICAgIGxvY2FsZUlkczogW10sXHJcbiAgICAgIGxvY2FsaXphdGlvbnM6IHt9XHJcbiAgICB9LFxyXG4gICAgZm9ybWF0KGtleSwgLi4uYXJncykge1xyXG4gICAgICByZXR1cm4gdXRpbHMuZm9ybWF0KG91dC5nZXQoa2V5KSwgLi4uYXJncyk7XHJcbiAgICB9LFxyXG4gICAgZ2V0KGtleSkge1xyXG4gICAgICBpZiAodHlwZW9mIGNmZy5pMThuID09PSBcInN0cmluZ1wiKSBjaGVjaygpO1xyXG4gICAgICByZXR1cm4gb3V0Ll9fY2FjaGVfXy5sb2NhbGl6YXRpb25zW291dC5sb2NhbGVdPy5ba2V5XVxyXG4gICAgICAgIHx8IG91dC5fX2NhY2hlX18ubG9jYWxpemF0aW9ucy5kZWZhdWx0Py5ba2V5XVxyXG4gICAgICAgIHx8IG91dC5nZXQoa2V5KTtcclxuICAgIH0sXHJcbiAgICBtZXNzYWdlczogbmV3IFByb3h5KHt9LCB7XHJcbiAgICAgIGdldChfLCBwcm9wKSB7XHJcbiAgICAgICAgcmV0dXJuIG91dC5nZXQocHJvcCk7XHJcbiAgICAgIH1cclxuICAgIH0pLFxyXG4gIH1cclxuICBhc3luYyBmdW5jdGlvbiBjaGVjaygpIHtcclxuICAgIGNvbnN0IGxvY2FsZSA9IGkxOG4ubG9jYWxlO1xyXG4gICAgaWYgKHR5cGVvZiBjZmcuaTE4biA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICBjb25zdCBCQVNFX1VSTCA9IGNmZy5pMThuLmVuZHNXaXRoKFwiL1wiKSA/IGNmZy5pMThuLnNsaWNlKDAsIC0xKSA6IGNmZy5pMThuO1xyXG4gICAgICBpZiAoIW91dC5fX2NhY2hlX18ubG9jYWxlSWRzLmxlbmd0aCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICBvdXQuX19jYWNoZV9fLmxvY2FsZUlkcyA9IGF3YWl0IChhd2FpdCBmZXRjaChgJHtCQVNFX1VSTH0vbG9jYWxlcy5qc29uYCwgbm9TdG9yZSkpLmpzb24oKTtcclxuICAgICAgICB9IGNhdGNoIHsgfVxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICBvdXQuX19jYWNoZV9fLmxvY2FsaXphdGlvbnMuZGVmYXVsdCA9IGF3YWl0IChhd2FpdCBmZXRjaChgJHtCQVNFX1VSTH0vZGVmYXVsdC5qc29uYCwgbm9TdG9yZSkpLmpzb24oKTtcclxuICAgICAgICB9IGNhdGNoIHsgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmIChcclxuICAgICAgICBvdXQuX19jYWNoZV9fLmxvY2FsZUlkcy5pbmNsdWRlcyhsb2NhbGUpXHJcbiAgICAgICAgJiYgIW91dC5fX2NhY2hlX18ubG9jYWxpemF0aW9ucz8uW2xvY2FsZV1cclxuICAgICAgKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIG91dC5fX2NhY2hlX18ubG9jYWxpemF0aW9uc1tsb2NhbGVdID0gYXdhaXQgKGF3YWl0IGZldGNoKGAke0JBU0VfVVJMfS8ke2xvY2FsZX0uanNvbmAsIG5vU3RvcmUpKS5qc29uKCk7XHJcbiAgICAgICAgfSBjYXRjaCB7IH07XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG91dC5fX2NhY2hlX18ubG9jYWxlSWRzID0gT2JqZWN0LmtleXMoY2ZnLmkxOG4pO1xyXG4gICAgICBvdXQuX19jYWNoZV9fLmxvY2FsaXphdGlvbnMgPSBjZmcuaTE4bjtcclxuICAgIH1cclxuICB9XHJcbiAgYXdhaXQgY2hlY2soKTtcclxuICByZXR1cm4gb3V0O1xyXG59IiwgImltcG9ydCB7IEJhc2ljRXZlbnRFbWl0dGVyIH0gZnJvbSBcIi4uLy4uL2xpYi9CYXNpY0V2ZW50RW1pdHRlci5qc1wiO1xyXG5pbXBvcnQgZGV2IGZyb20gXCIuLi9kZXYvaW5kZXguanNcIjtcclxuaW1wb3J0IGkxOG4gZnJvbSBcIi4uL2kxOG4vaW5kZXguanNcIjtcclxuaW1wb3J0IG1vZHVsZXMgZnJvbSBcIi4uL21vZHVsZXMvaW5kZXguanNcIjtcclxuaW1wb3J0IHN0b3JhZ2UgZnJvbSBcIi4uL3N0b3JhZ2UvaW5kZXguanNcIjtcclxuaW1wb3J0IHsgYnVpbGRFeHRlbnNpb25JMThOIH0gZnJvbSBcIi4vaTE4bi5qc1wiO1xyXG5pbXBvcnQgKiBhcyBuZXN0cyBmcm9tIFwibmVzdHNcIjtcclxuXHJcbi8qKlxyXG4gKiBAcGFyYW0ge3sgbW9kdWxlczogeyBub2RlOiB7IG5hbWU6IHN0cmluZywgcmVhc29uOiBzdHJpbmcgfVtdLCBjb21tb246IHsgbmFtZTogc3RyaW5nLCByZWFzb246IHN0cmluZyB9W10sIGN1c3RvbTogeyByZWFzb246IHN0cmluZywgbmFtZTogc3RyaW5nLCBsYXp5OiBib29sZWFuLCBmaW5kZXI6IHsgZmlsdGVyOiB7IGV4cG9ydDogYm9vbGVhbiwgaW46IFwicHJvcGVydGllc1wiIHwgXCJzdHJpbmdzXCIgfCBcInByb3RvdHlwZXNcIiwgYnk6IFtzdHJpbmdbXSwgc3RyaW5nW10/XSB9LCBwYXRoOiB7IGJlZm9yZTogc3RyaW5nIHwgc3RyaW5nW10sIGFmdGVyOiBzdHJpbmcgfCBzdHJpbmdbXSB9LCBtYXA6IHsgW2s6IHN0cmluZ106IHN0cmluZ1tdIH0gfSB9W10gfSwgYWJvdXQ6IHsgbmFtZTogc3RyaW5nIHwgeyBbazogc3RyaW5nXTogc3RyaW5nIH0sIGRlc2NyaXB0aW9uOiBzdHJpbmcgfCB7IFtrOiBzdHJpbmddOiBzdHJpbmcgfSwgc2x1Zzogc3RyaW5nIH0sIHJlYXNvbjogc3RyaW5nIH19IGNmZyBcclxuICovXHJcbmFzeW5jIGZ1bmN0aW9uIGJ1aWxkQVBJKGNmZykge1xyXG4gIGNvbnN0IHBlcnNpc3QgPSBhd2FpdCBzdG9yYWdlLmNyZWF0ZVBlcnNpc3ROZXN0KGBFeHRlbnNpb247UGVyc2lzdDske2NmZy5hYm91dC5zbHVnfWApO1xyXG4gIGNvbnN0IG91dCA9IHtcclxuICAgIG1vZHVsZXM6IHtcclxuICAgICAgX19jYWNoZV9fOiB7XHJcbiAgICAgICAgY29tbW9uOiB7fSxcclxuICAgICAgICBub2RlOiB7fSxcclxuICAgICAgICBjdXN0b206IHt9LFxyXG4gICAgICAgIGN1c3RvbUxhenk6IHt9XHJcbiAgICAgIH0sXHJcbiAgICAgIHJlcXVpcmUobmFtZSkge1xyXG4gICAgICAgIGlmICghZGV2LmVuYWJsZWQpIHtcclxuICAgICAgICAgIGlmICh0eXBlb2Ygb3V0Lm1vZHVsZXMuX19jYWNoZV9fLm5vZGVbbmFtZV0gIT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBvdXQubW9kdWxlcy5fX2NhY2hlX18ubm9kZVtuYW1lXTtcclxuICAgICAgICAgIGlmIChjZmc/Lm1vZHVsZXM/Lm5vZGU/LnNvbWU/LihpID0+IGkubmFtZSA9PT0gbmFtZSkpIHJldHVybiBvdXQubW9kdWxlcy5fX2NhY2hlX18ubm9kZVtuYW1lXSA9IG1vZHVsZXMucmVxdWlyZShuYW1lKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmV0dXJuIG1vZHVsZXMucmVxdWlyZShuYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgIH0sXHJcbiAgICAgIGNvbW1vbjogbmV3IFByb3h5KHt9LCB7XHJcbiAgICAgICAgZ2V0KF8sIHByb3ApIHtcclxuICAgICAgICAgIGlmICghZGV2LmVuYWJsZWQpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvdXQubW9kdWxlcy5fX2NhY2hlX18uY29tbW9uW3Byb3BdICE9PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gb3V0Lm1vZHVsZXMuX19jYWNoZV9fLmNvbW1vbltwcm9wXTtcclxuICAgICAgICAgICAgaWYgKGNmZz8ubW9kdWxlcz8uY29tbW9uPy5zb21lPy4oaSA9PiBpLm5hbWUgPT09IHByb3ApKSByZXR1cm4gb3V0Lm1vZHVsZXMuX19jYWNoZV9fLmNvbW1vbltwcm9wXSA9IG1vZHVsZXMuY29tbW9uW3Byb3BdO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG1vZHVsZXMuY29tbW9uW3Byb3BdO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSksXHJcbiAgICAgIGN1c3RvbTogbmV3IFByb3h5KHt9LCB7XHJcbiAgICAgICAgZ2V0KF8sIHByb3ApIHtcclxuICAgICAgICAgIGlmICh0eXBlb2Ygb3V0Lm1vZHVsZXMuX19jYWNoZV9fLmN1c3RvbVtwcm9wXSAhPT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIG91dC5tb2R1bGVzLl9fY2FjaGVfXy5jdXN0b21bcHJvcF07XHJcbiAgICAgICAgICBsZXQgZGF0YSA9IGNmZz8ubW9kdWxlcz8uY3VzdG9tPy5zb21lPy4oaSA9PiBpLm5hbWUgPT09IHByb3ApO1xyXG4gICAgICAgICAgaWYgKCFkYXRhKSByZXR1cm4gbnVsbDtcclxuICAgICAgICAgIGlmIChkYXRhLmxhenkpIHtcclxuICAgICAgICAgICAgbGV0IHByb20gPSBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgbGV0IHIgPSBhd2FpdCBtb2R1bGVzLndlYnBhY2subGF6eUZpbmRCeUZpbmRlcihkYXRhLmZpbmRlcik7XHJcbiAgICAgICAgICAgICAgb3V0Lm1vZHVsZXMuX19jYWNoZV9fLmN1c3RvbUxhenlbcHJvcF0gPSByO1xyXG4gICAgICAgICAgICAgIHJlc29sdmUocik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBvdXQubW9kdWxlcy5fX2NhY2hlX18uY3VzdG9tW3Byb3BdID0ge1xyXG4gICAgICAgICAgICAgIGdldCgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBwcm9tO1xyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgZ2V0IHZhbHVlKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG91dC5tb2R1bGVzLl9fY2FjaGVfXy5jdXN0b21MYXp5W3Byb3BdO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IG1vZHVsZXMud2VicGFjay5maW5kQnlGaW5kZXIoZGF0YS5maW5kZXIpO1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWU/LnZhbHVlICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgICAgICBvdXQubW9kdWxlcy5fX2NhY2hlX18uY3VzdG9tW3Byb3BdID0gdmFsdWUgPyBPYmplY3QuYXNzaWduKHZhbHVlLCB7IHZhbHVlLCBnZXQoKSB7IHJldHVybiB2YWx1ZSB9IH0pIDogbnVsbDtcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgb3V0Lm1vZHVsZXMuX19jYWNoZV9fLmN1c3RvbVtwcm9wXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBjYXRjaCB7XHJcbiAgICAgICAgICAgICAgb3V0Lm1vZHVsZXMuX19jYWNoZV9fLmN1c3RvbVtwcm9wXSA9IHZhbHVlID8geyB2YWx1ZSwgZ2V0KCkgeyByZXR1cm4gdmFsdWUgfSB9IDogbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIG91dC5tb2R1bGVzLl9fY2FjaGVfXy5jdXN0b21bcHJvcF07XHJcbiAgICAgICAgfVxyXG4gICAgICB9KSxcclxuICAgIH0sXHJcbiAgICBpMThuLFxyXG4gICAgZXh0ZW5zaW9uOiB7XHJcbiAgICAgIGNvbmZpZzogSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShjZmcpKSxcclxuICAgICAgcGVyc2lzdCxcclxuICAgICAgaTE4bjogYXdhaXQgYnVpbGRFeHRlbnNpb25JMThOKGNmZyksXHJcbiAgICAgIGV2ZW50czogbmV3IEJhc2ljRXZlbnRFbWl0dGVyKClcclxuICAgIH1cclxuICB9O1xyXG5cclxuICByZXR1cm4gb3V0O1xyXG59XHJcblxyXG5jb25zdCBvdXQgPSB7XHJcbiAgX19jYWNoZV9fOiB7XHJcbiAgICBpbml0aWFsaXplZDogZmFsc2UsXHJcbiAgICBsb2FkZWQ6IG5lc3RzLm1ha2Uoe30pXHJcbiAgfSxcclxuICBzdG9yYWdlOiB7XHJcbiAgICAvKiogQHR5cGUge25lc3RzLk5lc3R9ICovXHJcbiAgICBpbnN0YWxsZWQ6IHt9XHJcbiAgfSxcclxuICBidWlsZEFQSSxcclxuICBhc3luYyBpbml0KCkge1xyXG4gICAgaWYgKG91dC5fX2NhY2hlX18uaW5pdGlhbGl6ZWQpIHJldHVybjtcclxuICAgIG91dC5fX2NhY2hlX18uaW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG4gICAgb3V0LnN0b3JhZ2UuaW5zdGFsbGVkID0gYXdhaXQgc3RvcmFnZS5jcmVhdGVQZXJzaXN0TmVzdChcIkV4dGVuc2lvbnM7SW5zdGFsbGVkXCIpO1xyXG4gIH0sXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHVybCBcclxuICAgKi9cclxuICBhc3luYyBpbnN0YWxsKHVybCwgZGVmYXVsdENvbmZpZyA9IHt9KSB7XHJcbiAgICBpZiAoIW91dC5fX2NhY2hlX18uaW5pdGlhbGl6ZWQpIGF3YWl0IG91dC5pbml0KCk7XHJcbiAgICBpZiAodXJsLmVuZHNXaXRoKFwiL1wiKSkgdXJsID0gdXJsLnNsaWNlKDAsIC0xKTtcclxuICAgIGlmIChvdXQuc3RvcmFnZS5pbnN0YWxsZWQuZ2hvc3RbdXJsXSkgdGhyb3cgbmV3IEVycm9yKGBcIiR7dXJsfVwiIGV4dGVuc2lvbiBpcyBhbHJlYWR5IGluc3RhbGxlZC5gKTtcclxuXHJcbiAgICBsZXQgbWV0YVJlc3AgPSBhd2FpdCBmZXRjaChgJHt1cmx9L21ldGFkYXRhLmpzb25gKTtcclxuICAgIGlmIChtZXRhUmVzcC5zdGF0dXMgIT09IDIwMCkgdGhyb3cgbmV3IEVycm9yKGBcIiR7dXJsfVwiIGV4dGVuc2lvbiBtZXRhZGF0YSBpcyBub3QgcmVzcG9uZGVkIHdpdGggMjAwIHN0YXR1cyBjb2RlLmApO1xyXG4gICAgbGV0IG1ldGFkYXRhID0gYXdhaXQgbWV0YVJlc3AuanNvbigpO1xyXG5cclxuICAgIGxldCByZWFkbWVSZXNwID0gYXdhaXQgZmV0Y2goYCR7dXJsfS9yZWFkbWUubWRgKTtcclxuICAgIGxldCByZWFkbWUgPSByZWFkbWVSZXNwLnN0YXR1cyA9PT0gMjAwID8gYXdhaXQgcmVhZG1lUmVzcC50ZXh0KCkgOiBudWxsO1xyXG5cclxuICAgIC8vIFRPRE86IFNob3cgbW9kYWwgZm9yIHVzZXIgdG8gYWNjZXB0IHRoZSBleHRlbnNpb24gKHRlcm1zLCBwcml2YWN5LCBldGMuKVxyXG5cclxuICAgIGxldCBzb3VyY2VSZXNwID0gYXdhaXQgZmV0Y2goYCR7dXJsfS9zb3VyY2UuanNgKTtcclxuICAgIGlmIChzb3VyY2VSZXNwLnN0YXR1cyAhPT0gMjAwKSB0aHJvdyBuZXcgRXJyb3IoYFwiJHt1cmx9XCIgZXh0ZW5zaW9uIHNvdXJjZSBpcyBub3QgcmVzcG9uZGVkIHdpdGggMjAwIHN0YXR1cyBjb2RlLmApO1xyXG4gICAgbGV0IHNvdXJjZSA9IGF3YWl0IHNvdXJjZVJlc3AudGV4dCgpO1xyXG5cclxuXHJcbiAgICBvdXQuc3RvcmFnZS5pbnN0YWxsZWQuc3RvcmVbdXJsXSA9IHtcclxuICAgICAgbWV0YWRhdGE6IHtcclxuICAgICAgICBjdXJyZW50OiBtZXRhZGF0YSxcclxuICAgICAgICBsYXN0OiBtZXRhZGF0YVxyXG4gICAgICB9LFxyXG4gICAgICBzb3VyY2UsXHJcbiAgICAgIHJlYWRtZSxcclxuICAgICAgY29uZmlnOiB7XHJcbiAgICAgICAgYXV0b1VwZGF0ZTogdHJ1ZSxcclxuICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgIC4uLmRlZmF1bHRDb25maWdcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBvdXQubG9hZCh1cmwpO1xyXG4gIH0sXHJcbiAgYXN5bmMgdW5pbnN0YWxsKHVybCkge1xyXG4gICAgaWYgKCFvdXQuX19jYWNoZV9fLmluaXRpYWxpemVkKSBhd2FpdCBvdXQuaW5pdCgpO1xyXG4gICAgaWYgKCFvdXQuc3RvcmFnZS5pbnN0YWxsZWQuZ2hvc3RbdXJsXSkgdGhyb3cgbmV3IEVycm9yKGBcIiR7dXJsfVwiIGV4dGVuc2lvbiBpcyBub3QgaW5zdGFsbGVkLmApO1xyXG5cclxuICAgIGRlbGV0ZSBvdXQuc3RvcmFnZS5pbnN0YWxsZWQuc3RvcmVbdXJsXTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBhd2FpdCBvdXQudW5sb2FkKHVybCk7XHJcbiAgICB9IGNhdGNoIHsgfVxyXG4gIH0sXHJcbiAgYXN5bmMgbG9hZCh1cmwpIHtcclxuICAgIGlmICghb3V0Ll9fY2FjaGVfXy5pbml0aWFsaXplZCkgYXdhaXQgb3V0LmluaXQoKTtcclxuICAgIGlmICghb3V0LnN0b3JhZ2UuaW5zdGFsbGVkLmdob3N0W3VybF0pIHRocm93IG5ldyBFcnJvcihgXCIke3VybH1cIiBleHRlbnNpb24gaXMgbm90IGluc3RhbGxlZC5gKTtcclxuICAgIGxldCBkYXRhID0gb3V0LnN0b3JhZ2UuaW5zdGFsbGVkLmdob3N0W3VybF07XHJcblxyXG4gICAgaWYgKG91dC5fX2NhY2hlX18ubG9hZGVkLmdob3N0W3VybF0pIHRocm93IG5ldyBFcnJvcihgXCIke3VybH1cIiBleHRlbnNpb24gaXMgYWxyZWFkeSBsb2FkZWQuYCk7XHJcblxyXG4gICAgbGV0IGFwaSA9IGF3YWl0IG91dC5idWlsZEFQSShkYXRhLm1ldGFkYXRhKTtcclxuXHJcbiAgICBsZXQgZXZhbHVhdGVkID0gb3V0LmV2YWx1YXRlKGRhdGEuc291cmNlLCBhcGkpO1xyXG5cclxuICAgIGF3YWl0IGV2YWx1YXRlZD8ubG9hZD8uKCk7XHJcblxyXG4gICAgb3V0Ll9fY2FjaGVfXy5sb2FkZWQuc3RvcmVbdXJsXSA9IHtcclxuICAgICAgZXZhbHVhdGVkLFxyXG4gICAgICBhcGlcclxuICAgIH07XHJcbiAgfSxcclxuICBhc3luYyB1bmxvYWQodXJsKSB7XHJcbiAgICBpZiAoIW91dC5fX2NhY2hlX18uaW5pdGlhbGl6ZWQpIGF3YWl0IG91dC5pbml0KCk7XHJcbiAgICBpZiAoIW91dC5zdG9yYWdlLmluc3RhbGxlZC5naG9zdFt1cmxdKSB0aHJvdyBuZXcgRXJyb3IoYFwiJHt1cmx9XCIgZXh0ZW5zaW9uIGlzIG5vdCBpbnN0YWxsZWQuYCk7XHJcblxyXG4gICAgaWYgKCFvdXQuX19jYWNoZV9fLmxvYWRlZC5naG9zdFt1cmxdKSB0aHJvdyBuZXcgRXJyb3IoYFwiJHt1cmx9XCIgZXh0ZW5zaW9uIGlzIG5vdCBsb2FkZWQuYCk7XHJcblxyXG4gICAgbGV0IHsgZXZhbHVhdGVkIH0gPSBvdXQuX19jYWNoZV9fLmxvYWRlZC5naG9zdFt1cmxdO1xyXG5cclxuICAgIGF3YWl0IGV2YWx1YXRlZD8udW5sb2FkPy4oKTtcclxuXHJcbiAgICBkZWxldGUgb3V0Ll9fY2FjaGVfXy5sb2FkZWQuc3RvcmVbdXJsXTtcclxuICB9LFxyXG4gIGV2YWx1YXRlKHNvdXJjZSwgYXBpKSB7XHJcbiAgICBjb25zdCAkYWNvcmQgPSBhcGk7XHJcbiAgICByZXR1cm4gZXZhbChzb3VyY2UpO1xyXG4gIH0sXHJcbiAgYXN5bmMgbG9hZEFsbCgpIHtcclxuICAgIGlmICghb3V0Ll9fY2FjaGVfXy5pbml0aWFsaXplZCkgYXdhaXQgb3V0LmluaXQoKTtcclxuICAgIHJldHVybiBQcm9taXNlLmFsbChPYmplY3Qua2V5cyhvdXQuc3RvcmFnZS5pbnN0YWxsZWQuZ2hvc3QpLm1hcCh1cmwgPT4gb3V0LmxvYWQodXJsKSkpO1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IG91dDsiLCAiZXhwb3J0IGRlZmF1bHQge1xyXG4gIHByb2Nlc3M6IGdsb2JhbFRoaXNbXCI8UFJFTE9BRF9LRVk+XCJdLnByb2Nlc3MsXHJcbiAgaXNEZXZUb29sc09wZW46IGdsb2JhbFRoaXNbXCI8UFJFTE9BRF9LRVk+XCJdLmlzRGV2VG9vbHNPcGVuXHJcbn1cclxuXHJcbiIsICJpbXBvcnQgeyB3YWl0VW50aWxDb25uZWN0aW9uT3BlbiB9IGZyb20gXCIuLi8uLi9vdGhlci91dGlscy5qc1wiO1xyXG5pbXBvcnQgY29tbW9uIGZyb20gXCIuLi9tb2R1bGVzL2NvbW1vbi5qc1wiO1xyXG5pbXBvcnQgcGF0Y2hlciBmcm9tIFwiLi4vcGF0Y2hlci9pbmRleC5qc1wiO1xyXG5cclxuY29uc3Qgc29ja2V0cyA9IG5ldyBTZXQoKTtcclxuY29uc3QgaGFuZGxlcnMgPSBuZXcgTWFwKCk7XHJcblxyXG53YWl0VW50aWxDb25uZWN0aW9uT3BlbigpLnRoZW4oKCkgPT4ge1xyXG4gIHBhdGNoZXIuaW5zdGVhZChcclxuICAgIFwiaGFuZGxlQ29ubmVjdGlvblwiLFxyXG4gICAgY29tbW9uLldlYlNvY2tldCxcclxuICAgIChhcmdzLCBvcmlnKSA9PiB7XHJcbiAgICAgIGNvbnN0IHdzID0gYXJnc1swXTtcclxuICAgICAgaWYgKHdzLnVwZ3JhZGVSZXEoKS51cmwgIT09IFwiL2Fjb3JkXCIpIHJldHVybiBvcmlnKC4uLmFyZ3MpO1xyXG5cclxuICAgICAgc29ja2V0cy5hZGQod3MpO1xyXG5cclxuICAgICAgd3Mub24oXCJtZXNzYWdlXCIsIGFzeW5jIChtc2cpID0+IHtcclxuICAgICAgICBsZXQganNvbjtcclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIGpzb24gPSBKU09OLnBhcnNlKG1zZyk7XHJcbiAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoanNvbikgfHwganNvbi5sZW5ndGggPCAxIHx8IGpzb24ubGVuZ3RoID4gMylcclxuICAgICAgICAgICAgdGhyb3cgXCJBcnJheSBleHBlY3RlZCBhcyBtZXNzYWdlLlwiO1xyXG4gICAgICAgICAgaWYgKHR5cGVvZiBqc29uWzBdICE9IFwic3RyaW5nXCIpIHRocm93IFwiQXJyYXlbMF0gbmVlZHMgdG8gYmUgc3RyaW5nLlwiO1xyXG4gICAgICAgICAgaWYgKHR5cGVvZiBqc29uWzFdICE9IFwic3RyaW5nXCIpIHRocm93IFwiQXJyYXlbMV0gbmVlZHMgdG8gYmUgc3RyaW5nLlwiO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgd3Muc2VuZChcclxuICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoW1xyXG4gICAgICAgICAgICAgIG51bGwsXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgb2s6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgZXJyb3I6IGAke2Vycn1gLFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIF0pXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgW2V2ZW50SWQsIGV2ZW50TmFtZSwgZXZlbnREYXRhXSA9IGpzb247XHJcblxyXG4gICAgICAgIGNvbnN0IGhhbmRsZXIgPSBoYW5kbGVycy5nZXQoZXZlbnROYW1lKTtcclxuXHJcbiAgICAgICAgaWYgKCFoYW5kbGVyKVxyXG4gICAgICAgICAgcmV0dXJuIHdzLnNlbmQoXHJcbiAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KFtcclxuICAgICAgICAgICAgICBldmVudElkLFxyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG9rOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGVycm9yOiBgVW5hYmxlIHRvIGZpbmQgaGFuZGxlci5gLFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIF0pXHJcbiAgICAgICAgICApO1xyXG5cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgbGV0IHJlc3BvbnNlID0gYXdhaXQgaGFuZGxlcihldmVudERhdGEpO1xyXG4gICAgICAgICAgd3Muc2VuZChcclxuICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoW1xyXG4gICAgICAgICAgICAgIGV2ZW50SWQsXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgb2s6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiByZXNwb25zZSxcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBdKVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgIHdzLnNlbmQoXHJcbiAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KFtcclxuICAgICAgICAgICAgICBldmVudElkLFxyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG9rOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGVycm9yOiBgJHtlcnJ9YCxcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBdKVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgd3Mub24oXCJjbG9zZVwiLCAoKSA9PiBzb2NrZXRzLmRlbGV0ZSh3cykpO1xyXG4gICAgfVxyXG4gICk7XHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gc2V0KGV2ZW50TmFtZSwgY2FsbGJhY2spIHtcclxuICBpZiAodHlwZW9mIGV2ZW50TmFtZSAhPSBcInN0cmluZ1wiKVxyXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiRXZlbnROYW1lIG5lZWRzIHRvIGJlIGEgc3RyaW5nLlwiKTtcclxuICBpZiAodHlwZW9mIGNhbGxiYWNrICE9IFwiZnVuY3Rpb25cIilcclxuICAgIHRocm93IG5ldyBFcnJvcihcIkNhbGxiYWNrIG5lZWRzIHRvIGJlIGEgZnVuY3Rpb24uXCIpO1xyXG4gIGlmIChoYW5kbGVycy5oYXMoZXZlbnROYW1lKSlcclxuICAgIHRocm93IG5ldyBFcnJvcihcIkV2ZW50TmFtZSBhbHJlYWR5IGluIHVzZS5cIik7XHJcbiAgaGFuZGxlcnMuc2V0KGV2ZW50TmFtZSwgY2FsbGJhY2spO1xyXG4gIHJldHVybiAoKSA9PiB7XHJcbiAgICBoYW5kbGVycy5kZWxldGUoZXZlbnROYW1lKTtcclxuICB9O1xyXG59XHJcbmZ1bmN0aW9uIHRyaWdnZXIoZXZlbnROYW1lLCAuLi5hcmdzKSB7XHJcbiAgaWYgKCFzb2NrZXRFdmVudHMuaGFzKGV2ZW50TmFtZSkpXHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmFibGUgdG8gZmluZCBoYW5kbGVyIVwiKTtcclxuICByZXR1cm4gc29ja2V0RXZlbnRzLmdldChldmVudE5hbWUpKC4uLmFyZ3MpO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgc2V0LFxyXG4gIHRyaWdnZXJcclxufVxyXG5cclxuIiwgImV4cG9ydCBkZWZhdWx0IGBcbi5hY29yZC0tbGF5ZXItY29udGFpbmVyey0tdG9wLW9mZnNldDogMHB4O3dpZHRoOjEwMHZ3O2hlaWdodDpjYWxjKDEwMHZoIC0gdmFyKC0tdG9wLW9mZnNldCkpO3otaW5kZXg6OTk5OTk5OTtwb2ludGVyLWV2ZW50czpub25lO3Bvc2l0aW9uOmFic29sdXRlO3RvcDp2YXIoLS10b3Atb2Zmc2V0KTtsZWZ0OjBweH0uYWNvcmQtLWxheWVyLWNvbnRhaW5lciAqe3otaW5kZXg6OTk5OTk5OTk5OTk5OTl9LmFjb3JkLS10b29sdGlwLWxheWVye29wYWNpdHk6MDt0cmFuc2l0aW9uOjUwbXMgbGluZWFyIG9wYWNpdHk7cG9zaXRpb246YWJzb2x1dGU7cG9pbnRlci1ldmVudHM6bm9uZX0uYWNvcmQtLXRvb2x0aXAtbGF5ZXIudmlzaWJsZXtvcGFjaXR5OjE7cG9pbnRlci1ldmVudHM6YWxsfS5hY29yZC0tdG9vbHRpcC52ZXJ0aWNhbHt0cmFuc2Zvcm06dHJhbnNsYXRlWCgtNTAlKX0uYWNvcmQtLXRvb2x0aXAuaG9yaXpvbnRhbHt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtNTAlKX0uYWNvcmQtLXRvYXN0cy1jb250YWluZXJ7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1lbmQ7ZmxleC1kaXJlY3Rpb246Y29sdW1uO3dpZHRoOjEwMHZ3O2hlaWdodDpjYWxjKDEwMHZoIC0gdmFyKC0tdG9wLW9mZnNldCkpO3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6MDtwb2ludGVyLWV2ZW50czpub25lO3BhZGRpbmctYm90dG9tOjMycHh9LmFjb3JkLS10b2FzdHMtY29udGFpbmVyIC5hY29yZC0tdG9hc3R7dHJhbnNpdGlvbjp0cmFuc2Zvcm0gMjUwbXMgZWFzZS1pbi1vdXQsb3BhY2l0eSAyNTBtcyBlYXNlLWluLW91dDtkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO3BvaW50ZXItZXZlbnRzOm5vbmU7Ym9yZGVyLXJhZGl1czo0cHg7cGFkZGluZzo4cHg7Ym94LXNoYWRvdzowcHggMnB4IDhweCByZ2JhKDAsMCwwLC4yNSk7b3BhY2l0eToxO2dhcDo4cHg7Zm9udC1zaXplOjE0cHg7bWFyZ2luOjRweH0uYWNvcmQtLXRvYXN0cy1jb250YWluZXIgLmFjb3JkLS10b2FzdCBzdmd7d2lkdGg6MTZweDtoZWlnaHQ6MTZweH0uYWNvcmQtLXRvYXN0cy1jb250YWluZXIgLmFjb3JkLS10b2FzdC5jbGlja2FibGV7Y3Vyc29yOnBvaW50ZXI7cG9pbnRlci1ldmVudHM6YWxsfS5hY29yZC0tdG9hc3RzLWNvbnRhaW5lciAuYWNvcmQtLXRvYXN0LmNsb3Npbmd7b3BhY2l0eTowO3RyYW5zZm9ybTp0cmFuc2xhdGUoMCwgLTUwcHgpfS5hY29yZC0tdG9hc3RzLWNvbnRhaW5lciAuYWNvcmQtLXRvYXN0LmhpZGRlbntvcGFjaXR5OjA7dHJhbnNmb3JtOnRyYW5zbGF0ZSgwLCA1MHB4KX0uYWNvcmQtLXRvYXN0cy1jb250YWluZXIgLmFjb3JkLS10b2FzdC5zdHlsZS1pbmZve2JhY2tncm91bmQtY29sb3I6IzRhOGZlMTtjb2xvcjojZjVmNWY1fS5hY29yZC0tdG9hc3RzLWNvbnRhaW5lciAuYWNvcmQtLXRvYXN0LnN0eWxlLXdhcm5pbmd7YmFja2dyb3VuZC1jb2xvcjojZmFhODFhO2NvbG9yOiMwMDB9LmFjb3JkLS10b2FzdHMtY29udGFpbmVyIC5hY29yZC0tdG9hc3Quc3R5bGUtZXJyb3J7YmFja2dyb3VuZC1jb2xvcjojZWQ0MjQ1O2NvbG9yOiMwMDB9LmFjb3JkLS10b2FzdHMtY29udGFpbmVyIC5hY29yZC0tdG9hc3Quc3R5bGUtc3VjY2Vzc3tiYWNrZ3JvdW5kLWNvbG9yOiMzYmE1NWQ7Y29sb3I6I2Y1ZjVmNX0uYWNvcmQtLXRvYXN0cy1jb250YWluZXIgLmFjb3JkLS10b2FzdC5zdHlsZS1kZWZhdWx0e2JhY2tncm91bmQtY29sb3I6I2Y1ZjVmNTtjb2xvcjojMDAwfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVye3dpZHRoOjEwMHZ3O2hlaWdodDpjYWxjKDEwMHZoIC0gdmFyKC0tdG9wLW9mZnNldCkpO2Rpc3BsYXk6ZmxleDtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtsZWZ0OjA7cG9pbnRlci1ldmVudHM6bm9uZX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllciAuYWNvcmQtLW5vdGlmaWNhdGlvbntkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1uO3BvaW50ZXItZXZlbnRzOmFsbDt0cmFuc2l0aW9uOnRyYW5zZm9ybSAyNTBtcyBlYXNlLWluLW91dCxvcGFjaXR5IDI1MG1zIGVhc2UtaW4tb3V0O21hcmdpbjo0cHg7YmFja2Ryb3AtZmlsdGVyOmJsdXIoMTZweCkgYnJpZ2h0bmVzcygwLjc1KTstd2Via2l0LWFwcC1yZWdpb246bm8tZHJhZzstLWFuaW1hdGlvbi1zaXplOiA1MHB4fS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyIC5hY29yZC0tbm90aWZpY2F0aW9uLmhpZGRlbiwuYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllciAuYWNvcmQtLW5vdGlmaWNhdGlvbi5jbG9zaW5ne29wYWNpdHk6MH0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllciAuYWNvcmQtLW5vdGlmaWNhdGlvbj4uY29udGFpbmVye2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47cGFkZGluZzo4cHg7Y29sb3I6I2ZmZjttaW4td2lkdGg6MjUwcHh9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24+LmNvbnRhaW5lcj4uY2xvc2V7d2lkdGg6MjRweDtoZWlnaHQ6MjRweDtjb2xvcjojZmZmO29wYWNpdHk6LjU7Y3Vyc29yOnBvaW50ZXI7bWFyZ2luLWxlZnQ6OHB4O3otaW5kZXg6OTk5OTk5OTk5fS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyIC5hY29yZC0tbm90aWZpY2F0aW9uPi5jb250YWluZXI+LmNsb3NlLmhpZGRlbntkaXNwbGF5Om5vbmV9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24+LnByb2dyZXNzLWNvbnRhaW5lcnt3aWR0aDoxMDAlO2hlaWdodDo1cHh9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24+LnByb2dyZXNzLWNvbnRhaW5lcj4ucHJvZ3Jlc3N7d2lkdGg6MCU7aGVpZ2h0OjVweDt0cmFuc2l0aW9uOndpZHRoIHZhcigtLWR1cmF0aW9uKSBsaW5lYXI7YmFja2dyb3VuZC1jb2xvcjp2YXIoLS1iYXItY29sb3IpfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyIC5hY29yZC0tbm90aWZpY2F0aW9uPi5wcm9ncmVzcy1jb250YWluZXI+LnByb2dyZXNzLnByb2dyZXNzaW5ne3dpZHRoOjEwMCV9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24uc3R5bGUtaW5mb3stLWJhci1jb2xvcjogIzRhOGZlMX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllciAuYWNvcmQtLW5vdGlmaWNhdGlvbi5zdHlsZS13YXJuaW5ney0tYmFyLWNvbG9yOiAjZmFhODFhfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyIC5hY29yZC0tbm90aWZpY2F0aW9uLnN0eWxlLWVycm9yey0tYmFyLWNvbG9yOiAjZWQ0MjQ1fS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyIC5hY29yZC0tbm90aWZpY2F0aW9uLnN0eWxlLXN1Y2Nlc3N7LS1iYXItY29sb3I6ICMzYmE1NWR9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24uc3R5bGUtZGVmYXVsdHstLWJhci1jb2xvcjogd2hpdGVzbW9rZX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci50b3AtcmlnaHR7anVzdGlmeS1jb250ZW50OmZsZXgtZW5kO2FsaWduLWl0ZW1zOmZsZXgtc3RhcnR9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIudG9wLXJpZ2h0IC5hY29yZC0tbm90aWZpY2F0aW9uLmhpZGRlbnt0cmFuc2Zvcm06dHJhbnNsYXRlKDAsIGNhbGModmFyKC0tYW5pbWF0aW9uLXNpemUpICogLTEpKX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci50b3AtcmlnaHQgLmFjb3JkLS1ub3RpZmljYXRpb24uY2xvc2luZ3t0cmFuc2Zvcm06dHJhbnNsYXRlKDAsIHZhcigtLWFuaW1hdGlvbi1zaXplKSl9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIudG9wLWxlZnR7anVzdGlmeS1jb250ZW50OmZsZXgtc3RhcnQ7YWxpZ24taXRlbXM6ZmxleC1zdGFydH0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci50b3AtbGVmdCAuYWNvcmQtLW5vdGlmaWNhdGlvbi5oaWRkZW57dHJhbnNmb3JtOnRyYW5zbGF0ZSgwLCBjYWxjKHZhcigtLWFuaW1hdGlvbi1zaXplKSAqIC0xKSl9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIudG9wLWxlZnQgLmFjb3JkLS1ub3RpZmljYXRpb24uY2xvc2luZ3t0cmFuc2Zvcm06dHJhbnNsYXRlKDAsIHZhcigtLWFuaW1hdGlvbi1zaXplKSl9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIuYm90dG9tLXJpZ2h0e2p1c3RpZnktY29udGVudDpmbGV4LWVuZDthbGlnbi1pdGVtczpmbGV4LWVuZH0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci5ib3R0b20tcmlnaHQgLmFjb3JkLS1ub3RpZmljYXRpb24uaGlkZGVue3RyYW5zZm9ybTp0cmFuc2xhdGUoMCwgdmFyKC0tYW5pbWF0aW9uLXNpemUpKX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci5ib3R0b20tcmlnaHQgLmFjb3JkLS1ub3RpZmljYXRpb24uY2xvc2luZ3t0cmFuc2Zvcm06dHJhbnNsYXRlKDAsIGNhbGModmFyKC0tYW5pbWF0aW9uLXNpemUpICogLTEpKX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci5ib3R0b20tbGVmdHtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1zdGFydDthbGlnbi1pdGVtczpmbGV4LWVuZH0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci5ib3R0b20tbGVmdCAuYWNvcmQtLW5vdGlmaWNhdGlvbi5oaWRkZW57dHJhbnNmb3JtOnRyYW5zbGF0ZSgwLCB2YXIoLS1hbmltYXRpb24tc2l6ZSkpfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLmJvdHRvbS1sZWZ0IC5hY29yZC0tbm90aWZpY2F0aW9uLmNsb3Npbmd7dHJhbnNmb3JtOnRyYW5zbGF0ZSgwLCBjYWxjKHZhcigtLWFuaW1hdGlvbi1zaXplKSAqIC0xKSl9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIudG9wLWNlbnRlcntqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO2FsaWduLWl0ZW1zOmZsZXgtc3RhcnR9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIudG9wLWNlbnRlciAuYWNvcmQtLW5vdGlmaWNhdGlvbi5oaWRkZW57dHJhbnNmb3JtOnRyYW5zbGF0ZSgwLCBjYWxjKHZhcigtLWFuaW1hdGlvbi1zaXplKSAqIC0xKSl9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIudG9wLWNlbnRlciAuYWNvcmQtLW5vdGlmaWNhdGlvbi5jbG9zaW5ne3RyYW5zZm9ybTp0cmFuc2xhdGUoMCwgdmFyKC0tYW5pbWF0aW9uLXNpemUpKX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci5ib3R0b20tY2VudGVye2p1c3RpZnktY29udGVudDpjZW50ZXI7YWxpZ24taXRlbXM6ZmxleC1lbmR9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIuYm90dG9tLWNlbnRlciAuYWNvcmQtLW5vdGlmaWNhdGlvbi5oaWRkZW57dHJhbnNmb3JtOnRyYW5zbGF0ZSgwLCB2YXIoLS1hbmltYXRpb24tc2l6ZSkpfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLmJvdHRvbS1jZW50ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24uY2xvc2luZ3t0cmFuc2Zvcm06dHJhbnNsYXRlKDAsIGNhbGModmFyKC0tYW5pbWF0aW9uLXNpemUpICogLTEpKX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci5jZW50ZXJ7anVzdGlmeS1jb250ZW50OmNlbnRlcjthbGlnbi1pdGVtczpjZW50ZXJ9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIuY2VudGVyIC5hY29yZC0tbm90aWZpY2F0aW9uLmhpZGRlbnt0cmFuc2Zvcm06c2NhbGUoMC41KX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci5jZW50ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24uY2xvc2luZ3t0cmFuc2Zvcm06c2NhbGUoMC41KX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci5sZWZ0LWNlbnRlcntqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1zdGFydDthbGlnbi1pdGVtczpjZW50ZXJ9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIubGVmdC1jZW50ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24uaGlkZGVue3RyYW5zZm9ybTp0cmFuc2xhdGUoY2FsYyh2YXIoLS1hbmltYXRpb24tc2l6ZSkgKiAtMSksIDApfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLmxlZnQtY2VudGVyIC5hY29yZC0tbm90aWZpY2F0aW9uLmNsb3Npbmd7dHJhbnNmb3JtOnRyYW5zbGF0ZSh2YXIoLS1hbmltYXRpb24tc2l6ZSksIDApfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLnJpZ2h0LWNlbnRlcntqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1lbmQ7YWxpZ24taXRlbXM6Y2VudGVyfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLnJpZ2h0LWNlbnRlciAuYWNvcmQtLW5vdGlmaWNhdGlvbi5oaWRkZW57dHJhbnNmb3JtOnRyYW5zbGF0ZSh2YXIoLS1hbmltYXRpb24tc2l6ZSksIDApfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLnJpZ2h0LWNlbnRlciAuYWNvcmQtLW5vdGlmaWNhdGlvbi5jbG9zaW5ne3RyYW5zZm9ybTp0cmFuc2xhdGUoY2FsYyh2YXIoLS1hbmltYXRpb24tc2l6ZSkgKiAtMSksIDApfWA7XG4iLCAiaW1wb3J0IGRvbSBmcm9tIFwiLi4vZG9tL2luZGV4LmpzXCI7XHJcbmltcG9ydCBldmVudHMgZnJvbSBcIi4uL2V2ZW50cy9pbmRleC5qc1wiO1xyXG5pbXBvcnQgd2VicGFjayBmcm9tIFwiLi4vbW9kdWxlcy93ZWJwYWNrLmpzXCI7XHJcblxyXG5jb25zdCB0b29sdGlwQ2xhc3NlcyA9IHdlYnBhY2suZmluZEJ5UHJvcGVydGllcyhcInRvb2x0aXBDb250ZW50QWxsb3dPdmVyZmxvd1wiLCBcInRvb2x0aXBcIik7XHJcblxyXG5jb25zdCB0b29sdGlwUG9zaXRpb25zID0ge1xyXG4gIHRvcDogdG9vbHRpcENsYXNzZXMudG9vbHRpcFRvcCxcclxuICBib3R0b206IHRvb2x0aXBDbGFzc2VzLnRvb2x0aXBCb3R0b20sXHJcbiAgbGVmdDogdG9vbHRpcENsYXNzZXMudG9vbHRpcExlZnQsXHJcbiAgcmlnaHQ6IHRvb2x0aXBDbGFzc2VzLnRvb2x0aXBSaWdodCxcclxufVxyXG5cclxuY2xhc3MgVG9vbHRpcCB7XHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtIVE1MRGl2RWxlbWVudH0gdGFyZ2V0IFxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfEhUTUxEaXZFbGVtZW50fSBjb250ZW50XHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IodGFyZ2V0LCBjb250ZW50LCBwb3NpdGlvbiA9IFwiYXV0b1wiKSB7XHJcbiAgICAvKiogQHR5cGUge0hUTUxEaXZFbGVtZW50fSAqL1xyXG4gICAgdGhpcy5sYXllckVsZW1lbnQgPSBkb20ucGFyc2UoYFxyXG4gICAgICA8ZGl2IGNsYXNzPVwiYWNvcmQtLXRvb2x0aXAtbGF5ZXJcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiJHt0b29sdGlwQ2xhc3Nlcy50b29sdGlwfSAke3Rvb2x0aXBDbGFzc2VzLnRvb2x0aXBQcmltYXJ5fSBhY29yZC0tdG9vbHRpcFwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cIiR7dG9vbHRpcENsYXNzZXMudG9vbHRpcFBvaW50ZXJ9IGFjb3JkLS10b29sdGlwLXBvaW50ZXJcIj48L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCIke3Rvb2x0aXBDbGFzc2VzLnRvb2x0aXBDb250ZW50fSBhY29yZC0tdG9vbHRpcC1jb250ZW50XCI+PC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgYCk7XHJcbiAgICB0aGlzLnRvb2x0aXBFbGVtZW50ID0gdGhpcy5sYXllckVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5hY29yZC0tdG9vbHRpcFwiKTtcclxuICAgIHRoaXMuY29udGVudEVsZW1lbnQgPSB0aGlzLmxheWVyRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmFjb3JkLS10b29sdGlwLWNvbnRlbnRcIik7XHJcbiAgICB0aGlzLmNvbnRlbnQgPSBjb250ZW50O1xyXG4gICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XHJcblxyXG4gICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XHJcbiAgICB0aGlzLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLnBhdXNlZCA9IGZhbHNlO1xyXG5cclxuICAgIGNvbnN0IG9uTW91c2VFbnRlciA9ICgpID0+IHtcclxuICAgICAgaWYgKHRoaXMuZGlzYWJsZWQgfHwgdGhpcy5wYXVzZWQpIHJldHVybjtcclxuICAgICAgdGhpcy5zaG93KCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgb25Nb3VzZUxlYXZlID0gKCkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5wYXVzZWQpIHJldHVybjtcclxuICAgICAgdGhpcy5oaWRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy50YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgb25Nb3VzZUVudGVyKTtcclxuICAgIHRoaXMudGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIG9uTW91c2VMZWF2ZSk7XHJcblxyXG4gICAgbGV0IHVuUGF0Y2hPYnNlcnZlciA9IGV2ZW50cy5vbihcclxuICAgICAgXCJkb20tbXV0YXRpb25cIixcclxuICAgICAgLyoqIEBwYXJhbSB7TXV0YXRpb25SZWNvcmR9IG11dCAqLyhtdXQpID0+IHtcclxuICAgICAgICBpZiAobXV0LnR5cGUgPT09IFwiYXR0cmlidXRlc1wiKSB7XHJcbiAgICAgICAgICBpZiAobXV0LnRhcmdldC5pc1NhbWVOb2RlKHRoaXMudGFyZ2V0KSkge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG11dC5hdHRyaWJ1dGVOYW1lKSB7XHJcbiAgICAgICAgICAgICAgY2FzZSBcImFjb3JkLS10b29sdGlwLWRpc2FibGVkXCI6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlzYWJsZWQgPSB0aGlzLnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJhY29yZC0tdG9vbHRpcC1kaXNhYmxlZFwiKSA9PT0gXCJ0cnVlXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgY2FzZSBcImFjb3JkLS10b29sdGlwLWNvbnRlbnRcIjoge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50ID0gdGhpcy50YXJnZXQuZ2V0QXR0cmlidXRlKFwiYWNvcmQtLXRvb2x0aXAtY29udGVudFwiKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBjYXNlIFwiYWNvcmQtLXRvb2x0aXAtcG9zaXRpb25cIjoge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHRoaXMudGFyZ2V0LmdldEF0dHJpYnV0ZShcImFjb3JkLS10b29sdGlwLXBvc2l0aW9uXCIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICApXHJcblxyXG4gICAgdGhpcy5kZXN0cm95ID0gKCkgPT4ge1xyXG4gICAgICB0aGlzLnRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCBvbk1vdXNlRW50ZXIpO1xyXG4gICAgICB0aGlzLnRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCBvbk1vdXNlTGVhdmUpO1xyXG4gICAgICB0aGlzLmhpZGUoKTtcclxuICAgICAgdW5QYXRjaE9ic2VydmVyKCk7XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgZ2V0IGNvbnRlbnQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jb250ZW50RWxlbWVudC5maXJzdEVsZW1lbnRDaGlsZDtcclxuICB9XHJcblxyXG4gIHNldCBjb250ZW50KHZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgIHRoaXMuY29udGVudEVsZW1lbnQuaW5uZXJIVE1MID0gdmFsdWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmNvbnRlbnRFbGVtZW50LmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICAgIHRoaXMuY29udGVudEVsZW1lbnQuYXBwZW5kQ2hpbGQodmFsdWUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIGdldENvbnRhaW5lcigpIHtcclxuICAgIGNvbnN0IGFwcEVsbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tjbGFzcyo9XCJub3REZXZUb29scy1cIl0nKTtcclxuXHJcbiAgICBsZXQgY29udGFpbmVyID0gYXBwRWxtLnF1ZXJ5U2VsZWN0b3IoXCIuYWNvcmQtLXRvb2x0aXAtY29udGFpbmVyXCIpO1xyXG4gICAgaWYgKCFjb250YWluZXIpIHtcclxuICAgICAgY29udGFpbmVyID0gZG9tLnBhcnNlKGA8ZGl2IGNsYXNzPVwiYWNvcmQtLWxheWVyLWNvbnRhaW5lciBhY29yZC0tdG9vbHRpcC1jb250YWluZXJcIj48L2Rpdj5gKTtcclxuICAgICAgYXBwRWxtLmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XHJcbiAgICB9XHJcbiAgICBjb250YWluZXIuc3R5bGUuc2V0UHJvcGVydHkoXCItLXRvcC1vZmZzZXRcIiwgYCR7YXBwRWxtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcC50b0ZpeGVkKDEpfXB4YCk7XHJcblxyXG4gICAgcmV0dXJuIGNvbnRhaW5lcjtcclxuICB9XHJcblxyXG4gIHNob3coKSB7XHJcbiAgICBpZiAodGhpcy52aXNpYmxlKSByZXR1cm47XHJcbiAgICB0aGlzLnZpc2libGUgPSB0cnVlO1xyXG5cclxuICAgIGNvbnN0IGNvbnRhaW5lciA9IFRvb2x0aXAuZ2V0Q29udGFpbmVyKCk7XHJcblxyXG4gICAgaWYgKHRoaXMucG9zaXRpb24gPT09IFwiYXV0b1wiKSB7XHJcbiAgICAgIHRoaXMuY2FsY3VsYXRlUG9zaXRpb24oXHJcbiAgICAgICAgdGhpcy5jYW5TaG93QXRUb3AgPyBcInRvcFwiXHJcbiAgICAgICAgICA6IHRoaXMuY2FuU2hvd0F0Qm90dG9tID8gXCJib3R0b21cIlxyXG4gICAgICAgICAgICA6IHRoaXMuY2FuU2hvd0F0TGVmdCA/IFwibGVmdFwiXHJcbiAgICAgICAgICAgICAgOiB0aGlzLmNhblNob3dBdFJpZ2h0ID8gXCJyaWdodFwiXHJcbiAgICAgICAgICAgICAgICA6IFwidG9wXCJcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuY2FsY3VsYXRlUG9zaXRpb24odGhpcy5wb3NpdGlvbik7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmxheWVyRWxlbWVudCk7XHJcbiAgICB0aGlzLmxheWVyRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwidmlzaWJsZVwiKTtcclxuICB9XHJcblxyXG4gIGNhbGN1bGF0ZVBvc2l0aW9uKHBvc2l0aW9uKSB7XHJcbiAgICBjb25zdCBib3VuZGluZ1JlY3QgPSB0aGlzLnRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHJcbiAgICB0aGlzLmxheWVyRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKC4uLk9iamVjdC52YWx1ZXModG9vbHRpcFBvc2l0aW9ucykpO1xyXG4gICAgdGhpcy50b29sdGlwRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwidmVydGljYWxcIiwgXCJob3Jpem9udGFsXCIpO1xyXG5cclxuICAgIHN3aXRjaCAocG9zaXRpb24pIHtcclxuICAgICAgY2FzZSBcInRvcFwiOiB7XHJcbiAgICAgICAgdGhpcy5sYXllckVsZW1lbnQuc3R5bGUudG9wID0gYCR7Ym91bmRpbmdSZWN0LnRvcCAtIHRoaXMudGFyZ2V0Lm9mZnNldEhlaWdodCAtIDEwfXB4YDtcclxuICAgICAgICB0aGlzLmxheWVyRWxlbWVudC5zdHlsZS5sZWZ0ID0gYCR7Ym91bmRpbmdSZWN0LmxlZnR9cHhgO1xyXG4gICAgICAgIHRoaXMubGF5ZXJFbGVtZW50LmNsYXNzTGlzdC5hZGQodG9vbHRpcFBvc2l0aW9ucy50b3ApO1xyXG4gICAgICAgIHRoaXMudG9vbHRpcEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInZlcnRpY2FsXCIpO1xyXG4gICAgICAgIHRoaXMuY2VudGVyUG9zaXRpb24oXCJob3Jpem9udGFsXCIpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgXCJib3R0b21cIjoge1xyXG4gICAgICAgIHRoaXMubGF5ZXJFbGVtZW50LnN0eWxlLnRvcCA9IGAke2JvdW5kaW5nUmVjdC50b3AgKyB0aGlzLnRhcmdldC5vZmZzZXRIZWlnaHQgKyAxMH1weGA7XHJcbiAgICAgICAgdGhpcy5sYXllckVsZW1lbnQuc3R5bGUubGVmdCA9IGAke2JvdW5kaW5nUmVjdC5sZWZ0fXB4YDtcclxuICAgICAgICB0aGlzLmxheWVyRWxlbWVudC5jbGFzc0xpc3QuYWRkKHRvb2x0aXBQb3NpdGlvbnMuYm90dG9tKTtcclxuICAgICAgICB0aGlzLnRvb2x0aXBFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJ2ZXJ0aWNhbFwiKTtcclxuICAgICAgICB0aGlzLmNlbnRlclBvc2l0aW9uKFwiaG9yaXpvbnRhbFwiKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlIFwibGVmdFwiOiB7XHJcbiAgICAgICAgdGhpcy5sYXllckVsZW1lbnQuc3R5bGUudG9wID0gYCR7Ym91bmRpbmdSZWN0LnRvcH1weGA7XHJcbiAgICAgICAgdGhpcy5sYXllckVsZW1lbnQuc3R5bGUubGVmdCA9IGAke2JvdW5kaW5nUmVjdC5sZWZ0IC0gdGhpcy50YXJnZXQub2Zmc2V0V2lkdGggLSAxMH1weGA7XHJcbiAgICAgICAgdGhpcy5sYXllckVsZW1lbnQuY2xhc3NMaXN0LmFkZCh0b29sdGlwUG9zaXRpb25zLmxlZnQpO1xyXG4gICAgICAgIHRoaXMudG9vbHRpcEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImhvcml6b250YWxcIik7XHJcbiAgICAgICAgdGhpcy5jZW50ZXJQb3NpdGlvbihcInZlcnRpY2FsXCIpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgXCJyaWdodFwiOiB7XHJcbiAgICAgICAgdGhpcy5sYXllckVsZW1lbnQuc3R5bGUudG9wID0gYCR7Ym91bmRpbmdSZWN0LnRvcH1weGA7XHJcbiAgICAgICAgdGhpcy5sYXllckVsZW1lbnQuc3R5bGUubGVmdCA9IGAke2JvdW5kaW5nUmVjdC5sZWZ0ICsgdGhpcy50YXJnZXQub2Zmc2V0V2lkdGggKyAxMH1weGA7XHJcbiAgICAgICAgdGhpcy5sYXllckVsZW1lbnQuY2xhc3NMaXN0LmFkZCh0b29sdGlwUG9zaXRpb25zLnJpZ2h0KTtcclxuICAgICAgICB0aGlzLnRvb2x0aXBFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJob3Jpem9udGFsXCIpO1xyXG4gICAgICAgIHRoaXMuY2VudGVyUG9zaXRpb24oXCJ2ZXJ0aWNhbFwiKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY2VudGVyUG9zaXRpb24oZGlyZWN0aW9uKSB7XHJcbiAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xyXG4gICAgICBjYXNlIFwiaG9yaXpvbnRhbFwiOiB7XHJcbiAgICAgICAgY29uc3QgY2VudGVyID0gdGhpcy50YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCArICh0aGlzLnRhcmdldC5vZmZzZXRXaWR0aCAvIDIpO1xyXG4gICAgICAgIHRoaXMubGF5ZXJFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KFwibGVmdFwiLCBgJHtjZW50ZXIgLSAodGhpcy5sYXllckVsZW1lbnQub2Zmc2V0V2lkdGggLyAyKX1weGApO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgXCJ2ZXJ0aWNhbFwiOiB7XHJcbiAgICAgICAgY29uc3QgY2VudGVyID0gdGhpcy50YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgKHRoaXMudGFyZ2V0Lm9mZnNldEhlaWdodCAvIDIpO1xyXG4gICAgICAgIHRoaXMubGF5ZXJFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KFwidG9wXCIsIGAke2NlbnRlciAtICh0aGlzLmxheWVyRWxlbWVudC5vZmZzZXRIZWlnaHQgLyAyKX1weGApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBoaWRlKCkge1xyXG4gICAgaWYgKCF0aGlzLnZpc2libGUpIHJldHVybjtcclxuICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMubGF5ZXJFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJ2aXNpYmxlXCIpO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHRoaXMubGF5ZXJFbGVtZW50LnJlbW92ZSgpO1xyXG4gICAgfSwgNTApO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGNhblNob3dBdFRvcCgpIHsgcmV0dXJuIHRoaXMudGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCAtIHRoaXMubGF5ZXJFbGVtZW50Lm9mZnNldEhlaWdodCA+PSAwOyB9XHJcbiAgZ2V0IGNhblNob3dBdEJvdHRvbSgpIHsgcmV0dXJuIHRoaXMudGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCArIHRoaXMudGFyZ2V0Lm9mZnNldEhlaWdodCArIHRoaXMubGF5ZXJFbGVtZW50Lm9mZnNldEhlaWdodCA8PSB3aW5kb3cuaW5uZXJIZWlnaHQ7IH1cclxuICBnZXQgY2FuU2hvd0F0TGVmdCgpIHsgcmV0dXJuIHRoaXMudGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQgLSB0aGlzLmxheWVyRWxlbWVudC5vZmZzZXRXaWR0aCA+PSAwOyB9XHJcbiAgZ2V0IGNhblNob3dBdFJpZ2h0KCkgeyByZXR1cm4gdGhpcy50YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCArIHRoaXMudGFyZ2V0Lm9mZnNldFdpZHRoICsgdGhpcy5sYXllckVsZW1lbnQub2Zmc2V0V2lkdGggPD0gd2luZG93LmlubmVyV2lkdGg7IH1cclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlKHRhcmdldCwgY29udGVudCwgcG9zaXRpb24gPSBcImF1dG9cIikge1xyXG4gIHJldHVybiBuZXcgVG9vbHRpcCh0YXJnZXQsIGNvbnRlbnQsIHBvc2l0aW9uKTtcclxufVxyXG5cclxuZG9tLnBhdGNoKFxyXG4gIFwiW2Fjb3JkLS10b29sdGlwLWNvbnRlbnRdXCIsXHJcbiAgKGVsbSkgPT4ge1xyXG4gICAgbGV0IHRvb2x0aXAgPSBjcmVhdGUoZWxtLCBlbG0uZ2V0QXR0cmlidXRlKFwiYWNvcmQtLXRvb2x0aXAtY29udGVudFwiKSwgZWxtLmdldEF0dHJpYnV0ZShcImFjb3JkLS10b29sdGlwLXBvc2l0aW9uXCIpKTtcclxuICAgIHRvb2x0aXAuZGlzYWJsZWQgPSBlbG0uZ2V0QXR0cmlidXRlKFwiYWNvcmQtLXRvb2x0aXAtZGlzYWJsZWRcIikgPT09IFwidHJ1ZVwiO1xyXG5cclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIHRvb2x0aXAuZGVzdHJveSgpO1xyXG4gICAgfVxyXG4gIH0sXHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7IGNyZWF0ZSB9OyIsICJpbXBvcnQgZG9tIGZyb20gXCIuLi9kb20vaW5kZXguanNcIjtcclxuaW1wb3J0IHV0aWxzIGZyb20gXCIuLi91dGlscy9pbmRleC5qc1wiO1xyXG5cclxuY29uc3QgdmFsaWRQb3NpdGlvbnMgPSBbXHJcbiAgXCJ0b3AtcmlnaHRcIixcclxuICBcInRvcC1sZWZ0XCIsXHJcbiAgXCJib3R0b20tcmlnaHRcIixcclxuICBcImJvdHRvbS1sZWZ0XCIsXHJcbiAgXCJ0b3AtY2VudGVyXCIsXHJcbiAgXCJib3R0b20tY2VudGVyXCIsXHJcbiAgXCJjZW50ZXJcIixcclxuICBcImxlZnQtY2VudGVyXCIsXHJcbiAgXCJyaWdodC1jZW50ZXJcIlxyXG5dXHJcblxyXG5mdW5jdGlvbiBnZXRDb250YWluZXIocG9zaXRpb24pIHtcclxuICBpZiAoIXZhbGlkUG9zaXRpb25zLmluY2x1ZGVzKHBvc2l0aW9uKSkgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHBvc2l0aW9uIFwiJHtwb3NpdGlvbn1cIi4gVmFsaWQgcG9zaXRpb25zIGFyZTogJHt2YWxpZFBvc2l0aW9ucy5qb2luKFwiLCBcIil9YCk7XHJcbiAgY29uc3QgYXBwRWxtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2NsYXNzKj1cIm5vdEFwcEFzaWRlUGFuZWwtXCJdJyk7XHJcblxyXG4gIGxldCB0b3BDb250YWluZXIgPSBhcHBFbG0ucXVlcnlTZWxlY3RvcihcIi5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLWNvbnRhaW5lclwiKTtcclxuICBpZiAoIXRvcENvbnRhaW5lcikge1xyXG4gICAgdG9wQ29udGFpbmVyID0gZG9tLnBhcnNlKGA8ZGl2IGNsYXNzPVwiYWNvcmQtLWxheWVyLWNvbnRhaW5lciBhY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLWNvbnRhaW5lclwiPjwvZGl2PmApO1xyXG4gICAgYXBwRWxtLmFwcGVuZENoaWxkKHRvcENvbnRhaW5lcik7XHJcbiAgfVxyXG4gIHRvcENvbnRhaW5lci5zdHlsZS5zZXRQcm9wZXJ0eShcIi0tdG9wLW9mZnNldFwiLCBgJHthcHBFbG0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wLnRvRml4ZWQoMSl9cHhgKTtcclxuXHJcbiAgbGV0IHBvc2l0aW9uQ29udGFpbmVyID0gdG9wQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoYC5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLiR7cG9zaXRpb259YCk7XHJcbiAgaWYgKCFwb3NpdGlvbkNvbnRhaW5lcikge1xyXG4gICAgcG9zaXRpb25Db250YWluZXIgPSBkb20ucGFyc2UoYDxkaXYgY2xhc3M9XCJhY29yZC0tbm90aWZpY2F0aW9uLWxheWVyICR7cG9zaXRpb259XCI+PC9kaXY+YCk7XHJcbiAgICB0b3BDb250YWluZXIuYXBwZW5kQ2hpbGQocG9zaXRpb25Db250YWluZXIpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHBvc2l0aW9uQ29udGFpbmVyO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93KGNvbnRlbnQsIHtcclxuICBzdHlsZSA9IFwiZGVmYXVsdFwiLFxyXG4gIHRpbWVvdXQgPSAxMDAwMCxcclxuICBwb3NpdGlvbiA9IFwidG9wLXJpZ2h0XCIsXHJcbiAgY2xvc2FibGUgPSB0cnVlLFxyXG4gIG9uQ2xpY2sgPSBudWxsLFxyXG4gIG9uQ2xvc2UgPSBudWxsXHJcbn0gPSB7fSkge1xyXG4gIGNvbnN0IGNvbnRhaW5lciA9IGdldENvbnRhaW5lcihwb3NpdGlvbik7XHJcblxyXG4gIGNvbnN0IG5vdGlmRWxtID0gZG9tLnBhcnNlKGBcclxuICAgIDxkaXYgY2xhc3M9XCJhY29yZC0tbm90aWZpY2F0aW9uIHN0eWxlLSR7c3R5bGV9IGhpZGRlblwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRlbnRcIj48L2Rpdj5cclxuICAgICAgICAgICAgPHN2ZyBjbGFzcz1cImNsb3NlICR7IWNsb3NhYmxlID8gXCJoaWRkZW5cIiA6IFwiXCJ9XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMjRcIj5cclxuICAgICAgICAgICAgICAgIDxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTEyIDEwLjU4Nmw0Ljk1LTQuOTUgMS40MTQgMS40MTQtNC45NSA0Ljk1IDQuOTUgNC45NS0xLjQxNCAxLjQxNC00Ljk1LTQuOTUtNC45NSA0Ljk1LTEuNDE0LTEuNDE0IDQuOTUtNC45NS00Ljk1LTQuOTVMNy4wNSA1LjYzNnpcIi8+XHJcbiAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJwcm9ncmVzcy1jb250YWluZXJcIiBzdHlsZT1cIi0tZHVyYXRpb246ICR7dGltZW91dH1tcztcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2dyZXNzXCI+PC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICBgKTtcclxuXHJcbiAgbm90aWZFbG0ucXVlcnlTZWxlY3RvcihcIi5jb250ZW50XCIpLmlubmVySFRNTCA9IGNvbnRlbnQ7XHJcblxyXG4gIGxldCBjbG9zZWQgPSBmYWxzZTtcclxuICBmdW5jdGlvbiBjbG9zZShjbG9zZVR5cGUpIHtcclxuICAgIGlmIChjbG9zZWQpIHJldHVybjtcclxuICAgIGNsb3NlZCA9IHRydWU7XHJcblxyXG4gICAgbm90aWZFbG0uY2xhc3NMaXN0LmFkZChcImNsb3NpbmdcIik7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgbm90aWZFbG0ucmVtb3ZlKCk7XHJcblxyXG4gICAgICB1dGlscy5pZkV4aXN0cyhcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci1jb250YWluZXJgKSxcclxuICAgICAgICAvKiogQHBhcmFtIHtIVE1MRGl2RWxlbWVudH0gZWxtICovKGVsbSkgPT4ge1xyXG4gICAgICAgICAgaWYgKCEoWy4uLmVsbS5jaGlsZE5vZGVzLnZhbHVlcygpXS5yZWR1Y2UoKHByZXYsIGN1cnIpID0+IHByZXYgKyBjdXJyLmNoaWxkRWxlbWVudENvdW50LCAwKSkpIGVsbS5yZW1vdmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICk7XHJcbiAgICB9LCAyNzUpO1xyXG4gICAgb25DbG9zZT8uKGNsb3NlVHlwZSk7XHJcbiAgfVxyXG5cclxuICBpZiAodHlwZW9mIG9uQ2xpY2sgPT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICBub3RpZkVsbS5jbGFzc0xpc3QuYWRkKFwiY2xpY2thYmxlXCIpO1xyXG4gICAgbm90aWZFbG0ub25jbGljayA9ICgpID0+IHtcclxuICAgICAgb25DbGljayhjbG9zZSk7XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgdXRpbHMuaWZFeGlzdHMobm90aWZFbG0ucXVlcnlTZWxlY3RvcihcIi5jbG9zZVwiKSwgKGVsbSkgPT4ge1xyXG4gICAgZWxtLm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgIGNsb3NlKFwidXNlclwiKTtcclxuICAgIH07XHJcbiAgfSk7XHJcblxyXG4gIGNvbnRhaW5lci5wcmVwZW5kKG5vdGlmRWxtKTtcclxuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xyXG4gICAgbm90aWZFbG0uY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcclxuICAgIG5vdGlmRWxtLnF1ZXJ5U2VsZWN0b3IoXCIucHJvZ3Jlc3NcIikuY2xhc3NMaXN0LmFkZChcInByb2dyZXNzaW5nXCIpO1xyXG4gIH0pO1xyXG5cclxuICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgIGNsb3NlKFwidGltZW91dFwiKTtcclxuICB9LCB0aW1lb3V0KTtcclxuXHJcbiAgcmV0dXJuICgpID0+IHtcclxuICAgIGNsb3NlKFwiZm9yY2VcIik7XHJcbiAgfTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIHNob3c6IE9iamVjdC5hc3NpZ24oc2hvdywge1xyXG4gICAgaW5mbzogKGh0bWwsIG9iaiA9IHt9KSA9PiBzaG93KGh0bWwsIHsgLi4ub2JqLCBzdHlsZTogXCJpbmZvXCIgfSksXHJcbiAgICBlcnJvcjogKGh0bWwsIG9iaiA9IHt9KSA9PiBzaG93KGh0bWwsIHsgLi4ub2JqLCBzdHlsZTogXCJlcnJvclwiIH0pLFxyXG4gICAgd2FybmluZzogKGh0bWwsIG9iaiA9IHt9KSA9PiBzaG93KGh0bWwsIHsgLi4ub2JqLCBzdHlsZTogXCJ3YXJuaW5nXCIgfSksXHJcbiAgICBzdWNjZXNzOiAoaHRtbCwgb2JqID0ge30pID0+IHNob3coaHRtbCwgeyAuLi5vYmosIHN0eWxlOiBcInN1Y2Nlc3NcIiB9KSxcclxuICB9KSxcclxufTsiLCAiaW1wb3J0IHdlYnBhY2sgZnJvbSBcIi4uL21vZHVsZXMvd2VicGFjay5qc1wiO1xyXG5pbXBvcnQgcGF0Y2hlciBmcm9tIFwiLi4vcGF0Y2hlci9pbmRleC5qc1wiO1xyXG5pbXBvcnQgbG9nZ2VyIGZyb20gXCIuLi91dGlscy9sb2dnZXIuanNcIjtcclxuXHJcbmltcG9ydCBjb21tb24gZnJvbSBcIi4uL21vZHVsZXMvY29tbW9uLmpzXCI7XHJcbmltcG9ydCB7IGZpbmRlck1hcCB9IGZyb20gXCIuLi9tb2R1bGVzL3Jhdy9jb21wbGV4LWZpbmRlci5qc1wiO1xyXG5cclxuY29uc3QgeyBSZWFjdCB9ID0gY29tbW9uO1xyXG5cclxubGV0IGlzUmVhZHkgPSBmYWxzZTtcclxuXHJcbmxldCBDb21wb25lbnRzID0gbnVsbDtcclxuXHJcbmxldCBBY3Rpb25zID0gbnVsbDtcclxuXHJcbihhc3luYyAoKSA9PiB7XHJcbiAgQWN0aW9ucyA9IGF3YWl0IChhc3luYyAoKSA9PiB7XHJcbiAgICBsZXQgb2dNb2R1bGU7XHJcbiAgICB3aGlsZSAodHJ1ZSkge1xyXG4gICAgICBvZ01vZHVsZSA9IHdlYnBhY2suZmlsdGVyKG0gPT4gT2JqZWN0LnZhbHVlcyhtKS5zb21lKHYgPT4gdHlwZW9mIHYgPT09IFwiZnVuY3Rpb25cIiAmJiB2LnRvU3RyaW5nKCkuaW5jbHVkZXMoXCJDT05URVhUX01FTlVfQ0xPU0VcIikpKS5maW5kKG0gPT4gbS5leHBvcnRzICE9PSB3aW5kb3cpPy5leHBvcnRzO1xyXG4gICAgICBpZiAob2dNb2R1bGUpIGJyZWFrO1xyXG4gICAgICBhd2FpdCBuZXcgUHJvbWlzZShyID0+IHNldFRpbWVvdXQociwgMTAwKSk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBvdXQgPSBmaW5kZXJNYXAob2dNb2R1bGUsIHtcclxuICAgICAgY2xvc2U6IFtcIkNPTlRFWFRfTUVOVV9DTE9TRVwiXSxcclxuICAgICAgb3BlbjogW1wicmVuZGVyTGF6eVwiXVxyXG4gICAgfSk7XHJcbiAgICBpc1JlYWR5ID0gISFvdXQuY2xvc2UgJiYgISFvdXQub3BlbjtcclxuICAgIHJldHVybiBvdXQ7XHJcbiAgfSkoKTtcclxuXHJcbiAgQ29tcG9uZW50cyA9ICgoKSA9PiB7XHJcbiAgICBjb25zdCBvdXQgPSB7fTtcclxuICAgIGNvbnN0IGNvbXBvbmVudE1hcCA9IHtcclxuICAgICAgc2VwYXJhdG9yOiBcIlNlcGFyYXRvclwiLFxyXG4gICAgICBjaGVja2JveDogXCJDaGVja2JveEl0ZW1cIixcclxuICAgICAgcmFkaW86IFwiUmFkaW9JdGVtXCIsXHJcbiAgICAgIGNvbnRyb2w6IFwiQ29udHJvbEl0ZW1cIixcclxuICAgICAgZ3JvdXBzdGFydDogXCJHcm91cFwiLFxyXG4gICAgICBjdXN0b21pdGVtOiBcIkl0ZW1cIlxyXG4gICAgfTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBtb2R1bGVJZCA9IE9iamVjdC5lbnRyaWVzKHdlYnBhY2sucmVxdWlyZS5tKS5maW5kKChbLCBtXSkgPT4gbT8udG9TdHJpbmcoKS5pbmNsdWRlcyhcIm1lbnVpdGVtY2hlY2tib3hcIikpWzBdO1xyXG4gICAgICBjb25zdCBjb250ZXh0TWVudU1vZHVsZSA9IHdlYnBhY2suZmluZCgoXywgaWR4KSA9PiBpZHggPT0gbW9kdWxlSWQpLmV4cG9ydHM7XHJcbiAgICAgIGNvbnN0IHJhd01hdGNoZXMgPSB3ZWJwYWNrLnJlcXVpcmUubVttb2R1bGVJZF0udG9TdHJpbmcoKS5tYXRjaEFsbCgvaWZcXChcXHcrXFwudHlwZT09PVxcdytcXC4oXFx3KylcXCkuKz90eXBlOlwiKC4rPylcIi9nKTtcclxuXHJcbiAgICAgIG91dC5NZW51ID0gT2JqZWN0LnZhbHVlcyhjb250ZXh0TWVudU1vZHVsZSkuZmluZCh2ID0+IHYudG9TdHJpbmcoKS5pbmNsdWRlcyhcIi5pc1VzaW5nS2V5Ym9hcmROYXZpZ2F0aW9uXCIpKTtcclxuXHJcbiAgICAgIFsuLi5yYXdNYXRjaGVzXS5mb3JFYWNoKChbLCBpZCwgdHlwZV0pID0+IHtcclxuICAgICAgICBvdXRbY29tcG9uZW50TWFwW3R5cGVdXSA9IGNvbnRleHRNZW51TW9kdWxlW2lkXTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpc1JlYWR5ID0gT2JqZWN0LmtleXMob3V0KS5sZW5ndGggPiAxO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGlzUmVhZHkgPSBmYWxzZTtcclxuICAgICAgbG9nZ2VyLmVycm9yKFwiRmFpbGVkIHRvIGxvYWQgY29udGV4dCBtZW51IGNvbXBvbmVudHNcIiwgZXJyKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gb3V0O1xyXG4gIH0pKCk7XHJcblxyXG4gIE1lbnVQYXRjaGVyLmluaXRpYWxpemUoKTtcclxufSkoKTtcclxuXHJcblxyXG5jbGFzcyBNZW51UGF0Y2hlciB7XHJcbiAgc3RhdGljIE1BWF9QQVRDSF9JVEVSQVRJT05TID0gMTY7XHJcbiAgc3RhdGljIHBhdGNoZXMgPSBuZXcgTWFwKCk7XHJcbiAgc3RhdGljIHN1YlBhdGNoZXMgPSBuZXcgV2Vha01hcCgpO1xyXG5cclxuICBzdGF0aWMgaW5pdGlhbGl6ZSgpIHtcclxuICAgIGlmICghaXNSZWFkeSkgcmV0dXJuIGxvZ2dlci53YXJuKFwiVW5hYmxlIHRvIGxvYWQgY29udGV4dCBtZW51LlwiKTtcclxuXHJcbiAgICBjb25zdCBtb2R1bGVUb1BhdGNoID0gd2VicGFjay5maWx0ZXIobSA9PiBPYmplY3QudmFsdWVzKG0pLnNvbWUodiA9PiB0eXBlb2YgdiA9PT0gXCJmdW5jdGlvblwiICYmIHYudG9TdHJpbmcoKS5pbmNsdWRlcyhcIkNPTlRFWFRfTUVOVV9DTE9TRVwiKSkpLmZpbmQobSA9PiBtLmV4cG9ydHMgIT09IHdpbmRvdykuZXhwb3J0cztcclxuICAgIGNvbnN0IGtleVRvUGF0Y2ggPSBPYmplY3Qua2V5cyhtb2R1bGVUb1BhdGNoKS5maW5kKGsgPT4gbW9kdWxlVG9QYXRjaFtrXT8ubGVuZ3RoID09PSAzKTtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhtb2R1bGVUb1BhdGNoLCBrZXlUb1BhdGNoKTtcclxuXHJcbiAgICBwYXRjaGVyLmJlZm9yZShcclxuICAgICAga2V5VG9QYXRjaCxcclxuICAgICAgbW9kdWxlVG9QYXRjaCxcclxuICAgICAgZnVuY3Rpb24gKG1ldGhvZEFyZ3MpIHtcclxuICAgICAgICBjb25zdCBwcm9taXNlID0gbWV0aG9kQXJnc1sxXTtcclxuICAgICAgICBtZXRob2RBcmdzWzFdID0gYXN5bmMgZnVuY3Rpb24gKC4uLmFyZ3MpIHtcclxuICAgICAgICAgIGNvbnN0IHJlbmRlciA9IGF3YWl0IHByb21pc2UuY2FsbCh0aGlzLCAuLi5hcmdzKTtcclxuXHJcbiAgICAgICAgICByZXR1cm4gKHByb3BzKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlcyA9IHJlbmRlcihwcm9wcyk7XHJcblxyXG4gICAgICAgICAgICBpZiAocmVzPy5wcm9wcy5uYXZJZCkge1xyXG4gICAgICAgICAgICAgIE1lbnVQYXRjaGVyLmV4ZWN1dGVQYXRjaGVzKHJlcy5wcm9wcy5uYXZJZCwgcmVzLCBwcm9wcyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHJlcz8udHlwZSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgICAgICAgTWVudVBhdGNoZXIucGF0Y2hSZWN1cnNpdmUocmVzLCBcInR5cGVcIik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZXM7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbWV0aG9kQXJncztcclxuICAgICAgfVxyXG4gICAgKVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIHBhdGNoUmVjdXJzaXZlKHRhcmdldCwgbWV0aG9kLCBpdGVyYXRpb24gPSAwKSB7XHJcbiAgICBpZiAoaXRlcmF0aW9uID49IHRoaXMuTUFYX1BBVENIX0lURVJBVElPTlMpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBwcm94eUZ1bmN0aW9uID0gdGhpcy5zdWJQYXRjaGVzLmdldCh0YXJnZXRbbWV0aG9kXSkgPz8gKCgpID0+IHtcclxuICAgICAgY29uc3Qgb3JpZ2luYWxGdW5jdGlvbiA9IHRhcmdldFttZXRob2RdO1xyXG4gICAgICBjb25zdCBkZXB0aCA9ICsraXRlcmF0aW9uO1xyXG4gICAgICBmdW5jdGlvbiBwYXRjaCguLi5hcmdzKSB7XHJcbiAgICAgICAgY29uc3QgcmVzID0gb3JpZ2luYWxGdW5jdGlvbi5jYWxsKHRoaXMsIC4uLmFyZ3MpO1xyXG5cclxuICAgICAgICBpZiAoIXJlcykgcmV0dXJuIHJlcztcclxuXHJcbiAgICAgICAgY29uc3QgbmF2SWQgPSByZXMucHJvcHM/Lm5hdklkID8/IHJlcy5wcm9wcz8uY2hpbGRyZW4/LnByb3BzPy5uYXZJZDtcclxuICAgICAgICBpZiAobmF2SWQpIHtcclxuICAgICAgICAgIE1lbnVQYXRjaGVyLmV4ZWN1dGVQYXRjaGVzKG5hdklkLCByZXMsIGFyZ3NbMF0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb25zdCBsYXllciA9IHJlcy5wcm9wcy5jaGlsZHJlbiA/IHJlcy5wcm9wcy5jaGlsZHJlbiA6IHJlcztcclxuXHJcbiAgICAgICAgICBpZiAodHlwZW9mIGxheWVyPy50eXBlID09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgICAgICBNZW51UGF0Y2hlci5wYXRjaFJlY3Vyc2l2ZShsYXllciwgXCJ0eXBlXCIsIGRlcHRoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiByZXM7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHBhdGNoLl9fb3JpZ2luYWxfXyA9IG9yaWdpbmFsRnVuY3Rpb247XHJcbiAgICAgIE9iamVjdC5hc3NpZ24ocGF0Y2gsIG9yaWdpbmFsRnVuY3Rpb24pO1xyXG4gICAgICB0aGlzLnN1YlBhdGNoZXMuc2V0KG9yaWdpbmFsRnVuY3Rpb24sIHBhdGNoKTtcclxuXHJcbiAgICAgIHJldHVybiBwYXRjaDtcclxuICAgIH0pKCk7XHJcblxyXG4gICAgdGFyZ2V0W21ldGhvZF0gPSBwcm94eUZ1bmN0aW9uO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGV4ZWN1dGVQYXRjaGVzKGlkLCByZXMsIHByb3BzKSB7XHJcbiAgICBpZiAoIXRoaXMucGF0Y2hlcy5oYXMoaWQpKSByZXR1cm47XHJcblxyXG4gICAgdGhpcy5wYXRjaGVzLmdldChpZCkuZm9yRWFjaChwYXRjaCA9PiB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgcGF0Y2gocmVzLCBwcm9wcyk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGxvZ2dlci5lcnJvcihcIkZhaWxlZCB0byBwYXRjaCBjb250ZXh0IG1lbnVcIiwgcGF0Y2gsIGVycik7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG5cclxuXHJcbi8vIENvcGllZCBmcm9tIGJkJ3Mgc291cmNlXHJcbmZ1bmN0aW9uIGJ1aWxkSXRlbShwcm9wcykge1xyXG4gIGNvbnN0IHsgdHlwZSB9ID0gcHJvcHM7XHJcbiAgaWYgKHR5cGUgPT09IFwic2VwYXJhdG9yXCIpIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KENvbXBvbmVudHMuU2VwYXJhdG9yKTtcclxuXHJcbiAgbGV0IGNvbXBvbmVudCA9IENvbXBvbmVudHMuSXRlbTtcclxuICBpZiAodHlwZSA9PT0gXCJzdWJtZW51XCIpIHtcclxuICAgIGlmICghcHJvcHMuY2hpbGRyZW4pIHByb3BzLmNoaWxkcmVuID0gYnVpbGRNZW51Q2hpbGRyZW4ocHJvcHMucmVuZGVyIHx8IHByb3BzLml0ZW1zKTtcclxuICB9IGVsc2UgaWYgKHR5cGUgPT09IFwidG9nZ2xlXCIgfHwgdHlwZSA9PT0gXCJyYWRpb1wiKSB7XHJcbiAgICBjb21wb25lbnQgPSB0eXBlID09PSBcInRvZ2dsZVwiID8gQ29tcG9uZW50cy5DaGVja2JveEl0ZW0gOiBDb21wb25lbnRzLlJhZGlvSXRlbTtcclxuICAgIGlmIChwcm9wcy5hY3RpdmUpIHByb3BzLmNoZWNrZWQgPSBwcm9wcy5hY3RpdmU7XHJcbiAgfSBlbHNlIGlmICh0eXBlID09PSBcImNvbnRyb2xcIikge1xyXG4gICAgY29tcG9uZW50ID0gQ29tcG9uZW50cy5Db250cm9sSXRlbTtcclxuICB9XHJcbiAgaWYgKCFwcm9wcy5pZCkgcHJvcHMuaWQgPSBgJHtwcm9wcy5sYWJlbC5yZXBsYWNlKC9eW15hLXpdK3xbXlxcdy1dKy9naSwgXCItXCIpfWA7XHJcbiAgaWYgKHByb3BzLmRhbmdlcikgcHJvcHMuY29sb3IgPSBcImNvbG9yRGFuZ2VyXCI7XHJcbiAgcHJvcHMuZXh0ZW5kZWQgPSB0cnVlO1xyXG5cclxuICBpZiAodHlwZSA9PT0gXCJ0b2dnbGVcIikge1xyXG4gICAgY29uc3QgW2FjdGl2ZSwgZG9Ub2dnbGVdID0gUmVhY3QudXNlU3RhdGUocHJvcHMuY2hlY2tlZCB8fCBmYWxzZSk7XHJcbiAgICBjb25zdCBvcmlnaW5hbEFjdGlvbiA9IHByb3BzLmFjdGlvbjtcclxuICAgIHByb3BzLmNoZWNrZWQgPSBhY3RpdmU7XHJcbiAgICBwcm9wcy5hY3Rpb24gPSBmdW5jdGlvbiAoZXYpIHtcclxuICAgICAgb3JpZ2luYWxBY3Rpb24oZXYpO1xyXG4gICAgICBkb1RvZ2dsZSghYWN0aXZlKTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChjb21wb25lbnQsIHByb3BzKTtcclxufVxyXG5cclxuLy8gQ29waWVkIGZyb20gYmQncyBzb3VyY2VcclxuZnVuY3Rpb24gYnVpbGRNZW51Q2hpbGRyZW4oc2V0dXApIHtcclxuICBjb25zdCBtYXBwZXIgPSBzID0+IHtcclxuICAgIGlmIChzLnR5cGUgPT09IFwiZ3JvdXBcIikgcmV0dXJuIGJ1aWxkR3JvdXAocyk7XHJcbiAgICByZXR1cm4gYnVpbGRJdGVtKHMpO1xyXG4gIH07XHJcbiAgY29uc3QgYnVpbGRHcm91cCA9IGZ1bmN0aW9uIChncm91cCkge1xyXG4gICAgY29uc3QgaXRlbXMgPSBncm91cC5pdGVtcy5tYXAobWFwcGVyKS5maWx0ZXIoaSA9PiBpKTtcclxuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KE1lbnVDb21wb25lbnRzLkdyb3VwLCBudWxsLCBpdGVtcyk7XHJcbiAgfTtcclxuICByZXR1cm4gc2V0dXAubWFwKG1hcHBlcikuZmlsdGVyKGkgPT4gaSk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBfX2NhY2hlX186IHtcclxuICAgIHBhdGNoZXM6IE1lbnVQYXRjaGVyLnBhdGNoZXMsXHJcbiAgICBzdWJQYXRjaGVzOiBNZW51UGF0Y2hlci5zdWJQYXRjaGVzXHJcbiAgfSxcclxuICBwYXRjaChuYXZJZCwgY2IpIHtcclxuICAgIGlmICghTWVudVBhdGNoZXIucGF0Y2hlcy5oYXMobmF2SWQpKSBNZW51UGF0Y2hlci5wYXRjaGVzLnNldChuYXZJZCwgbmV3IFNldCgpKTtcclxuICAgIE1lbnVQYXRjaGVyLnBhdGNoZXMuZ2V0KG5hdklkKS5hZGQoY2IpO1xyXG5cclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIE1lbnVQYXRjaGVyLnBhdGNoZXMuZ2V0KG5hdklkKS5kZWxldGUoY2IpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgb3BlbihldmVudCwgY29tcG9uZW50LCBjb25maWcpIHtcclxuICAgIHJldHVybiBBY3Rpb25zLm9wZW4oZXZlbnQsIChlKSA9PiBSZWFjdC5jcmVhdGVFbGVtZW50KGNvbXBvbmVudCwgT2JqZWN0LmFzc2lnbih7fSwgZSwgeyBvbkNsb3NlOiBBY3Rpb25zLmNsb3NlIH0pKSwgY29uZmlnKTtcclxuICB9LFxyXG4gIGNsb3NlKCkge1xyXG4gICAgcmV0dXJuIEFjdGlvbnMuY2xvc2UoKTtcclxuICB9LFxyXG4gIGJ1aWxkOiB7XHJcbiAgICBpdGVtKHNldHVwKSB7XHJcbiAgICAgIHJldHVybiBidWlsZE1lbnVDaGlsZHJlbihzZXR1cCk7XHJcbiAgICB9LFxyXG4gICAgbWVudShzZXR1cCkge1xyXG4gICAgICByZXR1cm4gKHByb3BzKSA9PiBSZWFjdC5jcmVhdGVFbGVtZW50KE1lbnVDb21wb25lbnRzLk1lbnUsIHByb3BzLCB0aGlzLmJ1aWxkTWVudUNoaWxkcmVuKHNldHVwKSk7XHJcbiAgICB9XHJcbiAgfVxyXG59OyIsICJpbXBvcnQgY29tbW9uIGZyb20gXCIuLi8uLi9hcGkvbW9kdWxlcy9jb21tb25cIjtcclxuaW1wb3J0IGxvZ2dlciBmcm9tIFwiLi4vLi4vYXBpL3V0aWxzL2xvZ2dlci5qc1wiO1xyXG5jb25zdCB7IFJlYWN0IH0gPSBjb21tb247XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFcnJvckJvdW5kYXJ5IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgc3VwZXIocHJvcHMpO1xyXG4gICAgdGhpcy5zdGF0ZSA9IHsgZXJyb3I6IG51bGwgfTtcclxuICB9XHJcblxyXG4gIGNvbXBvbmVudERpZENhdGNoKGVycm9yKSB7XHJcbiAgICB0aGlzLnNldFN0YXRlKHsgZXJyb3IgfSk7XHJcbiAgICBsb2dnZXIuZXJyb3IoZXJyb3IpO1xyXG4gICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLm9uRXJyb3IgPT09IFwiZnVuY3Rpb25cIikgdGhpcy5wcm9wcy5vbkVycm9yKGVycm9yKTtcclxuICB9XHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIGlmICh0aGlzLnN0YXRlLmVycm9yKSByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJhY29yZC0tcmVhY3QtZXJyb3JcIj5cclxuICAgICAgPHA+VW5leHBlY3RlZCBSZWFjdCBFcnJvciBIYXBwZW5lZC48L3A+XHJcbiAgICAgIDxwPntgJHt0aGlzLnN0YXRlLmVycm9yfWB9PC9wPlxyXG4gICAgPC9kaXY+O1xyXG4gICAgcmV0dXJuIHRoaXMucHJvcHMuY2hpbGRyZW47XHJcbiAgfVxyXG59XHJcblxyXG5jb25zdCBvcmlnaW5hbFJlbmRlciA9IEVycm9yQm91bmRhcnkucHJvdG90eXBlLnJlbmRlcjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KEVycm9yQm91bmRhcnkucHJvdG90eXBlLCBcInJlbmRlclwiLCB7XHJcbiAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgY29uZmlndXJhYmxlOiBmYWxzZSxcclxuICBzZXQ6IGZ1bmN0aW9uICgpIHsgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IHNldCByZW5kZXIgbWV0aG9kIG9mIEVycm9yQm91bmRhcnlcIik7IH0sXHJcbiAgZ2V0OiAoKSA9PiBvcmlnaW5hbFJlbmRlclxyXG59KTsiLCAiaW1wb3J0IEVycm9yQm91bmRhcnkgZnJvbSBcIi4uLy4uL2xpYi9jb21wb25lbnRzL0Vycm9yQm91bmRhcnkuanN4XCI7XHJcbmltcG9ydCBjb21tb24gZnJvbSBcIi4uL21vZHVsZXMvY29tbW9uLmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgRXJyb3JCb3VuZGFyeSxcclxuICBCdXR0b246IGNvbW1vbi5jb21wb25lbnRzLkJ1dHRvbixcclxuICBNYXJrZG93bjogY29tbW9uLmNvbXBvbmVudHMuTWFya2Rvd24sXHJcbiAgVGV4dDogY29tbW9uLmNvbXBvbmVudHMuVGV4dCxcclxuICBDb25maXJtYXRpb25Nb2RhbDogY29tbW9uLmNvbXBvbmVudHMuQ29uZmlybWF0aW9uTW9kYWwsXHJcbiAgTW9kYWxSb290OiBjb21tb24ubW9kYWxzLmNvbXBvbmVudHMuUm9vdCxcclxuICBNb2RhbENsb3NlQnV0dG9uOiBjb21tb24ubW9kYWxzLmNvbXBvbmVudHMub3RoZXIuQ2xvc2VCdXR0b24sXHJcbiAgTW9kYWxIZWFkZXI6IGNvbW1vbi5tb2RhbHMuY29tcG9uZW50cy5vdGhlci5IZWFkZXIsXHJcbiAgTW9kYWxDb250ZW50OiBjb21tb24ubW9kYWxzLmNvbXBvbmVudHMub3RoZXIuQ29udGVudCxcclxuICBNb2RhbEZvb3RlcjogY29tbW9uLm1vZGFscy5jb21wb25lbnRzLm90aGVyLkZvb3RlcixcclxuICBNb2RhbExpc3RDb250ZW50OiBjb21tb24ubW9kYWxzLmNvbXBvbmVudHMub3RoZXIuTGlzdENvbnRlbnQsXHJcbiAgVG9vbHRpcDogY29tbW9uLmNvbXBvbmVudHMuVG9vbHRpcCxcclxufSIsICJpbXBvcnQgRXJyb3JCb3VuZGFyeSBmcm9tIFwiLi4vLi4vbGliL2NvbXBvbmVudHMvRXJyb3JCb3VuZGFyeS5qc3hcIjtcclxuaW1wb3J0IGNvbW1vbiBmcm9tIFwiLi4vbW9kdWxlcy9jb21tb24uanNcIjtcclxuaW1wb3J0IGkxOG4gZnJvbSBcIi4uL2kxOG4vaW5kZXguanNcIlxyXG5jb25zdCB7IFJlYWN0LCBGbHV4RGlzcGF0Y2hlciwgY29tcG9uZW50cywgbW9kYWxzLCBVc2VyU3RvcmUgfSA9IGNvbW1vbjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBzaG93OiB7XHJcbiAgICBjb25maXJtYXRpb24odGl0bGUsIGNvbnRlbnQsIHsgY29uZmlybSA9IG51bGwsIGNhbmNlbCA9IG51bGwsIGRhbmdlciA9IGZhbHNlLCBrZXkgPSB1bmRlZmluZWQsIHRpbWVvdXQgPSA2MDAwMCAqIDUgfSA9IHt9KSB7XHJcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShjb250ZW50KSkgY29udGVudCA9IFtjb250ZW50XTtcclxuICAgICAgICBjb250ZW50ID0gY29udGVudC5tYXAoaSA9PiB0eXBlb2YgaSA9PT0gXCJzdHJpbmdcIiA/IFJlYWN0LmNyZWF0ZUVsZW1lbnQoY29tcG9uZW50cy5NYXJrZG93biwgbnVsbCwgaSkgOiBpKTtcclxuICAgICAgICBjb25zdCBtb2RhbEtleSA9IG1vZGFscy5hY3Rpb25zLm9wZW4oKHByb3BzKSA9PiB7XHJcbiAgICAgICAgICBsZXQgaW50ZXJhY3RlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgcmV0dXJuIDxFcnJvckJvdW5kYXJ5IG9uRXJyb3I9eygpID0+IHsgcmVzb2x2ZShmYWxzZSk7IH19PlxyXG4gICAgICAgICAgICA8Y29tcG9uZW50cy5Db25maXJtYXRpb25Nb2RhbFxyXG4gICAgICAgICAgICAgIGhlYWRlcj17dGl0bGV9XHJcbiAgICAgICAgICAgICAgY29uZmlybUJ1dHRvbkNvbG9yPXtkYW5nZXIgPyBjb21wb25lbnRzLkJ1dHRvbi5Db2xvcnMuUkVEIDogY29tcG9uZW50cy5CdXR0b24uQ29sb3JzLkJSQU5EfVxyXG4gICAgICAgICAgICAgIGNvbmZpcm1UZXh0PXtjb25maXJtIHx8IGkxOG4uZm9ybWF0KFwiQ09ORklSTVwiKX1cclxuICAgICAgICAgICAgICBjYW5jZWxUZXh0PXtjYW5jZWx9XHJcbiAgICAgICAgICAgICAgb25DYW5jZWw9eygpID0+IHsgcmVzb2x2ZShmYWxzZSk7IG1vZGFscy5hY3Rpb25zLmNsb3NlKG1vZGFsS2V5KTsgaW50ZXJhY3RlZCA9IHRydWU7IH19XHJcbiAgICAgICAgICAgICAgb25Db25maXJtPXsoKSA9PiB7IHJlc29sdmUodHJ1ZSk7IG1vZGFscy5hY3Rpb25zLmNsb3NlKG1vZGFsS2V5KTsgaW50ZXJhY3RlZCA9IHRydWU7IH19XHJcbiAgICAgICAgICAgICAgey4uLnByb3BzfVxyXG4gICAgICAgICAgICAgIG9uQ2xvc2U9eygpID0+IHsgcHJvcHMub25DbG9zZSgpOyByZXNvbHZlKGZhbHNlKTsgbW9kYWxzLmFjdGlvbnMuY2xvc2UobW9kYWxLZXkpOyB9fVxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgPEVycm9yQm91bmRhcnkgb25FcnJvcj17KCkgPT4geyByZXNvbHZlKGZhbHNlKTsgfX0+XHJcbiAgICAgICAgICAgICAgICB7Y29udGVudH1cclxuICAgICAgICAgICAgICA8L0Vycm9yQm91bmRhcnk+XHJcbiAgICAgICAgICAgIDwvY29tcG9uZW50cy5Db25maXJtYXRpb25Nb2RhbD5cclxuICAgICAgICAgIDwvRXJyb3JCb3VuZGFyeT5cclxuICAgICAgICB9LCB7IG1vZGFsS2V5OiBrZXkgfSk7XHJcbiAgICAgICAgaWYgKHRpbWVvdXQpIHtcclxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIWludGVyYWN0ZWQpIHtcclxuICAgICAgICAgICAgICByZXNvbHZlKGZhbHNlKTtcclxuICAgICAgICAgICAgICBtb2RhbHMuYWN0aW9ucy5jbG9zZShtb2RhbEtleSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sIHRpbWVvdXQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgY2xvc2Uoa2V5KSB7XHJcbiAgICAgIHJldHVybiBtb2RhbHMuYWN0aW9ucy5jbG9zZShrZXkpO1xyXG4gICAgfSxcclxuICAgIHVzZXIodXNlcklkKSB7XHJcbiAgICAgIGlmICghVXNlclN0b3JlLmdldFVzZXIodXNlcklkKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICBGbHV4RGlzcGF0Y2hlci5kaXNwYXRjaCh7IHR5cGU6IFwiVVNFUl9QUk9GSUxFX01PREFMX09QRU5cIiwgdXNlcklkIH0pO1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0sXHJcbiAgICBhbGVydCh0aXRsZSwgY29udGVudCwgeyBjb25maXJtID0gbnVsbCwga2V5ID0gdW5kZWZpbmVkLCB0aW1lb3V0ID0gNjAwMDAgKiA1IH0gPSB7fSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5jb25maXJtYXRpb24odGl0bGUsIGNvbnRlbnQsIHsgY29uZmlybSwgY2FuY2VsOiBudWxsLCBrZXksIHRpbWVvdXQgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG59IiwgImltcG9ydCBkb20gZnJvbSBcIi4uL2RvbS9pbmRleC5qc1wiO1xyXG5cclxuZnVuY3Rpb24gZ2V0Q29udGFpbmVyKCkge1xyXG4gIGNvbnN0IGFwcEVsbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tjbGFzcyo9XCJub3RBcHBBc2lkZVBhbmVsLVwiXScpO1xyXG5cclxuICBsZXQgdG9wQ29udGFpbmVyID0gYXBwRWxtLnF1ZXJ5U2VsZWN0b3IoXCIuYWNvcmQtLXRvYXN0cy1jb250YWluZXJcIik7XHJcbiAgaWYgKCF0b3BDb250YWluZXIpIHtcclxuICAgIHRvcENvbnRhaW5lciA9IGRvbS5wYXJzZShgPGRpdiBjbGFzcz1cImFjb3JkLS1sYXllci1jb250YWluZXIgYWNvcmQtLXRvYXN0cy1jb250YWluZXJcIj48L2Rpdj5gKTtcclxuICAgIGFwcEVsbS5hcHBlbmRDaGlsZCh0b3BDb250YWluZXIpO1xyXG4gIH1cclxuICB0b3BDb250YWluZXIuc3R5bGUuc2V0UHJvcGVydHkoXCItLXRvcC1vZmZzZXRcIiwgYCR7YXBwRWxtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcC50b0ZpeGVkKDEpfXB4YCk7XHJcblxyXG4gIHJldHVybiB0b3BDb250YWluZXI7XHJcbn1cclxuXHJcbmNvbnN0IGljb25zID0ge1xyXG4gIGluZm86IGA8c3ZnIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMjRcIj48cGF0aCBkPVwiTTEyIDIyQzYuNDc3IDIyIDIgMTcuNTIzIDIgMTJTNi40NzcgMiAxMiAyczEwIDQuNDc3IDEwIDEwLTQuNDc3IDEwLTEwIDEwem0tMS0xMXY2aDJ2LTZoLTJ6bTAtNHYyaDJWN2gtMnpcIiBmaWxsPVwiY3VycmVudENvbG9yXCIgLz48L3N2Zz5gLFxyXG4gIHdhcm5pbmc6IGA8c3ZnIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMjRcIj48cGF0aCBkPVwiTTEyIDIyQzYuNDc3IDIyIDIgMTcuNTIzIDIgMTJTNi40NzcgMiAxMiAyczEwIDQuNDc3IDEwIDEwLTQuNDc3IDEwLTEwIDEwem0tMS03djJoMnYtMmgtMnptMC04djZoMlY3aC0yelwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIiAvPjwvc3ZnPmAsXHJcbiAgZXJyb3I6IGA8c3ZnIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMjRcIj48cGF0aCBkPVwiTTEyIDIyQzYuNDc3IDIyIDIgMTcuNTIzIDIgMTJTNi40NzcgMiAxMiAyczEwIDQuNDc3IDEwIDEwLTQuNDc3IDEwLTEwIDEwem0tMS03djJoMnYtMmgtMnptMC04djZoMlY3aC0yelwiZmlsbD1cImN1cnJlbnRDb2xvclwiIC8+PC9zdmc+YCxcclxuICBzdWNjZXNzOiBgPHN2ZyB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCI+PHBhdGggZD1cIk0xMiAyMkM2LjQ3NyAyMiAyIDE3LjUyMyAyIDEyUzYuNDc3IDIgMTIgMnMxMCA0LjQ3NyAxMCAxMC00LjQ3NyAxMC0xMCAxMHptLS45OTctNmw3LjA3LTcuMDcxLTEuNDE0LTEuNDE0LTUuNjU2IDUuNjU3LTIuODI5LTIuODI5LTEuNDE0IDEuNDE0TDExLjAwMyAxNnpcIiBmaWxsPVwiY3VycmVudENvbG9yXCIgLz48L3N2Zz5gXHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBzaG93KFxyXG4gIGNvbnRlbnQsXHJcbiAge1xyXG4gICAgc3R5bGUgPSBcImRlZmF1bHRcIixcclxuICAgIHRpbWVvdXQgPSAzNTAwLFxyXG4gICAgb25DbGljayA9IG51bGwsXHJcbiAgICBoaWRlSWNvbiA9IGZhbHNlXHJcbiAgfSA9IHt9XHJcbikge1xyXG4gIGNvbnN0IGNvbnRhaW5lciA9IGdldENvbnRhaW5lcigpO1xyXG5cclxuICBjb25zdCB0b2FzdEVsbSA9IGRvbS5wYXJzZShgXHJcbiAgICA8ZGl2IGNsYXNzPVwiYWNvcmQtLXRvYXN0IHN0eWxlLSR7c3R5bGV9IGhpZGRlblwiPlxyXG4gICAgICAke2hpZGVJY29uID8gXCJcIiA6IChpY29uc1tzdHlsZV0gfHwgXCJcIil9XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJjb250ZW50XCI+PC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICBgKTtcclxuXHJcbiAgdG9hc3RFbG0ucXVlcnlTZWxlY3RvcihcIi5jb250ZW50XCIpLmlubmVySFRNTCA9IGNvbnRlbnQ7XHJcblxyXG4gIGxldCBjbG9zZWQgPSBmYWxzZTtcclxuICBmdW5jdGlvbiBjbG9zZSgpIHtcclxuICAgIGlmIChjbG9zZWQpIHJldHVybjtcclxuICAgIGNsb3NlZCA9IHRydWU7XHJcblxyXG4gICAgdG9hc3RFbG0uY2xhc3NMaXN0LmFkZChcImNsb3NpbmdcIik7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdG9hc3RFbG0ucmVtb3ZlKCk7XHJcblxyXG4gICAgICB1dGlscy5pZkV4aXN0cyhcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuYWNvcmQtLXRvYXN0cy1jb250YWluZXJgKSxcclxuICAgICAgICAvKiogQHBhcmFtIHtIVE1MRGl2RWxlbWVudH0gZWxtICovKGVsbSkgPT4ge1xyXG4gICAgICAgICAgaWYgKCFlbG0uY2hpbGRFbGVtZW50Q291bnQpIGVsbS5yZW1vdmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICk7XHJcbiAgICB9LCAyNzUpO1xyXG4gIH1cclxuXHJcbiAgaWYgKHR5cGVvZiBvbkNsaWNrID09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgdG9hc3RFbG0uY2xhc3NMaXN0LmFkZChcImNsaWNrYWJsZVwiKTtcclxuICAgIHRvYXN0RWxtLm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgIG9uQ2xpY2soY2xvc2UpO1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh0b2FzdEVsbSk7XHJcbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcclxuICAgIHRvYXN0RWxtLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XHJcbiAgfSk7XHJcblxyXG4gIHNldFRpbWVvdXQoY2xvc2UsIHRpbWVvdXQpO1xyXG5cclxuICByZXR1cm4gKCkgPT4ge1xyXG4gICAgY2xvc2UoKTtcclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgc2hvdzogT2JqZWN0LmFzc2lnbihzaG93LCB7XHJcbiAgICBpbmZvOiAoaHRtbCwgb2JqID0ge30pID0+IHNob3coaHRtbCwgeyAuLi5vYmosIHN0eWxlOiBcImluZm9cIiB9KSxcclxuICAgIGVycm9yOiAoaHRtbCwgb2JqID0ge30pID0+IHNob3coaHRtbCwgeyAuLi5vYmosIHN0eWxlOiBcImVycm9yXCIgfSksXHJcbiAgICB3YXJuaW5nOiAoaHRtbCwgb2JqID0ge30pID0+IHNob3coaHRtbCwgeyAuLi5vYmosIHN0eWxlOiBcIndhcm5pbmdcIiB9KSxcclxuICAgIHN1Y2Nlc3M6IChodG1sLCBvYmogPSB7fSkgPT4gc2hvdyhodG1sLCB7IC4uLm9iaiwgc3R5bGU6IFwic3VjY2Vzc1wiIH0pXHJcbiAgfSlcclxufSIsICJpbXBvcnQgcGF0Y2hlciBmcm9tIFwiLi4vcGF0Y2hlci9pbmRleC5qc1wiO1xyXG5pbXBvcnQgc3R5bGVDU1NUZXh0IGZyb20gXCIuL3N0eWxlcy5zY3NzXCI7XHJcbnBhdGNoZXIuaW5qZWN0Q1NTKHN0eWxlQ1NTVGV4dCk7XHJcblxyXG5pbXBvcnQgdG9vbHRpcHMgZnJvbSBcIi4vdG9vbHRpcHMuanNcIjtcclxuaW1wb3J0IG5vdGlmaWNhdGlvbnMgZnJvbSBcIi4vbm90aWZpY2F0aW9ucy5qc1wiO1xyXG5pbXBvcnQgY29udGV4dE1lbnVzIGZyb20gXCIuL2NvbnRleHRNZW51cy5qc1wiO1xyXG5pbXBvcnQgY29tcG9uZW50cyBmcm9tIFwiLi9jb21wb25lbnRzLmpzXCI7XHJcbmltcG9ydCBtb2RhbHMgZnJvbSBcIi4vbW9kYWxzLmpzeFwiO1xyXG5pbXBvcnQgdG9hc3RzIGZyb20gXCIuL3RvYXN0cy5qc1wiO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICB0b29sdGlwcyxcclxuICBub3RpZmljYXRpb25zLFxyXG4gIGNvbnRleHRNZW51cyxcclxuICBjb21wb25lbnRzLFxyXG4gIG1vZGFscyxcclxuICB0b2FzdHNcclxufSIsICJpbXBvcnQgbW9kdWxlcyBmcm9tICcuL21vZHVsZXMnO1xyXG5pbXBvcnQgZGV2IGZyb20gJy4vZGV2JztcclxuaW1wb3J0IHV0aWxzIGZyb20gJy4vdXRpbHMnO1xyXG5pbXBvcnQgZXh0ZW5zaW9ucyBmcm9tICcuL2V4dGVuc2lvbnMnO1xyXG5pbXBvcnQgaTE4biBmcm9tICcuL2kxOG4nO1xyXG5pbXBvcnQgc3RvcmFnZSBmcm9tICcuL3N0b3JhZ2UnO1xyXG5pbXBvcnQgZXZlbnRzIGZyb20gJy4vZXZlbnRzJztcclxuaW1wb3J0IHBhdGNoZXIgZnJvbSAnLi9wYXRjaGVyJztcclxuaW1wb3J0IGludGVybmFsIGZyb20gJy4vaW50ZXJuYWwnO1xyXG5pbXBvcnQgd2Vic29ja2V0IGZyb20gJy4vd2Vic29ja2V0JztcclxuaW1wb3J0IHVpIGZyb20gJy4vdWkvaW5kZXguanMnO1xyXG5cclxudXRpbHMubG9nZ2VyLmRlYnVnKGBQUkVMT0FEX0tFWTogPFBSRUxPQURfS0VZPmApO1xyXG5cclxuZnVuY3Rpb24gZGV2RXJyb3IoYXBpKSB7XHJcbiAgcmV0dXJuIG5ldyBFcnJvcihgVGhlICR7YXBpfSBBUEkgY2FuIG9ubHkgYmUgYWNjZXNzZWQgd2hlbiBEZXYgbW9kZSBpcyBlbmFibGVkIWApO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgZXhwb3NlZEFQSToge1xyXG4gICAgZGV2LFxyXG4gICAgdXRpbHMsXHJcbiAgICBpMThuLFxyXG4gICAgZXZlbnRzLFxyXG4gICAgdWksXHJcbiAgICBnZXQgcGF0Y2hlcigpIHtcclxuICAgICAgaWYgKCFkZXYuZW5hYmxlZCkgdGhyb3cgZGV2RXJyb3IoXCJQYXRjaGVyXCIpO1xyXG4gICAgICByZXR1cm4gcGF0Y2hlcjtcclxuICAgIH0sXHJcbiAgICBnZXQgc3RvcmFnZSgpIHtcclxuICAgICAgaWYgKCFkZXYuZW5hYmxlZCkgdGhyb3cgZGV2RXJyb3IoXCJTdG9yYWdlXCIpO1xyXG4gICAgICByZXR1cm4gc3RvcmFnZTtcclxuICAgIH0sXHJcbiAgICBnZXQgbW9kdWxlcygpIHtcclxuICAgICAgaWYgKCFkZXYuZW5hYmxlZCkgdGhyb3cgZGV2RXJyb3IoXCJNb2R1bGVzXCIpO1xyXG4gICAgICByZXR1cm4gbW9kdWxlcztcclxuICAgIH0sXHJcbiAgICBnZXQgZXh0ZW5zaW9ucygpIHtcclxuICAgICAgaWYgKCFkZXYuZW5hYmxlZCkgdGhyb3cgZGV2RXJyb3IoXCJFeHRlbnNpb25zXCIpO1xyXG4gICAgICByZXR1cm4gZXh0ZW5zaW9ucztcclxuICAgIH0sXHJcbiAgICBnZXQgaW50ZXJuYWwoKSB7XHJcbiAgICAgIGlmICghZGV2LmVuYWJsZWQpIHRocm93IGRldkVycm9yKFwiSW50ZXJuYWxcIik7XHJcbiAgICAgIHJldHVybiBpbnRlcm5hbDtcclxuICAgIH0sXHJcbiAgICBnZXQgd2Vic29ja2V0KCkge1xyXG4gICAgICBpZiAoIWRldi5lbmFibGVkKSB0aHJvdyBkZXZFcnJvcihcIldlYnNvY2tldFwiKTtcclxuICAgICAgcmV0dXJuIHdlYnNvY2tldDtcclxuICAgIH1cclxuICB9LFxyXG4gIHVuZXhwb3NlZEFQSToge1xyXG4gICAgZGV2LFxyXG4gICAgbW9kdWxlcyxcclxuICAgIHV0aWxzLFxyXG4gICAgZXh0ZW5zaW9ucyxcclxuICAgIGkxOG4sXHJcbiAgICBzdG9yYWdlLFxyXG4gICAgZXZlbnRzLFxyXG4gICAgcGF0Y2hlcixcclxuICAgIGludGVybmFsLFxyXG4gICAgd2Vic29ja2V0LFxyXG4gICAgdWlcclxuICB9XHJcbn0iLCAiaW1wb3J0IG1vZHVsZXMgZnJvbSBcIi4uL2FwaS9tb2R1bGVzL2luZGV4LmpzXCI7XHJcbmltcG9ydCBtb2RhbHMgZnJvbSBcIi4uL2FwaS91aS9tb2RhbHMuanN4XCI7XHJcbmltcG9ydCBub3RpZmljYXRpb25zIGZyb20gXCIuLi9hcGkvdWkvbm90aWZpY2F0aW9ucy5qc1wiO1xyXG5pbXBvcnQgZXh0ZW5zaW9ucyBmcm9tIFwiLi4vYXBpL2V4dGVuc2lvbnMvaW5kZXguanNcIjtcclxuaW1wb3J0IHdlYnNvY2tldCBmcm9tIFwiLi4vYXBpL3dlYnNvY2tldC9pbmRleC5qc1wiO1xyXG5cclxud2Vic29ja2V0LnNldChcIkluc3RhbGxFeHRlbnNpb25cIiwgYXN5bmMgKHsgdXJsIH0gPSB7fSkgPT4ge1xyXG4gIGlmICghdXJsKSByZXR1cm47XHJcblxyXG4gIGF3YWl0IG1vZHVsZXMubmF0aXZlLndpbmRvdy5zZXRBbHdheXNPblRvcCgwLCB0cnVlKTtcclxuICBhd2FpdCBuZXcgUHJvbWlzZShyID0+IHNldFRpbWVvdXQociwgMjUwKSk7XHJcbiAgYXdhaXQgbW9kdWxlcy5uYXRpdmUud2luZG93LnNldEFsd2F5c09uVG9wKDAsIHRydWUpO1xyXG5cclxuICBjb25zdCBzdWNjZXNzID0gYXdhaXQgbW9kYWxzLnNob3cuY29uZmlybWF0aW9uKFxyXG4gICAgYWNvcmQuaTE4bi5mb3JtYXQoXCJJTVBPUlRfRVhURU5TSU9OXCIpLFxyXG4gICAgYWNvcmQuaTE4bi5mb3JtYXQoXCJJTVBPUlRfRVhURU5TSU9OX0RFU0NSSVBUSU9OXCIsIHVybClcclxuICApO1xyXG5cclxuICBpZiAoIXN1Y2Nlc3MpIHJldHVybjtcclxuXHJcbiAgdHJ5IHtcclxuICAgIGF3YWl0IGV4dGVuc2lvbnMubG9hZCh1cmwpO1xyXG4gIH0gY2F0Y2ggKGVycikge1xyXG4gICAgbm90aWZpY2F0aW9ucy5zaG93LmVycm9yKGAke2Vycn1gLCB7IHRpbWVvdXQ6IDMwMDAwIH0pO1xyXG4gIH1cclxufSk7IiwgImltcG9ydCB7IHdhaXRVbnRpbENvbm5lY3Rpb25PcGVuIH0gZnJvbSBcIi4vb3RoZXIvdXRpbHMuanNcIjtcclxuaW1wb3J0IGxvYWRpbmdBbmltYXRpb24gZnJvbSBcIi4vb3RoZXIvbG9hZGluZy1hbmltYXRpb25cIjtcclxuaW1wb3J0IGFwaSBmcm9tIFwiLi9hcGlcIjtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3csIFwiYWNvcmRcIiwge1xyXG4gIGdldCgpIHtcclxuICAgIHJldHVybiBhcGkuZXhwb3NlZEFQSTtcclxuICB9XHJcbn0pO1xyXG53aW5kb3cuZ2xvYmFsID0gd2luZG93O1xyXG5cclxuKGFzeW5jICgpID0+IHtcclxuICBsb2FkaW5nQW5pbWF0aW9uLnNob3coKTtcclxuICBhd2FpdCB3YWl0VW50aWxDb25uZWN0aW9uT3BlbigpO1xyXG4gIGxvYWRpbmdBbmltYXRpb24uaGlkZSgpO1xyXG59KSgpO1xyXG5cclxuLy8gZXh0cmFzXHJcbmltcG9ydCBcIi4vb3RoZXIvd2Vic29ja2V0LXRyaWdnZXJzLmpzXCI7Il0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFDQSxXQUFP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WUFDQTtBQUFBLFVBQ0Y7QUFBQSxVQUNBLE9BQVM7QUFBQSxRQUNYO0FBQUEsUUFDQSxLQUFPO0FBQUEsVUFDTCxRQUFVO0FBQUEsWUFDUjtBQUFBLFlBQ0E7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLG1CQUFxQjtBQUFBLFFBQ25CLElBQU07QUFBQSxRQUNOLFFBQVU7QUFBQSxVQUNSLFFBQVU7QUFBQSxVQUNWLElBQU07QUFBQSxVQUNOLElBQU07QUFBQSxZQUNKO0FBQUEsY0FDRTtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLFFBQ0EsTUFBUTtBQUFBLFVBQ04sUUFBVTtBQUFBLFlBQ1I7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLE1BQVE7QUFBQSxRQUNOLElBQU07QUFBQSxRQUNOLFFBQVU7QUFBQSxRQUNWLE1BQVE7QUFBQSxVQUNOLFFBQVU7QUFBQSxZQUNSO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsTUFDQSxTQUFXO0FBQUEsUUFDVCxJQUFNO0FBQUEsUUFDTixRQUFVO0FBQUEsVUFDUixRQUFVO0FBQUEsVUFDVixJQUFNO0FBQUEsVUFDTixJQUFNO0FBQUEsWUFDSjtBQUFBLGNBQ0U7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxRQUNBLE1BQVE7QUFBQSxVQUNOLFFBQVU7QUFBQSxZQUNSO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsTUFDQSxVQUFZO0FBQUEsUUFDVixJQUFNO0FBQUEsUUFDTixRQUFVO0FBQUEsUUFDVixNQUFRO0FBQUEsVUFDTixPQUFTO0FBQUEsWUFDUDtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElB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LFVBQ0E7QUFBQSxVQUNBO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxzQkFBd0I7QUFBQSxNQUN0QixJQUFNO0FBQUEsTUFDTixRQUFVO0FBQUEsUUFDUixRQUFVO0FBQUEsUUFDVixJQUFNO0FBQUEsUUFDTixJQUFNO0FBQUEsVUFDSjtBQUFBLFlBQ0U7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLE1BQ0EsTUFBUTtBQUFBLFFBQ04sT0FBUztBQUFBLFVBQ1A7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLGNBQWdCO0FBQUEsTUFDZCxJQUFNO0FBQUEsTUFDTixRQUFVO0FBQUEsUUFDUixRQUFVO0FBQUEsUUFDVixJQUFNO0FBQUEsUUFDTixJQUFNO0FBQUEsVUFDSjtBQUFBLFlBQ0U7QUFBQSxZQUNBO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsTUFDQSxNQUFRO0FBQUEsUUFDTixPQUFTO0FBQUEsVUFDUDtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsbUJBQXFCO0FBQUEsTUFDbkIsSUFBTTtBQUFBLE1BQ04sUUFBVTtBQUFBLFFBQ1IsUUFBVTtBQUFBLFFBQ1YsSUFBTTtBQUFBLFFBQ04sSUFBTTtBQUFBLFVBQ0o7QUFBQSxZQUNFO0FBQUEsWUFDQTtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLE1BQ0EsTUFBUTtBQUFBLFFBQ04sT0FBUztBQUFBLFVBQ1A7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLDJCQUE2QjtBQUFBLE1BQzNCLElBQU07QUFBQSxNQUNOLFFBQVU7QUFBQSxRQUNSLFFBQVU7QUFBQSxRQUNWLElBQU07QUFBQSxRQUNO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SyxPQUFPLGtCQUFrQjtBQUFBLElBQ3BDLE1BQU0sS0FBSyxPQUFPLGdDQUFnQyxHQUFHO0FBQUEsRUFDdkQ7QUFFQSxNQUFJLENBQUM7QUFBUztBQUVkLE1BQUk7QUFDRixVQUFNLG1CQUFXLEtBQUssR0FBRztBQUFBLEVBQzNCLFNBQVMsS0FBUDtBQUNBLDBCQUFjLEtBQUssTUFBTSxHQUFHLE9BQU8sRUFBRSxTQUFTLElBQU0sQ0FBQztBQUFBLEVBQ3ZEO0FBQ0YsQ0FBQzs7O0FDckJELE9BQU8sZUFBZSxRQUFRLFNBQVM7QUFBQSxFQUNyQyxNQUFNO0FBQ0osV0FBTyxZQUFJO0FBQUEsRUFDYjtBQUNGLENBQUM7QUFDRCxPQUFPLFNBQVM7QUFBQSxDQUVmLFlBQVk7QUFDWCw0QkFBaUIsS0FBSztBQUN0QixRQUFNLHdCQUF3QjtBQUM5Qiw0QkFBaUIsS0FBSztBQUN4QixHQUFHOyIsCiAgIm5hbWVzIjogWyJldmVudCIsICJtYWtlIiwgInRhcmdldCIsICJ0cmVlIiwgInNlYXJjaEZpbHRlciIsICJ3YWxrYWJsZSIsICJpZ25vcmUiLCAiZm91bmQiLCAiY29tcG9uZW50cyIsICJfIiwgImNoZWNrIiwgIm1vZHVsZXMiLCAibW9kdWxlIiwgInJlcXVpcmUiLCAiZm91bmQiLCAiZmluZGVyIiwgImZvdW5kIiwgInJlcSIsICJmaW5kZXIiLCAiY29tbW9uX2RlZmF1bHQiLCAiY29tbW9uX2RlZmF1bHQiLCAiXyIsICJfIiwgIm5vU3RvcmUiLCAiXyIsICJ2YWwiLCAiZXJyb3IiLCAib3V0IiwgImNoZWNrIiwgIl8iLCAiQkFTRV9VUkwiLCAibmVzdHMiLCAib3V0IiwgIl8iLCAic291cmNlIiwgImFwaSIsICJjb21tb25fZGVmYXVsdCIsICJzZXQiLCAic2hvdyIsICJjb21tb25fZGVmYXVsdCIsICJvdXQiLCAiXyIsICJSZWFjdCIsICJjb21tb25fZGVmYXVsdCIsICJjb21tb25fZGVmYXVsdCIsICJSZWFjdCIsICJjb21tb25fZGVmYXVsdCIsICJpbnRlcmFjdGVkIiwgImdldENvbnRhaW5lciIsICJzaG93IiwgImFwaSJdCn0K
