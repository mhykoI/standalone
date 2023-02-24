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
`;

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
        nameElm.textContent = "Acord";
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
        titleElm.textContent = "Acord";
        if (internalVueApp) {
          let buildButton = function(id, text, selected = false) {
            let elm2 = dom_default.parse(`<div id="tab-button-${id}" class="acord--tab-button ${tabBarClasses.item} ${headerClasses.item} ${headerClasses.themed}">${text}</div>`);
            buttons.push(elm2);
            elm2.setSelected = (s) => {
              if (s)
                elm2.classList.add(headerClasses.selected);
              else
                elm2.classList.remove(headerClasses.selected);
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
          buttonsContainer.appendChild(buildButton("home", "Home"));
          buttonsContainer.appendChild(buildButton("plugins", "Plugins"));
          buttonsContainer.appendChild(buildButton("themes", "Themes"));
          buttonsContainer.appendChild(buildButton("settings", "Settings"));
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
    <div class="acord--base-page">
      {{selectedTab}}
    </div>
  `);
    Vue.createApp({
      data() {
        return {
          selectedTab: "home"
        };
      },
      methods: {},
      mounted() {
        internalVueApp = this;
      }
    }).mount(baseVueElm);
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibm9kZV9tb2R1bGVzL25lc3RzL2Nqcy9FdmVudHMuanMiLCAibm9kZV9tb2R1bGVzL25lc3RzL2Nqcy9FdmVudEVtaXR0ZXIuanMiLCAibm9kZV9tb2R1bGVzL25lc3RzL2Nqcy9tYWtlLmpzIiwgIm5vZGVfbW9kdWxlcy9uZXN0cy9janMvaW5kZXguanMiLCAic3JjL2RhdGEvY29tbW9uLmpzb24iLCAic3JjL2FwaS91dGlscy9yYXcvZmluZC1pbi10cmVlLmpzIiwgInNyYy9hcGkvdXRpbHMvbG9nZ2VyLmpzIiwgInNyYy9hcGkvdXRpbHMvcmVhY3QuanMiLCAic3JjL2FwaS91dGlscy9pbmRleC5qcyIsICJzcmMvYXBpL21vZHVsZXMvcmF3L2NvbXBsZXgtZmluZGVyLmpzIiwgInNyYy9hcGkvbW9kdWxlcy93ZWJwYWNrLmpzIiwgInNyYy9hcGkvbW9kdWxlcy9jb21tb24uanMiLCAic3JjL2FwaS9tb2R1bGVzL2luZGV4LmpzIiwgInNyYy9vdGhlci91dGlscy5qcyIsICJzcmMvbGliL0Jhc2ljRXZlbnRFbWl0dGVyLmpzIiwgInNyYy9hcGkvZXZlbnRzL2luZGV4LmpzIiwgInNyYy9hcGkvZG9tL2luZGV4LmpzIiwgInNyYy9saWIvc3BpdHJvYXN0L2Rpc3QvZXNtL3NoYXJlZC5qcyIsICJzcmMvbGliL3NwaXRyb2FzdC9kaXN0L2VzbS9ob29rLmpzIiwgInNyYy9saWIvc3BpdHJvYXN0L2Rpc3QvZXNtL3VuLXBhdGNoLmpzIiwgInNyYy9saWIvc3BpdHJvYXN0L2Rpc3QvZXNtL2dldC1wYXRjaC1mdW5jLmpzIiwgInNyYy9saWIvc3BpdHJvYXN0L2Rpc3QvZXNtL2luZGV4LmpzIiwgInNyYy9hcGkvcGF0Y2hlci9pbmRleC5qcyIsICJzcmMvb3RoZXIvbG9hZGluZy1hbmltYXRpb24vc3R5bGUuc2NzcyIsICJzcmMvb3RoZXIvbG9hZGluZy1hbmltYXRpb24vaW5kZXguanMiLCAic3JjL2FwaS9kZXYvaW5kZXguanMiLCAic3JjL2FwaS9pMThuL2luZGV4LmpzIiwgInNyYy9hcGkvc3RvcmFnZS9pbmRleC5qcyIsICJub2RlX21vZHVsZXMvaWRiLWtleXZhbC9kaXN0L2luZGV4LmpzIiwgInNyYy9saWIvanNvbi1kZWN5Y2xlZC9pbmRleC5qcyIsICJzcmMvYXBpL2V4dGVuc2lvbnMvaTE4bi5qcyIsICJzcmMvYXBpL2V4dGVuc2lvbnMvaW5kZXguanMiLCAic3JjL2FwaS9pbnRlcm5hbC9pbmRleC5qcyIsICJzcmMvYXBpL3dlYnNvY2tldC9pbmRleC5qcyIsICJzcmMvYXBpL3VpL3N0eWxlcy5zY3NzIiwgInNyYy9hcGkvdWkvdG9vbHRpcHMuanMiLCAic3JjL2FwaS91aS9ub3RpZmljYXRpb25zLmpzIiwgInNyYy9hcGkvdWkvY29udGV4dE1lbnVzLmpzIiwgInNyYy9saWIvY29tcG9uZW50cy9FcnJvckJvdW5kYXJ5LmpzeCIsICJzcmMvYXBpL3VpL2NvbXBvbmVudHMuanMiLCAic3JjL2FwaS91aS9tb2RhbHMuanN4IiwgInNyYy9hcGkvdWkvdG9hc3RzLmpzIiwgInNyYy9hcGkvdWkvaW5kZXguanMiLCAic3JjL2FwaS9pbmRleC5qcyIsICJzcmMvb3RoZXIvd2Vic29ja2V0LXRyaWdnZXJzLmpzIiwgInNyYy91aS9ob21lL3N0eWxlLnNjc3MiLCAic3JjL3VpL2hvbWUvaW5kZXguanMiLCAic3JjL2luZGV4LmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLmRlZmF1bHQgPSBPYmplY3QuZnJlZXplKHtcclxuICAgIEdFVDogXCJHRVRcIixcclxuICAgIFNFVDogXCJTRVRcIixcclxuICAgIERFTEVURTogXCJERUxFVEVcIixcclxuICAgIFVQREFURTogXCJVUERBVEVcIixcclxufSk7XHJcbiIsICJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBFdmVudHNfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9FdmVudHNcIikpO1xyXG5jbGFzcyBFdmVudEVtaXR0ZXIge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5saXN0ZW5lcnMgPSBPYmplY3QudmFsdWVzKEV2ZW50c18xLmRlZmF1bHQpLnJlZHVjZSgoYWNjLCB2YWwpID0+ICgoYWNjW3ZhbF0gPSBuZXcgU2V0KCkpLCBhY2MpLCB7fSk7XHJcbiAgICAgICAgdGhpcy5vbiA9IGZ1bmN0aW9uIChldmVudCwgbGlzdGVuZXIpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubGlzdGVuZXJzW2V2ZW50XS5oYXMobGlzdGVuZXIpKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcihgVGhpcyBsaXN0ZW5lciBvbiAke2V2ZW50fSBhbHJlYWR5IGV4aXN0cy5gKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmxpc3RlbmVyc1tldmVudF0uYWRkKGxpc3RlbmVyKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMub25jZSA9IGZ1bmN0aW9uIChldmVudCwgbGlzdGVuZXIpIHtcclxuICAgICAgICAgICAgY29uc3Qgb25jZUxpc3RlbmVyID0gKGV2ZW50LCBkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9mZihldmVudCwgb25jZUxpc3RlbmVyKTtcclxuICAgICAgICAgICAgICAgIGxpc3RlbmVyKGV2ZW50LCBkYXRhKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdGhpcy5vbihldmVudCwgb25jZUxpc3RlbmVyKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMub2ZmID0gZnVuY3Rpb24gKGV2ZW50LCBsaXN0ZW5lcikge1xyXG4gICAgICAgICAgICB0aGlzLmxpc3RlbmVyc1tldmVudF0uZGVsZXRlKGxpc3RlbmVyKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuZW1pdCA9IGZ1bmN0aW9uIChldmVudCwgZGF0YSkge1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGxpc3RlbmVyIG9mIHRoaXMubGlzdGVuZXJzW2V2ZW50XSkge1xyXG4gICAgICAgICAgICAgICAgbGlzdGVuZXIoZXZlbnQsIGRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBmb3IgKGNvbnN0IGV2ZW50IG9mIE9iamVjdC52YWx1ZXMoRXZlbnRzXzEuZGVmYXVsdCkpIHtcclxuICAgICAgICAgICAgdGhpc1tldmVudC50b0xvd2VyQ2FzZSgpXSA9IChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoZXZlbnQsIGRhdGEpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5leHBvcnRzLmRlZmF1bHQgPSBFdmVudEVtaXR0ZXI7XHJcbiIsICJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBFdmVudEVtaXR0ZXJfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9FdmVudEVtaXR0ZXJcIikpO1xyXG5mdW5jdGlvbiBtYWtlKFxyXG4vLyBUaGlzIGNhbiBiZSBzYWZlbHkgaWdub3JlZCwgdGhlIERhdGEgd2lsbCBhbHdheXMgYmUgYW4gb2JqZWN0IG9yIGl0IHdvbid0IHdvcmsgYW55d2F5LlxyXG4vLyBAdHMtaWdub3JlXHJcbmRhdGEgPSB7fSwgeyBuZXN0QXJyYXlzID0gdHJ1ZSwgfSA9IHt9KSB7XHJcbiAgICBjb25zdCBlbWl0dGVyID0gbmV3IEV2ZW50RW1pdHRlcl8xLmRlZmF1bHQoKTtcclxuICAgIGZ1bmN0aW9uIGNyZWF0ZVByb3h5KHRhcmdldCwgcm9vdCwgcGF0aCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJveHkodGFyZ2V0LCB7XHJcbiAgICAgICAgICAgIGdldCh0YXJnZXQsIHByb3BlcnR5KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdQYXRoID0gWy4uLnBhdGgsIHByb3BlcnR5XTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdGFyZ2V0W3Byb3BlcnR5XTtcclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZW1pdHRlci5nZXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRoOiBuZXdQYXRoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSxcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIW5lc3RBcnJheXMgJiYgQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjcmVhdGVQcm94eSh2YWx1ZSwgcm9vdCwgbmV3UGF0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBjcmVhdGVQcm94eSgodGFyZ2V0W3Byb3BlcnR5XSA9IHt9KSwgcm9vdCwgbmV3UGF0aCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldCh0YXJnZXQsIHByb3BlcnR5LCB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0W3Byb3BlcnR5XSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgZW1pdHRlci5zZXQoe1xyXG4gICAgICAgICAgICAgICAgICAgIHBhdGg6IFsuLi5wYXRoLCBwcm9wZXJ0eV0sXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vIFRoaXMgbmVlZHMgdG8gcmV0dXJuIHRydWUgb3IgaXQgZXJyb3JzLiAvc2hydWdcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkZWxldGVQcm9wZXJ0eSh0YXJnZXQsIHByb3BlcnR5KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGVsZXRlIHRhcmdldFtwcm9wZXJ0eV0pIHtcclxuICAgICAgICAgICAgICAgICAgICBlbWl0dGVyLmRlbGV0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGg6IFsuLi5wYXRoLCBwcm9wZXJ0eV0sXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGhhcyh0YXJnZXQsIHByb3BlcnR5KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRhcmdldFtwcm9wZXJ0eV0gPT09IFwib2JqZWN0XCIgJiZcclxuICAgICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyh0YXJnZXRbcHJvcGVydHldKS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvcGVydHkgaW4gdGFyZ2V0O1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oeyBzdG9yZTogY3JlYXRlUHJveHkoZGF0YSwgZGF0YSwgW10pLCBcclxuICAgICAgICAvLyBUaGlzIGNhbiBiZSBzYWZlbHkgaWdub3JlZCwgdGhlIERhdGEgd2lsbCBhbHdheXMgYmUgYW4gb2JqZWN0IG9yIGl0IHdvbid0IHdvcmsgYW55d2F5LlxyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICBnaG9zdDogZGF0YSB9LCBlbWl0dGVyKTtcclxufVxyXG5leHBvcnRzLmRlZmF1bHQgPSBtYWtlO1xyXG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5tYWtlID0gZXhwb3J0cy5FdmVudHMgPSB2b2lkIDA7XHJcbnZhciBFdmVudHNfMSA9IHJlcXVpcmUoXCIuL0V2ZW50c1wiKTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiRXZlbnRzXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBfX2ltcG9ydERlZmF1bHQoRXZlbnRzXzEpLmRlZmF1bHQ7IH0gfSk7XHJcbnZhciBtYWtlXzEgPSByZXF1aXJlKFwiLi9tYWtlXCIpO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJtYWtlXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBfX2ltcG9ydERlZmF1bHQobWFrZV8xKS5kZWZhdWx0OyB9IH0pO1xyXG4iLCAie1xyXG4gIFwiY29tbW9uXCI6IHtcclxuICAgIFwibW9kYWxzXCI6IHtcclxuICAgICAgXCJjb21wb25lbnRzXCI6IHtcclxuICAgICAgICBcIm90aGVyXCI6IHtcclxuICAgICAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgIFwiSGVhZGVyXCIsXHJcbiAgICAgICAgICAgICAgICBcIkZvb3RlclwiXHJcbiAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiUm9vdFwiOiB7XHJcbiAgICAgICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgICAgICBcImluXCI6IFwic3RyaW5nc1wiLFxyXG4gICAgICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICBcIkVOVEVSSU5HXCJcclxuICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgXCJhY3Rpb25zXCI6IHtcclxuICAgICAgICBcIm9wZW5cIjoge1xyXG4gICAgICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICAgICAgXCJpblwiOiBcInN0cmluZ3NcIixcclxuICAgICAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgXCJvbkNsb3NlQ2FsbGJhY2tcIixcclxuICAgICAgICAgICAgICAgIFwiTGF5ZXJcIlxyXG4gICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgICAgIFwiYmVmb3JlXCI6IFtcclxuICAgICAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICAgICAgXCJvcGVuXCJcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIFwibWFwXCI6IHtcclxuICAgICAgICAgICAgXCJvcGVuXCI6IFtcclxuICAgICAgICAgICAgICBcIm9uQ2xvc2VDYWxsYmFja1wiLFxyXG4gICAgICAgICAgICAgIFwiTGF5ZXJcIlxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImNsb3NlXCI6IHtcclxuICAgICAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgICAgIFwiaW5cIjogXCJzdHJpbmdzXCIsXHJcbiAgICAgICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgIFwib25DbG9zZUNhbGxiYWNrKClcIlxyXG4gICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgICAgIFwiYmVmb3JlXCI6IFtcclxuICAgICAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICAgICAgXCJjbG9zZVwiXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBcIm1hcFwiOiB7XHJcbiAgICAgICAgICAgIFwiY2xvc2VcIjogW1xyXG4gICAgICAgICAgICAgIFwib25DbG9zZUNhbGxiYWNrKClcIlxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJjb21wb25lbnRzXCI6IHtcclxuICAgICAgXCJCdXR0b25cIjoge1xyXG4gICAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgIFwiQm9yZGVyQ29sb3JzXCJcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICAgIFwiYmVmb3JlXCI6IFtcclxuICAgICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgICBdLFxyXG4gICAgICAgICAgXCJhZnRlclwiOiBcIkJ1dHRvblwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIm1hcFwiOiB7XHJcbiAgICAgICAgICBcIkJ1dHRvblwiOiBbXHJcbiAgICAgICAgICAgIFwiLkZJTExFRFwiLFxyXG4gICAgICAgICAgICBcIi5vbk1vdXNlTGVhdmVcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgXCJDb25maXJtYXRpb25Nb2RhbFwiOiB7XHJcbiAgICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgICAgXCJpblwiOiBcInN0cmluZ3NcIixcclxuICAgICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgXCIuY29uZmlybUJ1dHRvbkNvbG9yXCJcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICAgIFwiYmVmb3JlXCI6IFtcclxuICAgICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBcIlRleHRcIjoge1xyXG4gICAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgICBcImZpbHRlclwiOiBcIiQ/LlNpemVzPy5TSVpFXzMyICYmICQuQ29sb3JzXCIsXHJcbiAgICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICAgIFwiYmVmb3JlXCI6IFtcclxuICAgICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBcIlRvb2x0aXBcIjoge1xyXG4gICAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICAgIFwiaW5cIjogXCJwcm90b3R5cGVzXCIsXHJcbiAgICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgIFwicmVuZGVyVG9vbHRpcFwiXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgICBcImJlZm9yZVwiOiBbXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgXCJNYXJrZG93blwiOiB7XHJcbiAgICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICAgIFwiZmlsdGVyXCI6IFwiJD8ucHJvdG90eXBlPy5yZW5kZXIgJiYgJC5ydWxlc1wiLFxyXG4gICAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJGbHV4RGlzcGF0Y2hlclwiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwiX2N1cnJlbnREaXNwYXRjaEFjdGlvblR5cGVcIixcclxuICAgICAgICAgICAgXCJkaXNwYXRjaFwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJSZWFjdFwiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwiY3JlYXRlRWxlbWVudFwiLFxyXG4gICAgICAgICAgICBcInVzZVN0YXRlXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIlJlc3RcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcImdldFwiLFxyXG4gICAgICAgICAgICBcInBvc3RcIixcclxuICAgICAgICAgICAgXCJnZXRBUElCYXNlVVJMXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIkZsdXhcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcImNvbm5lY3RTdG9yZXNcIixcclxuICAgICAgICAgICAgXCJkZXN0cm95XCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIldlYlNvY2tldFwiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjogXCIkPy5fX3Byb3RvX18/LmhhbmRsZUNvbm5lY3Rpb25cIixcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImJlZm9yZVwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIkFjdGl2aXR5QWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwic2VuZEFjdGl2aXR5SW52aXRlXCIsXHJcbiAgICAgICAgICAgIFwidXBkYXRlQWN0aXZpdHlcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiUHJpdmF0ZUNoYW5uZWxBY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJvcGVuUHJpdmF0ZUNoYW5uZWxcIixcclxuICAgICAgICAgICAgXCJlbnN1cmVQcml2YXRlQ2hhbm5lbFwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJBY2tBY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJpblwiOiBcInN0cmluZ3NcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJ0eXBlOlxcXCJCVUxLX0FDS1xcXCJcIlxyXG4gICAgICAgICAgXSxcclxuICAgICAgICAgIFtdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IHRydWUsXHJcbiAgICAgICAgXCJiZWZvcmVcIjogXCJleHBvcnRzXCJcclxuICAgICAgfSxcclxuICAgICAgXCJtYXBcIjoge1xyXG4gICAgICAgIFwiYWNrXCI6IFtcclxuICAgICAgICAgIFwidHlwZTpcXFwiQ0hBTk5FTF9BQ0tcXFwiXCIsXHJcbiAgICAgICAgICBcIm1lc3NhZ2VJZFwiLFxyXG4gICAgICAgICAgXCJjaGFubmVsSWRcIlxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgXCJidWxrQWNrXCI6IFtcclxuICAgICAgICAgIFwidHlwZTpcXFwiQlVMS19BQ0tcXFwiXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIkFuYWx5dGljc0FjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcImlzVGhyb3R0bGVkXCIsXHJcbiAgICAgICAgICAgIFwidHJhY2tcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiQW5pbWF0aW9uQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcInNwcmluZ1wiLFxyXG4gICAgICAgICAgICBcImRlY2F5XCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIkNvbm5lY3Rpb25BY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJzZXRTaG93QWN0aXZpdHlcIixcclxuICAgICAgICAgICAgXCJzZXRWaXNpYmlsaXR5XCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIlJUQ0Nvbm5lY3Rpb25BY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJnZXRDaGFubmVsSWRcIixcclxuICAgICAgICAgICAgXCJnZXRHdWlsZElkXCIsXHJcbiAgICAgICAgICAgIFwiZ2V0UlRDQ29ubmVjdGlvbklkXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIkVtb2ppQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwidHJhbnNsYXRlSW5saW5lRW1vamlUb1N1cnJvZ2F0ZXNcIixcclxuICAgICAgICAgICAgXCJ0cmFuc2xhdGVTdXJyb2dhdGVzVG9JbmxpbmVFbW9qaVwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJFbW9qaVN0YXRlQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwiZ2V0VVJMXCIsXHJcbiAgICAgICAgICAgIFwiaXNFbW9qaURpc2FibGVkXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIkd1aWxkTm90aWZpY2F0aW9uc0FjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcInVwZGF0ZUNoYW5uZWxPdmVycmlkZVNldHRpbmdzXCIsXHJcbiAgICAgICAgICAgIFwidXBkYXRlR3VpbGROb3RpZmljYXRpb25TZXR0aW5nc1wiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJJbnRlcm5hbFJlYWN0XCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJqc3hcIixcclxuICAgICAgICAgICAgXCJqc3hzXCIsXHJcbiAgICAgICAgICAgIFwiRnJhZ21lbnRcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiTG9naW5BY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJsb2dpblwiLFxyXG4gICAgICAgICAgICBcImxvZ291dFwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJRdWVyeUFjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcInF1ZXJ5RW1vamlSZXN1bHRzXCIsXHJcbiAgICAgICAgICAgIFwicXVlcnlGcmllbmRzXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIk1lc3NhZ2VBY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJyZWNlaXZlTWVzc2FnZVwiLFxyXG4gICAgICAgICAgICBcInNlbmRNZXNzYWdlXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIlByZW1pdW1BY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJpc1ByZW1pdW1cIixcclxuICAgICAgICAgICAgXCJjYW5Vc2VFbW9qaXNFdmVyeXdoZXJlXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIlZvaWNlQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwic2VsZWN0Vm9pY2VDaGFubmVsXCIsXHJcbiAgICAgICAgICAgIFwiZGlzY29ubmVjdFwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJUeXBpbmdBY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJzdGFydFR5cGluZ1wiLFxyXG4gICAgICAgICAgICBcInN0b3BUeXBpbmdcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiR3VpbGRBY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJzZXRDaGFubmVsXCIsXHJcbiAgICAgICAgICAgIFwic2V0U2VydmVyTXV0ZVwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJJbnZpdGVBY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJhY2NlcHRJbnZpdGVcIixcclxuICAgICAgICAgICAgXCJhY2NlcHRJbnZpdGVBbmRUcmFuc2l0aW9uVG9JbnZpdGVDaGFubmVsXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIk1lZGlhRW5naW5lQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwidG9nZ2xlU2VsZkRlYWZcIixcclxuICAgICAgICAgICAgXCJ0b2dnbGVTZWxmTXV0ZVwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJpMThuXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJfcmVxdWVzdGVkTG9jYWxlXCIsXHJcbiAgICAgICAgICAgIFwiZ2V0RGVmYXVsdExvY2FsZVwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJ1dWlkXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJ2MVwiLFxyXG4gICAgICAgICAgICBcInY0XCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcImhsanNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcImhpZ2hsaWdodEFsbFwiLFxyXG4gICAgICAgICAgICBcImhpZ2hsaWdodFwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59IiwgImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGZpbmRJblRyZWUoXHJcbiAgdHJlZSxcclxuICBzZWFyY2hGaWx0ZXIsXHJcbiAgeyB3YWxrYWJsZSA9IG51bGwsIGlnbm9yZSA9IFtdLCBsaW1pdCA9IDEwMCB9ID0ge31cclxuKSB7XHJcbiAgbGV0IGl0ZXJhdGlvbiA9IDA7XHJcblxyXG4gIGZ1bmN0aW9uIGRvU2VhcmNoKHRyZWUsIHNlYXJjaEZpbHRlciwgeyB3YWxrYWJsZSA9IG51bGwsIGlnbm9yZSA9IFtdIH0gPSB7fSkge1xyXG4gICAgaXRlcmF0aW9uICs9IDE7XHJcbiAgICBpZiAoaXRlcmF0aW9uID4gbGltaXQpIHJldHVybjtcclxuXHJcbiAgICBpZiAodHlwZW9mIHNlYXJjaEZpbHRlciA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICBpZiAodHJlZS5oYXNPd25Qcm9wZXJ0eShzZWFyY2hGaWx0ZXIpKSByZXR1cm4gdHJlZVtzZWFyY2hGaWx0ZXJdO1xyXG4gICAgfSBlbHNlIGlmIChzZWFyY2hGaWx0ZXIodHJlZSkpIHJldHVybiB0cmVlO1xyXG5cclxuICAgIGlmICghdHJlZSkgcmV0dXJuO1xyXG5cclxuICAgIGlmIChBcnJheS5pc0FycmF5KHRyZWUpKSB7XHJcbiAgICAgIGZvciAoY29uc3QgaXRlbSBvZiB0cmVlKSB7XHJcbiAgICAgICAgY29uc3QgZm91bmQgPSBkb1NlYXJjaChpdGVtLCBzZWFyY2hGaWx0ZXIsIHsgd2Fsa2FibGUsIGlnbm9yZSB9KTtcclxuICAgICAgICBpZiAoZm91bmQpIHJldHVybiBmb3VuZDtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdHJlZSA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyh0cmVlKSkge1xyXG4gICAgICAgIGlmICh3YWxrYWJsZSAhPSBudWxsICYmICF3YWxrYWJsZS5pbmNsdWRlcyhrZXkpKSBjb250aW51ZTtcclxuXHJcbiAgICAgICAgaWYgKGlnbm9yZS5pbmNsdWRlcyhrZXkpKSBjb250aW51ZTtcclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIGNvbnN0IGZvdW5kID0gZG9TZWFyY2godHJlZVtrZXldLCBzZWFyY2hGaWx0ZXIsIHtcclxuICAgICAgICAgICAgd2Fsa2FibGUsXHJcbiAgICAgICAgICAgIGlnbm9yZSxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgaWYgKGZvdW5kKSByZXR1cm4gZm91bmQ7XHJcbiAgICAgICAgfSBjYXRjaCB7IH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGRvU2VhcmNoKHRyZWUsIHNlYXJjaEZpbHRlciwgeyB3YWxrYWJsZSwgaWdub3JlIH0pO1xyXG59O1xyXG4iLCAiZnVuY3Rpb24gYnVpbGQocHJlZml4ID0gXCJBY29yZFwiLCB0eXBlLCBjb2xvcikge1xyXG4gIHJldHVybiAoLi4uaW5wdXQpID0+IGNvbnNvbGVbdHlwZV0oXHJcbiAgICBgJWMke3ByZWZpeH0lY2AsXHJcbiAgICBgYmFja2dyb3VuZC1jb2xvcjogJHtjb2xvcn07IGNvbG9yOiB3aGl0ZTsgYm9yZGVyLXJhZGl1czogNHB4OyBwYWRkaW5nOiAwcHggNnB4IDBweCA2cHg7IGZvbnQtd2VpZ2h0OiBib2xkYCxcclxuICAgIFwiXCIsXHJcbiAgICAuLi5pbnB1dFxyXG4gICk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBsb2c6IGJ1aWxkKFwiQWNvcmRcIiwgXCJsb2dcIiwgXCIjMDBmYmIwXCIpLFxyXG4gIGRlYnVnOiBidWlsZChcIkFjb3JkIERlYnVnXCIsIFwiZGVidWdcIiwgXCIjMDBmYmIwXCIpLFxyXG4gIGluZm86IGJ1aWxkKFwiQWNvcmQgSW5mb1wiLCBcImxvZ1wiLCBcIiM4MmFhZmZcIiksXHJcbiAgd2FybjogYnVpbGQoXCJBY29yZCBXYXJuXCIsIFwid2FyblwiLCBcIiNkZWJmMThcIiksXHJcbiAgZXJyb3I6IGJ1aWxkKFwiQWNvcmQgRXJyb3JcIiwgXCJlcnJvclwiLCBcIiNlZjU4NThcIiksXHJcbiAgYnVpbGRcclxufSIsICJpbXBvcnQgZmluZEluVHJlZSBmcm9tIFwiLi9yYXcvZmluZC1pbi10cmVlLmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgZ2V0SW5zdGFuY2Uobm9kZSkge1xyXG4gICAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKG5vZGUpLmZpbmQoaSA9PiBpWzBdLnN0YXJ0c1dpdGgoXCJfX3JlYWN0SW50ZXJuYWxJbnN0YW5jZVwiKSB8fCBpWzBdLnN0YXJ0c1dpdGgoXCJfX3JlYWN0RmliZXJcIikpPy5bMV07XHJcbiAgfSxcclxuICBnZXRPd25lckluc3RhbmNlKG5vZGUpIHtcclxuICAgIGxldCBpbnN0YW5jZSA9IHRoaXMuZ2V0SW5zdGFuY2Uobm9kZSk7XHJcbiAgICBmb3IgKGxldCBlbCA9IGluc3RhbmNlOyBlbDsgZWwgPSBlbC5yZXR1cm4pXHJcbiAgICAgIGlmIChlbC5zdGF0ZU5vZGU/LmZvcmNlVXBkYXRlKSByZXR1cm4gZWwuc3RhdGVOb2RlO1xyXG4gIH0sXHJcbiAgZmluZEluVHJlZSh0cmVlLCBmaWx0ZXIpIHtcclxuICAgIHJldHVybiBmaW5kSW5UcmVlKHRyZWUsIGZpbHRlciwge1xyXG4gICAgICB3YWxrYWJsZTogW1wicHJvcHNcIiwgXCJzdGF0ZVwiLCBcImNoaWxkcmVuXCIsIFwicmV0dXJuXCJdXHJcbiAgICB9KTtcclxuICB9LFxyXG4gIGdldENvbXBvbmVudHMobm9kZSkge1xyXG4gICAgY29uc3QgaW5zdGFuY2UgPSB0aGlzLmdldEluc3RhbmNlKG5vZGUpO1xyXG4gICAgY29uc3QgY29tcG9uZW50cyA9IFtdO1xyXG4gICAgbGV0IGxhc3RJbnN0YW5jZSA9IGluc3RhbmNlO1xyXG4gICAgd2hpbGUgKGxhc3RJbnN0YW5jZSAmJiBsYXN0SW5zdGFuY2UucmV0dXJuKSB7XHJcbiAgICAgIGlmICh0eXBlb2YgbGFzdEluc3RhbmNlLnJldHVybi50eXBlID09PSBcInN0cmluZ1wiKSBicmVhaztcclxuICAgICAgaWYgKGxhc3RJbnN0YW5jZS5yZXR1cm4udHlwZSkgY29tcG9uZW50cy5wdXNoKGxhc3RJbnN0YW5jZS5yZXR1cm4udHlwZSk7XHJcbiAgICAgIGxhc3RJbnN0YW5jZSA9IGxhc3RJbnN0YW5jZS5yZXR1cm47XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY29tcG9uZW50cztcclxuICB9LFxyXG4gIGdldFN0YXRlTm9kZXMobm9kZSkge1xyXG4gICAgY29uc3QgaW5zdGFuY2UgPSB0aGlzLmdldEluc3RhbmNlKG5vZGUpO1xyXG4gICAgY29uc3Qgc3RhdGVOb2RlcyA9IFtdO1xyXG4gICAgbGV0IGxhc3RJbnN0YW5jZSA9IGluc3RhbmNlO1xyXG4gICAgd2hpbGUgKGxhc3RJbnN0YW5jZSAmJiBsYXN0SW5zdGFuY2UucmV0dXJuKSB7XHJcbiAgICAgIGlmIChsYXN0SW5zdGFuY2UucmV0dXJuLnN0YXRlTm9kZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSBicmVhaztcclxuICAgICAgaWYgKGxhc3RJbnN0YW5jZS5yZXR1cm4uc3RhdGVOb2RlKVxyXG4gICAgICAgIHN0YXRlTm9kZXMucHVzaChsYXN0SW5zdGFuY2UucmV0dXJuLnN0YXRlTm9kZSk7XHJcbiAgICAgIGxhc3RJbnN0YW5jZSA9IGxhc3RJbnN0YW5jZS5yZXR1cm47XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3RhdGVOb2RlcztcclxuICB9LFxyXG4gIGdldFByb3BzKGVsLCBmaWx0ZXIgPSAoaSkgPT4gaSwgbWF4ID0gMTAwMDApIHtcclxuICAgIGNvbnN0IGluc3RhbmNlID0gdGhpcy5nZXRJbnN0YW5jZShlbCk7XHJcblxyXG4gICAgaWYgKCFpbnN0YW5jZT8ucmV0dXJuKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgICBmb3IgKFxyXG4gICAgICBsZXQgY3VycmVudCA9IGluc3RhbmNlPy5yZXR1cm4sIGkgPSAwO1xyXG4gICAgICBpID4gbWF4IHx8IGN1cnJlbnQgIT09IG51bGw7XHJcbiAgICAgIGN1cnJlbnQgPSBjdXJyZW50Py5yZXR1cm4sIGkrK1xyXG4gICAgKSB7XHJcbiAgICAgIGlmIChjdXJyZW50Py5wZW5kaW5nUHJvcHMgJiYgZmlsdGVyKGN1cnJlbnQucGVuZGluZ1Byb3BzKSlcclxuICAgICAgICByZXR1cm4gY3VycmVudC5wZW5kaW5nUHJvcHM7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfSxcclxufSIsICJpbXBvcnQgZmluZEluVHJlZSBmcm9tIFwiLi9yYXcvZmluZC1pbi10cmVlLmpzXCI7XHJcbmltcG9ydCBsb2dnZXIgZnJvbSBcIi4vbG9nZ2VyLmpzXCI7XHJcbmltcG9ydCByZWFjdCBmcm9tIFwiLi9yZWFjdC5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGxvZ2dlcixcclxuICByZWFjdCxcclxuICBmaW5kSW5UcmVlLFxyXG4gIGZvcm1hdCh2YWwsIC4uLmFyZ3MpIHtcclxuICAgIHJldHVybiBgJHt2YWx9YC5yZXBsYWNlQWxsKC97KFxcZCspfS9nLCAoXywgY2FwKSA9PiB7XHJcbiAgICAgIHJldHVybiBhcmdzW051bWJlcihjYXApXTtcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgaW50ZXJ2YWwoY2IsIGR1cikge1xyXG4gICAgbGV0IGludGVydmFsID0gc2V0SW50ZXJ2YWwoY2IsIGR1cik7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcclxuICAgIH07XHJcbiAgfSxcclxuICB0aW1lb3V0KGNiLCBkdXIpIHtcclxuICAgIGxldCB0aW1lb3V0ID0gc2V0VGltZW91dChjYiwgZHVyKTtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcclxuICAgIH07XHJcbiAgfSxcclxuICBpZkV4aXN0cyh2YWwsIGNiKSB7XHJcbiAgICBpZiAodmFsKSBjYih2YWwpO1xyXG4gIH0sXHJcbiAgY29weVRleHQodGV4dCkge1xyXG4gICAgaWYgKHdpbmRvdy5EaXNjb3JkTmF0aXZlKSB7XHJcbiAgICAgIERpc2NvcmROYXRpdmUuY2xpcGJvYXJkLmNvcHkodGV4dCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBuYXZpZ2F0b3IuY2xpcGJvYXJkLndyaXRlVGV4dCh0ZXh0KS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgIGNvbnN0IGNvcHlBcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRleHRhcmVhXCIpO1xyXG5cclxuICAgICAgY29weUFyZWEuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XHJcbiAgICAgIGNvcHlBcmVhLnN0eWxlLnBvc2l0aW9uID0gXCJmaXhlZFwiO1xyXG4gICAgICBjb3B5QXJlYS5zdHlsZS50b3AgPSBcIjBcIjtcclxuICAgICAgY29weUFyZWEuc3R5bGUubGVmdCA9IFwiMFwiO1xyXG5cclxuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjb3B5QXJlYSk7XHJcbiAgICAgIGNvcHlBcmVhLmZvY3VzKCk7XHJcbiAgICAgIGNvcHlBcmVhLnNlbGVjdCgpO1xyXG5cclxuICAgICAgdHJ5IHtcclxuICAgICAgICBkb2N1bWVudC5leGVjQ29tbWFuZChcImNvcHlcIik7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChjb3B5QXJlYSk7XHJcbiAgICB9KTtcclxuICB9LFxyXG4gIHNsZWVwKG1zKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgbXMpKTtcclxuICB9XHJcbn0iLCAiaW1wb3J0IHV0aWxzIGZyb20gXCIuLi8uLi91dGlscy9pbmRleC5qc1wiO1xyXG5pbXBvcnQgbG9nZ2VyIGZyb20gXCIuLi8uLi91dGlscy9sb2dnZXIuanNcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB3cmFwRmlsdGVyKGZpbHRlcikge1xyXG4gIHJldHVybiAoLi4uYXJncykgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgaWYgKGFyZ3NbMF0/LmRvY3VtZW50ICYmIGFyZ3NbMF0/LndpbmRvdykgcmV0dXJuIGZhbHNlO1xyXG4gICAgICBpZiAoYXJnc1swXT8uZGVmYXVsdD8ucmVtb3ZlICYmIGFyZ3NbMF0/LmRlZmF1bHQ/LnNldCAmJiBhcmdzWzBdPy5kZWZhdWx0Py5jbGVhciAmJiBhcmdzWzBdPy5kZWZhdWx0Py5nZXQgJiYgIWFyZ3NbMF0/LmRlZmF1bHQ/LnNvcnQpIHJldHVybiBmYWxzZTtcclxuICAgICAgaWYgKGFyZ3NbMF0ucmVtb3ZlICYmIGFyZ3NbMF0uc2V0ICYmIGFyZ3NbMF0uY2xlYXIgJiYgYXJnc1swXS5nZXQgJiYgIWFyZ3NbMF0uc29ydCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICBpZiAoYXJnc1swXT8uZGVmYXVsdD8uZ2V0VG9rZW4gfHwgYXJnc1swXT8uZGVmYXVsdD8uZ2V0RW1haWwgfHwgYXJnc1swXT8uZGVmYXVsdD8uc2hvd1Rva2VuKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIGlmIChhcmdzWzBdPy5nZXRUb2tlbiB8fCBhcmdzWzBdPy5nZXRFbWFpbCB8fCBhcmdzWzBdPy5zaG93VG9rZW4pIHJldHVybiBmYWxzZTtcclxuICAgICAgcmV0dXJuIGZpbHRlciguLi5hcmdzKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnIpIHtcclxuICAgICAgbG9nZ2VyLndhcm4oXCJNb2R1bGUgZmlsdGVyIHRocmV3IGFuIGV4Y2VwdGlvbi5cIiwgZmlsdGVyLCBlcnIpO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgfTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2hlY2tNb2R1bGVTdHJpbmdzKG0sIHN0cmluZ3MsIGhhc05vdCkge1xyXG4gIGNvbnN0IGNoZWNrID0gKHMxLCBzMikgPT4ge1xyXG4gICAgcmV0dXJuIGhhc05vdCA/IHMxLnRvU3RyaW5nKCkuaW5kZXhPZihzMi50b1N0cmluZygpKSA9PSAtMSA6IHMxLnRvU3RyaW5nKCkuaW5kZXhPZihzMi50b1N0cmluZygpKSA+IC0xO1xyXG4gIH07XHJcbiAgcmV0dXJuIHN0cmluZ3MuZXZlcnkoaiA9PiB7XHJcbiAgICByZXR1cm4gY2hlY2sobT8udG9TdHJpbmc/LigpIHx8IFwiXCIsIGopXHJcbiAgICAgIHx8IGNoZWNrKG0/Ll9fb3JpZ2luYWxfXz8udG9TdHJpbmc/LigpIHx8IFwiXCIsIGopXHJcbiAgICAgIHx8IGNoZWNrKG0/LnR5cGU/LnRvU3RyaW5nPy4oKSB8fCBcIlwiLCBqKVxyXG4gICAgICB8fCBjaGVjayhtPy50eXBlPy5fX29yaWdpbmFsX18/LnRvU3RyaW5nPy4oKSB8fCBcIlwiLCBqKVxyXG4gICAgICB8fCBPYmplY3QuZW50cmllcyhbJ2Z1bmN0aW9uJywgJ29iamVjdCddLmluY2x1ZGVzKHR5cGVvZiBtPy5wcm90b3R5cGUpID8gdHlwZW9mIG0/LnByb3RvdHlwZSA6IHt9KS5maWx0ZXIoaSA9PiBpWzBdPy5pbmNsdWRlcz8uKFwicmVuZGVyXCIpKS5zb21lKGkgPT4gY2hlY2soaVsxXT8udG9TdHJpbmc/LigpIHx8IFwiXCIsIGopKVxyXG4gIH0pO1xyXG59O1xyXG5mdW5jdGlvbiBjaGVja01vZHVsZVByb3BzKG0sIHByb3BlcnRpZXMsIGhhc05vdCkge1xyXG4gIHJldHVybiBwcm9wZXJ0aWVzLmV2ZXJ5KHByb3AgPT4ge1xyXG4gICAgY29uc3QgdmFsdWUgPSBtW3Byb3BdPy5fX29yaWdpbmFsX18gfHwgbVtwcm9wXTtcclxuICAgIHJldHVybiBoYXNOb3QgPyB2YWx1ZSA9PT0gdW5kZWZpbmVkIDogKHZhbHVlICE9PSB1bmRlZmluZWQgJiYgISh0eXBlb2YgdmFsdWUgPT0gXCJzdHJpbmdcIiAmJiAhdmFsdWUpKTtcclxuICB9KTtcclxufTtcclxuZnVuY3Rpb24gY2hlY2tNb2R1bGVQcm90b3R5cGVzKG0sIHByb3RvUHJvcHMsIGhhc05vdCkge1xyXG4gIHJldHVybiBtLnByb3RvdHlwZSAmJiBwcm90b1Byb3BzLmV2ZXJ5KHByb3AgPT4ge1xyXG4gICAgY29uc3QgdmFsdWUgPSBtLnByb3RvdHlwZVtwcm9wXTtcclxuICAgIHJldHVybiBoYXNOb3QgPyB2YWx1ZSA9PT0gdW5kZWZpbmVkIDogKHZhbHVlICE9PSB1bmRlZmluZWQgJiYgISh0eXBlb2YgdmFsdWUgPT0gXCJzdHJpbmdcIiAmJiAhdmFsdWUpKTtcclxuICB9KTtcclxufTtcclxuXHJcbmNvbnN0IHdlYnBhY2tDaHVua05hbWUgPSBcIndlYnBhY2tDaHVua2Rpc2NvcmRfYXBwXCI7XHJcbmNvbnN0IHB1c2hMaXN0ZW5lcnMgPSBuZXcgU2V0KCk7XHJcblxyXG5cclxue1xyXG4gIGxldCBvZ1B1c2ggPSB3aW5kb3dbd2VicGFja0NodW5rTmFtZV0ucHVzaDtcclxuXHJcbiAgZnVuY3Rpb24gaGFuZGxlUHVzaChjaHVuaykge1xyXG4gICAgY29uc3QgWywgbW9kdWxlc10gPSBjaHVuaztcclxuXHJcbiAgICBmb3IgKGNvbnN0IG1vZHVsZUlkIGluIE9iamVjdC5rZXlzKG1vZHVsZXMgfHwge30pKSB7XHJcbiAgICAgIGNvbnN0IG9nTW9kdWxlID0gbW9kdWxlc1ttb2R1bGVJZF07XHJcblxyXG4gICAgICBtb2R1bGVzW21vZHVsZUlkXSA9IChtb2R1bGUsIGV4cG9ydHMsIHJlcXVpcmUpID0+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgb2dNb2R1bGUuY2FsbChudWxsLCBtb2R1bGUsIGV4cG9ydHMsIHJlcXVpcmUpO1xyXG5cclxuICAgICAgICAgIHB1c2hMaXN0ZW5lcnMuZm9yRWFjaChsaXN0ZW5lciA9PiB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgbGlzdGVuZXIoZXhwb3J0cyk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgdXRpbHMubG9nZ2VyLmVycm9yKFwiUHVzaCBsaXN0ZW5lciB0aHJldyBhbiBleGNlcHRpb24uXCIsIGxpc3RlbmVyLCBlcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgIHV0aWxzLmxvZ2dlci5lcnJvcihcIlVuYWJsZSB0byBwYXRjaCBwdXNoZWQgbW9kdWxlLlwiLCBlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG5cclxuICAgICAgT2JqZWN0LmFzc2lnbihtb2R1bGVzW21vZHVsZUlkXSwgb2dNb2R1bGUsIHtcclxuICAgICAgICBfX29yaWdpbmFsX186IG9nTW9kdWxlLFxyXG4gICAgICAgIHRvU3RyaW5nOiAoKSA9PiBvZ01vZHVsZS50b1N0cmluZygpLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gb2dQdXNoLmNhbGwod2luZG93W3dlYnBhY2tDaHVua05hbWVdLCBjaHVuayk7XHJcbiAgfVxyXG5cclxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93W3dlYnBhY2tDaHVua05hbWVdLCBcInB1c2hcIiwge1xyXG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxyXG4gICAgZ2V0KCkgeyByZXR1cm4gaGFuZGxlUHVzaDsgfSxcclxuICAgIHNldCh2YWx1ZSkge1xyXG4gICAgICBvZ1B1c2ggPSB2YWx1ZTtcclxuXHJcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3dbdGhpcy5jaHVua05hbWVdLCBcInB1c2hcIiwge1xyXG4gICAgICAgIHZhbHVlOiB0aGlzLmhhbmRsZVB1c2gsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIHdyaXRhYmxlOiB0cnVlXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcblxyXG5cclxuXHJcbi8qKlxyXG4gKiBcclxuICogQHBhcmFtIHthbnl9IGZpbHRlciBcclxuICogQHBhcmFtIHt7IHNpZ25hbDogQWJvcnRTaWduYWwsIHNlYXJjaEV4cG9ydHM6IGJvb2xlYW4gfX0gcGFyYW0xIFxyXG4gKiBAcmV0dXJucyBcclxuICovXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsYXp5RmluZChmaWx0ZXIsIHsgc2lnbmFsID0gbnVsbCwgc2VhcmNoRXhwb3J0cyA9IGZhbHNlIH0pIHtcclxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgY29uc3QgY2FuY2VsID0gKCkgPT4gcHVzaExpc3RlbmVycy5kZWxldGUobGlzdGVuZXIpO1xyXG4gICAgY29uc3QgbGlzdGVuZXIgPSAoZXhwb3J0cykgPT4ge1xyXG4gICAgICBpZiAoIWV4cG9ydHMgfHwgZXhwb3J0cyA9PT0gd2luZG93IHx8IGV4cG9ydHMgPT09IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkgcmV0dXJuO1xyXG5cclxuICAgICAgbGV0IGZvdW5kID0gbnVsbDtcclxuXHJcbiAgICAgIGlmICh0eXBlb2YgZXhwb3J0cyA9PSBcIm9iamVjdFwiICYmIHNlYXJjaEV4cG9ydHMpIHtcclxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBleHBvcnRzKSB7XHJcbiAgICAgICAgICBsZXQgZXhwb3J0ZWQgPSBleHBvcnRzW2tleV07XHJcbiAgICAgICAgICBpZiAoIWV4cG9ydGVkKSBjb250aW51ZTtcclxuICAgICAgICAgIGlmIChmaWx0ZXIoZXhwb3J0ZWQpKSB7XHJcbiAgICAgICAgICAgIGZvdW5kID0gZXhwb3J0ZWQ7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBsZXQgcGF0aHMgPSBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCIsXHJcbiAgICAgICAgICBcIlwiXHJcbiAgICAgICAgXTtcclxuICAgICAgICBmb3VuZCA9IHBhdGhzLm1hcChpID0+IHtcclxuICAgICAgICAgIGxldCBwYXRoZWQgPSAhaSA/IGV4cG9ydHMgOiBfLmdldChleHBvcnRzLCBpKTtcclxuICAgICAgICAgIGlmIChwYXRoZWQgJiYgZmlsdGVyKHBhdGhlZCkpIHJldHVybiBwYXRoZWQ7XHJcbiAgICAgICAgfSkuZmluZChpID0+IGkpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIWZvdW5kKSByZXR1cm47XHJcbiAgICAgIGNhbmNlbCgpO1xyXG4gICAgICByZXNvbHZlKGZvdW5kKTtcclxuICAgIH1cclxuXHJcbiAgICBwdXNoTGlzdGVuZXJzLmFkZChsaXN0ZW5lcik7XHJcblxyXG4gICAgc2lnbmFsPy5hZGRFdmVudExpc3RlbmVyKFwiYWJvcnRcIiwgKCkgPT4ge1xyXG4gICAgICBjYW5jZWwoKTtcclxuICAgICAgcmVzb2x2ZShudWxsKTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZmluZChyZXEsIGZpbHRlciwgY29uZmlnID0ge30pIHtcclxuICBsZXQgZGVmYXVsdEV4cG9ydCA9IHR5cGVvZiBjb25maWcuZGVmYXVsdEV4cG9ydCAhPSBcImJvb2xlYW5cIiA/IGZhbHNlIDogY29uZmlnLmRlZmF1bHRFeHBvcnQ7XHJcbiAgbGV0IHVubG9hZGVkID0gdHlwZW9mIGNvbmZpZy51bmxvYWRlZCAhPSBcImJvb2xlYW5cIiA/IGZhbHNlIDogY29uZmlnLnVubG9hZGVkO1xyXG4gIGxldCBhbGwgPSB0eXBlb2YgY29uZmlnLmFsbCAhPSBcImJvb2xlYW5cIiA/IGZhbHNlIDogY29uZmlnLmFsbDtcclxuICBjb25zdCBmb3VuZCA9IFtdO1xyXG4gIGlmICghdW5sb2FkZWQpIGZvciAobGV0IGkgaW4gcmVxLmMpIGlmIChyZXEuYy5oYXNPd25Qcm9wZXJ0eShpKSkge1xyXG4gICAgbGV0IG0gPSByZXEuY1tpXS5leHBvcnRzLCByID0gbnVsbDtcclxuICAgIGlmIChtICYmICh0eXBlb2YgbSA9PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBtID09IFwiZnVuY3Rpb25cIikpIHtcclxuICAgICAgaWYgKCEhKHIgPSBmaWx0ZXIobSwgaSkpKSB7XHJcbiAgICAgICAgaWYgKGFsbCkgZm91bmQucHVzaChkZWZhdWx0RXhwb3J0ID8gciA6IHJlcS5jW2ldKTtcclxuICAgICAgICBlbHNlIHJldHVybiBkZWZhdWx0RXhwb3J0ID8gciA6IHJlcS5jW2ldO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgZm9yIChsZXQga2V5IG9mIE9iamVjdC5rZXlzKG0pKSBpZiAoa2V5Lmxlbmd0aCA8IDQgJiYgbVtrZXldICYmICEhKHIgPSBmaWx0ZXIobVtrZXldLCBpKSkpIHtcclxuICAgICAgICBpZiAoYWxsKSBmb3VuZC5wdXNoKGRlZmF1bHRFeHBvcnQgPyByIDogcmVxLmNbaV0pO1xyXG4gICAgICAgIGVsc2UgcmV0dXJuIGRlZmF1bHRFeHBvcnQgPyByIDogcmVxLmNbaV07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChtICYmIG0uX19lc01vZHVsZSAmJiBtLmRlZmF1bHQgJiYgKHR5cGVvZiBtLmRlZmF1bHQgPT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgbS5kZWZhdWx0ID09IFwiZnVuY3Rpb25cIikpIHtcclxuICAgICAgaWYgKCEhKHIgPSBmaWx0ZXIobS5kZWZhdWx0LCBpKSkpIHtcclxuICAgICAgICBpZiAoYWxsKSBmb3VuZC5wdXNoKGRlZmF1bHRFeHBvcnQgPyByIDogcmVxLmNbaV0pO1xyXG4gICAgICAgIGVsc2UgcmV0dXJuIGRlZmF1bHRFeHBvcnQgPyByIDogcmVxLmNbaV07XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZiAobS5kZWZhdWx0LnR5cGUgJiYgKHR5cGVvZiBtLmRlZmF1bHQudHlwZSA9PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBtLmRlZmF1bHQudHlwZSA9PSBcImZ1bmN0aW9uXCIpICYmICEhKHIgPSBmaWx0ZXIobS5kZWZhdWx0LnR5cGUsIGkpKSkge1xyXG4gICAgICAgIGlmIChhbGwpIGZvdW5kLnB1c2goZGVmYXVsdEV4cG9ydCA/IHIgOiByZXEuY1tpXSk7XHJcbiAgICAgICAgZWxzZSByZXR1cm4gZGVmYXVsdEV4cG9ydCA/IHIgOiByZXEuY1tpXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICBmb3IgKGxldCBpIGluIHJlcS5tKSBpZiAocmVxLm0uaGFzT3duUHJvcGVydHkoaSkpIHtcclxuICAgIGxldCBtID0gcmVxLm1baV07XHJcbiAgICBpZiAobSAmJiB0eXBlb2YgbSA9PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgaWYgKHJlcS5jW2ldICYmICF1bmxvYWRlZCAmJiBmaWx0ZXIobSwgaSkpIHtcclxuICAgICAgICBpZiAoYWxsKSBmb3VuZC5wdXNoKGRlZmF1bHRFeHBvcnQgPyByZXEuY1tpXS5leHBvcnRzIDogcmVxLmNbaV0pO1xyXG4gICAgICAgIGVsc2UgcmV0dXJuIGRlZmF1bHRFeHBvcnQgPyByZXEuY1tpXS5leHBvcnRzIDogcmVxLmNbaV07XHJcbiAgICAgIH1cclxuICAgICAgaWYgKCFyZXEuY1tpXSAmJiB1bmxvYWRlZCAmJiBmaWx0ZXIobSwgaSkpIHtcclxuICAgICAgICBjb25zdCByZXNvbHZlZCA9IHt9LCByZXNvbHZlZDIgPSB7fTtcclxuICAgICAgICBtKHJlc29sdmVkLCByZXNvbHZlZDIsIHJlcSk7XHJcbiAgICAgICAgY29uc3QgdHJ1ZVJlc29sdmVkID0gcmVzb2x2ZWQyICYmIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHJlc29sdmVkMiB8fCB7fSkubGVuZ3RoID09IDAgPyByZXNvbHZlZCA6IHJlc29sdmVkMjtcclxuICAgICAgICBpZiAoYWxsKSBmb3VuZC5wdXNoKGRlZmF1bHRFeHBvcnQgPyB0cnVlUmVzb2x2ZWQuZXhwb3J0cyA6IHRydWVSZXNvbHZlZCk7XHJcbiAgICAgICAgZWxzZSByZXR1cm4gZGVmYXVsdEV4cG9ydCA/IHRydWVSZXNvbHZlZC5leHBvcnRzIDogdHJ1ZVJlc29sdmVkO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIGlmIChhbGwpIHJldHVybiBmb3VuZDtcclxufTtcclxuXHJcblxyXG5mdW5jdGlvbiBmaW5kZXJGaW5kRnVuY3Rpb24oZW50cmllcywgc3RyaW5ncykge1xyXG4gIHJldHVybiAoZW50cmllcy5maW5kKG4gPT4ge1xyXG4gICAgbGV0IGZ1bmNTdHJpbmcgPSB0eXBlb2YgblsxXSA9PSBcImZ1bmN0aW9uXCIgPyAoblsxXT8uX19vcmlnaW5hbF9fPy50b1N0cmluZz8uKCkgfHwgblsxXT8udG9TdHJpbmc/LigpIHx8IFwiXCIpIDogKCgpID0+IHsgdHJ5IHsgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG5bMV0pIH0gY2F0Y2ggKGVycikgeyByZXR1cm4gblsxXS50b1N0cmluZygpIH0gfSkoKTtcclxuICAgIGxldCByZW5kZXJGdW5jU3RyaW5nID0gblsxXT8ucmVuZGVyPy5fX29yaWdpbmFsX18/LnRvU3RyaW5nPy4oKSB8fCBuWzFdPy5yZW5kZXI/LnRvU3RyaW5nPy4oKSB8fCBcIlwiO1xyXG4gICAgcmV0dXJuIHN0cmluZ3MuZXZlcnkoc3RyaW5nID0+IGZ1bmNTdHJpbmcuaW5kZXhPZihzdHJpbmcpICE9IC0xIHx8IHJlbmRlckZ1bmNTdHJpbmcuaW5kZXhPZihzdHJpbmcpICE9IC0xKTtcclxuICB9KSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBmaW5kZXJUb0ZpbHRlcihmaW5kZXIpIHtcclxuICBsZXQgZm91bmQgPSAoKSA9PiBmYWxzZTtcclxuICBpZiAodHlwZW9mIGZpbmRlcj8uZmlsdGVyID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICBmb3VuZCA9IHdyYXBGaWx0ZXIoZXZhbChgKCgkKT0+eyB0cnkgeyByZXR1cm4gKCR7ZmluZGVyLmZpbHRlcn0pOyB9IGNhdGNoIHsgcmV0dXJuIGZhbHNlOyB9IH0pYCkpO1xyXG4gIH0gZWxzZSBpZiAodHlwZW9mIGZpbmRlcj8uZmlsdGVyID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgIGZvdW5kID0gd3JhcEZpbHRlcihmaW5kZXIuZmlsdGVyKTtcclxuICB9IGVsc2Uge1xyXG4gICAgc3dpdGNoIChmaW5kZXIuZmlsdGVyLmluKSB7XHJcbiAgICAgIGNhc2UgXCJwcm9wZXJ0aWVzXCI6IHtcclxuICAgICAgICBpZiAoZmluZGVyLmZpbHRlci5ieT8uWzFdPy5sZW5ndGgpIHtcclxuICAgICAgICAgIGZvdW5kID0gd3JhcEZpbHRlcigobSkgPT4gY2hlY2tNb2R1bGVQcm9wcyhtLCBmaW5kZXIuZmlsdGVyLmJ5Py5bMF0gfHwgW10pICYmIGNoZWNrTW9kdWxlUHJvcHMobSwgZmluZGVyLmZpbHRlci5ieT8uWzFdIHx8IFtdLCB0cnVlKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGZvdW5kID0gd3JhcEZpbHRlcigobSkgPT4gY2hlY2tNb2R1bGVQcm9wcyhtLCBmaW5kZXIuZmlsdGVyLmJ5Py5bMF0gfHwgW10pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSBcInByb3RvdHlwZXNcIjoge1xyXG4gICAgICAgIGlmIChmaW5kZXIuZmlsdGVyLmJ5Py5bMV0/Lmxlbmd0aCkge1xyXG4gICAgICAgICAgZm91bmQgPSB3cmFwRmlsdGVyKChtKSA9PiBjaGVja01vZHVsZVByb3RvdHlwZXMobSwgZmluZGVyLmZpbHRlci5ieT8uWzBdIHx8IFtdKSAmJiBjaGVja01vZHVsZVByb3RvdHlwZXMobSwgZmluZGVyLmZpbHRlci5ieT8uWzFdIHx8IFtdLCB0cnVlKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGZvdW5kID0gd3JhcEZpbHRlcigobSkgPT4gY2hlY2tNb2R1bGVQcm90b3R5cGVzKG0sIGZpbmRlci5maWx0ZXIuYnk/LlswXSB8fCBbXSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlIFwic3RyaW5nc1wiOiB7XHJcbiAgICAgICAgaWYgKGZpbmRlci5maWx0ZXIuYnk/LlsxXT8ubGVuZ3RoKSB7XHJcbiAgICAgICAgICBmb3VuZCA9IHdyYXBGaWx0ZXIoKG0pID0+IGNoZWNrTW9kdWxlU3RyaW5ncyhtLCBmaW5kZXIuZmlsdGVyLmJ5Py5bMF0gfHwgW10pICYmIGNoZWNrTW9kdWxlU3RyaW5ncyhtLCBmaW5kZXIuZmlsdGVyLmJ5Py5bMV0gfHwgW10sIHRydWUpKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZm91bmQgPSB3cmFwRmlsdGVyKChtKSA9PiBjaGVja01vZHVsZVN0cmluZ3MobSwgZmluZGVyLmZpbHRlci5ieT8uWzBdIHx8IFtdKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBmb3VuZDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRlck1hcChfX29yaWdpbmFsX18sIG1hcCkge1xyXG4gIGxldCBfX21hcHBlZF9fID0ge307XHJcblxyXG4gIGxldCB0ZW1wID0ge1xyXG4gICAgX19vcmlnaW5hbF9fLFxyXG4gICAgX19tYXBwZWRfXyxcclxuICAgIC4uLl9fb3JpZ2luYWxfX1xyXG4gIH07XHJcblxyXG4gIE9iamVjdC5lbnRyaWVzKG1hcCkuZm9yRWFjaCgoW2tleSwgc3RyaW5nc10pID0+IHtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0ZW1wLCBrZXksIHtcclxuICAgICAgZ2V0KCkge1xyXG4gICAgICAgIGlmIChfX21hcHBlZF9fW2tleV0pIHJldHVybiBfX29yaWdpbmFsX19bX19tYXBwZWRfX1trZXldXTtcclxuXHJcbiAgICAgICAgbGV0IGZvdW5kRnVuYyA9IGZpbmRlckZpbmRGdW5jdGlvbihPYmplY3QuZW50cmllcyhfX29yaWdpbmFsX18gfHwge30pLCBtYXBba2V5XSB8fCBbXSk7XHJcbiAgICAgICAgaWYgKCFmb3VuZEZ1bmM/Lmxlbmd0aCkgcmV0dXJuO1xyXG5cclxuICAgICAgICBfX21hcHBlZF9fW2tleV0gPSBmb3VuZEZ1bmNbMF07XHJcbiAgICAgICAgcmV0dXJuIGZvdW5kRnVuY1sxXTtcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIHRlbXA7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBmaW5kQnlGaW5kZXIocmVxLCBmaW5kZXIgPSB7fSkge1xyXG4gIGNvbnN0IGRlZmF1bHRFeHBvcnQgPSAhIWZpbmRlcj8uZmlsdGVyPy5leHBvcnQ7XHJcbiAgbGV0IGZvdW5kID0gZmluZChyZXEsIGZpbmRlclRvRmlsdGVyKGZpbmRlciksIHsgZGVmYXVsdEV4cG9ydCwgYWxsOiB0cnVlIH0pLmZpbmQoaSA9PiBpICE9PSBnbG9iYWxUaGlzLndpbmRvdyB8fCBpPy5leHBvcnRzICE9PSBnbG9iYWxUaGlzLndpbmRvdyk7XHJcblxyXG4gIGlmICghZm91bmQpIHJldHVybiBudWxsO1xyXG5cclxuICBpZiAoZmluZGVyLnBhdGg/LmJlZm9yZSkgZm91bmQgPSAoQXJyYXkuaXNBcnJheShmaW5kZXIucGF0aC5iZWZvcmUpID8gZmluZGVyLnBhdGguYmVmb3JlLm1hcChpID0+IF8uZ2V0KGZvdW5kLCBpKSkuZmluZChpID0+IGkpIDogXy5nZXQoZm91bmQsIGZpbmRlci5wYXRoLmJlZm9yZSkpIHx8IGZvdW5kO1xyXG4gIGlmIChmaW5kZXIuYXNzaWduKSBmb3VuZCA9IE9iamVjdC5hc3NpZ24oe30sIGZvdW5kKTtcclxuXHJcbiAgaWYgKCFmb3VuZCkgcmV0dXJuIG51bGw7XHJcblxyXG4gIGlmIChmaW5kZXIubWFwKSBmb3VuZCA9IGZpbmRlck1hcChmb3VuZCwgZmluZGVyLm1hcCk7XHJcblxyXG4gIGlmIChmaW5kZXIucGF0aD8uYWZ0ZXIpIGZvdW5kID0gKEFycmF5LmlzQXJyYXkoZmluZGVyLnBhdGguYWZ0ZXIpID8gZmluZGVyLnBhdGguYWZ0ZXIubWFwKGkgPT4gXy5nZXQoZm91bmQsIGkpKS5maW5kKGkgPT4gaSkgOiBfLmdldChmb3VuZCwgZmluZGVyLnBhdGguYWZ0ZXIpKSB8fCBmb3VuZDtcclxuXHJcbiAgcmV0dXJuIGZvdW5kO1xyXG59XHJcblxyXG5cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsYXp5RmluZEJ5RmluZGVyKGZpbmRlciA9IHt9KSB7XHJcbiAgbGV0IGZvdW5kID0gYXdhaXQgbGF6eUZpbmQoZmluZGVyVG9GaWx0ZXIoZmluZGVyKSwgeyBzZWFyY2hFeHBvcnRzOiBmYWxzZSB9KTtcclxuXHJcbiAgaWYgKCFmb3VuZCkgcmV0dXJuIG51bGw7XHJcblxyXG4gIGlmIChmaW5kZXIucGF0aD8uYmVmb3JlKSBmb3VuZCA9IChBcnJheS5pc0FycmF5KGZpbmRlci5wYXRoLmJlZm9yZSkgPyBmaW5kZXIucGF0aC5iZWZvcmUubWFwKGkgPT4gXy5nZXQoZm91bmQsIGkpKS5maW5kKGkgPT4gaSkgOiBfLmdldChmb3VuZCwgZmluZGVyLnBhdGguYmVmb3JlKSkgfHwgZm91bmQ7XHJcbiAgaWYgKGZpbmRlci5hc3NpZ24pIGZvdW5kID0gT2JqZWN0LmFzc2lnbih7fSwgZm91bmQpO1xyXG5cclxuICBpZiAoIWZvdW5kKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgaWYgKGZpbmRlci5tYXApIGZvdW5kID0gZmluZGVyTWFwKGZvdW5kLCBmaW5kZXIubWFwKTtcclxuXHJcbiAgaWYgKGZpbmRlci5wYXRoPy5hZnRlcikgZm91bmQgPSAoQXJyYXkuaXNBcnJheShmaW5kZXIucGF0aC5hZnRlcikgPyBmaW5kZXIucGF0aC5hZnRlci5tYXAoaSA9PiBfLmdldChmb3VuZCwgaSkpLmZpbmQoaSA9PiBpKSA6IF8uZ2V0KGZvdW5kLCBmaW5kZXIucGF0aC5hZnRlcikpIHx8IGZvdW5kO1xyXG5cclxuICByZXR1cm4gZm91bmQ7XHJcbn0iLCAiaW1wb3J0ICogYXMgY29tcGxleEZpbmRlciBmcm9tIFwiLi9yYXcvY29tcGxleC1maW5kZXIuanNcIjtcclxuXHJcbmNvbnN0IGRlZmF1bHRCZWZvcmUgPSBbXHJcbiAgXCJleHBvcnRzLlpcIixcclxuICBcImV4cG9ydHMuWlBcIixcclxuICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gIFwiZXhwb3J0c1wiXHJcbl07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgX19jYWNoZV9fOiB7fSxcclxuICBnZXQgcmVxdWlyZSgpIHtcclxuICAgIGlmICh0aGlzLl9fY2FjaGVfXy5yZXF1aXJlKSByZXR1cm4gdGhpcy5fX2NhY2hlX18ucmVxdWlyZTtcclxuICAgIGxldCByZXFJZCA9IGBBY29yZFdlYnBhY2tNb2R1bGVzJHtEYXRlLm5vdygpfWA7XHJcbiAgICBjb25zdCByZXEgPSB3aW5kb3cud2VicGFja0NodW5rZGlzY29yZF9hcHAucHVzaChbW3JlcUlkXSwge30sIHJlcSA9PiByZXFdKTtcclxuICAgIGRlbGV0ZSByZXEubVtyZXFJZF07XHJcbiAgICBkZWxldGUgcmVxLmNbcmVxSWRdO1xyXG4gICAgd2luZG93LndlYnBhY2tDaHVua2Rpc2NvcmRfYXBwLnBvcCgpO1xyXG4gICAgdGhpcy5fX2NhY2hlX18ucmVxdWlyZSA9IHJlcTtcclxuICAgIHJldHVybiByZXE7XHJcbiAgfSxcclxuICBmaW5kKGZpbHRlciwgY29uZmlnID0ge30pIHtcclxuICAgIHJldHVybiBjb21wbGV4RmluZGVyLmZpbmQodGhpcy5yZXF1aXJlLCBjb21wbGV4RmluZGVyLndyYXBGaWx0ZXIoZmlsdGVyKSwgY29uZmlnKTtcclxuICB9LFxyXG4gIGxhenlGaW5kKGZpbHRlciwgY29uZmlnID0ge30pIHtcclxuICAgIHJldHVybiBjb21wbGV4RmluZGVyLmxhenlGaW5kKGNvbXBsZXhGaW5kZXIud3JhcEZpbHRlcihmaWx0ZXIpLCBjb25maWcpO1xyXG4gIH0sXHJcbiAgbGF6eUZpbmRCeUZpbmRlcihmaW5kZXIpIHtcclxuICAgIHJldHVybiBjb21wbGV4RmluZGVyLmxhenlGaW5kQnlGaW5kZXIoZmluZGVyKTtcclxuICB9LFxyXG4gIGZpbHRlcihmaWx0ZXIsIGNvbmZpZyA9IHt9KSB7XHJcbiAgICByZXR1cm4gY29tcGxleEZpbmRlci5maW5kKHRoaXMucmVxdWlyZSwgY29tcGxleEZpbmRlci53cmFwRmlsdGVyKGZpbHRlciksIHsgLi4uY29uZmlnLCBhbGw6IHRydWUgfSk7XHJcbiAgfSxcclxuICBmaW5kQnlGaW5kZXIoZmluZGVyKSB7XHJcbiAgICByZXR1cm4gY29tcGxleEZpbmRlci5maW5kQnlGaW5kZXIodGhpcy5yZXF1aXJlLCBmaW5kZXIpO1xyXG4gIH0sXHJcbiAgZmluZEJ5U3RyaW5nVmFsdWVzKC4uLnN0cmluZ1ZhbHVlcykge1xyXG4gICAgcmV0dXJuIHRoaXMuZmluZCgoYSkgPT4geyBsZXQgdmEgPSBPYmplY3QudmFsdWVzKGEpOyByZXR1cm4gc3RyaW5nVmFsdWVzLmV2ZXJ5KHggPT4gdmEuc29tZSh5ID0+IHR5cGVvZiB5ID09IFwic3RyaW5nXCIgJiYgeS5pbmNsdWRlcyh4KSkpIH0pPy5leHBvcnRzO1xyXG4gIH0sXHJcbiAgZmluZEJ5UHJvcGVydGllcyguLi5wcm9wcykge1xyXG4gICAgcmV0dXJuIHRoaXMuZmluZEJ5RmluZGVyKHtcclxuICAgICAgZmlsdGVyOiB7XHJcbiAgICAgICAgZXhwb3J0OiBmYWxzZSxcclxuICAgICAgICBpbjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgYnk6IFtwcm9wc11cclxuICAgICAgfSxcclxuICAgICAgcGF0aDoge1xyXG4gICAgICAgIGJlZm9yZTogZGVmYXVsdEJlZm9yZVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9LFxyXG4gIGZpbmRCeVByb3RvdHlwZXMoLi4ucHJvcHMpIHtcclxuICAgIHJldHVybiB0aGlzLmZpbmRCeUZpbmRlcih7XHJcbiAgICAgIGZpbHRlcjoge1xyXG4gICAgICAgIGV4cG9ydDogZmFsc2UsXHJcbiAgICAgICAgaW46IFwicHJvdG90eXBlc1wiLFxyXG4gICAgICAgIGJ5OiBbcHJvcHNdXHJcbiAgICAgIH0sXHJcbiAgICAgIHBhdGg6IHtcclxuICAgICAgICBiZWZvcmU6IGRlZmF1bHRCZWZvcmVcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSxcclxuICBmaW5kQnlTdHJpbmdzKC4uLnByb3BzKSB7XHJcbiAgICByZXR1cm4gdGhpcy5maW5kQnlGaW5kZXIoe1xyXG4gICAgICBmaWx0ZXI6IHtcclxuICAgICAgICBleHBvcnQ6IGZhbHNlLFxyXG4gICAgICAgIGluOiBcInN0cmluZ3NcIixcclxuICAgICAgICBieTogW3Byb3BzXVxyXG4gICAgICB9LFxyXG4gICAgICBwYXRoOiB7XHJcbiAgICAgICAgYmVmb3JlOiBkZWZhdWx0QmVmb3JlXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0sXHJcbn07IiwgImltcG9ydCBjb21tb25EYXRhIGZyb20gJy4uLy4uL2RhdGEvY29tbW9uLmpzb24nO1xyXG5pbXBvcnQgd2VicGFjayBmcm9tICcuL3dlYnBhY2suanMnO1xyXG5cclxuXHJcbmZ1bmN0aW9uIG1hcE9iamVjdCh0ZW1wLCBpbnApIHtcclxuICBpZiAoIXRlbXA/Ll9fY2FjaGVfXykgdGVtcC5fX2NhY2hlX18gPSB7fTtcclxuICBmb3IgKGNvbnN0IGtleSBpbiBpbnApIHtcclxuICAgIGlmIChpbnA/LltrZXldPy5fXyA9PT0gdHJ1ZSkge1xyXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGVtcCwga2V5LCB7XHJcbiAgICAgICAgZ2V0KCkge1xyXG4gICAgICAgICAgaWYgKHRlbXAuX19jYWNoZV9fW2tleV0pIHJldHVybiB0ZW1wLl9fY2FjaGVfX1trZXldO1xyXG4gICAgICAgICAgcmV0dXJuIHRlbXAuX19jYWNoZV9fW2tleV0gPSB3ZWJwYWNrLmZpbmRCeUZpbmRlcihpbnBba2V5XSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKHR5cGVvZiB0ZW1wW2tleV0gPT09IFwidW5kZWZpbmVkXCIpIHRlbXBba2V5XSA9IHt9O1xyXG4gICAgICBtYXBPYmplY3QodGVtcFtrZXldLCBpbnBba2V5XSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5cclxubGV0IGNvbW1vbiA9IHtcclxuICBfX2NhY2hlX186IHt9LFxyXG4gIExheWVyQWN0aW9uczoge1xyXG4gICAgcHVzaChjb21wb25lbnQpIHtcclxuICAgICAgY29tbW9uLkZsdXhEaXNwYXRjaGVyLmRpc3BhdGNoKHtcclxuICAgICAgICB0eXBlOiBcIkxBWUVSX1BVU0hcIixcclxuICAgICAgICBjb21wb25lbnRcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgcG9wKCkge1xyXG4gICAgICBjb21tb24uRmx1eERpc3BhdGNoZXIuZGlzcGF0Y2goe1xyXG4gICAgICAgIHR5cGU6IFwiTEFZRVJfUE9QXCJcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgcG9wQWxsKCkge1xyXG4gICAgICBjb21tb24uRmx1eERpc3BhdGNoZXIuZGlzcGF0Y2goe1xyXG4gICAgICAgIHR5cGU6IFwiTEFZRVJfUE9QX0FMTFwiXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0sXHJcbn07XHJcbm1hcE9iamVjdChjb21tb24sIGNvbW1vbkRhdGEuY29tbW9uKTtcclxue1xyXG4gIGxldCBwYXRocyA9IFtcclxuICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICBcImV4cG9ydHMuWlBcIixcclxuICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICBcImV4cG9ydHNcIlxyXG4gIF07XHJcbiAgd2VicGFjay5maWx0ZXIoKGkpID0+IGk/LmdldE5hbWU/LigpPy5lbmRzV2l0aD8uKFwiU3RvcmVcIiksIHsgZGVmYXVsdEV4cG9ydDogZmFsc2UgfSkuZm9yRWFjaCgobSkgPT4ge1xyXG4gICAgbGV0IG9iaiA9IHBhdGhzLm1hcChwYXRoID0+IF8uZ2V0KG0sIHBhdGgpKS5maW5kKGkgPT4gaSk7XHJcbiAgICBpZiAoIW9iaikgcmV0dXJuO1xyXG4gICAgbGV0IG5hbWUgPSBvYmo/LmdldE5hbWU/LigpO1xyXG4gICAgaWYgKCFuYW1lKSByZXR1cm47XHJcbiAgICBpZiAoY29tbW9uW25hbWVdKSByZXR1cm47XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvbW1vbiwgbmFtZSwge1xyXG4gICAgICBnZXQoKSB7XHJcbiAgICAgICAgaWYgKGNvbW1vbi5fX2NhY2hlX19bbmFtZV0pIHJldHVybiBjb21tb24uX19jYWNoZV9fW25hbWVdO1xyXG4gICAgICAgIHJldHVybiBjb21tb24uX19jYWNoZV9fW25hbWVdID0gb2JqO1xyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbW1vbjsiLCAiaW1wb3J0IGNvbW1vbiBmcm9tIFwiLi9jb21tb24uanNcIjtcclxuaW1wb3J0IHdlYnBhY2sgZnJvbSBcIi4vd2VicGFjay5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGNvbW1vbixcclxuICB3ZWJwYWNrLFxyXG4gIHJlcXVpcmU6IGdsb2JhbFRoaXNbXCI8UFJFTE9BRF9LRVk+XCJdLnJlcXVpcmUsXHJcbiAgbmF0aXZlOiBEaXNjb3JkTmF0aXZlLFxyXG59IiwgImltcG9ydCBtb2R1bGVzIGZyb20gXCIuLi9hcGkvbW9kdWxlcy9pbmRleC5qc1wiO1xyXG5cclxubGV0IGlzQ29ubmVjdGlvbk9wZW4gPSBmYWxzZTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB3YWl0VW50aWxDb25uZWN0aW9uT3BlbigpIHtcclxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuICAgIGlmIChpc0Nvbm5lY3Rpb25PcGVuKSByZXR1cm4gcmVzb2x2ZSh0cnVlKTtcclxuICAgIGZ1bmN0aW9uIG9uRXZlbnQoKSB7XHJcbiAgICAgIG1vZHVsZXMuY29tbW9uLkZsdXhEaXNwYXRjaGVyLnVuc3Vic2NyaWJlKFwiQ09OTkVDVElPTl9PUEVOXCIsIG9uRXZlbnQpO1xyXG4gICAgICBpc0Nvbm5lY3Rpb25PcGVuID0gdHJ1ZTtcclxuICAgICAgcmVzb2x2ZSh0cnVlKTtcclxuICAgIH1cclxuICAgIG1vZHVsZXMuY29tbW9uLkZsdXhEaXNwYXRjaGVyLnN1YnNjcmliZShcIkNPTk5FQ1RJT05fT1BFTlwiLCBvbkV2ZW50KTtcclxuICB9KTtcclxufSIsICJleHBvcnQgY2xhc3MgQmFzaWNFdmVudEVtaXR0ZXIge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgLyoqIEB0eXBlIHtNYXA8c3RyaW5nLCBNYXA8KC4uLmFyZ3M6IGFueVtdKT0+dm9pZCwge29uY2U6IGJvb2xlYW59Pj59ICovXHJcbiAgICB0aGlzLmxpc3RlbmVycyA9IG5ldyBNYXAoKTtcclxuICB9XHJcblxyXG4gIF9wcmVwYXJlTGlzdGVuZXJzTWFwKGV2ZW50TmFtZSkge1xyXG4gICAgaWYgKCF0aGlzLmxpc3RlbmVycy5oYXMoZXZlbnROYW1lKSlcclxuICAgICAgdGhpcy5saXN0ZW5lcnMuc2V0KGV2ZW50TmFtZSwgbmV3IE1hcCgpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudE5hbWVcclxuICAgKiBAcGFyYW0geyguLi5hcmdzOiBhbnlbXSk9PnZvaWR9IGxpc3RlbmVyXHJcbiAgICovXHJcbiAgb24oZXZlbnROYW1lLCBsaXN0ZW5lcikge1xyXG4gICAgdGhpcy5fcHJlcGFyZUxpc3RlbmVyc01hcChldmVudE5hbWUpO1xyXG4gICAgdGhpcy5saXN0ZW5lcnMuZ2V0KGV2ZW50TmFtZSkuc2V0KGxpc3RlbmVyLCB7IG9uY2U6IGZhbHNlIH0pO1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgdGhpcy5saXN0ZW5lcnMuZ2V0KGV2ZW50TmFtZSkuZGVsZXRlKGxpc3RlbmVyKTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnROYW1lXHJcbiAgICogQHBhcmFtIHsoLi4uYXJnczogYW55W10pPT52b2lkfSBsaXN0ZW5lclxyXG4gICAqL1xyXG4gIG9uY2UoZXZlbnROYW1lLCBsaXN0ZW5lcikge1xyXG4gICAgdGhpcy5fcHJlcGFyZUxpc3RlbmVyc01hcChldmVudE5hbWUpO1xyXG4gICAgdGhpcy5saXN0ZW5lcnMuZ2V0KGV2ZW50TmFtZSk/LnNldChsaXN0ZW5lciwgeyBvbmNlOiB0cnVlIH0pO1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgdGhpcy5saXN0ZW5lcnMuZ2V0KGV2ZW50TmFtZSkuZGVsZXRlKGxpc3RlbmVyKTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge3N0cmluZz99IGV2ZW50TmFtZVxyXG4gICAqIEBwYXJhbSB7KCguLi5hcmdzOiBhbnlbXSk9PnZvaWQpP30gbGlzdGVuZXJcclxuICAgKi9cclxuICBvZmYoZXZlbnROYW1lLCBsaXN0ZW5lcikge1xyXG4gICAgaWYgKCFldmVudE5hbWUpIHJldHVybiAodGhpcy5saXN0ZW5lcnMgPSBuZXcgTWFwKCkpO1xyXG4gICAgaWYgKCFsaXN0ZW5lcikgcmV0dXJuIHRoaXMubGlzdGVuZXJzPy5kZWxldGUoZXZlbnROYW1lKTtcclxuICAgIHRoaXMubGlzdGVuZXJzLmdldChldmVudE5hbWUpPy5kZWxldGUobGlzdGVuZXIpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50TmFtZVxyXG4gICAqIEBwYXJhbSAgey4uLmFueX0gYXJnc1xyXG4gICAqL1xyXG4gIGVtaXQoZXZlbnROYW1lLCAuLi5hcmdzKSB7XHJcbiAgICBpZiAoIXRoaXMubGlzdGVuZXJzLmhhcyhldmVudE5hbWUpKSByZXR1cm47XHJcbiAgICBsZXQgZXZlbnRNYXAgPSB0aGlzLmxpc3RlbmVycy5nZXQoZXZlbnROYW1lKTtcclxuICAgIGV2ZW50TWFwLmZvckVhY2goKHsgb25jZSB9LCBsaXN0ZW5lcikgPT4ge1xyXG4gICAgICBpZiAob25jZSkgZXZlbnRNYXA/LmRlbGV0ZShsaXN0ZW5lcik7XHJcbiAgICAgIGxpc3RlbmVyKC4uLmFyZ3MpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59O1xyXG4iLCAiaW1wb3J0IHsgQmFzaWNFdmVudEVtaXR0ZXIgfSBmcm9tIFwiLi4vLi4vbGliL0Jhc2ljRXZlbnRFbWl0dGVyLmpzXCI7XHJcblxyXG5jb25zdCBldmVudHMgPSBuZXcgQmFzaWNFdmVudEVtaXR0ZXIoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGV2ZW50czsiLCAiaW1wb3J0IGV2ZW50cyBmcm9tIFwiLi4vZXZlbnRzXCI7XHJcbmltcG9ydCB3ZWJwYWNrIGZyb20gXCIuLi9tb2R1bGVzL3dlYnBhY2suanNcIjtcclxuXHJcbmNvbnN0IHNjcm9sbGJhckNsYXNzZXMgPSB3ZWJwYWNrLmZpbmRCeVByb3BlcnRpZXMoXCJzY3JvbGxiYXJHaG9zdEhhaXJsaW5lXCIsIFwic3Bpbm5lclwiKTtcclxuXHJcbmNvbnN0IGZvcm1hdFJlZ2V4ZXMgPSB7XHJcbiAgYm9sZDogL1xcKlxcKihbXipdKylcXCpcXCovZyxcclxuICBpdGFsaWM6IC9cXCooW14qXSspXFwqL2csXHJcbiAgdW5kZXJsaW5lOiAvXFxfKFteKl0rKVxcXy9nLFxyXG4gIHN0cmlrZTogL1xcflxcfihbXipdKylcXH5cXH4vZyxcclxuICB1cmw6IC8oXFxiKGh0dHBzP3xmdHB8ZmlsZSk6XFwvXFwvWy1BLVowLTkrJkAjXFwvJT89fl98ITosLjtdKlstQS1aMC05KyZAI1xcLyU9fl98XSkvaWcsXHJcbiAgaW5saW5lOiAvXFxgKFteKl0rKVxcYC9nLFxyXG4gIGNvZGVibG9ja1NpbmdsZTogL1xcYFxcYFxcYChbXipdKylcXGBcXGBcXGAvZyxcclxuICBjb2RlYmxvY2tNdWx0aTogL1xcYFxcYFxcYChcXHcrKVxcbigoPzooPyFcXGBcXGBcXGApW1xcc1xcU10pKilcXGBcXGBcXGAvZ1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIHBhcnNlKGh0bWwpIHtcclxuICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgZGl2LmlubmVySFRNTCA9IGh0bWw7XHJcbiAgICByZXR1cm4gZGl2LmZpcnN0RWxlbWVudENoaWxkO1xyXG4gIH0sXHJcbiAgdG9DU1NQcm9wKG8pIHtcclxuICAgIGxldCBlbG0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgT2JqZWN0LmVudHJpZXMobykuZm9yRWFjaCgoaSkgPT4ge1xyXG4gICAgICBpZiAoZWxtLnN0eWxlLmhhc093blByb3BlcnR5KGlbMF0pKSB7XHJcbiAgICAgICAgZWxtLnN0eWxlW2lbMF1dID0gaVsxXTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBlbG0uc3R5bGUuc2V0UHJvcGVydHkoaVswXSwgaVsxXSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGVsbS5nZXRBdHRyaWJ1dGUoXCJzdHlsZVwiKTtcclxuICB9LFxyXG4gIHRvSFRNTFByb3BzKG8pIHtcclxuICAgIHJldHVybiBPYmplY3QuZW50cmllcyhvKVxyXG4gICAgICAubWFwKFxyXG4gICAgICAgIChpKSA9PlxyXG4gICAgICAgICAgYCR7aVswXS5yZXBsYWNlKC8gKy8sIFwiLVwiKX09XCIke2lbMF0gPT0gXCJzdHlsZVwiICYmIHR5cGVvZiBpWzFdICE9IFwic3RyaW5nXCJcclxuICAgICAgICAgICAgPyB0aGlzLnRvQ1NTUHJvcChpWzFdKVxyXG4gICAgICAgICAgICA6IHRoaXMuZXNjYXBlSFRNTChpWzFdKX1cImBcclxuICAgICAgKVxyXG4gICAgICAuam9pbihcIiBcIik7XHJcbiAgfSxcclxuICBlc2NhcGUoaHRtbCkge1xyXG4gICAgcmV0dXJuIG5ldyBPcHRpb24oaHRtbCkuaW5uZXJIVE1MO1xyXG4gIH0sXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtFbGVtZW50fSBlbG0gXHJcbiAgICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBzZWxlY3Rvck9yTnVtYmVyIFxyXG4gICAqIEByZXR1cm5zIHtFbGVtZW50W119XHJcbiAgICovXHJcbiAgcGFyZW50cyhlbG0sIHNlbGVjdG9yT3JOdW1iZXIpIHtcclxuICAgIGxldCBwYXJlbnRzID0gW107XHJcbiAgICBpZiAodHlwZW9mIHNlbGVjdG9yT3JOdW1iZXIgPT09IFwibnVtYmVyXCIpIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWxlY3Rvck9yTnVtYmVyOyBpKyspIHtcclxuICAgICAgICBpZiAoZWxtLnBhcmVudEVsZW1lbnQpIHtcclxuICAgICAgICAgIGVsbSA9IGVsbS5wYXJlbnRFbGVtZW50O1xyXG4gICAgICAgICAgcGFyZW50cy5wdXNoKGVsbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB3aGlsZSAoZWxtLnBhcmVudEVsZW1lbnQgJiYgZWxtLnBhcmVudEVsZW1lbnQuY2xvc2VzdChzZWxlY3Rvck9yTnVtYmVyKSkge1xyXG4gICAgICAgIGVsbSA9IGVsbS5wYXJlbnRFbGVtZW50LmNsb3Nlc3Qoc2VsZWN0b3JPck51bWJlcik7XHJcbiAgICAgICAgcGFyZW50cy5wdXNoKGVsbSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBwYXJlbnRzO1xyXG4gIH0sXHJcbiAgLyoqXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yIFxyXG4gICAqIEBwYXJhbSB7KGVsZW1lbnQ6IEhUTUxEaXZFbGVtZW50KT0+KCgpPT52b2lkKX0gY2IgXHJcbiAgICogQHJldHVybnMgeygpPT52b2lkfVxyXG4gICAqL1xyXG4gIHBhdGNoOiAoc2VsZWN0b3IsIGNiKSA9PlxyXG4gICAgKCgpID0+IHtcclxuICAgICAgZnVuY3Rpb24gbm9kZUFkZGVkKG5vZGUpIHtcclxuICAgICAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5URVhUX05PREUpIHJldHVybjtcclxuICAgICAgICBub2RlLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpLmZvckVhY2goYXN5bmMgKGVsbSkgPT4ge1xyXG4gICAgICAgICAgaWYgKCFlbG0uYWNvcmQpIHtcclxuICAgICAgICAgICAgZWxtLmFjb3JkID0geyB1bm1vdW50OiBbXSwgcGF0Y2hlZDogbmV3IFNldCgpIH07XHJcbiAgICAgICAgICAgIGVsbS5jbGFzc0xpc3QuYWRkKFwiYWNvcmQtLXBhdGNoZWRcIik7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGVsbS5hY29yZC5wYXRjaGVkLmhhcyhjYikpIHJldHVybjtcclxuICAgICAgICAgIGVsbS5hY29yZC5wYXRjaGVkLmFkZChjYik7XHJcblxyXG4gICAgICAgICAgbGV0IHVuUGF0Y2hDYiA9IGF3YWl0IGNiKGVsbSk7XHJcbiAgICAgICAgICBpZiAodHlwZW9mIHVuUGF0Y2hDYiA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgICAgICBlbG0uYWNvcmQudW5tb3VudC5wdXNoKHVuUGF0Y2hDYik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGZ1bmN0aW9uIG5vZGVSZW1vdmVkKG5vZGUpIHtcclxuICAgICAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5URVhUX05PREUpIHJldHVybjtcclxuICAgICAgICBub2RlLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpLmZvckVhY2goYXN5bmMgKGVsbSkgPT4ge1xyXG4gICAgICAgICAgaWYgKCFlbG0uYWNvcmQpIHJldHVybjtcclxuICAgICAgICAgIGVsbS5hY29yZC51bm1vdW50LmZvckVhY2goKGYpID0+IGYoKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpLmZvckVhY2gobm9kZUFkZGVkKTtcclxuXHJcbiAgICAgIHJldHVybiBldmVudHMub24oXHJcbiAgICAgICAgXCJkb20tbXV0YXRpb25cIixcclxuICAgICAgICAvKiogQHBhcmFtIHtNdXRhdGlvblJlY29yZH0gbXV0ICovKG11dCkgPT4ge1xyXG4gICAgICAgICAgaWYgKG11dC50eXBlID09PSBcImNoaWxkTGlzdFwiKSB7XHJcbiAgICAgICAgICAgIG11dC5hZGRlZE5vZGVzLmZvckVhY2gobm9kZUFkZGVkKTtcclxuICAgICAgICAgICAgbXV0LnJlbW92ZWROb2Rlcy5mb3JFYWNoKG5vZGVSZW1vdmVkKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICk7XHJcbiAgICB9KSgpLFxyXG4gIGZvcm1hdENvbnRlbnQobXNnKSB7XHJcbiAgICBpZiAoIW1zZykgcmV0dXJuICcnO1xyXG4gICAgY29uc3QgeyBib2xkLCBpdGFsaWMsIHVuZGVybGluZSwgc3RyaWtlLCBjb2RlYmxvY2tNdWx0aSwgY29kZWJsb2NrU2luZ2xlLCBpbmxpbmUsIHVybCB9ID0gZm9ybWF0UmVnZXhlcztcclxuXHJcbiAgICBjb25zdCBjb2RlQmxvY2tzTWFwID0gT2JqZWN0LmZyb21FbnRyaWVzKFtcclxuICAgICAgLi4uKG1zZy5tYXRjaEFsbChjb2RlYmxvY2tNdWx0aSkgfHwgW10pLCAuLi4obXNnLm1hdGNoQWxsKGNvZGVibG9ja1NpbmdsZSkgfHwgW10pXHJcbiAgICBdLm1hcChcclxuICAgICAgKFtfLCBjb2RlQmxvY2tPckNvZGUsIGNvZGVCbG9ja0NvbnRlbnRdLCBpKSA9PiB7XHJcbiAgICAgICAgbXNnID0gbXNnLnJlcGxhY2UoXywgYHt7Q09ERUJMT0NLXyR7aX19fWApO1xyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICBge3tDT0RFQkxPQ0tfJHtpfX19YCxcclxuICAgICAgICAgIGNvZGVCbG9ja0NvbnRlbnQgP1xyXG4gICAgICAgICAgICBgPHByZT48Y29kZSBjbGFzcz1cIiR7c2Nyb2xsYmFyQ2xhc3Nlcy5zY3JvbGxiYXJHaG9zdEhhaXJsaW5lfSBobGpzICR7Y29kZUJsb2NrT3JDb2RlfVwiIHN0eWxlPVwicG9zaXRpb246IHJlbGF0aXZlO1wiPiR7bW9kdWxlcy5jb21tb24uaGxqcy5oaWdobGlnaHQoY29kZUJsb2NrT3JDb2RlLCBjb2RlQmxvY2tDb250ZW50KS52YWx1ZX08L2NvZGU+PC9wcmU+YCA6XHJcbiAgICAgICAgICAgIGA8cHJlPjxjb2RlIGNsYXNzPVwiJHtzY3JvbGxiYXJDbGFzc2VzLnNjcm9sbGJhckdob3N0SGFpcmxpbmV9IGhsanNcIiBzdHlsZT1cInBvc2l0aW9uOiByZWxhdGl2ZTtcIj4ke2NvZGVCbG9ja09yQ29kZX08L2NvZGU+PC9wcmU+YFxyXG4gICAgICAgIF07XHJcbiAgICAgIH1cclxuICAgICkpO1xyXG5cclxuICAgIGNvbnN0IGlubGluZU1hcCA9IE9iamVjdC5mcm9tRW50cmllcyhcclxuICAgICAgWy4uLihtc2cubWF0Y2hBbGwoaW5saW5lKSB8fCBbXSldLm1hcChcclxuICAgICAgICAoW18sIGlubGluZUNvbnRlbnRdLCBpKSA9PiB7XHJcbiAgICAgICAgICBtc2cgPSBtc2cucmVwbGFjZShfLCBge3tJTkxJTkVfJHtpfX19YCk7XHJcbiAgICAgICAgICByZXR1cm4gW2B7e0lOTElORV8ke2l9fX1gLCBgPGNvZGUgY2xhc3M9XCJpbmxpbmVcIj4ke2lubGluZUNvbnRlbnR9PC9jb2RlPmBdO1xyXG4gICAgICAgIH1cclxuICAgICAgKVxyXG4gICAgKTtcclxuXHJcbiAgICBtc2cgPSBtc2cucmVwbGFjZShib2xkLCBcIjxiPiQxPC9iPlwiKVxyXG4gICAgICAucmVwbGFjZShpdGFsaWMsIFwiPGk+JDE8L2k+XCIpXHJcbiAgICAgIC5yZXBsYWNlKHVuZGVybGluZSwgXCI8VT4kMTwvVT5cIilcclxuICAgICAgLnJlcGxhY2Uoc3RyaWtlLCBcIjxzPiQxPC9zPlwiKVxyXG4gICAgICAucmVwbGFjZSh1cmwsICc8YSBocmVmPVwiJDFcIj4kMTwvYT4nKTtcclxuXHJcbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhjb2RlQmxvY2tzTWFwKSkge1xyXG4gICAgICBtc2cgPSBtc2cucmVwbGFjZShrZXksIHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhpbmxpbmVNYXApKSB7XHJcbiAgICAgIG1zZyA9IG1zZy5yZXBsYWNlKGtleSwgdmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBtc2c7XHJcbiAgfSxcclxuICByZXNvbHZlKGh0bWxPckVsbSkge1xyXG4gICAgaWYgKGh0bWxPckVsbSBpbnN0YW5jZW9mIEVsZW1lbnQpIHJldHVybiBodG1sT3JFbG07XHJcbiAgICByZXR1cm4gdGhpcy5wYXJzZShodG1sT3JFbG0pO1xyXG4gIH1cclxufVxyXG5cclxue1xyXG4gIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKG11dGF0aW9ucykgPT4ge1xyXG4gICAgbXV0YXRpb25zLmZvckVhY2goKG11dGF0aW9uKSA9PiB7XHJcbiAgICAgIGV2ZW50cy5lbWl0KFwiZG9tLW11dGF0aW9uXCIsIG11dGF0aW9uKTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG4gIG9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQsIHtcclxuICAgIGF0dHJpYnV0ZXM6IHRydWUsXHJcbiAgICBjaGlsZExpc3Q6IHRydWUsXHJcbiAgICBzdWJ0cmVlOiB0cnVlXHJcbiAgfSk7XHJcbn0iLCAiLy8gd2UgdXNlIHRoaXMgYXJyYXkgbXVsdGlwbGUgdGltZXNcclxuZXhwb3J0IGNvbnN0IHBhdGNoVHlwZXMgPSBbXCJhXCIsIFwiYlwiLCBcImlcIl07XHJcbmV4cG9ydCBjb25zdCBwYXRjaGVkT2JqZWN0cyA9IG5ldyBNYXAoKTtcclxuIiwgIi8vIGNhbGxzIHJlbGV2YW50IHBhdGNoZXMgYW5kIHJldHVybnMgdGhlIGZpbmFsIHJlc3VsdFxyXG5pbXBvcnQgeyBwYXRjaGVkT2JqZWN0cyB9IGZyb20gXCIuL3NoYXJlZC5qc1wiO1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoZnVuY05hbWUsIGZ1bmNQYXJlbnQsIGZ1bmNBcmdzLCBcclxuLy8gdGhlIHZhbHVlIG9mIGB0aGlzYCB0byBhcHBseVxyXG5jdHh0LCBcclxuLy8gaWYgdHJ1ZSwgdGhlIGZ1bmN0aW9uIGlzIGFjdHVhbGx5IGNvbnN0cnVjdG9yXHJcbmlzQ29uc3RydWN0KSB7XHJcbiAgICBjb25zdCBwYXRjaCA9IHBhdGNoZWRPYmplY3RzLmdldChmdW5jUGFyZW50KT8uW2Z1bmNOYW1lXTtcclxuICAgIC8vIFRoaXMgaXMgaW4gdGhlIGV2ZW50IHRoYXQgdGhpcyBmdW5jdGlvbiBpcyBiZWluZyBjYWxsZWQgYWZ0ZXIgYWxsIHBhdGNoZXMgYXJlIHJlbW92ZWQuXHJcbiAgICBpZiAoIXBhdGNoKVxyXG4gICAgICAgIHJldHVybiBpc0NvbnN0cnVjdFxyXG4gICAgICAgICAgICA/IFJlZmxlY3QuY29uc3RydWN0KGZ1bmNQYXJlbnRbZnVuY05hbWVdLCBmdW5jQXJncywgY3R4dClcclxuICAgICAgICAgICAgOiBmdW5jUGFyZW50W2Z1bmNOYW1lXS5hcHBseShjdHh0LCBmdW5jQXJncyk7XHJcbiAgICAvLyBCZWZvcmUgcGF0Y2hlc1xyXG4gICAgZm9yIChjb25zdCBob29rIG9mIHBhdGNoLmIudmFsdWVzKCkpIHtcclxuICAgICAgICBjb25zdCBtYXliZWZ1bmNBcmdzID0gaG9vay5jYWxsKGN0eHQsIGZ1bmNBcmdzKTtcclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShtYXliZWZ1bmNBcmdzKSlcclxuICAgICAgICAgICAgZnVuY0FyZ3MgPSBtYXliZWZ1bmNBcmdzO1xyXG4gICAgfVxyXG4gICAgLy8gSW5zdGVhZCBwYXRjaGVzXHJcbiAgICBsZXQgaW5zdGVhZFBhdGNoZWRGdW5jID0gKC4uLmFyZ3MpID0+IGlzQ29uc3RydWN0XHJcbiAgICAgICAgPyBSZWZsZWN0LmNvbnN0cnVjdChwYXRjaC5vLCBhcmdzLCBjdHh0KVxyXG4gICAgICAgIDogcGF0Y2guby5hcHBseShjdHh0LCBhcmdzKTtcclxuICAgIGZvciAoY29uc3QgY2FsbGJhY2sgb2YgcGF0Y2guaS52YWx1ZXMoKSkge1xyXG4gICAgICAgIGNvbnN0IG9sZFBhdGNoRnVuYyA9IGluc3RlYWRQYXRjaGVkRnVuYztcclxuICAgICAgICBpbnN0ZWFkUGF0Y2hlZEZ1bmMgPSAoLi4uYXJncykgPT4gY2FsbGJhY2suY2FsbChjdHh0LCBhcmdzLCBvbGRQYXRjaEZ1bmMpO1xyXG4gICAgfVxyXG4gICAgbGV0IHdvcmtpbmdSZXRWYWwgPSBpbnN0ZWFkUGF0Y2hlZEZ1bmMoLi4uZnVuY0FyZ3MpO1xyXG4gICAgLy8gQWZ0ZXIgcGF0Y2hlc1xyXG4gICAgZm9yIChjb25zdCBob29rIG9mIHBhdGNoLmEudmFsdWVzKCkpXHJcbiAgICAgICAgd29ya2luZ1JldFZhbCA9IGhvb2suY2FsbChjdHh0LCBmdW5jQXJncywgd29ya2luZ1JldFZhbCkgPz8gd29ya2luZ1JldFZhbDtcclxuICAgIHJldHVybiB3b3JraW5nUmV0VmFsO1xyXG59XHJcbiIsICJpbXBvcnQgeyBwYXRjaGVkT2JqZWN0cywgcGF0Y2hUeXBlcyB9IGZyb20gXCIuL3NoYXJlZC5qc1wiO1xyXG5leHBvcnQgZnVuY3Rpb24gdW5QYXRjaChmdW5jUGFyZW50LCBmdW5jTmFtZSwgaG9va0lkLCB0eXBlKSB7XHJcbiAgICBjb25zdCBwYXRjaGVkT2JqZWN0ID0gcGF0Y2hlZE9iamVjdHMuZ2V0KGZ1bmNQYXJlbnQpO1xyXG4gICAgY29uc3QgcGF0Y2ggPSBwYXRjaGVkT2JqZWN0Py5bZnVuY05hbWVdO1xyXG4gICAgaWYgKCFwYXRjaD8uW3R5cGVdLmhhcyhob29rSWQpKVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIHBhdGNoW3R5cGVdLmRlbGV0ZShob29rSWQpO1xyXG4gICAgLy8gSWYgdGhlcmUgYXJlIG5vIG1vcmUgaG9va3MgZm9yIGV2ZXJ5IHR5cGUsIHJlbW92ZSB0aGUgcGF0Y2hcclxuICAgIGlmIChwYXRjaFR5cGVzLmV2ZXJ5KCh0KSA9PiBwYXRjaFt0XS5zaXplID09PSAwKSkge1xyXG4gICAgICAgIC8vIHJlZmxlY3QgZGVmaW5lcHJvcGVydHkgaXMgbGlrZSBvYmplY3QgZGVmaW5lcHJvcGVydHlcclxuICAgICAgICAvLyBidXQgaW5zdGVhZCBvZiBlcnJvcmluZyBpdCByZXR1cm5zIGlmIGl0IHdvcmtlZCBvciBub3QuXHJcbiAgICAgICAgLy8gdGhpcyBpcyBtb3JlIGVhc2lseSBtaW5pZmlhYmxlLCBoZW5jZSBpdHMgdXNlLiAtLSBzaW5rXHJcbiAgICAgICAgY29uc3Qgc3VjY2VzcyA9IFJlZmxlY3QuZGVmaW5lUHJvcGVydHkoZnVuY1BhcmVudCwgZnVuY05hbWUsIHtcclxuICAgICAgICAgICAgdmFsdWU6IHBhdGNoLm8sXHJcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKCFzdWNjZXNzKVxyXG4gICAgICAgICAgICBmdW5jUGFyZW50W2Z1bmNOYW1lXSA9IHBhdGNoLm87XHJcbiAgICAgICAgZGVsZXRlIHBhdGNoZWRPYmplY3RbZnVuY05hbWVdO1xyXG4gICAgfVxyXG4gICAgaWYgKE9iamVjdC5rZXlzKHBhdGNoZWRPYmplY3QpLmxlbmd0aCA9PSAwKVxyXG4gICAgICAgIHBhdGNoZWRPYmplY3RzLmRlbGV0ZShmdW5jUGFyZW50KTtcclxuICAgIHJldHVybiB0cnVlO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiB1blBhdGNoQWxsKCkge1xyXG4gICAgZm9yIChjb25zdCBbcGFyZW50T2JqZWN0LCBwYXRjaGVkT2JqZWN0XSBvZiBwYXRjaGVkT2JqZWN0cy5lbnRyaWVzKCkpXHJcbiAgICAgICAgZm9yIChjb25zdCBmdW5jTmFtZSBpbiBwYXRjaGVkT2JqZWN0KVxyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGhvb2tUeXBlIG9mIHBhdGNoVHlwZXMpXHJcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGhvb2tJZCBvZiBwYXRjaGVkT2JqZWN0W2Z1bmNOYW1lXT8uW2hvb2tUeXBlXS5rZXlzKCkgPz8gW10pXHJcbiAgICAgICAgICAgICAgICAgICAgdW5QYXRjaChwYXJlbnRPYmplY3QsIGZ1bmNOYW1lLCBob29rSWQsIGhvb2tUeXBlKTtcclxufVxyXG4iLCAiLy8gY3VycmllZCAtIGdldFBhdGNoRnVuYyhcImJlZm9yZVwiKSguLi4pXHJcbi8vIGFsbG93cyB1cyB0byBhcHBseSBhbiBhcmd1bWVudCB3aGlsZSBsZWF2aW5nIHRoZSByZXN0IG9wZW4gbXVjaCBjbGVhbmVyLlxyXG4vLyBmdW5jdGlvbmFsIHByb2dyYW1taW5nIHN0cmlrZXMgYWdhaW4hIC0tIHNpbmtcclxuaW1wb3J0IGhvb2sgZnJvbSBcIi4vaG9vay5qc1wiO1xyXG5pbXBvcnQgeyBwYXRjaGVkT2JqZWN0cyB9IGZyb20gXCIuL3NoYXJlZC5qc1wiO1xyXG5pbXBvcnQgeyB1blBhdGNoIH0gZnJvbSBcIi4vdW4tcGF0Y2guanNcIjtcclxuLy8gY3JlYXRlcyBhIGhvb2sgaWYgbmVlZGVkLCBlbHNlIGp1c3QgYWRkcyBvbmUgdG8gdGhlIHBhdGNoZXMgYXJyYXlcclxuZXhwb3J0IGRlZmF1bHQgKHBhdGNoVHlwZSkgPT4gKGZ1bmNOYW1lLCBmdW5jUGFyZW50LCBjYWxsYmFjaywgb25lVGltZSA9IGZhbHNlKSA9PiB7XHJcbiAgICBpZiAodHlwZW9mIGZ1bmNQYXJlbnRbZnVuY05hbWVdICE9PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke2Z1bmNOYW1lfSBpcyBub3QgYSBmdW5jdGlvbiBpbiAke2Z1bmNQYXJlbnQuY29uc3RydWN0b3IubmFtZX1gKTtcclxuICAgIGlmICghcGF0Y2hlZE9iamVjdHMuaGFzKGZ1bmNQYXJlbnQpKVxyXG4gICAgICAgIHBhdGNoZWRPYmplY3RzLnNldChmdW5jUGFyZW50LCB7fSk7XHJcbiAgICBjb25zdCBwYXJlbnRJbmplY3Rpb25zID0gcGF0Y2hlZE9iamVjdHMuZ2V0KGZ1bmNQYXJlbnQpO1xyXG4gICAgaWYgKCFwYXJlbnRJbmplY3Rpb25zW2Z1bmNOYW1lXSkge1xyXG4gICAgICAgIGNvbnN0IG9yaWdGdW5jID0gZnVuY1BhcmVudFtmdW5jTmFtZV07XHJcbiAgICAgICAgLy8gbm90ZSB0byBmdXR1cmUgbWUgb3B0aW1pc2luZyBmb3Igc2l6ZTogZXh0cmFjdGluZyBuZXcgTWFwKCkgdG8gYSBmdW5jIGluY3JlYXNlcyBzaXplIC0tc2lua1xyXG4gICAgICAgIHBhcmVudEluamVjdGlvbnNbZnVuY05hbWVdID0ge1xyXG4gICAgICAgICAgICBvOiBvcmlnRnVuYyxcclxuICAgICAgICAgICAgYjogbmV3IE1hcCgpLFxyXG4gICAgICAgICAgICBpOiBuZXcgTWFwKCksXHJcbiAgICAgICAgICAgIGE6IG5ldyBNYXAoKSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IHJ1bkhvb2sgPSAoY3R4dCwgYXJncywgY29uc3RydWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJldCA9IGhvb2soZnVuY05hbWUsIGZ1bmNQYXJlbnQsIGFyZ3MsIGN0eHQsIGNvbnN0cnVjdCk7XHJcbiAgICAgICAgICAgIGlmIChvbmVUaW1lKVxyXG4gICAgICAgICAgICAgICAgdW5wYXRjaFRoaXNQYXRjaCgpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29uc3QgcmVwbGFjZVByb3h5ID0gbmV3IFByb3h5KG9yaWdGdW5jLCB7XHJcbiAgICAgICAgICAgIGFwcGx5OiAoXywgY3R4dCwgYXJncykgPT4gcnVuSG9vayhjdHh0LCBhcmdzLCBmYWxzZSksXHJcbiAgICAgICAgICAgIGNvbnN0cnVjdDogKF8sIGFyZ3MpID0+IHJ1bkhvb2sob3JpZ0Z1bmMsIGFyZ3MsIHRydWUpLFxyXG4gICAgICAgICAgICBnZXQ6ICh0YXJnZXQsIHByb3AsIHJlY2VpdmVyKSA9PiBwcm9wID09IFwidG9TdHJpbmdcIlxyXG4gICAgICAgICAgICAgICAgPyBvcmlnRnVuYy50b1N0cmluZy5iaW5kKG9yaWdGdW5jKVxyXG4gICAgICAgICAgICAgICAgOiBSZWZsZWN0LmdldCh0YXJnZXQsIHByb3AsIHJlY2VpdmVyKSxcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyB0aGlzIHdvcmtzIGFyb3VuZCBicmVha2luZyBzb21lIGFzeW5jIGZpbmQgaW1wbGVtZW50YXRpb24gd2hpY2ggbGlzdGVucyBmb3IgYXNzaWducyB2aWEgcHJveHlcclxuICAgICAgICAvLyBzZWUgY29tbWVudCBpbiB1bnBhdGNoLnRzXHJcbiAgICAgICAgY29uc3Qgc3VjY2VzcyA9IFJlZmxlY3QuZGVmaW5lUHJvcGVydHkoZnVuY1BhcmVudCwgZnVuY05hbWUsIHtcclxuICAgICAgICAgICAgdmFsdWU6IHJlcGxhY2VQcm94eSxcclxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoIXN1Y2Nlc3MpXHJcbiAgICAgICAgICAgIGZ1bmNQYXJlbnRbZnVuY05hbWVdID0gcmVwbGFjZVByb3h5O1xyXG4gICAgICAgIGZ1bmNQYXJlbnRbZnVuY05hbWVdLl9fb3JpZ2luYWxfXyA9IHBhcmVudEluamVjdGlvbnNbZnVuY05hbWVdLm87XHJcbiAgICB9XHJcbiAgICBjb25zdCBob29rSWQgPSBTeW1ib2woKTtcclxuICAgIGNvbnN0IHVucGF0Y2hUaGlzUGF0Y2ggPSAoKSA9PiB1blBhdGNoKGZ1bmNQYXJlbnQsIGZ1bmNOYW1lLCBob29rSWQsIHBhdGNoVHlwZSk7XHJcbiAgICBwYXJlbnRJbmplY3Rpb25zW2Z1bmNOYW1lXVtwYXRjaFR5cGVdLnNldChob29rSWQsIGNhbGxiYWNrKTtcclxuICAgIHJldHVybiB1bnBhdGNoVGhpc1BhdGNoO1xyXG59O1xyXG4iLCAiaW1wb3J0IGdldFBhdGNoRnVuYyBmcm9tIFwiLi9nZXQtcGF0Y2gtZnVuYy5qc1wiO1xyXG5pbXBvcnQgeyB1blBhdGNoQWxsIH0gZnJvbSBcIi4vdW4tcGF0Y2guanNcIjtcclxuaW1wb3J0IHsgcGF0Y2hlZE9iamVjdHMgYXMgcGF0Y2hlZCB9IGZyb20gXCIuL3NoYXJlZC5qc1wiO1xyXG5jb25zdCBiZWZvcmUgPSBnZXRQYXRjaEZ1bmMoXCJiXCIpO1xyXG5jb25zdCBpbnN0ZWFkID0gZ2V0UGF0Y2hGdW5jKFwiaVwiKTtcclxuY29uc3QgYWZ0ZXIgPSBnZXRQYXRjaEZ1bmMoXCJhXCIpO1xyXG5leHBvcnQgeyBpbnN0ZWFkLCBiZWZvcmUsIGFmdGVyLCB1blBhdGNoQWxsLCBwYXRjaGVkIH07XHJcbiIsICJpbXBvcnQgKiBhcyBzcGl0Um9hc3QgZnJvbSBcIi4uLy4uL2xpYi9zcGl0cm9hc3QvZGlzdC9lc21cIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBfX2NhY2hlX186IHtcclxuICAgIHBhdGNoZWQ6IHNwaXRSb2FzdC5wYXRjaGVkLFxyXG4gIH0sXHJcbiAgYmVmb3JlOiBzcGl0Um9hc3QuYmVmb3JlLFxyXG4gIGFmdGVyOiBzcGl0Um9hc3QuYWZ0ZXIsXHJcbiAgaW5zdGVhZDogc3BpdFJvYXN0Lmluc3RlYWQsXHJcbiAgdW5QYXRjaEFsbDogc3BpdFJvYXN0LnVuUGF0Y2hBbGwsXHJcbiAgaW5qZWN0Q1NTKGNzcykge1xyXG4gICAgY29uc3Qgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XHJcbiAgICBzdHlsZS5jbGFzc05hbWUgPSBgYWNvcmQtLWluamVjdGVkLWNzc2A7XHJcbiAgICBzdHlsZS50ZXh0Q29udGVudCA9IGNzcztcclxuICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xyXG5cclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIHN0eWxlPy5yZW1vdmUoKTtcclxuICAgIH07XHJcbiAgfSxcclxuICB1blBhdGNoQWxsQ1NTKCkge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5hY29yZC0taW5qZWN0ZWQtY3NzXCIpLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgIGVsZW1lbnQucmVtb3ZlKCk7XHJcbiAgICB9KVxyXG4gIH1cclxufSIsICJleHBvcnQgZGVmYXVsdCBgXG5Aa2V5ZnJhbWVzIGFjb3JkTG9hZGluZ0ZhZGV7MCV7b3BhY2l0eTouMX0xMDAle29wYWNpdHk6Ljl9fS5hY29yZC0tc3RhcnR1cC1sb2FkaW5ne2FuaW1hdGlvbjphY29yZExvYWRpbmdGYWRlIC41cyBhbHRlcm5hdGUgaW5maW5pdGUgbGluZWFyO3Bvc2l0aW9uOmFic29sdXRlO3RyYW5zaXRpb246YWxsIC41cyBsaW5lYXI7cmlnaHQ6OHB4O2JvdHRvbTo4cHg7d2lkdGg6MTZweDtoZWlnaHQ6MTZweDtiYWNrZ3JvdW5kLWltYWdlOnVybChcImh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9BY29yZFBsdWdpbi9hc3NldHMvbWFpbi9BY29yZC5zdmdcIik7ZmlsdGVyOmdyYXlzY2FsZSgxKSBicmlnaHRuZXNzKDEpO2JhY2tncm91bmQtcG9zaXRpb246Y2VudGVyO2JhY2tncm91bmQtcmVwZWF0Om5vLXJlcGVhdDtiYWNrZ3JvdW5kLXNpemU6Y29udGFpbjt6LWluZGV4Ojk5OTk5OX0uYWNvcmQtLXN0YXJ0dXAtbG9hZGluZy5oaWRkZW57b3BhY2l0eTowICFpbXBvcnRhbnR9YDtcbiIsICJpbXBvcnQgZG9tIGZyb20gXCIuLi8uLi9hcGkvZG9tL2luZGV4LmpzXCI7XHJcbmltcG9ydCBwYXRjaGVyIGZyb20gXCIuLi8uLi9hcGkvcGF0Y2hlci9pbmRleC5qc1wiO1xyXG5cclxuaW1wb3J0IGNzc1RleHQgZnJvbSBcIi4vc3R5bGUuc2Nzc1wiO1xyXG5sZXQgdW5JbmplY3Q7XHJcblxyXG5hc3luYyBmdW5jdGlvbiBzaG93KCkge1xyXG4gIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFjb3JkLS1zdGFydHVwLWxvYWRpbmdcIikpIHJldHVybjtcclxuICB3aGlsZSAodHJ1ZSkge1xyXG4gICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYXBwLW1vdW50XCIpKSBicmVhaztcclxuICAgIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIDEwMCkpO1xyXG4gIH1cclxuICBjb25zb2xlLmxvZyhcImFjb3JkLS1zdGFydHVwLWxvYWRpbmdcIik7XHJcbiAgdW5JbmplY3QgPSBwYXRjaGVyLmluamVjdENTUyhjc3NUZXh0KTtcclxuICBjb25zdCBlbGVtZW50ID0gZG9tLnBhcnNlKGBcclxuICAgIDxkaXYgY2xhc3M9XCJhY29yZC0tc3RhcnR1cC1sb2FkaW5nXCI+PC9kaXY+XHJcbiAgYClcclxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FwcC1tb3VudFwiKS5hcHBlbmRDaGlsZChlbGVtZW50KTtcclxufVxyXG5cclxuZnVuY3Rpb24gaGlkZSgpIHtcclxuICBsZXQgZWxtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hY29yZC0tc3RhcnR1cC1sb2FkaW5nXCIpO1xyXG4gIGlmIChlbG0pIHtcclxuICAgIGVsbS5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIGVsbS5yZW1vdmUoKTtcclxuICAgICAgdW5JbmplY3Q/LigpO1xyXG4gICAgICB1bkluamVjdCA9IG51bGw7XHJcbiAgICB9LCA1MDApO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIHNob3csXHJcbiAgaGlkZVxyXG59IiwgImxldCBkZXZNb2RlRW5hYmxlZCA9IGZhbHNlO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGdldCBlbmFibGVkKCkge1xyXG4gICAgcmV0dXJuIGRldk1vZGVFbmFibGVkO1xyXG4gIH0sXHJcbiAgc2V0IGVuYWJsZWQodmFsdWUpIHtcclxuICAgIGlmICghZ2xvYmFsVGhpc1tcIjxQUkVMT0FEX0tFWT5cIl0uaXNEZXZUb29sc09wZW4oKSkgdGhyb3cgbmV3IEVycm9yKFwiRGV2IG1vZGUgc3RhdHVzIGNhbiBvbmx5IGJlIG1vZGlmaWVkIHdoZW4gRGV2VG9vbHMgaXMgb3BlbiFcIik7XHJcbiAgICBkZXZNb2RlRW5hYmxlZCA9IHZhbHVlO1xyXG4gIH1cclxufVxyXG5cclxuLy8gVE9ETzogYWRkIGxpdmUgZGV2ZWxvcG1lbnQgbW9kZSIsICJpbXBvcnQgbW9kdWxlcyBmcm9tIFwiLi4vbW9kdWxlcy9pbmRleC5qc1wiXHJcbmltcG9ydCB1dGlscyBmcm9tIFwiLi4vdXRpbHMvaW5kZXguanNcIjtcclxuXHJcbmNvbnN0IEJBU0VfVVJMID0gXCJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vYWNvcmQtc3RhbmRhbG9uZS9hc3NldHMvbWFpbi9pMThuXCI7XHJcbmNvbnN0IG5vU3RvcmUgPSB7IGNhY2hlOiBcIm5vLXN0b3JlXCIgfTtcclxuXHJcblxyXG5jb25zdCBvdXQgPSB7XHJcbiAgX19jYWNoZV9fOiB7XHJcbiAgICBsb2NhbGVJZHM6IFtdLFxyXG4gICAgbG9jYWxpemF0aW9uczoge31cclxuICB9LFxyXG4gIGdldCBsb2NhbGUoKSB7XHJcbiAgICByZXR1cm4gbW9kdWxlcy5jb21tb24uaTE4bi5fcmVxdWVzdGVkTG9jYWxlO1xyXG4gIH0sXHJcbiAgZ2V0KGtleSkge1xyXG4gICAgY2hlY2soKTtcclxuICAgIHJldHVybiBvdXQuX19jYWNoZV9fLmxvY2FsaXphdGlvbnNbb3V0LmxvY2FsZV0/LltrZXldXHJcbiAgICAgIHx8IG91dC5fX2NhY2hlX18ubG9jYWxpemF0aW9ucy5kZWZhdWx0Py5ba2V5XVxyXG4gICAgICB8fCBtb2R1bGVzLmNvbW1vbi5pMThuLk1lc3NhZ2VzW2tleV1cclxuICAgICAgfHwga2V5O1xyXG4gIH0sXHJcbiAgbWVzc2FnZXM6IG5ldyBQcm94eSh7fSwge1xyXG4gICAgZ2V0KF8sIHByb3ApIHtcclxuICAgICAgcmV0dXJuIG91dC5nZXQocHJvcCk7XHJcbiAgICB9XHJcbiAgfSksXHJcbiAgbG9jYWxpemUoc3RyKSB7XHJcbiAgICBpZiAodHlwZW9mIHN0ciA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIHN0cjtcclxuICAgIHJldHVybiBzdHI/LltvdXQubG9jYWxlXVxyXG4gICAgICB8fCBzdHI/LmRlZmF1bHRcclxuICAgICAgfHwgT2JqZWN0LnZhbHVlcyhzdHIpWzBdO1xyXG4gIH0sXHJcbiAgZm9ybWF0KGtleSwgLi4uYXJncykge1xyXG4gICAgcmV0dXJuIHV0aWxzLmZvcm1hdChvdXQuZ2V0KGtleSksIC4uLmFyZ3MpO1xyXG4gIH1cclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gY2hlY2soKSB7XHJcbiAgY29uc3QgbG9jYWxlID0gb3V0LmxvY2FsZTtcclxuICBpZiAoIW91dC5fX2NhY2hlX18ubG9jYWxlSWRzLmxlbmd0aCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgb3V0Ll9fY2FjaGVfXy5sb2NhbGVJZHMgPSBhd2FpdCAoYXdhaXQgZmV0Y2goYCR7QkFTRV9VUkx9L2xvY2FsZXMuanNvbmAsIG5vU3RvcmUpKS5qc29uKCk7XHJcbiAgICB9IGNhdGNoIHsgfVxyXG4gICAgdHJ5IHtcclxuICAgICAgb3V0Ll9fY2FjaGVfXy5sb2NhbGl6YXRpb25zLmRlZmF1bHQgPSBhd2FpdCAoYXdhaXQgZmV0Y2goYCR7QkFTRV9VUkx9L2RlZmF1bHQuanNvbmAsIG5vU3RvcmUpKS5qc29uKCk7XHJcbiAgICB9IGNhdGNoIHsgfVxyXG4gIH1cclxuICBpZiAoXHJcbiAgICBvdXQuX19jYWNoZV9fLmxvY2FsZUlkcy5pbmNsdWRlcyhsb2NhbGUpXHJcbiAgICAmJiAhb3V0Ll9fY2FjaGVfXy5sb2NhbGl6YXRpb25zPy5bbG9jYWxlXVxyXG4gICkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgb3V0Ll9fY2FjaGVfXy5sb2NhbGl6YXRpb25zW2xvY2FsZV0gPSBhd2FpdCAoYXdhaXQgZmV0Y2goYCR7QkFTRV9VUkx9LyR7bG9jYWxlfS5qc29uYCwgbm9TdG9yZSkpLmpzb24oKTtcclxuICAgIH0gY2F0Y2ggeyB9O1xyXG4gIH1cclxufVxyXG5cclxuY2hlY2soKTtcclxuZXhwb3J0IGRlZmF1bHQgb3V0OyIsICJpbXBvcnQgKiBhcyBuZXN0cyBmcm9tIFwibmVzdHNcIjtcclxuaW1wb3J0ICogYXMgaWRiS2V5dmFsIGZyb20gXCJpZGIta2V5dmFsXCI7XHJcbmltcG9ydCB7IGRlQ3ljbGVkLCByZXZpdmUgfSBmcm9tIFwiLi4vLi4vbGliL2pzb24tZGVjeWNsZWRcIjtcclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGFzeW5jIGNyZWF0ZVBlcnNpc3ROZXN0KHN1ZmZpeCkge1xyXG4gICAgbGV0IGNhY2hlZCA9IGF3YWl0IGlkYktleXZhbC5nZXQoYEFjb3JkU3RvcmU7JHtzdWZmaXh9YCk7XHJcbiAgICBpZiAodHlwZW9mIGNhY2hlZCA9PSBcInN0cmluZ1wiKSBjYWNoZWQgPSByZXZpdmUoY2FjaGVkKTtcclxuICAgIGNvbnN0IG5lc3QgPSBuZXN0cy5tYWtlKGNhY2hlZCA/PyB7fSk7XHJcblxyXG4gICAgY29uc3Qgc2F2ZSA9ICgpID0+IHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBpZGJLZXl2YWwuc2V0KGBBY29yZFN0b3JlOyR7c3VmZml4fWAsIGRlQ3ljbGVkKHsgLi4ubmVzdC5naG9zdCB9KSk7XHJcbiAgICAgIH0gY2F0Y2gge1xyXG4gICAgICAgIGlkYktleXZhbC5zZXQoYEFjb3JkU3RvcmU7JHtzdWZmaXh9YCwgZGVDeWNsZWQoe30pKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG5lc3Qub24obmVzdHMuRXZlbnRzLlNFVCwgc2F2ZSk7XHJcbiAgICBuZXN0Lm9uKG5lc3RzLkV2ZW50cy5VUERBVEUsIHNhdmUpO1xyXG4gICAgbmVzdC5vbihuZXN0cy5FdmVudHMuREVMRVRFLCBzYXZlKTtcclxuXHJcbiAgICByZXR1cm4gbmVzdDtcclxuICB9XHJcbn0iLCAiZnVuY3Rpb24gcHJvbWlzaWZ5UmVxdWVzdChyZXF1ZXN0KSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZSAtIGZpbGUgc2l6ZSBoYWNrc1xuICAgICAgICByZXF1ZXN0Lm9uY29tcGxldGUgPSByZXF1ZXN0Lm9uc3VjY2VzcyA9ICgpID0+IHJlc29sdmUocmVxdWVzdC5yZXN1bHQpO1xuICAgICAgICAvLyBAdHMtaWdub3JlIC0gZmlsZSBzaXplIGhhY2tzXG4gICAgICAgIHJlcXVlc3Qub25hYm9ydCA9IHJlcXVlc3Qub25lcnJvciA9ICgpID0+IHJlamVjdChyZXF1ZXN0LmVycm9yKTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZVN0b3JlKGRiTmFtZSwgc3RvcmVOYW1lKSB7XG4gICAgY29uc3QgcmVxdWVzdCA9IGluZGV4ZWREQi5vcGVuKGRiTmFtZSk7XG4gICAgcmVxdWVzdC5vbnVwZ3JhZGVuZWVkZWQgPSAoKSA9PiByZXF1ZXN0LnJlc3VsdC5jcmVhdGVPYmplY3RTdG9yZShzdG9yZU5hbWUpO1xuICAgIGNvbnN0IGRicCA9IHByb21pc2lmeVJlcXVlc3QocmVxdWVzdCk7XG4gICAgcmV0dXJuICh0eE1vZGUsIGNhbGxiYWNrKSA9PiBkYnAudGhlbigoZGIpID0+IGNhbGxiYWNrKGRiLnRyYW5zYWN0aW9uKHN0b3JlTmFtZSwgdHhNb2RlKS5vYmplY3RTdG9yZShzdG9yZU5hbWUpKSk7XG59XG5sZXQgZGVmYXVsdEdldFN0b3JlRnVuYztcbmZ1bmN0aW9uIGRlZmF1bHRHZXRTdG9yZSgpIHtcbiAgICBpZiAoIWRlZmF1bHRHZXRTdG9yZUZ1bmMpIHtcbiAgICAgICAgZGVmYXVsdEdldFN0b3JlRnVuYyA9IGNyZWF0ZVN0b3JlKCdrZXl2YWwtc3RvcmUnLCAna2V5dmFsJyk7XG4gICAgfVxuICAgIHJldHVybiBkZWZhdWx0R2V0U3RvcmVGdW5jO1xufVxuLyoqXG4gKiBHZXQgYSB2YWx1ZSBieSBpdHMga2V5LlxuICpcbiAqIEBwYXJhbSBrZXlcbiAqIEBwYXJhbSBjdXN0b21TdG9yZSBNZXRob2QgdG8gZ2V0IGEgY3VzdG9tIHN0b3JlLiBVc2Ugd2l0aCBjYXV0aW9uIChzZWUgdGhlIGRvY3MpLlxuICovXG5mdW5jdGlvbiBnZXQoa2V5LCBjdXN0b21TdG9yZSA9IGRlZmF1bHRHZXRTdG9yZSgpKSB7XG4gICAgcmV0dXJuIGN1c3RvbVN0b3JlKCdyZWFkb25seScsIChzdG9yZSkgPT4gcHJvbWlzaWZ5UmVxdWVzdChzdG9yZS5nZXQoa2V5KSkpO1xufVxuLyoqXG4gKiBTZXQgYSB2YWx1ZSB3aXRoIGEga2V5LlxuICpcbiAqIEBwYXJhbSBrZXlcbiAqIEBwYXJhbSB2YWx1ZVxuICogQHBhcmFtIGN1c3RvbVN0b3JlIE1ldGhvZCB0byBnZXQgYSBjdXN0b20gc3RvcmUuIFVzZSB3aXRoIGNhdXRpb24gKHNlZSB0aGUgZG9jcykuXG4gKi9cbmZ1bmN0aW9uIHNldChrZXksIHZhbHVlLCBjdXN0b21TdG9yZSA9IGRlZmF1bHRHZXRTdG9yZSgpKSB7XG4gICAgcmV0dXJuIGN1c3RvbVN0b3JlKCdyZWFkd3JpdGUnLCAoc3RvcmUpID0+IHtcbiAgICAgICAgc3RvcmUucHV0KHZhbHVlLCBrZXkpO1xuICAgICAgICByZXR1cm4gcHJvbWlzaWZ5UmVxdWVzdChzdG9yZS50cmFuc2FjdGlvbik7XG4gICAgfSk7XG59XG4vKipcbiAqIFNldCBtdWx0aXBsZSB2YWx1ZXMgYXQgb25jZS4gVGhpcyBpcyBmYXN0ZXIgdGhhbiBjYWxsaW5nIHNldCgpIG11bHRpcGxlIHRpbWVzLlxuICogSXQncyBhbHNvIGF0b21pYyBcdTIwMTMgaWYgb25lIG9mIHRoZSBwYWlycyBjYW4ndCBiZSBhZGRlZCwgbm9uZSB3aWxsIGJlIGFkZGVkLlxuICpcbiAqIEBwYXJhbSBlbnRyaWVzIEFycmF5IG9mIGVudHJpZXMsIHdoZXJlIGVhY2ggZW50cnkgaXMgYW4gYXJyYXkgb2YgYFtrZXksIHZhbHVlXWAuXG4gKiBAcGFyYW0gY3VzdG9tU3RvcmUgTWV0aG9kIHRvIGdldCBhIGN1c3RvbSBzdG9yZS4gVXNlIHdpdGggY2F1dGlvbiAoc2VlIHRoZSBkb2NzKS5cbiAqL1xuZnVuY3Rpb24gc2V0TWFueShlbnRyaWVzLCBjdXN0b21TdG9yZSA9IGRlZmF1bHRHZXRTdG9yZSgpKSB7XG4gICAgcmV0dXJuIGN1c3RvbVN0b3JlKCdyZWFkd3JpdGUnLCAoc3RvcmUpID0+IHtcbiAgICAgICAgZW50cmllcy5mb3JFYWNoKChlbnRyeSkgPT4gc3RvcmUucHV0KGVudHJ5WzFdLCBlbnRyeVswXSkpO1xuICAgICAgICByZXR1cm4gcHJvbWlzaWZ5UmVxdWVzdChzdG9yZS50cmFuc2FjdGlvbik7XG4gICAgfSk7XG59XG4vKipcbiAqIEdldCBtdWx0aXBsZSB2YWx1ZXMgYnkgdGhlaXIga2V5c1xuICpcbiAqIEBwYXJhbSBrZXlzXG4gKiBAcGFyYW0gY3VzdG9tU3RvcmUgTWV0aG9kIHRvIGdldCBhIGN1c3RvbSBzdG9yZS4gVXNlIHdpdGggY2F1dGlvbiAoc2VlIHRoZSBkb2NzKS5cbiAqL1xuZnVuY3Rpb24gZ2V0TWFueShrZXlzLCBjdXN0b21TdG9yZSA9IGRlZmF1bHRHZXRTdG9yZSgpKSB7XG4gICAgcmV0dXJuIGN1c3RvbVN0b3JlKCdyZWFkb25seScsIChzdG9yZSkgPT4gUHJvbWlzZS5hbGwoa2V5cy5tYXAoKGtleSkgPT4gcHJvbWlzaWZ5UmVxdWVzdChzdG9yZS5nZXQoa2V5KSkpKSk7XG59XG4vKipcbiAqIFVwZGF0ZSBhIHZhbHVlLiBUaGlzIGxldHMgeW91IHNlZSB0aGUgb2xkIHZhbHVlIGFuZCB1cGRhdGUgaXQgYXMgYW4gYXRvbWljIG9wZXJhdGlvbi5cbiAqXG4gKiBAcGFyYW0ga2V5XG4gKiBAcGFyYW0gdXBkYXRlciBBIGNhbGxiYWNrIHRoYXQgdGFrZXMgdGhlIG9sZCB2YWx1ZSBhbmQgcmV0dXJucyBhIG5ldyB2YWx1ZS5cbiAqIEBwYXJhbSBjdXN0b21TdG9yZSBNZXRob2QgdG8gZ2V0IGEgY3VzdG9tIHN0b3JlLiBVc2Ugd2l0aCBjYXV0aW9uIChzZWUgdGhlIGRvY3MpLlxuICovXG5mdW5jdGlvbiB1cGRhdGUoa2V5LCB1cGRhdGVyLCBjdXN0b21TdG9yZSA9IGRlZmF1bHRHZXRTdG9yZSgpKSB7XG4gICAgcmV0dXJuIGN1c3RvbVN0b3JlKCdyZWFkd3JpdGUnLCAoc3RvcmUpID0+IFxuICAgIC8vIE5lZWQgdG8gY3JlYXRlIHRoZSBwcm9taXNlIG1hbnVhbGx5LlxuICAgIC8vIElmIEkgdHJ5IHRvIGNoYWluIHByb21pc2VzLCB0aGUgdHJhbnNhY3Rpb24gY2xvc2VzIGluIGJyb3dzZXJzXG4gICAgLy8gdGhhdCB1c2UgYSBwcm9taXNlIHBvbHlmaWxsIChJRTEwLzExKS5cbiAgICBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIHN0b3JlLmdldChrZXkpLm9uc3VjY2VzcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgc3RvcmUucHV0KHVwZGF0ZXIodGhpcy5yZXN1bHQpLCBrZXkpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUocHJvbWlzaWZ5UmVxdWVzdChzdG9yZS50cmFuc2FjdGlvbikpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0pKTtcbn1cbi8qKlxuICogRGVsZXRlIGEgcGFydGljdWxhciBrZXkgZnJvbSB0aGUgc3RvcmUuXG4gKlxuICogQHBhcmFtIGtleVxuICogQHBhcmFtIGN1c3RvbVN0b3JlIE1ldGhvZCB0byBnZXQgYSBjdXN0b20gc3RvcmUuIFVzZSB3aXRoIGNhdXRpb24gKHNlZSB0aGUgZG9jcykuXG4gKi9cbmZ1bmN0aW9uIGRlbChrZXksIGN1c3RvbVN0b3JlID0gZGVmYXVsdEdldFN0b3JlKCkpIHtcbiAgICByZXR1cm4gY3VzdG9tU3RvcmUoJ3JlYWR3cml0ZScsIChzdG9yZSkgPT4ge1xuICAgICAgICBzdG9yZS5kZWxldGUoa2V5KTtcbiAgICAgICAgcmV0dXJuIHByb21pc2lmeVJlcXVlc3Qoc3RvcmUudHJhbnNhY3Rpb24pO1xuICAgIH0pO1xufVxuLyoqXG4gKiBEZWxldGUgbXVsdGlwbGUga2V5cyBhdCBvbmNlLlxuICpcbiAqIEBwYXJhbSBrZXlzIExpc3Qgb2Yga2V5cyB0byBkZWxldGUuXG4gKiBAcGFyYW0gY3VzdG9tU3RvcmUgTWV0aG9kIHRvIGdldCBhIGN1c3RvbSBzdG9yZS4gVXNlIHdpdGggY2F1dGlvbiAoc2VlIHRoZSBkb2NzKS5cbiAqL1xuZnVuY3Rpb24gZGVsTWFueShrZXlzLCBjdXN0b21TdG9yZSA9IGRlZmF1bHRHZXRTdG9yZSgpKSB7XG4gICAgcmV0dXJuIGN1c3RvbVN0b3JlKCdyZWFkd3JpdGUnLCAoc3RvcmUpID0+IHtcbiAgICAgICAga2V5cy5mb3JFYWNoKChrZXkpID0+IHN0b3JlLmRlbGV0ZShrZXkpKTtcbiAgICAgICAgcmV0dXJuIHByb21pc2lmeVJlcXVlc3Qoc3RvcmUudHJhbnNhY3Rpb24pO1xuICAgIH0pO1xufVxuLyoqXG4gKiBDbGVhciBhbGwgdmFsdWVzIGluIHRoZSBzdG9yZS5cbiAqXG4gKiBAcGFyYW0gY3VzdG9tU3RvcmUgTWV0aG9kIHRvIGdldCBhIGN1c3RvbSBzdG9yZS4gVXNlIHdpdGggY2F1dGlvbiAoc2VlIHRoZSBkb2NzKS5cbiAqL1xuZnVuY3Rpb24gY2xlYXIoY3VzdG9tU3RvcmUgPSBkZWZhdWx0R2V0U3RvcmUoKSkge1xuICAgIHJldHVybiBjdXN0b21TdG9yZSgncmVhZHdyaXRlJywgKHN0b3JlKSA9PiB7XG4gICAgICAgIHN0b3JlLmNsZWFyKCk7XG4gICAgICAgIHJldHVybiBwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLnRyYW5zYWN0aW9uKTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGVhY2hDdXJzb3Ioc3RvcmUsIGNhbGxiYWNrKSB7XG4gICAgc3RvcmUub3BlbkN1cnNvcigpLm9uc3VjY2VzcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnJlc3VsdClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgY2FsbGJhY2sodGhpcy5yZXN1bHQpO1xuICAgICAgICB0aGlzLnJlc3VsdC5jb250aW51ZSgpO1xuICAgIH07XG4gICAgcmV0dXJuIHByb21pc2lmeVJlcXVlc3Qoc3RvcmUudHJhbnNhY3Rpb24pO1xufVxuLyoqXG4gKiBHZXQgYWxsIGtleXMgaW4gdGhlIHN0b3JlLlxuICpcbiAqIEBwYXJhbSBjdXN0b21TdG9yZSBNZXRob2QgdG8gZ2V0IGEgY3VzdG9tIHN0b3JlLiBVc2Ugd2l0aCBjYXV0aW9uIChzZWUgdGhlIGRvY3MpLlxuICovXG5mdW5jdGlvbiBrZXlzKGN1c3RvbVN0b3JlID0gZGVmYXVsdEdldFN0b3JlKCkpIHtcbiAgICByZXR1cm4gY3VzdG9tU3RvcmUoJ3JlYWRvbmx5JywgKHN0b3JlKSA9PiB7XG4gICAgICAgIC8vIEZhc3QgcGF0aCBmb3IgbW9kZXJuIGJyb3dzZXJzXG4gICAgICAgIGlmIChzdG9yZS5nZXRBbGxLZXlzKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzaWZ5UmVxdWVzdChzdG9yZS5nZXRBbGxLZXlzKCkpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGl0ZW1zID0gW107XG4gICAgICAgIHJldHVybiBlYWNoQ3Vyc29yKHN0b3JlLCAoY3Vyc29yKSA9PiBpdGVtcy5wdXNoKGN1cnNvci5rZXkpKS50aGVuKCgpID0+IGl0ZW1zKTtcbiAgICB9KTtcbn1cbi8qKlxuICogR2V0IGFsbCB2YWx1ZXMgaW4gdGhlIHN0b3JlLlxuICpcbiAqIEBwYXJhbSBjdXN0b21TdG9yZSBNZXRob2QgdG8gZ2V0IGEgY3VzdG9tIHN0b3JlLiBVc2Ugd2l0aCBjYXV0aW9uIChzZWUgdGhlIGRvY3MpLlxuICovXG5mdW5jdGlvbiB2YWx1ZXMoY3VzdG9tU3RvcmUgPSBkZWZhdWx0R2V0U3RvcmUoKSkge1xuICAgIHJldHVybiBjdXN0b21TdG9yZSgncmVhZG9ubHknLCAoc3RvcmUpID0+IHtcbiAgICAgICAgLy8gRmFzdCBwYXRoIGZvciBtb2Rlcm4gYnJvd3NlcnNcbiAgICAgICAgaWYgKHN0b3JlLmdldEFsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHByb21pc2lmeVJlcXVlc3Qoc3RvcmUuZ2V0QWxsKCkpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGl0ZW1zID0gW107XG4gICAgICAgIHJldHVybiBlYWNoQ3Vyc29yKHN0b3JlLCAoY3Vyc29yKSA9PiBpdGVtcy5wdXNoKGN1cnNvci52YWx1ZSkpLnRoZW4oKCkgPT4gaXRlbXMpO1xuICAgIH0pO1xufVxuLyoqXG4gKiBHZXQgYWxsIGVudHJpZXMgaW4gdGhlIHN0b3JlLiBFYWNoIGVudHJ5IGlzIGFuIGFycmF5IG9mIGBba2V5LCB2YWx1ZV1gLlxuICpcbiAqIEBwYXJhbSBjdXN0b21TdG9yZSBNZXRob2QgdG8gZ2V0IGEgY3VzdG9tIHN0b3JlLiBVc2Ugd2l0aCBjYXV0aW9uIChzZWUgdGhlIGRvY3MpLlxuICovXG5mdW5jdGlvbiBlbnRyaWVzKGN1c3RvbVN0b3JlID0gZGVmYXVsdEdldFN0b3JlKCkpIHtcbiAgICByZXR1cm4gY3VzdG9tU3RvcmUoJ3JlYWRvbmx5JywgKHN0b3JlKSA9PiB7XG4gICAgICAgIC8vIEZhc3QgcGF0aCBmb3IgbW9kZXJuIGJyb3dzZXJzXG4gICAgICAgIC8vIChhbHRob3VnaCwgaG9wZWZ1bGx5IHdlJ2xsIGdldCBhIHNpbXBsZXIgcGF0aCBzb21lIGRheSlcbiAgICAgICAgaWYgKHN0b3JlLmdldEFsbCAmJiBzdG9yZS5nZXRBbGxLZXlzKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgICAgIHByb21pc2lmeVJlcXVlc3Qoc3RvcmUuZ2V0QWxsS2V5cygpKSxcbiAgICAgICAgICAgICAgICBwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLmdldEFsbCgpKSxcbiAgICAgICAgICAgIF0pLnRoZW4oKFtrZXlzLCB2YWx1ZXNdKSA9PiBrZXlzLm1hcCgoa2V5LCBpKSA9PiBba2V5LCB2YWx1ZXNbaV1dKSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaXRlbXMgPSBbXTtcbiAgICAgICAgcmV0dXJuIGN1c3RvbVN0b3JlKCdyZWFkb25seScsIChzdG9yZSkgPT4gZWFjaEN1cnNvcihzdG9yZSwgKGN1cnNvcikgPT4gaXRlbXMucHVzaChbY3Vyc29yLmtleSwgY3Vyc29yLnZhbHVlXSkpLnRoZW4oKCkgPT4gaXRlbXMpKTtcbiAgICB9KTtcbn1cblxuZXhwb3J0IHsgY2xlYXIsIGNyZWF0ZVN0b3JlLCBkZWwsIGRlbE1hbnksIGVudHJpZXMsIGdldCwgZ2V0TWFueSwga2V5cywgcHJvbWlzaWZ5UmVxdWVzdCwgc2V0LCBzZXRNYW55LCB1cGRhdGUsIHZhbHVlcyB9O1xuIiwgIlwidXNlIHN0cmljdFwiO1xyXG5cclxuZnVuY3Rpb24gZGVDeWNsZXIodmFsLCBjb25maWcpIHtcclxuICBjb25maWcgPSB0eXBlb2YgY29uZmlnID09PSAnbnVtYmVyJyA/IHsgZGVlcDogY29uZmlnIH0gOiAoY29uZmlnIHx8IHt9KTtcclxuICBjb25maWcuZGVlcCA9IGNvbmZpZy5kZWVwIHx8IDEwO1xyXG4gIHJldHVybiBkZWN5Y2xlV2Fsa2VyKFtdLCBbXSwgdmFsLCBjb25maWcpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkZUN5Y2xlZCh2YWwsIGNvbmZpZykge1xyXG4gIGNvbmZpZyA9IHR5cGVvZiBjb25maWcgPT09ICdudW1iZXInID8geyBkZWVwOiBjb25maWcgfSA6IChjb25maWcgfHwge30pO1xyXG4gIHZhbCA9IGRlQ3ljbGVyKHZhbCwgY29uZmlnKTtcclxuICB0cnkge1xyXG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHZhbCwgdW5kZWZpbmVkLCBjb25maWcuc3BhY2VyKTtcclxuICB9IGNhdGNoIChlKSB7XHJcbiAgICByZXR1cm4gZTtcclxuICB9XHJcbn1cclxuXHJcbnZhciByZXZpdmVyRGF0ZSA9IC9eXFxbRGF0ZTooKFxcZHs0fS1cXGR7Mn0tXFxkezJ9KVtBLVpdKyhcXGR7Mn06XFxkezJ9OlxcZHsyfSkuKFswLTkrLTpdKylaKVxcXSQvO1xyXG52YXIgcmV2aXZlclJlZ0V4cCA9IC9eXFxbUmVnZXhwOlxcLyguKylcXC9cXF0kLztcclxudmFyIHJldml2ZXJFcnJvciA9IC9eXFxbRXJyb3I6KFtcXFdcXHddKylcXF0kLztcclxudmFyIHJldml2ZXJGdW5jdGlvbiA9IC9eXFxbRnVuY3Rpb246KC4rKVxcXSQvO1xyXG5mdW5jdGlvbiByZXZpdmUodmFsLCBmdW5jdGlvbnMpIHtcclxuICB0cnkge1xyXG4gICAgcmV0dXJuIEpTT04ucGFyc2UodmFsLCByZXZpdmVyKTtcclxuICB9IGNhdGNoIChlKSB7XHJcbiAgICByZXR1cm4gZTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHJldml2ZXIoa2V5LCB2YWwpIHtcclxuICAgIGlmIChyZXZpdmVyRGF0ZS50ZXN0KHZhbCkpIHtcclxuICAgICAgdmFsID0gcmV2aXZlckRhdGUuZXhlYyh2YWwpO1xyXG4gICAgICB2YWwgPSBuZXcgRGF0ZSh2YWxbMV0pO1xyXG4gICAgICByZXR1cm4gbmV3IERhdGUodmFsKTtcclxuICAgIH0gZWxzZSBpZiAocmV2aXZlclJlZ0V4cC50ZXN0KHZhbCkpIHtcclxuICAgICAgdmFsID0gcmV2aXZlclJlZ0V4cC5leGVjKHZhbClbMV07XHJcbiAgICAgIHJldHVybiBuZXcgUmVnRXhwKHZhbCk7XHJcbiAgICB9IGVsc2UgaWYgKHJldml2ZXJFcnJvci50ZXN0KHZhbCkpIHtcclxuICAgICAgdmFsID0gcmV2aXZlckVycm9yLmV4ZWModmFsKVsxXTtcclxuICAgICAgdmFyIGVycm9yID0gbmV3IEVycm9yKHZhbC5zcGxpdCgnXFxuJylbMF0pO1xyXG4gICAgICBpZiAoZXJyb3Iuc3RhY2spIHtcclxuICAgICAgICBlcnJvci5zdGFjayA9IHZhbDtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gZXJyb3I7XHJcbiAgICB9IGVsc2UgaWYgKGZ1bmN0aW9ucyAmJiByZXZpdmVyRnVuY3Rpb24udGVzdCh2YWwpKSB7XHJcbiAgICAgIHZhbCA9IHJldml2ZXJGdW5jdGlvbi5leGVjKHZhbClbMV07XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgcmV0dXJuIChuZXcgRnVuY3Rpb24oXCJyZXR1cm4gXCIgKyB2YWwgKyBcIjtcIikpKCk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgcmV0dXJuIGVycm9yO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gdmFsO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZGVjeWNsZVdhbGtlcihwYXJlbnRzLCBwYXRoLCB2YWwsIGNvbmZpZykge1xyXG4gIGlmIChbJ3VuZGVmaW5lZCcsICdudW1iZXInLCAnYm9vbGVhbicsICdzdHJpbmcnXS5pbmRleE9mKHR5cGVvZiB2YWwpID49IDAgfHwgdmFsID09PSBudWxsKSB7XHJcbiAgICByZXR1cm4gdmFsO1xyXG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ29iamVjdCcgJiYgdmFsLmNvbnN0cnVjdG9yID09PSBEYXRlKSB7XHJcbiAgICByZXR1cm4gY29uZmlnLmRhdGVzICE9PSBmYWxzZSA/ICdbRGF0ZTonICsgdmFsLnRvSVNPU3RyaW5nKCkgKyAnXScgOiB2YWw7XHJcbiAgICAvL3ZhbC5mb3JtYXQoJ3tZWVlZfS97TU19L3tERH0ge2hofTp7bW19Ontzc30gVVRDOlx1MDBCN3twYXJhbXMudHo+PTA/XCIrXCIrcGFyYW1zLnR6OnBhcmFtcy50en1cdTAwQjcnKTtcclxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdvYmplY3QnICYmIHZhbC5jb25zdHJ1Y3RvciA9PT0gUmVnRXhwKSB7XHJcbiAgICByZXR1cm4gY29uZmlnLnJlZ2V4cHMgIT09IGZhbHNlID8gJ1tSZWdleHA6JyArIHZhbC50b1N0cmluZygpICsgJ10nIDogdmFsO1xyXG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ29iamVjdCcgJiYgdmFsLmNvbnN0cnVjdG9yICYmIHR5cGVvZiB2YWwuY29uc3RydWN0b3IubmFtZSA9PT0gJ3N0cmluZycgJiYgdmFsLmNvbnN0cnVjdG9yLm5hbWUuc2xpY2UoLTUpID09PSAnRXJyb3InKSB7XHJcbiAgICB2YXIgc3RhY2sgPSAodmFsLnN0YWNrIHx8ICcnKS5zcGxpdCgnXFxuJykuc2xpY2UoMSk7XHJcbiAgICB2YXIgbWVzc2FnZSA9ICh2YWwubWVzc2FnZSB8fCB2YWwudG9TdHJpbmcoKSk7XHJcbiAgICB2YXIgZXJyb3IgPSBtZXNzYWdlICsgXCJcXG5cIiArIHN0YWNrO1xyXG4gICAgcmV0dXJuIGNvbmZpZy5lcnJvcnMgIT09IGZhbHNlID8gJ1tFcnJvcjonICsgZXJyb3IgKyAnXScgOiB2YWw7XHJcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnb2JqZWN0Jykge1xyXG4gICAgaWYgKHBhcmVudHMuaW5kZXhPZih2YWwpID49IDApIHtcclxuICAgICAgdmFyIHBvaW50ID0gcGF0aC5zbGljZSgwLCBwYXJlbnRzLmluZGV4T2YodmFsKSkuam9pbignLicpO1xyXG4gICAgICByZXR1cm4gJ1tDaXJjdWxhcicgKyAocG9pbnQgPyAnOicgKyBwb2ludCA6ICcnKSArICddJztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZhciBjb3B5LCBpLCBrLCBsO1xyXG4gICAgICBpZiAodmFsLmNvbnN0cnVjdG9yICYmIHR5cGVvZiB2YWwuY29uc3RydWN0b3IubmFtZSA9PT0gJ3N0cmluZycgJiYgdmFsLmNvbnN0cnVjdG9yLm5hbWUuc2xpY2UoLTUpID09PSAnQXJyYXknKSB7XHJcbiAgICAgICAgaWYgKHBhcmVudHMubGVuZ3RoID49IGNvbmZpZy5kZWVwKSB7XHJcbiAgICAgICAgICByZXR1cm4gJ1tBcnJheTonICsgdmFsLmNvbnN0cnVjdG9yLm5hbWUgKyAnXSc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvcHkgPSBbXTtcclxuICAgICAgICAgIGZvciAoaSA9IDAsIGwgPSB2YWwubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvcHlbaV0gPSBkZWN5Y2xlV2Fsa2VyKHBhcmVudHMuY29uY2F0KFt2YWxdKSwgcGF0aC5jb25jYXQoaSksIHZhbFtpXSwgY29uZmlnKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBjb3B5O1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAocGFyZW50cy5sZW5ndGggPj0gY29uZmlnLmRlZXApIHtcclxuICAgICAgICAgIHJldHVybiAnW09iamVjdDonICsgKHZhbC5jb25zdHJ1Y3RvciAmJiB2YWwuY29uc3RydWN0b3IubmFtZSA/IHZhbC5jb25zdHJ1Y3Rvci5uYW1lIDogJ09iamVjdCcpICsgJ10nO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb3B5ID0ge307XHJcbiAgICAgICAgICBmb3IgKGkgPSAwLCBrID0gT2JqZWN0LmtleXModmFsKSwgbCA9IGsubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvcHlba1tpXV0gPSBkZWN5Y2xlV2Fsa2VyKHBhcmVudHMuY29uY2F0KFt2YWxdKSwgcGF0aC5jb25jYXQoW2tbaV1dKSwgdmFsW2tbaV1dLCBjb25maWcpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIGNvcHk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICByZXR1cm4gY29uZmlnLmZ1bmN0aW9ucyA9PT0gdHJ1ZSA/ICdbRnVuY3Rpb246JyArIHZhbC50b1N0cmluZygpICsgJ10nIDogdW5kZWZpbmVkO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gdmFsLnRvU3RyaW5nKCk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQge1xyXG4gIGRlQ3ljbGVyLFxyXG4gIGRlQ3ljbGVkLFxyXG4gIHJldml2ZVxyXG59IiwgImltcG9ydCBpMThuIGZyb20gXCIuLi9pMThuXCI7XHJcbmltcG9ydCB1dGlscyBmcm9tIFwiLi4vdXRpbHNcIjtcclxuXHJcbi8qKlxyXG4gKiBAcGFyYW0ge3sgaTE4bjogc3RyaW5nIHwgeyBbbGFuZzogc3RyaW5nXTogeyBbazogc3RyaW5nXTogc3RyaW5nIH0gfX19IGNmZyBcclxuICogQHJldHVybnMgXHJcbiAqL1xyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYnVpbGRFeHRlbnNpb25JMThOKGNmZykge1xyXG4gIGlmICghY2ZnPy5pMThuKSByZXR1cm4gbnVsbDtcclxuICBsZXQgb3V0ID0ge1xyXG4gICAgX19jYWNoZV9fOiB7XHJcbiAgICAgIGxvY2FsZUlkczogW10sXHJcbiAgICAgIGxvY2FsaXphdGlvbnM6IHt9XHJcbiAgICB9LFxyXG4gICAgZm9ybWF0KGtleSwgLi4uYXJncykge1xyXG4gICAgICByZXR1cm4gdXRpbHMuZm9ybWF0KG91dC5nZXQoa2V5KSwgLi4uYXJncyk7XHJcbiAgICB9LFxyXG4gICAgZ2V0KGtleSkge1xyXG4gICAgICBpZiAodHlwZW9mIGNmZy5pMThuID09PSBcInN0cmluZ1wiKSBjaGVjaygpO1xyXG4gICAgICByZXR1cm4gb3V0Ll9fY2FjaGVfXy5sb2NhbGl6YXRpb25zW291dC5sb2NhbGVdPy5ba2V5XVxyXG4gICAgICAgIHx8IG91dC5fX2NhY2hlX18ubG9jYWxpemF0aW9ucy5kZWZhdWx0Py5ba2V5XVxyXG4gICAgICAgIHx8IG91dC5nZXQoa2V5KTtcclxuICAgIH0sXHJcbiAgICBtZXNzYWdlczogbmV3IFByb3h5KHt9LCB7XHJcbiAgICAgIGdldChfLCBwcm9wKSB7XHJcbiAgICAgICAgcmV0dXJuIG91dC5nZXQocHJvcCk7XHJcbiAgICAgIH1cclxuICAgIH0pLFxyXG4gIH1cclxuICBhc3luYyBmdW5jdGlvbiBjaGVjaygpIHtcclxuICAgIGNvbnN0IGxvY2FsZSA9IGkxOG4ubG9jYWxlO1xyXG4gICAgaWYgKHR5cGVvZiBjZmcuaTE4biA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICBjb25zdCBCQVNFX1VSTCA9IGNmZy5pMThuLmVuZHNXaXRoKFwiL1wiKSA/IGNmZy5pMThuLnNsaWNlKDAsIC0xKSA6IGNmZy5pMThuO1xyXG4gICAgICBpZiAoIW91dC5fX2NhY2hlX18ubG9jYWxlSWRzLmxlbmd0aCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICBvdXQuX19jYWNoZV9fLmxvY2FsZUlkcyA9IGF3YWl0IChhd2FpdCBmZXRjaChgJHtCQVNFX1VSTH0vbG9jYWxlcy5qc29uYCwgbm9TdG9yZSkpLmpzb24oKTtcclxuICAgICAgICB9IGNhdGNoIHsgfVxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICBvdXQuX19jYWNoZV9fLmxvY2FsaXphdGlvbnMuZGVmYXVsdCA9IGF3YWl0IChhd2FpdCBmZXRjaChgJHtCQVNFX1VSTH0vZGVmYXVsdC5qc29uYCwgbm9TdG9yZSkpLmpzb24oKTtcclxuICAgICAgICB9IGNhdGNoIHsgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmIChcclxuICAgICAgICBvdXQuX19jYWNoZV9fLmxvY2FsZUlkcy5pbmNsdWRlcyhsb2NhbGUpXHJcbiAgICAgICAgJiYgIW91dC5fX2NhY2hlX18ubG9jYWxpemF0aW9ucz8uW2xvY2FsZV1cclxuICAgICAgKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIG91dC5fX2NhY2hlX18ubG9jYWxpemF0aW9uc1tsb2NhbGVdID0gYXdhaXQgKGF3YWl0IGZldGNoKGAke0JBU0VfVVJMfS8ke2xvY2FsZX0uanNvbmAsIG5vU3RvcmUpKS5qc29uKCk7XHJcbiAgICAgICAgfSBjYXRjaCB7IH07XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG91dC5fX2NhY2hlX18ubG9jYWxlSWRzID0gT2JqZWN0LmtleXMoY2ZnLmkxOG4pO1xyXG4gICAgICBvdXQuX19jYWNoZV9fLmxvY2FsaXphdGlvbnMgPSBjZmcuaTE4bjtcclxuICAgIH1cclxuICB9XHJcbiAgYXdhaXQgY2hlY2soKTtcclxuICByZXR1cm4gb3V0O1xyXG59IiwgImltcG9ydCB7IEJhc2ljRXZlbnRFbWl0dGVyIH0gZnJvbSBcIi4uLy4uL2xpYi9CYXNpY0V2ZW50RW1pdHRlci5qc1wiO1xyXG5pbXBvcnQgZGV2IGZyb20gXCIuLi9kZXYvaW5kZXguanNcIjtcclxuaW1wb3J0IGkxOG4gZnJvbSBcIi4uL2kxOG4vaW5kZXguanNcIjtcclxuaW1wb3J0IG1vZHVsZXMgZnJvbSBcIi4uL21vZHVsZXMvaW5kZXguanNcIjtcclxuaW1wb3J0IHN0b3JhZ2UgZnJvbSBcIi4uL3N0b3JhZ2UvaW5kZXguanNcIjtcclxuaW1wb3J0IHsgYnVpbGRFeHRlbnNpb25JMThOIH0gZnJvbSBcIi4vaTE4bi5qc1wiO1xyXG5pbXBvcnQgKiBhcyBuZXN0cyBmcm9tIFwibmVzdHNcIjtcclxuXHJcbi8qKlxyXG4gKiBAcGFyYW0ge3sgbW9kdWxlczogeyBub2RlOiB7IG5hbWU6IHN0cmluZywgcmVhc29uOiBzdHJpbmcgfVtdLCBjb21tb246IHsgbmFtZTogc3RyaW5nLCByZWFzb246IHN0cmluZyB9W10sIGN1c3RvbTogeyByZWFzb246IHN0cmluZywgbmFtZTogc3RyaW5nLCBsYXp5OiBib29sZWFuLCBmaW5kZXI6IHsgZmlsdGVyOiB7IGV4cG9ydDogYm9vbGVhbiwgaW46IFwicHJvcGVydGllc1wiIHwgXCJzdHJpbmdzXCIgfCBcInByb3RvdHlwZXNcIiwgYnk6IFtzdHJpbmdbXSwgc3RyaW5nW10/XSB9LCBwYXRoOiB7IGJlZm9yZTogc3RyaW5nIHwgc3RyaW5nW10sIGFmdGVyOiBzdHJpbmcgfCBzdHJpbmdbXSB9LCBtYXA6IHsgW2s6IHN0cmluZ106IHN0cmluZ1tdIH0gfSB9W10gfSwgYWJvdXQ6IHsgbmFtZTogc3RyaW5nIHwgeyBbazogc3RyaW5nXTogc3RyaW5nIH0sIGRlc2NyaXB0aW9uOiBzdHJpbmcgfCB7IFtrOiBzdHJpbmddOiBzdHJpbmcgfSwgc2x1Zzogc3RyaW5nIH0sIHJlYXNvbjogc3RyaW5nIH19IGNmZyBcclxuICovXHJcbmFzeW5jIGZ1bmN0aW9uIGJ1aWxkQVBJKGNmZykge1xyXG4gIGNvbnN0IHBlcnNpc3QgPSBhd2FpdCBzdG9yYWdlLmNyZWF0ZVBlcnNpc3ROZXN0KGBFeHRlbnNpb247UGVyc2lzdDske2NmZy5hYm91dC5zbHVnfWApO1xyXG4gIGNvbnN0IG91dCA9IHtcclxuICAgIG1vZHVsZXM6IHtcclxuICAgICAgX19jYWNoZV9fOiB7XHJcbiAgICAgICAgY29tbW9uOiB7fSxcclxuICAgICAgICBub2RlOiB7fSxcclxuICAgICAgICBjdXN0b206IHt9LFxyXG4gICAgICAgIGN1c3RvbUxhenk6IHt9XHJcbiAgICAgIH0sXHJcbiAgICAgIHJlcXVpcmUobmFtZSkge1xyXG4gICAgICAgIGlmICghZGV2LmVuYWJsZWQpIHtcclxuICAgICAgICAgIGlmICh0eXBlb2Ygb3V0Lm1vZHVsZXMuX19jYWNoZV9fLm5vZGVbbmFtZV0gIT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBvdXQubW9kdWxlcy5fX2NhY2hlX18ubm9kZVtuYW1lXTtcclxuICAgICAgICAgIGlmIChjZmc/Lm1vZHVsZXM/Lm5vZGU/LnNvbWU/LihpID0+IGkubmFtZSA9PT0gbmFtZSkpIHJldHVybiBvdXQubW9kdWxlcy5fX2NhY2hlX18ubm9kZVtuYW1lXSA9IG1vZHVsZXMucmVxdWlyZShuYW1lKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmV0dXJuIG1vZHVsZXMucmVxdWlyZShuYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgIH0sXHJcbiAgICAgIGNvbW1vbjogbmV3IFByb3h5KHt9LCB7XHJcbiAgICAgICAgZ2V0KF8sIHByb3ApIHtcclxuICAgICAgICAgIGlmICghZGV2LmVuYWJsZWQpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvdXQubW9kdWxlcy5fX2NhY2hlX18uY29tbW9uW3Byb3BdICE9PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gb3V0Lm1vZHVsZXMuX19jYWNoZV9fLmNvbW1vbltwcm9wXTtcclxuICAgICAgICAgICAgaWYgKGNmZz8ubW9kdWxlcz8uY29tbW9uPy5zb21lPy4oaSA9PiBpLm5hbWUgPT09IHByb3ApKSByZXR1cm4gb3V0Lm1vZHVsZXMuX19jYWNoZV9fLmNvbW1vbltwcm9wXSA9IG1vZHVsZXMuY29tbW9uW3Byb3BdO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG1vZHVsZXMuY29tbW9uW3Byb3BdO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSksXHJcbiAgICAgIGN1c3RvbTogbmV3IFByb3h5KHt9LCB7XHJcbiAgICAgICAgZ2V0KF8sIHByb3ApIHtcclxuICAgICAgICAgIGlmICh0eXBlb2Ygb3V0Lm1vZHVsZXMuX19jYWNoZV9fLmN1c3RvbVtwcm9wXSAhPT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIG91dC5tb2R1bGVzLl9fY2FjaGVfXy5jdXN0b21bcHJvcF07XHJcbiAgICAgICAgICBsZXQgZGF0YSA9IGNmZz8ubW9kdWxlcz8uY3VzdG9tPy5zb21lPy4oaSA9PiBpLm5hbWUgPT09IHByb3ApO1xyXG4gICAgICAgICAgaWYgKCFkYXRhKSByZXR1cm4gbnVsbDtcclxuICAgICAgICAgIGlmIChkYXRhLmxhenkpIHtcclxuICAgICAgICAgICAgbGV0IHByb20gPSBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgbGV0IHIgPSBhd2FpdCBtb2R1bGVzLndlYnBhY2subGF6eUZpbmRCeUZpbmRlcihkYXRhLmZpbmRlcik7XHJcbiAgICAgICAgICAgICAgb3V0Lm1vZHVsZXMuX19jYWNoZV9fLmN1c3RvbUxhenlbcHJvcF0gPSByO1xyXG4gICAgICAgICAgICAgIHJlc29sdmUocik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBvdXQubW9kdWxlcy5fX2NhY2hlX18uY3VzdG9tW3Byb3BdID0ge1xyXG4gICAgICAgICAgICAgIGdldCgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBwcm9tO1xyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgZ2V0IHZhbHVlKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG91dC5tb2R1bGVzLl9fY2FjaGVfXy5jdXN0b21MYXp5W3Byb3BdO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IG1vZHVsZXMud2VicGFjay5maW5kQnlGaW5kZXIoZGF0YS5maW5kZXIpO1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWU/LnZhbHVlICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgICAgICBvdXQubW9kdWxlcy5fX2NhY2hlX18uY3VzdG9tW3Byb3BdID0gdmFsdWUgPyBPYmplY3QuYXNzaWduKHZhbHVlLCB7IHZhbHVlLCBnZXQoKSB7IHJldHVybiB2YWx1ZSB9IH0pIDogbnVsbDtcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgb3V0Lm1vZHVsZXMuX19jYWNoZV9fLmN1c3RvbVtwcm9wXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBjYXRjaCB7XHJcbiAgICAgICAgICAgICAgb3V0Lm1vZHVsZXMuX19jYWNoZV9fLmN1c3RvbVtwcm9wXSA9IHZhbHVlID8geyB2YWx1ZSwgZ2V0KCkgeyByZXR1cm4gdmFsdWUgfSB9IDogbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIG91dC5tb2R1bGVzLl9fY2FjaGVfXy5jdXN0b21bcHJvcF07XHJcbiAgICAgICAgfVxyXG4gICAgICB9KSxcclxuICAgIH0sXHJcbiAgICBpMThuLFxyXG4gICAgZXh0ZW5zaW9uOiB7XHJcbiAgICAgIGNvbmZpZzogSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShjZmcpKSxcclxuICAgICAgcGVyc2lzdCxcclxuICAgICAgaTE4bjogYXdhaXQgYnVpbGRFeHRlbnNpb25JMThOKGNmZyksXHJcbiAgICAgIGV2ZW50czogbmV3IEJhc2ljRXZlbnRFbWl0dGVyKClcclxuICAgIH1cclxuICB9O1xyXG5cclxuICByZXR1cm4gb3V0O1xyXG59XHJcblxyXG5jb25zdCBvdXQgPSB7XHJcbiAgX19jYWNoZV9fOiB7XHJcbiAgICBpbml0aWFsaXplZDogZmFsc2UsXHJcbiAgICBsb2FkZWQ6IG5lc3RzLm1ha2Uoe30pXHJcbiAgfSxcclxuICBzdG9yYWdlOiB7XHJcbiAgICAvKiogQHR5cGUge25lc3RzLk5lc3R9ICovXHJcbiAgICBpbnN0YWxsZWQ6IHt9XHJcbiAgfSxcclxuICBidWlsZEFQSSxcclxuICBhc3luYyBpbml0KCkge1xyXG4gICAgaWYgKG91dC5fX2NhY2hlX18uaW5pdGlhbGl6ZWQpIHJldHVybjtcclxuICAgIG91dC5fX2NhY2hlX18uaW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG4gICAgb3V0LnN0b3JhZ2UuaW5zdGFsbGVkID0gYXdhaXQgc3RvcmFnZS5jcmVhdGVQZXJzaXN0TmVzdChcIkV4dGVuc2lvbnM7SW5zdGFsbGVkXCIpO1xyXG4gIH0sXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHVybCBcclxuICAgKi9cclxuICBhc3luYyBpbnN0YWxsKHVybCwgZGVmYXVsdENvbmZpZyA9IHt9KSB7XHJcbiAgICBpZiAoIW91dC5fX2NhY2hlX18uaW5pdGlhbGl6ZWQpIGF3YWl0IG91dC5pbml0KCk7XHJcbiAgICBpZiAodXJsLmVuZHNXaXRoKFwiL1wiKSkgdXJsID0gdXJsLnNsaWNlKDAsIC0xKTtcclxuICAgIGlmIChvdXQuc3RvcmFnZS5pbnN0YWxsZWQuZ2hvc3RbdXJsXSkgdGhyb3cgbmV3IEVycm9yKGBcIiR7dXJsfVwiIGV4dGVuc2lvbiBpcyBhbHJlYWR5IGluc3RhbGxlZC5gKTtcclxuXHJcbiAgICBsZXQgbWV0YVJlc3AgPSBhd2FpdCBmZXRjaChgJHt1cmx9L21ldGFkYXRhLmpzb25gKTtcclxuICAgIGlmIChtZXRhUmVzcC5zdGF0dXMgIT09IDIwMCkgdGhyb3cgbmV3IEVycm9yKGBcIiR7dXJsfVwiIGV4dGVuc2lvbiBtZXRhZGF0YSBpcyBub3QgcmVzcG9uZGVkIHdpdGggMjAwIHN0YXR1cyBjb2RlLmApO1xyXG4gICAgbGV0IG1ldGFkYXRhID0gYXdhaXQgbWV0YVJlc3AuanNvbigpO1xyXG5cclxuICAgIGxldCByZWFkbWVSZXNwID0gYXdhaXQgZmV0Y2goYCR7dXJsfS9yZWFkbWUubWRgKTtcclxuICAgIGxldCByZWFkbWUgPSByZWFkbWVSZXNwLnN0YXR1cyA9PT0gMjAwID8gYXdhaXQgcmVhZG1lUmVzcC50ZXh0KCkgOiBudWxsO1xyXG5cclxuICAgIC8vIFRPRE86IFNob3cgbW9kYWwgZm9yIHVzZXIgdG8gYWNjZXB0IHRoZSBleHRlbnNpb24gKHRlcm1zLCBwcml2YWN5LCBldGMuKVxyXG5cclxuICAgIGxldCBzb3VyY2VSZXNwID0gYXdhaXQgZmV0Y2goYCR7dXJsfS9zb3VyY2UuanNgKTtcclxuICAgIGlmIChzb3VyY2VSZXNwLnN0YXR1cyAhPT0gMjAwKSB0aHJvdyBuZXcgRXJyb3IoYFwiJHt1cmx9XCIgZXh0ZW5zaW9uIHNvdXJjZSBpcyBub3QgcmVzcG9uZGVkIHdpdGggMjAwIHN0YXR1cyBjb2RlLmApO1xyXG4gICAgbGV0IHNvdXJjZSA9IGF3YWl0IHNvdXJjZVJlc3AudGV4dCgpO1xyXG5cclxuXHJcbiAgICBvdXQuc3RvcmFnZS5pbnN0YWxsZWQuc3RvcmVbdXJsXSA9IHtcclxuICAgICAgbWV0YWRhdGE6IHtcclxuICAgICAgICBjdXJyZW50OiBtZXRhZGF0YSxcclxuICAgICAgICBsYXN0OiBtZXRhZGF0YVxyXG4gICAgICB9LFxyXG4gICAgICBzb3VyY2UsXHJcbiAgICAgIHJlYWRtZSxcclxuICAgICAgY29uZmlnOiB7XHJcbiAgICAgICAgYXV0b1VwZGF0ZTogdHJ1ZSxcclxuICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgIC4uLmRlZmF1bHRDb25maWdcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBvdXQubG9hZCh1cmwpO1xyXG4gIH0sXHJcbiAgYXN5bmMgdW5pbnN0YWxsKHVybCkge1xyXG4gICAgaWYgKCFvdXQuX19jYWNoZV9fLmluaXRpYWxpemVkKSBhd2FpdCBvdXQuaW5pdCgpO1xyXG4gICAgaWYgKCFvdXQuc3RvcmFnZS5pbnN0YWxsZWQuZ2hvc3RbdXJsXSkgdGhyb3cgbmV3IEVycm9yKGBcIiR7dXJsfVwiIGV4dGVuc2lvbiBpcyBub3QgaW5zdGFsbGVkLmApO1xyXG5cclxuICAgIGRlbGV0ZSBvdXQuc3RvcmFnZS5pbnN0YWxsZWQuc3RvcmVbdXJsXTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBhd2FpdCBvdXQudW5sb2FkKHVybCk7XHJcbiAgICB9IGNhdGNoIHsgfVxyXG4gIH0sXHJcbiAgYXN5bmMgbG9hZCh1cmwpIHtcclxuICAgIGlmICghb3V0Ll9fY2FjaGVfXy5pbml0aWFsaXplZCkgYXdhaXQgb3V0LmluaXQoKTtcclxuICAgIGlmICghb3V0LnN0b3JhZ2UuaW5zdGFsbGVkLmdob3N0W3VybF0pIHRocm93IG5ldyBFcnJvcihgXCIke3VybH1cIiBleHRlbnNpb24gaXMgbm90IGluc3RhbGxlZC5gKTtcclxuICAgIGxldCBkYXRhID0gb3V0LnN0b3JhZ2UuaW5zdGFsbGVkLmdob3N0W3VybF07XHJcblxyXG4gICAgaWYgKG91dC5fX2NhY2hlX18ubG9hZGVkLmdob3N0W3VybF0pIHRocm93IG5ldyBFcnJvcihgXCIke3VybH1cIiBleHRlbnNpb24gaXMgYWxyZWFkeSBsb2FkZWQuYCk7XHJcblxyXG4gICAgbGV0IGFwaSA9IGF3YWl0IG91dC5idWlsZEFQSShkYXRhLm1ldGFkYXRhKTtcclxuXHJcbiAgICBsZXQgZXZhbHVhdGVkID0gb3V0LmV2YWx1YXRlKGRhdGEuc291cmNlLCBhcGkpO1xyXG5cclxuICAgIGF3YWl0IGV2YWx1YXRlZD8ubG9hZD8uKCk7XHJcblxyXG4gICAgb3V0Ll9fY2FjaGVfXy5sb2FkZWQuc3RvcmVbdXJsXSA9IHtcclxuICAgICAgZXZhbHVhdGVkLFxyXG4gICAgICBhcGlcclxuICAgIH07XHJcbiAgfSxcclxuICBhc3luYyB1bmxvYWQodXJsKSB7XHJcbiAgICBpZiAoIW91dC5fX2NhY2hlX18uaW5pdGlhbGl6ZWQpIGF3YWl0IG91dC5pbml0KCk7XHJcbiAgICBpZiAoIW91dC5zdG9yYWdlLmluc3RhbGxlZC5naG9zdFt1cmxdKSB0aHJvdyBuZXcgRXJyb3IoYFwiJHt1cmx9XCIgZXh0ZW5zaW9uIGlzIG5vdCBpbnN0YWxsZWQuYCk7XHJcblxyXG4gICAgaWYgKCFvdXQuX19jYWNoZV9fLmxvYWRlZC5naG9zdFt1cmxdKSB0aHJvdyBuZXcgRXJyb3IoYFwiJHt1cmx9XCIgZXh0ZW5zaW9uIGlzIG5vdCBsb2FkZWQuYCk7XHJcblxyXG4gICAgbGV0IHsgZXZhbHVhdGVkIH0gPSBvdXQuX19jYWNoZV9fLmxvYWRlZC5naG9zdFt1cmxdO1xyXG5cclxuICAgIGF3YWl0IGV2YWx1YXRlZD8udW5sb2FkPy4oKTtcclxuXHJcbiAgICBkZWxldGUgb3V0Ll9fY2FjaGVfXy5sb2FkZWQuc3RvcmVbdXJsXTtcclxuICB9LFxyXG4gIGV2YWx1YXRlKHNvdXJjZSwgYXBpKSB7XHJcbiAgICBjb25zdCAkYWNvcmQgPSBhcGk7XHJcbiAgICByZXR1cm4gZXZhbChzb3VyY2UpO1xyXG4gIH0sXHJcbiAgYXN5bmMgbG9hZEFsbCgpIHtcclxuICAgIGlmICghb3V0Ll9fY2FjaGVfXy5pbml0aWFsaXplZCkgYXdhaXQgb3V0LmluaXQoKTtcclxuICAgIHJldHVybiBQcm9taXNlLmFsbChPYmplY3Qua2V5cyhvdXQuc3RvcmFnZS5pbnN0YWxsZWQuZ2hvc3QpLm1hcCh1cmwgPT4gb3V0LmxvYWQodXJsKSkpO1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IG91dDsiLCAiZXhwb3J0IGRlZmF1bHQge1xyXG4gIHByb2Nlc3M6IGdsb2JhbFRoaXNbXCI8UFJFTE9BRF9LRVk+XCJdLnByb2Nlc3MsXHJcbiAgaXNEZXZUb29sc09wZW46IGdsb2JhbFRoaXNbXCI8UFJFTE9BRF9LRVk+XCJdLmlzRGV2VG9vbHNPcGVuXHJcbn1cclxuXHJcbiIsICJpbXBvcnQgeyB3YWl0VW50aWxDb25uZWN0aW9uT3BlbiB9IGZyb20gXCIuLi8uLi9vdGhlci91dGlscy5qc1wiO1xyXG5pbXBvcnQgY29tbW9uIGZyb20gXCIuLi9tb2R1bGVzL2NvbW1vbi5qc1wiO1xyXG5pbXBvcnQgcGF0Y2hlciBmcm9tIFwiLi4vcGF0Y2hlci9pbmRleC5qc1wiO1xyXG5cclxuY29uc3Qgc29ja2V0cyA9IG5ldyBTZXQoKTtcclxuY29uc3QgaGFuZGxlcnMgPSBuZXcgTWFwKCk7XHJcblxyXG53YWl0VW50aWxDb25uZWN0aW9uT3BlbigpLnRoZW4oKCkgPT4ge1xyXG4gIHBhdGNoZXIuaW5zdGVhZChcclxuICAgIFwiaGFuZGxlQ29ubmVjdGlvblwiLFxyXG4gICAgY29tbW9uLldlYlNvY2tldCxcclxuICAgIChhcmdzLCBvcmlnKSA9PiB7XHJcbiAgICAgIGNvbnN0IHdzID0gYXJnc1swXTtcclxuICAgICAgaWYgKHdzLnVwZ3JhZGVSZXEoKS51cmwgIT09IFwiL2Fjb3JkXCIpIHJldHVybiBvcmlnKC4uLmFyZ3MpO1xyXG5cclxuICAgICAgc29ja2V0cy5hZGQod3MpO1xyXG5cclxuICAgICAgd3Mub24oXCJtZXNzYWdlXCIsIGFzeW5jIChtc2cpID0+IHtcclxuICAgICAgICBsZXQganNvbjtcclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIGpzb24gPSBKU09OLnBhcnNlKG1zZyk7XHJcbiAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoanNvbikgfHwganNvbi5sZW5ndGggPCAxIHx8IGpzb24ubGVuZ3RoID4gMylcclxuICAgICAgICAgICAgdGhyb3cgXCJBcnJheSBleHBlY3RlZCBhcyBtZXNzYWdlLlwiO1xyXG4gICAgICAgICAgaWYgKHR5cGVvZiBqc29uWzBdICE9IFwic3RyaW5nXCIpIHRocm93IFwiQXJyYXlbMF0gbmVlZHMgdG8gYmUgc3RyaW5nLlwiO1xyXG4gICAgICAgICAgaWYgKHR5cGVvZiBqc29uWzFdICE9IFwic3RyaW5nXCIpIHRocm93IFwiQXJyYXlbMV0gbmVlZHMgdG8gYmUgc3RyaW5nLlwiO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgd3Muc2VuZChcclxuICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoW1xyXG4gICAgICAgICAgICAgIG51bGwsXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgb2s6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgZXJyb3I6IGAke2Vycn1gLFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIF0pXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgW2V2ZW50SWQsIGV2ZW50TmFtZSwgZXZlbnREYXRhXSA9IGpzb247XHJcblxyXG4gICAgICAgIGNvbnN0IGhhbmRsZXIgPSBoYW5kbGVycy5nZXQoZXZlbnROYW1lKTtcclxuXHJcbiAgICAgICAgaWYgKCFoYW5kbGVyKVxyXG4gICAgICAgICAgcmV0dXJuIHdzLnNlbmQoXHJcbiAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KFtcclxuICAgICAgICAgICAgICBldmVudElkLFxyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG9rOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGVycm9yOiBgVW5hYmxlIHRvIGZpbmQgaGFuZGxlci5gLFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIF0pXHJcbiAgICAgICAgICApO1xyXG5cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgbGV0IHJlc3BvbnNlID0gYXdhaXQgaGFuZGxlcihldmVudERhdGEpO1xyXG4gICAgICAgICAgd3Muc2VuZChcclxuICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoW1xyXG4gICAgICAgICAgICAgIGV2ZW50SWQsXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgb2s6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiByZXNwb25zZSxcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBdKVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgIHdzLnNlbmQoXHJcbiAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KFtcclxuICAgICAgICAgICAgICBldmVudElkLFxyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG9rOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGVycm9yOiBgJHtlcnJ9YCxcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBdKVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgd3Mub24oXCJjbG9zZVwiLCAoKSA9PiBzb2NrZXRzLmRlbGV0ZSh3cykpO1xyXG4gICAgfVxyXG4gICk7XHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gc2V0KGV2ZW50TmFtZSwgY2FsbGJhY2spIHtcclxuICBpZiAodHlwZW9mIGV2ZW50TmFtZSAhPSBcInN0cmluZ1wiKVxyXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiRXZlbnROYW1lIG5lZWRzIHRvIGJlIGEgc3RyaW5nLlwiKTtcclxuICBpZiAodHlwZW9mIGNhbGxiYWNrICE9IFwiZnVuY3Rpb25cIilcclxuICAgIHRocm93IG5ldyBFcnJvcihcIkNhbGxiYWNrIG5lZWRzIHRvIGJlIGEgZnVuY3Rpb24uXCIpO1xyXG4gIGlmIChoYW5kbGVycy5oYXMoZXZlbnROYW1lKSlcclxuICAgIHRocm93IG5ldyBFcnJvcihcIkV2ZW50TmFtZSBhbHJlYWR5IGluIHVzZS5cIik7XHJcbiAgaGFuZGxlcnMuc2V0KGV2ZW50TmFtZSwgY2FsbGJhY2spO1xyXG4gIHJldHVybiAoKSA9PiB7XHJcbiAgICBoYW5kbGVycy5kZWxldGUoZXZlbnROYW1lKTtcclxuICB9O1xyXG59XHJcbmZ1bmN0aW9uIHRyaWdnZXIoZXZlbnROYW1lLCAuLi5hcmdzKSB7XHJcbiAgaWYgKCFzb2NrZXRFdmVudHMuaGFzKGV2ZW50TmFtZSkpXHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmFibGUgdG8gZmluZCBoYW5kbGVyIVwiKTtcclxuICByZXR1cm4gc29ja2V0RXZlbnRzLmdldChldmVudE5hbWUpKC4uLmFyZ3MpO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgc2V0LFxyXG4gIHRyaWdnZXJcclxufVxyXG5cclxuIiwgImV4cG9ydCBkZWZhdWx0IGBcbi5hY29yZC0tbGF5ZXItY29udGFpbmVyey0tdG9wLW9mZnNldDogMHB4O3dpZHRoOjEwMHZ3O2hlaWdodDpjYWxjKDEwMHZoIC0gdmFyKC0tdG9wLW9mZnNldCkpO3otaW5kZXg6OTk5OTk5OTtwb2ludGVyLWV2ZW50czpub25lO3Bvc2l0aW9uOmFic29sdXRlO3RvcDp2YXIoLS10b3Atb2Zmc2V0KTtsZWZ0OjBweH0uYWNvcmQtLWxheWVyLWNvbnRhaW5lciAqe3otaW5kZXg6OTk5OTk5OTk5OTk5OTl9LmFjb3JkLS10b29sdGlwLWxheWVye29wYWNpdHk6MDt0cmFuc2l0aW9uOjUwbXMgbGluZWFyIG9wYWNpdHk7cG9zaXRpb246YWJzb2x1dGU7cG9pbnRlci1ldmVudHM6bm9uZX0uYWNvcmQtLXRvb2x0aXAtbGF5ZXIudmlzaWJsZXtvcGFjaXR5OjE7cG9pbnRlci1ldmVudHM6YWxsfS5hY29yZC0tdG9vbHRpcC52ZXJ0aWNhbHt0cmFuc2Zvcm06dHJhbnNsYXRlWCgtNTAlKX0uYWNvcmQtLXRvb2x0aXAuaG9yaXpvbnRhbHt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtNTAlKX0uYWNvcmQtLXRvYXN0cy1jb250YWluZXJ7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1lbmQ7ZmxleC1kaXJlY3Rpb246Y29sdW1uO3dpZHRoOjEwMHZ3O2hlaWdodDpjYWxjKDEwMHZoIC0gdmFyKC0tdG9wLW9mZnNldCkpO3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6MDtwb2ludGVyLWV2ZW50czpub25lO3BhZGRpbmctYm90dG9tOjMycHh9LmFjb3JkLS10b2FzdHMtY29udGFpbmVyIC5hY29yZC0tdG9hc3R7dHJhbnNpdGlvbjp0cmFuc2Zvcm0gMjUwbXMgZWFzZS1pbi1vdXQsb3BhY2l0eSAyNTBtcyBlYXNlLWluLW91dDtkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO3BvaW50ZXItZXZlbnRzOm5vbmU7Ym9yZGVyLXJhZGl1czo0cHg7cGFkZGluZzo4cHg7Ym94LXNoYWRvdzowcHggMnB4IDhweCByZ2JhKDAsMCwwLC4yNSk7b3BhY2l0eToxO2dhcDo4cHg7Zm9udC1zaXplOjE0cHg7bWFyZ2luOjRweH0uYWNvcmQtLXRvYXN0cy1jb250YWluZXIgLmFjb3JkLS10b2FzdCBzdmd7d2lkdGg6MTZweDtoZWlnaHQ6MTZweH0uYWNvcmQtLXRvYXN0cy1jb250YWluZXIgLmFjb3JkLS10b2FzdC5jbGlja2FibGV7Y3Vyc29yOnBvaW50ZXI7cG9pbnRlci1ldmVudHM6YWxsfS5hY29yZC0tdG9hc3RzLWNvbnRhaW5lciAuYWNvcmQtLXRvYXN0LmNsb3Npbmd7b3BhY2l0eTowO3RyYW5zZm9ybTp0cmFuc2xhdGUoMCwgLTUwcHgpfS5hY29yZC0tdG9hc3RzLWNvbnRhaW5lciAuYWNvcmQtLXRvYXN0LmhpZGRlbntvcGFjaXR5OjA7dHJhbnNmb3JtOnRyYW5zbGF0ZSgwLCA1MHB4KX0uYWNvcmQtLXRvYXN0cy1jb250YWluZXIgLmFjb3JkLS10b2FzdC5zdHlsZS1pbmZve2JhY2tncm91bmQtY29sb3I6IzRhOGZlMTtjb2xvcjojZjVmNWY1fS5hY29yZC0tdG9hc3RzLWNvbnRhaW5lciAuYWNvcmQtLXRvYXN0LnN0eWxlLXdhcm5pbmd7YmFja2dyb3VuZC1jb2xvcjojZmFhODFhO2NvbG9yOiMwMDB9LmFjb3JkLS10b2FzdHMtY29udGFpbmVyIC5hY29yZC0tdG9hc3Quc3R5bGUtZXJyb3J7YmFja2dyb3VuZC1jb2xvcjojZWQ0MjQ1O2NvbG9yOiMwMDB9LmFjb3JkLS10b2FzdHMtY29udGFpbmVyIC5hY29yZC0tdG9hc3Quc3R5bGUtc3VjY2Vzc3tiYWNrZ3JvdW5kLWNvbG9yOiMzYmE1NWQ7Y29sb3I6I2Y1ZjVmNX0uYWNvcmQtLXRvYXN0cy1jb250YWluZXIgLmFjb3JkLS10b2FzdC5zdHlsZS1kZWZhdWx0e2JhY2tncm91bmQtY29sb3I6I2Y1ZjVmNTtjb2xvcjojMDAwfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVye3dpZHRoOjEwMHZ3O2hlaWdodDpjYWxjKDEwMHZoIC0gdmFyKC0tdG9wLW9mZnNldCkpO2Rpc3BsYXk6ZmxleDtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtsZWZ0OjA7cG9pbnRlci1ldmVudHM6bm9uZX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllciAuYWNvcmQtLW5vdGlmaWNhdGlvbntkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1uO3BvaW50ZXItZXZlbnRzOmFsbDt0cmFuc2l0aW9uOnRyYW5zZm9ybSAyNTBtcyBlYXNlLWluLW91dCxvcGFjaXR5IDI1MG1zIGVhc2UtaW4tb3V0O21hcmdpbjo0cHg7YmFja2Ryb3AtZmlsdGVyOmJsdXIoMTZweCkgYnJpZ2h0bmVzcygwLjc1KTstd2Via2l0LWFwcC1yZWdpb246bm8tZHJhZzstLWFuaW1hdGlvbi1zaXplOiA1MHB4fS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyIC5hY29yZC0tbm90aWZpY2F0aW9uLmhpZGRlbiwuYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllciAuYWNvcmQtLW5vdGlmaWNhdGlvbi5jbG9zaW5ne29wYWNpdHk6MH0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllciAuYWNvcmQtLW5vdGlmaWNhdGlvbj4uY29udGFpbmVye2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47cGFkZGluZzo4cHg7Y29sb3I6I2ZmZjttaW4td2lkdGg6MjUwcHh9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24+LmNvbnRhaW5lcj4uY2xvc2V7d2lkdGg6MjRweDtoZWlnaHQ6MjRweDtjb2xvcjojZmZmO29wYWNpdHk6LjU7Y3Vyc29yOnBvaW50ZXI7bWFyZ2luLWxlZnQ6OHB4O3otaW5kZXg6OTk5OTk5OTk5fS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyIC5hY29yZC0tbm90aWZpY2F0aW9uPi5jb250YWluZXI+LmNsb3NlLmhpZGRlbntkaXNwbGF5Om5vbmV9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24+LnByb2dyZXNzLWNvbnRhaW5lcnt3aWR0aDoxMDAlO2hlaWdodDo1cHh9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24+LnByb2dyZXNzLWNvbnRhaW5lcj4ucHJvZ3Jlc3N7d2lkdGg6MCU7aGVpZ2h0OjVweDt0cmFuc2l0aW9uOndpZHRoIHZhcigtLWR1cmF0aW9uKSBsaW5lYXI7YmFja2dyb3VuZC1jb2xvcjp2YXIoLS1iYXItY29sb3IpfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyIC5hY29yZC0tbm90aWZpY2F0aW9uPi5wcm9ncmVzcy1jb250YWluZXI+LnByb2dyZXNzLnByb2dyZXNzaW5ne3dpZHRoOjEwMCV9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24uc3R5bGUtaW5mb3stLWJhci1jb2xvcjogIzRhOGZlMX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllciAuYWNvcmQtLW5vdGlmaWNhdGlvbi5zdHlsZS13YXJuaW5ney0tYmFyLWNvbG9yOiAjZmFhODFhfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyIC5hY29yZC0tbm90aWZpY2F0aW9uLnN0eWxlLWVycm9yey0tYmFyLWNvbG9yOiAjZWQ0MjQ1fS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyIC5hY29yZC0tbm90aWZpY2F0aW9uLnN0eWxlLXN1Y2Nlc3N7LS1iYXItY29sb3I6ICMzYmE1NWR9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24uc3R5bGUtZGVmYXVsdHstLWJhci1jb2xvcjogd2hpdGVzbW9rZX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci50b3AtcmlnaHR7anVzdGlmeS1jb250ZW50OmZsZXgtZW5kO2FsaWduLWl0ZW1zOmZsZXgtc3RhcnR9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIudG9wLXJpZ2h0IC5hY29yZC0tbm90aWZpY2F0aW9uLmhpZGRlbnt0cmFuc2Zvcm06dHJhbnNsYXRlKDAsIGNhbGModmFyKC0tYW5pbWF0aW9uLXNpemUpICogLTEpKX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci50b3AtcmlnaHQgLmFjb3JkLS1ub3RpZmljYXRpb24uY2xvc2luZ3t0cmFuc2Zvcm06dHJhbnNsYXRlKDAsIHZhcigtLWFuaW1hdGlvbi1zaXplKSl9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIudG9wLWxlZnR7anVzdGlmeS1jb250ZW50OmZsZXgtc3RhcnQ7YWxpZ24taXRlbXM6ZmxleC1zdGFydH0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci50b3AtbGVmdCAuYWNvcmQtLW5vdGlmaWNhdGlvbi5oaWRkZW57dHJhbnNmb3JtOnRyYW5zbGF0ZSgwLCBjYWxjKHZhcigtLWFuaW1hdGlvbi1zaXplKSAqIC0xKSl9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIudG9wLWxlZnQgLmFjb3JkLS1ub3RpZmljYXRpb24uY2xvc2luZ3t0cmFuc2Zvcm06dHJhbnNsYXRlKDAsIHZhcigtLWFuaW1hdGlvbi1zaXplKSl9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIuYm90dG9tLXJpZ2h0e2p1c3RpZnktY29udGVudDpmbGV4LWVuZDthbGlnbi1pdGVtczpmbGV4LWVuZH0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci5ib3R0b20tcmlnaHQgLmFjb3JkLS1ub3RpZmljYXRpb24uaGlkZGVue3RyYW5zZm9ybTp0cmFuc2xhdGUoMCwgdmFyKC0tYW5pbWF0aW9uLXNpemUpKX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci5ib3R0b20tcmlnaHQgLmFjb3JkLS1ub3RpZmljYXRpb24uY2xvc2luZ3t0cmFuc2Zvcm06dHJhbnNsYXRlKDAsIGNhbGModmFyKC0tYW5pbWF0aW9uLXNpemUpICogLTEpKX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci5ib3R0b20tbGVmdHtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1zdGFydDthbGlnbi1pdGVtczpmbGV4LWVuZH0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci5ib3R0b20tbGVmdCAuYWNvcmQtLW5vdGlmaWNhdGlvbi5oaWRkZW57dHJhbnNmb3JtOnRyYW5zbGF0ZSgwLCB2YXIoLS1hbmltYXRpb24tc2l6ZSkpfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLmJvdHRvbS1sZWZ0IC5hY29yZC0tbm90aWZpY2F0aW9uLmNsb3Npbmd7dHJhbnNmb3JtOnRyYW5zbGF0ZSgwLCBjYWxjKHZhcigtLWFuaW1hdGlvbi1zaXplKSAqIC0xKSl9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIudG9wLWNlbnRlcntqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO2FsaWduLWl0ZW1zOmZsZXgtc3RhcnR9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIudG9wLWNlbnRlciAuYWNvcmQtLW5vdGlmaWNhdGlvbi5oaWRkZW57dHJhbnNmb3JtOnRyYW5zbGF0ZSgwLCBjYWxjKHZhcigtLWFuaW1hdGlvbi1zaXplKSAqIC0xKSl9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIudG9wLWNlbnRlciAuYWNvcmQtLW5vdGlmaWNhdGlvbi5jbG9zaW5ne3RyYW5zZm9ybTp0cmFuc2xhdGUoMCwgdmFyKC0tYW5pbWF0aW9uLXNpemUpKX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci5ib3R0b20tY2VudGVye2p1c3RpZnktY29udGVudDpjZW50ZXI7YWxpZ24taXRlbXM6ZmxleC1lbmR9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIuYm90dG9tLWNlbnRlciAuYWNvcmQtLW5vdGlmaWNhdGlvbi5oaWRkZW57dHJhbnNmb3JtOnRyYW5zbGF0ZSgwLCB2YXIoLS1hbmltYXRpb24tc2l6ZSkpfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLmJvdHRvbS1jZW50ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24uY2xvc2luZ3t0cmFuc2Zvcm06dHJhbnNsYXRlKDAsIGNhbGModmFyKC0tYW5pbWF0aW9uLXNpemUpICogLTEpKX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci5jZW50ZXJ7anVzdGlmeS1jb250ZW50OmNlbnRlcjthbGlnbi1pdGVtczpjZW50ZXJ9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIuY2VudGVyIC5hY29yZC0tbm90aWZpY2F0aW9uLmhpZGRlbnt0cmFuc2Zvcm06c2NhbGUoMC41KX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci5jZW50ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24uY2xvc2luZ3t0cmFuc2Zvcm06c2NhbGUoMC41KX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci5sZWZ0LWNlbnRlcntqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1zdGFydDthbGlnbi1pdGVtczpjZW50ZXJ9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIubGVmdC1jZW50ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24uaGlkZGVue3RyYW5zZm9ybTp0cmFuc2xhdGUoY2FsYyh2YXIoLS1hbmltYXRpb24tc2l6ZSkgKiAtMSksIDApfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLmxlZnQtY2VudGVyIC5hY29yZC0tbm90aWZpY2F0aW9uLmNsb3Npbmd7dHJhbnNmb3JtOnRyYW5zbGF0ZSh2YXIoLS1hbmltYXRpb24tc2l6ZSksIDApfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLnJpZ2h0LWNlbnRlcntqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1lbmQ7YWxpZ24taXRlbXM6Y2VudGVyfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLnJpZ2h0LWNlbnRlciAuYWNvcmQtLW5vdGlmaWNhdGlvbi5oaWRkZW57dHJhbnNmb3JtOnRyYW5zbGF0ZSh2YXIoLS1hbmltYXRpb24tc2l6ZSksIDApfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLnJpZ2h0LWNlbnRlciAuYWNvcmQtLW5vdGlmaWNhdGlvbi5jbG9zaW5ne3RyYW5zZm9ybTp0cmFuc2xhdGUoY2FsYyh2YXIoLS1hbmltYXRpb24tc2l6ZSkgKiAtMSksIDApfWA7XG4iLCAiaW1wb3J0IGRvbSBmcm9tIFwiLi4vZG9tL2luZGV4LmpzXCI7XHJcbmltcG9ydCBldmVudHMgZnJvbSBcIi4uL2V2ZW50cy9pbmRleC5qc1wiO1xyXG5pbXBvcnQgd2VicGFjayBmcm9tIFwiLi4vbW9kdWxlcy93ZWJwYWNrLmpzXCI7XHJcblxyXG5jb25zdCB0b29sdGlwQ2xhc3NlcyA9IHdlYnBhY2suZmluZEJ5UHJvcGVydGllcyhcInRvb2x0aXBDb250ZW50QWxsb3dPdmVyZmxvd1wiLCBcInRvb2x0aXBcIik7XHJcblxyXG5jb25zdCB0b29sdGlwUG9zaXRpb25zID0ge1xyXG4gIHRvcDogdG9vbHRpcENsYXNzZXMudG9vbHRpcFRvcCxcclxuICBib3R0b206IHRvb2x0aXBDbGFzc2VzLnRvb2x0aXBCb3R0b20sXHJcbiAgbGVmdDogdG9vbHRpcENsYXNzZXMudG9vbHRpcExlZnQsXHJcbiAgcmlnaHQ6IHRvb2x0aXBDbGFzc2VzLnRvb2x0aXBSaWdodCxcclxufVxyXG5cclxuY2xhc3MgVG9vbHRpcCB7XHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtIVE1MRGl2RWxlbWVudH0gdGFyZ2V0IFxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfEhUTUxEaXZFbGVtZW50fSBjb250ZW50XHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IodGFyZ2V0LCBjb250ZW50LCBwb3NpdGlvbiA9IFwiYXV0b1wiKSB7XHJcbiAgICAvKiogQHR5cGUge0hUTUxEaXZFbGVtZW50fSAqL1xyXG4gICAgdGhpcy5sYXllckVsZW1lbnQgPSBkb20ucGFyc2UoYFxyXG4gICAgICA8ZGl2IGNsYXNzPVwiYWNvcmQtLXRvb2x0aXAtbGF5ZXJcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiJHt0b29sdGlwQ2xhc3Nlcy50b29sdGlwfSAke3Rvb2x0aXBDbGFzc2VzLnRvb2x0aXBQcmltYXJ5fSBhY29yZC0tdG9vbHRpcFwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cIiR7dG9vbHRpcENsYXNzZXMudG9vbHRpcFBvaW50ZXJ9IGFjb3JkLS10b29sdGlwLXBvaW50ZXJcIj48L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCIke3Rvb2x0aXBDbGFzc2VzLnRvb2x0aXBDb250ZW50fSBhY29yZC0tdG9vbHRpcC1jb250ZW50XCI+PC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgYCk7XHJcbiAgICB0aGlzLnRvb2x0aXBFbGVtZW50ID0gdGhpcy5sYXllckVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5hY29yZC0tdG9vbHRpcFwiKTtcclxuICAgIHRoaXMuY29udGVudEVsZW1lbnQgPSB0aGlzLmxheWVyRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmFjb3JkLS10b29sdGlwLWNvbnRlbnRcIik7XHJcbiAgICB0aGlzLmNvbnRlbnQgPSBjb250ZW50O1xyXG4gICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XHJcblxyXG4gICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XHJcbiAgICB0aGlzLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLnBhdXNlZCA9IGZhbHNlO1xyXG5cclxuICAgIGNvbnN0IG9uTW91c2VFbnRlciA9ICgpID0+IHtcclxuICAgICAgaWYgKHRoaXMuZGlzYWJsZWQgfHwgdGhpcy5wYXVzZWQpIHJldHVybjtcclxuICAgICAgdGhpcy5zaG93KCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgb25Nb3VzZUxlYXZlID0gKCkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5wYXVzZWQpIHJldHVybjtcclxuICAgICAgdGhpcy5oaWRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy50YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgb25Nb3VzZUVudGVyKTtcclxuICAgIHRoaXMudGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIG9uTW91c2VMZWF2ZSk7XHJcblxyXG4gICAgbGV0IHVuUGF0Y2hPYnNlcnZlciA9IGV2ZW50cy5vbihcclxuICAgICAgXCJkb20tbXV0YXRpb25cIixcclxuICAgICAgLyoqIEBwYXJhbSB7TXV0YXRpb25SZWNvcmR9IG11dCAqLyhtdXQpID0+IHtcclxuICAgICAgICBpZiAobXV0LnR5cGUgPT09IFwiYXR0cmlidXRlc1wiKSB7XHJcbiAgICAgICAgICBpZiAobXV0LnRhcmdldC5pc1NhbWVOb2RlKHRoaXMudGFyZ2V0KSkge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG11dC5hdHRyaWJ1dGVOYW1lKSB7XHJcbiAgICAgICAgICAgICAgY2FzZSBcImFjb3JkLS10b29sdGlwLWRpc2FibGVkXCI6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlzYWJsZWQgPSB0aGlzLnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJhY29yZC0tdG9vbHRpcC1kaXNhYmxlZFwiKSA9PT0gXCJ0cnVlXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgY2FzZSBcImFjb3JkLS10b29sdGlwLWNvbnRlbnRcIjoge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50ID0gdGhpcy50YXJnZXQuZ2V0QXR0cmlidXRlKFwiYWNvcmQtLXRvb2x0aXAtY29udGVudFwiKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBjYXNlIFwiYWNvcmQtLXRvb2x0aXAtcG9zaXRpb25cIjoge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHRoaXMudGFyZ2V0LmdldEF0dHJpYnV0ZShcImFjb3JkLS10b29sdGlwLXBvc2l0aW9uXCIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICApXHJcblxyXG4gICAgdGhpcy5kZXN0cm95ID0gKCkgPT4ge1xyXG4gICAgICB0aGlzLnRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCBvbk1vdXNlRW50ZXIpO1xyXG4gICAgICB0aGlzLnRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCBvbk1vdXNlTGVhdmUpO1xyXG4gICAgICB0aGlzLmhpZGUoKTtcclxuICAgICAgdW5QYXRjaE9ic2VydmVyKCk7XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgZ2V0IGNvbnRlbnQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jb250ZW50RWxlbWVudC5maXJzdEVsZW1lbnRDaGlsZDtcclxuICB9XHJcblxyXG4gIHNldCBjb250ZW50KHZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgIHRoaXMuY29udGVudEVsZW1lbnQuaW5uZXJIVE1MID0gdmFsdWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmNvbnRlbnRFbGVtZW50LmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICAgIHRoaXMuY29udGVudEVsZW1lbnQuYXBwZW5kQ2hpbGQodmFsdWUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIGdldENvbnRhaW5lcigpIHtcclxuICAgIGNvbnN0IGFwcEVsbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tjbGFzcyo9XCJub3REZXZUb29scy1cIl0nKTtcclxuXHJcbiAgICBsZXQgY29udGFpbmVyID0gYXBwRWxtLnF1ZXJ5U2VsZWN0b3IoXCIuYWNvcmQtLXRvb2x0aXAtY29udGFpbmVyXCIpO1xyXG4gICAgaWYgKCFjb250YWluZXIpIHtcclxuICAgICAgY29udGFpbmVyID0gZG9tLnBhcnNlKGA8ZGl2IGNsYXNzPVwiYWNvcmQtLWxheWVyLWNvbnRhaW5lciBhY29yZC0tdG9vbHRpcC1jb250YWluZXJcIj48L2Rpdj5gKTtcclxuICAgICAgYXBwRWxtLmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XHJcbiAgICB9XHJcbiAgICBjb250YWluZXIuc3R5bGUuc2V0UHJvcGVydHkoXCItLXRvcC1vZmZzZXRcIiwgYCR7YXBwRWxtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcC50b0ZpeGVkKDEpfXB4YCk7XHJcblxyXG4gICAgcmV0dXJuIGNvbnRhaW5lcjtcclxuICB9XHJcblxyXG4gIHNob3coKSB7XHJcbiAgICBpZiAodGhpcy52aXNpYmxlKSByZXR1cm47XHJcbiAgICB0aGlzLnZpc2libGUgPSB0cnVlO1xyXG5cclxuICAgIGNvbnN0IGNvbnRhaW5lciA9IFRvb2x0aXAuZ2V0Q29udGFpbmVyKCk7XHJcblxyXG4gICAgaWYgKHRoaXMucG9zaXRpb24gPT09IFwiYXV0b1wiKSB7XHJcbiAgICAgIHRoaXMuY2FsY3VsYXRlUG9zaXRpb24oXHJcbiAgICAgICAgdGhpcy5jYW5TaG93QXRUb3AgPyBcInRvcFwiXHJcbiAgICAgICAgICA6IHRoaXMuY2FuU2hvd0F0Qm90dG9tID8gXCJib3R0b21cIlxyXG4gICAgICAgICAgICA6IHRoaXMuY2FuU2hvd0F0TGVmdCA/IFwibGVmdFwiXHJcbiAgICAgICAgICAgICAgOiB0aGlzLmNhblNob3dBdFJpZ2h0ID8gXCJyaWdodFwiXHJcbiAgICAgICAgICAgICAgICA6IFwidG9wXCJcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuY2FsY3VsYXRlUG9zaXRpb24odGhpcy5wb3NpdGlvbik7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmxheWVyRWxlbWVudCk7XHJcbiAgICB0aGlzLmxheWVyRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwidmlzaWJsZVwiKTtcclxuICB9XHJcblxyXG4gIGNhbGN1bGF0ZVBvc2l0aW9uKHBvc2l0aW9uKSB7XHJcbiAgICBjb25zdCBib3VuZGluZ1JlY3QgPSB0aGlzLnRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHJcbiAgICB0aGlzLmxheWVyRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKC4uLk9iamVjdC52YWx1ZXModG9vbHRpcFBvc2l0aW9ucykpO1xyXG4gICAgdGhpcy50b29sdGlwRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwidmVydGljYWxcIiwgXCJob3Jpem9udGFsXCIpO1xyXG5cclxuICAgIHN3aXRjaCAocG9zaXRpb24pIHtcclxuICAgICAgY2FzZSBcInRvcFwiOiB7XHJcbiAgICAgICAgdGhpcy5sYXllckVsZW1lbnQuc3R5bGUudG9wID0gYCR7Ym91bmRpbmdSZWN0LnRvcCAtIHRoaXMudGFyZ2V0Lm9mZnNldEhlaWdodCAtIDEwfXB4YDtcclxuICAgICAgICB0aGlzLmxheWVyRWxlbWVudC5zdHlsZS5sZWZ0ID0gYCR7Ym91bmRpbmdSZWN0LmxlZnR9cHhgO1xyXG4gICAgICAgIHRoaXMubGF5ZXJFbGVtZW50LmNsYXNzTGlzdC5hZGQodG9vbHRpcFBvc2l0aW9ucy50b3ApO1xyXG4gICAgICAgIHRoaXMudG9vbHRpcEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInZlcnRpY2FsXCIpO1xyXG4gICAgICAgIHRoaXMuY2VudGVyUG9zaXRpb24oXCJob3Jpem9udGFsXCIpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgXCJib3R0b21cIjoge1xyXG4gICAgICAgIHRoaXMubGF5ZXJFbGVtZW50LnN0eWxlLnRvcCA9IGAke2JvdW5kaW5nUmVjdC50b3AgKyB0aGlzLnRhcmdldC5vZmZzZXRIZWlnaHQgKyAxMH1weGA7XHJcbiAgICAgICAgdGhpcy5sYXllckVsZW1lbnQuc3R5bGUubGVmdCA9IGAke2JvdW5kaW5nUmVjdC5sZWZ0fXB4YDtcclxuICAgICAgICB0aGlzLmxheWVyRWxlbWVudC5jbGFzc0xpc3QuYWRkKHRvb2x0aXBQb3NpdGlvbnMuYm90dG9tKTtcclxuICAgICAgICB0aGlzLnRvb2x0aXBFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJ2ZXJ0aWNhbFwiKTtcclxuICAgICAgICB0aGlzLmNlbnRlclBvc2l0aW9uKFwiaG9yaXpvbnRhbFwiKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlIFwibGVmdFwiOiB7XHJcbiAgICAgICAgdGhpcy5sYXllckVsZW1lbnQuc3R5bGUudG9wID0gYCR7Ym91bmRpbmdSZWN0LnRvcH1weGA7XHJcbiAgICAgICAgdGhpcy5sYXllckVsZW1lbnQuc3R5bGUubGVmdCA9IGAke2JvdW5kaW5nUmVjdC5sZWZ0IC0gdGhpcy50YXJnZXQub2Zmc2V0V2lkdGggLSAxMH1weGA7XHJcbiAgICAgICAgdGhpcy5sYXllckVsZW1lbnQuY2xhc3NMaXN0LmFkZCh0b29sdGlwUG9zaXRpb25zLmxlZnQpO1xyXG4gICAgICAgIHRoaXMudG9vbHRpcEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImhvcml6b250YWxcIik7XHJcbiAgICAgICAgdGhpcy5jZW50ZXJQb3NpdGlvbihcInZlcnRpY2FsXCIpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgXCJyaWdodFwiOiB7XHJcbiAgICAgICAgdGhpcy5sYXllckVsZW1lbnQuc3R5bGUudG9wID0gYCR7Ym91bmRpbmdSZWN0LnRvcH1weGA7XHJcbiAgICAgICAgdGhpcy5sYXllckVsZW1lbnQuc3R5bGUubGVmdCA9IGAke2JvdW5kaW5nUmVjdC5sZWZ0ICsgdGhpcy50YXJnZXQub2Zmc2V0V2lkdGggKyAxMH1weGA7XHJcbiAgICAgICAgdGhpcy5sYXllckVsZW1lbnQuY2xhc3NMaXN0LmFkZCh0b29sdGlwUG9zaXRpb25zLnJpZ2h0KTtcclxuICAgICAgICB0aGlzLnRvb2x0aXBFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJob3Jpem9udGFsXCIpO1xyXG4gICAgICAgIHRoaXMuY2VudGVyUG9zaXRpb24oXCJ2ZXJ0aWNhbFwiKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY2VudGVyUG9zaXRpb24oZGlyZWN0aW9uKSB7XHJcbiAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xyXG4gICAgICBjYXNlIFwiaG9yaXpvbnRhbFwiOiB7XHJcbiAgICAgICAgY29uc3QgY2VudGVyID0gdGhpcy50YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCArICh0aGlzLnRhcmdldC5vZmZzZXRXaWR0aCAvIDIpO1xyXG4gICAgICAgIHRoaXMubGF5ZXJFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KFwibGVmdFwiLCBgJHtjZW50ZXIgLSAodGhpcy5sYXllckVsZW1lbnQub2Zmc2V0V2lkdGggLyAyKX1weGApO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgXCJ2ZXJ0aWNhbFwiOiB7XHJcbiAgICAgICAgY29uc3QgY2VudGVyID0gdGhpcy50YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgKHRoaXMudGFyZ2V0Lm9mZnNldEhlaWdodCAvIDIpO1xyXG4gICAgICAgIHRoaXMubGF5ZXJFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KFwidG9wXCIsIGAke2NlbnRlciAtICh0aGlzLmxheWVyRWxlbWVudC5vZmZzZXRIZWlnaHQgLyAyKX1weGApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBoaWRlKCkge1xyXG4gICAgaWYgKCF0aGlzLnZpc2libGUpIHJldHVybjtcclxuICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMubGF5ZXJFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJ2aXNpYmxlXCIpO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHRoaXMubGF5ZXJFbGVtZW50LnJlbW92ZSgpO1xyXG4gICAgfSwgNTApO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGNhblNob3dBdFRvcCgpIHsgcmV0dXJuIHRoaXMudGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCAtIHRoaXMubGF5ZXJFbGVtZW50Lm9mZnNldEhlaWdodCA+PSAwOyB9XHJcbiAgZ2V0IGNhblNob3dBdEJvdHRvbSgpIHsgcmV0dXJuIHRoaXMudGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCArIHRoaXMudGFyZ2V0Lm9mZnNldEhlaWdodCArIHRoaXMubGF5ZXJFbGVtZW50Lm9mZnNldEhlaWdodCA8PSB3aW5kb3cuaW5uZXJIZWlnaHQ7IH1cclxuICBnZXQgY2FuU2hvd0F0TGVmdCgpIHsgcmV0dXJuIHRoaXMudGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQgLSB0aGlzLmxheWVyRWxlbWVudC5vZmZzZXRXaWR0aCA+PSAwOyB9XHJcbiAgZ2V0IGNhblNob3dBdFJpZ2h0KCkgeyByZXR1cm4gdGhpcy50YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCArIHRoaXMudGFyZ2V0Lm9mZnNldFdpZHRoICsgdGhpcy5sYXllckVsZW1lbnQub2Zmc2V0V2lkdGggPD0gd2luZG93LmlubmVyV2lkdGg7IH1cclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlKHRhcmdldCwgY29udGVudCwgcG9zaXRpb24gPSBcImF1dG9cIikge1xyXG4gIHJldHVybiBuZXcgVG9vbHRpcCh0YXJnZXQsIGNvbnRlbnQsIHBvc2l0aW9uKTtcclxufVxyXG5cclxuZG9tLnBhdGNoKFxyXG4gIFwiW2Fjb3JkLS10b29sdGlwLWNvbnRlbnRdXCIsXHJcbiAgKGVsbSkgPT4ge1xyXG4gICAgbGV0IHRvb2x0aXAgPSBjcmVhdGUoZWxtLCBlbG0uZ2V0QXR0cmlidXRlKFwiYWNvcmQtLXRvb2x0aXAtY29udGVudFwiKSwgZWxtLmdldEF0dHJpYnV0ZShcImFjb3JkLS10b29sdGlwLXBvc2l0aW9uXCIpKTtcclxuICAgIHRvb2x0aXAuZGlzYWJsZWQgPSBlbG0uZ2V0QXR0cmlidXRlKFwiYWNvcmQtLXRvb2x0aXAtZGlzYWJsZWRcIikgPT09IFwidHJ1ZVwiO1xyXG5cclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIHRvb2x0aXAuZGVzdHJveSgpO1xyXG4gICAgfVxyXG4gIH0sXHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7IGNyZWF0ZSB9OyIsICJpbXBvcnQgZG9tIGZyb20gXCIuLi9kb20vaW5kZXguanNcIjtcclxuaW1wb3J0IHV0aWxzIGZyb20gXCIuLi91dGlscy9pbmRleC5qc1wiO1xyXG5cclxuY29uc3QgdmFsaWRQb3NpdGlvbnMgPSBbXHJcbiAgXCJ0b3AtcmlnaHRcIixcclxuICBcInRvcC1sZWZ0XCIsXHJcbiAgXCJib3R0b20tcmlnaHRcIixcclxuICBcImJvdHRvbS1sZWZ0XCIsXHJcbiAgXCJ0b3AtY2VudGVyXCIsXHJcbiAgXCJib3R0b20tY2VudGVyXCIsXHJcbiAgXCJjZW50ZXJcIixcclxuICBcImxlZnQtY2VudGVyXCIsXHJcbiAgXCJyaWdodC1jZW50ZXJcIlxyXG5dXHJcblxyXG5mdW5jdGlvbiBnZXRDb250YWluZXIocG9zaXRpb24pIHtcclxuICBpZiAoIXZhbGlkUG9zaXRpb25zLmluY2x1ZGVzKHBvc2l0aW9uKSkgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHBvc2l0aW9uIFwiJHtwb3NpdGlvbn1cIi4gVmFsaWQgcG9zaXRpb25zIGFyZTogJHt2YWxpZFBvc2l0aW9ucy5qb2luKFwiLCBcIil9YCk7XHJcbiAgY29uc3QgYXBwRWxtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2NsYXNzKj1cIm5vdEFwcEFzaWRlUGFuZWwtXCJdJyk7XHJcblxyXG4gIGxldCB0b3BDb250YWluZXIgPSBhcHBFbG0ucXVlcnlTZWxlY3RvcihcIi5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLWNvbnRhaW5lclwiKTtcclxuICBpZiAoIXRvcENvbnRhaW5lcikge1xyXG4gICAgdG9wQ29udGFpbmVyID0gZG9tLnBhcnNlKGA8ZGl2IGNsYXNzPVwiYWNvcmQtLWxheWVyLWNvbnRhaW5lciBhY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLWNvbnRhaW5lclwiPjwvZGl2PmApO1xyXG4gICAgYXBwRWxtLmFwcGVuZENoaWxkKHRvcENvbnRhaW5lcik7XHJcbiAgfVxyXG4gIHRvcENvbnRhaW5lci5zdHlsZS5zZXRQcm9wZXJ0eShcIi0tdG9wLW9mZnNldFwiLCBgJHthcHBFbG0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wLnRvRml4ZWQoMSl9cHhgKTtcclxuXHJcbiAgbGV0IHBvc2l0aW9uQ29udGFpbmVyID0gdG9wQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoYC5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLiR7cG9zaXRpb259YCk7XHJcbiAgaWYgKCFwb3NpdGlvbkNvbnRhaW5lcikge1xyXG4gICAgcG9zaXRpb25Db250YWluZXIgPSBkb20ucGFyc2UoYDxkaXYgY2xhc3M9XCJhY29yZC0tbm90aWZpY2F0aW9uLWxheWVyICR7cG9zaXRpb259XCI+PC9kaXY+YCk7XHJcbiAgICB0b3BDb250YWluZXIuYXBwZW5kQ2hpbGQocG9zaXRpb25Db250YWluZXIpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHBvc2l0aW9uQ29udGFpbmVyO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93KGNvbnRlbnQsIHtcclxuICBzdHlsZSA9IFwiZGVmYXVsdFwiLFxyXG4gIHRpbWVvdXQgPSAxMDAwMCxcclxuICBwb3NpdGlvbiA9IFwidG9wLXJpZ2h0XCIsXHJcbiAgY2xvc2FibGUgPSB0cnVlLFxyXG4gIG9uQ2xpY2sgPSBudWxsLFxyXG4gIG9uQ2xvc2UgPSBudWxsXHJcbn0gPSB7fSkge1xyXG4gIGNvbnN0IGNvbnRhaW5lciA9IGdldENvbnRhaW5lcihwb3NpdGlvbik7XHJcblxyXG4gIGNvbnN0IG5vdGlmRWxtID0gZG9tLnBhcnNlKGBcclxuICAgIDxkaXYgY2xhc3M9XCJhY29yZC0tbm90aWZpY2F0aW9uIHN0eWxlLSR7c3R5bGV9IGhpZGRlblwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRlbnRcIj48L2Rpdj5cclxuICAgICAgICAgICAgPHN2ZyBjbGFzcz1cImNsb3NlICR7IWNsb3NhYmxlID8gXCJoaWRkZW5cIiA6IFwiXCJ9XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMjRcIj5cclxuICAgICAgICAgICAgICAgIDxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTEyIDEwLjU4Nmw0Ljk1LTQuOTUgMS40MTQgMS40MTQtNC45NSA0Ljk1IDQuOTUgNC45NS0xLjQxNCAxLjQxNC00Ljk1LTQuOTUtNC45NSA0Ljk1LTEuNDE0LTEuNDE0IDQuOTUtNC45NS00Ljk1LTQuOTVMNy4wNSA1LjYzNnpcIi8+XHJcbiAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJwcm9ncmVzcy1jb250YWluZXJcIiBzdHlsZT1cIi0tZHVyYXRpb246ICR7dGltZW91dH1tcztcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2dyZXNzXCI+PC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICBgKTtcclxuXHJcbiAgbm90aWZFbG0ucXVlcnlTZWxlY3RvcihcIi5jb250ZW50XCIpLmlubmVySFRNTCA9IGNvbnRlbnQ7XHJcblxyXG4gIGxldCBjbG9zZWQgPSBmYWxzZTtcclxuICBmdW5jdGlvbiBjbG9zZShjbG9zZVR5cGUpIHtcclxuICAgIGlmIChjbG9zZWQpIHJldHVybjtcclxuICAgIGNsb3NlZCA9IHRydWU7XHJcblxyXG4gICAgbm90aWZFbG0uY2xhc3NMaXN0LmFkZChcImNsb3NpbmdcIik7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgbm90aWZFbG0ucmVtb3ZlKCk7XHJcblxyXG4gICAgICB1dGlscy5pZkV4aXN0cyhcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci1jb250YWluZXJgKSxcclxuICAgICAgICAvKiogQHBhcmFtIHtIVE1MRGl2RWxlbWVudH0gZWxtICovKGVsbSkgPT4ge1xyXG4gICAgICAgICAgaWYgKCEoWy4uLmVsbS5jaGlsZE5vZGVzLnZhbHVlcygpXS5yZWR1Y2UoKHByZXYsIGN1cnIpID0+IHByZXYgKyBjdXJyLmNoaWxkRWxlbWVudENvdW50LCAwKSkpIGVsbS5yZW1vdmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICk7XHJcbiAgICB9LCAyNzUpO1xyXG4gICAgb25DbG9zZT8uKGNsb3NlVHlwZSk7XHJcbiAgfVxyXG5cclxuICBpZiAodHlwZW9mIG9uQ2xpY2sgPT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICBub3RpZkVsbS5jbGFzc0xpc3QuYWRkKFwiY2xpY2thYmxlXCIpO1xyXG4gICAgbm90aWZFbG0ub25jbGljayA9ICgpID0+IHtcclxuICAgICAgb25DbGljayhjbG9zZSk7XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgdXRpbHMuaWZFeGlzdHMobm90aWZFbG0ucXVlcnlTZWxlY3RvcihcIi5jbG9zZVwiKSwgKGVsbSkgPT4ge1xyXG4gICAgZWxtLm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgIGNsb3NlKFwidXNlclwiKTtcclxuICAgIH07XHJcbiAgfSk7XHJcblxyXG4gIGNvbnRhaW5lci5wcmVwZW5kKG5vdGlmRWxtKTtcclxuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xyXG4gICAgbm90aWZFbG0uY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcclxuICAgIG5vdGlmRWxtLnF1ZXJ5U2VsZWN0b3IoXCIucHJvZ3Jlc3NcIikuY2xhc3NMaXN0LmFkZChcInByb2dyZXNzaW5nXCIpO1xyXG4gIH0pO1xyXG5cclxuICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgIGNsb3NlKFwidGltZW91dFwiKTtcclxuICB9LCB0aW1lb3V0KTtcclxuXHJcbiAgcmV0dXJuICgpID0+IHtcclxuICAgIGNsb3NlKFwiZm9yY2VcIik7XHJcbiAgfTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIHNob3c6IE9iamVjdC5hc3NpZ24oc2hvdywge1xyXG4gICAgaW5mbzogKGh0bWwsIG9iaiA9IHt9KSA9PiBzaG93KGh0bWwsIHsgLi4ub2JqLCBzdHlsZTogXCJpbmZvXCIgfSksXHJcbiAgICBlcnJvcjogKGh0bWwsIG9iaiA9IHt9KSA9PiBzaG93KGh0bWwsIHsgLi4ub2JqLCBzdHlsZTogXCJlcnJvclwiIH0pLFxyXG4gICAgd2FybmluZzogKGh0bWwsIG9iaiA9IHt9KSA9PiBzaG93KGh0bWwsIHsgLi4ub2JqLCBzdHlsZTogXCJ3YXJuaW5nXCIgfSksXHJcbiAgICBzdWNjZXNzOiAoaHRtbCwgb2JqID0ge30pID0+IHNob3coaHRtbCwgeyAuLi5vYmosIHN0eWxlOiBcInN1Y2Nlc3NcIiB9KSxcclxuICB9KSxcclxufTsiLCAiaW1wb3J0IHdlYnBhY2sgZnJvbSBcIi4uL21vZHVsZXMvd2VicGFjay5qc1wiO1xyXG5pbXBvcnQgcGF0Y2hlciBmcm9tIFwiLi4vcGF0Y2hlci9pbmRleC5qc1wiO1xyXG5pbXBvcnQgbG9nZ2VyIGZyb20gXCIuLi91dGlscy9sb2dnZXIuanNcIjtcclxuXHJcbmltcG9ydCBjb21tb24gZnJvbSBcIi4uL21vZHVsZXMvY29tbW9uLmpzXCI7XHJcbmltcG9ydCB7IGZpbmRlck1hcCB9IGZyb20gXCIuLi9tb2R1bGVzL3Jhdy9jb21wbGV4LWZpbmRlci5qc1wiO1xyXG5cclxuY29uc3QgeyBSZWFjdCB9ID0gY29tbW9uO1xyXG5cclxubGV0IGlzUmVhZHkgPSBmYWxzZTtcclxuXHJcbmxldCBDb21wb25lbnRzID0gbnVsbDtcclxuXHJcbmxldCBBY3Rpb25zID0gbnVsbDtcclxuXHJcbihhc3luYyAoKSA9PiB7XHJcbiAgQWN0aW9ucyA9IGF3YWl0IChhc3luYyAoKSA9PiB7XHJcbiAgICBsZXQgb2dNb2R1bGU7XHJcbiAgICB3aGlsZSAodHJ1ZSkge1xyXG4gICAgICBvZ01vZHVsZSA9IHdlYnBhY2suZmlsdGVyKG0gPT4gT2JqZWN0LnZhbHVlcyhtKS5zb21lKHYgPT4gdHlwZW9mIHYgPT09IFwiZnVuY3Rpb25cIiAmJiB2LnRvU3RyaW5nKCkuaW5jbHVkZXMoXCJDT05URVhUX01FTlVfQ0xPU0VcIikpKS5maW5kKG0gPT4gbS5leHBvcnRzICE9PSB3aW5kb3cpPy5leHBvcnRzO1xyXG4gICAgICBpZiAob2dNb2R1bGUpIGJyZWFrO1xyXG4gICAgICBhd2FpdCBuZXcgUHJvbWlzZShyID0+IHNldFRpbWVvdXQociwgMTAwKSk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBvdXQgPSBmaW5kZXJNYXAob2dNb2R1bGUsIHtcclxuICAgICAgY2xvc2U6IFtcIkNPTlRFWFRfTUVOVV9DTE9TRVwiXSxcclxuICAgICAgb3BlbjogW1wicmVuZGVyTGF6eVwiXVxyXG4gICAgfSk7XHJcbiAgICBpc1JlYWR5ID0gISFvdXQuY2xvc2UgJiYgISFvdXQub3BlbjtcclxuICAgIHJldHVybiBvdXQ7XHJcbiAgfSkoKTtcclxuXHJcbiAgQ29tcG9uZW50cyA9ICgoKSA9PiB7XHJcbiAgICBjb25zdCBvdXQgPSB7fTtcclxuICAgIGNvbnN0IGNvbXBvbmVudE1hcCA9IHtcclxuICAgICAgc2VwYXJhdG9yOiBcIlNlcGFyYXRvclwiLFxyXG4gICAgICBjaGVja2JveDogXCJDaGVja2JveEl0ZW1cIixcclxuICAgICAgcmFkaW86IFwiUmFkaW9JdGVtXCIsXHJcbiAgICAgIGNvbnRyb2w6IFwiQ29udHJvbEl0ZW1cIixcclxuICAgICAgZ3JvdXBzdGFydDogXCJHcm91cFwiLFxyXG4gICAgICBjdXN0b21pdGVtOiBcIkl0ZW1cIlxyXG4gICAgfTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBtb2R1bGVJZCA9IE9iamVjdC5lbnRyaWVzKHdlYnBhY2sucmVxdWlyZS5tKS5maW5kKChbLCBtXSkgPT4gbT8udG9TdHJpbmcoKS5pbmNsdWRlcyhcIm1lbnVpdGVtY2hlY2tib3hcIikpWzBdO1xyXG4gICAgICBjb25zdCBjb250ZXh0TWVudU1vZHVsZSA9IHdlYnBhY2suZmluZCgoXywgaWR4KSA9PiBpZHggPT0gbW9kdWxlSWQpLmV4cG9ydHM7XHJcbiAgICAgIGNvbnN0IHJhd01hdGNoZXMgPSB3ZWJwYWNrLnJlcXVpcmUubVttb2R1bGVJZF0udG9TdHJpbmcoKS5tYXRjaEFsbCgvaWZcXChcXHcrXFwudHlwZT09PVxcdytcXC4oXFx3KylcXCkuKz90eXBlOlwiKC4rPylcIi9nKTtcclxuXHJcbiAgICAgIG91dC5NZW51ID0gT2JqZWN0LnZhbHVlcyhjb250ZXh0TWVudU1vZHVsZSkuZmluZCh2ID0+IHYudG9TdHJpbmcoKS5pbmNsdWRlcyhcIi5pc1VzaW5nS2V5Ym9hcmROYXZpZ2F0aW9uXCIpKTtcclxuXHJcbiAgICAgIFsuLi5yYXdNYXRjaGVzXS5mb3JFYWNoKChbLCBpZCwgdHlwZV0pID0+IHtcclxuICAgICAgICBvdXRbY29tcG9uZW50TWFwW3R5cGVdXSA9IGNvbnRleHRNZW51TW9kdWxlW2lkXTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpc1JlYWR5ID0gT2JqZWN0LmtleXMob3V0KS5sZW5ndGggPiAxO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGlzUmVhZHkgPSBmYWxzZTtcclxuICAgICAgbG9nZ2VyLmVycm9yKFwiRmFpbGVkIHRvIGxvYWQgY29udGV4dCBtZW51IGNvbXBvbmVudHNcIiwgZXJyKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gb3V0O1xyXG4gIH0pKCk7XHJcblxyXG4gIE1lbnVQYXRjaGVyLmluaXRpYWxpemUoKTtcclxufSkoKTtcclxuXHJcblxyXG5jbGFzcyBNZW51UGF0Y2hlciB7XHJcbiAgc3RhdGljIE1BWF9QQVRDSF9JVEVSQVRJT05TID0gMTY7XHJcbiAgc3RhdGljIHBhdGNoZXMgPSBuZXcgTWFwKCk7XHJcbiAgc3RhdGljIHN1YlBhdGNoZXMgPSBuZXcgV2Vha01hcCgpO1xyXG5cclxuICBzdGF0aWMgaW5pdGlhbGl6ZSgpIHtcclxuICAgIGlmICghaXNSZWFkeSkgcmV0dXJuIGxvZ2dlci53YXJuKFwiVW5hYmxlIHRvIGxvYWQgY29udGV4dCBtZW51LlwiKTtcclxuXHJcbiAgICBjb25zdCBtb2R1bGVUb1BhdGNoID0gd2VicGFjay5maWx0ZXIobSA9PiBPYmplY3QudmFsdWVzKG0pLnNvbWUodiA9PiB0eXBlb2YgdiA9PT0gXCJmdW5jdGlvblwiICYmIHYudG9TdHJpbmcoKS5pbmNsdWRlcyhcIkNPTlRFWFRfTUVOVV9DTE9TRVwiKSkpLmZpbmQobSA9PiBtLmV4cG9ydHMgIT09IHdpbmRvdykuZXhwb3J0cztcclxuICAgIGNvbnN0IGtleVRvUGF0Y2ggPSBPYmplY3Qua2V5cyhtb2R1bGVUb1BhdGNoKS5maW5kKGsgPT4gbW9kdWxlVG9QYXRjaFtrXT8ubGVuZ3RoID09PSAzKTtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhtb2R1bGVUb1BhdGNoLCBrZXlUb1BhdGNoKTtcclxuXHJcbiAgICBwYXRjaGVyLmJlZm9yZShcclxuICAgICAga2V5VG9QYXRjaCxcclxuICAgICAgbW9kdWxlVG9QYXRjaCxcclxuICAgICAgZnVuY3Rpb24gKG1ldGhvZEFyZ3MpIHtcclxuICAgICAgICBjb25zdCBwcm9taXNlID0gbWV0aG9kQXJnc1sxXTtcclxuICAgICAgICBtZXRob2RBcmdzWzFdID0gYXN5bmMgZnVuY3Rpb24gKC4uLmFyZ3MpIHtcclxuICAgICAgICAgIGNvbnN0IHJlbmRlciA9IGF3YWl0IHByb21pc2UuY2FsbCh0aGlzLCAuLi5hcmdzKTtcclxuXHJcbiAgICAgICAgICByZXR1cm4gKHByb3BzKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlcyA9IHJlbmRlcihwcm9wcyk7XHJcblxyXG4gICAgICAgICAgICBpZiAocmVzPy5wcm9wcy5uYXZJZCkge1xyXG4gICAgICAgICAgICAgIE1lbnVQYXRjaGVyLmV4ZWN1dGVQYXRjaGVzKHJlcy5wcm9wcy5uYXZJZCwgcmVzLCBwcm9wcyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHJlcz8udHlwZSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgICAgICAgTWVudVBhdGNoZXIucGF0Y2hSZWN1cnNpdmUocmVzLCBcInR5cGVcIik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZXM7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbWV0aG9kQXJncztcclxuICAgICAgfVxyXG4gICAgKVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIHBhdGNoUmVjdXJzaXZlKHRhcmdldCwgbWV0aG9kLCBpdGVyYXRpb24gPSAwKSB7XHJcbiAgICBpZiAoaXRlcmF0aW9uID49IHRoaXMuTUFYX1BBVENIX0lURVJBVElPTlMpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBwcm94eUZ1bmN0aW9uID0gdGhpcy5zdWJQYXRjaGVzLmdldCh0YXJnZXRbbWV0aG9kXSkgPz8gKCgpID0+IHtcclxuICAgICAgY29uc3Qgb3JpZ2luYWxGdW5jdGlvbiA9IHRhcmdldFttZXRob2RdO1xyXG4gICAgICBjb25zdCBkZXB0aCA9ICsraXRlcmF0aW9uO1xyXG4gICAgICBmdW5jdGlvbiBwYXRjaCguLi5hcmdzKSB7XHJcbiAgICAgICAgY29uc3QgcmVzID0gb3JpZ2luYWxGdW5jdGlvbi5jYWxsKHRoaXMsIC4uLmFyZ3MpO1xyXG5cclxuICAgICAgICBpZiAoIXJlcykgcmV0dXJuIHJlcztcclxuXHJcbiAgICAgICAgY29uc3QgbmF2SWQgPSByZXMucHJvcHM/Lm5hdklkID8/IHJlcy5wcm9wcz8uY2hpbGRyZW4/LnByb3BzPy5uYXZJZDtcclxuICAgICAgICBpZiAobmF2SWQpIHtcclxuICAgICAgICAgIE1lbnVQYXRjaGVyLmV4ZWN1dGVQYXRjaGVzKG5hdklkLCByZXMsIGFyZ3NbMF0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb25zdCBsYXllciA9IHJlcy5wcm9wcy5jaGlsZHJlbiA/IHJlcy5wcm9wcy5jaGlsZHJlbiA6IHJlcztcclxuXHJcbiAgICAgICAgICBpZiAodHlwZW9mIGxheWVyPy50eXBlID09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgICAgICBNZW51UGF0Y2hlci5wYXRjaFJlY3Vyc2l2ZShsYXllciwgXCJ0eXBlXCIsIGRlcHRoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiByZXM7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHBhdGNoLl9fb3JpZ2luYWxfXyA9IG9yaWdpbmFsRnVuY3Rpb247XHJcbiAgICAgIE9iamVjdC5hc3NpZ24ocGF0Y2gsIG9yaWdpbmFsRnVuY3Rpb24pO1xyXG4gICAgICB0aGlzLnN1YlBhdGNoZXMuc2V0KG9yaWdpbmFsRnVuY3Rpb24sIHBhdGNoKTtcclxuXHJcbiAgICAgIHJldHVybiBwYXRjaDtcclxuICAgIH0pKCk7XHJcblxyXG4gICAgdGFyZ2V0W21ldGhvZF0gPSBwcm94eUZ1bmN0aW9uO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGV4ZWN1dGVQYXRjaGVzKGlkLCByZXMsIHByb3BzKSB7XHJcbiAgICBpZiAoIXRoaXMucGF0Y2hlcy5oYXMoaWQpKSByZXR1cm47XHJcblxyXG4gICAgdGhpcy5wYXRjaGVzLmdldChpZCkuZm9yRWFjaChwYXRjaCA9PiB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgcGF0Y2gocmVzLCBwcm9wcyk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGxvZ2dlci5lcnJvcihcIkZhaWxlZCB0byBwYXRjaCBjb250ZXh0IG1lbnVcIiwgcGF0Y2gsIGVycik7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG5cclxuXHJcbi8vIENvcGllZCBmcm9tIGJkJ3Mgc291cmNlXHJcbmZ1bmN0aW9uIGJ1aWxkSXRlbShwcm9wcykge1xyXG4gIGNvbnN0IHsgdHlwZSB9ID0gcHJvcHM7XHJcbiAgaWYgKHR5cGUgPT09IFwic2VwYXJhdG9yXCIpIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KENvbXBvbmVudHMuU2VwYXJhdG9yKTtcclxuXHJcbiAgbGV0IGNvbXBvbmVudCA9IENvbXBvbmVudHMuSXRlbTtcclxuICBpZiAodHlwZSA9PT0gXCJzdWJtZW51XCIpIHtcclxuICAgIGlmICghcHJvcHMuY2hpbGRyZW4pIHByb3BzLmNoaWxkcmVuID0gYnVpbGRNZW51Q2hpbGRyZW4ocHJvcHMucmVuZGVyIHx8IHByb3BzLml0ZW1zKTtcclxuICB9IGVsc2UgaWYgKHR5cGUgPT09IFwidG9nZ2xlXCIgfHwgdHlwZSA9PT0gXCJyYWRpb1wiKSB7XHJcbiAgICBjb21wb25lbnQgPSB0eXBlID09PSBcInRvZ2dsZVwiID8gQ29tcG9uZW50cy5DaGVja2JveEl0ZW0gOiBDb21wb25lbnRzLlJhZGlvSXRlbTtcclxuICAgIGlmIChwcm9wcy5hY3RpdmUpIHByb3BzLmNoZWNrZWQgPSBwcm9wcy5hY3RpdmU7XHJcbiAgfSBlbHNlIGlmICh0eXBlID09PSBcImNvbnRyb2xcIikge1xyXG4gICAgY29tcG9uZW50ID0gQ29tcG9uZW50cy5Db250cm9sSXRlbTtcclxuICB9XHJcbiAgaWYgKCFwcm9wcy5pZCkgcHJvcHMuaWQgPSBgJHtwcm9wcy5sYWJlbC5yZXBsYWNlKC9eW15hLXpdK3xbXlxcdy1dKy9naSwgXCItXCIpfWA7XHJcbiAgaWYgKHByb3BzLmRhbmdlcikgcHJvcHMuY29sb3IgPSBcImNvbG9yRGFuZ2VyXCI7XHJcbiAgcHJvcHMuZXh0ZW5kZWQgPSB0cnVlO1xyXG5cclxuICBpZiAodHlwZSA9PT0gXCJ0b2dnbGVcIikge1xyXG4gICAgY29uc3QgW2FjdGl2ZSwgZG9Ub2dnbGVdID0gUmVhY3QudXNlU3RhdGUocHJvcHMuY2hlY2tlZCB8fCBmYWxzZSk7XHJcbiAgICBjb25zdCBvcmlnaW5hbEFjdGlvbiA9IHByb3BzLmFjdGlvbjtcclxuICAgIHByb3BzLmNoZWNrZWQgPSBhY3RpdmU7XHJcbiAgICBwcm9wcy5hY3Rpb24gPSBmdW5jdGlvbiAoZXYpIHtcclxuICAgICAgb3JpZ2luYWxBY3Rpb24oZXYpO1xyXG4gICAgICBkb1RvZ2dsZSghYWN0aXZlKTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChjb21wb25lbnQsIHByb3BzKTtcclxufVxyXG5cclxuLy8gQ29waWVkIGZyb20gYmQncyBzb3VyY2VcclxuZnVuY3Rpb24gYnVpbGRNZW51Q2hpbGRyZW4oc2V0dXApIHtcclxuICBjb25zdCBtYXBwZXIgPSBzID0+IHtcclxuICAgIGlmIChzLnR5cGUgPT09IFwiZ3JvdXBcIikgcmV0dXJuIGJ1aWxkR3JvdXAocyk7XHJcbiAgICByZXR1cm4gYnVpbGRJdGVtKHMpO1xyXG4gIH07XHJcbiAgY29uc3QgYnVpbGRHcm91cCA9IGZ1bmN0aW9uIChncm91cCkge1xyXG4gICAgY29uc3QgaXRlbXMgPSBncm91cC5pdGVtcy5tYXAobWFwcGVyKS5maWx0ZXIoaSA9PiBpKTtcclxuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KE1lbnVDb21wb25lbnRzLkdyb3VwLCBudWxsLCBpdGVtcyk7XHJcbiAgfTtcclxuICByZXR1cm4gc2V0dXAubWFwKG1hcHBlcikuZmlsdGVyKGkgPT4gaSk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBfX2NhY2hlX186IHtcclxuICAgIHBhdGNoZXM6IE1lbnVQYXRjaGVyLnBhdGNoZXMsXHJcbiAgICBzdWJQYXRjaGVzOiBNZW51UGF0Y2hlci5zdWJQYXRjaGVzXHJcbiAgfSxcclxuICBwYXRjaChuYXZJZCwgY2IpIHtcclxuICAgIGlmICghTWVudVBhdGNoZXIucGF0Y2hlcy5oYXMobmF2SWQpKSBNZW51UGF0Y2hlci5wYXRjaGVzLnNldChuYXZJZCwgbmV3IFNldCgpKTtcclxuICAgIE1lbnVQYXRjaGVyLnBhdGNoZXMuZ2V0KG5hdklkKS5hZGQoY2IpO1xyXG5cclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIE1lbnVQYXRjaGVyLnBhdGNoZXMuZ2V0KG5hdklkKS5kZWxldGUoY2IpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgb3BlbihldmVudCwgY29tcG9uZW50LCBjb25maWcpIHtcclxuICAgIHJldHVybiBBY3Rpb25zLm9wZW4oZXZlbnQsIChlKSA9PiBSZWFjdC5jcmVhdGVFbGVtZW50KGNvbXBvbmVudCwgT2JqZWN0LmFzc2lnbih7fSwgZSwgeyBvbkNsb3NlOiBBY3Rpb25zLmNsb3NlIH0pKSwgY29uZmlnKTtcclxuICB9LFxyXG4gIGNsb3NlKCkge1xyXG4gICAgcmV0dXJuIEFjdGlvbnMuY2xvc2UoKTtcclxuICB9LFxyXG4gIGJ1aWxkOiB7XHJcbiAgICBpdGVtKHNldHVwKSB7XHJcbiAgICAgIHJldHVybiBidWlsZE1lbnVDaGlsZHJlbihzZXR1cCk7XHJcbiAgICB9LFxyXG4gICAgbWVudShzZXR1cCkge1xyXG4gICAgICByZXR1cm4gKHByb3BzKSA9PiBSZWFjdC5jcmVhdGVFbGVtZW50KE1lbnVDb21wb25lbnRzLk1lbnUsIHByb3BzLCB0aGlzLmJ1aWxkTWVudUNoaWxkcmVuKHNldHVwKSk7XHJcbiAgICB9XHJcbiAgfVxyXG59OyIsICJpbXBvcnQgY29tbW9uIGZyb20gXCIuLi8uLi9hcGkvbW9kdWxlcy9jb21tb25cIjtcclxuaW1wb3J0IGxvZ2dlciBmcm9tIFwiLi4vLi4vYXBpL3V0aWxzL2xvZ2dlci5qc1wiO1xyXG5jb25zdCB7IFJlYWN0IH0gPSBjb21tb247XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFcnJvckJvdW5kYXJ5IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgc3VwZXIocHJvcHMpO1xyXG4gICAgdGhpcy5zdGF0ZSA9IHsgZXJyb3I6IG51bGwgfTtcclxuICB9XHJcblxyXG4gIGNvbXBvbmVudERpZENhdGNoKGVycm9yKSB7XHJcbiAgICB0aGlzLnNldFN0YXRlKHsgZXJyb3IgfSk7XHJcbiAgICBsb2dnZXIuZXJyb3IoZXJyb3IpO1xyXG4gICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLm9uRXJyb3IgPT09IFwiZnVuY3Rpb25cIikgdGhpcy5wcm9wcy5vbkVycm9yKGVycm9yKTtcclxuICB9XHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIGlmICh0aGlzLnN0YXRlLmVycm9yKSByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJhY29yZC0tcmVhY3QtZXJyb3JcIj5cclxuICAgICAgPHA+VW5leHBlY3RlZCBSZWFjdCBFcnJvciBIYXBwZW5lZC48L3A+XHJcbiAgICAgIDxwPntgJHt0aGlzLnN0YXRlLmVycm9yfWB9PC9wPlxyXG4gICAgPC9kaXY+O1xyXG4gICAgcmV0dXJuIHRoaXMucHJvcHMuY2hpbGRyZW47XHJcbiAgfVxyXG59XHJcblxyXG5jb25zdCBvcmlnaW5hbFJlbmRlciA9IEVycm9yQm91bmRhcnkucHJvdG90eXBlLnJlbmRlcjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KEVycm9yQm91bmRhcnkucHJvdG90eXBlLCBcInJlbmRlclwiLCB7XHJcbiAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgY29uZmlndXJhYmxlOiBmYWxzZSxcclxuICBzZXQ6IGZ1bmN0aW9uICgpIHsgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IHNldCByZW5kZXIgbWV0aG9kIG9mIEVycm9yQm91bmRhcnlcIik7IH0sXHJcbiAgZ2V0OiAoKSA9PiBvcmlnaW5hbFJlbmRlclxyXG59KTsiLCAiaW1wb3J0IEVycm9yQm91bmRhcnkgZnJvbSBcIi4uLy4uL2xpYi9jb21wb25lbnRzL0Vycm9yQm91bmRhcnkuanN4XCI7XHJcbmltcG9ydCBjb21tb24gZnJvbSBcIi4uL21vZHVsZXMvY29tbW9uLmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgRXJyb3JCb3VuZGFyeSxcclxuICBCdXR0b246IGNvbW1vbi5jb21wb25lbnRzLkJ1dHRvbixcclxuICBNYXJrZG93bjogY29tbW9uLmNvbXBvbmVudHMuTWFya2Rvd24sXHJcbiAgVGV4dDogY29tbW9uLmNvbXBvbmVudHMuVGV4dCxcclxuICBDb25maXJtYXRpb25Nb2RhbDogY29tbW9uLmNvbXBvbmVudHMuQ29uZmlybWF0aW9uTW9kYWwsXHJcbiAgTW9kYWxSb290OiBjb21tb24ubW9kYWxzLmNvbXBvbmVudHMuUm9vdCxcclxuICBNb2RhbENsb3NlQnV0dG9uOiBjb21tb24ubW9kYWxzLmNvbXBvbmVudHMub3RoZXIuQ2xvc2VCdXR0b24sXHJcbiAgTW9kYWxIZWFkZXI6IGNvbW1vbi5tb2RhbHMuY29tcG9uZW50cy5vdGhlci5IZWFkZXIsXHJcbiAgTW9kYWxDb250ZW50OiBjb21tb24ubW9kYWxzLmNvbXBvbmVudHMub3RoZXIuQ29udGVudCxcclxuICBNb2RhbEZvb3RlcjogY29tbW9uLm1vZGFscy5jb21wb25lbnRzLm90aGVyLkZvb3RlcixcclxuICBNb2RhbExpc3RDb250ZW50OiBjb21tb24ubW9kYWxzLmNvbXBvbmVudHMub3RoZXIuTGlzdENvbnRlbnQsXHJcbiAgVG9vbHRpcDogY29tbW9uLmNvbXBvbmVudHMuVG9vbHRpcCxcclxufSIsICJpbXBvcnQgRXJyb3JCb3VuZGFyeSBmcm9tIFwiLi4vLi4vbGliL2NvbXBvbmVudHMvRXJyb3JCb3VuZGFyeS5qc3hcIjtcclxuaW1wb3J0IGNvbW1vbiBmcm9tIFwiLi4vbW9kdWxlcy9jb21tb24uanNcIjtcclxuaW1wb3J0IGkxOG4gZnJvbSBcIi4uL2kxOG4vaW5kZXguanNcIlxyXG5jb25zdCB7IFJlYWN0LCBGbHV4RGlzcGF0Y2hlciwgY29tcG9uZW50cywgbW9kYWxzLCBVc2VyU3RvcmUgfSA9IGNvbW1vbjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBzaG93OiB7XHJcbiAgICBjb25maXJtYXRpb24odGl0bGUsIGNvbnRlbnQsIHsgY29uZmlybSA9IG51bGwsIGNhbmNlbCA9IG51bGwsIGRhbmdlciA9IGZhbHNlLCBrZXkgPSB1bmRlZmluZWQsIHRpbWVvdXQgPSA2MDAwMCAqIDUgfSA9IHt9KSB7XHJcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShjb250ZW50KSkgY29udGVudCA9IFtjb250ZW50XTtcclxuICAgICAgICBjb250ZW50ID0gY29udGVudC5tYXAoaSA9PiB0eXBlb2YgaSA9PT0gXCJzdHJpbmdcIiA/IFJlYWN0LmNyZWF0ZUVsZW1lbnQoY29tcG9uZW50cy5NYXJrZG93biwgbnVsbCwgaSkgOiBpKTtcclxuICAgICAgICBjb25zdCBtb2RhbEtleSA9IG1vZGFscy5hY3Rpb25zLm9wZW4oKHByb3BzKSA9PiB7XHJcbiAgICAgICAgICBsZXQgaW50ZXJhY3RlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgcmV0dXJuIDxFcnJvckJvdW5kYXJ5IG9uRXJyb3I9eygpID0+IHsgcmVzb2x2ZShmYWxzZSk7IH19PlxyXG4gICAgICAgICAgICA8Y29tcG9uZW50cy5Db25maXJtYXRpb25Nb2RhbFxyXG4gICAgICAgICAgICAgIGhlYWRlcj17dGl0bGV9XHJcbiAgICAgICAgICAgICAgY29uZmlybUJ1dHRvbkNvbG9yPXtkYW5nZXIgPyBjb21wb25lbnRzLkJ1dHRvbi5Db2xvcnMuUkVEIDogY29tcG9uZW50cy5CdXR0b24uQ29sb3JzLkJSQU5EfVxyXG4gICAgICAgICAgICAgIGNvbmZpcm1UZXh0PXtjb25maXJtIHx8IGkxOG4uZm9ybWF0KFwiQ09ORklSTVwiKX1cclxuICAgICAgICAgICAgICBjYW5jZWxUZXh0PXtjYW5jZWx9XHJcbiAgICAgICAgICAgICAgb25DYW5jZWw9eygpID0+IHsgcmVzb2x2ZShmYWxzZSk7IG1vZGFscy5hY3Rpb25zLmNsb3NlKG1vZGFsS2V5KTsgaW50ZXJhY3RlZCA9IHRydWU7IH19XHJcbiAgICAgICAgICAgICAgb25Db25maXJtPXsoKSA9PiB7IHJlc29sdmUodHJ1ZSk7IG1vZGFscy5hY3Rpb25zLmNsb3NlKG1vZGFsS2V5KTsgaW50ZXJhY3RlZCA9IHRydWU7IH19XHJcbiAgICAgICAgICAgICAgey4uLnByb3BzfVxyXG4gICAgICAgICAgICAgIG9uQ2xvc2U9eygpID0+IHsgcHJvcHMub25DbG9zZSgpOyByZXNvbHZlKGZhbHNlKTsgbW9kYWxzLmFjdGlvbnMuY2xvc2UobW9kYWxLZXkpOyB9fVxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgPEVycm9yQm91bmRhcnkgb25FcnJvcj17KCkgPT4geyByZXNvbHZlKGZhbHNlKTsgfX0+XHJcbiAgICAgICAgICAgICAgICB7Y29udGVudH1cclxuICAgICAgICAgICAgICA8L0Vycm9yQm91bmRhcnk+XHJcbiAgICAgICAgICAgIDwvY29tcG9uZW50cy5Db25maXJtYXRpb25Nb2RhbD5cclxuICAgICAgICAgIDwvRXJyb3JCb3VuZGFyeT5cclxuICAgICAgICB9LCB7IG1vZGFsS2V5OiBrZXkgfSk7XHJcbiAgICAgICAgaWYgKHRpbWVvdXQpIHtcclxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIWludGVyYWN0ZWQpIHtcclxuICAgICAgICAgICAgICByZXNvbHZlKGZhbHNlKTtcclxuICAgICAgICAgICAgICBtb2RhbHMuYWN0aW9ucy5jbG9zZShtb2RhbEtleSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sIHRpbWVvdXQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgY2xvc2Uoa2V5KSB7XHJcbiAgICAgIHJldHVybiBtb2RhbHMuYWN0aW9ucy5jbG9zZShrZXkpO1xyXG4gICAgfSxcclxuICAgIHVzZXIodXNlcklkKSB7XHJcbiAgICAgIGlmICghVXNlclN0b3JlLmdldFVzZXIodXNlcklkKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICBGbHV4RGlzcGF0Y2hlci5kaXNwYXRjaCh7IHR5cGU6IFwiVVNFUl9QUk9GSUxFX01PREFMX09QRU5cIiwgdXNlcklkIH0pO1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0sXHJcbiAgICBhbGVydCh0aXRsZSwgY29udGVudCwgeyBjb25maXJtID0gbnVsbCwga2V5ID0gdW5kZWZpbmVkLCB0aW1lb3V0ID0gNjAwMDAgKiA1IH0gPSB7fSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5jb25maXJtYXRpb24odGl0bGUsIGNvbnRlbnQsIHsgY29uZmlybSwgY2FuY2VsOiBudWxsLCBrZXksIHRpbWVvdXQgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG59IiwgImltcG9ydCBkb20gZnJvbSBcIi4uL2RvbS9pbmRleC5qc1wiO1xyXG5cclxuZnVuY3Rpb24gZ2V0Q29udGFpbmVyKCkge1xyXG4gIGNvbnN0IGFwcEVsbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tjbGFzcyo9XCJub3RBcHBBc2lkZVBhbmVsLVwiXScpO1xyXG5cclxuICBsZXQgdG9wQ29udGFpbmVyID0gYXBwRWxtLnF1ZXJ5U2VsZWN0b3IoXCIuYWNvcmQtLXRvYXN0cy1jb250YWluZXJcIik7XHJcbiAgaWYgKCF0b3BDb250YWluZXIpIHtcclxuICAgIHRvcENvbnRhaW5lciA9IGRvbS5wYXJzZShgPGRpdiBjbGFzcz1cImFjb3JkLS1sYXllci1jb250YWluZXIgYWNvcmQtLXRvYXN0cy1jb250YWluZXJcIj48L2Rpdj5gKTtcclxuICAgIGFwcEVsbS5hcHBlbmRDaGlsZCh0b3BDb250YWluZXIpO1xyXG4gIH1cclxuICB0b3BDb250YWluZXIuc3R5bGUuc2V0UHJvcGVydHkoXCItLXRvcC1vZmZzZXRcIiwgYCR7YXBwRWxtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcC50b0ZpeGVkKDEpfXB4YCk7XHJcblxyXG4gIHJldHVybiB0b3BDb250YWluZXI7XHJcbn1cclxuXHJcbmNvbnN0IGljb25zID0ge1xyXG4gIGluZm86IGA8c3ZnIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMjRcIj48cGF0aCBkPVwiTTEyIDIyQzYuNDc3IDIyIDIgMTcuNTIzIDIgMTJTNi40NzcgMiAxMiAyczEwIDQuNDc3IDEwIDEwLTQuNDc3IDEwLTEwIDEwem0tMS0xMXY2aDJ2LTZoLTJ6bTAtNHYyaDJWN2gtMnpcIiBmaWxsPVwiY3VycmVudENvbG9yXCIgLz48L3N2Zz5gLFxyXG4gIHdhcm5pbmc6IGA8c3ZnIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMjRcIj48cGF0aCBkPVwiTTEyIDIyQzYuNDc3IDIyIDIgMTcuNTIzIDIgMTJTNi40NzcgMiAxMiAyczEwIDQuNDc3IDEwIDEwLTQuNDc3IDEwLTEwIDEwem0tMS03djJoMnYtMmgtMnptMC04djZoMlY3aC0yelwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIiAvPjwvc3ZnPmAsXHJcbiAgZXJyb3I6IGA8c3ZnIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMjRcIj48cGF0aCBkPVwiTTEyIDIyQzYuNDc3IDIyIDIgMTcuNTIzIDIgMTJTNi40NzcgMiAxMiAyczEwIDQuNDc3IDEwIDEwLTQuNDc3IDEwLTEwIDEwem0tMS03djJoMnYtMmgtMnptMC04djZoMlY3aC0yelwiZmlsbD1cImN1cnJlbnRDb2xvclwiIC8+PC9zdmc+YCxcclxuICBzdWNjZXNzOiBgPHN2ZyB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCI+PHBhdGggZD1cIk0xMiAyMkM2LjQ3NyAyMiAyIDE3LjUyMyAyIDEyUzYuNDc3IDIgMTIgMnMxMCA0LjQ3NyAxMCAxMC00LjQ3NyAxMC0xMCAxMHptLS45OTctNmw3LjA3LTcuMDcxLTEuNDE0LTEuNDE0LTUuNjU2IDUuNjU3LTIuODI5LTIuODI5LTEuNDE0IDEuNDE0TDExLjAwMyAxNnpcIiBmaWxsPVwiY3VycmVudENvbG9yXCIgLz48L3N2Zz5gXHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBzaG93KFxyXG4gIGNvbnRlbnQsXHJcbiAge1xyXG4gICAgc3R5bGUgPSBcImRlZmF1bHRcIixcclxuICAgIHRpbWVvdXQgPSAzNTAwLFxyXG4gICAgb25DbGljayA9IG51bGwsXHJcbiAgICBoaWRlSWNvbiA9IGZhbHNlXHJcbiAgfSA9IHt9XHJcbikge1xyXG4gIGNvbnN0IGNvbnRhaW5lciA9IGdldENvbnRhaW5lcigpO1xyXG5cclxuICBjb25zdCB0b2FzdEVsbSA9IGRvbS5wYXJzZShgXHJcbiAgICA8ZGl2IGNsYXNzPVwiYWNvcmQtLXRvYXN0IHN0eWxlLSR7c3R5bGV9IGhpZGRlblwiPlxyXG4gICAgICAke2hpZGVJY29uID8gXCJcIiA6IChpY29uc1tzdHlsZV0gfHwgXCJcIil9XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJjb250ZW50XCI+PC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICBgKTtcclxuXHJcbiAgdG9hc3RFbG0ucXVlcnlTZWxlY3RvcihcIi5jb250ZW50XCIpLmlubmVySFRNTCA9IGNvbnRlbnQ7XHJcblxyXG4gIGxldCBjbG9zZWQgPSBmYWxzZTtcclxuICBmdW5jdGlvbiBjbG9zZSgpIHtcclxuICAgIGlmIChjbG9zZWQpIHJldHVybjtcclxuICAgIGNsb3NlZCA9IHRydWU7XHJcblxyXG4gICAgdG9hc3RFbG0uY2xhc3NMaXN0LmFkZChcImNsb3NpbmdcIik7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdG9hc3RFbG0ucmVtb3ZlKCk7XHJcblxyXG4gICAgICB1dGlscy5pZkV4aXN0cyhcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuYWNvcmQtLXRvYXN0cy1jb250YWluZXJgKSxcclxuICAgICAgICAvKiogQHBhcmFtIHtIVE1MRGl2RWxlbWVudH0gZWxtICovKGVsbSkgPT4ge1xyXG4gICAgICAgICAgaWYgKCFlbG0uY2hpbGRFbGVtZW50Q291bnQpIGVsbS5yZW1vdmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICk7XHJcbiAgICB9LCAyNzUpO1xyXG4gIH1cclxuXHJcbiAgaWYgKHR5cGVvZiBvbkNsaWNrID09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgdG9hc3RFbG0uY2xhc3NMaXN0LmFkZChcImNsaWNrYWJsZVwiKTtcclxuICAgIHRvYXN0RWxtLm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgIG9uQ2xpY2soY2xvc2UpO1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh0b2FzdEVsbSk7XHJcbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcclxuICAgIHRvYXN0RWxtLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XHJcbiAgfSk7XHJcblxyXG4gIHNldFRpbWVvdXQoY2xvc2UsIHRpbWVvdXQpO1xyXG5cclxuICByZXR1cm4gKCkgPT4ge1xyXG4gICAgY2xvc2UoKTtcclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgc2hvdzogT2JqZWN0LmFzc2lnbihzaG93LCB7XHJcbiAgICBpbmZvOiAoaHRtbCwgb2JqID0ge30pID0+IHNob3coaHRtbCwgeyAuLi5vYmosIHN0eWxlOiBcImluZm9cIiB9KSxcclxuICAgIGVycm9yOiAoaHRtbCwgb2JqID0ge30pID0+IHNob3coaHRtbCwgeyAuLi5vYmosIHN0eWxlOiBcImVycm9yXCIgfSksXHJcbiAgICB3YXJuaW5nOiAoaHRtbCwgb2JqID0ge30pID0+IHNob3coaHRtbCwgeyAuLi5vYmosIHN0eWxlOiBcIndhcm5pbmdcIiB9KSxcclxuICAgIHN1Y2Nlc3M6IChodG1sLCBvYmogPSB7fSkgPT4gc2hvdyhodG1sLCB7IC4uLm9iaiwgc3R5bGU6IFwic3VjY2Vzc1wiIH0pXHJcbiAgfSlcclxufSIsICJpbXBvcnQgcGF0Y2hlciBmcm9tIFwiLi4vcGF0Y2hlci9pbmRleC5qc1wiO1xyXG5pbXBvcnQgc3R5bGVDU1NUZXh0IGZyb20gXCIuL3N0eWxlcy5zY3NzXCI7XHJcbnBhdGNoZXIuaW5qZWN0Q1NTKHN0eWxlQ1NTVGV4dCk7XHJcblxyXG5pbXBvcnQgdG9vbHRpcHMgZnJvbSBcIi4vdG9vbHRpcHMuanNcIjtcclxuaW1wb3J0IG5vdGlmaWNhdGlvbnMgZnJvbSBcIi4vbm90aWZpY2F0aW9ucy5qc1wiO1xyXG5pbXBvcnQgY29udGV4dE1lbnVzIGZyb20gXCIuL2NvbnRleHRNZW51cy5qc1wiO1xyXG5pbXBvcnQgY29tcG9uZW50cyBmcm9tIFwiLi9jb21wb25lbnRzLmpzXCI7XHJcbmltcG9ydCBtb2RhbHMgZnJvbSBcIi4vbW9kYWxzLmpzeFwiO1xyXG5pbXBvcnQgdG9hc3RzIGZyb20gXCIuL3RvYXN0cy5qc1wiO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICB0b29sdGlwcyxcclxuICBub3RpZmljYXRpb25zLFxyXG4gIGNvbnRleHRNZW51cyxcclxuICBjb21wb25lbnRzLFxyXG4gIG1vZGFscyxcclxuICB0b2FzdHNcclxufSIsICJpbXBvcnQgbW9kdWxlcyBmcm9tICcuL21vZHVsZXMnO1xyXG5pbXBvcnQgZGV2IGZyb20gJy4vZGV2JztcclxuaW1wb3J0IHV0aWxzIGZyb20gJy4vdXRpbHMnO1xyXG5pbXBvcnQgZXh0ZW5zaW9ucyBmcm9tICcuL2V4dGVuc2lvbnMnO1xyXG5pbXBvcnQgaTE4biBmcm9tICcuL2kxOG4nO1xyXG5pbXBvcnQgc3RvcmFnZSBmcm9tICcuL3N0b3JhZ2UnO1xyXG5pbXBvcnQgZXZlbnRzIGZyb20gJy4vZXZlbnRzJztcclxuaW1wb3J0IHBhdGNoZXIgZnJvbSAnLi9wYXRjaGVyJztcclxuaW1wb3J0IGludGVybmFsIGZyb20gJy4vaW50ZXJuYWwnO1xyXG5pbXBvcnQgd2Vic29ja2V0IGZyb20gJy4vd2Vic29ja2V0JztcclxuaW1wb3J0IGRvbSBmcm9tICcuL2RvbSc7XHJcbmltcG9ydCB1aSBmcm9tICcuL3VpL2luZGV4LmpzJztcclxuXHJcbnV0aWxzLmxvZ2dlci5kZWJ1ZyhgUFJFTE9BRF9LRVk6IDxQUkVMT0FEX0tFWT5gKTtcclxuXHJcbmZ1bmN0aW9uIGRldkVycm9yKGFwaSkge1xyXG4gIHJldHVybiBuZXcgRXJyb3IoYFRoZSAke2FwaX0gQVBJIGNhbiBvbmx5IGJlIGFjY2Vzc2VkIHdoZW4gRGV2IG1vZGUgaXMgZW5hYmxlZCFgKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGV4cG9zZWRBUEk6IHtcclxuICAgIGRldixcclxuICAgIHV0aWxzLFxyXG4gICAgaTE4bixcclxuICAgIGV2ZW50cyxcclxuICAgIHVpLFxyXG4gICAgZ2V0IGRvbSgpIHtcclxuICAgICAgaWYgKCFkZXYuZW5hYmxlZCkgdGhyb3cgZGV2RXJyb3IoXCJET01cIik7XHJcbiAgICAgIHJldHVybiBkb207XHJcbiAgICB9LFxyXG4gICAgZ2V0IHBhdGNoZXIoKSB7XHJcbiAgICAgIGlmICghZGV2LmVuYWJsZWQpIHRocm93IGRldkVycm9yKFwiUGF0Y2hlclwiKTtcclxuICAgICAgcmV0dXJuIHBhdGNoZXI7XHJcbiAgICB9LFxyXG4gICAgZ2V0IHN0b3JhZ2UoKSB7XHJcbiAgICAgIGlmICghZGV2LmVuYWJsZWQpIHRocm93IGRldkVycm9yKFwiU3RvcmFnZVwiKTtcclxuICAgICAgcmV0dXJuIHN0b3JhZ2U7XHJcbiAgICB9LFxyXG4gICAgZ2V0IG1vZHVsZXMoKSB7XHJcbiAgICAgIGlmICghZGV2LmVuYWJsZWQpIHRocm93IGRldkVycm9yKFwiTW9kdWxlc1wiKTtcclxuICAgICAgcmV0dXJuIG1vZHVsZXM7XHJcbiAgICB9LFxyXG4gICAgZ2V0IGV4dGVuc2lvbnMoKSB7XHJcbiAgICAgIGlmICghZGV2LmVuYWJsZWQpIHRocm93IGRldkVycm9yKFwiRXh0ZW5zaW9uc1wiKTtcclxuICAgICAgcmV0dXJuIGV4dGVuc2lvbnM7XHJcbiAgICB9LFxyXG4gICAgZ2V0IGludGVybmFsKCkge1xyXG4gICAgICBpZiAoIWRldi5lbmFibGVkKSB0aHJvdyBkZXZFcnJvcihcIkludGVybmFsXCIpO1xyXG4gICAgICByZXR1cm4gaW50ZXJuYWw7XHJcbiAgICB9LFxyXG4gICAgZ2V0IHdlYnNvY2tldCgpIHtcclxuICAgICAgaWYgKCFkZXYuZW5hYmxlZCkgdGhyb3cgZGV2RXJyb3IoXCJXZWJzb2NrZXRcIik7XHJcbiAgICAgIHJldHVybiB3ZWJzb2NrZXQ7XHJcbiAgICB9XHJcbiAgfSxcclxuICB1bmV4cG9zZWRBUEk6IHtcclxuICAgIGRldixcclxuICAgIG1vZHVsZXMsXHJcbiAgICB1dGlscyxcclxuICAgIGV4dGVuc2lvbnMsXHJcbiAgICBpMThuLFxyXG4gICAgc3RvcmFnZSxcclxuICAgIGV2ZW50cyxcclxuICAgIHBhdGNoZXIsXHJcbiAgICBpbnRlcm5hbCxcclxuICAgIHdlYnNvY2tldCxcclxuICAgIHVpLFxyXG4gICAgZG9tXHJcbiAgfVxyXG59IiwgImltcG9ydCBtb2R1bGVzIGZyb20gXCIuLi9hcGkvbW9kdWxlcy9pbmRleC5qc1wiO1xyXG5pbXBvcnQgbW9kYWxzIGZyb20gXCIuLi9hcGkvdWkvbW9kYWxzLmpzeFwiO1xyXG5pbXBvcnQgbm90aWZpY2F0aW9ucyBmcm9tIFwiLi4vYXBpL3VpL25vdGlmaWNhdGlvbnMuanNcIjtcclxuaW1wb3J0IGV4dGVuc2lvbnMgZnJvbSBcIi4uL2FwaS9leHRlbnNpb25zL2luZGV4LmpzXCI7XHJcbmltcG9ydCB3ZWJzb2NrZXQgZnJvbSBcIi4uL2FwaS93ZWJzb2NrZXQvaW5kZXguanNcIjtcclxuXHJcbndlYnNvY2tldC5zZXQoXCJJbnN0YWxsRXh0ZW5zaW9uXCIsIGFzeW5jICh7IHVybCB9ID0ge30pID0+IHtcclxuICBpZiAoIXVybCkgcmV0dXJuO1xyXG5cclxuICBhd2FpdCBtb2R1bGVzLm5hdGl2ZS53aW5kb3cuc2V0QWx3YXlzT25Ub3AoMCwgdHJ1ZSk7XHJcbiAgYXdhaXQgbmV3IFByb21pc2UociA9PiBzZXRUaW1lb3V0KHIsIDI1MCkpO1xyXG4gIGF3YWl0IG1vZHVsZXMubmF0aXZlLndpbmRvdy5zZXRBbHdheXNPblRvcCgwLCB0cnVlKTtcclxuXHJcbiAgY29uc3Qgc3VjY2VzcyA9IGF3YWl0IG1vZGFscy5zaG93LmNvbmZpcm1hdGlvbihcclxuICAgIGFjb3JkLmkxOG4uZm9ybWF0KFwiSU1QT1JUX0VYVEVOU0lPTl9NT0RBTF9USVRMRVwiKSxcclxuICAgIGFjb3JkLmkxOG4uZm9ybWF0KFwiSU1QT1JUX0VYVEVOU0lPTl9NT0RBTF9ERVNDUklQVElPTlwiLCB1cmwpXHJcbiAgKTtcclxuXHJcbiAgaWYgKCFzdWNjZXNzKSByZXR1cm47XHJcblxyXG4gIHRyeSB7XHJcbiAgICBhd2FpdCBleHRlbnNpb25zLmxvYWQodXJsKTtcclxuICB9IGNhdGNoIChlcnIpIHtcclxuICAgIG5vdGlmaWNhdGlvbnMuc2hvdy5lcnJvcihgJHtlcnJ9YCwgeyB0aW1lb3V0OiAzMDAwMCB9KTtcclxuICB9XHJcbn0pOyIsICJleHBvcnQgZGVmYXVsdCBgXG5gO1xuIiwgImltcG9ydCBkb20gZnJvbSBcIi4uLy4uL2FwaS9kb20vaW5kZXguanNcIjtcclxuaW1wb3J0IHdlYnBhY2sgZnJvbSBcIi4uLy4uL2FwaS9tb2R1bGVzL3dlYnBhY2suanNcIjtcclxuaW1wb3J0IHBhdGNoZXIgZnJvbSBcIi4uLy4uL2FwaS9wYXRjaGVyL2luZGV4LmpzXCI7XHJcbmltcG9ydCB1dGlscyBmcm9tIFwiLi4vLi4vYXBpL3V0aWxzL2luZGV4LmpzXCI7XHJcblxyXG5pbXBvcnQgY3NzVGV4dCBmcm9tIFwiLi9zdHlsZS5zY3NzXCI7XHJcbnBhdGNoZXIuaW5qZWN0Q1NTKGNzc1RleHQpO1xyXG5cclxue1xyXG4gIGxldCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xyXG4gIHNjcmlwdC5zcmMgPSBcImh0dHBzOi8vdW5wa2cuY29tL3Z1ZUAzL2Rpc3QvdnVlLmdsb2JhbC5qc1wiO1xyXG4gIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcclxufVxyXG5cclxuZG9tLnBhdGNoKCdhW2hyZWY9XCIvc3RvcmVcIl1bZGF0YS1saXN0LWl0ZW0taWQkPVwiX19fbml0cm9cIl0nLCAoZWxtKSA9PiB7XHJcbiAgdXRpbHMuaWZFeGlzdHMoXHJcbiAgICBlbG0ucXVlcnlTZWxlY3RvcignW2NsYXNzKj1cIm5hbWVBbmREZWNvcmF0b3JzLVwiXSBbY2xhc3MqPVwibmFtZS1cIl0nKSxcclxuICAgIChuYW1lRWxtKSA9PiB7XHJcbiAgICAgIG5hbWVFbG0udGV4dENvbnRlbnQgPSBcIkFjb3JkXCI7XHJcbiAgICB9XHJcbiAgKTtcclxuXHJcbiAgdXRpbHMuaWZFeGlzdHMoXHJcbiAgICBlbG0ucXVlcnlTZWxlY3RvcignW2NsYXNzKj1cImF2YXRhcldpdGhUZXh0LVwiXSBbY2xhc3MqPVwiYXZhdGFyLVwiXSBzdmcnKSxcclxuICAgIGZpbGxTVkdFbG1XaXRoQWNvcmRMb2dvXHJcbiAgKTtcclxufSk7XHJcblxyXG5sZXQgaW50ZXJuYWxWdWVBcHAgPSBudWxsO1xyXG5cclxuY29uc3QgaGVhZGVySXRlbUNsYXNzZXMgPSB3ZWJwYWNrLmZpbmRCeVByb3BlcnRpZXMoXCJkaXZpZGVyXCIsIFwiaGFtYnVyZ2VyXCIsIFwidGhlbWVkXCIpO1xyXG5jb25zdCB0YWJCYXJDbGFzc2VzID0gd2VicGFjay5maW5kQnlQcm9wZXJ0aWVzKFwidGFiQmFyXCIsIFwibWF4V2lkdGhXaXRoVG9vbGJhclwiKTtcclxuY29uc3QgaGVhZGVyQ2xhc3NlcyA9IHdlYnBhY2suZmluZEJ5UHJvcGVydGllcyhcInRvcFBpbGxcIiwgXCJoZWFkZXJUZXh0XCIpO1xyXG5kb20ucGF0Y2goJ1tjbGFzcyo9XCJhcHBsaWNhdGlvblN0b3JlLVwiXSBbY2xhc3MqPVwiaG9tZVdyYXBwZXJOb3JtYWwtXCJdJywgKGVsbSkgPT4ge1xyXG4gIHV0aWxzLmlmRXhpc3RzKFxyXG4gICAgZWxtLnF1ZXJ5U2VsZWN0b3IoJ1tjbGFzcyo9XCJoZWFkZXJCYXItXCJdIFtjbGFzcyo9XCJ0aXRsZVdyYXBwZXItXCJdIFtjbGFzcyo9XCJ0aXRsZS1cIl0nKSxcclxuICAgICh0aXRsZUVsbSkgPT4ge1xyXG4gICAgICB0aXRsZUVsbS50ZXh0Q29udGVudCA9IFwiQWNvcmRcIjtcclxuXHJcbiAgICAgIGlmIChpbnRlcm5hbFZ1ZUFwcCkge1xyXG4gICAgICAgIGxldCBjb250YWluZXIgPSBkb20ucGFyZW50cyh0aXRsZUVsbSwgMikucG9wKCk7XHJcblxyXG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChcclxuICAgICAgICAgIGRvbS5wYXJzZShgPGRpdiBjbGFzcz1cIiR7aGVhZGVySXRlbUNsYXNzZXMuZGl2aWRlcn1cIj48L2Rpdj5gKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIGNvbnN0IGJ1dHRvbnNDb250YWluZXIgPSBkb20ucGFyc2UoYFxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cIiR7dGFiQmFyQ2xhc3Nlcy50YWJCYXJ9ICR7aGVhZGVyQ2xhc3Nlcy50b3BQaWxsfVwiPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgYCk7XHJcblxyXG4gICAgICAgIGxldCBidXR0b25zID0gW107XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGJ1aWxkQnV0dG9uKGlkLCB0ZXh0LCBzZWxlY3RlZCA9IGZhbHNlKSB7XHJcbiAgICAgICAgICBsZXQgZWxtID0gZG9tLnBhcnNlKGA8ZGl2IGlkPVwidGFiLWJ1dHRvbi0ke2lkfVwiIGNsYXNzPVwiYWNvcmQtLXRhYi1idXR0b24gJHt0YWJCYXJDbGFzc2VzLml0ZW19ICR7aGVhZGVyQ2xhc3Nlcy5pdGVtfSAke2hlYWRlckNsYXNzZXMudGhlbWVkfVwiPiR7dGV4dH08L2Rpdj5gKTtcclxuICAgICAgICAgIGJ1dHRvbnMucHVzaChlbG0pO1xyXG4gICAgICAgICAgZWxtLnNldFNlbGVjdGVkID0gKHMpID0+IHtcclxuICAgICAgICAgICAgaWYgKHMpIGVsbS5jbGFzc0xpc3QuYWRkKGhlYWRlckNsYXNzZXMuc2VsZWN0ZWQpO1xyXG4gICAgICAgICAgICBlbHNlIGVsbS5jbGFzc0xpc3QucmVtb3ZlKGhlYWRlckNsYXNzZXMuc2VsZWN0ZWQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZWxtLnNldFNlbGVjdGVkKGludGVybmFsVnVlQXBwLnNlbGVjdGVkVGFiID09PSBpZCk7XHJcbiAgICAgICAgICBlbG0ub25jbGljayA9ICgpID0+IHtcclxuICAgICAgICAgICAgYnV0dG9ucy5mb3JFYWNoKChiKSA9PiBiLnNldFNlbGVjdGVkKGZhbHNlKSk7XHJcbiAgICAgICAgICAgIGVsbS5zZXRTZWxlY3RlZCh0cnVlKTtcclxuICAgICAgICAgICAgaW50ZXJuYWxWdWVBcHAuc2VsZWN0ZWRUYWIgPSBpZDtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBlbG07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBidXR0b25zQ29udGFpbmVyLmFwcGVuZENoaWxkKGJ1aWxkQnV0dG9uKFwiaG9tZVwiLCBcIkhvbWVcIikpO1xyXG4gICAgICAgIGJ1dHRvbnNDb250YWluZXIuYXBwZW5kQ2hpbGQoYnVpbGRCdXR0b24oXCJwbHVnaW5zXCIsIFwiUGx1Z2luc1wiKSk7XHJcbiAgICAgICAgYnV0dG9uc0NvbnRhaW5lci5hcHBlbmRDaGlsZChidWlsZEJ1dHRvbihcInRoZW1lc1wiLCBcIlRoZW1lc1wiKSk7XHJcbiAgICAgICAgYnV0dG9uc0NvbnRhaW5lci5hcHBlbmRDaGlsZChidWlsZEJ1dHRvbihcInNldHRpbmdzXCIsIFwiU2V0dGluZ3NcIikpO1xyXG5cclxuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYnV0dG9uc0NvbnRhaW5lcik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICApO1xyXG4gIHV0aWxzLmlmRXhpc3RzKFxyXG4gICAgZWxtLnF1ZXJ5U2VsZWN0b3IoJ1tjbGFzcyo9XCJoZWFkZXJCYXItXCJdIFtjbGFzcyo9XCJpY29uV3JhcHBlci1cIl0gW2NsYXNzKj1cImljb24tXCJdJyksXHJcbiAgICBmaWxsU1ZHRWxtV2l0aEFjb3JkTG9nb1xyXG4gICk7XHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gZmlsbFNWR0VsbVdpdGhBY29yZExvZ28oc3ZnRWxtKSB7XHJcbiAgc3ZnRWxtLnNldEF0dHJpYnV0ZShcInZpZXdCb3hcIiwgXCIwIDAgODEzLjUgMTQ5M1wiKTtcclxuICBzdmdFbG0uc2V0QXR0cmlidXRlKFwieG1sbnNcIiwgXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiKTtcclxuICBzdmdFbG0uaW5uZXJIVE1MID0gYFxyXG4gICAgPGRlZnM+XHJcbiAgICAgIDxzdHlsZT5cclxuICAgICAgICAuYWNvcmQtLWxvZ28tY29sb3Ige1xyXG4gICAgICAgICAgZmlsbDogY3VycmVudENvbG9yO1xyXG4gICAgICAgICAgZmlsbC1ydWxlOiBldmVub2RkO1xyXG4gICAgICAgIH1cclxuICAgICAgPC9zdHlsZT5cclxuICAgIDwvZGVmcz5cclxuICAgIDxnPlxyXG4gICAgICA8cGF0aCBjbGFzcz1cImFjb3JkLS1sb2dvLWNvbG9yXCIgZD1cIk04MTcuMjY2LDEzMjIuNWgyODV2MzY1aC0yODV2LTM2NVpcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoLTU1My4yNSAtMjEzLjUpXCIvPlxyXG4gICAgICA8cGF0aCBjbGFzcz1cImFjb3JkLS1sb2dvLWNvbG9yXCIgZD1cIk01NTUuMjM1LDE1MjMuNzhzOTEuMTY5LTMxOS44NSw5Mi41MzEtMzE5LjI4YzExNC43LDQ3LjgzLDE2MCwxOTIsMTYwLDE5MmwtNTIuMTIsMTg2LjYxcy0zMS4xMjksMTM3LjcxLTgwLjg4LDEyMC4zOUM1MjguMDI2LDE2NTIuNDIsNTU1LjIzNSwxNTIzLjc4LDU1NS4yMzUsMTUyMy43OFpcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoLTU1My4yNSAtMjEzLjUpXCIvPlxyXG4gICAgICA8cGF0aCBjbGFzcz1cImFjb3JkLS1sb2dvLWNvbG9yXCIgZD1cIk0xMzY0Ljc3LDE1MjUuMjhzLTkxLjE3LTMxOS44NS05Mi41NC0zMTkuMjhjLTExNC43LDQ3LjgzLTE2MCwxOTItMTYwLDE5Mmw1Mi4xMiwxODYuNjFzMzEuMTMsMTM3LjcxLDgwLjg4LDEyMC4zOUMxMzkxLjk3LDE2NTMuOTIsMTM2NC43NywxNTI1LjI4LDEzNjQuNzcsMTUyNS4yOFpcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoLTU1My4yNSAtMjEzLjUpXCIvPlxyXG4gICAgPC9nPlxyXG4gICAgPHBhdGggY2xhc3M9XCJhY29yZC0tbG9nby1jb2xvclwiIGQ9XCJNODc0Ljc2NiwyNzUuNXMxNC41NzktNjEuOTE4LDg3LTYyYzgwLjgyNC0uMDkyLDg3LDYyLDg3LDYyczE5OS40Myw4NTEuNDcsMTk4LDg1MmMtMjEwLjMzLDc3LjcxLTE0NiwxODAtMTQ2LDE4MGgtMjgxczYzLjctMTAzLjgyLTE0Ni0xODFDNjcxLjAxNCwxMTI1LjQ5LDg3NC43NjYsMjc1LjUsODc0Ljc2NiwyNzUuNVpcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoLTU1My4yNSAtMjEzLjUpXCIvPlxyXG4gICAgPGc+XHJcbiAgICAgIDxwYXRoIGNsYXNzPVwiYWNvcmQtLWxvZ28tY29sb3JcIiBkPVwiTTEyMzguMTQsODk3LjVhNTMuODgyLDUzLjg4MiwwLDAsMSw1My44OCw1My44NzVjMCwyNC45MzktMjAuMjUsNDYuOTg3LTQzLjI1LDUzLjEyNS00LjQ1LDEuMTgtMTAuMTktMzktMTEtMzktMC41OCwwLTI3LjcxLDMuNTEtMzEsNC01LjU4LjgyOC0xMS45My0xMy44NzYtNC0yMCwxLjkzLTEuNDkxLDI2LjYyLTYuOTU5LDI5LTcsMC42Mi0uMDExLTcuMzQtNDEuNjE4LTctNDNDMTIyNS42NCw4OTUuOTQ0LDEyMzMuNTIsODk3LjUsMTIzOC4xNCw4OTcuNVpcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoLTU1My4yNSAtMjEzLjUpXCIvPlxyXG4gICAgICA8cGF0aCBjbGFzcz1cImFjb3JkLS1sb2dvLWNvbG9yXCIgZD1cIk0xMTczLjY0LDYzMi41YTUzLjg4Miw1My44ODIsMCwwLDEsNTMuODgsNTMuODc1YzAsMjQuOTM5LTIwLjI1LDQ2Ljk4Ny00My4yNSw1My4xMjUtNC40NSwxLjE4NS0xMC4xOS0zOS0xMS0zOS0wLjU4LDAtMjcuNzEsMy41MS0zMSw0LTUuNTguODI4LTExLjkzLTEzLjg3Ni00LTIwLDEuOTMtMS40OTEsMjYuNjItNi45NTksMjktNywwLjYyLS4wMTEtNy4zNC00MS42MTgtNy00M0MxMTYxLjE0LDYzMC45NDQsMTE2OS4wMiw2MzIuNSwxMTczLjY0LDYzMi41WlwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgtNTUzLjI1IC0yMTMuNSlcIi8+XHJcbiAgICAgIDxwYXRoIGNsYXNzPVwiYWNvcmQtLWxvZ28tY29sb3JcIiBkPVwiTTExMTUuMTYsMzczYTUzLjg3NCw1My44NzQsMCwwLDEsNTMuODcsNTMuODc1YzAsMjQuOTM5LTIwLjI0LDQ2Ljk4Ny00My4yNSw1My4xMjUtNC40NCwxLjE4NS0xMC4xOC0zOS0xMS0zOS0wLjU4LDAtMjcuNywzLjUxLTMxLDQtNS41Ny44MjgtMTEuOTItMTMuODc2LTQtMjAsMS45My0xLjQ5MSwyNi42Mi02Ljk1OSwyOS03LDAuNjItLjAxMS03LjM0LTQxLjYxOC03LTQzQzExMDIuNjUsMzcxLjQ0NCwxMTEwLjUzLDM3MywxMTE1LjE2LDM3M1pcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoLTU1My4yNSAtMjEzLjUpXCIvPlxyXG4gICAgPC9nPlxyXG4gICAgPGc+XHJcbiAgICAgIDxwYXRoIGNsYXNzPVwiYWNvcmQtLWxvZ28tY29sb3JcIiBkPVwiTTY4My45MjIsODk3Ljc1YTUzLjg3NSw1My44NzUsMCwwLDAtNTMuODc1LDUzLjg3NWMwLDI0LjkzOSwyMC4yNDUsNDYuOTg3LDQzLjI1LDUzLjEyNSw0LjQ0MSwxLjE4LDEwLjE4NS0zOSwxMS0zOSwwLjU3NiwwLDI3LjcsMy41MSwzMSw0LDUuNTcyLDAuODI4LDExLjkyNi0xMy44NzYsNC0yMC0xLjkzLTEuNDkxLTI2LjYyMS02Ljk1OS0yOS03LTAuNjItLjAxMSw3LjMzOS00MS42MTgsNy00M0M2OTYuNDI0LDg5Ni4xOTQsNjg4LjU0NCw4OTcuNzUsNjgzLjkyMiw4OTcuNzVaXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKC01NTMuMjUgLTIxMy41KVwiLz5cclxuICAgICAgPHBhdGggY2xhc3M9XCJhY29yZC0tbG9nby1jb2xvclwiIGQ9XCJNNzQ4LjQyMiw2MzIuNzVhNTMuODc1LDUzLjg3NSwwLDAsMC01My44NzUsNTMuODc1YzAsMjQuOTM5LDIwLjI0NSw0Ni45ODcsNDMuMjUsNTMuMTI1LDQuNDQxLDEuMTg1LDEwLjE4NS0zOSwxMS0zOSwwLjU3NiwwLDI3LjcsMy41MSwzMSw0LDUuNTcyLDAuODI4LDExLjkyNi0xMy44NzYsNC0yMC0xLjkzLTEuNDkxLTI2LjYyMS02Ljk1OS0yOS03LTAuNjItLjAxMSw3LjMzOS00MS42MTgsNy00M0M3NjAuOTI0LDYzMS4xOTQsNzUzLjA0NCw2MzIuNzUsNzQ4LjQyMiw2MzIuNzVaXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKC01NTMuMjUgLTIxMy41KVwiLz5cclxuICAgICAgPHBhdGggY2xhc3M9XCJhY29yZC0tbG9nby1jb2xvclwiIGQ9XCJNODA2LjkwNiwzNzMuMjVhNTMuODc1LDUzLjg3NSwwLDAsMC01My44NzUsNTMuODc1YzAsMjQuOTM5LDIwLjI0NSw0Ni45ODcsNDMuMjUsNTMuMTI1LDQuNDQyLDEuMTg1LDEwLjE4NS0zOSwxMS0zOSwwLjU3NywwLDI3LjcsMy41MSwzMSw0LDUuNTcyLDAuODI4LDExLjkyNi0xMy44NzYsNC0yMC0xLjkzLTEuNDkxLTI2LjYyMS02Ljk1OS0yOS03LTAuNjItLjAxMSw3LjMzOS00MS42MTgsNy00M0M4MTkuNDA5LDM3MS42OTQsODExLjUyOCwzNzMuMjUsODA2LjkwNiwzNzMuMjVaXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKC01NTMuMjUgLTIxMy41KVwiLz5cclxuICAgIDwvZz5cclxuICBgO1xyXG59XHJcblxyXG5cclxuKGFzeW5jICgpID0+IHtcclxuICB3aGlsZSAodHJ1ZSkge1xyXG4gICAgaWYgKHdpbmRvdy5WdWUpIGJyZWFrO1xyXG4gICAgYXdhaXQgdXRpbHMuc2xlZXAoMTAwKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGJhc2VWdWVFbG0gPSBkb20ucGFyc2UoYFxyXG4gICAgPGRpdiBjbGFzcz1cImFjb3JkLS1iYXNlLXBhZ2VcIj5cclxuICAgICAge3tzZWxlY3RlZFRhYn19XHJcbiAgICA8L2Rpdj5cclxuICBgKTtcclxuXHJcbiAgVnVlLmNyZWF0ZUFwcCh7XHJcbiAgICBkYXRhKCkge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHNlbGVjdGVkVGFiOiBcImhvbWVcIlxyXG4gICAgICB9O1xyXG4gICAgfSxcclxuICAgIG1ldGhvZHM6IHtcclxuXHJcbiAgICB9LFxyXG4gICAgbW91bnRlZCgpIHtcclxuICAgICAgaW50ZXJuYWxWdWVBcHAgPSB0aGlzO1xyXG4gICAgfVxyXG4gIH0pLm1vdW50KGJhc2VWdWVFbG0pO1xyXG5cclxuICBkb20ucGF0Y2goJ1tjbGFzcyo9XCJhcHBsaWNhdGlvblN0b3JlLVwiXSBbY2xhc3MqPVwic2Nyb2xsZXJCYXNlLVwiXSBbY2xhc3MqPVwic3Vic2NyaXB0aW9uc1JlZGlyZWN0Q29udGFpbmVyLVwiXScsIChlbG0pID0+IHtcclxuICAgIC8qKiBAdHlwZSB7SFRNTERpdkVsZW1lbnR9ICovXHJcbiAgICBsZXQgY29udGFpbmVyRWxtID0gZG9tLnBhcmVudHMoZWxtLCA0KS5wb3AoKTtcclxuICAgIGNvbnRhaW5lckVsbS5yZXBsYWNlQ2hpbGRyZW4oYmFzZVZ1ZUVsbSk7XHJcbiAgfSk7XHJcbn0pKCk7XHJcblxyXG5cclxuXHJcblxyXG4iLCAiaW1wb3J0IHsgd2FpdFVudGlsQ29ubmVjdGlvbk9wZW4gfSBmcm9tIFwiLi9vdGhlci91dGlscy5qc1wiO1xyXG5pbXBvcnQgbG9hZGluZ0FuaW1hdGlvbiBmcm9tIFwiLi9vdGhlci9sb2FkaW5nLWFuaW1hdGlvblwiO1xyXG5pbXBvcnQgYXBpIGZyb20gXCIuL2FwaVwiO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdywgXCJhY29yZFwiLCB7XHJcbiAgZ2V0KCkge1xyXG4gICAgcmV0dXJuIGFwaS5leHBvc2VkQVBJO1xyXG4gIH1cclxufSk7XHJcbndpbmRvdy5nbG9iYWwgPSB3aW5kb3c7XHJcblxyXG4oYXN5bmMgKCkgPT4ge1xyXG4gIGxvYWRpbmdBbmltYXRpb24uc2hvdygpO1xyXG4gIGF3YWl0IHdhaXRVbnRpbENvbm5lY3Rpb25PcGVuKCk7XHJcbiAgbG9hZGluZ0FuaW1hdGlvbi5oaWRlKCk7XHJcbn0pKCk7XHJcblxyXG4vLyBleHRyYXNcclxuaW1wb3J0IFwiLi9vdGhlci93ZWJzb2NrZXQtdHJpZ2dlcnMuanNcIjtcclxuaW1wb3J0IFwiLi91aS9pbmRleC5qc1wiOyJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUNBLGFBQU8sZUFBZSxTQUFTLGNBQWMsRUFBRSxPQUFPLEtBQUssQ0FBQztBQUM1RCxjQUFRLFVBQVUsT0FBTyxPQUFPO0FBQUEsUUFDNUIsS0FBSztBQUFBLFFBQ0wsS0FBSztBQUFBLFFBQ0wsUUFBUTtBQUFBLFFBQ1IsUUFBUTtBQUFBLE1BQ1osQ0FBQztBQUFBO0FBQUE7OztBQ1BEO0FBQUE7QUFBQTtBQUNBLFVBQUksa0JBQW1CLFdBQVEsUUFBSyxtQkFBb0IsU0FBVSxLQUFLO0FBQ25FLGVBQVEsT0FBTyxJQUFJLGFBQWMsTUFBTSxFQUFFLFdBQVcsSUFBSTtBQUFBLE1BQzVEO0FBQ0EsYUFBTyxlQUFlLFNBQVMsY0FBYyxFQUFFLE9BQU8sS0FBSyxDQUFDO0FBQzVELFVBQU0sV0FBVyxn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QUNOLFFBQVU7QUFBQSxjQUNSO0FBQUEsY0FDQTtBQUFBLGNBQ0E7QUFBQSxjQUNBO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsUUFDQSxNQUFRO0FBQUEsVUFDTixJQUFNO0FBQUEsVUFDTixRQUFVO0FBQUEsVUFDVixNQUFRO0FBQUEsWUFDTixRQUFVO0FBQUEsY0FDUjtBQUFBLGNBQ0E7QUFBQSxjQUNBO0FBQUEsY0FDQTtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLFFBQ0EsU0FBVztBQUFBLFVBQ1QsSUFBTTtBQUFBLFVBQ04sUUFBVTtBQUFBLFlBQ1IsUUFBVTtBQUFBLFlBQ1YsSUFBTTtBQUFBLFlBQ04sSUFBTTtBQUFBLGNBQ0o7QUFBQSxnQkFDRTtBQUFBLGNBQ0Y7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFVBQ0EsTUFBUTtBQUFBLFlBQ04sUUFBVTtBQUFBLGNBQ1I7QUFBQSxjQUNBO0FBQUEsY0FDQTtBQUFBLGNBQ0E7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxRQUNBLFVBQVk7QUFBQSxVQUNWLElBQU07QUFBQSxVQUNOLFFBQVU7QUFBQSxVQUNWLE1BQVE7QUFBQSxZQUNOLE9BQVM7QUFBQSxjQUNQO0FBQUEsY0FDQTtBQUFBLGNBQ0E7QUFBQSxjQUNBO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLE1BQ0EsZ0JBQWtCO0FBQUEsUUFDaEIsSUFBTTtBQUFBLFFBQ04sTUFBUTtBQUFBLFVBQ04sT0FBUztBQUFBLFlBQ1A7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLFFBQ0EsUUFBVTtBQUFBLFVBQ1IsUUFBVTtBQUFBLFVBQ1YsSUFBTTtBQUFBLFVBQ04sSUFBTTtBQUFBLFlBQ0o7QUFBQSxjQUNFO0FBQUEsY0FDQTtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLE9BQVM7QUFBQSxRQUNQLElBQU07QUFBQSxRQUNOLE1BQVE7QUFBQSxVQUNOLE9BQVM7QUFBQSxZQUNQO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxRQUNBLFFBQVU7QUFBQSxVQUNSLFFBQVU7QUFBQSxVQUNWLElBQU07QUFBQSxVQUNOLElBQU07QUFBQSxZQUNKO0FBQUEsY0FDRTtBQUFBLGNBQ0E7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsTUFDQSxNQUFRO0FBQUEsUUFDTixJQUFNO0FBQUEsUUFDTixNQUFRO0FBQUEsVUFDTixPQUFTO0FBQUEsWUFDUDtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsUUFDQSxRQUFVO0FBQUEsVUFDUixRQUFVO0FBQUEsVUFDVixJQUFNO0FBQUEsVUFDTixJQUFNO0FBQUEsWUFDSjtBQUFBLGNBQ0U7QUFBQSxjQUNBO0FBQUEsY0FDQTtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLE1BQVE7QUFBQSxRQUNOLElBQU07QUFBQSxRQUNOLE1BQVE7QUFBQSxVQUNOLE9BQVM7QUFBQSxZQUNQO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxRQUNBLFFBQVU7QUFBQSxVQUNSLFFBQVU7QUFBQSxVQUNWLElBQU07QUFBQSxVQUNOLElBQU07QUFBQSxZQUNKO0FBQUEsY0FDRTtBQUFBLGNBQ0E7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsTUFDQSxXQUFhO0FBQUEsUUFDWCxJQUFNO0FBQUEsUUFDTixRQUFVO0FBQUEsUUFDVixNQUFRO0FBQUEsVUFDTixRQUFVO0FBQUEsWUFDUjtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLE1BQ0EsaUJBQW1CO0FBQUEs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QUEsSUFDRixDQUFDLEVBQUUsTUFBTSxVQUFVO0FBRW5CLGdCQUFJLE1BQU0sb0dBQW9HLENBQUMsUUFBUTtBQUVySCxVQUFJLGVBQWUsWUFBSSxRQUFRLEtBQUssQ0FBQyxFQUFFLElBQUk7QUFDM0MsbUJBQWEsZ0JBQWdCLFVBQVU7QUFBQSxJQUN6QyxDQUFDO0FBQUEsRUFDSCxHQUFHOzs7QUMvSUgsU0FBTyxlQUFlLFFBQVEsU0FBUztBQUFBLElBQ3JDLE1BQU07QUFDSixhQUFPLFlBQUk7QUFBQSxJQUNiO0FBQUEsRUFDRixDQUFDO0FBQ0QsU0FBTyxTQUFTO0FBRWhCLEdBQUMsWUFBWTtBQUNYLDhCQUFpQixLQUFLO0FBQ3RCLFVBQU0sd0JBQXdCO0FBQzlCLDhCQUFpQixLQUFLO0FBQUEsRUFDeEIsR0FBRzsiLAogICJuYW1lcyI6IFsiZXZlbnQiLCAibWFrZSIsICJ0YXJnZXQiLCAidHJlZSIsICJzZWFyY2hGaWx0ZXIiLCAid2Fsa2FibGUiLCAiaWdub3JlIiwgImZvdW5kIiwgImNvbXBvbmVudHMiLCAiXyIsICJjaGVjayIsICJtb2R1bGVzIiwgInJlcXVpcmUiLCAiZm91bmQiLCAiZmluZGVyIiwgImZvdW5kIiwgInJlcSIsICJmaW5kZXIiLCAiY29tbW9uX2RlZmF1bHQiLCAiY29tbW9uX2RlZmF1bHQiLCAiXyIsICJfIiwgIm5vU3RvcmUiLCAiXyIsICJ2YWwiLCAiZXJyb3IiLCAib3V0IiwgImNoZWNrIiwgIl8iLCAiQkFTRV9VUkwiLCAibmVzdHMiLCAib3V0IiwgIl8iLCAic291cmNlIiwgImFwaSIsICJjb21tb25fZGVmYXVsdCIsICJzZXQiLCAic2hvdyIsICJjb21tb25fZGVmYXVsdCIsICJvdXQiLCAiXyIsICJSZWFjdCIsICJjb21tb25fZGVmYXVsdCIsICJjb21tb25fZGVmYXVsdCIsICJSZWFjdCIsICJjb21tb25fZGVmYXVsdCIsICJpbnRlcmFjdGVkIiwgImdldENvbnRhaW5lciIsICJzaG93IiwgImFwaSIsICJzdHlsZV9kZWZhdWx0IiwgInN0eWxlX2RlZmF1bHQiLCAiZWxtIl0KfQo=
