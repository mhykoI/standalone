var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
    function make(data = {}, { nestArrays = true } = {}) {
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
    exports.default = make;
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

// src/lib/json-decycled/index.js
var require_json_decycled = __commonJS({
  "src/lib/json-decycled/index.js"(exports, module2) {
    "use strict";
    function deCycler(val, config) {
      config = typeof config === "number" ? { deep: config } : config || {};
      config.deep = config.deep || 10;
      return decycleWalker([], [], val, config);
    }
    function deCycled2(val, config) {
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
    function revive2(val, functions) {
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
    module2.exports = {
      deCycler,
      deCycled: deCycled2,
      revive: revive2
    };
  }
});

// src/data/common.json
var common_default = {
  common: {
    modals: {
      components: {
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
      ModalRoot: {
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
      }
    },
    Markdown: {
      __: true,
      filter: "$?.prototype?.render && $.rules"
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

// src/api/modules/raw/complex-finder.js
function wrapFilter(filter) {
  return (...args) => {
    try {
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
  return properties.every((prop2) => {
    const value = m[prop2]?.__original__ || m[prop2];
    return hasNot ? value === void 0 : value !== void 0 && !(typeof value == "string" && !value);
  });
}
function checkModulePrototypes(m, protoProps, hasNot) {
  return m.prototype && protoProps.every((prop2) => {
    const value = m.prototype[prop2];
    return hasNot ? value === void 0 : value !== void 0 && !(typeof value == "string" && !value);
  });
}
function find(req2, filter, config = {}) {
  let defaultExport = typeof config.defaultExport != "boolean" ? true : config.defaultExport;
  let unloaded = typeof config.unloaded != "boolean" ? false : config.unloaded;
  let all = typeof config.all != "boolean" ? false : config.all;
  const found2 = [];
  if (!unloaded) {
    for (let i in req2.c)
      if (req2.c.hasOwnProperty(i)) {
        let m = req2.c[i].exports, r = null;
        if (m && (typeof m == "object" || typeof m == "function")) {
          if (!!(r = filter(m, i))) {
            if (all)
              found2.push(defaultExport ? r : req2.c[i]);
            else
              return defaultExport ? r : req2.c[i];
          } else
            for (let key of Object.keys(m))
              if (key.length < 4 && m[key] && !!(r = filter(m[key], i))) {
                if (all)
                  found2.push(defaultExport ? r : req2.c[i]);
                else
                  return defaultExport ? r : req2.c[i];
              }
        }
        if (m && m.__esModule && m.default && (typeof m.default == "object" || typeof m.default == "function")) {
          if (!!(r = filter(m.default, i))) {
            if (all)
              found2.push(defaultExport ? r : req2.c[i]);
            else
              return defaultExport ? r : req2.c[i];
          } else if (m.default.type && (typeof m.default.type == "object" || typeof m.default.type == "function") && !!(r = filter(m.default.type, i))) {
            if (all)
              found2.push(defaultExport ? r : req2.c[i]);
            else
              return defaultExport ? r : req2.c[i];
          }
        }
      }
  }
  for (let i in req2.m)
    if (req2.m.hasOwnProperty(i)) {
      let m = req2.m[i];
      if (m && typeof m == "function") {
        if (req2.c[i] && !unloaded && filter(m, i)) {
          if (all)
            found2.push(defaultExport ? req2.c[i].exports : req2.c[i]);
          else
            return defaultExport ? req2.c[i].exports : req2.c[i];
        }
        if (!req2.c[i] && unloaded && filter(m, i)) {
          const resolved = {}, resolved2 = {};
          m(resolved, resolved2, req2);
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
function findByFinder(req, finder = {}) {
  let found = null;
  if (typeof finder?.filter === "string") {
    found = find(req, wrapFilter(eval(`(($)=>{ try { return (${finder.filter}); } catch { return false; } })`)), { defaultExport: false });
  } else if (typeof finder?.filter === "function") {
    found = find(req, wrapFilter(finder.filter), { defaultExport: false });
  } else {
    const defaultExport = !!finder?.filter?.export;
    switch (finder.filter.in) {
      case "properties": {
        if (finder.filter.by?.[1]?.length) {
          found = find(req, wrapFilter((m) => checkModuleProps(m, finder.filter.by?.[0] || []) && checkModuleProps(m, finder.filter.by?.[1] || [], true)), { defaultExport });
        } else {
          found = find(req, wrapFilter((m) => checkModuleProps(m, finder.filter.by?.[0] || [])), { defaultExport });
        }
        break;
      }
      case "prototypes": {
        if (finder.filter.by?.[1]?.length) {
          found = find(req, wrapFilter((m) => checkModulePrototypes(m, finder.filter.by?.[0] || []) && checkModulePrototypes(m, finder.filter.by?.[1] || [], true)), { defaultExport });
        } else {
          found = find(req, wrapFilter((m) => checkModulePrototypes(m, finder.filter.by?.[0] || [])), { defaultExport });
        }
        break;
      }
      case "strings": {
        if (finder.filter.by?.[1]?.length) {
          found = find(req, wrapFilter((m) => checkModuleStrings(m, finder.filter.by?.[0] || []) && checkModuleStrings(m, finder.filter.by?.[1] || [], true)), { defaultExport });
        } else {
          found = find(req, wrapFilter((m) => checkModuleStrings(m, finder.filter.by?.[0] || [])), { defaultExport });
        }
        break;
      }
    }
  }
  if (!found)
    return null;
  if (finder.path?.before)
    found = (Array.isArray(finder.path.before) ? finder.path.before.map((i) => _.get(found, i)).find((i) => i) : _.get(found, finder.path.before)) || found;
  if (finder.assign)
    found = Object.assign({}, found);
  if (!found)
    return null;
  if (finder.map) {
    let __original__ = found;
    let __mapped__ = {};
    let temp = {
      __original__,
      __mapped__,
      ...__original__
    };
    Object.entries(finder.map).forEach(([key, strings]) => {
      Object.defineProperty(temp, key, {
        get() {
          if (__mapped__[key])
            return __original__[__mapped__[key]];
          let foundFunc = finderFindFunction(Object.entries(__original__ || {}), finder.map[key] || []);
          if (!foundFunc?.length)
            return;
          __mapped__[key] = foundFunc[0];
          return foundFunc[1];
        }
      });
    });
    found = temp;
  }
  if (finder.path?.after)
    found = (Array.isArray(finder.path.after) ? finder.path.after.map((i) => _.get(found, i)).find((i) => i) : _.get(found, finder.path.after)) || found;
  return found;
}

// src/api/modules/webpack.js
var webpack_default = {
  __cache__: {},
  get req() {
    if (this.__cache__.req)
      return this.__cache__.req;
    let reqId = `AcordWebpackModules${Date.now()}`;
    const req2 = window.webpackChunkdiscord_app.push([[reqId], {}, (req3) => req3]);
    delete req2.m[reqId];
    delete req2.c[reqId];
    window.webpackChunkdiscord_app.pop();
    this.__cache__._req = req2;
    return req2;
  },
  find(filter, config = {}) {
    return find(this.req, wrapFilter(filter), config);
  },
  filter(filter, config = {}) {
    return find(this.req, wrapFilter(filter), { ...config, all: true });
  },
  findByFinder(finder2) {
    return findByFinder(this.req, finder2);
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
      temp[key] = {};
      mapObject(temp[key], inp[key]);
    }
  }
}
var commonAPI = { __cache__: {} };
mapObject(commonAPI, common_default.common);
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
    if (commonAPI[name])
      return;
    Object.defineProperty(commonAPI, name, {
      get() {
        if (commonAPI.__cache__[name])
          return commonAPI.__cache__[name];
        return commonAPI.__cache__[name] = obj;
      }
    });
  });
}
var common_default2 = commonAPI;

// src/api/modules/index.js
var modules_default = {
  common: common_default2,
  webpack: webpack_default,
  require: globalThis["<PRELOAD_KEY>"].require
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

// src/api/utils/index.js
var utils_default = {
  logger: logger_default,
  format(val, ...args) {
    return `${val}`.replaceAll(/{(\d+)}/g, (_2, cap) => {
      return args[Number(cap)];
    });
  }
};

// src/api/i18n/index.js
var BASE_URL = "https://raw.githubusercontent.com/AcordPlugin/i18n/main";
var noStore = { cache: "no-store" };
var i18n = {
  __cache__: {
    localeIds: [],
    localizations: {}
  },
  get locale() {
    return modules_default.common.i18n._requestedLocale;
  },
  messages: new Proxy({}, {
    get(_2, prop2) {
      check();
      return i18n.__cache__.localizations[i18n.locale]?.[prop2] || i18n.__cache__.localizations.default?.[prop2] || modules_default.common.i18n.Messages[prop2] || prop2;
    }
  }),
  localize(str) {
    if (typeof str === "string")
      return str;
    return str?.[i18n.locale] || str?.default || Object.values(str)[0];
  },
  format(key, ...args) {
    return utils_default.format(i18n.messages[key], ...args);
  }
};
async function check() {
  const locale = i18n.locale;
  if (!i18n.__cache__.localeIds.length) {
    try {
      i18n.__cache__.localeIds = await (await fetch(`${BASE_URL}/locales.json`, noStore)).json();
    } catch {
    }
    try {
      i18n.__cache__.localizations.default = await (await fetch(`${BASE_URL}/default.json`, noStore)).json();
    } catch {
    }
  }
  if (i18n.__cache__.localeIds.includes(locale) && !i18n.__cache__.localizations?.[locale]) {
    try {
      i18n.__cache__.localizations[locale] = await (await fetch(`${BASE_URL}/${locale}.json`, noStore)).json();
    } catch {
    }
    ;
  }
}
check();
var i18n_default = i18n;

// src/api/storage/index.js
var import_nests = __toESM(require_cjs());

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

// src/api/storage/index.js
var import_json_decycled = __toESM(require_json_decycled());
var storage_default = {
  async createPersistNest(suffix) {
    let cached = await get(`AcordStore;${suffix}`);
    if (typeof cached == "string")
      cached = (0, import_json_decycled.revive)(cached);
    const nest = import_nests.default.make(cached ?? {});
    const save = () => {
      try {
        set(`AcordStore;${suffix}`, (0, import_json_decycled.deCycled)({ ...nest.ghost }));
      } catch {
        set(`AcordStore;${suffix}`, (0, import_json_decycled.deCycled)({}));
      }
    };
    nest.on(import_nests.default.Events.SET, save);
    nest.on(import_nests.default.Events.UPDATE, save);
    nest.on(import_nests.default.Events.DELETE, save);
    return nest;
  }
};

// src/api/extensions/index.js
async function buildAPI(cfg) {
  const persist = await storage_default.createPersistNest(`Extension;${cfg.about.slug}`);
  const out = {
    modules: {
      __cache__: {
        common: {},
        node: {},
        custom: {}
      },
      require(name) {
        if (!dev_default.enabled) {
          if (out.modules.__cache__.node[prop])
            return out.modules.__cache__.node[prop];
          if (cfg.modules.node.some((i) => i.name === name))
            return out.modules.__cache__.node[prop] = modules_default.require(name);
        } else {
          return modules_default.require(name);
        }
        return null;
      },
      common: new Proxy({}, {
        get(_2, prop2) {
          if (!dev_default.enabled) {
            if (out.modules.__cache__.common[prop2])
              return out.modules.__cache__.common[prop2];
            if (cfg.modules.common.some((i) => i.name === prop2))
              return out.modules.__cache__.common[prop2] = modules_default.common[prop2];
          } else {
            return modules_default.common[prop2];
          }
          return null;
        }
      }),
      custom: new Proxy({}, {
        get(_2, prop2) {
          if (out.modules.__cache__.custom[prop2])
            return out.modules.__cache__.custom[prop2];
          let data = cfg.modules.custom.find((i) => i.name === prop2);
          if (!data)
            return null;
          return out.modules.__cache__.custom[prop2] = modules_default.webpack.findByFinder(data.finder);
        }
      })
    },
    i18n: i18n_default,
    extension: {
      config: JSON.parse(JSON.stringify(cfg)),
      persist
      // TODO: add i18n support
    }
  };
  return out;
}
var extensions_default = {
  buildAPI
};

// src/api/index.js
utils_default.logger.debug(`PRELOAD_KEY: <PRELOAD_KEY>`);
var api_default = {
  exposedAPI: {
    dev: dev_default,
    utils: utils_default,
    i18n: i18n_default,
    get storage() {
      if (!dev_default.enabled)
        throw new Error("Storage API can only be accessed when Dev mode is enabled!");
      return storage_default;
    },
    get modules() {
      if (!dev_default.enabled)
        throw new Error("Modules API can only be accessed when Dev mode is enabled!");
      return modules_default;
    },
    get extensions() {
      if (!dev_default.enabled)
        throw new Error("Extensions API can only be accessed when Dev mode is enabled!");
      return extensions_default;
    },
    get internal() {
      if (!dev_default.enabled)
        throw new Error("Internal API can only be accessed when Dev mode is enabled!");
      return {
        process: globalThis["<PRELOAD_KEY>"].process,
        isDevToolsOpen: globalThis["<PRELOAD_KEY>"].isDevToolsOpen
      };
    }
  },
  unexposedAPI: {
    dev: dev_default,
    modules: modules_default,
    utils: utils_default,
    extensions: extensions_default,
    i18n: i18n_default,
    storage: storage_default,
    internal: {
      process: globalThis["<PRELOAD_KEY>"].process,
      isDevToolsOpen: globalThis["<PRELOAD_KEY>"].isDevToolsOpen
    }
  }
};

// src/index.js
Object.defineProperty(window, "acord", {
  get() {
    return api_default.exposedAPI;
  }
});
window.global = window;
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibm9kZV9tb2R1bGVzL25lc3RzL2Nqcy9FdmVudHMuanMiLCAibm9kZV9tb2R1bGVzL25lc3RzL2Nqcy9FdmVudEVtaXR0ZXIuanMiLCAibm9kZV9tb2R1bGVzL25lc3RzL2Nqcy9tYWtlLmpzIiwgIm5vZGVfbW9kdWxlcy9uZXN0cy9janMvaW5kZXguanMiLCAic3JjL2xpYi9qc29uLWRlY3ljbGVkL2luZGV4LmpzIiwgInNyYy9kYXRhL2NvbW1vbi5qc29uIiwgInNyYy9hcGkvdXRpbHMvbG9nZ2VyLmpzIiwgInNyYy9hcGkvbW9kdWxlcy9yYXcvY29tcGxleC1maW5kZXIuanMiLCAic3JjL2FwaS9tb2R1bGVzL3dlYnBhY2suanMiLCAic3JjL2FwaS9tb2R1bGVzL2NvbW1vbi5qcyIsICJzcmMvYXBpL21vZHVsZXMvaW5kZXguanMiLCAic3JjL2FwaS9kZXYvaW5kZXguanMiLCAic3JjL2FwaS91dGlscy9pbmRleC5qcyIsICJzcmMvYXBpL2kxOG4vaW5kZXguanMiLCAic3JjL2FwaS9zdG9yYWdlL2luZGV4LmpzIiwgIm5vZGVfbW9kdWxlcy9pZGIta2V5dmFsL2Rpc3QvaW5kZXguanMiLCAic3JjL2FwaS9leHRlbnNpb25zL2luZGV4LmpzIiwgInNyYy9hcGkvaW5kZXguanMiLCAic3JjL2luZGV4LmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLmRlZmF1bHQgPSBPYmplY3QuZnJlZXplKHtcclxuICAgIEdFVDogXCJHRVRcIixcclxuICAgIFNFVDogXCJTRVRcIixcclxuICAgIERFTEVURTogXCJERUxFVEVcIixcclxuICAgIFVQREFURTogXCJVUERBVEVcIixcclxufSk7XHJcbiIsICJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBFdmVudHNfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9FdmVudHNcIikpO1xyXG5jbGFzcyBFdmVudEVtaXR0ZXIge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5saXN0ZW5lcnMgPSBPYmplY3QudmFsdWVzKEV2ZW50c18xLmRlZmF1bHQpLnJlZHVjZSgoYWNjLCB2YWwpID0+ICgoYWNjW3ZhbF0gPSBuZXcgU2V0KCkpLCBhY2MpLCB7fSk7XHJcbiAgICAgICAgdGhpcy5vbiA9IGZ1bmN0aW9uIChldmVudCwgbGlzdGVuZXIpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubGlzdGVuZXJzW2V2ZW50XS5oYXMobGlzdGVuZXIpKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcihgVGhpcyBsaXN0ZW5lciBvbiAke2V2ZW50fSBhbHJlYWR5IGV4aXN0cy5gKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmxpc3RlbmVyc1tldmVudF0uYWRkKGxpc3RlbmVyKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMub25jZSA9IGZ1bmN0aW9uIChldmVudCwgbGlzdGVuZXIpIHtcclxuICAgICAgICAgICAgY29uc3Qgb25jZUxpc3RlbmVyID0gKGV2ZW50LCBkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9mZihldmVudCwgb25jZUxpc3RlbmVyKTtcclxuICAgICAgICAgICAgICAgIGxpc3RlbmVyKGV2ZW50LCBkYXRhKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdGhpcy5vbihldmVudCwgb25jZUxpc3RlbmVyKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMub2ZmID0gZnVuY3Rpb24gKGV2ZW50LCBsaXN0ZW5lcikge1xyXG4gICAgICAgICAgICB0aGlzLmxpc3RlbmVyc1tldmVudF0uZGVsZXRlKGxpc3RlbmVyKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuZW1pdCA9IGZ1bmN0aW9uIChldmVudCwgZGF0YSkge1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGxpc3RlbmVyIG9mIHRoaXMubGlzdGVuZXJzW2V2ZW50XSkge1xyXG4gICAgICAgICAgICAgICAgbGlzdGVuZXIoZXZlbnQsIGRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBmb3IgKGNvbnN0IGV2ZW50IG9mIE9iamVjdC52YWx1ZXMoRXZlbnRzXzEuZGVmYXVsdCkpIHtcclxuICAgICAgICAgICAgdGhpc1tldmVudC50b0xvd2VyQ2FzZSgpXSA9IChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoZXZlbnQsIGRhdGEpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5leHBvcnRzLmRlZmF1bHQgPSBFdmVudEVtaXR0ZXI7XHJcbiIsICJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBFdmVudEVtaXR0ZXJfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9FdmVudEVtaXR0ZXJcIikpO1xyXG5mdW5jdGlvbiBtYWtlKFxyXG4vLyBUaGlzIGNhbiBiZSBzYWZlbHkgaWdub3JlZCwgdGhlIERhdGEgd2lsbCBhbHdheXMgYmUgYW4gb2JqZWN0IG9yIGl0IHdvbid0IHdvcmsgYW55d2F5LlxyXG4vLyBAdHMtaWdub3JlXHJcbmRhdGEgPSB7fSwgeyBuZXN0QXJyYXlzID0gdHJ1ZSwgfSA9IHt9KSB7XHJcbiAgICBjb25zdCBlbWl0dGVyID0gbmV3IEV2ZW50RW1pdHRlcl8xLmRlZmF1bHQoKTtcclxuICAgIGZ1bmN0aW9uIGNyZWF0ZVByb3h5KHRhcmdldCwgcm9vdCwgcGF0aCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJveHkodGFyZ2V0LCB7XHJcbiAgICAgICAgICAgIGdldCh0YXJnZXQsIHByb3BlcnR5KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdQYXRoID0gWy4uLnBhdGgsIHByb3BlcnR5XTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdGFyZ2V0W3Byb3BlcnR5XTtcclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZW1pdHRlci5nZXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRoOiBuZXdQYXRoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSxcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIW5lc3RBcnJheXMgJiYgQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjcmVhdGVQcm94eSh2YWx1ZSwgcm9vdCwgbmV3UGF0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBjcmVhdGVQcm94eSgodGFyZ2V0W3Byb3BlcnR5XSA9IHt9KSwgcm9vdCwgbmV3UGF0aCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldCh0YXJnZXQsIHByb3BlcnR5LCB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0W3Byb3BlcnR5XSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgZW1pdHRlci5zZXQoe1xyXG4gICAgICAgICAgICAgICAgICAgIHBhdGg6IFsuLi5wYXRoLCBwcm9wZXJ0eV0sXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vIFRoaXMgbmVlZHMgdG8gcmV0dXJuIHRydWUgb3IgaXQgZXJyb3JzLiAvc2hydWdcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkZWxldGVQcm9wZXJ0eSh0YXJnZXQsIHByb3BlcnR5KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGVsZXRlIHRhcmdldFtwcm9wZXJ0eV0pIHtcclxuICAgICAgICAgICAgICAgICAgICBlbWl0dGVyLmRlbGV0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGg6IFsuLi5wYXRoLCBwcm9wZXJ0eV0sXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGhhcyh0YXJnZXQsIHByb3BlcnR5KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRhcmdldFtwcm9wZXJ0eV0gPT09IFwib2JqZWN0XCIgJiZcclxuICAgICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyh0YXJnZXRbcHJvcGVydHldKS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvcGVydHkgaW4gdGFyZ2V0O1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oeyBzdG9yZTogY3JlYXRlUHJveHkoZGF0YSwgZGF0YSwgW10pLCBcclxuICAgICAgICAvLyBUaGlzIGNhbiBiZSBzYWZlbHkgaWdub3JlZCwgdGhlIERhdGEgd2lsbCBhbHdheXMgYmUgYW4gb2JqZWN0IG9yIGl0IHdvbid0IHdvcmsgYW55d2F5LlxyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICBnaG9zdDogZGF0YSB9LCBlbWl0dGVyKTtcclxufVxyXG5leHBvcnRzLmRlZmF1bHQgPSBtYWtlO1xyXG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5tYWtlID0gZXhwb3J0cy5FdmVudHMgPSB2b2lkIDA7XHJcbnZhciBFdmVudHNfMSA9IHJlcXVpcmUoXCIuL0V2ZW50c1wiKTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiRXZlbnRzXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBfX2ltcG9ydERlZmF1bHQoRXZlbnRzXzEpLmRlZmF1bHQ7IH0gfSk7XHJcbnZhciBtYWtlXzEgPSByZXF1aXJlKFwiLi9tYWtlXCIpO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJtYWtlXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBfX2ltcG9ydERlZmF1bHQobWFrZV8xKS5kZWZhdWx0OyB9IH0pO1xyXG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5mdW5jdGlvbiBkZUN5Y2xlcih2YWwsIGNvbmZpZykge1xyXG4gIGNvbmZpZyA9IHR5cGVvZiBjb25maWcgPT09ICdudW1iZXInID8geyBkZWVwOiBjb25maWcgfSA6IChjb25maWcgfHwge30pO1xyXG4gIGNvbmZpZy5kZWVwID0gY29uZmlnLmRlZXAgfHwgMTA7XHJcbiAgcmV0dXJuIGRlY3ljbGVXYWxrZXIoW10sIFtdLCB2YWwsIGNvbmZpZyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRlQ3ljbGVkKHZhbCwgY29uZmlnKSB7XHJcbiAgY29uZmlnID0gdHlwZW9mIGNvbmZpZyA9PT0gJ251bWJlcicgPyB7IGRlZXA6IGNvbmZpZyB9IDogKGNvbmZpZyB8fCB7fSk7XHJcbiAgdmFsID0gZGVDeWNsZXIodmFsLCBjb25maWcpO1xyXG4gIHRyeSB7XHJcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodmFsLCB1bmRlZmluZWQsIGNvbmZpZy5zcGFjZXIpO1xyXG4gIH0gY2F0Y2ggKGUpIHtcclxuICAgIHJldHVybiBlO1xyXG4gIH1cclxufVxyXG5cclxudmFyIHJldml2ZXJEYXRlID0gL15cXFtEYXRlOigoXFxkezR9LVxcZHsyfS1cXGR7Mn0pW0EtWl0rKFxcZHsyfTpcXGR7Mn06XFxkezJ9KS4oWzAtOSstOl0rKVopXFxdJC87XHJcbnZhciByZXZpdmVyUmVnRXhwID0gL15cXFtSZWdleHA6XFwvKC4rKVxcL1xcXSQvO1xyXG52YXIgcmV2aXZlckVycm9yID0gL15cXFtFcnJvcjooW1xcV1xcd10rKVxcXSQvO1xyXG52YXIgcmV2aXZlckZ1bmN0aW9uID0gL15cXFtGdW5jdGlvbjooLispXFxdJC87XHJcbmZ1bmN0aW9uIHJldml2ZSh2YWwsIGZ1bmN0aW9ucykge1xyXG4gIHRyeSB7XHJcbiAgICByZXR1cm4gSlNPTi5wYXJzZSh2YWwsIHJldml2ZXIpO1xyXG4gIH0gY2F0Y2ggKGUpIHtcclxuICAgIHJldHVybiBlO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcmV2aXZlcihrZXksIHZhbCkge1xyXG4gICAgaWYgKHJldml2ZXJEYXRlLnRlc3QodmFsKSkge1xyXG4gICAgICB2YWwgPSByZXZpdmVyRGF0ZS5leGVjKHZhbCk7XHJcbiAgICAgIHZhbCA9IG5ldyBEYXRlKHZhbFsxXSk7XHJcbiAgICAgIHJldHVybiBuZXcgRGF0ZSh2YWwpO1xyXG4gICAgfSBlbHNlIGlmIChyZXZpdmVyUmVnRXhwLnRlc3QodmFsKSkge1xyXG4gICAgICB2YWwgPSByZXZpdmVyUmVnRXhwLmV4ZWModmFsKVsxXTtcclxuICAgICAgcmV0dXJuIG5ldyBSZWdFeHAodmFsKTtcclxuICAgIH0gZWxzZSBpZiAocmV2aXZlckVycm9yLnRlc3QodmFsKSkge1xyXG4gICAgICB2YWwgPSByZXZpdmVyRXJyb3IuZXhlYyh2YWwpWzFdO1xyXG4gICAgICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IodmFsLnNwbGl0KCdcXG4nKVswXSk7XHJcbiAgICAgIGlmIChlcnJvci5zdGFjaykge1xyXG4gICAgICAgIGVycm9yLnN0YWNrID0gdmFsO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBlcnJvcjtcclxuICAgIH0gZWxzZSBpZiAoZnVuY3Rpb25zICYmIHJldml2ZXJGdW5jdGlvbi50ZXN0KHZhbCkpIHtcclxuICAgICAgdmFsID0gcmV2aXZlckZ1bmN0aW9uLmV4ZWModmFsKVsxXTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICByZXR1cm4gKG5ldyBGdW5jdGlvbihcInJldHVybiBcIiArIHZhbCArIFwiO1wiKSkoKTtcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICByZXR1cm4gZXJyb3I7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB2YWw7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBkZWN5Y2xlV2Fsa2VyKHBhcmVudHMsIHBhdGgsIHZhbCwgY29uZmlnKSB7XHJcbiAgaWYgKFsndW5kZWZpbmVkJywgJ251bWJlcicsICdib29sZWFuJywgJ3N0cmluZyddLmluZGV4T2YodHlwZW9mIHZhbCkgPj0gMCB8fCB2YWwgPT09IG51bGwpIHtcclxuICAgIHJldHVybiB2YWw7XHJcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnb2JqZWN0JyAmJiB2YWwuY29uc3RydWN0b3IgPT09IERhdGUpIHtcclxuICAgIHJldHVybiBjb25maWcuZGF0ZXMgIT09IGZhbHNlID8gJ1tEYXRlOicgKyB2YWwudG9JU09TdHJpbmcoKSArICddJyA6IHZhbDtcclxuICAgIC8vdmFsLmZvcm1hdCgne1lZWVl9L3tNTX0ve0REfSB7aGh9OnttbX06e3NzfSBVVEM6XHUwMEI3e3BhcmFtcy50ej49MD9cIitcIitwYXJhbXMudHo6cGFyYW1zLnR6fVx1MDBCNycpO1xyXG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ29iamVjdCcgJiYgdmFsLmNvbnN0cnVjdG9yID09PSBSZWdFeHApIHtcclxuICAgIHJldHVybiBjb25maWcucmVnZXhwcyAhPT0gZmFsc2UgPyAnW1JlZ2V4cDonICsgdmFsLnRvU3RyaW5nKCkgKyAnXScgOiB2YWw7XHJcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnb2JqZWN0JyAmJiB2YWwuY29uc3RydWN0b3IgJiYgdHlwZW9mIHZhbC5jb25zdHJ1Y3Rvci5uYW1lID09PSAnc3RyaW5nJyAmJiB2YWwuY29uc3RydWN0b3IubmFtZS5zbGljZSgtNSkgPT09ICdFcnJvcicpIHtcclxuICAgIHZhciBzdGFjayA9ICh2YWwuc3RhY2sgfHwgJycpLnNwbGl0KCdcXG4nKS5zbGljZSgxKTtcclxuICAgIHZhciBtZXNzYWdlID0gKHZhbC5tZXNzYWdlIHx8IHZhbC50b1N0cmluZygpKTtcclxuICAgIHZhciBlcnJvciA9IG1lc3NhZ2UgKyBcIlxcblwiICsgc3RhY2s7XHJcbiAgICByZXR1cm4gY29uZmlnLmVycm9ycyAhPT0gZmFsc2UgPyAnW0Vycm9yOicgKyBlcnJvciArICddJyA6IHZhbDtcclxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSB7XHJcbiAgICBpZiAocGFyZW50cy5pbmRleE9mKHZhbCkgPj0gMCkge1xyXG4gICAgICB2YXIgcG9pbnQgPSBwYXRoLnNsaWNlKDAsIHBhcmVudHMuaW5kZXhPZih2YWwpKS5qb2luKCcuJyk7XHJcbiAgICAgIHJldHVybiAnW0NpcmN1bGFyJyArIChwb2ludCA/ICc6JyArIHBvaW50IDogJycpICsgJ10nO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFyIGNvcHksIGksIGssIGw7XHJcbiAgICAgIGlmICh2YWwuY29uc3RydWN0b3IgJiYgdHlwZW9mIHZhbC5jb25zdHJ1Y3Rvci5uYW1lID09PSAnc3RyaW5nJyAmJiB2YWwuY29uc3RydWN0b3IubmFtZS5zbGljZSgtNSkgPT09ICdBcnJheScpIHtcclxuICAgICAgICBpZiAocGFyZW50cy5sZW5ndGggPj0gY29uZmlnLmRlZXApIHtcclxuICAgICAgICAgIHJldHVybiAnW0FycmF5OicgKyB2YWwuY29uc3RydWN0b3IubmFtZSArICddJztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29weSA9IFtdO1xyXG4gICAgICAgICAgZm9yIChpID0gMCwgbCA9IHZhbC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICAgICAgY29weVtpXSA9IGRlY3ljbGVXYWxrZXIocGFyZW50cy5jb25jYXQoW3ZhbF0pLCBwYXRoLmNvbmNhdChpKSwgdmFsW2ldLCBjb25maWcpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIGNvcHk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChwYXJlbnRzLmxlbmd0aCA+PSBjb25maWcuZGVlcCkge1xyXG4gICAgICAgICAgcmV0dXJuICdbT2JqZWN0OicgKyAodmFsLmNvbnN0cnVjdG9yICYmIHZhbC5jb25zdHJ1Y3Rvci5uYW1lID8gdmFsLmNvbnN0cnVjdG9yLm5hbWUgOiAnT2JqZWN0JykgKyAnXSc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvcHkgPSB7fTtcclxuICAgICAgICAgIGZvciAoaSA9IDAsIGsgPSBPYmplY3Qua2V5cyh2YWwpLCBsID0gay5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICAgICAgY29weVtrW2ldXSA9IGRlY3ljbGVXYWxrZXIocGFyZW50cy5jb25jYXQoW3ZhbF0pLCBwYXRoLmNvbmNhdChba1tpXV0pLCB2YWxba1tpXV0sIGNvbmZpZyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gY29weTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicpIHtcclxuICAgIHJldHVybiBjb25maWcuZnVuY3Rpb25zID09PSB0cnVlID8gJ1tGdW5jdGlvbjonICsgdmFsLnRvU3RyaW5nKCkgKyAnXScgOiB1bmRlZmluZWQ7XHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiB2YWwudG9TdHJpbmcoKTtcclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gIGRlQ3ljbGVyLFxyXG4gIGRlQ3ljbGVkLFxyXG4gIHJldml2ZVxyXG59IiwgIntcclxuICBcImNvbW1vblwiOiB7XHJcbiAgICBcIm1vZGFsc1wiOiB7XHJcbiAgICAgIFwiY29tcG9uZW50c1wiOiB7XHJcbiAgICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgXCJIZWFkZXJcIixcclxuICAgICAgICAgICAgICBcIkZvb3RlclwiXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBcIk1vZGFsUm9vdFwiOiB7XHJcbiAgICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgICAgXCJpblwiOiBcInN0cmluZ3NcIixcclxuICAgICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgXCJFTlRFUklOR1wiXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBcImFjdGlvbnNcIjoge1xyXG4gICAgICAgIFwib3BlblwiOiB7XHJcbiAgICAgICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgICAgICBcImluXCI6IFwic3RyaW5nc1wiLFxyXG4gICAgICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICBcIm9uQ2xvc2VDYWxsYmFja1wiLFxyXG4gICAgICAgICAgICAgICAgXCJMYXllclwiXHJcbiAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICAgICAgXCJiZWZvcmVcIjogW1xyXG4gICAgICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgICAgICBcIm9wZW5cIlxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgXCJtYXBcIjoge1xyXG4gICAgICAgICAgICBcIm9wZW5cIjogW1xyXG4gICAgICAgICAgICAgIFwib25DbG9zZUNhbGxiYWNrXCIsXHJcbiAgICAgICAgICAgICAgXCJMYXllclwiXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcImNvbXBvbmVudHNcIjoge1xyXG4gICAgICBcIkJ1dHRvblwiOiB7XHJcbiAgICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgXCJCb3JkZXJDb2xvcnNcIlxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgICAgXCJiZWZvcmVcIjogW1xyXG4gICAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICAgIF0sXHJcbiAgICAgICAgICBcImFmdGVyXCI6IFwiQnV0dG9uXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwibWFwXCI6IHtcclxuICAgICAgICAgIFwiQnV0dG9uXCI6IFtcclxuICAgICAgICAgICAgXCIuRklMTEVEXCIsXHJcbiAgICAgICAgICAgIFwiLm9uTW91c2VMZWF2ZVwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBcIkNvbmZpcm1hdGlvbk1vZGFsXCI6IHtcclxuICAgICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgICBcImluXCI6IFwic3RyaW5nc1wiLFxyXG4gICAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICBcIi5jb25maXJtQnV0dG9uQ29sb3JcIlxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgICAgXCJiZWZvcmVcIjogW1xyXG4gICAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIFwiVGV4dFwiOiB7XHJcbiAgICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICAgIFwiZmlsdGVyXCI6IFwiJD8uU2l6ZXM/LlNJWkVfMzIgJiYgJC5Db2xvcnNcIixcclxuICAgICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgICAgXCJiZWZvcmVcIjogW1xyXG4gICAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIk1hcmtkb3duXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiBcIiQ/LnByb3RvdHlwZT8ucmVuZGVyICYmICQucnVsZXNcIlxyXG4gICAgfSxcclxuICAgIFwiRmx1eERpc3BhdGNoZXJcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcIl9jdXJyZW50RGlzcGF0Y2hBY3Rpb25UeXBlXCIsXHJcbiAgICAgICAgICAgIFwiZGlzcGF0Y2hcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiUmVhY3RcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcImNyZWF0ZUVsZW1lbnRcIixcclxuICAgICAgICAgICAgXCJ1c2VTdGF0ZVwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJSZXN0XCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJnZXRcIixcclxuICAgICAgICAgICAgXCJwb3N0XCIsXHJcbiAgICAgICAgICAgIFwiZ2V0QVBJQmFzZVVSTFwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJGbHV4XCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJjb25uZWN0U3RvcmVzXCIsXHJcbiAgICAgICAgICAgIFwiZGVzdHJveVwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJBY3Rpdml0eUFjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcInNlbmRBY3Rpdml0eUludml0ZVwiLFxyXG4gICAgICAgICAgICBcInVwZGF0ZUFjdGl2aXR5XCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIkFja0FjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImluXCI6IFwic3RyaW5nc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcInR5cGU6XFxcIkJVTEtfQUNLXFxcIlwiXHJcbiAgICAgICAgICBdLFxyXG4gICAgICAgICAgW11cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogdHJ1ZSxcclxuICAgICAgICBcImJlZm9yZVwiOiBcImV4cG9ydHNcIlxyXG4gICAgICB9LFxyXG4gICAgICBcIm1hcFwiOiB7XHJcbiAgICAgICAgXCJhY2tcIjogW1xyXG4gICAgICAgICAgXCJ0eXBlOlxcXCJDSEFOTkVMX0FDS1xcXCJcIixcclxuICAgICAgICAgIFwibWVzc2FnZUlkXCIsXHJcbiAgICAgICAgICBcImNoYW5uZWxJZFwiXHJcbiAgICAgICAgXSxcclxuICAgICAgICBcImJ1bGtBY2tcIjogW1xyXG4gICAgICAgICAgXCJ0eXBlOlxcXCJCVUxLX0FDS1xcXCJcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiQW5hbHl0aWNzQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwiaXNUaHJvdHRsZWRcIixcclxuICAgICAgICAgICAgXCJ0cmFja1wiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJBbmltYXRpb25BY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwic3ByaW5nXCIsXHJcbiAgICAgICAgICAgIFwiZGVjYXlcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiQ29ubmVjdGlvbkFjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcInNldFNob3dBY3Rpdml0eVwiLFxyXG4gICAgICAgICAgICBcInNldFZpc2liaWxpdHlcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiUlRDQ29ubmVjdGlvbkFjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcImdldENoYW5uZWxJZFwiLFxyXG4gICAgICAgICAgICBcImdldEd1aWxkSWRcIixcclxuICAgICAgICAgICAgXCJnZXRSVENDb25uZWN0aW9uSWRcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiRW1vamlBY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJ0cmFuc2xhdGVJbmxpbmVFbW9qaVRvU3Vycm9nYXRlc1wiLFxyXG4gICAgICAgICAgICBcInRyYW5zbGF0ZVN1cnJvZ2F0ZXNUb0lubGluZUVtb2ppXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIkVtb2ppU3RhdGVBY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJnZXRVUkxcIixcclxuICAgICAgICAgICAgXCJpc0Vtb2ppRGlzYWJsZWRcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiR3VpbGROb3RpZmljYXRpb25zQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwidXBkYXRlQ2hhbm5lbE92ZXJyaWRlU2V0dGluZ3NcIixcclxuICAgICAgICAgICAgXCJ1cGRhdGVHdWlsZE5vdGlmaWNhdGlvblNldHRpbmdzXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIkludGVybmFsUmVhY3RcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcImpzeFwiLFxyXG4gICAgICAgICAgICBcImpzeHNcIixcclxuICAgICAgICAgICAgXCJGcmFnbWVudFwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJMb2dpbkFjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcImxvZ2luXCIsXHJcbiAgICAgICAgICAgIFwibG9nb3V0XCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIlF1ZXJ5QWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwicXVlcnlFbW9qaVJlc3VsdHNcIixcclxuICAgICAgICAgICAgXCJxdWVyeUZyaWVuZHNcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiTWVzc2FnZUFjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcInJlY2VpdmVNZXNzYWdlXCIsXHJcbiAgICAgICAgICAgIFwic2VuZE1lc3NhZ2VcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiUHJlbWl1bUFjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcImlzUHJlbWl1bVwiLFxyXG4gICAgICAgICAgICBcImNhblVzZUVtb2ppc0V2ZXJ5d2hlcmVcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiVm9pY2VBY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJzZWxlY3RWb2ljZUNoYW5uZWxcIixcclxuICAgICAgICAgICAgXCJkaXNjb25uZWN0XCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIlR5cGluZ0FjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcInN0YXJ0VHlwaW5nXCIsXHJcbiAgICAgICAgICAgIFwic3RvcFR5cGluZ1wiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJHdWlsZEFjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcInNldENoYW5uZWxcIixcclxuICAgICAgICAgICAgXCJzZXRTZXJ2ZXJNdXRlXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIkludml0ZUFjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcImFjY2VwdEludml0ZVwiLFxyXG4gICAgICAgICAgICBcImFjY2VwdEludml0ZUFuZFRyYW5zaXRpb25Ub0ludml0ZUNoYW5uZWxcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiTWVkaWFFbmdpbmVBY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJ0b2dnbGVTZWxmRGVhZlwiLFxyXG4gICAgICAgICAgICBcInRvZ2dsZVNlbGZNdXRlXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcImkxOG5cIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcIl9yZXF1ZXN0ZWRMb2NhbGVcIixcclxuICAgICAgICAgICAgXCJnZXREZWZhdWx0TG9jYWxlXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcInV1aWRcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcInYxXCIsXHJcbiAgICAgICAgICAgIFwidjRcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiaGxqc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwiaGlnaGxpZ2h0QWxsXCIsXHJcbiAgICAgICAgICAgIFwiaGlnaGxpZ2h0XCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn0iLCAiZnVuY3Rpb24gYnVpbGQocHJlZml4ID0gXCJBY29yZFwiLCB0eXBlLCBjb2xvcikge1xyXG4gIHJldHVybiAoLi4uaW5wdXQpID0+IGNvbnNvbGVbdHlwZV0oXHJcbiAgICBgJWMke3ByZWZpeH0lY2AsXHJcbiAgICBgYmFja2dyb3VuZC1jb2xvcjogJHtjb2xvcn07IGNvbG9yOiB3aGl0ZTsgYm9yZGVyLXJhZGl1czogNHB4OyBwYWRkaW5nOiAwcHggNnB4IDBweCA2cHg7IGZvbnQtd2VpZ2h0OiBib2xkYCxcclxuICAgIFwiXCIsXHJcbiAgICAuLi5pbnB1dFxyXG4gICk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBsb2c6IGJ1aWxkKFwiQWNvcmRcIiwgXCJsb2dcIiwgXCIjMDBmYmIwXCIpLFxyXG4gIGRlYnVnOiBidWlsZChcIkFjb3JkIERlYnVnXCIsIFwiZGVidWdcIiwgXCIjMDBmYmIwXCIpLFxyXG4gIGluZm86IGJ1aWxkKFwiQWNvcmQgSW5mb1wiLCBcImxvZ1wiLCBcIiM4MmFhZmZcIiksXHJcbiAgd2FybjogYnVpbGQoXCJBY29yZCBXYXJuXCIsIFwid2FyblwiLCBcIiNkZWJmMThcIiksXHJcbiAgZXJyb3I6IGJ1aWxkKFwiQWNvcmQgRXJyb3JcIiwgXCJlcnJvclwiLCBcIiNlZjU4NThcIiksXHJcbiAgYnVpbGRcclxufSIsICJpbXBvcnQgbG9nZ2VyIGZyb20gXCIuLi8uLi91dGlscy9sb2dnZXIuanNcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB3cmFwRmlsdGVyKGZpbHRlcikge1xyXG4gIHJldHVybiAoLi4uYXJncykgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgaWYgKGFyZ3NbMF0/LmRlZmF1bHQ/LnJlbW92ZSAmJiBhcmdzWzBdPy5kZWZhdWx0Py5zZXQgJiYgYXJnc1swXT8uZGVmYXVsdD8uY2xlYXIgJiYgYXJnc1swXT8uZGVmYXVsdD8uZ2V0ICYmICFhcmdzWzBdPy5kZWZhdWx0Py5zb3J0KSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIGlmIChhcmdzWzBdLnJlbW92ZSAmJiBhcmdzWzBdLnNldCAmJiBhcmdzWzBdLmNsZWFyICYmIGFyZ3NbMF0uZ2V0ICYmICFhcmdzWzBdLnNvcnQpIHJldHVybiBmYWxzZTtcclxuICAgICAgaWYgKGFyZ3NbMF0/LmRlZmF1bHQ/LmdldFRva2VuIHx8IGFyZ3NbMF0/LmRlZmF1bHQ/LmdldEVtYWlsIHx8IGFyZ3NbMF0/LmRlZmF1bHQ/LnNob3dUb2tlbikgcmV0dXJuIGZhbHNlO1xyXG4gICAgICBpZiAoYXJnc1swXT8uZ2V0VG9rZW4gfHwgYXJnc1swXT8uZ2V0RW1haWwgfHwgYXJnc1swXT8uc2hvd1Rva2VuKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIHJldHVybiBmaWx0ZXIoLi4uYXJncyk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGxvZ2dlci53YXJuKFwiTW9kdWxlIGZpbHRlciB0aHJldyBhbiBleGNlcHRpb24uXCIsIGZpbHRlciwgZXJyKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNoZWNrTW9kdWxlU3RyaW5ncyhtLCBzdHJpbmdzLCBoYXNOb3QpIHtcclxuICBjb25zdCBjaGVjayA9IChzMSwgczIpID0+IHtcclxuICAgIHJldHVybiBoYXNOb3QgPyBzMS50b1N0cmluZygpLmluZGV4T2YoczIudG9TdHJpbmcoKSkgPT0gLTEgOiBzMS50b1N0cmluZygpLmluZGV4T2YoczIudG9TdHJpbmcoKSkgPiAtMTtcclxuICB9O1xyXG4gIHJldHVybiBzdHJpbmdzLmV2ZXJ5KGogPT4ge1xyXG4gICAgcmV0dXJuIGNoZWNrKG0/LnRvU3RyaW5nPy4oKSB8fCBcIlwiLCBqKVxyXG4gICAgICB8fCBjaGVjayhtPy5fX29yaWdpbmFsX18/LnRvU3RyaW5nPy4oKSB8fCBcIlwiLCBqKVxyXG4gICAgICB8fCBjaGVjayhtPy50eXBlPy50b1N0cmluZz8uKCkgfHwgXCJcIiwgailcclxuICAgICAgfHwgY2hlY2sobT8udHlwZT8uX19vcmlnaW5hbF9fPy50b1N0cmluZz8uKCkgfHwgXCJcIiwgailcclxuICAgICAgfHwgT2JqZWN0LmVudHJpZXMoWydmdW5jdGlvbicsICdvYmplY3QnXS5pbmNsdWRlcyh0eXBlb2YgbT8ucHJvdG90eXBlKSA/IHR5cGVvZiBtPy5wcm90b3R5cGUgOiB7fSkuZmlsdGVyKGkgPT4gaVswXT8uaW5jbHVkZXM/LihcInJlbmRlclwiKSkuc29tZShpID0+IGNoZWNrKGlbMV0/LnRvU3RyaW5nPy4oKSB8fCBcIlwiLCBqKSlcclxuICB9KTtcclxufTtcclxuZnVuY3Rpb24gY2hlY2tNb2R1bGVQcm9wcyhtLCBwcm9wZXJ0aWVzLCBoYXNOb3QpIHtcclxuICByZXR1cm4gcHJvcGVydGllcy5ldmVyeShwcm9wID0+IHtcclxuICAgIGNvbnN0IHZhbHVlID0gbVtwcm9wXT8uX19vcmlnaW5hbF9fIHx8IG1bcHJvcF07XHJcbiAgICByZXR1cm4gaGFzTm90ID8gdmFsdWUgPT09IHVuZGVmaW5lZCA6ICh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmICEodHlwZW9mIHZhbHVlID09IFwic3RyaW5nXCIgJiYgIXZhbHVlKSk7XHJcbiAgfSk7XHJcbn07XHJcbmZ1bmN0aW9uIGNoZWNrTW9kdWxlUHJvdG90eXBlcyhtLCBwcm90b1Byb3BzLCBoYXNOb3QpIHtcclxuICByZXR1cm4gbS5wcm90b3R5cGUgJiYgcHJvdG9Qcm9wcy5ldmVyeShwcm9wID0+IHtcclxuICAgIGNvbnN0IHZhbHVlID0gbS5wcm90b3R5cGVbcHJvcF07XHJcbiAgICByZXR1cm4gaGFzTm90ID8gdmFsdWUgPT09IHVuZGVmaW5lZCA6ICh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmICEodHlwZW9mIHZhbHVlID09IFwic3RyaW5nXCIgJiYgIXZhbHVlKSk7XHJcbiAgfSk7XHJcbn07XHJcblxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGZpbmQocmVxLCBmaWx0ZXIsIGNvbmZpZyA9IHt9KSB7XHJcbiAgbGV0IGRlZmF1bHRFeHBvcnQgPSB0eXBlb2YgY29uZmlnLmRlZmF1bHRFeHBvcnQgIT0gXCJib29sZWFuXCIgPyB0cnVlIDogY29uZmlnLmRlZmF1bHRFeHBvcnQ7XHJcbiAgbGV0IHVubG9hZGVkID0gdHlwZW9mIGNvbmZpZy51bmxvYWRlZCAhPSBcImJvb2xlYW5cIiA/IGZhbHNlIDogY29uZmlnLnVubG9hZGVkO1xyXG4gIGxldCBhbGwgPSB0eXBlb2YgY29uZmlnLmFsbCAhPSBcImJvb2xlYW5cIiA/IGZhbHNlIDogY29uZmlnLmFsbDtcclxuICBjb25zdCBmb3VuZCA9IFtdO1xyXG4gIGlmICghdW5sb2FkZWQpIGZvciAobGV0IGkgaW4gcmVxLmMpIGlmIChyZXEuYy5oYXNPd25Qcm9wZXJ0eShpKSkge1xyXG4gICAgbGV0IG0gPSByZXEuY1tpXS5leHBvcnRzLCByID0gbnVsbDtcclxuICAgIGlmIChtICYmICh0eXBlb2YgbSA9PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBtID09IFwiZnVuY3Rpb25cIikpIHtcclxuICAgICAgaWYgKCEhKHIgPSBmaWx0ZXIobSwgaSkpKSB7XHJcbiAgICAgICAgaWYgKGFsbCkgZm91bmQucHVzaChkZWZhdWx0RXhwb3J0ID8gciA6IHJlcS5jW2ldKTtcclxuICAgICAgICBlbHNlIHJldHVybiBkZWZhdWx0RXhwb3J0ID8gciA6IHJlcS5jW2ldO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgZm9yIChsZXQga2V5IG9mIE9iamVjdC5rZXlzKG0pKSBpZiAoa2V5Lmxlbmd0aCA8IDQgJiYgbVtrZXldICYmICEhKHIgPSBmaWx0ZXIobVtrZXldLCBpKSkpIHtcclxuICAgICAgICBpZiAoYWxsKSBmb3VuZC5wdXNoKGRlZmF1bHRFeHBvcnQgPyByIDogcmVxLmNbaV0pO1xyXG4gICAgICAgIGVsc2UgcmV0dXJuIGRlZmF1bHRFeHBvcnQgPyByIDogcmVxLmNbaV07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChtICYmIG0uX19lc01vZHVsZSAmJiBtLmRlZmF1bHQgJiYgKHR5cGVvZiBtLmRlZmF1bHQgPT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgbS5kZWZhdWx0ID09IFwiZnVuY3Rpb25cIikpIHtcclxuICAgICAgaWYgKCEhKHIgPSBmaWx0ZXIobS5kZWZhdWx0LCBpKSkpIHtcclxuICAgICAgICBpZiAoYWxsKSBmb3VuZC5wdXNoKGRlZmF1bHRFeHBvcnQgPyByIDogcmVxLmNbaV0pO1xyXG4gICAgICAgIGVsc2UgcmV0dXJuIGRlZmF1bHRFeHBvcnQgPyByIDogcmVxLmNbaV07XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZiAobS5kZWZhdWx0LnR5cGUgJiYgKHR5cGVvZiBtLmRlZmF1bHQudHlwZSA9PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBtLmRlZmF1bHQudHlwZSA9PSBcImZ1bmN0aW9uXCIpICYmICEhKHIgPSBmaWx0ZXIobS5kZWZhdWx0LnR5cGUsIGkpKSkge1xyXG4gICAgICAgIGlmIChhbGwpIGZvdW5kLnB1c2goZGVmYXVsdEV4cG9ydCA/IHIgOiByZXEuY1tpXSk7XHJcbiAgICAgICAgZWxzZSByZXR1cm4gZGVmYXVsdEV4cG9ydCA/IHIgOiByZXEuY1tpXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICBmb3IgKGxldCBpIGluIHJlcS5tKSBpZiAocmVxLm0uaGFzT3duUHJvcGVydHkoaSkpIHtcclxuICAgIGxldCBtID0gcmVxLm1baV07XHJcbiAgICBpZiAobSAmJiB0eXBlb2YgbSA9PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgaWYgKHJlcS5jW2ldICYmICF1bmxvYWRlZCAmJiBmaWx0ZXIobSwgaSkpIHtcclxuICAgICAgICBpZiAoYWxsKSBmb3VuZC5wdXNoKGRlZmF1bHRFeHBvcnQgPyByZXEuY1tpXS5leHBvcnRzIDogcmVxLmNbaV0pO1xyXG4gICAgICAgIGVsc2UgcmV0dXJuIGRlZmF1bHRFeHBvcnQgPyByZXEuY1tpXS5leHBvcnRzIDogcmVxLmNbaV07XHJcbiAgICAgIH1cclxuICAgICAgaWYgKCFyZXEuY1tpXSAmJiB1bmxvYWRlZCAmJiBmaWx0ZXIobSwgaSkpIHtcclxuICAgICAgICBjb25zdCByZXNvbHZlZCA9IHt9LCByZXNvbHZlZDIgPSB7fTtcclxuICAgICAgICBtKHJlc29sdmVkLCByZXNvbHZlZDIsIHJlcSk7XHJcbiAgICAgICAgY29uc3QgdHJ1ZVJlc29sdmVkID0gcmVzb2x2ZWQyICYmIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHJlc29sdmVkMiB8fCB7fSkubGVuZ3RoID09IDAgPyByZXNvbHZlZCA6IHJlc29sdmVkMjtcclxuICAgICAgICBpZiAoYWxsKSBmb3VuZC5wdXNoKGRlZmF1bHRFeHBvcnQgPyB0cnVlUmVzb2x2ZWQuZXhwb3J0cyA6IHRydWVSZXNvbHZlZCk7XHJcbiAgICAgICAgZWxzZSByZXR1cm4gZGVmYXVsdEV4cG9ydCA/IHRydWVSZXNvbHZlZC5leHBvcnRzIDogdHJ1ZVJlc29sdmVkO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIGlmIChhbGwpIHJldHVybiBmb3VuZDtcclxufTtcclxuXHJcblxyXG5mdW5jdGlvbiBmaW5kZXJGaW5kRnVuY3Rpb24oZW50cmllcywgc3RyaW5ncykge1xyXG4gIHJldHVybiAoZW50cmllcy5maW5kKG4gPT4ge1xyXG4gICAgbGV0IGZ1bmNTdHJpbmcgPSB0eXBlb2YgblsxXSA9PSBcImZ1bmN0aW9uXCIgPyAoblsxXT8uX19vcmlnaW5hbF9fPy50b1N0cmluZz8uKCkgfHwgblsxXT8udG9TdHJpbmc/LigpIHx8IFwiXCIpIDogKCgpID0+IHsgdHJ5IHsgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG5bMV0pIH0gY2F0Y2ggKGVycikgeyByZXR1cm4gblsxXS50b1N0cmluZygpIH0gfSkoKTtcclxuICAgIGxldCByZW5kZXJGdW5jU3RyaW5nID0gblsxXT8ucmVuZGVyPy5fX29yaWdpbmFsX18/LnRvU3RyaW5nPy4oKSB8fCBuWzFdPy5yZW5kZXI/LnRvU3RyaW5nPy4oKSB8fCBcIlwiO1xyXG4gICAgcmV0dXJuIHN0cmluZ3MuZXZlcnkoc3RyaW5nID0+IGZ1bmNTdHJpbmcuaW5kZXhPZihzdHJpbmcpICE9IC0xIHx8IHJlbmRlckZ1bmNTdHJpbmcuaW5kZXhPZihzdHJpbmcpICE9IC0xKTtcclxuICB9KSk7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZmluZEJ5RmluZGVyKHJlcSwgZmluZGVyID0ge30pIHtcclxuICBsZXQgZm91bmQgPSBudWxsO1xyXG5cclxuICBpZiAodHlwZW9mIGZpbmRlcj8uZmlsdGVyID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICBmb3VuZCA9IGZpbmQocmVxLCB3cmFwRmlsdGVyKGV2YWwoYCgoJCk9PnsgdHJ5IHsgcmV0dXJuICgke2ZpbmRlci5maWx0ZXJ9KTsgfSBjYXRjaCB7IHJldHVybiBmYWxzZTsgfSB9KWApKSwgeyBkZWZhdWx0RXhwb3J0OiBmYWxzZSB9KTtcclxuICB9IGVsc2UgaWYgKHR5cGVvZiBmaW5kZXI/LmZpbHRlciA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICBmb3VuZCA9IGZpbmQocmVxLCB3cmFwRmlsdGVyKGZpbmRlci5maWx0ZXIpLCB7IGRlZmF1bHRFeHBvcnQ6IGZhbHNlIH0pO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBjb25zdCBkZWZhdWx0RXhwb3J0ID0gISFmaW5kZXI/LmZpbHRlcj8uZXhwb3J0O1xyXG5cclxuICAgIHN3aXRjaCAoZmluZGVyLmZpbHRlci5pbikge1xyXG4gICAgICBjYXNlIFwicHJvcGVydGllc1wiOiB7XHJcbiAgICAgICAgaWYgKGZpbmRlci5maWx0ZXIuYnk/LlsxXT8ubGVuZ3RoKSB7XHJcbiAgICAgICAgICBmb3VuZCA9IGZpbmQocmVxLCB3cmFwRmlsdGVyKChtKSA9PiBjaGVja01vZHVsZVByb3BzKG0sIGZpbmRlci5maWx0ZXIuYnk/LlswXSB8fCBbXSkgJiYgY2hlY2tNb2R1bGVQcm9wcyhtLCBmaW5kZXIuZmlsdGVyLmJ5Py5bMV0gfHwgW10sIHRydWUpKSwgeyBkZWZhdWx0RXhwb3J0IH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBmb3VuZCA9IGZpbmQocmVxLCB3cmFwRmlsdGVyKChtKSA9PiBjaGVja01vZHVsZVByb3BzKG0sIGZpbmRlci5maWx0ZXIuYnk/LlswXSB8fCBbXSkpLCB7IGRlZmF1bHRFeHBvcnQgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgXCJwcm90b3R5cGVzXCI6IHtcclxuICAgICAgICBpZiAoZmluZGVyLmZpbHRlci5ieT8uWzFdPy5sZW5ndGgpIHtcclxuICAgICAgICAgIGZvdW5kID0gZmluZChyZXEsIHdyYXBGaWx0ZXIoKG0pID0+IGNoZWNrTW9kdWxlUHJvdG90eXBlcyhtLCBmaW5kZXIuZmlsdGVyLmJ5Py5bMF0gfHwgW10pICYmIGNoZWNrTW9kdWxlUHJvdG90eXBlcyhtLCBmaW5kZXIuZmlsdGVyLmJ5Py5bMV0gfHwgW10sIHRydWUpKSwgeyBkZWZhdWx0RXhwb3J0IH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBmb3VuZCA9IGZpbmQocmVxLCB3cmFwRmlsdGVyKChtKSA9PiBjaGVja01vZHVsZVByb3RvdHlwZXMobSwgZmluZGVyLmZpbHRlci5ieT8uWzBdIHx8IFtdKSksIHsgZGVmYXVsdEV4cG9ydCB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSBcInN0cmluZ3NcIjoge1xyXG4gICAgICAgIGlmIChmaW5kZXIuZmlsdGVyLmJ5Py5bMV0/Lmxlbmd0aCkge1xyXG4gICAgICAgICAgZm91bmQgPSBmaW5kKHJlcSwgd3JhcEZpbHRlcigobSkgPT4gY2hlY2tNb2R1bGVTdHJpbmdzKG0sIGZpbmRlci5maWx0ZXIuYnk/LlswXSB8fCBbXSkgJiYgY2hlY2tNb2R1bGVTdHJpbmdzKG0sIGZpbmRlci5maWx0ZXIuYnk/LlsxXSB8fCBbXSwgdHJ1ZSkpLCB7IGRlZmF1bHRFeHBvcnQgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGZvdW5kID0gZmluZChyZXEsIHdyYXBGaWx0ZXIoKG0pID0+IGNoZWNrTW9kdWxlU3RyaW5ncyhtLCBmaW5kZXIuZmlsdGVyLmJ5Py5bMF0gfHwgW10pKSwgeyBkZWZhdWx0RXhwb3J0IH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaWYgKCFmb3VuZCkgcmV0dXJuIG51bGw7XHJcblxyXG4gIGlmIChmaW5kZXIucGF0aD8uYmVmb3JlKSBmb3VuZCA9IChBcnJheS5pc0FycmF5KGZpbmRlci5wYXRoLmJlZm9yZSkgPyBmaW5kZXIucGF0aC5iZWZvcmUubWFwKGkgPT4gXy5nZXQoZm91bmQsIGkpKS5maW5kKGkgPT4gaSkgOiBfLmdldChmb3VuZCwgZmluZGVyLnBhdGguYmVmb3JlKSkgfHwgZm91bmQ7XHJcbiAgaWYgKGZpbmRlci5hc3NpZ24pIGZvdW5kID0gT2JqZWN0LmFzc2lnbih7fSwgZm91bmQpO1xyXG5cclxuICBpZiAoIWZvdW5kKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgaWYgKGZpbmRlci5tYXApIHtcclxuICAgIGxldCBfX29yaWdpbmFsX18gPSBmb3VuZDtcclxuICAgIGxldCBfX21hcHBlZF9fID0ge307XHJcblxyXG4gICAgbGV0IHRlbXAgPSB7XHJcbiAgICAgIF9fb3JpZ2luYWxfXyxcclxuICAgICAgX19tYXBwZWRfXyxcclxuICAgICAgLi4uX19vcmlnaW5hbF9fXHJcbiAgICB9O1xyXG5cclxuICAgIE9iamVjdC5lbnRyaWVzKGZpbmRlci5tYXApLmZvckVhY2goKFtrZXksIHN0cmluZ3NdKSA9PiB7XHJcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0ZW1wLCBrZXksIHtcclxuICAgICAgICBnZXQoKSB7XHJcbiAgICAgICAgICBpZiAoX19tYXBwZWRfX1trZXldKSByZXR1cm4gX19vcmlnaW5hbF9fW19fbWFwcGVkX19ba2V5XV07XHJcblxyXG4gICAgICAgICAgbGV0IGZvdW5kRnVuYyA9IGZpbmRlckZpbmRGdW5jdGlvbihPYmplY3QuZW50cmllcyhfX29yaWdpbmFsX18gfHwge30pLCBmaW5kZXIubWFwW2tleV0gfHwgW10pO1xyXG4gICAgICAgICAgaWYgKCFmb3VuZEZ1bmM/Lmxlbmd0aCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgIF9fbWFwcGVkX19ba2V5XSA9IGZvdW5kRnVuY1swXTtcclxuICAgICAgICAgIHJldHVybiBmb3VuZEZ1bmNbMV07XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfSk7XHJcblxyXG4gICAgZm91bmQgPSB0ZW1wO1xyXG4gIH1cclxuXHJcbiAgaWYgKGZpbmRlci5wYXRoPy5hZnRlcikgZm91bmQgPSAoQXJyYXkuaXNBcnJheShmaW5kZXIucGF0aC5hZnRlcikgPyBmaW5kZXIucGF0aC5hZnRlci5tYXAoaSA9PiBfLmdldChmb3VuZCwgaSkpLmZpbmQoaSA9PiBpKSA6IF8uZ2V0KGZvdW5kLCBmaW5kZXIucGF0aC5hZnRlcikpIHx8IGZvdW5kO1xyXG5cclxuICByZXR1cm4gZm91bmQ7XHJcbn0iLCAiaW1wb3J0ICogYXMgY29tcGxleEZpbmRlciBmcm9tIFwiLi9yYXcvY29tcGxleC1maW5kZXIuanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBfX2NhY2hlX186IHt9LFxyXG4gIGdldCByZXEoKSB7XHJcbiAgICBpZiAodGhpcy5fX2NhY2hlX18ucmVxKSByZXR1cm4gdGhpcy5fX2NhY2hlX18ucmVxO1xyXG4gICAgbGV0IHJlcUlkID0gYEFjb3JkV2VicGFja01vZHVsZXMke0RhdGUubm93KCl9YDtcclxuICAgIGNvbnN0IHJlcSA9IHdpbmRvdy53ZWJwYWNrQ2h1bmtkaXNjb3JkX2FwcC5wdXNoKFtbcmVxSWRdLCB7fSwgcmVxID0+IHJlcV0pO1xyXG4gICAgZGVsZXRlIHJlcS5tW3JlcUlkXTtcclxuICAgIGRlbGV0ZSByZXEuY1tyZXFJZF07XHJcbiAgICB3aW5kb3cud2VicGFja0NodW5rZGlzY29yZF9hcHAucG9wKCk7XHJcbiAgICB0aGlzLl9fY2FjaGVfXy5fcmVxID0gcmVxO1xyXG4gICAgcmV0dXJuIHJlcTtcclxuICB9LFxyXG4gIGZpbmQoZmlsdGVyLCBjb25maWcgPSB7fSkge1xyXG4gICAgcmV0dXJuIGNvbXBsZXhGaW5kZXIuZmluZCh0aGlzLnJlcSwgY29tcGxleEZpbmRlci53cmFwRmlsdGVyKGZpbHRlciksIGNvbmZpZyk7XHJcbiAgfSxcclxuICBmaWx0ZXIoZmlsdGVyLCBjb25maWcgPSB7fSkge1xyXG4gICAgcmV0dXJuIGNvbXBsZXhGaW5kZXIuZmluZCh0aGlzLnJlcSwgY29tcGxleEZpbmRlci53cmFwRmlsdGVyKGZpbHRlciksIHsgLi4uY29uZmlnLCBhbGw6IHRydWUgfSk7XHJcbiAgfSxcclxuICBmaW5kQnlGaW5kZXIoZmluZGVyKSB7XHJcbiAgICByZXR1cm4gY29tcGxleEZpbmRlci5maW5kQnlGaW5kZXIodGhpcy5yZXEsIGZpbmRlcik7XHJcbiAgfSxcclxuICBmaW5kQnlQcm9wZXJ0aWVzKC4uLnByb3BzKSB7XHJcbiAgICByZXR1cm4gdGhpcy5maW5kQnlGaW5kZXIoe1xyXG4gICAgICBmaWx0ZXI6IHtcclxuICAgICAgICBleHBvcnQ6IGZhbHNlLFxyXG4gICAgICAgIGluOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBieTogW3Byb3BzXVxyXG4gICAgICB9LFxyXG4gICAgICBwYXRoOiB7XHJcbiAgICAgICAgYmVmb3JlOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgZmluZEJ5UHJvdG90eXBlcyguLi5wcm9wcykge1xyXG4gICAgcmV0dXJuIHRoaXMuZmluZEJ5RmluZGVyKHtcclxuICAgICAgZmlsdGVyOiB7XHJcbiAgICAgICAgZXhwb3J0OiBmYWxzZSxcclxuICAgICAgICBpbjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgYnk6IFtwcm9wc11cclxuICAgICAgfSxcclxuICAgICAgcGF0aDoge1xyXG4gICAgICAgIGJlZm9yZTogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9LFxyXG4gIGZpbmRCeVN0cmluZ3MoLi4ucHJvcHMpIHtcclxuICAgIHJldHVybiB0aGlzLmZpbmRCeUZpbmRlcih7XHJcbiAgICAgIGZpbHRlcjoge1xyXG4gICAgICAgIGV4cG9ydDogZmFsc2UsXHJcbiAgICAgICAgaW46IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIGJ5OiBbcHJvcHNdXHJcbiAgICAgIH0sXHJcbiAgICAgIHBhdGg6IHtcclxuICAgICAgICBiZWZvcmU6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSxcclxufTsiLCAiaW1wb3J0IGNvbW1vbkRhdGEgZnJvbSAnLi4vLi4vZGF0YS9jb21tb24uanNvbic7XHJcbmltcG9ydCB3ZWJwYWNrIGZyb20gJy4vd2VicGFjay5qcyc7XHJcblxyXG5cclxuZnVuY3Rpb24gbWFwT2JqZWN0KHRlbXAsIGlucCkge1xyXG4gIGlmICghdGVtcD8uX19jYWNoZV9fKSB0ZW1wLl9fY2FjaGVfXyA9IHt9O1xyXG4gIGZvciAoY29uc3Qga2V5IGluIGlucCkge1xyXG4gICAgaWYgKGlucD8uW2tleV0/Ll9fID09PSB0cnVlKSB7XHJcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0ZW1wLCBrZXksIHtcclxuICAgICAgICBnZXQoKSB7XHJcbiAgICAgICAgICBpZiAodGVtcC5fX2NhY2hlX19ba2V5XSkgcmV0dXJuIHRlbXAuX19jYWNoZV9fW2tleV07XHJcbiAgICAgICAgICByZXR1cm4gdGVtcC5fX2NhY2hlX19ba2V5XSA9IHdlYnBhY2suZmluZEJ5RmluZGVyKGlucFtrZXldKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0ZW1wW2tleV0gPSB7fTtcclxuICAgICAgbWFwT2JqZWN0KHRlbXBba2V5XSwgaW5wW2tleV0pO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuXHJcbmxldCBjb21tb25BUEkgPSB7IF9fY2FjaGVfXzoge30gfTtcclxubWFwT2JqZWN0KGNvbW1vbkFQSSwgY29tbW9uRGF0YS5jb21tb24pO1xyXG57XHJcbiAgbGV0IHBhdGhzID0gW1xyXG4gICAgXCJleHBvcnRzLlpcIixcclxuICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgIFwiZXhwb3J0c1wiXHJcbiAgXTtcclxuICB3ZWJwYWNrLmZpbHRlcigoaSkgPT4gaT8uZ2V0TmFtZT8uKCk/LmVuZHNXaXRoPy4oXCJTdG9yZVwiKSwgeyBkZWZhdWx0RXhwb3J0OiBmYWxzZSB9KS5mb3JFYWNoKChtKSA9PiB7XHJcbiAgICBsZXQgb2JqID0gcGF0aHMubWFwKHBhdGggPT4gXy5nZXQobSwgcGF0aCkpLmZpbmQoaSA9PiBpKTtcclxuICAgIGlmICghb2JqKSByZXR1cm47XHJcbiAgICBsZXQgbmFtZSA9IG9iaj8uZ2V0TmFtZT8uKCk7XHJcbiAgICBpZiAoIW5hbWUpIHJldHVybjtcclxuICAgIGlmIChjb21tb25BUElbbmFtZV0pIHJldHVybjtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29tbW9uQVBJLCBuYW1lLCB7XHJcbiAgICAgIGdldCgpIHtcclxuICAgICAgICBpZiAoY29tbW9uQVBJLl9fY2FjaGVfX1tuYW1lXSkgcmV0dXJuIGNvbW1vbkFQSS5fX2NhY2hlX19bbmFtZV07XHJcbiAgICAgICAgcmV0dXJuIGNvbW1vbkFQSS5fX2NhY2hlX19bbmFtZV0gPSBvYmo7XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfSlcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29tbW9uQVBJOyIsICJpbXBvcnQgY29tbW9uIGZyb20gXCIuL2NvbW1vbi5qc1wiO1xyXG5pbXBvcnQgd2VicGFjayBmcm9tIFwiLi93ZWJwYWNrLmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgY29tbW9uLFxyXG4gIHdlYnBhY2ssXHJcbiAgcmVxdWlyZTogZ2xvYmFsVGhpc1tcIjxQUkVMT0FEX0tFWT5cIl0ucmVxdWlyZVxyXG59IiwgImxldCBkZXZNb2RlRW5hYmxlZCA9IGZhbHNlO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGdldCBlbmFibGVkKCkge1xyXG4gICAgcmV0dXJuIGRldk1vZGVFbmFibGVkO1xyXG4gIH0sXHJcbiAgc2V0IGVuYWJsZWQodmFsdWUpIHtcclxuICAgIGlmICghZ2xvYmFsVGhpc1tcIjxQUkVMT0FEX0tFWT5cIl0uaXNEZXZUb29sc09wZW4oKSkgdGhyb3cgbmV3IEVycm9yKFwiRGV2IG1vZGUgc3RhdHVzIGNhbiBvbmx5IGJlIG1vZGlmaWVkIHdoZW4gRGV2VG9vbHMgaXMgb3BlbiFcIik7XHJcbiAgICBkZXZNb2RlRW5hYmxlZCA9IHZhbHVlO1xyXG4gIH1cclxufSIsICJpbXBvcnQgbG9nZ2VyIGZyb20gXCIuL2xvZ2dlci5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGxvZ2dlcixcclxuICBmb3JtYXQodmFsLCAuLi5hcmdzKSB7XHJcbiAgICByZXR1cm4gYCR7dmFsfWAucmVwbGFjZUFsbCgveyhcXGQrKX0vZywgKF8sIGNhcCkgPT4ge1xyXG4gICAgICByZXR1cm4gYXJnc1tOdW1iZXIoY2FwKV07XHJcbiAgICB9KTtcclxuICB9LFxyXG59IiwgImltcG9ydCBtb2R1bGVzIGZyb20gXCIuLi9tb2R1bGVzL2luZGV4LmpzXCJcclxuaW1wb3J0IHV0aWxzIGZyb20gXCIuLi91dGlscy9pbmRleC5qc1wiO1xyXG5cclxuY29uc3QgQkFTRV9VUkwgPSBcImh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9BY29yZFBsdWdpbi9pMThuL21haW5cIjtcclxuY29uc3Qgbm9TdG9yZSA9IHsgY2FjaGU6IFwibm8tc3RvcmVcIiB9O1xyXG5cclxuXHJcbmNvbnN0IGkxOG4gPSB7XHJcbiAgX19jYWNoZV9fOiB7XHJcbiAgICBsb2NhbGVJZHM6IFtdLFxyXG4gICAgbG9jYWxpemF0aW9uczoge31cclxuICB9LFxyXG4gIGdldCBsb2NhbGUoKSB7XHJcbiAgICByZXR1cm4gbW9kdWxlcy5jb21tb24uaTE4bi5fcmVxdWVzdGVkTG9jYWxlO1xyXG4gIH0sXHJcbiAgbWVzc2FnZXM6IG5ldyBQcm94eSh7fSwge1xyXG4gICAgZ2V0KF8sIHByb3ApIHtcclxuICAgICAgY2hlY2soKTtcclxuICAgICAgcmV0dXJuIGkxOG4uX19jYWNoZV9fLmxvY2FsaXphdGlvbnNbaTE4bi5sb2NhbGVdPy5bcHJvcF1cclxuICAgICAgICB8fCBpMThuLl9fY2FjaGVfXy5sb2NhbGl6YXRpb25zLmRlZmF1bHQ/Lltwcm9wXVxyXG4gICAgICAgIHx8IG1vZHVsZXMuY29tbW9uLmkxOG4uTWVzc2FnZXNbcHJvcF1cclxuICAgICAgICB8fCBwcm9wO1xyXG4gICAgfVxyXG4gIH0pLFxyXG4gIGxvY2FsaXplKHN0cikge1xyXG4gICAgaWYgKHR5cGVvZiBzdHIgPT09IFwic3RyaW5nXCIpIHJldHVybiBzdHI7XHJcbiAgICByZXR1cm4gc3RyPy5baTE4bi5sb2NhbGVdXHJcbiAgICAgIHx8IHN0cj8uZGVmYXVsdFxyXG4gICAgICB8fCBPYmplY3QudmFsdWVzKHN0cilbMF07XHJcbiAgfSxcclxuICBmb3JtYXQoa2V5LCAuLi5hcmdzKSB7XHJcbiAgICByZXR1cm4gdXRpbHMuZm9ybWF0KGkxOG4ubWVzc2FnZXNba2V5XSwgLi4uYXJncyk7XHJcbiAgfVxyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBjaGVjaygpIHtcclxuICBjb25zdCBsb2NhbGUgPSBpMThuLmxvY2FsZTtcclxuICBpZiAoIWkxOG4uX19jYWNoZV9fLmxvY2FsZUlkcy5sZW5ndGgpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGkxOG4uX19jYWNoZV9fLmxvY2FsZUlkcyA9IGF3YWl0IChhd2FpdCBmZXRjaChgJHtCQVNFX1VSTH0vbG9jYWxlcy5qc29uYCwgbm9TdG9yZSkpLmpzb24oKTtcclxuICAgIH0gY2F0Y2ggeyB9XHJcbiAgICB0cnkge1xyXG4gICAgICBpMThuLl9fY2FjaGVfXy5sb2NhbGl6YXRpb25zLmRlZmF1bHQgPSBhd2FpdCAoYXdhaXQgZmV0Y2goYCR7QkFTRV9VUkx9L2RlZmF1bHQuanNvbmAsIG5vU3RvcmUpKS5qc29uKCk7XHJcbiAgICB9IGNhdGNoIHsgfVxyXG4gIH1cclxuICBpZiAoXHJcbiAgICBpMThuLl9fY2FjaGVfXy5sb2NhbGVJZHMuaW5jbHVkZXMobG9jYWxlKVxyXG4gICAgJiYgIWkxOG4uX19jYWNoZV9fLmxvY2FsaXphdGlvbnM/Lltsb2NhbGVdXHJcbiAgKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBpMThuLl9fY2FjaGVfXy5sb2NhbGl6YXRpb25zW2xvY2FsZV0gPSBhd2FpdCAoYXdhaXQgZmV0Y2goYCR7QkFTRV9VUkx9LyR7bG9jYWxlfS5qc29uYCwgbm9TdG9yZSkpLmpzb24oKTtcclxuICAgIH0gY2F0Y2ggeyB9O1xyXG4gIH1cclxufVxyXG5cclxuY2hlY2soKTtcclxuZXhwb3J0IGRlZmF1bHQgaTE4bjsiLCAiaW1wb3J0IG5lc3RzIGZyb20gXCJuZXN0c1wiO1xyXG5pbXBvcnQgKiBhcyBpZGJLZXl2YWwgZnJvbSBcImlkYi1rZXl2YWxcIjtcclxuaW1wb3J0IHsgZGVDeWNsZWQsIHJldml2ZSB9IGZyb20gXCIuLi8uLi9saWIvanNvbi1kZWN5Y2xlZFwiO1xyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgYXN5bmMgY3JlYXRlUGVyc2lzdE5lc3Qoc3VmZml4KSB7XHJcbiAgICBsZXQgY2FjaGVkID0gYXdhaXQgaWRiS2V5dmFsLmdldChgQWNvcmRTdG9yZTske3N1ZmZpeH1gKTtcclxuICAgIGlmICh0eXBlb2YgY2FjaGVkID09IFwic3RyaW5nXCIpIGNhY2hlZCA9IHJldml2ZShjYWNoZWQpO1xyXG4gICAgY29uc3QgbmVzdCA9IG5lc3RzLm1ha2UoY2FjaGVkID8/IHt9KTtcclxuXHJcbiAgICBjb25zdCBzYXZlID0gKCkgPT4ge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGlkYktleXZhbC5zZXQoYEFjb3JkU3RvcmU7JHtzdWZmaXh9YCwgZGVDeWNsZWQoeyAuLi5uZXN0Lmdob3N0IH0pKTtcclxuICAgICAgfSBjYXRjaCB7XHJcbiAgICAgICAgaWRiS2V5dmFsLnNldChgQWNvcmRTdG9yZTske3N1ZmZpeH1gLCBkZUN5Y2xlZCh7fSkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbmVzdC5vbihuZXN0cy5FdmVudHMuU0VULCBzYXZlKTtcclxuICAgIG5lc3Qub24obmVzdHMuRXZlbnRzLlVQREFURSwgc2F2ZSk7XHJcbiAgICBuZXN0Lm9uKG5lc3RzLkV2ZW50cy5ERUxFVEUsIHNhdmUpO1xyXG5cclxuICAgIHJldHVybiBuZXN0O1xyXG4gIH1cclxufSIsICJmdW5jdGlvbiBwcm9taXNpZnlSZXF1ZXN0KHJlcXVlc3QpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAvLyBAdHMtaWdub3JlIC0gZmlsZSBzaXplIGhhY2tzXG4gICAgICAgIHJlcXVlc3Qub25jb21wbGV0ZSA9IHJlcXVlc3Qub25zdWNjZXNzID0gKCkgPT4gcmVzb2x2ZShyZXF1ZXN0LnJlc3VsdCk7XG4gICAgICAgIC8vIEB0cy1pZ25vcmUgLSBmaWxlIHNpemUgaGFja3NcbiAgICAgICAgcmVxdWVzdC5vbmFib3J0ID0gcmVxdWVzdC5vbmVycm9yID0gKCkgPT4gcmVqZWN0KHJlcXVlc3QuZXJyb3IpO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gY3JlYXRlU3RvcmUoZGJOYW1lLCBzdG9yZU5hbWUpIHtcbiAgICBjb25zdCByZXF1ZXN0ID0gaW5kZXhlZERCLm9wZW4oZGJOYW1lKTtcbiAgICByZXF1ZXN0Lm9udXBncmFkZW5lZWRlZCA9ICgpID0+IHJlcXVlc3QucmVzdWx0LmNyZWF0ZU9iamVjdFN0b3JlKHN0b3JlTmFtZSk7XG4gICAgY29uc3QgZGJwID0gcHJvbWlzaWZ5UmVxdWVzdChyZXF1ZXN0KTtcbiAgICByZXR1cm4gKHR4TW9kZSwgY2FsbGJhY2spID0+IGRicC50aGVuKChkYikgPT4gY2FsbGJhY2soZGIudHJhbnNhY3Rpb24oc3RvcmVOYW1lLCB0eE1vZGUpLm9iamVjdFN0b3JlKHN0b3JlTmFtZSkpKTtcbn1cbmxldCBkZWZhdWx0R2V0U3RvcmVGdW5jO1xuZnVuY3Rpb24gZGVmYXVsdEdldFN0b3JlKCkge1xuICAgIGlmICghZGVmYXVsdEdldFN0b3JlRnVuYykge1xuICAgICAgICBkZWZhdWx0R2V0U3RvcmVGdW5jID0gY3JlYXRlU3RvcmUoJ2tleXZhbC1zdG9yZScsICdrZXl2YWwnKTtcbiAgICB9XG4gICAgcmV0dXJuIGRlZmF1bHRHZXRTdG9yZUZ1bmM7XG59XG4vKipcbiAqIEdldCBhIHZhbHVlIGJ5IGl0cyBrZXkuXG4gKlxuICogQHBhcmFtIGtleVxuICogQHBhcmFtIGN1c3RvbVN0b3JlIE1ldGhvZCB0byBnZXQgYSBjdXN0b20gc3RvcmUuIFVzZSB3aXRoIGNhdXRpb24gKHNlZSB0aGUgZG9jcykuXG4gKi9cbmZ1bmN0aW9uIGdldChrZXksIGN1c3RvbVN0b3JlID0gZGVmYXVsdEdldFN0b3JlKCkpIHtcbiAgICByZXR1cm4gY3VzdG9tU3RvcmUoJ3JlYWRvbmx5JywgKHN0b3JlKSA9PiBwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLmdldChrZXkpKSk7XG59XG4vKipcbiAqIFNldCBhIHZhbHVlIHdpdGggYSBrZXkuXG4gKlxuICogQHBhcmFtIGtleVxuICogQHBhcmFtIHZhbHVlXG4gKiBAcGFyYW0gY3VzdG9tU3RvcmUgTWV0aG9kIHRvIGdldCBhIGN1c3RvbSBzdG9yZS4gVXNlIHdpdGggY2F1dGlvbiAoc2VlIHRoZSBkb2NzKS5cbiAqL1xuZnVuY3Rpb24gc2V0KGtleSwgdmFsdWUsIGN1c3RvbVN0b3JlID0gZGVmYXVsdEdldFN0b3JlKCkpIHtcbiAgICByZXR1cm4gY3VzdG9tU3RvcmUoJ3JlYWR3cml0ZScsIChzdG9yZSkgPT4ge1xuICAgICAgICBzdG9yZS5wdXQodmFsdWUsIGtleSk7XG4gICAgICAgIHJldHVybiBwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLnRyYW5zYWN0aW9uKTtcbiAgICB9KTtcbn1cbi8qKlxuICogU2V0IG11bHRpcGxlIHZhbHVlcyBhdCBvbmNlLiBUaGlzIGlzIGZhc3RlciB0aGFuIGNhbGxpbmcgc2V0KCkgbXVsdGlwbGUgdGltZXMuXG4gKiBJdCdzIGFsc28gYXRvbWljIFx1MjAxMyBpZiBvbmUgb2YgdGhlIHBhaXJzIGNhbid0IGJlIGFkZGVkLCBub25lIHdpbGwgYmUgYWRkZWQuXG4gKlxuICogQHBhcmFtIGVudHJpZXMgQXJyYXkgb2YgZW50cmllcywgd2hlcmUgZWFjaCBlbnRyeSBpcyBhbiBhcnJheSBvZiBgW2tleSwgdmFsdWVdYC5cbiAqIEBwYXJhbSBjdXN0b21TdG9yZSBNZXRob2QgdG8gZ2V0IGEgY3VzdG9tIHN0b3JlLiBVc2Ugd2l0aCBjYXV0aW9uIChzZWUgdGhlIGRvY3MpLlxuICovXG5mdW5jdGlvbiBzZXRNYW55KGVudHJpZXMsIGN1c3RvbVN0b3JlID0gZGVmYXVsdEdldFN0b3JlKCkpIHtcbiAgICByZXR1cm4gY3VzdG9tU3RvcmUoJ3JlYWR3cml0ZScsIChzdG9yZSkgPT4ge1xuICAgICAgICBlbnRyaWVzLmZvckVhY2goKGVudHJ5KSA9PiBzdG9yZS5wdXQoZW50cnlbMV0sIGVudHJ5WzBdKSk7XG4gICAgICAgIHJldHVybiBwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLnRyYW5zYWN0aW9uKTtcbiAgICB9KTtcbn1cbi8qKlxuICogR2V0IG11bHRpcGxlIHZhbHVlcyBieSB0aGVpciBrZXlzXG4gKlxuICogQHBhcmFtIGtleXNcbiAqIEBwYXJhbSBjdXN0b21TdG9yZSBNZXRob2QgdG8gZ2V0IGEgY3VzdG9tIHN0b3JlLiBVc2Ugd2l0aCBjYXV0aW9uIChzZWUgdGhlIGRvY3MpLlxuICovXG5mdW5jdGlvbiBnZXRNYW55KGtleXMsIGN1c3RvbVN0b3JlID0gZGVmYXVsdEdldFN0b3JlKCkpIHtcbiAgICByZXR1cm4gY3VzdG9tU3RvcmUoJ3JlYWRvbmx5JywgKHN0b3JlKSA9PiBQcm9taXNlLmFsbChrZXlzLm1hcCgoa2V5KSA9PiBwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLmdldChrZXkpKSkpKTtcbn1cbi8qKlxuICogVXBkYXRlIGEgdmFsdWUuIFRoaXMgbGV0cyB5b3Ugc2VlIHRoZSBvbGQgdmFsdWUgYW5kIHVwZGF0ZSBpdCBhcyBhbiBhdG9taWMgb3BlcmF0aW9uLlxuICpcbiAqIEBwYXJhbSBrZXlcbiAqIEBwYXJhbSB1cGRhdGVyIEEgY2FsbGJhY2sgdGhhdCB0YWtlcyB0aGUgb2xkIHZhbHVlIGFuZCByZXR1cm5zIGEgbmV3IHZhbHVlLlxuICogQHBhcmFtIGN1c3RvbVN0b3JlIE1ldGhvZCB0byBnZXQgYSBjdXN0b20gc3RvcmUuIFVzZSB3aXRoIGNhdXRpb24gKHNlZSB0aGUgZG9jcykuXG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZShrZXksIHVwZGF0ZXIsIGN1c3RvbVN0b3JlID0gZGVmYXVsdEdldFN0b3JlKCkpIHtcbiAgICByZXR1cm4gY3VzdG9tU3RvcmUoJ3JlYWR3cml0ZScsIChzdG9yZSkgPT4gXG4gICAgLy8gTmVlZCB0byBjcmVhdGUgdGhlIHByb21pc2UgbWFudWFsbHkuXG4gICAgLy8gSWYgSSB0cnkgdG8gY2hhaW4gcHJvbWlzZXMsIHRoZSB0cmFuc2FjdGlvbiBjbG9zZXMgaW4gYnJvd3NlcnNcbiAgICAvLyB0aGF0IHVzZSBhIHByb21pc2UgcG9seWZpbGwgKElFMTAvMTEpLlxuICAgIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgc3RvcmUuZ2V0KGtleSkub25zdWNjZXNzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBzdG9yZS5wdXQodXBkYXRlcih0aGlzLnJlc3VsdCksIGtleSk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLnRyYW5zYWN0aW9uKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSkpO1xufVxuLyoqXG4gKiBEZWxldGUgYSBwYXJ0aWN1bGFyIGtleSBmcm9tIHRoZSBzdG9yZS5cbiAqXG4gKiBAcGFyYW0ga2V5XG4gKiBAcGFyYW0gY3VzdG9tU3RvcmUgTWV0aG9kIHRvIGdldCBhIGN1c3RvbSBzdG9yZS4gVXNlIHdpdGggY2F1dGlvbiAoc2VlIHRoZSBkb2NzKS5cbiAqL1xuZnVuY3Rpb24gZGVsKGtleSwgY3VzdG9tU3RvcmUgPSBkZWZhdWx0R2V0U3RvcmUoKSkge1xuICAgIHJldHVybiBjdXN0b21TdG9yZSgncmVhZHdyaXRlJywgKHN0b3JlKSA9PiB7XG4gICAgICAgIHN0b3JlLmRlbGV0ZShrZXkpO1xuICAgICAgICByZXR1cm4gcHJvbWlzaWZ5UmVxdWVzdChzdG9yZS50cmFuc2FjdGlvbik7XG4gICAgfSk7XG59XG4vKipcbiAqIERlbGV0ZSBtdWx0aXBsZSBrZXlzIGF0IG9uY2UuXG4gKlxuICogQHBhcmFtIGtleXMgTGlzdCBvZiBrZXlzIHRvIGRlbGV0ZS5cbiAqIEBwYXJhbSBjdXN0b21TdG9yZSBNZXRob2QgdG8gZ2V0IGEgY3VzdG9tIHN0b3JlLiBVc2Ugd2l0aCBjYXV0aW9uIChzZWUgdGhlIGRvY3MpLlxuICovXG5mdW5jdGlvbiBkZWxNYW55KGtleXMsIGN1c3RvbVN0b3JlID0gZGVmYXVsdEdldFN0b3JlKCkpIHtcbiAgICByZXR1cm4gY3VzdG9tU3RvcmUoJ3JlYWR3cml0ZScsIChzdG9yZSkgPT4ge1xuICAgICAgICBrZXlzLmZvckVhY2goKGtleSkgPT4gc3RvcmUuZGVsZXRlKGtleSkpO1xuICAgICAgICByZXR1cm4gcHJvbWlzaWZ5UmVxdWVzdChzdG9yZS50cmFuc2FjdGlvbik7XG4gICAgfSk7XG59XG4vKipcbiAqIENsZWFyIGFsbCB2YWx1ZXMgaW4gdGhlIHN0b3JlLlxuICpcbiAqIEBwYXJhbSBjdXN0b21TdG9yZSBNZXRob2QgdG8gZ2V0IGEgY3VzdG9tIHN0b3JlLiBVc2Ugd2l0aCBjYXV0aW9uIChzZWUgdGhlIGRvY3MpLlxuICovXG5mdW5jdGlvbiBjbGVhcihjdXN0b21TdG9yZSA9IGRlZmF1bHRHZXRTdG9yZSgpKSB7XG4gICAgcmV0dXJuIGN1c3RvbVN0b3JlKCdyZWFkd3JpdGUnLCAoc3RvcmUpID0+IHtcbiAgICAgICAgc3RvcmUuY2xlYXIoKTtcbiAgICAgICAgcmV0dXJuIHByb21pc2lmeVJlcXVlc3Qoc3RvcmUudHJhbnNhY3Rpb24pO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gZWFjaEN1cnNvcihzdG9yZSwgY2FsbGJhY2spIHtcbiAgICBzdG9yZS5vcGVuQ3Vyc29yKCkub25zdWNjZXNzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXRoaXMucmVzdWx0KVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjYWxsYmFjayh0aGlzLnJlc3VsdCk7XG4gICAgICAgIHRoaXMucmVzdWx0LmNvbnRpbnVlKCk7XG4gICAgfTtcbiAgICByZXR1cm4gcHJvbWlzaWZ5UmVxdWVzdChzdG9yZS50cmFuc2FjdGlvbik7XG59XG4vKipcbiAqIEdldCBhbGwga2V5cyBpbiB0aGUgc3RvcmUuXG4gKlxuICogQHBhcmFtIGN1c3RvbVN0b3JlIE1ldGhvZCB0byBnZXQgYSBjdXN0b20gc3RvcmUuIFVzZSB3aXRoIGNhdXRpb24gKHNlZSB0aGUgZG9jcykuXG4gKi9cbmZ1bmN0aW9uIGtleXMoY3VzdG9tU3RvcmUgPSBkZWZhdWx0R2V0U3RvcmUoKSkge1xuICAgIHJldHVybiBjdXN0b21TdG9yZSgncmVhZG9ubHknLCAoc3RvcmUpID0+IHtcbiAgICAgICAgLy8gRmFzdCBwYXRoIGZvciBtb2Rlcm4gYnJvd3NlcnNcbiAgICAgICAgaWYgKHN0b3JlLmdldEFsbEtleXMpIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLmdldEFsbEtleXMoKSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaXRlbXMgPSBbXTtcbiAgICAgICAgcmV0dXJuIGVhY2hDdXJzb3Ioc3RvcmUsIChjdXJzb3IpID0+IGl0ZW1zLnB1c2goY3Vyc29yLmtleSkpLnRoZW4oKCkgPT4gaXRlbXMpO1xuICAgIH0pO1xufVxuLyoqXG4gKiBHZXQgYWxsIHZhbHVlcyBpbiB0aGUgc3RvcmUuXG4gKlxuICogQHBhcmFtIGN1c3RvbVN0b3JlIE1ldGhvZCB0byBnZXQgYSBjdXN0b20gc3RvcmUuIFVzZSB3aXRoIGNhdXRpb24gKHNlZSB0aGUgZG9jcykuXG4gKi9cbmZ1bmN0aW9uIHZhbHVlcyhjdXN0b21TdG9yZSA9IGRlZmF1bHRHZXRTdG9yZSgpKSB7XG4gICAgcmV0dXJuIGN1c3RvbVN0b3JlKCdyZWFkb25seScsIChzdG9yZSkgPT4ge1xuICAgICAgICAvLyBGYXN0IHBhdGggZm9yIG1vZGVybiBicm93c2Vyc1xuICAgICAgICBpZiAoc3RvcmUuZ2V0QWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzaWZ5UmVxdWVzdChzdG9yZS5nZXRBbGwoKSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaXRlbXMgPSBbXTtcbiAgICAgICAgcmV0dXJuIGVhY2hDdXJzb3Ioc3RvcmUsIChjdXJzb3IpID0+IGl0ZW1zLnB1c2goY3Vyc29yLnZhbHVlKSkudGhlbigoKSA9PiBpdGVtcyk7XG4gICAgfSk7XG59XG4vKipcbiAqIEdldCBhbGwgZW50cmllcyBpbiB0aGUgc3RvcmUuIEVhY2ggZW50cnkgaXMgYW4gYXJyYXkgb2YgYFtrZXksIHZhbHVlXWAuXG4gKlxuICogQHBhcmFtIGN1c3RvbVN0b3JlIE1ldGhvZCB0byBnZXQgYSBjdXN0b20gc3RvcmUuIFVzZSB3aXRoIGNhdXRpb24gKHNlZSB0aGUgZG9jcykuXG4gKi9cbmZ1bmN0aW9uIGVudHJpZXMoY3VzdG9tU3RvcmUgPSBkZWZhdWx0R2V0U3RvcmUoKSkge1xuICAgIHJldHVybiBjdXN0b21TdG9yZSgncmVhZG9ubHknLCAoc3RvcmUpID0+IHtcbiAgICAgICAgLy8gRmFzdCBwYXRoIGZvciBtb2Rlcm4gYnJvd3NlcnNcbiAgICAgICAgLy8gKGFsdGhvdWdoLCBob3BlZnVsbHkgd2UnbGwgZ2V0IGEgc2ltcGxlciBwYXRoIHNvbWUgZGF5KVxuICAgICAgICBpZiAoc3RvcmUuZ2V0QWxsICYmIHN0b3JlLmdldEFsbEtleXMpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICAgICAgcHJvbWlzaWZ5UmVxdWVzdChzdG9yZS5nZXRBbGxLZXlzKCkpLFxuICAgICAgICAgICAgICAgIHByb21pc2lmeVJlcXVlc3Qoc3RvcmUuZ2V0QWxsKCkpLFxuICAgICAgICAgICAgXSkudGhlbigoW2tleXMsIHZhbHVlc10pID0+IGtleXMubWFwKChrZXksIGkpID0+IFtrZXksIHZhbHVlc1tpXV0pKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpdGVtcyA9IFtdO1xuICAgICAgICByZXR1cm4gY3VzdG9tU3RvcmUoJ3JlYWRvbmx5JywgKHN0b3JlKSA9PiBlYWNoQ3Vyc29yKHN0b3JlLCAoY3Vyc29yKSA9PiBpdGVtcy5wdXNoKFtjdXJzb3Iua2V5LCBjdXJzb3IudmFsdWVdKSkudGhlbigoKSA9PiBpdGVtcykpO1xuICAgIH0pO1xufVxuXG5leHBvcnQgeyBjbGVhciwgY3JlYXRlU3RvcmUsIGRlbCwgZGVsTWFueSwgZW50cmllcywgZ2V0LCBnZXRNYW55LCBrZXlzLCBwcm9taXNpZnlSZXF1ZXN0LCBzZXQsIHNldE1hbnksIHVwZGF0ZSwgdmFsdWVzIH07XG4iLCAiaW1wb3J0IGRldiBmcm9tIFwiLi4vZGV2L2luZGV4LmpzXCI7XHJcbmltcG9ydCBpMThuIGZyb20gXCIuLi9pMThuL2luZGV4LmpzXCI7XHJcbmltcG9ydCBtb2R1bGVzIGZyb20gXCIuLi9tb2R1bGVzL2luZGV4LmpzXCI7XHJcbmltcG9ydCBzdG9yYWdlIGZyb20gXCIuLi9zdG9yYWdlL2luZGV4LmpzXCI7XHJcblxyXG4vKipcclxuICogQHBhcmFtIHt7IG1vZHVsZXM6IHsgbm9kZTogeyBuYW1lOiBzdHJpbmcsIHJlYXNvbjogc3RyaW5nIH1bXSwgY29tbW9uOiB7IG5hbWU6IHN0cmluZywgcmVhc29uOiBzdHJpbmcgfVtdLCBjdXN0b206IHsgcmVhc29uOiBzdHJpbmcsIG5hbWU6IHN0cmluZywgZmluZGVyOiB7IGZpbHRlcjogeyBleHBvcnQ6IGJvb2xlYW4sIGluOiBcInByb3BlcnRpZXNcIiB8IFwic3RyaW5nc1wiIHwgXCJwcm90b3R5cGVzXCIsIGJ5OiBbc3RyaW5nW10sIHN0cmluZ1tdP10gfSwgcGF0aDogeyBiZWZvcmU6IHN0cmluZyB8IHN0cmluZ1tdLCBhZnRlcjogc3RyaW5nIHwgc3RyaW5nW10gfSwgbWFwOiB7IFtrOiBzdHJpbmddOiBzdHJpbmdbXSB9IH0gfVtdIH0sIGFib3V0OiB7IG5hbWU6IHN0cmluZyB8IHsgW2s6IHN0cmluZ106IHN0cmluZyB9LCBkZXNjcmlwdGlvbjogc3RyaW5nIHwgeyBbazogc3RyaW5nXTogc3RyaW5nIH0sIHNsdWc6IHN0cmluZyB9LCByZWFzb246IHN0cmluZyB9fSBjZmcgXHJcbiAqL1xyXG5hc3luYyBmdW5jdGlvbiBidWlsZEFQSShjZmcpIHtcclxuICBjb25zdCBwZXJzaXN0ID0gYXdhaXQgc3RvcmFnZS5jcmVhdGVQZXJzaXN0TmVzdChgRXh0ZW5zaW9uOyR7Y2ZnLmFib3V0LnNsdWd9YCk7XHJcbiAgY29uc3Qgb3V0ID0ge1xyXG4gICAgbW9kdWxlczoge1xyXG4gICAgICBfX2NhY2hlX186IHtcclxuICAgICAgICBjb21tb246IHt9LFxyXG4gICAgICAgIG5vZGU6IHt9LFxyXG4gICAgICAgIGN1c3RvbToge31cclxuICAgICAgfSxcclxuICAgICAgcmVxdWlyZShuYW1lKSB7XHJcbiAgICAgICAgaWYgKCFkZXYuZW5hYmxlZCkge1xyXG4gICAgICAgICAgaWYgKG91dC5tb2R1bGVzLl9fY2FjaGVfXy5ub2RlW3Byb3BdKSByZXR1cm4gb3V0Lm1vZHVsZXMuX19jYWNoZV9fLm5vZGVbcHJvcF07XHJcbiAgICAgICAgICBpZiAoY2ZnLm1vZHVsZXMubm9kZS5zb21lKGkgPT4gaS5uYW1lID09PSBuYW1lKSkgcmV0dXJuIG91dC5tb2R1bGVzLl9fY2FjaGVfXy5ub2RlW3Byb3BdID0gbW9kdWxlcy5yZXF1aXJlKG5hbWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZXR1cm4gbW9kdWxlcy5yZXF1aXJlKG5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgfSxcclxuICAgICAgY29tbW9uOiBuZXcgUHJveHkoe30sIHtcclxuICAgICAgICBnZXQoXywgcHJvcCkge1xyXG4gICAgICAgICAgaWYgKCFkZXYuZW5hYmxlZCkge1xyXG4gICAgICAgICAgICBpZiAob3V0Lm1vZHVsZXMuX19jYWNoZV9fLmNvbW1vbltwcm9wXSkgcmV0dXJuIG91dC5tb2R1bGVzLl9fY2FjaGVfXy5jb21tb25bcHJvcF07XHJcbiAgICAgICAgICAgIGlmIChjZmcubW9kdWxlcy5jb21tb24uc29tZShpID0+IGkubmFtZSA9PT0gcHJvcCkpIHJldHVybiBvdXQubW9kdWxlcy5fX2NhY2hlX18uY29tbW9uW3Byb3BdID0gbW9kdWxlcy5jb21tb25bcHJvcF07XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbW9kdWxlcy5jb21tb25bcHJvcF07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9LFxyXG4gICAgICB9KSxcclxuICAgICAgY3VzdG9tOiBuZXcgUHJveHkoe30sIHtcclxuICAgICAgICBnZXQoXywgcHJvcCkge1xyXG4gICAgICAgICAgaWYgKG91dC5tb2R1bGVzLl9fY2FjaGVfXy5jdXN0b21bcHJvcF0pIHJldHVybiBvdXQubW9kdWxlcy5fX2NhY2hlX18uY3VzdG9tW3Byb3BdO1xyXG4gICAgICAgICAgbGV0IGRhdGEgPSBjZmcubW9kdWxlcy5jdXN0b20uZmluZChpID0+IGkubmFtZSA9PT0gcHJvcCk7XHJcbiAgICAgICAgICBpZiAoIWRhdGEpIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgcmV0dXJuIG91dC5tb2R1bGVzLl9fY2FjaGVfXy5jdXN0b21bcHJvcF0gPSBtb2R1bGVzLndlYnBhY2suZmluZEJ5RmluZGVyKGRhdGEuZmluZGVyKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pLFxyXG4gICAgfSxcclxuICAgIGkxOG4sXHJcbiAgICBleHRlbnNpb246IHtcclxuICAgICAgY29uZmlnOiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGNmZykpLFxyXG4gICAgICBwZXJzaXN0LFxyXG4gICAgICAvLyBUT0RPOiBhZGQgaTE4biBzdXBwb3J0XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIG91dDtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGJ1aWxkQVBJXHJcbn07IiwgImltcG9ydCBtb2R1bGVzIGZyb20gJy4vbW9kdWxlcyc7XHJcbmltcG9ydCBkZXYgZnJvbSAnLi9kZXYnO1xyXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi91dGlscyc7XHJcbmltcG9ydCBleHRlbnNpb25zIGZyb20gJy4vZXh0ZW5zaW9ucyc7XHJcbmltcG9ydCBpMThuIGZyb20gJy4vaTE4bic7XHJcbmltcG9ydCBzdG9yYWdlIGZyb20gJy4vc3RvcmFnZSc7XHJcblxyXG51dGlscy5sb2dnZXIuZGVidWcoYFBSRUxPQURfS0VZOiA8UFJFTE9BRF9LRVk+YCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgZXhwb3NlZEFQSToge1xyXG4gICAgZGV2LFxyXG4gICAgdXRpbHMsXHJcbiAgICBpMThuLFxyXG4gICAgZ2V0IHN0b3JhZ2UoKSB7XHJcbiAgICAgIGlmICghZGV2LmVuYWJsZWQpIHRocm93IG5ldyBFcnJvcihcIlN0b3JhZ2UgQVBJIGNhbiBvbmx5IGJlIGFjY2Vzc2VkIHdoZW4gRGV2IG1vZGUgaXMgZW5hYmxlZCFcIik7XHJcbiAgICAgIHJldHVybiBzdG9yYWdlO1xyXG4gICAgfSxcclxuICAgIGdldCBtb2R1bGVzKCkge1xyXG4gICAgICBpZiAoIWRldi5lbmFibGVkKSB0aHJvdyBuZXcgRXJyb3IoXCJNb2R1bGVzIEFQSSBjYW4gb25seSBiZSBhY2Nlc3NlZCB3aGVuIERldiBtb2RlIGlzIGVuYWJsZWQhXCIpO1xyXG4gICAgICByZXR1cm4gbW9kdWxlcztcclxuICAgIH0sXHJcbiAgICBnZXQgZXh0ZW5zaW9ucygpIHtcclxuICAgICAgaWYgKCFkZXYuZW5hYmxlZCkgdGhyb3cgbmV3IEVycm9yKFwiRXh0ZW5zaW9ucyBBUEkgY2FuIG9ubHkgYmUgYWNjZXNzZWQgd2hlbiBEZXYgbW9kZSBpcyBlbmFibGVkIVwiKTtcclxuICAgICAgcmV0dXJuIGV4dGVuc2lvbnM7XHJcbiAgICB9LFxyXG4gICAgZ2V0IGludGVybmFsKCkge1xyXG4gICAgICBpZiAoIWRldi5lbmFibGVkKSB0aHJvdyBuZXcgRXJyb3IoXCJJbnRlcm5hbCBBUEkgY2FuIG9ubHkgYmUgYWNjZXNzZWQgd2hlbiBEZXYgbW9kZSBpcyBlbmFibGVkIVwiKTtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBwcm9jZXNzOiBnbG9iYWxUaGlzW1wiPFBSRUxPQURfS0VZPlwiXS5wcm9jZXNzLFxyXG4gICAgICAgIGlzRGV2VG9vbHNPcGVuOiBnbG9iYWxUaGlzW1wiPFBSRUxPQURfS0VZPlwiXS5pc0RldlRvb2xzT3BlbixcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgdW5leHBvc2VkQVBJOiB7XHJcbiAgICBkZXYsXHJcbiAgICBtb2R1bGVzLFxyXG4gICAgdXRpbHMsXHJcbiAgICBleHRlbnNpb25zLFxyXG4gICAgaTE4bixcclxuICAgIHN0b3JhZ2UsXHJcbiAgICBpbnRlcm5hbDoge1xyXG4gICAgICBwcm9jZXNzOiBnbG9iYWxUaGlzW1wiPFBSRUxPQURfS0VZPlwiXS5wcm9jZXNzLFxyXG4gICAgICBpc0RldlRvb2xzT3BlbjogZ2xvYmFsVGhpc1tcIjxQUkVMT0FEX0tFWT5cIl0uaXNEZXZUb29sc09wZW4sXHJcbiAgICB9XHJcbiAgfVxyXG59IiwgImltcG9ydCBhcGkgZnJvbSBcIi4vYXBpXCI7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LCBcImFjb3JkXCIsIHtcclxuICBnZXQoKSB7XHJcbiAgICByZXR1cm4gYXBpLmV4cG9zZWRBUEk7XHJcbiAgfVxyXG59KTtcclxud2luZG93Lmdsb2JhbCA9IHdpbmRvdzsiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFDQSxXQUFPLGVBQWUsU0FBUyxjQUFjLEVBQUUsT0FBTyxLQUFLLENBQUM7QUFDNUQsWUFBUSxVQUFVLE9BQU8sT0FBTztBQUFBLE1BQzVCLEtBQUs7QUFBQSxNQUNMLEtBQUs7QUFBQSxNQUNMLFFBQVE7QUFBQSxNQUNSLFFBQVE7QUFBQSxJQUNaLENBQUM7QUFBQTtBQUFBOzs7QUNQRDtBQUFBO0FBQUE7QUFDQSxRQUFJLGtCQUFtQixXQUFRLFFBQUssbUJBQW9CLFNBQVUsS0FBSztBQUNuRSxhQUFRLE9BQU8sSUFBSSxhQUFjLE1BQU0sRUFBRSxXQUFXLElBQUk7QUFBQSxJQUM1RDtBQUNBLFdBQU8sZUFBZSxTQUFTLGNBQWMsRUFBRSxPQUFPLEtBQUssQ0FBQztBQUM1RCxRQUFNLFdBQVcsZ0JBQWdCLGdCQUFtQjtBQUNwRCxRQUFNLGVBQU4sTUFBbUI7QUFBQSxNQUNmLGNBQWM7QUFDVixhQUFL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TTtBQUFBLFFBQ04sUUFBVTtBQUFBLFFBQ1YsTUFBUTtBQUFBLFVBQ04sUUFBVTtBQUFBLFlBQ1I7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxVQUFZO0FBQUEsTUFDVixJQUFNO0FBQUEsTUFDTixRQUFVO0FBQUEsSUFDWjtBQUFBLElBQ0EsZ0JBQWtCO0FBQUEsTUFDaEIsSUFBTTtBQUFBLE1BQ04sTUFBUTtBQUFBLFFBQ04sT0FBUztBQUFBLFVBQ1A7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLE1BQ0EsUUFBVTtBQUFBLFFBQ1IsUUFBVTtBQUFBLFFBQ1YsSUFBTTtBQUFBLFFBQ04sSUFBTTtBQUFBLFVBQ0o7QUFBQSxZQUNFO0FBQUEsWUFDQTtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLE9BQVM7QUFBQSxNQUNQLElBQU07QUFBQSxNQUNOLE1BQVE7QUFBQSxRQUNOLE9BQVM7QUFBQSxVQUNQO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLFFBQVU7QUFBQSxRQUNSLFFBQVU7QUFBQSxRQUNWLElBQU07QUFBQSxRQUNOLElBQU07QUFBQSxVQUNKO0FBQUEsWUFDRTtBQUFBLFlBQ0E7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxNQUFRO0FBQUEsTUFDTixJQUFNO0FBQUEsTUFDTixNQUFRO0FBQUEsUUFDTixPQUFTO0FBQUEsVUFDUDtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsTUFDQSxRQUFVO0FBQUEsUUFDUixRQUFVO0FBQUEsUUFDVixJQUFNO0FBQUEsUUFDTixJQUFNO0FBQUEsVUFDSjtBQUFBLFlBQ0U7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLE1BQVE7QUFBQSxNQUNOLElBQU07QUFBQSxNQUNOLE1BQVE7QUFBQSxRQUNOLE9BQVM7QUFBQSxVQUNQO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLFFBQVU7QUFBQSxRQUNSLFFBQVU7QUFBQSxRQUNWLElBQU07QUFBQSxRQUNOLElBQU07QUFBQSxVQUNKO0FBQUEsWUFDRTtBQUFBLFlBQ0E7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxpQkFBbUI7QUFBQSxNQUNqQixJQUFNO0FBQUEsTUFDTixNQUFRO0FBQUEsUUFDTixPQUFTO0FBQUEsVUFDUDtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsTUFDQSxRQUFVO0FBQUEsUUFDUixRQUFVO0FBQUEsUUFDVixJQUFNO0FBQUEsUUFDTixJQUFNO0FBQUEsVUFDSjtBQUFBLFlBQ0U7QUFBQSxZQUNBO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsWUFBYztBQUFBLE1BQ1osSUFBTTtBQUFBLE1BQ04sUUFBVTtBQUFBLFFBQ1IsSUFBTTtBQUFBLFFBQ04sSUFBTTtBQUFBLFVBQ0o7QUFBQSxZQUNFO0FBQUEsVUFDRjtBQUFBLFVBQ0EsQ0FBQztBQUFBLFFBQ0g7QUFBQSxNQUNGO0FBQUEsTUFDQSxNQUFRO0FBQUEsUUFDTixRQUFVO0FBQUEsUUFDVixRQUFVO0FBQUEsTUFDWjtBQUFBLE1BQ0EsS0FBTztBQUFBLFFBQ0wsS0FBTztBQUFBLFVBQ0w7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFFBQ0Y7QUFBQSxRQUNBLFNBQVc7QUFBQSxVQUNUO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxrQkFBb0I7QUFBQSxNQUNsQixJQUFNO0FBQUEsTUFDTixRQUFVO0FBQUEsUUFDUixRQUFVO0FBQUEsUUFDVixJQUFNO0FBQUEsUUFDTixJQUFNO0FBQUEsVUFDSjtBQUFBLFlBQ0U7QUFBQSxZQUNBO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsTUFDQSxNQUFRO0FBQUEsUUFDTixPQUFTO0FBQUEsVUFDUDtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0Esa0JBQW9CO0FBQUEsTUFDbEIsSUFBTTtBQUFBLE1BQ04sUUFBVTtBQUFBLE1BQ1YsUUFBVTtBQUFBLFFBQ1IsSUFBTTtBQUFBLFFBQ04sSUFBTTtBQUFBLFVBQ0o7QUFBQSxZQUNFO0FBQUEsWUFDQTtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLE1BQ0EsTUFBUTtBQUFBLFFBQ04sT0FBUztBQUFBLFVBQ1A7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLG1CQUFxQjtBQUFBLE1BQ25CLElBQU07QUFBQSxNQUNOLFFBQVU7QUFBQSxRQUNSLFFBQVU7QUFBQSxRQUNWLElBQU07QUFBQSxRQUNOLElBQU07QUFBQSxVQUNKO0FBQUEsWUFDRTtBQUFBLFlBQ0E7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLE1BQVE7QUFBQSxRQUNOLE9BQVM7QUFBQSxVQUNQO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxzQkFBd0I7QUFBQSxNQUN0QixJQUFNO0FBQUEsTUFDTixRQUFVO0FBQUEsUUFDUixRQUFVO0FBQUEsUUFDVixJQUFNO0FBQUEsUUFDTixJQUFNO0FBQUEsVUFDSjtBQUFBLFlBQ0U7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLE1BQ0EsTUFBUTtBQUFBLFFBQ04sT0FBUztBQUFBLFVBQ1A7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLGNBQWdCO0FBQUEsTUFDZCxJQUFNO0FBQUEsTUFDTixRQUFVO0FBQUEsUUFDUixRQUFVO0FBQUEsUUFDVixJQUFNO0FBQUEsUUFDTixJQUFNO0FBQUEsVUFDSjtBQUFBLFlBQ0U7QUFBQSxZQUNBO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsTUFDQSxNQUFRO0FBQUEsUUFDTixPQUFTO0FBQUEsVUFDUDtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsbUJBQXFCO0FBQUEsTUFDbkIsSUFBTTtBQUFBLE1BQ04sUUFBVTtBQUFBLFFBQ1IsUUFBVTtBQUFBLFFBQ1YsSUFBTTtBQUFBLFFBQ04sSUFBTTtBQUFBLFVBQ0o7QUFBQSxZQUNFO0FBQUEsWUFDQTtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLE1BQ0EsTUFBUTtBQUFBLFFBQ04sT0FBUztBQUFBLFVBQ1A7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLDJCQUE2QjtBQUFBLE1BQzNCLElBQU07QUFBQSxNQUNOLFFBQVU7QUFBQSxRQUNSLFFBQVU7QUFBQSxRQUNWLElBQU07QUFBQSxRQUNOLElBQU07QUFBQSxVQUNKO0FBQUEsWUFDRTtBQUFBLFlBQ0E7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLE1BQVE7QUFBQSxRQUNOLE9BQVM7QUFBQSxVQUNQO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxlQUFpQjtBQUFBLE1BQ2YsSUFBTTtBQUFBLE1BQ04sUUFBVTtBQUFBLFFBQ1IsUUFBVTtBQUFBLFFBQ1YsSUFBTTtBQUFBLFFBQ04sSUFBTTtBQUFBLFVBQ0o7QUFBQSxZQUNFO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLE1BQVE7QUFBQSxRQUNOLE9BQVM7QUFBQSxVQUNQO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxjQUFnQjtBQUFBLE1BQ2QsSUFBTTtBQUFBLE1BQ04sUUFBVTtBQUFBLFFBQ1IsUUFBVTtBQUFBLFFBQ1YsSUFBTTtBQUFBLFFBQ04sSUFBTTtBQUFBLFVBQ0o7QUFBQSxZQUNFO0FBQUEsWUFDQTtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLE1BQ0EsTUFBUTtBQUFBLFFBQ04sT0FBUztBQUFBLFVBQ1A7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLGNBQWdCO0FBQUEsTUFDZCxJQUFNO0FBQUEsTUFDTixRQUFVO0FBQUEsUUFDUixRQUFVO0FBQUEsUUFDVixJQUFNO0FBQUEsUUFDTixJQUFNO0FBQUEsVUFDSjtBQUFBLFlBQ0U7QUFBQSxZQUNBO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsTUFDQSxNQUFRO0FBQUEsUUFDTixPQUFTO0FBQUEsVUFDUDtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsZ0JBQWtCO0FBQUEsTUFDaEIsSUFBTTtBQUFBLE1BQ04sUUFBVTtBQUFBLFFBQ1IsUUFBVTtBQUFBLFFBQ1YsSUFBTTtBQUFBLFFBQ04sSUFBTTtBQUFBLFVBQ0o7QUFBQSxZQUNFO0FBQUEsWUFDQTtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLE1BQ0EsTUFBUTtBQUFBLFFBQ04sT0FBUztBQUFBLFVBQ1A7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLGdCQUFrQjtBQUFBLE1BQ2hCLElBQU07QUFBQSxNQUNOLFFBQVU7QUFBQSxRQUNSLFFBQVU7QUFBQSxRQUNWLElBQU07QUFBQSxRQUNOLElBQU07QUFBQSxVQUNKO0FBQUEsWUFDRTtBQUFBLFlBQ0E7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLE1BQVE7QUFBQSxRQUNOLE9BQVM7QUFBQSxVQUNQO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxjQUFnQjtBQUFBLE1BQ2QsSUFBTTtBQUFBLE1BQ04sUUFBVTtBQUFBLFFBQ1IsUUFBVTtBQUFBLFFBQ1YsSUFBTTtBQUFBLFFBQ04sSUFBTTtBQUFBLFVBQ0o7QUFBQSxZQUNFO0FBQUEsWUFDQTtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLE1BQ0EsTUFBUTtBQUFBLFFBQ04sT0FBUztBQUFBLFVBQ1A7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLGVBQWlCO0FBQUEsTUFDZixJQUFNO0FBQUEsTUFDTixRQUFVO0FBQUEsUUFDUixRQUFVO0FBQUEsUUFDVixJQUFNO0FBQUEsUUFDTixJQUFNO0FBQUEsVUFDSjtBQUFBLFlBQ0U7QUFBQSxZQUNBO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsTUFDQSxNQUFRO0FBQUEsUUFDTixPQUFTO0FBQUEsVUFDUDtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsY0FBZ0I7QUFBQSxNQUNkLElBQU07QUFBQSxNQUNOLFFBQVU7QUFBQSxRQUNSLFFBQVU7QUFBQSxRQUNWLElBQU07QUFBQSxRQUNOLElBQU07QUFBQSxVQUNKO0FBQUEsWUFDRTtBQUFBLFlBQ0E7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLE1BQVE7QUFBQSxRQUNOLE9BQVM7QUFBQSxVQUNQO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxlQUFpQjtBQUFBLE1BQ2YsSUFBTTtBQUFBLE1BQ04sUUFBVTtBQUFBLFFBQ1IsUUFBVTtBQUFBLFFBQ1YsSUFBTTtBQUFBLFFBQ04sSUFBTTtBQUFBLFVBQ0o7QUFBQSxZQUNFO0FBQUEsWUFDQTtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLE1BQ0EsTUFBUTtBQUFBLFFBQ04sT0FBUztBQUFBLFVBQ1A7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLG9CQUFzQjtBQUFBLE1BQ3BCLElBQU07QUFBQSxNQUNOLFFBQVU7QUFBQSxRQUNSLFFBQVU7QUFBQSxRQUNWLElBQU07QUFBQSxRQUNOLElBQU07QUFBQSxVQUNKO0FBQUEsWUFDRTtBQUFBLFlBQ0E7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLE1BQVE7QUFBQSxRQUNOLE9BQVM7QUFBQSxVQUNQO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxNQUFRO0FBQUEsTUFDTixJQUFNO0FBQUEsTUFDTixRQUFVO0FBQUEsUUFDUixRQUFVO0FBQUEsUUFDVixJQUFNO0FBQUEsUUFDTixJQUFNO0FBQUEsVUFDSjtBQUFBLFlBQ0U7QUFBQSxZQUNBO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsTUFDQSxNQUFRO0FBQUEsUUFDTixPQUFTO0FBQUEsVUFDUDtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsTUFBUTtBQUFBLE1BQ04sSUFBTTtBQUFBLE1BQ04sUUFBVTtBQUFBLFFBQ1IsUUFBVTtBQUFBLFFBQ1YsSUFBTTtBQUFBLFFBQ04sSUFBTTtBQUFBLFVBQ0o7QUFBQSxZQUNFO0FBQUEsWUFDQTtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLE1BQ0EsTUFBUTtBQUFBLFFBQ04sT0FBUztBQUFBLFVBQ1A7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLE1BQVE7QUFBQSxNQUNOLElBQU07QUFBQSxNQUNOLFFBQVU7QUFBQSxRQUNSLFFBQVU7QUFBQSxRQUNWLElBQU07QUFBQSxRQUNOLElBQU07QUFBQSxVQUNKO0FBQUEsWUFDRTtBQUFBLFlBQ0E7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLE1BQVE7QUFBQSxRQUNOLE9BQVM7QUFBQSxVQUNQO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGOzs7QUN6ckJBLFNBQVMsTUFBTSxTQUFTLFNBQVMsTUFBTSxPQUFPO0FBQzVDLFNBQU8sSUFBSSxVQUFVLFFBQVEsSUFBSTtBQUFBLElBQy9CLEtBQUs7QUFBQSxJQUNMLHFCQUFxQjtBQUFBLElBQ3JCO0FBQUEsSUFDQSxHQUFHO0FBQUEsRUFDTDtBQUNGO0FBRUEsSUFBTyxpQkFBUTtBQUFBLEVBQ2IsS0FBSyxNQUFNLFNBQVMsT0FBTyxTQUFTO0FBQUEsRUFDcEMsT0FBTyxNQUFNLGVBQWUsU0FBUyxTQUFTO0FBQUEsRUFDOUMsTUFBTSxNQUFNLGNBQWMsT0FBTyxTQUFTO0FBQUEsRUFDMUMsTUFBTSxNQUFNLGNBQWMsUUFBUSxTQUFTO0FBQUEsRUFDM0MsT0FBTyxNQUFNLGVBQWUsU0FBUyxTQUFTO0FBQUEsRUFDOUM7QUFDRjs7O0FDZE8sU0FBUyxXQUFXLFFBQVE7QUFDakMsU0FBTyxJQUFJLFNBQVM7QUFDbEIsUUFBSTtBQUNGLFVBQUksS0FBSyxDQUFDLEdBQUcsU0FBUyxVQUFVLEtBQUssQ0FBQyxHQUFHLFNBQVMsT0FBTyxLQUFLLENBQUMsR0FBRyxTQUFTLFNBQVMsS0FBSyxDQUFDLEdBQUcsU0FBUyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsU0FBUztBQUFNLGVBQU87QUFDN0ksVUFBSSxLQUFLLENBQUMsRUFBRSxVQUFVLEtBQUssQ0FBQyxFQUFFLE9BQU8sS0FBSyxDQUFDLEVBQUUsU0FBUyxLQUFLLENBQUMsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7QUFBTSxlQUFPO0FBQzNGLFVBQUksS0FBSyxDQUFDLEdBQUcsU0FBUyxZQUFZLEtBQUssQ0FBQyxHQUFHLFNBQVMsWUFBWSxLQUFLLENBQUMsR0FBRyxTQUFTO0FBQVcsZUFBTztBQUNwRyxVQUFJLEtBQUssQ0FBQyxHQUFHLFlBQVksS0FBSyxDQUFDLEdBQUcsWUFBWSxLQUFLLENBQUMsR0FBRztBQUFXLGVBQU87QUFDekUsYUFBTyxPQUFPLEdBQUcsSUFBSTtBQUFBLElBQ3ZCLFNBQ08sS0FBUDtBQUNFLHFCQUFPLEtBQUsscUNBQXFDLFFBQVEsR0FBRztBQUM1RCxhQUFPO0FBQUEsSUFDVDtBQUFBLEVBQ0Y7QUFDRjtBQUVBLFNBQVMsbUJBQW1CLEdBQUcsU0FBUyxRQUFRO0FBQzlDLFFBQU1HLFNBQVEsQ0FBQyxJQUFJLE9BQU87QUFDeEIsV0FBTyxTQUFTLEdBQUcsU0FBUyxFQUFFLFFBQVEsR0FBRyxTQUFTLENBQUMsS0FBSyxLQUFLLEdBQUcsU0FBUyxFQUFFLFFBQVEsR0FBRyxTQUFTLENBQUMsSUFBSTtBQUFBLEVBQ3RHO0FBQ0EsU0FBTyxRQUFRLE1BQU0sT0FBSztBQUN4QixXQUFPQSxPQUFNLEdBQUcsV0FBVyxLQUFLLElBQUksQ0FBQyxLQUNoQ0EsT0FBTSxHQUFHLGNBQWMsV0FBVyxLQUFLLElBQUksQ0FBQyxLQUM1Q0EsT0FBTSxHQUFHLE1BQU0sV0FBVyxLQUFLLElBQUksQ0FBQyxLQUNwQ0EsT0FBTSxHQUFHLE1BQU0sY0FBYyxXQUFXLEtBQUssSUFBSSxDQUFDLEtBQ2xELE9BQU8sUUFBUSxDQUFDLFlBQVksUUFBUSxFQUFFLFNBQVMsT0FBTyxHQUFHLFNBQVMsSUFBSSxPQUFPLEdBQUcsWUFBWSxDQUFDLENBQUMsRUFBRSxPQUFPLE9BQUssRUFBRSxDQUFDLEdBQUcsV0FBVyxRQUFRLENBQUMsRUFBRSxLQUFLLE9BQUtBLE9BQU0sRUFBRSxDQUFDLEdBQUcsV0FBVyxLQUFLLElBQUksQ0FBQyxDQUFDO0FBQUEsRUFDM0wsQ0FBQztBQUNIO0FBQ0EsU0FBUyxpQkFBaUIsR0FBRyxZQUFZLFFBQVE7QUFDL0MsU0FBTyxXQUFXLE1BQU0sQ0FBQUMsVUFBUTtBQUM5QixVQUFNLFFBQVEsRUFBRUEsS0FBSSxHQUFHLGdCQUFnQixFQUFFQSxLQUFJO0FBQzdDLFdBQU8sU0FBUyxVQUFVLFNBQWEsVUFBVSxVQUFhLEVBQUUsT0FBTyxTQUFTLFlBQVksQ0FBQztBQUFBLEVBQy9GLENBQUM7QUFDSDtBQUNBLFNBQVMsc0JBQXNCLEdBQUcsWUFBWSxRQUFRO0FBQ3BELFNBQU8sRUFBRSxhQUFhLFdBQVcsTUFBTSxDQUFBQyxVQUFRO0FBQzdDLFVBQU0sUUFBUSxFQUFFLFVBQVVBLEtBQUk7QUFDOUIsV0FBTyxTQUFTLFVBQVUsU0FBYSxVQUFVLFVBQWEsRUFBRSxPQUFPLFNBQVMsWUFBWSxDQUFDO0FBQUEsRUFDL0YsQ0FBQztBQUNIO0FBR08sU0FBUyxLQUFLQyxNQUFLLFFBQVEsU0FBUyxDQUFDLEdBQUc7QUFDN0MsTUFBSSxnQkFBZ0IsT0FBTyxPQUFPLGlCQUFpQixZQUFZLE9BQU8sT0FBTztBQUM3RSxNQUFJLFdBQVcsT0FBTyxPQUFPLFlBQVksWUFBWSxRQUFRLE9BQU87QUFDcEUsTUFBSSxNQUFNLE9BQU8sT0FBTyxPQUFPLFlBQVksUUFBUSxPQUFPO0FBQzFELFFBQU1DLFNBQVEsQ0FBQztBQUNmLE1BQUksQ0FBQztBQUFVLGFBQVMsS0FBS0QsS0FBSTtBQUFHLFVBQUlBLEtBQUksRUFBRSxlQUFlLENBQUMsR0FBRztBQUMvRCxZQUFJLElBQUlBLEtBQUksRUFBRSxDQUFDLEVBQUUsU0FBUyxJQUFJO0FBQzlCLFlBQUksTUFBTSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssYUFBYTtBQUN6RCxjQUFJLENBQUMsRUFBRSxJQUFJLE9BQU8sR0FBRyxDQUFDLElBQUk7QUFDeEIsZ0JBQUk7QUFBSyxjQUFBQyxPQUFNLEtBQUssZ0JBQWdCLElBQUlELEtBQUksRUFBRSxDQUFDLENBQUM7QUFBQTtBQUMzQyxxQkFBTyxnQkFBZ0IsSUFBSUEsS0FBSSxFQUFFLENBQUM7QUFBQSxVQUN6QztBQUNLLHFCQUFTLE9BQU8sT0FBTyxLQUFLLENBQUM7QUFBRyxrQkFBSSxJQUFJLFNBQVMsS0FBSyxFQUFFLEdBQUcsS0FBSyxDQUFDLEVBQUUsSUFBSSxPQUFPLEVBQUUsR0FBRyxHQUFHLENBQUMsSUFBSTtBQUM5RixvQkFBSTtBQUFLLGtCQUFBQyxPQUFNLEtBQUssZ0JBQWdCLElBQUlELEtBQUksRUFBRSxDQUFDLENBQUM7QUFBQTtBQUMzQyx5QkFBTyxnQkFBZ0IsSUFBSUEsS0FBSSxFQUFFLENBQUM7QUFBQSxjQUN6QztBQUFBLFFBQ0Y7QUFDQSxZQUFJLEtBQUssRUFBRSxjQUFjLEVBQUUsWUFBWSxPQUFPLEVBQUUsV0FBVyxZQUFZLE9BQU8sRUFBRSxXQUFXLGFBQWE7QUFDdEcsY0FBSSxDQUFDLEVBQUUsSUFBSSxPQUFPLEVBQUUsU0FBUyxDQUFDLElBQUk7QUFDaEMsZ0JBQUk7QUFBSyxjQUFBQyxPQUFNLEtBQUssZ0JBQWdCLElBQUlELEtBQUksRUFBRSxDQUFDLENBQUM7QUFBQTtBQUMzQyxxQkFBTyxnQkFBZ0IsSUFBSUEsS0FBSSxFQUFFLENBQUM7QUFBQSxVQUN6QyxXQUNTLEVBQUUsUUFBUSxTQUFTLE9BQU8sRUFBRSxRQUFRLFFBQVEsWUFBWSxPQUFPLEVBQUUsUUFBUSxRQUFRLGVBQWUsQ0FBQyxFQUFFLElBQUksT0FBTyxFQUFFLFFBQVEsTUFBTSxDQUFDLElBQUk7QUFDMUksZ0JBQUk7QUFBSyxjQUFBQyxPQUFNLEtBQUssZ0JBQWdCLElBQUlELEtBQUksRUFBRSxDQUFDLENBQUM7QUFBQTtBQUMzQyxxQkFBTyxnQkFBZ0IsSUFBSUEsS0FBSSxFQUFFLENBQUM7QUFBQSxVQUN6QztBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUE7QUFDQSxXQUFTLEtBQUtBLEtBQUk7QUFBRyxRQUFJQSxLQUFJLEVBQUUsZUFBZSxDQUFDLEdBQUc7QUFDaEQsVUFBSSxJQUFJQSxLQUFJLEVBQUUsQ0FBQztBQUNmLFVBQUksS0FBSyxPQUFPLEtBQUssWUFBWTtBQUMvQixZQUFJQSxLQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsWUFBWSxPQUFPLEdBQUcsQ0FBQyxHQUFHO0FBQ3pDLGNBQUk7QUFBSyxZQUFBQyxPQUFNLEtBQUssZ0JBQWdCRCxLQUFJLEVBQUUsQ0FBQyxFQUFFLFVBQVVBLEtBQUksRUFBRSxDQUFDLENBQUM7QUFBQTtBQUMxRCxtQkFBTyxnQkFBZ0JBLEtBQUksRUFBRSxDQUFDLEVBQUUsVUFBVUEsS0FBSSxFQUFFLENBQUM7QUFBQSxRQUN4RDtBQUNBLFlBQUksQ0FBQ0EsS0FBSSxFQUFFLENBQUMsS0FBSyxZQUFZLE9BQU8sR0FBRyxDQUFDLEdBQUc7QUFDekMsZ0JBQU0sV0FBVyxDQUFDLEdBQUcsWUFBWSxDQUFDO0FBQ2xDLFlBQUUsVUFBVSxXQUFXQSxJQUFHO0FBQzFCLGdCQUFNLGVBQWUsYUFBYSxPQUFPLG9CQUFvQixhQUFhLENBQUMsQ0FBQyxFQUFFLFVBQVUsSUFBSSxXQUFXO0FBQ3ZHLGNBQUk7QUFBSyxZQUFBQyxPQUFNLEtBQUssZ0JBQWdCLGFBQWEsVUFBVSxZQUFZO0FBQUE7QUFDbEUsbUJBQU8sZ0JBQWdCLGFBQWEsVUFBVTtBQUFBLFFBQ3JEO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFDQSxNQUFJO0FBQUssV0FBT0E7QUFDbEI7QUFHQSxTQUFTLG1CQUFtQixTQUFTLFNBQVM7QUFDNUMsU0FBUSxRQUFRLEtBQUssT0FBSztBQUN4QixRQUFJLGFBQWEsT0FBTyxFQUFFLENBQUMsS0FBSyxhQUFjLEVBQUUsQ0FBQyxHQUFHLGNBQWMsV0FBVyxLQUFLLEVBQUUsQ0FBQyxHQUFHLFdBQVcsS0FBSyxNQUFPLE1BQU07QUFBRSxVQUFJO0FBQUUsZUFBTyxLQUFLLFVBQVUsRUFBRSxDQUFDLENBQUM7QUFBQSxNQUFFLFNBQVMsS0FBUDtBQUFjLGVBQU8sRUFBRSxDQUFDLEVBQUUsU0FBUztBQUFBLE1BQUU7QUFBQSxJQUFFLEdBQUc7QUFDck0sUUFBSSxtQkFBbUIsRUFBRSxDQUFDLEdBQUcsUUFBUSxjQUFjLFdBQVcsS0FBSyxFQUFFLENBQUMsR0FBRyxRQUFRLFdBQVcsS0FBSztBQUNqRyxXQUFPLFFBQVEsTUFBTSxZQUFVLFdBQVcsUUFBUSxNQUFNLEtBQUssTUFBTSxpQkFBaUIsUUFBUSxNQUFNLEtBQUssRUFBRTtBQUFBLEVBQzNHLENBQUM7QUFDSDtBQUdPLFNBQVMsYUFBYSxLQUFLLFNBQVMsQ0FBQyxHQUFHO0FBQzdDLE1BQUksUUFBUTtBQUVaLE1BQUksT0FBTyxRQUFRLFdBQVcsVUFBVTtBQUN0QyxZQUFRLEtBQUssS0FBSyxXQUFXLEtBQUsseUJBQXlCLE9BQU8sdUNBQXVDLENBQUMsR0FBRyxFQUFFLGVBQWUsTUFBTSxDQUFDO0FBQUEsRUFDdkksV0FBVyxPQUFPLFFBQVEsV0FBVyxZQUFZO0FBQy9DLFlBQVEsS0FBSyxLQUFLLFdBQVcsT0FBTyxNQUFNLEdBQUcsRUFBRSxlQUFlLE1BQU0sQ0FBQztBQUFBLEVBQ3ZFLE9BQU87QUFDTCxVQUFNLGdCQUFnQixDQUFDLENBQUMsUUFBUSxRQUFRO0FBRXhDLFlBQVEsT0FBTyxPQUFPLElBQUk7QUFBQSxNQUN4QixLQUFLLGNBQWM7QUFDakIsWUFBSSxPQUFPLE9BQU8sS0FBSyxDQUFDLEdBQUcsUUFBUTtBQUNqQyxrQkFBUSxLQUFLLEtBQUssV0FBVyxDQUFDLE1BQU0saUJBQWlCLEdBQUcsT0FBTyxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLGlCQUFpQixHQUFHLE9BQU8sT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxjQUFjLENBQUM7QUFBQSxRQUNwSyxPQUFPO0FBQ0wsa0JBQVEsS0FBSyxLQUFLLFdBQVcsQ0FBQyxNQUFNLGlCQUFpQixHQUFHLE9BQU8sT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsY0FBYyxDQUFDO0FBQUEsUUFDMUc7QUFDQTtBQUFBLE1BQ0Y7QUFBQSxNQUNBLEtBQUssY0FBYztBQUNqQixZQUFJLE9BQU8sT0FBTyxLQUFLLENBQUMsR0FBRyxRQUFRO0FBQ2pDLGtCQUFRLEtBQUssS0FBSyxXQUFXLENBQUMsTUFBTSxzQkFBc0IsR0FBRyxPQUFPLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssc0JBQXNCLEdBQUcsT0FBTyxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLGNBQWMsQ0FBQztBQUFBLFFBQzlLLE9BQU87QUFDTCxrQkFBUSxLQUFLLEtBQUssV0FBVyxDQUFDLE1BQU0sc0JBQXNCLEdBQUcsT0FBTyxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxjQUFjLENBQUM7QUFBQSxRQUMvRztBQUNBO0FBQUEsTUFDRjtBQUFBLE1BQ0EsS0FBSyxXQUFXO0FBQ2QsWUFBSSxPQUFPLE9BQU8sS0FBSyxDQUFDLEdBQUcsUUFBUTtBQUNqQyxrQkFBUSxLQUFLLEtBQUssV0FBVyxDQUFDLE1BQU0sbUJBQW1CLEdBQUcsT0FBTyxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLG1CQUFtQixHQUFHLE9BQU8sT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxjQUFjLENBQUM7QUFBQSxRQUN4SyxPQUFPO0FBQ0wsa0JBQVEsS0FBSyxLQUFLLFdBQVcsQ0FBQyxNQUFNLG1CQUFtQixHQUFHLE9BQU8sT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsY0FBYyxDQUFDO0FBQUEsUUFDNUc7QUFDQTtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUVBLE1BQUksQ0FBQztBQUFPLFdBQU87QUFFbkIsTUFBSSxPQUFPLE1BQU07QUFBUSxhQUFTLE1BQU0sUUFBUSxPQUFPLEtBQUssTUFBTSxJQUFJLE9BQU8sS0FBSyxPQUFPLElBQUksT0FBSyxFQUFFLElBQUksT0FBTyxDQUFDLENBQUMsRUFBRSxLQUFLLE9BQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxPQUFPLE9BQU8sS0FBSyxNQUFNLE1BQU07QUFDdkssTUFBSSxPQUFPO0FBQVEsWUFBUSxPQUFPLE9BQU8sQ0FBQyxHQUFHLEtBQUs7QUFFbEQsTUFBSSxDQUFDO0FBQU8sV0FBTztBQUVuQixNQUFJLE9BQU8sS0FBSztBQUNkLFFBQUksZUFBZTtBQUNuQixRQUFJLGFBQWEsQ0FBQztBQUVsQixRQUFJLE9BQU87QUFBQSxNQUNUO0FBQUEsTUFDQTtBQUFBLE1BQ0EsR0FBRztBQUFBLElBQ0w7QUFFQSxXQUFPLFFBQVEsT0FBTyxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUMsS0FBSyxPQUFPLE1BQU07QUFDckQsYUFBTyxlQUFlLE1BQU0sS0FBSztBQUFBLFFBQy9CLE1BQU07QUFDSixjQUFJLFdBQVcsR0FBRztBQUFHLG1CQUFPLGFBQWEsV0FBVyxHQUFHLENBQUM7QUFFeEQsY0FBSSxZQUFZLG1CQUFtQixPQUFPLFFBQVEsZ0JBQWdCLENBQUMsQ0FBQyxHQUFHLE9BQU8sSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDO0FBQzVGLGNBQUksQ0FBQyxXQUFXO0FBQVE7QUFFeEIscUJBQVcsR0FBRyxJQUFJLFVBQVUsQ0FBQztBQUM3QixpQkFBTyxVQUFVLENBQUM7QUFBQSxRQUNwQjtBQUFBLE1BQ0YsQ0FBQztBQUFBLElBQ0gsQ0FBQztBQUVELFlBQVE7QUFBQSxFQUNWO0FBRUEsTUFBSSxPQUFPLE1BQU07QUFBTyxhQUFTLE1BQU0sUUFBUSxPQUFPLEtBQUssS0FBSyxJQUFJLE9BQU8sS0FBSyxNQUFNLElBQUksT0FBSyxFQUFFLElBQUksT0FBTyxDQUFDLENBQUMsRUFBRSxLQUFLLE9BQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxPQUFPLE9BQU8sS0FBSyxLQUFLLE1BQU07QUFFbkssU0FBTztBQUNUOzs7QUM5S0EsSUFBTyxrQkFBUTtBQUFBLEVBQ2IsV0FBVyxDQUFDO0FBQUEsRUFDWixJQUFJLE1BQU07QUFDUixRQUFJLEtBQUssVUFBVTtBQUFLLGFBQU8sS0FBSyxVQUFVO0FBQzlDLFFBQUksUUFBUSxzQkFBc0IsS0FBSyxJQUFJO0FBQzNDLFVBQU1DLE9BQU0sT0FBTyx3QkFBd0IsS0FBSyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsR0FBRyxDQUFBQSxTQUFPQSxJQUFHLENBQUM7QUFDekUsV0FBT0EsS0FBSSxFQUFFLEtBQUs7QUFDbEIsV0FBT0EsS0FBSSxFQUFFLEtBQUs7QUFDbEIsV0FBTyx3QkFBd0IsSUFBSTtBQUNuQyxTQUFLLFVBQVUsT0FBT0E7QUFDdEIsV0FBT0E7QUFBQSxFQUNUO0FBQUEsRUFDQSxLQUFLLFFBQVEsU0FBUyxDQUFDLEdBQUc7QUFDeEIsV0FBcUIsS0FBSyxLQUFLLEtBQW1CLFdBQVcsTUFBTSxHQUFHLE1BQU07QUFBQSxFQUM5RTtBQUFBLEVBQ0EsT0FBTyxRQUFRLFNBQVMsQ0FBQyxHQUFHO0FBQzFCLFdBQXFCLEtBQUssS0FBSyxLQUFtQixXQUFXLE1BQU0sR0FBRyxFQUFFLEdBQUcsUUFBUSxLQUFLLEtBQUssQ0FBQztBQUFBLEVBQ2hHO0FBQUEsRUFDQSxhQUFhQyxTQUFRO0FBQ25CLFdBQXFCLGFBQWEsS0FBSyxLQUFLQSxPQUFNO0FBQUEsRUFDcEQ7QUFBQSxFQUNBLG9CQUFvQixPQUFPO0FBQ3pCLFdBQU8sS0FBSyxhQUFhO0FBQUEsTUFDdkIsUUFBUTtBQUFBLFFBQ04sUUFBUTtBQUFBLFFBQ1IsSUFBSTtBQUFBLFFBQ0osSUFBSSxDQUFDLEtBQUs7QUFBQSxNQUNaO0FBQUEsTUFDQSxNQUFNO0FBQUEsUUFDSixRQUFRO0FBQUEsVUFDTjtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0Esb0JBQW9CLE9BQU87QUFDekIsV0FBTyxLQUFLLGFBQWE7QUFBQSxNQUN2QixRQUFRO0FBQUEsUUFDTixRQUFRO0FBQUEsUUFDUixJQUFJO0FBQUEsUUFDSixJQUFJLENBQUMsS0FBSztBQUFBLE1BQ1o7QUFBQSxNQUNBLE1BQU07QUFBQSxRQUNKLFFBQVE7QUFBQSxVQUNOO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxpQkFBaUIsT0FBTztBQUN0QixXQUFPLEtBQUssYUFBYTtBQUFBLE1BQ3ZCLFFBQVE7QUFBQSxRQUNOLFFBQVE7QUFBQSxRQUNSLElBQUk7QUFBQSxRQUNKLElBQUksQ0FBQyxLQUFLO0FBQUEsTUFDWjtBQUFBLE1BQ0EsTUFBTTtBQUFBLFFBQ0osUUFBUTtBQUFBLFVBQ047QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFDRjs7O0FDdEVBLFNBQVMsVUFBVSxNQUFNLEtBQUs7QUFDNUIsTUFBSSxDQUFDLE1BQU07QUFBVyxTQUFLLFlBQVksQ0FBQztBQUN4QyxhQUFXLE9BQU8sS0FBSztBQUNyQixRQUFJLE1BQU0sR0FBRyxHQUFHLE9BQU8sTUFBTTtBQUMzQixhQUFPLGVBQWUsTUFBTSxLQUFLO0FBQUEsUUFDL0IsTUFBTTtBQUNKLGNBQUksS0FBSyxVQUFVLEdBQUc7QUFBRyxtQkFBTyxLQUFLLFVBQVUsR0FBRztBQUNsRCxpQkFBTyxLQUFLLFVBQVUsR0FBRyxJQUFJLGdCQUFRLGFBQWEsSUFBSSxHQUFHLENBQUM7QUFBQSxRQUM1RDtBQUFBLE1BQ0YsQ0FBQztBQUFBLElBQ0gsT0FBTztBQUNMLFdBQUssR0FBRyxJQUFJLENBQUM7QUFDYixnQkFBVSxLQUFLLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQztBQUFBLElBQy9CO0FBQUEsRUFDRjtBQUNGO0FBR0EsSUFBSSxZQUFZLEVBQUUsV0FBVyxDQUFDLEVBQUU7QUFDaEMsVUFBVSxXQUFXLGVBQVcsTUFBTTtBQUN0QztBQUNFLE1BQUksUUFBUTtBQUFBLElBQ1Y7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQ0Esa0JBQVEsT0FBTyxDQUFDLE1BQU0sR0FBRyxVQUFVLEdBQUcsV0FBVyxPQUFPLEdBQUcsRUFBRSxlQUFlLE1BQU0sQ0FBQyxFQUFFLFFBQVEsQ0FBQyxNQUFNO0FBQ2xHLFFBQUksTUFBTSxNQUFNLElBQUksVUFBUSxFQUFFLElBQUksR0FBRyxJQUFJLENBQUMsRUFBRSxLQUFLLE9BQUssQ0FBQztBQUN2RCxRQUFJLENBQUM7QUFBSztBQUNWLFFBQUksT0FBTyxLQUFLLFVBQVU7QUFDMUIsUUFBSSxDQUFDO0FBQU07QUFDWCxRQUFJLFVBQVUsSUFBSTtBQUFHO0FBRXJCLFdBQU8sZUFBZSxXQUFXLE1BQU07QUFBQSxNQUNyQyxNQUFNO0FBQ0osWUFBSSxVQUFVLFVBQVUsSUFBSTtBQUFHLGlCQUFPLFVBQVUsVUFBVSxJQUFJO0FBQzlELGVBQU8sVUFBVSxVQUFVLElBQUksSUFBSTtBQUFBLE1BQ3JDO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSCxDQUFDO0FBQ0g7QUFFQSxJQUFPQyxrQkFBUTs7O0FDNUNmLElBQU8sa0JBQVE7QUFBQSxFQUNiLFFBQUFDO0FBQUEsRUFDQTtBQUFBLEVBQ0EsU0FBUyxXQUFXLGVBQWUsRUFBRTtBQUN2Qzs7O0FDUEEsSUFBSSxpQkFBaUI7QUFFckIsSUFBTyxjQUFRO0FBQUEsRUFDYixJQUFJLFVBQVU7QUFDWixXQUFPO0FBQUEsRUFDVDtBQUFBLEVBQ0EsSUFBSSxRQUFRLE9BQU87QUFDakIsUUFBSSxDQUFDLFdBQVcsZUFBZSxFQUFFLGVBQWU7QUFBRyxZQUFNLElBQUksTUFBTSw2REFBNkQ7QUFDaEkscUJBQWlCO0FBQUEsRUFDbkI7QUFDRjs7O0FDUkEsSUFBTyxnQkFBUTtBQUFBLEVBQ2I7QUFBQSxFQUNBLE9BQU8sUUFBUSxNQUFNO0FBQ25CLFdBQU8sR0FBRyxNQUFNLFdBQVcsWUFBWSxDQUFDQyxJQUFHLFFBQVE7QUFDakQsYUFBTyxLQUFLLE9BQU8sR0FBRyxDQUFDO0FBQUEsSUFDekIsQ0FBQztBQUFBLEVBQ0g7QUFDRjs7O0FDTkEsSUFBTSxXQUFXO0FBQ2pCLElBQU0sVUFBVSxFQUFFLE9BQU8sV0FBVztBQUdwQyxJQUFNLE9BQU87QUFBQSxFQUNYLFdBQVc7QUFBQSxJQUNULFdBQVcsQ0FBQztBQUFBLElBQ1osZUFBZSxDQUFDO0FBQUEsRUFDbEI7QUFBQSxFQUNBLElBQUksU0FBUztBQUNYLFdBQU8sZ0JBQVEsT0FBTyxLQUFLO0FBQUEsRUFDN0I7QUFBQSxFQUNBLFVBQVUsSUFBSSxNQUFNLENBQUMsR0FBRztBQUFBLElBQ3RCLElBQUlDLElBQUdDLE9BQU07QUFDWCxZQUFNO0FBQ04sYUFBTyxLQUFLLFVBQVUsY0FBYyxLQUFLLE1BQU0sSUFBSUEsS0FBSSxLQUNsRCxLQUFLLFVBQVUsY0FBYyxVQUFVQSxLQUFJLEtBQzNDLGdCQUFRLE9BQU8sS0FBSyxTQUFTQSxLQUFJLEtBQ2pDQTtBQUFBLElBQ1A7QUFBQSxFQUNGLENBQUM7QUFBQSxFQUNELFNBQVMsS0FBSztBQUNaLFFBQUksT0FBTyxRQUFRO0FBQVUsYUFBTztBQUNwQyxXQUFPLE1BQU0sS0FBSyxNQUFNLEtBQ25CLEtBQUssV0FDTCxPQUFPLE9BQU8sR0FBRyxFQUFFLENBQUM7QUFBQSxFQUMzQjtBQUFBLEVBQ0EsT0FBTyxRQUFRLE1BQU07QUFDbkIsV0FBTyxjQUFNLE9BQU8sS0FBSyxTQUFTLEdBQUcsR0FBRyxHQUFHLElBQUk7QUFBQSxFQUNqRDtBQUNGO0FBRUEsZUFBZSxRQUFRO0FBQ3JCLFFBQU0sU0FBUyxLQUFLO0FBQ3BCLE1BQUksQ0FBQyxLQUFLLFVBQVUsVUFBVSxRQUFRO0FBQ3BDLFFBQUk7QUFDRixXQUFLLFVBQVUsWUFBWSxPQUFPLE1BQU0sTUFBTSxHQUFHLHlCQUF5QixPQUFPLEdBQUcsS0FBSztBQUFBLElBQzNGLFFBQUU7QUFBQSxJQUFRO0FBQ1YsUUFBSTtBQUNGLFdBQUssVUFBVSxjQUFjLFVBQVUsT0FBTyxNQUFNLE1BQU0sR0FBRyx5QkFBeUIsT0FBTyxHQUFHLEtBQUs7QUFBQSxJQUN2RyxRQUFFO0FBQUEsSUFBUTtBQUFBLEVBQ1o7QUFDQSxNQUNFLEtBQUssVUFBVSxVQUFVLFNBQVMsTUFBTSxLQUNyQyxDQUFDLEtBQUssVUFBVSxnQkFBZ0IsTUFBTSxHQUN6QztBQUNBLFFBQUk7QUFDRixXQUFLLFVBQVUsY0FBYyxNQUFNLElBQUksT0FBTyxNQUFNLE1BQU0sR0FBRyxZQUFZLGVBQWUsT0FBTyxHQUFHLEtBQUs7QUFBQSxJQUN6RyxRQUFFO0FBQUEsSUFBUTtBQUFDO0FBQUEsRUFDYjtBQUNGO0FBRUEsTUFBTTtBQUNOLElBQU8sZUFBUTs7O0FDeERmLG1CQUFrQjs7O0FDQWxCLFNBQVMsaUJBQWlCLFNBQVM7QUFDL0IsU0FBTyxJQUFJLFFBQVEsQ0FBQyxTQUFTLFdBQVc7QUFFcEMsWUFBUSxhQUFhLFFBQVEsWUFBWSxNQUFNLFFBQVEsUUFBUSxNQUFNO0FBRXJFLFlBQVEsVUFBVSxRQUFRLFVBQVUsTUFBTSxPQUFPLFFBQVEsS0FBSztBQUFBLEVBQ2xFLENBQUM7QUFDTDtBQUNBLFNBQVMsWUFBWSxRQUFRLFdBQVc7QUFDcEMsUUFBTSxVQUFVLFVBQVUsS0FBSyxNQUFNO0FBQ3JDLFVBQVEsa0JBQWtCLE1BQU0sUUFBUSxPQUFPLGtCQUFrQixTQUFTO0FBQzFFLFFBQU0sTUFBTSxpQkFBaUIsT0FBTztBQUNwQyxTQUFPLENBQUMsUUFBUSxhQUFhLElBQUksS0FBSyxDQUFDLE9BQU8sU0FBUyxHQUFHLFlBQVksV0FBVyxNQUFNLEVBQUUsWUFBWSxTQUFTLENBQUMsQ0FBQztBQUNwSDtBQUNBLElBQUk7QUFDSixTQUFTLGtCQUFrQjtBQUN2QixNQUFJLENBQUMscUJBQXFCO0FBQ3RCLDBCQUFzQixZQUFZLGdCQUFnQixRQUFRO0FBQUEsRUFDOUQ7QUFDQSxTQUFPO0FBQ1g7QUFPQSxTQUFTLElBQUksS0FBSyxjQUFjLGdCQUFnQixHQUFHO0FBQy9DLFNBQU8sWUFBWSxZQUFZLENBQUMsVUFBVSxpQkFBaUIsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDO0FBQzlFO0FBUUEsU0FBUyxJQUFJLEtBQUssT0FBTyxjQUFjLGdCQUFnQixHQUFHO0FBQ3RELFNBQU8sWUFBWSxhQUFhLENBQUMsVUFBVTtBQUN2QyxVQUFNLElBQUksT0FBTyxHQUFHO0FBQ3BCLFdBQU8saUJBQWlCLE1BQU0sV0FBVztBQUFBLEVBQzdDLENBQUM7QUFDTDs7O0FEeENBLDJCQUFpQztBQUNqQyxJQUFPLGtCQUFRO0FBQUEsRUFDYixNQUFNLGtCQUFrQixRQUFRO0FBQzlCLFFBQUksU0FBUyxNQUFnQixJQUFJLGNBQWMsUUFBUTtBQUN2RCxRQUFJLE9BQU8sVUFBVTtBQUFVLG1CQUFTLDZCQUFPLE1BQU07QUFDckQsVUFBTSxPQUFPLGFBQUFDLFFBQU0sS0FBSyxVQUFVLENBQUMsQ0FBQztBQUVwQyxVQUFNLE9BQU8sTUFBTTtBQUNqQixVQUFJO0FBQ0YsUUFBVSxJQUFJLGNBQWMsY0FBVSwrQkFBUyxFQUFFLEdBQUcsS0FBSyxNQUFNLENBQUMsQ0FBQztBQUFBLE1BQ25FLFFBQUU7QUFDQSxRQUFVLElBQUksY0FBYyxjQUFVLCtCQUFTLENBQUMsQ0FBQyxDQUFDO0FBQUEsTUFDcEQ7QUFBQSxJQUNGO0FBRUEsU0FBSyxHQUFHLGFBQUFBLFFBQU0sT0FBTyxLQUFLLElBQUk7QUFDOUIsU0FBSyxHQUFHLGFBQUFBLFFBQU0sT0FBTyxRQUFRLElBQUk7QUFDakMsU0FBSyxHQUFHLGFBQUFBLFFBQU0sT0FBTyxRQUFRLElBQUk7QUFFakMsV0FBTztBQUFBLEVBQ1Q7QUFDRjs7O0FFZkEsZUFBZSxTQUFTLEtBQUs7QUFDM0IsUUFBTSxVQUFVLE1BQU0sZ0JBQVEsa0JBQWtCLGFBQWEsSUFBSSxNQUFNLE1BQU07QUFDN0UsUUFBTSxNQUFNO0FBQUEsSUFDVixTQUFTO0FBQUEsTUFDUCxXQUFXO0FBQUEsUUFDVCxRQUFRLENBQUM7QUFBQSxRQUNULE1BQU0sQ0FBQztBQUFBLFFBQ1AsUUFBUSxDQUFDO0FBQUEsTUFDWDtBQUFBLE1BQ0EsUUFBUSxNQUFNO0FBQ1osWUFBSSxDQUFDLFlBQUksU0FBUztBQUNoQixjQUFJLElBQUksUUFBUSxVQUFVLEtBQUssSUFBSTtBQUFHLG1CQUFPLElBQUksUUFBUSxVQUFVLEtBQUssSUFBSTtBQUM1RSxjQUFJLElBQUksUUFBUSxLQUFLLEtBQUssT0FBSyxFQUFFLFNBQVMsSUFBSTtBQUFHLG1CQUFPLElBQUksUUFBUSxVQUFVLEtBQUssSUFBSSxJQUFJLGdCQUFRLFFBQVEsSUFBSTtBQUFBLFFBQ2pILE9BQU87QUFDTCxpQkFBTyxnQkFBUSxRQUFRLElBQUk7QUFBQSxRQUM3QjtBQUNBLGVBQU87QUFBQSxNQUNUO0FBQUEsTUFDQSxRQUFRLElBQUksTUFBTSxDQUFDLEdBQUc7QUFBQSxRQUNwQixJQUFJQyxJQUFHQyxPQUFNO0FBQ1gsY0FBSSxDQUFDLFlBQUksU0FBUztBQUNoQixnQkFBSSxJQUFJLFFBQVEsVUFBVSxPQUFPQSxLQUFJO0FBQUcscUJBQU8sSUFBSSxRQUFRLFVBQVUsT0FBT0EsS0FBSTtBQUNoRixnQkFBSSxJQUFJLFFBQVEsT0FBTyxLQUFLLE9BQUssRUFBRSxTQUFTQSxLQUFJO0FBQUcscUJBQU8sSUFBSSxRQUFRLFVBQVUsT0FBT0EsS0FBSSxJQUFJLGdCQUFRLE9BQU9BLEtBQUk7QUFBQSxVQUNwSCxPQUFPO0FBQ0wsbUJBQU8sZ0JBQVEsT0FBT0EsS0FBSTtBQUFBLFVBQzVCO0FBQ0EsaUJBQU87QUFBQSxRQUNUO0FBQUEsTUFDRixDQUFDO0FBQUEsTUFDRCxRQUFRLElBQUksTUFBTSxDQUFDLEdBQUc7QUFBQSxRQUNwQixJQUFJRCxJQUFHQyxPQUFNO0FBQ1gsY0FBSSxJQUFJLFFBQVEsVUFBVSxPQUFPQSxLQUFJO0FBQUcsbUJBQU8sSUFBSSxRQUFRLFVBQVUsT0FBT0EsS0FBSTtBQUNoRixjQUFJLE9BQU8sSUFBSSxRQUFRLE9BQU8sS0FBSyxPQUFLLEVBQUUsU0FBU0EsS0FBSTtBQUN2RCxjQUFJLENBQUM7QUFBTSxtQkFBTztBQUNsQixpQkFBTyxJQUFJLFFBQVEsVUFBVSxPQUFPQSxLQUFJLElBQUksZ0JBQVEsUUFBUSxhQUFhLEtBQUssTUFBTTtBQUFBLFFBQ3RGO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSDtBQUFBLElBQ0E7QUFBQSxJQUNBLFdBQVc7QUFBQSxNQUNULFFBQVEsS0FBSyxNQUFNLEtBQUssVUFBVSxHQUFHLENBQUM7QUFBQSxNQUN0QztBQUFBO0FBQUEsSUFFRjtBQUFBLEVBQ0Y7QUFFQSxTQUFPO0FBQ1Q7QUFFQSxJQUFPLHFCQUFRO0FBQUEsRUFDYjtBQUNGOzs7QUNwREEsY0FBTSxPQUFPLE1BQU0sNEJBQTRCO0FBRS9DLElBQU8sY0FBUTtBQUFBLEVBQ2IsWUFBWTtBQUFBLElBQ1Y7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0EsSUFBSSxVQUFVO0FBQ1osVUFBSSxDQUFDLFlBQUk7QUFBUyxjQUFNLElBQUksTUFBTSw0REFBNEQ7QUFDOUYsYUFBTztBQUFBLElBQ1Q7QUFBQSxJQUNBLElBQUksVUFBVTtBQUNaLFVBQUksQ0FBQyxZQUFJO0FBQVMsY0FBTSxJQUFJLE1BQU0sNERBQTREO0FBQzlGLGFBQU87QUFBQSxJQUNUO0FBQUEsSUFDQSxJQUFJLGFBQWE7QUFDZixVQUFJLENBQUMsWUFBSTtBQUFTLGNBQU0sSUFBSSxNQUFNLCtEQUErRDtBQUNqRyxhQUFPO0FBQUEsSUFDVDtBQUFBLElBQ0EsSUFBSSxXQUFXO0FBQ2IsVUFBSSxDQUFDLFlBQUk7QUFBUyxjQUFNLElBQUksTUFBTSw2REFBNkQ7QUFDL0YsYUFBTztBQUFBLFFBQ0wsU0FBUyxXQUFXLGVBQWUsRUFBRTtBQUFBLFFBQ3JDLGdCQUFnQixXQUFXLGVBQWUsRUFBRTtBQUFBLE1BQzlDO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLGNBQWM7QUFBQSxJQUNaO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBLFVBQVU7QUFBQSxNQUNSLFNBQVMsV0FBVyxlQUFlLEVBQUU7QUFBQSxNQUNyQyxnQkFBZ0IsV0FBVyxlQUFlLEVBQUU7QUFBQSxJQUM5QztBQUFBLEVBQ0Y7QUFDRjs7O0FDNUNBLE9BQU8sZUFBZSxRQUFRLFNBQVM7QUFBQSxFQUNyQyxNQUFNO0FBQ0osV0FBTyxZQUFJO0FBQUEsRUFDYjtBQUNGLENBQUM7QUFDRCxPQUFPLFNBQVM7IiwKICAibmFtZXMiOiBbImV2ZW50IiwgInRhcmdldCIsICJtb2R1bGUiLCAiZGVDeWNsZWQiLCAicmV2aXZlIiwgInZhbCIsICJlcnJvciIsICJjaGVjayIsICJwcm9wIiwgInByb3AiLCAicmVxIiwgImZvdW5kIiwgInJlcSIsICJmaW5kZXIiLCAiY29tbW9uX2RlZmF1bHQiLCAiY29tbW9uX2RlZmF1bHQiLCAiXyIsICJfIiwgInByb3AiLCAibmVzdHMiLCAiXyIsICJwcm9wIl0KfQo=
