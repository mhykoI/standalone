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
      Router: {
        transitionTo: {
          __: true,
          filter: {
            export: false,
            in: "strings",
            by: [
              [
                "transitionTo - Transitioning to "
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
              "transitionTo"
            ]
          },
          map: {
            transitionTo: [
              "transitionTo - Transitioning to "
            ]
          }
        },
        replaceWith: {
          __: true,
          filter: {
            export: false,
            in: "strings",
            by: [
              [
                '"Replacing route with "'
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
              "replaceWith"
            ]
          },
          map: {
            replaceWith: [
              '"Replacing route with "'
            ]
          }
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
  function findInTree(tree, searchFilter, { walkable = null, ignore = [], limit = 256, all = false } = {}) {
    let iteration = 0;
    let foundList = [];
    function doSearch(tree2, searchFilter2, { walkable: walkable2 = null, ignore: ignore2 = [] } = {}) {
      iteration += 1;
      if (iteration > limit)
        return;
      if (typeof searchFilter2 === "string") {
        if (tree2.hasOwnProperty(searchFilter2)) {
          if (all)
            foundList.push(tree2[searchFilter2]);
          if (!all)
            return tree2[searchFilter2];
        }
      } else if (searchFilter2(tree2)) {
        if (all)
          foundList.push(tree2);
        if (!all)
          return tree2;
      }
      if (!tree2)
        return;
      if (Array.isArray(tree2)) {
        for (const item of tree2) {
          const found2 = doSearch(item, searchFilter2, { walkable: walkable2, ignore: ignore2 });
          if (found2)
            foundList.push(found2);
          if (found2 && !all)
            return found2;
        }
      } else if (typeof tree2 === "object") {
        for (const key in tree2) {
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
              foundList.push(found2);
            if (found2 && !all)
              return found2;
          } catch {
          }
        }
      }
    }
    return doSearch(tree, searchFilter, { walkable, ignore }) ?? foundList;
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
    css = css.replace(/var\(--acord--([\S\s]+)\)/g, (match, group1) => {
      let splitted = group1.split(",");
      let key = splitted.shift().trim();
      let defaultValue = splitted.join(",").trim();
      return props[key] ?? (defaultValue || match);
    });
    return css;
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
          css = null;
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

  // src/api/extensions/index.js
  async function buildPluginAPI(manifest, persistKey) {
    const devMode = dev_default.enabled || manifest?.mode === "development";
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
            if (manifest?.api?.modules?.node?.some?.((i) => i.name === name2))
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
              if (manifest?.api?.modules?.common?.some?.((i) => i.name === prop))
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
            let data = manifest?.api?.modules?.custom?.some?.((i) => i.name === prop);
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
        }),
        get native() {
          if (manifest?.modules?.native || devMode)
            return modules_default.native;
          return null;
        }
      },
      extension: {
        manifest,
        persist,
        i18n: await buildExtensionI18N(manifest),
        events: new BasicEventEmitter(),
        subscriptions: []
      },
      get i18n() {
        if (manifest?.api?.i18n || devMode)
          return i18n_default;
        return null;
      },
      get patcher() {
        if (manifest?.api?.patcher || devMode)
          return patcher_default;
        return null;
      },
      get events() {
        if (manifest?.api?.events || devMode)
          return events_default;
        return null;
      },
      get storage() {
        if (manifest?.api?.storage || devMode)
          return storage_default;
        return null;
      },
      get websocket() {
        if (manifest?.api?.websocket || devMode)
          return websocket_default;
        return null;
      },
      get ui() {
        if (manifest?.api?.ui || devMode)
          return ui_default;
        return null;
      },
      get utils() {
        if (manifest?.api?.utils || devMode)
          return utils_default;
        return null;
      },
      get dom() {
        if (manifest?.api?.dom || devMode)
          return dom_default;
        return null;
      },
      get dev() {
        if (manifest?.api?.dev || devMode)
          return dev_default;
        return null;
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
      let metaResp = await fetch(`${url}/manifest.json`);
      if (metaResp.status !== 200)
        throw new Error(`"${url}" extension manifest is not responded with 200 status code.`);
      let manifest = await metaResp.json();
      let readmeResp = await fetch(`${url}/readme.md`);
      let readme = readmeResp.status === 200 ? await readmeResp.text() : null;
      await showConfirmationModal({
        manifest,
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
        manifest,
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
      let metaResp = await fetch(`${url}/manifest.json`);
      if (metaResp.status !== 200)
        throw new Error(`"${url}" extension manifest is not responded with 200 status code.`);
      let manifest = await metaResp.json();
      if (data.manifest.hash === manifest.hash)
        return false;
      let readmeResp = await fetch(`${url}/readme.md`);
      let readme = readmeResp.status === 200 ? await readmeResp.text() : null;
      let sourceResp = await fetch(`${url}/source.js`);
      if (sourceResp.status !== 200)
        throw new Error(`"${url}" extension source is not responded with 200 status code.`);
      let source2 = await sourceResp.text();
      ut.storage.installed.store[url] = {
        manifest,
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
      await out2.loader.load(url, data);
    },
    async unload(url) {
      if (!out2.__cache__.initialized)
        await out2.init();
      if (!out2.storage.installed.ghost[url])
        throw new Error(`"${url}" extension is not installed.`);
      if (!out2.__cache__.loaded.ghost[url])
        throw new Error(`"${url}" extension is not loaded.`);
      await out2.loader.unload(url);
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
    loader: {
      async load(id, data) {
        if (data.manifest.type === "plugin") {
          let unload = function() {
            offConfigListener();
            api2.extension.subscriptions.forEach((i) => {
              if (typeof i === "function")
                i();
            });
            api2.extension.events.emit("unload");
            evaluated?.unload?.();
          };
          let api2 = await buildPluginAPI(data.manifest, `Extension;Persist;${id}`);
          if (api2.extension.persist.ghost.settings === void 0)
            api2.extension.persist.store.settings = {};
          findInTree(data.manifest.config, (i) => i.id, { all: true }).forEach(
            (i) => {
              api2.extension.persist.store.settings[i.id] ??= i.default;
              if (i.hasOwnProperty("value"))
                i.value ??= api2.extension.persist.store.settings[i.id];
            }
          );
          let evaluated = out2.evaluate(data.source, api2);
          await evaluated?.load?.();
          const offConfigListener = events_default.on("extension-config-interaction", (data2) => {
            if (data2.extension !== id)
              return;
            if (data2.item.id) {
              api2.extension.persist.store.settings[data2.item.id] = data2.item.value;
            }
            evaluated?.config?.({
              item: data2.item,
              data: data2.data,
              getItem(itemId) {
                return findInTree(data2.manifest.config, (i) => i.id === itemId);
              },
              getItems() {
                return findInTree(data2.manifest.config, (i) => i.id, { all: true });
              },
              save() {
                if (!data2.item.id)
                  return false;
                api2.extension.persist.store.settings[data2.item.id] = data2.item.value;
                return true;
              }
            });
          });
          out2.__cache__.loaded.store[id] = { evaluated, api: api2, unload };
          return { evaluated, api: api2, unload };
        } else if (data.manifest.type === "theme") {
          let unload = function() {
            offConfigListener();
            injectedRes();
          };
          let evaluated = out2.evaluate(data.source, null);
          const persist = await storage_default.createPersistNest(`Extension;Persist;${id}`);
          if (persist.ghost.settings === void 0)
            persist.store.settings = {};
          findInTree(data.manifest.config, (i) => i.id, { all: true }).forEach(
            (i) => {
              persist.store.settings[i.id] ??= i.default;
              if (i.hasOwnProperty("value"))
                i.value ??= persist.store.settings[i.id];
            }
          );
          let cssText = evaluated();
          let injectedRes = patcher_default.injectCSS(cssText, persist.ghost.settings);
          const offConfigListener = events_default.on("extension-config-interaction", (data2) => {
            if (data2.extension !== id)
              return;
            if (!data2.config.id)
              return;
            persist.store.settings[data2.config.id] = data2.data.value;
            injectedRes(persist.ghost.settings);
          });
          out2.__cache__.loaded.store[id] = { evaluated, unload };
          return { evaluated, unload };
        }
      },
      unload(id) {
        out2.__cache__.loaded.ghost?.[id]?.unload?.();
        delete out2.__cache__.loaded.store[id];
      }
    }
  };
  var extensions_default = out2;

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
      extensions_default.loader.unload("Development");
      loaded = null;
      installed = null;
      return true;
    },
    async load(source2, manifest) {
      if (!source2 || !manifest)
        throw new Error(`Source and manifest are required to load an extension!`);
      if (loaded)
        throw new Error(`Extension is already loaded!`);
      if (isLoading)
        return false;
      isLoading = true;
      try {
        loaded = await extensions_default.loader.load("Development", { source: source2, manifest });
        installed = {
          manifest
        };
      } catch (err) {
        logger_default.error(`Unable to load development extension.`, i18n_default.localize(manifest.about.name), err);
        isLoading = false;
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
        logger_default.info(`Development extension is loaded! (${i18n_default.localize(manifest.about.name)})`);
      isProcessing = false;
    }
  );

  // src/api/internal/index.js
  var internal_default = {
    process: globalThis["<PRELOAD_KEY>"].process,
    isDevToolsOpen: globalThis["<PRELOAD_KEY>"].isDevToolsOpen
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
        props: ["item", "extension"],
        template: `
        <div v-show="item?.visible ?? true" class="acord--config-button acord--config-item">
          <discord-button @click="onClick" :value="item.value" :size="item.size" :color="item.color" />
        </div>
      `,
        methods: {
          onClick(event) {
            events_default.emit(
              "extension-config-interaction",
              {
                extension: this.extension,
                item: this.item,
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
        props: ["item", "extension"],
        template: `
        <div v-show="item?.visible ?? true" class="acord--config-check acord--config-item">
          <discord-check @change="onChange" v-model="item.value" />
        </div>
      `,
        methods: {
          onChange(data) {
            events_default.emit(
              "extension-config-interaction",
              {
                extension: this.extension,
                item: this.item,
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
          props: ["item", "extension"],
          template: `
          <div v-show="item?.visible ?? true" class="acord--config-column acord--config-item" :class="{
            'horizontal-align-left': item?.horizontalAlign === 'left',
            'horizontal-align-center': item?.horizontalAlign === 'center',
            'horizontal-align-right': item?.horizontalAlign === 'right',
            'justify-space-between': item?.justify === 'space-between',
            'justify-space-around': item?.justify === 'space-around',
            'vertical-align-top': item?.verticalAlign === 'top',
            'vertical-align-center': item?.verticalAlign === 'center',
            'vertical-align-bottom': item?.verticalAlign === 'bottom'
          }" :style="{'width': item?.width ?? '100%', 'height': item?.height}" >
            <component v-for="child in item.children" :is="nameMap[child.type]" :key="child.id" :item="child" :extension="extension" />
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

  // src/ui/home/vue/components/components/config/config-heading/index.js
  var config_heading_default = {
    /** @param {import("vue").App} vueApp */
    load(vueApp) {
      vueApp.component("config-heading", {
        props: ["item", "extension"],
        template: `
        <div v-show="item?.visible ?? true" class="acord--config-heading acord--config-item">
          <h1 class="heading">{{item.value}}</h1>
        </div>
      `
      });
    }
  };

  // src/ui/home/vue/components/components/config/config-input/index.js
  var config_input_default = {
    /** @param {import("vue").App} vueApp */
    load(vueApp) {
      vueApp.component("config-input", {
        props: ["item", "extension"],
        template: `
        <div v-show="item?.visible ?? true" class="acord--config-input acord--config-item">
          <discord-input @change="onChange" v-model="item.value" :type="item.inputType" :placeholder="item.placeholder" :maxlength="item.maxlength" />
        </div>
      `,
        methods: {
          onChange(data) {
            events_default.emit(
              "extension-config-interaction",
              {
                extension: this.extension,
                item: this.item,
                data
              }
            );
          }
        }
      });
    }
  };

  // src/ui/home/vue/components/components/config/config-paragraph/index.js
  var config_paragraph_default = {
    /** @param {import("vue").App} vueApp */
    load(vueApp) {
      vueApp.component("config-paragraph", {
        props: ["item", "extension"],
        template: `
        <div v-show="item?.visible ?? true" class="acord--config-paragraph acord--config-item">
          <p class="paragraph">{{item.value}}</p>
        </div>
      `
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
          props: ["item", "extension"],
          template: `
          <div v-show="item?.visible ?? true" class="acord--config-row acord--config-item" :class="{
            'horizontal-align-left': item?.horizontalAlign === 'left',
            'horizontal-align-center': item?.horizontalAlign === 'center',
            'horizontal-align-right': item?.horizontalAlign === 'right',
            'justify-space-between': item?.justify === 'space-between',
            'justify-space-around': item?.justify === 'space-around',
            'vertical-align-top': item?.verticalAlign === 'top',
            'vertical-align-center': item?.verticalAlign === 'center',
            'vertical-align-bottom': item?.verticalAlign === 'bottom'
          }" :style="{'width': item?.width ?? '100%', 'height': item?.height}" >
            <component v-for="child in item.children" :is="nameMap[child.type]" :key="child.id" :item="child" :extension="extension" />
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
        props: ["item", "extension"],
        template: `
        <div v-show="item?.visible ?? true" class="acord--config-select acord--config-item">
          <discord-select @change="onChange" v-model="item.value" :options="item.options" />
        </div>
      `,
        methods: {
          onChange(data) {
            events_default.emit(
              "extension-config-interaction",
              {
                extension: this.extension,
                item: this.item,
                data
              }
            );
          }
        }
      });
    }
  };

  // src/ui/home/vue/components/components/config/config-spacer/index.js
  var config_spacer_default = {
    /** @param {import("vue").App} vueApp */
    load(vueApp) {
      vueApp.component("config-spacer", {
        props: ["item", "extension"],
        template: `
        <div v-show="item?.visible ?? true" class="acord--config-spacer acord--config-item">
          <div class="spacer" :style="{'height': item?.height, 'width': item?.width}" />
        </div>
      `
      });
    }
  };

  // src/ui/home/vue/components/components/config/config-textarea/index.js
  var config_textarea_default = {
    /** @param {import("vue").App} vueApp */
    load(vueApp) {
      vueApp.component("config-textarea", {
        props: ["item", "extension"],
        template: `
        <div v-show="item?.visible ?? true" class="acord--config-textarea acord--config-item">
          <discord-textarea @change="onChange" v-model="item.value" :type="item.inputType" :placeholder="item.placeholder" :maxlength="item.maxlength" :cols="item.columns" :rows="item.rows" />
        </div>
      `,
        methods: {
          onChange(data) {
            events_default.emit(
              "extension-config-interaction",
              {
                extension: this.extension,
                item: this.item,
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
.acord--config-item{width:100%;display:flex}.acord--config-row{width:100%;display:flex;flex-direction:row;justify-content:space-between;align-items:center}.acord--config-row.horizontal-align-left{justify-content:flex-start}.acord--config-row.horizontal-align-right{justify-content:flex-end}.acord--config-row.horizontal-align-center{justify-content:center}.acord--config-row.justify-space-between{justify-content:space-between}.acord--config-row.justify-space-around{justify-content:space-around}.acord--config-row.vertical-align-top{align-items:flex-start}.acord--config-row.vertical-align-bottom{align-items:flex-end}.acord--config-column{width:100%;display:flex;flex-direction:column;justify-content:space-between;align-items:center}.acord--config-column.horizontal-align-left{justify-content:flex-start}.acord--config-column.horizontal-align-right{justify-content:flex-end}.acord--config-column.horizontal-align-center{justify-content:center}.acord--config-column.justify-space-between{justify-content:space-between}.acord--config-column.justify-space-around{justify-content:space-around}.acord--config-column.vertical-align-top{align-items:flex-start}.acord--config-column.vertical-align-bottom{align-items:flex-end}.acord--config-column.vertical-align-center{align-items:center}.acord--config-heading{font-size:1.2rem;font-weight:500;margin-bottom:.5rem;color:#f5f5f5}.acord--config-paragraph{font-size:1rem;font-weight:400;margin-bottom:.5rem;color:rgba(245,245,245,.85)}`;

  // src/ui/home/vue/components/components/config/index.js
  patcher_default.injectCSS(style_default7);
  var config_default = {
    /** @param {import("vue").App} vueApp */
    load(vueApp) {
      config_paragraph_default.load(vueApp);
      config_heading_default.load(vueApp);
      config_spacer_default.load(vueApp);
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibm9kZV9tb2R1bGVzL25lc3RzL2Nqcy9FdmVudHMuanMiLCAibm9kZV9tb2R1bGVzL25lc3RzL2Nqcy9FdmVudEVtaXR0ZXIuanMiLCAibm9kZV9tb2R1bGVzL25lc3RzL2Nqcy9tYWtlLmpzIiwgIm5vZGVfbW9kdWxlcy9uZXN0cy9janMvaW5kZXguanMiLCAic3JjL2RhdGEvY29tbW9uLmpzb24iLCAic3JjL2FwaS91dGlscy9yYXcvZmluZC1pbi10cmVlLmpzIiwgInNyYy9hcGkvdXRpbHMvbG9nZ2VyLmpzIiwgInNyYy9hcGkvdXRpbHMvcmVhY3QuanMiLCAic3JjL2FwaS91dGlscy9pbmRleC5qcyIsICJzcmMvYXBpL21vZHVsZXMvcmF3L2NvbXBsZXgtZmluZGVyLmpzIiwgInNyYy9hcGkvbW9kdWxlcy93ZWJwYWNrLmpzIiwgInNyYy9hcGkvbW9kdWxlcy9jb21tb24uanMiLCAic3JjL2FwaS9tb2R1bGVzL2luZGV4LmpzIiwgInNyYy9hcGkvaTE4bi9pbmRleC5qcyIsICJzcmMvb3RoZXIvdXRpbHMuanMiLCAic3JjL2xpYi9CYXNpY0V2ZW50RW1pdHRlci5qcyIsICJzcmMvYXBpL2V2ZW50cy9pbmRleC5qcyIsICJzcmMvYXBpL2RvbS9pbmRleC5qcyIsICJzcmMvbGliL3NwaXRyb2FzdC9kaXN0L2VzbS9zaGFyZWQuanMiLCAic3JjL2xpYi9zcGl0cm9hc3QvZGlzdC9lc20vaG9vay5qcyIsICJzcmMvbGliL3NwaXRyb2FzdC9kaXN0L2VzbS91bi1wYXRjaC5qcyIsICJzcmMvbGliL3NwaXRyb2FzdC9kaXN0L2VzbS9nZXQtcGF0Y2gtZnVuYy5qcyIsICJzcmMvbGliL3NwaXRyb2FzdC9kaXN0L2VzbS9pbmRleC5qcyIsICJzcmMvYXBpL3BhdGNoZXIvaW5kZXguanMiLCAic3JjL290aGVyL2xvYWRpbmctYW5pbWF0aW9uL3N0eWxlLnNjc3MiLCAic3JjL290aGVyL2xvYWRpbmctYW5pbWF0aW9uL2luZGV4LmpzIiwgInNyYy9hcGkvc3RvcmFnZS9pbmRleC5qcyIsICJub2RlX21vZHVsZXMvaWRiLWtleXZhbC9kaXN0L2luZGV4LmpzIiwgInNyYy9saWIvanNvbi1kZWN5Y2xlZC9pbmRleC5qcyIsICJzcmMvYXBpL2V4dGVuc2lvbnMvaTE4bi5qcyIsICJzcmMvYXBpL2V4dGVuc2lvbnMvaW5kZXguanMiLCAic3JjL2FwaS93ZWJzb2NrZXQvaW5kZXguanMiLCAic3JjL2FwaS91aS9zdHlsZXMuc2NzcyIsICJzcmMvYXBpL3VpL3Rvb2x0aXBzLmpzIiwgInNyYy9hcGkvdWkvbm90aWZpY2F0aW9ucy5qcyIsICJzcmMvYXBpL3VpL2NvbnRleHRNZW51cy5qcyIsICJzcmMvbGliL2NvbXBvbmVudHMvRXJyb3JCb3VuZGFyeS5qc3giLCAic3JjL2FwaS91aS9jb21wb25lbnRzLmpzIiwgInNyYy9hcGkvdWkvbW9kYWxzLmpzeCIsICJzcmMvYXBpL3VpL3RvYXN0cy5qcyIsICJzcmMvYXBpL3VpL3Z1ZS9jb21wb25lbnRzL2Rpc2NvcmQtYnV0dG9uL2luZGV4LmpzIiwgInNyYy9hcGkvdWkvdnVlL2NvbXBvbmVudHMvZGlzY29yZC1jaGVjay9zdHlsZS5zY3NzIiwgInNyYy9hcGkvdWkvdnVlL2NvbXBvbmVudHMvZGlzY29yZC1jaGVjay9pbmRleC5qcyIsICJzcmMvYXBpL3VpL3Z1ZS9jb21wb25lbnRzL2Rpc2NvcmQtaW5wdXQvaW5kZXguanMiLCAic3JjL2FwaS91aS92dWUvY29tcG9uZW50cy9kaXNjb3JkLXNlbGVjdC9zdHlsZS5zY3NzIiwgInNyYy9hcGkvdWkvdnVlL2NvbXBvbmVudHMvZGlzY29yZC1zZWxlY3QvaW5kZXguanMiLCAic3JjL2FwaS91aS92dWUvY29tcG9uZW50cy9kaXNjb3JkLXRleHRhcmVhL3N0eWxlLnNjc3MiLCAic3JjL2FwaS91aS92dWUvY29tcG9uZW50cy9kaXNjb3JkLXRleHRhcmVhL2luZGV4LmpzIiwgInNyYy9hcGkvdWkvdnVlL2NvbXBvbmVudHMvaW5kZXguanMiLCAic3JjL2FwaS91aS92dWUvdXRpbHMvcmVjb21wdXRlLmpzIiwgInNyYy9hcGkvdWkvdnVlL2luZGV4LmpzIiwgInNyYy9hcGkvdWkvaW5kZXguanMiLCAic3JjL2FwaS9kZXYvaW5kZXguanMiLCAic3JjL2FwaS9pbnRlcm5hbC9pbmRleC5qcyIsICJzcmMvYXBpL2luZGV4LmpzIiwgInNyYy9vdGhlci93ZWJzb2NrZXQtdHJpZ2dlcnMuanMiLCAic3JjL3VpL2hvbWUvc3R5bGUuc2NzcyIsICJzcmMvdWkvaG9tZS92dWUvY29tcG9uZW50cy9wYWdlcy9ob21lLXBhZ2UvaW5kZXguanMiLCAic3JjL3VpL2hvbWUvdnVlL2NvbXBvbmVudHMvcGFnZXMvaW5zdGFsbGVkLWV4dGVuc2lvbnMtcGFnZS9zdHlsZS5zY3NzIiwgInNyYy91aS9ob21lL3Z1ZS9jb21wb25lbnRzL3BhZ2VzL2luc3RhbGxlZC1leHRlbnNpb25zLXBhZ2UvaW5kZXguanMiLCAic3JjL3VpL2hvbWUvdnVlL2NvbXBvbmVudHMvcGFnZXMvc2V0dGluZ3MtcGFnZS9pbmRleC5qcyIsICJzcmMvdWkvaG9tZS92dWUvY29tcG9uZW50cy9wYWdlcy9zdG9yZS1wYWdlL2luZGV4LmpzIiwgInNyYy91aS9ob21lL3Z1ZS9jb21wb25lbnRzL3BhZ2VzL2luZGV4LmpzIiwgInNyYy91aS9ob21lL3Z1ZS9jb21wb25lbnRzL2NvbXBvbmVudHMvY29uZmlnL2NvbmZpZy1idXR0b24vaW5kZXguanMiLCAic3JjL3VpL2hvbWUvdnVlL2NvbXBvbmVudHMvY29tcG9uZW50cy9jb25maWcvY29uZmlnLWNoZWNrL2luZGV4LmpzIiwgInNyYy91aS9ob21lL3Z1ZS9jb21wb25lbnRzL2NvbXBvbmVudHMvY29uZmlnL21hcHMuanNvbiIsICJzcmMvdWkvaG9tZS92dWUvY29tcG9uZW50cy9jb21wb25lbnRzL2NvbmZpZy9jb25maWctY29sdW1uL2luZGV4LmpzIiwgInNyYy91aS9ob21lL3Z1ZS9jb21wb25lbnRzL2NvbXBvbmVudHMvY29uZmlnL2NvbmZpZy1oZWFkaW5nL2luZGV4LmpzIiwgInNyYy91aS9ob21lL3Z1ZS9jb21wb25lbnRzL2NvbXBvbmVudHMvY29uZmlnL2NvbmZpZy1pbnB1dC9pbmRleC5qcyIsICJzcmMvdWkvaG9tZS92dWUvY29tcG9uZW50cy9jb21wb25lbnRzL2NvbmZpZy9jb25maWctcGFyYWdyYXBoL2luZGV4LmpzIiwgInNyYy91aS9ob21lL3Z1ZS9jb21wb25lbnRzL2NvbXBvbmVudHMvY29uZmlnL2NvbmZpZy1yb3cvaW5kZXguanMiLCAic3JjL3VpL2hvbWUvdnVlL2NvbXBvbmVudHMvY29tcG9uZW50cy9jb25maWcvY29uZmlnLXNlbGVjdC9pbmRleC5qcyIsICJzcmMvdWkvaG9tZS92dWUvY29tcG9uZW50cy9jb21wb25lbnRzL2NvbmZpZy9jb25maWctc3BhY2VyL2luZGV4LmpzIiwgInNyYy91aS9ob21lL3Z1ZS9jb21wb25lbnRzL2NvbXBvbmVudHMvY29uZmlnL2NvbmZpZy10ZXh0YXJlYS9pbmRleC5qcyIsICJzcmMvdWkvaG9tZS92dWUvY29tcG9uZW50cy9jb21wb25lbnRzL2NvbmZpZy9zdHlsZS5zY3NzIiwgInNyYy91aS9ob21lL3Z1ZS9jb21wb25lbnRzL2NvbXBvbmVudHMvY29uZmlnL2luZGV4LmpzIiwgInNyYy91aS9ob21lL3Z1ZS9jb21wb25lbnRzL2NvbXBvbmVudHMvY2FyZHMvaW5zdGFsbGVkLWV4dGVuc2lvbi1jYXJkL3N0eWxlLnNjc3MiLCAic3JjL3VpL2hvbWUvdnVlL2NvbXBvbmVudHMvY29tcG9uZW50cy9jYXJkcy9pbnN0YWxsZWQtZXh0ZW5zaW9uLWNhcmQvaW5kZXguanMiLCAic3JjL3VpL2hvbWUvdnVlL2NvbXBvbmVudHMvY29tcG9uZW50cy9jYXJkcy9zdG9yZS1leHRlbnNpb24tY2FyZC9zdHlsZS5zY3NzIiwgInNyYy91aS9ob21lL3Z1ZS9jb21wb25lbnRzL2NvbXBvbmVudHMvY2FyZHMvc3RvcmUtZXh0ZW5zaW9uLWNhcmQvaW5kZXguanMiLCAic3JjL3VpL2hvbWUvdnVlL2NvbXBvbmVudHMvY29tcG9uZW50cy9jYXJkcy9pbmRleC5qcyIsICJzcmMvdWkvaG9tZS92dWUvY29tcG9uZW50cy9jb21wb25lbnRzL2luZGV4LmpzIiwgInNyYy91aS9ob21lL3Z1ZS9jb21wb25lbnRzL2luZGV4LmpzIiwgInNyYy91aS9ob21lL2luZGV4LmpzIiwgInNyYy91aS9vdGhlci9pbmRleC5qcyIsICJzcmMvaW5kZXguanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuZGVmYXVsdCA9IE9iamVjdC5mcmVlemUoe1xyXG4gICAgR0VUOiBcIkdFVFwiLFxyXG4gICAgU0VUOiBcIlNFVFwiLFxyXG4gICAgREVMRVRFOiBcIkRFTEVURVwiLFxyXG4gICAgVVBEQVRFOiBcIlVQREFURVwiLFxyXG59KTtcclxuIiwgIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IEV2ZW50c18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL0V2ZW50c1wiKSk7XHJcbmNsYXNzIEV2ZW50RW1pdHRlciB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmxpc3RlbmVycyA9IE9iamVjdC52YWx1ZXMoRXZlbnRzXzEuZGVmYXVsdCkucmVkdWNlKChhY2MsIHZhbCkgPT4gKChhY2NbdmFsXSA9IG5ldyBTZXQoKSksIGFjYyksIHt9KTtcclxuICAgICAgICB0aGlzLm9uID0gZnVuY3Rpb24gKGV2ZW50LCBsaXN0ZW5lcikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5saXN0ZW5lcnNbZXZlbnRdLmhhcyhsaXN0ZW5lcikpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IEVycm9yKGBUaGlzIGxpc3RlbmVyIG9uICR7ZXZlbnR9IGFscmVhZHkgZXhpc3RzLmApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubGlzdGVuZXJzW2V2ZW50XS5hZGQobGlzdGVuZXIpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5vbmNlID0gZnVuY3Rpb24gKGV2ZW50LCBsaXN0ZW5lcikge1xyXG4gICAgICAgICAgICBjb25zdCBvbmNlTGlzdGVuZXIgPSAoZXZlbnQsIGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMub2ZmKGV2ZW50LCBvbmNlTGlzdGVuZXIpO1xyXG4gICAgICAgICAgICAgICAgbGlzdGVuZXIoZXZlbnQsIGRhdGEpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0aGlzLm9uKGV2ZW50LCBvbmNlTGlzdGVuZXIpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5vZmYgPSBmdW5jdGlvbiAoZXZlbnQsIGxpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGlzdGVuZXJzW2V2ZW50XS5kZWxldGUobGlzdGVuZXIpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5lbWl0ID0gZnVuY3Rpb24gKGV2ZW50LCBkYXRhKSB7XHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgbGlzdGVuZXIgb2YgdGhpcy5saXN0ZW5lcnNbZXZlbnRdKSB7XHJcbiAgICAgICAgICAgICAgICBsaXN0ZW5lcihldmVudCwgZGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIGZvciAoY29uc3QgZXZlbnQgb2YgT2JqZWN0LnZhbHVlcyhFdmVudHNfMS5kZWZhdWx0KSkge1xyXG4gICAgICAgICAgICB0aGlzW2V2ZW50LnRvTG93ZXJDYXNlKCldID0gKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZW1pdChldmVudCwgZGF0YSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuZGVmYXVsdCA9IEV2ZW50RW1pdHRlcjtcclxuIiwgIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IEV2ZW50RW1pdHRlcl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL0V2ZW50RW1pdHRlclwiKSk7XHJcbmZ1bmN0aW9uIG1ha2UoXHJcbi8vIFRoaXMgY2FuIGJlIHNhZmVseSBpZ25vcmVkLCB0aGUgRGF0YSB3aWxsIGFsd2F5cyBiZSBhbiBvYmplY3Qgb3IgaXQgd29uJ3Qgd29yayBhbnl3YXkuXHJcbi8vIEB0cy1pZ25vcmVcclxuZGF0YSA9IHt9LCB7IG5lc3RBcnJheXMgPSB0cnVlLCB9ID0ge30pIHtcclxuICAgIGNvbnN0IGVtaXR0ZXIgPSBuZXcgRXZlbnRFbWl0dGVyXzEuZGVmYXVsdCgpO1xyXG4gICAgZnVuY3Rpb24gY3JlYXRlUHJveHkodGFyZ2V0LCByb290LCBwYXRoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm94eSh0YXJnZXQsIHtcclxuICAgICAgICAgICAgZ2V0KHRhcmdldCwgcHJvcGVydHkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG5ld1BhdGggPSBbLi4ucGF0aCwgcHJvcGVydHldO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSB0YXJnZXRbcHJvcGVydHldO1xyXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbWl0dGVyLmdldCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGg6IG5ld1BhdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghbmVzdEFycmF5cyAmJiBBcnJheS5pc0FycmF5KHZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZVByb3h5KHZhbHVlLCByb290LCBuZXdQYXRoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZVByb3h5KCh0YXJnZXRbcHJvcGVydHldID0ge30pLCByb290LCBuZXdQYXRoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0KHRhcmdldCwgcHJvcGVydHksIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXRbcHJvcGVydHldID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBlbWl0dGVyLnNldCh7XHJcbiAgICAgICAgICAgICAgICAgICAgcGF0aDogWy4uLnBhdGgsIHByb3BlcnR5XSxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgLy8gVGhpcyBuZWVkcyB0byByZXR1cm4gdHJ1ZSBvciBpdCBlcnJvcnMuIC9zaHJ1Z1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGRlbGV0ZVByb3BlcnR5KHRhcmdldCwgcHJvcGVydHkpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkZWxldGUgdGFyZ2V0W3Byb3BlcnR5XSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVtaXR0ZXIuZGVsZXRlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogWy4uLnBhdGgsIHByb3BlcnR5XSxcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaGFzKHRhcmdldCwgcHJvcGVydHkpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGFyZ2V0W3Byb3BlcnR5XSA9PT0gXCJvYmplY3RcIiAmJlxyXG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKHRhcmdldFtwcm9wZXJ0eV0pLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBwcm9wZXJ0eSBpbiB0YXJnZXQ7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7IHN0b3JlOiBjcmVhdGVQcm94eShkYXRhLCBkYXRhLCBbXSksIFxyXG4gICAgICAgIC8vIFRoaXMgY2FuIGJlIHNhZmVseSBpZ25vcmVkLCB0aGUgRGF0YSB3aWxsIGFsd2F5cyBiZSBhbiBvYmplY3Qgb3IgaXQgd29uJ3Qgd29yayBhbnl3YXkuXHJcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgIGdob3N0OiBkYXRhIH0sIGVtaXR0ZXIpO1xyXG59XHJcbmV4cG9ydHMuZGVmYXVsdCA9IG1ha2U7XHJcbiIsICJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLm1ha2UgPSBleHBvcnRzLkV2ZW50cyA9IHZvaWQgMDtcclxudmFyIEV2ZW50c18xID0gcmVxdWlyZShcIi4vRXZlbnRzXCIpO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJFdmVudHNcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIF9faW1wb3J0RGVmYXVsdChFdmVudHNfMSkuZGVmYXVsdDsgfSB9KTtcclxudmFyIG1ha2VfMSA9IHJlcXVpcmUoXCIuL21ha2VcIik7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIm1ha2VcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIF9faW1wb3J0RGVmYXVsdChtYWtlXzEpLmRlZmF1bHQ7IH0gfSk7XHJcbiIsICJ7XHJcbiAgXCJjb21tb25cIjoge1xyXG4gICAgXCJtb2RhbHNcIjoge1xyXG4gICAgICBcImNvbXBvbmVudHNcIjoge1xyXG4gICAgICAgIFwib3RoZXJcIjoge1xyXG4gICAgICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgXCJIZWFkZXJcIixcclxuICAgICAgICAgICAgICAgIFwiRm9vdGVyXCJcclxuICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJSb290XCI6IHtcclxuICAgICAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgICAgIFwiaW5cIjogXCJzdHJpbmdzXCIsXHJcbiAgICAgICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgIFwiRU5URVJJTkdcIixcclxuICAgICAgICAgICAgICAgIFwiaGVhZGVySWRcIlxyXG4gICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBcImFjdGlvbnNcIjoge1xyXG4gICAgICAgIFwib3BlblwiOiB7XHJcbiAgICAgICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgICAgICBcImluXCI6IFwic3RyaW5nc1wiLFxyXG4gICAgICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICBcIm9uQ2xvc2VDYWxsYmFja1wiLFxyXG4gICAgICAgICAgICAgICAgXCJMYXllclwiXHJcbiAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICAgICAgXCJiZWZvcmVcIjogW1xyXG4gICAgICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgICAgICBcIm9wZW5cIlxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgXCJtYXBcIjoge1xyXG4gICAgICAgICAgICBcIm9wZW5cIjogW1xyXG4gICAgICAgICAgICAgIFwib25DbG9zZUNhbGxiYWNrXCIsXHJcbiAgICAgICAgICAgICAgXCJMYXllclwiXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiY2xvc2VcIjoge1xyXG4gICAgICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICAgICAgXCJpblwiOiBcInN0cmluZ3NcIixcclxuICAgICAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgXCJvbkNsb3NlQ2FsbGJhY2soKVwiXHJcbiAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICAgICAgXCJiZWZvcmVcIjogW1xyXG4gICAgICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgICAgICBcImNsb3NlXCJcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIFwibWFwXCI6IHtcclxuICAgICAgICAgICAgXCJjbG9zZVwiOiBbXHJcbiAgICAgICAgICAgICAgXCJvbkNsb3NlQ2FsbGJhY2soKVwiXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcImNvbXBvbmVudHNcIjoge1xyXG4gICAgICBcIkJ1dHRvblwiOiB7XHJcbiAgICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgXCJCb3JkZXJDb2xvcnNcIlxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgICAgXCJiZWZvcmVcIjogW1xyXG4gICAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICAgIF0sXHJcbiAgICAgICAgICBcImFmdGVyXCI6IFwiQnV0dG9uXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwibWFwXCI6IHtcclxuICAgICAgICAgIFwiQnV0dG9uXCI6IFtcclxuICAgICAgICAgICAgXCIuRklMTEVEXCIsXHJcbiAgICAgICAgICAgIFwiLm9uTW91c2VMZWF2ZVwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBcIkNvbmZpcm1hdGlvbk1vZGFsXCI6IHtcclxuICAgICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgICBcImluXCI6IFwic3RyaW5nc1wiLFxyXG4gICAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICBcIi5jb25maXJtQnV0dG9uQ29sb3JcIlxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIm1hcFwiOiB7XHJcbiAgICAgICAgICBcIkNvbmZpcm1hdGlvbk1vZGFsXCI6IFtcclxuICAgICAgICAgICAgXCIuY29uZmlybUJ1dHRvbkNvbG9yXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgICBcImJlZm9yZVwiOiBbXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgICAgXSxcclxuICAgICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgICBcIkNvbmZpcm1hdGlvbk1vZGFsXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIFwiVGV4dFwiOiB7XHJcbiAgICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICAgIFwiZmlsdGVyXCI6IFwiJD8uU2l6ZXM/LlNJWkVfMzIgJiYgJC5Db2xvcnNcIixcclxuICAgICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgICAgXCJiZWZvcmVcIjogW1xyXG4gICAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIFwiVG9vbHRpcFwiOiB7XHJcbiAgICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgICAgXCJpblwiOiBcInByb3RvdHlwZXNcIixcclxuICAgICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgXCJyZW5kZXJUb29sdGlwXCJcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICAgIFwiYmVmb3JlXCI6IFtcclxuICAgICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBcIk1hcmtkb3duXCI6IHtcclxuICAgICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgICAgXCJmaWx0ZXJcIjogXCIkPy5wcm90b3R5cGU/LnJlbmRlciAmJiAkLnJ1bGVzXCIsXHJcbiAgICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIkZsdXhEaXNwYXRjaGVyXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJfY3VycmVudERpc3BhdGNoQWN0aW9uVHlwZVwiLFxyXG4gICAgICAgICAgICBcImRpc3BhdGNoXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIlJlYWN0XCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJjcmVhdGVFbGVtZW50XCIsXHJcbiAgICAgICAgICAgIFwidXNlU3RhdGVcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiUmVzdFwiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwiZ2V0XCIsXHJcbiAgICAgICAgICAgIFwicG9zdFwiLFxyXG4gICAgICAgICAgICBcImdldEFQSUJhc2VVUkxcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiUm91dGVyXCI6IHtcclxuICAgICAgXCJ0cmFuc2l0aW9uVG9cIjoge1xyXG4gICAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICAgIFwiaW5cIjogXCJzdHJpbmdzXCIsXHJcbiAgICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgIFwidHJhbnNpdGlvblRvIC0gVHJhbnNpdGlvbmluZyB0byBcIlxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgICAgXCJiZWZvcmVcIjogW1xyXG4gICAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICAgIF0sXHJcbiAgICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgICAgXCJ0cmFuc2l0aW9uVG9cIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJtYXBcIjoge1xyXG4gICAgICAgICAgXCJ0cmFuc2l0aW9uVG9cIjogW1xyXG4gICAgICAgICAgICBcInRyYW5zaXRpb25UbyAtIFRyYW5zaXRpb25pbmcgdG8gXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIFwicmVwbGFjZVdpdGhcIjoge1xyXG4gICAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICAgIFwiaW5cIjogXCJzdHJpbmdzXCIsXHJcbiAgICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgIFwiXFxcIlJlcGxhY2luZyByb3V0ZSB3aXRoIFxcXCJcIlxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgICAgXCJiZWZvcmVcIjogW1xyXG4gICAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICAgIF0sXHJcbiAgICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgICAgXCJyZXBsYWNlV2l0aFwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIm1hcFwiOiB7XHJcbiAgICAgICAgICBcInJlcGxhY2VXaXRoXCI6IFtcclxuICAgICAgICAgICAgXCJcXFwiUmVwbGFjaW5nIHJvdXRlIHdpdGggXFxcIlwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJGbHV4XCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJjb25uZWN0U3RvcmVzXCIsXHJcbiAgICAgICAgICAgIFwiZGVzdHJveVwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJXZWJTb2NrZXRcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IFwiJD8uX19wcm90b19fPy5oYW5kbGVDb25uZWN0aW9uXCIsXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJiZWZvcmVcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJBY3Rpdml0eUFjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcInNlbmRBY3Rpdml0eUludml0ZVwiLFxyXG4gICAgICAgICAgICBcInVwZGF0ZUFjdGl2aXR5XCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIlByaXZhdGVDaGFubmVsQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwib3BlblByaXZhdGVDaGFubmVsXCIsXHJcbiAgICAgICAgICAgIFwiZW5zdXJlUHJpdmF0ZUNoYW5uZWxcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiQWNrQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiaW5cIjogXCJzdHJpbmdzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwidHlwZTpcXFwiQlVMS19BQ0tcXFwiXCJcclxuICAgICAgICAgIF0sXHJcbiAgICAgICAgICBbXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiB0cnVlLFxyXG4gICAgICAgIFwiYmVmb3JlXCI6IFwiZXhwb3J0c1wiXHJcbiAgICAgIH0sXHJcbiAgICAgIFwibWFwXCI6IHtcclxuICAgICAgICBcImFja1wiOiBbXHJcbiAgICAgICAgICBcInR5cGU6XFxcIkNIQU5ORUxfQUNLXFxcIlwiLFxyXG4gICAgICAgICAgXCJtZXNzYWdlSWRcIixcclxuICAgICAgICAgIFwiY2hhbm5lbElkXCJcclxuICAgICAgICBdLFxyXG4gICAgICAgIFwiYnVsa0Fja1wiOiBbXHJcbiAgICAgICAgICBcInR5cGU6XFxcIkJVTEtfQUNLXFxcIlwiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJBbmFseXRpY3NBY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJpc1Rocm90dGxlZFwiLFxyXG4gICAgICAgICAgICBcInRyYWNrXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIkFuaW1hdGlvbkFjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJzcHJpbmdcIixcclxuICAgICAgICAgICAgXCJkZWNheVwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJDb25uZWN0aW9uQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwic2V0U2hvd0FjdGl2aXR5XCIsXHJcbiAgICAgICAgICAgIFwic2V0VmlzaWJpbGl0eVwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJSVENDb25uZWN0aW9uQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwiZ2V0Q2hhbm5lbElkXCIsXHJcbiAgICAgICAgICAgIFwiZ2V0R3VpbGRJZFwiLFxyXG4gICAgICAgICAgICBcImdldFJUQ0Nvbm5lY3Rpb25JZFwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJFbW9qaUFjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcInRyYW5zbGF0ZUlubGluZUVtb2ppVG9TdXJyb2dhdGVzXCIsXHJcbiAgICAgICAgICAgIFwidHJhbnNsYXRlU3Vycm9nYXRlc1RvSW5saW5lRW1vamlcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiRW1vamlTdGF0ZUFjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcImdldFVSTFwiLFxyXG4gICAgICAgICAgICBcImlzRW1vamlEaXNhYmxlZFwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJHdWlsZE5vdGlmaWNhdGlvbnNBY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJ1cGRhdGVDaGFubmVsT3ZlcnJpZGVTZXR0aW5nc1wiLFxyXG4gICAgICAgICAgICBcInVwZGF0ZUd1aWxkTm90aWZpY2F0aW9uU2V0dGluZ3NcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiSW50ZXJuYWxSZWFjdFwiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwianN4XCIsXHJcbiAgICAgICAgICAgIFwianN4c1wiLFxyXG4gICAgICAgICAgICBcIkZyYWdtZW50XCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIkxvZ2luQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwibG9naW5cIixcclxuICAgICAgICAgICAgXCJsb2dvdXRcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiUXVlcnlBY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJxdWVyeUVtb2ppUmVzdWx0c1wiLFxyXG4gICAgICAgICAgICBcInF1ZXJ5RnJpZW5kc1wiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJNZXNzYWdlQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwicmVjZWl2ZU1lc3NhZ2VcIixcclxuICAgICAgICAgICAgXCJzZW5kTWVzc2FnZVwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJQcmVtaXVtQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwiaXNQcmVtaXVtXCIsXHJcbiAgICAgICAgICAgIFwiY2FuVXNlRW1vamlzRXZlcnl3aGVyZVwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJWb2ljZUFjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcInNlbGVjdFZvaWNlQ2hhbm5lbFwiLFxyXG4gICAgICAgICAgICBcImRpc2Nvbm5lY3RcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiVHlwaW5nQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwic3RhcnRUeXBpbmdcIixcclxuICAgICAgICAgICAgXCJzdG9wVHlwaW5nXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIkd1aWxkQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwic2V0Q2hhbm5lbFwiLFxyXG4gICAgICAgICAgICBcInNldFNlcnZlck11dGVcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiSW52aXRlQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwiYWNjZXB0SW52aXRlXCIsXHJcbiAgICAgICAgICAgIFwiYWNjZXB0SW52aXRlQW5kVHJhbnNpdGlvblRvSW52aXRlQ2hhbm5lbFwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJNZWRpYUVuZ2luZUFjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcInRvZ2dsZVNlbGZEZWFmXCIsXHJcbiAgICAgICAgICAgIFwidG9nZ2xlU2VsZk11dGVcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiaTE4blwiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwiX3JlcXVlc3RlZExvY2FsZVwiLFxyXG4gICAgICAgICAgICBcImdldERlZmF1bHRMb2NhbGVcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwidXVpZFwiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwidjFcIixcclxuICAgICAgICAgICAgXCJ2NFwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJobGpzXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJoaWdobGlnaHRBbGxcIixcclxuICAgICAgICAgICAgXCJoaWdobGlnaHRcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufSIsICJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBmaW5kSW5UcmVlKFxyXG4gIHRyZWUsXHJcbiAgc2VhcmNoRmlsdGVyLFxyXG4gIHsgd2Fsa2FibGUgPSBudWxsLCBpZ25vcmUgPSBbXSwgbGltaXQgPSAyNTYsIGFsbCA9IGZhbHNlIH0gPSB7fVxyXG4pIHtcclxuICBsZXQgaXRlcmF0aW9uID0gMDtcclxuICBsZXQgZm91bmRMaXN0ID0gW107XHJcblxyXG4gIGZ1bmN0aW9uIGRvU2VhcmNoKHRyZWUsIHNlYXJjaEZpbHRlciwgeyB3YWxrYWJsZSA9IG51bGwsIGlnbm9yZSA9IFtdIH0gPSB7fSkge1xyXG4gICAgaXRlcmF0aW9uICs9IDE7XHJcbiAgICBpZiAoaXRlcmF0aW9uID4gbGltaXQpIHJldHVybjtcclxuXHJcbiAgICBpZiAodHlwZW9mIHNlYXJjaEZpbHRlciA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICBpZiAodHJlZS5oYXNPd25Qcm9wZXJ0eShzZWFyY2hGaWx0ZXIpKSB7XHJcbiAgICAgICAgaWYgKGFsbCkgZm91bmRMaXN0LnB1c2godHJlZVtzZWFyY2hGaWx0ZXJdKTtcclxuICAgICAgICBpZiAoIWFsbCkgcmV0dXJuIHRyZWVbc2VhcmNoRmlsdGVyXTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChzZWFyY2hGaWx0ZXIodHJlZSkpIHtcclxuICAgICAgaWYgKGFsbCkgZm91bmRMaXN0LnB1c2godHJlZSk7XHJcbiAgICAgIGlmICghYWxsKSByZXR1cm4gdHJlZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXRyZWUpIHJldHVybjtcclxuXHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh0cmVlKSkge1xyXG4gICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgdHJlZSkge1xyXG4gICAgICAgIGNvbnN0IGZvdW5kID0gZG9TZWFyY2goaXRlbSwgc2VhcmNoRmlsdGVyLCB7IHdhbGthYmxlLCBpZ25vcmUgfSk7XHJcbiAgICAgICAgaWYgKGZvdW5kKSBmb3VuZExpc3QucHVzaChmb3VuZCk7XHJcbiAgICAgICAgaWYgKGZvdW5kICYmICFhbGwpIHJldHVybiBmb3VuZDtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdHJlZSA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiB0cmVlKSB7XHJcbiAgICAgICAgaWYgKHdhbGthYmxlICE9IG51bGwgJiYgIXdhbGthYmxlLmluY2x1ZGVzKGtleSkpIGNvbnRpbnVlO1xyXG5cclxuICAgICAgICBpZiAoaWdub3JlLmluY2x1ZGVzKGtleSkpIGNvbnRpbnVlO1xyXG5cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgY29uc3QgZm91bmQgPSBkb1NlYXJjaCh0cmVlW2tleV0sIHNlYXJjaEZpbHRlciwge1xyXG4gICAgICAgICAgICB3YWxrYWJsZSxcclxuICAgICAgICAgICAgaWdub3JlLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBpZiAoZm91bmQpIGZvdW5kTGlzdC5wdXNoKGZvdW5kKTtcclxuICAgICAgICAgIGlmIChmb3VuZCAmJiAhYWxsKSByZXR1cm4gZm91bmQ7XHJcbiAgICAgICAgfSBjYXRjaCB7IH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGRvU2VhcmNoKHRyZWUsIHNlYXJjaEZpbHRlciwgeyB3YWxrYWJsZSwgaWdub3JlIH0pID8/IGZvdW5kTGlzdDtcclxufTtcclxuIiwgImZ1bmN0aW9uIGJ1aWxkKHByZWZpeCA9IFwiQWNvcmRcIiwgdHlwZSwgY29sb3IpIHtcclxuICByZXR1cm4gKC4uLmlucHV0KSA9PiBjb25zb2xlW3R5cGVdKFxyXG4gICAgYCVjJHtwcmVmaXh9JWNgLFxyXG4gICAgYGJhY2tncm91bmQtY29sb3I6ICR7Y29sb3J9OyBjb2xvcjogd2hpdGU7IGJvcmRlci1yYWRpdXM6IDRweDsgcGFkZGluZzogMHB4IDZweCAwcHggNnB4OyBmb250LXdlaWdodDogYm9sZGAsXHJcbiAgICBcIlwiLFxyXG4gICAgLi4uaW5wdXRcclxuICApO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgbG9nOiBidWlsZChcIkFjb3JkXCIsIFwibG9nXCIsIFwiIzAwZmJiMFwiKSxcclxuICBkZWJ1ZzogYnVpbGQoXCJBY29yZCBEZWJ1Z1wiLCBcImRlYnVnXCIsIFwiIzAwZmJiMFwiKSxcclxuICBpbmZvOiBidWlsZChcIkFjb3JkIEluZm9cIiwgXCJsb2dcIiwgXCIjODJhYWZmXCIpLFxyXG4gIHdhcm46IGJ1aWxkKFwiQWNvcmQgV2FyblwiLCBcIndhcm5cIiwgXCIjZGViZjE4XCIpLFxyXG4gIGVycm9yOiBidWlsZChcIkFjb3JkIEVycm9yXCIsIFwiZXJyb3JcIiwgXCIjZWY1ODU4XCIpLFxyXG4gIGJ1aWxkXHJcbn0iLCAiaW1wb3J0IGZpbmRJblRyZWUgZnJvbSBcIi4vcmF3L2ZpbmQtaW4tdHJlZS5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGdldEluc3RhbmNlKG5vZGUpIHtcclxuICAgIHJldHVybiBPYmplY3QuZW50cmllcyhub2RlKS5maW5kKGkgPT4gaVswXS5zdGFydHNXaXRoKFwiX19yZWFjdEludGVybmFsSW5zdGFuY2VcIikgfHwgaVswXS5zdGFydHNXaXRoKFwiX19yZWFjdEZpYmVyXCIpKT8uWzFdO1xyXG4gIH0sXHJcbiAgZ2V0T3duZXJJbnN0YW5jZShub2RlKSB7XHJcbiAgICBsZXQgaW5zdGFuY2UgPSB0aGlzLmdldEluc3RhbmNlKG5vZGUpO1xyXG4gICAgZm9yIChsZXQgZWwgPSBpbnN0YW5jZTsgZWw7IGVsID0gZWwucmV0dXJuKVxyXG4gICAgICBpZiAoZWwuc3RhdGVOb2RlPy5mb3JjZVVwZGF0ZSkgcmV0dXJuIGVsLnN0YXRlTm9kZTtcclxuICB9LFxyXG4gIGZpbmRJblRyZWUodHJlZSwgZmlsdGVyKSB7XHJcbiAgICByZXR1cm4gZmluZEluVHJlZSh0cmVlLCBmaWx0ZXIsIHtcclxuICAgICAgd2Fsa2FibGU6IFtcInByb3BzXCIsIFwic3RhdGVcIiwgXCJjaGlsZHJlblwiLCBcInJldHVyblwiXVxyXG4gICAgfSk7XHJcbiAgfSxcclxuICBnZXRDb21wb25lbnRzKG5vZGUpIHtcclxuICAgIGNvbnN0IGluc3RhbmNlID0gdGhpcy5nZXRJbnN0YW5jZShub2RlKTtcclxuICAgIGNvbnN0IGNvbXBvbmVudHMgPSBbXTtcclxuICAgIGxldCBsYXN0SW5zdGFuY2UgPSBpbnN0YW5jZTtcclxuICAgIHdoaWxlIChsYXN0SW5zdGFuY2UgJiYgbGFzdEluc3RhbmNlLnJldHVybikge1xyXG4gICAgICBpZiAodHlwZW9mIGxhc3RJbnN0YW5jZS5yZXR1cm4udHlwZSA9PT0gXCJzdHJpbmdcIikgYnJlYWs7XHJcbiAgICAgIGlmIChsYXN0SW5zdGFuY2UucmV0dXJuLnR5cGUpIGNvbXBvbmVudHMucHVzaChsYXN0SW5zdGFuY2UucmV0dXJuLnR5cGUpO1xyXG4gICAgICBsYXN0SW5zdGFuY2UgPSBsYXN0SW5zdGFuY2UucmV0dXJuO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNvbXBvbmVudHM7XHJcbiAgfSxcclxuICBnZXRTdGF0ZU5vZGVzKG5vZGUpIHtcclxuICAgIGNvbnN0IGluc3RhbmNlID0gdGhpcy5nZXRJbnN0YW5jZShub2RlKTtcclxuICAgIGNvbnN0IHN0YXRlTm9kZXMgPSBbXTtcclxuICAgIGxldCBsYXN0SW5zdGFuY2UgPSBpbnN0YW5jZTtcclxuICAgIHdoaWxlIChsYXN0SW5zdGFuY2UgJiYgbGFzdEluc3RhbmNlLnJldHVybikge1xyXG4gICAgICBpZiAobGFzdEluc3RhbmNlLnJldHVybi5zdGF0ZU5vZGUgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkgYnJlYWs7XHJcbiAgICAgIGlmIChsYXN0SW5zdGFuY2UucmV0dXJuLnN0YXRlTm9kZSlcclxuICAgICAgICBzdGF0ZU5vZGVzLnB1c2gobGFzdEluc3RhbmNlLnJldHVybi5zdGF0ZU5vZGUpO1xyXG4gICAgICBsYXN0SW5zdGFuY2UgPSBsYXN0SW5zdGFuY2UucmV0dXJuO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN0YXRlTm9kZXM7XHJcbiAgfSxcclxuICBnZXRQcm9wcyhlbCwgZmlsdGVyID0gKGkpID0+IGksIG1heCA9IDEwMDAwKSB7XHJcbiAgICBjb25zdCBpbnN0YW5jZSA9IHRoaXMuZ2V0SW5zdGFuY2UoZWwpO1xyXG5cclxuICAgIGlmICghaW5zdGFuY2U/LnJldHVybikgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgZm9yIChcclxuICAgICAgbGV0IGN1cnJlbnQgPSBpbnN0YW5jZT8ucmV0dXJuLCBpID0gMDtcclxuICAgICAgaSA+IG1heCB8fCBjdXJyZW50ICE9PSBudWxsO1xyXG4gICAgICBjdXJyZW50ID0gY3VycmVudD8ucmV0dXJuLCBpKytcclxuICAgICkge1xyXG4gICAgICBpZiAoY3VycmVudD8ucGVuZGluZ1Byb3BzICYmIGZpbHRlcihjdXJyZW50LnBlbmRpbmdQcm9wcykpXHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnQucGVuZGluZ1Byb3BzO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH0sXHJcbn0iLCAiaW1wb3J0IGZpbmRJblRyZWUgZnJvbSBcIi4vcmF3L2ZpbmQtaW4tdHJlZS5qc1wiO1xyXG5pbXBvcnQgbG9nZ2VyIGZyb20gXCIuL2xvZ2dlci5qc1wiO1xyXG5pbXBvcnQgcmVhY3QgZnJvbSBcIi4vcmVhY3QuanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBsb2dnZXIsXHJcbiAgcmVhY3QsXHJcbiAgZmluZEluVHJlZSxcclxuICBmb3JtYXQodmFsLCAuLi5hcmdzKSB7XHJcbiAgICByZXR1cm4gYCR7dmFsfWAucmVwbGFjZUFsbCgveyhcXGQrKX0vZywgKF8sIGNhcCkgPT4ge1xyXG4gICAgICByZXR1cm4gYXJnc1tOdW1iZXIoY2FwKV07XHJcbiAgICB9KTtcclxuICB9LFxyXG4gIGludGVydmFsKGNiLCBkdXIpIHtcclxuICAgIGxldCBpbnRlcnZhbCA9IHNldEludGVydmFsKGNiLCBkdXIpO1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgdGltZW91dChjYiwgZHVyKSB7XHJcbiAgICBsZXQgdGltZW91dCA9IHNldFRpbWVvdXQoY2IsIGR1cik7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgaWZFeGlzdHModmFsLCBjYikge1xyXG4gICAgaWYgKHZhbCkgY2IodmFsKTtcclxuICB9LFxyXG4gIGNvcHlUZXh0KHRleHQpIHtcclxuICAgIGlmICh3aW5kb3cuRGlzY29yZE5hdGl2ZSkge1xyXG4gICAgICBEaXNjb3JkTmF0aXZlLmNsaXBib2FyZC5jb3B5KHRleHQpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgbmF2aWdhdG9yLmNsaXBib2FyZC53cml0ZVRleHQodGV4dCkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICBjb25zdCBjb3B5QXJlYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZXh0YXJlYVwiKTtcclxuXHJcbiAgICAgIGNvcHlBcmVhLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xyXG4gICAgICBjb3B5QXJlYS5zdHlsZS5wb3NpdGlvbiA9IFwiZml4ZWRcIjtcclxuICAgICAgY29weUFyZWEuc3R5bGUudG9wID0gXCIwXCI7XHJcbiAgICAgIGNvcHlBcmVhLnN0eWxlLmxlZnQgPSBcIjBcIjtcclxuXHJcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY29weUFyZWEpO1xyXG4gICAgICBjb3B5QXJlYS5mb2N1cygpO1xyXG4gICAgICBjb3B5QXJlYS5zZWxlY3QoKTtcclxuXHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoXCJjb3B5XCIpO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoY29weUFyZWEpO1xyXG4gICAgfSk7XHJcbiAgfSxcclxuICBzbGVlcChtcykge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIG1zKSk7XHJcbiAgfSxcclxuICBtYXBSZXBsYWNlKHRleHQsIG1hcCA9IHt9KSB7XHJcbiAgICByZXR1cm4gKEFycmF5LmlzQXJyYXkobWFwKSA/IG1hcCA6IE9iamVjdC5lbnRyaWVzKG1hcCkpLnJlZHVjZSgoYWxsLCBjdXJyZW50KSA9PiBhbGwucmVwbGFjZUFsbChjdXJyZW50WzBdLCBjdXJyZW50WzFdKSwgdGV4dCk7XHJcbiAgfSxcclxuICBlc2NhcGVSZWdleChzdHIpIHtcclxuICAgIHJldHVybiBzdHJcclxuICAgICAgLnJlcGxhY2UoL1t8XFxcXHt9KClbXFxdXiQrKj8uXS9nLCAnXFxcXCQmJylcclxuICAgICAgLnJlcGxhY2UoLy0vZywgJ1xcXFx4MmQnKTtcclxuICB9XHJcbn0iLCAiaW1wb3J0IHV0aWxzIGZyb20gXCIuLi8uLi91dGlscy9pbmRleC5qc1wiO1xyXG5pbXBvcnQgbG9nZ2VyIGZyb20gXCIuLi8uLi91dGlscy9sb2dnZXIuanNcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB3cmFwRmlsdGVyKGZpbHRlcikge1xyXG4gIHJldHVybiAoLi4uYXJncykgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgaWYgKGFyZ3NbMF0/LmRvY3VtZW50ICYmIGFyZ3NbMF0/LndpbmRvdykgcmV0dXJuIGZhbHNlO1xyXG4gICAgICBpZiAoYXJnc1swXT8uZGVmYXVsdD8ucmVtb3ZlICYmIGFyZ3NbMF0/LmRlZmF1bHQ/LnNldCAmJiBhcmdzWzBdPy5kZWZhdWx0Py5jbGVhciAmJiBhcmdzWzBdPy5kZWZhdWx0Py5nZXQgJiYgIWFyZ3NbMF0/LmRlZmF1bHQ/LnNvcnQpIHJldHVybiBmYWxzZTtcclxuICAgICAgaWYgKGFyZ3NbMF0ucmVtb3ZlICYmIGFyZ3NbMF0uc2V0ICYmIGFyZ3NbMF0uY2xlYXIgJiYgYXJnc1swXS5nZXQgJiYgIWFyZ3NbMF0uc29ydCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICBpZiAoYXJnc1swXT8uZGVmYXVsdD8uZ2V0VG9rZW4gfHwgYXJnc1swXT8uZGVmYXVsdD8uZ2V0RW1haWwgfHwgYXJnc1swXT8uZGVmYXVsdD8uc2hvd1Rva2VuKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIGlmIChhcmdzWzBdPy5nZXRUb2tlbiB8fCBhcmdzWzBdPy5nZXRFbWFpbCB8fCBhcmdzWzBdPy5zaG93VG9rZW4pIHJldHVybiBmYWxzZTtcclxuICAgICAgcmV0dXJuIGZpbHRlciguLi5hcmdzKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnIpIHtcclxuICAgICAgbG9nZ2VyLndhcm4oXCJNb2R1bGUgZmlsdGVyIHRocmV3IGFuIGV4Y2VwdGlvbi5cIiwgZmlsdGVyLCBlcnIpO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgfTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2hlY2tNb2R1bGVTdHJpbmdzKG0sIHN0cmluZ3MsIGhhc05vdCkge1xyXG4gIGNvbnN0IGNoZWNrID0gKHMxLCBzMikgPT4ge1xyXG4gICAgcmV0dXJuIGhhc05vdCA/IHMxLnRvU3RyaW5nKCkuaW5kZXhPZihzMi50b1N0cmluZygpKSA9PSAtMSA6IHMxLnRvU3RyaW5nKCkuaW5kZXhPZihzMi50b1N0cmluZygpKSA+IC0xO1xyXG4gIH07XHJcbiAgcmV0dXJuIHN0cmluZ3MuZXZlcnkoaiA9PiB7XHJcbiAgICByZXR1cm4gY2hlY2sobT8udG9TdHJpbmc/LigpIHx8IFwiXCIsIGopXHJcbiAgICAgIHx8IGNoZWNrKG0/Ll9fb3JpZ2luYWxfXz8udG9TdHJpbmc/LigpIHx8IFwiXCIsIGopXHJcbiAgICAgIHx8IGNoZWNrKG0/LnR5cGU/LnRvU3RyaW5nPy4oKSB8fCBcIlwiLCBqKVxyXG4gICAgICB8fCBjaGVjayhtPy50eXBlPy5fX29yaWdpbmFsX18/LnRvU3RyaW5nPy4oKSB8fCBcIlwiLCBqKVxyXG4gICAgICB8fCBPYmplY3QuZW50cmllcyhbJ2Z1bmN0aW9uJywgJ29iamVjdCddLmluY2x1ZGVzKHR5cGVvZiBtPy5wcm90b3R5cGUpID8gdHlwZW9mIG0/LnByb3RvdHlwZSA6IHt9KS5maWx0ZXIoaSA9PiBpWzBdPy5pbmNsdWRlcz8uKFwicmVuZGVyXCIpKS5zb21lKGkgPT4gY2hlY2soaVsxXT8udG9TdHJpbmc/LigpIHx8IFwiXCIsIGopKVxyXG4gIH0pO1xyXG59O1xyXG5mdW5jdGlvbiBjaGVja01vZHVsZVByb3BzKG0sIHByb3BlcnRpZXMsIGhhc05vdCkge1xyXG4gIHJldHVybiBwcm9wZXJ0aWVzLmV2ZXJ5KHByb3AgPT4ge1xyXG4gICAgY29uc3QgdmFsdWUgPSBtW3Byb3BdPy5fX29yaWdpbmFsX18gfHwgbVtwcm9wXTtcclxuICAgIHJldHVybiBoYXNOb3QgPyB2YWx1ZSA9PT0gdW5kZWZpbmVkIDogKHZhbHVlICE9PSB1bmRlZmluZWQgJiYgISh0eXBlb2YgdmFsdWUgPT0gXCJzdHJpbmdcIiAmJiAhdmFsdWUpKTtcclxuICB9KTtcclxufTtcclxuZnVuY3Rpb24gY2hlY2tNb2R1bGVQcm90b3R5cGVzKG0sIHByb3RvUHJvcHMsIGhhc05vdCkge1xyXG4gIHJldHVybiBtLnByb3RvdHlwZSAmJiBwcm90b1Byb3BzLmV2ZXJ5KHByb3AgPT4ge1xyXG4gICAgY29uc3QgdmFsdWUgPSBtLnByb3RvdHlwZVtwcm9wXTtcclxuICAgIHJldHVybiBoYXNOb3QgPyB2YWx1ZSA9PT0gdW5kZWZpbmVkIDogKHZhbHVlICE9PSB1bmRlZmluZWQgJiYgISh0eXBlb2YgdmFsdWUgPT0gXCJzdHJpbmdcIiAmJiAhdmFsdWUpKTtcclxuICB9KTtcclxufTtcclxuXHJcbmNvbnN0IHdlYnBhY2tDaHVua05hbWUgPSBcIndlYnBhY2tDaHVua2Rpc2NvcmRfYXBwXCI7XHJcbmNvbnN0IHB1c2hMaXN0ZW5lcnMgPSBuZXcgU2V0KCk7XHJcblxyXG5cclxue1xyXG4gIGxldCBvZ1B1c2ggPSB3aW5kb3dbd2VicGFja0NodW5rTmFtZV0ucHVzaDtcclxuXHJcbiAgZnVuY3Rpb24gaGFuZGxlUHVzaChjaHVuaykge1xyXG4gICAgY29uc3QgWywgbW9kdWxlc10gPSBjaHVuaztcclxuXHJcbiAgICBmb3IgKGNvbnN0IG1vZHVsZUlkIGluIE9iamVjdC5rZXlzKG1vZHVsZXMgfHwge30pKSB7XHJcbiAgICAgIGNvbnN0IG9nTW9kdWxlID0gbW9kdWxlc1ttb2R1bGVJZF07XHJcblxyXG4gICAgICBtb2R1bGVzW21vZHVsZUlkXSA9IChtb2R1bGUsIGV4cG9ydHMsIHJlcXVpcmUpID0+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgb2dNb2R1bGUuY2FsbChudWxsLCBtb2R1bGUsIGV4cG9ydHMsIHJlcXVpcmUpO1xyXG5cclxuICAgICAgICAgIHB1c2hMaXN0ZW5lcnMuZm9yRWFjaChsaXN0ZW5lciA9PiB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgbGlzdGVuZXIoZXhwb3J0cyk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgdXRpbHMubG9nZ2VyLmVycm9yKFwiUHVzaCBsaXN0ZW5lciB0aHJldyBhbiBleGNlcHRpb24uXCIsIGxpc3RlbmVyLCBlcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgIHV0aWxzLmxvZ2dlci5lcnJvcihcIlVuYWJsZSB0byBwYXRjaCBwdXNoZWQgbW9kdWxlLlwiLCBlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG5cclxuICAgICAgT2JqZWN0LmFzc2lnbihtb2R1bGVzW21vZHVsZUlkXSwgb2dNb2R1bGUsIHtcclxuICAgICAgICBfX29yaWdpbmFsX186IG9nTW9kdWxlLFxyXG4gICAgICAgIHRvU3RyaW5nOiAoKSA9PiBvZ01vZHVsZS50b1N0cmluZygpLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gb2dQdXNoLmNhbGwod2luZG93W3dlYnBhY2tDaHVua05hbWVdLCBjaHVuayk7XHJcbiAgfVxyXG5cclxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93W3dlYnBhY2tDaHVua05hbWVdLCBcInB1c2hcIiwge1xyXG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxyXG4gICAgZ2V0KCkgeyByZXR1cm4gaGFuZGxlUHVzaDsgfSxcclxuICAgIHNldCh2YWx1ZSkge1xyXG4gICAgICBvZ1B1c2ggPSB2YWx1ZTtcclxuXHJcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3dbdGhpcy5jaHVua05hbWVdLCBcInB1c2hcIiwge1xyXG4gICAgICAgIHZhbHVlOiB0aGlzLmhhbmRsZVB1c2gsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIHdyaXRhYmxlOiB0cnVlXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcblxyXG5cclxuXHJcbi8qKlxyXG4gKiBcclxuICogQHBhcmFtIHthbnl9IGZpbHRlciBcclxuICogQHBhcmFtIHt7IHNpZ25hbDogQWJvcnRTaWduYWwsIHNlYXJjaEV4cG9ydHM6IGJvb2xlYW4gfX0gcGFyYW0xIFxyXG4gKiBAcmV0dXJucyBcclxuICovXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsYXp5RmluZChmaWx0ZXIsIHsgc2lnbmFsID0gbnVsbCwgc2VhcmNoRXhwb3J0cyA9IGZhbHNlIH0pIHtcclxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgY29uc3QgY2FuY2VsID0gKCkgPT4gcHVzaExpc3RlbmVycy5kZWxldGUobGlzdGVuZXIpO1xyXG4gICAgY29uc3QgbGlzdGVuZXIgPSAoZXhwb3J0cykgPT4ge1xyXG4gICAgICBpZiAoIWV4cG9ydHMgfHwgZXhwb3J0cyA9PT0gd2luZG93IHx8IGV4cG9ydHMgPT09IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkgcmV0dXJuO1xyXG5cclxuICAgICAgbGV0IGZvdW5kID0gbnVsbDtcclxuXHJcbiAgICAgIGlmICh0eXBlb2YgZXhwb3J0cyA9PSBcIm9iamVjdFwiICYmIHNlYXJjaEV4cG9ydHMpIHtcclxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBleHBvcnRzKSB7XHJcbiAgICAgICAgICBsZXQgZXhwb3J0ZWQgPSBleHBvcnRzW2tleV07XHJcbiAgICAgICAgICBpZiAoIWV4cG9ydGVkKSBjb250aW51ZTtcclxuICAgICAgICAgIGlmIChmaWx0ZXIoZXhwb3J0ZWQpKSB7XHJcbiAgICAgICAgICAgIGZvdW5kID0gZXhwb3J0ZWQ7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBsZXQgcGF0aHMgPSBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCIsXHJcbiAgICAgICAgICBcIlwiXHJcbiAgICAgICAgXTtcclxuICAgICAgICBmb3VuZCA9IHBhdGhzLm1hcChpID0+IHtcclxuICAgICAgICAgIGxldCBwYXRoZWQgPSAhaSA/IGV4cG9ydHMgOiBfLmdldChleHBvcnRzLCBpKTtcclxuICAgICAgICAgIGlmIChwYXRoZWQgJiYgZmlsdGVyKHBhdGhlZCkpIHJldHVybiBwYXRoZWQ7XHJcbiAgICAgICAgfSkuZmluZChpID0+IGkpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIWZvdW5kKSByZXR1cm47XHJcbiAgICAgIGNhbmNlbCgpO1xyXG4gICAgICByZXNvbHZlKGZvdW5kKTtcclxuICAgIH1cclxuXHJcbiAgICBwdXNoTGlzdGVuZXJzLmFkZChsaXN0ZW5lcik7XHJcblxyXG4gICAgc2lnbmFsPy5hZGRFdmVudExpc3RlbmVyKFwiYWJvcnRcIiwgKCkgPT4ge1xyXG4gICAgICBjYW5jZWwoKTtcclxuICAgICAgcmVzb2x2ZShudWxsKTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZmluZChyZXEsIGZpbHRlciwgY29uZmlnID0ge30pIHtcclxuICBsZXQgZGVmYXVsdEV4cG9ydCA9IHR5cGVvZiBjb25maWcuZGVmYXVsdEV4cG9ydCAhPSBcImJvb2xlYW5cIiA/IGZhbHNlIDogY29uZmlnLmRlZmF1bHRFeHBvcnQ7XHJcbiAgbGV0IHVubG9hZGVkID0gdHlwZW9mIGNvbmZpZy51bmxvYWRlZCAhPSBcImJvb2xlYW5cIiA/IGZhbHNlIDogY29uZmlnLnVubG9hZGVkO1xyXG4gIGxldCBhbGwgPSB0eXBlb2YgY29uZmlnLmFsbCAhPSBcImJvb2xlYW5cIiA/IGZhbHNlIDogY29uZmlnLmFsbDtcclxuICBjb25zdCBmb3VuZCA9IFtdO1xyXG4gIGlmICghdW5sb2FkZWQpIGZvciAobGV0IGkgaW4gcmVxLmMpIGlmIChyZXEuYy5oYXNPd25Qcm9wZXJ0eShpKSkge1xyXG4gICAgbGV0IG0gPSByZXEuY1tpXS5leHBvcnRzLCByID0gbnVsbDtcclxuICAgIGlmIChtICYmICh0eXBlb2YgbSA9PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBtID09IFwiZnVuY3Rpb25cIikpIHtcclxuICAgICAgaWYgKCEhKHIgPSBmaWx0ZXIobSwgaSkpKSB7XHJcbiAgICAgICAgaWYgKGFsbCkgZm91bmQucHVzaChkZWZhdWx0RXhwb3J0ID8gciA6IHJlcS5jW2ldKTtcclxuICAgICAgICBlbHNlIHJldHVybiBkZWZhdWx0RXhwb3J0ID8gciA6IHJlcS5jW2ldO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgZm9yIChsZXQga2V5IG9mIE9iamVjdC5rZXlzKG0pKSBpZiAoa2V5Lmxlbmd0aCA8IDQgJiYgbVtrZXldICYmICEhKHIgPSBmaWx0ZXIobVtrZXldLCBpKSkpIHtcclxuICAgICAgICBpZiAoYWxsKSBmb3VuZC5wdXNoKGRlZmF1bHRFeHBvcnQgPyByIDogcmVxLmNbaV0pO1xyXG4gICAgICAgIGVsc2UgcmV0dXJuIGRlZmF1bHRFeHBvcnQgPyByIDogcmVxLmNbaV07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChtICYmIG0uX19lc01vZHVsZSAmJiBtLmRlZmF1bHQgJiYgKHR5cGVvZiBtLmRlZmF1bHQgPT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgbS5kZWZhdWx0ID09IFwiZnVuY3Rpb25cIikpIHtcclxuICAgICAgaWYgKCEhKHIgPSBmaWx0ZXIobS5kZWZhdWx0LCBpKSkpIHtcclxuICAgICAgICBpZiAoYWxsKSBmb3VuZC5wdXNoKGRlZmF1bHRFeHBvcnQgPyByIDogcmVxLmNbaV0pO1xyXG4gICAgICAgIGVsc2UgcmV0dXJuIGRlZmF1bHRFeHBvcnQgPyByIDogcmVxLmNbaV07XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZiAobS5kZWZhdWx0LnR5cGUgJiYgKHR5cGVvZiBtLmRlZmF1bHQudHlwZSA9PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBtLmRlZmF1bHQudHlwZSA9PSBcImZ1bmN0aW9uXCIpICYmICEhKHIgPSBmaWx0ZXIobS5kZWZhdWx0LnR5cGUsIGkpKSkge1xyXG4gICAgICAgIGlmIChhbGwpIGZvdW5kLnB1c2goZGVmYXVsdEV4cG9ydCA/IHIgOiByZXEuY1tpXSk7XHJcbiAgICAgICAgZWxzZSByZXR1cm4gZGVmYXVsdEV4cG9ydCA/IHIgOiByZXEuY1tpXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICBmb3IgKGxldCBpIGluIHJlcS5tKSBpZiAocmVxLm0uaGFzT3duUHJvcGVydHkoaSkpIHtcclxuICAgIGxldCBtID0gcmVxLm1baV07XHJcbiAgICBpZiAobSAmJiB0eXBlb2YgbSA9PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgaWYgKHJlcS5jW2ldICYmICF1bmxvYWRlZCAmJiBmaWx0ZXIobSwgaSkpIHtcclxuICAgICAgICBpZiAoYWxsKSBmb3VuZC5wdXNoKGRlZmF1bHRFeHBvcnQgPyByZXEuY1tpXS5leHBvcnRzIDogcmVxLmNbaV0pO1xyXG4gICAgICAgIGVsc2UgcmV0dXJuIGRlZmF1bHRFeHBvcnQgPyByZXEuY1tpXS5leHBvcnRzIDogcmVxLmNbaV07XHJcbiAgICAgIH1cclxuICAgICAgaWYgKCFyZXEuY1tpXSAmJiB1bmxvYWRlZCAmJiBmaWx0ZXIobSwgaSkpIHtcclxuICAgICAgICBjb25zdCByZXNvbHZlZCA9IHt9LCByZXNvbHZlZDIgPSB7fTtcclxuICAgICAgICBtKHJlc29sdmVkLCByZXNvbHZlZDIsIHJlcSk7XHJcbiAgICAgICAgY29uc3QgdHJ1ZVJlc29sdmVkID0gcmVzb2x2ZWQyICYmIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHJlc29sdmVkMiB8fCB7fSkubGVuZ3RoID09IDAgPyByZXNvbHZlZCA6IHJlc29sdmVkMjtcclxuICAgICAgICBpZiAoYWxsKSBmb3VuZC5wdXNoKGRlZmF1bHRFeHBvcnQgPyB0cnVlUmVzb2x2ZWQuZXhwb3J0cyA6IHRydWVSZXNvbHZlZCk7XHJcbiAgICAgICAgZWxzZSByZXR1cm4gZGVmYXVsdEV4cG9ydCA/IHRydWVSZXNvbHZlZC5leHBvcnRzIDogdHJ1ZVJlc29sdmVkO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIGlmIChhbGwpIHJldHVybiBmb3VuZDtcclxufTtcclxuXHJcblxyXG5mdW5jdGlvbiBmaW5kZXJGaW5kRnVuY3Rpb24oZW50cmllcywgc3RyaW5ncykge1xyXG4gIHJldHVybiAoZW50cmllcy5maW5kKG4gPT4ge1xyXG4gICAgbGV0IGZ1bmNTdHJpbmcgPSB0eXBlb2YgblsxXSA9PSBcImZ1bmN0aW9uXCIgPyAoblsxXT8uX19vcmlnaW5hbF9fPy50b1N0cmluZz8uKCkgfHwgblsxXT8udG9TdHJpbmc/LigpIHx8IFwiXCIpIDogKCgpID0+IHsgdHJ5IHsgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG5bMV0pIH0gY2F0Y2ggKGVycikgeyByZXR1cm4gblsxXS50b1N0cmluZygpIH0gfSkoKTtcclxuICAgIGxldCByZW5kZXJGdW5jU3RyaW5nID0gblsxXT8ucmVuZGVyPy5fX29yaWdpbmFsX18/LnRvU3RyaW5nPy4oKSB8fCBuWzFdPy5yZW5kZXI/LnRvU3RyaW5nPy4oKSB8fCBcIlwiO1xyXG4gICAgcmV0dXJuIHN0cmluZ3MuZXZlcnkoc3RyaW5nID0+IGZ1bmNTdHJpbmcuaW5kZXhPZihzdHJpbmcpICE9IC0xIHx8IHJlbmRlckZ1bmNTdHJpbmcuaW5kZXhPZihzdHJpbmcpICE9IC0xKTtcclxuICB9KSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBmaW5kZXJUb0ZpbHRlcihmaW5kZXIpIHtcclxuICBsZXQgZm91bmQgPSAoKSA9PiBmYWxzZTtcclxuICBpZiAodHlwZW9mIGZpbmRlcj8uZmlsdGVyID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICBmb3VuZCA9IHdyYXBGaWx0ZXIoZXZhbChgKCgkKT0+eyB0cnkgeyByZXR1cm4gKCR7ZmluZGVyLmZpbHRlcn0pOyB9IGNhdGNoIHsgcmV0dXJuIGZhbHNlOyB9IH0pYCkpO1xyXG4gIH0gZWxzZSBpZiAodHlwZW9mIGZpbmRlcj8uZmlsdGVyID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgIGZvdW5kID0gd3JhcEZpbHRlcihmaW5kZXIuZmlsdGVyKTtcclxuICB9IGVsc2Uge1xyXG4gICAgc3dpdGNoIChmaW5kZXIuZmlsdGVyLmluKSB7XHJcbiAgICAgIGNhc2UgXCJwcm9wZXJ0aWVzXCI6IHtcclxuICAgICAgICBpZiAoZmluZGVyLmZpbHRlci5ieT8uWzFdPy5sZW5ndGgpIHtcclxuICAgICAgICAgIGZvdW5kID0gd3JhcEZpbHRlcigobSkgPT4gY2hlY2tNb2R1bGVQcm9wcyhtLCBmaW5kZXIuZmlsdGVyLmJ5Py5bMF0gfHwgW10pICYmIGNoZWNrTW9kdWxlUHJvcHMobSwgZmluZGVyLmZpbHRlci5ieT8uWzFdIHx8IFtdLCB0cnVlKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGZvdW5kID0gd3JhcEZpbHRlcigobSkgPT4gY2hlY2tNb2R1bGVQcm9wcyhtLCBmaW5kZXIuZmlsdGVyLmJ5Py5bMF0gfHwgW10pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSBcInByb3RvdHlwZXNcIjoge1xyXG4gICAgICAgIGlmIChmaW5kZXIuZmlsdGVyLmJ5Py5bMV0/Lmxlbmd0aCkge1xyXG4gICAgICAgICAgZm91bmQgPSB3cmFwRmlsdGVyKChtKSA9PiBjaGVja01vZHVsZVByb3RvdHlwZXMobSwgZmluZGVyLmZpbHRlci5ieT8uWzBdIHx8IFtdKSAmJiBjaGVja01vZHVsZVByb3RvdHlwZXMobSwgZmluZGVyLmZpbHRlci5ieT8uWzFdIHx8IFtdLCB0cnVlKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGZvdW5kID0gd3JhcEZpbHRlcigobSkgPT4gY2hlY2tNb2R1bGVQcm90b3R5cGVzKG0sIGZpbmRlci5maWx0ZXIuYnk/LlswXSB8fCBbXSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlIFwic3RyaW5nc1wiOiB7XHJcbiAgICAgICAgaWYgKGZpbmRlci5maWx0ZXIuYnk/LlsxXT8ubGVuZ3RoKSB7XHJcbiAgICAgICAgICBmb3VuZCA9IHdyYXBGaWx0ZXIoKG0pID0+IGNoZWNrTW9kdWxlU3RyaW5ncyhtLCBmaW5kZXIuZmlsdGVyLmJ5Py5bMF0gfHwgW10pICYmIGNoZWNrTW9kdWxlU3RyaW5ncyhtLCBmaW5kZXIuZmlsdGVyLmJ5Py5bMV0gfHwgW10sIHRydWUpKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZm91bmQgPSB3cmFwRmlsdGVyKChtKSA9PiBjaGVja01vZHVsZVN0cmluZ3MobSwgZmluZGVyLmZpbHRlci5ieT8uWzBdIHx8IFtdKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBmb3VuZDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRlck1hcChfX29yaWdpbmFsX18sIG1hcCkge1xyXG4gIGxldCBfX21hcHBlZF9fID0ge307XHJcblxyXG4gIGxldCB0ZW1wID0ge1xyXG4gICAgX19vcmlnaW5hbF9fLFxyXG4gICAgX19tYXBwZWRfXyxcclxuICAgIC4uLl9fb3JpZ2luYWxfX1xyXG4gIH07XHJcblxyXG4gIE9iamVjdC5lbnRyaWVzKG1hcCkuZm9yRWFjaCgoW2tleSwgc3RyaW5nc10pID0+IHtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0ZW1wLCBrZXksIHtcclxuICAgICAgZ2V0KCkge1xyXG4gICAgICAgIGlmIChfX21hcHBlZF9fW2tleV0pIHJldHVybiBfX29yaWdpbmFsX19bX19tYXBwZWRfX1trZXldXTtcclxuXHJcbiAgICAgICAgbGV0IGZvdW5kRnVuYyA9IGZpbmRlckZpbmRGdW5jdGlvbihPYmplY3QuZW50cmllcyhfX29yaWdpbmFsX18gfHwge30pLCBtYXBba2V5XSB8fCBbXSk7XHJcbiAgICAgICAgaWYgKCFmb3VuZEZ1bmM/Lmxlbmd0aCkgcmV0dXJuO1xyXG5cclxuICAgICAgICBfX21hcHBlZF9fW2tleV0gPSBmb3VuZEZ1bmNbMF07XHJcbiAgICAgICAgcmV0dXJuIGZvdW5kRnVuY1sxXTtcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIHRlbXA7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBmaW5kQnlGaW5kZXIocmVxLCBmaW5kZXIgPSB7fSkge1xyXG4gIGNvbnN0IGRlZmF1bHRFeHBvcnQgPSAhIWZpbmRlcj8uZmlsdGVyPy5leHBvcnQ7XHJcbiAgbGV0IGZvdW5kID0gZmluZChyZXEsIGZpbmRlclRvRmlsdGVyKGZpbmRlciksIHsgZGVmYXVsdEV4cG9ydCwgYWxsOiB0cnVlIH0pLmZpbmQoaSA9PiBpICE9PSBnbG9iYWxUaGlzLndpbmRvdyB8fCBpPy5leHBvcnRzICE9PSBnbG9iYWxUaGlzLndpbmRvdyk7XHJcblxyXG4gIGlmICghZm91bmQpIHJldHVybiBudWxsO1xyXG5cclxuICBpZiAoZmluZGVyLnBhdGg/LmJlZm9yZSkgZm91bmQgPSAoQXJyYXkuaXNBcnJheShmaW5kZXIucGF0aC5iZWZvcmUpID8gZmluZGVyLnBhdGguYmVmb3JlLm1hcChpID0+IF8uZ2V0KGZvdW5kLCBpKSkuZmluZChpID0+IGkpIDogXy5nZXQoZm91bmQsIGZpbmRlci5wYXRoLmJlZm9yZSkpIHx8IGZvdW5kO1xyXG4gIGlmIChmaW5kZXIuYXNzaWduKSBmb3VuZCA9IE9iamVjdC5hc3NpZ24oe30sIGZvdW5kKTtcclxuXHJcbiAgaWYgKCFmb3VuZCkgcmV0dXJuIG51bGw7XHJcblxyXG4gIGlmIChmaW5kZXIubWFwKSBmb3VuZCA9IGZpbmRlck1hcChmb3VuZCwgZmluZGVyLm1hcCk7XHJcblxyXG4gIGlmIChmaW5kZXIucGF0aD8uYWZ0ZXIpIGZvdW5kID0gKEFycmF5LmlzQXJyYXkoZmluZGVyLnBhdGguYWZ0ZXIpID8gZmluZGVyLnBhdGguYWZ0ZXIubWFwKGkgPT4gXy5nZXQoZm91bmQsIGkpKS5maW5kKGkgPT4gaSkgOiBfLmdldChmb3VuZCwgZmluZGVyLnBhdGguYWZ0ZXIpKSB8fCBmb3VuZDtcclxuXHJcbiAgcmV0dXJuIGZvdW5kO1xyXG59XHJcblxyXG5cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsYXp5RmluZEJ5RmluZGVyKGZpbmRlciA9IHt9KSB7XHJcbiAgbGV0IGZvdW5kID0gYXdhaXQgbGF6eUZpbmQoZmluZGVyVG9GaWx0ZXIoZmluZGVyKSwgeyBzZWFyY2hFeHBvcnRzOiBmYWxzZSB9KTtcclxuXHJcbiAgaWYgKCFmb3VuZCkgcmV0dXJuIG51bGw7XHJcblxyXG4gIGlmIChmaW5kZXIucGF0aD8uYmVmb3JlKSBmb3VuZCA9IChBcnJheS5pc0FycmF5KGZpbmRlci5wYXRoLmJlZm9yZSkgPyBmaW5kZXIucGF0aC5iZWZvcmUubWFwKGkgPT4gXy5nZXQoZm91bmQsIGkpKS5maW5kKGkgPT4gaSkgOiBfLmdldChmb3VuZCwgZmluZGVyLnBhdGguYmVmb3JlKSkgfHwgZm91bmQ7XHJcbiAgaWYgKGZpbmRlci5hc3NpZ24pIGZvdW5kID0gT2JqZWN0LmFzc2lnbih7fSwgZm91bmQpO1xyXG5cclxuICBpZiAoIWZvdW5kKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgaWYgKGZpbmRlci5tYXApIGZvdW5kID0gZmluZGVyTWFwKGZvdW5kLCBmaW5kZXIubWFwKTtcclxuXHJcbiAgaWYgKGZpbmRlci5wYXRoPy5hZnRlcikgZm91bmQgPSAoQXJyYXkuaXNBcnJheShmaW5kZXIucGF0aC5hZnRlcikgPyBmaW5kZXIucGF0aC5hZnRlci5tYXAoaSA9PiBfLmdldChmb3VuZCwgaSkpLmZpbmQoaSA9PiBpKSA6IF8uZ2V0KGZvdW5kLCBmaW5kZXIucGF0aC5hZnRlcikpIHx8IGZvdW5kO1xyXG5cclxuICByZXR1cm4gZm91bmQ7XHJcbn0iLCAiaW1wb3J0ICogYXMgY29tcGxleEZpbmRlciBmcm9tIFwiLi9yYXcvY29tcGxleC1maW5kZXIuanNcIjtcclxuXHJcbmNvbnN0IGRlZmF1bHRCZWZvcmUgPSBbXHJcbiAgXCJleHBvcnRzLlpcIixcclxuICBcImV4cG9ydHMuWlBcIixcclxuICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gIFwiZXhwb3J0c1wiXHJcbl07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgX19jYWNoZV9fOiB7fSxcclxuICBnZXQgcmVxdWlyZSgpIHtcclxuICAgIGlmICh0aGlzLl9fY2FjaGVfXy5yZXF1aXJlKSByZXR1cm4gdGhpcy5fX2NhY2hlX18ucmVxdWlyZTtcclxuICAgIGxldCByZXFJZCA9IGBBY29yZFdlYnBhY2tNb2R1bGVzJHtEYXRlLm5vdygpfWA7XHJcbiAgICBjb25zdCByZXEgPSB3aW5kb3cud2VicGFja0NodW5rZGlzY29yZF9hcHAucHVzaChbW3JlcUlkXSwge30sIHJlcSA9PiByZXFdKTtcclxuICAgIGRlbGV0ZSByZXEubVtyZXFJZF07XHJcbiAgICBkZWxldGUgcmVxLmNbcmVxSWRdO1xyXG4gICAgd2luZG93LndlYnBhY2tDaHVua2Rpc2NvcmRfYXBwLnBvcCgpO1xyXG4gICAgdGhpcy5fX2NhY2hlX18ucmVxdWlyZSA9IHJlcTtcclxuICAgIHJldHVybiByZXE7XHJcbiAgfSxcclxuICBmaW5kKGZpbHRlciwgY29uZmlnID0ge30pIHtcclxuICAgIHJldHVybiBjb21wbGV4RmluZGVyLmZpbmQodGhpcy5yZXF1aXJlLCBjb21wbGV4RmluZGVyLndyYXBGaWx0ZXIoZmlsdGVyKSwgY29uZmlnKTtcclxuICB9LFxyXG4gIGxhenlGaW5kKGZpbHRlciwgY29uZmlnID0ge30pIHtcclxuICAgIHJldHVybiBjb21wbGV4RmluZGVyLmxhenlGaW5kKGNvbXBsZXhGaW5kZXIud3JhcEZpbHRlcihmaWx0ZXIpLCBjb25maWcpO1xyXG4gIH0sXHJcbiAgbGF6eUZpbmRCeUZpbmRlcihmaW5kZXIpIHtcclxuICAgIHJldHVybiBjb21wbGV4RmluZGVyLmxhenlGaW5kQnlGaW5kZXIoZmluZGVyKTtcclxuICB9LFxyXG4gIGZpbHRlcihmaWx0ZXIsIGNvbmZpZyA9IHt9KSB7XHJcbiAgICByZXR1cm4gY29tcGxleEZpbmRlci5maW5kKHRoaXMucmVxdWlyZSwgY29tcGxleEZpbmRlci53cmFwRmlsdGVyKGZpbHRlciksIHsgLi4uY29uZmlnLCBhbGw6IHRydWUgfSk7XHJcbiAgfSxcclxuICBmaW5kQnlGaW5kZXIoZmluZGVyKSB7XHJcbiAgICByZXR1cm4gY29tcGxleEZpbmRlci5maW5kQnlGaW5kZXIodGhpcy5yZXF1aXJlLCBmaW5kZXIpO1xyXG4gIH0sXHJcbiAgZmluZEJ5U3RyaW5nVmFsdWVzKC4uLnN0cmluZ1ZhbHVlcykge1xyXG4gICAgcmV0dXJuIHRoaXMuZmluZCgoYSkgPT4geyBsZXQgdmEgPSBPYmplY3QudmFsdWVzKGEpOyByZXR1cm4gc3RyaW5nVmFsdWVzLmV2ZXJ5KHggPT4gdmEuc29tZSh5ID0+IHR5cGVvZiB5ID09IFwic3RyaW5nXCIgJiYgeS5pbmNsdWRlcyh4KSkpIH0pPy5leHBvcnRzO1xyXG4gIH0sXHJcbiAgZmluZEJ5UHJvcGVydGllcyguLi5wcm9wcykge1xyXG4gICAgcmV0dXJuIHRoaXMuZmluZEJ5RmluZGVyKHtcclxuICAgICAgZmlsdGVyOiB7XHJcbiAgICAgICAgZXhwb3J0OiBmYWxzZSxcclxuICAgICAgICBpbjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgYnk6IFtwcm9wc11cclxuICAgICAgfSxcclxuICAgICAgcGF0aDoge1xyXG4gICAgICAgIGJlZm9yZTogZGVmYXVsdEJlZm9yZVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9LFxyXG4gIGZpbmRCeVByb3RvdHlwZXMoLi4ucHJvcHMpIHtcclxuICAgIHJldHVybiB0aGlzLmZpbmRCeUZpbmRlcih7XHJcbiAgICAgIGZpbHRlcjoge1xyXG4gICAgICAgIGV4cG9ydDogZmFsc2UsXHJcbiAgICAgICAgaW46IFwicHJvdG90eXBlc1wiLFxyXG4gICAgICAgIGJ5OiBbcHJvcHNdXHJcbiAgICAgIH0sXHJcbiAgICAgIHBhdGg6IHtcclxuICAgICAgICBiZWZvcmU6IGRlZmF1bHRCZWZvcmVcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSxcclxuICBmaW5kQnlTdHJpbmdzKC4uLnByb3BzKSB7XHJcbiAgICByZXR1cm4gdGhpcy5maW5kQnlGaW5kZXIoe1xyXG4gICAgICBmaWx0ZXI6IHtcclxuICAgICAgICBleHBvcnQ6IGZhbHNlLFxyXG4gICAgICAgIGluOiBcInN0cmluZ3NcIixcclxuICAgICAgICBieTogW3Byb3BzXVxyXG4gICAgICB9LFxyXG4gICAgICBwYXRoOiB7XHJcbiAgICAgICAgYmVmb3JlOiBkZWZhdWx0QmVmb3JlXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0sXHJcbn07IiwgImltcG9ydCBjb21tb25EYXRhIGZyb20gJy4uLy4uL2RhdGEvY29tbW9uLmpzb24nO1xyXG5pbXBvcnQgd2VicGFjayBmcm9tICcuL3dlYnBhY2suanMnO1xyXG5cclxuXHJcbmZ1bmN0aW9uIG1hcE9iamVjdCh0ZW1wLCBpbnApIHtcclxuICBpZiAoIXRlbXA/Ll9fY2FjaGVfXykgdGVtcC5fX2NhY2hlX18gPSB7fTtcclxuICBmb3IgKGNvbnN0IGtleSBpbiBpbnApIHtcclxuICAgIGlmIChpbnA/LltrZXldPy5fXyA9PT0gdHJ1ZSkge1xyXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGVtcCwga2V5LCB7XHJcbiAgICAgICAgZ2V0KCkge1xyXG4gICAgICAgICAgaWYgKHRlbXAuX19jYWNoZV9fW2tleV0pIHJldHVybiB0ZW1wLl9fY2FjaGVfX1trZXldO1xyXG4gICAgICAgICAgcmV0dXJuIHRlbXAuX19jYWNoZV9fW2tleV0gPSB3ZWJwYWNrLmZpbmRCeUZpbmRlcihpbnBba2V5XSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKHR5cGVvZiB0ZW1wW2tleV0gPT09IFwidW5kZWZpbmVkXCIpIHRlbXBba2V5XSA9IHt9O1xyXG4gICAgICBtYXBPYmplY3QodGVtcFtrZXldLCBpbnBba2V5XSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5cclxubGV0IGNvbW1vbiA9IHtcclxuICBfX2NhY2hlX186IHt9LFxyXG4gIExheWVyQWN0aW9uczoge1xyXG4gICAgcHVzaChjb21wb25lbnQpIHtcclxuICAgICAgY29tbW9uLkZsdXhEaXNwYXRjaGVyLmRpc3BhdGNoKHtcclxuICAgICAgICB0eXBlOiBcIkxBWUVSX1BVU0hcIixcclxuICAgICAgICBjb21wb25lbnRcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgcG9wKCkge1xyXG4gICAgICBjb21tb24uRmx1eERpc3BhdGNoZXIuZGlzcGF0Y2goe1xyXG4gICAgICAgIHR5cGU6IFwiTEFZRVJfUE9QXCJcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgcG9wQWxsKCkge1xyXG4gICAgICBjb21tb24uRmx1eERpc3BhdGNoZXIuZGlzcGF0Y2goe1xyXG4gICAgICAgIHR5cGU6IFwiTEFZRVJfUE9QX0FMTFwiXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0sXHJcbn07XHJcbm1hcE9iamVjdChjb21tb24sIGNvbW1vbkRhdGEuY29tbW9uKTtcclxue1xyXG4gIGxldCBwYXRocyA9IFtcclxuICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICBcImV4cG9ydHMuWlBcIixcclxuICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICBcImV4cG9ydHNcIlxyXG4gIF07XHJcbiAgd2VicGFjay5maWx0ZXIoKGkpID0+IGk/LmdldE5hbWU/LigpPy5lbmRzV2l0aD8uKFwiU3RvcmVcIiksIHsgZGVmYXVsdEV4cG9ydDogZmFsc2UgfSkuZm9yRWFjaCgobSkgPT4ge1xyXG4gICAgbGV0IG9iaiA9IHBhdGhzLm1hcChwYXRoID0+IF8uZ2V0KG0sIHBhdGgpKS5maW5kKGkgPT4gaSk7XHJcbiAgICBpZiAoIW9iaikgcmV0dXJuO1xyXG4gICAgbGV0IG5hbWUgPSBvYmo/LmdldE5hbWU/LigpO1xyXG4gICAgaWYgKCFuYW1lKSByZXR1cm47XHJcbiAgICBpZiAoY29tbW9uW25hbWVdKSByZXR1cm47XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvbW1vbiwgbmFtZSwge1xyXG4gICAgICBnZXQoKSB7XHJcbiAgICAgICAgaWYgKGNvbW1vbi5fX2NhY2hlX19bbmFtZV0pIHJldHVybiBjb21tb24uX19jYWNoZV9fW25hbWVdO1xyXG4gICAgICAgIHJldHVybiBjb21tb24uX19jYWNoZV9fW25hbWVdID0gb2JqO1xyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbW1vbjsiLCAiaW1wb3J0IGNvbW1vbiBmcm9tIFwiLi9jb21tb24uanNcIjtcclxuaW1wb3J0IHdlYnBhY2sgZnJvbSBcIi4vd2VicGFjay5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGNvbW1vbixcclxuICB3ZWJwYWNrLFxyXG4gIHJlcXVpcmU6IGdsb2JhbFRoaXNbXCI8UFJFTE9BRF9LRVk+XCJdLnJlcXVpcmUsXHJcbiAgbmF0aXZlOiBEaXNjb3JkTmF0aXZlLFxyXG59IiwgImltcG9ydCBtb2R1bGVzIGZyb20gXCIuLi9tb2R1bGVzL2luZGV4LmpzXCJcclxuaW1wb3J0IHV0aWxzIGZyb20gXCIuLi91dGlscy9pbmRleC5qc1wiO1xyXG5cclxuY29uc3QgQkFTRV9VUkwgPSBcImh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9hY29yZC1zdGFuZGFsb25lL2Fzc2V0cy9tYWluL2kxOG5cIjtcclxuY29uc3Qgbm9TdG9yZSA9IHsgY2FjaGU6IFwibm8tc3RvcmVcIiB9O1xyXG5cclxuXHJcbmNvbnN0IG91dCA9IHtcclxuICBfX2NhY2hlX186IHtcclxuICAgIGxvY2FsZUlkczogW10sXHJcbiAgICBsb2NhbGl6YXRpb25zOiB7fVxyXG4gIH0sXHJcbiAgZ2V0IGxvY2FsZSgpIHtcclxuICAgIHJldHVybiBtb2R1bGVzLmNvbW1vbi5pMThuLl9yZXF1ZXN0ZWRMb2NhbGU7XHJcbiAgfSxcclxuICBnZXQoa2V5KSB7XHJcbiAgICBjaGVjaygpO1xyXG4gICAgcmV0dXJuIG91dC5fX2NhY2hlX18ubG9jYWxpemF0aW9uc1tvdXQubG9jYWxlXT8uW2tleV1cclxuICAgICAgfHwgb3V0Ll9fY2FjaGVfXy5sb2NhbGl6YXRpb25zLmRlZmF1bHQ/LltrZXldXHJcbiAgICAgIHx8IG1vZHVsZXMuY29tbW9uLmkxOG4uTWVzc2FnZXNba2V5XVxyXG4gICAgICB8fCBrZXk7XHJcbiAgfSxcclxuICBtZXNzYWdlczogbmV3IFByb3h5KHt9LCB7XHJcbiAgICBnZXQoXywgcHJvcCkge1xyXG4gICAgICByZXR1cm4gb3V0LmdldChwcm9wKTtcclxuICAgIH1cclxuICB9KSxcclxuICBsb2NhbGl6ZShzdHIsIC4uLmFyZ3MpIHtcclxuICAgIGlmICh0eXBlb2Ygc3RyID09PSBcInN0cmluZ1wiKSByZXR1cm4gdXRpbHMuZm9ybWF0KHN0ciwgLi4uYXJncyk7XHJcbiAgICBsZXQgdmFsID0gc3RyPy5bb3V0LmxvY2FsZV1cclxuICAgICAgfHwgc3RyPy5kZWZhdWx0XHJcbiAgICAgIHx8IE9iamVjdC52YWx1ZXMoc3RyKVswXTtcclxuICAgIGlmICghdmFsKSByZXR1cm4gbnVsbDtcclxuICAgIHJldHVybiB1dGlscy5mb3JtYXQodmFsLCAuLi5hcmdzKTtcclxuICB9LFxyXG4gIGZvcm1hdChrZXksIC4uLmFyZ3MpIHtcclxuICAgIHJldHVybiB1dGlscy5mb3JtYXQob3V0LmdldChrZXkpLCAuLi5hcmdzKTtcclxuICB9XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGNoZWNrKCkge1xyXG4gIGNvbnN0IGxvY2FsZSA9IG91dC5sb2NhbGU7XHJcbiAgaWYgKCFvdXQuX19jYWNoZV9fLmxvY2FsZUlkcy5sZW5ndGgpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIG91dC5fX2NhY2hlX18ubG9jYWxlSWRzID0gYXdhaXQgKGF3YWl0IGZldGNoKGAke0JBU0VfVVJMfS9sb2NhbGVzLmpzb25gLCBub1N0b3JlKSkuanNvbigpO1xyXG4gICAgfSBjYXRjaCB7IH1cclxuICAgIHRyeSB7XHJcbiAgICAgIG91dC5fX2NhY2hlX18ubG9jYWxpemF0aW9ucy5kZWZhdWx0ID0gYXdhaXQgKGF3YWl0IGZldGNoKGAke0JBU0VfVVJMfS9kZWZhdWx0Lmpzb25gLCBub1N0b3JlKSkuanNvbigpO1xyXG4gICAgfSBjYXRjaCB7IH1cclxuICB9XHJcbiAgaWYgKFxyXG4gICAgb3V0Ll9fY2FjaGVfXy5sb2NhbGVJZHMuaW5jbHVkZXMobG9jYWxlKVxyXG4gICAgJiYgIW91dC5fX2NhY2hlX18ubG9jYWxpemF0aW9ucz8uW2xvY2FsZV1cclxuICApIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIG91dC5fX2NhY2hlX18ubG9jYWxpemF0aW9uc1tsb2NhbGVdID0gYXdhaXQgKGF3YWl0IGZldGNoKGAke0JBU0VfVVJMfS8ke2xvY2FsZX0uanNvbmAsIG5vU3RvcmUpKS5qc29uKCk7XHJcbiAgICB9IGNhdGNoIHsgfTtcclxuICB9XHJcbn1cclxuXHJcbmNoZWNrKCk7XHJcbmV4cG9ydCBkZWZhdWx0IG91dDsiLCAiaW1wb3J0IG1vZHVsZXMgZnJvbSBcIi4uL2FwaS9tb2R1bGVzL2luZGV4LmpzXCI7XHJcbmltcG9ydCBpMThuIGZyb20gXCIuLi9hcGkvaTE4bi9pbmRleC5qc1wiO1xyXG5cclxubGV0IGlzQ29ubmVjdGlvbk9wZW4gPSBmYWxzZTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB3YWl0VW50aWxDb25uZWN0aW9uT3BlbigpIHtcclxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuICAgIGlmIChpc0Nvbm5lY3Rpb25PcGVuKSByZXR1cm4gcmVzb2x2ZSh0cnVlKTtcclxuICAgIGZ1bmN0aW9uIG9uRXZlbnQoKSB7XHJcbiAgICAgIG1vZHVsZXMuY29tbW9uLkZsdXhEaXNwYXRjaGVyLnVuc3Vic2NyaWJlKFwiQ09OTkVDVElPTl9PUEVOXCIsIG9uRXZlbnQpO1xyXG4gICAgICBpc0Nvbm5lY3Rpb25PcGVuID0gdHJ1ZTtcclxuICAgICAgcmVzb2x2ZSh0cnVlKTtcclxuICAgIH1cclxuICAgIG1vZHVsZXMuY29tbW9uLkZsdXhEaXNwYXRjaGVyLnN1YnNjcmliZShcIkNPTk5FQ1RJT05fT1BFTlwiLCBvbkV2ZW50KTtcclxuICB9KTtcclxufVxyXG4iLCAiZXhwb3J0IGNsYXNzIEJhc2ljRXZlbnRFbWl0dGVyIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIC8qKiBAdHlwZSB7TWFwPHN0cmluZywgTWFwPCguLi5hcmdzOiBhbnlbXSk9PnZvaWQsIHtvbmNlOiBib29sZWFufT4+fSAqL1xyXG4gICAgdGhpcy5saXN0ZW5lcnMgPSBuZXcgTWFwKCk7XHJcbiAgfVxyXG5cclxuICBfcHJlcGFyZUxpc3RlbmVyc01hcChldmVudE5hbWUpIHtcclxuICAgIGlmICghdGhpcy5saXN0ZW5lcnMuaGFzKGV2ZW50TmFtZSkpXHJcbiAgICAgIHRoaXMubGlzdGVuZXJzLnNldChldmVudE5hbWUsIG5ldyBNYXAoKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnROYW1lXHJcbiAgICogQHBhcmFtIHsoLi4uYXJnczogYW55W10pPT52b2lkfSBsaXN0ZW5lclxyXG4gICAqL1xyXG4gIG9uKGV2ZW50TmFtZSwgbGlzdGVuZXIpIHtcclxuICAgIHRoaXMuX3ByZXBhcmVMaXN0ZW5lcnNNYXAoZXZlbnROYW1lKTtcclxuICAgIHRoaXMubGlzdGVuZXJzLmdldChldmVudE5hbWUpLnNldChsaXN0ZW5lciwgeyBvbmNlOiBmYWxzZSB9KTtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIHRoaXMubGlzdGVuZXJzLmdldChldmVudE5hbWUpLmRlbGV0ZShsaXN0ZW5lcik7XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50TmFtZVxyXG4gICAqIEBwYXJhbSB7KC4uLmFyZ3M6IGFueVtdKT0+dm9pZH0gbGlzdGVuZXJcclxuICAgKi9cclxuICBvbmNlKGV2ZW50TmFtZSwgbGlzdGVuZXIpIHtcclxuICAgIHRoaXMuX3ByZXBhcmVMaXN0ZW5lcnNNYXAoZXZlbnROYW1lKTtcclxuICAgIHRoaXMubGlzdGVuZXJzLmdldChldmVudE5hbWUpPy5zZXQobGlzdGVuZXIsIHsgb25jZTogdHJ1ZSB9KTtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIHRoaXMubGlzdGVuZXJzLmdldChldmVudE5hbWUpLmRlbGV0ZShsaXN0ZW5lcik7XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtzdHJpbmc/fSBldmVudE5hbWVcclxuICAgKiBAcGFyYW0geygoLi4uYXJnczogYW55W10pPT52b2lkKT99IGxpc3RlbmVyXHJcbiAgICovXHJcbiAgb2ZmKGV2ZW50TmFtZSwgbGlzdGVuZXIpIHtcclxuICAgIGlmICghZXZlbnROYW1lKSByZXR1cm4gKHRoaXMubGlzdGVuZXJzID0gbmV3IE1hcCgpKTtcclxuICAgIGlmICghbGlzdGVuZXIpIHJldHVybiB0aGlzLmxpc3RlbmVycz8uZGVsZXRlKGV2ZW50TmFtZSk7XHJcbiAgICB0aGlzLmxpc3RlbmVycy5nZXQoZXZlbnROYW1lKT8uZGVsZXRlKGxpc3RlbmVyKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudE5hbWVcclxuICAgKiBAcGFyYW0gIHsuLi5hbnl9IGFyZ3NcclxuICAgKi9cclxuICBlbWl0KGV2ZW50TmFtZSwgLi4uYXJncykge1xyXG4gICAgaWYgKCF0aGlzLmxpc3RlbmVycy5oYXMoZXZlbnROYW1lKSkgcmV0dXJuO1xyXG4gICAgbGV0IGV2ZW50TWFwID0gdGhpcy5saXN0ZW5lcnMuZ2V0KGV2ZW50TmFtZSk7XHJcbiAgICBldmVudE1hcC5mb3JFYWNoKCh7IG9uY2UgfSwgbGlzdGVuZXIpID0+IHtcclxuICAgICAgaWYgKG9uY2UpIGV2ZW50TWFwPy5kZWxldGUobGlzdGVuZXIpO1xyXG4gICAgICBsaXN0ZW5lciguLi5hcmdzKTtcclxuICAgIH0pO1xyXG4gIH1cclxufTtcclxuIiwgImltcG9ydCB7IEJhc2ljRXZlbnRFbWl0dGVyIH0gZnJvbSBcIi4uLy4uL2xpYi9CYXNpY0V2ZW50RW1pdHRlci5qc1wiO1xyXG5cclxuY29uc3QgZXZlbnRzID0gbmV3IEJhc2ljRXZlbnRFbWl0dGVyKCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBldmVudHM7IiwgImltcG9ydCBldmVudHMgZnJvbSBcIi4uL2V2ZW50c1wiO1xyXG5pbXBvcnQgd2VicGFjayBmcm9tIFwiLi4vbW9kdWxlcy93ZWJwYWNrLmpzXCI7XHJcblxyXG5jb25zdCBzY3JvbGxiYXJDbGFzc2VzID0gd2VicGFjay5maW5kQnlQcm9wZXJ0aWVzKFwic2Nyb2xsYmFyR2hvc3RIYWlybGluZVwiLCBcInNwaW5uZXJcIik7XHJcblxyXG5jb25zdCBmb3JtYXRSZWdleGVzID0ge1xyXG4gIGJvbGQ6IC9cXCpcXCooW14qXSspXFwqXFwqL2csXHJcbiAgaXRhbGljOiAvXFwqKFteKl0rKVxcKi9nLFxyXG4gIHVuZGVybGluZTogL1xcXyhbXipdKylcXF8vZyxcclxuICBzdHJpa2U6IC9cXH5cXH4oW14qXSspXFx+XFx+L2csXHJcbiAgdXJsOiAvKFxcYihodHRwcz98ZnRwfGZpbGUpOlxcL1xcL1stQS1aMC05KyZAI1xcLyU/PX5ffCE6LC47XSpbLUEtWjAtOSsmQCNcXC8lPX5ffF0pL2lnLFxyXG4gIGlubGluZTogL1xcYChbXipdKylcXGAvZyxcclxuICBjb2RlYmxvY2tTaW5nbGU6IC9cXGBcXGBcXGAoW14qXSspXFxgXFxgXFxgL2csXHJcbiAgY29kZWJsb2NrTXVsdGk6IC9cXGBcXGBcXGAoXFx3KylcXG4oKD86KD8hXFxgXFxgXFxgKVtcXHNcXFNdKSopXFxgXFxgXFxgL2dcclxufVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBwYXJzZShodG1sKSB7XHJcbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGRpdi5pbm5lckhUTUwgPSBodG1sO1xyXG4gICAgcmV0dXJuIGRpdi5maXJzdEVsZW1lbnRDaGlsZDtcclxuICB9LFxyXG4gIHRvQ1NTUHJvcChvKSB7XHJcbiAgICBsZXQgZWxtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIE9iamVjdC5lbnRyaWVzKG8pLmZvckVhY2goKGkpID0+IHtcclxuICAgICAgaWYgKGVsbS5zdHlsZS5oYXNPd25Qcm9wZXJ0eShpWzBdKSkge1xyXG4gICAgICAgIGVsbS5zdHlsZVtpWzBdXSA9IGlbMV07XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZWxtLnN0eWxlLnNldFByb3BlcnR5KGlbMF0sIGlbMV0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBlbG0uZ2V0QXR0cmlidXRlKFwic3R5bGVcIik7XHJcbiAgfSxcclxuICB0b0hUTUxQcm9wcyhvKSB7XHJcbiAgICByZXR1cm4gT2JqZWN0LmVudHJpZXMobylcclxuICAgICAgLm1hcChcclxuICAgICAgICAoaSkgPT5cclxuICAgICAgICAgIGAke2lbMF0ucmVwbGFjZSgvICsvLCBcIi1cIil9PVwiJHtpWzBdID09IFwic3R5bGVcIiAmJiB0eXBlb2YgaVsxXSAhPSBcInN0cmluZ1wiXHJcbiAgICAgICAgICAgID8gdGhpcy50b0NTU1Byb3AoaVsxXSlcclxuICAgICAgICAgICAgOiB0aGlzLmVzY2FwZUhUTUwoaVsxXSl9XCJgXHJcbiAgICAgIClcclxuICAgICAgLmpvaW4oXCIgXCIpO1xyXG4gIH0sXHJcbiAgZXNjYXBlKGh0bWwpIHtcclxuICAgIHJldHVybiBuZXcgT3B0aW9uKGh0bWwpLmlubmVySFRNTDtcclxuICB9LFxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gZWxtIFxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gc2VsZWN0b3JPck51bWJlciBcclxuICAgKiBAcmV0dXJucyB7RWxlbWVudFtdfVxyXG4gICAqL1xyXG4gIHBhcmVudHMoZWxtLCBzZWxlY3Rvck9yTnVtYmVyKSB7XHJcbiAgICBsZXQgcGFyZW50cyA9IFtdO1xyXG4gICAgaWYgKHR5cGVvZiBzZWxlY3Rvck9yTnVtYmVyID09PSBcIm51bWJlclwiKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VsZWN0b3JPck51bWJlcjsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGVsbS5wYXJlbnRFbGVtZW50KSB7XHJcbiAgICAgICAgICBlbG0gPSBlbG0ucGFyZW50RWxlbWVudDtcclxuICAgICAgICAgIHBhcmVudHMucHVzaChlbG0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgd2hpbGUgKGVsbS5wYXJlbnRFbGVtZW50ICYmIGVsbS5wYXJlbnRFbGVtZW50LmNsb3Nlc3Qoc2VsZWN0b3JPck51bWJlcikpIHtcclxuICAgICAgICBlbG0gPSBlbG0ucGFyZW50RWxlbWVudC5jbG9zZXN0KHNlbGVjdG9yT3JOdW1iZXIpO1xyXG4gICAgICAgIHBhcmVudHMucHVzaChlbG0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcGFyZW50cztcclxuICB9LFxyXG4gIC8qKlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvciBcclxuICAgKiBAcGFyYW0geyhlbGVtZW50OiBIVE1MRGl2RWxlbWVudCk9PigoKT0+dm9pZCl9IGNiIFxyXG4gICAqIEByZXR1cm5zIHsoKT0+dm9pZH1cclxuICAgKi9cclxuICBwYXRjaDogKHNlbGVjdG9yLCBjYikgPT5cclxuICAgICgoKSA9PiB7XHJcbiAgICAgIGZ1bmN0aW9uIG5vZGVBZGRlZChub2RlKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBub2RlPy5xdWVyeVNlbGVjdG9yQWxsICE9IFwiZnVuY3Rpb25cIikgcmV0dXJuO1xyXG4gICAgICAgIG5vZGUucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikuZm9yRWFjaChhc3luYyAoZWxtKSA9PiB7XHJcbiAgICAgICAgICBpZiAoIWVsbS5hY29yZCkge1xyXG4gICAgICAgICAgICBlbG0uYWNvcmQgPSB7IHVubW91bnQ6IFtdLCBwYXRjaGVkOiBuZXcgU2V0KCkgfTtcclxuICAgICAgICAgICAgZWxtLmNsYXNzTGlzdC5hZGQoXCJhY29yZC0tcGF0Y2hlZFwiKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoZWxtLmFjb3JkLnBhdGNoZWQuaGFzKGNiKSkgcmV0dXJuO1xyXG4gICAgICAgICAgZWxtLmFjb3JkLnBhdGNoZWQuYWRkKGNiKTtcclxuXHJcbiAgICAgICAgICBsZXQgdW5QYXRjaENiID0gYXdhaXQgY2IoZWxtKTtcclxuICAgICAgICAgIGlmICh0eXBlb2YgdW5QYXRjaENiID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgICAgIGVsbS5hY29yZC51bm1vdW50LnB1c2godW5QYXRjaENiKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgZnVuY3Rpb24gbm9kZVJlbW92ZWQobm9kZSkge1xyXG4gICAgICAgIGlmICh0eXBlb2Ygbm9kZT8ucXVlcnlTZWxlY3RvckFsbCAhPSBcImZ1bmN0aW9uXCIpIHJldHVybjtcclxuICAgICAgICBub2RlLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpLmZvckVhY2goYXN5bmMgKGVsbSkgPT4ge1xyXG4gICAgICAgICAgaWYgKCFlbG0uYWNvcmQpIHJldHVybjtcclxuICAgICAgICAgIGVsbS5hY29yZC51bm1vdW50LmZvckVhY2goKGYpID0+IGYoKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpLmZvckVhY2gobm9kZUFkZGVkKTtcclxuXHJcbiAgICAgIHJldHVybiBldmVudHMub24oXHJcbiAgICAgICAgXCJkb20tbXV0YXRpb25cIixcclxuICAgICAgICAvKiogQHBhcmFtIHtNdXRhdGlvblJlY29yZH0gbXV0ICovKG11dCkgPT4ge1xyXG4gICAgICAgICAgaWYgKG11dC50eXBlID09PSBcImNoaWxkTGlzdFwiKSB7XHJcbiAgICAgICAgICAgIG11dC5hZGRlZE5vZGVzLmZvckVhY2gobm9kZUFkZGVkKTtcclxuICAgICAgICAgICAgbXV0LnJlbW92ZWROb2Rlcy5mb3JFYWNoKG5vZGVSZW1vdmVkKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICk7XHJcbiAgICB9KSgpLFxyXG4gIGZvcm1hdENvbnRlbnQobXNnKSB7XHJcbiAgICBpZiAoIW1zZykgcmV0dXJuICcnO1xyXG4gICAgY29uc3QgeyBib2xkLCBpdGFsaWMsIHVuZGVybGluZSwgc3RyaWtlLCBjb2RlYmxvY2tNdWx0aSwgY29kZWJsb2NrU2luZ2xlLCBpbmxpbmUsIHVybCB9ID0gZm9ybWF0UmVnZXhlcztcclxuXHJcbiAgICBjb25zdCBjb2RlQmxvY2tzTWFwID0gT2JqZWN0LmZyb21FbnRyaWVzKFtcclxuICAgICAgLi4uKG1zZy5tYXRjaEFsbChjb2RlYmxvY2tNdWx0aSkgfHwgW10pLCAuLi4obXNnLm1hdGNoQWxsKGNvZGVibG9ja1NpbmdsZSkgfHwgW10pXHJcbiAgICBdLm1hcChcclxuICAgICAgKFtfLCBjb2RlQmxvY2tPckNvZGUsIGNvZGVCbG9ja0NvbnRlbnRdLCBpKSA9PiB7XHJcbiAgICAgICAgbXNnID0gbXNnLnJlcGxhY2UoXywgYHt7Q09ERUJMT0NLXyR7aX19fWApO1xyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICBge3tDT0RFQkxPQ0tfJHtpfX19YCxcclxuICAgICAgICAgIGNvZGVCbG9ja0NvbnRlbnQgP1xyXG4gICAgICAgICAgICBgPHByZT48Y29kZSBjbGFzcz1cIiR7c2Nyb2xsYmFyQ2xhc3Nlcy5zY3JvbGxiYXJHaG9zdEhhaXJsaW5lfSBobGpzICR7Y29kZUJsb2NrT3JDb2RlfVwiIHN0eWxlPVwicG9zaXRpb246IHJlbGF0aXZlO1wiPiR7bW9kdWxlcy5jb21tb24uaGxqcy5oaWdobGlnaHQoY29kZUJsb2NrT3JDb2RlLCBjb2RlQmxvY2tDb250ZW50KS52YWx1ZX08L2NvZGU+PC9wcmU+YCA6XHJcbiAgICAgICAgICAgIGA8cHJlPjxjb2RlIGNsYXNzPVwiJHtzY3JvbGxiYXJDbGFzc2VzLnNjcm9sbGJhckdob3N0SGFpcmxpbmV9IGhsanNcIiBzdHlsZT1cInBvc2l0aW9uOiByZWxhdGl2ZTtcIj4ke2NvZGVCbG9ja09yQ29kZX08L2NvZGU+PC9wcmU+YFxyXG4gICAgICAgIF07XHJcbiAgICAgIH1cclxuICAgICkpO1xyXG5cclxuICAgIGNvbnN0IGlubGluZU1hcCA9IE9iamVjdC5mcm9tRW50cmllcyhcclxuICAgICAgWy4uLihtc2cubWF0Y2hBbGwoaW5saW5lKSB8fCBbXSldLm1hcChcclxuICAgICAgICAoW18sIGlubGluZUNvbnRlbnRdLCBpKSA9PiB7XHJcbiAgICAgICAgICBtc2cgPSBtc2cucmVwbGFjZShfLCBge3tJTkxJTkVfJHtpfX19YCk7XHJcbiAgICAgICAgICByZXR1cm4gW2B7e0lOTElORV8ke2l9fX1gLCBgPGNvZGUgY2xhc3M9XCJpbmxpbmVcIj4ke2lubGluZUNvbnRlbnR9PC9jb2RlPmBdO1xyXG4gICAgICAgIH1cclxuICAgICAgKVxyXG4gICAgKTtcclxuXHJcbiAgICBtc2cgPSBtc2cucmVwbGFjZShib2xkLCBcIjxiPiQxPC9iPlwiKVxyXG4gICAgICAucmVwbGFjZShpdGFsaWMsIFwiPGk+JDE8L2k+XCIpXHJcbiAgICAgIC5yZXBsYWNlKHVuZGVybGluZSwgXCI8VT4kMTwvVT5cIilcclxuICAgICAgLnJlcGxhY2Uoc3RyaWtlLCBcIjxzPiQxPC9zPlwiKVxyXG4gICAgICAucmVwbGFjZSh1cmwsICc8YSBocmVmPVwiJDFcIj4kMTwvYT4nKTtcclxuXHJcbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhjb2RlQmxvY2tzTWFwKSkge1xyXG4gICAgICBtc2cgPSBtc2cucmVwbGFjZShrZXksIHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhpbmxpbmVNYXApKSB7XHJcbiAgICAgIG1zZyA9IG1zZy5yZXBsYWNlKGtleSwgdmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBtc2c7XHJcbiAgfSxcclxuICByZXNvbHZlKGh0bWxPckVsbSkge1xyXG4gICAgaWYgKGh0bWxPckVsbSBpbnN0YW5jZW9mIEVsZW1lbnQpIHJldHVybiBodG1sT3JFbG07XHJcbiAgICByZXR1cm4gdGhpcy5wYXJzZShodG1sT3JFbG0pO1xyXG4gIH1cclxufVxyXG5cclxue1xyXG4gIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKG11dGF0aW9ucykgPT4ge1xyXG4gICAgbXV0YXRpb25zLmZvckVhY2goKG11dGF0aW9uKSA9PiB7XHJcbiAgICAgIGV2ZW50cy5lbWl0KFwiZG9tLW11dGF0aW9uXCIsIG11dGF0aW9uKTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG4gIG9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQsIHtcclxuICAgIGF0dHJpYnV0ZXM6IHRydWUsXHJcbiAgICBjaGlsZExpc3Q6IHRydWUsXHJcbiAgICBzdWJ0cmVlOiB0cnVlXHJcbiAgfSk7XHJcbn0iLCAiLy8gd2UgdXNlIHRoaXMgYXJyYXkgbXVsdGlwbGUgdGltZXNcclxuZXhwb3J0IGNvbnN0IHBhdGNoVHlwZXMgPSBbXCJhXCIsIFwiYlwiLCBcImlcIl07XHJcbmV4cG9ydCBjb25zdCBwYXRjaGVkT2JqZWN0cyA9IG5ldyBNYXAoKTtcclxuIiwgIi8vIGNhbGxzIHJlbGV2YW50IHBhdGNoZXMgYW5kIHJldHVybnMgdGhlIGZpbmFsIHJlc3VsdFxyXG5pbXBvcnQgeyBwYXRjaGVkT2JqZWN0cyB9IGZyb20gXCIuL3NoYXJlZC5qc1wiO1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoZnVuY05hbWUsIGZ1bmNQYXJlbnQsIGZ1bmNBcmdzLCBcclxuLy8gdGhlIHZhbHVlIG9mIGB0aGlzYCB0byBhcHBseVxyXG5jdHh0LCBcclxuLy8gaWYgdHJ1ZSwgdGhlIGZ1bmN0aW9uIGlzIGFjdHVhbGx5IGNvbnN0cnVjdG9yXHJcbmlzQ29uc3RydWN0KSB7XHJcbiAgICBjb25zdCBwYXRjaCA9IHBhdGNoZWRPYmplY3RzLmdldChmdW5jUGFyZW50KT8uW2Z1bmNOYW1lXTtcclxuICAgIC8vIFRoaXMgaXMgaW4gdGhlIGV2ZW50IHRoYXQgdGhpcyBmdW5jdGlvbiBpcyBiZWluZyBjYWxsZWQgYWZ0ZXIgYWxsIHBhdGNoZXMgYXJlIHJlbW92ZWQuXHJcbiAgICBpZiAoIXBhdGNoKVxyXG4gICAgICAgIHJldHVybiBpc0NvbnN0cnVjdFxyXG4gICAgICAgICAgICA/IFJlZmxlY3QuY29uc3RydWN0KGZ1bmNQYXJlbnRbZnVuY05hbWVdLCBmdW5jQXJncywgY3R4dClcclxuICAgICAgICAgICAgOiBmdW5jUGFyZW50W2Z1bmNOYW1lXS5hcHBseShjdHh0LCBmdW5jQXJncyk7XHJcbiAgICAvLyBCZWZvcmUgcGF0Y2hlc1xyXG4gICAgZm9yIChjb25zdCBob29rIG9mIHBhdGNoLmIudmFsdWVzKCkpIHtcclxuICAgICAgICBjb25zdCBtYXliZWZ1bmNBcmdzID0gaG9vay5jYWxsKGN0eHQsIGZ1bmNBcmdzKTtcclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShtYXliZWZ1bmNBcmdzKSlcclxuICAgICAgICAgICAgZnVuY0FyZ3MgPSBtYXliZWZ1bmNBcmdzO1xyXG4gICAgfVxyXG4gICAgLy8gSW5zdGVhZCBwYXRjaGVzXHJcbiAgICBsZXQgaW5zdGVhZFBhdGNoZWRGdW5jID0gKC4uLmFyZ3MpID0+IGlzQ29uc3RydWN0XHJcbiAgICAgICAgPyBSZWZsZWN0LmNvbnN0cnVjdChwYXRjaC5vLCBhcmdzLCBjdHh0KVxyXG4gICAgICAgIDogcGF0Y2guby5hcHBseShjdHh0LCBhcmdzKTtcclxuICAgIGZvciAoY29uc3QgY2FsbGJhY2sgb2YgcGF0Y2guaS52YWx1ZXMoKSkge1xyXG4gICAgICAgIGNvbnN0IG9sZFBhdGNoRnVuYyA9IGluc3RlYWRQYXRjaGVkRnVuYztcclxuICAgICAgICBpbnN0ZWFkUGF0Y2hlZEZ1bmMgPSAoLi4uYXJncykgPT4gY2FsbGJhY2suY2FsbChjdHh0LCBhcmdzLCBvbGRQYXRjaEZ1bmMpO1xyXG4gICAgfVxyXG4gICAgbGV0IHdvcmtpbmdSZXRWYWwgPSBpbnN0ZWFkUGF0Y2hlZEZ1bmMoLi4uZnVuY0FyZ3MpO1xyXG4gICAgLy8gQWZ0ZXIgcGF0Y2hlc1xyXG4gICAgZm9yIChjb25zdCBob29rIG9mIHBhdGNoLmEudmFsdWVzKCkpXHJcbiAgICAgICAgd29ya2luZ1JldFZhbCA9IGhvb2suY2FsbChjdHh0LCBmdW5jQXJncywgd29ya2luZ1JldFZhbCkgPz8gd29ya2luZ1JldFZhbDtcclxuICAgIHJldHVybiB3b3JraW5nUmV0VmFsO1xyXG59XHJcbiIsICJpbXBvcnQgeyBwYXRjaGVkT2JqZWN0cywgcGF0Y2hUeXBlcyB9IGZyb20gXCIuL3NoYXJlZC5qc1wiO1xyXG5leHBvcnQgZnVuY3Rpb24gdW5QYXRjaChmdW5jUGFyZW50LCBmdW5jTmFtZSwgaG9va0lkLCB0eXBlKSB7XHJcbiAgICBjb25zdCBwYXRjaGVkT2JqZWN0ID0gcGF0Y2hlZE9iamVjdHMuZ2V0KGZ1bmNQYXJlbnQpO1xyXG4gICAgY29uc3QgcGF0Y2ggPSBwYXRjaGVkT2JqZWN0Py5bZnVuY05hbWVdO1xyXG4gICAgaWYgKCFwYXRjaD8uW3R5cGVdLmhhcyhob29rSWQpKVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIHBhdGNoW3R5cGVdLmRlbGV0ZShob29rSWQpO1xyXG4gICAgLy8gSWYgdGhlcmUgYXJlIG5vIG1vcmUgaG9va3MgZm9yIGV2ZXJ5IHR5cGUsIHJlbW92ZSB0aGUgcGF0Y2hcclxuICAgIGlmIChwYXRjaFR5cGVzLmV2ZXJ5KCh0KSA9PiBwYXRjaFt0XS5zaXplID09PSAwKSkge1xyXG4gICAgICAgIC8vIHJlZmxlY3QgZGVmaW5lcHJvcGVydHkgaXMgbGlrZSBvYmplY3QgZGVmaW5lcHJvcGVydHlcclxuICAgICAgICAvLyBidXQgaW5zdGVhZCBvZiBlcnJvcmluZyBpdCByZXR1cm5zIGlmIGl0IHdvcmtlZCBvciBub3QuXHJcbiAgICAgICAgLy8gdGhpcyBpcyBtb3JlIGVhc2lseSBtaW5pZmlhYmxlLCBoZW5jZSBpdHMgdXNlLiAtLSBzaW5rXHJcbiAgICAgICAgY29uc3Qgc3VjY2VzcyA9IFJlZmxlY3QuZGVmaW5lUHJvcGVydHkoZnVuY1BhcmVudCwgZnVuY05hbWUsIHtcclxuICAgICAgICAgICAgdmFsdWU6IHBhdGNoLm8sXHJcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKCFzdWNjZXNzKVxyXG4gICAgICAgICAgICBmdW5jUGFyZW50W2Z1bmNOYW1lXSA9IHBhdGNoLm87XHJcbiAgICAgICAgZGVsZXRlIHBhdGNoZWRPYmplY3RbZnVuY05hbWVdO1xyXG4gICAgfVxyXG4gICAgaWYgKE9iamVjdC5rZXlzKHBhdGNoZWRPYmplY3QpLmxlbmd0aCA9PSAwKVxyXG4gICAgICAgIHBhdGNoZWRPYmplY3RzLmRlbGV0ZShmdW5jUGFyZW50KTtcclxuICAgIHJldHVybiB0cnVlO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiB1blBhdGNoQWxsKCkge1xyXG4gICAgZm9yIChjb25zdCBbcGFyZW50T2JqZWN0LCBwYXRjaGVkT2JqZWN0XSBvZiBwYXRjaGVkT2JqZWN0cy5lbnRyaWVzKCkpXHJcbiAgICAgICAgZm9yIChjb25zdCBmdW5jTmFtZSBpbiBwYXRjaGVkT2JqZWN0KVxyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGhvb2tUeXBlIG9mIHBhdGNoVHlwZXMpXHJcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGhvb2tJZCBvZiBwYXRjaGVkT2JqZWN0W2Z1bmNOYW1lXT8uW2hvb2tUeXBlXS5rZXlzKCkgPz8gW10pXHJcbiAgICAgICAgICAgICAgICAgICAgdW5QYXRjaChwYXJlbnRPYmplY3QsIGZ1bmNOYW1lLCBob29rSWQsIGhvb2tUeXBlKTtcclxufVxyXG4iLCAiLy8gY3VycmllZCAtIGdldFBhdGNoRnVuYyhcImJlZm9yZVwiKSguLi4pXHJcbi8vIGFsbG93cyB1cyB0byBhcHBseSBhbiBhcmd1bWVudCB3aGlsZSBsZWF2aW5nIHRoZSByZXN0IG9wZW4gbXVjaCBjbGVhbmVyLlxyXG4vLyBmdW5jdGlvbmFsIHByb2dyYW1taW5nIHN0cmlrZXMgYWdhaW4hIC0tIHNpbmtcclxuaW1wb3J0IGhvb2sgZnJvbSBcIi4vaG9vay5qc1wiO1xyXG5pbXBvcnQgeyBwYXRjaGVkT2JqZWN0cyB9IGZyb20gXCIuL3NoYXJlZC5qc1wiO1xyXG5pbXBvcnQgeyB1blBhdGNoIH0gZnJvbSBcIi4vdW4tcGF0Y2guanNcIjtcclxuLy8gY3JlYXRlcyBhIGhvb2sgaWYgbmVlZGVkLCBlbHNlIGp1c3QgYWRkcyBvbmUgdG8gdGhlIHBhdGNoZXMgYXJyYXlcclxuZXhwb3J0IGRlZmF1bHQgKHBhdGNoVHlwZSkgPT4gKGZ1bmNOYW1lLCBmdW5jUGFyZW50LCBjYWxsYmFjaywgb25lVGltZSA9IGZhbHNlKSA9PiB7XHJcbiAgICBpZiAodHlwZW9mIGZ1bmNQYXJlbnRbZnVuY05hbWVdICE9PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke2Z1bmNOYW1lfSBpcyBub3QgYSBmdW5jdGlvbiBpbiAke2Z1bmNQYXJlbnQuY29uc3RydWN0b3IubmFtZX1gKTtcclxuICAgIGlmICghcGF0Y2hlZE9iamVjdHMuaGFzKGZ1bmNQYXJlbnQpKVxyXG4gICAgICAgIHBhdGNoZWRPYmplY3RzLnNldChmdW5jUGFyZW50LCB7fSk7XHJcbiAgICBjb25zdCBwYXJlbnRJbmplY3Rpb25zID0gcGF0Y2hlZE9iamVjdHMuZ2V0KGZ1bmNQYXJlbnQpO1xyXG4gICAgaWYgKCFwYXJlbnRJbmplY3Rpb25zW2Z1bmNOYW1lXSkge1xyXG4gICAgICAgIGNvbnN0IG9yaWdGdW5jID0gZnVuY1BhcmVudFtmdW5jTmFtZV07XHJcbiAgICAgICAgLy8gbm90ZSB0byBmdXR1cmUgbWUgb3B0aW1pc2luZyBmb3Igc2l6ZTogZXh0cmFjdGluZyBuZXcgTWFwKCkgdG8gYSBmdW5jIGluY3JlYXNlcyBzaXplIC0tc2lua1xyXG4gICAgICAgIHBhcmVudEluamVjdGlvbnNbZnVuY05hbWVdID0ge1xyXG4gICAgICAgICAgICBvOiBvcmlnRnVuYyxcclxuICAgICAgICAgICAgYjogbmV3IE1hcCgpLFxyXG4gICAgICAgICAgICBpOiBuZXcgTWFwKCksXHJcbiAgICAgICAgICAgIGE6IG5ldyBNYXAoKSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IHJ1bkhvb2sgPSAoY3R4dCwgYXJncywgY29uc3RydWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJldCA9IGhvb2soZnVuY05hbWUsIGZ1bmNQYXJlbnQsIGFyZ3MsIGN0eHQsIGNvbnN0cnVjdCk7XHJcbiAgICAgICAgICAgIGlmIChvbmVUaW1lKVxyXG4gICAgICAgICAgICAgICAgdW5wYXRjaFRoaXNQYXRjaCgpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29uc3QgcmVwbGFjZVByb3h5ID0gbmV3IFByb3h5KG9yaWdGdW5jLCB7XHJcbiAgICAgICAgICAgIGFwcGx5OiAoXywgY3R4dCwgYXJncykgPT4gcnVuSG9vayhjdHh0LCBhcmdzLCBmYWxzZSksXHJcbiAgICAgICAgICAgIGNvbnN0cnVjdDogKF8sIGFyZ3MpID0+IHJ1bkhvb2sob3JpZ0Z1bmMsIGFyZ3MsIHRydWUpLFxyXG4gICAgICAgICAgICBnZXQ6ICh0YXJnZXQsIHByb3AsIHJlY2VpdmVyKSA9PiBwcm9wID09IFwidG9TdHJpbmdcIlxyXG4gICAgICAgICAgICAgICAgPyBvcmlnRnVuYy50b1N0cmluZy5iaW5kKG9yaWdGdW5jKVxyXG4gICAgICAgICAgICAgICAgOiBSZWZsZWN0LmdldCh0YXJnZXQsIHByb3AsIHJlY2VpdmVyKSxcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyB0aGlzIHdvcmtzIGFyb3VuZCBicmVha2luZyBzb21lIGFzeW5jIGZpbmQgaW1wbGVtZW50YXRpb24gd2hpY2ggbGlzdGVucyBmb3IgYXNzaWducyB2aWEgcHJveHlcclxuICAgICAgICAvLyBzZWUgY29tbWVudCBpbiB1bnBhdGNoLnRzXHJcbiAgICAgICAgY29uc3Qgc3VjY2VzcyA9IFJlZmxlY3QuZGVmaW5lUHJvcGVydHkoZnVuY1BhcmVudCwgZnVuY05hbWUsIHtcclxuICAgICAgICAgICAgdmFsdWU6IHJlcGxhY2VQcm94eSxcclxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoIXN1Y2Nlc3MpXHJcbiAgICAgICAgICAgIGZ1bmNQYXJlbnRbZnVuY05hbWVdID0gcmVwbGFjZVByb3h5O1xyXG4gICAgICAgIGZ1bmNQYXJlbnRbZnVuY05hbWVdLl9fb3JpZ2luYWxfXyA9IHBhcmVudEluamVjdGlvbnNbZnVuY05hbWVdLm87XHJcbiAgICB9XHJcbiAgICBjb25zdCBob29rSWQgPSBTeW1ib2woKTtcclxuICAgIGNvbnN0IHVucGF0Y2hUaGlzUGF0Y2ggPSAoKSA9PiB1blBhdGNoKGZ1bmNQYXJlbnQsIGZ1bmNOYW1lLCBob29rSWQsIHBhdGNoVHlwZSk7XHJcbiAgICBwYXJlbnRJbmplY3Rpb25zW2Z1bmNOYW1lXVtwYXRjaFR5cGVdLnNldChob29rSWQsIGNhbGxiYWNrKTtcclxuICAgIHJldHVybiB1bnBhdGNoVGhpc1BhdGNoO1xyXG59O1xyXG4iLCAiaW1wb3J0IGdldFBhdGNoRnVuYyBmcm9tIFwiLi9nZXQtcGF0Y2gtZnVuYy5qc1wiO1xyXG5pbXBvcnQgeyB1blBhdGNoQWxsIH0gZnJvbSBcIi4vdW4tcGF0Y2guanNcIjtcclxuaW1wb3J0IHsgcGF0Y2hlZE9iamVjdHMgYXMgcGF0Y2hlZCB9IGZyb20gXCIuL3NoYXJlZC5qc1wiO1xyXG5jb25zdCBiZWZvcmUgPSBnZXRQYXRjaEZ1bmMoXCJiXCIpO1xyXG5jb25zdCBpbnN0ZWFkID0gZ2V0UGF0Y2hGdW5jKFwiaVwiKTtcclxuY29uc3QgYWZ0ZXIgPSBnZXRQYXRjaEZ1bmMoXCJhXCIpO1xyXG5leHBvcnQgeyBpbnN0ZWFkLCBiZWZvcmUsIGFmdGVyLCB1blBhdGNoQWxsLCBwYXRjaGVkIH07XHJcbiIsICJpbXBvcnQgKiBhcyBzcGl0Um9hc3QgZnJvbSBcIi4uLy4uL2xpYi9zcGl0cm9hc3QvZGlzdC9lc21cIjtcclxuXHJcbmZ1bmN0aW9uIHByb3BSZXBsYWNlcihjc3MsIHByb3BzID0ge30pIHtcclxuICBjc3MgPSBjc3MucmVwbGFjZSgvdmFyXFwoLS1hY29yZC0tKFtcXFNcXHNdKylcXCkvZywgKG1hdGNoLCBncm91cDEpID0+IHtcclxuICAgIGxldCBzcGxpdHRlZCA9IGdyb3VwMS5zcGxpdChcIixcIik7XHJcbiAgICBsZXQga2V5ID0gc3BsaXR0ZWQuc2hpZnQoKS50cmltKCk7XHJcbiAgICBsZXQgZGVmYXVsdFZhbHVlID0gc3BsaXR0ZWQuam9pbihcIixcIikudHJpbSgpO1xyXG4gICAgcmV0dXJuIHByb3BzW2tleV0gPz8gKGRlZmF1bHRWYWx1ZSB8fCBtYXRjaCk7XHJcbiAgfSk7XHJcbiAgcmV0dXJuIGNzcztcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIF9fY2FjaGVfXzoge1xyXG4gICAgcGF0Y2hlZDogc3BpdFJvYXN0LnBhdGNoZWQsXHJcbiAgfSxcclxuICBiZWZvcmU6IHNwaXRSb2FzdC5iZWZvcmUsXHJcbiAgYWZ0ZXI6IHNwaXRSb2FzdC5hZnRlcixcclxuICBpbnN0ZWFkOiBzcGl0Um9hc3QuaW5zdGVhZCxcclxuICB1blBhdGNoQWxsOiBzcGl0Um9hc3QudW5QYXRjaEFsbCxcclxuICBpbmplY3RDU1MoY3NzLCBjdXN0b21Qcm9wcyA9IHt9KSB7XHJcbiAgICBjb25zdCBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcclxuICAgIHN0eWxlLmNsYXNzTmFtZSA9IGBhY29yZC0taW5qZWN0ZWQtY3NzYDtcclxuICAgIHN0eWxlLnRleHRDb250ZW50ID0gcHJvcFJlcGxhY2VyKGNzcywgY3VzdG9tUHJvcHMpO1xyXG4gICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XHJcblxyXG4gICAgcmV0dXJuICguLi5hcmdzKSA9PiB7XHJcbiAgICAgIGlmICh0eXBlb2YgYXJnc1swXSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgIHN0eWxlLnRleHRDb250ZW50ID0gcHJvcFJlcGxhY2VyKGFyZ3NbMF0sIGFyZ3NbMV0pO1xyXG4gICAgICAgIGNzcyA9IGFyZ3NbMF07XHJcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGFyZ3NbMF0gPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICBzdHlsZS50ZXh0Q29udGVudCA9IHByb3BSZXBsYWNlcihjc3MsIGFyZ3NbMF0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHN0eWxlPy5yZW1vdmUoKTtcclxuICAgICAgICBjc3MgPSBudWxsO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgdW5QYXRjaEFsbENTUygpIHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYWNvcmQtLWluamVjdGVkLWNzc1wiKS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICBlbGVtZW50LnJlbW92ZSgpO1xyXG4gICAgfSlcclxuICB9XHJcbn0iLCAiZXhwb3J0IGRlZmF1bHQgYFxuQGtleWZyYW1lcyBhY29yZExvYWRpbmdGYWRlezAle29wYWNpdHk6LjF9MTAwJXtvcGFjaXR5Oi45fX0uYWNvcmQtLXN0YXJ0dXAtbG9hZGluZ3thbmltYXRpb246YWNvcmRMb2FkaW5nRmFkZSAuNXMgYWx0ZXJuYXRlIGluZmluaXRlIGxpbmVhcjtwb3NpdGlvbjphYnNvbHV0ZTt0cmFuc2l0aW9uOmFsbCAuNXMgbGluZWFyO3JpZ2h0OjhweDtib3R0b206OHB4O3dpZHRoOjE2cHg7aGVpZ2h0OjE2cHg7YmFja2dyb3VuZC1pbWFnZTp1cmwoXCJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vQWNvcmRQbHVnaW4vYXNzZXRzL21haW4vQWNvcmQuc3ZnXCIpO2ZpbHRlcjpncmF5c2NhbGUoMSkgYnJpZ2h0bmVzcygxKTtiYWNrZ3JvdW5kLXBvc2l0aW9uOmNlbnRlcjtiYWNrZ3JvdW5kLXJlcGVhdDpuby1yZXBlYXQ7YmFja2dyb3VuZC1zaXplOmNvbnRhaW47ei1pbmRleDo5OTk5OTl9LmFjb3JkLS1zdGFydHVwLWxvYWRpbmcuaGlkZGVue29wYWNpdHk6MCAhaW1wb3J0YW50fWA7XG4iLCAiaW1wb3J0IGRvbSBmcm9tIFwiLi4vLi4vYXBpL2RvbS9pbmRleC5qc1wiO1xyXG5pbXBvcnQgcGF0Y2hlciBmcm9tIFwiLi4vLi4vYXBpL3BhdGNoZXIvaW5kZXguanNcIjtcclxuXHJcbmltcG9ydCBjc3NUZXh0IGZyb20gXCIuL3N0eWxlLnNjc3NcIjtcclxubGV0IHVuSW5qZWN0O1xyXG5cclxuYXN5bmMgZnVuY3Rpb24gc2hvdygpIHtcclxuICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hY29yZC0tc3RhcnR1cC1sb2FkaW5nXCIpKSByZXR1cm47XHJcbiAgd2hpbGUgKHRydWUpIHtcclxuICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FwcC1tb3VudFwiKSkgYnJlYWs7XHJcbiAgICBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gc2V0VGltZW91dChyZXNvbHZlLCAxMDApKTtcclxuICB9XHJcbiAgXHJcbiAgdW5JbmplY3QgPSBwYXRjaGVyLmluamVjdENTUyhjc3NUZXh0KTtcclxuICBjb25zdCBlbGVtZW50ID0gZG9tLnBhcnNlKGBcclxuICAgIDxkaXYgY2xhc3M9XCJhY29yZC0tc3RhcnR1cC1sb2FkaW5nXCI+PC9kaXY+XHJcbiAgYClcclxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FwcC1tb3VudFwiKS5hcHBlbmRDaGlsZChlbGVtZW50KTtcclxufVxyXG5cclxuZnVuY3Rpb24gaGlkZSgpIHtcclxuICBsZXQgZWxtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hY29yZC0tc3RhcnR1cC1sb2FkaW5nXCIpO1xyXG4gIGlmIChlbG0pIHtcclxuICAgIGVsbS5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIGVsbS5yZW1vdmUoKTtcclxuICAgICAgdW5JbmplY3Q/LigpO1xyXG4gICAgICB1bkluamVjdCA9IG51bGw7XHJcbiAgICB9LCA1MDApO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIHNob3csXHJcbiAgaGlkZVxyXG59IiwgImltcG9ydCAqIGFzIG5lc3RzIGZyb20gXCJuZXN0c1wiO1xyXG5pbXBvcnQgKiBhcyBpZGJLZXl2YWwgZnJvbSBcImlkYi1rZXl2YWxcIjtcclxuaW1wb3J0IHsgZGVDeWNsZWQsIHJldml2ZSB9IGZyb20gXCIuLi8uLi9saWIvanNvbi1kZWN5Y2xlZFwiO1xyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgYXN5bmMgY3JlYXRlUGVyc2lzdE5lc3Qoc3VmZml4KSB7XHJcbiAgICBsZXQgY2FjaGVkID0gYXdhaXQgaWRiS2V5dmFsLmdldChgQWNvcmRTdG9yZTske3N1ZmZpeH1gKTtcclxuICAgIGlmICh0eXBlb2YgY2FjaGVkID09IFwic3RyaW5nXCIpIGNhY2hlZCA9IHJldml2ZShjYWNoZWQpO1xyXG4gICAgY29uc3QgbmVzdCA9IG5lc3RzLm1ha2UoY2FjaGVkID8/IHt9KTtcclxuXHJcbiAgICBjb25zdCBzYXZlID0gKCkgPT4ge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGlkYktleXZhbC5zZXQoYEFjb3JkU3RvcmU7JHtzdWZmaXh9YCwgZGVDeWNsZWQoeyAuLi5uZXN0Lmdob3N0IH0pKTtcclxuICAgICAgfSBjYXRjaCB7XHJcbiAgICAgICAgaWRiS2V5dmFsLnNldChgQWNvcmRTdG9yZTske3N1ZmZpeH1gLCBkZUN5Y2xlZCh7fSkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbmVzdC5vbihuZXN0cy5FdmVudHMuU0VULCBzYXZlKTtcclxuICAgIG5lc3Qub24obmVzdHMuRXZlbnRzLlVQREFURSwgc2F2ZSk7XHJcbiAgICBuZXN0Lm9uKG5lc3RzLkV2ZW50cy5ERUxFVEUsIHNhdmUpO1xyXG5cclxuICAgIHJldHVybiBuZXN0O1xyXG4gIH1cclxufSIsICJmdW5jdGlvbiBwcm9taXNpZnlSZXF1ZXN0KHJlcXVlc3QpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAvLyBAdHMtaWdub3JlIC0gZmlsZSBzaXplIGhhY2tzXG4gICAgICAgIHJlcXVlc3Qub25jb21wbGV0ZSA9IHJlcXVlc3Qub25zdWNjZXNzID0gKCkgPT4gcmVzb2x2ZShyZXF1ZXN0LnJlc3VsdCk7XG4gICAgICAgIC8vIEB0cy1pZ25vcmUgLSBmaWxlIHNpemUgaGFja3NcbiAgICAgICAgcmVxdWVzdC5vbmFib3J0ID0gcmVxdWVzdC5vbmVycm9yID0gKCkgPT4gcmVqZWN0KHJlcXVlc3QuZXJyb3IpO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gY3JlYXRlU3RvcmUoZGJOYW1lLCBzdG9yZU5hbWUpIHtcbiAgICBjb25zdCByZXF1ZXN0ID0gaW5kZXhlZERCLm9wZW4oZGJOYW1lKTtcbiAgICByZXF1ZXN0Lm9udXBncmFkZW5lZWRlZCA9ICgpID0+IHJlcXVlc3QucmVzdWx0LmNyZWF0ZU9iamVjdFN0b3JlKHN0b3JlTmFtZSk7XG4gICAgY29uc3QgZGJwID0gcHJvbWlzaWZ5UmVxdWVzdChyZXF1ZXN0KTtcbiAgICByZXR1cm4gKHR4TW9kZSwgY2FsbGJhY2spID0+IGRicC50aGVuKChkYikgPT4gY2FsbGJhY2soZGIudHJhbnNhY3Rpb24oc3RvcmVOYW1lLCB0eE1vZGUpLm9iamVjdFN0b3JlKHN0b3JlTmFtZSkpKTtcbn1cbmxldCBkZWZhdWx0R2V0U3RvcmVGdW5jO1xuZnVuY3Rpb24gZGVmYXVsdEdldFN0b3JlKCkge1xuICAgIGlmICghZGVmYXVsdEdldFN0b3JlRnVuYykge1xuICAgICAgICBkZWZhdWx0R2V0U3RvcmVGdW5jID0gY3JlYXRlU3RvcmUoJ2tleXZhbC1zdG9yZScsICdrZXl2YWwnKTtcbiAgICB9XG4gICAgcmV0dXJuIGRlZmF1bHRHZXRTdG9yZUZ1bmM7XG59XG4vKipcbiAqIEdldCBhIHZhbHVlIGJ5IGl0cyBrZXkuXG4gKlxuICogQHBhcmFtIGtleVxuICogQHBhcmFtIGN1c3RvbVN0b3JlIE1ldGhvZCB0byBnZXQgYSBjdXN0b20gc3RvcmUuIFVzZSB3aXRoIGNhdXRpb24gKHNlZSB0aGUgZG9jcykuXG4gKi9cbmZ1bmN0aW9uIGdldChrZXksIGN1c3RvbVN0b3JlID0gZGVmYXVsdEdldFN0b3JlKCkpIHtcbiAgICByZXR1cm4gY3VzdG9tU3RvcmUoJ3JlYWRvbmx5JywgKHN0b3JlKSA9PiBwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLmdldChrZXkpKSk7XG59XG4vKipcbiAqIFNldCBhIHZhbHVlIHdpdGggYSBrZXkuXG4gKlxuICogQHBhcmFtIGtleVxuICogQHBhcmFtIHZhbHVlXG4gKiBAcGFyYW0gY3VzdG9tU3RvcmUgTWV0aG9kIHRvIGdldCBhIGN1c3RvbSBzdG9yZS4gVXNlIHdpdGggY2F1dGlvbiAoc2VlIHRoZSBkb2NzKS5cbiAqL1xuZnVuY3Rpb24gc2V0KGtleSwgdmFsdWUsIGN1c3RvbVN0b3JlID0gZGVmYXVsdEdldFN0b3JlKCkpIHtcbiAgICByZXR1cm4gY3VzdG9tU3RvcmUoJ3JlYWR3cml0ZScsIChzdG9yZSkgPT4ge1xuICAgICAgICBzdG9yZS5wdXQodmFsdWUsIGtleSk7XG4gICAgICAgIHJldHVybiBwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLnRyYW5zYWN0aW9uKTtcbiAgICB9KTtcbn1cbi8qKlxuICogU2V0IG11bHRpcGxlIHZhbHVlcyBhdCBvbmNlLiBUaGlzIGlzIGZhc3RlciB0aGFuIGNhbGxpbmcgc2V0KCkgbXVsdGlwbGUgdGltZXMuXG4gKiBJdCdzIGFsc28gYXRvbWljIFx1MjAxMyBpZiBvbmUgb2YgdGhlIHBhaXJzIGNhbid0IGJlIGFkZGVkLCBub25lIHdpbGwgYmUgYWRkZWQuXG4gKlxuICogQHBhcmFtIGVudHJpZXMgQXJyYXkgb2YgZW50cmllcywgd2hlcmUgZWFjaCBlbnRyeSBpcyBhbiBhcnJheSBvZiBgW2tleSwgdmFsdWVdYC5cbiAqIEBwYXJhbSBjdXN0b21TdG9yZSBNZXRob2QgdG8gZ2V0IGEgY3VzdG9tIHN0b3JlLiBVc2Ugd2l0aCBjYXV0aW9uIChzZWUgdGhlIGRvY3MpLlxuICovXG5mdW5jdGlvbiBzZXRNYW55KGVudHJpZXMsIGN1c3RvbVN0b3JlID0gZGVmYXVsdEdldFN0b3JlKCkpIHtcbiAgICByZXR1cm4gY3VzdG9tU3RvcmUoJ3JlYWR3cml0ZScsIChzdG9yZSkgPT4ge1xuICAgICAgICBlbnRyaWVzLmZvckVhY2goKGVudHJ5KSA9PiBzdG9yZS5wdXQoZW50cnlbMV0sIGVudHJ5WzBdKSk7XG4gICAgICAgIHJldHVybiBwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLnRyYW5zYWN0aW9uKTtcbiAgICB9KTtcbn1cbi8qKlxuICogR2V0IG11bHRpcGxlIHZhbHVlcyBieSB0aGVpciBrZXlzXG4gKlxuICogQHBhcmFtIGtleXNcbiAqIEBwYXJhbSBjdXN0b21TdG9yZSBNZXRob2QgdG8gZ2V0IGEgY3VzdG9tIHN0b3JlLiBVc2Ugd2l0aCBjYXV0aW9uIChzZWUgdGhlIGRvY3MpLlxuICovXG5mdW5jdGlvbiBnZXRNYW55KGtleXMsIGN1c3RvbVN0b3JlID0gZGVmYXVsdEdldFN0b3JlKCkpIHtcbiAgICByZXR1cm4gY3VzdG9tU3RvcmUoJ3JlYWRvbmx5JywgKHN0b3JlKSA9PiBQcm9taXNlLmFsbChrZXlzLm1hcCgoa2V5KSA9PiBwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLmdldChrZXkpKSkpKTtcbn1cbi8qKlxuICogVXBkYXRlIGEgdmFsdWUuIFRoaXMgbGV0cyB5b3Ugc2VlIHRoZSBvbGQgdmFsdWUgYW5kIHVwZGF0ZSBpdCBhcyBhbiBhdG9taWMgb3BlcmF0aW9uLlxuICpcbiAqIEBwYXJhbSBrZXlcbiAqIEBwYXJhbSB1cGRhdGVyIEEgY2FsbGJhY2sgdGhhdCB0YWtlcyB0aGUgb2xkIHZhbHVlIGFuZCByZXR1cm5zIGEgbmV3IHZhbHVlLlxuICogQHBhcmFtIGN1c3RvbVN0b3JlIE1ldGhvZCB0byBnZXQgYSBjdXN0b20gc3RvcmUuIFVzZSB3aXRoIGNhdXRpb24gKHNlZSB0aGUgZG9jcykuXG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZShrZXksIHVwZGF0ZXIsIGN1c3RvbVN0b3JlID0gZGVmYXVsdEdldFN0b3JlKCkpIHtcbiAgICByZXR1cm4gY3VzdG9tU3RvcmUoJ3JlYWR3cml0ZScsIChzdG9yZSkgPT4gXG4gICAgLy8gTmVlZCB0byBjcmVhdGUgdGhlIHByb21pc2UgbWFudWFsbHkuXG4gICAgLy8gSWYgSSB0cnkgdG8gY2hhaW4gcHJvbWlzZXMsIHRoZSB0cmFuc2FjdGlvbiBjbG9zZXMgaW4gYnJvd3NlcnNcbiAgICAvLyB0aGF0IHVzZSBhIHByb21pc2UgcG9seWZpbGwgKElFMTAvMTEpLlxuICAgIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgc3RvcmUuZ2V0KGtleSkub25zdWNjZXNzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBzdG9yZS5wdXQodXBkYXRlcih0aGlzLnJlc3VsdCksIGtleSk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLnRyYW5zYWN0aW9uKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSkpO1xufVxuLyoqXG4gKiBEZWxldGUgYSBwYXJ0aWN1bGFyIGtleSBmcm9tIHRoZSBzdG9yZS5cbiAqXG4gKiBAcGFyYW0ga2V5XG4gKiBAcGFyYW0gY3VzdG9tU3RvcmUgTWV0aG9kIHRvIGdldCBhIGN1c3RvbSBzdG9yZS4gVXNlIHdpdGggY2F1dGlvbiAoc2VlIHRoZSBkb2NzKS5cbiAqL1xuZnVuY3Rpb24gZGVsKGtleSwgY3VzdG9tU3RvcmUgPSBkZWZhdWx0R2V0U3RvcmUoKSkge1xuICAgIHJldHVybiBjdXN0b21TdG9yZSgncmVhZHdyaXRlJywgKHN0b3JlKSA9PiB7XG4gICAgICAgIHN0b3JlLmRlbGV0ZShrZXkpO1xuICAgICAgICByZXR1cm4gcHJvbWlzaWZ5UmVxdWVzdChzdG9yZS50cmFuc2FjdGlvbik7XG4gICAgfSk7XG59XG4vKipcbiAqIERlbGV0ZSBtdWx0aXBsZSBrZXlzIGF0IG9uY2UuXG4gKlxuICogQHBhcmFtIGtleXMgTGlzdCBvZiBrZXlzIHRvIGRlbGV0ZS5cbiAqIEBwYXJhbSBjdXN0b21TdG9yZSBNZXRob2QgdG8gZ2V0IGEgY3VzdG9tIHN0b3JlLiBVc2Ugd2l0aCBjYXV0aW9uIChzZWUgdGhlIGRvY3MpLlxuICovXG5mdW5jdGlvbiBkZWxNYW55KGtleXMsIGN1c3RvbVN0b3JlID0gZGVmYXVsdEdldFN0b3JlKCkpIHtcbiAgICByZXR1cm4gY3VzdG9tU3RvcmUoJ3JlYWR3cml0ZScsIChzdG9yZSkgPT4ge1xuICAgICAgICBrZXlzLmZvckVhY2goKGtleSkgPT4gc3RvcmUuZGVsZXRlKGtleSkpO1xuICAgICAgICByZXR1cm4gcHJvbWlzaWZ5UmVxdWVzdChzdG9yZS50cmFuc2FjdGlvbik7XG4gICAgfSk7XG59XG4vKipcbiAqIENsZWFyIGFsbCB2YWx1ZXMgaW4gdGhlIHN0b3JlLlxuICpcbiAqIEBwYXJhbSBjdXN0b21TdG9yZSBNZXRob2QgdG8gZ2V0IGEgY3VzdG9tIHN0b3JlLiBVc2Ugd2l0aCBjYXV0aW9uIChzZWUgdGhlIGRvY3MpLlxuICovXG5mdW5jdGlvbiBjbGVhcihjdXN0b21TdG9yZSA9IGRlZmF1bHRHZXRTdG9yZSgpKSB7XG4gICAgcmV0dXJuIGN1c3RvbVN0b3JlKCdyZWFkd3JpdGUnLCAoc3RvcmUpID0+IHtcbiAgICAgICAgc3RvcmUuY2xlYXIoKTtcbiAgICAgICAgcmV0dXJuIHByb21pc2lmeVJlcXVlc3Qoc3RvcmUudHJhbnNhY3Rpb24pO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gZWFjaEN1cnNvcihzdG9yZSwgY2FsbGJhY2spIHtcbiAgICBzdG9yZS5vcGVuQ3Vyc29yKCkub25zdWNjZXNzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXRoaXMucmVzdWx0KVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjYWxsYmFjayh0aGlzLnJlc3VsdCk7XG4gICAgICAgIHRoaXMucmVzdWx0LmNvbnRpbnVlKCk7XG4gICAgfTtcbiAgICByZXR1cm4gcHJvbWlzaWZ5UmVxdWVzdChzdG9yZS50cmFuc2FjdGlvbik7XG59XG4vKipcbiAqIEdldCBhbGwga2V5cyBpbiB0aGUgc3RvcmUuXG4gKlxuICogQHBhcmFtIGN1c3RvbVN0b3JlIE1ldGhvZCB0byBnZXQgYSBjdXN0b20gc3RvcmUuIFVzZSB3aXRoIGNhdXRpb24gKHNlZSB0aGUgZG9jcykuXG4gKi9cbmZ1bmN0aW9uIGtleXMoY3VzdG9tU3RvcmUgPSBkZWZhdWx0R2V0U3RvcmUoKSkge1xuICAgIHJldHVybiBjdXN0b21TdG9yZSgncmVhZG9ubHknLCAoc3RvcmUpID0+IHtcbiAgICAgICAgLy8gRmFzdCBwYXRoIGZvciBtb2Rlcm4gYnJvd3NlcnNcbiAgICAgICAgaWYgKHN0b3JlLmdldEFsbEtleXMpIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLmdldEFsbEtleXMoKSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaXRlbXMgPSBbXTtcbiAgICAgICAgcmV0dXJuIGVhY2hDdXJzb3Ioc3RvcmUsIChjdXJzb3IpID0+IGl0ZW1zLnB1c2goY3Vyc29yLmtleSkpLnRoZW4oKCkgPT4gaXRlbXMpO1xuICAgIH0pO1xufVxuLyoqXG4gKiBHZXQgYWxsIHZhbHVlcyBpbiB0aGUgc3RvcmUuXG4gKlxuICogQHBhcmFtIGN1c3RvbVN0b3JlIE1ldGhvZCB0byBnZXQgYSBjdXN0b20gc3RvcmUuIFVzZSB3aXRoIGNhdXRpb24gKHNlZSB0aGUgZG9jcykuXG4gKi9cbmZ1bmN0aW9uIHZhbHVlcyhjdXN0b21TdG9yZSA9IGRlZmF1bHRHZXRTdG9yZSgpKSB7XG4gICAgcmV0dXJuIGN1c3RvbVN0b3JlKCdyZWFkb25seScsIChzdG9yZSkgPT4ge1xuICAgICAgICAvLyBGYXN0IHBhdGggZm9yIG1vZGVybiBicm93c2Vyc1xuICAgICAgICBpZiAoc3RvcmUuZ2V0QWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzaWZ5UmVxdWVzdChzdG9yZS5nZXRBbGwoKSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaXRlbXMgPSBbXTtcbiAgICAgICAgcmV0dXJuIGVhY2hDdXJzb3Ioc3RvcmUsIChjdXJzb3IpID0+IGl0ZW1zLnB1c2goY3Vyc29yLnZhbHVlKSkudGhlbigoKSA9PiBpdGVtcyk7XG4gICAgfSk7XG59XG4vKipcbiAqIEdldCBhbGwgZW50cmllcyBpbiB0aGUgc3RvcmUuIEVhY2ggZW50cnkgaXMgYW4gYXJyYXkgb2YgYFtrZXksIHZhbHVlXWAuXG4gKlxuICogQHBhcmFtIGN1c3RvbVN0b3JlIE1ldGhvZCB0byBnZXQgYSBjdXN0b20gc3RvcmUuIFVzZSB3aXRoIGNhdXRpb24gKHNlZSB0aGUgZG9jcykuXG4gKi9cbmZ1bmN0aW9uIGVudHJpZXMoY3VzdG9tU3RvcmUgPSBkZWZhdWx0R2V0U3RvcmUoKSkge1xuICAgIHJldHVybiBjdXN0b21TdG9yZSgncmVhZG9ubHknLCAoc3RvcmUpID0+IHtcbiAgICAgICAgLy8gRmFzdCBwYXRoIGZvciBtb2Rlcm4gYnJvd3NlcnNcbiAgICAgICAgLy8gKGFsdGhvdWdoLCBob3BlZnVsbHkgd2UnbGwgZ2V0IGEgc2ltcGxlciBwYXRoIHNvbWUgZGF5KVxuICAgICAgICBpZiAoc3RvcmUuZ2V0QWxsICYmIHN0b3JlLmdldEFsbEtleXMpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICAgICAgcHJvbWlzaWZ5UmVxdWVzdChzdG9yZS5nZXRBbGxLZXlzKCkpLFxuICAgICAgICAgICAgICAgIHByb21pc2lmeVJlcXVlc3Qoc3RvcmUuZ2V0QWxsKCkpLFxuICAgICAgICAgICAgXSkudGhlbigoW2tleXMsIHZhbHVlc10pID0+IGtleXMubWFwKChrZXksIGkpID0+IFtrZXksIHZhbHVlc1tpXV0pKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpdGVtcyA9IFtdO1xuICAgICAgICByZXR1cm4gY3VzdG9tU3RvcmUoJ3JlYWRvbmx5JywgKHN0b3JlKSA9PiBlYWNoQ3Vyc29yKHN0b3JlLCAoY3Vyc29yKSA9PiBpdGVtcy5wdXNoKFtjdXJzb3Iua2V5LCBjdXJzb3IudmFsdWVdKSkudGhlbigoKSA9PiBpdGVtcykpO1xuICAgIH0pO1xufVxuXG5leHBvcnQgeyBjbGVhciwgY3JlYXRlU3RvcmUsIGRlbCwgZGVsTWFueSwgZW50cmllcywgZ2V0LCBnZXRNYW55LCBrZXlzLCBwcm9taXNpZnlSZXF1ZXN0LCBzZXQsIHNldE1hbnksIHVwZGF0ZSwgdmFsdWVzIH07XG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5mdW5jdGlvbiBkZUN5Y2xlcih2YWwsIGNvbmZpZykge1xyXG4gIGNvbmZpZyA9IHR5cGVvZiBjb25maWcgPT09ICdudW1iZXInID8geyBkZWVwOiBjb25maWcgfSA6IChjb25maWcgfHwge30pO1xyXG4gIGNvbmZpZy5kZWVwID0gY29uZmlnLmRlZXAgfHwgMTA7XHJcbiAgcmV0dXJuIGRlY3ljbGVXYWxrZXIoW10sIFtdLCB2YWwsIGNvbmZpZyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRlQ3ljbGVkKHZhbCwgY29uZmlnKSB7XHJcbiAgY29uZmlnID0gdHlwZW9mIGNvbmZpZyA9PT0gJ251bWJlcicgPyB7IGRlZXA6IGNvbmZpZyB9IDogKGNvbmZpZyB8fCB7fSk7XHJcbiAgdmFsID0gZGVDeWNsZXIodmFsLCBjb25maWcpO1xyXG4gIHRyeSB7XHJcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodmFsLCB1bmRlZmluZWQsIGNvbmZpZy5zcGFjZXIpO1xyXG4gIH0gY2F0Y2ggKGUpIHtcclxuICAgIHJldHVybiBlO1xyXG4gIH1cclxufVxyXG5cclxudmFyIHJldml2ZXJEYXRlID0gL15cXFtEYXRlOigoXFxkezR9LVxcZHsyfS1cXGR7Mn0pW0EtWl0rKFxcZHsyfTpcXGR7Mn06XFxkezJ9KS4oWzAtOSstOl0rKVopXFxdJC87XHJcbnZhciByZXZpdmVyUmVnRXhwID0gL15cXFtSZWdleHA6XFwvKC4rKVxcL1xcXSQvO1xyXG52YXIgcmV2aXZlckVycm9yID0gL15cXFtFcnJvcjooW1xcV1xcd10rKVxcXSQvO1xyXG52YXIgcmV2aXZlckZ1bmN0aW9uID0gL15cXFtGdW5jdGlvbjooLispXFxdJC87XHJcbmZ1bmN0aW9uIHJldml2ZSh2YWwsIGZ1bmN0aW9ucykge1xyXG4gIHRyeSB7XHJcbiAgICByZXR1cm4gSlNPTi5wYXJzZSh2YWwsIHJldml2ZXIpO1xyXG4gIH0gY2F0Y2ggKGUpIHtcclxuICAgIHJldHVybiBlO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcmV2aXZlcihrZXksIHZhbCkge1xyXG4gICAgaWYgKHJldml2ZXJEYXRlLnRlc3QodmFsKSkge1xyXG4gICAgICB2YWwgPSByZXZpdmVyRGF0ZS5leGVjKHZhbCk7XHJcbiAgICAgIHZhbCA9IG5ldyBEYXRlKHZhbFsxXSk7XHJcbiAgICAgIHJldHVybiBuZXcgRGF0ZSh2YWwpO1xyXG4gICAgfSBlbHNlIGlmIChyZXZpdmVyUmVnRXhwLnRlc3QodmFsKSkge1xyXG4gICAgICB2YWwgPSByZXZpdmVyUmVnRXhwLmV4ZWModmFsKVsxXTtcclxuICAgICAgcmV0dXJuIG5ldyBSZWdFeHAodmFsKTtcclxuICAgIH0gZWxzZSBpZiAocmV2aXZlckVycm9yLnRlc3QodmFsKSkge1xyXG4gICAgICB2YWwgPSByZXZpdmVyRXJyb3IuZXhlYyh2YWwpWzFdO1xyXG4gICAgICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IodmFsLnNwbGl0KCdcXG4nKVswXSk7XHJcbiAgICAgIGlmIChlcnJvci5zdGFjaykge1xyXG4gICAgICAgIGVycm9yLnN0YWNrID0gdmFsO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBlcnJvcjtcclxuICAgIH0gZWxzZSBpZiAoZnVuY3Rpb25zICYmIHJldml2ZXJGdW5jdGlvbi50ZXN0KHZhbCkpIHtcclxuICAgICAgdmFsID0gcmV2aXZlckZ1bmN0aW9uLmV4ZWModmFsKVsxXTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICByZXR1cm4gKG5ldyBGdW5jdGlvbihcInJldHVybiBcIiArIHZhbCArIFwiO1wiKSkoKTtcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICByZXR1cm4gZXJyb3I7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB2YWw7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBkZWN5Y2xlV2Fsa2VyKHBhcmVudHMsIHBhdGgsIHZhbCwgY29uZmlnKSB7XHJcbiAgaWYgKFsndW5kZWZpbmVkJywgJ251bWJlcicsICdib29sZWFuJywgJ3N0cmluZyddLmluZGV4T2YodHlwZW9mIHZhbCkgPj0gMCB8fCB2YWwgPT09IG51bGwpIHtcclxuICAgIHJldHVybiB2YWw7XHJcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnb2JqZWN0JyAmJiB2YWwuY29uc3RydWN0b3IgPT09IERhdGUpIHtcclxuICAgIHJldHVybiBjb25maWcuZGF0ZXMgIT09IGZhbHNlID8gJ1tEYXRlOicgKyB2YWwudG9JU09TdHJpbmcoKSArICddJyA6IHZhbDtcclxuICAgIC8vdmFsLmZvcm1hdCgne1lZWVl9L3tNTX0ve0REfSB7aGh9OnttbX06e3NzfSBVVEM6XHUwMEI3e3BhcmFtcy50ej49MD9cIitcIitwYXJhbXMudHo6cGFyYW1zLnR6fVx1MDBCNycpO1xyXG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ29iamVjdCcgJiYgdmFsLmNvbnN0cnVjdG9yID09PSBSZWdFeHApIHtcclxuICAgIHJldHVybiBjb25maWcucmVnZXhwcyAhPT0gZmFsc2UgPyAnW1JlZ2V4cDonICsgdmFsLnRvU3RyaW5nKCkgKyAnXScgOiB2YWw7XHJcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnb2JqZWN0JyAmJiB2YWwuY29uc3RydWN0b3IgJiYgdHlwZW9mIHZhbC5jb25zdHJ1Y3Rvci5uYW1lID09PSAnc3RyaW5nJyAmJiB2YWwuY29uc3RydWN0b3IubmFtZS5zbGljZSgtNSkgPT09ICdFcnJvcicpIHtcclxuICAgIHZhciBzdGFjayA9ICh2YWwuc3RhY2sgfHwgJycpLnNwbGl0KCdcXG4nKS5zbGljZSgxKTtcclxuICAgIHZhciBtZXNzYWdlID0gKHZhbC5tZXNzYWdlIHx8IHZhbC50b1N0cmluZygpKTtcclxuICAgIHZhciBlcnJvciA9IG1lc3NhZ2UgKyBcIlxcblwiICsgc3RhY2s7XHJcbiAgICByZXR1cm4gY29uZmlnLmVycm9ycyAhPT0gZmFsc2UgPyAnW0Vycm9yOicgKyBlcnJvciArICddJyA6IHZhbDtcclxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSB7XHJcbiAgICBpZiAocGFyZW50cy5pbmRleE9mKHZhbCkgPj0gMCkge1xyXG4gICAgICB2YXIgcG9pbnQgPSBwYXRoLnNsaWNlKDAsIHBhcmVudHMuaW5kZXhPZih2YWwpKS5qb2luKCcuJyk7XHJcbiAgICAgIHJldHVybiAnW0NpcmN1bGFyJyArIChwb2ludCA/ICc6JyArIHBvaW50IDogJycpICsgJ10nO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFyIGNvcHksIGksIGssIGw7XHJcbiAgICAgIGlmICh2YWwuY29uc3RydWN0b3IgJiYgdHlwZW9mIHZhbC5jb25zdHJ1Y3Rvci5uYW1lID09PSAnc3RyaW5nJyAmJiB2YWwuY29uc3RydWN0b3IubmFtZS5zbGljZSgtNSkgPT09ICdBcnJheScpIHtcclxuICAgICAgICBpZiAocGFyZW50cy5sZW5ndGggPj0gY29uZmlnLmRlZXApIHtcclxuICAgICAgICAgIHJldHVybiAnW0FycmF5OicgKyB2YWwuY29uc3RydWN0b3IubmFtZSArICddJztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29weSA9IFtdO1xyXG4gICAgICAgICAgZm9yIChpID0gMCwgbCA9IHZhbC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICAgICAgY29weVtpXSA9IGRlY3ljbGVXYWxrZXIocGFyZW50cy5jb25jYXQoW3ZhbF0pLCBwYXRoLmNvbmNhdChpKSwgdmFsW2ldLCBjb25maWcpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIGNvcHk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChwYXJlbnRzLmxlbmd0aCA+PSBjb25maWcuZGVlcCkge1xyXG4gICAgICAgICAgcmV0dXJuICdbT2JqZWN0OicgKyAodmFsLmNvbnN0cnVjdG9yICYmIHZhbC5jb25zdHJ1Y3Rvci5uYW1lID8gdmFsLmNvbnN0cnVjdG9yLm5hbWUgOiAnT2JqZWN0JykgKyAnXSc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvcHkgPSB7fTtcclxuICAgICAgICAgIGZvciAoaSA9IDAsIGsgPSBPYmplY3Qua2V5cyh2YWwpLCBsID0gay5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICAgICAgY29weVtrW2ldXSA9IGRlY3ljbGVXYWxrZXIocGFyZW50cy5jb25jYXQoW3ZhbF0pLCBwYXRoLmNvbmNhdChba1tpXV0pLCB2YWxba1tpXV0sIGNvbmZpZyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gY29weTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicpIHtcclxuICAgIHJldHVybiBjb25maWcuZnVuY3Rpb25zID09PSB0cnVlID8gJ1tGdW5jdGlvbjonICsgdmFsLnRvU3RyaW5nKCkgKyAnXScgOiB1bmRlZmluZWQ7XHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiB2YWwudG9TdHJpbmcoKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7XHJcbiAgZGVDeWNsZXIsXHJcbiAgZGVDeWNsZWQsXHJcbiAgcmV2aXZlXHJcbn0iLCAiaW1wb3J0IGkxOG4gZnJvbSBcIi4uL2kxOG5cIjtcclxuaW1wb3J0IHV0aWxzIGZyb20gXCIuLi91dGlsc1wiO1xyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSB7eyBpMThuOiBzdHJpbmcgfCB7IFtsYW5nOiBzdHJpbmddOiB7IFtrOiBzdHJpbmddOiBzdHJpbmcgfSB9fX0gY2ZnIFxyXG4gKiBAcmV0dXJucyBcclxuICovXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBidWlsZEV4dGVuc2lvbkkxOE4oY2ZnKSB7XHJcbiAgaWYgKCFjZmc/LmkxOG4pIHJldHVybiBudWxsO1xyXG4gIGxldCBvdXQgPSB7XHJcbiAgICBfX2NhY2hlX186IHtcclxuICAgICAgbG9jYWxlSWRzOiBbXSxcclxuICAgICAgbG9jYWxpemF0aW9uczoge31cclxuICAgIH0sXHJcbiAgICBmb3JtYXQoa2V5LCAuLi5hcmdzKSB7XHJcbiAgICAgIHJldHVybiB1dGlscy5mb3JtYXQob3V0LmdldChrZXkpLCAuLi5hcmdzKTtcclxuICAgIH0sXHJcbiAgICBnZXQoa2V5KSB7XHJcbiAgICAgIGlmICh0eXBlb2YgY2ZnLmkxOG4gPT09IFwic3RyaW5nXCIpIGNoZWNrKCk7XHJcbiAgICAgIHJldHVybiBvdXQuX19jYWNoZV9fLmxvY2FsaXphdGlvbnNbb3V0LmxvY2FsZV0/LltrZXldXHJcbiAgICAgICAgfHwgb3V0Ll9fY2FjaGVfXy5sb2NhbGl6YXRpb25zLmRlZmF1bHQ/LltrZXldXHJcbiAgICAgICAgfHwgb3V0LmdldChrZXkpO1xyXG4gICAgfSxcclxuICAgIG1lc3NhZ2VzOiBuZXcgUHJveHkoe30sIHtcclxuICAgICAgZ2V0KF8sIHByb3ApIHtcclxuICAgICAgICByZXR1cm4gb3V0LmdldChwcm9wKTtcclxuICAgICAgfVxyXG4gICAgfSksXHJcbiAgfVxyXG4gIGFzeW5jIGZ1bmN0aW9uIGNoZWNrKCkge1xyXG4gICAgY29uc3QgbG9jYWxlID0gaTE4bi5sb2NhbGU7XHJcbiAgICBpZiAodHlwZW9mIGNmZy5pMThuID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgIGNvbnN0IEJBU0VfVVJMID0gY2ZnLmkxOG4uZW5kc1dpdGgoXCIvXCIpID8gY2ZnLmkxOG4uc2xpY2UoMCwgLTEpIDogY2ZnLmkxOG47XHJcbiAgICAgIGlmICghb3V0Ll9fY2FjaGVfXy5sb2NhbGVJZHMubGVuZ3RoKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIG91dC5fX2NhY2hlX18ubG9jYWxlSWRzID0gYXdhaXQgKGF3YWl0IGZldGNoKGAke0JBU0VfVVJMfS9sb2NhbGVzLmpzb25gLCBub1N0b3JlKSkuanNvbigpO1xyXG4gICAgICAgIH0gY2F0Y2ggeyB9XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIG91dC5fX2NhY2hlX18ubG9jYWxpemF0aW9ucy5kZWZhdWx0ID0gYXdhaXQgKGF3YWl0IGZldGNoKGAke0JBU0VfVVJMfS9kZWZhdWx0Lmpzb25gLCBub1N0b3JlKSkuanNvbigpO1xyXG4gICAgICAgIH0gY2F0Y2ggeyB9XHJcbiAgICAgIH1cclxuICAgICAgaWYgKFxyXG4gICAgICAgIG91dC5fX2NhY2hlX18ubG9jYWxlSWRzLmluY2x1ZGVzKGxvY2FsZSlcclxuICAgICAgICAmJiAhb3V0Ll9fY2FjaGVfXy5sb2NhbGl6YXRpb25zPy5bbG9jYWxlXVxyXG4gICAgICApIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgb3V0Ll9fY2FjaGVfXy5sb2NhbGl6YXRpb25zW2xvY2FsZV0gPSBhd2FpdCAoYXdhaXQgZmV0Y2goYCR7QkFTRV9VUkx9LyR7bG9jYWxlfS5qc29uYCwgbm9TdG9yZSkpLmpzb24oKTtcclxuICAgICAgICB9IGNhdGNoIHsgfTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgb3V0Ll9fY2FjaGVfXy5sb2NhbGVJZHMgPSBPYmplY3Qua2V5cyhjZmcuaTE4bik7XHJcbiAgICAgIG91dC5fX2NhY2hlX18ubG9jYWxpemF0aW9ucyA9IGNmZy5pMThuO1xyXG4gICAgfVxyXG4gIH1cclxuICBhd2FpdCBjaGVjaygpO1xyXG4gIHJldHVybiBvdXQ7XHJcbn0iLCAiaW1wb3J0IHsgQmFzaWNFdmVudEVtaXR0ZXIgfSBmcm9tIFwiLi4vLi4vbGliL0Jhc2ljRXZlbnRFbWl0dGVyLmpzXCI7XHJcbmltcG9ydCBkZXYgZnJvbSBcIi4uL2Rldi9pbmRleC5qc1wiO1xyXG5pbXBvcnQgaTE4biBmcm9tIFwiLi4vaTE4bi9pbmRleC5qc1wiO1xyXG5pbXBvcnQgbW9kdWxlcyBmcm9tIFwiLi4vbW9kdWxlcy9pbmRleC5qc1wiO1xyXG5pbXBvcnQgc3RvcmFnZSBmcm9tIFwiLi4vc3RvcmFnZS9pbmRleC5qc1wiO1xyXG5pbXBvcnQgeyBidWlsZEV4dGVuc2lvbkkxOE4gfSBmcm9tIFwiLi9pMThuLmpzXCI7XHJcbmltcG9ydCAqIGFzIG5lc3RzIGZyb20gXCJuZXN0c1wiO1xyXG5pbXBvcnQgZXZlbnRzIGZyb20gXCIuLi9ldmVudHMvaW5kZXguanNcIjtcclxuaW1wb3J0IHBhdGNoZXIgZnJvbSBcIi4uL3BhdGNoZXIvaW5kZXguanNcIjtcclxuaW1wb3J0IGZpbmRJblRyZWUgZnJvbSBcIi4uL3V0aWxzL3Jhdy9maW5kLWluLXRyZWUuanNcIjtcclxuaW1wb3J0IHdlYnNvY2tldCBmcm9tIFwiLi4vd2Vic29ja2V0L2luZGV4LmpzXCI7XHJcbmltcG9ydCB1aSBmcm9tIFwiLi4vdWkvaW5kZXguanNcIjtcclxuaW1wb3J0IHV0aWxzIGZyb20gXCIuLi91dGlscy9pbmRleC5qc1wiO1xyXG5pbXBvcnQgZG9tIGZyb20gXCIuLi9kb20vaW5kZXguanNcIjtcclxuXHJcbi8qKlxyXG4gKiBAcGFyYW0ge3sgbW9kZT86IFwiZGV2ZWxvcG1lbnRcIiB8IFwicHJvZHVjdGlvblwiLCBhcGk6IHsgcGF0Y2hlcj86IHN0cmluZyB8IGJvb2xlYW4sIHN0b3JhZ2U/OiBzdHJpbmcgfCBib29sZWFuLCBpMThuPzogc3RyaW5nIHwgYm9vbGVhbiwgZXZlbnRzPzogc3RyaW5nIHwgYm9vbGVhbiwgdXRpbHM/OiBzdHJpbmcgfCBib29sZWFuLCBkb20/OiBzdHJpbmcgfCBib29sZWFuLCB3ZWJzb2NrZXQ/OiBzdHJpbmcgfCBib29sZWFuLCB1aT86IHN0cmluZyB8IGJvb2xlYW4sIGRldj86IHN0cmluZyB8IGJvb2xlYW4sIG1vZHVsZXM6IHsgbm9kZTogeyBuYW1lOiBzdHJpbmcsIHJlYXNvbjogc3RyaW5nIH1bXSwgY29tbW9uOiB7IG5hbWU6IHN0cmluZywgcmVhc29uOiBzdHJpbmcgfVtdLCBjdXN0b206IHsgcmVhc29uOiBzdHJpbmcsIG5hbWU6IHN0cmluZywgbGF6eTogYm9vbGVhbiwgZmluZGVyOiB7IGZpbHRlcjogeyBleHBvcnQ6IGJvb2xlYW4sIGluOiBcInByb3BlcnRpZXNcIiB8IFwic3RyaW5nc1wiIHwgXCJwcm90b3R5cGVzXCIsIGJ5OiBbc3RyaW5nW10sIHN0cmluZ1tdP10gfSwgcGF0aDogeyBiZWZvcmU6IHN0cmluZyB8IHN0cmluZ1tdLCBhZnRlcjogc3RyaW5nIHwgc3RyaW5nW10gfSwgbWFwOiB7IFtrOiBzdHJpbmddOiBzdHJpbmdbXSB9IH0gfVtdIH0gfSwgYWJvdXQ6IHsgbmFtZTogc3RyaW5nIHwgeyBbazogc3RyaW5nXTogc3RyaW5nIH0sIGRlc2NyaXB0aW9uOiBzdHJpbmcgfCB7IFtrOiBzdHJpbmddOiBzdHJpbmcgfSwgc2x1Zzogc3RyaW5nIH0gfX0gbWFuaWZlc3QgXHJcbiAqL1xyXG5hc3luYyBmdW5jdGlvbiBidWlsZFBsdWdpbkFQSShtYW5pZmVzdCwgcGVyc2lzdEtleSkge1xyXG4gIGNvbnN0IGRldk1vZGUgPSBkZXYuZW5hYmxlZCB8fCBtYW5pZmVzdD8ubW9kZSA9PT0gXCJkZXZlbG9wbWVudFwiO1xyXG4gIGNvbnN0IHBlcnNpc3QgPSBhd2FpdCBzdG9yYWdlLmNyZWF0ZVBlcnNpc3ROZXN0KHBlcnNpc3RLZXkpO1xyXG4gIGNvbnN0IG91dCA9IHtcclxuICAgIG1vZHVsZXM6IHtcclxuICAgICAgX19jYWNoZV9fOiB7XHJcbiAgICAgICAgY29tbW9uOiB7fSxcclxuICAgICAgICBub2RlOiB7fSxcclxuICAgICAgICBjdXN0b206IHt9LFxyXG4gICAgICAgIGN1c3RvbUxhenk6IHt9XHJcbiAgICAgIH0sXHJcbiAgICAgIHJlcXVpcmUobmFtZSkge1xyXG4gICAgICAgIGlmICghZGV2TW9kZSkge1xyXG4gICAgICAgICAgaWYgKHR5cGVvZiBvdXQubW9kdWxlcy5fX2NhY2hlX18ubm9kZVtuYW1lXSAhPT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIG91dC5tb2R1bGVzLl9fY2FjaGVfXy5ub2RlW25hbWVdO1xyXG4gICAgICAgICAgaWYgKG1hbmlmZXN0Py5hcGk/Lm1vZHVsZXM/Lm5vZGU/LnNvbWU/LihpID0+IGkubmFtZSA9PT0gbmFtZSkpIHJldHVybiBvdXQubW9kdWxlcy5fX2NhY2hlX18ubm9kZVtuYW1lXSA9IG1vZHVsZXMucmVxdWlyZShuYW1lKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmV0dXJuIG1vZHVsZXMucmVxdWlyZShuYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgIH0sXHJcbiAgICAgIGNvbW1vbjogbmV3IFByb3h5KHt9LCB7XHJcbiAgICAgICAgZ2V0KF8sIHByb3ApIHtcclxuICAgICAgICAgIGlmICghZGV2TW9kZSkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIG91dC5tb2R1bGVzLl9fY2FjaGVfXy5jb21tb25bcHJvcF0gIT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBvdXQubW9kdWxlcy5fX2NhY2hlX18uY29tbW9uW3Byb3BdO1xyXG4gICAgICAgICAgICBpZiAobWFuaWZlc3Q/LmFwaT8ubW9kdWxlcz8uY29tbW9uPy5zb21lPy4oaSA9PiBpLm5hbWUgPT09IHByb3ApKSByZXR1cm4gb3V0Lm1vZHVsZXMuX19jYWNoZV9fLmNvbW1vbltwcm9wXSA9IG1vZHVsZXMuY29tbW9uW3Byb3BdO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG1vZHVsZXMuY29tbW9uW3Byb3BdO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSksXHJcbiAgICAgIGN1c3RvbTogbmV3IFByb3h5KHt9LCB7XHJcbiAgICAgICAgZ2V0KF8sIHByb3ApIHtcclxuICAgICAgICAgIGlmICh0eXBlb2Ygb3V0Lm1vZHVsZXMuX19jYWNoZV9fLmN1c3RvbVtwcm9wXSAhPT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIG91dC5tb2R1bGVzLl9fY2FjaGVfXy5jdXN0b21bcHJvcF07XHJcbiAgICAgICAgICBsZXQgZGF0YSA9IG1hbmlmZXN0Py5hcGk/Lm1vZHVsZXM/LmN1c3RvbT8uc29tZT8uKGkgPT4gaS5uYW1lID09PSBwcm9wKTtcclxuICAgICAgICAgIGlmICghZGF0YSkgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICBpZiAoZGF0YS5sYXp5KSB7XHJcbiAgICAgICAgICAgIGxldCBwcm9tID0gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICAgIGxldCByID0gYXdhaXQgbW9kdWxlcy53ZWJwYWNrLmxhenlGaW5kQnlGaW5kZXIoZGF0YS5maW5kZXIpO1xyXG4gICAgICAgICAgICAgIG91dC5tb2R1bGVzLl9fY2FjaGVfXy5jdXN0b21MYXp5W3Byb3BdID0gcjtcclxuICAgICAgICAgICAgICByZXNvbHZlKHIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgb3V0Lm1vZHVsZXMuX19jYWNoZV9fLmN1c3RvbVtwcm9wXSA9IHtcclxuICAgICAgICAgICAgICBnZXQoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvbTtcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIGdldCB2YWx1ZSgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBvdXQubW9kdWxlcy5fX2NhY2hlX18uY3VzdG9tTGF6eVtwcm9wXTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgdmFsdWUgPSBtb2R1bGVzLndlYnBhY2suZmluZEJ5RmluZGVyKGRhdGEuZmluZGVyKTtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlPy52YWx1ZSAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICAgICAgb3V0Lm1vZHVsZXMuX19jYWNoZV9fLmN1c3RvbVtwcm9wXSA9IHZhbHVlID8gT2JqZWN0LmFzc2lnbih2YWx1ZSwgeyB2YWx1ZSwgZ2V0KCkgeyByZXR1cm4gdmFsdWUgfSB9KSA6IG51bGw7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG91dC5tb2R1bGVzLl9fY2FjaGVfXy5jdXN0b21bcHJvcF0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gY2F0Y2gge1xyXG4gICAgICAgICAgICAgIG91dC5tb2R1bGVzLl9fY2FjaGVfXy5jdXN0b21bcHJvcF0gPSB2YWx1ZSA/IHsgdmFsdWUsIGdldCgpIHsgcmV0dXJuIHZhbHVlIH0gfSA6IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBvdXQubW9kdWxlcy5fX2NhY2hlX18uY3VzdG9tW3Byb3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgfSksXHJcbiAgICAgIGdldCBuYXRpdmUoKSB7XHJcbiAgICAgICAgaWYgKG1hbmlmZXN0Py5tb2R1bGVzPy5uYXRpdmUgfHwgZGV2TW9kZSkgcmV0dXJuIG1vZHVsZXMubmF0aXZlO1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIGV4dGVuc2lvbjoge1xyXG4gICAgICBtYW5pZmVzdCxcclxuICAgICAgcGVyc2lzdCxcclxuICAgICAgaTE4bjogYXdhaXQgYnVpbGRFeHRlbnNpb25JMThOKG1hbmlmZXN0KSxcclxuICAgICAgZXZlbnRzOiBuZXcgQmFzaWNFdmVudEVtaXR0ZXIoKSxcclxuICAgICAgc3Vic2NyaXB0aW9uczogW11cclxuICAgIH0sXHJcbiAgICBnZXQgaTE4bigpIHtcclxuICAgICAgaWYgKG1hbmlmZXN0Py5hcGk/LmkxOG4gfHwgZGV2TW9kZSkgcmV0dXJuIGkxOG47XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfSxcclxuICAgIGdldCBwYXRjaGVyKCkge1xyXG4gICAgICBpZiAobWFuaWZlc3Q/LmFwaT8ucGF0Y2hlciB8fCBkZXZNb2RlKSByZXR1cm4gcGF0Y2hlcjtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9LFxyXG4gICAgZ2V0IGV2ZW50cygpIHtcclxuICAgICAgaWYgKG1hbmlmZXN0Py5hcGk/LmV2ZW50cyB8fCBkZXZNb2RlKSByZXR1cm4gZXZlbnRzO1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH0sXHJcbiAgICBnZXQgc3RvcmFnZSgpIHtcclxuICAgICAgaWYgKG1hbmlmZXN0Py5hcGk/LnN0b3JhZ2UgfHwgZGV2TW9kZSkgcmV0dXJuIHN0b3JhZ2U7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfSxcclxuICAgIGdldCB3ZWJzb2NrZXQoKSB7XHJcbiAgICAgIGlmIChtYW5pZmVzdD8uYXBpPy53ZWJzb2NrZXQgfHwgZGV2TW9kZSkgcmV0dXJuIHdlYnNvY2tldDtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9LFxyXG4gICAgZ2V0IHVpKCkge1xyXG4gICAgICBpZiAobWFuaWZlc3Q/LmFwaT8udWkgfHwgZGV2TW9kZSkgcmV0dXJuIHVpO1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH0sXHJcbiAgICBnZXQgdXRpbHMoKSB7XHJcbiAgICAgIGlmIChtYW5pZmVzdD8uYXBpPy51dGlscyB8fCBkZXZNb2RlKSByZXR1cm4gdXRpbHM7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfSxcclxuICAgIGdldCBkb20oKSB7XHJcbiAgICAgIGlmIChtYW5pZmVzdD8uYXBpPy5kb20gfHwgZGV2TW9kZSkgcmV0dXJuIGRvbTtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9LFxyXG4gICAgZ2V0IGRldigpIHtcclxuICAgICAgaWYgKG1hbmlmZXN0Py5hcGk/LmRldiB8fCBkZXZNb2RlKSByZXR1cm4gZGV2O1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICByZXR1cm4gb3V0O1xyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93Q29uZmlybWF0aW9uTW9kYWwoKSB7XHJcblxyXG59XHJcblxyXG5jb25zdCBvdXQgPSB7XHJcbiAgX19jYWNoZV9fOiB7XHJcbiAgICBpbml0aWFsaXplZDogZmFsc2UsXHJcbiAgICBsb2FkZWQ6IG5lc3RzLm1ha2Uoe30pXHJcbiAgfSxcclxuICBzdG9yYWdlOiB7XHJcbiAgICAvKiogQHR5cGUge25lc3RzLk5lc3R9ICovXHJcbiAgICBpbnN0YWxsZWQ6IHt9XHJcbiAgfSxcclxuICBhc3luYyBpbml0KCkge1xyXG4gICAgaWYgKG91dC5fX2NhY2hlX18uaW5pdGlhbGl6ZWQpIHJldHVybjtcclxuICAgIG91dC5fX2NhY2hlX18uaW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG4gICAgb3V0LnN0b3JhZ2UuaW5zdGFsbGVkID0gYXdhaXQgc3RvcmFnZS5jcmVhdGVQZXJzaXN0TmVzdChcIkV4dGVuc2lvbnM7SW5zdGFsbGVkXCIpO1xyXG4gIH0sXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHVybCBcclxuICAgKi9cclxuICBhc3luYyBpbnN0YWxsKHVybCwgZGVmYXVsdENvbmZpZyA9IHt9KSB7XHJcbiAgICBpZiAoIW91dC5fX2NhY2hlX18uaW5pdGlhbGl6ZWQpIGF3YWl0IG91dC5pbml0KCk7XHJcbiAgICBpZiAodXJsLmVuZHNXaXRoKFwiL1wiKSkgdXJsID0gdXJsLnNsaWNlKDAsIC0xKTtcclxuICAgIGlmIChvdXQuc3RvcmFnZS5pbnN0YWxsZWQuZ2hvc3RbdXJsXSkgdGhyb3cgbmV3IEVycm9yKGBcIiR7dXJsfVwiIGV4dGVuc2lvbiBpcyBhbHJlYWR5IGluc3RhbGxlZC5gKTtcclxuXHJcbiAgICBsZXQgbWV0YVJlc3AgPSBhd2FpdCBmZXRjaChgJHt1cmx9L21hbmlmZXN0Lmpzb25gKTtcclxuICAgIGlmIChtZXRhUmVzcC5zdGF0dXMgIT09IDIwMCkgdGhyb3cgbmV3IEVycm9yKGBcIiR7dXJsfVwiIGV4dGVuc2lvbiBtYW5pZmVzdCBpcyBub3QgcmVzcG9uZGVkIHdpdGggMjAwIHN0YXR1cyBjb2RlLmApO1xyXG4gICAgbGV0IG1hbmlmZXN0ID0gYXdhaXQgbWV0YVJlc3AuanNvbigpO1xyXG5cclxuICAgIGxldCByZWFkbWVSZXNwID0gYXdhaXQgZmV0Y2goYCR7dXJsfS9yZWFkbWUubWRgKTtcclxuICAgIGxldCByZWFkbWUgPSByZWFkbWVSZXNwLnN0YXR1cyA9PT0gMjAwID8gYXdhaXQgcmVhZG1lUmVzcC50ZXh0KCkgOiBudWxsO1xyXG5cclxuICAgIC8vIFRPRE86IFNob3cgbW9kYWwgZm9yIHVzZXIgdG8gYWNjZXB0IHRoZSBleHRlbnNpb24gKHRlcm1zLCBwcml2YWN5LCBldGMuKVxyXG4gICAgYXdhaXQgc2hvd0NvbmZpcm1hdGlvbk1vZGFsKHtcclxuICAgICAgbWFuaWZlc3QsXHJcbiAgICAgIHJlYWRtZSxcclxuICAgICAgY29uZmlnOiB7XHJcbiAgICAgICAgYXV0b1VwZGF0ZTogdHJ1ZSxcclxuICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgIG9yZGVyOiAwLFxyXG4gICAgICAgIC4uLmRlZmF1bHRDb25maWdcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgbGV0IHNvdXJjZVJlc3AgPSBhd2FpdCBmZXRjaChgJHt1cmx9L3NvdXJjZS5qc2ApO1xyXG4gICAgaWYgKHNvdXJjZVJlc3Auc3RhdHVzICE9PSAyMDApIHRocm93IG5ldyBFcnJvcihgXCIke3VybH1cIiBleHRlbnNpb24gc291cmNlIGlzIG5vdCByZXNwb25kZWQgd2l0aCAyMDAgc3RhdHVzIGNvZGUuYCk7XHJcbiAgICBsZXQgc291cmNlID0gYXdhaXQgc291cmNlUmVzcC50ZXh0KCk7XHJcblxyXG4gICAgb3V0LnN0b3JhZ2UuaW5zdGFsbGVkLnN0b3JlW3VybF0gPSB7XHJcbiAgICAgIG1hbmlmZXN0LFxyXG4gICAgICBzb3VyY2UsXHJcbiAgICAgIHJlYWRtZSxcclxuICAgICAgY29uZmlnOiB7XHJcbiAgICAgICAgYXV0b1VwZGF0ZTogdHJ1ZSxcclxuICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgIG9yZGVyOiAwLFxyXG4gICAgICAgIC4uLmRlZmF1bHRDb25maWdcclxuICAgICAgfSxcclxuICAgICAgZXh0cmE6IHtcclxuICAgICAgICBsYXN0VXBkYXRlZEF0OiBEYXRlLm5vdygpXHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgYXdhaXQgb3V0LmxvYWQodXJsKTtcclxuICB9LFxyXG4gIGFzeW5jIHVwZGF0ZSh1cmwpIHtcclxuICAgIGlmICghb3V0Ll9fY2FjaGVfXy5pbml0aWFsaXplZCkgYXdhaXQgb3V0LmluaXQoKTtcclxuICAgIGlmICghb3V0LnN0b3JhZ2UuaW5zdGFsbGVkLmdob3N0W3VybF0pIHRocm93IG5ldyBFcnJvcihgXCIke3VybH1cIiBleHRlbnNpb24gaXMgbm90IGluc3RhbGxlZC5gKTtcclxuICAgIGlmIChvdXQuX19jYWNoZV9fLmxvYWRlZC5naG9zdFt1cmxdKSB0aHJvdyBuZXcgRXJyb3IoYFwiJHt1cmx9XCIgZXh0ZW5zaW9uIGlzIGxvYWRlZC4gUGxlYXNlIHVubG9hZCBpdCBmaXJzdC5gKTtcclxuXHJcbiAgICBsZXQgZGF0YSA9IG91dC5zdG9yYWdlLmluc3RhbGxlZC5naG9zdFt1cmxdO1xyXG5cclxuICAgIGxldCBtZXRhUmVzcCA9IGF3YWl0IGZldGNoKGAke3VybH0vbWFuaWZlc3QuanNvbmApO1xyXG4gICAgaWYgKG1ldGFSZXNwLnN0YXR1cyAhPT0gMjAwKSB0aHJvdyBuZXcgRXJyb3IoYFwiJHt1cmx9XCIgZXh0ZW5zaW9uIG1hbmlmZXN0IGlzIG5vdCByZXNwb25kZWQgd2l0aCAyMDAgc3RhdHVzIGNvZGUuYCk7XHJcbiAgICBsZXQgbWFuaWZlc3QgPSBhd2FpdCBtZXRhUmVzcC5qc29uKCk7XHJcblxyXG4gICAgaWYgKGRhdGEubWFuaWZlc3QuaGFzaCA9PT0gbWFuaWZlc3QuaGFzaCkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgIGxldCByZWFkbWVSZXNwID0gYXdhaXQgZmV0Y2goYCR7dXJsfS9yZWFkbWUubWRgKTtcclxuICAgIGxldCByZWFkbWUgPSByZWFkbWVSZXNwLnN0YXR1cyA9PT0gMjAwID8gYXdhaXQgcmVhZG1lUmVzcC50ZXh0KCkgOiBudWxsO1xyXG5cclxuICAgIGxldCBzb3VyY2VSZXNwID0gYXdhaXQgZmV0Y2goYCR7dXJsfS9zb3VyY2UuanNgKTtcclxuICAgIGlmIChzb3VyY2VSZXNwLnN0YXR1cyAhPT0gMjAwKSB0aHJvdyBuZXcgRXJyb3IoYFwiJHt1cmx9XCIgZXh0ZW5zaW9uIHNvdXJjZSBpcyBub3QgcmVzcG9uZGVkIHdpdGggMjAwIHN0YXR1cyBjb2RlLmApO1xyXG4gICAgbGV0IHNvdXJjZSA9IGF3YWl0IHNvdXJjZVJlc3AudGV4dCgpO1xyXG5cclxuICAgIHV0LnN0b3JhZ2UuaW5zdGFsbGVkLnN0b3JlW3VybF0gPSB7XHJcbiAgICAgIG1hbmlmZXN0LFxyXG4gICAgICBzb3VyY2UsXHJcbiAgICAgIHJlYWRtZSxcclxuICAgICAgY29uZmlnOiBkYXRhLmNvbmZpZyxcclxuICAgICAgZXh0cmE6IHtcclxuICAgICAgICBsYXN0VXBkYXRlZEF0OiBEYXRlLm5vdygpXHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfSxcclxuICBhc3luYyB1bmluc3RhbGwodXJsKSB7XHJcbiAgICBpZiAoIW91dC5fX2NhY2hlX18uaW5pdGlhbGl6ZWQpIGF3YWl0IG91dC5pbml0KCk7XHJcbiAgICBpZiAoIW91dC5zdG9yYWdlLmluc3RhbGxlZC5naG9zdFt1cmxdKSB0aHJvdyBuZXcgRXJyb3IoYFwiJHt1cmx9XCIgZXh0ZW5zaW9uIGlzIG5vdCBpbnN0YWxsZWQuYCk7XHJcblxyXG4gICAgZGVsZXRlIG91dC5zdG9yYWdlLmluc3RhbGxlZC5zdG9yZVt1cmxdO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGF3YWl0IG91dC51bmxvYWQodXJsKTtcclxuICAgIH0gY2F0Y2ggeyB9XHJcbiAgfSxcclxuICBhc3luYyBsb2FkKHVybCkge1xyXG4gICAgaWYgKCFvdXQuX19jYWNoZV9fLmluaXRpYWxpemVkKSBhd2FpdCBvdXQuaW5pdCgpO1xyXG4gICAgaWYgKCFvdXQuc3RvcmFnZS5pbnN0YWxsZWQuZ2hvc3RbdXJsXSkgdGhyb3cgbmV3IEVycm9yKGBcIiR7dXJsfVwiIGV4dGVuc2lvbiBpcyBub3QgaW5zdGFsbGVkLmApO1xyXG4gICAgbGV0IGRhdGEgPSBvdXQuc3RvcmFnZS5pbnN0YWxsZWQuZ2hvc3RbdXJsXTtcclxuXHJcbiAgICBpZiAob3V0Ll9fY2FjaGVfXy5sb2FkZWQuZ2hvc3RbdXJsXSkgdGhyb3cgbmV3IEVycm9yKGBcIiR7dXJsfVwiIGV4dGVuc2lvbiBpcyBhbHJlYWR5IGxvYWRlZC5gKTtcclxuXHJcbiAgICBhd2FpdCBvdXQubG9hZGVyLmxvYWQodXJsLCBkYXRhKTtcclxuICB9LFxyXG4gIGFzeW5jIHVubG9hZCh1cmwpIHtcclxuICAgIGlmICghb3V0Ll9fY2FjaGVfXy5pbml0aWFsaXplZCkgYXdhaXQgb3V0LmluaXQoKTtcclxuICAgIGlmICghb3V0LnN0b3JhZ2UuaW5zdGFsbGVkLmdob3N0W3VybF0pIHRocm93IG5ldyBFcnJvcihgXCIke3VybH1cIiBleHRlbnNpb24gaXMgbm90IGluc3RhbGxlZC5gKTtcclxuXHJcbiAgICBpZiAoIW91dC5fX2NhY2hlX18ubG9hZGVkLmdob3N0W3VybF0pIHRocm93IG5ldyBFcnJvcihgXCIke3VybH1cIiBleHRlbnNpb24gaXMgbm90IGxvYWRlZC5gKTtcclxuXHJcbiAgICBhd2FpdCBvdXQubG9hZGVyLnVubG9hZCh1cmwpO1xyXG4gIH0sXHJcbiAgZXZhbHVhdGUoc291cmNlLCBhcGkpIHtcclxuICAgIGNvbnN0ICRhY29yZCA9IGFwaTtcclxuICAgIHJldHVybiBldmFsKHNvdXJjZSk7XHJcbiAgfSxcclxuICBhc3luYyBsb2FkQWxsKCkge1xyXG4gICAgaWYgKCFvdXQuX19jYWNoZV9fLmluaXRpYWxpemVkKSBhd2FpdCBvdXQuaW5pdCgpO1xyXG4gICAgcmV0dXJuIFByb21pc2UuYWxsKE9iamVjdC5lbnRyaWVzKG91dC5zdG9yYWdlLmluc3RhbGxlZC5naG9zdCkuc29ydCgoWywgYV0sIFssIGJdKSA9PiBiLmNvbmZpZy5vcmRlciAtIGEuY29uZmlnLm9yZGVyKS5tYXAoKFt1cmxdKSA9PiBvdXQubG9hZCh1cmwpKSk7XHJcbiAgfSxcclxuICBhc3luYyB1bmxvYWRBbGwoKSB7XHJcbiAgICBpZiAoIW91dC5fX2NhY2hlX18uaW5pdGlhbGl6ZWQpIGF3YWl0IG91dC5pbml0KCk7XHJcbiAgICByZXR1cm4gUHJvbWlzZS5hbGwoT2JqZWN0LmtleXMob3V0Ll9fY2FjaGVfXy5sb2FkZWQuZ2hvc3QpLm1hcCh1cmwgPT4gb3V0LnVubG9hZCh1cmwpKSk7XHJcbiAgfSxcclxuICBnZXQodXJsKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBsb2FkZWQ6IG91dC5fX2NhY2hlX18ubG9hZGVkLmdob3N0W3VybF0sXHJcbiAgICAgIGluc3RhbGxlZDogb3V0LnN0b3JhZ2UuaW5zdGFsbGVkLmdob3N0W3VybF1cclxuICAgIH07XHJcbiAgfSxcclxuICBsb2FkZXI6IHtcclxuICAgIGFzeW5jIGxvYWQoaWQsIGRhdGEpIHtcclxuICAgICAgaWYgKGRhdGEubWFuaWZlc3QudHlwZSA9PT0gJ3BsdWdpbicpIHtcclxuICAgICAgICBsZXQgYXBpID0gYXdhaXQgYnVpbGRQbHVnaW5BUEkoZGF0YS5tYW5pZmVzdCwgYEV4dGVuc2lvbjtQZXJzaXN0OyR7aWR9YCk7XHJcbiAgICAgICAgaWYgKGFwaS5leHRlbnNpb24ucGVyc2lzdC5naG9zdC5zZXR0aW5ncyA9PT0gdW5kZWZpbmVkKSBhcGkuZXh0ZW5zaW9uLnBlcnNpc3Quc3RvcmUuc2V0dGluZ3MgPSB7fTtcclxuICAgICAgICBmaW5kSW5UcmVlKGRhdGEubWFuaWZlc3QuY29uZmlnLCAoaSkgPT4gaS5pZCwgeyBhbGw6IHRydWUgfSkuZm9yRWFjaChcclxuICAgICAgICAgIChpKSA9PiB7XHJcbiAgICAgICAgICAgIGFwaS5leHRlbnNpb24ucGVyc2lzdC5zdG9yZS5zZXR0aW5nc1tpLmlkXSA/Pz0gaS5kZWZhdWx0O1xyXG4gICAgICAgICAgICBpZiAoaS5oYXNPd25Qcm9wZXJ0eShcInZhbHVlXCIpKSBpLnZhbHVlID8/PSBhcGkuZXh0ZW5zaW9uLnBlcnNpc3Quc3RvcmUuc2V0dGluZ3NbaS5pZF07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgbGV0IGV2YWx1YXRlZCA9IG91dC5ldmFsdWF0ZShkYXRhLnNvdXJjZSwgYXBpKTtcclxuICAgICAgICBhd2FpdCBldmFsdWF0ZWQ/LmxvYWQ/LigpO1xyXG4gICAgICAgIGNvbnN0IG9mZkNvbmZpZ0xpc3RlbmVyID1cclxuICAgICAgICAgIGV2ZW50cy5vbihcImV4dGVuc2lvbi1jb25maWctaW50ZXJhY3Rpb25cIiwgKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgaWYgKGRhdGEuZXh0ZW5zaW9uICE9PSBpZCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5pdGVtLmlkKSB7XHJcbiAgICAgICAgICAgICAgYXBpLmV4dGVuc2lvbi5wZXJzaXN0LnN0b3JlLnNldHRpbmdzW2RhdGEuaXRlbS5pZF0gPSBkYXRhLml0ZW0udmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZXZhbHVhdGVkPy5jb25maWc/Lih7XHJcbiAgICAgICAgICAgICAgaXRlbTogZGF0YS5pdGVtLFxyXG4gICAgICAgICAgICAgIGRhdGE6IGRhdGEuZGF0YSxcclxuICAgICAgICAgICAgICBnZXRJdGVtKGl0ZW1JZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZpbmRJblRyZWUoZGF0YS5tYW5pZmVzdC5jb25maWcsIChpKSA9PiBpLmlkID09PSBpdGVtSWQpO1xyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgZ2V0SXRlbXMoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmluZEluVHJlZShkYXRhLm1hbmlmZXN0LmNvbmZpZywgKGkpID0+IGkuaWQsIHsgYWxsOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgc2F2ZSgpIHtcclxuICAgICAgICAgICAgICAgIGlmICghZGF0YS5pdGVtLmlkKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBhcGkuZXh0ZW5zaW9uLnBlcnNpc3Quc3RvcmUuc2V0dGluZ3NbZGF0YS5pdGVtLmlkXSA9IGRhdGEuaXRlbS52YWx1ZTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICBmdW5jdGlvbiB1bmxvYWQoKSB7XHJcbiAgICAgICAgICBvZmZDb25maWdMaXN0ZW5lcigpO1xyXG4gICAgICAgICAgYXBpLmV4dGVuc2lvbi5zdWJzY3JpcHRpb25zLmZvckVhY2goaSA9PiB7IGlmICh0eXBlb2YgaSA9PT0gXCJmdW5jdGlvblwiKSBpKCk7IH0pO1xyXG4gICAgICAgICAgYXBpLmV4dGVuc2lvbi5ldmVudHMuZW1pdChcInVubG9hZFwiKTtcclxuICAgICAgICAgIGV2YWx1YXRlZD8udW5sb2FkPy4oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgb3V0Ll9fY2FjaGVfXy5sb2FkZWQuc3RvcmVbaWRdID0geyBldmFsdWF0ZWQsIGFwaSwgdW5sb2FkIH07XHJcbiAgICAgICAgcmV0dXJuIHsgZXZhbHVhdGVkLCBhcGksIHVubG9hZCB9O1xyXG4gICAgICB9IGVsc2UgaWYgKGRhdGEubWFuaWZlc3QudHlwZSA9PT0gJ3RoZW1lJykge1xyXG4gICAgICAgIGxldCBldmFsdWF0ZWQgPSBvdXQuZXZhbHVhdGUoZGF0YS5zb3VyY2UsIG51bGwpO1xyXG4gICAgICAgIGNvbnN0IHBlcnNpc3QgPSBhd2FpdCBzdG9yYWdlLmNyZWF0ZVBlcnNpc3ROZXN0KGBFeHRlbnNpb247UGVyc2lzdDske2lkfWApO1xyXG4gICAgICAgIGlmIChwZXJzaXN0Lmdob3N0LnNldHRpbmdzID09PSB1bmRlZmluZWQpIHBlcnNpc3Quc3RvcmUuc2V0dGluZ3MgPSB7fTtcclxuICAgICAgICBmaW5kSW5UcmVlKGRhdGEubWFuaWZlc3QuY29uZmlnLCAoaSkgPT4gaS5pZCwgeyBhbGw6IHRydWUgfSkuZm9yRWFjaChcclxuICAgICAgICAgIChpKSA9PiB7XHJcbiAgICAgICAgICAgIHBlcnNpc3Quc3RvcmUuc2V0dGluZ3NbaS5pZF0gPz89IGkuZGVmYXVsdDtcclxuICAgICAgICAgICAgaWYgKGkuaGFzT3duUHJvcGVydHkoXCJ2YWx1ZVwiKSkgaS52YWx1ZSA/Pz0gcGVyc2lzdC5zdG9yZS5zZXR0aW5nc1tpLmlkXTtcclxuICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgICAgIGxldCBjc3NUZXh0ID0gZXZhbHVhdGVkKCk7XHJcbiAgICAgICAgbGV0IGluamVjdGVkUmVzID0gcGF0Y2hlci5pbmplY3RDU1MoY3NzVGV4dCwgcGVyc2lzdC5naG9zdC5zZXR0aW5ncyk7XHJcblxyXG4gICAgICAgIGNvbnN0IG9mZkNvbmZpZ0xpc3RlbmVyID1cclxuICAgICAgICAgIGV2ZW50cy5vbihcImV4dGVuc2lvbi1jb25maWctaW50ZXJhY3Rpb25cIiwgKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgaWYgKGRhdGEuZXh0ZW5zaW9uICE9PSBpZCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBpZiAoIWRhdGEuY29uZmlnLmlkKSByZXR1cm47XHJcbiAgICAgICAgICAgIHBlcnNpc3Quc3RvcmUuc2V0dGluZ3NbZGF0YS5jb25maWcuaWRdID0gZGF0YS5kYXRhLnZhbHVlO1xyXG4gICAgICAgICAgICBpbmplY3RlZFJlcyhwZXJzaXN0Lmdob3N0LnNldHRpbmdzKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIGZ1bmN0aW9uIHVubG9hZCgpIHtcclxuICAgICAgICAgIG9mZkNvbmZpZ0xpc3RlbmVyKCk7XHJcbiAgICAgICAgICBpbmplY3RlZFJlcygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb3V0Ll9fY2FjaGVfXy5sb2FkZWQuc3RvcmVbaWRdID0geyBldmFsdWF0ZWQsIHVubG9hZCB9O1xyXG4gICAgICAgIHJldHVybiB7IGV2YWx1YXRlZCwgdW5sb2FkIH07XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICB1bmxvYWQoaWQpIHtcclxuICAgICAgb3V0Ll9fY2FjaGVfXy5sb2FkZWQuZ2hvc3Q/LltpZF0/LnVubG9hZD8uKCk7XHJcbiAgICAgIGRlbGV0ZSBvdXQuX19jYWNoZV9fLmxvYWRlZC5zdG9yZVtpZF07XHJcbiAgICB9XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgb3V0OyIsICJpbXBvcnQgeyB3YWl0VW50aWxDb25uZWN0aW9uT3BlbiB9IGZyb20gXCIuLi8uLi9vdGhlci91dGlscy5qc1wiO1xyXG5pbXBvcnQgY29tbW9uIGZyb20gXCIuLi9tb2R1bGVzL2NvbW1vbi5qc1wiO1xyXG5pbXBvcnQgcGF0Y2hlciBmcm9tIFwiLi4vcGF0Y2hlci9pbmRleC5qc1wiO1xyXG5cclxuY29uc3Qgc29ja2V0cyA9IG5ldyBTZXQoKTtcclxuY29uc3QgaGFuZGxlcnMgPSBuZXcgTWFwKCk7XHJcblxyXG53YWl0VW50aWxDb25uZWN0aW9uT3BlbigpLnRoZW4oKCkgPT4ge1xyXG4gIHBhdGNoZXIuaW5zdGVhZChcclxuICAgIFwiaGFuZGxlQ29ubmVjdGlvblwiLFxyXG4gICAgY29tbW9uLldlYlNvY2tldCxcclxuICAgIChhcmdzLCBvcmlnKSA9PiB7XHJcbiAgICAgIGNvbnN0IHdzID0gYXJnc1swXTtcclxuICAgICAgaWYgKHdzLnVwZ3JhZGVSZXEoKS51cmwgIT09IFwiL2Fjb3JkXCIpIHJldHVybiBvcmlnKC4uLmFyZ3MpO1xyXG5cclxuICAgICAgc29ja2V0cy5hZGQod3MpO1xyXG5cclxuICAgICAgd3Mub24oXCJtZXNzYWdlXCIsIGFzeW5jIChtc2cpID0+IHtcclxuICAgICAgICBsZXQganNvbjtcclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIGpzb24gPSBKU09OLnBhcnNlKG1zZyk7XHJcbiAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoanNvbikgfHwganNvbi5sZW5ndGggPCAxIHx8IGpzb24ubGVuZ3RoID4gMylcclxuICAgICAgICAgICAgdGhyb3cgXCJBcnJheSBleHBlY3RlZCBhcyBtZXNzYWdlLlwiO1xyXG4gICAgICAgICAgaWYgKHR5cGVvZiBqc29uWzBdICE9IFwic3RyaW5nXCIpIHRocm93IFwiQXJyYXlbMF0gbmVlZHMgdG8gYmUgc3RyaW5nLlwiO1xyXG4gICAgICAgICAgaWYgKHR5cGVvZiBqc29uWzFdICE9IFwic3RyaW5nXCIpIHRocm93IFwiQXJyYXlbMV0gbmVlZHMgdG8gYmUgc3RyaW5nLlwiO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgd3Muc2VuZChcclxuICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoW1xyXG4gICAgICAgICAgICAgIG51bGwsXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgb2s6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgZXJyb3I6IGAke2Vycn1gLFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIF0pXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgW2V2ZW50SWQsIGV2ZW50TmFtZSwgZXZlbnREYXRhXSA9IGpzb247XHJcblxyXG4gICAgICAgIGNvbnN0IGhhbmRsZXIgPSBoYW5kbGVycy5nZXQoZXZlbnROYW1lKTtcclxuXHJcbiAgICAgICAgaWYgKCFoYW5kbGVyKVxyXG4gICAgICAgICAgcmV0dXJuIHdzLnNlbmQoXHJcbiAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KFtcclxuICAgICAgICAgICAgICBldmVudElkLFxyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG9rOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGVycm9yOiBgVW5hYmxlIHRvIGZpbmQgaGFuZGxlci5gLFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIF0pXHJcbiAgICAgICAgICApO1xyXG5cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgbGV0IHJlc3BvbnNlID0gYXdhaXQgaGFuZGxlcihldmVudERhdGEpO1xyXG4gICAgICAgICAgd3Muc2VuZChcclxuICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoW1xyXG4gICAgICAgICAgICAgIGV2ZW50SWQsXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgb2s6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiByZXNwb25zZSxcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBdKVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgIHdzLnNlbmQoXHJcbiAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KFtcclxuICAgICAgICAgICAgICBldmVudElkLFxyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG9rOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGVycm9yOiBgJHtlcnJ9YCxcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBdKVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgd3Mub24oXCJjbG9zZVwiLCAoKSA9PiBzb2NrZXRzLmRlbGV0ZSh3cykpO1xyXG4gICAgfVxyXG4gICk7XHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gc2V0KGV2ZW50TmFtZSwgY2FsbGJhY2spIHtcclxuICBpZiAodHlwZW9mIGV2ZW50TmFtZSAhPSBcInN0cmluZ1wiKVxyXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiRXZlbnROYW1lIG5lZWRzIHRvIGJlIGEgc3RyaW5nLlwiKTtcclxuICBpZiAodHlwZW9mIGNhbGxiYWNrICE9IFwiZnVuY3Rpb25cIilcclxuICAgIHRocm93IG5ldyBFcnJvcihcIkNhbGxiYWNrIG5lZWRzIHRvIGJlIGEgZnVuY3Rpb24uXCIpO1xyXG4gIGlmIChoYW5kbGVycy5oYXMoZXZlbnROYW1lKSlcclxuICAgIHRocm93IG5ldyBFcnJvcihcIkV2ZW50TmFtZSBhbHJlYWR5IGluIHVzZS5cIik7XHJcbiAgaGFuZGxlcnMuc2V0KGV2ZW50TmFtZSwgY2FsbGJhY2spO1xyXG4gIHJldHVybiAoKSA9PiB7XHJcbiAgICBoYW5kbGVycy5kZWxldGUoZXZlbnROYW1lKTtcclxuICB9O1xyXG59XHJcbmZ1bmN0aW9uIHRyaWdnZXIoZXZlbnROYW1lLCAuLi5hcmdzKSB7XHJcbiAgaWYgKCFzb2NrZXRFdmVudHMuaGFzKGV2ZW50TmFtZSkpXHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmFibGUgdG8gZmluZCBoYW5kbGVyIVwiKTtcclxuICByZXR1cm4gc29ja2V0RXZlbnRzLmdldChldmVudE5hbWUpKC4uLmFyZ3MpO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgc2V0LFxyXG4gIHRyaWdnZXJcclxufVxyXG5cclxuIiwgImV4cG9ydCBkZWZhdWx0IGBcbi5hY29yZC0tbGF5ZXItY29udGFpbmVyey0tdG9wLW9mZnNldDogMHB4O3dpZHRoOjEwMHZ3O2hlaWdodDpjYWxjKDEwMHZoIC0gdmFyKC0tdG9wLW9mZnNldCkpO3otaW5kZXg6OTk5OTk5OTtwb2ludGVyLWV2ZW50czpub25lO3Bvc2l0aW9uOmFic29sdXRlO3RvcDp2YXIoLS10b3Atb2Zmc2V0KTtsZWZ0OjBweH0uYWNvcmQtLWxheWVyLWNvbnRhaW5lciAqe3otaW5kZXg6OTk5OTk5OTk5OTk5OTl9LmFjb3JkLS10b29sdGlwLWxheWVye29wYWNpdHk6MDt0cmFuc2l0aW9uOjUwbXMgbGluZWFyIG9wYWNpdHk7cG9zaXRpb246YWJzb2x1dGU7cG9pbnRlci1ldmVudHM6bm9uZX0uYWNvcmQtLXRvb2x0aXAtbGF5ZXIudmlzaWJsZXtvcGFjaXR5OjE7cG9pbnRlci1ldmVudHM6YWxsfS5hY29yZC0tdG9vbHRpcC52ZXJ0aWNhbHt0cmFuc2Zvcm06dHJhbnNsYXRlWCgtNTAlKX0uYWNvcmQtLXRvb2x0aXAuaG9yaXpvbnRhbHt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtNTAlKX0uYWNvcmQtLXRvYXN0cy1jb250YWluZXJ7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1lbmQ7ZmxleC1kaXJlY3Rpb246Y29sdW1uO3dpZHRoOjEwMHZ3O2hlaWdodDpjYWxjKDEwMHZoIC0gdmFyKC0tdG9wLW9mZnNldCkpO3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6MDtwb2ludGVyLWV2ZW50czpub25lO3BhZGRpbmctYm90dG9tOjMycHh9LmFjb3JkLS10b2FzdHMtY29udGFpbmVyIC5hY29yZC0tdG9hc3R7dHJhbnNpdGlvbjp0cmFuc2Zvcm0gMjUwbXMgZWFzZS1pbi1vdXQsb3BhY2l0eSAyNTBtcyBlYXNlLWluLW91dDtkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO3BvaW50ZXItZXZlbnRzOm5vbmU7Ym9yZGVyLXJhZGl1czo0cHg7cGFkZGluZzo4cHg7Ym94LXNoYWRvdzowcHggMnB4IDhweCByZ2JhKDAsMCwwLC4yNSk7b3BhY2l0eToxO2dhcDo4cHg7Zm9udC1zaXplOjE0cHg7bWFyZ2luOjRweH0uYWNvcmQtLXRvYXN0cy1jb250YWluZXIgLmFjb3JkLS10b2FzdCBzdmd7d2lkdGg6MTZweDtoZWlnaHQ6MTZweH0uYWNvcmQtLXRvYXN0cy1jb250YWluZXIgLmFjb3JkLS10b2FzdC5jbGlja2FibGV7Y3Vyc29yOnBvaW50ZXI7cG9pbnRlci1ldmVudHM6YWxsfS5hY29yZC0tdG9hc3RzLWNvbnRhaW5lciAuYWNvcmQtLXRvYXN0LmNsb3Npbmd7b3BhY2l0eTowO3RyYW5zZm9ybTp0cmFuc2xhdGUoMCwgLTUwcHgpfS5hY29yZC0tdG9hc3RzLWNvbnRhaW5lciAuYWNvcmQtLXRvYXN0LmhpZGRlbntvcGFjaXR5OjA7dHJhbnNmb3JtOnRyYW5zbGF0ZSgwLCA1MHB4KX0uYWNvcmQtLXRvYXN0cy1jb250YWluZXIgLmFjb3JkLS10b2FzdC5zdHlsZS1pbmZve2JhY2tncm91bmQtY29sb3I6IzRhOGZlMTtjb2xvcjojZjVmNWY1fS5hY29yZC0tdG9hc3RzLWNvbnRhaW5lciAuYWNvcmQtLXRvYXN0LnN0eWxlLXdhcm5pbmd7YmFja2dyb3VuZC1jb2xvcjojZmFhODFhO2NvbG9yOiMwMDB9LmFjb3JkLS10b2FzdHMtY29udGFpbmVyIC5hY29yZC0tdG9hc3Quc3R5bGUtZXJyb3J7YmFja2dyb3VuZC1jb2xvcjojZWQ0MjQ1O2NvbG9yOiMwMDB9LmFjb3JkLS10b2FzdHMtY29udGFpbmVyIC5hY29yZC0tdG9hc3Quc3R5bGUtc3VjY2Vzc3tiYWNrZ3JvdW5kLWNvbG9yOiMzYmE1NWQ7Y29sb3I6I2Y1ZjVmNX0uYWNvcmQtLXRvYXN0cy1jb250YWluZXIgLmFjb3JkLS10b2FzdC5zdHlsZS1kZWZhdWx0e2JhY2tncm91bmQtY29sb3I6I2Y1ZjVmNTtjb2xvcjojMDAwfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVye3dpZHRoOjEwMHZ3O2hlaWdodDpjYWxjKDEwMHZoIC0gdmFyKC0tdG9wLW9mZnNldCkpO2Rpc3BsYXk6ZmxleDtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtsZWZ0OjA7cG9pbnRlci1ldmVudHM6bm9uZX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllciAuYWNvcmQtLW5vdGlmaWNhdGlvbntkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1uO3BvaW50ZXItZXZlbnRzOmFsbDt0cmFuc2l0aW9uOnRyYW5zZm9ybSAyNTBtcyBlYXNlLWluLW91dCxvcGFjaXR5IDI1MG1zIGVhc2UtaW4tb3V0O21hcmdpbjo0cHg7YmFja2Ryb3AtZmlsdGVyOmJsdXIoMTZweCkgYnJpZ2h0bmVzcygwLjc1KTstd2Via2l0LWFwcC1yZWdpb246bm8tZHJhZzstLWFuaW1hdGlvbi1zaXplOiA1MHB4fS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyIC5hY29yZC0tbm90aWZpY2F0aW9uLmhpZGRlbiwuYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllciAuYWNvcmQtLW5vdGlmaWNhdGlvbi5jbG9zaW5ne29wYWNpdHk6MH0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllciAuYWNvcmQtLW5vdGlmaWNhdGlvbj4uY29udGFpbmVye2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47cGFkZGluZzo4cHg7Y29sb3I6I2ZmZjttaW4td2lkdGg6MjUwcHh9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24+LmNvbnRhaW5lcj4uY2xvc2V7d2lkdGg6MjRweDtoZWlnaHQ6MjRweDtjb2xvcjojZmZmO29wYWNpdHk6LjU7Y3Vyc29yOnBvaW50ZXI7bWFyZ2luLWxlZnQ6OHB4O3otaW5kZXg6OTk5OTk5OTk5fS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyIC5hY29yZC0tbm90aWZpY2F0aW9uPi5jb250YWluZXI+LmNsb3NlLmhpZGRlbntkaXNwbGF5Om5vbmV9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24+LnByb2dyZXNzLWNvbnRhaW5lcnt3aWR0aDoxMDAlO2hlaWdodDo1cHh9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24+LnByb2dyZXNzLWNvbnRhaW5lcj4ucHJvZ3Jlc3N7d2lkdGg6MCU7aGVpZ2h0OjVweDt0cmFuc2l0aW9uOndpZHRoIHZhcigtLWR1cmF0aW9uKSBsaW5lYXI7YmFja2dyb3VuZC1jb2xvcjp2YXIoLS1iYXItY29sb3IpfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyIC5hY29yZC0tbm90aWZpY2F0aW9uPi5wcm9ncmVzcy1jb250YWluZXI+LnByb2dyZXNzLnByb2dyZXNzaW5ne3dpZHRoOjEwMCV9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24uc3R5bGUtaW5mb3stLWJhci1jb2xvcjogIzRhOGZlMX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllciAuYWNvcmQtLW5vdGlmaWNhdGlvbi5zdHlsZS13YXJuaW5ney0tYmFyLWNvbG9yOiAjZmFhODFhfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyIC5hY29yZC0tbm90aWZpY2F0aW9uLnN0eWxlLWVycm9yey0tYmFyLWNvbG9yOiAjZWQ0MjQ1fS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyIC5hY29yZC0tbm90aWZpY2F0aW9uLnN0eWxlLXN1Y2Nlc3N7LS1iYXItY29sb3I6ICMzYmE1NWR9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24uc3R5bGUtZGVmYXVsdHstLWJhci1jb2xvcjogd2hpdGVzbW9rZX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci50b3AtcmlnaHR7anVzdGlmeS1jb250ZW50OmZsZXgtZW5kO2FsaWduLWl0ZW1zOmZsZXgtc3RhcnR9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIudG9wLXJpZ2h0IC5hY29yZC0tbm90aWZpY2F0aW9uLmhpZGRlbnt0cmFuc2Zvcm06dHJhbnNsYXRlKDAsIGNhbGModmFyKC0tYW5pbWF0aW9uLXNpemUpICogLTEpKX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci50b3AtcmlnaHQgLmFjb3JkLS1ub3RpZmljYXRpb24uY2xvc2luZ3t0cmFuc2Zvcm06dHJhbnNsYXRlKDAsIHZhcigtLWFuaW1hdGlvbi1zaXplKSl9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIudG9wLWxlZnR7anVzdGlmeS1jb250ZW50OmZsZXgtc3RhcnQ7YWxpZ24taXRlbXM6ZmxleC1zdGFydH0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci50b3AtbGVmdCAuYWNvcmQtLW5vdGlmaWNhdGlvbi5oaWRkZW57dHJhbnNmb3JtOnRyYW5zbGF0ZSgwLCBjYWxjKHZhcigtLWFuaW1hdGlvbi1zaXplKSAqIC0xKSl9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIudG9wLWxlZnQgLmFjb3JkLS1ub3RpZmljYXRpb24uY2xvc2luZ3t0cmFuc2Zvcm06dHJhbnNsYXRlKDAsIHZhcigtLWFuaW1hdGlvbi1zaXplKSl9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIuYm90dG9tLXJpZ2h0e2p1c3RpZnktY29udGVudDpmbGV4LWVuZDthbGlnbi1pdGVtczpmbGV4LWVuZH0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci5ib3R0b20tcmlnaHQgLmFjb3JkLS1ub3RpZmljYXRpb24uaGlkZGVue3RyYW5zZm9ybTp0cmFuc2xhdGUoMCwgdmFyKC0tYW5pbWF0aW9uLXNpemUpKX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci5ib3R0b20tcmlnaHQgLmFjb3JkLS1ub3RpZmljYXRpb24uY2xvc2luZ3t0cmFuc2Zvcm06dHJhbnNsYXRlKDAsIGNhbGModmFyKC0tYW5pbWF0aW9uLXNpemUpICogLTEpKX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci5ib3R0b20tbGVmdHtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1zdGFydDthbGlnbi1pdGVtczpmbGV4LWVuZH0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci5ib3R0b20tbGVmdCAuYWNvcmQtLW5vdGlmaWNhdGlvbi5oaWRkZW57dHJhbnNmb3JtOnRyYW5zbGF0ZSgwLCB2YXIoLS1hbmltYXRpb24tc2l6ZSkpfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLmJvdHRvbS1sZWZ0IC5hY29yZC0tbm90aWZpY2F0aW9uLmNsb3Npbmd7dHJhbnNmb3JtOnRyYW5zbGF0ZSgwLCBjYWxjKHZhcigtLWFuaW1hdGlvbi1zaXplKSAqIC0xKSl9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIudG9wLWNlbnRlcntqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO2FsaWduLWl0ZW1zOmZsZXgtc3RhcnR9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIudG9wLWNlbnRlciAuYWNvcmQtLW5vdGlmaWNhdGlvbi5oaWRkZW57dHJhbnNmb3JtOnRyYW5zbGF0ZSgwLCBjYWxjKHZhcigtLWFuaW1hdGlvbi1zaXplKSAqIC0xKSl9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIudG9wLWNlbnRlciAuYWNvcmQtLW5vdGlmaWNhdGlvbi5jbG9zaW5ne3RyYW5zZm9ybTp0cmFuc2xhdGUoMCwgdmFyKC0tYW5pbWF0aW9uLXNpemUpKX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci5ib3R0b20tY2VudGVye2p1c3RpZnktY29udGVudDpjZW50ZXI7YWxpZ24taXRlbXM6ZmxleC1lbmR9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIuYm90dG9tLWNlbnRlciAuYWNvcmQtLW5vdGlmaWNhdGlvbi5oaWRkZW57dHJhbnNmb3JtOnRyYW5zbGF0ZSgwLCB2YXIoLS1hbmltYXRpb24tc2l6ZSkpfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLmJvdHRvbS1jZW50ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24uY2xvc2luZ3t0cmFuc2Zvcm06dHJhbnNsYXRlKDAsIGNhbGModmFyKC0tYW5pbWF0aW9uLXNpemUpICogLTEpKX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci5jZW50ZXJ7anVzdGlmeS1jb250ZW50OmNlbnRlcjthbGlnbi1pdGVtczpjZW50ZXJ9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIuY2VudGVyIC5hY29yZC0tbm90aWZpY2F0aW9uLmhpZGRlbnt0cmFuc2Zvcm06c2NhbGUoMC41KX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci5jZW50ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24uY2xvc2luZ3t0cmFuc2Zvcm06c2NhbGUoMC41KX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci5sZWZ0LWNlbnRlcntqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1zdGFydDthbGlnbi1pdGVtczpjZW50ZXJ9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIubGVmdC1jZW50ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24uaGlkZGVue3RyYW5zZm9ybTp0cmFuc2xhdGUoY2FsYyh2YXIoLS1hbmltYXRpb24tc2l6ZSkgKiAtMSksIDApfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLmxlZnQtY2VudGVyIC5hY29yZC0tbm90aWZpY2F0aW9uLmNsb3Npbmd7dHJhbnNmb3JtOnRyYW5zbGF0ZSh2YXIoLS1hbmltYXRpb24tc2l6ZSksIDApfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLnJpZ2h0LWNlbnRlcntqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1lbmQ7YWxpZ24taXRlbXM6Y2VudGVyfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLnJpZ2h0LWNlbnRlciAuYWNvcmQtLW5vdGlmaWNhdGlvbi5oaWRkZW57dHJhbnNmb3JtOnRyYW5zbGF0ZSh2YXIoLS1hbmltYXRpb24tc2l6ZSksIDApfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLnJpZ2h0LWNlbnRlciAuYWNvcmQtLW5vdGlmaWNhdGlvbi5jbG9zaW5ne3RyYW5zZm9ybTp0cmFuc2xhdGUoY2FsYyh2YXIoLS1hbmltYXRpb24tc2l6ZSkgKiAtMSksIDApfWA7XG4iLCAiaW1wb3J0IGRvbSBmcm9tIFwiLi4vZG9tL2luZGV4LmpzXCI7XHJcbmltcG9ydCBldmVudHMgZnJvbSBcIi4uL2V2ZW50cy9pbmRleC5qc1wiO1xyXG5pbXBvcnQgd2VicGFjayBmcm9tIFwiLi4vbW9kdWxlcy93ZWJwYWNrLmpzXCI7XHJcblxyXG5jb25zdCB0b29sdGlwQ2xhc3NlcyA9IHdlYnBhY2suZmluZEJ5UHJvcGVydGllcyhcInRvb2x0aXBDb250ZW50QWxsb3dPdmVyZmxvd1wiLCBcInRvb2x0aXBcIik7XHJcblxyXG5jb25zdCB0b29sdGlwUG9zaXRpb25zID0ge1xyXG4gIHRvcDogdG9vbHRpcENsYXNzZXMudG9vbHRpcFRvcCxcclxuICBib3R0b206IHRvb2x0aXBDbGFzc2VzLnRvb2x0aXBCb3R0b20sXHJcbiAgbGVmdDogdG9vbHRpcENsYXNzZXMudG9vbHRpcExlZnQsXHJcbiAgcmlnaHQ6IHRvb2x0aXBDbGFzc2VzLnRvb2x0aXBSaWdodCxcclxufVxyXG5cclxuY2xhc3MgVG9vbHRpcCB7XHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtIVE1MRGl2RWxlbWVudH0gdGFyZ2V0IFxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfEhUTUxEaXZFbGVtZW50fSBjb250ZW50XHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IodGFyZ2V0LCBjb250ZW50LCBwb3NpdGlvbiA9IFwiYXV0b1wiKSB7XHJcbiAgICAvKiogQHR5cGUge0hUTUxEaXZFbGVtZW50fSAqL1xyXG4gICAgdGhpcy5sYXllckVsZW1lbnQgPSBkb20ucGFyc2UoYFxyXG4gICAgICA8ZGl2IGNsYXNzPVwiYWNvcmQtLXRvb2x0aXAtbGF5ZXJcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiJHt0b29sdGlwQ2xhc3Nlcy50b29sdGlwfSAke3Rvb2x0aXBDbGFzc2VzLnRvb2x0aXBQcmltYXJ5fSBhY29yZC0tdG9vbHRpcFwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cIiR7dG9vbHRpcENsYXNzZXMudG9vbHRpcFBvaW50ZXJ9IGFjb3JkLS10b29sdGlwLXBvaW50ZXJcIj48L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCIke3Rvb2x0aXBDbGFzc2VzLnRvb2x0aXBDb250ZW50fSBhY29yZC0tdG9vbHRpcC1jb250ZW50XCI+PC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgYCk7XHJcbiAgICB0aGlzLnRvb2x0aXBFbGVtZW50ID0gdGhpcy5sYXllckVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5hY29yZC0tdG9vbHRpcFwiKTtcclxuICAgIHRoaXMuY29udGVudEVsZW1lbnQgPSB0aGlzLmxheWVyRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmFjb3JkLS10b29sdGlwLWNvbnRlbnRcIik7XHJcbiAgICB0aGlzLmNvbnRlbnQgPSBjb250ZW50O1xyXG4gICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XHJcblxyXG4gICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XHJcbiAgICB0aGlzLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLnBhdXNlZCA9IGZhbHNlO1xyXG5cclxuICAgIGNvbnN0IG9uTW91c2VFbnRlciA9ICgpID0+IHtcclxuICAgICAgaWYgKHRoaXMuZGlzYWJsZWQgfHwgdGhpcy5wYXVzZWQpIHJldHVybjtcclxuICAgICAgdGhpcy5zaG93KCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgb25Nb3VzZUxlYXZlID0gKCkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5wYXVzZWQpIHJldHVybjtcclxuICAgICAgdGhpcy5oaWRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy50YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgb25Nb3VzZUVudGVyKTtcclxuICAgIHRoaXMudGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIG9uTW91c2VMZWF2ZSk7XHJcblxyXG4gICAgbGV0IHVuUGF0Y2hPYnNlcnZlciA9IGV2ZW50cy5vbihcclxuICAgICAgXCJkb20tbXV0YXRpb25cIixcclxuICAgICAgLyoqIEBwYXJhbSB7TXV0YXRpb25SZWNvcmR9IG11dCAqLyhtdXQpID0+IHtcclxuICAgICAgICBpZiAobXV0LnR5cGUgPT09IFwiYXR0cmlidXRlc1wiKSB7XHJcbiAgICAgICAgICBpZiAobXV0LnRhcmdldC5pc1NhbWVOb2RlKHRoaXMudGFyZ2V0KSkge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG11dC5hdHRyaWJ1dGVOYW1lKSB7XHJcbiAgICAgICAgICAgICAgY2FzZSBcImFjb3JkLS10b29sdGlwLWRpc2FibGVkXCI6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlzYWJsZWQgPSB0aGlzLnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJhY29yZC0tdG9vbHRpcC1kaXNhYmxlZFwiKSA9PT0gXCJ0cnVlXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgY2FzZSBcImFjb3JkLS10b29sdGlwLWNvbnRlbnRcIjoge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50ID0gdGhpcy50YXJnZXQuZ2V0QXR0cmlidXRlKFwiYWNvcmQtLXRvb2x0aXAtY29udGVudFwiKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBjYXNlIFwiYWNvcmQtLXRvb2x0aXAtcG9zaXRpb25cIjoge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHRoaXMudGFyZ2V0LmdldEF0dHJpYnV0ZShcImFjb3JkLS10b29sdGlwLXBvc2l0aW9uXCIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICApXHJcblxyXG4gICAgdGhpcy5kZXN0cm95ID0gKCkgPT4ge1xyXG4gICAgICB0aGlzLnRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCBvbk1vdXNlRW50ZXIpO1xyXG4gICAgICB0aGlzLnRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCBvbk1vdXNlTGVhdmUpO1xyXG4gICAgICB0aGlzLmhpZGUoKTtcclxuICAgICAgdW5QYXRjaE9ic2VydmVyKCk7XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgZ2V0IGNvbnRlbnQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jb250ZW50RWxlbWVudC5maXJzdEVsZW1lbnRDaGlsZDtcclxuICB9XHJcblxyXG4gIHNldCBjb250ZW50KHZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgIHRoaXMuY29udGVudEVsZW1lbnQuaW5uZXJIVE1MID0gdmFsdWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmNvbnRlbnRFbGVtZW50LmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICAgIHRoaXMuY29udGVudEVsZW1lbnQ/LmFwcGVuZENoaWxkPy4odmFsdWUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIGdldENvbnRhaW5lcigpIHtcclxuICAgIGNvbnN0IGFwcEVsbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tjbGFzcyo9XCJub3RBcHBBc2lkZVBhbmVsLVwiXScpO1xyXG5cclxuICAgIGxldCBjb250YWluZXIgPSBhcHBFbG0ucXVlcnlTZWxlY3RvcihcIi5hY29yZC0tdG9vbHRpcC1jb250YWluZXJcIik7XHJcbiAgICBpZiAoIWNvbnRhaW5lcikge1xyXG4gICAgICBjb250YWluZXIgPSBkb20ucGFyc2UoYDxkaXYgY2xhc3M9XCJhY29yZC0tbGF5ZXItY29udGFpbmVyIGFjb3JkLS10b29sdGlwLWNvbnRhaW5lclwiPjwvZGl2PmApO1xyXG4gICAgICBhcHBFbG0uYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcclxuICAgIH1cclxuICAgIGNvbnRhaW5lci5zdHlsZS5zZXRQcm9wZXJ0eShcIi0tdG9wLW9mZnNldFwiLCBgJHthcHBFbG0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wLnRvRml4ZWQoMSl9cHhgKTtcclxuXHJcbiAgICByZXR1cm4gY29udGFpbmVyO1xyXG4gIH1cclxuXHJcbiAgc2hvdygpIHtcclxuICAgIGlmICh0aGlzLnZpc2libGUpIHJldHVybjtcclxuICAgIHRoaXMudmlzaWJsZSA9IHRydWU7XHJcblxyXG4gICAgY29uc3QgY29udGFpbmVyID0gVG9vbHRpcC5nZXRDb250YWluZXIoKTtcclxuXHJcbiAgICBpZiAodGhpcy5wb3NpdGlvbiA9PT0gXCJhdXRvXCIpIHtcclxuICAgICAgdGhpcy5jYWxjdWxhdGVQb3NpdGlvbihcclxuICAgICAgICB0aGlzLmNhblNob3dBdFRvcCA/IFwidG9wXCJcclxuICAgICAgICAgIDogdGhpcy5jYW5TaG93QXRCb3R0b20gPyBcImJvdHRvbVwiXHJcbiAgICAgICAgICAgIDogdGhpcy5jYW5TaG93QXRMZWZ0ID8gXCJsZWZ0XCJcclxuICAgICAgICAgICAgICA6IHRoaXMuY2FuU2hvd0F0UmlnaHQgPyBcInJpZ2h0XCJcclxuICAgICAgICAgICAgICAgIDogXCJ0b3BcIlxyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5jYWxjdWxhdGVQb3NpdGlvbih0aGlzLnBvc2l0aW9uKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMubGF5ZXJFbGVtZW50KTtcclxuICAgIHRoaXMubGF5ZXJFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJ2aXNpYmxlXCIpO1xyXG4gIH1cclxuXHJcbiAgY2FsY3VsYXRlUG9zaXRpb24ocG9zaXRpb24pIHtcclxuICAgIGNvbnN0IGJvdW5kaW5nUmVjdCA9IHRoaXMudGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cclxuICAgIHRoaXMubGF5ZXJFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoLi4uT2JqZWN0LnZhbHVlcyh0b29sdGlwUG9zaXRpb25zKSk7XHJcbiAgICB0aGlzLnRvb2x0aXBFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJ2ZXJ0aWNhbFwiLCBcImhvcml6b250YWxcIik7XHJcblxyXG4gICAgc3dpdGNoIChwb3NpdGlvbikge1xyXG4gICAgICBjYXNlIFwidG9wXCI6IHtcclxuICAgICAgICB0aGlzLmxheWVyRWxlbWVudC5zdHlsZS50b3AgPSBgJHtib3VuZGluZ1JlY3QudG9wIC0gdGhpcy50YXJnZXQub2Zmc2V0SGVpZ2h0IC0gMTB9cHhgO1xyXG4gICAgICAgIHRoaXMubGF5ZXJFbGVtZW50LnN0eWxlLmxlZnQgPSBgJHtib3VuZGluZ1JlY3QubGVmdH1weGA7XHJcbiAgICAgICAgdGhpcy5sYXllckVsZW1lbnQuY2xhc3NMaXN0LmFkZCh0b29sdGlwUG9zaXRpb25zLnRvcCk7XHJcbiAgICAgICAgdGhpcy50b29sdGlwRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwidmVydGljYWxcIik7XHJcbiAgICAgICAgdGhpcy5jZW50ZXJQb3NpdGlvbihcImhvcml6b250YWxcIik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSBcImJvdHRvbVwiOiB7XHJcbiAgICAgICAgdGhpcy5sYXllckVsZW1lbnQuc3R5bGUudG9wID0gYCR7Ym91bmRpbmdSZWN0LnRvcCArIHRoaXMudGFyZ2V0Lm9mZnNldEhlaWdodCArIDEwfXB4YDtcclxuICAgICAgICB0aGlzLmxheWVyRWxlbWVudC5zdHlsZS5sZWZ0ID0gYCR7Ym91bmRpbmdSZWN0LmxlZnR9cHhgO1xyXG4gICAgICAgIHRoaXMubGF5ZXJFbGVtZW50LmNsYXNzTGlzdC5hZGQodG9vbHRpcFBvc2l0aW9ucy5ib3R0b20pO1xyXG4gICAgICAgIHRoaXMudG9vbHRpcEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInZlcnRpY2FsXCIpO1xyXG4gICAgICAgIHRoaXMuY2VudGVyUG9zaXRpb24oXCJob3Jpem9udGFsXCIpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgXCJsZWZ0XCI6IHtcclxuICAgICAgICB0aGlzLmxheWVyRWxlbWVudC5zdHlsZS50b3AgPSBgJHtib3VuZGluZ1JlY3QudG9wfXB4YDtcclxuICAgICAgICB0aGlzLmxheWVyRWxlbWVudC5zdHlsZS5sZWZ0ID0gYCR7Ym91bmRpbmdSZWN0LmxlZnQgLSB0aGlzLnRhcmdldC5vZmZzZXRXaWR0aCAtIDEwfXB4YDtcclxuICAgICAgICB0aGlzLmxheWVyRWxlbWVudC5jbGFzc0xpc3QuYWRkKHRvb2x0aXBQb3NpdGlvbnMubGVmdCk7XHJcbiAgICAgICAgdGhpcy50b29sdGlwRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiaG9yaXpvbnRhbFwiKTtcclxuICAgICAgICB0aGlzLmNlbnRlclBvc2l0aW9uKFwidmVydGljYWxcIik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSBcInJpZ2h0XCI6IHtcclxuICAgICAgICB0aGlzLmxheWVyRWxlbWVudC5zdHlsZS50b3AgPSBgJHtib3VuZGluZ1JlY3QudG9wfXB4YDtcclxuICAgICAgICB0aGlzLmxheWVyRWxlbWVudC5zdHlsZS5sZWZ0ID0gYCR7Ym91bmRpbmdSZWN0LmxlZnQgKyB0aGlzLnRhcmdldC5vZmZzZXRXaWR0aCArIDEwfXB4YDtcclxuICAgICAgICB0aGlzLmxheWVyRWxlbWVudC5jbGFzc0xpc3QuYWRkKHRvb2x0aXBQb3NpdGlvbnMucmlnaHQpO1xyXG4gICAgICAgIHRoaXMudG9vbHRpcEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImhvcml6b250YWxcIik7XHJcbiAgICAgICAgdGhpcy5jZW50ZXJQb3NpdGlvbihcInZlcnRpY2FsXCIpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjZW50ZXJQb3NpdGlvbihkaXJlY3Rpb24pIHtcclxuICAgIHN3aXRjaCAoZGlyZWN0aW9uKSB7XHJcbiAgICAgIGNhc2UgXCJob3Jpem9udGFsXCI6IHtcclxuICAgICAgICBjb25zdCBjZW50ZXIgPSB0aGlzLnRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0ICsgKHRoaXMudGFyZ2V0Lm9mZnNldFdpZHRoIC8gMik7XHJcbiAgICAgICAgdGhpcy5sYXllckVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoXCJsZWZ0XCIsIGAke2NlbnRlciAtICh0aGlzLmxheWVyRWxlbWVudC5vZmZzZXRXaWR0aCAvIDIpfXB4YCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSBcInZlcnRpY2FsXCI6IHtcclxuICAgICAgICBjb25zdCBjZW50ZXIgPSB0aGlzLnRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgKyAodGhpcy50YXJnZXQub2Zmc2V0SGVpZ2h0IC8gMik7XHJcbiAgICAgICAgdGhpcy5sYXllckVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoXCJ0b3BcIiwgYCR7Y2VudGVyIC0gKHRoaXMubGF5ZXJFbGVtZW50Lm9mZnNldEhlaWdodCAvIDIpfXB4YCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGhpZGUoKSB7XHJcbiAgICBpZiAoIXRoaXMudmlzaWJsZSkgcmV0dXJuO1xyXG4gICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5sYXllckVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcInZpc2libGVcIik7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGhpcy5sYXllckVsZW1lbnQucmVtb3ZlKCk7XHJcbiAgICB9LCA1MCk7XHJcbiAgfVxyXG5cclxuICBnZXQgY2FuU2hvd0F0VG9wKCkgeyByZXR1cm4gdGhpcy50YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wIC0gdGhpcy5sYXllckVsZW1lbnQub2Zmc2V0SGVpZ2h0ID49IDA7IH1cclxuICBnZXQgY2FuU2hvd0F0Qm90dG9tKCkgeyByZXR1cm4gdGhpcy50YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgdGhpcy50YXJnZXQub2Zmc2V0SGVpZ2h0ICsgdGhpcy5sYXllckVsZW1lbnQub2Zmc2V0SGVpZ2h0IDw9IHdpbmRvdy5pbm5lckhlaWdodDsgfVxyXG4gIGdldCBjYW5TaG93QXRMZWZ0KCkgeyByZXR1cm4gdGhpcy50YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCAtIHRoaXMubGF5ZXJFbGVtZW50Lm9mZnNldFdpZHRoID49IDA7IH1cclxuICBnZXQgY2FuU2hvd0F0UmlnaHQoKSB7IHJldHVybiB0aGlzLnRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0ICsgdGhpcy50YXJnZXQub2Zmc2V0V2lkdGggKyB0aGlzLmxheWVyRWxlbWVudC5vZmZzZXRXaWR0aCA8PSB3aW5kb3cuaW5uZXJXaWR0aDsgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGUodGFyZ2V0LCBjb250ZW50LCBwb3NpdGlvbiA9IFwiYXV0b1wiKSB7XHJcbiAgcmV0dXJuIG5ldyBUb29sdGlwKHRhcmdldCwgY29udGVudCwgcG9zaXRpb24pO1xyXG59XHJcblxyXG5kb20ucGF0Y2goXHJcbiAgXCJbYWNvcmQtLXRvb2x0aXAtY29udGVudF1cIixcclxuICAoZWxtKSA9PiB7XHJcbiAgICBsZXQgdG9vbHRpcCA9IGNyZWF0ZShlbG0sIGVsbS5nZXRBdHRyaWJ1dGUoXCJhY29yZC0tdG9vbHRpcC1jb250ZW50XCIpLCBlbG0uZ2V0QXR0cmlidXRlKFwiYWNvcmQtLXRvb2x0aXAtcG9zaXRpb25cIikpO1xyXG4gICAgdG9vbHRpcC5kaXNhYmxlZCA9IGVsbS5nZXRBdHRyaWJ1dGUoXCJhY29yZC0tdG9vbHRpcC1kaXNhYmxlZFwiKSA9PT0gXCJ0cnVlXCI7XHJcblxyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgdG9vbHRpcC5kZXN0cm95KCk7XHJcbiAgICB9XHJcbiAgfSxcclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHsgY3JlYXRlIH07IiwgImltcG9ydCBkb20gZnJvbSBcIi4uL2RvbS9pbmRleC5qc1wiO1xyXG5pbXBvcnQgdXRpbHMgZnJvbSBcIi4uL3V0aWxzL2luZGV4LmpzXCI7XHJcblxyXG5jb25zdCB2YWxpZFBvc2l0aW9ucyA9IFtcclxuICBcInRvcC1yaWdodFwiLFxyXG4gIFwidG9wLWxlZnRcIixcclxuICBcImJvdHRvbS1yaWdodFwiLFxyXG4gIFwiYm90dG9tLWxlZnRcIixcclxuICBcInRvcC1jZW50ZXJcIixcclxuICBcImJvdHRvbS1jZW50ZXJcIixcclxuICBcImNlbnRlclwiLFxyXG4gIFwibGVmdC1jZW50ZXJcIixcclxuICBcInJpZ2h0LWNlbnRlclwiXHJcbl1cclxuXHJcbmZ1bmN0aW9uIGdldENvbnRhaW5lcihwb3NpdGlvbikge1xyXG4gIGlmICghdmFsaWRQb3NpdGlvbnMuaW5jbHVkZXMocG9zaXRpb24pKSB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgcG9zaXRpb24gXCIke3Bvc2l0aW9ufVwiLiBWYWxpZCBwb3NpdGlvbnMgYXJlOiAke3ZhbGlkUG9zaXRpb25zLmpvaW4oXCIsIFwiKX1gKTtcclxuICBjb25zdCBhcHBFbG0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbY2xhc3MqPVwibm90QXBwQXNpZGVQYW5lbC1cIl0nKTtcclxuXHJcbiAgbGV0IHRvcENvbnRhaW5lciA9IGFwcEVsbS5xdWVyeVNlbGVjdG9yKFwiLmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXItY29udGFpbmVyXCIpO1xyXG4gIGlmICghdG9wQ29udGFpbmVyKSB7XHJcbiAgICB0b3BDb250YWluZXIgPSBkb20ucGFyc2UoYDxkaXYgY2xhc3M9XCJhY29yZC0tbGF5ZXItY29udGFpbmVyIGFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXItY29udGFpbmVyXCI+PC9kaXY+YCk7XHJcbiAgICBhcHBFbG0uYXBwZW5kQ2hpbGQodG9wQ29udGFpbmVyKTtcclxuICB9XHJcbiAgdG9wQ29udGFpbmVyLnN0eWxlLnNldFByb3BlcnR5KFwiLS10b3Atb2Zmc2V0XCIsIGAke2FwcEVsbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AudG9GaXhlZCgxKX1weGApO1xyXG5cclxuICBsZXQgcG9zaXRpb25Db250YWluZXIgPSB0b3BDb250YWluZXIucXVlcnlTZWxlY3RvcihgLmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIuJHtwb3NpdGlvbn1gKTtcclxuICBpZiAoIXBvc2l0aW9uQ29udGFpbmVyKSB7XHJcbiAgICBwb3NpdGlvbkNvbnRhaW5lciA9IGRvbS5wYXJzZShgPGRpdiBjbGFzcz1cImFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIgJHtwb3NpdGlvbn1cIj48L2Rpdj5gKTtcclxuICAgIHRvcENvbnRhaW5lci5hcHBlbmRDaGlsZChwb3NpdGlvbkNvbnRhaW5lcik7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gcG9zaXRpb25Db250YWluZXI7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3coY29udGVudCwge1xyXG4gIHN0eWxlID0gXCJkZWZhdWx0XCIsXHJcbiAgdGltZW91dCA9IDEwMDAwLFxyXG4gIHBvc2l0aW9uID0gXCJ0b3AtcmlnaHRcIixcclxuICBjbG9zYWJsZSA9IHRydWUsXHJcbiAgb25DbGljayA9IG51bGwsXHJcbiAgb25DbG9zZSA9IG51bGxcclxufSA9IHt9KSB7XHJcbiAgY29uc3QgY29udGFpbmVyID0gZ2V0Q29udGFpbmVyKHBvc2l0aW9uKTtcclxuXHJcbiAgY29uc3Qgbm90aWZFbG0gPSBkb20ucGFyc2UoYFxyXG4gICAgPGRpdiBjbGFzcz1cImFjb3JkLS1ub3RpZmljYXRpb24gc3R5bGUtJHtzdHlsZX0gaGlkZGVuXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGVudFwiPjwvZGl2PlxyXG4gICAgICAgICAgICA8c3ZnIGNsYXNzPVwiY2xvc2UgJHshY2xvc2FibGUgPyBcImhpZGRlblwiIDogXCJcIn1cIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiPlxyXG4gICAgICAgICAgICAgICAgPHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNMTIgMTAuNTg2bDQuOTUtNC45NSAxLjQxNCAxLjQxNC00Ljk1IDQuOTUgNC45NSA0Ljk1LTEuNDE0IDEuNDE0LTQuOTUtNC45NS00Ljk1IDQuOTUtMS40MTQtMS40MTQgNC45NS00Ljk1LTQuOTUtNC45NUw3LjA1IDUuNjM2elwiLz5cclxuICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInByb2dyZXNzLWNvbnRhaW5lclwiIHN0eWxlPVwiLS1kdXJhdGlvbjogJHt0aW1lb3V0fW1zO1wiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZ3Jlc3NcIj48L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIGApO1xyXG5cclxuICBub3RpZkVsbS5xdWVyeVNlbGVjdG9yKFwiLmNvbnRlbnRcIikuaW5uZXJIVE1MID0gY29udGVudDtcclxuXHJcbiAgbGV0IGNsb3NlZCA9IGZhbHNlO1xyXG4gIGZ1bmN0aW9uIGNsb3NlKGNsb3NlVHlwZSkge1xyXG4gICAgaWYgKGNsb3NlZCkgcmV0dXJuO1xyXG4gICAgY2xvc2VkID0gdHJ1ZTtcclxuXHJcbiAgICBub3RpZkVsbS5jbGFzc0xpc3QuYWRkKFwiY2xvc2luZ1wiKTtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBub3RpZkVsbS5yZW1vdmUoKTtcclxuXHJcbiAgICAgIHV0aWxzLmlmRXhpc3RzKFxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLWNvbnRhaW5lcmApLFxyXG4gICAgICAgIC8qKiBAcGFyYW0ge0hUTUxEaXZFbGVtZW50fSBlbG0gKi8oZWxtKSA9PiB7XHJcbiAgICAgICAgICBpZiAoIShbLi4uZWxtLmNoaWxkTm9kZXMudmFsdWVzKCldLnJlZHVjZSgocHJldiwgY3VycikgPT4gcHJldiArIGN1cnIuY2hpbGRFbGVtZW50Q291bnQsIDApKSkgZWxtLnJlbW92ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgKTtcclxuICAgIH0sIDI3NSk7XHJcbiAgICBvbkNsb3NlPy4oY2xvc2VUeXBlKTtcclxuICB9XHJcblxyXG4gIGlmICh0eXBlb2Ygb25DbGljayA9PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgIG5vdGlmRWxtLmNsYXNzTGlzdC5hZGQoXCJjbGlja2FibGVcIik7XHJcbiAgICBub3RpZkVsbS5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgICBvbkNsaWNrKGNsb3NlKTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICB1dGlscy5pZkV4aXN0cyhub3RpZkVsbS5xdWVyeVNlbGVjdG9yKFwiLmNsb3NlXCIpLCAoZWxtKSA9PiB7XHJcbiAgICBlbG0ub25jbGljayA9ICgpID0+IHtcclxuICAgICAgY2xvc2UoXCJ1c2VyXCIpO1xyXG4gICAgfTtcclxuICB9KTtcclxuXHJcbiAgY29udGFpbmVyLnByZXBlbmQobm90aWZFbG0pO1xyXG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XHJcbiAgICBub3RpZkVsbS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xyXG4gICAgbm90aWZFbG0ucXVlcnlTZWxlY3RvcihcIi5wcm9ncmVzc1wiKS5jbGFzc0xpc3QuYWRkKFwicHJvZ3Jlc3NpbmdcIik7XHJcbiAgfSk7XHJcblxyXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgY2xvc2UoXCJ0aW1lb3V0XCIpO1xyXG4gIH0sIHRpbWVvdXQpO1xyXG5cclxuICByZXR1cm4gKCkgPT4ge1xyXG4gICAgY2xvc2UoXCJmb3JjZVwiKTtcclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgc2hvdzogT2JqZWN0LmFzc2lnbihzaG93LCB7XHJcbiAgICBpbmZvOiAoaHRtbCwgb2JqID0ge30pID0+IHNob3coaHRtbCwgeyAuLi5vYmosIHN0eWxlOiBcImluZm9cIiB9KSxcclxuICAgIGVycm9yOiAoaHRtbCwgb2JqID0ge30pID0+IHNob3coaHRtbCwgeyAuLi5vYmosIHN0eWxlOiBcImVycm9yXCIgfSksXHJcbiAgICB3YXJuaW5nOiAoaHRtbCwgb2JqID0ge30pID0+IHNob3coaHRtbCwgeyAuLi5vYmosIHN0eWxlOiBcIndhcm5pbmdcIiB9KSxcclxuICAgIHN1Y2Nlc3M6IChodG1sLCBvYmogPSB7fSkgPT4gc2hvdyhodG1sLCB7IC4uLm9iaiwgc3R5bGU6IFwic3VjY2Vzc1wiIH0pLFxyXG4gIH0pLFxyXG59OyIsICJpbXBvcnQgd2VicGFjayBmcm9tIFwiLi4vbW9kdWxlcy93ZWJwYWNrLmpzXCI7XHJcbmltcG9ydCBwYXRjaGVyIGZyb20gXCIuLi9wYXRjaGVyL2luZGV4LmpzXCI7XHJcbmltcG9ydCBsb2dnZXIgZnJvbSBcIi4uL3V0aWxzL2xvZ2dlci5qc1wiO1xyXG5cclxuaW1wb3J0IGNvbW1vbiBmcm9tIFwiLi4vbW9kdWxlcy9jb21tb24uanNcIjtcclxuaW1wb3J0IHsgZmluZGVyTWFwIH0gZnJvbSBcIi4uL21vZHVsZXMvcmF3L2NvbXBsZXgtZmluZGVyLmpzXCI7XHJcblxyXG5jb25zdCB7IFJlYWN0IH0gPSBjb21tb247XHJcblxyXG5sZXQgaXNSZWFkeSA9IGZhbHNlO1xyXG5cclxubGV0IENvbXBvbmVudHMgPSBudWxsO1xyXG5cclxubGV0IEFjdGlvbnMgPSBudWxsO1xyXG5cclxuKGFzeW5jICgpID0+IHtcclxuICBBY3Rpb25zID0gYXdhaXQgKGFzeW5jICgpID0+IHtcclxuICAgIGxldCBvZ01vZHVsZTtcclxuICAgIHdoaWxlICh0cnVlKSB7XHJcbiAgICAgIG9nTW9kdWxlID0gd2VicGFjay5maWx0ZXIobSA9PiBPYmplY3QudmFsdWVzKG0pLnNvbWUodiA9PiB0eXBlb2YgdiA9PT0gXCJmdW5jdGlvblwiICYmIHYudG9TdHJpbmcoKS5pbmNsdWRlcyhcIkNPTlRFWFRfTUVOVV9DTE9TRVwiKSkpLmZpbmQobSA9PiBtLmV4cG9ydHMgIT09IHdpbmRvdyk/LmV4cG9ydHM7XHJcbiAgICAgIGlmIChvZ01vZHVsZSkgYnJlYWs7XHJcbiAgICAgIGF3YWl0IG5ldyBQcm9taXNlKHIgPT4gc2V0VGltZW91dChyLCAxMDApKTtcclxuICAgIH1cclxuICAgIGNvbnN0IG91dCA9IGZpbmRlck1hcChvZ01vZHVsZSwge1xyXG4gICAgICBjbG9zZTogW1wiQ09OVEVYVF9NRU5VX0NMT1NFXCJdLFxyXG4gICAgICBvcGVuOiBbXCJyZW5kZXJMYXp5XCJdXHJcbiAgICB9KTtcclxuXHJcbiAgICBpc1JlYWR5ID0gISFvdXQuY2xvc2UgJiYgISFvdXQub3BlbjtcclxuICAgIHJldHVybiBvdXQ7XHJcbiAgfSkoKTtcclxuXHJcbiAgQ29tcG9uZW50cyA9IGF3YWl0IChhc3luYyAoKSA9PiB7XHJcbiAgICBjb25zdCBvdXQgPSB7fTtcclxuICAgIGNvbnN0IGNvbXBvbmVudE1hcCA9IHtcclxuICAgICAgc2VwYXJhdG9yOiBcIlNlcGFyYXRvclwiLFxyXG4gICAgICBjaGVja2JveDogXCJDaGVja2JveEl0ZW1cIixcclxuICAgICAgcmFkaW86IFwiUmFkaW9JdGVtXCIsXHJcbiAgICAgIGNvbnRyb2w6IFwiQ29udHJvbEl0ZW1cIixcclxuICAgICAgZ3JvdXBzdGFydDogXCJHcm91cFwiLFxyXG4gICAgICBjdXN0b21pdGVtOiBcIkl0ZW1cIlxyXG4gICAgfTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBsZXQgbW9kdWxlSWQ7XHJcbiAgICAgIHdoaWxlICh0cnVlKSB7XHJcbiAgICAgICAgbW9kdWxlSWQgPSBPYmplY3QuZW50cmllcyh3ZWJwYWNrLnJlcXVpcmUubSkuZmluZCgoWywgbV0pID0+IG0/LnRvU3RyaW5nKCkuaW5jbHVkZXMoXCJtZW51aXRlbWNoZWNrYm94XCIpKVswXVxyXG4gICAgICAgIGlmIChtb2R1bGVJZCkgYnJlYWs7XHJcbiAgICAgICAgYXdhaXQgbmV3IFByb21pc2UociA9PiBzZXRUaW1lb3V0KHIsIDEwMCkpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBjb250ZXh0TWVudU1vZHVsZSA9IHdlYnBhY2suZmluZCgoXywgaWR4KSA9PiBpZHggPT0gbW9kdWxlSWQpLmV4cG9ydHM7XHJcblxyXG4gICAgICBjb25zdCBtb2R1bGVTdHJpbmcgPSB3ZWJwYWNrLnJlcXVpcmUubVttb2R1bGVJZF0udG9TdHJpbmcoKTtcclxuICAgICAgY29uc3QgcmF3TWF0Y2hlcyA9IG1vZHVsZVN0cmluZy5tYXRjaEFsbCgvaWZcXChcXHcrXFwudHlwZT09PSg/OlxcdytcXC4pPyhcXHcrKVxcKS4rP3R5cGU6XCIoLis/KVwiL2dzKTtcclxuXHJcbiAgICAgIG91dC5NZW51ID0gT2JqZWN0LnZhbHVlcyhjb250ZXh0TWVudU1vZHVsZSkuZmluZCh2ID0+IHYudG9TdHJpbmcoKS5pbmNsdWRlcyhcIi5pc1VzaW5nS2V5Ym9hcmROYXZpZ2F0aW9uXCIpKTtcclxuXHJcbiAgICAgIFsuLi5yYXdNYXRjaGVzXS5mb3JFYWNoKChbLCBmdW5jdGlvbk5hbWUsIHR5cGVdKSA9PiB7XHJcbiAgICAgICAgbGV0IG1vZHVsZUtleSA9IG1vZHVsZVN0cmluZy5tYXRjaChuZXcgUmVnRXhwKG5ldyBSZWdFeHAoYChcXFxcdyspOlxcXFwoXFxcXClcXFxcPVxcXFw+JHtmdW5jdGlvbk5hbWV9YCkpKT8uWzFdXHJcbiAgICAgICAgb3V0W2NvbXBvbmVudE1hcFt0eXBlXV0gPSBjb250ZXh0TWVudU1vZHVsZVttb2R1bGVLZXldO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlzUmVhZHkgPSBPYmplY3Qua2V5cyhvdXQpLmxlbmd0aCA+IDE7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgaXNSZWFkeSA9IGZhbHNlO1xyXG4gICAgICBsb2dnZXIuZXJyb3IoXCJGYWlsZWQgdG8gbG9hZCBjb250ZXh0IG1lbnUgY29tcG9uZW50c1wiLCBlcnIpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBvdXQ7XHJcbiAgfSkoKTtcclxuXHJcbiAgTWVudVBhdGNoZXIuaW5pdGlhbGl6ZSgpO1xyXG59KSgpO1xyXG5cclxuXHJcbmNsYXNzIE1lbnVQYXRjaGVyIHtcclxuICBzdGF0aWMgTUFYX1BBVENIX0lURVJBVElPTlMgPSAxNjtcclxuICBzdGF0aWMgcGF0Y2hlcyA9IG5ldyBNYXAoKTtcclxuICBzdGF0aWMgc3ViUGF0Y2hlcyA9IG5ldyBXZWFrTWFwKCk7XHJcblxyXG4gIHN0YXRpYyBpbml0aWFsaXplKCkge1xyXG4gICAgaWYgKCFpc1JlYWR5KSByZXR1cm4gbG9nZ2VyLndhcm4oXCJVbmFibGUgdG8gbG9hZCBjb250ZXh0IG1lbnUuXCIpO1xyXG5cclxuICAgIGNvbnN0IG1vZHVsZVRvUGF0Y2ggPSB3ZWJwYWNrLmZpbHRlcihtID0+IE9iamVjdC52YWx1ZXMobSkuc29tZSh2ID0+IHR5cGVvZiB2ID09PSBcImZ1bmN0aW9uXCIgJiYgdi50b1N0cmluZygpLmluY2x1ZGVzKFwiQ09OVEVYVF9NRU5VX0NMT1NFXCIpKSkuZmluZChtID0+IG0uZXhwb3J0cyAhPT0gd2luZG93KS5leHBvcnRzO1xyXG4gICAgY29uc3Qga2V5VG9QYXRjaCA9IE9iamVjdC5rZXlzKG1vZHVsZVRvUGF0Y2gpLmZpbmQoayA9PiBtb2R1bGVUb1BhdGNoW2tdPy5sZW5ndGggPT09IDMpO1xyXG5cclxuICAgIHBhdGNoZXIuYmVmb3JlKFxyXG4gICAgICBrZXlUb1BhdGNoLFxyXG4gICAgICBtb2R1bGVUb1BhdGNoLFxyXG4gICAgICBmdW5jdGlvbiAobWV0aG9kQXJncykge1xyXG4gICAgICAgIGNvbnN0IHByb21pc2UgPSBtZXRob2RBcmdzWzFdO1xyXG4gICAgICAgIG1ldGhvZEFyZ3NbMV0gPSBhc3luYyBmdW5jdGlvbiAoLi4uYXJncykge1xyXG4gICAgICAgICAgY29uc3QgcmVuZGVyID0gYXdhaXQgcHJvbWlzZS5jYWxsKHRoaXMsIC4uLmFyZ3MpO1xyXG5cclxuICAgICAgICAgIHJldHVybiAocHJvcHMpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcmVzID0gcmVuZGVyKHByb3BzKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChyZXM/LnByb3BzLm5hdklkKSB7XHJcbiAgICAgICAgICAgICAgTWVudVBhdGNoZXIuZXhlY3V0ZVBhdGNoZXMocmVzLnByb3BzLm5hdklkLCByZXMsIHByb3BzKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgcmVzPy50eXBlID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICAgICAgICBNZW51UGF0Y2hlci5wYXRjaFJlY3Vyc2l2ZShyZXMsIFwidHlwZVwiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlcztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBtZXRob2RBcmdzO1xyXG4gICAgICB9XHJcbiAgICApXHJcbiAgfVxyXG5cclxuICBzdGF0aWMgcGF0Y2hSZWN1cnNpdmUodGFyZ2V0LCBtZXRob2QsIGl0ZXJhdGlvbiA9IDApIHtcclxuICAgIGlmIChpdGVyYXRpb24gPj0gdGhpcy5NQVhfUEFUQ0hfSVRFUkFUSU9OUykgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IHByb3h5RnVuY3Rpb24gPSB0aGlzLnN1YlBhdGNoZXMuZ2V0KHRhcmdldFttZXRob2RdKSA/PyAoKCkgPT4ge1xyXG4gICAgICBjb25zdCBvcmlnaW5hbEZ1bmN0aW9uID0gdGFyZ2V0W21ldGhvZF07XHJcbiAgICAgIGNvbnN0IGRlcHRoID0gKytpdGVyYXRpb247XHJcbiAgICAgIGZ1bmN0aW9uIHBhdGNoKC4uLmFyZ3MpIHtcclxuICAgICAgICBjb25zdCByZXMgPSBvcmlnaW5hbEZ1bmN0aW9uLmNhbGwodGhpcywgLi4uYXJncyk7XHJcblxyXG4gICAgICAgIGlmICghcmVzKSByZXR1cm4gcmVzO1xyXG5cclxuICAgICAgICBjb25zdCBuYXZJZCA9IHJlcy5wcm9wcz8ubmF2SWQgPz8gcmVzLnByb3BzPy5jaGlsZHJlbj8ucHJvcHM/Lm5hdklkO1xyXG4gICAgICAgIGlmIChuYXZJZCkge1xyXG4gICAgICAgICAgTWVudVBhdGNoZXIuZXhlY3V0ZVBhdGNoZXMobmF2SWQsIHJlcywgYXJnc1swXSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnN0IGxheWVyID0gcmVzLnByb3BzLmNoaWxkcmVuID8gcmVzLnByb3BzLmNoaWxkcmVuIDogcmVzO1xyXG5cclxuICAgICAgICAgIGlmICh0eXBlb2YgbGF5ZXI/LnR5cGUgPT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgICAgIE1lbnVQYXRjaGVyLnBhdGNoUmVjdXJzaXZlKGxheWVyLCBcInR5cGVcIiwgZGVwdGgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJlcztcclxuICAgICAgfVxyXG5cclxuICAgICAgcGF0Y2guX19vcmlnaW5hbF9fID0gb3JpZ2luYWxGdW5jdGlvbjtcclxuICAgICAgT2JqZWN0LmFzc2lnbihwYXRjaCwgb3JpZ2luYWxGdW5jdGlvbik7XHJcbiAgICAgIHRoaXMuc3ViUGF0Y2hlcy5zZXQob3JpZ2luYWxGdW5jdGlvbiwgcGF0Y2gpO1xyXG5cclxuICAgICAgcmV0dXJuIHBhdGNoO1xyXG4gICAgfSkoKTtcclxuXHJcbiAgICB0YXJnZXRbbWV0aG9kXSA9IHByb3h5RnVuY3Rpb247XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZXhlY3V0ZVBhdGNoZXMoaWQsIHJlcywgcHJvcHMpIHtcclxuICAgIGlmICghdGhpcy5wYXRjaGVzLmhhcyhpZCkpIHJldHVybjtcclxuXHJcbiAgICB0aGlzLnBhdGNoZXMuZ2V0KGlkKS5mb3JFYWNoKHBhdGNoID0+IHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBwYXRjaChyZXMsIHByb3BzKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgbG9nZ2VyLmVycm9yKFwiRmFpbGVkIHRvIHBhdGNoIGNvbnRleHQgbWVudVwiLCBwYXRjaCwgZXJyKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcblxyXG5cclxuLy8gQ29waWVkIGZyb20gYmQncyBzb3VyY2VcclxuZnVuY3Rpb24gYnVpbGRJdGVtKHByb3BzKSB7XHJcbiAgY29uc3QgeyB0eXBlIH0gPSBwcm9wcztcclxuICBpZiAodHlwZSA9PT0gXCJzZXBhcmF0b3JcIikgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQ29tcG9uZW50cy5TZXBhcmF0b3IpO1xyXG5cclxuICBsZXQgY29tcG9uZW50ID0gQ29tcG9uZW50cy5JdGVtO1xyXG4gIGlmICh0eXBlID09PSBcInN1Ym1lbnVcIikge1xyXG4gICAgaWYgKCFwcm9wcy5jaGlsZHJlbikgcHJvcHMuY2hpbGRyZW4gPSBidWlsZE1lbnVDaGlsZHJlbihwcm9wcy5yZW5kZXIgfHwgcHJvcHMuaXRlbXMpO1xyXG4gIH0gZWxzZSBpZiAodHlwZSA9PT0gXCJ0b2dnbGVcIiB8fCB0eXBlID09PSBcInJhZGlvXCIpIHtcclxuICAgIGNvbXBvbmVudCA9IHR5cGUgPT09IFwidG9nZ2xlXCIgPyBDb21wb25lbnRzLkNoZWNrYm94SXRlbSA6IENvbXBvbmVudHMuUmFkaW9JdGVtO1xyXG4gICAgaWYgKHByb3BzLmFjdGl2ZSkgcHJvcHMuY2hlY2tlZCA9IHByb3BzLmFjdGl2ZTtcclxuICB9IGVsc2UgaWYgKHR5cGUgPT09IFwiY29udHJvbFwiKSB7XHJcbiAgICBjb21wb25lbnQgPSBDb21wb25lbnRzLkNvbnRyb2xJdGVtO1xyXG4gIH1cclxuICBpZiAoIXByb3BzLmlkKSBwcm9wcy5pZCA9IGAke3Byb3BzLmxhYmVsLnJlcGxhY2UoL15bXmEtel0rfFteXFx3LV0rL2dpLCBcIi1cIil9YDtcclxuICBpZiAocHJvcHMuZGFuZ2VyKSBwcm9wcy5jb2xvciA9IFwiZGFuZ2VyXCI7XHJcbiAgcHJvcHMuZXh0ZW5kZWQgPSB0cnVlO1xyXG5cclxuICBpZiAodHlwZSA9PT0gXCJ0b2dnbGVcIikge1xyXG4gICAgY29uc3QgW2FjdGl2ZSwgZG9Ub2dnbGVdID0gUmVhY3QudXNlU3RhdGUocHJvcHMuY2hlY2tlZCB8fCBmYWxzZSk7XHJcbiAgICBjb25zdCBvcmlnaW5hbEFjdGlvbiA9IHByb3BzLmFjdGlvbjtcclxuICAgIHByb3BzLmNoZWNrZWQgPSBhY3RpdmU7XHJcbiAgICBwcm9wcy5hY3Rpb24gPSBmdW5jdGlvbiAoZXYpIHtcclxuICAgICAgb3JpZ2luYWxBY3Rpb24oZXYpO1xyXG4gICAgICBkb1RvZ2dsZSghYWN0aXZlKTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChjb21wb25lbnQsIHByb3BzKTtcclxufVxyXG5cclxuLy8gQ29waWVkIGZyb20gYmQncyBzb3VyY2VcclxuZnVuY3Rpb24gYnVpbGRNZW51Q2hpbGRyZW4oc2V0dXApIHtcclxuICBjb25zdCBtYXBwZXIgPSBzID0+IHtcclxuICAgIGlmIChzLnR5cGUgPT09IFwiZ3JvdXBcIikgcmV0dXJuIGJ1aWxkR3JvdXAocyk7XHJcbiAgICByZXR1cm4gYnVpbGRJdGVtKHMpO1xyXG4gIH07XHJcbiAgY29uc3QgYnVpbGRHcm91cCA9IGZ1bmN0aW9uIChncm91cCkge1xyXG4gICAgY29uc3QgaXRlbXMgPSBncm91cC5pdGVtcy5tYXAobWFwcGVyKS5maWx0ZXIoaSA9PiBpKTtcclxuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KENvbXBvbmVudHMuR3JvdXAsIG51bGwsIGl0ZW1zKTtcclxuICB9O1xyXG4gIHJldHVybiBzZXR1cC5tYXAobWFwcGVyKS5maWx0ZXIoaSA9PiBpKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIF9fY2FjaGVfXzoge1xyXG4gICAgcGF0Y2hlczogTWVudVBhdGNoZXIucGF0Y2hlcyxcclxuICAgIHN1YlBhdGNoZXM6IE1lbnVQYXRjaGVyLnN1YlBhdGNoZXNcclxuICB9LFxyXG4gIHBhdGNoKG5hdklkLCBjYikge1xyXG4gICAgaWYgKCFNZW51UGF0Y2hlci5wYXRjaGVzLmhhcyhuYXZJZCkpIE1lbnVQYXRjaGVyLnBhdGNoZXMuc2V0KG5hdklkLCBuZXcgU2V0KCkpO1xyXG4gICAgTWVudVBhdGNoZXIucGF0Y2hlcy5nZXQobmF2SWQpLmFkZChjYik7XHJcblxyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgTWVudVBhdGNoZXIucGF0Y2hlcy5nZXQobmF2SWQpLmRlbGV0ZShjYik7XHJcbiAgICB9XHJcbiAgfSxcclxuICBvcGVuKGV2ZW50LCBjb21wb25lbnQsIGNvbmZpZykge1xyXG4gICAgcmV0dXJuIEFjdGlvbnMub3BlbihldmVudCwgKGUpID0+IFJlYWN0LmNyZWF0ZUVsZW1lbnQoY29tcG9uZW50LCBPYmplY3QuYXNzaWduKHt9LCBlLCB7IG9uQ2xvc2U6IEFjdGlvbnMuY2xvc2UgfSkpLCBjb25maWcpO1xyXG4gIH0sXHJcbiAgY2xvc2UoKSB7XHJcbiAgICByZXR1cm4gQWN0aW9ucy5jbG9zZSgpO1xyXG4gIH0sXHJcbiAgYnVpbGQ6IHtcclxuICAgIGl0ZW0oc2V0dXApIHtcclxuICAgICAgcmV0dXJuIGJ1aWxkTWVudUNoaWxkcmVuKHNldHVwKTtcclxuICAgIH0sXHJcbiAgICBtZW51KHNldHVwKSB7XHJcbiAgICAgIHJldHVybiAocHJvcHMpID0+IFJlYWN0LmNyZWF0ZUVsZW1lbnQoQ29tcG9uZW50cy5NZW51LCBwcm9wcywgYnVpbGRNZW51Q2hpbGRyZW4oc2V0dXApKTtcclxuICAgIH1cclxuICB9XHJcbn07IiwgImltcG9ydCBjb21tb24gZnJvbSBcIi4uLy4uL2FwaS9tb2R1bGVzL2NvbW1vblwiO1xyXG5pbXBvcnQgbG9nZ2VyIGZyb20gXCIuLi8uLi9hcGkvdXRpbHMvbG9nZ2VyLmpzXCI7XHJcbmNvbnN0IHsgUmVhY3QgfSA9IGNvbW1vbjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVycm9yQm91bmRhcnkgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcbiAgICB0aGlzLnN0YXRlID0geyBlcnJvcjogbnVsbCB9O1xyXG4gIH1cclxuXHJcbiAgY29tcG9uZW50RGlkQ2F0Y2goZXJyb3IpIHtcclxuICAgIHRoaXMuc2V0U3RhdGUoeyBlcnJvciB9KTtcclxuICAgIGxvZ2dlci5lcnJvcihlcnJvcik7XHJcbiAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMub25FcnJvciA9PT0gXCJmdW5jdGlvblwiKSB0aGlzLnByb3BzLm9uRXJyb3IoZXJyb3IpO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgaWYgKHRoaXMuc3RhdGUuZXJyb3IpIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImFjb3JkLS1yZWFjdC1lcnJvclwiPlxyXG4gICAgICA8cD5VbmV4cGVjdGVkIFJlYWN0IEVycm9yIEhhcHBlbmVkLjwvcD5cclxuICAgICAgPHA+e2Ake3RoaXMuc3RhdGUuZXJyb3J9YH08L3A+XHJcbiAgICA8L2Rpdj47XHJcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5jaGlsZHJlbjtcclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IG9yaWdpbmFsUmVuZGVyID0gRXJyb3JCb3VuZGFyeS5wcm90b3R5cGUucmVuZGVyO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoRXJyb3JCb3VuZGFyeS5wcm90b3R5cGUsIFwicmVuZGVyXCIsIHtcclxuICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICBjb25maWd1cmFibGU6IGZhbHNlLFxyXG4gIHNldDogZnVuY3Rpb24gKCkgeyB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3Qgc2V0IHJlbmRlciBtZXRob2Qgb2YgRXJyb3JCb3VuZGFyeVwiKTsgfSxcclxuICBnZXQ6ICgpID0+IG9yaWdpbmFsUmVuZGVyXHJcbn0pOyIsICJpbXBvcnQgRXJyb3JCb3VuZGFyeSBmcm9tIFwiLi4vLi4vbGliL2NvbXBvbmVudHMvRXJyb3JCb3VuZGFyeS5qc3hcIjtcclxuaW1wb3J0IGNvbW1vbiBmcm9tIFwiLi4vbW9kdWxlcy9jb21tb24uanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBFcnJvckJvdW5kYXJ5LFxyXG4gIEJ1dHRvbjogY29tbW9uLmNvbXBvbmVudHMuQnV0dG9uLFxyXG4gIE1hcmtkb3duOiBjb21tb24uY29tcG9uZW50cy5NYXJrZG93bixcclxuICBUZXh0OiBjb21tb24uY29tcG9uZW50cy5UZXh0LFxyXG4gIENvbmZpcm1hdGlvbk1vZGFsOiBjb21tb24uY29tcG9uZW50cy5Db25maXJtYXRpb25Nb2RhbCxcclxuICBNb2RhbFJvb3Q6IGNvbW1vbi5tb2RhbHMuY29tcG9uZW50cy5Sb290LFxyXG4gIE1vZGFsQ2xvc2VCdXR0b246IGNvbW1vbi5tb2RhbHMuY29tcG9uZW50cy5vdGhlci5DbG9zZUJ1dHRvbixcclxuICBNb2RhbEhlYWRlcjogY29tbW9uLm1vZGFscy5jb21wb25lbnRzLm90aGVyLkhlYWRlcixcclxuICBNb2RhbENvbnRlbnQ6IGNvbW1vbi5tb2RhbHMuY29tcG9uZW50cy5vdGhlci5Db250ZW50LFxyXG4gIE1vZGFsRm9vdGVyOiBjb21tb24ubW9kYWxzLmNvbXBvbmVudHMub3RoZXIuRm9vdGVyLFxyXG4gIE1vZGFsTGlzdENvbnRlbnQ6IGNvbW1vbi5tb2RhbHMuY29tcG9uZW50cy5vdGhlci5MaXN0Q29udGVudCxcclxuICBUb29sdGlwOiBjb21tb24uY29tcG9uZW50cy5Ub29sdGlwLFxyXG59IiwgImltcG9ydCBFcnJvckJvdW5kYXJ5IGZyb20gXCIuLi8uLi9saWIvY29tcG9uZW50cy9FcnJvckJvdW5kYXJ5LmpzeFwiO1xyXG5pbXBvcnQgY29tbW9uIGZyb20gXCIuLi9tb2R1bGVzL2NvbW1vbi5qc1wiO1xyXG5pbXBvcnQgaTE4biBmcm9tIFwiLi4vaTE4bi9pbmRleC5qc1wiXHJcbmNvbnN0IHsgUmVhY3QsIEZsdXhEaXNwYXRjaGVyLCBjb21wb25lbnRzLCBtb2RhbHMsIFVzZXJTdG9yZSB9ID0gY29tbW9uO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIHNob3c6IHtcclxuICAgIGNvbmZpcm1hdGlvbih0aXRsZSwgY29udGVudCwgeyBjb25maXJtID0gbnVsbCwgY2FuY2VsID0gbnVsbCwgZGFuZ2VyID0gZmFsc2UsIGtleSA9IHVuZGVmaW5lZCwgdGltZW91dCA9IDYwMDAwICogNSB9ID0ge30pIHtcclxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGNvbnRlbnQpKSBjb250ZW50ID0gW2NvbnRlbnRdO1xyXG4gICAgICAgIGNvbnRlbnQgPSBjb250ZW50Lm1hcChpID0+IHR5cGVvZiBpID09PSBcInN0cmluZ1wiID8gUmVhY3QuY3JlYXRlRWxlbWVudChjb21wb25lbnRzLk1hcmtkb3duLCBudWxsLCBpKSA6IGkpO1xyXG4gICAgICAgIGNvbnN0IG1vZGFsS2V5ID0gbW9kYWxzLmFjdGlvbnMub3BlbigocHJvcHMpID0+IHtcclxuICAgICAgICAgIGxldCBpbnRlcmFjdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICByZXR1cm4gPEVycm9yQm91bmRhcnkgb25FcnJvcj17KCkgPT4geyByZXNvbHZlKGZhbHNlKTsgfX0+XHJcbiAgICAgICAgICAgIDxjb21wb25lbnRzLkNvbmZpcm1hdGlvbk1vZGFsXHJcbiAgICAgICAgICAgICAgaGVhZGVyPXt0aXRsZX1cclxuICAgICAgICAgICAgICBjb25maXJtQnV0dG9uQ29sb3I9e2RhbmdlciA/IGNvbXBvbmVudHMuQnV0dG9uLkNvbG9ycy5SRUQgOiBjb21wb25lbnRzLkJ1dHRvbi5Db2xvcnMuQlJBTkR9XHJcbiAgICAgICAgICAgICAgY29uZmlybVRleHQ9e2NvbmZpcm0gfHwgaTE4bi5mb3JtYXQoXCJDT05GSVJNXCIpfVxyXG4gICAgICAgICAgICAgIGNhbmNlbFRleHQ9e2NhbmNlbH1cclxuICAgICAgICAgICAgICBvbkNhbmNlbD17KCkgPT4geyByZXNvbHZlKGZhbHNlKTsgbW9kYWxzLmFjdGlvbnMuY2xvc2UobW9kYWxLZXkpOyBpbnRlcmFjdGVkID0gdHJ1ZTsgfX1cclxuICAgICAgICAgICAgICBvbkNvbmZpcm09eygpID0+IHsgcmVzb2x2ZSh0cnVlKTsgbW9kYWxzLmFjdGlvbnMuY2xvc2UobW9kYWxLZXkpOyBpbnRlcmFjdGVkID0gdHJ1ZTsgfX1cclxuICAgICAgICAgICAgICB7Li4ucHJvcHN9XHJcbiAgICAgICAgICAgICAgb25DbG9zZT17KCkgPT4geyBwcm9wcy5vbkNsb3NlKCk7IHJlc29sdmUoZmFsc2UpOyBtb2RhbHMuYWN0aW9ucy5jbG9zZShtb2RhbEtleSk7IH19XHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICA8RXJyb3JCb3VuZGFyeSBvbkVycm9yPXsoKSA9PiB7IHJlc29sdmUoZmFsc2UpOyB9fT5cclxuICAgICAgICAgICAgICAgIHtjb250ZW50fVxyXG4gICAgICAgICAgICAgIDwvRXJyb3JCb3VuZGFyeT5cclxuICAgICAgICAgICAgPC9jb21wb25lbnRzLkNvbmZpcm1hdGlvbk1vZGFsPlxyXG4gICAgICAgICAgPC9FcnJvckJvdW5kYXJ5PlxyXG4gICAgICAgIH0sIHsgbW9kYWxLZXk6IGtleSB9KTtcclxuICAgICAgICBpZiAodGltZW91dCkge1xyXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghaW50ZXJhY3RlZCkge1xyXG4gICAgICAgICAgICAgIHJlc29sdmUoZmFsc2UpO1xyXG4gICAgICAgICAgICAgIG1vZGFscy5hY3Rpb25zLmNsb3NlKG1vZGFsS2V5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSwgdGltZW91dCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICB1c2VyKHVzZXJJZCkge1xyXG4gICAgICBpZiAoIVVzZXJTdG9yZS5nZXRVc2VyKHVzZXJJZCkpIHJldHVybiBmYWxzZTtcclxuICAgICAgRmx1eERpc3BhdGNoZXIuZGlzcGF0Y2goeyB0eXBlOiBcIlVTRVJfUFJPRklMRV9NT0RBTF9PUEVOXCIsIHVzZXJJZCB9KTtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9LFxyXG4gICAgYWxlcnQodGl0bGUsIGNvbnRlbnQsIHsgY29uZmlybSA9IG51bGwsIGtleSA9IHVuZGVmaW5lZCwgdGltZW91dCA9IDYwMDAwICogNSB9ID0ge30pIHtcclxuICAgICAgcmV0dXJuIHRoaXMuY29uZmlybWF0aW9uKHRpdGxlLCBjb250ZW50LCB7IGNvbmZpcm0sIGNhbmNlbDogbnVsbCwga2V5LCB0aW1lb3V0IH0pO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgY2xvc2Uoa2V5KSB7XHJcbiAgICByZXR1cm4gbW9kYWxzLmFjdGlvbnMuY2xvc2Uoa2V5KTtcclxuICB9XHJcbn0iLCAiaW1wb3J0IGRvbSBmcm9tIFwiLi4vZG9tL2luZGV4LmpzXCI7XHJcblxyXG5mdW5jdGlvbiBnZXRDb250YWluZXIoKSB7XHJcbiAgY29uc3QgYXBwRWxtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2NsYXNzKj1cIm5vdEFwcEFzaWRlUGFuZWwtXCJdJyk7XHJcblxyXG4gIGxldCB0b3BDb250YWluZXIgPSBhcHBFbG0ucXVlcnlTZWxlY3RvcihcIi5hY29yZC0tdG9hc3RzLWNvbnRhaW5lclwiKTtcclxuICBpZiAoIXRvcENvbnRhaW5lcikge1xyXG4gICAgdG9wQ29udGFpbmVyID0gZG9tLnBhcnNlKGA8ZGl2IGNsYXNzPVwiYWNvcmQtLWxheWVyLWNvbnRhaW5lciBhY29yZC0tdG9hc3RzLWNvbnRhaW5lclwiPjwvZGl2PmApO1xyXG4gICAgYXBwRWxtLmFwcGVuZENoaWxkKHRvcENvbnRhaW5lcik7XHJcbiAgfVxyXG4gIHRvcENvbnRhaW5lci5zdHlsZS5zZXRQcm9wZXJ0eShcIi0tdG9wLW9mZnNldFwiLCBgJHthcHBFbG0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wLnRvRml4ZWQoMSl9cHhgKTtcclxuXHJcbiAgcmV0dXJuIHRvcENvbnRhaW5lcjtcclxufVxyXG5cclxuY29uc3QgaWNvbnMgPSB7XHJcbiAgaW5mbzogYDxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiPjxwYXRoIGQ9XCJNMTIgMjJDNi40NzcgMjIgMiAxNy41MjMgMiAxMlM2LjQ3NyAyIDEyIDJzMTAgNC40NzcgMTAgMTAtNC40NzcgMTAtMTAgMTB6bS0xLTExdjZoMnYtNmgtMnptMC00djJoMlY3aC0yelwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIiAvPjwvc3ZnPmAsXHJcbiAgd2FybmluZzogYDxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiPjxwYXRoIGQ9XCJNMTIgMjJDNi40NzcgMjIgMiAxNy41MjMgMiAxMlM2LjQ3NyAyIDEyIDJzMTAgNC40NzcgMTAgMTAtNC40NzcgMTAtMTAgMTB6bS0xLTd2Mmgydi0yaC0yem0wLTh2NmgyVjdoLTJ6XCIgZmlsbD1cImN1cnJlbnRDb2xvclwiIC8+PC9zdmc+YCxcclxuICBlcnJvcjogYDxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiPjxwYXRoIGQ9XCJNMTIgMjJDNi40NzcgMjIgMiAxNy41MjMgMiAxMlM2LjQ3NyAyIDEyIDJzMTAgNC40NzcgMTAgMTAtNC40NzcgMTAtMTAgMTB6bS0xLTd2Mmgydi0yaC0yem0wLTh2NmgyVjdoLTJ6XCJmaWxsPVwiY3VycmVudENvbG9yXCIgLz48L3N2Zz5gLFxyXG4gIHN1Y2Nlc3M6IGA8c3ZnIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMjRcIj48cGF0aCBkPVwiTTEyIDIyQzYuNDc3IDIyIDIgMTcuNTIzIDIgMTJTNi40NzcgMiAxMiAyczEwIDQuNDc3IDEwIDEwLTQuNDc3IDEwLTEwIDEwem0tLjk5Ny02bDcuMDctNy4wNzEtMS40MTQtMS40MTQtNS42NTYgNS42NTctMi44MjktMi44MjktMS40MTQgMS40MTRMMTEuMDAzIDE2elwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIiAvPjwvc3ZnPmBcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIHNob3coXHJcbiAgY29udGVudCxcclxuICB7XHJcbiAgICBzdHlsZSA9IFwiZGVmYXVsdFwiLFxyXG4gICAgdGltZW91dCA9IDM1MDAsXHJcbiAgICBvbkNsaWNrID0gbnVsbCxcclxuICAgIGhpZGVJY29uID0gZmFsc2VcclxuICB9ID0ge31cclxuKSB7XHJcbiAgY29uc3QgY29udGFpbmVyID0gZ2V0Q29udGFpbmVyKCk7XHJcblxyXG4gIGNvbnN0IHRvYXN0RWxtID0gZG9tLnBhcnNlKGBcclxuICAgIDxkaXYgY2xhc3M9XCJhY29yZC0tdG9hc3Qgc3R5bGUtJHtzdHlsZX0gaGlkZGVuXCI+XHJcbiAgICAgICR7aGlkZUljb24gPyBcIlwiIDogKGljb25zW3N0eWxlXSB8fCBcIlwiKX1cclxuICAgICAgPGRpdiBjbGFzcz1cImNvbnRlbnRcIj48L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIGApO1xyXG5cclxuICB0b2FzdEVsbS5xdWVyeVNlbGVjdG9yKFwiLmNvbnRlbnRcIikuaW5uZXJIVE1MID0gY29udGVudDtcclxuXHJcbiAgbGV0IGNsb3NlZCA9IGZhbHNlO1xyXG4gIGZ1bmN0aW9uIGNsb3NlKCkge1xyXG4gICAgaWYgKGNsb3NlZCkgcmV0dXJuO1xyXG4gICAgY2xvc2VkID0gdHJ1ZTtcclxuXHJcbiAgICB0b2FzdEVsbS5jbGFzc0xpc3QuYWRkKFwiY2xvc2luZ1wiKTtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICB0b2FzdEVsbS5yZW1vdmUoKTtcclxuXHJcbiAgICAgIHV0aWxzLmlmRXhpc3RzKFxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5hY29yZC0tdG9hc3RzLWNvbnRhaW5lcmApLFxyXG4gICAgICAgIC8qKiBAcGFyYW0ge0hUTUxEaXZFbGVtZW50fSBlbG0gKi8oZWxtKSA9PiB7XHJcbiAgICAgICAgICBpZiAoIWVsbS5jaGlsZEVsZW1lbnRDb3VudCkgZWxtLnJlbW92ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgKTtcclxuICAgIH0sIDI3NSk7XHJcbiAgfVxyXG5cclxuICBpZiAodHlwZW9mIG9uQ2xpY2sgPT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICB0b2FzdEVsbS5jbGFzc0xpc3QuYWRkKFwiY2xpY2thYmxlXCIpO1xyXG4gICAgdG9hc3RFbG0ub25jbGljayA9ICgpID0+IHtcclxuICAgICAgb25DbGljayhjbG9zZSk7XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKHRvYXN0RWxtKTtcclxuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xyXG4gICAgdG9hc3RFbG0uY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcclxuICB9KTtcclxuXHJcbiAgc2V0VGltZW91dChjbG9zZSwgdGltZW91dCk7XHJcblxyXG4gIHJldHVybiAoKSA9PiB7XHJcbiAgICBjbG9zZSgpO1xyXG4gIH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBzaG93OiBPYmplY3QuYXNzaWduKHNob3csIHtcclxuICAgIGluZm86IChodG1sLCBvYmogPSB7fSkgPT4gc2hvdyhodG1sLCB7IC4uLm9iaiwgc3R5bGU6IFwiaW5mb1wiIH0pLFxyXG4gICAgZXJyb3I6IChodG1sLCBvYmogPSB7fSkgPT4gc2hvdyhodG1sLCB7IC4uLm9iaiwgc3R5bGU6IFwiZXJyb3JcIiB9KSxcclxuICAgIHdhcm5pbmc6IChodG1sLCBvYmogPSB7fSkgPT4gc2hvdyhodG1sLCB7IC4uLm9iaiwgc3R5bGU6IFwid2FybmluZ1wiIH0pLFxyXG4gICAgc3VjY2VzczogKGh0bWwsIG9iaiA9IHt9KSA9PiBzaG93KGh0bWwsIHsgLi4ub2JqLCBzdHlsZTogXCJzdWNjZXNzXCIgfSlcclxuICB9KVxyXG59IiwgImltcG9ydCB3ZWJwYWNrIGZyb20gXCIuLi8uLi8uLi8uLi8uLi9hcGkvbW9kdWxlcy93ZWJwYWNrLmpzXCI7XHJcblxyXG5jb25zdCBidXR0b25DbGFzc2VzID0gd2VicGFjay5maW5kQnlQcm9wZXJ0aWVzKFwibG93U2F0dXJhdGlvblVuZGVybGluZVwiLCBcImJ1dHRvblwiLCBcImRpc2FibGVkQnV0dG9uT3ZlcmxheVwiKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAvKiogQHBhcmFtIHtpbXBvcnQoXCJ2dWVcIikuQXBwfSB2dWVBcHAgKi9cclxuICBsb2FkKHZ1ZUFwcCkge1xyXG4gICAgdnVlQXBwLmNvbXBvbmVudChcImRpc2NvcmQtYnV0dG9uXCIsIHtcclxuICAgICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8ZGl2IGNsYXNzPVwiJHtidXR0b25DbGFzc2VzLmJ1dHRvbn0gJHtidXR0b25DbGFzc2VzLmxvb2tGaWxsZWR9ICR7YnV0dG9uQ2xhc3Nlcy5ncm93fVwiIDpjbGFzcz1cIlxcYFxcJHtjb2xvciA/IGJ1dHRvbkNsYXNzZXNbXFxgY29sb3JcXCR7Y29sb3JbMF0udG9VcHBlckNhc2UoKX1cXCR7Y29sb3Iuc2xpY2UoMSkudG9Mb3dlckNhc2UoKX1cXGBdIDogYnV0dG9uQ2xhc3Nlcy5jb2xvckJyYW5kfSBcXCR7c2l6ZSA/IGJ1dHRvbkNsYXNzZXNbXFxgc2l6ZVxcJHtzaXplWzBdLnRvVXBwZXJDYXNlKCl9XFwke3NpemUuc2xpY2UoMSkudG9Mb3dlckNhc2UoKX1cXGBdIDogYnV0dG9uQ2xhc3Nlcy5zaXplU21hbGx9XFxgXCIgQGNsaWNrPVwib25DbGlja1wiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cIiR7YnV0dG9uQ2xhc3Nlcy5jb250ZW50c31cIj57e3ZhbHVlfX08L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgYCxcclxuICAgICAgcHJvcHM6IFtcInZhbHVlXCIsIFwic2l6ZVwiLCBcImNvbG9yXCJdLFxyXG4gICAgICBlbWl0czogW1wiY2xpY2tcIl0sXHJcbiAgICAgIGRhdGEoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIGJ1dHRvbkNsYXNzZXNcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIG1ldGhvZHM6IHtcclxuICAgICAgICBvbkNsaWNrKGUpIHtcclxuICAgICAgICAgIHRoaXMuJGVtaXQoXCJjbGlja1wiLCBlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufSIsICJleHBvcnQgZGVmYXVsdCBgXG4uYWNvcmQtLWRpc2NvcmQtY2hlY2t7Y29sb3I6dmFyKC0td2hpdGUtNzAwKTtiYWNrZ3JvdW5kLWNvbG9yOmN1cnJlbnRDb2xvcjt6LWluZGV4OjB9LmFjb3JkLS1kaXNjb3JkLWNoZWNrIC5zbGlkZXJ7dHJhbnNpdGlvbjoxMDBtcyBlYXNlLWluLW91dCBhbGw7bGVmdDotM3B4fS5hY29yZC0tZGlzY29yZC1jaGVjay5jaGVja2Vke2NvbG9yOnZhcigtLWdyZWVuLTQwMCl9LmFjb3JkLS1kaXNjb3JkLWNoZWNrLmNoZWNrZWQgLnNsaWRlcnt0cmFuc2l0aW9uOjEwMG1zIGVhc2UtaW4tb3V0IGFsbDtsZWZ0OjEycHh9YDtcbiIsICJpbXBvcnQgd2VicGFjayBmcm9tIFwiLi4vLi4vLi4vLi4vbW9kdWxlcy93ZWJwYWNrLmpzXCI7XHJcbmltcG9ydCBwYXRjaGVyIGZyb20gXCIuLi8uLi8uLi8uLi9wYXRjaGVyL2luZGV4LmpzXCI7XHJcbmltcG9ydCBjc3NUZXh0IGZyb20gXCIuL3N0eWxlLnNjc3NcIjtcclxucGF0Y2hlci5pbmplY3RDU1MoY3NzVGV4dCk7XHJcblxyXG5jb25zdCBjaGVja0NsYXNzZXMgPSB3ZWJwYWNrLmZpbmRCeVByb3BlcnRpZXMoXCJjaGVja2VkXCIsIFwiY29udGFpbmVyXCIsIFwic2xpZGVyXCIpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIC8qKiBAcGFyYW0ge2ltcG9ydChcInZ1ZVwiKS5BcHB9IHZ1ZUFwcCAqL1xyXG4gIGxvYWQodnVlQXBwKSB7XHJcbiAgICB2dWVBcHAuY29tcG9uZW50KFwiZGlzY29yZC1jaGVja1wiLCB7XHJcbiAgICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cIiR7Y2hlY2tDbGFzc2VzLmNvbnRhaW5lcn0gZGVmYXVsdC1jb2xvcnMgYWNvcmQtLWRpc2NvcmQtY2hlY2tcIiBcclxuICAgICAgICAgIDpjbGFzcz1cInsnJHtjaGVja0NsYXNzZXMuY2hlY2tlZH0nOiB2YWx1ZSwgJ2NoZWNrZWQnOiBtb2RlbFZhbHVlfVwiIFxyXG4gICAgICAgICAgQGNsaWNrPVwib25DbGlja1wiXHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPHN2ZyBjbGFzcz1cIiR7Y2hlY2tDbGFzc2VzLnNsaWRlcn0gc2xpZGVyXCIgdmlld0JveD1cIjAgMCAyOCAyMFwiIHByZXNlcnZlQXNwZWN0UmF0aW89XCJ4TWluWU1pZCBtZWV0XCI+XHJcbiAgICAgICAgICAgIDxyZWN0IGZpbGw9XCJ3aGl0ZVwiIHg9XCI0XCIgeT1cIjBcIiByeD1cIjEwXCIgd2lkdGg9XCIyMFwiIGhlaWdodD1cIjIwXCI+PC9yZWN0PlxyXG4gICAgICAgICAgICA8c3ZnIHYtaWY9XCJtb2RlbFZhbHVlXCIgdmlld0JveD1cIjAgMCAyMCAyMFwiIGZpbGw9XCJub25lXCI+XHJcbiAgICAgICAgICAgICAgPHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNNy44OTU2MSAxNC44NTM4TDYuMzA0NjIgMTMuMjYyOUwxNC4zMDk5IDUuMjU3NTVMMTUuOTAwOSA2Ljg0ODU0TDcuODk1NjEgMTQuODUzOFpcIj48L3BhdGg+XHJcbiAgICAgICAgICAgICAgPHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNNC4wODY0MyAxMS4wOTAzTDUuNjc3NDIgOS40OTkyOUw5LjQ0ODUgMTMuMjcwNEw3Ljg1NzUxIDE0Ljg2MTRMNC4wODY0MyAxMS4wOTAzWlwiPjwvcGF0aD5cclxuICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICAgIDxzdmcgdi1lbHNlIHZpZXdCb3g9XCIwIDAgMjAgMjBcIiBmaWxsPVwibm9uZVwiPlxyXG4gICAgICAgICAgICAgIDxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTUuMTMyMzEgNi43Mjk2M0w2LjcyMzMgNS4xMzg2NEwxNC44NTUgMTMuMjcwNEwxMy4yNjQgMTQuODYxNEw1LjEzMjMxIDYuNzI5NjNaXCI+PC9wYXRoPlxyXG4gICAgICAgICAgICAgIDxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTEzLjI3MDQgNS4xMzg2NEwxNC44NjE0IDYuNzI5NjNMNi43Mjk2MyAxNC44NjE0TDUuMTM4NjQgMTMuMjcwNEwxMy4yNzA0IDUuMTM4NjRaXCI+PC9wYXRoPlxyXG4gICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICBgLFxyXG4gICAgICBwcm9wczoge1xyXG4gICAgICAgIG1vZGVsVmFsdWU6IHtcclxuICAgICAgICAgIGRlZmF1bHQoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIGVtaXRzOiBbJ3VwZGF0ZTptb2RlbFZhbHVlJywgJ2NoYW5nZSddLFxyXG4gICAgICBtZXRob2RzOiB7XHJcbiAgICAgICAgb25DbGljayhldmVudCkge1xyXG4gICAgICAgICAgbGV0IG5ld1ZhbHVlID0gIXRoaXMubW9kZWxWYWx1ZTtcclxuICAgICAgICAgIHRoaXMuJGVtaXQoXCJ1cGRhdGU6bW9kZWxWYWx1ZVwiLCBuZXdWYWx1ZSk7XHJcbiAgICAgICAgICB0aGlzLiRlbWl0KFwiY2hhbmdlXCIsIHsgdmFsdWU6IG5ld1ZhbHVlLCBldmVudCB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufSIsICJpbXBvcnQgd2VicGFjayBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vYXBpL21vZHVsZXMvd2VicGFjay5qc1wiO1xyXG5cclxubGV0IGlucHV0Q2xhc3NlcyA9IHdlYnBhY2suZmluZEJ5UHJvcGVydGllcyhcImlucHV0RGVmYXVsdFwiLCBcImNvcHlJbnB1dFwiKTtcclxubGV0IGlucHV0Q2xhc3NlczIgPSB3ZWJwYWNrLmZpbmRCeVByb3BlcnRpZXMoXCJpbnB1dFwiLCBcImVkaXRhYmxlXCIsIFwiZGlzYWJsZWRcIiwgXCJpbnB1dFdyYXBwZXJcIik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgLyoqIEBwYXJhbSB7aW1wb3J0KFwidnVlXCIpLkFwcH0gdnVlQXBwICovXHJcbiAgbG9hZCh2dWVBcHApIHtcclxuICAgIHZ1ZUFwcC5jb21wb25lbnQoXCJkaXNjb3JkLWlucHV0XCIsIHtcclxuICAgICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8ZGl2IGNsYXNzPVwiJHtpbnB1dENsYXNzZXMyPy5pbnB1dH1cIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCIke2lucHV0Q2xhc3Nlcz8uaW5wdXRXcmFwcGVyfVwiPlxyXG4gICAgICAgICAgICA8aW5wdXQgOnR5cGU9XCJ0eXBlID8/ICd0ZXh0J1wiIGNsYXNzPVwiJHtpbnB1dENsYXNzZXM/LmlucHV0RGVmYXVsdH1cIiB2LWJpbmQ9XCJ2YWx1ZVwiIDpwbGFjZWhvbGRlcj1cInBsYWNlaG9sZGVyXCIgOm1heGxlbmd0aD1cIm1heGxlbmd0aFwiIDpzdHlsZT1cInN0eWxlXCIgQGNoYW5nZT1cIm9uQ2hhbmdlXCIgLz5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICBgLFxyXG4gICAgICBwcm9wczogW1widmFsdWVcIiwgXCJwbGFjZWhvbGRlclwiLCBcInR5cGVcIiwgXCJtYXhsZW5ndGhcIiwgXCJzdHlsZVwiXSxcclxuICAgICAgZW1pdHM6IFtcImNoYW5nZVwiXSxcclxuICAgICAgbWV0aG9kczoge1xyXG4gICAgICAgIG9uQ2hhbmdlKGV2ZW50KSB7XHJcbiAgICAgICAgICB0aGlzLiRlbWl0KFwiY2hhbmdlXCIsIHsgZXZlbnQsIHZhbHVlOiBldmVudC50YXJnZXQudmFsdWUgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn0iLCAiZXhwb3J0IGRlZmF1bHQgYFxuLmFjb3JkLS1kaXNjb3JkLXNlbGVjdHtwb3NpdGlvbjpyZWxhdGl2ZTt3aWR0aDoxMDAlfS5hY29yZC0tZGlzY29yZC1zZWxlY3Q+Lm9wdGlvbnN7cG9zaXRpb246YWJzb2x1dGU7dG9wOjEwMCU7d2lkdGg6MTAwJTttYXgtaGVpZ2h0OjI4NnB4O292ZXJmbG93LXg6aGlkZGVuO292ZXJmbG93LXk6c2Nyb2xsO3otaW5kZXg6MX0uYWNvcmQtLWRpc2NvcmQtc2VsZWN0Pi5vcHRpb25zLnRvcC1wb3BvdXR7dG9wOmF1dG87Ym90dG9tOjEwMCV9YDtcbiIsICJpbXBvcnQgd2VicGFjayBmcm9tIFwiLi4vLi4vLi4vLi4vbW9kdWxlcy93ZWJwYWNrLmpzXCI7XHJcbmltcG9ydCBwYXRjaGVyIGZyb20gXCIuLi8uLi8uLi8uLi9wYXRjaGVyL2luZGV4LmpzXCI7XHJcblxyXG5pbXBvcnQgY3NzVGV4dCBmcm9tIFwiLi9zdHlsZS5zY3NzXCI7XHJcbnBhdGNoZXIuaW5qZWN0Q1NTKGNzc1RleHQpO1xyXG5cclxuY29uc3Qgc2VsZWN0Q2xhc3NlcyA9IHdlYnBhY2suZmluZEJ5UHJvcGVydGllcyhcInNlbGVjdFwiLCBcInNlYXJjaGFibGVTZWxlY3RcIiwgXCJtdWx0aVNlbGVjdENoZWNrXCIpO1xyXG5jb25zdCBzY3JvbGxDbGFzc2VzID0gd2VicGFjay5maW5kQnlQcm9wZXJ0aWVzKFwibWFuYWdlZFJlYWN0aXZlU2Nyb2xsZXJcIiwgXCJzY3JvbGxlckJhc2VcIiwgXCJ0aGluXCIpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIC8qKiBAcGFyYW0ge2ltcG9ydChcInZ1ZVwiKS5BcHB9IHZ1ZUFwcCAqL1xyXG4gIGxvYWQodnVlQXBwKSB7XHJcbiAgICB2dWVBcHAuY29tcG9uZW50KFwiZGlzY29yZC1zZWxlY3RcIiwge1xyXG4gICAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCIke3NlbGVjdENsYXNzZXMuc2VsZWN0fSAke3NlbGVjdENsYXNzZXMubG9va0ZpbGxlZH0gYWNvcmQtLWRpc2NvcmQtc2VsZWN0XCIgOmNsYXNzPVwieycke3NlbGVjdENsYXNzZXMub3Blbn0nOiBhY3RpdmV9XCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiJHtzZWxlY3RDbGFzc2VzLnZhbHVlfVwiPnt7b3B0aW9ucy5maW5kKGk9PmkudmFsdWUgPT09IG1vZGVsVmFsdWUpPy5sYWJlbH19PC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiJHtzZWxlY3RDbGFzc2VzLmljb25zfVwiPlxyXG4gICAgICAgICAgICAgIDxzdmcgdi1pZj1cIiFhY3RpdmVcIiBjbGFzcz1cImljb25cIiB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMjRcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+PHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNMTYuNTkgOC41OTAwM0wxMiAxMy4xN0w3LjQxIDguNTkwMDNMNiAxMEwxMiAxNkwxOCAxMEwxNi41OSA4LjU5MDAzWlwiPjwvcGF0aD48L3N2Zz5cclxuICAgICAgICAgICAgICA8c3ZnIHYtZWxzZSBjbGFzcz1cImljb25cIiB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMjRcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+PHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNNy40MSAxNi4wMDAxTDEyIDExLjQyMDFMMTYuNTkgMTYuMDAwMUwxOCAxNC41OTAxTDEyIDguNTkwMDZMNiAxNC41OTAxTDcuNDEgMTYuMDAwMVpcIj48L3BhdGg+PC9zdmc+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgdi1pZj1cImFjdGl2ZVwiIGNsYXNzPVwib3B0aW9ucyAke3NlbGVjdENsYXNzZXMucG9wb3V0fSAke3Njcm9sbENsYXNzZXMuc2Nyb2xsZXJCYXNlfSAke3Njcm9sbENsYXNzZXMudGhpbn1cIiA6Y2xhc3M9XCJ7J3RvcC1wb3BvdXQnOiBwb3BvdXRQb3NpdGlvbiA9PT0gJ3RvcCd9XCI+XHJcbiAgICAgICAgICAgIDxkaXYgdi1mb3I9XCJvcHRpb24gaW4gb3B0aW9uc1wiIGNsYXNzPVwib3B0aW9uICR7c2VsZWN0Q2xhc3Nlcy5vcHRpb259XCIgQGNsaWNrPVwib25PcHRpb25DbGljaygkZXZlbnQsIG9wdGlvbilcIiA6a2V5PVwib3B0aW9uLnZhbHVlXCIgOmFyaWEtc2VsZWN0ZWQ9XCJcXGBcXCR7bW9kZWxWYWx1ZSA9PT0gb3B0aW9uLnZhbHVlfVxcYFwiPlxyXG4gICAgICAgICAgICAgIHt7b3B0aW9uLmxhYmVsfX1cclxuICAgICAgICAgICAgICA8c3ZnIHYtaWY9XCJtb2RlbFZhbHVlID09PSBvcHRpb24udmFsdWVcIiBjbGFzcz1cIiR7c2VsZWN0Q2xhc3Nlcy5zZWxlY3RlZEljb259XCIgcm9sZT1cImltZ1wiIHdpZHRoPVwiMjBcIiBoZWlnaHQ9XCIyMFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+PGNpcmNsZSByPVwiOFwiIGN4PVwiMTJcIiBjeT1cIjEyXCIgZmlsbD1cIndoaXRlXCI+PC9jaXJjbGU+PGcgZmlsbD1cIm5vbmVcIiBmaWxsLXJ1bGU9XCJldmVub2RkXCI+PHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNMTIgMkM2LjQ4IDIgMiA2LjQ4IDIgMTJzNC40OCAxMCAxMCAxMCAxMC00LjQ4IDEwLTEwUzE3LjUyIDIgMTIgMnptLTIgMTVsLTUtNSAxLjQxLTEuNDFMMTAgMTQuMTdsNy41OS03LjU5TDE5IDhsLTkgOXpcIj48L3BhdGg+PC9nPjwvc3ZnPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICBgLFxyXG4gICAgICBkYXRhKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICBzZWxlY3RDbGFzc2VzLFxyXG4gICAgICAgICAgYWN0aXZlOiBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgcHJvcHM6IFtcIm9wdGlvbnNcIiwgXCJtb2RlbFZhbHVlXCIsIFwicG9wb3V0UG9zaXRpb25cIl0sXHJcbiAgICAgIGVtaXRzOiBbJ3VwZGF0ZTptb2RlbFZhbHVlJywgXCJjaGFuZ2VcIl0sXHJcbiAgICAgIG1vdW50ZWQoKSB7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLm9uQ2xpY2spO1xyXG4gICAgICB9LFxyXG4gICAgICB1bm1vdW50ZWQoKSB7XHJcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLm9uQ2xpY2spO1xyXG4gICAgICB9LFxyXG4gICAgICBtZXRob2RzOiB7XHJcbiAgICAgICAgb25PcHRpb25DbGljayhldmVudCwgb3B0aW9uKSB7XHJcbiAgICAgICAgICB0aGlzLiRlbWl0KFwidXBkYXRlOm1vZGVsVmFsdWVcIiwgb3B0aW9uLnZhbHVlKTtcclxuICAgICAgICAgIHRoaXMuJGVtaXQoXCJjaGFuZ2VcIiwgeyB2YWx1ZTogb3B0aW9uLnZhbHVlLCBldmVudCB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uQ2xpY2soZSkge1xyXG4gICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoc2VsZWN0Q2xhc3Nlcy5zZWxlY3QpXHJcbiAgICAgICAgICAgIHx8IGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhzZWxlY3RDbGFzc2VzLnZhbHVlKVxyXG4gICAgICAgICAgICB8fCBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoc2VsZWN0Q2xhc3Nlcy5pY29ucylcclxuICAgICAgICAgICAgfHwgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKHNlbGVjdENsYXNzZXMucG9wb3V0KVxyXG4gICAgICAgICAgICB8fCBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoc2VsZWN0Q2xhc3Nlcy5vcHRpb24pXHJcbiAgICAgICAgICAgIHx8IGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImljb25cIilcclxuICAgICAgICAgICkge1xyXG4gICAgICAgICAgICB0aGlzLmFjdGl2ZSA9ICF0aGlzLmFjdGl2ZTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufSIsICJleHBvcnQgZGVmYXVsdCBgXG4uYWNvcmQtLWRpc2NvcmQtdGV4dGFyZWF7d2lkdGg6MTAwJX1gO1xuIiwgImltcG9ydCB3ZWJwYWNrIGZyb20gXCIuLi8uLi8uLi8uLi9tb2R1bGVzL3dlYnBhY2suanNcIjtcclxuaW1wb3J0IHBhdGNoZXIgZnJvbSBcIi4uLy4uLy4uLy4uL3BhdGNoZXIvaW5kZXguanNcIjtcclxuXHJcbmltcG9ydCBjc3NUZXh0IGZyb20gXCIuL3N0eWxlLnNjc3NcIjtcclxucGF0Y2hlci5pbmplY3RDU1MoY3NzVGV4dCk7XHJcblxyXG5sZXQgaW5wdXRDbGFzc2VzID0gd2VicGFjay5maW5kQnlQcm9wZXJ0aWVzKFwidGV4dEFyZWFcIiwgXCJtYXhMZW5ndGhcIiwgXCJjaGFyYWN0ZXJDb3VudFwiKTtcclxubGV0IGlucHV0Q2xhc3NlczIgPSB3ZWJwYWNrLmZpbmRCeVByb3BlcnRpZXMoXCJpbnB1dFdyYXBwZXJcIiwgXCJpbnB1dERlZmF1bHRcIik7XHJcbmxldCBzY3JvbGxDbGFzc2VzID0gd2VicGFjay5maW5kQnlQcm9wZXJ0aWVzKFwic2Nyb2xsYmFyRGVmYXVsdFwiLCBcInNjcm9sbGJhclwiLCBcInNjcm9sbGJhckdob3N0XCIpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIC8qKiBAcGFyYW0ge2ltcG9ydChcInZ1ZVwiKS5BcHB9IHZ1ZUFwcCAqL1xyXG4gIGxvYWQodnVlQXBwKSB7XHJcbiAgICB2dWVBcHAuY29tcG9uZW50KFwiZGlzY29yZC10ZXh0YXJlYVwiLCB7XHJcbiAgICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cIiR7aW5wdXRDbGFzc2VzMi5pbnB1dFdyYXBwZXJ9IGFjb3JkLS1kaXNjb3JkLXRleHRhcmVhXCI+XHJcbiAgICAgICAgICA8dGV4dGFyZWEgY2xhc3M9XCIke2lucHV0Q2xhc3NlczIuaW5wdXREZWZhdWx0fSAke2lucHV0Q2xhc3Nlcy50ZXh0QXJlYX0gJHtzY3JvbGxDbGFzc2VzLnNjcm9sbGJhckRlZmF1bHR9XCIgdi1iaW5kPVwidmFsdWVcIiA6cGxhY2Vob2xkZXI9XCJwbGFjZWhvbGRlclwiIDptYXhsZW5ndGg9XCJtYXhsZW5ndGhcIiA6Y29scz1cImNvbHNcIiA6cm93cz1cInJvd3NcIiA6c3R5bGU9XCJzdHlsZVwiPjwvdGV4dGFyZWE+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIGAsXHJcbiAgICAgIHByb3BzOiBbXCJ2YWx1ZVwiLCBcInBsYWNlaG9sZGVyXCIsIFwibWF4bGVuZ3RoXCIsIFwic3R5bGVcIiwgXCJjb2xzXCIsIFwicm93c1wiXSxcclxuICAgICAgZW1pdHM6IFtcImNoYW5nZVwiXSxcclxuICAgICAgbWV0aG9kczoge1xyXG4gICAgICAgIG9uQ2hhbmdlKGV2ZW50KSB7XHJcbiAgICAgICAgICB0aGlzLiRlbWl0KFwiY2hhbmdlXCIsIHsgZXZlbnQsIHZhbHVlOiBldmVudC50YXJnZXQudmFsdWUgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIiwgImltcG9ydCBkaXNjb3JkQnV0dG9uIGZyb20gXCIuL2Rpc2NvcmQtYnV0dG9uL2luZGV4LmpzXCI7XHJcbmltcG9ydCBkaXNjb3JkQ2hlY2sgZnJvbSBcIi4vZGlzY29yZC1jaGVjay9pbmRleC5qc1wiO1xyXG5pbXBvcnQgZGlzY29yZElucHV0IGZyb20gXCIuL2Rpc2NvcmQtaW5wdXQvaW5kZXguanNcIjtcclxuaW1wb3J0IGRpc2NvcmRTZWxlY3QgZnJvbSBcIi4vZGlzY29yZC1zZWxlY3QvaW5kZXguanNcIjtcclxuaW1wb3J0IGRpc2NvcmRUZXh0YXJlYSBmcm9tIFwiLi9kaXNjb3JkLXRleHRhcmVhL2luZGV4LmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgbG9hZCh2dWVBcHApIHtcclxuICAgIGRpc2NvcmRDaGVjay5sb2FkKHZ1ZUFwcCk7XHJcbiAgICBkaXNjb3JkVGV4dGFyZWEubG9hZCh2dWVBcHApO1xyXG4gICAgZGlzY29yZFNlbGVjdC5sb2FkKHZ1ZUFwcCk7XHJcbiAgICBkaXNjb3JkSW5wdXQubG9hZCh2dWVBcHApO1xyXG4gICAgZGlzY29yZEJ1dHRvbi5sb2FkKHZ1ZUFwcCk7XHJcbiAgfVxyXG59IiwgIi8vIGh0dHBzOi8vbG9nYXJldG0uY29tL2Jsb2cvZm9yY2luZy1yZWNvbXB1dGF0aW9uLW9mLWNvbXB1dGVkLXByb3BlcnRpZXMvXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmVjb21wdXRlKHZtLCBwcm9wTmFtZSkge1xyXG4gIC8vIGhhbmRsZSBub24tZXhpc3RlbnQgcHJvcHMuXHJcbiAgaWYgKCF2bS4kX19yZWNvbXB1dGFibGVzIHx8ICF2bS4kX19yZWNvbXB1dGFibGVzW3Byb3BOYW1lXSkge1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgdm0uJF9fcmVjb21wdXRhYmxlc1twcm9wTmFtZV0uYmFja2Rvb3IrKztcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJlY29tcHV0YWJsZShmbiwgbmFtZSkge1xyXG4gIGNvbnN0IHJlYWN0aXZlID0gVnVlLmNvbXB1dGVkKHtcclxuICAgIGJhY2tkb29yOiAwXHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvLyBpbml0aWFsaXplIGEgbWFwIG9uY2UuXHJcbiAgICBpZiAoIXRoaXMuJF9fcmVjb21wdXRhYmxlcykge1xyXG4gICAgICB0aGlzLiRfX3JlY29tcHV0YWJsZXMgPSB7fTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBhZGQgYSByZWZlcmVuY2UgdG8gbXkgcmVhY3RpdmUgYmFja2Rvb3IgdHJpZ2dlci5cclxuICAgIGlmICghdGhpcy4kX19yZWNvbXB1dGFibGVzW2ZuLm5hbWUgfHwgbmFtZV0pIHtcclxuICAgICAgdGhpcy4kX19yZWNvbXB1dGFibGVzW2ZuLm5hbWUgfHwgbmFtZV0gPSByZWFjdGl2ZTtcclxuICAgIH1cclxuXHJcbiAgICByZWFjdGl2ZS5iYWNrZG9vcjsgLy8gcmVmZXJlbmNlIGl0IVxyXG5cclxuICAgIHJldHVybiBmbi5jYWxsKHRoaXMpO1xyXG4gIH07XHJcbn0iLCAiaW1wb3J0IHZ1ZUNvbXBvbmVudHMgZnJvbSBcIi4vY29tcG9uZW50cy9pbmRleC5qc1wiO1xyXG5pbXBvcnQgeyByZWNvbXB1dGFibGUsIHJlY29tcHV0ZSB9IGZyb20gXCIuL3V0aWxzL3JlY29tcHV0ZS5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGNvbXBvbmVudHM6IHtcclxuICAgIGxvYWQodnVlQXBwKSB7XHJcbiAgICAgIHZ1ZUNvbXBvbmVudHMubG9hZCh2dWVBcHApO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgcmVhZHk6IHtcclxuICAgIGFzeW5jIHdoZW4oKSB7XHJcbiAgICAgIHdoaWxlICghd2luZG93LlZ1ZSkge1xyXG4gICAgICAgIGF3YWl0IG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCAxMDApKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0sXHJcbiAgICBnZXQgaXMoKSB7XHJcbiAgICAgIHJldHVybiAhIXdpbmRvdy5WdWU7XHJcbiAgICB9XHJcbiAgfSxcclxuICBnZXQgVnVlKCkge1xyXG4gICAgcmV0dXJuIHdpbmRvdy5WdWU7XHJcbiAgfSxcclxuICB1dGlsczoge1xyXG4gICAgY29tcHV0ZWQ6IHtcclxuICAgICAgcmVjb21wdXRlLFxyXG4gICAgICByZWNvbXB1dGFibGVcclxuICAgIH1cclxuICB9XHJcbn0iLCAiaW1wb3J0IHBhdGNoZXIgZnJvbSBcIi4uL3BhdGNoZXIvaW5kZXguanNcIjtcclxuaW1wb3J0IHN0eWxlQ1NTVGV4dCBmcm9tIFwiLi9zdHlsZXMuc2Nzc1wiO1xyXG5wYXRjaGVyLmluamVjdENTUyhzdHlsZUNTU1RleHQpO1xyXG5cclxuaW1wb3J0IHRvb2x0aXBzIGZyb20gXCIuL3Rvb2x0aXBzLmpzXCI7XHJcbmltcG9ydCBub3RpZmljYXRpb25zIGZyb20gXCIuL25vdGlmaWNhdGlvbnMuanNcIjtcclxuaW1wb3J0IGNvbnRleHRNZW51cyBmcm9tIFwiLi9jb250ZXh0TWVudXMuanNcIjtcclxuaW1wb3J0IGNvbXBvbmVudHMgZnJvbSBcIi4vY29tcG9uZW50cy5qc1wiO1xyXG5pbXBvcnQgbW9kYWxzIGZyb20gXCIuL21vZGFscy5qc3hcIjtcclxuaW1wb3J0IHRvYXN0cyBmcm9tIFwiLi90b2FzdHMuanNcIjtcclxuaW1wb3J0IHZ1ZSBmcm9tIFwiLi92dWUvaW5kZXguanNcIjtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgdG9vbHRpcHMsXHJcbiAgbm90aWZpY2F0aW9ucyxcclxuICBjb250ZXh0TWVudXMsXHJcbiAgY29tcG9uZW50cyxcclxuICBtb2RhbHMsXHJcbiAgdG9hc3RzLFxyXG4gIHZ1ZVxyXG59IiwgImltcG9ydCBleHRlbnNpb25zIGZyb20gXCIuLi9leHRlbnNpb25zL2luZGV4LmpzXCI7XHJcbmltcG9ydCBsb2dnZXIgZnJvbSBcIi4uL3V0aWxzL2xvZ2dlci5qc1wiO1xyXG5pbXBvcnQgaTE4biBmcm9tIFwiLi4vaTE4bi9pbmRleC5qc1wiO1xyXG5pbXBvcnQgd2Vic29ja2V0IGZyb20gXCIuLi93ZWJzb2NrZXQvaW5kZXguanNcIjtcclxuXHJcbmxldCBkZXZNb2RlRW5hYmxlZCA9IGZhbHNlO1xyXG5cclxubGV0IGlzTG9hZGluZyA9IGZhbHNlO1xyXG5cclxubGV0IGxvYWRlZDtcclxubGV0IGluc3RhbGxlZDtcclxuXHJcbmNvbnN0IGV4dGVuc2lvbiA9IHtcclxuICBnZXQgbG9hZGVkKCkgeyByZXR1cm4gbG9hZGVkOyB9LFxyXG4gIGdldCBpbnN0YWxsZWQoKSB7IHJldHVybiBpbnN0YWxsZWQ7IH0sXHJcbiAgdW5sb2FkKCkge1xyXG4gICAgaWYgKCFsb2FkZWQpIHJldHVybiBmYWxzZTtcclxuICAgIGV4dGVuc2lvbnMubG9hZGVyLnVubG9hZChcIkRldmVsb3BtZW50XCIpO1xyXG4gICAgbG9hZGVkID0gbnVsbDtcclxuICAgIGluc3RhbGxlZCA9IG51bGw7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9LFxyXG4gIGFzeW5jIGxvYWQoc291cmNlLCBtYW5pZmVzdCkge1xyXG4gICAgaWYgKCFzb3VyY2UgfHwgIW1hbmlmZXN0KSB0aHJvdyBuZXcgRXJyb3IoYFNvdXJjZSBhbmQgbWFuaWZlc3QgYXJlIHJlcXVpcmVkIHRvIGxvYWQgYW4gZXh0ZW5zaW9uIWApO1xyXG4gICAgaWYgKGxvYWRlZCkgdGhyb3cgbmV3IEVycm9yKGBFeHRlbnNpb24gaXMgYWxyZWFkeSBsb2FkZWQhYCk7XHJcbiAgICBpZiAoaXNMb2FkaW5nKSByZXR1cm4gZmFsc2U7XHJcbiAgICBpc0xvYWRpbmcgPSB0cnVlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgbG9hZGVkID0gYXdhaXQgZXh0ZW5zaW9ucy5sb2FkZXIubG9hZChcIkRldmVsb3BtZW50XCIsIHsgc291cmNlLCBtYW5pZmVzdCB9KTtcclxuICAgICAgaW5zdGFsbGVkID0ge1xyXG4gICAgICAgIG1hbmlmZXN0XHJcbiAgICAgIH07XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgbG9nZ2VyLmVycm9yKGBVbmFibGUgdG8gbG9hZCBkZXZlbG9wbWVudCBleHRlbnNpb24uYCwgaTE4bi5sb2NhbGl6ZShtYW5pZmVzdC5hYm91dC5uYW1lKSwgZXJyKTtcclxuICAgICAgaXNMb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGlzTG9hZGluZyA9IGZhbHNlO1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG59XHJcblxyXG5jb25zdCBvdXQgPSB7XHJcbiAgZ2V0IGVuYWJsZWQoKSB7XHJcbiAgICByZXR1cm4gZGV2TW9kZUVuYWJsZWQ7XHJcbiAgfSxcclxuICBzZXQgZW5hYmxlZCh2YWx1ZSkge1xyXG4gICAgaWYgKCFnbG9iYWxUaGlzW1wiPFBSRUxPQURfS0VZPlwiXS5pc0RldlRvb2xzT3BlbigpKSB0aHJvdyBuZXcgRXJyb3IoXCJEZXYgbW9kZSBzdGF0dXMgY2FuIG9ubHkgYmUgbW9kaWZpZWQgd2hlbiBEZXZUb29scyBpcyBvcGVuIVwiKTtcclxuICAgIGRldk1vZGVFbmFibGVkID0gdmFsdWU7XHJcbiAgfSxcclxuICBnZXQgZXh0ZW5zaW9uKCkge1xyXG4gICAgaWYgKCFkZXZNb2RlRW5hYmxlZCkgdGhyb3cgbmV3IEVycm9yKFwiRGV2IG1vZGUgaXMgbm90IGVuYWJsZWQhXCIpO1xyXG4gICAgcmV0dXJuIGV4dGVuc2lvbjtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IG91dDtcclxuXHJcbmxldCBpc1Byb2Nlc3NpbmcgPSBmYWxzZTtcclxud2Vic29ja2V0LnNldChcclxuICBcIlVwZGF0ZURldmVsb3BtZW50RXh0ZW5zaW9uXCIsXHJcbiAgYXN5bmMgKHsgc291cmNlLCBtYW5pZmVzdCB9ID0ge30pID0+IHtcclxuICAgIGlmICghZGV2TW9kZUVuYWJsZWQpXHJcbiAgICAgIHJldHVybiBsb2dnZXIud2FybihgRGV2ZWxvcG1lbnQgZXh0ZW5zaW9uIHdhcyBzZW50IGJlZm9yZSBkZXYgbW9kZSB3YXMgZW5hYmxlZC5gKTtcclxuXHJcbiAgICBpZiAoIXNvdXJjZSB8fCAhbWFuaWZlc3QpXHJcbiAgICAgIHJldHVybiBsb2dnZXIud2FybihgRGV2ZWxvcG1lbnQgZXh0ZW5zaW9uIHdhcyBzZW50IHdpdGhvdXQgc291cmNlIG9yIG1hbmlmZXN0LmApO1xyXG5cclxuICAgIGlmIChpc1Byb2Nlc3NpbmcpXHJcbiAgICAgIHJldHVybiBsb2dnZXIud2FybihgRGV2ZWxvcG1lbnQgZXh0ZW5zaW9uIHdhcyBzZW50IHdoaWxlIGV4dGVuc2lvbiB3YXMgYWxyZWFkeSBiZWluZyBwcm9jZXNzZWQuYCk7XHJcblxyXG4gICAgaXNQcm9jZXNzaW5nID0gdHJ1ZTtcclxuXHJcbiAgICBleHRlbnNpb24udW5sb2FkKCk7XHJcbiAgICBhd2FpdCBuZXcgUHJvbWlzZSgocikgPT4gc2V0VGltZW91dChyLCAxKSk7XHJcbiAgICBsZXQgc3VjY2VzcyA9IGF3YWl0IGV4dGVuc2lvbi5sb2FkKHNvdXJjZSwgbWFuaWZlc3QpO1xyXG4gICAgaWYgKHN1Y2Nlc3MpIGxvZ2dlci5pbmZvKGBEZXZlbG9wbWVudCBleHRlbnNpb24gaXMgbG9hZGVkISAoJHtpMThuLmxvY2FsaXplKG1hbmlmZXN0LmFib3V0Lm5hbWUpfSlgKTtcclxuICAgIGlzUHJvY2Vzc2luZyA9IGZhbHNlO1xyXG4gIH1cclxuKSIsICJleHBvcnQgZGVmYXVsdCB7XHJcbiAgcHJvY2VzczogZ2xvYmFsVGhpc1tcIjxQUkVMT0FEX0tFWT5cIl0ucHJvY2VzcyxcclxuICBpc0RldlRvb2xzT3BlbjogZ2xvYmFsVGhpc1tcIjxQUkVMT0FEX0tFWT5cIl0uaXNEZXZUb29sc09wZW5cclxufVxyXG5cclxuIiwgImltcG9ydCBtb2R1bGVzIGZyb20gJy4vbW9kdWxlcyc7XHJcbmltcG9ydCBkZXYgZnJvbSAnLi9kZXYnO1xyXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi91dGlscyc7XHJcbmltcG9ydCBleHRlbnNpb25zIGZyb20gJy4vZXh0ZW5zaW9ucyc7XHJcbmltcG9ydCBpMThuIGZyb20gJy4vaTE4bic7XHJcbmltcG9ydCBzdG9yYWdlIGZyb20gJy4vc3RvcmFnZSc7XHJcbmltcG9ydCBldmVudHMgZnJvbSAnLi9ldmVudHMnO1xyXG5pbXBvcnQgcGF0Y2hlciBmcm9tICcuL3BhdGNoZXInO1xyXG5pbXBvcnQgaW50ZXJuYWwgZnJvbSAnLi9pbnRlcm5hbCc7XHJcbmltcG9ydCB3ZWJzb2NrZXQgZnJvbSAnLi93ZWJzb2NrZXQnO1xyXG5pbXBvcnQgZG9tIGZyb20gJy4vZG9tJztcclxuaW1wb3J0IHVpIGZyb20gJy4vdWkvaW5kZXguanMnO1xyXG5cclxudXRpbHMubG9nZ2VyLmRlYnVnKGBQUkVMT0FEX0tFWTogPFBSRUxPQURfS0VZPmApO1xyXG5cclxuZnVuY3Rpb24gZGV2RXJyb3IoYXBpKSB7XHJcbiAgcmV0dXJuIG5ldyBFcnJvcihgVGhlICR7YXBpfSBBUEkgY2FuIG9ubHkgYmUgYWNjZXNzZWQgd2hlbiBEZXYgbW9kZSBpcyBlbmFibGVkIWApO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgZXhwb3NlZEFQSToge1xyXG4gICAgZGV2LFxyXG4gICAgdXRpbHMsXHJcbiAgICBpMThuLFxyXG4gICAgZXZlbnRzLFxyXG4gICAgdWksXHJcbiAgICBnZXQgZG9tKCkge1xyXG4gICAgICBpZiAoIWRldi5lbmFibGVkKSB0aHJvdyBkZXZFcnJvcihcIkRPTVwiKTtcclxuICAgICAgcmV0dXJuIGRvbTtcclxuICAgIH0sXHJcbiAgICBnZXQgcGF0Y2hlcigpIHtcclxuICAgICAgaWYgKCFkZXYuZW5hYmxlZCkgdGhyb3cgZGV2RXJyb3IoXCJQYXRjaGVyXCIpO1xyXG4gICAgICByZXR1cm4gcGF0Y2hlcjtcclxuICAgIH0sXHJcbiAgICBnZXQgc3RvcmFnZSgpIHtcclxuICAgICAgaWYgKCFkZXYuZW5hYmxlZCkgdGhyb3cgZGV2RXJyb3IoXCJTdG9yYWdlXCIpO1xyXG4gICAgICByZXR1cm4gc3RvcmFnZTtcclxuICAgIH0sXHJcbiAgICBnZXQgbW9kdWxlcygpIHtcclxuICAgICAgaWYgKCFkZXYuZW5hYmxlZCkgdGhyb3cgZGV2RXJyb3IoXCJNb2R1bGVzXCIpO1xyXG4gICAgICByZXR1cm4gbW9kdWxlcztcclxuICAgIH0sXHJcbiAgICBnZXQgZXh0ZW5zaW9ucygpIHtcclxuICAgICAgaWYgKCFkZXYuZW5hYmxlZCkgdGhyb3cgZGV2RXJyb3IoXCJFeHRlbnNpb25zXCIpO1xyXG4gICAgICByZXR1cm4gZXh0ZW5zaW9ucztcclxuICAgIH0sXHJcbiAgICBnZXQgaW50ZXJuYWwoKSB7XHJcbiAgICAgIGlmICghZGV2LmVuYWJsZWQpIHRocm93IGRldkVycm9yKFwiSW50ZXJuYWxcIik7XHJcbiAgICAgIHJldHVybiBpbnRlcm5hbDtcclxuICAgIH0sXHJcbiAgICBnZXQgd2Vic29ja2V0KCkge1xyXG4gICAgICBpZiAoIWRldi5lbmFibGVkKSB0aHJvdyBkZXZFcnJvcihcIldlYnNvY2tldFwiKTtcclxuICAgICAgcmV0dXJuIHdlYnNvY2tldDtcclxuICAgIH1cclxuICB9LFxyXG4gIHVuZXhwb3NlZEFQSToge1xyXG4gICAgZGV2LFxyXG4gICAgbW9kdWxlcyxcclxuICAgIHV0aWxzLFxyXG4gICAgZXh0ZW5zaW9ucyxcclxuICAgIGkxOG4sXHJcbiAgICBzdG9yYWdlLFxyXG4gICAgZXZlbnRzLFxyXG4gICAgcGF0Y2hlcixcclxuICAgIGludGVybmFsLFxyXG4gICAgd2Vic29ja2V0LFxyXG4gICAgdWksXHJcbiAgICBkb21cclxuICB9XHJcbn0iLCAiaW1wb3J0IG1vZHVsZXMgZnJvbSBcIi4uL2FwaS9tb2R1bGVzL2luZGV4LmpzXCI7XHJcbmltcG9ydCBtb2RhbHMgZnJvbSBcIi4uL2FwaS91aS9tb2RhbHMuanN4XCI7XHJcbmltcG9ydCBub3RpZmljYXRpb25zIGZyb20gXCIuLi9hcGkvdWkvbm90aWZpY2F0aW9ucy5qc1wiO1xyXG5pbXBvcnQgZXh0ZW5zaW9ucyBmcm9tIFwiLi4vYXBpL2V4dGVuc2lvbnMvaW5kZXguanNcIjtcclxuaW1wb3J0IHdlYnNvY2tldCBmcm9tIFwiLi4vYXBpL3dlYnNvY2tldC9pbmRleC5qc1wiO1xyXG5cclxud2Vic29ja2V0LnNldChcIkluc3RhbGxFeHRlbnNpb25cIiwgYXN5bmMgKHsgdXJsIH0gPSB7fSkgPT4ge1xyXG4gIGlmICghdXJsKSByZXR1cm47XHJcblxyXG4gIGF3YWl0IG1vZHVsZXMubmF0aXZlLndpbmRvdy5zZXRBbHdheXNPblRvcCgwLCB0cnVlKTtcclxuICBhd2FpdCBuZXcgUHJvbWlzZShyID0+IHNldFRpbWVvdXQociwgMjUwKSk7XHJcbiAgYXdhaXQgbW9kdWxlcy5uYXRpdmUud2luZG93LnNldEFsd2F5c09uVG9wKDAsIHRydWUpO1xyXG5cclxuICBjb25zdCBzdWNjZXNzID0gYXdhaXQgbW9kYWxzLnNob3cuY29uZmlybWF0aW9uKFxyXG4gICAgYWNvcmQuaTE4bi5mb3JtYXQoXCJJTVBPUlRfRVhURU5TSU9OX01PREFMX1RJVExFXCIpLFxyXG4gICAgYWNvcmQuaTE4bi5mb3JtYXQoXCJJTVBPUlRfRVhURU5TSU9OX01PREFMX0RFU0NSSVBUSU9OXCIsIHVybClcclxuICApO1xyXG5cclxuICBpZiAoIXN1Y2Nlc3MpIHJldHVybjtcclxuXHJcbiAgdHJ5IHtcclxuICAgIGF3YWl0IGV4dGVuc2lvbnMubG9hZCh1cmwpO1xyXG4gIH0gY2F0Y2ggKGVycikge1xyXG4gICAgbm90aWZpY2F0aW9ucy5zaG93LmVycm9yKGAke2Vycn1gLCB7IHRpbWVvdXQ6IDMwMDAwIH0pO1xyXG4gIH1cclxufSk7IiwgImV4cG9ydCBkZWZhdWx0IGBcbltjbGFzcyo9YWNvcmQtLV17Ym94LXNpemluZzpib3JkZXItYm94fVtjbGFzcyo9YWNvcmQtLV0gKntib3gtc2l6aW5nOmJvcmRlci1ib3h9LmFjb3JkLS10YWJzLWNvbnRlbnQtY29udGFpbmVye3BhZGRpbmc6MzJweCAxNnB4O2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpmbGV4LXN0YXJ0O2p1c3RpZnktY29udGVudDpjZW50ZXI7d2lkdGg6MTAwJX0uYWNvcmQtLXRhYnMtY29udGVudC1jb250YWluZXI+LnRhYnt3aWR0aDoxMDAlfS5hY29yZC0tdGFicy10YWItYnV0dG9uLnN0b3JlLXRhYi1idXR0b257YmFja2dyb3VuZC1jb2xvcjp2YXIoLS1zdGF0dXMtcG9zaXRpdmUtYmFja2dyb3VuZCk7Y29sb3I6dmFyKC0tc3RhdHVzLXBvc2l0aXZlLXRleHQpfS5hY29yZC0tdGFicy10YWItYnV0dG9uLnN0b3JlLXRhYi1idXR0b24uc2VsZWN0ZWR7Y29sb3I6dmFyKC0tdGV4dC1wb3NpdGl2ZSk7YmFja2dyb3VuZC1jb2xvcjp2YXIoLS1iYWNrZ3JvdW5kLW1vZGlmaWVyLXNlbGVjdGVkKX1gO1xuIiwgImV4cG9ydCBkZWZhdWx0IHtcclxuICAvKiogQHBhcmFtIHtpbXBvcnQoXCJ2dWVcIikuQXBwfSB2dWVBcHAgKi9cclxuICBsb2FkKHZ1ZUFwcCkge1xyXG4gICAgdnVlQXBwLmNvbXBvbmVudChcclxuICAgICAgXCJob21lLXBhZ2VcIixcclxuICAgICAge1xyXG4gICAgICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPVwid2lkdGg6IDMwMHB4O1wiPlxyXG4gICAgICAgICAgICAgIDxkaXNjb3JkLXNlbGVjdCB2LW1vZGVsPVwidmFsdWVcIiA6b3B0aW9ucz1cIm9wdGlvbnNcIiAvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGgxPnt7IHZhbHVlIH19PC9oMT5cclxuICAgICAgICAgICAgPGJyIC8+XHJcbiAgICAgICAgICAgIDxkaXNjb3JkLWNoZWNrIHYtbW9kZWw9XCJjaGVja2VkXCIgLz5cclxuICAgICAgICAgICAgPGgxPnt7IGNoZWNrZWQgfX08L2gxPlxyXG4gICAgICAgICAgICA8ZGlzY29yZC1jaGVjayB2LW1vZGVsPVwiY2hlY2tlZFwiIC8+XHJcbiAgICAgICAgICAgIDxoMT57eyBjaGVja2VkIH19PC9oMT5cclxuICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICBgLFxyXG4gICAgICAgIGRhdGEoKSB7XHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB2YWx1ZTogXCIxXCIsXHJcbiAgICAgICAgICAgIGNoZWNrZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBvcHRpb25zOiBbXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiMVwiLFxyXG4gICAgICAgICAgICAgICAgbGFiZWw6IFwiT3B0aW9uIDFcIlxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiMlwiLFxyXG4gICAgICAgICAgICAgICAgbGFiZWw6IFwiT3B0aW9uIDJcIlxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiM1wiLFxyXG4gICAgICAgICAgICAgICAgbGFiZWw6IFwiT3B0aW9uIDNcIlxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgKTtcclxuICB9XHJcbn0iLCAiZXhwb3J0IGRlZmF1bHQgYFxuLmFjb3JkLS1pbnN0YWxsZWQtZXh0ZW5zaW9ucy1wYWdle2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpmbGV4LXN0YXJ0O2p1c3RpZnktY29udGVudDpjZW50ZXI7cGFkZGluZzowIDE2cHh9LmFjb3JkLS1pbnN0YWxsZWQtZXh0ZW5zaW9ucy1wYWdlIC5jb250YWluZXJ7d2lkdGg6MTAwJTttYXgtd2lkdGg6MTAyNHB4O2Rpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpjb2x1bW59LmFjb3JkLS1pbnN0YWxsZWQtZXh0ZW5zaW9ucy1wYWdlIC5jb250YWluZXI+LnRvcHtkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2dhcDo4cHh9LmFjb3JkLS1pbnN0YWxsZWQtZXh0ZW5zaW9ucy1wYWdlIC5jb250YWluZXI+LnRvcD4uc2VhcmNoe3dpZHRoOjgwJX0uYWNvcmQtLWluc3RhbGxlZC1leHRlbnNpb25zLXBhZ2UgLmNvbnRhaW5lcj4udG9wPi5jYXRlZ29yeXt3aWR0aDoyMCV9YDtcbiIsICJpbXBvcnQgcGF0Y2hlciBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vLi4vYXBpL3BhdGNoZXIvaW5kZXguanNcIjtcclxuaW1wb3J0IGkxOG4gZnJvbSBcIi4uLy4uLy4uLy4uLy4uLy4uL2FwaS9pMThuL2luZGV4LmpzXCI7XHJcbmltcG9ydCBjc3NUZXh0IGZyb20gXCIuL3N0eWxlLnNjc3NcIjtcclxucGF0Y2hlci5pbmplY3RDU1MoY3NzVGV4dCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgLyoqIEBwYXJhbSB7aW1wb3J0KFwidnVlXCIpLkFwcH0gdnVlQXBwICovXHJcbiAgbG9hZCh2dWVBcHApIHtcclxuICAgIHZ1ZUFwcC5jb21wb25lbnQoXHJcbiAgICAgIFwiaW5zdGFsbGVkLWV4dGVuc2lvbnMtcGFnZVwiLFxyXG4gICAgICB7XHJcbiAgICAgICAgdGVtcGxhdGU6IGBcclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJhY29yZC0taW5zdGFsbGVkLWV4dGVuc2lvbnMtcGFnZVwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRvcFwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNlYXJjaFwiPlxyXG4gICAgICAgICAgICAgICAgICA8ZGlzY29yZC1pbnB1dCB2LW1vZGVsPVwic2VhcmNoVGV4dFwiIDpwbGFjZWhvbGRlcj1cImkxOG5Gb3JtYXQoJ1NFQVJDSCcpXCIgLz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhdGVnb3J5XCI+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXNjb3JkLXNlbGVjdCB2LW1vZGVsPVwic2VhcmNoQ2F0ZWdvcnlUZXh0XCIgOm9wdGlvbnM9XCJbe3ZhbHVlOiAnYWxsJywgbGFiZWw6IGkxOG5Gb3JtYXQoJ0FMTCcpfSwge3ZhbHVlOiAncGx1Z2lucycsIGxhYmVsOiBpMThuRm9ybWF0KCdQTFVHSU5TJyl9LCB7dmFsdWU6ICd0aGVtZXMnLCBsYWJlbDogaTE4bkZvcm1hdCgnVEhFTUVTJyl9XVwiIC8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnV0dG9uXCI+XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICBgLFxyXG4gICAgICAgIGRhdGEoKSB7XHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBzZWFyY2hUZXh0OiBcIlwiLFxyXG4gICAgICAgICAgICBzZWFyY2hDYXRlZ29yeVRleHQ6IFwiYWxsXCJcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIG1ldGhvZHM6IHtcclxuICAgICAgICAgIGkxOG5Gb3JtYXQ6IGkxOG4uZm9ybWF0XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICApO1xyXG4gIH1cclxufSIsICJleHBvcnQgZGVmYXVsdCB7XHJcbiAgLyoqIEBwYXJhbSB7aW1wb3J0KFwidnVlXCIpLkFwcH0gdnVlQXBwICovXHJcbiAgbG9hZCh2dWVBcHApIHtcclxuICAgIHZ1ZUFwcC5jb21wb25lbnQoXHJcbiAgICAgIFwic2V0dGluZ3MtcGFnZVwiLFxyXG4gICAgICB7XHJcbiAgICAgICAgdGVtcGxhdGU6IFwiPGRpdj5TZXR0aW5ncyBQYWdlPC9kaXY+XCIsXHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgfVxyXG59IiwgImV4cG9ydCBkZWZhdWx0IHtcclxuICAvKiogQHBhcmFtIHtpbXBvcnQoXCJ2dWVcIikuQXBwfSB2dWVBcHAgKi9cclxuICBsb2FkKHZ1ZUFwcCkge1xyXG4gICAgdnVlQXBwLmNvbXBvbmVudChcclxuICAgICAgXCJzdG9yZS1wYWdlXCIsXHJcbiAgICAgIHtcclxuICAgICAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxkaXY+XHJcbiAgICAgICAgICA8c3RvcmUtZXh0ZW5zaW9uLWNhcmQgdi1mb3I9XCJleHRlbnNpb24gaW4gZXh0ZW5zaW9uc1wiIDpleHRlbnNpb249XCJleHRlbnNpb25cIiA6a2V5PVwiZXh0ZW5zaW9uLm5hbWUuZGVmYXVsdFwiIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgYCxcclxuICAgICAgICBkYXRhKCkge1xyXG4gICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZXh0ZW5zaW9uczogW1xyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwicGx1Z2luXCIsXHJcbiAgICAgICAgICAgICAgICB1cmw6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiB7XHJcbiAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IFwiVGVzdCBQbHVnaW5cIixcclxuICAgICAgICAgICAgICAgICAgdHI6IFwiRGVuZW1lIFBsdWdpblwiLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IFwiVGVzdCBQbHVnaW4gZGVzY3JpcHRpb24uLlwiLFxyXG4gICAgICAgICAgICAgICAgICB0cjogXCJEZW5lbWUgUGx1Z2luIGFcdTAwRTdcdTAxMzFrbGFtYXNcdTAxMzEuLlwiLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHByZXZpZXdzOiBbXHJcbiAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIlRlc3QgUGx1Z2luIFByZXZpZXdcIixcclxuICAgICAgICAgICAgICAgICAgICBpbWFnZTogXCJodHRwczovL2kuaW1ndXIuY29tL1R0ZmpIZVAucG5nXCIsXHJcbiAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIlRlc3QgUGx1Z2luIFByZXZpZXcgMlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGltYWdlOiBcImh0dHBzOi8vaS5pbWd1ci5jb20vMFowWjBaMC5wbmdcIixcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIGF1dGhvcnM6IFtcclxuICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIjcwNzMwOTY5MzQ0OTUzNTU5OVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiQXJtYWdhbiMyNDQ4XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2U6IFwiaHR0cHM6Ly9pLmltZ3VyLmNvbS9yU0xWZDIzLnBuZ1wiXHJcbiAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogXCI3MDczMDk2OTM0NDk1MzU1OTlcIixcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIkFybWFnYW4jMjQ0OFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGltYWdlOiBcImh0dHBzOi8vaS5pbWd1ci5jb20vclNMVmQyMy5wbmdcIlxyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgdmVyc2lvbjogXCIxLjAuMFwiLFxyXG4gICAgICAgICAgICAgICAgcmVhZG1lOiBcIiMjIyBUZXN0IFBsdWdpbiByZWFkbWUuLlwiLFxyXG4gICAgICAgICAgICAgICAgaW5zdGFsbGVkOiB0cnVlXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgKTtcclxuICB9XHJcbn0iLCAiaW1wb3J0IGhvbWVQYWdlIGZyb20gXCIuL2hvbWUtcGFnZS9pbmRleC5qc1wiXHJcbmltcG9ydCBpbnN0YWxsZWRFeHRlbnNpb25zUGFnZSBmcm9tIFwiLi9pbnN0YWxsZWQtZXh0ZW5zaW9ucy1wYWdlL2luZGV4LmpzXCI7XHJcbmltcG9ydCBzZXR0aW5nc1BhZ2UgZnJvbSBcIi4vc2V0dGluZ3MtcGFnZS9pbmRleC5qc1wiO1xyXG5pbXBvcnQgc3RvcmVQYWdlIGZyb20gXCIuL3N0b3JlLXBhZ2UvaW5kZXguanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAvKiogQHBhcmFtIHtpbXBvcnQoXCJ2dWVcIikuQXBwfSB2dWVBcHAgKi9cclxuICBsb2FkKHZ1ZUFwcCkge1xyXG4gICAgaG9tZVBhZ2UubG9hZCh2dWVBcHApO1xyXG4gICAgaW5zdGFsbGVkRXh0ZW5zaW9uc1BhZ2UubG9hZCh2dWVBcHApO1xyXG4gICAgc2V0dGluZ3NQYWdlLmxvYWQodnVlQXBwKTtcclxuICAgIHN0b3JlUGFnZS5sb2FkKHZ1ZUFwcCk7XHJcbiAgfVxyXG59IiwgImltcG9ydCBldmVudHMgZnJvbSBcIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2FwaS9ldmVudHMvaW5kZXguanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAvKiogQHBhcmFtIHtpbXBvcnQoXCJ2dWVcIikuQXBwfSB2dWVBcHAgKi9cclxuICBsb2FkKHZ1ZUFwcCkge1xyXG4gICAgdnVlQXBwLmNvbXBvbmVudChcImNvbmZpZy1idXR0b25cIiwge1xyXG4gICAgICBwcm9wczogW1wiaXRlbVwiLCBcImV4dGVuc2lvblwiXSxcclxuICAgICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8ZGl2IHYtc2hvdz1cIml0ZW0/LnZpc2libGUgPz8gdHJ1ZVwiIGNsYXNzPVwiYWNvcmQtLWNvbmZpZy1idXR0b24gYWNvcmQtLWNvbmZpZy1pdGVtXCI+XHJcbiAgICAgICAgICA8ZGlzY29yZC1idXR0b24gQGNsaWNrPVwib25DbGlja1wiIDp2YWx1ZT1cIml0ZW0udmFsdWVcIiA6c2l6ZT1cIml0ZW0uc2l6ZVwiIDpjb2xvcj1cIml0ZW0uY29sb3JcIiAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICBgLFxyXG4gICAgICBtZXRob2RzOiB7XHJcbiAgICAgICAgb25DbGljayhldmVudCkge1xyXG4gICAgICAgICAgZXZlbnRzLmVtaXQoXHJcbiAgICAgICAgICAgIFwiZXh0ZW5zaW9uLWNvbmZpZy1pbnRlcmFjdGlvblwiLFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgZXh0ZW5zaW9uOiB0aGlzLmV4dGVuc2lvbixcclxuICAgICAgICAgICAgICBpdGVtOiB0aGlzLml0ZW0sXHJcbiAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgZXZlbnRcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIClcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufSIsICJpbXBvcnQgZXZlbnRzIGZyb20gXCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9hcGkvZXZlbnRzL2luZGV4LmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgLyoqIEBwYXJhbSB7aW1wb3J0KFwidnVlXCIpLkFwcH0gdnVlQXBwICovXHJcbiAgbG9hZCh2dWVBcHApIHtcclxuICAgIHZ1ZUFwcC5jb21wb25lbnQoXCJjb25maWctY2hlY2tcIiwge1xyXG4gICAgICBwcm9wczogW1wiaXRlbVwiLCBcImV4dGVuc2lvblwiXSxcclxuICAgICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8ZGl2IHYtc2hvdz1cIml0ZW0/LnZpc2libGUgPz8gdHJ1ZVwiIGNsYXNzPVwiYWNvcmQtLWNvbmZpZy1jaGVjayBhY29yZC0tY29uZmlnLWl0ZW1cIj5cclxuICAgICAgICAgIDxkaXNjb3JkLWNoZWNrIEBjaGFuZ2U9XCJvbkNoYW5nZVwiIHYtbW9kZWw9XCJpdGVtLnZhbHVlXCIgLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgYCxcclxuICAgICAgbWV0aG9kczoge1xyXG4gICAgICAgIG9uQ2hhbmdlKGRhdGEpIHtcclxuICAgICAgICAgIGV2ZW50cy5lbWl0KFxyXG4gICAgICAgICAgICBcImV4dGVuc2lvbi1jb25maWctaW50ZXJhY3Rpb25cIixcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIGV4dGVuc2lvbjogdGhpcy5leHRlbnNpb24sXHJcbiAgICAgICAgICAgICAgaXRlbTogdGhpcy5pdGVtLFxyXG4gICAgICAgICAgICAgIGRhdGFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59IiwgIntcclxuICBcIm5hbWVcIjoge1xyXG4gICAgXCJDb2x1bW5cIjogXCJjb25maWctY29sdW1uXCIsXHJcbiAgICBcIlJvd1wiOiBcImNvbmZpZy1yb3dcIixcclxuICAgIFwiQnV0dG9uXCI6IFwiY29uZmlnLWJ1dHRvblwiLFxyXG4gICAgXCJDaGVja1wiOiBcImNvbmZpZy1jaGVja1wiLFxyXG4gICAgXCJJbnB1dFwiOiBcImNvbmZpZy1pbnB1dFwiLFxyXG4gICAgXCJTZWxlY3RcIjogXCJjb25maWctc2VsZWN0XCIsXHJcbiAgICBcIlRleHRhcmVhXCI6IFwiY29uZmlnLXRleHRhcmVhXCIsXHJcbiAgICBcIlNwYWNlclwiOiBcImNvbmZpZy1zcGFjZXJcIixcclxuICAgIFwiUGFyYWdyYXBoXCI6IFwiY29uZmlnLXBhcmFncmFwaFwiLFxyXG4gICAgXCJIZWFkaW5nXCI6IFwiY29uZmlnLWhlYWRpbmdcIlxyXG4gIH1cclxufSIsICJpbXBvcnQgeyBuYW1lIGFzIG5hbWVNYXAgfSBmcm9tIFwiLi4vbWFwcy5qc29uXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgLyoqIEBwYXJhbSB7aW1wb3J0KFwidnVlXCIpLkFwcH0gdnVlQXBwICovXHJcbiAgbG9hZCh2dWVBcHApIHtcclxuICAgIHZ1ZUFwcC5jb21wb25lbnQoXHJcbiAgICAgIFwiY29uZmlnLWNvbHVtblwiLFxyXG4gICAgICB7XHJcbiAgICAgICAgcHJvcHM6IFtcIml0ZW1cIiwgXCJleHRlbnNpb25cIl0sXHJcbiAgICAgICAgdGVtcGxhdGU6IGBcclxuICAgICAgICAgIDxkaXYgdi1zaG93PVwiaXRlbT8udmlzaWJsZSA/PyB0cnVlXCIgY2xhc3M9XCJhY29yZC0tY29uZmlnLWNvbHVtbiBhY29yZC0tY29uZmlnLWl0ZW1cIiA6Y2xhc3M9XCJ7XHJcbiAgICAgICAgICAgICdob3Jpem9udGFsLWFsaWduLWxlZnQnOiBpdGVtPy5ob3Jpem9udGFsQWxpZ24gPT09ICdsZWZ0JyxcclxuICAgICAgICAgICAgJ2hvcml6b250YWwtYWxpZ24tY2VudGVyJzogaXRlbT8uaG9yaXpvbnRhbEFsaWduID09PSAnY2VudGVyJyxcclxuICAgICAgICAgICAgJ2hvcml6b250YWwtYWxpZ24tcmlnaHQnOiBpdGVtPy5ob3Jpem9udGFsQWxpZ24gPT09ICdyaWdodCcsXHJcbiAgICAgICAgICAgICdqdXN0aWZ5LXNwYWNlLWJldHdlZW4nOiBpdGVtPy5qdXN0aWZ5ID09PSAnc3BhY2UtYmV0d2VlbicsXHJcbiAgICAgICAgICAgICdqdXN0aWZ5LXNwYWNlLWFyb3VuZCc6IGl0ZW0/Lmp1c3RpZnkgPT09ICdzcGFjZS1hcm91bmQnLFxyXG4gICAgICAgICAgICAndmVydGljYWwtYWxpZ24tdG9wJzogaXRlbT8udmVydGljYWxBbGlnbiA9PT0gJ3RvcCcsXHJcbiAgICAgICAgICAgICd2ZXJ0aWNhbC1hbGlnbi1jZW50ZXInOiBpdGVtPy52ZXJ0aWNhbEFsaWduID09PSAnY2VudGVyJyxcclxuICAgICAgICAgICAgJ3ZlcnRpY2FsLWFsaWduLWJvdHRvbSc6IGl0ZW0/LnZlcnRpY2FsQWxpZ24gPT09ICdib3R0b20nXHJcbiAgICAgICAgICB9XCIgOnN0eWxlPVwieyd3aWR0aCc6IGl0ZW0/LndpZHRoID8/ICcxMDAlJywgJ2hlaWdodCc6IGl0ZW0/LmhlaWdodH1cIiA+XHJcbiAgICAgICAgICAgIDxjb21wb25lbnQgdi1mb3I9XCJjaGlsZCBpbiBpdGVtLmNoaWxkcmVuXCIgOmlzPVwibmFtZU1hcFtjaGlsZC50eXBlXVwiIDprZXk9XCJjaGlsZC5pZFwiIDppdGVtPVwiY2hpbGRcIiA6ZXh0ZW5zaW9uPVwiZXh0ZW5zaW9uXCIgLz5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIGAsXHJcbiAgICAgICAgZGF0YSgpIHtcclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG5hbWVNYXBcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgfVxyXG59IiwgImV4cG9ydCBkZWZhdWx0IHtcclxuICAvKiogQHBhcmFtIHtpbXBvcnQoXCJ2dWVcIikuQXBwfSB2dWVBcHAgKi9cclxuICBsb2FkKHZ1ZUFwcCkge1xyXG4gICAgdnVlQXBwLmNvbXBvbmVudChcImNvbmZpZy1oZWFkaW5nXCIsIHtcclxuICAgICAgcHJvcHM6IFtcIml0ZW1cIiwgXCJleHRlbnNpb25cIl0sXHJcbiAgICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiB2LXNob3c9XCJpdGVtPy52aXNpYmxlID8/IHRydWVcIiBjbGFzcz1cImFjb3JkLS1jb25maWctaGVhZGluZyBhY29yZC0tY29uZmlnLWl0ZW1cIj5cclxuICAgICAgICAgIDxoMSBjbGFzcz1cImhlYWRpbmdcIj57e2l0ZW0udmFsdWV9fTwvaDE+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIGAsXHJcbiAgICB9KTtcclxuICB9XHJcbn0iLCAiaW1wb3J0IGV2ZW50cyBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vYXBpL2V2ZW50cy9pbmRleC5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIC8qKiBAcGFyYW0ge2ltcG9ydChcInZ1ZVwiKS5BcHB9IHZ1ZUFwcCAqL1xyXG4gIGxvYWQodnVlQXBwKSB7XHJcbiAgICB2dWVBcHAuY29tcG9uZW50KFwiY29uZmlnLWlucHV0XCIsIHtcclxuICAgICAgcHJvcHM6IFtcIml0ZW1cIiwgXCJleHRlbnNpb25cIl0sXHJcbiAgICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiB2LXNob3c9XCJpdGVtPy52aXNpYmxlID8/IHRydWVcIiBjbGFzcz1cImFjb3JkLS1jb25maWctaW5wdXQgYWNvcmQtLWNvbmZpZy1pdGVtXCI+XHJcbiAgICAgICAgICA8ZGlzY29yZC1pbnB1dCBAY2hhbmdlPVwib25DaGFuZ2VcIiB2LW1vZGVsPVwiaXRlbS52YWx1ZVwiIDp0eXBlPVwiaXRlbS5pbnB1dFR5cGVcIiA6cGxhY2Vob2xkZXI9XCJpdGVtLnBsYWNlaG9sZGVyXCIgOm1heGxlbmd0aD1cIml0ZW0ubWF4bGVuZ3RoXCIgLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgYCxcclxuICAgICAgbWV0aG9kczoge1xyXG4gICAgICAgIG9uQ2hhbmdlKGRhdGEpIHtcclxuICAgICAgICAgIGV2ZW50cy5lbWl0KFxyXG4gICAgICAgICAgICBcImV4dGVuc2lvbi1jb25maWctaW50ZXJhY3Rpb25cIixcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIGV4dGVuc2lvbjogdGhpcy5leHRlbnNpb24sXHJcbiAgICAgICAgICAgICAgaXRlbTogdGhpcy5pdGVtLFxyXG4gICAgICAgICAgICAgIGRhdGFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59IiwgImV4cG9ydCBkZWZhdWx0IHtcclxuICAvKiogQHBhcmFtIHtpbXBvcnQoXCJ2dWVcIikuQXBwfSB2dWVBcHAgKi9cclxuICBsb2FkKHZ1ZUFwcCkge1xyXG4gICAgdnVlQXBwLmNvbXBvbmVudChcImNvbmZpZy1wYXJhZ3JhcGhcIiwge1xyXG4gICAgICBwcm9wczogW1wiaXRlbVwiLCBcImV4dGVuc2lvblwiXSxcclxuICAgICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8ZGl2IHYtc2hvdz1cIml0ZW0/LnZpc2libGUgPz8gdHJ1ZVwiIGNsYXNzPVwiYWNvcmQtLWNvbmZpZy1wYXJhZ3JhcGggYWNvcmQtLWNvbmZpZy1pdGVtXCI+XHJcbiAgICAgICAgICA8cCBjbGFzcz1cInBhcmFncmFwaFwiPnt7aXRlbS52YWx1ZX19PC9wPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICBgLFxyXG4gICAgfSk7XHJcbiAgfVxyXG59IiwgImltcG9ydCB7IG5hbWUgYXMgbmFtZU1hcCB9IGZyb20gXCIuLi9tYXBzLmpzb25cIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAvKiogQHBhcmFtIHtpbXBvcnQoXCJ2dWVcIikuQXBwfSB2dWVBcHAgKi9cclxuICBsb2FkKHZ1ZUFwcCkge1xyXG4gICAgdnVlQXBwLmNvbXBvbmVudChcclxuICAgICAgXCJjb25maWctcm93XCIsXHJcbiAgICAgIHtcclxuICAgICAgICBwcm9wczogW1wiaXRlbVwiLCBcImV4dGVuc2lvblwiXSxcclxuICAgICAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgICAgPGRpdiB2LXNob3c9XCJpdGVtPy52aXNpYmxlID8/IHRydWVcIiBjbGFzcz1cImFjb3JkLS1jb25maWctcm93IGFjb3JkLS1jb25maWctaXRlbVwiIDpjbGFzcz1cIntcclxuICAgICAgICAgICAgJ2hvcml6b250YWwtYWxpZ24tbGVmdCc6IGl0ZW0/Lmhvcml6b250YWxBbGlnbiA9PT0gJ2xlZnQnLFxyXG4gICAgICAgICAgICAnaG9yaXpvbnRhbC1hbGlnbi1jZW50ZXInOiBpdGVtPy5ob3Jpem9udGFsQWxpZ24gPT09ICdjZW50ZXInLFxyXG4gICAgICAgICAgICAnaG9yaXpvbnRhbC1hbGlnbi1yaWdodCc6IGl0ZW0/Lmhvcml6b250YWxBbGlnbiA9PT0gJ3JpZ2h0JyxcclxuICAgICAgICAgICAgJ2p1c3RpZnktc3BhY2UtYmV0d2Vlbic6IGl0ZW0/Lmp1c3RpZnkgPT09ICdzcGFjZS1iZXR3ZWVuJyxcclxuICAgICAgICAgICAgJ2p1c3RpZnktc3BhY2UtYXJvdW5kJzogaXRlbT8uanVzdGlmeSA9PT0gJ3NwYWNlLWFyb3VuZCcsXHJcbiAgICAgICAgICAgICd2ZXJ0aWNhbC1hbGlnbi10b3AnOiBpdGVtPy52ZXJ0aWNhbEFsaWduID09PSAndG9wJyxcclxuICAgICAgICAgICAgJ3ZlcnRpY2FsLWFsaWduLWNlbnRlcic6IGl0ZW0/LnZlcnRpY2FsQWxpZ24gPT09ICdjZW50ZXInLFxyXG4gICAgICAgICAgICAndmVydGljYWwtYWxpZ24tYm90dG9tJzogaXRlbT8udmVydGljYWxBbGlnbiA9PT0gJ2JvdHRvbSdcclxuICAgICAgICAgIH1cIiA6c3R5bGU9XCJ7J3dpZHRoJzogaXRlbT8ud2lkdGggPz8gJzEwMCUnLCAnaGVpZ2h0JzogaXRlbT8uaGVpZ2h0fVwiID5cclxuICAgICAgICAgICAgPGNvbXBvbmVudCB2LWZvcj1cImNoaWxkIGluIGl0ZW0uY2hpbGRyZW5cIiA6aXM9XCJuYW1lTWFwW2NoaWxkLnR5cGVdXCIgOmtleT1cImNoaWxkLmlkXCIgOml0ZW09XCJjaGlsZFwiIDpleHRlbnNpb249XCJleHRlbnNpb25cIiAvPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgYCxcclxuICAgICAgICBkYXRhKCkge1xyXG4gICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbmFtZU1hcFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgKTtcclxuICB9XHJcbn0iLCAiaW1wb3J0IGV2ZW50cyBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vYXBpL2V2ZW50cy9pbmRleC5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIC8qKiBAcGFyYW0ge2ltcG9ydChcInZ1ZVwiKS5BcHB9IHZ1ZUFwcCAqL1xyXG4gIGxvYWQodnVlQXBwKSB7XHJcbiAgICB2dWVBcHAuY29tcG9uZW50KFwiY29uZmlnLXNlbGVjdFwiLCB7XHJcbiAgICAgIHByb3BzOiBbXCJpdGVtXCIsIFwiZXh0ZW5zaW9uXCJdLFxyXG4gICAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxkaXYgdi1zaG93PVwiaXRlbT8udmlzaWJsZSA/PyB0cnVlXCIgY2xhc3M9XCJhY29yZC0tY29uZmlnLXNlbGVjdCBhY29yZC0tY29uZmlnLWl0ZW1cIj5cclxuICAgICAgICAgIDxkaXNjb3JkLXNlbGVjdCBAY2hhbmdlPVwib25DaGFuZ2VcIiB2LW1vZGVsPVwiaXRlbS52YWx1ZVwiIDpvcHRpb25zPVwiaXRlbS5vcHRpb25zXCIgLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgYCxcclxuICAgICAgbWV0aG9kczoge1xyXG4gICAgICAgIG9uQ2hhbmdlKGRhdGEpIHtcclxuICAgICAgICAgIGV2ZW50cy5lbWl0KFxyXG4gICAgICAgICAgICBcImV4dGVuc2lvbi1jb25maWctaW50ZXJhY3Rpb25cIixcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIGV4dGVuc2lvbjogdGhpcy5leHRlbnNpb24sXHJcbiAgICAgICAgICAgICAgaXRlbTogdGhpcy5pdGVtLFxyXG4gICAgICAgICAgICAgIGRhdGFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59IiwgImV4cG9ydCBkZWZhdWx0IHtcclxuICAvKiogQHBhcmFtIHtpbXBvcnQoXCJ2dWVcIikuQXBwfSB2dWVBcHAgKi9cclxuICBsb2FkKHZ1ZUFwcCkge1xyXG4gICAgdnVlQXBwLmNvbXBvbmVudChcImNvbmZpZy1zcGFjZXJcIiwge1xyXG4gICAgICBwcm9wczogW1wiaXRlbVwiLCBcImV4dGVuc2lvblwiXSxcclxuICAgICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8ZGl2IHYtc2hvdz1cIml0ZW0/LnZpc2libGUgPz8gdHJ1ZVwiIGNsYXNzPVwiYWNvcmQtLWNvbmZpZy1zcGFjZXIgYWNvcmQtLWNvbmZpZy1pdGVtXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwic3BhY2VyXCIgOnN0eWxlPVwieydoZWlnaHQnOiBpdGVtPy5oZWlnaHQsICd3aWR0aCc6IGl0ZW0/LndpZHRofVwiIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIGAsXHJcbiAgICB9KTtcclxuICB9XHJcbn0iLCAiaW1wb3J0IGV2ZW50cyBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vYXBpL2V2ZW50cy9pbmRleC5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIC8qKiBAcGFyYW0ge2ltcG9ydChcInZ1ZVwiKS5BcHB9IHZ1ZUFwcCAqL1xyXG4gIGxvYWQodnVlQXBwKSB7XHJcbiAgICB2dWVBcHAuY29tcG9uZW50KFwiY29uZmlnLXRleHRhcmVhXCIsIHtcclxuICAgICAgcHJvcHM6IFtcIml0ZW1cIiwgXCJleHRlbnNpb25cIl0sXHJcbiAgICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiB2LXNob3c9XCJpdGVtPy52aXNpYmxlID8/IHRydWVcIiBjbGFzcz1cImFjb3JkLS1jb25maWctdGV4dGFyZWEgYWNvcmQtLWNvbmZpZy1pdGVtXCI+XHJcbiAgICAgICAgICA8ZGlzY29yZC10ZXh0YXJlYSBAY2hhbmdlPVwib25DaGFuZ2VcIiB2LW1vZGVsPVwiaXRlbS52YWx1ZVwiIDp0eXBlPVwiaXRlbS5pbnB1dFR5cGVcIiA6cGxhY2Vob2xkZXI9XCJpdGVtLnBsYWNlaG9sZGVyXCIgOm1heGxlbmd0aD1cIml0ZW0ubWF4bGVuZ3RoXCIgOmNvbHM9XCJpdGVtLmNvbHVtbnNcIiA6cm93cz1cIml0ZW0ucm93c1wiIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIGAsXHJcbiAgICAgIG1ldGhvZHM6IHtcclxuICAgICAgICBvbkNoYW5nZShkYXRhKSB7XHJcbiAgICAgICAgICBldmVudHMuZW1pdChcclxuICAgICAgICAgICAgXCJleHRlbnNpb24tY29uZmlnLWludGVyYWN0aW9uXCIsXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBleHRlbnNpb246IHRoaXMuZXh0ZW5zaW9uLFxyXG4gICAgICAgICAgICAgIGl0ZW06IHRoaXMuaXRlbSxcclxuICAgICAgICAgICAgICBkYXRhXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIClcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufSIsICJleHBvcnQgZGVmYXVsdCBgXG4uYWNvcmQtLWNvbmZpZy1pdGVte3dpZHRoOjEwMCU7ZGlzcGxheTpmbGV4fS5hY29yZC0tY29uZmlnLXJvd3t3aWR0aDoxMDAlO2Rpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpyb3c7anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47YWxpZ24taXRlbXM6Y2VudGVyfS5hY29yZC0tY29uZmlnLXJvdy5ob3Jpem9udGFsLWFsaWduLWxlZnR7anVzdGlmeS1jb250ZW50OmZsZXgtc3RhcnR9LmFjb3JkLS1jb25maWctcm93Lmhvcml6b250YWwtYWxpZ24tcmlnaHR7anVzdGlmeS1jb250ZW50OmZsZXgtZW5kfS5hY29yZC0tY29uZmlnLXJvdy5ob3Jpem9udGFsLWFsaWduLWNlbnRlcntqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyfS5hY29yZC0tY29uZmlnLXJvdy5qdXN0aWZ5LXNwYWNlLWJldHdlZW57anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW59LmFjb3JkLS1jb25maWctcm93Lmp1c3RpZnktc3BhY2UtYXJvdW5ke2p1c3RpZnktY29udGVudDpzcGFjZS1hcm91bmR9LmFjb3JkLS1jb25maWctcm93LnZlcnRpY2FsLWFsaWduLXRvcHthbGlnbi1pdGVtczpmbGV4LXN0YXJ0fS5hY29yZC0tY29uZmlnLXJvdy52ZXJ0aWNhbC1hbGlnbi1ib3R0b217YWxpZ24taXRlbXM6ZmxleC1lbmR9LmFjb3JkLS1jb25maWctY29sdW1ue3dpZHRoOjEwMCU7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOmNvbHVtbjtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2VlbjthbGlnbi1pdGVtczpjZW50ZXJ9LmFjb3JkLS1jb25maWctY29sdW1uLmhvcml6b250YWwtYWxpZ24tbGVmdHtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1zdGFydH0uYWNvcmQtLWNvbmZpZy1jb2x1bW4uaG9yaXpvbnRhbC1hbGlnbi1yaWdodHtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1lbmR9LmFjb3JkLS1jb25maWctY29sdW1uLmhvcml6b250YWwtYWxpZ24tY2VudGVye2p1c3RpZnktY29udGVudDpjZW50ZXJ9LmFjb3JkLS1jb25maWctY29sdW1uLmp1c3RpZnktc3BhY2UtYmV0d2VlbntqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2Vlbn0uYWNvcmQtLWNvbmZpZy1jb2x1bW4uanVzdGlmeS1zcGFjZS1hcm91bmR7anVzdGlmeS1jb250ZW50OnNwYWNlLWFyb3VuZH0uYWNvcmQtLWNvbmZpZy1jb2x1bW4udmVydGljYWwtYWxpZ24tdG9we2FsaWduLWl0ZW1zOmZsZXgtc3RhcnR9LmFjb3JkLS1jb25maWctY29sdW1uLnZlcnRpY2FsLWFsaWduLWJvdHRvbXthbGlnbi1pdGVtczpmbGV4LWVuZH0uYWNvcmQtLWNvbmZpZy1jb2x1bW4udmVydGljYWwtYWxpZ24tY2VudGVye2FsaWduLWl0ZW1zOmNlbnRlcn0uYWNvcmQtLWNvbmZpZy1oZWFkaW5ne2ZvbnQtc2l6ZToxLjJyZW07Zm9udC13ZWlnaHQ6NTAwO21hcmdpbi1ib3R0b206LjVyZW07Y29sb3I6I2Y1ZjVmNX0uYWNvcmQtLWNvbmZpZy1wYXJhZ3JhcGh7Zm9udC1zaXplOjFyZW07Zm9udC13ZWlnaHQ6NDAwO21hcmdpbi1ib3R0b206LjVyZW07Y29sb3I6cmdiYSgyNDUsMjQ1LDI0NSwuODUpfWA7XG4iLCAiaW1wb3J0IHBhdGNoZXIgZnJvbSBcIi4uLy4uLy4uLy4uLy4uLy4uL2FwaS9wYXRjaGVyL2luZGV4LmpzXCI7XHJcbmltcG9ydCBjb25maWdCdXR0b24gZnJvbSBcIi4vY29uZmlnLWJ1dHRvbi9pbmRleC5qc1wiO1xyXG5pbXBvcnQgY29uZmlnQ2hlY2sgZnJvbSBcIi4vY29uZmlnLWNoZWNrL2luZGV4LmpzXCI7XHJcbmltcG9ydCBjb25maWdDb2x1bW4gZnJvbSBcIi4vY29uZmlnLWNvbHVtbi9pbmRleC5qc1wiXHJcbmltcG9ydCBjb25maWdIZWFkaW5nIGZyb20gXCIuL2NvbmZpZy1oZWFkaW5nL2luZGV4LmpzXCI7XHJcbmltcG9ydCBjb25maWdJbnB1dCBmcm9tIFwiLi9jb25maWctaW5wdXQvaW5kZXguanNcIjtcclxuaW1wb3J0IGNvbmZpZ1BhcmFncmFwaCBmcm9tIFwiLi9jb25maWctcGFyYWdyYXBoL2luZGV4LmpzXCI7XHJcbmltcG9ydCBjb25maWdSb3cgZnJvbSBcIi4vY29uZmlnLXJvdy9pbmRleC5qc1wiO1xyXG5pbXBvcnQgY29uZmlnU2VsZWN0IGZyb20gXCIuL2NvbmZpZy1zZWxlY3QvaW5kZXguanNcIjtcclxuaW1wb3J0IGNvbmZpZ1NwYWNlciBmcm9tIFwiLi9jb25maWctc3BhY2VyL2luZGV4LmpzXCI7XHJcbmltcG9ydCBjb25maWdUZXh0YXJlYSBmcm9tIFwiLi9jb25maWctdGV4dGFyZWEvaW5kZXguanNcIjtcclxuXHJcbmltcG9ydCBjc3NUZXh0IGZyb20gXCIuL3N0eWxlLnNjc3NcIjtcclxucGF0Y2hlci5pbmplY3RDU1MoY3NzVGV4dCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgLyoqIEBwYXJhbSB7aW1wb3J0KFwidnVlXCIpLkFwcH0gdnVlQXBwICovXHJcbiAgbG9hZCh2dWVBcHApIHtcclxuICAgIGNvbmZpZ1BhcmFncmFwaC5sb2FkKHZ1ZUFwcCk7XHJcbiAgICBjb25maWdIZWFkaW5nLmxvYWQodnVlQXBwKTtcclxuICAgIGNvbmZpZ1NwYWNlci5sb2FkKHZ1ZUFwcCk7XHJcbiAgICBjb25maWdCdXR0b24ubG9hZCh2dWVBcHApO1xyXG4gICAgY29uZmlnQ2hlY2subG9hZCh2dWVBcHApO1xyXG4gICAgY29uZmlnSW5wdXQubG9hZCh2dWVBcHApO1xyXG4gICAgY29uZmlnU2VsZWN0LmxvYWQodnVlQXBwKTtcclxuICAgIGNvbmZpZ1RleHRhcmVhLmxvYWQodnVlQXBwKTtcclxuICAgIGNvbmZpZ0NvbHVtbi5sb2FkKHZ1ZUFwcCk7XHJcbiAgICBjb25maWdSb3cubG9hZCh2dWVBcHApO1xyXG4gIH1cclxufSIsICJleHBvcnQgZGVmYXVsdCBgXG4uYWNvcmQtLWluc3RhbGxlZC1leHRlbnNpb24tY2FyZHt3aWR0aDoxMDAlO2JhY2tncm91bmQtY29sb3I6cmdiYSgwLDAsMCwuMSk7Ym9yZGVyLXJhZGl1czo4cHg7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOmNvbHVtbjtnYXA6MTZweH0uYWNvcmQtLWluc3RhbGxlZC1leHRlbnNpb24tY2FyZD4udG9we2JhY2tncm91bmQtY29sb3I6cmdiYSgwLDAsMCwuMSk7Ym9yZGVyLXJhZGl1czo4cHg7d2lkdGg6MTAwJTtwYWRkaW5nOjhweDtoZWlnaHQ6MTAwcHh9YDtcbiIsICJpbXBvcnQgaTE4biBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vYXBpL2kxOG4vaW5kZXguanNcIjtcclxuaW1wb3J0IHBhdGNoZXIgZnJvbSBcIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2FwaS9wYXRjaGVyL2luZGV4LmpzXCI7XHJcbmltcG9ydCBleHRlbnNpb25zIGZyb20gXCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9hcGkvZXh0ZW5zaW9ucy9pbmRleC5qc1wiO1xyXG5cclxuaW1wb3J0IGNzc1RleHQgZnJvbSBcIi4vc3R5bGUuc2Nzc1wiO1xyXG5pbXBvcnQgeyByZWNvbXB1dGFibGUsIHJlY29tcHV0ZSB9IGZyb20gXCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9hcGkvdWkvdnVlL3V0aWxzL3JlY29tcHV0ZS5qc1wiO1xyXG5wYXRjaGVyLmluamVjdENTUyhjc3NUZXh0KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAvKiogQHBhcmFtIHtpbXBvcnQoXCJ2dWVcIikuQXBwfSB2dWVBcHAgKi9cclxuICBsb2FkKHZ1ZUFwcCkge1xyXG4gICAgdnVlQXBwLmNvbXBvbmVudChcclxuICAgICAgXCJpbnN0YWxsZWQtZXh0ZW5zaW9uLWNhcmRcIixcclxuICAgICAge1xyXG4gICAgICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWNvcmQtLWluc3RhbGxlZC1leHRlbnNpb24tY2FyZFwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidG9wXCI+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxlZnRcIj5cclxuXHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJpZ2h0XCI+XHJcblxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJvdHRvbVwiPlxyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIGAsXHJcbiAgICAgICAgZGF0YSgpIHtcclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGV4cGFuZGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgdXJsOiBudWxsLFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbXB1dGVkOiB7XHJcbiAgICAgICAgICBleHRlbnNpb246IHJlY29tcHV0YWJsZShcclxuICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgIHJldHVybiBleHRlbnNpb25zLmdldCh0aGlzLnVybCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiZXh0ZW5zaW9uXCJcclxuICAgICAgICAgIClcclxuICAgICAgICB9LFxyXG4gICAgICAgIG1vdW50ZWQoKSB7XHJcbiAgICAgICAgICByZWNvbXB1dGUodGhpcywgXCJleHRlbnNpb25cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICApO1xyXG4gIH1cclxufSIsICJleHBvcnQgZGVmYXVsdCBgXG4uYWNvcmQtLXN0b3JlLWV4dGVuc2lvbi1jYXJke3dpZHRoOjI3NXB4O2hlaWdodDoyNTBweDtkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1uO2JvcmRlci1yYWRpdXM6NHB4O2NvbnRhaW46Y29udGVudDtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMCwwLDAsLjEpO2JveC1zaGFkb3c6dmFyKC0tZWxldmF0aW9uLW1lZGl1bSl9LmFjb3JkLS1zdG9yZS1leHRlbnNpb24tY2FyZD4ucHJldmlld3t3aWR0aDoxMDAlO2hlaWdodDoxMDBweDtkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1uO2p1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVuO2FsaWduLWl0ZW1zOmNlbnRlcjtiYWNrZ3JvdW5kLWNvbG9yOnZhcigtLWJyYW5kLTUwMCk7YmFja2dyb3VuZC1wb3NpdGlvbjpjZW50ZXI7YmFja2dyb3VuZC1zaXplOmNvdmVyfS5hY29yZC0tc3RvcmUtZXh0ZW5zaW9uLWNhcmQ+LnByZXZpZXc+LmNvbnRyb2xze3BhZGRpbmc6OHB4O2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47d2lkdGg6MTAwJX0uYWNvcmQtLXN0b3JlLWV4dGVuc2lvbi1jYXJkPi5wcmV2aWV3Pi5jb250cm9scyAuZ297YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDAsMCwwLC41KTtib3gtc2hhZG93OjBweCAwcHggNHB4IHJnYmEoMCwwLDAsLjUpO2JvcmRlci1yYWRpdXM6NTAlO3dpZHRoOjI0cHg7aGVpZ2h0OjI0cHg7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO2NvbG9yOnZhcigtLWhlYWRlci1wcmltYXJ5KTtmb250LXdlaWdodDo2MDA7Y3Vyc29yOnBvaW50ZXJ9LmFjb3JkLS1zdG9yZS1leHRlbnNpb24tY2FyZD4ucHJldmlldz4ubmFtZS1jb250YWluZXJ7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO2NvbG9yOnZhcigtLWhlYWRlci1wcmltYXJ5KTtwYWRkaW5nOjhweH0uYWNvcmQtLXN0b3JlLWV4dGVuc2lvbi1jYXJkPi5wcmV2aWV3Pi5uYW1lLWNvbnRhaW5lcj4ubmFtZXtmb250LXNpemU6MTRweDtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMCwwLDAsLjUpO2JveC1zaGFkb3c6MHB4IDBweCA0cHggcmdiYSgwLDAsMCwuNSk7Ym9yZGVyLXJhZGl1czo5OTk5cHg7cGFkZGluZzo0cHggOHB4fS5hY29yZC0tc3RvcmUtZXh0ZW5zaW9uLWNhcmQ+LmluZm8tY29udGFpbmVye2Rpc3BsYXk6ZmxleDtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2VlbjtmbGV4LWRpcmVjdGlvbjpjb2x1bW47cGFkZGluZzo4cHg7aGVpZ2h0OjE1MHB4O3dpZHRoOjEwMCV9LmFjb3JkLS1zdG9yZS1leHRlbnNpb24tY2FyZD4uaW5mby1jb250YWluZXI+LnRvcHtkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1uO2dhcDo0cHg7aGVpZ2h0OjEwMCV9LmFjb3JkLS1zdG9yZS1leHRlbnNpb24tY2FyZD4uaW5mby1jb250YWluZXI+LnRvcD4ubmFtZS1jb250YWluZXJ7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtnYXA6NHB4O3dpZHRoOjEwMCV9LmFjb3JkLS1zdG9yZS1leHRlbnNpb24tY2FyZD4uaW5mby1jb250YWluZXI+LnRvcD4ubmFtZS1jb250YWluZXI+Lm5hbWV7Zm9udC1zaXplOjE2cHg7Zm9udC13ZWlnaHQ6NTAwO2NvbG9yOnZhcigtLWhlYWRlci1wcmltYXJ5KX0uYWNvcmQtLXN0b3JlLWV4dGVuc2lvbi1jYXJkPi5pbmZvLWNvbnRhaW5lcj4udG9wPi5uYW1lLWNvbnRhaW5lcj4udmVyc2lvbntmb250LXNpemU6MTJweDtmb250LXdlaWdodDo1MDA7Y29sb3I6dmFyKC0taGVhZGVyLXByaW1hcnkpO29wYWNpdHk6LjV9LmFjb3JkLS1zdG9yZS1leHRlbnNpb24tY2FyZD4uaW5mby1jb250YWluZXI+LnRvcD4uZGVzY3JpcHRpb257Zm9udC1zaXplOjE0cHg7Zm9udC13ZWlnaHQ6MzAwO2NvbG9yOnZhcigtLWhlYWRlci1wcmltYXJ5KTtvcGFjaXR5Oi43NTt3aWR0aDoxMDAlfS5hY29yZC0tc3RvcmUtZXh0ZW5zaW9uLWNhcmQ+LmluZm8tY29udGFpbmVyPi5ib3R0b217ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmZsZXgtc3RhcnQ7anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47aGVpZ2h0OjEwMCV9LmFjb3JkLS1zdG9yZS1leHRlbnNpb24tY2FyZD4uaW5mby1jb250YWluZXI+LmJvdHRvbT4ubGVmdHtoZWlnaHQ6MTAwJTtkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1uO2FsaWduLWl0ZW1zOmZsZXgtc3RhcnQ7anVzdGlmeS1jb250ZW50OmZsZXgtZW5kfS5hY29yZC0tc3RvcmUtZXh0ZW5zaW9uLWNhcmQ+LmluZm8tY29udGFpbmVyPi5ib3R0b20+LmxlZnQ+LmF1dGhvcnN7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOmNvbHVtbjtnYXA6NHB4fS5hY29yZC0tc3RvcmUtZXh0ZW5zaW9uLWNhcmQ+LmluZm8tY29udGFpbmVyPi5ib3R0b20+LmxlZnQ+LmF1dGhvcnMgLmF1dGhvcntkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2JvcmRlci1yYWRpdXM6OTk5OXB4O2JhY2tncm91bmQtY29sb3I6cmdiYSgwLDAsMCwuMSk7Y3Vyc29yOnBvaW50ZXJ9LmFjb3JkLS1zdG9yZS1leHRlbnNpb24tY2FyZD4uaW5mby1jb250YWluZXI+LmJvdHRvbT4ubGVmdD4uYXV0aG9ycyAuYXV0aG9yPi5pbWFnZXtib3JkZXItcmFkaXVzOjUwJTt3aWR0aDoxOHB4O2hlaWdodDoxOHB4O2JhY2tncm91bmQtY29sb3I6dmFyKC0tYnJhbmQtNTAwKTtiYWNrZ3JvdW5kLXBvc2l0aW9uOmNlbnRlcjtiYWNrZ3JvdW5kLXNpemU6Y292ZXJ9LmFjb3JkLS1zdG9yZS1leHRlbnNpb24tY2FyZD4uaW5mby1jb250YWluZXI+LmJvdHRvbT4ubGVmdD4uYXV0aG9ycyAuYXV0aG9yPi5uYW1le2ZvbnQtc2l6ZToxMHB4O2ZvbnQtd2VpZ2h0OjQwMDtjb2xvcjp2YXIoLS1oZWFkZXItcHJpbWFyeSk7b3BhY2l0eTouNzU7cGFkZGluZzo2cHh9LmFjb3JkLS1zdG9yZS1leHRlbnNpb24tY2FyZD4uaW5mby1jb250YWluZXI+LmJvdHRvbT4ucmlnaHR7aGVpZ2h0OjEwMCU7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOmNvbHVtbjthbGlnbi1pdGVtczpmbGV4LWVuZDtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1lbmR9YDtcbiIsICJpbXBvcnQgbW9kYWxzIGZyb20gXCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9hcGkvdWkvbW9kYWxzLmpzeFwiO1xyXG5pbXBvcnQgaTE4biBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vYXBpL2kxOG4vaW5kZXguanNcIjtcclxuaW1wb3J0IHBhdGNoZXIgZnJvbSBcIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2FwaS9wYXRjaGVyL2luZGV4LmpzXCI7XHJcblxyXG5pbXBvcnQgY3NzVGV4dCBmcm9tIFwiLi9zdHlsZS5zY3NzXCI7XHJcbnBhdGNoZXIuaW5qZWN0Q1NTKGNzc1RleHQpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIC8qKiBAcGFyYW0ge2ltcG9ydChcInZ1ZVwiKS5BcHB9IHZ1ZUFwcCAqL1xyXG4gIGxvYWQodnVlQXBwKSB7XHJcbiAgICB2dWVBcHAuY29tcG9uZW50KFxyXG4gICAgICBcInN0b3JlLWV4dGVuc2lvbi1jYXJkXCIsXHJcbiAgICAgIHtcclxuICAgICAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImFjb3JkLS1zdG9yZS1leHRlbnNpb24tY2FyZFwiPlxyXG4gICAgICAgICAgICA8ZGl2IHYtaWY9XCJleHRlbnNpb24ucHJldmlld3M/Lmxlbmd0aFwiIGNsYXNzPVwicHJldmlld1wiIDpzdHlsZT1cInsgYmFja2dyb3VuZEltYWdlOiAndXJsKCcgKyBleHRlbnNpb24ucHJldmlld3Nbc2VsZWN0ZWRQcmV2aWV3XS5pbWFnZSArICcpJyB9XCI+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRyb2xzXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ28gZ28tYmFja1wiIEBjbGljaz1cImdvQmFja1wiPlxyXG4gICAgICAgICAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD1cIk0xMS44MjggMTJsMi44MjkgMi44MjgtMS40MTQgMS40MTVMOSAxMmw0LjI0My00LjI0MyAxLjQxNCAxLjQxNUwxMS44MjggMTJ6XCIgZmlsbD1cImN1cnJlbnRDb2xvclwiIC8+XHJcbiAgICAgICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ28gZ28tZm9yd2FyZFwiIEBjbGljaz1cImdvRm9yd2FyZFwiPlxyXG4gICAgICAgICAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD1cIk0xMi4xNzIgMTJMOS4zNDMgOS4xNzJsMS40MTQtMS40MTVMMTUgMTJsLTQuMjQzIDQuMjQzLTEuNDE0LTEuNDE1elwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIiAvPlxyXG4gICAgICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJuYW1lLWNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm5hbWVcIj5cclxuICAgICAgICAgICAgICAgICAge3sgZXh0ZW5zaW9uLnByZXZpZXdzW3NlbGVjdGVkUHJldmlld10ubmFtZSB9fVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IHYtZWxzZSBjbGFzcz1cInByZXZpZXcgbm8tcHJldmlld1wiPjwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5mby1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidG9wXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibmFtZS1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm5hbWVcIj57eyBpMThuTG9jYWxpemUoZXh0ZW5zaW9uLm5hbWUpIH19PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ2ZXJzaW9uXCI+dnt7IGV4dGVuc2lvbi52ZXJzaW9uIH19PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkZXNjcmlwdGlvblwiPnt7IGkxOG5Mb2NhbGl6ZShleHRlbnNpb24uZGVzY3JpcHRpb24pIH19PC9kaXY+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJvdHRvbVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxlZnRcIj5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImF1dGhvcnNcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHYtZm9yPVwiYXV0aG9yIGluIGV4dGVuc2lvbi5hdXRob3JzXCIgY2xhc3M9XCJhdXRob3JcIiA6a2V5PVwiYXV0aG9yLm5hbWVcIiBAY2xpY2s9XCJzaG93UHJvZmlsZShhdXRob3IuaWQpXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW1hZ2VcIiA6c3R5bGU9XCJ7IGJhY2tncm91bmRJbWFnZTogJ3VybCgnICsgYXV0aG9yLmltYWdlICsgJyknIH1cIj48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJuYW1lXCI+e3sgYXV0aG9yLm5hbWUgfX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyaWdodFwiPlxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnV0dG9uc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIEBjbGljaz1cImluc3RhbGxPclVuaW5zdGFsbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPGRpc2NvcmQtYnV0dG9uIDp2YWx1ZT1cImkxOG5Gb3JtYXQoZXh0ZW5zaW9uLmluc3RhbGxlZCA/ICdVTklOU1RBTEwnIDogJ0lOU1RBTEwnKVwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIGAsXHJcbiAgICAgICAgcHJvcHM6IFtcImV4dGVuc2lvblwiXSxcclxuICAgICAgICBkYXRhKCkge1xyXG4gICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgc2VsZWN0ZWRQcmV2aWV3OiAwLFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG1ldGhvZHM6IHtcclxuICAgICAgICAgIGkxOG5Gb3JtYXQ6IGkxOG4uZm9ybWF0LFxyXG4gICAgICAgICAgaTE4bkxvY2FsaXplOiBpMThuLmxvY2FsaXplLFxyXG4gICAgICAgICAgaW5zdGFsbE9yVW5pbnN0YWxsKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5leHRlbnNpb24uaW5zdGFsbGVkKSB7XHJcbiAgICAgICAgICAgICAgLy8gdW5pbnN0YWxsXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgLy8gaW5zdGFsbFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgZ29CYWNrKCkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkUHJldmlldy0tO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZFByZXZpZXcgPCAwKSB0aGlzLnNlbGVjdGVkUHJldmlldyA9IHRoaXMuZXh0ZW5zaW9uLnByZXZpZXdzLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgZ29Gb3J3YXJkKCkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkUHJldmlldysrO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZFByZXZpZXcgPj0gdGhpcy5leHRlbnNpb24ucHJldmlld3MubGVuZ3RoKSB0aGlzLnNlbGVjdGVkUHJldmlldyA9IDA7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgc2hvd1Byb2ZpbGUocHJvZmlsZUlkKSB7XHJcbiAgICAgICAgICAgIG1vZGFscy5zaG93LnVzZXIocHJvZmlsZUlkKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIClcclxuICB9XHJcbn0iLCAiaW1wb3J0IGluc3RhbGxlZEV4dGVuc2lvbkNhcmQgZnJvbSBcIi4vaW5zdGFsbGVkLWV4dGVuc2lvbi1jYXJkL2luZGV4LmpzXCI7XHJcbmltcG9ydCBzdG9yZUV4dGVuc2lvbkNhcmQgZnJvbSBcIi4vc3RvcmUtZXh0ZW5zaW9uLWNhcmQvaW5kZXguanNcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIC8qKiBAcGFyYW0ge2ltcG9ydChcInZ1ZVwiKS5BcHB9IHZ1ZUFwcCAqL1xyXG4gIGxvYWQodnVlQXBwKSB7XHJcbiAgICBzdG9yZUV4dGVuc2lvbkNhcmQubG9hZCh2dWVBcHApO1xyXG4gICAgaW5zdGFsbGVkRXh0ZW5zaW9uQ2FyZC5sb2FkKHZ1ZUFwcCk7XHJcbiAgfVxyXG59IiwgIlxyXG5pbXBvcnQgY29uZmlnQ29tcG9uZW50cyBmcm9tIFwiLi9jb25maWcvaW5kZXguanNcIjtcclxuaW1wb3J0IGNhcmRDb21wb25lbnRzIGZyb20gXCIuL2NhcmRzL2luZGV4LmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgLyoqIEBwYXJhbSB7aW1wb3J0KFwidnVlXCIpLkFwcH0gdnVlQXBwICovXHJcbiAgbG9hZCh2dWVBcHApIHtcclxuICAgIGNvbmZpZ0NvbXBvbmVudHMubG9hZCh2dWVBcHApO1xyXG4gICAgY2FyZENvbXBvbmVudHMubG9hZCh2dWVBcHApO1xyXG4gIH1cclxufSIsICJpbXBvcnQgcGFnZXMgZnJvbSBcIi4vcGFnZXMvaW5kZXguanNcIjtcclxuaW1wb3J0IGNvbXBvbmVudHMgZnJvbSBcIi4vY29tcG9uZW50cy9pbmRleC5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIC8qKiBAcGFyYW0ge2ltcG9ydChcInZ1ZVwiKS5BcHB9IHZ1ZUFwcCAqL1xyXG4gIGxvYWQodnVlQXBwKSB7XHJcbiAgICBjb21wb25lbnRzLmxvYWQodnVlQXBwKTtcclxuICAgIHBhZ2VzLmxvYWQodnVlQXBwKTtcclxuICB9XHJcbn0iLCAiaW1wb3J0IGRvbSBmcm9tIFwiLi4vLi4vYXBpL2RvbS9pbmRleC5qc1wiO1xyXG5pbXBvcnQgd2VicGFjayBmcm9tIFwiLi4vLi4vYXBpL21vZHVsZXMvd2VicGFjay5qc1wiO1xyXG5pbXBvcnQgcGF0Y2hlciBmcm9tIFwiLi4vLi4vYXBpL3BhdGNoZXIvaW5kZXguanNcIjtcclxuaW1wb3J0IHV0aWxzIGZyb20gXCIuLi8uLi9hcGkvdXRpbHMvaW5kZXguanNcIjtcclxuaW1wb3J0IGkxOG4gZnJvbSBcIi4uLy4uL2FwaS9pMThuL2luZGV4LmpzXCI7XHJcbmltcG9ydCB1aSBmcm9tIFwiLi4vLi4vYXBpL3VpL2luZGV4LmpzXCI7XHJcblxyXG5pbXBvcnQgY3NzVGV4dCBmcm9tIFwiLi9zdHlsZS5zY3NzXCI7XHJcbmltcG9ydCB2dWVDb21wb25lbnRzIGZyb20gXCIuL3Z1ZS9jb21wb25lbnRzL2luZGV4LmpzXCI7XHJcbnBhdGNoZXIuaW5qZWN0Q1NTKGNzc1RleHQpO1xyXG5cclxue1xyXG4gIGxldCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xyXG4gIHNjcmlwdC5zcmMgPSBcImh0dHBzOi8vdW5wa2cuY29tL3Z1ZUAzL2Rpc3QvdnVlLmdsb2JhbC5qc1wiO1xyXG4gIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcclxufVxyXG5cclxuZG9tLnBhdGNoKCdhW2hyZWY9XCIvc3RvcmVcIl1bZGF0YS1saXN0LWl0ZW0taWQkPVwiX19fbml0cm9cIl0nLCAoZWxtKSA9PiB7XHJcbiAgdXRpbHMuaWZFeGlzdHMoXHJcbiAgICBlbG0ucXVlcnlTZWxlY3RvcignW2NsYXNzKj1cIm5hbWVBbmREZWNvcmF0b3JzLVwiXSBbY2xhc3MqPVwibmFtZS1cIl0nKSxcclxuICAgIChuYW1lRWxtKSA9PiB7XHJcbiAgICAgIG5hbWVFbG0udGV4dENvbnRlbnQgPSBpMThuLmZvcm1hdChcIkFQUF9OQU1FXCIpO1xyXG4gICAgfVxyXG4gICk7XHJcblxyXG4gIHV0aWxzLmlmRXhpc3RzKFxyXG4gICAgZWxtLnF1ZXJ5U2VsZWN0b3IoJ1tjbGFzcyo9XCJwcmVtaXVtVHJpYWxBY2tub3dsZWRnZWRCYWRnZS1cIl0nKSxcclxuICAgIChuaXRyb0VsbSkgPT4ge1xyXG4gICAgICBuaXRyb0VsbS5yZW1vdmUoKTtcclxuICAgIH1cclxuICApO1xyXG5cclxuICB1dGlscy5pZkV4aXN0cyhcclxuICAgIGVsbS5xdWVyeVNlbGVjdG9yKCdbY2xhc3MqPVwiYXZhdGFyV2l0aFRleHQtXCJdIFtjbGFzcyo9XCJhdmF0YXItXCJdIHN2ZycpLFxyXG4gICAgZmlsbFNWR0VsbVdpdGhBY29yZExvZ29cclxuICApO1xyXG59KTtcclxuXHJcbmxldCBpbnRlcm5hbFZ1ZUFwcCA9IG51bGw7XHJcblxyXG5jb25zdCBoZWFkZXJJdGVtQ2xhc3NlcyA9IHdlYnBhY2suZmluZEJ5UHJvcGVydGllcyhcImRpdmlkZXJcIiwgXCJoYW1idXJnZXJcIiwgXCJ0aGVtZWRcIik7XHJcbmNvbnN0IHRhYkJhckNsYXNzZXMgPSB3ZWJwYWNrLmZpbmRCeVByb3BlcnRpZXMoXCJ0YWJCYXJcIiwgXCJtYXhXaWR0aFdpdGhUb29sYmFyXCIpO1xyXG5jb25zdCBoZWFkZXJDbGFzc2VzID0gd2VicGFjay5maW5kQnlQcm9wZXJ0aWVzKFwidG9wUGlsbFwiLCBcImhlYWRlclRleHRcIik7XHJcbmRvbS5wYXRjaCgnW2NsYXNzKj1cImFwcGxpY2F0aW9uU3RvcmUtXCJdIFtjbGFzcyo9XCJob21lV3JhcHBlck5vcm1hbC1cIl0nLCAoZWxtKSA9PiB7XHJcblxyXG4gIHV0aWxzLmlmRXhpc3RzKFxyXG4gICAgZWxtLnF1ZXJ5U2VsZWN0b3IoJ1tjbGFzcyo9XCJoZWFkZXJCYXItXCJdIFtjbGFzcyo9XCJ0aXRsZVdyYXBwZXItXCJdIFtjbGFzcyo9XCJ0aXRsZS1cIl0nKSxcclxuICAgICh0aXRsZUVsbSkgPT4ge1xyXG4gICAgICB0aXRsZUVsbS50ZXh0Q29udGVudCA9IGkxOG4uZm9ybWF0KFwiQVBQX05BTUVcIik7XHJcblxyXG4gICAgICBpZiAoaW50ZXJuYWxWdWVBcHApIHtcclxuICAgICAgICBsZXQgY29udGFpbmVyID0gZG9tLnBhcmVudHModGl0bGVFbG0sIDIpLnBvcCgpO1xyXG5cclxuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICBkb20ucGFyc2UoYDxkaXYgY2xhc3M9XCIke2hlYWRlckl0ZW1DbGFzc2VzLmRpdmlkZXJ9XCI+PC9kaXY+YClcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBjb25zdCBidXR0b25zQ29udGFpbmVyID0gZG9tLnBhcnNlKGBcclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCIke3RhYkJhckNsYXNzZXMudGFiQmFyfSAke2hlYWRlckNsYXNzZXMudG9wUGlsbH1cIj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIGApO1xyXG5cclxuICAgICAgICBsZXQgYnV0dG9ucyA9IFtdO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBidWlsZEJ1dHRvbihpZCwgdGV4dCwgY3VzdG9tQ2xhc3NlcyA9IFwiXCIpIHtcclxuICAgICAgICAgIGxldCBlbG0gPSBkb20ucGFyc2UoYDxkaXYgaWQ9XCJ0YWItYnV0dG9uLSR7aWR9XCIgY2xhc3M9XCJhY29yZC0tdGFicy10YWItYnV0dG9uICR7Y3VzdG9tQ2xhc3Nlc30gJHt0YWJCYXJDbGFzc2VzLml0ZW19ICR7aGVhZGVyQ2xhc3Nlcy5pdGVtfSAke2hlYWRlckNsYXNzZXMudGhlbWVkfVwiPiR7dGV4dH08L2Rpdj5gKTtcclxuXHJcbiAgICAgICAgICBidXR0b25zLnB1c2goZWxtKTtcclxuXHJcbiAgICAgICAgICBlbG0uc2V0U2VsZWN0ZWQgPSAocykgPT4ge1xyXG4gICAgICAgICAgICBpZiAocykgZWxtLmNsYXNzTGlzdC5hZGQoaGVhZGVyQ2xhc3Nlcy5zZWxlY3RlZCwgXCJzZWxlY3RlZFwiKTtcclxuICAgICAgICAgICAgZWxzZSBlbG0uY2xhc3NMaXN0LnJlbW92ZShoZWFkZXJDbGFzc2VzLnNlbGVjdGVkLCBcInNlbGVjdGVkXCIpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGVsbS5zZXRTZWxlY3RlZChpbnRlcm5hbFZ1ZUFwcC5zZWxlY3RlZFRhYiA9PT0gaWQpO1xyXG5cclxuICAgICAgICAgIGVsbS5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBidXR0b25zLmZvckVhY2goKGIpID0+IGIuc2V0U2VsZWN0ZWQoZmFsc2UpKTtcclxuICAgICAgICAgICAgZWxtLnNldFNlbGVjdGVkKHRydWUpO1xyXG4gICAgICAgICAgICBpbnRlcm5hbFZ1ZUFwcC5zZWxlY3RlZFRhYiA9IGlkO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIGVsbTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGJ1dHRvbnNDb250YWluZXIuYXBwZW5kQ2hpbGQoYnVpbGRCdXR0b24oXCJob21lXCIsIGkxOG4uZm9ybWF0KFwiSE9NRVwiKSkpO1xyXG4gICAgICAgIGJ1dHRvbnNDb250YWluZXIuYXBwZW5kQ2hpbGQoYnVpbGRCdXR0b24oXCJpbnN0YWxsZWQtZXh0ZW5zaW9uc1wiLCBpMThuLmZvcm1hdChcIklOU1RBTExFRF9FWFRFTlNJT05TXCIpKSk7XHJcbiAgICAgICAgYnV0dG9uc0NvbnRhaW5lci5hcHBlbmRDaGlsZChidWlsZEJ1dHRvbihcInNldHRpbmdzXCIsIGkxOG4uZm9ybWF0KFwiU0VUVElOR1NcIikpKTtcclxuICAgICAgICBidXR0b25zQ29udGFpbmVyLmFwcGVuZENoaWxkKGJ1aWxkQnV0dG9uKFwic3RvcmVcIiwgaTE4bi5mb3JtYXQoXCJFWFRFTlNJT05fU1RPUkVcIiksIFwic3RvcmUtdGFiLWJ1dHRvblwiKSk7XHJcblxyXG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChidXR0b25zQ29udGFpbmVyKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICk7XHJcbiAgdXRpbHMuaWZFeGlzdHMoXHJcbiAgICBlbG0ucXVlcnlTZWxlY3RvcignW2NsYXNzKj1cImhlYWRlckJhci1cIl0gW2NsYXNzKj1cImljb25XcmFwcGVyLVwiXSBbY2xhc3MqPVwiaWNvbi1cIl0nKSxcclxuICAgIGZpbGxTVkdFbG1XaXRoQWNvcmRMb2dvXHJcbiAgKTtcclxufSk7XHJcblxyXG5mdW5jdGlvbiBmaWxsU1ZHRWxtV2l0aEFjb3JkTG9nbyhzdmdFbG0pIHtcclxuICBzdmdFbG0uc2V0QXR0cmlidXRlKFwidmlld0JveFwiLCBcIjAgMCA4MTMuNSAxNDkzXCIpO1xyXG4gIHN2Z0VsbS5zZXRBdHRyaWJ1dGUoXCJ4bWxuc1wiLCBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIpO1xyXG4gIHN2Z0VsbS5pbm5lckhUTUwgPSBgXHJcbiAgICA8ZGVmcz5cclxuICAgICAgPHN0eWxlPlxyXG4gICAgICAgIC5hY29yZC0tbG9nby1jb2xvciB7XHJcbiAgICAgICAgICBmaWxsOiBjdXJyZW50Q29sb3I7XHJcbiAgICAgICAgICBmaWxsLXJ1bGU6IGV2ZW5vZGQ7XHJcbiAgICAgICAgfVxyXG4gICAgICA8L3N0eWxlPlxyXG4gICAgPC9kZWZzPlxyXG4gICAgPGc+XHJcbiAgICAgIDxwYXRoIGNsYXNzPVwiYWNvcmQtLWxvZ28tY29sb3JcIiBkPVwiTTgxNy4yNjYsMTMyMi41aDI4NXYzNjVoLTI4NXYtMzY1WlwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgtNTUzLjI1IC0yMTMuNSlcIi8+XHJcbiAgICAgIDxwYXRoIGNsYXNzPVwiYWNvcmQtLWxvZ28tY29sb3JcIiBkPVwiTTU1NS4yMzUsMTUyMy43OHM5MS4xNjktMzE5Ljg1LDkyLjUzMS0zMTkuMjhjMTE0LjcsNDcuODMsMTYwLDE5MiwxNjAsMTkybC01Mi4xMiwxODYuNjFzLTMxLjEyOSwxMzcuNzEtODAuODgsMTIwLjM5QzUyOC4wMjYsMTY1Mi40Miw1NTUuMjM1LDE1MjMuNzgsNTU1LjIzNSwxNTIzLjc4WlwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgtNTUzLjI1IC0yMTMuNSlcIi8+XHJcbiAgICAgIDxwYXRoIGNsYXNzPVwiYWNvcmQtLWxvZ28tY29sb3JcIiBkPVwiTTEzNjQuNzcsMTUyNS4yOHMtOTEuMTctMzE5Ljg1LTkyLjU0LTMxOS4yOGMtMTE0LjcsNDcuODMtMTYwLDE5Mi0xNjAsMTkybDUyLjEyLDE4Ni42MXMzMS4xMywxMzcuNzEsODAuODgsMTIwLjM5QzEzOTEuOTcsMTY1My45MiwxMzY0Ljc3LDE1MjUuMjgsMTM2NC43NywxNTI1LjI4WlwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgtNTUzLjI1IC0yMTMuNSlcIi8+XHJcbiAgICA8L2c+XHJcbiAgICA8cGF0aCBjbGFzcz1cImFjb3JkLS1sb2dvLWNvbG9yXCIgZD1cIk04NzQuNzY2LDI3NS41czE0LjU3OS02MS45MTgsODctNjJjODAuODI0LS4wOTIsODcsNjIsODcsNjJzMTk5LjQzLDg1MS40NywxOTgsODUyYy0yMTAuMzMsNzcuNzEtMTQ2LDE4MC0xNDYsMTgwaC0yODFzNjMuNy0xMDMuODItMTQ2LTE4MUM2NzEuMDE0LDExMjUuNDksODc0Ljc2NiwyNzUuNSw4NzQuNzY2LDI3NS41WlwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgtNTUzLjI1IC0yMTMuNSlcIi8+XHJcbiAgICA8Zz5cclxuICAgICAgPHBhdGggY2xhc3M9XCJhY29yZC0tbG9nby1jb2xvclwiIGQ9XCJNMTIzOC4xNCw4OTcuNWE1My44ODIsNTMuODgyLDAsMCwxLDUzLjg4LDUzLjg3NWMwLDI0LjkzOS0yMC4yNSw0Ni45ODctNDMuMjUsNTMuMTI1LTQuNDUsMS4xOC0xMC4xOS0zOS0xMS0zOS0wLjU4LDAtMjcuNzEsMy41MS0zMSw0LTUuNTguODI4LTExLjkzLTEzLjg3Ni00LTIwLDEuOTMtMS40OTEsMjYuNjItNi45NTksMjktNywwLjYyLS4wMTEtNy4zNC00MS42MTgtNy00M0MxMjI1LjY0LDg5NS45NDQsMTIzMy41Miw4OTcuNSwxMjM4LjE0LDg5Ny41WlwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgtNTUzLjI1IC0yMTMuNSlcIi8+XHJcbiAgICAgIDxwYXRoIGNsYXNzPVwiYWNvcmQtLWxvZ28tY29sb3JcIiBkPVwiTTExNzMuNjQsNjMyLjVhNTMuODgyLDUzLjg4MiwwLDAsMSw1My44OCw1My44NzVjMCwyNC45MzktMjAuMjUsNDYuOTg3LTQzLjI1LDUzLjEyNS00LjQ1LDEuMTg1LTEwLjE5LTM5LTExLTM5LTAuNTgsMC0yNy43MSwzLjUxLTMxLDQtNS41OC44MjgtMTEuOTMtMTMuODc2LTQtMjAsMS45My0xLjQ5MSwyNi42Mi02Ljk1OSwyOS03LDAuNjItLjAxMS03LjM0LTQxLjYxOC03LTQzQzExNjEuMTQsNjMwLjk0NCwxMTY5LjAyLDYzMi41LDExNzMuNjQsNjMyLjVaXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKC01NTMuMjUgLTIxMy41KVwiLz5cclxuICAgICAgPHBhdGggY2xhc3M9XCJhY29yZC0tbG9nby1jb2xvclwiIGQ9XCJNMTExNS4xNiwzNzNhNTMuODc0LDUzLjg3NCwwLDAsMSw1My44Nyw1My44NzVjMCwyNC45MzktMjAuMjQsNDYuOTg3LTQzLjI1LDUzLjEyNS00LjQ0LDEuMTg1LTEwLjE4LTM5LTExLTM5LTAuNTgsMC0yNy43LDMuNTEtMzEsNC01LjU3LjgyOC0xMS45Mi0xMy44NzYtNC0yMCwxLjkzLTEuNDkxLDI2LjYyLTYuOTU5LDI5LTcsMC42Mi0uMDExLTcuMzQtNDEuNjE4LTctNDNDMTEwMi42NSwzNzEuNDQ0LDExMTAuNTMsMzczLDExMTUuMTYsMzczWlwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgtNTUzLjI1IC0yMTMuNSlcIi8+XHJcbiAgICA8L2c+XHJcbiAgICA8Zz5cclxuICAgICAgPHBhdGggY2xhc3M9XCJhY29yZC0tbG9nby1jb2xvclwiIGQ9XCJNNjgzLjkyMiw4OTcuNzVhNTMuODc1LDUzLjg3NSwwLDAsMC01My44NzUsNTMuODc1YzAsMjQuOTM5LDIwLjI0NSw0Ni45ODcsNDMuMjUsNTMuMTI1LDQuNDQxLDEuMTgsMTAuMTg1LTM5LDExLTM5LDAuNTc2LDAsMjcuNywzLjUxLDMxLDQsNS41NzIsMC44MjgsMTEuOTI2LTEzLjg3Niw0LTIwLTEuOTMtMS40OTEtMjYuNjIxLTYuOTU5LTI5LTctMC42Mi0uMDExLDcuMzM5LTQxLjYxOCw3LTQzQzY5Ni40MjQsODk2LjE5NCw2ODguNTQ0LDg5Ny43NSw2ODMuOTIyLDg5Ny43NVpcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoLTU1My4yNSAtMjEzLjUpXCIvPlxyXG4gICAgICA8cGF0aCBjbGFzcz1cImFjb3JkLS1sb2dvLWNvbG9yXCIgZD1cIk03NDguNDIyLDYzMi43NWE1My44NzUsNTMuODc1LDAsMCwwLTUzLjg3NSw1My44NzVjMCwyNC45MzksMjAuMjQ1LDQ2Ljk4Nyw0My4yNSw1My4xMjUsNC40NDEsMS4xODUsMTAuMTg1LTM5LDExLTM5LDAuNTc2LDAsMjcuNywzLjUxLDMxLDQsNS41NzIsMC44MjgsMTEuOTI2LTEzLjg3Niw0LTIwLTEuOTMtMS40OTEtMjYuNjIxLTYuOTU5LTI5LTctMC42Mi0uMDExLDcuMzM5LTQxLjYxOCw3LTQzQzc2MC45MjQsNjMxLjE5NCw3NTMuMDQ0LDYzMi43NSw3NDguNDIyLDYzMi43NVpcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoLTU1My4yNSAtMjEzLjUpXCIvPlxyXG4gICAgICA8cGF0aCBjbGFzcz1cImFjb3JkLS1sb2dvLWNvbG9yXCIgZD1cIk04MDYuOTA2LDM3My4yNWE1My44NzUsNTMuODc1LDAsMCwwLTUzLjg3NSw1My44NzVjMCwyNC45MzksMjAuMjQ1LDQ2Ljk4Nyw0My4yNSw1My4xMjUsNC40NDIsMS4xODUsMTAuMTg1LTM5LDExLTM5LDAuNTc3LDAsMjcuNywzLjUxLDMxLDQsNS41NzIsMC44MjgsMTEuOTI2LTEzLjg3Niw0LTIwLTEuOTMtMS40OTEtMjYuNjIxLTYuOTU5LTI5LTctMC42Mi0uMDExLDcuMzM5LTQxLjYxOCw3LTQzQzgxOS40MDksMzcxLjY5NCw4MTEuNTI4LDM3My4yNSw4MDYuOTA2LDM3My4yNVpcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoLTU1My4yNSAtMjEzLjUpXCIvPlxyXG4gICAgPC9nPlxyXG4gIGA7XHJcbn1cclxuXHJcblxyXG4oYXN5bmMgKCkgPT4ge1xyXG4gIGF3YWl0IHVpLnZ1ZS5yZWFkeS53aGVuKCk7XHJcblxyXG4gIGNvbnN0IGJhc2VWdWVFbG0gPSBkb20ucGFyc2UoYFxyXG4gICAgPGRpdiBjbGFzcz1cImFjb3JkLS10YWJzLWNvbnRlbnQtY29udGFpbmVyXCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJ0YWJcIj5cclxuICAgICAgICA8a2VlcC1hbGl2ZT5cclxuICAgICAgICAgIDxjb21wb25lbnQgOmlzPVwiXFxgXFwke3NlbGVjdGVkVGFifS1wYWdlXFxgXCIgLz5cclxuICAgICAgICA8L2tlZXAtYWxpdmU+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgYCk7XHJcblxyXG4gIC8qKiBAdHlwZSB7aW1wb3J0KFwidnVlXCIpLkFwcH0gKi9cclxuICBjb25zdCB2dWVBcHAgPSBWdWUuY3JlYXRlQXBwKHtcclxuICAgIGRhdGEoKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgc2VsZWN0ZWRUYWI6IFwiaG9tZVwiXHJcbiAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgbW91bnRlZCgpIHtcclxuICAgICAgaW50ZXJuYWxWdWVBcHAgPSB0aGlzO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICB1aS52dWUuY29tcG9uZW50cy5sb2FkKHZ1ZUFwcCk7XHJcbiAgdnVlQ29tcG9uZW50cy5sb2FkKHZ1ZUFwcCk7XHJcbiAgdnVlQXBwLm1vdW50KGJhc2VWdWVFbG0pO1xyXG5cclxuICBkb20ucGF0Y2goJ1tjbGFzcyo9XCJhcHBsaWNhdGlvblN0b3JlLVwiXSBbY2xhc3MqPVwic2Nyb2xsZXJCYXNlLVwiXSBbY2xhc3MqPVwic3Vic2NyaXB0aW9uc1JlZGlyZWN0Q29udGFpbmVyLVwiXSwgW2NsYXNzKj1cImFwcGxpY2F0aW9uU3RvcmUtXCJdIFtjbGFzcyo9XCJzY3JvbGxlckJhc2UtXCJdIFtjbGFzcyo9XCJ0cmlhbE9mZmVyV3JhcHBlci1cIl0sIFtjbGFzcyo9XCJhcHBsaWNhdGlvblN0b3JlLVwiXSBbY2xhc3MqPVwic2Nyb2xsZXJCYXNlLVwiXSBbY2xhc3MqPVwicHJlbWl1bUNhcmRzLVwiXScsIChlbG0pID0+IHtcclxuICAgIC8qKiBAdHlwZSB7SFRNTERpdkVsZW1lbnR9ICovXHJcbiAgICBsZXQgY29udGFpbmVyRWxtID0gZG9tLnBhcmVudHMoZWxtLCA0KS5wb3AoKTtcclxuICAgIGNvbnRhaW5lckVsbS5yZXBsYWNlQ2hpbGRyZW4oYmFzZVZ1ZUVsbSk7XHJcbiAgfSk7XHJcbn0pKCk7XHJcblxyXG5cclxuXHJcblxyXG4iLCAiXHJcbihhc3luYyAoKSA9PiB7XHJcbiAgLyoqIEB0eXBlIHtTVkdFbGVtZW50fSAqL1xyXG4gIGxldCBzdmdFbG07XHJcbiAgd2hpbGUgKHRydWUpIHtcclxuICAgIHN2Z0VsbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tjbGFzcyo9XCJ3b3JkbWFyay1cIl0gc3ZnJyk7XHJcbiAgICBpZiAoc3ZnRWxtKSBicmVhaztcclxuICAgIGF3YWl0IG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCAxMDApKTtcclxuICB9XHJcblxyXG4gIHN2Z0VsbS5pbm5lckhUTUwgPSBgPHBhdGggZD1cIk02Ljg2NCAxMEw2LjQzMiA4Ljk1NkgzLjA0OEwyLjU0NCAxMEgwLjEwOEwzLjk0OCAxLjU2NEg2LjA0OEw5LjcyIDEwSDYuODY0Wk00Ljc0IDQuNzhMMy45MTIgNi43OTZINS41OEw0Ljc0IDQuNzhaTTE1LjUwNDUgNi4zMjhDMTUuMzQ0NSA2LjIyNCAxNS4xOTI1IDYuMTMyIDE1LjA0ODUgNi4wNTJDMTQuOTA0NSA1Ljk2NCAxNC43NTY1IDUuODkyIDE0LjYwNDUgNS44MzZDMTQuNDUyNSA1Ljc3MiAxNC4yOTI1IDUuNzI0IDE0LjEyNDUgNS42OTJDMTMuOTY0NSA1LjY2IDEzLjc4NDUgNS42NDQgMTMuNTg0NSA1LjY0NEMxMy4zMTI1IDUuNjQ0IDEzLjA4MDUgNS42OCAxMi44ODg1IDUuNzUyQzEyLjcwNDUgNS44MjQgMTIuNTU2NSA1LjkyIDEyLjQ0NDUgNi4wNEMxMi4zMzI1IDYuMTYgMTIuMjQ4NSA2LjI5NiAxMi4xOTI1IDYuNDQ4QzEyLjE0NDUgNi42IDEyLjEyMDUgNi43NTIgMTIuMTIwNSA2LjkwNEMxMi4xMjA1IDcuMDQ4IDEyLjE1MjUgNy4xOTIgMTIuMjE2NSA3LjMzNkMxMi4yODA1IDcuNDcyIDEyLjM3MjUgNy41OTIgMTIuNDkyNSA3LjY5NkMxMi42MjA1IDcuOCAxMi43NzI1IDcuODg0IDEyLjk0ODUgNy45NDhDMTMuMTI0NSA4LjAxMiAxMy4zMjg1IDguMDQ0IDEzLjU2MDUgOC4wNDRDMTMuNzI4NSA4LjA0NCAxMy44ODQ1IDguMDI4IDE0LjAyODUgNy45OTZDMTQuMTgwNSA3Ljk2NCAxNC4zMjg1IDcuOTE2IDE0LjQ3MjUgNy44NTJDMTQuNjI0NSA3Ljc4OCAxNC43ODA1IDcuNzEyIDE0Ljk0MDUgNy42MjRDMTUuMTA4NSA3LjUyOCAxNS4yOTY1IDcuNDIgMTUuNTA0NSA3LjNMMTYuMTI4NSA5LjA1MkMxNS43Njg1IDkuMzU2IDE1LjM0NDUgOS42MTYgMTQuODU2NSA5LjgzMkMxNC4zNjg1IDEwLjA0IDEzLjg0MDUgMTAuMTQ0IDEzLjI3MjUgMTAuMTQ0QzEyLjczNjUgMTAuMTQ0IDEyLjI0ODUgMTAuMDggMTEuODA4NSA5Ljk1MkMxMS4zNzY1IDkuODE2IDExLjAwNDUgOS42MTYgMTAuNjkyNSA5LjM1MkMxMC4zODg1IDkuMDggMTAuMTUyNSA4Ljc0NCA5Ljk4NDQ3IDguMzQ0QzkuODE2NDcgNy45MzYgOS43MzI0NyA3LjQ2IDkuNzMyNDcgNi45MTZDOS43MzI0NyA2LjM1NiA5LjgyNDQ3IDUuODcyIDEwLjAwODUgNS40NjRDMTAuMjAwNSA1LjA1NiAxMC40NTY1IDQuNzIgMTAuNzc2NSA0LjQ1NkMxMS4xMDQ1IDQuMTg0IDExLjQ4ODUgMy45ODQgMTEuOTI4NSAzLjg1NkMxMi4zNjg1IDMuNzIgMTIuODQwNSAzLjY1MiAxMy4zNDQ1IDMuNjUyQzE0LjMyMDUgMy42NTIgMTUuMTg0NSAzLjk0NCAxNS45MzY1IDQuNTI4TDE1LjUwNDUgNi4zMjhaTTIzLjM5MTkgNi44NTZDMjMuMzkxOSA3LjQzMiAyMy4zMTE5IDcuOTI4IDIzLjE1MTkgOC4zNDRDMjIuOTkxOSA4Ljc2IDIyLjc1OTkgOS4xMDQgMjIuNDU1OSA5LjM3NkMyMi4xNTk5IDkuNjQgMjEuNzk5OSA5LjgzNiAyMS4zNzU5IDkuOTY0QzIwLjk1OTkgMTAuMDg0IDIwLjQ5NTkgMTAuMTQ0IDE5Ljk4MzkgMTAuMTQ0QzE5LjQ4NzkgMTAuMTQ0IDE5LjAzMTkgMTAuMDggMTguNjE1OSA5Ljk1MkMxOC4xOTk5IDkuODE2IDE3LjgzOTkgOS42MTIgMTcuNTM1OSA5LjM0QzE3LjIzMTkgOS4wNjggMTYuOTkxOSA4LjcyOCAxNi44MTU5IDguMzJDMTYuNjQ3OSA3LjkwNCAxNi41NjM5IDcuNDE2IDE2LjU2MzkgNi44NTZDMTYuNTYzOSA2LjI3MiAxNi42NDc5IDUuNzcyIDE2LjgxNTkgNS4zNTZDMTYuOTkxOSA0Ljk0IDE3LjIzMTkgNC42IDE3LjUzNTkgNC4zMzZDMTcuODM5OSA0LjA3MiAxOC4xOTk5IDMuODggMTguNjE1OSAzLjc2QzE5LjAzMTkgMy42NCAxOS40ODc5IDMuNTggMTkuOTgzOSAzLjU4QzIwLjQ5NTkgMy41OCAyMC45NTk5IDMuNjQ4IDIxLjM3NTkgMy43ODRDMjEuNzk5OSAzLjkxMiAyMi4xNTk5IDQuMTEyIDIyLjQ1NTkgNC4zODRDMjIuNzU5OSA0LjY0OCAyMi45OTE5IDQuOTg4IDIzLjE1MTkgNS40MDRDMjMuMzExOSA1LjgxMiAyMy4zOTE5IDYuMjk2IDIzLjM5MTkgNi44NTZaTTIxLjEzNTkgNi44NDRDMjEuMTM1OSA2LjUyNCAyMS4wMzE5IDYuMjU2IDIwLjgyMzkgNi4wNEMyMC42MjM5IDUuODI0IDIwLjM0MzkgNS43MTYgMTkuOTgzOSA1LjcxNkMxOS42MjM5IDUuNzE2IDE5LjM0MzkgNS44MjQgMTkuMTQzOSA2LjA0QzE4Ljk1MTkgNi4yNDggMTguODU1OSA2LjUxNiAxOC44NTU5IDYuODQ0QzE4Ljg1NTkgNy4xNDggMTguOTUxOSA3LjQxNiAxOS4xNDM5IDcuNjQ4QzE5LjM0MzkgNy44NzIgMTkuNjIzOSA3Ljk4NCAxOS45ODM5IDcuOTg0QzIwLjM0MzkgNy45ODQgMjAuNjIzOSA3Ljg3MiAyMC44MjM5IDcuNjQ4QzIxLjAzMTkgNy40MjQgMjEuMTM1OSA3LjE1NiAyMS4xMzU5IDYuODQ0Wk0yOC42OTQ4IDYuNThMMjguNDc4OCA2LjU5MkMyOC40NzA4IDYuNDA4IDI4LjM5MDggNi4yNiAyOC4yMzg4IDYuMTQ4QzI4LjA4NjggNi4wMzYgMjcuOTIyOCA1Ljk4IDI3Ljc0NjggNS45OEMyNy41ODY4IDUuOTggMjcuNDA2OCA2LjAyOCAyNy4yMDY4IDYuMTI0QzI3LjAxNDggNi4yMTIgMjYuODQyOCA2LjM0OCAyNi42OTA4IDYuNTMyVjEwSDI0LjMxNDhWMy43ODRIMjYuNjkwOFY0LjM5NkMyNi44ODI4IDQuMjEyIDI3LjEwMjggNC4wNCAyNy4zNTA4IDMuODhDMjcuNjA2OCAzLjcyIDI3LjkxMDggMy42NCAyOC4yNjI4IDMuNjRDMjguMzE4OCAzLjY0IDI4LjM4NjggMy42NDQgMjguNDY2OCAzLjY1MkMyOC41NDY4IDMuNjYgMjguNjI2OCAzLjY3MiAyOC43MDY4IDMuNjg4QzI4Ljc4NjggMy43MDQgMjguODYyOCAzLjcyOCAyOC45MzQ4IDMuNzZDMjkuMDA2OCAzLjc4NCAyOS4wNjI4IDMuODE2IDI5LjEwMjggMy44NTZMMjguNjk0OCA2LjU4Wk0zNC4zOTI5IDEwVjkuNTU2QzM0LjMyMDkgOS42MjggMzQuMjIwOSA5LjY5NiAzNC4wOTI5IDkuNzZDMzMuOTY0OSA5LjgyNCAzMy44MjQ5IDkuODg0IDMzLjY3MjkgOS45NEMzMy41MjA5IDkuOTk2IDMzLjM2ODkgMTAuMDQgMzMuMjE2OSAxMC4wNzJDMzMuMDcyOSAxMC4xMDQgMzIuOTQ0OSAxMC4xMiAzMi44MzI5IDEwLjEyQzMyLjQyNDkgMTAuMTIgMzIuMDMyOSAxMC4wNTYgMzEuNjU2OSA5LjkyOEMzMS4yODA5IDkuNzkyIDMwLjk0ODkgOS41OTIgMzAuNjYwOSA5LjMyOEMzMC4zODA5IDkuMDU2IDMwLjE1NjkgOC43MjQgMjkuOTg4OSA4LjMzMkMyOS44MjA5IDcuOTMyIDI5LjczNjkgNy40NjggMjkuNzM2OSA2Ljk0QzI5LjczNjkgNi4zOCAyOS44MTY5IDUuODk2IDI5Ljk3NjkgNS40ODhDMzAuMTQ0OSA1LjA4IDMwLjM2ODkgNC43NCAzMC42NDg5IDQuNDY4QzMwLjkzNjkgNC4xOTYgMzEuMjcyOSAzLjk5NiAzMS42NTY5IDMuODY4QzMyLjA0MDkgMy43MzIgMzIuNDQ4OSAzLjY2NCAzMi44ODA5IDMuNjY0QzMyLjk2ODkgMy42NjQgMzMuMDgwOSAzLjY3NiAzMy4yMTY5IDMuN0MzMy4zNjA5IDMuNzE2IDMzLjUwNDkgMy43NDQgMzMuNjQ4OSAzLjc4NEMzMy43OTI5IDMuODE2IDMzLjkyODkgMy44NiAzNC4wNTY5IDMuOTE2QzM0LjE5MjkgMy45NzIgMzQuMjk2OSA0LjAzMiAzNC4zNjg5IDQuMDk2VjAuODU2SDM2LjcwODlWMTBIMzQuMzkyOVpNMzQuMzY4OSA2LjA2NEMzNC4zMDQ5IDYuMDE2IDM0LjIyNDkgNS45NzIgMzQuMTI4OSA1LjkzMkMzNC4wMzI5IDUuODkyIDMzLjkzMjkgNS44NiAzMy44Mjg5IDUuODM2QzMzLjcyNDkgNS44MDQgMzMuNjIwOSA1Ljc4IDMzLjUxNjkgNS43NjRDMzMuNDEyOSA1Ljc0OCAzMy4zMjA5IDUuNzQgMzMuMjQwOSA1Ljc0QzMzLjA4MDkgNS43NCAzMi45MjQ5IDUuNzY4IDMyLjc3MjkgNS44MjRDMzIuNjI4OSA1Ljg4IDMyLjUwMDkgNS45NiAzMi4zODg5IDYuMDY0QzMyLjI3NjkgNi4xNiAzMi4xODg5IDYuMjc2IDMyLjEyNDkgNi40MTJDMzIuMDYwOSA2LjU0OCAzMi4wMjg5IDYuNjkyIDMyLjAyODkgNi44NDRDMzIuMDI4OSA3LjAwNCAzMi4wNjA5IDcuMTUyIDMyLjEyNDkgNy4yODhDMzIuMTg4OSA3LjQyNCAzMi4yNzY5IDcuNTQ0IDMyLjM4ODkgNy42NDhDMzIuNTAwOSA3Ljc0NCAzMi42Mjg5IDcuODI0IDMyLjc3MjkgNy44ODhDMzIuOTI0OSA3Ljk0NCAzMy4wODA5IDcuOTcyIDMzLjI0MDkgNy45NzJDMzMuMzIwOSA3Ljk3MiAzMy40MTI5IDcuOTYgMzMuNTE2OSA3LjkzNkMzMy42MjA5IDcuOTEyIDMzLjcyNDkgNy44ODQgMzMuODI4OSA3Ljg1MkMzMy45MzI5IDcuODEyIDM0LjAzMjkgNy43NjggMzQuMTI4OSA3LjcyQzM0LjIyNDkgNy42NjQgMzQuMzA0OSA3LjYwOCAzNC4zNjg5IDcuNTUyVjYuMDY0WlwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIiAvPmA7XHJcbiAgc3ZnRWxtLnNldEF0dHJpYnV0ZShcInZpZXdCb3hcIiwgXCIwIDAgNTUgMTFcIik7XHJcbn0pKCk7IiwgImltcG9ydCB7IHdhaXRVbnRpbENvbm5lY3Rpb25PcGVuIH0gZnJvbSBcIi4vb3RoZXIvdXRpbHMuanNcIjtcclxuaW1wb3J0IGxvYWRpbmdBbmltYXRpb24gZnJvbSBcIi4vb3RoZXIvbG9hZGluZy1hbmltYXRpb25cIjtcclxuaW1wb3J0IGFwaSBmcm9tIFwiLi9hcGlcIjtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3csIFwiYWNvcmRcIiwge1xyXG4gIGdldCgpIHtcclxuICAgIHJldHVybiBhcGkuZXhwb3NlZEFQSTtcclxuICB9XHJcbn0pO1xyXG53aW5kb3cuZ2xvYmFsID0gd2luZG93O1xyXG5cclxuKGFzeW5jICgpID0+IHtcclxuICBsb2FkaW5nQW5pbWF0aW9uLnNob3coKTtcclxuICBhd2FpdCB3YWl0VW50aWxDb25uZWN0aW9uT3BlbigpO1xyXG4gIGxvYWRpbmdBbmltYXRpb24uaGlkZSgpO1xyXG59KSgpO1xyXG5cclxuLy8gZXh0cmFzXHJcbmltcG9ydCBcIi4vb3RoZXIvd2Vic29ja2V0LXRyaWdnZXJzLmpzXCI7XHJcbmltcG9ydCBcIi4vdWkvaW5kZXguanNcIjsiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFDQSxhQUFPLGVBQWUsU0FBUyxjQUFjLEVBQUUsT0FBTyxLQUFLLENBQUM7QUFDNUQsY0FBUSxVQUFVLE9BQU8sT0FBTztBQUFBLFFBQzVCLEtBQUs7QUFBQSxRQUNMLEtBQUs7QUFBQSxRQUNMLFFBQVE7QUFBQSxRQUNSLFFBQVE7QUFBQSxNQUNaLENBQUM7QUFBQTtBQUFBOzs7QUNQRDtBQUFBO0FBQUE7QUFDQSxVQUFJLGtCQUFtQixXQUFRLFFBQUssbUJBQW9CLFNBQVUsS0FBSztBQUNuRSxlQUFRLE9BQU8sSUFBSSxhQUFjLE1BQU0sRUFBRSxXQUFXLElBQUk7QUFBQSxNQUM1RDtBQUNBLGFB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QSxRQUNGO0FBQUEsUUFDQSxRQUFVO0FBQUEsVUFDUixRQUFVO0FBQUEsVUFDVixJQUFNO0FBQUEsVUFDTixJQUFNO0FBQUEsWUFDSjtBQUFBLGNBQ0U7QUFBQSxjQUNBO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLE1BQ0EsT0FBUztBQUFBLFFBQ1AsSUFBTTtBQUFBLFFBQ04sTUFBUTtBQUFBLFVBQ04sT0FBUztBQUFBLFlBQ1A7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLFFBQ0EsUUFBVTtBQUFBLFVBQ1IsUUFBVTtBQUFBLFVBQ1YsSUFBTTtBQUFBLFVBQ04sSUFBTTtBQUFBLFlBQ0o7QUFBQSxjQUNFO0FBQUEsY0FDQTtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLE1BQVE7QUFBQSxRQUNOLElBQU07QUFBQSxRQUNOLE1BQVE7QUFBQSxVQUNOLE9BQVM7QUFBQSxZQUNQO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxRQUNBLFFBQVU7QUFBQSxVQUNSLFFBQVU7QUFBQSxVQUNWLElBQU07QUFBQSxVQUNOLElBQU07QUFBQSxZQUNKO0FBQUEsY0FDRTtBQUFBLGNBQ0E7QUFBQSxjQUNBO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLE1BQ0EsUUFBVTtBQUFBLFFBQ1IsY0FBZ0I7QUFBQSxVQUNkLElBQU07QUFBQSxVQUNOLFFBQVU7QUFBQSxZQUNSLFFBQVU7QUFBQSxZQUNWLElBQU07QUFBQSxZQUNOLElBQU07QUFBQSxjQUNKO0FBQUEsZ0JBQ0U7QUFBQSxjQUNGO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxVQUNBLE1BQVE7QUFBQSxZQUNOLFFBQVU7QUFBQSxjQUNSO0FBQUEsY0FDQTtBQUFBLGNBQ0E7QUFBQSxjQUNBO0FBQUEsWUFDRjtBQUFBLFlBQ0EsT0FBUztB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TUFDRjtBQUFBLE1BQ0EsVUFBVTtBQUNSLHlCQUFpQjtBQUFBLE1BQ25CO0FBQUEsSUFDRixDQUFDO0FBRUQsZUFBRyxJQUFJLFdBQVcsS0FBSyxNQUFNO0FBQzdCLElBQUFDLG9CQUFjLEtBQUssTUFBTTtBQUN6QixXQUFPLE1BQU0sVUFBVTtBQUV2QixnQkFBSSxNQUFNLHlRQUF5USxDQUFDLFFBQVE7QUFFMVIsVUFBSSxlQUFlLFlBQUksUUFBUSxLQUFLLENBQUMsRUFBRSxJQUFJO0FBQzNDLG1CQUFhLGdCQUFnQixVQUFVO0FBQUEsSUFDekMsQ0FBQztBQUFBLEVBQ0gsR0FBRzs7O0FDcEtILEdBQUMsWUFBWTtBQUVYLFFBQUk7QUFDSixXQUFPLE1BQU07QUFDWCxlQUFTLFNBQVMsY0FBYywwQkFBMEI7QUFDMUQsVUFBSTtBQUFRO0FBQ1osWUFBTSxJQUFJLFFBQVEsYUFBVyxXQUFXLFNBQVMsR0FBRyxDQUFDO0FBQUEsSUFDdkQ7QUFFQSxXQUFPLFlBQVk7QUFDbkIsV0FBTyxhQUFhLFdBQVcsV0FBVztBQUFBLEVBQzVDLEdBQUc7OztBQ1JILFNBQU8sZUFBZSxRQUFRLFNBQVM7QUFBQSxJQUNyQyxNQUFNO0FBQ0osYUFBTyxZQUFJO0FBQUEsSUFDYjtBQUFBLEVBQ0YsQ0FBQztBQUNELFNBQU8sU0FBUztBQUVoQixHQUFDLFlBQVk7QUFDWCw4QkFBaUIsS0FBSztBQUN0QixVQUFNLHdCQUF3QjtBQUM5Qiw4QkFBaUIsS0FBSztBQUFBLEVBQ3hCLEdBQUc7IiwKICAibmFtZXMiOiBbImV2ZW50IiwgIm1ha2UiLCAidGFyZ2V0IiwgInRyZWUiLCAic2VhcmNoRmlsdGVyIiwgIndhbGthYmxlIiwgImlnbm9yZSIsICJmb3VuZCIsICJjb21wb25lbnRzIiwgIl8iLCAiY2hlY2siLCAibW9kdWxlcyIsICJyZXF1aXJlIiwgImZvdW5kIiwgImZpbmRlciIsICJmb3VuZCIsICJyZXEiLCAiZmluZGVyIiwgIm5hbWUiLCAiY29tbW9uX2RlZmF1bHQiLCAiY29tbW9uX2RlZmF1bHQiLCAibm9TdG9yZSIsICJfIiwgIl8iLCAiXyIsICJ2YWwiLCAiZXJyb3IiLCAib3V0IiwgImNoZWNrIiwgIl8iLCAiQkFTRV9VUkwiLCAibmVzdHMiLCAiY29tbW9uX2RlZmF1bHQiLCAic2V0IiwgInNob3ciLCAiY29tbW9uX2RlZmF1bHQiLCAib3V0IiwgIl8iLCAiUmVhY3QiLCAiY29tbW9uX2RlZmF1bHQiLCAiY29tbW9uX2RlZmF1bHQiLCAiUmVhY3QiLCAiY29tbW9uX2RlZmF1bHQiLCAiaW50ZXJhY3RlZCIsICJnZXRDb250YWluZXIiLCAic2hvdyIsICJzdHlsZV9kZWZhdWx0IiwgInN0eWxlX2RlZmF1bHQiLCAic3R5bGVfZGVmYXVsdCIsICJzdHlsZV9kZWZhdWx0IiwgInN0eWxlX2RlZmF1bHQiLCAic3R5bGVfZGVmYXVsdCIsICJpbnB1dENsYXNzZXMiLCAiaW5wdXRDbGFzc2VzMiIsICJzY3JvbGxDbGFzc2VzIiwgImNvbXBvbmVudHNfZGVmYXVsdCIsICJuYW1lIiwgImNvbXBvbmVudHNfZGVmYXVsdCIsICJvdXQiLCAibmFtZSIsICJfIiwgInNvdXJjZSIsICJhcGkiLCAiZGF0YSIsICJzb3VyY2UiLCAib3V0IiwgImFwaSIsICJzdHlsZV9kZWZhdWx0IiwgInN0eWxlX2RlZmF1bHQiLCAic3R5bGVfZGVmYXVsdCIsICJzdHlsZV9kZWZhdWx0IiwgInN0eWxlX2RlZmF1bHQiLCAic3R5bGVfZGVmYXVsdCIsICJzdHlsZV9kZWZhdWx0IiwgInN0eWxlX2RlZmF1bHQiLCAic3R5bGVfZGVmYXVsdCIsICJjb21wb25lbnRzX2RlZmF1bHQiLCAiY29tcG9uZW50c19kZWZhdWx0IiwgInN0eWxlX2RlZmF1bHQiLCAiZWxtIiwgImNvbXBvbmVudHNfZGVmYXVsdCJdCn0K
