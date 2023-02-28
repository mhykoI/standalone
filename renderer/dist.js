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
  var style_default2 = `
[class*=acord--]{box-sizing:border-box}[class*=acord--] *{box-sizing:border-box}.acord--tabs-content-container{padding:32px 16px;display:flex;align-items:flex-start;justify-content:center;width:100%}.acord--tabs-content-container>.tab{width:100%}.acord--tabs-tab-button.store-tab-button{background-color:var(--status-positive-background);color:var(--status-positive-text)}.acord--tabs-tab-button.store-tab-button.selected{color:var(--text-positive);background-color:var(--background-modifier-selected)}`;

  // src/ui/home/vue-components/store-extension-card/style.scss
  var style_default3 = `
.acord--store-extension-card{width:275px;height:250px;display:flex;flex-direction:column;border-radius:4px;contain:content;background-color:rgba(0,0,0,.1);box-shadow:var(--elevation-medium)}.acord--store-extension-card>.preview{width:100%;height:100px;display:flex;flex-direction:column;justify-content:space-between;align-items:center;background-color:var(--brand-500);background-position:center;background-size:cover}.acord--store-extension-card>.preview>.controls{padding:8px;display:flex;align-items:center;justify-content:space-between;width:100%}.acord--store-extension-card>.preview>.controls .go{background-color:rgba(0,0,0,.5);box-shadow:0px 0px 4px rgba(0,0,0,.5);border-radius:50%;width:24px;height:24px;display:flex;align-items:center;justify-content:center;color:var(--header-primary);font-weight:600;cursor:pointer}.acord--store-extension-card>.preview>.name-container{display:flex;align-items:center;justify-content:center;color:var(--header-primary);padding:8px}.acord--store-extension-card>.preview>.name-container>.name{font-size:14px;background-color:rgba(0,0,0,.5);box-shadow:0px 0px 4px rgba(0,0,0,.5);border-radius:9999px;padding:4px 8px}.acord--store-extension-card>.info-container{display:flex;justify-content:space-between;flex-direction:column;padding:8px;height:150px;width:100%}.acord--store-extension-card>.info-container>.top{display:flex;flex-direction:column;gap:4px;height:100%}.acord--store-extension-card>.info-container>.top>.name-container{display:flex;align-items:center;gap:4px;width:100%}.acord--store-extension-card>.info-container>.top>.name-container>.name{font-size:16px;font-weight:500;color:var(--header-primary)}.acord--store-extension-card>.info-container>.top>.name-container>.version{font-size:12px;font-weight:500;color:var(--header-primary);opacity:.5}.acord--store-extension-card>.info-container>.top>.description{font-size:14px;font-weight:300;color:var(--header-primary);opacity:.75;width:100%}.acord--store-extension-card>.info-container>.bottom{display:flex;align-items:flex-start;justify-content:space-between;height:100%}.acord--store-extension-card>.info-container>.bottom>.left{height:100%;display:flex;flex-direction:column;align-items:flex-start;justify-content:flex-end}.acord--store-extension-card>.info-container>.bottom>.left>.authors{display:flex;flex-direction:column;gap:4px}.acord--store-extension-card>.info-container>.bottom>.left>.authors .author{display:flex;align-items:center;border-radius:9999px;background-color:rgba(0,0,0,.1);cursor:pointer}.acord--store-extension-card>.info-container>.bottom>.left>.authors .author>.image{border-radius:50%;width:18px;height:18px;background-color:var(--brand-500);background-position:center;background-size:cover}.acord--store-extension-card>.info-container>.bottom>.left>.authors .author>.name{font-size:10px;font-weight:400;color:var(--header-primary);opacity:.75;padding:6px}.acord--store-extension-card>.info-container>.bottom>.right{height:100%;display:flex;flex-direction:column;align-items:flex-end;justify-content:flex-end}`;

  // src/ui/home/vue-components/store-extension-card/index.js
  patcher_default.injectCSS(style_default3);
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

  // src/ui/home/vue-components/pages/home-page.js
  var home_page_default = {
    /** @param {import("vue").App} vueApp */
    load(vueApp) {
      vueApp.component(
        "home-page",
        {
          template: "<div>Home Page</div>"
        }
      );
    }
  };

  // src/ui/home/vue-components/pages/installed-extensions-page.js
  var installed_extensions_page_default = {
    /** @param {import("vue").App} vueApp */
    load(vueApp) {
      vueApp.component(
        "installed-extensions-page",
        {
          template: "<div>Installed Extensions Page</div>"
        }
      );
    }
  };

  // src/ui/home/vue-components/pages/settings-page.js
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

  // src/ui/home/vue-components/pages/store-page.js
  var store_page_default = {
    /** @param {import("vue").App} vueApp */
    load(vueApp) {
      console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAA");
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

  // src/ui/home/vue-components/pages/index.js
  var pages_default = {
    /** @param {import("vue").App} vueApp */
    load(vueApp) {
      home_page_default.load(vueApp);
      installed_extensions_page_default.load(vueApp);
      settings_page_default.load(vueApp);
      store_page_default.load(vueApp);
    }
  };

  // src/ui/home/vue-components/discord-button/index.js
  var discord_button_default = {
    /** @param {import("vue").App} vueApp */
    load(vueApp) {
      const buttonClasses = webpack_default.findByProperties("lowSaturationUnderline", "button", "disabledButtonOverlay");
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

  // src/ui/home/vue-components/installed-extension-card/style.scss
  var style_default4 = `
`;

  // src/ui/home/vue-components/installed-extension-card/index.js
  patcher_default.injectCSS(style_default4);
  var installed_extension_card_default = {
    /** @param {import("vue").App} vueApp */
    load(vueApp) {
      vueApp.component(
        "installed-extension-card",
        {}
      );
    }
  };

  // src/ui/home/vue-components/index.js
  var vue_components_default = {
    /** @param {import("vue").App} vueApp */
    load(vueApp) {
      installed_extension_card_default.load(vueApp);
      discord_button_default.load(vueApp);
      store_extension_card_default.load(vueApp);
      pages_default.load(vueApp);
    }
  };

  // src/ui/home/index.js
  patcher_default.injectCSS(style_default2);
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
    while (true) {
      if (window.Vue)
        break;
      await utils_default.sleep(100);
    }
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
    vue_components_default.load(vueApp);
    vueApp.mount(baseVueElm);
    dom_default.patch('[class*="applicationStore-"] [class*="scrollerBase-"] [class*="subscriptionsRedirectContainer-"]', (elm) => {
      let containerElm = dom_default.parents(elm, 4).pop();
      containerElm.replaceChildren(baseVueElm);
    });
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibm9kZV9tb2R1bGVzL25lc3RzL2Nqcy9FdmVudHMuanMiLCAibm9kZV9tb2R1bGVzL25lc3RzL2Nqcy9FdmVudEVtaXR0ZXIuanMiLCAibm9kZV9tb2R1bGVzL25lc3RzL2Nqcy9tYWtlLmpzIiwgIm5vZGVfbW9kdWxlcy9uZXN0cy9janMvaW5kZXguanMiLCAic3JjL2RhdGEvY29tbW9uLmpzb24iLCAic3JjL2FwaS91dGlscy9yYXcvZmluZC1pbi10cmVlLmpzIiwgInNyYy9hcGkvdXRpbHMvbG9nZ2VyLmpzIiwgInNyYy9hcGkvdXRpbHMvcmVhY3QuanMiLCAic3JjL2FwaS91dGlscy9pbmRleC5qcyIsICJzcmMvYXBpL21vZHVsZXMvcmF3L2NvbXBsZXgtZmluZGVyLmpzIiwgInNyYy9hcGkvbW9kdWxlcy93ZWJwYWNrLmpzIiwgInNyYy9hcGkvbW9kdWxlcy9jb21tb24uanMiLCAic3JjL2FwaS9tb2R1bGVzL2luZGV4LmpzIiwgInNyYy9hcGkvaTE4bi9pbmRleC5qcyIsICJzcmMvb3RoZXIvdXRpbHMuanMiLCAic3JjL2xpYi9CYXNpY0V2ZW50RW1pdHRlci5qcyIsICJzcmMvYXBpL2V2ZW50cy9pbmRleC5qcyIsICJzcmMvYXBpL2RvbS9pbmRleC5qcyIsICJzcmMvbGliL3NwaXRyb2FzdC9kaXN0L2VzbS9zaGFyZWQuanMiLCAic3JjL2xpYi9zcGl0cm9hc3QvZGlzdC9lc20vaG9vay5qcyIsICJzcmMvbGliL3NwaXRyb2FzdC9kaXN0L2VzbS91bi1wYXRjaC5qcyIsICJzcmMvbGliL3NwaXRyb2FzdC9kaXN0L2VzbS9nZXQtcGF0Y2gtZnVuYy5qcyIsICJzcmMvbGliL3NwaXRyb2FzdC9kaXN0L2VzbS9pbmRleC5qcyIsICJzcmMvYXBpL3BhdGNoZXIvaW5kZXguanMiLCAic3JjL290aGVyL2xvYWRpbmctYW5pbWF0aW9uL3N0eWxlLnNjc3MiLCAic3JjL290aGVyL2xvYWRpbmctYW5pbWF0aW9uL2luZGV4LmpzIiwgInNyYy9hcGkvZGV2L2luZGV4LmpzIiwgInNyYy9hcGkvc3RvcmFnZS9pbmRleC5qcyIsICJub2RlX21vZHVsZXMvaWRiLWtleXZhbC9kaXN0L2luZGV4LmpzIiwgInNyYy9saWIvanNvbi1kZWN5Y2xlZC9pbmRleC5qcyIsICJzcmMvYXBpL2V4dGVuc2lvbnMvaTE4bi5qcyIsICJzcmMvYXBpL2V4dGVuc2lvbnMvaW5kZXguanMiLCAic3JjL2FwaS9pbnRlcm5hbC9pbmRleC5qcyIsICJzcmMvYXBpL3dlYnNvY2tldC9pbmRleC5qcyIsICJzcmMvYXBpL3VpL3N0eWxlcy5zY3NzIiwgInNyYy9hcGkvdWkvdG9vbHRpcHMuanMiLCAic3JjL2FwaS91aS9ub3RpZmljYXRpb25zLmpzIiwgInNyYy9hcGkvdWkvY29udGV4dE1lbnVzLmpzIiwgInNyYy9saWIvY29tcG9uZW50cy9FcnJvckJvdW5kYXJ5LmpzeCIsICJzcmMvYXBpL3VpL2NvbXBvbmVudHMuanMiLCAic3JjL2FwaS91aS9tb2RhbHMuanN4IiwgInNyYy9hcGkvdWkvdG9hc3RzLmpzIiwgInNyYy9hcGkvdWkvaW5kZXguanMiLCAic3JjL2FwaS9pbmRleC5qcyIsICJzcmMvb3RoZXIvd2Vic29ja2V0LXRyaWdnZXJzLmpzIiwgInNyYy91aS9ob21lL3N0eWxlLnNjc3MiLCAic3JjL3VpL2hvbWUvdnVlLWNvbXBvbmVudHMvc3RvcmUtZXh0ZW5zaW9uLWNhcmQvc3R5bGUuc2NzcyIsICJzcmMvdWkvaG9tZS92dWUtY29tcG9uZW50cy9zdG9yZS1leHRlbnNpb24tY2FyZC9pbmRleC5qcyIsICJzcmMvdWkvaG9tZS92dWUtY29tcG9uZW50cy9wYWdlcy9ob21lLXBhZ2UuanMiLCAic3JjL3VpL2hvbWUvdnVlLWNvbXBvbmVudHMvcGFnZXMvaW5zdGFsbGVkLWV4dGVuc2lvbnMtcGFnZS5qcyIsICJzcmMvdWkvaG9tZS92dWUtY29tcG9uZW50cy9wYWdlcy9zZXR0aW5ncy1wYWdlLmpzIiwgInNyYy91aS9ob21lL3Z1ZS1jb21wb25lbnRzL3BhZ2VzL3N0b3JlLXBhZ2UuanMiLCAic3JjL3VpL2hvbWUvdnVlLWNvbXBvbmVudHMvcGFnZXMvaW5kZXguanMiLCAic3JjL3VpL2hvbWUvdnVlLWNvbXBvbmVudHMvZGlzY29yZC1idXR0b24vaW5kZXguanMiLCAic3JjL3VpL2hvbWUvdnVlLWNvbXBvbmVudHMvaW5zdGFsbGVkLWV4dGVuc2lvbi1jYXJkL3N0eWxlLnNjc3MiLCAic3JjL3VpL2hvbWUvdnVlLWNvbXBvbmVudHMvaW5zdGFsbGVkLWV4dGVuc2lvbi1jYXJkL2luZGV4LmpzIiwgInNyYy91aS9ob21lL3Z1ZS1jb21wb25lbnRzL2luZGV4LmpzIiwgInNyYy91aS9ob21lL2luZGV4LmpzIiwgInNyYy9pbmRleC5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5kZWZhdWx0ID0gT2JqZWN0LmZyZWV6ZSh7XHJcbiAgICBHRVQ6IFwiR0VUXCIsXHJcbiAgICBTRVQ6IFwiU0VUXCIsXHJcbiAgICBERUxFVEU6IFwiREVMRVRFXCIsXHJcbiAgICBVUERBVEU6IFwiVVBEQVRFXCIsXHJcbn0pO1xyXG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgRXZlbnRzXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vRXZlbnRzXCIpKTtcclxuY2xhc3MgRXZlbnRFbWl0dGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMubGlzdGVuZXJzID0gT2JqZWN0LnZhbHVlcyhFdmVudHNfMS5kZWZhdWx0KS5yZWR1Y2UoKGFjYywgdmFsKSA9PiAoKGFjY1t2YWxdID0gbmV3IFNldCgpKSwgYWNjKSwge30pO1xyXG4gICAgICAgIHRoaXMub24gPSBmdW5jdGlvbiAoZXZlbnQsIGxpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxpc3RlbmVyc1tldmVudF0uaGFzKGxpc3RlbmVyKSkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoYFRoaXMgbGlzdGVuZXIgb24gJHtldmVudH0gYWxyZWFkeSBleGlzdHMuYCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5saXN0ZW5lcnNbZXZlbnRdLmFkZChsaXN0ZW5lcik7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLm9uY2UgPSBmdW5jdGlvbiAoZXZlbnQsIGxpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG9uY2VMaXN0ZW5lciA9IChldmVudCwgZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vZmYoZXZlbnQsIG9uY2VMaXN0ZW5lcik7XHJcbiAgICAgICAgICAgICAgICBsaXN0ZW5lcihldmVudCwgZGF0YSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMub24oZXZlbnQsIG9uY2VMaXN0ZW5lcik7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLm9mZiA9IGZ1bmN0aW9uIChldmVudCwgbGlzdGVuZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5saXN0ZW5lcnNbZXZlbnRdLmRlbGV0ZShsaXN0ZW5lcik7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmVtaXQgPSBmdW5jdGlvbiAoZXZlbnQsIGRhdGEpIHtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBsaXN0ZW5lciBvZiB0aGlzLmxpc3RlbmVyc1tldmVudF0pIHtcclxuICAgICAgICAgICAgICAgIGxpc3RlbmVyKGV2ZW50LCBkYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgZm9yIChjb25zdCBldmVudCBvZiBPYmplY3QudmFsdWVzKEV2ZW50c18xLmRlZmF1bHQpKSB7XHJcbiAgICAgICAgICAgIHRoaXNbZXZlbnQudG9Mb3dlckNhc2UoKV0gPSAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KGV2ZW50LCBkYXRhKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5kZWZhdWx0ID0gRXZlbnRFbWl0dGVyO1xyXG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgRXZlbnRFbWl0dGVyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vRXZlbnRFbWl0dGVyXCIpKTtcclxuZnVuY3Rpb24gbWFrZShcclxuLy8gVGhpcyBjYW4gYmUgc2FmZWx5IGlnbm9yZWQsIHRoZSBEYXRhIHdpbGwgYWx3YXlzIGJlIGFuIG9iamVjdCBvciBpdCB3b24ndCB3b3JrIGFueXdheS5cclxuLy8gQHRzLWlnbm9yZVxyXG5kYXRhID0ge30sIHsgbmVzdEFycmF5cyA9IHRydWUsIH0gPSB7fSkge1xyXG4gICAgY29uc3QgZW1pdHRlciA9IG5ldyBFdmVudEVtaXR0ZXJfMS5kZWZhdWx0KCk7XHJcbiAgICBmdW5jdGlvbiBjcmVhdGVQcm94eSh0YXJnZXQsIHJvb3QsIHBhdGgpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb3h5KHRhcmdldCwge1xyXG4gICAgICAgICAgICBnZXQodGFyZ2V0LCBwcm9wZXJ0eSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbmV3UGF0aCA9IFsuLi5wYXRoLCBwcm9wZXJ0eV07XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHRhcmdldFtwcm9wZXJ0eV07XHJcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVtaXR0ZXIuZ2V0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogbmV3UGF0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUsXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFuZXN0QXJyYXlzICYmIEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY3JlYXRlUHJveHkodmFsdWUsIHJvb3QsIG5ld1BhdGgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY3JlYXRlUHJveHkoKHRhcmdldFtwcm9wZXJ0eV0gPSB7fSksIHJvb3QsIG5ld1BhdGgpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQodGFyZ2V0LCBwcm9wZXJ0eSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHRhcmdldFtwcm9wZXJ0eV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIGVtaXR0ZXIuc2V0KHtcclxuICAgICAgICAgICAgICAgICAgICBwYXRoOiBbLi4ucGF0aCwgcHJvcGVydHldLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvLyBUaGlzIG5lZWRzIHRvIHJldHVybiB0cnVlIG9yIGl0IGVycm9ycy4gL3NocnVnXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGVsZXRlUHJvcGVydHkodGFyZ2V0LCBwcm9wZXJ0eSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRlbGV0ZSB0YXJnZXRbcHJvcGVydHldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZW1pdHRlci5kZWxldGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRoOiBbLi4ucGF0aCwgcHJvcGVydHldLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBoYXModGFyZ2V0LCBwcm9wZXJ0eSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0YXJnZXRbcHJvcGVydHldID09PSBcIm9iamVjdFwiICYmXHJcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmtleXModGFyZ2V0W3Byb3BlcnR5XSkubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb3BlcnR5IGluIHRhcmdldDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHsgc3RvcmU6IGNyZWF0ZVByb3h5KGRhdGEsIGRhdGEsIFtdKSwgXHJcbiAgICAgICAgLy8gVGhpcyBjYW4gYmUgc2FmZWx5IGlnbm9yZWQsIHRoZSBEYXRhIHdpbGwgYWx3YXlzIGJlIGFuIG9iamVjdCBvciBpdCB3b24ndCB3b3JrIGFueXdheS5cclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgZ2hvc3Q6IGRhdGEgfSwgZW1pdHRlcik7XHJcbn1cclxuZXhwb3J0cy5kZWZhdWx0ID0gbWFrZTtcclxuIiwgIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMubWFrZSA9IGV4cG9ydHMuRXZlbnRzID0gdm9pZCAwO1xyXG52YXIgRXZlbnRzXzEgPSByZXF1aXJlKFwiLi9FdmVudHNcIik7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkV2ZW50c1wiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gX19pbXBvcnREZWZhdWx0KEV2ZW50c18xKS5kZWZhdWx0OyB9IH0pO1xyXG52YXIgbWFrZV8xID0gcmVxdWlyZShcIi4vbWFrZVwiKTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwibWFrZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gX19pbXBvcnREZWZhdWx0KG1ha2VfMSkuZGVmYXVsdDsgfSB9KTtcclxuIiwgIntcclxuICBcImNvbW1vblwiOiB7XHJcbiAgICBcIm1vZGFsc1wiOiB7XHJcbiAgICAgIFwiY29tcG9uZW50c1wiOiB7XHJcbiAgICAgICAgXCJvdGhlclwiOiB7XHJcbiAgICAgICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICBcIkhlYWRlclwiLFxyXG4gICAgICAgICAgICAgICAgXCJGb290ZXJcIlxyXG4gICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIlJvb3RcIjoge1xyXG4gICAgICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICAgICAgXCJpblwiOiBcInN0cmluZ3NcIixcclxuICAgICAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgXCJFTlRFUklOR1wiXHJcbiAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIFwiYWN0aW9uc1wiOiB7XHJcbiAgICAgICAgXCJvcGVuXCI6IHtcclxuICAgICAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgICAgIFwiaW5cIjogXCJzdHJpbmdzXCIsXHJcbiAgICAgICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgIFwib25DbG9zZUNhbGxiYWNrXCIsXHJcbiAgICAgICAgICAgICAgICBcIkxheWVyXCJcclxuICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgICAgICBcImJlZm9yZVwiOiBbXHJcbiAgICAgICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgICAgIFwib3BlblwiXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBcIm1hcFwiOiB7XHJcbiAgICAgICAgICAgIFwib3BlblwiOiBbXHJcbiAgICAgICAgICAgICAgXCJvbkNsb3NlQ2FsbGJhY2tcIixcclxuICAgICAgICAgICAgICBcIkxheWVyXCJcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJjbG9zZVwiOiB7XHJcbiAgICAgICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgICAgICBcImluXCI6IFwic3RyaW5nc1wiLFxyXG4gICAgICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICBcIm9uQ2xvc2VDYWxsYmFjaygpXCJcclxuICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgICAgICBcImJlZm9yZVwiOiBbXHJcbiAgICAgICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgICAgIFwiY2xvc2VcIlxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgXCJtYXBcIjoge1xyXG4gICAgICAgICAgICBcImNsb3NlXCI6IFtcclxuICAgICAgICAgICAgICBcIm9uQ2xvc2VDYWxsYmFjaygpXCJcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiY29tcG9uZW50c1wiOiB7XHJcbiAgICAgIFwiQnV0dG9uXCI6IHtcclxuICAgICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICBcIkJvcmRlckNvbG9yc1wiXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgICBcImJlZm9yZVwiOiBbXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgICAgXSxcclxuICAgICAgICAgIFwiYWZ0ZXJcIjogXCJCdXR0b25cIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJtYXBcIjoge1xyXG4gICAgICAgICAgXCJCdXR0b25cIjogW1xyXG4gICAgICAgICAgICBcIi5GSUxMRURcIixcclxuICAgICAgICAgICAgXCIub25Nb3VzZUxlYXZlXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIFwiQ29uZmlybWF0aW9uTW9kYWxcIjoge1xyXG4gICAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICAgIFwiaW5cIjogXCJzdHJpbmdzXCIsXHJcbiAgICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgIFwiLmNvbmZpcm1CdXR0b25Db2xvclwiXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgICBcImJlZm9yZVwiOiBbXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgXCJUZXh0XCI6IHtcclxuICAgICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgICAgXCJmaWx0ZXJcIjogXCIkPy5TaXplcz8uU0laRV8zMiAmJiAkLkNvbG9yc1wiLFxyXG4gICAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgICBcImJlZm9yZVwiOiBbXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgXCJUb29sdGlwXCI6IHtcclxuICAgICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgICBcImluXCI6IFwicHJvdG90eXBlc1wiLFxyXG4gICAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICBcInJlbmRlclRvb2x0aXBcIlxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgICAgXCJiZWZvcmVcIjogW1xyXG4gICAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIFwiTWFya2Rvd25cIjoge1xyXG4gICAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgICBcImZpbHRlclwiOiBcIiQ/LnByb3RvdHlwZT8ucmVuZGVyICYmICQucnVsZXNcIixcclxuICAgICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiRmx1eERpc3BhdGNoZXJcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcIl9jdXJyZW50RGlzcGF0Y2hBY3Rpb25UeXBlXCIsXHJcbiAgICAgICAgICAgIFwiZGlzcGF0Y2hcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiUmVhY3RcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcImNyZWF0ZUVsZW1lbnRcIixcclxuICAgICAgICAgICAgXCJ1c2VTdGF0ZVwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJSZXN0XCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJnZXRcIixcclxuICAgICAgICAgICAgXCJwb3N0XCIsXHJcbiAgICAgICAgICAgIFwiZ2V0QVBJQmFzZVVSTFwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJGbHV4XCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJjb25uZWN0U3RvcmVzXCIsXHJcbiAgICAgICAgICAgIFwiZGVzdHJveVwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJXZWJTb2NrZXRcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IFwiJD8uX19wcm90b19fPy5oYW5kbGVDb25uZWN0aW9uXCIsXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJiZWZvcmVcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJBY3Rpdml0eUFjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcInNlbmRBY3Rpdml0eUludml0ZVwiLFxyXG4gICAgICAgICAgICBcInVwZGF0ZUFjdGl2aXR5XCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIlByaXZhdGVDaGFubmVsQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwib3BlblByaXZhdGVDaGFubmVsXCIsXHJcbiAgICAgICAgICAgIFwiZW5zdXJlUHJpdmF0ZUNoYW5uZWxcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiQWNrQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiaW5cIjogXCJzdHJpbmdzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwidHlwZTpcXFwiQlVMS19BQ0tcXFwiXCJcclxuICAgICAgICAgIF0sXHJcbiAgICAgICAgICBbXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiB0cnVlLFxyXG4gICAgICAgIFwiYmVmb3JlXCI6IFwiZXhwb3J0c1wiXHJcbiAgICAgIH0sXHJcbiAgICAgIFwibWFwXCI6IHtcclxuICAgICAgICBcImFja1wiOiBbXHJcbiAgICAgICAgICBcInR5cGU6XFxcIkNIQU5ORUxfQUNLXFxcIlwiLFxyXG4gICAgICAgICAgXCJtZXNzYWdlSWRcIixcclxuICAgICAgICAgIFwiY2hhbm5lbElkXCJcclxuICAgICAgICBdLFxyXG4gICAgICAgIFwiYnVsa0Fja1wiOiBbXHJcbiAgICAgICAgICBcInR5cGU6XFxcIkJVTEtfQUNLXFxcIlwiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJBbmFseXRpY3NBY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJpc1Rocm90dGxlZFwiLFxyXG4gICAgICAgICAgICBcInRyYWNrXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIkFuaW1hdGlvbkFjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJzcHJpbmdcIixcclxuICAgICAgICAgICAgXCJkZWNheVwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJDb25uZWN0aW9uQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwic2V0U2hvd0FjdGl2aXR5XCIsXHJcbiAgICAgICAgICAgIFwic2V0VmlzaWJpbGl0eVwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJSVENDb25uZWN0aW9uQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwiZ2V0Q2hhbm5lbElkXCIsXHJcbiAgICAgICAgICAgIFwiZ2V0R3VpbGRJZFwiLFxyXG4gICAgICAgICAgICBcImdldFJUQ0Nvbm5lY3Rpb25JZFwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJFbW9qaUFjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcInRyYW5zbGF0ZUlubGluZUVtb2ppVG9TdXJyb2dhdGVzXCIsXHJcbiAgICAgICAgICAgIFwidHJhbnNsYXRlU3Vycm9nYXRlc1RvSW5saW5lRW1vamlcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiRW1vamlTdGF0ZUFjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcImdldFVSTFwiLFxyXG4gICAgICAgICAgICBcImlzRW1vamlEaXNhYmxlZFwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJHdWlsZE5vdGlmaWNhdGlvbnNBY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJ1cGRhdGVDaGFubmVsT3ZlcnJpZGVTZXR0aW5nc1wiLFxyXG4gICAgICAgICAgICBcInVwZGF0ZUd1aWxkTm90aWZpY2F0aW9uU2V0dGluZ3NcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiSW50ZXJuYWxSZWFjdFwiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwianN4XCIsXHJcbiAgICAgICAgICAgIFwianN4c1wiLFxyXG4gICAgICAgICAgICBcIkZyYWdtZW50XCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIkxvZ2luQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwibG9naW5cIixcclxuICAgICAgICAgICAgXCJsb2dvdXRcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiUXVlcnlBY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJxdWVyeUVtb2ppUmVzdWx0c1wiLFxyXG4gICAgICAgICAgICBcInF1ZXJ5RnJpZW5kc1wiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJNZXNzYWdlQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwicmVjZWl2ZU1lc3NhZ2VcIixcclxuICAgICAgICAgICAgXCJzZW5kTWVzc2FnZVwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJQcmVtaXVtQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwiaXNQcmVtaXVtXCIsXHJcbiAgICAgICAgICAgIFwiY2FuVXNlRW1vamlzRXZlcnl3aGVyZVwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJWb2ljZUFjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcInNlbGVjdFZvaWNlQ2hhbm5lbFwiLFxyXG4gICAgICAgICAgICBcImRpc2Nvbm5lY3RcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiVHlwaW5nQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwic3RhcnRUeXBpbmdcIixcclxuICAgICAgICAgICAgXCJzdG9wVHlwaW5nXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIkd1aWxkQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwic2V0Q2hhbm5lbFwiLFxyXG4gICAgICAgICAgICBcInNldFNlcnZlck11dGVcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiSW52aXRlQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwiYWNjZXB0SW52aXRlXCIsXHJcbiAgICAgICAgICAgIFwiYWNjZXB0SW52aXRlQW5kVHJhbnNpdGlvblRvSW52aXRlQ2hhbm5lbFwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJNZWRpYUVuZ2luZUFjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcInRvZ2dsZVNlbGZEZWFmXCIsXHJcbiAgICAgICAgICAgIFwidG9nZ2xlU2VsZk11dGVcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiaTE4blwiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwiX3JlcXVlc3RlZExvY2FsZVwiLFxyXG4gICAgICAgICAgICBcImdldERlZmF1bHRMb2NhbGVcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwidXVpZFwiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwidjFcIixcclxuICAgICAgICAgICAgXCJ2NFwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJobGpzXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJoaWdobGlnaHRBbGxcIixcclxuICAgICAgICAgICAgXCJoaWdobGlnaHRcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufSIsICJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBmaW5kSW5UcmVlKFxyXG4gIHRyZWUsXHJcbiAgc2VhcmNoRmlsdGVyLFxyXG4gIHsgd2Fsa2FibGUgPSBudWxsLCBpZ25vcmUgPSBbXSwgbGltaXQgPSAxMDAgfSA9IHt9XHJcbikge1xyXG4gIGxldCBpdGVyYXRpb24gPSAwO1xyXG5cclxuICBmdW5jdGlvbiBkb1NlYXJjaCh0cmVlLCBzZWFyY2hGaWx0ZXIsIHsgd2Fsa2FibGUgPSBudWxsLCBpZ25vcmUgPSBbXSB9ID0ge30pIHtcclxuICAgIGl0ZXJhdGlvbiArPSAxO1xyXG4gICAgaWYgKGl0ZXJhdGlvbiA+IGxpbWl0KSByZXR1cm47XHJcblxyXG4gICAgaWYgKHR5cGVvZiBzZWFyY2hGaWx0ZXIgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgaWYgKHRyZWUuaGFzT3duUHJvcGVydHkoc2VhcmNoRmlsdGVyKSkgcmV0dXJuIHRyZWVbc2VhcmNoRmlsdGVyXTtcclxuICAgIH0gZWxzZSBpZiAoc2VhcmNoRmlsdGVyKHRyZWUpKSByZXR1cm4gdHJlZTtcclxuXHJcbiAgICBpZiAoIXRyZWUpIHJldHVybjtcclxuXHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh0cmVlKSkge1xyXG4gICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgdHJlZSkge1xyXG4gICAgICAgIGNvbnN0IGZvdW5kID0gZG9TZWFyY2goaXRlbSwgc2VhcmNoRmlsdGVyLCB7IHdhbGthYmxlLCBpZ25vcmUgfSk7XHJcbiAgICAgICAgaWYgKGZvdW5kKSByZXR1cm4gZm91bmQ7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHRyZWUgPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXModHJlZSkpIHtcclxuICAgICAgICBpZiAod2Fsa2FibGUgIT0gbnVsbCAmJiAhd2Fsa2FibGUuaW5jbHVkZXMoa2V5KSkgY29udGludWU7XHJcblxyXG4gICAgICAgIGlmIChpZ25vcmUuaW5jbHVkZXMoa2V5KSkgY29udGludWU7XHJcblxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICBjb25zdCBmb3VuZCA9IGRvU2VhcmNoKHRyZWVba2V5XSwgc2VhcmNoRmlsdGVyLCB7XHJcbiAgICAgICAgICAgIHdhbGthYmxlLFxyXG4gICAgICAgICAgICBpZ25vcmUsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGlmIChmb3VuZCkgcmV0dXJuIGZvdW5kO1xyXG4gICAgICAgIH0gY2F0Y2ggeyB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiBkb1NlYXJjaCh0cmVlLCBzZWFyY2hGaWx0ZXIsIHsgd2Fsa2FibGUsIGlnbm9yZSB9KTtcclxufTtcclxuIiwgImZ1bmN0aW9uIGJ1aWxkKHByZWZpeCA9IFwiQWNvcmRcIiwgdHlwZSwgY29sb3IpIHtcclxuICByZXR1cm4gKC4uLmlucHV0KSA9PiBjb25zb2xlW3R5cGVdKFxyXG4gICAgYCVjJHtwcmVmaXh9JWNgLFxyXG4gICAgYGJhY2tncm91bmQtY29sb3I6ICR7Y29sb3J9OyBjb2xvcjogd2hpdGU7IGJvcmRlci1yYWRpdXM6IDRweDsgcGFkZGluZzogMHB4IDZweCAwcHggNnB4OyBmb250LXdlaWdodDogYm9sZGAsXHJcbiAgICBcIlwiLFxyXG4gICAgLi4uaW5wdXRcclxuICApO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgbG9nOiBidWlsZChcIkFjb3JkXCIsIFwibG9nXCIsIFwiIzAwZmJiMFwiKSxcclxuICBkZWJ1ZzogYnVpbGQoXCJBY29yZCBEZWJ1Z1wiLCBcImRlYnVnXCIsIFwiIzAwZmJiMFwiKSxcclxuICBpbmZvOiBidWlsZChcIkFjb3JkIEluZm9cIiwgXCJsb2dcIiwgXCIjODJhYWZmXCIpLFxyXG4gIHdhcm46IGJ1aWxkKFwiQWNvcmQgV2FyblwiLCBcIndhcm5cIiwgXCIjZGViZjE4XCIpLFxyXG4gIGVycm9yOiBidWlsZChcIkFjb3JkIEVycm9yXCIsIFwiZXJyb3JcIiwgXCIjZWY1ODU4XCIpLFxyXG4gIGJ1aWxkXHJcbn0iLCAiaW1wb3J0IGZpbmRJblRyZWUgZnJvbSBcIi4vcmF3L2ZpbmQtaW4tdHJlZS5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGdldEluc3RhbmNlKG5vZGUpIHtcclxuICAgIHJldHVybiBPYmplY3QuZW50cmllcyhub2RlKS5maW5kKGkgPT4gaVswXS5zdGFydHNXaXRoKFwiX19yZWFjdEludGVybmFsSW5zdGFuY2VcIikgfHwgaVswXS5zdGFydHNXaXRoKFwiX19yZWFjdEZpYmVyXCIpKT8uWzFdO1xyXG4gIH0sXHJcbiAgZ2V0T3duZXJJbnN0YW5jZShub2RlKSB7XHJcbiAgICBsZXQgaW5zdGFuY2UgPSB0aGlzLmdldEluc3RhbmNlKG5vZGUpO1xyXG4gICAgZm9yIChsZXQgZWwgPSBpbnN0YW5jZTsgZWw7IGVsID0gZWwucmV0dXJuKVxyXG4gICAgICBpZiAoZWwuc3RhdGVOb2RlPy5mb3JjZVVwZGF0ZSkgcmV0dXJuIGVsLnN0YXRlTm9kZTtcclxuICB9LFxyXG4gIGZpbmRJblRyZWUodHJlZSwgZmlsdGVyKSB7XHJcbiAgICByZXR1cm4gZmluZEluVHJlZSh0cmVlLCBmaWx0ZXIsIHtcclxuICAgICAgd2Fsa2FibGU6IFtcInByb3BzXCIsIFwic3RhdGVcIiwgXCJjaGlsZHJlblwiLCBcInJldHVyblwiXVxyXG4gICAgfSk7XHJcbiAgfSxcclxuICBnZXRDb21wb25lbnRzKG5vZGUpIHtcclxuICAgIGNvbnN0IGluc3RhbmNlID0gdGhpcy5nZXRJbnN0YW5jZShub2RlKTtcclxuICAgIGNvbnN0IGNvbXBvbmVudHMgPSBbXTtcclxuICAgIGxldCBsYXN0SW5zdGFuY2UgPSBpbnN0YW5jZTtcclxuICAgIHdoaWxlIChsYXN0SW5zdGFuY2UgJiYgbGFzdEluc3RhbmNlLnJldHVybikge1xyXG4gICAgICBpZiAodHlwZW9mIGxhc3RJbnN0YW5jZS5yZXR1cm4udHlwZSA9PT0gXCJzdHJpbmdcIikgYnJlYWs7XHJcbiAgICAgIGlmIChsYXN0SW5zdGFuY2UucmV0dXJuLnR5cGUpIGNvbXBvbmVudHMucHVzaChsYXN0SW5zdGFuY2UucmV0dXJuLnR5cGUpO1xyXG4gICAgICBsYXN0SW5zdGFuY2UgPSBsYXN0SW5zdGFuY2UucmV0dXJuO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNvbXBvbmVudHM7XHJcbiAgfSxcclxuICBnZXRTdGF0ZU5vZGVzKG5vZGUpIHtcclxuICAgIGNvbnN0IGluc3RhbmNlID0gdGhpcy5nZXRJbnN0YW5jZShub2RlKTtcclxuICAgIGNvbnN0IHN0YXRlTm9kZXMgPSBbXTtcclxuICAgIGxldCBsYXN0SW5zdGFuY2UgPSBpbnN0YW5jZTtcclxuICAgIHdoaWxlIChsYXN0SW5zdGFuY2UgJiYgbGFzdEluc3RhbmNlLnJldHVybikge1xyXG4gICAgICBpZiAobGFzdEluc3RhbmNlLnJldHVybi5zdGF0ZU5vZGUgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkgYnJlYWs7XHJcbiAgICAgIGlmIChsYXN0SW5zdGFuY2UucmV0dXJuLnN0YXRlTm9kZSlcclxuICAgICAgICBzdGF0ZU5vZGVzLnB1c2gobGFzdEluc3RhbmNlLnJldHVybi5zdGF0ZU5vZGUpO1xyXG4gICAgICBsYXN0SW5zdGFuY2UgPSBsYXN0SW5zdGFuY2UucmV0dXJuO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN0YXRlTm9kZXM7XHJcbiAgfSxcclxuICBnZXRQcm9wcyhlbCwgZmlsdGVyID0gKGkpID0+IGksIG1heCA9IDEwMDAwKSB7XHJcbiAgICBjb25zdCBpbnN0YW5jZSA9IHRoaXMuZ2V0SW5zdGFuY2UoZWwpO1xyXG5cclxuICAgIGlmICghaW5zdGFuY2U/LnJldHVybikgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgZm9yIChcclxuICAgICAgbGV0IGN1cnJlbnQgPSBpbnN0YW5jZT8ucmV0dXJuLCBpID0gMDtcclxuICAgICAgaSA+IG1heCB8fCBjdXJyZW50ICE9PSBudWxsO1xyXG4gICAgICBjdXJyZW50ID0gY3VycmVudD8ucmV0dXJuLCBpKytcclxuICAgICkge1xyXG4gICAgICBpZiAoY3VycmVudD8ucGVuZGluZ1Byb3BzICYmIGZpbHRlcihjdXJyZW50LnBlbmRpbmdQcm9wcykpXHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnQucGVuZGluZ1Byb3BzO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH0sXHJcbn0iLCAiaW1wb3J0IGZpbmRJblRyZWUgZnJvbSBcIi4vcmF3L2ZpbmQtaW4tdHJlZS5qc1wiO1xyXG5pbXBvcnQgbG9nZ2VyIGZyb20gXCIuL2xvZ2dlci5qc1wiO1xyXG5pbXBvcnQgcmVhY3QgZnJvbSBcIi4vcmVhY3QuanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBsb2dnZXIsXHJcbiAgcmVhY3QsXHJcbiAgZmluZEluVHJlZSxcclxuICBmb3JtYXQodmFsLCAuLi5hcmdzKSB7XHJcbiAgICByZXR1cm4gYCR7dmFsfWAucmVwbGFjZUFsbCgveyhcXGQrKX0vZywgKF8sIGNhcCkgPT4ge1xyXG4gICAgICByZXR1cm4gYXJnc1tOdW1iZXIoY2FwKV07XHJcbiAgICB9KTtcclxuICB9LFxyXG4gIGludGVydmFsKGNiLCBkdXIpIHtcclxuICAgIGxldCBpbnRlcnZhbCA9IHNldEludGVydmFsKGNiLCBkdXIpO1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgdGltZW91dChjYiwgZHVyKSB7XHJcbiAgICBsZXQgdGltZW91dCA9IHNldFRpbWVvdXQoY2IsIGR1cik7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgaWZFeGlzdHModmFsLCBjYikge1xyXG4gICAgaWYgKHZhbCkgY2IodmFsKTtcclxuICB9LFxyXG4gIGNvcHlUZXh0KHRleHQpIHtcclxuICAgIGlmICh3aW5kb3cuRGlzY29yZE5hdGl2ZSkge1xyXG4gICAgICBEaXNjb3JkTmF0aXZlLmNsaXBib2FyZC5jb3B5KHRleHQpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgbmF2aWdhdG9yLmNsaXBib2FyZC53cml0ZVRleHQodGV4dCkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICBjb25zdCBjb3B5QXJlYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZXh0YXJlYVwiKTtcclxuXHJcbiAgICAgIGNvcHlBcmVhLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xyXG4gICAgICBjb3B5QXJlYS5zdHlsZS5wb3NpdGlvbiA9IFwiZml4ZWRcIjtcclxuICAgICAgY29weUFyZWEuc3R5bGUudG9wID0gXCIwXCI7XHJcbiAgICAgIGNvcHlBcmVhLnN0eWxlLmxlZnQgPSBcIjBcIjtcclxuXHJcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY29weUFyZWEpO1xyXG4gICAgICBjb3B5QXJlYS5mb2N1cygpO1xyXG4gICAgICBjb3B5QXJlYS5zZWxlY3QoKTtcclxuXHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoXCJjb3B5XCIpO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoY29weUFyZWEpO1xyXG4gICAgfSk7XHJcbiAgfSxcclxuICBzbGVlcChtcykge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIG1zKSk7XHJcbiAgfVxyXG59IiwgImltcG9ydCB1dGlscyBmcm9tIFwiLi4vLi4vdXRpbHMvaW5kZXguanNcIjtcclxuaW1wb3J0IGxvZ2dlciBmcm9tIFwiLi4vLi4vdXRpbHMvbG9nZ2VyLmpzXCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gd3JhcEZpbHRlcihmaWx0ZXIpIHtcclxuICByZXR1cm4gKC4uLmFyZ3MpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGlmIChhcmdzWzBdPy5kb2N1bWVudCAmJiBhcmdzWzBdPy53aW5kb3cpIHJldHVybiBmYWxzZTtcclxuICAgICAgaWYgKGFyZ3NbMF0/LmRlZmF1bHQ/LnJlbW92ZSAmJiBhcmdzWzBdPy5kZWZhdWx0Py5zZXQgJiYgYXJnc1swXT8uZGVmYXVsdD8uY2xlYXIgJiYgYXJnc1swXT8uZGVmYXVsdD8uZ2V0ICYmICFhcmdzWzBdPy5kZWZhdWx0Py5zb3J0KSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIGlmIChhcmdzWzBdLnJlbW92ZSAmJiBhcmdzWzBdLnNldCAmJiBhcmdzWzBdLmNsZWFyICYmIGFyZ3NbMF0uZ2V0ICYmICFhcmdzWzBdLnNvcnQpIHJldHVybiBmYWxzZTtcclxuICAgICAgaWYgKGFyZ3NbMF0/LmRlZmF1bHQ/LmdldFRva2VuIHx8IGFyZ3NbMF0/LmRlZmF1bHQ/LmdldEVtYWlsIHx8IGFyZ3NbMF0/LmRlZmF1bHQ/LnNob3dUb2tlbikgcmV0dXJuIGZhbHNlO1xyXG4gICAgICBpZiAoYXJnc1swXT8uZ2V0VG9rZW4gfHwgYXJnc1swXT8uZ2V0RW1haWwgfHwgYXJnc1swXT8uc2hvd1Rva2VuKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIHJldHVybiBmaWx0ZXIoLi4uYXJncyk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGxvZ2dlci53YXJuKFwiTW9kdWxlIGZpbHRlciB0aHJldyBhbiBleGNlcHRpb24uXCIsIGZpbHRlciwgZXJyKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNoZWNrTW9kdWxlU3RyaW5ncyhtLCBzdHJpbmdzLCBoYXNOb3QpIHtcclxuICBjb25zdCBjaGVjayA9IChzMSwgczIpID0+IHtcclxuICAgIHJldHVybiBoYXNOb3QgPyBzMS50b1N0cmluZygpLmluZGV4T2YoczIudG9TdHJpbmcoKSkgPT0gLTEgOiBzMS50b1N0cmluZygpLmluZGV4T2YoczIudG9TdHJpbmcoKSkgPiAtMTtcclxuICB9O1xyXG4gIHJldHVybiBzdHJpbmdzLmV2ZXJ5KGogPT4ge1xyXG4gICAgcmV0dXJuIGNoZWNrKG0/LnRvU3RyaW5nPy4oKSB8fCBcIlwiLCBqKVxyXG4gICAgICB8fCBjaGVjayhtPy5fX29yaWdpbmFsX18/LnRvU3RyaW5nPy4oKSB8fCBcIlwiLCBqKVxyXG4gICAgICB8fCBjaGVjayhtPy50eXBlPy50b1N0cmluZz8uKCkgfHwgXCJcIiwgailcclxuICAgICAgfHwgY2hlY2sobT8udHlwZT8uX19vcmlnaW5hbF9fPy50b1N0cmluZz8uKCkgfHwgXCJcIiwgailcclxuICAgICAgfHwgT2JqZWN0LmVudHJpZXMoWydmdW5jdGlvbicsICdvYmplY3QnXS5pbmNsdWRlcyh0eXBlb2YgbT8ucHJvdG90eXBlKSA/IHR5cGVvZiBtPy5wcm90b3R5cGUgOiB7fSkuZmlsdGVyKGkgPT4gaVswXT8uaW5jbHVkZXM/LihcInJlbmRlclwiKSkuc29tZShpID0+IGNoZWNrKGlbMV0/LnRvU3RyaW5nPy4oKSB8fCBcIlwiLCBqKSlcclxuICB9KTtcclxufTtcclxuZnVuY3Rpb24gY2hlY2tNb2R1bGVQcm9wcyhtLCBwcm9wZXJ0aWVzLCBoYXNOb3QpIHtcclxuICByZXR1cm4gcHJvcGVydGllcy5ldmVyeShwcm9wID0+IHtcclxuICAgIGNvbnN0IHZhbHVlID0gbVtwcm9wXT8uX19vcmlnaW5hbF9fIHx8IG1bcHJvcF07XHJcbiAgICByZXR1cm4gaGFzTm90ID8gdmFsdWUgPT09IHVuZGVmaW5lZCA6ICh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmICEodHlwZW9mIHZhbHVlID09IFwic3RyaW5nXCIgJiYgIXZhbHVlKSk7XHJcbiAgfSk7XHJcbn07XHJcbmZ1bmN0aW9uIGNoZWNrTW9kdWxlUHJvdG90eXBlcyhtLCBwcm90b1Byb3BzLCBoYXNOb3QpIHtcclxuICByZXR1cm4gbS5wcm90b3R5cGUgJiYgcHJvdG9Qcm9wcy5ldmVyeShwcm9wID0+IHtcclxuICAgIGNvbnN0IHZhbHVlID0gbS5wcm90b3R5cGVbcHJvcF07XHJcbiAgICByZXR1cm4gaGFzTm90ID8gdmFsdWUgPT09IHVuZGVmaW5lZCA6ICh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmICEodHlwZW9mIHZhbHVlID09IFwic3RyaW5nXCIgJiYgIXZhbHVlKSk7XHJcbiAgfSk7XHJcbn07XHJcblxyXG5jb25zdCB3ZWJwYWNrQ2h1bmtOYW1lID0gXCJ3ZWJwYWNrQ2h1bmtkaXNjb3JkX2FwcFwiO1xyXG5jb25zdCBwdXNoTGlzdGVuZXJzID0gbmV3IFNldCgpO1xyXG5cclxuXHJcbntcclxuICBsZXQgb2dQdXNoID0gd2luZG93W3dlYnBhY2tDaHVua05hbWVdLnB1c2g7XHJcblxyXG4gIGZ1bmN0aW9uIGhhbmRsZVB1c2goY2h1bmspIHtcclxuICAgIGNvbnN0IFssIG1vZHVsZXNdID0gY2h1bms7XHJcblxyXG4gICAgZm9yIChjb25zdCBtb2R1bGVJZCBpbiBPYmplY3Qua2V5cyhtb2R1bGVzIHx8IHt9KSkge1xyXG4gICAgICBjb25zdCBvZ01vZHVsZSA9IG1vZHVsZXNbbW9kdWxlSWRdO1xyXG5cclxuICAgICAgbW9kdWxlc1ttb2R1bGVJZF0gPSAobW9kdWxlLCBleHBvcnRzLCByZXF1aXJlKSA9PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIG9nTW9kdWxlLmNhbGwobnVsbCwgbW9kdWxlLCBleHBvcnRzLCByZXF1aXJlKTtcclxuXHJcbiAgICAgICAgICBwdXNoTGlzdGVuZXJzLmZvckVhY2gobGlzdGVuZXIgPT4ge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgIGxpc3RlbmVyKGV4cG9ydHMpO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgIHV0aWxzLmxvZ2dlci5lcnJvcihcIlB1c2ggbGlzdGVuZXIgdGhyZXcgYW4gZXhjZXB0aW9uLlwiLCBsaXN0ZW5lciwgZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICB1dGlscy5sb2dnZXIuZXJyb3IoXCJVbmFibGUgdG8gcGF0Y2ggcHVzaGVkIG1vZHVsZS5cIiwgZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuXHJcbiAgICAgIE9iamVjdC5hc3NpZ24obW9kdWxlc1ttb2R1bGVJZF0sIG9nTW9kdWxlLCB7XHJcbiAgICAgICAgX19vcmlnaW5hbF9fOiBvZ01vZHVsZSxcclxuICAgICAgICB0b1N0cmluZzogKCkgPT4gb2dNb2R1bGUudG9TdHJpbmcoKSxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG9nUHVzaC5jYWxsKHdpbmRvd1t3ZWJwYWNrQ2h1bmtOYW1lXSwgY2h1bmspO1xyXG4gIH1cclxuXHJcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvd1t3ZWJwYWNrQ2h1bmtOYW1lXSwgXCJwdXNoXCIsIHtcclxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcclxuICAgIGdldCgpIHsgcmV0dXJuIGhhbmRsZVB1c2g7IH0sXHJcbiAgICBzZXQodmFsdWUpIHtcclxuICAgICAgb2dQdXNoID0gdmFsdWU7XHJcblxyXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93W3RoaXMuY2h1bmtOYW1lXSwgXCJwdXNoXCIsIHtcclxuICAgICAgICB2YWx1ZTogdGhpcy5oYW5kbGVQdXNoLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcclxuICAgICAgICB3cml0YWJsZTogdHJ1ZVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9KTtcclxufVxyXG5cclxuXHJcblxyXG4vKipcclxuICogXHJcbiAqIEBwYXJhbSB7YW55fSBmaWx0ZXIgXHJcbiAqIEBwYXJhbSB7eyBzaWduYWw6IEFib3J0U2lnbmFsLCBzZWFyY2hFeHBvcnRzOiBib29sZWFuIH19IHBhcmFtMSBcclxuICogQHJldHVybnMgXHJcbiAqL1xyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbGF6eUZpbmQoZmlsdGVyLCB7IHNpZ25hbCA9IG51bGwsIHNlYXJjaEV4cG9ydHMgPSBmYWxzZSB9KSB7XHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgIGNvbnN0IGNhbmNlbCA9ICgpID0+IHB1c2hMaXN0ZW5lcnMuZGVsZXRlKGxpc3RlbmVyKTtcclxuICAgIGNvbnN0IGxpc3RlbmVyID0gKGV4cG9ydHMpID0+IHtcclxuICAgICAgaWYgKCFleHBvcnRzIHx8IGV4cG9ydHMgPT09IHdpbmRvdyB8fCBleHBvcnRzID09PSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpIHJldHVybjtcclxuXHJcbiAgICAgIGxldCBmb3VuZCA9IG51bGw7XHJcblxyXG4gICAgICBpZiAodHlwZW9mIGV4cG9ydHMgPT0gXCJvYmplY3RcIiAmJiBzZWFyY2hFeHBvcnRzKSB7XHJcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gZXhwb3J0cykge1xyXG4gICAgICAgICAgbGV0IGV4cG9ydGVkID0gZXhwb3J0c1trZXldO1xyXG4gICAgICAgICAgaWYgKCFleHBvcnRlZCkgY29udGludWU7XHJcbiAgICAgICAgICBpZiAoZmlsdGVyKGV4cG9ydGVkKSkge1xyXG4gICAgICAgICAgICBmb3VuZCA9IGV4cG9ydGVkO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbGV0IHBhdGhzID0gW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiLFxyXG4gICAgICAgICAgXCJcIlxyXG4gICAgICAgIF07XHJcbiAgICAgICAgZm91bmQgPSBwYXRocy5tYXAoaSA9PiB7XHJcbiAgICAgICAgICBsZXQgcGF0aGVkID0gIWkgPyBleHBvcnRzIDogXy5nZXQoZXhwb3J0cywgaSk7XHJcbiAgICAgICAgICBpZiAocGF0aGVkICYmIGZpbHRlcihwYXRoZWQpKSByZXR1cm4gcGF0aGVkO1xyXG4gICAgICAgIH0pLmZpbmQoaSA9PiBpKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCFmb3VuZCkgcmV0dXJuO1xyXG4gICAgICBjYW5jZWwoKTtcclxuICAgICAgcmVzb2x2ZShmb3VuZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVzaExpc3RlbmVycy5hZGQobGlzdGVuZXIpO1xyXG5cclxuICAgIHNpZ25hbD8uYWRkRXZlbnRMaXN0ZW5lcihcImFib3J0XCIsICgpID0+IHtcclxuICAgICAgY2FuY2VsKCk7XHJcbiAgICAgIHJlc29sdmUobnVsbCk7XHJcbiAgICB9KTtcclxuICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGZpbmQocmVxLCBmaWx0ZXIsIGNvbmZpZyA9IHt9KSB7XHJcbiAgbGV0IGRlZmF1bHRFeHBvcnQgPSB0eXBlb2YgY29uZmlnLmRlZmF1bHRFeHBvcnQgIT0gXCJib29sZWFuXCIgPyBmYWxzZSA6IGNvbmZpZy5kZWZhdWx0RXhwb3J0O1xyXG4gIGxldCB1bmxvYWRlZCA9IHR5cGVvZiBjb25maWcudW5sb2FkZWQgIT0gXCJib29sZWFuXCIgPyBmYWxzZSA6IGNvbmZpZy51bmxvYWRlZDtcclxuICBsZXQgYWxsID0gdHlwZW9mIGNvbmZpZy5hbGwgIT0gXCJib29sZWFuXCIgPyBmYWxzZSA6IGNvbmZpZy5hbGw7XHJcbiAgY29uc3QgZm91bmQgPSBbXTtcclxuICBpZiAoIXVubG9hZGVkKSBmb3IgKGxldCBpIGluIHJlcS5jKSBpZiAocmVxLmMuaGFzT3duUHJvcGVydHkoaSkpIHtcclxuICAgIGxldCBtID0gcmVxLmNbaV0uZXhwb3J0cywgciA9IG51bGw7XHJcbiAgICBpZiAobSAmJiAodHlwZW9mIG0gPT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgbSA9PSBcImZ1bmN0aW9uXCIpKSB7XHJcbiAgICAgIGlmICghIShyID0gZmlsdGVyKG0sIGkpKSkge1xyXG4gICAgICAgIGlmIChhbGwpIGZvdW5kLnB1c2goZGVmYXVsdEV4cG9ydCA/IHIgOiByZXEuY1tpXSk7XHJcbiAgICAgICAgZWxzZSByZXR1cm4gZGVmYXVsdEV4cG9ydCA/IHIgOiByZXEuY1tpXTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIGZvciAobGV0IGtleSBvZiBPYmplY3Qua2V5cyhtKSkgaWYgKGtleS5sZW5ndGggPCA0ICYmIG1ba2V5XSAmJiAhIShyID0gZmlsdGVyKG1ba2V5XSwgaSkpKSB7XHJcbiAgICAgICAgaWYgKGFsbCkgZm91bmQucHVzaChkZWZhdWx0RXhwb3J0ID8gciA6IHJlcS5jW2ldKTtcclxuICAgICAgICBlbHNlIHJldHVybiBkZWZhdWx0RXhwb3J0ID8gciA6IHJlcS5jW2ldO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAobSAmJiBtLl9fZXNNb2R1bGUgJiYgbS5kZWZhdWx0ICYmICh0eXBlb2YgbS5kZWZhdWx0ID09IFwib2JqZWN0XCIgfHwgdHlwZW9mIG0uZGVmYXVsdCA9PSBcImZ1bmN0aW9uXCIpKSB7XHJcbiAgICAgIGlmICghIShyID0gZmlsdGVyKG0uZGVmYXVsdCwgaSkpKSB7XHJcbiAgICAgICAgaWYgKGFsbCkgZm91bmQucHVzaChkZWZhdWx0RXhwb3J0ID8gciA6IHJlcS5jW2ldKTtcclxuICAgICAgICBlbHNlIHJldHVybiBkZWZhdWx0RXhwb3J0ID8gciA6IHJlcS5jW2ldO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYgKG0uZGVmYXVsdC50eXBlICYmICh0eXBlb2YgbS5kZWZhdWx0LnR5cGUgPT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgbS5kZWZhdWx0LnR5cGUgPT0gXCJmdW5jdGlvblwiKSAmJiAhIShyID0gZmlsdGVyKG0uZGVmYXVsdC50eXBlLCBpKSkpIHtcclxuICAgICAgICBpZiAoYWxsKSBmb3VuZC5wdXNoKGRlZmF1bHRFeHBvcnQgPyByIDogcmVxLmNbaV0pO1xyXG4gICAgICAgIGVsc2UgcmV0dXJuIGRlZmF1bHRFeHBvcnQgPyByIDogcmVxLmNbaV07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgZm9yIChsZXQgaSBpbiByZXEubSkgaWYgKHJlcS5tLmhhc093blByb3BlcnR5KGkpKSB7XHJcbiAgICBsZXQgbSA9IHJlcS5tW2ldO1xyXG4gICAgaWYgKG0gJiYgdHlwZW9mIG0gPT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgIGlmIChyZXEuY1tpXSAmJiAhdW5sb2FkZWQgJiYgZmlsdGVyKG0sIGkpKSB7XHJcbiAgICAgICAgaWYgKGFsbCkgZm91bmQucHVzaChkZWZhdWx0RXhwb3J0ID8gcmVxLmNbaV0uZXhwb3J0cyA6IHJlcS5jW2ldKTtcclxuICAgICAgICBlbHNlIHJldHVybiBkZWZhdWx0RXhwb3J0ID8gcmVxLmNbaV0uZXhwb3J0cyA6IHJlcS5jW2ldO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICghcmVxLmNbaV0gJiYgdW5sb2FkZWQgJiYgZmlsdGVyKG0sIGkpKSB7XHJcbiAgICAgICAgY29uc3QgcmVzb2x2ZWQgPSB7fSwgcmVzb2x2ZWQyID0ge307XHJcbiAgICAgICAgbShyZXNvbHZlZCwgcmVzb2x2ZWQyLCByZXEpO1xyXG4gICAgICAgIGNvbnN0IHRydWVSZXNvbHZlZCA9IHJlc29sdmVkMiAmJiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhyZXNvbHZlZDIgfHwge30pLmxlbmd0aCA9PSAwID8gcmVzb2x2ZWQgOiByZXNvbHZlZDI7XHJcbiAgICAgICAgaWYgKGFsbCkgZm91bmQucHVzaChkZWZhdWx0RXhwb3J0ID8gdHJ1ZVJlc29sdmVkLmV4cG9ydHMgOiB0cnVlUmVzb2x2ZWQpO1xyXG4gICAgICAgIGVsc2UgcmV0dXJuIGRlZmF1bHRFeHBvcnQgPyB0cnVlUmVzb2x2ZWQuZXhwb3J0cyA6IHRydWVSZXNvbHZlZDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICBpZiAoYWxsKSByZXR1cm4gZm91bmQ7XHJcbn07XHJcblxyXG5cclxuZnVuY3Rpb24gZmluZGVyRmluZEZ1bmN0aW9uKGVudHJpZXMsIHN0cmluZ3MpIHtcclxuICByZXR1cm4gKGVudHJpZXMuZmluZChuID0+IHtcclxuICAgIGxldCBmdW5jU3RyaW5nID0gdHlwZW9mIG5bMV0gPT0gXCJmdW5jdGlvblwiID8gKG5bMV0/Ll9fb3JpZ2luYWxfXz8udG9TdHJpbmc/LigpIHx8IG5bMV0/LnRvU3RyaW5nPy4oKSB8fCBcIlwiKSA6ICgoKSA9PiB7IHRyeSB7IHJldHVybiBKU09OLnN0cmluZ2lmeShuWzFdKSB9IGNhdGNoIChlcnIpIHsgcmV0dXJuIG5bMV0udG9TdHJpbmcoKSB9IH0pKCk7XHJcbiAgICBsZXQgcmVuZGVyRnVuY1N0cmluZyA9IG5bMV0/LnJlbmRlcj8uX19vcmlnaW5hbF9fPy50b1N0cmluZz8uKCkgfHwgblsxXT8ucmVuZGVyPy50b1N0cmluZz8uKCkgfHwgXCJcIjtcclxuICAgIHJldHVybiBzdHJpbmdzLmV2ZXJ5KHN0cmluZyA9PiBmdW5jU3RyaW5nLmluZGV4T2Yoc3RyaW5nKSAhPSAtMSB8fCByZW5kZXJGdW5jU3RyaW5nLmluZGV4T2Yoc3RyaW5nKSAhPSAtMSk7XHJcbiAgfSkpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZmluZGVyVG9GaWx0ZXIoZmluZGVyKSB7XHJcbiAgbGV0IGZvdW5kID0gKCkgPT4gZmFsc2U7XHJcbiAgaWYgKHR5cGVvZiBmaW5kZXI/LmZpbHRlciA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgZm91bmQgPSB3cmFwRmlsdGVyKGV2YWwoYCgoJCk9PnsgdHJ5IHsgcmV0dXJuICgke2ZpbmRlci5maWx0ZXJ9KTsgfSBjYXRjaCB7IHJldHVybiBmYWxzZTsgfSB9KWApKTtcclxuICB9IGVsc2UgaWYgKHR5cGVvZiBmaW5kZXI/LmZpbHRlciA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICBmb3VuZCA9IHdyYXBGaWx0ZXIoZmluZGVyLmZpbHRlcik7XHJcbiAgfSBlbHNlIHtcclxuICAgIHN3aXRjaCAoZmluZGVyLmZpbHRlci5pbikge1xyXG4gICAgICBjYXNlIFwicHJvcGVydGllc1wiOiB7XHJcbiAgICAgICAgaWYgKGZpbmRlci5maWx0ZXIuYnk/LlsxXT8ubGVuZ3RoKSB7XHJcbiAgICAgICAgICBmb3VuZCA9IHdyYXBGaWx0ZXIoKG0pID0+IGNoZWNrTW9kdWxlUHJvcHMobSwgZmluZGVyLmZpbHRlci5ieT8uWzBdIHx8IFtdKSAmJiBjaGVja01vZHVsZVByb3BzKG0sIGZpbmRlci5maWx0ZXIuYnk/LlsxXSB8fCBbXSwgdHJ1ZSkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBmb3VuZCA9IHdyYXBGaWx0ZXIoKG0pID0+IGNoZWNrTW9kdWxlUHJvcHMobSwgZmluZGVyLmZpbHRlci5ieT8uWzBdIHx8IFtdKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgXCJwcm90b3R5cGVzXCI6IHtcclxuICAgICAgICBpZiAoZmluZGVyLmZpbHRlci5ieT8uWzFdPy5sZW5ndGgpIHtcclxuICAgICAgICAgIGZvdW5kID0gd3JhcEZpbHRlcigobSkgPT4gY2hlY2tNb2R1bGVQcm90b3R5cGVzKG0sIGZpbmRlci5maWx0ZXIuYnk/LlswXSB8fCBbXSkgJiYgY2hlY2tNb2R1bGVQcm90b3R5cGVzKG0sIGZpbmRlci5maWx0ZXIuYnk/LlsxXSB8fCBbXSwgdHJ1ZSkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBmb3VuZCA9IHdyYXBGaWx0ZXIoKG0pID0+IGNoZWNrTW9kdWxlUHJvdG90eXBlcyhtLCBmaW5kZXIuZmlsdGVyLmJ5Py5bMF0gfHwgW10pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSBcInN0cmluZ3NcIjoge1xyXG4gICAgICAgIGlmIChmaW5kZXIuZmlsdGVyLmJ5Py5bMV0/Lmxlbmd0aCkge1xyXG4gICAgICAgICAgZm91bmQgPSB3cmFwRmlsdGVyKChtKSA9PiBjaGVja01vZHVsZVN0cmluZ3MobSwgZmluZGVyLmZpbHRlci5ieT8uWzBdIHx8IFtdKSAmJiBjaGVja01vZHVsZVN0cmluZ3MobSwgZmluZGVyLmZpbHRlci5ieT8uWzFdIHx8IFtdLCB0cnVlKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGZvdW5kID0gd3JhcEZpbHRlcigobSkgPT4gY2hlY2tNb2R1bGVTdHJpbmdzKG0sIGZpbmRlci5maWx0ZXIuYnk/LlswXSB8fCBbXSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gZm91bmQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBmaW5kZXJNYXAoX19vcmlnaW5hbF9fLCBtYXApIHtcclxuICBsZXQgX19tYXBwZWRfXyA9IHt9O1xyXG5cclxuICBsZXQgdGVtcCA9IHtcclxuICAgIF9fb3JpZ2luYWxfXyxcclxuICAgIF9fbWFwcGVkX18sXHJcbiAgICAuLi5fX29yaWdpbmFsX19cclxuICB9O1xyXG5cclxuICBPYmplY3QuZW50cmllcyhtYXApLmZvckVhY2goKFtrZXksIHN0cmluZ3NdKSA9PiB7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGVtcCwga2V5LCB7XHJcbiAgICAgIGdldCgpIHtcclxuICAgICAgICBpZiAoX19tYXBwZWRfX1trZXldKSByZXR1cm4gX19vcmlnaW5hbF9fW19fbWFwcGVkX19ba2V5XV07XHJcblxyXG4gICAgICAgIGxldCBmb3VuZEZ1bmMgPSBmaW5kZXJGaW5kRnVuY3Rpb24oT2JqZWN0LmVudHJpZXMoX19vcmlnaW5hbF9fIHx8IHt9KSwgbWFwW2tleV0gfHwgW10pO1xyXG4gICAgICAgIGlmICghZm91bmRGdW5jPy5sZW5ndGgpIHJldHVybjtcclxuXHJcbiAgICAgICAgX19tYXBwZWRfX1trZXldID0gZm91bmRGdW5jWzBdO1xyXG4gICAgICAgIHJldHVybiBmb3VuZEZ1bmNbMV07XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiB0ZW1wO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZmluZEJ5RmluZGVyKHJlcSwgZmluZGVyID0ge30pIHtcclxuICBjb25zdCBkZWZhdWx0RXhwb3J0ID0gISFmaW5kZXI/LmZpbHRlcj8uZXhwb3J0O1xyXG4gIGxldCBmb3VuZCA9IGZpbmQocmVxLCBmaW5kZXJUb0ZpbHRlcihmaW5kZXIpLCB7IGRlZmF1bHRFeHBvcnQsIGFsbDogdHJ1ZSB9KS5maW5kKGkgPT4gaSAhPT0gZ2xvYmFsVGhpcy53aW5kb3cgfHwgaT8uZXhwb3J0cyAhPT0gZ2xvYmFsVGhpcy53aW5kb3cpO1xyXG5cclxuICBpZiAoIWZvdW5kKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgaWYgKGZpbmRlci5wYXRoPy5iZWZvcmUpIGZvdW5kID0gKEFycmF5LmlzQXJyYXkoZmluZGVyLnBhdGguYmVmb3JlKSA/IGZpbmRlci5wYXRoLmJlZm9yZS5tYXAoaSA9PiBfLmdldChmb3VuZCwgaSkpLmZpbmQoaSA9PiBpKSA6IF8uZ2V0KGZvdW5kLCBmaW5kZXIucGF0aC5iZWZvcmUpKSB8fCBmb3VuZDtcclxuICBpZiAoZmluZGVyLmFzc2lnbikgZm91bmQgPSBPYmplY3QuYXNzaWduKHt9LCBmb3VuZCk7XHJcblxyXG4gIGlmICghZm91bmQpIHJldHVybiBudWxsO1xyXG5cclxuICBpZiAoZmluZGVyLm1hcCkgZm91bmQgPSBmaW5kZXJNYXAoZm91bmQsIGZpbmRlci5tYXApO1xyXG5cclxuICBpZiAoZmluZGVyLnBhdGg/LmFmdGVyKSBmb3VuZCA9IChBcnJheS5pc0FycmF5KGZpbmRlci5wYXRoLmFmdGVyKSA/IGZpbmRlci5wYXRoLmFmdGVyLm1hcChpID0+IF8uZ2V0KGZvdW5kLCBpKSkuZmluZChpID0+IGkpIDogXy5nZXQoZm91bmQsIGZpbmRlci5wYXRoLmFmdGVyKSkgfHwgZm91bmQ7XHJcblxyXG4gIHJldHVybiBmb3VuZDtcclxufVxyXG5cclxuXHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbGF6eUZpbmRCeUZpbmRlcihmaW5kZXIgPSB7fSkge1xyXG4gIGxldCBmb3VuZCA9IGF3YWl0IGxhenlGaW5kKGZpbmRlclRvRmlsdGVyKGZpbmRlciksIHsgc2VhcmNoRXhwb3J0czogZmFsc2UgfSk7XHJcblxyXG4gIGlmICghZm91bmQpIHJldHVybiBudWxsO1xyXG5cclxuICBpZiAoZmluZGVyLnBhdGg/LmJlZm9yZSkgZm91bmQgPSAoQXJyYXkuaXNBcnJheShmaW5kZXIucGF0aC5iZWZvcmUpID8gZmluZGVyLnBhdGguYmVmb3JlLm1hcChpID0+IF8uZ2V0KGZvdW5kLCBpKSkuZmluZChpID0+IGkpIDogXy5nZXQoZm91bmQsIGZpbmRlci5wYXRoLmJlZm9yZSkpIHx8IGZvdW5kO1xyXG4gIGlmIChmaW5kZXIuYXNzaWduKSBmb3VuZCA9IE9iamVjdC5hc3NpZ24oe30sIGZvdW5kKTtcclxuXHJcbiAgaWYgKCFmb3VuZCkgcmV0dXJuIG51bGw7XHJcblxyXG4gIGlmIChmaW5kZXIubWFwKSBmb3VuZCA9IGZpbmRlck1hcChmb3VuZCwgZmluZGVyLm1hcCk7XHJcblxyXG4gIGlmIChmaW5kZXIucGF0aD8uYWZ0ZXIpIGZvdW5kID0gKEFycmF5LmlzQXJyYXkoZmluZGVyLnBhdGguYWZ0ZXIpID8gZmluZGVyLnBhdGguYWZ0ZXIubWFwKGkgPT4gXy5nZXQoZm91bmQsIGkpKS5maW5kKGkgPT4gaSkgOiBfLmdldChmb3VuZCwgZmluZGVyLnBhdGguYWZ0ZXIpKSB8fCBmb3VuZDtcclxuXHJcbiAgcmV0dXJuIGZvdW5kO1xyXG59IiwgImltcG9ydCAqIGFzIGNvbXBsZXhGaW5kZXIgZnJvbSBcIi4vcmF3L2NvbXBsZXgtZmluZGVyLmpzXCI7XHJcblxyXG5jb25zdCBkZWZhdWx0QmVmb3JlID0gW1xyXG4gIFwiZXhwb3J0cy5aXCIsXHJcbiAgXCJleHBvcnRzLlpQXCIsXHJcbiAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICBcImV4cG9ydHNcIlxyXG5dO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIF9fY2FjaGVfXzoge30sXHJcbiAgZ2V0IHJlcXVpcmUoKSB7XHJcbiAgICBpZiAodGhpcy5fX2NhY2hlX18ucmVxdWlyZSkgcmV0dXJuIHRoaXMuX19jYWNoZV9fLnJlcXVpcmU7XHJcbiAgICBsZXQgcmVxSWQgPSBgQWNvcmRXZWJwYWNrTW9kdWxlcyR7RGF0ZS5ub3coKX1gO1xyXG4gICAgY29uc3QgcmVxID0gd2luZG93LndlYnBhY2tDaHVua2Rpc2NvcmRfYXBwLnB1c2goW1tyZXFJZF0sIHt9LCByZXEgPT4gcmVxXSk7XHJcbiAgICBkZWxldGUgcmVxLm1bcmVxSWRdO1xyXG4gICAgZGVsZXRlIHJlcS5jW3JlcUlkXTtcclxuICAgIHdpbmRvdy53ZWJwYWNrQ2h1bmtkaXNjb3JkX2FwcC5wb3AoKTtcclxuICAgIHRoaXMuX19jYWNoZV9fLnJlcXVpcmUgPSByZXE7XHJcbiAgICByZXR1cm4gcmVxO1xyXG4gIH0sXHJcbiAgZmluZChmaWx0ZXIsIGNvbmZpZyA9IHt9KSB7XHJcbiAgICByZXR1cm4gY29tcGxleEZpbmRlci5maW5kKHRoaXMucmVxdWlyZSwgY29tcGxleEZpbmRlci53cmFwRmlsdGVyKGZpbHRlciksIGNvbmZpZyk7XHJcbiAgfSxcclxuICBsYXp5RmluZChmaWx0ZXIsIGNvbmZpZyA9IHt9KSB7XHJcbiAgICByZXR1cm4gY29tcGxleEZpbmRlci5sYXp5RmluZChjb21wbGV4RmluZGVyLndyYXBGaWx0ZXIoZmlsdGVyKSwgY29uZmlnKTtcclxuICB9LFxyXG4gIGxhenlGaW5kQnlGaW5kZXIoZmluZGVyKSB7XHJcbiAgICByZXR1cm4gY29tcGxleEZpbmRlci5sYXp5RmluZEJ5RmluZGVyKGZpbmRlcik7XHJcbiAgfSxcclxuICBmaWx0ZXIoZmlsdGVyLCBjb25maWcgPSB7fSkge1xyXG4gICAgcmV0dXJuIGNvbXBsZXhGaW5kZXIuZmluZCh0aGlzLnJlcXVpcmUsIGNvbXBsZXhGaW5kZXIud3JhcEZpbHRlcihmaWx0ZXIpLCB7IC4uLmNvbmZpZywgYWxsOiB0cnVlIH0pO1xyXG4gIH0sXHJcbiAgZmluZEJ5RmluZGVyKGZpbmRlcikge1xyXG4gICAgcmV0dXJuIGNvbXBsZXhGaW5kZXIuZmluZEJ5RmluZGVyKHRoaXMucmVxdWlyZSwgZmluZGVyKTtcclxuICB9LFxyXG4gIGZpbmRCeVN0cmluZ1ZhbHVlcyguLi5zdHJpbmdWYWx1ZXMpIHtcclxuICAgIHJldHVybiB0aGlzLmZpbmQoKGEpID0+IHsgbGV0IHZhID0gT2JqZWN0LnZhbHVlcyhhKTsgcmV0dXJuIHN0cmluZ1ZhbHVlcy5ldmVyeSh4ID0+IHZhLnNvbWUoeSA9PiB0eXBlb2YgeSA9PSBcInN0cmluZ1wiICYmIHkuaW5jbHVkZXMoeCkpKSB9KT8uZXhwb3J0cztcclxuICB9LFxyXG4gIGZpbmRCeVByb3BlcnRpZXMoLi4ucHJvcHMpIHtcclxuICAgIHJldHVybiB0aGlzLmZpbmRCeUZpbmRlcih7XHJcbiAgICAgIGZpbHRlcjoge1xyXG4gICAgICAgIGV4cG9ydDogZmFsc2UsXHJcbiAgICAgICAgaW46IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIGJ5OiBbcHJvcHNdXHJcbiAgICAgIH0sXHJcbiAgICAgIHBhdGg6IHtcclxuICAgICAgICBiZWZvcmU6IGRlZmF1bHRCZWZvcmVcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSxcclxuICBmaW5kQnlQcm90b3R5cGVzKC4uLnByb3BzKSB7XHJcbiAgICByZXR1cm4gdGhpcy5maW5kQnlGaW5kZXIoe1xyXG4gICAgICBmaWx0ZXI6IHtcclxuICAgICAgICBleHBvcnQ6IGZhbHNlLFxyXG4gICAgICAgIGluOiBcInByb3RvdHlwZXNcIixcclxuICAgICAgICBieTogW3Byb3BzXVxyXG4gICAgICB9LFxyXG4gICAgICBwYXRoOiB7XHJcbiAgICAgICAgYmVmb3JlOiBkZWZhdWx0QmVmb3JlXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgZmluZEJ5U3RyaW5ncyguLi5wcm9wcykge1xyXG4gICAgcmV0dXJuIHRoaXMuZmluZEJ5RmluZGVyKHtcclxuICAgICAgZmlsdGVyOiB7XHJcbiAgICAgICAgZXhwb3J0OiBmYWxzZSxcclxuICAgICAgICBpbjogXCJzdHJpbmdzXCIsXHJcbiAgICAgICAgYnk6IFtwcm9wc11cclxuICAgICAgfSxcclxuICAgICAgcGF0aDoge1xyXG4gICAgICAgIGJlZm9yZTogZGVmYXVsdEJlZm9yZVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9LFxyXG59OyIsICJpbXBvcnQgY29tbW9uRGF0YSBmcm9tICcuLi8uLi9kYXRhL2NvbW1vbi5qc29uJztcclxuaW1wb3J0IHdlYnBhY2sgZnJvbSAnLi93ZWJwYWNrLmpzJztcclxuXHJcblxyXG5mdW5jdGlvbiBtYXBPYmplY3QodGVtcCwgaW5wKSB7XHJcbiAgaWYgKCF0ZW1wPy5fX2NhY2hlX18pIHRlbXAuX19jYWNoZV9fID0ge307XHJcbiAgZm9yIChjb25zdCBrZXkgaW4gaW5wKSB7XHJcbiAgICBpZiAoaW5wPy5ba2V5XT8uX18gPT09IHRydWUpIHtcclxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRlbXAsIGtleSwge1xyXG4gICAgICAgIGdldCgpIHtcclxuICAgICAgICAgIGlmICh0ZW1wLl9fY2FjaGVfX1trZXldKSByZXR1cm4gdGVtcC5fX2NhY2hlX19ba2V5XTtcclxuICAgICAgICAgIHJldHVybiB0ZW1wLl9fY2FjaGVfX1trZXldID0gd2VicGFjay5maW5kQnlGaW5kZXIoaW5wW2tleV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICh0eXBlb2YgdGVtcFtrZXldID09PSBcInVuZGVmaW5lZFwiKSB0ZW1wW2tleV0gPSB7fTtcclxuICAgICAgbWFwT2JqZWN0KHRlbXBba2V5XSwgaW5wW2tleV0pO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuXHJcbmxldCBjb21tb24gPSB7XHJcbiAgX19jYWNoZV9fOiB7fSxcclxuICBMYXllckFjdGlvbnM6IHtcclxuICAgIHB1c2goY29tcG9uZW50KSB7XHJcbiAgICAgIGNvbW1vbi5GbHV4RGlzcGF0Y2hlci5kaXNwYXRjaCh7XHJcbiAgICAgICAgdHlwZTogXCJMQVlFUl9QVVNIXCIsXHJcbiAgICAgICAgY29tcG9uZW50XHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIHBvcCgpIHtcclxuICAgICAgY29tbW9uLkZsdXhEaXNwYXRjaGVyLmRpc3BhdGNoKHtcclxuICAgICAgICB0eXBlOiBcIkxBWUVSX1BPUFwiXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIHBvcEFsbCgpIHtcclxuICAgICAgY29tbW9uLkZsdXhEaXNwYXRjaGVyLmRpc3BhdGNoKHtcclxuICAgICAgICB0eXBlOiBcIkxBWUVSX1BPUF9BTExcIlxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9LFxyXG59O1xyXG5tYXBPYmplY3QoY29tbW9uLCBjb21tb25EYXRhLmNvbW1vbik7XHJcbntcclxuICBsZXQgcGF0aHMgPSBbXHJcbiAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgXCJleHBvcnRzXCJcclxuICBdO1xyXG4gIHdlYnBhY2suZmlsdGVyKChpKSA9PiBpPy5nZXROYW1lPy4oKT8uZW5kc1dpdGg/LihcIlN0b3JlXCIpLCB7IGRlZmF1bHRFeHBvcnQ6IGZhbHNlIH0pLmZvckVhY2goKG0pID0+IHtcclxuICAgIGxldCBvYmogPSBwYXRocy5tYXAocGF0aCA9PiBfLmdldChtLCBwYXRoKSkuZmluZChpID0+IGkpO1xyXG4gICAgaWYgKCFvYmopIHJldHVybjtcclxuICAgIGxldCBuYW1lID0gb2JqPy5nZXROYW1lPy4oKTtcclxuICAgIGlmICghbmFtZSkgcmV0dXJuO1xyXG4gICAgaWYgKGNvbW1vbltuYW1lXSkgcmV0dXJuO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb21tb24sIG5hbWUsIHtcclxuICAgICAgZ2V0KCkge1xyXG4gICAgICAgIGlmIChjb21tb24uX19jYWNoZV9fW25hbWVdKSByZXR1cm4gY29tbW9uLl9fY2FjaGVfX1tuYW1lXTtcclxuICAgICAgICByZXR1cm4gY29tbW9uLl9fY2FjaGVfX1tuYW1lXSA9IG9iajtcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9KVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb21tb247IiwgImltcG9ydCBjb21tb24gZnJvbSBcIi4vY29tbW9uLmpzXCI7XHJcbmltcG9ydCB3ZWJwYWNrIGZyb20gXCIuL3dlYnBhY2suanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBjb21tb24sXHJcbiAgd2VicGFjayxcclxuICByZXF1aXJlOiBnbG9iYWxUaGlzW1wiPFBSRUxPQURfS0VZPlwiXS5yZXF1aXJlLFxyXG4gIG5hdGl2ZTogRGlzY29yZE5hdGl2ZSxcclxufSIsICJpbXBvcnQgbW9kdWxlcyBmcm9tIFwiLi4vbW9kdWxlcy9pbmRleC5qc1wiXHJcbmltcG9ydCB1dGlscyBmcm9tIFwiLi4vdXRpbHMvaW5kZXguanNcIjtcclxuXHJcbmNvbnN0IEJBU0VfVVJMID0gXCJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vYWNvcmQtc3RhbmRhbG9uZS9hc3NldHMvbWFpbi9pMThuXCI7XHJcbmNvbnN0IG5vU3RvcmUgPSB7IGNhY2hlOiBcIm5vLXN0b3JlXCIgfTtcclxuXHJcblxyXG5jb25zdCBvdXQgPSB7XHJcbiAgX19jYWNoZV9fOiB7XHJcbiAgICBsb2NhbGVJZHM6IFtdLFxyXG4gICAgbG9jYWxpemF0aW9uczoge31cclxuICB9LFxyXG4gIGdldCBsb2NhbGUoKSB7XHJcbiAgICByZXR1cm4gbW9kdWxlcy5jb21tb24uaTE4bi5fcmVxdWVzdGVkTG9jYWxlO1xyXG4gIH0sXHJcbiAgZ2V0KGtleSkge1xyXG4gICAgY2hlY2soKTtcclxuICAgIHJldHVybiBvdXQuX19jYWNoZV9fLmxvY2FsaXphdGlvbnNbb3V0LmxvY2FsZV0/LltrZXldXHJcbiAgICAgIHx8IG91dC5fX2NhY2hlX18ubG9jYWxpemF0aW9ucy5kZWZhdWx0Py5ba2V5XVxyXG4gICAgICB8fCBtb2R1bGVzLmNvbW1vbi5pMThuLk1lc3NhZ2VzW2tleV1cclxuICAgICAgfHwga2V5O1xyXG4gIH0sXHJcbiAgbWVzc2FnZXM6IG5ldyBQcm94eSh7fSwge1xyXG4gICAgZ2V0KF8sIHByb3ApIHtcclxuICAgICAgcmV0dXJuIG91dC5nZXQocHJvcCk7XHJcbiAgICB9XHJcbiAgfSksXHJcbiAgbG9jYWxpemUoc3RyKSB7XHJcbiAgICBpZiAodHlwZW9mIHN0ciA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIHN0cjtcclxuICAgIHJldHVybiBzdHI/LltvdXQubG9jYWxlXVxyXG4gICAgICB8fCBzdHI/LmRlZmF1bHRcclxuICAgICAgfHwgT2JqZWN0LnZhbHVlcyhzdHIpWzBdO1xyXG4gIH0sXHJcbiAgZm9ybWF0KGtleSwgLi4uYXJncykge1xyXG4gICAgcmV0dXJuIHV0aWxzLmZvcm1hdChvdXQuZ2V0KGtleSksIC4uLmFyZ3MpO1xyXG4gIH1cclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gY2hlY2soKSB7XHJcbiAgY29uc3QgbG9jYWxlID0gb3V0LmxvY2FsZTtcclxuICBpZiAoIW91dC5fX2NhY2hlX18ubG9jYWxlSWRzLmxlbmd0aCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgb3V0Ll9fY2FjaGVfXy5sb2NhbGVJZHMgPSBhd2FpdCAoYXdhaXQgZmV0Y2goYCR7QkFTRV9VUkx9L2xvY2FsZXMuanNvbmAsIG5vU3RvcmUpKS5qc29uKCk7XHJcbiAgICB9IGNhdGNoIHsgfVxyXG4gICAgdHJ5IHtcclxuICAgICAgb3V0Ll9fY2FjaGVfXy5sb2NhbGl6YXRpb25zLmRlZmF1bHQgPSBhd2FpdCAoYXdhaXQgZmV0Y2goYCR7QkFTRV9VUkx9L2RlZmF1bHQuanNvbmAsIG5vU3RvcmUpKS5qc29uKCk7XHJcbiAgICB9IGNhdGNoIHsgfVxyXG4gIH1cclxuICBpZiAoXHJcbiAgICBvdXQuX19jYWNoZV9fLmxvY2FsZUlkcy5pbmNsdWRlcyhsb2NhbGUpXHJcbiAgICAmJiAhb3V0Ll9fY2FjaGVfXy5sb2NhbGl6YXRpb25zPy5bbG9jYWxlXVxyXG4gICkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgb3V0Ll9fY2FjaGVfXy5sb2NhbGl6YXRpb25zW2xvY2FsZV0gPSBhd2FpdCAoYXdhaXQgZmV0Y2goYCR7QkFTRV9VUkx9LyR7bG9jYWxlfS5qc29uYCwgbm9TdG9yZSkpLmpzb24oKTtcclxuICAgIH0gY2F0Y2ggeyB9O1xyXG4gIH1cclxufVxyXG5cclxuY2hlY2soKTtcclxuZXhwb3J0IGRlZmF1bHQgb3V0OyIsICJpbXBvcnQgbW9kdWxlcyBmcm9tIFwiLi4vYXBpL21vZHVsZXMvaW5kZXguanNcIjtcclxuaW1wb3J0IGkxOG4gZnJvbSBcIi4uL2FwaS9pMThuL2luZGV4LmpzXCI7XHJcblxyXG5sZXQgaXNDb25uZWN0aW9uT3BlbiA9IGZhbHNlO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHdhaXRVbnRpbENvbm5lY3Rpb25PcGVuKCkge1xyXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG4gICAgaWYgKGlzQ29ubmVjdGlvbk9wZW4pIHJldHVybiByZXNvbHZlKHRydWUpO1xyXG4gICAgZnVuY3Rpb24gb25FdmVudCgpIHtcclxuICAgICAgbW9kdWxlcy5jb21tb24uRmx1eERpc3BhdGNoZXIudW5zdWJzY3JpYmUoXCJDT05ORUNUSU9OX09QRU5cIiwgb25FdmVudCk7XHJcbiAgICAgIGlzQ29ubmVjdGlvbk9wZW4gPSB0cnVlO1xyXG4gICAgICByZXNvbHZlKHRydWUpO1xyXG4gICAgfVxyXG4gICAgbW9kdWxlcy5jb21tb24uRmx1eERpc3BhdGNoZXIuc3Vic2NyaWJlKFwiQ09OTkVDVElPTl9PUEVOXCIsIG9uRXZlbnQpO1xyXG4gIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TG9jYWxpemVkKHYpIHtcclxuICBpZiAodHlwZW9mIHYgPT09IFwic3RyaW5nXCIpIHJldHVybiB2O1xyXG4gIHJldHVybiB2Py5baTE4bi5sb2NhbGVdIHx8IHY/LmRlZmF1bHQgfHwgT2JqZWN0LnZhbHVlcyh2KVswXTtcclxufSIsICJleHBvcnQgY2xhc3MgQmFzaWNFdmVudEVtaXR0ZXIge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgLyoqIEB0eXBlIHtNYXA8c3RyaW5nLCBNYXA8KC4uLmFyZ3M6IGFueVtdKT0+dm9pZCwge29uY2U6IGJvb2xlYW59Pj59ICovXHJcbiAgICB0aGlzLmxpc3RlbmVycyA9IG5ldyBNYXAoKTtcclxuICB9XHJcblxyXG4gIF9wcmVwYXJlTGlzdGVuZXJzTWFwKGV2ZW50TmFtZSkge1xyXG4gICAgaWYgKCF0aGlzLmxpc3RlbmVycy5oYXMoZXZlbnROYW1lKSlcclxuICAgICAgdGhpcy5saXN0ZW5lcnMuc2V0KGV2ZW50TmFtZSwgbmV3IE1hcCgpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudE5hbWVcclxuICAgKiBAcGFyYW0geyguLi5hcmdzOiBhbnlbXSk9PnZvaWR9IGxpc3RlbmVyXHJcbiAgICovXHJcbiAgb24oZXZlbnROYW1lLCBsaXN0ZW5lcikge1xyXG4gICAgdGhpcy5fcHJlcGFyZUxpc3RlbmVyc01hcChldmVudE5hbWUpO1xyXG4gICAgdGhpcy5saXN0ZW5lcnMuZ2V0KGV2ZW50TmFtZSkuc2V0KGxpc3RlbmVyLCB7IG9uY2U6IGZhbHNlIH0pO1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgdGhpcy5saXN0ZW5lcnMuZ2V0KGV2ZW50TmFtZSkuZGVsZXRlKGxpc3RlbmVyKTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnROYW1lXHJcbiAgICogQHBhcmFtIHsoLi4uYXJnczogYW55W10pPT52b2lkfSBsaXN0ZW5lclxyXG4gICAqL1xyXG4gIG9uY2UoZXZlbnROYW1lLCBsaXN0ZW5lcikge1xyXG4gICAgdGhpcy5fcHJlcGFyZUxpc3RlbmVyc01hcChldmVudE5hbWUpO1xyXG4gICAgdGhpcy5saXN0ZW5lcnMuZ2V0KGV2ZW50TmFtZSk/LnNldChsaXN0ZW5lciwgeyBvbmNlOiB0cnVlIH0pO1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgdGhpcy5saXN0ZW5lcnMuZ2V0KGV2ZW50TmFtZSkuZGVsZXRlKGxpc3RlbmVyKTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge3N0cmluZz99IGV2ZW50TmFtZVxyXG4gICAqIEBwYXJhbSB7KCguLi5hcmdzOiBhbnlbXSk9PnZvaWQpP30gbGlzdGVuZXJcclxuICAgKi9cclxuICBvZmYoZXZlbnROYW1lLCBsaXN0ZW5lcikge1xyXG4gICAgaWYgKCFldmVudE5hbWUpIHJldHVybiAodGhpcy5saXN0ZW5lcnMgPSBuZXcgTWFwKCkpO1xyXG4gICAgaWYgKCFsaXN0ZW5lcikgcmV0dXJuIHRoaXMubGlzdGVuZXJzPy5kZWxldGUoZXZlbnROYW1lKTtcclxuICAgIHRoaXMubGlzdGVuZXJzLmdldChldmVudE5hbWUpPy5kZWxldGUobGlzdGVuZXIpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50TmFtZVxyXG4gICAqIEBwYXJhbSAgey4uLmFueX0gYXJnc1xyXG4gICAqL1xyXG4gIGVtaXQoZXZlbnROYW1lLCAuLi5hcmdzKSB7XHJcbiAgICBpZiAoIXRoaXMubGlzdGVuZXJzLmhhcyhldmVudE5hbWUpKSByZXR1cm47XHJcbiAgICBsZXQgZXZlbnRNYXAgPSB0aGlzLmxpc3RlbmVycy5nZXQoZXZlbnROYW1lKTtcclxuICAgIGV2ZW50TWFwLmZvckVhY2goKHsgb25jZSB9LCBsaXN0ZW5lcikgPT4ge1xyXG4gICAgICBpZiAob25jZSkgZXZlbnRNYXA/LmRlbGV0ZShsaXN0ZW5lcik7XHJcbiAgICAgIGxpc3RlbmVyKC4uLmFyZ3MpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59O1xyXG4iLCAiaW1wb3J0IHsgQmFzaWNFdmVudEVtaXR0ZXIgfSBmcm9tIFwiLi4vLi4vbGliL0Jhc2ljRXZlbnRFbWl0dGVyLmpzXCI7XHJcblxyXG5jb25zdCBldmVudHMgPSBuZXcgQmFzaWNFdmVudEVtaXR0ZXIoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGV2ZW50czsiLCAiaW1wb3J0IGV2ZW50cyBmcm9tIFwiLi4vZXZlbnRzXCI7XHJcbmltcG9ydCB3ZWJwYWNrIGZyb20gXCIuLi9tb2R1bGVzL3dlYnBhY2suanNcIjtcclxuXHJcbmNvbnN0IHNjcm9sbGJhckNsYXNzZXMgPSB3ZWJwYWNrLmZpbmRCeVByb3BlcnRpZXMoXCJzY3JvbGxiYXJHaG9zdEhhaXJsaW5lXCIsIFwic3Bpbm5lclwiKTtcclxuXHJcbmNvbnN0IGZvcm1hdFJlZ2V4ZXMgPSB7XHJcbiAgYm9sZDogL1xcKlxcKihbXipdKylcXCpcXCovZyxcclxuICBpdGFsaWM6IC9cXCooW14qXSspXFwqL2csXHJcbiAgdW5kZXJsaW5lOiAvXFxfKFteKl0rKVxcXy9nLFxyXG4gIHN0cmlrZTogL1xcflxcfihbXipdKylcXH5cXH4vZyxcclxuICB1cmw6IC8oXFxiKGh0dHBzP3xmdHB8ZmlsZSk6XFwvXFwvWy1BLVowLTkrJkAjXFwvJT89fl98ITosLjtdKlstQS1aMC05KyZAI1xcLyU9fl98XSkvaWcsXHJcbiAgaW5saW5lOiAvXFxgKFteKl0rKVxcYC9nLFxyXG4gIGNvZGVibG9ja1NpbmdsZTogL1xcYFxcYFxcYChbXipdKylcXGBcXGBcXGAvZyxcclxuICBjb2RlYmxvY2tNdWx0aTogL1xcYFxcYFxcYChcXHcrKVxcbigoPzooPyFcXGBcXGBcXGApW1xcc1xcU10pKilcXGBcXGBcXGAvZ1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIHBhcnNlKGh0bWwpIHtcclxuICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgZGl2LmlubmVySFRNTCA9IGh0bWw7XHJcbiAgICByZXR1cm4gZGl2LmZpcnN0RWxlbWVudENoaWxkO1xyXG4gIH0sXHJcbiAgdG9DU1NQcm9wKG8pIHtcclxuICAgIGxldCBlbG0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgT2JqZWN0LmVudHJpZXMobykuZm9yRWFjaCgoaSkgPT4ge1xyXG4gICAgICBpZiAoZWxtLnN0eWxlLmhhc093blByb3BlcnR5KGlbMF0pKSB7XHJcbiAgICAgICAgZWxtLnN0eWxlW2lbMF1dID0gaVsxXTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBlbG0uc3R5bGUuc2V0UHJvcGVydHkoaVswXSwgaVsxXSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGVsbS5nZXRBdHRyaWJ1dGUoXCJzdHlsZVwiKTtcclxuICB9LFxyXG4gIHRvSFRNTFByb3BzKG8pIHtcclxuICAgIHJldHVybiBPYmplY3QuZW50cmllcyhvKVxyXG4gICAgICAubWFwKFxyXG4gICAgICAgIChpKSA9PlxyXG4gICAgICAgICAgYCR7aVswXS5yZXBsYWNlKC8gKy8sIFwiLVwiKX09XCIke2lbMF0gPT0gXCJzdHlsZVwiICYmIHR5cGVvZiBpWzFdICE9IFwic3RyaW5nXCJcclxuICAgICAgICAgICAgPyB0aGlzLnRvQ1NTUHJvcChpWzFdKVxyXG4gICAgICAgICAgICA6IHRoaXMuZXNjYXBlSFRNTChpWzFdKX1cImBcclxuICAgICAgKVxyXG4gICAgICAuam9pbihcIiBcIik7XHJcbiAgfSxcclxuICBlc2NhcGUoaHRtbCkge1xyXG4gICAgcmV0dXJuIG5ldyBPcHRpb24oaHRtbCkuaW5uZXJIVE1MO1xyXG4gIH0sXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtFbGVtZW50fSBlbG0gXHJcbiAgICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBzZWxlY3Rvck9yTnVtYmVyIFxyXG4gICAqIEByZXR1cm5zIHtFbGVtZW50W119XHJcbiAgICovXHJcbiAgcGFyZW50cyhlbG0sIHNlbGVjdG9yT3JOdW1iZXIpIHtcclxuICAgIGxldCBwYXJlbnRzID0gW107XHJcbiAgICBpZiAodHlwZW9mIHNlbGVjdG9yT3JOdW1iZXIgPT09IFwibnVtYmVyXCIpIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWxlY3Rvck9yTnVtYmVyOyBpKyspIHtcclxuICAgICAgICBpZiAoZWxtLnBhcmVudEVsZW1lbnQpIHtcclxuICAgICAgICAgIGVsbSA9IGVsbS5wYXJlbnRFbGVtZW50O1xyXG4gICAgICAgICAgcGFyZW50cy5wdXNoKGVsbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB3aGlsZSAoZWxtLnBhcmVudEVsZW1lbnQgJiYgZWxtLnBhcmVudEVsZW1lbnQuY2xvc2VzdChzZWxlY3Rvck9yTnVtYmVyKSkge1xyXG4gICAgICAgIGVsbSA9IGVsbS5wYXJlbnRFbGVtZW50LmNsb3Nlc3Qoc2VsZWN0b3JPck51bWJlcik7XHJcbiAgICAgICAgcGFyZW50cy5wdXNoKGVsbSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBwYXJlbnRzO1xyXG4gIH0sXHJcbiAgLyoqXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yIFxyXG4gICAqIEBwYXJhbSB7KGVsZW1lbnQ6IEhUTUxEaXZFbGVtZW50KT0+KCgpPT52b2lkKX0gY2IgXHJcbiAgICogQHJldHVybnMgeygpPT52b2lkfVxyXG4gICAqL1xyXG4gIHBhdGNoOiAoc2VsZWN0b3IsIGNiKSA9PlxyXG4gICAgKCgpID0+IHtcclxuICAgICAgZnVuY3Rpb24gbm9kZUFkZGVkKG5vZGUpIHtcclxuICAgICAgICBpZiAodHlwZW9mIG5vZGU/LnF1ZXJ5U2VsZWN0b3JBbGwgIT0gXCJmdW5jdGlvblwiKSByZXR1cm47XHJcbiAgICAgICAgbm9kZS5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKS5mb3JFYWNoKGFzeW5jIChlbG0pID0+IHtcclxuICAgICAgICAgIGlmICghZWxtLmFjb3JkKSB7XHJcbiAgICAgICAgICAgIGVsbS5hY29yZCA9IHsgdW5tb3VudDogW10sIHBhdGNoZWQ6IG5ldyBTZXQoKSB9O1xyXG4gICAgICAgICAgICBlbG0uY2xhc3NMaXN0LmFkZChcImFjb3JkLS1wYXRjaGVkXCIpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChlbG0uYWNvcmQucGF0Y2hlZC5oYXMoY2IpKSByZXR1cm47XHJcbiAgICAgICAgICBlbG0uYWNvcmQucGF0Y2hlZC5hZGQoY2IpO1xyXG5cclxuICAgICAgICAgIGxldCB1blBhdGNoQ2IgPSBhd2FpdCBjYihlbG0pO1xyXG4gICAgICAgICAgaWYgKHR5cGVvZiB1blBhdGNoQ2IgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICAgICAgZWxtLmFjb3JkLnVubW91bnQucHVzaCh1blBhdGNoQ2IpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBmdW5jdGlvbiBub2RlUmVtb3ZlZChub2RlKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBub2RlPy5xdWVyeVNlbGVjdG9yQWxsICE9IFwiZnVuY3Rpb25cIikgcmV0dXJuO1xyXG4gICAgICAgIG5vZGUucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikuZm9yRWFjaChhc3luYyAoZWxtKSA9PiB7XHJcbiAgICAgICAgICBpZiAoIWVsbS5hY29yZCkgcmV0dXJuO1xyXG4gICAgICAgICAgZWxtLmFjb3JkLnVubW91bnQuZm9yRWFjaCgoZikgPT4gZigpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikuZm9yRWFjaChub2RlQWRkZWQpO1xyXG5cclxuICAgICAgcmV0dXJuIGV2ZW50cy5vbihcclxuICAgICAgICBcImRvbS1tdXRhdGlvblwiLFxyXG4gICAgICAgIC8qKiBAcGFyYW0ge011dGF0aW9uUmVjb3JkfSBtdXQgKi8obXV0KSA9PiB7XHJcbiAgICAgICAgICBpZiAobXV0LnR5cGUgPT09IFwiY2hpbGRMaXN0XCIpIHtcclxuICAgICAgICAgICAgbXV0LmFkZGVkTm9kZXMuZm9yRWFjaChub2RlQWRkZWQpO1xyXG4gICAgICAgICAgICBtdXQucmVtb3ZlZE5vZGVzLmZvckVhY2gobm9kZVJlbW92ZWQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgKTtcclxuICAgIH0pKCksXHJcbiAgZm9ybWF0Q29udGVudChtc2cpIHtcclxuICAgIGlmICghbXNnKSByZXR1cm4gJyc7XHJcbiAgICBjb25zdCB7IGJvbGQsIGl0YWxpYywgdW5kZXJsaW5lLCBzdHJpa2UsIGNvZGVibG9ja011bHRpLCBjb2RlYmxvY2tTaW5nbGUsIGlubGluZSwgdXJsIH0gPSBmb3JtYXRSZWdleGVzO1xyXG5cclxuICAgIGNvbnN0IGNvZGVCbG9ja3NNYXAgPSBPYmplY3QuZnJvbUVudHJpZXMoW1xyXG4gICAgICAuLi4obXNnLm1hdGNoQWxsKGNvZGVibG9ja011bHRpKSB8fCBbXSksIC4uLihtc2cubWF0Y2hBbGwoY29kZWJsb2NrU2luZ2xlKSB8fCBbXSlcclxuICAgIF0ubWFwKFxyXG4gICAgICAoW18sIGNvZGVCbG9ja09yQ29kZSwgY29kZUJsb2NrQ29udGVudF0sIGkpID0+IHtcclxuICAgICAgICBtc2cgPSBtc2cucmVwbGFjZShfLCBge3tDT0RFQkxPQ0tfJHtpfX19YCk7XHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgIGB7e0NPREVCTE9DS18ke2l9fX1gLFxyXG4gICAgICAgICAgY29kZUJsb2NrQ29udGVudCA/XHJcbiAgICAgICAgICAgIGA8cHJlPjxjb2RlIGNsYXNzPVwiJHtzY3JvbGxiYXJDbGFzc2VzLnNjcm9sbGJhckdob3N0SGFpcmxpbmV9IGhsanMgJHtjb2RlQmxvY2tPckNvZGV9XCIgc3R5bGU9XCJwb3NpdGlvbjogcmVsYXRpdmU7XCI+JHttb2R1bGVzLmNvbW1vbi5obGpzLmhpZ2hsaWdodChjb2RlQmxvY2tPckNvZGUsIGNvZGVCbG9ja0NvbnRlbnQpLnZhbHVlfTwvY29kZT48L3ByZT5gIDpcclxuICAgICAgICAgICAgYDxwcmU+PGNvZGUgY2xhc3M9XCIke3Njcm9sbGJhckNsYXNzZXMuc2Nyb2xsYmFyR2hvc3RIYWlybGluZX0gaGxqc1wiIHN0eWxlPVwicG9zaXRpb246IHJlbGF0aXZlO1wiPiR7Y29kZUJsb2NrT3JDb2RlfTwvY29kZT48L3ByZT5gXHJcbiAgICAgICAgXTtcclxuICAgICAgfVxyXG4gICAgKSk7XHJcblxyXG4gICAgY29uc3QgaW5saW5lTWFwID0gT2JqZWN0LmZyb21FbnRyaWVzKFxyXG4gICAgICBbLi4uKG1zZy5tYXRjaEFsbChpbmxpbmUpIHx8IFtdKV0ubWFwKFxyXG4gICAgICAgIChbXywgaW5saW5lQ29udGVudF0sIGkpID0+IHtcclxuICAgICAgICAgIG1zZyA9IG1zZy5yZXBsYWNlKF8sIGB7e0lOTElORV8ke2l9fX1gKTtcclxuICAgICAgICAgIHJldHVybiBbYHt7SU5MSU5FXyR7aX19fWAsIGA8Y29kZSBjbGFzcz1cImlubGluZVwiPiR7aW5saW5lQ29udGVudH08L2NvZGU+YF07XHJcbiAgICAgICAgfVxyXG4gICAgICApXHJcbiAgICApO1xyXG5cclxuICAgIG1zZyA9IG1zZy5yZXBsYWNlKGJvbGQsIFwiPGI+JDE8L2I+XCIpXHJcbiAgICAgIC5yZXBsYWNlKGl0YWxpYywgXCI8aT4kMTwvaT5cIilcclxuICAgICAgLnJlcGxhY2UodW5kZXJsaW5lLCBcIjxVPiQxPC9VPlwiKVxyXG4gICAgICAucmVwbGFjZShzdHJpa2UsIFwiPHM+JDE8L3M+XCIpXHJcbiAgICAgIC5yZXBsYWNlKHVybCwgJzxhIGhyZWY9XCIkMVwiPiQxPC9hPicpO1xyXG5cclxuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKGNvZGVCbG9ja3NNYXApKSB7XHJcbiAgICAgIG1zZyA9IG1zZy5yZXBsYWNlKGtleSwgdmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKGlubGluZU1hcCkpIHtcclxuICAgICAgbXNnID0gbXNnLnJlcGxhY2Uoa2V5LCB2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG1zZztcclxuICB9LFxyXG4gIHJlc29sdmUoaHRtbE9yRWxtKSB7XHJcbiAgICBpZiAoaHRtbE9yRWxtIGluc3RhbmNlb2YgRWxlbWVudCkgcmV0dXJuIGh0bWxPckVsbTtcclxuICAgIHJldHVybiB0aGlzLnBhcnNlKGh0bWxPckVsbSk7XHJcbiAgfVxyXG59XHJcblxyXG57XHJcbiAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigobXV0YXRpb25zKSA9PiB7XHJcbiAgICBtdXRhdGlvbnMuZm9yRWFjaCgobXV0YXRpb24pID0+IHtcclxuICAgICAgZXZlbnRzLmVtaXQoXCJkb20tbXV0YXRpb25cIiwgbXV0YXRpb24pO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbiAgb2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudCwge1xyXG4gICAgYXR0cmlidXRlczogdHJ1ZSxcclxuICAgIGNoaWxkTGlzdDogdHJ1ZSxcclxuICAgIHN1YnRyZWU6IHRydWVcclxuICB9KTtcclxufSIsICIvLyB3ZSB1c2UgdGhpcyBhcnJheSBtdWx0aXBsZSB0aW1lc1xyXG5leHBvcnQgY29uc3QgcGF0Y2hUeXBlcyA9IFtcImFcIiwgXCJiXCIsIFwiaVwiXTtcclxuZXhwb3J0IGNvbnN0IHBhdGNoZWRPYmplY3RzID0gbmV3IE1hcCgpO1xyXG4iLCAiLy8gY2FsbHMgcmVsZXZhbnQgcGF0Y2hlcyBhbmQgcmV0dXJucyB0aGUgZmluYWwgcmVzdWx0XHJcbmltcG9ydCB7IHBhdGNoZWRPYmplY3RzIH0gZnJvbSBcIi4vc2hhcmVkLmpzXCI7XHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChmdW5jTmFtZSwgZnVuY1BhcmVudCwgZnVuY0FyZ3MsIFxyXG4vLyB0aGUgdmFsdWUgb2YgYHRoaXNgIHRvIGFwcGx5XHJcbmN0eHQsIFxyXG4vLyBpZiB0cnVlLCB0aGUgZnVuY3Rpb24gaXMgYWN0dWFsbHkgY29uc3RydWN0b3JcclxuaXNDb25zdHJ1Y3QpIHtcclxuICAgIGNvbnN0IHBhdGNoID0gcGF0Y2hlZE9iamVjdHMuZ2V0KGZ1bmNQYXJlbnQpPy5bZnVuY05hbWVdO1xyXG4gICAgLy8gVGhpcyBpcyBpbiB0aGUgZXZlbnQgdGhhdCB0aGlzIGZ1bmN0aW9uIGlzIGJlaW5nIGNhbGxlZCBhZnRlciBhbGwgcGF0Y2hlcyBhcmUgcmVtb3ZlZC5cclxuICAgIGlmICghcGF0Y2gpXHJcbiAgICAgICAgcmV0dXJuIGlzQ29uc3RydWN0XHJcbiAgICAgICAgICAgID8gUmVmbGVjdC5jb25zdHJ1Y3QoZnVuY1BhcmVudFtmdW5jTmFtZV0sIGZ1bmNBcmdzLCBjdHh0KVxyXG4gICAgICAgICAgICA6IGZ1bmNQYXJlbnRbZnVuY05hbWVdLmFwcGx5KGN0eHQsIGZ1bmNBcmdzKTtcclxuICAgIC8vIEJlZm9yZSBwYXRjaGVzXHJcbiAgICBmb3IgKGNvbnN0IGhvb2sgb2YgcGF0Y2guYi52YWx1ZXMoKSkge1xyXG4gICAgICAgIGNvbnN0IG1heWJlZnVuY0FyZ3MgPSBob29rLmNhbGwoY3R4dCwgZnVuY0FyZ3MpO1xyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KG1heWJlZnVuY0FyZ3MpKVxyXG4gICAgICAgICAgICBmdW5jQXJncyA9IG1heWJlZnVuY0FyZ3M7XHJcbiAgICB9XHJcbiAgICAvLyBJbnN0ZWFkIHBhdGNoZXNcclxuICAgIGxldCBpbnN0ZWFkUGF0Y2hlZEZ1bmMgPSAoLi4uYXJncykgPT4gaXNDb25zdHJ1Y3RcclxuICAgICAgICA/IFJlZmxlY3QuY29uc3RydWN0KHBhdGNoLm8sIGFyZ3MsIGN0eHQpXHJcbiAgICAgICAgOiBwYXRjaC5vLmFwcGx5KGN0eHQsIGFyZ3MpO1xyXG4gICAgZm9yIChjb25zdCBjYWxsYmFjayBvZiBwYXRjaC5pLnZhbHVlcygpKSB7XHJcbiAgICAgICAgY29uc3Qgb2xkUGF0Y2hGdW5jID0gaW5zdGVhZFBhdGNoZWRGdW5jO1xyXG4gICAgICAgIGluc3RlYWRQYXRjaGVkRnVuYyA9ICguLi5hcmdzKSA9PiBjYWxsYmFjay5jYWxsKGN0eHQsIGFyZ3MsIG9sZFBhdGNoRnVuYyk7XHJcbiAgICB9XHJcbiAgICBsZXQgd29ya2luZ1JldFZhbCA9IGluc3RlYWRQYXRjaGVkRnVuYyguLi5mdW5jQXJncyk7XHJcbiAgICAvLyBBZnRlciBwYXRjaGVzXHJcbiAgICBmb3IgKGNvbnN0IGhvb2sgb2YgcGF0Y2guYS52YWx1ZXMoKSlcclxuICAgICAgICB3b3JraW5nUmV0VmFsID0gaG9vay5jYWxsKGN0eHQsIGZ1bmNBcmdzLCB3b3JraW5nUmV0VmFsKSA/PyB3b3JraW5nUmV0VmFsO1xyXG4gICAgcmV0dXJuIHdvcmtpbmdSZXRWYWw7XHJcbn1cclxuIiwgImltcG9ydCB7IHBhdGNoZWRPYmplY3RzLCBwYXRjaFR5cGVzIH0gZnJvbSBcIi4vc2hhcmVkLmpzXCI7XHJcbmV4cG9ydCBmdW5jdGlvbiB1blBhdGNoKGZ1bmNQYXJlbnQsIGZ1bmNOYW1lLCBob29rSWQsIHR5cGUpIHtcclxuICAgIGNvbnN0IHBhdGNoZWRPYmplY3QgPSBwYXRjaGVkT2JqZWN0cy5nZXQoZnVuY1BhcmVudCk7XHJcbiAgICBjb25zdCBwYXRjaCA9IHBhdGNoZWRPYmplY3Q/LltmdW5jTmFtZV07XHJcbiAgICBpZiAoIXBhdGNoPy5bdHlwZV0uaGFzKGhvb2tJZCkpXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgcGF0Y2hbdHlwZV0uZGVsZXRlKGhvb2tJZCk7XHJcbiAgICAvLyBJZiB0aGVyZSBhcmUgbm8gbW9yZSBob29rcyBmb3IgZXZlcnkgdHlwZSwgcmVtb3ZlIHRoZSBwYXRjaFxyXG4gICAgaWYgKHBhdGNoVHlwZXMuZXZlcnkoKHQpID0+IHBhdGNoW3RdLnNpemUgPT09IDApKSB7XHJcbiAgICAgICAgLy8gcmVmbGVjdCBkZWZpbmVwcm9wZXJ0eSBpcyBsaWtlIG9iamVjdCBkZWZpbmVwcm9wZXJ0eVxyXG4gICAgICAgIC8vIGJ1dCBpbnN0ZWFkIG9mIGVycm9yaW5nIGl0IHJldHVybnMgaWYgaXQgd29ya2VkIG9yIG5vdC5cclxuICAgICAgICAvLyB0aGlzIGlzIG1vcmUgZWFzaWx5IG1pbmlmaWFibGUsIGhlbmNlIGl0cyB1c2UuIC0tIHNpbmtcclxuICAgICAgICBjb25zdCBzdWNjZXNzID0gUmVmbGVjdC5kZWZpbmVQcm9wZXJ0eShmdW5jUGFyZW50LCBmdW5jTmFtZSwge1xyXG4gICAgICAgICAgICB2YWx1ZTogcGF0Y2gubyxcclxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoIXN1Y2Nlc3MpXHJcbiAgICAgICAgICAgIGZ1bmNQYXJlbnRbZnVuY05hbWVdID0gcGF0Y2gubztcclxuICAgICAgICBkZWxldGUgcGF0Y2hlZE9iamVjdFtmdW5jTmFtZV07XHJcbiAgICB9XHJcbiAgICBpZiAoT2JqZWN0LmtleXMocGF0Y2hlZE9iamVjdCkubGVuZ3RoID09IDApXHJcbiAgICAgICAgcGF0Y2hlZE9iamVjdHMuZGVsZXRlKGZ1bmNQYXJlbnQpO1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHVuUGF0Y2hBbGwoKSB7XHJcbiAgICBmb3IgKGNvbnN0IFtwYXJlbnRPYmplY3QsIHBhdGNoZWRPYmplY3RdIG9mIHBhdGNoZWRPYmplY3RzLmVudHJpZXMoKSlcclxuICAgICAgICBmb3IgKGNvbnN0IGZ1bmNOYW1lIGluIHBhdGNoZWRPYmplY3QpXHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgaG9va1R5cGUgb2YgcGF0Y2hUeXBlcylcclxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaG9va0lkIG9mIHBhdGNoZWRPYmplY3RbZnVuY05hbWVdPy5baG9va1R5cGVdLmtleXMoKSA/PyBbXSlcclxuICAgICAgICAgICAgICAgICAgICB1blBhdGNoKHBhcmVudE9iamVjdCwgZnVuY05hbWUsIGhvb2tJZCwgaG9va1R5cGUpO1xyXG59XHJcbiIsICIvLyBjdXJyaWVkIC0gZ2V0UGF0Y2hGdW5jKFwiYmVmb3JlXCIpKC4uLilcclxuLy8gYWxsb3dzIHVzIHRvIGFwcGx5IGFuIGFyZ3VtZW50IHdoaWxlIGxlYXZpbmcgdGhlIHJlc3Qgb3BlbiBtdWNoIGNsZWFuZXIuXHJcbi8vIGZ1bmN0aW9uYWwgcHJvZ3JhbW1pbmcgc3RyaWtlcyBhZ2FpbiEgLS0gc2lua1xyXG5pbXBvcnQgaG9vayBmcm9tIFwiLi9ob29rLmpzXCI7XHJcbmltcG9ydCB7IHBhdGNoZWRPYmplY3RzIH0gZnJvbSBcIi4vc2hhcmVkLmpzXCI7XHJcbmltcG9ydCB7IHVuUGF0Y2ggfSBmcm9tIFwiLi91bi1wYXRjaC5qc1wiO1xyXG4vLyBjcmVhdGVzIGEgaG9vayBpZiBuZWVkZWQsIGVsc2UganVzdCBhZGRzIG9uZSB0byB0aGUgcGF0Y2hlcyBhcnJheVxyXG5leHBvcnQgZGVmYXVsdCAocGF0Y2hUeXBlKSA9PiAoZnVuY05hbWUsIGZ1bmNQYXJlbnQsIGNhbGxiYWNrLCBvbmVUaW1lID0gZmFsc2UpID0+IHtcclxuICAgIGlmICh0eXBlb2YgZnVuY1BhcmVudFtmdW5jTmFtZV0gIT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7ZnVuY05hbWV9IGlzIG5vdCBhIGZ1bmN0aW9uIGluICR7ZnVuY1BhcmVudC5jb25zdHJ1Y3Rvci5uYW1lfWApO1xyXG4gICAgaWYgKCFwYXRjaGVkT2JqZWN0cy5oYXMoZnVuY1BhcmVudCkpXHJcbiAgICAgICAgcGF0Y2hlZE9iamVjdHMuc2V0KGZ1bmNQYXJlbnQsIHt9KTtcclxuICAgIGNvbnN0IHBhcmVudEluamVjdGlvbnMgPSBwYXRjaGVkT2JqZWN0cy5nZXQoZnVuY1BhcmVudCk7XHJcbiAgICBpZiAoIXBhcmVudEluamVjdGlvbnNbZnVuY05hbWVdKSB7XHJcbiAgICAgICAgY29uc3Qgb3JpZ0Z1bmMgPSBmdW5jUGFyZW50W2Z1bmNOYW1lXTtcclxuICAgICAgICAvLyBub3RlIHRvIGZ1dHVyZSBtZSBvcHRpbWlzaW5nIGZvciBzaXplOiBleHRyYWN0aW5nIG5ldyBNYXAoKSB0byBhIGZ1bmMgaW5jcmVhc2VzIHNpemUgLS1zaW5rXHJcbiAgICAgICAgcGFyZW50SW5qZWN0aW9uc1tmdW5jTmFtZV0gPSB7XHJcbiAgICAgICAgICAgIG86IG9yaWdGdW5jLFxyXG4gICAgICAgICAgICBiOiBuZXcgTWFwKCksXHJcbiAgICAgICAgICAgIGk6IG5ldyBNYXAoKSxcclxuICAgICAgICAgICAgYTogbmV3IE1hcCgpLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29uc3QgcnVuSG9vayA9IChjdHh0LCBhcmdzLCBjb25zdHJ1Y3QpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcmV0ID0gaG9vayhmdW5jTmFtZSwgZnVuY1BhcmVudCwgYXJncywgY3R4dCwgY29uc3RydWN0KTtcclxuICAgICAgICAgICAgaWYgKG9uZVRpbWUpXHJcbiAgICAgICAgICAgICAgICB1bnBhdGNoVGhpc1BhdGNoKCk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXQ7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCByZXBsYWNlUHJveHkgPSBuZXcgUHJveHkob3JpZ0Z1bmMsIHtcclxuICAgICAgICAgICAgYXBwbHk6IChfLCBjdHh0LCBhcmdzKSA9PiBydW5Ib29rKGN0eHQsIGFyZ3MsIGZhbHNlKSxcclxuICAgICAgICAgICAgY29uc3RydWN0OiAoXywgYXJncykgPT4gcnVuSG9vayhvcmlnRnVuYywgYXJncywgdHJ1ZSksXHJcbiAgICAgICAgICAgIGdldDogKHRhcmdldCwgcHJvcCwgcmVjZWl2ZXIpID0+IHByb3AgPT0gXCJ0b1N0cmluZ1wiXHJcbiAgICAgICAgICAgICAgICA/IG9yaWdGdW5jLnRvU3RyaW5nLmJpbmQob3JpZ0Z1bmMpXHJcbiAgICAgICAgICAgICAgICA6IFJlZmxlY3QuZ2V0KHRhcmdldCwgcHJvcCwgcmVjZWl2ZXIpLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIHRoaXMgd29ya3MgYXJvdW5kIGJyZWFraW5nIHNvbWUgYXN5bmMgZmluZCBpbXBsZW1lbnRhdGlvbiB3aGljaCBsaXN0ZW5zIGZvciBhc3NpZ25zIHZpYSBwcm94eVxyXG4gICAgICAgIC8vIHNlZSBjb21tZW50IGluIHVucGF0Y2gudHNcclxuICAgICAgICBjb25zdCBzdWNjZXNzID0gUmVmbGVjdC5kZWZpbmVQcm9wZXJ0eShmdW5jUGFyZW50LCBmdW5jTmFtZSwge1xyXG4gICAgICAgICAgICB2YWx1ZTogcmVwbGFjZVByb3h5LFxyXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICghc3VjY2VzcylcclxuICAgICAgICAgICAgZnVuY1BhcmVudFtmdW5jTmFtZV0gPSByZXBsYWNlUHJveHk7XHJcbiAgICAgICAgZnVuY1BhcmVudFtmdW5jTmFtZV0uX19vcmlnaW5hbF9fID0gcGFyZW50SW5qZWN0aW9uc1tmdW5jTmFtZV0ubztcclxuICAgIH1cclxuICAgIGNvbnN0IGhvb2tJZCA9IFN5bWJvbCgpO1xyXG4gICAgY29uc3QgdW5wYXRjaFRoaXNQYXRjaCA9ICgpID0+IHVuUGF0Y2goZnVuY1BhcmVudCwgZnVuY05hbWUsIGhvb2tJZCwgcGF0Y2hUeXBlKTtcclxuICAgIHBhcmVudEluamVjdGlvbnNbZnVuY05hbWVdW3BhdGNoVHlwZV0uc2V0KGhvb2tJZCwgY2FsbGJhY2spO1xyXG4gICAgcmV0dXJuIHVucGF0Y2hUaGlzUGF0Y2g7XHJcbn07XHJcbiIsICJpbXBvcnQgZ2V0UGF0Y2hGdW5jIGZyb20gXCIuL2dldC1wYXRjaC1mdW5jLmpzXCI7XHJcbmltcG9ydCB7IHVuUGF0Y2hBbGwgfSBmcm9tIFwiLi91bi1wYXRjaC5qc1wiO1xyXG5pbXBvcnQgeyBwYXRjaGVkT2JqZWN0cyBhcyBwYXRjaGVkIH0gZnJvbSBcIi4vc2hhcmVkLmpzXCI7XHJcbmNvbnN0IGJlZm9yZSA9IGdldFBhdGNoRnVuYyhcImJcIik7XHJcbmNvbnN0IGluc3RlYWQgPSBnZXRQYXRjaEZ1bmMoXCJpXCIpO1xyXG5jb25zdCBhZnRlciA9IGdldFBhdGNoRnVuYyhcImFcIik7XHJcbmV4cG9ydCB7IGluc3RlYWQsIGJlZm9yZSwgYWZ0ZXIsIHVuUGF0Y2hBbGwsIHBhdGNoZWQgfTtcclxuIiwgImltcG9ydCAqIGFzIHNwaXRSb2FzdCBmcm9tIFwiLi4vLi4vbGliL3NwaXRyb2FzdC9kaXN0L2VzbVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIF9fY2FjaGVfXzoge1xyXG4gICAgcGF0Y2hlZDogc3BpdFJvYXN0LnBhdGNoZWQsXHJcbiAgfSxcclxuICBiZWZvcmU6IHNwaXRSb2FzdC5iZWZvcmUsXHJcbiAgYWZ0ZXI6IHNwaXRSb2FzdC5hZnRlcixcclxuICBpbnN0ZWFkOiBzcGl0Um9hc3QuaW5zdGVhZCxcclxuICB1blBhdGNoQWxsOiBzcGl0Um9hc3QudW5QYXRjaEFsbCxcclxuICBpbmplY3RDU1MoY3NzKSB7XHJcbiAgICBjb25zdCBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcclxuICAgIHN0eWxlLmNsYXNzTmFtZSA9IGBhY29yZC0taW5qZWN0ZWQtY3NzYDtcclxuICAgIHN0eWxlLnRleHRDb250ZW50ID0gY3NzO1xyXG4gICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XHJcblxyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgc3R5bGU/LnJlbW92ZSgpO1xyXG4gICAgfTtcclxuICB9LFxyXG4gIHVuUGF0Y2hBbGxDU1MoKSB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmFjb3JkLS1pbmplY3RlZC1jc3NcIikuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgZWxlbWVudC5yZW1vdmUoKTtcclxuICAgIH0pXHJcbiAgfVxyXG59IiwgImV4cG9ydCBkZWZhdWx0IGBcbkBrZXlmcmFtZXMgYWNvcmRMb2FkaW5nRmFkZXswJXtvcGFjaXR5Oi4xfTEwMCV7b3BhY2l0eTouOX19LmFjb3JkLS1zdGFydHVwLWxvYWRpbmd7YW5pbWF0aW9uOmFjb3JkTG9hZGluZ0ZhZGUgLjVzIGFsdGVybmF0ZSBpbmZpbml0ZSBsaW5lYXI7cG9zaXRpb246YWJzb2x1dGU7dHJhbnNpdGlvbjphbGwgLjVzIGxpbmVhcjtyaWdodDo4cHg7Ym90dG9tOjhweDt3aWR0aDoxNnB4O2hlaWdodDoxNnB4O2JhY2tncm91bmQtaW1hZ2U6dXJsKFwiaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL0Fjb3JkUGx1Z2luL2Fzc2V0cy9tYWluL0Fjb3JkLnN2Z1wiKTtmaWx0ZXI6Z3JheXNjYWxlKDEpIGJyaWdodG5lc3MoMSk7YmFja2dyb3VuZC1wb3NpdGlvbjpjZW50ZXI7YmFja2dyb3VuZC1yZXBlYXQ6bm8tcmVwZWF0O2JhY2tncm91bmQtc2l6ZTpjb250YWluO3otaW5kZXg6OTk5OTk5fS5hY29yZC0tc3RhcnR1cC1sb2FkaW5nLmhpZGRlbntvcGFjaXR5OjAgIWltcG9ydGFudH1gO1xuIiwgImltcG9ydCBkb20gZnJvbSBcIi4uLy4uL2FwaS9kb20vaW5kZXguanNcIjtcclxuaW1wb3J0IHBhdGNoZXIgZnJvbSBcIi4uLy4uL2FwaS9wYXRjaGVyL2luZGV4LmpzXCI7XHJcblxyXG5pbXBvcnQgY3NzVGV4dCBmcm9tIFwiLi9zdHlsZS5zY3NzXCI7XHJcbmxldCB1bkluamVjdDtcclxuXHJcbmFzeW5jIGZ1bmN0aW9uIHNob3coKSB7XHJcbiAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWNvcmQtLXN0YXJ0dXAtbG9hZGluZ1wiKSkgcmV0dXJuO1xyXG4gIHdoaWxlICh0cnVlKSB7XHJcbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhcHAtbW91bnRcIikpIGJyZWFrO1xyXG4gICAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgMTAwKSk7XHJcbiAgfVxyXG4gIGNvbnNvbGUubG9nKFwiYWNvcmQtLXN0YXJ0dXAtbG9hZGluZ1wiKTtcclxuICB1bkluamVjdCA9IHBhdGNoZXIuaW5qZWN0Q1NTKGNzc1RleHQpO1xyXG4gIGNvbnN0IGVsZW1lbnQgPSBkb20ucGFyc2UoYFxyXG4gICAgPGRpdiBjbGFzcz1cImFjb3JkLS1zdGFydHVwLWxvYWRpbmdcIj48L2Rpdj5cclxuICBgKVxyXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYXBwLW1vdW50XCIpLmFwcGVuZENoaWxkKGVsZW1lbnQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBoaWRlKCkge1xyXG4gIGxldCBlbG0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFjb3JkLS1zdGFydHVwLWxvYWRpbmdcIik7XHJcbiAgaWYgKGVsbSkge1xyXG4gICAgZWxtLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgZWxtLnJlbW92ZSgpO1xyXG4gICAgICB1bkluamVjdD8uKCk7XHJcbiAgICAgIHVuSW5qZWN0ID0gbnVsbDtcclxuICAgIH0sIDUwMCk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgc2hvdyxcclxuICBoaWRlXHJcbn0iLCAibGV0IGRldk1vZGVFbmFibGVkID0gZmFsc2U7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgZ2V0IGVuYWJsZWQoKSB7XHJcbiAgICByZXR1cm4gZGV2TW9kZUVuYWJsZWQ7XHJcbiAgfSxcclxuICBzZXQgZW5hYmxlZCh2YWx1ZSkge1xyXG4gICAgaWYgKCFnbG9iYWxUaGlzW1wiPFBSRUxPQURfS0VZPlwiXS5pc0RldlRvb2xzT3BlbigpKSB0aHJvdyBuZXcgRXJyb3IoXCJEZXYgbW9kZSBzdGF0dXMgY2FuIG9ubHkgYmUgbW9kaWZpZWQgd2hlbiBEZXZUb29scyBpcyBvcGVuIVwiKTtcclxuICAgIGRldk1vZGVFbmFibGVkID0gdmFsdWU7XHJcbiAgfVxyXG59XHJcblxyXG4vLyBUT0RPOiBhZGQgbGl2ZSBkZXZlbG9wbWVudCBtb2RlIiwgImltcG9ydCAqIGFzIG5lc3RzIGZyb20gXCJuZXN0c1wiO1xyXG5pbXBvcnQgKiBhcyBpZGJLZXl2YWwgZnJvbSBcImlkYi1rZXl2YWxcIjtcclxuaW1wb3J0IHsgZGVDeWNsZWQsIHJldml2ZSB9IGZyb20gXCIuLi8uLi9saWIvanNvbi1kZWN5Y2xlZFwiO1xyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgYXN5bmMgY3JlYXRlUGVyc2lzdE5lc3Qoc3VmZml4KSB7XHJcbiAgICBsZXQgY2FjaGVkID0gYXdhaXQgaWRiS2V5dmFsLmdldChgQWNvcmRTdG9yZTske3N1ZmZpeH1gKTtcclxuICAgIGlmICh0eXBlb2YgY2FjaGVkID09IFwic3RyaW5nXCIpIGNhY2hlZCA9IHJldml2ZShjYWNoZWQpO1xyXG4gICAgY29uc3QgbmVzdCA9IG5lc3RzLm1ha2UoY2FjaGVkID8/IHt9KTtcclxuXHJcbiAgICBjb25zdCBzYXZlID0gKCkgPT4ge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGlkYktleXZhbC5zZXQoYEFjb3JkU3RvcmU7JHtzdWZmaXh9YCwgZGVDeWNsZWQoeyAuLi5uZXN0Lmdob3N0IH0pKTtcclxuICAgICAgfSBjYXRjaCB7XHJcbiAgICAgICAgaWRiS2V5dmFsLnNldChgQWNvcmRTdG9yZTske3N1ZmZpeH1gLCBkZUN5Y2xlZCh7fSkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbmVzdC5vbihuZXN0cy5FdmVudHMuU0VULCBzYXZlKTtcclxuICAgIG5lc3Qub24obmVzdHMuRXZlbnRzLlVQREFURSwgc2F2ZSk7XHJcbiAgICBuZXN0Lm9uKG5lc3RzLkV2ZW50cy5ERUxFVEUsIHNhdmUpO1xyXG5cclxuICAgIHJldHVybiBuZXN0O1xyXG4gIH1cclxufSIsICJmdW5jdGlvbiBwcm9taXNpZnlSZXF1ZXN0KHJlcXVlc3QpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAvLyBAdHMtaWdub3JlIC0gZmlsZSBzaXplIGhhY2tzXG4gICAgICAgIHJlcXVlc3Qub25jb21wbGV0ZSA9IHJlcXVlc3Qub25zdWNjZXNzID0gKCkgPT4gcmVzb2x2ZShyZXF1ZXN0LnJlc3VsdCk7XG4gICAgICAgIC8vIEB0cy1pZ25vcmUgLSBmaWxlIHNpemUgaGFja3NcbiAgICAgICAgcmVxdWVzdC5vbmFib3J0ID0gcmVxdWVzdC5vbmVycm9yID0gKCkgPT4gcmVqZWN0KHJlcXVlc3QuZXJyb3IpO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gY3JlYXRlU3RvcmUoZGJOYW1lLCBzdG9yZU5hbWUpIHtcbiAgICBjb25zdCByZXF1ZXN0ID0gaW5kZXhlZERCLm9wZW4oZGJOYW1lKTtcbiAgICByZXF1ZXN0Lm9udXBncmFkZW5lZWRlZCA9ICgpID0+IHJlcXVlc3QucmVzdWx0LmNyZWF0ZU9iamVjdFN0b3JlKHN0b3JlTmFtZSk7XG4gICAgY29uc3QgZGJwID0gcHJvbWlzaWZ5UmVxdWVzdChyZXF1ZXN0KTtcbiAgICByZXR1cm4gKHR4TW9kZSwgY2FsbGJhY2spID0+IGRicC50aGVuKChkYikgPT4gY2FsbGJhY2soZGIudHJhbnNhY3Rpb24oc3RvcmVOYW1lLCB0eE1vZGUpLm9iamVjdFN0b3JlKHN0b3JlTmFtZSkpKTtcbn1cbmxldCBkZWZhdWx0R2V0U3RvcmVGdW5jO1xuZnVuY3Rpb24gZGVmYXVsdEdldFN0b3JlKCkge1xuICAgIGlmICghZGVmYXVsdEdldFN0b3JlRnVuYykge1xuICAgICAgICBkZWZhdWx0R2V0U3RvcmVGdW5jID0gY3JlYXRlU3RvcmUoJ2tleXZhbC1zdG9yZScsICdrZXl2YWwnKTtcbiAgICB9XG4gICAgcmV0dXJuIGRlZmF1bHRHZXRTdG9yZUZ1bmM7XG59XG4vKipcbiAqIEdldCBhIHZhbHVlIGJ5IGl0cyBrZXkuXG4gKlxuICogQHBhcmFtIGtleVxuICogQHBhcmFtIGN1c3RvbVN0b3JlIE1ldGhvZCB0byBnZXQgYSBjdXN0b20gc3RvcmUuIFVzZSB3aXRoIGNhdXRpb24gKHNlZSB0aGUgZG9jcykuXG4gKi9cbmZ1bmN0aW9uIGdldChrZXksIGN1c3RvbVN0b3JlID0gZGVmYXVsdEdldFN0b3JlKCkpIHtcbiAgICByZXR1cm4gY3VzdG9tU3RvcmUoJ3JlYWRvbmx5JywgKHN0b3JlKSA9PiBwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLmdldChrZXkpKSk7XG59XG4vKipcbiAqIFNldCBhIHZhbHVlIHdpdGggYSBrZXkuXG4gKlxuICogQHBhcmFtIGtleVxuICogQHBhcmFtIHZhbHVlXG4gKiBAcGFyYW0gY3VzdG9tU3RvcmUgTWV0aG9kIHRvIGdldCBhIGN1c3RvbSBzdG9yZS4gVXNlIHdpdGggY2F1dGlvbiAoc2VlIHRoZSBkb2NzKS5cbiAqL1xuZnVuY3Rpb24gc2V0KGtleSwgdmFsdWUsIGN1c3RvbVN0b3JlID0gZGVmYXVsdEdldFN0b3JlKCkpIHtcbiAgICByZXR1cm4gY3VzdG9tU3RvcmUoJ3JlYWR3cml0ZScsIChzdG9yZSkgPT4ge1xuICAgICAgICBzdG9yZS5wdXQodmFsdWUsIGtleSk7XG4gICAgICAgIHJldHVybiBwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLnRyYW5zYWN0aW9uKTtcbiAgICB9KTtcbn1cbi8qKlxuICogU2V0IG11bHRpcGxlIHZhbHVlcyBhdCBvbmNlLiBUaGlzIGlzIGZhc3RlciB0aGFuIGNhbGxpbmcgc2V0KCkgbXVsdGlwbGUgdGltZXMuXG4gKiBJdCdzIGFsc28gYXRvbWljIFx1MjAxMyBpZiBvbmUgb2YgdGhlIHBhaXJzIGNhbid0IGJlIGFkZGVkLCBub25lIHdpbGwgYmUgYWRkZWQuXG4gKlxuICogQHBhcmFtIGVudHJpZXMgQXJyYXkgb2YgZW50cmllcywgd2hlcmUgZWFjaCBlbnRyeSBpcyBhbiBhcnJheSBvZiBgW2tleSwgdmFsdWVdYC5cbiAqIEBwYXJhbSBjdXN0b21TdG9yZSBNZXRob2QgdG8gZ2V0IGEgY3VzdG9tIHN0b3JlLiBVc2Ugd2l0aCBjYXV0aW9uIChzZWUgdGhlIGRvY3MpLlxuICovXG5mdW5jdGlvbiBzZXRNYW55KGVudHJpZXMsIGN1c3RvbVN0b3JlID0gZGVmYXVsdEdldFN0b3JlKCkpIHtcbiAgICByZXR1cm4gY3VzdG9tU3RvcmUoJ3JlYWR3cml0ZScsIChzdG9yZSkgPT4ge1xuICAgICAgICBlbnRyaWVzLmZvckVhY2goKGVudHJ5KSA9PiBzdG9yZS5wdXQoZW50cnlbMV0sIGVudHJ5WzBdKSk7XG4gICAgICAgIHJldHVybiBwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLnRyYW5zYWN0aW9uKTtcbiAgICB9KTtcbn1cbi8qKlxuICogR2V0IG11bHRpcGxlIHZhbHVlcyBieSB0aGVpciBrZXlzXG4gKlxuICogQHBhcmFtIGtleXNcbiAqIEBwYXJhbSBjdXN0b21TdG9yZSBNZXRob2QgdG8gZ2V0IGEgY3VzdG9tIHN0b3JlLiBVc2Ugd2l0aCBjYXV0aW9uIChzZWUgdGhlIGRvY3MpLlxuICovXG5mdW5jdGlvbiBnZXRNYW55KGtleXMsIGN1c3RvbVN0b3JlID0gZGVmYXVsdEdldFN0b3JlKCkpIHtcbiAgICByZXR1cm4gY3VzdG9tU3RvcmUoJ3JlYWRvbmx5JywgKHN0b3JlKSA9PiBQcm9taXNlLmFsbChrZXlzLm1hcCgoa2V5KSA9PiBwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLmdldChrZXkpKSkpKTtcbn1cbi8qKlxuICogVXBkYXRlIGEgdmFsdWUuIFRoaXMgbGV0cyB5b3Ugc2VlIHRoZSBvbGQgdmFsdWUgYW5kIHVwZGF0ZSBpdCBhcyBhbiBhdG9taWMgb3BlcmF0aW9uLlxuICpcbiAqIEBwYXJhbSBrZXlcbiAqIEBwYXJhbSB1cGRhdGVyIEEgY2FsbGJhY2sgdGhhdCB0YWtlcyB0aGUgb2xkIHZhbHVlIGFuZCByZXR1cm5zIGEgbmV3IHZhbHVlLlxuICogQHBhcmFtIGN1c3RvbVN0b3JlIE1ldGhvZCB0byBnZXQgYSBjdXN0b20gc3RvcmUuIFVzZSB3aXRoIGNhdXRpb24gKHNlZSB0aGUgZG9jcykuXG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZShrZXksIHVwZGF0ZXIsIGN1c3RvbVN0b3JlID0gZGVmYXVsdEdldFN0b3JlKCkpIHtcbiAgICByZXR1cm4gY3VzdG9tU3RvcmUoJ3JlYWR3cml0ZScsIChzdG9yZSkgPT4gXG4gICAgLy8gTmVlZCB0byBjcmVhdGUgdGhlIHByb21pc2UgbWFudWFsbHkuXG4gICAgLy8gSWYgSSB0cnkgdG8gY2hhaW4gcHJvbWlzZXMsIHRoZSB0cmFuc2FjdGlvbiBjbG9zZXMgaW4gYnJvd3NlcnNcbiAgICAvLyB0aGF0IHVzZSBhIHByb21pc2UgcG9seWZpbGwgKElFMTAvMTEpLlxuICAgIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgc3RvcmUuZ2V0KGtleSkub25zdWNjZXNzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBzdG9yZS5wdXQodXBkYXRlcih0aGlzLnJlc3VsdCksIGtleSk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLnRyYW5zYWN0aW9uKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSkpO1xufVxuLyoqXG4gKiBEZWxldGUgYSBwYXJ0aWN1bGFyIGtleSBmcm9tIHRoZSBzdG9yZS5cbiAqXG4gKiBAcGFyYW0ga2V5XG4gKiBAcGFyYW0gY3VzdG9tU3RvcmUgTWV0aG9kIHRvIGdldCBhIGN1c3RvbSBzdG9yZS4gVXNlIHdpdGggY2F1dGlvbiAoc2VlIHRoZSBkb2NzKS5cbiAqL1xuZnVuY3Rpb24gZGVsKGtleSwgY3VzdG9tU3RvcmUgPSBkZWZhdWx0R2V0U3RvcmUoKSkge1xuICAgIHJldHVybiBjdXN0b21TdG9yZSgncmVhZHdyaXRlJywgKHN0b3JlKSA9PiB7XG4gICAgICAgIHN0b3JlLmRlbGV0ZShrZXkpO1xuICAgICAgICByZXR1cm4gcHJvbWlzaWZ5UmVxdWVzdChzdG9yZS50cmFuc2FjdGlvbik7XG4gICAgfSk7XG59XG4vKipcbiAqIERlbGV0ZSBtdWx0aXBsZSBrZXlzIGF0IG9uY2UuXG4gKlxuICogQHBhcmFtIGtleXMgTGlzdCBvZiBrZXlzIHRvIGRlbGV0ZS5cbiAqIEBwYXJhbSBjdXN0b21TdG9yZSBNZXRob2QgdG8gZ2V0IGEgY3VzdG9tIHN0b3JlLiBVc2Ugd2l0aCBjYXV0aW9uIChzZWUgdGhlIGRvY3MpLlxuICovXG5mdW5jdGlvbiBkZWxNYW55KGtleXMsIGN1c3RvbVN0b3JlID0gZGVmYXVsdEdldFN0b3JlKCkpIHtcbiAgICByZXR1cm4gY3VzdG9tU3RvcmUoJ3JlYWR3cml0ZScsIChzdG9yZSkgPT4ge1xuICAgICAgICBrZXlzLmZvckVhY2goKGtleSkgPT4gc3RvcmUuZGVsZXRlKGtleSkpO1xuICAgICAgICByZXR1cm4gcHJvbWlzaWZ5UmVxdWVzdChzdG9yZS50cmFuc2FjdGlvbik7XG4gICAgfSk7XG59XG4vKipcbiAqIENsZWFyIGFsbCB2YWx1ZXMgaW4gdGhlIHN0b3JlLlxuICpcbiAqIEBwYXJhbSBjdXN0b21TdG9yZSBNZXRob2QgdG8gZ2V0IGEgY3VzdG9tIHN0b3JlLiBVc2Ugd2l0aCBjYXV0aW9uIChzZWUgdGhlIGRvY3MpLlxuICovXG5mdW5jdGlvbiBjbGVhcihjdXN0b21TdG9yZSA9IGRlZmF1bHRHZXRTdG9yZSgpKSB7XG4gICAgcmV0dXJuIGN1c3RvbVN0b3JlKCdyZWFkd3JpdGUnLCAoc3RvcmUpID0+IHtcbiAgICAgICAgc3RvcmUuY2xlYXIoKTtcbiAgICAgICAgcmV0dXJuIHByb21pc2lmeVJlcXVlc3Qoc3RvcmUudHJhbnNhY3Rpb24pO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gZWFjaEN1cnNvcihzdG9yZSwgY2FsbGJhY2spIHtcbiAgICBzdG9yZS5vcGVuQ3Vyc29yKCkub25zdWNjZXNzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXRoaXMucmVzdWx0KVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjYWxsYmFjayh0aGlzLnJlc3VsdCk7XG4gICAgICAgIHRoaXMucmVzdWx0LmNvbnRpbnVlKCk7XG4gICAgfTtcbiAgICByZXR1cm4gcHJvbWlzaWZ5UmVxdWVzdChzdG9yZS50cmFuc2FjdGlvbik7XG59XG4vKipcbiAqIEdldCBhbGwga2V5cyBpbiB0aGUgc3RvcmUuXG4gKlxuICogQHBhcmFtIGN1c3RvbVN0b3JlIE1ldGhvZCB0byBnZXQgYSBjdXN0b20gc3RvcmUuIFVzZSB3aXRoIGNhdXRpb24gKHNlZSB0aGUgZG9jcykuXG4gKi9cbmZ1bmN0aW9uIGtleXMoY3VzdG9tU3RvcmUgPSBkZWZhdWx0R2V0U3RvcmUoKSkge1xuICAgIHJldHVybiBjdXN0b21TdG9yZSgncmVhZG9ubHknLCAoc3RvcmUpID0+IHtcbiAgICAgICAgLy8gRmFzdCBwYXRoIGZvciBtb2Rlcm4gYnJvd3NlcnNcbiAgICAgICAgaWYgKHN0b3JlLmdldEFsbEtleXMpIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLmdldEFsbEtleXMoKSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaXRlbXMgPSBbXTtcbiAgICAgICAgcmV0dXJuIGVhY2hDdXJzb3Ioc3RvcmUsIChjdXJzb3IpID0+IGl0ZW1zLnB1c2goY3Vyc29yLmtleSkpLnRoZW4oKCkgPT4gaXRlbXMpO1xuICAgIH0pO1xufVxuLyoqXG4gKiBHZXQgYWxsIHZhbHVlcyBpbiB0aGUgc3RvcmUuXG4gKlxuICogQHBhcmFtIGN1c3RvbVN0b3JlIE1ldGhvZCB0byBnZXQgYSBjdXN0b20gc3RvcmUuIFVzZSB3aXRoIGNhdXRpb24gKHNlZSB0aGUgZG9jcykuXG4gKi9cbmZ1bmN0aW9uIHZhbHVlcyhjdXN0b21TdG9yZSA9IGRlZmF1bHRHZXRTdG9yZSgpKSB7XG4gICAgcmV0dXJuIGN1c3RvbVN0b3JlKCdyZWFkb25seScsIChzdG9yZSkgPT4ge1xuICAgICAgICAvLyBGYXN0IHBhdGggZm9yIG1vZGVybiBicm93c2Vyc1xuICAgICAgICBpZiAoc3RvcmUuZ2V0QWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzaWZ5UmVxdWVzdChzdG9yZS5nZXRBbGwoKSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaXRlbXMgPSBbXTtcbiAgICAgICAgcmV0dXJuIGVhY2hDdXJzb3Ioc3RvcmUsIChjdXJzb3IpID0+IGl0ZW1zLnB1c2goY3Vyc29yLnZhbHVlKSkudGhlbigoKSA9PiBpdGVtcyk7XG4gICAgfSk7XG59XG4vKipcbiAqIEdldCBhbGwgZW50cmllcyBpbiB0aGUgc3RvcmUuIEVhY2ggZW50cnkgaXMgYW4gYXJyYXkgb2YgYFtrZXksIHZhbHVlXWAuXG4gKlxuICogQHBhcmFtIGN1c3RvbVN0b3JlIE1ldGhvZCB0byBnZXQgYSBjdXN0b20gc3RvcmUuIFVzZSB3aXRoIGNhdXRpb24gKHNlZSB0aGUgZG9jcykuXG4gKi9cbmZ1bmN0aW9uIGVudHJpZXMoY3VzdG9tU3RvcmUgPSBkZWZhdWx0R2V0U3RvcmUoKSkge1xuICAgIHJldHVybiBjdXN0b21TdG9yZSgncmVhZG9ubHknLCAoc3RvcmUpID0+IHtcbiAgICAgICAgLy8gRmFzdCBwYXRoIGZvciBtb2Rlcm4gYnJvd3NlcnNcbiAgICAgICAgLy8gKGFsdGhvdWdoLCBob3BlZnVsbHkgd2UnbGwgZ2V0IGEgc2ltcGxlciBwYXRoIHNvbWUgZGF5KVxuICAgICAgICBpZiAoc3RvcmUuZ2V0QWxsICYmIHN0b3JlLmdldEFsbEtleXMpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICAgICAgcHJvbWlzaWZ5UmVxdWVzdChzdG9yZS5nZXRBbGxLZXlzKCkpLFxuICAgICAgICAgICAgICAgIHByb21pc2lmeVJlcXVlc3Qoc3RvcmUuZ2V0QWxsKCkpLFxuICAgICAgICAgICAgXSkudGhlbigoW2tleXMsIHZhbHVlc10pID0+IGtleXMubWFwKChrZXksIGkpID0+IFtrZXksIHZhbHVlc1tpXV0pKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpdGVtcyA9IFtdO1xuICAgICAgICByZXR1cm4gY3VzdG9tU3RvcmUoJ3JlYWRvbmx5JywgKHN0b3JlKSA9PiBlYWNoQ3Vyc29yKHN0b3JlLCAoY3Vyc29yKSA9PiBpdGVtcy5wdXNoKFtjdXJzb3Iua2V5LCBjdXJzb3IudmFsdWVdKSkudGhlbigoKSA9PiBpdGVtcykpO1xuICAgIH0pO1xufVxuXG5leHBvcnQgeyBjbGVhciwgY3JlYXRlU3RvcmUsIGRlbCwgZGVsTWFueSwgZW50cmllcywgZ2V0LCBnZXRNYW55LCBrZXlzLCBwcm9taXNpZnlSZXF1ZXN0LCBzZXQsIHNldE1hbnksIHVwZGF0ZSwgdmFsdWVzIH07XG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5mdW5jdGlvbiBkZUN5Y2xlcih2YWwsIGNvbmZpZykge1xyXG4gIGNvbmZpZyA9IHR5cGVvZiBjb25maWcgPT09ICdudW1iZXInID8geyBkZWVwOiBjb25maWcgfSA6IChjb25maWcgfHwge30pO1xyXG4gIGNvbmZpZy5kZWVwID0gY29uZmlnLmRlZXAgfHwgMTA7XHJcbiAgcmV0dXJuIGRlY3ljbGVXYWxrZXIoW10sIFtdLCB2YWwsIGNvbmZpZyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRlQ3ljbGVkKHZhbCwgY29uZmlnKSB7XHJcbiAgY29uZmlnID0gdHlwZW9mIGNvbmZpZyA9PT0gJ251bWJlcicgPyB7IGRlZXA6IGNvbmZpZyB9IDogKGNvbmZpZyB8fCB7fSk7XHJcbiAgdmFsID0gZGVDeWNsZXIodmFsLCBjb25maWcpO1xyXG4gIHRyeSB7XHJcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodmFsLCB1bmRlZmluZWQsIGNvbmZpZy5zcGFjZXIpO1xyXG4gIH0gY2F0Y2ggKGUpIHtcclxuICAgIHJldHVybiBlO1xyXG4gIH1cclxufVxyXG5cclxudmFyIHJldml2ZXJEYXRlID0gL15cXFtEYXRlOigoXFxkezR9LVxcZHsyfS1cXGR7Mn0pW0EtWl0rKFxcZHsyfTpcXGR7Mn06XFxkezJ9KS4oWzAtOSstOl0rKVopXFxdJC87XHJcbnZhciByZXZpdmVyUmVnRXhwID0gL15cXFtSZWdleHA6XFwvKC4rKVxcL1xcXSQvO1xyXG52YXIgcmV2aXZlckVycm9yID0gL15cXFtFcnJvcjooW1xcV1xcd10rKVxcXSQvO1xyXG52YXIgcmV2aXZlckZ1bmN0aW9uID0gL15cXFtGdW5jdGlvbjooLispXFxdJC87XHJcbmZ1bmN0aW9uIHJldml2ZSh2YWwsIGZ1bmN0aW9ucykge1xyXG4gIHRyeSB7XHJcbiAgICByZXR1cm4gSlNPTi5wYXJzZSh2YWwsIHJldml2ZXIpO1xyXG4gIH0gY2F0Y2ggKGUpIHtcclxuICAgIHJldHVybiBlO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcmV2aXZlcihrZXksIHZhbCkge1xyXG4gICAgaWYgKHJldml2ZXJEYXRlLnRlc3QodmFsKSkge1xyXG4gICAgICB2YWwgPSByZXZpdmVyRGF0ZS5leGVjKHZhbCk7XHJcbiAgICAgIHZhbCA9IG5ldyBEYXRlKHZhbFsxXSk7XHJcbiAgICAgIHJldHVybiBuZXcgRGF0ZSh2YWwpO1xyXG4gICAgfSBlbHNlIGlmIChyZXZpdmVyUmVnRXhwLnRlc3QodmFsKSkge1xyXG4gICAgICB2YWwgPSByZXZpdmVyUmVnRXhwLmV4ZWModmFsKVsxXTtcclxuICAgICAgcmV0dXJuIG5ldyBSZWdFeHAodmFsKTtcclxuICAgIH0gZWxzZSBpZiAocmV2aXZlckVycm9yLnRlc3QodmFsKSkge1xyXG4gICAgICB2YWwgPSByZXZpdmVyRXJyb3IuZXhlYyh2YWwpWzFdO1xyXG4gICAgICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IodmFsLnNwbGl0KCdcXG4nKVswXSk7XHJcbiAgICAgIGlmIChlcnJvci5zdGFjaykge1xyXG4gICAgICAgIGVycm9yLnN0YWNrID0gdmFsO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBlcnJvcjtcclxuICAgIH0gZWxzZSBpZiAoZnVuY3Rpb25zICYmIHJldml2ZXJGdW5jdGlvbi50ZXN0KHZhbCkpIHtcclxuICAgICAgdmFsID0gcmV2aXZlckZ1bmN0aW9uLmV4ZWModmFsKVsxXTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICByZXR1cm4gKG5ldyBGdW5jdGlvbihcInJldHVybiBcIiArIHZhbCArIFwiO1wiKSkoKTtcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICByZXR1cm4gZXJyb3I7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB2YWw7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBkZWN5Y2xlV2Fsa2VyKHBhcmVudHMsIHBhdGgsIHZhbCwgY29uZmlnKSB7XHJcbiAgaWYgKFsndW5kZWZpbmVkJywgJ251bWJlcicsICdib29sZWFuJywgJ3N0cmluZyddLmluZGV4T2YodHlwZW9mIHZhbCkgPj0gMCB8fCB2YWwgPT09IG51bGwpIHtcclxuICAgIHJldHVybiB2YWw7XHJcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnb2JqZWN0JyAmJiB2YWwuY29uc3RydWN0b3IgPT09IERhdGUpIHtcclxuICAgIHJldHVybiBjb25maWcuZGF0ZXMgIT09IGZhbHNlID8gJ1tEYXRlOicgKyB2YWwudG9JU09TdHJpbmcoKSArICddJyA6IHZhbDtcclxuICAgIC8vdmFsLmZvcm1hdCgne1lZWVl9L3tNTX0ve0REfSB7aGh9OnttbX06e3NzfSBVVEM6XHUwMEI3e3BhcmFtcy50ej49MD9cIitcIitwYXJhbXMudHo6cGFyYW1zLnR6fVx1MDBCNycpO1xyXG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ29iamVjdCcgJiYgdmFsLmNvbnN0cnVjdG9yID09PSBSZWdFeHApIHtcclxuICAgIHJldHVybiBjb25maWcucmVnZXhwcyAhPT0gZmFsc2UgPyAnW1JlZ2V4cDonICsgdmFsLnRvU3RyaW5nKCkgKyAnXScgOiB2YWw7XHJcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnb2JqZWN0JyAmJiB2YWwuY29uc3RydWN0b3IgJiYgdHlwZW9mIHZhbC5jb25zdHJ1Y3Rvci5uYW1lID09PSAnc3RyaW5nJyAmJiB2YWwuY29uc3RydWN0b3IubmFtZS5zbGljZSgtNSkgPT09ICdFcnJvcicpIHtcclxuICAgIHZhciBzdGFjayA9ICh2YWwuc3RhY2sgfHwgJycpLnNwbGl0KCdcXG4nKS5zbGljZSgxKTtcclxuICAgIHZhciBtZXNzYWdlID0gKHZhbC5tZXNzYWdlIHx8IHZhbC50b1N0cmluZygpKTtcclxuICAgIHZhciBlcnJvciA9IG1lc3NhZ2UgKyBcIlxcblwiICsgc3RhY2s7XHJcbiAgICByZXR1cm4gY29uZmlnLmVycm9ycyAhPT0gZmFsc2UgPyAnW0Vycm9yOicgKyBlcnJvciArICddJyA6IHZhbDtcclxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSB7XHJcbiAgICBpZiAocGFyZW50cy5pbmRleE9mKHZhbCkgPj0gMCkge1xyXG4gICAgICB2YXIgcG9pbnQgPSBwYXRoLnNsaWNlKDAsIHBhcmVudHMuaW5kZXhPZih2YWwpKS5qb2luKCcuJyk7XHJcbiAgICAgIHJldHVybiAnW0NpcmN1bGFyJyArIChwb2ludCA/ICc6JyArIHBvaW50IDogJycpICsgJ10nO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFyIGNvcHksIGksIGssIGw7XHJcbiAgICAgIGlmICh2YWwuY29uc3RydWN0b3IgJiYgdHlwZW9mIHZhbC5jb25zdHJ1Y3Rvci5uYW1lID09PSAnc3RyaW5nJyAmJiB2YWwuY29uc3RydWN0b3IubmFtZS5zbGljZSgtNSkgPT09ICdBcnJheScpIHtcclxuICAgICAgICBpZiAocGFyZW50cy5sZW5ndGggPj0gY29uZmlnLmRlZXApIHtcclxuICAgICAgICAgIHJldHVybiAnW0FycmF5OicgKyB2YWwuY29uc3RydWN0b3IubmFtZSArICddJztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29weSA9IFtdO1xyXG4gICAgICAgICAgZm9yIChpID0gMCwgbCA9IHZhbC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICAgICAgY29weVtpXSA9IGRlY3ljbGVXYWxrZXIocGFyZW50cy5jb25jYXQoW3ZhbF0pLCBwYXRoLmNvbmNhdChpKSwgdmFsW2ldLCBjb25maWcpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIGNvcHk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChwYXJlbnRzLmxlbmd0aCA+PSBjb25maWcuZGVlcCkge1xyXG4gICAgICAgICAgcmV0dXJuICdbT2JqZWN0OicgKyAodmFsLmNvbnN0cnVjdG9yICYmIHZhbC5jb25zdHJ1Y3Rvci5uYW1lID8gdmFsLmNvbnN0cnVjdG9yLm5hbWUgOiAnT2JqZWN0JykgKyAnXSc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvcHkgPSB7fTtcclxuICAgICAgICAgIGZvciAoaSA9IDAsIGsgPSBPYmplY3Qua2V5cyh2YWwpLCBsID0gay5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICAgICAgY29weVtrW2ldXSA9IGRlY3ljbGVXYWxrZXIocGFyZW50cy5jb25jYXQoW3ZhbF0pLCBwYXRoLmNvbmNhdChba1tpXV0pLCB2YWxba1tpXV0sIGNvbmZpZyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gY29weTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicpIHtcclxuICAgIHJldHVybiBjb25maWcuZnVuY3Rpb25zID09PSB0cnVlID8gJ1tGdW5jdGlvbjonICsgdmFsLnRvU3RyaW5nKCkgKyAnXScgOiB1bmRlZmluZWQ7XHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiB2YWwudG9TdHJpbmcoKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7XHJcbiAgZGVDeWNsZXIsXHJcbiAgZGVDeWNsZWQsXHJcbiAgcmV2aXZlXHJcbn0iLCAiaW1wb3J0IGkxOG4gZnJvbSBcIi4uL2kxOG5cIjtcclxuaW1wb3J0IHV0aWxzIGZyb20gXCIuLi91dGlsc1wiO1xyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSB7eyBpMThuOiBzdHJpbmcgfCB7IFtsYW5nOiBzdHJpbmddOiB7IFtrOiBzdHJpbmddOiBzdHJpbmcgfSB9fX0gY2ZnIFxyXG4gKiBAcmV0dXJucyBcclxuICovXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBidWlsZEV4dGVuc2lvbkkxOE4oY2ZnKSB7XHJcbiAgaWYgKCFjZmc/LmkxOG4pIHJldHVybiBudWxsO1xyXG4gIGxldCBvdXQgPSB7XHJcbiAgICBfX2NhY2hlX186IHtcclxuICAgICAgbG9jYWxlSWRzOiBbXSxcclxuICAgICAgbG9jYWxpemF0aW9uczoge31cclxuICAgIH0sXHJcbiAgICBmb3JtYXQoa2V5LCAuLi5hcmdzKSB7XHJcbiAgICAgIHJldHVybiB1dGlscy5mb3JtYXQob3V0LmdldChrZXkpLCAuLi5hcmdzKTtcclxuICAgIH0sXHJcbiAgICBnZXQoa2V5KSB7XHJcbiAgICAgIGlmICh0eXBlb2YgY2ZnLmkxOG4gPT09IFwic3RyaW5nXCIpIGNoZWNrKCk7XHJcbiAgICAgIHJldHVybiBvdXQuX19jYWNoZV9fLmxvY2FsaXphdGlvbnNbb3V0LmxvY2FsZV0/LltrZXldXHJcbiAgICAgICAgfHwgb3V0Ll9fY2FjaGVfXy5sb2NhbGl6YXRpb25zLmRlZmF1bHQ/LltrZXldXHJcbiAgICAgICAgfHwgb3V0LmdldChrZXkpO1xyXG4gICAgfSxcclxuICAgIG1lc3NhZ2VzOiBuZXcgUHJveHkoe30sIHtcclxuICAgICAgZ2V0KF8sIHByb3ApIHtcclxuICAgICAgICByZXR1cm4gb3V0LmdldChwcm9wKTtcclxuICAgICAgfVxyXG4gICAgfSksXHJcbiAgfVxyXG4gIGFzeW5jIGZ1bmN0aW9uIGNoZWNrKCkge1xyXG4gICAgY29uc3QgbG9jYWxlID0gaTE4bi5sb2NhbGU7XHJcbiAgICBpZiAodHlwZW9mIGNmZy5pMThuID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgIGNvbnN0IEJBU0VfVVJMID0gY2ZnLmkxOG4uZW5kc1dpdGgoXCIvXCIpID8gY2ZnLmkxOG4uc2xpY2UoMCwgLTEpIDogY2ZnLmkxOG47XHJcbiAgICAgIGlmICghb3V0Ll9fY2FjaGVfXy5sb2NhbGVJZHMubGVuZ3RoKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIG91dC5fX2NhY2hlX18ubG9jYWxlSWRzID0gYXdhaXQgKGF3YWl0IGZldGNoKGAke0JBU0VfVVJMfS9sb2NhbGVzLmpzb25gLCBub1N0b3JlKSkuanNvbigpO1xyXG4gICAgICAgIH0gY2F0Y2ggeyB9XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIG91dC5fX2NhY2hlX18ubG9jYWxpemF0aW9ucy5kZWZhdWx0ID0gYXdhaXQgKGF3YWl0IGZldGNoKGAke0JBU0VfVVJMfS9kZWZhdWx0Lmpzb25gLCBub1N0b3JlKSkuanNvbigpO1xyXG4gICAgICAgIH0gY2F0Y2ggeyB9XHJcbiAgICAgIH1cclxuICAgICAgaWYgKFxyXG4gICAgICAgIG91dC5fX2NhY2hlX18ubG9jYWxlSWRzLmluY2x1ZGVzKGxvY2FsZSlcclxuICAgICAgICAmJiAhb3V0Ll9fY2FjaGVfXy5sb2NhbGl6YXRpb25zPy5bbG9jYWxlXVxyXG4gICAgICApIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgb3V0Ll9fY2FjaGVfXy5sb2NhbGl6YXRpb25zW2xvY2FsZV0gPSBhd2FpdCAoYXdhaXQgZmV0Y2goYCR7QkFTRV9VUkx9LyR7bG9jYWxlfS5qc29uYCwgbm9TdG9yZSkpLmpzb24oKTtcclxuICAgICAgICB9IGNhdGNoIHsgfTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgb3V0Ll9fY2FjaGVfXy5sb2NhbGVJZHMgPSBPYmplY3Qua2V5cyhjZmcuaTE4bik7XHJcbiAgICAgIG91dC5fX2NhY2hlX18ubG9jYWxpemF0aW9ucyA9IGNmZy5pMThuO1xyXG4gICAgfVxyXG4gIH1cclxuICBhd2FpdCBjaGVjaygpO1xyXG4gIHJldHVybiBvdXQ7XHJcbn0iLCAiaW1wb3J0IHsgQmFzaWNFdmVudEVtaXR0ZXIgfSBmcm9tIFwiLi4vLi4vbGliL0Jhc2ljRXZlbnRFbWl0dGVyLmpzXCI7XHJcbmltcG9ydCBkZXYgZnJvbSBcIi4uL2Rldi9pbmRleC5qc1wiO1xyXG5pbXBvcnQgaTE4biBmcm9tIFwiLi4vaTE4bi9pbmRleC5qc1wiO1xyXG5pbXBvcnQgbW9kdWxlcyBmcm9tIFwiLi4vbW9kdWxlcy9pbmRleC5qc1wiO1xyXG5pbXBvcnQgc3RvcmFnZSBmcm9tIFwiLi4vc3RvcmFnZS9pbmRleC5qc1wiO1xyXG5pbXBvcnQgeyBidWlsZEV4dGVuc2lvbkkxOE4gfSBmcm9tIFwiLi9pMThuLmpzXCI7XHJcbmltcG9ydCAqIGFzIG5lc3RzIGZyb20gXCJuZXN0c1wiO1xyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSB7eyBtb2R1bGVzOiB7IG5vZGU6IHsgbmFtZTogc3RyaW5nLCByZWFzb246IHN0cmluZyB9W10sIGNvbW1vbjogeyBuYW1lOiBzdHJpbmcsIHJlYXNvbjogc3RyaW5nIH1bXSwgY3VzdG9tOiB7IHJlYXNvbjogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIGxhenk6IGJvb2xlYW4sIGZpbmRlcjogeyBmaWx0ZXI6IHsgZXhwb3J0OiBib29sZWFuLCBpbjogXCJwcm9wZXJ0aWVzXCIgfCBcInN0cmluZ3NcIiB8IFwicHJvdG90eXBlc1wiLCBieTogW3N0cmluZ1tdLCBzdHJpbmdbXT9dIH0sIHBhdGg6IHsgYmVmb3JlOiBzdHJpbmcgfCBzdHJpbmdbXSwgYWZ0ZXI6IHN0cmluZyB8IHN0cmluZ1tdIH0sIG1hcDogeyBbazogc3RyaW5nXTogc3RyaW5nW10gfSB9IH1bXSB9LCBhYm91dDogeyBuYW1lOiBzdHJpbmcgfCB7IFtrOiBzdHJpbmddOiBzdHJpbmcgfSwgZGVzY3JpcHRpb246IHN0cmluZyB8IHsgW2s6IHN0cmluZ106IHN0cmluZyB9LCBzbHVnOiBzdHJpbmcgfSwgcmVhc29uOiBzdHJpbmcgfX0gY2ZnIFxyXG4gKi9cclxuYXN5bmMgZnVuY3Rpb24gYnVpbGRBUEkoY2ZnKSB7XHJcbiAgY29uc3QgcGVyc2lzdCA9IGF3YWl0IHN0b3JhZ2UuY3JlYXRlUGVyc2lzdE5lc3QoYEV4dGVuc2lvbjtQZXJzaXN0OyR7Y2ZnLmFib3V0LnNsdWd9YCk7XHJcbiAgY29uc3Qgb3V0ID0ge1xyXG4gICAgbW9kdWxlczoge1xyXG4gICAgICBfX2NhY2hlX186IHtcclxuICAgICAgICBjb21tb246IHt9LFxyXG4gICAgICAgIG5vZGU6IHt9LFxyXG4gICAgICAgIGN1c3RvbToge30sXHJcbiAgICAgICAgY3VzdG9tTGF6eToge31cclxuICAgICAgfSxcclxuICAgICAgcmVxdWlyZShuYW1lKSB7XHJcbiAgICAgICAgaWYgKCFkZXYuZW5hYmxlZCkge1xyXG4gICAgICAgICAgaWYgKHR5cGVvZiBvdXQubW9kdWxlcy5fX2NhY2hlX18ubm9kZVtuYW1lXSAhPT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIG91dC5tb2R1bGVzLl9fY2FjaGVfXy5ub2RlW25hbWVdO1xyXG4gICAgICAgICAgaWYgKGNmZz8ubW9kdWxlcz8ubm9kZT8uc29tZT8uKGkgPT4gaS5uYW1lID09PSBuYW1lKSkgcmV0dXJuIG91dC5tb2R1bGVzLl9fY2FjaGVfXy5ub2RlW25hbWVdID0gbW9kdWxlcy5yZXF1aXJlKG5hbWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZXR1cm4gbW9kdWxlcy5yZXF1aXJlKG5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgfSxcclxuICAgICAgY29tbW9uOiBuZXcgUHJveHkoe30sIHtcclxuICAgICAgICBnZXQoXywgcHJvcCkge1xyXG4gICAgICAgICAgaWYgKCFkZXYuZW5hYmxlZCkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIG91dC5tb2R1bGVzLl9fY2FjaGVfXy5jb21tb25bcHJvcF0gIT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBvdXQubW9kdWxlcy5fX2NhY2hlX18uY29tbW9uW3Byb3BdO1xyXG4gICAgICAgICAgICBpZiAoY2ZnPy5tb2R1bGVzPy5jb21tb24/LnNvbWU/LihpID0+IGkubmFtZSA9PT0gcHJvcCkpIHJldHVybiBvdXQubW9kdWxlcy5fX2NhY2hlX18uY29tbW9uW3Byb3BdID0gbW9kdWxlcy5jb21tb25bcHJvcF07XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbW9kdWxlcy5jb21tb25bcHJvcF07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9LFxyXG4gICAgICB9KSxcclxuICAgICAgY3VzdG9tOiBuZXcgUHJveHkoe30sIHtcclxuICAgICAgICBnZXQoXywgcHJvcCkge1xyXG4gICAgICAgICAgaWYgKHR5cGVvZiBvdXQubW9kdWxlcy5fX2NhY2hlX18uY3VzdG9tW3Byb3BdICE9PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gb3V0Lm1vZHVsZXMuX19jYWNoZV9fLmN1c3RvbVtwcm9wXTtcclxuICAgICAgICAgIGxldCBkYXRhID0gY2ZnPy5tb2R1bGVzPy5jdXN0b20/LnNvbWU/LihpID0+IGkubmFtZSA9PT0gcHJvcCk7XHJcbiAgICAgICAgICBpZiAoIWRhdGEpIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgaWYgKGRhdGEubGF6eSkge1xyXG4gICAgICAgICAgICBsZXQgcHJvbSA9IG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgICBsZXQgciA9IGF3YWl0IG1vZHVsZXMud2VicGFjay5sYXp5RmluZEJ5RmluZGVyKGRhdGEuZmluZGVyKTtcclxuICAgICAgICAgICAgICBvdXQubW9kdWxlcy5fX2NhY2hlX18uY3VzdG9tTGF6eVtwcm9wXSA9IHI7XHJcbiAgICAgICAgICAgICAgcmVzb2x2ZShyKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG91dC5tb2R1bGVzLl9fY2FjaGVfXy5jdXN0b21bcHJvcF0gPSB7XHJcbiAgICAgICAgICAgICAgZ2V0KCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb207XHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBnZXQgdmFsdWUoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb3V0Lm1vZHVsZXMuX19jYWNoZV9fLmN1c3RvbUxhenlbcHJvcF07XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IHZhbHVlID0gbW9kdWxlcy53ZWJwYWNrLmZpbmRCeUZpbmRlcihkYXRhLmZpbmRlcik7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZT8udmFsdWUgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgIG91dC5tb2R1bGVzLl9fY2FjaGVfXy5jdXN0b21bcHJvcF0gPSB2YWx1ZSA/IE9iamVjdC5hc3NpZ24odmFsdWUsIHsgdmFsdWUsIGdldCgpIHsgcmV0dXJuIHZhbHVlIH0gfSkgOiBudWxsO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBvdXQubW9kdWxlcy5fX2NhY2hlX18uY3VzdG9tW3Byb3BdID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGNhdGNoIHtcclxuICAgICAgICAgICAgICBvdXQubW9kdWxlcy5fX2NhY2hlX18uY3VzdG9tW3Byb3BdID0gdmFsdWUgPyB7IHZhbHVlLCBnZXQoKSB7IHJldHVybiB2YWx1ZSB9IH0gOiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gb3V0Lm1vZHVsZXMuX19jYWNoZV9fLmN1c3RvbVtwcm9wXTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pLFxyXG4gICAgfSxcclxuICAgIGkxOG4sXHJcbiAgICBleHRlbnNpb246IHtcclxuICAgICAgY29uZmlnOiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGNmZykpLFxyXG4gICAgICBwZXJzaXN0LFxyXG4gICAgICBpMThuOiBhd2FpdCBidWlsZEV4dGVuc2lvbkkxOE4oY2ZnKSxcclxuICAgICAgZXZlbnRzOiBuZXcgQmFzaWNFdmVudEVtaXR0ZXIoKVxyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHJldHVybiBvdXQ7XHJcbn1cclxuXHJcbmNvbnN0IG91dCA9IHtcclxuICBfX2NhY2hlX186IHtcclxuICAgIGluaXRpYWxpemVkOiBmYWxzZSxcclxuICAgIGxvYWRlZDogbmVzdHMubWFrZSh7fSlcclxuICB9LFxyXG4gIHN0b3JhZ2U6IHtcclxuICAgIC8qKiBAdHlwZSB7bmVzdHMuTmVzdH0gKi9cclxuICAgIGluc3RhbGxlZDoge31cclxuICB9LFxyXG4gIGJ1aWxkQVBJLFxyXG4gIGFzeW5jIGluaXQoKSB7XHJcbiAgICBpZiAob3V0Ll9fY2FjaGVfXy5pbml0aWFsaXplZCkgcmV0dXJuO1xyXG4gICAgb3V0Ll9fY2FjaGVfXy5pbml0aWFsaXplZCA9IHRydWU7XHJcbiAgICBvdXQuc3RvcmFnZS5pbnN0YWxsZWQgPSBhd2FpdCBzdG9yYWdlLmNyZWF0ZVBlcnNpc3ROZXN0KFwiRXh0ZW5zaW9ucztJbnN0YWxsZWRcIik7XHJcbiAgfSxcclxuICAvKipcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsIFxyXG4gICAqL1xyXG4gIGFzeW5jIGluc3RhbGwodXJsLCBkZWZhdWx0Q29uZmlnID0ge30pIHtcclxuICAgIGlmICghb3V0Ll9fY2FjaGVfXy5pbml0aWFsaXplZCkgYXdhaXQgb3V0LmluaXQoKTtcclxuICAgIGlmICh1cmwuZW5kc1dpdGgoXCIvXCIpKSB1cmwgPSB1cmwuc2xpY2UoMCwgLTEpO1xyXG4gICAgaWYgKG91dC5zdG9yYWdlLmluc3RhbGxlZC5naG9zdFt1cmxdKSB0aHJvdyBuZXcgRXJyb3IoYFwiJHt1cmx9XCIgZXh0ZW5zaW9uIGlzIGFscmVhZHkgaW5zdGFsbGVkLmApO1xyXG5cclxuICAgIGxldCBtZXRhUmVzcCA9IGF3YWl0IGZldGNoKGAke3VybH0vbWV0YWRhdGEuanNvbmApO1xyXG4gICAgaWYgKG1ldGFSZXNwLnN0YXR1cyAhPT0gMjAwKSB0aHJvdyBuZXcgRXJyb3IoYFwiJHt1cmx9XCIgZXh0ZW5zaW9uIG1ldGFkYXRhIGlzIG5vdCByZXNwb25kZWQgd2l0aCAyMDAgc3RhdHVzIGNvZGUuYCk7XHJcbiAgICBsZXQgbWV0YWRhdGEgPSBhd2FpdCBtZXRhUmVzcC5qc29uKCk7XHJcblxyXG4gICAgbGV0IHJlYWRtZVJlc3AgPSBhd2FpdCBmZXRjaChgJHt1cmx9L3JlYWRtZS5tZGApO1xyXG4gICAgbGV0IHJlYWRtZSA9IHJlYWRtZVJlc3Auc3RhdHVzID09PSAyMDAgPyBhd2FpdCByZWFkbWVSZXNwLnRleHQoKSA6IG51bGw7XHJcblxyXG4gICAgLy8gVE9ETzogU2hvdyBtb2RhbCBmb3IgdXNlciB0byBhY2NlcHQgdGhlIGV4dGVuc2lvbiAodGVybXMsIHByaXZhY3ksIGV0Yy4pXHJcblxyXG4gICAgbGV0IHNvdXJjZVJlc3AgPSBhd2FpdCBmZXRjaChgJHt1cmx9L3NvdXJjZS5qc2ApO1xyXG4gICAgaWYgKHNvdXJjZVJlc3Auc3RhdHVzICE9PSAyMDApIHRocm93IG5ldyBFcnJvcihgXCIke3VybH1cIiBleHRlbnNpb24gc291cmNlIGlzIG5vdCByZXNwb25kZWQgd2l0aCAyMDAgc3RhdHVzIGNvZGUuYCk7XHJcbiAgICBsZXQgc291cmNlID0gYXdhaXQgc291cmNlUmVzcC50ZXh0KCk7XHJcblxyXG5cclxuICAgIG91dC5zdG9yYWdlLmluc3RhbGxlZC5zdG9yZVt1cmxdID0ge1xyXG4gICAgICBtZXRhZGF0YToge1xyXG4gICAgICAgIGN1cnJlbnQ6IG1ldGFkYXRhLFxyXG4gICAgICAgIGxhc3Q6IG1ldGFkYXRhXHJcbiAgICAgIH0sXHJcbiAgICAgIHNvdXJjZSxcclxuICAgICAgcmVhZG1lLFxyXG4gICAgICBjb25maWc6IHtcclxuICAgICAgICBhdXRvVXBkYXRlOiB0cnVlLFxyXG4gICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgLi4uZGVmYXVsdENvbmZpZ1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIG91dC5sb2FkKHVybCk7XHJcbiAgfSxcclxuICBhc3luYyB1bmluc3RhbGwodXJsKSB7XHJcbiAgICBpZiAoIW91dC5fX2NhY2hlX18uaW5pdGlhbGl6ZWQpIGF3YWl0IG91dC5pbml0KCk7XHJcbiAgICBpZiAoIW91dC5zdG9yYWdlLmluc3RhbGxlZC5naG9zdFt1cmxdKSB0aHJvdyBuZXcgRXJyb3IoYFwiJHt1cmx9XCIgZXh0ZW5zaW9uIGlzIG5vdCBpbnN0YWxsZWQuYCk7XHJcblxyXG4gICAgZGVsZXRlIG91dC5zdG9yYWdlLmluc3RhbGxlZC5zdG9yZVt1cmxdO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGF3YWl0IG91dC51bmxvYWQodXJsKTtcclxuICAgIH0gY2F0Y2ggeyB9XHJcbiAgfSxcclxuICBhc3luYyBsb2FkKHVybCkge1xyXG4gICAgaWYgKCFvdXQuX19jYWNoZV9fLmluaXRpYWxpemVkKSBhd2FpdCBvdXQuaW5pdCgpO1xyXG4gICAgaWYgKCFvdXQuc3RvcmFnZS5pbnN0YWxsZWQuZ2hvc3RbdXJsXSkgdGhyb3cgbmV3IEVycm9yKGBcIiR7dXJsfVwiIGV4dGVuc2lvbiBpcyBub3QgaW5zdGFsbGVkLmApO1xyXG4gICAgbGV0IGRhdGEgPSBvdXQuc3RvcmFnZS5pbnN0YWxsZWQuZ2hvc3RbdXJsXTtcclxuXHJcbiAgICBpZiAob3V0Ll9fY2FjaGVfXy5sb2FkZWQuZ2hvc3RbdXJsXSkgdGhyb3cgbmV3IEVycm9yKGBcIiR7dXJsfVwiIGV4dGVuc2lvbiBpcyBhbHJlYWR5IGxvYWRlZC5gKTtcclxuXHJcbiAgICBsZXQgYXBpID0gYXdhaXQgb3V0LmJ1aWxkQVBJKGRhdGEubWV0YWRhdGEpO1xyXG5cclxuICAgIGxldCBldmFsdWF0ZWQgPSBvdXQuZXZhbHVhdGUoZGF0YS5zb3VyY2UsIGFwaSk7XHJcblxyXG4gICAgYXdhaXQgZXZhbHVhdGVkPy5sb2FkPy4oKTtcclxuXHJcbiAgICBvdXQuX19jYWNoZV9fLmxvYWRlZC5zdG9yZVt1cmxdID0ge1xyXG4gICAgICBldmFsdWF0ZWQsXHJcbiAgICAgIGFwaVxyXG4gICAgfTtcclxuICB9LFxyXG4gIGFzeW5jIHVubG9hZCh1cmwpIHtcclxuICAgIGlmICghb3V0Ll9fY2FjaGVfXy5pbml0aWFsaXplZCkgYXdhaXQgb3V0LmluaXQoKTtcclxuICAgIGlmICghb3V0LnN0b3JhZ2UuaW5zdGFsbGVkLmdob3N0W3VybF0pIHRocm93IG5ldyBFcnJvcihgXCIke3VybH1cIiBleHRlbnNpb24gaXMgbm90IGluc3RhbGxlZC5gKTtcclxuXHJcbiAgICBpZiAoIW91dC5fX2NhY2hlX18ubG9hZGVkLmdob3N0W3VybF0pIHRocm93IG5ldyBFcnJvcihgXCIke3VybH1cIiBleHRlbnNpb24gaXMgbm90IGxvYWRlZC5gKTtcclxuXHJcbiAgICBsZXQgeyBldmFsdWF0ZWQgfSA9IG91dC5fX2NhY2hlX18ubG9hZGVkLmdob3N0W3VybF07XHJcblxyXG4gICAgYXdhaXQgZXZhbHVhdGVkPy51bmxvYWQ/LigpO1xyXG5cclxuICAgIGRlbGV0ZSBvdXQuX19jYWNoZV9fLmxvYWRlZC5zdG9yZVt1cmxdO1xyXG4gIH0sXHJcbiAgZXZhbHVhdGUoc291cmNlLCBhcGkpIHtcclxuICAgIGNvbnN0ICRhY29yZCA9IGFwaTtcclxuICAgIHJldHVybiBldmFsKHNvdXJjZSk7XHJcbiAgfSxcclxuICBhc3luYyBsb2FkQWxsKCkge1xyXG4gICAgaWYgKCFvdXQuX19jYWNoZV9fLmluaXRpYWxpemVkKSBhd2FpdCBvdXQuaW5pdCgpO1xyXG4gICAgcmV0dXJuIFByb21pc2UuYWxsKE9iamVjdC5rZXlzKG91dC5zdG9yYWdlLmluc3RhbGxlZC5naG9zdCkubWFwKHVybCA9PiBvdXQubG9hZCh1cmwpKSk7XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgb3V0OyIsICJleHBvcnQgZGVmYXVsdCB7XHJcbiAgcHJvY2VzczogZ2xvYmFsVGhpc1tcIjxQUkVMT0FEX0tFWT5cIl0ucHJvY2VzcyxcclxuICBpc0RldlRvb2xzT3BlbjogZ2xvYmFsVGhpc1tcIjxQUkVMT0FEX0tFWT5cIl0uaXNEZXZUb29sc09wZW5cclxufVxyXG5cclxuIiwgImltcG9ydCB7IHdhaXRVbnRpbENvbm5lY3Rpb25PcGVuIH0gZnJvbSBcIi4uLy4uL290aGVyL3V0aWxzLmpzXCI7XHJcbmltcG9ydCBjb21tb24gZnJvbSBcIi4uL21vZHVsZXMvY29tbW9uLmpzXCI7XHJcbmltcG9ydCBwYXRjaGVyIGZyb20gXCIuLi9wYXRjaGVyL2luZGV4LmpzXCI7XHJcblxyXG5jb25zdCBzb2NrZXRzID0gbmV3IFNldCgpO1xyXG5jb25zdCBoYW5kbGVycyA9IG5ldyBNYXAoKTtcclxuXHJcbndhaXRVbnRpbENvbm5lY3Rpb25PcGVuKCkudGhlbigoKSA9PiB7XHJcbiAgcGF0Y2hlci5pbnN0ZWFkKFxyXG4gICAgXCJoYW5kbGVDb25uZWN0aW9uXCIsXHJcbiAgICBjb21tb24uV2ViU29ja2V0LFxyXG4gICAgKGFyZ3MsIG9yaWcpID0+IHtcclxuICAgICAgY29uc3Qgd3MgPSBhcmdzWzBdO1xyXG4gICAgICBpZiAod3MudXBncmFkZVJlcSgpLnVybCAhPT0gXCIvYWNvcmRcIikgcmV0dXJuIG9yaWcoLi4uYXJncyk7XHJcblxyXG4gICAgICBzb2NrZXRzLmFkZCh3cyk7XHJcblxyXG4gICAgICB3cy5vbihcIm1lc3NhZ2VcIiwgYXN5bmMgKG1zZykgPT4ge1xyXG4gICAgICAgIGxldCBqc29uO1xyXG5cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAganNvbiA9IEpTT04ucGFyc2UobXNnKTtcclxuICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShqc29uKSB8fCBqc29uLmxlbmd0aCA8IDEgfHwganNvbi5sZW5ndGggPiAzKVxyXG4gICAgICAgICAgICB0aHJvdyBcIkFycmF5IGV4cGVjdGVkIGFzIG1lc3NhZ2UuXCI7XHJcbiAgICAgICAgICBpZiAodHlwZW9mIGpzb25bMF0gIT0gXCJzdHJpbmdcIikgdGhyb3cgXCJBcnJheVswXSBuZWVkcyB0byBiZSBzdHJpbmcuXCI7XHJcbiAgICAgICAgICBpZiAodHlwZW9mIGpzb25bMV0gIT0gXCJzdHJpbmdcIikgdGhyb3cgXCJBcnJheVsxXSBuZWVkcyB0byBiZSBzdHJpbmcuXCI7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICB3cy5zZW5kKFxyXG4gICAgICAgICAgICBKU09OLnN0cmluZ2lmeShbXHJcbiAgICAgICAgICAgICAgbnVsbCxcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBvazogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBlcnJvcjogYCR7ZXJyfWAsXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXSlcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBbZXZlbnRJZCwgZXZlbnROYW1lLCBldmVudERhdGFdID0ganNvbjtcclxuXHJcbiAgICAgICAgY29uc3QgaGFuZGxlciA9IGhhbmRsZXJzLmdldChldmVudE5hbWUpO1xyXG5cclxuICAgICAgICBpZiAoIWhhbmRsZXIpXHJcbiAgICAgICAgICByZXR1cm4gd3Muc2VuZChcclxuICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoW1xyXG4gICAgICAgICAgICAgIGV2ZW50SWQsXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgb2s6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgZXJyb3I6IGBVbmFibGUgdG8gZmluZCBoYW5kbGVyLmAsXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXSlcclxuICAgICAgICAgICk7XHJcblxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICBsZXQgcmVzcG9uc2UgPSBhd2FpdCBoYW5kbGVyKGV2ZW50RGF0YSk7XHJcbiAgICAgICAgICB3cy5zZW5kKFxyXG4gICAgICAgICAgICBKU09OLnN0cmluZ2lmeShbXHJcbiAgICAgICAgICAgICAgZXZlbnRJZCxcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBvazogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHJlc3BvbnNlLFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIF0pXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgd3Muc2VuZChcclxuICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoW1xyXG4gICAgICAgICAgICAgIGV2ZW50SWQsXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgb2s6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgZXJyb3I6IGAke2Vycn1gLFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIF0pXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgICB3cy5vbihcImNsb3NlXCIsICgpID0+IHNvY2tldHMuZGVsZXRlKHdzKSk7XHJcbiAgICB9XHJcbiAgKTtcclxufSk7XHJcblxyXG5mdW5jdGlvbiBzZXQoZXZlbnROYW1lLCBjYWxsYmFjaykge1xyXG4gIGlmICh0eXBlb2YgZXZlbnROYW1lICE9IFwic3RyaW5nXCIpXHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJFdmVudE5hbWUgbmVlZHMgdG8gYmUgYSBzdHJpbmcuXCIpO1xyXG4gIGlmICh0eXBlb2YgY2FsbGJhY2sgIT0gXCJmdW5jdGlvblwiKVxyXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ2FsbGJhY2sgbmVlZHMgdG8gYmUgYSBmdW5jdGlvbi5cIik7XHJcbiAgaWYgKGhhbmRsZXJzLmhhcyhldmVudE5hbWUpKVxyXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiRXZlbnROYW1lIGFscmVhZHkgaW4gdXNlLlwiKTtcclxuICBoYW5kbGVycy5zZXQoZXZlbnROYW1lLCBjYWxsYmFjayk7XHJcbiAgcmV0dXJuICgpID0+IHtcclxuICAgIGhhbmRsZXJzLmRlbGV0ZShldmVudE5hbWUpO1xyXG4gIH07XHJcbn1cclxuZnVuY3Rpb24gdHJpZ2dlcihldmVudE5hbWUsIC4uLmFyZ3MpIHtcclxuICBpZiAoIXNvY2tldEV2ZW50cy5oYXMoZXZlbnROYW1lKSlcclxuICAgIHRocm93IG5ldyBFcnJvcihcIlVuYWJsZSB0byBmaW5kIGhhbmRsZXIhXCIpO1xyXG4gIHJldHVybiBzb2NrZXRFdmVudHMuZ2V0KGV2ZW50TmFtZSkoLi4uYXJncyk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBzZXQsXHJcbiAgdHJpZ2dlclxyXG59XHJcblxyXG4iLCAiZXhwb3J0IGRlZmF1bHQgYFxuLmFjb3JkLS1sYXllci1jb250YWluZXJ7LS10b3Atb2Zmc2V0OiAwcHg7d2lkdGg6MTAwdnc7aGVpZ2h0OmNhbGMoMTAwdmggLSB2YXIoLS10b3Atb2Zmc2V0KSk7ei1pbmRleDo5OTk5OTk5O3BvaW50ZXItZXZlbnRzOm5vbmU7cG9zaXRpb246YWJzb2x1dGU7dG9wOnZhcigtLXRvcC1vZmZzZXQpO2xlZnQ6MHB4fS5hY29yZC0tbGF5ZXItY29udGFpbmVyICp7ei1pbmRleDo5OTk5OTk5OTk5OTk5OX0uYWNvcmQtLXRvb2x0aXAtbGF5ZXJ7b3BhY2l0eTowO3RyYW5zaXRpb246NTBtcyBsaW5lYXIgb3BhY2l0eTtwb3NpdGlvbjphYnNvbHV0ZTtwb2ludGVyLWV2ZW50czpub25lfS5hY29yZC0tdG9vbHRpcC1sYXllci52aXNpYmxle29wYWNpdHk6MTtwb2ludGVyLWV2ZW50czphbGx9LmFjb3JkLS10b29sdGlwLnZlcnRpY2Fse3RyYW5zZm9ybTp0cmFuc2xhdGVYKC01MCUpfS5hY29yZC0tdG9vbHRpcC5ob3Jpem9udGFse3RyYW5zZm9ybTp0cmFuc2xhdGVZKC01MCUpfS5hY29yZC0tdG9hc3RzLWNvbnRhaW5lcntkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2p1c3RpZnktY29udGVudDpmbGV4LWVuZDtmbGV4LWRpcmVjdGlvbjpjb2x1bW47d2lkdGg6MTAwdnc7aGVpZ2h0OmNhbGMoMTAwdmggLSB2YXIoLS10b3Atb2Zmc2V0KSk7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7bGVmdDowO3BvaW50ZXItZXZlbnRzOm5vbmU7cGFkZGluZy1ib3R0b206MzJweH0uYWNvcmQtLXRvYXN0cy1jb250YWluZXIgLmFjb3JkLS10b2FzdHt0cmFuc2l0aW9uOnRyYW5zZm9ybSAyNTBtcyBlYXNlLWluLW91dCxvcGFjaXR5IDI1MG1zIGVhc2UtaW4tb3V0O2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7cG9pbnRlci1ldmVudHM6bm9uZTtib3JkZXItcmFkaXVzOjRweDtwYWRkaW5nOjhweDtib3gtc2hhZG93OjBweCAycHggOHB4IHJnYmEoMCwwLDAsLjI1KTtvcGFjaXR5OjE7Z2FwOjhweDtmb250LXNpemU6MTRweDttYXJnaW46NHB4fS5hY29yZC0tdG9hc3RzLWNvbnRhaW5lciAuYWNvcmQtLXRvYXN0IHN2Z3t3aWR0aDoxNnB4O2hlaWdodDoxNnB4fS5hY29yZC0tdG9hc3RzLWNvbnRhaW5lciAuYWNvcmQtLXRvYXN0LmNsaWNrYWJsZXtjdXJzb3I6cG9pbnRlcjtwb2ludGVyLWV2ZW50czphbGx9LmFjb3JkLS10b2FzdHMtY29udGFpbmVyIC5hY29yZC0tdG9hc3QuY2xvc2luZ3tvcGFjaXR5OjA7dHJhbnNmb3JtOnRyYW5zbGF0ZSgwLCAtNTBweCl9LmFjb3JkLS10b2FzdHMtY29udGFpbmVyIC5hY29yZC0tdG9hc3QuaGlkZGVue29wYWNpdHk6MDt0cmFuc2Zvcm06dHJhbnNsYXRlKDAsIDUwcHgpfS5hY29yZC0tdG9hc3RzLWNvbnRhaW5lciAuYWNvcmQtLXRvYXN0LnN0eWxlLWluZm97YmFja2dyb3VuZC1jb2xvcjojNGE4ZmUxO2NvbG9yOiNmNWY1ZjV9LmFjb3JkLS10b2FzdHMtY29udGFpbmVyIC5hY29yZC0tdG9hc3Quc3R5bGUtd2FybmluZ3tiYWNrZ3JvdW5kLWNvbG9yOiNmYWE4MWE7Y29sb3I6IzAwMH0uYWNvcmQtLXRvYXN0cy1jb250YWluZXIgLmFjb3JkLS10b2FzdC5zdHlsZS1lcnJvcntiYWNrZ3JvdW5kLWNvbG9yOiNlZDQyNDU7Y29sb3I6IzAwMH0uYWNvcmQtLXRvYXN0cy1jb250YWluZXIgLmFjb3JkLS10b2FzdC5zdHlsZS1zdWNjZXNze2JhY2tncm91bmQtY29sb3I6IzNiYTU1ZDtjb2xvcjojZjVmNWY1fS5hY29yZC0tdG9hc3RzLWNvbnRhaW5lciAuYWNvcmQtLXRvYXN0LnN0eWxlLWRlZmF1bHR7YmFja2dyb3VuZC1jb2xvcjojZjVmNWY1O2NvbG9yOiMwMDB9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXJ7d2lkdGg6MTAwdnc7aGVpZ2h0OmNhbGMoMTAwdmggLSB2YXIoLS10b3Atb2Zmc2V0KSk7ZGlzcGxheTpmbGV4O3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6MDtwb2ludGVyLWV2ZW50czpub25lfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyIC5hY29yZC0tbm90aWZpY2F0aW9ue2Rpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpjb2x1bW47cG9pbnRlci1ldmVudHM6YWxsO3RyYW5zaXRpb246dHJhbnNmb3JtIDI1MG1zIGVhc2UtaW4tb3V0LG9wYWNpdHkgMjUwbXMgZWFzZS1pbi1vdXQ7bWFyZ2luOjRweDtiYWNrZHJvcC1maWx0ZXI6Ymx1cigxNnB4KSBicmlnaHRuZXNzKDAuNzUpOy13ZWJraXQtYXBwLXJlZ2lvbjpuby1kcmFnOy0tYW5pbWF0aW9uLXNpemU6IDUwcHh9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24uaGlkZGVuLC5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyIC5hY29yZC0tbm90aWZpY2F0aW9uLmNsb3Npbmd7b3BhY2l0eTowfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyIC5hY29yZC0tbm90aWZpY2F0aW9uPi5jb250YWluZXJ7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2VlbjtwYWRkaW5nOjhweDtjb2xvcjojZmZmO21pbi13aWR0aDoyNTBweH0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllciAuYWNvcmQtLW5vdGlmaWNhdGlvbj4uY29udGFpbmVyPi5jbG9zZXt3aWR0aDoyNHB4O2hlaWdodDoyNHB4O2NvbG9yOiNmZmY7b3BhY2l0eTouNTtjdXJzb3I6cG9pbnRlcjttYXJnaW4tbGVmdDo4cHg7ei1pbmRleDo5OTk5OTk5OTl9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24+LmNvbnRhaW5lcj4uY2xvc2UuaGlkZGVue2Rpc3BsYXk6bm9uZX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllciAuYWNvcmQtLW5vdGlmaWNhdGlvbj4ucHJvZ3Jlc3MtY29udGFpbmVye3dpZHRoOjEwMCU7aGVpZ2h0OjVweH0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllciAuYWNvcmQtLW5vdGlmaWNhdGlvbj4ucHJvZ3Jlc3MtY29udGFpbmVyPi5wcm9ncmVzc3t3aWR0aDowJTtoZWlnaHQ6NXB4O3RyYW5zaXRpb246d2lkdGggdmFyKC0tZHVyYXRpb24pIGxpbmVhcjtiYWNrZ3JvdW5kLWNvbG9yOnZhcigtLWJhci1jb2xvcil9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24+LnByb2dyZXNzLWNvbnRhaW5lcj4ucHJvZ3Jlc3MucHJvZ3Jlc3Npbmd7d2lkdGg6MTAwJX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllciAuYWNvcmQtLW5vdGlmaWNhdGlvbi5zdHlsZS1pbmZvey0tYmFyLWNvbG9yOiAjNGE4ZmUxfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyIC5hY29yZC0tbm90aWZpY2F0aW9uLnN0eWxlLXdhcm5pbmd7LS1iYXItY29sb3I6ICNmYWE4MWF9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24uc3R5bGUtZXJyb3J7LS1iYXItY29sb3I6ICNlZDQyNDV9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24uc3R5bGUtc3VjY2Vzc3stLWJhci1jb2xvcjogIzNiYTU1ZH0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllciAuYWNvcmQtLW5vdGlmaWNhdGlvbi5zdHlsZS1kZWZhdWx0ey0tYmFyLWNvbG9yOiB3aGl0ZXNtb2tlfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLnRvcC1yaWdodHtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1lbmQ7YWxpZ24taXRlbXM6ZmxleC1zdGFydH0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci50b3AtcmlnaHQgLmFjb3JkLS1ub3RpZmljYXRpb24uaGlkZGVue3RyYW5zZm9ybTp0cmFuc2xhdGUoMCwgY2FsYyh2YXIoLS1hbmltYXRpb24tc2l6ZSkgKiAtMSkpfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLnRvcC1yaWdodCAuYWNvcmQtLW5vdGlmaWNhdGlvbi5jbG9zaW5ne3RyYW5zZm9ybTp0cmFuc2xhdGUoMCwgdmFyKC0tYW5pbWF0aW9uLXNpemUpKX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci50b3AtbGVmdHtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1zdGFydDthbGlnbi1pdGVtczpmbGV4LXN0YXJ0fS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLnRvcC1sZWZ0IC5hY29yZC0tbm90aWZpY2F0aW9uLmhpZGRlbnt0cmFuc2Zvcm06dHJhbnNsYXRlKDAsIGNhbGModmFyKC0tYW5pbWF0aW9uLXNpemUpICogLTEpKX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci50b3AtbGVmdCAuYWNvcmQtLW5vdGlmaWNhdGlvbi5jbG9zaW5ne3RyYW5zZm9ybTp0cmFuc2xhdGUoMCwgdmFyKC0tYW5pbWF0aW9uLXNpemUpKX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci5ib3R0b20tcmlnaHR7anVzdGlmeS1jb250ZW50OmZsZXgtZW5kO2FsaWduLWl0ZW1zOmZsZXgtZW5kfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLmJvdHRvbS1yaWdodCAuYWNvcmQtLW5vdGlmaWNhdGlvbi5oaWRkZW57dHJhbnNmb3JtOnRyYW5zbGF0ZSgwLCB2YXIoLS1hbmltYXRpb24tc2l6ZSkpfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLmJvdHRvbS1yaWdodCAuYWNvcmQtLW5vdGlmaWNhdGlvbi5jbG9zaW5ne3RyYW5zZm9ybTp0cmFuc2xhdGUoMCwgY2FsYyh2YXIoLS1hbmltYXRpb24tc2l6ZSkgKiAtMSkpfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLmJvdHRvbS1sZWZ0e2p1c3RpZnktY29udGVudDpmbGV4LXN0YXJ0O2FsaWduLWl0ZW1zOmZsZXgtZW5kfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLmJvdHRvbS1sZWZ0IC5hY29yZC0tbm90aWZpY2F0aW9uLmhpZGRlbnt0cmFuc2Zvcm06dHJhbnNsYXRlKDAsIHZhcigtLWFuaW1hdGlvbi1zaXplKSl9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIuYm90dG9tLWxlZnQgLmFjb3JkLS1ub3RpZmljYXRpb24uY2xvc2luZ3t0cmFuc2Zvcm06dHJhbnNsYXRlKDAsIGNhbGModmFyKC0tYW5pbWF0aW9uLXNpemUpICogLTEpKX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci50b3AtY2VudGVye2p1c3RpZnktY29udGVudDpjZW50ZXI7YWxpZ24taXRlbXM6ZmxleC1zdGFydH0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci50b3AtY2VudGVyIC5hY29yZC0tbm90aWZpY2F0aW9uLmhpZGRlbnt0cmFuc2Zvcm06dHJhbnNsYXRlKDAsIGNhbGModmFyKC0tYW5pbWF0aW9uLXNpemUpICogLTEpKX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci50b3AtY2VudGVyIC5hY29yZC0tbm90aWZpY2F0aW9uLmNsb3Npbmd7dHJhbnNmb3JtOnRyYW5zbGF0ZSgwLCB2YXIoLS1hbmltYXRpb24tc2l6ZSkpfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLmJvdHRvbS1jZW50ZXJ7anVzdGlmeS1jb250ZW50OmNlbnRlcjthbGlnbi1pdGVtczpmbGV4LWVuZH0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci5ib3R0b20tY2VudGVyIC5hY29yZC0tbm90aWZpY2F0aW9uLmhpZGRlbnt0cmFuc2Zvcm06dHJhbnNsYXRlKDAsIHZhcigtLWFuaW1hdGlvbi1zaXplKSl9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIuYm90dG9tLWNlbnRlciAuYWNvcmQtLW5vdGlmaWNhdGlvbi5jbG9zaW5ne3RyYW5zZm9ybTp0cmFuc2xhdGUoMCwgY2FsYyh2YXIoLS1hbmltYXRpb24tc2l6ZSkgKiAtMSkpfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLmNlbnRlcntqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO2FsaWduLWl0ZW1zOmNlbnRlcn0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci5jZW50ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24uaGlkZGVue3RyYW5zZm9ybTpzY2FsZSgwLjUpfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLmNlbnRlciAuYWNvcmQtLW5vdGlmaWNhdGlvbi5jbG9zaW5ne3RyYW5zZm9ybTpzY2FsZSgwLjUpfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLmxlZnQtY2VudGVye2p1c3RpZnktY29udGVudDpmbGV4LXN0YXJ0O2FsaWduLWl0ZW1zOmNlbnRlcn0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci5sZWZ0LWNlbnRlciAuYWNvcmQtLW5vdGlmaWNhdGlvbi5oaWRkZW57dHJhbnNmb3JtOnRyYW5zbGF0ZShjYWxjKHZhcigtLWFuaW1hdGlvbi1zaXplKSAqIC0xKSwgMCl9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIubGVmdC1jZW50ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24uY2xvc2luZ3t0cmFuc2Zvcm06dHJhbnNsYXRlKHZhcigtLWFuaW1hdGlvbi1zaXplKSwgMCl9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIucmlnaHQtY2VudGVye2p1c3RpZnktY29udGVudDpmbGV4LWVuZDthbGlnbi1pdGVtczpjZW50ZXJ9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIucmlnaHQtY2VudGVyIC5hY29yZC0tbm90aWZpY2F0aW9uLmhpZGRlbnt0cmFuc2Zvcm06dHJhbnNsYXRlKHZhcigtLWFuaW1hdGlvbi1zaXplKSwgMCl9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIucmlnaHQtY2VudGVyIC5hY29yZC0tbm90aWZpY2F0aW9uLmNsb3Npbmd7dHJhbnNmb3JtOnRyYW5zbGF0ZShjYWxjKHZhcigtLWFuaW1hdGlvbi1zaXplKSAqIC0xKSwgMCl9YDtcbiIsICJpbXBvcnQgZG9tIGZyb20gXCIuLi9kb20vaW5kZXguanNcIjtcclxuaW1wb3J0IGV2ZW50cyBmcm9tIFwiLi4vZXZlbnRzL2luZGV4LmpzXCI7XHJcbmltcG9ydCB3ZWJwYWNrIGZyb20gXCIuLi9tb2R1bGVzL3dlYnBhY2suanNcIjtcclxuXHJcbmNvbnN0IHRvb2x0aXBDbGFzc2VzID0gd2VicGFjay5maW5kQnlQcm9wZXJ0aWVzKFwidG9vbHRpcENvbnRlbnRBbGxvd092ZXJmbG93XCIsIFwidG9vbHRpcFwiKTtcclxuXHJcbmNvbnN0IHRvb2x0aXBQb3NpdGlvbnMgPSB7XHJcbiAgdG9wOiB0b29sdGlwQ2xhc3Nlcy50b29sdGlwVG9wLFxyXG4gIGJvdHRvbTogdG9vbHRpcENsYXNzZXMudG9vbHRpcEJvdHRvbSxcclxuICBsZWZ0OiB0b29sdGlwQ2xhc3Nlcy50b29sdGlwTGVmdCxcclxuICByaWdodDogdG9vbHRpcENsYXNzZXMudG9vbHRpcFJpZ2h0LFxyXG59XHJcblxyXG5jbGFzcyBUb29sdGlwIHtcclxuICAvKipcclxuICAgKiBAcGFyYW0ge0hUTUxEaXZFbGVtZW50fSB0YXJnZXQgXHJcbiAgICogQHBhcmFtIHtzdHJpbmd8SFRNTERpdkVsZW1lbnR9IGNvbnRlbnRcclxuICAgKi9cclxuICBjb25zdHJ1Y3Rvcih0YXJnZXQsIGNvbnRlbnQsIHBvc2l0aW9uID0gXCJhdXRvXCIpIHtcclxuICAgIC8qKiBAdHlwZSB7SFRNTERpdkVsZW1lbnR9ICovXHJcbiAgICB0aGlzLmxheWVyRWxlbWVudCA9IGRvbS5wYXJzZShgXHJcbiAgICAgIDxkaXYgY2xhc3M9XCJhY29yZC0tdG9vbHRpcC1sYXllclwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCIke3Rvb2x0aXBDbGFzc2VzLnRvb2x0aXB9ICR7dG9vbHRpcENsYXNzZXMudG9vbHRpcFByaW1hcnl9IGFjb3JkLS10b29sdGlwXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiJHt0b29sdGlwQ2xhc3Nlcy50b29sdGlwUG9pbnRlcn0gYWNvcmQtLXRvb2x0aXAtcG9pbnRlclwiPjwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cIiR7dG9vbHRpcENsYXNzZXMudG9vbHRpcENvbnRlbnR9IGFjb3JkLS10b29sdGlwLWNvbnRlbnRcIj48L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICBgKTtcclxuICAgIHRoaXMudG9vbHRpcEVsZW1lbnQgPSB0aGlzLmxheWVyRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmFjb3JkLS10b29sdGlwXCIpO1xyXG4gICAgdGhpcy5jb250ZW50RWxlbWVudCA9IHRoaXMubGF5ZXJFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWNvcmQtLXRvb2x0aXAtY29udGVudFwiKTtcclxuICAgIHRoaXMuY29udGVudCA9IGNvbnRlbnQ7XHJcbiAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuICAgIHRoaXMucG9zaXRpb24gPSBwb3NpdGlvbjtcclxuXHJcbiAgICB0aGlzLnZpc2libGUgPSBmYWxzZTtcclxuICAgIHRoaXMuZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgIHRoaXMucGF1c2VkID0gZmFsc2U7XHJcblxyXG4gICAgY29uc3Qgb25Nb3VzZUVudGVyID0gKCkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5kaXNhYmxlZCB8fCB0aGlzLnBhdXNlZCkgcmV0dXJuO1xyXG4gICAgICB0aGlzLnNob3coKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBvbk1vdXNlTGVhdmUgPSAoKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLnBhdXNlZCkgcmV0dXJuO1xyXG4gICAgICB0aGlzLmhpZGUoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnRhcmdldC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCBvbk1vdXNlRW50ZXIpO1xyXG4gICAgdGhpcy50YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgb25Nb3VzZUxlYXZlKTtcclxuXHJcbiAgICBsZXQgdW5QYXRjaE9ic2VydmVyID0gZXZlbnRzLm9uKFxyXG4gICAgICBcImRvbS1tdXRhdGlvblwiLFxyXG4gICAgICAvKiogQHBhcmFtIHtNdXRhdGlvblJlY29yZH0gbXV0ICovKG11dCkgPT4ge1xyXG4gICAgICAgIGlmIChtdXQudHlwZSA9PT0gXCJhdHRyaWJ1dGVzXCIpIHtcclxuICAgICAgICAgIGlmIChtdXQudGFyZ2V0LmlzU2FtZU5vZGUodGhpcy50YXJnZXQpKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAobXV0LmF0dHJpYnV0ZU5hbWUpIHtcclxuICAgICAgICAgICAgICBjYXNlIFwiYWNvcmQtLXRvb2x0aXAtZGlzYWJsZWRcIjoge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kaXNhYmxlZCA9IHRoaXMudGFyZ2V0LmdldEF0dHJpYnV0ZShcImFjb3JkLS10b29sdGlwLWRpc2FibGVkXCIpID09PSBcInRydWVcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBjYXNlIFwiYWNvcmQtLXRvb2x0aXAtY29udGVudFwiOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQgPSB0aGlzLnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJhY29yZC0tdG9vbHRpcC1jb250ZW50XCIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGNhc2UgXCJhY29yZC0tdG9vbHRpcC1wb3NpdGlvblwiOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uID0gdGhpcy50YXJnZXQuZ2V0QXR0cmlidXRlKFwiYWNvcmQtLXRvb2x0aXAtcG9zaXRpb25cIik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIClcclxuXHJcbiAgICB0aGlzLmRlc3Ryb3kgPSAoKSA9PiB7XHJcbiAgICAgIHRoaXMudGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsIG9uTW91c2VFbnRlcik7XHJcbiAgICAgIHRoaXMudGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIG9uTW91c2VMZWF2ZSk7XHJcbiAgICAgIHRoaXMuaGlkZSgpO1xyXG4gICAgICB1blBhdGNoT2JzZXJ2ZXIoKTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBnZXQgY29udGVudCgpIHtcclxuICAgIHJldHVybiB0aGlzLmNvbnRlbnRFbGVtZW50LmZpcnN0RWxlbWVudENoaWxkO1xyXG4gIH1cclxuXHJcbiAgc2V0IGNvbnRlbnQodmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgdGhpcy5jb250ZW50RWxlbWVudC5pbm5lckhUTUwgPSB2YWx1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuY29udGVudEVsZW1lbnQuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgdGhpcy5jb250ZW50RWxlbWVudC5hcHBlbmRDaGlsZCh2YWx1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZ2V0Q29udGFpbmVyKCkge1xyXG4gICAgY29uc3QgYXBwRWxtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2NsYXNzKj1cIm5vdERldlRvb2xzLVwiXScpO1xyXG5cclxuICAgIGxldCBjb250YWluZXIgPSBhcHBFbG0ucXVlcnlTZWxlY3RvcihcIi5hY29yZC0tdG9vbHRpcC1jb250YWluZXJcIik7XHJcbiAgICBpZiAoIWNvbnRhaW5lcikge1xyXG4gICAgICBjb250YWluZXIgPSBkb20ucGFyc2UoYDxkaXYgY2xhc3M9XCJhY29yZC0tbGF5ZXItY29udGFpbmVyIGFjb3JkLS10b29sdGlwLWNvbnRhaW5lclwiPjwvZGl2PmApO1xyXG4gICAgICBhcHBFbG0uYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcclxuICAgIH1cclxuICAgIGNvbnRhaW5lci5zdHlsZS5zZXRQcm9wZXJ0eShcIi0tdG9wLW9mZnNldFwiLCBgJHthcHBFbG0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wLnRvRml4ZWQoMSl9cHhgKTtcclxuXHJcbiAgICByZXR1cm4gY29udGFpbmVyO1xyXG4gIH1cclxuXHJcbiAgc2hvdygpIHtcclxuICAgIGlmICh0aGlzLnZpc2libGUpIHJldHVybjtcclxuICAgIHRoaXMudmlzaWJsZSA9IHRydWU7XHJcblxyXG4gICAgY29uc3QgY29udGFpbmVyID0gVG9vbHRpcC5nZXRDb250YWluZXIoKTtcclxuXHJcbiAgICBpZiAodGhpcy5wb3NpdGlvbiA9PT0gXCJhdXRvXCIpIHtcclxuICAgICAgdGhpcy5jYWxjdWxhdGVQb3NpdGlvbihcclxuICAgICAgICB0aGlzLmNhblNob3dBdFRvcCA/IFwidG9wXCJcclxuICAgICAgICAgIDogdGhpcy5jYW5TaG93QXRCb3R0b20gPyBcImJvdHRvbVwiXHJcbiAgICAgICAgICAgIDogdGhpcy5jYW5TaG93QXRMZWZ0ID8gXCJsZWZ0XCJcclxuICAgICAgICAgICAgICA6IHRoaXMuY2FuU2hvd0F0UmlnaHQgPyBcInJpZ2h0XCJcclxuICAgICAgICAgICAgICAgIDogXCJ0b3BcIlxyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5jYWxjdWxhdGVQb3NpdGlvbih0aGlzLnBvc2l0aW9uKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMubGF5ZXJFbGVtZW50KTtcclxuICAgIHRoaXMubGF5ZXJFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJ2aXNpYmxlXCIpO1xyXG4gIH1cclxuXHJcbiAgY2FsY3VsYXRlUG9zaXRpb24ocG9zaXRpb24pIHtcclxuICAgIGNvbnN0IGJvdW5kaW5nUmVjdCA9IHRoaXMudGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cclxuICAgIHRoaXMubGF5ZXJFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoLi4uT2JqZWN0LnZhbHVlcyh0b29sdGlwUG9zaXRpb25zKSk7XHJcbiAgICB0aGlzLnRvb2x0aXBFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJ2ZXJ0aWNhbFwiLCBcImhvcml6b250YWxcIik7XHJcblxyXG4gICAgc3dpdGNoIChwb3NpdGlvbikge1xyXG4gICAgICBjYXNlIFwidG9wXCI6IHtcclxuICAgICAgICB0aGlzLmxheWVyRWxlbWVudC5zdHlsZS50b3AgPSBgJHtib3VuZGluZ1JlY3QudG9wIC0gdGhpcy50YXJnZXQub2Zmc2V0SGVpZ2h0IC0gMTB9cHhgO1xyXG4gICAgICAgIHRoaXMubGF5ZXJFbGVtZW50LnN0eWxlLmxlZnQgPSBgJHtib3VuZGluZ1JlY3QubGVmdH1weGA7XHJcbiAgICAgICAgdGhpcy5sYXllckVsZW1lbnQuY2xhc3NMaXN0LmFkZCh0b29sdGlwUG9zaXRpb25zLnRvcCk7XHJcbiAgICAgICAgdGhpcy50b29sdGlwRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwidmVydGljYWxcIik7XHJcbiAgICAgICAgdGhpcy5jZW50ZXJQb3NpdGlvbihcImhvcml6b250YWxcIik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSBcImJvdHRvbVwiOiB7XHJcbiAgICAgICAgdGhpcy5sYXllckVsZW1lbnQuc3R5bGUudG9wID0gYCR7Ym91bmRpbmdSZWN0LnRvcCArIHRoaXMudGFyZ2V0Lm9mZnNldEhlaWdodCArIDEwfXB4YDtcclxuICAgICAgICB0aGlzLmxheWVyRWxlbWVudC5zdHlsZS5sZWZ0ID0gYCR7Ym91bmRpbmdSZWN0LmxlZnR9cHhgO1xyXG4gICAgICAgIHRoaXMubGF5ZXJFbGVtZW50LmNsYXNzTGlzdC5hZGQodG9vbHRpcFBvc2l0aW9ucy5ib3R0b20pO1xyXG4gICAgICAgIHRoaXMudG9vbHRpcEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInZlcnRpY2FsXCIpO1xyXG4gICAgICAgIHRoaXMuY2VudGVyUG9zaXRpb24oXCJob3Jpem9udGFsXCIpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgXCJsZWZ0XCI6IHtcclxuICAgICAgICB0aGlzLmxheWVyRWxlbWVudC5zdHlsZS50b3AgPSBgJHtib3VuZGluZ1JlY3QudG9wfXB4YDtcclxuICAgICAgICB0aGlzLmxheWVyRWxlbWVudC5zdHlsZS5sZWZ0ID0gYCR7Ym91bmRpbmdSZWN0LmxlZnQgLSB0aGlzLnRhcmdldC5vZmZzZXRXaWR0aCAtIDEwfXB4YDtcclxuICAgICAgICB0aGlzLmxheWVyRWxlbWVudC5jbGFzc0xpc3QuYWRkKHRvb2x0aXBQb3NpdGlvbnMubGVmdCk7XHJcbiAgICAgICAgdGhpcy50b29sdGlwRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiaG9yaXpvbnRhbFwiKTtcclxuICAgICAgICB0aGlzLmNlbnRlclBvc2l0aW9uKFwidmVydGljYWxcIik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSBcInJpZ2h0XCI6IHtcclxuICAgICAgICB0aGlzLmxheWVyRWxlbWVudC5zdHlsZS50b3AgPSBgJHtib3VuZGluZ1JlY3QudG9wfXB4YDtcclxuICAgICAgICB0aGlzLmxheWVyRWxlbWVudC5zdHlsZS5sZWZ0ID0gYCR7Ym91bmRpbmdSZWN0LmxlZnQgKyB0aGlzLnRhcmdldC5vZmZzZXRXaWR0aCArIDEwfXB4YDtcclxuICAgICAgICB0aGlzLmxheWVyRWxlbWVudC5jbGFzc0xpc3QuYWRkKHRvb2x0aXBQb3NpdGlvbnMucmlnaHQpO1xyXG4gICAgICAgIHRoaXMudG9vbHRpcEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImhvcml6b250YWxcIik7XHJcbiAgICAgICAgdGhpcy5jZW50ZXJQb3NpdGlvbihcInZlcnRpY2FsXCIpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjZW50ZXJQb3NpdGlvbihkaXJlY3Rpb24pIHtcclxuICAgIHN3aXRjaCAoZGlyZWN0aW9uKSB7XHJcbiAgICAgIGNhc2UgXCJob3Jpem9udGFsXCI6IHtcclxuICAgICAgICBjb25zdCBjZW50ZXIgPSB0aGlzLnRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0ICsgKHRoaXMudGFyZ2V0Lm9mZnNldFdpZHRoIC8gMik7XHJcbiAgICAgICAgdGhpcy5sYXllckVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoXCJsZWZ0XCIsIGAke2NlbnRlciAtICh0aGlzLmxheWVyRWxlbWVudC5vZmZzZXRXaWR0aCAvIDIpfXB4YCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSBcInZlcnRpY2FsXCI6IHtcclxuICAgICAgICBjb25zdCBjZW50ZXIgPSB0aGlzLnRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgKyAodGhpcy50YXJnZXQub2Zmc2V0SGVpZ2h0IC8gMik7XHJcbiAgICAgICAgdGhpcy5sYXllckVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoXCJ0b3BcIiwgYCR7Y2VudGVyIC0gKHRoaXMubGF5ZXJFbGVtZW50Lm9mZnNldEhlaWdodCAvIDIpfXB4YCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGhpZGUoKSB7XHJcbiAgICBpZiAoIXRoaXMudmlzaWJsZSkgcmV0dXJuO1xyXG4gICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5sYXllckVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcInZpc2libGVcIik7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGhpcy5sYXllckVsZW1lbnQucmVtb3ZlKCk7XHJcbiAgICB9LCA1MCk7XHJcbiAgfVxyXG5cclxuICBnZXQgY2FuU2hvd0F0VG9wKCkgeyByZXR1cm4gdGhpcy50YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wIC0gdGhpcy5sYXllckVsZW1lbnQub2Zmc2V0SGVpZ2h0ID49IDA7IH1cclxuICBnZXQgY2FuU2hvd0F0Qm90dG9tKCkgeyByZXR1cm4gdGhpcy50YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgdGhpcy50YXJnZXQub2Zmc2V0SGVpZ2h0ICsgdGhpcy5sYXllckVsZW1lbnQub2Zmc2V0SGVpZ2h0IDw9IHdpbmRvdy5pbm5lckhlaWdodDsgfVxyXG4gIGdldCBjYW5TaG93QXRMZWZ0KCkgeyByZXR1cm4gdGhpcy50YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCAtIHRoaXMubGF5ZXJFbGVtZW50Lm9mZnNldFdpZHRoID49IDA7IH1cclxuICBnZXQgY2FuU2hvd0F0UmlnaHQoKSB7IHJldHVybiB0aGlzLnRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0ICsgdGhpcy50YXJnZXQub2Zmc2V0V2lkdGggKyB0aGlzLmxheWVyRWxlbWVudC5vZmZzZXRXaWR0aCA8PSB3aW5kb3cuaW5uZXJXaWR0aDsgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGUodGFyZ2V0LCBjb250ZW50LCBwb3NpdGlvbiA9IFwiYXV0b1wiKSB7XHJcbiAgcmV0dXJuIG5ldyBUb29sdGlwKHRhcmdldCwgY29udGVudCwgcG9zaXRpb24pO1xyXG59XHJcblxyXG5kb20ucGF0Y2goXHJcbiAgXCJbYWNvcmQtLXRvb2x0aXAtY29udGVudF1cIixcclxuICAoZWxtKSA9PiB7XHJcbiAgICBsZXQgdG9vbHRpcCA9IGNyZWF0ZShlbG0sIGVsbS5nZXRBdHRyaWJ1dGUoXCJhY29yZC0tdG9vbHRpcC1jb250ZW50XCIpLCBlbG0uZ2V0QXR0cmlidXRlKFwiYWNvcmQtLXRvb2x0aXAtcG9zaXRpb25cIikpO1xyXG4gICAgdG9vbHRpcC5kaXNhYmxlZCA9IGVsbS5nZXRBdHRyaWJ1dGUoXCJhY29yZC0tdG9vbHRpcC1kaXNhYmxlZFwiKSA9PT0gXCJ0cnVlXCI7XHJcblxyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgdG9vbHRpcC5kZXN0cm95KCk7XHJcbiAgICB9XHJcbiAgfSxcclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHsgY3JlYXRlIH07IiwgImltcG9ydCBkb20gZnJvbSBcIi4uL2RvbS9pbmRleC5qc1wiO1xyXG5pbXBvcnQgdXRpbHMgZnJvbSBcIi4uL3V0aWxzL2luZGV4LmpzXCI7XHJcblxyXG5jb25zdCB2YWxpZFBvc2l0aW9ucyA9IFtcclxuICBcInRvcC1yaWdodFwiLFxyXG4gIFwidG9wLWxlZnRcIixcclxuICBcImJvdHRvbS1yaWdodFwiLFxyXG4gIFwiYm90dG9tLWxlZnRcIixcclxuICBcInRvcC1jZW50ZXJcIixcclxuICBcImJvdHRvbS1jZW50ZXJcIixcclxuICBcImNlbnRlclwiLFxyXG4gIFwibGVmdC1jZW50ZXJcIixcclxuICBcInJpZ2h0LWNlbnRlclwiXHJcbl1cclxuXHJcbmZ1bmN0aW9uIGdldENvbnRhaW5lcihwb3NpdGlvbikge1xyXG4gIGlmICghdmFsaWRQb3NpdGlvbnMuaW5jbHVkZXMocG9zaXRpb24pKSB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgcG9zaXRpb24gXCIke3Bvc2l0aW9ufVwiLiBWYWxpZCBwb3NpdGlvbnMgYXJlOiAke3ZhbGlkUG9zaXRpb25zLmpvaW4oXCIsIFwiKX1gKTtcclxuICBjb25zdCBhcHBFbG0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbY2xhc3MqPVwibm90QXBwQXNpZGVQYW5lbC1cIl0nKTtcclxuXHJcbiAgbGV0IHRvcENvbnRhaW5lciA9IGFwcEVsbS5xdWVyeVNlbGVjdG9yKFwiLmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXItY29udGFpbmVyXCIpO1xyXG4gIGlmICghdG9wQ29udGFpbmVyKSB7XHJcbiAgICB0b3BDb250YWluZXIgPSBkb20ucGFyc2UoYDxkaXYgY2xhc3M9XCJhY29yZC0tbGF5ZXItY29udGFpbmVyIGFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXItY29udGFpbmVyXCI+PC9kaXY+YCk7XHJcbiAgICBhcHBFbG0uYXBwZW5kQ2hpbGQodG9wQ29udGFpbmVyKTtcclxuICB9XHJcbiAgdG9wQ29udGFpbmVyLnN0eWxlLnNldFByb3BlcnR5KFwiLS10b3Atb2Zmc2V0XCIsIGAke2FwcEVsbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AudG9GaXhlZCgxKX1weGApO1xyXG5cclxuICBsZXQgcG9zaXRpb25Db250YWluZXIgPSB0b3BDb250YWluZXIucXVlcnlTZWxlY3RvcihgLmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIuJHtwb3NpdGlvbn1gKTtcclxuICBpZiAoIXBvc2l0aW9uQ29udGFpbmVyKSB7XHJcbiAgICBwb3NpdGlvbkNvbnRhaW5lciA9IGRvbS5wYXJzZShgPGRpdiBjbGFzcz1cImFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIgJHtwb3NpdGlvbn1cIj48L2Rpdj5gKTtcclxuICAgIHRvcENvbnRhaW5lci5hcHBlbmRDaGlsZChwb3NpdGlvbkNvbnRhaW5lcik7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gcG9zaXRpb25Db250YWluZXI7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3coY29udGVudCwge1xyXG4gIHN0eWxlID0gXCJkZWZhdWx0XCIsXHJcbiAgdGltZW91dCA9IDEwMDAwLFxyXG4gIHBvc2l0aW9uID0gXCJ0b3AtcmlnaHRcIixcclxuICBjbG9zYWJsZSA9IHRydWUsXHJcbiAgb25DbGljayA9IG51bGwsXHJcbiAgb25DbG9zZSA9IG51bGxcclxufSA9IHt9KSB7XHJcbiAgY29uc3QgY29udGFpbmVyID0gZ2V0Q29udGFpbmVyKHBvc2l0aW9uKTtcclxuXHJcbiAgY29uc3Qgbm90aWZFbG0gPSBkb20ucGFyc2UoYFxyXG4gICAgPGRpdiBjbGFzcz1cImFjb3JkLS1ub3RpZmljYXRpb24gc3R5bGUtJHtzdHlsZX0gaGlkZGVuXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGVudFwiPjwvZGl2PlxyXG4gICAgICAgICAgICA8c3ZnIGNsYXNzPVwiY2xvc2UgJHshY2xvc2FibGUgPyBcImhpZGRlblwiIDogXCJcIn1cIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiPlxyXG4gICAgICAgICAgICAgICAgPHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNMTIgMTAuNTg2bDQuOTUtNC45NSAxLjQxNCAxLjQxNC00Ljk1IDQuOTUgNC45NSA0Ljk1LTEuNDE0IDEuNDE0LTQuOTUtNC45NS00Ljk1IDQuOTUtMS40MTQtMS40MTQgNC45NS00Ljk1LTQuOTUtNC45NUw3LjA1IDUuNjM2elwiLz5cclxuICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInByb2dyZXNzLWNvbnRhaW5lclwiIHN0eWxlPVwiLS1kdXJhdGlvbjogJHt0aW1lb3V0fW1zO1wiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZ3Jlc3NcIj48L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIGApO1xyXG5cclxuICBub3RpZkVsbS5xdWVyeVNlbGVjdG9yKFwiLmNvbnRlbnRcIikuaW5uZXJIVE1MID0gY29udGVudDtcclxuXHJcbiAgbGV0IGNsb3NlZCA9IGZhbHNlO1xyXG4gIGZ1bmN0aW9uIGNsb3NlKGNsb3NlVHlwZSkge1xyXG4gICAgaWYgKGNsb3NlZCkgcmV0dXJuO1xyXG4gICAgY2xvc2VkID0gdHJ1ZTtcclxuXHJcbiAgICBub3RpZkVsbS5jbGFzc0xpc3QuYWRkKFwiY2xvc2luZ1wiKTtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBub3RpZkVsbS5yZW1vdmUoKTtcclxuXHJcbiAgICAgIHV0aWxzLmlmRXhpc3RzKFxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLWNvbnRhaW5lcmApLFxyXG4gICAgICAgIC8qKiBAcGFyYW0ge0hUTUxEaXZFbGVtZW50fSBlbG0gKi8oZWxtKSA9PiB7XHJcbiAgICAgICAgICBpZiAoIShbLi4uZWxtLmNoaWxkTm9kZXMudmFsdWVzKCldLnJlZHVjZSgocHJldiwgY3VycikgPT4gcHJldiArIGN1cnIuY2hpbGRFbGVtZW50Q291bnQsIDApKSkgZWxtLnJlbW92ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgKTtcclxuICAgIH0sIDI3NSk7XHJcbiAgICBvbkNsb3NlPy4oY2xvc2VUeXBlKTtcclxuICB9XHJcblxyXG4gIGlmICh0eXBlb2Ygb25DbGljayA9PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgIG5vdGlmRWxtLmNsYXNzTGlzdC5hZGQoXCJjbGlja2FibGVcIik7XHJcbiAgICBub3RpZkVsbS5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgICBvbkNsaWNrKGNsb3NlKTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICB1dGlscy5pZkV4aXN0cyhub3RpZkVsbS5xdWVyeVNlbGVjdG9yKFwiLmNsb3NlXCIpLCAoZWxtKSA9PiB7XHJcbiAgICBlbG0ub25jbGljayA9ICgpID0+IHtcclxuICAgICAgY2xvc2UoXCJ1c2VyXCIpO1xyXG4gICAgfTtcclxuICB9KTtcclxuXHJcbiAgY29udGFpbmVyLnByZXBlbmQobm90aWZFbG0pO1xyXG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XHJcbiAgICBub3RpZkVsbS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xyXG4gICAgbm90aWZFbG0ucXVlcnlTZWxlY3RvcihcIi5wcm9ncmVzc1wiKS5jbGFzc0xpc3QuYWRkKFwicHJvZ3Jlc3NpbmdcIik7XHJcbiAgfSk7XHJcblxyXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgY2xvc2UoXCJ0aW1lb3V0XCIpO1xyXG4gIH0sIHRpbWVvdXQpO1xyXG5cclxuICByZXR1cm4gKCkgPT4ge1xyXG4gICAgY2xvc2UoXCJmb3JjZVwiKTtcclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgc2hvdzogT2JqZWN0LmFzc2lnbihzaG93LCB7XHJcbiAgICBpbmZvOiAoaHRtbCwgb2JqID0ge30pID0+IHNob3coaHRtbCwgeyAuLi5vYmosIHN0eWxlOiBcImluZm9cIiB9KSxcclxuICAgIGVycm9yOiAoaHRtbCwgb2JqID0ge30pID0+IHNob3coaHRtbCwgeyAuLi5vYmosIHN0eWxlOiBcImVycm9yXCIgfSksXHJcbiAgICB3YXJuaW5nOiAoaHRtbCwgb2JqID0ge30pID0+IHNob3coaHRtbCwgeyAuLi5vYmosIHN0eWxlOiBcIndhcm5pbmdcIiB9KSxcclxuICAgIHN1Y2Nlc3M6IChodG1sLCBvYmogPSB7fSkgPT4gc2hvdyhodG1sLCB7IC4uLm9iaiwgc3R5bGU6IFwic3VjY2Vzc1wiIH0pLFxyXG4gIH0pLFxyXG59OyIsICJpbXBvcnQgd2VicGFjayBmcm9tIFwiLi4vbW9kdWxlcy93ZWJwYWNrLmpzXCI7XHJcbmltcG9ydCBwYXRjaGVyIGZyb20gXCIuLi9wYXRjaGVyL2luZGV4LmpzXCI7XHJcbmltcG9ydCBsb2dnZXIgZnJvbSBcIi4uL3V0aWxzL2xvZ2dlci5qc1wiO1xyXG5cclxuaW1wb3J0IGNvbW1vbiBmcm9tIFwiLi4vbW9kdWxlcy9jb21tb24uanNcIjtcclxuaW1wb3J0IHsgZmluZGVyTWFwIH0gZnJvbSBcIi4uL21vZHVsZXMvcmF3L2NvbXBsZXgtZmluZGVyLmpzXCI7XHJcblxyXG5jb25zdCB7IFJlYWN0IH0gPSBjb21tb247XHJcblxyXG5sZXQgaXNSZWFkeSA9IGZhbHNlO1xyXG5cclxubGV0IENvbXBvbmVudHMgPSBudWxsO1xyXG5cclxubGV0IEFjdGlvbnMgPSBudWxsO1xyXG5cclxuKGFzeW5jICgpID0+IHtcclxuICBBY3Rpb25zID0gYXdhaXQgKGFzeW5jICgpID0+IHtcclxuICAgIGxldCBvZ01vZHVsZTtcclxuICAgIHdoaWxlICh0cnVlKSB7XHJcbiAgICAgIG9nTW9kdWxlID0gd2VicGFjay5maWx0ZXIobSA9PiBPYmplY3QudmFsdWVzKG0pLnNvbWUodiA9PiB0eXBlb2YgdiA9PT0gXCJmdW5jdGlvblwiICYmIHYudG9TdHJpbmcoKS5pbmNsdWRlcyhcIkNPTlRFWFRfTUVOVV9DTE9TRVwiKSkpLmZpbmQobSA9PiBtLmV4cG9ydHMgIT09IHdpbmRvdyk/LmV4cG9ydHM7XHJcbiAgICAgIGlmIChvZ01vZHVsZSkgYnJlYWs7XHJcbiAgICAgIGF3YWl0IG5ldyBQcm9taXNlKHIgPT4gc2V0VGltZW91dChyLCAxMDApKTtcclxuICAgIH1cclxuICAgIGNvbnN0IG91dCA9IGZpbmRlck1hcChvZ01vZHVsZSwge1xyXG4gICAgICBjbG9zZTogW1wiQ09OVEVYVF9NRU5VX0NMT1NFXCJdLFxyXG4gICAgICBvcGVuOiBbXCJyZW5kZXJMYXp5XCJdXHJcbiAgICB9KTtcclxuICAgIGlzUmVhZHkgPSAhIW91dC5jbG9zZSAmJiAhIW91dC5vcGVuO1xyXG4gICAgcmV0dXJuIG91dDtcclxuICB9KSgpO1xyXG5cclxuICBDb21wb25lbnRzID0gKCgpID0+IHtcclxuICAgIGNvbnN0IG91dCA9IHt9O1xyXG4gICAgY29uc3QgY29tcG9uZW50TWFwID0ge1xyXG4gICAgICBzZXBhcmF0b3I6IFwiU2VwYXJhdG9yXCIsXHJcbiAgICAgIGNoZWNrYm94OiBcIkNoZWNrYm94SXRlbVwiLFxyXG4gICAgICByYWRpbzogXCJSYWRpb0l0ZW1cIixcclxuICAgICAgY29udHJvbDogXCJDb250cm9sSXRlbVwiLFxyXG4gICAgICBncm91cHN0YXJ0OiBcIkdyb3VwXCIsXHJcbiAgICAgIGN1c3RvbWl0ZW06IFwiSXRlbVwiXHJcbiAgICB9O1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IG1vZHVsZUlkID0gT2JqZWN0LmVudHJpZXMod2VicGFjay5yZXF1aXJlLm0pLmZpbmQoKFssIG1dKSA9PiBtPy50b1N0cmluZygpLmluY2x1ZGVzKFwibWVudWl0ZW1jaGVja2JveFwiKSlbMF07XHJcbiAgICAgIGNvbnN0IGNvbnRleHRNZW51TW9kdWxlID0gd2VicGFjay5maW5kKChfLCBpZHgpID0+IGlkeCA9PSBtb2R1bGVJZCkuZXhwb3J0cztcclxuICAgICAgY29uc3QgcmF3TWF0Y2hlcyA9IHdlYnBhY2sucmVxdWlyZS5tW21vZHVsZUlkXS50b1N0cmluZygpLm1hdGNoQWxsKC9pZlxcKFxcdytcXC50eXBlPT09XFx3K1xcLihcXHcrKVxcKS4rP3R5cGU6XCIoLis/KVwiL2cpO1xyXG5cclxuICAgICAgb3V0Lk1lbnUgPSBPYmplY3QudmFsdWVzKGNvbnRleHRNZW51TW9kdWxlKS5maW5kKHYgPT4gdi50b1N0cmluZygpLmluY2x1ZGVzKFwiLmlzVXNpbmdLZXlib2FyZE5hdmlnYXRpb25cIikpO1xyXG5cclxuICAgICAgWy4uLnJhd01hdGNoZXNdLmZvckVhY2goKFssIGlkLCB0eXBlXSkgPT4ge1xyXG4gICAgICAgIG91dFtjb21wb25lbnRNYXBbdHlwZV1dID0gY29udGV4dE1lbnVNb2R1bGVbaWRdO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlzUmVhZHkgPSBPYmplY3Qua2V5cyhvdXQpLmxlbmd0aCA+IDE7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgaXNSZWFkeSA9IGZhbHNlO1xyXG4gICAgICBsb2dnZXIuZXJyb3IoXCJGYWlsZWQgdG8gbG9hZCBjb250ZXh0IG1lbnUgY29tcG9uZW50c1wiLCBlcnIpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBvdXQ7XHJcbiAgfSkoKTtcclxuXHJcbiAgTWVudVBhdGNoZXIuaW5pdGlhbGl6ZSgpO1xyXG59KSgpO1xyXG5cclxuXHJcbmNsYXNzIE1lbnVQYXRjaGVyIHtcclxuICBzdGF0aWMgTUFYX1BBVENIX0lURVJBVElPTlMgPSAxNjtcclxuICBzdGF0aWMgcGF0Y2hlcyA9IG5ldyBNYXAoKTtcclxuICBzdGF0aWMgc3ViUGF0Y2hlcyA9IG5ldyBXZWFrTWFwKCk7XHJcblxyXG4gIHN0YXRpYyBpbml0aWFsaXplKCkge1xyXG4gICAgaWYgKCFpc1JlYWR5KSByZXR1cm4gbG9nZ2VyLndhcm4oXCJVbmFibGUgdG8gbG9hZCBjb250ZXh0IG1lbnUuXCIpO1xyXG5cclxuICAgIGNvbnN0IG1vZHVsZVRvUGF0Y2ggPSB3ZWJwYWNrLmZpbHRlcihtID0+IE9iamVjdC52YWx1ZXMobSkuc29tZSh2ID0+IHR5cGVvZiB2ID09PSBcImZ1bmN0aW9uXCIgJiYgdi50b1N0cmluZygpLmluY2x1ZGVzKFwiQ09OVEVYVF9NRU5VX0NMT1NFXCIpKSkuZmluZChtID0+IG0uZXhwb3J0cyAhPT0gd2luZG93KS5leHBvcnRzO1xyXG4gICAgY29uc3Qga2V5VG9QYXRjaCA9IE9iamVjdC5rZXlzKG1vZHVsZVRvUGF0Y2gpLmZpbmQoayA9PiBtb2R1bGVUb1BhdGNoW2tdPy5sZW5ndGggPT09IDMpO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKG1vZHVsZVRvUGF0Y2gsIGtleVRvUGF0Y2gpO1xyXG5cclxuICAgIHBhdGNoZXIuYmVmb3JlKFxyXG4gICAgICBrZXlUb1BhdGNoLFxyXG4gICAgICBtb2R1bGVUb1BhdGNoLFxyXG4gICAgICBmdW5jdGlvbiAobWV0aG9kQXJncykge1xyXG4gICAgICAgIGNvbnN0IHByb21pc2UgPSBtZXRob2RBcmdzWzFdO1xyXG4gICAgICAgIG1ldGhvZEFyZ3NbMV0gPSBhc3luYyBmdW5jdGlvbiAoLi4uYXJncykge1xyXG4gICAgICAgICAgY29uc3QgcmVuZGVyID0gYXdhaXQgcHJvbWlzZS5jYWxsKHRoaXMsIC4uLmFyZ3MpO1xyXG5cclxuICAgICAgICAgIHJldHVybiAocHJvcHMpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcmVzID0gcmVuZGVyKHByb3BzKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChyZXM/LnByb3BzLm5hdklkKSB7XHJcbiAgICAgICAgICAgICAgTWVudVBhdGNoZXIuZXhlY3V0ZVBhdGNoZXMocmVzLnByb3BzLm5hdklkLCByZXMsIHByb3BzKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgcmVzPy50eXBlID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICAgICAgICBNZW51UGF0Y2hlci5wYXRjaFJlY3Vyc2l2ZShyZXMsIFwidHlwZVwiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlcztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBtZXRob2RBcmdzO1xyXG4gICAgICB9XHJcbiAgICApXHJcbiAgfVxyXG5cclxuICBzdGF0aWMgcGF0Y2hSZWN1cnNpdmUodGFyZ2V0LCBtZXRob2QsIGl0ZXJhdGlvbiA9IDApIHtcclxuICAgIGlmIChpdGVyYXRpb24gPj0gdGhpcy5NQVhfUEFUQ0hfSVRFUkFUSU9OUykgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IHByb3h5RnVuY3Rpb24gPSB0aGlzLnN1YlBhdGNoZXMuZ2V0KHRhcmdldFttZXRob2RdKSA/PyAoKCkgPT4ge1xyXG4gICAgICBjb25zdCBvcmlnaW5hbEZ1bmN0aW9uID0gdGFyZ2V0W21ldGhvZF07XHJcbiAgICAgIGNvbnN0IGRlcHRoID0gKytpdGVyYXRpb247XHJcbiAgICAgIGZ1bmN0aW9uIHBhdGNoKC4uLmFyZ3MpIHtcclxuICAgICAgICBjb25zdCByZXMgPSBvcmlnaW5hbEZ1bmN0aW9uLmNhbGwodGhpcywgLi4uYXJncyk7XHJcblxyXG4gICAgICAgIGlmICghcmVzKSByZXR1cm4gcmVzO1xyXG5cclxuICAgICAgICBjb25zdCBuYXZJZCA9IHJlcy5wcm9wcz8ubmF2SWQgPz8gcmVzLnByb3BzPy5jaGlsZHJlbj8ucHJvcHM/Lm5hdklkO1xyXG4gICAgICAgIGlmIChuYXZJZCkge1xyXG4gICAgICAgICAgTWVudVBhdGNoZXIuZXhlY3V0ZVBhdGNoZXMobmF2SWQsIHJlcywgYXJnc1swXSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnN0IGxheWVyID0gcmVzLnByb3BzLmNoaWxkcmVuID8gcmVzLnByb3BzLmNoaWxkcmVuIDogcmVzO1xyXG5cclxuICAgICAgICAgIGlmICh0eXBlb2YgbGF5ZXI/LnR5cGUgPT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgICAgIE1lbnVQYXRjaGVyLnBhdGNoUmVjdXJzaXZlKGxheWVyLCBcInR5cGVcIiwgZGVwdGgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJlcztcclxuICAgICAgfVxyXG5cclxuICAgICAgcGF0Y2guX19vcmlnaW5hbF9fID0gb3JpZ2luYWxGdW5jdGlvbjtcclxuICAgICAgT2JqZWN0LmFzc2lnbihwYXRjaCwgb3JpZ2luYWxGdW5jdGlvbik7XHJcbiAgICAgIHRoaXMuc3ViUGF0Y2hlcy5zZXQob3JpZ2luYWxGdW5jdGlvbiwgcGF0Y2gpO1xyXG5cclxuICAgICAgcmV0dXJuIHBhdGNoO1xyXG4gICAgfSkoKTtcclxuXHJcbiAgICB0YXJnZXRbbWV0aG9kXSA9IHByb3h5RnVuY3Rpb247XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZXhlY3V0ZVBhdGNoZXMoaWQsIHJlcywgcHJvcHMpIHtcclxuICAgIGlmICghdGhpcy5wYXRjaGVzLmhhcyhpZCkpIHJldHVybjtcclxuXHJcbiAgICB0aGlzLnBhdGNoZXMuZ2V0KGlkKS5mb3JFYWNoKHBhdGNoID0+IHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBwYXRjaChyZXMsIHByb3BzKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgbG9nZ2VyLmVycm9yKFwiRmFpbGVkIHRvIHBhdGNoIGNvbnRleHQgbWVudVwiLCBwYXRjaCwgZXJyKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcblxyXG5cclxuLy8gQ29waWVkIGZyb20gYmQncyBzb3VyY2VcclxuZnVuY3Rpb24gYnVpbGRJdGVtKHByb3BzKSB7XHJcbiAgY29uc3QgeyB0eXBlIH0gPSBwcm9wcztcclxuICBpZiAodHlwZSA9PT0gXCJzZXBhcmF0b3JcIikgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQ29tcG9uZW50cy5TZXBhcmF0b3IpO1xyXG5cclxuICBsZXQgY29tcG9uZW50ID0gQ29tcG9uZW50cy5JdGVtO1xyXG4gIGlmICh0eXBlID09PSBcInN1Ym1lbnVcIikge1xyXG4gICAgaWYgKCFwcm9wcy5jaGlsZHJlbikgcHJvcHMuY2hpbGRyZW4gPSBidWlsZE1lbnVDaGlsZHJlbihwcm9wcy5yZW5kZXIgfHwgcHJvcHMuaXRlbXMpO1xyXG4gIH0gZWxzZSBpZiAodHlwZSA9PT0gXCJ0b2dnbGVcIiB8fCB0eXBlID09PSBcInJhZGlvXCIpIHtcclxuICAgIGNvbXBvbmVudCA9IHR5cGUgPT09IFwidG9nZ2xlXCIgPyBDb21wb25lbnRzLkNoZWNrYm94SXRlbSA6IENvbXBvbmVudHMuUmFkaW9JdGVtO1xyXG4gICAgaWYgKHByb3BzLmFjdGl2ZSkgcHJvcHMuY2hlY2tlZCA9IHByb3BzLmFjdGl2ZTtcclxuICB9IGVsc2UgaWYgKHR5cGUgPT09IFwiY29udHJvbFwiKSB7XHJcbiAgICBjb21wb25lbnQgPSBDb21wb25lbnRzLkNvbnRyb2xJdGVtO1xyXG4gIH1cclxuICBpZiAoIXByb3BzLmlkKSBwcm9wcy5pZCA9IGAke3Byb3BzLmxhYmVsLnJlcGxhY2UoL15bXmEtel0rfFteXFx3LV0rL2dpLCBcIi1cIil9YDtcclxuICBpZiAocHJvcHMuZGFuZ2VyKSBwcm9wcy5jb2xvciA9IFwiY29sb3JEYW5nZXJcIjtcclxuICBwcm9wcy5leHRlbmRlZCA9IHRydWU7XHJcblxyXG4gIGlmICh0eXBlID09PSBcInRvZ2dsZVwiKSB7XHJcbiAgICBjb25zdCBbYWN0aXZlLCBkb1RvZ2dsZV0gPSBSZWFjdC51c2VTdGF0ZShwcm9wcy5jaGVja2VkIHx8IGZhbHNlKTtcclxuICAgIGNvbnN0IG9yaWdpbmFsQWN0aW9uID0gcHJvcHMuYWN0aW9uO1xyXG4gICAgcHJvcHMuY2hlY2tlZCA9IGFjdGl2ZTtcclxuICAgIHByb3BzLmFjdGlvbiA9IGZ1bmN0aW9uIChldikge1xyXG4gICAgICBvcmlnaW5hbEFjdGlvbihldik7XHJcbiAgICAgIGRvVG9nZ2xlKCFhY3RpdmUpO1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KGNvbXBvbmVudCwgcHJvcHMpO1xyXG59XHJcblxyXG4vLyBDb3BpZWQgZnJvbSBiZCdzIHNvdXJjZVxyXG5mdW5jdGlvbiBidWlsZE1lbnVDaGlsZHJlbihzZXR1cCkge1xyXG4gIGNvbnN0IG1hcHBlciA9IHMgPT4ge1xyXG4gICAgaWYgKHMudHlwZSA9PT0gXCJncm91cFwiKSByZXR1cm4gYnVpbGRHcm91cChzKTtcclxuICAgIHJldHVybiBidWlsZEl0ZW0ocyk7XHJcbiAgfTtcclxuICBjb25zdCBidWlsZEdyb3VwID0gZnVuY3Rpb24gKGdyb3VwKSB7XHJcbiAgICBjb25zdCBpdGVtcyA9IGdyb3VwLml0ZW1zLm1hcChtYXBwZXIpLmZpbHRlcihpID0+IGkpO1xyXG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTWVudUNvbXBvbmVudHMuR3JvdXAsIG51bGwsIGl0ZW1zKTtcclxuICB9O1xyXG4gIHJldHVybiBzZXR1cC5tYXAobWFwcGVyKS5maWx0ZXIoaSA9PiBpKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIF9fY2FjaGVfXzoge1xyXG4gICAgcGF0Y2hlczogTWVudVBhdGNoZXIucGF0Y2hlcyxcclxuICAgIHN1YlBhdGNoZXM6IE1lbnVQYXRjaGVyLnN1YlBhdGNoZXNcclxuICB9LFxyXG4gIHBhdGNoKG5hdklkLCBjYikge1xyXG4gICAgaWYgKCFNZW51UGF0Y2hlci5wYXRjaGVzLmhhcyhuYXZJZCkpIE1lbnVQYXRjaGVyLnBhdGNoZXMuc2V0KG5hdklkLCBuZXcgU2V0KCkpO1xyXG4gICAgTWVudVBhdGNoZXIucGF0Y2hlcy5nZXQobmF2SWQpLmFkZChjYik7XHJcblxyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgTWVudVBhdGNoZXIucGF0Y2hlcy5nZXQobmF2SWQpLmRlbGV0ZShjYik7XHJcbiAgICB9XHJcbiAgfSxcclxuICBvcGVuKGV2ZW50LCBjb21wb25lbnQsIGNvbmZpZykge1xyXG4gICAgcmV0dXJuIEFjdGlvbnMub3BlbihldmVudCwgKGUpID0+IFJlYWN0LmNyZWF0ZUVsZW1lbnQoY29tcG9uZW50LCBPYmplY3QuYXNzaWduKHt9LCBlLCB7IG9uQ2xvc2U6IEFjdGlvbnMuY2xvc2UgfSkpLCBjb25maWcpO1xyXG4gIH0sXHJcbiAgY2xvc2UoKSB7XHJcbiAgICByZXR1cm4gQWN0aW9ucy5jbG9zZSgpO1xyXG4gIH0sXHJcbiAgYnVpbGQ6IHtcclxuICAgIGl0ZW0oc2V0dXApIHtcclxuICAgICAgcmV0dXJuIGJ1aWxkTWVudUNoaWxkcmVuKHNldHVwKTtcclxuICAgIH0sXHJcbiAgICBtZW51KHNldHVwKSB7XHJcbiAgICAgIHJldHVybiAocHJvcHMpID0+IFJlYWN0LmNyZWF0ZUVsZW1lbnQoTWVudUNvbXBvbmVudHMuTWVudSwgcHJvcHMsIHRoaXMuYnVpbGRNZW51Q2hpbGRyZW4oc2V0dXApKTtcclxuICAgIH1cclxuICB9XHJcbn07IiwgImltcG9ydCBjb21tb24gZnJvbSBcIi4uLy4uL2FwaS9tb2R1bGVzL2NvbW1vblwiO1xyXG5pbXBvcnQgbG9nZ2VyIGZyb20gXCIuLi8uLi9hcGkvdXRpbHMvbG9nZ2VyLmpzXCI7XHJcbmNvbnN0IHsgUmVhY3QgfSA9IGNvbW1vbjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVycm9yQm91bmRhcnkgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcbiAgICB0aGlzLnN0YXRlID0geyBlcnJvcjogbnVsbCB9O1xyXG4gIH1cclxuXHJcbiAgY29tcG9uZW50RGlkQ2F0Y2goZXJyb3IpIHtcclxuICAgIHRoaXMuc2V0U3RhdGUoeyBlcnJvciB9KTtcclxuICAgIGxvZ2dlci5lcnJvcihlcnJvcik7XHJcbiAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMub25FcnJvciA9PT0gXCJmdW5jdGlvblwiKSB0aGlzLnByb3BzLm9uRXJyb3IoZXJyb3IpO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgaWYgKHRoaXMuc3RhdGUuZXJyb3IpIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImFjb3JkLS1yZWFjdC1lcnJvclwiPlxyXG4gICAgICA8cD5VbmV4cGVjdGVkIFJlYWN0IEVycm9yIEhhcHBlbmVkLjwvcD5cclxuICAgICAgPHA+e2Ake3RoaXMuc3RhdGUuZXJyb3J9YH08L3A+XHJcbiAgICA8L2Rpdj47XHJcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5jaGlsZHJlbjtcclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IG9yaWdpbmFsUmVuZGVyID0gRXJyb3JCb3VuZGFyeS5wcm90b3R5cGUucmVuZGVyO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoRXJyb3JCb3VuZGFyeS5wcm90b3R5cGUsIFwicmVuZGVyXCIsIHtcclxuICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICBjb25maWd1cmFibGU6IGZhbHNlLFxyXG4gIHNldDogZnVuY3Rpb24gKCkgeyB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3Qgc2V0IHJlbmRlciBtZXRob2Qgb2YgRXJyb3JCb3VuZGFyeVwiKTsgfSxcclxuICBnZXQ6ICgpID0+IG9yaWdpbmFsUmVuZGVyXHJcbn0pOyIsICJpbXBvcnQgRXJyb3JCb3VuZGFyeSBmcm9tIFwiLi4vLi4vbGliL2NvbXBvbmVudHMvRXJyb3JCb3VuZGFyeS5qc3hcIjtcclxuaW1wb3J0IGNvbW1vbiBmcm9tIFwiLi4vbW9kdWxlcy9jb21tb24uanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBFcnJvckJvdW5kYXJ5LFxyXG4gIEJ1dHRvbjogY29tbW9uLmNvbXBvbmVudHMuQnV0dG9uLFxyXG4gIE1hcmtkb3duOiBjb21tb24uY29tcG9uZW50cy5NYXJrZG93bixcclxuICBUZXh0OiBjb21tb24uY29tcG9uZW50cy5UZXh0LFxyXG4gIENvbmZpcm1hdGlvbk1vZGFsOiBjb21tb24uY29tcG9uZW50cy5Db25maXJtYXRpb25Nb2RhbCxcclxuICBNb2RhbFJvb3Q6IGNvbW1vbi5tb2RhbHMuY29tcG9uZW50cy5Sb290LFxyXG4gIE1vZGFsQ2xvc2VCdXR0b246IGNvbW1vbi5tb2RhbHMuY29tcG9uZW50cy5vdGhlci5DbG9zZUJ1dHRvbixcclxuICBNb2RhbEhlYWRlcjogY29tbW9uLm1vZGFscy5jb21wb25lbnRzLm90aGVyLkhlYWRlcixcclxuICBNb2RhbENvbnRlbnQ6IGNvbW1vbi5tb2RhbHMuY29tcG9uZW50cy5vdGhlci5Db250ZW50LFxyXG4gIE1vZGFsRm9vdGVyOiBjb21tb24ubW9kYWxzLmNvbXBvbmVudHMub3RoZXIuRm9vdGVyLFxyXG4gIE1vZGFsTGlzdENvbnRlbnQ6IGNvbW1vbi5tb2RhbHMuY29tcG9uZW50cy5vdGhlci5MaXN0Q29udGVudCxcclxuICBUb29sdGlwOiBjb21tb24uY29tcG9uZW50cy5Ub29sdGlwLFxyXG59IiwgImltcG9ydCBFcnJvckJvdW5kYXJ5IGZyb20gXCIuLi8uLi9saWIvY29tcG9uZW50cy9FcnJvckJvdW5kYXJ5LmpzeFwiO1xyXG5pbXBvcnQgY29tbW9uIGZyb20gXCIuLi9tb2R1bGVzL2NvbW1vbi5qc1wiO1xyXG5pbXBvcnQgaTE4biBmcm9tIFwiLi4vaTE4bi9pbmRleC5qc1wiXHJcbmNvbnN0IHsgUmVhY3QsIEZsdXhEaXNwYXRjaGVyLCBjb21wb25lbnRzLCBtb2RhbHMsIFVzZXJTdG9yZSB9ID0gY29tbW9uO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIHNob3c6IHtcclxuICAgIGNvbmZpcm1hdGlvbih0aXRsZSwgY29udGVudCwgeyBjb25maXJtID0gbnVsbCwgY2FuY2VsID0gbnVsbCwgZGFuZ2VyID0gZmFsc2UsIGtleSA9IHVuZGVmaW5lZCwgdGltZW91dCA9IDYwMDAwICogNSB9ID0ge30pIHtcclxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGNvbnRlbnQpKSBjb250ZW50ID0gW2NvbnRlbnRdO1xyXG4gICAgICAgIGNvbnRlbnQgPSBjb250ZW50Lm1hcChpID0+IHR5cGVvZiBpID09PSBcInN0cmluZ1wiID8gUmVhY3QuY3JlYXRlRWxlbWVudChjb21wb25lbnRzLk1hcmtkb3duLCBudWxsLCBpKSA6IGkpO1xyXG4gICAgICAgIGNvbnN0IG1vZGFsS2V5ID0gbW9kYWxzLmFjdGlvbnMub3BlbigocHJvcHMpID0+IHtcclxuICAgICAgICAgIGxldCBpbnRlcmFjdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICByZXR1cm4gPEVycm9yQm91bmRhcnkgb25FcnJvcj17KCkgPT4geyByZXNvbHZlKGZhbHNlKTsgfX0+XHJcbiAgICAgICAgICAgIDxjb21wb25lbnRzLkNvbmZpcm1hdGlvbk1vZGFsXHJcbiAgICAgICAgICAgICAgaGVhZGVyPXt0aXRsZX1cclxuICAgICAgICAgICAgICBjb25maXJtQnV0dG9uQ29sb3I9e2RhbmdlciA/IGNvbXBvbmVudHMuQnV0dG9uLkNvbG9ycy5SRUQgOiBjb21wb25lbnRzLkJ1dHRvbi5Db2xvcnMuQlJBTkR9XHJcbiAgICAgICAgICAgICAgY29uZmlybVRleHQ9e2NvbmZpcm0gfHwgaTE4bi5mb3JtYXQoXCJDT05GSVJNXCIpfVxyXG4gICAgICAgICAgICAgIGNhbmNlbFRleHQ9e2NhbmNlbH1cclxuICAgICAgICAgICAgICBvbkNhbmNlbD17KCkgPT4geyByZXNvbHZlKGZhbHNlKTsgbW9kYWxzLmFjdGlvbnMuY2xvc2UobW9kYWxLZXkpOyBpbnRlcmFjdGVkID0gdHJ1ZTsgfX1cclxuICAgICAgICAgICAgICBvbkNvbmZpcm09eygpID0+IHsgcmVzb2x2ZSh0cnVlKTsgbW9kYWxzLmFjdGlvbnMuY2xvc2UobW9kYWxLZXkpOyBpbnRlcmFjdGVkID0gdHJ1ZTsgfX1cclxuICAgICAgICAgICAgICB7Li4ucHJvcHN9XHJcbiAgICAgICAgICAgICAgb25DbG9zZT17KCkgPT4geyBwcm9wcy5vbkNsb3NlKCk7IHJlc29sdmUoZmFsc2UpOyBtb2RhbHMuYWN0aW9ucy5jbG9zZShtb2RhbEtleSk7IH19XHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICA8RXJyb3JCb3VuZGFyeSBvbkVycm9yPXsoKSA9PiB7IHJlc29sdmUoZmFsc2UpOyB9fT5cclxuICAgICAgICAgICAgICAgIHtjb250ZW50fVxyXG4gICAgICAgICAgICAgIDwvRXJyb3JCb3VuZGFyeT5cclxuICAgICAgICAgICAgPC9jb21wb25lbnRzLkNvbmZpcm1hdGlvbk1vZGFsPlxyXG4gICAgICAgICAgPC9FcnJvckJvdW5kYXJ5PlxyXG4gICAgICAgIH0sIHsgbW9kYWxLZXk6IGtleSB9KTtcclxuICAgICAgICBpZiAodGltZW91dCkge1xyXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghaW50ZXJhY3RlZCkge1xyXG4gICAgICAgICAgICAgIHJlc29sdmUoZmFsc2UpO1xyXG4gICAgICAgICAgICAgIG1vZGFscy5hY3Rpb25zLmNsb3NlKG1vZGFsS2V5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSwgdGltZW91dCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBjbG9zZShrZXkpIHtcclxuICAgICAgcmV0dXJuIG1vZGFscy5hY3Rpb25zLmNsb3NlKGtleSk7XHJcbiAgICB9LFxyXG4gICAgdXNlcih1c2VySWQpIHtcclxuICAgICAgaWYgKCFVc2VyU3RvcmUuZ2V0VXNlcih1c2VySWQpKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIEZsdXhEaXNwYXRjaGVyLmRpc3BhdGNoKHsgdHlwZTogXCJVU0VSX1BST0ZJTEVfTU9EQUxfT1BFTlwiLCB1c2VySWQgfSk7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSxcclxuICAgIGFsZXJ0KHRpdGxlLCBjb250ZW50LCB7IGNvbmZpcm0gPSBudWxsLCBrZXkgPSB1bmRlZmluZWQsIHRpbWVvdXQgPSA2MDAwMCAqIDUgfSA9IHt9KSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmNvbmZpcm1hdGlvbih0aXRsZSwgY29udGVudCwgeyBjb25maXJtLCBjYW5jZWw6IG51bGwsIGtleSwgdGltZW91dCB9KTtcclxuICAgIH1cclxuICB9XHJcbn0iLCAiaW1wb3J0IGRvbSBmcm9tIFwiLi4vZG9tL2luZGV4LmpzXCI7XHJcblxyXG5mdW5jdGlvbiBnZXRDb250YWluZXIoKSB7XHJcbiAgY29uc3QgYXBwRWxtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2NsYXNzKj1cIm5vdEFwcEFzaWRlUGFuZWwtXCJdJyk7XHJcblxyXG4gIGxldCB0b3BDb250YWluZXIgPSBhcHBFbG0ucXVlcnlTZWxlY3RvcihcIi5hY29yZC0tdG9hc3RzLWNvbnRhaW5lclwiKTtcclxuICBpZiAoIXRvcENvbnRhaW5lcikge1xyXG4gICAgdG9wQ29udGFpbmVyID0gZG9tLnBhcnNlKGA8ZGl2IGNsYXNzPVwiYWNvcmQtLWxheWVyLWNvbnRhaW5lciBhY29yZC0tdG9hc3RzLWNvbnRhaW5lclwiPjwvZGl2PmApO1xyXG4gICAgYXBwRWxtLmFwcGVuZENoaWxkKHRvcENvbnRhaW5lcik7XHJcbiAgfVxyXG4gIHRvcENvbnRhaW5lci5zdHlsZS5zZXRQcm9wZXJ0eShcIi0tdG9wLW9mZnNldFwiLCBgJHthcHBFbG0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wLnRvRml4ZWQoMSl9cHhgKTtcclxuXHJcbiAgcmV0dXJuIHRvcENvbnRhaW5lcjtcclxufVxyXG5cclxuY29uc3QgaWNvbnMgPSB7XHJcbiAgaW5mbzogYDxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiPjxwYXRoIGQ9XCJNMTIgMjJDNi40NzcgMjIgMiAxNy41MjMgMiAxMlM2LjQ3NyAyIDEyIDJzMTAgNC40NzcgMTAgMTAtNC40NzcgMTAtMTAgMTB6bS0xLTExdjZoMnYtNmgtMnptMC00djJoMlY3aC0yelwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIiAvPjwvc3ZnPmAsXHJcbiAgd2FybmluZzogYDxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiPjxwYXRoIGQ9XCJNMTIgMjJDNi40NzcgMjIgMiAxNy41MjMgMiAxMlM2LjQ3NyAyIDEyIDJzMTAgNC40NzcgMTAgMTAtNC40NzcgMTAtMTAgMTB6bS0xLTd2Mmgydi0yaC0yem0wLTh2NmgyVjdoLTJ6XCIgZmlsbD1cImN1cnJlbnRDb2xvclwiIC8+PC9zdmc+YCxcclxuICBlcnJvcjogYDxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiPjxwYXRoIGQ9XCJNMTIgMjJDNi40NzcgMjIgMiAxNy41MjMgMiAxMlM2LjQ3NyAyIDEyIDJzMTAgNC40NzcgMTAgMTAtNC40NzcgMTAtMTAgMTB6bS0xLTd2Mmgydi0yaC0yem0wLTh2NmgyVjdoLTJ6XCJmaWxsPVwiY3VycmVudENvbG9yXCIgLz48L3N2Zz5gLFxyXG4gIHN1Y2Nlc3M6IGA8c3ZnIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMjRcIj48cGF0aCBkPVwiTTEyIDIyQzYuNDc3IDIyIDIgMTcuNTIzIDIgMTJTNi40NzcgMiAxMiAyczEwIDQuNDc3IDEwIDEwLTQuNDc3IDEwLTEwIDEwem0tLjk5Ny02bDcuMDctNy4wNzEtMS40MTQtMS40MTQtNS42NTYgNS42NTctMi44MjktMi44MjktMS40MTQgMS40MTRMMTEuMDAzIDE2elwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIiAvPjwvc3ZnPmBcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIHNob3coXHJcbiAgY29udGVudCxcclxuICB7XHJcbiAgICBzdHlsZSA9IFwiZGVmYXVsdFwiLFxyXG4gICAgdGltZW91dCA9IDM1MDAsXHJcbiAgICBvbkNsaWNrID0gbnVsbCxcclxuICAgIGhpZGVJY29uID0gZmFsc2VcclxuICB9ID0ge31cclxuKSB7XHJcbiAgY29uc3QgY29udGFpbmVyID0gZ2V0Q29udGFpbmVyKCk7XHJcblxyXG4gIGNvbnN0IHRvYXN0RWxtID0gZG9tLnBhcnNlKGBcclxuICAgIDxkaXYgY2xhc3M9XCJhY29yZC0tdG9hc3Qgc3R5bGUtJHtzdHlsZX0gaGlkZGVuXCI+XHJcbiAgICAgICR7aGlkZUljb24gPyBcIlwiIDogKGljb25zW3N0eWxlXSB8fCBcIlwiKX1cclxuICAgICAgPGRpdiBjbGFzcz1cImNvbnRlbnRcIj48L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIGApO1xyXG5cclxuICB0b2FzdEVsbS5xdWVyeVNlbGVjdG9yKFwiLmNvbnRlbnRcIikuaW5uZXJIVE1MID0gY29udGVudDtcclxuXHJcbiAgbGV0IGNsb3NlZCA9IGZhbHNlO1xyXG4gIGZ1bmN0aW9uIGNsb3NlKCkge1xyXG4gICAgaWYgKGNsb3NlZCkgcmV0dXJuO1xyXG4gICAgY2xvc2VkID0gdHJ1ZTtcclxuXHJcbiAgICB0b2FzdEVsbS5jbGFzc0xpc3QuYWRkKFwiY2xvc2luZ1wiKTtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICB0b2FzdEVsbS5yZW1vdmUoKTtcclxuXHJcbiAgICAgIHV0aWxzLmlmRXhpc3RzKFxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5hY29yZC0tdG9hc3RzLWNvbnRhaW5lcmApLFxyXG4gICAgICAgIC8qKiBAcGFyYW0ge0hUTUxEaXZFbGVtZW50fSBlbG0gKi8oZWxtKSA9PiB7XHJcbiAgICAgICAgICBpZiAoIWVsbS5jaGlsZEVsZW1lbnRDb3VudCkgZWxtLnJlbW92ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgKTtcclxuICAgIH0sIDI3NSk7XHJcbiAgfVxyXG5cclxuICBpZiAodHlwZW9mIG9uQ2xpY2sgPT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICB0b2FzdEVsbS5jbGFzc0xpc3QuYWRkKFwiY2xpY2thYmxlXCIpO1xyXG4gICAgdG9hc3RFbG0ub25jbGljayA9ICgpID0+IHtcclxuICAgICAgb25DbGljayhjbG9zZSk7XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKHRvYXN0RWxtKTtcclxuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xyXG4gICAgdG9hc3RFbG0uY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcclxuICB9KTtcclxuXHJcbiAgc2V0VGltZW91dChjbG9zZSwgdGltZW91dCk7XHJcblxyXG4gIHJldHVybiAoKSA9PiB7XHJcbiAgICBjbG9zZSgpO1xyXG4gIH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBzaG93OiBPYmplY3QuYXNzaWduKHNob3csIHtcclxuICAgIGluZm86IChodG1sLCBvYmogPSB7fSkgPT4gc2hvdyhodG1sLCB7IC4uLm9iaiwgc3R5bGU6IFwiaW5mb1wiIH0pLFxyXG4gICAgZXJyb3I6IChodG1sLCBvYmogPSB7fSkgPT4gc2hvdyhodG1sLCB7IC4uLm9iaiwgc3R5bGU6IFwiZXJyb3JcIiB9KSxcclxuICAgIHdhcm5pbmc6IChodG1sLCBvYmogPSB7fSkgPT4gc2hvdyhodG1sLCB7IC4uLm9iaiwgc3R5bGU6IFwid2FybmluZ1wiIH0pLFxyXG4gICAgc3VjY2VzczogKGh0bWwsIG9iaiA9IHt9KSA9PiBzaG93KGh0bWwsIHsgLi4ub2JqLCBzdHlsZTogXCJzdWNjZXNzXCIgfSlcclxuICB9KVxyXG59IiwgImltcG9ydCBwYXRjaGVyIGZyb20gXCIuLi9wYXRjaGVyL2luZGV4LmpzXCI7XHJcbmltcG9ydCBzdHlsZUNTU1RleHQgZnJvbSBcIi4vc3R5bGVzLnNjc3NcIjtcclxucGF0Y2hlci5pbmplY3RDU1Moc3R5bGVDU1NUZXh0KTtcclxuXHJcbmltcG9ydCB0b29sdGlwcyBmcm9tIFwiLi90b29sdGlwcy5qc1wiO1xyXG5pbXBvcnQgbm90aWZpY2F0aW9ucyBmcm9tIFwiLi9ub3RpZmljYXRpb25zLmpzXCI7XHJcbmltcG9ydCBjb250ZXh0TWVudXMgZnJvbSBcIi4vY29udGV4dE1lbnVzLmpzXCI7XHJcbmltcG9ydCBjb21wb25lbnRzIGZyb20gXCIuL2NvbXBvbmVudHMuanNcIjtcclxuaW1wb3J0IG1vZGFscyBmcm9tIFwiLi9tb2RhbHMuanN4XCI7XHJcbmltcG9ydCB0b2FzdHMgZnJvbSBcIi4vdG9hc3RzLmpzXCI7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIHRvb2x0aXBzLFxyXG4gIG5vdGlmaWNhdGlvbnMsXHJcbiAgY29udGV4dE1lbnVzLFxyXG4gIGNvbXBvbmVudHMsXHJcbiAgbW9kYWxzLFxyXG4gIHRvYXN0c1xyXG59IiwgImltcG9ydCBtb2R1bGVzIGZyb20gJy4vbW9kdWxlcyc7XHJcbmltcG9ydCBkZXYgZnJvbSAnLi9kZXYnO1xyXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi91dGlscyc7XHJcbmltcG9ydCBleHRlbnNpb25zIGZyb20gJy4vZXh0ZW5zaW9ucyc7XHJcbmltcG9ydCBpMThuIGZyb20gJy4vaTE4bic7XHJcbmltcG9ydCBzdG9yYWdlIGZyb20gJy4vc3RvcmFnZSc7XHJcbmltcG9ydCBldmVudHMgZnJvbSAnLi9ldmVudHMnO1xyXG5pbXBvcnQgcGF0Y2hlciBmcm9tICcuL3BhdGNoZXInO1xyXG5pbXBvcnQgaW50ZXJuYWwgZnJvbSAnLi9pbnRlcm5hbCc7XHJcbmltcG9ydCB3ZWJzb2NrZXQgZnJvbSAnLi93ZWJzb2NrZXQnO1xyXG5pbXBvcnQgZG9tIGZyb20gJy4vZG9tJztcclxuaW1wb3J0IHVpIGZyb20gJy4vdWkvaW5kZXguanMnO1xyXG5cclxudXRpbHMubG9nZ2VyLmRlYnVnKGBQUkVMT0FEX0tFWTogPFBSRUxPQURfS0VZPmApO1xyXG5cclxuZnVuY3Rpb24gZGV2RXJyb3IoYXBpKSB7XHJcbiAgcmV0dXJuIG5ldyBFcnJvcihgVGhlICR7YXBpfSBBUEkgY2FuIG9ubHkgYmUgYWNjZXNzZWQgd2hlbiBEZXYgbW9kZSBpcyBlbmFibGVkIWApO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgZXhwb3NlZEFQSToge1xyXG4gICAgZGV2LFxyXG4gICAgdXRpbHMsXHJcbiAgICBpMThuLFxyXG4gICAgZXZlbnRzLFxyXG4gICAgdWksXHJcbiAgICBnZXQgZG9tKCkge1xyXG4gICAgICBpZiAoIWRldi5lbmFibGVkKSB0aHJvdyBkZXZFcnJvcihcIkRPTVwiKTtcclxuICAgICAgcmV0dXJuIGRvbTtcclxuICAgIH0sXHJcbiAgICBnZXQgcGF0Y2hlcigpIHtcclxuICAgICAgaWYgKCFkZXYuZW5hYmxlZCkgdGhyb3cgZGV2RXJyb3IoXCJQYXRjaGVyXCIpO1xyXG4gICAgICByZXR1cm4gcGF0Y2hlcjtcclxuICAgIH0sXHJcbiAgICBnZXQgc3RvcmFnZSgpIHtcclxuICAgICAgaWYgKCFkZXYuZW5hYmxlZCkgdGhyb3cgZGV2RXJyb3IoXCJTdG9yYWdlXCIpO1xyXG4gICAgICByZXR1cm4gc3RvcmFnZTtcclxuICAgIH0sXHJcbiAgICBnZXQgbW9kdWxlcygpIHtcclxuICAgICAgaWYgKCFkZXYuZW5hYmxlZCkgdGhyb3cgZGV2RXJyb3IoXCJNb2R1bGVzXCIpO1xyXG4gICAgICByZXR1cm4gbW9kdWxlcztcclxuICAgIH0sXHJcbiAgICBnZXQgZXh0ZW5zaW9ucygpIHtcclxuICAgICAgaWYgKCFkZXYuZW5hYmxlZCkgdGhyb3cgZGV2RXJyb3IoXCJFeHRlbnNpb25zXCIpO1xyXG4gICAgICByZXR1cm4gZXh0ZW5zaW9ucztcclxuICAgIH0sXHJcbiAgICBnZXQgaW50ZXJuYWwoKSB7XHJcbiAgICAgIGlmICghZGV2LmVuYWJsZWQpIHRocm93IGRldkVycm9yKFwiSW50ZXJuYWxcIik7XHJcbiAgICAgIHJldHVybiBpbnRlcm5hbDtcclxuICAgIH0sXHJcbiAgICBnZXQgd2Vic29ja2V0KCkge1xyXG4gICAgICBpZiAoIWRldi5lbmFibGVkKSB0aHJvdyBkZXZFcnJvcihcIldlYnNvY2tldFwiKTtcclxuICAgICAgcmV0dXJuIHdlYnNvY2tldDtcclxuICAgIH1cclxuICB9LFxyXG4gIHVuZXhwb3NlZEFQSToge1xyXG4gICAgZGV2LFxyXG4gICAgbW9kdWxlcyxcclxuICAgIHV0aWxzLFxyXG4gICAgZXh0ZW5zaW9ucyxcclxuICAgIGkxOG4sXHJcbiAgICBzdG9yYWdlLFxyXG4gICAgZXZlbnRzLFxyXG4gICAgcGF0Y2hlcixcclxuICAgIGludGVybmFsLFxyXG4gICAgd2Vic29ja2V0LFxyXG4gICAgdWksXHJcbiAgICBkb21cclxuICB9XHJcbn0iLCAiaW1wb3J0IG1vZHVsZXMgZnJvbSBcIi4uL2FwaS9tb2R1bGVzL2luZGV4LmpzXCI7XHJcbmltcG9ydCBtb2RhbHMgZnJvbSBcIi4uL2FwaS91aS9tb2RhbHMuanN4XCI7XHJcbmltcG9ydCBub3RpZmljYXRpb25zIGZyb20gXCIuLi9hcGkvdWkvbm90aWZpY2F0aW9ucy5qc1wiO1xyXG5pbXBvcnQgZXh0ZW5zaW9ucyBmcm9tIFwiLi4vYXBpL2V4dGVuc2lvbnMvaW5kZXguanNcIjtcclxuaW1wb3J0IHdlYnNvY2tldCBmcm9tIFwiLi4vYXBpL3dlYnNvY2tldC9pbmRleC5qc1wiO1xyXG5cclxud2Vic29ja2V0LnNldChcIkluc3RhbGxFeHRlbnNpb25cIiwgYXN5bmMgKHsgdXJsIH0gPSB7fSkgPT4ge1xyXG4gIGlmICghdXJsKSByZXR1cm47XHJcblxyXG4gIGF3YWl0IG1vZHVsZXMubmF0aXZlLndpbmRvdy5zZXRBbHdheXNPblRvcCgwLCB0cnVlKTtcclxuICBhd2FpdCBuZXcgUHJvbWlzZShyID0+IHNldFRpbWVvdXQociwgMjUwKSk7XHJcbiAgYXdhaXQgbW9kdWxlcy5uYXRpdmUud2luZG93LnNldEFsd2F5c09uVG9wKDAsIHRydWUpO1xyXG5cclxuICBjb25zdCBzdWNjZXNzID0gYXdhaXQgbW9kYWxzLnNob3cuY29uZmlybWF0aW9uKFxyXG4gICAgYWNvcmQuaTE4bi5mb3JtYXQoXCJJTVBPUlRfRVhURU5TSU9OX01PREFMX1RJVExFXCIpLFxyXG4gICAgYWNvcmQuaTE4bi5mb3JtYXQoXCJJTVBPUlRfRVhURU5TSU9OX01PREFMX0RFU0NSSVBUSU9OXCIsIHVybClcclxuICApO1xyXG5cclxuICBpZiAoIXN1Y2Nlc3MpIHJldHVybjtcclxuXHJcbiAgdHJ5IHtcclxuICAgIGF3YWl0IGV4dGVuc2lvbnMubG9hZCh1cmwpO1xyXG4gIH0gY2F0Y2ggKGVycikge1xyXG4gICAgbm90aWZpY2F0aW9ucy5zaG93LmVycm9yKGAke2Vycn1gLCB7IHRpbWVvdXQ6IDMwMDAwIH0pO1xyXG4gIH1cclxufSk7IiwgImV4cG9ydCBkZWZhdWx0IGBcbltjbGFzcyo9YWNvcmQtLV17Ym94LXNpemluZzpib3JkZXItYm94fVtjbGFzcyo9YWNvcmQtLV0gKntib3gtc2l6aW5nOmJvcmRlci1ib3h9LmFjb3JkLS10YWJzLWNvbnRlbnQtY29udGFpbmVye3BhZGRpbmc6MzJweCAxNnB4O2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpmbGV4LXN0YXJ0O2p1c3RpZnktY29udGVudDpjZW50ZXI7d2lkdGg6MTAwJX0uYWNvcmQtLXRhYnMtY29udGVudC1jb250YWluZXI+LnRhYnt3aWR0aDoxMDAlfS5hY29yZC0tdGFicy10YWItYnV0dG9uLnN0b3JlLXRhYi1idXR0b257YmFja2dyb3VuZC1jb2xvcjp2YXIoLS1zdGF0dXMtcG9zaXRpdmUtYmFja2dyb3VuZCk7Y29sb3I6dmFyKC0tc3RhdHVzLXBvc2l0aXZlLXRleHQpfS5hY29yZC0tdGFicy10YWItYnV0dG9uLnN0b3JlLXRhYi1idXR0b24uc2VsZWN0ZWR7Y29sb3I6dmFyKC0tdGV4dC1wb3NpdGl2ZSk7YmFja2dyb3VuZC1jb2xvcjp2YXIoLS1iYWNrZ3JvdW5kLW1vZGlmaWVyLXNlbGVjdGVkKX1gO1xuIiwgImV4cG9ydCBkZWZhdWx0IGBcbi5hY29yZC0tc3RvcmUtZXh0ZW5zaW9uLWNhcmR7d2lkdGg6Mjc1cHg7aGVpZ2h0OjI1MHB4O2Rpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpjb2x1bW47Ym9yZGVyLXJhZGl1czo0cHg7Y29udGFpbjpjb250ZW50O2JhY2tncm91bmQtY29sb3I6cmdiYSgwLDAsMCwuMSk7Ym94LXNoYWRvdzp2YXIoLS1lbGV2YXRpb24tbWVkaXVtKX0uYWNvcmQtLXN0b3JlLWV4dGVuc2lvbi1jYXJkPi5wcmV2aWV3e3dpZHRoOjEwMCU7aGVpZ2h0OjEwMHB4O2Rpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpjb2x1bW47anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47YWxpZ24taXRlbXM6Y2VudGVyO2JhY2tncm91bmQtY29sb3I6dmFyKC0tYnJhbmQtNTAwKTtiYWNrZ3JvdW5kLXBvc2l0aW9uOmNlbnRlcjtiYWNrZ3JvdW5kLXNpemU6Y292ZXJ9LmFjb3JkLS1zdG9yZS1leHRlbnNpb24tY2FyZD4ucHJldmlldz4uY29udHJvbHN7cGFkZGluZzo4cHg7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2Vlbjt3aWR0aDoxMDAlfS5hY29yZC0tc3RvcmUtZXh0ZW5zaW9uLWNhcmQ+LnByZXZpZXc+LmNvbnRyb2xzIC5nb3tiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMCwwLDAsLjUpO2JveC1zaGFkb3c6MHB4IDBweCA0cHggcmdiYSgwLDAsMCwuNSk7Ym9yZGVyLXJhZGl1czo1MCU7d2lkdGg6MjRweDtoZWlnaHQ6MjRweDtkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2p1c3RpZnktY29udGVudDpjZW50ZXI7Y29sb3I6dmFyKC0taGVhZGVyLXByaW1hcnkpO2ZvbnQtd2VpZ2h0OjYwMDtjdXJzb3I6cG9pbnRlcn0uYWNvcmQtLXN0b3JlLWV4dGVuc2lvbi1jYXJkPi5wcmV2aWV3Pi5uYW1lLWNvbnRhaW5lcntkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2p1c3RpZnktY29udGVudDpjZW50ZXI7Y29sb3I6dmFyKC0taGVhZGVyLXByaW1hcnkpO3BhZGRpbmc6OHB4fS5hY29yZC0tc3RvcmUtZXh0ZW5zaW9uLWNhcmQ+LnByZXZpZXc+Lm5hbWUtY29udGFpbmVyPi5uYW1le2ZvbnQtc2l6ZToxNHB4O2JhY2tncm91bmQtY29sb3I6cmdiYSgwLDAsMCwuNSk7Ym94LXNoYWRvdzowcHggMHB4IDRweCByZ2JhKDAsMCwwLC41KTtib3JkZXItcmFkaXVzOjk5OTlweDtwYWRkaW5nOjRweCA4cHh9LmFjb3JkLS1zdG9yZS1leHRlbnNpb24tY2FyZD4uaW5mby1jb250YWluZXJ7ZGlzcGxheTpmbGV4O2p1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVuO2ZsZXgtZGlyZWN0aW9uOmNvbHVtbjtwYWRkaW5nOjhweDtoZWlnaHQ6MTUwcHg7d2lkdGg6MTAwJX0uYWNvcmQtLXN0b3JlLWV4dGVuc2lvbi1jYXJkPi5pbmZvLWNvbnRhaW5lcj4udG9we2Rpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpjb2x1bW47Z2FwOjRweDtoZWlnaHQ6MTAwJX0uYWNvcmQtLXN0b3JlLWV4dGVuc2lvbi1jYXJkPi5pbmZvLWNvbnRhaW5lcj4udG9wPi5uYW1lLWNvbnRhaW5lcntkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2dhcDo0cHg7d2lkdGg6MTAwJX0uYWNvcmQtLXN0b3JlLWV4dGVuc2lvbi1jYXJkPi5pbmZvLWNvbnRhaW5lcj4udG9wPi5uYW1lLWNvbnRhaW5lcj4ubmFtZXtmb250LXNpemU6MTZweDtmb250LXdlaWdodDo1MDA7Y29sb3I6dmFyKC0taGVhZGVyLXByaW1hcnkpfS5hY29yZC0tc3RvcmUtZXh0ZW5zaW9uLWNhcmQ+LmluZm8tY29udGFpbmVyPi50b3A+Lm5hbWUtY29udGFpbmVyPi52ZXJzaW9ue2ZvbnQtc2l6ZToxMnB4O2ZvbnQtd2VpZ2h0OjUwMDtjb2xvcjp2YXIoLS1oZWFkZXItcHJpbWFyeSk7b3BhY2l0eTouNX0uYWNvcmQtLXN0b3JlLWV4dGVuc2lvbi1jYXJkPi5pbmZvLWNvbnRhaW5lcj4udG9wPi5kZXNjcmlwdGlvbntmb250LXNpemU6MTRweDtmb250LXdlaWdodDozMDA7Y29sb3I6dmFyKC0taGVhZGVyLXByaW1hcnkpO29wYWNpdHk6Ljc1O3dpZHRoOjEwMCV9LmFjb3JkLS1zdG9yZS1leHRlbnNpb24tY2FyZD4uaW5mby1jb250YWluZXI+LmJvdHRvbXtkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6ZmxleC1zdGFydDtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2VlbjtoZWlnaHQ6MTAwJX0uYWNvcmQtLXN0b3JlLWV4dGVuc2lvbi1jYXJkPi5pbmZvLWNvbnRhaW5lcj4uYm90dG9tPi5sZWZ0e2hlaWdodDoxMDAlO2Rpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpjb2x1bW47YWxpZ24taXRlbXM6ZmxleC1zdGFydDtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1lbmR9LmFjb3JkLS1zdG9yZS1leHRlbnNpb24tY2FyZD4uaW5mby1jb250YWluZXI+LmJvdHRvbT4ubGVmdD4uYXV0aG9yc3tkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1uO2dhcDo0cHh9LmFjb3JkLS1zdG9yZS1leHRlbnNpb24tY2FyZD4uaW5mby1jb250YWluZXI+LmJvdHRvbT4ubGVmdD4uYXV0aG9ycyAuYXV0aG9ye2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7Ym9yZGVyLXJhZGl1czo5OTk5cHg7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDAsMCwwLC4xKTtjdXJzb3I6cG9pbnRlcn0uYWNvcmQtLXN0b3JlLWV4dGVuc2lvbi1jYXJkPi5pbmZvLWNvbnRhaW5lcj4uYm90dG9tPi5sZWZ0Pi5hdXRob3JzIC5hdXRob3I+LmltYWdle2JvcmRlci1yYWRpdXM6NTAlO3dpZHRoOjE4cHg7aGVpZ2h0OjE4cHg7YmFja2dyb3VuZC1jb2xvcjp2YXIoLS1icmFuZC01MDApO2JhY2tncm91bmQtcG9zaXRpb246Y2VudGVyO2JhY2tncm91bmQtc2l6ZTpjb3Zlcn0uYWNvcmQtLXN0b3JlLWV4dGVuc2lvbi1jYXJkPi5pbmZvLWNvbnRhaW5lcj4uYm90dG9tPi5sZWZ0Pi5hdXRob3JzIC5hdXRob3I+Lm5hbWV7Zm9udC1zaXplOjEwcHg7Zm9udC13ZWlnaHQ6NDAwO2NvbG9yOnZhcigtLWhlYWRlci1wcmltYXJ5KTtvcGFjaXR5Oi43NTtwYWRkaW5nOjZweH0uYWNvcmQtLXN0b3JlLWV4dGVuc2lvbi1jYXJkPi5pbmZvLWNvbnRhaW5lcj4uYm90dG9tPi5yaWdodHtoZWlnaHQ6MTAwJTtkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1uO2FsaWduLWl0ZW1zOmZsZXgtZW5kO2p1c3RpZnktY29udGVudDpmbGV4LWVuZH1gO1xuIiwgImltcG9ydCBtb2RhbHMgZnJvbSBcIi4uLy4uLy4uLy4uL2FwaS91aS9tb2RhbHMuanN4XCI7XHJcbmltcG9ydCBpMThuIGZyb20gXCIuLi8uLi8uLi8uLi9hcGkvaTE4bi9pbmRleC5qc1wiO1xyXG5pbXBvcnQgcGF0Y2hlciBmcm9tIFwiLi4vLi4vLi4vLi4vYXBpL3BhdGNoZXIvaW5kZXguanNcIjtcclxuXHJcbmltcG9ydCBjc3NUZXh0IGZyb20gXCIuL3N0eWxlLnNjc3NcIjtcclxuaW1wb3J0IHsgZ2V0TG9jYWxpemVkIH0gZnJvbSBcIi4uLy4uLy4uLy4uL290aGVyL3V0aWxzLmpzXCI7XHJcbnBhdGNoZXIuaW5qZWN0Q1NTKGNzc1RleHQpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIC8qKiBAcGFyYW0ge2ltcG9ydChcInZ1ZVwiKS5BcHB9IHZ1ZUFwcCAqL1xyXG4gIGxvYWQodnVlQXBwKSB7XHJcbiAgICB2dWVBcHAuY29tcG9uZW50KFxyXG4gICAgICBcInN0b3JlLWV4dGVuc2lvbi1jYXJkXCIsXHJcbiAgICAgIHtcclxuICAgICAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImFjb3JkLS1zdG9yZS1leHRlbnNpb24tY2FyZFwiPlxyXG4gICAgICAgICAgICA8ZGl2IHYtaWY9XCJleHRlbnNpb24ucHJldmlld3M/Lmxlbmd0aFwiIGNsYXNzPVwicHJldmlld1wiIDpzdHlsZT1cInsgYmFja2dyb3VuZEltYWdlOiAndXJsKCcgKyBleHRlbnNpb24ucHJldmlld3Nbc2VsZWN0ZWRQcmV2aWV3XS5pbWFnZSArICcpJyB9XCI+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRyb2xzXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ28gZ28tYmFja1wiIEBjbGljaz1cImdvQmFja1wiPlxyXG4gICAgICAgICAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD1cIk0xMS44MjggMTJsMi44MjkgMi44MjgtMS40MTQgMS40MTVMOSAxMmw0LjI0My00LjI0MyAxLjQxNCAxLjQxNUwxMS44MjggMTJ6XCIgZmlsbD1cImN1cnJlbnRDb2xvclwiIC8+XHJcbiAgICAgICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ28gZ28tZm9yd2FyZFwiIEBjbGljaz1cImdvRm9yd2FyZFwiPlxyXG4gICAgICAgICAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD1cIk0xMi4xNzIgMTJMOS4zNDMgOS4xNzJsMS40MTQtMS40MTVMMTUgMTJsLTQuMjQzIDQuMjQzLTEuNDE0LTEuNDE1elwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIiAvPlxyXG4gICAgICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJuYW1lLWNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm5hbWVcIj5cclxuICAgICAgICAgICAgICAgICAge3sgZXh0ZW5zaW9uLnByZXZpZXdzW3NlbGVjdGVkUHJldmlld10ubmFtZSB9fVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IHYtZWxzZSBjbGFzcz1cInByZXZpZXcgbm8tcHJldmlld1wiPjwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5mby1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidG9wXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibmFtZS1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm5hbWVcIj57eyBnZXRMb2NhbGl6ZWQoZXh0ZW5zaW9uLm5hbWUpIH19PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ2ZXJzaW9uXCI+dnt7IGV4dGVuc2lvbi52ZXJzaW9uIH19PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkZXNjcmlwdGlvblwiPnt7IGdldExvY2FsaXplZChleHRlbnNpb24uZGVzY3JpcHRpb24pIH19PC9kaXY+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJvdHRvbVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxlZnRcIj5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImF1dGhvcnNcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHYtZm9yPVwiYXV0aG9yIGluIGV4dGVuc2lvbi5hdXRob3JzXCIgY2xhc3M9XCJhdXRob3JcIiA6a2V5PVwiYXV0aG9yLm5hbWVcIiBAY2xpY2s9XCJzaG93UHJvZmlsZShhdXRob3IuaWQpXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW1hZ2VcIiA6c3R5bGU9XCJ7IGJhY2tncm91bmRJbWFnZTogJ3VybCgnICsgYXV0aG9yLmltYWdlICsgJyknIH1cIj48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJuYW1lXCI+e3sgYXV0aG9yLm5hbWUgfX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyaWdodFwiPlxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnV0dG9uc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIEBjbGljaz1cImluc3RhbGxPclVuaW5zdGFsbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPGRpc2NvcmQtYnV0dG9uIDp2YWx1ZT1cImkxOG5Gb3JtYXQoZXh0ZW5zaW9uLmluc3RhbGxlZCA/ICdVTklOU1RBTEwnIDogJ0lOU1RBTEwnKVwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIGAsXHJcbiAgICAgICAgcHJvcHM6IFtcImV4dGVuc2lvblwiXSxcclxuICAgICAgICBkYXRhKCkge1xyXG4gICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgc2VsZWN0ZWRQcmV2aWV3OiAwLFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG1ldGhvZHM6IHtcclxuICAgICAgICAgIGdldExvY2FsaXplZCxcclxuICAgICAgICAgIGkxOG5Gb3JtYXQ6IGkxOG4uZm9ybWF0LFxyXG4gICAgICAgICAgaW5zdGFsbE9yVW5pbnN0YWxsKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5leHRlbnNpb24uaW5zdGFsbGVkKSB7XHJcbiAgICAgICAgICAgICAgLy8gdW5pbnN0YWxsXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgLy8gaW5zdGFsbFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgZ29CYWNrKCkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkUHJldmlldy0tO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZFByZXZpZXcgPCAwKSB0aGlzLnNlbGVjdGVkUHJldmlldyA9IHRoaXMuZXh0ZW5zaW9uLnByZXZpZXdzLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgZ29Gb3J3YXJkKCkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkUHJldmlldysrO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZFByZXZpZXcgPj0gdGhpcy5leHRlbnNpb24ucHJldmlld3MubGVuZ3RoKSB0aGlzLnNlbGVjdGVkUHJldmlldyA9IDA7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgc2hvd1Byb2ZpbGUocHJvZmlsZUlkKSB7XHJcbiAgICAgICAgICAgIG1vZGFscy5zaG93LnVzZXIocHJvZmlsZUlkKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIClcclxuICB9XHJcbn0iLCAiZXhwb3J0IGRlZmF1bHQge1xyXG4gIC8qKiBAcGFyYW0ge2ltcG9ydChcInZ1ZVwiKS5BcHB9IHZ1ZUFwcCAqL1xyXG4gIGxvYWQodnVlQXBwKSB7XHJcbiAgICB2dWVBcHAuY29tcG9uZW50KFxyXG4gICAgICBcImhvbWUtcGFnZVwiLFxyXG4gICAgICB7XHJcbiAgICAgICAgdGVtcGxhdGU6IFwiPGRpdj5Ib21lIFBhZ2U8L2Rpdj5cIixcclxuICAgICAgfVxyXG4gICAgKTtcclxuICB9XHJcbn0iLCAiZXhwb3J0IGRlZmF1bHQge1xyXG4gIC8qKiBAcGFyYW0ge2ltcG9ydChcInZ1ZVwiKS5BcHB9IHZ1ZUFwcCAqL1xyXG4gIGxvYWQodnVlQXBwKSB7XHJcbiAgICB2dWVBcHAuY29tcG9uZW50KFxyXG4gICAgICBcImluc3RhbGxlZC1leHRlbnNpb25zLXBhZ2VcIixcclxuICAgICAge1xyXG4gICAgICAgIHRlbXBsYXRlOiBcIjxkaXY+SW5zdGFsbGVkIEV4dGVuc2lvbnMgUGFnZTwvZGl2PlwiLFxyXG4gICAgICB9XHJcbiAgICApO1xyXG4gIH1cclxufSIsICJleHBvcnQgZGVmYXVsdCB7XHJcbiAgLyoqIEBwYXJhbSB7aW1wb3J0KFwidnVlXCIpLkFwcH0gdnVlQXBwICovXHJcbiAgbG9hZCh2dWVBcHApIHtcclxuICAgIHZ1ZUFwcC5jb21wb25lbnQoXHJcbiAgICAgIFwic2V0dGluZ3MtcGFnZVwiLFxyXG4gICAgICB7XHJcbiAgICAgICAgdGVtcGxhdGU6IFwiPGRpdj5TZXR0aW5ncyBQYWdlPC9kaXY+XCIsXHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgfVxyXG59IiwgImV4cG9ydCBkZWZhdWx0IHtcclxuICAvKiogQHBhcmFtIHtpbXBvcnQoXCJ2dWVcIikuQXBwfSB2dWVBcHAgKi9cclxuICBsb2FkKHZ1ZUFwcCkge1xyXG4gICAgY29uc29sZS5sb2coXCJBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFcIilcclxuICAgIHZ1ZUFwcC5jb21wb25lbnQoXHJcbiAgICAgIFwic3RvcmUtcGFnZVwiLFxyXG4gICAgICB7XHJcbiAgICAgICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgPHN0b3JlLWV4dGVuc2lvbi1jYXJkIHYtZm9yPVwiZXh0ZW5zaW9uIGluIGV4dGVuc2lvbnNcIiA6ZXh0ZW5zaW9uPVwiZXh0ZW5zaW9uXCIgOmtleT1cImV4dGVuc2lvbi5uYW1lLmRlZmF1bHRcIiAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIGAsXHJcbiAgICAgICAgZGF0YSgpIHtcclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGV4dGVuc2lvbnM6IFtcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcInBsdWdpblwiLFxyXG4gICAgICAgICAgICAgICAgdXJsOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgbmFtZToge1xyXG4gICAgICAgICAgICAgICAgICBkZWZhdWx0OiBcIlRlc3QgUGx1Z2luXCIsXHJcbiAgICAgICAgICAgICAgICAgIHRyOiBcIkRlbmVtZSBQbHVnaW5cIixcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgICBkZWZhdWx0OiBcIlRlc3QgUGx1Z2luIGRlc2NyaXB0aW9uLi5cIixcclxuICAgICAgICAgICAgICAgICAgdHI6IFwiRGVuZW1lIFBsdWdpbiBhXHUwMEU3XHUwMTMxa2xhbWFzXHUwMTMxLi5cIixcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBwcmV2aWV3czogW1xyXG4gICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJUZXN0IFBsdWdpbiBQcmV2aWV3XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2U6IFwiaHR0cHM6Ly9pLmltZ3VyLmNvbS9UdGZqSGVQLnBuZ1wiLFxyXG4gICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJUZXN0IFBsdWdpbiBQcmV2aWV3IDJcIixcclxuICAgICAgICAgICAgICAgICAgICBpbWFnZTogXCJodHRwczovL2kuaW1ndXIuY29tLzBaMFowWjAucG5nXCIsXHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICBhdXRob3JzOiBbXHJcbiAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogXCI3MDczMDk2OTM0NDk1MzU1OTlcIixcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIkFybWFnYW4jMjQ0OFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGltYWdlOiBcImh0dHBzOi8vaS5pbWd1ci5jb20vclNMVmQyMy5wbmdcIlxyXG4gICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiNzA3MzA5NjkzNDQ5NTM1NTk5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJBcm1hZ2FuIzI0NDhcIixcclxuICAgICAgICAgICAgICAgICAgICBpbWFnZTogXCJodHRwczovL2kuaW1ndXIuY29tL3JTTFZkMjMucG5nXCJcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIHZlcnNpb246IFwiMS4wLjBcIixcclxuICAgICAgICAgICAgICAgIHJlYWRtZTogXCIjIyMgVGVzdCBQbHVnaW4gcmVhZG1lLi5cIixcclxuICAgICAgICAgICAgICAgIGluc3RhbGxlZDogdHJ1ZVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgfVxyXG59IiwgImltcG9ydCBob21lUGFnZSBmcm9tIFwiLi9ob21lLXBhZ2UuanNcIlxyXG5pbXBvcnQgaW5zdGFsbGVkRXh0ZW5zaW9uc1BhZ2UgZnJvbSBcIi4vaW5zdGFsbGVkLWV4dGVuc2lvbnMtcGFnZS5qc1wiO1xyXG5pbXBvcnQgc2V0dGluZ3NQYWdlIGZyb20gXCIuL3NldHRpbmdzLXBhZ2UuanNcIjtcclxuaW1wb3J0IHN0b3JlUGFnZSBmcm9tIFwiLi9zdG9yZS1wYWdlLmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgLyoqIEBwYXJhbSB7aW1wb3J0KFwidnVlXCIpLkFwcH0gdnVlQXBwICovXHJcbiAgbG9hZCh2dWVBcHApIHtcclxuICAgIGhvbWVQYWdlLmxvYWQodnVlQXBwKTtcclxuICAgIGluc3RhbGxlZEV4dGVuc2lvbnNQYWdlLmxvYWQodnVlQXBwKTtcclxuICAgIHNldHRpbmdzUGFnZS5sb2FkKHZ1ZUFwcCk7XHJcbiAgICBzdG9yZVBhZ2UubG9hZCh2dWVBcHApO1xyXG4gIH1cclxufSIsICJpbXBvcnQgd2VicGFjayBmcm9tIFwiLi4vLi4vLi4vLi4vYXBpL21vZHVsZXMvd2VicGFjay5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIC8qKiBAcGFyYW0ge2ltcG9ydChcInZ1ZVwiKS5BcHB9IHZ1ZUFwcCAqL1xyXG4gIGxvYWQodnVlQXBwKSB7XHJcbiAgICBjb25zdCBidXR0b25DbGFzc2VzID0gd2VicGFjay5maW5kQnlQcm9wZXJ0aWVzKFwibG93U2F0dXJhdGlvblVuZGVybGluZVwiLCBcImJ1dHRvblwiLCBcImRpc2FibGVkQnV0dG9uT3ZlcmxheVwiKTtcclxuICAgIHZ1ZUFwcC5jb21wb25lbnQoXCJkaXNjb3JkLWJ1dHRvblwiLCB7XHJcbiAgICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cIiR7YnV0dG9uQ2xhc3Nlcy5idXR0b259ICR7YnV0dG9uQ2xhc3Nlcy5sb29rRmlsbGVkfSAke2J1dHRvbkNsYXNzZXMuZ3Jvd31cIiA6Y2xhc3M9XCJcXGBcXCR7YnV0dG9uQ2xhc3Nlc1tjb2xvcl0gPz8gYnV0dG9uQ2xhc3Nlcy5jb2xvckJyYW5kfSBcXCR7YnV0dG9uQ2xhc3Nlc1tzaXplXSA/PyBidXR0b25DbGFzc2VzLnNpemVTbWFsbH1cXGBcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCIke2J1dHRvbkNsYXNzZXMuY29udGVudHN9XCI+e3t2YWx1ZX19PC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIGAsXHJcbiAgICAgIHByb3BzOiBbXCJ2YWx1ZVwiLCBcInNpemVcIiwgXCJjb2xvclwiXSxcclxuICAgICAgZGF0YSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgYnV0dG9uQ2xhc3Nlc1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59IiwgImV4cG9ydCBkZWZhdWx0IGBcbmA7XG4iLCAiaW1wb3J0IGkxOG4gZnJvbSBcIi4uLy4uLy4uLy4uL2FwaS9pMThuL2luZGV4LmpzXCI7XHJcbmltcG9ydCBwYXRjaGVyIGZyb20gXCIuLi8uLi8uLi8uLi9hcGkvcGF0Y2hlci9pbmRleC5qc1wiO1xyXG5cclxuaW1wb3J0IGNzc1RleHQgZnJvbSBcIi4vc3R5bGUuc2Nzc1wiO1xyXG5pbXBvcnQgeyBnZXRMb2NhbGl6ZWQgfSBmcm9tIFwiLi4vLi4vLi4vLi4vb3RoZXIvdXRpbHMuanNcIjtcclxucGF0Y2hlci5pbmplY3RDU1MoY3NzVGV4dCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgLyoqIEBwYXJhbSB7aW1wb3J0KFwidnVlXCIpLkFwcH0gdnVlQXBwICovXHJcbiAgbG9hZCh2dWVBcHApIHtcclxuICAgIHZ1ZUFwcC5jb21wb25lbnQoXHJcbiAgICAgIFwiaW5zdGFsbGVkLWV4dGVuc2lvbi1jYXJkXCIsXHJcbiAgICAgIHt9XHJcbiAgICApO1xyXG4gIH1cclxufSIsICJpbXBvcnQgc3RvcmVFeHRlbnNpb25DYXJkIGZyb20gXCIuL3N0b3JlLWV4dGVuc2lvbi1jYXJkL2luZGV4LmpzXCI7XHJcbmltcG9ydCBwYWdlcyBmcm9tIFwiLi9wYWdlcy9pbmRleC5qc1wiO1xyXG5pbXBvcnQgZGlzY29yZEJ1dHRvbiBmcm9tIFwiLi9kaXNjb3JkLWJ1dHRvbi9pbmRleC5qc1wiO1xyXG5pbXBvcnQgaW5zdGFsbGVkRXh0ZW5zaW9uQ2FyZCBmcm9tIFwiLi9pbnN0YWxsZWQtZXh0ZW5zaW9uLWNhcmQvaW5kZXguanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAvKiogQHBhcmFtIHtpbXBvcnQoXCJ2dWVcIikuQXBwfSB2dWVBcHAgKi9cclxuICBsb2FkKHZ1ZUFwcCkge1xyXG4gICAgaW5zdGFsbGVkRXh0ZW5zaW9uQ2FyZC5sb2FkKHZ1ZUFwcCk7XHJcbiAgICBkaXNjb3JkQnV0dG9uLmxvYWQodnVlQXBwKTtcclxuICAgIHN0b3JlRXh0ZW5zaW9uQ2FyZC5sb2FkKHZ1ZUFwcCk7XHJcbiAgICBwYWdlcy5sb2FkKHZ1ZUFwcCk7XHJcbiAgfVxyXG59IiwgImltcG9ydCBkb20gZnJvbSBcIi4uLy4uL2FwaS9kb20vaW5kZXguanNcIjtcclxuaW1wb3J0IHdlYnBhY2sgZnJvbSBcIi4uLy4uL2FwaS9tb2R1bGVzL3dlYnBhY2suanNcIjtcclxuaW1wb3J0IHBhdGNoZXIgZnJvbSBcIi4uLy4uL2FwaS9wYXRjaGVyL2luZGV4LmpzXCI7XHJcbmltcG9ydCB1dGlscyBmcm9tIFwiLi4vLi4vYXBpL3V0aWxzL2luZGV4LmpzXCI7XHJcbmltcG9ydCBpMThuIGZyb20gXCIuLi8uLi9hcGkvaTE4bi9pbmRleC5qc1wiO1xyXG5cclxuaW1wb3J0IGNzc1RleHQgZnJvbSBcIi4vc3R5bGUuc2Nzc1wiO1xyXG5pbXBvcnQgdnVlQ29tcG9uZW50cyBmcm9tIFwiLi92dWUtY29tcG9uZW50cy9pbmRleC5qc1wiO1xyXG5wYXRjaGVyLmluamVjdENTUyhjc3NUZXh0KTtcclxuXHJcbntcclxuICBsZXQgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcclxuICBzY3JpcHQuc3JjID0gXCJodHRwczovL3VucGtnLmNvbS92dWVAMy9kaXN0L3Z1ZS5nbG9iYWwuanNcIjtcclxuICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XHJcbn1cclxuXHJcbmRvbS5wYXRjaCgnYVtocmVmPVwiL3N0b3JlXCJdW2RhdGEtbGlzdC1pdGVtLWlkJD1cIl9fX25pdHJvXCJdJywgKGVsbSkgPT4ge1xyXG4gIHV0aWxzLmlmRXhpc3RzKFxyXG4gICAgZWxtLnF1ZXJ5U2VsZWN0b3IoJ1tjbGFzcyo9XCJuYW1lQW5kRGVjb3JhdG9ycy1cIl0gW2NsYXNzKj1cIm5hbWUtXCJdJyksXHJcbiAgICAobmFtZUVsbSkgPT4ge1xyXG4gICAgICBuYW1lRWxtLnRleHRDb250ZW50ID0gaTE4bi5mb3JtYXQoXCJBUFBfTkFNRVwiKTtcclxuICAgIH1cclxuICApO1xyXG5cclxuICB1dGlscy5pZkV4aXN0cyhcclxuICAgIGVsbS5xdWVyeVNlbGVjdG9yKCdbY2xhc3MqPVwiYXZhdGFyV2l0aFRleHQtXCJdIFtjbGFzcyo9XCJhdmF0YXItXCJdIHN2ZycpLFxyXG4gICAgZmlsbFNWR0VsbVdpdGhBY29yZExvZ29cclxuICApO1xyXG59KTtcclxuXHJcbmxldCBpbnRlcm5hbFZ1ZUFwcCA9IG51bGw7XHJcblxyXG5jb25zdCBoZWFkZXJJdGVtQ2xhc3NlcyA9IHdlYnBhY2suZmluZEJ5UHJvcGVydGllcyhcImRpdmlkZXJcIiwgXCJoYW1idXJnZXJcIiwgXCJ0aGVtZWRcIik7XHJcbmNvbnN0IHRhYkJhckNsYXNzZXMgPSB3ZWJwYWNrLmZpbmRCeVByb3BlcnRpZXMoXCJ0YWJCYXJcIiwgXCJtYXhXaWR0aFdpdGhUb29sYmFyXCIpO1xyXG5jb25zdCBoZWFkZXJDbGFzc2VzID0gd2VicGFjay5maW5kQnlQcm9wZXJ0aWVzKFwidG9wUGlsbFwiLCBcImhlYWRlclRleHRcIik7XHJcbmRvbS5wYXRjaCgnW2NsYXNzKj1cImFwcGxpY2F0aW9uU3RvcmUtXCJdIFtjbGFzcyo9XCJob21lV3JhcHBlck5vcm1hbC1cIl0nLCAoZWxtKSA9PiB7XHJcbiAgdXRpbHMuaWZFeGlzdHMoXHJcbiAgICBlbG0ucXVlcnlTZWxlY3RvcignW2NsYXNzKj1cImhlYWRlckJhci1cIl0gW2NsYXNzKj1cInRpdGxlV3JhcHBlci1cIl0gW2NsYXNzKj1cInRpdGxlLVwiXScpLFxyXG4gICAgKHRpdGxlRWxtKSA9PiB7XHJcbiAgICAgIHRpdGxlRWxtLnRleHRDb250ZW50ID0gaTE4bi5mb3JtYXQoXCJBUFBfTkFNRVwiKTtcclxuXHJcbiAgICAgIGlmIChpbnRlcm5hbFZ1ZUFwcCkge1xyXG4gICAgICAgIGxldCBjb250YWluZXIgPSBkb20ucGFyZW50cyh0aXRsZUVsbSwgMikucG9wKCk7XHJcblxyXG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChcclxuICAgICAgICAgIGRvbS5wYXJzZShgPGRpdiBjbGFzcz1cIiR7aGVhZGVySXRlbUNsYXNzZXMuZGl2aWRlcn1cIj48L2Rpdj5gKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIGNvbnN0IGJ1dHRvbnNDb250YWluZXIgPSBkb20ucGFyc2UoYFxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cIiR7dGFiQmFyQ2xhc3Nlcy50YWJCYXJ9ICR7aGVhZGVyQ2xhc3Nlcy50b3BQaWxsfVwiPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgYCk7XHJcblxyXG4gICAgICAgIGxldCBidXR0b25zID0gW107XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGJ1aWxkQnV0dG9uKGlkLCB0ZXh0LCBjdXN0b21DbGFzc2VzID0gXCJcIikge1xyXG4gICAgICAgICAgbGV0IGVsbSA9IGRvbS5wYXJzZShgPGRpdiBpZD1cInRhYi1idXR0b24tJHtpZH1cIiBjbGFzcz1cImFjb3JkLS10YWJzLXRhYi1idXR0b24gJHtjdXN0b21DbGFzc2VzfSAke3RhYkJhckNsYXNzZXMuaXRlbX0gJHtoZWFkZXJDbGFzc2VzLml0ZW19ICR7aGVhZGVyQ2xhc3Nlcy50aGVtZWR9XCI+JHt0ZXh0fTwvZGl2PmApO1xyXG5cclxuICAgICAgICAgIGJ1dHRvbnMucHVzaChlbG0pO1xyXG5cclxuICAgICAgICAgIGVsbS5zZXRTZWxlY3RlZCA9IChzKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzKSBlbG0uY2xhc3NMaXN0LmFkZChoZWFkZXJDbGFzc2VzLnNlbGVjdGVkLCBcInNlbGVjdGVkXCIpO1xyXG4gICAgICAgICAgICBlbHNlIGVsbS5jbGFzc0xpc3QucmVtb3ZlKGhlYWRlckNsYXNzZXMuc2VsZWN0ZWQsIFwic2VsZWN0ZWRcIik7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgZWxtLnNldFNlbGVjdGVkKGludGVybmFsVnVlQXBwLnNlbGVjdGVkVGFiID09PSBpZCk7XHJcblxyXG4gICAgICAgICAgZWxtLm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGJ1dHRvbnMuZm9yRWFjaCgoYikgPT4gYi5zZXRTZWxlY3RlZChmYWxzZSkpO1xyXG4gICAgICAgICAgICBlbG0uc2V0U2VsZWN0ZWQodHJ1ZSk7XHJcbiAgICAgICAgICAgIGludGVybmFsVnVlQXBwLnNlbGVjdGVkVGFiID0gaWQ7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gZWxtO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYnV0dG9uc0NvbnRhaW5lci5hcHBlbmRDaGlsZChidWlsZEJ1dHRvbihcImhvbWVcIiwgaTE4bi5mb3JtYXQoXCJIT01FXCIpKSk7XHJcbiAgICAgICAgYnV0dG9uc0NvbnRhaW5lci5hcHBlbmRDaGlsZChidWlsZEJ1dHRvbihcImluc3RhbGxlZC1leHRlbnNpb25zXCIsIGkxOG4uZm9ybWF0KFwiSU5TVEFMTEVEX0VYVEVOU0lPTlNcIikpKTtcclxuICAgICAgICBidXR0b25zQ29udGFpbmVyLmFwcGVuZENoaWxkKGJ1aWxkQnV0dG9uKFwic2V0dGluZ3NcIiwgaTE4bi5mb3JtYXQoXCJTRVRUSU5HU1wiKSkpO1xyXG4gICAgICAgIGJ1dHRvbnNDb250YWluZXIuYXBwZW5kQ2hpbGQoYnVpbGRCdXR0b24oXCJzdG9yZVwiLCBpMThuLmZvcm1hdChcIkVYVEVOU0lPTl9TVE9SRVwiKSwgXCJzdG9yZS10YWItYnV0dG9uXCIpKTtcclxuXHJcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGJ1dHRvbnNDb250YWluZXIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgKTtcclxuICB1dGlscy5pZkV4aXN0cyhcclxuICAgIGVsbS5xdWVyeVNlbGVjdG9yKCdbY2xhc3MqPVwiaGVhZGVyQmFyLVwiXSBbY2xhc3MqPVwiaWNvbldyYXBwZXItXCJdIFtjbGFzcyo9XCJpY29uLVwiXScpLFxyXG4gICAgZmlsbFNWR0VsbVdpdGhBY29yZExvZ29cclxuICApO1xyXG59KTtcclxuXHJcbmZ1bmN0aW9uIGZpbGxTVkdFbG1XaXRoQWNvcmRMb2dvKHN2Z0VsbSkge1xyXG4gIHN2Z0VsbS5zZXRBdHRyaWJ1dGUoXCJ2aWV3Qm94XCIsIFwiMCAwIDgxMy41IDE0OTNcIik7XHJcbiAgc3ZnRWxtLnNldEF0dHJpYnV0ZShcInhtbG5zXCIsIFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIik7XHJcbiAgc3ZnRWxtLmlubmVySFRNTCA9IGBcclxuICAgIDxkZWZzPlxyXG4gICAgICA8c3R5bGU+XHJcbiAgICAgICAgLmFjb3JkLS1sb2dvLWNvbG9yIHtcclxuICAgICAgICAgIGZpbGw6IGN1cnJlbnRDb2xvcjtcclxuICAgICAgICAgIGZpbGwtcnVsZTogZXZlbm9kZDtcclxuICAgICAgICB9XHJcbiAgICAgIDwvc3R5bGU+XHJcbiAgICA8L2RlZnM+XHJcbiAgICA8Zz5cclxuICAgICAgPHBhdGggY2xhc3M9XCJhY29yZC0tbG9nby1jb2xvclwiIGQ9XCJNODE3LjI2NiwxMzIyLjVoMjg1djM2NWgtMjg1di0zNjVaXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKC01NTMuMjUgLTIxMy41KVwiLz5cclxuICAgICAgPHBhdGggY2xhc3M9XCJhY29yZC0tbG9nby1jb2xvclwiIGQ9XCJNNTU1LjIzNSwxNTIzLjc4czkxLjE2OS0zMTkuODUsOTIuNTMxLTMxOS4yOGMxMTQuNyw0Ny44MywxNjAsMTkyLDE2MCwxOTJsLTUyLjEyLDE4Ni42MXMtMzEuMTI5LDEzNy43MS04MC44OCwxMjAuMzlDNTI4LjAyNiwxNjUyLjQyLDU1NS4yMzUsMTUyMy43OCw1NTUuMjM1LDE1MjMuNzhaXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKC01NTMuMjUgLTIxMy41KVwiLz5cclxuICAgICAgPHBhdGggY2xhc3M9XCJhY29yZC0tbG9nby1jb2xvclwiIGQ9XCJNMTM2NC43NywxNTI1LjI4cy05MS4xNy0zMTkuODUtOTIuNTQtMzE5LjI4Yy0xMTQuNyw0Ny44My0xNjAsMTkyLTE2MCwxOTJsNTIuMTIsMTg2LjYxczMxLjEzLDEzNy43MSw4MC44OCwxMjAuMzlDMTM5MS45NywxNjUzLjkyLDEzNjQuNzcsMTUyNS4yOCwxMzY0Ljc3LDE1MjUuMjhaXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKC01NTMuMjUgLTIxMy41KVwiLz5cclxuICAgIDwvZz5cclxuICAgIDxwYXRoIGNsYXNzPVwiYWNvcmQtLWxvZ28tY29sb3JcIiBkPVwiTTg3NC43NjYsMjc1LjVzMTQuNTc5LTYxLjkxOCw4Ny02MmM4MC44MjQtLjA5Miw4Nyw2Miw4Nyw2MnMxOTkuNDMsODUxLjQ3LDE5OCw4NTJjLTIxMC4zMyw3Ny43MS0xNDYsMTgwLTE0NiwxODBoLTI4MXM2My43LTEwMy44Mi0xNDYtMTgxQzY3MS4wMTQsMTEyNS40OSw4NzQuNzY2LDI3NS41LDg3NC43NjYsMjc1LjVaXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKC01NTMuMjUgLTIxMy41KVwiLz5cclxuICAgIDxnPlxyXG4gICAgICA8cGF0aCBjbGFzcz1cImFjb3JkLS1sb2dvLWNvbG9yXCIgZD1cIk0xMjM4LjE0LDg5Ny41YTUzLjg4Miw1My44ODIsMCwwLDEsNTMuODgsNTMuODc1YzAsMjQuOTM5LTIwLjI1LDQ2Ljk4Ny00My4yNSw1My4xMjUtNC40NSwxLjE4LTEwLjE5LTM5LTExLTM5LTAuNTgsMC0yNy43MSwzLjUxLTMxLDQtNS41OC44MjgtMTEuOTMtMTMuODc2LTQtMjAsMS45My0xLjQ5MSwyNi42Mi02Ljk1OSwyOS03LDAuNjItLjAxMS03LjM0LTQxLjYxOC03LTQzQzEyMjUuNjQsODk1Ljk0NCwxMjMzLjUyLDg5Ny41LDEyMzguMTQsODk3LjVaXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKC01NTMuMjUgLTIxMy41KVwiLz5cclxuICAgICAgPHBhdGggY2xhc3M9XCJhY29yZC0tbG9nby1jb2xvclwiIGQ9XCJNMTE3My42NCw2MzIuNWE1My44ODIsNTMuODgyLDAsMCwxLDUzLjg4LDUzLjg3NWMwLDI0LjkzOS0yMC4yNSw0Ni45ODctNDMuMjUsNTMuMTI1LTQuNDUsMS4xODUtMTAuMTktMzktMTEtMzktMC41OCwwLTI3LjcxLDMuNTEtMzEsNC01LjU4LjgyOC0xMS45My0xMy44NzYtNC0yMCwxLjkzLTEuNDkxLDI2LjYyLTYuOTU5LDI5LTcsMC42Mi0uMDExLTcuMzQtNDEuNjE4LTctNDNDMTE2MS4xNCw2MzAuOTQ0LDExNjkuMDIsNjMyLjUsMTE3My42NCw2MzIuNVpcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoLTU1My4yNSAtMjEzLjUpXCIvPlxyXG4gICAgICA8cGF0aCBjbGFzcz1cImFjb3JkLS1sb2dvLWNvbG9yXCIgZD1cIk0xMTE1LjE2LDM3M2E1My44NzQsNTMuODc0LDAsMCwxLDUzLjg3LDUzLjg3NWMwLDI0LjkzOS0yMC4yNCw0Ni45ODctNDMuMjUsNTMuMTI1LTQuNDQsMS4xODUtMTAuMTgtMzktMTEtMzktMC41OCwwLTI3LjcsMy41MS0zMSw0LTUuNTcuODI4LTExLjkyLTEzLjg3Ni00LTIwLDEuOTMtMS40OTEsMjYuNjItNi45NTksMjktNywwLjYyLS4wMTEtNy4zNC00MS42MTgtNy00M0MxMTAyLjY1LDM3MS40NDQsMTExMC41MywzNzMsMTExNS4xNiwzNzNaXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKC01NTMuMjUgLTIxMy41KVwiLz5cclxuICAgIDwvZz5cclxuICAgIDxnPlxyXG4gICAgICA8cGF0aCBjbGFzcz1cImFjb3JkLS1sb2dvLWNvbG9yXCIgZD1cIk02ODMuOTIyLDg5Ny43NWE1My44NzUsNTMuODc1LDAsMCwwLTUzLjg3NSw1My44NzVjMCwyNC45MzksMjAuMjQ1LDQ2Ljk4Nyw0My4yNSw1My4xMjUsNC40NDEsMS4xOCwxMC4xODUtMzksMTEtMzksMC41NzYsMCwyNy43LDMuNTEsMzEsNCw1LjU3MiwwLjgyOCwxMS45MjYtMTMuODc2LDQtMjAtMS45My0xLjQ5MS0yNi42MjEtNi45NTktMjktNy0wLjYyLS4wMTEsNy4zMzktNDEuNjE4LDctNDNDNjk2LjQyNCw4OTYuMTk0LDY4OC41NDQsODk3Ljc1LDY4My45MjIsODk3Ljc1WlwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgtNTUzLjI1IC0yMTMuNSlcIi8+XHJcbiAgICAgIDxwYXRoIGNsYXNzPVwiYWNvcmQtLWxvZ28tY29sb3JcIiBkPVwiTTc0OC40MjIsNjMyLjc1YTUzLjg3NSw1My44NzUsMCwwLDAtNTMuODc1LDUzLjg3NWMwLDI0LjkzOSwyMC4yNDUsNDYuOTg3LDQzLjI1LDUzLjEyNSw0LjQ0MSwxLjE4NSwxMC4xODUtMzksMTEtMzksMC41NzYsMCwyNy43LDMuNTEsMzEsNCw1LjU3MiwwLjgyOCwxMS45MjYtMTMuODc2LDQtMjAtMS45My0xLjQ5MS0yNi42MjEtNi45NTktMjktNy0wLjYyLS4wMTEsNy4zMzktNDEuNjE4LDctNDNDNzYwLjkyNCw2MzEuMTk0LDc1My4wNDQsNjMyLjc1LDc0OC40MjIsNjMyLjc1WlwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgtNTUzLjI1IC0yMTMuNSlcIi8+XHJcbiAgICAgIDxwYXRoIGNsYXNzPVwiYWNvcmQtLWxvZ28tY29sb3JcIiBkPVwiTTgwNi45MDYsMzczLjI1YTUzLjg3NSw1My44NzUsMCwwLDAtNTMuODc1LDUzLjg3NWMwLDI0LjkzOSwyMC4yNDUsNDYuOTg3LDQzLjI1LDUzLjEyNSw0LjQ0MiwxLjE4NSwxMC4xODUtMzksMTEtMzksMC41NzcsMCwyNy43LDMuNTEsMzEsNCw1LjU3MiwwLjgyOCwxMS45MjYtMTMuODc2LDQtMjAtMS45My0xLjQ5MS0yNi42MjEtNi45NTktMjktNy0wLjYyLS4wMTEsNy4zMzktNDEuNjE4LDctNDNDODE5LjQwOSwzNzEuNjk0LDgxMS41MjgsMzczLjI1LDgwNi45MDYsMzczLjI1WlwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgtNTUzLjI1IC0yMTMuNSlcIi8+XHJcbiAgICA8L2c+XHJcbiAgYDtcclxufVxyXG5cclxuXHJcbihhc3luYyAoKSA9PiB7XHJcbiAgd2hpbGUgKHRydWUpIHtcclxuICAgIGlmICh3aW5kb3cuVnVlKSBicmVhaztcclxuICAgIGF3YWl0IHV0aWxzLnNsZWVwKDEwMCk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBiYXNlVnVlRWxtID0gZG9tLnBhcnNlKGBcclxuICAgIDxkaXYgY2xhc3M9XCJhY29yZC0tdGFicy1jb250ZW50LWNvbnRhaW5lclwiPlxyXG4gICAgICA8ZGl2IHYtaWY9XCJzZWxlY3RlZFRhYiA9PT0gJ2hvbWUnXCIgY2xhc3M9XCJ0YWJcIj5cclxuICAgICAgICA8aG9tZS1wYWdlIC8+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IHYtaWY9XCJzZWxlY3RlZFRhYiA9PT0gJ2luc3RhbGxlZC1leHRlbnNpb25zJ1wiIGNsYXNzPVwidGFiXCI+XHJcbiAgICAgICAgPGluc3RhbGxlZC1leHRlbnNpb25zLXBhZ2UgLz5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgdi1pZj1cInNlbGVjdGVkVGFiID09PSAnc3RvcmUnXCIgY2xhc3M9XCJ0YWJcIj5cclxuICAgICAgICA8c3RvcmUtcGFnZSAvPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiB2LWlmPVwic2VsZWN0ZWRUYWIgPT09ICdzZXR0aW5ncydcIiBjbGFzcz1cInRhYlwiPlxyXG4gICAgICAgIDxzZXR0aW5ncy1wYWdlIC8+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgYCk7XHJcblxyXG4gIC8qKiBAdHlwZSB7aW1wb3J0KFwidnVlXCIpLkFwcH0gKi9cclxuICBjb25zdCB2dWVBcHAgPSBWdWUuY3JlYXRlQXBwKHtcclxuICAgIGRhdGEoKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgc2VsZWN0ZWRUYWI6IFwiaG9tZVwiXHJcbiAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgbW91bnRlZCgpIHtcclxuICAgICAgaW50ZXJuYWxWdWVBcHAgPSB0aGlzO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICB2dWVDb21wb25lbnRzLmxvYWQodnVlQXBwKTtcclxuICB2dWVBcHAubW91bnQoYmFzZVZ1ZUVsbSk7XHJcblxyXG4gIGRvbS5wYXRjaCgnW2NsYXNzKj1cImFwcGxpY2F0aW9uU3RvcmUtXCJdIFtjbGFzcyo9XCJzY3JvbGxlckJhc2UtXCJdIFtjbGFzcyo9XCJzdWJzY3JpcHRpb25zUmVkaXJlY3RDb250YWluZXItXCJdJywgKGVsbSkgPT4ge1xyXG4gICAgLyoqIEB0eXBlIHtIVE1MRGl2RWxlbWVudH0gKi9cclxuICAgIGxldCBjb250YWluZXJFbG0gPSBkb20ucGFyZW50cyhlbG0sIDQpLnBvcCgpO1xyXG4gICAgY29udGFpbmVyRWxtLnJlcGxhY2VDaGlsZHJlbihiYXNlVnVlRWxtKTtcclxuICB9KTtcclxufSkoKTtcclxuXHJcblxyXG5cclxuXHJcbiIsICJpbXBvcnQgeyB3YWl0VW50aWxDb25uZWN0aW9uT3BlbiB9IGZyb20gXCIuL290aGVyL3V0aWxzLmpzXCI7XHJcbmltcG9ydCBsb2FkaW5nQW5pbWF0aW9uIGZyb20gXCIuL290aGVyL2xvYWRpbmctYW5pbWF0aW9uXCI7XHJcbmltcG9ydCBhcGkgZnJvbSBcIi4vYXBpXCI7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LCBcImFjb3JkXCIsIHtcclxuICBnZXQoKSB7XHJcbiAgICByZXR1cm4gYXBpLmV4cG9zZWRBUEk7XHJcbiAgfVxyXG59KTtcclxud2luZG93Lmdsb2JhbCA9IHdpbmRvdztcclxuXHJcbihhc3luYyAoKSA9PiB7XHJcbiAgbG9hZGluZ0FuaW1hdGlvbi5zaG93KCk7XHJcbiAgYXdhaXQgd2FpdFVudGlsQ29ubmVjdGlvbk9wZW4oKTtcclxuICBsb2FkaW5nQW5pbWF0aW9uLmhpZGUoKTtcclxufSkoKTtcclxuXHJcbi8vIGV4dHJhc1xyXG5pbXBvcnQgXCIuL290aGVyL3dlYnNvY2tldC10cmlnZ2Vycy5qc1wiO1xyXG5pbXBvcnQgXCIuL3VpL2luZGV4LmpzXCI7Il0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQ0EsYUFBTyxlQUFlLFNBQVMsY0FBYyxFQUFFLE9BQU8sS0FBSyxDQUFDO0FBQzVELGNBQVEsVUFBVSxPQUFPLE9BQU87QUFBQSxRQUM1QixLQUFLO0FBQUEsUUFDTCxLQUFLO0FBQUEsUUFDTCxRQUFRO0FBQUEsUUFDUixRQUFRO0FBQUEsTUFDWixDQUFDO0FBQUE7QUFBQTs7O0FDUEQ7QUFBQTtBQUFBO0FBQ0EsVUFBSSxrQkFBbUIsV0FBUSxRQUFLLG1CQUFvQixTQUFVLEtBQUs7QUFDbkUsZUFBUSxPQUFPLElBQUksYUFBYyxNQUFNLEVBQUUsV0FBVyxJQUFJO0FBQUEsTUFDNUQ7QUFDQSxhQUFPLGVBQWUsU0FBUyxjQUFjLEVBQUUsT0FBTyxLQUFLLENBQUM7QUFDNUQsVUFBTSxXQUFXLGdCQUFnQixnQkFBbUI7QUFDcEQsVUFBTSxlQUFOLE1BQW1CO0FBQUEsUUFDZixjQUFjO0FBQ1YsZUFBSyxZ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QUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxRQUNBLE1BQVE7QUFBQSxVQUNOLElBQU07QUFBQSxVQUNOLFFBQVU7QUFBQSxVQUNWLE1BQVE7QUFBQSxZQUNOLFFBQVU7QUFBQSxjQUNSO0FBQUEsY0FDQTtBQUFBLGNBQ0E7QUFBQSxjQUNBO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsUUFDQSxTQUFXO0FBQUEsVUFDVCxJQUFNO0FBQUEsVUFDTixRQUFVO0FBQUEsWUFDUixRQUFVO0FBQUEsWUFDVixJQUFNO0FBQUEsWUFDTixJQUFNO0FBQUEsY0FDSjtBQUFBLGdCQUNFO0FBQUEsY0FDRjtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsVUFDQSxNQUFRO0FBQUEsWUFDTixRQUFVO0FBQUEsY0FDUjtBQUFBLGNBQ0E7QUFBQSxjQUNBO0FBQUEsY0FDQTtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLFFBQ0EsVUFBWTtBQUFBLFVBQ1YsSUFBTTtBQUFBLFVBQ04sUUFBVTtBQUFBLFVBQ1YsTUFBUTtBQUFBLFlBQ04sT0FBUztBQUFBLGNBQ1A7QUFBQSxjQUNBO0FBQUEsY0FDQTtBQUFBLGNBQ0E7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsTUFDQSxnQkFBa0I7QUFBQSxRQUNoQixJQUFNO0FBQUEsUUFDTixNQUFRO0FBQUEsVUFDTixPQUFTO0FBQUEsWUFDUDtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsUUFDQSxRQUFVO0FBQUEsVUFDUixRQUFVO0FBQUEsVUFDVixJQUFNO0FBQUEsVUFDTixJQUFNO0FBQUEsWUFDSjtBQUFBLGNBQ0U7QUFBQSxjQUNBO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLE1BQ0EsT0FBUztBQUFBLFFBQ1AsSUFBTTtBQUFBLFFBQ04sTUFBUTtBQUFBLFVBQ04sT0FBUztBQUFBLFlBQ1A7QUFBQSxZQUNBO0FBQUEsWUFD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QUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBMEJyQjtBQUdBLEdBQUMsWUFBWTtBQUNYLFdBQU8sTUFBTTtBQUNYLFVBQUksT0FBTztBQUFLO0FBQ2hCLFlBQU0sY0FBTSxNQUFNLEdBQUc7QUFBQSxJQUN2QjtBQUVBLFVBQU0sYUFBYSxZQUFJLE1BQU07QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FlNUI7QUFHRCxVQUFNLFNBQVMsSUFBSSxVQUFVO0FBQUEsTUFDM0IsT0FBTztBQUNMLGVBQU87QUFBQSxVQUNMLGFBQWE7QUFBQSxRQUNmO0FBQUEsTUFDRjtBQUFBLE1BQ0EsVUFBVTtBQUNSLHlCQUFpQjtBQUFBLE1BQ25CO0FBQUEsSUFDRixDQUFDO0FBRUQsMkJBQWMsS0FBSyxNQUFNO0FBQ3pCLFdBQU8sTUFBTSxVQUFVO0FBRXZCLGdCQUFJLE1BQU0sb0dBQW9HLENBQUMsUUFBUTtBQUVySCxVQUFJLGVBQWUsWUFBSSxRQUFRLEtBQUssQ0FBQyxFQUFFLElBQUk7QUFDM0MsbUJBQWEsZ0JBQWdCLFVBQVU7QUFBQSxJQUN6QyxDQUFDO0FBQUEsRUFDSCxHQUFHOzs7QUNqS0gsU0FBTyxlQUFlLFFBQVEsU0FBUztBQUFBLElBQ3JDLE1BQU07QUFDSixhQUFPLFlBQUk7QUFBQSxJQUNiO0FBQUEsRUFDRixDQUFDO0FBQ0QsU0FBTyxTQUFTO0FBRWhCLEdBQUMsWUFBWTtBQUNYLDhCQUFpQixLQUFLO0FBQ3RCLFVBQU0sd0JBQXdCO0FBQzlCLDhCQUFpQixLQUFLO0FBQUEsRUFDeEIsR0FBRzsiLAogICJuYW1lcyI6IFsiZXZlbnQiLCAibWFrZSIsICJ0YXJnZXQiLCAidHJlZSIsICJzZWFyY2hGaWx0ZXIiLCAid2Fsa2FibGUiLCAiaWdub3JlIiwgImZvdW5kIiwgImNvbXBvbmVudHMiLCAiXyIsICJjaGVjayIsICJtb2R1bGVzIiwgInJlcXVpcmUiLCAiZm91bmQiLCAiZmluZGVyIiwgImZvdW5kIiwgInJlcSIsICJmaW5kZXIiLCAiY29tbW9uX2RlZmF1bHQiLCAiY29tbW9uX2RlZmF1bHQiLCAibm9TdG9yZSIsICJfIiwgIl8iLCAiXyIsICJ2YWwiLCAiZXJyb3IiLCAib3V0IiwgImNoZWNrIiwgIl8iLCAiQkFTRV9VUkwiLCAibmVzdHMiLCAib3V0IiwgIl8iLCAic291cmNlIiwgImFwaSIsICJjb21tb25fZGVmYXVsdCIsICJzZXQiLCAic2hvdyIsICJjb21tb25fZGVmYXVsdCIsICJvdXQiLCAiXyIsICJSZWFjdCIsICJjb21tb25fZGVmYXVsdCIsICJjb21tb25fZGVmYXVsdCIsICJSZWFjdCIsICJjb21tb25fZGVmYXVsdCIsICJpbnRlcmFjdGVkIiwgImdldENvbnRhaW5lciIsICJzaG93IiwgImFwaSIsICJzdHlsZV9kZWZhdWx0IiwgInN0eWxlX2RlZmF1bHQiLCAic3R5bGVfZGVmYXVsdCIsICJzdHlsZV9kZWZhdWx0IiwgInN0eWxlX2RlZmF1bHQiLCAic3R5bGVfZGVmYXVsdCIsICJlbG0iXQp9Cg==
