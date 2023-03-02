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
  function getLocalized(v) {
    if (typeof v === "string")
      return v;
    return v?.[i18n_default.locale] || v?.default || Object.values(v)[0];
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
    const devMode = dev_default.enabled || cfg?.modules?.mode === "development";
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
          if (!devMode) {
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
            if (!devMode) {
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
        events: new BasicEventEmitter(),
        subscriptions: []
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
      if (out2.storage.loaded.ghost[url])
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
      let { evaluated, api: api2 } = out2.__cache__.loaded.ghost[url];
      api2.extension.events.emit("unload");
      api2.extension.subscriptions.forEach((i) => typeof i === "function" && i());
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
    Components = await (async () => {
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
        out3.Menu = Object.values(contextMenuModule).find((v) => v.toString().includes(".isUsingKeyboardNavigation"));
        [...rawMatches].forEach(([, functionName, type]) => {
          let moduleKey = moduleString.match(new RegExp(new RegExp(`(\\w+):\\(\\)\\=\\>${functionName}`)))?.[1];
          out3[componentMap[type]] = contextMenuModule[moduleKey];
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
        <div class="${buttonClasses.button} ${buttonClasses.lookFilled} ${buttonClasses.grow}" :class="\`\${buttonClasses[color] ?? buttonClasses.colorBrand} \${buttonClasses[size] ?? buttonClasses.sizeSmall}\`">
          <div class="${buttonClasses.contents}">{{value}}</div>
        </div>
      `,
        props: ["value", "size", "color"],
        data() {
          return {
            buttonClasses
          };
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
            <input :type="type ?? 'text'" class="${inputClasses?.inputDefault}" v-bind="value" :placeholder="placeholder" />
          </div>
        </div>
      `,
        props: ["value", "placeholder", "type"]
      });
    }
  };

  // src/api/ui/vue/components/discord-select/style.scss
  var style_default2 = `
.acord--discord-select{position:relative;width:100%}.acord--discord-select>.options{position:absolute;top:100%;width:100%;max-height:286px;overflow-x:hidden;overflow-y:scroll}.acord--discord-select>.options.top-popout{top:auto;bottom:100%}`;

  // src/api/ui/vue/components/discord-select/index.js
  patcher_default.injectCSS(style_default2);
  var selectClasses = webpack_default.findByProperties("select", "searchableSelect", "multiSelectCheck");
  var scrollClasses = webpack_default.findByProperties("managedReactiveScroller", "scrollerBase", "thin");
  var discord_select_default = {
    /** @param {import("vue").App} vueApp */
    load(vueApp) {
      vueApp.component("discord-select", {
        template: `
        <div class="${selectClasses.select} ${selectClasses.lookFilled} acord--discord-select" :class="{'${selectClasses.open}': active}">
          <div class="${selectClasses.value}">{{options.find(i=>i.value === selected)?.label}}</div>
          <div class="${selectClasses.icons}">
              <svg v-if="!active" class="icon" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M16.59 8.59003L12 13.17L7.41 8.59003L6 10L12 16L18 10L16.59 8.59003Z"></path></svg>
              <svg v-else role="img" class="icon" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M7.41 16.0001L12 11.4201L16.59 16.0001L18 14.5901L12 8.59006L6 14.5901L7.41 16.0001Z"></path></svg>
          </div>
          <div v-if="active" class="options ${selectClasses.popout} ${scrollClasses.scrollerBase} ${scrollClasses.thin}" :class="{'top-popout': position === 'top'}">
            <div v-for="option in options" class="option ${selectClasses.option}" @click="onOptionClick(option)" :key="option.value" :aria-selected="\`\${selected === option.value}\`">
              {{option.label}}
              <svg v-if="selected === option.value" class="${selectClasses.selectedIcon}" role="img" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle r="8" cx="12" cy="12" fill="white"></circle><g fill="none" fill-rule="evenodd"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></g></svg>
            </div>
          </div>
        </div>
      `,
        data() {
          return {
            selectClasses,
            active: false,
            selected: null
          };
        },
        props: ["options", "modelValue", "position"],
        emits: ["update:modelValue"],
        mounted() {
          this.selected = this.modelValue;
          window.addEventListener("click", this.onClick);
        },
        unmounted() {
          window.removeEventListener("click", this.onClick);
        },
        methods: {
          onOptionClick(e) {
            this.$emit("update:modelValue", e.value);
            this.selected = e.value;
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

  // src/api/ui/vue/components/index.js
  var components_default2 = {
    load(vueApp) {
      discord_select_default.load(vueApp);
      discord_input_default.load(vueApp);
      discord_button_default.load(vueApp);
    }
  };

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
  var style_default3 = `
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
          </div>
        
        `,
          data() {
            return {
              value: "1",
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
  var style_default4 = `
.acord--installed-extensions-page{display:flex;align-items:flex-start;justify-content:center;padding:0 16px}.acord--installed-extensions-page .container{width:100%;max-width:720px;display:flex;flex-direction:column}.acord--installed-extensions-page .container>.top{display:flex;align-items:center;gap:8px}.acord--installed-extensions-page .container>.top>.search{width:80%}.acord--installed-extensions-page .container>.top>.category{width:20%}`;

  // src/ui/home/vue/components/pages/installed-extensions-page/index.js
  patcher_default.injectCSS(style_default4);
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

  // src/ui/home/vue/components/components/store-extension-card/style.scss
  var style_default5 = `
.acord--store-extension-card{width:275px;height:250px;display:flex;flex-direction:column;border-radius:4px;contain:content;background-color:rgba(0,0,0,.1);box-shadow:var(--elevation-medium)}.acord--store-extension-card>.preview{width:100%;height:100px;display:flex;flex-direction:column;justify-content:space-between;align-items:center;background-color:var(--brand-500);background-position:center;background-size:cover}.acord--store-extension-card>.preview>.controls{padding:8px;display:flex;align-items:center;justify-content:space-between;width:100%}.acord--store-extension-card>.preview>.controls .go{background-color:rgba(0,0,0,.5);box-shadow:0px 0px 4px rgba(0,0,0,.5);border-radius:50%;width:24px;height:24px;display:flex;align-items:center;justify-content:center;color:var(--header-primary);font-weight:600;cursor:pointer}.acord--store-extension-card>.preview>.name-container{display:flex;align-items:center;justify-content:center;color:var(--header-primary);padding:8px}.acord--store-extension-card>.preview>.name-container>.name{font-size:14px;background-color:rgba(0,0,0,.5);box-shadow:0px 0px 4px rgba(0,0,0,.5);border-radius:9999px;padding:4px 8px}.acord--store-extension-card>.info-container{display:flex;justify-content:space-between;flex-direction:column;padding:8px;height:150px;width:100%}.acord--store-extension-card>.info-container>.top{display:flex;flex-direction:column;gap:4px;height:100%}.acord--store-extension-card>.info-container>.top>.name-container{display:flex;align-items:center;gap:4px;width:100%}.acord--store-extension-card>.info-container>.top>.name-container>.name{font-size:16px;font-weight:500;color:var(--header-primary)}.acord--store-extension-card>.info-container>.top>.name-container>.version{font-size:12px;font-weight:500;color:var(--header-primary);opacity:.5}.acord--store-extension-card>.info-container>.top>.description{font-size:14px;font-weight:300;color:var(--header-primary);opacity:.75;width:100%}.acord--store-extension-card>.info-container>.bottom{display:flex;align-items:flex-start;justify-content:space-between;height:100%}.acord--store-extension-card>.info-container>.bottom>.left{height:100%;display:flex;flex-direction:column;align-items:flex-start;justify-content:flex-end}.acord--store-extension-card>.info-container>.bottom>.left>.authors{display:flex;flex-direction:column;gap:4px}.acord--store-extension-card>.info-container>.bottom>.left>.authors .author{display:flex;align-items:center;border-radius:9999px;background-color:rgba(0,0,0,.1);cursor:pointer}.acord--store-extension-card>.info-container>.bottom>.left>.authors .author>.image{border-radius:50%;width:18px;height:18px;background-color:var(--brand-500);background-position:center;background-size:cover}.acord--store-extension-card>.info-container>.bottom>.left>.authors .author>.name{font-size:10px;font-weight:400;color:var(--header-primary);opacity:.75;padding:6px}.acord--store-extension-card>.info-container>.bottom>.right{height:100%;display:flex;flex-direction:column;align-items:flex-end;justify-content:flex-end}`;

  // src/ui/home/vue/components/components/store-extension-card/index.js
  patcher_default.injectCSS(style_default5);
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
                  <div class="name">{{ getLocalized(extension.name) }}</div>
                  <div class="version">v{{ extension.version }}</div>
                </div>
                <div class="description">{{ getLocalized(extension.description) }}</div>
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
            getLocalized,
            i18nFormat: i18n_default.format,
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

  // src/ui/home/vue/components/components/index.js
  var components_default3 = {
    /** @param {import("vue").App} vueApp */
    load(vueApp) {
      installed_extensions_page_default.load(vueApp);
      store_extension_card_default.load(vueApp);
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
  patcher_default.injectCSS(style_default3);
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
      <div v-if="selectedTab === 'home'" class="tab">
        <home-page />
      </div>
      <div v-if="selectedTab === 'installed-extensions'" class="tab">
        <installed-extensions-page />
      </div>
      <div v-if="selectedTab === 'store'" class="tab">
        <store-page />
      </div>
      <div v-if="selectedTab === 'settings'" class="tab">
        <settings-page />
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
    dom_default.patch('[class*="applicationStore-"] [class*="scrollerBase-"] [class*="subscriptionsRedirectContainer-"]', (elm) => {
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibm9kZV9tb2R1bGVzL25lc3RzL2Nqcy9FdmVudHMuanMiLCAibm9kZV9tb2R1bGVzL25lc3RzL2Nqcy9FdmVudEVtaXR0ZXIuanMiLCAibm9kZV9tb2R1bGVzL25lc3RzL2Nqcy9tYWtlLmpzIiwgIm5vZGVfbW9kdWxlcy9uZXN0cy9janMvaW5kZXguanMiLCAic3JjL2RhdGEvY29tbW9uLmpzb24iLCAic3JjL2FwaS91dGlscy9yYXcvZmluZC1pbi10cmVlLmpzIiwgInNyYy9hcGkvdXRpbHMvbG9nZ2VyLmpzIiwgInNyYy9hcGkvdXRpbHMvcmVhY3QuanMiLCAic3JjL2FwaS91dGlscy9pbmRleC5qcyIsICJzcmMvYXBpL21vZHVsZXMvcmF3L2NvbXBsZXgtZmluZGVyLmpzIiwgInNyYy9hcGkvbW9kdWxlcy93ZWJwYWNrLmpzIiwgInNyYy9hcGkvbW9kdWxlcy9jb21tb24uanMiLCAic3JjL2FwaS9tb2R1bGVzL2luZGV4LmpzIiwgInNyYy9hcGkvaTE4bi9pbmRleC5qcyIsICJzcmMvb3RoZXIvdXRpbHMuanMiLCAic3JjL2xpYi9CYXNpY0V2ZW50RW1pdHRlci5qcyIsICJzcmMvYXBpL2V2ZW50cy9pbmRleC5qcyIsICJzcmMvYXBpL2RvbS9pbmRleC5qcyIsICJzcmMvbGliL3NwaXRyb2FzdC9kaXN0L2VzbS9zaGFyZWQuanMiLCAic3JjL2xpYi9zcGl0cm9hc3QvZGlzdC9lc20vaG9vay5qcyIsICJzcmMvbGliL3NwaXRyb2FzdC9kaXN0L2VzbS91bi1wYXRjaC5qcyIsICJzcmMvbGliL3NwaXRyb2FzdC9kaXN0L2VzbS9nZXQtcGF0Y2gtZnVuYy5qcyIsICJzcmMvbGliL3NwaXRyb2FzdC9kaXN0L2VzbS9pbmRleC5qcyIsICJzcmMvYXBpL3BhdGNoZXIvaW5kZXguanMiLCAic3JjL290aGVyL2xvYWRpbmctYW5pbWF0aW9uL3N0eWxlLnNjc3MiLCAic3JjL290aGVyL2xvYWRpbmctYW5pbWF0aW9uL2luZGV4LmpzIiwgInNyYy9hcGkvZGV2L2luZGV4LmpzIiwgInNyYy9hcGkvc3RvcmFnZS9pbmRleC5qcyIsICJub2RlX21vZHVsZXMvaWRiLWtleXZhbC9kaXN0L2luZGV4LmpzIiwgInNyYy9saWIvanNvbi1kZWN5Y2xlZC9pbmRleC5qcyIsICJzcmMvYXBpL2V4dGVuc2lvbnMvaTE4bi5qcyIsICJzcmMvYXBpL2V4dGVuc2lvbnMvaW5kZXguanMiLCAic3JjL2FwaS9pbnRlcm5hbC9pbmRleC5qcyIsICJzcmMvYXBpL3dlYnNvY2tldC9pbmRleC5qcyIsICJzcmMvYXBpL3VpL3N0eWxlcy5zY3NzIiwgInNyYy9hcGkvdWkvdG9vbHRpcHMuanMiLCAic3JjL2FwaS91aS9ub3RpZmljYXRpb25zLmpzIiwgInNyYy9hcGkvdWkvY29udGV4dE1lbnVzLmpzIiwgInNyYy9saWIvY29tcG9uZW50cy9FcnJvckJvdW5kYXJ5LmpzeCIsICJzcmMvYXBpL3VpL2NvbXBvbmVudHMuanMiLCAic3JjL2FwaS91aS9tb2RhbHMuanN4IiwgInNyYy9hcGkvdWkvdG9hc3RzLmpzIiwgInNyYy9hcGkvdWkvdnVlL2NvbXBvbmVudHMvZGlzY29yZC1idXR0b24vaW5kZXguanMiLCAic3JjL2FwaS91aS92dWUvY29tcG9uZW50cy9kaXNjb3JkLWlucHV0L2luZGV4LmpzIiwgInNyYy9hcGkvdWkvdnVlL2NvbXBvbmVudHMvZGlzY29yZC1zZWxlY3Qvc3R5bGUuc2NzcyIsICJzcmMvYXBpL3VpL3Z1ZS9jb21wb25lbnRzL2Rpc2NvcmQtc2VsZWN0L2luZGV4LmpzIiwgInNyYy9hcGkvdWkvdnVlL2NvbXBvbmVudHMvaW5kZXguanMiLCAic3JjL2FwaS91aS92dWUvaW5kZXguanMiLCAic3JjL2FwaS91aS9pbmRleC5qcyIsICJzcmMvYXBpL2luZGV4LmpzIiwgInNyYy9vdGhlci93ZWJzb2NrZXQtdHJpZ2dlcnMuanMiLCAic3JjL3VpL2hvbWUvc3R5bGUuc2NzcyIsICJzcmMvdWkvaG9tZS92dWUvY29tcG9uZW50cy9wYWdlcy9ob21lLXBhZ2UvaW5kZXguanMiLCAic3JjL3VpL2hvbWUvdnVlL2NvbXBvbmVudHMvcGFnZXMvaW5zdGFsbGVkLWV4dGVuc2lvbnMtcGFnZS9zdHlsZS5zY3NzIiwgInNyYy91aS9ob21lL3Z1ZS9jb21wb25lbnRzL3BhZ2VzL2luc3RhbGxlZC1leHRlbnNpb25zLXBhZ2UvaW5kZXguanMiLCAic3JjL3VpL2hvbWUvdnVlL2NvbXBvbmVudHMvcGFnZXMvc2V0dGluZ3MtcGFnZS9pbmRleC5qcyIsICJzcmMvdWkvaG9tZS92dWUvY29tcG9uZW50cy9wYWdlcy9zdG9yZS1wYWdlL2luZGV4LmpzIiwgInNyYy91aS9ob21lL3Z1ZS9jb21wb25lbnRzL3BhZ2VzL2luZGV4LmpzIiwgInNyYy91aS9ob21lL3Z1ZS9jb21wb25lbnRzL2NvbXBvbmVudHMvc3RvcmUtZXh0ZW5zaW9uLWNhcmQvc3R5bGUuc2NzcyIsICJzcmMvdWkvaG9tZS92dWUvY29tcG9uZW50cy9jb21wb25lbnRzL3N0b3JlLWV4dGVuc2lvbi1jYXJkL2luZGV4LmpzIiwgInNyYy91aS9ob21lL3Z1ZS9jb21wb25lbnRzL2NvbXBvbmVudHMvaW5kZXguanMiLCAic3JjL3VpL2hvbWUvdnVlL2NvbXBvbmVudHMvaW5kZXguanMiLCAic3JjL3VpL2hvbWUvaW5kZXguanMiLCAic3JjL3VpL290aGVyL2luZGV4LmpzIiwgInNyYy9pbmRleC5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5kZWZhdWx0ID0gT2JqZWN0LmZyZWV6ZSh7XHJcbiAgICBHRVQ6IFwiR0VUXCIsXHJcbiAgICBTRVQ6IFwiU0VUXCIsXHJcbiAgICBERUxFVEU6IFwiREVMRVRFXCIsXHJcbiAgICBVUERBVEU6IFwiVVBEQVRFXCIsXHJcbn0pO1xyXG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgRXZlbnRzXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vRXZlbnRzXCIpKTtcclxuY2xhc3MgRXZlbnRFbWl0dGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMubGlzdGVuZXJzID0gT2JqZWN0LnZhbHVlcyhFdmVudHNfMS5kZWZhdWx0KS5yZWR1Y2UoKGFjYywgdmFsKSA9PiAoKGFjY1t2YWxdID0gbmV3IFNldCgpKSwgYWNjKSwge30pO1xyXG4gICAgICAgIHRoaXMub24gPSBmdW5jdGlvbiAoZXZlbnQsIGxpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxpc3RlbmVyc1tldmVudF0uaGFzKGxpc3RlbmVyKSkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoYFRoaXMgbGlzdGVuZXIgb24gJHtldmVudH0gYWxyZWFkeSBleGlzdHMuYCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5saXN0ZW5lcnNbZXZlbnRdLmFkZChsaXN0ZW5lcik7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLm9uY2UgPSBmdW5jdGlvbiAoZXZlbnQsIGxpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG9uY2VMaXN0ZW5lciA9IChldmVudCwgZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vZmYoZXZlbnQsIG9uY2VMaXN0ZW5lcik7XHJcbiAgICAgICAgICAgICAgICBsaXN0ZW5lcihldmVudCwgZGF0YSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMub24oZXZlbnQsIG9uY2VMaXN0ZW5lcik7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLm9mZiA9IGZ1bmN0aW9uIChldmVudCwgbGlzdGVuZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5saXN0ZW5lcnNbZXZlbnRdLmRlbGV0ZShsaXN0ZW5lcik7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmVtaXQgPSBmdW5jdGlvbiAoZXZlbnQsIGRhdGEpIHtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBsaXN0ZW5lciBvZiB0aGlzLmxpc3RlbmVyc1tldmVudF0pIHtcclxuICAgICAgICAgICAgICAgIGxpc3RlbmVyKGV2ZW50LCBkYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgZm9yIChjb25zdCBldmVudCBvZiBPYmplY3QudmFsdWVzKEV2ZW50c18xLmRlZmF1bHQpKSB7XHJcbiAgICAgICAgICAgIHRoaXNbZXZlbnQudG9Mb3dlckNhc2UoKV0gPSAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KGV2ZW50LCBkYXRhKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5kZWZhdWx0ID0gRXZlbnRFbWl0dGVyO1xyXG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgRXZlbnRFbWl0dGVyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vRXZlbnRFbWl0dGVyXCIpKTtcclxuZnVuY3Rpb24gbWFrZShcclxuLy8gVGhpcyBjYW4gYmUgc2FmZWx5IGlnbm9yZWQsIHRoZSBEYXRhIHdpbGwgYWx3YXlzIGJlIGFuIG9iamVjdCBvciBpdCB3b24ndCB3b3JrIGFueXdheS5cclxuLy8gQHRzLWlnbm9yZVxyXG5kYXRhID0ge30sIHsgbmVzdEFycmF5cyA9IHRydWUsIH0gPSB7fSkge1xyXG4gICAgY29uc3QgZW1pdHRlciA9IG5ldyBFdmVudEVtaXR0ZXJfMS5kZWZhdWx0KCk7XHJcbiAgICBmdW5jdGlvbiBjcmVhdGVQcm94eSh0YXJnZXQsIHJvb3QsIHBhdGgpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb3h5KHRhcmdldCwge1xyXG4gICAgICAgICAgICBnZXQodGFyZ2V0LCBwcm9wZXJ0eSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbmV3UGF0aCA9IFsuLi5wYXRoLCBwcm9wZXJ0eV07XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHRhcmdldFtwcm9wZXJ0eV07XHJcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVtaXR0ZXIuZ2V0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogbmV3UGF0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUsXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFuZXN0QXJyYXlzICYmIEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY3JlYXRlUHJveHkodmFsdWUsIHJvb3QsIG5ld1BhdGgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY3JlYXRlUHJveHkoKHRhcmdldFtwcm9wZXJ0eV0gPSB7fSksIHJvb3QsIG5ld1BhdGgpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQodGFyZ2V0LCBwcm9wZXJ0eSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHRhcmdldFtwcm9wZXJ0eV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIGVtaXR0ZXIuc2V0KHtcclxuICAgICAgICAgICAgICAgICAgICBwYXRoOiBbLi4ucGF0aCwgcHJvcGVydHldLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvLyBUaGlzIG5lZWRzIHRvIHJldHVybiB0cnVlIG9yIGl0IGVycm9ycy4gL3NocnVnXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGVsZXRlUHJvcGVydHkodGFyZ2V0LCBwcm9wZXJ0eSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRlbGV0ZSB0YXJnZXRbcHJvcGVydHldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZW1pdHRlci5kZWxldGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRoOiBbLi4ucGF0aCwgcHJvcGVydHldLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBoYXModGFyZ2V0LCBwcm9wZXJ0eSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0YXJnZXRbcHJvcGVydHldID09PSBcIm9iamVjdFwiICYmXHJcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmtleXModGFyZ2V0W3Byb3BlcnR5XSkubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb3BlcnR5IGluIHRhcmdldDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHsgc3RvcmU6IGNyZWF0ZVByb3h5KGRhdGEsIGRhdGEsIFtdKSwgXHJcbiAgICAgICAgLy8gVGhpcyBjYW4gYmUgc2FmZWx5IGlnbm9yZWQsIHRoZSBEYXRhIHdpbGwgYWx3YXlzIGJlIGFuIG9iamVjdCBvciBpdCB3b24ndCB3b3JrIGFueXdheS5cclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgZ2hvc3Q6IGRhdGEgfSwgZW1pdHRlcik7XHJcbn1cclxuZXhwb3J0cy5kZWZhdWx0ID0gbWFrZTtcclxuIiwgIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMubWFrZSA9IGV4cG9ydHMuRXZlbnRzID0gdm9pZCAwO1xyXG52YXIgRXZlbnRzXzEgPSByZXF1aXJlKFwiLi9FdmVudHNcIik7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkV2ZW50c1wiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gX19pbXBvcnREZWZhdWx0KEV2ZW50c18xKS5kZWZhdWx0OyB9IH0pO1xyXG52YXIgbWFrZV8xID0gcmVxdWlyZShcIi4vbWFrZVwiKTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwibWFrZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gX19pbXBvcnREZWZhdWx0KG1ha2VfMSkuZGVmYXVsdDsgfSB9KTtcclxuIiwgIntcclxuICBcImNvbW1vblwiOiB7XHJcbiAgICBcIm1vZGFsc1wiOiB7XHJcbiAgICAgIFwiY29tcG9uZW50c1wiOiB7XHJcbiAgICAgICAgXCJvdGhlclwiOiB7XHJcbiAgICAgICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICBcIkhlYWRlclwiLFxyXG4gICAgICAgICAgICAgICAgXCJGb290ZXJcIlxyXG4gICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIlJvb3RcIjoge1xyXG4gICAgICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICAgICAgXCJpblwiOiBcInN0cmluZ3NcIixcclxuICAgICAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgXCJFTlRFUklOR1wiLFxyXG4gICAgICAgICAgICAgICAgXCJoZWFkZXJJZFwiXHJcbiAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIFwiYWN0aW9uc1wiOiB7XHJcbiAgICAgICAgXCJvcGVuXCI6IHtcclxuICAgICAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgICAgIFwiaW5cIjogXCJzdHJpbmdzXCIsXHJcbiAgICAgICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgIFwib25DbG9zZUNhbGxiYWNrXCIsXHJcbiAgICAgICAgICAgICAgICBcIkxheWVyXCJcclxuICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgICAgICBcImJlZm9yZVwiOiBbXHJcbiAgICAgICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgICAgIFwib3BlblwiXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBcIm1hcFwiOiB7XHJcbiAgICAgICAgICAgIFwib3BlblwiOiBbXHJcbiAgICAgICAgICAgICAgXCJvbkNsb3NlQ2FsbGJhY2tcIixcclxuICAgICAgICAgICAgICBcIkxheWVyXCJcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJjbG9zZVwiOiB7XHJcbiAgICAgICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgICAgICBcImluXCI6IFwic3RyaW5nc1wiLFxyXG4gICAgICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICBcIm9uQ2xvc2VDYWxsYmFjaygpXCJcclxuICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgICAgICBcImJlZm9yZVwiOiBbXHJcbiAgICAgICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgICAgIFwiY2xvc2VcIlxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgXCJtYXBcIjoge1xyXG4gICAgICAgICAgICBcImNsb3NlXCI6IFtcclxuICAgICAgICAgICAgICBcIm9uQ2xvc2VDYWxsYmFjaygpXCJcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiY29tcG9uZW50c1wiOiB7XHJcbiAgICAgIFwiQnV0dG9uXCI6IHtcclxuICAgICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICBcIkJvcmRlckNvbG9yc1wiXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgICBcImJlZm9yZVwiOiBbXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgICAgXSxcclxuICAgICAgICAgIFwiYWZ0ZXJcIjogXCJCdXR0b25cIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJtYXBcIjoge1xyXG4gICAgICAgICAgXCJCdXR0b25cIjogW1xyXG4gICAgICAgICAgICBcIi5GSUxMRURcIixcclxuICAgICAgICAgICAgXCIub25Nb3VzZUxlYXZlXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIFwiQ29uZmlybWF0aW9uTW9kYWxcIjoge1xyXG4gICAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICAgIFwiaW5cIjogXCJzdHJpbmdzXCIsXHJcbiAgICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgIFwiLmNvbmZpcm1CdXR0b25Db2xvclwiXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwibWFwXCI6IHtcclxuICAgICAgICAgIFwiQ29uZmlybWF0aW9uTW9kYWxcIjogW1xyXG4gICAgICAgICAgICBcIi5jb25maXJtQnV0dG9uQ29sb3JcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICAgIFwiYmVmb3JlXCI6IFtcclxuICAgICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgICBdLFxyXG4gICAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICAgIFwiQ29uZmlybWF0aW9uTW9kYWxcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgXCJUZXh0XCI6IHtcclxuICAgICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgICAgXCJmaWx0ZXJcIjogXCIkPy5TaXplcz8uU0laRV8zMiAmJiAkLkNvbG9yc1wiLFxyXG4gICAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgICBcImJlZm9yZVwiOiBbXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgXCJUb29sdGlwXCI6IHtcclxuICAgICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgICBcImluXCI6IFwicHJvdG90eXBlc1wiLFxyXG4gICAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICBcInJlbmRlclRvb2x0aXBcIlxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgICAgXCJiZWZvcmVcIjogW1xyXG4gICAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIFwiTWFya2Rvd25cIjoge1xyXG4gICAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgICBcImZpbHRlclwiOiBcIiQ/LnByb3RvdHlwZT8ucmVuZGVyICYmICQucnVsZXNcIixcclxuICAgICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiRmx1eERpc3BhdGNoZXJcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcIl9jdXJyZW50RGlzcGF0Y2hBY3Rpb25UeXBlXCIsXHJcbiAgICAgICAgICAgIFwiZGlzcGF0Y2hcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiUmVhY3RcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcImNyZWF0ZUVsZW1lbnRcIixcclxuICAgICAgICAgICAgXCJ1c2VTdGF0ZVwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJSZXN0XCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJnZXRcIixcclxuICAgICAgICAgICAgXCJwb3N0XCIsXHJcbiAgICAgICAgICAgIFwiZ2V0QVBJQmFzZVVSTFwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJGbHV4XCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJjb25uZWN0U3RvcmVzXCIsXHJcbiAgICAgICAgICAgIFwiZGVzdHJveVwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJXZWJTb2NrZXRcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IFwiJD8uX19wcm90b19fPy5oYW5kbGVDb25uZWN0aW9uXCIsXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJiZWZvcmVcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJBY3Rpdml0eUFjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcInNlbmRBY3Rpdml0eUludml0ZVwiLFxyXG4gICAgICAgICAgICBcInVwZGF0ZUFjdGl2aXR5XCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIlByaXZhdGVDaGFubmVsQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwib3BlblByaXZhdGVDaGFubmVsXCIsXHJcbiAgICAgICAgICAgIFwiZW5zdXJlUHJpdmF0ZUNoYW5uZWxcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiQWNrQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiaW5cIjogXCJzdHJpbmdzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwidHlwZTpcXFwiQlVMS19BQ0tcXFwiXCJcclxuICAgICAgICAgIF0sXHJcbiAgICAgICAgICBbXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiB0cnVlLFxyXG4gICAgICAgIFwiYmVmb3JlXCI6IFwiZXhwb3J0c1wiXHJcbiAgICAgIH0sXHJcbiAgICAgIFwibWFwXCI6IHtcclxuICAgICAgICBcImFja1wiOiBbXHJcbiAgICAgICAgICBcInR5cGU6XFxcIkNIQU5ORUxfQUNLXFxcIlwiLFxyXG4gICAgICAgICAgXCJtZXNzYWdlSWRcIixcclxuICAgICAgICAgIFwiY2hhbm5lbElkXCJcclxuICAgICAgICBdLFxyXG4gICAgICAgIFwiYnVsa0Fja1wiOiBbXHJcbiAgICAgICAgICBcInR5cGU6XFxcIkJVTEtfQUNLXFxcIlwiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJBbmFseXRpY3NBY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJpc1Rocm90dGxlZFwiLFxyXG4gICAgICAgICAgICBcInRyYWNrXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIkFuaW1hdGlvbkFjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJzcHJpbmdcIixcclxuICAgICAgICAgICAgXCJkZWNheVwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJDb25uZWN0aW9uQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwic2V0U2hvd0FjdGl2aXR5XCIsXHJcbiAgICAgICAgICAgIFwic2V0VmlzaWJpbGl0eVwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJSVENDb25uZWN0aW9uQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwiZ2V0Q2hhbm5lbElkXCIsXHJcbiAgICAgICAgICAgIFwiZ2V0R3VpbGRJZFwiLFxyXG4gICAgICAgICAgICBcImdldFJUQ0Nvbm5lY3Rpb25JZFwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJFbW9qaUFjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcInRyYW5zbGF0ZUlubGluZUVtb2ppVG9TdXJyb2dhdGVzXCIsXHJcbiAgICAgICAgICAgIFwidHJhbnNsYXRlU3Vycm9nYXRlc1RvSW5saW5lRW1vamlcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiRW1vamlTdGF0ZUFjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcImdldFVSTFwiLFxyXG4gICAgICAgICAgICBcImlzRW1vamlEaXNhYmxlZFwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJHdWlsZE5vdGlmaWNhdGlvbnNBY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJ1cGRhdGVDaGFubmVsT3ZlcnJpZGVTZXR0aW5nc1wiLFxyXG4gICAgICAgICAgICBcInVwZGF0ZUd1aWxkTm90aWZpY2F0aW9uU2V0dGluZ3NcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiSW50ZXJuYWxSZWFjdFwiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwianN4XCIsXHJcbiAgICAgICAgICAgIFwianN4c1wiLFxyXG4gICAgICAgICAgICBcIkZyYWdtZW50XCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIkxvZ2luQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwibG9naW5cIixcclxuICAgICAgICAgICAgXCJsb2dvdXRcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiUXVlcnlBY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJxdWVyeUVtb2ppUmVzdWx0c1wiLFxyXG4gICAgICAgICAgICBcInF1ZXJ5RnJpZW5kc1wiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJNZXNzYWdlQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwicmVjZWl2ZU1lc3NhZ2VcIixcclxuICAgICAgICAgICAgXCJzZW5kTWVzc2FnZVwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJQcmVtaXVtQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwiaXNQcmVtaXVtXCIsXHJcbiAgICAgICAgICAgIFwiY2FuVXNlRW1vamlzRXZlcnl3aGVyZVwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJWb2ljZUFjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcInNlbGVjdFZvaWNlQ2hhbm5lbFwiLFxyXG4gICAgICAgICAgICBcImRpc2Nvbm5lY3RcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiVHlwaW5nQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwic3RhcnRUeXBpbmdcIixcclxuICAgICAgICAgICAgXCJzdG9wVHlwaW5nXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIkd1aWxkQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwic2V0Q2hhbm5lbFwiLFxyXG4gICAgICAgICAgICBcInNldFNlcnZlck11dGVcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiSW52aXRlQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwiYWNjZXB0SW52aXRlXCIsXHJcbiAgICAgICAgICAgIFwiYWNjZXB0SW52aXRlQW5kVHJhbnNpdGlvblRvSW52aXRlQ2hhbm5lbFwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJNZWRpYUVuZ2luZUFjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcInRvZ2dsZVNlbGZEZWFmXCIsXHJcbiAgICAgICAgICAgIFwidG9nZ2xlU2VsZk11dGVcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiaTE4blwiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwiX3JlcXVlc3RlZExvY2FsZVwiLFxyXG4gICAgICAgICAgICBcImdldERlZmF1bHRMb2NhbGVcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwidXVpZFwiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwidjFcIixcclxuICAgICAgICAgICAgXCJ2NFwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJobGpzXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJoaWdobGlnaHRBbGxcIixcclxuICAgICAgICAgICAgXCJoaWdobGlnaHRcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufSIsICJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBmaW5kSW5UcmVlKFxyXG4gIHRyZWUsXHJcbiAgc2VhcmNoRmlsdGVyLFxyXG4gIHsgd2Fsa2FibGUgPSBudWxsLCBpZ25vcmUgPSBbXSwgbGltaXQgPSAxMDAgfSA9IHt9XHJcbikge1xyXG4gIGxldCBpdGVyYXRpb24gPSAwO1xyXG5cclxuICBmdW5jdGlvbiBkb1NlYXJjaCh0cmVlLCBzZWFyY2hGaWx0ZXIsIHsgd2Fsa2FibGUgPSBudWxsLCBpZ25vcmUgPSBbXSB9ID0ge30pIHtcclxuICAgIGl0ZXJhdGlvbiArPSAxO1xyXG4gICAgaWYgKGl0ZXJhdGlvbiA+IGxpbWl0KSByZXR1cm47XHJcblxyXG4gICAgaWYgKHR5cGVvZiBzZWFyY2hGaWx0ZXIgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgaWYgKHRyZWUuaGFzT3duUHJvcGVydHkoc2VhcmNoRmlsdGVyKSkgcmV0dXJuIHRyZWVbc2VhcmNoRmlsdGVyXTtcclxuICAgIH0gZWxzZSBpZiAoc2VhcmNoRmlsdGVyKHRyZWUpKSByZXR1cm4gdHJlZTtcclxuXHJcbiAgICBpZiAoIXRyZWUpIHJldHVybjtcclxuXHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh0cmVlKSkge1xyXG4gICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgdHJlZSkge1xyXG4gICAgICAgIGNvbnN0IGZvdW5kID0gZG9TZWFyY2goaXRlbSwgc2VhcmNoRmlsdGVyLCB7IHdhbGthYmxlLCBpZ25vcmUgfSk7XHJcbiAgICAgICAgaWYgKGZvdW5kKSByZXR1cm4gZm91bmQ7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHRyZWUgPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXModHJlZSkpIHtcclxuICAgICAgICBpZiAod2Fsa2FibGUgIT0gbnVsbCAmJiAhd2Fsa2FibGUuaW5jbHVkZXMoa2V5KSkgY29udGludWU7XHJcblxyXG4gICAgICAgIGlmIChpZ25vcmUuaW5jbHVkZXMoa2V5KSkgY29udGludWU7XHJcblxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICBjb25zdCBmb3VuZCA9IGRvU2VhcmNoKHRyZWVba2V5XSwgc2VhcmNoRmlsdGVyLCB7XHJcbiAgICAgICAgICAgIHdhbGthYmxlLFxyXG4gICAgICAgICAgICBpZ25vcmUsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGlmIChmb3VuZCkgcmV0dXJuIGZvdW5kO1xyXG4gICAgICAgIH0gY2F0Y2ggeyB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiBkb1NlYXJjaCh0cmVlLCBzZWFyY2hGaWx0ZXIsIHsgd2Fsa2FibGUsIGlnbm9yZSB9KTtcclxufTtcclxuIiwgImZ1bmN0aW9uIGJ1aWxkKHByZWZpeCA9IFwiQWNvcmRcIiwgdHlwZSwgY29sb3IpIHtcclxuICByZXR1cm4gKC4uLmlucHV0KSA9PiBjb25zb2xlW3R5cGVdKFxyXG4gICAgYCVjJHtwcmVmaXh9JWNgLFxyXG4gICAgYGJhY2tncm91bmQtY29sb3I6ICR7Y29sb3J9OyBjb2xvcjogd2hpdGU7IGJvcmRlci1yYWRpdXM6IDRweDsgcGFkZGluZzogMHB4IDZweCAwcHggNnB4OyBmb250LXdlaWdodDogYm9sZGAsXHJcbiAgICBcIlwiLFxyXG4gICAgLi4uaW5wdXRcclxuICApO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgbG9nOiBidWlsZChcIkFjb3JkXCIsIFwibG9nXCIsIFwiIzAwZmJiMFwiKSxcclxuICBkZWJ1ZzogYnVpbGQoXCJBY29yZCBEZWJ1Z1wiLCBcImRlYnVnXCIsIFwiIzAwZmJiMFwiKSxcclxuICBpbmZvOiBidWlsZChcIkFjb3JkIEluZm9cIiwgXCJsb2dcIiwgXCIjODJhYWZmXCIpLFxyXG4gIHdhcm46IGJ1aWxkKFwiQWNvcmQgV2FyblwiLCBcIndhcm5cIiwgXCIjZGViZjE4XCIpLFxyXG4gIGVycm9yOiBidWlsZChcIkFjb3JkIEVycm9yXCIsIFwiZXJyb3JcIiwgXCIjZWY1ODU4XCIpLFxyXG4gIGJ1aWxkXHJcbn0iLCAiaW1wb3J0IGZpbmRJblRyZWUgZnJvbSBcIi4vcmF3L2ZpbmQtaW4tdHJlZS5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGdldEluc3RhbmNlKG5vZGUpIHtcclxuICAgIHJldHVybiBPYmplY3QuZW50cmllcyhub2RlKS5maW5kKGkgPT4gaVswXS5zdGFydHNXaXRoKFwiX19yZWFjdEludGVybmFsSW5zdGFuY2VcIikgfHwgaVswXS5zdGFydHNXaXRoKFwiX19yZWFjdEZpYmVyXCIpKT8uWzFdO1xyXG4gIH0sXHJcbiAgZ2V0T3duZXJJbnN0YW5jZShub2RlKSB7XHJcbiAgICBsZXQgaW5zdGFuY2UgPSB0aGlzLmdldEluc3RhbmNlKG5vZGUpO1xyXG4gICAgZm9yIChsZXQgZWwgPSBpbnN0YW5jZTsgZWw7IGVsID0gZWwucmV0dXJuKVxyXG4gICAgICBpZiAoZWwuc3RhdGVOb2RlPy5mb3JjZVVwZGF0ZSkgcmV0dXJuIGVsLnN0YXRlTm9kZTtcclxuICB9LFxyXG4gIGZpbmRJblRyZWUodHJlZSwgZmlsdGVyKSB7XHJcbiAgICByZXR1cm4gZmluZEluVHJlZSh0cmVlLCBmaWx0ZXIsIHtcclxuICAgICAgd2Fsa2FibGU6IFtcInByb3BzXCIsIFwic3RhdGVcIiwgXCJjaGlsZHJlblwiLCBcInJldHVyblwiXVxyXG4gICAgfSk7XHJcbiAgfSxcclxuICBnZXRDb21wb25lbnRzKG5vZGUpIHtcclxuICAgIGNvbnN0IGluc3RhbmNlID0gdGhpcy5nZXRJbnN0YW5jZShub2RlKTtcclxuICAgIGNvbnN0IGNvbXBvbmVudHMgPSBbXTtcclxuICAgIGxldCBsYXN0SW5zdGFuY2UgPSBpbnN0YW5jZTtcclxuICAgIHdoaWxlIChsYXN0SW5zdGFuY2UgJiYgbGFzdEluc3RhbmNlLnJldHVybikge1xyXG4gICAgICBpZiAodHlwZW9mIGxhc3RJbnN0YW5jZS5yZXR1cm4udHlwZSA9PT0gXCJzdHJpbmdcIikgYnJlYWs7XHJcbiAgICAgIGlmIChsYXN0SW5zdGFuY2UucmV0dXJuLnR5cGUpIGNvbXBvbmVudHMucHVzaChsYXN0SW5zdGFuY2UucmV0dXJuLnR5cGUpO1xyXG4gICAgICBsYXN0SW5zdGFuY2UgPSBsYXN0SW5zdGFuY2UucmV0dXJuO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNvbXBvbmVudHM7XHJcbiAgfSxcclxuICBnZXRTdGF0ZU5vZGVzKG5vZGUpIHtcclxuICAgIGNvbnN0IGluc3RhbmNlID0gdGhpcy5nZXRJbnN0YW5jZShub2RlKTtcclxuICAgIGNvbnN0IHN0YXRlTm9kZXMgPSBbXTtcclxuICAgIGxldCBsYXN0SW5zdGFuY2UgPSBpbnN0YW5jZTtcclxuICAgIHdoaWxlIChsYXN0SW5zdGFuY2UgJiYgbGFzdEluc3RhbmNlLnJldHVybikge1xyXG4gICAgICBpZiAobGFzdEluc3RhbmNlLnJldHVybi5zdGF0ZU5vZGUgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkgYnJlYWs7XHJcbiAgICAgIGlmIChsYXN0SW5zdGFuY2UucmV0dXJuLnN0YXRlTm9kZSlcclxuICAgICAgICBzdGF0ZU5vZGVzLnB1c2gobGFzdEluc3RhbmNlLnJldHVybi5zdGF0ZU5vZGUpO1xyXG4gICAgICBsYXN0SW5zdGFuY2UgPSBsYXN0SW5zdGFuY2UucmV0dXJuO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN0YXRlTm9kZXM7XHJcbiAgfSxcclxuICBnZXRQcm9wcyhlbCwgZmlsdGVyID0gKGkpID0+IGksIG1heCA9IDEwMDAwKSB7XHJcbiAgICBjb25zdCBpbnN0YW5jZSA9IHRoaXMuZ2V0SW5zdGFuY2UoZWwpO1xyXG5cclxuICAgIGlmICghaW5zdGFuY2U/LnJldHVybikgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgZm9yIChcclxuICAgICAgbGV0IGN1cnJlbnQgPSBpbnN0YW5jZT8ucmV0dXJuLCBpID0gMDtcclxuICAgICAgaSA+IG1heCB8fCBjdXJyZW50ICE9PSBudWxsO1xyXG4gICAgICBjdXJyZW50ID0gY3VycmVudD8ucmV0dXJuLCBpKytcclxuICAgICkge1xyXG4gICAgICBpZiAoY3VycmVudD8ucGVuZGluZ1Byb3BzICYmIGZpbHRlcihjdXJyZW50LnBlbmRpbmdQcm9wcykpXHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnQucGVuZGluZ1Byb3BzO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH0sXHJcbn0iLCAiaW1wb3J0IGZpbmRJblRyZWUgZnJvbSBcIi4vcmF3L2ZpbmQtaW4tdHJlZS5qc1wiO1xyXG5pbXBvcnQgbG9nZ2VyIGZyb20gXCIuL2xvZ2dlci5qc1wiO1xyXG5pbXBvcnQgcmVhY3QgZnJvbSBcIi4vcmVhY3QuanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBsb2dnZXIsXHJcbiAgcmVhY3QsXHJcbiAgZmluZEluVHJlZSxcclxuICBmb3JtYXQodmFsLCAuLi5hcmdzKSB7XHJcbiAgICByZXR1cm4gYCR7dmFsfWAucmVwbGFjZUFsbCgveyhcXGQrKX0vZywgKF8sIGNhcCkgPT4ge1xyXG4gICAgICByZXR1cm4gYXJnc1tOdW1iZXIoY2FwKV07XHJcbiAgICB9KTtcclxuICB9LFxyXG4gIGludGVydmFsKGNiLCBkdXIpIHtcclxuICAgIGxldCBpbnRlcnZhbCA9IHNldEludGVydmFsKGNiLCBkdXIpO1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgdGltZW91dChjYiwgZHVyKSB7XHJcbiAgICBsZXQgdGltZW91dCA9IHNldFRpbWVvdXQoY2IsIGR1cik7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgaWZFeGlzdHModmFsLCBjYikge1xyXG4gICAgaWYgKHZhbCkgY2IodmFsKTtcclxuICB9LFxyXG4gIGNvcHlUZXh0KHRleHQpIHtcclxuICAgIGlmICh3aW5kb3cuRGlzY29yZE5hdGl2ZSkge1xyXG4gICAgICBEaXNjb3JkTmF0aXZlLmNsaXBib2FyZC5jb3B5KHRleHQpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgbmF2aWdhdG9yLmNsaXBib2FyZC53cml0ZVRleHQodGV4dCkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICBjb25zdCBjb3B5QXJlYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZXh0YXJlYVwiKTtcclxuXHJcbiAgICAgIGNvcHlBcmVhLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xyXG4gICAgICBjb3B5QXJlYS5zdHlsZS5wb3NpdGlvbiA9IFwiZml4ZWRcIjtcclxuICAgICAgY29weUFyZWEuc3R5bGUudG9wID0gXCIwXCI7XHJcbiAgICAgIGNvcHlBcmVhLnN0eWxlLmxlZnQgPSBcIjBcIjtcclxuXHJcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY29weUFyZWEpO1xyXG4gICAgICBjb3B5QXJlYS5mb2N1cygpO1xyXG4gICAgICBjb3B5QXJlYS5zZWxlY3QoKTtcclxuXHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoXCJjb3B5XCIpO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoY29weUFyZWEpO1xyXG4gICAgfSk7XHJcbiAgfSxcclxuICBzbGVlcChtcykge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIG1zKSk7XHJcbiAgfVxyXG59IiwgImltcG9ydCB1dGlscyBmcm9tIFwiLi4vLi4vdXRpbHMvaW5kZXguanNcIjtcclxuaW1wb3J0IGxvZ2dlciBmcm9tIFwiLi4vLi4vdXRpbHMvbG9nZ2VyLmpzXCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gd3JhcEZpbHRlcihmaWx0ZXIpIHtcclxuICByZXR1cm4gKC4uLmFyZ3MpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGlmIChhcmdzWzBdPy5kb2N1bWVudCAmJiBhcmdzWzBdPy53aW5kb3cpIHJldHVybiBmYWxzZTtcclxuICAgICAgaWYgKGFyZ3NbMF0/LmRlZmF1bHQ/LnJlbW92ZSAmJiBhcmdzWzBdPy5kZWZhdWx0Py5zZXQgJiYgYXJnc1swXT8uZGVmYXVsdD8uY2xlYXIgJiYgYXJnc1swXT8uZGVmYXVsdD8uZ2V0ICYmICFhcmdzWzBdPy5kZWZhdWx0Py5zb3J0KSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIGlmIChhcmdzWzBdLnJlbW92ZSAmJiBhcmdzWzBdLnNldCAmJiBhcmdzWzBdLmNsZWFyICYmIGFyZ3NbMF0uZ2V0ICYmICFhcmdzWzBdLnNvcnQpIHJldHVybiBmYWxzZTtcclxuICAgICAgaWYgKGFyZ3NbMF0/LmRlZmF1bHQ/LmdldFRva2VuIHx8IGFyZ3NbMF0/LmRlZmF1bHQ/LmdldEVtYWlsIHx8IGFyZ3NbMF0/LmRlZmF1bHQ/LnNob3dUb2tlbikgcmV0dXJuIGZhbHNlO1xyXG4gICAgICBpZiAoYXJnc1swXT8uZ2V0VG9rZW4gfHwgYXJnc1swXT8uZ2V0RW1haWwgfHwgYXJnc1swXT8uc2hvd1Rva2VuKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIHJldHVybiBmaWx0ZXIoLi4uYXJncyk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGxvZ2dlci53YXJuKFwiTW9kdWxlIGZpbHRlciB0aHJldyBhbiBleGNlcHRpb24uXCIsIGZpbHRlciwgZXJyKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNoZWNrTW9kdWxlU3RyaW5ncyhtLCBzdHJpbmdzLCBoYXNOb3QpIHtcclxuICBjb25zdCBjaGVjayA9IChzMSwgczIpID0+IHtcclxuICAgIHJldHVybiBoYXNOb3QgPyBzMS50b1N0cmluZygpLmluZGV4T2YoczIudG9TdHJpbmcoKSkgPT0gLTEgOiBzMS50b1N0cmluZygpLmluZGV4T2YoczIudG9TdHJpbmcoKSkgPiAtMTtcclxuICB9O1xyXG4gIHJldHVybiBzdHJpbmdzLmV2ZXJ5KGogPT4ge1xyXG4gICAgcmV0dXJuIGNoZWNrKG0/LnRvU3RyaW5nPy4oKSB8fCBcIlwiLCBqKVxyXG4gICAgICB8fCBjaGVjayhtPy5fX29yaWdpbmFsX18/LnRvU3RyaW5nPy4oKSB8fCBcIlwiLCBqKVxyXG4gICAgICB8fCBjaGVjayhtPy50eXBlPy50b1N0cmluZz8uKCkgfHwgXCJcIiwgailcclxuICAgICAgfHwgY2hlY2sobT8udHlwZT8uX19vcmlnaW5hbF9fPy50b1N0cmluZz8uKCkgfHwgXCJcIiwgailcclxuICAgICAgfHwgT2JqZWN0LmVudHJpZXMoWydmdW5jdGlvbicsICdvYmplY3QnXS5pbmNsdWRlcyh0eXBlb2YgbT8ucHJvdG90eXBlKSA/IHR5cGVvZiBtPy5wcm90b3R5cGUgOiB7fSkuZmlsdGVyKGkgPT4gaVswXT8uaW5jbHVkZXM/LihcInJlbmRlclwiKSkuc29tZShpID0+IGNoZWNrKGlbMV0/LnRvU3RyaW5nPy4oKSB8fCBcIlwiLCBqKSlcclxuICB9KTtcclxufTtcclxuZnVuY3Rpb24gY2hlY2tNb2R1bGVQcm9wcyhtLCBwcm9wZXJ0aWVzLCBoYXNOb3QpIHtcclxuICByZXR1cm4gcHJvcGVydGllcy5ldmVyeShwcm9wID0+IHtcclxuICAgIGNvbnN0IHZhbHVlID0gbVtwcm9wXT8uX19vcmlnaW5hbF9fIHx8IG1bcHJvcF07XHJcbiAgICByZXR1cm4gaGFzTm90ID8gdmFsdWUgPT09IHVuZGVmaW5lZCA6ICh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmICEodHlwZW9mIHZhbHVlID09IFwic3RyaW5nXCIgJiYgIXZhbHVlKSk7XHJcbiAgfSk7XHJcbn07XHJcbmZ1bmN0aW9uIGNoZWNrTW9kdWxlUHJvdG90eXBlcyhtLCBwcm90b1Byb3BzLCBoYXNOb3QpIHtcclxuICByZXR1cm4gbS5wcm90b3R5cGUgJiYgcHJvdG9Qcm9wcy5ldmVyeShwcm9wID0+IHtcclxuICAgIGNvbnN0IHZhbHVlID0gbS5wcm90b3R5cGVbcHJvcF07XHJcbiAgICByZXR1cm4gaGFzTm90ID8gdmFsdWUgPT09IHVuZGVmaW5lZCA6ICh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmICEodHlwZW9mIHZhbHVlID09IFwic3RyaW5nXCIgJiYgIXZhbHVlKSk7XHJcbiAgfSk7XHJcbn07XHJcblxyXG5jb25zdCB3ZWJwYWNrQ2h1bmtOYW1lID0gXCJ3ZWJwYWNrQ2h1bmtkaXNjb3JkX2FwcFwiO1xyXG5jb25zdCBwdXNoTGlzdGVuZXJzID0gbmV3IFNldCgpO1xyXG5cclxuXHJcbntcclxuICBsZXQgb2dQdXNoID0gd2luZG93W3dlYnBhY2tDaHVua05hbWVdLnB1c2g7XHJcblxyXG4gIGZ1bmN0aW9uIGhhbmRsZVB1c2goY2h1bmspIHtcclxuICAgIGNvbnN0IFssIG1vZHVsZXNdID0gY2h1bms7XHJcblxyXG4gICAgZm9yIChjb25zdCBtb2R1bGVJZCBpbiBPYmplY3Qua2V5cyhtb2R1bGVzIHx8IHt9KSkge1xyXG4gICAgICBjb25zdCBvZ01vZHVsZSA9IG1vZHVsZXNbbW9kdWxlSWRdO1xyXG5cclxuICAgICAgbW9kdWxlc1ttb2R1bGVJZF0gPSAobW9kdWxlLCBleHBvcnRzLCByZXF1aXJlKSA9PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIG9nTW9kdWxlLmNhbGwobnVsbCwgbW9kdWxlLCBleHBvcnRzLCByZXF1aXJlKTtcclxuXHJcbiAgICAgICAgICBwdXNoTGlzdGVuZXJzLmZvckVhY2gobGlzdGVuZXIgPT4ge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgIGxpc3RlbmVyKGV4cG9ydHMpO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgIHV0aWxzLmxvZ2dlci5lcnJvcihcIlB1c2ggbGlzdGVuZXIgdGhyZXcgYW4gZXhjZXB0aW9uLlwiLCBsaXN0ZW5lciwgZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICB1dGlscy5sb2dnZXIuZXJyb3IoXCJVbmFibGUgdG8gcGF0Y2ggcHVzaGVkIG1vZHVsZS5cIiwgZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuXHJcbiAgICAgIE9iamVjdC5hc3NpZ24obW9kdWxlc1ttb2R1bGVJZF0sIG9nTW9kdWxlLCB7XHJcbiAgICAgICAgX19vcmlnaW5hbF9fOiBvZ01vZHVsZSxcclxuICAgICAgICB0b1N0cmluZzogKCkgPT4gb2dNb2R1bGUudG9TdHJpbmcoKSxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG9nUHVzaC5jYWxsKHdpbmRvd1t3ZWJwYWNrQ2h1bmtOYW1lXSwgY2h1bmspO1xyXG4gIH1cclxuXHJcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvd1t3ZWJwYWNrQ2h1bmtOYW1lXSwgXCJwdXNoXCIsIHtcclxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcclxuICAgIGdldCgpIHsgcmV0dXJuIGhhbmRsZVB1c2g7IH0sXHJcbiAgICBzZXQodmFsdWUpIHtcclxuICAgICAgb2dQdXNoID0gdmFsdWU7XHJcblxyXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93W3RoaXMuY2h1bmtOYW1lXSwgXCJwdXNoXCIsIHtcclxuICAgICAgICB2YWx1ZTogdGhpcy5oYW5kbGVQdXNoLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcclxuICAgICAgICB3cml0YWJsZTogdHJ1ZVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9KTtcclxufVxyXG5cclxuXHJcblxyXG4vKipcclxuICogXHJcbiAqIEBwYXJhbSB7YW55fSBmaWx0ZXIgXHJcbiAqIEBwYXJhbSB7eyBzaWduYWw6IEFib3J0U2lnbmFsLCBzZWFyY2hFeHBvcnRzOiBib29sZWFuIH19IHBhcmFtMSBcclxuICogQHJldHVybnMgXHJcbiAqL1xyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbGF6eUZpbmQoZmlsdGVyLCB7IHNpZ25hbCA9IG51bGwsIHNlYXJjaEV4cG9ydHMgPSBmYWxzZSB9KSB7XHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgIGNvbnN0IGNhbmNlbCA9ICgpID0+IHB1c2hMaXN0ZW5lcnMuZGVsZXRlKGxpc3RlbmVyKTtcclxuICAgIGNvbnN0IGxpc3RlbmVyID0gKGV4cG9ydHMpID0+IHtcclxuICAgICAgaWYgKCFleHBvcnRzIHx8IGV4cG9ydHMgPT09IHdpbmRvdyB8fCBleHBvcnRzID09PSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpIHJldHVybjtcclxuXHJcbiAgICAgIGxldCBmb3VuZCA9IG51bGw7XHJcblxyXG4gICAgICBpZiAodHlwZW9mIGV4cG9ydHMgPT0gXCJvYmplY3RcIiAmJiBzZWFyY2hFeHBvcnRzKSB7XHJcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gZXhwb3J0cykge1xyXG4gICAgICAgICAgbGV0IGV4cG9ydGVkID0gZXhwb3J0c1trZXldO1xyXG4gICAgICAgICAgaWYgKCFleHBvcnRlZCkgY29udGludWU7XHJcbiAgICAgICAgICBpZiAoZmlsdGVyKGV4cG9ydGVkKSkge1xyXG4gICAgICAgICAgICBmb3VuZCA9IGV4cG9ydGVkO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbGV0IHBhdGhzID0gW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiLFxyXG4gICAgICAgICAgXCJcIlxyXG4gICAgICAgIF07XHJcbiAgICAgICAgZm91bmQgPSBwYXRocy5tYXAoaSA9PiB7XHJcbiAgICAgICAgICBsZXQgcGF0aGVkID0gIWkgPyBleHBvcnRzIDogXy5nZXQoZXhwb3J0cywgaSk7XHJcbiAgICAgICAgICBpZiAocGF0aGVkICYmIGZpbHRlcihwYXRoZWQpKSByZXR1cm4gcGF0aGVkO1xyXG4gICAgICAgIH0pLmZpbmQoaSA9PiBpKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCFmb3VuZCkgcmV0dXJuO1xyXG4gICAgICBjYW5jZWwoKTtcclxuICAgICAgcmVzb2x2ZShmb3VuZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVzaExpc3RlbmVycy5hZGQobGlzdGVuZXIpO1xyXG5cclxuICAgIHNpZ25hbD8uYWRkRXZlbnRMaXN0ZW5lcihcImFib3J0XCIsICgpID0+IHtcclxuICAgICAgY2FuY2VsKCk7XHJcbiAgICAgIHJlc29sdmUobnVsbCk7XHJcbiAgICB9KTtcclxuICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGZpbmQocmVxLCBmaWx0ZXIsIGNvbmZpZyA9IHt9KSB7XHJcbiAgbGV0IGRlZmF1bHRFeHBvcnQgPSB0eXBlb2YgY29uZmlnLmRlZmF1bHRFeHBvcnQgIT0gXCJib29sZWFuXCIgPyBmYWxzZSA6IGNvbmZpZy5kZWZhdWx0RXhwb3J0O1xyXG4gIGxldCB1bmxvYWRlZCA9IHR5cGVvZiBjb25maWcudW5sb2FkZWQgIT0gXCJib29sZWFuXCIgPyBmYWxzZSA6IGNvbmZpZy51bmxvYWRlZDtcclxuICBsZXQgYWxsID0gdHlwZW9mIGNvbmZpZy5hbGwgIT0gXCJib29sZWFuXCIgPyBmYWxzZSA6IGNvbmZpZy5hbGw7XHJcbiAgY29uc3QgZm91bmQgPSBbXTtcclxuICBpZiAoIXVubG9hZGVkKSBmb3IgKGxldCBpIGluIHJlcS5jKSBpZiAocmVxLmMuaGFzT3duUHJvcGVydHkoaSkpIHtcclxuICAgIGxldCBtID0gcmVxLmNbaV0uZXhwb3J0cywgciA9IG51bGw7XHJcbiAgICBpZiAobSAmJiAodHlwZW9mIG0gPT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgbSA9PSBcImZ1bmN0aW9uXCIpKSB7XHJcbiAgICAgIGlmICghIShyID0gZmlsdGVyKG0sIGkpKSkge1xyXG4gICAgICAgIGlmIChhbGwpIGZvdW5kLnB1c2goZGVmYXVsdEV4cG9ydCA/IHIgOiByZXEuY1tpXSk7XHJcbiAgICAgICAgZWxzZSByZXR1cm4gZGVmYXVsdEV4cG9ydCA/IHIgOiByZXEuY1tpXTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIGZvciAobGV0IGtleSBvZiBPYmplY3Qua2V5cyhtKSkgaWYgKGtleS5sZW5ndGggPCA0ICYmIG1ba2V5XSAmJiAhIShyID0gZmlsdGVyKG1ba2V5XSwgaSkpKSB7XHJcbiAgICAgICAgaWYgKGFsbCkgZm91bmQucHVzaChkZWZhdWx0RXhwb3J0ID8gciA6IHJlcS5jW2ldKTtcclxuICAgICAgICBlbHNlIHJldHVybiBkZWZhdWx0RXhwb3J0ID8gciA6IHJlcS5jW2ldO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAobSAmJiBtLl9fZXNNb2R1bGUgJiYgbS5kZWZhdWx0ICYmICh0eXBlb2YgbS5kZWZhdWx0ID09IFwib2JqZWN0XCIgfHwgdHlwZW9mIG0uZGVmYXVsdCA9PSBcImZ1bmN0aW9uXCIpKSB7XHJcbiAgICAgIGlmICghIShyID0gZmlsdGVyKG0uZGVmYXVsdCwgaSkpKSB7XHJcbiAgICAgICAgaWYgKGFsbCkgZm91bmQucHVzaChkZWZhdWx0RXhwb3J0ID8gciA6IHJlcS5jW2ldKTtcclxuICAgICAgICBlbHNlIHJldHVybiBkZWZhdWx0RXhwb3J0ID8gciA6IHJlcS5jW2ldO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYgKG0uZGVmYXVsdC50eXBlICYmICh0eXBlb2YgbS5kZWZhdWx0LnR5cGUgPT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgbS5kZWZhdWx0LnR5cGUgPT0gXCJmdW5jdGlvblwiKSAmJiAhIShyID0gZmlsdGVyKG0uZGVmYXVsdC50eXBlLCBpKSkpIHtcclxuICAgICAgICBpZiAoYWxsKSBmb3VuZC5wdXNoKGRlZmF1bHRFeHBvcnQgPyByIDogcmVxLmNbaV0pO1xyXG4gICAgICAgIGVsc2UgcmV0dXJuIGRlZmF1bHRFeHBvcnQgPyByIDogcmVxLmNbaV07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgZm9yIChsZXQgaSBpbiByZXEubSkgaWYgKHJlcS5tLmhhc093blByb3BlcnR5KGkpKSB7XHJcbiAgICBsZXQgbSA9IHJlcS5tW2ldO1xyXG4gICAgaWYgKG0gJiYgdHlwZW9mIG0gPT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgIGlmIChyZXEuY1tpXSAmJiAhdW5sb2FkZWQgJiYgZmlsdGVyKG0sIGkpKSB7XHJcbiAgICAgICAgaWYgKGFsbCkgZm91bmQucHVzaChkZWZhdWx0RXhwb3J0ID8gcmVxLmNbaV0uZXhwb3J0cyA6IHJlcS5jW2ldKTtcclxuICAgICAgICBlbHNlIHJldHVybiBkZWZhdWx0RXhwb3J0ID8gcmVxLmNbaV0uZXhwb3J0cyA6IHJlcS5jW2ldO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICghcmVxLmNbaV0gJiYgdW5sb2FkZWQgJiYgZmlsdGVyKG0sIGkpKSB7XHJcbiAgICAgICAgY29uc3QgcmVzb2x2ZWQgPSB7fSwgcmVzb2x2ZWQyID0ge307XHJcbiAgICAgICAgbShyZXNvbHZlZCwgcmVzb2x2ZWQyLCByZXEpO1xyXG4gICAgICAgIGNvbnN0IHRydWVSZXNvbHZlZCA9IHJlc29sdmVkMiAmJiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhyZXNvbHZlZDIgfHwge30pLmxlbmd0aCA9PSAwID8gcmVzb2x2ZWQgOiByZXNvbHZlZDI7XHJcbiAgICAgICAgaWYgKGFsbCkgZm91bmQucHVzaChkZWZhdWx0RXhwb3J0ID8gdHJ1ZVJlc29sdmVkLmV4cG9ydHMgOiB0cnVlUmVzb2x2ZWQpO1xyXG4gICAgICAgIGVsc2UgcmV0dXJuIGRlZmF1bHRFeHBvcnQgPyB0cnVlUmVzb2x2ZWQuZXhwb3J0cyA6IHRydWVSZXNvbHZlZDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICBpZiAoYWxsKSByZXR1cm4gZm91bmQ7XHJcbn07XHJcblxyXG5cclxuZnVuY3Rpb24gZmluZGVyRmluZEZ1bmN0aW9uKGVudHJpZXMsIHN0cmluZ3MpIHtcclxuICByZXR1cm4gKGVudHJpZXMuZmluZChuID0+IHtcclxuICAgIGxldCBmdW5jU3RyaW5nID0gdHlwZW9mIG5bMV0gPT0gXCJmdW5jdGlvblwiID8gKG5bMV0/Ll9fb3JpZ2luYWxfXz8udG9TdHJpbmc/LigpIHx8IG5bMV0/LnRvU3RyaW5nPy4oKSB8fCBcIlwiKSA6ICgoKSA9PiB7IHRyeSB7IHJldHVybiBKU09OLnN0cmluZ2lmeShuWzFdKSB9IGNhdGNoIChlcnIpIHsgcmV0dXJuIG5bMV0udG9TdHJpbmcoKSB9IH0pKCk7XHJcbiAgICBsZXQgcmVuZGVyRnVuY1N0cmluZyA9IG5bMV0/LnJlbmRlcj8uX19vcmlnaW5hbF9fPy50b1N0cmluZz8uKCkgfHwgblsxXT8ucmVuZGVyPy50b1N0cmluZz8uKCkgfHwgXCJcIjtcclxuICAgIHJldHVybiBzdHJpbmdzLmV2ZXJ5KHN0cmluZyA9PiBmdW5jU3RyaW5nLmluZGV4T2Yoc3RyaW5nKSAhPSAtMSB8fCByZW5kZXJGdW5jU3RyaW5nLmluZGV4T2Yoc3RyaW5nKSAhPSAtMSk7XHJcbiAgfSkpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZmluZGVyVG9GaWx0ZXIoZmluZGVyKSB7XHJcbiAgbGV0IGZvdW5kID0gKCkgPT4gZmFsc2U7XHJcbiAgaWYgKHR5cGVvZiBmaW5kZXI/LmZpbHRlciA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgZm91bmQgPSB3cmFwRmlsdGVyKGV2YWwoYCgoJCk9PnsgdHJ5IHsgcmV0dXJuICgke2ZpbmRlci5maWx0ZXJ9KTsgfSBjYXRjaCB7IHJldHVybiBmYWxzZTsgfSB9KWApKTtcclxuICB9IGVsc2UgaWYgKHR5cGVvZiBmaW5kZXI/LmZpbHRlciA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICBmb3VuZCA9IHdyYXBGaWx0ZXIoZmluZGVyLmZpbHRlcik7XHJcbiAgfSBlbHNlIHtcclxuICAgIHN3aXRjaCAoZmluZGVyLmZpbHRlci5pbikge1xyXG4gICAgICBjYXNlIFwicHJvcGVydGllc1wiOiB7XHJcbiAgICAgICAgaWYgKGZpbmRlci5maWx0ZXIuYnk/LlsxXT8ubGVuZ3RoKSB7XHJcbiAgICAgICAgICBmb3VuZCA9IHdyYXBGaWx0ZXIoKG0pID0+IGNoZWNrTW9kdWxlUHJvcHMobSwgZmluZGVyLmZpbHRlci5ieT8uWzBdIHx8IFtdKSAmJiBjaGVja01vZHVsZVByb3BzKG0sIGZpbmRlci5maWx0ZXIuYnk/LlsxXSB8fCBbXSwgdHJ1ZSkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBmb3VuZCA9IHdyYXBGaWx0ZXIoKG0pID0+IGNoZWNrTW9kdWxlUHJvcHMobSwgZmluZGVyLmZpbHRlci5ieT8uWzBdIHx8IFtdKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgXCJwcm90b3R5cGVzXCI6IHtcclxuICAgICAgICBpZiAoZmluZGVyLmZpbHRlci5ieT8uWzFdPy5sZW5ndGgpIHtcclxuICAgICAgICAgIGZvdW5kID0gd3JhcEZpbHRlcigobSkgPT4gY2hlY2tNb2R1bGVQcm90b3R5cGVzKG0sIGZpbmRlci5maWx0ZXIuYnk/LlswXSB8fCBbXSkgJiYgY2hlY2tNb2R1bGVQcm90b3R5cGVzKG0sIGZpbmRlci5maWx0ZXIuYnk/LlsxXSB8fCBbXSwgdHJ1ZSkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBmb3VuZCA9IHdyYXBGaWx0ZXIoKG0pID0+IGNoZWNrTW9kdWxlUHJvdG90eXBlcyhtLCBmaW5kZXIuZmlsdGVyLmJ5Py5bMF0gfHwgW10pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSBcInN0cmluZ3NcIjoge1xyXG4gICAgICAgIGlmIChmaW5kZXIuZmlsdGVyLmJ5Py5bMV0/Lmxlbmd0aCkge1xyXG4gICAgICAgICAgZm91bmQgPSB3cmFwRmlsdGVyKChtKSA9PiBjaGVja01vZHVsZVN0cmluZ3MobSwgZmluZGVyLmZpbHRlci5ieT8uWzBdIHx8IFtdKSAmJiBjaGVja01vZHVsZVN0cmluZ3MobSwgZmluZGVyLmZpbHRlci5ieT8uWzFdIHx8IFtdLCB0cnVlKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGZvdW5kID0gd3JhcEZpbHRlcigobSkgPT4gY2hlY2tNb2R1bGVTdHJpbmdzKG0sIGZpbmRlci5maWx0ZXIuYnk/LlswXSB8fCBbXSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gZm91bmQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBmaW5kZXJNYXAoX19vcmlnaW5hbF9fLCBtYXApIHtcclxuICBsZXQgX19tYXBwZWRfXyA9IHt9O1xyXG5cclxuICBsZXQgdGVtcCA9IHtcclxuICAgIF9fb3JpZ2luYWxfXyxcclxuICAgIF9fbWFwcGVkX18sXHJcbiAgICAuLi5fX29yaWdpbmFsX19cclxuICB9O1xyXG5cclxuICBPYmplY3QuZW50cmllcyhtYXApLmZvckVhY2goKFtrZXksIHN0cmluZ3NdKSA9PiB7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGVtcCwga2V5LCB7XHJcbiAgICAgIGdldCgpIHtcclxuICAgICAgICBpZiAoX19tYXBwZWRfX1trZXldKSByZXR1cm4gX19vcmlnaW5hbF9fW19fbWFwcGVkX19ba2V5XV07XHJcblxyXG4gICAgICAgIGxldCBmb3VuZEZ1bmMgPSBmaW5kZXJGaW5kRnVuY3Rpb24oT2JqZWN0LmVudHJpZXMoX19vcmlnaW5hbF9fIHx8IHt9KSwgbWFwW2tleV0gfHwgW10pO1xyXG4gICAgICAgIGlmICghZm91bmRGdW5jPy5sZW5ndGgpIHJldHVybjtcclxuXHJcbiAgICAgICAgX19tYXBwZWRfX1trZXldID0gZm91bmRGdW5jWzBdO1xyXG4gICAgICAgIHJldHVybiBmb3VuZEZ1bmNbMV07XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiB0ZW1wO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZmluZEJ5RmluZGVyKHJlcSwgZmluZGVyID0ge30pIHtcclxuICBjb25zdCBkZWZhdWx0RXhwb3J0ID0gISFmaW5kZXI/LmZpbHRlcj8uZXhwb3J0O1xyXG4gIGxldCBmb3VuZCA9IGZpbmQocmVxLCBmaW5kZXJUb0ZpbHRlcihmaW5kZXIpLCB7IGRlZmF1bHRFeHBvcnQsIGFsbDogdHJ1ZSB9KS5maW5kKGkgPT4gaSAhPT0gZ2xvYmFsVGhpcy53aW5kb3cgfHwgaT8uZXhwb3J0cyAhPT0gZ2xvYmFsVGhpcy53aW5kb3cpO1xyXG5cclxuICBpZiAoIWZvdW5kKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgaWYgKGZpbmRlci5wYXRoPy5iZWZvcmUpIGZvdW5kID0gKEFycmF5LmlzQXJyYXkoZmluZGVyLnBhdGguYmVmb3JlKSA/IGZpbmRlci5wYXRoLmJlZm9yZS5tYXAoaSA9PiBfLmdldChmb3VuZCwgaSkpLmZpbmQoaSA9PiBpKSA6IF8uZ2V0KGZvdW5kLCBmaW5kZXIucGF0aC5iZWZvcmUpKSB8fCBmb3VuZDtcclxuICBpZiAoZmluZGVyLmFzc2lnbikgZm91bmQgPSBPYmplY3QuYXNzaWduKHt9LCBmb3VuZCk7XHJcblxyXG4gIGlmICghZm91bmQpIHJldHVybiBudWxsO1xyXG5cclxuICBpZiAoZmluZGVyLm1hcCkgZm91bmQgPSBmaW5kZXJNYXAoZm91bmQsIGZpbmRlci5tYXApO1xyXG5cclxuICBpZiAoZmluZGVyLnBhdGg/LmFmdGVyKSBmb3VuZCA9IChBcnJheS5pc0FycmF5KGZpbmRlci5wYXRoLmFmdGVyKSA/IGZpbmRlci5wYXRoLmFmdGVyLm1hcChpID0+IF8uZ2V0KGZvdW5kLCBpKSkuZmluZChpID0+IGkpIDogXy5nZXQoZm91bmQsIGZpbmRlci5wYXRoLmFmdGVyKSkgfHwgZm91bmQ7XHJcblxyXG4gIHJldHVybiBmb3VuZDtcclxufVxyXG5cclxuXHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbGF6eUZpbmRCeUZpbmRlcihmaW5kZXIgPSB7fSkge1xyXG4gIGxldCBmb3VuZCA9IGF3YWl0IGxhenlGaW5kKGZpbmRlclRvRmlsdGVyKGZpbmRlciksIHsgc2VhcmNoRXhwb3J0czogZmFsc2UgfSk7XHJcblxyXG4gIGlmICghZm91bmQpIHJldHVybiBudWxsO1xyXG5cclxuICBpZiAoZmluZGVyLnBhdGg/LmJlZm9yZSkgZm91bmQgPSAoQXJyYXkuaXNBcnJheShmaW5kZXIucGF0aC5iZWZvcmUpID8gZmluZGVyLnBhdGguYmVmb3JlLm1hcChpID0+IF8uZ2V0KGZvdW5kLCBpKSkuZmluZChpID0+IGkpIDogXy5nZXQoZm91bmQsIGZpbmRlci5wYXRoLmJlZm9yZSkpIHx8IGZvdW5kO1xyXG4gIGlmIChmaW5kZXIuYXNzaWduKSBmb3VuZCA9IE9iamVjdC5hc3NpZ24oe30sIGZvdW5kKTtcclxuXHJcbiAgaWYgKCFmb3VuZCkgcmV0dXJuIG51bGw7XHJcblxyXG4gIGlmIChmaW5kZXIubWFwKSBmb3VuZCA9IGZpbmRlck1hcChmb3VuZCwgZmluZGVyLm1hcCk7XHJcblxyXG4gIGlmIChmaW5kZXIucGF0aD8uYWZ0ZXIpIGZvdW5kID0gKEFycmF5LmlzQXJyYXkoZmluZGVyLnBhdGguYWZ0ZXIpID8gZmluZGVyLnBhdGguYWZ0ZXIubWFwKGkgPT4gXy5nZXQoZm91bmQsIGkpKS5maW5kKGkgPT4gaSkgOiBfLmdldChmb3VuZCwgZmluZGVyLnBhdGguYWZ0ZXIpKSB8fCBmb3VuZDtcclxuXHJcbiAgcmV0dXJuIGZvdW5kO1xyXG59IiwgImltcG9ydCAqIGFzIGNvbXBsZXhGaW5kZXIgZnJvbSBcIi4vcmF3L2NvbXBsZXgtZmluZGVyLmpzXCI7XHJcblxyXG5jb25zdCBkZWZhdWx0QmVmb3JlID0gW1xyXG4gIFwiZXhwb3J0cy5aXCIsXHJcbiAgXCJleHBvcnRzLlpQXCIsXHJcbiAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICBcImV4cG9ydHNcIlxyXG5dO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIF9fY2FjaGVfXzoge30sXHJcbiAgZ2V0IHJlcXVpcmUoKSB7XHJcbiAgICBpZiAodGhpcy5fX2NhY2hlX18ucmVxdWlyZSkgcmV0dXJuIHRoaXMuX19jYWNoZV9fLnJlcXVpcmU7XHJcbiAgICBsZXQgcmVxSWQgPSBgQWNvcmRXZWJwYWNrTW9kdWxlcyR7RGF0ZS5ub3coKX1gO1xyXG4gICAgY29uc3QgcmVxID0gd2luZG93LndlYnBhY2tDaHVua2Rpc2NvcmRfYXBwLnB1c2goW1tyZXFJZF0sIHt9LCByZXEgPT4gcmVxXSk7XHJcbiAgICBkZWxldGUgcmVxLm1bcmVxSWRdO1xyXG4gICAgZGVsZXRlIHJlcS5jW3JlcUlkXTtcclxuICAgIHdpbmRvdy53ZWJwYWNrQ2h1bmtkaXNjb3JkX2FwcC5wb3AoKTtcclxuICAgIHRoaXMuX19jYWNoZV9fLnJlcXVpcmUgPSByZXE7XHJcbiAgICByZXR1cm4gcmVxO1xyXG4gIH0sXHJcbiAgZmluZChmaWx0ZXIsIGNvbmZpZyA9IHt9KSB7XHJcbiAgICByZXR1cm4gY29tcGxleEZpbmRlci5maW5kKHRoaXMucmVxdWlyZSwgY29tcGxleEZpbmRlci53cmFwRmlsdGVyKGZpbHRlciksIGNvbmZpZyk7XHJcbiAgfSxcclxuICBsYXp5RmluZChmaWx0ZXIsIGNvbmZpZyA9IHt9KSB7XHJcbiAgICByZXR1cm4gY29tcGxleEZpbmRlci5sYXp5RmluZChjb21wbGV4RmluZGVyLndyYXBGaWx0ZXIoZmlsdGVyKSwgY29uZmlnKTtcclxuICB9LFxyXG4gIGxhenlGaW5kQnlGaW5kZXIoZmluZGVyKSB7XHJcbiAgICByZXR1cm4gY29tcGxleEZpbmRlci5sYXp5RmluZEJ5RmluZGVyKGZpbmRlcik7XHJcbiAgfSxcclxuICBmaWx0ZXIoZmlsdGVyLCBjb25maWcgPSB7fSkge1xyXG4gICAgcmV0dXJuIGNvbXBsZXhGaW5kZXIuZmluZCh0aGlzLnJlcXVpcmUsIGNvbXBsZXhGaW5kZXIud3JhcEZpbHRlcihmaWx0ZXIpLCB7IC4uLmNvbmZpZywgYWxsOiB0cnVlIH0pO1xyXG4gIH0sXHJcbiAgZmluZEJ5RmluZGVyKGZpbmRlcikge1xyXG4gICAgcmV0dXJuIGNvbXBsZXhGaW5kZXIuZmluZEJ5RmluZGVyKHRoaXMucmVxdWlyZSwgZmluZGVyKTtcclxuICB9LFxyXG4gIGZpbmRCeVN0cmluZ1ZhbHVlcyguLi5zdHJpbmdWYWx1ZXMpIHtcclxuICAgIHJldHVybiB0aGlzLmZpbmQoKGEpID0+IHsgbGV0IHZhID0gT2JqZWN0LnZhbHVlcyhhKTsgcmV0dXJuIHN0cmluZ1ZhbHVlcy5ldmVyeSh4ID0+IHZhLnNvbWUoeSA9PiB0eXBlb2YgeSA9PSBcInN0cmluZ1wiICYmIHkuaW5jbHVkZXMoeCkpKSB9KT8uZXhwb3J0cztcclxuICB9LFxyXG4gIGZpbmRCeVByb3BlcnRpZXMoLi4ucHJvcHMpIHtcclxuICAgIHJldHVybiB0aGlzLmZpbmRCeUZpbmRlcih7XHJcbiAgICAgIGZpbHRlcjoge1xyXG4gICAgICAgIGV4cG9ydDogZmFsc2UsXHJcbiAgICAgICAgaW46IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIGJ5OiBbcHJvcHNdXHJcbiAgICAgIH0sXHJcbiAgICAgIHBhdGg6IHtcclxuICAgICAgICBiZWZvcmU6IGRlZmF1bHRCZWZvcmVcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSxcclxuICBmaW5kQnlQcm90b3R5cGVzKC4uLnByb3BzKSB7XHJcbiAgICByZXR1cm4gdGhpcy5maW5kQnlGaW5kZXIoe1xyXG4gICAgICBmaWx0ZXI6IHtcclxuICAgICAgICBleHBvcnQ6IGZhbHNlLFxyXG4gICAgICAgIGluOiBcInByb3RvdHlwZXNcIixcclxuICAgICAgICBieTogW3Byb3BzXVxyXG4gICAgICB9LFxyXG4gICAgICBwYXRoOiB7XHJcbiAgICAgICAgYmVmb3JlOiBkZWZhdWx0QmVmb3JlXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgZmluZEJ5U3RyaW5ncyguLi5wcm9wcykge1xyXG4gICAgcmV0dXJuIHRoaXMuZmluZEJ5RmluZGVyKHtcclxuICAgICAgZmlsdGVyOiB7XHJcbiAgICAgICAgZXhwb3J0OiBmYWxzZSxcclxuICAgICAgICBpbjogXCJzdHJpbmdzXCIsXHJcbiAgICAgICAgYnk6IFtwcm9wc11cclxuICAgICAgfSxcclxuICAgICAgcGF0aDoge1xyXG4gICAgICAgIGJlZm9yZTogZGVmYXVsdEJlZm9yZVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9LFxyXG59OyIsICJpbXBvcnQgY29tbW9uRGF0YSBmcm9tICcuLi8uLi9kYXRhL2NvbW1vbi5qc29uJztcclxuaW1wb3J0IHdlYnBhY2sgZnJvbSAnLi93ZWJwYWNrLmpzJztcclxuXHJcblxyXG5mdW5jdGlvbiBtYXBPYmplY3QodGVtcCwgaW5wKSB7XHJcbiAgaWYgKCF0ZW1wPy5fX2NhY2hlX18pIHRlbXAuX19jYWNoZV9fID0ge307XHJcbiAgZm9yIChjb25zdCBrZXkgaW4gaW5wKSB7XHJcbiAgICBpZiAoaW5wPy5ba2V5XT8uX18gPT09IHRydWUpIHtcclxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRlbXAsIGtleSwge1xyXG4gICAgICAgIGdldCgpIHtcclxuICAgICAgICAgIGlmICh0ZW1wLl9fY2FjaGVfX1trZXldKSByZXR1cm4gdGVtcC5fX2NhY2hlX19ba2V5XTtcclxuICAgICAgICAgIHJldHVybiB0ZW1wLl9fY2FjaGVfX1trZXldID0gd2VicGFjay5maW5kQnlGaW5kZXIoaW5wW2tleV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICh0eXBlb2YgdGVtcFtrZXldID09PSBcInVuZGVmaW5lZFwiKSB0ZW1wW2tleV0gPSB7fTtcclxuICAgICAgbWFwT2JqZWN0KHRlbXBba2V5XSwgaW5wW2tleV0pO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuXHJcbmxldCBjb21tb24gPSB7XHJcbiAgX19jYWNoZV9fOiB7fSxcclxuICBMYXllckFjdGlvbnM6IHtcclxuICAgIHB1c2goY29tcG9uZW50KSB7XHJcbiAgICAgIGNvbW1vbi5GbHV4RGlzcGF0Y2hlci5kaXNwYXRjaCh7XHJcbiAgICAgICAgdHlwZTogXCJMQVlFUl9QVVNIXCIsXHJcbiAgICAgICAgY29tcG9uZW50XHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIHBvcCgpIHtcclxuICAgICAgY29tbW9uLkZsdXhEaXNwYXRjaGVyLmRpc3BhdGNoKHtcclxuICAgICAgICB0eXBlOiBcIkxBWUVSX1BPUFwiXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIHBvcEFsbCgpIHtcclxuICAgICAgY29tbW9uLkZsdXhEaXNwYXRjaGVyLmRpc3BhdGNoKHtcclxuICAgICAgICB0eXBlOiBcIkxBWUVSX1BPUF9BTExcIlxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9LFxyXG59O1xyXG5tYXBPYmplY3QoY29tbW9uLCBjb21tb25EYXRhLmNvbW1vbik7XHJcbntcclxuICBsZXQgcGF0aHMgPSBbXHJcbiAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgXCJleHBvcnRzXCJcclxuICBdO1xyXG4gIHdlYnBhY2suZmlsdGVyKChpKSA9PiBpPy5nZXROYW1lPy4oKT8uZW5kc1dpdGg/LihcIlN0b3JlXCIpLCB7IGRlZmF1bHRFeHBvcnQ6IGZhbHNlIH0pLmZvckVhY2goKG0pID0+IHtcclxuICAgIGxldCBvYmogPSBwYXRocy5tYXAocGF0aCA9PiBfLmdldChtLCBwYXRoKSkuZmluZChpID0+IGkpO1xyXG4gICAgaWYgKCFvYmopIHJldHVybjtcclxuICAgIGxldCBuYW1lID0gb2JqPy5nZXROYW1lPy4oKTtcclxuICAgIGlmICghbmFtZSkgcmV0dXJuO1xyXG4gICAgaWYgKGNvbW1vbltuYW1lXSkgcmV0dXJuO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb21tb24sIG5hbWUsIHtcclxuICAgICAgZ2V0KCkge1xyXG4gICAgICAgIGlmIChjb21tb24uX19jYWNoZV9fW25hbWVdKSByZXR1cm4gY29tbW9uLl9fY2FjaGVfX1tuYW1lXTtcclxuICAgICAgICByZXR1cm4gY29tbW9uLl9fY2FjaGVfX1tuYW1lXSA9IG9iajtcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9KVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb21tb247IiwgImltcG9ydCBjb21tb24gZnJvbSBcIi4vY29tbW9uLmpzXCI7XHJcbmltcG9ydCB3ZWJwYWNrIGZyb20gXCIuL3dlYnBhY2suanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBjb21tb24sXHJcbiAgd2VicGFjayxcclxuICByZXF1aXJlOiBnbG9iYWxUaGlzW1wiPFBSRUxPQURfS0VZPlwiXS5yZXF1aXJlLFxyXG4gIG5hdGl2ZTogRGlzY29yZE5hdGl2ZSxcclxufSIsICJpbXBvcnQgbW9kdWxlcyBmcm9tIFwiLi4vbW9kdWxlcy9pbmRleC5qc1wiXHJcbmltcG9ydCB1dGlscyBmcm9tIFwiLi4vdXRpbHMvaW5kZXguanNcIjtcclxuXHJcbmNvbnN0IEJBU0VfVVJMID0gXCJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vYWNvcmQtc3RhbmRhbG9uZS9hc3NldHMvbWFpbi9pMThuXCI7XHJcbmNvbnN0IG5vU3RvcmUgPSB7IGNhY2hlOiBcIm5vLXN0b3JlXCIgfTtcclxuXHJcblxyXG5jb25zdCBvdXQgPSB7XHJcbiAgX19jYWNoZV9fOiB7XHJcbiAgICBsb2NhbGVJZHM6IFtdLFxyXG4gICAgbG9jYWxpemF0aW9uczoge31cclxuICB9LFxyXG4gIGdldCBsb2NhbGUoKSB7XHJcbiAgICByZXR1cm4gbW9kdWxlcy5jb21tb24uaTE4bi5fcmVxdWVzdGVkTG9jYWxlO1xyXG4gIH0sXHJcbiAgZ2V0KGtleSkge1xyXG4gICAgY2hlY2soKTtcclxuICAgIHJldHVybiBvdXQuX19jYWNoZV9fLmxvY2FsaXphdGlvbnNbb3V0LmxvY2FsZV0/LltrZXldXHJcbiAgICAgIHx8IG91dC5fX2NhY2hlX18ubG9jYWxpemF0aW9ucy5kZWZhdWx0Py5ba2V5XVxyXG4gICAgICB8fCBtb2R1bGVzLmNvbW1vbi5pMThuLk1lc3NhZ2VzW2tleV1cclxuICAgICAgfHwga2V5O1xyXG4gIH0sXHJcbiAgbWVzc2FnZXM6IG5ldyBQcm94eSh7fSwge1xyXG4gICAgZ2V0KF8sIHByb3ApIHtcclxuICAgICAgcmV0dXJuIG91dC5nZXQocHJvcCk7XHJcbiAgICB9XHJcbiAgfSksXHJcbiAgbG9jYWxpemUoc3RyKSB7XHJcbiAgICBpZiAodHlwZW9mIHN0ciA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIHN0cjtcclxuICAgIHJldHVybiBzdHI/LltvdXQubG9jYWxlXVxyXG4gICAgICB8fCBzdHI/LmRlZmF1bHRcclxuICAgICAgfHwgT2JqZWN0LnZhbHVlcyhzdHIpWzBdO1xyXG4gIH0sXHJcbiAgZm9ybWF0KGtleSwgLi4uYXJncykge1xyXG4gICAgcmV0dXJuIHV0aWxzLmZvcm1hdChvdXQuZ2V0KGtleSksIC4uLmFyZ3MpO1xyXG4gIH1cclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gY2hlY2soKSB7XHJcbiAgY29uc3QgbG9jYWxlID0gb3V0LmxvY2FsZTtcclxuICBpZiAoIW91dC5fX2NhY2hlX18ubG9jYWxlSWRzLmxlbmd0aCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgb3V0Ll9fY2FjaGVfXy5sb2NhbGVJZHMgPSBhd2FpdCAoYXdhaXQgZmV0Y2goYCR7QkFTRV9VUkx9L2xvY2FsZXMuanNvbmAsIG5vU3RvcmUpKS5qc29uKCk7XHJcbiAgICB9IGNhdGNoIHsgfVxyXG4gICAgdHJ5IHtcclxuICAgICAgb3V0Ll9fY2FjaGVfXy5sb2NhbGl6YXRpb25zLmRlZmF1bHQgPSBhd2FpdCAoYXdhaXQgZmV0Y2goYCR7QkFTRV9VUkx9L2RlZmF1bHQuanNvbmAsIG5vU3RvcmUpKS5qc29uKCk7XHJcbiAgICB9IGNhdGNoIHsgfVxyXG4gIH1cclxuICBpZiAoXHJcbiAgICBvdXQuX19jYWNoZV9fLmxvY2FsZUlkcy5pbmNsdWRlcyhsb2NhbGUpXHJcbiAgICAmJiAhb3V0Ll9fY2FjaGVfXy5sb2NhbGl6YXRpb25zPy5bbG9jYWxlXVxyXG4gICkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgb3V0Ll9fY2FjaGVfXy5sb2NhbGl6YXRpb25zW2xvY2FsZV0gPSBhd2FpdCAoYXdhaXQgZmV0Y2goYCR7QkFTRV9VUkx9LyR7bG9jYWxlfS5qc29uYCwgbm9TdG9yZSkpLmpzb24oKTtcclxuICAgIH0gY2F0Y2ggeyB9O1xyXG4gIH1cclxufVxyXG5cclxuY2hlY2soKTtcclxuZXhwb3J0IGRlZmF1bHQgb3V0OyIsICJpbXBvcnQgbW9kdWxlcyBmcm9tIFwiLi4vYXBpL21vZHVsZXMvaW5kZXguanNcIjtcclxuaW1wb3J0IGkxOG4gZnJvbSBcIi4uL2FwaS9pMThuL2luZGV4LmpzXCI7XHJcblxyXG5sZXQgaXNDb25uZWN0aW9uT3BlbiA9IGZhbHNlO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHdhaXRVbnRpbENvbm5lY3Rpb25PcGVuKCkge1xyXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG4gICAgaWYgKGlzQ29ubmVjdGlvbk9wZW4pIHJldHVybiByZXNvbHZlKHRydWUpO1xyXG4gICAgZnVuY3Rpb24gb25FdmVudCgpIHtcclxuICAgICAgbW9kdWxlcy5jb21tb24uRmx1eERpc3BhdGNoZXIudW5zdWJzY3JpYmUoXCJDT05ORUNUSU9OX09QRU5cIiwgb25FdmVudCk7XHJcbiAgICAgIGlzQ29ubmVjdGlvbk9wZW4gPSB0cnVlO1xyXG4gICAgICByZXNvbHZlKHRydWUpO1xyXG4gICAgfVxyXG4gICAgbW9kdWxlcy5jb21tb24uRmx1eERpc3BhdGNoZXIuc3Vic2NyaWJlKFwiQ09OTkVDVElPTl9PUEVOXCIsIG9uRXZlbnQpO1xyXG4gIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TG9jYWxpemVkKHYpIHtcclxuICBpZiAodHlwZW9mIHYgPT09IFwic3RyaW5nXCIpIHJldHVybiB2O1xyXG4gIHJldHVybiB2Py5baTE4bi5sb2NhbGVdIHx8IHY/LmRlZmF1bHQgfHwgT2JqZWN0LnZhbHVlcyh2KVswXTtcclxufSIsICJleHBvcnQgY2xhc3MgQmFzaWNFdmVudEVtaXR0ZXIge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgLyoqIEB0eXBlIHtNYXA8c3RyaW5nLCBNYXA8KC4uLmFyZ3M6IGFueVtdKT0+dm9pZCwge29uY2U6IGJvb2xlYW59Pj59ICovXHJcbiAgICB0aGlzLmxpc3RlbmVycyA9IG5ldyBNYXAoKTtcclxuICB9XHJcblxyXG4gIF9wcmVwYXJlTGlzdGVuZXJzTWFwKGV2ZW50TmFtZSkge1xyXG4gICAgaWYgKCF0aGlzLmxpc3RlbmVycy5oYXMoZXZlbnROYW1lKSlcclxuICAgICAgdGhpcy5saXN0ZW5lcnMuc2V0KGV2ZW50TmFtZSwgbmV3IE1hcCgpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudE5hbWVcclxuICAgKiBAcGFyYW0geyguLi5hcmdzOiBhbnlbXSk9PnZvaWR9IGxpc3RlbmVyXHJcbiAgICovXHJcbiAgb24oZXZlbnROYW1lLCBsaXN0ZW5lcikge1xyXG4gICAgdGhpcy5fcHJlcGFyZUxpc3RlbmVyc01hcChldmVudE5hbWUpO1xyXG4gICAgdGhpcy5saXN0ZW5lcnMuZ2V0KGV2ZW50TmFtZSkuc2V0KGxpc3RlbmVyLCB7IG9uY2U6IGZhbHNlIH0pO1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgdGhpcy5saXN0ZW5lcnMuZ2V0KGV2ZW50TmFtZSkuZGVsZXRlKGxpc3RlbmVyKTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnROYW1lXHJcbiAgICogQHBhcmFtIHsoLi4uYXJnczogYW55W10pPT52b2lkfSBsaXN0ZW5lclxyXG4gICAqL1xyXG4gIG9uY2UoZXZlbnROYW1lLCBsaXN0ZW5lcikge1xyXG4gICAgdGhpcy5fcHJlcGFyZUxpc3RlbmVyc01hcChldmVudE5hbWUpO1xyXG4gICAgdGhpcy5saXN0ZW5lcnMuZ2V0KGV2ZW50TmFtZSk/LnNldChsaXN0ZW5lciwgeyBvbmNlOiB0cnVlIH0pO1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgdGhpcy5saXN0ZW5lcnMuZ2V0KGV2ZW50TmFtZSkuZGVsZXRlKGxpc3RlbmVyKTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge3N0cmluZz99IGV2ZW50TmFtZVxyXG4gICAqIEBwYXJhbSB7KCguLi5hcmdzOiBhbnlbXSk9PnZvaWQpP30gbGlzdGVuZXJcclxuICAgKi9cclxuICBvZmYoZXZlbnROYW1lLCBsaXN0ZW5lcikge1xyXG4gICAgaWYgKCFldmVudE5hbWUpIHJldHVybiAodGhpcy5saXN0ZW5lcnMgPSBuZXcgTWFwKCkpO1xyXG4gICAgaWYgKCFsaXN0ZW5lcikgcmV0dXJuIHRoaXMubGlzdGVuZXJzPy5kZWxldGUoZXZlbnROYW1lKTtcclxuICAgIHRoaXMubGlzdGVuZXJzLmdldChldmVudE5hbWUpPy5kZWxldGUobGlzdGVuZXIpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50TmFtZVxyXG4gICAqIEBwYXJhbSAgey4uLmFueX0gYXJnc1xyXG4gICAqL1xyXG4gIGVtaXQoZXZlbnROYW1lLCAuLi5hcmdzKSB7XHJcbiAgICBpZiAoIXRoaXMubGlzdGVuZXJzLmhhcyhldmVudE5hbWUpKSByZXR1cm47XHJcbiAgICBsZXQgZXZlbnRNYXAgPSB0aGlzLmxpc3RlbmVycy5nZXQoZXZlbnROYW1lKTtcclxuICAgIGV2ZW50TWFwLmZvckVhY2goKHsgb25jZSB9LCBsaXN0ZW5lcikgPT4ge1xyXG4gICAgICBpZiAob25jZSkgZXZlbnRNYXA/LmRlbGV0ZShsaXN0ZW5lcik7XHJcbiAgICAgIGxpc3RlbmVyKC4uLmFyZ3MpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59O1xyXG4iLCAiaW1wb3J0IHsgQmFzaWNFdmVudEVtaXR0ZXIgfSBmcm9tIFwiLi4vLi4vbGliL0Jhc2ljRXZlbnRFbWl0dGVyLmpzXCI7XHJcblxyXG5jb25zdCBldmVudHMgPSBuZXcgQmFzaWNFdmVudEVtaXR0ZXIoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGV2ZW50czsiLCAiaW1wb3J0IGV2ZW50cyBmcm9tIFwiLi4vZXZlbnRzXCI7XHJcbmltcG9ydCB3ZWJwYWNrIGZyb20gXCIuLi9tb2R1bGVzL3dlYnBhY2suanNcIjtcclxuXHJcbmNvbnN0IHNjcm9sbGJhckNsYXNzZXMgPSB3ZWJwYWNrLmZpbmRCeVByb3BlcnRpZXMoXCJzY3JvbGxiYXJHaG9zdEhhaXJsaW5lXCIsIFwic3Bpbm5lclwiKTtcclxuXHJcbmNvbnN0IGZvcm1hdFJlZ2V4ZXMgPSB7XHJcbiAgYm9sZDogL1xcKlxcKihbXipdKylcXCpcXCovZyxcclxuICBpdGFsaWM6IC9cXCooW14qXSspXFwqL2csXHJcbiAgdW5kZXJsaW5lOiAvXFxfKFteKl0rKVxcXy9nLFxyXG4gIHN0cmlrZTogL1xcflxcfihbXipdKylcXH5cXH4vZyxcclxuICB1cmw6IC8oXFxiKGh0dHBzP3xmdHB8ZmlsZSk6XFwvXFwvWy1BLVowLTkrJkAjXFwvJT89fl98ITosLjtdKlstQS1aMC05KyZAI1xcLyU9fl98XSkvaWcsXHJcbiAgaW5saW5lOiAvXFxgKFteKl0rKVxcYC9nLFxyXG4gIGNvZGVibG9ja1NpbmdsZTogL1xcYFxcYFxcYChbXipdKylcXGBcXGBcXGAvZyxcclxuICBjb2RlYmxvY2tNdWx0aTogL1xcYFxcYFxcYChcXHcrKVxcbigoPzooPyFcXGBcXGBcXGApW1xcc1xcU10pKilcXGBcXGBcXGAvZ1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIHBhcnNlKGh0bWwpIHtcclxuICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgZGl2LmlubmVySFRNTCA9IGh0bWw7XHJcbiAgICByZXR1cm4gZGl2LmZpcnN0RWxlbWVudENoaWxkO1xyXG4gIH0sXHJcbiAgdG9DU1NQcm9wKG8pIHtcclxuICAgIGxldCBlbG0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgT2JqZWN0LmVudHJpZXMobykuZm9yRWFjaCgoaSkgPT4ge1xyXG4gICAgICBpZiAoZWxtLnN0eWxlLmhhc093blByb3BlcnR5KGlbMF0pKSB7XHJcbiAgICAgICAgZWxtLnN0eWxlW2lbMF1dID0gaVsxXTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBlbG0uc3R5bGUuc2V0UHJvcGVydHkoaVswXSwgaVsxXSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGVsbS5nZXRBdHRyaWJ1dGUoXCJzdHlsZVwiKTtcclxuICB9LFxyXG4gIHRvSFRNTFByb3BzKG8pIHtcclxuICAgIHJldHVybiBPYmplY3QuZW50cmllcyhvKVxyXG4gICAgICAubWFwKFxyXG4gICAgICAgIChpKSA9PlxyXG4gICAgICAgICAgYCR7aVswXS5yZXBsYWNlKC8gKy8sIFwiLVwiKX09XCIke2lbMF0gPT0gXCJzdHlsZVwiICYmIHR5cGVvZiBpWzFdICE9IFwic3RyaW5nXCJcclxuICAgICAgICAgICAgPyB0aGlzLnRvQ1NTUHJvcChpWzFdKVxyXG4gICAgICAgICAgICA6IHRoaXMuZXNjYXBlSFRNTChpWzFdKX1cImBcclxuICAgICAgKVxyXG4gICAgICAuam9pbihcIiBcIik7XHJcbiAgfSxcclxuICBlc2NhcGUoaHRtbCkge1xyXG4gICAgcmV0dXJuIG5ldyBPcHRpb24oaHRtbCkuaW5uZXJIVE1MO1xyXG4gIH0sXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtFbGVtZW50fSBlbG0gXHJcbiAgICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBzZWxlY3Rvck9yTnVtYmVyIFxyXG4gICAqIEByZXR1cm5zIHtFbGVtZW50W119XHJcbiAgICovXHJcbiAgcGFyZW50cyhlbG0sIHNlbGVjdG9yT3JOdW1iZXIpIHtcclxuICAgIGxldCBwYXJlbnRzID0gW107XHJcbiAgICBpZiAodHlwZW9mIHNlbGVjdG9yT3JOdW1iZXIgPT09IFwibnVtYmVyXCIpIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWxlY3Rvck9yTnVtYmVyOyBpKyspIHtcclxuICAgICAgICBpZiAoZWxtLnBhcmVudEVsZW1lbnQpIHtcclxuICAgICAgICAgIGVsbSA9IGVsbS5wYXJlbnRFbGVtZW50O1xyXG4gICAgICAgICAgcGFyZW50cy5wdXNoKGVsbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB3aGlsZSAoZWxtLnBhcmVudEVsZW1lbnQgJiYgZWxtLnBhcmVudEVsZW1lbnQuY2xvc2VzdChzZWxlY3Rvck9yTnVtYmVyKSkge1xyXG4gICAgICAgIGVsbSA9IGVsbS5wYXJlbnRFbGVtZW50LmNsb3Nlc3Qoc2VsZWN0b3JPck51bWJlcik7XHJcbiAgICAgICAgcGFyZW50cy5wdXNoKGVsbSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBwYXJlbnRzO1xyXG4gIH0sXHJcbiAgLyoqXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yIFxyXG4gICAqIEBwYXJhbSB7KGVsZW1lbnQ6IEhUTUxEaXZFbGVtZW50KT0+KCgpPT52b2lkKX0gY2IgXHJcbiAgICogQHJldHVybnMgeygpPT52b2lkfVxyXG4gICAqL1xyXG4gIHBhdGNoOiAoc2VsZWN0b3IsIGNiKSA9PlxyXG4gICAgKCgpID0+IHtcclxuICAgICAgZnVuY3Rpb24gbm9kZUFkZGVkKG5vZGUpIHtcclxuICAgICAgICBpZiAodHlwZW9mIG5vZGU/LnF1ZXJ5U2VsZWN0b3JBbGwgIT0gXCJmdW5jdGlvblwiKSByZXR1cm47XHJcbiAgICAgICAgbm9kZS5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKS5mb3JFYWNoKGFzeW5jIChlbG0pID0+IHtcclxuICAgICAgICAgIGlmICghZWxtLmFjb3JkKSB7XHJcbiAgICAgICAgICAgIGVsbS5hY29yZCA9IHsgdW5tb3VudDogW10sIHBhdGNoZWQ6IG5ldyBTZXQoKSB9O1xyXG4gICAgICAgICAgICBlbG0uY2xhc3NMaXN0LmFkZChcImFjb3JkLS1wYXRjaGVkXCIpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChlbG0uYWNvcmQucGF0Y2hlZC5oYXMoY2IpKSByZXR1cm47XHJcbiAgICAgICAgICBlbG0uYWNvcmQucGF0Y2hlZC5hZGQoY2IpO1xyXG5cclxuICAgICAgICAgIGxldCB1blBhdGNoQ2IgPSBhd2FpdCBjYihlbG0pO1xyXG4gICAgICAgICAgaWYgKHR5cGVvZiB1blBhdGNoQ2IgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICAgICAgZWxtLmFjb3JkLnVubW91bnQucHVzaCh1blBhdGNoQ2IpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBmdW5jdGlvbiBub2RlUmVtb3ZlZChub2RlKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBub2RlPy5xdWVyeVNlbGVjdG9yQWxsICE9IFwiZnVuY3Rpb25cIikgcmV0dXJuO1xyXG4gICAgICAgIG5vZGUucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikuZm9yRWFjaChhc3luYyAoZWxtKSA9PiB7XHJcbiAgICAgICAgICBpZiAoIWVsbS5hY29yZCkgcmV0dXJuO1xyXG4gICAgICAgICAgZWxtLmFjb3JkLnVubW91bnQuZm9yRWFjaCgoZikgPT4gZigpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikuZm9yRWFjaChub2RlQWRkZWQpO1xyXG5cclxuICAgICAgcmV0dXJuIGV2ZW50cy5vbihcclxuICAgICAgICBcImRvbS1tdXRhdGlvblwiLFxyXG4gICAgICAgIC8qKiBAcGFyYW0ge011dGF0aW9uUmVjb3JkfSBtdXQgKi8obXV0KSA9PiB7XHJcbiAgICAgICAgICBpZiAobXV0LnR5cGUgPT09IFwiY2hpbGRMaXN0XCIpIHtcclxuICAgICAgICAgICAgbXV0LmFkZGVkTm9kZXMuZm9yRWFjaChub2RlQWRkZWQpO1xyXG4gICAgICAgICAgICBtdXQucmVtb3ZlZE5vZGVzLmZvckVhY2gobm9kZVJlbW92ZWQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgKTtcclxuICAgIH0pKCksXHJcbiAgZm9ybWF0Q29udGVudChtc2cpIHtcclxuICAgIGlmICghbXNnKSByZXR1cm4gJyc7XHJcbiAgICBjb25zdCB7IGJvbGQsIGl0YWxpYywgdW5kZXJsaW5lLCBzdHJpa2UsIGNvZGVibG9ja011bHRpLCBjb2RlYmxvY2tTaW5nbGUsIGlubGluZSwgdXJsIH0gPSBmb3JtYXRSZWdleGVzO1xyXG5cclxuICAgIGNvbnN0IGNvZGVCbG9ja3NNYXAgPSBPYmplY3QuZnJvbUVudHJpZXMoW1xyXG4gICAgICAuLi4obXNnLm1hdGNoQWxsKGNvZGVibG9ja011bHRpKSB8fCBbXSksIC4uLihtc2cubWF0Y2hBbGwoY29kZWJsb2NrU2luZ2xlKSB8fCBbXSlcclxuICAgIF0ubWFwKFxyXG4gICAgICAoW18sIGNvZGVCbG9ja09yQ29kZSwgY29kZUJsb2NrQ29udGVudF0sIGkpID0+IHtcclxuICAgICAgICBtc2cgPSBtc2cucmVwbGFjZShfLCBge3tDT0RFQkxPQ0tfJHtpfX19YCk7XHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgIGB7e0NPREVCTE9DS18ke2l9fX1gLFxyXG4gICAgICAgICAgY29kZUJsb2NrQ29udGVudCA/XHJcbiAgICAgICAgICAgIGA8cHJlPjxjb2RlIGNsYXNzPVwiJHtzY3JvbGxiYXJDbGFzc2VzLnNjcm9sbGJhckdob3N0SGFpcmxpbmV9IGhsanMgJHtjb2RlQmxvY2tPckNvZGV9XCIgc3R5bGU9XCJwb3NpdGlvbjogcmVsYXRpdmU7XCI+JHttb2R1bGVzLmNvbW1vbi5obGpzLmhpZ2hsaWdodChjb2RlQmxvY2tPckNvZGUsIGNvZGVCbG9ja0NvbnRlbnQpLnZhbHVlfTwvY29kZT48L3ByZT5gIDpcclxuICAgICAgICAgICAgYDxwcmU+PGNvZGUgY2xhc3M9XCIke3Njcm9sbGJhckNsYXNzZXMuc2Nyb2xsYmFyR2hvc3RIYWlybGluZX0gaGxqc1wiIHN0eWxlPVwicG9zaXRpb246IHJlbGF0aXZlO1wiPiR7Y29kZUJsb2NrT3JDb2RlfTwvY29kZT48L3ByZT5gXHJcbiAgICAgICAgXTtcclxuICAgICAgfVxyXG4gICAgKSk7XHJcblxyXG4gICAgY29uc3QgaW5saW5lTWFwID0gT2JqZWN0LmZyb21FbnRyaWVzKFxyXG4gICAgICBbLi4uKG1zZy5tYXRjaEFsbChpbmxpbmUpIHx8IFtdKV0ubWFwKFxyXG4gICAgICAgIChbXywgaW5saW5lQ29udGVudF0sIGkpID0+IHtcclxuICAgICAgICAgIG1zZyA9IG1zZy5yZXBsYWNlKF8sIGB7e0lOTElORV8ke2l9fX1gKTtcclxuICAgICAgICAgIHJldHVybiBbYHt7SU5MSU5FXyR7aX19fWAsIGA8Y29kZSBjbGFzcz1cImlubGluZVwiPiR7aW5saW5lQ29udGVudH08L2NvZGU+YF07XHJcbiAgICAgICAgfVxyXG4gICAgICApXHJcbiAgICApO1xyXG5cclxuICAgIG1zZyA9IG1zZy5yZXBsYWNlKGJvbGQsIFwiPGI+JDE8L2I+XCIpXHJcbiAgICAgIC5yZXBsYWNlKGl0YWxpYywgXCI8aT4kMTwvaT5cIilcclxuICAgICAgLnJlcGxhY2UodW5kZXJsaW5lLCBcIjxVPiQxPC9VPlwiKVxyXG4gICAgICAucmVwbGFjZShzdHJpa2UsIFwiPHM+JDE8L3M+XCIpXHJcbiAgICAgIC5yZXBsYWNlKHVybCwgJzxhIGhyZWY9XCIkMVwiPiQxPC9hPicpO1xyXG5cclxuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKGNvZGVCbG9ja3NNYXApKSB7XHJcbiAgICAgIG1zZyA9IG1zZy5yZXBsYWNlKGtleSwgdmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKGlubGluZU1hcCkpIHtcclxuICAgICAgbXNnID0gbXNnLnJlcGxhY2Uoa2V5LCB2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG1zZztcclxuICB9LFxyXG4gIHJlc29sdmUoaHRtbE9yRWxtKSB7XHJcbiAgICBpZiAoaHRtbE9yRWxtIGluc3RhbmNlb2YgRWxlbWVudCkgcmV0dXJuIGh0bWxPckVsbTtcclxuICAgIHJldHVybiB0aGlzLnBhcnNlKGh0bWxPckVsbSk7XHJcbiAgfVxyXG59XHJcblxyXG57XHJcbiAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigobXV0YXRpb25zKSA9PiB7XHJcbiAgICBtdXRhdGlvbnMuZm9yRWFjaCgobXV0YXRpb24pID0+IHtcclxuICAgICAgZXZlbnRzLmVtaXQoXCJkb20tbXV0YXRpb25cIiwgbXV0YXRpb24pO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbiAgb2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudCwge1xyXG4gICAgYXR0cmlidXRlczogdHJ1ZSxcclxuICAgIGNoaWxkTGlzdDogdHJ1ZSxcclxuICAgIHN1YnRyZWU6IHRydWVcclxuICB9KTtcclxufSIsICIvLyB3ZSB1c2UgdGhpcyBhcnJheSBtdWx0aXBsZSB0aW1lc1xyXG5leHBvcnQgY29uc3QgcGF0Y2hUeXBlcyA9IFtcImFcIiwgXCJiXCIsIFwiaVwiXTtcclxuZXhwb3J0IGNvbnN0IHBhdGNoZWRPYmplY3RzID0gbmV3IE1hcCgpO1xyXG4iLCAiLy8gY2FsbHMgcmVsZXZhbnQgcGF0Y2hlcyBhbmQgcmV0dXJucyB0aGUgZmluYWwgcmVzdWx0XHJcbmltcG9ydCB7IHBhdGNoZWRPYmplY3RzIH0gZnJvbSBcIi4vc2hhcmVkLmpzXCI7XHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChmdW5jTmFtZSwgZnVuY1BhcmVudCwgZnVuY0FyZ3MsIFxyXG4vLyB0aGUgdmFsdWUgb2YgYHRoaXNgIHRvIGFwcGx5XHJcbmN0eHQsIFxyXG4vLyBpZiB0cnVlLCB0aGUgZnVuY3Rpb24gaXMgYWN0dWFsbHkgY29uc3RydWN0b3JcclxuaXNDb25zdHJ1Y3QpIHtcclxuICAgIGNvbnN0IHBhdGNoID0gcGF0Y2hlZE9iamVjdHMuZ2V0KGZ1bmNQYXJlbnQpPy5bZnVuY05hbWVdO1xyXG4gICAgLy8gVGhpcyBpcyBpbiB0aGUgZXZlbnQgdGhhdCB0aGlzIGZ1bmN0aW9uIGlzIGJlaW5nIGNhbGxlZCBhZnRlciBhbGwgcGF0Y2hlcyBhcmUgcmVtb3ZlZC5cclxuICAgIGlmICghcGF0Y2gpXHJcbiAgICAgICAgcmV0dXJuIGlzQ29uc3RydWN0XHJcbiAgICAgICAgICAgID8gUmVmbGVjdC5jb25zdHJ1Y3QoZnVuY1BhcmVudFtmdW5jTmFtZV0sIGZ1bmNBcmdzLCBjdHh0KVxyXG4gICAgICAgICAgICA6IGZ1bmNQYXJlbnRbZnVuY05hbWVdLmFwcGx5KGN0eHQsIGZ1bmNBcmdzKTtcclxuICAgIC8vIEJlZm9yZSBwYXRjaGVzXHJcbiAgICBmb3IgKGNvbnN0IGhvb2sgb2YgcGF0Y2guYi52YWx1ZXMoKSkge1xyXG4gICAgICAgIGNvbnN0IG1heWJlZnVuY0FyZ3MgPSBob29rLmNhbGwoY3R4dCwgZnVuY0FyZ3MpO1xyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KG1heWJlZnVuY0FyZ3MpKVxyXG4gICAgICAgICAgICBmdW5jQXJncyA9IG1heWJlZnVuY0FyZ3M7XHJcbiAgICB9XHJcbiAgICAvLyBJbnN0ZWFkIHBhdGNoZXNcclxuICAgIGxldCBpbnN0ZWFkUGF0Y2hlZEZ1bmMgPSAoLi4uYXJncykgPT4gaXNDb25zdHJ1Y3RcclxuICAgICAgICA/IFJlZmxlY3QuY29uc3RydWN0KHBhdGNoLm8sIGFyZ3MsIGN0eHQpXHJcbiAgICAgICAgOiBwYXRjaC5vLmFwcGx5KGN0eHQsIGFyZ3MpO1xyXG4gICAgZm9yIChjb25zdCBjYWxsYmFjayBvZiBwYXRjaC5pLnZhbHVlcygpKSB7XHJcbiAgICAgICAgY29uc3Qgb2xkUGF0Y2hGdW5jID0gaW5zdGVhZFBhdGNoZWRGdW5jO1xyXG4gICAgICAgIGluc3RlYWRQYXRjaGVkRnVuYyA9ICguLi5hcmdzKSA9PiBjYWxsYmFjay5jYWxsKGN0eHQsIGFyZ3MsIG9sZFBhdGNoRnVuYyk7XHJcbiAgICB9XHJcbiAgICBsZXQgd29ya2luZ1JldFZhbCA9IGluc3RlYWRQYXRjaGVkRnVuYyguLi5mdW5jQXJncyk7XHJcbiAgICAvLyBBZnRlciBwYXRjaGVzXHJcbiAgICBmb3IgKGNvbnN0IGhvb2sgb2YgcGF0Y2guYS52YWx1ZXMoKSlcclxuICAgICAgICB3b3JraW5nUmV0VmFsID0gaG9vay5jYWxsKGN0eHQsIGZ1bmNBcmdzLCB3b3JraW5nUmV0VmFsKSA/PyB3b3JraW5nUmV0VmFsO1xyXG4gICAgcmV0dXJuIHdvcmtpbmdSZXRWYWw7XHJcbn1cclxuIiwgImltcG9ydCB7IHBhdGNoZWRPYmplY3RzLCBwYXRjaFR5cGVzIH0gZnJvbSBcIi4vc2hhcmVkLmpzXCI7XHJcbmV4cG9ydCBmdW5jdGlvbiB1blBhdGNoKGZ1bmNQYXJlbnQsIGZ1bmNOYW1lLCBob29rSWQsIHR5cGUpIHtcclxuICAgIGNvbnN0IHBhdGNoZWRPYmplY3QgPSBwYXRjaGVkT2JqZWN0cy5nZXQoZnVuY1BhcmVudCk7XHJcbiAgICBjb25zdCBwYXRjaCA9IHBhdGNoZWRPYmplY3Q/LltmdW5jTmFtZV07XHJcbiAgICBpZiAoIXBhdGNoPy5bdHlwZV0uaGFzKGhvb2tJZCkpXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgcGF0Y2hbdHlwZV0uZGVsZXRlKGhvb2tJZCk7XHJcbiAgICAvLyBJZiB0aGVyZSBhcmUgbm8gbW9yZSBob29rcyBmb3IgZXZlcnkgdHlwZSwgcmVtb3ZlIHRoZSBwYXRjaFxyXG4gICAgaWYgKHBhdGNoVHlwZXMuZXZlcnkoKHQpID0+IHBhdGNoW3RdLnNpemUgPT09IDApKSB7XHJcbiAgICAgICAgLy8gcmVmbGVjdCBkZWZpbmVwcm9wZXJ0eSBpcyBsaWtlIG9iamVjdCBkZWZpbmVwcm9wZXJ0eVxyXG4gICAgICAgIC8vIGJ1dCBpbnN0ZWFkIG9mIGVycm9yaW5nIGl0IHJldHVybnMgaWYgaXQgd29ya2VkIG9yIG5vdC5cclxuICAgICAgICAvLyB0aGlzIGlzIG1vcmUgZWFzaWx5IG1pbmlmaWFibGUsIGhlbmNlIGl0cyB1c2UuIC0tIHNpbmtcclxuICAgICAgICBjb25zdCBzdWNjZXNzID0gUmVmbGVjdC5kZWZpbmVQcm9wZXJ0eShmdW5jUGFyZW50LCBmdW5jTmFtZSwge1xyXG4gICAgICAgICAgICB2YWx1ZTogcGF0Y2gubyxcclxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoIXN1Y2Nlc3MpXHJcbiAgICAgICAgICAgIGZ1bmNQYXJlbnRbZnVuY05hbWVdID0gcGF0Y2gubztcclxuICAgICAgICBkZWxldGUgcGF0Y2hlZE9iamVjdFtmdW5jTmFtZV07XHJcbiAgICB9XHJcbiAgICBpZiAoT2JqZWN0LmtleXMocGF0Y2hlZE9iamVjdCkubGVuZ3RoID09IDApXHJcbiAgICAgICAgcGF0Y2hlZE9iamVjdHMuZGVsZXRlKGZ1bmNQYXJlbnQpO1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHVuUGF0Y2hBbGwoKSB7XHJcbiAgICBmb3IgKGNvbnN0IFtwYXJlbnRPYmplY3QsIHBhdGNoZWRPYmplY3RdIG9mIHBhdGNoZWRPYmplY3RzLmVudHJpZXMoKSlcclxuICAgICAgICBmb3IgKGNvbnN0IGZ1bmNOYW1lIGluIHBhdGNoZWRPYmplY3QpXHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgaG9va1R5cGUgb2YgcGF0Y2hUeXBlcylcclxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaG9va0lkIG9mIHBhdGNoZWRPYmplY3RbZnVuY05hbWVdPy5baG9va1R5cGVdLmtleXMoKSA/PyBbXSlcclxuICAgICAgICAgICAgICAgICAgICB1blBhdGNoKHBhcmVudE9iamVjdCwgZnVuY05hbWUsIGhvb2tJZCwgaG9va1R5cGUpO1xyXG59XHJcbiIsICIvLyBjdXJyaWVkIC0gZ2V0UGF0Y2hGdW5jKFwiYmVmb3JlXCIpKC4uLilcclxuLy8gYWxsb3dzIHVzIHRvIGFwcGx5IGFuIGFyZ3VtZW50IHdoaWxlIGxlYXZpbmcgdGhlIHJlc3Qgb3BlbiBtdWNoIGNsZWFuZXIuXHJcbi8vIGZ1bmN0aW9uYWwgcHJvZ3JhbW1pbmcgc3RyaWtlcyBhZ2FpbiEgLS0gc2lua1xyXG5pbXBvcnQgaG9vayBmcm9tIFwiLi9ob29rLmpzXCI7XHJcbmltcG9ydCB7IHBhdGNoZWRPYmplY3RzIH0gZnJvbSBcIi4vc2hhcmVkLmpzXCI7XHJcbmltcG9ydCB7IHVuUGF0Y2ggfSBmcm9tIFwiLi91bi1wYXRjaC5qc1wiO1xyXG4vLyBjcmVhdGVzIGEgaG9vayBpZiBuZWVkZWQsIGVsc2UganVzdCBhZGRzIG9uZSB0byB0aGUgcGF0Y2hlcyBhcnJheVxyXG5leHBvcnQgZGVmYXVsdCAocGF0Y2hUeXBlKSA9PiAoZnVuY05hbWUsIGZ1bmNQYXJlbnQsIGNhbGxiYWNrLCBvbmVUaW1lID0gZmFsc2UpID0+IHtcclxuICAgIGlmICh0eXBlb2YgZnVuY1BhcmVudFtmdW5jTmFtZV0gIT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7ZnVuY05hbWV9IGlzIG5vdCBhIGZ1bmN0aW9uIGluICR7ZnVuY1BhcmVudC5jb25zdHJ1Y3Rvci5uYW1lfWApO1xyXG4gICAgaWYgKCFwYXRjaGVkT2JqZWN0cy5oYXMoZnVuY1BhcmVudCkpXHJcbiAgICAgICAgcGF0Y2hlZE9iamVjdHMuc2V0KGZ1bmNQYXJlbnQsIHt9KTtcclxuICAgIGNvbnN0IHBhcmVudEluamVjdGlvbnMgPSBwYXRjaGVkT2JqZWN0cy5nZXQoZnVuY1BhcmVudCk7XHJcbiAgICBpZiAoIXBhcmVudEluamVjdGlvbnNbZnVuY05hbWVdKSB7XHJcbiAgICAgICAgY29uc3Qgb3JpZ0Z1bmMgPSBmdW5jUGFyZW50W2Z1bmNOYW1lXTtcclxuICAgICAgICAvLyBub3RlIHRvIGZ1dHVyZSBtZSBvcHRpbWlzaW5nIGZvciBzaXplOiBleHRyYWN0aW5nIG5ldyBNYXAoKSB0byBhIGZ1bmMgaW5jcmVhc2VzIHNpemUgLS1zaW5rXHJcbiAgICAgICAgcGFyZW50SW5qZWN0aW9uc1tmdW5jTmFtZV0gPSB7XHJcbiAgICAgICAgICAgIG86IG9yaWdGdW5jLFxyXG4gICAgICAgICAgICBiOiBuZXcgTWFwKCksXHJcbiAgICAgICAgICAgIGk6IG5ldyBNYXAoKSxcclxuICAgICAgICAgICAgYTogbmV3IE1hcCgpLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29uc3QgcnVuSG9vayA9IChjdHh0LCBhcmdzLCBjb25zdHJ1Y3QpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcmV0ID0gaG9vayhmdW5jTmFtZSwgZnVuY1BhcmVudCwgYXJncywgY3R4dCwgY29uc3RydWN0KTtcclxuICAgICAgICAgICAgaWYgKG9uZVRpbWUpXHJcbiAgICAgICAgICAgICAgICB1bnBhdGNoVGhpc1BhdGNoKCk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXQ7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCByZXBsYWNlUHJveHkgPSBuZXcgUHJveHkob3JpZ0Z1bmMsIHtcclxuICAgICAgICAgICAgYXBwbHk6IChfLCBjdHh0LCBhcmdzKSA9PiBydW5Ib29rKGN0eHQsIGFyZ3MsIGZhbHNlKSxcclxuICAgICAgICAgICAgY29uc3RydWN0OiAoXywgYXJncykgPT4gcnVuSG9vayhvcmlnRnVuYywgYXJncywgdHJ1ZSksXHJcbiAgICAgICAgICAgIGdldDogKHRhcmdldCwgcHJvcCwgcmVjZWl2ZXIpID0+IHByb3AgPT0gXCJ0b1N0cmluZ1wiXHJcbiAgICAgICAgICAgICAgICA/IG9yaWdGdW5jLnRvU3RyaW5nLmJpbmQob3JpZ0Z1bmMpXHJcbiAgICAgICAgICAgICAgICA6IFJlZmxlY3QuZ2V0KHRhcmdldCwgcHJvcCwgcmVjZWl2ZXIpLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIHRoaXMgd29ya3MgYXJvdW5kIGJyZWFraW5nIHNvbWUgYXN5bmMgZmluZCBpbXBsZW1lbnRhdGlvbiB3aGljaCBsaXN0ZW5zIGZvciBhc3NpZ25zIHZpYSBwcm94eVxyXG4gICAgICAgIC8vIHNlZSBjb21tZW50IGluIHVucGF0Y2gudHNcclxuICAgICAgICBjb25zdCBzdWNjZXNzID0gUmVmbGVjdC5kZWZpbmVQcm9wZXJ0eShmdW5jUGFyZW50LCBmdW5jTmFtZSwge1xyXG4gICAgICAgICAgICB2YWx1ZTogcmVwbGFjZVByb3h5LFxyXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICghc3VjY2VzcylcclxuICAgICAgICAgICAgZnVuY1BhcmVudFtmdW5jTmFtZV0gPSByZXBsYWNlUHJveHk7XHJcbiAgICAgICAgZnVuY1BhcmVudFtmdW5jTmFtZV0uX19vcmlnaW5hbF9fID0gcGFyZW50SW5qZWN0aW9uc1tmdW5jTmFtZV0ubztcclxuICAgIH1cclxuICAgIGNvbnN0IGhvb2tJZCA9IFN5bWJvbCgpO1xyXG4gICAgY29uc3QgdW5wYXRjaFRoaXNQYXRjaCA9ICgpID0+IHVuUGF0Y2goZnVuY1BhcmVudCwgZnVuY05hbWUsIGhvb2tJZCwgcGF0Y2hUeXBlKTtcclxuICAgIHBhcmVudEluamVjdGlvbnNbZnVuY05hbWVdW3BhdGNoVHlwZV0uc2V0KGhvb2tJZCwgY2FsbGJhY2spO1xyXG4gICAgcmV0dXJuIHVucGF0Y2hUaGlzUGF0Y2g7XHJcbn07XHJcbiIsICJpbXBvcnQgZ2V0UGF0Y2hGdW5jIGZyb20gXCIuL2dldC1wYXRjaC1mdW5jLmpzXCI7XHJcbmltcG9ydCB7IHVuUGF0Y2hBbGwgfSBmcm9tIFwiLi91bi1wYXRjaC5qc1wiO1xyXG5pbXBvcnQgeyBwYXRjaGVkT2JqZWN0cyBhcyBwYXRjaGVkIH0gZnJvbSBcIi4vc2hhcmVkLmpzXCI7XHJcbmNvbnN0IGJlZm9yZSA9IGdldFBhdGNoRnVuYyhcImJcIik7XHJcbmNvbnN0IGluc3RlYWQgPSBnZXRQYXRjaEZ1bmMoXCJpXCIpO1xyXG5jb25zdCBhZnRlciA9IGdldFBhdGNoRnVuYyhcImFcIik7XHJcbmV4cG9ydCB7IGluc3RlYWQsIGJlZm9yZSwgYWZ0ZXIsIHVuUGF0Y2hBbGwsIHBhdGNoZWQgfTtcclxuIiwgImltcG9ydCAqIGFzIHNwaXRSb2FzdCBmcm9tIFwiLi4vLi4vbGliL3NwaXRyb2FzdC9kaXN0L2VzbVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIF9fY2FjaGVfXzoge1xyXG4gICAgcGF0Y2hlZDogc3BpdFJvYXN0LnBhdGNoZWQsXHJcbiAgfSxcclxuICBiZWZvcmU6IHNwaXRSb2FzdC5iZWZvcmUsXHJcbiAgYWZ0ZXI6IHNwaXRSb2FzdC5hZnRlcixcclxuICBpbnN0ZWFkOiBzcGl0Um9hc3QuaW5zdGVhZCxcclxuICB1blBhdGNoQWxsOiBzcGl0Um9hc3QudW5QYXRjaEFsbCxcclxuICBpbmplY3RDU1MoY3NzKSB7XHJcbiAgICBjb25zdCBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcclxuICAgIHN0eWxlLmNsYXNzTmFtZSA9IGBhY29yZC0taW5qZWN0ZWQtY3NzYDtcclxuICAgIHN0eWxlLnRleHRDb250ZW50ID0gY3NzO1xyXG4gICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XHJcblxyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgc3R5bGU/LnJlbW92ZSgpO1xyXG4gICAgfTtcclxuICB9LFxyXG4gIHVuUGF0Y2hBbGxDU1MoKSB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmFjb3JkLS1pbmplY3RlZC1jc3NcIikuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgZWxlbWVudC5yZW1vdmUoKTtcclxuICAgIH0pXHJcbiAgfVxyXG59IiwgImV4cG9ydCBkZWZhdWx0IGBcbkBrZXlmcmFtZXMgYWNvcmRMb2FkaW5nRmFkZXswJXtvcGFjaXR5Oi4xfTEwMCV7b3BhY2l0eTouOX19LmFjb3JkLS1zdGFydHVwLWxvYWRpbmd7YW5pbWF0aW9uOmFjb3JkTG9hZGluZ0ZhZGUgLjVzIGFsdGVybmF0ZSBpbmZpbml0ZSBsaW5lYXI7cG9zaXRpb246YWJzb2x1dGU7dHJhbnNpdGlvbjphbGwgLjVzIGxpbmVhcjtyaWdodDo4cHg7Ym90dG9tOjhweDt3aWR0aDoxNnB4O2hlaWdodDoxNnB4O2JhY2tncm91bmQtaW1hZ2U6dXJsKFwiaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL0Fjb3JkUGx1Z2luL2Fzc2V0cy9tYWluL0Fjb3JkLnN2Z1wiKTtmaWx0ZXI6Z3JheXNjYWxlKDEpIGJyaWdodG5lc3MoMSk7YmFja2dyb3VuZC1wb3NpdGlvbjpjZW50ZXI7YmFja2dyb3VuZC1yZXBlYXQ6bm8tcmVwZWF0O2JhY2tncm91bmQtc2l6ZTpjb250YWluO3otaW5kZXg6OTk5OTk5fS5hY29yZC0tc3RhcnR1cC1sb2FkaW5nLmhpZGRlbntvcGFjaXR5OjAgIWltcG9ydGFudH1gO1xuIiwgImltcG9ydCBkb20gZnJvbSBcIi4uLy4uL2FwaS9kb20vaW5kZXguanNcIjtcclxuaW1wb3J0IHBhdGNoZXIgZnJvbSBcIi4uLy4uL2FwaS9wYXRjaGVyL2luZGV4LmpzXCI7XHJcblxyXG5pbXBvcnQgY3NzVGV4dCBmcm9tIFwiLi9zdHlsZS5zY3NzXCI7XHJcbmxldCB1bkluamVjdDtcclxuXHJcbmFzeW5jIGZ1bmN0aW9uIHNob3coKSB7XHJcbiAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWNvcmQtLXN0YXJ0dXAtbG9hZGluZ1wiKSkgcmV0dXJuO1xyXG4gIHdoaWxlICh0cnVlKSB7XHJcbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhcHAtbW91bnRcIikpIGJyZWFrO1xyXG4gICAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgMTAwKSk7XHJcbiAgfVxyXG4gIFxyXG4gIHVuSW5qZWN0ID0gcGF0Y2hlci5pbmplY3RDU1MoY3NzVGV4dCk7XHJcbiAgY29uc3QgZWxlbWVudCA9IGRvbS5wYXJzZShgXHJcbiAgICA8ZGl2IGNsYXNzPVwiYWNvcmQtLXN0YXJ0dXAtbG9hZGluZ1wiPjwvZGl2PlxyXG4gIGApXHJcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhcHAtbW91bnRcIikuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhpZGUoKSB7XHJcbiAgbGV0IGVsbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWNvcmQtLXN0YXJ0dXAtbG9hZGluZ1wiKTtcclxuICBpZiAoZWxtKSB7XHJcbiAgICBlbG0uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBlbG0ucmVtb3ZlKCk7XHJcbiAgICAgIHVuSW5qZWN0Py4oKTtcclxuICAgICAgdW5JbmplY3QgPSBudWxsO1xyXG4gICAgfSwgNTAwKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBzaG93LFxyXG4gIGhpZGVcclxufSIsICJsZXQgZGV2TW9kZUVuYWJsZWQgPSBmYWxzZTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBnZXQgZW5hYmxlZCgpIHtcclxuICAgIHJldHVybiBkZXZNb2RlRW5hYmxlZDtcclxuICB9LFxyXG4gIHNldCBlbmFibGVkKHZhbHVlKSB7XHJcbiAgICBpZiAoIWdsb2JhbFRoaXNbXCI8UFJFTE9BRF9LRVk+XCJdLmlzRGV2VG9vbHNPcGVuKCkpIHRocm93IG5ldyBFcnJvcihcIkRldiBtb2RlIHN0YXR1cyBjYW4gb25seSBiZSBtb2RpZmllZCB3aGVuIERldlRvb2xzIGlzIG9wZW4hXCIpO1xyXG4gICAgZGV2TW9kZUVuYWJsZWQgPSB2YWx1ZTtcclxuICB9XHJcbn1cclxuXHJcbi8vIFRPRE86IGFkZCBsaXZlIGRldmVsb3BtZW50IG1vZGUiLCAiaW1wb3J0ICogYXMgbmVzdHMgZnJvbSBcIm5lc3RzXCI7XHJcbmltcG9ydCAqIGFzIGlkYktleXZhbCBmcm9tIFwiaWRiLWtleXZhbFwiO1xyXG5pbXBvcnQgeyBkZUN5Y2xlZCwgcmV2aXZlIH0gZnJvbSBcIi4uLy4uL2xpYi9qc29uLWRlY3ljbGVkXCI7XHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBhc3luYyBjcmVhdGVQZXJzaXN0TmVzdChzdWZmaXgpIHtcclxuICAgIGxldCBjYWNoZWQgPSBhd2FpdCBpZGJLZXl2YWwuZ2V0KGBBY29yZFN0b3JlOyR7c3VmZml4fWApO1xyXG4gICAgaWYgKHR5cGVvZiBjYWNoZWQgPT0gXCJzdHJpbmdcIikgY2FjaGVkID0gcmV2aXZlKGNhY2hlZCk7XHJcbiAgICBjb25zdCBuZXN0ID0gbmVzdHMubWFrZShjYWNoZWQgPz8ge30pO1xyXG5cclxuICAgIGNvbnN0IHNhdmUgPSAoKSA9PiB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgaWRiS2V5dmFsLnNldChgQWNvcmRTdG9yZTske3N1ZmZpeH1gLCBkZUN5Y2xlZCh7IC4uLm5lc3QuZ2hvc3QgfSkpO1xyXG4gICAgICB9IGNhdGNoIHtcclxuICAgICAgICBpZGJLZXl2YWwuc2V0KGBBY29yZFN0b3JlOyR7c3VmZml4fWAsIGRlQ3ljbGVkKHt9KSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBuZXN0Lm9uKG5lc3RzLkV2ZW50cy5TRVQsIHNhdmUpO1xyXG4gICAgbmVzdC5vbihuZXN0cy5FdmVudHMuVVBEQVRFLCBzYXZlKTtcclxuICAgIG5lc3Qub24obmVzdHMuRXZlbnRzLkRFTEVURSwgc2F2ZSk7XHJcblxyXG4gICAgcmV0dXJuIG5lc3Q7XHJcbiAgfVxyXG59IiwgImZ1bmN0aW9uIHByb21pc2lmeVJlcXVlc3QocmVxdWVzdCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmUgLSBmaWxlIHNpemUgaGFja3NcbiAgICAgICAgcmVxdWVzdC5vbmNvbXBsZXRlID0gcmVxdWVzdC5vbnN1Y2Nlc3MgPSAoKSA9PiByZXNvbHZlKHJlcXVlc3QucmVzdWx0KTtcbiAgICAgICAgLy8gQHRzLWlnbm9yZSAtIGZpbGUgc2l6ZSBoYWNrc1xuICAgICAgICByZXF1ZXN0Lm9uYWJvcnQgPSByZXF1ZXN0Lm9uZXJyb3IgPSAoKSA9PiByZWplY3QocmVxdWVzdC5lcnJvcik7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBjcmVhdGVTdG9yZShkYk5hbWUsIHN0b3JlTmFtZSkge1xuICAgIGNvbnN0IHJlcXVlc3QgPSBpbmRleGVkREIub3BlbihkYk5hbWUpO1xuICAgIHJlcXVlc3Qub251cGdyYWRlbmVlZGVkID0gKCkgPT4gcmVxdWVzdC5yZXN1bHQuY3JlYXRlT2JqZWN0U3RvcmUoc3RvcmVOYW1lKTtcbiAgICBjb25zdCBkYnAgPSBwcm9taXNpZnlSZXF1ZXN0KHJlcXVlc3QpO1xuICAgIHJldHVybiAodHhNb2RlLCBjYWxsYmFjaykgPT4gZGJwLnRoZW4oKGRiKSA9PiBjYWxsYmFjayhkYi50cmFuc2FjdGlvbihzdG9yZU5hbWUsIHR4TW9kZSkub2JqZWN0U3RvcmUoc3RvcmVOYW1lKSkpO1xufVxubGV0IGRlZmF1bHRHZXRTdG9yZUZ1bmM7XG5mdW5jdGlvbiBkZWZhdWx0R2V0U3RvcmUoKSB7XG4gICAgaWYgKCFkZWZhdWx0R2V0U3RvcmVGdW5jKSB7XG4gICAgICAgIGRlZmF1bHRHZXRTdG9yZUZ1bmMgPSBjcmVhdGVTdG9yZSgna2V5dmFsLXN0b3JlJywgJ2tleXZhbCcpO1xuICAgIH1cbiAgICByZXR1cm4gZGVmYXVsdEdldFN0b3JlRnVuYztcbn1cbi8qKlxuICogR2V0IGEgdmFsdWUgYnkgaXRzIGtleS5cbiAqXG4gKiBAcGFyYW0ga2V5XG4gKiBAcGFyYW0gY3VzdG9tU3RvcmUgTWV0aG9kIHRvIGdldCBhIGN1c3RvbSBzdG9yZS4gVXNlIHdpdGggY2F1dGlvbiAoc2VlIHRoZSBkb2NzKS5cbiAqL1xuZnVuY3Rpb24gZ2V0KGtleSwgY3VzdG9tU3RvcmUgPSBkZWZhdWx0R2V0U3RvcmUoKSkge1xuICAgIHJldHVybiBjdXN0b21TdG9yZSgncmVhZG9ubHknLCAoc3RvcmUpID0+IHByb21pc2lmeVJlcXVlc3Qoc3RvcmUuZ2V0KGtleSkpKTtcbn1cbi8qKlxuICogU2V0IGEgdmFsdWUgd2l0aCBhIGtleS5cbiAqXG4gKiBAcGFyYW0ga2V5XG4gKiBAcGFyYW0gdmFsdWVcbiAqIEBwYXJhbSBjdXN0b21TdG9yZSBNZXRob2QgdG8gZ2V0IGEgY3VzdG9tIHN0b3JlLiBVc2Ugd2l0aCBjYXV0aW9uIChzZWUgdGhlIGRvY3MpLlxuICovXG5mdW5jdGlvbiBzZXQoa2V5LCB2YWx1ZSwgY3VzdG9tU3RvcmUgPSBkZWZhdWx0R2V0U3RvcmUoKSkge1xuICAgIHJldHVybiBjdXN0b21TdG9yZSgncmVhZHdyaXRlJywgKHN0b3JlKSA9PiB7XG4gICAgICAgIHN0b3JlLnB1dCh2YWx1ZSwga2V5KTtcbiAgICAgICAgcmV0dXJuIHByb21pc2lmeVJlcXVlc3Qoc3RvcmUudHJhbnNhY3Rpb24pO1xuICAgIH0pO1xufVxuLyoqXG4gKiBTZXQgbXVsdGlwbGUgdmFsdWVzIGF0IG9uY2UuIFRoaXMgaXMgZmFzdGVyIHRoYW4gY2FsbGluZyBzZXQoKSBtdWx0aXBsZSB0aW1lcy5cbiAqIEl0J3MgYWxzbyBhdG9taWMgXHUyMDEzIGlmIG9uZSBvZiB0aGUgcGFpcnMgY2FuJ3QgYmUgYWRkZWQsIG5vbmUgd2lsbCBiZSBhZGRlZC5cbiAqXG4gKiBAcGFyYW0gZW50cmllcyBBcnJheSBvZiBlbnRyaWVzLCB3aGVyZSBlYWNoIGVudHJ5IGlzIGFuIGFycmF5IG9mIGBba2V5LCB2YWx1ZV1gLlxuICogQHBhcmFtIGN1c3RvbVN0b3JlIE1ldGhvZCB0byBnZXQgYSBjdXN0b20gc3RvcmUuIFVzZSB3aXRoIGNhdXRpb24gKHNlZSB0aGUgZG9jcykuXG4gKi9cbmZ1bmN0aW9uIHNldE1hbnkoZW50cmllcywgY3VzdG9tU3RvcmUgPSBkZWZhdWx0R2V0U3RvcmUoKSkge1xuICAgIHJldHVybiBjdXN0b21TdG9yZSgncmVhZHdyaXRlJywgKHN0b3JlKSA9PiB7XG4gICAgICAgIGVudHJpZXMuZm9yRWFjaCgoZW50cnkpID0+IHN0b3JlLnB1dChlbnRyeVsxXSwgZW50cnlbMF0pKTtcbiAgICAgICAgcmV0dXJuIHByb21pc2lmeVJlcXVlc3Qoc3RvcmUudHJhbnNhY3Rpb24pO1xuICAgIH0pO1xufVxuLyoqXG4gKiBHZXQgbXVsdGlwbGUgdmFsdWVzIGJ5IHRoZWlyIGtleXNcbiAqXG4gKiBAcGFyYW0ga2V5c1xuICogQHBhcmFtIGN1c3RvbVN0b3JlIE1ldGhvZCB0byBnZXQgYSBjdXN0b20gc3RvcmUuIFVzZSB3aXRoIGNhdXRpb24gKHNlZSB0aGUgZG9jcykuXG4gKi9cbmZ1bmN0aW9uIGdldE1hbnkoa2V5cywgY3VzdG9tU3RvcmUgPSBkZWZhdWx0R2V0U3RvcmUoKSkge1xuICAgIHJldHVybiBjdXN0b21TdG9yZSgncmVhZG9ubHknLCAoc3RvcmUpID0+IFByb21pc2UuYWxsKGtleXMubWFwKChrZXkpID0+IHByb21pc2lmeVJlcXVlc3Qoc3RvcmUuZ2V0KGtleSkpKSkpO1xufVxuLyoqXG4gKiBVcGRhdGUgYSB2YWx1ZS4gVGhpcyBsZXRzIHlvdSBzZWUgdGhlIG9sZCB2YWx1ZSBhbmQgdXBkYXRlIGl0IGFzIGFuIGF0b21pYyBvcGVyYXRpb24uXG4gKlxuICogQHBhcmFtIGtleVxuICogQHBhcmFtIHVwZGF0ZXIgQSBjYWxsYmFjayB0aGF0IHRha2VzIHRoZSBvbGQgdmFsdWUgYW5kIHJldHVybnMgYSBuZXcgdmFsdWUuXG4gKiBAcGFyYW0gY3VzdG9tU3RvcmUgTWV0aG9kIHRvIGdldCBhIGN1c3RvbSBzdG9yZS4gVXNlIHdpdGggY2F1dGlvbiAoc2VlIHRoZSBkb2NzKS5cbiAqL1xuZnVuY3Rpb24gdXBkYXRlKGtleSwgdXBkYXRlciwgY3VzdG9tU3RvcmUgPSBkZWZhdWx0R2V0U3RvcmUoKSkge1xuICAgIHJldHVybiBjdXN0b21TdG9yZSgncmVhZHdyaXRlJywgKHN0b3JlKSA9PiBcbiAgICAvLyBOZWVkIHRvIGNyZWF0ZSB0aGUgcHJvbWlzZSBtYW51YWxseS5cbiAgICAvLyBJZiBJIHRyeSB0byBjaGFpbiBwcm9taXNlcywgdGhlIHRyYW5zYWN0aW9uIGNsb3NlcyBpbiBicm93c2Vyc1xuICAgIC8vIHRoYXQgdXNlIGEgcHJvbWlzZSBwb2x5ZmlsbCAoSUUxMC8xMSkuXG4gICAgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBzdG9yZS5nZXQoa2V5KS5vbnN1Y2Nlc3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHN0b3JlLnB1dCh1cGRhdGVyKHRoaXMucmVzdWx0KSwga2V5KTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHByb21pc2lmeVJlcXVlc3Qoc3RvcmUudHJhbnNhY3Rpb24pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9KSk7XG59XG4vKipcbiAqIERlbGV0ZSBhIHBhcnRpY3VsYXIga2V5IGZyb20gdGhlIHN0b3JlLlxuICpcbiAqIEBwYXJhbSBrZXlcbiAqIEBwYXJhbSBjdXN0b21TdG9yZSBNZXRob2QgdG8gZ2V0IGEgY3VzdG9tIHN0b3JlLiBVc2Ugd2l0aCBjYXV0aW9uIChzZWUgdGhlIGRvY3MpLlxuICovXG5mdW5jdGlvbiBkZWwoa2V5LCBjdXN0b21TdG9yZSA9IGRlZmF1bHRHZXRTdG9yZSgpKSB7XG4gICAgcmV0dXJuIGN1c3RvbVN0b3JlKCdyZWFkd3JpdGUnLCAoc3RvcmUpID0+IHtcbiAgICAgICAgc3RvcmUuZGVsZXRlKGtleSk7XG4gICAgICAgIHJldHVybiBwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLnRyYW5zYWN0aW9uKTtcbiAgICB9KTtcbn1cbi8qKlxuICogRGVsZXRlIG11bHRpcGxlIGtleXMgYXQgb25jZS5cbiAqXG4gKiBAcGFyYW0ga2V5cyBMaXN0IG9mIGtleXMgdG8gZGVsZXRlLlxuICogQHBhcmFtIGN1c3RvbVN0b3JlIE1ldGhvZCB0byBnZXQgYSBjdXN0b20gc3RvcmUuIFVzZSB3aXRoIGNhdXRpb24gKHNlZSB0aGUgZG9jcykuXG4gKi9cbmZ1bmN0aW9uIGRlbE1hbnkoa2V5cywgY3VzdG9tU3RvcmUgPSBkZWZhdWx0R2V0U3RvcmUoKSkge1xuICAgIHJldHVybiBjdXN0b21TdG9yZSgncmVhZHdyaXRlJywgKHN0b3JlKSA9PiB7XG4gICAgICAgIGtleXMuZm9yRWFjaCgoa2V5KSA9PiBzdG9yZS5kZWxldGUoa2V5KSk7XG4gICAgICAgIHJldHVybiBwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLnRyYW5zYWN0aW9uKTtcbiAgICB9KTtcbn1cbi8qKlxuICogQ2xlYXIgYWxsIHZhbHVlcyBpbiB0aGUgc3RvcmUuXG4gKlxuICogQHBhcmFtIGN1c3RvbVN0b3JlIE1ldGhvZCB0byBnZXQgYSBjdXN0b20gc3RvcmUuIFVzZSB3aXRoIGNhdXRpb24gKHNlZSB0aGUgZG9jcykuXG4gKi9cbmZ1bmN0aW9uIGNsZWFyKGN1c3RvbVN0b3JlID0gZGVmYXVsdEdldFN0b3JlKCkpIHtcbiAgICByZXR1cm4gY3VzdG9tU3RvcmUoJ3JlYWR3cml0ZScsIChzdG9yZSkgPT4ge1xuICAgICAgICBzdG9yZS5jbGVhcigpO1xuICAgICAgICByZXR1cm4gcHJvbWlzaWZ5UmVxdWVzdChzdG9yZS50cmFuc2FjdGlvbik7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBlYWNoQ3Vyc29yKHN0b3JlLCBjYWxsYmFjaykge1xuICAgIHN0b3JlLm9wZW5DdXJzb3IoKS5vbnN1Y2Nlc3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghdGhpcy5yZXN1bHQpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNhbGxiYWNrKHRoaXMucmVzdWx0KTtcbiAgICAgICAgdGhpcy5yZXN1bHQuY29udGludWUoKTtcbiAgICB9O1xuICAgIHJldHVybiBwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLnRyYW5zYWN0aW9uKTtcbn1cbi8qKlxuICogR2V0IGFsbCBrZXlzIGluIHRoZSBzdG9yZS5cbiAqXG4gKiBAcGFyYW0gY3VzdG9tU3RvcmUgTWV0aG9kIHRvIGdldCBhIGN1c3RvbSBzdG9yZS4gVXNlIHdpdGggY2F1dGlvbiAoc2VlIHRoZSBkb2NzKS5cbiAqL1xuZnVuY3Rpb24ga2V5cyhjdXN0b21TdG9yZSA9IGRlZmF1bHRHZXRTdG9yZSgpKSB7XG4gICAgcmV0dXJuIGN1c3RvbVN0b3JlKCdyZWFkb25seScsIChzdG9yZSkgPT4ge1xuICAgICAgICAvLyBGYXN0IHBhdGggZm9yIG1vZGVybiBicm93c2Vyc1xuICAgICAgICBpZiAoc3RvcmUuZ2V0QWxsS2V5cykge1xuICAgICAgICAgICAgcmV0dXJuIHByb21pc2lmeVJlcXVlc3Qoc3RvcmUuZ2V0QWxsS2V5cygpKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpdGVtcyA9IFtdO1xuICAgICAgICByZXR1cm4gZWFjaEN1cnNvcihzdG9yZSwgKGN1cnNvcikgPT4gaXRlbXMucHVzaChjdXJzb3Iua2V5KSkudGhlbigoKSA9PiBpdGVtcyk7XG4gICAgfSk7XG59XG4vKipcbiAqIEdldCBhbGwgdmFsdWVzIGluIHRoZSBzdG9yZS5cbiAqXG4gKiBAcGFyYW0gY3VzdG9tU3RvcmUgTWV0aG9kIHRvIGdldCBhIGN1c3RvbSBzdG9yZS4gVXNlIHdpdGggY2F1dGlvbiAoc2VlIHRoZSBkb2NzKS5cbiAqL1xuZnVuY3Rpb24gdmFsdWVzKGN1c3RvbVN0b3JlID0gZGVmYXVsdEdldFN0b3JlKCkpIHtcbiAgICByZXR1cm4gY3VzdG9tU3RvcmUoJ3JlYWRvbmx5JywgKHN0b3JlKSA9PiB7XG4gICAgICAgIC8vIEZhc3QgcGF0aCBmb3IgbW9kZXJuIGJyb3dzZXJzXG4gICAgICAgIGlmIChzdG9yZS5nZXRBbGwpIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLmdldEFsbCgpKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpdGVtcyA9IFtdO1xuICAgICAgICByZXR1cm4gZWFjaEN1cnNvcihzdG9yZSwgKGN1cnNvcikgPT4gaXRlbXMucHVzaChjdXJzb3IudmFsdWUpKS50aGVuKCgpID0+IGl0ZW1zKTtcbiAgICB9KTtcbn1cbi8qKlxuICogR2V0IGFsbCBlbnRyaWVzIGluIHRoZSBzdG9yZS4gRWFjaCBlbnRyeSBpcyBhbiBhcnJheSBvZiBgW2tleSwgdmFsdWVdYC5cbiAqXG4gKiBAcGFyYW0gY3VzdG9tU3RvcmUgTWV0aG9kIHRvIGdldCBhIGN1c3RvbSBzdG9yZS4gVXNlIHdpdGggY2F1dGlvbiAoc2VlIHRoZSBkb2NzKS5cbiAqL1xuZnVuY3Rpb24gZW50cmllcyhjdXN0b21TdG9yZSA9IGRlZmF1bHRHZXRTdG9yZSgpKSB7XG4gICAgcmV0dXJuIGN1c3RvbVN0b3JlKCdyZWFkb25seScsIChzdG9yZSkgPT4ge1xuICAgICAgICAvLyBGYXN0IHBhdGggZm9yIG1vZGVybiBicm93c2Vyc1xuICAgICAgICAvLyAoYWx0aG91Z2gsIGhvcGVmdWxseSB3ZSdsbCBnZXQgYSBzaW1wbGVyIHBhdGggc29tZSBkYXkpXG4gICAgICAgIGlmIChzdG9yZS5nZXRBbGwgJiYgc3RvcmUuZ2V0QWxsS2V5cykge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgICAgICBwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLmdldEFsbEtleXMoKSksXG4gICAgICAgICAgICAgICAgcHJvbWlzaWZ5UmVxdWVzdChzdG9yZS5nZXRBbGwoKSksXG4gICAgICAgICAgICBdKS50aGVuKChba2V5cywgdmFsdWVzXSkgPT4ga2V5cy5tYXAoKGtleSwgaSkgPT4gW2tleSwgdmFsdWVzW2ldXSkpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGl0ZW1zID0gW107XG4gICAgICAgIHJldHVybiBjdXN0b21TdG9yZSgncmVhZG9ubHknLCAoc3RvcmUpID0+IGVhY2hDdXJzb3Ioc3RvcmUsIChjdXJzb3IpID0+IGl0ZW1zLnB1c2goW2N1cnNvci5rZXksIGN1cnNvci52YWx1ZV0pKS50aGVuKCgpID0+IGl0ZW1zKSk7XG4gICAgfSk7XG59XG5cbmV4cG9ydCB7IGNsZWFyLCBjcmVhdGVTdG9yZSwgZGVsLCBkZWxNYW55LCBlbnRyaWVzLCBnZXQsIGdldE1hbnksIGtleXMsIHByb21pc2lmeVJlcXVlc3QsIHNldCwgc2V0TWFueSwgdXBkYXRlLCB2YWx1ZXMgfTtcbiIsICJcInVzZSBzdHJpY3RcIjtcclxuXHJcbmZ1bmN0aW9uIGRlQ3ljbGVyKHZhbCwgY29uZmlnKSB7XHJcbiAgY29uZmlnID0gdHlwZW9mIGNvbmZpZyA9PT0gJ251bWJlcicgPyB7IGRlZXA6IGNvbmZpZyB9IDogKGNvbmZpZyB8fCB7fSk7XHJcbiAgY29uZmlnLmRlZXAgPSBjb25maWcuZGVlcCB8fCAxMDtcclxuICByZXR1cm4gZGVjeWNsZVdhbGtlcihbXSwgW10sIHZhbCwgY29uZmlnKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZGVDeWNsZWQodmFsLCBjb25maWcpIHtcclxuICBjb25maWcgPSB0eXBlb2YgY29uZmlnID09PSAnbnVtYmVyJyA/IHsgZGVlcDogY29uZmlnIH0gOiAoY29uZmlnIHx8IHt9KTtcclxuICB2YWwgPSBkZUN5Y2xlcih2YWwsIGNvbmZpZyk7XHJcbiAgdHJ5IHtcclxuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh2YWwsIHVuZGVmaW5lZCwgY29uZmlnLnNwYWNlcik7XHJcbiAgfSBjYXRjaCAoZSkge1xyXG4gICAgcmV0dXJuIGU7XHJcbiAgfVxyXG59XHJcblxyXG52YXIgcmV2aXZlckRhdGUgPSAvXlxcW0RhdGU6KChcXGR7NH0tXFxkezJ9LVxcZHsyfSlbQS1aXSsoXFxkezJ9OlxcZHsyfTpcXGR7Mn0pLihbMC05Ky06XSspWilcXF0kLztcclxudmFyIHJldml2ZXJSZWdFeHAgPSAvXlxcW1JlZ2V4cDpcXC8oLispXFwvXFxdJC87XHJcbnZhciByZXZpdmVyRXJyb3IgPSAvXlxcW0Vycm9yOihbXFxXXFx3XSspXFxdJC87XHJcbnZhciByZXZpdmVyRnVuY3Rpb24gPSAvXlxcW0Z1bmN0aW9uOiguKylcXF0kLztcclxuZnVuY3Rpb24gcmV2aXZlKHZhbCwgZnVuY3Rpb25zKSB7XHJcbiAgdHJ5IHtcclxuICAgIHJldHVybiBKU09OLnBhcnNlKHZhbCwgcmV2aXZlcik7XHJcbiAgfSBjYXRjaCAoZSkge1xyXG4gICAgcmV0dXJuIGU7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiByZXZpdmVyKGtleSwgdmFsKSB7XHJcbiAgICBpZiAocmV2aXZlckRhdGUudGVzdCh2YWwpKSB7XHJcbiAgICAgIHZhbCA9IHJldml2ZXJEYXRlLmV4ZWModmFsKTtcclxuICAgICAgdmFsID0gbmV3IERhdGUodmFsWzFdKTtcclxuICAgICAgcmV0dXJuIG5ldyBEYXRlKHZhbCk7XHJcbiAgICB9IGVsc2UgaWYgKHJldml2ZXJSZWdFeHAudGVzdCh2YWwpKSB7XHJcbiAgICAgIHZhbCA9IHJldml2ZXJSZWdFeHAuZXhlYyh2YWwpWzFdO1xyXG4gICAgICByZXR1cm4gbmV3IFJlZ0V4cCh2YWwpO1xyXG4gICAgfSBlbHNlIGlmIChyZXZpdmVyRXJyb3IudGVzdCh2YWwpKSB7XHJcbiAgICAgIHZhbCA9IHJldml2ZXJFcnJvci5leGVjKHZhbClbMV07XHJcbiAgICAgIHZhciBlcnJvciA9IG5ldyBFcnJvcih2YWwuc3BsaXQoJ1xcbicpWzBdKTtcclxuICAgICAgaWYgKGVycm9yLnN0YWNrKSB7XHJcbiAgICAgICAgZXJyb3Iuc3RhY2sgPSB2YWw7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGVycm9yO1xyXG4gICAgfSBlbHNlIGlmIChmdW5jdGlvbnMgJiYgcmV2aXZlckZ1bmN0aW9uLnRlc3QodmFsKSkge1xyXG4gICAgICB2YWwgPSByZXZpdmVyRnVuY3Rpb24uZXhlYyh2YWwpWzFdO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIHJldHVybiAobmV3IEZ1bmN0aW9uKFwicmV0dXJuIFwiICsgdmFsICsgXCI7XCIpKSgpO1xyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIHJldHVybiBlcnJvcjtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHZhbDtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRlY3ljbGVXYWxrZXIocGFyZW50cywgcGF0aCwgdmFsLCBjb25maWcpIHtcclxuICBpZiAoWyd1bmRlZmluZWQnLCAnbnVtYmVyJywgJ2Jvb2xlYW4nLCAnc3RyaW5nJ10uaW5kZXhPZih0eXBlb2YgdmFsKSA+PSAwIHx8IHZhbCA9PT0gbnVsbCkge1xyXG4gICAgcmV0dXJuIHZhbDtcclxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdvYmplY3QnICYmIHZhbC5jb25zdHJ1Y3RvciA9PT0gRGF0ZSkge1xyXG4gICAgcmV0dXJuIGNvbmZpZy5kYXRlcyAhPT0gZmFsc2UgPyAnW0RhdGU6JyArIHZhbC50b0lTT1N0cmluZygpICsgJ10nIDogdmFsO1xyXG4gICAgLy92YWwuZm9ybWF0KCd7WVlZWX0ve01NfS97RER9IHtoaH06e21tfTp7c3N9IFVUQzpcdTAwQjd7cGFyYW1zLnR6Pj0wP1wiK1wiK3BhcmFtcy50ejpwYXJhbXMudHp9XHUwMEI3Jyk7XHJcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnb2JqZWN0JyAmJiB2YWwuY29uc3RydWN0b3IgPT09IFJlZ0V4cCkge1xyXG4gICAgcmV0dXJuIGNvbmZpZy5yZWdleHBzICE9PSBmYWxzZSA/ICdbUmVnZXhwOicgKyB2YWwudG9TdHJpbmcoKSArICddJyA6IHZhbDtcclxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdvYmplY3QnICYmIHZhbC5jb25zdHJ1Y3RvciAmJiB0eXBlb2YgdmFsLmNvbnN0cnVjdG9yLm5hbWUgPT09ICdzdHJpbmcnICYmIHZhbC5jb25zdHJ1Y3Rvci5uYW1lLnNsaWNlKC01KSA9PT0gJ0Vycm9yJykge1xyXG4gICAgdmFyIHN0YWNrID0gKHZhbC5zdGFjayB8fCAnJykuc3BsaXQoJ1xcbicpLnNsaWNlKDEpO1xyXG4gICAgdmFyIG1lc3NhZ2UgPSAodmFsLm1lc3NhZ2UgfHwgdmFsLnRvU3RyaW5nKCkpO1xyXG4gICAgdmFyIGVycm9yID0gbWVzc2FnZSArIFwiXFxuXCIgKyBzdGFjaztcclxuICAgIHJldHVybiBjb25maWcuZXJyb3JzICE9PSBmYWxzZSA/ICdbRXJyb3I6JyArIGVycm9yICsgJ10nIDogdmFsO1xyXG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcclxuICAgIGlmIChwYXJlbnRzLmluZGV4T2YodmFsKSA+PSAwKSB7XHJcbiAgICAgIHZhciBwb2ludCA9IHBhdGguc2xpY2UoMCwgcGFyZW50cy5pbmRleE9mKHZhbCkpLmpvaW4oJy4nKTtcclxuICAgICAgcmV0dXJuICdbQ2lyY3VsYXInICsgKHBvaW50ID8gJzonICsgcG9pbnQgOiAnJykgKyAnXSc7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB2YXIgY29weSwgaSwgaywgbDtcclxuICAgICAgaWYgKHZhbC5jb25zdHJ1Y3RvciAmJiB0eXBlb2YgdmFsLmNvbnN0cnVjdG9yLm5hbWUgPT09ICdzdHJpbmcnICYmIHZhbC5jb25zdHJ1Y3Rvci5uYW1lLnNsaWNlKC01KSA9PT0gJ0FycmF5Jykge1xyXG4gICAgICAgIGlmIChwYXJlbnRzLmxlbmd0aCA+PSBjb25maWcuZGVlcCkge1xyXG4gICAgICAgICAgcmV0dXJuICdbQXJyYXk6JyArIHZhbC5jb25zdHJ1Y3Rvci5uYW1lICsgJ10nO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb3B5ID0gW107XHJcbiAgICAgICAgICBmb3IgKGkgPSAwLCBsID0gdmFsLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgICAgICBjb3B5W2ldID0gZGVjeWNsZVdhbGtlcihwYXJlbnRzLmNvbmNhdChbdmFsXSksIHBhdGguY29uY2F0KGkpLCB2YWxbaV0sIGNvbmZpZyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gY29weTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKHBhcmVudHMubGVuZ3RoID49IGNvbmZpZy5kZWVwKSB7XHJcbiAgICAgICAgICByZXR1cm4gJ1tPYmplY3Q6JyArICh2YWwuY29uc3RydWN0b3IgJiYgdmFsLmNvbnN0cnVjdG9yLm5hbWUgPyB2YWwuY29uc3RydWN0b3IubmFtZSA6ICdPYmplY3QnKSArICddJztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29weSA9IHt9O1xyXG4gICAgICAgICAgZm9yIChpID0gMCwgayA9IE9iamVjdC5rZXlzKHZhbCksIGwgPSBrLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgICAgICBjb3B5W2tbaV1dID0gZGVjeWNsZVdhbGtlcihwYXJlbnRzLmNvbmNhdChbdmFsXSksIHBhdGguY29uY2F0KFtrW2ldXSksIHZhbFtrW2ldXSwgY29uZmlnKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBjb3B5O1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgcmV0dXJuIGNvbmZpZy5mdW5jdGlvbnMgPT09IHRydWUgPyAnW0Z1bmN0aW9uOicgKyB2YWwudG9TdHJpbmcoKSArICddJyA6IHVuZGVmaW5lZDtcclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIHZhbC50b1N0cmluZygpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IHtcclxuICBkZUN5Y2xlcixcclxuICBkZUN5Y2xlZCxcclxuICByZXZpdmVcclxufSIsICJpbXBvcnQgaTE4biBmcm9tIFwiLi4vaTE4blwiO1xyXG5pbXBvcnQgdXRpbHMgZnJvbSBcIi4uL3V0aWxzXCI7XHJcblxyXG4vKipcclxuICogQHBhcmFtIHt7IGkxOG46IHN0cmluZyB8IHsgW2xhbmc6IHN0cmluZ106IHsgW2s6IHN0cmluZ106IHN0cmluZyB9IH19fSBjZmcgXHJcbiAqIEByZXR1cm5zIFxyXG4gKi9cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGJ1aWxkRXh0ZW5zaW9uSTE4TihjZmcpIHtcclxuICBpZiAoIWNmZz8uaTE4bikgcmV0dXJuIG51bGw7XHJcbiAgbGV0IG91dCA9IHtcclxuICAgIF9fY2FjaGVfXzoge1xyXG4gICAgICBsb2NhbGVJZHM6IFtdLFxyXG4gICAgICBsb2NhbGl6YXRpb25zOiB7fVxyXG4gICAgfSxcclxuICAgIGZvcm1hdChrZXksIC4uLmFyZ3MpIHtcclxuICAgICAgcmV0dXJuIHV0aWxzLmZvcm1hdChvdXQuZ2V0KGtleSksIC4uLmFyZ3MpO1xyXG4gICAgfSxcclxuICAgIGdldChrZXkpIHtcclxuICAgICAgaWYgKHR5cGVvZiBjZmcuaTE4biA9PT0gXCJzdHJpbmdcIikgY2hlY2soKTtcclxuICAgICAgcmV0dXJuIG91dC5fX2NhY2hlX18ubG9jYWxpemF0aW9uc1tvdXQubG9jYWxlXT8uW2tleV1cclxuICAgICAgICB8fCBvdXQuX19jYWNoZV9fLmxvY2FsaXphdGlvbnMuZGVmYXVsdD8uW2tleV1cclxuICAgICAgICB8fCBvdXQuZ2V0KGtleSk7XHJcbiAgICB9LFxyXG4gICAgbWVzc2FnZXM6IG5ldyBQcm94eSh7fSwge1xyXG4gICAgICBnZXQoXywgcHJvcCkge1xyXG4gICAgICAgIHJldHVybiBvdXQuZ2V0KHByb3ApO1xyXG4gICAgICB9XHJcbiAgICB9KSxcclxuICB9XHJcbiAgYXN5bmMgZnVuY3Rpb24gY2hlY2soKSB7XHJcbiAgICBjb25zdCBsb2NhbGUgPSBpMThuLmxvY2FsZTtcclxuICAgIGlmICh0eXBlb2YgY2ZnLmkxOG4gPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgY29uc3QgQkFTRV9VUkwgPSBjZmcuaTE4bi5lbmRzV2l0aChcIi9cIikgPyBjZmcuaTE4bi5zbGljZSgwLCAtMSkgOiBjZmcuaTE4bjtcclxuICAgICAgaWYgKCFvdXQuX19jYWNoZV9fLmxvY2FsZUlkcy5sZW5ndGgpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgb3V0Ll9fY2FjaGVfXy5sb2NhbGVJZHMgPSBhd2FpdCAoYXdhaXQgZmV0Y2goYCR7QkFTRV9VUkx9L2xvY2FsZXMuanNvbmAsIG5vU3RvcmUpKS5qc29uKCk7XHJcbiAgICAgICAgfSBjYXRjaCB7IH1cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgb3V0Ll9fY2FjaGVfXy5sb2NhbGl6YXRpb25zLmRlZmF1bHQgPSBhd2FpdCAoYXdhaXQgZmV0Y2goYCR7QkFTRV9VUkx9L2RlZmF1bHQuanNvbmAsIG5vU3RvcmUpKS5qc29uKCk7XHJcbiAgICAgICAgfSBjYXRjaCB7IH1cclxuICAgICAgfVxyXG4gICAgICBpZiAoXHJcbiAgICAgICAgb3V0Ll9fY2FjaGVfXy5sb2NhbGVJZHMuaW5jbHVkZXMobG9jYWxlKVxyXG4gICAgICAgICYmICFvdXQuX19jYWNoZV9fLmxvY2FsaXphdGlvbnM/Lltsb2NhbGVdXHJcbiAgICAgICkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICBvdXQuX19jYWNoZV9fLmxvY2FsaXphdGlvbnNbbG9jYWxlXSA9IGF3YWl0IChhd2FpdCBmZXRjaChgJHtCQVNFX1VSTH0vJHtsb2NhbGV9Lmpzb25gLCBub1N0b3JlKSkuanNvbigpO1xyXG4gICAgICAgIH0gY2F0Y2ggeyB9O1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBvdXQuX19jYWNoZV9fLmxvY2FsZUlkcyA9IE9iamVjdC5rZXlzKGNmZy5pMThuKTtcclxuICAgICAgb3V0Ll9fY2FjaGVfXy5sb2NhbGl6YXRpb25zID0gY2ZnLmkxOG47XHJcbiAgICB9XHJcbiAgfVxyXG4gIGF3YWl0IGNoZWNrKCk7XHJcbiAgcmV0dXJuIG91dDtcclxufSIsICJpbXBvcnQgeyBCYXNpY0V2ZW50RW1pdHRlciB9IGZyb20gXCIuLi8uLi9saWIvQmFzaWNFdmVudEVtaXR0ZXIuanNcIjtcclxuaW1wb3J0IGRldiBmcm9tIFwiLi4vZGV2L2luZGV4LmpzXCI7XHJcbmltcG9ydCBpMThuIGZyb20gXCIuLi9pMThuL2luZGV4LmpzXCI7XHJcbmltcG9ydCBtb2R1bGVzIGZyb20gXCIuLi9tb2R1bGVzL2luZGV4LmpzXCI7XHJcbmltcG9ydCBzdG9yYWdlIGZyb20gXCIuLi9zdG9yYWdlL2luZGV4LmpzXCI7XHJcbmltcG9ydCB7IGJ1aWxkRXh0ZW5zaW9uSTE4TiB9IGZyb20gXCIuL2kxOG4uanNcIjtcclxuaW1wb3J0ICogYXMgbmVzdHMgZnJvbSBcIm5lc3RzXCI7XHJcblxyXG4vKipcclxuICogQHBhcmFtIHt7IG1vZHVsZXM6IHsgbm9kZTogeyBuYW1lOiBzdHJpbmcsIHJlYXNvbjogc3RyaW5nIH1bXSwgY29tbW9uOiB7IG5hbWU6IHN0cmluZywgcmVhc29uOiBzdHJpbmcgfVtdLCBjdXN0b206IHsgcmVhc29uOiBzdHJpbmcsIG5hbWU6IHN0cmluZywgbGF6eTogYm9vbGVhbiwgZmluZGVyOiB7IGZpbHRlcjogeyBleHBvcnQ6IGJvb2xlYW4sIGluOiBcInByb3BlcnRpZXNcIiB8IFwic3RyaW5nc1wiIHwgXCJwcm90b3R5cGVzXCIsIGJ5OiBbc3RyaW5nW10sIHN0cmluZ1tdP10gfSwgcGF0aDogeyBiZWZvcmU6IHN0cmluZyB8IHN0cmluZ1tdLCBhZnRlcjogc3RyaW5nIHwgc3RyaW5nW10gfSwgbWFwOiB7IFtrOiBzdHJpbmddOiBzdHJpbmdbXSB9IH0gfVtdLCBtb2RlPzogXCJkZXZlbG9wbWVudFwiIHwgXCJwcm9kdWN0aW9uXCIgfSwgYWJvdXQ6IHsgbmFtZTogc3RyaW5nIHwgeyBbazogc3RyaW5nXTogc3RyaW5nIH0sIGRlc2NyaXB0aW9uOiBzdHJpbmcgfCB7IFtrOiBzdHJpbmddOiBzdHJpbmcgfSwgc2x1Zzogc3RyaW5nIH0gfX0gY2ZnIFxyXG4gKi9cclxuYXN5bmMgZnVuY3Rpb24gYnVpbGRBUEkoY2ZnKSB7XHJcbiAgY29uc3QgZGV2TW9kZSA9IGRldi5lbmFibGVkIHx8IGNmZz8ubW9kdWxlcz8ubW9kZSA9PT0gXCJkZXZlbG9wbWVudFwiO1xyXG4gIGNvbnN0IHBlcnNpc3QgPSBhd2FpdCBzdG9yYWdlLmNyZWF0ZVBlcnNpc3ROZXN0KGBFeHRlbnNpb247UGVyc2lzdDske2NmZy5hYm91dC5zbHVnfWApO1xyXG4gIGNvbnN0IG91dCA9IHtcclxuICAgIG1vZHVsZXM6IHtcclxuICAgICAgX19jYWNoZV9fOiB7XHJcbiAgICAgICAgY29tbW9uOiB7fSxcclxuICAgICAgICBub2RlOiB7fSxcclxuICAgICAgICBjdXN0b206IHt9LFxyXG4gICAgICAgIGN1c3RvbUxhenk6IHt9XHJcbiAgICAgIH0sXHJcbiAgICAgIHJlcXVpcmUobmFtZSkge1xyXG4gICAgICAgIGlmICghZGV2TW9kZSkge1xyXG4gICAgICAgICAgaWYgKHR5cGVvZiBvdXQubW9kdWxlcy5fX2NhY2hlX18ubm9kZVtuYW1lXSAhPT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIG91dC5tb2R1bGVzLl9fY2FjaGVfXy5ub2RlW25hbWVdO1xyXG4gICAgICAgICAgaWYgKGNmZz8ubW9kdWxlcz8ubm9kZT8uc29tZT8uKGkgPT4gaS5uYW1lID09PSBuYW1lKSkgcmV0dXJuIG91dC5tb2R1bGVzLl9fY2FjaGVfXy5ub2RlW25hbWVdID0gbW9kdWxlcy5yZXF1aXJlKG5hbWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZXR1cm4gbW9kdWxlcy5yZXF1aXJlKG5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgfSxcclxuICAgICAgY29tbW9uOiBuZXcgUHJveHkoe30sIHtcclxuICAgICAgICBnZXQoXywgcHJvcCkge1xyXG4gICAgICAgICAgaWYgKCFkZXZNb2RlKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb3V0Lm1vZHVsZXMuX19jYWNoZV9fLmNvbW1vbltwcm9wXSAhPT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIG91dC5tb2R1bGVzLl9fY2FjaGVfXy5jb21tb25bcHJvcF07XHJcbiAgICAgICAgICAgIGlmIChjZmc/Lm1vZHVsZXM/LmNvbW1vbj8uc29tZT8uKGkgPT4gaS5uYW1lID09PSBwcm9wKSkgcmV0dXJuIG91dC5tb2R1bGVzLl9fY2FjaGVfXy5jb21tb25bcHJvcF0gPSBtb2R1bGVzLmNvbW1vbltwcm9wXTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtb2R1bGVzLmNvbW1vbltwcm9wXTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pLFxyXG4gICAgICBjdXN0b206IG5ldyBQcm94eSh7fSwge1xyXG4gICAgICAgIGdldChfLCBwcm9wKSB7XHJcbiAgICAgICAgICBpZiAodHlwZW9mIG91dC5tb2R1bGVzLl9fY2FjaGVfXy5jdXN0b21bcHJvcF0gIT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBvdXQubW9kdWxlcy5fX2NhY2hlX18uY3VzdG9tW3Byb3BdO1xyXG4gICAgICAgICAgbGV0IGRhdGEgPSBjZmc/Lm1vZHVsZXM/LmN1c3RvbT8uc29tZT8uKGkgPT4gaS5uYW1lID09PSBwcm9wKTtcclxuICAgICAgICAgIGlmICghZGF0YSkgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICBpZiAoZGF0YS5sYXp5KSB7XHJcbiAgICAgICAgICAgIGxldCBwcm9tID0gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICAgIGxldCByID0gYXdhaXQgbW9kdWxlcy53ZWJwYWNrLmxhenlGaW5kQnlGaW5kZXIoZGF0YS5maW5kZXIpO1xyXG4gICAgICAgICAgICAgIG91dC5tb2R1bGVzLl9fY2FjaGVfXy5jdXN0b21MYXp5W3Byb3BdID0gcjtcclxuICAgICAgICAgICAgICByZXNvbHZlKHIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgb3V0Lm1vZHVsZXMuX19jYWNoZV9fLmN1c3RvbVtwcm9wXSA9IHtcclxuICAgICAgICAgICAgICBnZXQoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvbTtcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIGdldCB2YWx1ZSgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBvdXQubW9kdWxlcy5fX2NhY2hlX18uY3VzdG9tTGF6eVtwcm9wXTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgdmFsdWUgPSBtb2R1bGVzLndlYnBhY2suZmluZEJ5RmluZGVyKGRhdGEuZmluZGVyKTtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlPy52YWx1ZSAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICAgICAgb3V0Lm1vZHVsZXMuX19jYWNoZV9fLmN1c3RvbVtwcm9wXSA9IHZhbHVlID8gT2JqZWN0LmFzc2lnbih2YWx1ZSwgeyB2YWx1ZSwgZ2V0KCkgeyByZXR1cm4gdmFsdWUgfSB9KSA6IG51bGw7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG91dC5tb2R1bGVzLl9fY2FjaGVfXy5jdXN0b21bcHJvcF0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gY2F0Y2gge1xyXG4gICAgICAgICAgICAgIG91dC5tb2R1bGVzLl9fY2FjaGVfXy5jdXN0b21bcHJvcF0gPSB2YWx1ZSA/IHsgdmFsdWUsIGdldCgpIHsgcmV0dXJuIHZhbHVlIH0gfSA6IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBvdXQubW9kdWxlcy5fX2NhY2hlX18uY3VzdG9tW3Byb3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgfSksXHJcbiAgICB9LFxyXG4gICAgaTE4bixcclxuICAgIGV4dGVuc2lvbjoge1xyXG4gICAgICBjb25maWc6IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoY2ZnKSksXHJcbiAgICAgIHBlcnNpc3QsXHJcbiAgICAgIGkxOG46IGF3YWl0IGJ1aWxkRXh0ZW5zaW9uSTE4TihjZmcpLFxyXG4gICAgICBldmVudHM6IG5ldyBCYXNpY0V2ZW50RW1pdHRlcigpLFxyXG4gICAgICBzdWJzY3JpcHRpb25zOiBbXVxyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHJldHVybiBvdXQ7XHJcbn1cclxuXHJcbmNvbnN0IG91dCA9IHtcclxuICBfX2NhY2hlX186IHtcclxuICAgIGluaXRpYWxpemVkOiBmYWxzZSxcclxuICAgIGxvYWRlZDogbmVzdHMubWFrZSh7fSlcclxuICB9LFxyXG4gIHN0b3JhZ2U6IHtcclxuICAgIC8qKiBAdHlwZSB7bmVzdHMuTmVzdH0gKi9cclxuICAgIGluc3RhbGxlZDoge31cclxuICB9LFxyXG4gIGJ1aWxkQVBJLFxyXG4gIGFzeW5jIGluaXQoKSB7XHJcbiAgICBpZiAob3V0Ll9fY2FjaGVfXy5pbml0aWFsaXplZCkgcmV0dXJuO1xyXG4gICAgb3V0Ll9fY2FjaGVfXy5pbml0aWFsaXplZCA9IHRydWU7XHJcbiAgICBvdXQuc3RvcmFnZS5pbnN0YWxsZWQgPSBhd2FpdCBzdG9yYWdlLmNyZWF0ZVBlcnNpc3ROZXN0KFwiRXh0ZW5zaW9ucztJbnN0YWxsZWRcIik7XHJcbiAgfSxcclxuICAvKipcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsIFxyXG4gICAqL1xyXG4gIGFzeW5jIGluc3RhbGwodXJsLCBkZWZhdWx0Q29uZmlnID0ge30pIHtcclxuICAgIGlmICghb3V0Ll9fY2FjaGVfXy5pbml0aWFsaXplZCkgYXdhaXQgb3V0LmluaXQoKTtcclxuICAgIGlmICh1cmwuZW5kc1dpdGgoXCIvXCIpKSB1cmwgPSB1cmwuc2xpY2UoMCwgLTEpO1xyXG4gICAgaWYgKG91dC5zdG9yYWdlLmluc3RhbGxlZC5naG9zdFt1cmxdKSB0aHJvdyBuZXcgRXJyb3IoYFwiJHt1cmx9XCIgZXh0ZW5zaW9uIGlzIGFscmVhZHkgaW5zdGFsbGVkLmApO1xyXG5cclxuICAgIGxldCBtZXRhUmVzcCA9IGF3YWl0IGZldGNoKGAke3VybH0vbWV0YWRhdGEuanNvbmApO1xyXG4gICAgaWYgKG1ldGFSZXNwLnN0YXR1cyAhPT0gMjAwKSB0aHJvdyBuZXcgRXJyb3IoYFwiJHt1cmx9XCIgZXh0ZW5zaW9uIG1ldGFkYXRhIGlzIG5vdCByZXNwb25kZWQgd2l0aCAyMDAgc3RhdHVzIGNvZGUuYCk7XHJcbiAgICBsZXQgbWV0YWRhdGEgPSBhd2FpdCBtZXRhUmVzcC5qc29uKCk7XHJcblxyXG4gICAgbGV0IHJlYWRtZVJlc3AgPSBhd2FpdCBmZXRjaChgJHt1cmx9L3JlYWRtZS5tZGApO1xyXG4gICAgbGV0IHJlYWRtZSA9IHJlYWRtZVJlc3Auc3RhdHVzID09PSAyMDAgPyBhd2FpdCByZWFkbWVSZXNwLnRleHQoKSA6IG51bGw7XHJcblxyXG4gICAgLy8gVE9ETzogU2hvdyBtb2RhbCBmb3IgdXNlciB0byBhY2NlcHQgdGhlIGV4dGVuc2lvbiAodGVybXMsIHByaXZhY3ksIGV0Yy4pXHJcblxyXG4gICAgbGV0IHNvdXJjZVJlc3AgPSBhd2FpdCBmZXRjaChgJHt1cmx9L3NvdXJjZS5qc2ApO1xyXG4gICAgaWYgKHNvdXJjZVJlc3Auc3RhdHVzICE9PSAyMDApIHRocm93IG5ldyBFcnJvcihgXCIke3VybH1cIiBleHRlbnNpb24gc291cmNlIGlzIG5vdCByZXNwb25kZWQgd2l0aCAyMDAgc3RhdHVzIGNvZGUuYCk7XHJcbiAgICBsZXQgc291cmNlID0gYXdhaXQgc291cmNlUmVzcC50ZXh0KCk7XHJcblxyXG4gICAgb3V0LnN0b3JhZ2UuaW5zdGFsbGVkLnN0b3JlW3VybF0gPSB7XHJcbiAgICAgIG1ldGFkYXRhLFxyXG4gICAgICBzb3VyY2UsXHJcbiAgICAgIHJlYWRtZSxcclxuICAgICAgY29uZmlnOiB7XHJcbiAgICAgICAgYXV0b1VwZGF0ZTogdHJ1ZSxcclxuICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgIG9yZGVyOiAwLFxyXG4gICAgICAgIC4uLmRlZmF1bHRDb25maWdcclxuICAgICAgfSxcclxuICAgICAgZXh0cmE6IHtcclxuICAgICAgICBsYXN0VXBkYXRlZEF0OiBEYXRlLm5vdygpXHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgYXdhaXQgb3V0LmxvYWQodXJsKTtcclxuICB9LFxyXG4gIGFzeW5jIHVwZGF0ZSh1cmwpIHtcclxuICAgIGlmICghb3V0Ll9fY2FjaGVfXy5pbml0aWFsaXplZCkgYXdhaXQgb3V0LmluaXQoKTtcclxuICAgIGlmICghb3V0LnN0b3JhZ2UuaW5zdGFsbGVkLmdob3N0W3VybF0pIHRocm93IG5ldyBFcnJvcihgXCIke3VybH1cIiBleHRlbnNpb24gaXMgbm90IGluc3RhbGxlZC5gKTtcclxuICAgIGlmIChvdXQuc3RvcmFnZS5sb2FkZWQuZ2hvc3RbdXJsXSkgdGhyb3cgbmV3IEVycm9yKGBcIiR7dXJsfVwiIGV4dGVuc2lvbiBpcyBsb2FkZWQuIFBsZWFzZSB1bmxvYWQgaXQgZmlyc3QuYCk7XHJcblxyXG4gICAgbGV0IGRhdGEgPSBvdXQuc3RvcmFnZS5pbnN0YWxsZWQuZ2hvc3RbdXJsXTtcclxuXHJcbiAgICBsZXQgbWV0YVJlc3AgPSBhd2FpdCBmZXRjaChgJHt1cmx9L21ldGFkYXRhLmpzb25gKTtcclxuICAgIGlmIChtZXRhUmVzcC5zdGF0dXMgIT09IDIwMCkgdGhyb3cgbmV3IEVycm9yKGBcIiR7dXJsfVwiIGV4dGVuc2lvbiBtZXRhZGF0YSBpcyBub3QgcmVzcG9uZGVkIHdpdGggMjAwIHN0YXR1cyBjb2RlLmApO1xyXG4gICAgbGV0IG1ldGFkYXRhID0gYXdhaXQgbWV0YVJlc3AuanNvbigpO1xyXG5cclxuICAgIGlmIChkYXRhLm1ldGFkYXRhLmhhc2ggPT09IG1ldGFkYXRhLmhhc2gpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICBsZXQgcmVhZG1lUmVzcCA9IGF3YWl0IGZldGNoKGAke3VybH0vcmVhZG1lLm1kYCk7XHJcbiAgICBsZXQgcmVhZG1lID0gcmVhZG1lUmVzcC5zdGF0dXMgPT09IDIwMCA/IGF3YWl0IHJlYWRtZVJlc3AudGV4dCgpIDogbnVsbDtcclxuXHJcbiAgICBsZXQgc291cmNlUmVzcCA9IGF3YWl0IGZldGNoKGAke3VybH0vc291cmNlLmpzYCk7XHJcbiAgICBpZiAoc291cmNlUmVzcC5zdGF0dXMgIT09IDIwMCkgdGhyb3cgbmV3IEVycm9yKGBcIiR7dXJsfVwiIGV4dGVuc2lvbiBzb3VyY2UgaXMgbm90IHJlc3BvbmRlZCB3aXRoIDIwMCBzdGF0dXMgY29kZS5gKTtcclxuICAgIGxldCBzb3VyY2UgPSBhd2FpdCBzb3VyY2VSZXNwLnRleHQoKTtcclxuXHJcbiAgICB1dC5zdG9yYWdlLmluc3RhbGxlZC5zdG9yZVt1cmxdID0ge1xyXG4gICAgICBtZXRhZGF0YSxcclxuICAgICAgc291cmNlLFxyXG4gICAgICByZWFkbWUsXHJcbiAgICAgIGNvbmZpZzogZGF0YS5jb25maWcsXHJcbiAgICAgIGV4dHJhOiB7XHJcbiAgICAgICAgbGFzdFVwZGF0ZWRBdDogRGF0ZS5ub3coKVxyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH0sXHJcbiAgYXN5bmMgdW5pbnN0YWxsKHVybCkge1xyXG4gICAgaWYgKCFvdXQuX19jYWNoZV9fLmluaXRpYWxpemVkKSBhd2FpdCBvdXQuaW5pdCgpO1xyXG4gICAgaWYgKCFvdXQuc3RvcmFnZS5pbnN0YWxsZWQuZ2hvc3RbdXJsXSkgdGhyb3cgbmV3IEVycm9yKGBcIiR7dXJsfVwiIGV4dGVuc2lvbiBpcyBub3QgaW5zdGFsbGVkLmApO1xyXG5cclxuICAgIGRlbGV0ZSBvdXQuc3RvcmFnZS5pbnN0YWxsZWQuc3RvcmVbdXJsXTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBhd2FpdCBvdXQudW5sb2FkKHVybCk7XHJcbiAgICB9IGNhdGNoIHsgfVxyXG4gIH0sXHJcbiAgYXN5bmMgbG9hZCh1cmwpIHtcclxuICAgIGlmICghb3V0Ll9fY2FjaGVfXy5pbml0aWFsaXplZCkgYXdhaXQgb3V0LmluaXQoKTtcclxuICAgIGlmICghb3V0LnN0b3JhZ2UuaW5zdGFsbGVkLmdob3N0W3VybF0pIHRocm93IG5ldyBFcnJvcihgXCIke3VybH1cIiBleHRlbnNpb24gaXMgbm90IGluc3RhbGxlZC5gKTtcclxuICAgIGxldCBkYXRhID0gb3V0LnN0b3JhZ2UuaW5zdGFsbGVkLmdob3N0W3VybF07XHJcblxyXG4gICAgaWYgKG91dC5fX2NhY2hlX18ubG9hZGVkLmdob3N0W3VybF0pIHRocm93IG5ldyBFcnJvcihgXCIke3VybH1cIiBleHRlbnNpb24gaXMgYWxyZWFkeSBsb2FkZWQuYCk7XHJcblxyXG4gICAgbGV0IGFwaSA9IGF3YWl0IG91dC5idWlsZEFQSShkYXRhLm1ldGFkYXRhKTtcclxuXHJcbiAgICBsZXQgZXZhbHVhdGVkID0gb3V0LmV2YWx1YXRlKGRhdGEuc291cmNlLCBhcGkpO1xyXG5cclxuICAgIGF3YWl0IGV2YWx1YXRlZD8ubG9hZD8uKCk7XHJcblxyXG4gICAgb3V0Ll9fY2FjaGVfXy5sb2FkZWQuc3RvcmVbdXJsXSA9IHtcclxuICAgICAgZXZhbHVhdGVkLFxyXG4gICAgICBhcGlcclxuICAgIH07XHJcbiAgfSxcclxuICBhc3luYyB1bmxvYWQodXJsKSB7XHJcbiAgICBpZiAoIW91dC5fX2NhY2hlX18uaW5pdGlhbGl6ZWQpIGF3YWl0IG91dC5pbml0KCk7XHJcbiAgICBpZiAoIW91dC5zdG9yYWdlLmluc3RhbGxlZC5naG9zdFt1cmxdKSB0aHJvdyBuZXcgRXJyb3IoYFwiJHt1cmx9XCIgZXh0ZW5zaW9uIGlzIG5vdCBpbnN0YWxsZWQuYCk7XHJcblxyXG4gICAgaWYgKCFvdXQuX19jYWNoZV9fLmxvYWRlZC5naG9zdFt1cmxdKSB0aHJvdyBuZXcgRXJyb3IoYFwiJHt1cmx9XCIgZXh0ZW5zaW9uIGlzIG5vdCBsb2FkZWQuYCk7XHJcblxyXG4gICAgbGV0IHsgZXZhbHVhdGVkLCBhcGkgfSA9IG91dC5fX2NhY2hlX18ubG9hZGVkLmdob3N0W3VybF07XHJcblxyXG4gICAgYXBpLmV4dGVuc2lvbi5ldmVudHMuZW1pdChcInVubG9hZFwiKTtcclxuICAgIGFwaS5leHRlbnNpb24uc3Vic2NyaXB0aW9ucy5mb3JFYWNoKGkgPT4gdHlwZW9mIGkgPT09IFwiZnVuY3Rpb25cIiAmJiBpKCkpO1xyXG4gICAgYXdhaXQgZXZhbHVhdGVkPy51bmxvYWQ/LigpO1xyXG5cclxuICAgIGRlbGV0ZSBvdXQuX19jYWNoZV9fLmxvYWRlZC5zdG9yZVt1cmxdO1xyXG4gIH0sXHJcbiAgZXZhbHVhdGUoc291cmNlLCBhcGkpIHtcclxuICAgIGNvbnN0ICRhY29yZCA9IGFwaTtcclxuICAgIHJldHVybiBldmFsKHNvdXJjZSk7XHJcbiAgfSxcclxuICBhc3luYyBsb2FkQWxsKCkge1xyXG4gICAgaWYgKCFvdXQuX19jYWNoZV9fLmluaXRpYWxpemVkKSBhd2FpdCBvdXQuaW5pdCgpO1xyXG4gICAgcmV0dXJuIFByb21pc2UuYWxsKE9iamVjdC5lbnRyaWVzKG91dC5zdG9yYWdlLmluc3RhbGxlZC5naG9zdCkuc29ydCgoWywgYV0sIFssIGJdKSA9PiBiLmNvbmZpZy5vcmRlciAtIGEuY29uZmlnLm9yZGVyKS5tYXAoKFt1cmxdKSA9PiBvdXQubG9hZCh1cmwpKSk7XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgb3V0OyIsICJleHBvcnQgZGVmYXVsdCB7XHJcbiAgcHJvY2VzczogZ2xvYmFsVGhpc1tcIjxQUkVMT0FEX0tFWT5cIl0ucHJvY2VzcyxcclxuICBpc0RldlRvb2xzT3BlbjogZ2xvYmFsVGhpc1tcIjxQUkVMT0FEX0tFWT5cIl0uaXNEZXZUb29sc09wZW5cclxufVxyXG5cclxuIiwgImltcG9ydCB7IHdhaXRVbnRpbENvbm5lY3Rpb25PcGVuIH0gZnJvbSBcIi4uLy4uL290aGVyL3V0aWxzLmpzXCI7XHJcbmltcG9ydCBjb21tb24gZnJvbSBcIi4uL21vZHVsZXMvY29tbW9uLmpzXCI7XHJcbmltcG9ydCBwYXRjaGVyIGZyb20gXCIuLi9wYXRjaGVyL2luZGV4LmpzXCI7XHJcblxyXG5jb25zdCBzb2NrZXRzID0gbmV3IFNldCgpO1xyXG5jb25zdCBoYW5kbGVycyA9IG5ldyBNYXAoKTtcclxuXHJcbndhaXRVbnRpbENvbm5lY3Rpb25PcGVuKCkudGhlbigoKSA9PiB7XHJcbiAgcGF0Y2hlci5pbnN0ZWFkKFxyXG4gICAgXCJoYW5kbGVDb25uZWN0aW9uXCIsXHJcbiAgICBjb21tb24uV2ViU29ja2V0LFxyXG4gICAgKGFyZ3MsIG9yaWcpID0+IHtcclxuICAgICAgY29uc3Qgd3MgPSBhcmdzWzBdO1xyXG4gICAgICBpZiAod3MudXBncmFkZVJlcSgpLnVybCAhPT0gXCIvYWNvcmRcIikgcmV0dXJuIG9yaWcoLi4uYXJncyk7XHJcblxyXG4gICAgICBzb2NrZXRzLmFkZCh3cyk7XHJcblxyXG4gICAgICB3cy5vbihcIm1lc3NhZ2VcIiwgYXN5bmMgKG1zZykgPT4ge1xyXG4gICAgICAgIGxldCBqc29uO1xyXG5cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAganNvbiA9IEpTT04ucGFyc2UobXNnKTtcclxuICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShqc29uKSB8fCBqc29uLmxlbmd0aCA8IDEgfHwganNvbi5sZW5ndGggPiAzKVxyXG4gICAgICAgICAgICB0aHJvdyBcIkFycmF5IGV4cGVjdGVkIGFzIG1lc3NhZ2UuXCI7XHJcbiAgICAgICAgICBpZiAodHlwZW9mIGpzb25bMF0gIT0gXCJzdHJpbmdcIikgdGhyb3cgXCJBcnJheVswXSBuZWVkcyB0byBiZSBzdHJpbmcuXCI7XHJcbiAgICAgICAgICBpZiAodHlwZW9mIGpzb25bMV0gIT0gXCJzdHJpbmdcIikgdGhyb3cgXCJBcnJheVsxXSBuZWVkcyB0byBiZSBzdHJpbmcuXCI7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICB3cy5zZW5kKFxyXG4gICAgICAgICAgICBKU09OLnN0cmluZ2lmeShbXHJcbiAgICAgICAgICAgICAgbnVsbCxcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBvazogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBlcnJvcjogYCR7ZXJyfWAsXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXSlcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBbZXZlbnRJZCwgZXZlbnROYW1lLCBldmVudERhdGFdID0ganNvbjtcclxuXHJcbiAgICAgICAgY29uc3QgaGFuZGxlciA9IGhhbmRsZXJzLmdldChldmVudE5hbWUpO1xyXG5cclxuICAgICAgICBpZiAoIWhhbmRsZXIpXHJcbiAgICAgICAgICByZXR1cm4gd3Muc2VuZChcclxuICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoW1xyXG4gICAgICAgICAgICAgIGV2ZW50SWQsXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgb2s6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgZXJyb3I6IGBVbmFibGUgdG8gZmluZCBoYW5kbGVyLmAsXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXSlcclxuICAgICAgICAgICk7XHJcblxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICBsZXQgcmVzcG9uc2UgPSBhd2FpdCBoYW5kbGVyKGV2ZW50RGF0YSk7XHJcbiAgICAgICAgICB3cy5zZW5kKFxyXG4gICAgICAgICAgICBKU09OLnN0cmluZ2lmeShbXHJcbiAgICAgICAgICAgICAgZXZlbnRJZCxcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBvazogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHJlc3BvbnNlLFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIF0pXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgd3Muc2VuZChcclxuICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoW1xyXG4gICAgICAgICAgICAgIGV2ZW50SWQsXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgb2s6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgZXJyb3I6IGAke2Vycn1gLFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIF0pXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgICB3cy5vbihcImNsb3NlXCIsICgpID0+IHNvY2tldHMuZGVsZXRlKHdzKSk7XHJcbiAgICB9XHJcbiAgKTtcclxufSk7XHJcblxyXG5mdW5jdGlvbiBzZXQoZXZlbnROYW1lLCBjYWxsYmFjaykge1xyXG4gIGlmICh0eXBlb2YgZXZlbnROYW1lICE9IFwic3RyaW5nXCIpXHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJFdmVudE5hbWUgbmVlZHMgdG8gYmUgYSBzdHJpbmcuXCIpO1xyXG4gIGlmICh0eXBlb2YgY2FsbGJhY2sgIT0gXCJmdW5jdGlvblwiKVxyXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ2FsbGJhY2sgbmVlZHMgdG8gYmUgYSBmdW5jdGlvbi5cIik7XHJcbiAgaWYgKGhhbmRsZXJzLmhhcyhldmVudE5hbWUpKVxyXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiRXZlbnROYW1lIGFscmVhZHkgaW4gdXNlLlwiKTtcclxuICBoYW5kbGVycy5zZXQoZXZlbnROYW1lLCBjYWxsYmFjayk7XHJcbiAgcmV0dXJuICgpID0+IHtcclxuICAgIGhhbmRsZXJzLmRlbGV0ZShldmVudE5hbWUpO1xyXG4gIH07XHJcbn1cclxuZnVuY3Rpb24gdHJpZ2dlcihldmVudE5hbWUsIC4uLmFyZ3MpIHtcclxuICBpZiAoIXNvY2tldEV2ZW50cy5oYXMoZXZlbnROYW1lKSlcclxuICAgIHRocm93IG5ldyBFcnJvcihcIlVuYWJsZSB0byBmaW5kIGhhbmRsZXIhXCIpO1xyXG4gIHJldHVybiBzb2NrZXRFdmVudHMuZ2V0KGV2ZW50TmFtZSkoLi4uYXJncyk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBzZXQsXHJcbiAgdHJpZ2dlclxyXG59XHJcblxyXG4iLCAiZXhwb3J0IGRlZmF1bHQgYFxuLmFjb3JkLS1sYXllci1jb250YWluZXJ7LS10b3Atb2Zmc2V0OiAwcHg7d2lkdGg6MTAwdnc7aGVpZ2h0OmNhbGMoMTAwdmggLSB2YXIoLS10b3Atb2Zmc2V0KSk7ei1pbmRleDo5OTk5OTk5O3BvaW50ZXItZXZlbnRzOm5vbmU7cG9zaXRpb246YWJzb2x1dGU7dG9wOnZhcigtLXRvcC1vZmZzZXQpO2xlZnQ6MHB4fS5hY29yZC0tbGF5ZXItY29udGFpbmVyICp7ei1pbmRleDo5OTk5OTk5OTk5OTk5OX0uYWNvcmQtLXRvb2x0aXAtbGF5ZXJ7b3BhY2l0eTowO3RyYW5zaXRpb246NTBtcyBsaW5lYXIgb3BhY2l0eTtwb3NpdGlvbjphYnNvbHV0ZTtwb2ludGVyLWV2ZW50czpub25lfS5hY29yZC0tdG9vbHRpcC1sYXllci52aXNpYmxle29wYWNpdHk6MTtwb2ludGVyLWV2ZW50czphbGx9LmFjb3JkLS10b29sdGlwLnZlcnRpY2Fse3RyYW5zZm9ybTp0cmFuc2xhdGVYKC01MCUpfS5hY29yZC0tdG9vbHRpcC5ob3Jpem9udGFse3RyYW5zZm9ybTp0cmFuc2xhdGVZKC01MCUpfS5hY29yZC0tdG9hc3RzLWNvbnRhaW5lcntkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2p1c3RpZnktY29udGVudDpmbGV4LWVuZDtmbGV4LWRpcmVjdGlvbjpjb2x1bW47d2lkdGg6MTAwdnc7aGVpZ2h0OmNhbGMoMTAwdmggLSB2YXIoLS10b3Atb2Zmc2V0KSk7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7bGVmdDowO3BvaW50ZXItZXZlbnRzOm5vbmU7cGFkZGluZy1ib3R0b206MzJweH0uYWNvcmQtLXRvYXN0cy1jb250YWluZXIgLmFjb3JkLS10b2FzdHt0cmFuc2l0aW9uOnRyYW5zZm9ybSAyNTBtcyBlYXNlLWluLW91dCxvcGFjaXR5IDI1MG1zIGVhc2UtaW4tb3V0O2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7cG9pbnRlci1ldmVudHM6bm9uZTtib3JkZXItcmFkaXVzOjRweDtwYWRkaW5nOjhweDtib3gtc2hhZG93OjBweCAycHggOHB4IHJnYmEoMCwwLDAsLjI1KTtvcGFjaXR5OjE7Z2FwOjhweDtmb250LXNpemU6MTRweDttYXJnaW46NHB4fS5hY29yZC0tdG9hc3RzLWNvbnRhaW5lciAuYWNvcmQtLXRvYXN0IHN2Z3t3aWR0aDoxNnB4O2hlaWdodDoxNnB4fS5hY29yZC0tdG9hc3RzLWNvbnRhaW5lciAuYWNvcmQtLXRvYXN0LmNsaWNrYWJsZXtjdXJzb3I6cG9pbnRlcjtwb2ludGVyLWV2ZW50czphbGx9LmFjb3JkLS10b2FzdHMtY29udGFpbmVyIC5hY29yZC0tdG9hc3QuY2xvc2luZ3tvcGFjaXR5OjA7dHJhbnNmb3JtOnRyYW5zbGF0ZSgwLCAtNTBweCl9LmFjb3JkLS10b2FzdHMtY29udGFpbmVyIC5hY29yZC0tdG9hc3QuaGlkZGVue29wYWNpdHk6MDt0cmFuc2Zvcm06dHJhbnNsYXRlKDAsIDUwcHgpfS5hY29yZC0tdG9hc3RzLWNvbnRhaW5lciAuYWNvcmQtLXRvYXN0LnN0eWxlLWluZm97YmFja2dyb3VuZC1jb2xvcjojNGE4ZmUxO2NvbG9yOiNmNWY1ZjV9LmFjb3JkLS10b2FzdHMtY29udGFpbmVyIC5hY29yZC0tdG9hc3Quc3R5bGUtd2FybmluZ3tiYWNrZ3JvdW5kLWNvbG9yOiNmYWE4MWE7Y29sb3I6IzAwMH0uYWNvcmQtLXRvYXN0cy1jb250YWluZXIgLmFjb3JkLS10b2FzdC5zdHlsZS1lcnJvcntiYWNrZ3JvdW5kLWNvbG9yOiNlZDQyNDU7Y29sb3I6IzAwMH0uYWNvcmQtLXRvYXN0cy1jb250YWluZXIgLmFjb3JkLS10b2FzdC5zdHlsZS1zdWNjZXNze2JhY2tncm91bmQtY29sb3I6IzNiYTU1ZDtjb2xvcjojZjVmNWY1fS5hY29yZC0tdG9hc3RzLWNvbnRhaW5lciAuYWNvcmQtLXRvYXN0LnN0eWxlLWRlZmF1bHR7YmFja2dyb3VuZC1jb2xvcjojZjVmNWY1O2NvbG9yOiMwMDB9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXJ7d2lkdGg6MTAwdnc7aGVpZ2h0OmNhbGMoMTAwdmggLSB2YXIoLS10b3Atb2Zmc2V0KSk7ZGlzcGxheTpmbGV4O3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6MDtwb2ludGVyLWV2ZW50czpub25lfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyIC5hY29yZC0tbm90aWZpY2F0aW9ue2Rpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpjb2x1bW47cG9pbnRlci1ldmVudHM6YWxsO3RyYW5zaXRpb246dHJhbnNmb3JtIDI1MG1zIGVhc2UtaW4tb3V0LG9wYWNpdHkgMjUwbXMgZWFzZS1pbi1vdXQ7bWFyZ2luOjRweDtiYWNrZHJvcC1maWx0ZXI6Ymx1cigxNnB4KSBicmlnaHRuZXNzKDAuNzUpOy13ZWJraXQtYXBwLXJlZ2lvbjpuby1kcmFnOy0tYW5pbWF0aW9uLXNpemU6IDUwcHh9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24uaGlkZGVuLC5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyIC5hY29yZC0tbm90aWZpY2F0aW9uLmNsb3Npbmd7b3BhY2l0eTowfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyIC5hY29yZC0tbm90aWZpY2F0aW9uPi5jb250YWluZXJ7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2VlbjtwYWRkaW5nOjhweDtjb2xvcjojZmZmO21pbi13aWR0aDoyNTBweH0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllciAuYWNvcmQtLW5vdGlmaWNhdGlvbj4uY29udGFpbmVyPi5jbG9zZXt3aWR0aDoyNHB4O2hlaWdodDoyNHB4O2NvbG9yOiNmZmY7b3BhY2l0eTouNTtjdXJzb3I6cG9pbnRlcjttYXJnaW4tbGVmdDo4cHg7ei1pbmRleDo5OTk5OTk5OTl9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24+LmNvbnRhaW5lcj4uY2xvc2UuaGlkZGVue2Rpc3BsYXk6bm9uZX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllciAuYWNvcmQtLW5vdGlmaWNhdGlvbj4ucHJvZ3Jlc3MtY29udGFpbmVye3dpZHRoOjEwMCU7aGVpZ2h0OjVweH0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllciAuYWNvcmQtLW5vdGlmaWNhdGlvbj4ucHJvZ3Jlc3MtY29udGFpbmVyPi5wcm9ncmVzc3t3aWR0aDowJTtoZWlnaHQ6NXB4O3RyYW5zaXRpb246d2lkdGggdmFyKC0tZHVyYXRpb24pIGxpbmVhcjtiYWNrZ3JvdW5kLWNvbG9yOnZhcigtLWJhci1jb2xvcil9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24+LnByb2dyZXNzLWNvbnRhaW5lcj4ucHJvZ3Jlc3MucHJvZ3Jlc3Npbmd7d2lkdGg6MTAwJX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllciAuYWNvcmQtLW5vdGlmaWNhdGlvbi5zdHlsZS1pbmZvey0tYmFyLWNvbG9yOiAjNGE4ZmUxfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyIC5hY29yZC0tbm90aWZpY2F0aW9uLnN0eWxlLXdhcm5pbmd7LS1iYXItY29sb3I6ICNmYWE4MWF9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24uc3R5bGUtZXJyb3J7LS1iYXItY29sb3I6ICNlZDQyNDV9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24uc3R5bGUtc3VjY2Vzc3stLWJhci1jb2xvcjogIzNiYTU1ZH0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllciAuYWNvcmQtLW5vdGlmaWNhdGlvbi5zdHlsZS1kZWZhdWx0ey0tYmFyLWNvbG9yOiB3aGl0ZXNtb2tlfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLnRvcC1yaWdodHtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1lbmQ7YWxpZ24taXRlbXM6ZmxleC1zdGFydH0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci50b3AtcmlnaHQgLmFjb3JkLS1ub3RpZmljYXRpb24uaGlkZGVue3RyYW5zZm9ybTp0cmFuc2xhdGUoMCwgY2FsYyh2YXIoLS1hbmltYXRpb24tc2l6ZSkgKiAtMSkpfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLnRvcC1yaWdodCAuYWNvcmQtLW5vdGlmaWNhdGlvbi5jbG9zaW5ne3RyYW5zZm9ybTp0cmFuc2xhdGUoMCwgdmFyKC0tYW5pbWF0aW9uLXNpemUpKX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci50b3AtbGVmdHtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1zdGFydDthbGlnbi1pdGVtczpmbGV4LXN0YXJ0fS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLnRvcC1sZWZ0IC5hY29yZC0tbm90aWZpY2F0aW9uLmhpZGRlbnt0cmFuc2Zvcm06dHJhbnNsYXRlKDAsIGNhbGModmFyKC0tYW5pbWF0aW9uLXNpemUpICogLTEpKX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci50b3AtbGVmdCAuYWNvcmQtLW5vdGlmaWNhdGlvbi5jbG9zaW5ne3RyYW5zZm9ybTp0cmFuc2xhdGUoMCwgdmFyKC0tYW5pbWF0aW9uLXNpemUpKX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci5ib3R0b20tcmlnaHR7anVzdGlmeS1jb250ZW50OmZsZXgtZW5kO2FsaWduLWl0ZW1zOmZsZXgtZW5kfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLmJvdHRvbS1yaWdodCAuYWNvcmQtLW5vdGlmaWNhdGlvbi5oaWRkZW57dHJhbnNmb3JtOnRyYW5zbGF0ZSgwLCB2YXIoLS1hbmltYXRpb24tc2l6ZSkpfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLmJvdHRvbS1yaWdodCAuYWNvcmQtLW5vdGlmaWNhdGlvbi5jbG9zaW5ne3RyYW5zZm9ybTp0cmFuc2xhdGUoMCwgY2FsYyh2YXIoLS1hbmltYXRpb24tc2l6ZSkgKiAtMSkpfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLmJvdHRvbS1sZWZ0e2p1c3RpZnktY29udGVudDpmbGV4LXN0YXJ0O2FsaWduLWl0ZW1zOmZsZXgtZW5kfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLmJvdHRvbS1sZWZ0IC5hY29yZC0tbm90aWZpY2F0aW9uLmhpZGRlbnt0cmFuc2Zvcm06dHJhbnNsYXRlKDAsIHZhcigtLWFuaW1hdGlvbi1zaXplKSl9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIuYm90dG9tLWxlZnQgLmFjb3JkLS1ub3RpZmljYXRpb24uY2xvc2luZ3t0cmFuc2Zvcm06dHJhbnNsYXRlKDAsIGNhbGModmFyKC0tYW5pbWF0aW9uLXNpemUpICogLTEpKX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci50b3AtY2VudGVye2p1c3RpZnktY29udGVudDpjZW50ZXI7YWxpZ24taXRlbXM6ZmxleC1zdGFydH0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci50b3AtY2VudGVyIC5hY29yZC0tbm90aWZpY2F0aW9uLmhpZGRlbnt0cmFuc2Zvcm06dHJhbnNsYXRlKDAsIGNhbGModmFyKC0tYW5pbWF0aW9uLXNpemUpICogLTEpKX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci50b3AtY2VudGVyIC5hY29yZC0tbm90aWZpY2F0aW9uLmNsb3Npbmd7dHJhbnNmb3JtOnRyYW5zbGF0ZSgwLCB2YXIoLS1hbmltYXRpb24tc2l6ZSkpfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLmJvdHRvbS1jZW50ZXJ7anVzdGlmeS1jb250ZW50OmNlbnRlcjthbGlnbi1pdGVtczpmbGV4LWVuZH0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci5ib3R0b20tY2VudGVyIC5hY29yZC0tbm90aWZpY2F0aW9uLmhpZGRlbnt0cmFuc2Zvcm06dHJhbnNsYXRlKDAsIHZhcigtLWFuaW1hdGlvbi1zaXplKSl9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIuYm90dG9tLWNlbnRlciAuYWNvcmQtLW5vdGlmaWNhdGlvbi5jbG9zaW5ne3RyYW5zZm9ybTp0cmFuc2xhdGUoMCwgY2FsYyh2YXIoLS1hbmltYXRpb24tc2l6ZSkgKiAtMSkpfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLmNlbnRlcntqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO2FsaWduLWl0ZW1zOmNlbnRlcn0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci5jZW50ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24uaGlkZGVue3RyYW5zZm9ybTpzY2FsZSgwLjUpfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLmNlbnRlciAuYWNvcmQtLW5vdGlmaWNhdGlvbi5jbG9zaW5ne3RyYW5zZm9ybTpzY2FsZSgwLjUpfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLmxlZnQtY2VudGVye2p1c3RpZnktY29udGVudDpmbGV4LXN0YXJ0O2FsaWduLWl0ZW1zOmNlbnRlcn0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci5sZWZ0LWNlbnRlciAuYWNvcmQtLW5vdGlmaWNhdGlvbi5oaWRkZW57dHJhbnNmb3JtOnRyYW5zbGF0ZShjYWxjKHZhcigtLWFuaW1hdGlvbi1zaXplKSAqIC0xKSwgMCl9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIubGVmdC1jZW50ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24uY2xvc2luZ3t0cmFuc2Zvcm06dHJhbnNsYXRlKHZhcigtLWFuaW1hdGlvbi1zaXplKSwgMCl9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIucmlnaHQtY2VudGVye2p1c3RpZnktY29udGVudDpmbGV4LWVuZDthbGlnbi1pdGVtczpjZW50ZXJ9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIucmlnaHQtY2VudGVyIC5hY29yZC0tbm90aWZpY2F0aW9uLmhpZGRlbnt0cmFuc2Zvcm06dHJhbnNsYXRlKHZhcigtLWFuaW1hdGlvbi1zaXplKSwgMCl9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIucmlnaHQtY2VudGVyIC5hY29yZC0tbm90aWZpY2F0aW9uLmNsb3Npbmd7dHJhbnNmb3JtOnRyYW5zbGF0ZShjYWxjKHZhcigtLWFuaW1hdGlvbi1zaXplKSAqIC0xKSwgMCl9YDtcbiIsICJpbXBvcnQgZG9tIGZyb20gXCIuLi9kb20vaW5kZXguanNcIjtcclxuaW1wb3J0IGV2ZW50cyBmcm9tIFwiLi4vZXZlbnRzL2luZGV4LmpzXCI7XHJcbmltcG9ydCB3ZWJwYWNrIGZyb20gXCIuLi9tb2R1bGVzL3dlYnBhY2suanNcIjtcclxuXHJcbmNvbnN0IHRvb2x0aXBDbGFzc2VzID0gd2VicGFjay5maW5kQnlQcm9wZXJ0aWVzKFwidG9vbHRpcENvbnRlbnRBbGxvd092ZXJmbG93XCIsIFwidG9vbHRpcFwiKTtcclxuXHJcbmNvbnN0IHRvb2x0aXBQb3NpdGlvbnMgPSB7XHJcbiAgdG9wOiB0b29sdGlwQ2xhc3Nlcy50b29sdGlwVG9wLFxyXG4gIGJvdHRvbTogdG9vbHRpcENsYXNzZXMudG9vbHRpcEJvdHRvbSxcclxuICBsZWZ0OiB0b29sdGlwQ2xhc3Nlcy50b29sdGlwTGVmdCxcclxuICByaWdodDogdG9vbHRpcENsYXNzZXMudG9vbHRpcFJpZ2h0LFxyXG59XHJcblxyXG5jbGFzcyBUb29sdGlwIHtcclxuICAvKipcclxuICAgKiBAcGFyYW0ge0hUTUxEaXZFbGVtZW50fSB0YXJnZXQgXHJcbiAgICogQHBhcmFtIHtzdHJpbmd8SFRNTERpdkVsZW1lbnR9IGNvbnRlbnRcclxuICAgKi9cclxuICBjb25zdHJ1Y3Rvcih0YXJnZXQsIGNvbnRlbnQsIHBvc2l0aW9uID0gXCJhdXRvXCIpIHtcclxuICAgIC8qKiBAdHlwZSB7SFRNTERpdkVsZW1lbnR9ICovXHJcbiAgICB0aGlzLmxheWVyRWxlbWVudCA9IGRvbS5wYXJzZShgXHJcbiAgICAgIDxkaXYgY2xhc3M9XCJhY29yZC0tdG9vbHRpcC1sYXllclwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCIke3Rvb2x0aXBDbGFzc2VzLnRvb2x0aXB9ICR7dG9vbHRpcENsYXNzZXMudG9vbHRpcFByaW1hcnl9IGFjb3JkLS10b29sdGlwXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiJHt0b29sdGlwQ2xhc3Nlcy50b29sdGlwUG9pbnRlcn0gYWNvcmQtLXRvb2x0aXAtcG9pbnRlclwiPjwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cIiR7dG9vbHRpcENsYXNzZXMudG9vbHRpcENvbnRlbnR9IGFjb3JkLS10b29sdGlwLWNvbnRlbnRcIj48L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICBgKTtcclxuICAgIHRoaXMudG9vbHRpcEVsZW1lbnQgPSB0aGlzLmxheWVyRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmFjb3JkLS10b29sdGlwXCIpO1xyXG4gICAgdGhpcy5jb250ZW50RWxlbWVudCA9IHRoaXMubGF5ZXJFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWNvcmQtLXRvb2x0aXAtY29udGVudFwiKTtcclxuICAgIHRoaXMuY29udGVudCA9IGNvbnRlbnQ7XHJcbiAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuICAgIHRoaXMucG9zaXRpb24gPSBwb3NpdGlvbjtcclxuXHJcbiAgICB0aGlzLnZpc2libGUgPSBmYWxzZTtcclxuICAgIHRoaXMuZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgIHRoaXMucGF1c2VkID0gZmFsc2U7XHJcblxyXG4gICAgY29uc3Qgb25Nb3VzZUVudGVyID0gKCkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5kaXNhYmxlZCB8fCB0aGlzLnBhdXNlZCkgcmV0dXJuO1xyXG4gICAgICB0aGlzLnNob3coKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBvbk1vdXNlTGVhdmUgPSAoKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLnBhdXNlZCkgcmV0dXJuO1xyXG4gICAgICB0aGlzLmhpZGUoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnRhcmdldC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCBvbk1vdXNlRW50ZXIpO1xyXG4gICAgdGhpcy50YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgb25Nb3VzZUxlYXZlKTtcclxuXHJcbiAgICBsZXQgdW5QYXRjaE9ic2VydmVyID0gZXZlbnRzLm9uKFxyXG4gICAgICBcImRvbS1tdXRhdGlvblwiLFxyXG4gICAgICAvKiogQHBhcmFtIHtNdXRhdGlvblJlY29yZH0gbXV0ICovKG11dCkgPT4ge1xyXG4gICAgICAgIGlmIChtdXQudHlwZSA9PT0gXCJhdHRyaWJ1dGVzXCIpIHtcclxuICAgICAgICAgIGlmIChtdXQudGFyZ2V0LmlzU2FtZU5vZGUodGhpcy50YXJnZXQpKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAobXV0LmF0dHJpYnV0ZU5hbWUpIHtcclxuICAgICAgICAgICAgICBjYXNlIFwiYWNvcmQtLXRvb2x0aXAtZGlzYWJsZWRcIjoge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kaXNhYmxlZCA9IHRoaXMudGFyZ2V0LmdldEF0dHJpYnV0ZShcImFjb3JkLS10b29sdGlwLWRpc2FibGVkXCIpID09PSBcInRydWVcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBjYXNlIFwiYWNvcmQtLXRvb2x0aXAtY29udGVudFwiOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQgPSB0aGlzLnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJhY29yZC0tdG9vbHRpcC1jb250ZW50XCIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGNhc2UgXCJhY29yZC0tdG9vbHRpcC1wb3NpdGlvblwiOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uID0gdGhpcy50YXJnZXQuZ2V0QXR0cmlidXRlKFwiYWNvcmQtLXRvb2x0aXAtcG9zaXRpb25cIik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIClcclxuXHJcbiAgICB0aGlzLmRlc3Ryb3kgPSAoKSA9PiB7XHJcbiAgICAgIHRoaXMudGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsIG9uTW91c2VFbnRlcik7XHJcbiAgICAgIHRoaXMudGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIG9uTW91c2VMZWF2ZSk7XHJcbiAgICAgIHRoaXMuaGlkZSgpO1xyXG4gICAgICB1blBhdGNoT2JzZXJ2ZXIoKTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBnZXQgY29udGVudCgpIHtcclxuICAgIHJldHVybiB0aGlzLmNvbnRlbnRFbGVtZW50LmZpcnN0RWxlbWVudENoaWxkO1xyXG4gIH1cclxuXHJcbiAgc2V0IGNvbnRlbnQodmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgdGhpcy5jb250ZW50RWxlbWVudC5pbm5lckhUTUwgPSB2YWx1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuY29udGVudEVsZW1lbnQuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgdGhpcy5jb250ZW50RWxlbWVudC5hcHBlbmRDaGlsZCh2YWx1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZ2V0Q29udGFpbmVyKCkge1xyXG4gICAgY29uc3QgYXBwRWxtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2NsYXNzKj1cIm5vdERldlRvb2xzLVwiXScpO1xyXG5cclxuICAgIGxldCBjb250YWluZXIgPSBhcHBFbG0ucXVlcnlTZWxlY3RvcihcIi5hY29yZC0tdG9vbHRpcC1jb250YWluZXJcIik7XHJcbiAgICBpZiAoIWNvbnRhaW5lcikge1xyXG4gICAgICBjb250YWluZXIgPSBkb20ucGFyc2UoYDxkaXYgY2xhc3M9XCJhY29yZC0tbGF5ZXItY29udGFpbmVyIGFjb3JkLS10b29sdGlwLWNvbnRhaW5lclwiPjwvZGl2PmApO1xyXG4gICAgICBhcHBFbG0uYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcclxuICAgIH1cclxuICAgIGNvbnRhaW5lci5zdHlsZS5zZXRQcm9wZXJ0eShcIi0tdG9wLW9mZnNldFwiLCBgJHthcHBFbG0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wLnRvRml4ZWQoMSl9cHhgKTtcclxuXHJcbiAgICByZXR1cm4gY29udGFpbmVyO1xyXG4gIH1cclxuXHJcbiAgc2hvdygpIHtcclxuICAgIGlmICh0aGlzLnZpc2libGUpIHJldHVybjtcclxuICAgIHRoaXMudmlzaWJsZSA9IHRydWU7XHJcblxyXG4gICAgY29uc3QgY29udGFpbmVyID0gVG9vbHRpcC5nZXRDb250YWluZXIoKTtcclxuXHJcbiAgICBpZiAodGhpcy5wb3NpdGlvbiA9PT0gXCJhdXRvXCIpIHtcclxuICAgICAgdGhpcy5jYWxjdWxhdGVQb3NpdGlvbihcclxuICAgICAgICB0aGlzLmNhblNob3dBdFRvcCA/IFwidG9wXCJcclxuICAgICAgICAgIDogdGhpcy5jYW5TaG93QXRCb3R0b20gPyBcImJvdHRvbVwiXHJcbiAgICAgICAgICAgIDogdGhpcy5jYW5TaG93QXRMZWZ0ID8gXCJsZWZ0XCJcclxuICAgICAgICAgICAgICA6IHRoaXMuY2FuU2hvd0F0UmlnaHQgPyBcInJpZ2h0XCJcclxuICAgICAgICAgICAgICAgIDogXCJ0b3BcIlxyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5jYWxjdWxhdGVQb3NpdGlvbih0aGlzLnBvc2l0aW9uKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMubGF5ZXJFbGVtZW50KTtcclxuICAgIHRoaXMubGF5ZXJFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJ2aXNpYmxlXCIpO1xyXG4gIH1cclxuXHJcbiAgY2FsY3VsYXRlUG9zaXRpb24ocG9zaXRpb24pIHtcclxuICAgIGNvbnN0IGJvdW5kaW5nUmVjdCA9IHRoaXMudGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cclxuICAgIHRoaXMubGF5ZXJFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoLi4uT2JqZWN0LnZhbHVlcyh0b29sdGlwUG9zaXRpb25zKSk7XHJcbiAgICB0aGlzLnRvb2x0aXBFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJ2ZXJ0aWNhbFwiLCBcImhvcml6b250YWxcIik7XHJcblxyXG4gICAgc3dpdGNoIChwb3NpdGlvbikge1xyXG4gICAgICBjYXNlIFwidG9wXCI6IHtcclxuICAgICAgICB0aGlzLmxheWVyRWxlbWVudC5zdHlsZS50b3AgPSBgJHtib3VuZGluZ1JlY3QudG9wIC0gdGhpcy50YXJnZXQub2Zmc2V0SGVpZ2h0IC0gMTB9cHhgO1xyXG4gICAgICAgIHRoaXMubGF5ZXJFbGVtZW50LnN0eWxlLmxlZnQgPSBgJHtib3VuZGluZ1JlY3QubGVmdH1weGA7XHJcbiAgICAgICAgdGhpcy5sYXllckVsZW1lbnQuY2xhc3NMaXN0LmFkZCh0b29sdGlwUG9zaXRpb25zLnRvcCk7XHJcbiAgICAgICAgdGhpcy50b29sdGlwRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwidmVydGljYWxcIik7XHJcbiAgICAgICAgdGhpcy5jZW50ZXJQb3NpdGlvbihcImhvcml6b250YWxcIik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSBcImJvdHRvbVwiOiB7XHJcbiAgICAgICAgdGhpcy5sYXllckVsZW1lbnQuc3R5bGUudG9wID0gYCR7Ym91bmRpbmdSZWN0LnRvcCArIHRoaXMudGFyZ2V0Lm9mZnNldEhlaWdodCArIDEwfXB4YDtcclxuICAgICAgICB0aGlzLmxheWVyRWxlbWVudC5zdHlsZS5sZWZ0ID0gYCR7Ym91bmRpbmdSZWN0LmxlZnR9cHhgO1xyXG4gICAgICAgIHRoaXMubGF5ZXJFbGVtZW50LmNsYXNzTGlzdC5hZGQodG9vbHRpcFBvc2l0aW9ucy5ib3R0b20pO1xyXG4gICAgICAgIHRoaXMudG9vbHRpcEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInZlcnRpY2FsXCIpO1xyXG4gICAgICAgIHRoaXMuY2VudGVyUG9zaXRpb24oXCJob3Jpem9udGFsXCIpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgXCJsZWZ0XCI6IHtcclxuICAgICAgICB0aGlzLmxheWVyRWxlbWVudC5zdHlsZS50b3AgPSBgJHtib3VuZGluZ1JlY3QudG9wfXB4YDtcclxuICAgICAgICB0aGlzLmxheWVyRWxlbWVudC5zdHlsZS5sZWZ0ID0gYCR7Ym91bmRpbmdSZWN0LmxlZnQgLSB0aGlzLnRhcmdldC5vZmZzZXRXaWR0aCAtIDEwfXB4YDtcclxuICAgICAgICB0aGlzLmxheWVyRWxlbWVudC5jbGFzc0xpc3QuYWRkKHRvb2x0aXBQb3NpdGlvbnMubGVmdCk7XHJcbiAgICAgICAgdGhpcy50b29sdGlwRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiaG9yaXpvbnRhbFwiKTtcclxuICAgICAgICB0aGlzLmNlbnRlclBvc2l0aW9uKFwidmVydGljYWxcIik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSBcInJpZ2h0XCI6IHtcclxuICAgICAgICB0aGlzLmxheWVyRWxlbWVudC5zdHlsZS50b3AgPSBgJHtib3VuZGluZ1JlY3QudG9wfXB4YDtcclxuICAgICAgICB0aGlzLmxheWVyRWxlbWVudC5zdHlsZS5sZWZ0ID0gYCR7Ym91bmRpbmdSZWN0LmxlZnQgKyB0aGlzLnRhcmdldC5vZmZzZXRXaWR0aCArIDEwfXB4YDtcclxuICAgICAgICB0aGlzLmxheWVyRWxlbWVudC5jbGFzc0xpc3QuYWRkKHRvb2x0aXBQb3NpdGlvbnMucmlnaHQpO1xyXG4gICAgICAgIHRoaXMudG9vbHRpcEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImhvcml6b250YWxcIik7XHJcbiAgICAgICAgdGhpcy5jZW50ZXJQb3NpdGlvbihcInZlcnRpY2FsXCIpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjZW50ZXJQb3NpdGlvbihkaXJlY3Rpb24pIHtcclxuICAgIHN3aXRjaCAoZGlyZWN0aW9uKSB7XHJcbiAgICAgIGNhc2UgXCJob3Jpem9udGFsXCI6IHtcclxuICAgICAgICBjb25zdCBjZW50ZXIgPSB0aGlzLnRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0ICsgKHRoaXMudGFyZ2V0Lm9mZnNldFdpZHRoIC8gMik7XHJcbiAgICAgICAgdGhpcy5sYXllckVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoXCJsZWZ0XCIsIGAke2NlbnRlciAtICh0aGlzLmxheWVyRWxlbWVudC5vZmZzZXRXaWR0aCAvIDIpfXB4YCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSBcInZlcnRpY2FsXCI6IHtcclxuICAgICAgICBjb25zdCBjZW50ZXIgPSB0aGlzLnRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgKyAodGhpcy50YXJnZXQub2Zmc2V0SGVpZ2h0IC8gMik7XHJcbiAgICAgICAgdGhpcy5sYXllckVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoXCJ0b3BcIiwgYCR7Y2VudGVyIC0gKHRoaXMubGF5ZXJFbGVtZW50Lm9mZnNldEhlaWdodCAvIDIpfXB4YCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGhpZGUoKSB7XHJcbiAgICBpZiAoIXRoaXMudmlzaWJsZSkgcmV0dXJuO1xyXG4gICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5sYXllckVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcInZpc2libGVcIik7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGhpcy5sYXllckVsZW1lbnQucmVtb3ZlKCk7XHJcbiAgICB9LCA1MCk7XHJcbiAgfVxyXG5cclxuICBnZXQgY2FuU2hvd0F0VG9wKCkgeyByZXR1cm4gdGhpcy50YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wIC0gdGhpcy5sYXllckVsZW1lbnQub2Zmc2V0SGVpZ2h0ID49IDA7IH1cclxuICBnZXQgY2FuU2hvd0F0Qm90dG9tKCkgeyByZXR1cm4gdGhpcy50YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgdGhpcy50YXJnZXQub2Zmc2V0SGVpZ2h0ICsgdGhpcy5sYXllckVsZW1lbnQub2Zmc2V0SGVpZ2h0IDw9IHdpbmRvdy5pbm5lckhlaWdodDsgfVxyXG4gIGdldCBjYW5TaG93QXRMZWZ0KCkgeyByZXR1cm4gdGhpcy50YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCAtIHRoaXMubGF5ZXJFbGVtZW50Lm9mZnNldFdpZHRoID49IDA7IH1cclxuICBnZXQgY2FuU2hvd0F0UmlnaHQoKSB7IHJldHVybiB0aGlzLnRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0ICsgdGhpcy50YXJnZXQub2Zmc2V0V2lkdGggKyB0aGlzLmxheWVyRWxlbWVudC5vZmZzZXRXaWR0aCA8PSB3aW5kb3cuaW5uZXJXaWR0aDsgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGUodGFyZ2V0LCBjb250ZW50LCBwb3NpdGlvbiA9IFwiYXV0b1wiKSB7XHJcbiAgcmV0dXJuIG5ldyBUb29sdGlwKHRhcmdldCwgY29udGVudCwgcG9zaXRpb24pO1xyXG59XHJcblxyXG5kb20ucGF0Y2goXHJcbiAgXCJbYWNvcmQtLXRvb2x0aXAtY29udGVudF1cIixcclxuICAoZWxtKSA9PiB7XHJcbiAgICBsZXQgdG9vbHRpcCA9IGNyZWF0ZShlbG0sIGVsbS5nZXRBdHRyaWJ1dGUoXCJhY29yZC0tdG9vbHRpcC1jb250ZW50XCIpLCBlbG0uZ2V0QXR0cmlidXRlKFwiYWNvcmQtLXRvb2x0aXAtcG9zaXRpb25cIikpO1xyXG4gICAgdG9vbHRpcC5kaXNhYmxlZCA9IGVsbS5nZXRBdHRyaWJ1dGUoXCJhY29yZC0tdG9vbHRpcC1kaXNhYmxlZFwiKSA9PT0gXCJ0cnVlXCI7XHJcblxyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgdG9vbHRpcC5kZXN0cm95KCk7XHJcbiAgICB9XHJcbiAgfSxcclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHsgY3JlYXRlIH07IiwgImltcG9ydCBkb20gZnJvbSBcIi4uL2RvbS9pbmRleC5qc1wiO1xyXG5pbXBvcnQgdXRpbHMgZnJvbSBcIi4uL3V0aWxzL2luZGV4LmpzXCI7XHJcblxyXG5jb25zdCB2YWxpZFBvc2l0aW9ucyA9IFtcclxuICBcInRvcC1yaWdodFwiLFxyXG4gIFwidG9wLWxlZnRcIixcclxuICBcImJvdHRvbS1yaWdodFwiLFxyXG4gIFwiYm90dG9tLWxlZnRcIixcclxuICBcInRvcC1jZW50ZXJcIixcclxuICBcImJvdHRvbS1jZW50ZXJcIixcclxuICBcImNlbnRlclwiLFxyXG4gIFwibGVmdC1jZW50ZXJcIixcclxuICBcInJpZ2h0LWNlbnRlclwiXHJcbl1cclxuXHJcbmZ1bmN0aW9uIGdldENvbnRhaW5lcihwb3NpdGlvbikge1xyXG4gIGlmICghdmFsaWRQb3NpdGlvbnMuaW5jbHVkZXMocG9zaXRpb24pKSB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgcG9zaXRpb24gXCIke3Bvc2l0aW9ufVwiLiBWYWxpZCBwb3NpdGlvbnMgYXJlOiAke3ZhbGlkUG9zaXRpb25zLmpvaW4oXCIsIFwiKX1gKTtcclxuICBjb25zdCBhcHBFbG0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbY2xhc3MqPVwibm90QXBwQXNpZGVQYW5lbC1cIl0nKTtcclxuXHJcbiAgbGV0IHRvcENvbnRhaW5lciA9IGFwcEVsbS5xdWVyeVNlbGVjdG9yKFwiLmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXItY29udGFpbmVyXCIpO1xyXG4gIGlmICghdG9wQ29udGFpbmVyKSB7XHJcbiAgICB0b3BDb250YWluZXIgPSBkb20ucGFyc2UoYDxkaXYgY2xhc3M9XCJhY29yZC0tbGF5ZXItY29udGFpbmVyIGFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXItY29udGFpbmVyXCI+PC9kaXY+YCk7XHJcbiAgICBhcHBFbG0uYXBwZW5kQ2hpbGQodG9wQ29udGFpbmVyKTtcclxuICB9XHJcbiAgdG9wQ29udGFpbmVyLnN0eWxlLnNldFByb3BlcnR5KFwiLS10b3Atb2Zmc2V0XCIsIGAke2FwcEVsbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AudG9GaXhlZCgxKX1weGApO1xyXG5cclxuICBsZXQgcG9zaXRpb25Db250YWluZXIgPSB0b3BDb250YWluZXIucXVlcnlTZWxlY3RvcihgLmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIuJHtwb3NpdGlvbn1gKTtcclxuICBpZiAoIXBvc2l0aW9uQ29udGFpbmVyKSB7XHJcbiAgICBwb3NpdGlvbkNvbnRhaW5lciA9IGRvbS5wYXJzZShgPGRpdiBjbGFzcz1cImFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIgJHtwb3NpdGlvbn1cIj48L2Rpdj5gKTtcclxuICAgIHRvcENvbnRhaW5lci5hcHBlbmRDaGlsZChwb3NpdGlvbkNvbnRhaW5lcik7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gcG9zaXRpb25Db250YWluZXI7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3coY29udGVudCwge1xyXG4gIHN0eWxlID0gXCJkZWZhdWx0XCIsXHJcbiAgdGltZW91dCA9IDEwMDAwLFxyXG4gIHBvc2l0aW9uID0gXCJ0b3AtcmlnaHRcIixcclxuICBjbG9zYWJsZSA9IHRydWUsXHJcbiAgb25DbGljayA9IG51bGwsXHJcbiAgb25DbG9zZSA9IG51bGxcclxufSA9IHt9KSB7XHJcbiAgY29uc3QgY29udGFpbmVyID0gZ2V0Q29udGFpbmVyKHBvc2l0aW9uKTtcclxuXHJcbiAgY29uc3Qgbm90aWZFbG0gPSBkb20ucGFyc2UoYFxyXG4gICAgPGRpdiBjbGFzcz1cImFjb3JkLS1ub3RpZmljYXRpb24gc3R5bGUtJHtzdHlsZX0gaGlkZGVuXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGVudFwiPjwvZGl2PlxyXG4gICAgICAgICAgICA8c3ZnIGNsYXNzPVwiY2xvc2UgJHshY2xvc2FibGUgPyBcImhpZGRlblwiIDogXCJcIn1cIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiPlxyXG4gICAgICAgICAgICAgICAgPHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNMTIgMTAuNTg2bDQuOTUtNC45NSAxLjQxNCAxLjQxNC00Ljk1IDQuOTUgNC45NSA0Ljk1LTEuNDE0IDEuNDE0LTQuOTUtNC45NS00Ljk1IDQuOTUtMS40MTQtMS40MTQgNC45NS00Ljk1LTQuOTUtNC45NUw3LjA1IDUuNjM2elwiLz5cclxuICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInByb2dyZXNzLWNvbnRhaW5lclwiIHN0eWxlPVwiLS1kdXJhdGlvbjogJHt0aW1lb3V0fW1zO1wiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZ3Jlc3NcIj48L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIGApO1xyXG5cclxuICBub3RpZkVsbS5xdWVyeVNlbGVjdG9yKFwiLmNvbnRlbnRcIikuaW5uZXJIVE1MID0gY29udGVudDtcclxuXHJcbiAgbGV0IGNsb3NlZCA9IGZhbHNlO1xyXG4gIGZ1bmN0aW9uIGNsb3NlKGNsb3NlVHlwZSkge1xyXG4gICAgaWYgKGNsb3NlZCkgcmV0dXJuO1xyXG4gICAgY2xvc2VkID0gdHJ1ZTtcclxuXHJcbiAgICBub3RpZkVsbS5jbGFzc0xpc3QuYWRkKFwiY2xvc2luZ1wiKTtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBub3RpZkVsbS5yZW1vdmUoKTtcclxuXHJcbiAgICAgIHV0aWxzLmlmRXhpc3RzKFxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLWNvbnRhaW5lcmApLFxyXG4gICAgICAgIC8qKiBAcGFyYW0ge0hUTUxEaXZFbGVtZW50fSBlbG0gKi8oZWxtKSA9PiB7XHJcbiAgICAgICAgICBpZiAoIShbLi4uZWxtLmNoaWxkTm9kZXMudmFsdWVzKCldLnJlZHVjZSgocHJldiwgY3VycikgPT4gcHJldiArIGN1cnIuY2hpbGRFbGVtZW50Q291bnQsIDApKSkgZWxtLnJlbW92ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgKTtcclxuICAgIH0sIDI3NSk7XHJcbiAgICBvbkNsb3NlPy4oY2xvc2VUeXBlKTtcclxuICB9XHJcblxyXG4gIGlmICh0eXBlb2Ygb25DbGljayA9PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgIG5vdGlmRWxtLmNsYXNzTGlzdC5hZGQoXCJjbGlja2FibGVcIik7XHJcbiAgICBub3RpZkVsbS5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgICBvbkNsaWNrKGNsb3NlKTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICB1dGlscy5pZkV4aXN0cyhub3RpZkVsbS5xdWVyeVNlbGVjdG9yKFwiLmNsb3NlXCIpLCAoZWxtKSA9PiB7XHJcbiAgICBlbG0ub25jbGljayA9ICgpID0+IHtcclxuICAgICAgY2xvc2UoXCJ1c2VyXCIpO1xyXG4gICAgfTtcclxuICB9KTtcclxuXHJcbiAgY29udGFpbmVyLnByZXBlbmQobm90aWZFbG0pO1xyXG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XHJcbiAgICBub3RpZkVsbS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xyXG4gICAgbm90aWZFbG0ucXVlcnlTZWxlY3RvcihcIi5wcm9ncmVzc1wiKS5jbGFzc0xpc3QuYWRkKFwicHJvZ3Jlc3NpbmdcIik7XHJcbiAgfSk7XHJcblxyXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgY2xvc2UoXCJ0aW1lb3V0XCIpO1xyXG4gIH0sIHRpbWVvdXQpO1xyXG5cclxuICByZXR1cm4gKCkgPT4ge1xyXG4gICAgY2xvc2UoXCJmb3JjZVwiKTtcclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgc2hvdzogT2JqZWN0LmFzc2lnbihzaG93LCB7XHJcbiAgICBpbmZvOiAoaHRtbCwgb2JqID0ge30pID0+IHNob3coaHRtbCwgeyAuLi5vYmosIHN0eWxlOiBcImluZm9cIiB9KSxcclxuICAgIGVycm9yOiAoaHRtbCwgb2JqID0ge30pID0+IHNob3coaHRtbCwgeyAuLi5vYmosIHN0eWxlOiBcImVycm9yXCIgfSksXHJcbiAgICB3YXJuaW5nOiAoaHRtbCwgb2JqID0ge30pID0+IHNob3coaHRtbCwgeyAuLi5vYmosIHN0eWxlOiBcIndhcm5pbmdcIiB9KSxcclxuICAgIHN1Y2Nlc3M6IChodG1sLCBvYmogPSB7fSkgPT4gc2hvdyhodG1sLCB7IC4uLm9iaiwgc3R5bGU6IFwic3VjY2Vzc1wiIH0pLFxyXG4gIH0pLFxyXG59OyIsICJpbXBvcnQgd2VicGFjayBmcm9tIFwiLi4vbW9kdWxlcy93ZWJwYWNrLmpzXCI7XHJcbmltcG9ydCBwYXRjaGVyIGZyb20gXCIuLi9wYXRjaGVyL2luZGV4LmpzXCI7XHJcbmltcG9ydCBsb2dnZXIgZnJvbSBcIi4uL3V0aWxzL2xvZ2dlci5qc1wiO1xyXG5cclxuaW1wb3J0IGNvbW1vbiBmcm9tIFwiLi4vbW9kdWxlcy9jb21tb24uanNcIjtcclxuaW1wb3J0IHsgZmluZGVyTWFwIH0gZnJvbSBcIi4uL21vZHVsZXMvcmF3L2NvbXBsZXgtZmluZGVyLmpzXCI7XHJcblxyXG5jb25zdCB7IFJlYWN0IH0gPSBjb21tb247XHJcblxyXG5sZXQgaXNSZWFkeSA9IGZhbHNlO1xyXG5cclxubGV0IENvbXBvbmVudHMgPSBudWxsO1xyXG5cclxubGV0IEFjdGlvbnMgPSBudWxsO1xyXG5cclxuKGFzeW5jICgpID0+IHtcclxuICBBY3Rpb25zID0gYXdhaXQgKGFzeW5jICgpID0+IHtcclxuICAgIGxldCBvZ01vZHVsZTtcclxuICAgIHdoaWxlICh0cnVlKSB7XHJcbiAgICAgIG9nTW9kdWxlID0gd2VicGFjay5maWx0ZXIobSA9PiBPYmplY3QudmFsdWVzKG0pLnNvbWUodiA9PiB0eXBlb2YgdiA9PT0gXCJmdW5jdGlvblwiICYmIHYudG9TdHJpbmcoKS5pbmNsdWRlcyhcIkNPTlRFWFRfTUVOVV9DTE9TRVwiKSkpLmZpbmQobSA9PiBtLmV4cG9ydHMgIT09IHdpbmRvdyk/LmV4cG9ydHM7XHJcbiAgICAgIGlmIChvZ01vZHVsZSkgYnJlYWs7XHJcbiAgICAgIGF3YWl0IG5ldyBQcm9taXNlKHIgPT4gc2V0VGltZW91dChyLCAxMDApKTtcclxuICAgIH1cclxuICAgIGNvbnN0IG91dCA9IGZpbmRlck1hcChvZ01vZHVsZSwge1xyXG4gICAgICBjbG9zZTogW1wiQ09OVEVYVF9NRU5VX0NMT1NFXCJdLFxyXG4gICAgICBvcGVuOiBbXCJyZW5kZXJMYXp5XCJdXHJcbiAgICB9KTtcclxuXHJcbiAgICBpc1JlYWR5ID0gISFvdXQuY2xvc2UgJiYgISFvdXQub3BlbjtcclxuICAgIHJldHVybiBvdXQ7XHJcbiAgfSkoKTtcclxuXHJcbiAgQ29tcG9uZW50cyA9IGF3YWl0IChhc3luYyAoKSA9PiB7XHJcbiAgICBjb25zdCBvdXQgPSB7fTtcclxuICAgIGNvbnN0IGNvbXBvbmVudE1hcCA9IHtcclxuICAgICAgc2VwYXJhdG9yOiBcIlNlcGFyYXRvclwiLFxyXG4gICAgICBjaGVja2JveDogXCJDaGVja2JveEl0ZW1cIixcclxuICAgICAgcmFkaW86IFwiUmFkaW9JdGVtXCIsXHJcbiAgICAgIGNvbnRyb2w6IFwiQ29udHJvbEl0ZW1cIixcclxuICAgICAgZ3JvdXBzdGFydDogXCJHcm91cFwiLFxyXG4gICAgICBjdXN0b21pdGVtOiBcIkl0ZW1cIlxyXG4gICAgfTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBsZXQgbW9kdWxlSWQ7XHJcbiAgICAgIHdoaWxlICh0cnVlKSB7XHJcbiAgICAgICAgbW9kdWxlSWQgPSBPYmplY3QuZW50cmllcyh3ZWJwYWNrLnJlcXVpcmUubSkuZmluZCgoWywgbV0pID0+IG0/LnRvU3RyaW5nKCkuaW5jbHVkZXMoXCJtZW51aXRlbWNoZWNrYm94XCIpKVswXVxyXG4gICAgICAgIGlmIChtb2R1bGVJZCkgYnJlYWs7XHJcbiAgICAgICAgYXdhaXQgbmV3IFByb21pc2UociA9PiBzZXRUaW1lb3V0KHIsIDEwMCkpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBjb250ZXh0TWVudU1vZHVsZSA9IHdlYnBhY2suZmluZCgoXywgaWR4KSA9PiBpZHggPT0gbW9kdWxlSWQpLmV4cG9ydHM7XHJcblxyXG4gICAgICBjb25zdCBtb2R1bGVTdHJpbmcgPSB3ZWJwYWNrLnJlcXVpcmUubVttb2R1bGVJZF0udG9TdHJpbmcoKTtcclxuICAgICAgY29uc3QgcmF3TWF0Y2hlcyA9IG1vZHVsZVN0cmluZy5tYXRjaEFsbCgvaWZcXChcXHcrXFwudHlwZT09PSg/OlxcdytcXC4pPyhcXHcrKVxcKS4rP3R5cGU6XCIoLis/KVwiL2dzKTtcclxuXHJcbiAgICAgIG91dC5NZW51ID0gT2JqZWN0LnZhbHVlcyhjb250ZXh0TWVudU1vZHVsZSkuZmluZCh2ID0+IHYudG9TdHJpbmcoKS5pbmNsdWRlcyhcIi5pc1VzaW5nS2V5Ym9hcmROYXZpZ2F0aW9uXCIpKTtcclxuXHJcbiAgICAgIFsuLi5yYXdNYXRjaGVzXS5mb3JFYWNoKChbLCBmdW5jdGlvbk5hbWUsIHR5cGVdKSA9PiB7XHJcbiAgICAgICAgbGV0IG1vZHVsZUtleSA9IG1vZHVsZVN0cmluZy5tYXRjaChuZXcgUmVnRXhwKG5ldyBSZWdFeHAoYChcXFxcdyspOlxcXFwoXFxcXClcXFxcPVxcXFw+JHtmdW5jdGlvbk5hbWV9YCkpKT8uWzFdXHJcbiAgICAgICAgb3V0W2NvbXBvbmVudE1hcFt0eXBlXV0gPSBjb250ZXh0TWVudU1vZHVsZVttb2R1bGVLZXldO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlzUmVhZHkgPSBPYmplY3Qua2V5cyhvdXQpLmxlbmd0aCA+IDE7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgaXNSZWFkeSA9IGZhbHNlO1xyXG4gICAgICBsb2dnZXIuZXJyb3IoXCJGYWlsZWQgdG8gbG9hZCBjb250ZXh0IG1lbnUgY29tcG9uZW50c1wiLCBlcnIpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBvdXQ7XHJcbiAgfSkoKTtcclxuXHJcbiAgTWVudVBhdGNoZXIuaW5pdGlhbGl6ZSgpO1xyXG59KSgpO1xyXG5cclxuXHJcbmNsYXNzIE1lbnVQYXRjaGVyIHtcclxuICBzdGF0aWMgTUFYX1BBVENIX0lURVJBVElPTlMgPSAxNjtcclxuICBzdGF0aWMgcGF0Y2hlcyA9IG5ldyBNYXAoKTtcclxuICBzdGF0aWMgc3ViUGF0Y2hlcyA9IG5ldyBXZWFrTWFwKCk7XHJcblxyXG4gIHN0YXRpYyBpbml0aWFsaXplKCkge1xyXG4gICAgaWYgKCFpc1JlYWR5KSByZXR1cm4gbG9nZ2VyLndhcm4oXCJVbmFibGUgdG8gbG9hZCBjb250ZXh0IG1lbnUuXCIpO1xyXG5cclxuICAgIGNvbnN0IG1vZHVsZVRvUGF0Y2ggPSB3ZWJwYWNrLmZpbHRlcihtID0+IE9iamVjdC52YWx1ZXMobSkuc29tZSh2ID0+IHR5cGVvZiB2ID09PSBcImZ1bmN0aW9uXCIgJiYgdi50b1N0cmluZygpLmluY2x1ZGVzKFwiQ09OVEVYVF9NRU5VX0NMT1NFXCIpKSkuZmluZChtID0+IG0uZXhwb3J0cyAhPT0gd2luZG93KS5leHBvcnRzO1xyXG4gICAgY29uc3Qga2V5VG9QYXRjaCA9IE9iamVjdC5rZXlzKG1vZHVsZVRvUGF0Y2gpLmZpbmQoayA9PiBtb2R1bGVUb1BhdGNoW2tdPy5sZW5ndGggPT09IDMpO1xyXG5cclxuICAgIHBhdGNoZXIuYmVmb3JlKFxyXG4gICAgICBrZXlUb1BhdGNoLFxyXG4gICAgICBtb2R1bGVUb1BhdGNoLFxyXG4gICAgICBmdW5jdGlvbiAobWV0aG9kQXJncykge1xyXG4gICAgICAgIGNvbnN0IHByb21pc2UgPSBtZXRob2RBcmdzWzFdO1xyXG4gICAgICAgIG1ldGhvZEFyZ3NbMV0gPSBhc3luYyBmdW5jdGlvbiAoLi4uYXJncykge1xyXG4gICAgICAgICAgY29uc3QgcmVuZGVyID0gYXdhaXQgcHJvbWlzZS5jYWxsKHRoaXMsIC4uLmFyZ3MpO1xyXG5cclxuICAgICAgICAgIHJldHVybiAocHJvcHMpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcmVzID0gcmVuZGVyKHByb3BzKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChyZXM/LnByb3BzLm5hdklkKSB7XHJcbiAgICAgICAgICAgICAgTWVudVBhdGNoZXIuZXhlY3V0ZVBhdGNoZXMocmVzLnByb3BzLm5hdklkLCByZXMsIHByb3BzKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgcmVzPy50eXBlID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICAgICAgICBNZW51UGF0Y2hlci5wYXRjaFJlY3Vyc2l2ZShyZXMsIFwidHlwZVwiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlcztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBtZXRob2RBcmdzO1xyXG4gICAgICB9XHJcbiAgICApXHJcbiAgfVxyXG5cclxuICBzdGF0aWMgcGF0Y2hSZWN1cnNpdmUodGFyZ2V0LCBtZXRob2QsIGl0ZXJhdGlvbiA9IDApIHtcclxuICAgIGlmIChpdGVyYXRpb24gPj0gdGhpcy5NQVhfUEFUQ0hfSVRFUkFUSU9OUykgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IHByb3h5RnVuY3Rpb24gPSB0aGlzLnN1YlBhdGNoZXMuZ2V0KHRhcmdldFttZXRob2RdKSA/PyAoKCkgPT4ge1xyXG4gICAgICBjb25zdCBvcmlnaW5hbEZ1bmN0aW9uID0gdGFyZ2V0W21ldGhvZF07XHJcbiAgICAgIGNvbnN0IGRlcHRoID0gKytpdGVyYXRpb247XHJcbiAgICAgIGZ1bmN0aW9uIHBhdGNoKC4uLmFyZ3MpIHtcclxuICAgICAgICBjb25zdCByZXMgPSBvcmlnaW5hbEZ1bmN0aW9uLmNhbGwodGhpcywgLi4uYXJncyk7XHJcblxyXG4gICAgICAgIGlmICghcmVzKSByZXR1cm4gcmVzO1xyXG5cclxuICAgICAgICBjb25zdCBuYXZJZCA9IHJlcy5wcm9wcz8ubmF2SWQgPz8gcmVzLnByb3BzPy5jaGlsZHJlbj8ucHJvcHM/Lm5hdklkO1xyXG4gICAgICAgIGlmIChuYXZJZCkge1xyXG4gICAgICAgICAgTWVudVBhdGNoZXIuZXhlY3V0ZVBhdGNoZXMobmF2SWQsIHJlcywgYXJnc1swXSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnN0IGxheWVyID0gcmVzLnByb3BzLmNoaWxkcmVuID8gcmVzLnByb3BzLmNoaWxkcmVuIDogcmVzO1xyXG5cclxuICAgICAgICAgIGlmICh0eXBlb2YgbGF5ZXI/LnR5cGUgPT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgICAgIE1lbnVQYXRjaGVyLnBhdGNoUmVjdXJzaXZlKGxheWVyLCBcInR5cGVcIiwgZGVwdGgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJlcztcclxuICAgICAgfVxyXG5cclxuICAgICAgcGF0Y2guX19vcmlnaW5hbF9fID0gb3JpZ2luYWxGdW5jdGlvbjtcclxuICAgICAgT2JqZWN0LmFzc2lnbihwYXRjaCwgb3JpZ2luYWxGdW5jdGlvbik7XHJcbiAgICAgIHRoaXMuc3ViUGF0Y2hlcy5zZXQob3JpZ2luYWxGdW5jdGlvbiwgcGF0Y2gpO1xyXG5cclxuICAgICAgcmV0dXJuIHBhdGNoO1xyXG4gICAgfSkoKTtcclxuXHJcbiAgICB0YXJnZXRbbWV0aG9kXSA9IHByb3h5RnVuY3Rpb247XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZXhlY3V0ZVBhdGNoZXMoaWQsIHJlcywgcHJvcHMpIHtcclxuICAgIGlmICghdGhpcy5wYXRjaGVzLmhhcyhpZCkpIHJldHVybjtcclxuXHJcbiAgICB0aGlzLnBhdGNoZXMuZ2V0KGlkKS5mb3JFYWNoKHBhdGNoID0+IHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBwYXRjaChyZXMsIHByb3BzKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgbG9nZ2VyLmVycm9yKFwiRmFpbGVkIHRvIHBhdGNoIGNvbnRleHQgbWVudVwiLCBwYXRjaCwgZXJyKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcblxyXG5cclxuLy8gQ29waWVkIGZyb20gYmQncyBzb3VyY2VcclxuZnVuY3Rpb24gYnVpbGRJdGVtKHByb3BzKSB7XHJcbiAgY29uc3QgeyB0eXBlIH0gPSBwcm9wcztcclxuICBpZiAodHlwZSA9PT0gXCJzZXBhcmF0b3JcIikgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQ29tcG9uZW50cy5TZXBhcmF0b3IpO1xyXG5cclxuICBsZXQgY29tcG9uZW50ID0gQ29tcG9uZW50cy5JdGVtO1xyXG4gIGlmICh0eXBlID09PSBcInN1Ym1lbnVcIikge1xyXG4gICAgaWYgKCFwcm9wcy5jaGlsZHJlbikgcHJvcHMuY2hpbGRyZW4gPSBidWlsZE1lbnVDaGlsZHJlbihwcm9wcy5yZW5kZXIgfHwgcHJvcHMuaXRlbXMpO1xyXG4gIH0gZWxzZSBpZiAodHlwZSA9PT0gXCJ0b2dnbGVcIiB8fCB0eXBlID09PSBcInJhZGlvXCIpIHtcclxuICAgIGNvbXBvbmVudCA9IHR5cGUgPT09IFwidG9nZ2xlXCIgPyBDb21wb25lbnRzLkNoZWNrYm94SXRlbSA6IENvbXBvbmVudHMuUmFkaW9JdGVtO1xyXG4gICAgaWYgKHByb3BzLmFjdGl2ZSkgcHJvcHMuY2hlY2tlZCA9IHByb3BzLmFjdGl2ZTtcclxuICB9IGVsc2UgaWYgKHR5cGUgPT09IFwiY29udHJvbFwiKSB7XHJcbiAgICBjb21wb25lbnQgPSBDb21wb25lbnRzLkNvbnRyb2xJdGVtO1xyXG4gIH1cclxuICBpZiAoIXByb3BzLmlkKSBwcm9wcy5pZCA9IGAke3Byb3BzLmxhYmVsLnJlcGxhY2UoL15bXmEtel0rfFteXFx3LV0rL2dpLCBcIi1cIil9YDtcclxuICBpZiAocHJvcHMuZGFuZ2VyKSBwcm9wcy5jb2xvciA9IFwiZGFuZ2VyXCI7XHJcbiAgcHJvcHMuZXh0ZW5kZWQgPSB0cnVlO1xyXG5cclxuICBpZiAodHlwZSA9PT0gXCJ0b2dnbGVcIikge1xyXG4gICAgY29uc3QgW2FjdGl2ZSwgZG9Ub2dnbGVdID0gUmVhY3QudXNlU3RhdGUocHJvcHMuY2hlY2tlZCB8fCBmYWxzZSk7XHJcbiAgICBjb25zdCBvcmlnaW5hbEFjdGlvbiA9IHByb3BzLmFjdGlvbjtcclxuICAgIHByb3BzLmNoZWNrZWQgPSBhY3RpdmU7XHJcbiAgICBwcm9wcy5hY3Rpb24gPSBmdW5jdGlvbiAoZXYpIHtcclxuICAgICAgb3JpZ2luYWxBY3Rpb24oZXYpO1xyXG4gICAgICBkb1RvZ2dsZSghYWN0aXZlKTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChjb21wb25lbnQsIHByb3BzKTtcclxufVxyXG5cclxuLy8gQ29waWVkIGZyb20gYmQncyBzb3VyY2VcclxuZnVuY3Rpb24gYnVpbGRNZW51Q2hpbGRyZW4oc2V0dXApIHtcclxuICBjb25zdCBtYXBwZXIgPSBzID0+IHtcclxuICAgIGlmIChzLnR5cGUgPT09IFwiZ3JvdXBcIikgcmV0dXJuIGJ1aWxkR3JvdXAocyk7XHJcbiAgICByZXR1cm4gYnVpbGRJdGVtKHMpO1xyXG4gIH07XHJcbiAgY29uc3QgYnVpbGRHcm91cCA9IGZ1bmN0aW9uIChncm91cCkge1xyXG4gICAgY29uc3QgaXRlbXMgPSBncm91cC5pdGVtcy5tYXAobWFwcGVyKS5maWx0ZXIoaSA9PiBpKTtcclxuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KENvbXBvbmVudHMuR3JvdXAsIG51bGwsIGl0ZW1zKTtcclxuICB9O1xyXG4gIHJldHVybiBzZXR1cC5tYXAobWFwcGVyKS5maWx0ZXIoaSA9PiBpKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIF9fY2FjaGVfXzoge1xyXG4gICAgcGF0Y2hlczogTWVudVBhdGNoZXIucGF0Y2hlcyxcclxuICAgIHN1YlBhdGNoZXM6IE1lbnVQYXRjaGVyLnN1YlBhdGNoZXNcclxuICB9LFxyXG4gIHBhdGNoKG5hdklkLCBjYikge1xyXG4gICAgaWYgKCFNZW51UGF0Y2hlci5wYXRjaGVzLmhhcyhuYXZJZCkpIE1lbnVQYXRjaGVyLnBhdGNoZXMuc2V0KG5hdklkLCBuZXcgU2V0KCkpO1xyXG4gICAgTWVudVBhdGNoZXIucGF0Y2hlcy5nZXQobmF2SWQpLmFkZChjYik7XHJcblxyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgTWVudVBhdGNoZXIucGF0Y2hlcy5nZXQobmF2SWQpLmRlbGV0ZShjYik7XHJcbiAgICB9XHJcbiAgfSxcclxuICBvcGVuKGV2ZW50LCBjb21wb25lbnQsIGNvbmZpZykge1xyXG4gICAgcmV0dXJuIEFjdGlvbnMub3BlbihldmVudCwgKGUpID0+IFJlYWN0LmNyZWF0ZUVsZW1lbnQoY29tcG9uZW50LCBPYmplY3QuYXNzaWduKHt9LCBlLCB7IG9uQ2xvc2U6IEFjdGlvbnMuY2xvc2UgfSkpLCBjb25maWcpO1xyXG4gIH0sXHJcbiAgY2xvc2UoKSB7XHJcbiAgICByZXR1cm4gQWN0aW9ucy5jbG9zZSgpO1xyXG4gIH0sXHJcbiAgYnVpbGQ6IHtcclxuICAgIGl0ZW0oc2V0dXApIHtcclxuICAgICAgcmV0dXJuIGJ1aWxkTWVudUNoaWxkcmVuKHNldHVwKTtcclxuICAgIH0sXHJcbiAgICBtZW51KHNldHVwKSB7XHJcbiAgICAgIHJldHVybiAocHJvcHMpID0+IFJlYWN0LmNyZWF0ZUVsZW1lbnQoQ29tcG9uZW50cy5NZW51LCBwcm9wcywgYnVpbGRNZW51Q2hpbGRyZW4oc2V0dXApKTtcclxuICAgIH1cclxuICB9XHJcbn07IiwgImltcG9ydCBjb21tb24gZnJvbSBcIi4uLy4uL2FwaS9tb2R1bGVzL2NvbW1vblwiO1xyXG5pbXBvcnQgbG9nZ2VyIGZyb20gXCIuLi8uLi9hcGkvdXRpbHMvbG9nZ2VyLmpzXCI7XHJcbmNvbnN0IHsgUmVhY3QgfSA9IGNvbW1vbjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVycm9yQm91bmRhcnkgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcbiAgICB0aGlzLnN0YXRlID0geyBlcnJvcjogbnVsbCB9O1xyXG4gIH1cclxuXHJcbiAgY29tcG9uZW50RGlkQ2F0Y2goZXJyb3IpIHtcclxuICAgIHRoaXMuc2V0U3RhdGUoeyBlcnJvciB9KTtcclxuICAgIGxvZ2dlci5lcnJvcihlcnJvcik7XHJcbiAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMub25FcnJvciA9PT0gXCJmdW5jdGlvblwiKSB0aGlzLnByb3BzLm9uRXJyb3IoZXJyb3IpO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgaWYgKHRoaXMuc3RhdGUuZXJyb3IpIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImFjb3JkLS1yZWFjdC1lcnJvclwiPlxyXG4gICAgICA8cD5VbmV4cGVjdGVkIFJlYWN0IEVycm9yIEhhcHBlbmVkLjwvcD5cclxuICAgICAgPHA+e2Ake3RoaXMuc3RhdGUuZXJyb3J9YH08L3A+XHJcbiAgICA8L2Rpdj47XHJcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5jaGlsZHJlbjtcclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IG9yaWdpbmFsUmVuZGVyID0gRXJyb3JCb3VuZGFyeS5wcm90b3R5cGUucmVuZGVyO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoRXJyb3JCb3VuZGFyeS5wcm90b3R5cGUsIFwicmVuZGVyXCIsIHtcclxuICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICBjb25maWd1cmFibGU6IGZhbHNlLFxyXG4gIHNldDogZnVuY3Rpb24gKCkgeyB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3Qgc2V0IHJlbmRlciBtZXRob2Qgb2YgRXJyb3JCb3VuZGFyeVwiKTsgfSxcclxuICBnZXQ6ICgpID0+IG9yaWdpbmFsUmVuZGVyXHJcbn0pOyIsICJpbXBvcnQgRXJyb3JCb3VuZGFyeSBmcm9tIFwiLi4vLi4vbGliL2NvbXBvbmVudHMvRXJyb3JCb3VuZGFyeS5qc3hcIjtcclxuaW1wb3J0IGNvbW1vbiBmcm9tIFwiLi4vbW9kdWxlcy9jb21tb24uanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBFcnJvckJvdW5kYXJ5LFxyXG4gIEJ1dHRvbjogY29tbW9uLmNvbXBvbmVudHMuQnV0dG9uLFxyXG4gIE1hcmtkb3duOiBjb21tb24uY29tcG9uZW50cy5NYXJrZG93bixcclxuICBUZXh0OiBjb21tb24uY29tcG9uZW50cy5UZXh0LFxyXG4gIENvbmZpcm1hdGlvbk1vZGFsOiBjb21tb24uY29tcG9uZW50cy5Db25maXJtYXRpb25Nb2RhbCxcclxuICBNb2RhbFJvb3Q6IGNvbW1vbi5tb2RhbHMuY29tcG9uZW50cy5Sb290LFxyXG4gIE1vZGFsQ2xvc2VCdXR0b246IGNvbW1vbi5tb2RhbHMuY29tcG9uZW50cy5vdGhlci5DbG9zZUJ1dHRvbixcclxuICBNb2RhbEhlYWRlcjogY29tbW9uLm1vZGFscy5jb21wb25lbnRzLm90aGVyLkhlYWRlcixcclxuICBNb2RhbENvbnRlbnQ6IGNvbW1vbi5tb2RhbHMuY29tcG9uZW50cy5vdGhlci5Db250ZW50LFxyXG4gIE1vZGFsRm9vdGVyOiBjb21tb24ubW9kYWxzLmNvbXBvbmVudHMub3RoZXIuRm9vdGVyLFxyXG4gIE1vZGFsTGlzdENvbnRlbnQ6IGNvbW1vbi5tb2RhbHMuY29tcG9uZW50cy5vdGhlci5MaXN0Q29udGVudCxcclxuICBUb29sdGlwOiBjb21tb24uY29tcG9uZW50cy5Ub29sdGlwLFxyXG59IiwgImltcG9ydCBFcnJvckJvdW5kYXJ5IGZyb20gXCIuLi8uLi9saWIvY29tcG9uZW50cy9FcnJvckJvdW5kYXJ5LmpzeFwiO1xyXG5pbXBvcnQgY29tbW9uIGZyb20gXCIuLi9tb2R1bGVzL2NvbW1vbi5qc1wiO1xyXG5pbXBvcnQgaTE4biBmcm9tIFwiLi4vaTE4bi9pbmRleC5qc1wiXHJcbmNvbnN0IHsgUmVhY3QsIEZsdXhEaXNwYXRjaGVyLCBjb21wb25lbnRzLCBtb2RhbHMsIFVzZXJTdG9yZSB9ID0gY29tbW9uO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIHNob3c6IHtcclxuICAgIGNvbmZpcm1hdGlvbih0aXRsZSwgY29udGVudCwgeyBjb25maXJtID0gbnVsbCwgY2FuY2VsID0gbnVsbCwgZGFuZ2VyID0gZmFsc2UsIGtleSA9IHVuZGVmaW5lZCwgdGltZW91dCA9IDYwMDAwICogNSB9ID0ge30pIHtcclxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGNvbnRlbnQpKSBjb250ZW50ID0gW2NvbnRlbnRdO1xyXG4gICAgICAgIGNvbnRlbnQgPSBjb250ZW50Lm1hcChpID0+IHR5cGVvZiBpID09PSBcInN0cmluZ1wiID8gUmVhY3QuY3JlYXRlRWxlbWVudChjb21wb25lbnRzLk1hcmtkb3duLCBudWxsLCBpKSA6IGkpO1xyXG4gICAgICAgIGNvbnN0IG1vZGFsS2V5ID0gbW9kYWxzLmFjdGlvbnMub3BlbigocHJvcHMpID0+IHtcclxuICAgICAgICAgIGxldCBpbnRlcmFjdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICByZXR1cm4gPEVycm9yQm91bmRhcnkgb25FcnJvcj17KCkgPT4geyByZXNvbHZlKGZhbHNlKTsgfX0+XHJcbiAgICAgICAgICAgIDxjb21wb25lbnRzLkNvbmZpcm1hdGlvbk1vZGFsXHJcbiAgICAgICAgICAgICAgaGVhZGVyPXt0aXRsZX1cclxuICAgICAgICAgICAgICBjb25maXJtQnV0dG9uQ29sb3I9e2RhbmdlciA/IGNvbXBvbmVudHMuQnV0dG9uLkNvbG9ycy5SRUQgOiBjb21wb25lbnRzLkJ1dHRvbi5Db2xvcnMuQlJBTkR9XHJcbiAgICAgICAgICAgICAgY29uZmlybVRleHQ9e2NvbmZpcm0gfHwgaTE4bi5mb3JtYXQoXCJDT05GSVJNXCIpfVxyXG4gICAgICAgICAgICAgIGNhbmNlbFRleHQ9e2NhbmNlbH1cclxuICAgICAgICAgICAgICBvbkNhbmNlbD17KCkgPT4geyByZXNvbHZlKGZhbHNlKTsgbW9kYWxzLmFjdGlvbnMuY2xvc2UobW9kYWxLZXkpOyBpbnRlcmFjdGVkID0gdHJ1ZTsgfX1cclxuICAgICAgICAgICAgICBvbkNvbmZpcm09eygpID0+IHsgcmVzb2x2ZSh0cnVlKTsgbW9kYWxzLmFjdGlvbnMuY2xvc2UobW9kYWxLZXkpOyBpbnRlcmFjdGVkID0gdHJ1ZTsgfX1cclxuICAgICAgICAgICAgICB7Li4ucHJvcHN9XHJcbiAgICAgICAgICAgICAgb25DbG9zZT17KCkgPT4geyBwcm9wcy5vbkNsb3NlKCk7IHJlc29sdmUoZmFsc2UpOyBtb2RhbHMuYWN0aW9ucy5jbG9zZShtb2RhbEtleSk7IH19XHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICA8RXJyb3JCb3VuZGFyeSBvbkVycm9yPXsoKSA9PiB7IHJlc29sdmUoZmFsc2UpOyB9fT5cclxuICAgICAgICAgICAgICAgIHtjb250ZW50fVxyXG4gICAgICAgICAgICAgIDwvRXJyb3JCb3VuZGFyeT5cclxuICAgICAgICAgICAgPC9jb21wb25lbnRzLkNvbmZpcm1hdGlvbk1vZGFsPlxyXG4gICAgICAgICAgPC9FcnJvckJvdW5kYXJ5PlxyXG4gICAgICAgIH0sIHsgbW9kYWxLZXk6IGtleSB9KTtcclxuICAgICAgICBpZiAodGltZW91dCkge1xyXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghaW50ZXJhY3RlZCkge1xyXG4gICAgICAgICAgICAgIHJlc29sdmUoZmFsc2UpO1xyXG4gICAgICAgICAgICAgIG1vZGFscy5hY3Rpb25zLmNsb3NlKG1vZGFsS2V5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSwgdGltZW91dCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICB1c2VyKHVzZXJJZCkge1xyXG4gICAgICBpZiAoIVVzZXJTdG9yZS5nZXRVc2VyKHVzZXJJZCkpIHJldHVybiBmYWxzZTtcclxuICAgICAgRmx1eERpc3BhdGNoZXIuZGlzcGF0Y2goeyB0eXBlOiBcIlVTRVJfUFJPRklMRV9NT0RBTF9PUEVOXCIsIHVzZXJJZCB9KTtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9LFxyXG4gICAgYWxlcnQodGl0bGUsIGNvbnRlbnQsIHsgY29uZmlybSA9IG51bGwsIGtleSA9IHVuZGVmaW5lZCwgdGltZW91dCA9IDYwMDAwICogNSB9ID0ge30pIHtcclxuICAgICAgcmV0dXJuIHRoaXMuY29uZmlybWF0aW9uKHRpdGxlLCBjb250ZW50LCB7IGNvbmZpcm0sIGNhbmNlbDogbnVsbCwga2V5LCB0aW1lb3V0IH0pO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgY2xvc2Uoa2V5KSB7XHJcbiAgICByZXR1cm4gbW9kYWxzLmFjdGlvbnMuY2xvc2Uoa2V5KTtcclxuICB9XHJcbn0iLCAiaW1wb3J0IGRvbSBmcm9tIFwiLi4vZG9tL2luZGV4LmpzXCI7XHJcblxyXG5mdW5jdGlvbiBnZXRDb250YWluZXIoKSB7XHJcbiAgY29uc3QgYXBwRWxtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2NsYXNzKj1cIm5vdEFwcEFzaWRlUGFuZWwtXCJdJyk7XHJcblxyXG4gIGxldCB0b3BDb250YWluZXIgPSBhcHBFbG0ucXVlcnlTZWxlY3RvcihcIi5hY29yZC0tdG9hc3RzLWNvbnRhaW5lclwiKTtcclxuICBpZiAoIXRvcENvbnRhaW5lcikge1xyXG4gICAgdG9wQ29udGFpbmVyID0gZG9tLnBhcnNlKGA8ZGl2IGNsYXNzPVwiYWNvcmQtLWxheWVyLWNvbnRhaW5lciBhY29yZC0tdG9hc3RzLWNvbnRhaW5lclwiPjwvZGl2PmApO1xyXG4gICAgYXBwRWxtLmFwcGVuZENoaWxkKHRvcENvbnRhaW5lcik7XHJcbiAgfVxyXG4gIHRvcENvbnRhaW5lci5zdHlsZS5zZXRQcm9wZXJ0eShcIi0tdG9wLW9mZnNldFwiLCBgJHthcHBFbG0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wLnRvRml4ZWQoMSl9cHhgKTtcclxuXHJcbiAgcmV0dXJuIHRvcENvbnRhaW5lcjtcclxufVxyXG5cclxuY29uc3QgaWNvbnMgPSB7XHJcbiAgaW5mbzogYDxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiPjxwYXRoIGQ9XCJNMTIgMjJDNi40NzcgMjIgMiAxNy41MjMgMiAxMlM2LjQ3NyAyIDEyIDJzMTAgNC40NzcgMTAgMTAtNC40NzcgMTAtMTAgMTB6bS0xLTExdjZoMnYtNmgtMnptMC00djJoMlY3aC0yelwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIiAvPjwvc3ZnPmAsXHJcbiAgd2FybmluZzogYDxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiPjxwYXRoIGQ9XCJNMTIgMjJDNi40NzcgMjIgMiAxNy41MjMgMiAxMlM2LjQ3NyAyIDEyIDJzMTAgNC40NzcgMTAgMTAtNC40NzcgMTAtMTAgMTB6bS0xLTd2Mmgydi0yaC0yem0wLTh2NmgyVjdoLTJ6XCIgZmlsbD1cImN1cnJlbnRDb2xvclwiIC8+PC9zdmc+YCxcclxuICBlcnJvcjogYDxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiPjxwYXRoIGQ9XCJNMTIgMjJDNi40NzcgMjIgMiAxNy41MjMgMiAxMlM2LjQ3NyAyIDEyIDJzMTAgNC40NzcgMTAgMTAtNC40NzcgMTAtMTAgMTB6bS0xLTd2Mmgydi0yaC0yem0wLTh2NmgyVjdoLTJ6XCJmaWxsPVwiY3VycmVudENvbG9yXCIgLz48L3N2Zz5gLFxyXG4gIHN1Y2Nlc3M6IGA8c3ZnIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMjRcIj48cGF0aCBkPVwiTTEyIDIyQzYuNDc3IDIyIDIgMTcuNTIzIDIgMTJTNi40NzcgMiAxMiAyczEwIDQuNDc3IDEwIDEwLTQuNDc3IDEwLTEwIDEwem0tLjk5Ny02bDcuMDctNy4wNzEtMS40MTQtMS40MTQtNS42NTYgNS42NTctMi44MjktMi44MjktMS40MTQgMS40MTRMMTEuMDAzIDE2elwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIiAvPjwvc3ZnPmBcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIHNob3coXHJcbiAgY29udGVudCxcclxuICB7XHJcbiAgICBzdHlsZSA9IFwiZGVmYXVsdFwiLFxyXG4gICAgdGltZW91dCA9IDM1MDAsXHJcbiAgICBvbkNsaWNrID0gbnVsbCxcclxuICAgIGhpZGVJY29uID0gZmFsc2VcclxuICB9ID0ge31cclxuKSB7XHJcbiAgY29uc3QgY29udGFpbmVyID0gZ2V0Q29udGFpbmVyKCk7XHJcblxyXG4gIGNvbnN0IHRvYXN0RWxtID0gZG9tLnBhcnNlKGBcclxuICAgIDxkaXYgY2xhc3M9XCJhY29yZC0tdG9hc3Qgc3R5bGUtJHtzdHlsZX0gaGlkZGVuXCI+XHJcbiAgICAgICR7aGlkZUljb24gPyBcIlwiIDogKGljb25zW3N0eWxlXSB8fCBcIlwiKX1cclxuICAgICAgPGRpdiBjbGFzcz1cImNvbnRlbnRcIj48L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIGApO1xyXG5cclxuICB0b2FzdEVsbS5xdWVyeVNlbGVjdG9yKFwiLmNvbnRlbnRcIikuaW5uZXJIVE1MID0gY29udGVudDtcclxuXHJcbiAgbGV0IGNsb3NlZCA9IGZhbHNlO1xyXG4gIGZ1bmN0aW9uIGNsb3NlKCkge1xyXG4gICAgaWYgKGNsb3NlZCkgcmV0dXJuO1xyXG4gICAgY2xvc2VkID0gdHJ1ZTtcclxuXHJcbiAgICB0b2FzdEVsbS5jbGFzc0xpc3QuYWRkKFwiY2xvc2luZ1wiKTtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICB0b2FzdEVsbS5yZW1vdmUoKTtcclxuXHJcbiAgICAgIHV0aWxzLmlmRXhpc3RzKFxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5hY29yZC0tdG9hc3RzLWNvbnRhaW5lcmApLFxyXG4gICAgICAgIC8qKiBAcGFyYW0ge0hUTUxEaXZFbGVtZW50fSBlbG0gKi8oZWxtKSA9PiB7XHJcbiAgICAgICAgICBpZiAoIWVsbS5jaGlsZEVsZW1lbnRDb3VudCkgZWxtLnJlbW92ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgKTtcclxuICAgIH0sIDI3NSk7XHJcbiAgfVxyXG5cclxuICBpZiAodHlwZW9mIG9uQ2xpY2sgPT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICB0b2FzdEVsbS5jbGFzc0xpc3QuYWRkKFwiY2xpY2thYmxlXCIpO1xyXG4gICAgdG9hc3RFbG0ub25jbGljayA9ICgpID0+IHtcclxuICAgICAgb25DbGljayhjbG9zZSk7XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKHRvYXN0RWxtKTtcclxuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xyXG4gICAgdG9hc3RFbG0uY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcclxuICB9KTtcclxuXHJcbiAgc2V0VGltZW91dChjbG9zZSwgdGltZW91dCk7XHJcblxyXG4gIHJldHVybiAoKSA9PiB7XHJcbiAgICBjbG9zZSgpO1xyXG4gIH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBzaG93OiBPYmplY3QuYXNzaWduKHNob3csIHtcclxuICAgIGluZm86IChodG1sLCBvYmogPSB7fSkgPT4gc2hvdyhodG1sLCB7IC4uLm9iaiwgc3R5bGU6IFwiaW5mb1wiIH0pLFxyXG4gICAgZXJyb3I6IChodG1sLCBvYmogPSB7fSkgPT4gc2hvdyhodG1sLCB7IC4uLm9iaiwgc3R5bGU6IFwiZXJyb3JcIiB9KSxcclxuICAgIHdhcm5pbmc6IChodG1sLCBvYmogPSB7fSkgPT4gc2hvdyhodG1sLCB7IC4uLm9iaiwgc3R5bGU6IFwid2FybmluZ1wiIH0pLFxyXG4gICAgc3VjY2VzczogKGh0bWwsIG9iaiA9IHt9KSA9PiBzaG93KGh0bWwsIHsgLi4ub2JqLCBzdHlsZTogXCJzdWNjZXNzXCIgfSlcclxuICB9KVxyXG59IiwgImltcG9ydCB3ZWJwYWNrIGZyb20gXCIuLi8uLi8uLi8uLi8uLi9hcGkvbW9kdWxlcy93ZWJwYWNrLmpzXCI7XHJcblxyXG5jb25zdCBidXR0b25DbGFzc2VzID0gd2VicGFjay5maW5kQnlQcm9wZXJ0aWVzKFwibG93U2F0dXJhdGlvblVuZGVybGluZVwiLCBcImJ1dHRvblwiLCBcImRpc2FibGVkQnV0dG9uT3ZlcmxheVwiKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAvKiogQHBhcmFtIHtpbXBvcnQoXCJ2dWVcIikuQXBwfSB2dWVBcHAgKi9cclxuICBsb2FkKHZ1ZUFwcCkge1xyXG4gICAgdnVlQXBwLmNvbXBvbmVudChcImRpc2NvcmQtYnV0dG9uXCIsIHtcclxuICAgICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8ZGl2IGNsYXNzPVwiJHtidXR0b25DbGFzc2VzLmJ1dHRvbn0gJHtidXR0b25DbGFzc2VzLmxvb2tGaWxsZWR9ICR7YnV0dG9uQ2xhc3Nlcy5ncm93fVwiIDpjbGFzcz1cIlxcYFxcJHtidXR0b25DbGFzc2VzW2NvbG9yXSA/PyBidXR0b25DbGFzc2VzLmNvbG9yQnJhbmR9IFxcJHtidXR0b25DbGFzc2VzW3NpemVdID8/IGJ1dHRvbkNsYXNzZXMuc2l6ZVNtYWxsfVxcYFwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cIiR7YnV0dG9uQ2xhc3Nlcy5jb250ZW50c31cIj57e3ZhbHVlfX08L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgYCxcclxuICAgICAgcHJvcHM6IFtcInZhbHVlXCIsIFwic2l6ZVwiLCBcImNvbG9yXCJdLFxyXG4gICAgICBkYXRhKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICBidXR0b25DbGFzc2VzXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn0iLCAiaW1wb3J0IHdlYnBhY2sgZnJvbSBcIi4uLy4uLy4uLy4uLy4uL2FwaS9tb2R1bGVzL3dlYnBhY2suanNcIjtcclxuXHJcbmxldCBpbnB1dENsYXNzZXMgPSB3ZWJwYWNrLmZpbmRCeVByb3BlcnRpZXMoXCJpbnB1dERlZmF1bHRcIiwgXCJjb3B5SW5wdXRcIik7XHJcbmxldCBpbnB1dENsYXNzZXMyID0gd2VicGFjay5maW5kQnlQcm9wZXJ0aWVzKFwiaW5wdXRcIiwgXCJlZGl0YWJsZVwiLCBcImRpc2FibGVkXCIsIFwiaW5wdXRXcmFwcGVyXCIpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIC8qKiBAcGFyYW0ge2ltcG9ydChcInZ1ZVwiKS5BcHB9IHZ1ZUFwcCAqL1xyXG4gIGxvYWQodnVlQXBwKSB7XHJcbiAgICB2dWVBcHAuY29tcG9uZW50KFwiZGlzY29yZC1pbnB1dFwiLCB7XHJcbiAgICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cIiR7aW5wdXRDbGFzc2VzMj8uaW5wdXR9XCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiJHtpbnB1dENsYXNzZXM/LmlucHV0V3JhcHBlcn1cIj5cclxuICAgICAgICAgICAgPGlucHV0IDp0eXBlPVwidHlwZSA/PyAndGV4dCdcIiBjbGFzcz1cIiR7aW5wdXRDbGFzc2VzPy5pbnB1dERlZmF1bHR9XCIgdi1iaW5kPVwidmFsdWVcIiA6cGxhY2Vob2xkZXI9XCJwbGFjZWhvbGRlclwiIC8+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgYCxcclxuICAgICAgcHJvcHM6IFtcInZhbHVlXCIsIFwicGxhY2Vob2xkZXJcIiwgXCJ0eXBlXCJdXHJcbiAgICB9KTtcclxuICB9XHJcbn0iLCAiZXhwb3J0IGRlZmF1bHQgYFxuLmFjb3JkLS1kaXNjb3JkLXNlbGVjdHtwb3NpdGlvbjpyZWxhdGl2ZTt3aWR0aDoxMDAlfS5hY29yZC0tZGlzY29yZC1zZWxlY3Q+Lm9wdGlvbnN7cG9zaXRpb246YWJzb2x1dGU7dG9wOjEwMCU7d2lkdGg6MTAwJTttYXgtaGVpZ2h0OjI4NnB4O292ZXJmbG93LXg6aGlkZGVuO292ZXJmbG93LXk6c2Nyb2xsfS5hY29yZC0tZGlzY29yZC1zZWxlY3Q+Lm9wdGlvbnMudG9wLXBvcG91dHt0b3A6YXV0bztib3R0b206MTAwJX1gO1xuIiwgImltcG9ydCB3ZWJwYWNrIGZyb20gXCIuLi8uLi8uLi8uLi9tb2R1bGVzL3dlYnBhY2suanNcIjtcclxuaW1wb3J0IHBhdGNoZXIgZnJvbSBcIi4uLy4uLy4uLy4uL3BhdGNoZXIvaW5kZXguanNcIjtcclxuXHJcbmltcG9ydCBjc3NUZXh0IGZyb20gXCIuL3N0eWxlLnNjc3NcIjtcclxucGF0Y2hlci5pbmplY3RDU1MoY3NzVGV4dCk7XHJcblxyXG5jb25zdCBzZWxlY3RDbGFzc2VzID0gd2VicGFjay5maW5kQnlQcm9wZXJ0aWVzKFwic2VsZWN0XCIsIFwic2VhcmNoYWJsZVNlbGVjdFwiLCBcIm11bHRpU2VsZWN0Q2hlY2tcIik7XHJcbmNvbnN0IHNjcm9sbENsYXNzZXMgPSB3ZWJwYWNrLmZpbmRCeVByb3BlcnRpZXMoXCJtYW5hZ2VkUmVhY3RpdmVTY3JvbGxlclwiLCBcInNjcm9sbGVyQmFzZVwiLCBcInRoaW5cIik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgLyoqIEBwYXJhbSB7aW1wb3J0KFwidnVlXCIpLkFwcH0gdnVlQXBwICovXHJcbiAgbG9hZCh2dWVBcHApIHtcclxuICAgIHZ1ZUFwcC5jb21wb25lbnQoXCJkaXNjb3JkLXNlbGVjdFwiLCB7XHJcbiAgICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cIiR7c2VsZWN0Q2xhc3Nlcy5zZWxlY3R9ICR7c2VsZWN0Q2xhc3Nlcy5sb29rRmlsbGVkfSBhY29yZC0tZGlzY29yZC1zZWxlY3RcIiA6Y2xhc3M9XCJ7JyR7c2VsZWN0Q2xhc3Nlcy5vcGVufSc6IGFjdGl2ZX1cIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCIke3NlbGVjdENsYXNzZXMudmFsdWV9XCI+e3tvcHRpb25zLmZpbmQoaT0+aS52YWx1ZSA9PT0gc2VsZWN0ZWQpPy5sYWJlbH19PC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiJHtzZWxlY3RDbGFzc2VzLmljb25zfVwiPlxyXG4gICAgICAgICAgICAgIDxzdmcgdi1pZj1cIiFhY3RpdmVcIiBjbGFzcz1cImljb25cIiB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMjRcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+PHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNMTYuNTkgOC41OTAwM0wxMiAxMy4xN0w3LjQxIDguNTkwMDNMNiAxMEwxMiAxNkwxOCAxMEwxNi41OSA4LjU5MDAzWlwiPjwvcGF0aD48L3N2Zz5cclxuICAgICAgICAgICAgICA8c3ZnIHYtZWxzZSByb2xlPVwiaW1nXCIgY2xhc3M9XCJpY29uXCIgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiPjxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTcuNDEgMTYuMDAwMUwxMiAxMS40MjAxTDE2LjU5IDE2LjAwMDFMMTggMTQuNTkwMUwxMiA4LjU5MDA2TDYgMTQuNTkwMUw3LjQxIDE2LjAwMDFaXCI+PC9wYXRoPjwvc3ZnPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IHYtaWY9XCJhY3RpdmVcIiBjbGFzcz1cIm9wdGlvbnMgJHtzZWxlY3RDbGFzc2VzLnBvcG91dH0gJHtzY3JvbGxDbGFzc2VzLnNjcm9sbGVyQmFzZX0gJHtzY3JvbGxDbGFzc2VzLnRoaW59XCIgOmNsYXNzPVwieyd0b3AtcG9wb3V0JzogcG9zaXRpb24gPT09ICd0b3AnfVwiPlxyXG4gICAgICAgICAgICA8ZGl2IHYtZm9yPVwib3B0aW9uIGluIG9wdGlvbnNcIiBjbGFzcz1cIm9wdGlvbiAke3NlbGVjdENsYXNzZXMub3B0aW9ufVwiIEBjbGljaz1cIm9uT3B0aW9uQ2xpY2sob3B0aW9uKVwiIDprZXk9XCJvcHRpb24udmFsdWVcIiA6YXJpYS1zZWxlY3RlZD1cIlxcYFxcJHtzZWxlY3RlZCA9PT0gb3B0aW9uLnZhbHVlfVxcYFwiPlxyXG4gICAgICAgICAgICAgIHt7b3B0aW9uLmxhYmVsfX1cclxuICAgICAgICAgICAgICA8c3ZnIHYtaWY9XCJzZWxlY3RlZCA9PT0gb3B0aW9uLnZhbHVlXCIgY2xhc3M9XCIke3NlbGVjdENsYXNzZXMuc2VsZWN0ZWRJY29ufVwiIHJvbGU9XCJpbWdcIiB3aWR0aD1cIjIwXCIgaGVpZ2h0PVwiMjBcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPjxjaXJjbGUgcj1cIjhcIiBjeD1cIjEyXCIgY3k9XCIxMlwiIGZpbGw9XCJ3aGl0ZVwiPjwvY2lyY2xlPjxnIGZpbGw9XCJub25lXCIgZmlsbC1ydWxlPVwiZXZlbm9kZFwiPjxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bS0yIDE1bC01LTUgMS40MS0xLjQxTDEwIDE0LjE3bDcuNTktNy41OUwxOSA4bC05IDl6XCI+PC9wYXRoPjwvZz48L3N2Zz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgYCxcclxuICAgICAgZGF0YSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgc2VsZWN0Q2xhc3NlcyxcclxuICAgICAgICAgIGFjdGl2ZTogZmFsc2UsXHJcbiAgICAgICAgICBzZWxlY3RlZDogbnVsbFxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgcHJvcHM6IFtcIm9wdGlvbnNcIiwgXCJtb2RlbFZhbHVlXCIsIFwicG9zaXRpb25cIl0sXHJcbiAgICAgIGVtaXRzOiBbJ3VwZGF0ZTptb2RlbFZhbHVlJ10sXHJcbiAgICAgIG1vdW50ZWQoKSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZCA9IHRoaXMubW9kZWxWYWx1ZTtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMub25DbGljayk7XHJcbiAgICAgIH0sXHJcbiAgICAgIHVubW91bnRlZCgpIHtcclxuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMub25DbGljayk7XHJcbiAgICAgIH0sXHJcbiAgICAgIG1ldGhvZHM6IHtcclxuICAgICAgICBvbk9wdGlvbkNsaWNrKGUpIHtcclxuICAgICAgICAgIHRoaXMuJGVtaXQoXCJ1cGRhdGU6bW9kZWxWYWx1ZVwiLCBlLnZhbHVlKTtcclxuICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSBlLnZhbHVlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb25DbGljayhlKSB7XHJcbiAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhzZWxlY3RDbGFzc2VzLnNlbGVjdClcclxuICAgICAgICAgICAgfHwgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKHNlbGVjdENsYXNzZXMudmFsdWUpXHJcbiAgICAgICAgICAgIHx8IGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhzZWxlY3RDbGFzc2VzLmljb25zKVxyXG4gICAgICAgICAgICB8fCBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoc2VsZWN0Q2xhc3Nlcy5wb3BvdXQpXHJcbiAgICAgICAgICAgIHx8IGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhzZWxlY3RDbGFzc2VzLm9wdGlvbilcclxuICAgICAgICAgICAgfHwgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaWNvblwiKVxyXG4gICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlID0gIXRoaXMuYWN0aXZlO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59IiwgImltcG9ydCBkaXNjb3JkQnV0dG9uIGZyb20gXCIuL2Rpc2NvcmQtYnV0dG9uL2luZGV4LmpzXCI7XHJcbmltcG9ydCBkaXNjb3JkSW5wdXQgZnJvbSBcIi4vZGlzY29yZC1pbnB1dC9pbmRleC5qc1wiO1xyXG5pbXBvcnQgZGlzY29yZFNlbGVjdCBmcm9tIFwiLi9kaXNjb3JkLXNlbGVjdC9pbmRleC5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGxvYWQodnVlQXBwKSB7XHJcbiAgICBkaXNjb3JkU2VsZWN0LmxvYWQodnVlQXBwKTtcclxuICAgIGRpc2NvcmRJbnB1dC5sb2FkKHZ1ZUFwcCk7XHJcbiAgICBkaXNjb3JkQnV0dG9uLmxvYWQodnVlQXBwKTtcclxuICB9XHJcbn0iLCAiaW1wb3J0IHZ1ZUNvbXBvbmVudHMgZnJvbSBcIi4vY29tcG9uZW50cy9pbmRleC5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGNvbXBvbmVudHM6IHtcclxuICAgIGxvYWQodnVlQXBwKSB7XHJcbiAgICAgIHZ1ZUNvbXBvbmVudHMubG9hZCh2dWVBcHApO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgcmVhZHk6IHtcclxuICAgIGFzeW5jIHdoZW4oKSB7XHJcbiAgICAgIHdoaWxlICghd2luZG93LlZ1ZSkge1xyXG4gICAgICAgIGF3YWl0IG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCAxMDApKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0sXHJcbiAgICBnZXQgaXMoKSB7XHJcbiAgICAgIHJldHVybiAhIXdpbmRvdy5WdWU7XHJcbiAgICB9XHJcbiAgfSxcclxuICBnZXQgVnVlKCkge1xyXG4gICAgcmV0dXJuIHdpbmRvdy5WdWU7XHJcbiAgfVxyXG59IiwgImltcG9ydCBwYXRjaGVyIGZyb20gXCIuLi9wYXRjaGVyL2luZGV4LmpzXCI7XHJcbmltcG9ydCBzdHlsZUNTU1RleHQgZnJvbSBcIi4vc3R5bGVzLnNjc3NcIjtcclxucGF0Y2hlci5pbmplY3RDU1Moc3R5bGVDU1NUZXh0KTtcclxuXHJcbmltcG9ydCB0b29sdGlwcyBmcm9tIFwiLi90b29sdGlwcy5qc1wiO1xyXG5pbXBvcnQgbm90aWZpY2F0aW9ucyBmcm9tIFwiLi9ub3RpZmljYXRpb25zLmpzXCI7XHJcbmltcG9ydCBjb250ZXh0TWVudXMgZnJvbSBcIi4vY29udGV4dE1lbnVzLmpzXCI7XHJcbmltcG9ydCBjb21wb25lbnRzIGZyb20gXCIuL2NvbXBvbmVudHMuanNcIjtcclxuaW1wb3J0IG1vZGFscyBmcm9tIFwiLi9tb2RhbHMuanN4XCI7XHJcbmltcG9ydCB0b2FzdHMgZnJvbSBcIi4vdG9hc3RzLmpzXCI7XHJcbmltcG9ydCB2dWUgZnJvbSBcIi4vdnVlL2luZGV4LmpzXCI7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIHRvb2x0aXBzLFxyXG4gIG5vdGlmaWNhdGlvbnMsXHJcbiAgY29udGV4dE1lbnVzLFxyXG4gIGNvbXBvbmVudHMsXHJcbiAgbW9kYWxzLFxyXG4gIHRvYXN0cyxcclxuICB2dWVcclxufSIsICJpbXBvcnQgbW9kdWxlcyBmcm9tICcuL21vZHVsZXMnO1xyXG5pbXBvcnQgZGV2IGZyb20gJy4vZGV2JztcclxuaW1wb3J0IHV0aWxzIGZyb20gJy4vdXRpbHMnO1xyXG5pbXBvcnQgZXh0ZW5zaW9ucyBmcm9tICcuL2V4dGVuc2lvbnMnO1xyXG5pbXBvcnQgaTE4biBmcm9tICcuL2kxOG4nO1xyXG5pbXBvcnQgc3RvcmFnZSBmcm9tICcuL3N0b3JhZ2UnO1xyXG5pbXBvcnQgZXZlbnRzIGZyb20gJy4vZXZlbnRzJztcclxuaW1wb3J0IHBhdGNoZXIgZnJvbSAnLi9wYXRjaGVyJztcclxuaW1wb3J0IGludGVybmFsIGZyb20gJy4vaW50ZXJuYWwnO1xyXG5pbXBvcnQgd2Vic29ja2V0IGZyb20gJy4vd2Vic29ja2V0JztcclxuaW1wb3J0IGRvbSBmcm9tICcuL2RvbSc7XHJcbmltcG9ydCB1aSBmcm9tICcuL3VpL2luZGV4LmpzJztcclxuXHJcbnV0aWxzLmxvZ2dlci5kZWJ1ZyhgUFJFTE9BRF9LRVk6IDxQUkVMT0FEX0tFWT5gKTtcclxuXHJcbmZ1bmN0aW9uIGRldkVycm9yKGFwaSkge1xyXG4gIHJldHVybiBuZXcgRXJyb3IoYFRoZSAke2FwaX0gQVBJIGNhbiBvbmx5IGJlIGFjY2Vzc2VkIHdoZW4gRGV2IG1vZGUgaXMgZW5hYmxlZCFgKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGV4cG9zZWRBUEk6IHtcclxuICAgIGRldixcclxuICAgIHV0aWxzLFxyXG4gICAgaTE4bixcclxuICAgIGV2ZW50cyxcclxuICAgIHVpLFxyXG4gICAgZ2V0IGRvbSgpIHtcclxuICAgICAgaWYgKCFkZXYuZW5hYmxlZCkgdGhyb3cgZGV2RXJyb3IoXCJET01cIik7XHJcbiAgICAgIHJldHVybiBkb207XHJcbiAgICB9LFxyXG4gICAgZ2V0IHBhdGNoZXIoKSB7XHJcbiAgICAgIGlmICghZGV2LmVuYWJsZWQpIHRocm93IGRldkVycm9yKFwiUGF0Y2hlclwiKTtcclxuICAgICAgcmV0dXJuIHBhdGNoZXI7XHJcbiAgICB9LFxyXG4gICAgZ2V0IHN0b3JhZ2UoKSB7XHJcbiAgICAgIGlmICghZGV2LmVuYWJsZWQpIHRocm93IGRldkVycm9yKFwiU3RvcmFnZVwiKTtcclxuICAgICAgcmV0dXJuIHN0b3JhZ2U7XHJcbiAgICB9LFxyXG4gICAgZ2V0IG1vZHVsZXMoKSB7XHJcbiAgICAgIGlmICghZGV2LmVuYWJsZWQpIHRocm93IGRldkVycm9yKFwiTW9kdWxlc1wiKTtcclxuICAgICAgcmV0dXJuIG1vZHVsZXM7XHJcbiAgICB9LFxyXG4gICAgZ2V0IGV4dGVuc2lvbnMoKSB7XHJcbiAgICAgIGlmICghZGV2LmVuYWJsZWQpIHRocm93IGRldkVycm9yKFwiRXh0ZW5zaW9uc1wiKTtcclxuICAgICAgcmV0dXJuIGV4dGVuc2lvbnM7XHJcbiAgICB9LFxyXG4gICAgZ2V0IGludGVybmFsKCkge1xyXG4gICAgICBpZiAoIWRldi5lbmFibGVkKSB0aHJvdyBkZXZFcnJvcihcIkludGVybmFsXCIpO1xyXG4gICAgICByZXR1cm4gaW50ZXJuYWw7XHJcbiAgICB9LFxyXG4gICAgZ2V0IHdlYnNvY2tldCgpIHtcclxuICAgICAgaWYgKCFkZXYuZW5hYmxlZCkgdGhyb3cgZGV2RXJyb3IoXCJXZWJzb2NrZXRcIik7XHJcbiAgICAgIHJldHVybiB3ZWJzb2NrZXQ7XHJcbiAgICB9XHJcbiAgfSxcclxuICB1bmV4cG9zZWRBUEk6IHtcclxuICAgIGRldixcclxuICAgIG1vZHVsZXMsXHJcbiAgICB1dGlscyxcclxuICAgIGV4dGVuc2lvbnMsXHJcbiAgICBpMThuLFxyXG4gICAgc3RvcmFnZSxcclxuICAgIGV2ZW50cyxcclxuICAgIHBhdGNoZXIsXHJcbiAgICBpbnRlcm5hbCxcclxuICAgIHdlYnNvY2tldCxcclxuICAgIHVpLFxyXG4gICAgZG9tXHJcbiAgfVxyXG59IiwgImltcG9ydCBtb2R1bGVzIGZyb20gXCIuLi9hcGkvbW9kdWxlcy9pbmRleC5qc1wiO1xyXG5pbXBvcnQgbW9kYWxzIGZyb20gXCIuLi9hcGkvdWkvbW9kYWxzLmpzeFwiO1xyXG5pbXBvcnQgbm90aWZpY2F0aW9ucyBmcm9tIFwiLi4vYXBpL3VpL25vdGlmaWNhdGlvbnMuanNcIjtcclxuaW1wb3J0IGV4dGVuc2lvbnMgZnJvbSBcIi4uL2FwaS9leHRlbnNpb25zL2luZGV4LmpzXCI7XHJcbmltcG9ydCB3ZWJzb2NrZXQgZnJvbSBcIi4uL2FwaS93ZWJzb2NrZXQvaW5kZXguanNcIjtcclxuXHJcbndlYnNvY2tldC5zZXQoXCJJbnN0YWxsRXh0ZW5zaW9uXCIsIGFzeW5jICh7IHVybCB9ID0ge30pID0+IHtcclxuICBpZiAoIXVybCkgcmV0dXJuO1xyXG5cclxuICBhd2FpdCBtb2R1bGVzLm5hdGl2ZS53aW5kb3cuc2V0QWx3YXlzT25Ub3AoMCwgdHJ1ZSk7XHJcbiAgYXdhaXQgbmV3IFByb21pc2UociA9PiBzZXRUaW1lb3V0KHIsIDI1MCkpO1xyXG4gIGF3YWl0IG1vZHVsZXMubmF0aXZlLndpbmRvdy5zZXRBbHdheXNPblRvcCgwLCB0cnVlKTtcclxuXHJcbiAgY29uc3Qgc3VjY2VzcyA9IGF3YWl0IG1vZGFscy5zaG93LmNvbmZpcm1hdGlvbihcclxuICAgIGFjb3JkLmkxOG4uZm9ybWF0KFwiSU1QT1JUX0VYVEVOU0lPTl9NT0RBTF9USVRMRVwiKSxcclxuICAgIGFjb3JkLmkxOG4uZm9ybWF0KFwiSU1QT1JUX0VYVEVOU0lPTl9NT0RBTF9ERVNDUklQVElPTlwiLCB1cmwpXHJcbiAgKTtcclxuXHJcbiAgaWYgKCFzdWNjZXNzKSByZXR1cm47XHJcblxyXG4gIHRyeSB7XHJcbiAgICBhd2FpdCBleHRlbnNpb25zLmxvYWQodXJsKTtcclxuICB9IGNhdGNoIChlcnIpIHtcclxuICAgIG5vdGlmaWNhdGlvbnMuc2hvdy5lcnJvcihgJHtlcnJ9YCwgeyB0aW1lb3V0OiAzMDAwMCB9KTtcclxuICB9XHJcbn0pOyIsICJleHBvcnQgZGVmYXVsdCBgXG5bY2xhc3MqPWFjb3JkLS1de2JveC1zaXppbmc6Ym9yZGVyLWJveH1bY2xhc3MqPWFjb3JkLS1dICp7Ym94LXNpemluZzpib3JkZXItYm94fS5hY29yZC0tdGFicy1jb250ZW50LWNvbnRhaW5lcntwYWRkaW5nOjMycHggMTZweDtkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6ZmxleC1zdGFydDtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO3dpZHRoOjEwMCV9LmFjb3JkLS10YWJzLWNvbnRlbnQtY29udGFpbmVyPi50YWJ7d2lkdGg6MTAwJX0uYWNvcmQtLXRhYnMtdGFiLWJ1dHRvbi5zdG9yZS10YWItYnV0dG9ue2JhY2tncm91bmQtY29sb3I6dmFyKC0tc3RhdHVzLXBvc2l0aXZlLWJhY2tncm91bmQpO2NvbG9yOnZhcigtLXN0YXR1cy1wb3NpdGl2ZS10ZXh0KX0uYWNvcmQtLXRhYnMtdGFiLWJ1dHRvbi5zdG9yZS10YWItYnV0dG9uLnNlbGVjdGVke2NvbG9yOnZhcigtLXRleHQtcG9zaXRpdmUpO2JhY2tncm91bmQtY29sb3I6dmFyKC0tYmFja2dyb3VuZC1tb2RpZmllci1zZWxlY3RlZCl9YDtcbiIsICJleHBvcnQgZGVmYXVsdCB7XHJcbiAgLyoqIEBwYXJhbSB7aW1wb3J0KFwidnVlXCIpLkFwcH0gdnVlQXBwICovXHJcbiAgbG9hZCh2dWVBcHApIHtcclxuICAgIHZ1ZUFwcC5jb21wb25lbnQoXHJcbiAgICAgIFwiaG9tZS1wYWdlXCIsXHJcbiAgICAgIHtcclxuICAgICAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgPGRpdiBzdHlsZT1cIndpZHRoOiAzMDBweDtcIj5cclxuICAgICAgICAgICAgICA8ZGlzY29yZC1zZWxlY3Qgdi1tb2RlbD1cInZhbHVlXCIgOm9wdGlvbnM9XCJvcHRpb25zXCIgLz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxoMT57eyB2YWx1ZSB9fTwvaDE+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICBcclxuICAgICAgICBgLFxyXG4gICAgICAgIGRhdGEoKSB7XHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB2YWx1ZTogXCIxXCIsXHJcbiAgICAgICAgICAgIG9wdGlvbnM6IFtcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCIxXCIsXHJcbiAgICAgICAgICAgICAgICBsYWJlbDogXCJPcHRpb24gMVwiXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCIyXCIsXHJcbiAgICAgICAgICAgICAgICBsYWJlbDogXCJPcHRpb24gMlwiXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCIzXCIsXHJcbiAgICAgICAgICAgICAgICBsYWJlbDogXCJPcHRpb24gM1wiXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICApO1xyXG4gIH1cclxufSIsICJleHBvcnQgZGVmYXVsdCBgXG4uYWNvcmQtLWluc3RhbGxlZC1leHRlbnNpb25zLXBhZ2V7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmZsZXgtc3RhcnQ7anVzdGlmeS1jb250ZW50OmNlbnRlcjtwYWRkaW5nOjAgMTZweH0uYWNvcmQtLWluc3RhbGxlZC1leHRlbnNpb25zLXBhZ2UgLmNvbnRhaW5lcnt3aWR0aDoxMDAlO21heC13aWR0aDo3MjBweDtkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1ufS5hY29yZC0taW5zdGFsbGVkLWV4dGVuc2lvbnMtcGFnZSAuY29udGFpbmVyPi50b3B7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtnYXA6OHB4fS5hY29yZC0taW5zdGFsbGVkLWV4dGVuc2lvbnMtcGFnZSAuY29udGFpbmVyPi50b3A+LnNlYXJjaHt3aWR0aDo4MCV9LmFjb3JkLS1pbnN0YWxsZWQtZXh0ZW5zaW9ucy1wYWdlIC5jb250YWluZXI+LnRvcD4uY2F0ZWdvcnl7d2lkdGg6MjAlfWA7XG4iLCAiaW1wb3J0IHBhdGNoZXIgZnJvbSBcIi4uLy4uLy4uLy4uLy4uLy4uL2FwaS9wYXRjaGVyL2luZGV4LmpzXCI7XHJcbmltcG9ydCBpMThuIGZyb20gXCIuLi8uLi8uLi8uLi8uLi8uLi9hcGkvaTE4bi9pbmRleC5qc1wiO1xyXG5pbXBvcnQgY3NzVGV4dCBmcm9tIFwiLi9zdHlsZS5zY3NzXCI7XHJcbnBhdGNoZXIuaW5qZWN0Q1NTKGNzc1RleHQpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIC8qKiBAcGFyYW0ge2ltcG9ydChcInZ1ZVwiKS5BcHB9IHZ1ZUFwcCAqL1xyXG4gIGxvYWQodnVlQXBwKSB7XHJcbiAgICB2dWVBcHAuY29tcG9uZW50KFxyXG4gICAgICBcImluc3RhbGxlZC1leHRlbnNpb25zLXBhZ2VcIixcclxuICAgICAge1xyXG4gICAgICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWNvcmQtLWluc3RhbGxlZC1leHRlbnNpb25zLXBhZ2VcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0b3BcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzZWFyY2hcIj5cclxuICAgICAgICAgICAgICAgICAgPGRpc2NvcmQtaW5wdXQgdi1tb2RlbD1cInNlYXJjaFRleHRcIiA6cGxhY2Vob2xkZXI9XCJpMThuRm9ybWF0KCdTRUFSQ0gnKVwiIC8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXRlZ29yeVwiPlxyXG4gICAgICAgICAgICAgICAgICA8ZGlzY29yZC1zZWxlY3Qgdi1tb2RlbD1cInNlYXJjaENhdGVnb3J5VGV4dFwiIDpvcHRpb25zPVwiW3t2YWx1ZTogJ2FsbCcsIGxhYmVsOiBpMThuRm9ybWF0KCdBTEwnKX0sIHt2YWx1ZTogJ3BsdWdpbnMnLCBsYWJlbDogaTE4bkZvcm1hdCgnUExVR0lOUycpfSwge3ZhbHVlOiAndGhlbWVzJywgbGFiZWw6IGkxOG5Gb3JtYXQoJ1RIRU1FUycpfV1cIiAvPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgYCxcclxuICAgICAgICBkYXRhKCkge1xyXG4gICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgc2VhcmNoVGV4dDogXCJcIixcclxuICAgICAgICAgICAgc2VhcmNoQ2F0ZWdvcnlUZXh0OiBcImFsbFwiXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBtZXRob2RzOiB7XHJcbiAgICAgICAgICBpMThuRm9ybWF0OiBpMThuLmZvcm1hdFxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgKTtcclxuICB9XHJcbn0iLCAiZXhwb3J0IGRlZmF1bHQge1xyXG4gIC8qKiBAcGFyYW0ge2ltcG9ydChcInZ1ZVwiKS5BcHB9IHZ1ZUFwcCAqL1xyXG4gIGxvYWQodnVlQXBwKSB7XHJcbiAgICB2dWVBcHAuY29tcG9uZW50KFxyXG4gICAgICBcInNldHRpbmdzLXBhZ2VcIixcclxuICAgICAge1xyXG4gICAgICAgIHRlbXBsYXRlOiBcIjxkaXY+U2V0dGluZ3MgUGFnZTwvZGl2PlwiLFxyXG4gICAgICB9XHJcbiAgICApO1xyXG4gIH1cclxufSIsICJleHBvcnQgZGVmYXVsdCB7XHJcbiAgLyoqIEBwYXJhbSB7aW1wb3J0KFwidnVlXCIpLkFwcH0gdnVlQXBwICovXHJcbiAgbG9hZCh2dWVBcHApIHtcclxuICAgIHZ1ZUFwcC5jb21wb25lbnQoXHJcbiAgICAgIFwic3RvcmUtcGFnZVwiLFxyXG4gICAgICB7XHJcbiAgICAgICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgPHN0b3JlLWV4dGVuc2lvbi1jYXJkIHYtZm9yPVwiZXh0ZW5zaW9uIGluIGV4dGVuc2lvbnNcIiA6ZXh0ZW5zaW9uPVwiZXh0ZW5zaW9uXCIgOmtleT1cImV4dGVuc2lvbi5uYW1lLmRlZmF1bHRcIiAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIGAsXHJcbiAgICAgICAgZGF0YSgpIHtcclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGV4dGVuc2lvbnM6IFtcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcInBsdWdpblwiLFxyXG4gICAgICAgICAgICAgICAgdXJsOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgbmFtZToge1xyXG4gICAgICAgICAgICAgICAgICBkZWZhdWx0OiBcIlRlc3QgUGx1Z2luXCIsXHJcbiAgICAgICAgICAgICAgICAgIHRyOiBcIkRlbmVtZSBQbHVnaW5cIixcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgICBkZWZhdWx0OiBcIlRlc3QgUGx1Z2luIGRlc2NyaXB0aW9uLi5cIixcclxuICAgICAgICAgICAgICAgICAgdHI6IFwiRGVuZW1lIFBsdWdpbiBhXHUwMEU3XHUwMTMxa2xhbWFzXHUwMTMxLi5cIixcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBwcmV2aWV3czogW1xyXG4gICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJUZXN0IFBsdWdpbiBQcmV2aWV3XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2U6IFwiaHR0cHM6Ly9pLmltZ3VyLmNvbS9UdGZqSGVQLnBuZ1wiLFxyXG4gICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJUZXN0IFBsdWdpbiBQcmV2aWV3IDJcIixcclxuICAgICAgICAgICAgICAgICAgICBpbWFnZTogXCJodHRwczovL2kuaW1ndXIuY29tLzBaMFowWjAucG5nXCIsXHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICBhdXRob3JzOiBbXHJcbiAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogXCI3MDczMDk2OTM0NDk1MzU1OTlcIixcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIkFybWFnYW4jMjQ0OFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGltYWdlOiBcImh0dHBzOi8vaS5pbWd1ci5jb20vclNMVmQyMy5wbmdcIlxyXG4gICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiNzA3MzA5NjkzNDQ5NTM1NTk5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJBcm1hZ2FuIzI0NDhcIixcclxuICAgICAgICAgICAgICAgICAgICBpbWFnZTogXCJodHRwczovL2kuaW1ndXIuY29tL3JTTFZkMjMucG5nXCJcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIHZlcnNpb246IFwiMS4wLjBcIixcclxuICAgICAgICAgICAgICAgIHJlYWRtZTogXCIjIyMgVGVzdCBQbHVnaW4gcmVhZG1lLi5cIixcclxuICAgICAgICAgICAgICAgIGluc3RhbGxlZDogdHJ1ZVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgfVxyXG59IiwgImltcG9ydCBob21lUGFnZSBmcm9tIFwiLi9ob21lLXBhZ2UvaW5kZXguanNcIlxyXG5pbXBvcnQgaW5zdGFsbGVkRXh0ZW5zaW9uc1BhZ2UgZnJvbSBcIi4vaW5zdGFsbGVkLWV4dGVuc2lvbnMtcGFnZS9pbmRleC5qc1wiO1xyXG5pbXBvcnQgc2V0dGluZ3NQYWdlIGZyb20gXCIuL3NldHRpbmdzLXBhZ2UvaW5kZXguanNcIjtcclxuaW1wb3J0IHN0b3JlUGFnZSBmcm9tIFwiLi9zdG9yZS1wYWdlL2luZGV4LmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgLyoqIEBwYXJhbSB7aW1wb3J0KFwidnVlXCIpLkFwcH0gdnVlQXBwICovXHJcbiAgbG9hZCh2dWVBcHApIHtcclxuICAgIGhvbWVQYWdlLmxvYWQodnVlQXBwKTtcclxuICAgIGluc3RhbGxlZEV4dGVuc2lvbnNQYWdlLmxvYWQodnVlQXBwKTtcclxuICAgIHNldHRpbmdzUGFnZS5sb2FkKHZ1ZUFwcCk7XHJcbiAgICBzdG9yZVBhZ2UubG9hZCh2dWVBcHApO1xyXG4gIH1cclxufSIsICJleHBvcnQgZGVmYXVsdCBgXG4uYWNvcmQtLXN0b3JlLWV4dGVuc2lvbi1jYXJke3dpZHRoOjI3NXB4O2hlaWdodDoyNTBweDtkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1uO2JvcmRlci1yYWRpdXM6NHB4O2NvbnRhaW46Y29udGVudDtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMCwwLDAsLjEpO2JveC1zaGFkb3c6dmFyKC0tZWxldmF0aW9uLW1lZGl1bSl9LmFjb3JkLS1zdG9yZS1leHRlbnNpb24tY2FyZD4ucHJldmlld3t3aWR0aDoxMDAlO2hlaWdodDoxMDBweDtkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1uO2p1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVuO2FsaWduLWl0ZW1zOmNlbnRlcjtiYWNrZ3JvdW5kLWNvbG9yOnZhcigtLWJyYW5kLTUwMCk7YmFja2dyb3VuZC1wb3NpdGlvbjpjZW50ZXI7YmFja2dyb3VuZC1zaXplOmNvdmVyfS5hY29yZC0tc3RvcmUtZXh0ZW5zaW9uLWNhcmQ+LnByZXZpZXc+LmNvbnRyb2xze3BhZGRpbmc6OHB4O2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47d2lkdGg6MTAwJX0uYWNvcmQtLXN0b3JlLWV4dGVuc2lvbi1jYXJkPi5wcmV2aWV3Pi5jb250cm9scyAuZ297YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDAsMCwwLC41KTtib3gtc2hhZG93OjBweCAwcHggNHB4IHJnYmEoMCwwLDAsLjUpO2JvcmRlci1yYWRpdXM6NTAlO3dpZHRoOjI0cHg7aGVpZ2h0OjI0cHg7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO2NvbG9yOnZhcigtLWhlYWRlci1wcmltYXJ5KTtmb250LXdlaWdodDo2MDA7Y3Vyc29yOnBvaW50ZXJ9LmFjb3JkLS1zdG9yZS1leHRlbnNpb24tY2FyZD4ucHJldmlldz4ubmFtZS1jb250YWluZXJ7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO2NvbG9yOnZhcigtLWhlYWRlci1wcmltYXJ5KTtwYWRkaW5nOjhweH0uYWNvcmQtLXN0b3JlLWV4dGVuc2lvbi1jYXJkPi5wcmV2aWV3Pi5uYW1lLWNvbnRhaW5lcj4ubmFtZXtmb250LXNpemU6MTRweDtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMCwwLDAsLjUpO2JveC1zaGFkb3c6MHB4IDBweCA0cHggcmdiYSgwLDAsMCwuNSk7Ym9yZGVyLXJhZGl1czo5OTk5cHg7cGFkZGluZzo0cHggOHB4fS5hY29yZC0tc3RvcmUtZXh0ZW5zaW9uLWNhcmQ+LmluZm8tY29udGFpbmVye2Rpc3BsYXk6ZmxleDtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2VlbjtmbGV4LWRpcmVjdGlvbjpjb2x1bW47cGFkZGluZzo4cHg7aGVpZ2h0OjE1MHB4O3dpZHRoOjEwMCV9LmFjb3JkLS1zdG9yZS1leHRlbnNpb24tY2FyZD4uaW5mby1jb250YWluZXI+LnRvcHtkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1uO2dhcDo0cHg7aGVpZ2h0OjEwMCV9LmFjb3JkLS1zdG9yZS1leHRlbnNpb24tY2FyZD4uaW5mby1jb250YWluZXI+LnRvcD4ubmFtZS1jb250YWluZXJ7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtnYXA6NHB4O3dpZHRoOjEwMCV9LmFjb3JkLS1zdG9yZS1leHRlbnNpb24tY2FyZD4uaW5mby1jb250YWluZXI+LnRvcD4ubmFtZS1jb250YWluZXI+Lm5hbWV7Zm9udC1zaXplOjE2cHg7Zm9udC13ZWlnaHQ6NTAwO2NvbG9yOnZhcigtLWhlYWRlci1wcmltYXJ5KX0uYWNvcmQtLXN0b3JlLWV4dGVuc2lvbi1jYXJkPi5pbmZvLWNvbnRhaW5lcj4udG9wPi5uYW1lLWNvbnRhaW5lcj4udmVyc2lvbntmb250LXNpemU6MTJweDtmb250LXdlaWdodDo1MDA7Y29sb3I6dmFyKC0taGVhZGVyLXByaW1hcnkpO29wYWNpdHk6LjV9LmFjb3JkLS1zdG9yZS1leHRlbnNpb24tY2FyZD4uaW5mby1jb250YWluZXI+LnRvcD4uZGVzY3JpcHRpb257Zm9udC1zaXplOjE0cHg7Zm9udC13ZWlnaHQ6MzAwO2NvbG9yOnZhcigtLWhlYWRlci1wcmltYXJ5KTtvcGFjaXR5Oi43NTt3aWR0aDoxMDAlfS5hY29yZC0tc3RvcmUtZXh0ZW5zaW9uLWNhcmQ+LmluZm8tY29udGFpbmVyPi5ib3R0b217ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmZsZXgtc3RhcnQ7anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47aGVpZ2h0OjEwMCV9LmFjb3JkLS1zdG9yZS1leHRlbnNpb24tY2FyZD4uaW5mby1jb250YWluZXI+LmJvdHRvbT4ubGVmdHtoZWlnaHQ6MTAwJTtkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1uO2FsaWduLWl0ZW1zOmZsZXgtc3RhcnQ7anVzdGlmeS1jb250ZW50OmZsZXgtZW5kfS5hY29yZC0tc3RvcmUtZXh0ZW5zaW9uLWNhcmQ+LmluZm8tY29udGFpbmVyPi5ib3R0b20+LmxlZnQ+LmF1dGhvcnN7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOmNvbHVtbjtnYXA6NHB4fS5hY29yZC0tc3RvcmUtZXh0ZW5zaW9uLWNhcmQ+LmluZm8tY29udGFpbmVyPi5ib3R0b20+LmxlZnQ+LmF1dGhvcnMgLmF1dGhvcntkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2JvcmRlci1yYWRpdXM6OTk5OXB4O2JhY2tncm91bmQtY29sb3I6cmdiYSgwLDAsMCwuMSk7Y3Vyc29yOnBvaW50ZXJ9LmFjb3JkLS1zdG9yZS1leHRlbnNpb24tY2FyZD4uaW5mby1jb250YWluZXI+LmJvdHRvbT4ubGVmdD4uYXV0aG9ycyAuYXV0aG9yPi5pbWFnZXtib3JkZXItcmFkaXVzOjUwJTt3aWR0aDoxOHB4O2hlaWdodDoxOHB4O2JhY2tncm91bmQtY29sb3I6dmFyKC0tYnJhbmQtNTAwKTtiYWNrZ3JvdW5kLXBvc2l0aW9uOmNlbnRlcjtiYWNrZ3JvdW5kLXNpemU6Y292ZXJ9LmFjb3JkLS1zdG9yZS1leHRlbnNpb24tY2FyZD4uaW5mby1jb250YWluZXI+LmJvdHRvbT4ubGVmdD4uYXV0aG9ycyAuYXV0aG9yPi5uYW1le2ZvbnQtc2l6ZToxMHB4O2ZvbnQtd2VpZ2h0OjQwMDtjb2xvcjp2YXIoLS1oZWFkZXItcHJpbWFyeSk7b3BhY2l0eTouNzU7cGFkZGluZzo2cHh9LmFjb3JkLS1zdG9yZS1leHRlbnNpb24tY2FyZD4uaW5mby1jb250YWluZXI+LmJvdHRvbT4ucmlnaHR7aGVpZ2h0OjEwMCU7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOmNvbHVtbjthbGlnbi1pdGVtczpmbGV4LWVuZDtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1lbmR9YDtcbiIsICJpbXBvcnQgbW9kYWxzIGZyb20gXCIuLi8uLi8uLi8uLi8uLi8uLi9hcGkvdWkvbW9kYWxzLmpzeFwiO1xyXG5pbXBvcnQgaTE4biBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vLi4vYXBpL2kxOG4vaW5kZXguanNcIjtcclxuaW1wb3J0IHBhdGNoZXIgZnJvbSBcIi4uLy4uLy4uLy4uLy4uLy4uL2FwaS9wYXRjaGVyL2luZGV4LmpzXCI7XHJcblxyXG5pbXBvcnQgY3NzVGV4dCBmcm9tIFwiLi9zdHlsZS5zY3NzXCI7XHJcbmltcG9ydCB7IGdldExvY2FsaXplZCB9IGZyb20gXCIuLi8uLi8uLi8uLi8uLi8uLi9vdGhlci91dGlscy5qc1wiO1xyXG5wYXRjaGVyLmluamVjdENTUyhjc3NUZXh0KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAvKiogQHBhcmFtIHtpbXBvcnQoXCJ2dWVcIikuQXBwfSB2dWVBcHAgKi9cclxuICBsb2FkKHZ1ZUFwcCkge1xyXG4gICAgdnVlQXBwLmNvbXBvbmVudChcclxuICAgICAgXCJzdG9yZS1leHRlbnNpb24tY2FyZFwiLFxyXG4gICAgICB7XHJcbiAgICAgICAgdGVtcGxhdGU6IGBcclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJhY29yZC0tc3RvcmUtZXh0ZW5zaW9uLWNhcmRcIj5cclxuICAgICAgICAgICAgPGRpdiB2LWlmPVwiZXh0ZW5zaW9uLnByZXZpZXdzPy5sZW5ndGhcIiBjbGFzcz1cInByZXZpZXdcIiA6c3R5bGU9XCJ7IGJhY2tncm91bmRJbWFnZTogJ3VybCgnICsgZXh0ZW5zaW9uLnByZXZpZXdzW3NlbGVjdGVkUHJldmlld10uaW1hZ2UgKyAnKScgfVwiPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250cm9sc1wiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdvIGdvLWJhY2tcIiBAY2xpY2s9XCJnb0JhY2tcIj5cclxuICAgICAgICAgICAgICAgICAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMTEuODI4IDEybDIuODI5IDIuODI4LTEuNDE0IDEuNDE1TDkgMTJsNC4yNDMtNC4yNDMgMS40MTQgMS40MTVMMTEuODI4IDEyelwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIiAvPlxyXG4gICAgICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdvIGdvLWZvcndhcmRcIiBAY2xpY2s9XCJnb0ZvcndhcmRcIj5cclxuICAgICAgICAgICAgICAgICAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMTIuMTcyIDEyTDkuMzQzIDkuMTcybDEuNDE0LTEuNDE1TDE1IDEybC00LjI0MyA0LjI0My0xLjQxNC0xLjQxNXpcIiBmaWxsPVwiY3VycmVudENvbG9yXCIgLz5cclxuICAgICAgICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibmFtZS1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJuYW1lXCI+XHJcbiAgICAgICAgICAgICAgICAgIHt7IGV4dGVuc2lvbi5wcmV2aWV3c1tzZWxlY3RlZFByZXZpZXddLm5hbWUgfX1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiB2LWVsc2UgY2xhc3M9XCJwcmV2aWV3IG5vLXByZXZpZXdcIj48L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImluZm8tY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRvcFwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm5hbWUtY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJuYW1lXCI+e3sgZ2V0TG9jYWxpemVkKGV4dGVuc2lvbi5uYW1lKSB9fTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidmVyc2lvblwiPnZ7eyBleHRlbnNpb24udmVyc2lvbiB9fTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGVzY3JpcHRpb25cIj57eyBnZXRMb2NhbGl6ZWQoZXh0ZW5zaW9uLmRlc2NyaXB0aW9uKSB9fTwvZGl2PlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJib3R0b21cIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsZWZ0XCI+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhdXRob3JzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiB2LWZvcj1cImF1dGhvciBpbiBleHRlbnNpb24uYXV0aG9yc1wiIGNsYXNzPVwiYXV0aG9yXCIgOmtleT1cImF1dGhvci5uYW1lXCIgQGNsaWNrPVwic2hvd1Byb2ZpbGUoYXV0aG9yLmlkKVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImltYWdlXCIgOnN0eWxlPVwieyBiYWNrZ3JvdW5kSW1hZ2U6ICd1cmwoJyArIGF1dGhvci5pbWFnZSArICcpJyB9XCI+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibmFtZVwiPnt7IGF1dGhvci5uYW1lIH19PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicmlnaHRcIj5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJ1dHRvbnNcIj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBAY2xpY2s9XCJpbnN0YWxsT3JVbmluc3RhbGxcIj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxkaXNjb3JkLWJ1dHRvbiA6dmFsdWU9XCJpMThuRm9ybWF0KGV4dGVuc2lvbi5pbnN0YWxsZWQgPyAnVU5JTlNUQUxMJyA6ICdJTlNUQUxMJylcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICBgLFxyXG4gICAgICAgIHByb3BzOiBbXCJleHRlbnNpb25cIl0sXHJcbiAgICAgICAgZGF0YSgpIHtcclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHNlbGVjdGVkUHJldmlldzogMCxcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgfSxcclxuICAgICAgICBtZXRob2RzOiB7XHJcbiAgICAgICAgICBnZXRMb2NhbGl6ZWQsXHJcbiAgICAgICAgICBpMThuRm9ybWF0OiBpMThuLmZvcm1hdCxcclxuICAgICAgICAgIGluc3RhbGxPclVuaW5zdGFsbCgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZXh0ZW5zaW9uLmluc3RhbGxlZCkge1xyXG4gICAgICAgICAgICAgIC8vIHVuaW5zdGFsbFxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIC8vIGluc3RhbGxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGdvQmFjaygpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFByZXZpZXctLTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRQcmV2aWV3IDwgMCkgdGhpcy5zZWxlY3RlZFByZXZpZXcgPSB0aGlzLmV4dGVuc2lvbi5wcmV2aWV3cy5sZW5ndGggLSAxO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGdvRm9yd2FyZCgpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFByZXZpZXcrKztcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRQcmV2aWV3ID49IHRoaXMuZXh0ZW5zaW9uLnByZXZpZXdzLmxlbmd0aCkgdGhpcy5zZWxlY3RlZFByZXZpZXcgPSAwO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHNob3dQcm9maWxlKHByb2ZpbGVJZCkge1xyXG4gICAgICAgICAgICBtb2RhbHMuc2hvdy51c2VyKHByb2ZpbGVJZCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICApXHJcbiAgfVxyXG59IiwgImltcG9ydCBpbnN0YWxsZWRFeHRlbnNpb25zUGFnZSBmcm9tIFwiLi4vcGFnZXMvaW5zdGFsbGVkLWV4dGVuc2lvbnMtcGFnZS9pbmRleC5qc1wiXHJcbmltcG9ydCBzdG9yZUV4dGVuc2lvbkNhcmQgZnJvbSBcIi4vc3RvcmUtZXh0ZW5zaW9uLWNhcmQvaW5kZXguanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAvKiogQHBhcmFtIHtpbXBvcnQoXCJ2dWVcIikuQXBwfSB2dWVBcHAgKi9cclxuICBsb2FkKHZ1ZUFwcCkge1xyXG4gICAgaW5zdGFsbGVkRXh0ZW5zaW9uc1BhZ2UubG9hZCh2dWVBcHApO1xyXG4gICAgc3RvcmVFeHRlbnNpb25DYXJkLmxvYWQodnVlQXBwKTtcclxuICB9XHJcbn0iLCAiaW1wb3J0IHBhZ2VzIGZyb20gXCIuL3BhZ2VzL2luZGV4LmpzXCI7XHJcbmltcG9ydCBjb21wb25lbnRzIGZyb20gXCIuL2NvbXBvbmVudHMvaW5kZXguanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAvKiogQHBhcmFtIHtpbXBvcnQoXCJ2dWVcIikuQXBwfSB2dWVBcHAgKi9cclxuICBsb2FkKHZ1ZUFwcCkge1xyXG4gICAgY29tcG9uZW50cy5sb2FkKHZ1ZUFwcCk7XHJcbiAgICBwYWdlcy5sb2FkKHZ1ZUFwcCk7XHJcbiAgfVxyXG59IiwgImltcG9ydCBkb20gZnJvbSBcIi4uLy4uL2FwaS9kb20vaW5kZXguanNcIjtcclxuaW1wb3J0IHdlYnBhY2sgZnJvbSBcIi4uLy4uL2FwaS9tb2R1bGVzL3dlYnBhY2suanNcIjtcclxuaW1wb3J0IHBhdGNoZXIgZnJvbSBcIi4uLy4uL2FwaS9wYXRjaGVyL2luZGV4LmpzXCI7XHJcbmltcG9ydCB1dGlscyBmcm9tIFwiLi4vLi4vYXBpL3V0aWxzL2luZGV4LmpzXCI7XHJcbmltcG9ydCBpMThuIGZyb20gXCIuLi8uLi9hcGkvaTE4bi9pbmRleC5qc1wiO1xyXG5pbXBvcnQgdWkgZnJvbSBcIi4uLy4uL2FwaS91aS9pbmRleC5qc1wiO1xyXG5cclxuaW1wb3J0IGNzc1RleHQgZnJvbSBcIi4vc3R5bGUuc2Nzc1wiO1xyXG5pbXBvcnQgdnVlQ29tcG9uZW50cyBmcm9tIFwiLi92dWUvY29tcG9uZW50cy9pbmRleC5qc1wiO1xyXG5wYXRjaGVyLmluamVjdENTUyhjc3NUZXh0KTtcclxuXHJcbntcclxuICBsZXQgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcclxuICBzY3JpcHQuc3JjID0gXCJodHRwczovL3VucGtnLmNvbS92dWVAMy9kaXN0L3Z1ZS5nbG9iYWwuanNcIjtcclxuICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XHJcbn1cclxuXHJcbmRvbS5wYXRjaCgnYVtocmVmPVwiL3N0b3JlXCJdW2RhdGEtbGlzdC1pdGVtLWlkJD1cIl9fX25pdHJvXCJdJywgKGVsbSkgPT4ge1xyXG4gIHV0aWxzLmlmRXhpc3RzKFxyXG4gICAgZWxtLnF1ZXJ5U2VsZWN0b3IoJ1tjbGFzcyo9XCJuYW1lQW5kRGVjb3JhdG9ycy1cIl0gW2NsYXNzKj1cIm5hbWUtXCJdJyksXHJcbiAgICAobmFtZUVsbSkgPT4ge1xyXG4gICAgICBuYW1lRWxtLnRleHRDb250ZW50ID0gaTE4bi5mb3JtYXQoXCJBUFBfTkFNRVwiKTtcclxuICAgIH1cclxuICApO1xyXG5cclxuICB1dGlscy5pZkV4aXN0cyhcclxuICAgIGVsbS5xdWVyeVNlbGVjdG9yKCdbY2xhc3MqPVwiYXZhdGFyV2l0aFRleHQtXCJdIFtjbGFzcyo9XCJhdmF0YXItXCJdIHN2ZycpLFxyXG4gICAgZmlsbFNWR0VsbVdpdGhBY29yZExvZ29cclxuICApO1xyXG59KTtcclxuXHJcbmxldCBpbnRlcm5hbFZ1ZUFwcCA9IG51bGw7XHJcblxyXG5jb25zdCBoZWFkZXJJdGVtQ2xhc3NlcyA9IHdlYnBhY2suZmluZEJ5UHJvcGVydGllcyhcImRpdmlkZXJcIiwgXCJoYW1idXJnZXJcIiwgXCJ0aGVtZWRcIik7XHJcbmNvbnN0IHRhYkJhckNsYXNzZXMgPSB3ZWJwYWNrLmZpbmRCeVByb3BlcnRpZXMoXCJ0YWJCYXJcIiwgXCJtYXhXaWR0aFdpdGhUb29sYmFyXCIpO1xyXG5jb25zdCBoZWFkZXJDbGFzc2VzID0gd2VicGFjay5maW5kQnlQcm9wZXJ0aWVzKFwidG9wUGlsbFwiLCBcImhlYWRlclRleHRcIik7XHJcbmRvbS5wYXRjaCgnW2NsYXNzKj1cImFwcGxpY2F0aW9uU3RvcmUtXCJdIFtjbGFzcyo9XCJob21lV3JhcHBlck5vcm1hbC1cIl0nLCAoZWxtKSA9PiB7XHJcbiAgdXRpbHMuaWZFeGlzdHMoXHJcbiAgICBlbG0ucXVlcnlTZWxlY3RvcignW2NsYXNzKj1cImhlYWRlckJhci1cIl0gW2NsYXNzKj1cInRpdGxlV3JhcHBlci1cIl0gW2NsYXNzKj1cInRpdGxlLVwiXScpLFxyXG4gICAgKHRpdGxlRWxtKSA9PiB7XHJcbiAgICAgIHRpdGxlRWxtLnRleHRDb250ZW50ID0gaTE4bi5mb3JtYXQoXCJBUFBfTkFNRVwiKTtcclxuXHJcbiAgICAgIGlmIChpbnRlcm5hbFZ1ZUFwcCkge1xyXG4gICAgICAgIGxldCBjb250YWluZXIgPSBkb20ucGFyZW50cyh0aXRsZUVsbSwgMikucG9wKCk7XHJcblxyXG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChcclxuICAgICAgICAgIGRvbS5wYXJzZShgPGRpdiBjbGFzcz1cIiR7aGVhZGVySXRlbUNsYXNzZXMuZGl2aWRlcn1cIj48L2Rpdj5gKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIGNvbnN0IGJ1dHRvbnNDb250YWluZXIgPSBkb20ucGFyc2UoYFxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cIiR7dGFiQmFyQ2xhc3Nlcy50YWJCYXJ9ICR7aGVhZGVyQ2xhc3Nlcy50b3BQaWxsfVwiPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgYCk7XHJcblxyXG4gICAgICAgIGxldCBidXR0b25zID0gW107XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGJ1aWxkQnV0dG9uKGlkLCB0ZXh0LCBjdXN0b21DbGFzc2VzID0gXCJcIikge1xyXG4gICAgICAgICAgbGV0IGVsbSA9IGRvbS5wYXJzZShgPGRpdiBpZD1cInRhYi1idXR0b24tJHtpZH1cIiBjbGFzcz1cImFjb3JkLS10YWJzLXRhYi1idXR0b24gJHtjdXN0b21DbGFzc2VzfSAke3RhYkJhckNsYXNzZXMuaXRlbX0gJHtoZWFkZXJDbGFzc2VzLml0ZW19ICR7aGVhZGVyQ2xhc3Nlcy50aGVtZWR9XCI+JHt0ZXh0fTwvZGl2PmApO1xyXG5cclxuICAgICAgICAgIGJ1dHRvbnMucHVzaChlbG0pO1xyXG5cclxuICAgICAgICAgIGVsbS5zZXRTZWxlY3RlZCA9IChzKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzKSBlbG0uY2xhc3NMaXN0LmFkZChoZWFkZXJDbGFzc2VzLnNlbGVjdGVkLCBcInNlbGVjdGVkXCIpO1xyXG4gICAgICAgICAgICBlbHNlIGVsbS5jbGFzc0xpc3QucmVtb3ZlKGhlYWRlckNsYXNzZXMuc2VsZWN0ZWQsIFwic2VsZWN0ZWRcIik7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgZWxtLnNldFNlbGVjdGVkKGludGVybmFsVnVlQXBwLnNlbGVjdGVkVGFiID09PSBpZCk7XHJcblxyXG4gICAgICAgICAgZWxtLm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGJ1dHRvbnMuZm9yRWFjaCgoYikgPT4gYi5zZXRTZWxlY3RlZChmYWxzZSkpO1xyXG4gICAgICAgICAgICBlbG0uc2V0U2VsZWN0ZWQodHJ1ZSk7XHJcbiAgICAgICAgICAgIGludGVybmFsVnVlQXBwLnNlbGVjdGVkVGFiID0gaWQ7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gZWxtO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYnV0dG9uc0NvbnRhaW5lci5hcHBlbmRDaGlsZChidWlsZEJ1dHRvbihcImhvbWVcIiwgaTE4bi5mb3JtYXQoXCJIT01FXCIpKSk7XHJcbiAgICAgICAgYnV0dG9uc0NvbnRhaW5lci5hcHBlbmRDaGlsZChidWlsZEJ1dHRvbihcImluc3RhbGxlZC1leHRlbnNpb25zXCIsIGkxOG4uZm9ybWF0KFwiSU5TVEFMTEVEX0VYVEVOU0lPTlNcIikpKTtcclxuICAgICAgICBidXR0b25zQ29udGFpbmVyLmFwcGVuZENoaWxkKGJ1aWxkQnV0dG9uKFwic2V0dGluZ3NcIiwgaTE4bi5mb3JtYXQoXCJTRVRUSU5HU1wiKSkpO1xyXG4gICAgICAgIGJ1dHRvbnNDb250YWluZXIuYXBwZW5kQ2hpbGQoYnVpbGRCdXR0b24oXCJzdG9yZVwiLCBpMThuLmZvcm1hdChcIkVYVEVOU0lPTl9TVE9SRVwiKSwgXCJzdG9yZS10YWItYnV0dG9uXCIpKTtcclxuXHJcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGJ1dHRvbnNDb250YWluZXIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgKTtcclxuICB1dGlscy5pZkV4aXN0cyhcclxuICAgIGVsbS5xdWVyeVNlbGVjdG9yKCdbY2xhc3MqPVwiaGVhZGVyQmFyLVwiXSBbY2xhc3MqPVwiaWNvbldyYXBwZXItXCJdIFtjbGFzcyo9XCJpY29uLVwiXScpLFxyXG4gICAgZmlsbFNWR0VsbVdpdGhBY29yZExvZ29cclxuICApO1xyXG59KTtcclxuXHJcbmZ1bmN0aW9uIGZpbGxTVkdFbG1XaXRoQWNvcmRMb2dvKHN2Z0VsbSkge1xyXG4gIHN2Z0VsbS5zZXRBdHRyaWJ1dGUoXCJ2aWV3Qm94XCIsIFwiMCAwIDgxMy41IDE0OTNcIik7XHJcbiAgc3ZnRWxtLnNldEF0dHJpYnV0ZShcInhtbG5zXCIsIFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIik7XHJcbiAgc3ZnRWxtLmlubmVySFRNTCA9IGBcclxuICAgIDxkZWZzPlxyXG4gICAgICA8c3R5bGU+XHJcbiAgICAgICAgLmFjb3JkLS1sb2dvLWNvbG9yIHtcclxuICAgICAgICAgIGZpbGw6IGN1cnJlbnRDb2xvcjtcclxuICAgICAgICAgIGZpbGwtcnVsZTogZXZlbm9kZDtcclxuICAgICAgICB9XHJcbiAgICAgIDwvc3R5bGU+XHJcbiAgICA8L2RlZnM+XHJcbiAgICA8Zz5cclxuICAgICAgPHBhdGggY2xhc3M9XCJhY29yZC0tbG9nby1jb2xvclwiIGQ9XCJNODE3LjI2NiwxMzIyLjVoMjg1djM2NWgtMjg1di0zNjVaXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKC01NTMuMjUgLTIxMy41KVwiLz5cclxuICAgICAgPHBhdGggY2xhc3M9XCJhY29yZC0tbG9nby1jb2xvclwiIGQ9XCJNNTU1LjIzNSwxNTIzLjc4czkxLjE2OS0zMTkuODUsOTIuNTMxLTMxOS4yOGMxMTQuNyw0Ny44MywxNjAsMTkyLDE2MCwxOTJsLTUyLjEyLDE4Ni42MXMtMzEuMTI5LDEzNy43MS04MC44OCwxMjAuMzlDNTI4LjAyNiwxNjUyLjQyLDU1NS4yMzUsMTUyMy43OCw1NTUuMjM1LDE1MjMuNzhaXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKC01NTMuMjUgLTIxMy41KVwiLz5cclxuICAgICAgPHBhdGggY2xhc3M9XCJhY29yZC0tbG9nby1jb2xvclwiIGQ9XCJNMTM2NC43NywxNTI1LjI4cy05MS4xNy0zMTkuODUtOTIuNTQtMzE5LjI4Yy0xMTQuNyw0Ny44My0xNjAsMTkyLTE2MCwxOTJsNTIuMTIsMTg2LjYxczMxLjEzLDEzNy43MSw4MC44OCwxMjAuMzlDMTM5MS45NywxNjUzLjkyLDEzNjQuNzcsMTUyNS4yOCwxMzY0Ljc3LDE1MjUuMjhaXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKC01NTMuMjUgLTIxMy41KVwiLz5cclxuICAgIDwvZz5cclxuICAgIDxwYXRoIGNsYXNzPVwiYWNvcmQtLWxvZ28tY29sb3JcIiBkPVwiTTg3NC43NjYsMjc1LjVzMTQuNTc5LTYxLjkxOCw4Ny02MmM4MC44MjQtLjA5Miw4Nyw2Miw4Nyw2MnMxOTkuNDMsODUxLjQ3LDE5OCw4NTJjLTIxMC4zMyw3Ny43MS0xNDYsMTgwLTE0NiwxODBoLTI4MXM2My43LTEwMy44Mi0xNDYtMTgxQzY3MS4wMTQsMTEyNS40OSw4NzQuNzY2LDI3NS41LDg3NC43NjYsMjc1LjVaXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKC01NTMuMjUgLTIxMy41KVwiLz5cclxuICAgIDxnPlxyXG4gICAgICA8cGF0aCBjbGFzcz1cImFjb3JkLS1sb2dvLWNvbG9yXCIgZD1cIk0xMjM4LjE0LDg5Ny41YTUzLjg4Miw1My44ODIsMCwwLDEsNTMuODgsNTMuODc1YzAsMjQuOTM5LTIwLjI1LDQ2Ljk4Ny00My4yNSw1My4xMjUtNC40NSwxLjE4LTEwLjE5LTM5LTExLTM5LTAuNTgsMC0yNy43MSwzLjUxLTMxLDQtNS41OC44MjgtMTEuOTMtMTMuODc2LTQtMjAsMS45My0xLjQ5MSwyNi42Mi02Ljk1OSwyOS03LDAuNjItLjAxMS03LjM0LTQxLjYxOC03LTQzQzEyMjUuNjQsODk1Ljk0NCwxMjMzLjUyLDg5Ny41LDEyMzguMTQsODk3LjVaXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKC01NTMuMjUgLTIxMy41KVwiLz5cclxuICAgICAgPHBhdGggY2xhc3M9XCJhY29yZC0tbG9nby1jb2xvclwiIGQ9XCJNMTE3My42NCw2MzIuNWE1My44ODIsNTMuODgyLDAsMCwxLDUzLjg4LDUzLjg3NWMwLDI0LjkzOS0yMC4yNSw0Ni45ODctNDMuMjUsNTMuMTI1LTQuNDUsMS4xODUtMTAuMTktMzktMTEtMzktMC41OCwwLTI3LjcxLDMuNTEtMzEsNC01LjU4LjgyOC0xMS45My0xMy44NzYtNC0yMCwxLjkzLTEuNDkxLDI2LjYyLTYuOTU5LDI5LTcsMC42Mi0uMDExLTcuMzQtNDEuNjE4LTctNDNDMTE2MS4xNCw2MzAuOTQ0LDExNjkuMDIsNjMyLjUsMTE3My42NCw2MzIuNVpcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoLTU1My4yNSAtMjEzLjUpXCIvPlxyXG4gICAgICA8cGF0aCBjbGFzcz1cImFjb3JkLS1sb2dvLWNvbG9yXCIgZD1cIk0xMTE1LjE2LDM3M2E1My44NzQsNTMuODc0LDAsMCwxLDUzLjg3LDUzLjg3NWMwLDI0LjkzOS0yMC4yNCw0Ni45ODctNDMuMjUsNTMuMTI1LTQuNDQsMS4xODUtMTAuMTgtMzktMTEtMzktMC41OCwwLTI3LjcsMy41MS0zMSw0LTUuNTcuODI4LTExLjkyLTEzLjg3Ni00LTIwLDEuOTMtMS40OTEsMjYuNjItNi45NTksMjktNywwLjYyLS4wMTEtNy4zNC00MS42MTgtNy00M0MxMTAyLjY1LDM3MS40NDQsMTExMC41MywzNzMsMTExNS4xNiwzNzNaXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKC01NTMuMjUgLTIxMy41KVwiLz5cclxuICAgIDwvZz5cclxuICAgIDxnPlxyXG4gICAgICA8cGF0aCBjbGFzcz1cImFjb3JkLS1sb2dvLWNvbG9yXCIgZD1cIk02ODMuOTIyLDg5Ny43NWE1My44NzUsNTMuODc1LDAsMCwwLTUzLjg3NSw1My44NzVjMCwyNC45MzksMjAuMjQ1LDQ2Ljk4Nyw0My4yNSw1My4xMjUsNC40NDEsMS4xOCwxMC4xODUtMzksMTEtMzksMC41NzYsMCwyNy43LDMuNTEsMzEsNCw1LjU3MiwwLjgyOCwxMS45MjYtMTMuODc2LDQtMjAtMS45My0xLjQ5MS0yNi42MjEtNi45NTktMjktNy0wLjYyLS4wMTEsNy4zMzktNDEuNjE4LDctNDNDNjk2LjQyNCw4OTYuMTk0LDY4OC41NDQsODk3Ljc1LDY4My45MjIsODk3Ljc1WlwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgtNTUzLjI1IC0yMTMuNSlcIi8+XHJcbiAgICAgIDxwYXRoIGNsYXNzPVwiYWNvcmQtLWxvZ28tY29sb3JcIiBkPVwiTTc0OC40MjIsNjMyLjc1YTUzLjg3NSw1My44NzUsMCwwLDAtNTMuODc1LDUzLjg3NWMwLDI0LjkzOSwyMC4yNDUsNDYuOTg3LDQzLjI1LDUzLjEyNSw0LjQ0MSwxLjE4NSwxMC4xODUtMzksMTEtMzksMC41NzYsMCwyNy43LDMuNTEsMzEsNCw1LjU3MiwwLjgyOCwxMS45MjYtMTMuODc2LDQtMjAtMS45My0xLjQ5MS0yNi42MjEtNi45NTktMjktNy0wLjYyLS4wMTEsNy4zMzktNDEuNjE4LDctNDNDNzYwLjkyNCw2MzEuMTk0LDc1My4wNDQsNjMyLjc1LDc0OC40MjIsNjMyLjc1WlwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgtNTUzLjI1IC0yMTMuNSlcIi8+XHJcbiAgICAgIDxwYXRoIGNsYXNzPVwiYWNvcmQtLWxvZ28tY29sb3JcIiBkPVwiTTgwNi45MDYsMzczLjI1YTUzLjg3NSw1My44NzUsMCwwLDAtNTMuODc1LDUzLjg3NWMwLDI0LjkzOSwyMC4yNDUsNDYuOTg3LDQzLjI1LDUzLjEyNSw0LjQ0MiwxLjE4NSwxMC4xODUtMzksMTEtMzksMC41NzcsMCwyNy43LDMuNTEsMzEsNCw1LjU3MiwwLjgyOCwxMS45MjYtMTMuODc2LDQtMjAtMS45My0xLjQ5MS0yNi42MjEtNi45NTktMjktNy0wLjYyLS4wMTEsNy4zMzktNDEuNjE4LDctNDNDODE5LjQwOSwzNzEuNjk0LDgxMS41MjgsMzczLjI1LDgwNi45MDYsMzczLjI1WlwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgtNTUzLjI1IC0yMTMuNSlcIi8+XHJcbiAgICA8L2c+XHJcbiAgYDtcclxufVxyXG5cclxuXHJcbihhc3luYyAoKSA9PiB7XHJcbiAgYXdhaXQgdWkudnVlLnJlYWR5LndoZW4oKTtcclxuXHJcbiAgY29uc3QgYmFzZVZ1ZUVsbSA9IGRvbS5wYXJzZShgXHJcbiAgICA8ZGl2IGNsYXNzPVwiYWNvcmQtLXRhYnMtY29udGVudC1jb250YWluZXJcIj5cclxuICAgICAgPGRpdiB2LWlmPVwic2VsZWN0ZWRUYWIgPT09ICdob21lJ1wiIGNsYXNzPVwidGFiXCI+XHJcbiAgICAgICAgPGhvbWUtcGFnZSAvPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiB2LWlmPVwic2VsZWN0ZWRUYWIgPT09ICdpbnN0YWxsZWQtZXh0ZW5zaW9ucydcIiBjbGFzcz1cInRhYlwiPlxyXG4gICAgICAgIDxpbnN0YWxsZWQtZXh0ZW5zaW9ucy1wYWdlIC8+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IHYtaWY9XCJzZWxlY3RlZFRhYiA9PT0gJ3N0b3JlJ1wiIGNsYXNzPVwidGFiXCI+XHJcbiAgICAgICAgPHN0b3JlLXBhZ2UgLz5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgdi1pZj1cInNlbGVjdGVkVGFiID09PSAnc2V0dGluZ3MnXCIgY2xhc3M9XCJ0YWJcIj5cclxuICAgICAgICA8c2V0dGluZ3MtcGFnZSAvPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIGApO1xyXG5cclxuICAvKiogQHR5cGUge2ltcG9ydChcInZ1ZVwiKS5BcHB9ICovXHJcbiAgY29uc3QgdnVlQXBwID0gVnVlLmNyZWF0ZUFwcCh7XHJcbiAgICBkYXRhKCkge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHNlbGVjdGVkVGFiOiBcImhvbWVcIlxyXG4gICAgICB9O1xyXG4gICAgfSxcclxuICAgIG1vdW50ZWQoKSB7XHJcbiAgICAgIGludGVybmFsVnVlQXBwID0gdGhpcztcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgdWkudnVlLmNvbXBvbmVudHMubG9hZCh2dWVBcHApO1xyXG4gIHZ1ZUNvbXBvbmVudHMubG9hZCh2dWVBcHApO1xyXG4gIHZ1ZUFwcC5tb3VudChiYXNlVnVlRWxtKTtcclxuXHJcbiAgZG9tLnBhdGNoKCdbY2xhc3MqPVwiYXBwbGljYXRpb25TdG9yZS1cIl0gW2NsYXNzKj1cInNjcm9sbGVyQmFzZS1cIl0gW2NsYXNzKj1cInN1YnNjcmlwdGlvbnNSZWRpcmVjdENvbnRhaW5lci1cIl0nLCAoZWxtKSA9PiB7XHJcbiAgICAvKiogQHR5cGUge0hUTUxEaXZFbGVtZW50fSAqL1xyXG4gICAgbGV0IGNvbnRhaW5lckVsbSA9IGRvbS5wYXJlbnRzKGVsbSwgNCkucG9wKCk7XHJcbiAgICBjb250YWluZXJFbG0ucmVwbGFjZUNoaWxkcmVuKGJhc2VWdWVFbG0pO1xyXG4gIH0pO1xyXG59KSgpO1xyXG5cclxuXHJcblxyXG5cclxuIiwgIlxyXG4oYXN5bmMgKCkgPT4ge1xyXG4gIC8qKiBAdHlwZSB7U1ZHRWxlbWVudH0gKi9cclxuICBsZXQgc3ZnRWxtO1xyXG4gIHdoaWxlICh0cnVlKSB7XHJcbiAgICBzdmdFbG0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbY2xhc3MqPVwid29yZG1hcmstXCJdIHN2ZycpO1xyXG4gICAgaWYgKHN2Z0VsbSkgYnJlYWs7XHJcbiAgICBhd2FpdCBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgMTAwKSk7XHJcbiAgfVxyXG5cclxuICBzdmdFbG0uaW5uZXJIVE1MID0gYDxwYXRoIGQ9XCJNNi44NjQgMTBMNi40MzIgOC45NTZIMy4wNDhMMi41NDQgMTBIMC4xMDhMMy45NDggMS41NjRINi4wNDhMOS43MiAxMEg2Ljg2NFpNNC43NCA0Ljc4TDMuOTEyIDYuNzk2SDUuNThMNC43NCA0Ljc4Wk0xNS41MDQ1IDYuMzI4QzE1LjM0NDUgNi4yMjQgMTUuMTkyNSA2LjEzMiAxNS4wNDg1IDYuMDUyQzE0LjkwNDUgNS45NjQgMTQuNzU2NSA1Ljg5MiAxNC42MDQ1IDUuODM2QzE0LjQ1MjUgNS43NzIgMTQuMjkyNSA1LjcyNCAxNC4xMjQ1IDUuNjkyQzEzLjk2NDUgNS42NiAxMy43ODQ1IDUuNjQ0IDEzLjU4NDUgNS42NDRDMTMuMzEyNSA1LjY0NCAxMy4wODA1IDUuNjggMTIuODg4NSA1Ljc1MkMxMi43MDQ1IDUuODI0IDEyLjU1NjUgNS45MiAxMi40NDQ1IDYuMDRDMTIuMzMyNSA2LjE2IDEyLjI0ODUgNi4yOTYgMTIuMTkyNSA2LjQ0OEMxMi4xNDQ1IDYuNiAxMi4xMjA1IDYuNzUyIDEyLjEyMDUgNi45MDRDMTIuMTIwNSA3LjA0OCAxMi4xNTI1IDcuMTkyIDEyLjIxNjUgNy4zMzZDMTIuMjgwNSA3LjQ3MiAxMi4zNzI1IDcuNTkyIDEyLjQ5MjUgNy42OTZDMTIuNjIwNSA3LjggMTIuNzcyNSA3Ljg4NCAxMi45NDg1IDcuOTQ4QzEzLjEyNDUgOC4wMTIgMTMuMzI4NSA4LjA0NCAxMy41NjA1IDguMDQ0QzEzLjcyODUgOC4wNDQgMTMuODg0NSA4LjAyOCAxNC4wMjg1IDcuOTk2QzE0LjE4MDUgNy45NjQgMTQuMzI4NSA3LjkxNiAxNC40NzI1IDcuODUyQzE0LjYyNDUgNy43ODggMTQuNzgwNSA3LjcxMiAxNC45NDA1IDcuNjI0QzE1LjEwODUgNy41MjggMTUuMjk2NSA3LjQyIDE1LjUwNDUgNy4zTDE2LjEyODUgOS4wNTJDMTUuNzY4NSA5LjM1NiAxNS4zNDQ1IDkuNjE2IDE0Ljg1NjUgOS44MzJDMTQuMzY4NSAxMC4wNCAxMy44NDA1IDEwLjE0NCAxMy4yNzI1IDEwLjE0NEMxMi43MzY1IDEwLjE0NCAxMi4yNDg1IDEwLjA4IDExLjgwODUgOS45NTJDMTEuMzc2NSA5LjgxNiAxMS4wMDQ1IDkuNjE2IDEwLjY5MjUgOS4zNTJDMTAuMzg4NSA5LjA4IDEwLjE1MjUgOC43NDQgOS45ODQ0NyA4LjM0NEM5LjgxNjQ3IDcuOTM2IDkuNzMyNDcgNy40NiA5LjczMjQ3IDYuOTE2QzkuNzMyNDcgNi4zNTYgOS44MjQ0NyA1Ljg3MiAxMC4wMDg1IDUuNDY0QzEwLjIwMDUgNS4wNTYgMTAuNDU2NSA0LjcyIDEwLjc3NjUgNC40NTZDMTEuMTA0NSA0LjE4NCAxMS40ODg1IDMuOTg0IDExLjkyODUgMy44NTZDMTIuMzY4NSAzLjcyIDEyLjg0MDUgMy42NTIgMTMuMzQ0NSAzLjY1MkMxNC4zMjA1IDMuNjUyIDE1LjE4NDUgMy45NDQgMTUuOTM2NSA0LjUyOEwxNS41MDQ1IDYuMzI4Wk0yMy4zOTE5IDYuODU2QzIzLjM5MTkgNy40MzIgMjMuMzExOSA3LjkyOCAyMy4xNTE5IDguMzQ0QzIyLjk5MTkgOC43NiAyMi43NTk5IDkuMTA0IDIyLjQ1NTkgOS4zNzZDMjIuMTU5OSA5LjY0IDIxLjc5OTkgOS44MzYgMjEuMzc1OSA5Ljk2NEMyMC45NTk5IDEwLjA4NCAyMC40OTU5IDEwLjE0NCAxOS45ODM5IDEwLjE0NEMxOS40ODc5IDEwLjE0NCAxOS4wMzE5IDEwLjA4IDE4LjYxNTkgOS45NTJDMTguMTk5OSA5LjgxNiAxNy44Mzk5IDkuNjEyIDE3LjUzNTkgOS4zNEMxNy4yMzE5IDkuMDY4IDE2Ljk5MTkgOC43MjggMTYuODE1OSA4LjMyQzE2LjY0NzkgNy45MDQgMTYuNTYzOSA3LjQxNiAxNi41NjM5IDYuODU2QzE2LjU2MzkgNi4yNzIgMTYuNjQ3OSA1Ljc3MiAxNi44MTU5IDUuMzU2QzE2Ljk5MTkgNC45NCAxNy4yMzE5IDQuNiAxNy41MzU5IDQuMzM2QzE3LjgzOTkgNC4wNzIgMTguMTk5OSAzLjg4IDE4LjYxNTkgMy43NkMxOS4wMzE5IDMuNjQgMTkuNDg3OSAzLjU4IDE5Ljk4MzkgMy41OEMyMC40OTU5IDMuNTggMjAuOTU5OSAzLjY0OCAyMS4zNzU5IDMuNzg0QzIxLjc5OTkgMy45MTIgMjIuMTU5OSA0LjExMiAyMi40NTU5IDQuMzg0QzIyLjc1OTkgNC42NDggMjIuOTkxOSA0Ljk4OCAyMy4xNTE5IDUuNDA0QzIzLjMxMTkgNS44MTIgMjMuMzkxOSA2LjI5NiAyMy4zOTE5IDYuODU2Wk0yMS4xMzU5IDYuODQ0QzIxLjEzNTkgNi41MjQgMjEuMDMxOSA2LjI1NiAyMC44MjM5IDYuMDRDMjAuNjIzOSA1LjgyNCAyMC4zNDM5IDUuNzE2IDE5Ljk4MzkgNS43MTZDMTkuNjIzOSA1LjcxNiAxOS4zNDM5IDUuODI0IDE5LjE0MzkgNi4wNEMxOC45NTE5IDYuMjQ4IDE4Ljg1NTkgNi41MTYgMTguODU1OSA2Ljg0NEMxOC44NTU5IDcuMTQ4IDE4Ljk1MTkgNy40MTYgMTkuMTQzOSA3LjY0OEMxOS4zNDM5IDcuODcyIDE5LjYyMzkgNy45ODQgMTkuOTgzOSA3Ljk4NEMyMC4zNDM5IDcuOTg0IDIwLjYyMzkgNy44NzIgMjAuODIzOSA3LjY0OEMyMS4wMzE5IDcuNDI0IDIxLjEzNTkgNy4xNTYgMjEuMTM1OSA2Ljg0NFpNMjguNjk0OCA2LjU4TDI4LjQ3ODggNi41OTJDMjguNDcwOCA2LjQwOCAyOC4zOTA4IDYuMjYgMjguMjM4OCA2LjE0OEMyOC4wODY4IDYuMDM2IDI3LjkyMjggNS45OCAyNy43NDY4IDUuOThDMjcuNTg2OCA1Ljk4IDI3LjQwNjggNi4wMjggMjcuMjA2OCA2LjEyNEMyNy4wMTQ4IDYuMjEyIDI2Ljg0MjggNi4zNDggMjYuNjkwOCA2LjUzMlYxMEgyNC4zMTQ4VjMuNzg0SDI2LjY5MDhWNC4zOTZDMjYuODgyOCA0LjIxMiAyNy4xMDI4IDQuMDQgMjcuMzUwOCAzLjg4QzI3LjYwNjggMy43MiAyNy45MTA4IDMuNjQgMjguMjYyOCAzLjY0QzI4LjMxODggMy42NCAyOC4zODY4IDMuNjQ0IDI4LjQ2NjggMy42NTJDMjguNTQ2OCAzLjY2IDI4LjYyNjggMy42NzIgMjguNzA2OCAzLjY4OEMyOC43ODY4IDMuNzA0IDI4Ljg2MjggMy43MjggMjguOTM0OCAzLjc2QzI5LjAwNjggMy43ODQgMjkuMDYyOCAzLjgxNiAyOS4xMDI4IDMuODU2TDI4LjY5NDggNi41OFpNMzQuMzkyOSAxMFY5LjU1NkMzNC4zMjA5IDkuNjI4IDM0LjIyMDkgOS42OTYgMzQuMDkyOSA5Ljc2QzMzLjk2NDkgOS44MjQgMzMuODI0OSA5Ljg4NCAzMy42NzI5IDkuOTRDMzMuNTIwOSA5Ljk5NiAzMy4zNjg5IDEwLjA0IDMzLjIxNjkgMTAuMDcyQzMzLjA3MjkgMTAuMTA0IDMyLjk0NDkgMTAuMTIgMzIuODMyOSAxMC4xMkMzMi40MjQ5IDEwLjEyIDMyLjAzMjkgMTAuMDU2IDMxLjY1NjkgOS45MjhDMzEuMjgwOSA5Ljc5MiAzMC45NDg5IDkuNTkyIDMwLjY2MDkgOS4zMjhDMzAuMzgwOSA5LjA1NiAzMC4xNTY5IDguNzI0IDI5Ljk4ODkgOC4zMzJDMjkuODIwOSA3LjkzMiAyOS43MzY5IDcuNDY4IDI5LjczNjkgNi45NEMyOS43MzY5IDYuMzggMjkuODE2OSA1Ljg5NiAyOS45NzY5IDUuNDg4QzMwLjE0NDkgNS4wOCAzMC4zNjg5IDQuNzQgMzAuNjQ4OSA0LjQ2OEMzMC45MzY5IDQuMTk2IDMxLjI3MjkgMy45OTYgMzEuNjU2OSAzLjg2OEMzMi4wNDA5IDMuNzMyIDMyLjQ0ODkgMy42NjQgMzIuODgwOSAzLjY2NEMzMi45Njg5IDMuNjY0IDMzLjA4MDkgMy42NzYgMzMuMjE2OSAzLjdDMzMuMzYwOSAzLjcxNiAzMy41MDQ5IDMuNzQ0IDMzLjY0ODkgMy43ODRDMzMuNzkyOSAzLjgxNiAzMy45Mjg5IDMuODYgMzQuMDU2OSAzLjkxNkMzNC4xOTI5IDMuOTcyIDM0LjI5NjkgNC4wMzIgMzQuMzY4OSA0LjA5NlYwLjg1NkgzNi43MDg5VjEwSDM0LjM5MjlaTTM0LjM2ODkgNi4wNjRDMzQuMzA0OSA2LjAxNiAzNC4yMjQ5IDUuOTcyIDM0LjEyODkgNS45MzJDMzQuMDMyOSA1Ljg5MiAzMy45MzI5IDUuODYgMzMuODI4OSA1LjgzNkMzMy43MjQ5IDUuODA0IDMzLjYyMDkgNS43OCAzMy41MTY5IDUuNzY0QzMzLjQxMjkgNS43NDggMzMuMzIwOSA1Ljc0IDMzLjI0MDkgNS43NEMzMy4wODA5IDUuNzQgMzIuOTI0OSA1Ljc2OCAzMi43NzI5IDUuODI0QzMyLjYyODkgNS44OCAzMi41MDA5IDUuOTYgMzIuMzg4OSA2LjA2NEMzMi4yNzY5IDYuMTYgMzIuMTg4OSA2LjI3NiAzMi4xMjQ5IDYuNDEyQzMyLjA2MDkgNi41NDggMzIuMDI4OSA2LjY5MiAzMi4wMjg5IDYuODQ0QzMyLjAyODkgNy4wMDQgMzIuMDYwOSA3LjE1MiAzMi4xMjQ5IDcuMjg4QzMyLjE4ODkgNy40MjQgMzIuMjc2OSA3LjU0NCAzMi4zODg5IDcuNjQ4QzMyLjUwMDkgNy43NDQgMzIuNjI4OSA3LjgyNCAzMi43NzI5IDcuODg4QzMyLjkyNDkgNy45NDQgMzMuMDgwOSA3Ljk3MiAzMy4yNDA5IDcuOTcyQzMzLjMyMDkgNy45NzIgMzMuNDEyOSA3Ljk2IDMzLjUxNjkgNy45MzZDMzMuNjIwOSA3LjkxMiAzMy43MjQ5IDcuODg0IDMzLjgyODkgNy44NTJDMzMuOTMyOSA3LjgxMiAzNC4wMzI5IDcuNzY4IDM0LjEyODkgNy43MkMzNC4yMjQ5IDcuNjY0IDM0LjMwNDkgNy42MDggMzQuMzY4OSA3LjU1MlY2LjA2NFpcIiBmaWxsPVwiY3VycmVudENvbG9yXCIgLz5gO1xyXG4gIHN2Z0VsbS5zZXRBdHRyaWJ1dGUoXCJ2aWV3Qm94XCIsIFwiMCAwIDU1IDExXCIpO1xyXG59KSgpOyIsICJpbXBvcnQgeyB3YWl0VW50aWxDb25uZWN0aW9uT3BlbiB9IGZyb20gXCIuL290aGVyL3V0aWxzLmpzXCI7XHJcbmltcG9ydCBsb2FkaW5nQW5pbWF0aW9uIGZyb20gXCIuL290aGVyL2xvYWRpbmctYW5pbWF0aW9uXCI7XHJcbmltcG9ydCBhcGkgZnJvbSBcIi4vYXBpXCI7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LCBcImFjb3JkXCIsIHtcclxuICBnZXQoKSB7XHJcbiAgICByZXR1cm4gYXBpLmV4cG9zZWRBUEk7XHJcbiAgfVxyXG59KTtcclxud2luZG93Lmdsb2JhbCA9IHdpbmRvdztcclxuXHJcbihhc3luYyAoKSA9PiB7XHJcbiAgbG9hZGluZ0FuaW1hdGlvbi5zaG93KCk7XHJcbiAgYXdhaXQgd2FpdFVudGlsQ29ubmVjdGlvbk9wZW4oKTtcclxuICBsb2FkaW5nQW5pbWF0aW9uLmhpZGUoKTtcclxufSkoKTtcclxuXHJcbi8vIGV4dHJhc1xyXG5pbXBvcnQgXCIuL290aGVyL3dlYnNvY2tldC10cmlnZ2Vycy5qc1wiO1xyXG5pbXBvcnQgXCIuL3VpL2luZGV4LmpzXCI7Il0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQ0EsYUFBTyxlQUFlLFNBQVMsY0FBYyxFQUFFLE9BQU8sS0FBSyxDQUFDO0FBQzVELGNBQVEsVUFBVSxPQUFPLE9BQU87QUFBQSxRQUM1QixLQUFLO0FBQUEsUUFDTCxLQUFLO0FBQUEsUUFDTCxRQUFRO0FBQUEsUUFDUixRQUFRO0FBQUEsTUFDWixDQUFDO0FBQUE7QUFBQTs7O0FDUEQ7QUFBQTtBQUFBO0FBQ0EsVUFBSSxrQkFBbUIsV0FBUSxRQUFLLG1CQUFvQixTQUFVLEtBQUs7QUFDbkUsZUFBUSxPQUFPLElBQUksYUFBYyxNQUFNLEVBQUUsV0FBVyxJQUFJO0FBQUEsTUFDNUQ7QUFDQSxhQUFPLGVBQWUsU0FBUyxjQUFjLEVBQUUsT0FBTyxLQUFLLENBQUM7QUFDNUQsVUFBTSxXQUFXLGdCQUFnQixnQkFBbUI7QUFDcEQsVUFBTSxlQUFOLE1BQW1CO0FBQUEsUUFDZixjQUFjO0FBQ1YsZUFBSyxZQUFZLE9BQU8sT0FBTyxTQUFTLE9BQU8sRUFBRSxPQUFPLENBQUMsS0FBSyxTQUFVLElBQUksR0FBRyxJQUFJLG9CQUFJLElBQUksR0FBSSxNQUFNLENBQUMsQ0FBQztBQUN2RyxlQUFLLEtB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QUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsUUFDQSxNQUFRO0FBQUEsVUFDTixJQUFNO0FBQUEsVUFDTixRQUFVO0FBQUEsVUFDVixNQUFRO0FBQUEsWUFDTixRQUFVO0FBQUEsY0FDUjtBQUFBLGNBQ0E7QUFBQSxjQUNBO0FBQUEsY0FDQTtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLFFBQ0EsU0FBVztBQUFBLFVBQ1QsSUFBTTtBQUFBLFVBQ04sUUFBVTtBQUFBLFlBQ1IsUUFBVTtBQUFBLFlBQ1YsSUFBTTtBQUFBLFlBQ04sSUFBTTtBQUFBLGNBQ0o7QUFBQSxnQkFDRTtBQUFBLGNBQ0Y7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFVBQ0EsTUFBUTtBQUFBLFlBQ04sUUFBVTtBQUFBLGNBQ1I7QUFBQSxjQUNBO0FBQUEsY0FDQTtBQUFBLGNBQ0E7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxRQUNBLFVBQVk7QUFBQSxVQUNWLElBQU07QUFBQSxVQUNOLFFBQVU7QUFBQSxVQUNWLE1BQVE7QUFBQSxZQUNOLE9BQVM7QUFBQSxjQUNQO0FBQUEsY0FDQTtBQUFBLGNBQ0E7QUFBQSxjQUNBO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLE1BQ0EsZ0JBQWtCO0FBQUEsUUFDaEIsSUFBTTtBQUFBLFFBQ04sTUFBUTtBQUFBLFVBQ04sT0FBUztBQUFBLFlBQ1A7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLFFBQ0EsUUFBVTtBQUFBLFVBQ1IsUUFBVTtBQUFBLFVBQ1YsSUFBTTtBQUFBLFVBQ04sSUFBTTtBQUFBLFlBQ0o7QUFBQSxjQUNFO0FBQUEsY0FDQTtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLE9BQVM7QUFBQSxRQUNQLElBQU07QUFBQSxRQUNOLE1BQVE7QUFBQSxVQUNOLE9BQVM7QUFBQSxZQUNQO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxRQUNBLFFBQVU7QUFBQSxVQUNSLFFBQVU7QUFBQSxVQUNWLElBQU07QUFBQSxVQUNOLElBQU07QUFBQSxZQUNKO0FBQUEsY0FDRTtBQUFBLGNBQ0E7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsTUFDQSxNQUFRO0FBQUEsUUFDTixJQUFNO0FBQUEsUUFDTixNQUFRO0FBQUEsVUFDTixPQUFTO0FBQUEsWUFDUDtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsUUFDQSxRQUFVO0FBQUEsVUFDUixRQUFVO0FBQUEsVUFDVixJQUFNO0FBQUEsVUFDTixJQUFNO0FBQUEsWUFDSjtBQUFBLGNBQ0U7QUFBQSxjQUNBO0FBQUEsY0FDQTtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLE1BQVE7QUFBQSxRQUNOLElBQU07QUFBQSxRQUNOLE1BQVE7QUFBQSxVQUNOLE9BQVM7QUFBQSxZQUNQO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxRQUNBLFFBQVU7QUFBQSxVQUNSLFFBQVU7QUFBQSxVQUNWLElBQU07QUFBQSxVQUNOLElBQU07QUFBQSxZQUNKO0FBQUEsY0FDRTtBQUFBLGNBQ0E7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsTUFDQSxXQUFhO0FBQUEsUUFDWCxJQUFNO0FBQUEsUUFDTixRQUFVO0FBQUEsUUFDVixNQUFRO0FBQUEsVUFDTixRQUFVO0FBQUEsWUFDUjtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLE1BQ0EsaUJBQW1CO0FBQUEsUUFDakIsSUFBTTtBQUFBLFFBQ04sTUFBUTtBQUFBLFVBQ04sT0FBUztBQUFBLFlBQ1A7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLFFBQ0EsUUFBVTtBQUFBLFVBQ1IsUUFBVTtBQUFBLFVBQ1YsSUFBTTtBQUFBLFVBQ04sSUFBTTtBQUFBLFlBQ0o7QUFBQSxjQUNFO0FBQUEsY0FDQTtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLHVCQUF5QjtBQUFBLFFBQ3ZCLElBQU07QUFBQSxRQUNOLE1BQVE7QUFBQSxVQUNOLE9BQVM7QUFBQSxZQUNQO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxRQUNBLFFBQVU7QUFBQSxVQUNSLFFBQVU7QUFBQSxVQUNWLElBQU07QUFBQSxVQUNOLElBQU07QUFBQSxZQUNKO0FBQUEsY0FDRTtBQUFBLGNBQ0E7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsTUFDQSxZQUFjO0FBQUEsUUFDWixJQUFNO0FBQUEsUUFDTixRQUFVO0FBQUEsVUFDUixJQUFNO0FBQUEsVUFDTixJQUFNO0FBQUEsWUFDSjtBQUFBLGNBQ0U7QUFBQSxZQUNGO0FBQUEsWUFDQSxDQUFDO0FBQUEsVUFDSDtBQUFBLFFBQ0Y7QUFBQSxRQUNBLE1BQVE7QUFBQSxVQUNOLFFBQVU7QUFBQSxVQUNWLFFBQVU7QUFBQSxRQUNaO0FBQUEsUUFDQSxLQUFPO0FBQUEsVUFDTCxLQUFPO0FBQUEsWUFDTDtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsVUFDRjtBQUFBLFVBQ0EsU0FBVztBQUFBLFlBQ1Q7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLGtCQUFvQjtBQUFBLFFBQ2xCLElBQU07QUFBQSxRQUNOLFFBQVU7QUFBQSxVQUNSLFFBQVU7QUFBQSxVQUNWLElBQU07QUFBQSxVQUNOLElBQU07QUFBQSxZQUNKO0FBQUEsY0FDRTtBQUFBLGNBQ0E7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxRQUNBLE1BQVE7QUFBQSxVQUNOLE9BQVM7QUFBQSxZQUNQO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsTUFDQSxrQkFBb0I7QUFBQSxRQUNsQixJQUFNO0FBQUEsUUFDTixRQUFVO0FBQUEsUUFDVixRQUFVO0FBQUEsVUFDUixJQUFNO0FBQUEsVUFDTixJQUFNO0FBQUEsWUFDSjtBQUFBLGNBQ0U7QUFBQSxjQUNBO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsUUFDQSxNQUFRO0FBQUEsVUFDTixPQUFTO0FBQUEsWUFDUDtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLE1BQ0EsbUJBQXFCO0FBQUEsUUFDbkIsSUFBTTtBQUFBLFFBQ04sUUFBVTtBQUFBLFVBQ1IsUUFBVTtBQUFBLFVBQ1YsSUFBTTtBQUFBLFVBQ04sSUFBTTtBQUFBLFlBQ0o7QUFBQSxjQUNFO0FBQUEsY0FDQTtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLFFBQ0EsTUFBUTtBQUFBLFVBQ04sT0FBUztBQUFBLFlBQ1A7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLHNCQUF3QjtBQUFBLFFBQ3RCLElBQU07QUFBQSxRQUNOLFFBQVU7QUFBQSxVQUNSLFFBQVU7QUFBQSxVQUNWLElBQU07QUFBQSxVQUNOLElBQU07QUFBQSxZQUNKO0FBQUEsY0FDRTtBQUFBLGNBQ0E7QUFBQSxjQUNBO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsUUFDQSxNQUFRO0FBQUEsVUFDTixPQUFTO0FBQUEsWUFDUDtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLE1BQ0EsY0FBZ0I7QUFBQSxRQUNkLElBQU07QUFBQSxRQUNOLFFBQVU7QUFBQSxVQUNSLFFBQVU7QUFBQSxVQUNWLElBQU07QUFBQSxVQUNOLElBQU07QUFBQSxZQUNKO0FBQUEsY0FDRTtBQUFBLGNBQ0E7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxRQUNBLE1BQVE7QUFBQSxVQUNOLE9BQVM7QUFBQSxZQUNQO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsTUFDQSxtQkFBcUI7QUFBQSxRQUNuQixJQUFNO0FBQUEsUUFDTixRQUFVO0FBQUEsVUFDUixRQUFVO0FBQUEsVUFDVixJQUFNO0FBQUEsVUFDTixJQUFNO0FBQUEsWUFDSjtBQUFBLGNBQ0U7QUFBQSxjQUNBO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsUUFDQSxNQUFRO0FBQUEsVUFDTixPQUFTO0FBQUEsWUFDUDtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLE1BQ0EsMkJBQTZCO0FBQUEsUUFDM0IsSUFBTTtBQUFBLFFBQ04sUUFBVTtBQUFBLFVBQ1IsUUFBVTtBQUFBLFVBQ1YsSUFBTTtBQUFBLFVBQ04sSUFBTTtBQUFBLFlBQ0o7QUFBQSxjQUNFO0FBQUEsY0FDQTtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLFFBQ0EsTUFBUTtBQUFBLFVBQ04sT0FBUztBQUFBLFlBQ1A7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLGVBQWlCO0FBQUEsUUFDZixJQUFNO0FBQUEsUUFDTixRQUFVO0FBQUEsVUFDUixRQUFVO0FBQUEsVUFDVixJQUFNO0FBQUEsVUFDTixJQUFNO0FBQUEsWUFDSjtBQUFBLGNBQ0U7QUFBQSxjQUNBO0FBQUEsY0FDQTtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLFFBQ0EsTUFBUTtBQUFBLFVBQ04sT0FBUztBQUFBLFlBQ1A7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLGNBQWdCO0FBQUEsUUFDZCxJQUFNO0FBQUEsUUFDTixRQUFVO0FBQUEsVUFDUixRQUFVO0FBQUEsVUFDVixJQUFNO0FBQUEsVUFDTixJQUFNO0FBQUEsWUFDSjtBQUFBLGNBQ0U7QUFBQSxjQUNBO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsUUFDQSxNQUFRO0FBQUEsVUFDTixPQUFTO0FBQUEsWUFDUDtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLE1BQ0EsY0FBZ0I7QUFBQSxRQUNkLElBQU07QUFBQSxRQUNOLFFBQVU7QUFBQSxVQUNSLFFBQVU7QUFBQSxVQUNWLElBQU07QUFBQSxVQUNOLElBQU07QUFBQSxZQUNKO0FBQUEsY0FDRTtBQUFBLGNBQ0E7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxRQUNBLE1BQVE7QUFBQSxVQUNOLE9BQVM7QUFBQSxZQUNQO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsTUFDQSxnQkFBa0I7QUFBQSxRQUNoQixJQUFNO0FBQUEsUUFDTixRQUFVO0FBQUEsVUFDUixRQUFVO0FBQUEsVUFDVixJQUFNO0FBQUEsVUFDTixJQUFNO0FBQUEsWUFDSjtBQUFBLGNBQ0U7QUFBQSxjQUNBO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsUUFDQSxNQUFRO0FBQUEsVUFDTixPQUFTO0FBQUEsWUFDUDtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLE1BQ0EsZ0JBQWtCO0FBQUEsUUFDaEIsSUFBTTtBQUFBLFFBQ04sUUFBVTtBQUFBLFVBQ1IsUUFBVTtBQUFBLFVBQ1YsSUFBTTtBQUFBLFVBQ04sSUFBTTtBQUFBLFlBQ0o7QUFBQSxjQUNFO0FBQUEsY0FDQTtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLFFBQ0EsTUFBUTtBQUFBLFVBQ04sT0FBUztBQUFBLFlBQ1A7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLGNBQWdCO0FBQUEsUUFDZCxJQUFNO0FBQUEsUUFDTixRQUFVO0FBQUEsVUFDUixRQUFVO0FBQUEsVUFDVixJQUFNO0FBQUEsVUFDTixJQUFNO0FBQUEsWUFDSjtBQUFBLGNBQ0U7QUFBQSxjQUNBO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsUUFDQSxNQUFRO0FBQUEsVUFDTixPQUFTO0FBQUEsWUFDUDtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLE1BQ0EsZUFBaUI7QUFBQSxRQUNmLElBQU07QUFBQSxRQUNOLFFBQVU7QUFBQSxVQUNSLFFBQVU7QUFBQSxVQUNWLElBQU07QUFBQSxVQUNOLElBQU07QUFBQSxZQUNKO0FBQUEsY0FDRTtBQUFBLGNBQ0E7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxRQUNBLE1BQVE7QUFBQSxVQUNOLE9BQVM7QUFBQSxZQUNQO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsTUFDQSxjQUFnQjtBQUFBLFFBQ2QsSUFBTTtBQUFBLFFBQ04sUUFBVTtBQUFBLFVBQ1IsUUFBVTtBQUFBLFVBQ1YsSUFBTTtBQUFBLFVBQ04sSUFBTTtBQUFBLFlBQ0o7QUFBQSxjQUNFO0FBQUEsY0FDQTtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLFFBQ0EsTUFBUTtBQUFBLFVBQ04sT0FBUztBQUFBLFlBQ1A7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLGVBQWlCO0FBQUEsUUFDZixJQUFNO0FBQUEsUUFDTixRQUFVO0FBQUEsVUFDUixRQUFVO0FBQUEsVUFDVixJQUFNO0FBQUEsVUFDTixJQUFNO0FBQUEsWUFDSjtBQUFBLGNBQ0U7QUFBQSxjQUNBO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsUUFDQSxNQUFRO0FBQUEsVUFDTixPQUFTO0FBQUEsWUFDUDtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLE1BQ0Esb0JBQXNCO0FBQUEsUUFDcEIsSUFBTTtBQUFBLFFBQ04sUUFBVTtBQUFBLFVBQ1IsUUFBVTtBQUFBLFVBQ1YsSUFBTTtBQUFBLFVBQ04sSUFBTTtBQUFBLFlBQ0o7QUFBQSxjQUNFO0FBQUEsY0FDQTtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLFFBQ0EsTUFBUTtBQUFBLFVBQ04sT0FBUztBQUFBLFlBQ1A7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLE1BQVE7QUFBQSxRQUNOLElBQU07QUFBQSxRQUNOLFFBQVU7QUFBQSxVQUNSLFFBQVU7QUFBQSxVQUNWLElBQU07QUFBQSxVQUNOLElBQU07QUFBQSxZQUNKO0FBQUEsY0FDRTtBQUFBLGNBQ0E7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxRQUNBLE1BQVE7QUFBQSxVQUNOLE9BQVM7QUFBQSxZQUNQO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsTUFDQSxNQUFRO0FBQUEsUUFDTixJQUFNO0FBQUEsUUFDTixRQUFVO0FBQUEsVUFDUixRQUFVO0FBQUEsVUFDVixJQUFNO0FBQUEsVUFDTixJQUFNO0FBQUEsWUFDSjtBQUFBLGNBQ0U7QUFBQSxjQUNBO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsUUFDQSxNQUFRO0FBQUEsVUFDTixPQUFTO0FBQUEsWUFDUDtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLE1BQ0EsTUFBUTtBQUFBLFFBQ04sSUFBTTtBQUFBLFFBQ04sUUFBVTtBQUFBLFVBQ1IsUUFBVTtBQUFBLFVBQ1YsSUFBTTtBQUFBLFVBQ04sSUFBTTtBQUFBLFlBQ0o7QUFBQSxjQUNFO0FBQUEsY0FDQTtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLFFBQ0EsTUFBUTtBQUFBLFVBQ04sT0FBUztBQUFBLFlBQ1A7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjs7O0FDN3hCZSxXQUFSLFdBQ0wsTUFDQSxjQUNBLEVBQUUsV0FBVyxNQUFNLFNBQVMsQ0FBQyxHQUFHLFFBQVEsSUFBSSxJQUFJLENBQUMsR0FDakQ7QUFDQSxRQUFJLFlBQVk7QUFFaEIsYUFBUyxTQUFTRSxPQUFNQyxlQUFjLEVBQUUsVUFBQUMsWUFBVyxNQUFNLFFBQUFDLFVBQVMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHO0FBQzNFLG1CQUFhO0FBQ2IsVUFBSSxZQUFZO0FBQU87QUFFdkIsVUFBSSxPQUFPRixrQkFBaUIsVUFBVTtBQUNwQyxZQUFJRCxNQUFLLGVBQWVDLGFBQVk7QUFBRyxpQkFBT0QsTUFBS0MsYUFBWTtBQUFBLE1BQ2pFLFdBQVdBLGNBQWFELEtBQUk7QUFBRyxlQUFPQTtBQUV0QyxVQUFJLENBQUNBO0FBQU07QUFFWCxVQUFJLE1BQU0sUUFBUUEsS0FBSSxHQUFHO0FBQ3ZCLG1CQUFXLFFBQVFBLE9BQU07QUFDdkIsZ0JBQU1JLFNBQVEsU0FBUyxNQUFNSCxlQUFjLEVBQUUsVUFBQUMsV0FBVSxRQUFBQyxRQUFPLENBQUM7QUFDL0QsY0FBSUM7QUFBTyxtQkFBT0E7QUFBQSxRQUNwQjtBQUFBLE1BQ0YsV0FBVyxPQUFPSixVQUFTLFVBQVU7QUFDbkMsbUJBQVcsT0FBTyxPQUFPLEtBQUtBLEtBQUksR0FBRztBQUNuQyxjQUFJRSxhQUFZLFFBQVEsQ0FBQ0EsVUFBUyxTQUFTLEdBQUc7QUFBRztBQUVqRCxjQUFJQyxRQUFPLFNBQVMsR0FBRztBQUFHO0FBRTFCLGNBQUk7QUFDRixrQkFBTUMsU0FBUSxTQUFTSixNQUFLLEdBQUcsR0FBR0MsZUFBYztBQUFBLGNBQzlDLFVBQUFDO0FBQUEsY0FDQSxRQUFBQztBQUFBLFlBQ0YsQ0FBQztBQUNELGdCQUFJQztBQUFPLHFCQUFPQTtBQUFBLFVBQ3BCLFFBQUU7QUFBQSxVQUFRO0FBQUEsUUFDWjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBRUEsV0FBTyxTQUFTLE1BQU0sY0FBYyxFQUFFLFVBQVUsT0FBTyxDQUFDO0FBQUEsRUFDMUQ7OztBQ3hDQSxXQUFTLE1BQU0sU0FBUyxTQUFTLE1BQU0sT0FBTztBQUM1QyxXQUFPLElBQUksVUFBVSxRQUFRLElBQUk7QUFBQSxNQUMvQixLQUFLO0FBQUEsTUFDTCxxQkFBcUI7QUFBQSxNQUNyQjtBQUFBLE1BQ0EsR0FBRztBQUFBLElBQ0w7QUFBQSxFQUNGO0FBRUEsTUFBTyxpQkFBUTtBQUFBLElBQ2IsS0FBSyxNQUFNLFNBQVMsT0FBTyxTQUFTO0FBQUEsSUFDcEMsT0FBTyxNQUFNLGVBQWUsU0FBUyxTQUFTO0FBQUEsSUFDOUMsTUFBTSxNQUFNLGNBQWMsT0FBTyxTQUFTO0FBQUEsSUFDMUMsTUFBTSxNQUFNLGNBQWMsUUFBUSxTQUFTO0FBQUEsSUFDM0MsT0FBTyxNQUFNLGVBQWUsU0FBUyxTQUFTO0FBQUEsSUFDOUM7QUFBQSxFQUNGOzs7QUNkQSxNQUFPLGdCQUFRO0FBQUEsSUFDYixZQUFZLE1BQU07QUFDaEIsYUFBTyxPQUFPLFFBQVEsSUFBSSxFQUFFLEtBQUssT0FBSyxFQUFFLENBQUMsRUFBRSxXQUFXLHlCQUF5QixLQUFLLEVBQUUsQ0FBQyxFQUFFLFdBQVcsY0FBYyxDQUFDLElBQUksQ0FBQztBQUFBLElBQzFIO0FBQUEsSUFDQSxpQkFBaUIsTUFBTTtBQUNyQixVQUFJLFdBQVcsS0FBSyxZQUFZLElBQUk7QUFDcEMsZUFBUyxLQUFLLFVBQVUsSUFBSSxLQUFLLEdBQUc7QUFDbEMsWUFBSSxHQUFHLFdBQVc7QUFBYSxpQkFBTyxHQUFHO0FBQUEsSUFDN0M7QUFBQSxJQUNBLFdBQVcsTUFBTSxRQUFRO0FBQ3ZCLGFBQU8sV0FBVyxNQUFNLFFBQVE7QUFBQSxRQUM5QixVQUFVLENBQUMsU0FBUyxTQUFTLFlBQVksUUFBUTtBQUFBLE1BQ25ELENBQUM7QUFBQSxJQUNIO0FBQUEsSUFDQSxjQUFjLE1BQU07QUFDbEIsWUFBTSxXQUFXLEtBQUssWUFBWSxJQUFJO0FBQ3RDLFlBQU1DLGNBQWEsQ0FBQztBQUNwQixVQUFJLGVBQWU7QUFDbkIsYUFBTyxnQkFBZ0IsYUFBYSxRQUFRO0FBQzFDLFlBQUksT0FBTyxhQUFhLE9BQU8sU0FBUztBQUFVO0FBQ2xELFlBQUksYUFBYSxPQUFPO0FBQU0sVUFBQUEsWUFBVyxLQUFLLGFBQWEsT0FBTyxJQUFJO0FBQ3RFLHVCQUFlLGFBQWE7QUFBQSxNQUM5QjtBQUNBLGFBQU9BO0FBQUEsSUFDVDtBQUFBLElBQ0EsY0FBYyxNQUFNO0FBQ2xCLFlBQU0sV0FBVyxLQUFLLFlBQVksSUFBSTtBQUN0QyxZQUFNLGFBQWEsQ0FBQztBQUNwQixVQUFJLGVBQWU7QUFDbkIsYUFBTyxnQkFBZ0IsYUFBYSxRQUFRO0FBQzFDLFlBQUksYUFBYSxPQUFPLHFCQUFxQjtBQUFhO0FBQzFELFlBQUksYUFBYSxPQUFPO0FBQ3RCLHFCQUFXLEtBQUssYUFBYSxPQUFPLFNBQVM7QUFDL0MsdUJBQWUsYUFBYTtBQUFBLE1BQzlCO0FBQ0EsYUFBTztBQUFBLElBQ1Q7QUFBQSxJQUNBLFNBQVMsSUFBSSxTQUFTLENBQUMsTUFBTSxHQUFHLE1BQU0sS0FBTztBQUMzQyxZQUFNLFdBQVcsS0FBSyxZQUFZLEVBQUU7QUFFcEMsVUFBSSxDQUFDLFVBQVU7QUFBUSxlQUFPO0FBRTlCLGVBQ00sVUFBVSxVQUFVLFFBQVEsSUFBSSxHQUNwQyxJQUFJLE9BQU8sWUFBWSxNQUN2QixVQUFVLFNBQVMsUUFBUSxLQUMzQjtBQUNBLFlBQUksU0FBUyxnQkFBZ0IsT0FBTyxRQUFRLFlBQVk7QUFDdEQsaUJBQU8sUUFBUTtBQUFBLE1BQ25CO0FBRUEsYUFBTztBQUFBLElBQ1Q7QUFBQSxFQUNGOzs7QUNuREEsTUFBTyxnQkFBUTtBQUFBLElBQ2I7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0EsT0FBTyxRQUFRLE1BQU07QUFDbkIsYUFBTyxHQUFHLE1BQU0sV0FBVyxZQUFZLENBQUNDLElBQUcsUUFBUTtBQUNqRCxlQUFPLEtBQUssT0FBTyxHQUFHLENBQUM7QUFBQSxNQUN6QixDQUFDO0FBQUEsSUFDSDtBQUFBLElBQ0EsU0FBUyxJQUFJLEtBQUs7QUFDaEIsVUFBSSxXQUFXLFlBQVksSUFBSSxHQUFHO0FBQ2xDLGFBQU8sTUFBTTtBQUNYLHNCQUFjLFFBQVE7QUFBQSxNQUN4QjtBQUFBLElBQ0Y7QUFBQSxJQUNBLFFBQVEsSUFBSSxLQUFLO0FBQ2YsVUFBSSxVQUFVLFdBQVcsSUFBSSxHQUFHO0FBQ2hDLGFBQU8sTUFBTTtBQUNYLHFCQUFhLE9BQU87QUFBQSxNQUN0QjtBQUFBLElBQ0Y7QUFBQSxJQUNBLFNBQVMsS0FBSyxJQUFJO0FBQ2hCLFVBQUk7QUFBSyxXQUFHLEdBQUc7QUFBQSxJQUNqQjtBQUFBLElBQ0EsU0FBUyxNQUFNO0FBQ2IsVUFBSSxPQUFPLGVBQWU7QUFDeEIsc0JBQWMsVUFBVSxLQUFLLElBQUk7QUFDakM7QUFBQSxNQUNGO0FBRUEsZ0JBQVUsVUFBVSxVQUFVLElBQUksRUFBRSxNQUFNLE1BQU07QUFDOUMsY0FBTSxXQUFXLFNBQVMsY0FBYyxVQUFVO0FBRWxELGlCQUFTLE1BQU0sYUFBYTtBQUM1QixpQkFBUyxNQUFNLFdBQVc7QUFDMUIsaUJBQVMsTUFBTSxNQUFNO0FBQ3JCLGlCQUFTLE1BQU0sT0FBTztBQUV0QixpQkFBUyxLQUFLLFlBQVksUUFBUTtBQUNsQyxpQkFBUyxNQUFNO0FBQ2YsaUJBQVMsT0FBTztBQUVoQixZQUFJO0FBQ0YsbUJBQVMsWUFBWSxNQUFNO0FBQUEsUUFDN0IsU0FBUyxLQUFQO0FBQ0Esa0JBQVEsTUFBTSxHQUFHO0FBQUEsUUFDbkI7QUFFQSxpQkFBUyxLQUFLLFlBQVksUUFBUTtBQUFBLE1BQ3BDLENBQUM7QUFBQSxJQUNIO0FBQUEsSUFDQSxNQUFNLElBQUk7QUFDUixhQUFPLElBQUksUUFBUSxDQUFDLFlBQVksV0FBVyxTQUFTLEVBQUUsQ0FBQztBQUFBLElBQ3pEO0FBQUEsRUFDRjs7O0FDdkRPLFdBQVMsV0FBVyxRQUFRO0FBQ2pDLFdBQU8sSUFBSSxTQUFTO0FBQ2xCLFVBQUk7QUFDRixZQUFJLEtBQUssQ0FBQyxHQUFHLFlBQVksS0FBSyxDQUFDLEdBQUc7QUFBUSxpQkFBTztBQUNqRCxZQUFJLEtBQUssQ0FBQyxHQUFHLFNBQVMsVUFBVSxLQUFLLENBQUMsR0FBRyxTQUFTLE9BQU8sS0FBSyxDQUFDLEdBQUcsU0FBUyxTQUFTLEtBQUssQ0FBQyxHQUFHLFNBQVMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLFNBQVM7QUFBTSxpQkFBTztBQUM3SSxZQUFJLEtBQUssQ0FBQyxFQUFFLFVBQVUsS0FBSyxDQUFDLEVBQUUsT0FBTyxLQUFLLENBQUMsRUFBRSxTQUFTLEtBQUssQ0FBQyxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtBQUFNLGlCQUFPO0FBQzNGLFlBQUksS0FBSyxDQUFDLEdBQUcsU0FBUyxZQUFZLEtBQUssQ0FBQyxHQUFHLFNBQVMsWUFBWSxLQUFLLENBQUMsR0FBRyxTQUFTO0FBQVcsaUJBQU87QUFDcEcsWUFBSSxLQUFLLENBQUMsR0FBRyxZQUFZLEtBQUssQ0FBQyxHQUFHLFlBQVksS0FBSyxDQUFDLEdBQUc7QUFBVyxpQkFBTztBQUN6RSxlQUFPLE9BQU8sR0FBRyxJQUFJO0FBQUEsTUFDdkIsU0FDTyxLQUFQO0FBQ0UsdUJBQU8sS0FBSyxxQ0FBcUMsUUFBUSxHQUFHO0FBQzVELGVBQU87QUFBQSxNQUNUO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFFQSxXQUFTLG1CQUFtQixHQUFHLFNBQVMsUUFBUTtBQUM5QyxVQUFNQyxTQUFRLENBQUMsSUFBSSxPQUFPO0FBQ3hCLGFBQU8sU0FBUyxHQUFHLFNBQVMsRUFBRSxRQUFRLEdBQUcsU0FBUyxDQUFDLEtBQUssS0FBSyxHQUFHLFNBQVMsRUFBRSxRQUFRLEdBQUcsU0FBUyxDQUFDLElBQUk7QUFBQSxJQUN0RztBQUNBLFdBQU8sUUFBUSxNQUFNLE9BQUs7QUFDeEIsYUFBT0EsT0FBTSxHQUFHLFdBQVcsS0FBSyxJQUFJLENBQUMsS0FDaENBLE9BQU0sR0FBRyxjQUFjLFdBQVcsS0FBSyxJQUFJLENBQUMsS0FDNUNBLE9BQU0sR0FBRyxNQUFNLFdBQVcsS0FBSyxJQUFJLENBQUMsS0FDcENBLE9BQU0sR0FBRyxNQUFNLGNBQWMsV0FBVyxLQUFLLElBQUksQ0FBQyxLQUNsRCxPQUFPLFFBQVEsQ0FBQyxZQUFZLFFBQVEsRUFBRSxTQUFTLE9BQU8sR0FBRyxTQUFTLElBQUksT0FBTyxHQUFHLFlBQVksQ0FBQyxDQUFDLEVBQUUsT0FBTyxPQUFLLEVBQUUsQ0FBQyxHQUFHLFdBQVcsUUFBUSxDQUFDLEVBQUUsS0FBSyxPQUFLQSxPQUFNLEVBQUUsQ0FBQyxHQUFHLFdBQVcsS0FBSyxJQUFJLENBQUMsQ0FBQztBQUFBLElBQzNMLENBQUM7QUFBQSxFQUNIO0FBQ0EsV0FBUyxpQkFBaUIsR0FBRyxZQUFZLFFBQVE7QUFDL0MsV0FBTyxXQUFXLE1BQU0sVUFBUTtBQUM5QixZQUFNLFFBQVEsRUFBRSxJQUFJLEdBQUcsZ0JBQWdCLEVBQUUsSUFBSTtBQUM3QyxhQUFPLFNBQVMsVUFBVSxTQUFhLFVBQVUsVUFBYSxFQUFFLE9BQU8sU0FBUyxZQUFZLENBQUM7QUFBQSxJQUMvRixDQUFDO0FBQUEsRUFDSDtBQUNBLFdBQVMsc0JBQXNCLEdBQUcsWUFBWSxRQUFRO0FBQ3BELFdBQU8sRUFBRSxhQUFhLFdBQVcsTUFBTSxVQUFRO0FBQzdDLFlBQU0sUUFBUSxFQUFFLFVBQVUsSUFBSTtBQUM5QixhQUFPLFNBQVMsVUFBVSxTQUFhLFVBQVUsVUFBYSxFQUFFLE9BQU8sU0FBUyxZQUFZLENBQUM7QUFBQSxJQUMvRixDQUFDO0FBQUEsRUFDSDtBQUVBLE1BQU0sbUJBQW1CO0FBQ3pCLE1BQU0sZ0JBQWdCLG9CQUFJLElBQUk7QUFHOUI7QUFHRSxRQUFTLGFBQVQsU0FBb0IsT0FBTztBQUN6QixZQUFNLENBQUMsRUFBRUMsUUFBTyxJQUFJO0FBRXBCLGlCQUFXLFlBQVksT0FBTyxLQUFLQSxZQUFXLENBQUMsQ0FBQyxHQUFHO0FBQ2pELGNBQU0sV0FBV0EsU0FBUSxRQUFRO0FBRWpDLFFBQUFBLFNBQVEsUUFBUSxJQUFJLENBQUMsUUFBUSxTQUFTQyxhQUFZO0FBQ2hELGNBQUk7QUFDRixxQkFBUyxLQUFLLE1BQU0sUUFBUSxTQUFTQSxRQUFPO0FBRTVDLDBCQUFjLFFBQVEsY0FBWTtBQUNoQyxrQkFBSTtBQUNGLHlCQUFTLE9BQU87QUFBQSxjQUNsQixTQUFTLE9BQVA7QUFDQSw4QkFBTSxPQUFPLE1BQU0scUNBQXFDLFVBQVUsS0FBSztBQUFBLGNBQ3pFO0FBQUEsWUFDRixDQUFDO0FBQUEsVUFDSCxTQUFTLE9BQVA7QUFDQSwwQkFBTSxPQUFPLE1BQU0sa0NBQWtDLEtBQUs7QUFBQSxVQUM1RDtBQUFBLFFBQ0Y7QUFFQSxlQUFPLE9BQU9ELFNBQVEsUUFBUSxHQUFHLFVBQVU7QUFBQSxVQUN6QyxjQUFjO0FBQUEsVUFDZCxVQUFVLE1BQU0sU0FBUyxTQUFTO0FBQUEsUUFDcEMsQ0FBQztBQUFBLE1BQ0g7QUFFQSxhQUFPLE9BQU8sS0FBSyxPQUFPLGdCQUFnQixHQUFHLEtBQUs7QUFBQSxJQUNwRDtBQS9CQSxRQUFJLFNBQVMsT0FBTyxnQkFBZ0IsRUFBRTtBQWlDdEMsV0FBTyxlQUFlLE9BQU8sZ0JBQWdCLEdBQUcsUUFBUTtBQUFBLE1BQ3RELGNBQWM7QUFBQSxNQUNkLE1BQU07QUFBRSxlQUFPO0FBQUEsTUFBWTtBQUFBLE1BQzNCLElBQUksT0FBTztBQUNULGlCQUFTO0FBRVQsZUFBTyxlQUFlLE9BQU8sS0FBSyxTQUFTLEdBQUcsUUFBUTtBQUFBLFVBQ3BELE9BQU8sS0FBSztBQUFBLFVBQ1osY0FBYztBQUFBLFVBQ2QsVUFBVTtBQUFBLFFBQ1osQ0FBQztBQUFBLE1BQ0g7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBVUEsaUJBQXNCLFNBQVMsUUFBUSxFQUFFLFNBQVMsTUFBTSxnQkFBZ0IsTUFBTSxHQUFHO0FBQy9FLFdBQU8sSUFBSSxRQUFRLENBQUMsU0FBUyxXQUFXO0FBQ3RDLFlBQU0sU0FBUyxNQUFNLGNBQWMsT0FBTyxRQUFRO0FBQ2xELFlBQU0sV0FBVyxDQUFDLFlBQVk7QUFDNUIsWUFBSSxDQUFDLFdBQVcsWUFBWSxVQUFVLFlBQVksU0FBUztBQUFpQjtBQUU1RSxZQUFJRSxTQUFRO0FBRVosWUFBSSxPQUFPLFdBQVcsWUFBWSxlQUFlO0FBQy9DLHFCQUFXLE9BQU8sU0FBUztBQUN6QixnQkFBSSxXQUFXLFFBQVEsR0FBRztBQUMxQixnQkFBSSxDQUFDO0FBQVU7QUFDZixnQkFBSSxPQUFPLFFBQVEsR0FBRztBQUNwQixjQUFBQSxTQUFRO0FBQ1I7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFFBQ0YsT0FBTztBQUNMLGNBQUksUUFBUTtBQUFBLFlBQ1Y7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsVUFDRjtBQUNBLFVBQUFBLFNBQVEsTUFBTSxJQUFJLE9BQUs7QUFDckIsZ0JBQUksU0FBUyxDQUFDLElBQUksVUFBVSxFQUFFLElBQUksU0FBUyxDQUFDO0FBQzVDLGdCQUFJLFVBQVUsT0FBTyxNQUFNO0FBQUcscUJBQU87QUFBQSxVQUN2QyxDQUFDLEVBQUUsS0FBSyxPQUFLLENBQUM7QUFBQSxRQUNoQjtBQUVBLFlBQUksQ0FBQ0E7QUFBTztBQUNaLGVBQU87QUFDUCxnQkFBUUEsTUFBSztBQUFBLE1BQ2Y7QUFFQSxvQkFBYyxJQUFJLFFBQVE7QUFFMUIsY0FBUSxpQkFBaUIsU0FBUyxNQUFNO0FBQ3RDLGVBQU87QUFDUCxnQkFBUSxJQUFJO0FBQUEsTUFDZCxDQUFDO0FBQUEsSUFDSCxDQUFDO0FBQUEsRUFDSDtBQUVPLFdBQVMsS0FBSyxLQUFLLFFBQVEsU0FBUyxDQUFDLEdBQUc7QUFDN0MsUUFBSSxnQkFBZ0IsT0FBTyxPQUFPLGlCQUFpQixZQUFZLFFBQVEsT0FBTztBQUM5RSxRQUFJLFdBQVcsT0FBTyxPQUFPLFlBQVksWUFBWSxRQUFRLE9BQU87QUFDcEUsUUFBSSxNQUFNLE9BQU8sT0FBTyxPQUFPLFlBQVksUUFBUSxPQUFPO0FBQzFELFVBQU1BLFNBQVEsQ0FBQztBQUNmLFFBQUksQ0FBQztBQUFVLGVBQVMsS0FBSyxJQUFJO0FBQUcsWUFBSSxJQUFJLEVBQUUsZUFBZSxDQUFDLEdBQUc7QUFDL0QsY0FBSSxJQUFJLElBQUksRUFBRSxDQUFDLEVBQUUsU0FBUyxJQUFJO0FBQzlCLGNBQUksTUFBTSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssYUFBYTtBQUN6RCxnQkFBSSxDQUFDLEVBQUUsSUFBSSxPQUFPLEdBQUcsQ0FBQyxJQUFJO0FBQ3hCLGtCQUFJO0FBQUssZ0JBQUFBLE9BQU0sS0FBSyxnQkFBZ0IsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQUE7QUFDM0MsdUJBQU8sZ0JBQWdCLElBQUksSUFBSSxFQUFFLENBQUM7QUFBQSxZQUN6QztBQUNLLHVCQUFTLE9BQU8sT0FBTyxLQUFLLENBQUM7QUFBRyxvQkFBSSxJQUFJLFNBQVMsS0FBSyxFQUFFLEdBQUcsS0FBSyxDQUFDLEVBQUUsSUFBSSxPQUFPLEVBQUUsR0FBRyxHQUFHLENBQUMsSUFBSTtBQUM5RixzQkFBSTtBQUFLLG9CQUFBQSxPQUFNLEtBQUssZ0JBQWdCLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQztBQUFBO0FBQzNDLDJCQUFPLGdCQUFnQixJQUFJLElBQUksRUFBRSxDQUFDO0FBQUEsZ0JBQ3pDO0FBQUEsVUFDRjtBQUNBLGNBQUksS0FBSyxFQUFFLGNBQWMsRUFBRSxZQUFZLE9BQU8sRUFBRSxXQUFXLFlBQVksT0FBTyxFQUFFLFdBQVcsYUFBYTtBQUN0RyxnQkFBSSxDQUFDLEVBQUUsSUFBSSxPQUFPLEVBQUUsU0FBUyxDQUFDLElBQUk7QUFDaEMsa0JBQUk7QUFBSyxnQkFBQUEsT0FBTSxLQUFLLGdCQUFnQixJQUFJLElBQUksRUFBRSxDQUFDLENBQUM7QUFBQTtBQUMzQyx1QkFBTyxnQkFBZ0IsSUFBSSxJQUFJLEVBQUUsQ0FBQztBQUFBLFlBQ3pDLFdBQ1MsRUFBRSxRQUFRLFNBQVMsT0FBTyxFQUFFLFFBQVEsUUFBUSxZQUFZLE9BQU8sRUFBRSxRQUFRLFFBQVEsZUFBZSxDQUFDLEVBQUUsSUFBSSxPQUFPLEVBQUUsUUFBUSxNQUFNLENBQUMsSUFBSTtBQUMxSSxrQkFBSTtBQUFLLGdCQUFBQSxPQUFNLEtBQUssZ0JBQWdCLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQztBQUFBO0FBQzNDLHVCQUFPLGdCQUFnQixJQUFJLElBQUksRUFBRSxDQUFDO0FBQUEsWUFDekM7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBO0FBQ0EsYUFBUyxLQUFLLElBQUk7QUFBRyxVQUFJLElBQUksRUFBRSxlQUFlLENBQUMsR0FBRztBQUNoRCxZQUFJLElBQUksSUFBSSxFQUFFLENBQUM7QUFDZixZQUFJLEtBQUssT0FBTyxLQUFLLFlBQVk7QUFDL0IsY0FBSSxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsWUFBWSxPQUFPLEdBQUcsQ0FBQyxHQUFHO0FBQ3pDLGdCQUFJO0FBQUssY0FBQUEsT0FBTSxLQUFLLGdCQUFnQixJQUFJLEVBQUUsQ0FBQyxFQUFFLFVBQVUsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUFBO0FBQzFELHFCQUFPLGdCQUFnQixJQUFJLEVBQUUsQ0FBQyxFQUFFLFVBQVUsSUFBSSxFQUFFLENBQUM7QUFBQSxVQUN4RDtBQUNBLGNBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLFlBQVksT0FBTyxHQUFHLENBQUMsR0FBRztBQUN6QyxrQkFBTSxXQUFXLENBQUMsR0FBRyxZQUFZLENBQUM7QUFDbEMsY0FBRSxVQUFVLFdBQVcsR0FBRztBQUMxQixrQkFBTSxlQUFlLGFBQWEsT0FBTyxvQkFBb0IsYUFBYSxDQUFDLENBQUMsRUFBRSxVQUFVLElBQUksV0FBVztBQUN2RyxnQkFBSTtBQUFLLGNBQUFBLE9BQU0sS0FBSyxnQkFBZ0IsYUFBYSxVQUFVLFlBQVk7QUFBQTtBQUNsRSxxQkFBTyxnQkFBZ0IsYUFBYSxVQUFVO0FBQUEsVUFDckQ7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUNBLFFBQUk7QUFBSyxhQUFPQTtBQUFBLEVBQ2xCO0FBR0EsV0FBUyxtQkFBbUIsU0FBUyxTQUFTO0FBQzVDLFdBQVEsUUFBUSxLQUFLLE9BQUs7QUFDeEIsVUFBSSxhQUFhLE9BQU8sRUFBRSxDQUFDLEtBQUssYUFBYyxFQUFFLENBQUMsR0FBRyxjQUFjLFdBQVcsS0FBSyxFQUFFLENBQUMsR0FBRyxXQUFXLEtBQUssTUFBTyxNQUFNO0FBQUUsWUFBSTtBQUFFLGlCQUFPLEtBQUssVUFBVSxFQUFFLENBQUMsQ0FBQztBQUFBLFFBQUUsU0FBUyxLQUFQO0FBQWMsaUJBQU8sRUFBRSxDQUFDLEVBQUUsU0FBUztBQUFBLFFBQUU7QUFBQSxNQUFFLEdBQUc7QUFDck0sVUFBSSxtQkFBbUIsRUFBRSxDQUFDLEdBQUcsUUFBUSxjQUFjLFdBQVcsS0FBSyxFQUFFLENBQUMsR0FBRyxRQUFRLFdBQVcsS0FBSztBQUNqRyxhQUFPLFFBQVEsTUFBTSxZQUFVLFdBQVcsUUFBUSxNQUFNLEtBQUssTUFBTSxpQkFBaUIsUUFBUSxNQUFNLEtBQUssRUFBRTtBQUFBLElBQzNHLENBQUM7QUFBQSxFQUNIO0FBRU8sV0FBUyxlQUFlLFFBQVE7QUFDckMsUUFBSSxRQUFRLE1BQU07QUFDbEIsUUFBSSxPQUFPLFFBQVEsV0FBVyxVQUFVO0FBQ3RDLGNBQVEsV0FBVyxLQUFLLHlCQUF5QixPQUFPLHVDQUF1QyxDQUFDO0FBQUEsSUFDbEcsV0FBVyxPQUFPLFFBQVEsV0FBVyxZQUFZO0FBQy9DLGNBQVEsV0FBVyxPQUFPLE1BQU07QUFBQSxJQUNsQyxPQUFPO0FBQ0wsY0FBUSxPQUFPLE9BQU8sSUFBSTtBQUFBLFFBQ3hCLEtBQUssY0FBYztBQUNqQixjQUFJLE9BQU8sT0FBTyxLQUFLLENBQUMsR0FBRyxRQUFRO0FBQ2pDLG9CQUFRLFdBQVcsQ0FBQyxNQUFNLGlCQUFpQixHQUFHLE9BQU8sT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxpQkFBaUIsR0FBRyxPQUFPLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQztBQUFBLFVBQ3RJLE9BQU87QUFDTCxvQkFBUSxXQUFXLENBQUMsTUFBTSxpQkFBaUIsR0FBRyxPQUFPLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFBQSxVQUM1RTtBQUNBO0FBQUEsUUFDRjtBQUFBLFFBQ0EsS0FBSyxjQUFjO0FBQ2pCLGNBQUksT0FBTyxPQUFPLEtBQUssQ0FBQyxHQUFHLFFBQVE7QUFDakMsb0JBQVEsV0FBVyxDQUFDLE1BQU0sc0JBQXNCLEdBQUcsT0FBTyxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLHNCQUFzQixHQUFHLE9BQU8sT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDO0FBQUEsVUFDaEosT0FBTztBQUNMLG9CQUFRLFdBQVcsQ0FBQyxNQUFNLHNCQUFzQixHQUFHLE9BQU8sT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUFBLFVBQ2pGO0FBQ0E7QUFBQSxRQUNGO0FBQUEsUUFDQSxLQUFLLFdBQVc7QUFDZCxjQUFJLE9BQU8sT0FBTyxLQUFLLENBQUMsR0FBRyxRQUFRO0FBQ2pDLG9CQUFRLFdBQVcsQ0FBQyxNQUFNLG1CQUFtQixHQUFHLE9BQU8sT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxtQkFBbUIsR0FBRyxPQUFPLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQztBQUFBLFVBQzFJLE9BQU87QUFDTCxvQkFBUSxXQUFXLENBQUMsTUFBTSxtQkFBbUIsR0FBRyxPQUFPLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFBQSxVQUM5RTtBQUNBO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQ0EsV0FBTztBQUFBLEVBQ1Q7QUFFTyxXQUFTLFVBQVUsY0FBYyxLQUFLO0FBQzNDLFFBQUksYUFBYSxDQUFDO0FBRWxCLFFBQUksT0FBTztBQUFBLE1BQ1Q7QUFBQSxNQUNBO0FBQUEsTUFDQSxHQUFHO0FBQUEsSUFDTDtBQUVBLFdBQU8sUUFBUSxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUMsS0FBSyxPQUFPLE1BQU07QUFDOUMsYUFBTyxlQUFlLE1BQU0sS0FBSztBQUFBLFFBQy9CLE1BQU07QUFDSixjQUFJLFdBQVcsR0FBRztBQUFHLG1CQUFPLGFBQWEsV0FBVyxHQUFHLENBQUM7QUFFeEQsY0FBSSxZQUFZLG1CQUFtQixPQUFPLFFBQVEsZ0JBQWdCLENBQUMsQ0FBQyxHQUFHLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQztBQUNyRixjQUFJLENBQUMsV0FBVztBQUFRO0FBRXhCLHFCQUFXLEdBQUcsSUFBSSxVQUFVLENBQUM7QUFDN0IsaUJBQU8sVUFBVSxDQUFDO0FBQUEsUUFDcEI7QUFBQSxNQUNGLENBQUM7QUFBQSxJQUNILENBQUM7QUFFRCxXQUFPO0FBQUEsRUFDVDtBQUVPLFdBQVMsYUFBYSxLQUFLQyxVQUFTLENBQUMsR0FBRztBQUM3QyxVQUFNLGdCQUFnQixDQUFDLENBQUNBLFNBQVEsUUFBUTtBQUN4QyxRQUFJQyxTQUFRLEtBQUssS0FBSyxlQUFlRCxPQUFNLEdBQUcsRUFBRSxlQUFlLEtBQUssS0FBSyxDQUFDLEVBQUUsS0FBSyxPQUFLLE1BQU0sV0FBVyxVQUFVLEdBQUcsWUFBWSxXQUFXLE1BQU07QUFFakosUUFBSSxDQUFDQztBQUFPLGFBQU87QUFFbkIsUUFBSUQsUUFBTyxNQUFNO0FBQVEsTUFBQUMsVUFBUyxNQUFNLFFBQVFELFFBQU8sS0FBSyxNQUFNLElBQUlBLFFBQU8sS0FBSyxPQUFPLElBQUksT0FBSyxFQUFFLElBQUlDLFFBQU8sQ0FBQyxDQUFDLEVBQUUsS0FBSyxPQUFLLENBQUMsSUFBSSxFQUFFLElBQUlBLFFBQU9ELFFBQU8sS0FBSyxNQUFNLE1BQU1DO0FBQ3ZLLFFBQUlELFFBQU87QUFBUSxNQUFBQyxTQUFRLE9BQU8sT0FBTyxDQUFDLEdBQUdBLE1BQUs7QUFFbEQsUUFBSSxDQUFDQTtBQUFPLGFBQU87QUFFbkIsUUFBSUQsUUFBTztBQUFLLE1BQUFDLFNBQVEsVUFBVUEsUUFBT0QsUUFBTyxHQUFHO0FBRW5ELFFBQUlBLFFBQU8sTUFBTTtBQUFPLE1BQUFDLFVBQVMsTUFBTSxRQUFRRCxRQUFPLEtBQUssS0FBSyxJQUFJQSxRQUFPLEtBQUssTUFBTSxJQUFJLE9BQUssRUFBRSxJQUFJQyxRQUFPLENBQUMsQ0FBQyxFQUFFLEtBQUssT0FBSyxDQUFDLElBQUksRUFBRSxJQUFJQSxRQUFPRCxRQUFPLEtBQUssS0FBSyxNQUFNQztBQUVuSyxXQUFPQTtBQUFBLEVBQ1Q7QUFJQSxpQkFBc0IsaUJBQWlCRCxVQUFTLENBQUMsR0FBRztBQUNsRCxRQUFJQyxTQUFRLE1BQU0sU0FBUyxlQUFlRCxPQUFNLEdBQUcsRUFBRSxlQUFlLE1BQU0sQ0FBQztBQUUzRSxRQUFJLENBQUNDO0FBQU8sYUFBTztBQUVuQixRQUFJRCxRQUFPLE1BQU07QUFBUSxNQUFBQyxVQUFTLE1BQU0sUUFBUUQsUUFBTyxLQUFLLE1BQU0sSUFBSUEsUUFBTyxLQUFLLE9BQU8sSUFBSSxPQUFLLEVBQUUsSUFBSUMsUUFBTyxDQUFDLENBQUMsRUFBRSxLQUFLLE9BQUssQ0FBQyxJQUFJLEVBQUUsSUFBSUEsUUFBT0QsUUFBTyxLQUFLLE1BQU0sTUFBTUM7QUFDdkssUUFBSUQsUUFBTztBQUFRLE1BQUFDLFNBQVEsT0FBTyxPQUFPLENBQUMsR0FBR0EsTUFBSztBQUVsRCxRQUFJLENBQUNBO0FBQU8sYUFBTztBQUVuQixRQUFJRCxRQUFPO0FBQUssTUFBQUMsU0FBUSxVQUFVQSxRQUFPRCxRQUFPLEdBQUc7QUFFbkQsUUFBSUEsUUFBTyxNQUFNO0FBQU8sTUFBQUMsVUFBUyxNQUFNLFFBQVFELFFBQU8sS0FBSyxLQUFLLElBQUlBLFFBQU8sS0FBSyxNQUFNLElBQUksT0FBSyxFQUFFLElBQUlDLFFBQU8sQ0FBQyxDQUFDLEVBQUUsS0FBSyxPQUFLLENBQUMsSUFBSSxFQUFFLElBQUlBLFFBQU9ELFFBQU8sS0FBSyxLQUFLLE1BQU1DO0FBRW5LLFdBQU9BO0FBQUEsRUFDVDs7O0FDL1NBLE1BQU0sZ0JBQWdCO0FBQUEsSUFDcEI7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBRUEsTUFBTyxrQkFBUTtBQUFBLElBQ2IsV0FBVyxDQUFDO0FBQUEsSUFDWixJQUFJLFVBQVU7QUFDWixVQUFJLEtBQUssVUFBVTtBQUFTLGVBQU8sS0FBSyxVQUFVO0FBQ2xELFVBQUksUUFBUSxzQkFBc0IsS0FBSyxJQUFJO0FBQzNDLFlBQU0sTUFBTSxPQUFPLHdCQUF3QixLQUFLLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFHLENBQUFDLFNBQU9BLElBQUcsQ0FBQztBQUN6RSxhQUFPLElBQUksRUFBRSxLQUFLO0FBQ2xCLGFBQU8sSUFBSSxFQUFFLEtBQUs7QUFDbEIsYUFBTyx3QkFBd0IsSUFBSTtBQUNuQyxXQUFLLFVBQVUsVUFBVTtBQUN6QixhQUFPO0FBQUEsSUFDVDtBQUFBLElBQ0EsS0FBSyxRQUFRLFNBQVMsQ0FBQyxHQUFHO0FBQ3hCLGFBQXFCLEtBQUssS0FBSyxTQUF1QixXQUFXLE1BQU0sR0FBRyxNQUFNO0FBQUEsSUFDbEY7QUFBQSxJQUNBLFNBQVMsUUFBUSxTQUFTLENBQUMsR0FBRztBQUM1QixhQUFxQixTQUF1QixXQUFXLE1BQU0sR0FBRyxNQUFNO0FBQUEsSUFDeEU7QUFBQSxJQUNBLGlCQUFpQkMsU0FBUTtBQUN2QixhQUFxQixpQkFBaUJBLE9BQU07QUFBQSxJQUM5QztBQUFBLElBQ0EsT0FBTyxRQUFRLFNBQVMsQ0FBQyxHQUFHO0FBQzFCLGFBQXFCLEtBQUssS0FBSyxTQUF1QixXQUFXLE1BQU0sR0FBRyxFQUFFLEdBQUcsUUFBUSxLQUFLLEtBQUssQ0FBQztBQUFBLElBQ3BHO0FBQUEsSUFDQSxhQUFhQSxTQUFRO0FBQ25CLGFBQXFCLGFBQWEsS0FBSyxTQUFTQSxPQUFNO0FBQUEsSUFDeEQ7QUFBQSxJQUNBLHNCQUFzQixjQUFjO0FBQ2xDLGFBQU8sS0FBSyxLQUFLLENBQUMsTUFBTTtBQUFFLFlBQUksS0FBSyxPQUFPLE9BQU8sQ0FBQztBQUFHLGVBQU8sYUFBYSxNQUFNLE9BQUssR0FBRyxLQUFLLE9BQUssT0FBTyxLQUFLLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO0FBQUEsTUFBRSxDQUFDLEdBQUc7QUFBQSxJQUMvSTtBQUFBLElBQ0Esb0JBQW9CLE9BQU87QUFDekIsYUFBTyxLQUFLLGFBQWE7QUFBQSxRQUN2QixRQUFRO0FBQUEsVUFDTixRQUFRO0FBQUEsVUFDUixJQUFJO0FBQUEsVUFDSixJQUFJLENBQUMsS0FBSztBQUFBLFFBQ1o7QUFBQSxRQUNBLE1BQU07QUFBQSxVQUNKLFFBQVE7QUFBQSxRQUNWO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSDtBQUFBLElBQ0Esb0JBQW9CLE9BQU87QUFDekIsYUFBTyxLQUFLLGFBQWE7QUFBQSxRQUN2QixRQUFRO0FBQUEsVUFDTixRQUFRO0FBQUEsVUFDUixJQUFJO0FBQUEsVUFDSixJQUFJLENBQUMsS0FBSztBQUFBLFFBQ1o7QUFBQSxRQUNBLE1BQU07QUFBQSxVQUNKLFFBQVE7QUFBQSxRQUNWO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSDtBQUFBLElBQ0EsaUJBQWlCLE9BQU87QUFDdEIsYUFBTyxLQUFLLGFBQWE7QUFBQSxRQUN2QixRQUFRO0FBQUEsVUFDTixRQUFRO0FBQUEsVUFDUixJQUFJO0FBQUEsVUFDSixJQUFJLENBQUMsS0FBSztBQUFBLFFBQ1o7QUFBQSxRQUNBLE1BQU07QUFBQSxVQUNKLFFBQVE7QUFBQSxRQUNWO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSDtBQUFBLEVBQ0Y7OztBQ3ZFQSxXQUFTLFVBQVUsTUFBTSxLQUFLO0FBQzVCLFFBQUksQ0FBQyxNQUFNO0FBQVcsV0FBSyxZQUFZLENBQUM7QUFDeEMsZUFBVyxPQUFPLEtBQUs7QUFDckIsVUFBSSxNQUFNLEdBQUcsR0FBRyxPQUFPLE1BQU07QUFDM0IsZUFBTyxlQUFlLE1BQU0sS0FBSztBQUFBLFVBQy9CLE1BQU07QUFDSixnQkFBSSxLQUFLLFVBQVUsR0FBRztBQUFHLHFCQUFPLEtBQUssVUFBVSxHQUFHO0FBQ2xELG1CQUFPLEtBQUssVUFBVSxHQUFHLElBQUksZ0JBQVEsYUFBYSxJQUFJLEdBQUcsQ0FBQztBQUFBLFVBQzVEO0FBQUEsUUFDRixDQUFDO0FBQUEsTUFDSCxPQUFPO0FBQ0wsWUFBSSxPQUFPLEtBQUssR0FBRyxNQUFNO0FBQWEsZUFBSyxHQUFHLElBQUksQ0FBQztBQUNuRCxrQkFBVSxLQUFLLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQztBQUFBLE1BQy9CO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFHQSxNQUFJLFNBQVM7QUFBQSxJQUNYLFdBQVcsQ0FBQztBQUFBLElBQ1osY0FBYztBQUFBLE1BQ1osS0FBSyxXQUFXO0FBQ2QsZUFBTyxlQUFlLFNBQVM7QUFBQSxVQUM3QixNQUFNO0FBQUEsVUFDTjtBQUFBLFFBQ0YsQ0FBQztBQUFBLE1BQ0g7QUFBQSxNQUNBLE1BQU07QUFDSixlQUFPLGVBQWUsU0FBUztBQUFBLFVBQzdCLE1BQU07QUFBQSxRQUNSLENBQUM7QUFBQSxNQUNIO0FBQUEsTUFDQSxTQUFTO0FBQ1AsZUFBTyxlQUFlLFNBQVM7QUFBQSxVQUM3QixNQUFNO0FBQUEsUUFDUixDQUFDO0FBQUEsTUFDSDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0EsWUFBVSxRQUFRLGVBQVcsTUFBTTtBQUNuQztBQUNFLFFBQUksUUFBUTtBQUFBLE1BQ1Y7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNGO0FBQ0Esb0JBQVEsT0FBTyxDQUFDLE1BQU0sR0FBRyxVQUFVLEdBQUcsV0FBVyxPQUFPLEdBQUcsRUFBRSxlQUFlLE1BQU0sQ0FBQyxFQUFFLFFBQVEsQ0FBQyxNQUFNO0FBQ2xHLFVBQUksTUFBTSxNQUFNLElBQUksVUFBUSxFQUFFLElBQUksR0FBRyxJQUFJLENBQUMsRUFBRSxLQUFLLE9BQUssQ0FBQztBQUN2RCxVQUFJLENBQUM7QUFBSztBQUNWLFVBQUksT0FBTyxLQUFLLFVBQVU7QUFDMUIsVUFBSSxDQUFDO0FBQU07QUFDWCxVQUFJLE9BQU8sSUFBSTtBQUFHO0FBRWxCLGFBQU8sZUFBZSxRQUFRLE1BQU07QUFBQSxRQUNsQyxNQUFNO0FBQ0osY0FBSSxPQUFPLFVBQVUsSUFBSTtBQUFHLG1CQUFPLE9BQU8sVUFBVSxJQUFJO0FBQ3hELGlCQUFPLE9BQU8sVUFBVSxJQUFJLElBQUk7QUFBQSxRQUNsQztBQUFBLE1BQ0YsQ0FBQztBQUFBLElBQ0gsQ0FBQztBQUFBLEVBQ0g7QUFFQSxNQUFPQyxrQkFBUTs7O0FDaEVmLE1BQU8sa0JBQVE7QUFBQSxJQUNiLFFBQUFDO0FBQUEsSUFDQTtBQUFBLElBQ0EsU0FBUyxXQUFXLGVBQWUsRUFBRTtBQUFBLElBQ3JDLFFBQVE7QUFBQSxFQUNWOzs7QUNMQSxNQUFNLFdBQVc7QUFDakIsTUFBTUMsV0FBVSxFQUFFLE9BQU8sV0FBVztBQUdwQyxNQUFNLE1BQU07QUFBQSxJQUNWLFdBQVc7QUFBQSxNQUNULFdBQVcsQ0FBQztBQUFBLE1BQ1osZUFBZSxDQUFDO0FBQUEsSUFDbEI7QUFBQSxJQUNBLElBQUksU0FBUztBQUNYLGFBQU8sZ0JBQVEsT0FBTyxLQUFLO0FBQUEsSUFDN0I7QUFBQSxJQUNBLElBQUksS0FBSztBQUNQLFlBQU07QUFDTixhQUFPLElBQUksVUFBVSxjQUFjLElBQUksTUFBTSxJQUFJLEdBQUcsS0FDL0MsSUFBSSxVQUFVLGNBQWMsVUFBVSxHQUFHLEtBQ3pDLGdCQUFRLE9BQU8sS0FBSyxTQUFTLEdBQUcsS0FDaEM7QUFBQSxJQUNQO0FBQUEsSUFDQSxVQUFVLElBQUksTUFBTSxDQUFDLEdBQUc7QUFBQSxNQUN0QixJQUFJQyxJQUFHLE1BQU07QUFDWCxlQUFPLElBQUksSUFBSSxJQUFJO0FBQUEsTUFDckI7QUFBQSxJQUNGLENBQUM7QUFBQSxJQUNELFNBQVMsS0FBSztBQUNaLFVBQUksT0FBTyxRQUFRO0FBQVUsZUFBTztBQUNwQyxhQUFPLE1BQU0sSUFBSSxNQUFNLEtBQ2xCLEtBQUssV0FDTCxPQUFPLE9BQU8sR0FBRyxFQUFFLENBQUM7QUFBQSxJQUMzQjtBQUFBLElBQ0EsT0FBTyxRQUFRLE1BQU07QUFDbkIsYUFBTyxjQUFNLE9BQU8sSUFBSSxJQUFJLEdBQUcsR0FBRyxHQUFHLElBQUk7QUFBQSxJQUMzQztBQUFBLEVBQ0Y7QUFFQSxpQkFBZSxRQUFRO0FBQ3JCLFVBQU0sU0FBUyxJQUFJO0FBQ25CLFFBQUksQ0FBQyxJQUFJLFVBQVUsVUFBVSxRQUFRO0FBQ25DLFVBQUk7QUFDRixZQUFJLFVBQVUsWUFBWSxPQUFPLE1BQU0sTUFBTSxHQUFHLHlCQUF5QkQsUUFBTyxHQUFHLEtBQUs7QUFBQSxNQUMxRixRQUFFO0FBQUEsTUFBUTtBQUNWLFVBQUk7QUFDRixZQUFJLFVBQVUsY0FBYyxVQUFVLE9BQU8sTUFBTSxNQUFNLEdBQUcseUJBQXlCQSxRQUFPLEdBQUcsS0FBSztBQUFBLE1BQ3RHLFFBQUU7QUFBQSxNQUFRO0FBQUEsSUFDWjtBQUNBLFFBQ0UsSUFBSSxVQUFVLFVBQVUsU0FBUyxNQUFNLEtBQ3BDLENBQUMsSUFBSSxVQUFVLGdCQUFnQixNQUFNLEdBQ3hDO0FBQ0EsVUFBSTtBQUNGLFlBQUksVUFBVSxjQUFjLE1BQU0sSUFBSSxPQUFPLE1BQU0sTUFBTSxHQUFHLFlBQVksZUFBZUEsUUFBTyxHQUFHLEtBQUs7QUFBQSxNQUN4RyxRQUFFO0FBQUEsTUFBUTtBQUFDO0FBQUEsSUFDYjtBQUFBLEVBQ0Y7QUFFQSxRQUFNO0FBQ04sTUFBTyxlQUFROzs7QUN4RGYsTUFBSSxtQkFBbUI7QUFFaEIsV0FBUywwQkFBMEI7QUFDeEMsV0FBTyxJQUFJLFFBQVEsQ0FBQyxZQUFZO0FBQzlCLFVBQUk7QUFBa0IsZUFBTyxRQUFRLElBQUk7QUFDekMsZUFBUyxVQUFVO0FBQ2pCLHdCQUFRLE9BQU8sZUFBZSxZQUFZLG1CQUFtQixPQUFPO0FBQ3BFLDJCQUFtQjtBQUNuQixnQkFBUSxJQUFJO0FBQUEsTUFDZDtBQUNBLHNCQUFRLE9BQU8sZUFBZSxVQUFVLG1CQUFtQixPQUFPO0FBQUEsSUFDcEUsQ0FBQztBQUFBLEVBQ0g7QUFFTyxXQUFTLGFBQWEsR0FBRztBQUM5QixRQUFJLE9BQU8sTUFBTTtBQUFVLGFBQU87QUFDbEMsV0FBTyxJQUFJLGFBQUssTUFBTSxLQUFLLEdBQUcsV0FBVyxPQUFPLE9BQU8sQ0FBQyxFQUFFLENBQUM7QUFBQSxFQUM3RDs7O0FDcEJPLE1BQU0sb0JBQU4sTUFBd0I7QUFBQSxJQUM3QixjQUFjO0FBRVosV0FBSyxZQUFZLG9CQUFJLElBQUk7QUFBQSxJQUMzQjtBQUFBLElBRUEscUJBQXFCLFdBQVc7QUFDOUIsVUFBSSxDQUFDLEtBQUssVUFBVSxJQUFJLFNBQVM7QUFDL0IsYUFBSyxVQUFVLElBQUksV0FBVyxvQkFBSSxJQUFJLENBQUM7QUFBQSxJQUMzQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFNQSxHQUFHLFdBQVcsVUFBVTtBQUN0QixXQUFLLHFCQUFxQixTQUFTO0FBQ25DLFdBQUssVUFBVSxJQUFJLFNBQVMsRUFBRSxJQUFJLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMzRCxhQUFPLE1BQU07QUFDWCxhQUFLLFVBQVUsSUFBSSxTQUFTLEVBQUUsT0FBTyxRQUFRO0FBQUEsTUFDL0M7QUFBQSxJQUNGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQU1BLEtBQUssV0FBVyxVQUFVO0FBQ3hCLFdBQUsscUJBQXFCLFNBQVM7QUFDbkMsV0FBSyxVQUFVLElBQUksU0FBUyxHQUFHLElBQUksVUFBVSxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBQzNELGFBQU8sTUFBTTtBQUNYLGFBQUssVUFBVSxJQUFJLFNBQVMsRUFBRSxPQUFPLFFBQVE7QUFBQSxNQUMvQztBQUFBLElBQ0Y7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBTUEsSUFBSSxXQUFXLFVBQVU7QUFDdkIsVUFBSSxDQUFDO0FBQVcsZUFBUSxLQUFLLFlBQVksb0JBQUksSUFBSTtBQUNqRCxVQUFJLENBQUM7QUFBVSxlQUFPLEtBQUssV0FBVyxPQUFPLFNBQVM7QUFDdEQsV0FBSyxVQUFVLElBQUksU0FBUyxHQUFHLE9BQU8sUUFBUTtBQUFBLElBQ2hEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQU1BLEtBQUssY0FBYyxNQUFNO0FBQ3ZCLFVBQUksQ0FBQyxLQUFLLFVBQVUsSUFBSSxTQUFTO0FBQUc7QUFDcEMsVUFBSSxXQUFXLEtBQUssVUFBVSxJQUFJLFNBQVM7QUFDM0MsZUFBUyxRQUFRLENBQUMsRUFBRSxLQUFLLEdBQUcsYUFBYTtBQUN2QyxZQUFJO0FBQU0sb0JBQVUsT0FBTyxRQUFRO0FBQ25DLGlCQUFTLEdBQUcsSUFBSTtBQUFBLE1BQ2xCLENBQUM7QUFBQSxJQUNIO0FBQUEsRUFDRjs7O0FDdkRBLE1BQU0sU0FBUyxJQUFJLGtCQUFrQjtBQUVyQyxNQUFPLGlCQUFROzs7QUNEZixNQUFNLG1CQUFtQixnQkFBUSxpQkFBaUIsMEJBQTBCLFNBQVM7QUFFckYsTUFBTSxnQkFBZ0I7QUFBQSxJQUNwQixNQUFNO0FBQUEsSUFDTixRQUFRO0FBQUEsSUFDUixXQUFXO0FBQUEsSUFDWCxRQUFRO0FBQUEsSUFDUixLQUFLO0FBQUEsSUFDTCxRQUFRO0FBQUEsSUFDUixpQkFBaUI7QUFBQSxJQUNqQixnQkFBZ0I7QUFBQSxFQUNsQjtBQUdBLE1BQU8sY0FBUTtBQUFBLElBQ2IsTUFBTSxNQUFNO0FBQ1YsWUFBTSxNQUFNLFNBQVMsY0FBYyxLQUFLO0FBQ3hDLFVBQUksWUFBWTtBQUNoQixhQUFPLElBQUk7QUFBQSxJQUNiO0FBQUEsSUFDQSxVQUFVLEdBQUc7QUFDWCxVQUFJLE1BQU0sU0FBUyxjQUFjLEtBQUs7QUFDdEMsYUFBTyxRQUFRLENBQUMsRUFBRSxRQUFRLENBQUMsTUFBTTtBQUMvQixZQUFJLElBQUksTUFBTSxlQUFlLEVBQUUsQ0FBQyxDQUFDLEdBQUc7QUFDbEMsY0FBSSxNQUFNLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQUEsUUFDdkIsT0FBTztBQUNMLGNBQUksTUFBTSxZQUFZLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0FBQUEsUUFDbEM7QUFBQSxNQUNGLENBQUM7QUFDRCxhQUFPLElBQUksYUFBYSxPQUFPO0FBQUEsSUFDakM7QUFBQSxJQUNBLFlBQVksR0FBRztBQUNiLGFBQU8sT0FBTyxRQUFRLENBQUMsRUFDcEI7QUFBQSxRQUNDLENBQUMsTUFDQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLFFBQVEsTUFBTSxHQUFHLE1BQU0sRUFBRSxDQUFDLEtBQUssV0FBVyxPQUFPLEVBQUUsQ0FBQyxLQUFLLFdBQzdELEtBQUssVUFBVSxFQUFFLENBQUMsQ0FBQyxJQUNuQixLQUFLLFdBQVcsRUFBRSxDQUFDLENBQUM7QUFBQSxNQUM1QixFQUNDLEtBQUssR0FBRztBQUFBLElBQ2I7QUFBQSxJQUNBLE9BQU8sTUFBTTtBQUNYLGFBQU8sSUFBSSxPQUFPLElBQUksRUFBRTtBQUFBLElBQzFCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBTUEsUUFBUSxLQUFLLGtCQUFrQjtBQUM3QixVQUFJLFVBQVUsQ0FBQztBQUNmLFVBQUksT0FBTyxxQkFBcUIsVUFBVTtBQUN4QyxpQkFBUyxJQUFJLEdBQUcsSUFBSSxrQkFBa0IsS0FBSztBQUN6QyxjQUFJLElBQUksZUFBZTtBQUNyQixrQkFBTSxJQUFJO0FBQ1Ysb0JBQVEsS0FBSyxHQUFHO0FBQUEsVUFDbEI7QUFBQSxRQUNGO0FBQUEsTUFDRixPQUFPO0FBQ0wsZUFBTyxJQUFJLGlCQUFpQixJQUFJLGNBQWMsUUFBUSxnQkFBZ0IsR0FBRztBQUN2RSxnQkFBTSxJQUFJLGNBQWMsUUFBUSxnQkFBZ0I7QUFDaEQsa0JBQVEsS0FBSyxHQUFHO0FBQUEsUUFDbEI7QUFBQSxNQUNGO0FBQ0EsYUFBTztBQUFBLElBQ1Q7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQU9BLE9BQU8sQ0FBQyxVQUFVLFFBQ2YsTUFBTTtBQUNMLGVBQVMsVUFBVSxNQUFNO0FBQ3ZCLFlBQUksT0FBTyxNQUFNLG9CQUFvQjtBQUFZO0FBQ2pELGFBQUssaUJBQWlCLFFBQVEsRUFBRSxRQUFRLE9BQU8sUUFBUTtBQUNyRCxjQUFJLENBQUMsSUFBSSxPQUFPO0FBQ2QsZ0JBQUksUUFBUSxFQUFFLFNBQVMsQ0FBQyxHQUFHLFNBQVMsb0JBQUksSUFBSSxFQUFFO0FBQzlDLGdCQUFJLFVBQVUsSUFBSSxnQkFBZ0I7QUFBQSxVQUNwQztBQUVBLGNBQUksSUFBSSxNQUFNLFFBQVEsSUFBSSxFQUFFO0FBQUc7QUFDL0IsY0FBSSxNQUFNLFFBQVEsSUFBSSxFQUFFO0FBRXhCLGNBQUksWUFBWSxNQUFNLEdBQUcsR0FBRztBQUM1QixjQUFJLE9BQU8sY0FBYztBQUN2QixnQkFBSSxNQUFNLFFBQVEsS0FBSyxTQUFTO0FBQUEsUUFDcEMsQ0FBQztBQUFBLE1BQ0g7QUFFQSxlQUFTLFlBQVksTUFBTTtBQUN6QixZQUFJLE9BQU8sTUFBTSxvQkFBb0I7QUFBWTtBQUNqRCxhQUFLLGlCQUFpQixRQUFRLEVBQUUsUUFBUSxPQUFPLFFBQVE7QUFDckQsY0FBSSxDQUFDLElBQUk7QUFBTztBQUNoQixjQUFJLE1BQU0sUUFBUSxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7QUFBQSxRQUN0QyxDQUFDO0FBQUEsTUFDSDtBQUVBLGVBQVMsaUJBQWlCLFFBQVEsRUFBRSxRQUFRLFNBQVM7QUFFckQsYUFBTyxlQUFPO0FBQUEsUUFDWjtBQUFBO0FBQUEsUUFDa0MsQ0FBQyxRQUFRO0FBQ3pDLGNBQUksSUFBSSxTQUFTLGFBQWE7QUFDNUIsZ0JBQUksV0FBVyxRQUFRLFNBQVM7QUFDaEMsZ0JBQUksYUFBYSxRQUFRLFdBQVc7QUFBQSxVQUN0QztBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRixHQUFHO0FBQUEsSUFDTCxjQUFjLEtBQUs7QUFDakIsVUFBSSxDQUFDO0FBQUssZUFBTztBQUNqQixZQUFNLEVBQUUsTUFBTSxRQUFRLFdBQVcsUUFBUSxnQkFBZ0IsaUJBQWlCLFFBQVEsSUFBSSxJQUFJO0FBRTFGLFlBQU0sZ0JBQWdCLE9BQU8sWUFBWTtBQUFBLFFBQ3ZDLEdBQUksSUFBSSxTQUFTLGNBQWMsS0FBSyxDQUFDO0FBQUEsUUFBSSxHQUFJLElBQUksU0FBUyxlQUFlLEtBQUssQ0FBQztBQUFBLE1BQ2pGLEVBQUU7QUFBQSxRQUNBLENBQUMsQ0FBQ0UsSUFBRyxpQkFBaUIsZ0JBQWdCLEdBQUcsTUFBTTtBQUM3QyxnQkFBTSxJQUFJLFFBQVFBLElBQUcsZUFBZSxLQUFLO0FBQ3pDLGlCQUFPO0FBQUEsWUFDTCxlQUFlO0FBQUEsWUFDZixtQkFDRSxxQkFBcUIsaUJBQWlCLCtCQUErQixnREFBZ0QsUUFBUSxPQUFPLEtBQUssVUFBVSxpQkFBaUIsZ0JBQWdCLEVBQUUsdUJBQ3RMLHFCQUFxQixpQkFBaUIsNERBQTREO0FBQUEsVUFDdEc7QUFBQSxRQUNGO0FBQUEsTUFDRixDQUFDO0FBRUQsWUFBTSxZQUFZLE9BQU87QUFBQSxRQUN2QixDQUFDLEdBQUksSUFBSSxTQUFTLE1BQU0sS0FBSyxDQUFDLENBQUUsRUFBRTtBQUFBLFVBQ2hDLENBQUMsQ0FBQ0EsSUFBRyxhQUFhLEdBQUcsTUFBTTtBQUN6QixrQkFBTSxJQUFJLFFBQVFBLElBQUcsWUFBWSxLQUFLO0FBQ3RDLG1CQUFPLENBQUMsWUFBWSxPQUFPLHdCQUF3QixzQkFBc0I7QUFBQSxVQUMzRTtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBRUEsWUFBTSxJQUFJLFFBQVEsTUFBTSxXQUFXLEVBQ2hDLFFBQVEsUUFBUSxXQUFXLEVBQzNCLFFBQVEsV0FBVyxXQUFXLEVBQzlCLFFBQVEsUUFBUSxXQUFXLEVBQzNCLFFBQVEsS0FBSyxxQkFBcUI7QUFFckMsaUJBQVcsQ0FBQyxLQUFLLEtBQUssS0FBSyxPQUFPLFFBQVEsYUFBYSxHQUFHO0FBQ3hELGNBQU0sSUFBSSxRQUFRLEtBQUssS0FBSztBQUFBLE1BQzlCO0FBRUEsaUJBQVcsQ0FBQyxLQUFLLEtBQUssS0FBSyxPQUFPLFFBQVEsU0FBUyxHQUFHO0FBQ3BELGNBQU0sSUFBSSxRQUFRLEtBQUssS0FBSztBQUFBLE1BQzlCO0FBRUEsYUFBTztBQUFBLElBQ1Q7QUFBQSxJQUNBLFFBQVEsV0FBVztBQUNqQixVQUFJLHFCQUFxQjtBQUFTLGVBQU87QUFDekMsYUFBTyxLQUFLLE1BQU0sU0FBUztBQUFBLElBQzdCO0FBQUEsRUFDRjtBQUVBO0FBQ0UsVUFBTSxXQUFXLElBQUksaUJBQWlCLENBQUMsY0FBYztBQUNuRCxnQkFBVSxRQUFRLENBQUMsYUFBYTtBQUM5Qix1QkFBTyxLQUFLLGdCQUFnQixRQUFRO0FBQUEsTUFDdEMsQ0FBQztBQUFBLElBQ0gsQ0FBQztBQUNELGFBQVMsUUFBUSxVQUFVO0FBQUEsTUFDekIsWUFBWTtBQUFBLE1BQ1osV0FBVztBQUFBLE1BQ1gsU0FBUztBQUFBLElBQ1gsQ0FBQztBQUFBLEVBQ0g7OztBQzdLTyxNQUFNLGFBQWEsQ0FBQyxLQUFLLEtBQUssR0FBRztBQUNqQyxNQUFNLGlCQUFpQixvQkFBSSxJQUFJOzs7QUNBdkIsV0FBUixhQUFrQixVQUFVLFlBQVksVUFFL0MsTUFFQSxhQUFhO0FBQ1QsVUFBTSxRQUFRLGVBQWUsSUFBSSxVQUFVLElBQUksUUFBUTtBQUV2RCxRQUFJLENBQUM7QUFDRCxhQUFPLGNBQ0QsUUFBUSxVQUFVLFdBQVcsUUFBUSxHQUFHLFVBQVUsSUFBSSxJQUN0RCxXQUFXLFFBQVEsRUFBRSxNQUFNLE1BQU0sUUFBUTtBQUVuRCxlQUFXLFFBQVEsTUFBTSxFQUFFLE9BQU8sR0FBRztBQUNqQyxZQUFNLGdCQUFnQixLQUFLLEtBQUssTUFBTSxRQUFRO0FBQzlDLFVBQUksTUFBTSxRQUFRLGFBQWE7QUFDM0IsbUJBQVc7QUFBQSxJQUNuQjtBQUVBLFFBQUkscUJBQXFCLElBQUksU0FBUyxjQUNoQyxRQUFRLFVBQVUsTUFBTSxHQUFHLE1BQU0sSUFBSSxJQUNyQyxNQUFNLEVBQUUsTUFBTSxNQUFNLElBQUk7QUFDOUIsZUFBVyxZQUFZLE1BQU0sRUFBRSxPQUFPLEdBQUc7QUFDckMsWUFBTSxlQUFlO0FBQ3JCLDJCQUFxQixJQUFJLFNBQVMsU0FBUyxLQUFLLE1BQU0sTUFBTSxZQUFZO0FBQUEsSUFDNUU7QUFDQSxRQUFJLGdCQUFnQixtQkFBbUIsR0FBRyxRQUFRO0FBRWxELGVBQVcsUUFBUSxNQUFNLEVBQUUsT0FBTztBQUM5QixzQkFBZ0IsS0FBSyxLQUFLLE1BQU0sVUFBVSxhQUFhLEtBQUs7QUFDaEUsV0FBTztBQUFBLEVBQ1g7OztBQy9CTyxXQUFTLFFBQVEsWUFBWSxVQUFVLFFBQVEsTUFBTTtBQUN4RCxVQUFNLGdCQUFnQixlQUFlLElBQUksVUFBVTtBQUNuRCxVQUFNLFFBQVEsZ0JBQWdCLFFBQVE7QUFDdEMsUUFBSSxDQUFDLFFBQVEsSUFBSSxFQUFFLElBQUksTUFBTTtBQUN6QixhQUFPO0FBQ1gsVUFBTSxJQUFJLEVBQUUsT0FBTyxNQUFNO0FBRXpCLFFBQUksV0FBVyxNQUFNLENBQUMsTUFBTSxNQUFNLENBQUMsRUFBRSxTQUFTLENBQUMsR0FBRztBQUk5QyxZQUFNLFVBQVUsUUFBUSxlQUFlLFlBQVksVUFBVTtBQUFBLFFBQ3pELE9BQU8sTUFBTTtBQUFBLFFBQ2IsVUFBVTtBQUFBLFFBQ1YsY0FBYztBQUFBLE1BQ2xCLENBQUM7QUFDRCxVQUFJLENBQUM7QUFDRCxtQkFBVyxRQUFRLElBQUksTUFBTTtBQUNqQyxhQUFPLGNBQWMsUUFBUTtBQUFBLElBQ2pDO0FBQ0EsUUFBSSxPQUFPLEtBQUssYUFBYSxFQUFFLFVBQVU7QUFDckMscUJBQWUsT0FBTyxVQUFVO0FBQ3BDLFdBQU87QUFBQSxFQUNYO0FBQ08sV0FBUyxhQUFhO0FBQ3pCLGVBQVcsQ0FBQyxjQUFjLGFBQWEsS0FBSyxlQUFlLFFBQVE7QUFDL0QsaUJBQVcsWUFBWTtBQUNuQixtQkFBVyxZQUFZO0FBQ25CLHFCQUFXLFVBQVUsY0FBYyxRQUFRLElBQUksUUFBUSxFQUFFLEtBQUssS0FBSyxDQUFDO0FBQ2hFLG9CQUFRLGNBQWMsVUFBVSxRQUFRLFFBQVE7QUFBQSxFQUNwRTs7O0FDeEJBLE1BQU8seUJBQVEsQ0FBQyxjQUFjLENBQUMsVUFBVSxZQUFZLFVBQVUsVUFBVSxVQUFVO0FBQy9FLFFBQUksT0FBTyxXQUFXLFFBQVEsTUFBTTtBQUNoQyxZQUFNLElBQUksTUFBTSxHQUFHLGlDQUFpQyxXQUFXLFlBQVksTUFBTTtBQUNyRixRQUFJLENBQUMsZUFBZSxJQUFJLFVBQVU7QUFDOUIscUJBQWUsSUFBSSxZQUFZLENBQUMsQ0FBQztBQUNyQyxVQUFNLG1CQUFtQixlQUFlLElBQUksVUFBVTtBQUN0RCxRQUFJLENBQUMsaUJBQWlCLFFBQVEsR0FBRztBQUM3QixZQUFNLFdBQVcsV0FBVyxRQUFRO0FBRXBDLHVCQUFpQixRQUFRLElBQUk7QUFBQSxRQUN6QixHQUFHO0FBQUEsUUFDSCxHQUFHLG9CQUFJLElBQUk7QUFBQSxRQUNYLEdBQUcsb0JBQUksSUFBSTtBQUFBLFFBQ1gsR0FBRyxvQkFBSSxJQUFJO0FBQUEsTUFDZjtBQUNBLFlBQU0sVUFBVSxDQUFDLE1BQU0sTUFBTSxjQUFjO0FBQ3ZDLGNBQU0sTUFBTSxhQUFLLFVBQVUsWUFBWSxNQUFNLE1BQU0sU0FBUztBQUM1RCxZQUFJO0FBQ0EsMkJBQWlCO0FBQ3JCLGVBQU87QUFBQSxNQUNYO0FBQ0EsWUFBTSxlQUFlLElBQUksTUFBTSxVQUFVO0FBQUEsUUFDckMsT0FBTyxDQUFDQyxJQUFHLE1BQU0sU0FBUyxRQUFRLE1BQU0sTUFBTSxLQUFLO0FBQUEsUUFDbkQsV0FBVyxDQUFDQSxJQUFHLFNBQVMsUUFBUSxVQUFVLE1BQU0sSUFBSTtBQUFBLFFBQ3BELEtBQUssQ0FBQyxRQUFRLE1BQU0sYUFBYSxRQUFRLGFBQ25DLFNBQVMsU0FBUyxLQUFLLFFBQVEsSUFDL0IsUUFBUSxJQUFJLFFBQVEsTUFBTSxRQUFRO0FBQUEsTUFDNUMsQ0FBQztBQUdELFlBQU0sVUFBVSxRQUFRLGVBQWUsWUFBWSxVQUFVO0FBQUEsUUFDekQsT0FBTztBQUFBLFFBQ1AsY0FBYztBQUFBLFFBQ2QsVUFBVTtBQUFBLE1BQ2QsQ0FBQztBQUNELFVBQUksQ0FBQztBQUNELG1CQUFXLFFBQVEsSUFBSTtBQUMzQixpQkFBVyxRQUFRLEVBQUUsZUFBZSxpQkFBaUIsUUFBUSxFQUFFO0FBQUEsSUFDbkU7QUFDQSxVQUFNLFNBQVMsT0FBTztBQUN0QixVQUFNLG1CQUFtQixNQUFNLFFBQVEsWUFBWSxVQUFVLFFBQVEsU0FBUztBQUM5RSxxQkFBaUIsUUFBUSxFQUFFLFNBQVMsRUFBRSxJQUFJLFFBQVEsUUFBUTtBQUMxRCxXQUFPO0FBQUEsRUFDWDs7O0FDL0NBLE1BQU0sU0FBUyx1QkFBYSxHQUFHO0FBQy9CLE1BQU0sVUFBVSx1QkFBYSxHQUFHO0FBQ2hDLE1BQU0sUUFBUSx1QkFBYSxHQUFHOzs7QUNIOUIsTUFBTyxrQkFBUTtBQUFBLElBQ2IsV0FBVztBQUFBLE1BQ1QsU0FBbUI7QUFBQSxJQUNyQjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBLFVBQVUsS0FBSztBQUNiLFlBQU0sUUFBUSxTQUFTLGNBQWMsT0FBTztBQUM1QyxZQUFNLFlBQVk7QUFDbEIsWUFBTSxjQUFjO0FBQ3BCLGVBQVMsS0FBSyxZQUFZLEtBQUs7QUFFL0IsYUFBTyxNQUFNO0FBQ1gsZUFBTyxPQUFPO0FBQUEsTUFDaEI7QUFBQSxJQUNGO0FBQUEsSUFDQSxnQkFBZ0I7QUFDZCxlQUFTLGlCQUFpQixzQkFBc0IsRUFBRSxRQUFRLGFBQVc7QUFDbkUsZ0JBQVEsT0FBTztBQUFBLE1BQ2pCLENBQUM7QUFBQSxJQUNIO0FBQUEsRUFDRjs7O0FDekJBLE1BQU8sZ0JBQVE7QUFBQTs7O0FDSWYsTUFBSTtBQUVKLGlCQUFlLE9BQU87QUFDcEIsUUFBSSxTQUFTLGNBQWMseUJBQXlCO0FBQUc7QUFDdkQsV0FBTyxNQUFNO0FBQ1gsVUFBSSxTQUFTLGNBQWMsWUFBWTtBQUFHO0FBQzFDLFlBQU0sSUFBSSxRQUFRLENBQUMsWUFBWSxXQUFXLFNBQVMsR0FBRyxDQUFDO0FBQUEsSUFDekQ7QUFFQSxlQUFXLGdCQUFRLFVBQVUsYUFBTztBQUNwQyxVQUFNLFVBQVUsWUFBSSxNQUFNO0FBQUE7QUFBQSxHQUV6QjtBQUNELGFBQVMsY0FBYyxZQUFZLEVBQUUsWUFBWSxPQUFPO0FBQUEsRUFDMUQ7QUFFQSxXQUFTLE9BQU87QUFDZCxRQUFJLE1BQU0sU0FBUyxjQUFjLHlCQUF5QjtBQUMxRCxRQUFJLEtBQUs7QUFDUCxVQUFJLFVBQVUsSUFBSSxRQUFRO0FBQzFCLGlCQUFXLE1BQU07QUFDZixZQUFJLE9BQU87QUFDWCxtQkFBVztBQUNYLG1CQUFXO0FBQUEsTUFDYixHQUFHLEdBQUc7QUFBQSxJQUNSO0FBQUEsRUFDRjtBQUVBLE1BQU8sNEJBQVE7QUFBQSxJQUNiO0FBQUEsSUFDQTtBQUFBLEVBQ0Y7OztBQ25DQSxNQUFJLGlCQUFpQjtBQUVyQixNQUFPLGNBQVE7QUFBQSxJQUNiLElBQUksVUFBVTtBQUNaLGFBQU87QUFBQSxJQUNUO0FBQUEsSUFDQSxJQUFJLFFBQVEsT0FBTztBQUNqQixVQUFJLENBQUMsV0FBVyxlQUFlLEVBQUUsZUFBZTtBQUFHLGNBQU0sSUFBSSxNQUFNLDZEQUE2RDtBQUNoSSx1QkFBaUI7QUFBQSxJQUNuQjtBQUFBLEVBQ0Y7OztBQ1ZBLGNBQXVCOzs7QUNBdkIsV0FBUyxpQkFBaUIsU0FBUztBQUMvQixXQUFPLElBQUksUUFBUSxDQUFDLFNBQVMsV0FBVztBQUVwQyxjQUFRLGFBQWEsUUFBUSxZQUFZLE1BQU0sUUFBUSxRQUFRLE1BQU07QUFFckUsY0FBUSxVQUFVLFFBQVEsVUFBVSxNQUFNLE9BQU8sUUFBUSxLQUFLO0FBQUEsSUFDbEUsQ0FBQztBQUFBLEVBQ0w7QUFDQSxXQUFTLFlBQVksUUFBUSxXQUFXO0FBQ3BDLFVBQU0sVUFBVSxVQUFVLEtBQUssTUFBTTtBQUNyQyxZQUFRLGtCQUFrQixNQUFNLFFBQVEsT0FBTyxrQkFBa0IsU0FBUztBQUMxRSxVQUFNLE1BQU0saUJBQWlCLE9BQU87QUFDcEMsV0FBTyxDQUFDLFFBQVEsYUFBYSxJQUFJLEtBQUssQ0FBQyxPQUFPLFNBQVMsR0FBRyxZQUFZLFdBQVcsTUFBTSxFQUFFLFlBQVksU0FBUyxDQUFDLENBQUM7QUFBQSxFQUNwSDtBQUNBLE1BQUk7QUFDSixXQUFTLGtCQUFrQjtBQUN2QixRQUFJLENBQUMscUJBQXFCO0FBQ3RCLDRCQUFzQixZQUFZLGdCQUFnQixRQUFRO0FBQUEsSUFDOUQ7QUFDQSxXQUFPO0FBQUEsRUFDWDtBQU9BLFdBQVMsSUFBSSxLQUFLLGNBQWMsZ0JBQWdCLEdBQUc7QUFDL0MsV0FBTyxZQUFZLFlBQVksQ0FBQyxVQUFVLGlCQUFpQixNQUFNLElBQUksR0FBRyxDQUFDLENBQUM7QUFBQSxFQUM5RTtBQVFBLFdBQVMsSUFBSSxLQUFLLE9BQU8sY0FBYyxnQkFBZ0IsR0FBRztBQUN0RCxXQUFPLFlBQVksYUFBYSxDQUFDLFVBQVU7QUFDdkMsWUFBTSxJQUFJLE9BQU8sR0FBRztBQUNwQixhQUFPLGlCQUFpQixNQUFNLFdBQVc7QUFBQSxJQUM3QyxDQUFDO0FBQUEsRUFDTDs7O0FDeENBLFdBQVMsU0FBUyxLQUFLLFFBQVE7QUFDN0IsYUFBUyxPQUFPLFdBQVcsV0FBVyxFQUFFLE1BQU0sT0FBTyxJQUFLLFVBQVUsQ0FBQztBQUNyRSxXQUFPLE9BQU8sT0FBTyxRQUFRO0FBQzdCLFdBQU8sY0FBYyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssTUFBTTtBQUFBLEVBQzFDO0FBRUEsV0FBUyxTQUFTLEtBQUssUUFBUTtBQUM3QixhQUFTLE9BQU8sV0FBVyxXQUFXLEVBQUUsTUFBTSxPQUFPLElBQUssVUFBVSxDQUFDO0FBQ3JFLFVBQU0sU0FBUyxLQUFLLE1BQU07QUFDMUIsUUFBSTtBQUNGLGFBQU8sS0FBSyxVQUFVLEtBQUssUUFBVyxPQUFPLE1BQU07QUFBQSxJQUNyRCxTQUFTLEdBQVA7QUFDQSxhQUFPO0FBQUEsSUFDVDtBQUFBLEVBQ0Y7QUFFQSxNQUFJLGNBQWM7QUFDbEIsTUFBSSxnQkFBZ0I7QUFDcEIsTUFBSSxlQUFlO0FBQ25CLE1BQUksa0JBQWtCO0FBQ3RCLFdBQVMsT0FBTyxLQUFLLFdBQVc7QUFDOUIsUUFBSTtBQUNGLGFBQU8sS0FBSyxNQUFNLEtBQUssT0FBTztBQUFBLElBQ2hDLFNBQVMsR0FBUDtBQUNBLGFBQU87QUFBQSxJQUNUO0FBRUEsYUFBUyxRQUFRLEtBQUtDLE1BQUs7QUFDekIsVUFBSSxZQUFZLEtBQUtBLElBQUcsR0FBRztBQUN6QixRQUFBQSxPQUFNLFlBQVksS0FBS0EsSUFBRztBQUMxQixRQUFBQSxPQUFNLElBQUksS0FBS0EsS0FBSSxDQUFDLENBQUM7QUFDckIsZUFBTyxJQUFJLEtBQUtBLElBQUc7QUFBQSxNQUNyQixXQUFXLGNBQWMsS0FBS0EsSUFBRyxHQUFHO0FBQ2xDLFFBQUFBLE9BQU0sY0FBYyxLQUFLQSxJQUFHLEVBQUUsQ0FBQztBQUMvQixlQUFPLElBQUksT0FBT0EsSUFBRztBQUFBLE1BQ3ZCLFdBQVcsYUFBYSxLQUFLQSxJQUFHLEdBQUc7QUFDakMsUUFBQUEsT0FBTSxhQUFhLEtBQUtBLElBQUcsRUFBRSxDQUFDO0FBQzlCLFlBQUksUUFBUSxJQUFJLE1BQU1BLEtBQUksTUFBTSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQ3hDLFlBQUksTUFBTSxPQUFPO0FBQ2YsZ0JBQU0sUUFBUUE7QUFBQSxRQUNoQjtBQUNBLGVBQU87QUFBQSxNQUNULFdBQVcsYUFBYSxnQkFBZ0IsS0FBS0EsSUFBRyxHQUFHO0FBQ2pELFFBQUFBLE9BQU0sZ0JBQWdCLEtBQUtBLElBQUcsRUFBRSxDQUFDO0FBQ2pDLFlBQUk7QUFDRixpQkFBUSxJQUFJLFNBQVMsWUFBWUEsT0FBTSxHQUFHLEVBQUc7QUFBQSxRQUMvQyxTQUFTQyxRQUFQO0FBQ0EsaUJBQU9BO0FBQUEsUUFDVDtBQUFBLE1BQ0YsT0FBTztBQUNMLGVBQU9EO0FBQUEsTUFDVDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBRUEsV0FBUyxjQUFjLFNBQVMsTUFBTSxLQUFLLFFBQVE7QUFDakQsUUFBSSxDQUFDLGFBQWEsVUFBVSxXQUFXLFFBQVEsRUFBRSxRQUFRLE9BQU8sR0FBRyxLQUFLLEtBQUssUUFBUSxNQUFNO0FBQ3pGLGFBQU87QUFBQSxJQUNULFdBQVcsT0FBTyxRQUFRLFlBQVksSUFBSSxnQkFBZ0IsTUFBTTtBQUM5RCxhQUFPLE9BQU8sVUFBVSxRQUFRLFdBQVcsSUFBSSxZQUFZLElBQUksTUFBTTtBQUFBLElBRXZFLFdBQVcsT0FBTyxRQUFRLFlBQVksSUFBSSxnQkFBZ0IsUUFBUTtBQUNoRSxhQUFPLE9BQU8sWUFBWSxRQUFRLGFBQWEsSUFBSSxTQUFTLElBQUksTUFBTTtBQUFBLElBQ3hFLFdBQVcsT0FBTyxRQUFRLFlBQVksSUFBSSxlQUFlLE9BQU8sSUFBSSxZQUFZLFNBQVMsWUFBWSxJQUFJLFlBQVksS0FBSyxNQUFNLEVBQUUsTUFBTSxTQUFTO0FBQy9JLFVBQUksU0FBUyxJQUFJLFNBQVMsSUFBSSxNQUFNLElBQUksRUFBRSxNQUFNLENBQUM7QUFDakQsVUFBSSxVQUFXLElBQUksV0FBVyxJQUFJLFNBQVM7QUFDM0MsVUFBSSxRQUFRLFVBQVUsT0FBTztBQUM3QixhQUFPLE9BQU8sV0FBVyxRQUFRLFlBQVksUUFBUSxNQUFNO0FBQUEsSUFDN0QsV0FBVyxPQUFPLFFBQVEsVUFBVTtBQUNsQyxVQUFJLFFBQVEsUUFBUSxHQUFHLEtBQUssR0FBRztBQUM3QixZQUFJLFFBQVEsS0FBSyxNQUFNLEdBQUcsUUFBUSxRQUFRLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRztBQUN4RCxlQUFPLGVBQWUsUUFBUSxNQUFNLFFBQVEsTUFBTTtBQUFBLE1BQ3BELE9BQU87QUFDTCxZQUFJLE1BQU0sR0FBRyxHQUFHO0FBQ2hCLFlBQUksSUFBSSxlQUFlLE9BQU8sSUFBSSxZQUFZLFNBQVMsWUFBWSxJQUFJLFlBQVksS0FBSyxNQUFNLEVBQUUsTUFBTSxTQUFTO0FBQzdHLGNBQUksUUFBUSxVQUFVLE9BQU8sTUFBTTtBQUNqQyxtQkFBTyxZQUFZLElBQUksWUFBWSxPQUFPO0FBQUEsVUFDNUMsT0FBTztBQUNMLG1CQUFPLENBQUM7QUFDUixpQkFBSyxJQUFJLEdBQUcsSUFBSSxJQUFJLFFBQVEsSUFBSSxHQUFHLEtBQUs7QUFDdEMsbUJBQUssQ0FBQyxJQUFJLGNBQWMsUUFBUSxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxNQUFNO0FBQUEsWUFDL0U7QUFDQSxtQkFBTztBQUFBLFVBQ1Q7QUFBQSxRQUNGLE9BQU87QUFDTCxjQUFJLFFBQVEsVUFBVSxPQUFPLE1BQU07QUFDakMsbUJBQU8sY0FBYyxJQUFJLGVBQWUsSUFBSSxZQUFZLE9BQU8sSUFBSSxZQUFZLE9BQU8sWUFBWTtBQUFBLFVBQ3BHLE9BQU87QUFDTCxtQkFBTyxDQUFDO0FBQ1IsaUJBQUssSUFBSSxHQUFHLElBQUksT0FBTyxLQUFLLEdBQUcsR0FBRyxJQUFJLEVBQUUsUUFBUSxJQUFJLEdBQUcsS0FBSztBQUMxRCxtQkFBSyxFQUFFLENBQUMsQ0FBQyxJQUFJLGNBQWMsUUFBUSxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLENBQUMsR0FBRyxNQUFNO0FBQUEsWUFDMUY7QUFDQSxtQkFBTztBQUFBLFVBQ1Q7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0YsV0FBVyxPQUFPLFFBQVEsWUFBWTtBQUNwQyxhQUFPLE9BQU8sY0FBYyxPQUFPLGVBQWUsSUFBSSxTQUFTLElBQUksTUFBTTtBQUFBLElBQzNFLE9BQU87QUFDTCxhQUFPLElBQUksU0FBUztBQUFBLElBQ3RCO0FBQUEsRUFDRjs7O0FGcEdBLE1BQU8sa0JBQVE7QUFBQSxJQUNiLE1BQU0sa0JBQWtCLFFBQVE7QUFDOUIsVUFBSSxTQUFTLE1BQWdCLElBQUksY0FBYyxRQUFRO0FBQ3ZELFVBQUksT0FBTyxVQUFVO0FBQVUsaUJBQVMsT0FBTyxNQUFNO0FBQ3JELFlBQU0sT0FBYSxXQUFLLFVBQVUsQ0FBQyxDQUFDO0FBRXBDLFlBQU0sT0FBTyxNQUFNO0FBQ2pCLFlBQUk7QUFDRixVQUFVLElBQUksY0FBYyxVQUFVLFNBQVMsRUFBRSxHQUFHLEtBQUssTUFBTSxDQUFDLENBQUM7QUFBQSxRQUNuRSxRQUFFO0FBQ0EsVUFBVSxJQUFJLGNBQWMsVUFBVSxTQUFTLENBQUMsQ0FBQyxDQUFDO0FBQUEsUUFDcEQ7QUFBQSxNQUNGO0FBRUEsV0FBSyxHQUFTLGFBQU8sS0FBSyxJQUFJO0FBQzlCLFdBQUssR0FBUyxhQUFPLFFBQVEsSUFBSTtBQUNqQyxXQUFLLEdBQVMsYUFBTyxRQUFRLElBQUk7QUFFakMsYUFBTztBQUFBLElBQ1Q7QUFBQSxFQUNGOzs7QUdoQkEsaUJBQXNCLG1CQUFtQixLQUFLO0FBQzVDLFFBQUksQ0FBQyxLQUFLO0FBQU0sYUFBTztBQUN2QixRQUFJRSxPQUFNO0FBQUEsTUFDUixXQUFXO0FBQUEsUUFDVCxXQUFXLENBQUM7QUFBQSxRQUNaLGVBQWUsQ0FBQztBQUFBLE1BQ2xCO0FBQUEsTUFDQSxPQUFPLFFBQVEsTUFBTTtBQUNuQixlQUFPLGNBQU0sT0FBT0EsS0FBSSxJQUFJLEdBQUcsR0FBRyxHQUFHLElBQUk7QUFBQSxNQUMzQztBQUFBLE1BQ0EsSUFBSSxLQUFLO0FBQ1AsWUFBSSxPQUFPLElBQUksU0FBUztBQUFVLFVBQUFDLE9BQU07QUFDeEMsZUFBT0QsS0FBSSxVQUFVLGNBQWNBLEtBQUksTUFBTSxJQUFJLEdBQUcsS0FDL0NBLEtBQUksVUFBVSxjQUFjLFVBQVUsR0FBRyxLQUN6Q0EsS0FBSSxJQUFJLEdBQUc7QUFBQSxNQUNsQjtBQUFBLE1BQ0EsVUFBVSxJQUFJLE1BQU0sQ0FBQyxHQUFHO0FBQUEsUUFDdEIsSUFBSUUsSUFBRyxNQUFNO0FBQ1gsaUJBQU9GLEtBQUksSUFBSSxJQUFJO0FBQUEsUUFDckI7QUFBQSxNQUNGLENBQUM7QUFBQSxJQUNIO0FBQ0EsbUJBQWVDLFNBQVE7QUFDckIsWUFBTSxTQUFTLGFBQUs7QUFDcEIsVUFBSSxPQUFPLElBQUksU0FBUyxVQUFVO0FBQ2hDLGNBQU1FLFlBQVcsSUFBSSxLQUFLLFNBQVMsR0FBRyxJQUFJLElBQUksS0FBSyxNQUFNLEdBQUcsRUFBRSxJQUFJLElBQUk7QUFDdEUsWUFBSSxDQUFDSCxLQUFJLFVBQVUsVUFBVSxRQUFRO0FBQ25DLGNBQUk7QUFDRixZQUFBQSxLQUFJLFVBQVUsWUFBWSxPQUFPLE1BQU0sTUFBTSxHQUFHRywwQkFBeUIsT0FBTyxHQUFHLEtBQUs7QUFBQSxVQUMxRixRQUFFO0FBQUEsVUFBUTtBQUNWLGNBQUk7QUFDRixZQUFBSCxLQUFJLFVBQVUsY0FBYyxVQUFVLE9BQU8sTUFBTSxNQUFNLEdBQUdHLDBCQUF5QixPQUFPLEdBQUcsS0FBSztBQUFBLFVBQ3RHLFFBQUU7QUFBQSxVQUFRO0FBQUEsUUFDWjtBQUNBLFlBQ0VILEtBQUksVUFBVSxVQUFVLFNBQVMsTUFBTSxLQUNwQyxDQUFDQSxLQUFJLFVBQVUsZ0JBQWdCLE1BQU0sR0FDeEM7QUFDQSxjQUFJO0FBQ0YsWUFBQUEsS0FBSSxVQUFVLGNBQWMsTUFBTSxJQUFJLE9BQU8sTUFBTSxNQUFNLEdBQUdHLGFBQVksZUFBZSxPQUFPLEdBQUcsS0FBSztBQUFBLFVBQ3hHLFFBQUU7QUFBQSxVQUFRO0FBQUM7QUFBQSxRQUNiO0FBQUEsTUFDRixPQUFPO0FBQ0wsUUFBQUgsS0FBSSxVQUFVLFlBQVksT0FBTyxLQUFLLElBQUksSUFBSTtBQUM5QyxRQUFBQSxLQUFJLFVBQVUsZ0JBQWdCLElBQUk7QUFBQSxNQUNwQztBQUFBLElBQ0Y7QUFDQSxVQUFNQyxPQUFNO0FBQ1osV0FBT0Q7QUFBQSxFQUNUOzs7QUNsREEsTUFBQUksU0FBdUI7QUFLdkIsaUJBQWUsU0FBUyxLQUFLO0FBQzNCLFVBQU0sVUFBVSxZQUFJLFdBQVcsS0FBSyxTQUFTLFNBQVM7QUFDdEQsVUFBTSxVQUFVLE1BQU0sZ0JBQVEsa0JBQWtCLHFCQUFxQixJQUFJLE1BQU0sTUFBTTtBQUNyRixVQUFNQyxPQUFNO0FBQUEsTUFDVixTQUFTO0FBQUEsUUFDUCxXQUFXO0FBQUEsVUFDVCxRQUFRLENBQUM7QUFBQSxVQUNULE1BQU0sQ0FBQztBQUFBLFVBQ1AsUUFBUSxDQUFDO0FBQUEsVUFDVCxZQUFZLENBQUM7QUFBQSxRQUNmO0FBQUEsUUFDQSxRQUFRLE1BQU07QUFDWixjQUFJLENBQUMsU0FBUztBQUNaLGdCQUFJLE9BQU9BLEtBQUksUUFBUSxVQUFVLEtBQUssSUFBSSxNQUFNO0FBQWEscUJBQU9BLEtBQUksUUFBUSxVQUFVLEtBQUssSUFBSTtBQUNuRyxnQkFBSSxLQUFLLFNBQVMsTUFBTSxPQUFPLE9BQUssRUFBRSxTQUFTLElBQUk7QUFBRyxxQkFBT0EsS0FBSSxRQUFRLFVBQVUsS0FBSyxJQUFJLElBQUksZ0JBQVEsUUFBUSxJQUFJO0FBQUEsVUFDdEgsT0FBTztBQUNMLG1CQUFPLGdCQUFRLFFBQVEsSUFBSTtBQUFBLFVBQzdCO0FBQ0EsaUJBQU87QUFBQSxRQUNUO0FBQUEsUUFDQSxRQUFRLElBQUksTUFBTSxDQUFDLEdBQUc7QUFBQSxVQUNwQixJQUFJQyxJQUFHLE1BQU07QUFDWCxnQkFBSSxDQUFDLFNBQVM7QUFDWixrQkFBSSxPQUFPRCxLQUFJLFFBQVEsVUFBVSxPQUFPLElBQUksTUFBTTtBQUFhLHVCQUFPQSxLQUFJLFFBQVEsVUFBVSxPQUFPLElBQUk7QUFDdkcsa0JBQUksS0FBSyxTQUFTLFFBQVEsT0FBTyxPQUFLLEVBQUUsU0FBUyxJQUFJO0FBQUcsdUJBQU9BLEtBQUksUUFBUSxVQUFVLE9BQU8sSUFBSSxJQUFJLGdCQUFRLE9BQU8sSUFBSTtBQUFBLFlBQ3pILE9BQU87QUFDTCxxQkFBTyxnQkFBUSxPQUFPLElBQUk7QUFBQSxZQUM1QjtBQUNBLG1CQUFPO0FBQUEsVUFDVDtBQUFBLFFBQ0YsQ0FBQztBQUFBLFFBQ0QsUUFBUSxJQUFJLE1BQU0sQ0FBQyxHQUFHO0FBQUEsVUFDcEIsSUFBSUMsSUFBRyxNQUFNO0FBQ1gsZ0JBQUksT0FBT0QsS0FBSSxRQUFRLFVBQVUsT0FBTyxJQUFJLE1BQU07QUFBYSxxQkFBT0EsS0FBSSxRQUFRLFVBQVUsT0FBTyxJQUFJO0FBQ3ZHLGdCQUFJLE9BQU8sS0FBSyxTQUFTLFFBQVEsT0FBTyxPQUFLLEVBQUUsU0FBUyxJQUFJO0FBQzVELGdCQUFJLENBQUM7QUFBTSxxQkFBTztBQUNsQixnQkFBSSxLQUFLLE1BQU07QUFDYixrQkFBSSxPQUFPLElBQUksUUFBUSxPQUFPLFNBQVMsV0FBVztBQUNoRCxvQkFBSSxJQUFJLE1BQU0sZ0JBQVEsUUFBUSxpQkFBaUIsS0FBSyxNQUFNO0FBQzFELGdCQUFBQSxLQUFJLFFBQVEsVUFBVSxXQUFXLElBQUksSUFBSTtBQUN6Qyx3QkFBUSxDQUFDO0FBQUEsY0FDWCxDQUFDO0FBQ0QsY0FBQUEsS0FBSSxRQUFRLFVBQVUsT0FBTyxJQUFJLElBQUk7QUFBQSxnQkFDbkMsTUFBTTtBQUNKLHlCQUFPO0FBQUEsZ0JBQ1Q7QUFBQSxnQkFDQSxJQUFJLFFBQVE7QUFDVix5QkFBT0EsS0FBSSxRQUFRLFVBQVUsV0FBVyxJQUFJO0FBQUEsZ0JBQzlDO0FBQUEsY0FDRjtBQUFBLFlBQ0YsT0FBTztBQUNMLGtCQUFJLFFBQVEsZ0JBQVEsUUFBUSxhQUFhLEtBQUssTUFBTTtBQUNwRCxrQkFBSTtBQUNGLG9CQUFJLE9BQU8sT0FBTyxVQUFVLGFBQWE7QUFDdkMsa0JBQUFBLEtBQUksUUFBUSxVQUFVLE9BQU8sSUFBSSxJQUFJLFFBQVEsT0FBTyxPQUFPLE9BQU8sRUFBRSxPQUFPLE1BQU07QUFBRSwyQkFBTztBQUFBLGtCQUFNLEVBQUUsQ0FBQyxJQUFJO0FBQUEsZ0JBQ3pHLE9BQU87QUFDTCxrQkFBQUEsS0FBSSxRQUFRLFVBQVUsT0FBTyxJQUFJLElBQUk7QUFBQSxnQkFDdkM7QUFBQSxjQUNGLFFBQUU7QUFDQSxnQkFBQUEsS0FBSSxRQUFRLFVBQVUsT0FBTyxJQUFJLElBQUksUUFBUSxFQUFFLE9BQU8sTUFBTTtBQUFFLHlCQUFPO0FBQUEsZ0JBQU0sRUFBRSxJQUFJO0FBQUEsY0FDbkY7QUFBQSxZQUNGO0FBQ0EsbUJBQU9BLEtBQUksUUFBUSxVQUFVLE9BQU8sSUFBSTtBQUFBLFVBQzFDO0FBQUEsUUFDRixDQUFDO0FBQUEsTUFDSDtBQUFBLE1BQ0E7QUFBQSxNQUNBLFdBQVc7QUFBQSxRQUNULFFBQVEsS0FBSyxNQUFNLEtBQUssVUFBVSxHQUFHLENBQUM7QUFBQSxRQUN0QztBQUFBLFFBQ0EsTUFBTSxNQUFNLG1CQUFtQixHQUFHO0FBQUEsUUFDbEMsUUFBUSxJQUFJLGtCQUFrQjtBQUFBLFFBQzlCLGVBQWUsQ0FBQztBQUFBLE1BQ2xCO0FBQUEsSUFDRjtBQUVBLFdBQU9BO0FBQUEsRUFDVDtBQUVBLE1BQU1BLE9BQU07QUFBQSxJQUNWLFdBQVc7QUFBQSxNQUNULGFBQWE7QUFBQSxNQUNiLFFBQWMsWUFBSyxDQUFDLENBQUM7QUFBQSxJQUN2QjtBQUFBLElBQ0EsU0FBUztBQUFBO0FBQUEsTUFFUCxXQUFXLENBQUM7QUFBQSxJQUNkO0FBQUEsSUFDQTtBQUFBLElBQ0EsTUFBTSxPQUFPO0FBQ1gsVUFBSUEsS0FBSSxVQUFVO0FBQWE7QUFDL0IsTUFBQUEsS0FBSSxVQUFVLGNBQWM7QUFDNUIsTUFBQUEsS0FBSSxRQUFRLFlBQVksTUFBTSxnQkFBUSxrQkFBa0Isc0JBQXNCO0FBQUEsSUFDaEY7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQUlBLE1BQU0sUUFBUSxLQUFLLGdCQUFnQixDQUFDLEdBQUc7QUFDckMsVUFBSSxDQUFDQSxLQUFJLFVBQVU7QUFBYSxjQUFNQSxLQUFJLEtBQUs7QUFDL0MsVUFBSSxJQUFJLFNBQVMsR0FBRztBQUFHLGNBQU0sSUFBSSxNQUFNLEdBQUcsRUFBRTtBQUM1QyxVQUFJQSxLQUFJLFFBQVEsVUFBVSxNQUFNLEdBQUc7QUFBRyxjQUFNLElBQUksTUFBTSxJQUFJLHNDQUFzQztBQUVoRyxVQUFJLFdBQVcsTUFBTSxNQUFNLEdBQUcsbUJBQW1CO0FBQ2pELFVBQUksU0FBUyxXQUFXO0FBQUssY0FBTSxJQUFJLE1BQU0sSUFBSSxnRUFBZ0U7QUFDakgsVUFBSSxXQUFXLE1BQU0sU0FBUyxLQUFLO0FBRW5DLFVBQUksYUFBYSxNQUFNLE1BQU0sR0FBRyxlQUFlO0FBQy9DLFVBQUksU0FBUyxXQUFXLFdBQVcsTUFBTSxNQUFNLFdBQVcsS0FBSyxJQUFJO0FBSW5FLFVBQUksYUFBYSxNQUFNLE1BQU0sR0FBRyxlQUFlO0FBQy9DLFVBQUksV0FBVyxXQUFXO0FBQUssY0FBTSxJQUFJLE1BQU0sSUFBSSw4REFBOEQ7QUFDakgsVUFBSUUsVUFBUyxNQUFNLFdBQVcsS0FBSztBQUVuQyxNQUFBRixLQUFJLFFBQVEsVUFBVSxNQUFNLEdBQUcsSUFBSTtBQUFBLFFBQ2pDO0FBQUEsUUFDQSxRQUFBRTtBQUFBLFFBQ0E7QUFBQSxRQUNBLFFBQVE7QUFBQSxVQUNOLFlBQVk7QUFBQSxVQUNaLFNBQVM7QUFBQSxVQUNULE9BQU87QUFBQSxVQUNQLEdBQUc7QUFBQSxRQUNMO0FBQUEsUUFDQSxPQUFPO0FBQUEsVUFDTCxlQUFlLEtBQUssSUFBSTtBQUFBLFFBQzFCO0FBQUEsTUFDRjtBQUVBLFlBQU1GLEtBQUksS0FBSyxHQUFHO0FBQUEsSUFDcEI7QUFBQSxJQUNBLE1BQU0sT0FBTyxLQUFLO0FBQ2hCLFVBQUksQ0FBQ0EsS0FBSSxVQUFVO0FBQWEsY0FBTUEsS0FBSSxLQUFLO0FBQy9DLFVBQUksQ0FBQ0EsS0FBSSxRQUFRLFVBQVUsTUFBTSxHQUFHO0FBQUcsY0FBTSxJQUFJLE1BQU0sSUFBSSxrQ0FBa0M7QUFDN0YsVUFBSUEsS0FBSSxRQUFRLE9BQU8sTUFBTSxHQUFHO0FBQUcsY0FBTSxJQUFJLE1BQU0sSUFBSSxtREFBbUQ7QUFFMUcsVUFBSSxPQUFPQSxLQUFJLFFBQVEsVUFBVSxNQUFNLEdBQUc7QUFFMUMsVUFBSSxXQUFXLE1BQU0sTUFBTSxHQUFHLG1CQUFtQjtBQUNqRCxVQUFJLFNBQVMsV0FBVztBQUFLLGNBQU0sSUFBSSxNQUFNLElBQUksZ0VBQWdFO0FBQ2pILFVBQUksV0FBVyxNQUFNLFNBQVMsS0FBSztBQUVuQyxVQUFJLEtBQUssU0FBUyxTQUFTLFNBQVM7QUFBTSxlQUFPO0FBRWpELFVBQUksYUFBYSxNQUFNLE1BQU0sR0FBRyxlQUFlO0FBQy9DLFVBQUksU0FBUyxXQUFXLFdBQVcsTUFBTSxNQUFNLFdBQVcsS0FBSyxJQUFJO0FBRW5FLFVBQUksYUFBYSxNQUFNLE1BQU0sR0FBRyxlQUFlO0FBQy9DLFVBQUksV0FBVyxXQUFXO0FBQUssY0FBTSxJQUFJLE1BQU0sSUFBSSw4REFBOEQ7QUFDakgsVUFBSUUsVUFBUyxNQUFNLFdBQVcsS0FBSztBQUVuQyxTQUFHLFFBQVEsVUFBVSxNQUFNLEdBQUcsSUFBSTtBQUFBLFFBQ2hDO0FBQUEsUUFDQSxRQUFBQTtBQUFBLFFBQ0E7QUFBQSxRQUNBLFFBQVEsS0FBSztBQUFBLFFBQ2IsT0FBTztBQUFBLFVBQ0wsZUFBZSxLQUFLLElBQUk7QUFBQSxRQUMxQjtBQUFBLE1BQ0Y7QUFFQSxhQUFPO0FBQUEsSUFDVDtBQUFBLElBQ0EsTUFBTSxVQUFVLEtBQUs7QUFDbkIsVUFBSSxDQUFDRixLQUFJLFVBQVU7QUFBYSxjQUFNQSxLQUFJLEtBQUs7QUFDL0MsVUFBSSxDQUFDQSxLQUFJLFFBQVEsVUFBVSxNQUFNLEdBQUc7QUFBRyxjQUFNLElBQUksTUFBTSxJQUFJLGtDQUFrQztBQUU3RixhQUFPQSxLQUFJLFFBQVEsVUFBVSxNQUFNLEdBQUc7QUFFdEMsVUFBSTtBQUNGLGNBQU1BLEtBQUksT0FBTyxHQUFHO0FBQUEsTUFDdEIsUUFBRTtBQUFBLE1BQVE7QUFBQSxJQUNaO0FBQUEsSUFDQSxNQUFNLEtBQUssS0FBSztBQUNkLFVBQUksQ0FBQ0EsS0FBSSxVQUFVO0FBQWEsY0FBTUEsS0FBSSxLQUFLO0FBQy9DLFVBQUksQ0FBQ0EsS0FBSSxRQUFRLFVBQVUsTUFBTSxHQUFHO0FBQUcsY0FBTSxJQUFJLE1BQU0sSUFBSSxrQ0FBa0M7QUFDN0YsVUFBSSxPQUFPQSxLQUFJLFFBQVEsVUFBVSxNQUFNLEdBQUc7QUFFMUMsVUFBSUEsS0FBSSxVQUFVLE9BQU8sTUFBTSxHQUFHO0FBQUcsY0FBTSxJQUFJLE1BQU0sSUFBSSxtQ0FBbUM7QUFFNUYsVUFBSUcsT0FBTSxNQUFNSCxLQUFJLFNBQVMsS0FBSyxRQUFRO0FBRTFDLFVBQUksWUFBWUEsS0FBSSxTQUFTLEtBQUssUUFBUUcsSUFBRztBQUU3QyxZQUFNLFdBQVcsT0FBTztBQUV4QixNQUFBSCxLQUFJLFVBQVUsT0FBTyxNQUFNLEdBQUcsSUFBSTtBQUFBLFFBQ2hDO0FBQUEsUUFDQSxLQUFBRztBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxNQUFNLE9BQU8sS0FBSztBQUNoQixVQUFJLENBQUNILEtBQUksVUFBVTtBQUFhLGNBQU1BLEtBQUksS0FBSztBQUMvQyxVQUFJLENBQUNBLEtBQUksUUFBUSxVQUFVLE1BQU0sR0FBRztBQUFHLGNBQU0sSUFBSSxNQUFNLElBQUksa0NBQWtDO0FBRTdGLFVBQUksQ0FBQ0EsS0FBSSxVQUFVLE9BQU8sTUFBTSxHQUFHO0FBQUcsY0FBTSxJQUFJLE1BQU0sSUFBSSwrQkFBK0I7QUFFekYsVUFBSSxFQUFFLFdBQVcsS0FBQUcsS0FBSSxJQUFJSCxLQUFJLFVBQVUsT0FBTyxNQUFNLEdBQUc7QUFFdkQsTUFBQUcsS0FBSSxVQUFVLE9BQU8sS0FBSyxRQUFRO0FBQ2xDLE1BQUFBLEtBQUksVUFBVSxjQUFjLFFBQVEsT0FBSyxPQUFPLE1BQU0sY0FBYyxFQUFFLENBQUM7QUFDdkUsWUFBTSxXQUFXLFNBQVM7QUFFMUIsYUFBT0gsS0FBSSxVQUFVLE9BQU8sTUFBTSxHQUFHO0FBQUEsSUFDdkM7QUFBQSxJQUNBLFNBQVMsUUFBUSxLQUFLO0FBQ3BCLFlBQU0sU0FBUztBQUNmLGFBQU8sS0FBSyxNQUFNO0FBQUEsSUFDcEI7QUFBQSxJQUNBLE1BQU0sVUFBVTtBQUNkLFVBQUksQ0FBQ0EsS0FBSSxVQUFVO0FBQWEsY0FBTUEsS0FBSSxLQUFLO0FBQy9DLGFBQU8sUUFBUSxJQUFJLE9BQU8sUUFBUUEsS0FBSSxRQUFRLFVBQVUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxPQUFPLFFBQVEsRUFBRSxPQUFPLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLE1BQU1BLEtBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztBQUFBLElBQ3RKO0FBQUEsRUFDRjtBQUVBLE1BQU8scUJBQVFBOzs7QUNuT2YsTUFBTyxtQkFBUTtBQUFBLElBQ2IsU0FBUyxXQUFXLGVBQWUsRUFBRTtBQUFBLElBQ3JDLGdCQUFnQixXQUFXLGVBQWUsRUFBRTtBQUFBLEVBQzlDOzs7QUNDQSxNQUFNLFVBQVUsb0JBQUksSUFBSTtBQUN4QixNQUFNLFdBQVcsb0JBQUksSUFBSTtBQUV6QiwwQkFBd0IsRUFBRSxLQUFLLE1BQU07QUFDbkMsb0JBQVE7QUFBQSxNQUNOO0FBQUEsTUFDQUksZ0JBQU87QUFBQSxNQUNQLENBQUMsTUFBTSxTQUFTO0FBQ2QsY0FBTSxLQUFLLEtBQUssQ0FBQztBQUNqQixZQUFJLEdBQUcsV0FBVyxFQUFFLFFBQVE7QUFBVSxpQkFBTyxLQUFLLEdBQUcsSUFBSTtBQUV6RCxnQkFBUSxJQUFJLEVBQUU7QUFFZCxXQUFHLEdBQUcsV0FBVyxPQUFPLFFBQVE7QUFDOUIsY0FBSTtBQUVKLGNBQUk7QUFDRixtQkFBTyxLQUFLLE1BQU0sR0FBRztBQUNyQixnQkFBSSxDQUFDLE1BQU0sUUFBUSxJQUFJLEtBQUssS0FBSyxTQUFTLEtBQUssS0FBSyxTQUFTO0FBQzNELG9CQUFNO0FBQ1IsZ0JBQUksT0FBTyxLQUFLLENBQUMsS0FBSztBQUFVLG9CQUFNO0FBQ3RDLGdCQUFJLE9BQU8sS0FBSyxDQUFDLEtBQUs7QUFBVSxvQkFBTTtBQUFBLFVBQ3hDLFNBQVMsS0FBUDtBQUNBLGVBQUc7QUFBQSxjQUNELEtBQUssVUFBVTtBQUFBLGdCQUNiO0FBQUEsZ0JBQ0E7QUFBQSxrQkFDRSxJQUFJO0FBQUEsa0JBQ0osT0FBTyxHQUFHO0FBQUEsZ0JBQ1o7QUFBQSxjQUNGLENBQUM7QUFBQSxZQUNIO0FBQUEsVUFDRjtBQUVBLGdCQUFNLENBQUMsU0FBUyxXQUFXLFNBQVMsSUFBSTtBQUV4QyxnQkFBTSxVQUFVLFNBQVMsSUFBSSxTQUFTO0FBRXRDLGNBQUksQ0FBQztBQUNILG1CQUFPLEdBQUc7QUFBQSxjQUNSLEtBQUssVUFBVTtBQUFBLGdCQUNiO0FBQUEsZ0JBQ0E7QUFBQSxrQkFDRSxJQUFJO0FBQUEsa0JBQ0osT0FBTztBQUFBLGdCQUNUO0FBQUEsY0FDRixDQUFDO0FBQUEsWUFDSDtBQUVGLGNBQUk7QUFDRixnQkFBSSxXQUFXLE1BQU0sUUFBUSxTQUFTO0FBQ3RDLGVBQUc7QUFBQSxjQUNELEtBQUssVUFBVTtBQUFBLGdCQUNiO0FBQUEsZ0JBQ0E7QUFBQSxrQkFDRSxJQUFJO0FBQUEsa0JBQ0osTUFBTTtBQUFBLGdCQUNSO0FBQUEsY0FDRixDQUFDO0FBQUEsWUFDSDtBQUFBLFVBQ0YsU0FBUyxLQUFQO0FBQ0EsZUFBRztBQUFBLGNBQ0QsS0FBSyxVQUFVO0FBQUEsZ0JBQ2I7QUFBQSxnQkFDQTtBQUFBLGtCQUNFLElBQUk7QUFBQSxrQkFDSixPQUFPLEdBQUc7QUFBQSxnQkFDWjtBQUFBLGNBQ0YsQ0FBQztBQUFBLFlBQ0g7QUFBQSxVQUNGO0FBQUEsUUFDRixDQUFDO0FBRUQsV0FBRyxHQUFHLFNBQVMsTUFBTSxRQUFRLE9BQU8sRUFBRSxDQUFDO0FBQUEsTUFDekM7QUFBQSxJQUNGO0FBQUEsRUFDRixDQUFDO0FBRUQsV0FBU0MsS0FBSSxXQUFXLFVBQVU7QUFDaEMsUUFBSSxPQUFPLGFBQWE7QUFDdEIsWUFBTSxJQUFJLE1BQU0saUNBQWlDO0FBQ25ELFFBQUksT0FBTyxZQUFZO0FBQ3JCLFlBQU0sSUFBSSxNQUFNLGtDQUFrQztBQUNwRCxRQUFJLFNBQVMsSUFBSSxTQUFTO0FBQ3hCLFlBQU0sSUFBSSxNQUFNLDJCQUEyQjtBQUM3QyxhQUFTLElBQUksV0FBVyxRQUFRO0FBQ2hDLFdBQU8sTUFBTTtBQUNYLGVBQVMsT0FBTyxTQUFTO0FBQUEsSUFDM0I7QUFBQSxFQUNGO0FBQ0EsV0FBUyxRQUFRLGNBQWMsTUFBTTtBQUNuQyxRQUFJLENBQUMsYUFBYSxJQUFJLFNBQVM7QUFDN0IsWUFBTSxJQUFJLE1BQU0seUJBQXlCO0FBQzNDLFdBQU8sYUFBYSxJQUFJLFNBQVMsRUFBRSxHQUFHLElBQUk7QUFBQSxFQUM1QztBQUVBLE1BQU8sb0JBQVE7QUFBQSxJQUNiLEtBQUFBO0FBQUEsSUFDQTtBQUFBLEVBQ0Y7OztBQ3ZHQSxNQUFPLGlCQUFRO0FBQUE7OztBQ0lmLE1BQU0saUJBQWlCLGdCQUFRLGlCQUFpQiwrQkFBK0IsU0FBUztBQUV4RixNQUFNLG1CQUFtQjtBQUFBLElBQ3ZCLEtBQUssZUFBZTtBQUFBLElBQ3BCLFFBQVEsZUFBZTtBQUFBLElBQ3ZCLE1BQU0sZUFBZTtBQUFBLElBQ3JCLE9BQU8sZUFBZTtBQUFBLEVBQ3hCO0FBRUEsTUFBTSxVQUFOLE1BQWM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBS1osWUFBWSxRQUFRLFNBQVMsV0FBVyxRQUFRO0FBRTlDLFdBQUssZUFBZSxZQUFJLE1BQU07QUFBQTtBQUFBLHNCQUVaLGVBQWUsV0FBVyxlQUFlO0FBQUEsd0JBQ3ZDLGVBQWU7QUFBQSx3QkFDZixlQUFlO0FBQUE7QUFBQTtBQUFBLEtBR2xDO0FBQ0QsV0FBSyxpQkFBaUIsS0FBSyxhQUFhLGNBQWMsaUJBQWlCO0FBQ3ZFLFdBQUssaUJBQWlCLEtBQUssYUFBYSxjQUFjLHlCQUF5QjtBQUMvRSxXQUFLLFVBQVU7QUFDZixXQUFLLFNBQVM7QUFDZCxXQUFLLFdBQVc7QUFFaEIsV0FBSyxVQUFVO0FBQ2YsV0FBSyxXQUFXO0FBQ2hCLFdBQUssU0FBUztBQUVkLFlBQU0sZUFBZSxNQUFNO0FBQ3pCLFlBQUksS0FBSyxZQUFZLEtBQUs7QUFBUTtBQUNsQyxhQUFLLEtBQUs7QUFBQSxNQUNaO0FBRUEsWUFBTSxlQUFlLE1BQU07QUFDekIsWUFBSSxLQUFLO0FBQVE7QUFDakIsYUFBSyxLQUFLO0FBQUEsTUFDWjtBQUVBLFdBQUssT0FBTyxpQkFBaUIsY0FBYyxZQUFZO0FBQ3ZELFdBQUssT0FBTyxpQkFBaUIsY0FBYyxZQUFZO0FBRXZELFVBQUksa0JBQWtCLGVBQU87QUFBQSxRQUMzQjtBQUFBO0FBQUEsUUFDa0MsQ0FBQyxRQUFRO0FBQ3pDLGNBQUksSUFBSSxTQUFTLGNBQWM7QUFDN0IsZ0JBQUksSUFBSSxPQUFPLFdBQVcsS0FBSyxNQUFNLEdBQUc7QUFDdEMsc0JBQVEsSUFBSSxlQUFlO0FBQUEsZ0JBQ3pCLEtBQUssMkJBQTJCO0FBQzlCLHVCQUFLLFdBQVcsS0FBSyxPQUFPLGFBQWEseUJBQXlCLE1BQU07QUFDeEU7QUFBQSxnQkFDRjtBQUFBLGdCQUNBLEtBQUssMEJBQTBCO0FBQzdCLHVCQUFLLFVBQVUsS0FBSyxPQUFPLGFBQWEsd0JBQXdCO0FBQ2hFO0FBQUEsZ0JBQ0Y7QUFBQSxnQkFDQSxLQUFLLDJCQUEyQjtBQUM5Qix1QkFBSyxXQUFXLEtBQUssT0FBTyxhQUFhLHlCQUF5QjtBQUNsRTtBQUFBLGdCQUNGO0FBQUEsY0FDRjtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFFQSxXQUFLLFVBQVUsTUFBTTtBQUNuQixhQUFLLE9BQU8sb0JBQW9CLGNBQWMsWUFBWTtBQUMxRCxhQUFLLE9BQU8sb0JBQW9CLGNBQWMsWUFBWTtBQUMxRCxhQUFLLEtBQUs7QUFDVix3QkFBZ0I7QUFBQSxNQUNsQjtBQUFBLElBQ0Y7QUFBQSxJQUVBLElBQUksVUFBVTtBQUNaLGFBQU8sS0FBSyxlQUFlO0FBQUEsSUFDN0I7QUFBQSxJQUVBLElBQUksUUFBUSxPQUFPO0FBQ2pCLFVBQUksT0FBTyxVQUFVLFVBQVU7QUFDN0IsYUFBSyxlQUFlLFlBQVk7QUFBQSxNQUNsQyxPQUFPO0FBQ0wsYUFBSyxlQUFlLFlBQVk7QUFDaEMsYUFBSyxlQUFlLFlBQVksS0FBSztBQUFBLE1BQ3ZDO0FBQUEsSUFDRjtBQUFBLElBRUEsT0FBTyxlQUFlO0FBQ3BCLFlBQU0sU0FBUyxTQUFTLGNBQWMseUJBQXlCO0FBRS9ELFVBQUksWUFBWSxPQUFPLGNBQWMsMkJBQTJCO0FBQ2hFLFVBQUksQ0FBQyxXQUFXO0FBQ2Qsb0JBQVksWUFBSSxNQUFNLHFFQUFxRTtBQUMzRixlQUFPLFlBQVksU0FBUztBQUFBLE1BQzlCO0FBQ0EsZ0JBQVUsTUFBTSxZQUFZLGdCQUFnQixHQUFHLE9BQU8sc0JBQXNCLEVBQUUsSUFBSSxRQUFRLENBQUMsS0FBSztBQUVoRyxhQUFPO0FBQUEsSUFDVDtBQUFBLElBRUEsT0FBTztBQUNMLFVBQUksS0FBSztBQUFTO0FBQ2xCLFdBQUssVUFBVTtBQUVmLFlBQU0sWUFBWSxRQUFRLGFBQWE7QUFFdkMsVUFBSSxLQUFLLGFBQWEsUUFBUTtBQUM1QixhQUFLO0FBQUEsVUFDSCxLQUFLLGVBQWUsUUFDaEIsS0FBSyxrQkFBa0IsV0FDckIsS0FBSyxnQkFBZ0IsU0FDbkIsS0FBSyxpQkFBaUIsVUFDcEI7QUFBQSxRQUNaO0FBQUEsTUFDRixPQUFPO0FBQ0wsYUFBSyxrQkFBa0IsS0FBSyxRQUFRO0FBQUEsTUFDdEM7QUFHQSxnQkFBVSxZQUFZLEtBQUssWUFBWTtBQUN2QyxXQUFLLGFBQWEsVUFBVSxJQUFJLFNBQVM7QUFBQSxJQUMzQztBQUFBLElBRUEsa0JBQWtCLFVBQVU7QUFDMUIsWUFBTSxlQUFlLEtBQUssT0FBTyxzQkFBc0I7QUFFdkQsV0FBSyxhQUFhLFVBQVUsT0FBTyxHQUFHLE9BQU8sT0FBTyxnQkFBZ0IsQ0FBQztBQUNyRSxXQUFLLGVBQWUsVUFBVSxPQUFPLFlBQVksWUFBWTtBQUU3RCxjQUFRLFVBQVU7QUFBQSxRQUNoQixLQUFLLE9BQU87QUFDVixlQUFLLGFBQWEsTUFBTSxNQUFNLEdBQUcsYUFBYSxNQUFNLEtBQUssT0FBTyxlQUFlO0FBQy9FLGVBQUssYUFBYSxNQUFNLE9BQU8sR0FBRyxhQUFhO0FBQy9DLGVBQUssYUFBYSxVQUFVLElBQUksaUJBQWlCLEdBQUc7QUFDcEQsZUFBSyxlQUFlLFVBQVUsSUFBSSxVQUFVO0FBQzVDLGVBQUssZUFBZSxZQUFZO0FBQ2hDO0FBQUEsUUFDRjtBQUFBLFFBQ0EsS0FBSyxVQUFVO0FBQ2IsZUFBSyxhQUFhLE1BQU0sTUFBTSxHQUFHLGFBQWEsTUFBTSxLQUFLLE9BQU8sZUFBZTtBQUMvRSxlQUFLLGFBQWEsTUFBTSxPQUFPLEdBQUcsYUFBYTtBQUMvQyxlQUFLLGFBQWEsVUFBVSxJQUFJLGlCQUFpQixNQUFNO0FBQ3ZELGVBQUssZUFBZSxVQUFVLElBQUksVUFBVTtBQUM1QyxlQUFLLGVBQWUsWUFBWTtBQUNoQztBQUFBLFFBQ0Y7QUFBQSxRQUNBLEtBQUssUUFBUTtBQUNYLGVBQUssYUFBYSxNQUFNLE1BQU0sR0FBRyxhQUFhO0FBQzlDLGVBQUssYUFBYSxNQUFNLE9BQU8sR0FBRyxhQUFhLE9BQU8sS0FBSyxPQUFPLGNBQWM7QUFDaEYsZUFBSyxhQUFhLFVBQVUsSUFBSSxpQkFBaUIsSUFBSTtBQUNyRCxlQUFLLGVBQWUsVUFBVSxJQUFJLFlBQVk7QUFDOUMsZUFBSyxlQUFlLFVBQVU7QUFDOUI7QUFBQSxRQUNGO0FBQUEsUUFDQSxLQUFLLFNBQVM7QUFDWixlQUFLLGFBQWEsTUFBTSxNQUFNLEdBQUcsYUFBYTtBQUM5QyxlQUFLLGFBQWEsTUFBTSxPQUFPLEdBQUcsYUFBYSxPQUFPLEtBQUssT0FBTyxjQUFjO0FBQ2hGLGVBQUssYUFBYSxVQUFVLElBQUksaUJBQWlCLEtBQUs7QUFDdEQsZUFBSyxlQUFlLFVBQVUsSUFBSSxZQUFZO0FBQzlDLGVBQUssZUFBZSxVQUFVO0FBQzlCO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFFQSxlQUFlLFdBQVc7QUFDeEIsY0FBUSxXQUFXO0FBQUEsUUFDakIsS0FBSyxjQUFjO0FBQ2pCLGdCQUFNLFNBQVMsS0FBSyxPQUFPLHNCQUFzQixFQUFFLE9BQVEsS0FBSyxPQUFPLGNBQWM7QUFDckYsZUFBSyxhQUFhLE1BQU0sWUFBWSxRQUFRLEdBQUcsU0FBVSxLQUFLLGFBQWEsY0FBYyxLQUFNO0FBQy9GO0FBQUEsUUFDRjtBQUFBLFFBQ0EsS0FBSyxZQUFZO0FBQ2YsZ0JBQU0sU0FBUyxLQUFLLE9BQU8sc0JBQXNCLEVBQUUsTUFBTyxLQUFLLE9BQU8sZUFBZTtBQUNyRixlQUFLLGFBQWEsTUFBTSxZQUFZLE9BQU8sR0FBRyxTQUFVLEtBQUssYUFBYSxlQUFlLEtBQU07QUFBQSxRQUNqRztBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFFQSxPQUFPO0FBQ0wsVUFBSSxDQUFDLEtBQUs7QUFBUztBQUNuQixXQUFLLFVBQVU7QUFFZixXQUFLLGFBQWEsVUFBVSxPQUFPLFNBQVM7QUFDNUMsaUJBQVcsTUFBTTtBQUNmLGFBQUssYUFBYSxPQUFPO0FBQUEsTUFDM0IsR0FBRyxFQUFFO0FBQUEsSUFDUDtBQUFBLElBRUEsSUFBSSxlQUFlO0FBQUUsYUFBTyxLQUFLLE9BQU8sc0JBQXNCLEVBQUUsTUFBTSxLQUFLLGFBQWEsZ0JBQWdCO0FBQUEsSUFBRztBQUFBLElBQzNHLElBQUksa0JBQWtCO0FBQUUsYUFBTyxLQUFLLE9BQU8sc0JBQXNCLEVBQUUsTUFBTSxLQUFLLE9BQU8sZUFBZSxLQUFLLGFBQWEsZ0JBQWdCLE9BQU87QUFBQSxJQUFhO0FBQUEsSUFDMUosSUFBSSxnQkFBZ0I7QUFBRSxhQUFPLEtBQUssT0FBTyxzQkFBc0IsRUFBRSxPQUFPLEtBQUssYUFBYSxlQUFlO0FBQUEsSUFBRztBQUFBLElBQzVHLElBQUksaUJBQWlCO0FBQUUsYUFBTyxLQUFLLE9BQU8sc0JBQXNCLEVBQUUsT0FBTyxLQUFLLE9BQU8sY0FBYyxLQUFLLGFBQWEsZUFBZSxPQUFPO0FBQUEsSUFBWTtBQUFBLEVBQ3pKO0FBRUEsV0FBUyxPQUFPLFFBQVEsU0FBUyxXQUFXLFFBQVE7QUFDbEQsV0FBTyxJQUFJLFFBQVEsUUFBUSxTQUFTLFFBQVE7QUFBQSxFQUM5QztBQUVBLGNBQUk7QUFBQSxJQUNGO0FBQUEsSUFDQSxDQUFDLFFBQVE7QUFDUCxVQUFJLFVBQVUsT0FBTyxLQUFLLElBQUksYUFBYSx3QkFBd0IsR0FBRyxJQUFJLGFBQWEseUJBQXlCLENBQUM7QUFDakgsY0FBUSxXQUFXLElBQUksYUFBYSx5QkFBeUIsTUFBTTtBQUVuRSxhQUFPLE1BQU07QUFDWCxnQkFBUSxRQUFRO0FBQUEsTUFDbEI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUVBLE1BQU8sbUJBQVEsRUFBRSxPQUFPOzs7QUN6TnhCLE1BQU0saUJBQWlCO0FBQUEsSUFDckI7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0Y7QUFFQSxXQUFTLGFBQWEsVUFBVTtBQUM5QixRQUFJLENBQUMsZUFBZSxTQUFTLFFBQVE7QUFBRyxZQUFNLElBQUksTUFBTSxxQkFBcUIsbUNBQW1DLGVBQWUsS0FBSyxJQUFJLEdBQUc7QUFDM0ksVUFBTSxTQUFTLFNBQVMsY0FBYyw4QkFBOEI7QUFFcEUsUUFBSSxlQUFlLE9BQU8sY0FBYyxzQ0FBc0M7QUFDOUUsUUFBSSxDQUFDLGNBQWM7QUFDakIscUJBQWUsWUFBSSxNQUFNLGdGQUFnRjtBQUN6RyxhQUFPLFlBQVksWUFBWTtBQUFBLElBQ2pDO0FBQ0EsaUJBQWEsTUFBTSxZQUFZLGdCQUFnQixHQUFHLE9BQU8sc0JBQXNCLEVBQUUsSUFBSSxRQUFRLENBQUMsS0FBSztBQUVuRyxRQUFJLG9CQUFvQixhQUFhLGNBQWMsOEJBQThCLFVBQVU7QUFDM0YsUUFBSSxDQUFDLG1CQUFtQjtBQUN0QiwwQkFBb0IsWUFBSSxNQUFNLHlDQUF5QyxrQkFBa0I7QUFDekYsbUJBQWEsWUFBWSxpQkFBaUI7QUFBQSxJQUM1QztBQUVBLFdBQU87QUFBQSxFQUNUO0FBRUEsV0FBU0MsTUFBSyxTQUFTO0FBQUEsSUFDckIsUUFBUTtBQUFBLElBQ1IsVUFBVTtBQUFBLElBQ1YsV0FBVztBQUFBLElBQ1gsV0FBVztBQUFBLElBQ1gsVUFBVTtBQUFBLElBQ1YsVUFBVTtBQUFBLEVBQ1osSUFBSSxDQUFDLEdBQUc7QUFDTixVQUFNLFlBQVksYUFBYSxRQUFRO0FBRXZDLFVBQU0sV0FBVyxZQUFJLE1BQU07QUFBQSw0Q0FDZTtBQUFBO0FBQUE7QUFBQSxnQ0FHWixDQUFDLFdBQVcsV0FBVztBQUFBO0FBQUE7QUFBQTtBQUFBLDZEQUlNO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FJMUQ7QUFFRCxhQUFTLGNBQWMsVUFBVSxFQUFFLFlBQVk7QUFFL0MsUUFBSSxTQUFTO0FBQ2IsYUFBUyxNQUFNLFdBQVc7QUFDeEIsVUFBSTtBQUFRO0FBQ1osZUFBUztBQUVULGVBQVMsVUFBVSxJQUFJLFNBQVM7QUFDaEMsaUJBQVcsTUFBTTtBQUNmLGlCQUFTLE9BQU87QUFFaEIsc0JBQU07QUFBQSxVQUNKLFNBQVMsY0FBYyxzQ0FBc0M7QUFBQTtBQUFBLFVBQzNCLENBQUMsUUFBUTtBQUN6QyxnQkFBSSxDQUFFLENBQUMsR0FBRyxJQUFJLFdBQVcsT0FBTyxDQUFDLEVBQUUsT0FBTyxDQUFDLE1BQU0sU0FBUyxPQUFPLEtBQUssbUJBQW1CLENBQUM7QUFBSSxrQkFBSSxPQUFPO0FBQUEsVUFDM0c7QUFBQSxRQUNGO0FBQUEsTUFDRixHQUFHLEdBQUc7QUFDTixnQkFBVSxTQUFTO0FBQUEsSUFDckI7QUFFQSxRQUFJLE9BQU8sV0FBVyxZQUFZO0FBQ2hDLGVBQVMsVUFBVSxJQUFJLFdBQVc7QUFDbEMsZUFBUyxVQUFVLE1BQU07QUFDdkIsZ0JBQVEsS0FBSztBQUFBLE1BQ2Y7QUFBQSxJQUNGO0FBRUEsa0JBQU0sU0FBUyxTQUFTLGNBQWMsUUFBUSxHQUFHLENBQUMsUUFBUTtBQUN4RCxVQUFJLFVBQVUsTUFBTTtBQUNsQixjQUFNLE1BQU07QUFBQSxNQUNkO0FBQUEsSUFDRixDQUFDO0FBRUQsY0FBVSxRQUFRLFFBQVE7QUFDMUIsMEJBQXNCLE1BQU07QUFDMUIsZUFBUyxVQUFVLE9BQU8sUUFBUTtBQUNsQyxlQUFTLGNBQWMsV0FBVyxFQUFFLFVBQVUsSUFBSSxhQUFhO0FBQUEsSUFDakUsQ0FBQztBQUVELGVBQVcsTUFBTTtBQUNmLFlBQU0sU0FBUztBQUFBLElBQ2pCLEdBQUcsT0FBTztBQUVWLFdBQU8sTUFBTTtBQUNYLFlBQU0sT0FBTztBQUFBLElBQ2Y7QUFBQSxFQUNGO0FBRUEsTUFBTyx3QkFBUTtBQUFBLElBQ2IsTUFBTSxPQUFPLE9BQU9BLE9BQU07QUFBQSxNQUN4QixNQUFNLENBQUMsTUFBTSxNQUFNLENBQUMsTUFBTUEsTUFBSyxNQUFNLEVBQUUsR0FBRyxLQUFLLE9BQU8sT0FBTyxDQUFDO0FBQUEsTUFDOUQsT0FBTyxDQUFDLE1BQU0sTUFBTSxDQUFDLE1BQU1BLE1BQUssTUFBTSxFQUFFLEdBQUcsS0FBSyxPQUFPLFFBQVEsQ0FBQztBQUFBLE1BQ2hFLFNBQVMsQ0FBQyxNQUFNLE1BQU0sQ0FBQyxNQUFNQSxNQUFLLE1BQU0sRUFBRSxHQUFHLEtBQUssT0FBTyxVQUFVLENBQUM7QUFBQSxNQUNwRSxTQUFTLENBQUMsTUFBTSxNQUFNLENBQUMsTUFBTUEsTUFBSyxNQUFNLEVBQUUsR0FBRyxLQUFLLE9BQU8sVUFBVSxDQUFDO0FBQUEsSUFDdEUsQ0FBQztBQUFBLEVBQ0g7OztBQzVHQSxNQUFNLEVBQUUsTUFBTSxJQUFJQztBQUVsQixNQUFJLFVBQVU7QUFFZCxNQUFJLGFBQWE7QUFFakIsTUFBSSxVQUFVO0FBRWQsR0FBQyxZQUFZO0FBQ1gsY0FBVSxPQUFPLFlBQVk7QUFDM0IsVUFBSTtBQUNKLGFBQU8sTUFBTTtBQUNYLG1CQUFXLGdCQUFRLE9BQU8sT0FBSyxPQUFPLE9BQU8sQ0FBQyxFQUFFLEtBQUssT0FBSyxPQUFPLE1BQU0sY0FBYyxFQUFFLFNBQVMsRUFBRSxTQUFTLG9CQUFvQixDQUFDLENBQUMsRUFBRSxLQUFLLE9BQUssRUFBRSxZQUFZLE1BQU0sR0FBRztBQUNwSyxZQUFJO0FBQVU7QUFDZCxjQUFNLElBQUksUUFBUSxPQUFLLFdBQVcsR0FBRyxHQUFHLENBQUM7QUFBQSxNQUMzQztBQUNBLFlBQU1DLE9BQU0sVUFBVSxVQUFVO0FBQUEsUUFDOUIsT0FBTyxDQUFDLG9CQUFvQjtBQUFBLFFBQzVCLE1BQU0sQ0FBQyxZQUFZO0FBQUEsTUFDckIsQ0FBQztBQUVELGdCQUFVLENBQUMsQ0FBQ0EsS0FBSSxTQUFTLENBQUMsQ0FBQ0EsS0FBSTtBQUMvQixhQUFPQTtBQUFBLElBQ1QsR0FBRztBQUVILGlCQUFhLE9BQU8sWUFBWTtBQUM5QixZQUFNQSxPQUFNLENBQUM7QUFDYixZQUFNLGVBQWU7QUFBQSxRQUNuQixXQUFXO0FBQUEsUUFDWCxVQUFVO0FBQUEsUUFDVixPQUFPO0FBQUEsUUFDUCxTQUFTO0FBQUEsUUFDVCxZQUFZO0FBQUEsUUFDWixZQUFZO0FBQUEsTUFDZDtBQUVBLFVBQUk7QUFDRixZQUFJO0FBQ0osZUFBTyxNQUFNO0FBQ1gscUJBQVcsT0FBTyxRQUFRLGdCQUFRLFFBQVEsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEdBQUcsU0FBUyxFQUFFLFNBQVMsa0JBQWtCLENBQUMsRUFBRSxDQUFDO0FBQzFHLGNBQUk7QUFBVTtBQUNkLGdCQUFNLElBQUksUUFBUSxPQUFLLFdBQVcsR0FBRyxHQUFHLENBQUM7QUFBQSxRQUMzQztBQUVBLGNBQU0sb0JBQW9CLGdCQUFRLEtBQUssQ0FBQ0MsSUFBRyxRQUFRLE9BQU8sUUFBUSxFQUFFO0FBRXBFLGNBQU0sZUFBZSxnQkFBUSxRQUFRLEVBQUUsUUFBUSxFQUFFLFNBQVM7QUFDMUQsY0FBTSxhQUFhLGFBQWEsU0FBUyxvREFBb0Q7QUFFN0YsUUFBQUQsS0FBSSxPQUFPLE9BQU8sT0FBTyxpQkFBaUIsRUFBRSxLQUFLLE9BQUssRUFBRSxTQUFTLEVBQUUsU0FBUyw0QkFBNEIsQ0FBQztBQUV6RyxTQUFDLEdBQUcsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDLEVBQUUsY0FBYyxJQUFJLE1BQU07QUFDbEQsY0FBSSxZQUFZLGFBQWEsTUFBTSxJQUFJLE9BQU8sSUFBSSxPQUFPLHNCQUFzQixjQUFjLENBQUMsQ0FBQyxJQUFJLENBQUM7QUFDcEcsVUFBQUEsS0FBSSxhQUFhLElBQUksQ0FBQyxJQUFJLGtCQUFrQixTQUFTO0FBQUEsUUFDdkQsQ0FBQztBQUVELGtCQUFVLE9BQU8sS0FBS0EsSUFBRyxFQUFFLFNBQVM7QUFBQSxNQUN0QyxTQUFTLEtBQVA7QUFDQSxrQkFBVTtBQUNWLHVCQUFPLE1BQU0sMENBQTBDLEdBQUc7QUFBQSxNQUM1RDtBQUVBLGFBQU9BO0FBQUEsSUFDVCxHQUFHO0FBRUgsZ0JBQVksV0FBVztBQUFBLEVBQ3pCLEdBQUc7QUFHSCxNQUFNLGVBQU4sTUFBa0I7QUFBQSxJQUtoQixPQUFPLGFBQWE7QUFDbEIsVUFBSSxDQUFDO0FBQVMsZUFBTyxlQUFPLEtBQUssOEJBQThCO0FBRS9ELFlBQU0sZ0JBQWdCLGdCQUFRLE9BQU8sT0FBSyxPQUFPLE9BQU8sQ0FBQyxFQUFFLEtBQUssT0FBSyxPQUFPLE1BQU0sY0FBYyxFQUFFLFNBQVMsRUFBRSxTQUFTLG9CQUFvQixDQUFDLENBQUMsRUFBRSxLQUFLLE9BQUssRUFBRSxZQUFZLE1BQU0sRUFBRTtBQUM5SyxZQUFNLGFBQWEsT0FBTyxLQUFLLGFBQWEsRUFBRSxLQUFLLE9BQUssY0FBYyxDQUFDLEdBQUcsV0FBVyxDQUFDO0FBRXRGLHNCQUFRO0FBQUEsUUFDTjtBQUFBLFFBQ0E7QUFBQSxRQUNBLFNBQVUsWUFBWTtBQUNwQixnQkFBTSxVQUFVLFdBQVcsQ0FBQztBQUM1QixxQkFBVyxDQUFDLElBQUksa0JBQW1CLE1BQU07QUFDdkMsa0JBQU0sU0FBUyxNQUFNLFFBQVEsS0FBSyxNQUFNLEdBQUcsSUFBSTtBQUUvQyxtQkFBTyxDQUFDLFVBQVU7QUFDaEIsb0JBQU0sTUFBTSxPQUFPLEtBQUs7QUFFeEIsa0JBQUksS0FBSyxNQUFNLE9BQU87QUFDcEIsNkJBQVksZUFBZSxJQUFJLE1BQU0sT0FBTyxLQUFLLEtBQUs7QUFBQSxjQUN4RCxXQUFXLE9BQU8sS0FBSyxTQUFTLFlBQVk7QUFDMUMsNkJBQVksZUFBZSxLQUFLLE1BQU07QUFBQSxjQUN4QztBQUVBLHFCQUFPO0FBQUEsWUFDVDtBQUFBLFVBQ0Y7QUFFQSxpQkFBTztBQUFBLFFBQ1Q7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBRUEsT0FBTyxlQUFlLFFBQVEsUUFBUSxZQUFZLEdBQUc7QUFDbkQsVUFBSSxhQUFhLEtBQUs7QUFBc0I7QUFFNUMsWUFBTSxnQkFBZ0IsS0FBSyxXQUFXLElBQUksT0FBTyxNQUFNLENBQUMsTUFBTSxNQUFNO0FBQ2xFLGNBQU0sbUJBQW1CLE9BQU8sTUFBTTtBQUN0QyxjQUFNLFFBQVEsRUFBRTtBQUNoQixpQkFBUyxTQUFTLE1BQU07QUFDdEIsZ0JBQU0sTUFBTSxpQkFBaUIsS0FBSyxNQUFNLEdBQUcsSUFBSTtBQUUvQyxjQUFJLENBQUM7QUFBSyxtQkFBTztBQUVqQixnQkFBTSxRQUFRLElBQUksT0FBTyxTQUFTLElBQUksT0FBTyxVQUFVLE9BQU87QUFDOUQsY0FBSSxPQUFPO0FBQ1QseUJBQVksZUFBZSxPQUFPLEtBQUssS0FBSyxDQUFDLENBQUM7QUFBQSxVQUNoRCxPQUFPO0FBQ0wsa0JBQU0sUUFBUSxJQUFJLE1BQU0sV0FBVyxJQUFJLE1BQU0sV0FBVztBQUV4RCxnQkFBSSxPQUFPLE9BQU8sUUFBUSxZQUFZO0FBQ3BDLDJCQUFZLGVBQWUsT0FBTyxRQUFRLEtBQUs7QUFBQSxZQUNqRDtBQUFBLFVBQ0Y7QUFFQSxpQkFBTztBQUFBLFFBQ1Q7QUFFQSxjQUFNLGVBQWU7QUFDckIsZUFBTyxPQUFPLE9BQU8sZ0JBQWdCO0FBQ3JDLGFBQUssV0FBVyxJQUFJLGtCQUFrQixLQUFLO0FBRTNDLGVBQU87QUFBQSxNQUNULEdBQUc7QUFFSCxhQUFPLE1BQU0sSUFBSTtBQUFBLElBQ25CO0FBQUEsSUFFQSxPQUFPLGVBQWUsSUFBSSxLQUFLLE9BQU87QUFDcEMsVUFBSSxDQUFDLEtBQUssUUFBUSxJQUFJLEVBQUU7QUFBRztBQUUzQixXQUFLLFFBQVEsSUFBSSxFQUFFLEVBQUUsUUFBUSxXQUFTO0FBQ3BDLFlBQUk7QUFDRixnQkFBTSxLQUFLLEtBQUs7QUFBQSxRQUNsQixTQUFTLEtBQVA7QUFDQSx5QkFBTyxNQUFNLGdDQUFnQyxPQUFPLEdBQUc7QUFBQSxRQUN6RDtBQUFBLE1BQ0YsQ0FBQztBQUFBLElBQ0g7QUFBQSxFQUNGO0FBbkZBLE1BQU0sY0FBTjtBQUNFLGdCQURJLGFBQ0csd0JBQXVCO0FBQzlCLGdCQUZJLGFBRUcsV0FBVSxvQkFBSSxJQUFJO0FBQ3pCLGdCQUhJLGFBR0csY0FBYSxvQkFBSSxRQUFRO0FBb0ZsQyxXQUFTLFVBQVUsT0FBTztBQUN4QixVQUFNLEVBQUUsS0FBSyxJQUFJO0FBQ2pCLFFBQUksU0FBUztBQUFhLGFBQU8sTUFBTSxjQUFjLFdBQVcsU0FBUztBQUV6RSxRQUFJLFlBQVksV0FBVztBQUMzQixRQUFJLFNBQVMsV0FBVztBQUN0QixVQUFJLENBQUMsTUFBTTtBQUFVLGNBQU0sV0FBVyxrQkFBa0IsTUFBTSxVQUFVLE1BQU0sS0FBSztBQUFBLElBQ3JGLFdBQVcsU0FBUyxZQUFZLFNBQVMsU0FBUztBQUNoRCxrQkFBWSxTQUFTLFdBQVcsV0FBVyxlQUFlLFdBQVc7QUFDckUsVUFBSSxNQUFNO0FBQVEsY0FBTSxVQUFVLE1BQU07QUFBQSxJQUMxQyxXQUFXLFNBQVMsV0FBVztBQUM3QixrQkFBWSxXQUFXO0FBQUEsSUFDekI7QUFDQSxRQUFJLENBQUMsTUFBTTtBQUFJLFlBQU0sS0FBSyxHQUFHLE1BQU0sTUFBTSxRQUFRLHNCQUFzQixHQUFHO0FBQzFFLFFBQUksTUFBTTtBQUFRLFlBQU0sUUFBUTtBQUNoQyxVQUFNLFdBQVc7QUFFakIsUUFBSSxTQUFTLFVBQVU7QUFDckIsWUFBTSxDQUFDLFFBQVEsUUFBUSxJQUFJLE1BQU0sU0FBUyxNQUFNLFdBQVcsS0FBSztBQUNoRSxZQUFNLGlCQUFpQixNQUFNO0FBQzdCLFlBQU0sVUFBVTtBQUNoQixZQUFNLFNBQVMsU0FBVSxJQUFJO0FBQzNCLHVCQUFlLEVBQUU7QUFDakIsaUJBQVMsQ0FBQyxNQUFNO0FBQUEsTUFDbEI7QUFBQSxJQUNGO0FBRUEsV0FBTyxNQUFNLGNBQWMsV0FBVyxLQUFLO0FBQUEsRUFDN0M7QUFHQSxXQUFTLGtCQUFrQixPQUFPO0FBQ2hDLFVBQU0sU0FBUyxPQUFLO0FBQ2xCLFVBQUksRUFBRSxTQUFTO0FBQVMsZUFBTyxXQUFXLENBQUM7QUFDM0MsYUFBTyxVQUFVLENBQUM7QUFBQSxJQUNwQjtBQUNBLFVBQU0sYUFBYSxTQUFVLE9BQU87QUFDbEMsWUFBTSxRQUFRLE1BQU0sTUFBTSxJQUFJLE1BQU0sRUFBRSxPQUFPLE9BQUssQ0FBQztBQUNuRCxhQUFPLE1BQU0sY0FBYyxXQUFXLE9BQU8sTUFBTSxLQUFLO0FBQUEsSUFDMUQ7QUFDQSxXQUFPLE1BQU0sSUFBSSxNQUFNLEVBQUUsT0FBTyxPQUFLLENBQUM7QUFBQSxFQUN4QztBQUVBLE1BQU8sdUJBQVE7QUFBQSxJQUNiLFdBQVc7QUFBQSxNQUNULFNBQVMsWUFBWTtBQUFBLE1BQ3JCLFlBQVksWUFBWTtBQUFBLElBQzFCO0FBQUEsSUFDQSxNQUFNLE9BQU8sSUFBSTtBQUNmLFVBQUksQ0FBQyxZQUFZLFFBQVEsSUFBSSxLQUFLO0FBQUcsb0JBQVksUUFBUSxJQUFJLE9BQU8sb0JBQUksSUFBSSxDQUFDO0FBQzdFLGtCQUFZLFFBQVEsSUFBSSxLQUFLLEVBQUUsSUFBSSxFQUFFO0FBRXJDLGFBQU8sTUFBTTtBQUNYLG9CQUFZLFFBQVEsSUFBSSxLQUFLLEVBQUUsT0FBTyxFQUFFO0FBQUEsTUFDMUM7QUFBQSxJQUNGO0FBQUEsSUFDQSxLQUFLLE9BQU8sV0FBVyxRQUFRO0FBQzdCLGFBQU8sUUFBUSxLQUFLLE9BQU8sQ0FBQyxNQUFNLE1BQU0sY0FBYyxXQUFXLE9BQU8sT0FBTyxDQUFDLEdBQUcsR0FBRyxFQUFFLFNBQVMsUUFBUSxNQUFNLENBQUMsQ0FBQyxHQUFHLE1BQU07QUFBQSxJQUM1SDtBQUFBLElBQ0EsUUFBUTtBQUNOLGFBQU8sUUFBUSxNQUFNO0FBQUEsSUFDdkI7QUFBQSxJQUNBLE9BQU87QUFBQSxNQUNMLEtBQUssT0FBTztBQUNWLGVBQU8sa0JBQWtCLEtBQUs7QUFBQSxNQUNoQztBQUFBLE1BQ0EsS0FBSyxPQUFPO0FBQ1YsZUFBTyxDQUFDLFVBQVUsTUFBTSxjQUFjLFdBQVcsTUFBTSxPQUFPLGtCQUFrQixLQUFLLENBQUM7QUFBQSxNQUN4RjtBQUFBLElBQ0Y7QUFBQSxFQUNGOzs7QUN2T0EsTUFBTSxFQUFFLE9BQUFFLE9BQU0sSUFBSUM7QUFFbEIsTUFBcUIsZ0JBQXJCLGNBQTJDRCxPQUFNLFVBQVU7QUFBQSxJQUN6RCxZQUFZLE9BQU87QUFDakIsWUFBTSxLQUFLO0FBQ1gsV0FBSyxRQUFRLEVBQUUsT0FBTyxLQUFLO0FBQUEsSUFDN0I7QUFBQSxJQUVBLGtCQUFrQixPQUFPO0FBQ3ZCLFdBQUssU0FBUyxFQUFFLE1BQU0sQ0FBQztBQUN2QixxQkFBTyxNQUFNLEtBQUs7QUFDbEIsVUFBSSxPQUFPLEtBQUssTUFBTSxZQUFZO0FBQVksYUFBSyxNQUFNLFFBQVEsS0FBSztBQUFBLElBQ3hFO0FBQUEsSUFFQSxTQUFTO0FBQ1AsVUFBSSxLQUFLLE1BQU07QUFBTyxlQUFPLGdCQUFBQSxPQUFBLGNBQUMsU0FBSSxXQUFVLHdCQUMxQyxnQkFBQUEsT0FBQSxjQUFDLFdBQUUsa0NBQWdDLEdBQ25DLGdCQUFBQSxPQUFBLGNBQUMsV0FBRyxHQUFHLEtBQUssTUFBTSxPQUFRLENBQzVCO0FBQ0EsYUFBTyxLQUFLLE1BQU07QUFBQSxJQUNwQjtBQUFBLEVBQ0Y7QUFFQSxNQUFNLGlCQUFpQixjQUFjLFVBQVU7QUFDL0MsU0FBTyxlQUFlLGNBQWMsV0FBVyxVQUFVO0FBQUEsSUFDdkQsWUFBWTtBQUFBLElBQ1osY0FBYztBQUFBLElBQ2QsS0FBSyxXQUFZO0FBQUUsWUFBTSxJQUFJLE1BQU0sMkNBQTJDO0FBQUEsSUFBRztBQUFBLElBQ2pGLEtBQUssTUFBTTtBQUFBLEVBQ2IsQ0FBQzs7O0FDNUJELE1BQU8scUJBQVE7QUFBQSxJQUNiO0FBQUEsSUFDQSxRQUFRRSxnQkFBTyxXQUFXO0FBQUEsSUFDMUIsVUFBVUEsZ0JBQU8sV0FBVztBQUFBLElBQzVCLE1BQU1BLGdCQUFPLFdBQVc7QUFBQSxJQUN4QixtQkFBbUJBLGdCQUFPLFdBQVc7QUFBQSxJQUNyQyxXQUFXQSxnQkFBTyxPQUFPLFdBQVc7QUFBQSxJQUNwQyxrQkFBa0JBLGdCQUFPLE9BQU8sV0FBVyxNQUFNO0FBQUEsSUFDakQsYUFBYUEsZ0JBQU8sT0FBTyxXQUFXLE1BQU07QUFBQSxJQUM1QyxjQUFjQSxnQkFBTyxPQUFPLFdBQVcsTUFBTTtBQUFBLElBQzdDLGFBQWFBLGdCQUFPLE9BQU8sV0FBVyxNQUFNO0FBQUEsSUFDNUMsa0JBQWtCQSxnQkFBTyxPQUFPLFdBQVcsTUFBTTtBQUFBLElBQ2pELFNBQVNBLGdCQUFPLFdBQVc7QUFBQSxFQUM3Qjs7O0FDYkEsTUFBTSxFQUFFLE9BQUFDLFFBQU8sZ0JBQWdCLFlBQVksUUFBUSxVQUFVLElBQUlDO0FBRWpFLE1BQU8saUJBQVE7QUFBQSxJQUNiLE1BQU07QUFBQSxNQUNKLGFBQWEsT0FBTyxTQUFTLEVBQUUsVUFBVSxNQUFNLFNBQVMsTUFBTSxTQUFTLE9BQU8sTUFBTSxRQUFXLFVBQVUsTUFBUSxFQUFFLElBQUksQ0FBQyxHQUFHO0FBQ3pILGVBQU8sSUFBSSxRQUFRLENBQUMsWUFBWTtBQUM5QixjQUFJLENBQUMsTUFBTSxRQUFRLE9BQU87QUFBRyxzQkFBVSxDQUFDLE9BQU87QUFDL0Msb0JBQVUsUUFBUSxJQUFJLE9BQUssT0FBTyxNQUFNLFdBQVdELE9BQU0sY0FBYyxXQUFXLFVBQVUsTUFBTSxDQUFDLElBQUksQ0FBQztBQUN4RyxnQkFBTSxXQUFXLE9BQU8sUUFBUSxLQUFLLENBQUMsVUFBVTtBQUM5QyxnQkFBSUUsY0FBYTtBQUNqQixtQkFBTyxnQkFBQUYsT0FBQSxjQUFDLGlCQUFjLFNBQVMsTUFBTTtBQUFFLHNCQUFRLEtBQUs7QUFBQSxZQUFHLEtBQ3JELGdCQUFBQSxPQUFBO0FBQUEsY0FBQyxXQUFXO0FBQUEsY0FBWDtBQUFBLGdCQUNDLFFBQVE7QUFBQSxnQkFDUixvQkFBb0IsU0FBUyxXQUFXLE9BQU8sT0FBTyxNQUFNLFdBQVcsT0FBTyxPQUFPO0FBQUEsZ0JBQ3JGLGFBQWEsV0FBVyxhQUFLLE9BQU8sU0FBUztBQUFBLGdCQUM3QyxZQUFZO0FBQUEsZ0JBQ1osVUFBVSxNQUFNO0FBQUUsMEJBQVEsS0FBSztBQUFHLHlCQUFPLFFBQVEsTUFBTSxRQUFRO0FBQUcsa0JBQUFFLGNBQWE7QUFBQSxnQkFBTTtBQUFBLGdCQUNyRixXQUFXLE1BQU07QUFBRSwwQkFBUSxJQUFJO0FBQUcseUJBQU8sUUFBUSxNQUFNLFFBQVE7QUFBRyxrQkFBQUEsY0FBYTtBQUFBLGdCQUFNO0FBQUEsZ0JBQ3BGLEdBQUc7QUFBQSxnQkFDSixTQUFTLE1BQU07QUFBRSx3QkFBTSxRQUFRO0FBQUcsMEJBQVEsS0FBSztBQUFHLHlCQUFPLFFBQVEsTUFBTSxRQUFRO0FBQUEsZ0JBQUc7QUFBQTtBQUFBLGNBRWxGLGdCQUFBRixPQUFBLGNBQUMsaUJBQWMsU0FBUyxNQUFNO0FBQUUsd0JBQVEsS0FBSztBQUFBLGNBQUcsS0FDN0MsT0FDSDtBQUFBLFlBQ0YsQ0FDRjtBQUFBLFVBQ0YsR0FBRyxFQUFFLFVBQVUsSUFBSSxDQUFDO0FBQ3BCLGNBQUksU0FBUztBQUNYLHVCQUFXLE1BQU07QUFDZixrQkFBSSxDQUFDLFlBQVk7QUFDZix3QkFBUSxLQUFLO0FBQ2IsdUJBQU8sUUFBUSxNQUFNLFFBQVE7QUFBQSxjQUMvQjtBQUFBLFlBQ0YsR0FBRyxPQUFPO0FBQUEsVUFDWjtBQUFBLFFBQ0YsQ0FBQztBQUFBLE1BQ0g7QUFBQSxNQUNBLEtBQUssUUFBUTtBQUNYLFlBQUksQ0FBQyxVQUFVLFFBQVEsTUFBTTtBQUFHLGlCQUFPO0FBQ3ZDLHVCQUFlLFNBQVMsRUFBRSxNQUFNLDJCQUEyQixPQUFPLENBQUM7QUFDbkUsZUFBTztBQUFBLE1BQ1Q7QUFBQSxNQUNBLE1BQU0sT0FBTyxTQUFTLEVBQUUsVUFBVSxNQUFNLE1BQU0sUUFBVyxVQUFVLE1BQVEsRUFBRSxJQUFJLENBQUMsR0FBRztBQUNuRixlQUFPLEtBQUssYUFBYSxPQUFPLFNBQVMsRUFBRSxTQUFTLFFBQVEsTUFBTSxLQUFLLFFBQVEsQ0FBQztBQUFBLE1BQ2xGO0FBQUEsSUFDRjtBQUFBLElBQ0EsTUFBTSxLQUFLO0FBQ1QsYUFBTyxPQUFPLFFBQVEsTUFBTSxHQUFHO0FBQUEsSUFDakM7QUFBQSxFQUNGOzs7QUNsREEsV0FBU0csZ0JBQWU7QUFDdEIsVUFBTSxTQUFTLFNBQVMsY0FBYyw4QkFBOEI7QUFFcEUsUUFBSSxlQUFlLE9BQU8sY0FBYywwQkFBMEI7QUFDbEUsUUFBSSxDQUFDLGNBQWM7QUFDakIscUJBQWUsWUFBSSxNQUFNLG9FQUFvRTtBQUM3RixhQUFPLFlBQVksWUFBWTtBQUFBLElBQ2pDO0FBQ0EsaUJBQWEsTUFBTSxZQUFZLGdCQUFnQixHQUFHLE9BQU8sc0JBQXNCLEVBQUUsSUFBSSxRQUFRLENBQUMsS0FBSztBQUVuRyxXQUFPO0FBQUEsRUFDVDtBQUVBLE1BQU0sUUFBUTtBQUFBLElBQ1osTUFBTTtBQUFBLElBQ04sU0FBUztBQUFBLElBQ1QsT0FBTztBQUFBLElBQ1AsU0FBUztBQUFBLEVBQ1g7QUFHQSxXQUFTQyxNQUNQLFNBQ0E7QUFBQSxJQUNFLFFBQVE7QUFBQSxJQUNSLFVBQVU7QUFBQSxJQUNWLFVBQVU7QUFBQSxJQUNWLFdBQVc7QUFBQSxFQUNiLElBQUksQ0FBQyxHQUNMO0FBQ0EsVUFBTSxZQUFZRCxjQUFhO0FBRS9CLFVBQU0sV0FBVyxZQUFJLE1BQU07QUFBQSxxQ0FDUTtBQUFBLFFBQzdCLFdBQVcsS0FBTSxNQUFNLEtBQUssS0FBSztBQUFBO0FBQUE7QUFBQSxHQUd0QztBQUVELGFBQVMsY0FBYyxVQUFVLEVBQUUsWUFBWTtBQUUvQyxRQUFJLFNBQVM7QUFDYixhQUFTLFFBQVE7QUFDZixVQUFJO0FBQVE7QUFDWixlQUFTO0FBRVQsZUFBUyxVQUFVLElBQUksU0FBUztBQUNoQyxpQkFBVyxNQUFNO0FBQ2YsaUJBQVMsT0FBTztBQUVoQixjQUFNO0FBQUEsVUFDSixTQUFTLGNBQWMsMEJBQTBCO0FBQUE7QUFBQSxVQUNmLENBQUMsUUFBUTtBQUN6QyxnQkFBSSxDQUFDLElBQUk7QUFBbUIsa0JBQUksT0FBTztBQUFBLFVBQ3pDO0FBQUEsUUFDRjtBQUFBLE1BQ0YsR0FBRyxHQUFHO0FBQUEsSUFDUjtBQUVBLFFBQUksT0FBTyxXQUFXLFlBQVk7QUFDaEMsZUFBUyxVQUFVLElBQUksV0FBVztBQUNsQyxlQUFTLFVBQVUsTUFBTTtBQUN2QixnQkFBUSxLQUFLO0FBQUEsTUFDZjtBQUFBLElBQ0Y7QUFFQSxjQUFVLFlBQVksUUFBUTtBQUM5QiwwQkFBc0IsTUFBTTtBQUMxQixlQUFTLFVBQVUsT0FBTyxRQUFRO0FBQUEsSUFDcEMsQ0FBQztBQUVELGVBQVcsT0FBTyxPQUFPO0FBRXpCLFdBQU8sTUFBTTtBQUNYLFlBQU07QUFBQSxJQUNSO0FBQUEsRUFDRjtBQUVBLE1BQU8saUJBQVE7QUFBQSxJQUNiLE1BQU0sT0FBTyxPQUFPQyxPQUFNO0FBQUEsTUFDeEIsTUFBTSxDQUFDLE1BQU0sTUFBTSxDQUFDLE1BQU1BLE1BQUssTUFBTSxFQUFFLEdBQUcsS0FBSyxPQUFPLE9BQU8sQ0FBQztBQUFBLE1BQzlELE9BQU8sQ0FBQyxNQUFNLE1BQU0sQ0FBQyxNQUFNQSxNQUFLLE1BQU0sRUFBRSxHQUFHLEtBQUssT0FBTyxRQUFRLENBQUM7QUFBQSxNQUNoRSxTQUFTLENBQUMsTUFBTSxNQUFNLENBQUMsTUFBTUEsTUFBSyxNQUFNLEVBQUUsR0FBRyxLQUFLLE9BQU8sVUFBVSxDQUFDO0FBQUEsTUFDcEUsU0FBUyxDQUFDLE1BQU0sTUFBTSxDQUFDLE1BQU1BLE1BQUssTUFBTSxFQUFFLEdBQUcsS0FBSyxPQUFPLFVBQVUsQ0FBQztBQUFBLElBQ3RFLENBQUM7QUFBQSxFQUNIOzs7QUNyRkEsTUFBTSxnQkFBZ0IsZ0JBQVEsaUJBQWlCLDBCQUEwQixVQUFVLHVCQUF1QjtBQUUxRyxNQUFPLHlCQUFRO0FBQUE7QUFBQSxJQUViLEtBQUssUUFBUTtBQUNYLGFBQU8sVUFBVSxrQkFBa0I7QUFBQSxRQUNqQyxVQUFVO0FBQUEsc0JBQ00sY0FBYyxVQUFVLGNBQWMsY0FBYyxjQUFjO0FBQUEsd0JBQ2hFLGNBQWM7QUFBQTtBQUFBO0FBQUEsUUFHaEMsT0FBTyxDQUFDLFNBQVMsUUFBUSxPQUFPO0FBQUEsUUFDaEMsT0FBTztBQUNMLGlCQUFPO0FBQUEsWUFDTDtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSDtBQUFBLEVBQ0Y7OztBQ25CQSxNQUFJLGVBQWUsZ0JBQVEsaUJBQWlCLGdCQUFnQixXQUFXO0FBQ3ZFLE1BQUksZ0JBQWdCLGdCQUFRLGlCQUFpQixTQUFTLFlBQVksWUFBWSxjQUFjO0FBRTVGLE1BQU8sd0JBQVE7QUFBQTtBQUFBLElBRWIsS0FBSyxRQUFRO0FBQ1gsYUFBTyxVQUFVLGlCQUFpQjtBQUFBLFFBQ2hDLFVBQVU7QUFBQSxzQkFDTSxlQUFlO0FBQUEsd0JBQ2IsY0FBYztBQUFBLG1EQUNhLGNBQWM7QUFBQTtBQUFBO0FBQUE7QUFBQSxRQUkzRCxPQUFPLENBQUMsU0FBUyxlQUFlLE1BQU07QUFBQSxNQUN4QyxDQUFDO0FBQUEsSUFDSDtBQUFBLEVBQ0Y7OztBQ25CQSxNQUFPQyxpQkFBUTtBQUFBOzs7QUNJZixrQkFBUSxVQUFVQyxjQUFPO0FBRXpCLE1BQU0sZ0JBQWdCLGdCQUFRLGlCQUFpQixVQUFVLG9CQUFvQixrQkFBa0I7QUFDL0YsTUFBTSxnQkFBZ0IsZ0JBQVEsaUJBQWlCLDJCQUEyQixnQkFBZ0IsTUFBTTtBQUVoRyxNQUFPLHlCQUFRO0FBQUE7QUFBQSxJQUViLEtBQUssUUFBUTtBQUNYLGFBQU8sVUFBVSxrQkFBa0I7QUFBQSxRQUNqQyxVQUFVO0FBQUEsc0JBQ00sY0FBYyxVQUFVLGNBQWMsK0NBQStDLGNBQWM7QUFBQSx3QkFDakcsY0FBYztBQUFBLHdCQUNkLGNBQWM7QUFBQTtBQUFBO0FBQUE7QUFBQSw4Q0FJUSxjQUFjLFVBQVUsY0FBYyxnQkFBZ0IsY0FBYztBQUFBLDJEQUN2RCxjQUFjO0FBQUE7QUFBQSw2REFFWixjQUFjO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxRQUtyRSxPQUFPO0FBQ0wsaUJBQU87QUFBQSxZQUNMO0FBQUEsWUFDQSxRQUFRO0FBQUEsWUFDUixVQUFVO0FBQUEsVUFDWjtBQUFBLFFBQ0Y7QUFBQSxRQUNBLE9BQU8sQ0FBQyxXQUFXLGNBQWMsVUFBVTtBQUFBLFFBQzNDLE9BQU8sQ0FBQyxtQkFBbUI7QUFBQSxRQUMzQixVQUFVO0FBQ1IsZUFBSyxXQUFXLEtBQUs7QUFDckIsaUJBQU8saUJBQWlCLFNBQVMsS0FBSyxPQUFPO0FBQUEsUUFDL0M7QUFBQSxRQUNBLFlBQVk7QUFDVixpQkFBTyxvQkFBb0IsU0FBUyxLQUFLLE9BQU87QUFBQSxRQUNsRDtBQUFBLFFBQ0EsU0FBUztBQUFBLFVBQ1AsY0FBYyxHQUFHO0FBQ2YsaUJBQUssTUFBTSxxQkFBcUIsRUFBRSxLQUFLO0FBQ3ZDLGlCQUFLLFdBQVcsRUFBRTtBQUFBLFVBQ3BCO0FBQUEsVUFDQSxRQUFRLEdBQUc7QUFDVCxnQkFDRSxFQUFFLE9BQU8sVUFBVSxTQUFTLGNBQWMsTUFBTSxLQUM3QyxFQUFFLE9BQU8sVUFBVSxTQUFTLGNBQWMsS0FBSyxLQUMvQyxFQUFFLE9BQU8sVUFBVSxTQUFTLGNBQWMsS0FBSyxLQUMvQyxFQUFFLE9BQU8sVUFBVSxTQUFTLGNBQWMsTUFBTSxLQUNoRCxFQUFFLE9BQU8sVUFBVSxTQUFTLGNBQWMsTUFBTSxLQUNoRCxFQUFFLE9BQU8sVUFBVSxTQUFTLE1BQU0sR0FDckM7QUFDQSxtQkFBSyxTQUFTLENBQUMsS0FBSztBQUNwQjtBQUFBLFlBQ0Y7QUFDQSxpQkFBSyxTQUFTO0FBQUEsVUFDaEI7QUFBQSxRQUNGO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSDtBQUFBLEVBQ0Y7OztBQzlEQSxNQUFPQyxzQkFBUTtBQUFBLElBQ2IsS0FBSyxRQUFRO0FBQ1gsNkJBQWMsS0FBSyxNQUFNO0FBQ3pCLDRCQUFhLEtBQUssTUFBTTtBQUN4Qiw2QkFBYyxLQUFLLE1BQU07QUFBQSxJQUMzQjtBQUFBLEVBQ0Y7OztBQ1JBLE1BQU8sY0FBUTtBQUFBLElBQ2IsWUFBWTtBQUFBLE1BQ1YsS0FBSyxRQUFRO0FBQ1gsUUFBQUMsb0JBQWMsS0FBSyxNQUFNO0FBQUEsTUFDM0I7QUFBQSxJQUNGO0FBQUEsSUFDQSxPQUFPO0FBQUEsTUFDTCxNQUFNLE9BQU87QUFDWCxlQUFPLENBQUMsT0FBTyxLQUFLO0FBQ2xCLGdCQUFNLElBQUksUUFBUSxhQUFXLFdBQVcsU0FBUyxHQUFHLENBQUM7QUFBQSxRQUN2RDtBQUNBLGVBQU87QUFBQSxNQUNUO0FBQUEsTUFDQSxJQUFJLEtBQUs7QUFDUCxlQUFPLENBQUMsQ0FBQyxPQUFPO0FBQUEsTUFDbEI7QUFBQSxJQUNGO0FBQUEsSUFDQSxJQUFJLE1BQU07QUFDUixhQUFPLE9BQU87QUFBQSxJQUNoQjtBQUFBLEVBQ0Y7OztBQ3BCQSxrQkFBUSxVQUFVLGNBQVk7QUFXOUIsTUFBTyxhQUFRO0FBQUEsSUFDYjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0Y7OztBQ1JBLGdCQUFNLE9BQU8sTUFBTSw0QkFBNEI7QUFFL0MsV0FBUyxTQUFTQyxNQUFLO0FBQ3JCLFdBQU8sSUFBSSxNQUFNLE9BQU9BLHlEQUF3RDtBQUFBLEVBQ2xGO0FBRUEsTUFBTyxjQUFRO0FBQUEsSUFDYixZQUFZO0FBQUEsTUFDVjtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBLElBQUksTUFBTTtBQUNSLFlBQUksQ0FBQyxZQUFJO0FBQVMsZ0JBQU0sU0FBUyxLQUFLO0FBQ3RDLGVBQU87QUFBQSxNQUNUO0FBQUEsTUFDQSxJQUFJLFVBQVU7QUFDWixZQUFJLENBQUMsWUFBSTtBQUFTLGdCQUFNLFNBQVMsU0FBUztBQUMxQyxlQUFPO0FBQUEsTUFDVDtBQUFBLE1BQ0EsSUFBSSxVQUFVO0FBQ1osWUFBSSxDQUFDLFlBQUk7QUFBUyxnQkFBTSxTQUFTLFNBQVM7QUFDMUMsZUFBTztBQUFBLE1BQ1Q7QUFBQSxNQUNBLElBQUksVUFBVTtBQUNaLFlBQUksQ0FBQyxZQUFJO0FBQVMsZ0JBQU0sU0FBUyxTQUFTO0FBQzFDLGVBQU87QUFBQSxNQUNUO0FBQUEsTUFDQSxJQUFJLGFBQWE7QUFDZixZQUFJLENBQUMsWUFBSTtBQUFTLGdCQUFNLFNBQVMsWUFBWTtBQUM3QyxlQUFPO0FBQUEsTUFDVDtBQUFBLE1BQ0EsSUFBSSxXQUFXO0FBQ2IsWUFBSSxDQUFDLFlBQUk7QUFBUyxnQkFBTSxTQUFTLFVBQVU7QUFDM0MsZUFBTztBQUFBLE1BQ1Q7QUFBQSxNQUNBLElBQUksWUFBWTtBQUNkLFlBQUksQ0FBQyxZQUFJO0FBQVMsZ0JBQU0sU0FBUyxXQUFXO0FBQzVDLGVBQU87QUFBQSxNQUNUO0FBQUEsSUFDRjtBQUFBLElBQ0EsY0FBYztBQUFBLE1BQ1o7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxFQUNGOzs7QUMvREEsb0JBQVUsSUFBSSxvQkFBb0IsT0FBTyxFQUFFLElBQUksSUFBSSxDQUFDLE1BQU07QUFDeEQsUUFBSSxDQUFDO0FBQUs7QUFFVixVQUFNLGdCQUFRLE9BQU8sT0FBTyxlQUFlLEdBQUcsSUFBSTtBQUNsRCxVQUFNLElBQUksUUFBUSxPQUFLLFdBQVcsR0FBRyxHQUFHLENBQUM7QUFDekMsVUFBTSxnQkFBUSxPQUFPLE9BQU8sZUFBZSxHQUFHLElBQUk7QUFFbEQsVUFBTSxVQUFVLE1BQU0sZUFBTyxLQUFLO0FBQUEsTUFDaEMsTUFBTSxLQUFLLE9BQU8sOEJBQThCO0FBQUEsTUFDaEQsTUFBTSxLQUFLLE9BQU8sc0NBQXNDLEdBQUc7QUFBQSxJQUM3RDtBQUVBLFFBQUksQ0FBQztBQUFTO0FBRWQsUUFBSTtBQUNGLFlBQU0sbUJBQVcsS0FBSyxHQUFHO0FBQUEsSUFDM0IsU0FBUyxLQUFQO0FBQ0EsNEJBQWMsS0FBSyxNQUFNLEdBQUcsT0FBTyxFQUFFLFNBQVMsSUFBTSxDQUFDO0FBQUEsSUFDdkQ7QUFBQSxFQUNGLENBQUM7OztBQ3pCRCxNQUFPQyxpQkFBUTtBQUFBOzs7QUNBZixNQUFPLG9CQUFRO0FBQUE7QUFBQSxJQUViLEtBQUssUUFBUTtBQUNYLGFBQU87QUFBQSxRQUNMO0FBQUEsUUFDQTtBQUFBLFVBQ0UsVUFBVTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxVQVNWLE9BQU87QUFDTCxtQkFBTztBQUFBLGNBQ0wsT0FBTztBQUFBLGNBQ1AsU0FBUztBQUFBLGdCQUNQO0FBQUEsa0JBQ0UsT0FBTztBQUFBLGtCQUNQLE9BQU87QUFBQSxnQkFDVDtBQUFBLGdCQUNBO0FBQUEsa0JBQ0UsT0FBTztBQUFBLGtCQUNQLE9BQU87QUFBQSxnQkFDVDtBQUFBLGdCQUNBO0FBQUEsa0JBQ0UsT0FBTztBQUFBLGtCQUNQLE9BQU87QUFBQSxnQkFDVDtBQUFBLGNBQ0Y7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7OztBQ3JDQSxNQUFPQyxpQkFBUTtBQUFBOzs7QUNHZixrQkFBUSxVQUFVQyxjQUFPO0FBRXpCLE1BQU8sb0NBQVE7QUFBQTtBQUFBLElBRWIsS0FBSyxRQUFRO0FBQ1gsYUFBTztBQUFBLFFBQ0w7QUFBQSxRQUNBO0FBQUEsVUFDRSxVQUFVO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxVQWNWLE9BQU87QUFDTCxtQkFBTztBQUFBLGNBQ0wsWUFBWTtBQUFBLGNBQ1osb0JBQW9CO0FBQUEsWUFDdEI7QUFBQSxVQUNGO0FBQUEsVUFDQSxTQUFTO0FBQUEsWUFDUCxZQUFZLGFBQUs7QUFBQSxVQUNuQjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7OztBQ3JDQSxNQUFPLHdCQUFRO0FBQUE7QUFBQSxJQUViLEtBQUssUUFBUTtBQUNYLGFBQU87QUFBQSxRQUNMO0FBQUEsUUFDQTtBQUFBLFVBQ0UsVUFBVTtBQUFBLFFBQ1o7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7OztBQ1ZBLE1BQU8scUJBQVE7QUFBQTtBQUFBLElBRWIsS0FBSyxRQUFRO0FBQ1gsYUFBTztBQUFBLFFBQ0w7QUFBQSxRQUNBO0FBQUEsVUFDRSxVQUFVO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxVQUtWLE9BQU87QUFDTCxtQkFBTztBQUFBLGNBQ0wsWUFBWTtBQUFBLGdCQUNWO0FBQUEsa0JBQ0UsTUFBTTtBQUFBLGtCQUNOLEtBQUs7QUFBQSxrQkFDTCxNQUFNO0FBQUEsb0JBQ0osU0FBUztBQUFBLG9CQUNULElBQUk7QUFBQSxrQkFDTjtBQUFBLGtCQUNBLGFBQWE7QUFBQSxvQkFDWCxTQUFTO0FBQUEsb0JBQ1QsSUFBSTtBQUFBLGtCQUNOO0FBQUEsa0JBQ0EsVUFBVTtBQUFBLG9CQUNSO0FBQUEsc0JBQ0UsTUFBTTtBQUFBLHNCQUNOLE9BQU87QUFBQSxvQkFDVDtBQUFBLG9CQUNBO0FBQUEsc0JBQ0UsTUFBTTtBQUFBLHNCQUNOLE9BQU87QUFBQSxvQkFDVDtBQUFBLGtCQUNGO0FBQUEsa0JBQ0EsU0FBUztBQUFBLG9CQUNQO0FBQUEsc0JBQ0UsSUFBSTtBQUFBLHNCQUNKLE1BQU07QUFBQSxzQkFDTixPQUFPO0FBQUEsb0JBQ1Q7QUFBQSxvQkFDQTtBQUFBLHNCQUNFLElBQUk7QUFBQSxzQkFDSixNQUFNO0FBQUEsc0JBQ04sT0FBTztBQUFBLG9CQUNUO0FBQUEsa0JBQ0Y7QUFBQSxrQkFDQSxTQUFTO0FBQUEsa0JBQ1QsUUFBUTtBQUFBLGtCQUNSLFdBQVc7QUFBQSxnQkFDYjtBQUFBLGNBQ0Y7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7OztBQ3BEQSxNQUFPLGdCQUFRO0FBQUE7QUFBQSxJQUViLEtBQUssUUFBUTtBQUNYLHdCQUFTLEtBQUssTUFBTTtBQUNwQix3Q0FBd0IsS0FBSyxNQUFNO0FBQ25DLDRCQUFhLEtBQUssTUFBTTtBQUN4Qix5QkFBVSxLQUFLLE1BQU07QUFBQSxJQUN2QjtBQUFBLEVBQ0Y7OztBQ2JBLE1BQU9DLGlCQUFRO0FBQUE7OztBQ01mLGtCQUFRLFVBQVVDLGNBQU87QUFFekIsTUFBTywrQkFBUTtBQUFBO0FBQUEsSUFFYixLQUFLLFFBQVE7QUFDWCxhQUFPO0FBQUEsUUFDTDtBQUFBLFFBQ0E7QUFBQSxVQUNFLFVBQVU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFVBa0RWLE9BQU8sQ0FBQyxXQUFXO0FBQUEsVUFDbkIsT0FBTztBQUNMLG1CQUFPO0FBQUEsY0FDTCxpQkFBaUI7QUFBQSxZQUNuQjtBQUFBLFVBQ0Y7QUFBQSxVQUNBLFNBQVM7QUFBQSxZQUNQO0FBQUEsWUFDQSxZQUFZLGFBQUs7QUFBQSxZQUNqQixxQkFBcUI7QUFDbkIsa0JBQUksS0FBSyxVQUFVLFdBQVc7QUFBQSxjQUU5QixPQUFPO0FBQUEsY0FFUDtBQUFBLFlBQ0Y7QUFBQSxZQUNBLFNBQVM7QUFDUCxtQkFBSztBQUNMLGtCQUFJLEtBQUssa0JBQWtCO0FBQUcscUJBQUssa0JBQWtCLEtBQUssVUFBVSxTQUFTLFNBQVM7QUFBQSxZQUN4RjtBQUFBLFlBQ0EsWUFBWTtBQUNWLG1CQUFLO0FBQ0wsa0JBQUksS0FBSyxtQkFBbUIsS0FBSyxVQUFVLFNBQVM7QUFBUSxxQkFBSyxrQkFBa0I7QUFBQSxZQUNyRjtBQUFBLFlBQ0EsWUFBWSxXQUFXO0FBQ3JCLDZCQUFPLEtBQUssS0FBSyxTQUFTO0FBQUEsWUFDNUI7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjs7O0FDNUZBLE1BQU9DLHNCQUFRO0FBQUE7QUFBQSxJQUViLEtBQUssUUFBUTtBQUNYLHdDQUF3QixLQUFLLE1BQU07QUFDbkMsbUNBQW1CLEtBQUssTUFBTTtBQUFBLElBQ2hDO0FBQUEsRUFDRjs7O0FDTkEsTUFBT0Msc0JBQVE7QUFBQTtBQUFBLElBRWIsS0FBSyxRQUFRO0FBQ1gsTUFBQUEsb0JBQVcsS0FBSyxNQUFNO0FBQ3RCLG9CQUFNLEtBQUssTUFBTTtBQUFBLElBQ25CO0FBQUEsRUFDRjs7O0FDQUEsa0JBQVEsVUFBVUMsY0FBTztBQUV6QjtBQUNFLFFBQUksU0FBUyxTQUFTLGNBQWMsUUFBUTtBQUM1QyxXQUFPLE1BQU07QUFDYixhQUFTLEtBQUssWUFBWSxNQUFNO0FBQUEsRUFDbEM7QUFFQSxjQUFJLE1BQU0sbURBQW1ELENBQUMsUUFBUTtBQUNwRSxrQkFBTTtBQUFBLE1BQ0osSUFBSSxjQUFjLGdEQUFnRDtBQUFBLE1BQ2xFLENBQUMsWUFBWTtBQUNYLGdCQUFRLGNBQWMsYUFBSyxPQUFPLFVBQVU7QUFBQSxNQUM5QztBQUFBLElBQ0Y7QUFFQSxrQkFBTTtBQUFBLE1BQ0osSUFBSSxjQUFjLG1EQUFtRDtBQUFBLE1BQ3JFO0FBQUEsSUFDRjtBQUFBLEVBQ0YsQ0FBQztBQUVELE1BQUksaUJBQWlCO0FBRXJCLE1BQU0sb0JBQW9CLGdCQUFRLGlCQUFpQixXQUFXLGFBQWEsUUFBUTtBQUNuRixNQUFNLGdCQUFnQixnQkFBUSxpQkFBaUIsVUFBVSxxQkFBcUI7QUFDOUUsTUFBTSxnQkFBZ0IsZ0JBQVEsaUJBQWlCLFdBQVcsWUFBWTtBQUN0RSxjQUFJLE1BQU0sOERBQThELENBQUMsUUFBUTtBQUMvRSxrQkFBTTtBQUFBLE1BQ0osSUFBSSxjQUFjLGtFQUFrRTtBQUFBLE1BQ3BGLENBQUMsYUFBYTtBQUNaLGlCQUFTLGNBQWMsYUFBSyxPQUFPLFVBQVU7QUFFN0MsWUFBSSxnQkFBZ0I7QUFjbEIsY0FBUyxjQUFULFNBQXFCLElBQUksTUFBTSxnQkFBZ0IsSUFBSTtBQUNqRCxnQkFBSUMsT0FBTSxZQUFJLE1BQU0sdUJBQXVCLHFDQUFxQyxpQkFBaUIsY0FBYyxRQUFRLGNBQWMsUUFBUSxjQUFjLFdBQVcsWUFBWTtBQUVsTCxvQkFBUSxLQUFLQSxJQUFHO0FBRWhCLFlBQUFBLEtBQUksY0FBYyxDQUFDLE1BQU07QUFDdkIsa0JBQUk7QUFBRyxnQkFBQUEsS0FBSSxVQUFVLElBQUksY0FBYyxVQUFVLFVBQVU7QUFBQTtBQUN0RCxnQkFBQUEsS0FBSSxVQUFVLE9BQU8sY0FBYyxVQUFVLFVBQVU7QUFBQSxZQUM5RDtBQUVBLFlBQUFBLEtBQUksWUFBWSxlQUFlLGdCQUFnQixFQUFFO0FBRWpELFlBQUFBLEtBQUksVUFBVSxNQUFNO0FBQ2xCLHNCQUFRLFFBQVEsQ0FBQyxNQUFNLEVBQUUsWUFBWSxLQUFLLENBQUM7QUFDM0MsY0FBQUEsS0FBSSxZQUFZLElBQUk7QUFDcEIsNkJBQWUsY0FBYztBQUFBLFlBQy9CO0FBQ0EsbUJBQU9BO0FBQUEsVUFDVDtBQS9CQSxjQUFJLFlBQVksWUFBSSxRQUFRLFVBQVUsQ0FBQyxFQUFFLElBQUk7QUFFN0Msb0JBQVU7QUFBQSxZQUNSLFlBQUksTUFBTSxlQUFlLGtCQUFrQixpQkFBaUI7QUFBQSxVQUM5RDtBQUVBLGdCQUFNLG1CQUFtQixZQUFJLE1BQU07QUFBQSx3QkFDbkIsY0FBYyxVQUFVLGNBQWM7QUFBQTtBQUFBLFNBRXJEO0FBRUQsY0FBSSxVQUFVLENBQUM7QUFzQmYsMkJBQWlCLFlBQVksWUFBWSxRQUFRLGFBQUssT0FBTyxNQUFNLENBQUMsQ0FBQztBQUNyRSwyQkFBaUIsWUFBWSxZQUFZLHdCQUF3QixhQUFLLE9BQU8sc0JBQXNCLENBQUMsQ0FBQztBQUNyRywyQkFBaUIsWUFBWSxZQUFZLFlBQVksYUFBSyxPQUFPLFVBQVUsQ0FBQyxDQUFDO0FBQzdFLDJCQUFpQixZQUFZLFlBQVksU0FBUyxhQUFLLE9BQU8saUJBQWlCLEdBQUcsa0JBQWtCLENBQUM7QUFFckcsb0JBQVUsWUFBWSxnQkFBZ0I7QUFBQSxRQUN4QztBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQ0Esa0JBQU07QUFBQSxNQUNKLElBQUksY0FBYyxnRUFBZ0U7QUFBQSxNQUNsRjtBQUFBLElBQ0Y7QUFBQSxFQUNGLENBQUM7QUFFRCxXQUFTLHdCQUF3QixRQUFRO0FBQ3ZDLFdBQU8sYUFBYSxXQUFXLGdCQUFnQjtBQUMvQyxXQUFPLGFBQWEsU0FBUyw0QkFBNEI7QUFDekQsV0FBTyxZQUFZO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQTBCckI7QUFHQSxHQUFDLFlBQVk7QUFDWCxVQUFNLFdBQUcsSUFBSSxNQUFNLEtBQUs7QUFFeEIsVUFBTSxhQUFhLFlBQUksTUFBTTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQWU1QjtBQUdELFVBQU0sU0FBUyxJQUFJLFVBQVU7QUFBQSxNQUMzQixPQUFPO0FBQ0wsZUFBTztBQUFBLFVBQ0wsYUFBYTtBQUFBLFFBQ2Y7QUFBQSxNQUNGO0FBQUEsTUFDQSxVQUFVO0FBQ1IseUJBQWlCO0FBQUEsTUFDbkI7QUFBQSxJQUNGLENBQUM7QUFFRCxlQUFHLElBQUksV0FBVyxLQUFLLE1BQU07QUFDN0IsSUFBQUMsb0JBQWMsS0FBSyxNQUFNO0FBQ3pCLFdBQU8sTUFBTSxVQUFVO0FBRXZCLGdCQUFJLE1BQU0sb0dBQW9HLENBQUMsUUFBUTtBQUVySCxVQUFJLGVBQWUsWUFBSSxRQUFRLEtBQUssQ0FBQyxFQUFFLElBQUk7QUFDM0MsbUJBQWEsZ0JBQWdCLFVBQVU7QUFBQSxJQUN6QyxDQUFDO0FBQUEsRUFDSCxHQUFHOzs7QUNuS0gsR0FBQyxZQUFZO0FBRVgsUUFBSTtBQUNKLFdBQU8sTUFBTTtBQUNYLGVBQVMsU0FBUyxjQUFjLDBCQUEwQjtBQUMxRCxVQUFJO0FBQVE7QUFDWixZQUFNLElBQUksUUFBUSxhQUFXLFdBQVcsU0FBUyxHQUFHLENBQUM7QUFBQSxJQUN2RDtBQUVBLFdBQU8sWUFBWTtBQUNuQixXQUFPLGFBQWEsV0FBVyxXQUFXO0FBQUEsRUFDNUMsR0FBRzs7O0FDUkgsU0FBTyxlQUFlLFFBQVEsU0FBUztBQUFBLElBQ3JDLE1BQU07QUFDSixhQUFPLFlBQUk7QUFBQSxJQUNiO0FBQUEsRUFDRixDQUFDO0FBQ0QsU0FBTyxTQUFTO0FBRWhCLEdBQUMsWUFBWTtBQUNYLDhCQUFpQixLQUFLO0FBQ3RCLFVBQU0sd0JBQXdCO0FBQzlCLDhCQUFpQixLQUFLO0FBQUEsRUFDeEIsR0FBRzsiLAogICJuYW1lcyI6IFsiZXZlbnQiLCAibWFrZSIsICJ0YXJnZXQiLCAidHJlZSIsICJzZWFyY2hGaWx0ZXIiLCAid2Fsa2FibGUiLCAiaWdub3JlIiwgImZvdW5kIiwgImNvbXBvbmVudHMiLCAiXyIsICJjaGVjayIsICJtb2R1bGVzIiwgInJlcXVpcmUiLCAiZm91bmQiLCAiZmluZGVyIiwgImZvdW5kIiwgInJlcSIsICJmaW5kZXIiLCAiY29tbW9uX2RlZmF1bHQiLCAiY29tbW9uX2RlZmF1bHQiLCAibm9TdG9yZSIsICJfIiwgIl8iLCAiXyIsICJ2YWwiLCAiZXJyb3IiLCAib3V0IiwgImNoZWNrIiwgIl8iLCAiQkFTRV9VUkwiLCAibmVzdHMiLCAib3V0IiwgIl8iLCAic291cmNlIiwgImFwaSIsICJjb21tb25fZGVmYXVsdCIsICJzZXQiLCAic2hvdyIsICJjb21tb25fZGVmYXVsdCIsICJvdXQiLCAiXyIsICJSZWFjdCIsICJjb21tb25fZGVmYXVsdCIsICJjb21tb25fZGVmYXVsdCIsICJSZWFjdCIsICJjb21tb25fZGVmYXVsdCIsICJpbnRlcmFjdGVkIiwgImdldENvbnRhaW5lciIsICJzaG93IiwgInN0eWxlX2RlZmF1bHQiLCAic3R5bGVfZGVmYXVsdCIsICJjb21wb25lbnRzX2RlZmF1bHQiLCAiY29tcG9uZW50c19kZWZhdWx0IiwgImFwaSIsICJzdHlsZV9kZWZhdWx0IiwgInN0eWxlX2RlZmF1bHQiLCAic3R5bGVfZGVmYXVsdCIsICJzdHlsZV9kZWZhdWx0IiwgInN0eWxlX2RlZmF1bHQiLCAiY29tcG9uZW50c19kZWZhdWx0IiwgImNvbXBvbmVudHNfZGVmYXVsdCIsICJzdHlsZV9kZWZhdWx0IiwgImVsbSIsICJjb21wb25lbnRzX2RlZmF1bHQiXQp9Cg==
