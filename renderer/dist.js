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
var defaultBefore = [
  "exports.Z",
  "exports.ZP",
  "exports.default",
  "exports"
];
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
        before: defaultBefore
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
        before: defaultBefore
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
        before: defaultBefore
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
  /**
   * 
   * @param {string} selector 
   * @param {(element: HTMLDivElement)=>(()=>void)} cb 
   * @returns {()=>void}
   */
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
var BASE_URL = "https://raw.githubusercontent.com/acord-standalone/assets/main/i18n";
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
    acord.i18n.format("IMPORT_EXTENSION_MODAL_TITLE"),
    acord.i18n.format("IMPORT_EXTENSION_MODAL_DESCRIPTION", url)
  );
  if (!success)
    return;
  try {
    await extensions_default.load(url);
  } catch (err) {
    notifications_default.show.error(`${err}`, { timeout: 3e4 });
  }
});

// src/ui/home.js
dom_default.patch('a[href="/store"][data-list-item-id$="___nitro"]', (elm) => {
  utils_default.ifExists(
    elm.querySelector('[class*="nameAndDecorators-"] [class*="name-"]'),
    (nameElm) => {
      nameElm.textContent = "Acord";
    }
  );
  utils_default.ifExists(
    elm.querySelector('[class*="avatarWithText-"] [class*="avatar-"] svg'),
    fillSVGElmWithAcordLogo
  );
});
dom_default.patch('[class*="applicationStore-"] [class*="homeWrapperNormal-"]', (elm) => {
  utils_default.ifExists(
    elm.querySelector('[class*="headerBar-"] [class*="titleWrapper-"] [class*="title-"]'),
    (titleElm) => {
      titleElm.textContent = "Acord";
    }
  );
  utils_default.ifExists(
    elm.querySelector('[class*="headerBar-"] [class*="iconWrapper-"] [class*="icon-"]'),
    fillSVGElmWithAcordLogo
  );
});
function fillSVGElmWithAcordLogo(svgElm) {
  svgElm.setAttribute("viewBox", "0 0 813.5 1493");
  svgElm.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svgElm.innerHTML = `
    <defs>
      <style>
        .acord--logo-color {
          fill: currentColor;
          fill-rule: evenodd;
        }
      </style>
    </defs>
    <g>
      <path class="acord--logo-color" d="M817.266,1322.5h285v365h-285v-365Z" transform="translate(-553.25 -213.5)"/>
      <path class="acord--logo-color" d="M555.235,1523.78s91.169-319.85,92.531-319.28c114.7,47.83,160,192,160,192l-52.12,186.61s-31.129,137.71-80.88,120.39C528.026,1652.42,555.235,1523.78,555.235,1523.78Z" transform="translate(-553.25 -213.5)"/>
      <path class="acord--logo-color" d="M1364.77,1525.28s-91.17-319.85-92.54-319.28c-114.7,47.83-160,192-160,192l52.12,186.61s31.13,137.71,80.88,120.39C1391.97,1653.92,1364.77,1525.28,1364.77,1525.28Z" transform="translate(-553.25 -213.5)"/>
    </g>
    <path class="acord--logo-color" d="M874.766,275.5s14.579-61.918,87-62c80.824-.092,87,62,87,62s199.43,851.47,198,852c-210.33,77.71-146,180-146,180h-281s63.7-103.82-146-181C671.014,1125.49,874.766,275.5,874.766,275.5Z" transform="translate(-553.25 -213.5)"/>
    <g>
      <path class="acord--logo-color" d="M1238.14,897.5a53.882,53.882,0,0,1,53.88,53.875c0,24.939-20.25,46.987-43.25,53.125-4.45,1.18-10.19-39-11-39-0.58,0-27.71,3.51-31,4-5.58.828-11.93-13.876-4-20,1.93-1.491,26.62-6.959,29-7,0.62-.011-7.34-41.618-7-43C1225.64,895.944,1233.52,897.5,1238.14,897.5Z" transform="translate(-553.25 -213.5)"/>
      <path class="acord--logo-color" d="M1173.64,632.5a53.882,53.882,0,0,1,53.88,53.875c0,24.939-20.25,46.987-43.25,53.125-4.45,1.185-10.19-39-11-39-0.58,0-27.71,3.51-31,4-5.58.828-11.93-13.876-4-20,1.93-1.491,26.62-6.959,29-7,0.62-.011-7.34-41.618-7-43C1161.14,630.944,1169.02,632.5,1173.64,632.5Z" transform="translate(-553.25 -213.5)"/>
      <path class="acord--logo-color" d="M1115.16,373a53.874,53.874,0,0,1,53.87,53.875c0,24.939-20.24,46.987-43.25,53.125-4.44,1.185-10.18-39-11-39-0.58,0-27.7,3.51-31,4-5.57.828-11.92-13.876-4-20,1.93-1.491,26.62-6.959,29-7,0.62-.011-7.34-41.618-7-43C1102.65,371.444,1110.53,373,1115.16,373Z" transform="translate(-553.25 -213.5)"/>
    </g>
    <g>
      <path class="acord--logo-color" d="M683.922,897.75a53.875,53.875,0,0,0-53.875,53.875c0,24.939,20.245,46.987,43.25,53.125,4.441,1.18,10.185-39,11-39,0.576,0,27.7,3.51,31,4,5.572,0.828,11.926-13.876,4-20-1.93-1.491-26.621-6.959-29-7-0.62-.011,7.339-41.618,7-43C696.424,896.194,688.544,897.75,683.922,897.75Z" transform="translate(-553.25 -213.5)"/>
      <path class="acord--logo-color" d="M748.422,632.75a53.875,53.875,0,0,0-53.875,53.875c0,24.939,20.245,46.987,43.25,53.125,4.441,1.185,10.185-39,11-39,0.576,0,27.7,3.51,31,4,5.572,0.828,11.926-13.876,4-20-1.93-1.491-26.621-6.959-29-7-0.62-.011,7.339-41.618,7-43C760.924,631.194,753.044,632.75,748.422,632.75Z" transform="translate(-553.25 -213.5)"/>
      <path class="acord--logo-color" d="M806.906,373.25a53.875,53.875,0,0,0-53.875,53.875c0,24.939,20.245,46.987,43.25,53.125,4.442,1.185,10.185-39,11-39,0.577,0,27.7,3.51,31,4,5.572,0.828,11.926-13.876,4-20-1.93-1.491-26.621-6.959-29-7-0.62-.011,7.339-41.618,7-43C819.409,371.694,811.528,373.25,806.906,373.25Z" transform="translate(-553.25 -213.5)"/>
    </g>
  `;
}

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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibm9kZV9tb2R1bGVzL25lc3RzL2Nqcy9FdmVudHMuanMiLCAibm9kZV9tb2R1bGVzL25lc3RzL2Nqcy9FdmVudEVtaXR0ZXIuanMiLCAibm9kZV9tb2R1bGVzL25lc3RzL2Nqcy9tYWtlLmpzIiwgIm5vZGVfbW9kdWxlcy9uZXN0cy9janMvaW5kZXguanMiLCAic3JjL2RhdGEvY29tbW9uLmpzb24iLCAic3JjL2FwaS91dGlscy9yYXcvZmluZC1pbi10cmVlLmpzIiwgInNyYy9hcGkvdXRpbHMvbG9nZ2VyLmpzIiwgInNyYy9hcGkvdXRpbHMvcmVhY3QuanMiLCAic3JjL2FwaS91dGlscy9pbmRleC5qcyIsICJzcmMvYXBpL21vZHVsZXMvcmF3L2NvbXBsZXgtZmluZGVyLmpzIiwgInNyYy9hcGkvbW9kdWxlcy93ZWJwYWNrLmpzIiwgInNyYy9hcGkvbW9kdWxlcy9jb21tb24uanMiLCAic3JjL2FwaS9tb2R1bGVzL2luZGV4LmpzIiwgInNyYy9vdGhlci91dGlscy5qcyIsICJzcmMvbGliL0Jhc2ljRXZlbnRFbWl0dGVyLmpzIiwgInNyYy9hcGkvZXZlbnRzL2luZGV4LmpzIiwgInNyYy9hcGkvZG9tL2luZGV4LmpzIiwgInNyYy9saWIvc3BpdHJvYXN0L2Rpc3QvZXNtL3NoYXJlZC5qcyIsICJzcmMvbGliL3NwaXRyb2FzdC9kaXN0L2VzbS9ob29rLmpzIiwgInNyYy9saWIvc3BpdHJvYXN0L2Rpc3QvZXNtL3VuLXBhdGNoLmpzIiwgInNyYy9saWIvc3BpdHJvYXN0L2Rpc3QvZXNtL2dldC1wYXRjaC1mdW5jLmpzIiwgInNyYy9saWIvc3BpdHJvYXN0L2Rpc3QvZXNtL2luZGV4LmpzIiwgInNyYy9hcGkvcGF0Y2hlci9pbmRleC5qcyIsICJzcmMvb3RoZXIvbG9hZGluZy1hbmltYXRpb24vc3R5bGUuc2NzcyIsICJzcmMvb3RoZXIvbG9hZGluZy1hbmltYXRpb24vaW5kZXguanMiLCAic3JjL2FwaS9kZXYvaW5kZXguanMiLCAic3JjL2FwaS9pMThuL2luZGV4LmpzIiwgInNyYy9hcGkvc3RvcmFnZS9pbmRleC5qcyIsICJub2RlX21vZHVsZXMvaWRiLWtleXZhbC9kaXN0L2luZGV4LmpzIiwgInNyYy9saWIvanNvbi1kZWN5Y2xlZC9pbmRleC5qcyIsICJzcmMvYXBpL2V4dGVuc2lvbnMvaTE4bi5qcyIsICJzcmMvYXBpL2V4dGVuc2lvbnMvaW5kZXguanMiLCAic3JjL2FwaS9pbnRlcm5hbC9pbmRleC5qcyIsICJzcmMvYXBpL3dlYnNvY2tldC9pbmRleC5qcyIsICJzcmMvYXBpL3VpL3N0eWxlcy5zY3NzIiwgInNyYy9hcGkvdWkvdG9vbHRpcHMuanMiLCAic3JjL2FwaS91aS9ub3RpZmljYXRpb25zLmpzIiwgInNyYy9hcGkvdWkvY29udGV4dE1lbnVzLmpzIiwgInNyYy9saWIvY29tcG9uZW50cy9FcnJvckJvdW5kYXJ5LmpzeCIsICJzcmMvYXBpL3VpL2NvbXBvbmVudHMuanMiLCAic3JjL2FwaS91aS9tb2RhbHMuanN4IiwgInNyYy9hcGkvdWkvdG9hc3RzLmpzIiwgInNyYy9hcGkvdWkvaW5kZXguanMiLCAic3JjL2FwaS9pbmRleC5qcyIsICJzcmMvb3RoZXIvd2Vic29ja2V0LXRyaWdnZXJzLmpzIiwgInNyYy91aS9ob21lLmpzIiwgInNyYy9pbmRleC5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5kZWZhdWx0ID0gT2JqZWN0LmZyZWV6ZSh7XHJcbiAgICBHRVQ6IFwiR0VUXCIsXHJcbiAgICBTRVQ6IFwiU0VUXCIsXHJcbiAgICBERUxFVEU6IFwiREVMRVRFXCIsXHJcbiAgICBVUERBVEU6IFwiVVBEQVRFXCIsXHJcbn0pO1xyXG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgRXZlbnRzXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vRXZlbnRzXCIpKTtcclxuY2xhc3MgRXZlbnRFbWl0dGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMubGlzdGVuZXJzID0gT2JqZWN0LnZhbHVlcyhFdmVudHNfMS5kZWZhdWx0KS5yZWR1Y2UoKGFjYywgdmFsKSA9PiAoKGFjY1t2YWxdID0gbmV3IFNldCgpKSwgYWNjKSwge30pO1xyXG4gICAgICAgIHRoaXMub24gPSBmdW5jdGlvbiAoZXZlbnQsIGxpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxpc3RlbmVyc1tldmVudF0uaGFzKGxpc3RlbmVyKSkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoYFRoaXMgbGlzdGVuZXIgb24gJHtldmVudH0gYWxyZWFkeSBleGlzdHMuYCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5saXN0ZW5lcnNbZXZlbnRdLmFkZChsaXN0ZW5lcik7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLm9uY2UgPSBmdW5jdGlvbiAoZXZlbnQsIGxpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG9uY2VMaXN0ZW5lciA9IChldmVudCwgZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vZmYoZXZlbnQsIG9uY2VMaXN0ZW5lcik7XHJcbiAgICAgICAgICAgICAgICBsaXN0ZW5lcihldmVudCwgZGF0YSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMub24oZXZlbnQsIG9uY2VMaXN0ZW5lcik7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLm9mZiA9IGZ1bmN0aW9uIChldmVudCwgbGlzdGVuZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5saXN0ZW5lcnNbZXZlbnRdLmRlbGV0ZShsaXN0ZW5lcik7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmVtaXQgPSBmdW5jdGlvbiAoZXZlbnQsIGRhdGEpIHtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBsaXN0ZW5lciBvZiB0aGlzLmxpc3RlbmVyc1tldmVudF0pIHtcclxuICAgICAgICAgICAgICAgIGxpc3RlbmVyKGV2ZW50LCBkYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgZm9yIChjb25zdCBldmVudCBvZiBPYmplY3QudmFsdWVzKEV2ZW50c18xLmRlZmF1bHQpKSB7XHJcbiAgICAgICAgICAgIHRoaXNbZXZlbnQudG9Mb3dlckNhc2UoKV0gPSAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KGV2ZW50LCBkYXRhKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5kZWZhdWx0ID0gRXZlbnRFbWl0dGVyO1xyXG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgRXZlbnRFbWl0dGVyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vRXZlbnRFbWl0dGVyXCIpKTtcclxuZnVuY3Rpb24gbWFrZShcclxuLy8gVGhpcyBjYW4gYmUgc2FmZWx5IGlnbm9yZWQsIHRoZSBEYXRhIHdpbGwgYWx3YXlzIGJlIGFuIG9iamVjdCBvciBpdCB3b24ndCB3b3JrIGFueXdheS5cclxuLy8gQHRzLWlnbm9yZVxyXG5kYXRhID0ge30sIHsgbmVzdEFycmF5cyA9IHRydWUsIH0gPSB7fSkge1xyXG4gICAgY29uc3QgZW1pdHRlciA9IG5ldyBFdmVudEVtaXR0ZXJfMS5kZWZhdWx0KCk7XHJcbiAgICBmdW5jdGlvbiBjcmVhdGVQcm94eSh0YXJnZXQsIHJvb3QsIHBhdGgpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb3h5KHRhcmdldCwge1xyXG4gICAgICAgICAgICBnZXQodGFyZ2V0LCBwcm9wZXJ0eSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbmV3UGF0aCA9IFsuLi5wYXRoLCBwcm9wZXJ0eV07XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHRhcmdldFtwcm9wZXJ0eV07XHJcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVtaXR0ZXIuZ2V0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogbmV3UGF0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUsXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFuZXN0QXJyYXlzICYmIEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY3JlYXRlUHJveHkodmFsdWUsIHJvb3QsIG5ld1BhdGgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY3JlYXRlUHJveHkoKHRhcmdldFtwcm9wZXJ0eV0gPSB7fSksIHJvb3QsIG5ld1BhdGgpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQodGFyZ2V0LCBwcm9wZXJ0eSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHRhcmdldFtwcm9wZXJ0eV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIGVtaXR0ZXIuc2V0KHtcclxuICAgICAgICAgICAgICAgICAgICBwYXRoOiBbLi4ucGF0aCwgcHJvcGVydHldLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvLyBUaGlzIG5lZWRzIHRvIHJldHVybiB0cnVlIG9yIGl0IGVycm9ycy4gL3NocnVnXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGVsZXRlUHJvcGVydHkodGFyZ2V0LCBwcm9wZXJ0eSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRlbGV0ZSB0YXJnZXRbcHJvcGVydHldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZW1pdHRlci5kZWxldGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRoOiBbLi4ucGF0aCwgcHJvcGVydHldLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBoYXModGFyZ2V0LCBwcm9wZXJ0eSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0YXJnZXRbcHJvcGVydHldID09PSBcIm9iamVjdFwiICYmXHJcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmtleXModGFyZ2V0W3Byb3BlcnR5XSkubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb3BlcnR5IGluIHRhcmdldDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHsgc3RvcmU6IGNyZWF0ZVByb3h5KGRhdGEsIGRhdGEsIFtdKSwgXHJcbiAgICAgICAgLy8gVGhpcyBjYW4gYmUgc2FmZWx5IGlnbm9yZWQsIHRoZSBEYXRhIHdpbGwgYWx3YXlzIGJlIGFuIG9iamVjdCBvciBpdCB3b24ndCB3b3JrIGFueXdheS5cclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgZ2hvc3Q6IGRhdGEgfSwgZW1pdHRlcik7XHJcbn1cclxuZXhwb3J0cy5kZWZhdWx0ID0gbWFrZTtcclxuIiwgIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMubWFrZSA9IGV4cG9ydHMuRXZlbnRzID0gdm9pZCAwO1xyXG52YXIgRXZlbnRzXzEgPSByZXF1aXJlKFwiLi9FdmVudHNcIik7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkV2ZW50c1wiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gX19pbXBvcnREZWZhdWx0KEV2ZW50c18xKS5kZWZhdWx0OyB9IH0pO1xyXG52YXIgbWFrZV8xID0gcmVxdWlyZShcIi4vbWFrZVwiKTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwibWFrZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gX19pbXBvcnREZWZhdWx0KG1ha2VfMSkuZGVmYXVsdDsgfSB9KTtcclxuIiwgIntcclxuICBcImNvbW1vblwiOiB7XHJcbiAgICBcIm1vZGFsc1wiOiB7XHJcbiAgICAgIFwiY29tcG9uZW50c1wiOiB7XHJcbiAgICAgICAgXCJvdGhlclwiOiB7XHJcbiAgICAgICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICBcIkhlYWRlclwiLFxyXG4gICAgICAgICAgICAgICAgXCJGb290ZXJcIlxyXG4gICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIlJvb3RcIjoge1xyXG4gICAgICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICAgICAgXCJpblwiOiBcInN0cmluZ3NcIixcclxuICAgICAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgXCJFTlRFUklOR1wiXHJcbiAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIFwiYWN0aW9uc1wiOiB7XHJcbiAgICAgICAgXCJvcGVuXCI6IHtcclxuICAgICAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgICAgIFwiaW5cIjogXCJzdHJpbmdzXCIsXHJcbiAgICAgICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgIFwib25DbG9zZUNhbGxiYWNrXCIsXHJcbiAgICAgICAgICAgICAgICBcIkxheWVyXCJcclxuICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgICAgICBcImJlZm9yZVwiOiBbXHJcbiAgICAgICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgICAgIFwib3BlblwiXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBcIm1hcFwiOiB7XHJcbiAgICAgICAgICAgIFwib3BlblwiOiBbXHJcbiAgICAgICAgICAgICAgXCJvbkNsb3NlQ2FsbGJhY2tcIixcclxuICAgICAgICAgICAgICBcIkxheWVyXCJcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJjbG9zZVwiOiB7XHJcbiAgICAgICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgICAgICBcImluXCI6IFwic3RyaW5nc1wiLFxyXG4gICAgICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICBcIm9uQ2xvc2VDYWxsYmFjaygpXCJcclxuICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgICAgICBcImJlZm9yZVwiOiBbXHJcbiAgICAgICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgICAgIFwiY2xvc2VcIlxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgXCJtYXBcIjoge1xyXG4gICAgICAgICAgICBcImNsb3NlXCI6IFtcclxuICAgICAgICAgICAgICBcIm9uQ2xvc2VDYWxsYmFjaygpXCJcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiY29tcG9uZW50c1wiOiB7XHJcbiAgICAgIFwiQnV0dG9uXCI6IHtcclxuICAgICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICBcIkJvcmRlckNvbG9yc1wiXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgICBcImJlZm9yZVwiOiBbXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgICAgXSxcclxuICAgICAgICAgIFwiYWZ0ZXJcIjogXCJCdXR0b25cIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJtYXBcIjoge1xyXG4gICAgICAgICAgXCJCdXR0b25cIjogW1xyXG4gICAgICAgICAgICBcIi5GSUxMRURcIixcclxuICAgICAgICAgICAgXCIub25Nb3VzZUxlYXZlXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIFwiQ29uZmlybWF0aW9uTW9kYWxcIjoge1xyXG4gICAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICAgIFwiaW5cIjogXCJzdHJpbmdzXCIsXHJcbiAgICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgIFwiLmNvbmZpcm1CdXR0b25Db2xvclwiXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgICBcImJlZm9yZVwiOiBbXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgXCJUZXh0XCI6IHtcclxuICAgICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgICAgXCJmaWx0ZXJcIjogXCIkPy5TaXplcz8uU0laRV8zMiAmJiAkLkNvbG9yc1wiLFxyXG4gICAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgICBcImJlZm9yZVwiOiBbXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgXCJUb29sdGlwXCI6IHtcclxuICAgICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgICBcImluXCI6IFwicHJvdG90eXBlc1wiLFxyXG4gICAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICBcInJlbmRlclRvb2x0aXBcIlxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgICAgXCJiZWZvcmVcIjogW1xyXG4gICAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIFwiTWFya2Rvd25cIjoge1xyXG4gICAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgICBcImZpbHRlclwiOiBcIiQ/LnByb3RvdHlwZT8ucmVuZGVyICYmICQucnVsZXNcIixcclxuICAgICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiRmx1eERpc3BhdGNoZXJcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcIl9jdXJyZW50RGlzcGF0Y2hBY3Rpb25UeXBlXCIsXHJcbiAgICAgICAgICAgIFwiZGlzcGF0Y2hcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiUmVhY3RcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcImNyZWF0ZUVsZW1lbnRcIixcclxuICAgICAgICAgICAgXCJ1c2VTdGF0ZVwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJSZXN0XCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJnZXRcIixcclxuICAgICAgICAgICAgXCJwb3N0XCIsXHJcbiAgICAgICAgICAgIFwiZ2V0QVBJQmFzZVVSTFwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJGbHV4XCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJjb25uZWN0U3RvcmVzXCIsXHJcbiAgICAgICAgICAgIFwiZGVzdHJveVwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJXZWJTb2NrZXRcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IFwiJD8uX19wcm90b19fPy5oYW5kbGVDb25uZWN0aW9uXCIsXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJiZWZvcmVcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJBY3Rpdml0eUFjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcInNlbmRBY3Rpdml0eUludml0ZVwiLFxyXG4gICAgICAgICAgICBcInVwZGF0ZUFjdGl2aXR5XCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIlByaXZhdGVDaGFubmVsQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwib3BlblByaXZhdGVDaGFubmVsXCIsXHJcbiAgICAgICAgICAgIFwiZW5zdXJlUHJpdmF0ZUNoYW5uZWxcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiQWNrQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiaW5cIjogXCJzdHJpbmdzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwidHlwZTpcXFwiQlVMS19BQ0tcXFwiXCJcclxuICAgICAgICAgIF0sXHJcbiAgICAgICAgICBbXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiB0cnVlLFxyXG4gICAgICAgIFwiYmVmb3JlXCI6IFwiZXhwb3J0c1wiXHJcbiAgICAgIH0sXHJcbiAgICAgIFwibWFwXCI6IHtcclxuICAgICAgICBcImFja1wiOiBbXHJcbiAgICAgICAgICBcInR5cGU6XFxcIkNIQU5ORUxfQUNLXFxcIlwiLFxyXG4gICAgICAgICAgXCJtZXNzYWdlSWRcIixcclxuICAgICAgICAgIFwiY2hhbm5lbElkXCJcclxuICAgICAgICBdLFxyXG4gICAgICAgIFwiYnVsa0Fja1wiOiBbXHJcbiAgICAgICAgICBcInR5cGU6XFxcIkJVTEtfQUNLXFxcIlwiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJBbmFseXRpY3NBY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJpc1Rocm90dGxlZFwiLFxyXG4gICAgICAgICAgICBcInRyYWNrXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIkFuaW1hdGlvbkFjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJzcHJpbmdcIixcclxuICAgICAgICAgICAgXCJkZWNheVwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJDb25uZWN0aW9uQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwic2V0U2hvd0FjdGl2aXR5XCIsXHJcbiAgICAgICAgICAgIFwic2V0VmlzaWJpbGl0eVwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJSVENDb25uZWN0aW9uQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwiZ2V0Q2hhbm5lbElkXCIsXHJcbiAgICAgICAgICAgIFwiZ2V0R3VpbGRJZFwiLFxyXG4gICAgICAgICAgICBcImdldFJUQ0Nvbm5lY3Rpb25JZFwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJFbW9qaUFjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcInRyYW5zbGF0ZUlubGluZUVtb2ppVG9TdXJyb2dhdGVzXCIsXHJcbiAgICAgICAgICAgIFwidHJhbnNsYXRlU3Vycm9nYXRlc1RvSW5saW5lRW1vamlcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiRW1vamlTdGF0ZUFjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcImdldFVSTFwiLFxyXG4gICAgICAgICAgICBcImlzRW1vamlEaXNhYmxlZFwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJHdWlsZE5vdGlmaWNhdGlvbnNBY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJ1cGRhdGVDaGFubmVsT3ZlcnJpZGVTZXR0aW5nc1wiLFxyXG4gICAgICAgICAgICBcInVwZGF0ZUd1aWxkTm90aWZpY2F0aW9uU2V0dGluZ3NcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiSW50ZXJuYWxSZWFjdFwiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwianN4XCIsXHJcbiAgICAgICAgICAgIFwianN4c1wiLFxyXG4gICAgICAgICAgICBcIkZyYWdtZW50XCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIkxvZ2luQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwibG9naW5cIixcclxuICAgICAgICAgICAgXCJsb2dvdXRcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiUXVlcnlBY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJxdWVyeUVtb2ppUmVzdWx0c1wiLFxyXG4gICAgICAgICAgICBcInF1ZXJ5RnJpZW5kc1wiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJNZXNzYWdlQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwicmVjZWl2ZU1lc3NhZ2VcIixcclxuICAgICAgICAgICAgXCJzZW5kTWVzc2FnZVwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJQcmVtaXVtQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwiaXNQcmVtaXVtXCIsXHJcbiAgICAgICAgICAgIFwiY2FuVXNlRW1vamlzRXZlcnl3aGVyZVwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJWb2ljZUFjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcInNlbGVjdFZvaWNlQ2hhbm5lbFwiLFxyXG4gICAgICAgICAgICBcImRpc2Nvbm5lY3RcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiVHlwaW5nQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwic3RhcnRUeXBpbmdcIixcclxuICAgICAgICAgICAgXCJzdG9wVHlwaW5nXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIkd1aWxkQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwic2V0Q2hhbm5lbFwiLFxyXG4gICAgICAgICAgICBcInNldFNlcnZlck11dGVcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiSW52aXRlQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwiYWNjZXB0SW52aXRlXCIsXHJcbiAgICAgICAgICAgIFwiYWNjZXB0SW52aXRlQW5kVHJhbnNpdGlvblRvSW52aXRlQ2hhbm5lbFwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJNZWRpYUVuZ2luZUFjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcInRvZ2dsZVNlbGZEZWFmXCIsXHJcbiAgICAgICAgICAgIFwidG9nZ2xlU2VsZk11dGVcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiaTE4blwiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwiX3JlcXVlc3RlZExvY2FsZVwiLFxyXG4gICAgICAgICAgICBcImdldERlZmF1bHRMb2NhbGVcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwidXVpZFwiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwidjFcIixcclxuICAgICAgICAgICAgXCJ2NFwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJobGpzXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJoaWdobGlnaHRBbGxcIixcclxuICAgICAgICAgICAgXCJoaWdobGlnaHRcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufSIsICJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBmaW5kSW5UcmVlKFxyXG4gIHRyZWUsXHJcbiAgc2VhcmNoRmlsdGVyLFxyXG4gIHsgd2Fsa2FibGUgPSBudWxsLCBpZ25vcmUgPSBbXSwgbGltaXQgPSAxMDAgfSA9IHt9XHJcbikge1xyXG4gIGxldCBpdGVyYXRpb24gPSAwO1xyXG5cclxuICBmdW5jdGlvbiBkb1NlYXJjaCh0cmVlLCBzZWFyY2hGaWx0ZXIsIHsgd2Fsa2FibGUgPSBudWxsLCBpZ25vcmUgPSBbXSB9ID0ge30pIHtcclxuICAgIGl0ZXJhdGlvbiArPSAxO1xyXG4gICAgaWYgKGl0ZXJhdGlvbiA+IGxpbWl0KSByZXR1cm47XHJcblxyXG4gICAgaWYgKHR5cGVvZiBzZWFyY2hGaWx0ZXIgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgaWYgKHRyZWUuaGFzT3duUHJvcGVydHkoc2VhcmNoRmlsdGVyKSkgcmV0dXJuIHRyZWVbc2VhcmNoRmlsdGVyXTtcclxuICAgIH0gZWxzZSBpZiAoc2VhcmNoRmlsdGVyKHRyZWUpKSByZXR1cm4gdHJlZTtcclxuXHJcbiAgICBpZiAoIXRyZWUpIHJldHVybjtcclxuXHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh0cmVlKSkge1xyXG4gICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgdHJlZSkge1xyXG4gICAgICAgIGNvbnN0IGZvdW5kID0gZG9TZWFyY2goaXRlbSwgc2VhcmNoRmlsdGVyLCB7IHdhbGthYmxlLCBpZ25vcmUgfSk7XHJcbiAgICAgICAgaWYgKGZvdW5kKSByZXR1cm4gZm91bmQ7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHRyZWUgPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXModHJlZSkpIHtcclxuICAgICAgICBpZiAod2Fsa2FibGUgIT0gbnVsbCAmJiAhd2Fsa2FibGUuaW5jbHVkZXMoa2V5KSkgY29udGludWU7XHJcblxyXG4gICAgICAgIGlmIChpZ25vcmUuaW5jbHVkZXMoa2V5KSkgY29udGludWU7XHJcblxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICBjb25zdCBmb3VuZCA9IGRvU2VhcmNoKHRyZWVba2V5XSwgc2VhcmNoRmlsdGVyLCB7XHJcbiAgICAgICAgICAgIHdhbGthYmxlLFxyXG4gICAgICAgICAgICBpZ25vcmUsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGlmIChmb3VuZCkgcmV0dXJuIGZvdW5kO1xyXG4gICAgICAgIH0gY2F0Y2ggeyB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiBkb1NlYXJjaCh0cmVlLCBzZWFyY2hGaWx0ZXIsIHsgd2Fsa2FibGUsIGlnbm9yZSB9KTtcclxufTtcclxuIiwgImZ1bmN0aW9uIGJ1aWxkKHByZWZpeCA9IFwiQWNvcmRcIiwgdHlwZSwgY29sb3IpIHtcclxuICByZXR1cm4gKC4uLmlucHV0KSA9PiBjb25zb2xlW3R5cGVdKFxyXG4gICAgYCVjJHtwcmVmaXh9JWNgLFxyXG4gICAgYGJhY2tncm91bmQtY29sb3I6ICR7Y29sb3J9OyBjb2xvcjogd2hpdGU7IGJvcmRlci1yYWRpdXM6IDRweDsgcGFkZGluZzogMHB4IDZweCAwcHggNnB4OyBmb250LXdlaWdodDogYm9sZGAsXHJcbiAgICBcIlwiLFxyXG4gICAgLi4uaW5wdXRcclxuICApO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgbG9nOiBidWlsZChcIkFjb3JkXCIsIFwibG9nXCIsIFwiIzAwZmJiMFwiKSxcclxuICBkZWJ1ZzogYnVpbGQoXCJBY29yZCBEZWJ1Z1wiLCBcImRlYnVnXCIsIFwiIzAwZmJiMFwiKSxcclxuICBpbmZvOiBidWlsZChcIkFjb3JkIEluZm9cIiwgXCJsb2dcIiwgXCIjODJhYWZmXCIpLFxyXG4gIHdhcm46IGJ1aWxkKFwiQWNvcmQgV2FyblwiLCBcIndhcm5cIiwgXCIjZGViZjE4XCIpLFxyXG4gIGVycm9yOiBidWlsZChcIkFjb3JkIEVycm9yXCIsIFwiZXJyb3JcIiwgXCIjZWY1ODU4XCIpLFxyXG4gIGJ1aWxkXHJcbn0iLCAiaW1wb3J0IGZpbmRJblRyZWUgZnJvbSBcIi4vcmF3L2ZpbmQtaW4tdHJlZS5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGdldEluc3RhbmNlKG5vZGUpIHtcclxuICAgIHJldHVybiBPYmplY3QuZW50cmllcyhub2RlKS5maW5kKGkgPT4gaVswXS5zdGFydHNXaXRoKFwiX19yZWFjdEludGVybmFsSW5zdGFuY2VcIikgfHwgaVswXS5zdGFydHNXaXRoKFwiX19yZWFjdEZpYmVyXCIpKT8uWzFdO1xyXG4gIH0sXHJcbiAgZ2V0T3duZXJJbnN0YW5jZShub2RlKSB7XHJcbiAgICBsZXQgaW5zdGFuY2UgPSB0aGlzLmdldEluc3RhbmNlKG5vZGUpO1xyXG4gICAgZm9yIChsZXQgZWwgPSBpbnN0YW5jZTsgZWw7IGVsID0gZWwucmV0dXJuKVxyXG4gICAgICBpZiAoZWwuc3RhdGVOb2RlPy5mb3JjZVVwZGF0ZSkgcmV0dXJuIGVsLnN0YXRlTm9kZTtcclxuICB9LFxyXG4gIGZpbmRJblRyZWUodHJlZSwgZmlsdGVyKSB7XHJcbiAgICByZXR1cm4gZmluZEluVHJlZSh0cmVlLCBmaWx0ZXIsIHtcclxuICAgICAgd2Fsa2FibGU6IFtcInByb3BzXCIsIFwic3RhdGVcIiwgXCJjaGlsZHJlblwiLCBcInJldHVyblwiXVxyXG4gICAgfSk7XHJcbiAgfSxcclxuICBnZXRDb21wb25lbnRzKG5vZGUpIHtcclxuICAgIGNvbnN0IGluc3RhbmNlID0gdGhpcy5nZXRJbnN0YW5jZShub2RlKTtcclxuICAgIGNvbnN0IGNvbXBvbmVudHMgPSBbXTtcclxuICAgIGxldCBsYXN0SW5zdGFuY2UgPSBpbnN0YW5jZTtcclxuICAgIHdoaWxlIChsYXN0SW5zdGFuY2UgJiYgbGFzdEluc3RhbmNlLnJldHVybikge1xyXG4gICAgICBpZiAodHlwZW9mIGxhc3RJbnN0YW5jZS5yZXR1cm4udHlwZSA9PT0gXCJzdHJpbmdcIikgYnJlYWs7XHJcbiAgICAgIGlmIChsYXN0SW5zdGFuY2UucmV0dXJuLnR5cGUpIGNvbXBvbmVudHMucHVzaChsYXN0SW5zdGFuY2UucmV0dXJuLnR5cGUpO1xyXG4gICAgICBsYXN0SW5zdGFuY2UgPSBsYXN0SW5zdGFuY2UucmV0dXJuO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNvbXBvbmVudHM7XHJcbiAgfSxcclxuICBnZXRTdGF0ZU5vZGVzKG5vZGUpIHtcclxuICAgIGNvbnN0IGluc3RhbmNlID0gdGhpcy5nZXRJbnN0YW5jZShub2RlKTtcclxuICAgIGNvbnN0IHN0YXRlTm9kZXMgPSBbXTtcclxuICAgIGxldCBsYXN0SW5zdGFuY2UgPSBpbnN0YW5jZTtcclxuICAgIHdoaWxlIChsYXN0SW5zdGFuY2UgJiYgbGFzdEluc3RhbmNlLnJldHVybikge1xyXG4gICAgICBpZiAobGFzdEluc3RhbmNlLnJldHVybi5zdGF0ZU5vZGUgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkgYnJlYWs7XHJcbiAgICAgIGlmIChsYXN0SW5zdGFuY2UucmV0dXJuLnN0YXRlTm9kZSlcclxuICAgICAgICBzdGF0ZU5vZGVzLnB1c2gobGFzdEluc3RhbmNlLnJldHVybi5zdGF0ZU5vZGUpO1xyXG4gICAgICBsYXN0SW5zdGFuY2UgPSBsYXN0SW5zdGFuY2UucmV0dXJuO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN0YXRlTm9kZXM7XHJcbiAgfSxcclxuICBnZXRQcm9wcyhlbCwgZmlsdGVyID0gKGkpID0+IGksIG1heCA9IDEwMDAwKSB7XHJcbiAgICBjb25zdCBpbnN0YW5jZSA9IHRoaXMuZ2V0SW5zdGFuY2UoZWwpO1xyXG5cclxuICAgIGlmICghaW5zdGFuY2U/LnJldHVybikgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgZm9yIChcclxuICAgICAgbGV0IGN1cnJlbnQgPSBpbnN0YW5jZT8ucmV0dXJuLCBpID0gMDtcclxuICAgICAgaSA+IG1heCB8fCBjdXJyZW50ICE9PSBudWxsO1xyXG4gICAgICBjdXJyZW50ID0gY3VycmVudD8ucmV0dXJuLCBpKytcclxuICAgICkge1xyXG4gICAgICBpZiAoY3VycmVudD8ucGVuZGluZ1Byb3BzICYmIGZpbHRlcihjdXJyZW50LnBlbmRpbmdQcm9wcykpXHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnQucGVuZGluZ1Byb3BzO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH0sXHJcbn0iLCAiaW1wb3J0IGZpbmRJblRyZWUgZnJvbSBcIi4vcmF3L2ZpbmQtaW4tdHJlZS5qc1wiO1xyXG5pbXBvcnQgbG9nZ2VyIGZyb20gXCIuL2xvZ2dlci5qc1wiO1xyXG5pbXBvcnQgcmVhY3QgZnJvbSBcIi4vcmVhY3QuanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBsb2dnZXIsXHJcbiAgcmVhY3QsXHJcbiAgZmluZEluVHJlZSxcclxuICBmb3JtYXQodmFsLCAuLi5hcmdzKSB7XHJcbiAgICByZXR1cm4gYCR7dmFsfWAucmVwbGFjZUFsbCgveyhcXGQrKX0vZywgKF8sIGNhcCkgPT4ge1xyXG4gICAgICByZXR1cm4gYXJnc1tOdW1iZXIoY2FwKV07XHJcbiAgICB9KTtcclxuICB9LFxyXG4gIGludGVydmFsKGNiLCBkdXIpIHtcclxuICAgIGxldCBpbnRlcnZhbCA9IHNldEludGVydmFsKGNiLCBkdXIpO1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgdGltZW91dChjYiwgZHVyKSB7XHJcbiAgICBsZXQgdGltZW91dCA9IHNldFRpbWVvdXQoY2IsIGR1cik7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgaWZFeGlzdHModmFsLCBjYikge1xyXG4gICAgaWYgKHZhbCkgY2IodmFsKTtcclxuICB9LFxyXG4gIGNvcHlUZXh0KHRleHQpIHtcclxuICAgIGlmICh3aW5kb3cuRGlzY29yZE5hdGl2ZSkge1xyXG4gICAgICBEaXNjb3JkTmF0aXZlLmNsaXBib2FyZC5jb3B5KHRleHQpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgbmF2aWdhdG9yLmNsaXBib2FyZC53cml0ZVRleHQodGV4dCkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICBjb25zdCBjb3B5QXJlYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZXh0YXJlYVwiKTtcclxuXHJcbiAgICAgIGNvcHlBcmVhLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xyXG4gICAgICBjb3B5QXJlYS5zdHlsZS5wb3NpdGlvbiA9IFwiZml4ZWRcIjtcclxuICAgICAgY29weUFyZWEuc3R5bGUudG9wID0gXCIwXCI7XHJcbiAgICAgIGNvcHlBcmVhLnN0eWxlLmxlZnQgPSBcIjBcIjtcclxuXHJcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY29weUFyZWEpO1xyXG4gICAgICBjb3B5QXJlYS5mb2N1cygpO1xyXG4gICAgICBjb3B5QXJlYS5zZWxlY3QoKTtcclxuXHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoXCJjb3B5XCIpO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoY29weUFyZWEpO1xyXG4gICAgfSk7XHJcbiAgfSxcclxufSIsICJpbXBvcnQgdXRpbHMgZnJvbSBcIi4uLy4uL3V0aWxzL2luZGV4LmpzXCI7XHJcbmltcG9ydCBsb2dnZXIgZnJvbSBcIi4uLy4uL3V0aWxzL2xvZ2dlci5qc1wiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHdyYXBGaWx0ZXIoZmlsdGVyKSB7XHJcbiAgcmV0dXJuICguLi5hcmdzKSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICBpZiAoYXJnc1swXT8uZG9jdW1lbnQgJiYgYXJnc1swXT8ud2luZG93KSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIGlmIChhcmdzWzBdPy5kZWZhdWx0Py5yZW1vdmUgJiYgYXJnc1swXT8uZGVmYXVsdD8uc2V0ICYmIGFyZ3NbMF0/LmRlZmF1bHQ/LmNsZWFyICYmIGFyZ3NbMF0/LmRlZmF1bHQ/LmdldCAmJiAhYXJnc1swXT8uZGVmYXVsdD8uc29ydCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICBpZiAoYXJnc1swXS5yZW1vdmUgJiYgYXJnc1swXS5zZXQgJiYgYXJnc1swXS5jbGVhciAmJiBhcmdzWzBdLmdldCAmJiAhYXJnc1swXS5zb3J0KSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIGlmIChhcmdzWzBdPy5kZWZhdWx0Py5nZXRUb2tlbiB8fCBhcmdzWzBdPy5kZWZhdWx0Py5nZXRFbWFpbCB8fCBhcmdzWzBdPy5kZWZhdWx0Py5zaG93VG9rZW4pIHJldHVybiBmYWxzZTtcclxuICAgICAgaWYgKGFyZ3NbMF0/LmdldFRva2VuIHx8IGFyZ3NbMF0/LmdldEVtYWlsIHx8IGFyZ3NbMF0/LnNob3dUb2tlbikgcmV0dXJuIGZhbHNlO1xyXG4gICAgICByZXR1cm4gZmlsdGVyKC4uLmFyZ3MpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycikge1xyXG4gICAgICBsb2dnZXIud2FybihcIk1vZHVsZSBmaWx0ZXIgdGhyZXcgYW4gZXhjZXB0aW9uLlwiLCBmaWx0ZXIsIGVycik7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBjaGVja01vZHVsZVN0cmluZ3MobSwgc3RyaW5ncywgaGFzTm90KSB7XHJcbiAgY29uc3QgY2hlY2sgPSAoczEsIHMyKSA9PiB7XHJcbiAgICByZXR1cm4gaGFzTm90ID8gczEudG9TdHJpbmcoKS5pbmRleE9mKHMyLnRvU3RyaW5nKCkpID09IC0xIDogczEudG9TdHJpbmcoKS5pbmRleE9mKHMyLnRvU3RyaW5nKCkpID4gLTE7XHJcbiAgfTtcclxuICByZXR1cm4gc3RyaW5ncy5ldmVyeShqID0+IHtcclxuICAgIHJldHVybiBjaGVjayhtPy50b1N0cmluZz8uKCkgfHwgXCJcIiwgailcclxuICAgICAgfHwgY2hlY2sobT8uX19vcmlnaW5hbF9fPy50b1N0cmluZz8uKCkgfHwgXCJcIiwgailcclxuICAgICAgfHwgY2hlY2sobT8udHlwZT8udG9TdHJpbmc/LigpIHx8IFwiXCIsIGopXHJcbiAgICAgIHx8IGNoZWNrKG0/LnR5cGU/Ll9fb3JpZ2luYWxfXz8udG9TdHJpbmc/LigpIHx8IFwiXCIsIGopXHJcbiAgICAgIHx8IE9iamVjdC5lbnRyaWVzKFsnZnVuY3Rpb24nLCAnb2JqZWN0J10uaW5jbHVkZXModHlwZW9mIG0/LnByb3RvdHlwZSkgPyB0eXBlb2YgbT8ucHJvdG90eXBlIDoge30pLmZpbHRlcihpID0+IGlbMF0/LmluY2x1ZGVzPy4oXCJyZW5kZXJcIikpLnNvbWUoaSA9PiBjaGVjayhpWzFdPy50b1N0cmluZz8uKCkgfHwgXCJcIiwgaikpXHJcbiAgfSk7XHJcbn07XHJcbmZ1bmN0aW9uIGNoZWNrTW9kdWxlUHJvcHMobSwgcHJvcGVydGllcywgaGFzTm90KSB7XHJcbiAgcmV0dXJuIHByb3BlcnRpZXMuZXZlcnkocHJvcCA9PiB7XHJcbiAgICBjb25zdCB2YWx1ZSA9IG1bcHJvcF0/Ll9fb3JpZ2luYWxfXyB8fCBtW3Byb3BdO1xyXG4gICAgcmV0dXJuIGhhc05vdCA/IHZhbHVlID09PSB1bmRlZmluZWQgOiAodmFsdWUgIT09IHVuZGVmaW5lZCAmJiAhKHR5cGVvZiB2YWx1ZSA9PSBcInN0cmluZ1wiICYmICF2YWx1ZSkpO1xyXG4gIH0pO1xyXG59O1xyXG5mdW5jdGlvbiBjaGVja01vZHVsZVByb3RvdHlwZXMobSwgcHJvdG9Qcm9wcywgaGFzTm90KSB7XHJcbiAgcmV0dXJuIG0ucHJvdG90eXBlICYmIHByb3RvUHJvcHMuZXZlcnkocHJvcCA9PiB7XHJcbiAgICBjb25zdCB2YWx1ZSA9IG0ucHJvdG90eXBlW3Byb3BdO1xyXG4gICAgcmV0dXJuIGhhc05vdCA/IHZhbHVlID09PSB1bmRlZmluZWQgOiAodmFsdWUgIT09IHVuZGVmaW5lZCAmJiAhKHR5cGVvZiB2YWx1ZSA9PSBcInN0cmluZ1wiICYmICF2YWx1ZSkpO1xyXG4gIH0pO1xyXG59O1xyXG5cclxuY29uc3Qgd2VicGFja0NodW5rTmFtZSA9IFwid2VicGFja0NodW5rZGlzY29yZF9hcHBcIjtcclxuY29uc3QgcHVzaExpc3RlbmVycyA9IG5ldyBTZXQoKTtcclxuXHJcblxyXG57XHJcbiAgbGV0IG9nUHVzaCA9IHdpbmRvd1t3ZWJwYWNrQ2h1bmtOYW1lXS5wdXNoO1xyXG5cclxuICBmdW5jdGlvbiBoYW5kbGVQdXNoKGNodW5rKSB7XHJcbiAgICBjb25zdCBbLCBtb2R1bGVzXSA9IGNodW5rO1xyXG5cclxuICAgIGZvciAoY29uc3QgbW9kdWxlSWQgaW4gT2JqZWN0LmtleXMobW9kdWxlcyB8fCB7fSkpIHtcclxuICAgICAgY29uc3Qgb2dNb2R1bGUgPSBtb2R1bGVzW21vZHVsZUlkXTtcclxuXHJcbiAgICAgIG1vZHVsZXNbbW9kdWxlSWRdID0gKG1vZHVsZSwgZXhwb3J0cywgcmVxdWlyZSkgPT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICBvZ01vZHVsZS5jYWxsKG51bGwsIG1vZHVsZSwgZXhwb3J0cywgcmVxdWlyZSk7XHJcblxyXG4gICAgICAgICAgcHVzaExpc3RlbmVycy5mb3JFYWNoKGxpc3RlbmVyID0+IHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICBsaXN0ZW5lcihleHBvcnRzKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICB1dGlscy5sb2dnZXIuZXJyb3IoXCJQdXNoIGxpc3RlbmVyIHRocmV3IGFuIGV4Y2VwdGlvbi5cIiwgbGlzdGVuZXIsIGVycm9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgdXRpbHMubG9nZ2VyLmVycm9yKFwiVW5hYmxlIHRvIHBhdGNoIHB1c2hlZCBtb2R1bGUuXCIsIGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcblxyXG4gICAgICBPYmplY3QuYXNzaWduKG1vZHVsZXNbbW9kdWxlSWRdLCBvZ01vZHVsZSwge1xyXG4gICAgICAgIF9fb3JpZ2luYWxfXzogb2dNb2R1bGUsXHJcbiAgICAgICAgdG9TdHJpbmc6ICgpID0+IG9nTW9kdWxlLnRvU3RyaW5nKCksXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBvZ1B1c2guY2FsbCh3aW5kb3dbd2VicGFja0NodW5rTmFtZV0sIGNodW5rKTtcclxuICB9XHJcblxyXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3dbd2VicGFja0NodW5rTmFtZV0sIFwicHVzaFwiLCB7XHJcbiAgICBjb25maWd1cmFibGU6IHRydWUsXHJcbiAgICBnZXQoKSB7IHJldHVybiBoYW5kbGVQdXNoOyB9LFxyXG4gICAgc2V0KHZhbHVlKSB7XHJcbiAgICAgIG9nUHVzaCA9IHZhbHVlO1xyXG5cclxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvd1t0aGlzLmNodW5rTmFtZV0sIFwicHVzaFwiLCB7XHJcbiAgICAgICAgdmFsdWU6IHRoaXMuaGFuZGxlUHVzaCxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXHJcbiAgICAgICAgd3JpdGFibGU6IHRydWVcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn1cclxuXHJcblxyXG5cclxuLyoqXHJcbiAqIFxyXG4gKiBAcGFyYW0ge2FueX0gZmlsdGVyIFxyXG4gKiBAcGFyYW0ge3sgc2lnbmFsOiBBYm9ydFNpZ25hbCwgc2VhcmNoRXhwb3J0czogYm9vbGVhbiB9fSBwYXJhbTEgXHJcbiAqIEByZXR1cm5zIFxyXG4gKi9cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGxhenlGaW5kKGZpbHRlciwgeyBzaWduYWwgPSBudWxsLCBzZWFyY2hFeHBvcnRzID0gZmFsc2UgfSkge1xyXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICBjb25zdCBjYW5jZWwgPSAoKSA9PiBwdXNoTGlzdGVuZXJzLmRlbGV0ZShsaXN0ZW5lcik7XHJcbiAgICBjb25zdCBsaXN0ZW5lciA9IChleHBvcnRzKSA9PiB7XHJcbiAgICAgIGlmICghZXhwb3J0cyB8fCBleHBvcnRzID09PSB3aW5kb3cgfHwgZXhwb3J0cyA9PT0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSByZXR1cm47XHJcblxyXG4gICAgICBsZXQgZm91bmQgPSBudWxsO1xyXG5cclxuICAgICAgaWYgKHR5cGVvZiBleHBvcnRzID09IFwib2JqZWN0XCIgJiYgc2VhcmNoRXhwb3J0cykge1xyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIGV4cG9ydHMpIHtcclxuICAgICAgICAgIGxldCBleHBvcnRlZCA9IGV4cG9ydHNba2V5XTtcclxuICAgICAgICAgIGlmICghZXhwb3J0ZWQpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgaWYgKGZpbHRlcihleHBvcnRlZCkpIHtcclxuICAgICAgICAgICAgZm91bmQgPSBleHBvcnRlZDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGxldCBwYXRocyA9IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIixcclxuICAgICAgICAgIFwiXCJcclxuICAgICAgICBdO1xyXG4gICAgICAgIGZvdW5kID0gcGF0aHMubWFwKGkgPT4ge1xyXG4gICAgICAgICAgbGV0IHBhdGhlZCA9ICFpID8gZXhwb3J0cyA6IF8uZ2V0KGV4cG9ydHMsIGkpO1xyXG4gICAgICAgICAgaWYgKHBhdGhlZCAmJiBmaWx0ZXIocGF0aGVkKSkgcmV0dXJuIHBhdGhlZDtcclxuICAgICAgICB9KS5maW5kKGkgPT4gaSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICghZm91bmQpIHJldHVybjtcclxuICAgICAgY2FuY2VsKCk7XHJcbiAgICAgIHJlc29sdmUoZm91bmQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1c2hMaXN0ZW5lcnMuYWRkKGxpc3RlbmVyKTtcclxuXHJcbiAgICBzaWduYWw/LmFkZEV2ZW50TGlzdGVuZXIoXCJhYm9ydFwiLCAoKSA9PiB7XHJcbiAgICAgIGNhbmNlbCgpO1xyXG4gICAgICByZXNvbHZlKG51bGwpO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBmaW5kKHJlcSwgZmlsdGVyLCBjb25maWcgPSB7fSkge1xyXG4gIGxldCBkZWZhdWx0RXhwb3J0ID0gdHlwZW9mIGNvbmZpZy5kZWZhdWx0RXhwb3J0ICE9IFwiYm9vbGVhblwiID8gZmFsc2UgOiBjb25maWcuZGVmYXVsdEV4cG9ydDtcclxuICBsZXQgdW5sb2FkZWQgPSB0eXBlb2YgY29uZmlnLnVubG9hZGVkICE9IFwiYm9vbGVhblwiID8gZmFsc2UgOiBjb25maWcudW5sb2FkZWQ7XHJcbiAgbGV0IGFsbCA9IHR5cGVvZiBjb25maWcuYWxsICE9IFwiYm9vbGVhblwiID8gZmFsc2UgOiBjb25maWcuYWxsO1xyXG4gIGNvbnN0IGZvdW5kID0gW107XHJcbiAgaWYgKCF1bmxvYWRlZCkgZm9yIChsZXQgaSBpbiByZXEuYykgaWYgKHJlcS5jLmhhc093blByb3BlcnR5KGkpKSB7XHJcbiAgICBsZXQgbSA9IHJlcS5jW2ldLmV4cG9ydHMsIHIgPSBudWxsO1xyXG4gICAgaWYgKG0gJiYgKHR5cGVvZiBtID09IFwib2JqZWN0XCIgfHwgdHlwZW9mIG0gPT0gXCJmdW5jdGlvblwiKSkge1xyXG4gICAgICBpZiAoISEociA9IGZpbHRlcihtLCBpKSkpIHtcclxuICAgICAgICBpZiAoYWxsKSBmb3VuZC5wdXNoKGRlZmF1bHRFeHBvcnQgPyByIDogcmVxLmNbaV0pO1xyXG4gICAgICAgIGVsc2UgcmV0dXJuIGRlZmF1bHRFeHBvcnQgPyByIDogcmVxLmNbaV07XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBmb3IgKGxldCBrZXkgb2YgT2JqZWN0LmtleXMobSkpIGlmIChrZXkubGVuZ3RoIDwgNCAmJiBtW2tleV0gJiYgISEociA9IGZpbHRlcihtW2tleV0sIGkpKSkge1xyXG4gICAgICAgIGlmIChhbGwpIGZvdW5kLnB1c2goZGVmYXVsdEV4cG9ydCA/IHIgOiByZXEuY1tpXSk7XHJcbiAgICAgICAgZWxzZSByZXR1cm4gZGVmYXVsdEV4cG9ydCA/IHIgOiByZXEuY1tpXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKG0gJiYgbS5fX2VzTW9kdWxlICYmIG0uZGVmYXVsdCAmJiAodHlwZW9mIG0uZGVmYXVsdCA9PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBtLmRlZmF1bHQgPT0gXCJmdW5jdGlvblwiKSkge1xyXG4gICAgICBpZiAoISEociA9IGZpbHRlcihtLmRlZmF1bHQsIGkpKSkge1xyXG4gICAgICAgIGlmIChhbGwpIGZvdW5kLnB1c2goZGVmYXVsdEV4cG9ydCA/IHIgOiByZXEuY1tpXSk7XHJcbiAgICAgICAgZWxzZSByZXR1cm4gZGVmYXVsdEV4cG9ydCA/IHIgOiByZXEuY1tpXTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIGlmIChtLmRlZmF1bHQudHlwZSAmJiAodHlwZW9mIG0uZGVmYXVsdC50eXBlID09IFwib2JqZWN0XCIgfHwgdHlwZW9mIG0uZGVmYXVsdC50eXBlID09IFwiZnVuY3Rpb25cIikgJiYgISEociA9IGZpbHRlcihtLmRlZmF1bHQudHlwZSwgaSkpKSB7XHJcbiAgICAgICAgaWYgKGFsbCkgZm91bmQucHVzaChkZWZhdWx0RXhwb3J0ID8gciA6IHJlcS5jW2ldKTtcclxuICAgICAgICBlbHNlIHJldHVybiBkZWZhdWx0RXhwb3J0ID8gciA6IHJlcS5jW2ldO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIGZvciAobGV0IGkgaW4gcmVxLm0pIGlmIChyZXEubS5oYXNPd25Qcm9wZXJ0eShpKSkge1xyXG4gICAgbGV0IG0gPSByZXEubVtpXTtcclxuICAgIGlmIChtICYmIHR5cGVvZiBtID09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICBpZiAocmVxLmNbaV0gJiYgIXVubG9hZGVkICYmIGZpbHRlcihtLCBpKSkge1xyXG4gICAgICAgIGlmIChhbGwpIGZvdW5kLnB1c2goZGVmYXVsdEV4cG9ydCA/IHJlcS5jW2ldLmV4cG9ydHMgOiByZXEuY1tpXSk7XHJcbiAgICAgICAgZWxzZSByZXR1cm4gZGVmYXVsdEV4cG9ydCA/IHJlcS5jW2ldLmV4cG9ydHMgOiByZXEuY1tpXTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoIXJlcS5jW2ldICYmIHVubG9hZGVkICYmIGZpbHRlcihtLCBpKSkge1xyXG4gICAgICAgIGNvbnN0IHJlc29sdmVkID0ge30sIHJlc29sdmVkMiA9IHt9O1xyXG4gICAgICAgIG0ocmVzb2x2ZWQsIHJlc29sdmVkMiwgcmVxKTtcclxuICAgICAgICBjb25zdCB0cnVlUmVzb2x2ZWQgPSByZXNvbHZlZDIgJiYgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMocmVzb2x2ZWQyIHx8IHt9KS5sZW5ndGggPT0gMCA/IHJlc29sdmVkIDogcmVzb2x2ZWQyO1xyXG4gICAgICAgIGlmIChhbGwpIGZvdW5kLnB1c2goZGVmYXVsdEV4cG9ydCA/IHRydWVSZXNvbHZlZC5leHBvcnRzIDogdHJ1ZVJlc29sdmVkKTtcclxuICAgICAgICBlbHNlIHJldHVybiBkZWZhdWx0RXhwb3J0ID8gdHJ1ZVJlc29sdmVkLmV4cG9ydHMgOiB0cnVlUmVzb2x2ZWQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgaWYgKGFsbCkgcmV0dXJuIGZvdW5kO1xyXG59O1xyXG5cclxuXHJcbmZ1bmN0aW9uIGZpbmRlckZpbmRGdW5jdGlvbihlbnRyaWVzLCBzdHJpbmdzKSB7XHJcbiAgcmV0dXJuIChlbnRyaWVzLmZpbmQobiA9PiB7XHJcbiAgICBsZXQgZnVuY1N0cmluZyA9IHR5cGVvZiBuWzFdID09IFwiZnVuY3Rpb25cIiA/IChuWzFdPy5fX29yaWdpbmFsX18/LnRvU3RyaW5nPy4oKSB8fCBuWzFdPy50b1N0cmluZz8uKCkgfHwgXCJcIikgOiAoKCkgPT4geyB0cnkgeyByZXR1cm4gSlNPTi5zdHJpbmdpZnkoblsxXSkgfSBjYXRjaCAoZXJyKSB7IHJldHVybiBuWzFdLnRvU3RyaW5nKCkgfSB9KSgpO1xyXG4gICAgbGV0IHJlbmRlckZ1bmNTdHJpbmcgPSBuWzFdPy5yZW5kZXI/Ll9fb3JpZ2luYWxfXz8udG9TdHJpbmc/LigpIHx8IG5bMV0/LnJlbmRlcj8udG9TdHJpbmc/LigpIHx8IFwiXCI7XHJcbiAgICByZXR1cm4gc3RyaW5ncy5ldmVyeShzdHJpbmcgPT4gZnVuY1N0cmluZy5pbmRleE9mKHN0cmluZykgIT0gLTEgfHwgcmVuZGVyRnVuY1N0cmluZy5pbmRleE9mKHN0cmluZykgIT0gLTEpO1xyXG4gIH0pKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRlclRvRmlsdGVyKGZpbmRlcikge1xyXG4gIGxldCBmb3VuZCA9ICgpID0+IGZhbHNlO1xyXG4gIGlmICh0eXBlb2YgZmluZGVyPy5maWx0ZXIgPT09IFwic3RyaW5nXCIpIHtcclxuICAgIGZvdW5kID0gd3JhcEZpbHRlcihldmFsKGAoKCQpPT57IHRyeSB7IHJldHVybiAoJHtmaW5kZXIuZmlsdGVyfSk7IH0gY2F0Y2ggeyByZXR1cm4gZmFsc2U7IH0gfSlgKSk7XHJcbiAgfSBlbHNlIGlmICh0eXBlb2YgZmluZGVyPy5maWx0ZXIgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgZm91bmQgPSB3cmFwRmlsdGVyKGZpbmRlci5maWx0ZXIpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBzd2l0Y2ggKGZpbmRlci5maWx0ZXIuaW4pIHtcclxuICAgICAgY2FzZSBcInByb3BlcnRpZXNcIjoge1xyXG4gICAgICAgIGlmIChmaW5kZXIuZmlsdGVyLmJ5Py5bMV0/Lmxlbmd0aCkge1xyXG4gICAgICAgICAgZm91bmQgPSB3cmFwRmlsdGVyKChtKSA9PiBjaGVja01vZHVsZVByb3BzKG0sIGZpbmRlci5maWx0ZXIuYnk/LlswXSB8fCBbXSkgJiYgY2hlY2tNb2R1bGVQcm9wcyhtLCBmaW5kZXIuZmlsdGVyLmJ5Py5bMV0gfHwgW10sIHRydWUpKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZm91bmQgPSB3cmFwRmlsdGVyKChtKSA9PiBjaGVja01vZHVsZVByb3BzKG0sIGZpbmRlci5maWx0ZXIuYnk/LlswXSB8fCBbXSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlIFwicHJvdG90eXBlc1wiOiB7XHJcbiAgICAgICAgaWYgKGZpbmRlci5maWx0ZXIuYnk/LlsxXT8ubGVuZ3RoKSB7XHJcbiAgICAgICAgICBmb3VuZCA9IHdyYXBGaWx0ZXIoKG0pID0+IGNoZWNrTW9kdWxlUHJvdG90eXBlcyhtLCBmaW5kZXIuZmlsdGVyLmJ5Py5bMF0gfHwgW10pICYmIGNoZWNrTW9kdWxlUHJvdG90eXBlcyhtLCBmaW5kZXIuZmlsdGVyLmJ5Py5bMV0gfHwgW10sIHRydWUpKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZm91bmQgPSB3cmFwRmlsdGVyKChtKSA9PiBjaGVja01vZHVsZVByb3RvdHlwZXMobSwgZmluZGVyLmZpbHRlci5ieT8uWzBdIHx8IFtdKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgXCJzdHJpbmdzXCI6IHtcclxuICAgICAgICBpZiAoZmluZGVyLmZpbHRlci5ieT8uWzFdPy5sZW5ndGgpIHtcclxuICAgICAgICAgIGZvdW5kID0gd3JhcEZpbHRlcigobSkgPT4gY2hlY2tNb2R1bGVTdHJpbmdzKG0sIGZpbmRlci5maWx0ZXIuYnk/LlswXSB8fCBbXSkgJiYgY2hlY2tNb2R1bGVTdHJpbmdzKG0sIGZpbmRlci5maWx0ZXIuYnk/LlsxXSB8fCBbXSwgdHJ1ZSkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBmb3VuZCA9IHdyYXBGaWx0ZXIoKG0pID0+IGNoZWNrTW9kdWxlU3RyaW5ncyhtLCBmaW5kZXIuZmlsdGVyLmJ5Py5bMF0gfHwgW10pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIGZvdW5kO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZmluZGVyTWFwKF9fb3JpZ2luYWxfXywgbWFwKSB7XHJcbiAgbGV0IF9fbWFwcGVkX18gPSB7fTtcclxuXHJcbiAgbGV0IHRlbXAgPSB7XHJcbiAgICBfX29yaWdpbmFsX18sXHJcbiAgICBfX21hcHBlZF9fLFxyXG4gICAgLi4uX19vcmlnaW5hbF9fXHJcbiAgfTtcclxuXHJcbiAgT2JqZWN0LmVudHJpZXMobWFwKS5mb3JFYWNoKChba2V5LCBzdHJpbmdzXSkgPT4ge1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRlbXAsIGtleSwge1xyXG4gICAgICBnZXQoKSB7XHJcbiAgICAgICAgaWYgKF9fbWFwcGVkX19ba2V5XSkgcmV0dXJuIF9fb3JpZ2luYWxfX1tfX21hcHBlZF9fW2tleV1dO1xyXG5cclxuICAgICAgICBsZXQgZm91bmRGdW5jID0gZmluZGVyRmluZEZ1bmN0aW9uKE9iamVjdC5lbnRyaWVzKF9fb3JpZ2luYWxfXyB8fCB7fSksIG1hcFtrZXldIHx8IFtdKTtcclxuICAgICAgICBpZiAoIWZvdW5kRnVuYz8ubGVuZ3RoKSByZXR1cm47XHJcblxyXG4gICAgICAgIF9fbWFwcGVkX19ba2V5XSA9IGZvdW5kRnVuY1swXTtcclxuICAgICAgICByZXR1cm4gZm91bmRGdW5jWzFdO1xyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gdGVtcDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRCeUZpbmRlcihyZXEsIGZpbmRlciA9IHt9KSB7XHJcbiAgY29uc3QgZGVmYXVsdEV4cG9ydCA9ICEhZmluZGVyPy5maWx0ZXI/LmV4cG9ydDtcclxuICBsZXQgZm91bmQgPSBmaW5kKHJlcSwgZmluZGVyVG9GaWx0ZXIoZmluZGVyKSwgeyBkZWZhdWx0RXhwb3J0LCBhbGw6IHRydWUgfSkuZmluZChpID0+IGkgIT09IGdsb2JhbFRoaXMud2luZG93IHx8IGk/LmV4cG9ydHMgIT09IGdsb2JhbFRoaXMud2luZG93KTtcclxuXHJcbiAgaWYgKCFmb3VuZCkgcmV0dXJuIG51bGw7XHJcblxyXG4gIGlmIChmaW5kZXIucGF0aD8uYmVmb3JlKSBmb3VuZCA9IChBcnJheS5pc0FycmF5KGZpbmRlci5wYXRoLmJlZm9yZSkgPyBmaW5kZXIucGF0aC5iZWZvcmUubWFwKGkgPT4gXy5nZXQoZm91bmQsIGkpKS5maW5kKGkgPT4gaSkgOiBfLmdldChmb3VuZCwgZmluZGVyLnBhdGguYmVmb3JlKSkgfHwgZm91bmQ7XHJcbiAgaWYgKGZpbmRlci5hc3NpZ24pIGZvdW5kID0gT2JqZWN0LmFzc2lnbih7fSwgZm91bmQpO1xyXG5cclxuICBpZiAoIWZvdW5kKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgaWYgKGZpbmRlci5tYXApIGZvdW5kID0gZmluZGVyTWFwKGZvdW5kLCBmaW5kZXIubWFwKTtcclxuXHJcbiAgaWYgKGZpbmRlci5wYXRoPy5hZnRlcikgZm91bmQgPSAoQXJyYXkuaXNBcnJheShmaW5kZXIucGF0aC5hZnRlcikgPyBmaW5kZXIucGF0aC5hZnRlci5tYXAoaSA9PiBfLmdldChmb3VuZCwgaSkpLmZpbmQoaSA9PiBpKSA6IF8uZ2V0KGZvdW5kLCBmaW5kZXIucGF0aC5hZnRlcikpIHx8IGZvdW5kO1xyXG5cclxuICByZXR1cm4gZm91bmQ7XHJcbn1cclxuXHJcblxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGxhenlGaW5kQnlGaW5kZXIoZmluZGVyID0ge30pIHtcclxuICBsZXQgZm91bmQgPSBhd2FpdCBsYXp5RmluZChmaW5kZXJUb0ZpbHRlcihmaW5kZXIpLCB7IHNlYXJjaEV4cG9ydHM6IGZhbHNlIH0pO1xyXG5cclxuICBpZiAoIWZvdW5kKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgaWYgKGZpbmRlci5wYXRoPy5iZWZvcmUpIGZvdW5kID0gKEFycmF5LmlzQXJyYXkoZmluZGVyLnBhdGguYmVmb3JlKSA/IGZpbmRlci5wYXRoLmJlZm9yZS5tYXAoaSA9PiBfLmdldChmb3VuZCwgaSkpLmZpbmQoaSA9PiBpKSA6IF8uZ2V0KGZvdW5kLCBmaW5kZXIucGF0aC5iZWZvcmUpKSB8fCBmb3VuZDtcclxuICBpZiAoZmluZGVyLmFzc2lnbikgZm91bmQgPSBPYmplY3QuYXNzaWduKHt9LCBmb3VuZCk7XHJcblxyXG4gIGlmICghZm91bmQpIHJldHVybiBudWxsO1xyXG5cclxuICBpZiAoZmluZGVyLm1hcCkgZm91bmQgPSBmaW5kZXJNYXAoZm91bmQsIGZpbmRlci5tYXApO1xyXG5cclxuICBpZiAoZmluZGVyLnBhdGg/LmFmdGVyKSBmb3VuZCA9IChBcnJheS5pc0FycmF5KGZpbmRlci5wYXRoLmFmdGVyKSA/IGZpbmRlci5wYXRoLmFmdGVyLm1hcChpID0+IF8uZ2V0KGZvdW5kLCBpKSkuZmluZChpID0+IGkpIDogXy5nZXQoZm91bmQsIGZpbmRlci5wYXRoLmFmdGVyKSkgfHwgZm91bmQ7XHJcblxyXG4gIHJldHVybiBmb3VuZDtcclxufSIsICJpbXBvcnQgKiBhcyBjb21wbGV4RmluZGVyIGZyb20gXCIuL3Jhdy9jb21wbGV4LWZpbmRlci5qc1wiO1xyXG5cclxuY29uc3QgZGVmYXVsdEJlZm9yZSA9IFtcclxuICBcImV4cG9ydHMuWlwiLFxyXG4gIFwiZXhwb3J0cy5aUFwiLFxyXG4gIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgXCJleHBvcnRzXCJcclxuXTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBfX2NhY2hlX186IHt9LFxyXG4gIGdldCByZXF1aXJlKCkge1xyXG4gICAgaWYgKHRoaXMuX19jYWNoZV9fLnJlcXVpcmUpIHJldHVybiB0aGlzLl9fY2FjaGVfXy5yZXF1aXJlO1xyXG4gICAgbGV0IHJlcUlkID0gYEFjb3JkV2VicGFja01vZHVsZXMke0RhdGUubm93KCl9YDtcclxuICAgIGNvbnN0IHJlcSA9IHdpbmRvdy53ZWJwYWNrQ2h1bmtkaXNjb3JkX2FwcC5wdXNoKFtbcmVxSWRdLCB7fSwgcmVxID0+IHJlcV0pO1xyXG4gICAgZGVsZXRlIHJlcS5tW3JlcUlkXTtcclxuICAgIGRlbGV0ZSByZXEuY1tyZXFJZF07XHJcbiAgICB3aW5kb3cud2VicGFja0NodW5rZGlzY29yZF9hcHAucG9wKCk7XHJcbiAgICB0aGlzLl9fY2FjaGVfXy5yZXF1aXJlID0gcmVxO1xyXG4gICAgcmV0dXJuIHJlcTtcclxuICB9LFxyXG4gIGZpbmQoZmlsdGVyLCBjb25maWcgPSB7fSkge1xyXG4gICAgcmV0dXJuIGNvbXBsZXhGaW5kZXIuZmluZCh0aGlzLnJlcXVpcmUsIGNvbXBsZXhGaW5kZXIud3JhcEZpbHRlcihmaWx0ZXIpLCBjb25maWcpO1xyXG4gIH0sXHJcbiAgbGF6eUZpbmQoZmlsdGVyLCBjb25maWcgPSB7fSkge1xyXG4gICAgcmV0dXJuIGNvbXBsZXhGaW5kZXIubGF6eUZpbmQoY29tcGxleEZpbmRlci53cmFwRmlsdGVyKGZpbHRlciksIGNvbmZpZyk7XHJcbiAgfSxcclxuICBsYXp5RmluZEJ5RmluZGVyKGZpbmRlcikge1xyXG4gICAgcmV0dXJuIGNvbXBsZXhGaW5kZXIubGF6eUZpbmRCeUZpbmRlcihmaW5kZXIpO1xyXG4gIH0sXHJcbiAgZmlsdGVyKGZpbHRlciwgY29uZmlnID0ge30pIHtcclxuICAgIHJldHVybiBjb21wbGV4RmluZGVyLmZpbmQodGhpcy5yZXF1aXJlLCBjb21wbGV4RmluZGVyLndyYXBGaWx0ZXIoZmlsdGVyKSwgeyAuLi5jb25maWcsIGFsbDogdHJ1ZSB9KTtcclxuICB9LFxyXG4gIGZpbmRCeUZpbmRlcihmaW5kZXIpIHtcclxuICAgIHJldHVybiBjb21wbGV4RmluZGVyLmZpbmRCeUZpbmRlcih0aGlzLnJlcXVpcmUsIGZpbmRlcik7XHJcbiAgfSxcclxuICBmaW5kQnlTdHJpbmdWYWx1ZXMoLi4uc3RyaW5nVmFsdWVzKSB7XHJcbiAgICByZXR1cm4gdGhpcy5maW5kKChhKSA9PiB7IGxldCB2YSA9IE9iamVjdC52YWx1ZXMoYSk7IHJldHVybiBzdHJpbmdWYWx1ZXMuZXZlcnkoeCA9PiB2YS5zb21lKHkgPT4gdHlwZW9mIHkgPT0gXCJzdHJpbmdcIiAmJiB5LmluY2x1ZGVzKHgpKSkgfSk/LmV4cG9ydHM7XHJcbiAgfSxcclxuICBmaW5kQnlQcm9wZXJ0aWVzKC4uLnByb3BzKSB7XHJcbiAgICByZXR1cm4gdGhpcy5maW5kQnlGaW5kZXIoe1xyXG4gICAgICBmaWx0ZXI6IHtcclxuICAgICAgICBleHBvcnQ6IGZhbHNlLFxyXG4gICAgICAgIGluOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBieTogW3Byb3BzXVxyXG4gICAgICB9LFxyXG4gICAgICBwYXRoOiB7XHJcbiAgICAgICAgYmVmb3JlOiBkZWZhdWx0QmVmb3JlXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgZmluZEJ5UHJvdG90eXBlcyguLi5wcm9wcykge1xyXG4gICAgcmV0dXJuIHRoaXMuZmluZEJ5RmluZGVyKHtcclxuICAgICAgZmlsdGVyOiB7XHJcbiAgICAgICAgZXhwb3J0OiBmYWxzZSxcclxuICAgICAgICBpbjogXCJwcm90b3R5cGVzXCIsXHJcbiAgICAgICAgYnk6IFtwcm9wc11cclxuICAgICAgfSxcclxuICAgICAgcGF0aDoge1xyXG4gICAgICAgIGJlZm9yZTogZGVmYXVsdEJlZm9yZVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9LFxyXG4gIGZpbmRCeVN0cmluZ3MoLi4ucHJvcHMpIHtcclxuICAgIHJldHVybiB0aGlzLmZpbmRCeUZpbmRlcih7XHJcbiAgICAgIGZpbHRlcjoge1xyXG4gICAgICAgIGV4cG9ydDogZmFsc2UsXHJcbiAgICAgICAgaW46IFwic3RyaW5nc1wiLFxyXG4gICAgICAgIGJ5OiBbcHJvcHNdXHJcbiAgICAgIH0sXHJcbiAgICAgIHBhdGg6IHtcclxuICAgICAgICBiZWZvcmU6IGRlZmF1bHRCZWZvcmVcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSxcclxufTsiLCAiaW1wb3J0IGNvbW1vbkRhdGEgZnJvbSAnLi4vLi4vZGF0YS9jb21tb24uanNvbic7XHJcbmltcG9ydCB3ZWJwYWNrIGZyb20gJy4vd2VicGFjay5qcyc7XHJcblxyXG5cclxuZnVuY3Rpb24gbWFwT2JqZWN0KHRlbXAsIGlucCkge1xyXG4gIGlmICghdGVtcD8uX19jYWNoZV9fKSB0ZW1wLl9fY2FjaGVfXyA9IHt9O1xyXG4gIGZvciAoY29uc3Qga2V5IGluIGlucCkge1xyXG4gICAgaWYgKGlucD8uW2tleV0/Ll9fID09PSB0cnVlKSB7XHJcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0ZW1wLCBrZXksIHtcclxuICAgICAgICBnZXQoKSB7XHJcbiAgICAgICAgICBpZiAodGVtcC5fX2NhY2hlX19ba2V5XSkgcmV0dXJuIHRlbXAuX19jYWNoZV9fW2tleV07XHJcbiAgICAgICAgICByZXR1cm4gdGVtcC5fX2NhY2hlX19ba2V5XSA9IHdlYnBhY2suZmluZEJ5RmluZGVyKGlucFtrZXldKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAodHlwZW9mIHRlbXBba2V5XSA9PT0gXCJ1bmRlZmluZWRcIikgdGVtcFtrZXldID0ge307XHJcbiAgICAgIG1hcE9iamVjdCh0ZW1wW2tleV0sIGlucFtrZXldKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcblxyXG5sZXQgY29tbW9uID0ge1xyXG4gIF9fY2FjaGVfXzoge30sXHJcbiAgTGF5ZXJBY3Rpb25zOiB7XHJcbiAgICBwdXNoKGNvbXBvbmVudCkge1xyXG4gICAgICBjb21tb24uRmx1eERpc3BhdGNoZXIuZGlzcGF0Y2goe1xyXG4gICAgICAgIHR5cGU6IFwiTEFZRVJfUFVTSFwiLFxyXG4gICAgICAgIGNvbXBvbmVudFxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBwb3AoKSB7XHJcbiAgICAgIGNvbW1vbi5GbHV4RGlzcGF0Y2hlci5kaXNwYXRjaCh7XHJcbiAgICAgICAgdHlwZTogXCJMQVlFUl9QT1BcIlxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBwb3BBbGwoKSB7XHJcbiAgICAgIGNvbW1vbi5GbHV4RGlzcGF0Y2hlci5kaXNwYXRjaCh7XHJcbiAgICAgICAgdHlwZTogXCJMQVlFUl9QT1BfQUxMXCJcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSxcclxufTtcclxubWFwT2JqZWN0KGNvbW1vbiwgY29tbW9uRGF0YS5jb21tb24pO1xyXG57XHJcbiAgbGV0IHBhdGhzID0gW1xyXG4gICAgXCJleHBvcnRzLlpcIixcclxuICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgIFwiZXhwb3J0c1wiXHJcbiAgXTtcclxuICB3ZWJwYWNrLmZpbHRlcigoaSkgPT4gaT8uZ2V0TmFtZT8uKCk/LmVuZHNXaXRoPy4oXCJTdG9yZVwiKSwgeyBkZWZhdWx0RXhwb3J0OiBmYWxzZSB9KS5mb3JFYWNoKChtKSA9PiB7XHJcbiAgICBsZXQgb2JqID0gcGF0aHMubWFwKHBhdGggPT4gXy5nZXQobSwgcGF0aCkpLmZpbmQoaSA9PiBpKTtcclxuICAgIGlmICghb2JqKSByZXR1cm47XHJcbiAgICBsZXQgbmFtZSA9IG9iaj8uZ2V0TmFtZT8uKCk7XHJcbiAgICBpZiAoIW5hbWUpIHJldHVybjtcclxuICAgIGlmIChjb21tb25bbmFtZV0pIHJldHVybjtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29tbW9uLCBuYW1lLCB7XHJcbiAgICAgIGdldCgpIHtcclxuICAgICAgICBpZiAoY29tbW9uLl9fY2FjaGVfX1tuYW1lXSkgcmV0dXJuIGNvbW1vbi5fX2NhY2hlX19bbmFtZV07XHJcbiAgICAgICAgcmV0dXJuIGNvbW1vbi5fX2NhY2hlX19bbmFtZV0gPSBvYmo7XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfSlcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29tbW9uOyIsICJpbXBvcnQgY29tbW9uIGZyb20gXCIuL2NvbW1vbi5qc1wiO1xyXG5pbXBvcnQgd2VicGFjayBmcm9tIFwiLi93ZWJwYWNrLmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgY29tbW9uLFxyXG4gIHdlYnBhY2ssXHJcbiAgcmVxdWlyZTogZ2xvYmFsVGhpc1tcIjxQUkVMT0FEX0tFWT5cIl0ucmVxdWlyZSxcclxuICBuYXRpdmU6IERpc2NvcmROYXRpdmUsXHJcbn0iLCAiaW1wb3J0IG1vZHVsZXMgZnJvbSBcIi4uL2FwaS9tb2R1bGVzL2luZGV4LmpzXCI7XHJcblxyXG5sZXQgaXNDb25uZWN0aW9uT3BlbiA9IGZhbHNlO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHdhaXRVbnRpbENvbm5lY3Rpb25PcGVuKCkge1xyXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG4gICAgaWYgKGlzQ29ubmVjdGlvbk9wZW4pIHJldHVybiByZXNvbHZlKHRydWUpO1xyXG4gICAgZnVuY3Rpb24gb25FdmVudCgpIHtcclxuICAgICAgbW9kdWxlcy5jb21tb24uRmx1eERpc3BhdGNoZXIudW5zdWJzY3JpYmUoXCJDT05ORUNUSU9OX09QRU5cIiwgb25FdmVudCk7XHJcbiAgICAgIGlzQ29ubmVjdGlvbk9wZW4gPSB0cnVlO1xyXG4gICAgICByZXNvbHZlKHRydWUpO1xyXG4gICAgfVxyXG4gICAgbW9kdWxlcy5jb21tb24uRmx1eERpc3BhdGNoZXIuc3Vic2NyaWJlKFwiQ09OTkVDVElPTl9PUEVOXCIsIG9uRXZlbnQpO1xyXG4gIH0pO1xyXG59IiwgImV4cG9ydCBjbGFzcyBCYXNpY0V2ZW50RW1pdHRlciB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAvKiogQHR5cGUge01hcDxzdHJpbmcsIE1hcDwoLi4uYXJnczogYW55W10pPT52b2lkLCB7b25jZTogYm9vbGVhbn0+Pn0gKi9cclxuICAgIHRoaXMubGlzdGVuZXJzID0gbmV3IE1hcCgpO1xyXG4gIH1cclxuXHJcbiAgX3ByZXBhcmVMaXN0ZW5lcnNNYXAoZXZlbnROYW1lKSB7XHJcbiAgICBpZiAoIXRoaXMubGlzdGVuZXJzLmhhcyhldmVudE5hbWUpKVxyXG4gICAgICB0aGlzLmxpc3RlbmVycy5zZXQoZXZlbnROYW1lLCBuZXcgTWFwKCkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50TmFtZVxyXG4gICAqIEBwYXJhbSB7KC4uLmFyZ3M6IGFueVtdKT0+dm9pZH0gbGlzdGVuZXJcclxuICAgKi9cclxuICBvbihldmVudE5hbWUsIGxpc3RlbmVyKSB7XHJcbiAgICB0aGlzLl9wcmVwYXJlTGlzdGVuZXJzTWFwKGV2ZW50TmFtZSk7XHJcbiAgICB0aGlzLmxpc3RlbmVycy5nZXQoZXZlbnROYW1lKS5zZXQobGlzdGVuZXIsIHsgb25jZTogZmFsc2UgfSk7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICB0aGlzLmxpc3RlbmVycy5nZXQoZXZlbnROYW1lKS5kZWxldGUobGlzdGVuZXIpO1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudE5hbWVcclxuICAgKiBAcGFyYW0geyguLi5hcmdzOiBhbnlbXSk9PnZvaWR9IGxpc3RlbmVyXHJcbiAgICovXHJcbiAgb25jZShldmVudE5hbWUsIGxpc3RlbmVyKSB7XHJcbiAgICB0aGlzLl9wcmVwYXJlTGlzdGVuZXJzTWFwKGV2ZW50TmFtZSk7XHJcbiAgICB0aGlzLmxpc3RlbmVycy5nZXQoZXZlbnROYW1lKT8uc2V0KGxpc3RlbmVyLCB7IG9uY2U6IHRydWUgfSk7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICB0aGlzLmxpc3RlbmVycy5nZXQoZXZlbnROYW1lKS5kZWxldGUobGlzdGVuZXIpO1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nP30gZXZlbnROYW1lXHJcbiAgICogQHBhcmFtIHsoKC4uLmFyZ3M6IGFueVtdKT0+dm9pZCk/fSBsaXN0ZW5lclxyXG4gICAqL1xyXG4gIG9mZihldmVudE5hbWUsIGxpc3RlbmVyKSB7XHJcbiAgICBpZiAoIWV2ZW50TmFtZSkgcmV0dXJuICh0aGlzLmxpc3RlbmVycyA9IG5ldyBNYXAoKSk7XHJcbiAgICBpZiAoIWxpc3RlbmVyKSByZXR1cm4gdGhpcy5saXN0ZW5lcnM/LmRlbGV0ZShldmVudE5hbWUpO1xyXG4gICAgdGhpcy5saXN0ZW5lcnMuZ2V0KGV2ZW50TmFtZSk/LmRlbGV0ZShsaXN0ZW5lcik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnROYW1lXHJcbiAgICogQHBhcmFtICB7Li4uYW55fSBhcmdzXHJcbiAgICovXHJcbiAgZW1pdChldmVudE5hbWUsIC4uLmFyZ3MpIHtcclxuICAgIGlmICghdGhpcy5saXN0ZW5lcnMuaGFzKGV2ZW50TmFtZSkpIHJldHVybjtcclxuICAgIGxldCBldmVudE1hcCA9IHRoaXMubGlzdGVuZXJzLmdldChldmVudE5hbWUpO1xyXG4gICAgZXZlbnRNYXAuZm9yRWFjaCgoeyBvbmNlIH0sIGxpc3RlbmVyKSA9PiB7XHJcbiAgICAgIGlmIChvbmNlKSBldmVudE1hcD8uZGVsZXRlKGxpc3RlbmVyKTtcclxuICAgICAgbGlzdGVuZXIoLi4uYXJncyk7XHJcbiAgICB9KTtcclxuICB9XHJcbn07XHJcbiIsICJpbXBvcnQgeyBCYXNpY0V2ZW50RW1pdHRlciB9IGZyb20gXCIuLi8uLi9saWIvQmFzaWNFdmVudEVtaXR0ZXIuanNcIjtcclxuXHJcbmNvbnN0IGV2ZW50cyA9IG5ldyBCYXNpY0V2ZW50RW1pdHRlcigpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZXZlbnRzOyIsICJpbXBvcnQgZXZlbnRzIGZyb20gXCIuLi9ldmVudHNcIjtcclxuaW1wb3J0IHdlYnBhY2sgZnJvbSBcIi4uL21vZHVsZXMvd2VicGFjay5qc1wiO1xyXG5cclxuY29uc3Qgc2Nyb2xsYmFyQ2xhc3NlcyA9IHdlYnBhY2suZmluZEJ5UHJvcGVydGllcyhcInNjcm9sbGJhckdob3N0SGFpcmxpbmVcIiwgXCJzcGlubmVyXCIpO1xyXG5cclxuY29uc3QgZm9ybWF0UmVnZXhlcyA9IHtcclxuICBib2xkOiAvXFwqXFwqKFteKl0rKVxcKlxcKi9nLFxyXG4gIGl0YWxpYzogL1xcKihbXipdKylcXCovZyxcclxuICB1bmRlcmxpbmU6IC9cXF8oW14qXSspXFxfL2csXHJcbiAgc3RyaWtlOiAvXFx+XFx+KFteKl0rKVxcflxcfi9nLFxyXG4gIHVybDogLyhcXGIoaHR0cHM/fGZ0cHxmaWxlKTpcXC9cXC9bLUEtWjAtOSsmQCNcXC8lPz1+X3whOiwuO10qWy1BLVowLTkrJkAjXFwvJT1+X3xdKS9pZyxcclxuICBpbmxpbmU6IC9cXGAoW14qXSspXFxgL2csXHJcbiAgY29kZWJsb2NrU2luZ2xlOiAvXFxgXFxgXFxgKFteKl0rKVxcYFxcYFxcYC9nLFxyXG4gIGNvZGVibG9ja011bHRpOiAvXFxgXFxgXFxgKFxcdyspXFxuKCg/Oig/IVxcYFxcYFxcYClbXFxzXFxTXSkqKVxcYFxcYFxcYC9nXHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgcGFyc2UoaHRtbCkge1xyXG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBkaXYuaW5uZXJIVE1MID0gaHRtbDtcclxuICAgIHJldHVybiBkaXYuZmlyc3RFbGVtZW50Q2hpbGQ7XHJcbiAgfSxcclxuICB0b0NTU1Byb3Aobykge1xyXG4gICAgbGV0IGVsbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBPYmplY3QuZW50cmllcyhvKS5mb3JFYWNoKChpKSA9PiB7XHJcbiAgICAgIGlmIChlbG0uc3R5bGUuaGFzT3duUHJvcGVydHkoaVswXSkpIHtcclxuICAgICAgICBlbG0uc3R5bGVbaVswXV0gPSBpWzFdO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGVsbS5zdHlsZS5zZXRQcm9wZXJ0eShpWzBdLCBpWzFdKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gZWxtLmdldEF0dHJpYnV0ZShcInN0eWxlXCIpO1xyXG4gIH0sXHJcbiAgdG9IVE1MUHJvcHMobykge1xyXG4gICAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKG8pXHJcbiAgICAgIC5tYXAoXHJcbiAgICAgICAgKGkpID0+XHJcbiAgICAgICAgICBgJHtpWzBdLnJlcGxhY2UoLyArLywgXCItXCIpfT1cIiR7aVswXSA9PSBcInN0eWxlXCIgJiYgdHlwZW9mIGlbMV0gIT0gXCJzdHJpbmdcIlxyXG4gICAgICAgICAgICA/IHRoaXMudG9DU1NQcm9wKGlbMV0pXHJcbiAgICAgICAgICAgIDogdGhpcy5lc2NhcGVIVE1MKGlbMV0pfVwiYFxyXG4gICAgICApXHJcbiAgICAgIC5qb2luKFwiIFwiKTtcclxuICB9LFxyXG4gIGVzY2FwZShodG1sKSB7XHJcbiAgICByZXR1cm4gbmV3IE9wdGlvbihodG1sKS5pbm5lckhUTUw7XHJcbiAgfSxcclxuICAvKipcclxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsbSBcclxuICAgKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IHNlbGVjdG9yT3JOdW1iZXIgXHJcbiAgICogQHJldHVybnMge0VsZW1lbnRbXX1cclxuICAgKi9cclxuICBwYXJlbnRzKGVsbSwgc2VsZWN0b3JPck51bWJlcikge1xyXG4gICAgbGV0IHBhcmVudHMgPSBbXTtcclxuICAgIGlmICh0eXBlb2Ygc2VsZWN0b3JPck51bWJlciA9PT0gXCJudW1iZXJcIikge1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlbGVjdG9yT3JOdW1iZXI7IGkrKykge1xyXG4gICAgICAgIGlmIChlbG0ucGFyZW50RWxlbWVudCkge1xyXG4gICAgICAgICAgZWxtID0gZWxtLnBhcmVudEVsZW1lbnQ7XHJcbiAgICAgICAgICBwYXJlbnRzLnB1c2goZWxtKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHdoaWxlIChlbG0ucGFyZW50RWxlbWVudCAmJiBlbG0ucGFyZW50RWxlbWVudC5jbG9zZXN0KHNlbGVjdG9yT3JOdW1iZXIpKSB7XHJcbiAgICAgICAgZWxtID0gZWxtLnBhcmVudEVsZW1lbnQuY2xvc2VzdChzZWxlY3Rvck9yTnVtYmVyKTtcclxuICAgICAgICBwYXJlbnRzLnB1c2goZWxtKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBhcmVudHM7XHJcbiAgfSxcclxuICAvKipcclxuICAgKiBcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3IgXHJcbiAgICogQHBhcmFtIHsoZWxlbWVudDogSFRNTERpdkVsZW1lbnQpPT4oKCk9PnZvaWQpfSBjYiBcclxuICAgKiBAcmV0dXJucyB7KCk9PnZvaWR9XHJcbiAgICovXHJcbiAgcGF0Y2g6IChzZWxlY3RvciwgY2IpID0+XHJcbiAgICAoKCkgPT4ge1xyXG4gICAgICBmdW5jdGlvbiBub2RlQWRkZWQobm9kZSkge1xyXG4gICAgICAgIGlmIChub2RlLm5vZGVUeXBlID09PSBOb2RlLlRFWFRfTk9ERSkgcmV0dXJuO1xyXG4gICAgICAgIG5vZGUucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikuZm9yRWFjaChhc3luYyAoZWxtKSA9PiB7XHJcbiAgICAgICAgICBpZiAoIWVsbS5hY29yZCkge1xyXG4gICAgICAgICAgICBlbG0uYWNvcmQgPSB7IHVubW91bnQ6IFtdLCBwYXRjaGVkOiBuZXcgU2V0KCkgfTtcclxuICAgICAgICAgICAgZWxtLmNsYXNzTGlzdC5hZGQoXCJhY29yZC0tcGF0Y2hlZFwiKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoZWxtLmFjb3JkLnBhdGNoZWQuaGFzKGNiKSkgcmV0dXJuO1xyXG4gICAgICAgICAgZWxtLmFjb3JkLnBhdGNoZWQuYWRkKGNiKTtcclxuXHJcbiAgICAgICAgICBsZXQgdW5QYXRjaENiID0gYXdhaXQgY2IoZWxtKTtcclxuICAgICAgICAgIGlmICh0eXBlb2YgdW5QYXRjaENiID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgICAgIGVsbS5hY29yZC51bm1vdW50LnB1c2godW5QYXRjaENiKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgZnVuY3Rpb24gbm9kZVJlbW92ZWQobm9kZSkge1xyXG4gICAgICAgIGlmIChub2RlLm5vZGVUeXBlID09PSBOb2RlLlRFWFRfTk9ERSkgcmV0dXJuO1xyXG4gICAgICAgIG5vZGUucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikuZm9yRWFjaChhc3luYyAoZWxtKSA9PiB7XHJcbiAgICAgICAgICBpZiAoIWVsbS5hY29yZCkgcmV0dXJuO1xyXG4gICAgICAgICAgZWxtLmFjb3JkLnVubW91bnQuZm9yRWFjaCgoZikgPT4gZigpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikuZm9yRWFjaChub2RlQWRkZWQpO1xyXG5cclxuICAgICAgcmV0dXJuIGV2ZW50cy5vbihcclxuICAgICAgICBcImRvbS1tdXRhdGlvblwiLFxyXG4gICAgICAgIC8qKiBAcGFyYW0ge011dGF0aW9uUmVjb3JkfSBtdXQgKi8obXV0KSA9PiB7XHJcbiAgICAgICAgICBpZiAobXV0LnR5cGUgPT09IFwiY2hpbGRMaXN0XCIpIHtcclxuICAgICAgICAgICAgbXV0LmFkZGVkTm9kZXMuZm9yRWFjaChub2RlQWRkZWQpO1xyXG4gICAgICAgICAgICBtdXQucmVtb3ZlZE5vZGVzLmZvckVhY2gobm9kZVJlbW92ZWQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgKTtcclxuICAgIH0pKCksXHJcbiAgZm9ybWF0Q29udGVudChtc2cpIHtcclxuICAgIGlmICghbXNnKSByZXR1cm4gJyc7XHJcbiAgICBjb25zdCB7IGJvbGQsIGl0YWxpYywgdW5kZXJsaW5lLCBzdHJpa2UsIGNvZGVibG9ja011bHRpLCBjb2RlYmxvY2tTaW5nbGUsIGlubGluZSwgdXJsIH0gPSBmb3JtYXRSZWdleGVzO1xyXG5cclxuICAgIGNvbnN0IGNvZGVCbG9ja3NNYXAgPSBPYmplY3QuZnJvbUVudHJpZXMoW1xyXG4gICAgICAuLi4obXNnLm1hdGNoQWxsKGNvZGVibG9ja011bHRpKSB8fCBbXSksIC4uLihtc2cubWF0Y2hBbGwoY29kZWJsb2NrU2luZ2xlKSB8fCBbXSlcclxuICAgIF0ubWFwKFxyXG4gICAgICAoW18sIGNvZGVCbG9ja09yQ29kZSwgY29kZUJsb2NrQ29udGVudF0sIGkpID0+IHtcclxuICAgICAgICBtc2cgPSBtc2cucmVwbGFjZShfLCBge3tDT0RFQkxPQ0tfJHtpfX19YCk7XHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgIGB7e0NPREVCTE9DS18ke2l9fX1gLFxyXG4gICAgICAgICAgY29kZUJsb2NrQ29udGVudCA/XHJcbiAgICAgICAgICAgIGA8cHJlPjxjb2RlIGNsYXNzPVwiJHtzY3JvbGxiYXJDbGFzc2VzLnNjcm9sbGJhckdob3N0SGFpcmxpbmV9IGhsanMgJHtjb2RlQmxvY2tPckNvZGV9XCIgc3R5bGU9XCJwb3NpdGlvbjogcmVsYXRpdmU7XCI+JHttb2R1bGVzLmNvbW1vbi5obGpzLmhpZ2hsaWdodChjb2RlQmxvY2tPckNvZGUsIGNvZGVCbG9ja0NvbnRlbnQpLnZhbHVlfTwvY29kZT48L3ByZT5gIDpcclxuICAgICAgICAgICAgYDxwcmU+PGNvZGUgY2xhc3M9XCIke3Njcm9sbGJhckNsYXNzZXMuc2Nyb2xsYmFyR2hvc3RIYWlybGluZX0gaGxqc1wiIHN0eWxlPVwicG9zaXRpb246IHJlbGF0aXZlO1wiPiR7Y29kZUJsb2NrT3JDb2RlfTwvY29kZT48L3ByZT5gXHJcbiAgICAgICAgXTtcclxuICAgICAgfVxyXG4gICAgKSk7XHJcblxyXG4gICAgY29uc3QgaW5saW5lTWFwID0gT2JqZWN0LmZyb21FbnRyaWVzKFxyXG4gICAgICBbLi4uKG1zZy5tYXRjaEFsbChpbmxpbmUpIHx8IFtdKV0ubWFwKFxyXG4gICAgICAgIChbXywgaW5saW5lQ29udGVudF0sIGkpID0+IHtcclxuICAgICAgICAgIG1zZyA9IG1zZy5yZXBsYWNlKF8sIGB7e0lOTElORV8ke2l9fX1gKTtcclxuICAgICAgICAgIHJldHVybiBbYHt7SU5MSU5FXyR7aX19fWAsIGA8Y29kZSBjbGFzcz1cImlubGluZVwiPiR7aW5saW5lQ29udGVudH08L2NvZGU+YF07XHJcbiAgICAgICAgfVxyXG4gICAgICApXHJcbiAgICApO1xyXG5cclxuICAgIG1zZyA9IG1zZy5yZXBsYWNlKGJvbGQsIFwiPGI+JDE8L2I+XCIpXHJcbiAgICAgIC5yZXBsYWNlKGl0YWxpYywgXCI8aT4kMTwvaT5cIilcclxuICAgICAgLnJlcGxhY2UodW5kZXJsaW5lLCBcIjxVPiQxPC9VPlwiKVxyXG4gICAgICAucmVwbGFjZShzdHJpa2UsIFwiPHM+JDE8L3M+XCIpXHJcbiAgICAgIC5yZXBsYWNlKHVybCwgJzxhIGhyZWY9XCIkMVwiPiQxPC9hPicpO1xyXG5cclxuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKGNvZGVCbG9ja3NNYXApKSB7XHJcbiAgICAgIG1zZyA9IG1zZy5yZXBsYWNlKGtleSwgdmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKGlubGluZU1hcCkpIHtcclxuICAgICAgbXNnID0gbXNnLnJlcGxhY2Uoa2V5LCB2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG1zZztcclxuICB9LFxyXG4gIHJlc29sdmUoaHRtbE9yRWxtKSB7XHJcbiAgICBpZiAoaHRtbE9yRWxtIGluc3RhbmNlb2YgRWxlbWVudCkgcmV0dXJuIGh0bWxPckVsbTtcclxuICAgIHJldHVybiB0aGlzLnBhcnNlKGh0bWxPckVsbSk7XHJcbiAgfVxyXG59XHJcblxyXG57XHJcbiAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigobXV0YXRpb25zKSA9PiB7XHJcbiAgICBtdXRhdGlvbnMuZm9yRWFjaCgobXV0YXRpb24pID0+IHtcclxuICAgICAgZXZlbnRzLmVtaXQoXCJkb20tbXV0YXRpb25cIiwgbXV0YXRpb24pO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbiAgb2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudCwge1xyXG4gICAgYXR0cmlidXRlczogdHJ1ZSxcclxuICAgIGNoaWxkTGlzdDogdHJ1ZSxcclxuICAgIHN1YnRyZWU6IHRydWVcclxuICB9KTtcclxufSIsICIvLyB3ZSB1c2UgdGhpcyBhcnJheSBtdWx0aXBsZSB0aW1lc1xyXG5leHBvcnQgY29uc3QgcGF0Y2hUeXBlcyA9IFtcImFcIiwgXCJiXCIsIFwiaVwiXTtcclxuZXhwb3J0IGNvbnN0IHBhdGNoZWRPYmplY3RzID0gbmV3IE1hcCgpO1xyXG4iLCAiLy8gY2FsbHMgcmVsZXZhbnQgcGF0Y2hlcyBhbmQgcmV0dXJucyB0aGUgZmluYWwgcmVzdWx0XHJcbmltcG9ydCB7IHBhdGNoZWRPYmplY3RzIH0gZnJvbSBcIi4vc2hhcmVkLmpzXCI7XHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChmdW5jTmFtZSwgZnVuY1BhcmVudCwgZnVuY0FyZ3MsIFxyXG4vLyB0aGUgdmFsdWUgb2YgYHRoaXNgIHRvIGFwcGx5XHJcbmN0eHQsIFxyXG4vLyBpZiB0cnVlLCB0aGUgZnVuY3Rpb24gaXMgYWN0dWFsbHkgY29uc3RydWN0b3JcclxuaXNDb25zdHJ1Y3QpIHtcclxuICAgIGNvbnN0IHBhdGNoID0gcGF0Y2hlZE9iamVjdHMuZ2V0KGZ1bmNQYXJlbnQpPy5bZnVuY05hbWVdO1xyXG4gICAgLy8gVGhpcyBpcyBpbiB0aGUgZXZlbnQgdGhhdCB0aGlzIGZ1bmN0aW9uIGlzIGJlaW5nIGNhbGxlZCBhZnRlciBhbGwgcGF0Y2hlcyBhcmUgcmVtb3ZlZC5cclxuICAgIGlmICghcGF0Y2gpXHJcbiAgICAgICAgcmV0dXJuIGlzQ29uc3RydWN0XHJcbiAgICAgICAgICAgID8gUmVmbGVjdC5jb25zdHJ1Y3QoZnVuY1BhcmVudFtmdW5jTmFtZV0sIGZ1bmNBcmdzLCBjdHh0KVxyXG4gICAgICAgICAgICA6IGZ1bmNQYXJlbnRbZnVuY05hbWVdLmFwcGx5KGN0eHQsIGZ1bmNBcmdzKTtcclxuICAgIC8vIEJlZm9yZSBwYXRjaGVzXHJcbiAgICBmb3IgKGNvbnN0IGhvb2sgb2YgcGF0Y2guYi52YWx1ZXMoKSkge1xyXG4gICAgICAgIGNvbnN0IG1heWJlZnVuY0FyZ3MgPSBob29rLmNhbGwoY3R4dCwgZnVuY0FyZ3MpO1xyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KG1heWJlZnVuY0FyZ3MpKVxyXG4gICAgICAgICAgICBmdW5jQXJncyA9IG1heWJlZnVuY0FyZ3M7XHJcbiAgICB9XHJcbiAgICAvLyBJbnN0ZWFkIHBhdGNoZXNcclxuICAgIGxldCBpbnN0ZWFkUGF0Y2hlZEZ1bmMgPSAoLi4uYXJncykgPT4gaXNDb25zdHJ1Y3RcclxuICAgICAgICA/IFJlZmxlY3QuY29uc3RydWN0KHBhdGNoLm8sIGFyZ3MsIGN0eHQpXHJcbiAgICAgICAgOiBwYXRjaC5vLmFwcGx5KGN0eHQsIGFyZ3MpO1xyXG4gICAgZm9yIChjb25zdCBjYWxsYmFjayBvZiBwYXRjaC5pLnZhbHVlcygpKSB7XHJcbiAgICAgICAgY29uc3Qgb2xkUGF0Y2hGdW5jID0gaW5zdGVhZFBhdGNoZWRGdW5jO1xyXG4gICAgICAgIGluc3RlYWRQYXRjaGVkRnVuYyA9ICguLi5hcmdzKSA9PiBjYWxsYmFjay5jYWxsKGN0eHQsIGFyZ3MsIG9sZFBhdGNoRnVuYyk7XHJcbiAgICB9XHJcbiAgICBsZXQgd29ya2luZ1JldFZhbCA9IGluc3RlYWRQYXRjaGVkRnVuYyguLi5mdW5jQXJncyk7XHJcbiAgICAvLyBBZnRlciBwYXRjaGVzXHJcbiAgICBmb3IgKGNvbnN0IGhvb2sgb2YgcGF0Y2guYS52YWx1ZXMoKSlcclxuICAgICAgICB3b3JraW5nUmV0VmFsID0gaG9vay5jYWxsKGN0eHQsIGZ1bmNBcmdzLCB3b3JraW5nUmV0VmFsKSA/PyB3b3JraW5nUmV0VmFsO1xyXG4gICAgcmV0dXJuIHdvcmtpbmdSZXRWYWw7XHJcbn1cclxuIiwgImltcG9ydCB7IHBhdGNoZWRPYmplY3RzLCBwYXRjaFR5cGVzIH0gZnJvbSBcIi4vc2hhcmVkLmpzXCI7XHJcbmV4cG9ydCBmdW5jdGlvbiB1blBhdGNoKGZ1bmNQYXJlbnQsIGZ1bmNOYW1lLCBob29rSWQsIHR5cGUpIHtcclxuICAgIGNvbnN0IHBhdGNoZWRPYmplY3QgPSBwYXRjaGVkT2JqZWN0cy5nZXQoZnVuY1BhcmVudCk7XHJcbiAgICBjb25zdCBwYXRjaCA9IHBhdGNoZWRPYmplY3Q/LltmdW5jTmFtZV07XHJcbiAgICBpZiAoIXBhdGNoPy5bdHlwZV0uaGFzKGhvb2tJZCkpXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgcGF0Y2hbdHlwZV0uZGVsZXRlKGhvb2tJZCk7XHJcbiAgICAvLyBJZiB0aGVyZSBhcmUgbm8gbW9yZSBob29rcyBmb3IgZXZlcnkgdHlwZSwgcmVtb3ZlIHRoZSBwYXRjaFxyXG4gICAgaWYgKHBhdGNoVHlwZXMuZXZlcnkoKHQpID0+IHBhdGNoW3RdLnNpemUgPT09IDApKSB7XHJcbiAgICAgICAgLy8gcmVmbGVjdCBkZWZpbmVwcm9wZXJ0eSBpcyBsaWtlIG9iamVjdCBkZWZpbmVwcm9wZXJ0eVxyXG4gICAgICAgIC8vIGJ1dCBpbnN0ZWFkIG9mIGVycm9yaW5nIGl0IHJldHVybnMgaWYgaXQgd29ya2VkIG9yIG5vdC5cclxuICAgICAgICAvLyB0aGlzIGlzIG1vcmUgZWFzaWx5IG1pbmlmaWFibGUsIGhlbmNlIGl0cyB1c2UuIC0tIHNpbmtcclxuICAgICAgICBjb25zdCBzdWNjZXNzID0gUmVmbGVjdC5kZWZpbmVQcm9wZXJ0eShmdW5jUGFyZW50LCBmdW5jTmFtZSwge1xyXG4gICAgICAgICAgICB2YWx1ZTogcGF0Y2gubyxcclxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoIXN1Y2Nlc3MpXHJcbiAgICAgICAgICAgIGZ1bmNQYXJlbnRbZnVuY05hbWVdID0gcGF0Y2gubztcclxuICAgICAgICBkZWxldGUgcGF0Y2hlZE9iamVjdFtmdW5jTmFtZV07XHJcbiAgICB9XHJcbiAgICBpZiAoT2JqZWN0LmtleXMocGF0Y2hlZE9iamVjdCkubGVuZ3RoID09IDApXHJcbiAgICAgICAgcGF0Y2hlZE9iamVjdHMuZGVsZXRlKGZ1bmNQYXJlbnQpO1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHVuUGF0Y2hBbGwoKSB7XHJcbiAgICBmb3IgKGNvbnN0IFtwYXJlbnRPYmplY3QsIHBhdGNoZWRPYmplY3RdIG9mIHBhdGNoZWRPYmplY3RzLmVudHJpZXMoKSlcclxuICAgICAgICBmb3IgKGNvbnN0IGZ1bmNOYW1lIGluIHBhdGNoZWRPYmplY3QpXHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgaG9va1R5cGUgb2YgcGF0Y2hUeXBlcylcclxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaG9va0lkIG9mIHBhdGNoZWRPYmplY3RbZnVuY05hbWVdPy5baG9va1R5cGVdLmtleXMoKSA/PyBbXSlcclxuICAgICAgICAgICAgICAgICAgICB1blBhdGNoKHBhcmVudE9iamVjdCwgZnVuY05hbWUsIGhvb2tJZCwgaG9va1R5cGUpO1xyXG59XHJcbiIsICIvLyBjdXJyaWVkIC0gZ2V0UGF0Y2hGdW5jKFwiYmVmb3JlXCIpKC4uLilcclxuLy8gYWxsb3dzIHVzIHRvIGFwcGx5IGFuIGFyZ3VtZW50IHdoaWxlIGxlYXZpbmcgdGhlIHJlc3Qgb3BlbiBtdWNoIGNsZWFuZXIuXHJcbi8vIGZ1bmN0aW9uYWwgcHJvZ3JhbW1pbmcgc3RyaWtlcyBhZ2FpbiEgLS0gc2lua1xyXG5pbXBvcnQgaG9vayBmcm9tIFwiLi9ob29rLmpzXCI7XHJcbmltcG9ydCB7IHBhdGNoZWRPYmplY3RzIH0gZnJvbSBcIi4vc2hhcmVkLmpzXCI7XHJcbmltcG9ydCB7IHVuUGF0Y2ggfSBmcm9tIFwiLi91bi1wYXRjaC5qc1wiO1xyXG4vLyBjcmVhdGVzIGEgaG9vayBpZiBuZWVkZWQsIGVsc2UganVzdCBhZGRzIG9uZSB0byB0aGUgcGF0Y2hlcyBhcnJheVxyXG5leHBvcnQgZGVmYXVsdCAocGF0Y2hUeXBlKSA9PiAoZnVuY05hbWUsIGZ1bmNQYXJlbnQsIGNhbGxiYWNrLCBvbmVUaW1lID0gZmFsc2UpID0+IHtcclxuICAgIGlmICh0eXBlb2YgZnVuY1BhcmVudFtmdW5jTmFtZV0gIT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7ZnVuY05hbWV9IGlzIG5vdCBhIGZ1bmN0aW9uIGluICR7ZnVuY1BhcmVudC5jb25zdHJ1Y3Rvci5uYW1lfWApO1xyXG4gICAgaWYgKCFwYXRjaGVkT2JqZWN0cy5oYXMoZnVuY1BhcmVudCkpXHJcbiAgICAgICAgcGF0Y2hlZE9iamVjdHMuc2V0KGZ1bmNQYXJlbnQsIHt9KTtcclxuICAgIGNvbnN0IHBhcmVudEluamVjdGlvbnMgPSBwYXRjaGVkT2JqZWN0cy5nZXQoZnVuY1BhcmVudCk7XHJcbiAgICBpZiAoIXBhcmVudEluamVjdGlvbnNbZnVuY05hbWVdKSB7XHJcbiAgICAgICAgY29uc3Qgb3JpZ0Z1bmMgPSBmdW5jUGFyZW50W2Z1bmNOYW1lXTtcclxuICAgICAgICAvLyBub3RlIHRvIGZ1dHVyZSBtZSBvcHRpbWlzaW5nIGZvciBzaXplOiBleHRyYWN0aW5nIG5ldyBNYXAoKSB0byBhIGZ1bmMgaW5jcmVhc2VzIHNpemUgLS1zaW5rXHJcbiAgICAgICAgcGFyZW50SW5qZWN0aW9uc1tmdW5jTmFtZV0gPSB7XHJcbiAgICAgICAgICAgIG86IG9yaWdGdW5jLFxyXG4gICAgICAgICAgICBiOiBuZXcgTWFwKCksXHJcbiAgICAgICAgICAgIGk6IG5ldyBNYXAoKSxcclxuICAgICAgICAgICAgYTogbmV3IE1hcCgpLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29uc3QgcnVuSG9vayA9IChjdHh0LCBhcmdzLCBjb25zdHJ1Y3QpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcmV0ID0gaG9vayhmdW5jTmFtZSwgZnVuY1BhcmVudCwgYXJncywgY3R4dCwgY29uc3RydWN0KTtcclxuICAgICAgICAgICAgaWYgKG9uZVRpbWUpXHJcbiAgICAgICAgICAgICAgICB1bnBhdGNoVGhpc1BhdGNoKCk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXQ7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCByZXBsYWNlUHJveHkgPSBuZXcgUHJveHkob3JpZ0Z1bmMsIHtcclxuICAgICAgICAgICAgYXBwbHk6IChfLCBjdHh0LCBhcmdzKSA9PiBydW5Ib29rKGN0eHQsIGFyZ3MsIGZhbHNlKSxcclxuICAgICAgICAgICAgY29uc3RydWN0OiAoXywgYXJncykgPT4gcnVuSG9vayhvcmlnRnVuYywgYXJncywgdHJ1ZSksXHJcbiAgICAgICAgICAgIGdldDogKHRhcmdldCwgcHJvcCwgcmVjZWl2ZXIpID0+IHByb3AgPT0gXCJ0b1N0cmluZ1wiXHJcbiAgICAgICAgICAgICAgICA/IG9yaWdGdW5jLnRvU3RyaW5nLmJpbmQob3JpZ0Z1bmMpXHJcbiAgICAgICAgICAgICAgICA6IFJlZmxlY3QuZ2V0KHRhcmdldCwgcHJvcCwgcmVjZWl2ZXIpLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIHRoaXMgd29ya3MgYXJvdW5kIGJyZWFraW5nIHNvbWUgYXN5bmMgZmluZCBpbXBsZW1lbnRhdGlvbiB3aGljaCBsaXN0ZW5zIGZvciBhc3NpZ25zIHZpYSBwcm94eVxyXG4gICAgICAgIC8vIHNlZSBjb21tZW50IGluIHVucGF0Y2gudHNcclxuICAgICAgICBjb25zdCBzdWNjZXNzID0gUmVmbGVjdC5kZWZpbmVQcm9wZXJ0eShmdW5jUGFyZW50LCBmdW5jTmFtZSwge1xyXG4gICAgICAgICAgICB2YWx1ZTogcmVwbGFjZVByb3h5LFxyXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICghc3VjY2VzcylcclxuICAgICAgICAgICAgZnVuY1BhcmVudFtmdW5jTmFtZV0gPSByZXBsYWNlUHJveHk7XHJcbiAgICAgICAgZnVuY1BhcmVudFtmdW5jTmFtZV0uX19vcmlnaW5hbF9fID0gcGFyZW50SW5qZWN0aW9uc1tmdW5jTmFtZV0ubztcclxuICAgIH1cclxuICAgIGNvbnN0IGhvb2tJZCA9IFN5bWJvbCgpO1xyXG4gICAgY29uc3QgdW5wYXRjaFRoaXNQYXRjaCA9ICgpID0+IHVuUGF0Y2goZnVuY1BhcmVudCwgZnVuY05hbWUsIGhvb2tJZCwgcGF0Y2hUeXBlKTtcclxuICAgIHBhcmVudEluamVjdGlvbnNbZnVuY05hbWVdW3BhdGNoVHlwZV0uc2V0KGhvb2tJZCwgY2FsbGJhY2spO1xyXG4gICAgcmV0dXJuIHVucGF0Y2hUaGlzUGF0Y2g7XHJcbn07XHJcbiIsICJpbXBvcnQgZ2V0UGF0Y2hGdW5jIGZyb20gXCIuL2dldC1wYXRjaC1mdW5jLmpzXCI7XHJcbmltcG9ydCB7IHVuUGF0Y2hBbGwgfSBmcm9tIFwiLi91bi1wYXRjaC5qc1wiO1xyXG5pbXBvcnQgeyBwYXRjaGVkT2JqZWN0cyBhcyBwYXRjaGVkIH0gZnJvbSBcIi4vc2hhcmVkLmpzXCI7XHJcbmNvbnN0IGJlZm9yZSA9IGdldFBhdGNoRnVuYyhcImJcIik7XHJcbmNvbnN0IGluc3RlYWQgPSBnZXRQYXRjaEZ1bmMoXCJpXCIpO1xyXG5jb25zdCBhZnRlciA9IGdldFBhdGNoRnVuYyhcImFcIik7XHJcbmV4cG9ydCB7IGluc3RlYWQsIGJlZm9yZSwgYWZ0ZXIsIHVuUGF0Y2hBbGwsIHBhdGNoZWQgfTtcclxuIiwgImltcG9ydCAqIGFzIHNwaXRSb2FzdCBmcm9tIFwiLi4vLi4vbGliL3NwaXRyb2FzdC9kaXN0L2VzbVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIF9fY2FjaGVfXzoge1xyXG4gICAgcGF0Y2hlZDogc3BpdFJvYXN0LnBhdGNoZWQsXHJcbiAgfSxcclxuICBiZWZvcmU6IHNwaXRSb2FzdC5iZWZvcmUsXHJcbiAgYWZ0ZXI6IHNwaXRSb2FzdC5hZnRlcixcclxuICBpbnN0ZWFkOiBzcGl0Um9hc3QuaW5zdGVhZCxcclxuICB1blBhdGNoQWxsOiBzcGl0Um9hc3QudW5QYXRjaEFsbCxcclxuICBpbmplY3RDU1MoY3NzKSB7XHJcbiAgICBjb25zdCBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcclxuICAgIHN0eWxlLmNsYXNzTmFtZSA9IGBhY29yZC0taW5qZWN0ZWQtY3NzYDtcclxuICAgIHN0eWxlLnRleHRDb250ZW50ID0gY3NzO1xyXG4gICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XHJcblxyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgc3R5bGU/LnJlbW92ZSgpO1xyXG4gICAgfTtcclxuICB9LFxyXG4gIHVuUGF0Y2hBbGxDU1MoKSB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmFjb3JkLS1pbmplY3RlZC1jc3NcIikuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgZWxlbWVudC5yZW1vdmUoKTtcclxuICAgIH0pXHJcbiAgfVxyXG59IiwgImV4cG9ydCBkZWZhdWx0IGBcbkBrZXlmcmFtZXMgYWNvcmRMb2FkaW5nRmFkZXswJXtvcGFjaXR5Oi4xfTEwMCV7b3BhY2l0eTouOX19LmFjb3JkLS1zdGFydHVwLWxvYWRpbmd7YW5pbWF0aW9uOmFjb3JkTG9hZGluZ0ZhZGUgLjVzIGFsdGVybmF0ZSBpbmZpbml0ZSBsaW5lYXI7cG9zaXRpb246YWJzb2x1dGU7dHJhbnNpdGlvbjphbGwgLjVzIGxpbmVhcjtyaWdodDo4cHg7Ym90dG9tOjhweDt3aWR0aDoxNnB4O2hlaWdodDoxNnB4O2JhY2tncm91bmQtaW1hZ2U6dXJsKFwiaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL0Fjb3JkUGx1Z2luL2Fzc2V0cy9tYWluL0Fjb3JkLnN2Z1wiKTtmaWx0ZXI6Z3JheXNjYWxlKDEpIGJyaWdodG5lc3MoMSk7YmFja2dyb3VuZC1wb3NpdGlvbjpjZW50ZXI7YmFja2dyb3VuZC1yZXBlYXQ6bm8tcmVwZWF0O2JhY2tncm91bmQtc2l6ZTpjb250YWluO3otaW5kZXg6OTk5OTk5fS5hY29yZC0tc3RhcnR1cC1sb2FkaW5nLmhpZGRlbntvcGFjaXR5OjAgIWltcG9ydGFudH1gO1xuIiwgImltcG9ydCBkb20gZnJvbSBcIi4uLy4uL2FwaS9kb20vaW5kZXguanNcIjtcclxuaW1wb3J0IHBhdGNoZXIgZnJvbSBcIi4uLy4uL2FwaS9wYXRjaGVyL2luZGV4LmpzXCI7XHJcblxyXG5pbXBvcnQgY3NzVGV4dCBmcm9tIFwiLi9zdHlsZS5zY3NzXCI7XHJcbmxldCB1bkluamVjdDtcclxuXHJcbmFzeW5jIGZ1bmN0aW9uIHNob3coKSB7XHJcbiAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWNvcmQtLXN0YXJ0dXAtbG9hZGluZ1wiKSkgcmV0dXJuO1xyXG4gIHdoaWxlICh0cnVlKSB7XHJcbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhcHAtbW91bnRcIikpIGJyZWFrO1xyXG4gICAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgMTAwKSk7XHJcbiAgfVxyXG4gIGNvbnNvbGUubG9nKFwiYWNvcmQtLXN0YXJ0dXAtbG9hZGluZ1wiKTtcclxuICB1bkluamVjdCA9IHBhdGNoZXIuaW5qZWN0Q1NTKGNzc1RleHQpO1xyXG4gIGNvbnN0IGVsZW1lbnQgPSBkb20ucGFyc2UoYFxyXG4gICAgPGRpdiBjbGFzcz1cImFjb3JkLS1zdGFydHVwLWxvYWRpbmdcIj48L2Rpdj5cclxuICBgKVxyXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYXBwLW1vdW50XCIpLmFwcGVuZENoaWxkKGVsZW1lbnQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBoaWRlKCkge1xyXG4gIGxldCBlbG0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFjb3JkLS1zdGFydHVwLWxvYWRpbmdcIik7XHJcbiAgaWYgKGVsbSkge1xyXG4gICAgZWxtLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgZWxtLnJlbW92ZSgpO1xyXG4gICAgICB1bkluamVjdD8uKCk7XHJcbiAgICAgIHVuSW5qZWN0ID0gbnVsbDtcclxuICAgIH0sIDUwMCk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgc2hvdyxcclxuICBoaWRlXHJcbn0iLCAibGV0IGRldk1vZGVFbmFibGVkID0gZmFsc2U7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgZ2V0IGVuYWJsZWQoKSB7XHJcbiAgICByZXR1cm4gZGV2TW9kZUVuYWJsZWQ7XHJcbiAgfSxcclxuICBzZXQgZW5hYmxlZCh2YWx1ZSkge1xyXG4gICAgaWYgKCFnbG9iYWxUaGlzW1wiPFBSRUxPQURfS0VZPlwiXS5pc0RldlRvb2xzT3BlbigpKSB0aHJvdyBuZXcgRXJyb3IoXCJEZXYgbW9kZSBzdGF0dXMgY2FuIG9ubHkgYmUgbW9kaWZpZWQgd2hlbiBEZXZUb29scyBpcyBvcGVuIVwiKTtcclxuICAgIGRldk1vZGVFbmFibGVkID0gdmFsdWU7XHJcbiAgfVxyXG59XHJcblxyXG4vLyBUT0RPOiBhZGQgbGl2ZSBkZXZlbG9wbWVudCBtb2RlIiwgImltcG9ydCBtb2R1bGVzIGZyb20gXCIuLi9tb2R1bGVzL2luZGV4LmpzXCJcclxuaW1wb3J0IHV0aWxzIGZyb20gXCIuLi91dGlscy9pbmRleC5qc1wiO1xyXG5cclxuY29uc3QgQkFTRV9VUkwgPSBcImh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9hY29yZC1zdGFuZGFsb25lL2Fzc2V0cy9tYWluL2kxOG5cIjtcclxuY29uc3Qgbm9TdG9yZSA9IHsgY2FjaGU6IFwibm8tc3RvcmVcIiB9O1xyXG5cclxuXHJcbmNvbnN0IG91dCA9IHtcclxuICBfX2NhY2hlX186IHtcclxuICAgIGxvY2FsZUlkczogW10sXHJcbiAgICBsb2NhbGl6YXRpb25zOiB7fVxyXG4gIH0sXHJcbiAgZ2V0IGxvY2FsZSgpIHtcclxuICAgIHJldHVybiBtb2R1bGVzLmNvbW1vbi5pMThuLl9yZXF1ZXN0ZWRMb2NhbGU7XHJcbiAgfSxcclxuICBnZXQoa2V5KSB7XHJcbiAgICBjaGVjaygpO1xyXG4gICAgcmV0dXJuIG91dC5fX2NhY2hlX18ubG9jYWxpemF0aW9uc1tvdXQubG9jYWxlXT8uW2tleV1cclxuICAgICAgfHwgb3V0Ll9fY2FjaGVfXy5sb2NhbGl6YXRpb25zLmRlZmF1bHQ/LltrZXldXHJcbiAgICAgIHx8IG1vZHVsZXMuY29tbW9uLmkxOG4uTWVzc2FnZXNba2V5XVxyXG4gICAgICB8fCBrZXk7XHJcbiAgfSxcclxuICBtZXNzYWdlczogbmV3IFByb3h5KHt9LCB7XHJcbiAgICBnZXQoXywgcHJvcCkge1xyXG4gICAgICByZXR1cm4gb3V0LmdldChwcm9wKTtcclxuICAgIH1cclxuICB9KSxcclxuICBsb2NhbGl6ZShzdHIpIHtcclxuICAgIGlmICh0eXBlb2Ygc3RyID09PSBcInN0cmluZ1wiKSByZXR1cm4gc3RyO1xyXG4gICAgcmV0dXJuIHN0cj8uW291dC5sb2NhbGVdXHJcbiAgICAgIHx8IHN0cj8uZGVmYXVsdFxyXG4gICAgICB8fCBPYmplY3QudmFsdWVzKHN0cilbMF07XHJcbiAgfSxcclxuICBmb3JtYXQoa2V5LCAuLi5hcmdzKSB7XHJcbiAgICByZXR1cm4gdXRpbHMuZm9ybWF0KG91dC5nZXQoa2V5KSwgLi4uYXJncyk7XHJcbiAgfVxyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBjaGVjaygpIHtcclxuICBjb25zdCBsb2NhbGUgPSBvdXQubG9jYWxlO1xyXG4gIGlmICghb3V0Ll9fY2FjaGVfXy5sb2NhbGVJZHMubGVuZ3RoKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBvdXQuX19jYWNoZV9fLmxvY2FsZUlkcyA9IGF3YWl0IChhd2FpdCBmZXRjaChgJHtCQVNFX1VSTH0vbG9jYWxlcy5qc29uYCwgbm9TdG9yZSkpLmpzb24oKTtcclxuICAgIH0gY2F0Y2ggeyB9XHJcbiAgICB0cnkge1xyXG4gICAgICBvdXQuX19jYWNoZV9fLmxvY2FsaXphdGlvbnMuZGVmYXVsdCA9IGF3YWl0IChhd2FpdCBmZXRjaChgJHtCQVNFX1VSTH0vZGVmYXVsdC5qc29uYCwgbm9TdG9yZSkpLmpzb24oKTtcclxuICAgIH0gY2F0Y2ggeyB9XHJcbiAgfVxyXG4gIGlmIChcclxuICAgIG91dC5fX2NhY2hlX18ubG9jYWxlSWRzLmluY2x1ZGVzKGxvY2FsZSlcclxuICAgICYmICFvdXQuX19jYWNoZV9fLmxvY2FsaXphdGlvbnM/Lltsb2NhbGVdXHJcbiAgKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBvdXQuX19jYWNoZV9fLmxvY2FsaXphdGlvbnNbbG9jYWxlXSA9IGF3YWl0IChhd2FpdCBmZXRjaChgJHtCQVNFX1VSTH0vJHtsb2NhbGV9Lmpzb25gLCBub1N0b3JlKSkuanNvbigpO1xyXG4gICAgfSBjYXRjaCB7IH07XHJcbiAgfVxyXG59XHJcblxyXG5jaGVjaygpO1xyXG5leHBvcnQgZGVmYXVsdCBvdXQ7IiwgImltcG9ydCAqIGFzIG5lc3RzIGZyb20gXCJuZXN0c1wiO1xyXG5pbXBvcnQgKiBhcyBpZGJLZXl2YWwgZnJvbSBcImlkYi1rZXl2YWxcIjtcclxuaW1wb3J0IHsgZGVDeWNsZWQsIHJldml2ZSB9IGZyb20gXCIuLi8uLi9saWIvanNvbi1kZWN5Y2xlZFwiO1xyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgYXN5bmMgY3JlYXRlUGVyc2lzdE5lc3Qoc3VmZml4KSB7XHJcbiAgICBsZXQgY2FjaGVkID0gYXdhaXQgaWRiS2V5dmFsLmdldChgQWNvcmRTdG9yZTske3N1ZmZpeH1gKTtcclxuICAgIGlmICh0eXBlb2YgY2FjaGVkID09IFwic3RyaW5nXCIpIGNhY2hlZCA9IHJldml2ZShjYWNoZWQpO1xyXG4gICAgY29uc3QgbmVzdCA9IG5lc3RzLm1ha2UoY2FjaGVkID8/IHt9KTtcclxuXHJcbiAgICBjb25zdCBzYXZlID0gKCkgPT4ge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGlkYktleXZhbC5zZXQoYEFjb3JkU3RvcmU7JHtzdWZmaXh9YCwgZGVDeWNsZWQoeyAuLi5uZXN0Lmdob3N0IH0pKTtcclxuICAgICAgfSBjYXRjaCB7XHJcbiAgICAgICAgaWRiS2V5dmFsLnNldChgQWNvcmRTdG9yZTske3N1ZmZpeH1gLCBkZUN5Y2xlZCh7fSkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbmVzdC5vbihuZXN0cy5FdmVudHMuU0VULCBzYXZlKTtcclxuICAgIG5lc3Qub24obmVzdHMuRXZlbnRzLlVQREFURSwgc2F2ZSk7XHJcbiAgICBuZXN0Lm9uKG5lc3RzLkV2ZW50cy5ERUxFVEUsIHNhdmUpO1xyXG5cclxuICAgIHJldHVybiBuZXN0O1xyXG4gIH1cclxufSIsICJmdW5jdGlvbiBwcm9taXNpZnlSZXF1ZXN0KHJlcXVlc3QpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAvLyBAdHMtaWdub3JlIC0gZmlsZSBzaXplIGhhY2tzXG4gICAgICAgIHJlcXVlc3Qub25jb21wbGV0ZSA9IHJlcXVlc3Qub25zdWNjZXNzID0gKCkgPT4gcmVzb2x2ZShyZXF1ZXN0LnJlc3VsdCk7XG4gICAgICAgIC8vIEB0cy1pZ25vcmUgLSBmaWxlIHNpemUgaGFja3NcbiAgICAgICAgcmVxdWVzdC5vbmFib3J0ID0gcmVxdWVzdC5vbmVycm9yID0gKCkgPT4gcmVqZWN0KHJlcXVlc3QuZXJyb3IpO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gY3JlYXRlU3RvcmUoZGJOYW1lLCBzdG9yZU5hbWUpIHtcbiAgICBjb25zdCByZXF1ZXN0ID0gaW5kZXhlZERCLm9wZW4oZGJOYW1lKTtcbiAgICByZXF1ZXN0Lm9udXBncmFkZW5lZWRlZCA9ICgpID0+IHJlcXVlc3QucmVzdWx0LmNyZWF0ZU9iamVjdFN0b3JlKHN0b3JlTmFtZSk7XG4gICAgY29uc3QgZGJwID0gcHJvbWlzaWZ5UmVxdWVzdChyZXF1ZXN0KTtcbiAgICByZXR1cm4gKHR4TW9kZSwgY2FsbGJhY2spID0+IGRicC50aGVuKChkYikgPT4gY2FsbGJhY2soZGIudHJhbnNhY3Rpb24oc3RvcmVOYW1lLCB0eE1vZGUpLm9iamVjdFN0b3JlKHN0b3JlTmFtZSkpKTtcbn1cbmxldCBkZWZhdWx0R2V0U3RvcmVGdW5jO1xuZnVuY3Rpb24gZGVmYXVsdEdldFN0b3JlKCkge1xuICAgIGlmICghZGVmYXVsdEdldFN0b3JlRnVuYykge1xuICAgICAgICBkZWZhdWx0R2V0U3RvcmVGdW5jID0gY3JlYXRlU3RvcmUoJ2tleXZhbC1zdG9yZScsICdrZXl2YWwnKTtcbiAgICB9XG4gICAgcmV0dXJuIGRlZmF1bHRHZXRTdG9yZUZ1bmM7XG59XG4vKipcbiAqIEdldCBhIHZhbHVlIGJ5IGl0cyBrZXkuXG4gKlxuICogQHBhcmFtIGtleVxuICogQHBhcmFtIGN1c3RvbVN0b3JlIE1ldGhvZCB0byBnZXQgYSBjdXN0b20gc3RvcmUuIFVzZSB3aXRoIGNhdXRpb24gKHNlZSB0aGUgZG9jcykuXG4gKi9cbmZ1bmN0aW9uIGdldChrZXksIGN1c3RvbVN0b3JlID0gZGVmYXVsdEdldFN0b3JlKCkpIHtcbiAgICByZXR1cm4gY3VzdG9tU3RvcmUoJ3JlYWRvbmx5JywgKHN0b3JlKSA9PiBwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLmdldChrZXkpKSk7XG59XG4vKipcbiAqIFNldCBhIHZhbHVlIHdpdGggYSBrZXkuXG4gKlxuICogQHBhcmFtIGtleVxuICogQHBhcmFtIHZhbHVlXG4gKiBAcGFyYW0gY3VzdG9tU3RvcmUgTWV0aG9kIHRvIGdldCBhIGN1c3RvbSBzdG9yZS4gVXNlIHdpdGggY2F1dGlvbiAoc2VlIHRoZSBkb2NzKS5cbiAqL1xuZnVuY3Rpb24gc2V0KGtleSwgdmFsdWUsIGN1c3RvbVN0b3JlID0gZGVmYXVsdEdldFN0b3JlKCkpIHtcbiAgICByZXR1cm4gY3VzdG9tU3RvcmUoJ3JlYWR3cml0ZScsIChzdG9yZSkgPT4ge1xuICAgICAgICBzdG9yZS5wdXQodmFsdWUsIGtleSk7XG4gICAgICAgIHJldHVybiBwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLnRyYW5zYWN0aW9uKTtcbiAgICB9KTtcbn1cbi8qKlxuICogU2V0IG11bHRpcGxlIHZhbHVlcyBhdCBvbmNlLiBUaGlzIGlzIGZhc3RlciB0aGFuIGNhbGxpbmcgc2V0KCkgbXVsdGlwbGUgdGltZXMuXG4gKiBJdCdzIGFsc28gYXRvbWljIFx1MjAxMyBpZiBvbmUgb2YgdGhlIHBhaXJzIGNhbid0IGJlIGFkZGVkLCBub25lIHdpbGwgYmUgYWRkZWQuXG4gKlxuICogQHBhcmFtIGVudHJpZXMgQXJyYXkgb2YgZW50cmllcywgd2hlcmUgZWFjaCBlbnRyeSBpcyBhbiBhcnJheSBvZiBgW2tleSwgdmFsdWVdYC5cbiAqIEBwYXJhbSBjdXN0b21TdG9yZSBNZXRob2QgdG8gZ2V0IGEgY3VzdG9tIHN0b3JlLiBVc2Ugd2l0aCBjYXV0aW9uIChzZWUgdGhlIGRvY3MpLlxuICovXG5mdW5jdGlvbiBzZXRNYW55KGVudHJpZXMsIGN1c3RvbVN0b3JlID0gZGVmYXVsdEdldFN0b3JlKCkpIHtcbiAgICByZXR1cm4gY3VzdG9tU3RvcmUoJ3JlYWR3cml0ZScsIChzdG9yZSkgPT4ge1xuICAgICAgICBlbnRyaWVzLmZvckVhY2goKGVudHJ5KSA9PiBzdG9yZS5wdXQoZW50cnlbMV0sIGVudHJ5WzBdKSk7XG4gICAgICAgIHJldHVybiBwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLnRyYW5zYWN0aW9uKTtcbiAgICB9KTtcbn1cbi8qKlxuICogR2V0IG11bHRpcGxlIHZhbHVlcyBieSB0aGVpciBrZXlzXG4gKlxuICogQHBhcmFtIGtleXNcbiAqIEBwYXJhbSBjdXN0b21TdG9yZSBNZXRob2QgdG8gZ2V0IGEgY3VzdG9tIHN0b3JlLiBVc2Ugd2l0aCBjYXV0aW9uIChzZWUgdGhlIGRvY3MpLlxuICovXG5mdW5jdGlvbiBnZXRNYW55KGtleXMsIGN1c3RvbVN0b3JlID0gZGVmYXVsdEdldFN0b3JlKCkpIHtcbiAgICByZXR1cm4gY3VzdG9tU3RvcmUoJ3JlYWRvbmx5JywgKHN0b3JlKSA9PiBQcm9taXNlLmFsbChrZXlzLm1hcCgoa2V5KSA9PiBwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLmdldChrZXkpKSkpKTtcbn1cbi8qKlxuICogVXBkYXRlIGEgdmFsdWUuIFRoaXMgbGV0cyB5b3Ugc2VlIHRoZSBvbGQgdmFsdWUgYW5kIHVwZGF0ZSBpdCBhcyBhbiBhdG9taWMgb3BlcmF0aW9uLlxuICpcbiAqIEBwYXJhbSBrZXlcbiAqIEBwYXJhbSB1cGRhdGVyIEEgY2FsbGJhY2sgdGhhdCB0YWtlcyB0aGUgb2xkIHZhbHVlIGFuZCByZXR1cm5zIGEgbmV3IHZhbHVlLlxuICogQHBhcmFtIGN1c3RvbVN0b3JlIE1ldGhvZCB0byBnZXQgYSBjdXN0b20gc3RvcmUuIFVzZSB3aXRoIGNhdXRpb24gKHNlZSB0aGUgZG9jcykuXG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZShrZXksIHVwZGF0ZXIsIGN1c3RvbVN0b3JlID0gZGVmYXVsdEdldFN0b3JlKCkpIHtcbiAgICByZXR1cm4gY3VzdG9tU3RvcmUoJ3JlYWR3cml0ZScsIChzdG9yZSkgPT4gXG4gICAgLy8gTmVlZCB0byBjcmVhdGUgdGhlIHByb21pc2UgbWFudWFsbHkuXG4gICAgLy8gSWYgSSB0cnkgdG8gY2hhaW4gcHJvbWlzZXMsIHRoZSB0cmFuc2FjdGlvbiBjbG9zZXMgaW4gYnJvd3NlcnNcbiAgICAvLyB0aGF0IHVzZSBhIHByb21pc2UgcG9seWZpbGwgKElFMTAvMTEpLlxuICAgIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgc3RvcmUuZ2V0KGtleSkub25zdWNjZXNzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBzdG9yZS5wdXQodXBkYXRlcih0aGlzLnJlc3VsdCksIGtleSk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLnRyYW5zYWN0aW9uKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSkpO1xufVxuLyoqXG4gKiBEZWxldGUgYSBwYXJ0aWN1bGFyIGtleSBmcm9tIHRoZSBzdG9yZS5cbiAqXG4gKiBAcGFyYW0ga2V5XG4gKiBAcGFyYW0gY3VzdG9tU3RvcmUgTWV0aG9kIHRvIGdldCBhIGN1c3RvbSBzdG9yZS4gVXNlIHdpdGggY2F1dGlvbiAoc2VlIHRoZSBkb2NzKS5cbiAqL1xuZnVuY3Rpb24gZGVsKGtleSwgY3VzdG9tU3RvcmUgPSBkZWZhdWx0R2V0U3RvcmUoKSkge1xuICAgIHJldHVybiBjdXN0b21TdG9yZSgncmVhZHdyaXRlJywgKHN0b3JlKSA9PiB7XG4gICAgICAgIHN0b3JlLmRlbGV0ZShrZXkpO1xuICAgICAgICByZXR1cm4gcHJvbWlzaWZ5UmVxdWVzdChzdG9yZS50cmFuc2FjdGlvbik7XG4gICAgfSk7XG59XG4vKipcbiAqIERlbGV0ZSBtdWx0aXBsZSBrZXlzIGF0IG9uY2UuXG4gKlxuICogQHBhcmFtIGtleXMgTGlzdCBvZiBrZXlzIHRvIGRlbGV0ZS5cbiAqIEBwYXJhbSBjdXN0b21TdG9yZSBNZXRob2QgdG8gZ2V0IGEgY3VzdG9tIHN0b3JlLiBVc2Ugd2l0aCBjYXV0aW9uIChzZWUgdGhlIGRvY3MpLlxuICovXG5mdW5jdGlvbiBkZWxNYW55KGtleXMsIGN1c3RvbVN0b3JlID0gZGVmYXVsdEdldFN0b3JlKCkpIHtcbiAgICByZXR1cm4gY3VzdG9tU3RvcmUoJ3JlYWR3cml0ZScsIChzdG9yZSkgPT4ge1xuICAgICAgICBrZXlzLmZvckVhY2goKGtleSkgPT4gc3RvcmUuZGVsZXRlKGtleSkpO1xuICAgICAgICByZXR1cm4gcHJvbWlzaWZ5UmVxdWVzdChzdG9yZS50cmFuc2FjdGlvbik7XG4gICAgfSk7XG59XG4vKipcbiAqIENsZWFyIGFsbCB2YWx1ZXMgaW4gdGhlIHN0b3JlLlxuICpcbiAqIEBwYXJhbSBjdXN0b21TdG9yZSBNZXRob2QgdG8gZ2V0IGEgY3VzdG9tIHN0b3JlLiBVc2Ugd2l0aCBjYXV0aW9uIChzZWUgdGhlIGRvY3MpLlxuICovXG5mdW5jdGlvbiBjbGVhcihjdXN0b21TdG9yZSA9IGRlZmF1bHRHZXRTdG9yZSgpKSB7XG4gICAgcmV0dXJuIGN1c3RvbVN0b3JlKCdyZWFkd3JpdGUnLCAoc3RvcmUpID0+IHtcbiAgICAgICAgc3RvcmUuY2xlYXIoKTtcbiAgICAgICAgcmV0dXJuIHByb21pc2lmeVJlcXVlc3Qoc3RvcmUudHJhbnNhY3Rpb24pO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gZWFjaEN1cnNvcihzdG9yZSwgY2FsbGJhY2spIHtcbiAgICBzdG9yZS5vcGVuQ3Vyc29yKCkub25zdWNjZXNzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXRoaXMucmVzdWx0KVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjYWxsYmFjayh0aGlzLnJlc3VsdCk7XG4gICAgICAgIHRoaXMucmVzdWx0LmNvbnRpbnVlKCk7XG4gICAgfTtcbiAgICByZXR1cm4gcHJvbWlzaWZ5UmVxdWVzdChzdG9yZS50cmFuc2FjdGlvbik7XG59XG4vKipcbiAqIEdldCBhbGwga2V5cyBpbiB0aGUgc3RvcmUuXG4gKlxuICogQHBhcmFtIGN1c3RvbVN0b3JlIE1ldGhvZCB0byBnZXQgYSBjdXN0b20gc3RvcmUuIFVzZSB3aXRoIGNhdXRpb24gKHNlZSB0aGUgZG9jcykuXG4gKi9cbmZ1bmN0aW9uIGtleXMoY3VzdG9tU3RvcmUgPSBkZWZhdWx0R2V0U3RvcmUoKSkge1xuICAgIHJldHVybiBjdXN0b21TdG9yZSgncmVhZG9ubHknLCAoc3RvcmUpID0+IHtcbiAgICAgICAgLy8gRmFzdCBwYXRoIGZvciBtb2Rlcm4gYnJvd3NlcnNcbiAgICAgICAgaWYgKHN0b3JlLmdldEFsbEtleXMpIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLmdldEFsbEtleXMoKSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaXRlbXMgPSBbXTtcbiAgICAgICAgcmV0dXJuIGVhY2hDdXJzb3Ioc3RvcmUsIChjdXJzb3IpID0+IGl0ZW1zLnB1c2goY3Vyc29yLmtleSkpLnRoZW4oKCkgPT4gaXRlbXMpO1xuICAgIH0pO1xufVxuLyoqXG4gKiBHZXQgYWxsIHZhbHVlcyBpbiB0aGUgc3RvcmUuXG4gKlxuICogQHBhcmFtIGN1c3RvbVN0b3JlIE1ldGhvZCB0byBnZXQgYSBjdXN0b20gc3RvcmUuIFVzZSB3aXRoIGNhdXRpb24gKHNlZSB0aGUgZG9jcykuXG4gKi9cbmZ1bmN0aW9uIHZhbHVlcyhjdXN0b21TdG9yZSA9IGRlZmF1bHRHZXRTdG9yZSgpKSB7XG4gICAgcmV0dXJuIGN1c3RvbVN0b3JlKCdyZWFkb25seScsIChzdG9yZSkgPT4ge1xuICAgICAgICAvLyBGYXN0IHBhdGggZm9yIG1vZGVybiBicm93c2Vyc1xuICAgICAgICBpZiAoc3RvcmUuZ2V0QWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzaWZ5UmVxdWVzdChzdG9yZS5nZXRBbGwoKSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaXRlbXMgPSBbXTtcbiAgICAgICAgcmV0dXJuIGVhY2hDdXJzb3Ioc3RvcmUsIChjdXJzb3IpID0+IGl0ZW1zLnB1c2goY3Vyc29yLnZhbHVlKSkudGhlbigoKSA9PiBpdGVtcyk7XG4gICAgfSk7XG59XG4vKipcbiAqIEdldCBhbGwgZW50cmllcyBpbiB0aGUgc3RvcmUuIEVhY2ggZW50cnkgaXMgYW4gYXJyYXkgb2YgYFtrZXksIHZhbHVlXWAuXG4gKlxuICogQHBhcmFtIGN1c3RvbVN0b3JlIE1ldGhvZCB0byBnZXQgYSBjdXN0b20gc3RvcmUuIFVzZSB3aXRoIGNhdXRpb24gKHNlZSB0aGUgZG9jcykuXG4gKi9cbmZ1bmN0aW9uIGVudHJpZXMoY3VzdG9tU3RvcmUgPSBkZWZhdWx0R2V0U3RvcmUoKSkge1xuICAgIHJldHVybiBjdXN0b21TdG9yZSgncmVhZG9ubHknLCAoc3RvcmUpID0+IHtcbiAgICAgICAgLy8gRmFzdCBwYXRoIGZvciBtb2Rlcm4gYnJvd3NlcnNcbiAgICAgICAgLy8gKGFsdGhvdWdoLCBob3BlZnVsbHkgd2UnbGwgZ2V0IGEgc2ltcGxlciBwYXRoIHNvbWUgZGF5KVxuICAgICAgICBpZiAoc3RvcmUuZ2V0QWxsICYmIHN0b3JlLmdldEFsbEtleXMpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICAgICAgcHJvbWlzaWZ5UmVxdWVzdChzdG9yZS5nZXRBbGxLZXlzKCkpLFxuICAgICAgICAgICAgICAgIHByb21pc2lmeVJlcXVlc3Qoc3RvcmUuZ2V0QWxsKCkpLFxuICAgICAgICAgICAgXSkudGhlbigoW2tleXMsIHZhbHVlc10pID0+IGtleXMubWFwKChrZXksIGkpID0+IFtrZXksIHZhbHVlc1tpXV0pKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpdGVtcyA9IFtdO1xuICAgICAgICByZXR1cm4gY3VzdG9tU3RvcmUoJ3JlYWRvbmx5JywgKHN0b3JlKSA9PiBlYWNoQ3Vyc29yKHN0b3JlLCAoY3Vyc29yKSA9PiBpdGVtcy5wdXNoKFtjdXJzb3Iua2V5LCBjdXJzb3IudmFsdWVdKSkudGhlbigoKSA9PiBpdGVtcykpO1xuICAgIH0pO1xufVxuXG5leHBvcnQgeyBjbGVhciwgY3JlYXRlU3RvcmUsIGRlbCwgZGVsTWFueSwgZW50cmllcywgZ2V0LCBnZXRNYW55LCBrZXlzLCBwcm9taXNpZnlSZXF1ZXN0LCBzZXQsIHNldE1hbnksIHVwZGF0ZSwgdmFsdWVzIH07XG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5mdW5jdGlvbiBkZUN5Y2xlcih2YWwsIGNvbmZpZykge1xyXG4gIGNvbmZpZyA9IHR5cGVvZiBjb25maWcgPT09ICdudW1iZXInID8geyBkZWVwOiBjb25maWcgfSA6IChjb25maWcgfHwge30pO1xyXG4gIGNvbmZpZy5kZWVwID0gY29uZmlnLmRlZXAgfHwgMTA7XHJcbiAgcmV0dXJuIGRlY3ljbGVXYWxrZXIoW10sIFtdLCB2YWwsIGNvbmZpZyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRlQ3ljbGVkKHZhbCwgY29uZmlnKSB7XHJcbiAgY29uZmlnID0gdHlwZW9mIGNvbmZpZyA9PT0gJ251bWJlcicgPyB7IGRlZXA6IGNvbmZpZyB9IDogKGNvbmZpZyB8fCB7fSk7XHJcbiAgdmFsID0gZGVDeWNsZXIodmFsLCBjb25maWcpO1xyXG4gIHRyeSB7XHJcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodmFsLCB1bmRlZmluZWQsIGNvbmZpZy5zcGFjZXIpO1xyXG4gIH0gY2F0Y2ggKGUpIHtcclxuICAgIHJldHVybiBlO1xyXG4gIH1cclxufVxyXG5cclxudmFyIHJldml2ZXJEYXRlID0gL15cXFtEYXRlOigoXFxkezR9LVxcZHsyfS1cXGR7Mn0pW0EtWl0rKFxcZHsyfTpcXGR7Mn06XFxkezJ9KS4oWzAtOSstOl0rKVopXFxdJC87XHJcbnZhciByZXZpdmVyUmVnRXhwID0gL15cXFtSZWdleHA6XFwvKC4rKVxcL1xcXSQvO1xyXG52YXIgcmV2aXZlckVycm9yID0gL15cXFtFcnJvcjooW1xcV1xcd10rKVxcXSQvO1xyXG52YXIgcmV2aXZlckZ1bmN0aW9uID0gL15cXFtGdW5jdGlvbjooLispXFxdJC87XHJcbmZ1bmN0aW9uIHJldml2ZSh2YWwsIGZ1bmN0aW9ucykge1xyXG4gIHRyeSB7XHJcbiAgICByZXR1cm4gSlNPTi5wYXJzZSh2YWwsIHJldml2ZXIpO1xyXG4gIH0gY2F0Y2ggKGUpIHtcclxuICAgIHJldHVybiBlO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcmV2aXZlcihrZXksIHZhbCkge1xyXG4gICAgaWYgKHJldml2ZXJEYXRlLnRlc3QodmFsKSkge1xyXG4gICAgICB2YWwgPSByZXZpdmVyRGF0ZS5leGVjKHZhbCk7XHJcbiAgICAgIHZhbCA9IG5ldyBEYXRlKHZhbFsxXSk7XHJcbiAgICAgIHJldHVybiBuZXcgRGF0ZSh2YWwpO1xyXG4gICAgfSBlbHNlIGlmIChyZXZpdmVyUmVnRXhwLnRlc3QodmFsKSkge1xyXG4gICAgICB2YWwgPSByZXZpdmVyUmVnRXhwLmV4ZWModmFsKVsxXTtcclxuICAgICAgcmV0dXJuIG5ldyBSZWdFeHAodmFsKTtcclxuICAgIH0gZWxzZSBpZiAocmV2aXZlckVycm9yLnRlc3QodmFsKSkge1xyXG4gICAgICB2YWwgPSByZXZpdmVyRXJyb3IuZXhlYyh2YWwpWzFdO1xyXG4gICAgICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IodmFsLnNwbGl0KCdcXG4nKVswXSk7XHJcbiAgICAgIGlmIChlcnJvci5zdGFjaykge1xyXG4gICAgICAgIGVycm9yLnN0YWNrID0gdmFsO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBlcnJvcjtcclxuICAgIH0gZWxzZSBpZiAoZnVuY3Rpb25zICYmIHJldml2ZXJGdW5jdGlvbi50ZXN0KHZhbCkpIHtcclxuICAgICAgdmFsID0gcmV2aXZlckZ1bmN0aW9uLmV4ZWModmFsKVsxXTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICByZXR1cm4gKG5ldyBGdW5jdGlvbihcInJldHVybiBcIiArIHZhbCArIFwiO1wiKSkoKTtcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICByZXR1cm4gZXJyb3I7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB2YWw7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBkZWN5Y2xlV2Fsa2VyKHBhcmVudHMsIHBhdGgsIHZhbCwgY29uZmlnKSB7XHJcbiAgaWYgKFsndW5kZWZpbmVkJywgJ251bWJlcicsICdib29sZWFuJywgJ3N0cmluZyddLmluZGV4T2YodHlwZW9mIHZhbCkgPj0gMCB8fCB2YWwgPT09IG51bGwpIHtcclxuICAgIHJldHVybiB2YWw7XHJcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnb2JqZWN0JyAmJiB2YWwuY29uc3RydWN0b3IgPT09IERhdGUpIHtcclxuICAgIHJldHVybiBjb25maWcuZGF0ZXMgIT09IGZhbHNlID8gJ1tEYXRlOicgKyB2YWwudG9JU09TdHJpbmcoKSArICddJyA6IHZhbDtcclxuICAgIC8vdmFsLmZvcm1hdCgne1lZWVl9L3tNTX0ve0REfSB7aGh9OnttbX06e3NzfSBVVEM6XHUwMEI3e3BhcmFtcy50ej49MD9cIitcIitwYXJhbXMudHo6cGFyYW1zLnR6fVx1MDBCNycpO1xyXG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ29iamVjdCcgJiYgdmFsLmNvbnN0cnVjdG9yID09PSBSZWdFeHApIHtcclxuICAgIHJldHVybiBjb25maWcucmVnZXhwcyAhPT0gZmFsc2UgPyAnW1JlZ2V4cDonICsgdmFsLnRvU3RyaW5nKCkgKyAnXScgOiB2YWw7XHJcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnb2JqZWN0JyAmJiB2YWwuY29uc3RydWN0b3IgJiYgdHlwZW9mIHZhbC5jb25zdHJ1Y3Rvci5uYW1lID09PSAnc3RyaW5nJyAmJiB2YWwuY29uc3RydWN0b3IubmFtZS5zbGljZSgtNSkgPT09ICdFcnJvcicpIHtcclxuICAgIHZhciBzdGFjayA9ICh2YWwuc3RhY2sgfHwgJycpLnNwbGl0KCdcXG4nKS5zbGljZSgxKTtcclxuICAgIHZhciBtZXNzYWdlID0gKHZhbC5tZXNzYWdlIHx8IHZhbC50b1N0cmluZygpKTtcclxuICAgIHZhciBlcnJvciA9IG1lc3NhZ2UgKyBcIlxcblwiICsgc3RhY2s7XHJcbiAgICByZXR1cm4gY29uZmlnLmVycm9ycyAhPT0gZmFsc2UgPyAnW0Vycm9yOicgKyBlcnJvciArICddJyA6IHZhbDtcclxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSB7XHJcbiAgICBpZiAocGFyZW50cy5pbmRleE9mKHZhbCkgPj0gMCkge1xyXG4gICAgICB2YXIgcG9pbnQgPSBwYXRoLnNsaWNlKDAsIHBhcmVudHMuaW5kZXhPZih2YWwpKS5qb2luKCcuJyk7XHJcbiAgICAgIHJldHVybiAnW0NpcmN1bGFyJyArIChwb2ludCA/ICc6JyArIHBvaW50IDogJycpICsgJ10nO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFyIGNvcHksIGksIGssIGw7XHJcbiAgICAgIGlmICh2YWwuY29uc3RydWN0b3IgJiYgdHlwZW9mIHZhbC5jb25zdHJ1Y3Rvci5uYW1lID09PSAnc3RyaW5nJyAmJiB2YWwuY29uc3RydWN0b3IubmFtZS5zbGljZSgtNSkgPT09ICdBcnJheScpIHtcclxuICAgICAgICBpZiAocGFyZW50cy5sZW5ndGggPj0gY29uZmlnLmRlZXApIHtcclxuICAgICAgICAgIHJldHVybiAnW0FycmF5OicgKyB2YWwuY29uc3RydWN0b3IubmFtZSArICddJztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29weSA9IFtdO1xyXG4gICAgICAgICAgZm9yIChpID0gMCwgbCA9IHZhbC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICAgICAgY29weVtpXSA9IGRlY3ljbGVXYWxrZXIocGFyZW50cy5jb25jYXQoW3ZhbF0pLCBwYXRoLmNvbmNhdChpKSwgdmFsW2ldLCBjb25maWcpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIGNvcHk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChwYXJlbnRzLmxlbmd0aCA+PSBjb25maWcuZGVlcCkge1xyXG4gICAgICAgICAgcmV0dXJuICdbT2JqZWN0OicgKyAodmFsLmNvbnN0cnVjdG9yICYmIHZhbC5jb25zdHJ1Y3Rvci5uYW1lID8gdmFsLmNvbnN0cnVjdG9yLm5hbWUgOiAnT2JqZWN0JykgKyAnXSc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvcHkgPSB7fTtcclxuICAgICAgICAgIGZvciAoaSA9IDAsIGsgPSBPYmplY3Qua2V5cyh2YWwpLCBsID0gay5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICAgICAgY29weVtrW2ldXSA9IGRlY3ljbGVXYWxrZXIocGFyZW50cy5jb25jYXQoW3ZhbF0pLCBwYXRoLmNvbmNhdChba1tpXV0pLCB2YWxba1tpXV0sIGNvbmZpZyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gY29weTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicpIHtcclxuICAgIHJldHVybiBjb25maWcuZnVuY3Rpb25zID09PSB0cnVlID8gJ1tGdW5jdGlvbjonICsgdmFsLnRvU3RyaW5nKCkgKyAnXScgOiB1bmRlZmluZWQ7XHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiB2YWwudG9TdHJpbmcoKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7XHJcbiAgZGVDeWNsZXIsXHJcbiAgZGVDeWNsZWQsXHJcbiAgcmV2aXZlXHJcbn0iLCAiaW1wb3J0IGkxOG4gZnJvbSBcIi4uL2kxOG5cIjtcclxuaW1wb3J0IHV0aWxzIGZyb20gXCIuLi91dGlsc1wiO1xyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSB7eyBpMThuOiBzdHJpbmcgfCB7IFtsYW5nOiBzdHJpbmddOiB7IFtrOiBzdHJpbmddOiBzdHJpbmcgfSB9fX0gY2ZnIFxyXG4gKiBAcmV0dXJucyBcclxuICovXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBidWlsZEV4dGVuc2lvbkkxOE4oY2ZnKSB7XHJcbiAgaWYgKCFjZmc/LmkxOG4pIHJldHVybiBudWxsO1xyXG4gIGxldCBvdXQgPSB7XHJcbiAgICBfX2NhY2hlX186IHtcclxuICAgICAgbG9jYWxlSWRzOiBbXSxcclxuICAgICAgbG9jYWxpemF0aW9uczoge31cclxuICAgIH0sXHJcbiAgICBmb3JtYXQoa2V5LCAuLi5hcmdzKSB7XHJcbiAgICAgIHJldHVybiB1dGlscy5mb3JtYXQob3V0LmdldChrZXkpLCAuLi5hcmdzKTtcclxuICAgIH0sXHJcbiAgICBnZXQoa2V5KSB7XHJcbiAgICAgIGlmICh0eXBlb2YgY2ZnLmkxOG4gPT09IFwic3RyaW5nXCIpIGNoZWNrKCk7XHJcbiAgICAgIHJldHVybiBvdXQuX19jYWNoZV9fLmxvY2FsaXphdGlvbnNbb3V0LmxvY2FsZV0/LltrZXldXHJcbiAgICAgICAgfHwgb3V0Ll9fY2FjaGVfXy5sb2NhbGl6YXRpb25zLmRlZmF1bHQ/LltrZXldXHJcbiAgICAgICAgfHwgb3V0LmdldChrZXkpO1xyXG4gICAgfSxcclxuICAgIG1lc3NhZ2VzOiBuZXcgUHJveHkoe30sIHtcclxuICAgICAgZ2V0KF8sIHByb3ApIHtcclxuICAgICAgICByZXR1cm4gb3V0LmdldChwcm9wKTtcclxuICAgICAgfVxyXG4gICAgfSksXHJcbiAgfVxyXG4gIGFzeW5jIGZ1bmN0aW9uIGNoZWNrKCkge1xyXG4gICAgY29uc3QgbG9jYWxlID0gaTE4bi5sb2NhbGU7XHJcbiAgICBpZiAodHlwZW9mIGNmZy5pMThuID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgIGNvbnN0IEJBU0VfVVJMID0gY2ZnLmkxOG4uZW5kc1dpdGgoXCIvXCIpID8gY2ZnLmkxOG4uc2xpY2UoMCwgLTEpIDogY2ZnLmkxOG47XHJcbiAgICAgIGlmICghb3V0Ll9fY2FjaGVfXy5sb2NhbGVJZHMubGVuZ3RoKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIG91dC5fX2NhY2hlX18ubG9jYWxlSWRzID0gYXdhaXQgKGF3YWl0IGZldGNoKGAke0JBU0VfVVJMfS9sb2NhbGVzLmpzb25gLCBub1N0b3JlKSkuanNvbigpO1xyXG4gICAgICAgIH0gY2F0Y2ggeyB9XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIG91dC5fX2NhY2hlX18ubG9jYWxpemF0aW9ucy5kZWZhdWx0ID0gYXdhaXQgKGF3YWl0IGZldGNoKGAke0JBU0VfVVJMfS9kZWZhdWx0Lmpzb25gLCBub1N0b3JlKSkuanNvbigpO1xyXG4gICAgICAgIH0gY2F0Y2ggeyB9XHJcbiAgICAgIH1cclxuICAgICAgaWYgKFxyXG4gICAgICAgIG91dC5fX2NhY2hlX18ubG9jYWxlSWRzLmluY2x1ZGVzKGxvY2FsZSlcclxuICAgICAgICAmJiAhb3V0Ll9fY2FjaGVfXy5sb2NhbGl6YXRpb25zPy5bbG9jYWxlXVxyXG4gICAgICApIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgb3V0Ll9fY2FjaGVfXy5sb2NhbGl6YXRpb25zW2xvY2FsZV0gPSBhd2FpdCAoYXdhaXQgZmV0Y2goYCR7QkFTRV9VUkx9LyR7bG9jYWxlfS5qc29uYCwgbm9TdG9yZSkpLmpzb24oKTtcclxuICAgICAgICB9IGNhdGNoIHsgfTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgb3V0Ll9fY2FjaGVfXy5sb2NhbGVJZHMgPSBPYmplY3Qua2V5cyhjZmcuaTE4bik7XHJcbiAgICAgIG91dC5fX2NhY2hlX18ubG9jYWxpemF0aW9ucyA9IGNmZy5pMThuO1xyXG4gICAgfVxyXG4gIH1cclxuICBhd2FpdCBjaGVjaygpO1xyXG4gIHJldHVybiBvdXQ7XHJcbn0iLCAiaW1wb3J0IHsgQmFzaWNFdmVudEVtaXR0ZXIgfSBmcm9tIFwiLi4vLi4vbGliL0Jhc2ljRXZlbnRFbWl0dGVyLmpzXCI7XHJcbmltcG9ydCBkZXYgZnJvbSBcIi4uL2Rldi9pbmRleC5qc1wiO1xyXG5pbXBvcnQgaTE4biBmcm9tIFwiLi4vaTE4bi9pbmRleC5qc1wiO1xyXG5pbXBvcnQgbW9kdWxlcyBmcm9tIFwiLi4vbW9kdWxlcy9pbmRleC5qc1wiO1xyXG5pbXBvcnQgc3RvcmFnZSBmcm9tIFwiLi4vc3RvcmFnZS9pbmRleC5qc1wiO1xyXG5pbXBvcnQgeyBidWlsZEV4dGVuc2lvbkkxOE4gfSBmcm9tIFwiLi9pMThuLmpzXCI7XHJcbmltcG9ydCAqIGFzIG5lc3RzIGZyb20gXCJuZXN0c1wiO1xyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSB7eyBtb2R1bGVzOiB7IG5vZGU6IHsgbmFtZTogc3RyaW5nLCByZWFzb246IHN0cmluZyB9W10sIGNvbW1vbjogeyBuYW1lOiBzdHJpbmcsIHJlYXNvbjogc3RyaW5nIH1bXSwgY3VzdG9tOiB7IHJlYXNvbjogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIGxhenk6IGJvb2xlYW4sIGZpbmRlcjogeyBmaWx0ZXI6IHsgZXhwb3J0OiBib29sZWFuLCBpbjogXCJwcm9wZXJ0aWVzXCIgfCBcInN0cmluZ3NcIiB8IFwicHJvdG90eXBlc1wiLCBieTogW3N0cmluZ1tdLCBzdHJpbmdbXT9dIH0sIHBhdGg6IHsgYmVmb3JlOiBzdHJpbmcgfCBzdHJpbmdbXSwgYWZ0ZXI6IHN0cmluZyB8IHN0cmluZ1tdIH0sIG1hcDogeyBbazogc3RyaW5nXTogc3RyaW5nW10gfSB9IH1bXSB9LCBhYm91dDogeyBuYW1lOiBzdHJpbmcgfCB7IFtrOiBzdHJpbmddOiBzdHJpbmcgfSwgZGVzY3JpcHRpb246IHN0cmluZyB8IHsgW2s6IHN0cmluZ106IHN0cmluZyB9LCBzbHVnOiBzdHJpbmcgfSwgcmVhc29uOiBzdHJpbmcgfX0gY2ZnIFxyXG4gKi9cclxuYXN5bmMgZnVuY3Rpb24gYnVpbGRBUEkoY2ZnKSB7XHJcbiAgY29uc3QgcGVyc2lzdCA9IGF3YWl0IHN0b3JhZ2UuY3JlYXRlUGVyc2lzdE5lc3QoYEV4dGVuc2lvbjtQZXJzaXN0OyR7Y2ZnLmFib3V0LnNsdWd9YCk7XHJcbiAgY29uc3Qgb3V0ID0ge1xyXG4gICAgbW9kdWxlczoge1xyXG4gICAgICBfX2NhY2hlX186IHtcclxuICAgICAgICBjb21tb246IHt9LFxyXG4gICAgICAgIG5vZGU6IHt9LFxyXG4gICAgICAgIGN1c3RvbToge30sXHJcbiAgICAgICAgY3VzdG9tTGF6eToge31cclxuICAgICAgfSxcclxuICAgICAgcmVxdWlyZShuYW1lKSB7XHJcbiAgICAgICAgaWYgKCFkZXYuZW5hYmxlZCkge1xyXG4gICAgICAgICAgaWYgKHR5cGVvZiBvdXQubW9kdWxlcy5fX2NhY2hlX18ubm9kZVtuYW1lXSAhPT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIG91dC5tb2R1bGVzLl9fY2FjaGVfXy5ub2RlW25hbWVdO1xyXG4gICAgICAgICAgaWYgKGNmZz8ubW9kdWxlcz8ubm9kZT8uc29tZT8uKGkgPT4gaS5uYW1lID09PSBuYW1lKSkgcmV0dXJuIG91dC5tb2R1bGVzLl9fY2FjaGVfXy5ub2RlW25hbWVdID0gbW9kdWxlcy5yZXF1aXJlKG5hbWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZXR1cm4gbW9kdWxlcy5yZXF1aXJlKG5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgfSxcclxuICAgICAgY29tbW9uOiBuZXcgUHJveHkoe30sIHtcclxuICAgICAgICBnZXQoXywgcHJvcCkge1xyXG4gICAgICAgICAgaWYgKCFkZXYuZW5hYmxlZCkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIG91dC5tb2R1bGVzLl9fY2FjaGVfXy5jb21tb25bcHJvcF0gIT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBvdXQubW9kdWxlcy5fX2NhY2hlX18uY29tbW9uW3Byb3BdO1xyXG4gICAgICAgICAgICBpZiAoY2ZnPy5tb2R1bGVzPy5jb21tb24/LnNvbWU/LihpID0+IGkubmFtZSA9PT0gcHJvcCkpIHJldHVybiBvdXQubW9kdWxlcy5fX2NhY2hlX18uY29tbW9uW3Byb3BdID0gbW9kdWxlcy5jb21tb25bcHJvcF07XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbW9kdWxlcy5jb21tb25bcHJvcF07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9LFxyXG4gICAgICB9KSxcclxuICAgICAgY3VzdG9tOiBuZXcgUHJveHkoe30sIHtcclxuICAgICAgICBnZXQoXywgcHJvcCkge1xyXG4gICAgICAgICAgaWYgKHR5cGVvZiBvdXQubW9kdWxlcy5fX2NhY2hlX18uY3VzdG9tW3Byb3BdICE9PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gb3V0Lm1vZHVsZXMuX19jYWNoZV9fLmN1c3RvbVtwcm9wXTtcclxuICAgICAgICAgIGxldCBkYXRhID0gY2ZnPy5tb2R1bGVzPy5jdXN0b20/LnNvbWU/LihpID0+IGkubmFtZSA9PT0gcHJvcCk7XHJcbiAgICAgICAgICBpZiAoIWRhdGEpIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgaWYgKGRhdGEubGF6eSkge1xyXG4gICAgICAgICAgICBsZXQgcHJvbSA9IG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgICBsZXQgciA9IGF3YWl0IG1vZHVsZXMud2VicGFjay5sYXp5RmluZEJ5RmluZGVyKGRhdGEuZmluZGVyKTtcclxuICAgICAgICAgICAgICBvdXQubW9kdWxlcy5fX2NhY2hlX18uY3VzdG9tTGF6eVtwcm9wXSA9IHI7XHJcbiAgICAgICAgICAgICAgcmVzb2x2ZShyKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG91dC5tb2R1bGVzLl9fY2FjaGVfXy5jdXN0b21bcHJvcF0gPSB7XHJcbiAgICAgICAgICAgICAgZ2V0KCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb207XHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBnZXQgdmFsdWUoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb3V0Lm1vZHVsZXMuX19jYWNoZV9fLmN1c3RvbUxhenlbcHJvcF07XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IHZhbHVlID0gbW9kdWxlcy53ZWJwYWNrLmZpbmRCeUZpbmRlcihkYXRhLmZpbmRlcik7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZT8udmFsdWUgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgIG91dC5tb2R1bGVzLl9fY2FjaGVfXy5jdXN0b21bcHJvcF0gPSB2YWx1ZSA/IE9iamVjdC5hc3NpZ24odmFsdWUsIHsgdmFsdWUsIGdldCgpIHsgcmV0dXJuIHZhbHVlIH0gfSkgOiBudWxsO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBvdXQubW9kdWxlcy5fX2NhY2hlX18uY3VzdG9tW3Byb3BdID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGNhdGNoIHtcclxuICAgICAgICAgICAgICBvdXQubW9kdWxlcy5fX2NhY2hlX18uY3VzdG9tW3Byb3BdID0gdmFsdWUgPyB7IHZhbHVlLCBnZXQoKSB7IHJldHVybiB2YWx1ZSB9IH0gOiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gb3V0Lm1vZHVsZXMuX19jYWNoZV9fLmN1c3RvbVtwcm9wXTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pLFxyXG4gICAgfSxcclxuICAgIGkxOG4sXHJcbiAgICBleHRlbnNpb246IHtcclxuICAgICAgY29uZmlnOiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGNmZykpLFxyXG4gICAgICBwZXJzaXN0LFxyXG4gICAgICBpMThuOiBhd2FpdCBidWlsZEV4dGVuc2lvbkkxOE4oY2ZnKSxcclxuICAgICAgZXZlbnRzOiBuZXcgQmFzaWNFdmVudEVtaXR0ZXIoKVxyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHJldHVybiBvdXQ7XHJcbn1cclxuXHJcbmNvbnN0IG91dCA9IHtcclxuICBfX2NhY2hlX186IHtcclxuICAgIGluaXRpYWxpemVkOiBmYWxzZSxcclxuICAgIGxvYWRlZDogbmVzdHMubWFrZSh7fSlcclxuICB9LFxyXG4gIHN0b3JhZ2U6IHtcclxuICAgIC8qKiBAdHlwZSB7bmVzdHMuTmVzdH0gKi9cclxuICAgIGluc3RhbGxlZDoge31cclxuICB9LFxyXG4gIGJ1aWxkQVBJLFxyXG4gIGFzeW5jIGluaXQoKSB7XHJcbiAgICBpZiAob3V0Ll9fY2FjaGVfXy5pbml0aWFsaXplZCkgcmV0dXJuO1xyXG4gICAgb3V0Ll9fY2FjaGVfXy5pbml0aWFsaXplZCA9IHRydWU7XHJcbiAgICBvdXQuc3RvcmFnZS5pbnN0YWxsZWQgPSBhd2FpdCBzdG9yYWdlLmNyZWF0ZVBlcnNpc3ROZXN0KFwiRXh0ZW5zaW9ucztJbnN0YWxsZWRcIik7XHJcbiAgfSxcclxuICAvKipcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsIFxyXG4gICAqL1xyXG4gIGFzeW5jIGluc3RhbGwodXJsLCBkZWZhdWx0Q29uZmlnID0ge30pIHtcclxuICAgIGlmICghb3V0Ll9fY2FjaGVfXy5pbml0aWFsaXplZCkgYXdhaXQgb3V0LmluaXQoKTtcclxuICAgIGlmICh1cmwuZW5kc1dpdGgoXCIvXCIpKSB1cmwgPSB1cmwuc2xpY2UoMCwgLTEpO1xyXG4gICAgaWYgKG91dC5zdG9yYWdlLmluc3RhbGxlZC5naG9zdFt1cmxdKSB0aHJvdyBuZXcgRXJyb3IoYFwiJHt1cmx9XCIgZXh0ZW5zaW9uIGlzIGFscmVhZHkgaW5zdGFsbGVkLmApO1xyXG5cclxuICAgIGxldCBtZXRhUmVzcCA9IGF3YWl0IGZldGNoKGAke3VybH0vbWV0YWRhdGEuanNvbmApO1xyXG4gICAgaWYgKG1ldGFSZXNwLnN0YXR1cyAhPT0gMjAwKSB0aHJvdyBuZXcgRXJyb3IoYFwiJHt1cmx9XCIgZXh0ZW5zaW9uIG1ldGFkYXRhIGlzIG5vdCByZXNwb25kZWQgd2l0aCAyMDAgc3RhdHVzIGNvZGUuYCk7XHJcbiAgICBsZXQgbWV0YWRhdGEgPSBhd2FpdCBtZXRhUmVzcC5qc29uKCk7XHJcblxyXG4gICAgbGV0IHJlYWRtZVJlc3AgPSBhd2FpdCBmZXRjaChgJHt1cmx9L3JlYWRtZS5tZGApO1xyXG4gICAgbGV0IHJlYWRtZSA9IHJlYWRtZVJlc3Auc3RhdHVzID09PSAyMDAgPyBhd2FpdCByZWFkbWVSZXNwLnRleHQoKSA6IG51bGw7XHJcblxyXG4gICAgLy8gVE9ETzogU2hvdyBtb2RhbCBmb3IgdXNlciB0byBhY2NlcHQgdGhlIGV4dGVuc2lvbiAodGVybXMsIHByaXZhY3ksIGV0Yy4pXHJcblxyXG4gICAgbGV0IHNvdXJjZVJlc3AgPSBhd2FpdCBmZXRjaChgJHt1cmx9L3NvdXJjZS5qc2ApO1xyXG4gICAgaWYgKHNvdXJjZVJlc3Auc3RhdHVzICE9PSAyMDApIHRocm93IG5ldyBFcnJvcihgXCIke3VybH1cIiBleHRlbnNpb24gc291cmNlIGlzIG5vdCByZXNwb25kZWQgd2l0aCAyMDAgc3RhdHVzIGNvZGUuYCk7XHJcbiAgICBsZXQgc291cmNlID0gYXdhaXQgc291cmNlUmVzcC50ZXh0KCk7XHJcblxyXG5cclxuICAgIG91dC5zdG9yYWdlLmluc3RhbGxlZC5zdG9yZVt1cmxdID0ge1xyXG4gICAgICBtZXRhZGF0YToge1xyXG4gICAgICAgIGN1cnJlbnQ6IG1ldGFkYXRhLFxyXG4gICAgICAgIGxhc3Q6IG1ldGFkYXRhXHJcbiAgICAgIH0sXHJcbiAgICAgIHNvdXJjZSxcclxuICAgICAgcmVhZG1lLFxyXG4gICAgICBjb25maWc6IHtcclxuICAgICAgICBhdXRvVXBkYXRlOiB0cnVlLFxyXG4gICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgLi4uZGVmYXVsdENvbmZpZ1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIG91dC5sb2FkKHVybCk7XHJcbiAgfSxcclxuICBhc3luYyB1bmluc3RhbGwodXJsKSB7XHJcbiAgICBpZiAoIW91dC5fX2NhY2hlX18uaW5pdGlhbGl6ZWQpIGF3YWl0IG91dC5pbml0KCk7XHJcbiAgICBpZiAoIW91dC5zdG9yYWdlLmluc3RhbGxlZC5naG9zdFt1cmxdKSB0aHJvdyBuZXcgRXJyb3IoYFwiJHt1cmx9XCIgZXh0ZW5zaW9uIGlzIG5vdCBpbnN0YWxsZWQuYCk7XHJcblxyXG4gICAgZGVsZXRlIG91dC5zdG9yYWdlLmluc3RhbGxlZC5zdG9yZVt1cmxdO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGF3YWl0IG91dC51bmxvYWQodXJsKTtcclxuICAgIH0gY2F0Y2ggeyB9XHJcbiAgfSxcclxuICBhc3luYyBsb2FkKHVybCkge1xyXG4gICAgaWYgKCFvdXQuX19jYWNoZV9fLmluaXRpYWxpemVkKSBhd2FpdCBvdXQuaW5pdCgpO1xyXG4gICAgaWYgKCFvdXQuc3RvcmFnZS5pbnN0YWxsZWQuZ2hvc3RbdXJsXSkgdGhyb3cgbmV3IEVycm9yKGBcIiR7dXJsfVwiIGV4dGVuc2lvbiBpcyBub3QgaW5zdGFsbGVkLmApO1xyXG4gICAgbGV0IGRhdGEgPSBvdXQuc3RvcmFnZS5pbnN0YWxsZWQuZ2hvc3RbdXJsXTtcclxuXHJcbiAgICBpZiAob3V0Ll9fY2FjaGVfXy5sb2FkZWQuZ2hvc3RbdXJsXSkgdGhyb3cgbmV3IEVycm9yKGBcIiR7dXJsfVwiIGV4dGVuc2lvbiBpcyBhbHJlYWR5IGxvYWRlZC5gKTtcclxuXHJcbiAgICBsZXQgYXBpID0gYXdhaXQgb3V0LmJ1aWxkQVBJKGRhdGEubWV0YWRhdGEpO1xyXG5cclxuICAgIGxldCBldmFsdWF0ZWQgPSBvdXQuZXZhbHVhdGUoZGF0YS5zb3VyY2UsIGFwaSk7XHJcblxyXG4gICAgYXdhaXQgZXZhbHVhdGVkPy5sb2FkPy4oKTtcclxuXHJcbiAgICBvdXQuX19jYWNoZV9fLmxvYWRlZC5zdG9yZVt1cmxdID0ge1xyXG4gICAgICBldmFsdWF0ZWQsXHJcbiAgICAgIGFwaVxyXG4gICAgfTtcclxuICB9LFxyXG4gIGFzeW5jIHVubG9hZCh1cmwpIHtcclxuICAgIGlmICghb3V0Ll9fY2FjaGVfXy5pbml0aWFsaXplZCkgYXdhaXQgb3V0LmluaXQoKTtcclxuICAgIGlmICghb3V0LnN0b3JhZ2UuaW5zdGFsbGVkLmdob3N0W3VybF0pIHRocm93IG5ldyBFcnJvcihgXCIke3VybH1cIiBleHRlbnNpb24gaXMgbm90IGluc3RhbGxlZC5gKTtcclxuXHJcbiAgICBpZiAoIW91dC5fX2NhY2hlX18ubG9hZGVkLmdob3N0W3VybF0pIHRocm93IG5ldyBFcnJvcihgXCIke3VybH1cIiBleHRlbnNpb24gaXMgbm90IGxvYWRlZC5gKTtcclxuXHJcbiAgICBsZXQgeyBldmFsdWF0ZWQgfSA9IG91dC5fX2NhY2hlX18ubG9hZGVkLmdob3N0W3VybF07XHJcblxyXG4gICAgYXdhaXQgZXZhbHVhdGVkPy51bmxvYWQ/LigpO1xyXG5cclxuICAgIGRlbGV0ZSBvdXQuX19jYWNoZV9fLmxvYWRlZC5zdG9yZVt1cmxdO1xyXG4gIH0sXHJcbiAgZXZhbHVhdGUoc291cmNlLCBhcGkpIHtcclxuICAgIGNvbnN0ICRhY29yZCA9IGFwaTtcclxuICAgIHJldHVybiBldmFsKHNvdXJjZSk7XHJcbiAgfSxcclxuICBhc3luYyBsb2FkQWxsKCkge1xyXG4gICAgaWYgKCFvdXQuX19jYWNoZV9fLmluaXRpYWxpemVkKSBhd2FpdCBvdXQuaW5pdCgpO1xyXG4gICAgcmV0dXJuIFByb21pc2UuYWxsKE9iamVjdC5rZXlzKG91dC5zdG9yYWdlLmluc3RhbGxlZC5naG9zdCkubWFwKHVybCA9PiBvdXQubG9hZCh1cmwpKSk7XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgb3V0OyIsICJleHBvcnQgZGVmYXVsdCB7XHJcbiAgcHJvY2VzczogZ2xvYmFsVGhpc1tcIjxQUkVMT0FEX0tFWT5cIl0ucHJvY2VzcyxcclxuICBpc0RldlRvb2xzT3BlbjogZ2xvYmFsVGhpc1tcIjxQUkVMT0FEX0tFWT5cIl0uaXNEZXZUb29sc09wZW5cclxufVxyXG5cclxuIiwgImltcG9ydCB7IHdhaXRVbnRpbENvbm5lY3Rpb25PcGVuIH0gZnJvbSBcIi4uLy4uL290aGVyL3V0aWxzLmpzXCI7XHJcbmltcG9ydCBjb21tb24gZnJvbSBcIi4uL21vZHVsZXMvY29tbW9uLmpzXCI7XHJcbmltcG9ydCBwYXRjaGVyIGZyb20gXCIuLi9wYXRjaGVyL2luZGV4LmpzXCI7XHJcblxyXG5jb25zdCBzb2NrZXRzID0gbmV3IFNldCgpO1xyXG5jb25zdCBoYW5kbGVycyA9IG5ldyBNYXAoKTtcclxuXHJcbndhaXRVbnRpbENvbm5lY3Rpb25PcGVuKCkudGhlbigoKSA9PiB7XHJcbiAgcGF0Y2hlci5pbnN0ZWFkKFxyXG4gICAgXCJoYW5kbGVDb25uZWN0aW9uXCIsXHJcbiAgICBjb21tb24uV2ViU29ja2V0LFxyXG4gICAgKGFyZ3MsIG9yaWcpID0+IHtcclxuICAgICAgY29uc3Qgd3MgPSBhcmdzWzBdO1xyXG4gICAgICBpZiAod3MudXBncmFkZVJlcSgpLnVybCAhPT0gXCIvYWNvcmRcIikgcmV0dXJuIG9yaWcoLi4uYXJncyk7XHJcblxyXG4gICAgICBzb2NrZXRzLmFkZCh3cyk7XHJcblxyXG4gICAgICB3cy5vbihcIm1lc3NhZ2VcIiwgYXN5bmMgKG1zZykgPT4ge1xyXG4gICAgICAgIGxldCBqc29uO1xyXG5cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAganNvbiA9IEpTT04ucGFyc2UobXNnKTtcclxuICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShqc29uKSB8fCBqc29uLmxlbmd0aCA8IDEgfHwganNvbi5sZW5ndGggPiAzKVxyXG4gICAgICAgICAgICB0aHJvdyBcIkFycmF5IGV4cGVjdGVkIGFzIG1lc3NhZ2UuXCI7XHJcbiAgICAgICAgICBpZiAodHlwZW9mIGpzb25bMF0gIT0gXCJzdHJpbmdcIikgdGhyb3cgXCJBcnJheVswXSBuZWVkcyB0byBiZSBzdHJpbmcuXCI7XHJcbiAgICAgICAgICBpZiAodHlwZW9mIGpzb25bMV0gIT0gXCJzdHJpbmdcIikgdGhyb3cgXCJBcnJheVsxXSBuZWVkcyB0byBiZSBzdHJpbmcuXCI7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICB3cy5zZW5kKFxyXG4gICAgICAgICAgICBKU09OLnN0cmluZ2lmeShbXHJcbiAgICAgICAgICAgICAgbnVsbCxcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBvazogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBlcnJvcjogYCR7ZXJyfWAsXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXSlcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBbZXZlbnRJZCwgZXZlbnROYW1lLCBldmVudERhdGFdID0ganNvbjtcclxuXHJcbiAgICAgICAgY29uc3QgaGFuZGxlciA9IGhhbmRsZXJzLmdldChldmVudE5hbWUpO1xyXG5cclxuICAgICAgICBpZiAoIWhhbmRsZXIpXHJcbiAgICAgICAgICByZXR1cm4gd3Muc2VuZChcclxuICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoW1xyXG4gICAgICAgICAgICAgIGV2ZW50SWQsXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgb2s6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgZXJyb3I6IGBVbmFibGUgdG8gZmluZCBoYW5kbGVyLmAsXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXSlcclxuICAgICAgICAgICk7XHJcblxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICBsZXQgcmVzcG9uc2UgPSBhd2FpdCBoYW5kbGVyKGV2ZW50RGF0YSk7XHJcbiAgICAgICAgICB3cy5zZW5kKFxyXG4gICAgICAgICAgICBKU09OLnN0cmluZ2lmeShbXHJcbiAgICAgICAgICAgICAgZXZlbnRJZCxcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBvazogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHJlc3BvbnNlLFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIF0pXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgd3Muc2VuZChcclxuICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoW1xyXG4gICAgICAgICAgICAgIGV2ZW50SWQsXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgb2s6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgZXJyb3I6IGAke2Vycn1gLFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIF0pXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgICB3cy5vbihcImNsb3NlXCIsICgpID0+IHNvY2tldHMuZGVsZXRlKHdzKSk7XHJcbiAgICB9XHJcbiAgKTtcclxufSk7XHJcblxyXG5mdW5jdGlvbiBzZXQoZXZlbnROYW1lLCBjYWxsYmFjaykge1xyXG4gIGlmICh0eXBlb2YgZXZlbnROYW1lICE9IFwic3RyaW5nXCIpXHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJFdmVudE5hbWUgbmVlZHMgdG8gYmUgYSBzdHJpbmcuXCIpO1xyXG4gIGlmICh0eXBlb2YgY2FsbGJhY2sgIT0gXCJmdW5jdGlvblwiKVxyXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ2FsbGJhY2sgbmVlZHMgdG8gYmUgYSBmdW5jdGlvbi5cIik7XHJcbiAgaWYgKGhhbmRsZXJzLmhhcyhldmVudE5hbWUpKVxyXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiRXZlbnROYW1lIGFscmVhZHkgaW4gdXNlLlwiKTtcclxuICBoYW5kbGVycy5zZXQoZXZlbnROYW1lLCBjYWxsYmFjayk7XHJcbiAgcmV0dXJuICgpID0+IHtcclxuICAgIGhhbmRsZXJzLmRlbGV0ZShldmVudE5hbWUpO1xyXG4gIH07XHJcbn1cclxuZnVuY3Rpb24gdHJpZ2dlcihldmVudE5hbWUsIC4uLmFyZ3MpIHtcclxuICBpZiAoIXNvY2tldEV2ZW50cy5oYXMoZXZlbnROYW1lKSlcclxuICAgIHRocm93IG5ldyBFcnJvcihcIlVuYWJsZSB0byBmaW5kIGhhbmRsZXIhXCIpO1xyXG4gIHJldHVybiBzb2NrZXRFdmVudHMuZ2V0KGV2ZW50TmFtZSkoLi4uYXJncyk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBzZXQsXHJcbiAgdHJpZ2dlclxyXG59XHJcblxyXG4iLCAiZXhwb3J0IGRlZmF1bHQgYFxuLmFjb3JkLS1sYXllci1jb250YWluZXJ7LS10b3Atb2Zmc2V0OiAwcHg7d2lkdGg6MTAwdnc7aGVpZ2h0OmNhbGMoMTAwdmggLSB2YXIoLS10b3Atb2Zmc2V0KSk7ei1pbmRleDo5OTk5OTk5O3BvaW50ZXItZXZlbnRzOm5vbmU7cG9zaXRpb246YWJzb2x1dGU7dG9wOnZhcigtLXRvcC1vZmZzZXQpO2xlZnQ6MHB4fS5hY29yZC0tbGF5ZXItY29udGFpbmVyICp7ei1pbmRleDo5OTk5OTk5OTk5OTk5OX0uYWNvcmQtLXRvb2x0aXAtbGF5ZXJ7b3BhY2l0eTowO3RyYW5zaXRpb246NTBtcyBsaW5lYXIgb3BhY2l0eTtwb3NpdGlvbjphYnNvbHV0ZTtwb2ludGVyLWV2ZW50czpub25lfS5hY29yZC0tdG9vbHRpcC1sYXllci52aXNpYmxle29wYWNpdHk6MTtwb2ludGVyLWV2ZW50czphbGx9LmFjb3JkLS10b29sdGlwLnZlcnRpY2Fse3RyYW5zZm9ybTp0cmFuc2xhdGVYKC01MCUpfS5hY29yZC0tdG9vbHRpcC5ob3Jpem9udGFse3RyYW5zZm9ybTp0cmFuc2xhdGVZKC01MCUpfS5hY29yZC0tdG9hc3RzLWNvbnRhaW5lcntkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2p1c3RpZnktY29udGVudDpmbGV4LWVuZDtmbGV4LWRpcmVjdGlvbjpjb2x1bW47d2lkdGg6MTAwdnc7aGVpZ2h0OmNhbGMoMTAwdmggLSB2YXIoLS10b3Atb2Zmc2V0KSk7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7bGVmdDowO3BvaW50ZXItZXZlbnRzOm5vbmU7cGFkZGluZy1ib3R0b206MzJweH0uYWNvcmQtLXRvYXN0cy1jb250YWluZXIgLmFjb3JkLS10b2FzdHt0cmFuc2l0aW9uOnRyYW5zZm9ybSAyNTBtcyBlYXNlLWluLW91dCxvcGFjaXR5IDI1MG1zIGVhc2UtaW4tb3V0O2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7cG9pbnRlci1ldmVudHM6bm9uZTtib3JkZXItcmFkaXVzOjRweDtwYWRkaW5nOjhweDtib3gtc2hhZG93OjBweCAycHggOHB4IHJnYmEoMCwwLDAsLjI1KTtvcGFjaXR5OjE7Z2FwOjhweDtmb250LXNpemU6MTRweDttYXJnaW46NHB4fS5hY29yZC0tdG9hc3RzLWNvbnRhaW5lciAuYWNvcmQtLXRvYXN0IHN2Z3t3aWR0aDoxNnB4O2hlaWdodDoxNnB4fS5hY29yZC0tdG9hc3RzLWNvbnRhaW5lciAuYWNvcmQtLXRvYXN0LmNsaWNrYWJsZXtjdXJzb3I6cG9pbnRlcjtwb2ludGVyLWV2ZW50czphbGx9LmFjb3JkLS10b2FzdHMtY29udGFpbmVyIC5hY29yZC0tdG9hc3QuY2xvc2luZ3tvcGFjaXR5OjA7dHJhbnNmb3JtOnRyYW5zbGF0ZSgwLCAtNTBweCl9LmFjb3JkLS10b2FzdHMtY29udGFpbmVyIC5hY29yZC0tdG9hc3QuaGlkZGVue29wYWNpdHk6MDt0cmFuc2Zvcm06dHJhbnNsYXRlKDAsIDUwcHgpfS5hY29yZC0tdG9hc3RzLWNvbnRhaW5lciAuYWNvcmQtLXRvYXN0LnN0eWxlLWluZm97YmFja2dyb3VuZC1jb2xvcjojNGE4ZmUxO2NvbG9yOiNmNWY1ZjV9LmFjb3JkLS10b2FzdHMtY29udGFpbmVyIC5hY29yZC0tdG9hc3Quc3R5bGUtd2FybmluZ3tiYWNrZ3JvdW5kLWNvbG9yOiNmYWE4MWE7Y29sb3I6IzAwMH0uYWNvcmQtLXRvYXN0cy1jb250YWluZXIgLmFjb3JkLS10b2FzdC5zdHlsZS1lcnJvcntiYWNrZ3JvdW5kLWNvbG9yOiNlZDQyNDU7Y29sb3I6IzAwMH0uYWNvcmQtLXRvYXN0cy1jb250YWluZXIgLmFjb3JkLS10b2FzdC5zdHlsZS1zdWNjZXNze2JhY2tncm91bmQtY29sb3I6IzNiYTU1ZDtjb2xvcjojZjVmNWY1fS5hY29yZC0tdG9hc3RzLWNvbnRhaW5lciAuYWNvcmQtLXRvYXN0LnN0eWxlLWRlZmF1bHR7YmFja2dyb3VuZC1jb2xvcjojZjVmNWY1O2NvbG9yOiMwMDB9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXJ7d2lkdGg6MTAwdnc7aGVpZ2h0OmNhbGMoMTAwdmggLSB2YXIoLS10b3Atb2Zmc2V0KSk7ZGlzcGxheTpmbGV4O3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6MDtwb2ludGVyLWV2ZW50czpub25lfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyIC5hY29yZC0tbm90aWZpY2F0aW9ue2Rpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpjb2x1bW47cG9pbnRlci1ldmVudHM6YWxsO3RyYW5zaXRpb246dHJhbnNmb3JtIDI1MG1zIGVhc2UtaW4tb3V0LG9wYWNpdHkgMjUwbXMgZWFzZS1pbi1vdXQ7bWFyZ2luOjRweDtiYWNrZHJvcC1maWx0ZXI6Ymx1cigxNnB4KSBicmlnaHRuZXNzKDAuNzUpOy13ZWJraXQtYXBwLXJlZ2lvbjpuby1kcmFnOy0tYW5pbWF0aW9uLXNpemU6IDUwcHh9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24uaGlkZGVuLC5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyIC5hY29yZC0tbm90aWZpY2F0aW9uLmNsb3Npbmd7b3BhY2l0eTowfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyIC5hY29yZC0tbm90aWZpY2F0aW9uPi5jb250YWluZXJ7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2VlbjtwYWRkaW5nOjhweDtjb2xvcjojZmZmO21pbi13aWR0aDoyNTBweH0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllciAuYWNvcmQtLW5vdGlmaWNhdGlvbj4uY29udGFpbmVyPi5jbG9zZXt3aWR0aDoyNHB4O2hlaWdodDoyNHB4O2NvbG9yOiNmZmY7b3BhY2l0eTouNTtjdXJzb3I6cG9pbnRlcjttYXJnaW4tbGVmdDo4cHg7ei1pbmRleDo5OTk5OTk5OTl9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24+LmNvbnRhaW5lcj4uY2xvc2UuaGlkZGVue2Rpc3BsYXk6bm9uZX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllciAuYWNvcmQtLW5vdGlmaWNhdGlvbj4ucHJvZ3Jlc3MtY29udGFpbmVye3dpZHRoOjEwMCU7aGVpZ2h0OjVweH0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllciAuYWNvcmQtLW5vdGlmaWNhdGlvbj4ucHJvZ3Jlc3MtY29udGFpbmVyPi5wcm9ncmVzc3t3aWR0aDowJTtoZWlnaHQ6NXB4O3RyYW5zaXRpb246d2lkdGggdmFyKC0tZHVyYXRpb24pIGxpbmVhcjtiYWNrZ3JvdW5kLWNvbG9yOnZhcigtLWJhci1jb2xvcil9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24+LnByb2dyZXNzLWNvbnRhaW5lcj4ucHJvZ3Jlc3MucHJvZ3Jlc3Npbmd7d2lkdGg6MTAwJX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllciAuYWNvcmQtLW5vdGlmaWNhdGlvbi5zdHlsZS1pbmZvey0tYmFyLWNvbG9yOiAjNGE4ZmUxfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyIC5hY29yZC0tbm90aWZpY2F0aW9uLnN0eWxlLXdhcm5pbmd7LS1iYXItY29sb3I6ICNmYWE4MWF9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24uc3R5bGUtZXJyb3J7LS1iYXItY29sb3I6ICNlZDQyNDV9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24uc3R5bGUtc3VjY2Vzc3stLWJhci1jb2xvcjogIzNiYTU1ZH0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllciAuYWNvcmQtLW5vdGlmaWNhdGlvbi5zdHlsZS1kZWZhdWx0ey0tYmFyLWNvbG9yOiB3aGl0ZXNtb2tlfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLnRvcC1yaWdodHtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1lbmQ7YWxpZ24taXRlbXM6ZmxleC1zdGFydH0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci50b3AtcmlnaHQgLmFjb3JkLS1ub3RpZmljYXRpb24uaGlkZGVue3RyYW5zZm9ybTp0cmFuc2xhdGUoMCwgY2FsYyh2YXIoLS1hbmltYXRpb24tc2l6ZSkgKiAtMSkpfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLnRvcC1yaWdodCAuYWNvcmQtLW5vdGlmaWNhdGlvbi5jbG9zaW5ne3RyYW5zZm9ybTp0cmFuc2xhdGUoMCwgdmFyKC0tYW5pbWF0aW9uLXNpemUpKX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci50b3AtbGVmdHtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1zdGFydDthbGlnbi1pdGVtczpmbGV4LXN0YXJ0fS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLnRvcC1sZWZ0IC5hY29yZC0tbm90aWZpY2F0aW9uLmhpZGRlbnt0cmFuc2Zvcm06dHJhbnNsYXRlKDAsIGNhbGModmFyKC0tYW5pbWF0aW9uLXNpemUpICogLTEpKX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci50b3AtbGVmdCAuYWNvcmQtLW5vdGlmaWNhdGlvbi5jbG9zaW5ne3RyYW5zZm9ybTp0cmFuc2xhdGUoMCwgdmFyKC0tYW5pbWF0aW9uLXNpemUpKX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci5ib3R0b20tcmlnaHR7anVzdGlmeS1jb250ZW50OmZsZXgtZW5kO2FsaWduLWl0ZW1zOmZsZXgtZW5kfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLmJvdHRvbS1yaWdodCAuYWNvcmQtLW5vdGlmaWNhdGlvbi5oaWRkZW57dHJhbnNmb3JtOnRyYW5zbGF0ZSgwLCB2YXIoLS1hbmltYXRpb24tc2l6ZSkpfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLmJvdHRvbS1yaWdodCAuYWNvcmQtLW5vdGlmaWNhdGlvbi5jbG9zaW5ne3RyYW5zZm9ybTp0cmFuc2xhdGUoMCwgY2FsYyh2YXIoLS1hbmltYXRpb24tc2l6ZSkgKiAtMSkpfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLmJvdHRvbS1sZWZ0e2p1c3RpZnktY29udGVudDpmbGV4LXN0YXJ0O2FsaWduLWl0ZW1zOmZsZXgtZW5kfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLmJvdHRvbS1sZWZ0IC5hY29yZC0tbm90aWZpY2F0aW9uLmhpZGRlbnt0cmFuc2Zvcm06dHJhbnNsYXRlKDAsIHZhcigtLWFuaW1hdGlvbi1zaXplKSl9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIuYm90dG9tLWxlZnQgLmFjb3JkLS1ub3RpZmljYXRpb24uY2xvc2luZ3t0cmFuc2Zvcm06dHJhbnNsYXRlKDAsIGNhbGModmFyKC0tYW5pbWF0aW9uLXNpemUpICogLTEpKX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci50b3AtY2VudGVye2p1c3RpZnktY29udGVudDpjZW50ZXI7YWxpZ24taXRlbXM6ZmxleC1zdGFydH0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci50b3AtY2VudGVyIC5hY29yZC0tbm90aWZpY2F0aW9uLmhpZGRlbnt0cmFuc2Zvcm06dHJhbnNsYXRlKDAsIGNhbGModmFyKC0tYW5pbWF0aW9uLXNpemUpICogLTEpKX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci50b3AtY2VudGVyIC5hY29yZC0tbm90aWZpY2F0aW9uLmNsb3Npbmd7dHJhbnNmb3JtOnRyYW5zbGF0ZSgwLCB2YXIoLS1hbmltYXRpb24tc2l6ZSkpfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLmJvdHRvbS1jZW50ZXJ7anVzdGlmeS1jb250ZW50OmNlbnRlcjthbGlnbi1pdGVtczpmbGV4LWVuZH0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci5ib3R0b20tY2VudGVyIC5hY29yZC0tbm90aWZpY2F0aW9uLmhpZGRlbnt0cmFuc2Zvcm06dHJhbnNsYXRlKDAsIHZhcigtLWFuaW1hdGlvbi1zaXplKSl9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIuYm90dG9tLWNlbnRlciAuYWNvcmQtLW5vdGlmaWNhdGlvbi5jbG9zaW5ne3RyYW5zZm9ybTp0cmFuc2xhdGUoMCwgY2FsYyh2YXIoLS1hbmltYXRpb24tc2l6ZSkgKiAtMSkpfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLmNlbnRlcntqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO2FsaWduLWl0ZW1zOmNlbnRlcn0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci5jZW50ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24uaGlkZGVue3RyYW5zZm9ybTpzY2FsZSgwLjUpfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLmNlbnRlciAuYWNvcmQtLW5vdGlmaWNhdGlvbi5jbG9zaW5ne3RyYW5zZm9ybTpzY2FsZSgwLjUpfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLmxlZnQtY2VudGVye2p1c3RpZnktY29udGVudDpmbGV4LXN0YXJ0O2FsaWduLWl0ZW1zOmNlbnRlcn0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci5sZWZ0LWNlbnRlciAuYWNvcmQtLW5vdGlmaWNhdGlvbi5oaWRkZW57dHJhbnNmb3JtOnRyYW5zbGF0ZShjYWxjKHZhcigtLWFuaW1hdGlvbi1zaXplKSAqIC0xKSwgMCl9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIubGVmdC1jZW50ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24uY2xvc2luZ3t0cmFuc2Zvcm06dHJhbnNsYXRlKHZhcigtLWFuaW1hdGlvbi1zaXplKSwgMCl9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIucmlnaHQtY2VudGVye2p1c3RpZnktY29udGVudDpmbGV4LWVuZDthbGlnbi1pdGVtczpjZW50ZXJ9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIucmlnaHQtY2VudGVyIC5hY29yZC0tbm90aWZpY2F0aW9uLmhpZGRlbnt0cmFuc2Zvcm06dHJhbnNsYXRlKHZhcigtLWFuaW1hdGlvbi1zaXplKSwgMCl9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIucmlnaHQtY2VudGVyIC5hY29yZC0tbm90aWZpY2F0aW9uLmNsb3Npbmd7dHJhbnNmb3JtOnRyYW5zbGF0ZShjYWxjKHZhcigtLWFuaW1hdGlvbi1zaXplKSAqIC0xKSwgMCl9YDtcbiIsICJpbXBvcnQgZG9tIGZyb20gXCIuLi9kb20vaW5kZXguanNcIjtcclxuaW1wb3J0IGV2ZW50cyBmcm9tIFwiLi4vZXZlbnRzL2luZGV4LmpzXCI7XHJcbmltcG9ydCB3ZWJwYWNrIGZyb20gXCIuLi9tb2R1bGVzL3dlYnBhY2suanNcIjtcclxuXHJcbmNvbnN0IHRvb2x0aXBDbGFzc2VzID0gd2VicGFjay5maW5kQnlQcm9wZXJ0aWVzKFwidG9vbHRpcENvbnRlbnRBbGxvd092ZXJmbG93XCIsIFwidG9vbHRpcFwiKTtcclxuXHJcbmNvbnN0IHRvb2x0aXBQb3NpdGlvbnMgPSB7XHJcbiAgdG9wOiB0b29sdGlwQ2xhc3Nlcy50b29sdGlwVG9wLFxyXG4gIGJvdHRvbTogdG9vbHRpcENsYXNzZXMudG9vbHRpcEJvdHRvbSxcclxuICBsZWZ0OiB0b29sdGlwQ2xhc3Nlcy50b29sdGlwTGVmdCxcclxuICByaWdodDogdG9vbHRpcENsYXNzZXMudG9vbHRpcFJpZ2h0LFxyXG59XHJcblxyXG5jbGFzcyBUb29sdGlwIHtcclxuICAvKipcclxuICAgKiBAcGFyYW0ge0hUTUxEaXZFbGVtZW50fSB0YXJnZXQgXHJcbiAgICogQHBhcmFtIHtzdHJpbmd8SFRNTERpdkVsZW1lbnR9IGNvbnRlbnRcclxuICAgKi9cclxuICBjb25zdHJ1Y3Rvcih0YXJnZXQsIGNvbnRlbnQsIHBvc2l0aW9uID0gXCJhdXRvXCIpIHtcclxuICAgIC8qKiBAdHlwZSB7SFRNTERpdkVsZW1lbnR9ICovXHJcbiAgICB0aGlzLmxheWVyRWxlbWVudCA9IGRvbS5wYXJzZShgXHJcbiAgICAgIDxkaXYgY2xhc3M9XCJhY29yZC0tdG9vbHRpcC1sYXllclwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCIke3Rvb2x0aXBDbGFzc2VzLnRvb2x0aXB9ICR7dG9vbHRpcENsYXNzZXMudG9vbHRpcFByaW1hcnl9IGFjb3JkLS10b29sdGlwXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiJHt0b29sdGlwQ2xhc3Nlcy50b29sdGlwUG9pbnRlcn0gYWNvcmQtLXRvb2x0aXAtcG9pbnRlclwiPjwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cIiR7dG9vbHRpcENsYXNzZXMudG9vbHRpcENvbnRlbnR9IGFjb3JkLS10b29sdGlwLWNvbnRlbnRcIj48L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICBgKTtcclxuICAgIHRoaXMudG9vbHRpcEVsZW1lbnQgPSB0aGlzLmxheWVyRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmFjb3JkLS10b29sdGlwXCIpO1xyXG4gICAgdGhpcy5jb250ZW50RWxlbWVudCA9IHRoaXMubGF5ZXJFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWNvcmQtLXRvb2x0aXAtY29udGVudFwiKTtcclxuICAgIHRoaXMuY29udGVudCA9IGNvbnRlbnQ7XHJcbiAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuICAgIHRoaXMucG9zaXRpb24gPSBwb3NpdGlvbjtcclxuXHJcbiAgICB0aGlzLnZpc2libGUgPSBmYWxzZTtcclxuICAgIHRoaXMuZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgIHRoaXMucGF1c2VkID0gZmFsc2U7XHJcblxyXG4gICAgY29uc3Qgb25Nb3VzZUVudGVyID0gKCkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5kaXNhYmxlZCB8fCB0aGlzLnBhdXNlZCkgcmV0dXJuO1xyXG4gICAgICB0aGlzLnNob3coKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBvbk1vdXNlTGVhdmUgPSAoKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLnBhdXNlZCkgcmV0dXJuO1xyXG4gICAgICB0aGlzLmhpZGUoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnRhcmdldC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCBvbk1vdXNlRW50ZXIpO1xyXG4gICAgdGhpcy50YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgb25Nb3VzZUxlYXZlKTtcclxuXHJcbiAgICBsZXQgdW5QYXRjaE9ic2VydmVyID0gZXZlbnRzLm9uKFxyXG4gICAgICBcImRvbS1tdXRhdGlvblwiLFxyXG4gICAgICAvKiogQHBhcmFtIHtNdXRhdGlvblJlY29yZH0gbXV0ICovKG11dCkgPT4ge1xyXG4gICAgICAgIGlmIChtdXQudHlwZSA9PT0gXCJhdHRyaWJ1dGVzXCIpIHtcclxuICAgICAgICAgIGlmIChtdXQudGFyZ2V0LmlzU2FtZU5vZGUodGhpcy50YXJnZXQpKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAobXV0LmF0dHJpYnV0ZU5hbWUpIHtcclxuICAgICAgICAgICAgICBjYXNlIFwiYWNvcmQtLXRvb2x0aXAtZGlzYWJsZWRcIjoge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kaXNhYmxlZCA9IHRoaXMudGFyZ2V0LmdldEF0dHJpYnV0ZShcImFjb3JkLS10b29sdGlwLWRpc2FibGVkXCIpID09PSBcInRydWVcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBjYXNlIFwiYWNvcmQtLXRvb2x0aXAtY29udGVudFwiOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQgPSB0aGlzLnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJhY29yZC0tdG9vbHRpcC1jb250ZW50XCIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGNhc2UgXCJhY29yZC0tdG9vbHRpcC1wb3NpdGlvblwiOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uID0gdGhpcy50YXJnZXQuZ2V0QXR0cmlidXRlKFwiYWNvcmQtLXRvb2x0aXAtcG9zaXRpb25cIik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIClcclxuXHJcbiAgICB0aGlzLmRlc3Ryb3kgPSAoKSA9PiB7XHJcbiAgICAgIHRoaXMudGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsIG9uTW91c2VFbnRlcik7XHJcbiAgICAgIHRoaXMudGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIG9uTW91c2VMZWF2ZSk7XHJcbiAgICAgIHRoaXMuaGlkZSgpO1xyXG4gICAgICB1blBhdGNoT2JzZXJ2ZXIoKTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBnZXQgY29udGVudCgpIHtcclxuICAgIHJldHVybiB0aGlzLmNvbnRlbnRFbGVtZW50LmZpcnN0RWxlbWVudENoaWxkO1xyXG4gIH1cclxuXHJcbiAgc2V0IGNvbnRlbnQodmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgdGhpcy5jb250ZW50RWxlbWVudC5pbm5lckhUTUwgPSB2YWx1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuY29udGVudEVsZW1lbnQuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgdGhpcy5jb250ZW50RWxlbWVudC5hcHBlbmRDaGlsZCh2YWx1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZ2V0Q29udGFpbmVyKCkge1xyXG4gICAgY29uc3QgYXBwRWxtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2NsYXNzKj1cIm5vdERldlRvb2xzLVwiXScpO1xyXG5cclxuICAgIGxldCBjb250YWluZXIgPSBhcHBFbG0ucXVlcnlTZWxlY3RvcihcIi5hY29yZC0tdG9vbHRpcC1jb250YWluZXJcIik7XHJcbiAgICBpZiAoIWNvbnRhaW5lcikge1xyXG4gICAgICBjb250YWluZXIgPSBkb20ucGFyc2UoYDxkaXYgY2xhc3M9XCJhY29yZC0tbGF5ZXItY29udGFpbmVyIGFjb3JkLS10b29sdGlwLWNvbnRhaW5lclwiPjwvZGl2PmApO1xyXG4gICAgICBhcHBFbG0uYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcclxuICAgIH1cclxuICAgIGNvbnRhaW5lci5zdHlsZS5zZXRQcm9wZXJ0eShcIi0tdG9wLW9mZnNldFwiLCBgJHthcHBFbG0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wLnRvRml4ZWQoMSl9cHhgKTtcclxuXHJcbiAgICByZXR1cm4gY29udGFpbmVyO1xyXG4gIH1cclxuXHJcbiAgc2hvdygpIHtcclxuICAgIGlmICh0aGlzLnZpc2libGUpIHJldHVybjtcclxuICAgIHRoaXMudmlzaWJsZSA9IHRydWU7XHJcblxyXG4gICAgY29uc3QgY29udGFpbmVyID0gVG9vbHRpcC5nZXRDb250YWluZXIoKTtcclxuXHJcbiAgICBpZiAodGhpcy5wb3NpdGlvbiA9PT0gXCJhdXRvXCIpIHtcclxuICAgICAgdGhpcy5jYWxjdWxhdGVQb3NpdGlvbihcclxuICAgICAgICB0aGlzLmNhblNob3dBdFRvcCA/IFwidG9wXCJcclxuICAgICAgICAgIDogdGhpcy5jYW5TaG93QXRCb3R0b20gPyBcImJvdHRvbVwiXHJcbiAgICAgICAgICAgIDogdGhpcy5jYW5TaG93QXRMZWZ0ID8gXCJsZWZ0XCJcclxuICAgICAgICAgICAgICA6IHRoaXMuY2FuU2hvd0F0UmlnaHQgPyBcInJpZ2h0XCJcclxuICAgICAgICAgICAgICAgIDogXCJ0b3BcIlxyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5jYWxjdWxhdGVQb3NpdGlvbih0aGlzLnBvc2l0aW9uKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMubGF5ZXJFbGVtZW50KTtcclxuICAgIHRoaXMubGF5ZXJFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJ2aXNpYmxlXCIpO1xyXG4gIH1cclxuXHJcbiAgY2FsY3VsYXRlUG9zaXRpb24ocG9zaXRpb24pIHtcclxuICAgIGNvbnN0IGJvdW5kaW5nUmVjdCA9IHRoaXMudGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cclxuICAgIHRoaXMubGF5ZXJFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoLi4uT2JqZWN0LnZhbHVlcyh0b29sdGlwUG9zaXRpb25zKSk7XHJcbiAgICB0aGlzLnRvb2x0aXBFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJ2ZXJ0aWNhbFwiLCBcImhvcml6b250YWxcIik7XHJcblxyXG4gICAgc3dpdGNoIChwb3NpdGlvbikge1xyXG4gICAgICBjYXNlIFwidG9wXCI6IHtcclxuICAgICAgICB0aGlzLmxheWVyRWxlbWVudC5zdHlsZS50b3AgPSBgJHtib3VuZGluZ1JlY3QudG9wIC0gdGhpcy50YXJnZXQub2Zmc2V0SGVpZ2h0IC0gMTB9cHhgO1xyXG4gICAgICAgIHRoaXMubGF5ZXJFbGVtZW50LnN0eWxlLmxlZnQgPSBgJHtib3VuZGluZ1JlY3QubGVmdH1weGA7XHJcbiAgICAgICAgdGhpcy5sYXllckVsZW1lbnQuY2xhc3NMaXN0LmFkZCh0b29sdGlwUG9zaXRpb25zLnRvcCk7XHJcbiAgICAgICAgdGhpcy50b29sdGlwRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwidmVydGljYWxcIik7XHJcbiAgICAgICAgdGhpcy5jZW50ZXJQb3NpdGlvbihcImhvcml6b250YWxcIik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSBcImJvdHRvbVwiOiB7XHJcbiAgICAgICAgdGhpcy5sYXllckVsZW1lbnQuc3R5bGUudG9wID0gYCR7Ym91bmRpbmdSZWN0LnRvcCArIHRoaXMudGFyZ2V0Lm9mZnNldEhlaWdodCArIDEwfXB4YDtcclxuICAgICAgICB0aGlzLmxheWVyRWxlbWVudC5zdHlsZS5sZWZ0ID0gYCR7Ym91bmRpbmdSZWN0LmxlZnR9cHhgO1xyXG4gICAgICAgIHRoaXMubGF5ZXJFbGVtZW50LmNsYXNzTGlzdC5hZGQodG9vbHRpcFBvc2l0aW9ucy5ib3R0b20pO1xyXG4gICAgICAgIHRoaXMudG9vbHRpcEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInZlcnRpY2FsXCIpO1xyXG4gICAgICAgIHRoaXMuY2VudGVyUG9zaXRpb24oXCJob3Jpem9udGFsXCIpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgXCJsZWZ0XCI6IHtcclxuICAgICAgICB0aGlzLmxheWVyRWxlbWVudC5zdHlsZS50b3AgPSBgJHtib3VuZGluZ1JlY3QudG9wfXB4YDtcclxuICAgICAgICB0aGlzLmxheWVyRWxlbWVudC5zdHlsZS5sZWZ0ID0gYCR7Ym91bmRpbmdSZWN0LmxlZnQgLSB0aGlzLnRhcmdldC5vZmZzZXRXaWR0aCAtIDEwfXB4YDtcclxuICAgICAgICB0aGlzLmxheWVyRWxlbWVudC5jbGFzc0xpc3QuYWRkKHRvb2x0aXBQb3NpdGlvbnMubGVmdCk7XHJcbiAgICAgICAgdGhpcy50b29sdGlwRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiaG9yaXpvbnRhbFwiKTtcclxuICAgICAgICB0aGlzLmNlbnRlclBvc2l0aW9uKFwidmVydGljYWxcIik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSBcInJpZ2h0XCI6IHtcclxuICAgICAgICB0aGlzLmxheWVyRWxlbWVudC5zdHlsZS50b3AgPSBgJHtib3VuZGluZ1JlY3QudG9wfXB4YDtcclxuICAgICAgICB0aGlzLmxheWVyRWxlbWVudC5zdHlsZS5sZWZ0ID0gYCR7Ym91bmRpbmdSZWN0LmxlZnQgKyB0aGlzLnRhcmdldC5vZmZzZXRXaWR0aCArIDEwfXB4YDtcclxuICAgICAgICB0aGlzLmxheWVyRWxlbWVudC5jbGFzc0xpc3QuYWRkKHRvb2x0aXBQb3NpdGlvbnMucmlnaHQpO1xyXG4gICAgICAgIHRoaXMudG9vbHRpcEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImhvcml6b250YWxcIik7XHJcbiAgICAgICAgdGhpcy5jZW50ZXJQb3NpdGlvbihcInZlcnRpY2FsXCIpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjZW50ZXJQb3NpdGlvbihkaXJlY3Rpb24pIHtcclxuICAgIHN3aXRjaCAoZGlyZWN0aW9uKSB7XHJcbiAgICAgIGNhc2UgXCJob3Jpem9udGFsXCI6IHtcclxuICAgICAgICBjb25zdCBjZW50ZXIgPSB0aGlzLnRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0ICsgKHRoaXMudGFyZ2V0Lm9mZnNldFdpZHRoIC8gMik7XHJcbiAgICAgICAgdGhpcy5sYXllckVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoXCJsZWZ0XCIsIGAke2NlbnRlciAtICh0aGlzLmxheWVyRWxlbWVudC5vZmZzZXRXaWR0aCAvIDIpfXB4YCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSBcInZlcnRpY2FsXCI6IHtcclxuICAgICAgICBjb25zdCBjZW50ZXIgPSB0aGlzLnRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgKyAodGhpcy50YXJnZXQub2Zmc2V0SGVpZ2h0IC8gMik7XHJcbiAgICAgICAgdGhpcy5sYXllckVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoXCJ0b3BcIiwgYCR7Y2VudGVyIC0gKHRoaXMubGF5ZXJFbGVtZW50Lm9mZnNldEhlaWdodCAvIDIpfXB4YCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGhpZGUoKSB7XHJcbiAgICBpZiAoIXRoaXMudmlzaWJsZSkgcmV0dXJuO1xyXG4gICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5sYXllckVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcInZpc2libGVcIik7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGhpcy5sYXllckVsZW1lbnQucmVtb3ZlKCk7XHJcbiAgICB9LCA1MCk7XHJcbiAgfVxyXG5cclxuICBnZXQgY2FuU2hvd0F0VG9wKCkgeyByZXR1cm4gdGhpcy50YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wIC0gdGhpcy5sYXllckVsZW1lbnQub2Zmc2V0SGVpZ2h0ID49IDA7IH1cclxuICBnZXQgY2FuU2hvd0F0Qm90dG9tKCkgeyByZXR1cm4gdGhpcy50YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgdGhpcy50YXJnZXQub2Zmc2V0SGVpZ2h0ICsgdGhpcy5sYXllckVsZW1lbnQub2Zmc2V0SGVpZ2h0IDw9IHdpbmRvdy5pbm5lckhlaWdodDsgfVxyXG4gIGdldCBjYW5TaG93QXRMZWZ0KCkgeyByZXR1cm4gdGhpcy50YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCAtIHRoaXMubGF5ZXJFbGVtZW50Lm9mZnNldFdpZHRoID49IDA7IH1cclxuICBnZXQgY2FuU2hvd0F0UmlnaHQoKSB7IHJldHVybiB0aGlzLnRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0ICsgdGhpcy50YXJnZXQub2Zmc2V0V2lkdGggKyB0aGlzLmxheWVyRWxlbWVudC5vZmZzZXRXaWR0aCA8PSB3aW5kb3cuaW5uZXJXaWR0aDsgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGUodGFyZ2V0LCBjb250ZW50LCBwb3NpdGlvbiA9IFwiYXV0b1wiKSB7XHJcbiAgcmV0dXJuIG5ldyBUb29sdGlwKHRhcmdldCwgY29udGVudCwgcG9zaXRpb24pO1xyXG59XHJcblxyXG5kb20ucGF0Y2goXHJcbiAgXCJbYWNvcmQtLXRvb2x0aXAtY29udGVudF1cIixcclxuICAoZWxtKSA9PiB7XHJcbiAgICBsZXQgdG9vbHRpcCA9IGNyZWF0ZShlbG0sIGVsbS5nZXRBdHRyaWJ1dGUoXCJhY29yZC0tdG9vbHRpcC1jb250ZW50XCIpLCBlbG0uZ2V0QXR0cmlidXRlKFwiYWNvcmQtLXRvb2x0aXAtcG9zaXRpb25cIikpO1xyXG4gICAgdG9vbHRpcC5kaXNhYmxlZCA9IGVsbS5nZXRBdHRyaWJ1dGUoXCJhY29yZC0tdG9vbHRpcC1kaXNhYmxlZFwiKSA9PT0gXCJ0cnVlXCI7XHJcblxyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgdG9vbHRpcC5kZXN0cm95KCk7XHJcbiAgICB9XHJcbiAgfSxcclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHsgY3JlYXRlIH07IiwgImltcG9ydCBkb20gZnJvbSBcIi4uL2RvbS9pbmRleC5qc1wiO1xyXG5pbXBvcnQgdXRpbHMgZnJvbSBcIi4uL3V0aWxzL2luZGV4LmpzXCI7XHJcblxyXG5jb25zdCB2YWxpZFBvc2l0aW9ucyA9IFtcclxuICBcInRvcC1yaWdodFwiLFxyXG4gIFwidG9wLWxlZnRcIixcclxuICBcImJvdHRvbS1yaWdodFwiLFxyXG4gIFwiYm90dG9tLWxlZnRcIixcclxuICBcInRvcC1jZW50ZXJcIixcclxuICBcImJvdHRvbS1jZW50ZXJcIixcclxuICBcImNlbnRlclwiLFxyXG4gIFwibGVmdC1jZW50ZXJcIixcclxuICBcInJpZ2h0LWNlbnRlclwiXHJcbl1cclxuXHJcbmZ1bmN0aW9uIGdldENvbnRhaW5lcihwb3NpdGlvbikge1xyXG4gIGlmICghdmFsaWRQb3NpdGlvbnMuaW5jbHVkZXMocG9zaXRpb24pKSB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgcG9zaXRpb24gXCIke3Bvc2l0aW9ufVwiLiBWYWxpZCBwb3NpdGlvbnMgYXJlOiAke3ZhbGlkUG9zaXRpb25zLmpvaW4oXCIsIFwiKX1gKTtcclxuICBjb25zdCBhcHBFbG0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbY2xhc3MqPVwibm90QXBwQXNpZGVQYW5lbC1cIl0nKTtcclxuXHJcbiAgbGV0IHRvcENvbnRhaW5lciA9IGFwcEVsbS5xdWVyeVNlbGVjdG9yKFwiLmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXItY29udGFpbmVyXCIpO1xyXG4gIGlmICghdG9wQ29udGFpbmVyKSB7XHJcbiAgICB0b3BDb250YWluZXIgPSBkb20ucGFyc2UoYDxkaXYgY2xhc3M9XCJhY29yZC0tbGF5ZXItY29udGFpbmVyIGFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXItY29udGFpbmVyXCI+PC9kaXY+YCk7XHJcbiAgICBhcHBFbG0uYXBwZW5kQ2hpbGQodG9wQ29udGFpbmVyKTtcclxuICB9XHJcbiAgdG9wQ29udGFpbmVyLnN0eWxlLnNldFByb3BlcnR5KFwiLS10b3Atb2Zmc2V0XCIsIGAke2FwcEVsbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AudG9GaXhlZCgxKX1weGApO1xyXG5cclxuICBsZXQgcG9zaXRpb25Db250YWluZXIgPSB0b3BDb250YWluZXIucXVlcnlTZWxlY3RvcihgLmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIuJHtwb3NpdGlvbn1gKTtcclxuICBpZiAoIXBvc2l0aW9uQ29udGFpbmVyKSB7XHJcbiAgICBwb3NpdGlvbkNvbnRhaW5lciA9IGRvbS5wYXJzZShgPGRpdiBjbGFzcz1cImFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIgJHtwb3NpdGlvbn1cIj48L2Rpdj5gKTtcclxuICAgIHRvcENvbnRhaW5lci5hcHBlbmRDaGlsZChwb3NpdGlvbkNvbnRhaW5lcik7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gcG9zaXRpb25Db250YWluZXI7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3coY29udGVudCwge1xyXG4gIHN0eWxlID0gXCJkZWZhdWx0XCIsXHJcbiAgdGltZW91dCA9IDEwMDAwLFxyXG4gIHBvc2l0aW9uID0gXCJ0b3AtcmlnaHRcIixcclxuICBjbG9zYWJsZSA9IHRydWUsXHJcbiAgb25DbGljayA9IG51bGwsXHJcbiAgb25DbG9zZSA9IG51bGxcclxufSA9IHt9KSB7XHJcbiAgY29uc3QgY29udGFpbmVyID0gZ2V0Q29udGFpbmVyKHBvc2l0aW9uKTtcclxuXHJcbiAgY29uc3Qgbm90aWZFbG0gPSBkb20ucGFyc2UoYFxyXG4gICAgPGRpdiBjbGFzcz1cImFjb3JkLS1ub3RpZmljYXRpb24gc3R5bGUtJHtzdHlsZX0gaGlkZGVuXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGVudFwiPjwvZGl2PlxyXG4gICAgICAgICAgICA8c3ZnIGNsYXNzPVwiY2xvc2UgJHshY2xvc2FibGUgPyBcImhpZGRlblwiIDogXCJcIn1cIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiPlxyXG4gICAgICAgICAgICAgICAgPHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNMTIgMTAuNTg2bDQuOTUtNC45NSAxLjQxNCAxLjQxNC00Ljk1IDQuOTUgNC45NSA0Ljk1LTEuNDE0IDEuNDE0LTQuOTUtNC45NS00Ljk1IDQuOTUtMS40MTQtMS40MTQgNC45NS00Ljk1LTQuOTUtNC45NUw3LjA1IDUuNjM2elwiLz5cclxuICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInByb2dyZXNzLWNvbnRhaW5lclwiIHN0eWxlPVwiLS1kdXJhdGlvbjogJHt0aW1lb3V0fW1zO1wiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZ3Jlc3NcIj48L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIGApO1xyXG5cclxuICBub3RpZkVsbS5xdWVyeVNlbGVjdG9yKFwiLmNvbnRlbnRcIikuaW5uZXJIVE1MID0gY29udGVudDtcclxuXHJcbiAgbGV0IGNsb3NlZCA9IGZhbHNlO1xyXG4gIGZ1bmN0aW9uIGNsb3NlKGNsb3NlVHlwZSkge1xyXG4gICAgaWYgKGNsb3NlZCkgcmV0dXJuO1xyXG4gICAgY2xvc2VkID0gdHJ1ZTtcclxuXHJcbiAgICBub3RpZkVsbS5jbGFzc0xpc3QuYWRkKFwiY2xvc2luZ1wiKTtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBub3RpZkVsbS5yZW1vdmUoKTtcclxuXHJcbiAgICAgIHV0aWxzLmlmRXhpc3RzKFxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLWNvbnRhaW5lcmApLFxyXG4gICAgICAgIC8qKiBAcGFyYW0ge0hUTUxEaXZFbGVtZW50fSBlbG0gKi8oZWxtKSA9PiB7XHJcbiAgICAgICAgICBpZiAoIShbLi4uZWxtLmNoaWxkTm9kZXMudmFsdWVzKCldLnJlZHVjZSgocHJldiwgY3VycikgPT4gcHJldiArIGN1cnIuY2hpbGRFbGVtZW50Q291bnQsIDApKSkgZWxtLnJlbW92ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgKTtcclxuICAgIH0sIDI3NSk7XHJcbiAgICBvbkNsb3NlPy4oY2xvc2VUeXBlKTtcclxuICB9XHJcblxyXG4gIGlmICh0eXBlb2Ygb25DbGljayA9PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgIG5vdGlmRWxtLmNsYXNzTGlzdC5hZGQoXCJjbGlja2FibGVcIik7XHJcbiAgICBub3RpZkVsbS5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgICBvbkNsaWNrKGNsb3NlKTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICB1dGlscy5pZkV4aXN0cyhub3RpZkVsbS5xdWVyeVNlbGVjdG9yKFwiLmNsb3NlXCIpLCAoZWxtKSA9PiB7XHJcbiAgICBlbG0ub25jbGljayA9ICgpID0+IHtcclxuICAgICAgY2xvc2UoXCJ1c2VyXCIpO1xyXG4gICAgfTtcclxuICB9KTtcclxuXHJcbiAgY29udGFpbmVyLnByZXBlbmQobm90aWZFbG0pO1xyXG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XHJcbiAgICBub3RpZkVsbS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xyXG4gICAgbm90aWZFbG0ucXVlcnlTZWxlY3RvcihcIi5wcm9ncmVzc1wiKS5jbGFzc0xpc3QuYWRkKFwicHJvZ3Jlc3NpbmdcIik7XHJcbiAgfSk7XHJcblxyXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgY2xvc2UoXCJ0aW1lb3V0XCIpO1xyXG4gIH0sIHRpbWVvdXQpO1xyXG5cclxuICByZXR1cm4gKCkgPT4ge1xyXG4gICAgY2xvc2UoXCJmb3JjZVwiKTtcclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgc2hvdzogT2JqZWN0LmFzc2lnbihzaG93LCB7XHJcbiAgICBpbmZvOiAoaHRtbCwgb2JqID0ge30pID0+IHNob3coaHRtbCwgeyAuLi5vYmosIHN0eWxlOiBcImluZm9cIiB9KSxcclxuICAgIGVycm9yOiAoaHRtbCwgb2JqID0ge30pID0+IHNob3coaHRtbCwgeyAuLi5vYmosIHN0eWxlOiBcImVycm9yXCIgfSksXHJcbiAgICB3YXJuaW5nOiAoaHRtbCwgb2JqID0ge30pID0+IHNob3coaHRtbCwgeyAuLi5vYmosIHN0eWxlOiBcIndhcm5pbmdcIiB9KSxcclxuICAgIHN1Y2Nlc3M6IChodG1sLCBvYmogPSB7fSkgPT4gc2hvdyhodG1sLCB7IC4uLm9iaiwgc3R5bGU6IFwic3VjY2Vzc1wiIH0pLFxyXG4gIH0pLFxyXG59OyIsICJpbXBvcnQgd2VicGFjayBmcm9tIFwiLi4vbW9kdWxlcy93ZWJwYWNrLmpzXCI7XHJcbmltcG9ydCBwYXRjaGVyIGZyb20gXCIuLi9wYXRjaGVyL2luZGV4LmpzXCI7XHJcbmltcG9ydCBsb2dnZXIgZnJvbSBcIi4uL3V0aWxzL2xvZ2dlci5qc1wiO1xyXG5cclxuaW1wb3J0IGNvbW1vbiBmcm9tIFwiLi4vbW9kdWxlcy9jb21tb24uanNcIjtcclxuaW1wb3J0IHsgZmluZGVyTWFwIH0gZnJvbSBcIi4uL21vZHVsZXMvcmF3L2NvbXBsZXgtZmluZGVyLmpzXCI7XHJcblxyXG5jb25zdCB7IFJlYWN0IH0gPSBjb21tb247XHJcblxyXG5sZXQgaXNSZWFkeSA9IGZhbHNlO1xyXG5cclxubGV0IENvbXBvbmVudHMgPSBudWxsO1xyXG5cclxubGV0IEFjdGlvbnMgPSBudWxsO1xyXG5cclxuKGFzeW5jICgpID0+IHtcclxuICBBY3Rpb25zID0gYXdhaXQgKGFzeW5jICgpID0+IHtcclxuICAgIGxldCBvZ01vZHVsZTtcclxuICAgIHdoaWxlICh0cnVlKSB7XHJcbiAgICAgIG9nTW9kdWxlID0gd2VicGFjay5maWx0ZXIobSA9PiBPYmplY3QudmFsdWVzKG0pLnNvbWUodiA9PiB0eXBlb2YgdiA9PT0gXCJmdW5jdGlvblwiICYmIHYudG9TdHJpbmcoKS5pbmNsdWRlcyhcIkNPTlRFWFRfTUVOVV9DTE9TRVwiKSkpLmZpbmQobSA9PiBtLmV4cG9ydHMgIT09IHdpbmRvdyk/LmV4cG9ydHM7XHJcbiAgICAgIGlmIChvZ01vZHVsZSkgYnJlYWs7XHJcbiAgICAgIGF3YWl0IG5ldyBQcm9taXNlKHIgPT4gc2V0VGltZW91dChyLCAxMDApKTtcclxuICAgIH1cclxuICAgIGNvbnN0IG91dCA9IGZpbmRlck1hcChvZ01vZHVsZSwge1xyXG4gICAgICBjbG9zZTogW1wiQ09OVEVYVF9NRU5VX0NMT1NFXCJdLFxyXG4gICAgICBvcGVuOiBbXCJyZW5kZXJMYXp5XCJdXHJcbiAgICB9KTtcclxuICAgIGlzUmVhZHkgPSAhIW91dC5jbG9zZSAmJiAhIW91dC5vcGVuO1xyXG4gICAgcmV0dXJuIG91dDtcclxuICB9KSgpO1xyXG5cclxuICBDb21wb25lbnRzID0gKCgpID0+IHtcclxuICAgIGNvbnN0IG91dCA9IHt9O1xyXG4gICAgY29uc3QgY29tcG9uZW50TWFwID0ge1xyXG4gICAgICBzZXBhcmF0b3I6IFwiU2VwYXJhdG9yXCIsXHJcbiAgICAgIGNoZWNrYm94OiBcIkNoZWNrYm94SXRlbVwiLFxyXG4gICAgICByYWRpbzogXCJSYWRpb0l0ZW1cIixcclxuICAgICAgY29udHJvbDogXCJDb250cm9sSXRlbVwiLFxyXG4gICAgICBncm91cHN0YXJ0OiBcIkdyb3VwXCIsXHJcbiAgICAgIGN1c3RvbWl0ZW06IFwiSXRlbVwiXHJcbiAgICB9O1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IG1vZHVsZUlkID0gT2JqZWN0LmVudHJpZXMod2VicGFjay5yZXF1aXJlLm0pLmZpbmQoKFssIG1dKSA9PiBtPy50b1N0cmluZygpLmluY2x1ZGVzKFwibWVudWl0ZW1jaGVja2JveFwiKSlbMF07XHJcbiAgICAgIGNvbnN0IGNvbnRleHRNZW51TW9kdWxlID0gd2VicGFjay5maW5kKChfLCBpZHgpID0+IGlkeCA9PSBtb2R1bGVJZCkuZXhwb3J0cztcclxuICAgICAgY29uc3QgcmF3TWF0Y2hlcyA9IHdlYnBhY2sucmVxdWlyZS5tW21vZHVsZUlkXS50b1N0cmluZygpLm1hdGNoQWxsKC9pZlxcKFxcdytcXC50eXBlPT09XFx3K1xcLihcXHcrKVxcKS4rP3R5cGU6XCIoLis/KVwiL2cpO1xyXG5cclxuICAgICAgb3V0Lk1lbnUgPSBPYmplY3QudmFsdWVzKGNvbnRleHRNZW51TW9kdWxlKS5maW5kKHYgPT4gdi50b1N0cmluZygpLmluY2x1ZGVzKFwiLmlzVXNpbmdLZXlib2FyZE5hdmlnYXRpb25cIikpO1xyXG5cclxuICAgICAgWy4uLnJhd01hdGNoZXNdLmZvckVhY2goKFssIGlkLCB0eXBlXSkgPT4ge1xyXG4gICAgICAgIG91dFtjb21wb25lbnRNYXBbdHlwZV1dID0gY29udGV4dE1lbnVNb2R1bGVbaWRdO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlzUmVhZHkgPSBPYmplY3Qua2V5cyhvdXQpLmxlbmd0aCA+IDE7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgaXNSZWFkeSA9IGZhbHNlO1xyXG4gICAgICBsb2dnZXIuZXJyb3IoXCJGYWlsZWQgdG8gbG9hZCBjb250ZXh0IG1lbnUgY29tcG9uZW50c1wiLCBlcnIpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBvdXQ7XHJcbiAgfSkoKTtcclxuXHJcbiAgTWVudVBhdGNoZXIuaW5pdGlhbGl6ZSgpO1xyXG59KSgpO1xyXG5cclxuXHJcbmNsYXNzIE1lbnVQYXRjaGVyIHtcclxuICBzdGF0aWMgTUFYX1BBVENIX0lURVJBVElPTlMgPSAxNjtcclxuICBzdGF0aWMgcGF0Y2hlcyA9IG5ldyBNYXAoKTtcclxuICBzdGF0aWMgc3ViUGF0Y2hlcyA9IG5ldyBXZWFrTWFwKCk7XHJcblxyXG4gIHN0YXRpYyBpbml0aWFsaXplKCkge1xyXG4gICAgaWYgKCFpc1JlYWR5KSByZXR1cm4gbG9nZ2VyLndhcm4oXCJVbmFibGUgdG8gbG9hZCBjb250ZXh0IG1lbnUuXCIpO1xyXG5cclxuICAgIGNvbnN0IG1vZHVsZVRvUGF0Y2ggPSB3ZWJwYWNrLmZpbHRlcihtID0+IE9iamVjdC52YWx1ZXMobSkuc29tZSh2ID0+IHR5cGVvZiB2ID09PSBcImZ1bmN0aW9uXCIgJiYgdi50b1N0cmluZygpLmluY2x1ZGVzKFwiQ09OVEVYVF9NRU5VX0NMT1NFXCIpKSkuZmluZChtID0+IG0uZXhwb3J0cyAhPT0gd2luZG93KS5leHBvcnRzO1xyXG4gICAgY29uc3Qga2V5VG9QYXRjaCA9IE9iamVjdC5rZXlzKG1vZHVsZVRvUGF0Y2gpLmZpbmQoayA9PiBtb2R1bGVUb1BhdGNoW2tdPy5sZW5ndGggPT09IDMpO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKG1vZHVsZVRvUGF0Y2gsIGtleVRvUGF0Y2gpO1xyXG5cclxuICAgIHBhdGNoZXIuYmVmb3JlKFxyXG4gICAgICBrZXlUb1BhdGNoLFxyXG4gICAgICBtb2R1bGVUb1BhdGNoLFxyXG4gICAgICBmdW5jdGlvbiAobWV0aG9kQXJncykge1xyXG4gICAgICAgIGNvbnN0IHByb21pc2UgPSBtZXRob2RBcmdzWzFdO1xyXG4gICAgICAgIG1ldGhvZEFyZ3NbMV0gPSBhc3luYyBmdW5jdGlvbiAoLi4uYXJncykge1xyXG4gICAgICAgICAgY29uc3QgcmVuZGVyID0gYXdhaXQgcHJvbWlzZS5jYWxsKHRoaXMsIC4uLmFyZ3MpO1xyXG5cclxuICAgICAgICAgIHJldHVybiAocHJvcHMpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcmVzID0gcmVuZGVyKHByb3BzKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChyZXM/LnByb3BzLm5hdklkKSB7XHJcbiAgICAgICAgICAgICAgTWVudVBhdGNoZXIuZXhlY3V0ZVBhdGNoZXMocmVzLnByb3BzLm5hdklkLCByZXMsIHByb3BzKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgcmVzPy50eXBlID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICAgICAgICBNZW51UGF0Y2hlci5wYXRjaFJlY3Vyc2l2ZShyZXMsIFwidHlwZVwiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlcztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBtZXRob2RBcmdzO1xyXG4gICAgICB9XHJcbiAgICApXHJcbiAgfVxyXG5cclxuICBzdGF0aWMgcGF0Y2hSZWN1cnNpdmUodGFyZ2V0LCBtZXRob2QsIGl0ZXJhdGlvbiA9IDApIHtcclxuICAgIGlmIChpdGVyYXRpb24gPj0gdGhpcy5NQVhfUEFUQ0hfSVRFUkFUSU9OUykgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IHByb3h5RnVuY3Rpb24gPSB0aGlzLnN1YlBhdGNoZXMuZ2V0KHRhcmdldFttZXRob2RdKSA/PyAoKCkgPT4ge1xyXG4gICAgICBjb25zdCBvcmlnaW5hbEZ1bmN0aW9uID0gdGFyZ2V0W21ldGhvZF07XHJcbiAgICAgIGNvbnN0IGRlcHRoID0gKytpdGVyYXRpb247XHJcbiAgICAgIGZ1bmN0aW9uIHBhdGNoKC4uLmFyZ3MpIHtcclxuICAgICAgICBjb25zdCByZXMgPSBvcmlnaW5hbEZ1bmN0aW9uLmNhbGwodGhpcywgLi4uYXJncyk7XHJcblxyXG4gICAgICAgIGlmICghcmVzKSByZXR1cm4gcmVzO1xyXG5cclxuICAgICAgICBjb25zdCBuYXZJZCA9IHJlcy5wcm9wcz8ubmF2SWQgPz8gcmVzLnByb3BzPy5jaGlsZHJlbj8ucHJvcHM/Lm5hdklkO1xyXG4gICAgICAgIGlmIChuYXZJZCkge1xyXG4gICAgICAgICAgTWVudVBhdGNoZXIuZXhlY3V0ZVBhdGNoZXMobmF2SWQsIHJlcywgYXJnc1swXSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnN0IGxheWVyID0gcmVzLnByb3BzLmNoaWxkcmVuID8gcmVzLnByb3BzLmNoaWxkcmVuIDogcmVzO1xyXG5cclxuICAgICAgICAgIGlmICh0eXBlb2YgbGF5ZXI/LnR5cGUgPT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgICAgIE1lbnVQYXRjaGVyLnBhdGNoUmVjdXJzaXZlKGxheWVyLCBcInR5cGVcIiwgZGVwdGgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJlcztcclxuICAgICAgfVxyXG5cclxuICAgICAgcGF0Y2guX19vcmlnaW5hbF9fID0gb3JpZ2luYWxGdW5jdGlvbjtcclxuICAgICAgT2JqZWN0LmFzc2lnbihwYXRjaCwgb3JpZ2luYWxGdW5jdGlvbik7XHJcbiAgICAgIHRoaXMuc3ViUGF0Y2hlcy5zZXQob3JpZ2luYWxGdW5jdGlvbiwgcGF0Y2gpO1xyXG5cclxuICAgICAgcmV0dXJuIHBhdGNoO1xyXG4gICAgfSkoKTtcclxuXHJcbiAgICB0YXJnZXRbbWV0aG9kXSA9IHByb3h5RnVuY3Rpb247XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZXhlY3V0ZVBhdGNoZXMoaWQsIHJlcywgcHJvcHMpIHtcclxuICAgIGlmICghdGhpcy5wYXRjaGVzLmhhcyhpZCkpIHJldHVybjtcclxuXHJcbiAgICB0aGlzLnBhdGNoZXMuZ2V0KGlkKS5mb3JFYWNoKHBhdGNoID0+IHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBwYXRjaChyZXMsIHByb3BzKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgbG9nZ2VyLmVycm9yKFwiRmFpbGVkIHRvIHBhdGNoIGNvbnRleHQgbWVudVwiLCBwYXRjaCwgZXJyKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcblxyXG5cclxuLy8gQ29waWVkIGZyb20gYmQncyBzb3VyY2VcclxuZnVuY3Rpb24gYnVpbGRJdGVtKHByb3BzKSB7XHJcbiAgY29uc3QgeyB0eXBlIH0gPSBwcm9wcztcclxuICBpZiAodHlwZSA9PT0gXCJzZXBhcmF0b3JcIikgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQ29tcG9uZW50cy5TZXBhcmF0b3IpO1xyXG5cclxuICBsZXQgY29tcG9uZW50ID0gQ29tcG9uZW50cy5JdGVtO1xyXG4gIGlmICh0eXBlID09PSBcInN1Ym1lbnVcIikge1xyXG4gICAgaWYgKCFwcm9wcy5jaGlsZHJlbikgcHJvcHMuY2hpbGRyZW4gPSBidWlsZE1lbnVDaGlsZHJlbihwcm9wcy5yZW5kZXIgfHwgcHJvcHMuaXRlbXMpO1xyXG4gIH0gZWxzZSBpZiAodHlwZSA9PT0gXCJ0b2dnbGVcIiB8fCB0eXBlID09PSBcInJhZGlvXCIpIHtcclxuICAgIGNvbXBvbmVudCA9IHR5cGUgPT09IFwidG9nZ2xlXCIgPyBDb21wb25lbnRzLkNoZWNrYm94SXRlbSA6IENvbXBvbmVudHMuUmFkaW9JdGVtO1xyXG4gICAgaWYgKHByb3BzLmFjdGl2ZSkgcHJvcHMuY2hlY2tlZCA9IHByb3BzLmFjdGl2ZTtcclxuICB9IGVsc2UgaWYgKHR5cGUgPT09IFwiY29udHJvbFwiKSB7XHJcbiAgICBjb21wb25lbnQgPSBDb21wb25lbnRzLkNvbnRyb2xJdGVtO1xyXG4gIH1cclxuICBpZiAoIXByb3BzLmlkKSBwcm9wcy5pZCA9IGAke3Byb3BzLmxhYmVsLnJlcGxhY2UoL15bXmEtel0rfFteXFx3LV0rL2dpLCBcIi1cIil9YDtcclxuICBpZiAocHJvcHMuZGFuZ2VyKSBwcm9wcy5jb2xvciA9IFwiY29sb3JEYW5nZXJcIjtcclxuICBwcm9wcy5leHRlbmRlZCA9IHRydWU7XHJcblxyXG4gIGlmICh0eXBlID09PSBcInRvZ2dsZVwiKSB7XHJcbiAgICBjb25zdCBbYWN0aXZlLCBkb1RvZ2dsZV0gPSBSZWFjdC51c2VTdGF0ZShwcm9wcy5jaGVja2VkIHx8IGZhbHNlKTtcclxuICAgIGNvbnN0IG9yaWdpbmFsQWN0aW9uID0gcHJvcHMuYWN0aW9uO1xyXG4gICAgcHJvcHMuY2hlY2tlZCA9IGFjdGl2ZTtcclxuICAgIHByb3BzLmFjdGlvbiA9IGZ1bmN0aW9uIChldikge1xyXG4gICAgICBvcmlnaW5hbEFjdGlvbihldik7XHJcbiAgICAgIGRvVG9nZ2xlKCFhY3RpdmUpO1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KGNvbXBvbmVudCwgcHJvcHMpO1xyXG59XHJcblxyXG4vLyBDb3BpZWQgZnJvbSBiZCdzIHNvdXJjZVxyXG5mdW5jdGlvbiBidWlsZE1lbnVDaGlsZHJlbihzZXR1cCkge1xyXG4gIGNvbnN0IG1hcHBlciA9IHMgPT4ge1xyXG4gICAgaWYgKHMudHlwZSA9PT0gXCJncm91cFwiKSByZXR1cm4gYnVpbGRHcm91cChzKTtcclxuICAgIHJldHVybiBidWlsZEl0ZW0ocyk7XHJcbiAgfTtcclxuICBjb25zdCBidWlsZEdyb3VwID0gZnVuY3Rpb24gKGdyb3VwKSB7XHJcbiAgICBjb25zdCBpdGVtcyA9IGdyb3VwLml0ZW1zLm1hcChtYXBwZXIpLmZpbHRlcihpID0+IGkpO1xyXG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTWVudUNvbXBvbmVudHMuR3JvdXAsIG51bGwsIGl0ZW1zKTtcclxuICB9O1xyXG4gIHJldHVybiBzZXR1cC5tYXAobWFwcGVyKS5maWx0ZXIoaSA9PiBpKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIF9fY2FjaGVfXzoge1xyXG4gICAgcGF0Y2hlczogTWVudVBhdGNoZXIucGF0Y2hlcyxcclxuICAgIHN1YlBhdGNoZXM6IE1lbnVQYXRjaGVyLnN1YlBhdGNoZXNcclxuICB9LFxyXG4gIHBhdGNoKG5hdklkLCBjYikge1xyXG4gICAgaWYgKCFNZW51UGF0Y2hlci5wYXRjaGVzLmhhcyhuYXZJZCkpIE1lbnVQYXRjaGVyLnBhdGNoZXMuc2V0KG5hdklkLCBuZXcgU2V0KCkpO1xyXG4gICAgTWVudVBhdGNoZXIucGF0Y2hlcy5nZXQobmF2SWQpLmFkZChjYik7XHJcblxyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgTWVudVBhdGNoZXIucGF0Y2hlcy5nZXQobmF2SWQpLmRlbGV0ZShjYik7XHJcbiAgICB9XHJcbiAgfSxcclxuICBvcGVuKGV2ZW50LCBjb21wb25lbnQsIGNvbmZpZykge1xyXG4gICAgcmV0dXJuIEFjdGlvbnMub3BlbihldmVudCwgKGUpID0+IFJlYWN0LmNyZWF0ZUVsZW1lbnQoY29tcG9uZW50LCBPYmplY3QuYXNzaWduKHt9LCBlLCB7IG9uQ2xvc2U6IEFjdGlvbnMuY2xvc2UgfSkpLCBjb25maWcpO1xyXG4gIH0sXHJcbiAgY2xvc2UoKSB7XHJcbiAgICByZXR1cm4gQWN0aW9ucy5jbG9zZSgpO1xyXG4gIH0sXHJcbiAgYnVpbGQ6IHtcclxuICAgIGl0ZW0oc2V0dXApIHtcclxuICAgICAgcmV0dXJuIGJ1aWxkTWVudUNoaWxkcmVuKHNldHVwKTtcclxuICAgIH0sXHJcbiAgICBtZW51KHNldHVwKSB7XHJcbiAgICAgIHJldHVybiAocHJvcHMpID0+IFJlYWN0LmNyZWF0ZUVsZW1lbnQoTWVudUNvbXBvbmVudHMuTWVudSwgcHJvcHMsIHRoaXMuYnVpbGRNZW51Q2hpbGRyZW4oc2V0dXApKTtcclxuICAgIH1cclxuICB9XHJcbn07IiwgImltcG9ydCBjb21tb24gZnJvbSBcIi4uLy4uL2FwaS9tb2R1bGVzL2NvbW1vblwiO1xyXG5pbXBvcnQgbG9nZ2VyIGZyb20gXCIuLi8uLi9hcGkvdXRpbHMvbG9nZ2VyLmpzXCI7XHJcbmNvbnN0IHsgUmVhY3QgfSA9IGNvbW1vbjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVycm9yQm91bmRhcnkgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcbiAgICB0aGlzLnN0YXRlID0geyBlcnJvcjogbnVsbCB9O1xyXG4gIH1cclxuXHJcbiAgY29tcG9uZW50RGlkQ2F0Y2goZXJyb3IpIHtcclxuICAgIHRoaXMuc2V0U3RhdGUoeyBlcnJvciB9KTtcclxuICAgIGxvZ2dlci5lcnJvcihlcnJvcik7XHJcbiAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMub25FcnJvciA9PT0gXCJmdW5jdGlvblwiKSB0aGlzLnByb3BzLm9uRXJyb3IoZXJyb3IpO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgaWYgKHRoaXMuc3RhdGUuZXJyb3IpIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImFjb3JkLS1yZWFjdC1lcnJvclwiPlxyXG4gICAgICA8cD5VbmV4cGVjdGVkIFJlYWN0IEVycm9yIEhhcHBlbmVkLjwvcD5cclxuICAgICAgPHA+e2Ake3RoaXMuc3RhdGUuZXJyb3J9YH08L3A+XHJcbiAgICA8L2Rpdj47XHJcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5jaGlsZHJlbjtcclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IG9yaWdpbmFsUmVuZGVyID0gRXJyb3JCb3VuZGFyeS5wcm90b3R5cGUucmVuZGVyO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoRXJyb3JCb3VuZGFyeS5wcm90b3R5cGUsIFwicmVuZGVyXCIsIHtcclxuICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICBjb25maWd1cmFibGU6IGZhbHNlLFxyXG4gIHNldDogZnVuY3Rpb24gKCkgeyB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3Qgc2V0IHJlbmRlciBtZXRob2Qgb2YgRXJyb3JCb3VuZGFyeVwiKTsgfSxcclxuICBnZXQ6ICgpID0+IG9yaWdpbmFsUmVuZGVyXHJcbn0pOyIsICJpbXBvcnQgRXJyb3JCb3VuZGFyeSBmcm9tIFwiLi4vLi4vbGliL2NvbXBvbmVudHMvRXJyb3JCb3VuZGFyeS5qc3hcIjtcclxuaW1wb3J0IGNvbW1vbiBmcm9tIFwiLi4vbW9kdWxlcy9jb21tb24uanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBFcnJvckJvdW5kYXJ5LFxyXG4gIEJ1dHRvbjogY29tbW9uLmNvbXBvbmVudHMuQnV0dG9uLFxyXG4gIE1hcmtkb3duOiBjb21tb24uY29tcG9uZW50cy5NYXJrZG93bixcclxuICBUZXh0OiBjb21tb24uY29tcG9uZW50cy5UZXh0LFxyXG4gIENvbmZpcm1hdGlvbk1vZGFsOiBjb21tb24uY29tcG9uZW50cy5Db25maXJtYXRpb25Nb2RhbCxcclxuICBNb2RhbFJvb3Q6IGNvbW1vbi5tb2RhbHMuY29tcG9uZW50cy5Sb290LFxyXG4gIE1vZGFsQ2xvc2VCdXR0b246IGNvbW1vbi5tb2RhbHMuY29tcG9uZW50cy5vdGhlci5DbG9zZUJ1dHRvbixcclxuICBNb2RhbEhlYWRlcjogY29tbW9uLm1vZGFscy5jb21wb25lbnRzLm90aGVyLkhlYWRlcixcclxuICBNb2RhbENvbnRlbnQ6IGNvbW1vbi5tb2RhbHMuY29tcG9uZW50cy5vdGhlci5Db250ZW50LFxyXG4gIE1vZGFsRm9vdGVyOiBjb21tb24ubW9kYWxzLmNvbXBvbmVudHMub3RoZXIuRm9vdGVyLFxyXG4gIE1vZGFsTGlzdENvbnRlbnQ6IGNvbW1vbi5tb2RhbHMuY29tcG9uZW50cy5vdGhlci5MaXN0Q29udGVudCxcclxuICBUb29sdGlwOiBjb21tb24uY29tcG9uZW50cy5Ub29sdGlwLFxyXG59IiwgImltcG9ydCBFcnJvckJvdW5kYXJ5IGZyb20gXCIuLi8uLi9saWIvY29tcG9uZW50cy9FcnJvckJvdW5kYXJ5LmpzeFwiO1xyXG5pbXBvcnQgY29tbW9uIGZyb20gXCIuLi9tb2R1bGVzL2NvbW1vbi5qc1wiO1xyXG5pbXBvcnQgaTE4biBmcm9tIFwiLi4vaTE4bi9pbmRleC5qc1wiXHJcbmNvbnN0IHsgUmVhY3QsIEZsdXhEaXNwYXRjaGVyLCBjb21wb25lbnRzLCBtb2RhbHMsIFVzZXJTdG9yZSB9ID0gY29tbW9uO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIHNob3c6IHtcclxuICAgIGNvbmZpcm1hdGlvbih0aXRsZSwgY29udGVudCwgeyBjb25maXJtID0gbnVsbCwgY2FuY2VsID0gbnVsbCwgZGFuZ2VyID0gZmFsc2UsIGtleSA9IHVuZGVmaW5lZCwgdGltZW91dCA9IDYwMDAwICogNSB9ID0ge30pIHtcclxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGNvbnRlbnQpKSBjb250ZW50ID0gW2NvbnRlbnRdO1xyXG4gICAgICAgIGNvbnRlbnQgPSBjb250ZW50Lm1hcChpID0+IHR5cGVvZiBpID09PSBcInN0cmluZ1wiID8gUmVhY3QuY3JlYXRlRWxlbWVudChjb21wb25lbnRzLk1hcmtkb3duLCBudWxsLCBpKSA6IGkpO1xyXG4gICAgICAgIGNvbnN0IG1vZGFsS2V5ID0gbW9kYWxzLmFjdGlvbnMub3BlbigocHJvcHMpID0+IHtcclxuICAgICAgICAgIGxldCBpbnRlcmFjdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICByZXR1cm4gPEVycm9yQm91bmRhcnkgb25FcnJvcj17KCkgPT4geyByZXNvbHZlKGZhbHNlKTsgfX0+XHJcbiAgICAgICAgICAgIDxjb21wb25lbnRzLkNvbmZpcm1hdGlvbk1vZGFsXHJcbiAgICAgICAgICAgICAgaGVhZGVyPXt0aXRsZX1cclxuICAgICAgICAgICAgICBjb25maXJtQnV0dG9uQ29sb3I9e2RhbmdlciA/IGNvbXBvbmVudHMuQnV0dG9uLkNvbG9ycy5SRUQgOiBjb21wb25lbnRzLkJ1dHRvbi5Db2xvcnMuQlJBTkR9XHJcbiAgICAgICAgICAgICAgY29uZmlybVRleHQ9e2NvbmZpcm0gfHwgaTE4bi5mb3JtYXQoXCJDT05GSVJNXCIpfVxyXG4gICAgICAgICAgICAgIGNhbmNlbFRleHQ9e2NhbmNlbH1cclxuICAgICAgICAgICAgICBvbkNhbmNlbD17KCkgPT4geyByZXNvbHZlKGZhbHNlKTsgbW9kYWxzLmFjdGlvbnMuY2xvc2UobW9kYWxLZXkpOyBpbnRlcmFjdGVkID0gdHJ1ZTsgfX1cclxuICAgICAgICAgICAgICBvbkNvbmZpcm09eygpID0+IHsgcmVzb2x2ZSh0cnVlKTsgbW9kYWxzLmFjdGlvbnMuY2xvc2UobW9kYWxLZXkpOyBpbnRlcmFjdGVkID0gdHJ1ZTsgfX1cclxuICAgICAgICAgICAgICB7Li4ucHJvcHN9XHJcbiAgICAgICAgICAgICAgb25DbG9zZT17KCkgPT4geyBwcm9wcy5vbkNsb3NlKCk7IHJlc29sdmUoZmFsc2UpOyBtb2RhbHMuYWN0aW9ucy5jbG9zZShtb2RhbEtleSk7IH19XHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICA8RXJyb3JCb3VuZGFyeSBvbkVycm9yPXsoKSA9PiB7IHJlc29sdmUoZmFsc2UpOyB9fT5cclxuICAgICAgICAgICAgICAgIHtjb250ZW50fVxyXG4gICAgICAgICAgICAgIDwvRXJyb3JCb3VuZGFyeT5cclxuICAgICAgICAgICAgPC9jb21wb25lbnRzLkNvbmZpcm1hdGlvbk1vZGFsPlxyXG4gICAgICAgICAgPC9FcnJvckJvdW5kYXJ5PlxyXG4gICAgICAgIH0sIHsgbW9kYWxLZXk6IGtleSB9KTtcclxuICAgICAgICBpZiAodGltZW91dCkge1xyXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghaW50ZXJhY3RlZCkge1xyXG4gICAgICAgICAgICAgIHJlc29sdmUoZmFsc2UpO1xyXG4gICAgICAgICAgICAgIG1vZGFscy5hY3Rpb25zLmNsb3NlKG1vZGFsS2V5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSwgdGltZW91dCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBjbG9zZShrZXkpIHtcclxuICAgICAgcmV0dXJuIG1vZGFscy5hY3Rpb25zLmNsb3NlKGtleSk7XHJcbiAgICB9LFxyXG4gICAgdXNlcih1c2VySWQpIHtcclxuICAgICAgaWYgKCFVc2VyU3RvcmUuZ2V0VXNlcih1c2VySWQpKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIEZsdXhEaXNwYXRjaGVyLmRpc3BhdGNoKHsgdHlwZTogXCJVU0VSX1BST0ZJTEVfTU9EQUxfT1BFTlwiLCB1c2VySWQgfSk7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSxcclxuICAgIGFsZXJ0KHRpdGxlLCBjb250ZW50LCB7IGNvbmZpcm0gPSBudWxsLCBrZXkgPSB1bmRlZmluZWQsIHRpbWVvdXQgPSA2MDAwMCAqIDUgfSA9IHt9KSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmNvbmZpcm1hdGlvbih0aXRsZSwgY29udGVudCwgeyBjb25maXJtLCBjYW5jZWw6IG51bGwsIGtleSwgdGltZW91dCB9KTtcclxuICAgIH1cclxuICB9XHJcbn0iLCAiaW1wb3J0IGRvbSBmcm9tIFwiLi4vZG9tL2luZGV4LmpzXCI7XHJcblxyXG5mdW5jdGlvbiBnZXRDb250YWluZXIoKSB7XHJcbiAgY29uc3QgYXBwRWxtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2NsYXNzKj1cIm5vdEFwcEFzaWRlUGFuZWwtXCJdJyk7XHJcblxyXG4gIGxldCB0b3BDb250YWluZXIgPSBhcHBFbG0ucXVlcnlTZWxlY3RvcihcIi5hY29yZC0tdG9hc3RzLWNvbnRhaW5lclwiKTtcclxuICBpZiAoIXRvcENvbnRhaW5lcikge1xyXG4gICAgdG9wQ29udGFpbmVyID0gZG9tLnBhcnNlKGA8ZGl2IGNsYXNzPVwiYWNvcmQtLWxheWVyLWNvbnRhaW5lciBhY29yZC0tdG9hc3RzLWNvbnRhaW5lclwiPjwvZGl2PmApO1xyXG4gICAgYXBwRWxtLmFwcGVuZENoaWxkKHRvcENvbnRhaW5lcik7XHJcbiAgfVxyXG4gIHRvcENvbnRhaW5lci5zdHlsZS5zZXRQcm9wZXJ0eShcIi0tdG9wLW9mZnNldFwiLCBgJHthcHBFbG0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wLnRvRml4ZWQoMSl9cHhgKTtcclxuXHJcbiAgcmV0dXJuIHRvcENvbnRhaW5lcjtcclxufVxyXG5cclxuY29uc3QgaWNvbnMgPSB7XHJcbiAgaW5mbzogYDxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiPjxwYXRoIGQ9XCJNMTIgMjJDNi40NzcgMjIgMiAxNy41MjMgMiAxMlM2LjQ3NyAyIDEyIDJzMTAgNC40NzcgMTAgMTAtNC40NzcgMTAtMTAgMTB6bS0xLTExdjZoMnYtNmgtMnptMC00djJoMlY3aC0yelwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIiAvPjwvc3ZnPmAsXHJcbiAgd2FybmluZzogYDxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiPjxwYXRoIGQ9XCJNMTIgMjJDNi40NzcgMjIgMiAxNy41MjMgMiAxMlM2LjQ3NyAyIDEyIDJzMTAgNC40NzcgMTAgMTAtNC40NzcgMTAtMTAgMTB6bS0xLTd2Mmgydi0yaC0yem0wLTh2NmgyVjdoLTJ6XCIgZmlsbD1cImN1cnJlbnRDb2xvclwiIC8+PC9zdmc+YCxcclxuICBlcnJvcjogYDxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiPjxwYXRoIGQ9XCJNMTIgMjJDNi40NzcgMjIgMiAxNy41MjMgMiAxMlM2LjQ3NyAyIDEyIDJzMTAgNC40NzcgMTAgMTAtNC40NzcgMTAtMTAgMTB6bS0xLTd2Mmgydi0yaC0yem0wLTh2NmgyVjdoLTJ6XCJmaWxsPVwiY3VycmVudENvbG9yXCIgLz48L3N2Zz5gLFxyXG4gIHN1Y2Nlc3M6IGA8c3ZnIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMjRcIj48cGF0aCBkPVwiTTEyIDIyQzYuNDc3IDIyIDIgMTcuNTIzIDIgMTJTNi40NzcgMiAxMiAyczEwIDQuNDc3IDEwIDEwLTQuNDc3IDEwLTEwIDEwem0tLjk5Ny02bDcuMDctNy4wNzEtMS40MTQtMS40MTQtNS42NTYgNS42NTctMi44MjktMi44MjktMS40MTQgMS40MTRMMTEuMDAzIDE2elwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIiAvPjwvc3ZnPmBcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIHNob3coXHJcbiAgY29udGVudCxcclxuICB7XHJcbiAgICBzdHlsZSA9IFwiZGVmYXVsdFwiLFxyXG4gICAgdGltZW91dCA9IDM1MDAsXHJcbiAgICBvbkNsaWNrID0gbnVsbCxcclxuICAgIGhpZGVJY29uID0gZmFsc2VcclxuICB9ID0ge31cclxuKSB7XHJcbiAgY29uc3QgY29udGFpbmVyID0gZ2V0Q29udGFpbmVyKCk7XHJcblxyXG4gIGNvbnN0IHRvYXN0RWxtID0gZG9tLnBhcnNlKGBcclxuICAgIDxkaXYgY2xhc3M9XCJhY29yZC0tdG9hc3Qgc3R5bGUtJHtzdHlsZX0gaGlkZGVuXCI+XHJcbiAgICAgICR7aGlkZUljb24gPyBcIlwiIDogKGljb25zW3N0eWxlXSB8fCBcIlwiKX1cclxuICAgICAgPGRpdiBjbGFzcz1cImNvbnRlbnRcIj48L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIGApO1xyXG5cclxuICB0b2FzdEVsbS5xdWVyeVNlbGVjdG9yKFwiLmNvbnRlbnRcIikuaW5uZXJIVE1MID0gY29udGVudDtcclxuXHJcbiAgbGV0IGNsb3NlZCA9IGZhbHNlO1xyXG4gIGZ1bmN0aW9uIGNsb3NlKCkge1xyXG4gICAgaWYgKGNsb3NlZCkgcmV0dXJuO1xyXG4gICAgY2xvc2VkID0gdHJ1ZTtcclxuXHJcbiAgICB0b2FzdEVsbS5jbGFzc0xpc3QuYWRkKFwiY2xvc2luZ1wiKTtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICB0b2FzdEVsbS5yZW1vdmUoKTtcclxuXHJcbiAgICAgIHV0aWxzLmlmRXhpc3RzKFxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5hY29yZC0tdG9hc3RzLWNvbnRhaW5lcmApLFxyXG4gICAgICAgIC8qKiBAcGFyYW0ge0hUTUxEaXZFbGVtZW50fSBlbG0gKi8oZWxtKSA9PiB7XHJcbiAgICAgICAgICBpZiAoIWVsbS5jaGlsZEVsZW1lbnRDb3VudCkgZWxtLnJlbW92ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgKTtcclxuICAgIH0sIDI3NSk7XHJcbiAgfVxyXG5cclxuICBpZiAodHlwZW9mIG9uQ2xpY2sgPT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICB0b2FzdEVsbS5jbGFzc0xpc3QuYWRkKFwiY2xpY2thYmxlXCIpO1xyXG4gICAgdG9hc3RFbG0ub25jbGljayA9ICgpID0+IHtcclxuICAgICAgb25DbGljayhjbG9zZSk7XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKHRvYXN0RWxtKTtcclxuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xyXG4gICAgdG9hc3RFbG0uY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcclxuICB9KTtcclxuXHJcbiAgc2V0VGltZW91dChjbG9zZSwgdGltZW91dCk7XHJcblxyXG4gIHJldHVybiAoKSA9PiB7XHJcbiAgICBjbG9zZSgpO1xyXG4gIH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBzaG93OiBPYmplY3QuYXNzaWduKHNob3csIHtcclxuICAgIGluZm86IChodG1sLCBvYmogPSB7fSkgPT4gc2hvdyhodG1sLCB7IC4uLm9iaiwgc3R5bGU6IFwiaW5mb1wiIH0pLFxyXG4gICAgZXJyb3I6IChodG1sLCBvYmogPSB7fSkgPT4gc2hvdyhodG1sLCB7IC4uLm9iaiwgc3R5bGU6IFwiZXJyb3JcIiB9KSxcclxuICAgIHdhcm5pbmc6IChodG1sLCBvYmogPSB7fSkgPT4gc2hvdyhodG1sLCB7IC4uLm9iaiwgc3R5bGU6IFwid2FybmluZ1wiIH0pLFxyXG4gICAgc3VjY2VzczogKGh0bWwsIG9iaiA9IHt9KSA9PiBzaG93KGh0bWwsIHsgLi4ub2JqLCBzdHlsZTogXCJzdWNjZXNzXCIgfSlcclxuICB9KVxyXG59IiwgImltcG9ydCBwYXRjaGVyIGZyb20gXCIuLi9wYXRjaGVyL2luZGV4LmpzXCI7XHJcbmltcG9ydCBzdHlsZUNTU1RleHQgZnJvbSBcIi4vc3R5bGVzLnNjc3NcIjtcclxucGF0Y2hlci5pbmplY3RDU1Moc3R5bGVDU1NUZXh0KTtcclxuXHJcbmltcG9ydCB0b29sdGlwcyBmcm9tIFwiLi90b29sdGlwcy5qc1wiO1xyXG5pbXBvcnQgbm90aWZpY2F0aW9ucyBmcm9tIFwiLi9ub3RpZmljYXRpb25zLmpzXCI7XHJcbmltcG9ydCBjb250ZXh0TWVudXMgZnJvbSBcIi4vY29udGV4dE1lbnVzLmpzXCI7XHJcbmltcG9ydCBjb21wb25lbnRzIGZyb20gXCIuL2NvbXBvbmVudHMuanNcIjtcclxuaW1wb3J0IG1vZGFscyBmcm9tIFwiLi9tb2RhbHMuanN4XCI7XHJcbmltcG9ydCB0b2FzdHMgZnJvbSBcIi4vdG9hc3RzLmpzXCI7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIHRvb2x0aXBzLFxyXG4gIG5vdGlmaWNhdGlvbnMsXHJcbiAgY29udGV4dE1lbnVzLFxyXG4gIGNvbXBvbmVudHMsXHJcbiAgbW9kYWxzLFxyXG4gIHRvYXN0c1xyXG59IiwgImltcG9ydCBtb2R1bGVzIGZyb20gJy4vbW9kdWxlcyc7XHJcbmltcG9ydCBkZXYgZnJvbSAnLi9kZXYnO1xyXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi91dGlscyc7XHJcbmltcG9ydCBleHRlbnNpb25zIGZyb20gJy4vZXh0ZW5zaW9ucyc7XHJcbmltcG9ydCBpMThuIGZyb20gJy4vaTE4bic7XHJcbmltcG9ydCBzdG9yYWdlIGZyb20gJy4vc3RvcmFnZSc7XHJcbmltcG9ydCBldmVudHMgZnJvbSAnLi9ldmVudHMnO1xyXG5pbXBvcnQgcGF0Y2hlciBmcm9tICcuL3BhdGNoZXInO1xyXG5pbXBvcnQgaW50ZXJuYWwgZnJvbSAnLi9pbnRlcm5hbCc7XHJcbmltcG9ydCB3ZWJzb2NrZXQgZnJvbSAnLi93ZWJzb2NrZXQnO1xyXG5pbXBvcnQgdWkgZnJvbSAnLi91aS9pbmRleC5qcyc7XHJcblxyXG51dGlscy5sb2dnZXIuZGVidWcoYFBSRUxPQURfS0VZOiA8UFJFTE9BRF9LRVk+YCk7XHJcblxyXG5mdW5jdGlvbiBkZXZFcnJvcihhcGkpIHtcclxuICByZXR1cm4gbmV3IEVycm9yKGBUaGUgJHthcGl9IEFQSSBjYW4gb25seSBiZSBhY2Nlc3NlZCB3aGVuIERldiBtb2RlIGlzIGVuYWJsZWQhYCk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBleHBvc2VkQVBJOiB7XHJcbiAgICBkZXYsXHJcbiAgICB1dGlscyxcclxuICAgIGkxOG4sXHJcbiAgICBldmVudHMsXHJcbiAgICB1aSxcclxuICAgIGdldCBwYXRjaGVyKCkge1xyXG4gICAgICBpZiAoIWRldi5lbmFibGVkKSB0aHJvdyBkZXZFcnJvcihcIlBhdGNoZXJcIik7XHJcbiAgICAgIHJldHVybiBwYXRjaGVyO1xyXG4gICAgfSxcclxuICAgIGdldCBzdG9yYWdlKCkge1xyXG4gICAgICBpZiAoIWRldi5lbmFibGVkKSB0aHJvdyBkZXZFcnJvcihcIlN0b3JhZ2VcIik7XHJcbiAgICAgIHJldHVybiBzdG9yYWdlO1xyXG4gICAgfSxcclxuICAgIGdldCBtb2R1bGVzKCkge1xyXG4gICAgICBpZiAoIWRldi5lbmFibGVkKSB0aHJvdyBkZXZFcnJvcihcIk1vZHVsZXNcIik7XHJcbiAgICAgIHJldHVybiBtb2R1bGVzO1xyXG4gICAgfSxcclxuICAgIGdldCBleHRlbnNpb25zKCkge1xyXG4gICAgICBpZiAoIWRldi5lbmFibGVkKSB0aHJvdyBkZXZFcnJvcihcIkV4dGVuc2lvbnNcIik7XHJcbiAgICAgIHJldHVybiBleHRlbnNpb25zO1xyXG4gICAgfSxcclxuICAgIGdldCBpbnRlcm5hbCgpIHtcclxuICAgICAgaWYgKCFkZXYuZW5hYmxlZCkgdGhyb3cgZGV2RXJyb3IoXCJJbnRlcm5hbFwiKTtcclxuICAgICAgcmV0dXJuIGludGVybmFsO1xyXG4gICAgfSxcclxuICAgIGdldCB3ZWJzb2NrZXQoKSB7XHJcbiAgICAgIGlmICghZGV2LmVuYWJsZWQpIHRocm93IGRldkVycm9yKFwiV2Vic29ja2V0XCIpO1xyXG4gICAgICByZXR1cm4gd2Vic29ja2V0O1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgdW5leHBvc2VkQVBJOiB7XHJcbiAgICBkZXYsXHJcbiAgICBtb2R1bGVzLFxyXG4gICAgdXRpbHMsXHJcbiAgICBleHRlbnNpb25zLFxyXG4gICAgaTE4bixcclxuICAgIHN0b3JhZ2UsXHJcbiAgICBldmVudHMsXHJcbiAgICBwYXRjaGVyLFxyXG4gICAgaW50ZXJuYWwsXHJcbiAgICB3ZWJzb2NrZXQsXHJcbiAgICB1aVxyXG4gIH1cclxufSIsICJpbXBvcnQgbW9kdWxlcyBmcm9tIFwiLi4vYXBpL21vZHVsZXMvaW5kZXguanNcIjtcclxuaW1wb3J0IG1vZGFscyBmcm9tIFwiLi4vYXBpL3VpL21vZGFscy5qc3hcIjtcclxuaW1wb3J0IG5vdGlmaWNhdGlvbnMgZnJvbSBcIi4uL2FwaS91aS9ub3RpZmljYXRpb25zLmpzXCI7XHJcbmltcG9ydCBleHRlbnNpb25zIGZyb20gXCIuLi9hcGkvZXh0ZW5zaW9ucy9pbmRleC5qc1wiO1xyXG5pbXBvcnQgd2Vic29ja2V0IGZyb20gXCIuLi9hcGkvd2Vic29ja2V0L2luZGV4LmpzXCI7XHJcblxyXG53ZWJzb2NrZXQuc2V0KFwiSW5zdGFsbEV4dGVuc2lvblwiLCBhc3luYyAoeyB1cmwgfSA9IHt9KSA9PiB7XHJcbiAgaWYgKCF1cmwpIHJldHVybjtcclxuXHJcbiAgYXdhaXQgbW9kdWxlcy5uYXRpdmUud2luZG93LnNldEFsd2F5c09uVG9wKDAsIHRydWUpO1xyXG4gIGF3YWl0IG5ldyBQcm9taXNlKHIgPT4gc2V0VGltZW91dChyLCAyNTApKTtcclxuICBhd2FpdCBtb2R1bGVzLm5hdGl2ZS53aW5kb3cuc2V0QWx3YXlzT25Ub3AoMCwgdHJ1ZSk7XHJcblxyXG4gIGNvbnN0IHN1Y2Nlc3MgPSBhd2FpdCBtb2RhbHMuc2hvdy5jb25maXJtYXRpb24oXHJcbiAgICBhY29yZC5pMThuLmZvcm1hdChcIklNUE9SVF9FWFRFTlNJT05fTU9EQUxfVElUTEVcIiksXHJcbiAgICBhY29yZC5pMThuLmZvcm1hdChcIklNUE9SVF9FWFRFTlNJT05fTU9EQUxfREVTQ1JJUFRJT05cIiwgdXJsKVxyXG4gICk7XHJcblxyXG4gIGlmICghc3VjY2VzcykgcmV0dXJuO1xyXG5cclxuICB0cnkge1xyXG4gICAgYXdhaXQgZXh0ZW5zaW9ucy5sb2FkKHVybCk7XHJcbiAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICBub3RpZmljYXRpb25zLnNob3cuZXJyb3IoYCR7ZXJyfWAsIHsgdGltZW91dDogMzAwMDAgfSk7XHJcbiAgfVxyXG59KTsiLCAiaW1wb3J0IGRvbSBmcm9tIFwiLi4vYXBpL2RvbS9pbmRleC5qc1wiO1xyXG5pbXBvcnQgdXRpbHMgZnJvbSBcIi4uL2FwaS91dGlscy9pbmRleC5qc1wiO1xyXG5cclxuZG9tLnBhdGNoKCdhW2hyZWY9XCIvc3RvcmVcIl1bZGF0YS1saXN0LWl0ZW0taWQkPVwiX19fbml0cm9cIl0nLCAoZWxtKSA9PiB7XHJcbiAgdXRpbHMuaWZFeGlzdHMoXHJcbiAgICBlbG0ucXVlcnlTZWxlY3RvcignW2NsYXNzKj1cIm5hbWVBbmREZWNvcmF0b3JzLVwiXSBbY2xhc3MqPVwibmFtZS1cIl0nKSxcclxuICAgIChuYW1lRWxtKSA9PiB7XHJcbiAgICAgIG5hbWVFbG0udGV4dENvbnRlbnQgPSBcIkFjb3JkXCI7XHJcbiAgICB9XHJcbiAgKTtcclxuXHJcbiAgdXRpbHMuaWZFeGlzdHMoXHJcbiAgICBlbG0ucXVlcnlTZWxlY3RvcignW2NsYXNzKj1cImF2YXRhcldpdGhUZXh0LVwiXSBbY2xhc3MqPVwiYXZhdGFyLVwiXSBzdmcnKSxcclxuICAgIGZpbGxTVkdFbG1XaXRoQWNvcmRMb2dvXHJcbiAgKTtcclxufSk7XHJcblxyXG5kb20ucGF0Y2goJ1tjbGFzcyo9XCJhcHBsaWNhdGlvblN0b3JlLVwiXSBbY2xhc3MqPVwiaG9tZVdyYXBwZXJOb3JtYWwtXCJdJywgKGVsbSkgPT4ge1xyXG4gIHV0aWxzLmlmRXhpc3RzKFxyXG4gICAgZWxtLnF1ZXJ5U2VsZWN0b3IoJ1tjbGFzcyo9XCJoZWFkZXJCYXItXCJdIFtjbGFzcyo9XCJ0aXRsZVdyYXBwZXItXCJdIFtjbGFzcyo9XCJ0aXRsZS1cIl0nKSxcclxuICAgICh0aXRsZUVsbSkgPT4ge1xyXG4gICAgICB0aXRsZUVsbS50ZXh0Q29udGVudCA9IFwiQWNvcmRcIjtcclxuICAgIH1cclxuICApO1xyXG4gIHV0aWxzLmlmRXhpc3RzKFxyXG4gICAgZWxtLnF1ZXJ5U2VsZWN0b3IoJ1tjbGFzcyo9XCJoZWFkZXJCYXItXCJdIFtjbGFzcyo9XCJpY29uV3JhcHBlci1cIl0gW2NsYXNzKj1cImljb24tXCJdJyksXHJcbiAgICBmaWxsU1ZHRWxtV2l0aEFjb3JkTG9nb1xyXG4gICk7XHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gZmlsbFNWR0VsbVdpdGhBY29yZExvZ28oc3ZnRWxtKSB7XHJcbiAgc3ZnRWxtLnNldEF0dHJpYnV0ZShcInZpZXdCb3hcIiwgXCIwIDAgODEzLjUgMTQ5M1wiKTtcclxuICBzdmdFbG0uc2V0QXR0cmlidXRlKFwieG1sbnNcIiwgXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiKTtcclxuICBzdmdFbG0uaW5uZXJIVE1MID0gYFxyXG4gICAgPGRlZnM+XHJcbiAgICAgIDxzdHlsZT5cclxuICAgICAgICAuYWNvcmQtLWxvZ28tY29sb3Ige1xyXG4gICAgICAgICAgZmlsbDogY3VycmVudENvbG9yO1xyXG4gICAgICAgICAgZmlsbC1ydWxlOiBldmVub2RkO1xyXG4gICAgICAgIH1cclxuICAgICAgPC9zdHlsZT5cclxuICAgIDwvZGVmcz5cclxuICAgIDxnPlxyXG4gICAgICA8cGF0aCBjbGFzcz1cImFjb3JkLS1sb2dvLWNvbG9yXCIgZD1cIk04MTcuMjY2LDEzMjIuNWgyODV2MzY1aC0yODV2LTM2NVpcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoLTU1My4yNSAtMjEzLjUpXCIvPlxyXG4gICAgICA8cGF0aCBjbGFzcz1cImFjb3JkLS1sb2dvLWNvbG9yXCIgZD1cIk01NTUuMjM1LDE1MjMuNzhzOTEuMTY5LTMxOS44NSw5Mi41MzEtMzE5LjI4YzExNC43LDQ3LjgzLDE2MCwxOTIsMTYwLDE5MmwtNTIuMTIsMTg2LjYxcy0zMS4xMjksMTM3LjcxLTgwLjg4LDEyMC4zOUM1MjguMDI2LDE2NTIuNDIsNTU1LjIzNSwxNTIzLjc4LDU1NS4yMzUsMTUyMy43OFpcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoLTU1My4yNSAtMjEzLjUpXCIvPlxyXG4gICAgICA8cGF0aCBjbGFzcz1cImFjb3JkLS1sb2dvLWNvbG9yXCIgZD1cIk0xMzY0Ljc3LDE1MjUuMjhzLTkxLjE3LTMxOS44NS05Mi41NC0zMTkuMjhjLTExNC43LDQ3LjgzLTE2MCwxOTItMTYwLDE5Mmw1Mi4xMiwxODYuNjFzMzEuMTMsMTM3LjcxLDgwLjg4LDEyMC4zOUMxMzkxLjk3LDE2NTMuOTIsMTM2NC43NywxNTI1LjI4LDEzNjQuNzcsMTUyNS4yOFpcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoLTU1My4yNSAtMjEzLjUpXCIvPlxyXG4gICAgPC9nPlxyXG4gICAgPHBhdGggY2xhc3M9XCJhY29yZC0tbG9nby1jb2xvclwiIGQ9XCJNODc0Ljc2NiwyNzUuNXMxNC41NzktNjEuOTE4LDg3LTYyYzgwLjgyNC0uMDkyLDg3LDYyLDg3LDYyczE5OS40Myw4NTEuNDcsMTk4LDg1MmMtMjEwLjMzLDc3LjcxLTE0NiwxODAtMTQ2LDE4MGgtMjgxczYzLjctMTAzLjgyLTE0Ni0xODFDNjcxLjAxNCwxMTI1LjQ5LDg3NC43NjYsMjc1LjUsODc0Ljc2NiwyNzUuNVpcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoLTU1My4yNSAtMjEzLjUpXCIvPlxyXG4gICAgPGc+XHJcbiAgICAgIDxwYXRoIGNsYXNzPVwiYWNvcmQtLWxvZ28tY29sb3JcIiBkPVwiTTEyMzguMTQsODk3LjVhNTMuODgyLDUzLjg4MiwwLDAsMSw1My44OCw1My44NzVjMCwyNC45MzktMjAuMjUsNDYuOTg3LTQzLjI1LDUzLjEyNS00LjQ1LDEuMTgtMTAuMTktMzktMTEtMzktMC41OCwwLTI3LjcxLDMuNTEtMzEsNC01LjU4LjgyOC0xMS45My0xMy44NzYtNC0yMCwxLjkzLTEuNDkxLDI2LjYyLTYuOTU5LDI5LTcsMC42Mi0uMDExLTcuMzQtNDEuNjE4LTctNDNDMTIyNS42NCw4OTUuOTQ0LDEyMzMuNTIsODk3LjUsMTIzOC4xNCw4OTcuNVpcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoLTU1My4yNSAtMjEzLjUpXCIvPlxyXG4gICAgICA8cGF0aCBjbGFzcz1cImFjb3JkLS1sb2dvLWNvbG9yXCIgZD1cIk0xMTczLjY0LDYzMi41YTUzLjg4Miw1My44ODIsMCwwLDEsNTMuODgsNTMuODc1YzAsMjQuOTM5LTIwLjI1LDQ2Ljk4Ny00My4yNSw1My4xMjUtNC40NSwxLjE4NS0xMC4xOS0zOS0xMS0zOS0wLjU4LDAtMjcuNzEsMy41MS0zMSw0LTUuNTguODI4LTExLjkzLTEzLjg3Ni00LTIwLDEuOTMtMS40OTEsMjYuNjItNi45NTksMjktNywwLjYyLS4wMTEtNy4zNC00MS42MTgtNy00M0MxMTYxLjE0LDYzMC45NDQsMTE2OS4wMiw2MzIuNSwxMTczLjY0LDYzMi41WlwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgtNTUzLjI1IC0yMTMuNSlcIi8+XHJcbiAgICAgIDxwYXRoIGNsYXNzPVwiYWNvcmQtLWxvZ28tY29sb3JcIiBkPVwiTTExMTUuMTYsMzczYTUzLjg3NCw1My44NzQsMCwwLDEsNTMuODcsNTMuODc1YzAsMjQuOTM5LTIwLjI0LDQ2Ljk4Ny00My4yNSw1My4xMjUtNC40NCwxLjE4NS0xMC4xOC0zOS0xMS0zOS0wLjU4LDAtMjcuNywzLjUxLTMxLDQtNS41Ny44MjgtMTEuOTItMTMuODc2LTQtMjAsMS45My0xLjQ5MSwyNi42Mi02Ljk1OSwyOS03LDAuNjItLjAxMS03LjM0LTQxLjYxOC03LTQzQzExMDIuNjUsMzcxLjQ0NCwxMTEwLjUzLDM3MywxMTE1LjE2LDM3M1pcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoLTU1My4yNSAtMjEzLjUpXCIvPlxyXG4gICAgPC9nPlxyXG4gICAgPGc+XHJcbiAgICAgIDxwYXRoIGNsYXNzPVwiYWNvcmQtLWxvZ28tY29sb3JcIiBkPVwiTTY4My45MjIsODk3Ljc1YTUzLjg3NSw1My44NzUsMCwwLDAtNTMuODc1LDUzLjg3NWMwLDI0LjkzOSwyMC4yNDUsNDYuOTg3LDQzLjI1LDUzLjEyNSw0LjQ0MSwxLjE4LDEwLjE4NS0zOSwxMS0zOSwwLjU3NiwwLDI3LjcsMy41MSwzMSw0LDUuNTcyLDAuODI4LDExLjkyNi0xMy44NzYsNC0yMC0xLjkzLTEuNDkxLTI2LjYyMS02Ljk1OS0yOS03LTAuNjItLjAxMSw3LjMzOS00MS42MTgsNy00M0M2OTYuNDI0LDg5Ni4xOTQsNjg4LjU0NCw4OTcuNzUsNjgzLjkyMiw4OTcuNzVaXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKC01NTMuMjUgLTIxMy41KVwiLz5cclxuICAgICAgPHBhdGggY2xhc3M9XCJhY29yZC0tbG9nby1jb2xvclwiIGQ9XCJNNzQ4LjQyMiw2MzIuNzVhNTMuODc1LDUzLjg3NSwwLDAsMC01My44NzUsNTMuODc1YzAsMjQuOTM5LDIwLjI0NSw0Ni45ODcsNDMuMjUsNTMuMTI1LDQuNDQxLDEuMTg1LDEwLjE4NS0zOSwxMS0zOSwwLjU3NiwwLDI3LjcsMy41MSwzMSw0LDUuNTcyLDAuODI4LDExLjkyNi0xMy44NzYsNC0yMC0xLjkzLTEuNDkxLTI2LjYyMS02Ljk1OS0yOS03LTAuNjItLjAxMSw3LjMzOS00MS42MTgsNy00M0M3NjAuOTI0LDYzMS4xOTQsNzUzLjA0NCw2MzIuNzUsNzQ4LjQyMiw2MzIuNzVaXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKC01NTMuMjUgLTIxMy41KVwiLz5cclxuICAgICAgPHBhdGggY2xhc3M9XCJhY29yZC0tbG9nby1jb2xvclwiIGQ9XCJNODA2LjkwNiwzNzMuMjVhNTMuODc1LDUzLjg3NSwwLDAsMC01My44NzUsNTMuODc1YzAsMjQuOTM5LDIwLjI0NSw0Ni45ODcsNDMuMjUsNTMuMTI1LDQuNDQyLDEuMTg1LDEwLjE4NS0zOSwxMS0zOSwwLjU3NywwLDI3LjcsMy41MSwzMSw0LDUuNTcyLDAuODI4LDExLjkyNi0xMy44NzYsNC0yMC0xLjkzLTEuNDkxLTI2LjYyMS02Ljk1OS0yOS03LTAuNjItLjAxMSw3LjMzOS00MS42MTgsNy00M0M4MTkuNDA5LDM3MS42OTQsODExLjUyOCwzNzMuMjUsODA2LjkwNiwzNzMuMjVaXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKC01NTMuMjUgLTIxMy41KVwiLz5cclxuICAgIDwvZz5cclxuICBgO1xyXG59IiwgImltcG9ydCB7IHdhaXRVbnRpbENvbm5lY3Rpb25PcGVuIH0gZnJvbSBcIi4vb3RoZXIvdXRpbHMuanNcIjtcclxuaW1wb3J0IGxvYWRpbmdBbmltYXRpb24gZnJvbSBcIi4vb3RoZXIvbG9hZGluZy1hbmltYXRpb25cIjtcclxuaW1wb3J0IGFwaSBmcm9tIFwiLi9hcGlcIjtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3csIFwiYWNvcmRcIiwge1xyXG4gIGdldCgpIHtcclxuICAgIHJldHVybiBhcGkuZXhwb3NlZEFQSTtcclxuICB9XHJcbn0pO1xyXG53aW5kb3cuZ2xvYmFsID0gd2luZG93O1xyXG5cclxuKGFzeW5jICgpID0+IHtcclxuICBsb2FkaW5nQW5pbWF0aW9uLnNob3coKTtcclxuICBhd2FpdCB3YWl0VW50aWxDb25uZWN0aW9uT3BlbigpO1xyXG4gIGxvYWRpbmdBbmltYXRpb24uaGlkZSgpO1xyXG59KSgpO1xyXG5cclxuLy8gZXh0cmFzXHJcbmltcG9ydCBcIi4vb3RoZXIvd2Vic29ja2V0LXRyaWdnZXJzLmpzXCI7XHJcbmltcG9ydCBcIi4vdWkvaW5kZXguanNcIjsiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUNBLFdBQU8sZUFBZSxTQUFTLGNBQWMsRUFBRSxPQUFPLEtBQUssQ0FBQztB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QUFBLE1BQ04sTUFBUTtBQUFBLFFBQ04sT0FBUztBQUFBLFVBQ1A7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLE1BQ0EsUUFBVTtBQUFBLFFBQ1IsUUFBVTtBQUFBLFFBQ1YsSUFBTTtBQUFBLFFBQ04sSUFBTTtBQUFBLFVBQ0o7QUFBQSxZQUNFO0FBQUEsWUFDQTtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLE9BQVM7QUFBQSxNQUNQLElBQU07QUFBQSxNQUNOLE1BQVE7QUFBQSxRQUNOLE9BQVM7QUFBQSxVQUNQO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLFFBQVU7QUFBQSxRQUNSLFFBQVU7QUFBQSxRQUNWLElBQU07QUFBQSxRQUNOLElBQU07QUFBQSxVQUNKO0FBQUEsWUFDRTtBQUFBLFlBQ0E7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxNQUFRO0FBQUEsTUFDTixJQUFNO0FBQUEsTUFDTixNQUFRO0FBQUEsUUFDTixPQUFTO0FBQUEsVUFDUDtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsTUFDQSxRQUFVO0FBQUEsUUFDUixRQUFVO0FBQUEsUUFDVixJQUFNO0FBQUEsUUFDTixJQUFNO0FBQUEsVUFDSjtBQUFBLFlBQ0U7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLE1BQVE7QUFBQSxNQUNOLElBQU07QUFBQSxNQUNOLE1BQVE7QUFBQSxRQUNOLE9BQVM7QUFBQSxVQUNQO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLFFBQVU7QUFBQSxRQUNSLFFBQVU7QUFBQSxRQUNWLElBQU07QUFBQSxR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QUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLE1BQ0EsTUFBUTtBQUFBLFFBQ04sT0FBUztBQUFBLFVBQ1A7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLGVBQWlCO0FBQUEsTUFDZixJQUFNO0FBQUEsTUFDTixRQUFVO0FBQUEsUUFDUixRQUFVO0FBQUEsUUFDVixJQUFNO0FBQUEsUUFDTixJQUFNO0FBQUEsVUFDSjtBQUFBLFlBQ0U7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLE1BQ0EsTUFBUTtBQUFBLFFBQ04sT0FBUztBQUFBLFVBQ1A7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLGNBQWdCO0FBQUEsTUFDZCxJQUFNO0FBQUEsTUFDTixRQUFVO0FBQUEsUUFDUixRQUFVO0FBQUEsUUFDVixJQUFNO0FBQUEsUUFDTixJQUFNO0FBQUEsVUFDSjtBQUFBLFlBQ0U7QUFBQSxZQUNBO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsTUFDQSxNQUFRO0FBQUEsUUFDTixPQUFTO0FBQUEsVUFDUDtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsY0FBZ0I7QUFBQSxNQUNkLElBQU07QUFBQSxNQUNOLFFBQVU7QUFBQSxRQUNSLFFBQVU7QUFBQSxRQUNWLElBQU07QUFBQSxRQUNOLElBQU07QUFBQSxVQUNKO0FBQUEsWUFDRTtBQUFBLFlBQ0E7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLE1BQVE7QUFBQSxRQUNOLE9BQVM7QUFBQSxVQUNQO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFD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QUs7QUFDeEIsR0FBRzsiLAogICJuYW1lcyI6IFsiZXZlbnQiLCAibWFrZSIsICJ0YXJnZXQiLCAidHJlZSIsICJzZWFyY2hGaWx0ZXIiLCAid2Fsa2FibGUiLCAiaWdub3JlIiwgImZvdW5kIiwgImNvbXBvbmVudHMiLCAiXyIsICJjaGVjayIsICJtb2R1bGVzIiwgIm1vZHVsZSIsICJyZXF1aXJlIiwgImZvdW5kIiwgImZpbmRlciIsICJmb3VuZCIsICJyZXEiLCAiZmluZGVyIiwgImNvbW1vbl9kZWZhdWx0IiwgImNvbW1vbl9kZWZhdWx0IiwgIl8iLCAiXyIsICJub1N0b3JlIiwgIl8iLCAidmFsIiwgImVycm9yIiwgIm91dCIsICJjaGVjayIsICJfIiwgIkJBU0VfVVJMIiwgIm5lc3RzIiwgIm91dCIsICJfIiwgInNvdXJjZSIsICJhcGkiLCAiY29tbW9uX2RlZmF1bHQiLCAic2V0IiwgInNob3ciLCAiY29tbW9uX2RlZmF1bHQiLCAib3V0IiwgIl8iLCAiUmVhY3QiLCAiY29tbW9uX2RlZmF1bHQiLCAiY29tbW9uX2RlZmF1bHQiLCAiUmVhY3QiLCAiY29tbW9uX2RlZmF1bHQiLCAiaW50ZXJhY3RlZCIsICJnZXRDb250YWluZXIiLCAic2hvdyIsICJhcGkiXQp9Cg==
