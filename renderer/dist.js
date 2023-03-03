(() => {
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
                  "ENTERING",
                  "headerId"
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
          map: {
            ConfirmationModal: [
              ".confirmButtonColor"
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
              "ConfirmationModal"
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
    },
    sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    mapReplace(text, map = {}) {
      return (Array.isArray(map) ? map : Object.entries(map)).reduce((all, current) => all.replaceAll(current[0], current[1]), text);
    },
    escapeRegex(str) {
      return str.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
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
        modules2[moduleId] = (module, exports, require2) => {
          try {
            ogModule.call(null, module, exports, require2);
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
      let name2 = obj?.getName?.();
      if (!name2)
        return;
      if (common[name2])
        return;
      Object.defineProperty(common, name2, {
        get() {
          if (common.__cache__[name2])
            return common.__cache__[name2];
          return common.__cache__[name2] = obj;
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
    localize(str, ...args) {
      if (typeof str === "string")
        return utils_default.format(str, ...args);
      let val = str?.[out.locale] || str?.default || Object.values(str)[0];
      if (!val)
        return null;
      return utils_default.format(val, ...args);
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
        if (typeof node?.querySelectorAll != "function")
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
        if (typeof node?.querySelectorAll != "function")
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
  function propReplacer(css, props = {}) {
    return css.replace(/var\(--acord--([\S\s]+)\)/g, (match, group1) => {
      let splitted = group1.split(",");
      let key = splitted.shift().trim();
      let defaultValue = splitted.join(",").trim();
      return props[key] ?? (defaultValue || match);
    });
  }
  var patcher_default = {
    __cache__: {
      patched: patchedObjects
    },
    before,
    after,
    instead,
    unPatchAll,
    injectCSS(css, customProps = {}) {
      const style = document.createElement("style");
      style.className = `acord--injected-css`;
      style.textContent = propReplacer(css, customProps);
      document.head.appendChild(style);
      return (...args) => {
        if (typeof args[0] === "string") {
          style.textContent = propReplacer(args[0], args[1]);
          css = args[0];
        } else if (typeof args[0] === "object") {
          style.textContent = propReplacer(css, args[0]);
        } else {
          style?.remove();
        }
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
    let out4 = {
      __cache__: {
        localeIds: [],
        localizations: {}
      },
      format(key, ...args) {
        return utils_default.format(out4.get(key), ...args);
      },
      get(key) {
        if (typeof cfg.i18n === "string")
          check2();
        return out4.__cache__.localizations[out4.locale]?.[key] || out4.__cache__.localizations.default?.[key] || out4.get(key);
      },
      messages: new Proxy({}, {
        get(_2, prop) {
          return out4.get(prop);
        }
      })
    };
    async function check2() {
      const locale = i18n_default.locale;
      if (typeof cfg.i18n === "string") {
        const BASE_URL2 = cfg.i18n.endsWith("/") ? cfg.i18n.slice(0, -1) : cfg.i18n;
        if (!out4.__cache__.localeIds.length) {
          try {
            out4.__cache__.localeIds = await (await fetch(`${BASE_URL2}/locales.json`, noStore)).json();
          } catch {
          }
          try {
            out4.__cache__.localizations.default = await (await fetch(`${BASE_URL2}/default.json`, noStore)).json();
          } catch {
          }
        }
        if (out4.__cache__.localeIds.includes(locale) && !out4.__cache__.localizations?.[locale]) {
          try {
            out4.__cache__.localizations[locale] = await (await fetch(`${BASE_URL2}/${locale}.json`, noStore)).json();
          } catch {
          }
          ;
        }
      } else {
        out4.__cache__.localeIds = Object.keys(cfg.i18n);
        out4.__cache__.localizations = cfg.i18n;
      }
    }
    await check2();
    return out4;
  }

  // src/api/extensions/index.js
  var nests2 = __toESM(require_cjs(), 1);
  async function buildAPI(cfg, persistKey) {
    const devMode = dev_default.enabled || cfg?.modules?.mode === "development";
    const persist = await storage_default.createPersistNest(persistKey);
    const out4 = {
      modules: {
        __cache__: {
          common: {},
          node: {},
          custom: {},
          customLazy: {}
        },
        require(name2) {
          if (!devMode) {
            if (typeof out4.modules.__cache__.node[name2] !== "undefined")
              return out4.modules.__cache__.node[name2];
            if (cfg?.modules?.node?.some?.((i) => i.name === name2))
              return out4.modules.__cache__.node[name2] = modules_default.require(name2);
          } else {
            return modules_default.require(name2);
          }
          return null;
        },
        common: new Proxy({}, {
          get(_2, prop) {
            if (!devMode) {
              if (typeof out4.modules.__cache__.common[prop] !== "undefined")
                return out4.modules.__cache__.common[prop];
              if (cfg?.modules?.common?.some?.((i) => i.name === prop))
                return out4.modules.__cache__.common[prop] = modules_default.common[prop];
            } else {
              return modules_default.common[prop];
            }
            return null;
          }
        }),
        custom: new Proxy({}, {
          get(_2, prop) {
            if (typeof out4.modules.__cache__.custom[prop] !== "undefined")
              return out4.modules.__cache__.custom[prop];
            let data = cfg?.modules?.custom?.some?.((i) => i.name === prop);
            if (!data)
              return null;
            if (data.lazy) {
              let prom = new Promise(async (resolve, reject) => {
                let r = await modules_default.webpack.lazyFindByFinder(data.finder);
                out4.modules.__cache__.customLazy[prop] = r;
                resolve(r);
              });
              out4.modules.__cache__.custom[prop] = {
                get() {
                  return prom;
                },
                get value() {
                  return out4.modules.__cache__.customLazy[prop];
                }
              };
            } else {
              let value = modules_default.webpack.findByFinder(data.finder);
              try {
                if (typeof value?.value !== "undefined") {
                  out4.modules.__cache__.custom[prop] = value ? Object.assign(value, { value, get() {
                    return value;
                  } }) : null;
                } else {
                  out4.modules.__cache__.custom[prop] = value;
                }
              } catch {
                out4.modules.__cache__.custom[prop] = value ? { value, get() {
                  return value;
                } } : null;
              }
            }
            return out4.modules.__cache__.custom[prop];
          }
        })
      },
      i18n: i18n_default,
      extension: {
        config: JSON.parse(JSON.stringify(cfg)),
        persist,
        i18n: await buildExtensionI18N(cfg),
        events: new BasicEventEmitter(),
        subscriptions: []
      }
    };
    return out4;
  }
  function showConfirmationModal() {
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
      showConfirmationModal({
        metadata,
        readme,
        config: {
          autoUpdate: true,
          enabled: true,
          order: 0,
          ...defaultConfig
        }
      });
      let sourceResp = await fetch(`${url}/source.js`);
      if (sourceResp.status !== 200)
        throw new Error(`"${url}" extension source is not responded with 200 status code.`);
      let source2 = await sourceResp.text();
      out2.storage.installed.store[url] = {
        metadata,
        source: source2,
        readme,
        config: {
          autoUpdate: true,
          enabled: true,
          order: 0,
          ...defaultConfig
        },
        extra: {
          lastUpdatedAt: Date.now()
        }
      };
      await out2.load(url);
    },
    async update(url) {
      if (!out2.__cache__.initialized)
        await out2.init();
      if (!out2.storage.installed.ghost[url])
        throw new Error(`"${url}" extension is not installed.`);
      if (out2.__cache__.loaded.ghost[url])
        throw new Error(`"${url}" extension is loaded. Please unload it first.`);
      let data = out2.storage.installed.ghost[url];
      let metaResp = await fetch(`${url}/metadata.json`);
      if (metaResp.status !== 200)
        throw new Error(`"${url}" extension metadata is not responded with 200 status code.`);
      let metadata = await metaResp.json();
      if (data.metadata.hash === metadata.hash)
        return false;
      let readmeResp = await fetch(`${url}/readme.md`);
      let readme = readmeResp.status === 200 ? await readmeResp.text() : null;
      let sourceResp = await fetch(`${url}/source.js`);
      if (sourceResp.status !== 200)
        throw new Error(`"${url}" extension source is not responded with 200 status code.`);
      let source2 = await sourceResp.text();
      ut.storage.installed.store[url] = {
        metadata,
        source: source2,
        readme,
        config: data.config,
        extra: {
          lastUpdatedAt: Date.now()
        }
      };
      return true;
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
      let api2 = await out2.buildAPI(data.metadata, `Extension;Persist;${url}`);
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
      let { evaluated, api: api2 } = out2.__cache__.loaded.ghost[url];
      api2.extension.subscriptions.forEach((i) => typeof i === "function" && i());
      api2.extension.events.emit("unload");
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
      return Promise.all(Object.entries(out2.storage.installed.ghost).sort(([, a], [, b]) => b.config.order - a.config.order).map(([url]) => out2.load(url)));
    },
    async unloadAll() {
      if (!out2.__cache__.initialized)
        await out2.init();
      return Promise.all(Object.keys(out2.__cache__.loaded.ghost).map((url) => out2.unload(url)));
    },
    get(url) {
      return {
        loaded: out2.__cache__.loaded.ghost[url],
        installed: out2.storage.installed.ghost[url]
      };
    },
    utils: {}
  };
  var extensions_default = out2;

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

  // src/api/dev/index.js
  var devModeEnabled = false;
  var isLoading = false;
  var loaded;
  var installed;
  var extension = {
    get loaded() {
      return loaded;
    },
    get installed() {
      return installed;
    },
    unload() {
      if (!loaded)
        return false;
      loaded.api.extension.subscriptions.forEach((f) => typeof f === "function" && f());
      loaded.api.extension.events.emit("unload");
      loaded.evaluated?.unload?.();
      loaded = null;
      installed = null;
      return true;
    },
    async load(source2, manifest) {
      if (!source2 || !manifest)
        throw new Error(`Source and manifest are required to load an extension!`);
      if (loaded)
        return false;
      if (isLoading)
        return false;
      isLoading = true;
      try {
        let interact = function(data) {
        };
        let api2 = await extensions_default.buildAPI(manifest, `Extension;Persist;Development`);
        let evaluated = extensions_default.evaluate(source2, api2);
        if (manifest.type === "theme") {
          let css = evaluated();
          let config = manifest.config ?? [];
          config.patcher.injectCSS(css);
        } else {
          evaluated?.load?.();
        }
        loaded = {
          evaluated,
          api: api2,
          interact
        };
        installed = {
          manifest
        };
      } catch (err) {
        logger_default.error(`Unable to load development extension.`, i18n_default.localize(manifest.about.name), err);
        return false;
      }
      isLoading = false;
      return true;
    }
  };
  var out3 = {
    get enabled() {
      return devModeEnabled;
    },
    set enabled(value) {
      if (!globalThis["<PRELOAD_KEY>"].isDevToolsOpen())
        throw new Error("Dev mode status can only be modified when DevTools is open!");
      devModeEnabled = value;
    },
    get extension() {
      if (!devModeEnabled)
        throw new Error("Dev mode is not enabled!");
      return extension;
    }
  };
  var dev_default = out3;
  var isProcessing = false;
  websocket_default.set(
    "UpdateDevelopmentExtension",
    async ({ source: source2, manifest } = {}) => {
      if (!devModeEnabled)
        return logger_default.warn(`Development extension was sent before dev mode was enabled.`);
      if (!source2 || !manifest)
        return logger_default.warn(`Development extension was sent without source or manifest.`);
      if (isProcessing)
        return logger_default.warn(`Development extension was sent while extension was already being processed.`);
      isProcessing = true;
      extension.unload();
      await new Promise((r) => setTimeout(r, 1));
      let success = await extension.load(source2, manifest);
      if (success)
        logger_default.info(`Development extension is loaded!(${i18n_default.localize(manifest.about.name)})`);
      isProcessing = false;
    }
  );

  // src/api/internal/index.js
  var internal_default = {
    process: globalThis["<PRELOAD_KEY>"].process,
    isDevToolsOpen: globalThis["<PRELOAD_KEY>"].isDevToolsOpen
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
        this.contentElement?.appendChild?.(value);
      }
    }
    static getContainer() {
      const appElm = document.querySelector('[class*="notAppAsidePanel-"]');
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
      const out4 = finderMap(ogModule, {
        close: ["CONTEXT_MENU_CLOSE"],
        open: ["renderLazy"]
      });
      isReady = !!out4.close && !!out4.open;
      return out4;
    })();
    Components = await (async () => {
      const out4 = {};
      const componentMap = {
        separator: "Separator",
        checkbox: "CheckboxItem",
        radio: "RadioItem",
        control: "ControlItem",
        groupstart: "Group",
        customitem: "Item"
      };
      try {
        let moduleId;
        while (true) {
          moduleId = Object.entries(webpack_default.require.m).find(([, m]) => m?.toString().includes("menuitemcheckbox"))[0];
          if (moduleId)
            break;
          await new Promise((r) => setTimeout(r, 100));
        }
        const contextMenuModule = webpack_default.find((_2, idx) => idx == moduleId).exports;
        const moduleString = webpack_default.require.m[moduleId].toString();
        const rawMatches = moduleString.matchAll(/if\(\w+\.type===(?:\w+\.)?(\w+)\).+?type:"(.+?)"/gs);
        out4.Menu = Object.values(contextMenuModule).find((v) => v.toString().includes(".isUsingKeyboardNavigation"));
        [...rawMatches].forEach(([, functionName, type]) => {
          let moduleKey = moduleString.match(new RegExp(new RegExp(`(\\w+):\\(\\)\\=\\>${functionName}`)))?.[1];
          out4[componentMap[type]] = contextMenuModule[moduleKey];
        });
        isReady = Object.keys(out4).length > 1;
      } catch (err) {
        isReady = false;
        logger_default.error("Failed to load context menu components", err);
      }
      return out4;
    })();
    MenuPatcher.initialize();
  })();
  var _MenuPatcher = class {
    static initialize() {
      if (!isReady)
        return logger_default.warn("Unable to load context menu.");
      const moduleToPatch = webpack_default.filter((m) => Object.values(m).some((v) => typeof v === "function" && v.toString().includes("CONTEXT_MENU_CLOSE"))).find((m) => m.exports !== window).exports;
      const keyToPatch = Object.keys(moduleToPatch).find((k) => moduleToPatch[k]?.length === 3);
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
      props.color = "danger";
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
      return React.createElement(Components.Group, null, items);
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
        return (props) => React.createElement(Components.Menu, props, buildMenuChildren(setup));
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
      user(userId) {
        if (!UserStore.getUser(userId))
          return false;
        FluxDispatcher.dispatch({ type: "USER_PROFILE_MODAL_OPEN", userId });
        return true;
      },
      alert(title, content, { confirm = null, key = void 0, timeout = 6e4 * 5 } = {}) {
        return this.confirmation(title, content, { confirm, cancel: null, key, timeout });
      }
    },
    close(key) {
      return modals.actions.close(key);
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

  // src/api/ui/vue/components/discord-button/index.js
  var buttonClasses = webpack_default.findByProperties("lowSaturationUnderline", "button", "disabledButtonOverlay");
  var discord_button_default = {
    /** @param {import("vue").App} vueApp */
    load(vueApp) {
      vueApp.component("discord-button", {
        template: `
        <div class="${buttonClasses.button} ${buttonClasses.lookFilled} ${buttonClasses.grow}" :class="\`\${color ? buttonClasses[\`color\${color[0].toUpperCase()}\${color.slice(1).toLowerCase()}\`] : buttonClasses.colorBrand} \${size ? buttonClasses[\`size\${size[0].toUpperCase()}\${size.slice(1).toLowerCase()}\`] : buttonClasses.sizeSmall}\`" @click="onClick">
          <div class="${buttonClasses.contents}">{{value}}</div>
        </div>
      `,
        props: ["value", "size", "color"],
        emits: ["click"],
        data() {
          return {
            buttonClasses
          };
        },
        methods: {
          onClick(e) {
            this.$emit("click", e);
          }
        }
      });
    }
  };

  // src/api/ui/vue/components/discord-check/style.scss
  var style_default2 = `
.acord--discord-check{color:var(--white-700);background-color:currentColor;z-index:0}.acord--discord-check .slider{transition:100ms ease-in-out all;left:-3px}.acord--discord-check.checked{color:var(--green-400)}.acord--discord-check.checked .slider{transition:100ms ease-in-out all;left:12px}`;

  // src/api/ui/vue/components/discord-check/index.js
  patcher_default.injectCSS(style_default2);
  var checkClasses = webpack_default.findByProperties("checked", "container", "slider");
  var discord_check_default = {
    /** @param {import("vue").App} vueApp */
    load(vueApp) {
      vueApp.component("discord-check", {
        template: `
        <div class="${checkClasses.container} default-colors acord--discord-check" 
          :class="{'${checkClasses.checked}': value, 'checked': modelValue}" 
          @click="onClick"
        >
          <svg class="${checkClasses.slider} slider" viewBox="0 0 28 20" preserveAspectRatio="xMinYMid meet">
            <rect fill="white" x="4" y="0" rx="10" width="20" height="20"></rect>
            <svg v-if="modelValue" viewBox="0 0 20 20" fill="none">
              <path fill="currentColor" d="M7.89561 14.8538L6.30462 13.2629L14.3099 5.25755L15.9009 6.84854L7.89561 14.8538Z"></path>
              <path fill="currentColor" d="M4.08643 11.0903L5.67742 9.49929L9.4485 13.2704L7.85751 14.8614L4.08643 11.0903Z"></path>
            </svg>
            <svg v-else viewBox="0 0 20 20" fill="none">
              <path fill="currentColor" d="M5.13231 6.72963L6.7233 5.13864L14.855 13.2704L13.264 14.8614L5.13231 6.72963Z"></path>
              <path fill="currentColor" d="M13.2704 5.13864L14.8614 6.72963L6.72963 14.8614L5.13864 13.2704L13.2704 5.13864Z"></path>
            </svg>
          </svg>
        </div>
      `,
        props: {
          modelValue: {
            default() {
              return false;
            }
          }
        },
        emits: ["update:modelValue", "change"],
        methods: {
          onClick(event) {
            let newValue = !this.modelValue;
            this.$emit("update:modelValue", newValue);
            this.$emit("change", { value: newValue, event });
          }
        }
      });
    }
  };

  // src/api/ui/vue/components/discord-input/index.js
  var inputClasses = webpack_default.findByProperties("inputDefault", "copyInput");
  var inputClasses2 = webpack_default.findByProperties("input", "editable", "disabled", "inputWrapper");
  var discord_input_default = {
    /** @param {import("vue").App} vueApp */
    load(vueApp) {
      vueApp.component("discord-input", {
        template: `
        <div class="${inputClasses2?.input}">
          <div class="${inputClasses?.inputWrapper}">
            <input :type="type ?? 'text'" class="${inputClasses?.inputDefault}" v-bind="value" :placeholder="placeholder" :maxlength="maxlength" :style="style" @change="onChange" />
          </div>
        </div>
      `,
        props: ["value", "placeholder", "type", "maxlength", "style"],
        emits: ["change"],
        methods: {
          onChange(event) {
            this.$emit("change", { event, value: event.target.value });
          }
        }
      });
    }
  };

  // src/api/ui/vue/components/discord-select/style.scss
  var style_default3 = `
.acord--discord-select{position:relative;width:100%}.acord--discord-select>.options{position:absolute;top:100%;width:100%;max-height:286px;overflow-x:hidden;overflow-y:scroll;z-index:1}.acord--discord-select>.options.top-popout{top:auto;bottom:100%}`;

  // src/api/ui/vue/components/discord-select/index.js
  patcher_default.injectCSS(style_default3);
  var selectClasses = webpack_default.findByProperties("select", "searchableSelect", "multiSelectCheck");
  var scrollClasses = webpack_default.findByProperties("managedReactiveScroller", "scrollerBase", "thin");
  var discord_select_default = {
    /** @param {import("vue").App} vueApp */
    load(vueApp) {
      vueApp.component("discord-select", {
        template: `
        <div class="${selectClasses.select} ${selectClasses.lookFilled} acord--discord-select" :class="{'${selectClasses.open}': active}">
          <div class="${selectClasses.value}">{{options.find(i=>i.value === modelValue)?.label}}</div>
          <div class="${selectClasses.icons}">
              <svg v-if="!active" class="icon" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M16.59 8.59003L12 13.17L7.41 8.59003L6 10L12 16L18 10L16.59 8.59003Z"></path></svg>
              <svg v-else class="icon" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M7.41 16.0001L12 11.4201L16.59 16.0001L18 14.5901L12 8.59006L6 14.5901L7.41 16.0001Z"></path></svg>
          </div>
          <div v-if="active" class="options ${selectClasses.popout} ${scrollClasses.scrollerBase} ${scrollClasses.thin}" :class="{'top-popout': popoutPosition === 'top'}">
            <div v-for="option in options" class="option ${selectClasses.option}" @click="onOptionClick($event, option)" :key="option.value" :aria-selected="\`\${modelValue === option.value}\`">
              {{option.label}}
              <svg v-if="modelValue === option.value" class="${selectClasses.selectedIcon}" role="img" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle r="8" cx="12" cy="12" fill="white"></circle><g fill="none" fill-rule="evenodd"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></g></svg>
            </div>
          </div>
        </div>
      `,
        data() {
          return {
            selectClasses,
            active: false
          };
        },
        props: ["options", "modelValue", "popoutPosition"],
        emits: ["update:modelValue", "change"],
        mounted() {
          window.addEventListener("click", this.onClick);
        },
        unmounted() {
          window.removeEventListener("click", this.onClick);
        },
        methods: {
          onOptionClick(event, option) {
            this.$emit("update:modelValue", option.value);
            this.$emit("change", { value: option.value, event });
          },
          onClick(e) {
            if (e.target.classList.contains(selectClasses.select) || e.target.classList.contains(selectClasses.value) || e.target.classList.contains(selectClasses.icons) || e.target.classList.contains(selectClasses.popout) || e.target.classList.contains(selectClasses.option) || e.target.classList.contains("icon")) {
              this.active = !this.active;
              return;
            }
            this.active = false;
          }
        }
      });
    }
  };

  // src/api/ui/vue/components/discord-textarea/style.scss
  var style_default4 = `
.acord--discord-textarea{width:100%}`;

  // src/api/ui/vue/components/discord-textarea/index.js
  patcher_default.injectCSS(style_default4);
  var inputClasses3 = webpack_default.findByProperties("textArea", "maxLength", "characterCount");
  var inputClasses22 = webpack_default.findByProperties("inputWrapper", "inputDefault");
  var scrollClasses2 = webpack_default.findByProperties("scrollbarDefault", "scrollbar", "scrollbarGhost");
  var discord_textarea_default = {
    /** @param {import("vue").App} vueApp */
    load(vueApp) {
      vueApp.component("discord-textarea", {
        template: `
        <div class="${inputClasses22.inputWrapper} acord--discord-textarea">
          <textarea class="${inputClasses22.inputDefault} ${inputClasses3.textArea} ${scrollClasses2.scrollbarDefault}" v-bind="value" :placeholder="placeholder" :maxlength="maxlength" :cols="cols" :rows="rows" :style="style"></textarea>
        </div>
      `,
        props: ["value", "placeholder", "maxlength", "style", "cols", "rows"],
        emits: ["change"],
        methods: {
          onChange(event) {
            this.$emit("change", { event, value: event.target.value });
          }
        }
      });
    }
  };

  // src/api/ui/vue/components/index.js
  var components_default2 = {
    load(vueApp) {
      discord_check_default.load(vueApp);
      discord_textarea_default.load(vueApp);
      discord_select_default.load(vueApp);
      discord_input_default.load(vueApp);
      discord_button_default.load(vueApp);
    }
  };

  // src/api/ui/vue/utils/recompute.js
  function recompute(vm, propName) {
    if (!vm.$__recomputables || !vm.$__recomputables[propName]) {
      return;
    }
    vm.$__recomputables[propName].backdoor++;
  }
  function recomputable(fn, name2) {
    const reactive = Vue.computed({
      backdoor: 0
    });
    return function() {
      if (!this.$__recomputables) {
        this.$__recomputables = {};
      }
      if (!this.$__recomputables[fn.name || name2]) {
        this.$__recomputables[fn.name || name2] = reactive;
      }
      reactive.backdoor;
      return fn.call(this);
    };
  }

  // src/api/ui/vue/index.js
  var vue_default = {
    components: {
      load(vueApp) {
        components_default2.load(vueApp);
      }
    },
    ready: {
      async when() {
        while (!window.Vue) {
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
        return true;
      },
      get is() {
        return !!window.Vue;
      }
    },
    get Vue() {
      return window.Vue;
    },
    utils: {
      computed: {
        recompute,
        recomputable
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
    modals: modals_default,
    toasts: toasts_default,
    vue: vue_default
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
      get dom() {
        if (!dev_default.enabled)
          throw devError("DOM");
        return dom_default;
      },
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
      ui: ui_default,
      dom: dom_default
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

  // src/ui/home/style.scss
  var style_default5 = `
[class*=acord--]{box-sizing:border-box}[class*=acord--] *{box-sizing:border-box}.acord--tabs-content-container{padding:32px 16px;display:flex;align-items:flex-start;justify-content:center;width:100%}.acord--tabs-content-container>.tab{width:100%}.acord--tabs-tab-button.store-tab-button{background-color:var(--status-positive-background);color:var(--status-positive-text)}.acord--tabs-tab-button.store-tab-button.selected{color:var(--text-positive);background-color:var(--background-modifier-selected)}`;

  // src/ui/home/vue/components/pages/home-page/index.js
  var home_page_default = {
    /** @param {import("vue").App} vueApp */
    load(vueApp) {
      vueApp.component(
        "home-page",
        {
          template: `
          <div>
            <div style="width: 300px;">
              <discord-select v-model="value" :options="options" />
            </div>
            <h1>{{ value }}</h1>
            <br />
            <discord-check v-model="checked" />
            <h1>{{ checked }}</h1>
            <discord-check v-model="checked" />
            <h1>{{ checked }}</h1>
          </div>

        `,
          data() {
            return {
              value: "1",
              checked: false,
              options: [
                {
                  value: "1",
                  label: "Option 1"
                },
                {
                  value: "2",
                  label: "Option 2"
                },
                {
                  value: "3",
                  label: "Option 3"
                }
              ]
            };
          }
        }
      );
    }
  };

  // src/ui/home/vue/components/pages/installed-extensions-page/style.scss
  var style_default6 = `
.acord--installed-extensions-page{display:flex;align-items:flex-start;justify-content:center;padding:0 16px}.acord--installed-extensions-page .container{width:100%;max-width:1024px;display:flex;flex-direction:column}.acord--installed-extensions-page .container>.top{display:flex;align-items:center;gap:8px}.acord--installed-extensions-page .container>.top>.search{width:80%}.acord--installed-extensions-page .container>.top>.category{width:20%}`;

  // src/ui/home/vue/components/pages/installed-extensions-page/index.js
  patcher_default.injectCSS(style_default6);
  var installed_extensions_page_default = {
    /** @param {import("vue").App} vueApp */
    load(vueApp) {
      vueApp.component(
        "installed-extensions-page",
        {
          template: `
          <div class="acord--installed-extensions-page">
            <div class="container">
              <div class="top">
                <div class="search">
                  <discord-input v-model="searchText" :placeholder="i18nFormat('SEARCH')" />
                </div>
                <div class="category">
                  <discord-select v-model="searchCategoryText" :options="[{value: 'all', label: i18nFormat('ALL')}, {value: 'plugins', label: i18nFormat('PLUGINS')}, {value: 'themes', label: i18nFormat('THEMES')}]" />
                </div>
              </div>
              <div class="button">
                
              </div>
            </div>
          </div>
        `,
          data() {
            return {
              searchText: "",
              searchCategoryText: "all"
            };
          },
          methods: {
            i18nFormat: i18n_default.format
          }
        }
      );
    }
  };

  // src/ui/home/vue/components/pages/settings-page/index.js
  var settings_page_default = {
    /** @param {import("vue").App} vueApp */
    load(vueApp) {
      vueApp.component(
        "settings-page",
        {
          template: "<div>Settings Page</div>"
        }
      );
    }
  };

  // src/ui/home/vue/components/pages/store-page/index.js
  var store_page_default = {
    /** @param {import("vue").App} vueApp */
    load(vueApp) {
      vueApp.component(
        "store-page",
        {
          template: `
        <div>
          <store-extension-card v-for="extension in extensions" :extension="extension" :key="extension.name.default" />
        </div>
        `,
          data() {
            return {
              extensions: [
                {
                  type: "plugin",
                  url: "",
                  name: {
                    default: "Test Plugin",
                    tr: "Deneme Plugin"
                  },
                  description: {
                    default: "Test Plugin description..",
                    tr: "Deneme Plugin a\xE7\u0131klamas\u0131.."
                  },
                  previews: [
                    {
                      name: "Test Plugin Preview",
                      image: "https://i.imgur.com/TtfjHeP.png"
                    },
                    {
                      name: "Test Plugin Preview 2",
                      image: "https://i.imgur.com/0Z0Z0Z0.png"
                    }
                  ],
                  authors: [
                    {
                      id: "707309693449535599",
                      name: "Armagan#2448",
                      image: "https://i.imgur.com/rSLVd23.png"
                    },
                    {
                      id: "707309693449535599",
                      name: "Armagan#2448",
                      image: "https://i.imgur.com/rSLVd23.png"
                    }
                  ],
                  version: "1.0.0",
                  readme: "### Test Plugin readme..",
                  installed: true
                }
              ]
            };
          }
        }
      );
    }
  };

  // src/ui/home/vue/components/pages/index.js
  var pages_default = {
    /** @param {import("vue").App} vueApp */
    load(vueApp) {
      home_page_default.load(vueApp);
      installed_extensions_page_default.load(vueApp);
      settings_page_default.load(vueApp);
      store_page_default.load(vueApp);
    }
  };

  // src/ui/home/vue/components/components/config/config-button/index.js
  var config_button_default = {
    /** @param {import("vue").App} vueApp */
    load(vueApp) {
      vueApp.component("config-button", {
        props: ["config", "extension"],
        template: `
        <div class="acord--config-button acord--config-item">
          <discord-button @click="onClick" :value="config.value" :size="config.size" :color="config.color" />
        </div>
      `,
        methods: {
          onClick(event) {
            events_default.emit(
              "extension-config-interaction",
              {
                extension: this.extension,
                config: this.config,
                data: {
                  event
                }
              }
            );
          }
        }
      });
    }
  };

  // src/ui/home/vue/components/components/config/config-check/index.js
  var config_check_default = {
    /** @param {import("vue").App} vueApp */
    load(vueApp) {
      vueApp.component("config-check", {
        props: ["config", "extension"],
        template: `
        <div class="acord--config-check acord--config-item">
          <discord-check @change="onChange" v-model="config.value" />
        </div>
      `,
        methods: {
          onChange(data) {
            events_default.emit(
              "extension-config-interaction",
              {
                extension: this.extension,
                config: this.config,
                data
              }
            );
          }
        }
      });
    }
  };

  // src/ui/home/vue/components/components/config/maps.json
  var name = {
    Column: "config-column",
    Row: "config-row",
    Button: "config-button",
    Check: "config-check",
    Input: "config-input",
    Select: "config-select",
    Textarea: "config-textarea",
    Spacer: "config-spacer",
    Paragraph: "config-paragraph",
    Heading: "config-heading"
  };

  // src/ui/home/vue/components/components/config/config-column/index.js
  var config_column_default = {
    /** @param {import("vue").App} vueApp */
    load(vueApp) {
      vueApp.component(
        "config-column",
        {
          props: ["config", "extension"],
          template: `
          <div class="acord--config-column acord--config-item" :class="{
            'horizontal-align-left': config?.horizontalAlign === 'left',
            'horizontal-align-center': config?.horizontalAlign === 'center',
            'horizontal-align-right': config?.horizontalAlign === 'right',
            'justify-space-between': config?.justify === 'space-between',
            'justify-space-around': config?.justify === 'space-around',
            'vertical-align-top': config?.verticalAlign === 'top',
            'vertical-align-center': config?.verticalAlign === 'center',
            'vertical-align-bottom': config?.verticalAlign === 'bottom',
            'horizontal-size-large': config?.horizontalSize === 'large',
            'horizontal-size-medium': config?.horizontalSize === 'medium',
            'horizontal-size-small': config?.horizontalSize === 'small',
            'vertical-size-large': config?.verticalSize === 'large',
            'vertical-size-medium': config?.verticalSize === 'medium',
            'vertical-size-small': config?.verticalSize === 'small'
          }">
            <component v-for="child in config.children" :is="nameMap[child.type]" :key="child.id" :config="child" :extension="extension" />
          </div>
        `,
          data() {
            return {
              nameMap: name
            };
          }
        }
      );
    }
  };

  // src/ui/home/vue/components/components/config/config-input/index.js
  var config_input_default = {
    /** @param {import("vue").App} vueApp */
    load(vueApp) {
      vueApp.component("config-input", {
        props: ["config", "extension"],
        template: `
        <div class="acord--config-input acord--config-item">
          <discord-input @change="onChange" v-model="config.value" :type="config.inputType" :placeholder="config.placeholder" :maxlength="config.maxlength" />
        </div>
      `,
        methods: {
          onChange(data) {
            events_default.emit(
              "extension-config-interaction",
              {
                extension: this.extension,
                config: this.config,
                data
              }
            );
          }
        }
      });
    }
  };

  // src/ui/home/vue/components/components/config/config-row/index.js
  var config_row_default = {
    /** @param {import("vue").App} vueApp */
    load(vueApp) {
      vueApp.component(
        "config-row",
        {
          props: ["config", "extension"],
          template: `
          <div class="acord--config-row acord--config-item" :class="{
            'horizontal-align-left': config?.horizontalAlign === 'left',
            'horizontal-align-center': config?.horizontalAlign === 'center',
            'horizontal-align-right': config?.horizontalAlign === 'right',
            'justify-space-between': config?.justify === 'space-between',
            'justify-space-around': config?.justify === 'space-around',
            'vertical-align-top': config?.verticalAlign === 'top',
            'vertical-align-center': config?.verticalAlign === 'center',
            'vertical-align-bottom': config?.verticalAlign === 'bottom',
            'horizontal-size-large': config?.horizontalSize === 'large',
            'horizontal-size-medium': config?.horizontalSize === 'medium',
            'horizontal-size-small': config?.horizontalSize === 'small',
            'vertical-size-large': config?.verticalSize === 'large',
            'vertical-size-medium': config?.verticalSize === 'medium',
            'vertical-size-small': config?.verticalSize === 'small'
          }">
            <component v-for="child in config.children" :is="nameMap[child.type]" :key="child.id" :config="child" :extension="extension" />
          </div>
        `,
          data() {
            return {
              nameMap: name
            };
          }
        }
      );
    }
  };

  // src/ui/home/vue/components/components/config/config-select/index.js
  var config_select_default = {
    /** @param {import("vue").App} vueApp */
    load(vueApp) {
      vueApp.component("config-select", {
        props: ["config", "extension"],
        template: `
        <div class="acord--config-select acord--config-item">
          <discord-select @change="onChange" v-model="config.value" :options="config.options" />
        </div>
      `,
        methods: {
          onChange(data) {
            events_default.emit(
              "extension-config-interaction",
              {
                extension: this.extension,
                config: this.config,
                data
              }
            );
          }
        }
      });
    }
  };

  // src/ui/home/vue/components/components/config/config-textarea/index.js
  var config_textarea_default = {
    /** @param {import("vue").App} vueApp */
    load(vueApp) {
      vueApp.component("config-textarea", {
        props: ["config", "extension"],
        template: `
        <div class="acord--config-textarea acord--config-item">
          <discord-textarea @change="onChange" v-model="config.value" :type="config.inputType" :placeholder="config.placeholder" :maxlength="config.maxlength" :cols="config.columns" :rows="config.rows" />
        </div>
      `,
        methods: {
          onChange(data) {
            events_default.emit(
              "extension-config-interaction",
              {
                extension: this.extension,
                config: this.config,
                data
              }
            );
          }
        }
      });
    }
  };

  // src/ui/home/vue/components/components/config/style.scss
  var style_default7 = `
.acord--config-item{width:100%;display:flex}.acord--config-row{width:100%;display:flex;flex-direction:row;justify-content:space-between;align-items:center}.acord--config-row.horizontal-align-left{justify-content:flex-start}.acord--config-row.horizontal-align-right{justify-content:flex-end}.acord--config-row.horizontal-align-center{justify-content:center}.acord--config-row.justify-space-between{justify-content:space-between}.acord--config-row.justify-space-around{justify-content:space-around}.acord--config-row.vertical-align-top{align-items:flex-start}.acord--config-row.vertical-align-bottom{align-items:flex-end}.acord--config-row.horizontal-size-large{width:100%}.acord--config-row.horizontal-size-medium{width:50%}.acord--config-row.horizontal-size-small{width:25%}.acord--config-row.vertical-size-large{height:100%}.acord--config-row.vertical-size-medium{height:50%}.acord--config-row.vertical-size-small{height:25%}.acord--config-column{width:100%;display:flex;flex-direction:column;justify-content:space-between;align-items:center}.acord--config-column.horizontal-align-left{justify-content:flex-start}.acord--config-column.horizontal-align-right{justify-content:flex-end}.acord--config-column.horizontal-align-center{justify-content:center}.acord--config-column.justify-space-between{justify-content:space-between}.acord--config-column.justify-space-around{justify-content:space-around}.acord--config-column.vertical-align-top{align-items:flex-start}.acord--config-column.vertical-align-bottom{align-items:flex-end}.acord--config-column.vertical-align-center{align-items:center}.acord--config-column.horizontal-size-large{width:100%}.acord--config-column.horizontal-size-medium{width:50%}.acord--config-column.horizontal-size-small{width:25%}.acord--config-column.vertical-size-large{height:100%}.acord--config-column.vertical-size-medium{height:50%}.acord--config-column.vertical-size-small{height:25%}`;

  // src/ui/home/vue/components/components/config/index.js
  patcher_default.injectCSS(style_default7);
  var config_default = {
    /** @param {import("vue").App} vueApp */
    load(vueApp) {
      config_button_default.load(vueApp);
      config_check_default.load(vueApp);
      config_input_default.load(vueApp);
      config_select_default.load(vueApp);
      config_textarea_default.load(vueApp);
      config_column_default.load(vueApp);
      config_row_default.load(vueApp);
    }
  };

  // src/ui/home/vue/components/components/cards/installed-extension-card/style.scss
  var style_default8 = `
.acord--installed-extension-card{width:100%;background-color:rgba(0,0,0,.1);border-radius:8px;display:flex;flex-direction:column;gap:16px}.acord--installed-extension-card>.top{background-color:rgba(0,0,0,.1);border-radius:8px;width:100%;padding:8px;height:100px}`;

  // src/ui/home/vue/components/components/cards/installed-extension-card/index.js
  patcher_default.injectCSS(style_default8);
  var installed_extension_card_default = {
    /** @param {import("vue").App} vueApp */
    load(vueApp) {
      vueApp.component(
        "installed-extension-card",
        {
          template: `
          <div class="acord--installed-extension-card">
            <div class="top">
              <div class="left">

              </div>
              <div class="right">

              </div>
            </div>
            <div class="bottom">
              
            </div>
          </div>
        `,
          data() {
            return {
              expanded: false,
              url: null
            };
          },
          computed: {
            extension: recomputable(
              function() {
                return extensions_default.get(this.url);
              },
              "extension"
            )
          },
          mounted() {
            recompute(this, "extension");
          }
        }
      );
    }
  };

  // src/ui/home/vue/components/components/cards/store-extension-card/style.scss
  var style_default9 = `
.acord--store-extension-card{width:275px;height:250px;display:flex;flex-direction:column;border-radius:4px;contain:content;background-color:rgba(0,0,0,.1);box-shadow:var(--elevation-medium)}.acord--store-extension-card>.preview{width:100%;height:100px;display:flex;flex-direction:column;justify-content:space-between;align-items:center;background-color:var(--brand-500);background-position:center;background-size:cover}.acord--store-extension-card>.preview>.controls{padding:8px;display:flex;align-items:center;justify-content:space-between;width:100%}.acord--store-extension-card>.preview>.controls .go{background-color:rgba(0,0,0,.5);box-shadow:0px 0px 4px rgba(0,0,0,.5);border-radius:50%;width:24px;height:24px;display:flex;align-items:center;justify-content:center;color:var(--header-primary);font-weight:600;cursor:pointer}.acord--store-extension-card>.preview>.name-container{display:flex;align-items:center;justify-content:center;color:var(--header-primary);padding:8px}.acord--store-extension-card>.preview>.name-container>.name{font-size:14px;background-color:rgba(0,0,0,.5);box-shadow:0px 0px 4px rgba(0,0,0,.5);border-radius:9999px;padding:4px 8px}.acord--store-extension-card>.info-container{display:flex;justify-content:space-between;flex-direction:column;padding:8px;height:150px;width:100%}.acord--store-extension-card>.info-container>.top{display:flex;flex-direction:column;gap:4px;height:100%}.acord--store-extension-card>.info-container>.top>.name-container{display:flex;align-items:center;gap:4px;width:100%}.acord--store-extension-card>.info-container>.top>.name-container>.name{font-size:16px;font-weight:500;color:var(--header-primary)}.acord--store-extension-card>.info-container>.top>.name-container>.version{font-size:12px;font-weight:500;color:var(--header-primary);opacity:.5}.acord--store-extension-card>.info-container>.top>.description{font-size:14px;font-weight:300;color:var(--header-primary);opacity:.75;width:100%}.acord--store-extension-card>.info-container>.bottom{display:flex;align-items:flex-start;justify-content:space-between;height:100%}.acord--store-extension-card>.info-container>.bottom>.left{height:100%;display:flex;flex-direction:column;align-items:flex-start;justify-content:flex-end}.acord--store-extension-card>.info-container>.bottom>.left>.authors{display:flex;flex-direction:column;gap:4px}.acord--store-extension-card>.info-container>.bottom>.left>.authors .author{display:flex;align-items:center;border-radius:9999px;background-color:rgba(0,0,0,.1);cursor:pointer}.acord--store-extension-card>.info-container>.bottom>.left>.authors .author>.image{border-radius:50%;width:18px;height:18px;background-color:var(--brand-500);background-position:center;background-size:cover}.acord--store-extension-card>.info-container>.bottom>.left>.authors .author>.name{font-size:10px;font-weight:400;color:var(--header-primary);opacity:.75;padding:6px}.acord--store-extension-card>.info-container>.bottom>.right{height:100%;display:flex;flex-direction:column;align-items:flex-end;justify-content:flex-end}`;

  // src/ui/home/vue/components/components/cards/store-extension-card/index.js
  patcher_default.injectCSS(style_default9);
  var store_extension_card_default = {
    /** @param {import("vue").App} vueApp */
    load(vueApp) {
      vueApp.component(
        "store-extension-card",
        {
          template: `
          <div class="acord--store-extension-card">
            <div v-if="extension.previews?.length" class="preview" :style="{ backgroundImage: 'url(' + extension.previews[selectedPreview].image + ')' }">
              <div class="controls">
                <div class="go go-back" @click="goBack">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path d="M11.828 12l2.829 2.828-1.414 1.415L9 12l4.243-4.243 1.414 1.415L11.828 12z" fill="currentColor" />
                  </svg>
                </div>
                <div class="go go-forward" @click="goForward">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path d="M12.172 12L9.343 9.172l1.414-1.415L15 12l-4.243 4.243-1.414-1.415z" fill="currentColor" />
                  </svg>
                </div>
              </div>
              <div class="name-container">
                <div class="name">
                  {{ extension.previews[selectedPreview].name }}
                </div>
              </div>
            </div>
            <div v-else class="preview no-preview"></div>
            <div class="info-container">
              <div class="top">
                <div class="name-container">
                  <div class="name">{{ i18nLocalize(extension.name) }}</div>
                  <div class="version">v{{ extension.version }}</div>
                </div>
                <div class="description">{{ i18nLocalize(extension.description) }}</div>
              </div>
              <div class="bottom">
                <div class="left">
                  <div class="authors">
                    <div v-for="author in extension.authors" class="author" :key="author.name" @click="showProfile(author.id)">
                      <div class="image" :style="{ backgroundImage: 'url(' + author.image + ')' }"></div>
                      <div class="name">{{ author.name }}</div>
                    </div>
                  </div>
                </div>
                <div class="right">
                  <div class="buttons">
                    <span @click="installOrUninstall">
                      <discord-button :value="i18nFormat(extension.installed ? 'UNINSTALL' : 'INSTALL')" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `,
          props: ["extension"],
          data() {
            return {
              selectedPreview: 0
            };
          },
          methods: {
            i18nFormat: i18n_default.format,
            i18nLocalize: i18n_default.localize,
            installOrUninstall() {
              if (this.extension.installed) {
              } else {
              }
            },
            goBack() {
              this.selectedPreview--;
              if (this.selectedPreview < 0)
                this.selectedPreview = this.extension.previews.length - 1;
            },
            goForward() {
              this.selectedPreview++;
              if (this.selectedPreview >= this.extension.previews.length)
                this.selectedPreview = 0;
            },
            showProfile(profileId) {
              modals_default.show.user(profileId);
            }
          }
        }
      );
    }
  };

  // src/ui/home/vue/components/components/cards/index.js
  var cards_default = {
    /** @param {import("vue").App} vueApp */
    load(vueApp) {
      store_extension_card_default.load(vueApp);
      installed_extension_card_default.load(vueApp);
    }
  };

  // src/ui/home/vue/components/components/index.js
  var components_default3 = {
    /** @param {import("vue").App} vueApp */
    load(vueApp) {
      config_default.load(vueApp);
      cards_default.load(vueApp);
    }
  };

  // src/ui/home/vue/components/index.js
  var components_default4 = {
    /** @param {import("vue").App} vueApp */
    load(vueApp) {
      components_default3.load(vueApp);
      pages_default.load(vueApp);
    }
  };

  // src/ui/home/index.js
  patcher_default.injectCSS(style_default5);
  {
    let script = document.createElement("script");
    script.src = "https://unpkg.com/vue@3/dist/vue.global.js";
    document.head.appendChild(script);
  }
  dom_default.patch('a[href="/store"][data-list-item-id$="___nitro"]', (elm) => {
    utils_default.ifExists(
      elm.querySelector('[class*="nameAndDecorators-"] [class*="name-"]'),
      (nameElm) => {
        nameElm.textContent = i18n_default.format("APP_NAME");
      }
    );
    utils_default.ifExists(
      elm.querySelector('[class*="premiumTrialAcknowledgedBadge-"]'),
      (nitroElm) => {
        nitroElm.remove();
      }
    );
    utils_default.ifExists(
      elm.querySelector('[class*="avatarWithText-"] [class*="avatar-"] svg'),
      fillSVGElmWithAcordLogo
    );
  });
  var internalVueApp = null;
  var headerItemClasses = webpack_default.findByProperties("divider", "hamburger", "themed");
  var tabBarClasses = webpack_default.findByProperties("tabBar", "maxWidthWithToolbar");
  var headerClasses = webpack_default.findByProperties("topPill", "headerText");
  dom_default.patch('[class*="applicationStore-"] [class*="homeWrapperNormal-"]', (elm) => {
    utils_default.ifExists(
      elm.querySelector('[class*="headerBar-"] [class*="titleWrapper-"] [class*="title-"]'),
      (titleElm) => {
        titleElm.textContent = i18n_default.format("APP_NAME");
        if (internalVueApp) {
          let buildButton = function(id, text, customClasses = "") {
            let elm2 = dom_default.parse(`<div id="tab-button-${id}" class="acord--tabs-tab-button ${customClasses} ${tabBarClasses.item} ${headerClasses.item} ${headerClasses.themed}">${text}</div>`);
            buttons.push(elm2);
            elm2.setSelected = (s) => {
              if (s)
                elm2.classList.add(headerClasses.selected, "selected");
              else
                elm2.classList.remove(headerClasses.selected, "selected");
            };
            elm2.setSelected(internalVueApp.selectedTab === id);
            elm2.onclick = () => {
              buttons.forEach((b) => b.setSelected(false));
              elm2.setSelected(true);
              internalVueApp.selectedTab = id;
            };
            return elm2;
          };
          let container = dom_default.parents(titleElm, 2).pop();
          container.appendChild(
            dom_default.parse(`<div class="${headerItemClasses.divider}"></div>`)
          );
          const buttonsContainer = dom_default.parse(`
          <div class="${tabBarClasses.tabBar} ${headerClasses.topPill}">
          </div>
        `);
          let buttons = [];
          buttonsContainer.appendChild(buildButton("home", i18n_default.format("HOME")));
          buttonsContainer.appendChild(buildButton("installed-extensions", i18n_default.format("INSTALLED_EXTENSIONS")));
          buttonsContainer.appendChild(buildButton("settings", i18n_default.format("SETTINGS")));
          buttonsContainer.appendChild(buildButton("store", i18n_default.format("EXTENSION_STORE"), "store-tab-button"));
          container.appendChild(buttonsContainer);
        }
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
  (async () => {
    await ui_default.vue.ready.when();
    const baseVueElm = dom_default.parse(`
    <div class="acord--tabs-content-container">
      <div class="tab">
        <keep-alive>
          <component :is="\`\${selectedTab}-page\`" />
        </keep-alive>
      </div>
    </div>
  `);
    const vueApp = Vue.createApp({
      data() {
        return {
          selectedTab: "home"
        };
      },
      mounted() {
        internalVueApp = this;
      }
    });
    ui_default.vue.components.load(vueApp);
    components_default4.load(vueApp);
    vueApp.mount(baseVueElm);
    dom_default.patch('[class*="applicationStore-"] [class*="scrollerBase-"] [class*="subscriptionsRedirectContainer-"], [class*="applicationStore-"] [class*="scrollerBase-"] [class*="trialOfferWrapper-"], [class*="applicationStore-"] [class*="scrollerBase-"] [class*="premiumCards-"]', (elm) => {
      let containerElm = dom_default.parents(elm, 4).pop();
      containerElm.replaceChildren(baseVueElm);
    });
  })();

  // src/ui/other/index.js
  (async () => {
    let svgElm;
    while (true) {
      svgElm = document.querySelector('[class*="wordmark-"] svg');
      if (svgElm)
        break;
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    svgElm.innerHTML = `<path d="M6.864 10L6.432 8.956H3.048L2.544 10H0.108L3.948 1.564H6.048L9.72 10H6.864ZM4.74 4.78L3.912 6.796H5.58L4.74 4.78ZM15.5045 6.328C15.3445 6.224 15.1925 6.132 15.0485 6.052C14.9045 5.964 14.7565 5.892 14.6045 5.836C14.4525 5.772 14.2925 5.724 14.1245 5.692C13.9645 5.66 13.7845 5.644 13.5845 5.644C13.3125 5.644 13.0805 5.68 12.8885 5.752C12.7045 5.824 12.5565 5.92 12.4445 6.04C12.3325 6.16 12.2485 6.296 12.1925 6.448C12.1445 6.6 12.1205 6.752 12.1205 6.904C12.1205 7.048 12.1525 7.192 12.2165 7.336C12.2805 7.472 12.3725 7.592 12.4925 7.696C12.6205 7.8 12.7725 7.884 12.9485 7.948C13.1245 8.012 13.3285 8.044 13.5605 8.044C13.7285 8.044 13.8845 8.028 14.0285 7.996C14.1805 7.964 14.3285 7.916 14.4725 7.852C14.6245 7.788 14.7805 7.712 14.9405 7.624C15.1085 7.528 15.2965 7.42 15.5045 7.3L16.1285 9.052C15.7685 9.356 15.3445 9.616 14.8565 9.832C14.3685 10.04 13.8405 10.144 13.2725 10.144C12.7365 10.144 12.2485 10.08 11.8085 9.952C11.3765 9.816 11.0045 9.616 10.6925 9.352C10.3885 9.08 10.1525 8.744 9.98447 8.344C9.81647 7.936 9.73247 7.46 9.73247 6.916C9.73247 6.356 9.82447 5.872 10.0085 5.464C10.2005 5.056 10.4565 4.72 10.7765 4.456C11.1045 4.184 11.4885 3.984 11.9285 3.856C12.3685 3.72 12.8405 3.652 13.3445 3.652C14.3205 3.652 15.1845 3.944 15.9365 4.528L15.5045 6.328ZM23.3919 6.856C23.3919 7.432 23.3119 7.928 23.1519 8.344C22.9919 8.76 22.7599 9.104 22.4559 9.376C22.1599 9.64 21.7999 9.836 21.3759 9.964C20.9599 10.084 20.4959 10.144 19.9839 10.144C19.4879 10.144 19.0319 10.08 18.6159 9.952C18.1999 9.816 17.8399 9.612 17.5359 9.34C17.2319 9.068 16.9919 8.728 16.8159 8.32C16.6479 7.904 16.5639 7.416 16.5639 6.856C16.5639 6.272 16.6479 5.772 16.8159 5.356C16.9919 4.94 17.2319 4.6 17.5359 4.336C17.8399 4.072 18.1999 3.88 18.6159 3.76C19.0319 3.64 19.4879 3.58 19.9839 3.58C20.4959 3.58 20.9599 3.648 21.3759 3.784C21.7999 3.912 22.1599 4.112 22.4559 4.384C22.7599 4.648 22.9919 4.988 23.1519 5.404C23.3119 5.812 23.3919 6.296 23.3919 6.856ZM21.1359 6.844C21.1359 6.524 21.0319 6.256 20.8239 6.04C20.6239 5.824 20.3439 5.716 19.9839 5.716C19.6239 5.716 19.3439 5.824 19.1439 6.04C18.9519 6.248 18.8559 6.516 18.8559 6.844C18.8559 7.148 18.9519 7.416 19.1439 7.648C19.3439 7.872 19.6239 7.984 19.9839 7.984C20.3439 7.984 20.6239 7.872 20.8239 7.648C21.0319 7.424 21.1359 7.156 21.1359 6.844ZM28.6948 6.58L28.4788 6.592C28.4708 6.408 28.3908 6.26 28.2388 6.148C28.0868 6.036 27.9228 5.98 27.7468 5.98C27.5868 5.98 27.4068 6.028 27.2068 6.124C27.0148 6.212 26.8428 6.348 26.6908 6.532V10H24.3148V3.784H26.6908V4.396C26.8828 4.212 27.1028 4.04 27.3508 3.88C27.6068 3.72 27.9108 3.64 28.2628 3.64C28.3188 3.64 28.3868 3.644 28.4668 3.652C28.5468 3.66 28.6268 3.672 28.7068 3.688C28.7868 3.704 28.8628 3.728 28.9348 3.76C29.0068 3.784 29.0628 3.816 29.1028 3.856L28.6948 6.58ZM34.3929 10V9.556C34.3209 9.628 34.2209 9.696 34.0929 9.76C33.9649 9.824 33.8249 9.884 33.6729 9.94C33.5209 9.996 33.3689 10.04 33.2169 10.072C33.0729 10.104 32.9449 10.12 32.8329 10.12C32.4249 10.12 32.0329 10.056 31.6569 9.928C31.2809 9.792 30.9489 9.592 30.6609 9.328C30.3809 9.056 30.1569 8.724 29.9889 8.332C29.8209 7.932 29.7369 7.468 29.7369 6.94C29.7369 6.38 29.8169 5.896 29.9769 5.488C30.1449 5.08 30.3689 4.74 30.6489 4.468C30.9369 4.196 31.2729 3.996 31.6569 3.868C32.0409 3.732 32.4489 3.664 32.8809 3.664C32.9689 3.664 33.0809 3.676 33.2169 3.7C33.3609 3.716 33.5049 3.744 33.6489 3.784C33.7929 3.816 33.9289 3.86 34.0569 3.916C34.1929 3.972 34.2969 4.032 34.3689 4.096V0.856H36.7089V10H34.3929ZM34.3689 6.064C34.3049 6.016 34.2249 5.972 34.1289 5.932C34.0329 5.892 33.9329 5.86 33.8289 5.836C33.7249 5.804 33.6209 5.78 33.5169 5.764C33.4129 5.748 33.3209 5.74 33.2409 5.74C33.0809 5.74 32.9249 5.768 32.7729 5.824C32.6289 5.88 32.5009 5.96 32.3889 6.064C32.2769 6.16 32.1889 6.276 32.1249 6.412C32.0609 6.548 32.0289 6.692 32.0289 6.844C32.0289 7.004 32.0609 7.152 32.1249 7.288C32.1889 7.424 32.2769 7.544 32.3889 7.648C32.5009 7.744 32.6289 7.824 32.7729 7.888C32.9249 7.944 33.0809 7.972 33.2409 7.972C33.3209 7.972 33.4129 7.96 33.5169 7.936C33.6209 7.912 33.7249 7.884 33.8289 7.852C33.9329 7.812 34.0329 7.768 34.1289 7.72C34.2249 7.664 34.3049 7.608 34.3689 7.552V6.064Z" fill="currentColor" />`;
    svgElm.setAttribute("viewBox", "0 0 55 11");
  })();

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
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibm9kZV9tb2R1bGVzL25lc3RzL2Nqcy9FdmVudHMuanMiLCAibm9kZV9tb2R1bGVzL25lc3RzL2Nqcy9FdmVudEVtaXR0ZXIuanMiLCAibm9kZV9tb2R1bGVzL25lc3RzL2Nqcy9tYWtlLmpzIiwgIm5vZGVfbW9kdWxlcy9uZXN0cy9janMvaW5kZXguanMiLCAic3JjL2RhdGEvY29tbW9uLmpzb24iLCAic3JjL2FwaS91dGlscy9yYXcvZmluZC1pbi10cmVlLmpzIiwgInNyYy9hcGkvdXRpbHMvbG9nZ2VyLmpzIiwgInNyYy9hcGkvdXRpbHMvcmVhY3QuanMiLCAic3JjL2FwaS91dGlscy9pbmRleC5qcyIsICJzcmMvYXBpL21vZHVsZXMvcmF3L2NvbXBsZXgtZmluZGVyLmpzIiwgInNyYy9hcGkvbW9kdWxlcy93ZWJwYWNrLmpzIiwgInNyYy9hcGkvbW9kdWxlcy9jb21tb24uanMiLCAic3JjL2FwaS9tb2R1bGVzL2luZGV4LmpzIiwgInNyYy9hcGkvaTE4bi9pbmRleC5qcyIsICJzcmMvb3RoZXIvdXRpbHMuanMiLCAic3JjL2xpYi9CYXNpY0V2ZW50RW1pdHRlci5qcyIsICJzcmMvYXBpL2V2ZW50cy9pbmRleC5qcyIsICJzcmMvYXBpL2RvbS9pbmRleC5qcyIsICJzcmMvbGliL3NwaXRyb2FzdC9kaXN0L2VzbS9zaGFyZWQuanMiLCAic3JjL2xpYi9zcGl0cm9hc3QvZGlzdC9lc20vaG9vay5qcyIsICJzcmMvbGliL3NwaXRyb2FzdC9kaXN0L2VzbS91bi1wYXRjaC5qcyIsICJzcmMvbGliL3NwaXRyb2FzdC9kaXN0L2VzbS9nZXQtcGF0Y2gtZnVuYy5qcyIsICJzcmMvbGliL3NwaXRyb2FzdC9kaXN0L2VzbS9pbmRleC5qcyIsICJzcmMvYXBpL3BhdGNoZXIvaW5kZXguanMiLCAic3JjL290aGVyL2xvYWRpbmctYW5pbWF0aW9uL3N0eWxlLnNjc3MiLCAic3JjL290aGVyL2xvYWRpbmctYW5pbWF0aW9uL2luZGV4LmpzIiwgInNyYy9hcGkvc3RvcmFnZS9pbmRleC5qcyIsICJub2RlX21vZHVsZXMvaWRiLWtleXZhbC9kaXN0L2luZGV4LmpzIiwgInNyYy9saWIvanNvbi1kZWN5Y2xlZC9pbmRleC5qcyIsICJzcmMvYXBpL2V4dGVuc2lvbnMvaTE4bi5qcyIsICJzcmMvYXBpL2V4dGVuc2lvbnMvaW5kZXguanMiLCAic3JjL2FwaS93ZWJzb2NrZXQvaW5kZXguanMiLCAic3JjL2FwaS9kZXYvaW5kZXguanMiLCAic3JjL2FwaS9pbnRlcm5hbC9pbmRleC5qcyIsICJzcmMvYXBpL3VpL3N0eWxlcy5zY3NzIiwgInNyYy9hcGkvdWkvdG9vbHRpcHMuanMiLCAic3JjL2FwaS91aS9ub3RpZmljYXRpb25zLmpzIiwgInNyYy9hcGkvdWkvY29udGV4dE1lbnVzLmpzIiwgInNyYy9saWIvY29tcG9uZW50cy9FcnJvckJvdW5kYXJ5LmpzeCIsICJzcmMvYXBpL3VpL2NvbXBvbmVudHMuanMiLCAic3JjL2FwaS91aS9tb2RhbHMuanN4IiwgInNyYy9hcGkvdWkvdG9hc3RzLmpzIiwgInNyYy9hcGkvdWkvdnVlL2NvbXBvbmVudHMvZGlzY29yZC1idXR0b24vaW5kZXguanMiLCAic3JjL2FwaS91aS92dWUvY29tcG9uZW50cy9kaXNjb3JkLWNoZWNrL3N0eWxlLnNjc3MiLCAic3JjL2FwaS91aS92dWUvY29tcG9uZW50cy9kaXNjb3JkLWNoZWNrL2luZGV4LmpzIiwgInNyYy9hcGkvdWkvdnVlL2NvbXBvbmVudHMvZGlzY29yZC1pbnB1dC9pbmRleC5qcyIsICJzcmMvYXBpL3VpL3Z1ZS9jb21wb25lbnRzL2Rpc2NvcmQtc2VsZWN0L3N0eWxlLnNjc3MiLCAic3JjL2FwaS91aS92dWUvY29tcG9uZW50cy9kaXNjb3JkLXNlbGVjdC9pbmRleC5qcyIsICJzcmMvYXBpL3VpL3Z1ZS9jb21wb25lbnRzL2Rpc2NvcmQtdGV4dGFyZWEvc3R5bGUuc2NzcyIsICJzcmMvYXBpL3VpL3Z1ZS9jb21wb25lbnRzL2Rpc2NvcmQtdGV4dGFyZWEvaW5kZXguanMiLCAic3JjL2FwaS91aS92dWUvY29tcG9uZW50cy9pbmRleC5qcyIsICJzcmMvYXBpL3VpL3Z1ZS91dGlscy9yZWNvbXB1dGUuanMiLCAic3JjL2FwaS91aS92dWUvaW5kZXguanMiLCAic3JjL2FwaS91aS9pbmRleC5qcyIsICJzcmMvYXBpL2luZGV4LmpzIiwgInNyYy9vdGhlci93ZWJzb2NrZXQtdHJpZ2dlcnMuanMiLCAic3JjL3VpL2hvbWUvc3R5bGUuc2NzcyIsICJzcmMvdWkvaG9tZS92dWUvY29tcG9uZW50cy9wYWdlcy9ob21lLXBhZ2UvaW5kZXguanMiLCAic3JjL3VpL2hvbWUvdnVlL2NvbXBvbmVudHMvcGFnZXMvaW5zdGFsbGVkLWV4dGVuc2lvbnMtcGFnZS9zdHlsZS5zY3NzIiwgInNyYy91aS9ob21lL3Z1ZS9jb21wb25lbnRzL3BhZ2VzL2luc3RhbGxlZC1leHRlbnNpb25zLXBhZ2UvaW5kZXguanMiLCAic3JjL3VpL2hvbWUvdnVlL2NvbXBvbmVudHMvcGFnZXMvc2V0dGluZ3MtcGFnZS9pbmRleC5qcyIsICJzcmMvdWkvaG9tZS92dWUvY29tcG9uZW50cy9wYWdlcy9zdG9yZS1wYWdlL2luZGV4LmpzIiwgInNyYy91aS9ob21lL3Z1ZS9jb21wb25lbnRzL3BhZ2VzL2luZGV4LmpzIiwgInNyYy91aS9ob21lL3Z1ZS9jb21wb25lbnRzL2NvbXBvbmVudHMvY29uZmlnL2NvbmZpZy1idXR0b24vaW5kZXguanMiLCAic3JjL3VpL2hvbWUvdnVlL2NvbXBvbmVudHMvY29tcG9uZW50cy9jb25maWcvY29uZmlnLWNoZWNrL2luZGV4LmpzIiwgInNyYy91aS9ob21lL3Z1ZS9jb21wb25lbnRzL2NvbXBvbmVudHMvY29uZmlnL21hcHMuanNvbiIsICJzcmMvdWkvaG9tZS92dWUvY29tcG9uZW50cy9jb21wb25lbnRzL2NvbmZpZy9jb25maWctY29sdW1uL2luZGV4LmpzIiwgInNyYy91aS9ob21lL3Z1ZS9jb21wb25lbnRzL2NvbXBvbmVudHMvY29uZmlnL2NvbmZpZy1pbnB1dC9pbmRleC5qcyIsICJzcmMvdWkvaG9tZS92dWUvY29tcG9uZW50cy9jb21wb25lbnRzL2NvbmZpZy9jb25maWctcm93L2luZGV4LmpzIiwgInNyYy91aS9ob21lL3Z1ZS9jb21wb25lbnRzL2NvbXBvbmVudHMvY29uZmlnL2NvbmZpZy1zZWxlY3QvaW5kZXguanMiLCAic3JjL3VpL2hvbWUvdnVlL2NvbXBvbmVudHMvY29tcG9uZW50cy9jb25maWcvY29uZmlnLXRleHRhcmVhL2luZGV4LmpzIiwgInNyYy91aS9ob21lL3Z1ZS9jb21wb25lbnRzL2NvbXBvbmVudHMvY29uZmlnL3N0eWxlLnNjc3MiLCAic3JjL3VpL2hvbWUvdnVlL2NvbXBvbmVudHMvY29tcG9uZW50cy9jb25maWcvaW5kZXguanMiLCAic3JjL3VpL2hvbWUvdnVlL2NvbXBvbmVudHMvY29tcG9uZW50cy9jYXJkcy9pbnN0YWxsZWQtZXh0ZW5zaW9uLWNhcmQvc3R5bGUuc2NzcyIsICJzcmMvdWkvaG9tZS92dWUvY29tcG9uZW50cy9jb21wb25lbnRzL2NhcmRzL2luc3RhbGxlZC1leHRlbnNpb24tY2FyZC9pbmRleC5qcyIsICJzcmMvdWkvaG9tZS92dWUvY29tcG9uZW50cy9jb21wb25lbnRzL2NhcmRzL3N0b3JlLWV4dGVuc2lvbi1jYXJkL3N0eWxlLnNjc3MiLCAic3JjL3VpL2hvbWUvdnVlL2NvbXBvbmVudHMvY29tcG9uZW50cy9jYXJkcy9zdG9yZS1leHRlbnNpb24tY2FyZC9pbmRleC5qcyIsICJzcmMvdWkvaG9tZS92dWUvY29tcG9uZW50cy9jb21wb25lbnRzL2NhcmRzL2luZGV4LmpzIiwgInNyYy91aS9ob21lL3Z1ZS9jb21wb25lbnRzL2NvbXBvbmVudHMvaW5kZXguanMiLCAic3JjL3VpL2hvbWUvdnVlL2NvbXBvbmVudHMvaW5kZXguanMiLCAic3JjL3VpL2hvbWUvaW5kZXguanMiLCAic3JjL3VpL290aGVyL2luZGV4LmpzIiwgInNyYy9pbmRleC5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5kZWZhdWx0ID0gT2JqZWN0LmZyZWV6ZSh7XHJcbiAgICBHRVQ6IFwiR0VUXCIsXHJcbiAgICBTRVQ6IFwiU0VUXCIsXHJcbiAgICBERUxFVEU6IFwiREVMRVRFXCIsXHJcbiAgICBVUERBVEU6IFwiVVBEQVRFXCIsXHJcbn0pO1xyXG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgRXZlbnRzXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vRXZlbnRzXCIpKTtcclxuY2xhc3MgRXZlbnRFbWl0dGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMubGlzdGVuZXJzID0gT2JqZWN0LnZhbHVlcyhFdmVudHNfMS5kZWZhdWx0KS5yZWR1Y2UoKGFjYywgdmFsKSA9PiAoKGFjY1t2YWxdID0gbmV3IFNldCgpKSwgYWNjKSwge30pO1xyXG4gICAgICAgIHRoaXMub24gPSBmdW5jdGlvbiAoZXZlbnQsIGxpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxpc3RlbmVyc1tldmVudF0uaGFzKGxpc3RlbmVyKSkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoYFRoaXMgbGlzdGVuZXIgb24gJHtldmVudH0gYWxyZWFkeSBleGlzdHMuYCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5saXN0ZW5lcnNbZXZlbnRdLmFkZChsaXN0ZW5lcik7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLm9uY2UgPSBmdW5jdGlvbiAoZXZlbnQsIGxpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG9uY2VMaXN0ZW5lciA9IChldmVudCwgZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vZmYoZXZlbnQsIG9uY2VMaXN0ZW5lcik7XHJcbiAgICAgICAgICAgICAgICBsaXN0ZW5lcihldmVudCwgZGF0YSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMub24oZXZlbnQsIG9uY2VMaXN0ZW5lcik7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLm9mZiA9IGZ1bmN0aW9uIChldmVudCwgbGlzdGVuZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5saXN0ZW5lcnNbZXZlbnRdLmRlbGV0ZShsaXN0ZW5lcik7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmVtaXQgPSBmdW5jdGlvbiAoZXZlbnQsIGRhdGEpIHtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBsaXN0ZW5lciBvZiB0aGlzLmxpc3RlbmVyc1tldmVudF0pIHtcclxuICAgICAgICAgICAgICAgIGxpc3RlbmVyKGV2ZW50LCBkYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgZm9yIChjb25zdCBldmVudCBvZiBPYmplY3QudmFsdWVzKEV2ZW50c18xLmRlZmF1bHQpKSB7XHJcbiAgICAgICAgICAgIHRoaXNbZXZlbnQudG9Mb3dlckNhc2UoKV0gPSAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KGV2ZW50LCBkYXRhKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5kZWZhdWx0ID0gRXZlbnRFbWl0dGVyO1xyXG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgRXZlbnRFbWl0dGVyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vRXZlbnRFbWl0dGVyXCIpKTtcclxuZnVuY3Rpb24gbWFrZShcclxuLy8gVGhpcyBjYW4gYmUgc2FmZWx5IGlnbm9yZWQsIHRoZSBEYXRhIHdpbGwgYWx3YXlzIGJlIGFuIG9iamVjdCBvciBpdCB3b24ndCB3b3JrIGFueXdheS5cclxuLy8gQHRzLWlnbm9yZVxyXG5kYXRhID0ge30sIHsgbmVzdEFycmF5cyA9IHRydWUsIH0gPSB7fSkge1xyXG4gICAgY29uc3QgZW1pdHRlciA9IG5ldyBFdmVudEVtaXR0ZXJfMS5kZWZhdWx0KCk7XHJcbiAgICBmdW5jdGlvbiBjcmVhdGVQcm94eSh0YXJnZXQsIHJvb3QsIHBhdGgpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb3h5KHRhcmdldCwge1xyXG4gICAgICAgICAgICBnZXQodGFyZ2V0LCBwcm9wZXJ0eSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbmV3UGF0aCA9IFsuLi5wYXRoLCBwcm9wZXJ0eV07XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHRhcmdldFtwcm9wZXJ0eV07XHJcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVtaXR0ZXIuZ2V0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogbmV3UGF0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUsXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFuZXN0QXJyYXlzICYmIEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY3JlYXRlUHJveHkodmFsdWUsIHJvb3QsIG5ld1BhdGgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY3JlYXRlUHJveHkoKHRhcmdldFtwcm9wZXJ0eV0gPSB7fSksIHJvb3QsIG5ld1BhdGgpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQodGFyZ2V0LCBwcm9wZXJ0eSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHRhcmdldFtwcm9wZXJ0eV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIGVtaXR0ZXIuc2V0KHtcclxuICAgICAgICAgICAgICAgICAgICBwYXRoOiBbLi4ucGF0aCwgcHJvcGVydHldLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvLyBUaGlzIG5lZWRzIHRvIHJldHVybiB0cnVlIG9yIGl0IGVycm9ycy4gL3NocnVnXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGVsZXRlUHJvcGVydHkodGFyZ2V0LCBwcm9wZXJ0eSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRlbGV0ZSB0YXJnZXRbcHJvcGVydHldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZW1pdHRlci5kZWxldGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRoOiBbLi4ucGF0aCwgcHJvcGVydHldLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBoYXModGFyZ2V0LCBwcm9wZXJ0eSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0YXJnZXRbcHJvcGVydHldID09PSBcIm9iamVjdFwiICYmXHJcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmtleXModGFyZ2V0W3Byb3BlcnR5XSkubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb3BlcnR5IGluIHRhcmdldDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHsgc3RvcmU6IGNyZWF0ZVByb3h5KGRhdGEsIGRhdGEsIFtdKSwgXHJcbiAgICAgICAgLy8gVGhpcyBjYW4gYmUgc2FmZWx5IGlnbm9yZWQsIHRoZSBEYXRhIHdpbGwgYWx3YXlzIGJlIGFuIG9iamVjdCBvciBpdCB3b24ndCB3b3JrIGFueXdheS5cclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgZ2hvc3Q6IGRhdGEgfSwgZW1pdHRlcik7XHJcbn1cclxuZXhwb3J0cy5kZWZhdWx0ID0gbWFrZTtcclxuIiwgIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMubWFrZSA9IGV4cG9ydHMuRXZlbnRzID0gdm9pZCAwO1xyXG52YXIgRXZlbnRzXzEgPSByZXF1aXJlKFwiLi9FdmVudHNcIik7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkV2ZW50c1wiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gX19pbXBvcnREZWZhdWx0KEV2ZW50c18xKS5kZWZhdWx0OyB9IH0pO1xyXG52YXIgbWFrZV8xID0gcmVxdWlyZShcIi4vbWFrZVwiKTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwibWFrZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gX19pbXBvcnREZWZhdWx0KG1ha2VfMSkuZGVmYXVsdDsgfSB9KTtcclxuIiwgIntcclxuICBcImNvbW1vblwiOiB7XHJcbiAgICBcIm1vZGFsc1wiOiB7XHJcbiAgICAgIFwiY29tcG9uZW50c1wiOiB7XHJcbiAgICAgICAgXCJvdGhlclwiOiB7XHJcbiAgICAgICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICBcIkhlYWRlclwiLFxyXG4gICAgICAgICAgICAgICAgXCJGb290ZXJcIlxyXG4gICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIlJvb3RcIjoge1xyXG4gICAgICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICAgICAgXCJpblwiOiBcInN0cmluZ3NcIixcclxuICAgICAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgXCJFTlRFUklOR1wiLFxyXG4gICAgICAgICAgICAgICAgXCJoZWFkZXJJZFwiXHJcbiAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIFwiYWN0aW9uc1wiOiB7XHJcbiAgICAgICAgXCJvcGVuXCI6IHtcclxuICAgICAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgICAgIFwiaW5cIjogXCJzdHJpbmdzXCIsXHJcbiAgICAgICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgIFwib25DbG9zZUNhbGxiYWNrXCIsXHJcbiAgICAgICAgICAgICAgICBcIkxheWVyXCJcclxuICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgICAgICBcImJlZm9yZVwiOiBbXHJcbiAgICAgICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgICAgIFwib3BlblwiXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBcIm1hcFwiOiB7XHJcbiAgICAgICAgICAgIFwib3BlblwiOiBbXHJcbiAgICAgICAgICAgICAgXCJvbkNsb3NlQ2FsbGJhY2tcIixcclxuICAgICAgICAgICAgICBcIkxheWVyXCJcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJjbG9zZVwiOiB7XHJcbiAgICAgICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgICAgICBcImluXCI6IFwic3RyaW5nc1wiLFxyXG4gICAgICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICBcIm9uQ2xvc2VDYWxsYmFjaygpXCJcclxuICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgICAgICBcImJlZm9yZVwiOiBbXHJcbiAgICAgICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgICAgIFwiY2xvc2VcIlxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgXCJtYXBcIjoge1xyXG4gICAgICAgICAgICBcImNsb3NlXCI6IFtcclxuICAgICAgICAgICAgICBcIm9uQ2xvc2VDYWxsYmFjaygpXCJcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiY29tcG9uZW50c1wiOiB7XHJcbiAgICAgIFwiQnV0dG9uXCI6IHtcclxuICAgICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICBcIkJvcmRlckNvbG9yc1wiXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgICBcImJlZm9yZVwiOiBbXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgICAgXSxcclxuICAgICAgICAgIFwiYWZ0ZXJcIjogXCJCdXR0b25cIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJtYXBcIjoge1xyXG4gICAgICAgICAgXCJCdXR0b25cIjogW1xyXG4gICAgICAgICAgICBcIi5GSUxMRURcIixcclxuICAgICAgICAgICAgXCIub25Nb3VzZUxlYXZlXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIFwiQ29uZmlybWF0aW9uTW9kYWxcIjoge1xyXG4gICAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICAgIFwiaW5cIjogXCJzdHJpbmdzXCIsXHJcbiAgICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgIFwiLmNvbmZpcm1CdXR0b25Db2xvclwiXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwibWFwXCI6IHtcclxuICAgICAgICAgIFwiQ29uZmlybWF0aW9uTW9kYWxcIjogW1xyXG4gICAgICAgICAgICBcIi5jb25maXJtQnV0dG9uQ29sb3JcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICAgIFwiYmVmb3JlXCI6IFtcclxuICAgICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgICBdLFxyXG4gICAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICAgIFwiQ29uZmlybWF0aW9uTW9kYWxcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgXCJUZXh0XCI6IHtcclxuICAgICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgICAgXCJmaWx0ZXJcIjogXCIkPy5TaXplcz8uU0laRV8zMiAmJiAkLkNvbG9yc1wiLFxyXG4gICAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgICBcImJlZm9yZVwiOiBbXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgXCJUb29sdGlwXCI6IHtcclxuICAgICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgICBcImluXCI6IFwicHJvdG90eXBlc1wiLFxyXG4gICAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICBcInJlbmRlclRvb2x0aXBcIlxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgICAgXCJiZWZvcmVcIjogW1xyXG4gICAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIFwiTWFya2Rvd25cIjoge1xyXG4gICAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgICBcImZpbHRlclwiOiBcIiQ/LnByb3RvdHlwZT8ucmVuZGVyICYmICQucnVsZXNcIixcclxuICAgICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiRmx1eERpc3BhdGNoZXJcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcIl9jdXJyZW50RGlzcGF0Y2hBY3Rpb25UeXBlXCIsXHJcbiAgICAgICAgICAgIFwiZGlzcGF0Y2hcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiUmVhY3RcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcImNyZWF0ZUVsZW1lbnRcIixcclxuICAgICAgICAgICAgXCJ1c2VTdGF0ZVwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJSZXN0XCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJnZXRcIixcclxuICAgICAgICAgICAgXCJwb3N0XCIsXHJcbiAgICAgICAgICAgIFwiZ2V0QVBJQmFzZVVSTFwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJGbHV4XCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJjb25uZWN0U3RvcmVzXCIsXHJcbiAgICAgICAgICAgIFwiZGVzdHJveVwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJXZWJTb2NrZXRcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IFwiJD8uX19wcm90b19fPy5oYW5kbGVDb25uZWN0aW9uXCIsXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJiZWZvcmVcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJBY3Rpdml0eUFjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcInNlbmRBY3Rpdml0eUludml0ZVwiLFxyXG4gICAgICAgICAgICBcInVwZGF0ZUFjdGl2aXR5XCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIlByaXZhdGVDaGFubmVsQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwib3BlblByaXZhdGVDaGFubmVsXCIsXHJcbiAgICAgICAgICAgIFwiZW5zdXJlUHJpdmF0ZUNoYW5uZWxcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiQWNrQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiaW5cIjogXCJzdHJpbmdzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwidHlwZTpcXFwiQlVMS19BQ0tcXFwiXCJcclxuICAgICAgICAgIF0sXHJcbiAgICAgICAgICBbXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiB0cnVlLFxyXG4gICAgICAgIFwiYmVmb3JlXCI6IFwiZXhwb3J0c1wiXHJcbiAgICAgIH0sXHJcbiAgICAgIFwibWFwXCI6IHtcclxuICAgICAgICBcImFja1wiOiBbXHJcbiAgICAgICAgICBcInR5cGU6XFxcIkNIQU5ORUxfQUNLXFxcIlwiLFxyXG4gICAgICAgICAgXCJtZXNzYWdlSWRcIixcclxuICAgICAgICAgIFwiY2hhbm5lbElkXCJcclxuICAgICAgICBdLFxyXG4gICAgICAgIFwiYnVsa0Fja1wiOiBbXHJcbiAgICAgICAgICBcInR5cGU6XFxcIkJVTEtfQUNLXFxcIlwiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJBbmFseXRpY3NBY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJpc1Rocm90dGxlZFwiLFxyXG4gICAgICAgICAgICBcInRyYWNrXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIkFuaW1hdGlvbkFjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJzcHJpbmdcIixcclxuICAgICAgICAgICAgXCJkZWNheVwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJDb25uZWN0aW9uQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwic2V0U2hvd0FjdGl2aXR5XCIsXHJcbiAgICAgICAgICAgIFwic2V0VmlzaWJpbGl0eVwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJSVENDb25uZWN0aW9uQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwiZ2V0Q2hhbm5lbElkXCIsXHJcbiAgICAgICAgICAgIFwiZ2V0R3VpbGRJZFwiLFxyXG4gICAgICAgICAgICBcImdldFJUQ0Nvbm5lY3Rpb25JZFwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJFbW9qaUFjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcInRyYW5zbGF0ZUlubGluZUVtb2ppVG9TdXJyb2dhdGVzXCIsXHJcbiAgICAgICAgICAgIFwidHJhbnNsYXRlU3Vycm9nYXRlc1RvSW5saW5lRW1vamlcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiRW1vamlTdGF0ZUFjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcImdldFVSTFwiLFxyXG4gICAgICAgICAgICBcImlzRW1vamlEaXNhYmxlZFwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJHdWlsZE5vdGlmaWNhdGlvbnNBY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJ1cGRhdGVDaGFubmVsT3ZlcnJpZGVTZXR0aW5nc1wiLFxyXG4gICAgICAgICAgICBcInVwZGF0ZUd1aWxkTm90aWZpY2F0aW9uU2V0dGluZ3NcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiSW50ZXJuYWxSZWFjdFwiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwianN4XCIsXHJcbiAgICAgICAgICAgIFwianN4c1wiLFxyXG4gICAgICAgICAgICBcIkZyYWdtZW50XCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIkxvZ2luQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwibG9naW5cIixcclxuICAgICAgICAgICAgXCJsb2dvdXRcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiUXVlcnlBY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJxdWVyeUVtb2ppUmVzdWx0c1wiLFxyXG4gICAgICAgICAgICBcInF1ZXJ5RnJpZW5kc1wiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJNZXNzYWdlQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwicmVjZWl2ZU1lc3NhZ2VcIixcclxuICAgICAgICAgICAgXCJzZW5kTWVzc2FnZVwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJQcmVtaXVtQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwiaXNQcmVtaXVtXCIsXHJcbiAgICAgICAgICAgIFwiY2FuVXNlRW1vamlzRXZlcnl3aGVyZVwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJWb2ljZUFjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcInNlbGVjdFZvaWNlQ2hhbm5lbFwiLFxyXG4gICAgICAgICAgICBcImRpc2Nvbm5lY3RcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiVHlwaW5nQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwic3RhcnRUeXBpbmdcIixcclxuICAgICAgICAgICAgXCJzdG9wVHlwaW5nXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIkd1aWxkQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwic2V0Q2hhbm5lbFwiLFxyXG4gICAgICAgICAgICBcInNldFNlcnZlck11dGVcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiSW52aXRlQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwiYWNjZXB0SW52aXRlXCIsXHJcbiAgICAgICAgICAgIFwiYWNjZXB0SW52aXRlQW5kVHJhbnNpdGlvblRvSW52aXRlQ2hhbm5lbFwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJNZWRpYUVuZ2luZUFjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcInRvZ2dsZVNlbGZEZWFmXCIsXHJcbiAgICAgICAgICAgIFwidG9nZ2xlU2VsZk11dGVcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiaTE4blwiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwiX3JlcXVlc3RlZExvY2FsZVwiLFxyXG4gICAgICAgICAgICBcImdldERlZmF1bHRMb2NhbGVcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwidXVpZFwiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwidjFcIixcclxuICAgICAgICAgICAgXCJ2NFwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJobGpzXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJoaWdobGlnaHRBbGxcIixcclxuICAgICAgICAgICAgXCJoaWdobGlnaHRcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufSIsICJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBmaW5kSW5UcmVlKFxyXG4gIHRyZWUsXHJcbiAgc2VhcmNoRmlsdGVyLFxyXG4gIHsgd2Fsa2FibGUgPSBudWxsLCBpZ25vcmUgPSBbXSwgbGltaXQgPSAxMDAgfSA9IHt9XHJcbikge1xyXG4gIGxldCBpdGVyYXRpb24gPSAwO1xyXG5cclxuICBmdW5jdGlvbiBkb1NlYXJjaCh0cmVlLCBzZWFyY2hGaWx0ZXIsIHsgd2Fsa2FibGUgPSBudWxsLCBpZ25vcmUgPSBbXSB9ID0ge30pIHtcclxuICAgIGl0ZXJhdGlvbiArPSAxO1xyXG4gICAgaWYgKGl0ZXJhdGlvbiA+IGxpbWl0KSByZXR1cm47XHJcblxyXG4gICAgaWYgKHR5cGVvZiBzZWFyY2hGaWx0ZXIgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgaWYgKHRyZWUuaGFzT3duUHJvcGVydHkoc2VhcmNoRmlsdGVyKSkgcmV0dXJuIHRyZWVbc2VhcmNoRmlsdGVyXTtcclxuICAgIH0gZWxzZSBpZiAoc2VhcmNoRmlsdGVyKHRyZWUpKSByZXR1cm4gdHJlZTtcclxuXHJcbiAgICBpZiAoIXRyZWUpIHJldHVybjtcclxuXHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh0cmVlKSkge1xyXG4gICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgdHJlZSkge1xyXG4gICAgICAgIGNvbnN0IGZvdW5kID0gZG9TZWFyY2goaXRlbSwgc2VhcmNoRmlsdGVyLCB7IHdhbGthYmxlLCBpZ25vcmUgfSk7XHJcbiAgICAgICAgaWYgKGZvdW5kKSByZXR1cm4gZm91bmQ7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHRyZWUgPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXModHJlZSkpIHtcclxuICAgICAgICBpZiAod2Fsa2FibGUgIT0gbnVsbCAmJiAhd2Fsa2FibGUuaW5jbHVkZXMoa2V5KSkgY29udGludWU7XHJcblxyXG4gICAgICAgIGlmIChpZ25vcmUuaW5jbHVkZXMoa2V5KSkgY29udGludWU7XHJcblxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICBjb25zdCBmb3VuZCA9IGRvU2VhcmNoKHRyZWVba2V5XSwgc2VhcmNoRmlsdGVyLCB7XHJcbiAgICAgICAgICAgIHdhbGthYmxlLFxyXG4gICAgICAgICAgICBpZ25vcmUsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGlmIChmb3VuZCkgcmV0dXJuIGZvdW5kO1xyXG4gICAgICAgIH0gY2F0Y2ggeyB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiBkb1NlYXJjaCh0cmVlLCBzZWFyY2hGaWx0ZXIsIHsgd2Fsa2FibGUsIGlnbm9yZSB9KTtcclxufTtcclxuIiwgImZ1bmN0aW9uIGJ1aWxkKHByZWZpeCA9IFwiQWNvcmRcIiwgdHlwZSwgY29sb3IpIHtcclxuICByZXR1cm4gKC4uLmlucHV0KSA9PiBjb25zb2xlW3R5cGVdKFxyXG4gICAgYCVjJHtwcmVmaXh9JWNgLFxyXG4gICAgYGJhY2tncm91bmQtY29sb3I6ICR7Y29sb3J9OyBjb2xvcjogd2hpdGU7IGJvcmRlci1yYWRpdXM6IDRweDsgcGFkZGluZzogMHB4IDZweCAwcHggNnB4OyBmb250LXdlaWdodDogYm9sZGAsXHJcbiAgICBcIlwiLFxyXG4gICAgLi4uaW5wdXRcclxuICApO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgbG9nOiBidWlsZChcIkFjb3JkXCIsIFwibG9nXCIsIFwiIzAwZmJiMFwiKSxcclxuICBkZWJ1ZzogYnVpbGQoXCJBY29yZCBEZWJ1Z1wiLCBcImRlYnVnXCIsIFwiIzAwZmJiMFwiKSxcclxuICBpbmZvOiBidWlsZChcIkFjb3JkIEluZm9cIiwgXCJsb2dcIiwgXCIjODJhYWZmXCIpLFxyXG4gIHdhcm46IGJ1aWxkKFwiQWNvcmQgV2FyblwiLCBcIndhcm5cIiwgXCIjZGViZjE4XCIpLFxyXG4gIGVycm9yOiBidWlsZChcIkFjb3JkIEVycm9yXCIsIFwiZXJyb3JcIiwgXCIjZWY1ODU4XCIpLFxyXG4gIGJ1aWxkXHJcbn0iLCAiaW1wb3J0IGZpbmRJblRyZWUgZnJvbSBcIi4vcmF3L2ZpbmQtaW4tdHJlZS5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGdldEluc3RhbmNlKG5vZGUpIHtcclxuICAgIHJldHVybiBPYmplY3QuZW50cmllcyhub2RlKS5maW5kKGkgPT4gaVswXS5zdGFydHNXaXRoKFwiX19yZWFjdEludGVybmFsSW5zdGFuY2VcIikgfHwgaVswXS5zdGFydHNXaXRoKFwiX19yZWFjdEZpYmVyXCIpKT8uWzFdO1xyXG4gIH0sXHJcbiAgZ2V0T3duZXJJbnN0YW5jZShub2RlKSB7XHJcbiAgICBsZXQgaW5zdGFuY2UgPSB0aGlzLmdldEluc3RhbmNlKG5vZGUpO1xyXG4gICAgZm9yIChsZXQgZWwgPSBpbnN0YW5jZTsgZWw7IGVsID0gZWwucmV0dXJuKVxyXG4gICAgICBpZiAoZWwuc3RhdGVOb2RlPy5mb3JjZVVwZGF0ZSkgcmV0dXJuIGVsLnN0YXRlTm9kZTtcclxuICB9LFxyXG4gIGZpbmRJblRyZWUodHJlZSwgZmlsdGVyKSB7XHJcbiAgICByZXR1cm4gZmluZEluVHJlZSh0cmVlLCBmaWx0ZXIsIHtcclxuICAgICAgd2Fsa2FibGU6IFtcInByb3BzXCIsIFwic3RhdGVcIiwgXCJjaGlsZHJlblwiLCBcInJldHVyblwiXVxyXG4gICAgfSk7XHJcbiAgfSxcclxuICBnZXRDb21wb25lbnRzKG5vZGUpIHtcclxuICAgIGNvbnN0IGluc3RhbmNlID0gdGhpcy5nZXRJbnN0YW5jZShub2RlKTtcclxuICAgIGNvbnN0IGNvbXBvbmVudHMgPSBbXTtcclxuICAgIGxldCBsYXN0SW5zdGFuY2UgPSBpbnN0YW5jZTtcclxuICAgIHdoaWxlIChsYXN0SW5zdGFuY2UgJiYgbGFzdEluc3RhbmNlLnJldHVybikge1xyXG4gICAgICBpZiAodHlwZW9mIGxhc3RJbnN0YW5jZS5yZXR1cm4udHlwZSA9PT0gXCJzdHJpbmdcIikgYnJlYWs7XHJcbiAgICAgIGlmIChsYXN0SW5zdGFuY2UucmV0dXJuLnR5cGUpIGNvbXBvbmVudHMucHVzaChsYXN0SW5zdGFuY2UucmV0dXJuLnR5cGUpO1xyXG4gICAgICBsYXN0SW5zdGFuY2UgPSBsYXN0SW5zdGFuY2UucmV0dXJuO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNvbXBvbmVudHM7XHJcbiAgfSxcclxuICBnZXRTdGF0ZU5vZGVzKG5vZGUpIHtcclxuICAgIGNvbnN0IGluc3RhbmNlID0gdGhpcy5nZXRJbnN0YW5jZShub2RlKTtcclxuICAgIGNvbnN0IHN0YXRlTm9kZXMgPSBbXTtcclxuICAgIGxldCBsYXN0SW5zdGFuY2UgPSBpbnN0YW5jZTtcclxuICAgIHdoaWxlIChsYXN0SW5zdGFuY2UgJiYgbGFzdEluc3RhbmNlLnJldHVybikge1xyXG4gICAgICBpZiAobGFzdEluc3RhbmNlLnJldHVybi5zdGF0ZU5vZGUgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkgYnJlYWs7XHJcbiAgICAgIGlmIChsYXN0SW5zdGFuY2UucmV0dXJuLnN0YXRlTm9kZSlcclxuICAgICAgICBzdGF0ZU5vZGVzLnB1c2gobGFzdEluc3RhbmNlLnJldHVybi5zdGF0ZU5vZGUpO1xyXG4gICAgICBsYXN0SW5zdGFuY2UgPSBsYXN0SW5zdGFuY2UucmV0dXJuO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN0YXRlTm9kZXM7XHJcbiAgfSxcclxuICBnZXRQcm9wcyhlbCwgZmlsdGVyID0gKGkpID0+IGksIG1heCA9IDEwMDAwKSB7XHJcbiAgICBjb25zdCBpbnN0YW5jZSA9IHRoaXMuZ2V0SW5zdGFuY2UoZWwpO1xyXG5cclxuICAgIGlmICghaW5zdGFuY2U/LnJldHVybikgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgZm9yIChcclxuICAgICAgbGV0IGN1cnJlbnQgPSBpbnN0YW5jZT8ucmV0dXJuLCBpID0gMDtcclxuICAgICAgaSA+IG1heCB8fCBjdXJyZW50ICE9PSBudWxsO1xyXG4gICAgICBjdXJyZW50ID0gY3VycmVudD8ucmV0dXJuLCBpKytcclxuICAgICkge1xyXG4gICAgICBpZiAoY3VycmVudD8ucGVuZGluZ1Byb3BzICYmIGZpbHRlcihjdXJyZW50LnBlbmRpbmdQcm9wcykpXHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnQucGVuZGluZ1Byb3BzO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH0sXHJcbn0iLCAiaW1wb3J0IGZpbmRJblRyZWUgZnJvbSBcIi4vcmF3L2ZpbmQtaW4tdHJlZS5qc1wiO1xyXG5pbXBvcnQgbG9nZ2VyIGZyb20gXCIuL2xvZ2dlci5qc1wiO1xyXG5pbXBvcnQgcmVhY3QgZnJvbSBcIi4vcmVhY3QuanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBsb2dnZXIsXHJcbiAgcmVhY3QsXHJcbiAgZmluZEluVHJlZSxcclxuICBmb3JtYXQodmFsLCAuLi5hcmdzKSB7XHJcbiAgICByZXR1cm4gYCR7dmFsfWAucmVwbGFjZUFsbCgveyhcXGQrKX0vZywgKF8sIGNhcCkgPT4ge1xyXG4gICAgICByZXR1cm4gYXJnc1tOdW1iZXIoY2FwKV07XHJcbiAgICB9KTtcclxuICB9LFxyXG4gIGludGVydmFsKGNiLCBkdXIpIHtcclxuICAgIGxldCBpbnRlcnZhbCA9IHNldEludGVydmFsKGNiLCBkdXIpO1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgdGltZW91dChjYiwgZHVyKSB7XHJcbiAgICBsZXQgdGltZW91dCA9IHNldFRpbWVvdXQoY2IsIGR1cik7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgaWZFeGlzdHModmFsLCBjYikge1xyXG4gICAgaWYgKHZhbCkgY2IodmFsKTtcclxuICB9LFxyXG4gIGNvcHlUZXh0KHRleHQpIHtcclxuICAgIGlmICh3aW5kb3cuRGlzY29yZE5hdGl2ZSkge1xyXG4gICAgICBEaXNjb3JkTmF0aXZlLmNsaXBib2FyZC5jb3B5KHRleHQpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgbmF2aWdhdG9yLmNsaXBib2FyZC53cml0ZVRleHQodGV4dCkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICBjb25zdCBjb3B5QXJlYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZXh0YXJlYVwiKTtcclxuXHJcbiAgICAgIGNvcHlBcmVhLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xyXG4gICAgICBjb3B5QXJlYS5zdHlsZS5wb3NpdGlvbiA9IFwiZml4ZWRcIjtcclxuICAgICAgY29weUFyZWEuc3R5bGUudG9wID0gXCIwXCI7XHJcbiAgICAgIGNvcHlBcmVhLnN0eWxlLmxlZnQgPSBcIjBcIjtcclxuXHJcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY29weUFyZWEpO1xyXG4gICAgICBjb3B5QXJlYS5mb2N1cygpO1xyXG4gICAgICBjb3B5QXJlYS5zZWxlY3QoKTtcclxuXHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoXCJjb3B5XCIpO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoY29weUFyZWEpO1xyXG4gICAgfSk7XHJcbiAgfSxcclxuICBzbGVlcChtcykge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIG1zKSk7XHJcbiAgfSxcclxuICBtYXBSZXBsYWNlKHRleHQsIG1hcCA9IHt9KSB7XHJcbiAgICByZXR1cm4gKEFycmF5LmlzQXJyYXkobWFwKSA/IG1hcCA6IE9iamVjdC5lbnRyaWVzKG1hcCkpLnJlZHVjZSgoYWxsLCBjdXJyZW50KSA9PiBhbGwucmVwbGFjZUFsbChjdXJyZW50WzBdLCBjdXJyZW50WzFdKSwgdGV4dCk7XHJcbiAgfSxcclxuICBlc2NhcGVSZWdleChzdHIpIHtcclxuICAgIHJldHVybiBzdHJcclxuICAgICAgLnJlcGxhY2UoL1t8XFxcXHt9KClbXFxdXiQrKj8uXS9nLCAnXFxcXCQmJylcclxuICAgICAgLnJlcGxhY2UoLy0vZywgJ1xcXFx4MmQnKTtcclxuICB9XHJcbn0iLCAiaW1wb3J0IHV0aWxzIGZyb20gXCIuLi8uLi91dGlscy9pbmRleC5qc1wiO1xyXG5pbXBvcnQgbG9nZ2VyIGZyb20gXCIuLi8uLi91dGlscy9sb2dnZXIuanNcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB3cmFwRmlsdGVyKGZpbHRlcikge1xyXG4gIHJldHVybiAoLi4uYXJncykgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgaWYgKGFyZ3NbMF0/LmRvY3VtZW50ICYmIGFyZ3NbMF0/LndpbmRvdykgcmV0dXJuIGZhbHNlO1xyXG4gICAgICBpZiAoYXJnc1swXT8uZGVmYXVsdD8ucmVtb3ZlICYmIGFyZ3NbMF0/LmRlZmF1bHQ/LnNldCAmJiBhcmdzWzBdPy5kZWZhdWx0Py5jbGVhciAmJiBhcmdzWzBdPy5kZWZhdWx0Py5nZXQgJiYgIWFyZ3NbMF0/LmRlZmF1bHQ/LnNvcnQpIHJldHVybiBmYWxzZTtcclxuICAgICAgaWYgKGFyZ3NbMF0ucmVtb3ZlICYmIGFyZ3NbMF0uc2V0ICYmIGFyZ3NbMF0uY2xlYXIgJiYgYXJnc1swXS5nZXQgJiYgIWFyZ3NbMF0uc29ydCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICBpZiAoYXJnc1swXT8uZGVmYXVsdD8uZ2V0VG9rZW4gfHwgYXJnc1swXT8uZGVmYXVsdD8uZ2V0RW1haWwgfHwgYXJnc1swXT8uZGVmYXVsdD8uc2hvd1Rva2VuKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIGlmIChhcmdzWzBdPy5nZXRUb2tlbiB8fCBhcmdzWzBdPy5nZXRFbWFpbCB8fCBhcmdzWzBdPy5zaG93VG9rZW4pIHJldHVybiBmYWxzZTtcclxuICAgICAgcmV0dXJuIGZpbHRlciguLi5hcmdzKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnIpIHtcclxuICAgICAgbG9nZ2VyLndhcm4oXCJNb2R1bGUgZmlsdGVyIHRocmV3IGFuIGV4Y2VwdGlvbi5cIiwgZmlsdGVyLCBlcnIpO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgfTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2hlY2tNb2R1bGVTdHJpbmdzKG0sIHN0cmluZ3MsIGhhc05vdCkge1xyXG4gIGNvbnN0IGNoZWNrID0gKHMxLCBzMikgPT4ge1xyXG4gICAgcmV0dXJuIGhhc05vdCA/IHMxLnRvU3RyaW5nKCkuaW5kZXhPZihzMi50b1N0cmluZygpKSA9PSAtMSA6IHMxLnRvU3RyaW5nKCkuaW5kZXhPZihzMi50b1N0cmluZygpKSA+IC0xO1xyXG4gIH07XHJcbiAgcmV0dXJuIHN0cmluZ3MuZXZlcnkoaiA9PiB7XHJcbiAgICByZXR1cm4gY2hlY2sobT8udG9TdHJpbmc/LigpIHx8IFwiXCIsIGopXHJcbiAgICAgIHx8IGNoZWNrKG0/Ll9fb3JpZ2luYWxfXz8udG9TdHJpbmc/LigpIHx8IFwiXCIsIGopXHJcbiAgICAgIHx8IGNoZWNrKG0/LnR5cGU/LnRvU3RyaW5nPy4oKSB8fCBcIlwiLCBqKVxyXG4gICAgICB8fCBjaGVjayhtPy50eXBlPy5fX29yaWdpbmFsX18/LnRvU3RyaW5nPy4oKSB8fCBcIlwiLCBqKVxyXG4gICAgICB8fCBPYmplY3QuZW50cmllcyhbJ2Z1bmN0aW9uJywgJ29iamVjdCddLmluY2x1ZGVzKHR5cGVvZiBtPy5wcm90b3R5cGUpID8gdHlwZW9mIG0/LnByb3RvdHlwZSA6IHt9KS5maWx0ZXIoaSA9PiBpWzBdPy5pbmNsdWRlcz8uKFwicmVuZGVyXCIpKS5zb21lKGkgPT4gY2hlY2soaVsxXT8udG9TdHJpbmc/LigpIHx8IFwiXCIsIGopKVxyXG4gIH0pO1xyXG59O1xyXG5mdW5jdGlvbiBjaGVja01vZHVsZVByb3BzKG0sIHByb3BlcnRpZXMsIGhhc05vdCkge1xyXG4gIHJldHVybiBwcm9wZXJ0aWVzLmV2ZXJ5KHByb3AgPT4ge1xyXG4gICAgY29uc3QgdmFsdWUgPSBtW3Byb3BdPy5fX29yaWdpbmFsX18gfHwgbVtwcm9wXTtcclxuICAgIHJldHVybiBoYXNOb3QgPyB2YWx1ZSA9PT0gdW5kZWZpbmVkIDogKHZhbHVlICE9PSB1bmRlZmluZWQgJiYgISh0eXBlb2YgdmFsdWUgPT0gXCJzdHJpbmdcIiAmJiAhdmFsdWUpKTtcclxuICB9KTtcclxufTtcclxuZnVuY3Rpb24gY2hlY2tNb2R1bGVQcm90b3R5cGVzKG0sIHByb3RvUHJvcHMsIGhhc05vdCkge1xyXG4gIHJldHVybiBtLnByb3RvdHlwZSAmJiBwcm90b1Byb3BzLmV2ZXJ5KHByb3AgPT4ge1xyXG4gICAgY29uc3QgdmFsdWUgPSBtLnByb3RvdHlwZVtwcm9wXTtcclxuICAgIHJldHVybiBoYXNOb3QgPyB2YWx1ZSA9PT0gdW5kZWZpbmVkIDogKHZhbHVlICE9PSB1bmRlZmluZWQgJiYgISh0eXBlb2YgdmFsdWUgPT0gXCJzdHJpbmdcIiAmJiAhdmFsdWUpKTtcclxuICB9KTtcclxufTtcclxuXHJcbmNvbnN0IHdlYnBhY2tDaHVua05hbWUgPSBcIndlYnBhY2tDaHVua2Rpc2NvcmRfYXBwXCI7XHJcbmNvbnN0IHB1c2hMaXN0ZW5lcnMgPSBuZXcgU2V0KCk7XHJcblxyXG5cclxue1xyXG4gIGxldCBvZ1B1c2ggPSB3aW5kb3dbd2VicGFja0NodW5rTmFtZV0ucHVzaDtcclxuXHJcbiAgZnVuY3Rpb24gaGFuZGxlUHVzaChjaHVuaykge1xyXG4gICAgY29uc3QgWywgbW9kdWxlc10gPSBjaHVuaztcclxuXHJcbiAgICBmb3IgKGNvbnN0IG1vZHVsZUlkIGluIE9iamVjdC5rZXlzKG1vZHVsZXMgfHwge30pKSB7XHJcbiAgICAgIGNvbnN0IG9nTW9kdWxlID0gbW9kdWxlc1ttb2R1bGVJZF07XHJcblxyXG4gICAgICBtb2R1bGVzW21vZHVsZUlkXSA9IChtb2R1bGUsIGV4cG9ydHMsIHJlcXVpcmUpID0+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgb2dNb2R1bGUuY2FsbChudWxsLCBtb2R1bGUsIGV4cG9ydHMsIHJlcXVpcmUpO1xyXG5cclxuICAgICAgICAgIHB1c2hMaXN0ZW5lcnMuZm9yRWFjaChsaXN0ZW5lciA9PiB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgbGlzdGVuZXIoZXhwb3J0cyk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgdXRpbHMubG9nZ2VyLmVycm9yKFwiUHVzaCBsaXN0ZW5lciB0aHJldyBhbiBleGNlcHRpb24uXCIsIGxpc3RlbmVyLCBlcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgIHV0aWxzLmxvZ2dlci5lcnJvcihcIlVuYWJsZSB0byBwYXRjaCBwdXNoZWQgbW9kdWxlLlwiLCBlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG5cclxuICAgICAgT2JqZWN0LmFzc2lnbihtb2R1bGVzW21vZHVsZUlkXSwgb2dNb2R1bGUsIHtcclxuICAgICAgICBfX29yaWdpbmFsX186IG9nTW9kdWxlLFxyXG4gICAgICAgIHRvU3RyaW5nOiAoKSA9PiBvZ01vZHVsZS50b1N0cmluZygpLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gb2dQdXNoLmNhbGwod2luZG93W3dlYnBhY2tDaHVua05hbWVdLCBjaHVuayk7XHJcbiAgfVxyXG5cclxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93W3dlYnBhY2tDaHVua05hbWVdLCBcInB1c2hcIiwge1xyXG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxyXG4gICAgZ2V0KCkgeyByZXR1cm4gaGFuZGxlUHVzaDsgfSxcclxuICAgIHNldCh2YWx1ZSkge1xyXG4gICAgICBvZ1B1c2ggPSB2YWx1ZTtcclxuXHJcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3dbdGhpcy5jaHVua05hbWVdLCBcInB1c2hcIiwge1xyXG4gICAgICAgIHZhbHVlOiB0aGlzLmhhbmRsZVB1c2gsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIHdyaXRhYmxlOiB0cnVlXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcblxyXG5cclxuXHJcbi8qKlxyXG4gKiBcclxuICogQHBhcmFtIHthbnl9IGZpbHRlciBcclxuICogQHBhcmFtIHt7IHNpZ25hbDogQWJvcnRTaWduYWwsIHNlYXJjaEV4cG9ydHM6IGJvb2xlYW4gfX0gcGFyYW0xIFxyXG4gKiBAcmV0dXJucyBcclxuICovXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsYXp5RmluZChmaWx0ZXIsIHsgc2lnbmFsID0gbnVsbCwgc2VhcmNoRXhwb3J0cyA9IGZhbHNlIH0pIHtcclxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgY29uc3QgY2FuY2VsID0gKCkgPT4gcHVzaExpc3RlbmVycy5kZWxldGUobGlzdGVuZXIpO1xyXG4gICAgY29uc3QgbGlzdGVuZXIgPSAoZXhwb3J0cykgPT4ge1xyXG4gICAgICBpZiAoIWV4cG9ydHMgfHwgZXhwb3J0cyA9PT0gd2luZG93IHx8IGV4cG9ydHMgPT09IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkgcmV0dXJuO1xyXG5cclxuICAgICAgbGV0IGZvdW5kID0gbnVsbDtcclxuXHJcbiAgICAgIGlmICh0eXBlb2YgZXhwb3J0cyA9PSBcIm9iamVjdFwiICYmIHNlYXJjaEV4cG9ydHMpIHtcclxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBleHBvcnRzKSB7XHJcbiAgICAgICAgICBsZXQgZXhwb3J0ZWQgPSBleHBvcnRzW2tleV07XHJcbiAgICAgICAgICBpZiAoIWV4cG9ydGVkKSBjb250aW51ZTtcclxuICAgICAgICAgIGlmIChmaWx0ZXIoZXhwb3J0ZWQpKSB7XHJcbiAgICAgICAgICAgIGZvdW5kID0gZXhwb3J0ZWQ7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBsZXQgcGF0aHMgPSBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCIsXHJcbiAgICAgICAgICBcIlwiXHJcbiAgICAgICAgXTtcclxuICAgICAgICBmb3VuZCA9IHBhdGhzLm1hcChpID0+IHtcclxuICAgICAgICAgIGxldCBwYXRoZWQgPSAhaSA/IGV4cG9ydHMgOiBfLmdldChleHBvcnRzLCBpKTtcclxuICAgICAgICAgIGlmIChwYXRoZWQgJiYgZmlsdGVyKHBhdGhlZCkpIHJldHVybiBwYXRoZWQ7XHJcbiAgICAgICAgfSkuZmluZChpID0+IGkpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIWZvdW5kKSByZXR1cm47XHJcbiAgICAgIGNhbmNlbCgpO1xyXG4gICAgICByZXNvbHZlKGZvdW5kKTtcclxuICAgIH1cclxuXHJcbiAgICBwdXNoTGlzdGVuZXJzLmFkZChsaXN0ZW5lcik7XHJcblxyXG4gICAgc2lnbmFsPy5hZGRFdmVudExpc3RlbmVyKFwiYWJvcnRcIiwgKCkgPT4ge1xyXG4gICAgICBjYW5jZWwoKTtcclxuICAgICAgcmVzb2x2ZShudWxsKTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZmluZChyZXEsIGZpbHRlciwgY29uZmlnID0ge30pIHtcclxuICBsZXQgZGVmYXVsdEV4cG9ydCA9IHR5cGVvZiBjb25maWcuZGVmYXVsdEV4cG9ydCAhPSBcImJvb2xlYW5cIiA/IGZhbHNlIDogY29uZmlnLmRlZmF1bHRFeHBvcnQ7XHJcbiAgbGV0IHVubG9hZGVkID0gdHlwZW9mIGNvbmZpZy51bmxvYWRlZCAhPSBcImJvb2xlYW5cIiA/IGZhbHNlIDogY29uZmlnLnVubG9hZGVkO1xyXG4gIGxldCBhbGwgPSB0eXBlb2YgY29uZmlnLmFsbCAhPSBcImJvb2xlYW5cIiA/IGZhbHNlIDogY29uZmlnLmFsbDtcclxuICBjb25zdCBmb3VuZCA9IFtdO1xyXG4gIGlmICghdW5sb2FkZWQpIGZvciAobGV0IGkgaW4gcmVxLmMpIGlmIChyZXEuYy5oYXNPd25Qcm9wZXJ0eShpKSkge1xyXG4gICAgbGV0IG0gPSByZXEuY1tpXS5leHBvcnRzLCByID0gbnVsbDtcclxuICAgIGlmIChtICYmICh0eXBlb2YgbSA9PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBtID09IFwiZnVuY3Rpb25cIikpIHtcclxuICAgICAgaWYgKCEhKHIgPSBmaWx0ZXIobSwgaSkpKSB7XHJcbiAgICAgICAgaWYgKGFsbCkgZm91bmQucHVzaChkZWZhdWx0RXhwb3J0ID8gciA6IHJlcS5jW2ldKTtcclxuICAgICAgICBlbHNlIHJldHVybiBkZWZhdWx0RXhwb3J0ID8gciA6IHJlcS5jW2ldO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgZm9yIChsZXQga2V5IG9mIE9iamVjdC5rZXlzKG0pKSBpZiAoa2V5Lmxlbmd0aCA8IDQgJiYgbVtrZXldICYmICEhKHIgPSBmaWx0ZXIobVtrZXldLCBpKSkpIHtcclxuICAgICAgICBpZiAoYWxsKSBmb3VuZC5wdXNoKGRlZmF1bHRFeHBvcnQgPyByIDogcmVxLmNbaV0pO1xyXG4gICAgICAgIGVsc2UgcmV0dXJuIGRlZmF1bHRFeHBvcnQgPyByIDogcmVxLmNbaV07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChtICYmIG0uX19lc01vZHVsZSAmJiBtLmRlZmF1bHQgJiYgKHR5cGVvZiBtLmRlZmF1bHQgPT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgbS5kZWZhdWx0ID09IFwiZnVuY3Rpb25cIikpIHtcclxuICAgICAgaWYgKCEhKHIgPSBmaWx0ZXIobS5kZWZhdWx0LCBpKSkpIHtcclxuICAgICAgICBpZiAoYWxsKSBmb3VuZC5wdXNoKGRlZmF1bHRFeHBvcnQgPyByIDogcmVxLmNbaV0pO1xyXG4gICAgICAgIGVsc2UgcmV0dXJuIGRlZmF1bHRFeHBvcnQgPyByIDogcmVxLmNbaV07XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZiAobS5kZWZhdWx0LnR5cGUgJiYgKHR5cGVvZiBtLmRlZmF1bHQudHlwZSA9PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBtLmRlZmF1bHQudHlwZSA9PSBcImZ1bmN0aW9uXCIpICYmICEhKHIgPSBmaWx0ZXIobS5kZWZhdWx0LnR5cGUsIGkpKSkge1xyXG4gICAgICAgIGlmIChhbGwpIGZvdW5kLnB1c2goZGVmYXVsdEV4cG9ydCA/IHIgOiByZXEuY1tpXSk7XHJcbiAgICAgICAgZWxzZSByZXR1cm4gZGVmYXVsdEV4cG9ydCA/IHIgOiByZXEuY1tpXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICBmb3IgKGxldCBpIGluIHJlcS5tKSBpZiAocmVxLm0uaGFzT3duUHJvcGVydHkoaSkpIHtcclxuICAgIGxldCBtID0gcmVxLm1baV07XHJcbiAgICBpZiAobSAmJiB0eXBlb2YgbSA9PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgaWYgKHJlcS5jW2ldICYmICF1bmxvYWRlZCAmJiBmaWx0ZXIobSwgaSkpIHtcclxuICAgICAgICBpZiAoYWxsKSBmb3VuZC5wdXNoKGRlZmF1bHRFeHBvcnQgPyByZXEuY1tpXS5leHBvcnRzIDogcmVxLmNbaV0pO1xyXG4gICAgICAgIGVsc2UgcmV0dXJuIGRlZmF1bHRFeHBvcnQgPyByZXEuY1tpXS5leHBvcnRzIDogcmVxLmNbaV07XHJcbiAgICAgIH1cclxuICAgICAgaWYgKCFyZXEuY1tpXSAmJiB1bmxvYWRlZCAmJiBmaWx0ZXIobSwgaSkpIHtcclxuICAgICAgICBjb25zdCByZXNvbHZlZCA9IHt9LCByZXNvbHZlZDIgPSB7fTtcclxuICAgICAgICBtKHJlc29sdmVkLCByZXNvbHZlZDIsIHJlcSk7XHJcbiAgICAgICAgY29uc3QgdHJ1ZVJlc29sdmVkID0gcmVzb2x2ZWQyICYmIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHJlc29sdmVkMiB8fCB7fSkubGVuZ3RoID09IDAgPyByZXNvbHZlZCA6IHJlc29sdmVkMjtcclxuICAgICAgICBpZiAoYWxsKSBmb3VuZC5wdXNoKGRlZmF1bHRFeHBvcnQgPyB0cnVlUmVzb2x2ZWQuZXhwb3J0cyA6IHRydWVSZXNvbHZlZCk7XHJcbiAgICAgICAgZWxzZSByZXR1cm4gZGVmYXVsdEV4cG9ydCA/IHRydWVSZXNvbHZlZC5leHBvcnRzIDogdHJ1ZVJlc29sdmVkO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIGlmIChhbGwpIHJldHVybiBmb3VuZDtcclxufTtcclxuXHJcblxyXG5mdW5jdGlvbiBmaW5kZXJGaW5kRnVuY3Rpb24oZW50cmllcywgc3RyaW5ncykge1xyXG4gIHJldHVybiAoZW50cmllcy5maW5kKG4gPT4ge1xyXG4gICAgbGV0IGZ1bmNTdHJpbmcgPSB0eXBlb2YgblsxXSA9PSBcImZ1bmN0aW9uXCIgPyAoblsxXT8uX19vcmlnaW5hbF9fPy50b1N0cmluZz8uKCkgfHwgblsxXT8udG9TdHJpbmc/LigpIHx8IFwiXCIpIDogKCgpID0+IHsgdHJ5IHsgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG5bMV0pIH0gY2F0Y2ggKGVycikgeyByZXR1cm4gblsxXS50b1N0cmluZygpIH0gfSkoKTtcclxuICAgIGxldCByZW5kZXJGdW5jU3RyaW5nID0gblsxXT8ucmVuZGVyPy5fX29yaWdpbmFsX18/LnRvU3RyaW5nPy4oKSB8fCBuWzFdPy5yZW5kZXI/LnRvU3RyaW5nPy4oKSB8fCBcIlwiO1xyXG4gICAgcmV0dXJuIHN0cmluZ3MuZXZlcnkoc3RyaW5nID0+IGZ1bmNTdHJpbmcuaW5kZXhPZihzdHJpbmcpICE9IC0xIHx8IHJlbmRlckZ1bmNTdHJpbmcuaW5kZXhPZihzdHJpbmcpICE9IC0xKTtcclxuICB9KSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBmaW5kZXJUb0ZpbHRlcihmaW5kZXIpIHtcclxuICBsZXQgZm91bmQgPSAoKSA9PiBmYWxzZTtcclxuICBpZiAodHlwZW9mIGZpbmRlcj8uZmlsdGVyID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICBmb3VuZCA9IHdyYXBGaWx0ZXIoZXZhbChgKCgkKT0+eyB0cnkgeyByZXR1cm4gKCR7ZmluZGVyLmZpbHRlcn0pOyB9IGNhdGNoIHsgcmV0dXJuIGZhbHNlOyB9IH0pYCkpO1xyXG4gIH0gZWxzZSBpZiAodHlwZW9mIGZpbmRlcj8uZmlsdGVyID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgIGZvdW5kID0gd3JhcEZpbHRlcihmaW5kZXIuZmlsdGVyKTtcclxuICB9IGVsc2Uge1xyXG4gICAgc3dpdGNoIChmaW5kZXIuZmlsdGVyLmluKSB7XHJcbiAgICAgIGNhc2UgXCJwcm9wZXJ0aWVzXCI6IHtcclxuICAgICAgICBpZiAoZmluZGVyLmZpbHRlci5ieT8uWzFdPy5sZW5ndGgpIHtcclxuICAgICAgICAgIGZvdW5kID0gd3JhcEZpbHRlcigobSkgPT4gY2hlY2tNb2R1bGVQcm9wcyhtLCBmaW5kZXIuZmlsdGVyLmJ5Py5bMF0gfHwgW10pICYmIGNoZWNrTW9kdWxlUHJvcHMobSwgZmluZGVyLmZpbHRlci5ieT8uWzFdIHx8IFtdLCB0cnVlKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGZvdW5kID0gd3JhcEZpbHRlcigobSkgPT4gY2hlY2tNb2R1bGVQcm9wcyhtLCBmaW5kZXIuZmlsdGVyLmJ5Py5bMF0gfHwgW10pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSBcInByb3RvdHlwZXNcIjoge1xyXG4gICAgICAgIGlmIChmaW5kZXIuZmlsdGVyLmJ5Py5bMV0/Lmxlbmd0aCkge1xyXG4gICAgICAgICAgZm91bmQgPSB3cmFwRmlsdGVyKChtKSA9PiBjaGVja01vZHVsZVByb3RvdHlwZXMobSwgZmluZGVyLmZpbHRlci5ieT8uWzBdIHx8IFtdKSAmJiBjaGVja01vZHVsZVByb3RvdHlwZXMobSwgZmluZGVyLmZpbHRlci5ieT8uWzFdIHx8IFtdLCB0cnVlKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGZvdW5kID0gd3JhcEZpbHRlcigobSkgPT4gY2hlY2tNb2R1bGVQcm90b3R5cGVzKG0sIGZpbmRlci5maWx0ZXIuYnk/LlswXSB8fCBbXSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlIFwic3RyaW5nc1wiOiB7XHJcbiAgICAgICAgaWYgKGZpbmRlci5maWx0ZXIuYnk/LlsxXT8ubGVuZ3RoKSB7XHJcbiAgICAgICAgICBmb3VuZCA9IHdyYXBGaWx0ZXIoKG0pID0+IGNoZWNrTW9kdWxlU3RyaW5ncyhtLCBmaW5kZXIuZmlsdGVyLmJ5Py5bMF0gfHwgW10pICYmIGNoZWNrTW9kdWxlU3RyaW5ncyhtLCBmaW5kZXIuZmlsdGVyLmJ5Py5bMV0gfHwgW10sIHRydWUpKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZm91bmQgPSB3cmFwRmlsdGVyKChtKSA9PiBjaGVja01vZHVsZVN0cmluZ3MobSwgZmluZGVyLmZpbHRlci5ieT8uWzBdIHx8IFtdKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBmb3VuZDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRlck1hcChfX29yaWdpbmFsX18sIG1hcCkge1xyXG4gIGxldCBfX21hcHBlZF9fID0ge307XHJcblxyXG4gIGxldCB0ZW1wID0ge1xyXG4gICAgX19vcmlnaW5hbF9fLFxyXG4gICAgX19tYXBwZWRfXyxcclxuICAgIC4uLl9fb3JpZ2luYWxfX1xyXG4gIH07XHJcblxyXG4gIE9iamVjdC5lbnRyaWVzKG1hcCkuZm9yRWFjaCgoW2tleSwgc3RyaW5nc10pID0+IHtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0ZW1wLCBrZXksIHtcclxuICAgICAgZ2V0KCkge1xyXG4gICAgICAgIGlmIChfX21hcHBlZF9fW2tleV0pIHJldHVybiBfX29yaWdpbmFsX19bX19tYXBwZWRfX1trZXldXTtcclxuXHJcbiAgICAgICAgbGV0IGZvdW5kRnVuYyA9IGZpbmRlckZpbmRGdW5jdGlvbihPYmplY3QuZW50cmllcyhfX29yaWdpbmFsX18gfHwge30pLCBtYXBba2V5XSB8fCBbXSk7XHJcbiAgICAgICAgaWYgKCFmb3VuZEZ1bmM/Lmxlbmd0aCkgcmV0dXJuO1xyXG5cclxuICAgICAgICBfX21hcHBlZF9fW2tleV0gPSBmb3VuZEZ1bmNbMF07XHJcbiAgICAgICAgcmV0dXJuIGZvdW5kRnVuY1sxXTtcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIHRlbXA7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBmaW5kQnlGaW5kZXIocmVxLCBmaW5kZXIgPSB7fSkge1xyXG4gIGNvbnN0IGRlZmF1bHRFeHBvcnQgPSAhIWZpbmRlcj8uZmlsdGVyPy5leHBvcnQ7XHJcbiAgbGV0IGZvdW5kID0gZmluZChyZXEsIGZpbmRlclRvRmlsdGVyKGZpbmRlciksIHsgZGVmYXVsdEV4cG9ydCwgYWxsOiB0cnVlIH0pLmZpbmQoaSA9PiBpICE9PSBnbG9iYWxUaGlzLndpbmRvdyB8fCBpPy5leHBvcnRzICE9PSBnbG9iYWxUaGlzLndpbmRvdyk7XHJcblxyXG4gIGlmICghZm91bmQpIHJldHVybiBudWxsO1xyXG5cclxuICBpZiAoZmluZGVyLnBhdGg/LmJlZm9yZSkgZm91bmQgPSAoQXJyYXkuaXNBcnJheShmaW5kZXIucGF0aC5iZWZvcmUpID8gZmluZGVyLnBhdGguYmVmb3JlLm1hcChpID0+IF8uZ2V0KGZvdW5kLCBpKSkuZmluZChpID0+IGkpIDogXy5nZXQoZm91bmQsIGZpbmRlci5wYXRoLmJlZm9yZSkpIHx8IGZvdW5kO1xyXG4gIGlmIChmaW5kZXIuYXNzaWduKSBmb3VuZCA9IE9iamVjdC5hc3NpZ24oe30sIGZvdW5kKTtcclxuXHJcbiAgaWYgKCFmb3VuZCkgcmV0dXJuIG51bGw7XHJcblxyXG4gIGlmIChmaW5kZXIubWFwKSBmb3VuZCA9IGZpbmRlck1hcChmb3VuZCwgZmluZGVyLm1hcCk7XHJcblxyXG4gIGlmIChmaW5kZXIucGF0aD8uYWZ0ZXIpIGZvdW5kID0gKEFycmF5LmlzQXJyYXkoZmluZGVyLnBhdGguYWZ0ZXIpID8gZmluZGVyLnBhdGguYWZ0ZXIubWFwKGkgPT4gXy5nZXQoZm91bmQsIGkpKS5maW5kKGkgPT4gaSkgOiBfLmdldChmb3VuZCwgZmluZGVyLnBhdGguYWZ0ZXIpKSB8fCBmb3VuZDtcclxuXHJcbiAgcmV0dXJuIGZvdW5kO1xyXG59XHJcblxyXG5cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsYXp5RmluZEJ5RmluZGVyKGZpbmRlciA9IHt9KSB7XHJcbiAgbGV0IGZvdW5kID0gYXdhaXQgbGF6eUZpbmQoZmluZGVyVG9GaWx0ZXIoZmluZGVyKSwgeyBzZWFyY2hFeHBvcnRzOiBmYWxzZSB9KTtcclxuXHJcbiAgaWYgKCFmb3VuZCkgcmV0dXJuIG51bGw7XHJcblxyXG4gIGlmIChmaW5kZXIucGF0aD8uYmVmb3JlKSBmb3VuZCA9IChBcnJheS5pc0FycmF5KGZpbmRlci5wYXRoLmJlZm9yZSkgPyBmaW5kZXIucGF0aC5iZWZvcmUubWFwKGkgPT4gXy5nZXQoZm91bmQsIGkpKS5maW5kKGkgPT4gaSkgOiBfLmdldChmb3VuZCwgZmluZGVyLnBhdGguYmVmb3JlKSkgfHwgZm91bmQ7XHJcbiAgaWYgKGZpbmRlci5hc3NpZ24pIGZvdW5kID0gT2JqZWN0LmFzc2lnbih7fSwgZm91bmQpO1xyXG5cclxuICBpZiAoIWZvdW5kKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgaWYgKGZpbmRlci5tYXApIGZvdW5kID0gZmluZGVyTWFwKGZvdW5kLCBmaW5kZXIubWFwKTtcclxuXHJcbiAgaWYgKGZpbmRlci5wYXRoPy5hZnRlcikgZm91bmQgPSAoQXJyYXkuaXNBcnJheShmaW5kZXIucGF0aC5hZnRlcikgPyBmaW5kZXIucGF0aC5hZnRlci5tYXAoaSA9PiBfLmdldChmb3VuZCwgaSkpLmZpbmQoaSA9PiBpKSA6IF8uZ2V0KGZvdW5kLCBmaW5kZXIucGF0aC5hZnRlcikpIHx8IGZvdW5kO1xyXG5cclxuICByZXR1cm4gZm91bmQ7XHJcbn0iLCAiaW1wb3J0ICogYXMgY29tcGxleEZpbmRlciBmcm9tIFwiLi9yYXcvY29tcGxleC1maW5kZXIuanNcIjtcclxuXHJcbmNvbnN0IGRlZmF1bHRCZWZvcmUgPSBbXHJcbiAgXCJleHBvcnRzLlpcIixcclxuICBcImV4cG9ydHMuWlBcIixcclxuICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gIFwiZXhwb3J0c1wiXHJcbl07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgX19jYWNoZV9fOiB7fSxcclxuICBnZXQgcmVxdWlyZSgpIHtcclxuICAgIGlmICh0aGlzLl9fY2FjaGVfXy5yZXF1aXJlKSByZXR1cm4gdGhpcy5fX2NhY2hlX18ucmVxdWlyZTtcclxuICAgIGxldCByZXFJZCA9IGBBY29yZFdlYnBhY2tNb2R1bGVzJHtEYXRlLm5vdygpfWA7XHJcbiAgICBjb25zdCByZXEgPSB3aW5kb3cud2VicGFja0NodW5rZGlzY29yZF9hcHAucHVzaChbW3JlcUlkXSwge30sIHJlcSA9PiByZXFdKTtcclxuICAgIGRlbGV0ZSByZXEubVtyZXFJZF07XHJcbiAgICBkZWxldGUgcmVxLmNbcmVxSWRdO1xyXG4gICAgd2luZG93LndlYnBhY2tDaHVua2Rpc2NvcmRfYXBwLnBvcCgpO1xyXG4gICAgdGhpcy5fX2NhY2hlX18ucmVxdWlyZSA9IHJlcTtcclxuICAgIHJldHVybiByZXE7XHJcbiAgfSxcclxuICBmaW5kKGZpbHRlciwgY29uZmlnID0ge30pIHtcclxuICAgIHJldHVybiBjb21wbGV4RmluZGVyLmZpbmQodGhpcy5yZXF1aXJlLCBjb21wbGV4RmluZGVyLndyYXBGaWx0ZXIoZmlsdGVyKSwgY29uZmlnKTtcclxuICB9LFxyXG4gIGxhenlGaW5kKGZpbHRlciwgY29uZmlnID0ge30pIHtcclxuICAgIHJldHVybiBjb21wbGV4RmluZGVyLmxhenlGaW5kKGNvbXBsZXhGaW5kZXIud3JhcEZpbHRlcihmaWx0ZXIpLCBjb25maWcpO1xyXG4gIH0sXHJcbiAgbGF6eUZpbmRCeUZpbmRlcihmaW5kZXIpIHtcclxuICAgIHJldHVybiBjb21wbGV4RmluZGVyLmxhenlGaW5kQnlGaW5kZXIoZmluZGVyKTtcclxuICB9LFxyXG4gIGZpbHRlcihmaWx0ZXIsIGNvbmZpZyA9IHt9KSB7XHJcbiAgICByZXR1cm4gY29tcGxleEZpbmRlci5maW5kKHRoaXMucmVxdWlyZSwgY29tcGxleEZpbmRlci53cmFwRmlsdGVyKGZpbHRlciksIHsgLi4uY29uZmlnLCBhbGw6IHRydWUgfSk7XHJcbiAgfSxcclxuICBmaW5kQnlGaW5kZXIoZmluZGVyKSB7XHJcbiAgICByZXR1cm4gY29tcGxleEZpbmRlci5maW5kQnlGaW5kZXIodGhpcy5yZXF1aXJlLCBmaW5kZXIpO1xyXG4gIH0sXHJcbiAgZmluZEJ5U3RyaW5nVmFsdWVzKC4uLnN0cmluZ1ZhbHVlcykge1xyXG4gICAgcmV0dXJuIHRoaXMuZmluZCgoYSkgPT4geyBsZXQgdmEgPSBPYmplY3QudmFsdWVzKGEpOyByZXR1cm4gc3RyaW5nVmFsdWVzLmV2ZXJ5KHggPT4gdmEuc29tZSh5ID0+IHR5cGVvZiB5ID09IFwic3RyaW5nXCIgJiYgeS5pbmNsdWRlcyh4KSkpIH0pPy5leHBvcnRzO1xyXG4gIH0sXHJcbiAgZmluZEJ5UHJvcGVydGllcyguLi5wcm9wcykge1xyXG4gICAgcmV0dXJuIHRoaXMuZmluZEJ5RmluZGVyKHtcclxuICAgICAgZmlsdGVyOiB7XHJcbiAgICAgICAgZXhwb3J0OiBmYWxzZSxcclxuICAgICAgICBpbjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgYnk6IFtwcm9wc11cclxuICAgICAgfSxcclxuICAgICAgcGF0aDoge1xyXG4gICAgICAgIGJlZm9yZTogZGVmYXVsdEJlZm9yZVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9LFxyXG4gIGZpbmRCeVByb3RvdHlwZXMoLi4ucHJvcHMpIHtcclxuICAgIHJldHVybiB0aGlzLmZpbmRCeUZpbmRlcih7XHJcbiAgICAgIGZpbHRlcjoge1xyXG4gICAgICAgIGV4cG9ydDogZmFsc2UsXHJcbiAgICAgICAgaW46IFwicHJvdG90eXBlc1wiLFxyXG4gICAgICAgIGJ5OiBbcHJvcHNdXHJcbiAgICAgIH0sXHJcbiAgICAgIHBhdGg6IHtcclxuICAgICAgICBiZWZvcmU6IGRlZmF1bHRCZWZvcmVcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSxcclxuICBmaW5kQnlTdHJpbmdzKC4uLnByb3BzKSB7XHJcbiAgICByZXR1cm4gdGhpcy5maW5kQnlGaW5kZXIoe1xyXG4gICAgICBmaWx0ZXI6IHtcclxuICAgICAgICBleHBvcnQ6IGZhbHNlLFxyXG4gICAgICAgIGluOiBcInN0cmluZ3NcIixcclxuICAgICAgICBieTogW3Byb3BzXVxyXG4gICAgICB9LFxyXG4gICAgICBwYXRoOiB7XHJcbiAgICAgICAgYmVmb3JlOiBkZWZhdWx0QmVmb3JlXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0sXHJcbn07IiwgImltcG9ydCBjb21tb25EYXRhIGZyb20gJy4uLy4uL2RhdGEvY29tbW9uLmpzb24nO1xyXG5pbXBvcnQgd2VicGFjayBmcm9tICcuL3dlYnBhY2suanMnO1xyXG5cclxuXHJcbmZ1bmN0aW9uIG1hcE9iamVjdCh0ZW1wLCBpbnApIHtcclxuICBpZiAoIXRlbXA/Ll9fY2FjaGVfXykgdGVtcC5fX2NhY2hlX18gPSB7fTtcclxuICBmb3IgKGNvbnN0IGtleSBpbiBpbnApIHtcclxuICAgIGlmIChpbnA/LltrZXldPy5fXyA9PT0gdHJ1ZSkge1xyXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGVtcCwga2V5LCB7XHJcbiAgICAgICAgZ2V0KCkge1xyXG4gICAgICAgICAgaWYgKHRlbXAuX19jYWNoZV9fW2tleV0pIHJldHVybiB0ZW1wLl9fY2FjaGVfX1trZXldO1xyXG4gICAgICAgICAgcmV0dXJuIHRlbXAuX19jYWNoZV9fW2tleV0gPSB3ZWJwYWNrLmZpbmRCeUZpbmRlcihpbnBba2V5XSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKHR5cGVvZiB0ZW1wW2tleV0gPT09IFwidW5kZWZpbmVkXCIpIHRlbXBba2V5XSA9IHt9O1xyXG4gICAgICBtYXBPYmplY3QodGVtcFtrZXldLCBpbnBba2V5XSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5cclxubGV0IGNvbW1vbiA9IHtcclxuICBfX2NhY2hlX186IHt9LFxyXG4gIExheWVyQWN0aW9uczoge1xyXG4gICAgcHVzaChjb21wb25lbnQpIHtcclxuICAgICAgY29tbW9uLkZsdXhEaXNwYXRjaGVyLmRpc3BhdGNoKHtcclxuICAgICAgICB0eXBlOiBcIkxBWUVSX1BVU0hcIixcclxuICAgICAgICBjb21wb25lbnRcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgcG9wKCkge1xyXG4gICAgICBjb21tb24uRmx1eERpc3BhdGNoZXIuZGlzcGF0Y2goe1xyXG4gICAgICAgIHR5cGU6IFwiTEFZRVJfUE9QXCJcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgcG9wQWxsKCkge1xyXG4gICAgICBjb21tb24uRmx1eERpc3BhdGNoZXIuZGlzcGF0Y2goe1xyXG4gICAgICAgIHR5cGU6IFwiTEFZRVJfUE9QX0FMTFwiXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0sXHJcbn07XHJcbm1hcE9iamVjdChjb21tb24sIGNvbW1vbkRhdGEuY29tbW9uKTtcclxue1xyXG4gIGxldCBwYXRocyA9IFtcclxuICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICBcImV4cG9ydHMuWlBcIixcclxuICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICBcImV4cG9ydHNcIlxyXG4gIF07XHJcbiAgd2VicGFjay5maWx0ZXIoKGkpID0+IGk/LmdldE5hbWU/LigpPy5lbmRzV2l0aD8uKFwiU3RvcmVcIiksIHsgZGVmYXVsdEV4cG9ydDogZmFsc2UgfSkuZm9yRWFjaCgobSkgPT4ge1xyXG4gICAgbGV0IG9iaiA9IHBhdGhzLm1hcChwYXRoID0+IF8uZ2V0KG0sIHBhdGgpKS5maW5kKGkgPT4gaSk7XHJcbiAgICBpZiAoIW9iaikgcmV0dXJuO1xyXG4gICAgbGV0IG5hbWUgPSBvYmo/LmdldE5hbWU/LigpO1xyXG4gICAgaWYgKCFuYW1lKSByZXR1cm47XHJcbiAgICBpZiAoY29tbW9uW25hbWVdKSByZXR1cm47XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvbW1vbiwgbmFtZSwge1xyXG4gICAgICBnZXQoKSB7XHJcbiAgICAgICAgaWYgKGNvbW1vbi5fX2NhY2hlX19bbmFtZV0pIHJldHVybiBjb21tb24uX19jYWNoZV9fW25hbWVdO1xyXG4gICAgICAgIHJldHVybiBjb21tb24uX19jYWNoZV9fW25hbWVdID0gb2JqO1xyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbW1vbjsiLCAiaW1wb3J0IGNvbW1vbiBmcm9tIFwiLi9jb21tb24uanNcIjtcclxuaW1wb3J0IHdlYnBhY2sgZnJvbSBcIi4vd2VicGFjay5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGNvbW1vbixcclxuICB3ZWJwYWNrLFxyXG4gIHJlcXVpcmU6IGdsb2JhbFRoaXNbXCI8UFJFTE9BRF9LRVk+XCJdLnJlcXVpcmUsXHJcbiAgbmF0aXZlOiBEaXNjb3JkTmF0aXZlLFxyXG59IiwgImltcG9ydCBtb2R1bGVzIGZyb20gXCIuLi9tb2R1bGVzL2luZGV4LmpzXCJcclxuaW1wb3J0IHV0aWxzIGZyb20gXCIuLi91dGlscy9pbmRleC5qc1wiO1xyXG5cclxuY29uc3QgQkFTRV9VUkwgPSBcImh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9hY29yZC1zdGFuZGFsb25lL2Fzc2V0cy9tYWluL2kxOG5cIjtcclxuY29uc3Qgbm9TdG9yZSA9IHsgY2FjaGU6IFwibm8tc3RvcmVcIiB9O1xyXG5cclxuXHJcbmNvbnN0IG91dCA9IHtcclxuICBfX2NhY2hlX186IHtcclxuICAgIGxvY2FsZUlkczogW10sXHJcbiAgICBsb2NhbGl6YXRpb25zOiB7fVxyXG4gIH0sXHJcbiAgZ2V0IGxvY2FsZSgpIHtcclxuICAgIHJldHVybiBtb2R1bGVzLmNvbW1vbi5pMThuLl9yZXF1ZXN0ZWRMb2NhbGU7XHJcbiAgfSxcclxuICBnZXQoa2V5KSB7XHJcbiAgICBjaGVjaygpO1xyXG4gICAgcmV0dXJuIG91dC5fX2NhY2hlX18ubG9jYWxpemF0aW9uc1tvdXQubG9jYWxlXT8uW2tleV1cclxuICAgICAgfHwgb3V0Ll9fY2FjaGVfXy5sb2NhbGl6YXRpb25zLmRlZmF1bHQ/LltrZXldXHJcbiAgICAgIHx8IG1vZHVsZXMuY29tbW9uLmkxOG4uTWVzc2FnZXNba2V5XVxyXG4gICAgICB8fCBrZXk7XHJcbiAgfSxcclxuICBtZXNzYWdlczogbmV3IFByb3h5KHt9LCB7XHJcbiAgICBnZXQoXywgcHJvcCkge1xyXG4gICAgICByZXR1cm4gb3V0LmdldChwcm9wKTtcclxuICAgIH1cclxuICB9KSxcclxuICBsb2NhbGl6ZShzdHIsIC4uLmFyZ3MpIHtcclxuICAgIGlmICh0eXBlb2Ygc3RyID09PSBcInN0cmluZ1wiKSByZXR1cm4gdXRpbHMuZm9ybWF0KHN0ciwgLi4uYXJncyk7XHJcbiAgICBsZXQgdmFsID0gc3RyPy5bb3V0LmxvY2FsZV1cclxuICAgICAgfHwgc3RyPy5kZWZhdWx0XHJcbiAgICAgIHx8IE9iamVjdC52YWx1ZXMoc3RyKVswXTtcclxuICAgIGlmICghdmFsKSByZXR1cm4gbnVsbDtcclxuICAgIHJldHVybiB1dGlscy5mb3JtYXQodmFsLCAuLi5hcmdzKTtcclxuICB9LFxyXG4gIGZvcm1hdChrZXksIC4uLmFyZ3MpIHtcclxuICAgIHJldHVybiB1dGlscy5mb3JtYXQob3V0LmdldChrZXkpLCAuLi5hcmdzKTtcclxuICB9XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGNoZWNrKCkge1xyXG4gIGNvbnN0IGxvY2FsZSA9IG91dC5sb2NhbGU7XHJcbiAgaWYgKCFvdXQuX19jYWNoZV9fLmxvY2FsZUlkcy5sZW5ndGgpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIG91dC5fX2NhY2hlX18ubG9jYWxlSWRzID0gYXdhaXQgKGF3YWl0IGZldGNoKGAke0JBU0VfVVJMfS9sb2NhbGVzLmpzb25gLCBub1N0b3JlKSkuanNvbigpO1xyXG4gICAgfSBjYXRjaCB7IH1cclxuICAgIHRyeSB7XHJcbiAgICAgIG91dC5fX2NhY2hlX18ubG9jYWxpemF0aW9ucy5kZWZhdWx0ID0gYXdhaXQgKGF3YWl0IGZldGNoKGAke0JBU0VfVVJMfS9kZWZhdWx0Lmpzb25gLCBub1N0b3JlKSkuanNvbigpO1xyXG4gICAgfSBjYXRjaCB7IH1cclxuICB9XHJcbiAgaWYgKFxyXG4gICAgb3V0Ll9fY2FjaGVfXy5sb2NhbGVJZHMuaW5jbHVkZXMobG9jYWxlKVxyXG4gICAgJiYgIW91dC5fX2NhY2hlX18ubG9jYWxpemF0aW9ucz8uW2xvY2FsZV1cclxuICApIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIG91dC5fX2NhY2hlX18ubG9jYWxpemF0aW9uc1tsb2NhbGVdID0gYXdhaXQgKGF3YWl0IGZldGNoKGAke0JBU0VfVVJMfS8ke2xvY2FsZX0uanNvbmAsIG5vU3RvcmUpKS5qc29uKCk7XHJcbiAgICB9IGNhdGNoIHsgfTtcclxuICB9XHJcbn1cclxuXHJcbmNoZWNrKCk7XHJcbmV4cG9ydCBkZWZhdWx0IG91dDsiLCAiaW1wb3J0IG1vZHVsZXMgZnJvbSBcIi4uL2FwaS9tb2R1bGVzL2luZGV4LmpzXCI7XHJcbmltcG9ydCBpMThuIGZyb20gXCIuLi9hcGkvaTE4bi9pbmRleC5qc1wiO1xyXG5cclxubGV0IGlzQ29ubmVjdGlvbk9wZW4gPSBmYWxzZTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB3YWl0VW50aWxDb25uZWN0aW9uT3BlbigpIHtcclxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuICAgIGlmIChpc0Nvbm5lY3Rpb25PcGVuKSByZXR1cm4gcmVzb2x2ZSh0cnVlKTtcclxuICAgIGZ1bmN0aW9uIG9uRXZlbnQoKSB7XHJcbiAgICAgIG1vZHVsZXMuY29tbW9uLkZsdXhEaXNwYXRjaGVyLnVuc3Vic2NyaWJlKFwiQ09OTkVDVElPTl9PUEVOXCIsIG9uRXZlbnQpO1xyXG4gICAgICBpc0Nvbm5lY3Rpb25PcGVuID0gdHJ1ZTtcclxuICAgICAgcmVzb2x2ZSh0cnVlKTtcclxuICAgIH1cclxuICAgIG1vZHVsZXMuY29tbW9uLkZsdXhEaXNwYXRjaGVyLnN1YnNjcmliZShcIkNPTk5FQ1RJT05fT1BFTlwiLCBvbkV2ZW50KTtcclxuICB9KTtcclxufVxyXG4iLCAiZXhwb3J0IGNsYXNzIEJhc2ljRXZlbnRFbWl0dGVyIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIC8qKiBAdHlwZSB7TWFwPHN0cmluZywgTWFwPCguLi5hcmdzOiBhbnlbXSk9PnZvaWQsIHtvbmNlOiBib29sZWFufT4+fSAqL1xyXG4gICAgdGhpcy5saXN0ZW5lcnMgPSBuZXcgTWFwKCk7XHJcbiAgfVxyXG5cclxuICBfcHJlcGFyZUxpc3RlbmVyc01hcChldmVudE5hbWUpIHtcclxuICAgIGlmICghdGhpcy5saXN0ZW5lcnMuaGFzKGV2ZW50TmFtZSkpXHJcbiAgICAgIHRoaXMubGlzdGVuZXJzLnNldChldmVudE5hbWUsIG5ldyBNYXAoKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnROYW1lXHJcbiAgICogQHBhcmFtIHsoLi4uYXJnczogYW55W10pPT52b2lkfSBsaXN0ZW5lclxyXG4gICAqL1xyXG4gIG9uKGV2ZW50TmFtZSwgbGlzdGVuZXIpIHtcclxuICAgIHRoaXMuX3ByZXBhcmVMaXN0ZW5lcnNNYXAoZXZlbnROYW1lKTtcclxuICAgIHRoaXMubGlzdGVuZXJzLmdldChldmVudE5hbWUpLnNldChsaXN0ZW5lciwgeyBvbmNlOiBmYWxzZSB9KTtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIHRoaXMubGlzdGVuZXJzLmdldChldmVudE5hbWUpLmRlbGV0ZShsaXN0ZW5lcik7XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50TmFtZVxyXG4gICAqIEBwYXJhbSB7KC4uLmFyZ3M6IGFueVtdKT0+dm9pZH0gbGlzdGVuZXJcclxuICAgKi9cclxuICBvbmNlKGV2ZW50TmFtZSwgbGlzdGVuZXIpIHtcclxuICAgIHRoaXMuX3ByZXBhcmVMaXN0ZW5lcnNNYXAoZXZlbnROYW1lKTtcclxuICAgIHRoaXMubGlzdGVuZXJzLmdldChldmVudE5hbWUpPy5zZXQobGlzdGVuZXIsIHsgb25jZTogdHJ1ZSB9KTtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIHRoaXMubGlzdGVuZXJzLmdldChldmVudE5hbWUpLmRlbGV0ZShsaXN0ZW5lcik7XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtzdHJpbmc/fSBldmVudE5hbWVcclxuICAgKiBAcGFyYW0geygoLi4uYXJnczogYW55W10pPT52b2lkKT99IGxpc3RlbmVyXHJcbiAgICovXHJcbiAgb2ZmKGV2ZW50TmFtZSwgbGlzdGVuZXIpIHtcclxuICAgIGlmICghZXZlbnROYW1lKSByZXR1cm4gKHRoaXMubGlzdGVuZXJzID0gbmV3IE1hcCgpKTtcclxuICAgIGlmICghbGlzdGVuZXIpIHJldHVybiB0aGlzLmxpc3RlbmVycz8uZGVsZXRlKGV2ZW50TmFtZSk7XHJcbiAgICB0aGlzLmxpc3RlbmVycy5nZXQoZXZlbnROYW1lKT8uZGVsZXRlKGxpc3RlbmVyKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudE5hbWVcclxuICAgKiBAcGFyYW0gIHsuLi5hbnl9IGFyZ3NcclxuICAgKi9cclxuICBlbWl0KGV2ZW50TmFtZSwgLi4uYXJncykge1xyXG4gICAgaWYgKCF0aGlzLmxpc3RlbmVycy5oYXMoZXZlbnROYW1lKSkgcmV0dXJuO1xyXG4gICAgbGV0IGV2ZW50TWFwID0gdGhpcy5saXN0ZW5lcnMuZ2V0KGV2ZW50TmFtZSk7XHJcbiAgICBldmVudE1hcC5mb3JFYWNoKCh7IG9uY2UgfSwgbGlzdGVuZXIpID0+IHtcclxuICAgICAgaWYgKG9uY2UpIGV2ZW50TWFwPy5kZWxldGUobGlzdGVuZXIpO1xyXG4gICAgICBsaXN0ZW5lciguLi5hcmdzKTtcclxuICAgIH0pO1xyXG4gIH1cclxufTtcclxuIiwgImltcG9ydCB7IEJhc2ljRXZlbnRFbWl0dGVyIH0gZnJvbSBcIi4uLy4uL2xpYi9CYXNpY0V2ZW50RW1pdHRlci5qc1wiO1xyXG5cclxuY29uc3QgZXZlbnRzID0gbmV3IEJhc2ljRXZlbnRFbWl0dGVyKCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBldmVudHM7IiwgImltcG9ydCBldmVudHMgZnJvbSBcIi4uL2V2ZW50c1wiO1xyXG5pbXBvcnQgd2VicGFjayBmcm9tIFwiLi4vbW9kdWxlcy93ZWJwYWNrLmpzXCI7XHJcblxyXG5jb25zdCBzY3JvbGxiYXJDbGFzc2VzID0gd2VicGFjay5maW5kQnlQcm9wZXJ0aWVzKFwic2Nyb2xsYmFyR2hvc3RIYWlybGluZVwiLCBcInNwaW5uZXJcIik7XHJcblxyXG5jb25zdCBmb3JtYXRSZWdleGVzID0ge1xyXG4gIGJvbGQ6IC9cXCpcXCooW14qXSspXFwqXFwqL2csXHJcbiAgaXRhbGljOiAvXFwqKFteKl0rKVxcKi9nLFxyXG4gIHVuZGVybGluZTogL1xcXyhbXipdKylcXF8vZyxcclxuICBzdHJpa2U6IC9cXH5cXH4oW14qXSspXFx+XFx+L2csXHJcbiAgdXJsOiAvKFxcYihodHRwcz98ZnRwfGZpbGUpOlxcL1xcL1stQS1aMC05KyZAI1xcLyU/PX5ffCE6LC47XSpbLUEtWjAtOSsmQCNcXC8lPX5ffF0pL2lnLFxyXG4gIGlubGluZTogL1xcYChbXipdKylcXGAvZyxcclxuICBjb2RlYmxvY2tTaW5nbGU6IC9cXGBcXGBcXGAoW14qXSspXFxgXFxgXFxgL2csXHJcbiAgY29kZWJsb2NrTXVsdGk6IC9cXGBcXGBcXGAoXFx3KylcXG4oKD86KD8hXFxgXFxgXFxgKVtcXHNcXFNdKSopXFxgXFxgXFxgL2dcclxufVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBwYXJzZShodG1sKSB7XHJcbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGRpdi5pbm5lckhUTUwgPSBodG1sO1xyXG4gICAgcmV0dXJuIGRpdi5maXJzdEVsZW1lbnRDaGlsZDtcclxuICB9LFxyXG4gIHRvQ1NTUHJvcChvKSB7XHJcbiAgICBsZXQgZWxtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIE9iamVjdC5lbnRyaWVzKG8pLmZvckVhY2goKGkpID0+IHtcclxuICAgICAgaWYgKGVsbS5zdHlsZS5oYXNPd25Qcm9wZXJ0eShpWzBdKSkge1xyXG4gICAgICAgIGVsbS5zdHlsZVtpWzBdXSA9IGlbMV07XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZWxtLnN0eWxlLnNldFByb3BlcnR5KGlbMF0sIGlbMV0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBlbG0uZ2V0QXR0cmlidXRlKFwic3R5bGVcIik7XHJcbiAgfSxcclxuICB0b0hUTUxQcm9wcyhvKSB7XHJcbiAgICByZXR1cm4gT2JqZWN0LmVudHJpZXMobylcclxuICAgICAgLm1hcChcclxuICAgICAgICAoaSkgPT5cclxuICAgICAgICAgIGAke2lbMF0ucmVwbGFjZSgvICsvLCBcIi1cIil9PVwiJHtpWzBdID09IFwic3R5bGVcIiAmJiB0eXBlb2YgaVsxXSAhPSBcInN0cmluZ1wiXHJcbiAgICAgICAgICAgID8gdGhpcy50b0NTU1Byb3AoaVsxXSlcclxuICAgICAgICAgICAgOiB0aGlzLmVzY2FwZUhUTUwoaVsxXSl9XCJgXHJcbiAgICAgIClcclxuICAgICAgLmpvaW4oXCIgXCIpO1xyXG4gIH0sXHJcbiAgZXNjYXBlKGh0bWwpIHtcclxuICAgIHJldHVybiBuZXcgT3B0aW9uKGh0bWwpLmlubmVySFRNTDtcclxuICB9LFxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gZWxtIFxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gc2VsZWN0b3JPck51bWJlciBcclxuICAgKiBAcmV0dXJucyB7RWxlbWVudFtdfVxyXG4gICAqL1xyXG4gIHBhcmVudHMoZWxtLCBzZWxlY3Rvck9yTnVtYmVyKSB7XHJcbiAgICBsZXQgcGFyZW50cyA9IFtdO1xyXG4gICAgaWYgKHR5cGVvZiBzZWxlY3Rvck9yTnVtYmVyID09PSBcIm51bWJlclwiKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VsZWN0b3JPck51bWJlcjsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGVsbS5wYXJlbnRFbGVtZW50KSB7XHJcbiAgICAgICAgICBlbG0gPSBlbG0ucGFyZW50RWxlbWVudDtcclxuICAgICAgICAgIHBhcmVudHMucHVzaChlbG0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgd2hpbGUgKGVsbS5wYXJlbnRFbGVtZW50ICYmIGVsbS5wYXJlbnRFbGVtZW50LmNsb3Nlc3Qoc2VsZWN0b3JPck51bWJlcikpIHtcclxuICAgICAgICBlbG0gPSBlbG0ucGFyZW50RWxlbWVudC5jbG9zZXN0KHNlbGVjdG9yT3JOdW1iZXIpO1xyXG4gICAgICAgIHBhcmVudHMucHVzaChlbG0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcGFyZW50cztcclxuICB9LFxyXG4gIC8qKlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvciBcclxuICAgKiBAcGFyYW0geyhlbGVtZW50OiBIVE1MRGl2RWxlbWVudCk9PigoKT0+dm9pZCl9IGNiIFxyXG4gICAqIEByZXR1cm5zIHsoKT0+dm9pZH1cclxuICAgKi9cclxuICBwYXRjaDogKHNlbGVjdG9yLCBjYikgPT5cclxuICAgICgoKSA9PiB7XHJcbiAgICAgIGZ1bmN0aW9uIG5vZGVBZGRlZChub2RlKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBub2RlPy5xdWVyeVNlbGVjdG9yQWxsICE9IFwiZnVuY3Rpb25cIikgcmV0dXJuO1xyXG4gICAgICAgIG5vZGUucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikuZm9yRWFjaChhc3luYyAoZWxtKSA9PiB7XHJcbiAgICAgICAgICBpZiAoIWVsbS5hY29yZCkge1xyXG4gICAgICAgICAgICBlbG0uYWNvcmQgPSB7IHVubW91bnQ6IFtdLCBwYXRjaGVkOiBuZXcgU2V0KCkgfTtcclxuICAgICAgICAgICAgZWxtLmNsYXNzTGlzdC5hZGQoXCJhY29yZC0tcGF0Y2hlZFwiKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoZWxtLmFjb3JkLnBhdGNoZWQuaGFzKGNiKSkgcmV0dXJuO1xyXG4gICAgICAgICAgZWxtLmFjb3JkLnBhdGNoZWQuYWRkKGNiKTtcclxuXHJcbiAgICAgICAgICBsZXQgdW5QYXRjaENiID0gYXdhaXQgY2IoZWxtKTtcclxuICAgICAgICAgIGlmICh0eXBlb2YgdW5QYXRjaENiID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgICAgIGVsbS5hY29yZC51bm1vdW50LnB1c2godW5QYXRjaENiKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgZnVuY3Rpb24gbm9kZVJlbW92ZWQobm9kZSkge1xyXG4gICAgICAgIGlmICh0eXBlb2Ygbm9kZT8ucXVlcnlTZWxlY3RvckFsbCAhPSBcImZ1bmN0aW9uXCIpIHJldHVybjtcclxuICAgICAgICBub2RlLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpLmZvckVhY2goYXN5bmMgKGVsbSkgPT4ge1xyXG4gICAgICAgICAgaWYgKCFlbG0uYWNvcmQpIHJldHVybjtcclxuICAgICAgICAgIGVsbS5hY29yZC51bm1vdW50LmZvckVhY2goKGYpID0+IGYoKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpLmZvckVhY2gobm9kZUFkZGVkKTtcclxuXHJcbiAgICAgIHJldHVybiBldmVudHMub24oXHJcbiAgICAgICAgXCJkb20tbXV0YXRpb25cIixcclxuICAgICAgICAvKiogQHBhcmFtIHtNdXRhdGlvblJlY29yZH0gbXV0ICovKG11dCkgPT4ge1xyXG4gICAgICAgICAgaWYgKG11dC50eXBlID09PSBcImNoaWxkTGlzdFwiKSB7XHJcbiAgICAgICAgICAgIG11dC5hZGRlZE5vZGVzLmZvckVhY2gobm9kZUFkZGVkKTtcclxuICAgICAgICAgICAgbXV0LnJlbW92ZWROb2Rlcy5mb3JFYWNoKG5vZGVSZW1vdmVkKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICk7XHJcbiAgICB9KSgpLFxyXG4gIGZvcm1hdENvbnRlbnQobXNnKSB7XHJcbiAgICBpZiAoIW1zZykgcmV0dXJuICcnO1xyXG4gICAgY29uc3QgeyBib2xkLCBpdGFsaWMsIHVuZGVybGluZSwgc3RyaWtlLCBjb2RlYmxvY2tNdWx0aSwgY29kZWJsb2NrU2luZ2xlLCBpbmxpbmUsIHVybCB9ID0gZm9ybWF0UmVnZXhlcztcclxuXHJcbiAgICBjb25zdCBjb2RlQmxvY2tzTWFwID0gT2JqZWN0LmZyb21FbnRyaWVzKFtcclxuICAgICAgLi4uKG1zZy5tYXRjaEFsbChjb2RlYmxvY2tNdWx0aSkgfHwgW10pLCAuLi4obXNnLm1hdGNoQWxsKGNvZGVibG9ja1NpbmdsZSkgfHwgW10pXHJcbiAgICBdLm1hcChcclxuICAgICAgKFtfLCBjb2RlQmxvY2tPckNvZGUsIGNvZGVCbG9ja0NvbnRlbnRdLCBpKSA9PiB7XHJcbiAgICAgICAgbXNnID0gbXNnLnJlcGxhY2UoXywgYHt7Q09ERUJMT0NLXyR7aX19fWApO1xyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICBge3tDT0RFQkxPQ0tfJHtpfX19YCxcclxuICAgICAgICAgIGNvZGVCbG9ja0NvbnRlbnQgP1xyXG4gICAgICAgICAgICBgPHByZT48Y29kZSBjbGFzcz1cIiR7c2Nyb2xsYmFyQ2xhc3Nlcy5zY3JvbGxiYXJHaG9zdEhhaXJsaW5lfSBobGpzICR7Y29kZUJsb2NrT3JDb2RlfVwiIHN0eWxlPVwicG9zaXRpb246IHJlbGF0aXZlO1wiPiR7bW9kdWxlcy5jb21tb24uaGxqcy5oaWdobGlnaHQoY29kZUJsb2NrT3JDb2RlLCBjb2RlQmxvY2tDb250ZW50KS52YWx1ZX08L2NvZGU+PC9wcmU+YCA6XHJcbiAgICAgICAgICAgIGA8cHJlPjxjb2RlIGNsYXNzPVwiJHtzY3JvbGxiYXJDbGFzc2VzLnNjcm9sbGJhckdob3N0SGFpcmxpbmV9IGhsanNcIiBzdHlsZT1cInBvc2l0aW9uOiByZWxhdGl2ZTtcIj4ke2NvZGVCbG9ja09yQ29kZX08L2NvZGU+PC9wcmU+YFxyXG4gICAgICAgIF07XHJcbiAgICAgIH1cclxuICAgICkpO1xyXG5cclxuICAgIGNvbnN0IGlubGluZU1hcCA9IE9iamVjdC5mcm9tRW50cmllcyhcclxuICAgICAgWy4uLihtc2cubWF0Y2hBbGwoaW5saW5lKSB8fCBbXSldLm1hcChcclxuICAgICAgICAoW18sIGlubGluZUNvbnRlbnRdLCBpKSA9PiB7XHJcbiAgICAgICAgICBtc2cgPSBtc2cucmVwbGFjZShfLCBge3tJTkxJTkVfJHtpfX19YCk7XHJcbiAgICAgICAgICByZXR1cm4gW2B7e0lOTElORV8ke2l9fX1gLCBgPGNvZGUgY2xhc3M9XCJpbmxpbmVcIj4ke2lubGluZUNvbnRlbnR9PC9jb2RlPmBdO1xyXG4gICAgICAgIH1cclxuICAgICAgKVxyXG4gICAgKTtcclxuXHJcbiAgICBtc2cgPSBtc2cucmVwbGFjZShib2xkLCBcIjxiPiQxPC9iPlwiKVxyXG4gICAgICAucmVwbGFjZShpdGFsaWMsIFwiPGk+JDE8L2k+XCIpXHJcbiAgICAgIC5yZXBsYWNlKHVuZGVybGluZSwgXCI8VT4kMTwvVT5cIilcclxuICAgICAgLnJlcGxhY2Uoc3RyaWtlLCBcIjxzPiQxPC9zPlwiKVxyXG4gICAgICAucmVwbGFjZSh1cmwsICc8YSBocmVmPVwiJDFcIj4kMTwvYT4nKTtcclxuXHJcbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhjb2RlQmxvY2tzTWFwKSkge1xyXG4gICAgICBtc2cgPSBtc2cucmVwbGFjZShrZXksIHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhpbmxpbmVNYXApKSB7XHJcbiAgICAgIG1zZyA9IG1zZy5yZXBsYWNlKGtleSwgdmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBtc2c7XHJcbiAgfSxcclxuICByZXNvbHZlKGh0bWxPckVsbSkge1xyXG4gICAgaWYgKGh0bWxPckVsbSBpbnN0YW5jZW9mIEVsZW1lbnQpIHJldHVybiBodG1sT3JFbG07XHJcbiAgICByZXR1cm4gdGhpcy5wYXJzZShodG1sT3JFbG0pO1xyXG4gIH1cclxufVxyXG5cclxue1xyXG4gIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKG11dGF0aW9ucykgPT4ge1xyXG4gICAgbXV0YXRpb25zLmZvckVhY2goKG11dGF0aW9uKSA9PiB7XHJcbiAgICAgIGV2ZW50cy5lbWl0KFwiZG9tLW11dGF0aW9uXCIsIG11dGF0aW9uKTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG4gIG9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQsIHtcclxuICAgIGF0dHJpYnV0ZXM6IHRydWUsXHJcbiAgICBjaGlsZExpc3Q6IHRydWUsXHJcbiAgICBzdWJ0cmVlOiB0cnVlXHJcbiAgfSk7XHJcbn0iLCAiLy8gd2UgdXNlIHRoaXMgYXJyYXkgbXVsdGlwbGUgdGltZXNcclxuZXhwb3J0IGNvbnN0IHBhdGNoVHlwZXMgPSBbXCJhXCIsIFwiYlwiLCBcImlcIl07XHJcbmV4cG9ydCBjb25zdCBwYXRjaGVkT2JqZWN0cyA9IG5ldyBNYXAoKTtcclxuIiwgIi8vIGNhbGxzIHJlbGV2YW50IHBhdGNoZXMgYW5kIHJldHVybnMgdGhlIGZpbmFsIHJlc3VsdFxyXG5pbXBvcnQgeyBwYXRjaGVkT2JqZWN0cyB9IGZyb20gXCIuL3NoYXJlZC5qc1wiO1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoZnVuY05hbWUsIGZ1bmNQYXJlbnQsIGZ1bmNBcmdzLCBcclxuLy8gdGhlIHZhbHVlIG9mIGB0aGlzYCB0byBhcHBseVxyXG5jdHh0LCBcclxuLy8gaWYgdHJ1ZSwgdGhlIGZ1bmN0aW9uIGlzIGFjdHVhbGx5IGNvbnN0cnVjdG9yXHJcbmlzQ29uc3RydWN0KSB7XHJcbiAgICBjb25zdCBwYXRjaCA9IHBhdGNoZWRPYmplY3RzLmdldChmdW5jUGFyZW50KT8uW2Z1bmNOYW1lXTtcclxuICAgIC8vIFRoaXMgaXMgaW4gdGhlIGV2ZW50IHRoYXQgdGhpcyBmdW5jdGlvbiBpcyBiZWluZyBjYWxsZWQgYWZ0ZXIgYWxsIHBhdGNoZXMgYXJlIHJlbW92ZWQuXHJcbiAgICBpZiAoIXBhdGNoKVxyXG4gICAgICAgIHJldHVybiBpc0NvbnN0cnVjdFxyXG4gICAgICAgICAgICA/IFJlZmxlY3QuY29uc3RydWN0KGZ1bmNQYXJlbnRbZnVuY05hbWVdLCBmdW5jQXJncywgY3R4dClcclxuICAgICAgICAgICAgOiBmdW5jUGFyZW50W2Z1bmNOYW1lXS5hcHBseShjdHh0LCBmdW5jQXJncyk7XHJcbiAgICAvLyBCZWZvcmUgcGF0Y2hlc1xyXG4gICAgZm9yIChjb25zdCBob29rIG9mIHBhdGNoLmIudmFsdWVzKCkpIHtcclxuICAgICAgICBjb25zdCBtYXliZWZ1bmNBcmdzID0gaG9vay5jYWxsKGN0eHQsIGZ1bmNBcmdzKTtcclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShtYXliZWZ1bmNBcmdzKSlcclxuICAgICAgICAgICAgZnVuY0FyZ3MgPSBtYXliZWZ1bmNBcmdzO1xyXG4gICAgfVxyXG4gICAgLy8gSW5zdGVhZCBwYXRjaGVzXHJcbiAgICBsZXQgaW5zdGVhZFBhdGNoZWRGdW5jID0gKC4uLmFyZ3MpID0+IGlzQ29uc3RydWN0XHJcbiAgICAgICAgPyBSZWZsZWN0LmNvbnN0cnVjdChwYXRjaC5vLCBhcmdzLCBjdHh0KVxyXG4gICAgICAgIDogcGF0Y2guby5hcHBseShjdHh0LCBhcmdzKTtcclxuICAgIGZvciAoY29uc3QgY2FsbGJhY2sgb2YgcGF0Y2guaS52YWx1ZXMoKSkge1xyXG4gICAgICAgIGNvbnN0IG9sZFBhdGNoRnVuYyA9IGluc3RlYWRQYXRjaGVkRnVuYztcclxuICAgICAgICBpbnN0ZWFkUGF0Y2hlZEZ1bmMgPSAoLi4uYXJncykgPT4gY2FsbGJhY2suY2FsbChjdHh0LCBhcmdzLCBvbGRQYXRjaEZ1bmMpO1xyXG4gICAgfVxyXG4gICAgbGV0IHdvcmtpbmdSZXRWYWwgPSBpbnN0ZWFkUGF0Y2hlZEZ1bmMoLi4uZnVuY0FyZ3MpO1xyXG4gICAgLy8gQWZ0ZXIgcGF0Y2hlc1xyXG4gICAgZm9yIChjb25zdCBob29rIG9mIHBhdGNoLmEudmFsdWVzKCkpXHJcbiAgICAgICAgd29ya2luZ1JldFZhbCA9IGhvb2suY2FsbChjdHh0LCBmdW5jQXJncywgd29ya2luZ1JldFZhbCkgPz8gd29ya2luZ1JldFZhbDtcclxuICAgIHJldHVybiB3b3JraW5nUmV0VmFsO1xyXG59XHJcbiIsICJpbXBvcnQgeyBwYXRjaGVkT2JqZWN0cywgcGF0Y2hUeXBlcyB9IGZyb20gXCIuL3NoYXJlZC5qc1wiO1xyXG5leHBvcnQgZnVuY3Rpb24gdW5QYXRjaChmdW5jUGFyZW50LCBmdW5jTmFtZSwgaG9va0lkLCB0eXBlKSB7XHJcbiAgICBjb25zdCBwYXRjaGVkT2JqZWN0ID0gcGF0Y2hlZE9iamVjdHMuZ2V0KGZ1bmNQYXJlbnQpO1xyXG4gICAgY29uc3QgcGF0Y2ggPSBwYXRjaGVkT2JqZWN0Py5bZnVuY05hbWVdO1xyXG4gICAgaWYgKCFwYXRjaD8uW3R5cGVdLmhhcyhob29rSWQpKVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIHBhdGNoW3R5cGVdLmRlbGV0ZShob29rSWQpO1xyXG4gICAgLy8gSWYgdGhlcmUgYXJlIG5vIG1vcmUgaG9va3MgZm9yIGV2ZXJ5IHR5cGUsIHJlbW92ZSB0aGUgcGF0Y2hcclxuICAgIGlmIChwYXRjaFR5cGVzLmV2ZXJ5KCh0KSA9PiBwYXRjaFt0XS5zaXplID09PSAwKSkge1xyXG4gICAgICAgIC8vIHJlZmxlY3QgZGVmaW5lcHJvcGVydHkgaXMgbGlrZSBvYmplY3QgZGVmaW5lcHJvcGVydHlcclxuICAgICAgICAvLyBidXQgaW5zdGVhZCBvZiBlcnJvcmluZyBpdCByZXR1cm5zIGlmIGl0IHdvcmtlZCBvciBub3QuXHJcbiAgICAgICAgLy8gdGhpcyBpcyBtb3JlIGVhc2lseSBtaW5pZmlhYmxlLCBoZW5jZSBpdHMgdXNlLiAtLSBzaW5rXHJcbiAgICAgICAgY29uc3Qgc3VjY2VzcyA9IFJlZmxlY3QuZGVmaW5lUHJvcGVydHkoZnVuY1BhcmVudCwgZnVuY05hbWUsIHtcclxuICAgICAgICAgICAgdmFsdWU6IHBhdGNoLm8sXHJcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKCFzdWNjZXNzKVxyXG4gICAgICAgICAgICBmdW5jUGFyZW50W2Z1bmNOYW1lXSA9IHBhdGNoLm87XHJcbiAgICAgICAgZGVsZXRlIHBhdGNoZWRPYmplY3RbZnVuY05hbWVdO1xyXG4gICAgfVxyXG4gICAgaWYgKE9iamVjdC5rZXlzKHBhdGNoZWRPYmplY3QpLmxlbmd0aCA9PSAwKVxyXG4gICAgICAgIHBhdGNoZWRPYmplY3RzLmRlbGV0ZShmdW5jUGFyZW50KTtcclxuICAgIHJldHVybiB0cnVlO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiB1blBhdGNoQWxsKCkge1xyXG4gICAgZm9yIChjb25zdCBbcGFyZW50T2JqZWN0LCBwYXRjaGVkT2JqZWN0XSBvZiBwYXRjaGVkT2JqZWN0cy5lbnRyaWVzKCkpXHJcbiAgICAgICAgZm9yIChjb25zdCBmdW5jTmFtZSBpbiBwYXRjaGVkT2JqZWN0KVxyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGhvb2tUeXBlIG9mIHBhdGNoVHlwZXMpXHJcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGhvb2tJZCBvZiBwYXRjaGVkT2JqZWN0W2Z1bmNOYW1lXT8uW2hvb2tUeXBlXS5rZXlzKCkgPz8gW10pXHJcbiAgICAgICAgICAgICAgICAgICAgdW5QYXRjaChwYXJlbnRPYmplY3QsIGZ1bmNOYW1lLCBob29rSWQsIGhvb2tUeXBlKTtcclxufVxyXG4iLCAiLy8gY3VycmllZCAtIGdldFBhdGNoRnVuYyhcImJlZm9yZVwiKSguLi4pXHJcbi8vIGFsbG93cyB1cyB0byBhcHBseSBhbiBhcmd1bWVudCB3aGlsZSBsZWF2aW5nIHRoZSByZXN0IG9wZW4gbXVjaCBjbGVhbmVyLlxyXG4vLyBmdW5jdGlvbmFsIHByb2dyYW1taW5nIHN0cmlrZXMgYWdhaW4hIC0tIHNpbmtcclxuaW1wb3J0IGhvb2sgZnJvbSBcIi4vaG9vay5qc1wiO1xyXG5pbXBvcnQgeyBwYXRjaGVkT2JqZWN0cyB9IGZyb20gXCIuL3NoYXJlZC5qc1wiO1xyXG5pbXBvcnQgeyB1blBhdGNoIH0gZnJvbSBcIi4vdW4tcGF0Y2guanNcIjtcclxuLy8gY3JlYXRlcyBhIGhvb2sgaWYgbmVlZGVkLCBlbHNlIGp1c3QgYWRkcyBvbmUgdG8gdGhlIHBhdGNoZXMgYXJyYXlcclxuZXhwb3J0IGRlZmF1bHQgKHBhdGNoVHlwZSkgPT4gKGZ1bmNOYW1lLCBmdW5jUGFyZW50LCBjYWxsYmFjaywgb25lVGltZSA9IGZhbHNlKSA9PiB7XHJcbiAgICBpZiAodHlwZW9mIGZ1bmNQYXJlbnRbZnVuY05hbWVdICE9PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke2Z1bmNOYW1lfSBpcyBub3QgYSBmdW5jdGlvbiBpbiAke2Z1bmNQYXJlbnQuY29uc3RydWN0b3IubmFtZX1gKTtcclxuICAgIGlmICghcGF0Y2hlZE9iamVjdHMuaGFzKGZ1bmNQYXJlbnQpKVxyXG4gICAgICAgIHBhdGNoZWRPYmplY3RzLnNldChmdW5jUGFyZW50LCB7fSk7XHJcbiAgICBjb25zdCBwYXJlbnRJbmplY3Rpb25zID0gcGF0Y2hlZE9iamVjdHMuZ2V0KGZ1bmNQYXJlbnQpO1xyXG4gICAgaWYgKCFwYXJlbnRJbmplY3Rpb25zW2Z1bmNOYW1lXSkge1xyXG4gICAgICAgIGNvbnN0IG9yaWdGdW5jID0gZnVuY1BhcmVudFtmdW5jTmFtZV07XHJcbiAgICAgICAgLy8gbm90ZSB0byBmdXR1cmUgbWUgb3B0aW1pc2luZyBmb3Igc2l6ZTogZXh0cmFjdGluZyBuZXcgTWFwKCkgdG8gYSBmdW5jIGluY3JlYXNlcyBzaXplIC0tc2lua1xyXG4gICAgICAgIHBhcmVudEluamVjdGlvbnNbZnVuY05hbWVdID0ge1xyXG4gICAgICAgICAgICBvOiBvcmlnRnVuYyxcclxuICAgICAgICAgICAgYjogbmV3IE1hcCgpLFxyXG4gICAgICAgICAgICBpOiBuZXcgTWFwKCksXHJcbiAgICAgICAgICAgIGE6IG5ldyBNYXAoKSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IHJ1bkhvb2sgPSAoY3R4dCwgYXJncywgY29uc3RydWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJldCA9IGhvb2soZnVuY05hbWUsIGZ1bmNQYXJlbnQsIGFyZ3MsIGN0eHQsIGNvbnN0cnVjdCk7XHJcbiAgICAgICAgICAgIGlmIChvbmVUaW1lKVxyXG4gICAgICAgICAgICAgICAgdW5wYXRjaFRoaXNQYXRjaCgpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29uc3QgcmVwbGFjZVByb3h5ID0gbmV3IFByb3h5KG9yaWdGdW5jLCB7XHJcbiAgICAgICAgICAgIGFwcGx5OiAoXywgY3R4dCwgYXJncykgPT4gcnVuSG9vayhjdHh0LCBhcmdzLCBmYWxzZSksXHJcbiAgICAgICAgICAgIGNvbnN0cnVjdDogKF8sIGFyZ3MpID0+IHJ1bkhvb2sob3JpZ0Z1bmMsIGFyZ3MsIHRydWUpLFxyXG4gICAgICAgICAgICBnZXQ6ICh0YXJnZXQsIHByb3AsIHJlY2VpdmVyKSA9PiBwcm9wID09IFwidG9TdHJpbmdcIlxyXG4gICAgICAgICAgICAgICAgPyBvcmlnRnVuYy50b1N0cmluZy5iaW5kKG9yaWdGdW5jKVxyXG4gICAgICAgICAgICAgICAgOiBSZWZsZWN0LmdldCh0YXJnZXQsIHByb3AsIHJlY2VpdmVyKSxcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyB0aGlzIHdvcmtzIGFyb3VuZCBicmVha2luZyBzb21lIGFzeW5jIGZpbmQgaW1wbGVtZW50YXRpb24gd2hpY2ggbGlzdGVucyBmb3IgYXNzaWducyB2aWEgcHJveHlcclxuICAgICAgICAvLyBzZWUgY29tbWVudCBpbiB1bnBhdGNoLnRzXHJcbiAgICAgICAgY29uc3Qgc3VjY2VzcyA9IFJlZmxlY3QuZGVmaW5lUHJvcGVydHkoZnVuY1BhcmVudCwgZnVuY05hbWUsIHtcclxuICAgICAgICAgICAgdmFsdWU6IHJlcGxhY2VQcm94eSxcclxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoIXN1Y2Nlc3MpXHJcbiAgICAgICAgICAgIGZ1bmNQYXJlbnRbZnVuY05hbWVdID0gcmVwbGFjZVByb3h5O1xyXG4gICAgICAgIGZ1bmNQYXJlbnRbZnVuY05hbWVdLl9fb3JpZ2luYWxfXyA9IHBhcmVudEluamVjdGlvbnNbZnVuY05hbWVdLm87XHJcbiAgICB9XHJcbiAgICBjb25zdCBob29rSWQgPSBTeW1ib2woKTtcclxuICAgIGNvbnN0IHVucGF0Y2hUaGlzUGF0Y2ggPSAoKSA9PiB1blBhdGNoKGZ1bmNQYXJlbnQsIGZ1bmNOYW1lLCBob29rSWQsIHBhdGNoVHlwZSk7XHJcbiAgICBwYXJlbnRJbmplY3Rpb25zW2Z1bmNOYW1lXVtwYXRjaFR5cGVdLnNldChob29rSWQsIGNhbGxiYWNrKTtcclxuICAgIHJldHVybiB1bnBhdGNoVGhpc1BhdGNoO1xyXG59O1xyXG4iLCAiaW1wb3J0IGdldFBhdGNoRnVuYyBmcm9tIFwiLi9nZXQtcGF0Y2gtZnVuYy5qc1wiO1xyXG5pbXBvcnQgeyB1blBhdGNoQWxsIH0gZnJvbSBcIi4vdW4tcGF0Y2guanNcIjtcclxuaW1wb3J0IHsgcGF0Y2hlZE9iamVjdHMgYXMgcGF0Y2hlZCB9IGZyb20gXCIuL3NoYXJlZC5qc1wiO1xyXG5jb25zdCBiZWZvcmUgPSBnZXRQYXRjaEZ1bmMoXCJiXCIpO1xyXG5jb25zdCBpbnN0ZWFkID0gZ2V0UGF0Y2hGdW5jKFwiaVwiKTtcclxuY29uc3QgYWZ0ZXIgPSBnZXRQYXRjaEZ1bmMoXCJhXCIpO1xyXG5leHBvcnQgeyBpbnN0ZWFkLCBiZWZvcmUsIGFmdGVyLCB1blBhdGNoQWxsLCBwYXRjaGVkIH07XHJcbiIsICJpbXBvcnQgKiBhcyBzcGl0Um9hc3QgZnJvbSBcIi4uLy4uL2xpYi9zcGl0cm9hc3QvZGlzdC9lc21cIjtcclxuXHJcbmZ1bmN0aW9uIHByb3BSZXBsYWNlcihjc3MsIHByb3BzID0ge30pIHtcclxuICByZXR1cm4gY3NzLnJlcGxhY2UoL3ZhclxcKC0tYWNvcmQtLShbXFxTXFxzXSspXFwpL2csIChtYXRjaCwgZ3JvdXAxKSA9PiB7XHJcbiAgICBsZXQgc3BsaXR0ZWQgPSBncm91cDEuc3BsaXQoXCIsXCIpO1xyXG4gICAgbGV0IGtleSA9IHNwbGl0dGVkLnNoaWZ0KCkudHJpbSgpO1xyXG4gICAgbGV0IGRlZmF1bHRWYWx1ZSA9IHNwbGl0dGVkLmpvaW4oXCIsXCIpLnRyaW0oKTtcclxuICAgIHJldHVybiBwcm9wc1trZXldID8/IChkZWZhdWx0VmFsdWUgfHwgbWF0Y2gpO1xyXG4gIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgX19jYWNoZV9fOiB7XHJcbiAgICBwYXRjaGVkOiBzcGl0Um9hc3QucGF0Y2hlZCxcclxuICB9LFxyXG4gIGJlZm9yZTogc3BpdFJvYXN0LmJlZm9yZSxcclxuICBhZnRlcjogc3BpdFJvYXN0LmFmdGVyLFxyXG4gIGluc3RlYWQ6IHNwaXRSb2FzdC5pbnN0ZWFkLFxyXG4gIHVuUGF0Y2hBbGw6IHNwaXRSb2FzdC51blBhdGNoQWxsLFxyXG4gIGluamVjdENTUyhjc3MsIGN1c3RvbVByb3BzID0ge30pIHtcclxuICAgIGNvbnN0IHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xyXG4gICAgc3R5bGUuY2xhc3NOYW1lID0gYGFjb3JkLS1pbmplY3RlZC1jc3NgO1xyXG4gICAgc3R5bGUudGV4dENvbnRlbnQgPSBwcm9wUmVwbGFjZXIoY3NzLCBjdXN0b21Qcm9wcyk7XHJcbiAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcclxuXHJcbiAgICByZXR1cm4gKC4uLmFyZ3MpID0+IHtcclxuICAgICAgaWYgKHR5cGVvZiBhcmdzWzBdID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgc3R5bGUudGV4dENvbnRlbnQgPSBwcm9wUmVwbGFjZXIoYXJnc1swXSwgYXJnc1sxXSk7XHJcbiAgICAgICAgY3NzID0gYXJnc1swXTtcclxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYXJnc1swXSA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgIHN0eWxlLnRleHRDb250ZW50ID0gcHJvcFJlcGxhY2VyKGNzcywgYXJnc1swXSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc3R5bGU/LnJlbW92ZSgpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgdW5QYXRjaEFsbENTUygpIHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYWNvcmQtLWluamVjdGVkLWNzc1wiKS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICBlbGVtZW50LnJlbW92ZSgpO1xyXG4gICAgfSlcclxuICB9XHJcbn0iLCAiZXhwb3J0IGRlZmF1bHQgYFxuQGtleWZyYW1lcyBhY29yZExvYWRpbmdGYWRlezAle29wYWNpdHk6LjF9MTAwJXtvcGFjaXR5Oi45fX0uYWNvcmQtLXN0YXJ0dXAtbG9hZGluZ3thbmltYXRpb246YWNvcmRMb2FkaW5nRmFkZSAuNXMgYWx0ZXJuYXRlIGluZmluaXRlIGxpbmVhcjtwb3NpdGlvbjphYnNvbHV0ZTt0cmFuc2l0aW9uOmFsbCAuNXMgbGluZWFyO3JpZ2h0OjhweDtib3R0b206OHB4O3dpZHRoOjE2cHg7aGVpZ2h0OjE2cHg7YmFja2dyb3VuZC1pbWFnZTp1cmwoXCJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vQWNvcmRQbHVnaW4vYXNzZXRzL21haW4vQWNvcmQuc3ZnXCIpO2ZpbHRlcjpncmF5c2NhbGUoMSkgYnJpZ2h0bmVzcygxKTtiYWNrZ3JvdW5kLXBvc2l0aW9uOmNlbnRlcjtiYWNrZ3JvdW5kLXJlcGVhdDpuby1yZXBlYXQ7YmFja2dyb3VuZC1zaXplOmNvbnRhaW47ei1pbmRleDo5OTk5OTl9LmFjb3JkLS1zdGFydHVwLWxvYWRpbmcuaGlkZGVue29wYWNpdHk6MCAhaW1wb3J0YW50fWA7XG4iLCAiaW1wb3J0IGRvbSBmcm9tIFwiLi4vLi4vYXBpL2RvbS9pbmRleC5qc1wiO1xyXG5pbXBvcnQgcGF0Y2hlciBmcm9tIFwiLi4vLi4vYXBpL3BhdGNoZXIvaW5kZXguanNcIjtcclxuXHJcbmltcG9ydCBjc3NUZXh0IGZyb20gXCIuL3N0eWxlLnNjc3NcIjtcclxubGV0IHVuSW5qZWN0O1xyXG5cclxuYXN5bmMgZnVuY3Rpb24gc2hvdygpIHtcclxuICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hY29yZC0tc3RhcnR1cC1sb2FkaW5nXCIpKSByZXR1cm47XHJcbiAgd2hpbGUgKHRydWUpIHtcclxuICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FwcC1tb3VudFwiKSkgYnJlYWs7XHJcbiAgICBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gc2V0VGltZW91dChyZXNvbHZlLCAxMDApKTtcclxuICB9XHJcbiAgXHJcbiAgdW5JbmplY3QgPSBwYXRjaGVyLmluamVjdENTUyhjc3NUZXh0KTtcclxuICBjb25zdCBlbGVtZW50ID0gZG9tLnBhcnNlKGBcclxuICAgIDxkaXYgY2xhc3M9XCJhY29yZC0tc3RhcnR1cC1sb2FkaW5nXCI+PC9kaXY+XHJcbiAgYClcclxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FwcC1tb3VudFwiKS5hcHBlbmRDaGlsZChlbGVtZW50KTtcclxufVxyXG5cclxuZnVuY3Rpb24gaGlkZSgpIHtcclxuICBsZXQgZWxtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hY29yZC0tc3RhcnR1cC1sb2FkaW5nXCIpO1xyXG4gIGlmIChlbG0pIHtcclxuICAgIGVsbS5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIGVsbS5yZW1vdmUoKTtcclxuICAgICAgdW5JbmplY3Q/LigpO1xyXG4gICAgICB1bkluamVjdCA9IG51bGw7XHJcbiAgICB9LCA1MDApO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIHNob3csXHJcbiAgaGlkZVxyXG59IiwgImltcG9ydCAqIGFzIG5lc3RzIGZyb20gXCJuZXN0c1wiO1xyXG5pbXBvcnQgKiBhcyBpZGJLZXl2YWwgZnJvbSBcImlkYi1rZXl2YWxcIjtcclxuaW1wb3J0IHsgZGVDeWNsZWQsIHJldml2ZSB9IGZyb20gXCIuLi8uLi9saWIvanNvbi1kZWN5Y2xlZFwiO1xyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgYXN5bmMgY3JlYXRlUGVyc2lzdE5lc3Qoc3VmZml4KSB7XHJcbiAgICBsZXQgY2FjaGVkID0gYXdhaXQgaWRiS2V5dmFsLmdldChgQWNvcmRTdG9yZTske3N1ZmZpeH1gKTtcclxuICAgIGlmICh0eXBlb2YgY2FjaGVkID09IFwic3RyaW5nXCIpIGNhY2hlZCA9IHJldml2ZShjYWNoZWQpO1xyXG4gICAgY29uc3QgbmVzdCA9IG5lc3RzLm1ha2UoY2FjaGVkID8/IHt9KTtcclxuXHJcbiAgICBjb25zdCBzYXZlID0gKCkgPT4ge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGlkYktleXZhbC5zZXQoYEFjb3JkU3RvcmU7JHtzdWZmaXh9YCwgZGVDeWNsZWQoeyAuLi5uZXN0Lmdob3N0IH0pKTtcclxuICAgICAgfSBjYXRjaCB7XHJcbiAgICAgICAgaWRiS2V5dmFsLnNldChgQWNvcmRTdG9yZTske3N1ZmZpeH1gLCBkZUN5Y2xlZCh7fSkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbmVzdC5vbihuZXN0cy5FdmVudHMuU0VULCBzYXZlKTtcclxuICAgIG5lc3Qub24obmVzdHMuRXZlbnRzLlVQREFURSwgc2F2ZSk7XHJcbiAgICBuZXN0Lm9uKG5lc3RzLkV2ZW50cy5ERUxFVEUsIHNhdmUpO1xyXG5cclxuICAgIHJldHVybiBuZXN0O1xyXG4gIH1cclxufSIsICJmdW5jdGlvbiBwcm9taXNpZnlSZXF1ZXN0KHJlcXVlc3QpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAvLyBAdHMtaWdub3JlIC0gZmlsZSBzaXplIGhhY2tzXG4gICAgICAgIHJlcXVlc3Qub25jb21wbGV0ZSA9IHJlcXVlc3Qub25zdWNjZXNzID0gKCkgPT4gcmVzb2x2ZShyZXF1ZXN0LnJlc3VsdCk7XG4gICAgICAgIC8vIEB0cy1pZ25vcmUgLSBmaWxlIHNpemUgaGFja3NcbiAgICAgICAgcmVxdWVzdC5vbmFib3J0ID0gcmVxdWVzdC5vbmVycm9yID0gKCkgPT4gcmVqZWN0KHJlcXVlc3QuZXJyb3IpO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gY3JlYXRlU3RvcmUoZGJOYW1lLCBzdG9yZU5hbWUpIHtcbiAgICBjb25zdCByZXF1ZXN0ID0gaW5kZXhlZERCLm9wZW4oZGJOYW1lKTtcbiAgICByZXF1ZXN0Lm9udXBncmFkZW5lZWRlZCA9ICgpID0+IHJlcXVlc3QucmVzdWx0LmNyZWF0ZU9iamVjdFN0b3JlKHN0b3JlTmFtZSk7XG4gICAgY29uc3QgZGJwID0gcHJvbWlzaWZ5UmVxdWVzdChyZXF1ZXN0KTtcbiAgICByZXR1cm4gKHR4TW9kZSwgY2FsbGJhY2spID0+IGRicC50aGVuKChkYikgPT4gY2FsbGJhY2soZGIudHJhbnNhY3Rpb24oc3RvcmVOYW1lLCB0eE1vZGUpLm9iamVjdFN0b3JlKHN0b3JlTmFtZSkpKTtcbn1cbmxldCBkZWZhdWx0R2V0U3RvcmVGdW5jO1xuZnVuY3Rpb24gZGVmYXVsdEdldFN0b3JlKCkge1xuICAgIGlmICghZGVmYXVsdEdldFN0b3JlRnVuYykge1xuICAgICAgICBkZWZhdWx0R2V0U3RvcmVGdW5jID0gY3JlYXRlU3RvcmUoJ2tleXZhbC1zdG9yZScsICdrZXl2YWwnKTtcbiAgICB9XG4gICAgcmV0dXJuIGRlZmF1bHRHZXRTdG9yZUZ1bmM7XG59XG4vKipcbiAqIEdldCBhIHZhbHVlIGJ5IGl0cyBrZXkuXG4gKlxuICogQHBhcmFtIGtleVxuICogQHBhcmFtIGN1c3RvbVN0b3JlIE1ldGhvZCB0byBnZXQgYSBjdXN0b20gc3RvcmUuIFVzZSB3aXRoIGNhdXRpb24gKHNlZSB0aGUgZG9jcykuXG4gKi9cbmZ1bmN0aW9uIGdldChrZXksIGN1c3RvbVN0b3JlID0gZGVmYXVsdEdldFN0b3JlKCkpIHtcbiAgICByZXR1cm4gY3VzdG9tU3RvcmUoJ3JlYWRvbmx5JywgKHN0b3JlKSA9PiBwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLmdldChrZXkpKSk7XG59XG4vKipcbiAqIFNldCBhIHZhbHVlIHdpdGggYSBrZXkuXG4gKlxuICogQHBhcmFtIGtleVxuICogQHBhcmFtIHZhbHVlXG4gKiBAcGFyYW0gY3VzdG9tU3RvcmUgTWV0aG9kIHRvIGdldCBhIGN1c3RvbSBzdG9yZS4gVXNlIHdpdGggY2F1dGlvbiAoc2VlIHRoZSBkb2NzKS5cbiAqL1xuZnVuY3Rpb24gc2V0KGtleSwgdmFsdWUsIGN1c3RvbVN0b3JlID0gZGVmYXVsdEdldFN0b3JlKCkpIHtcbiAgICByZXR1cm4gY3VzdG9tU3RvcmUoJ3JlYWR3cml0ZScsIChzdG9yZSkgPT4ge1xuICAgICAgICBzdG9yZS5wdXQodmFsdWUsIGtleSk7XG4gICAgICAgIHJldHVybiBwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLnRyYW5zYWN0aW9uKTtcbiAgICB9KTtcbn1cbi8qKlxuICogU2V0IG11bHRpcGxlIHZhbHVlcyBhdCBvbmNlLiBUaGlzIGlzIGZhc3RlciB0aGFuIGNhbGxpbmcgc2V0KCkgbXVsdGlwbGUgdGltZXMuXG4gKiBJdCdzIGFsc28gYXRvbWljIFx1MjAxMyBpZiBvbmUgb2YgdGhlIHBhaXJzIGNhbid0IGJlIGFkZGVkLCBub25lIHdpbGwgYmUgYWRkZWQuXG4gKlxuICogQHBhcmFtIGVudHJpZXMgQXJyYXkgb2YgZW50cmllcywgd2hlcmUgZWFjaCBlbnRyeSBpcyBhbiBhcnJheSBvZiBgW2tleSwgdmFsdWVdYC5cbiAqIEBwYXJhbSBjdXN0b21TdG9yZSBNZXRob2QgdG8gZ2V0IGEgY3VzdG9tIHN0b3JlLiBVc2Ugd2l0aCBjYXV0aW9uIChzZWUgdGhlIGRvY3MpLlxuICovXG5mdW5jdGlvbiBzZXRNYW55KGVudHJpZXMsIGN1c3RvbVN0b3JlID0gZGVmYXVsdEdldFN0b3JlKCkpIHtcbiAgICByZXR1cm4gY3VzdG9tU3RvcmUoJ3JlYWR3cml0ZScsIChzdG9yZSkgPT4ge1xuICAgICAgICBlbnRyaWVzLmZvckVhY2goKGVudHJ5KSA9PiBzdG9yZS5wdXQoZW50cnlbMV0sIGVudHJ5WzBdKSk7XG4gICAgICAgIHJldHVybiBwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLnRyYW5zYWN0aW9uKTtcbiAgICB9KTtcbn1cbi8qKlxuICogR2V0IG11bHRpcGxlIHZhbHVlcyBieSB0aGVpciBrZXlzXG4gKlxuICogQHBhcmFtIGtleXNcbiAqIEBwYXJhbSBjdXN0b21TdG9yZSBNZXRob2QgdG8gZ2V0IGEgY3VzdG9tIHN0b3JlLiBVc2Ugd2l0aCBjYXV0aW9uIChzZWUgdGhlIGRvY3MpLlxuICovXG5mdW5jdGlvbiBnZXRNYW55KGtleXMsIGN1c3RvbVN0b3JlID0gZGVmYXVsdEdldFN0b3JlKCkpIHtcbiAgICByZXR1cm4gY3VzdG9tU3RvcmUoJ3JlYWRvbmx5JywgKHN0b3JlKSA9PiBQcm9taXNlLmFsbChrZXlzLm1hcCgoa2V5KSA9PiBwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLmdldChrZXkpKSkpKTtcbn1cbi8qKlxuICogVXBkYXRlIGEgdmFsdWUuIFRoaXMgbGV0cyB5b3Ugc2VlIHRoZSBvbGQgdmFsdWUgYW5kIHVwZGF0ZSBpdCBhcyBhbiBhdG9taWMgb3BlcmF0aW9uLlxuICpcbiAqIEBwYXJhbSBrZXlcbiAqIEBwYXJhbSB1cGRhdGVyIEEgY2FsbGJhY2sgdGhhdCB0YWtlcyB0aGUgb2xkIHZhbHVlIGFuZCByZXR1cm5zIGEgbmV3IHZhbHVlLlxuICogQHBhcmFtIGN1c3RvbVN0b3JlIE1ldGhvZCB0byBnZXQgYSBjdXN0b20gc3RvcmUuIFVzZSB3aXRoIGNhdXRpb24gKHNlZSB0aGUgZG9jcykuXG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZShrZXksIHVwZGF0ZXIsIGN1c3RvbVN0b3JlID0gZGVmYXVsdEdldFN0b3JlKCkpIHtcbiAgICByZXR1cm4gY3VzdG9tU3RvcmUoJ3JlYWR3cml0ZScsIChzdG9yZSkgPT4gXG4gICAgLy8gTmVlZCB0byBjcmVhdGUgdGhlIHByb21pc2UgbWFudWFsbHkuXG4gICAgLy8gSWYgSSB0cnkgdG8gY2hhaW4gcHJvbWlzZXMsIHRoZSB0cmFuc2FjdGlvbiBjbG9zZXMgaW4gYnJvd3NlcnNcbiAgICAvLyB0aGF0IHVzZSBhIHByb21pc2UgcG9seWZpbGwgKElFMTAvMTEpLlxuICAgIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgc3RvcmUuZ2V0KGtleSkub25zdWNjZXNzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBzdG9yZS5wdXQodXBkYXRlcih0aGlzLnJlc3VsdCksIGtleSk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLnRyYW5zYWN0aW9uKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSkpO1xufVxuLyoqXG4gKiBEZWxldGUgYSBwYXJ0aWN1bGFyIGtleSBmcm9tIHRoZSBzdG9yZS5cbiAqXG4gKiBAcGFyYW0ga2V5XG4gKiBAcGFyYW0gY3VzdG9tU3RvcmUgTWV0aG9kIHRvIGdldCBhIGN1c3RvbSBzdG9yZS4gVXNlIHdpdGggY2F1dGlvbiAoc2VlIHRoZSBkb2NzKS5cbiAqL1xuZnVuY3Rpb24gZGVsKGtleSwgY3VzdG9tU3RvcmUgPSBkZWZhdWx0R2V0U3RvcmUoKSkge1xuICAgIHJldHVybiBjdXN0b21TdG9yZSgncmVhZHdyaXRlJywgKHN0b3JlKSA9PiB7XG4gICAgICAgIHN0b3JlLmRlbGV0ZShrZXkpO1xuICAgICAgICByZXR1cm4gcHJvbWlzaWZ5UmVxdWVzdChzdG9yZS50cmFuc2FjdGlvbik7XG4gICAgfSk7XG59XG4vKipcbiAqIERlbGV0ZSBtdWx0aXBsZSBrZXlzIGF0IG9uY2UuXG4gKlxuICogQHBhcmFtIGtleXMgTGlzdCBvZiBrZXlzIHRvIGRlbGV0ZS5cbiAqIEBwYXJhbSBjdXN0b21TdG9yZSBNZXRob2QgdG8gZ2V0IGEgY3VzdG9tIHN0b3JlLiBVc2Ugd2l0aCBjYXV0aW9uIChzZWUgdGhlIGRvY3MpLlxuICovXG5mdW5jdGlvbiBkZWxNYW55KGtleXMsIGN1c3RvbVN0b3JlID0gZGVmYXVsdEdldFN0b3JlKCkpIHtcbiAgICByZXR1cm4gY3VzdG9tU3RvcmUoJ3JlYWR3cml0ZScsIChzdG9yZSkgPT4ge1xuICAgICAgICBrZXlzLmZvckVhY2goKGtleSkgPT4gc3RvcmUuZGVsZXRlKGtleSkpO1xuICAgICAgICByZXR1cm4gcHJvbWlzaWZ5UmVxdWVzdChzdG9yZS50cmFuc2FjdGlvbik7XG4gICAgfSk7XG59XG4vKipcbiAqIENsZWFyIGFsbCB2YWx1ZXMgaW4gdGhlIHN0b3JlLlxuICpcbiAqIEBwYXJhbSBjdXN0b21TdG9yZSBNZXRob2QgdG8gZ2V0IGEgY3VzdG9tIHN0b3JlLiBVc2Ugd2l0aCBjYXV0aW9uIChzZWUgdGhlIGRvY3MpLlxuICovXG5mdW5jdGlvbiBjbGVhcihjdXN0b21TdG9yZSA9IGRlZmF1bHRHZXRTdG9yZSgpKSB7XG4gICAgcmV0dXJuIGN1c3RvbVN0b3JlKCdyZWFkd3JpdGUnLCAoc3RvcmUpID0+IHtcbiAgICAgICAgc3RvcmUuY2xlYXIoKTtcbiAgICAgICAgcmV0dXJuIHByb21pc2lmeVJlcXVlc3Qoc3RvcmUudHJhbnNhY3Rpb24pO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gZWFjaEN1cnNvcihzdG9yZSwgY2FsbGJhY2spIHtcbiAgICBzdG9yZS5vcGVuQ3Vyc29yKCkub25zdWNjZXNzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXRoaXMucmVzdWx0KVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjYWxsYmFjayh0aGlzLnJlc3VsdCk7XG4gICAgICAgIHRoaXMucmVzdWx0LmNvbnRpbnVlKCk7XG4gICAgfTtcbiAgICByZXR1cm4gcHJvbWlzaWZ5UmVxdWVzdChzdG9yZS50cmFuc2FjdGlvbik7XG59XG4vKipcbiAqIEdldCBhbGwga2V5cyBpbiB0aGUgc3RvcmUuXG4gKlxuICogQHBhcmFtIGN1c3RvbVN0b3JlIE1ldGhvZCB0byBnZXQgYSBjdXN0b20gc3RvcmUuIFVzZSB3aXRoIGNhdXRpb24gKHNlZSB0aGUgZG9jcykuXG4gKi9cbmZ1bmN0aW9uIGtleXMoY3VzdG9tU3RvcmUgPSBkZWZhdWx0R2V0U3RvcmUoKSkge1xuICAgIHJldHVybiBjdXN0b21TdG9yZSgncmVhZG9ubHknLCAoc3RvcmUpID0+IHtcbiAgICAgICAgLy8gRmFzdCBwYXRoIGZvciBtb2Rlcm4gYnJvd3NlcnNcbiAgICAgICAgaWYgKHN0b3JlLmdldEFsbEtleXMpIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLmdldEFsbEtleXMoKSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaXRlbXMgPSBbXTtcbiAgICAgICAgcmV0dXJuIGVhY2hDdXJzb3Ioc3RvcmUsIChjdXJzb3IpID0+IGl0ZW1zLnB1c2goY3Vyc29yLmtleSkpLnRoZW4oKCkgPT4gaXRlbXMpO1xuICAgIH0pO1xufVxuLyoqXG4gKiBHZXQgYWxsIHZhbHVlcyBpbiB0aGUgc3RvcmUuXG4gKlxuICogQHBhcmFtIGN1c3RvbVN0b3JlIE1ldGhvZCB0byBnZXQgYSBjdXN0b20gc3RvcmUuIFVzZSB3aXRoIGNhdXRpb24gKHNlZSB0aGUgZG9jcykuXG4gKi9cbmZ1bmN0aW9uIHZhbHVlcyhjdXN0b21TdG9yZSA9IGRlZmF1bHRHZXRTdG9yZSgpKSB7XG4gICAgcmV0dXJuIGN1c3RvbVN0b3JlKCdyZWFkb25seScsIChzdG9yZSkgPT4ge1xuICAgICAgICAvLyBGYXN0IHBhdGggZm9yIG1vZGVybiBicm93c2Vyc1xuICAgICAgICBpZiAoc3RvcmUuZ2V0QWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzaWZ5UmVxdWVzdChzdG9yZS5nZXRBbGwoKSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaXRlbXMgPSBbXTtcbiAgICAgICAgcmV0dXJuIGVhY2hDdXJzb3Ioc3RvcmUsIChjdXJzb3IpID0+IGl0ZW1zLnB1c2goY3Vyc29yLnZhbHVlKSkudGhlbigoKSA9PiBpdGVtcyk7XG4gICAgfSk7XG59XG4vKipcbiAqIEdldCBhbGwgZW50cmllcyBpbiB0aGUgc3RvcmUuIEVhY2ggZW50cnkgaXMgYW4gYXJyYXkgb2YgYFtrZXksIHZhbHVlXWAuXG4gKlxuICogQHBhcmFtIGN1c3RvbVN0b3JlIE1ldGhvZCB0byBnZXQgYSBjdXN0b20gc3RvcmUuIFVzZSB3aXRoIGNhdXRpb24gKHNlZSB0aGUgZG9jcykuXG4gKi9cbmZ1bmN0aW9uIGVudHJpZXMoY3VzdG9tU3RvcmUgPSBkZWZhdWx0R2V0U3RvcmUoKSkge1xuICAgIHJldHVybiBjdXN0b21TdG9yZSgncmVhZG9ubHknLCAoc3RvcmUpID0+IHtcbiAgICAgICAgLy8gRmFzdCBwYXRoIGZvciBtb2Rlcm4gYnJvd3NlcnNcbiAgICAgICAgLy8gKGFsdGhvdWdoLCBob3BlZnVsbHkgd2UnbGwgZ2V0IGEgc2ltcGxlciBwYXRoIHNvbWUgZGF5KVxuICAgICAgICBpZiAoc3RvcmUuZ2V0QWxsICYmIHN0b3JlLmdldEFsbEtleXMpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICAgICAgcHJvbWlzaWZ5UmVxdWVzdChzdG9yZS5nZXRBbGxLZXlzKCkpLFxuICAgICAgICAgICAgICAgIHByb21pc2lmeVJlcXVlc3Qoc3RvcmUuZ2V0QWxsKCkpLFxuICAgICAgICAgICAgXSkudGhlbigoW2tleXMsIHZhbHVlc10pID0+IGtleXMubWFwKChrZXksIGkpID0+IFtrZXksIHZhbHVlc1tpXV0pKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpdGVtcyA9IFtdO1xuICAgICAgICByZXR1cm4gY3VzdG9tU3RvcmUoJ3JlYWRvbmx5JywgKHN0b3JlKSA9PiBlYWNoQ3Vyc29yKHN0b3JlLCAoY3Vyc29yKSA9PiBpdGVtcy5wdXNoKFtjdXJzb3Iua2V5LCBjdXJzb3IudmFsdWVdKSkudGhlbigoKSA9PiBpdGVtcykpO1xuICAgIH0pO1xufVxuXG5leHBvcnQgeyBjbGVhciwgY3JlYXRlU3RvcmUsIGRlbCwgZGVsTWFueSwgZW50cmllcywgZ2V0LCBnZXRNYW55LCBrZXlzLCBwcm9taXNpZnlSZXF1ZXN0LCBzZXQsIHNldE1hbnksIHVwZGF0ZSwgdmFsdWVzIH07XG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5mdW5jdGlvbiBkZUN5Y2xlcih2YWwsIGNvbmZpZykge1xyXG4gIGNvbmZpZyA9IHR5cGVvZiBjb25maWcgPT09ICdudW1iZXInID8geyBkZWVwOiBjb25maWcgfSA6IChjb25maWcgfHwge30pO1xyXG4gIGNvbmZpZy5kZWVwID0gY29uZmlnLmRlZXAgfHwgMTA7XHJcbiAgcmV0dXJuIGRlY3ljbGVXYWxrZXIoW10sIFtdLCB2YWwsIGNvbmZpZyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRlQ3ljbGVkKHZhbCwgY29uZmlnKSB7XHJcbiAgY29uZmlnID0gdHlwZW9mIGNvbmZpZyA9PT0gJ251bWJlcicgPyB7IGRlZXA6IGNvbmZpZyB9IDogKGNvbmZpZyB8fCB7fSk7XHJcbiAgdmFsID0gZGVDeWNsZXIodmFsLCBjb25maWcpO1xyXG4gIHRyeSB7XHJcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodmFsLCB1bmRlZmluZWQsIGNvbmZpZy5zcGFjZXIpO1xyXG4gIH0gY2F0Y2ggKGUpIHtcclxuICAgIHJldHVybiBlO1xyXG4gIH1cclxufVxyXG5cclxudmFyIHJldml2ZXJEYXRlID0gL15cXFtEYXRlOigoXFxkezR9LVxcZHsyfS1cXGR7Mn0pW0EtWl0rKFxcZHsyfTpcXGR7Mn06XFxkezJ9KS4oWzAtOSstOl0rKVopXFxdJC87XHJcbnZhciByZXZpdmVyUmVnRXhwID0gL15cXFtSZWdleHA6XFwvKC4rKVxcL1xcXSQvO1xyXG52YXIgcmV2aXZlckVycm9yID0gL15cXFtFcnJvcjooW1xcV1xcd10rKVxcXSQvO1xyXG52YXIgcmV2aXZlckZ1bmN0aW9uID0gL15cXFtGdW5jdGlvbjooLispXFxdJC87XHJcbmZ1bmN0aW9uIHJldml2ZSh2YWwsIGZ1bmN0aW9ucykge1xyXG4gIHRyeSB7XHJcbiAgICByZXR1cm4gSlNPTi5wYXJzZSh2YWwsIHJldml2ZXIpO1xyXG4gIH0gY2F0Y2ggKGUpIHtcclxuICAgIHJldHVybiBlO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcmV2aXZlcihrZXksIHZhbCkge1xyXG4gICAgaWYgKHJldml2ZXJEYXRlLnRlc3QodmFsKSkge1xyXG4gICAgICB2YWwgPSByZXZpdmVyRGF0ZS5leGVjKHZhbCk7XHJcbiAgICAgIHZhbCA9IG5ldyBEYXRlKHZhbFsxXSk7XHJcbiAgICAgIHJldHVybiBuZXcgRGF0ZSh2YWwpO1xyXG4gICAgfSBlbHNlIGlmIChyZXZpdmVyUmVnRXhwLnRlc3QodmFsKSkge1xyXG4gICAgICB2YWwgPSByZXZpdmVyUmVnRXhwLmV4ZWModmFsKVsxXTtcclxuICAgICAgcmV0dXJuIG5ldyBSZWdFeHAodmFsKTtcclxuICAgIH0gZWxzZSBpZiAocmV2aXZlckVycm9yLnRlc3QodmFsKSkge1xyXG4gICAgICB2YWwgPSByZXZpdmVyRXJyb3IuZXhlYyh2YWwpWzFdO1xyXG4gICAgICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IodmFsLnNwbGl0KCdcXG4nKVswXSk7XHJcbiAgICAgIGlmIChlcnJvci5zdGFjaykge1xyXG4gICAgICAgIGVycm9yLnN0YWNrID0gdmFsO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBlcnJvcjtcclxuICAgIH0gZWxzZSBpZiAoZnVuY3Rpb25zICYmIHJldml2ZXJGdW5jdGlvbi50ZXN0KHZhbCkpIHtcclxuICAgICAgdmFsID0gcmV2aXZlckZ1bmN0aW9uLmV4ZWModmFsKVsxXTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICByZXR1cm4gKG5ldyBGdW5jdGlvbihcInJldHVybiBcIiArIHZhbCArIFwiO1wiKSkoKTtcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICByZXR1cm4gZXJyb3I7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB2YWw7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBkZWN5Y2xlV2Fsa2VyKHBhcmVudHMsIHBhdGgsIHZhbCwgY29uZmlnKSB7XHJcbiAgaWYgKFsndW5kZWZpbmVkJywgJ251bWJlcicsICdib29sZWFuJywgJ3N0cmluZyddLmluZGV4T2YodHlwZW9mIHZhbCkgPj0gMCB8fCB2YWwgPT09IG51bGwpIHtcclxuICAgIHJldHVybiB2YWw7XHJcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnb2JqZWN0JyAmJiB2YWwuY29uc3RydWN0b3IgPT09IERhdGUpIHtcclxuICAgIHJldHVybiBjb25maWcuZGF0ZXMgIT09IGZhbHNlID8gJ1tEYXRlOicgKyB2YWwudG9JU09TdHJpbmcoKSArICddJyA6IHZhbDtcclxuICAgIC8vdmFsLmZvcm1hdCgne1lZWVl9L3tNTX0ve0REfSB7aGh9OnttbX06e3NzfSBVVEM6XHUwMEI3e3BhcmFtcy50ej49MD9cIitcIitwYXJhbXMudHo6cGFyYW1zLnR6fVx1MDBCNycpO1xyXG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ29iamVjdCcgJiYgdmFsLmNvbnN0cnVjdG9yID09PSBSZWdFeHApIHtcclxuICAgIHJldHVybiBjb25maWcucmVnZXhwcyAhPT0gZmFsc2UgPyAnW1JlZ2V4cDonICsgdmFsLnRvU3RyaW5nKCkgKyAnXScgOiB2YWw7XHJcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnb2JqZWN0JyAmJiB2YWwuY29uc3RydWN0b3IgJiYgdHlwZW9mIHZhbC5jb25zdHJ1Y3Rvci5uYW1lID09PSAnc3RyaW5nJyAmJiB2YWwuY29uc3RydWN0b3IubmFtZS5zbGljZSgtNSkgPT09ICdFcnJvcicpIHtcclxuICAgIHZhciBzdGFjayA9ICh2YWwuc3RhY2sgfHwgJycpLnNwbGl0KCdcXG4nKS5zbGljZSgxKTtcclxuICAgIHZhciBtZXNzYWdlID0gKHZhbC5tZXNzYWdlIHx8IHZhbC50b1N0cmluZygpKTtcclxuICAgIHZhciBlcnJvciA9IG1lc3NhZ2UgKyBcIlxcblwiICsgc3RhY2s7XHJcbiAgICByZXR1cm4gY29uZmlnLmVycm9ycyAhPT0gZmFsc2UgPyAnW0Vycm9yOicgKyBlcnJvciArICddJyA6IHZhbDtcclxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSB7XHJcbiAgICBpZiAocGFyZW50cy5pbmRleE9mKHZhbCkgPj0gMCkge1xyXG4gICAgICB2YXIgcG9pbnQgPSBwYXRoLnNsaWNlKDAsIHBhcmVudHMuaW5kZXhPZih2YWwpKS5qb2luKCcuJyk7XHJcbiAgICAgIHJldHVybiAnW0NpcmN1bGFyJyArIChwb2ludCA/ICc6JyArIHBvaW50IDogJycpICsgJ10nO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFyIGNvcHksIGksIGssIGw7XHJcbiAgICAgIGlmICh2YWwuY29uc3RydWN0b3IgJiYgdHlwZW9mIHZhbC5jb25zdHJ1Y3Rvci5uYW1lID09PSAnc3RyaW5nJyAmJiB2YWwuY29uc3RydWN0b3IubmFtZS5zbGljZSgtNSkgPT09ICdBcnJheScpIHtcclxuICAgICAgICBpZiAocGFyZW50cy5sZW5ndGggPj0gY29uZmlnLmRlZXApIHtcclxuICAgICAgICAgIHJldHVybiAnW0FycmF5OicgKyB2YWwuY29uc3RydWN0b3IubmFtZSArICddJztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29weSA9IFtdO1xyXG4gICAgICAgICAgZm9yIChpID0gMCwgbCA9IHZhbC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICAgICAgY29weVtpXSA9IGRlY3ljbGVXYWxrZXIocGFyZW50cy5jb25jYXQoW3ZhbF0pLCBwYXRoLmNvbmNhdChpKSwgdmFsW2ldLCBjb25maWcpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIGNvcHk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChwYXJlbnRzLmxlbmd0aCA+PSBjb25maWcuZGVlcCkge1xyXG4gICAgICAgICAgcmV0dXJuICdbT2JqZWN0OicgKyAodmFsLmNvbnN0cnVjdG9yICYmIHZhbC5jb25zdHJ1Y3Rvci5uYW1lID8gdmFsLmNvbnN0cnVjdG9yLm5hbWUgOiAnT2JqZWN0JykgKyAnXSc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvcHkgPSB7fTtcclxuICAgICAgICAgIGZvciAoaSA9IDAsIGsgPSBPYmplY3Qua2V5cyh2YWwpLCBsID0gay5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICAgICAgY29weVtrW2ldXSA9IGRlY3ljbGVXYWxrZXIocGFyZW50cy5jb25jYXQoW3ZhbF0pLCBwYXRoLmNvbmNhdChba1tpXV0pLCB2YWxba1tpXV0sIGNvbmZpZyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gY29weTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicpIHtcclxuICAgIHJldHVybiBjb25maWcuZnVuY3Rpb25zID09PSB0cnVlID8gJ1tGdW5jdGlvbjonICsgdmFsLnRvU3RyaW5nKCkgKyAnXScgOiB1bmRlZmluZWQ7XHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiB2YWwudG9TdHJpbmcoKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7XHJcbiAgZGVDeWNsZXIsXHJcbiAgZGVDeWNsZWQsXHJcbiAgcmV2aXZlXHJcbn0iLCAiaW1wb3J0IGkxOG4gZnJvbSBcIi4uL2kxOG5cIjtcclxuaW1wb3J0IHV0aWxzIGZyb20gXCIuLi91dGlsc1wiO1xyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSB7eyBpMThuOiBzdHJpbmcgfCB7IFtsYW5nOiBzdHJpbmddOiB7IFtrOiBzdHJpbmddOiBzdHJpbmcgfSB9fX0gY2ZnIFxyXG4gKiBAcmV0dXJucyBcclxuICovXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBidWlsZEV4dGVuc2lvbkkxOE4oY2ZnKSB7XHJcbiAgaWYgKCFjZmc/LmkxOG4pIHJldHVybiBudWxsO1xyXG4gIGxldCBvdXQgPSB7XHJcbiAgICBfX2NhY2hlX186IHtcclxuICAgICAgbG9jYWxlSWRzOiBbXSxcclxuICAgICAgbG9jYWxpemF0aW9uczoge31cclxuICAgIH0sXHJcbiAgICBmb3JtYXQoa2V5LCAuLi5hcmdzKSB7XHJcbiAgICAgIHJldHVybiB1dGlscy5mb3JtYXQob3V0LmdldChrZXkpLCAuLi5hcmdzKTtcclxuICAgIH0sXHJcbiAgICBnZXQoa2V5KSB7XHJcbiAgICAgIGlmICh0eXBlb2YgY2ZnLmkxOG4gPT09IFwic3RyaW5nXCIpIGNoZWNrKCk7XHJcbiAgICAgIHJldHVybiBvdXQuX19jYWNoZV9fLmxvY2FsaXphdGlvbnNbb3V0LmxvY2FsZV0/LltrZXldXHJcbiAgICAgICAgfHwgb3V0Ll9fY2FjaGVfXy5sb2NhbGl6YXRpb25zLmRlZmF1bHQ/LltrZXldXHJcbiAgICAgICAgfHwgb3V0LmdldChrZXkpO1xyXG4gICAgfSxcclxuICAgIG1lc3NhZ2VzOiBuZXcgUHJveHkoe30sIHtcclxuICAgICAgZ2V0KF8sIHByb3ApIHtcclxuICAgICAgICByZXR1cm4gb3V0LmdldChwcm9wKTtcclxuICAgICAgfVxyXG4gICAgfSksXHJcbiAgfVxyXG4gIGFzeW5jIGZ1bmN0aW9uIGNoZWNrKCkge1xyXG4gICAgY29uc3QgbG9jYWxlID0gaTE4bi5sb2NhbGU7XHJcbiAgICBpZiAodHlwZW9mIGNmZy5pMThuID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgIGNvbnN0IEJBU0VfVVJMID0gY2ZnLmkxOG4uZW5kc1dpdGgoXCIvXCIpID8gY2ZnLmkxOG4uc2xpY2UoMCwgLTEpIDogY2ZnLmkxOG47XHJcbiAgICAgIGlmICghb3V0Ll9fY2FjaGVfXy5sb2NhbGVJZHMubGVuZ3RoKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIG91dC5fX2NhY2hlX18ubG9jYWxlSWRzID0gYXdhaXQgKGF3YWl0IGZldGNoKGAke0JBU0VfVVJMfS9sb2NhbGVzLmpzb25gLCBub1N0b3JlKSkuanNvbigpO1xyXG4gICAgICAgIH0gY2F0Y2ggeyB9XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIG91dC5fX2NhY2hlX18ubG9jYWxpemF0aW9ucy5kZWZhdWx0ID0gYXdhaXQgKGF3YWl0IGZldGNoKGAke0JBU0VfVVJMfS9kZWZhdWx0Lmpzb25gLCBub1N0b3JlKSkuanNvbigpO1xyXG4gICAgICAgIH0gY2F0Y2ggeyB9XHJcbiAgICAgIH1cclxuICAgICAgaWYgKFxyXG4gICAgICAgIG91dC5fX2NhY2hlX18ubG9jYWxlSWRzLmluY2x1ZGVzKGxvY2FsZSlcclxuICAgICAgICAmJiAhb3V0Ll9fY2FjaGVfXy5sb2NhbGl6YXRpb25zPy5bbG9jYWxlXVxyXG4gICAgICApIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgb3V0Ll9fY2FjaGVfXy5sb2NhbGl6YXRpb25zW2xvY2FsZV0gPSBhd2FpdCAoYXdhaXQgZmV0Y2goYCR7QkFTRV9VUkx9LyR7bG9jYWxlfS5qc29uYCwgbm9TdG9yZSkpLmpzb24oKTtcclxuICAgICAgICB9IGNhdGNoIHsgfTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgb3V0Ll9fY2FjaGVfXy5sb2NhbGVJZHMgPSBPYmplY3Qua2V5cyhjZmcuaTE4bik7XHJcbiAgICAgIG91dC5fX2NhY2hlX18ubG9jYWxpemF0aW9ucyA9IGNmZy5pMThuO1xyXG4gICAgfVxyXG4gIH1cclxuICBhd2FpdCBjaGVjaygpO1xyXG4gIHJldHVybiBvdXQ7XHJcbn0iLCAiaW1wb3J0IHsgQmFzaWNFdmVudEVtaXR0ZXIgfSBmcm9tIFwiLi4vLi4vbGliL0Jhc2ljRXZlbnRFbWl0dGVyLmpzXCI7XHJcbmltcG9ydCBkZXYgZnJvbSBcIi4uL2Rldi9pbmRleC5qc1wiO1xyXG5pbXBvcnQgaTE4biBmcm9tIFwiLi4vaTE4bi9pbmRleC5qc1wiO1xyXG5pbXBvcnQgbW9kdWxlcyBmcm9tIFwiLi4vbW9kdWxlcy9pbmRleC5qc1wiO1xyXG5pbXBvcnQgc3RvcmFnZSBmcm9tIFwiLi4vc3RvcmFnZS9pbmRleC5qc1wiO1xyXG5pbXBvcnQgeyBidWlsZEV4dGVuc2lvbkkxOE4gfSBmcm9tIFwiLi9pMThuLmpzXCI7XHJcbmltcG9ydCAqIGFzIG5lc3RzIGZyb20gXCJuZXN0c1wiO1xyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSB7eyBtb2R1bGVzOiB7IG5vZGU6IHsgbmFtZTogc3RyaW5nLCByZWFzb246IHN0cmluZyB9W10sIGNvbW1vbjogeyBuYW1lOiBzdHJpbmcsIHJlYXNvbjogc3RyaW5nIH1bXSwgY3VzdG9tOiB7IHJlYXNvbjogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIGxhenk6IGJvb2xlYW4sIGZpbmRlcjogeyBmaWx0ZXI6IHsgZXhwb3J0OiBib29sZWFuLCBpbjogXCJwcm9wZXJ0aWVzXCIgfCBcInN0cmluZ3NcIiB8IFwicHJvdG90eXBlc1wiLCBieTogW3N0cmluZ1tdLCBzdHJpbmdbXT9dIH0sIHBhdGg6IHsgYmVmb3JlOiBzdHJpbmcgfCBzdHJpbmdbXSwgYWZ0ZXI6IHN0cmluZyB8IHN0cmluZ1tdIH0sIG1hcDogeyBbazogc3RyaW5nXTogc3RyaW5nW10gfSB9IH1bXSwgbW9kZT86IFwiZGV2ZWxvcG1lbnRcIiB8IFwicHJvZHVjdGlvblwiIH0sIGFib3V0OiB7IG5hbWU6IHN0cmluZyB8IHsgW2s6IHN0cmluZ106IHN0cmluZyB9LCBkZXNjcmlwdGlvbjogc3RyaW5nIHwgeyBbazogc3RyaW5nXTogc3RyaW5nIH0sIHNsdWc6IHN0cmluZyB9IH19IGNmZyBcclxuICovXHJcbmFzeW5jIGZ1bmN0aW9uIGJ1aWxkQVBJKGNmZywgcGVyc2lzdEtleSkge1xyXG4gIGNvbnN0IGRldk1vZGUgPSBkZXYuZW5hYmxlZCB8fCBjZmc/Lm1vZHVsZXM/Lm1vZGUgPT09IFwiZGV2ZWxvcG1lbnRcIjtcclxuICBjb25zdCBwZXJzaXN0ID0gYXdhaXQgc3RvcmFnZS5jcmVhdGVQZXJzaXN0TmVzdChwZXJzaXN0S2V5KTtcclxuICBjb25zdCBvdXQgPSB7XHJcbiAgICBtb2R1bGVzOiB7XHJcbiAgICAgIF9fY2FjaGVfXzoge1xyXG4gICAgICAgIGNvbW1vbjoge30sXHJcbiAgICAgICAgbm9kZToge30sXHJcbiAgICAgICAgY3VzdG9tOiB7fSxcclxuICAgICAgICBjdXN0b21MYXp5OiB7fVxyXG4gICAgICB9LFxyXG4gICAgICByZXF1aXJlKG5hbWUpIHtcclxuICAgICAgICBpZiAoIWRldk1vZGUpIHtcclxuICAgICAgICAgIGlmICh0eXBlb2Ygb3V0Lm1vZHVsZXMuX19jYWNoZV9fLm5vZGVbbmFtZV0gIT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBvdXQubW9kdWxlcy5fX2NhY2hlX18ubm9kZVtuYW1lXTtcclxuICAgICAgICAgIGlmIChjZmc/Lm1vZHVsZXM/Lm5vZGU/LnNvbWU/LihpID0+IGkubmFtZSA9PT0gbmFtZSkpIHJldHVybiBvdXQubW9kdWxlcy5fX2NhY2hlX18ubm9kZVtuYW1lXSA9IG1vZHVsZXMucmVxdWlyZShuYW1lKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmV0dXJuIG1vZHVsZXMucmVxdWlyZShuYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgIH0sXHJcbiAgICAgIGNvbW1vbjogbmV3IFByb3h5KHt9LCB7XHJcbiAgICAgICAgZ2V0KF8sIHByb3ApIHtcclxuICAgICAgICAgIGlmICghZGV2TW9kZSkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIG91dC5tb2R1bGVzLl9fY2FjaGVfXy5jb21tb25bcHJvcF0gIT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBvdXQubW9kdWxlcy5fX2NhY2hlX18uY29tbW9uW3Byb3BdO1xyXG4gICAgICAgICAgICBpZiAoY2ZnPy5tb2R1bGVzPy5jb21tb24/LnNvbWU/LihpID0+IGkubmFtZSA9PT0gcHJvcCkpIHJldHVybiBvdXQubW9kdWxlcy5fX2NhY2hlX18uY29tbW9uW3Byb3BdID0gbW9kdWxlcy5jb21tb25bcHJvcF07XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbW9kdWxlcy5jb21tb25bcHJvcF07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9LFxyXG4gICAgICB9KSxcclxuICAgICAgY3VzdG9tOiBuZXcgUHJveHkoe30sIHtcclxuICAgICAgICBnZXQoXywgcHJvcCkge1xyXG4gICAgICAgICAgaWYgKHR5cGVvZiBvdXQubW9kdWxlcy5fX2NhY2hlX18uY3VzdG9tW3Byb3BdICE9PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gb3V0Lm1vZHVsZXMuX19jYWNoZV9fLmN1c3RvbVtwcm9wXTtcclxuICAgICAgICAgIGxldCBkYXRhID0gY2ZnPy5tb2R1bGVzPy5jdXN0b20/LnNvbWU/LihpID0+IGkubmFtZSA9PT0gcHJvcCk7XHJcbiAgICAgICAgICBpZiAoIWRhdGEpIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgaWYgKGRhdGEubGF6eSkge1xyXG4gICAgICAgICAgICBsZXQgcHJvbSA9IG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgICBsZXQgciA9IGF3YWl0IG1vZHVsZXMud2VicGFjay5sYXp5RmluZEJ5RmluZGVyKGRhdGEuZmluZGVyKTtcclxuICAgICAgICAgICAgICBvdXQubW9kdWxlcy5fX2NhY2hlX18uY3VzdG9tTGF6eVtwcm9wXSA9IHI7XHJcbiAgICAgICAgICAgICAgcmVzb2x2ZShyKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG91dC5tb2R1bGVzLl9fY2FjaGVfXy5jdXN0b21bcHJvcF0gPSB7XHJcbiAgICAgICAgICAgICAgZ2V0KCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb207XHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBnZXQgdmFsdWUoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb3V0Lm1vZHVsZXMuX19jYWNoZV9fLmN1c3RvbUxhenlbcHJvcF07XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IHZhbHVlID0gbW9kdWxlcy53ZWJwYWNrLmZpbmRCeUZpbmRlcihkYXRhLmZpbmRlcik7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZT8udmFsdWUgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgIG91dC5tb2R1bGVzLl9fY2FjaGVfXy5jdXN0b21bcHJvcF0gPSB2YWx1ZSA/IE9iamVjdC5hc3NpZ24odmFsdWUsIHsgdmFsdWUsIGdldCgpIHsgcmV0dXJuIHZhbHVlIH0gfSkgOiBudWxsO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBvdXQubW9kdWxlcy5fX2NhY2hlX18uY3VzdG9tW3Byb3BdID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGNhdGNoIHtcclxuICAgICAgICAgICAgICBvdXQubW9kdWxlcy5fX2NhY2hlX18uY3VzdG9tW3Byb3BdID0gdmFsdWUgPyB7IHZhbHVlLCBnZXQoKSB7IHJldHVybiB2YWx1ZSB9IH0gOiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gb3V0Lm1vZHVsZXMuX19jYWNoZV9fLmN1c3RvbVtwcm9wXTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pLFxyXG4gICAgfSxcclxuICAgIGkxOG4sXHJcbiAgICBleHRlbnNpb246IHtcclxuICAgICAgY29uZmlnOiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGNmZykpLFxyXG4gICAgICBwZXJzaXN0LFxyXG4gICAgICBpMThuOiBhd2FpdCBidWlsZEV4dGVuc2lvbkkxOE4oY2ZnKSxcclxuICAgICAgZXZlbnRzOiBuZXcgQmFzaWNFdmVudEVtaXR0ZXIoKSxcclxuICAgICAgc3Vic2NyaXB0aW9uczogW11cclxuICAgIH1cclxuICB9O1xyXG5cclxuICByZXR1cm4gb3V0O1xyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93Q29uZmlybWF0aW9uTW9kYWwoKSB7XHJcblxyXG59XHJcblxyXG5jb25zdCBvdXQgPSB7XHJcbiAgX19jYWNoZV9fOiB7XHJcbiAgICBpbml0aWFsaXplZDogZmFsc2UsXHJcbiAgICBsb2FkZWQ6IG5lc3RzLm1ha2Uoe30pXHJcbiAgfSxcclxuICBzdG9yYWdlOiB7XHJcbiAgICAvKiogQHR5cGUge25lc3RzLk5lc3R9ICovXHJcbiAgICBpbnN0YWxsZWQ6IHt9XHJcbiAgfSxcclxuICBidWlsZEFQSSxcclxuICBhc3luYyBpbml0KCkge1xyXG4gICAgaWYgKG91dC5fX2NhY2hlX18uaW5pdGlhbGl6ZWQpIHJldHVybjtcclxuICAgIG91dC5fX2NhY2hlX18uaW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG4gICAgb3V0LnN0b3JhZ2UuaW5zdGFsbGVkID0gYXdhaXQgc3RvcmFnZS5jcmVhdGVQZXJzaXN0TmVzdChcIkV4dGVuc2lvbnM7SW5zdGFsbGVkXCIpO1xyXG4gIH0sXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHVybCBcclxuICAgKi9cclxuICBhc3luYyBpbnN0YWxsKHVybCwgZGVmYXVsdENvbmZpZyA9IHt9KSB7XHJcbiAgICBpZiAoIW91dC5fX2NhY2hlX18uaW5pdGlhbGl6ZWQpIGF3YWl0IG91dC5pbml0KCk7XHJcbiAgICBpZiAodXJsLmVuZHNXaXRoKFwiL1wiKSkgdXJsID0gdXJsLnNsaWNlKDAsIC0xKTtcclxuICAgIGlmIChvdXQuc3RvcmFnZS5pbnN0YWxsZWQuZ2hvc3RbdXJsXSkgdGhyb3cgbmV3IEVycm9yKGBcIiR7dXJsfVwiIGV4dGVuc2lvbiBpcyBhbHJlYWR5IGluc3RhbGxlZC5gKTtcclxuXHJcbiAgICBsZXQgbWV0YVJlc3AgPSBhd2FpdCBmZXRjaChgJHt1cmx9L21ldGFkYXRhLmpzb25gKTtcclxuICAgIGlmIChtZXRhUmVzcC5zdGF0dXMgIT09IDIwMCkgdGhyb3cgbmV3IEVycm9yKGBcIiR7dXJsfVwiIGV4dGVuc2lvbiBtZXRhZGF0YSBpcyBub3QgcmVzcG9uZGVkIHdpdGggMjAwIHN0YXR1cyBjb2RlLmApO1xyXG4gICAgbGV0IG1ldGFkYXRhID0gYXdhaXQgbWV0YVJlc3AuanNvbigpO1xyXG5cclxuICAgIGxldCByZWFkbWVSZXNwID0gYXdhaXQgZmV0Y2goYCR7dXJsfS9yZWFkbWUubWRgKTtcclxuICAgIGxldCByZWFkbWUgPSByZWFkbWVSZXNwLnN0YXR1cyA9PT0gMjAwID8gYXdhaXQgcmVhZG1lUmVzcC50ZXh0KCkgOiBudWxsO1xyXG5cclxuICAgIC8vIFRPRE86IFNob3cgbW9kYWwgZm9yIHVzZXIgdG8gYWNjZXB0IHRoZSBleHRlbnNpb24gKHRlcm1zLCBwcml2YWN5LCBldGMuKVxyXG4gICAgc2hvd0NvbmZpcm1hdGlvbk1vZGFsKHtcclxuICAgICAgbWV0YWRhdGEsXHJcbiAgICAgIHJlYWRtZSxcclxuICAgICAgY29uZmlnOiB7XHJcbiAgICAgICAgYXV0b1VwZGF0ZTogdHJ1ZSxcclxuICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgIG9yZGVyOiAwLFxyXG4gICAgICAgIC4uLmRlZmF1bHRDb25maWdcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgbGV0IHNvdXJjZVJlc3AgPSBhd2FpdCBmZXRjaChgJHt1cmx9L3NvdXJjZS5qc2ApO1xyXG4gICAgaWYgKHNvdXJjZVJlc3Auc3RhdHVzICE9PSAyMDApIHRocm93IG5ldyBFcnJvcihgXCIke3VybH1cIiBleHRlbnNpb24gc291cmNlIGlzIG5vdCByZXNwb25kZWQgd2l0aCAyMDAgc3RhdHVzIGNvZGUuYCk7XHJcbiAgICBsZXQgc291cmNlID0gYXdhaXQgc291cmNlUmVzcC50ZXh0KCk7XHJcblxyXG4gICAgb3V0LnN0b3JhZ2UuaW5zdGFsbGVkLnN0b3JlW3VybF0gPSB7XHJcbiAgICAgIG1ldGFkYXRhLFxyXG4gICAgICBzb3VyY2UsXHJcbiAgICAgIHJlYWRtZSxcclxuICAgICAgY29uZmlnOiB7XHJcbiAgICAgICAgYXV0b1VwZGF0ZTogdHJ1ZSxcclxuICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgIG9yZGVyOiAwLFxyXG4gICAgICAgIC4uLmRlZmF1bHRDb25maWdcclxuICAgICAgfSxcclxuICAgICAgZXh0cmE6IHtcclxuICAgICAgICBsYXN0VXBkYXRlZEF0OiBEYXRlLm5vdygpXHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgYXdhaXQgb3V0LmxvYWQodXJsKTtcclxuICB9LFxyXG4gIGFzeW5jIHVwZGF0ZSh1cmwpIHtcclxuICAgIGlmICghb3V0Ll9fY2FjaGVfXy5pbml0aWFsaXplZCkgYXdhaXQgb3V0LmluaXQoKTtcclxuICAgIGlmICghb3V0LnN0b3JhZ2UuaW5zdGFsbGVkLmdob3N0W3VybF0pIHRocm93IG5ldyBFcnJvcihgXCIke3VybH1cIiBleHRlbnNpb24gaXMgbm90IGluc3RhbGxlZC5gKTtcclxuICAgIGlmIChvdXQuX19jYWNoZV9fLmxvYWRlZC5naG9zdFt1cmxdKSB0aHJvdyBuZXcgRXJyb3IoYFwiJHt1cmx9XCIgZXh0ZW5zaW9uIGlzIGxvYWRlZC4gUGxlYXNlIHVubG9hZCBpdCBmaXJzdC5gKTtcclxuXHJcbiAgICBsZXQgZGF0YSA9IG91dC5zdG9yYWdlLmluc3RhbGxlZC5naG9zdFt1cmxdO1xyXG5cclxuICAgIGxldCBtZXRhUmVzcCA9IGF3YWl0IGZldGNoKGAke3VybH0vbWV0YWRhdGEuanNvbmApO1xyXG4gICAgaWYgKG1ldGFSZXNwLnN0YXR1cyAhPT0gMjAwKSB0aHJvdyBuZXcgRXJyb3IoYFwiJHt1cmx9XCIgZXh0ZW5zaW9uIG1ldGFkYXRhIGlzIG5vdCByZXNwb25kZWQgd2l0aCAyMDAgc3RhdHVzIGNvZGUuYCk7XHJcbiAgICBsZXQgbWV0YWRhdGEgPSBhd2FpdCBtZXRhUmVzcC5qc29uKCk7XHJcblxyXG4gICAgaWYgKGRhdGEubWV0YWRhdGEuaGFzaCA9PT0gbWV0YWRhdGEuaGFzaCkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgIGxldCByZWFkbWVSZXNwID0gYXdhaXQgZmV0Y2goYCR7dXJsfS9yZWFkbWUubWRgKTtcclxuICAgIGxldCByZWFkbWUgPSByZWFkbWVSZXNwLnN0YXR1cyA9PT0gMjAwID8gYXdhaXQgcmVhZG1lUmVzcC50ZXh0KCkgOiBudWxsO1xyXG5cclxuICAgIGxldCBzb3VyY2VSZXNwID0gYXdhaXQgZmV0Y2goYCR7dXJsfS9zb3VyY2UuanNgKTtcclxuICAgIGlmIChzb3VyY2VSZXNwLnN0YXR1cyAhPT0gMjAwKSB0aHJvdyBuZXcgRXJyb3IoYFwiJHt1cmx9XCIgZXh0ZW5zaW9uIHNvdXJjZSBpcyBub3QgcmVzcG9uZGVkIHdpdGggMjAwIHN0YXR1cyBjb2RlLmApO1xyXG4gICAgbGV0IHNvdXJjZSA9IGF3YWl0IHNvdXJjZVJlc3AudGV4dCgpO1xyXG5cclxuICAgIHV0LnN0b3JhZ2UuaW5zdGFsbGVkLnN0b3JlW3VybF0gPSB7XHJcbiAgICAgIG1ldGFkYXRhLFxyXG4gICAgICBzb3VyY2UsXHJcbiAgICAgIHJlYWRtZSxcclxuICAgICAgY29uZmlnOiBkYXRhLmNvbmZpZyxcclxuICAgICAgZXh0cmE6IHtcclxuICAgICAgICBsYXN0VXBkYXRlZEF0OiBEYXRlLm5vdygpXHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfSxcclxuICBhc3luYyB1bmluc3RhbGwodXJsKSB7XHJcbiAgICBpZiAoIW91dC5fX2NhY2hlX18uaW5pdGlhbGl6ZWQpIGF3YWl0IG91dC5pbml0KCk7XHJcbiAgICBpZiAoIW91dC5zdG9yYWdlLmluc3RhbGxlZC5naG9zdFt1cmxdKSB0aHJvdyBuZXcgRXJyb3IoYFwiJHt1cmx9XCIgZXh0ZW5zaW9uIGlzIG5vdCBpbnN0YWxsZWQuYCk7XHJcblxyXG4gICAgZGVsZXRlIG91dC5zdG9yYWdlLmluc3RhbGxlZC5zdG9yZVt1cmxdO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGF3YWl0IG91dC51bmxvYWQodXJsKTtcclxuICAgIH0gY2F0Y2ggeyB9XHJcbiAgfSxcclxuICBhc3luYyBsb2FkKHVybCkge1xyXG4gICAgaWYgKCFvdXQuX19jYWNoZV9fLmluaXRpYWxpemVkKSBhd2FpdCBvdXQuaW5pdCgpO1xyXG4gICAgaWYgKCFvdXQuc3RvcmFnZS5pbnN0YWxsZWQuZ2hvc3RbdXJsXSkgdGhyb3cgbmV3IEVycm9yKGBcIiR7dXJsfVwiIGV4dGVuc2lvbiBpcyBub3QgaW5zdGFsbGVkLmApO1xyXG4gICAgbGV0IGRhdGEgPSBvdXQuc3RvcmFnZS5pbnN0YWxsZWQuZ2hvc3RbdXJsXTtcclxuXHJcbiAgICBpZiAob3V0Ll9fY2FjaGVfXy5sb2FkZWQuZ2hvc3RbdXJsXSkgdGhyb3cgbmV3IEVycm9yKGBcIiR7dXJsfVwiIGV4dGVuc2lvbiBpcyBhbHJlYWR5IGxvYWRlZC5gKTtcclxuXHJcbiAgICBsZXQgYXBpID0gYXdhaXQgb3V0LmJ1aWxkQVBJKGRhdGEubWV0YWRhdGEsIGBFeHRlbnNpb247UGVyc2lzdDske3VybH1gKTtcclxuICAgIGxldCBldmFsdWF0ZWQgPSBvdXQuZXZhbHVhdGUoZGF0YS5zb3VyY2UsIGFwaSk7XHJcblxyXG4gICAgYXdhaXQgZXZhbHVhdGVkPy5sb2FkPy4oKTtcclxuXHJcbiAgICBvdXQuX19jYWNoZV9fLmxvYWRlZC5zdG9yZVt1cmxdID0ge1xyXG4gICAgICBldmFsdWF0ZWQsXHJcbiAgICAgIGFwaVxyXG4gICAgfTtcclxuICB9LFxyXG4gIGFzeW5jIHVubG9hZCh1cmwpIHtcclxuICAgIGlmICghb3V0Ll9fY2FjaGVfXy5pbml0aWFsaXplZCkgYXdhaXQgb3V0LmluaXQoKTtcclxuICAgIGlmICghb3V0LnN0b3JhZ2UuaW5zdGFsbGVkLmdob3N0W3VybF0pIHRocm93IG5ldyBFcnJvcihgXCIke3VybH1cIiBleHRlbnNpb24gaXMgbm90IGluc3RhbGxlZC5gKTtcclxuXHJcbiAgICBpZiAoIW91dC5fX2NhY2hlX18ubG9hZGVkLmdob3N0W3VybF0pIHRocm93IG5ldyBFcnJvcihgXCIke3VybH1cIiBleHRlbnNpb24gaXMgbm90IGxvYWRlZC5gKTtcclxuXHJcbiAgICBsZXQgeyBldmFsdWF0ZWQsIGFwaSB9ID0gb3V0Ll9fY2FjaGVfXy5sb2FkZWQuZ2hvc3RbdXJsXTtcclxuXHJcbiAgICBhcGkuZXh0ZW5zaW9uLnN1YnNjcmlwdGlvbnMuZm9yRWFjaChpID0+IHR5cGVvZiBpID09PSBcImZ1bmN0aW9uXCIgJiYgaSgpKTtcclxuICAgIGFwaS5leHRlbnNpb24uZXZlbnRzLmVtaXQoXCJ1bmxvYWRcIik7XHJcbiAgICBhd2FpdCBldmFsdWF0ZWQ/LnVubG9hZD8uKCk7XHJcblxyXG4gICAgZGVsZXRlIG91dC5fX2NhY2hlX18ubG9hZGVkLnN0b3JlW3VybF07XHJcbiAgfSxcclxuICBldmFsdWF0ZShzb3VyY2UsIGFwaSkge1xyXG4gICAgY29uc3QgJGFjb3JkID0gYXBpO1xyXG4gICAgcmV0dXJuIGV2YWwoc291cmNlKTtcclxuICB9LFxyXG4gIGFzeW5jIGxvYWRBbGwoKSB7XHJcbiAgICBpZiAoIW91dC5fX2NhY2hlX18uaW5pdGlhbGl6ZWQpIGF3YWl0IG91dC5pbml0KCk7XHJcbiAgICByZXR1cm4gUHJvbWlzZS5hbGwoT2JqZWN0LmVudHJpZXMob3V0LnN0b3JhZ2UuaW5zdGFsbGVkLmdob3N0KS5zb3J0KChbLCBhXSwgWywgYl0pID0+IGIuY29uZmlnLm9yZGVyIC0gYS5jb25maWcub3JkZXIpLm1hcCgoW3VybF0pID0+IG91dC5sb2FkKHVybCkpKTtcclxuICB9LFxyXG4gIGFzeW5jIHVubG9hZEFsbCgpIHtcclxuICAgIGlmICghb3V0Ll9fY2FjaGVfXy5pbml0aWFsaXplZCkgYXdhaXQgb3V0LmluaXQoKTtcclxuICAgIHJldHVybiBQcm9taXNlLmFsbChPYmplY3Qua2V5cyhvdXQuX19jYWNoZV9fLmxvYWRlZC5naG9zdCkubWFwKHVybCA9PiBvdXQudW5sb2FkKHVybCkpKTtcclxuICB9LFxyXG4gIGdldCh1cmwpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGxvYWRlZDogb3V0Ll9fY2FjaGVfXy5sb2FkZWQuZ2hvc3RbdXJsXSxcclxuICAgICAgaW5zdGFsbGVkOiBvdXQuc3RvcmFnZS5pbnN0YWxsZWQuZ2hvc3RbdXJsXVxyXG4gICAgfTtcclxuICB9LFxyXG4gIHV0aWxzOiB7XHJcbiAgICBcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBvdXQ7IiwgImltcG9ydCB7IHdhaXRVbnRpbENvbm5lY3Rpb25PcGVuIH0gZnJvbSBcIi4uLy4uL290aGVyL3V0aWxzLmpzXCI7XHJcbmltcG9ydCBjb21tb24gZnJvbSBcIi4uL21vZHVsZXMvY29tbW9uLmpzXCI7XHJcbmltcG9ydCBwYXRjaGVyIGZyb20gXCIuLi9wYXRjaGVyL2luZGV4LmpzXCI7XHJcblxyXG5jb25zdCBzb2NrZXRzID0gbmV3IFNldCgpO1xyXG5jb25zdCBoYW5kbGVycyA9IG5ldyBNYXAoKTtcclxuXHJcbndhaXRVbnRpbENvbm5lY3Rpb25PcGVuKCkudGhlbigoKSA9PiB7XHJcbiAgcGF0Y2hlci5pbnN0ZWFkKFxyXG4gICAgXCJoYW5kbGVDb25uZWN0aW9uXCIsXHJcbiAgICBjb21tb24uV2ViU29ja2V0LFxyXG4gICAgKGFyZ3MsIG9yaWcpID0+IHtcclxuICAgICAgY29uc3Qgd3MgPSBhcmdzWzBdO1xyXG4gICAgICBpZiAod3MudXBncmFkZVJlcSgpLnVybCAhPT0gXCIvYWNvcmRcIikgcmV0dXJuIG9yaWcoLi4uYXJncyk7XHJcblxyXG4gICAgICBzb2NrZXRzLmFkZCh3cyk7XHJcblxyXG4gICAgICB3cy5vbihcIm1lc3NhZ2VcIiwgYXN5bmMgKG1zZykgPT4ge1xyXG4gICAgICAgIGxldCBqc29uO1xyXG5cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAganNvbiA9IEpTT04ucGFyc2UobXNnKTtcclxuICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShqc29uKSB8fCBqc29uLmxlbmd0aCA8IDEgfHwganNvbi5sZW5ndGggPiAzKVxyXG4gICAgICAgICAgICB0aHJvdyBcIkFycmF5IGV4cGVjdGVkIGFzIG1lc3NhZ2UuXCI7XHJcbiAgICAgICAgICBpZiAodHlwZW9mIGpzb25bMF0gIT0gXCJzdHJpbmdcIikgdGhyb3cgXCJBcnJheVswXSBuZWVkcyB0byBiZSBzdHJpbmcuXCI7XHJcbiAgICAgICAgICBpZiAodHlwZW9mIGpzb25bMV0gIT0gXCJzdHJpbmdcIikgdGhyb3cgXCJBcnJheVsxXSBuZWVkcyB0byBiZSBzdHJpbmcuXCI7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICB3cy5zZW5kKFxyXG4gICAgICAgICAgICBKU09OLnN0cmluZ2lmeShbXHJcbiAgICAgICAgICAgICAgbnVsbCxcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBvazogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBlcnJvcjogYCR7ZXJyfWAsXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXSlcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBbZXZlbnRJZCwgZXZlbnROYW1lLCBldmVudERhdGFdID0ganNvbjtcclxuXHJcbiAgICAgICAgY29uc3QgaGFuZGxlciA9IGhhbmRsZXJzLmdldChldmVudE5hbWUpO1xyXG5cclxuICAgICAgICBpZiAoIWhhbmRsZXIpXHJcbiAgICAgICAgICByZXR1cm4gd3Muc2VuZChcclxuICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoW1xyXG4gICAgICAgICAgICAgIGV2ZW50SWQsXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgb2s6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgZXJyb3I6IGBVbmFibGUgdG8gZmluZCBoYW5kbGVyLmAsXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXSlcclxuICAgICAgICAgICk7XHJcblxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICBsZXQgcmVzcG9uc2UgPSBhd2FpdCBoYW5kbGVyKGV2ZW50RGF0YSk7XHJcbiAgICAgICAgICB3cy5zZW5kKFxyXG4gICAgICAgICAgICBKU09OLnN0cmluZ2lmeShbXHJcbiAgICAgICAgICAgICAgZXZlbnRJZCxcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBvazogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHJlc3BvbnNlLFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIF0pXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgd3Muc2VuZChcclxuICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoW1xyXG4gICAgICAgICAgICAgIGV2ZW50SWQsXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgb2s6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgZXJyb3I6IGAke2Vycn1gLFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIF0pXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgICB3cy5vbihcImNsb3NlXCIsICgpID0+IHNvY2tldHMuZGVsZXRlKHdzKSk7XHJcbiAgICB9XHJcbiAgKTtcclxufSk7XHJcblxyXG5mdW5jdGlvbiBzZXQoZXZlbnROYW1lLCBjYWxsYmFjaykge1xyXG4gIGlmICh0eXBlb2YgZXZlbnROYW1lICE9IFwic3RyaW5nXCIpXHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJFdmVudE5hbWUgbmVlZHMgdG8gYmUgYSBzdHJpbmcuXCIpO1xyXG4gIGlmICh0eXBlb2YgY2FsbGJhY2sgIT0gXCJmdW5jdGlvblwiKVxyXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ2FsbGJhY2sgbmVlZHMgdG8gYmUgYSBmdW5jdGlvbi5cIik7XHJcbiAgaWYgKGhhbmRsZXJzLmhhcyhldmVudE5hbWUpKVxyXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiRXZlbnROYW1lIGFscmVhZHkgaW4gdXNlLlwiKTtcclxuICBoYW5kbGVycy5zZXQoZXZlbnROYW1lLCBjYWxsYmFjayk7XHJcbiAgcmV0dXJuICgpID0+IHtcclxuICAgIGhhbmRsZXJzLmRlbGV0ZShldmVudE5hbWUpO1xyXG4gIH07XHJcbn1cclxuZnVuY3Rpb24gdHJpZ2dlcihldmVudE5hbWUsIC4uLmFyZ3MpIHtcclxuICBpZiAoIXNvY2tldEV2ZW50cy5oYXMoZXZlbnROYW1lKSlcclxuICAgIHRocm93IG5ldyBFcnJvcihcIlVuYWJsZSB0byBmaW5kIGhhbmRsZXIhXCIpO1xyXG4gIHJldHVybiBzb2NrZXRFdmVudHMuZ2V0KGV2ZW50TmFtZSkoLi4uYXJncyk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBzZXQsXHJcbiAgdHJpZ2dlclxyXG59XHJcblxyXG4iLCAiaW1wb3J0IGV4dGVuc2lvbnMgZnJvbSBcIi4uL2V4dGVuc2lvbnMvaW5kZXguanNcIjtcclxuaW1wb3J0IGxvZ2dlciBmcm9tIFwiLi4vdXRpbHMvbG9nZ2VyLmpzXCI7XHJcbmltcG9ydCBpMThuIGZyb20gXCIuLi9pMThuL2luZGV4LmpzXCI7XHJcbmltcG9ydCB3ZWJzb2NrZXQgZnJvbSBcIi4uL3dlYnNvY2tldC9pbmRleC5qc1wiO1xyXG5pbXBvcnQgcGF0Y2hlciBmcm9tIFwiLi4vcGF0Y2hlci9pbmRleC5qc1wiO1xyXG5cclxubGV0IGRldk1vZGVFbmFibGVkID0gZmFsc2U7XHJcblxyXG5sZXQgaXNMb2FkaW5nID0gZmFsc2U7XHJcblxyXG5sZXQgbG9hZGVkO1xyXG5sZXQgaW5zdGFsbGVkO1xyXG5cclxuY29uc3QgZXh0ZW5zaW9uID0ge1xyXG4gIGdldCBsb2FkZWQoKSB7IHJldHVybiBsb2FkZWQ7IH0sXHJcbiAgZ2V0IGluc3RhbGxlZCgpIHsgcmV0dXJuIGluc3RhbGxlZDsgfSxcclxuICB1bmxvYWQoKSB7XHJcbiAgICBpZiAoIWxvYWRlZCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgbG9hZGVkLmFwaS5leHRlbnNpb24uc3Vic2NyaXB0aW9ucy5mb3JFYWNoKChmKSA9PiB0eXBlb2YgZiA9PT0gXCJmdW5jdGlvblwiICYmIGYoKSk7XHJcbiAgICBsb2FkZWQuYXBpLmV4dGVuc2lvbi5ldmVudHMuZW1pdChcInVubG9hZFwiKTtcclxuICAgIGxvYWRlZC5ldmFsdWF0ZWQ/LnVubG9hZD8uKCk7XHJcbiAgICBsb2FkZWQgPSBudWxsO1xyXG4gICAgaW5zdGFsbGVkID0gbnVsbDtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH0sXHJcbiAgYXN5bmMgbG9hZChzb3VyY2UsIG1hbmlmZXN0KSB7XHJcbiAgICBpZiAoIXNvdXJjZSB8fCAhbWFuaWZlc3QpIHRocm93IG5ldyBFcnJvcihgU291cmNlIGFuZCBtYW5pZmVzdCBhcmUgcmVxdWlyZWQgdG8gbG9hZCBhbiBleHRlbnNpb24hYCk7XHJcbiAgICBpZiAobG9hZGVkKSByZXR1cm4gZmFsc2U7XHJcbiAgICBpZiAoaXNMb2FkaW5nKSByZXR1cm4gZmFsc2U7XHJcbiAgICBpc0xvYWRpbmcgPSB0cnVlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgbGV0IGFwaSA9IGF3YWl0IGV4dGVuc2lvbnMuYnVpbGRBUEkobWFuaWZlc3QsIGBFeHRlbnNpb247UGVyc2lzdDtEZXZlbG9wbWVudGApO1xyXG4gICAgICBcclxuICAgICAgbGV0IGV2YWx1YXRlZCA9IGV4dGVuc2lvbnMuZXZhbHVhdGUoc291cmNlLCBhcGkpO1xyXG4gICAgICBpZiAobWFuaWZlc3QudHlwZSA9PT0gXCJ0aGVtZVwiKSB7XHJcbiAgICAgICAgbGV0IGNzcyA9IGV2YWx1YXRlZCgpO1xyXG4gICAgICAgIGxldCBjb25maWcgPSBtYW5pZmVzdC5jb25maWcgPz8gW107XHJcbiAgICAgICAgY29uZmlnLlxyXG5cclxuICAgICAgICBwYXRjaGVyLmluamVjdENTUyhjc3MpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZXZhbHVhdGVkPy5sb2FkPy4oKTtcclxuICAgICAgfVxyXG4gICAgICBmdW5jdGlvbiBpbnRlcmFjdChkYXRhKSB7XHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgICBsb2FkZWQgPSB7XHJcbiAgICAgICAgZXZhbHVhdGVkLFxyXG4gICAgICAgIGFwaSxcclxuICAgICAgICBpbnRlcmFjdFxyXG4gICAgICB9O1xyXG4gICAgICBpbnN0YWxsZWQgPSB7XHJcbiAgICAgICAgbWFuaWZlc3RcclxuICAgICAgfTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBsb2dnZXIuZXJyb3IoYFVuYWJsZSB0byBsb2FkIGRldmVsb3BtZW50IGV4dGVuc2lvbi5gLCBpMThuLmxvY2FsaXplKG1hbmlmZXN0LmFib3V0Lm5hbWUpLCBlcnIpO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpc0xvYWRpbmcgPSBmYWxzZTtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxufVxyXG5cclxuY29uc3Qgb3V0ID0ge1xyXG4gIGdldCBlbmFibGVkKCkge1xyXG4gICAgcmV0dXJuIGRldk1vZGVFbmFibGVkO1xyXG4gIH0sXHJcbiAgc2V0IGVuYWJsZWQodmFsdWUpIHtcclxuICAgIGlmICghZ2xvYmFsVGhpc1tcIjxQUkVMT0FEX0tFWT5cIl0uaXNEZXZUb29sc09wZW4oKSkgdGhyb3cgbmV3IEVycm9yKFwiRGV2IG1vZGUgc3RhdHVzIGNhbiBvbmx5IGJlIG1vZGlmaWVkIHdoZW4gRGV2VG9vbHMgaXMgb3BlbiFcIik7XHJcbiAgICBkZXZNb2RlRW5hYmxlZCA9IHZhbHVlO1xyXG4gIH0sXHJcbiAgZ2V0IGV4dGVuc2lvbigpIHtcclxuICAgIGlmICghZGV2TW9kZUVuYWJsZWQpIHRocm93IG5ldyBFcnJvcihcIkRldiBtb2RlIGlzIG5vdCBlbmFibGVkIVwiKTtcclxuICAgIHJldHVybiBleHRlbnNpb247XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBvdXQ7XHJcblxyXG5sZXQgaXNQcm9jZXNzaW5nID0gZmFsc2U7XHJcbndlYnNvY2tldC5zZXQoXHJcbiAgXCJVcGRhdGVEZXZlbG9wbWVudEV4dGVuc2lvblwiLFxyXG4gIGFzeW5jICh7IHNvdXJjZSwgbWFuaWZlc3QgfSA9IHt9KSA9PiB7XHJcbiAgICBpZiAoIWRldk1vZGVFbmFibGVkKVxyXG4gICAgICByZXR1cm4gbG9nZ2VyLndhcm4oYERldmVsb3BtZW50IGV4dGVuc2lvbiB3YXMgc2VudCBiZWZvcmUgZGV2IG1vZGUgd2FzIGVuYWJsZWQuYCk7XHJcblxyXG4gICAgaWYgKCFzb3VyY2UgfHwgIW1hbmlmZXN0KVxyXG4gICAgICByZXR1cm4gbG9nZ2VyLndhcm4oYERldmVsb3BtZW50IGV4dGVuc2lvbiB3YXMgc2VudCB3aXRob3V0IHNvdXJjZSBvciBtYW5pZmVzdC5gKTtcclxuXHJcbiAgICBpZiAoaXNQcm9jZXNzaW5nKVxyXG4gICAgICByZXR1cm4gbG9nZ2VyLndhcm4oYERldmVsb3BtZW50IGV4dGVuc2lvbiB3YXMgc2VudCB3aGlsZSBleHRlbnNpb24gd2FzIGFscmVhZHkgYmVpbmcgcHJvY2Vzc2VkLmApO1xyXG5cclxuICAgIGlzUHJvY2Vzc2luZyA9IHRydWU7XHJcbiAgICBleHRlbnNpb24udW5sb2FkKCk7XHJcbiAgICBhd2FpdCBuZXcgUHJvbWlzZSgocikgPT4gc2V0VGltZW91dChyLCAxKSk7XHJcbiAgICBsZXQgc3VjY2VzcyA9IGF3YWl0IGV4dGVuc2lvbi5sb2FkKHNvdXJjZSwgbWFuaWZlc3QpO1xyXG4gICAgaWYgKHN1Y2Nlc3MpIGxvZ2dlci5pbmZvKGBEZXZlbG9wbWVudCBleHRlbnNpb24gaXMgbG9hZGVkISgke2kxOG4ubG9jYWxpemUobWFuaWZlc3QuYWJvdXQubmFtZSl9KWApO1xyXG4gICAgaXNQcm9jZXNzaW5nID0gZmFsc2U7XHJcbiAgfVxyXG4pIiwgImV4cG9ydCBkZWZhdWx0IHtcclxuICBwcm9jZXNzOiBnbG9iYWxUaGlzW1wiPFBSRUxPQURfS0VZPlwiXS5wcm9jZXNzLFxyXG4gIGlzRGV2VG9vbHNPcGVuOiBnbG9iYWxUaGlzW1wiPFBSRUxPQURfS0VZPlwiXS5pc0RldlRvb2xzT3BlblxyXG59XHJcblxyXG4iLCAiZXhwb3J0IGRlZmF1bHQgYFxuLmFjb3JkLS1sYXllci1jb250YWluZXJ7LS10b3Atb2Zmc2V0OiAwcHg7d2lkdGg6MTAwdnc7aGVpZ2h0OmNhbGMoMTAwdmggLSB2YXIoLS10b3Atb2Zmc2V0KSk7ei1pbmRleDo5OTk5OTk5O3BvaW50ZXItZXZlbnRzOm5vbmU7cG9zaXRpb246YWJzb2x1dGU7dG9wOnZhcigtLXRvcC1vZmZzZXQpO2xlZnQ6MHB4fS5hY29yZC0tbGF5ZXItY29udGFpbmVyICp7ei1pbmRleDo5OTk5OTk5OTk5OTk5OX0uYWNvcmQtLXRvb2x0aXAtbGF5ZXJ7b3BhY2l0eTowO3RyYW5zaXRpb246NTBtcyBsaW5lYXIgb3BhY2l0eTtwb3NpdGlvbjphYnNvbHV0ZTtwb2ludGVyLWV2ZW50czpub25lfS5hY29yZC0tdG9vbHRpcC1sYXllci52aXNpYmxle29wYWNpdHk6MTtwb2ludGVyLWV2ZW50czphbGx9LmFjb3JkLS10b29sdGlwLnZlcnRpY2Fse3RyYW5zZm9ybTp0cmFuc2xhdGVYKC01MCUpfS5hY29yZC0tdG9vbHRpcC5ob3Jpem9udGFse3RyYW5zZm9ybTp0cmFuc2xhdGVZKC01MCUpfS5hY29yZC0tdG9hc3RzLWNvbnRhaW5lcntkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2p1c3RpZnktY29udGVudDpmbGV4LWVuZDtmbGV4LWRpcmVjdGlvbjpjb2x1bW47d2lkdGg6MTAwdnc7aGVpZ2h0OmNhbGMoMTAwdmggLSB2YXIoLS10b3Atb2Zmc2V0KSk7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7bGVmdDowO3BvaW50ZXItZXZlbnRzOm5vbmU7cGFkZGluZy1ib3R0b206MzJweH0uYWNvcmQtLXRvYXN0cy1jb250YWluZXIgLmFjb3JkLS10b2FzdHt0cmFuc2l0aW9uOnRyYW5zZm9ybSAyNTBtcyBlYXNlLWluLW91dCxvcGFjaXR5IDI1MG1zIGVhc2UtaW4tb3V0O2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7cG9pbnRlci1ldmVudHM6bm9uZTtib3JkZXItcmFkaXVzOjRweDtwYWRkaW5nOjhweDtib3gtc2hhZG93OjBweCAycHggOHB4IHJnYmEoMCwwLDAsLjI1KTtvcGFjaXR5OjE7Z2FwOjhweDtmb250LXNpemU6MTRweDttYXJnaW46NHB4fS5hY29yZC0tdG9hc3RzLWNvbnRhaW5lciAuYWNvcmQtLXRvYXN0IHN2Z3t3aWR0aDoxNnB4O2hlaWdodDoxNnB4fS5hY29yZC0tdG9hc3RzLWNvbnRhaW5lciAuYWNvcmQtLXRvYXN0LmNsaWNrYWJsZXtjdXJzb3I6cG9pbnRlcjtwb2ludGVyLWV2ZW50czphbGx9LmFjb3JkLS10b2FzdHMtY29udGFpbmVyIC5hY29yZC0tdG9hc3QuY2xvc2luZ3tvcGFjaXR5OjA7dHJhbnNmb3JtOnRyYW5zbGF0ZSgwLCAtNTBweCl9LmFjb3JkLS10b2FzdHMtY29udGFpbmVyIC5hY29yZC0tdG9hc3QuaGlkZGVue29wYWNpdHk6MDt0cmFuc2Zvcm06dHJhbnNsYXRlKDAsIDUwcHgpfS5hY29yZC0tdG9hc3RzLWNvbnRhaW5lciAuYWNvcmQtLXRvYXN0LnN0eWxlLWluZm97YmFja2dyb3VuZC1jb2xvcjojNGE4ZmUxO2NvbG9yOiNmNWY1ZjV9LmFjb3JkLS10b2FzdHMtY29udGFpbmVyIC5hY29yZC0tdG9hc3Quc3R5bGUtd2FybmluZ3tiYWNrZ3JvdW5kLWNvbG9yOiNmYWE4MWE7Y29sb3I6IzAwMH0uYWNvcmQtLXRvYXN0cy1jb250YWluZXIgLmFjb3JkLS10b2FzdC5zdHlsZS1lcnJvcntiYWNrZ3JvdW5kLWNvbG9yOiNlZDQyNDU7Y29sb3I6IzAwMH0uYWNvcmQtLXRvYXN0cy1jb250YWluZXIgLmFjb3JkLS10b2FzdC5zdHlsZS1zdWNjZXNze2JhY2tncm91bmQtY29sb3I6IzNiYTU1ZDtjb2xvcjojZjVmNWY1fS5hY29yZC0tdG9hc3RzLWNvbnRhaW5lciAuYWNvcmQtLXRvYXN0LnN0eWxlLWRlZmF1bHR7YmFja2dyb3VuZC1jb2xvcjojZjVmNWY1O2NvbG9yOiMwMDB9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXJ7d2lkdGg6MTAwdnc7aGVpZ2h0OmNhbGMoMTAwdmggLSB2YXIoLS10b3Atb2Zmc2V0KSk7ZGlzcGxheTpmbGV4O3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6MDtwb2ludGVyLWV2ZW50czpub25lfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyIC5hY29yZC0tbm90aWZpY2F0aW9ue2Rpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpjb2x1bW47cG9pbnRlci1ldmVudHM6YWxsO3RyYW5zaXRpb246dHJhbnNmb3JtIDI1MG1zIGVhc2UtaW4tb3V0LG9wYWNpdHkgMjUwbXMgZWFzZS1pbi1vdXQ7bWFyZ2luOjRweDtiYWNrZHJvcC1maWx0ZXI6Ymx1cigxNnB4KSBicmlnaHRuZXNzKDAuNzUpOy13ZWJraXQtYXBwLXJlZ2lvbjpuby1kcmFnOy0tYW5pbWF0aW9uLXNpemU6IDUwcHh9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24uaGlkZGVuLC5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyIC5hY29yZC0tbm90aWZpY2F0aW9uLmNsb3Npbmd7b3BhY2l0eTowfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyIC5hY29yZC0tbm90aWZpY2F0aW9uPi5jb250YWluZXJ7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2VlbjtwYWRkaW5nOjhweDtjb2xvcjojZmZmO21pbi13aWR0aDoyNTBweH0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllciAuYWNvcmQtLW5vdGlmaWNhdGlvbj4uY29udGFpbmVyPi5jbG9zZXt3aWR0aDoyNHB4O2hlaWdodDoyNHB4O2NvbG9yOiNmZmY7b3BhY2l0eTouNTtjdXJzb3I6cG9pbnRlcjttYXJnaW4tbGVmdDo4cHg7ei1pbmRleDo5OTk5OTk5OTl9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24+LmNvbnRhaW5lcj4uY2xvc2UuaGlkZGVue2Rpc3BsYXk6bm9uZX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllciAuYWNvcmQtLW5vdGlmaWNhdGlvbj4ucHJvZ3Jlc3MtY29udGFpbmVye3dpZHRoOjEwMCU7aGVpZ2h0OjVweH0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllciAuYWNvcmQtLW5vdGlmaWNhdGlvbj4ucHJvZ3Jlc3MtY29udGFpbmVyPi5wcm9ncmVzc3t3aWR0aDowJTtoZWlnaHQ6NXB4O3RyYW5zaXRpb246d2lkdGggdmFyKC0tZHVyYXRpb24pIGxpbmVhcjtiYWNrZ3JvdW5kLWNvbG9yOnZhcigtLWJhci1jb2xvcil9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24+LnByb2dyZXNzLWNvbnRhaW5lcj4ucHJvZ3Jlc3MucHJvZ3Jlc3Npbmd7d2lkdGg6MTAwJX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllciAuYWNvcmQtLW5vdGlmaWNhdGlvbi5zdHlsZS1pbmZvey0tYmFyLWNvbG9yOiAjNGE4ZmUxfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyIC5hY29yZC0tbm90aWZpY2F0aW9uLnN0eWxlLXdhcm5pbmd7LS1iYXItY29sb3I6ICNmYWE4MWF9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24uc3R5bGUtZXJyb3J7LS1iYXItY29sb3I6ICNlZDQyNDV9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24uc3R5bGUtc3VjY2Vzc3stLWJhci1jb2xvcjogIzNiYTU1ZH0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllciAuYWNvcmQtLW5vdGlmaWNhdGlvbi5zdHlsZS1kZWZhdWx0ey0tYmFyLWNvbG9yOiB3aGl0ZXNtb2tlfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLnRvcC1yaWdodHtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1lbmQ7YWxpZ24taXRlbXM6ZmxleC1zdGFydH0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci50b3AtcmlnaHQgLmFjb3JkLS1ub3RpZmljYXRpb24uaGlkZGVue3RyYW5zZm9ybTp0cmFuc2xhdGUoMCwgY2FsYyh2YXIoLS1hbmltYXRpb24tc2l6ZSkgKiAtMSkpfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLnRvcC1yaWdodCAuYWNvcmQtLW5vdGlmaWNhdGlvbi5jbG9zaW5ne3RyYW5zZm9ybTp0cmFuc2xhdGUoMCwgdmFyKC0tYW5pbWF0aW9uLXNpemUpKX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci50b3AtbGVmdHtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1zdGFydDthbGlnbi1pdGVtczpmbGV4LXN0YXJ0fS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLnRvcC1sZWZ0IC5hY29yZC0tbm90aWZpY2F0aW9uLmhpZGRlbnt0cmFuc2Zvcm06dHJhbnNsYXRlKDAsIGNhbGModmFyKC0tYW5pbWF0aW9uLXNpemUpICogLTEpKX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci50b3AtbGVmdCAuYWNvcmQtLW5vdGlmaWNhdGlvbi5jbG9zaW5ne3RyYW5zZm9ybTp0cmFuc2xhdGUoMCwgdmFyKC0tYW5pbWF0aW9uLXNpemUpKX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci5ib3R0b20tcmlnaHR7anVzdGlmeS1jb250ZW50OmZsZXgtZW5kO2FsaWduLWl0ZW1zOmZsZXgtZW5kfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLmJvdHRvbS1yaWdodCAuYWNvcmQtLW5vdGlmaWNhdGlvbi5oaWRkZW57dHJhbnNmb3JtOnRyYW5zbGF0ZSgwLCB2YXIoLS1hbmltYXRpb24tc2l6ZSkpfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLmJvdHRvbS1yaWdodCAuYWNvcmQtLW5vdGlmaWNhdGlvbi5jbG9zaW5ne3RyYW5zZm9ybTp0cmFuc2xhdGUoMCwgY2FsYyh2YXIoLS1hbmltYXRpb24tc2l6ZSkgKiAtMSkpfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLmJvdHRvbS1sZWZ0e2p1c3RpZnktY29udGVudDpmbGV4LXN0YXJ0O2FsaWduLWl0ZW1zOmZsZXgtZW5kfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLmJvdHRvbS1sZWZ0IC5hY29yZC0tbm90aWZpY2F0aW9uLmhpZGRlbnt0cmFuc2Zvcm06dHJhbnNsYXRlKDAsIHZhcigtLWFuaW1hdGlvbi1zaXplKSl9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIuYm90dG9tLWxlZnQgLmFjb3JkLS1ub3RpZmljYXRpb24uY2xvc2luZ3t0cmFuc2Zvcm06dHJhbnNsYXRlKDAsIGNhbGModmFyKC0tYW5pbWF0aW9uLXNpemUpICogLTEpKX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci50b3AtY2VudGVye2p1c3RpZnktY29udGVudDpjZW50ZXI7YWxpZ24taXRlbXM6ZmxleC1zdGFydH0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci50b3AtY2VudGVyIC5hY29yZC0tbm90aWZpY2F0aW9uLmhpZGRlbnt0cmFuc2Zvcm06dHJhbnNsYXRlKDAsIGNhbGModmFyKC0tYW5pbWF0aW9uLXNpemUpICogLTEpKX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci50b3AtY2VudGVyIC5hY29yZC0tbm90aWZpY2F0aW9uLmNsb3Npbmd7dHJhbnNmb3JtOnRyYW5zbGF0ZSgwLCB2YXIoLS1hbmltYXRpb24tc2l6ZSkpfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLmJvdHRvbS1jZW50ZXJ7anVzdGlmeS1jb250ZW50OmNlbnRlcjthbGlnbi1pdGVtczpmbGV4LWVuZH0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci5ib3R0b20tY2VudGVyIC5hY29yZC0tbm90aWZpY2F0aW9uLmhpZGRlbnt0cmFuc2Zvcm06dHJhbnNsYXRlKDAsIHZhcigtLWFuaW1hdGlvbi1zaXplKSl9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIuYm90dG9tLWNlbnRlciAuYWNvcmQtLW5vdGlmaWNhdGlvbi5jbG9zaW5ne3RyYW5zZm9ybTp0cmFuc2xhdGUoMCwgY2FsYyh2YXIoLS1hbmltYXRpb24tc2l6ZSkgKiAtMSkpfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLmNlbnRlcntqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO2FsaWduLWl0ZW1zOmNlbnRlcn0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci5jZW50ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24uaGlkZGVue3RyYW5zZm9ybTpzY2FsZSgwLjUpfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLmNlbnRlciAuYWNvcmQtLW5vdGlmaWNhdGlvbi5jbG9zaW5ne3RyYW5zZm9ybTpzY2FsZSgwLjUpfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLmxlZnQtY2VudGVye2p1c3RpZnktY29udGVudDpmbGV4LXN0YXJ0O2FsaWduLWl0ZW1zOmNlbnRlcn0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci5sZWZ0LWNlbnRlciAuYWNvcmQtLW5vdGlmaWNhdGlvbi5oaWRkZW57dHJhbnNmb3JtOnRyYW5zbGF0ZShjYWxjKHZhcigtLWFuaW1hdGlvbi1zaXplKSAqIC0xKSwgMCl9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIubGVmdC1jZW50ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24uY2xvc2luZ3t0cmFuc2Zvcm06dHJhbnNsYXRlKHZhcigtLWFuaW1hdGlvbi1zaXplKSwgMCl9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIucmlnaHQtY2VudGVye2p1c3RpZnktY29udGVudDpmbGV4LWVuZDthbGlnbi1pdGVtczpjZW50ZXJ9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIucmlnaHQtY2VudGVyIC5hY29yZC0tbm90aWZpY2F0aW9uLmhpZGRlbnt0cmFuc2Zvcm06dHJhbnNsYXRlKHZhcigtLWFuaW1hdGlvbi1zaXplKSwgMCl9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIucmlnaHQtY2VudGVyIC5hY29yZC0tbm90aWZpY2F0aW9uLmNsb3Npbmd7dHJhbnNmb3JtOnRyYW5zbGF0ZShjYWxjKHZhcigtLWFuaW1hdGlvbi1zaXplKSAqIC0xKSwgMCl9YDtcbiIsICJpbXBvcnQgZG9tIGZyb20gXCIuLi9kb20vaW5kZXguanNcIjtcclxuaW1wb3J0IGV2ZW50cyBmcm9tIFwiLi4vZXZlbnRzL2luZGV4LmpzXCI7XHJcbmltcG9ydCB3ZWJwYWNrIGZyb20gXCIuLi9tb2R1bGVzL3dlYnBhY2suanNcIjtcclxuXHJcbmNvbnN0IHRvb2x0aXBDbGFzc2VzID0gd2VicGFjay5maW5kQnlQcm9wZXJ0aWVzKFwidG9vbHRpcENvbnRlbnRBbGxvd092ZXJmbG93XCIsIFwidG9vbHRpcFwiKTtcclxuXHJcbmNvbnN0IHRvb2x0aXBQb3NpdGlvbnMgPSB7XHJcbiAgdG9wOiB0b29sdGlwQ2xhc3Nlcy50b29sdGlwVG9wLFxyXG4gIGJvdHRvbTogdG9vbHRpcENsYXNzZXMudG9vbHRpcEJvdHRvbSxcclxuICBsZWZ0OiB0b29sdGlwQ2xhc3Nlcy50b29sdGlwTGVmdCxcclxuICByaWdodDogdG9vbHRpcENsYXNzZXMudG9vbHRpcFJpZ2h0LFxyXG59XHJcblxyXG5jbGFzcyBUb29sdGlwIHtcclxuICAvKipcclxuICAgKiBAcGFyYW0ge0hUTUxEaXZFbGVtZW50fSB0YXJnZXQgXHJcbiAgICogQHBhcmFtIHtzdHJpbmd8SFRNTERpdkVsZW1lbnR9IGNvbnRlbnRcclxuICAgKi9cclxuICBjb25zdHJ1Y3Rvcih0YXJnZXQsIGNvbnRlbnQsIHBvc2l0aW9uID0gXCJhdXRvXCIpIHtcclxuICAgIC8qKiBAdHlwZSB7SFRNTERpdkVsZW1lbnR9ICovXHJcbiAgICB0aGlzLmxheWVyRWxlbWVudCA9IGRvbS5wYXJzZShgXHJcbiAgICAgIDxkaXYgY2xhc3M9XCJhY29yZC0tdG9vbHRpcC1sYXllclwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCIke3Rvb2x0aXBDbGFzc2VzLnRvb2x0aXB9ICR7dG9vbHRpcENsYXNzZXMudG9vbHRpcFByaW1hcnl9IGFjb3JkLS10b29sdGlwXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiJHt0b29sdGlwQ2xhc3Nlcy50b29sdGlwUG9pbnRlcn0gYWNvcmQtLXRvb2x0aXAtcG9pbnRlclwiPjwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cIiR7dG9vbHRpcENsYXNzZXMudG9vbHRpcENvbnRlbnR9IGFjb3JkLS10b29sdGlwLWNvbnRlbnRcIj48L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICBgKTtcclxuICAgIHRoaXMudG9vbHRpcEVsZW1lbnQgPSB0aGlzLmxheWVyRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmFjb3JkLS10b29sdGlwXCIpO1xyXG4gICAgdGhpcy5jb250ZW50RWxlbWVudCA9IHRoaXMubGF5ZXJFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWNvcmQtLXRvb2x0aXAtY29udGVudFwiKTtcclxuICAgIHRoaXMuY29udGVudCA9IGNvbnRlbnQ7XHJcbiAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuICAgIHRoaXMucG9zaXRpb24gPSBwb3NpdGlvbjtcclxuXHJcbiAgICB0aGlzLnZpc2libGUgPSBmYWxzZTtcclxuICAgIHRoaXMuZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgIHRoaXMucGF1c2VkID0gZmFsc2U7XHJcblxyXG4gICAgY29uc3Qgb25Nb3VzZUVudGVyID0gKCkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5kaXNhYmxlZCB8fCB0aGlzLnBhdXNlZCkgcmV0dXJuO1xyXG4gICAgICB0aGlzLnNob3coKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBvbk1vdXNlTGVhdmUgPSAoKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLnBhdXNlZCkgcmV0dXJuO1xyXG4gICAgICB0aGlzLmhpZGUoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnRhcmdldC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCBvbk1vdXNlRW50ZXIpO1xyXG4gICAgdGhpcy50YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgb25Nb3VzZUxlYXZlKTtcclxuXHJcbiAgICBsZXQgdW5QYXRjaE9ic2VydmVyID0gZXZlbnRzLm9uKFxyXG4gICAgICBcImRvbS1tdXRhdGlvblwiLFxyXG4gICAgICAvKiogQHBhcmFtIHtNdXRhdGlvblJlY29yZH0gbXV0ICovKG11dCkgPT4ge1xyXG4gICAgICAgIGlmIChtdXQudHlwZSA9PT0gXCJhdHRyaWJ1dGVzXCIpIHtcclxuICAgICAgICAgIGlmIChtdXQudGFyZ2V0LmlzU2FtZU5vZGUodGhpcy50YXJnZXQpKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAobXV0LmF0dHJpYnV0ZU5hbWUpIHtcclxuICAgICAgICAgICAgICBjYXNlIFwiYWNvcmQtLXRvb2x0aXAtZGlzYWJsZWRcIjoge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kaXNhYmxlZCA9IHRoaXMudGFyZ2V0LmdldEF0dHJpYnV0ZShcImFjb3JkLS10b29sdGlwLWRpc2FibGVkXCIpID09PSBcInRydWVcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBjYXNlIFwiYWNvcmQtLXRvb2x0aXAtY29udGVudFwiOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQgPSB0aGlzLnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJhY29yZC0tdG9vbHRpcC1jb250ZW50XCIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGNhc2UgXCJhY29yZC0tdG9vbHRpcC1wb3NpdGlvblwiOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uID0gdGhpcy50YXJnZXQuZ2V0QXR0cmlidXRlKFwiYWNvcmQtLXRvb2x0aXAtcG9zaXRpb25cIik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIClcclxuXHJcbiAgICB0aGlzLmRlc3Ryb3kgPSAoKSA9PiB7XHJcbiAgICAgIHRoaXMudGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsIG9uTW91c2VFbnRlcik7XHJcbiAgICAgIHRoaXMudGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIG9uTW91c2VMZWF2ZSk7XHJcbiAgICAgIHRoaXMuaGlkZSgpO1xyXG4gICAgICB1blBhdGNoT2JzZXJ2ZXIoKTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBnZXQgY29udGVudCgpIHtcclxuICAgIHJldHVybiB0aGlzLmNvbnRlbnRFbGVtZW50LmZpcnN0RWxlbWVudENoaWxkO1xyXG4gIH1cclxuXHJcbiAgc2V0IGNvbnRlbnQodmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgdGhpcy5jb250ZW50RWxlbWVudC5pbm5lckhUTUwgPSB2YWx1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuY29udGVudEVsZW1lbnQuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgdGhpcy5jb250ZW50RWxlbWVudD8uYXBwZW5kQ2hpbGQ/Lih2YWx1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZ2V0Q29udGFpbmVyKCkge1xyXG4gICAgY29uc3QgYXBwRWxtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2NsYXNzKj1cIm5vdEFwcEFzaWRlUGFuZWwtXCJdJyk7XHJcblxyXG4gICAgbGV0IGNvbnRhaW5lciA9IGFwcEVsbS5xdWVyeVNlbGVjdG9yKFwiLmFjb3JkLS10b29sdGlwLWNvbnRhaW5lclwiKTtcclxuICAgIGlmICghY29udGFpbmVyKSB7XHJcbiAgICAgIGNvbnRhaW5lciA9IGRvbS5wYXJzZShgPGRpdiBjbGFzcz1cImFjb3JkLS1sYXllci1jb250YWluZXIgYWNvcmQtLXRvb2x0aXAtY29udGFpbmVyXCI+PC9kaXY+YCk7XHJcbiAgICAgIGFwcEVsbS5hcHBlbmRDaGlsZChjb250YWluZXIpO1xyXG4gICAgfVxyXG4gICAgY29udGFpbmVyLnN0eWxlLnNldFByb3BlcnR5KFwiLS10b3Atb2Zmc2V0XCIsIGAke2FwcEVsbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AudG9GaXhlZCgxKX1weGApO1xyXG5cclxuICAgIHJldHVybiBjb250YWluZXI7XHJcbiAgfVxyXG5cclxuICBzaG93KCkge1xyXG4gICAgaWYgKHRoaXMudmlzaWJsZSkgcmV0dXJuO1xyXG4gICAgdGhpcy52aXNpYmxlID0gdHJ1ZTtcclxuXHJcbiAgICBjb25zdCBjb250YWluZXIgPSBUb29sdGlwLmdldENvbnRhaW5lcigpO1xyXG5cclxuICAgIGlmICh0aGlzLnBvc2l0aW9uID09PSBcImF1dG9cIikge1xyXG4gICAgICB0aGlzLmNhbGN1bGF0ZVBvc2l0aW9uKFxyXG4gICAgICAgIHRoaXMuY2FuU2hvd0F0VG9wID8gXCJ0b3BcIlxyXG4gICAgICAgICAgOiB0aGlzLmNhblNob3dBdEJvdHRvbSA/IFwiYm90dG9tXCJcclxuICAgICAgICAgICAgOiB0aGlzLmNhblNob3dBdExlZnQgPyBcImxlZnRcIlxyXG4gICAgICAgICAgICAgIDogdGhpcy5jYW5TaG93QXRSaWdodCA/IFwicmlnaHRcIlxyXG4gICAgICAgICAgICAgICAgOiBcInRvcFwiXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmNhbGN1bGF0ZVBvc2l0aW9uKHRoaXMucG9zaXRpb24pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5sYXllckVsZW1lbnQpO1xyXG4gICAgdGhpcy5sYXllckVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInZpc2libGVcIik7XHJcbiAgfVxyXG5cclxuICBjYWxjdWxhdGVQb3NpdGlvbihwb3NpdGlvbikge1xyXG4gICAgY29uc3QgYm91bmRpbmdSZWN0ID0gdGhpcy50YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblxyXG4gICAgdGhpcy5sYXllckVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSguLi5PYmplY3QudmFsdWVzKHRvb2x0aXBQb3NpdGlvbnMpKTtcclxuICAgIHRoaXMudG9vbHRpcEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcInZlcnRpY2FsXCIsIFwiaG9yaXpvbnRhbFwiKTtcclxuXHJcbiAgICBzd2l0Y2ggKHBvc2l0aW9uKSB7XHJcbiAgICAgIGNhc2UgXCJ0b3BcIjoge1xyXG4gICAgICAgIHRoaXMubGF5ZXJFbGVtZW50LnN0eWxlLnRvcCA9IGAke2JvdW5kaW5nUmVjdC50b3AgLSB0aGlzLnRhcmdldC5vZmZzZXRIZWlnaHQgLSAxMH1weGA7XHJcbiAgICAgICAgdGhpcy5sYXllckVsZW1lbnQuc3R5bGUubGVmdCA9IGAke2JvdW5kaW5nUmVjdC5sZWZ0fXB4YDtcclxuICAgICAgICB0aGlzLmxheWVyRWxlbWVudC5jbGFzc0xpc3QuYWRkKHRvb2x0aXBQb3NpdGlvbnMudG9wKTtcclxuICAgICAgICB0aGlzLnRvb2x0aXBFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJ2ZXJ0aWNhbFwiKTtcclxuICAgICAgICB0aGlzLmNlbnRlclBvc2l0aW9uKFwiaG9yaXpvbnRhbFwiKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlIFwiYm90dG9tXCI6IHtcclxuICAgICAgICB0aGlzLmxheWVyRWxlbWVudC5zdHlsZS50b3AgPSBgJHtib3VuZGluZ1JlY3QudG9wICsgdGhpcy50YXJnZXQub2Zmc2V0SGVpZ2h0ICsgMTB9cHhgO1xyXG4gICAgICAgIHRoaXMubGF5ZXJFbGVtZW50LnN0eWxlLmxlZnQgPSBgJHtib3VuZGluZ1JlY3QubGVmdH1weGA7XHJcbiAgICAgICAgdGhpcy5sYXllckVsZW1lbnQuY2xhc3NMaXN0LmFkZCh0b29sdGlwUG9zaXRpb25zLmJvdHRvbSk7XHJcbiAgICAgICAgdGhpcy50b29sdGlwRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwidmVydGljYWxcIik7XHJcbiAgICAgICAgdGhpcy5jZW50ZXJQb3NpdGlvbihcImhvcml6b250YWxcIik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSBcImxlZnRcIjoge1xyXG4gICAgICAgIHRoaXMubGF5ZXJFbGVtZW50LnN0eWxlLnRvcCA9IGAke2JvdW5kaW5nUmVjdC50b3B9cHhgO1xyXG4gICAgICAgIHRoaXMubGF5ZXJFbGVtZW50LnN0eWxlLmxlZnQgPSBgJHtib3VuZGluZ1JlY3QubGVmdCAtIHRoaXMudGFyZ2V0Lm9mZnNldFdpZHRoIC0gMTB9cHhgO1xyXG4gICAgICAgIHRoaXMubGF5ZXJFbGVtZW50LmNsYXNzTGlzdC5hZGQodG9vbHRpcFBvc2l0aW9ucy5sZWZ0KTtcclxuICAgICAgICB0aGlzLnRvb2x0aXBFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJob3Jpem9udGFsXCIpO1xyXG4gICAgICAgIHRoaXMuY2VudGVyUG9zaXRpb24oXCJ2ZXJ0aWNhbFwiKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlIFwicmlnaHRcIjoge1xyXG4gICAgICAgIHRoaXMubGF5ZXJFbGVtZW50LnN0eWxlLnRvcCA9IGAke2JvdW5kaW5nUmVjdC50b3B9cHhgO1xyXG4gICAgICAgIHRoaXMubGF5ZXJFbGVtZW50LnN0eWxlLmxlZnQgPSBgJHtib3VuZGluZ1JlY3QubGVmdCArIHRoaXMudGFyZ2V0Lm9mZnNldFdpZHRoICsgMTB9cHhgO1xyXG4gICAgICAgIHRoaXMubGF5ZXJFbGVtZW50LmNsYXNzTGlzdC5hZGQodG9vbHRpcFBvc2l0aW9ucy5yaWdodCk7XHJcbiAgICAgICAgdGhpcy50b29sdGlwRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiaG9yaXpvbnRhbFwiKTtcclxuICAgICAgICB0aGlzLmNlbnRlclBvc2l0aW9uKFwidmVydGljYWxcIik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNlbnRlclBvc2l0aW9uKGRpcmVjdGlvbikge1xyXG4gICAgc3dpdGNoIChkaXJlY3Rpb24pIHtcclxuICAgICAgY2FzZSBcImhvcml6b250YWxcIjoge1xyXG4gICAgICAgIGNvbnN0IGNlbnRlciA9IHRoaXMudGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQgKyAodGhpcy50YXJnZXQub2Zmc2V0V2lkdGggLyAyKTtcclxuICAgICAgICB0aGlzLmxheWVyRWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShcImxlZnRcIiwgYCR7Y2VudGVyIC0gKHRoaXMubGF5ZXJFbGVtZW50Lm9mZnNldFdpZHRoIC8gMil9cHhgKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlIFwidmVydGljYWxcIjoge1xyXG4gICAgICAgIGNvbnN0IGNlbnRlciA9IHRoaXMudGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCArICh0aGlzLnRhcmdldC5vZmZzZXRIZWlnaHQgLyAyKTtcclxuICAgICAgICB0aGlzLmxheWVyRWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShcInRvcFwiLCBgJHtjZW50ZXIgLSAodGhpcy5sYXllckVsZW1lbnQub2Zmc2V0SGVpZ2h0IC8gMil9cHhgKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaGlkZSgpIHtcclxuICAgIGlmICghdGhpcy52aXNpYmxlKSByZXR1cm47XHJcbiAgICB0aGlzLnZpc2libGUgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLmxheWVyRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwidmlzaWJsZVwiKTtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICB0aGlzLmxheWVyRWxlbWVudC5yZW1vdmUoKTtcclxuICAgIH0sIDUwKTtcclxuICB9XHJcblxyXG4gIGdldCBjYW5TaG93QXRUb3AoKSB7IHJldHVybiB0aGlzLnRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgLSB0aGlzLmxheWVyRWxlbWVudC5vZmZzZXRIZWlnaHQgPj0gMDsgfVxyXG4gIGdldCBjYW5TaG93QXRCb3R0b20oKSB7IHJldHVybiB0aGlzLnRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgKyB0aGlzLnRhcmdldC5vZmZzZXRIZWlnaHQgKyB0aGlzLmxheWVyRWxlbWVudC5vZmZzZXRIZWlnaHQgPD0gd2luZG93LmlubmVySGVpZ2h0OyB9XHJcbiAgZ2V0IGNhblNob3dBdExlZnQoKSB7IHJldHVybiB0aGlzLnRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0IC0gdGhpcy5sYXllckVsZW1lbnQub2Zmc2V0V2lkdGggPj0gMDsgfVxyXG4gIGdldCBjYW5TaG93QXRSaWdodCgpIHsgcmV0dXJuIHRoaXMudGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQgKyB0aGlzLnRhcmdldC5vZmZzZXRXaWR0aCArIHRoaXMubGF5ZXJFbGVtZW50Lm9mZnNldFdpZHRoIDw9IHdpbmRvdy5pbm5lcldpZHRoOyB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZSh0YXJnZXQsIGNvbnRlbnQsIHBvc2l0aW9uID0gXCJhdXRvXCIpIHtcclxuICByZXR1cm4gbmV3IFRvb2x0aXAodGFyZ2V0LCBjb250ZW50LCBwb3NpdGlvbik7XHJcbn1cclxuXHJcbmRvbS5wYXRjaChcclxuICBcIlthY29yZC0tdG9vbHRpcC1jb250ZW50XVwiLFxyXG4gIChlbG0pID0+IHtcclxuICAgIGxldCB0b29sdGlwID0gY3JlYXRlKGVsbSwgZWxtLmdldEF0dHJpYnV0ZShcImFjb3JkLS10b29sdGlwLWNvbnRlbnRcIiksIGVsbS5nZXRBdHRyaWJ1dGUoXCJhY29yZC0tdG9vbHRpcC1wb3NpdGlvblwiKSk7XHJcbiAgICB0b29sdGlwLmRpc2FibGVkID0gZWxtLmdldEF0dHJpYnV0ZShcImFjb3JkLS10b29sdGlwLWRpc2FibGVkXCIpID09PSBcInRydWVcIjtcclxuXHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICB0b29sdGlwLmRlc3Ryb3koKTtcclxuICAgIH1cclxuICB9LFxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgeyBjcmVhdGUgfTsiLCAiaW1wb3J0IGRvbSBmcm9tIFwiLi4vZG9tL2luZGV4LmpzXCI7XHJcbmltcG9ydCB1dGlscyBmcm9tIFwiLi4vdXRpbHMvaW5kZXguanNcIjtcclxuXHJcbmNvbnN0IHZhbGlkUG9zaXRpb25zID0gW1xyXG4gIFwidG9wLXJpZ2h0XCIsXHJcbiAgXCJ0b3AtbGVmdFwiLFxyXG4gIFwiYm90dG9tLXJpZ2h0XCIsXHJcbiAgXCJib3R0b20tbGVmdFwiLFxyXG4gIFwidG9wLWNlbnRlclwiLFxyXG4gIFwiYm90dG9tLWNlbnRlclwiLFxyXG4gIFwiY2VudGVyXCIsXHJcbiAgXCJsZWZ0LWNlbnRlclwiLFxyXG4gIFwicmlnaHQtY2VudGVyXCJcclxuXVxyXG5cclxuZnVuY3Rpb24gZ2V0Q29udGFpbmVyKHBvc2l0aW9uKSB7XHJcbiAgaWYgKCF2YWxpZFBvc2l0aW9ucy5pbmNsdWRlcyhwb3NpdGlvbikpIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBwb3NpdGlvbiBcIiR7cG9zaXRpb259XCIuIFZhbGlkIHBvc2l0aW9ucyBhcmU6ICR7dmFsaWRQb3NpdGlvbnMuam9pbihcIiwgXCIpfWApO1xyXG4gIGNvbnN0IGFwcEVsbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tjbGFzcyo9XCJub3RBcHBBc2lkZVBhbmVsLVwiXScpO1xyXG5cclxuICBsZXQgdG9wQ29udGFpbmVyID0gYXBwRWxtLnF1ZXJ5U2VsZWN0b3IoXCIuYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci1jb250YWluZXJcIik7XHJcbiAgaWYgKCF0b3BDb250YWluZXIpIHtcclxuICAgIHRvcENvbnRhaW5lciA9IGRvbS5wYXJzZShgPGRpdiBjbGFzcz1cImFjb3JkLS1sYXllci1jb250YWluZXIgYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci1jb250YWluZXJcIj48L2Rpdj5gKTtcclxuICAgIGFwcEVsbS5hcHBlbmRDaGlsZCh0b3BDb250YWluZXIpO1xyXG4gIH1cclxuICB0b3BDb250YWluZXIuc3R5bGUuc2V0UHJvcGVydHkoXCItLXRvcC1vZmZzZXRcIiwgYCR7YXBwRWxtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcC50b0ZpeGVkKDEpfXB4YCk7XHJcblxyXG4gIGxldCBwb3NpdGlvbkNvbnRhaW5lciA9IHRvcENvbnRhaW5lci5xdWVyeVNlbGVjdG9yKGAuYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci4ke3Bvc2l0aW9ufWApO1xyXG4gIGlmICghcG9zaXRpb25Db250YWluZXIpIHtcclxuICAgIHBvc2l0aW9uQ29udGFpbmVyID0gZG9tLnBhcnNlKGA8ZGl2IGNsYXNzPVwiYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllciAke3Bvc2l0aW9ufVwiPjwvZGl2PmApO1xyXG4gICAgdG9wQ29udGFpbmVyLmFwcGVuZENoaWxkKHBvc2l0aW9uQ29udGFpbmVyKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBwb3NpdGlvbkNvbnRhaW5lcjtcclxufVxyXG5cclxuZnVuY3Rpb24gc2hvdyhjb250ZW50LCB7XHJcbiAgc3R5bGUgPSBcImRlZmF1bHRcIixcclxuICB0aW1lb3V0ID0gMTAwMDAsXHJcbiAgcG9zaXRpb24gPSBcInRvcC1yaWdodFwiLFxyXG4gIGNsb3NhYmxlID0gdHJ1ZSxcclxuICBvbkNsaWNrID0gbnVsbCxcclxuICBvbkNsb3NlID0gbnVsbFxyXG59ID0ge30pIHtcclxuICBjb25zdCBjb250YWluZXIgPSBnZXRDb250YWluZXIocG9zaXRpb24pO1xyXG5cclxuICBjb25zdCBub3RpZkVsbSA9IGRvbS5wYXJzZShgXHJcbiAgICA8ZGl2IGNsYXNzPVwiYWNvcmQtLW5vdGlmaWNhdGlvbiBzdHlsZS0ke3N0eWxlfSBoaWRkZW5cIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250ZW50XCI+PC9kaXY+XHJcbiAgICAgICAgICAgIDxzdmcgY2xhc3M9XCJjbG9zZSAkeyFjbG9zYWJsZSA/IFwiaGlkZGVuXCIgOiBcIlwifVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCI+XHJcbiAgICAgICAgICAgICAgICA8cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk0xMiAxMC41ODZsNC45NS00Ljk1IDEuNDE0IDEuNDE0LTQuOTUgNC45NSA0Ljk1IDQuOTUtMS40MTQgMS40MTQtNC45NS00Ljk1LTQuOTUgNC45NS0xLjQxNC0xLjQxNCA0Ljk1LTQuOTUtNC45NS00Ljk1TDcuMDUgNS42MzZ6XCIvPlxyXG4gICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZ3Jlc3MtY29udGFpbmVyXCIgc3R5bGU9XCItLWR1cmF0aW9uOiAke3RpbWVvdXR9bXM7XCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9ncmVzc1wiPjwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgYCk7XHJcblxyXG4gIG5vdGlmRWxtLnF1ZXJ5U2VsZWN0b3IoXCIuY29udGVudFwiKS5pbm5lckhUTUwgPSBjb250ZW50O1xyXG5cclxuICBsZXQgY2xvc2VkID0gZmFsc2U7XHJcbiAgZnVuY3Rpb24gY2xvc2UoY2xvc2VUeXBlKSB7XHJcbiAgICBpZiAoY2xvc2VkKSByZXR1cm47XHJcbiAgICBjbG9zZWQgPSB0cnVlO1xyXG5cclxuICAgIG5vdGlmRWxtLmNsYXNzTGlzdC5hZGQoXCJjbG9zaW5nXCIpO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIG5vdGlmRWxtLnJlbW92ZSgpO1xyXG5cclxuICAgICAgdXRpbHMuaWZFeGlzdHMoXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXItY29udGFpbmVyYCksXHJcbiAgICAgICAgLyoqIEBwYXJhbSB7SFRNTERpdkVsZW1lbnR9IGVsbSAqLyhlbG0pID0+IHtcclxuICAgICAgICAgIGlmICghKFsuLi5lbG0uY2hpbGROb2Rlcy52YWx1ZXMoKV0ucmVkdWNlKChwcmV2LCBjdXJyKSA9PiBwcmV2ICsgY3Vyci5jaGlsZEVsZW1lbnRDb3VudCwgMCkpKSBlbG0ucmVtb3ZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICApO1xyXG4gICAgfSwgMjc1KTtcclxuICAgIG9uQ2xvc2U/LihjbG9zZVR5cGUpO1xyXG4gIH1cclxuXHJcbiAgaWYgKHR5cGVvZiBvbkNsaWNrID09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgbm90aWZFbG0uY2xhc3NMaXN0LmFkZChcImNsaWNrYWJsZVwiKTtcclxuICAgIG5vdGlmRWxtLm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgIG9uQ2xpY2soY2xvc2UpO1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHV0aWxzLmlmRXhpc3RzKG5vdGlmRWxtLnF1ZXJ5U2VsZWN0b3IoXCIuY2xvc2VcIiksIChlbG0pID0+IHtcclxuICAgIGVsbS5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgICBjbG9zZShcInVzZXJcIik7XHJcbiAgICB9O1xyXG4gIH0pO1xyXG5cclxuICBjb250YWluZXIucHJlcGVuZChub3RpZkVsbSk7XHJcbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcclxuICAgIG5vdGlmRWxtLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XHJcbiAgICBub3RpZkVsbS5xdWVyeVNlbGVjdG9yKFwiLnByb2dyZXNzXCIpLmNsYXNzTGlzdC5hZGQoXCJwcm9ncmVzc2luZ1wiKTtcclxuICB9KTtcclxuXHJcbiAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICBjbG9zZShcInRpbWVvdXRcIik7XHJcbiAgfSwgdGltZW91dCk7XHJcblxyXG4gIHJldHVybiAoKSA9PiB7XHJcbiAgICBjbG9zZShcImZvcmNlXCIpO1xyXG4gIH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBzaG93OiBPYmplY3QuYXNzaWduKHNob3csIHtcclxuICAgIGluZm86IChodG1sLCBvYmogPSB7fSkgPT4gc2hvdyhodG1sLCB7IC4uLm9iaiwgc3R5bGU6IFwiaW5mb1wiIH0pLFxyXG4gICAgZXJyb3I6IChodG1sLCBvYmogPSB7fSkgPT4gc2hvdyhodG1sLCB7IC4uLm9iaiwgc3R5bGU6IFwiZXJyb3JcIiB9KSxcclxuICAgIHdhcm5pbmc6IChodG1sLCBvYmogPSB7fSkgPT4gc2hvdyhodG1sLCB7IC4uLm9iaiwgc3R5bGU6IFwid2FybmluZ1wiIH0pLFxyXG4gICAgc3VjY2VzczogKGh0bWwsIG9iaiA9IHt9KSA9PiBzaG93KGh0bWwsIHsgLi4ub2JqLCBzdHlsZTogXCJzdWNjZXNzXCIgfSksXHJcbiAgfSksXHJcbn07IiwgImltcG9ydCB3ZWJwYWNrIGZyb20gXCIuLi9tb2R1bGVzL3dlYnBhY2suanNcIjtcclxuaW1wb3J0IHBhdGNoZXIgZnJvbSBcIi4uL3BhdGNoZXIvaW5kZXguanNcIjtcclxuaW1wb3J0IGxvZ2dlciBmcm9tIFwiLi4vdXRpbHMvbG9nZ2VyLmpzXCI7XHJcblxyXG5pbXBvcnQgY29tbW9uIGZyb20gXCIuLi9tb2R1bGVzL2NvbW1vbi5qc1wiO1xyXG5pbXBvcnQgeyBmaW5kZXJNYXAgfSBmcm9tIFwiLi4vbW9kdWxlcy9yYXcvY29tcGxleC1maW5kZXIuanNcIjtcclxuXHJcbmNvbnN0IHsgUmVhY3QgfSA9IGNvbW1vbjtcclxuXHJcbmxldCBpc1JlYWR5ID0gZmFsc2U7XHJcblxyXG5sZXQgQ29tcG9uZW50cyA9IG51bGw7XHJcblxyXG5sZXQgQWN0aW9ucyA9IG51bGw7XHJcblxyXG4oYXN5bmMgKCkgPT4ge1xyXG4gIEFjdGlvbnMgPSBhd2FpdCAoYXN5bmMgKCkgPT4ge1xyXG4gICAgbGV0IG9nTW9kdWxlO1xyXG4gICAgd2hpbGUgKHRydWUpIHtcclxuICAgICAgb2dNb2R1bGUgPSB3ZWJwYWNrLmZpbHRlcihtID0+IE9iamVjdC52YWx1ZXMobSkuc29tZSh2ID0+IHR5cGVvZiB2ID09PSBcImZ1bmN0aW9uXCIgJiYgdi50b1N0cmluZygpLmluY2x1ZGVzKFwiQ09OVEVYVF9NRU5VX0NMT1NFXCIpKSkuZmluZChtID0+IG0uZXhwb3J0cyAhPT0gd2luZG93KT8uZXhwb3J0cztcclxuICAgICAgaWYgKG9nTW9kdWxlKSBicmVhaztcclxuICAgICAgYXdhaXQgbmV3IFByb21pc2UociA9PiBzZXRUaW1lb3V0KHIsIDEwMCkpO1xyXG4gICAgfVxyXG4gICAgY29uc3Qgb3V0ID0gZmluZGVyTWFwKG9nTW9kdWxlLCB7XHJcbiAgICAgIGNsb3NlOiBbXCJDT05URVhUX01FTlVfQ0xPU0VcIl0sXHJcbiAgICAgIG9wZW46IFtcInJlbmRlckxhenlcIl1cclxuICAgIH0pO1xyXG5cclxuICAgIGlzUmVhZHkgPSAhIW91dC5jbG9zZSAmJiAhIW91dC5vcGVuO1xyXG4gICAgcmV0dXJuIG91dDtcclxuICB9KSgpO1xyXG5cclxuICBDb21wb25lbnRzID0gYXdhaXQgKGFzeW5jICgpID0+IHtcclxuICAgIGNvbnN0IG91dCA9IHt9O1xyXG4gICAgY29uc3QgY29tcG9uZW50TWFwID0ge1xyXG4gICAgICBzZXBhcmF0b3I6IFwiU2VwYXJhdG9yXCIsXHJcbiAgICAgIGNoZWNrYm94OiBcIkNoZWNrYm94SXRlbVwiLFxyXG4gICAgICByYWRpbzogXCJSYWRpb0l0ZW1cIixcclxuICAgICAgY29udHJvbDogXCJDb250cm9sSXRlbVwiLFxyXG4gICAgICBncm91cHN0YXJ0OiBcIkdyb3VwXCIsXHJcbiAgICAgIGN1c3RvbWl0ZW06IFwiSXRlbVwiXHJcbiAgICB9O1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGxldCBtb2R1bGVJZDtcclxuICAgICAgd2hpbGUgKHRydWUpIHtcclxuICAgICAgICBtb2R1bGVJZCA9IE9iamVjdC5lbnRyaWVzKHdlYnBhY2sucmVxdWlyZS5tKS5maW5kKChbLCBtXSkgPT4gbT8udG9TdHJpbmcoKS5pbmNsdWRlcyhcIm1lbnVpdGVtY2hlY2tib3hcIikpWzBdXHJcbiAgICAgICAgaWYgKG1vZHVsZUlkKSBicmVhaztcclxuICAgICAgICBhd2FpdCBuZXcgUHJvbWlzZShyID0+IHNldFRpbWVvdXQociwgMTAwKSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGNvbnRleHRNZW51TW9kdWxlID0gd2VicGFjay5maW5kKChfLCBpZHgpID0+IGlkeCA9PSBtb2R1bGVJZCkuZXhwb3J0cztcclxuXHJcbiAgICAgIGNvbnN0IG1vZHVsZVN0cmluZyA9IHdlYnBhY2sucmVxdWlyZS5tW21vZHVsZUlkXS50b1N0cmluZygpO1xyXG4gICAgICBjb25zdCByYXdNYXRjaGVzID0gbW9kdWxlU3RyaW5nLm1hdGNoQWxsKC9pZlxcKFxcdytcXC50eXBlPT09KD86XFx3K1xcLik/KFxcdyspXFwpLis/dHlwZTpcIiguKz8pXCIvZ3MpO1xyXG5cclxuICAgICAgb3V0Lk1lbnUgPSBPYmplY3QudmFsdWVzKGNvbnRleHRNZW51TW9kdWxlKS5maW5kKHYgPT4gdi50b1N0cmluZygpLmluY2x1ZGVzKFwiLmlzVXNpbmdLZXlib2FyZE5hdmlnYXRpb25cIikpO1xyXG5cclxuICAgICAgWy4uLnJhd01hdGNoZXNdLmZvckVhY2goKFssIGZ1bmN0aW9uTmFtZSwgdHlwZV0pID0+IHtcclxuICAgICAgICBsZXQgbW9kdWxlS2V5ID0gbW9kdWxlU3RyaW5nLm1hdGNoKG5ldyBSZWdFeHAobmV3IFJlZ0V4cChgKFxcXFx3Kyk6XFxcXChcXFxcKVxcXFw9XFxcXD4ke2Z1bmN0aW9uTmFtZX1gKSkpPy5bMV1cclxuICAgICAgICBvdXRbY29tcG9uZW50TWFwW3R5cGVdXSA9IGNvbnRleHRNZW51TW9kdWxlW21vZHVsZUtleV07XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgaXNSZWFkeSA9IE9iamVjdC5rZXlzKG91dCkubGVuZ3RoID4gMTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBpc1JlYWR5ID0gZmFsc2U7XHJcbiAgICAgIGxvZ2dlci5lcnJvcihcIkZhaWxlZCB0byBsb2FkIGNvbnRleHQgbWVudSBjb21wb25lbnRzXCIsIGVycik7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG91dDtcclxuICB9KSgpO1xyXG5cclxuICBNZW51UGF0Y2hlci5pbml0aWFsaXplKCk7XHJcbn0pKCk7XHJcblxyXG5cclxuY2xhc3MgTWVudVBhdGNoZXIge1xyXG4gIHN0YXRpYyBNQVhfUEFUQ0hfSVRFUkFUSU9OUyA9IDE2O1xyXG4gIHN0YXRpYyBwYXRjaGVzID0gbmV3IE1hcCgpO1xyXG4gIHN0YXRpYyBzdWJQYXRjaGVzID0gbmV3IFdlYWtNYXAoKTtcclxuXHJcbiAgc3RhdGljIGluaXRpYWxpemUoKSB7XHJcbiAgICBpZiAoIWlzUmVhZHkpIHJldHVybiBsb2dnZXIud2FybihcIlVuYWJsZSB0byBsb2FkIGNvbnRleHQgbWVudS5cIik7XHJcblxyXG4gICAgY29uc3QgbW9kdWxlVG9QYXRjaCA9IHdlYnBhY2suZmlsdGVyKG0gPT4gT2JqZWN0LnZhbHVlcyhtKS5zb21lKHYgPT4gdHlwZW9mIHYgPT09IFwiZnVuY3Rpb25cIiAmJiB2LnRvU3RyaW5nKCkuaW5jbHVkZXMoXCJDT05URVhUX01FTlVfQ0xPU0VcIikpKS5maW5kKG0gPT4gbS5leHBvcnRzICE9PSB3aW5kb3cpLmV4cG9ydHM7XHJcbiAgICBjb25zdCBrZXlUb1BhdGNoID0gT2JqZWN0LmtleXMobW9kdWxlVG9QYXRjaCkuZmluZChrID0+IG1vZHVsZVRvUGF0Y2hba10/Lmxlbmd0aCA9PT0gMyk7XHJcblxyXG4gICAgcGF0Y2hlci5iZWZvcmUoXHJcbiAgICAgIGtleVRvUGF0Y2gsXHJcbiAgICAgIG1vZHVsZVRvUGF0Y2gsXHJcbiAgICAgIGZ1bmN0aW9uIChtZXRob2RBcmdzKSB7XHJcbiAgICAgICAgY29uc3QgcHJvbWlzZSA9IG1ldGhvZEFyZ3NbMV07XHJcbiAgICAgICAgbWV0aG9kQXJnc1sxXSA9IGFzeW5jIGZ1bmN0aW9uICguLi5hcmdzKSB7XHJcbiAgICAgICAgICBjb25zdCByZW5kZXIgPSBhd2FpdCBwcm9taXNlLmNhbGwodGhpcywgLi4uYXJncyk7XHJcblxyXG4gICAgICAgICAgcmV0dXJuIChwcm9wcykgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCByZXMgPSByZW5kZXIocHJvcHMpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHJlcz8ucHJvcHMubmF2SWQpIHtcclxuICAgICAgICAgICAgICBNZW51UGF0Y2hlci5leGVjdXRlUGF0Y2hlcyhyZXMucHJvcHMubmF2SWQsIHJlcywgcHJvcHMpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiByZXM/LnR5cGUgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgICAgICAgIE1lbnVQYXRjaGVyLnBhdGNoUmVjdXJzaXZlKHJlcywgXCJ0eXBlXCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG1ldGhvZEFyZ3M7XHJcbiAgICAgIH1cclxuICAgIClcclxuICB9XHJcblxyXG4gIHN0YXRpYyBwYXRjaFJlY3Vyc2l2ZSh0YXJnZXQsIG1ldGhvZCwgaXRlcmF0aW9uID0gMCkge1xyXG4gICAgaWYgKGl0ZXJhdGlvbiA+PSB0aGlzLk1BWF9QQVRDSF9JVEVSQVRJT05TKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgcHJveHlGdW5jdGlvbiA9IHRoaXMuc3ViUGF0Y2hlcy5nZXQodGFyZ2V0W21ldGhvZF0pID8/ICgoKSA9PiB7XHJcbiAgICAgIGNvbnN0IG9yaWdpbmFsRnVuY3Rpb24gPSB0YXJnZXRbbWV0aG9kXTtcclxuICAgICAgY29uc3QgZGVwdGggPSArK2l0ZXJhdGlvbjtcclxuICAgICAgZnVuY3Rpb24gcGF0Y2goLi4uYXJncykge1xyXG4gICAgICAgIGNvbnN0IHJlcyA9IG9yaWdpbmFsRnVuY3Rpb24uY2FsbCh0aGlzLCAuLi5hcmdzKTtcclxuXHJcbiAgICAgICAgaWYgKCFyZXMpIHJldHVybiByZXM7XHJcblxyXG4gICAgICAgIGNvbnN0IG5hdklkID0gcmVzLnByb3BzPy5uYXZJZCA/PyByZXMucHJvcHM/LmNoaWxkcmVuPy5wcm9wcz8ubmF2SWQ7XHJcbiAgICAgICAgaWYgKG5hdklkKSB7XHJcbiAgICAgICAgICBNZW51UGF0Y2hlci5leGVjdXRlUGF0Y2hlcyhuYXZJZCwgcmVzLCBhcmdzWzBdKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29uc3QgbGF5ZXIgPSByZXMucHJvcHMuY2hpbGRyZW4gPyByZXMucHJvcHMuY2hpbGRyZW4gOiByZXM7XHJcblxyXG4gICAgICAgICAgaWYgKHR5cGVvZiBsYXllcj8udHlwZSA9PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICAgICAgTWVudVBhdGNoZXIucGF0Y2hSZWN1cnNpdmUobGF5ZXIsIFwidHlwZVwiLCBkZXB0aCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBwYXRjaC5fX29yaWdpbmFsX18gPSBvcmlnaW5hbEZ1bmN0aW9uO1xyXG4gICAgICBPYmplY3QuYXNzaWduKHBhdGNoLCBvcmlnaW5hbEZ1bmN0aW9uKTtcclxuICAgICAgdGhpcy5zdWJQYXRjaGVzLnNldChvcmlnaW5hbEZ1bmN0aW9uLCBwYXRjaCk7XHJcblxyXG4gICAgICByZXR1cm4gcGF0Y2g7XHJcbiAgICB9KSgpO1xyXG5cclxuICAgIHRhcmdldFttZXRob2RdID0gcHJveHlGdW5jdGlvbjtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBleGVjdXRlUGF0Y2hlcyhpZCwgcmVzLCBwcm9wcykge1xyXG4gICAgaWYgKCF0aGlzLnBhdGNoZXMuaGFzKGlkKSkgcmV0dXJuO1xyXG5cclxuICAgIHRoaXMucGF0Y2hlcy5nZXQoaWQpLmZvckVhY2gocGF0Y2ggPT4ge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIHBhdGNoKHJlcywgcHJvcHMpO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBsb2dnZXIuZXJyb3IoXCJGYWlsZWQgdG8gcGF0Y2ggY29udGV4dCBtZW51XCIsIHBhdGNoLCBlcnIpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuXHJcblxyXG4vLyBDb3BpZWQgZnJvbSBiZCdzIHNvdXJjZVxyXG5mdW5jdGlvbiBidWlsZEl0ZW0ocHJvcHMpIHtcclxuICBjb25zdCB7IHR5cGUgfSA9IHByb3BzO1xyXG4gIGlmICh0eXBlID09PSBcInNlcGFyYXRvclwiKSByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChDb21wb25lbnRzLlNlcGFyYXRvcik7XHJcblxyXG4gIGxldCBjb21wb25lbnQgPSBDb21wb25lbnRzLkl0ZW07XHJcbiAgaWYgKHR5cGUgPT09IFwic3VibWVudVwiKSB7XHJcbiAgICBpZiAoIXByb3BzLmNoaWxkcmVuKSBwcm9wcy5jaGlsZHJlbiA9IGJ1aWxkTWVudUNoaWxkcmVuKHByb3BzLnJlbmRlciB8fCBwcm9wcy5pdGVtcyk7XHJcbiAgfSBlbHNlIGlmICh0eXBlID09PSBcInRvZ2dsZVwiIHx8IHR5cGUgPT09IFwicmFkaW9cIikge1xyXG4gICAgY29tcG9uZW50ID0gdHlwZSA9PT0gXCJ0b2dnbGVcIiA/IENvbXBvbmVudHMuQ2hlY2tib3hJdGVtIDogQ29tcG9uZW50cy5SYWRpb0l0ZW07XHJcbiAgICBpZiAocHJvcHMuYWN0aXZlKSBwcm9wcy5jaGVja2VkID0gcHJvcHMuYWN0aXZlO1xyXG4gIH0gZWxzZSBpZiAodHlwZSA9PT0gXCJjb250cm9sXCIpIHtcclxuICAgIGNvbXBvbmVudCA9IENvbXBvbmVudHMuQ29udHJvbEl0ZW07XHJcbiAgfVxyXG4gIGlmICghcHJvcHMuaWQpIHByb3BzLmlkID0gYCR7cHJvcHMubGFiZWwucmVwbGFjZSgvXlteYS16XSt8W15cXHctXSsvZ2ksIFwiLVwiKX1gO1xyXG4gIGlmIChwcm9wcy5kYW5nZXIpIHByb3BzLmNvbG9yID0gXCJkYW5nZXJcIjtcclxuICBwcm9wcy5leHRlbmRlZCA9IHRydWU7XHJcblxyXG4gIGlmICh0eXBlID09PSBcInRvZ2dsZVwiKSB7XHJcbiAgICBjb25zdCBbYWN0aXZlLCBkb1RvZ2dsZV0gPSBSZWFjdC51c2VTdGF0ZShwcm9wcy5jaGVja2VkIHx8IGZhbHNlKTtcclxuICAgIGNvbnN0IG9yaWdpbmFsQWN0aW9uID0gcHJvcHMuYWN0aW9uO1xyXG4gICAgcHJvcHMuY2hlY2tlZCA9IGFjdGl2ZTtcclxuICAgIHByb3BzLmFjdGlvbiA9IGZ1bmN0aW9uIChldikge1xyXG4gICAgICBvcmlnaW5hbEFjdGlvbihldik7XHJcbiAgICAgIGRvVG9nZ2xlKCFhY3RpdmUpO1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KGNvbXBvbmVudCwgcHJvcHMpO1xyXG59XHJcblxyXG4vLyBDb3BpZWQgZnJvbSBiZCdzIHNvdXJjZVxyXG5mdW5jdGlvbiBidWlsZE1lbnVDaGlsZHJlbihzZXR1cCkge1xyXG4gIGNvbnN0IG1hcHBlciA9IHMgPT4ge1xyXG4gICAgaWYgKHMudHlwZSA9PT0gXCJncm91cFwiKSByZXR1cm4gYnVpbGRHcm91cChzKTtcclxuICAgIHJldHVybiBidWlsZEl0ZW0ocyk7XHJcbiAgfTtcclxuICBjb25zdCBidWlsZEdyb3VwID0gZnVuY3Rpb24gKGdyb3VwKSB7XHJcbiAgICBjb25zdCBpdGVtcyA9IGdyb3VwLml0ZW1zLm1hcChtYXBwZXIpLmZpbHRlcihpID0+IGkpO1xyXG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQ29tcG9uZW50cy5Hcm91cCwgbnVsbCwgaXRlbXMpO1xyXG4gIH07XHJcbiAgcmV0dXJuIHNldHVwLm1hcChtYXBwZXIpLmZpbHRlcihpID0+IGkpO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgX19jYWNoZV9fOiB7XHJcbiAgICBwYXRjaGVzOiBNZW51UGF0Y2hlci5wYXRjaGVzLFxyXG4gICAgc3ViUGF0Y2hlczogTWVudVBhdGNoZXIuc3ViUGF0Y2hlc1xyXG4gIH0sXHJcbiAgcGF0Y2gobmF2SWQsIGNiKSB7XHJcbiAgICBpZiAoIU1lbnVQYXRjaGVyLnBhdGNoZXMuaGFzKG5hdklkKSkgTWVudVBhdGNoZXIucGF0Y2hlcy5zZXQobmF2SWQsIG5ldyBTZXQoKSk7XHJcbiAgICBNZW51UGF0Y2hlci5wYXRjaGVzLmdldChuYXZJZCkuYWRkKGNiKTtcclxuXHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBNZW51UGF0Y2hlci5wYXRjaGVzLmdldChuYXZJZCkuZGVsZXRlKGNiKTtcclxuICAgIH1cclxuICB9LFxyXG4gIG9wZW4oZXZlbnQsIGNvbXBvbmVudCwgY29uZmlnKSB7XHJcbiAgICByZXR1cm4gQWN0aW9ucy5vcGVuKGV2ZW50LCAoZSkgPT4gUmVhY3QuY3JlYXRlRWxlbWVudChjb21wb25lbnQsIE9iamVjdC5hc3NpZ24oe30sIGUsIHsgb25DbG9zZTogQWN0aW9ucy5jbG9zZSB9KSksIGNvbmZpZyk7XHJcbiAgfSxcclxuICBjbG9zZSgpIHtcclxuICAgIHJldHVybiBBY3Rpb25zLmNsb3NlKCk7XHJcbiAgfSxcclxuICBidWlsZDoge1xyXG4gICAgaXRlbShzZXR1cCkge1xyXG4gICAgICByZXR1cm4gYnVpbGRNZW51Q2hpbGRyZW4oc2V0dXApO1xyXG4gICAgfSxcclxuICAgIG1lbnUoc2V0dXApIHtcclxuICAgICAgcmV0dXJuIChwcm9wcykgPT4gUmVhY3QuY3JlYXRlRWxlbWVudChDb21wb25lbnRzLk1lbnUsIHByb3BzLCBidWlsZE1lbnVDaGlsZHJlbihzZXR1cCkpO1xyXG4gICAgfVxyXG4gIH1cclxufTsiLCAiaW1wb3J0IGNvbW1vbiBmcm9tIFwiLi4vLi4vYXBpL21vZHVsZXMvY29tbW9uXCI7XHJcbmltcG9ydCBsb2dnZXIgZnJvbSBcIi4uLy4uL2FwaS91dGlscy9sb2dnZXIuanNcIjtcclxuY29uc3QgeyBSZWFjdCB9ID0gY29tbW9uO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXJyb3JCb3VuZGFyeSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuICAgIHRoaXMuc3RhdGUgPSB7IGVycm9yOiBudWxsIH07XHJcbiAgfVxyXG5cclxuICBjb21wb25lbnREaWRDYXRjaChlcnJvcikge1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7IGVycm9yIH0pO1xyXG4gICAgbG9nZ2VyLmVycm9yKGVycm9yKTtcclxuICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5vbkVycm9yID09PSBcImZ1bmN0aW9uXCIpIHRoaXMucHJvcHMub25FcnJvcihlcnJvcik7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICBpZiAodGhpcy5zdGF0ZS5lcnJvcikgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiYWNvcmQtLXJlYWN0LWVycm9yXCI+XHJcbiAgICAgIDxwPlVuZXhwZWN0ZWQgUmVhY3QgRXJyb3IgSGFwcGVuZWQuPC9wPlxyXG4gICAgICA8cD57YCR7dGhpcy5zdGF0ZS5lcnJvcn1gfTwvcD5cclxuICAgIDwvZGl2PjtcclxuICAgIHJldHVybiB0aGlzLnByb3BzLmNoaWxkcmVuO1xyXG4gIH1cclxufVxyXG5cclxuY29uc3Qgb3JpZ2luYWxSZW5kZXIgPSBFcnJvckJvdW5kYXJ5LnByb3RvdHlwZS5yZW5kZXI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShFcnJvckJvdW5kYXJ5LnByb3RvdHlwZSwgXCJyZW5kZXJcIiwge1xyXG4gIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gIGNvbmZpZ3VyYWJsZTogZmFsc2UsXHJcbiAgc2V0OiBmdW5jdGlvbiAoKSB7IHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBzZXQgcmVuZGVyIG1ldGhvZCBvZiBFcnJvckJvdW5kYXJ5XCIpOyB9LFxyXG4gIGdldDogKCkgPT4gb3JpZ2luYWxSZW5kZXJcclxufSk7IiwgImltcG9ydCBFcnJvckJvdW5kYXJ5IGZyb20gXCIuLi8uLi9saWIvY29tcG9uZW50cy9FcnJvckJvdW5kYXJ5LmpzeFwiO1xyXG5pbXBvcnQgY29tbW9uIGZyb20gXCIuLi9tb2R1bGVzL2NvbW1vbi5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIEVycm9yQm91bmRhcnksXHJcbiAgQnV0dG9uOiBjb21tb24uY29tcG9uZW50cy5CdXR0b24sXHJcbiAgTWFya2Rvd246IGNvbW1vbi5jb21wb25lbnRzLk1hcmtkb3duLFxyXG4gIFRleHQ6IGNvbW1vbi5jb21wb25lbnRzLlRleHQsXHJcbiAgQ29uZmlybWF0aW9uTW9kYWw6IGNvbW1vbi5jb21wb25lbnRzLkNvbmZpcm1hdGlvbk1vZGFsLFxyXG4gIE1vZGFsUm9vdDogY29tbW9uLm1vZGFscy5jb21wb25lbnRzLlJvb3QsXHJcbiAgTW9kYWxDbG9zZUJ1dHRvbjogY29tbW9uLm1vZGFscy5jb21wb25lbnRzLm90aGVyLkNsb3NlQnV0dG9uLFxyXG4gIE1vZGFsSGVhZGVyOiBjb21tb24ubW9kYWxzLmNvbXBvbmVudHMub3RoZXIuSGVhZGVyLFxyXG4gIE1vZGFsQ29udGVudDogY29tbW9uLm1vZGFscy5jb21wb25lbnRzLm90aGVyLkNvbnRlbnQsXHJcbiAgTW9kYWxGb290ZXI6IGNvbW1vbi5tb2RhbHMuY29tcG9uZW50cy5vdGhlci5Gb290ZXIsXHJcbiAgTW9kYWxMaXN0Q29udGVudDogY29tbW9uLm1vZGFscy5jb21wb25lbnRzLm90aGVyLkxpc3RDb250ZW50LFxyXG4gIFRvb2x0aXA6IGNvbW1vbi5jb21wb25lbnRzLlRvb2x0aXAsXHJcbn0iLCAiaW1wb3J0IEVycm9yQm91bmRhcnkgZnJvbSBcIi4uLy4uL2xpYi9jb21wb25lbnRzL0Vycm9yQm91bmRhcnkuanN4XCI7XHJcbmltcG9ydCBjb21tb24gZnJvbSBcIi4uL21vZHVsZXMvY29tbW9uLmpzXCI7XHJcbmltcG9ydCBpMThuIGZyb20gXCIuLi9pMThuL2luZGV4LmpzXCJcclxuY29uc3QgeyBSZWFjdCwgRmx1eERpc3BhdGNoZXIsIGNvbXBvbmVudHMsIG1vZGFscywgVXNlclN0b3JlIH0gPSBjb21tb247XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgc2hvdzoge1xyXG4gICAgY29uZmlybWF0aW9uKHRpdGxlLCBjb250ZW50LCB7IGNvbmZpcm0gPSBudWxsLCBjYW5jZWwgPSBudWxsLCBkYW5nZXIgPSBmYWxzZSwga2V5ID0gdW5kZWZpbmVkLCB0aW1lb3V0ID0gNjAwMDAgKiA1IH0gPSB7fSkge1xyXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoY29udGVudCkpIGNvbnRlbnQgPSBbY29udGVudF07XHJcbiAgICAgICAgY29udGVudCA9IGNvbnRlbnQubWFwKGkgPT4gdHlwZW9mIGkgPT09IFwic3RyaW5nXCIgPyBSZWFjdC5jcmVhdGVFbGVtZW50KGNvbXBvbmVudHMuTWFya2Rvd24sIG51bGwsIGkpIDogaSk7XHJcbiAgICAgICAgY29uc3QgbW9kYWxLZXkgPSBtb2RhbHMuYWN0aW9ucy5vcGVuKChwcm9wcykgPT4ge1xyXG4gICAgICAgICAgbGV0IGludGVyYWN0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgIHJldHVybiA8RXJyb3JCb3VuZGFyeSBvbkVycm9yPXsoKSA9PiB7IHJlc29sdmUoZmFsc2UpOyB9fT5cclxuICAgICAgICAgICAgPGNvbXBvbmVudHMuQ29uZmlybWF0aW9uTW9kYWxcclxuICAgICAgICAgICAgICBoZWFkZXI9e3RpdGxlfVxyXG4gICAgICAgICAgICAgIGNvbmZpcm1CdXR0b25Db2xvcj17ZGFuZ2VyID8gY29tcG9uZW50cy5CdXR0b24uQ29sb3JzLlJFRCA6IGNvbXBvbmVudHMuQnV0dG9uLkNvbG9ycy5CUkFORH1cclxuICAgICAgICAgICAgICBjb25maXJtVGV4dD17Y29uZmlybSB8fCBpMThuLmZvcm1hdChcIkNPTkZJUk1cIil9XHJcbiAgICAgICAgICAgICAgY2FuY2VsVGV4dD17Y2FuY2VsfVxyXG4gICAgICAgICAgICAgIG9uQ2FuY2VsPXsoKSA9PiB7IHJlc29sdmUoZmFsc2UpOyBtb2RhbHMuYWN0aW9ucy5jbG9zZShtb2RhbEtleSk7IGludGVyYWN0ZWQgPSB0cnVlOyB9fVxyXG4gICAgICAgICAgICAgIG9uQ29uZmlybT17KCkgPT4geyByZXNvbHZlKHRydWUpOyBtb2RhbHMuYWN0aW9ucy5jbG9zZShtb2RhbEtleSk7IGludGVyYWN0ZWQgPSB0cnVlOyB9fVxyXG4gICAgICAgICAgICAgIHsuLi5wcm9wc31cclxuICAgICAgICAgICAgICBvbkNsb3NlPXsoKSA9PiB7IHByb3BzLm9uQ2xvc2UoKTsgcmVzb2x2ZShmYWxzZSk7IG1vZGFscy5hY3Rpb25zLmNsb3NlKG1vZGFsS2V5KTsgfX1cclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIDxFcnJvckJvdW5kYXJ5IG9uRXJyb3I9eygpID0+IHsgcmVzb2x2ZShmYWxzZSk7IH19PlxyXG4gICAgICAgICAgICAgICAge2NvbnRlbnR9XHJcbiAgICAgICAgICAgICAgPC9FcnJvckJvdW5kYXJ5PlxyXG4gICAgICAgICAgICA8L2NvbXBvbmVudHMuQ29uZmlybWF0aW9uTW9kYWw+XHJcbiAgICAgICAgICA8L0Vycm9yQm91bmRhcnk+XHJcbiAgICAgICAgfSwgeyBtb2RhbEtleToga2V5IH0pO1xyXG4gICAgICAgIGlmICh0aW1lb3V0KSB7XHJcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKCFpbnRlcmFjdGVkKSB7XHJcbiAgICAgICAgICAgICAgcmVzb2x2ZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgbW9kYWxzLmFjdGlvbnMuY2xvc2UobW9kYWxLZXkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LCB0aW1lb3V0KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIHVzZXIodXNlcklkKSB7XHJcbiAgICAgIGlmICghVXNlclN0b3JlLmdldFVzZXIodXNlcklkKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICBGbHV4RGlzcGF0Y2hlci5kaXNwYXRjaCh7IHR5cGU6IFwiVVNFUl9QUk9GSUxFX01PREFMX09QRU5cIiwgdXNlcklkIH0pO1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0sXHJcbiAgICBhbGVydCh0aXRsZSwgY29udGVudCwgeyBjb25maXJtID0gbnVsbCwga2V5ID0gdW5kZWZpbmVkLCB0aW1lb3V0ID0gNjAwMDAgKiA1IH0gPSB7fSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5jb25maXJtYXRpb24odGl0bGUsIGNvbnRlbnQsIHsgY29uZmlybSwgY2FuY2VsOiBudWxsLCBrZXksIHRpbWVvdXQgfSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBjbG9zZShrZXkpIHtcclxuICAgIHJldHVybiBtb2RhbHMuYWN0aW9ucy5jbG9zZShrZXkpO1xyXG4gIH1cclxufSIsICJpbXBvcnQgZG9tIGZyb20gXCIuLi9kb20vaW5kZXguanNcIjtcclxuXHJcbmZ1bmN0aW9uIGdldENvbnRhaW5lcigpIHtcclxuICBjb25zdCBhcHBFbG0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbY2xhc3MqPVwibm90QXBwQXNpZGVQYW5lbC1cIl0nKTtcclxuXHJcbiAgbGV0IHRvcENvbnRhaW5lciA9IGFwcEVsbS5xdWVyeVNlbGVjdG9yKFwiLmFjb3JkLS10b2FzdHMtY29udGFpbmVyXCIpO1xyXG4gIGlmICghdG9wQ29udGFpbmVyKSB7XHJcbiAgICB0b3BDb250YWluZXIgPSBkb20ucGFyc2UoYDxkaXYgY2xhc3M9XCJhY29yZC0tbGF5ZXItY29udGFpbmVyIGFjb3JkLS10b2FzdHMtY29udGFpbmVyXCI+PC9kaXY+YCk7XHJcbiAgICBhcHBFbG0uYXBwZW5kQ2hpbGQodG9wQ29udGFpbmVyKTtcclxuICB9XHJcbiAgdG9wQ29udGFpbmVyLnN0eWxlLnNldFByb3BlcnR5KFwiLS10b3Atb2Zmc2V0XCIsIGAke2FwcEVsbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AudG9GaXhlZCgxKX1weGApO1xyXG5cclxuICByZXR1cm4gdG9wQ29udGFpbmVyO1xyXG59XHJcblxyXG5jb25zdCBpY29ucyA9IHtcclxuICBpbmZvOiBgPHN2ZyB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCI+PHBhdGggZD1cIk0xMiAyMkM2LjQ3NyAyMiAyIDE3LjUyMyAyIDEyUzYuNDc3IDIgMTIgMnMxMCA0LjQ3NyAxMCAxMC00LjQ3NyAxMC0xMCAxMHptLTEtMTF2Nmgydi02aC0yem0wLTR2MmgyVjdoLTJ6XCIgZmlsbD1cImN1cnJlbnRDb2xvclwiIC8+PC9zdmc+YCxcclxuICB3YXJuaW5nOiBgPHN2ZyB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCI+PHBhdGggZD1cIk0xMiAyMkM2LjQ3NyAyMiAyIDE3LjUyMyAyIDEyUzYuNDc3IDIgMTIgMnMxMCA0LjQ3NyAxMCAxMC00LjQ3NyAxMC0xMCAxMHptLTEtN3YyaDJ2LTJoLTJ6bTAtOHY2aDJWN2gtMnpcIiBmaWxsPVwiY3VycmVudENvbG9yXCIgLz48L3N2Zz5gLFxyXG4gIGVycm9yOiBgPHN2ZyB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCI+PHBhdGggZD1cIk0xMiAyMkM2LjQ3NyAyMiAyIDE3LjUyMyAyIDEyUzYuNDc3IDIgMTIgMnMxMCA0LjQ3NyAxMCAxMC00LjQ3NyAxMC0xMCAxMHptLTEtN3YyaDJ2LTJoLTJ6bTAtOHY2aDJWN2gtMnpcImZpbGw9XCJjdXJyZW50Q29sb3JcIiAvPjwvc3ZnPmAsXHJcbiAgc3VjY2VzczogYDxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiPjxwYXRoIGQ9XCJNMTIgMjJDNi40NzcgMjIgMiAxNy41MjMgMiAxMlM2LjQ3NyAyIDEyIDJzMTAgNC40NzcgMTAgMTAtNC40NzcgMTAtMTAgMTB6bS0uOTk3LTZsNy4wNy03LjA3MS0xLjQxNC0xLjQxNC01LjY1NiA1LjY1Ny0yLjgyOS0yLjgyOS0xLjQxNCAxLjQxNEwxMS4wMDMgMTZ6XCIgZmlsbD1cImN1cnJlbnRDb2xvclwiIC8+PC9zdmc+YFxyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gc2hvdyhcclxuICBjb250ZW50LFxyXG4gIHtcclxuICAgIHN0eWxlID0gXCJkZWZhdWx0XCIsXHJcbiAgICB0aW1lb3V0ID0gMzUwMCxcclxuICAgIG9uQ2xpY2sgPSBudWxsLFxyXG4gICAgaGlkZUljb24gPSBmYWxzZVxyXG4gIH0gPSB7fVxyXG4pIHtcclxuICBjb25zdCBjb250YWluZXIgPSBnZXRDb250YWluZXIoKTtcclxuXHJcbiAgY29uc3QgdG9hc3RFbG0gPSBkb20ucGFyc2UoYFxyXG4gICAgPGRpdiBjbGFzcz1cImFjb3JkLS10b2FzdCBzdHlsZS0ke3N0eWxlfSBoaWRkZW5cIj5cclxuICAgICAgJHtoaWRlSWNvbiA/IFwiXCIgOiAoaWNvbnNbc3R5bGVdIHx8IFwiXCIpfVxyXG4gICAgICA8ZGl2IGNsYXNzPVwiY29udGVudFwiPjwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgYCk7XHJcblxyXG4gIHRvYXN0RWxtLnF1ZXJ5U2VsZWN0b3IoXCIuY29udGVudFwiKS5pbm5lckhUTUwgPSBjb250ZW50O1xyXG5cclxuICBsZXQgY2xvc2VkID0gZmFsc2U7XHJcbiAgZnVuY3Rpb24gY2xvc2UoKSB7XHJcbiAgICBpZiAoY2xvc2VkKSByZXR1cm47XHJcbiAgICBjbG9zZWQgPSB0cnVlO1xyXG5cclxuICAgIHRvYXN0RWxtLmNsYXNzTGlzdC5hZGQoXCJjbG9zaW5nXCIpO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHRvYXN0RWxtLnJlbW92ZSgpO1xyXG5cclxuICAgICAgdXRpbHMuaWZFeGlzdHMoXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmFjb3JkLS10b2FzdHMtY29udGFpbmVyYCksXHJcbiAgICAgICAgLyoqIEBwYXJhbSB7SFRNTERpdkVsZW1lbnR9IGVsbSAqLyhlbG0pID0+IHtcclxuICAgICAgICAgIGlmICghZWxtLmNoaWxkRWxlbWVudENvdW50KSBlbG0ucmVtb3ZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICApO1xyXG4gICAgfSwgMjc1KTtcclxuICB9XHJcblxyXG4gIGlmICh0eXBlb2Ygb25DbGljayA9PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgIHRvYXN0RWxtLmNsYXNzTGlzdC5hZGQoXCJjbGlja2FibGVcIik7XHJcbiAgICB0b2FzdEVsbS5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgICBvbkNsaWNrKGNsb3NlKTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQodG9hc3RFbG0pO1xyXG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XHJcbiAgICB0b2FzdEVsbS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xyXG4gIH0pO1xyXG5cclxuICBzZXRUaW1lb3V0KGNsb3NlLCB0aW1lb3V0KTtcclxuXHJcbiAgcmV0dXJuICgpID0+IHtcclxuICAgIGNsb3NlKCk7XHJcbiAgfTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIHNob3c6IE9iamVjdC5hc3NpZ24oc2hvdywge1xyXG4gICAgaW5mbzogKGh0bWwsIG9iaiA9IHt9KSA9PiBzaG93KGh0bWwsIHsgLi4ub2JqLCBzdHlsZTogXCJpbmZvXCIgfSksXHJcbiAgICBlcnJvcjogKGh0bWwsIG9iaiA9IHt9KSA9PiBzaG93KGh0bWwsIHsgLi4ub2JqLCBzdHlsZTogXCJlcnJvclwiIH0pLFxyXG4gICAgd2FybmluZzogKGh0bWwsIG9iaiA9IHt9KSA9PiBzaG93KGh0bWwsIHsgLi4ub2JqLCBzdHlsZTogXCJ3YXJuaW5nXCIgfSksXHJcbiAgICBzdWNjZXNzOiAoaHRtbCwgb2JqID0ge30pID0+IHNob3coaHRtbCwgeyAuLi5vYmosIHN0eWxlOiBcInN1Y2Nlc3NcIiB9KVxyXG4gIH0pXHJcbn0iLCAiaW1wb3J0IHdlYnBhY2sgZnJvbSBcIi4uLy4uLy4uLy4uLy4uL2FwaS9tb2R1bGVzL3dlYnBhY2suanNcIjtcclxuXHJcbmNvbnN0IGJ1dHRvbkNsYXNzZXMgPSB3ZWJwYWNrLmZpbmRCeVByb3BlcnRpZXMoXCJsb3dTYXR1cmF0aW9uVW5kZXJsaW5lXCIsIFwiYnV0dG9uXCIsIFwiZGlzYWJsZWRCdXR0b25PdmVybGF5XCIpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIC8qKiBAcGFyYW0ge2ltcG9ydChcInZ1ZVwiKS5BcHB9IHZ1ZUFwcCAqL1xyXG4gIGxvYWQodnVlQXBwKSB7XHJcbiAgICB2dWVBcHAuY29tcG9uZW50KFwiZGlzY29yZC1idXR0b25cIiwge1xyXG4gICAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCIke2J1dHRvbkNsYXNzZXMuYnV0dG9ufSAke2J1dHRvbkNsYXNzZXMubG9va0ZpbGxlZH0gJHtidXR0b25DbGFzc2VzLmdyb3d9XCIgOmNsYXNzPVwiXFxgXFwke2NvbG9yID8gYnV0dG9uQ2xhc3Nlc1tcXGBjb2xvclxcJHtjb2xvclswXS50b1VwcGVyQ2FzZSgpfVxcJHtjb2xvci5zbGljZSgxKS50b0xvd2VyQ2FzZSgpfVxcYF0gOiBidXR0b25DbGFzc2VzLmNvbG9yQnJhbmR9IFxcJHtzaXplID8gYnV0dG9uQ2xhc3Nlc1tcXGBzaXplXFwke3NpemVbMF0udG9VcHBlckNhc2UoKX1cXCR7c2l6ZS5zbGljZSgxKS50b0xvd2VyQ2FzZSgpfVxcYF0gOiBidXR0b25DbGFzc2VzLnNpemVTbWFsbH1cXGBcIiBAY2xpY2s9XCJvbkNsaWNrXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiJHtidXR0b25DbGFzc2VzLmNvbnRlbnRzfVwiPnt7dmFsdWV9fTwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICBgLFxyXG4gICAgICBwcm9wczogW1widmFsdWVcIiwgXCJzaXplXCIsIFwiY29sb3JcIl0sXHJcbiAgICAgIGVtaXRzOiBbXCJjbGlja1wiXSxcclxuICAgICAgZGF0YSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgYnV0dG9uQ2xhc3Nlc1xyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgbWV0aG9kczoge1xyXG4gICAgICAgIG9uQ2xpY2soZSkge1xyXG4gICAgICAgICAgdGhpcy4kZW1pdChcImNsaWNrXCIsIGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59IiwgImV4cG9ydCBkZWZhdWx0IGBcbi5hY29yZC0tZGlzY29yZC1jaGVja3tjb2xvcjp2YXIoLS13aGl0ZS03MDApO2JhY2tncm91bmQtY29sb3I6Y3VycmVudENvbG9yO3otaW5kZXg6MH0uYWNvcmQtLWRpc2NvcmQtY2hlY2sgLnNsaWRlcnt0cmFuc2l0aW9uOjEwMG1zIGVhc2UtaW4tb3V0IGFsbDtsZWZ0Oi0zcHh9LmFjb3JkLS1kaXNjb3JkLWNoZWNrLmNoZWNrZWR7Y29sb3I6dmFyKC0tZ3JlZW4tNDAwKX0uYWNvcmQtLWRpc2NvcmQtY2hlY2suY2hlY2tlZCAuc2xpZGVye3RyYW5zaXRpb246MTAwbXMgZWFzZS1pbi1vdXQgYWxsO2xlZnQ6MTJweH1gO1xuIiwgImltcG9ydCB3ZWJwYWNrIGZyb20gXCIuLi8uLi8uLi8uLi9tb2R1bGVzL3dlYnBhY2suanNcIjtcclxuaW1wb3J0IHBhdGNoZXIgZnJvbSBcIi4uLy4uLy4uLy4uL3BhdGNoZXIvaW5kZXguanNcIjtcclxuaW1wb3J0IGNzc1RleHQgZnJvbSBcIi4vc3R5bGUuc2Nzc1wiO1xyXG5wYXRjaGVyLmluamVjdENTUyhjc3NUZXh0KTtcclxuXHJcbmNvbnN0IGNoZWNrQ2xhc3NlcyA9IHdlYnBhY2suZmluZEJ5UHJvcGVydGllcyhcImNoZWNrZWRcIiwgXCJjb250YWluZXJcIiwgXCJzbGlkZXJcIik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgLyoqIEBwYXJhbSB7aW1wb3J0KFwidnVlXCIpLkFwcH0gdnVlQXBwICovXHJcbiAgbG9hZCh2dWVBcHApIHtcclxuICAgIHZ1ZUFwcC5jb21wb25lbnQoXCJkaXNjb3JkLWNoZWNrXCIsIHtcclxuICAgICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8ZGl2IGNsYXNzPVwiJHtjaGVja0NsYXNzZXMuY29udGFpbmVyfSBkZWZhdWx0LWNvbG9ycyBhY29yZC0tZGlzY29yZC1jaGVja1wiIFxyXG4gICAgICAgICAgOmNsYXNzPVwieycke2NoZWNrQ2xhc3Nlcy5jaGVja2VkfSc6IHZhbHVlLCAnY2hlY2tlZCc6IG1vZGVsVmFsdWV9XCIgXHJcbiAgICAgICAgICBAY2xpY2s9XCJvbkNsaWNrXCJcclxuICAgICAgICA+XHJcbiAgICAgICAgICA8c3ZnIGNsYXNzPVwiJHtjaGVja0NsYXNzZXMuc2xpZGVyfSBzbGlkZXJcIiB2aWV3Qm94PVwiMCAwIDI4IDIwXCIgcHJlc2VydmVBc3BlY3RSYXRpbz1cInhNaW5ZTWlkIG1lZXRcIj5cclxuICAgICAgICAgICAgPHJlY3QgZmlsbD1cIndoaXRlXCIgeD1cIjRcIiB5PVwiMFwiIHJ4PVwiMTBcIiB3aWR0aD1cIjIwXCIgaGVpZ2h0PVwiMjBcIj48L3JlY3Q+XHJcbiAgICAgICAgICAgIDxzdmcgdi1pZj1cIm1vZGVsVmFsdWVcIiB2aWV3Qm94PVwiMCAwIDIwIDIwXCIgZmlsbD1cIm5vbmVcIj5cclxuICAgICAgICAgICAgICA8cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk03Ljg5NTYxIDE0Ljg1MzhMNi4zMDQ2MiAxMy4yNjI5TDE0LjMwOTkgNS4yNTc1NUwxNS45MDA5IDYuODQ4NTRMNy44OTU2MSAxNC44NTM4WlwiPjwvcGF0aD5cclxuICAgICAgICAgICAgICA8cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk00LjA4NjQzIDExLjA5MDNMNS42Nzc0MiA5LjQ5OTI5TDkuNDQ4NSAxMy4yNzA0TDcuODU3NTEgMTQuODYxNEw0LjA4NjQzIDExLjA5MDNaXCI+PC9wYXRoPlxyXG4gICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgPHN2ZyB2LWVsc2Ugdmlld0JveD1cIjAgMCAyMCAyMFwiIGZpbGw9XCJub25lXCI+XHJcbiAgICAgICAgICAgICAgPHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNNS4xMzIzMSA2LjcyOTYzTDYuNzIzMyA1LjEzODY0TDE0Ljg1NSAxMy4yNzA0TDEzLjI2NCAxNC44NjE0TDUuMTMyMzEgNi43Mjk2M1pcIj48L3BhdGg+XHJcbiAgICAgICAgICAgICAgPHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNMTMuMjcwNCA1LjEzODY0TDE0Ljg2MTQgNi43Mjk2M0w2LjcyOTYzIDE0Ljg2MTRMNS4xMzg2NCAxMy4yNzA0TDEzLjI3MDQgNS4xMzg2NFpcIj48L3BhdGg+XHJcbiAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIGAsXHJcbiAgICAgIHByb3BzOiB7XHJcbiAgICAgICAgbW9kZWxWYWx1ZToge1xyXG4gICAgICAgICAgZGVmYXVsdCgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgZW1pdHM6IFsndXBkYXRlOm1vZGVsVmFsdWUnLCAnY2hhbmdlJ10sXHJcbiAgICAgIG1ldGhvZHM6IHtcclxuICAgICAgICBvbkNsaWNrKGV2ZW50KSB7XHJcbiAgICAgICAgICBsZXQgbmV3VmFsdWUgPSAhdGhpcy5tb2RlbFZhbHVlO1xyXG4gICAgICAgICAgdGhpcy4kZW1pdChcInVwZGF0ZTptb2RlbFZhbHVlXCIsIG5ld1ZhbHVlKTtcclxuICAgICAgICAgIHRoaXMuJGVtaXQoXCJjaGFuZ2VcIiwgeyB2YWx1ZTogbmV3VmFsdWUsIGV2ZW50IH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59IiwgImltcG9ydCB3ZWJwYWNrIGZyb20gXCIuLi8uLi8uLi8uLi8uLi9hcGkvbW9kdWxlcy93ZWJwYWNrLmpzXCI7XHJcblxyXG5sZXQgaW5wdXRDbGFzc2VzID0gd2VicGFjay5maW5kQnlQcm9wZXJ0aWVzKFwiaW5wdXREZWZhdWx0XCIsIFwiY29weUlucHV0XCIpO1xyXG5sZXQgaW5wdXRDbGFzc2VzMiA9IHdlYnBhY2suZmluZEJ5UHJvcGVydGllcyhcImlucHV0XCIsIFwiZWRpdGFibGVcIiwgXCJkaXNhYmxlZFwiLCBcImlucHV0V3JhcHBlclwiKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAvKiogQHBhcmFtIHtpbXBvcnQoXCJ2dWVcIikuQXBwfSB2dWVBcHAgKi9cclxuICBsb2FkKHZ1ZUFwcCkge1xyXG4gICAgdnVlQXBwLmNvbXBvbmVudChcImRpc2NvcmQtaW5wdXRcIiwge1xyXG4gICAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCIke2lucHV0Q2xhc3NlczI/LmlucHV0fVwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cIiR7aW5wdXRDbGFzc2VzPy5pbnB1dFdyYXBwZXJ9XCI+XHJcbiAgICAgICAgICAgIDxpbnB1dCA6dHlwZT1cInR5cGUgPz8gJ3RleHQnXCIgY2xhc3M9XCIke2lucHV0Q2xhc3Nlcz8uaW5wdXREZWZhdWx0fVwiIHYtYmluZD1cInZhbHVlXCIgOnBsYWNlaG9sZGVyPVwicGxhY2Vob2xkZXJcIiA6bWF4bGVuZ3RoPVwibWF4bGVuZ3RoXCIgOnN0eWxlPVwic3R5bGVcIiBAY2hhbmdlPVwib25DaGFuZ2VcIiAvPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIGAsXHJcbiAgICAgIHByb3BzOiBbXCJ2YWx1ZVwiLCBcInBsYWNlaG9sZGVyXCIsIFwidHlwZVwiLCBcIm1heGxlbmd0aFwiLCBcInN0eWxlXCJdLFxyXG4gICAgICBlbWl0czogW1wiY2hhbmdlXCJdLFxyXG4gICAgICBtZXRob2RzOiB7XHJcbiAgICAgICAgb25DaGFuZ2UoZXZlbnQpIHtcclxuICAgICAgICAgIHRoaXMuJGVtaXQoXCJjaGFuZ2VcIiwgeyBldmVudCwgdmFsdWU6IGV2ZW50LnRhcmdldC52YWx1ZSB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufSIsICJleHBvcnQgZGVmYXVsdCBgXG4uYWNvcmQtLWRpc2NvcmQtc2VsZWN0e3Bvc2l0aW9uOnJlbGF0aXZlO3dpZHRoOjEwMCV9LmFjb3JkLS1kaXNjb3JkLXNlbGVjdD4ub3B0aW9uc3twb3NpdGlvbjphYnNvbHV0ZTt0b3A6MTAwJTt3aWR0aDoxMDAlO21heC1oZWlnaHQ6Mjg2cHg7b3ZlcmZsb3cteDpoaWRkZW47b3ZlcmZsb3cteTpzY3JvbGw7ei1pbmRleDoxfS5hY29yZC0tZGlzY29yZC1zZWxlY3Q+Lm9wdGlvbnMudG9wLXBvcG91dHt0b3A6YXV0bztib3R0b206MTAwJX1gO1xuIiwgImltcG9ydCB3ZWJwYWNrIGZyb20gXCIuLi8uLi8uLi8uLi9tb2R1bGVzL3dlYnBhY2suanNcIjtcclxuaW1wb3J0IHBhdGNoZXIgZnJvbSBcIi4uLy4uLy4uLy4uL3BhdGNoZXIvaW5kZXguanNcIjtcclxuXHJcbmltcG9ydCBjc3NUZXh0IGZyb20gXCIuL3N0eWxlLnNjc3NcIjtcclxucGF0Y2hlci5pbmplY3RDU1MoY3NzVGV4dCk7XHJcblxyXG5jb25zdCBzZWxlY3RDbGFzc2VzID0gd2VicGFjay5maW5kQnlQcm9wZXJ0aWVzKFwic2VsZWN0XCIsIFwic2VhcmNoYWJsZVNlbGVjdFwiLCBcIm11bHRpU2VsZWN0Q2hlY2tcIik7XHJcbmNvbnN0IHNjcm9sbENsYXNzZXMgPSB3ZWJwYWNrLmZpbmRCeVByb3BlcnRpZXMoXCJtYW5hZ2VkUmVhY3RpdmVTY3JvbGxlclwiLCBcInNjcm9sbGVyQmFzZVwiLCBcInRoaW5cIik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgLyoqIEBwYXJhbSB7aW1wb3J0KFwidnVlXCIpLkFwcH0gdnVlQXBwICovXHJcbiAgbG9hZCh2dWVBcHApIHtcclxuICAgIHZ1ZUFwcC5jb21wb25lbnQoXCJkaXNjb3JkLXNlbGVjdFwiLCB7XHJcbiAgICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cIiR7c2VsZWN0Q2xhc3Nlcy5zZWxlY3R9ICR7c2VsZWN0Q2xhc3Nlcy5sb29rRmlsbGVkfSBhY29yZC0tZGlzY29yZC1zZWxlY3RcIiA6Y2xhc3M9XCJ7JyR7c2VsZWN0Q2xhc3Nlcy5vcGVufSc6IGFjdGl2ZX1cIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCIke3NlbGVjdENsYXNzZXMudmFsdWV9XCI+e3tvcHRpb25zLmZpbmQoaT0+aS52YWx1ZSA9PT0gbW9kZWxWYWx1ZSk/LmxhYmVsfX08L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCIke3NlbGVjdENsYXNzZXMuaWNvbnN9XCI+XHJcbiAgICAgICAgICAgICAgPHN2ZyB2LWlmPVwiIWFjdGl2ZVwiIGNsYXNzPVwiaWNvblwiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj48cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk0xNi41OSA4LjU5MDAzTDEyIDEzLjE3TDcuNDEgOC41OTAwM0w2IDEwTDEyIDE2TDE4IDEwTDE2LjU5IDguNTkwMDNaXCI+PC9wYXRoPjwvc3ZnPlxyXG4gICAgICAgICAgICAgIDxzdmcgdi1lbHNlIGNsYXNzPVwiaWNvblwiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj48cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk03LjQxIDE2LjAwMDFMMTIgMTEuNDIwMUwxNi41OSAxNi4wMDAxTDE4IDE0LjU5MDFMMTIgOC41OTAwNkw2IDE0LjU5MDFMNy40MSAxNi4wMDAxWlwiPjwvcGF0aD48L3N2Zz5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdiB2LWlmPVwiYWN0aXZlXCIgY2xhc3M9XCJvcHRpb25zICR7c2VsZWN0Q2xhc3Nlcy5wb3BvdXR9ICR7c2Nyb2xsQ2xhc3Nlcy5zY3JvbGxlckJhc2V9ICR7c2Nyb2xsQ2xhc3Nlcy50aGlufVwiIDpjbGFzcz1cInsndG9wLXBvcG91dCc6IHBvcG91dFBvc2l0aW9uID09PSAndG9wJ31cIj5cclxuICAgICAgICAgICAgPGRpdiB2LWZvcj1cIm9wdGlvbiBpbiBvcHRpb25zXCIgY2xhc3M9XCJvcHRpb24gJHtzZWxlY3RDbGFzc2VzLm9wdGlvbn1cIiBAY2xpY2s9XCJvbk9wdGlvbkNsaWNrKCRldmVudCwgb3B0aW9uKVwiIDprZXk9XCJvcHRpb24udmFsdWVcIiA6YXJpYS1zZWxlY3RlZD1cIlxcYFxcJHttb2RlbFZhbHVlID09PSBvcHRpb24udmFsdWV9XFxgXCI+XHJcbiAgICAgICAgICAgICAge3tvcHRpb24ubGFiZWx9fVxyXG4gICAgICAgICAgICAgIDxzdmcgdi1pZj1cIm1vZGVsVmFsdWUgPT09IG9wdGlvbi52YWx1ZVwiIGNsYXNzPVwiJHtzZWxlY3RDbGFzc2VzLnNlbGVjdGVkSWNvbn1cIiByb2xlPVwiaW1nXCIgd2lkdGg9XCIyMFwiIGhlaWdodD1cIjIwXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj48Y2lyY2xlIHI9XCI4XCIgY3g9XCIxMlwiIGN5PVwiMTJcIiBmaWxsPVwid2hpdGVcIj48L2NpcmNsZT48ZyBmaWxsPVwibm9uZVwiIGZpbGwtcnVsZT1cImV2ZW5vZGRcIj48cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk0xMiAyQzYuNDggMiAyIDYuNDggMiAxMnM0LjQ4IDEwIDEwIDEwIDEwLTQuNDggMTAtMTBTMTcuNTIgMiAxMiAyem0tMiAxNWwtNS01IDEuNDEtMS40MUwxMCAxNC4xN2w3LjU5LTcuNTlMMTkgOGwtOSA5elwiPjwvcGF0aD48L2c+PC9zdmc+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIGAsXHJcbiAgICAgIGRhdGEoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHNlbGVjdENsYXNzZXMsXHJcbiAgICAgICAgICBhY3RpdmU6IGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBwcm9wczogW1wib3B0aW9uc1wiLCBcIm1vZGVsVmFsdWVcIiwgXCJwb3BvdXRQb3NpdGlvblwiXSxcclxuICAgICAgZW1pdHM6IFsndXBkYXRlOm1vZGVsVmFsdWUnLCBcImNoYW5nZVwiXSxcclxuICAgICAgbW91bnRlZCgpIHtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMub25DbGljayk7XHJcbiAgICAgIH0sXHJcbiAgICAgIHVubW91bnRlZCgpIHtcclxuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMub25DbGljayk7XHJcbiAgICAgIH0sXHJcbiAgICAgIG1ldGhvZHM6IHtcclxuICAgICAgICBvbk9wdGlvbkNsaWNrKGV2ZW50LCBvcHRpb24pIHtcclxuICAgICAgICAgIHRoaXMuJGVtaXQoXCJ1cGRhdGU6bW9kZWxWYWx1ZVwiLCBvcHRpb24udmFsdWUpO1xyXG4gICAgICAgICAgdGhpcy4kZW1pdChcImNoYW5nZVwiLCB7IHZhbHVlOiBvcHRpb24udmFsdWUsIGV2ZW50IH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb25DbGljayhlKSB7XHJcbiAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhzZWxlY3RDbGFzc2VzLnNlbGVjdClcclxuICAgICAgICAgICAgfHwgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKHNlbGVjdENsYXNzZXMudmFsdWUpXHJcbiAgICAgICAgICAgIHx8IGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhzZWxlY3RDbGFzc2VzLmljb25zKVxyXG4gICAgICAgICAgICB8fCBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoc2VsZWN0Q2xhc3Nlcy5wb3BvdXQpXHJcbiAgICAgICAgICAgIHx8IGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhzZWxlY3RDbGFzc2VzLm9wdGlvbilcclxuICAgICAgICAgICAgfHwgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaWNvblwiKVxyXG4gICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlID0gIXRoaXMuYWN0aXZlO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59IiwgImV4cG9ydCBkZWZhdWx0IGBcbi5hY29yZC0tZGlzY29yZC10ZXh0YXJlYXt3aWR0aDoxMDAlfWA7XG4iLCAiaW1wb3J0IHdlYnBhY2sgZnJvbSBcIi4uLy4uLy4uLy4uL21vZHVsZXMvd2VicGFjay5qc1wiO1xyXG5pbXBvcnQgcGF0Y2hlciBmcm9tIFwiLi4vLi4vLi4vLi4vcGF0Y2hlci9pbmRleC5qc1wiO1xyXG5cclxuaW1wb3J0IGNzc1RleHQgZnJvbSBcIi4vc3R5bGUuc2Nzc1wiO1xyXG5wYXRjaGVyLmluamVjdENTUyhjc3NUZXh0KTtcclxuXHJcbmxldCBpbnB1dENsYXNzZXMgPSB3ZWJwYWNrLmZpbmRCeVByb3BlcnRpZXMoXCJ0ZXh0QXJlYVwiLCBcIm1heExlbmd0aFwiLCBcImNoYXJhY3RlckNvdW50XCIpO1xyXG5sZXQgaW5wdXRDbGFzc2VzMiA9IHdlYnBhY2suZmluZEJ5UHJvcGVydGllcyhcImlucHV0V3JhcHBlclwiLCBcImlucHV0RGVmYXVsdFwiKTtcclxubGV0IHNjcm9sbENsYXNzZXMgPSB3ZWJwYWNrLmZpbmRCeVByb3BlcnRpZXMoXCJzY3JvbGxiYXJEZWZhdWx0XCIsIFwic2Nyb2xsYmFyXCIsIFwic2Nyb2xsYmFyR2hvc3RcIik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgLyoqIEBwYXJhbSB7aW1wb3J0KFwidnVlXCIpLkFwcH0gdnVlQXBwICovXHJcbiAgbG9hZCh2dWVBcHApIHtcclxuICAgIHZ1ZUFwcC5jb21wb25lbnQoXCJkaXNjb3JkLXRleHRhcmVhXCIsIHtcclxuICAgICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8ZGl2IGNsYXNzPVwiJHtpbnB1dENsYXNzZXMyLmlucHV0V3JhcHBlcn0gYWNvcmQtLWRpc2NvcmQtdGV4dGFyZWFcIj5cclxuICAgICAgICAgIDx0ZXh0YXJlYSBjbGFzcz1cIiR7aW5wdXRDbGFzc2VzMi5pbnB1dERlZmF1bHR9ICR7aW5wdXRDbGFzc2VzLnRleHRBcmVhfSAke3Njcm9sbENsYXNzZXMuc2Nyb2xsYmFyRGVmYXVsdH1cIiB2LWJpbmQ9XCJ2YWx1ZVwiIDpwbGFjZWhvbGRlcj1cInBsYWNlaG9sZGVyXCIgOm1heGxlbmd0aD1cIm1heGxlbmd0aFwiIDpjb2xzPVwiY29sc1wiIDpyb3dzPVwicm93c1wiIDpzdHlsZT1cInN0eWxlXCI+PC90ZXh0YXJlYT5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgYCxcclxuICAgICAgcHJvcHM6IFtcInZhbHVlXCIsIFwicGxhY2Vob2xkZXJcIiwgXCJtYXhsZW5ndGhcIiwgXCJzdHlsZVwiLCBcImNvbHNcIiwgXCJyb3dzXCJdLFxyXG4gICAgICBlbWl0czogW1wiY2hhbmdlXCJdLFxyXG4gICAgICBtZXRob2RzOiB7XHJcbiAgICAgICAgb25DaGFuZ2UoZXZlbnQpIHtcclxuICAgICAgICAgIHRoaXMuJGVtaXQoXCJjaGFuZ2VcIiwgeyBldmVudCwgdmFsdWU6IGV2ZW50LnRhcmdldC52YWx1ZSB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iLCAiaW1wb3J0IGRpc2NvcmRCdXR0b24gZnJvbSBcIi4vZGlzY29yZC1idXR0b24vaW5kZXguanNcIjtcclxuaW1wb3J0IGRpc2NvcmRDaGVjayBmcm9tIFwiLi9kaXNjb3JkLWNoZWNrL2luZGV4LmpzXCI7XHJcbmltcG9ydCBkaXNjb3JkSW5wdXQgZnJvbSBcIi4vZGlzY29yZC1pbnB1dC9pbmRleC5qc1wiO1xyXG5pbXBvcnQgZGlzY29yZFNlbGVjdCBmcm9tIFwiLi9kaXNjb3JkLXNlbGVjdC9pbmRleC5qc1wiO1xyXG5pbXBvcnQgZGlzY29yZFRleHRhcmVhIGZyb20gXCIuL2Rpc2NvcmQtdGV4dGFyZWEvaW5kZXguanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBsb2FkKHZ1ZUFwcCkge1xyXG4gICAgZGlzY29yZENoZWNrLmxvYWQodnVlQXBwKTtcclxuICAgIGRpc2NvcmRUZXh0YXJlYS5sb2FkKHZ1ZUFwcCk7XHJcbiAgICBkaXNjb3JkU2VsZWN0LmxvYWQodnVlQXBwKTtcclxuICAgIGRpc2NvcmRJbnB1dC5sb2FkKHZ1ZUFwcCk7XHJcbiAgICBkaXNjb3JkQnV0dG9uLmxvYWQodnVlQXBwKTtcclxuICB9XHJcbn0iLCAiLy8gaHR0cHM6Ly9sb2dhcmV0bS5jb20vYmxvZy9mb3JjaW5nLXJlY29tcHV0YXRpb24tb2YtY29tcHV0ZWQtcHJvcGVydGllcy9cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZWNvbXB1dGUodm0sIHByb3BOYW1lKSB7XHJcbiAgLy8gaGFuZGxlIG5vbi1leGlzdGVudCBwcm9wcy5cclxuICBpZiAoIXZtLiRfX3JlY29tcHV0YWJsZXMgfHwgIXZtLiRfX3JlY29tcHV0YWJsZXNbcHJvcE5hbWVdKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICB2bS4kX19yZWNvbXB1dGFibGVzW3Byb3BOYW1lXS5iYWNrZG9vcisrO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmVjb21wdXRhYmxlKGZuLCBuYW1lKSB7XHJcbiAgY29uc3QgcmVhY3RpdmUgPSBWdWUuY29tcHV0ZWQoe1xyXG4gICAgYmFja2Rvb3I6IDBcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuICAgIC8vIGluaXRpYWxpemUgYSBtYXAgb25jZS5cclxuICAgIGlmICghdGhpcy4kX19yZWNvbXB1dGFibGVzKSB7XHJcbiAgICAgIHRoaXMuJF9fcmVjb21wdXRhYmxlcyA9IHt9O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGFkZCBhIHJlZmVyZW5jZSB0byBteSByZWFjdGl2ZSBiYWNrZG9vciB0cmlnZ2VyLlxyXG4gICAgaWYgKCF0aGlzLiRfX3JlY29tcHV0YWJsZXNbZm4ubmFtZSB8fCBuYW1lXSkge1xyXG4gICAgICB0aGlzLiRfX3JlY29tcHV0YWJsZXNbZm4ubmFtZSB8fCBuYW1lXSA9IHJlYWN0aXZlO1xyXG4gICAgfVxyXG5cclxuICAgIHJlYWN0aXZlLmJhY2tkb29yOyAvLyByZWZlcmVuY2UgaXQhXHJcblxyXG4gICAgcmV0dXJuIGZuLmNhbGwodGhpcyk7XHJcbiAgfTtcclxufSIsICJpbXBvcnQgdnVlQ29tcG9uZW50cyBmcm9tIFwiLi9jb21wb25lbnRzL2luZGV4LmpzXCI7XHJcbmltcG9ydCB7IHJlY29tcHV0YWJsZSwgcmVjb21wdXRlIH0gZnJvbSBcIi4vdXRpbHMvcmVjb21wdXRlLmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgY29tcG9uZW50czoge1xyXG4gICAgbG9hZCh2dWVBcHApIHtcclxuICAgICAgdnVlQ29tcG9uZW50cy5sb2FkKHZ1ZUFwcCk7XHJcbiAgICB9XHJcbiAgfSxcclxuICByZWFkeToge1xyXG4gICAgYXN5bmMgd2hlbigpIHtcclxuICAgICAgd2hpbGUgKCF3aW5kb3cuVnVlKSB7XHJcbiAgICAgICAgYXdhaXQgbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIDEwMCkpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSxcclxuICAgIGdldCBpcygpIHtcclxuICAgICAgcmV0dXJuICEhd2luZG93LlZ1ZTtcclxuICAgIH1cclxuICB9LFxyXG4gIGdldCBWdWUoKSB7XHJcbiAgICByZXR1cm4gd2luZG93LlZ1ZTtcclxuICB9LFxyXG4gIHV0aWxzOiB7XHJcbiAgICBjb21wdXRlZDoge1xyXG4gICAgICByZWNvbXB1dGUsXHJcbiAgICAgIHJlY29tcHV0YWJsZVxyXG4gICAgfVxyXG4gIH1cclxufSIsICJpbXBvcnQgcGF0Y2hlciBmcm9tIFwiLi4vcGF0Y2hlci9pbmRleC5qc1wiO1xyXG5pbXBvcnQgc3R5bGVDU1NUZXh0IGZyb20gXCIuL3N0eWxlcy5zY3NzXCI7XHJcbnBhdGNoZXIuaW5qZWN0Q1NTKHN0eWxlQ1NTVGV4dCk7XHJcblxyXG5pbXBvcnQgdG9vbHRpcHMgZnJvbSBcIi4vdG9vbHRpcHMuanNcIjtcclxuaW1wb3J0IG5vdGlmaWNhdGlvbnMgZnJvbSBcIi4vbm90aWZpY2F0aW9ucy5qc1wiO1xyXG5pbXBvcnQgY29udGV4dE1lbnVzIGZyb20gXCIuL2NvbnRleHRNZW51cy5qc1wiO1xyXG5pbXBvcnQgY29tcG9uZW50cyBmcm9tIFwiLi9jb21wb25lbnRzLmpzXCI7XHJcbmltcG9ydCBtb2RhbHMgZnJvbSBcIi4vbW9kYWxzLmpzeFwiO1xyXG5pbXBvcnQgdG9hc3RzIGZyb20gXCIuL3RvYXN0cy5qc1wiO1xyXG5pbXBvcnQgdnVlIGZyb20gXCIuL3Z1ZS9pbmRleC5qc1wiO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICB0b29sdGlwcyxcclxuICBub3RpZmljYXRpb25zLFxyXG4gIGNvbnRleHRNZW51cyxcclxuICBjb21wb25lbnRzLFxyXG4gIG1vZGFscyxcclxuICB0b2FzdHMsXHJcbiAgdnVlXHJcbn0iLCAiaW1wb3J0IG1vZHVsZXMgZnJvbSAnLi9tb2R1bGVzJztcclxuaW1wb3J0IGRldiBmcm9tICcuL2Rldic7XHJcbmltcG9ydCB1dGlscyBmcm9tICcuL3V0aWxzJztcclxuaW1wb3J0IGV4dGVuc2lvbnMgZnJvbSAnLi9leHRlbnNpb25zJztcclxuaW1wb3J0IGkxOG4gZnJvbSAnLi9pMThuJztcclxuaW1wb3J0IHN0b3JhZ2UgZnJvbSAnLi9zdG9yYWdlJztcclxuaW1wb3J0IGV2ZW50cyBmcm9tICcuL2V2ZW50cyc7XHJcbmltcG9ydCBwYXRjaGVyIGZyb20gJy4vcGF0Y2hlcic7XHJcbmltcG9ydCBpbnRlcm5hbCBmcm9tICcuL2ludGVybmFsJztcclxuaW1wb3J0IHdlYnNvY2tldCBmcm9tICcuL3dlYnNvY2tldCc7XHJcbmltcG9ydCBkb20gZnJvbSAnLi9kb20nO1xyXG5pbXBvcnQgdWkgZnJvbSAnLi91aS9pbmRleC5qcyc7XHJcblxyXG51dGlscy5sb2dnZXIuZGVidWcoYFBSRUxPQURfS0VZOiA8UFJFTE9BRF9LRVk+YCk7XHJcblxyXG5mdW5jdGlvbiBkZXZFcnJvcihhcGkpIHtcclxuICByZXR1cm4gbmV3IEVycm9yKGBUaGUgJHthcGl9IEFQSSBjYW4gb25seSBiZSBhY2Nlc3NlZCB3aGVuIERldiBtb2RlIGlzIGVuYWJsZWQhYCk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBleHBvc2VkQVBJOiB7XHJcbiAgICBkZXYsXHJcbiAgICB1dGlscyxcclxuICAgIGkxOG4sXHJcbiAgICBldmVudHMsXHJcbiAgICB1aSxcclxuICAgIGdldCBkb20oKSB7XHJcbiAgICAgIGlmICghZGV2LmVuYWJsZWQpIHRocm93IGRldkVycm9yKFwiRE9NXCIpO1xyXG4gICAgICByZXR1cm4gZG9tO1xyXG4gICAgfSxcclxuICAgIGdldCBwYXRjaGVyKCkge1xyXG4gICAgICBpZiAoIWRldi5lbmFibGVkKSB0aHJvdyBkZXZFcnJvcihcIlBhdGNoZXJcIik7XHJcbiAgICAgIHJldHVybiBwYXRjaGVyO1xyXG4gICAgfSxcclxuICAgIGdldCBzdG9yYWdlKCkge1xyXG4gICAgICBpZiAoIWRldi5lbmFibGVkKSB0aHJvdyBkZXZFcnJvcihcIlN0b3JhZ2VcIik7XHJcbiAgICAgIHJldHVybiBzdG9yYWdlO1xyXG4gICAgfSxcclxuICAgIGdldCBtb2R1bGVzKCkge1xyXG4gICAgICBpZiAoIWRldi5lbmFibGVkKSB0aHJvdyBkZXZFcnJvcihcIk1vZHVsZXNcIik7XHJcbiAgICAgIHJldHVybiBtb2R1bGVzO1xyXG4gICAgfSxcclxuICAgIGdldCBleHRlbnNpb25zKCkge1xyXG4gICAgICBpZiAoIWRldi5lbmFibGVkKSB0aHJvdyBkZXZFcnJvcihcIkV4dGVuc2lvbnNcIik7XHJcbiAgICAgIHJldHVybiBleHRlbnNpb25zO1xyXG4gICAgfSxcclxuICAgIGdldCBpbnRlcm5hbCgpIHtcclxuICAgICAgaWYgKCFkZXYuZW5hYmxlZCkgdGhyb3cgZGV2RXJyb3IoXCJJbnRlcm5hbFwiKTtcclxuICAgICAgcmV0dXJuIGludGVybmFsO1xyXG4gICAgfSxcclxuICAgIGdldCB3ZWJzb2NrZXQoKSB7XHJcbiAgICAgIGlmICghZGV2LmVuYWJsZWQpIHRocm93IGRldkVycm9yKFwiV2Vic29ja2V0XCIpO1xyXG4gICAgICByZXR1cm4gd2Vic29ja2V0O1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgdW5leHBvc2VkQVBJOiB7XHJcbiAgICBkZXYsXHJcbiAgICBtb2R1bGVzLFxyXG4gICAgdXRpbHMsXHJcbiAgICBleHRlbnNpb25zLFxyXG4gICAgaTE4bixcclxuICAgIHN0b3JhZ2UsXHJcbiAgICBldmVudHMsXHJcbiAgICBwYXRjaGVyLFxyXG4gICAgaW50ZXJuYWwsXHJcbiAgICB3ZWJzb2NrZXQsXHJcbiAgICB1aSxcclxuICAgIGRvbVxyXG4gIH1cclxufSIsICJpbXBvcnQgbW9kdWxlcyBmcm9tIFwiLi4vYXBpL21vZHVsZXMvaW5kZXguanNcIjtcclxuaW1wb3J0IG1vZGFscyBmcm9tIFwiLi4vYXBpL3VpL21vZGFscy5qc3hcIjtcclxuaW1wb3J0IG5vdGlmaWNhdGlvbnMgZnJvbSBcIi4uL2FwaS91aS9ub3RpZmljYXRpb25zLmpzXCI7XHJcbmltcG9ydCBleHRlbnNpb25zIGZyb20gXCIuLi9hcGkvZXh0ZW5zaW9ucy9pbmRleC5qc1wiO1xyXG5pbXBvcnQgd2Vic29ja2V0IGZyb20gXCIuLi9hcGkvd2Vic29ja2V0L2luZGV4LmpzXCI7XHJcblxyXG53ZWJzb2NrZXQuc2V0KFwiSW5zdGFsbEV4dGVuc2lvblwiLCBhc3luYyAoeyB1cmwgfSA9IHt9KSA9PiB7XHJcbiAgaWYgKCF1cmwpIHJldHVybjtcclxuXHJcbiAgYXdhaXQgbW9kdWxlcy5uYXRpdmUud2luZG93LnNldEFsd2F5c09uVG9wKDAsIHRydWUpO1xyXG4gIGF3YWl0IG5ldyBQcm9taXNlKHIgPT4gc2V0VGltZW91dChyLCAyNTApKTtcclxuICBhd2FpdCBtb2R1bGVzLm5hdGl2ZS53aW5kb3cuc2V0QWx3YXlzT25Ub3AoMCwgdHJ1ZSk7XHJcblxyXG4gIGNvbnN0IHN1Y2Nlc3MgPSBhd2FpdCBtb2RhbHMuc2hvdy5jb25maXJtYXRpb24oXHJcbiAgICBhY29yZC5pMThuLmZvcm1hdChcIklNUE9SVF9FWFRFTlNJT05fTU9EQUxfVElUTEVcIiksXHJcbiAgICBhY29yZC5pMThuLmZvcm1hdChcIklNUE9SVF9FWFRFTlNJT05fTU9EQUxfREVTQ1JJUFRJT05cIiwgdXJsKVxyXG4gICk7XHJcblxyXG4gIGlmICghc3VjY2VzcykgcmV0dXJuO1xyXG5cclxuICB0cnkge1xyXG4gICAgYXdhaXQgZXh0ZW5zaW9ucy5sb2FkKHVybCk7XHJcbiAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICBub3RpZmljYXRpb25zLnNob3cuZXJyb3IoYCR7ZXJyfWAsIHsgdGltZW91dDogMzAwMDAgfSk7XHJcbiAgfVxyXG59KTsiLCAiZXhwb3J0IGRlZmF1bHQgYFxuW2NsYXNzKj1hY29yZC0tXXtib3gtc2l6aW5nOmJvcmRlci1ib3h9W2NsYXNzKj1hY29yZC0tXSAqe2JveC1zaXppbmc6Ym9yZGVyLWJveH0uYWNvcmQtLXRhYnMtY29udGVudC1jb250YWluZXJ7cGFkZGluZzozMnB4IDE2cHg7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmZsZXgtc3RhcnQ7anVzdGlmeS1jb250ZW50OmNlbnRlcjt3aWR0aDoxMDAlfS5hY29yZC0tdGFicy1jb250ZW50LWNvbnRhaW5lcj4udGFie3dpZHRoOjEwMCV9LmFjb3JkLS10YWJzLXRhYi1idXR0b24uc3RvcmUtdGFiLWJ1dHRvbntiYWNrZ3JvdW5kLWNvbG9yOnZhcigtLXN0YXR1cy1wb3NpdGl2ZS1iYWNrZ3JvdW5kKTtjb2xvcjp2YXIoLS1zdGF0dXMtcG9zaXRpdmUtdGV4dCl9LmFjb3JkLS10YWJzLXRhYi1idXR0b24uc3RvcmUtdGFiLWJ1dHRvbi5zZWxlY3RlZHtjb2xvcjp2YXIoLS10ZXh0LXBvc2l0aXZlKTtiYWNrZ3JvdW5kLWNvbG9yOnZhcigtLWJhY2tncm91bmQtbW9kaWZpZXItc2VsZWN0ZWQpfWA7XG4iLCAiZXhwb3J0IGRlZmF1bHQge1xyXG4gIC8qKiBAcGFyYW0ge2ltcG9ydChcInZ1ZVwiKS5BcHB9IHZ1ZUFwcCAqL1xyXG4gIGxvYWQodnVlQXBwKSB7XHJcbiAgICB2dWVBcHAuY29tcG9uZW50KFxyXG4gICAgICBcImhvbWUtcGFnZVwiLFxyXG4gICAgICB7XHJcbiAgICAgICAgdGVtcGxhdGU6IGBcclxuICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJ3aWR0aDogMzAwcHg7XCI+XHJcbiAgICAgICAgICAgICAgPGRpc2NvcmQtc2VsZWN0IHYtbW9kZWw9XCJ2YWx1ZVwiIDpvcHRpb25zPVwib3B0aW9uc1wiIC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8aDE+e3sgdmFsdWUgfX08L2gxPlxyXG4gICAgICAgICAgICA8YnIgLz5cclxuICAgICAgICAgICAgPGRpc2NvcmQtY2hlY2sgdi1tb2RlbD1cImNoZWNrZWRcIiAvPlxyXG4gICAgICAgICAgICA8aDE+e3sgY2hlY2tlZCB9fTwvaDE+XHJcbiAgICAgICAgICAgIDxkaXNjb3JkLWNoZWNrIHYtbW9kZWw9XCJjaGVja2VkXCIgLz5cclxuICAgICAgICAgICAgPGgxPnt7IGNoZWNrZWQgfX08L2gxPlxyXG4gICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIGAsXHJcbiAgICAgICAgZGF0YSgpIHtcclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHZhbHVlOiBcIjFcIixcclxuICAgICAgICAgICAgY2hlY2tlZDogZmFsc2UsXHJcbiAgICAgICAgICAgIG9wdGlvbnM6IFtcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCIxXCIsXHJcbiAgICAgICAgICAgICAgICBsYWJlbDogXCJPcHRpb24gMVwiXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCIyXCIsXHJcbiAgICAgICAgICAgICAgICBsYWJlbDogXCJPcHRpb24gMlwiXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCIzXCIsXHJcbiAgICAgICAgICAgICAgICBsYWJlbDogXCJPcHRpb24gM1wiXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICApO1xyXG4gIH1cclxufSIsICJleHBvcnQgZGVmYXVsdCBgXG4uYWNvcmQtLWluc3RhbGxlZC1leHRlbnNpb25zLXBhZ2V7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmZsZXgtc3RhcnQ7anVzdGlmeS1jb250ZW50OmNlbnRlcjtwYWRkaW5nOjAgMTZweH0uYWNvcmQtLWluc3RhbGxlZC1leHRlbnNpb25zLXBhZ2UgLmNvbnRhaW5lcnt3aWR0aDoxMDAlO21heC13aWR0aDoxMDI0cHg7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOmNvbHVtbn0uYWNvcmQtLWluc3RhbGxlZC1leHRlbnNpb25zLXBhZ2UgLmNvbnRhaW5lcj4udG9we2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7Z2FwOjhweH0uYWNvcmQtLWluc3RhbGxlZC1leHRlbnNpb25zLXBhZ2UgLmNvbnRhaW5lcj4udG9wPi5zZWFyY2h7d2lkdGg6ODAlfS5hY29yZC0taW5zdGFsbGVkLWV4dGVuc2lvbnMtcGFnZSAuY29udGFpbmVyPi50b3A+LmNhdGVnb3J5e3dpZHRoOjIwJX1gO1xuIiwgImltcG9ydCBwYXRjaGVyIGZyb20gXCIuLi8uLi8uLi8uLi8uLi8uLi9hcGkvcGF0Y2hlci9pbmRleC5qc1wiO1xyXG5pbXBvcnQgaTE4biBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vLi4vYXBpL2kxOG4vaW5kZXguanNcIjtcclxuaW1wb3J0IGNzc1RleHQgZnJvbSBcIi4vc3R5bGUuc2Nzc1wiO1xyXG5wYXRjaGVyLmluamVjdENTUyhjc3NUZXh0KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAvKiogQHBhcmFtIHtpbXBvcnQoXCJ2dWVcIikuQXBwfSB2dWVBcHAgKi9cclxuICBsb2FkKHZ1ZUFwcCkge1xyXG4gICAgdnVlQXBwLmNvbXBvbmVudChcclxuICAgICAgXCJpbnN0YWxsZWQtZXh0ZW5zaW9ucy1wYWdlXCIsXHJcbiAgICAgIHtcclxuICAgICAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImFjb3JkLS1pbnN0YWxsZWQtZXh0ZW5zaW9ucy1wYWdlXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidG9wXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2VhcmNoXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXNjb3JkLWlucHV0IHYtbW9kZWw9XCJzZWFyY2hUZXh0XCIgOnBsYWNlaG9sZGVyPVwiaTE4bkZvcm1hdCgnU0VBUkNIJylcIiAvPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2F0ZWdvcnlcIj5cclxuICAgICAgICAgICAgICAgICAgPGRpc2NvcmQtc2VsZWN0IHYtbW9kZWw9XCJzZWFyY2hDYXRlZ29yeVRleHRcIiA6b3B0aW9ucz1cIlt7dmFsdWU6ICdhbGwnLCBsYWJlbDogaTE4bkZvcm1hdCgnQUxMJyl9LCB7dmFsdWU6ICdwbHVnaW5zJywgbGFiZWw6IGkxOG5Gb3JtYXQoJ1BMVUdJTlMnKX0sIHt2YWx1ZTogJ3RoZW1lcycsIGxhYmVsOiBpMThuRm9ybWF0KCdUSEVNRVMnKX1dXCIgLz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJidXR0b25cIj5cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIGAsXHJcbiAgICAgICAgZGF0YSgpIHtcclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHNlYXJjaFRleHQ6IFwiXCIsXHJcbiAgICAgICAgICAgIHNlYXJjaENhdGVnb3J5VGV4dDogXCJhbGxcIlxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbWV0aG9kczoge1xyXG4gICAgICAgICAgaTE4bkZvcm1hdDogaTE4bi5mb3JtYXRcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgfVxyXG59IiwgImV4cG9ydCBkZWZhdWx0IHtcclxuICAvKiogQHBhcmFtIHtpbXBvcnQoXCJ2dWVcIikuQXBwfSB2dWVBcHAgKi9cclxuICBsb2FkKHZ1ZUFwcCkge1xyXG4gICAgdnVlQXBwLmNvbXBvbmVudChcclxuICAgICAgXCJzZXR0aW5ncy1wYWdlXCIsXHJcbiAgICAgIHtcclxuICAgICAgICB0ZW1wbGF0ZTogXCI8ZGl2PlNldHRpbmdzIFBhZ2U8L2Rpdj5cIixcclxuICAgICAgfVxyXG4gICAgKTtcclxuICB9XHJcbn0iLCAiZXhwb3J0IGRlZmF1bHQge1xyXG4gIC8qKiBAcGFyYW0ge2ltcG9ydChcInZ1ZVwiKS5BcHB9IHZ1ZUFwcCAqL1xyXG4gIGxvYWQodnVlQXBwKSB7XHJcbiAgICB2dWVBcHAuY29tcG9uZW50KFxyXG4gICAgICBcInN0b3JlLXBhZ2VcIixcclxuICAgICAge1xyXG4gICAgICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdj5cclxuICAgICAgICAgIDxzdG9yZS1leHRlbnNpb24tY2FyZCB2LWZvcj1cImV4dGVuc2lvbiBpbiBleHRlbnNpb25zXCIgOmV4dGVuc2lvbj1cImV4dGVuc2lvblwiIDprZXk9XCJleHRlbnNpb24ubmFtZS5kZWZhdWx0XCIgLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICBgLFxyXG4gICAgICAgIGRhdGEoKSB7XHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBleHRlbnNpb25zOiBbXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJwbHVnaW5cIixcclxuICAgICAgICAgICAgICAgIHVybDogXCJcIixcclxuICAgICAgICAgICAgICAgIG5hbWU6IHtcclxuICAgICAgICAgICAgICAgICAgZGVmYXVsdDogXCJUZXN0IFBsdWdpblwiLFxyXG4gICAgICAgICAgICAgICAgICB0cjogXCJEZW5lbWUgUGx1Z2luXCIsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IHtcclxuICAgICAgICAgICAgICAgICAgZGVmYXVsdDogXCJUZXN0IFBsdWdpbiBkZXNjcmlwdGlvbi4uXCIsXHJcbiAgICAgICAgICAgICAgICAgIHRyOiBcIkRlbmVtZSBQbHVnaW4gYVx1MDBFN1x1MDEzMWtsYW1hc1x1MDEzMS4uXCIsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgcHJldmlld3M6IFtcclxuICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiVGVzdCBQbHVnaW4gUHJldmlld1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGltYWdlOiBcImh0dHBzOi8vaS5pbWd1ci5jb20vVHRmakhlUC5wbmdcIixcclxuICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiVGVzdCBQbHVnaW4gUHJldmlldyAyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2U6IFwiaHR0cHM6Ly9pLmltZ3VyLmNvbS8wWjBaMFowLnBuZ1wiLFxyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgYXV0aG9yczogW1xyXG4gICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiNzA3MzA5NjkzNDQ5NTM1NTk5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJBcm1hZ2FuIzI0NDhcIixcclxuICAgICAgICAgICAgICAgICAgICBpbWFnZTogXCJodHRwczovL2kuaW1ndXIuY29tL3JTTFZkMjMucG5nXCJcclxuICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIjcwNzMwOTY5MzQ0OTUzNTU5OVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiQXJtYWdhbiMyNDQ4XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2U6IFwiaHR0cHM6Ly9pLmltZ3VyLmNvbS9yU0xWZDIzLnBuZ1wiXHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICB2ZXJzaW9uOiBcIjEuMC4wXCIsXHJcbiAgICAgICAgICAgICAgICByZWFkbWU6IFwiIyMjIFRlc3QgUGx1Z2luIHJlYWRtZS4uXCIsXHJcbiAgICAgICAgICAgICAgICBpbnN0YWxsZWQ6IHRydWVcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICApO1xyXG4gIH1cclxufSIsICJpbXBvcnQgaG9tZVBhZ2UgZnJvbSBcIi4vaG9tZS1wYWdlL2luZGV4LmpzXCJcclxuaW1wb3J0IGluc3RhbGxlZEV4dGVuc2lvbnNQYWdlIGZyb20gXCIuL2luc3RhbGxlZC1leHRlbnNpb25zLXBhZ2UvaW5kZXguanNcIjtcclxuaW1wb3J0IHNldHRpbmdzUGFnZSBmcm9tIFwiLi9zZXR0aW5ncy1wYWdlL2luZGV4LmpzXCI7XHJcbmltcG9ydCBzdG9yZVBhZ2UgZnJvbSBcIi4vc3RvcmUtcGFnZS9pbmRleC5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIC8qKiBAcGFyYW0ge2ltcG9ydChcInZ1ZVwiKS5BcHB9IHZ1ZUFwcCAqL1xyXG4gIGxvYWQodnVlQXBwKSB7XHJcbiAgICBob21lUGFnZS5sb2FkKHZ1ZUFwcCk7XHJcbiAgICBpbnN0YWxsZWRFeHRlbnNpb25zUGFnZS5sb2FkKHZ1ZUFwcCk7XHJcbiAgICBzZXR0aW5nc1BhZ2UubG9hZCh2dWVBcHApO1xyXG4gICAgc3RvcmVQYWdlLmxvYWQodnVlQXBwKTtcclxuICB9XHJcbn0iLCAiaW1wb3J0IGV2ZW50cyBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vYXBpL2V2ZW50cy9pbmRleC5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIC8qKiBAcGFyYW0ge2ltcG9ydChcInZ1ZVwiKS5BcHB9IHZ1ZUFwcCAqL1xyXG4gIGxvYWQodnVlQXBwKSB7XHJcbiAgICB2dWVBcHAuY29tcG9uZW50KFwiY29uZmlnLWJ1dHRvblwiLCB7XHJcbiAgICAgIHByb3BzOiBbXCJjb25maWdcIiwgXCJleHRlbnNpb25cIl0sXHJcbiAgICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImFjb3JkLS1jb25maWctYnV0dG9uIGFjb3JkLS1jb25maWctaXRlbVwiPlxyXG4gICAgICAgICAgPGRpc2NvcmQtYnV0dG9uIEBjbGljaz1cIm9uQ2xpY2tcIiA6dmFsdWU9XCJjb25maWcudmFsdWVcIiA6c2l6ZT1cImNvbmZpZy5zaXplXCIgOmNvbG9yPVwiY29uZmlnLmNvbG9yXCIgLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgYCxcclxuICAgICAgbWV0aG9kczoge1xyXG4gICAgICAgIG9uQ2xpY2soZXZlbnQpIHtcclxuICAgICAgICAgIGV2ZW50cy5lbWl0KFxyXG4gICAgICAgICAgICBcImV4dGVuc2lvbi1jb25maWctaW50ZXJhY3Rpb25cIixcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIGV4dGVuc2lvbjogdGhpcy5leHRlbnNpb24sXHJcbiAgICAgICAgICAgICAgY29uZmlnOiB0aGlzLmNvbmZpZyxcclxuICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBldmVudFxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59IiwgImltcG9ydCBldmVudHMgZnJvbSBcIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2FwaS9ldmVudHMvaW5kZXguanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAvKiogQHBhcmFtIHtpbXBvcnQoXCJ2dWVcIikuQXBwfSB2dWVBcHAgKi9cclxuICBsb2FkKHZ1ZUFwcCkge1xyXG4gICAgdnVlQXBwLmNvbXBvbmVudChcImNvbmZpZy1jaGVja1wiLCB7XHJcbiAgICAgIHByb3BzOiBbXCJjb25maWdcIiwgXCJleHRlbnNpb25cIl0sXHJcbiAgICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImFjb3JkLS1jb25maWctY2hlY2sgYWNvcmQtLWNvbmZpZy1pdGVtXCI+XHJcbiAgICAgICAgICA8ZGlzY29yZC1jaGVjayBAY2hhbmdlPVwib25DaGFuZ2VcIiB2LW1vZGVsPVwiY29uZmlnLnZhbHVlXCIgLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgYCxcclxuICAgICAgbWV0aG9kczoge1xyXG4gICAgICAgIG9uQ2hhbmdlKGRhdGEpIHtcclxuICAgICAgICAgIGV2ZW50cy5lbWl0KFxyXG4gICAgICAgICAgICBcImV4dGVuc2lvbi1jb25maWctaW50ZXJhY3Rpb25cIixcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIGV4dGVuc2lvbjogdGhpcy5leHRlbnNpb24sXHJcbiAgICAgICAgICAgICAgY29uZmlnOiB0aGlzLmNvbmZpZyxcclxuICAgICAgICAgICAgICBkYXRhXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIClcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufSIsICJ7XHJcbiAgXCJuYW1lXCI6IHtcclxuICAgIFwiQ29sdW1uXCI6IFwiY29uZmlnLWNvbHVtblwiLFxyXG4gICAgXCJSb3dcIjogXCJjb25maWctcm93XCIsXHJcbiAgICBcIkJ1dHRvblwiOiBcImNvbmZpZy1idXR0b25cIixcclxuICAgIFwiQ2hlY2tcIjogXCJjb25maWctY2hlY2tcIixcclxuICAgIFwiSW5wdXRcIjogXCJjb25maWctaW5wdXRcIixcclxuICAgIFwiU2VsZWN0XCI6IFwiY29uZmlnLXNlbGVjdFwiLFxyXG4gICAgXCJUZXh0YXJlYVwiOiBcImNvbmZpZy10ZXh0YXJlYVwiLFxyXG4gICAgXCJTcGFjZXJcIjogXCJjb25maWctc3BhY2VyXCIsXHJcbiAgICBcIlBhcmFncmFwaFwiOiBcImNvbmZpZy1wYXJhZ3JhcGhcIixcclxuICAgIFwiSGVhZGluZ1wiOiBcImNvbmZpZy1oZWFkaW5nXCJcclxuICB9XHJcbn0iLCAiaW1wb3J0IHsgbmFtZSBhcyBuYW1lTWFwIH0gZnJvbSBcIi4uL21hcHMuanNvblwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIC8qKiBAcGFyYW0ge2ltcG9ydChcInZ1ZVwiKS5BcHB9IHZ1ZUFwcCAqL1xyXG4gIGxvYWQodnVlQXBwKSB7XHJcbiAgICB2dWVBcHAuY29tcG9uZW50KFxyXG4gICAgICBcImNvbmZpZy1jb2x1bW5cIixcclxuICAgICAge1xyXG4gICAgICAgIHByb3BzOiBbXCJjb25maWdcIiwgXCJleHRlbnNpb25cIl0sXHJcbiAgICAgICAgdGVtcGxhdGU6IGBcclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJhY29yZC0tY29uZmlnLWNvbHVtbiBhY29yZC0tY29uZmlnLWl0ZW1cIiA6Y2xhc3M9XCJ7XHJcbiAgICAgICAgICAgICdob3Jpem9udGFsLWFsaWduLWxlZnQnOiBjb25maWc/Lmhvcml6b250YWxBbGlnbiA9PT0gJ2xlZnQnLFxyXG4gICAgICAgICAgICAnaG9yaXpvbnRhbC1hbGlnbi1jZW50ZXInOiBjb25maWc/Lmhvcml6b250YWxBbGlnbiA9PT0gJ2NlbnRlcicsXHJcbiAgICAgICAgICAgICdob3Jpem9udGFsLWFsaWduLXJpZ2h0JzogY29uZmlnPy5ob3Jpem9udGFsQWxpZ24gPT09ICdyaWdodCcsXHJcbiAgICAgICAgICAgICdqdXN0aWZ5LXNwYWNlLWJldHdlZW4nOiBjb25maWc/Lmp1c3RpZnkgPT09ICdzcGFjZS1iZXR3ZWVuJyxcclxuICAgICAgICAgICAgJ2p1c3RpZnktc3BhY2UtYXJvdW5kJzogY29uZmlnPy5qdXN0aWZ5ID09PSAnc3BhY2UtYXJvdW5kJyxcclxuICAgICAgICAgICAgJ3ZlcnRpY2FsLWFsaWduLXRvcCc6IGNvbmZpZz8udmVydGljYWxBbGlnbiA9PT0gJ3RvcCcsXHJcbiAgICAgICAgICAgICd2ZXJ0aWNhbC1hbGlnbi1jZW50ZXInOiBjb25maWc/LnZlcnRpY2FsQWxpZ24gPT09ICdjZW50ZXInLFxyXG4gICAgICAgICAgICAndmVydGljYWwtYWxpZ24tYm90dG9tJzogY29uZmlnPy52ZXJ0aWNhbEFsaWduID09PSAnYm90dG9tJyxcclxuICAgICAgICAgICAgJ2hvcml6b250YWwtc2l6ZS1sYXJnZSc6IGNvbmZpZz8uaG9yaXpvbnRhbFNpemUgPT09ICdsYXJnZScsXHJcbiAgICAgICAgICAgICdob3Jpem9udGFsLXNpemUtbWVkaXVtJzogY29uZmlnPy5ob3Jpem9udGFsU2l6ZSA9PT0gJ21lZGl1bScsXHJcbiAgICAgICAgICAgICdob3Jpem9udGFsLXNpemUtc21hbGwnOiBjb25maWc/Lmhvcml6b250YWxTaXplID09PSAnc21hbGwnLFxyXG4gICAgICAgICAgICAndmVydGljYWwtc2l6ZS1sYXJnZSc6IGNvbmZpZz8udmVydGljYWxTaXplID09PSAnbGFyZ2UnLFxyXG4gICAgICAgICAgICAndmVydGljYWwtc2l6ZS1tZWRpdW0nOiBjb25maWc/LnZlcnRpY2FsU2l6ZSA9PT0gJ21lZGl1bScsXHJcbiAgICAgICAgICAgICd2ZXJ0aWNhbC1zaXplLXNtYWxsJzogY29uZmlnPy52ZXJ0aWNhbFNpemUgPT09ICdzbWFsbCdcclxuICAgICAgICAgIH1cIj5cclxuICAgICAgICAgICAgPGNvbXBvbmVudCB2LWZvcj1cImNoaWxkIGluIGNvbmZpZy5jaGlsZHJlblwiIDppcz1cIm5hbWVNYXBbY2hpbGQudHlwZV1cIiA6a2V5PVwiY2hpbGQuaWRcIiA6Y29uZmlnPVwiY2hpbGRcIiA6ZXh0ZW5zaW9uPVwiZXh0ZW5zaW9uXCIgLz5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIGAsXHJcbiAgICAgICAgZGF0YSgpIHtcclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG5hbWVNYXBcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgfVxyXG59IiwgImltcG9ydCBldmVudHMgZnJvbSBcIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2FwaS9ldmVudHMvaW5kZXguanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAvKiogQHBhcmFtIHtpbXBvcnQoXCJ2dWVcIikuQXBwfSB2dWVBcHAgKi9cclxuICBsb2FkKHZ1ZUFwcCkge1xyXG4gICAgdnVlQXBwLmNvbXBvbmVudChcImNvbmZpZy1pbnB1dFwiLCB7XHJcbiAgICAgIHByb3BzOiBbXCJjb25maWdcIiwgXCJleHRlbnNpb25cIl0sXHJcbiAgICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImFjb3JkLS1jb25maWctaW5wdXQgYWNvcmQtLWNvbmZpZy1pdGVtXCI+XHJcbiAgICAgICAgICA8ZGlzY29yZC1pbnB1dCBAY2hhbmdlPVwib25DaGFuZ2VcIiB2LW1vZGVsPVwiY29uZmlnLnZhbHVlXCIgOnR5cGU9XCJjb25maWcuaW5wdXRUeXBlXCIgOnBsYWNlaG9sZGVyPVwiY29uZmlnLnBsYWNlaG9sZGVyXCIgOm1heGxlbmd0aD1cImNvbmZpZy5tYXhsZW5ndGhcIiAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICBgLFxyXG4gICAgICBtZXRob2RzOiB7XHJcbiAgICAgICAgb25DaGFuZ2UoZGF0YSkge1xyXG4gICAgICAgICAgZXZlbnRzLmVtaXQoXHJcbiAgICAgICAgICAgIFwiZXh0ZW5zaW9uLWNvbmZpZy1pbnRlcmFjdGlvblwiLFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgZXh0ZW5zaW9uOiB0aGlzLmV4dGVuc2lvbixcclxuICAgICAgICAgICAgICBjb25maWc6IHRoaXMuY29uZmlnLFxyXG4gICAgICAgICAgICAgIGRhdGFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59IiwgImltcG9ydCB7IG5hbWUgYXMgbmFtZU1hcCB9IGZyb20gXCIuLi9tYXBzLmpzb25cIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAvKiogQHBhcmFtIHtpbXBvcnQoXCJ2dWVcIikuQXBwfSB2dWVBcHAgKi9cclxuICBsb2FkKHZ1ZUFwcCkge1xyXG4gICAgdnVlQXBwLmNvbXBvbmVudChcclxuICAgICAgXCJjb25maWctcm93XCIsXHJcbiAgICAgIHtcclxuICAgICAgICBwcm9wczogW1wiY29uZmlnXCIsIFwiZXh0ZW5zaW9uXCJdLFxyXG4gICAgICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWNvcmQtLWNvbmZpZy1yb3cgYWNvcmQtLWNvbmZpZy1pdGVtXCIgOmNsYXNzPVwie1xyXG4gICAgICAgICAgICAnaG9yaXpvbnRhbC1hbGlnbi1sZWZ0JzogY29uZmlnPy5ob3Jpem9udGFsQWxpZ24gPT09ICdsZWZ0JyxcclxuICAgICAgICAgICAgJ2hvcml6b250YWwtYWxpZ24tY2VudGVyJzogY29uZmlnPy5ob3Jpem9udGFsQWxpZ24gPT09ICdjZW50ZXInLFxyXG4gICAgICAgICAgICAnaG9yaXpvbnRhbC1hbGlnbi1yaWdodCc6IGNvbmZpZz8uaG9yaXpvbnRhbEFsaWduID09PSAncmlnaHQnLFxyXG4gICAgICAgICAgICAnanVzdGlmeS1zcGFjZS1iZXR3ZWVuJzogY29uZmlnPy5qdXN0aWZ5ID09PSAnc3BhY2UtYmV0d2VlbicsXHJcbiAgICAgICAgICAgICdqdXN0aWZ5LXNwYWNlLWFyb3VuZCc6IGNvbmZpZz8uanVzdGlmeSA9PT0gJ3NwYWNlLWFyb3VuZCcsXHJcbiAgICAgICAgICAgICd2ZXJ0aWNhbC1hbGlnbi10b3AnOiBjb25maWc/LnZlcnRpY2FsQWxpZ24gPT09ICd0b3AnLFxyXG4gICAgICAgICAgICAndmVydGljYWwtYWxpZ24tY2VudGVyJzogY29uZmlnPy52ZXJ0aWNhbEFsaWduID09PSAnY2VudGVyJyxcclxuICAgICAgICAgICAgJ3ZlcnRpY2FsLWFsaWduLWJvdHRvbSc6IGNvbmZpZz8udmVydGljYWxBbGlnbiA9PT0gJ2JvdHRvbScsXHJcbiAgICAgICAgICAgICdob3Jpem9udGFsLXNpemUtbGFyZ2UnOiBjb25maWc/Lmhvcml6b250YWxTaXplID09PSAnbGFyZ2UnLFxyXG4gICAgICAgICAgICAnaG9yaXpvbnRhbC1zaXplLW1lZGl1bSc6IGNvbmZpZz8uaG9yaXpvbnRhbFNpemUgPT09ICdtZWRpdW0nLFxyXG4gICAgICAgICAgICAnaG9yaXpvbnRhbC1zaXplLXNtYWxsJzogY29uZmlnPy5ob3Jpem9udGFsU2l6ZSA9PT0gJ3NtYWxsJyxcclxuICAgICAgICAgICAgJ3ZlcnRpY2FsLXNpemUtbGFyZ2UnOiBjb25maWc/LnZlcnRpY2FsU2l6ZSA9PT0gJ2xhcmdlJyxcclxuICAgICAgICAgICAgJ3ZlcnRpY2FsLXNpemUtbWVkaXVtJzogY29uZmlnPy52ZXJ0aWNhbFNpemUgPT09ICdtZWRpdW0nLFxyXG4gICAgICAgICAgICAndmVydGljYWwtc2l6ZS1zbWFsbCc6IGNvbmZpZz8udmVydGljYWxTaXplID09PSAnc21hbGwnXHJcbiAgICAgICAgICB9XCI+XHJcbiAgICAgICAgICAgIDxjb21wb25lbnQgdi1mb3I9XCJjaGlsZCBpbiBjb25maWcuY2hpbGRyZW5cIiA6aXM9XCJuYW1lTWFwW2NoaWxkLnR5cGVdXCIgOmtleT1cImNoaWxkLmlkXCIgOmNvbmZpZz1cImNoaWxkXCIgOmV4dGVuc2lvbj1cImV4dGVuc2lvblwiIC8+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICBgLFxyXG4gICAgICAgIGRhdGEoKSB7XHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBuYW1lTWFwXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICApO1xyXG4gIH1cclxufSIsICJpbXBvcnQgZXZlbnRzIGZyb20gXCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9hcGkvZXZlbnRzL2luZGV4LmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgLyoqIEBwYXJhbSB7aW1wb3J0KFwidnVlXCIpLkFwcH0gdnVlQXBwICovXHJcbiAgbG9hZCh2dWVBcHApIHtcclxuICAgIHZ1ZUFwcC5jb21wb25lbnQoXCJjb25maWctc2VsZWN0XCIsIHtcclxuICAgICAgcHJvcHM6IFtcImNvbmZpZ1wiLCBcImV4dGVuc2lvblwiXSxcclxuICAgICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8ZGl2IGNsYXNzPVwiYWNvcmQtLWNvbmZpZy1zZWxlY3QgYWNvcmQtLWNvbmZpZy1pdGVtXCI+XHJcbiAgICAgICAgICA8ZGlzY29yZC1zZWxlY3QgQGNoYW5nZT1cIm9uQ2hhbmdlXCIgdi1tb2RlbD1cImNvbmZpZy52YWx1ZVwiIDpvcHRpb25zPVwiY29uZmlnLm9wdGlvbnNcIiAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICBgLFxyXG4gICAgICBtZXRob2RzOiB7XHJcbiAgICAgICAgb25DaGFuZ2UoZGF0YSkge1xyXG4gICAgICAgICAgZXZlbnRzLmVtaXQoXHJcbiAgICAgICAgICAgIFwiZXh0ZW5zaW9uLWNvbmZpZy1pbnRlcmFjdGlvblwiLFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgZXh0ZW5zaW9uOiB0aGlzLmV4dGVuc2lvbixcclxuICAgICAgICAgICAgICBjb25maWc6IHRoaXMuY29uZmlnLFxyXG4gICAgICAgICAgICAgIGRhdGFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59IiwgImltcG9ydCBldmVudHMgZnJvbSBcIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2FwaS9ldmVudHMvaW5kZXguanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAvKiogQHBhcmFtIHtpbXBvcnQoXCJ2dWVcIikuQXBwfSB2dWVBcHAgKi9cclxuICBsb2FkKHZ1ZUFwcCkge1xyXG4gICAgdnVlQXBwLmNvbXBvbmVudChcImNvbmZpZy10ZXh0YXJlYVwiLCB7XHJcbiAgICAgIHByb3BzOiBbXCJjb25maWdcIiwgXCJleHRlbnNpb25cIl0sXHJcbiAgICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImFjb3JkLS1jb25maWctdGV4dGFyZWEgYWNvcmQtLWNvbmZpZy1pdGVtXCI+XHJcbiAgICAgICAgICA8ZGlzY29yZC10ZXh0YXJlYSBAY2hhbmdlPVwib25DaGFuZ2VcIiB2LW1vZGVsPVwiY29uZmlnLnZhbHVlXCIgOnR5cGU9XCJjb25maWcuaW5wdXRUeXBlXCIgOnBsYWNlaG9sZGVyPVwiY29uZmlnLnBsYWNlaG9sZGVyXCIgOm1heGxlbmd0aD1cImNvbmZpZy5tYXhsZW5ndGhcIiA6Y29scz1cImNvbmZpZy5jb2x1bW5zXCIgOnJvd3M9XCJjb25maWcucm93c1wiIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIGAsXHJcbiAgICAgIG1ldGhvZHM6IHtcclxuICAgICAgICBvbkNoYW5nZShkYXRhKSB7XHJcbiAgICAgICAgICBldmVudHMuZW1pdChcclxuICAgICAgICAgICAgXCJleHRlbnNpb24tY29uZmlnLWludGVyYWN0aW9uXCIsXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBleHRlbnNpb246IHRoaXMuZXh0ZW5zaW9uLFxyXG4gICAgICAgICAgICAgIGNvbmZpZzogdGhpcy5jb25maWcsXHJcbiAgICAgICAgICAgICAgZGF0YVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICApXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn0iLCAiZXhwb3J0IGRlZmF1bHQgYFxuLmFjb3JkLS1jb25maWctaXRlbXt3aWR0aDoxMDAlO2Rpc3BsYXk6ZmxleH0uYWNvcmQtLWNvbmZpZy1yb3d7d2lkdGg6MTAwJTtkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246cm93O2p1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVuO2FsaWduLWl0ZW1zOmNlbnRlcn0uYWNvcmQtLWNvbmZpZy1yb3cuaG9yaXpvbnRhbC1hbGlnbi1sZWZ0e2p1c3RpZnktY29udGVudDpmbGV4LXN0YXJ0fS5hY29yZC0tY29uZmlnLXJvdy5ob3Jpem9udGFsLWFsaWduLXJpZ2h0e2p1c3RpZnktY29udGVudDpmbGV4LWVuZH0uYWNvcmQtLWNvbmZpZy1yb3cuaG9yaXpvbnRhbC1hbGlnbi1jZW50ZXJ7anVzdGlmeS1jb250ZW50OmNlbnRlcn0uYWNvcmQtLWNvbmZpZy1yb3cuanVzdGlmeS1zcGFjZS1iZXR3ZWVue2p1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVufS5hY29yZC0tY29uZmlnLXJvdy5qdXN0aWZ5LXNwYWNlLWFyb3VuZHtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYXJvdW5kfS5hY29yZC0tY29uZmlnLXJvdy52ZXJ0aWNhbC1hbGlnbi10b3B7YWxpZ24taXRlbXM6ZmxleC1zdGFydH0uYWNvcmQtLWNvbmZpZy1yb3cudmVydGljYWwtYWxpZ24tYm90dG9te2FsaWduLWl0ZW1zOmZsZXgtZW5kfS5hY29yZC0tY29uZmlnLXJvdy5ob3Jpem9udGFsLXNpemUtbGFyZ2V7d2lkdGg6MTAwJX0uYWNvcmQtLWNvbmZpZy1yb3cuaG9yaXpvbnRhbC1zaXplLW1lZGl1bXt3aWR0aDo1MCV9LmFjb3JkLS1jb25maWctcm93Lmhvcml6b250YWwtc2l6ZS1zbWFsbHt3aWR0aDoyNSV9LmFjb3JkLS1jb25maWctcm93LnZlcnRpY2FsLXNpemUtbGFyZ2V7aGVpZ2h0OjEwMCV9LmFjb3JkLS1jb25maWctcm93LnZlcnRpY2FsLXNpemUtbWVkaXVte2hlaWdodDo1MCV9LmFjb3JkLS1jb25maWctcm93LnZlcnRpY2FsLXNpemUtc21hbGx7aGVpZ2h0OjI1JX0uYWNvcmQtLWNvbmZpZy1jb2x1bW57d2lkdGg6MTAwJTtkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1uO2p1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVuO2FsaWduLWl0ZW1zOmNlbnRlcn0uYWNvcmQtLWNvbmZpZy1jb2x1bW4uaG9yaXpvbnRhbC1hbGlnbi1sZWZ0e2p1c3RpZnktY29udGVudDpmbGV4LXN0YXJ0fS5hY29yZC0tY29uZmlnLWNvbHVtbi5ob3Jpem9udGFsLWFsaWduLXJpZ2h0e2p1c3RpZnktY29udGVudDpmbGV4LWVuZH0uYWNvcmQtLWNvbmZpZy1jb2x1bW4uaG9yaXpvbnRhbC1hbGlnbi1jZW50ZXJ7anVzdGlmeS1jb250ZW50OmNlbnRlcn0uYWNvcmQtLWNvbmZpZy1jb2x1bW4uanVzdGlmeS1zcGFjZS1iZXR3ZWVue2p1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVufS5hY29yZC0tY29uZmlnLWNvbHVtbi5qdXN0aWZ5LXNwYWNlLWFyb3VuZHtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYXJvdW5kfS5hY29yZC0tY29uZmlnLWNvbHVtbi52ZXJ0aWNhbC1hbGlnbi10b3B7YWxpZ24taXRlbXM6ZmxleC1zdGFydH0uYWNvcmQtLWNvbmZpZy1jb2x1bW4udmVydGljYWwtYWxpZ24tYm90dG9te2FsaWduLWl0ZW1zOmZsZXgtZW5kfS5hY29yZC0tY29uZmlnLWNvbHVtbi52ZXJ0aWNhbC1hbGlnbi1jZW50ZXJ7YWxpZ24taXRlbXM6Y2VudGVyfS5hY29yZC0tY29uZmlnLWNvbHVtbi5ob3Jpem9udGFsLXNpemUtbGFyZ2V7d2lkdGg6MTAwJX0uYWNvcmQtLWNvbmZpZy1jb2x1bW4uaG9yaXpvbnRhbC1zaXplLW1lZGl1bXt3aWR0aDo1MCV9LmFjb3JkLS1jb25maWctY29sdW1uLmhvcml6b250YWwtc2l6ZS1zbWFsbHt3aWR0aDoyNSV9LmFjb3JkLS1jb25maWctY29sdW1uLnZlcnRpY2FsLXNpemUtbGFyZ2V7aGVpZ2h0OjEwMCV9LmFjb3JkLS1jb25maWctY29sdW1uLnZlcnRpY2FsLXNpemUtbWVkaXVte2hlaWdodDo1MCV9LmFjb3JkLS1jb25maWctY29sdW1uLnZlcnRpY2FsLXNpemUtc21hbGx7aGVpZ2h0OjI1JX1gO1xuIiwgImltcG9ydCBwYXRjaGVyIGZyb20gXCIuLi8uLi8uLi8uLi8uLi8uLi9hcGkvcGF0Y2hlci9pbmRleC5qc1wiO1xyXG5pbXBvcnQgY29uZmlnQnV0dG9uIGZyb20gXCIuL2NvbmZpZy1idXR0b24vaW5kZXguanNcIjtcclxuaW1wb3J0IGNvbmZpZ0NoZWNrIGZyb20gXCIuL2NvbmZpZy1jaGVjay9pbmRleC5qc1wiO1xyXG5pbXBvcnQgY29uZmlnQ29sdW1uIGZyb20gXCIuL2NvbmZpZy1jb2x1bW4vaW5kZXguanNcIlxyXG5pbXBvcnQgY29uZmlnSW5wdXQgZnJvbSBcIi4vY29uZmlnLWlucHV0L2luZGV4LmpzXCI7XHJcbmltcG9ydCBjb25maWdSb3cgZnJvbSBcIi4vY29uZmlnLXJvdy9pbmRleC5qc1wiO1xyXG5pbXBvcnQgY29uZmlnU2VsZWN0IGZyb20gXCIuL2NvbmZpZy1zZWxlY3QvaW5kZXguanNcIjtcclxuaW1wb3J0IGNvbmZpZ1RleHRhcmVhIGZyb20gXCIuL2NvbmZpZy10ZXh0YXJlYS9pbmRleC5qc1wiO1xyXG5cclxuaW1wb3J0IGNzc1RleHQgZnJvbSBcIi4vc3R5bGUuc2Nzc1wiO1xyXG5wYXRjaGVyLmluamVjdENTUyhjc3NUZXh0KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAvKiogQHBhcmFtIHtpbXBvcnQoXCJ2dWVcIikuQXBwfSB2dWVBcHAgKi9cclxuICBsb2FkKHZ1ZUFwcCkge1xyXG4gICAgY29uZmlnQnV0dG9uLmxvYWQodnVlQXBwKTtcclxuICAgIGNvbmZpZ0NoZWNrLmxvYWQodnVlQXBwKTtcclxuICAgIGNvbmZpZ0lucHV0LmxvYWQodnVlQXBwKTtcclxuICAgIGNvbmZpZ1NlbGVjdC5sb2FkKHZ1ZUFwcCk7XHJcbiAgICBjb25maWdUZXh0YXJlYS5sb2FkKHZ1ZUFwcCk7XHJcbiAgICBjb25maWdDb2x1bW4ubG9hZCh2dWVBcHApO1xyXG4gICAgY29uZmlnUm93LmxvYWQodnVlQXBwKTtcclxuICB9XHJcbn0iLCAiZXhwb3J0IGRlZmF1bHQgYFxuLmFjb3JkLS1pbnN0YWxsZWQtZXh0ZW5zaW9uLWNhcmR7d2lkdGg6MTAwJTtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMCwwLDAsLjEpO2JvcmRlci1yYWRpdXM6OHB4O2Rpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpjb2x1bW47Z2FwOjE2cHh9LmFjb3JkLS1pbnN0YWxsZWQtZXh0ZW5zaW9uLWNhcmQ+LnRvcHtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMCwwLDAsLjEpO2JvcmRlci1yYWRpdXM6OHB4O3dpZHRoOjEwMCU7cGFkZGluZzo4cHg7aGVpZ2h0OjEwMHB4fWA7XG4iLCAiaW1wb3J0IGkxOG4gZnJvbSBcIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2FwaS9pMThuL2luZGV4LmpzXCI7XHJcbmltcG9ydCBwYXRjaGVyIGZyb20gXCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9hcGkvcGF0Y2hlci9pbmRleC5qc1wiO1xyXG5pbXBvcnQgZXh0ZW5zaW9ucyBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vYXBpL2V4dGVuc2lvbnMvaW5kZXguanNcIjtcclxuXHJcbmltcG9ydCBjc3NUZXh0IGZyb20gXCIuL3N0eWxlLnNjc3NcIjtcclxuaW1wb3J0IHsgcmVjb21wdXRhYmxlLCByZWNvbXB1dGUgfSBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vYXBpL3VpL3Z1ZS91dGlscy9yZWNvbXB1dGUuanNcIjtcclxucGF0Y2hlci5pbmplY3RDU1MoY3NzVGV4dCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgLyoqIEBwYXJhbSB7aW1wb3J0KFwidnVlXCIpLkFwcH0gdnVlQXBwICovXHJcbiAgbG9hZCh2dWVBcHApIHtcclxuICAgIHZ1ZUFwcC5jb21wb25lbnQoXHJcbiAgICAgIFwiaW5zdGFsbGVkLWV4dGVuc2lvbi1jYXJkXCIsXHJcbiAgICAgIHtcclxuICAgICAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImFjb3JkLS1pbnN0YWxsZWQtZXh0ZW5zaW9uLWNhcmRcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRvcFwiPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsZWZ0XCI+XHJcblxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyaWdodFwiPlxyXG5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJib3R0b21cIj5cclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICBgLFxyXG4gICAgICAgIGRhdGEoKSB7XHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBleHBhbmRlZDogZmFsc2UsXHJcbiAgICAgICAgICAgIHVybDogbnVsbCxcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb21wdXRlZDoge1xyXG4gICAgICAgICAgZXh0ZW5zaW9uOiByZWNvbXB1dGFibGUoXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gZXh0ZW5zaW9ucy5nZXQodGhpcy51cmwpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImV4dGVuc2lvblwiXHJcbiAgICAgICAgICApXHJcbiAgICAgICAgfSxcclxuICAgICAgICBtb3VudGVkKCkge1xyXG4gICAgICAgICAgcmVjb21wdXRlKHRoaXMsIFwiZXh0ZW5zaW9uXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgKTtcclxuICB9XHJcbn0iLCAiZXhwb3J0IGRlZmF1bHQgYFxuLmFjb3JkLS1zdG9yZS1leHRlbnNpb24tY2FyZHt3aWR0aDoyNzVweDtoZWlnaHQ6MjUwcHg7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOmNvbHVtbjtib3JkZXItcmFkaXVzOjRweDtjb250YWluOmNvbnRlbnQ7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDAsMCwwLC4xKTtib3gtc2hhZG93OnZhcigtLWVsZXZhdGlvbi1tZWRpdW0pfS5hY29yZC0tc3RvcmUtZXh0ZW5zaW9uLWNhcmQ+LnByZXZpZXd7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwcHg7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOmNvbHVtbjtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2VlbjthbGlnbi1pdGVtczpjZW50ZXI7YmFja2dyb3VuZC1jb2xvcjp2YXIoLS1icmFuZC01MDApO2JhY2tncm91bmQtcG9zaXRpb246Y2VudGVyO2JhY2tncm91bmQtc2l6ZTpjb3Zlcn0uYWNvcmQtLXN0b3JlLWV4dGVuc2lvbi1jYXJkPi5wcmV2aWV3Pi5jb250cm9sc3twYWRkaW5nOjhweDtkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2p1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVuO3dpZHRoOjEwMCV9LmFjb3JkLS1zdG9yZS1leHRlbnNpb24tY2FyZD4ucHJldmlldz4uY29udHJvbHMgLmdve2JhY2tncm91bmQtY29sb3I6cmdiYSgwLDAsMCwuNSk7Ym94LXNoYWRvdzowcHggMHB4IDRweCByZ2JhKDAsMCwwLC41KTtib3JkZXItcmFkaXVzOjUwJTt3aWR0aDoyNHB4O2hlaWdodDoyNHB4O2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7anVzdGlmeS1jb250ZW50OmNlbnRlcjtjb2xvcjp2YXIoLS1oZWFkZXItcHJpbWFyeSk7Zm9udC13ZWlnaHQ6NjAwO2N1cnNvcjpwb2ludGVyfS5hY29yZC0tc3RvcmUtZXh0ZW5zaW9uLWNhcmQ+LnByZXZpZXc+Lm5hbWUtY29udGFpbmVye2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7anVzdGlmeS1jb250ZW50OmNlbnRlcjtjb2xvcjp2YXIoLS1oZWFkZXItcHJpbWFyeSk7cGFkZGluZzo4cHh9LmFjb3JkLS1zdG9yZS1leHRlbnNpb24tY2FyZD4ucHJldmlldz4ubmFtZS1jb250YWluZXI+Lm5hbWV7Zm9udC1zaXplOjE0cHg7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDAsMCwwLC41KTtib3gtc2hhZG93OjBweCAwcHggNHB4IHJnYmEoMCwwLDAsLjUpO2JvcmRlci1yYWRpdXM6OTk5OXB4O3BhZGRpbmc6NHB4IDhweH0uYWNvcmQtLXN0b3JlLWV4dGVuc2lvbi1jYXJkPi5pbmZvLWNvbnRhaW5lcntkaXNwbGF5OmZsZXg7anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47ZmxleC1kaXJlY3Rpb246Y29sdW1uO3BhZGRpbmc6OHB4O2hlaWdodDoxNTBweDt3aWR0aDoxMDAlfS5hY29yZC0tc3RvcmUtZXh0ZW5zaW9uLWNhcmQ+LmluZm8tY29udGFpbmVyPi50b3B7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOmNvbHVtbjtnYXA6NHB4O2hlaWdodDoxMDAlfS5hY29yZC0tc3RvcmUtZXh0ZW5zaW9uLWNhcmQ+LmluZm8tY29udGFpbmVyPi50b3A+Lm5hbWUtY29udGFpbmVye2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7Z2FwOjRweDt3aWR0aDoxMDAlfS5hY29yZC0tc3RvcmUtZXh0ZW5zaW9uLWNhcmQ+LmluZm8tY29udGFpbmVyPi50b3A+Lm5hbWUtY29udGFpbmVyPi5uYW1le2ZvbnQtc2l6ZToxNnB4O2ZvbnQtd2VpZ2h0OjUwMDtjb2xvcjp2YXIoLS1oZWFkZXItcHJpbWFyeSl9LmFjb3JkLS1zdG9yZS1leHRlbnNpb24tY2FyZD4uaW5mby1jb250YWluZXI+LnRvcD4ubmFtZS1jb250YWluZXI+LnZlcnNpb257Zm9udC1zaXplOjEycHg7Zm9udC13ZWlnaHQ6NTAwO2NvbG9yOnZhcigtLWhlYWRlci1wcmltYXJ5KTtvcGFjaXR5Oi41fS5hY29yZC0tc3RvcmUtZXh0ZW5zaW9uLWNhcmQ+LmluZm8tY29udGFpbmVyPi50b3A+LmRlc2NyaXB0aW9ue2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OjMwMDtjb2xvcjp2YXIoLS1oZWFkZXItcHJpbWFyeSk7b3BhY2l0eTouNzU7d2lkdGg6MTAwJX0uYWNvcmQtLXN0b3JlLWV4dGVuc2lvbi1jYXJkPi5pbmZvLWNvbnRhaW5lcj4uYm90dG9te2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpmbGV4LXN0YXJ0O2p1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVuO2hlaWdodDoxMDAlfS5hY29yZC0tc3RvcmUtZXh0ZW5zaW9uLWNhcmQ+LmluZm8tY29udGFpbmVyPi5ib3R0b20+LmxlZnR7aGVpZ2h0OjEwMCU7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOmNvbHVtbjthbGlnbi1pdGVtczpmbGV4LXN0YXJ0O2p1c3RpZnktY29udGVudDpmbGV4LWVuZH0uYWNvcmQtLXN0b3JlLWV4dGVuc2lvbi1jYXJkPi5pbmZvLWNvbnRhaW5lcj4uYm90dG9tPi5sZWZ0Pi5hdXRob3Jze2Rpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpjb2x1bW47Z2FwOjRweH0uYWNvcmQtLXN0b3JlLWV4dGVuc2lvbi1jYXJkPi5pbmZvLWNvbnRhaW5lcj4uYm90dG9tPi5sZWZ0Pi5hdXRob3JzIC5hdXRob3J7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtib3JkZXItcmFkaXVzOjk5OTlweDtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMCwwLDAsLjEpO2N1cnNvcjpwb2ludGVyfS5hY29yZC0tc3RvcmUtZXh0ZW5zaW9uLWNhcmQ+LmluZm8tY29udGFpbmVyPi5ib3R0b20+LmxlZnQ+LmF1dGhvcnMgLmF1dGhvcj4uaW1hZ2V7Ym9yZGVyLXJhZGl1czo1MCU7d2lkdGg6MThweDtoZWlnaHQ6MThweDtiYWNrZ3JvdW5kLWNvbG9yOnZhcigtLWJyYW5kLTUwMCk7YmFja2dyb3VuZC1wb3NpdGlvbjpjZW50ZXI7YmFja2dyb3VuZC1zaXplOmNvdmVyfS5hY29yZC0tc3RvcmUtZXh0ZW5zaW9uLWNhcmQ+LmluZm8tY29udGFpbmVyPi5ib3R0b20+LmxlZnQ+LmF1dGhvcnMgLmF1dGhvcj4ubmFtZXtmb250LXNpemU6MTBweDtmb250LXdlaWdodDo0MDA7Y29sb3I6dmFyKC0taGVhZGVyLXByaW1hcnkpO29wYWNpdHk6Ljc1O3BhZGRpbmc6NnB4fS5hY29yZC0tc3RvcmUtZXh0ZW5zaW9uLWNhcmQ+LmluZm8tY29udGFpbmVyPi5ib3R0b20+LnJpZ2h0e2hlaWdodDoxMDAlO2Rpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpjb2x1bW47YWxpZ24taXRlbXM6ZmxleC1lbmQ7anVzdGlmeS1jb250ZW50OmZsZXgtZW5kfWA7XG4iLCAiaW1wb3J0IG1vZGFscyBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vYXBpL3VpL21vZGFscy5qc3hcIjtcclxuaW1wb3J0IGkxOG4gZnJvbSBcIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2FwaS9pMThuL2luZGV4LmpzXCI7XHJcbmltcG9ydCBwYXRjaGVyIGZyb20gXCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9hcGkvcGF0Y2hlci9pbmRleC5qc1wiO1xyXG5cclxuaW1wb3J0IGNzc1RleHQgZnJvbSBcIi4vc3R5bGUuc2Nzc1wiO1xyXG5wYXRjaGVyLmluamVjdENTUyhjc3NUZXh0KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAvKiogQHBhcmFtIHtpbXBvcnQoXCJ2dWVcIikuQXBwfSB2dWVBcHAgKi9cclxuICBsb2FkKHZ1ZUFwcCkge1xyXG4gICAgdnVlQXBwLmNvbXBvbmVudChcclxuICAgICAgXCJzdG9yZS1leHRlbnNpb24tY2FyZFwiLFxyXG4gICAgICB7XHJcbiAgICAgICAgdGVtcGxhdGU6IGBcclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJhY29yZC0tc3RvcmUtZXh0ZW5zaW9uLWNhcmRcIj5cclxuICAgICAgICAgICAgPGRpdiB2LWlmPVwiZXh0ZW5zaW9uLnByZXZpZXdzPy5sZW5ndGhcIiBjbGFzcz1cInByZXZpZXdcIiA6c3R5bGU9XCJ7IGJhY2tncm91bmRJbWFnZTogJ3VybCgnICsgZXh0ZW5zaW9uLnByZXZpZXdzW3NlbGVjdGVkUHJldmlld10uaW1hZ2UgKyAnKScgfVwiPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250cm9sc1wiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdvIGdvLWJhY2tcIiBAY2xpY2s9XCJnb0JhY2tcIj5cclxuICAgICAgICAgICAgICAgICAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMTEuODI4IDEybDIuODI5IDIuODI4LTEuNDE0IDEuNDE1TDkgMTJsNC4yNDMtNC4yNDMgMS40MTQgMS40MTVMMTEuODI4IDEyelwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIiAvPlxyXG4gICAgICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdvIGdvLWZvcndhcmRcIiBAY2xpY2s9XCJnb0ZvcndhcmRcIj5cclxuICAgICAgICAgICAgICAgICAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMTIuMTcyIDEyTDkuMzQzIDkuMTcybDEuNDE0LTEuNDE1TDE1IDEybC00LjI0MyA0LjI0My0xLjQxNC0xLjQxNXpcIiBmaWxsPVwiY3VycmVudENvbG9yXCIgLz5cclxuICAgICAgICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibmFtZS1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJuYW1lXCI+XHJcbiAgICAgICAgICAgICAgICAgIHt7IGV4dGVuc2lvbi5wcmV2aWV3c1tzZWxlY3RlZFByZXZpZXddLm5hbWUgfX1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiB2LWVsc2UgY2xhc3M9XCJwcmV2aWV3IG5vLXByZXZpZXdcIj48L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImluZm8tY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRvcFwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm5hbWUtY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJuYW1lXCI+e3sgaTE4bkxvY2FsaXplKGV4dGVuc2lvbi5uYW1lKSB9fTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidmVyc2lvblwiPnZ7eyBleHRlbnNpb24udmVyc2lvbiB9fTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGVzY3JpcHRpb25cIj57eyBpMThuTG9jYWxpemUoZXh0ZW5zaW9uLmRlc2NyaXB0aW9uKSB9fTwvZGl2PlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJib3R0b21cIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsZWZ0XCI+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhdXRob3JzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiB2LWZvcj1cImF1dGhvciBpbiBleHRlbnNpb24uYXV0aG9yc1wiIGNsYXNzPVwiYXV0aG9yXCIgOmtleT1cImF1dGhvci5uYW1lXCIgQGNsaWNrPVwic2hvd1Byb2ZpbGUoYXV0aG9yLmlkKVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImltYWdlXCIgOnN0eWxlPVwieyBiYWNrZ3JvdW5kSW1hZ2U6ICd1cmwoJyArIGF1dGhvci5pbWFnZSArICcpJyB9XCI+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibmFtZVwiPnt7IGF1dGhvci5uYW1lIH19PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicmlnaHRcIj5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJ1dHRvbnNcIj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBAY2xpY2s9XCJpbnN0YWxsT3JVbmluc3RhbGxcIj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxkaXNjb3JkLWJ1dHRvbiA6dmFsdWU9XCJpMThuRm9ybWF0KGV4dGVuc2lvbi5pbnN0YWxsZWQgPyAnVU5JTlNUQUxMJyA6ICdJTlNUQUxMJylcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICBgLFxyXG4gICAgICAgIHByb3BzOiBbXCJleHRlbnNpb25cIl0sXHJcbiAgICAgICAgZGF0YSgpIHtcclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHNlbGVjdGVkUHJldmlldzogMCxcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgfSxcclxuICAgICAgICBtZXRob2RzOiB7XHJcbiAgICAgICAgICBpMThuRm9ybWF0OiBpMThuLmZvcm1hdCxcclxuICAgICAgICAgIGkxOG5Mb2NhbGl6ZTogaTE4bi5sb2NhbGl6ZSxcclxuICAgICAgICAgIGluc3RhbGxPclVuaW5zdGFsbCgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZXh0ZW5zaW9uLmluc3RhbGxlZCkge1xyXG4gICAgICAgICAgICAgIC8vIHVuaW5zdGFsbFxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIC8vIGluc3RhbGxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGdvQmFjaygpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFByZXZpZXctLTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRQcmV2aWV3IDwgMCkgdGhpcy5zZWxlY3RlZFByZXZpZXcgPSB0aGlzLmV4dGVuc2lvbi5wcmV2aWV3cy5sZW5ndGggLSAxO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGdvRm9yd2FyZCgpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFByZXZpZXcrKztcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRQcmV2aWV3ID49IHRoaXMuZXh0ZW5zaW9uLnByZXZpZXdzLmxlbmd0aCkgdGhpcy5zZWxlY3RlZFByZXZpZXcgPSAwO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHNob3dQcm9maWxlKHByb2ZpbGVJZCkge1xyXG4gICAgICAgICAgICBtb2RhbHMuc2hvdy51c2VyKHByb2ZpbGVJZCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICApXHJcbiAgfVxyXG59IiwgImltcG9ydCBpbnN0YWxsZWRFeHRlbnNpb25DYXJkIGZyb20gXCIuL2luc3RhbGxlZC1leHRlbnNpb24tY2FyZC9pbmRleC5qc1wiO1xyXG5pbXBvcnQgc3RvcmVFeHRlbnNpb25DYXJkIGZyb20gXCIuL3N0b3JlLWV4dGVuc2lvbi1jYXJkL2luZGV4LmpzXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAvKiogQHBhcmFtIHtpbXBvcnQoXCJ2dWVcIikuQXBwfSB2dWVBcHAgKi9cclxuICBsb2FkKHZ1ZUFwcCkge1xyXG4gICAgc3RvcmVFeHRlbnNpb25DYXJkLmxvYWQodnVlQXBwKTtcclxuICAgIGluc3RhbGxlZEV4dGVuc2lvbkNhcmQubG9hZCh2dWVBcHApO1xyXG4gIH1cclxufSIsICJcclxuaW1wb3J0IGNvbmZpZ0NvbXBvbmVudHMgZnJvbSBcIi4vY29uZmlnL2luZGV4LmpzXCI7XHJcbmltcG9ydCBjYXJkQ29tcG9uZW50cyBmcm9tIFwiLi9jYXJkcy9pbmRleC5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIC8qKiBAcGFyYW0ge2ltcG9ydChcInZ1ZVwiKS5BcHB9IHZ1ZUFwcCAqL1xyXG4gIGxvYWQodnVlQXBwKSB7XHJcbiAgICBjb25maWdDb21wb25lbnRzLmxvYWQodnVlQXBwKTtcclxuICAgIGNhcmRDb21wb25lbnRzLmxvYWQodnVlQXBwKTtcclxuICB9XHJcbn0iLCAiaW1wb3J0IHBhZ2VzIGZyb20gXCIuL3BhZ2VzL2luZGV4LmpzXCI7XHJcbmltcG9ydCBjb21wb25lbnRzIGZyb20gXCIuL2NvbXBvbmVudHMvaW5kZXguanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAvKiogQHBhcmFtIHtpbXBvcnQoXCJ2dWVcIikuQXBwfSB2dWVBcHAgKi9cclxuICBsb2FkKHZ1ZUFwcCkge1xyXG4gICAgY29tcG9uZW50cy5sb2FkKHZ1ZUFwcCk7XHJcbiAgICBwYWdlcy5sb2FkKHZ1ZUFwcCk7XHJcbiAgfVxyXG59IiwgImltcG9ydCBkb20gZnJvbSBcIi4uLy4uL2FwaS9kb20vaW5kZXguanNcIjtcclxuaW1wb3J0IHdlYnBhY2sgZnJvbSBcIi4uLy4uL2FwaS9tb2R1bGVzL3dlYnBhY2suanNcIjtcclxuaW1wb3J0IHBhdGNoZXIgZnJvbSBcIi4uLy4uL2FwaS9wYXRjaGVyL2luZGV4LmpzXCI7XHJcbmltcG9ydCB1dGlscyBmcm9tIFwiLi4vLi4vYXBpL3V0aWxzL2luZGV4LmpzXCI7XHJcbmltcG9ydCBpMThuIGZyb20gXCIuLi8uLi9hcGkvaTE4bi9pbmRleC5qc1wiO1xyXG5pbXBvcnQgdWkgZnJvbSBcIi4uLy4uL2FwaS91aS9pbmRleC5qc1wiO1xyXG5cclxuaW1wb3J0IGNzc1RleHQgZnJvbSBcIi4vc3R5bGUuc2Nzc1wiO1xyXG5pbXBvcnQgdnVlQ29tcG9uZW50cyBmcm9tIFwiLi92dWUvY29tcG9uZW50cy9pbmRleC5qc1wiO1xyXG5wYXRjaGVyLmluamVjdENTUyhjc3NUZXh0KTtcclxuXHJcbntcclxuICBsZXQgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcclxuICBzY3JpcHQuc3JjID0gXCJodHRwczovL3VucGtnLmNvbS92dWVAMy9kaXN0L3Z1ZS5nbG9iYWwuanNcIjtcclxuICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XHJcbn1cclxuXHJcbmRvbS5wYXRjaCgnYVtocmVmPVwiL3N0b3JlXCJdW2RhdGEtbGlzdC1pdGVtLWlkJD1cIl9fX25pdHJvXCJdJywgKGVsbSkgPT4ge1xyXG4gIHV0aWxzLmlmRXhpc3RzKFxyXG4gICAgZWxtLnF1ZXJ5U2VsZWN0b3IoJ1tjbGFzcyo9XCJuYW1lQW5kRGVjb3JhdG9ycy1cIl0gW2NsYXNzKj1cIm5hbWUtXCJdJyksXHJcbiAgICAobmFtZUVsbSkgPT4ge1xyXG4gICAgICBuYW1lRWxtLnRleHRDb250ZW50ID0gaTE4bi5mb3JtYXQoXCJBUFBfTkFNRVwiKTtcclxuICAgIH1cclxuICApO1xyXG5cclxuICB1dGlscy5pZkV4aXN0cyhcclxuICAgIGVsbS5xdWVyeVNlbGVjdG9yKCdbY2xhc3MqPVwicHJlbWl1bVRyaWFsQWNrbm93bGVkZ2VkQmFkZ2UtXCJdJyksXHJcbiAgICAobml0cm9FbG0pID0+IHtcclxuICAgICAgbml0cm9FbG0ucmVtb3ZlKCk7XHJcbiAgICB9XHJcbiAgKTtcclxuXHJcbiAgdXRpbHMuaWZFeGlzdHMoXHJcbiAgICBlbG0ucXVlcnlTZWxlY3RvcignW2NsYXNzKj1cImF2YXRhcldpdGhUZXh0LVwiXSBbY2xhc3MqPVwiYXZhdGFyLVwiXSBzdmcnKSxcclxuICAgIGZpbGxTVkdFbG1XaXRoQWNvcmRMb2dvXHJcbiAgKTtcclxufSk7XHJcblxyXG5sZXQgaW50ZXJuYWxWdWVBcHAgPSBudWxsO1xyXG5cclxuY29uc3QgaGVhZGVySXRlbUNsYXNzZXMgPSB3ZWJwYWNrLmZpbmRCeVByb3BlcnRpZXMoXCJkaXZpZGVyXCIsIFwiaGFtYnVyZ2VyXCIsIFwidGhlbWVkXCIpO1xyXG5jb25zdCB0YWJCYXJDbGFzc2VzID0gd2VicGFjay5maW5kQnlQcm9wZXJ0aWVzKFwidGFiQmFyXCIsIFwibWF4V2lkdGhXaXRoVG9vbGJhclwiKTtcclxuY29uc3QgaGVhZGVyQ2xhc3NlcyA9IHdlYnBhY2suZmluZEJ5UHJvcGVydGllcyhcInRvcFBpbGxcIiwgXCJoZWFkZXJUZXh0XCIpO1xyXG5kb20ucGF0Y2goJ1tjbGFzcyo9XCJhcHBsaWNhdGlvblN0b3JlLVwiXSBbY2xhc3MqPVwiaG9tZVdyYXBwZXJOb3JtYWwtXCJdJywgKGVsbSkgPT4ge1xyXG5cclxuICB1dGlscy5pZkV4aXN0cyhcclxuICAgIGVsbS5xdWVyeVNlbGVjdG9yKCdbY2xhc3MqPVwiaGVhZGVyQmFyLVwiXSBbY2xhc3MqPVwidGl0bGVXcmFwcGVyLVwiXSBbY2xhc3MqPVwidGl0bGUtXCJdJyksXHJcbiAgICAodGl0bGVFbG0pID0+IHtcclxuICAgICAgdGl0bGVFbG0udGV4dENvbnRlbnQgPSBpMThuLmZvcm1hdChcIkFQUF9OQU1FXCIpO1xyXG5cclxuICAgICAgaWYgKGludGVybmFsVnVlQXBwKSB7XHJcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IGRvbS5wYXJlbnRzKHRpdGxlRWxtLCAyKS5wb3AoKTtcclxuXHJcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKFxyXG4gICAgICAgICAgZG9tLnBhcnNlKGA8ZGl2IGNsYXNzPVwiJHtoZWFkZXJJdGVtQ2xhc3Nlcy5kaXZpZGVyfVwiPjwvZGl2PmApXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgY29uc3QgYnV0dG9uc0NvbnRhaW5lciA9IGRvbS5wYXJzZShgXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiJHt0YWJCYXJDbGFzc2VzLnRhYkJhcn0gJHtoZWFkZXJDbGFzc2VzLnRvcFBpbGx9XCI+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICBgKTtcclxuXHJcbiAgICAgICAgbGV0IGJ1dHRvbnMgPSBbXTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gYnVpbGRCdXR0b24oaWQsIHRleHQsIGN1c3RvbUNsYXNzZXMgPSBcIlwiKSB7XHJcbiAgICAgICAgICBsZXQgZWxtID0gZG9tLnBhcnNlKGA8ZGl2IGlkPVwidGFiLWJ1dHRvbi0ke2lkfVwiIGNsYXNzPVwiYWNvcmQtLXRhYnMtdGFiLWJ1dHRvbiAke2N1c3RvbUNsYXNzZXN9ICR7dGFiQmFyQ2xhc3Nlcy5pdGVtfSAke2hlYWRlckNsYXNzZXMuaXRlbX0gJHtoZWFkZXJDbGFzc2VzLnRoZW1lZH1cIj4ke3RleHR9PC9kaXY+YCk7XHJcblxyXG4gICAgICAgICAgYnV0dG9ucy5wdXNoKGVsbSk7XHJcblxyXG4gICAgICAgICAgZWxtLnNldFNlbGVjdGVkID0gKHMpID0+IHtcclxuICAgICAgICAgICAgaWYgKHMpIGVsbS5jbGFzc0xpc3QuYWRkKGhlYWRlckNsYXNzZXMuc2VsZWN0ZWQsIFwic2VsZWN0ZWRcIik7XHJcbiAgICAgICAgICAgIGVsc2UgZWxtLmNsYXNzTGlzdC5yZW1vdmUoaGVhZGVyQ2xhc3Nlcy5zZWxlY3RlZCwgXCJzZWxlY3RlZFwiKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBlbG0uc2V0U2VsZWN0ZWQoaW50ZXJuYWxWdWVBcHAuc2VsZWN0ZWRUYWIgPT09IGlkKTtcclxuXHJcbiAgICAgICAgICBlbG0ub25jbGljayA9ICgpID0+IHtcclxuICAgICAgICAgICAgYnV0dG9ucy5mb3JFYWNoKChiKSA9PiBiLnNldFNlbGVjdGVkKGZhbHNlKSk7XHJcbiAgICAgICAgICAgIGVsbS5zZXRTZWxlY3RlZCh0cnVlKTtcclxuICAgICAgICAgICAgaW50ZXJuYWxWdWVBcHAuc2VsZWN0ZWRUYWIgPSBpZDtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBlbG07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBidXR0b25zQ29udGFpbmVyLmFwcGVuZENoaWxkKGJ1aWxkQnV0dG9uKFwiaG9tZVwiLCBpMThuLmZvcm1hdChcIkhPTUVcIikpKTtcclxuICAgICAgICBidXR0b25zQ29udGFpbmVyLmFwcGVuZENoaWxkKGJ1aWxkQnV0dG9uKFwiaW5zdGFsbGVkLWV4dGVuc2lvbnNcIiwgaTE4bi5mb3JtYXQoXCJJTlNUQUxMRURfRVhURU5TSU9OU1wiKSkpO1xyXG4gICAgICAgIGJ1dHRvbnNDb250YWluZXIuYXBwZW5kQ2hpbGQoYnVpbGRCdXR0b24oXCJzZXR0aW5nc1wiLCBpMThuLmZvcm1hdChcIlNFVFRJTkdTXCIpKSk7XHJcbiAgICAgICAgYnV0dG9uc0NvbnRhaW5lci5hcHBlbmRDaGlsZChidWlsZEJ1dHRvbihcInN0b3JlXCIsIGkxOG4uZm9ybWF0KFwiRVhURU5TSU9OX1NUT1JFXCIpLCBcInN0b3JlLXRhYi1idXR0b25cIikpO1xyXG5cclxuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYnV0dG9uc0NvbnRhaW5lcik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICApO1xyXG4gIHV0aWxzLmlmRXhpc3RzKFxyXG4gICAgZWxtLnF1ZXJ5U2VsZWN0b3IoJ1tjbGFzcyo9XCJoZWFkZXJCYXItXCJdIFtjbGFzcyo9XCJpY29uV3JhcHBlci1cIl0gW2NsYXNzKj1cImljb24tXCJdJyksXHJcbiAgICBmaWxsU1ZHRWxtV2l0aEFjb3JkTG9nb1xyXG4gICk7XHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gZmlsbFNWR0VsbVdpdGhBY29yZExvZ28oc3ZnRWxtKSB7XHJcbiAgc3ZnRWxtLnNldEF0dHJpYnV0ZShcInZpZXdCb3hcIiwgXCIwIDAgODEzLjUgMTQ5M1wiKTtcclxuICBzdmdFbG0uc2V0QXR0cmlidXRlKFwieG1sbnNcIiwgXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiKTtcclxuICBzdmdFbG0uaW5uZXJIVE1MID0gYFxyXG4gICAgPGRlZnM+XHJcbiAgICAgIDxzdHlsZT5cclxuICAgICAgICAuYWNvcmQtLWxvZ28tY29sb3Ige1xyXG4gICAgICAgICAgZmlsbDogY3VycmVudENvbG9yO1xyXG4gICAgICAgICAgZmlsbC1ydWxlOiBldmVub2RkO1xyXG4gICAgICAgIH1cclxuICAgICAgPC9zdHlsZT5cclxuICAgIDwvZGVmcz5cclxuICAgIDxnPlxyXG4gICAgICA8cGF0aCBjbGFzcz1cImFjb3JkLS1sb2dvLWNvbG9yXCIgZD1cIk04MTcuMjY2LDEzMjIuNWgyODV2MzY1aC0yODV2LTM2NVpcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoLTU1My4yNSAtMjEzLjUpXCIvPlxyXG4gICAgICA8cGF0aCBjbGFzcz1cImFjb3JkLS1sb2dvLWNvbG9yXCIgZD1cIk01NTUuMjM1LDE1MjMuNzhzOTEuMTY5LTMxOS44NSw5Mi41MzEtMzE5LjI4YzExNC43LDQ3LjgzLDE2MCwxOTIsMTYwLDE5MmwtNTIuMTIsMTg2LjYxcy0zMS4xMjksMTM3LjcxLTgwLjg4LDEyMC4zOUM1MjguMDI2LDE2NTIuNDIsNTU1LjIzNSwxNTIzLjc4LDU1NS4yMzUsMTUyMy43OFpcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoLTU1My4yNSAtMjEzLjUpXCIvPlxyXG4gICAgICA8cGF0aCBjbGFzcz1cImFjb3JkLS1sb2dvLWNvbG9yXCIgZD1cIk0xMzY0Ljc3LDE1MjUuMjhzLTkxLjE3LTMxOS44NS05Mi41NC0zMTkuMjhjLTExNC43LDQ3LjgzLTE2MCwxOTItMTYwLDE5Mmw1Mi4xMiwxODYuNjFzMzEuMTMsMTM3LjcxLDgwLjg4LDEyMC4zOUMxMzkxLjk3LDE2NTMuOTIsMTM2NC43NywxNTI1LjI4LDEzNjQuNzcsMTUyNS4yOFpcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoLTU1My4yNSAtMjEzLjUpXCIvPlxyXG4gICAgPC9nPlxyXG4gICAgPHBhdGggY2xhc3M9XCJhY29yZC0tbG9nby1jb2xvclwiIGQ9XCJNODc0Ljc2NiwyNzUuNXMxNC41NzktNjEuOTE4LDg3LTYyYzgwLjgyNC0uMDkyLDg3LDYyLDg3LDYyczE5OS40Myw4NTEuNDcsMTk4LDg1MmMtMjEwLjMzLDc3LjcxLTE0NiwxODAtMTQ2LDE4MGgtMjgxczYzLjctMTAzLjgyLTE0Ni0xODFDNjcxLjAxNCwxMTI1LjQ5LDg3NC43NjYsMjc1LjUsODc0Ljc2NiwyNzUuNVpcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoLTU1My4yNSAtMjEzLjUpXCIvPlxyXG4gICAgPGc+XHJcbiAgICAgIDxwYXRoIGNsYXNzPVwiYWNvcmQtLWxvZ28tY29sb3JcIiBkPVwiTTEyMzguMTQsODk3LjVhNTMuODgyLDUzLjg4MiwwLDAsMSw1My44OCw1My44NzVjMCwyNC45MzktMjAuMjUsNDYuOTg3LTQzLjI1LDUzLjEyNS00LjQ1LDEuMTgtMTAuMTktMzktMTEtMzktMC41OCwwLTI3LjcxLDMuNTEtMzEsNC01LjU4LjgyOC0xMS45My0xMy44NzYtNC0yMCwxLjkzLTEuNDkxLDI2LjYyLTYuOTU5LDI5LTcsMC42Mi0uMDExLTcuMzQtNDEuNjE4LTctNDNDMTIyNS42NCw4OTUuOTQ0LDEyMzMuNTIsODk3LjUsMTIzOC4xNCw4OTcuNVpcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoLTU1My4yNSAtMjEzLjUpXCIvPlxyXG4gICAgICA8cGF0aCBjbGFzcz1cImFjb3JkLS1sb2dvLWNvbG9yXCIgZD1cIk0xMTczLjY0LDYzMi41YTUzLjg4Miw1My44ODIsMCwwLDEsNTMuODgsNTMuODc1YzAsMjQuOTM5LTIwLjI1LDQ2Ljk4Ny00My4yNSw1My4xMjUtNC40NSwxLjE4NS0xMC4xOS0zOS0xMS0zOS0wLjU4LDAtMjcuNzEsMy41MS0zMSw0LTUuNTguODI4LTExLjkzLTEzLjg3Ni00LTIwLDEuOTMtMS40OTEsMjYuNjItNi45NTksMjktNywwLjYyLS4wMTEtNy4zNC00MS42MTgtNy00M0MxMTYxLjE0LDYzMC45NDQsMTE2OS4wMiw2MzIuNSwxMTczLjY0LDYzMi41WlwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgtNTUzLjI1IC0yMTMuNSlcIi8+XHJcbiAgICAgIDxwYXRoIGNsYXNzPVwiYWNvcmQtLWxvZ28tY29sb3JcIiBkPVwiTTExMTUuMTYsMzczYTUzLjg3NCw1My44NzQsMCwwLDEsNTMuODcsNTMuODc1YzAsMjQuOTM5LTIwLjI0LDQ2Ljk4Ny00My4yNSw1My4xMjUtNC40NCwxLjE4NS0xMC4xOC0zOS0xMS0zOS0wLjU4LDAtMjcuNywzLjUxLTMxLDQtNS41Ny44MjgtMTEuOTItMTMuODc2LTQtMjAsMS45My0xLjQ5MSwyNi42Mi02Ljk1OSwyOS03LDAuNjItLjAxMS03LjM0LTQxLjYxOC03LTQzQzExMDIuNjUsMzcxLjQ0NCwxMTEwLjUzLDM3MywxMTE1LjE2LDM3M1pcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoLTU1My4yNSAtMjEzLjUpXCIvPlxyXG4gICAgPC9nPlxyXG4gICAgPGc+XHJcbiAgICAgIDxwYXRoIGNsYXNzPVwiYWNvcmQtLWxvZ28tY29sb3JcIiBkPVwiTTY4My45MjIsODk3Ljc1YTUzLjg3NSw1My44NzUsMCwwLDAtNTMuODc1LDUzLjg3NWMwLDI0LjkzOSwyMC4yNDUsNDYuOTg3LDQzLjI1LDUzLjEyNSw0LjQ0MSwxLjE4LDEwLjE4NS0zOSwxMS0zOSwwLjU3NiwwLDI3LjcsMy41MSwzMSw0LDUuNTcyLDAuODI4LDExLjkyNi0xMy44NzYsNC0yMC0xLjkzLTEuNDkxLTI2LjYyMS02Ljk1OS0yOS03LTAuNjItLjAxMSw3LjMzOS00MS42MTgsNy00M0M2OTYuNDI0LDg5Ni4xOTQsNjg4LjU0NCw4OTcuNzUsNjgzLjkyMiw4OTcuNzVaXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKC01NTMuMjUgLTIxMy41KVwiLz5cclxuICAgICAgPHBhdGggY2xhc3M9XCJhY29yZC0tbG9nby1jb2xvclwiIGQ9XCJNNzQ4LjQyMiw2MzIuNzVhNTMuODc1LDUzLjg3NSwwLDAsMC01My44NzUsNTMuODc1YzAsMjQuOTM5LDIwLjI0NSw0Ni45ODcsNDMuMjUsNTMuMTI1LDQuNDQxLDEuMTg1LDEwLjE4NS0zOSwxMS0zOSwwLjU3NiwwLDI3LjcsMy41MSwzMSw0LDUuNTcyLDAuODI4LDExLjkyNi0xMy44NzYsNC0yMC0xLjkzLTEuNDkxLTI2LjYyMS02Ljk1OS0yOS03LTAuNjItLjAxMSw3LjMzOS00MS42MTgsNy00M0M3NjAuOTI0LDYzMS4xOTQsNzUzLjA0NCw2MzIuNzUsNzQ4LjQyMiw2MzIuNzVaXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKC01NTMuMjUgLTIxMy41KVwiLz5cclxuICAgICAgPHBhdGggY2xhc3M9XCJhY29yZC0tbG9nby1jb2xvclwiIGQ9XCJNODA2LjkwNiwzNzMuMjVhNTMuODc1LDUzLjg3NSwwLDAsMC01My44NzUsNTMuODc1YzAsMjQuOTM5LDIwLjI0NSw0Ni45ODcsNDMuMjUsNTMuMTI1LDQuNDQyLDEuMTg1LDEwLjE4NS0zOSwxMS0zOSwwLjU3NywwLDI3LjcsMy41MSwzMSw0LDUuNTcyLDAuODI4LDExLjkyNi0xMy44NzYsNC0yMC0xLjkzLTEuNDkxLTI2LjYyMS02Ljk1OS0yOS03LTAuNjItLjAxMSw3LjMzOS00MS42MTgsNy00M0M4MTkuNDA5LDM3MS42OTQsODExLjUyOCwzNzMuMjUsODA2LjkwNiwzNzMuMjVaXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKC01NTMuMjUgLTIxMy41KVwiLz5cclxuICAgIDwvZz5cclxuICBgO1xyXG59XHJcblxyXG5cclxuKGFzeW5jICgpID0+IHtcclxuICBhd2FpdCB1aS52dWUucmVhZHkud2hlbigpO1xyXG5cclxuICBjb25zdCBiYXNlVnVlRWxtID0gZG9tLnBhcnNlKGBcclxuICAgIDxkaXYgY2xhc3M9XCJhY29yZC0tdGFicy1jb250ZW50LWNvbnRhaW5lclwiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwidGFiXCI+XHJcbiAgICAgICAgPGtlZXAtYWxpdmU+XHJcbiAgICAgICAgICA8Y29tcG9uZW50IDppcz1cIlxcYFxcJHtzZWxlY3RlZFRhYn0tcGFnZVxcYFwiIC8+XHJcbiAgICAgICAgPC9rZWVwLWFsaXZlPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIGApO1xyXG5cclxuICAvKiogQHR5cGUge2ltcG9ydChcInZ1ZVwiKS5BcHB9ICovXHJcbiAgY29uc3QgdnVlQXBwID0gVnVlLmNyZWF0ZUFwcCh7XHJcbiAgICBkYXRhKCkge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHNlbGVjdGVkVGFiOiBcImhvbWVcIlxyXG4gICAgICB9O1xyXG4gICAgfSxcclxuICAgIG1vdW50ZWQoKSB7XHJcbiAgICAgIGludGVybmFsVnVlQXBwID0gdGhpcztcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgdWkudnVlLmNvbXBvbmVudHMubG9hZCh2dWVBcHApO1xyXG4gIHZ1ZUNvbXBvbmVudHMubG9hZCh2dWVBcHApO1xyXG4gIHZ1ZUFwcC5tb3VudChiYXNlVnVlRWxtKTtcclxuXHJcbiAgZG9tLnBhdGNoKCdbY2xhc3MqPVwiYXBwbGljYXRpb25TdG9yZS1cIl0gW2NsYXNzKj1cInNjcm9sbGVyQmFzZS1cIl0gW2NsYXNzKj1cInN1YnNjcmlwdGlvbnNSZWRpcmVjdENvbnRhaW5lci1cIl0sIFtjbGFzcyo9XCJhcHBsaWNhdGlvblN0b3JlLVwiXSBbY2xhc3MqPVwic2Nyb2xsZXJCYXNlLVwiXSBbY2xhc3MqPVwidHJpYWxPZmZlcldyYXBwZXItXCJdLCBbY2xhc3MqPVwiYXBwbGljYXRpb25TdG9yZS1cIl0gW2NsYXNzKj1cInNjcm9sbGVyQmFzZS1cIl0gW2NsYXNzKj1cInByZW1pdW1DYXJkcy1cIl0nLCAoZWxtKSA9PiB7XHJcbiAgICAvKiogQHR5cGUge0hUTUxEaXZFbGVtZW50fSAqL1xyXG4gICAgbGV0IGNvbnRhaW5lckVsbSA9IGRvbS5wYXJlbnRzKGVsbSwgNCkucG9wKCk7XHJcbiAgICBjb250YWluZXJFbG0ucmVwbGFjZUNoaWxkcmVuKGJhc2VWdWVFbG0pO1xyXG4gIH0pO1xyXG59KSgpO1xyXG5cclxuXHJcblxyXG5cclxuIiwgIlxyXG4oYXN5bmMgKCkgPT4ge1xyXG4gIC8qKiBAdHlwZSB7U1ZHRWxlbWVudH0gKi9cclxuICBsZXQgc3ZnRWxtO1xyXG4gIHdoaWxlICh0cnVlKSB7XHJcbiAgICBzdmdFbG0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbY2xhc3MqPVwid29yZG1hcmstXCJdIHN2ZycpO1xyXG4gICAgaWYgKHN2Z0VsbSkgYnJlYWs7XHJcbiAgICBhd2FpdCBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgMTAwKSk7XHJcbiAgfVxyXG5cclxuICBzdmdFbG0uaW5uZXJIVE1MID0gYDxwYXRoIGQ9XCJNNi44NjQgMTBMNi40MzIgOC45NTZIMy4wNDhMMi41NDQgMTBIMC4xMDhMMy45NDggMS41NjRINi4wNDhMOS43MiAxMEg2Ljg2NFpNNC43NCA0Ljc4TDMuOTEyIDYuNzk2SDUuNThMNC43NCA0Ljc4Wk0xNS41MDQ1IDYuMzI4QzE1LjM0NDUgNi4yMjQgMTUuMTkyNSA2LjEzMiAxNS4wNDg1IDYuMDUyQzE0LjkwNDUgNS45NjQgMTQuNzU2NSA1Ljg5MiAxNC42MDQ1IDUuODM2QzE0LjQ1MjUgNS43NzIgMTQuMjkyNSA1LjcyNCAxNC4xMjQ1IDUuNjkyQzEzLjk2NDUgNS42NiAxMy43ODQ1IDUuNjQ0IDEzLjU4NDUgNS42NDRDMTMuMzEyNSA1LjY0NCAxMy4wODA1IDUuNjggMTIuODg4NSA1Ljc1MkMxMi43MDQ1IDUuODI0IDEyLjU1NjUgNS45MiAxMi40NDQ1IDYuMDRDMTIuMzMyNSA2LjE2IDEyLjI0ODUgNi4yOTYgMTIuMTkyNSA2LjQ0OEMxMi4xNDQ1IDYuNiAxMi4xMjA1IDYuNzUyIDEyLjEyMDUgNi45MDRDMTIuMTIwNSA3LjA0OCAxMi4xNTI1IDcuMTkyIDEyLjIxNjUgNy4zMzZDMTIuMjgwNSA3LjQ3MiAxMi4zNzI1IDcuNTkyIDEyLjQ5MjUgNy42OTZDMTIuNjIwNSA3LjggMTIuNzcyNSA3Ljg4NCAxMi45NDg1IDcuOTQ4QzEzLjEyNDUgOC4wMTIgMTMuMzI4NSA4LjA0NCAxMy41NjA1IDguMDQ0QzEzLjcyODUgOC4wNDQgMTMuODg0NSA4LjAyOCAxNC4wMjg1IDcuOTk2QzE0LjE4MDUgNy45NjQgMTQuMzI4NSA3LjkxNiAxNC40NzI1IDcuODUyQzE0LjYyNDUgNy43ODggMTQuNzgwNSA3LjcxMiAxNC45NDA1IDcuNjI0QzE1LjEwODUgNy41MjggMTUuMjk2NSA3LjQyIDE1LjUwNDUgNy4zTDE2LjEyODUgOS4wNTJDMTUuNzY4NSA5LjM1NiAxNS4zNDQ1IDkuNjE2IDE0Ljg1NjUgOS44MzJDMTQuMzY4NSAxMC4wNCAxMy44NDA1IDEwLjE0NCAxMy4yNzI1IDEwLjE0NEMxMi43MzY1IDEwLjE0NCAxMi4yNDg1IDEwLjA4IDExLjgwODUgOS45NTJDMTEuMzc2NSA5LjgxNiAxMS4wMDQ1IDkuNjE2IDEwLjY5MjUgOS4zNTJDMTAuMzg4NSA5LjA4IDEwLjE1MjUgOC43NDQgOS45ODQ0NyA4LjM0NEM5LjgxNjQ3IDcuOTM2IDkuNzMyNDcgNy40NiA5LjczMjQ3IDYuOTE2QzkuNzMyNDcgNi4zNTYgOS44MjQ0NyA1Ljg3MiAxMC4wMDg1IDUuNDY0QzEwLjIwMDUgNS4wNTYgMTAuNDU2NSA0LjcyIDEwLjc3NjUgNC40NTZDMTEuMTA0NSA0LjE4NCAxMS40ODg1IDMuOTg0IDExLjkyODUgMy44NTZDMTIuMzY4NSAzLjcyIDEyLjg0MDUgMy42NTIgMTMuMzQ0NSAzLjY1MkMxNC4zMjA1IDMuNjUyIDE1LjE4NDUgMy45NDQgMTUuOTM2NSA0LjUyOEwxNS41MDQ1IDYuMzI4Wk0yMy4zOTE5IDYuODU2QzIzLjM5MTkgNy40MzIgMjMuMzExOSA3LjkyOCAyMy4xNTE5IDguMzQ0QzIyLjk5MTkgOC43NiAyMi43NTk5IDkuMTA0IDIyLjQ1NTkgOS4zNzZDMjIuMTU5OSA5LjY0IDIxLjc5OTkgOS44MzYgMjEuMzc1OSA5Ljk2NEMyMC45NTk5IDEwLjA4NCAyMC40OTU5IDEwLjE0NCAxOS45ODM5IDEwLjE0NEMxOS40ODc5IDEwLjE0NCAxOS4wMzE5IDEwLjA4IDE4LjYxNTkgOS45NTJDMTguMTk5OSA5LjgxNiAxNy44Mzk5IDkuNjEyIDE3LjUzNTkgOS4zNEMxNy4yMzE5IDkuMDY4IDE2Ljk5MTkgOC43MjggMTYuODE1OSA4LjMyQzE2LjY0NzkgNy45MDQgMTYuNTYzOSA3LjQxNiAxNi41NjM5IDYuODU2QzE2LjU2MzkgNi4yNzIgMTYuNjQ3OSA1Ljc3MiAxNi44MTU5IDUuMzU2QzE2Ljk5MTkgNC45NCAxNy4yMzE5IDQuNiAxNy41MzU5IDQuMzM2QzE3LjgzOTkgNC4wNzIgMTguMTk5OSAzLjg4IDE4LjYxNTkgMy43NkMxOS4wMzE5IDMuNjQgMTkuNDg3OSAzLjU4IDE5Ljk4MzkgMy41OEMyMC40OTU5IDMuNTggMjAuOTU5OSAzLjY0OCAyMS4zNzU5IDMuNzg0QzIxLjc5OTkgMy45MTIgMjIuMTU5OSA0LjExMiAyMi40NTU5IDQuMzg0QzIyLjc1OTkgNC42NDggMjIuOTkxOSA0Ljk4OCAyMy4xNTE5IDUuNDA0QzIzLjMxMTkgNS44MTIgMjMuMzkxOSA2LjI5NiAyMy4zOTE5IDYuODU2Wk0yMS4xMzU5IDYuODQ0QzIxLjEzNTkgNi41MjQgMjEuMDMxOSA2LjI1NiAyMC44MjM5IDYuMDRDMjAuNjIzOSA1LjgyNCAyMC4zNDM5IDUuNzE2IDE5Ljk4MzkgNS43MTZDMTkuNjIzOSA1LjcxNiAxOS4zNDM5IDUuODI0IDE5LjE0MzkgNi4wNEMxOC45NTE5IDYuMjQ4IDE4Ljg1NTkgNi41MTYgMTguODU1OSA2Ljg0NEMxOC44NTU5IDcuMTQ4IDE4Ljk1MTkgNy40MTYgMTkuMTQzOSA3LjY0OEMxOS4zNDM5IDcuODcyIDE5LjYyMzkgNy45ODQgMTkuOTgzOSA3Ljk4NEMyMC4zNDM5IDcuOTg0IDIwLjYyMzkgNy44NzIgMjAuODIzOSA3LjY0OEMyMS4wMzE5IDcuNDI0IDIxLjEzNTkgNy4xNTYgMjEuMTM1OSA2Ljg0NFpNMjguNjk0OCA2LjU4TDI4LjQ3ODggNi41OTJDMjguNDcwOCA2LjQwOCAyOC4zOTA4IDYuMjYgMjguMjM4OCA2LjE0OEMyOC4wODY4IDYuMDM2IDI3LjkyMjggNS45OCAyNy43NDY4IDUuOThDMjcuNTg2OCA1Ljk4IDI3LjQwNjggNi4wMjggMjcuMjA2OCA2LjEyNEMyNy4wMTQ4IDYuMjEyIDI2Ljg0MjggNi4zNDggMjYuNjkwOCA2LjUzMlYxMEgyNC4zMTQ4VjMuNzg0SDI2LjY5MDhWNC4zOTZDMjYuODgyOCA0LjIxMiAyNy4xMDI4IDQuMDQgMjcuMzUwOCAzLjg4QzI3LjYwNjggMy43MiAyNy45MTA4IDMuNjQgMjguMjYyOCAzLjY0QzI4LjMxODggMy42NCAyOC4zODY4IDMuNjQ0IDI4LjQ2NjggMy42NTJDMjguNTQ2OCAzLjY2IDI4LjYyNjggMy42NzIgMjguNzA2OCAzLjY4OEMyOC43ODY4IDMuNzA0IDI4Ljg2MjggMy43MjggMjguOTM0OCAzLjc2QzI5LjAwNjggMy43ODQgMjkuMDYyOCAzLjgxNiAyOS4xMDI4IDMuODU2TDI4LjY5NDggNi41OFpNMzQuMzkyOSAxMFY5LjU1NkMzNC4zMjA5IDkuNjI4IDM0LjIyMDkgOS42OTYgMzQuMDkyOSA5Ljc2QzMzLjk2NDkgOS44MjQgMzMuODI0OSA5Ljg4NCAzMy42NzI5IDkuOTRDMzMuNTIwOSA5Ljk5NiAzMy4zNjg5IDEwLjA0IDMzLjIxNjkgMTAuMDcyQzMzLjA3MjkgMTAuMTA0IDMyLjk0NDkgMTAuMTIgMzIuODMyOSAxMC4xMkMzMi40MjQ5IDEwLjEyIDMyLjAzMjkgMTAuMDU2IDMxLjY1NjkgOS45MjhDMzEuMjgwOSA5Ljc5MiAzMC45NDg5IDkuNTkyIDMwLjY2MDkgOS4zMjhDMzAuMzgwOSA5LjA1NiAzMC4xNTY5IDguNzI0IDI5Ljk4ODkgOC4zMzJDMjkuODIwOSA3LjkzMiAyOS43MzY5IDcuNDY4IDI5LjczNjkgNi45NEMyOS43MzY5IDYuMzggMjkuODE2OSA1Ljg5NiAyOS45NzY5IDUuNDg4QzMwLjE0NDkgNS4wOCAzMC4zNjg5IDQuNzQgMzAuNjQ4OSA0LjQ2OEMzMC45MzY5IDQuMTk2IDMxLjI3MjkgMy45OTYgMzEuNjU2OSAzLjg2OEMzMi4wNDA5IDMuNzMyIDMyLjQ0ODkgMy42NjQgMzIuODgwOSAzLjY2NEMzMi45Njg5IDMuNjY0IDMzLjA4MDkgMy42NzYgMzMuMjE2OSAzLjdDMzMuMzYwOSAzLjcxNiAzMy41MDQ5IDMuNzQ0IDMzLjY0ODkgMy43ODRDMzMuNzkyOSAzLjgxNiAzMy45Mjg5IDMuODYgMzQuMDU2OSAzLjkxNkMzNC4xOTI5IDMuOTcyIDM0LjI5NjkgNC4wMzIgMzQuMzY4OSA0LjA5NlYwLjg1NkgzNi43MDg5VjEwSDM0LjM5MjlaTTM0LjM2ODkgNi4wNjRDMzQuMzA0OSA2LjAxNiAzNC4yMjQ5IDUuOTcyIDM0LjEyODkgNS45MzJDMzQuMDMyOSA1Ljg5MiAzMy45MzI5IDUuODYgMzMuODI4OSA1LjgzNkMzMy43MjQ5IDUuODA0IDMzLjYyMDkgNS43OCAzMy41MTY5IDUuNzY0QzMzLjQxMjkgNS43NDggMzMuMzIwOSA1Ljc0IDMzLjI0MDkgNS43NEMzMy4wODA5IDUuNzQgMzIuOTI0OSA1Ljc2OCAzMi43NzI5IDUuODI0QzMyLjYyODkgNS44OCAzMi41MDA5IDUuOTYgMzIuMzg4OSA2LjA2NEMzMi4yNzY5IDYuMTYgMzIuMTg4OSA2LjI3NiAzMi4xMjQ5IDYuNDEyQzMyLjA2MDkgNi41NDggMzIuMDI4OSA2LjY5MiAzMi4wMjg5IDYuODQ0QzMyLjAyODkgNy4wMDQgMzIuMDYwOSA3LjE1MiAzMi4xMjQ5IDcuMjg4QzMyLjE4ODkgNy40MjQgMzIuMjc2OSA3LjU0NCAzMi4zODg5IDcuNjQ4QzMyLjUwMDkgNy43NDQgMzIuNjI4OSA3LjgyNCAzMi43NzI5IDcuODg4QzMyLjkyNDkgNy45NDQgMzMuMDgwOSA3Ljk3MiAzMy4yNDA5IDcuOTcyQzMzLjMyMDkgNy45NzIgMzMuNDEyOSA3Ljk2IDMzLjUxNjkgNy45MzZDMzMuNjIwOSA3LjkxMiAzMy43MjQ5IDcuODg0IDMzLjgyODkgNy44NTJDMzMuOTMyOSA3LjgxMiAzNC4wMzI5IDcuNzY4IDM0LjEyODkgNy43MkMzNC4yMjQ5IDcuNjY0IDM0LjMwNDkgNy42MDggMzQuMzY4OSA3LjU1MlY2LjA2NFpcIiBmaWxsPVwiY3VycmVudENvbG9yXCIgLz5gO1xyXG4gIHN2Z0VsbS5zZXRBdHRyaWJ1dGUoXCJ2aWV3Qm94XCIsIFwiMCAwIDU1IDExXCIpO1xyXG59KSgpOyIsICJpbXBvcnQgeyB3YWl0VW50aWxDb25uZWN0aW9uT3BlbiB9IGZyb20gXCIuL290aGVyL3V0aWxzLmpzXCI7XHJcbmltcG9ydCBsb2FkaW5nQW5pbWF0aW9uIGZyb20gXCIuL290aGVyL2xvYWRpbmctYW5pbWF0aW9uXCI7XHJcbmltcG9ydCBhcGkgZnJvbSBcIi4vYXBpXCI7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LCBcImFjb3JkXCIsIHtcclxuICBnZXQoKSB7XHJcbiAgICByZXR1cm4gYXBpLmV4cG9zZWRBUEk7XHJcbiAgfVxyXG59KTtcclxud2luZG93Lmdsb2JhbCA9IHdpbmRvdztcclxuXHJcbihhc3luYyAoKSA9PiB7XHJcbiAgbG9hZGluZ0FuaW1hdGlvbi5zaG93KCk7XHJcbiAgYXdhaXQgd2FpdFVudGlsQ29ubmVjdGlvbk9wZW4oKTtcclxuICBsb2FkaW5nQW5pbWF0aW9uLmhpZGUoKTtcclxufSkoKTtcclxuXHJcbi8vIGV4dHJhc1xyXG5pbXBvcnQgXCIuL290aGVyL3dlYnNvY2tldC10cmlnZ2Vycy5qc1wiO1xyXG5pbXBvcnQgXCIuL3VpL2luZGV4LmpzXCI7Il0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQ0EsYUFBTyxlQUFlLFNBQVMsY0FBYyxFQUFFLE9BQU8sS0FBSyxDQUFDO0FBQzVELGNBQVEsVUFBVSxPQUFPLE9BQU87QUFBQSxRQUM1QixLQUFLO0FBQUEsUUFDTCxLQUFLO0FBQUEsUUFDTCxRQUFRO0FBQUEsUUFDUixRQUFRO0FBQUEsTUFDWixDQUFDO0FBQUE7QUFBQTs7O0FDUEQ7QUFBQTtBQUFBO0FBQ0EsVUFBSSxrQkFBbUIsV0FBUSxRQUFLLG1CQUFvQixTQUFVLEtBQUs7QUFDbkUsZUFBUSxPQUFPLElBQUksYUFBYyxNQUFNLEVBQUUsV0FBVyxJQUFJO0FBQUEsTUFDNUQ7QUFDQSxhQUFPLGVBQWUsU0FBUyxjQUFjLEVBQUUsT0FBTyxLQUFLLENBQUM7QUFDNUQsVUFBTSxXQUFXLGdCQUFnQixnQkFBbUI7QUFDcEQsVUFBTSxlQUFOLE1BQW1CO0FBQUEsUUFDZixjQUFjO0FBQ1YsZUFBSyxZQUFZLE9BQU8sT0FBTyxTQUFTLE9BQU8sRUFBRSxPQUFPLENBQUMsS0FBSyxTQUFVLElBQUksR0FBRyxJQUFJLG9CQUFJLElBQUksR0FBSSxNQUFNLENBQUMsQ0FBQztBQUN2RyxlQUFLLEtBQUssU0FBVSxPQUFPLFVBQVU7QUFDakMsZ0JB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QSxNQUFRO0FBQUEsVUFDTixJQUFNO0FBQUEsVUFDTixRQUFVO0FBQUEsVUFDVixNQUFRO0FBQUEsWUFDTixRQUFVO0FBQUEsY0FDUjtBQUFBLGNBQ0E7QUFBQSxjQUNBO0FBQUEsY0FDQTtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLFFBQ0EsU0FBVztBQUFBLFVBQ1QsSUFBTTtBQUFBLFVBQ04sUUFBVTtBQUFBLFlBQ1IsUUFBVTtBQUFBLFlBQ1YsSUFBTTtBQUFBLFlBQ04sSUFBTTtBQUFBLGNBQ0o7QUFBQSxnQkFDRTtBQUFBLGNBQ0Y7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFVBQ0EsTUFBUTtBQUFBLFlBQ04sUUFBVTtBQUFBLGNBQ1I7QUFBQSxjQUNBO0FBQUEsY0FDQTtBQUFBLGNBQ0E7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxRQUNBLFVBQVk7QUFBQSxVQUNWLElBQU07QUFBQSxVQUNOLFFBQVU7QUFBQSxVQUNWLE1BQVE7QUFBQSxZQUNOLE9BQVM7QUFBQSxjQUNQO0FBQUEsY0FDQTtBQUFBLGNBQ0E7QUFBQSxjQUNBO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLE1BQ0EsZ0JBQWtCO0FBQUEsUUFDaEIsSUFBTTtBQUFBLFFBQ04sTUFBUTtBQUFBLFVBQ04sT0FBUztBQUFBLFlBQ1A7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLFFBQ0EsUUFBVTtBQUFBLFVBQ1IsUUFBVTtBQUFBLFVBQ1YsSUFBTTtBQUFBLFVBQ04sSUFBTTtBQUFBLFlBQ0o7QUFBQSxjQUNFO0FBQUEsY0FDQTtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLE9BQVM7QUFBQSxRQUNQLElBQU07QUFBQSxRQUNOLE1BQVE7QUFBQSxVQUNOLE9BQVM7QUFBQSxZQUNQO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsVUFDRjtBQUFB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QSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLGNBQWdCO0FBQUEsUUFDZCxJQUFNO0FBQUEsUUFDTixRQUFVO0FBQUEsVUFDUixRQUFVO0FBQUEsVUFDVixJQUFNO0FBQUEsVUFDTixJQUFNO0FBQUEsWUFDSjtBQUFBLGNBQ0U7QUFBQSxjQUNBO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsUUFDQSxNQUFRO0FBQUEsVUFDTixPQUFTO0FBQUEsWUFDUDtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLE1BQ0EsY0FBZ0I7QUFBQSxRQUNkLElBQU07QUFBQSxRQUNOLFFBQVU7QUFBQSxVQUNSLFFBQVU7QUFBQSxVQUNWLElBQU07QUFBQSxVQUNOLElBQU07QUFBQSxZQUNKO0FBQUEsY0FDRTtBQUFBLGNBQ0E7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxRQUNBLE1BQVE7QUFBQSxVQUNOLE9BQVM7QUFBQSxZQUNQO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsTUFDQSxnQkFBa0I7QUFBQSxRQUNoQixJQUFNO0FBQUEsUUFDTixRQUFVO0FBQUEsVUFDUixRQUFVO0FBQUEsVUFDVixJQUFNO0FBQUEsVUFDTixJQUFNO0FBQUEsWUFDSjtBQUFBLGNBQ0U7QUFBQSxjQUNBO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsUUFDQSxNQUFRO0FBQUEsVUFDTixPQUFTO0FBQUEsWUFDUDtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLE1BQ0EsZ0JBQWtCO0FBQUEsUUFDaEIsSUFBTTtBQUFBLFFBQ04sUUFBVTtBQUFBLFVBQ1IsUUFBVTtBQUFBLFVBQ1YsSUFBTTtBQUFBLFVBQ04sSUFBTTtBQUFBLFlBQ0o7QUFBQSxjQUNFO0FBQUEsY0FDQTtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLFFBQ0EsTUFBUTtBQUFBLFVBQ04sT0FBUztBQUFBLFlBQ1A7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLGNBQWdCO0FBQUEsUUFDZCxJQUFNO0FBQUEsUUFDTixRQUFVO0FBQUEsVUFDUixRQUFVO0FBQUEsVUFDVixJQUFNO0FBQUEsVUFDTixJQUFNO0FBQUEsWUFDSjtBQUFBLGNBQ0U7QUFBQSxjQUNBO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsUUFDQSxNQUFRO0FBQUEsVUFDTixPQUFTO0FBQUEsWUFDUDtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLE1BQ0EsZUFBaUI7QUFBQSxRQUNmLElBQU07QUFBQSxRQUNOLFFBQVU7QUFBQSxVQUNSLFFBQVU7QUFBQSxVQUNWLElBQU07QUFBQSxVQUNOLElBQU07QUFBQSxZQUNKO0FBQUEsY0FDRTtBQUFBLGNBQ0E7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxRQUNBLE1BQVE7QUFBQSxVQUNOLE9BQVM7QUFBQSxZQUNQO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsTUFDQSxjQUFnQjtBQUFBLFFBQ2QsSUFBTTtBQUFBLFFBQ04sUUFBVTtBQUFBLFVBQ1IsUUFBVTtBQUFBLFVBQ1YsSUFBTTtBQUFBLFVBQ04sSUFBTTtBQUFBLFlBQ0o7QUFBQSxjQUNFO0FBQUEsY0FDQTtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLFFBQ0EsTUFBUTtBQUFBLFVBQ04sT0FBUztBQUFBLFlBQ1A7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLGVBQWlCO0FBQUEsUUFDZixJQUFNO0FBQUEsUUFDTixRQUFVO0FBQUEsVUFDUixRQUFVO0FBQUEsVUFDVixJQUFNO0FBQUEsVUFDTixJQUFNO0FBQUEsWUFDSjtBQUFBLGNBQ0U7QUFBQSxjQUNBO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsUUFDQSxNQUFRO0FBQUEsVUFDTixPQUFTO0FBQUEsWUFDUDtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLE1BQ0Esb0JBQXNCO0FBQUEsUUFDcEIsSUFBTTtBQUFBLFFBQ04sUUFBVTtBQUFBLFVBQ1IsUUFBVTtBQUFBLFVBQ1YsSUFBTTtBQUFBLFVBQ04sSUFBTTtBQUFBLFlBQ0o7QUFBQSxjQUNFO0FBQUEsY0FDQTtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLFFBQ0EsTUFBUTtBQUFBLFVBQ04sT0FBUztBQUFBLFlBQ1A7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLE1BQVE7QUFBQSxRQUNOLElBQU07QUFBQSxRQUNOLFFBQVU7QUFBQSxVQUNSLFFBQVU7QUFBQSxVQUNWLElBQU07QUFBQSxVQUNOLElBQU07QUFBQSxZQUNKO0FBQUEsY0FDRTtBQUFBLGNBQ0E7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxRQUNBLE1BQVE7QUFBQSxVQUNOLE9BQVM7QUFBQSxZQUNQO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsTUFDQSxNQUFRO0FBQUEsUUFDTixJQUFNO0FBQUEsUUFDTixRQUFVO0FBQUEsVUFDUixRQUFVO0FBQUEsVUFDVixJQUFNO0FBQUEsVUFDTixJQUFNO0FBQUEsWUFDSjtBQUFBLGNBQ0U7QUFBQSxjQUNBO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsUUFDQSxNQUFRO0FBQUEsVUFDTixPQUFTO0FBQUEsWUFDUDtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLE1BQ0EsTUFBUTtBQUFBLFFBQ04sSUFBTTtBQUFBLFFBQ04sUUFBVTtBQUFBLFVBQ1IsUUFBVTtBQUFBLFVBQ1YsSUFBTTtBQUFBLFVBQ04sSUFBTTtBQUFBLFlBQ0o7QUFBQSxjQUNFO0FBQUEsY0FDQTtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLFFBQ0EsTUFBUTtBQUFBLFVBQ04sT0FBUztBQUFBLFlBQ1A7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjs7O0FDN3hCZSxXQUFSLFdBQ0wsTUFDQSxjQUNBLEVBQUUsV0FBVyxNQUFNLFNBQVMsQ0FBQyxHQUFHLFFBQVEsSUFBSSxJQUFJLENBQUMsR0FDakQ7QUFDQSxRQUFJLFlBQVk7QUFFaEIsYUFBUyxTQUFTRSxPQUFNQyxlQUFjLEVBQUUsVUFBQUMsWUFBVyxNQUFNLFFBQUFDLFVBQVMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHO0FBQzNFLG1CQUFhO0FBQ2IsVUFBSSxZQUFZO0FBQU87QUFFdkIsVUFBSSxPQUFPRixrQkFBaUIsVUFBVTtBQUNwQyxZQUFJRCxNQUFLLGVBQWVDLGFBQVk7QUFBRyxpQkFBT0QsTUFBS0MsYUFBWTtBQUFBLE1BQ2pFLFdBQVdBLGNBQWFELEtBQUk7QUFBRyxlQUFPQTtBQUV0QyxVQUFJLENBQUNBO0FBQU07QUFFWCxVQUFJLE1BQU0sUUFBUUEsS0FBSSxHQUFHO0FBQ3ZCLG1CQUFXLFFBQVFBLE9BQU07QUFDdkIsZ0JBQU1JLFNBQVEsU0FBUyxNQUFNSCxlQUFjLEVBQUUsVUFBQUMsV0FBVSxRQUFBQyxRQUFPLENBQUM7QUFDL0QsY0FBSUM7QUFBTyxtQkFBT0E7QUFBQSxRQUNwQjtBQUFBLE1BQ0YsV0FBVyxPQUFPSixVQUFTLFVBQVU7QUFDbkMsbUJBQVcsT0FBTyxPQUFPLEtBQUtBLEtBQUksR0FBRztBQUNuQyxjQUFJRSxhQUFZLFFBQVEsQ0FBQ0EsVUFBUyxTQUFTLEdBQUc7QUFBRztBQUVqRCxjQUFJQyxRQUFPLFNBQVMsR0FBRztBQUFHO0FBRTFCLGNBQUk7QUFDRixrQkFBTUMsU0FBUSxTQUFTSixNQUFLLEdBQUcsR0FBR0MsZUFBYztBQUFBLGNBQzlDLFVBQUFDO0FBQUEsY0FDQSxRQUFBQztBQUFBLFlBQ0YsQ0FBQztBQUNELGdCQUFJQztBQUFPLHFCQUFPQTtBQUFBLFVBQ3BCLFFBQUU7QUFBQSxVQUFRO0FBQUEsUUFDWjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBRUEsV0FBTyxTQUFTLE1BQU0sY0FBYyxFQUFFLFVBQVUsT0FBTyxDQUFDO0FBQUEsRUFDMUQ7OztBQ3hDQSxXQUFTLE1BQU0sU0FBUyxTQUFTLE1BQU0sT0FBTztBQUM1QyxXQUFPLElBQUksVUFBVSxRQUFRLElBQUk7QUFBQSxNQUMvQixLQUFLO0FBQUEsTUFDTCxxQkFBcUI7QUFBQSxNQUNyQjtBQUFBLE1BQ0EsR0FBRztBQUFBLElBQ0w7QUFBQSxFQUNGO0FBRUEsTUFBTyxpQkFBUTtBQUFBLElBQ2IsS0FBSyxNQUFNLFNBQVMsT0FBTyxTQUFTO0FBQUEsSUFDcEMsT0FBTyxNQUFNLGVBQWUsU0FBUyxTQUFTO0FBQUEsSUFDOUMsTUFBTSxNQUFNLGNBQWMsT0FBTyxTQUFTO0FBQUEsSUFDMUMsTUFBTSxNQUFNLGNBQWMsUUFBUSxTQUFTO0FBQUEsSUFDM0MsT0FBTyxNQUFNLGVBQWUsU0FBUyxTQUFTO0FBQUEsSUFDOUM7QUFBQSxFQUNGOzs7QUNkQSxNQUFPLGdCQUFRO0FBQUEsSUFDYixZQUFZLE1BQU07QUFDaEIsYUFBTyxPQUFPLFFBQVEsSUFBSSxFQUFFLEtBQUssT0FBSyxFQUFFLENBQUMsRUFBRSxXQUFXLHlCQUF5QixLQUFLLEVBQUUsQ0FBQyxFQUFFLFdBQVcsY0FBYyxDQUFDLElBQUksQ0FBQztBQUFBLElBQzFIO0FBQUEsSUFDQSxpQkFBaUIsTUFBTTtBQUNyQixVQUFJLFdBQVcsS0FBSyxZQUFZLElBQUk7QUFDcEMsZUFBUyxLQUFLLFVBQVUsSUFBSSxLQUFLLEdBQUc7QUFDbEMsWUFBSSxHQUFHLFdBQVc7QUFBYSxpQkFBTyxHQUFHO0FBQUEsSUFDN0M7QUFBQSxJQUNBLFdBQVcsTUFBTSxRQUFRO0FBQ3ZCLGFBQU8sV0FBVyxNQUFNLFFBQVE7QUFBQSxRQUM5QixVQUFVLENBQUMsU0FBUyxTQUFTLFlBQVksUUFBUTtBQUFBLE1BQ25ELENBQUM7QUFBQSxJQUNIO0FBQUEsSUFDQSxjQUFjLE1BQU07QUFDbEIsWUFBTSxXQUFXLEtBQUssWUFBWSxJQUFJO0FBQ3RDLFlBQU1DLGNBQWEsQ0FBQztBQUNwQixVQUFJLGVBQWU7QUFDbkIsYUFBTyxnQkFBZ0IsYUFBYSxRQUFRO0FBQzFDLFlBQUksT0FBTyxhQUFhLE9BQU8sU0FBUztBQUFVO0FBQ2xELFlBQUksYUFBYSxPQUFPO0FBQU0sVUFBQUEsWUFBVyxLQUFLLGFBQWEsT0FBTyxJQUFJO0FBQ3RFLHVCQUFlLGFBQWE7QUFBQSxNQUM5QjtBQUNBLGFBQU9BO0FBQUEsSUFDVDtBQUFBLElBQ0EsY0FBYyxNQUFNO0FBQ2xCLFlBQU0sV0FBVyxLQUFLLFlBQVksSUFBSTtBQUN0QyxZQUFNLGFBQWEsQ0FBQztBQUNwQixVQUFJLGVBQWU7QUFDbkIsYUFBTyxnQkFBZ0IsYUFBYSxRQUFRO0FBQzFDLFlBQUksYUFBYSxPQUFPLHFCQUFxQjtBQUFhO0FBQzFELFlBQUksYUFBYSxPQUFPO0FBQ3RCLHFCQUFXLEtBQUssYUFBYSxPQUFPLFNBQVM7QUFDL0MsdUJBQWUsYUFBYTtBQUFBLE1BQzlCO0FBQ0EsYUFBTztBQUFBLElBQ1Q7QUFBQSxJQUNBLFNBQVMsSUFBSSxTQUFTLENBQUMsTUFBTSxHQUFHLE1BQU0sS0FBTztBQUMzQyxZQUFNLFdBQVcsS0FBSyxZQUFZLEVBQUU7QUFFcEMsVUFBSSxDQUFDLFVBQVU7QUFBUSxlQUFPO0FBRTlCLGVBQ00sVUFBVSxVQUFVLFFBQVEsSUFBSSxHQUNwQyxJQUFJLE9BQU8sWUFBWSxNQUN2QixVQUFVLFNBQVMsUUFBUSxLQUMzQjtBQUNBLFlBQUksU0FBUyxnQkFBZ0IsT0FBTyxRQUFRLFlBQVk7QUFDdEQsaUJBQU8sUUFBUTtBQUFBLE1BQ25CO0FBRUEsYUFBTztBQUFBLElBQ1Q7QUFBQSxFQUNGOzs7QUNuREEsTUFBTyxnQkFBUTtBQUFBLElBQ2I7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0EsT0FBTyxRQUFRLE1BQU07QUFDbkIsYUFBTyxHQUFHLE1BQU0sV0FBVyxZQUFZLENBQUNDLElBQUcsUUFBUTtBQUNqRCxlQUFPLEtBQUssT0FBTyxHQUFHLENBQUM7QUFBQSxNQUN6QixDQUFDO0FBQUEsSUFDSDtBQUFBLElBQ0EsU0FBUyxJQUFJLEtBQUs7QUFDaEIsVUFBSSxXQUFXLFlBQVksSUFBSSxHQUFHO0FBQ2xDLGFBQU8sTUFBTTtBQUNYLHNCQUFjLFFBQVE7QUFBQSxNQUN4QjtBQUFBLElBQ0Y7QUFBQSxJQUNBLFFBQVEsSUFBSSxLQUFLO0FBQ2YsVUFBSSxVQUFVLFdBQVcsSUFBSSxHQUFHO0FBQ2hDLGFBQU8sTUFBTTtBQUNYLHFCQUFhLE9BQU87QUFBQSxNQUN0QjtBQUFBLElBQ0Y7QUFBQSxJQUNBLFNBQVMsS0FBSyxJQUFJO0FBQ2hCLFVBQUk7QUFBSyxXQUFHLEdBQUc7QUFBQSxJQUNqQjtBQUFBLElBQ0EsU0FBUyxNQUFNO0FBQ2IsVUFBSSxPQUFPLGVBQWU7QUFDeEIsc0JBQWMsVUFBVSxLQUFLLElBQUk7QUFDakM7QUFBQSxNQUNGO0FBRUEsZ0JBQVUsVUFBVSxVQUFVLElBQUksRUFBRSxNQUFNLE1BQU07QUFDOUMsY0FBTSxXQUFXLFNBQVMsY0FBYyxVQUFVO0FBRWxELGlCQUFTLE1BQU0sYUFBYTtBQUM1QixpQkFBUyxNQUFNLFdBQVc7QUFDMUIsaUJBQVMsTUFBTSxNQUFNO0FBQ3JCLGlCQUFTLE1BQU0sT0FBTztBQUV0QixpQkFBUyxLQUFLLFlBQVksUUFBUTtBQUNsQyxpQkFBUyxNQUFNO0FBQ2YsaUJBQVMsT0FBTztBQUVoQixZQUFJO0FBQ0YsbUJBQVMsWUFBWSxNQUFNO0FBQUEsUUFDN0IsU0FBUyxLQUFQO0FBQ0Esa0JBQVEsTUFBTSxHQUFHO0FBQUEsUUFDbkI7QUFFQSxpQkFBUyxLQUFLLFlBQVksUUFBUTtBQUFBLE1BQ3BDLENBQUM7QUFBQSxJQUNIO0FBQUEsSUFDQSxNQUFNLElBQUk7QUFDUixhQUFPLElBQUksUUFBUSxDQUFDLFlBQVksV0FBVyxTQUFTLEVBQUUsQ0FBQztBQUFBLElBQ3pEO0FBQUEsSUFDQSxXQUFXLE1BQU0sTUFBTSxDQUFDLEdBQUc7QUFDekIsY0FBUSxNQUFNLFFBQVEsR0FBRyxJQUFJLE1BQU0sT0FBTyxRQUFRLEdBQUcsR0FBRyxPQUFPLENBQUMsS0FBSyxZQUFZLElBQUksV0FBVyxRQUFRLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxHQUFHLElBQUk7QUFBQSxJQUMvSDtBQUFBLElBQ0EsWUFBWSxLQUFLO0FBQ2YsYUFBTyxJQUNKLFFBQVEsdUJBQXVCLE1BQU0sRUFDckMsUUFBUSxNQUFNLE9BQU87QUFBQSxJQUMxQjtBQUFBLEVBQ0Y7OztBQy9ETyxXQUFTLFdBQVcsUUFBUTtBQUNqQyxXQUFPLElBQUksU0FBUztBQUNsQixVQUFJO0FBQ0YsWUFBSSxLQUFLLENBQUMsR0FBRyxZQUFZLEtBQUssQ0FBQyxHQUFHO0FBQVEsaUJBQU87QUFDakQsWUFBSSxLQUFLLENBQUMsR0FBRyxTQUFTLFVBQVUsS0FBSyxDQUFDLEdBQUcsU0FBUyxPQUFPLEtBQUssQ0FBQyxHQUFHLFNBQVMsU0FBUyxLQUFLLENBQUMsR0FBRyxTQUFTLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxTQUFTO0FBQU0saUJBQU87QUFDN0ksWUFBSSxLQUFLLENBQUMsRUFBRSxVQUFVLEtBQUssQ0FBQyxFQUFFLE9BQU8sS0FBSyxDQUFDLEVBQUUsU0FBUyxLQUFLLENBQUMsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7QUFBTSxpQkFBTztBQUMzRixZQUFJLEtBQUssQ0FBQyxHQUFHLFNBQVMsWUFBWSxLQUFLLENBQUMsR0FBRyxTQUFTLFlBQVksS0FBSyxDQUFDLEdBQUcsU0FBUztBQUFXLGlCQUFPO0FBQ3BHLFlBQUksS0FBSyxDQUFDLEdBQUcsWUFBWSxLQUFLLENBQUMsR0FBRyxZQUFZLEtBQUssQ0FBQyxHQUFHO0FBQVcsaUJBQU87QUFDekUsZUFBTyxPQUFPLEdBQUcsSUFBSTtBQUFBLE1BQ3ZCLFNBQ08sS0FBUDtBQUNFLHVCQUFPLEtBQUsscUNBQXFDLFFBQVEsR0FBRztBQUM1RCxlQUFPO0FBQUEsTUFDVDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBRUEsV0FBUyxtQkFBbUIsR0FBRyxTQUFTLFFBQVE7QUFDOUMsVUFBTUMsU0FBUSxDQUFDLElBQUksT0FBTztBQUN4QixhQUFPLFNBQVMsR0FBRyxTQUFTLEVBQUUsUUFBUSxHQUFHLFNBQVMsQ0FBQyxLQUFLLEtBQUssR0FBRyxTQUFTLEVBQUUsUUFBUSxHQUFHLFNBQVMsQ0FBQyxJQUFJO0FBQUEsSUFDdEc7QUFDQSxXQUFPLFFBQVEsTUFBTSxPQUFLO0FBQ3hCLGFBQU9BLE9BQU0sR0FBRyxXQUFXLEtBQUssSUFBSSxDQUFDLEtBQ2hDQSxPQUFNLEdBQUcsY0FBYyxXQUFXLEtBQUssSUFBSSxDQUFDLEtBQzVDQSxPQUFNLEdBQUcsTUFBTSxXQUFXLEtBQUssSUFBSSxDQUFDLEtBQ3BDQSxPQUFNLEdBQUcsTUFBTSxjQUFjLFdBQVcsS0FBSyxJQUFJLENBQUMsS0FDbEQsT0FBTyxRQUFRLENBQUMsWUFBWSxRQUFRLEVBQUUsU0FBUyxPQUFPLEdBQUcsU0FBUyxJQUFJLE9BQU8sR0FBRyxZQUFZLENBQUMsQ0FBQyxFQUFFLE9BQU8sT0FBSyxFQUFFLENBQUMsR0FBRyxXQUFXLFFBQVEsQ0FBQyxFQUFFLEtBQUssT0FBS0EsT0FBTSxFQUFFLENBQUMsR0FBRyxXQUFXLEtBQUssSUFBSSxDQUFDLENBQUM7QUFBQSxJQUMzTCxDQUFDO0FBQUEsRUFDSDtBQUNBLFdBQVMsaUJBQWlCLEdBQUcsWUFBWSxRQUFRO0FBQy9DLFdBQU8sV0FBVyxNQUFNLFVBQVE7QUFDOUIsWUFBTSxRQUFRLEVBQUUsSUFBSSxHQUFHLGdCQUFnQixFQUFFLElBQUk7QUFDN0MsYUFBTyxTQUFTLFVBQVUsU0FBYSxVQUFVLFVBQWEsRUFBRSxPQUFPLFNBQVMsWUFBWSxDQUFDO0FBQUEsSUFDL0YsQ0FBQztBQUFBLEVBQ0g7QUFDQSxXQUFTLHNCQUFzQixHQUFHLFlBQVksUUFBUTtBQUNwRCxXQUFPLEVBQUUsYUFBYSxXQUFXLE1BQU0sVUFBUTtBQUM3QyxZQUFNLFFBQVEsRUFBRSxVQUFVLElBQUk7QUFDOUIsYUFBTyxTQUFTLFVBQVUsU0FBYSxVQUFVLFVBQWEsRUFBRSxPQUFPLFNBQVMsWUFBWSxDQUFDO0FBQUEsSUFDL0YsQ0FBQztBQUFBLEVBQ0g7QUFFQSxNQUFNLG1CQUFtQjtBQUN6QixNQUFNLGdCQUFnQixvQkFBSSxJQUFJO0FBRzlCO0FBR0UsUUFBUyxhQUFULFNBQW9CLE9BQU87QUFDekIsWUFBTSxDQUFDLEVBQUVDLFFBQU8sSUFBSTtBQUVwQixpQkFBVyxZQUFZLE9BQU8sS0FBS0EsWUFBVyxDQUFDLENBQUMsR0FBRztBQUNqRCxjQUFNLFdBQVdBLFNBQVEsUUFBUTtBQUVqQyxRQUFBQSxTQUFRLFFBQVEsSUFBSSxDQUFDLFFBQVEsU0FBU0MsYUFBWTtBQUNoRCxjQUFJO0FBQ0YscUJBQVMsS0FBSyxNQUFNLFFBQVEsU0FBU0EsUUFBTztBQUU1QywwQkFBYyxRQUFRLGNBQVk7QUFDaEMsa0JBQUk7QUFDRix5QkFBUyxPQUFPO0FBQUEsY0FDbEIsU0FBUyxPQUFQO0FBQ0EsOEJBQU0sT0FBTyxNQUFNLHFDQUFxQyxVQUFVLEtBQUs7QUFBQSxjQUN6RTtBQUFBLFlBQ0YsQ0FBQztBQUFBLFVBQ0gsU0FBUyxPQUFQO0FBQ0EsMEJBQU0sT0FBTyxNQUFNLGtDQUFrQyxLQUFLO0FBQUEsVUFDNUQ7QUFBQSxRQUNGO0FBRUEsZUFBTyxPQUFPRCxTQUFRLFFBQVEsR0FBRyxVQUFVO0FBQUEsVUFDekMsY0FBYztBQUFBLFVBQ2QsVUFBVSxNQUFNLFNBQVMsU0FBUztBQUFBLFFBQ3BDLENBQUM7QUFBQSxNQUNIO0FBRUEsYUFBTyxPQUFPLEtBQUssT0FBTyxnQkFBZ0IsR0FBRyxLQUFLO0FBQUEsSUFDcEQ7QUEvQkEsUUFBSSxTQUFTLE9BQU8sZ0JBQWdCLEVBQUU7QUFpQ3RDLFdBQU8sZUFBZSxPQUFPLGdCQUFnQixHQUFHLFFBQVE7QUFBQSxNQUN0RCxjQUFjO0FBQUEsTUFDZCxNQUFNO0FBQUUsZUFBTztBQUFBLE1BQVk7QUFBQSxNQUMzQixJQUFJLE9BQU87QUFDVCxpQkFBUztBQUVULGVBQU8sZUFBZSxPQUFPLEtBQUssU0FBUyxHQUFHLFFBQVE7QUFBQSxVQUNwRCxPQUFPLEtBQUs7QUFBQSxVQUNaLGNBQWM7QUFBQSxVQUNkLFVBQVU7QUFBQSxRQUNaLENBQUM7QUFBQSxNQUNIO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDtBQVVBLGlCQUFzQixTQUFTLFFBQVEsRUFBRSxTQUFTLE1BQU0sZ0JBQWdCLE1BQU0sR0FBRztBQUMvRSxXQUFPLElBQUksUUFBUSxDQUFDLFNBQVMsV0FBVztBQUN0QyxZQUFNLFNBQVMsTUFBTSxjQUFjLE9BQU8sUUFBUTtBQUNsRCxZQUFNLFdBQVcsQ0FBQyxZQUFZO0FBQzVCLFlBQUksQ0FBQyxXQUFXLFlBQVksVUFBVSxZQUFZLFNBQVM7QUFBaUI7QUFFNUUsWUFBSUUsU0FBUTtBQUVaLFlBQUksT0FBTyxXQUFXLFlBQVksZUFBZTtBQUMvQyxxQkFBVyxPQUFPLFNBQVM7QUFDekIsZ0JBQUksV0FBVyxRQUFRLEdBQUc7QUFDMUIsZ0JBQUksQ0FBQztBQUFVO0FBQ2YsZ0JBQUksT0FBTyxRQUFRLEdBQUc7QUFDcEIsY0FBQUEsU0FBUTtBQUNSO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxRQUNGLE9BQU87QUFDTCxjQUFJLFFBQVE7QUFBQSxZQUNWO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFVBQ0Y7QUFDQSxVQUFBQSxTQUFRLE1BQU0sSUFBSSxPQUFLO0FBQ3JCLGdCQUFJLFNBQVMsQ0FBQyxJQUFJLFVBQVUsRUFBRSxJQUFJLFNBQVMsQ0FBQztBQUM1QyxnQkFBSSxVQUFVLE9BQU8sTUFBTTtBQUFHLHFCQUFPO0FBQUEsVUFDdkMsQ0FBQyxFQUFFLEtBQUssT0FBSyxDQUFDO0FBQUEsUUFDaEI7QUFFQSxZQUFJLENBQUNBO0FBQU87QUFDWixlQUFPO0FBQ1AsZ0JBQVFBLE1BQUs7QUFBQSxNQUNmO0FBRUEsb0JBQWMsSUFBSSxRQUFRO0FBRTFCLGNBQVEsaUJBQWlCLFNBQVMsTUFBTTtBQUN0QyxlQUFPO0FBQ1AsZ0JBQVEsSUFBSTtBQUFBLE1BQ2QsQ0FBQztBQUFBLElBQ0gsQ0FBQztBQUFBLEVBQ0g7QUFFTyxXQUFTLEtBQUssS0FBSyxRQUFRLFNBQVMsQ0FBQyxHQUFHO0FBQzdDLFFBQUksZ0JBQWdCLE9BQU8sT0FBTyxpQkFBaUIsWUFBWSxRQUFRLE9BQU87QUFDOUUsUUFBSSxXQUFXLE9BQU8sT0FBTyxZQUFZLFlBQVksUUFBUSxPQUFPO0FBQ3BFLFFBQUksTUFBTSxPQUFPLE9BQU8sT0FBTyxZQUFZLFFBQVEsT0FBTztBQUMxRCxVQUFNQSxTQUFRLENBQUM7QUFDZixRQUFJLENBQUM7QUFBVSxlQUFTLEtBQUssSUFBSTtBQUFHLFlBQUksSUFBSSxFQUFFLGVBQWUsQ0FBQyxHQUFHO0FBQy9ELGNBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQyxFQUFFLFNBQVMsSUFBSTtBQUM5QixjQUFJLE1BQU0sT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLGFBQWE7QUFDekQsZ0JBQUksQ0FBQyxFQUFFLElBQUksT0FBTyxHQUFHLENBQUMsSUFBSTtBQUN4QixrQkFBSTtBQUFLLGdCQUFBQSxPQUFNLEtBQUssZ0JBQWdCLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQztBQUFBO0FBQzNDLHVCQUFPLGdCQUFnQixJQUFJLElBQUksRUFBRSxDQUFDO0FBQUEsWUFDekM7QUFDSyx1QkFBUyxPQUFPLE9BQU8sS0FBSyxDQUFDO0FBQUcsb0JBQUksSUFBSSxTQUFTLEtBQUssRUFBRSxHQUFHLEtBQUssQ0FBQyxFQUFFLElBQUksT0FBTyxFQUFFLEdBQUcsR0FBRyxDQUFDLElBQUk7QUFDOUYsc0JBQUk7QUFBSyxvQkFBQUEsT0FBTSxLQUFLLGdCQUFnQixJQUFJLElBQUksRUFBRSxDQUFDLENBQUM7QUFBQTtBQUMzQywyQkFBTyxnQkFBZ0IsSUFBSSxJQUFJLEVBQUUsQ0FBQztBQUFBLGdCQUN6QztBQUFBLFVBQ0Y7QUFDQSxjQUFJLEtBQUssRUFBRSxjQUFjLEVBQUUsWUFBWSxPQUFPLEVBQUUsV0FBVyxZQUFZLE9BQU8sRUFBRSxXQUFXLGFBQWE7QUFDdEcsZ0JBQUksQ0FBQyxFQUFFLElBQUksT0FBTyxFQUFFLFNBQVMsQ0FBQyxJQUFJO0FBQ2hDLGtCQUFJO0FBQUssZ0JBQUFBLE9BQU0sS0FBSyxnQkFBZ0IsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQUE7QUFDM0MsdUJBQU8sZ0JBQWdCLElBQUksSUFBSSxFQUFFLENBQUM7QUFBQSxZQUN6QyxXQUNTLEVBQUUsUUFBUSxTQUFTLE9BQU8sRUFBRSxRQUFRLFFBQVEsWUFBWSxPQUFPLEVBQUUsUUFBUSxRQUFRLGVBQWUsQ0FBQyxFQUFFLElBQUksT0FBTyxFQUFFLFFBQVEsTUFBTSxDQUFDLElBQUk7QUFDMUksa0JBQUk7QUFBSyxnQkFBQUEsT0FBTSxLQUFLLGdCQUFnQixJQUFJLElBQUksRUFBRSxDQUFDLENBQUM7QUFBQTtBQUMzQyx1QkFBTyxnQkFBZ0IsSUFBSSxJQUFJLEVBQUUsQ0FBQztBQUFBLFlBQ3pDO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQTtBQUNBLGFBQVMsS0FBSyxJQUFJO0FBQUcsVUFBSSxJQUFJLEVBQUUsZUFBZSxDQUFDLEdBQUc7QUFDaEQsWUFBSSxJQUFJLElBQUksRUFBRSxDQUFDO0FBQ2YsWUFBSSxLQUFLLE9BQU8sS0FBSyxZQUFZO0FBQy9CLGNBQUksSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLFlBQVksT0FBTyxHQUFHLENBQUMsR0FBRztBQUN6QyxnQkFBSTtBQUFLLGNBQUFBLE9BQU0sS0FBSyxnQkFBZ0IsSUFBSSxFQUFFLENBQUMsRUFBRSxVQUFVLElBQUksRUFBRSxDQUFDLENBQUM7QUFBQTtBQUMxRCxxQkFBTyxnQkFBZ0IsSUFBSSxFQUFFLENBQUMsRUFBRSxVQUFVLElBQUksRUFBRSxDQUFDO0FBQUEsVUFDeEQ7QUFDQSxjQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxZQUFZLE9BQU8sR0FBRyxDQUFDLEdBQUc7QUFDekMsa0JBQU0sV0FBVyxDQUFDLEdBQUcsWUFBWSxDQUFDO0FBQ2xDLGNBQUUsVUFBVSxXQUFXLEdBQUc7QUFDMUIsa0JBQU0sZUFBZSxhQUFhLE9BQU8sb0JBQW9CLGFBQWEsQ0FBQyxDQUFDLEVBQUUsVUFBVSxJQUFJLFdBQVc7QUFDdkcsZ0JBQUk7QUFBSyxjQUFBQSxPQUFNLEtBQUssZ0JBQWdCLGFBQWEsVUFBVSxZQUFZO0FBQUE7QUFDbEUscUJBQU8sZ0JBQWdCLGFBQWEsVUFBVTtBQUFBLFVBQ3JEO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFDQSxRQUFJO0FBQUssYUFBT0E7QUFBQSxFQUNsQjtBQUdBLFdBQVMsbUJBQW1CLFNBQVMsU0FBUztBQUM1QyxXQUFRLFFBQVEsS0FBSyxPQUFLO0FBQ3hCLFVBQUksYUFBYSxPQUFPLEVBQUUsQ0FBQyxLQUFLLGFBQWMsRUFBRSxDQUFDLEdBQUcsY0FBYyxXQUFXLEtBQUssRUFBRSxDQUFDLEdBQUcsV0FBVyxLQUFLLE1BQU8sTUFBTTtBQUFFLFlBQUk7QUFBRSxpQkFBTyxLQUFLLFVBQVUsRUFBRSxDQUFDLENBQUM7QUFBQSxRQUFFLFNBQVMsS0FBUDtBQUFjLGlCQUFPLEVBQUUsQ0FBQyxFQUFFLFNBQVM7QUFBQSxRQUFFO0FBQUEsTUFBRSxHQUFHO0FBQ3JNLFVBQUksbUJBQW1CLEVBQUUsQ0FBQyxHQUFHLFFBQVEsY0FBYyxXQUFXLEtBQUssRUFBRSxDQUFDLEdBQUcsUUFBUSxXQUFXLEtBQUs7QUFDakcsYUFBTyxRQUFRLE1BQU0sWUFBVSxXQUFXLFFBQVEsTUFBTSxLQUFLLE1BQU0saUJBQWlCLFFBQVEsTUFBTSxLQUFLLEVBQUU7QUFBQSxJQUMzRyxDQUFDO0FBQUEsRUFDSDtBQUVPLFdBQVMsZUFBZSxRQUFRO0FBQ3JDLFFBQUksUUFBUSxNQUFNO0FBQ2xCLFFBQUksT0FBTyxRQUFRLFdBQVcsVUFBVTtBQUN0QyxjQUFRLFdBQVcsS0FBSyx5QkFBeUIsT0FBTyx1Q0FBdUMsQ0FBQztBQUFBLElBQ2xHLFdBQVcsT0FBTyxRQUFRLFdBQVcsWUFBWTtBQUMvQyxjQUFRLFdBQVcsT0FBTyxNQUFNO0FBQUEsSUFDbEMsT0FBTztBQUNMLGNBQVEsT0FBTyxPQUFPLElBQUk7QUFBQSxRQUN4QixLQUFLLGNBQWM7QUFDakIsY0FBSSxPQUFPLE9BQU8sS0FBSyxDQUFDLEdBQUcsUUFBUTtBQUNqQyxvQkFBUSxXQUFXLENBQUMsTUFBTSxpQkFBaUIsR0FBRyxPQUFPLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssaUJBQWlCLEdBQUcsT0FBTyxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUM7QUFBQSxVQUN0SSxPQUFPO0FBQ0wsb0JBQVEsV0FBVyxDQUFDLE1BQU0saUJBQWlCLEdBQUcsT0FBTyxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0FBQUEsVUFDNUU7QUFDQTtBQUFBLFFBQ0Y7QUFBQSxRQUNBLEtBQUssY0FBYztBQUNqQixjQUFJLE9BQU8sT0FBTyxLQUFLLENBQUMsR0FBRyxRQUFRO0FBQ2pDLG9CQUFRLFdBQVcsQ0FBQyxNQUFNLHNCQUFzQixHQUFHLE9BQU8sT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxzQkFBc0IsR0FBRyxPQUFPLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQztBQUFBLFVBQ2hKLE9BQU87QUFDTCxvQkFBUSxXQUFXLENBQUMsTUFBTSxzQkFBc0IsR0FBRyxPQUFPLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFBQSxVQUNqRjtBQUNBO0FBQUEsUUFDRjtBQUFBLFFBQ0EsS0FBSyxXQUFXO0FBQ2QsY0FBSSxPQUFPLE9BQU8sS0FBSyxDQUFDLEdBQUcsUUFBUTtBQUNqQyxvQkFBUSxXQUFXLENBQUMsTUFBTSxtQkFBbUIsR0FBRyxPQUFPLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssbUJBQW1CLEdBQUcsT0FBTyxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUM7QUFBQSxVQUMxSSxPQUFPO0FBQ0wsb0JBQVEsV0FBVyxDQUFDLE1BQU0sbUJBQW1CLEdBQUcsT0FBTyxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0FBQUEsVUFDOUU7QUFDQTtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUNBLFdBQU87QUFBQSxFQUNUO0FBRU8sV0FBUyxVQUFVLGNBQWMsS0FBSztBQUMzQyxRQUFJLGFBQWEsQ0FBQztBQUVsQixRQUFJLE9BQU87QUFBQSxNQUNUO0FBQUEsTUFDQTtBQUFBLE1BQ0EsR0FBRztBQUFBLElBQ0w7QUFFQSxXQUFPLFFBQVEsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEtBQUssT0FBTyxNQUFNO0FBQzlDLGFBQU8sZUFBZSxNQUFNLEtBQUs7QUFBQSxRQUMvQixNQUFNO0FBQ0osY0FBSSxXQUFXLEdBQUc7QUFBRyxtQkFBTyxhQUFhLFdBQVcsR0FBRyxDQUFDO0FBRXhELGNBQUksWUFBWSxtQkFBbUIsT0FBTyxRQUFRLGdCQUFnQixDQUFDLENBQUMsR0FBRyxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUM7QUFDckYsY0FBSSxDQUFDLFdBQVc7QUFBUTtBQUV4QixxQkFBVyxHQUFHLElBQUksVUFBVSxDQUFDO0FBQzdCLGlCQUFPLFVBQVUsQ0FBQztBQUFBLFFBQ3BCO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSCxDQUFDO0FBRUQsV0FBTztBQUFBLEVBQ1Q7QUFFTyxXQUFTLGFBQWEsS0FBS0MsVUFBUyxDQUFDLEdBQUc7QUFDN0MsVUFBTSxnQkFBZ0IsQ0FBQyxDQUFDQSxTQUFRLFFBQVE7QUFDeEMsUUFBSUMsU0FBUSxLQUFLLEtBQUssZUFBZUQsT0FBTSxHQUFHLEVBQUUsZUFBZSxLQUFLLEtBQUssQ0FBQyxFQUFFLEtBQUssT0FBSyxNQUFNLFdBQVcsVUFBVSxHQUFHLFlBQVksV0FBVyxNQUFNO0FBRWpKLFFBQUksQ0FBQ0M7QUFBTyxhQUFPO0FBRW5CLFFBQUlELFFBQU8sTUFBTTtBQUFRLE1BQUFDLFVBQVMsTUFBTSxRQUFRRCxRQUFPLEtBQUssTUFBTSxJQUFJQSxRQUFPLEtBQUssT0FBTyxJQUFJLE9BQUssRUFBRSxJQUFJQyxRQUFPLENBQUMsQ0FBQyxFQUFFLEtBQUssT0FBSyxDQUFDLElBQUksRUFBRSxJQUFJQSxRQUFPRCxRQUFPLEtBQUssTUFBTSxNQUFNQztBQUN2SyxRQUFJRCxRQUFPO0FBQVEsTUFBQUMsU0FBUSxPQUFPLE9BQU8sQ0FBQyxHQUFHQSxNQUFLO0FBRWxELFFBQUksQ0FBQ0E7QUFBTyxhQUFPO0FBRW5CLFFBQUlELFFBQU87QUFBSyxNQUFBQyxTQUFRLFVBQVVBLFFBQU9ELFFBQU8sR0FBRztBQUVuRCxRQUFJQSxRQUFPLE1BQU07QUFBTyxNQUFBQyxVQUFTLE1BQU0sUUFBUUQsUUFBTyxLQUFLLEtBQUssSUFBSUEsUUFBTyxLQUFLLE1BQU0sSUFBSSxPQUFLLEVBQUUsSUFBSUMsUUFBTyxDQUFDLENBQUMsRUFBRSxLQUFLLE9BQUssQ0FBQyxJQUFJLEVBQUUsSUFBSUEsUUFBT0QsUUFBTyxLQUFLLEtBQUssTUFBTUM7QUFFbkssV0FBT0E7QUFBQSxFQUNUO0FBSUEsaUJBQXNCLGlCQUFpQkQsVUFBUyxDQUFDLEdBQUc7QUFDbEQsUUFBSUMsU0FBUSxNQUFNLFNBQVMsZUFBZUQsT0FBTSxHQUFHLEVBQUUsZUFBZSxNQUFNLENBQUM7QUFFM0UsUUFBSSxDQUFDQztBQUFPLGFBQU87QUFFbkIsUUFBSUQsUUFBTyxNQUFNO0FBQVEsTUFBQUMsVUFBUyxNQUFNLFFBQVFELFFBQU8sS0FBSyxNQUFNLElBQUlBLFFBQU8sS0FBSyxPQUFPLElBQUksT0FBSyxFQUFFLElBQUlDLFFBQU8sQ0FBQyxDQUFDLEVBQUUsS0FBSyxPQUFLLENBQUMsSUFBSSxFQUFFLElBQUlBLFFBQU9ELFFBQU8sS0FBSyxNQUFNLE1BQU1DO0FBQ3ZLLFFBQUlELFFBQU87QUFBUSxNQUFBQyxTQUFRLE9BQU8sT0FBTyxDQUFDLEdBQUdBLE1BQUs7QUFFbEQsUUFBSSxDQUFDQTtBQUFPLGFBQU87QUFFbkIsUUFBSUQsUUFBTztBQUFLLE1BQUFDLFNBQVEsVUFBVUEsUUFBT0QsUUFBTyxHQUFHO0FBRW5ELFFBQUlBLFFBQU8sTUFBTTtBQUFPLE1BQUFDLFVBQVMsTUFBTSxRQUFRRCxRQUFPLEtBQUssS0FBSyxJQUFJQSxRQUFPLEtBQUssTUFBTSxJQUFJLE9BQUssRUFBRSxJQUFJQyxRQUFPLENBQUMsQ0FBQyxFQUFFLEtBQUssT0FBSyxDQUFDLElBQUksRUFBRSxJQUFJQSxRQUFPRCxRQUFPLEtBQUssS0FBSyxNQUFNQztBQUVuSyxXQUFPQTtBQUFBLEVBQ1Q7OztBQy9TQSxNQUFNLGdCQUFnQjtBQUFBLElBQ3BCO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRjtBQUVBLE1BQU8sa0JBQVE7QUFBQSxJQUNiLFdBQVcsQ0FBQztBQUFBLElBQ1osSUFBSSxVQUFVO0FBQ1osVUFBSSxLQUFLLFVBQVU7QUFBUyxlQUFPLEtBQUssVUFBVTtBQUNsRCxVQUFJLFFBQVEsc0JBQXNCLEtBQUssSUFBSTtBQUMzQyxZQUFNLE1BQU0sT0FBTyx3QkFBd0IsS0FBSyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsR0FBRyxDQUFBQyxTQUFPQSxJQUFHLENBQUM7QUFDekUsYUFBTyxJQUFJLEVBQUUsS0FBSztBQUNsQixhQUFPLElBQUksRUFBRSxLQUFLO0FBQ2xCLGFBQU8sd0JBQXdCLElBQUk7QUFDbkMsV0FBSyxVQUFVLFVBQVU7QUFDekIsYUFBTztBQUFBLElBQ1Q7QUFBQSxJQUNBLEtBQUssUUFBUSxTQUFTLENBQUMsR0FBRztBQUN4QixhQUFxQixLQUFLLEtBQUssU0FBdUIsV0FBVyxNQUFNLEdBQUcsTUFBTTtBQUFBLElBQ2xGO0FBQUEsSUFDQSxTQUFTLFFBQVEsU0FBUyxDQUFDLEdBQUc7QUFDNUIsYUFBcUIsU0FBdUIsV0FBVyxNQUFNLEdBQUcsTUFBTTtBQUFBLElBQ3hFO0FBQUEsSUFDQSxpQkFBaUJDLFNBQVE7QUFDdkIsYUFBcUIsaUJBQWlCQSxPQUFNO0FBQUEsSUFDOUM7QUFBQSxJQUNBLE9BQU8sUUFBUSxTQUFTLENBQUMsR0FBRztBQUMxQixhQUFxQixLQUFLLEtBQUssU0FBdUIsV0FBVyxNQUFNLEdBQUcsRUFBRSxHQUFHLFFBQVEsS0FBSyxLQUFLLENBQUM7QUFBQSxJQUNwRztBQUFBLElBQ0EsYUFBYUEsU0FBUTtBQUNuQixhQUFxQixhQUFhLEtBQUssU0FBU0EsT0FBTTtBQUFBLElBQ3hEO0FBQUEsSUFDQSxzQkFBc0IsY0FBYztBQUNsQyxhQUFPLEtBQUssS0FBSyxDQUFDLE1BQU07QUFBRSxZQUFJLEtBQUssT0FBTyxPQUFPLENBQUM7QUFBRyxlQUFPLGFBQWEsTUFBTSxPQUFLLEdBQUcsS0FBSyxPQUFLLE9BQU8sS0FBSyxZQUFZLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztBQUFBLE1BQUUsQ0FBQyxHQUFHO0FBQUEsSUFDL0k7QUFBQSxJQUNBLG9CQUFvQixPQUFPO0FBQ3pCLGFBQU8sS0FBSyxhQUFhO0FBQUEsUUFDdkIsUUFBUTtBQUFBLFVBQ04sUUFBUTtBQUFBLFVBQ1IsSUFBSTtBQUFBLFVBQ0osSUFBSSxDQUFDLEtBQUs7QUFBQSxRQUNaO0FBQUEsUUFDQSxNQUFNO0FBQUEsVUFDSixRQUFRO0FBQUEsUUFDVjtBQUFBLE1BQ0YsQ0FBQztBQUFBLElBQ0g7QUFBQSxJQUNBLG9CQUFvQixPQUFPO0FBQ3pCLGFBQU8sS0FBSyxhQUFhO0FBQUEsUUFDdkIsUUFBUTtBQUFBLFVBQ04sUUFBUTtBQUFBLFVBQ1IsSUFBSTtBQUFBLFVBQ0osSUFBSSxDQUFDLEtBQUs7QUFBQSxRQUNaO0FBQUEsUUFDQSxNQUFNO0FBQUEsVUFDSixRQUFRO0FBQUEsUUFDVjtBQUFBLE1BQ0YsQ0FBQztBQUFBLElBQ0g7QUFBQSxJQUNBLGlCQUFpQixPQUFPO0FBQ3RCLGFBQU8sS0FBSyxhQUFhO0FBQUEsUUFDdkIsUUFBUTtBQUFBLFVBQ04sUUFBUTtBQUFBLFVBQ1IsSUFBSTtBQUFBLFVBQ0osSUFBSSxDQUFDLEtBQUs7QUFBQSxRQUNaO0FBQUEsUUFDQSxNQUFNO0FBQUEsVUFDSixRQUFRO0FBQUEsUUFDVjtBQUFBLE1BQ0YsQ0FBQztBQUFBLElBQ0g7QUFBQSxFQUNGOzs7QUN2RUEsV0FBUyxVQUFVLE1BQU0sS0FBSztBQUM1QixRQUFJLENBQUMsTUFBTTtBQUFXLFdBQUssWUFBWSxDQUFDO0FBQ3hDLGVBQVcsT0FBTyxLQUFLO0FBQ3JCLFVBQUksTUFBTSxHQUFHLEdBQUcsT0FBTyxNQUFNO0FBQzNCLGVBQU8sZUFBZSxNQUFNLEtBQUs7QUFBQSxVQUMvQixNQUFNO0FBQ0osZ0JBQUksS0FBSyxVQUFVLEdBQUc7QUFBRyxxQkFBTyxLQUFLLFVBQVUsR0FBRztBQUNsRCxtQkFBTyxLQUFLLFVBQVUsR0FBRyxJQUFJLGdCQUFRLGFBQWEsSUFBSSxHQUFHLENBQUM7QUFBQSxVQUM1RDtBQUFBLFFBQ0YsQ0FBQztBQUFBLE1BQ0gsT0FBTztBQUNMLFlBQUksT0FBTyxLQUFLLEdBQUcsTUFBTTtBQUFhLGVBQUssR0FBRyxJQUFJLENBQUM7QUFDbkQsa0JBQVUsS0FBSyxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUM7QUFBQSxNQUMvQjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBR0EsTUFBSSxTQUFTO0FBQUEsSUFDWCxXQUFXLENBQUM7QUFBQSxJQUNaLGNBQWM7QUFBQSxNQUNaLEtBQUssV0FBVztBQUNkLGVBQU8sZUFBZSxTQUFTO0FBQUEsVUFDN0IsTUFBTTtBQUFBLFVBQ047QUFBQSxRQUNGLENBQUM7QUFBQSxNQUNIO0FBQUEsTUFDQSxNQUFNO0FBQ0osZUFBTyxlQUFlLFNBQVM7QUFBQSxVQUM3QixNQUFNO0FBQUEsUUFDUixDQUFDO0FBQUEsTUFDSDtBQUFBLE1BQ0EsU0FBUztBQUNQLGVBQU8sZUFBZSxTQUFTO0FBQUEsVUFDN0IsTUFBTTtBQUFBLFFBQ1IsQ0FBQztBQUFBLE1BQ0g7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNBLFlBQVUsUUFBUSxlQUFXLE1BQU07QUFDbkM7QUFDRSxRQUFJLFFBQVE7QUFBQSxNQUNWO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUNBLG9CQUFRLE9BQU8sQ0FBQyxNQUFNLEdBQUcsVUFBVSxHQUFHLFdBQVcsT0FBTyxHQUFHLEVBQUUsZUFBZSxNQUFNLENBQUMsRUFBRSxRQUFRLENBQUMsTUFBTTtBQUNsRyxVQUFJLE1BQU0sTUFBTSxJQUFJLFVBQVEsRUFBRSxJQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUUsS0FBSyxPQUFLLENBQUM7QUFDdkQsVUFBSSxDQUFDO0FBQUs7QUFDVixVQUFJQyxRQUFPLEtBQUssVUFBVTtBQUMxQixVQUFJLENBQUNBO0FBQU07QUFDWCxVQUFJLE9BQU9BLEtBQUk7QUFBRztBQUVsQixhQUFPLGVBQWUsUUFBUUEsT0FBTTtBQUFBLFFBQ2xDLE1BQU07QUFDSixjQUFJLE9BQU8sVUFBVUEsS0FBSTtBQUFHLG1CQUFPLE9BQU8sVUFBVUEsS0FBSTtBQUN4RCxpQkFBTyxPQUFPLFVBQVVBLEtBQUksSUFBSTtBQUFBLFFBQ2xDO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSCxDQUFDO0FBQUEsRUFDSDtBQUVBLE1BQU9DLGtCQUFROzs7QUNoRWYsTUFBTyxrQkFBUTtBQUFBLElBQ2IsUUFBQUM7QUFBQSxJQUNBO0FBQUEsSUFDQSxTQUFTLFdBQVcsZUFBZSxFQUFFO0FBQUEsSUFDckMsUUFBUTtBQUFBLEVBQ1Y7OztBQ0xBLE1BQU0sV0FBVztBQUNqQixNQUFNQyxXQUFVLEVBQUUsT0FBTyxXQUFXO0FBR3BDLE1BQU0sTUFBTTtBQUFBLElBQ1YsV0FBVztBQUFBLE1BQ1QsV0FBVyxDQUFDO0FBQUEsTUFDWixlQUFlLENBQUM7QUFBQSxJQUNsQjtBQUFBLElBQ0EsSUFBSSxTQUFTO0FBQ1gsYUFBTyxnQkFBUSxPQUFPLEtBQUs7QUFBQSxJQUM3QjtBQUFBLElBQ0EsSUFBSSxLQUFLO0FBQ1AsWUFBTTtBQUNOLGFBQU8sSUFBSSxVQUFVLGNBQWMsSUFBSSxNQUFNLElBQUksR0FBRyxLQUMvQyxJQUFJLFVBQVUsY0FBYyxVQUFVLEdBQUcsS0FDekMsZ0JBQVEsT0FBTyxLQUFLLFNBQVMsR0FBRyxLQUNoQztBQUFBLElBQ1A7QUFBQSxJQUNBLFVBQVUsSUFBSSxNQUFNLENBQUMsR0FBRztBQUFBLE1BQ3RCLElBQUlDLElBQUcsTUFBTTtBQUNYLGVBQU8sSUFBSSxJQUFJLElBQUk7QUFBQSxNQUNyQjtBQUFBLElBQ0YsQ0FBQztBQUFBLElBQ0QsU0FBUyxRQUFRLE1BQU07QUFDckIsVUFBSSxPQUFPLFFBQVE7QUFBVSxlQUFPLGNBQU0sT0FBTyxLQUFLLEdBQUcsSUFBSTtBQUM3RCxVQUFJLE1BQU0sTUFBTSxJQUFJLE1BQU0sS0FDckIsS0FBSyxXQUNMLE9BQU8sT0FBTyxHQUFHLEVBQUUsQ0FBQztBQUN6QixVQUFJLENBQUM7QUFBSyxlQUFPO0FBQ2pCLGFBQU8sY0FBTSxPQUFPLEtBQUssR0FBRyxJQUFJO0FBQUEsSUFDbEM7QUFBQSxJQUNBLE9BQU8sUUFBUSxNQUFNO0FBQ25CLGFBQU8sY0FBTSxPQUFPLElBQUksSUFBSSxHQUFHLEdBQUcsR0FBRyxJQUFJO0FBQUEsSUFDM0M7QUFBQSxFQUNGO0FBRUEsaUJBQWUsUUFBUTtBQUNyQixVQUFNLFNBQVMsSUFBSTtBQUNuQixRQUFJLENBQUMsSUFBSSxVQUFVLFVBQVUsUUFBUTtBQUNuQyxVQUFJO0FBQ0YsWUFBSSxVQUFVLFlBQVksT0FBTyxNQUFNLE1BQU0sR0FBRyx5QkFBeUJELFFBQU8sR0FBRyxLQUFLO0FBQUEsTUFDMUYsUUFBRTtBQUFBLE1BQVE7QUFDVixVQUFJO0FBQ0YsWUFBSSxVQUFVLGNBQWMsVUFBVSxPQUFPLE1BQU0sTUFBTSxHQUFHLHlCQUF5QkEsUUFBTyxHQUFHLEtBQUs7QUFBQSxNQUN0RyxRQUFFO0FBQUEsTUFBUTtBQUFBLElBQ1o7QUFDQSxRQUNFLElBQUksVUFBVSxVQUFVLFNBQVMsTUFBTSxLQUNwQyxDQUFDLElBQUksVUFBVSxnQkFBZ0IsTUFBTSxHQUN4QztBQUNBLFVBQUk7QUFDRixZQUFJLFVBQVUsY0FBYyxNQUFNLElBQUksT0FBTyxNQUFNLE1BQU0sR0FBRyxZQUFZLGVBQWVBLFFBQU8sR0FBRyxLQUFLO0FBQUEsTUFDeEcsUUFBRTtBQUFBLE1BQVE7QUFBQztBQUFBLElBQ2I7QUFBQSxFQUNGO0FBRUEsUUFBTTtBQUNOLE1BQU8sZUFBUTs7O0FDMURmLE1BQUksbUJBQW1CO0FBRWhCLFdBQVMsMEJBQTBCO0FBQ3hDLFdBQU8sSUFBSSxRQUFRLENBQUMsWUFBWTtBQUM5QixVQUFJO0FBQWtCLGVBQU8sUUFBUSxJQUFJO0FBQ3pDLGVBQVMsVUFBVTtBQUNqQix3QkFBUSxPQUFPLGVBQWUsWUFBWSxtQkFBbUIsT0FBTztBQUNwRSwyQkFBbUI7QUFDbkIsZ0JBQVEsSUFBSTtBQUFBLE1BQ2Q7QUFDQSxzQkFBUSxPQUFPLGVBQWUsVUFBVSxtQkFBbUIsT0FBTztBQUFBLElBQ3BFLENBQUM7QUFBQSxFQUNIOzs7QUNmTyxNQUFNLG9CQUFOLE1BQXdCO0FBQUEsSUFDN0IsY0FBYztBQUVaLFdBQUssWUFBWSxvQkFBSSxJQUFJO0FBQUEsSUFDM0I7QUFBQSxJQUVBLHFCQUFxQixXQUFXO0FBQzlCLFVBQUksQ0FBQyxLQUFLLFVBQVUsSUFBSSxTQUFTO0FBQy9CLGFBQUssVUFBVSxJQUFJLFdBQVcsb0JBQUksSUFBSSxDQUFDO0FBQUEsSUFDM0M7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBTUEsR0FBRyxXQUFXLFVBQVU7QUFDdEIsV0FBSyxxQkFBcUIsU0FBUztBQUNuQyxXQUFLLFVBQVUsSUFBSSxTQUFTLEVBQUUsSUFBSSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDM0QsYUFBTyxNQUFNO0FBQ1gsYUFBSyxVQUFVLElBQUksU0FBUyxFQUFFLE9BQU8sUUFBUTtBQUFBLE1BQy9DO0FBQUEsSUFDRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFNQSxLQUFLLFdBQVcsVUFBVTtBQUN4QixXQUFLLHFCQUFxQixTQUFTO0FBQ25DLFdBQUssVUFBVSxJQUFJLFNBQVMsR0FBRyxJQUFJLFVBQVUsRUFBRSxNQUFNLEtBQUssQ0FBQztBQUMzRCxhQUFPLE1BQU07QUFDWCxhQUFLLFVBQVUsSUFBSSxTQUFTLEVBQUUsT0FBTyxRQUFRO0FBQUEsTUFDL0M7QUFBQSxJQUNGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQU1BLElBQUksV0FBVyxVQUFVO0FBQ3ZCLFVBQUksQ0FBQztBQUFXLGVBQVEsS0FBSyxZQUFZLG9CQUFJLElBQUk7QUFDakQsVUFBSSxDQUFDO0FBQVUsZUFBTyxLQUFLLFdBQVcsT0FBTyxTQUFTO0FBQ3RELFdBQUssVUFBVSxJQUFJLFNBQVMsR0FBRyxPQUFPLFFBQVE7QUFBQSxJQUNoRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFNQSxLQUFLLGNBQWMsTUFBTTtBQUN2QixVQUFJLENBQUMsS0FBSyxVQUFVLElBQUksU0FBUztBQUFHO0FBQ3BDLFVBQUksV0FBVyxLQUFLLFVBQVUsSUFBSSxTQUFTO0FBQzNDLGVBQVMsUUFBUSxDQUFDLEVBQUUsS0FBSyxHQUFHLGFBQWE7QUFDdkMsWUFBSTtBQUFNLG9CQUFVLE9BQU8sUUFBUTtBQUNuQyxpQkFBUyxHQUFHLElBQUk7QUFBQSxNQUNsQixDQUFDO0FBQUEsSUFDSDtBQUFBLEVBQ0Y7OztBQ3ZEQSxNQUFNLFNBQVMsSUFBSSxrQkFBa0I7QUFFckMsTUFBTyxpQkFBUTs7O0FDRGYsTUFBTSxtQkFBbUIsZ0JBQVEsaUJBQWlCLDBCQUEwQixTQUFTO0FBRXJGLE1BQU0sZ0JBQWdCO0FBQUEsSUFDcEIsTUFBTTtBQUFBLElBQ04sUUFBUTtBQUFBLElBQ1IsV0FBVztBQUFBLElBQ1gsUUFBUTtBQUFBLElBQ1IsS0FBSztBQUFBLElBQ0wsUUFBUTtBQUFBLElBQ1IsaUJBQWlCO0FBQUEsSUFDakIsZ0JBQWdCO0FBQUEsRUFDbEI7QUFHQSxNQUFPLGNBQVE7QUFBQSxJQUNiLE1BQU0sTUFBTTtBQUNWLFlBQU0sTUFBTSxTQUFTLGNBQWMsS0FBSztBQUN4QyxVQUFJLFlBQVk7QUFDaEIsYUFBTyxJQUFJO0FBQUEsSUFDYjtBQUFBLElBQ0EsVUFBVSxHQUFHO0FBQ1gsVUFBSSxNQUFNLFNBQVMsY0FBYyxLQUFLO0FBQ3RDLGFBQU8sUUFBUSxDQUFDLEVBQUUsUUFBUSxDQUFDLE1BQU07QUFDL0IsWUFBSSxJQUFJLE1BQU0sZUFBZSxFQUFFLENBQUMsQ0FBQyxHQUFHO0FBQ2xDLGNBQUksTUFBTSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUFBLFFBQ3ZCLE9BQU87QUFDTCxjQUFJLE1BQU0sWUFBWSxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztBQUFBLFFBQ2xDO0FBQUEsTUFDRixDQUFDO0FBQ0QsYUFBTyxJQUFJLGFBQWEsT0FBTztBQUFBLElBQ2pDO0FBQUEsSUFDQSxZQUFZLEdBQUc7QUFDYixhQUFPLE9BQU8sUUFBUSxDQUFDLEVBQ3BCO0FBQUEsUUFDQyxDQUFDLE1BQ0MsR0FBRyxFQUFFLENBQUMsRUFBRSxRQUFRLE1BQU0sR0FBRyxNQUFNLEVBQUUsQ0FBQyxLQUFLLFdBQVcsT0FBTyxFQUFFLENBQUMsS0FBSyxXQUM3RCxLQUFLLFVBQVUsRUFBRSxDQUFDLENBQUMsSUFDbkIsS0FBSyxXQUFXLEVBQUUsQ0FBQyxDQUFDO0FBQUEsTUFDNUIsRUFDQyxLQUFLLEdBQUc7QUFBQSxJQUNiO0FBQUEsSUFDQSxPQUFPLE1BQU07QUFDWCxhQUFPLElBQUksT0FBTyxJQUFJLEVBQUU7QUFBQSxJQUMxQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQU1BLFFBQVEsS0FBSyxrQkFBa0I7QUFDN0IsVUFBSSxVQUFVLENBQUM7QUFDZixVQUFJLE9BQU8scUJBQXFCLFVBQVU7QUFDeEMsaUJBQVMsSUFBSSxHQUFHLElBQUksa0JBQWtCLEtBQUs7QUFDekMsY0FBSSxJQUFJLGVBQWU7QUFDckIsa0JBQU0sSUFBSTtBQUNWLG9CQUFRLEtBQUssR0FBRztBQUFBLFVBQ2xCO0FBQUEsUUFDRjtBQUFBLE1BQ0YsT0FBTztBQUNMLGVBQU8sSUFBSSxpQkFBaUIsSUFBSSxjQUFjLFFBQVEsZ0JBQWdCLEdBQUc7QUFDdkUsZ0JBQU0sSUFBSSxjQUFjLFFBQVEsZ0JBQWdCO0FBQ2hELGtCQUFRLEtBQUssR0FBRztBQUFBLFFBQ2xCO0FBQUEsTUFDRjtBQUNBLGFBQU87QUFBQSxJQUNUO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFPQSxPQUFPLENBQUMsVUFBVSxRQUNmLE1BQU07QUFDTCxlQUFTLFVBQVUsTUFBTTtBQUN2QixZQUFJLE9BQU8sTUFBTSxvQkFBb0I7QUFBWTtBQUNqRCxhQUFLLGlCQUFpQixRQUFRLEVBQUUsUUFBUSxPQUFPLFFBQVE7QUFDckQsY0FBSSxDQUFDLElBQUksT0FBTztBQUNkLGdCQUFJLFFBQVEsRUFBRSxTQUFTLENBQUMsR0FBRyxTQUFTLG9CQUFJLElBQUksRUFBRTtBQUM5QyxnQkFBSSxVQUFVLElBQUksZ0JBQWdCO0FBQUEsVUFDcEM7QUFFQSxjQUFJLElBQUksTUFBTSxRQUFRLElBQUksRUFBRTtBQUFHO0FBQy9CLGNBQUksTUFBTSxRQUFRLElBQUksRUFBRTtBQUV4QixjQUFJLFlBQVksTUFBTSxHQUFHLEdBQUc7QUFDNUIsY0FBSSxPQUFPLGNBQWM7QUFDdkIsZ0JBQUksTUFBTSxRQUFRLEtBQUssU0FBUztBQUFBLFFBQ3BDLENBQUM7QUFBQSxNQUNIO0FBRUEsZUFBUyxZQUFZLE1BQU07QUFDekIsWUFBSSxPQUFPLE1BQU0sb0JBQW9CO0FBQVk7QUFDakQsYUFBSyxpQkFBaUIsUUFBUSxFQUFFLFFBQVEsT0FBTyxRQUFRO0FBQ3JELGNBQUksQ0FBQyxJQUFJO0FBQU87QUFDaEIsY0FBSSxNQUFNLFFBQVEsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQUEsUUFDdEMsQ0FBQztBQUFBLE1BQ0g7QUFFQSxlQUFTLGlCQUFpQixRQUFRLEVBQUUsUUFBUSxTQUFTO0FBRXJELGFBQU8sZUFBTztBQUFBLFFBQ1o7QUFBQTtBQUFBLFFBQ2tDLENBQUMsUUFBUTtBQUN6QyxjQUFJLElBQUksU0FBUyxhQUFhO0FBQzVCLGdCQUFJLFdBQVcsUUFBUSxTQUFTO0FBQ2hDLGdCQUFJLGFBQWEsUUFBUSxXQUFXO0FBQUEsVUFDdEM7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0YsR0FBRztBQUFBLElBQ0wsY0FBYyxLQUFLO0FBQ2pCLFVBQUksQ0FBQztBQUFLLGVBQU87QUFDakIsWUFBTSxFQUFFLE1BQU0sUUFBUSxXQUFXLFFBQVEsZ0JBQWdCLGlCQUFpQixRQUFRLElBQUksSUFBSTtBQUUxRixZQUFNLGdCQUFnQixPQUFPLFlBQVk7QUFBQSxRQUN2QyxHQUFJLElBQUksU0FBUyxjQUFjLEtBQUssQ0FBQztBQUFBLFFBQUksR0FBSSxJQUFJLFNBQVMsZUFBZSxLQUFLLENBQUM7QUFBQSxNQUNqRixFQUFFO0FBQUEsUUFDQSxDQUFDLENBQUNFLElBQUcsaUJBQWlCLGdCQUFnQixHQUFHLE1BQU07QUFDN0MsZ0JBQU0sSUFBSSxRQUFRQSxJQUFHLGVBQWUsS0FBSztBQUN6QyxpQkFBTztBQUFBLFlBQ0wsZUFBZTtBQUFBLFlBQ2YsbUJBQ0UscUJBQXFCLGlCQUFpQiwrQkFBK0IsZ0RBQWdELFFBQVEsT0FBTyxLQUFLLFVBQVUsaUJBQWlCLGdCQUFnQixFQUFFLHVCQUN0TCxxQkFBcUIsaUJBQWlCLDREQUE0RDtBQUFBLFVBQ3RHO0FBQUEsUUFDRjtBQUFBLE1BQ0YsQ0FBQztBQUVELFlBQU0sWUFBWSxPQUFPO0FBQUEsUUFDdkIsQ0FBQyxHQUFJLElBQUksU0FBUyxNQUFNLEtBQUssQ0FBQyxDQUFFLEVBQUU7QUFBQSxVQUNoQyxDQUFDLENBQUNBLElBQUcsYUFBYSxHQUFHLE1BQU07QUFDekIsa0JBQU0sSUFBSSxRQUFRQSxJQUFHLFlBQVksS0FBSztBQUN0QyxtQkFBTyxDQUFDLFlBQVksT0FBTyx3QkFBd0Isc0JBQXNCO0FBQUEsVUFDM0U7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUVBLFlBQU0sSUFBSSxRQUFRLE1BQU0sV0FBVyxFQUNoQyxRQUFRLFFBQVEsV0FBVyxFQUMzQixRQUFRLFdBQVcsV0FBVyxFQUM5QixRQUFRLFFBQVEsV0FBVyxFQUMzQixRQUFRLEtBQUsscUJBQXFCO0FBRXJDLGlCQUFXLENBQUMsS0FBSyxLQUFLLEtBQUssT0FBTyxRQUFRLGFBQWEsR0FBRztBQUN4RCxjQUFNLElBQUksUUFBUSxLQUFLLEtBQUs7QUFBQSxNQUM5QjtBQUVBLGlCQUFXLENBQUMsS0FBSyxLQUFLLEtBQUssT0FBTyxRQUFRLFNBQVMsR0FBRztBQUNwRCxjQUFNLElBQUksUUFBUSxLQUFLLEtBQUs7QUFBQSxNQUM5QjtBQUVBLGFBQU87QUFBQSxJQUNUO0FBQUEsSUFDQSxRQUFRLFdBQVc7QUFDakIsVUFBSSxxQkFBcUI7QUFBUyxlQUFPO0FBQ3pDLGFBQU8sS0FBSyxNQUFNLFNBQVM7QUFBQSxJQUM3QjtBQUFBLEVBQ0Y7QUFFQTtBQUNFLFVBQU0sV0FBVyxJQUFJLGlCQUFpQixDQUFDLGNBQWM7QUFDbkQsZ0JBQVUsUUFBUSxDQUFDLGFBQWE7QUFDOUIsdUJBQU8sS0FBSyxnQkFBZ0IsUUFBUTtBQUFBLE1BQ3RDLENBQUM7QUFBQSxJQUNILENBQUM7QUFDRCxhQUFTLFFBQVEsVUFBVTtBQUFBLE1BQ3pCLFlBQVk7QUFBQSxNQUNaLFdBQVc7QUFBQSxNQUNYLFNBQVM7QUFBQSxJQUNYLENBQUM7QUFBQSxFQUNIOzs7QUM3S08sTUFBTSxhQUFhLENBQUMsS0FBSyxLQUFLLEdBQUc7QUFDakMsTUFBTSxpQkFBaUIsb0JBQUksSUFBSTs7O0FDQXZCLFdBQVIsYUFBa0IsVUFBVSxZQUFZLFVBRS9DLE1BRUEsYUFBYTtBQUNULFVBQU0sUUFBUSxlQUFlLElBQUksVUFBVSxJQUFJLFFBQVE7QUFFdkQsUUFBSSxDQUFDO0FBQ0QsYUFBTyxjQUNELFFBQVEsVUFBVSxXQUFXLFFBQVEsR0FBRyxVQUFVLElBQUksSUFDdEQsV0FBVyxRQUFRLEVBQUUsTUFBTSxNQUFNLFFBQVE7QUFFbkQsZUFBVyxRQUFRLE1BQU0sRUFBRSxPQUFPLEdBQUc7QUFDakMsWUFBTSxnQkFBZ0IsS0FBSyxLQUFLLE1BQU0sUUFBUTtBQUM5QyxVQUFJLE1BQU0sUUFBUSxhQUFhO0FBQzNCLG1CQUFXO0FBQUEsSUFDbkI7QUFFQSxRQUFJLHFCQUFxQixJQUFJLFNBQVMsY0FDaEMsUUFBUSxVQUFVLE1BQU0sR0FBRyxNQUFNLElBQUksSUFDckMsTUFBTSxFQUFFLE1BQU0sTUFBTSxJQUFJO0FBQzlCLGVBQVcsWUFBWSxNQUFNLEVBQUUsT0FBTyxHQUFHO0FBQ3JDLFlBQU0sZUFBZTtBQUNyQiwyQkFBcUIsSUFBSSxTQUFTLFNBQVMsS0FBSyxNQUFNLE1BQU0sWUFBWTtBQUFBLElBQzVFO0FBQ0EsUUFBSSxnQkFBZ0IsbUJBQW1CLEdBQUcsUUFBUTtBQUVsRCxlQUFXLFFBQVEsTUFBTSxFQUFFLE9BQU87QUFDOUIsc0JBQWdCLEtBQUssS0FBSyxNQUFNLFVBQVUsYUFBYSxLQUFLO0FBQ2hFLFdBQU87QUFBQSxFQUNYOzs7QUMvQk8sV0FBUyxRQUFRLFlBQVksVUFBVSxRQUFRLE1BQU07QUFDeEQsVUFBTSxnQkFBZ0IsZUFBZSxJQUFJLFVBQVU7QUFDbkQsVUFBTSxRQUFRLGdCQUFnQixRQUFRO0FBQ3RDLFFBQUksQ0FBQyxRQUFRLElBQUksRUFBRSxJQUFJLE1BQU07QUFDekIsYUFBTztBQUNYLFVBQU0sSUFBSSxFQUFFLE9BQU8sTUFBTTtBQUV6QixRQUFJLFdBQVcsTUFBTSxDQUFDLE1BQU0sTUFBTSxDQUFDLEVBQUUsU0FBUyxDQUFDLEdBQUc7QUFJOUMsWUFBTSxVQUFVLFFBQVEsZUFBZSxZQUFZLFVBQVU7QUFBQSxRQUN6RCxPQUFPLE1BQU07QUFBQSxRQUNiLFVBQVU7QUFBQSxRQUNWLGNBQWM7QUFBQSxNQUNsQixDQUFDO0FBQ0QsVUFBSSxDQUFDO0FBQ0QsbUJBQVcsUUFBUSxJQUFJLE1BQU07QUFDakMsYUFBTyxjQUFjLFFBQVE7QUFBQSxJQUNqQztBQUNBLFFBQUksT0FBTyxLQUFLLGFBQWEsRUFBRSxVQUFVO0FBQ3JDLHFCQUFlLE9BQU8sVUFBVTtBQUNwQyxXQUFPO0FBQUEsRUFDWDtBQUNPLFdBQVMsYUFBYTtBQUN6QixlQUFXLENBQUMsY0FBYyxhQUFhLEtBQUssZUFBZSxRQUFRO0FBQy9ELGlCQUFXLFlBQVk7QUFDbkIsbUJBQVcsWUFBWTtBQUNuQixxQkFBVyxVQUFVLGNBQWMsUUFBUSxJQUFJLFFBQVEsRUFBRSxLQUFLLEtBQUssQ0FBQztBQUNoRSxvQkFBUSxjQUFjLFVBQVUsUUFBUSxRQUFRO0FBQUEsRUFDcEU7OztBQ3hCQSxNQUFPLHlCQUFRLENBQUMsY0FBYyxDQUFDLFVBQVUsWUFBWSxVQUFVLFVBQVUsVUFBVTtBQUMvRSxRQUFJLE9BQU8sV0FBVyxRQUFRLE1BQU07QUFDaEMsWUFBTSxJQUFJLE1BQU0sR0FBRyxpQ0FBaUMsV0FBVyxZQUFZLE1BQU07QUFDckYsUUFBSSxDQUFDLGVBQWUsSUFBSSxVQUFVO0FBQzlCLHFCQUFlLElBQUksWUFBWSxDQUFDLENBQUM7QUFDckMsVUFBTSxtQkFBbUIsZUFBZSxJQUFJLFVBQVU7QUFDdEQsUUFBSSxDQUFDLGlCQUFpQixRQUFRLEdBQUc7QUFDN0IsWUFBTSxXQUFXLFdBQVcsUUFBUTtBQUVwQyx1QkFBaUIsUUFBUSxJQUFJO0FBQUEsUUFDekIsR0FBRztBQUFBLFFBQ0gsR0FBRyxvQkFBSSxJQUFJO0FBQUEsUUFDWCxHQUFHLG9CQUFJLElBQUk7QUFBQSxRQUNYLEdBQUcsb0JBQUksSUFBSTtBQUFBLE1BQ2Y7QUFDQSxZQUFNLFVBQVUsQ0FBQyxNQUFNLE1BQU0sY0FBYztBQUN2QyxjQUFNLE1BQU0sYUFBSyxVQUFVLFlBQVksTUFBTSxNQUFNLFNBQVM7QUFDNUQsWUFBSTtBQUNBLDJCQUFpQjtBQUNyQixlQUFPO0FBQUEsTUFDWDtBQUNBLFlBQU0sZUFBZSxJQUFJLE1BQU0sVUFBVTtBQUFBLFFBQ3JDLE9BQU8sQ0FBQ0MsSUFBRyxNQUFNLFNBQVMsUUFBUSxNQUFNLE1BQU0sS0FBSztBQUFBLFFBQ25ELFdBQVcsQ0FBQ0EsSUFBRyxTQUFTLFFBQVEsVUFBVSxNQUFNLElBQUk7QUFBQSxRQUNwRCxLQUFLLENBQUMsUUFBUSxNQUFNLGFBQWEsUUFBUSxhQUNuQyxTQUFTLFNBQVMsS0FBSyxRQUFRLElBQy9CLFFBQVEsSUFBSSxRQUFRLE1BQU0sUUFBUTtBQUFBLE1BQzVDLENBQUM7QUFHRCxZQUFNLFVBQVUsUUFBUSxlQUFlLFlBQVksVUFBVTtBQUFBLFFBQ3pELE9BQU87QUFBQSxRQUNQLGNBQWM7QUFBQSxRQUNkLFVBQVU7QUFBQSxNQUNkLENBQUM7QUFDRCxVQUFJLENBQUM7QUFDRCxtQkFBVyxRQUFRLElBQUk7QUFDM0IsaUJBQVcsUUFBUSxFQUFFLGVBQWUsaUJBQWlCLFFBQVEsRUFBRTtBQUFBLElBQ25FO0FBQ0EsVUFBTSxTQUFTLE9BQU87QUFDdEIsVUFBTSxtQkFBbUIsTUFBTSxRQUFRLFlBQVksVUFBVSxRQUFRLFNBQVM7QUFDOUUscUJBQWlCLFFBQVEsRUFBRSxTQUFTLEVBQUUsSUFBSSxRQUFRLFFBQVE7QUFDMUQsV0FBTztBQUFBLEVBQ1g7OztBQy9DQSxNQUFNLFNBQVMsdUJBQWEsR0FBRztBQUMvQixNQUFNLFVBQVUsdUJBQWEsR0FBRztBQUNoQyxNQUFNLFFBQVEsdUJBQWEsR0FBRzs7O0FDSDlCLFdBQVMsYUFBYSxLQUFLLFFBQVEsQ0FBQyxHQUFHO0FBQ3JDLFdBQU8sSUFBSSxRQUFRLDhCQUE4QixDQUFDLE9BQU8sV0FBVztBQUNsRSxVQUFJLFdBQVcsT0FBTyxNQUFNLEdBQUc7QUFDL0IsVUFBSSxNQUFNLFNBQVMsTUFBTSxFQUFFLEtBQUs7QUFDaEMsVUFBSSxlQUFlLFNBQVMsS0FBSyxHQUFHLEVBQUUsS0FBSztBQUMzQyxhQUFPLE1BQU0sR0FBRyxNQUFNLGdCQUFnQjtBQUFBLElBQ3hDLENBQUM7QUFBQSxFQUNIO0FBRUEsTUFBTyxrQkFBUTtBQUFBLElBQ2IsV0FBVztBQUFBLE1BQ1QsU0FBbUI7QUFBQSxJQUNyQjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBLFVBQVUsS0FBSyxjQUFjLENBQUMsR0FBRztBQUMvQixZQUFNLFFBQVEsU0FBUyxjQUFjLE9BQU87QUFDNUMsWUFBTSxZQUFZO0FBQ2xCLFlBQU0sY0FBYyxhQUFhLEtBQUssV0FBVztBQUNqRCxlQUFTLEtBQUssWUFBWSxLQUFLO0FBRS9CLGFBQU8sSUFBSSxTQUFTO0FBQ2xCLFlBQUksT0FBTyxLQUFLLENBQUMsTUFBTSxVQUFVO0FBQy9CLGdCQUFNLGNBQWMsYUFBYSxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQztBQUNqRCxnQkFBTSxLQUFLLENBQUM7QUFBQSxRQUNkLFdBQVcsT0FBTyxLQUFLLENBQUMsTUFBTSxVQUFVO0FBQ3RDLGdCQUFNLGNBQWMsYUFBYSxLQUFLLEtBQUssQ0FBQyxDQUFDO0FBQUEsUUFDL0MsT0FBTztBQUNMLGlCQUFPLE9BQU87QUFBQSxRQUNoQjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxnQkFBZ0I7QUFDZCxlQUFTLGlCQUFpQixzQkFBc0IsRUFBRSxRQUFRLGFBQVc7QUFDbkUsZ0JBQVEsT0FBTztBQUFBLE1BQ2pCLENBQUM7QUFBQSxJQUNIO0FBQUEsRUFDRjs7O0FDekNBLE1BQU8sZ0JBQVE7QUFBQTs7O0FDSWYsTUFBSTtBQUVKLGlCQUFlLE9BQU87QUFDcEIsUUFBSSxTQUFTLGNBQWMseUJBQXlCO0FBQUc7QUFDdkQsV0FBTyxNQUFNO0FBQ1gsVUFBSSxTQUFTLGNBQWMsWUFBWTtBQUFHO0FBQzFDLFlBQU0sSUFBSSxRQUFRLENBQUMsWUFBWSxXQUFXLFNBQVMsR0FBRyxDQUFDO0FBQUEsSUFDekQ7QUFFQSxlQUFXLGdCQUFRLFVBQVUsYUFBTztBQUNwQyxVQUFNLFVBQVUsWUFBSSxNQUFNO0FBQUE7QUFBQSxHQUV6QjtBQUNELGFBQVMsY0FBYyxZQUFZLEVBQUUsWUFBWSxPQUFPO0FBQUEsRUFDMUQ7QUFFQSxXQUFTLE9BQU87QUFDZCxRQUFJLE1BQU0sU0FBUyxjQUFjLHlCQUF5QjtBQUMxRCxRQUFJLEtBQUs7QUFDUCxVQUFJLFVBQVUsSUFBSSxRQUFRO0FBQzFCLGlCQUFXLE1BQU07QUFDZixZQUFJLE9BQU87QUFDWCxtQkFBVztBQUNYLG1CQUFXO0FBQUEsTUFDYixHQUFHLEdBQUc7QUFBQSxJQUNSO0FBQUEsRUFDRjtBQUVBLE1BQU8sNEJBQVE7QUFBQSxJQUNiO0FBQUEsSUFDQTtBQUFBLEVBQ0Y7OztBQ25DQSxjQUF1Qjs7O0FDQXZCLFdBQVMsaUJBQWlCLFNBQVM7QUFDL0IsV0FBTyxJQUFJLFFBQVEsQ0FBQyxTQUFTLFdBQVc7QUFFcEMsY0FBUSxhQUFhLFFBQVEsWUFBWSxNQUFNLFFBQVEsUUFBUSxNQUFNO0FBRXJFLGNBQVEsVUFBVSxRQUFRLFVBQVUsTUFBTSxPQUFPLFFBQVEsS0FBSztBQUFBLElBQ2xFLENBQUM7QUFBQSxFQUNMO0FBQ0EsV0FBUyxZQUFZLFFBQVEsV0FBVztBQUNwQyxVQUFNLFVBQVUsVUFBVSxLQUFLLE1BQU07QUFDckMsWUFBUSxrQkFBa0IsTUFBTSxRQUFRLE9BQU8sa0JBQWtCLFNBQVM7QUFDMUUsVUFBTSxNQUFNLGlCQUFpQixPQUFPO0FBQ3BDLFdBQU8sQ0FBQyxRQUFRLGFBQWEsSUFBSSxLQUFLLENBQUMsT0FBTyxTQUFTLEdBQUcsWUFBWSxXQUFXLE1BQU0sRUFBRSxZQUFZLFNBQVMsQ0FBQyxDQUFDO0FBQUEsRUFDcEg7QUFDQSxNQUFJO0FBQ0osV0FBUyxrQkFBa0I7QUFDdkIsUUFBSSxDQUFDLHFCQUFxQjtBQUN0Qiw0QkFBc0IsWUFBWSxnQkFBZ0IsUUFBUTtBQUFBLElBQzlEO0FBQ0EsV0FBTztBQUFBLEVBQ1g7QUFPQSxXQUFTLElBQUksS0FBSyxjQUFjLGdCQUFnQixHQUFHO0FBQy9DLFdBQU8sWUFBWSxZQUFZLENBQUMsVUFBVSxpQkFBaUIsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDO0FBQUEsRUFDOUU7QUFRQSxXQUFTLElBQUksS0FBSyxPQUFPLGNBQWMsZ0JBQWdCLEdBQUc7QUFDdEQsV0FBTyxZQUFZLGFBQWEsQ0FBQyxVQUFVO0FBQ3ZDLFlBQU0sSUFBSSxPQUFPLEdBQUc7QUFDcEIsYUFBTyxpQkFBaUIsTUFBTSxXQUFXO0FBQUEsSUFDN0MsQ0FBQztBQUFBLEVBQ0w7OztBQ3hDQSxXQUFTLFNBQVMsS0FBSyxRQUFRO0FBQzdCLGFBQVMsT0FBTyxXQUFXLFdBQVcsRUFBRSxNQUFNLE9BQU8sSUFBSyxVQUFVLENBQUM7QUFDckUsV0FBTyxPQUFPLE9BQU8sUUFBUTtBQUM3QixXQUFPLGNBQWMsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLE1BQU07QUFBQSxFQUMxQztBQUVBLFdBQVMsU0FBUyxLQUFLLFFBQVE7QUFDN0IsYUFBUyxPQUFPLFdBQVcsV0FBVyxFQUFFLE1BQU0sT0FBTyxJQUFLLFVBQVUsQ0FBQztBQUNyRSxVQUFNLFNBQVMsS0FBSyxNQUFNO0FBQzFCLFFBQUk7QUFDRixhQUFPLEtBQUssVUFBVSxLQUFLLFFBQVcsT0FBTyxNQUFNO0FBQUEsSUFDckQsU0FBUyxHQUFQO0FBQ0EsYUFBTztBQUFBLElBQ1Q7QUFBQSxFQUNGO0FBRUEsTUFBSSxjQUFjO0FBQ2xCLE1BQUksZ0JBQWdCO0FBQ3BCLE1BQUksZUFBZTtBQUNuQixNQUFJLGtCQUFrQjtBQUN0QixXQUFTLE9BQU8sS0FBSyxXQUFXO0FBQzlCLFFBQUk7QUFDRixhQUFPLEtBQUssTUFBTSxLQUFLLE9BQU87QUFBQSxJQUNoQyxTQUFTLEdBQVA7QUFDQSxhQUFPO0FBQUEsSUFDVDtBQUVBLGFBQVMsUUFBUSxLQUFLQyxNQUFLO0FBQ3pCLFVBQUksWUFBWSxLQUFLQSxJQUFHLEdBQUc7QUFDekIsUUFBQUEsT0FBTSxZQUFZLEtBQUtBLElBQUc7QUFDMUIsUUFBQUEsT0FBTSxJQUFJLEtBQUtBLEtBQUksQ0FBQyxDQUFDO0FBQ3JCLGVBQU8sSUFBSSxLQUFLQSxJQUFHO0FBQUEsTUFDckIsV0FBVyxjQUFjLEtBQUtBLElBQUcsR0FBRztBQUNsQyxRQUFBQSxPQUFNLGNBQWMsS0FBS0EsSUFBRyxFQUFFLENBQUM7QUFDL0IsZUFBTyxJQUFJLE9BQU9BLElBQUc7QUFBQSxNQUN2QixXQUFXLGFBQWEsS0FBS0EsSUFBRyxHQUFHO0FBQ2pDLFFBQUFBLE9BQU0sYUFBYSxLQUFLQSxJQUFHLEVBQUUsQ0FBQztBQUM5QixZQUFJLFFBQVEsSUFBSSxNQUFNQSxLQUFJLE1BQU0sSUFBSSxFQUFFLENBQUMsQ0FBQztBQUN4QyxZQUFJLE1BQU0sT0FBTztBQUNmLGdCQUFNLFFBQVFBO0FBQUEsUUFDaEI7QUFDQSxlQUFPO0FBQUEsTUFDVCxXQUFXLGFBQWEsZ0JBQWdCLEtBQUtBLElBQUcsR0FBRztBQUNqRCxRQUFBQSxPQUFNLGdCQUFnQixLQUFLQSxJQUFHLEVBQUUsQ0FBQztBQUNqQyxZQUFJO0FBQ0YsaUJBQVEsSUFBSSxTQUFTLFlBQVlBLE9BQU0sR0FBRyxFQUFHO0FBQUEsUUFDL0MsU0FBU0MsUUFBUDtBQUNBLGlCQUFPQTtBQUFBLFFBQ1Q7QUFBQSxNQUNGLE9BQU87QUFDTCxlQUFPRDtBQUFBLE1BQ1Q7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUVBLFdBQVMsY0FBYyxTQUFTLE1BQU0sS0FBSyxRQUFRO0FBQ2pELFFBQUksQ0FBQyxhQUFhLFVBQVUsV0FBVyxRQUFRLEVBQUUsUUFBUSxPQUFPLEdBQUcsS0FBSyxLQUFLLFFBQVEsTUFBTTtBQUN6RixhQUFPO0FBQUEsSUFDVCxXQUFXLE9BQU8sUUFBUSxZQUFZLElBQUksZ0JBQWdCLE1BQU07QUFDOUQsYUFBTyxPQUFPLFVBQVUsUUFBUSxXQUFXLElBQUksWUFBWSxJQUFJLE1BQU07QUFBQSxJQUV2RSxXQUFXLE9BQU8sUUFBUSxZQUFZLElBQUksZ0JBQWdCLFFBQVE7QUFDaEUsYUFBTyxPQUFPLFlBQVksUUFBUSxhQUFhLElBQUksU0FBUyxJQUFJLE1BQU07QUFBQSxJQUN4RSxXQUFXLE9BQU8sUUFBUSxZQUFZLElBQUksZUFBZSxPQUFPLElBQUksWUFBWSxTQUFTLFlBQVksSUFBSSxZQUFZLEtBQUssTUFBTSxFQUFFLE1BQU0sU0FBUztBQUMvSSxVQUFJLFNBQVMsSUFBSSxTQUFTLElBQUksTUFBTSxJQUFJLEVBQUUsTUFBTSxDQUFDO0FBQ2pELFVBQUksVUFBVyxJQUFJLFdBQVcsSUFBSSxTQUFTO0FBQzNDLFVBQUksUUFBUSxVQUFVLE9BQU87QUFDN0IsYUFBTyxPQUFPLFdBQVcsUUFBUSxZQUFZLFFBQVEsTUFBTTtBQUFBLElBQzdELFdBQVcsT0FBTyxRQUFRLFVBQVU7QUFDbEMsVUFBSSxRQUFRLFFBQVEsR0FBRyxLQUFLLEdBQUc7QUFDN0IsWUFBSSxRQUFRLEtBQUssTUFBTSxHQUFHLFFBQVEsUUFBUSxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUc7QUFDeEQsZUFBTyxlQUFlLFFBQVEsTUFBTSxRQUFRLE1BQU07QUFBQSxNQUNwRCxPQUFPO0FBQ0wsWUFBSSxNQUFNLEdBQUcsR0FBRztBQUNoQixZQUFJLElBQUksZUFBZSxPQUFPLElBQUksWUFBWSxTQUFTLFlBQVksSUFBSSxZQUFZLEtBQUssTUFBTSxFQUFFLE1BQU0sU0FBUztBQUM3RyxjQUFJLFFBQVEsVUFBVSxPQUFPLE1BQU07QUFDakMsbUJBQU8sWUFBWSxJQUFJLFlBQVksT0FBTztBQUFBLFVBQzVDLE9BQU87QUFDTCxtQkFBTyxDQUFDO0FBQ1IsaUJBQUssSUFBSSxHQUFHLElBQUksSUFBSSxRQUFRLElBQUksR0FBRyxLQUFLO0FBQ3RDLG1CQUFLLENBQUMsSUFBSSxjQUFjLFFBQVEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsTUFBTTtBQUFBLFlBQy9FO0FBQ0EsbUJBQU87QUFBQSxVQUNUO0FBQUEsUUFDRixPQUFPO0FBQ0wsY0FBSSxRQUFRLFVBQVUsT0FBTyxNQUFNO0FBQ2pDLG1CQUFPLGNBQWMsSUFBSSxlQUFlLElBQUksWUFBWSxPQUFPLElBQUksWUFBWSxPQUFPLFlBQVk7QUFBQSxVQUNwRyxPQUFPO0FBQ0wsbUJBQU8sQ0FBQztBQUNSLGlCQUFLLElBQUksR0FBRyxJQUFJLE9BQU8sS0FBSyxHQUFHLEdBQUcsSUFBSSxFQUFFLFFBQVEsSUFBSSxHQUFHLEtBQUs7QUFDMUQsbUJBQUssRUFBRSxDQUFDLENBQUMsSUFBSSxjQUFjLFFBQVEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEdBQUcsTUFBTTtBQUFBLFlBQzFGO0FBQ0EsbUJBQU87QUFBQSxVQUNUO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGLFdBQVcsT0FBTyxRQUFRLFlBQVk7QUFDcEMsYUFBTyxPQUFPLGNBQWMsT0FBTyxlQUFlLElBQUksU0FBUyxJQUFJLE1BQU07QUFBQSxJQUMzRSxPQUFPO0FBQ0wsYUFBTyxJQUFJLFNBQVM7QUFBQSxJQUN0QjtBQUFBLEVBQ0Y7OztBRnBHQSxNQUFPLGtCQUFRO0FBQUEsSUFDYixNQUFNLGtCQUFrQixRQUFRO0FBQzlCLFVBQUksU0FBUyxNQUFnQixJQUFJLGNBQWMsUUFBUTtBQUN2RCxVQUFJLE9BQU8sVUFBVTtBQUFVLGlCQUFTLE9BQU8sTUFBTTtBQUNyRCxZQUFNLE9BQWEsV0FBSyxVQUFVLENBQUMsQ0FBQztBQUVwQyxZQUFNLE9BQU8sTUFBTTtBQUNqQixZQUFJO0FBQ0YsVUFBVSxJQUFJLGNBQWMsVUFBVSxTQUFTLEVBQUUsR0FBRyxLQUFLLE1BQU0sQ0FBQyxDQUFDO0FBQUEsUUFDbkUsUUFBRTtBQUNBLFVBQVUsSUFBSSxjQUFjLFVBQVUsU0FBUyxDQUFDLENBQUMsQ0FBQztBQUFBLFFBQ3BEO0FBQUEsTUFDRjtBQUVBLFdBQUssR0FBUyxhQUFPLEtBQUssSUFBSTtBQUM5QixXQUFLLEdBQVMsYUFBTyxRQUFRLElBQUk7QUFDakMsV0FBSyxHQUFTLGFBQU8sUUFBUSxJQUFJO0FBRWpDLGFBQU87QUFBQSxJQUNUO0FBQUEsRUFDRjs7O0FHaEJBLGlCQUFzQixtQkFBbUIsS0FBSztBQUM1QyxRQUFJLENBQUMsS0FBSztBQUFNLGFBQU87QUFDdkIsUUFBSUUsT0FBTTtBQUFBLE1BQ1IsV0FBVztBQUFBLFFBQ1QsV0FBVyxDQUFDO0FBQUEsUUFDWixlQUFlLENBQUM7QUFBQSxNQUNsQjtBQUFBLE1BQ0EsT0FBTyxRQUFRLE1BQU07QUFDbkIsZUFBTyxjQUFNLE9BQU9BLEtBQUksSUFBSSxHQUFHLEdBQUcsR0FBRyxJQUFJO0FBQUEsTUFDM0M7QUFBQSxNQUNBLElBQUksS0FBSztBQUNQLFlBQUksT0FBTyxJQUFJLFNBQVM7QUFBVSxVQUFBQyxPQUFNO0FBQ3hDLGVBQU9ELEtBQUksVUFBVSxjQUFjQSxLQUFJLE1BQU0sSUFBSSxHQUFHLEtBQy9DQSxLQUFJLFVBQVUsY0FBYyxVQUFVLEdBQUcsS0FDekNBLEtBQUksSUFBSSxHQUFHO0FBQUEsTUFDbEI7QUFBQSxNQUNBLFVBQVUsSUFBSSxNQUFNLENBQUMsR0FBRztBQUFBLFFBQ3RCLElBQUlFLElBQUcsTUFBTTtBQUNYLGlCQUFPRixLQUFJLElBQUksSUFBSTtBQUFBLFFBQ3JCO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSDtBQUNBLG1CQUFlQyxTQUFRO0FBQ3JCLFlBQU0sU0FBUyxhQUFLO0FBQ3BCLFVBQUksT0FBTyxJQUFJLFNBQVMsVUFBVTtBQUNoQyxjQUFNRSxZQUFXLElBQUksS0FBSyxTQUFTLEdBQUcsSUFBSSxJQUFJLEtBQUssTUFBTSxHQUFHLEVBQUUsSUFBSSxJQUFJO0FBQ3RFLFlBQUksQ0FBQ0gsS0FBSSxVQUFVLFVBQVUsUUFBUTtBQUNuQyxjQUFJO0FBQ0YsWUFBQUEsS0FBSSxVQUFVLFlBQVksT0FBTyxNQUFNLE1BQU0sR0FBR0csMEJBQXlCLE9BQU8sR0FBRyxLQUFLO0FBQUEsVUFDMUYsUUFBRTtBQUFBLFVBQVE7QUFDVixjQUFJO0FBQ0YsWUFBQUgsS0FBSSxVQUFVLGNBQWMsVUFBVSxPQUFPLE1BQU0sTUFBTSxHQUFHRywwQkFBeUIsT0FBTyxHQUFHLEtBQUs7QUFBQSxVQUN0RyxRQUFFO0FBQUEsVUFBUTtBQUFBLFFBQ1o7QUFDQSxZQUNFSCxLQUFJLFVBQVUsVUFBVSxTQUFTLE1BQU0sS0FDcEMsQ0FBQ0EsS0FBSSxVQUFVLGdCQUFnQixNQUFNLEdBQ3hDO0FBQ0EsY0FBSTtBQUNGLFlBQUFBLEtBQUksVUFBVSxjQUFjLE1BQU0sSUFBSSxPQUFPLE1BQU0sTUFBTSxHQUFHRyxhQUFZLGVBQWUsT0FBTyxHQUFHLEtBQUs7QUFBQSxVQUN4RyxRQUFFO0FBQUEsVUFBUTtBQUFDO0FBQUEsUUFDYjtBQUFBLE1BQ0YsT0FBTztBQUNMLFFBQUFILEtBQUksVUFBVSxZQUFZLE9BQU8sS0FBSyxJQUFJLElBQUk7QUFDOUMsUUFBQUEsS0FBSSxVQUFVLGdCQUFnQixJQUFJO0FBQUEsTUFDcEM7QUFBQSxJQUNGO0FBQ0EsVUFBTUMsT0FBTTtBQUNaLFdBQU9EO0FBQUEsRUFDVDs7O0FDbERBLE1BQUFJLFNBQXVCO0FBS3ZCLGlCQUFlLFNBQVMsS0FBSyxZQUFZO0FBQ3ZDLFVBQU0sVUFBVSxZQUFJLFdBQVcsS0FBSyxTQUFTLFNBQVM7QUFDdEQsVUFBTSxVQUFVLE1BQU0sZ0JBQVEsa0JBQWtCLFVBQVU7QUFDMUQsVUFBTUMsT0FBTTtBQUFBLE1BQ1YsU0FBUztBQUFBLFFBQ1AsV0FBVztBQUFBLFVBQ1QsUUFBUSxDQUFDO0FBQUEsVUFDVCxNQUFNLENBQUM7QUFBQSxVQUNQLFFBQVEsQ0FBQztBQUFBLFVBQ1QsWUFBWSxDQUFDO0FBQUEsUUFDZjtBQUFBLFFBQ0EsUUFBUUMsT0FBTTtBQUNaLGNBQUksQ0FBQyxTQUFTO0FBQ1osZ0JBQUksT0FBT0QsS0FBSSxRQUFRLFVBQVUsS0FBS0MsS0FBSSxNQUFNO0FBQWEscUJBQU9ELEtBQUksUUFBUSxVQUFVLEtBQUtDLEtBQUk7QUFDbkcsZ0JBQUksS0FBSyxTQUFTLE1BQU0sT0FBTyxPQUFLLEVBQUUsU0FBU0EsS0FBSTtBQUFHLHFCQUFPRCxLQUFJLFFBQVEsVUFBVSxLQUFLQyxLQUFJLElBQUksZ0JBQVEsUUFBUUEsS0FBSTtBQUFBLFVBQ3RILE9BQU87QUFDTCxtQkFBTyxnQkFBUSxRQUFRQSxLQUFJO0FBQUEsVUFDN0I7QUFDQSxpQkFBTztBQUFBLFFBQ1Q7QUFBQSxRQUNBLFFBQVEsSUFBSSxNQUFNLENBQUMsR0FBRztBQUFBLFVBQ3BCLElBQUlDLElBQUcsTUFBTTtBQUNYLGdCQUFJLENBQUMsU0FBUztBQUNaLGtCQUFJLE9BQU9GLEtBQUksUUFBUSxVQUFVLE9BQU8sSUFBSSxNQUFNO0FBQWEsdUJBQU9BLEtBQUksUUFBUSxVQUFVLE9BQU8sSUFBSTtBQUN2RyxrQkFBSSxLQUFLLFNBQVMsUUFBUSxPQUFPLE9BQUssRUFBRSxTQUFTLElBQUk7QUFBRyx1QkFBT0EsS0FBSSxRQUFRLFVBQVUsT0FBTyxJQUFJLElBQUksZ0JBQVEsT0FBTyxJQUFJO0FBQUEsWUFDekgsT0FBTztBQUNMLHFCQUFPLGdCQUFRLE9BQU8sSUFBSTtBQUFBLFlBQzVCO0FBQ0EsbUJBQU87QUFBQSxVQUNUO0FBQUEsUUFDRixDQUFDO0FBQUEsUUFDRCxRQUFRLElBQUksTUFBTSxDQUFDLEdBQUc7QUFBQSxVQUNwQixJQUFJRSxJQUFHLE1BQU07QUFDWCxnQkFBSSxPQUFPRixLQUFJLFFBQVEsVUFBVSxPQUFPLElBQUksTUFBTTtBQUFhLHFCQUFPQSxLQUFJLFFBQVEsVUFBVSxPQUFPLElBQUk7QUFDdkcsZ0JBQUksT0FBTyxLQUFLLFNBQVMsUUFBUSxPQUFPLE9BQUssRUFBRSxTQUFTLElBQUk7QUFDNUQsZ0JBQUksQ0FBQztBQUFNLHFCQUFPO0FBQ2xCLGdCQUFJLEtBQUssTUFBTTtBQUNiLGtCQUFJLE9BQU8sSUFBSSxRQUFRLE9BQU8sU0FBUyxXQUFXO0FBQ2hELG9CQUFJLElBQUksTUFBTSxnQkFBUSxRQUFRLGlCQUFpQixLQUFLLE1BQU07QUFDMUQsZ0JBQUFBLEtBQUksUUFBUSxVQUFVLFdBQVcsSUFBSSxJQUFJO0FBQ3pDLHdCQUFRLENBQUM7QUFBQSxjQUNYLENBQUM7QUFDRCxjQUFBQSxLQUFJLFFBQVEsVUFBVSxPQUFPLElBQUksSUFBSTtBQUFBLGdCQUNuQyxNQUFNO0FBQ0oseUJBQU87QUFBQSxnQkFDVDtBQUFBLGdCQUNBLElBQUksUUFBUTtBQUNWLHlCQUFPQSxLQUFJLFFBQVEsVUFBVSxXQUFXLElBQUk7QUFBQSxnQkFDOUM7QUFBQSxjQUNGO0FBQUEsWUFDRixPQUFPO0FBQ0wsa0JBQUksUUFBUSxnQkFBUSxRQUFRLGFBQWEsS0FBSyxNQUFNO0FBQ3BELGtCQUFJO0FBQ0Ysb0JBQUksT0FBTyxPQUFPLFVBQVUsYUFBYTtBQUN2QyxrQkFBQUEsS0FBSSxRQUFRLFVBQVUsT0FBTyxJQUFJLElBQUksUUFBUSxPQUFPLE9BQU8sT0FBTyxFQUFFLE9BQU8sTUFBTTtBQUFFLDJCQUFPO0FBQUEsa0JBQU0sRUFBRSxDQUFDLElBQUk7QUFBQSxnQkFDekcsT0FBTztBQUNMLGtCQUFBQSxLQUFJLFFBQVEsVUFBVSxPQUFPLElBQUksSUFBSTtBQUFBLGdCQUN2QztBQUFBLGNBQ0YsUUFBRTtBQUNBLGdCQUFBQSxLQUFJLFFBQVEsVUFBVSxPQUFPLElBQUksSUFBSSxRQUFRLEVBQUUsT0FBTyxNQUFNO0FBQUUseUJBQU87QUFBQSxnQkFBTSxFQUFFLElBQUk7QUFBQSxjQUNuRjtBQUFBLFlBQ0Y7QUFDQSxtQkFBT0EsS0FBSSxRQUFRLFVBQVUsT0FBTyxJQUFJO0FBQUEsVUFDMUM7QUFBQSxRQUNGLENBQUM7QUFBQSxNQUNIO0FBQUEsTUFDQTtBQUFBLE1BQ0EsV0FBVztBQUFBLFFBQ1QsUUFBUSxLQUFLLE1BQU0sS0FBSyxVQUFVLEdBQUcsQ0FBQztBQUFBLFFBQ3RDO0FBQUEsUUFDQSxNQUFNLE1BQU0sbUJBQW1CLEdBQUc7QUFBQSxRQUNsQyxRQUFRLElBQUksa0JBQWtCO0FBQUEsUUFDOUIsZUFBZSxDQUFDO0FBQUEsTUFDbEI7QUFBQSxJQUNGO0FBRUEsV0FBT0E7QUFBQSxFQUNUO0FBRUEsV0FBUyx3QkFBd0I7QUFBQSxFQUVqQztBQUVBLE1BQU1BLE9BQU07QUFBQSxJQUNWLFdBQVc7QUFBQSxNQUNULGFBQWE7QUFBQSxNQUNiLFFBQWMsWUFBSyxDQUFDLENBQUM7QUFBQSxJQUN2QjtBQUFBLElBQ0EsU0FBUztBQUFBO0FBQUEsTUFFUCxXQUFXLENBQUM7QUFBQSxJQUNkO0FBQUEsSUFDQTtBQUFBLElBQ0EsTUFBTSxPQUFPO0FBQ1gsVUFBSUEsS0FBSSxVQUFVO0FBQWE7QUFDL0IsTUFBQUEsS0FBSSxVQUFVLGNBQWM7QUFDNUIsTUFBQUEsS0FBSSxRQUFRLFlBQVksTUFBTSxnQkFBUSxrQkFBa0Isc0JBQXNCO0FBQUEsSUFDaEY7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQUlBLE1BQU0sUUFBUSxLQUFLLGdCQUFnQixDQUFDLEdBQUc7QUFDckMsVUFBSSxDQUFDQSxLQUFJLFVBQVU7QUFBYSxjQUFNQSxLQUFJLEtBQUs7QUFDL0MsVUFBSSxJQUFJLFNBQVMsR0FBRztBQUFHLGNBQU0sSUFBSSxNQUFNLEdBQUcsRUFBRTtBQUM1QyxVQUFJQSxLQUFJLFFBQVEsVUFBVSxNQUFNLEdBQUc7QUFBRyxjQUFNLElBQUksTUFBTSxJQUFJLHNDQUFzQztBQUVoRyxVQUFJLFdBQVcsTUFBTSxNQUFNLEdBQUcsbUJBQW1CO0FBQ2pELFVBQUksU0FBUyxXQUFXO0FBQUssY0FBTSxJQUFJLE1BQU0sSUFBSSxnRUFBZ0U7QUFDakgsVUFBSSxXQUFXLE1BQU0sU0FBUyxLQUFLO0FBRW5DLFVBQUksYUFBYSxNQUFNLE1BQU0sR0FBRyxlQUFlO0FBQy9DLFVBQUksU0FBUyxXQUFXLFdBQVcsTUFBTSxNQUFNLFdBQVcsS0FBSyxJQUFJO0FBR25FLDRCQUFzQjtBQUFBLFFBQ3BCO0FBQUEsUUFDQTtBQUFBLFFBQ0EsUUFBUTtBQUFBLFVBQ04sWUFBWTtBQUFBLFVBQ1osU0FBUztBQUFBLFVBQ1QsT0FBTztBQUFBLFVBQ1AsR0FBRztBQUFBLFFBQ0w7QUFBQSxNQUNGLENBQUM7QUFFRCxVQUFJLGFBQWEsTUFBTSxNQUFNLEdBQUcsZUFBZTtBQUMvQyxVQUFJLFdBQVcsV0FBVztBQUFLLGNBQU0sSUFBSSxNQUFNLElBQUksOERBQThEO0FBQ2pILFVBQUlHLFVBQVMsTUFBTSxXQUFXLEtBQUs7QUFFbkMsTUFBQUgsS0FBSSxRQUFRLFVBQVUsTUFBTSxHQUFHLElBQUk7QUFBQSxRQUNqQztBQUFBLFFBQ0EsUUFBQUc7QUFBQSxRQUNBO0FBQUEsUUFDQSxRQUFRO0FBQUEsVUFDTixZQUFZO0FBQUEsVUFDWixTQUFTO0FBQUEsVUFDVCxPQUFPO0FBQUEsVUFDUCxHQUFHO0FBQUEsUUFDTDtBQUFBLFFBQ0EsT0FBTztBQUFBLFVBQ0wsZUFBZSxLQUFLLElBQUk7QUFBQSxRQUMxQjtBQUFBLE1BQ0Y7QUFFQSxZQUFNSCxLQUFJLEtBQUssR0FBRztBQUFBLElBQ3BCO0FBQUEsSUFDQSxNQUFNLE9BQU8sS0FBSztBQUNoQixVQUFJLENBQUNBLEtBQUksVUFBVTtBQUFhLGNBQU1BLEtBQUksS0FBSztBQUMvQyxVQUFJLENBQUNBLEtBQUksUUFBUSxVQUFVLE1BQU0sR0FBRztBQUFHLGNBQU0sSUFBSSxNQUFNLElBQUksa0NBQWtDO0FBQzdGLFVBQUlBLEtBQUksVUFBVSxPQUFPLE1BQU0sR0FBRztBQUFHLGNBQU0sSUFBSSxNQUFNLElBQUksbURBQW1EO0FBRTVHLFVBQUksT0FBT0EsS0FBSSxRQUFRLFVBQVUsTUFBTSxHQUFHO0FBRTFDLFVBQUksV0FBVyxNQUFNLE1BQU0sR0FBRyxtQkFBbUI7QUFDakQsVUFBSSxTQUFTLFdBQVc7QUFBSyxjQUFNLElBQUksTUFBTSxJQUFJLGdFQUFnRTtBQUNqSCxVQUFJLFdBQVcsTUFBTSxTQUFTLEtBQUs7QUFFbkMsVUFBSSxLQUFLLFNBQVMsU0FBUyxTQUFTO0FBQU0sZUFBTztBQUVqRCxVQUFJLGFBQWEsTUFBTSxNQUFNLEdBQUcsZUFBZTtBQUMvQyxVQUFJLFNBQVMsV0FBVyxXQUFXLE1BQU0sTUFBTSxXQUFXLEtBQUssSUFBSTtBQUVuRSxVQUFJLGFBQWEsTUFBTSxNQUFNLEdBQUcsZUFBZTtBQUMvQyxVQUFJLFdBQVcsV0FBVztBQUFLLGNBQU0sSUFBSSxNQUFNLElBQUksOERBQThEO0FBQ2pILFVBQUlHLFVBQVMsTUFBTSxXQUFXLEtBQUs7QUFFbkMsU0FBRyxRQUFRLFVBQVUsTUFBTSxHQUFHLElBQUk7QUFBQSxRQUNoQztBQUFBLFFBQ0EsUUFBQUE7QUFBQSxRQUNBO0FBQUEsUUFDQSxRQUFRLEtBQUs7QUFBQSxRQUNiLE9BQU87QUFBQSxVQUNMLGVBQWUsS0FBSyxJQUFJO0FBQUEsUUFDMUI7QUFBQSxNQUNGO0FBRUEsYUFBTztBQUFBLElBQ1Q7QUFBQSxJQUNBLE1BQU0sVUFBVSxLQUFLO0FBQ25CLFVBQUksQ0FBQ0gsS0FBSSxVQUFVO0FBQWEsY0FBTUEsS0FBSSxLQUFLO0FBQy9DLFVBQUksQ0FBQ0EsS0FBSSxRQUFRLFVBQVUsTUFBTSxHQUFHO0FBQUcsY0FBTSxJQUFJLE1BQU0sSUFBSSxrQ0FBa0M7QUFFN0YsYUFBT0EsS0FBSSxRQUFRLFVBQVUsTUFBTSxHQUFHO0FBRXRDLFVBQUk7QUFDRixjQUFNQSxLQUFJLE9BQU8sR0FBRztBQUFBLE1BQ3RCLFFBQUU7QUFBQSxNQUFRO0FBQUEsSUFDWjtBQUFBLElBQ0EsTUFBTSxLQUFLLEtBQUs7QUFDZCxVQUFJLENBQUNBLEtBQUksVUFBVTtBQUFhLGNBQU1BLEtBQUksS0FBSztBQUMvQyxVQUFJLENBQUNBLEtBQUksUUFBUSxVQUFVLE1BQU0sR0FBRztBQUFHLGNBQU0sSUFBSSxNQUFNLElBQUksa0NBQWtDO0FBQzdGLFVBQUksT0FBT0EsS0FBSSxRQUFRLFVBQVUsTUFBTSxHQUFHO0FBRTFDLFVBQUlBLEtBQUksVUFBVSxPQUFPLE1BQU0sR0FBRztBQUFHLGNBQU0sSUFBSSxNQUFNLElBQUksbUNBQW1DO0FBRTVGLFVBQUlJLE9BQU0sTUFBTUosS0FBSSxTQUFTLEtBQUssVUFBVSxxQkFBcUIsS0FBSztBQUN0RSxVQUFJLFlBQVlBLEtBQUksU0FBUyxLQUFLLFFBQVFJLElBQUc7QUFFN0MsWUFBTSxXQUFXLE9BQU87QUFFeEIsTUFBQUosS0FBSSxVQUFVLE9BQU8sTUFBTSxHQUFHLElBQUk7QUFBQSxRQUNoQztBQUFBLFFBQ0EsS0FBQUk7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsTUFBTSxPQUFPLEtBQUs7QUFDaEIsVUFBSSxDQUFDSixLQUFJLFVBQVU7QUFBYSxjQUFNQSxLQUFJLEtBQUs7QUFDL0MsVUFBSSxDQUFDQSxLQUFJLFFBQVEsVUFBVSxNQUFNLEdBQUc7QUFBRyxjQUFNLElBQUksTUFBTSxJQUFJLGtDQUFrQztBQUU3RixVQUFJLENBQUNBLEtBQUksVUFBVSxPQUFPLE1BQU0sR0FBRztBQUFHLGNBQU0sSUFBSSxNQUFNLElBQUksK0JBQStCO0FBRXpGLFVBQUksRUFBRSxXQUFXLEtBQUFJLEtBQUksSUFBSUosS0FBSSxVQUFVLE9BQU8sTUFBTSxHQUFHO0FBRXZELE1BQUFJLEtBQUksVUFBVSxjQUFjLFFBQVEsT0FBSyxPQUFPLE1BQU0sY0FBYyxFQUFFLENBQUM7QUFDdkUsTUFBQUEsS0FBSSxVQUFVLE9BQU8sS0FBSyxRQUFRO0FBQ2xDLFlBQU0sV0FBVyxTQUFTO0FBRTFCLGFBQU9KLEtBQUksVUFBVSxPQUFPLE1BQU0sR0FBRztBQUFBLElBQ3ZDO0FBQUEsSUFDQSxTQUFTLFFBQVEsS0FBSztBQUNwQixZQUFNLFNBQVM7QUFDZixhQUFPLEtBQUssTUFBTTtBQUFBLElBQ3BCO0FBQUEsSUFDQSxNQUFNLFVBQVU7QUFDZCxVQUFJLENBQUNBLEtBQUksVUFBVTtBQUFhLGNBQU1BLEtBQUksS0FBSztBQUMvQyxhQUFPLFFBQVEsSUFBSSxPQUFPLFFBQVFBLEtBQUksUUFBUSxVQUFVLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsT0FBTyxRQUFRLEVBQUUsT0FBTyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxNQUFNQSxLQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7QUFBQSxJQUN0SjtBQUFBLElBQ0EsTUFBTSxZQUFZO0FBQ2hCLFVBQUksQ0FBQ0EsS0FBSSxVQUFVO0FBQWEsY0FBTUEsS0FBSSxLQUFLO0FBQy9DLGFBQU8sUUFBUSxJQUFJLE9BQU8sS0FBS0EsS0FBSSxVQUFVLE9BQU8sS0FBSyxFQUFFLElBQUksU0FBT0EsS0FBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDO0FBQUEsSUFDeEY7QUFBQSxJQUNBLElBQUksS0FBSztBQUNQLGFBQU87QUFBQSxRQUNMLFFBQVFBLEtBQUksVUFBVSxPQUFPLE1BQU0sR0FBRztBQUFBLFFBQ3RDLFdBQVdBLEtBQUksUUFBUSxVQUFVLE1BQU0sR0FBRztBQUFBLE1BQzVDO0FBQUEsSUFDRjtBQUFBLElBQ0EsT0FBTyxDQUVQO0FBQUEsRUFDRjtBQUVBLE1BQU8scUJBQVFBOzs7QUN6UGYsTUFBTSxVQUFVLG9CQUFJLElBQUk7QUFDeEIsTUFBTSxXQUFXLG9CQUFJLElBQUk7QUFFekIsMEJBQXdCLEVBQUUsS0FBSyxNQUFNO0FBQ25DLG9CQUFRO0FBQUEsTUFDTjtBQUFBLE1BQ0FLLGdCQUFPO0FBQUEsTUFDUCxDQUFDLE1BQU0sU0FBUztBQUNkLGNBQU0sS0FBSyxLQUFLLENBQUM7QUFDakIsWUFBSSxHQUFHLFdBQVcsRUFBRSxRQUFRO0FBQVUsaUJBQU8sS0FBSyxHQUFHLElBQUk7QUFFekQsZ0JBQVEsSUFBSSxFQUFFO0FBRWQsV0FBRyxHQUFHLFdBQVcsT0FBTyxRQUFRO0FBQzlCLGNBQUk7QUFFSixjQUFJO0FBQ0YsbUJBQU8sS0FBSyxNQUFNLEdBQUc7QUFDckIsZ0JBQUksQ0FBQyxNQUFNLFFBQVEsSUFBSSxLQUFLLEtBQUssU0FBUyxLQUFLLEtBQUssU0FBUztBQUMzRCxvQkFBTTtBQUNSLGdCQUFJLE9BQU8sS0FBSyxDQUFDLEtBQUs7QUFBVSxvQkFBTTtBQUN0QyxnQkFBSSxPQUFPLEtBQUssQ0FBQyxLQUFLO0FBQVUsb0JBQU07QUFBQSxVQUN4QyxTQUFTLEtBQVA7QUFDQSxlQUFHO0FBQUEsY0FDRCxLQUFLLFVBQVU7QUFBQSxnQkFDYjtBQUFBLGdCQUNBO0FBQUEsa0JBQ0UsSUFBSTtBQUFBLGtCQUNKLE9BQU8sR0FBRztBQUFBLGdCQUNaO0FBQUEsY0FDRixDQUFDO0FBQUEsWUFDSDtBQUFBLFVBQ0Y7QUFFQSxnQkFBTSxDQUFDLFNBQVMsV0FBVyxTQUFTLElBQUk7QUFFeEMsZ0JBQU0sVUFBVSxTQUFTLElBQUksU0FBUztBQUV0QyxjQUFJLENBQUM7QUFDSCxtQkFBTyxHQUFHO0FBQUEsY0FDUixLQUFLLFVBQVU7QUFBQSxnQkFDYjtBQUFBLGdCQUNBO0FBQUEsa0JBQ0UsSUFBSTtBQUFBLGtCQUNKLE9BQU87QUFBQSxnQkFDVDtBQUFBLGNBQ0YsQ0FBQztBQUFBLFlBQ0g7QUFFRixjQUFJO0FBQ0YsZ0JBQUksV0FBVyxNQUFNLFFBQVEsU0FBUztBQUN0QyxlQUFHO0FBQUEsY0FDRCxLQUFLLFVBQVU7QUFBQSxnQkFDYjtBQUFBLGdCQUNBO0FBQUEsa0JBQ0UsSUFBSTtBQUFBLGtCQUNKLE1BQU07QUFBQSxnQkFDUjtBQUFBLGNBQ0YsQ0FBQztBQUFBLFlBQ0g7QUFBQSxVQUNGLFNBQVMsS0FBUDtBQUNBLGVBQUc7QUFBQSxjQUNELEtBQUssVUFBVTtBQUFBLGdCQUNiO0FBQUEsZ0JBQ0E7QUFBQSxrQkFDRSxJQUFJO0FBQUEsa0JBQ0osT0FBTyxHQUFHO0FBQUEsZ0JBQ1o7QUFBQSxjQUNGLENBQUM7QUFBQSxZQUNIO0FBQUEsVUFDRjtBQUFBLFFBQ0YsQ0FBQztBQUVELFdBQUcsR0FBRyxTQUFTLE1BQU0sUUFBUSxPQUFPLEVBQUUsQ0FBQztBQUFBLE1BQ3pDO0FBQUEsSUFDRjtBQUFBLEVBQ0YsQ0FBQztBQUVELFdBQVNDLEtBQUksV0FBVyxVQUFVO0FBQ2hDLFFBQUksT0FBTyxhQUFhO0FBQ3RCLFlBQU0sSUFBSSxNQUFNLGlDQUFpQztBQUNuRCxRQUFJLE9BQU8sWUFBWTtBQUNyQixZQUFNLElBQUksTUFBTSxrQ0FBa0M7QUFDcEQsUUFBSSxTQUFTLElBQUksU0FBUztBQUN4QixZQUFNLElBQUksTUFBTSwyQkFBMkI7QUFDN0MsYUFBUyxJQUFJLFdBQVcsUUFBUTtBQUNoQyxXQUFPLE1BQU07QUFDWCxlQUFTLE9BQU8sU0FBUztBQUFBLElBQzNCO0FBQUEsRUFDRjtBQUNBLFdBQVMsUUFBUSxjQUFjLE1BQU07QUFDbkMsUUFBSSxDQUFDLGFBQWEsSUFBSSxTQUFTO0FBQzdCLFlBQU0sSUFBSSxNQUFNLHlCQUF5QjtBQUMzQyxXQUFPLGFBQWEsSUFBSSxTQUFTLEVBQUUsR0FBRyxJQUFJO0FBQUEsRUFDNUM7QUFFQSxNQUFPLG9CQUFRO0FBQUEsSUFDYixLQUFBQTtBQUFBLElBQ0E7QUFBQSxFQUNGOzs7QUNqR0EsTUFBSSxpQkFBaUI7QUFFckIsTUFBSSxZQUFZO0FBRWhCLE1BQUk7QUFDSixNQUFJO0FBRUosTUFBTSxZQUFZO0FBQUEsSUFDaEIsSUFBSSxTQUFTO0FBQUUsYUFBTztBQUFBLElBQVE7QUFBQSxJQUM5QixJQUFJLFlBQVk7QUFBRSxhQUFPO0FBQUEsSUFBVztBQUFBLElBQ3BDLFNBQVM7QUFDUCxVQUFJLENBQUM7QUFBUSxlQUFPO0FBQ3BCLGFBQU8sSUFBSSxVQUFVLGNBQWMsUUFBUSxDQUFDLE1BQU0sT0FBTyxNQUFNLGNBQWMsRUFBRSxDQUFDO0FBQ2hGLGFBQU8sSUFBSSxVQUFVLE9BQU8sS0FBSyxRQUFRO0FBQ3pDLGFBQU8sV0FBVyxTQUFTO0FBQzNCLGVBQVM7QUFDVCxrQkFBWTtBQUNaLGFBQU87QUFBQSxJQUNUO0FBQUEsSUFDQSxNQUFNLEtBQUtDLFNBQVEsVUFBVTtBQUMzQixVQUFJLENBQUNBLFdBQVUsQ0FBQztBQUFVLGNBQU0sSUFBSSxNQUFNLHdEQUF3RDtBQUNsRyxVQUFJO0FBQVEsZUFBTztBQUNuQixVQUFJO0FBQVcsZUFBTztBQUN0QixrQkFBWTtBQUNaLFVBQUk7QUFhRixZQUFTLFdBQVQsU0FBa0IsTUFBTTtBQUFBLFFBRXhCO0FBZEEsWUFBSUMsT0FBTSxNQUFNLG1CQUFXLFNBQVMsVUFBVSwrQkFBK0I7QUFFN0UsWUFBSSxZQUFZLG1CQUFXLFNBQVNELFNBQVFDLElBQUc7QUFDL0MsWUFBSSxTQUFTLFNBQVMsU0FBUztBQUM3QixjQUFJLE1BQU0sVUFBVTtBQUNwQixjQUFJLFNBQVMsU0FBUyxVQUFVLENBQUM7QUFDakMsaUJBRUEsUUFBUSxVQUFVLEdBQUc7QUFBQSxRQUN2QixPQUFPO0FBQ0wscUJBQVcsT0FBTztBQUFBLFFBQ3BCO0FBS0EsaUJBQVM7QUFBQSxVQUNQO0FBQUEsVUFDQSxLQUFBQTtBQUFBLFVBQ0E7QUFBQSxRQUNGO0FBQ0Esb0JBQVk7QUFBQSxVQUNWO0FBQUEsUUFDRjtBQUFBLE1BQ0YsU0FBUyxLQUFQO0FBQ0EsdUJBQU8sTUFBTSx5Q0FBeUMsYUFBSyxTQUFTLFNBQVMsTUFBTSxJQUFJLEdBQUcsR0FBRztBQUM3RixlQUFPO0FBQUEsTUFDVDtBQUNBLGtCQUFZO0FBQ1osYUFBTztBQUFBLElBQ1Q7QUFBQSxFQUNGO0FBRUEsTUFBTUMsT0FBTTtBQUFBLElBQ1YsSUFBSSxVQUFVO0FBQ1osYUFBTztBQUFBLElBQ1Q7QUFBQSxJQUNBLElBQUksUUFBUSxPQUFPO0FBQ2pCLFVBQUksQ0FBQyxXQUFXLGVBQWUsRUFBRSxlQUFlO0FBQUcsY0FBTSxJQUFJLE1BQU0sNkRBQTZEO0FBQ2hJLHVCQUFpQjtBQUFBLElBQ25CO0FBQUEsSUFDQSxJQUFJLFlBQVk7QUFDZCxVQUFJLENBQUM7QUFBZ0IsY0FBTSxJQUFJLE1BQU0sMEJBQTBCO0FBQy9ELGFBQU87QUFBQSxJQUNUO0FBQUEsRUFDRjtBQUVBLE1BQU8sY0FBUUE7QUFFZixNQUFJLGVBQWU7QUFDbkIsb0JBQVU7QUFBQSxJQUNSO0FBQUEsSUFDQSxPQUFPLEVBQUUsUUFBQUYsU0FBUSxTQUFTLElBQUksQ0FBQyxNQUFNO0FBQ25DLFVBQUksQ0FBQztBQUNILGVBQU8sZUFBTyxLQUFLLDZEQUE2RDtBQUVsRixVQUFJLENBQUNBLFdBQVUsQ0FBQztBQUNkLGVBQU8sZUFBTyxLQUFLLDREQUE0RDtBQUVqRixVQUFJO0FBQ0YsZUFBTyxlQUFPLEtBQUssNkVBQTZFO0FBRWxHLHFCQUFlO0FBQ2YsZ0JBQVUsT0FBTztBQUNqQixZQUFNLElBQUksUUFBUSxDQUFDLE1BQU0sV0FBVyxHQUFHLENBQUMsQ0FBQztBQUN6QyxVQUFJLFVBQVUsTUFBTSxVQUFVLEtBQUtBLFNBQVEsUUFBUTtBQUNuRCxVQUFJO0FBQVMsdUJBQU8sS0FBSyxvQ0FBb0MsYUFBSyxTQUFTLFNBQVMsTUFBTSxJQUFJLElBQUk7QUFDbEcscUJBQWU7QUFBQSxJQUNqQjtBQUFBLEVBQ0Y7OztBQ3BHQSxNQUFPLG1CQUFRO0FBQUEsSUFDYixTQUFTLFdBQVcsZUFBZSxFQUFFO0FBQUEsSUFDckMsZ0JBQWdCLFdBQVcsZUFBZSxFQUFFO0FBQUEsRUFDOUM7OztBQ0hBLE1BQU8saUJBQVE7QUFBQTs7O0FDSWYsTUFBTSxpQkFBaUIsZ0JBQVEsaUJBQWlCLCtCQUErQixTQUFTO0FBRXhGLE1BQU0sbUJBQW1CO0FBQUEsSUFDdkIsS0FBSyxlQUFlO0FBQUEsSUFDcEIsUUFBUSxlQUFlO0FBQUEsSUFDdkIsTUFBTSxlQUFlO0FBQUEsSUFDckIsT0FBTyxlQUFlO0FBQUEsRUFDeEI7QUFFQSxNQUFNLFVBQU4sTUFBYztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFLWixZQUFZLFFBQVEsU0FBUyxXQUFXLFFBQVE7QUFFOUMsV0FBSyxlQUFlLFlBQUksTUFBTTtBQUFBO0FBQUEsc0JBRVosZUFBZSxXQUFXLGVBQWU7QUFBQSx3QkFDdkMsZUFBZTtBQUFBLHdCQUNmLGVBQWU7QUFBQTtBQUFBO0FBQUEsS0FHbEM7QUFDRCxXQUFLLGlCQUFpQixLQUFLLGFBQWEsY0FBYyxpQkFBaUI7QUFDdkUsV0FBSyxpQkFBaUIsS0FBSyxhQUFhLGNBQWMseUJBQXlCO0FBQy9FLFdBQUssVUFBVTtBQUNmLFdBQUssU0FBUztBQUNkLFdBQUssV0FBVztBQUVoQixXQUFLLFVBQVU7QUFDZixXQUFLLFdBQVc7QUFDaEIsV0FBSyxTQUFTO0FBRWQsWUFBTSxlQUFlLE1BQU07QUFDekIsWUFBSSxLQUFLLFlBQVksS0FBSztBQUFRO0FBQ2xDLGFBQUssS0FBSztBQUFBLE1BQ1o7QUFFQSxZQUFNLGVBQWUsTUFBTTtBQUN6QixZQUFJLEtBQUs7QUFBUTtBQUNqQixhQUFLLEtBQUs7QUFBQSxNQUNaO0FBRUEsV0FBSyxPQUFPLGlCQUFpQixjQUFjLFlBQVk7QUFDdkQsV0FBSyxPQUFPLGlCQUFpQixjQUFjLFlBQVk7QUFFdkQsVUFBSSxrQkFBa0IsZUFBTztBQUFBLFFBQzNCO0FBQUE7QUFBQSxRQUNrQyxDQUFDLFFBQVE7QUFDekMsY0FBSSxJQUFJLFNBQVMsY0FBYztBQUM3QixnQkFBSSxJQUFJLE9BQU8sV0FBVyxLQUFLLE1BQU0sR0FBRztBQUN0QyxzQkFBUSxJQUFJLGVBQWU7QUFBQSxnQkFDekIsS0FBSywyQkFBMkI7QUFDOUIsdUJBQUssV0FBVyxLQUFLLE9BQU8sYUFBYSx5QkFBeUIsTUFBTTtBQUN4RTtBQUFBLGdCQUNGO0FBQUEsZ0JBQ0EsS0FBSywwQkFBMEI7QUFDN0IsdUJBQUssVUFBVSxLQUFLLE9BQU8sYUFBYSx3QkFBd0I7QUFDaEU7QUFBQSxnQkFDRjtBQUFBLGdCQUNBLEtBQUssMkJBQTJCO0FBQzlCLHVCQUFLLFdBQVcsS0FBSyxPQUFPLGFBQWEseUJBQXlCO0FBQ2xFO0FBQUEsZ0JBQ0Y7QUFBQSxjQUNGO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUVBLFdBQUssVUFBVSxNQUFNO0FBQ25CLGFBQUssT0FBTyxvQkFBb0IsY0FBYyxZQUFZO0FBQzFELGFBQUssT0FBTyxvQkFBb0IsY0FBYyxZQUFZO0FBQzFELGFBQUssS0FBSztBQUNWLHdCQUFnQjtBQUFBLE1BQ2xCO0FBQUEsSUFDRjtBQUFBLElBRUEsSUFBSSxVQUFVO0FBQ1osYUFBTyxLQUFLLGVBQWU7QUFBQSxJQUM3QjtBQUFBLElBRUEsSUFBSSxRQUFRLE9BQU87QUFDakIsVUFBSSxPQUFPLFVBQVUsVUFBVTtBQUM3QixhQUFLLGVBQWUsWUFBWTtBQUFBLE1BQ2xDLE9BQU87QUFDTCxhQUFLLGVBQWUsWUFBWTtBQUNoQyxhQUFLLGdCQUFnQixjQUFjLEtBQUs7QUFBQSxNQUMxQztBQUFBLElBQ0Y7QUFBQSxJQUVBLE9BQU8sZUFBZTtBQUNwQixZQUFNLFNBQVMsU0FBUyxjQUFjLDhCQUE4QjtBQUVwRSxVQUFJLFlBQVksT0FBTyxjQUFjLDJCQUEyQjtBQUNoRSxVQUFJLENBQUMsV0FBVztBQUNkLG9CQUFZLFlBQUksTUFBTSxxRUFBcUU7QUFDM0YsZUFBTyxZQUFZLFNBQVM7QUFBQSxNQUM5QjtBQUNBLGdCQUFVLE1BQU0sWUFBWSxnQkFBZ0IsR0FBRyxPQUFPLHNCQUFzQixFQUFFLElBQUksUUFBUSxDQUFDLEtBQUs7QUFFaEcsYUFBTztBQUFBLElBQ1Q7QUFBQSxJQUVBLE9BQU87QUFDTCxVQUFJLEtBQUs7QUFBUztBQUNsQixXQUFLLFVBQVU7QUFFZixZQUFNLFlBQVksUUFBUSxhQUFhO0FBRXZDLFVBQUksS0FBSyxhQUFhLFFBQVE7QUFDNUIsYUFBSztBQUFBLFVBQ0gsS0FBSyxlQUFlLFFBQ2hCLEtBQUssa0JBQWtCLFdBQ3JCLEtBQUssZ0JBQWdCLFNBQ25CLEtBQUssaUJBQWlCLFVBQ3BCO0FBQUEsUUFDWjtBQUFBLE1BQ0YsT0FBTztBQUNMLGFBQUssa0JBQWtCLEtBQUssUUFBUTtBQUFBLE1BQ3RDO0FBR0EsZ0JBQVUsWUFBWSxLQUFLLFlBQVk7QUFDdkMsV0FBSyxhQUFhLFVBQVUsSUFBSSxTQUFTO0FBQUEsSUFDM0M7QUFBQSxJQUVBLGtCQUFrQixVQUFVO0FBQzFCLFlBQU0sZUFBZSxLQUFLLE9BQU8sc0JBQXNCO0FBRXZELFdBQUssYUFBYSxVQUFVLE9BQU8sR0FBRyxPQUFPLE9BQU8sZ0JBQWdCLENBQUM7QUFDckUsV0FBSyxlQUFlLFVBQVUsT0FBTyxZQUFZLFlBQVk7QUFFN0QsY0FBUSxVQUFVO0FBQUEsUUFDaEIsS0FBSyxPQUFPO0FBQ1YsZUFBSyxhQUFhLE1BQU0sTUFBTSxHQUFHLGFBQWEsTUFBTSxLQUFLLE9BQU8sZUFBZTtBQUMvRSxlQUFLLGFBQWEsTUFBTSxPQUFPLEdBQUcsYUFBYTtBQUMvQyxlQUFLLGFBQWEsVUFBVSxJQUFJLGlCQUFpQixHQUFHO0FBQ3BELGVBQUssZUFBZSxVQUFVLElBQUksVUFBVTtBQUM1QyxlQUFLLGVBQWUsWUFBWTtBQUNoQztBQUFBLFFBQ0Y7QUFBQSxRQUNBLEtBQUssVUFBVTtBQUNiLGVBQUssYUFBYSxNQUFNLE1BQU0sR0FBRyxhQUFhLE1BQU0sS0FBSyxPQUFPLGVBQWU7QUFDL0UsZUFBSyxhQUFhLE1BQU0sT0FBTyxHQUFHLGFBQWE7QUFDL0MsZUFBSyxhQUFhLFVBQVUsSUFBSSxpQkFBaUIsTUFBTTtBQUN2RCxlQUFLLGVBQWUsVUFBVSxJQUFJLFVBQVU7QUFDNUMsZUFBSyxlQUFlLFlBQVk7QUFDaEM7QUFBQSxRQUNGO0FBQUEsUUFDQSxLQUFLLFFBQVE7QUFDWCxlQUFLLGFBQWEsTUFBTSxNQUFNLEdBQUcsYUFBYTtBQUM5QyxlQUFLLGFBQWEsTUFBTSxPQUFPLEdBQUcsYUFBYSxPQUFPLEtBQUssT0FBTyxjQUFjO0FBQ2hGLGVBQUssYUFBYSxVQUFVLElBQUksaUJBQWlCLElBQUk7QUFDckQsZUFBSyxlQUFlLFVBQVUsSUFBSSxZQUFZO0FBQzlDLGVBQUssZUFBZSxVQUFVO0FBQzlCO0FBQUEsUUFDRjtBQUFBLFFBQ0EsS0FBSyxTQUFTO0FBQ1osZUFBSyxhQUFhLE1BQU0sTUFBTSxHQUFHLGFBQWE7QUFDOUMsZUFBSyxhQUFhLE1BQU0sT0FBTyxHQUFHLGFBQWEsT0FBTyxLQUFLLE9BQU8sY0FBYztBQUNoRixlQUFLLGFBQWEsVUFBVSxJQUFJLGlCQUFpQixLQUFLO0FBQ3RELGVBQUssZUFBZSxVQUFVLElBQUksWUFBWTtBQUM5QyxlQUFLLGVBQWUsVUFBVTtBQUM5QjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBRUEsZUFBZSxXQUFXO0FBQ3hCLGNBQVEsV0FBVztBQUFBLFFBQ2pCLEtBQUssY0FBYztBQUNqQixnQkFBTSxTQUFTLEtBQUssT0FBTyxzQkFBc0IsRUFBRSxPQUFRLEtBQUssT0FBTyxjQUFjO0FBQ3JGLGVBQUssYUFBYSxNQUFNLFlBQVksUUFBUSxHQUFHLFNBQVUsS0FBSyxhQUFhLGNBQWMsS0FBTTtBQUMvRjtBQUFBLFFBQ0Y7QUFBQSxRQUNBLEtBQUssWUFBWTtBQUNmLGdCQUFNLFNBQVMsS0FBSyxPQUFPLHNCQUFzQixFQUFFLE1BQU8sS0FBSyxPQUFPLGVBQWU7QUFDckYsZUFBSyxhQUFhLE1BQU0sWUFBWSxPQUFPLEdBQUcsU0FBVSxLQUFLLGFBQWEsZUFBZSxLQUFNO0FBQUEsUUFDakc7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBRUEsT0FBTztBQUNMLFVBQUksQ0FBQyxLQUFLO0FBQVM7QUFDbkIsV0FBSyxVQUFVO0FBRWYsV0FBSyxhQUFhLFVBQVUsT0FBTyxTQUFTO0FBQzVDLGlCQUFXLE1BQU07QUFDZixhQUFLLGFBQWEsT0FBTztBQUFBLE1BQzNCLEdBQUcsRUFBRTtBQUFBLElBQ1A7QUFBQSxJQUVBLElBQUksZUFBZTtBQUFFLGFBQU8sS0FBSyxPQUFPLHNCQUFzQixFQUFFLE1BQU0sS0FBSyxhQUFhLGdCQUFnQjtBQUFBLElBQUc7QUFBQSxJQUMzRyxJQUFJLGtCQUFrQjtBQUFFLGFBQU8sS0FBSyxPQUFPLHNCQUFzQixFQUFFLE1BQU0sS0FBSyxPQUFPLGVBQWUsS0FBSyxhQUFhLGdCQUFnQixPQUFPO0FBQUEsSUFBYTtBQUFBLElBQzFKLElBQUksZ0JBQWdCO0FBQUUsYUFBTyxLQUFLLE9BQU8sc0JBQXNCLEVBQUUsT0FBTyxLQUFLLGFBQWEsZUFBZTtBQUFBLElBQUc7QUFBQSxJQUM1RyxJQUFJLGlCQUFpQjtBQUFFLGFBQU8sS0FBSyxPQUFPLHNCQUFzQixFQUFFLE9BQU8sS0FBSyxPQUFPLGNBQWMsS0FBSyxhQUFhLGVBQWUsT0FBTztBQUFBLElBQVk7QUFBQSxFQUN6SjtBQUVBLFdBQVMsT0FBTyxRQUFRLFNBQVMsV0FBVyxRQUFRO0FBQ2xELFdBQU8sSUFBSSxRQUFRLFFBQVEsU0FBUyxRQUFRO0FBQUEsRUFDOUM7QUFFQSxjQUFJO0FBQUEsSUFDRjtBQUFBLElBQ0EsQ0FBQyxRQUFRO0FBQ1AsVUFBSSxVQUFVLE9BQU8sS0FBSyxJQUFJLGFBQWEsd0JBQXdCLEdBQUcsSUFBSSxhQUFhLHlCQUF5QixDQUFDO0FBQ2pILGNBQVEsV0FBVyxJQUFJLGFBQWEseUJBQXlCLE1BQU07QUFFbkUsYUFBTyxNQUFNO0FBQ1gsZ0JBQVEsUUFBUTtBQUFBLE1BQ2xCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFFQSxNQUFPLG1CQUFRLEVBQUUsT0FBTzs7O0FDek54QixNQUFNLGlCQUFpQjtBQUFBLElBQ3JCO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBRUEsV0FBUyxhQUFhLFVBQVU7QUFDOUIsUUFBSSxDQUFDLGVBQWUsU0FBUyxRQUFRO0FBQUcsWUFBTSxJQUFJLE1BQU0scUJBQXFCLG1DQUFtQyxlQUFlLEtBQUssSUFBSSxHQUFHO0FBQzNJLFVBQU0sU0FBUyxTQUFTLGNBQWMsOEJBQThCO0FBRXBFLFFBQUksZUFBZSxPQUFPLGNBQWMsc0NBQXNDO0FBQzlFLFFBQUksQ0FBQyxjQUFjO0FBQ2pCLHFCQUFlLFlBQUksTUFBTSxnRkFBZ0Y7QUFDekcsYUFBTyxZQUFZLFlBQVk7QUFBQSxJQUNqQztBQUNBLGlCQUFhLE1BQU0sWUFBWSxnQkFBZ0IsR0FBRyxPQUFPLHNCQUFzQixFQUFFLElBQUksUUFBUSxDQUFDLEtBQUs7QUFFbkcsUUFBSSxvQkFBb0IsYUFBYSxjQUFjLDhCQUE4QixVQUFVO0FBQzNGLFFBQUksQ0FBQyxtQkFBbUI7QUFDdEIsMEJBQW9CLFlBQUksTUFBTSx5Q0FBeUMsa0JBQWtCO0FBQ3pGLG1CQUFhLFlBQVksaUJBQWlCO0FBQUEsSUFDNUM7QUFFQSxXQUFPO0FBQUEsRUFDVDtBQUVBLFdBQVNHLE1BQUssU0FBUztBQUFBLElBQ3JCLFFBQVE7QUFBQSxJQUNSLFVBQVU7QUFBQSxJQUNWLFdBQVc7QUFBQSxJQUNYLFdBQVc7QUFBQSxJQUNYLFVBQVU7QUFBQSxJQUNWLFVBQVU7QUFBQSxFQUNaLElBQUksQ0FBQyxHQUFHO0FBQ04sVUFBTSxZQUFZLGFBQWEsUUFBUTtBQUV2QyxVQUFNLFdBQVcsWUFBSSxNQUFNO0FBQUEsNENBQ2U7QUFBQTtBQUFBO0FBQUEsZ0NBR1osQ0FBQyxXQUFXLFdBQVc7QUFBQTtBQUFBO0FBQUE7QUFBQSw2REFJTTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBSTFEO0FBRUQsYUFBUyxjQUFjLFVBQVUsRUFBRSxZQUFZO0FBRS9DLFFBQUksU0FBUztBQUNiLGFBQVMsTUFBTSxXQUFXO0FBQ3hCLFVBQUk7QUFBUTtBQUNaLGVBQVM7QUFFVCxlQUFTLFVBQVUsSUFBSSxTQUFTO0FBQ2hDLGlCQUFXLE1BQU07QUFDZixpQkFBUyxPQUFPO0FBRWhCLHNCQUFNO0FBQUEsVUFDSixTQUFTLGNBQWMsc0NBQXNDO0FBQUE7QUFBQSxVQUMzQixDQUFDLFFBQVE7QUFDekMsZ0JBQUksQ0FBRSxDQUFDLEdBQUcsSUFBSSxXQUFXLE9BQU8sQ0FBQyxFQUFFLE9BQU8sQ0FBQyxNQUFNLFNBQVMsT0FBTyxLQUFLLG1CQUFtQixDQUFDO0FBQUksa0JBQUksT0FBTztBQUFBLFVBQzNHO0FBQUEsUUFDRjtBQUFBLE1BQ0YsR0FBRyxHQUFHO0FBQ04sZ0JBQVUsU0FBUztBQUFBLElBQ3JCO0FBRUEsUUFBSSxPQUFPLFdBQVcsWUFBWTtBQUNoQyxlQUFTLFVBQVUsSUFBSSxXQUFXO0FBQ2xDLGVBQVMsVUFBVSxNQUFNO0FBQ3ZCLGdCQUFRLEtBQUs7QUFBQSxNQUNmO0FBQUEsSUFDRjtBQUVBLGtCQUFNLFNBQVMsU0FBUyxjQUFjLFFBQVEsR0FBRyxDQUFDLFFBQVE7QUFDeEQsVUFBSSxVQUFVLE1BQU07QUFDbEIsY0FBTSxNQUFNO0FBQUEsTUFDZDtBQUFBLElBQ0YsQ0FBQztBQUVELGNBQVUsUUFBUSxRQUFRO0FBQzFCLDBCQUFzQixNQUFNO0FBQzFCLGVBQVMsVUFBVSxPQUFPLFFBQVE7QUFDbEMsZUFBUyxjQUFjLFdBQVcsRUFBRSxVQUFVLElBQUksYUFBYTtBQUFBLElBQ2pFLENBQUM7QUFFRCxlQUFXLE1BQU07QUFDZixZQUFNLFNBQVM7QUFBQSxJQUNqQixHQUFHLE9BQU87QUFFVixXQUFPLE1BQU07QUFDWCxZQUFNLE9BQU87QUFBQSxJQUNmO0FBQUEsRUFDRjtBQUVBLE1BQU8sd0JBQVE7QUFBQSxJQUNiLE1BQU0sT0FBTyxPQUFPQSxPQUFNO0FBQUEsTUFDeEIsTUFBTSxDQUFDLE1BQU0sTUFBTSxDQUFDLE1BQU1BLE1BQUssTUFBTSxFQUFFLEdBQUcsS0FBSyxPQUFPLE9BQU8sQ0FBQztBQUFBLE1BQzlELE9BQU8sQ0FBQyxNQUFNLE1BQU0sQ0FBQyxNQUFNQSxNQUFLLE1BQU0sRUFBRSxHQUFHLEtBQUssT0FBTyxRQUFRLENBQUM7QUFBQSxNQUNoRSxTQUFTLENBQUMsTUFBTSxNQUFNLENBQUMsTUFBTUEsTUFBSyxNQUFNLEVBQUUsR0FBRyxLQUFLLE9BQU8sVUFBVSxDQUFDO0FBQUEsTUFDcEUsU0FBUyxDQUFDLE1BQU0sTUFBTSxDQUFDLE1BQU1BLE1BQUssTUFBTSxFQUFFLEdBQUcsS0FBSyxPQUFPLFVBQVUsQ0FBQztBQUFBLElBQ3RFLENBQUM7QUFBQSxFQUNIOzs7QUM1R0EsTUFBTSxFQUFFLE1BQU0sSUFBSUM7QUFFbEIsTUFBSSxVQUFVO0FBRWQsTUFBSSxhQUFhO0FBRWpCLE1BQUksVUFBVTtBQUVkLEdBQUMsWUFBWTtBQUNYLGNBQVUsT0FBTyxZQUFZO0FBQzNCLFVBQUk7QUFDSixhQUFPLE1BQU07QUFDWCxtQkFBVyxnQkFBUSxPQUFPLE9BQUssT0FBTyxPQUFPLENBQUMsRUFBRSxLQUFLLE9BQUssT0FBTyxNQUFNLGNBQWMsRUFBRSxTQUFTLEVBQUUsU0FBUyxvQkFBb0IsQ0FBQyxDQUFDLEVBQUUsS0FBSyxPQUFLLEVBQUUsWUFBWSxNQUFNLEdBQUc7QUFDcEssWUFBSTtBQUFVO0FBQ2QsY0FBTSxJQUFJLFFBQVEsT0FBSyxXQUFXLEdBQUcsR0FBRyxDQUFDO0FBQUEsTUFDM0M7QUFDQSxZQUFNQyxPQUFNLFVBQVUsVUFBVTtBQUFBLFFBQzlCLE9BQU8sQ0FBQyxvQkFBb0I7QUFBQSxRQUM1QixNQUFNLENBQUMsWUFBWTtBQUFBLE1BQ3JCLENBQUM7QUFFRCxnQkFBVSxDQUFDLENBQUNBLEtBQUksU0FBUyxDQUFDLENBQUNBLEtBQUk7QUFDL0IsYUFBT0E7QUFBQSxJQUNULEdBQUc7QUFFSCxpQkFBYSxPQUFPLFlBQVk7QUFDOUIsWUFBTUEsT0FBTSxDQUFDO0FBQ2IsWUFBTSxlQUFlO0FBQUEsUUFDbkIsV0FBVztBQUFBLFFBQ1gsVUFBVTtBQUFBLFFBQ1YsT0FBTztBQUFBLFFBQ1AsU0FBUztBQUFBLFFBQ1QsWUFBWTtBQUFBLFFBQ1osWUFBWTtBQUFBLE1BQ2Q7QUFFQSxVQUFJO0FBQ0YsWUFBSTtBQUNKLGVBQU8sTUFBTTtBQUNYLHFCQUFXLE9BQU8sUUFBUSxnQkFBUSxRQUFRLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxHQUFHLFNBQVMsRUFBRSxTQUFTLGtCQUFrQixDQUFDLEVBQUUsQ0FBQztBQUMxRyxjQUFJO0FBQVU7QUFDZCxnQkFBTSxJQUFJLFFBQVEsT0FBSyxXQUFXLEdBQUcsR0FBRyxDQUFDO0FBQUEsUUFDM0M7QUFFQSxjQUFNLG9CQUFvQixnQkFBUSxLQUFLLENBQUNDLElBQUcsUUFBUSxPQUFPLFFBQVEsRUFBRTtBQUVwRSxjQUFNLGVBQWUsZ0JBQVEsUUFBUSxFQUFFLFFBQVEsRUFBRSxTQUFTO0FBQzFELGNBQU0sYUFBYSxhQUFhLFNBQVMsb0RBQW9EO0FBRTdGLFFBQUFELEtBQUksT0FBTyxPQUFPLE9BQU8saUJBQWlCLEVBQUUsS0FBSyxPQUFLLEVBQUUsU0FBUyxFQUFFLFNBQVMsNEJBQTRCLENBQUM7QUFFekcsU0FBQyxHQUFHLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQyxFQUFFLGNBQWMsSUFBSSxNQUFNO0FBQ2xELGNBQUksWUFBWSxhQUFhLE1BQU0sSUFBSSxPQUFPLElBQUksT0FBTyxzQkFBc0IsY0FBYyxDQUFDLENBQUMsSUFBSSxDQUFDO0FBQ3BHLFVBQUFBLEtBQUksYUFBYSxJQUFJLENBQUMsSUFBSSxrQkFBa0IsU0FBUztBQUFBLFFBQ3ZELENBQUM7QUFFRCxrQkFBVSxPQUFPLEtBQUtBLElBQUcsRUFBRSxTQUFTO0FBQUEsTUFDdEMsU0FBUyxLQUFQO0FBQ0Esa0JBQVU7QUFDVix1QkFBTyxNQUFNLDBDQUEwQyxHQUFHO0FBQUEsTUFDNUQ7QUFFQSxhQUFPQTtBQUFBLElBQ1QsR0FBRztBQUVILGdCQUFZLFdBQVc7QUFBQSxFQUN6QixHQUFHO0FBR0gsTUFBTSxlQUFOLE1BQWtCO0FBQUEsSUFLaEIsT0FBTyxhQUFhO0FBQ2xCLFVBQUksQ0FBQztBQUFTLGVBQU8sZUFBTyxLQUFLLDhCQUE4QjtBQUUvRCxZQUFNLGdCQUFnQixnQkFBUSxPQUFPLE9BQUssT0FBTyxPQUFPLENBQUMsRUFBRSxLQUFLLE9BQUssT0FBTyxNQUFNLGNBQWMsRUFBRSxTQUFTLEVBQUUsU0FBUyxvQkFBb0IsQ0FBQyxDQUFDLEVBQUUsS0FBSyxPQUFLLEVBQUUsWUFBWSxNQUFNLEVBQUU7QUFDOUssWUFBTSxhQUFhLE9BQU8sS0FBSyxhQUFhLEVBQUUsS0FBSyxPQUFLLGNBQWMsQ0FBQyxHQUFHLFdBQVcsQ0FBQztBQUV0RixzQkFBUTtBQUFBLFFBQ047QUFBQSxRQUNBO0FBQUEsUUFDQSxTQUFVLFlBQVk7QUFDcEIsZ0JBQU0sVUFBVSxXQUFXLENBQUM7QUFDNUIscUJBQVcsQ0FBQyxJQUFJLGtCQUFtQixNQUFNO0FBQ3ZDLGtCQUFNLFNBQVMsTUFBTSxRQUFRLEtBQUssTUFBTSxHQUFHLElBQUk7QUFFL0MsbUJBQU8sQ0FBQyxVQUFVO0FBQ2hCLG9CQUFNLE1BQU0sT0FBTyxLQUFLO0FBRXhCLGtCQUFJLEtBQUssTUFBTSxPQUFPO0FBQ3BCLDZCQUFZLGVBQWUsSUFBSSxNQUFNLE9BQU8sS0FBSyxLQUFLO0FBQUEsY0FDeEQsV0FBVyxPQUFPLEtBQUssU0FBUyxZQUFZO0FBQzFDLDZCQUFZLGVBQWUsS0FBSyxNQUFNO0FBQUEsY0FDeEM7QUFFQSxxQkFBTztBQUFBLFlBQ1Q7QUFBQSxVQUNGO0FBRUEsaUJBQU87QUFBQSxRQUNUO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUVBLE9BQU8sZUFBZSxRQUFRLFFBQVEsWUFBWSxHQUFHO0FBQ25ELFVBQUksYUFBYSxLQUFLO0FBQXNCO0FBRTVDLFlBQU0sZ0JBQWdCLEtBQUssV0FBVyxJQUFJLE9BQU8sTUFBTSxDQUFDLE1BQU0sTUFBTTtBQUNsRSxjQUFNLG1CQUFtQixPQUFPLE1BQU07QUFDdEMsY0FBTSxRQUFRLEVBQUU7QUFDaEIsaUJBQVMsU0FBUyxNQUFNO0FBQ3RCLGdCQUFNLE1BQU0saUJBQWlCLEtBQUssTUFBTSxHQUFHLElBQUk7QUFFL0MsY0FBSSxDQUFDO0FBQUssbUJBQU87QUFFakIsZ0JBQU0sUUFBUSxJQUFJLE9BQU8sU0FBUyxJQUFJLE9BQU8sVUFBVSxPQUFPO0FBQzlELGNBQUksT0FBTztBQUNULHlCQUFZLGVBQWUsT0FBTyxLQUFLLEtBQUssQ0FBQyxDQUFDO0FBQUEsVUFDaEQsT0FBTztBQUNMLGtCQUFNLFFBQVEsSUFBSSxNQUFNLFdBQVcsSUFBSSxNQUFNLFdBQVc7QUFFeEQsZ0JBQUksT0FBTyxPQUFPLFFBQVEsWUFBWTtBQUNwQywyQkFBWSxlQUFlLE9BQU8sUUFBUSxLQUFLO0FBQUEsWUFDakQ7QUFBQSxVQUNGO0FBRUEsaUJBQU87QUFBQSxRQUNUO0FBRUEsY0FBTSxlQUFlO0FBQ3JCLGVBQU8sT0FBTyxPQUFPLGdCQUFnQjtBQUNyQyxhQUFLLFdBQVcsSUFBSSxrQkFBa0IsS0FBSztBQUUzQyxlQUFPO0FBQUEsTUFDVCxHQUFHO0FBRUgsYUFBTyxNQUFNLElBQUk7QUFBQSxJQUNuQjtBQUFBLElBRUEsT0FBTyxlQUFlLElBQUksS0FBSyxPQUFPO0FBQ3BDLFVBQUksQ0FBQyxLQUFLLFFBQVEsSUFBSSxFQUFFO0FBQUc7QUFFM0IsV0FBSyxRQUFRLElBQUksRUFBRSxFQUFFLFFBQVEsV0FBUztBQUNwQyxZQUFJO0FBQ0YsZ0JBQU0sS0FBSyxLQUFLO0FBQUEsUUFDbEIsU0FBUyxLQUFQO0FBQ0EseUJBQU8sTUFBTSxnQ0FBZ0MsT0FBTyxHQUFHO0FBQUEsUUFDekQ7QUFBQSxNQUNGLENBQUM7QUFBQSxJQUNIO0FBQUEsRUFDRjtBQW5GQSxNQUFNLGNBQU47QUFDRSxnQkFESSxhQUNHLHdCQUF1QjtBQUM5QixnQkFGSSxhQUVHLFdBQVUsb0JBQUksSUFBSTtBQUN6QixnQkFISSxhQUdHLGNBQWEsb0JBQUksUUFBUTtBQW9GbEMsV0FBUyxVQUFVLE9BQU87QUFDeEIsVUFBTSxFQUFFLEtBQUssSUFBSTtBQUNqQixRQUFJLFNBQVM7QUFBYSxhQUFPLE1BQU0sY0FBYyxXQUFXLFNBQVM7QUFFekUsUUFBSSxZQUFZLFdBQVc7QUFDM0IsUUFBSSxTQUFTLFdBQVc7QUFDdEIsVUFBSSxDQUFDLE1BQU07QUFBVSxjQUFNLFdBQVcsa0JBQWtCLE1BQU0sVUFBVSxNQUFNLEtBQUs7QUFBQSxJQUNyRixXQUFXLFNBQVMsWUFBWSxTQUFTLFNBQVM7QUFDaEQsa0JBQVksU0FBUyxXQUFXLFdBQVcsZUFBZSxXQUFXO0FBQ3JFLFVBQUksTUFBTTtBQUFRLGNBQU0sVUFBVSxNQUFNO0FBQUEsSUFDMUMsV0FBVyxTQUFTLFdBQVc7QUFDN0Isa0JBQVksV0FBVztBQUFBLElBQ3pCO0FBQ0EsUUFBSSxDQUFDLE1BQU07QUFBSSxZQUFNLEtBQUssR0FBRyxNQUFNLE1BQU0sUUFBUSxzQkFBc0IsR0FBRztBQUMxRSxRQUFJLE1BQU07QUFBUSxZQUFNLFFBQVE7QUFDaEMsVUFBTSxXQUFXO0FBRWpCLFFBQUksU0FBUyxVQUFVO0FBQ3JCLFlBQU0sQ0FBQyxRQUFRLFFBQVEsSUFBSSxNQUFNLFNBQVMsTUFBTSxXQUFXLEtBQUs7QUFDaEUsWUFBTSxpQkFBaUIsTUFBTTtBQUM3QixZQUFNLFVBQVU7QUFDaEIsWUFBTSxTQUFTLFNBQVUsSUFBSTtBQUMzQix1QkFBZSxFQUFFO0FBQ2pCLGlCQUFTLENBQUMsTUFBTTtBQUFBLE1BQ2xCO0FBQUEsSUFDRjtBQUVBLFdBQU8sTUFBTSxjQUFjLFdBQVcsS0FBSztBQUFBLEVBQzdDO0FBR0EsV0FBUyxrQkFBa0IsT0FBTztBQUNoQyxVQUFNLFNBQVMsT0FBSztBQUNsQixVQUFJLEVBQUUsU0FBUztBQUFTLGVBQU8sV0FBVyxDQUFDO0FBQzNDLGFBQU8sVUFBVSxDQUFDO0FBQUEsSUFDcEI7QUFDQSxVQUFNLGFBQWEsU0FBVSxPQUFPO0FBQ2xDLFlBQU0sUUFBUSxNQUFNLE1BQU0sSUFBSSxNQUFNLEVBQUUsT0FBTyxPQUFLLENBQUM7QUFDbkQsYUFBTyxNQUFNLGNBQWMsV0FBVyxPQUFPLE1BQU0sS0FBSztBQUFBLElBQzFEO0FBQ0EsV0FBTyxNQUFNLElBQUksTUFBTSxFQUFFLE9BQU8sT0FBSyxDQUFDO0FBQUEsRUFDeEM7QUFFQSxNQUFPLHVCQUFRO0FBQUEsSUFDYixXQUFXO0FBQUEsTUFDVCxTQUFTLFlBQVk7QUFBQSxNQUNyQixZQUFZLFlBQVk7QUFBQSxJQUMxQjtBQUFBLElBQ0EsTUFBTSxPQUFPLElBQUk7QUFDZixVQUFJLENBQUMsWUFBWSxRQUFRLElBQUksS0FBSztBQUFHLG9CQUFZLFFBQVEsSUFBSSxPQUFPLG9CQUFJLElBQUksQ0FBQztBQUM3RSxrQkFBWSxRQUFRLElBQUksS0FBSyxFQUFFLElBQUksRUFBRTtBQUVyQyxhQUFPLE1BQU07QUFDWCxvQkFBWSxRQUFRLElBQUksS0FBSyxFQUFFLE9BQU8sRUFBRTtBQUFBLE1BQzFDO0FBQUEsSUFDRjtBQUFBLElBQ0EsS0FBSyxPQUFPLFdBQVcsUUFBUTtBQUM3QixhQUFPLFFBQVEsS0FBSyxPQUFPLENBQUMsTUFBTSxNQUFNLGNBQWMsV0FBVyxPQUFPLE9BQU8sQ0FBQyxHQUFHLEdBQUcsRUFBRSxTQUFTLFFBQVEsTUFBTSxDQUFDLENBQUMsR0FBRyxNQUFNO0FBQUEsSUFDNUg7QUFBQSxJQUNBLFFBQVE7QUFDTixhQUFPLFFBQVEsTUFBTTtBQUFBLElBQ3ZCO0FBQUEsSUFDQSxPQUFPO0FBQUEsTUFDTCxLQUFLLE9BQU87QUFDVixlQUFPLGtCQUFrQixLQUFLO0FBQUEsTUFDaEM7QUFBQSxNQUNBLEtBQUssT0FBTztBQUNWLGVBQU8sQ0FBQyxVQUFVLE1BQU0sY0FBYyxXQUFXLE1BQU0sT0FBTyxrQkFBa0IsS0FBSyxDQUFDO0FBQUEsTUFDeEY7QUFBQSxJQUNGO0FBQUEsRUFDRjs7O0FDdk9BLE1BQU0sRUFBRSxPQUFBRSxPQUFNLElBQUlDO0FBRWxCLE1BQXFCLGdCQUFyQixjQUEyQ0QsT0FBTSxVQUFVO0FBQUEsSUFDekQsWUFBWSxPQUFPO0FBQ2pCLFlBQU0sS0FBSztBQUNYLFdBQUssUUFBUSxFQUFFLE9BQU8sS0FBSztBQUFBLElBQzdCO0FBQUEsSUFFQSxrQkFBa0IsT0FBTztBQUN2QixXQUFLLFNBQVMsRUFBRSxNQUFNLENBQUM7QUFDdkIscUJBQU8sTUFBTSxLQUFLO0FBQ2xCLFVBQUksT0FBTyxLQUFLLE1BQU0sWUFBWTtBQUFZLGFBQUssTUFBTSxRQUFRLEtBQUs7QUFBQSxJQUN4RTtBQUFBLElBRUEsU0FBUztBQUNQLFVBQUksS0FBSyxNQUFNO0FBQU8sZUFBTyxnQkFBQUEsT0FBQSxjQUFDLFNBQUksV0FBVSx3QkFDMUMsZ0JBQUFBLE9BQUEsY0FBQyxXQUFFLGtDQUFnQyxHQUNuQyxnQkFBQUEsT0FBQSxjQUFDLFdBQUcsR0FBRyxLQUFLLE1BQU0sT0FBUSxDQUM1QjtBQUNBLGFBQU8sS0FBSyxNQUFNO0FBQUEsSUFDcEI7QUFBQSxFQUNGO0FBRUEsTUFBTSxpQkFBaUIsY0FBYyxVQUFVO0FBQy9DLFNBQU8sZUFBZSxjQUFjLFdBQVcsVUFBVTtBQUFBLElBQ3ZELFlBQVk7QUFBQSxJQUNaLGNBQWM7QUFBQSxJQUNkLEtBQUssV0FBWTtBQUFFLFlBQU0sSUFBSSxNQUFNLDJDQUEyQztBQUFBLElBQUc7QUFBQSxJQUNqRixLQUFLLE1BQU07QUFBQSxFQUNiLENBQUM7OztBQzVCRCxNQUFPLHFCQUFRO0FBQUEsSUFDYjtBQUFBLElBQ0EsUUFBUUUsZ0JBQU8sV0FBVztBQUFBLElBQzFCLFVBQVVBLGdCQUFPLFdBQVc7QUFBQSxJQUM1QixNQUFNQSxnQkFBTyxXQUFXO0FBQUEsSUFDeEIsbUJBQW1CQSxnQkFBTyxXQUFXO0FBQUEsSUFDckMsV0FBV0EsZ0JBQU8sT0FBTyxXQUFXO0FBQUEsSUFDcEMsa0JBQWtCQSxnQkFBTyxPQUFPLFdBQVcsTUFBTTtBQUFBLElBQ2pELGFBQWFBLGdCQUFPLE9BQU8sV0FBVyxNQUFNO0FBQUEsSUFDNUMsY0FBY0EsZ0JBQU8sT0FBTyxXQUFXLE1BQU07QUFBQSxJQUM3QyxhQUFhQSxnQkFBTyxPQUFPLFdBQVcsTUFBTTtBQUFBLElBQzVDLGtCQUFrQkEsZ0JBQU8sT0FBTyxXQUFXLE1BQU07QUFBQSxJQUNqRCxTQUFTQSxnQkFBTyxXQUFXO0FBQUEsRUFDN0I7OztBQ2JBLE1BQU0sRUFBRSxPQUFBQyxRQUFPLGdCQUFnQixZQUFZLFFBQVEsVUFBVSxJQUFJQztBQUVqRSxNQUFPLGlCQUFRO0FBQUEsSUFDYixNQUFNO0FBQUEsTUFDSixhQUFhLE9BQU8sU0FBUyxFQUFFLFVBQVUsTUFBTSxTQUFTLE1BQU0sU0FBUyxPQUFPLE1BQU0sUUFBVyxVQUFVLE1BQVEsRUFBRSxJQUFJLENBQUMsR0FBRztBQUN6SCxlQUFPLElBQUksUUFBUSxDQUFDLFlBQVk7QUFDOUIsY0FBSSxDQUFDLE1BQU0sUUFBUSxPQUFPO0FBQUcsc0JBQVUsQ0FBQyxPQUFPO0FBQy9DLG9CQUFVLFFBQVEsSUFBSSxPQUFLLE9BQU8sTUFBTSxXQUFXRCxPQUFNLGNBQWMsV0FBVyxVQUFVLE1BQU0sQ0FBQyxJQUFJLENBQUM7QUFDeEcsZ0JBQU0sV0FBVyxPQUFPLFFBQVEsS0FBSyxDQUFDLFVBQVU7QUFDOUMsZ0JBQUlFLGNBQWE7QUFDakIsbUJBQU8sZ0JBQUFGLE9BQUEsY0FBQyxpQkFBYyxTQUFTLE1BQU07QUFBRSxzQkFBUSxLQUFLO0FBQUEsWUFBRyxLQUNyRCxnQkFBQUEsT0FBQTtBQUFBLGNBQUMsV0FBVztBQUFBLGNBQVg7QUFBQSxnQkFDQyxRQUFRO0FBQUEsZ0JBQ1Isb0JBQW9CLFNBQVMsV0FBVyxPQUFPLE9BQU8sTUFBTSxXQUFXLE9BQU8sT0FBTztBQUFBLGdCQUNyRixhQUFhLFdBQVcsYUFBSyxPQUFPLFNBQVM7QUFBQSxnQkFDN0MsWUFBWTtBQUFBLGdCQUNaLFVBQVUsTUFBTTtBQUFFLDBCQUFRLEtBQUs7QUFBRyx5QkFBTyxRQUFRLE1BQU0sUUFBUTtBQUFHLGtCQUFBRSxjQUFhO0FBQUEsZ0JBQU07QUFBQSxnQkFDckYsV0FBVyxNQUFNO0FBQUUsMEJBQVEsSUFBSTtBQUFHLHlCQUFPLFFBQVEsTUFBTSxRQUFRO0FBQUcsa0JBQUFBLGNBQWE7QUFBQSxnQkFBTTtBQUFBLGdCQUNwRixHQUFHO0FBQUEsZ0JBQ0osU0FBUyxNQUFNO0FBQUUsd0JBQU0sUUFBUTtBQUFHLDBCQUFRLEtBQUs7QUFBRyx5QkFBTyxRQUFRLE1BQU0sUUFBUTtBQUFBLGdCQUFHO0FBQUE7QUFBQSxjQUVsRixnQkFBQUYsT0FBQSxjQUFDLGlCQUFjLFNBQVMsTUFBTTtBQUFFLHdCQUFRLEtBQUs7QUFBQSxjQUFHLEtBQzdDLE9BQ0g7QUFBQSxZQUNGLENBQ0Y7QUFBQSxVQUNGLEdBQUcsRUFBRSxVQUFVLElBQUksQ0FBQztBQUNwQixjQUFJLFNBQVM7QUFDWCx1QkFBVyxNQUFNO0FBQ2Ysa0JBQUksQ0FBQyxZQUFZO0FBQ2Ysd0JBQVEsS0FBSztBQUNiLHVCQUFPLFFBQVEsTUFBTSxRQUFRO0FBQUEsY0FDL0I7QUFBQSxZQUNGLEdBQUcsT0FBTztBQUFBLFVBQ1o7QUFBQSxRQUNGLENBQUM7QUFBQSxNQUNIO0FBQUEsTUFDQSxLQUFLLFFBQVE7QUFDWCxZQUFJLENBQUMsVUFBVSxRQUFRLE1BQU07QUFBRyxpQkFBTztBQUN2Qyx1QkFBZSxTQUFTLEVBQUUsTUFBTSwyQkFBMkIsT0FBTyxDQUFDO0FBQ25FLGVBQU87QUFBQSxNQUNUO0FBQUEsTUFDQSxNQUFNLE9BQU8sU0FBUyxFQUFFLFVBQVUsTUFBTSxNQUFNLFFBQVcsVUFBVSxNQUFRLEVBQUUsSUFBSSxDQUFDLEdBQUc7QUFDbkYsZUFBTyxLQUFLLGFBQWEsT0FBTyxTQUFTLEVBQUUsU0FBUyxRQUFRLE1BQU0sS0FBSyxRQUFRLENBQUM7QUFBQSxNQUNsRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLE1BQU0sS0FBSztBQUNULGFBQU8sT0FBTyxRQUFRLE1BQU0sR0FBRztBQUFBLElBQ2pDO0FBQUEsRUFDRjs7O0FDbERBLFdBQVNHLGdCQUFlO0FBQ3RCLFVBQU0sU0FBUyxTQUFTLGNBQWMsOEJBQThCO0FBRXBFLFFBQUksZUFBZSxPQUFPLGNBQWMsMEJBQTBCO0FBQ2xFLFFBQUksQ0FBQyxjQUFjO0FBQ2pCLHFCQUFlLFlBQUksTUFBTSxvRUFBb0U7QUFDN0YsYUFBTyxZQUFZLFlBQVk7QUFBQSxJQUNqQztBQUNBLGlCQUFhLE1BQU0sWUFBWSxnQkFBZ0IsR0FBRyxPQUFPLHNCQUFzQixFQUFFLElBQUksUUFBUSxDQUFDLEtBQUs7QUFFbkcsV0FBTztBQUFBLEVBQ1Q7QUFFQSxNQUFNLFFBQVE7QUFBQSxJQUNaLE1BQU07QUFBQSxJQUNOLFNBQVM7QUFBQSxJQUNULE9BQU87QUFBQSxJQUNQLFNBQVM7QUFBQSxFQUNYO0FBR0EsV0FBU0MsTUFDUCxTQUNBO0FBQUEsSUFDRSxRQUFRO0FBQUEsSUFDUixVQUFVO0FBQUEsSUFDVixVQUFVO0FBQUEsSUFDVixXQUFXO0FBQUEsRUFDYixJQUFJLENBQUMsR0FDTDtBQUNBLFVBQU0sWUFBWUQsY0FBYTtBQUUvQixVQUFNLFdBQVcsWUFBSSxNQUFNO0FBQUEscUNBQ1E7QUFBQSxRQUM3QixXQUFXLEtBQU0sTUFBTSxLQUFLLEtBQUs7QUFBQTtBQUFBO0FBQUEsR0FHdEM7QUFFRCxhQUFTLGNBQWMsVUFBVSxFQUFFLFlBQVk7QUFFL0MsUUFBSSxTQUFTO0FBQ2IsYUFBUyxRQUFRO0FBQ2YsVUFBSTtBQUFRO0FBQ1osZUFBUztBQUVULGVBQVMsVUFBVSxJQUFJLFNBQVM7QUFDaEMsaUJBQVcsTUFBTTtBQUNmLGlCQUFTLE9BQU87QUFFaEIsY0FBTTtBQUFBLFVBQ0osU0FBUyxjQUFjLDBCQUEwQjtBQUFBO0FBQUEsVUFDZixDQUFDLFFBQVE7QUFDekMsZ0JBQUksQ0FBQyxJQUFJO0FBQW1CLGtCQUFJLE9BQU87QUFBQSxVQUN6QztBQUFBLFFBQ0Y7QUFBQSxNQUNGLEdBQUcsR0FBRztBQUFBLElBQ1I7QUFFQSxRQUFJLE9BQU8sV0FBVyxZQUFZO0FBQ2hDLGVBQVMsVUFBVSxJQUFJLFdBQVc7QUFDbEMsZUFBUyxVQUFVLE1BQU07QUFDdkIsZ0JBQVEsS0FBSztBQUFBLE1BQ2Y7QUFBQSxJQUNGO0FBRUEsY0FBVSxZQUFZLFFBQVE7QUFDOUIsMEJBQXNCLE1BQU07QUFDMUIsZUFBUyxVQUFVLE9BQU8sUUFBUTtBQUFBLElBQ3BDLENBQUM7QUFFRCxlQUFXLE9BQU8sT0FBTztBQUV6QixXQUFPLE1BQU07QUFDWCxZQUFNO0FBQUEsSUFDUjtBQUFBLEVBQ0Y7QUFFQSxNQUFPLGlCQUFRO0FBQUEsSUFDYixNQUFNLE9BQU8sT0FBT0MsT0FBTTtBQUFBLE1BQ3hCLE1BQU0sQ0FBQyxNQUFNLE1BQU0sQ0FBQyxNQUFNQSxNQUFLLE1BQU0sRUFBRSxHQUFHLEtBQUssT0FBTyxPQUFPLENBQUM7QUFBQSxNQUM5RCxPQUFPLENBQUMsTUFBTSxNQUFNLENBQUMsTUFBTUEsTUFBSyxNQUFNLEVBQUUsR0FBRyxLQUFLLE9BQU8sUUFBUSxDQUFDO0FBQUEsTUFDaEUsU0FBUyxDQUFDLE1BQU0sTUFBTSxDQUFDLE1BQU1BLE1BQUssTUFBTSxFQUFFLEdBQUcsS0FBSyxPQUFPLFVBQVUsQ0FBQztBQUFBLE1BQ3BFLFNBQVMsQ0FBQyxNQUFNLE1BQU0sQ0FBQyxNQUFNQSxNQUFLLE1BQU0sRUFBRSxHQUFHLEtBQUssT0FBTyxVQUFVLENBQUM7QUFBQSxJQUN0RSxDQUFDO0FBQUEsRUFDSDs7O0FDckZBLE1BQU0sZ0JBQWdCLGdCQUFRLGlCQUFpQiwwQkFBMEIsVUFBVSx1QkFBdUI7QUFFMUcsTUFBTyx5QkFBUTtBQUFBO0FBQUEsSUFFYixLQUFLLFFBQVE7QUFDWCxhQUFPLFVBQVUsa0JBQWtCO0FBQUEsUUFDakMsVUFBVTtBQUFBLHNCQUNNLGNBQWMsVUFBVSxjQUFjLGNBQWMsY0FBYztBQUFBLHdCQUNoRSxjQUFjO0FBQUE7QUFBQTtBQUFBLFFBR2hDLE9BQU8sQ0FBQyxTQUFTLFFBQVEsT0FBTztBQUFBLFFBQ2hDLE9BQU8sQ0FBQyxPQUFPO0FBQUEsUUFDZixPQUFPO0FBQ0wsaUJBQU87QUFBQSxZQUNMO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxRQUNBLFNBQVM7QUFBQSxVQUNQLFFBQVEsR0FBRztBQUNULGlCQUFLLE1BQU0sU0FBUyxDQUFDO0FBQUEsVUFDdkI7QUFBQSxRQUNGO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSDtBQUFBLEVBQ0Y7OztBQzNCQSxNQUFPQyxpQkFBUTtBQUFBOzs7QUNHZixrQkFBUSxVQUFVQyxjQUFPO0FBRXpCLE1BQU0sZUFBZSxnQkFBUSxpQkFBaUIsV0FBVyxhQUFhLFFBQVE7QUFFOUUsTUFBTyx3QkFBUTtBQUFBO0FBQUEsSUFFYixLQUFLLFFBQVE7QUFDWCxhQUFPLFVBQVUsaUJBQWlCO0FBQUEsUUFDaEMsVUFBVTtBQUFBLHNCQUNNLGFBQWE7QUFBQSxzQkFDYixhQUFhO0FBQUE7QUFBQTtBQUFBLHdCQUdYLGFBQWE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxRQWEvQixPQUFPO0FBQUEsVUFDTCxZQUFZO0FBQUEsWUFDVixVQUFVO0FBQ1IscUJBQU87QUFBQSxZQUNUO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxRQUNBLE9BQU8sQ0FBQyxxQkFBcUIsUUFBUTtBQUFBLFFBQ3JDLFNBQVM7QUFBQSxVQUNQLFFBQVEsT0FBTztBQUNiLGdCQUFJLFdBQVcsQ0FBQyxLQUFLO0FBQ3JCLGlCQUFLLE1BQU0scUJBQXFCLFFBQVE7QUFDeEMsaUJBQUssTUFBTSxVQUFVLEVBQUUsT0FBTyxVQUFVLE1BQU0sQ0FBQztBQUFBLFVBQ2pEO0FBQUEsUUFDRjtBQUFBLE1BQ0YsQ0FBQztBQUFBLElBQ0g7QUFBQSxFQUNGOzs7QUM1Q0EsTUFBSSxlQUFlLGdCQUFRLGlCQUFpQixnQkFBZ0IsV0FBVztBQUN2RSxNQUFJLGdCQUFnQixnQkFBUSxpQkFBaUIsU0FBUyxZQUFZLFlBQVksY0FBYztBQUU1RixNQUFPLHdCQUFRO0FBQUE7QUFBQSxJQUViLEtBQUssUUFBUTtBQUNYLGFBQU8sVUFBVSxpQkFBaUI7QUFBQSxRQUNoQyxVQUFVO0FBQUEsc0JBQ00sZUFBZTtBQUFBLHdCQUNiLGNBQWM7QUFBQSxtREFDYSxjQUFjO0FBQUE7QUFBQTtBQUFBO0FBQUEsUUFJM0QsT0FBTyxDQUFDLFNBQVMsZUFBZSxRQUFRLGFBQWEsT0FBTztBQUFBLFFBQzVELE9BQU8sQ0FBQyxRQUFRO0FBQUEsUUFDaEIsU0FBUztBQUFBLFVBQ1AsU0FBUyxPQUFPO0FBQ2QsaUJBQUssTUFBTSxVQUFVLEVBQUUsT0FBTyxPQUFPLE1BQU0sT0FBTyxNQUFNLENBQUM7QUFBQSxVQUMzRDtBQUFBLFFBQ0Y7QUFBQSxNQUNGLENBQUM7QUFBQSxJQUNIO0FBQUEsRUFDRjs7O0FDekJBLE1BQU9DLGlCQUFRO0FBQUE7OztBQ0lmLGtCQUFRLFVBQVVDLGNBQU87QUFFekIsTUFBTSxnQkFBZ0IsZ0JBQVEsaUJBQWlCLFVBQVUsb0JBQW9CLGtCQUFrQjtBQUMvRixNQUFNLGdCQUFnQixnQkFBUSxpQkFBaUIsMkJBQTJCLGdCQUFnQixNQUFNO0FBRWhHLE1BQU8seUJBQVE7QUFBQTtBQUFBLElBRWIsS0FBSyxRQUFRO0FBQ1gsYUFBTyxVQUFVLGtCQUFrQjtBQUFBLFFBQ2pDLFVBQVU7QUFBQSxzQkFDTSxjQUFjLFVBQVUsY0FBYywrQ0FBK0MsY0FBYztBQUFBLHdCQUNqRyxjQUFjO0FBQUEsd0JBQ2QsY0FBYztBQUFBO0FBQUE7QUFBQTtBQUFBLDhDQUlRLGNBQWMsVUFBVSxjQUFjLGdCQUFnQixjQUFjO0FBQUEsMkRBQ3ZELGNBQWM7QUFBQTtBQUFBLCtEQUVWLGNBQWM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFFBS3ZFLE9BQU87QUFDTCxpQkFBTztBQUFBLFlBQ0w7QUFBQSxZQUNBLFFBQVE7QUFBQSxVQUNWO0FBQUEsUUFDRjtBQUFBLFFBQ0EsT0FBTyxDQUFDLFdBQVcsY0FBYyxnQkFBZ0I7QUFBQSxRQUNqRCxPQUFPLENBQUMscUJBQXFCLFFBQVE7QUFBQSxRQUNyQyxVQUFVO0FBQ1IsaUJBQU8saUJBQWlCLFNBQVMsS0FBSyxPQUFPO0FBQUEsUUFDL0M7QUFBQSxRQUNBLFlBQVk7QUFDVixpQkFBTyxvQkFBb0IsU0FBUyxLQUFLLE9BQU87QUFBQSxRQUNsRDtBQUFBLFFBQ0EsU0FBUztBQUFBLFVBQ1AsY0FBYyxPQUFPLFFBQVE7QUFDM0IsaUJBQUssTUFBTSxxQkFBcUIsT0FBTyxLQUFLO0FBQzVDLGlCQUFLLE1BQU0sVUFBVSxFQUFFLE9BQU8sT0FBTyxPQUFPLE1BQU0sQ0FBQztBQUFBLFVBQ3JEO0FBQUEsVUFDQSxRQUFRLEdBQUc7QUFDVCxnQkFDRSxFQUFFLE9BQU8sVUFBVSxTQUFTLGNBQWMsTUFBTSxLQUM3QyxFQUFFLE9BQU8sVUFBVSxTQUFTLGNBQWMsS0FBSyxLQUMvQyxFQUFFLE9BQU8sVUFBVSxTQUFTLGNBQWMsS0FBSyxLQUMvQyxFQUFFLE9BQU8sVUFBVSxTQUFTLGNBQWMsTUFBTSxLQUNoRCxFQUFFLE9BQU8sVUFBVSxTQUFTLGNBQWMsTUFBTSxLQUNoRCxFQUFFLE9BQU8sVUFBVSxTQUFTLE1BQU0sR0FDckM7QUFDQSxtQkFBSyxTQUFTLENBQUMsS0FBSztBQUNwQjtBQUFBLFlBQ0Y7QUFDQSxpQkFBSyxTQUFTO0FBQUEsVUFDaEI7QUFBQSxRQUNGO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSDtBQUFBLEVBQ0Y7OztBQ2hFQSxNQUFPQyxpQkFBUTtBQUFBOzs7QUNJZixrQkFBUSxVQUFVQyxjQUFPO0FBRXpCLE1BQUlDLGdCQUFlLGdCQUFRLGlCQUFpQixZQUFZLGFBQWEsZ0JBQWdCO0FBQ3JGLE1BQUlDLGlCQUFnQixnQkFBUSxpQkFBaUIsZ0JBQWdCLGNBQWM7QUFDM0UsTUFBSUMsaUJBQWdCLGdCQUFRLGlCQUFpQixvQkFBb0IsYUFBYSxnQkFBZ0I7QUFFOUYsTUFBTywyQkFBUTtBQUFBO0FBQUEsSUFFYixLQUFLLFFBQVE7QUFDWCxhQUFPLFVBQVUsb0JBQW9CO0FBQUEsUUFDbkMsVUFBVTtBQUFBLHNCQUNNRCxlQUFjO0FBQUEsNkJBQ1BBLGVBQWMsZ0JBQWdCRCxjQUFhLFlBQVlFLGVBQWM7QUFBQTtBQUFBO0FBQUEsUUFHNUYsT0FBTyxDQUFDLFNBQVMsZUFBZSxhQUFhLFNBQVMsUUFBUSxNQUFNO0FBQUEsUUFDcEUsT0FBTyxDQUFDLFFBQVE7QUFBQSxRQUNoQixTQUFTO0FBQUEsVUFDUCxTQUFTLE9BQU87QUFDZCxpQkFBSyxNQUFNLFVBQVUsRUFBRSxPQUFPLE9BQU8sTUFBTSxPQUFPLE1BQU0sQ0FBQztBQUFBLFVBQzNEO0FBQUEsUUFDRjtBQUFBLE1BQ0YsQ0FBQztBQUFBLElBQ0g7QUFBQSxFQUNGOzs7QUN0QkEsTUFBT0Msc0JBQVE7QUFBQSxJQUNiLEtBQUssUUFBUTtBQUNYLDRCQUFhLEtBQUssTUFBTTtBQUN4QiwrQkFBZ0IsS0FBSyxNQUFNO0FBQzNCLDZCQUFjLEtBQUssTUFBTTtBQUN6Qiw0QkFBYSxLQUFLLE1BQU07QUFDeEIsNkJBQWMsS0FBSyxNQUFNO0FBQUEsSUFDM0I7QUFBQSxFQUNGOzs7QUNaTyxXQUFTLFVBQVUsSUFBSSxVQUFVO0FBRXRDLFFBQUksQ0FBQyxHQUFHLG9CQUFvQixDQUFDLEdBQUcsaUJBQWlCLFFBQVEsR0FBRztBQUMxRDtBQUFBLElBQ0Y7QUFFQSxPQUFHLGlCQUFpQixRQUFRLEVBQUU7QUFBQSxFQUNoQztBQUVPLFdBQVMsYUFBYSxJQUFJQyxPQUFNO0FBQ3JDLFVBQU0sV0FBVyxJQUFJLFNBQVM7QUFBQSxNQUM1QixVQUFVO0FBQUEsSUFDWixDQUFDO0FBRUQsV0FBTyxXQUFZO0FBRWpCLFVBQUksQ0FBQyxLQUFLLGtCQUFrQjtBQUMxQixhQUFLLG1CQUFtQixDQUFDO0FBQUEsTUFDM0I7QUFHQSxVQUFJLENBQUMsS0FBSyxpQkFBaUIsR0FBRyxRQUFRQSxLQUFJLEdBQUc7QUFDM0MsYUFBSyxpQkFBaUIsR0FBRyxRQUFRQSxLQUFJLElBQUk7QUFBQSxNQUMzQztBQUVBLGVBQVM7QUFFVCxhQUFPLEdBQUcsS0FBSyxJQUFJO0FBQUEsSUFDckI7QUFBQSxFQUNGOzs7QUM1QkEsTUFBTyxjQUFRO0FBQUEsSUFDYixZQUFZO0FBQUEsTUFDVixLQUFLLFFBQVE7QUFDWCxRQUFBQyxvQkFBYyxLQUFLLE1BQU07QUFBQSxNQUMzQjtBQUFBLElBQ0Y7QUFBQSxJQUNBLE9BQU87QUFBQSxNQUNMLE1BQU0sT0FBTztBQUNYLGVBQU8sQ0FBQyxPQUFPLEtBQUs7QUFDbEIsZ0JBQU0sSUFBSSxRQUFRLGFBQVcsV0FBVyxTQUFTLEdBQUcsQ0FBQztBQUFBLFFBQ3ZEO0FBQ0EsZUFBTztBQUFBLE1BQ1Q7QUFBQSxNQUNBLElBQUksS0FBSztBQUNQLGVBQU8sQ0FBQyxDQUFDLE9BQU87QUFBQSxNQUNsQjtBQUFBLElBQ0Y7QUFBQSxJQUNBLElBQUksTUFBTTtBQUNSLGFBQU8sT0FBTztBQUFBLElBQ2hCO0FBQUEsSUFDQSxPQUFPO0FBQUEsTUFDTCxVQUFVO0FBQUEsUUFDUjtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7OztBQzNCQSxrQkFBUSxVQUFVLGNBQVk7QUFXOUIsTUFBTyxhQUFRO0FBQUEsSUFDYjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0Y7OztBQ1JBLGdCQUFNLE9BQU8sTUFBTSw0QkFBNEI7QUFFL0MsV0FBUyxTQUFTQyxNQUFLO0FBQ3JCLFdBQU8sSUFBSSxNQUFNLE9BQU9BLHlEQUF3RDtBQUFBLEVBQ2xGO0FBRUEsTUFBTyxjQUFRO0FBQUEsSUFDYixZQUFZO0FBQUEsTUFDVjtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBLElBQUksTUFBTTtBQUNSLFlBQUksQ0FBQyxZQUFJO0FBQVMsZ0JBQU0sU0FBUyxLQUFLO0FBQ3RDLGVBQU87QUFBQSxNQUNUO0FBQUEsTUFDQSxJQUFJLFVBQVU7QUFDWixZQUFJLENBQUMsWUFBSTtBQUFTLGdCQUFNLFNBQVMsU0FBUztBQUMxQyxlQUFPO0FBQUEsTUFDVDtBQUFBLE1BQ0EsSUFBSSxVQUFVO0FBQ1osWUFBSSxDQUFDLFlBQUk7QUFBUyxnQkFBTSxTQUFTLFNBQVM7QUFDMUMsZUFBTztBQUFBLE1BQ1Q7QUFBQSxNQUNBLElBQUksVUFBVTtBQUNaLFlBQUksQ0FBQyxZQUFJO0FBQVMsZ0JBQU0sU0FBUyxTQUFTO0FBQzFDLGVBQU87QUFBQSxNQUNUO0FBQUEsTUFDQSxJQUFJLGFBQWE7QUFDZixZQUFJLENBQUMsWUFBSTtBQUFTLGdCQUFNLFNBQVMsWUFBWTtBQUM3QyxlQUFPO0FBQUEsTUFDVDtBQUFBLE1BQ0EsSUFBSSxXQUFXO0FBQ2IsWUFBSSxDQUFDLFlBQUk7QUFBUyxnQkFBTSxTQUFTLFVBQVU7QUFDM0MsZUFBTztBQUFBLE1BQ1Q7QUFBQSxNQUNBLElBQUksWUFBWTtBQUNkLFlBQUksQ0FBQyxZQUFJO0FBQVMsZ0JBQU0sU0FBUyxXQUFXO0FBQzVDLGVBQU87QUFBQSxNQUNUO0FBQUEsSUFDRjtBQUFBLElBQ0EsY0FBYztBQUFBLE1BQ1o7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxFQUNGOzs7QUMvREEsb0JBQVUsSUFBSSxvQkFBb0IsT0FBTyxFQUFFLElBQUksSUFBSSxDQUFDLE1BQU07QUFDeEQsUUFBSSxDQUFDO0FBQUs7QUFFVixVQUFNLGdCQUFRLE9BQU8sT0FBTyxlQUFlLEdBQUcsSUFBSTtBQUNsRCxVQUFNLElBQUksUUFBUSxPQUFLLFdBQVcsR0FBRyxHQUFHLENBQUM7QUFDekMsVUFBTSxnQkFBUSxPQUFPLE9BQU8sZUFBZSxHQUFHLElBQUk7QUFFbEQsVUFBTSxVQUFVLE1BQU0sZUFBTyxLQUFLO0FBQUEsTUFDaEMsTUFBTSxLQUFLLE9BQU8sOEJBQThCO0FBQUEsTUFDaEQsTUFBTSxLQUFLLE9BQU8sc0NBQXNDLEdBQUc7QUFBQSxJQUM3RDtBQUVBLFFBQUksQ0FBQztBQUFTO0FBRWQsUUFBSTtBQUNGLFlBQU0sbUJBQVcsS0FBSyxHQUFHO0FBQUEsSUFDM0IsU0FBUyxLQUFQO0FBQ0EsNEJBQWMsS0FBSyxNQUFNLEdBQUcsT0FBTyxFQUFFLFNBQVMsSUFBTSxDQUFDO0FBQUEsSUFDdkQ7QUFBQSxFQUNGLENBQUM7OztBQ3pCRCxNQUFPQyxpQkFBUTtBQUFBOzs7QUNBZixNQUFPLG9CQUFRO0FBQUE7QUFBQSxJQUViLEtBQUssUUFBUTtBQUNYLGFBQU87QUFBQSxRQUNMO0FBQUEsUUFDQTtBQUFBLFVBQ0UsVUFBVTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsVUFjVixPQUFPO0FBQ0wsbUJBQU87QUFBQSxjQUNMLE9BQU87QUFBQSxjQUNQLFNBQVM7QUFBQSxjQUNULFNBQVM7QUFBQSxnQkFDUDtBQUFBLGtCQUNFLE9BQU87QUFBQSxrQkFDUCxPQUFPO0FBQUEsZ0JBQ1Q7QUFBQSxnQkFDQTtBQUFBLGtCQUNFLE9BQU87QUFBQSxrQkFDUCxPQUFPO0FBQUEsZ0JBQ1Q7QUFBQSxnQkFDQTtBQUFBLGtCQUNFLE9BQU87QUFBQSxrQkFDUCxPQUFPO0FBQUEsZ0JBQ1Q7QUFBQSxjQUNGO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGOzs7QUMzQ0EsTUFBT0MsaUJBQVE7QUFBQTs7O0FDR2Ysa0JBQVEsVUFBVUMsY0FBTztBQUV6QixNQUFPLG9DQUFRO0FBQUE7QUFBQSxJQUViLEtBQUssUUFBUTtBQUNYLGFBQU87QUFBQSxRQUNMO0FBQUEsUUFDQTtBQUFBLFVBQ0UsVUFBVTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsVUFpQlYsT0FBTztBQUNMLG1CQUFPO0FBQUEsY0FDTCxZQUFZO0FBQUEsY0FDWixvQkFBb0I7QUFBQSxZQUN0QjtBQUFBLFVBQ0Y7QUFBQSxVQUNBLFNBQVM7QUFBQSxZQUNQLFlBQVksYUFBSztBQUFBLFVBQ25CO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjs7O0FDeENBLE1BQU8sd0JBQVE7QUFBQTtBQUFBLElBRWIsS0FBSyxRQUFRO0FBQ1gsYUFBTztBQUFBLFFBQ0w7QUFBQSxRQUNBO0FBQUEsVUFDRSxVQUFVO0FBQUEsUUFDWjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjs7O0FDVkEsTUFBTyxxQkFBUTtBQUFBO0FBQUEsSUFFYixLQUFLLFFBQVE7QUFDWCxhQUFPO0FBQUEsUUFDTDtBQUFBLFFBQ0E7QUFBQSxVQUNFLFVBQVU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFVBS1YsT0FBTztBQUNMLG1CQUFPO0FBQUEsY0FDTCxZQUFZO0FBQUEsZ0JBQ1Y7QUFBQSxrQkFDRSxNQUFNO0FBQUEsa0JBQ04sS0FBSztBQUFBLGtCQUNMLE1BQU07QUFBQSxvQkFDSixTQUFTO0FBQUEsb0JBQ1QsSUFBSTtBQUFBLGtCQUNOO0FBQUEsa0JBQ0EsYUFBYTtBQUFBLG9CQUNYLFNBQVM7QUFBQSxvQkFDVCxJQUFJO0FBQUEsa0JBQ047QUFBQSxrQkFDQSxVQUFVO0FBQUEsb0JBQ1I7QUFBQSxzQkFDRSxNQUFNO0FBQUEsc0JBQ04sT0FBTztBQUFBLG9CQUNUO0FBQUEsb0JBQ0E7QUFBQSxzQkFDRSxNQUFNO0FBQUEsc0JBQ04sT0FBTztBQUFBLG9CQUNUO0FBQUEsa0JBQ0Y7QUFBQSxrQkFDQSxTQUFTO0FBQUEsb0JBQ1A7QUFBQSxzQkFDRSxJQUFJO0FBQUEsc0JBQ0osTUFBTTtBQUFBLHNCQUNOLE9BQU87QUFBQSxvQkFDVDtBQUFBLG9CQUNBO0FBQUEsc0JBQ0UsSUFBSTtBQUFBLHNCQUNKLE1BQU07QUFBQSxzQkFDTixPQUFPO0FBQUEsb0JBQ1Q7QUFBQSxrQkFDRjtBQUFBLGtCQUNBLFNBQVM7QUFBQSxrQkFDVCxRQUFRO0FBQUEsa0JBQ1IsV0FBVztBQUFBLGdCQUNiO0FBQUEsY0FDRjtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjs7O0FDcERBLE1BQU8sZ0JBQVE7QUFBQTtBQUFBLElBRWIsS0FBSyxRQUFRO0FBQ1gsd0JBQVMsS0FBSyxNQUFNO0FBQ3BCLHdDQUF3QixLQUFLLE1BQU07QUFDbkMsNEJBQWEsS0FBSyxNQUFNO0FBQ3hCLHlCQUFVLEtBQUssTUFBTTtBQUFBLElBQ3ZCO0FBQUEsRUFDRjs7O0FDWEEsTUFBTyx3QkFBUTtBQUFBO0FBQUEsSUFFYixLQUFLLFFBQVE7QUFDWCxhQUFPLFVBQVUsaUJBQWlCO0FBQUEsUUFDaEMsT0FBTyxDQUFDLFVBQVUsV0FBVztBQUFBLFFBQzdCLFVBQVU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFFBS1YsU0FBUztBQUFBLFVBQ1AsUUFBUSxPQUFPO0FBQ2IsMkJBQU87QUFBQSxjQUNMO0FBQUEsY0FDQTtBQUFBLGdCQUNFLFdBQVcsS0FBSztBQUFBLGdCQUNoQixRQUFRLEtBQUs7QUFBQSxnQkFDYixNQUFNO0FBQUEsa0JBQ0o7QUFBQSxnQkFDRjtBQUFBLGNBQ0Y7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGLENBQUM7QUFBQSxJQUNIO0FBQUEsRUFDRjs7O0FDMUJBLE1BQU8sdUJBQVE7QUFBQTtBQUFBLElBRWIsS0FBSyxRQUFRO0FBQ1gsYUFBTyxVQUFVLGdCQUFnQjtBQUFBLFFBQy9CLE9BQU8sQ0FBQyxVQUFVLFdBQVc7QUFBQSxRQUM3QixVQUFVO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxRQUtWLFNBQVM7QUFBQSxVQUNQLFNBQVMsTUFBTTtBQUNiLDJCQUFPO0FBQUEsY0FDTDtBQUFBLGNBQ0E7QUFBQSxnQkFDRSxXQUFXLEtBQUs7QUFBQSxnQkFDaEIsUUFBUSxLQUFLO0FBQUEsZ0JBQ2I7QUFBQSxjQUNGO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSDtBQUFBLEVBQ0Y7OztBQ3pCRSxhQUFRO0FBQUEsSUFDTixRQUFVO0FBQUEsSUFDVixLQUFPO0FBQUEsSUFDUCxRQUFVO0FBQUEsSUFDVixPQUFTO0FBQUEsSUFDVCxPQUFTO0FBQUEsSUFDVCxRQUFVO0FBQUEsSUFDVixVQUFZO0FBQUEsSUFDWixRQUFVO0FBQUEsSUFDVixXQUFhO0FBQUEsSUFDYixTQUFXO0FBQUEsRUFDYjs7O0FDVkYsTUFBTyx3QkFBUTtBQUFBO0FBQUEsSUFFYixLQUFLLFFBQVE7QUFDWCxhQUFPO0FBQUEsUUFDTDtBQUFBLFFBQ0E7QUFBQSxVQUNFLE9BQU8sQ0FBQyxVQUFVLFdBQVc7QUFBQSxVQUM3QixVQUFVO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxVQW9CVixPQUFPO0FBQ0wsbUJBQU87QUFBQSxjQUNMO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGOzs7QUNuQ0EsTUFBTyx1QkFBUTtBQUFBO0FBQUEsSUFFYixLQUFLLFFBQVE7QUFDWCxhQUFPLFVBQVUsZ0JBQWdCO0FBQUEsUUFDL0IsT0FBTyxDQUFDLFVBQVUsV0FBVztBQUFBLFFBQzdCLFVBQVU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFFBS1YsU0FBUztBQUFBLFVBQ1AsU0FBUyxNQUFNO0FBQ2IsMkJBQU87QUFBQSxjQUNMO0FBQUEsY0FDQTtBQUFBLGdCQUNFLFdBQVcsS0FBSztBQUFBLGdCQUNoQixRQUFRLEtBQUs7QUFBQSxnQkFDYjtBQUFBLGNBQ0Y7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGLENBQUM7QUFBQSxJQUNIO0FBQUEsRUFDRjs7O0FDeEJBLE1BQU8scUJBQVE7QUFBQTtBQUFBLElBRWIsS0FBSyxRQUFRO0FBQ1gsYUFBTztBQUFBLFFBQ0w7QUFBQSxRQUNBO0FBQUEsVUFDRSxPQUFPLENBQUMsVUFBVSxXQUFXO0FBQUEsVUFDN0IsVUFBVTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsVUFvQlYsT0FBTztBQUNMLG1CQUFPO0FBQUEsY0FDTDtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjs7O0FDbkNBLE1BQU8sd0JBQVE7QUFBQTtBQUFBLElBRWIsS0FBSyxRQUFRO0FBQ1gsYUFBTyxVQUFVLGlCQUFpQjtBQUFBLFFBQ2hDLE9BQU8sQ0FBQyxVQUFVLFdBQVc7QUFBQSxRQUM3QixVQUFVO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxRQUtWLFNBQVM7QUFBQSxVQUNQLFNBQVMsTUFBTTtBQUNiLDJCQUFPO0FBQUEsY0FDTDtBQUFBLGNBQ0E7QUFBQSxnQkFDRSxXQUFXLEtBQUs7QUFBQSxnQkFDaEIsUUFBUSxLQUFLO0FBQUEsZ0JBQ2I7QUFBQSxjQUNGO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSDtBQUFBLEVBQ0Y7OztBQ3hCQSxNQUFPLDBCQUFRO0FBQUE7QUFBQSxJQUViLEtBQUssUUFBUTtBQUNYLGFBQU8sVUFBVSxtQkFBbUI7QUFBQSxRQUNsQyxPQUFPLENBQUMsVUFBVSxXQUFXO0FBQUEsUUFDN0IsVUFBVTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsUUFLVixTQUFTO0FBQUEsVUFDUCxTQUFTLE1BQU07QUFDYiwyQkFBTztBQUFBLGNBQ0w7QUFBQSxjQUNBO0FBQUEsZ0JBQ0UsV0FBVyxLQUFLO0FBQUEsZ0JBQ2hCLFFBQVEsS0FBSztBQUFBLGdCQUNiO0FBQUEsY0FDRjtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0YsQ0FBQztBQUFBLElBQ0g7QUFBQSxFQUNGOzs7QUMxQkEsTUFBT0MsaUJBQVE7QUFBQTs7O0FDVWYsa0JBQVEsVUFBVUMsY0FBTztBQUV6QixNQUFPLGlCQUFRO0FBQUE7QUFBQSxJQUViLEtBQUssUUFBUTtBQUNYLDRCQUFhLEtBQUssTUFBTTtBQUN4QiwyQkFBWSxLQUFLLE1BQU07QUFDdkIsMkJBQVksS0FBSyxNQUFNO0FBQ3ZCLDRCQUFhLEtBQUssTUFBTTtBQUN4Qiw4QkFBZSxLQUFLLE1BQU07QUFDMUIsNEJBQWEsS0FBSyxNQUFNO0FBQ3hCLHlCQUFVLEtBQUssTUFBTTtBQUFBLElBQ3ZCO0FBQUEsRUFDRjs7O0FDdkJBLE1BQU9DLGlCQUFRO0FBQUE7OztBQ01mLGtCQUFRLFVBQVVDLGNBQU87QUFFekIsTUFBTyxtQ0FBUTtBQUFBO0FBQUEsSUFFYixLQUFLLFFBQVE7QUFDWCxhQUFPO0FBQUEsUUFDTDtBQUFBLFFBQ0E7QUFBQSxVQUNFLFVBQVU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsVUFlVixPQUFPO0FBQ0wsbUJBQU87QUFBQSxjQUNMLFVBQVU7QUFBQSxjQUNWLEtBQUs7QUFBQSxZQUNQO0FBQUEsVUFDRjtBQUFBLFVBQ0EsVUFBVTtBQUFBLFlBQ1IsV0FBVztBQUFBLGNBQ1QsV0FBWTtBQUNWLHVCQUFPLG1CQUFXLElBQUksS0FBSyxHQUFHO0FBQUEsY0FDaEM7QUFBQSxjQUNBO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxVQUNBLFVBQVU7QUFDUixzQkFBVSxNQUFNLFdBQVc7QUFBQSxVQUM3QjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7OztBQ2pEQSxNQUFPQyxpQkFBUTtBQUFBOzs7QUNLZixrQkFBUSxVQUFVQyxjQUFPO0FBRXpCLE1BQU8sK0JBQVE7QUFBQTtBQUFBLElBRWIsS0FBSyxRQUFRO0FBQ1gsYUFBTztBQUFBLFFBQ0w7QUFBQSxRQUNBO0FBQUEsVUFDRSxVQUFVO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxVQWtEVixPQUFPLENBQUMsV0FBVztBQUFBLFVBQ25CLE9BQU87QUFDTCxtQkFBTztBQUFBLGNBQ0wsaUJBQWlCO0FBQUEsWUFDbkI7QUFBQSxVQUNGO0FBQUEsVUFDQSxTQUFTO0FBQUEsWUFDUCxZQUFZLGFBQUs7QUFBQSxZQUNqQixjQUFjLGFBQUs7QUFBQSxZQUNuQixxQkFBcUI7QUFDbkIsa0JBQUksS0FBSyxVQUFVLFdBQVc7QUFBQSxjQUU5QixPQUFPO0FBQUEsY0FFUDtBQUFBLFlBQ0Y7QUFBQSxZQUNBLFNBQVM7QUFDUCxtQkFBSztBQUNMLGtCQUFJLEtBQUssa0JBQWtCO0FBQUcscUJBQUssa0JBQWtCLEtBQUssVUFBVSxTQUFTLFNBQVM7QUFBQSxZQUN4RjtBQUFBLFlBQ0EsWUFBWTtBQUNWLG1CQUFLO0FBQ0wsa0JBQUksS0FBSyxtQkFBbUIsS0FBSyxVQUFVLFNBQVM7QUFBUSxxQkFBSyxrQkFBa0I7QUFBQSxZQUNyRjtBQUFBLFlBQ0EsWUFBWSxXQUFXO0FBQ3JCLDZCQUFPLEtBQUssS0FBSyxTQUFTO0FBQUEsWUFDNUI7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjs7O0FDM0ZBLE1BQU8sZ0JBQVE7QUFBQTtBQUFBLElBRWIsS0FBSyxRQUFRO0FBQ1gsbUNBQW1CLEtBQUssTUFBTTtBQUM5Qix1Q0FBdUIsS0FBSyxNQUFNO0FBQUEsSUFDcEM7QUFBQSxFQUNGOzs7QUNMQSxNQUFPQyxzQkFBUTtBQUFBO0FBQUEsSUFFYixLQUFLLFFBQVE7QUFDWCxxQkFBaUIsS0FBSyxNQUFNO0FBQzVCLG9CQUFlLEtBQUssTUFBTTtBQUFBLElBQzVCO0FBQUEsRUFDRjs7O0FDUEEsTUFBT0Msc0JBQVE7QUFBQTtBQUFBLElBRWIsS0FBSyxRQUFRO0FBQ1gsTUFBQUEsb0JBQVcsS0FBSyxNQUFNO0FBQ3RCLG9CQUFNLEtBQUssTUFBTTtBQUFBLElBQ25CO0FBQUEsRUFDRjs7O0FDQUEsa0JBQVEsVUFBVUMsY0FBTztBQUV6QjtBQUNFLFFBQUksU0FBUyxTQUFTLGNBQWMsUUFBUTtBQUM1QyxXQUFPLE1BQU07QUFDYixhQUFTLEtBQUssWUFBWSxNQUFNO0FBQUEsRUFDbEM7QUFFQSxjQUFJLE1BQU0sbURBQW1ELENBQUMsUUFBUTtBQUNwRSxrQkFBTTtBQUFBLE1BQ0osSUFBSSxjQUFjLGdEQUFnRDtBQUFBLE1BQ2xFLENBQUMsWUFBWTtBQUNYLGdCQUFRLGNBQWMsYUFBSyxPQUFPLFVBQVU7QUFBQSxNQUM5QztBQUFBLElBQ0Y7QUFFQSxrQkFBTTtBQUFBLE1BQ0osSUFBSSxjQUFjLDJDQUEyQztBQUFBLE1BQzdELENBQUMsYUFBYTtBQUNaLGlCQUFTLE9BQU87QUFBQSxNQUNsQjtBQUFBLElBQ0Y7QUFFQSxrQkFBTTtBQUFBLE1BQ0osSUFBSSxjQUFjLG1EQUFtRDtBQUFBLE1BQ3JFO0FBQUEsSUFDRjtBQUFBLEVBQ0YsQ0FBQztBQUVELE1BQUksaUJBQWlCO0FBRXJCLE1BQU0sb0JBQW9CLGdCQUFRLGlCQUFpQixXQUFXLGFBQWEsUUFBUTtBQUNuRixNQUFNLGdCQUFnQixnQkFBUSxpQkFBaUIsVUFBVSxxQkFBcUI7QUFDOUUsTUFBTSxnQkFBZ0IsZ0JBQVEsaUJBQWlCLFdBQVcsWUFBWTtBQUN0RSxjQUFJLE1BQU0sOERBQThELENBQUMsUUFBUTtBQUUvRSxrQkFBTTtBQUFBLE1BQ0osSUFBSSxjQUFjLGtFQUFrRTtBQUFBLE1BQ3BGLENBQUMsYUFBYTtBQUNaLGlCQUFTLGNBQWMsYUFBSyxPQUFPLFVBQVU7QUFFN0MsWUFBSSxnQkFBZ0I7QUFjbEIsY0FBUyxjQUFULFNBQXFCLElBQUksTUFBTSxnQkFBZ0IsSUFBSTtBQUNqRCxnQkFBSUMsT0FBTSxZQUFJLE1BQU0sdUJBQXVCLHFDQUFxQyxpQkFBaUIsY0FBYyxRQUFRLGNBQWMsUUFBUSxjQUFjLFdBQVcsWUFBWTtBQUVsTCxvQkFBUSxLQUFLQSxJQUFHO0FBRWhCLFlBQUFBLEtBQUksY0FBYyxDQUFDLE1BQU07QUFDdkIsa0JBQUk7QUFBRyxnQkFBQUEsS0FBSSxVQUFVLElBQUksY0FBYyxVQUFVLFVBQVU7QUFBQTtBQUN0RCxnQkFBQUEsS0FBSSxVQUFVLE9BQU8sY0FBYyxVQUFVLFVBQVU7QUFBQSxZQUM5RDtBQUVBLFlBQUFBLEtBQUksWUFBWSxlQUFlLGdCQUFnQixFQUFFO0FBRWpELFlBQUFBLEtBQUksVUFBVSxNQUFNO0FBQ2xCLHNCQUFRLFFBQVEsQ0FBQyxNQUFNLEVBQUUsWUFBWSxLQUFLLENBQUM7QUFDM0MsY0FBQUEsS0FBSSxZQUFZLElBQUk7QUFDcEIsNkJBQWUsY0FBYztBQUFBLFlBQy9CO0FBQ0EsbUJBQU9BO0FBQUEsVUFDVDtBQS9CQSxjQUFJLFlBQVksWUFBSSxRQUFRLFVBQVUsQ0FBQyxFQUFFLElBQUk7QUFFN0Msb0JBQVU7QUFBQSxZQUNSLFlBQUksTUFBTSxlQUFlLGtCQUFrQixpQkFBaUI7QUFBQSxVQUM5RDtBQUVBLGdCQUFNLG1CQUFtQixZQUFJLE1BQU07QUFBQSx3QkFDbkIsY0FBYyxVQUFVLGNBQWM7QUFBQTtBQUFBLFNBRXJEO0FBRUQsY0FBSSxVQUFVLENBQUM7QUFzQmYsMkJBQWlCLFlBQVksWUFBWSxRQUFRLGFBQUssT0FBTyxNQUFNLENBQUMsQ0FBQztBQUNyRSwyQkFBaUIsWUFBWSxZQUFZLHdCQUF3QixhQUFLLE9BQU8sc0JBQXNCLENBQUMsQ0FBQztBQUNyRywyQkFBaUIsWUFBWSxZQUFZLFlBQVksYUFBSyxPQUFPLFVBQVUsQ0FBQyxDQUFDO0FBQzdFLDJCQUFpQixZQUFZLFlBQVksU0FBUyxhQUFLLE9BQU8saUJBQWlCLEdBQUcsa0JBQWtCLENBQUM7QUFFckcsb0JBQVUsWUFBWSxnQkFBZ0I7QUFBQSxRQUN4QztBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQ0Esa0JBQU07QUFBQSxNQUNKLElBQUksY0FBYyxnRUFBZ0U7QUFBQSxNQUNsRjtBQUFBLElBQ0Y7QUFBQSxFQUNGLENBQUM7QUFFRCxXQUFTLHdCQUF3QixRQUFRO0FBQ3ZDLFdBQU8sYUFBYSxXQUFXLGdCQUFnQjtBQUMvQyxXQUFPLGFBQWEsU0FBUyw0QkFBNEI7QUFDekQsV0FBTyxZQUFZO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQTBCckI7QUFHQSxHQUFDLFlBQVk7QUFDWCxVQUFNLFdBQUcsSUFBSSxNQUFNLEtBQUs7QUFFeEIsVUFBTSxhQUFhLFlBQUksTUFBTTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FRNUI7QUFHRCxVQUFNLFNBQVMsSUFBSSxVQUFVO0FBQUEsTUFDM0IsT0FBTztBQUNMLGVBQU87QUFBQSxVQUNMLGFBQWE7QUFBQSxRQUNmO0FBQUEsTUFDRjtBQUFBLE1BQ0EsVUFBVTtBQUNSLHlCQUFpQjtBQUFBLE1BQ25CO0FBQUEsSUFDRixDQUFDO0FBRUQsZUFBRyxJQUFJLFdBQVcsS0FBSyxNQUFNO0FBQzdCLElBQUFDLG9CQUFjLEtBQUssTUFBTTtBQUN6QixXQUFPLE1BQU0sVUFBVTtBQUV2QixnQkFBSSxNQUFNLHlRQUF5USxDQUFDLFFBQVE7QUFFMVIsVUFBSSxlQUFlLFlBQUksUUFBUSxLQUFLLENBQUMsRUFBRSxJQUFJO0FBQzNDLG1CQUFhLGdCQUFnQixVQUFVO0FBQUEsSUFDekMsQ0FBQztBQUFBLEVBQ0gsR0FBRzs7O0FDcEtILEdBQUMsWUFBWTtBQUVYLFFBQUk7QUFDSixXQUFPLE1BQU07QUFDWCxlQUFTLFNBQVMsY0FBYywwQkFBMEI7QUFDMUQsVUFBSTtBQUFRO0FBQ1osWUFBTSxJQUFJLFFBQVEsYUFBVyxXQUFXLFNBQVMsR0FBRyxDQUFDO0FBQUEsSUFDdkQ7QUFFQSxXQUFPLFlBQVk7QUFDbkIsV0FBTyxhQUFhLFdBQVcsV0FBVztBQUFBLEVBQzVDLEdBQUc7OztBQ1JILFNBQU8sZUFBZSxRQUFRLFNBQVM7QUFBQSxJQUNyQyxNQUFNO0FBQ0osYUFBTyxZQUFJO0FBQUEsSUFDYjtBQUFBLEVBQ0YsQ0FBQztBQUNELFNBQU8sU0FBUztBQUVoQixHQUFDLFlBQVk7QUFDWCw4QkFBaUIsS0FBSztBQUN0QixVQUFNLHdCQUF3QjtBQUM5Qiw4QkFBaUIsS0FBSztBQUFBLEVBQ3hCLEdBQUc7IiwKICAibmFtZXMiOiBbImV2ZW50IiwgIm1ha2UiLCAidGFyZ2V0IiwgInRyZWUiLCAic2VhcmNoRmlsdGVyIiwgIndhbGthYmxlIiwgImlnbm9yZSIsICJmb3VuZCIsICJjb21wb25lbnRzIiwgIl8iLCAiY2hlY2siLCAibW9kdWxlcyIsICJyZXF1aXJlIiwgImZvdW5kIiwgImZpbmRlciIsICJmb3VuZCIsICJyZXEiLCAiZmluZGVyIiwgIm5hbWUiLCAiY29tbW9uX2RlZmF1bHQiLCAiY29tbW9uX2RlZmF1bHQiLCAibm9TdG9yZSIsICJfIiwgIl8iLCAiXyIsICJ2YWwiLCAiZXJyb3IiLCAib3V0IiwgImNoZWNrIiwgIl8iLCAiQkFTRV9VUkwiLCAibmVzdHMiLCAib3V0IiwgIm5hbWUiLCAiXyIsICJzb3VyY2UiLCAiYXBpIiwgImNvbW1vbl9kZWZhdWx0IiwgInNldCIsICJzb3VyY2UiLCAiYXBpIiwgIm91dCIsICJzaG93IiwgImNvbW1vbl9kZWZhdWx0IiwgIm91dCIsICJfIiwgIlJlYWN0IiwgImNvbW1vbl9kZWZhdWx0IiwgImNvbW1vbl9kZWZhdWx0IiwgIlJlYWN0IiwgImNvbW1vbl9kZWZhdWx0IiwgImludGVyYWN0ZWQiLCAiZ2V0Q29udGFpbmVyIiwgInNob3ciLCAic3R5bGVfZGVmYXVsdCIsICJzdHlsZV9kZWZhdWx0IiwgInN0eWxlX2RlZmF1bHQiLCAic3R5bGVfZGVmYXVsdCIsICJzdHlsZV9kZWZhdWx0IiwgInN0eWxlX2RlZmF1bHQiLCAiaW5wdXRDbGFzc2VzIiwgImlucHV0Q2xhc3NlczIiLCAic2Nyb2xsQ2xhc3NlcyIsICJjb21wb25lbnRzX2RlZmF1bHQiLCAibmFtZSIsICJjb21wb25lbnRzX2RlZmF1bHQiLCAiYXBpIiwgInN0eWxlX2RlZmF1bHQiLCAic3R5bGVfZGVmYXVsdCIsICJzdHlsZV9kZWZhdWx0IiwgInN0eWxlX2RlZmF1bHQiLCAic3R5bGVfZGVmYXVsdCIsICJzdHlsZV9kZWZhdWx0IiwgInN0eWxlX2RlZmF1bHQiLCAic3R5bGVfZGVmYXVsdCIsICJzdHlsZV9kZWZhdWx0IiwgImNvbXBvbmVudHNfZGVmYXVsdCIsICJjb21wb25lbnRzX2RlZmF1bHQiLCAic3R5bGVfZGVmYXVsdCIsICJlbG0iLCAiY29tcG9uZW50c19kZWZhdWx0Il0KfQo=
