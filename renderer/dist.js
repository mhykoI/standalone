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
            utils_default.logger.error("Unable to patch pushed module.", error, ogModule, moduleId, chunk);
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
        try {
          listener(...args);
        } catch (e) {
          logger_default.error(`Error while emitting ${eventName} event.`, e);
        }
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
        "DomMutation",
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
        events_default.emit("DomMutation", mutation);
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
        return out4.__cache__.localizations[i18n_default.locale]?.[key] || out4.__cache__.localizations.default?.[key] || out4.get(key);
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
        "DomMutation",
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
        return buildMenuChildren([setup]);
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
          :class="{'${checkClasses.checked}': modelValue, 'checked': modelValue}" 
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
      if (url.endsWith("/"))
        url = url.slice(0, -1);
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
      out2.storage.installed.store[url] = {
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
      if (url.endsWith("/"))
        url = url.slice(0, -1);
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
      if (url.endsWith("/"))
        url = url.slice(0, -1);
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
      if (url.endsWith("/"))
        url = url.slice(0, -1);
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
      return Promise.all(Object.entries(out2.storage.installed.ghost).sort(([, a], [, b]) => b.config.order - a.config.order).map(async ([url, d]) => {
        if (d.config.autoUpdate)
          await out2.update(url);
        if (d.config.enabled)
          await out2.load(url);
      }));
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
  waitUntilConnectionOpen().then(async () => {
    await utils_default.sleep(100);
    out2.loadAll();
  });
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

  // src/other/document-title-change.js
  var ogTitleSetter = document.__lookupSetter__("title");
  var ogTitleGetter = document.__lookupGetter__("title");
  Object.defineProperty(
    document,
    "title",
    {
      get() {
        return ogTitleGetter.call(this);
      },
      set(v) {
        events_default.emit("DocumentTitleChange", v);
        return ogTitleSetter.call(this, v);
      }
    }
  );

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
.acord--config-item{width:100%;display:flex}.acord--config-row{width:100%;display:flex;flex-direction:row;justify-content:space-between;align-items:center}.acord--config-row.horizontal-align-left{justify-content:flex-start}.acord--config-row.horizontal-align-right{justify-content:flex-end}.acord--config-row.horizontal-align-center{justify-content:center}.acord--config-row.justify-space-between{justify-content:space-between}.acord--config-row.justify-space-around{justify-content:space-around}.acord--config-row.vertical-align-top{align-items:flex-start}.acord--config-row.vertical-align-bottom{align-items:flex-end}.acord--config-column{width:100%;display:flex;flex-direction:column;justify-content:flex-start;align-items:center}.acord--config-column.horizontal-align-left{justify-content:flex-start}.acord--config-column.horizontal-align-right{justify-content:flex-end}.acord--config-column.horizontal-align-center{justify-content:center}.acord--config-column.justify-space-between{justify-content:space-between}.acord--config-column.justify-space-around{justify-content:space-around}.acord--config-column.vertical-align-top{align-items:flex-start}.acord--config-column.vertical-align-bottom{align-items:flex-end}.acord--config-column.vertical-align-center{align-items:center}.acord--config-heading{font-size:1.2rem;font-weight:500;margin-bottom:.5rem;color:#f5f5f5}.acord--config-paragraph{font-size:1rem;font-weight:400;margin-bottom:.5rem;color:rgba(245,245,245,.85)}`;

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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibm9kZV9tb2R1bGVzL25lc3RzL2Nqcy9FdmVudHMuanMiLCAibm9kZV9tb2R1bGVzL25lc3RzL2Nqcy9FdmVudEVtaXR0ZXIuanMiLCAibm9kZV9tb2R1bGVzL25lc3RzL2Nqcy9tYWtlLmpzIiwgIm5vZGVfbW9kdWxlcy9uZXN0cy9janMvaW5kZXguanMiLCAic3JjL2RhdGEvY29tbW9uLmpzb24iLCAic3JjL2FwaS91dGlscy9yYXcvZmluZC1pbi10cmVlLmpzIiwgInNyYy9hcGkvdXRpbHMvbG9nZ2VyLmpzIiwgInNyYy9hcGkvdXRpbHMvcmVhY3QuanMiLCAic3JjL2FwaS91dGlscy9pbmRleC5qcyIsICJzcmMvYXBpL21vZHVsZXMvcmF3L2NvbXBsZXgtZmluZGVyLmpzIiwgInNyYy9hcGkvbW9kdWxlcy93ZWJwYWNrLmpzIiwgInNyYy9hcGkvbW9kdWxlcy9jb21tb24uanMiLCAic3JjL2FwaS9tb2R1bGVzL2luZGV4LmpzIiwgInNyYy9hcGkvaTE4bi9pbmRleC5qcyIsICJzcmMvb3RoZXIvdXRpbHMuanMiLCAic3JjL2xpYi9CYXNpY0V2ZW50RW1pdHRlci5qcyIsICJzcmMvYXBpL2V2ZW50cy9pbmRleC5qcyIsICJzcmMvYXBpL2RvbS9pbmRleC5qcyIsICJzcmMvbGliL3NwaXRyb2FzdC9kaXN0L2VzbS9zaGFyZWQuanMiLCAic3JjL2xpYi9zcGl0cm9hc3QvZGlzdC9lc20vaG9vay5qcyIsICJzcmMvbGliL3NwaXRyb2FzdC9kaXN0L2VzbS91bi1wYXRjaC5qcyIsICJzcmMvbGliL3NwaXRyb2FzdC9kaXN0L2VzbS9nZXQtcGF0Y2gtZnVuYy5qcyIsICJzcmMvbGliL3NwaXRyb2FzdC9kaXN0L2VzbS9pbmRleC5qcyIsICJzcmMvYXBpL3BhdGNoZXIvaW5kZXguanMiLCAic3JjL290aGVyL2xvYWRpbmctYW5pbWF0aW9uL3N0eWxlLnNjc3MiLCAic3JjL290aGVyL2xvYWRpbmctYW5pbWF0aW9uL2luZGV4LmpzIiwgInNyYy9hcGkvc3RvcmFnZS9pbmRleC5qcyIsICJub2RlX21vZHVsZXMvaWRiLWtleXZhbC9kaXN0L2luZGV4LmpzIiwgInNyYy9saWIvanNvbi1kZWN5Y2xlZC9pbmRleC5qcyIsICJzcmMvYXBpL2V4dGVuc2lvbnMvaTE4bi5qcyIsICJzcmMvYXBpL2V4dGVuc2lvbnMvaW5kZXguanMiLCAic3JjL2FwaS93ZWJzb2NrZXQvaW5kZXguanMiLCAic3JjL2FwaS91aS9zdHlsZXMuc2NzcyIsICJzcmMvYXBpL3VpL3Rvb2x0aXBzLmpzIiwgInNyYy9hcGkvdWkvbm90aWZpY2F0aW9ucy5qcyIsICJzcmMvYXBpL3VpL2NvbnRleHRNZW51cy5qcyIsICJzcmMvbGliL2NvbXBvbmVudHMvRXJyb3JCb3VuZGFyeS5qc3giLCAic3JjL2FwaS91aS9jb21wb25lbnRzLmpzIiwgInNyYy9hcGkvdWkvbW9kYWxzLmpzeCIsICJzcmMvYXBpL3VpL3RvYXN0cy5qcyIsICJzcmMvYXBpL3VpL3Z1ZS9jb21wb25lbnRzL2Rpc2NvcmQtYnV0dG9uL2luZGV4LmpzIiwgInNyYy9hcGkvdWkvdnVlL2NvbXBvbmVudHMvZGlzY29yZC1jaGVjay9zdHlsZS5zY3NzIiwgInNyYy9hcGkvdWkvdnVlL2NvbXBvbmVudHMvZGlzY29yZC1jaGVjay9pbmRleC5qcyIsICJzcmMvYXBpL3VpL3Z1ZS9jb21wb25lbnRzL2Rpc2NvcmQtaW5wdXQvaW5kZXguanMiLCAic3JjL2FwaS91aS92dWUvY29tcG9uZW50cy9kaXNjb3JkLXNlbGVjdC9zdHlsZS5zY3NzIiwgInNyYy9hcGkvdWkvdnVlL2NvbXBvbmVudHMvZGlzY29yZC1zZWxlY3QvaW5kZXguanMiLCAic3JjL2FwaS91aS92dWUvY29tcG9uZW50cy9kaXNjb3JkLXRleHRhcmVhL3N0eWxlLnNjc3MiLCAic3JjL2FwaS91aS92dWUvY29tcG9uZW50cy9kaXNjb3JkLXRleHRhcmVhL2luZGV4LmpzIiwgInNyYy9hcGkvdWkvdnVlL2NvbXBvbmVudHMvaW5kZXguanMiLCAic3JjL2FwaS91aS92dWUvdXRpbHMvcmVjb21wdXRlLmpzIiwgInNyYy9hcGkvdWkvdnVlL2luZGV4LmpzIiwgInNyYy9hcGkvdWkvaW5kZXguanMiLCAic3JjL2FwaS9kZXYvaW5kZXguanMiLCAic3JjL2FwaS9pbnRlcm5hbC9pbmRleC5qcyIsICJzcmMvYXBpL2luZGV4LmpzIiwgInNyYy9vdGhlci9kb2N1bWVudC10aXRsZS1jaGFuZ2UuanMiLCAic3JjL290aGVyL3dlYnNvY2tldC10cmlnZ2Vycy5qcyIsICJzcmMvdWkvaG9tZS9zdHlsZS5zY3NzIiwgInNyYy91aS9ob21lL3Z1ZS9jb21wb25lbnRzL3BhZ2VzL2hvbWUtcGFnZS9pbmRleC5qcyIsICJzcmMvdWkvaG9tZS92dWUvY29tcG9uZW50cy9wYWdlcy9pbnN0YWxsZWQtZXh0ZW5zaW9ucy1wYWdlL3N0eWxlLnNjc3MiLCAic3JjL3VpL2hvbWUvdnVlL2NvbXBvbmVudHMvcGFnZXMvaW5zdGFsbGVkLWV4dGVuc2lvbnMtcGFnZS9pbmRleC5qcyIsICJzcmMvdWkvaG9tZS92dWUvY29tcG9uZW50cy9wYWdlcy9zZXR0aW5ncy1wYWdlL2luZGV4LmpzIiwgInNyYy91aS9ob21lL3Z1ZS9jb21wb25lbnRzL3BhZ2VzL3N0b3JlLXBhZ2UvaW5kZXguanMiLCAic3JjL3VpL2hvbWUvdnVlL2NvbXBvbmVudHMvcGFnZXMvaW5kZXguanMiLCAic3JjL3VpL2hvbWUvdnVlL2NvbXBvbmVudHMvY29tcG9uZW50cy9jb25maWcvY29uZmlnLWJ1dHRvbi9pbmRleC5qcyIsICJzcmMvdWkvaG9tZS92dWUvY29tcG9uZW50cy9jb21wb25lbnRzL2NvbmZpZy9jb25maWctY2hlY2svaW5kZXguanMiLCAic3JjL3VpL2hvbWUvdnVlL2NvbXBvbmVudHMvY29tcG9uZW50cy9jb25maWcvbWFwcy5qc29uIiwgInNyYy91aS9ob21lL3Z1ZS9jb21wb25lbnRzL2NvbXBvbmVudHMvY29uZmlnL2NvbmZpZy1jb2x1bW4vaW5kZXguanMiLCAic3JjL3VpL2hvbWUvdnVlL2NvbXBvbmVudHMvY29tcG9uZW50cy9jb25maWcvY29uZmlnLWhlYWRpbmcvaW5kZXguanMiLCAic3JjL3VpL2hvbWUvdnVlL2NvbXBvbmVudHMvY29tcG9uZW50cy9jb25maWcvY29uZmlnLWlucHV0L2luZGV4LmpzIiwgInNyYy91aS9ob21lL3Z1ZS9jb21wb25lbnRzL2NvbXBvbmVudHMvY29uZmlnL2NvbmZpZy1wYXJhZ3JhcGgvaW5kZXguanMiLCAic3JjL3VpL2hvbWUvdnVlL2NvbXBvbmVudHMvY29tcG9uZW50cy9jb25maWcvY29uZmlnLXJvdy9pbmRleC5qcyIsICJzcmMvdWkvaG9tZS92dWUvY29tcG9uZW50cy9jb21wb25lbnRzL2NvbmZpZy9jb25maWctc2VsZWN0L2luZGV4LmpzIiwgInNyYy91aS9ob21lL3Z1ZS9jb21wb25lbnRzL2NvbXBvbmVudHMvY29uZmlnL2NvbmZpZy1zcGFjZXIvaW5kZXguanMiLCAic3JjL3VpL2hvbWUvdnVlL2NvbXBvbmVudHMvY29tcG9uZW50cy9jb25maWcvY29uZmlnLXRleHRhcmVhL2luZGV4LmpzIiwgInNyYy91aS9ob21lL3Z1ZS9jb21wb25lbnRzL2NvbXBvbmVudHMvY29uZmlnL3N0eWxlLnNjc3MiLCAic3JjL3VpL2hvbWUvdnVlL2NvbXBvbmVudHMvY29tcG9uZW50cy9jb25maWcvaW5kZXguanMiLCAic3JjL3VpL2hvbWUvdnVlL2NvbXBvbmVudHMvY29tcG9uZW50cy9jYXJkcy9pbnN0YWxsZWQtZXh0ZW5zaW9uLWNhcmQvc3R5bGUuc2NzcyIsICJzcmMvdWkvaG9tZS92dWUvY29tcG9uZW50cy9jb21wb25lbnRzL2NhcmRzL2luc3RhbGxlZC1leHRlbnNpb24tY2FyZC9pbmRleC5qcyIsICJzcmMvdWkvaG9tZS92dWUvY29tcG9uZW50cy9jb21wb25lbnRzL2NhcmRzL3N0b3JlLWV4dGVuc2lvbi1jYXJkL3N0eWxlLnNjc3MiLCAic3JjL3VpL2hvbWUvdnVlL2NvbXBvbmVudHMvY29tcG9uZW50cy9jYXJkcy9zdG9yZS1leHRlbnNpb24tY2FyZC9pbmRleC5qcyIsICJzcmMvdWkvaG9tZS92dWUvY29tcG9uZW50cy9jb21wb25lbnRzL2NhcmRzL2luZGV4LmpzIiwgInNyYy91aS9ob21lL3Z1ZS9jb21wb25lbnRzL2NvbXBvbmVudHMvaW5kZXguanMiLCAic3JjL3VpL2hvbWUvdnVlL2NvbXBvbmVudHMvaW5kZXguanMiLCAic3JjL3VpL2hvbWUvaW5kZXguanMiLCAic3JjL3VpL290aGVyL2luZGV4LmpzIiwgInNyYy9pbmRleC5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5kZWZhdWx0ID0gT2JqZWN0LmZyZWV6ZSh7XHJcbiAgICBHRVQ6IFwiR0VUXCIsXHJcbiAgICBTRVQ6IFwiU0VUXCIsXHJcbiAgICBERUxFVEU6IFwiREVMRVRFXCIsXHJcbiAgICBVUERBVEU6IFwiVVBEQVRFXCIsXHJcbn0pO1xyXG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgRXZlbnRzXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vRXZlbnRzXCIpKTtcclxuY2xhc3MgRXZlbnRFbWl0dGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMubGlzdGVuZXJzID0gT2JqZWN0LnZhbHVlcyhFdmVudHNfMS5kZWZhdWx0KS5yZWR1Y2UoKGFjYywgdmFsKSA9PiAoKGFjY1t2YWxdID0gbmV3IFNldCgpKSwgYWNjKSwge30pO1xyXG4gICAgICAgIHRoaXMub24gPSBmdW5jdGlvbiAoZXZlbnQsIGxpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxpc3RlbmVyc1tldmVudF0uaGFzKGxpc3RlbmVyKSkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoYFRoaXMgbGlzdGVuZXIgb24gJHtldmVudH0gYWxyZWFkeSBleGlzdHMuYCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5saXN0ZW5lcnNbZXZlbnRdLmFkZChsaXN0ZW5lcik7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLm9uY2UgPSBmdW5jdGlvbiAoZXZlbnQsIGxpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG9uY2VMaXN0ZW5lciA9IChldmVudCwgZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vZmYoZXZlbnQsIG9uY2VMaXN0ZW5lcik7XHJcbiAgICAgICAgICAgICAgICBsaXN0ZW5lcihldmVudCwgZGF0YSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMub24oZXZlbnQsIG9uY2VMaXN0ZW5lcik7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLm9mZiA9IGZ1bmN0aW9uIChldmVudCwgbGlzdGVuZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5saXN0ZW5lcnNbZXZlbnRdLmRlbGV0ZShsaXN0ZW5lcik7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmVtaXQgPSBmdW5jdGlvbiAoZXZlbnQsIGRhdGEpIHtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBsaXN0ZW5lciBvZiB0aGlzLmxpc3RlbmVyc1tldmVudF0pIHtcclxuICAgICAgICAgICAgICAgIGxpc3RlbmVyKGV2ZW50LCBkYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgZm9yIChjb25zdCBldmVudCBvZiBPYmplY3QudmFsdWVzKEV2ZW50c18xLmRlZmF1bHQpKSB7XHJcbiAgICAgICAgICAgIHRoaXNbZXZlbnQudG9Mb3dlckNhc2UoKV0gPSAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KGV2ZW50LCBkYXRhKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5kZWZhdWx0ID0gRXZlbnRFbWl0dGVyO1xyXG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgRXZlbnRFbWl0dGVyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vRXZlbnRFbWl0dGVyXCIpKTtcclxuZnVuY3Rpb24gbWFrZShcclxuLy8gVGhpcyBjYW4gYmUgc2FmZWx5IGlnbm9yZWQsIHRoZSBEYXRhIHdpbGwgYWx3YXlzIGJlIGFuIG9iamVjdCBvciBpdCB3b24ndCB3b3JrIGFueXdheS5cclxuLy8gQHRzLWlnbm9yZVxyXG5kYXRhID0ge30sIHsgbmVzdEFycmF5cyA9IHRydWUsIH0gPSB7fSkge1xyXG4gICAgY29uc3QgZW1pdHRlciA9IG5ldyBFdmVudEVtaXR0ZXJfMS5kZWZhdWx0KCk7XHJcbiAgICBmdW5jdGlvbiBjcmVhdGVQcm94eSh0YXJnZXQsIHJvb3QsIHBhdGgpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb3h5KHRhcmdldCwge1xyXG4gICAgICAgICAgICBnZXQodGFyZ2V0LCBwcm9wZXJ0eSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbmV3UGF0aCA9IFsuLi5wYXRoLCBwcm9wZXJ0eV07XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHRhcmdldFtwcm9wZXJ0eV07XHJcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVtaXR0ZXIuZ2V0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogbmV3UGF0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUsXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFuZXN0QXJyYXlzICYmIEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY3JlYXRlUHJveHkodmFsdWUsIHJvb3QsIG5ld1BhdGgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY3JlYXRlUHJveHkoKHRhcmdldFtwcm9wZXJ0eV0gPSB7fSksIHJvb3QsIG5ld1BhdGgpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQodGFyZ2V0LCBwcm9wZXJ0eSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHRhcmdldFtwcm9wZXJ0eV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIGVtaXR0ZXIuc2V0KHtcclxuICAgICAgICAgICAgICAgICAgICBwYXRoOiBbLi4ucGF0aCwgcHJvcGVydHldLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvLyBUaGlzIG5lZWRzIHRvIHJldHVybiB0cnVlIG9yIGl0IGVycm9ycy4gL3NocnVnXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGVsZXRlUHJvcGVydHkodGFyZ2V0LCBwcm9wZXJ0eSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRlbGV0ZSB0YXJnZXRbcHJvcGVydHldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZW1pdHRlci5kZWxldGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRoOiBbLi4ucGF0aCwgcHJvcGVydHldLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBoYXModGFyZ2V0LCBwcm9wZXJ0eSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0YXJnZXRbcHJvcGVydHldID09PSBcIm9iamVjdFwiICYmXHJcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmtleXModGFyZ2V0W3Byb3BlcnR5XSkubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb3BlcnR5IGluIHRhcmdldDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHsgc3RvcmU6IGNyZWF0ZVByb3h5KGRhdGEsIGRhdGEsIFtdKSwgXHJcbiAgICAgICAgLy8gVGhpcyBjYW4gYmUgc2FmZWx5IGlnbm9yZWQsIHRoZSBEYXRhIHdpbGwgYWx3YXlzIGJlIGFuIG9iamVjdCBvciBpdCB3b24ndCB3b3JrIGFueXdheS5cclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgZ2hvc3Q6IGRhdGEgfSwgZW1pdHRlcik7XHJcbn1cclxuZXhwb3J0cy5kZWZhdWx0ID0gbWFrZTtcclxuIiwgIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMubWFrZSA9IGV4cG9ydHMuRXZlbnRzID0gdm9pZCAwO1xyXG52YXIgRXZlbnRzXzEgPSByZXF1aXJlKFwiLi9FdmVudHNcIik7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkV2ZW50c1wiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gX19pbXBvcnREZWZhdWx0KEV2ZW50c18xKS5kZWZhdWx0OyB9IH0pO1xyXG52YXIgbWFrZV8xID0gcmVxdWlyZShcIi4vbWFrZVwiKTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwibWFrZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gX19pbXBvcnREZWZhdWx0KG1ha2VfMSkuZGVmYXVsdDsgfSB9KTtcclxuIiwgIntcclxuICBcImNvbW1vblwiOiB7XHJcbiAgICBcIm1vZGFsc1wiOiB7XHJcbiAgICAgIFwiY29tcG9uZW50c1wiOiB7XHJcbiAgICAgICAgXCJvdGhlclwiOiB7XHJcbiAgICAgICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICBcIkhlYWRlclwiLFxyXG4gICAgICAgICAgICAgICAgXCJGb290ZXJcIlxyXG4gICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIlJvb3RcIjoge1xyXG4gICAgICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICAgICAgXCJpblwiOiBcInN0cmluZ3NcIixcclxuICAgICAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgXCJFTlRFUklOR1wiLFxyXG4gICAgICAgICAgICAgICAgXCJoZWFkZXJJZFwiXHJcbiAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIFwiYWN0aW9uc1wiOiB7XHJcbiAgICAgICAgXCJvcGVuXCI6IHtcclxuICAgICAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgICAgIFwiaW5cIjogXCJzdHJpbmdzXCIsXHJcbiAgICAgICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgIFwib25DbG9zZUNhbGxiYWNrXCIsXHJcbiAgICAgICAgICAgICAgICBcIkxheWVyXCJcclxuICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgICAgICBcImJlZm9yZVwiOiBbXHJcbiAgICAgICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgICAgIFwib3BlblwiXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBcIm1hcFwiOiB7XHJcbiAgICAgICAgICAgIFwib3BlblwiOiBbXHJcbiAgICAgICAgICAgICAgXCJvbkNsb3NlQ2FsbGJhY2tcIixcclxuICAgICAgICAgICAgICBcIkxheWVyXCJcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJjbG9zZVwiOiB7XHJcbiAgICAgICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgICAgICBcImluXCI6IFwic3RyaW5nc1wiLFxyXG4gICAgICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICBcIm9uQ2xvc2VDYWxsYmFjaygpXCJcclxuICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgICAgICBcImJlZm9yZVwiOiBbXHJcbiAgICAgICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgICAgIFwiY2xvc2VcIlxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgXCJtYXBcIjoge1xyXG4gICAgICAgICAgICBcImNsb3NlXCI6IFtcclxuICAgICAgICAgICAgICBcIm9uQ2xvc2VDYWxsYmFjaygpXCJcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiY29tcG9uZW50c1wiOiB7XHJcbiAgICAgIFwiQnV0dG9uXCI6IHtcclxuICAgICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICBcIkJvcmRlckNvbG9yc1wiXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgICBcImJlZm9yZVwiOiBbXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgICAgXSxcclxuICAgICAgICAgIFwiYWZ0ZXJcIjogXCJCdXR0b25cIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJtYXBcIjoge1xyXG4gICAgICAgICAgXCJCdXR0b25cIjogW1xyXG4gICAgICAgICAgICBcIi5GSUxMRURcIixcclxuICAgICAgICAgICAgXCIub25Nb3VzZUxlYXZlXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIFwiQ29uZmlybWF0aW9uTW9kYWxcIjoge1xyXG4gICAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICAgIFwiaW5cIjogXCJzdHJpbmdzXCIsXHJcbiAgICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgIFwiLmNvbmZpcm1CdXR0b25Db2xvclwiXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwibWFwXCI6IHtcclxuICAgICAgICAgIFwiQ29uZmlybWF0aW9uTW9kYWxcIjogW1xyXG4gICAgICAgICAgICBcIi5jb25maXJtQnV0dG9uQ29sb3JcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICAgIFwiYmVmb3JlXCI6IFtcclxuICAgICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgICBdLFxyXG4gICAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICAgIFwiQ29uZmlybWF0aW9uTW9kYWxcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgXCJUZXh0XCI6IHtcclxuICAgICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgICAgXCJmaWx0ZXJcIjogXCIkPy5TaXplcz8uU0laRV8zMiAmJiAkLkNvbG9yc1wiLFxyXG4gICAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgICBcImJlZm9yZVwiOiBbXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgXCJUb29sdGlwXCI6IHtcclxuICAgICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgICBcImluXCI6IFwicHJvdG90eXBlc1wiLFxyXG4gICAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICBcInJlbmRlclRvb2x0aXBcIlxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgICAgXCJiZWZvcmVcIjogW1xyXG4gICAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIFwiTWFya2Rvd25cIjoge1xyXG4gICAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgICBcImZpbHRlclwiOiBcIiQ/LnByb3RvdHlwZT8ucmVuZGVyICYmICQucnVsZXNcIixcclxuICAgICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiRmx1eERpc3BhdGNoZXJcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcIl9jdXJyZW50RGlzcGF0Y2hBY3Rpb25UeXBlXCIsXHJcbiAgICAgICAgICAgIFwiZGlzcGF0Y2hcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiUmVhY3RcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcImNyZWF0ZUVsZW1lbnRcIixcclxuICAgICAgICAgICAgXCJ1c2VTdGF0ZVwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJSZXN0XCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJnZXRcIixcclxuICAgICAgICAgICAgXCJwb3N0XCIsXHJcbiAgICAgICAgICAgIFwiZ2V0QVBJQmFzZVVSTFwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJSb3V0ZXJcIjoge1xyXG4gICAgICBcInRyYW5zaXRpb25Ub1wiOiB7XHJcbiAgICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgICAgXCJpblwiOiBcInN0cmluZ3NcIixcclxuICAgICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgXCJ0cmFuc2l0aW9uVG8gLSBUcmFuc2l0aW9uaW5nIHRvIFwiXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgICBcImJlZm9yZVwiOiBbXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgICAgXSxcclxuICAgICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgICBcInRyYW5zaXRpb25Ub1wiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIm1hcFwiOiB7XHJcbiAgICAgICAgICBcInRyYW5zaXRpb25Ub1wiOiBbXHJcbiAgICAgICAgICAgIFwidHJhbnNpdGlvblRvIC0gVHJhbnNpdGlvbmluZyB0byBcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgXCJyZXBsYWNlV2l0aFwiOiB7XHJcbiAgICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgICAgXCJpblwiOiBcInN0cmluZ3NcIixcclxuICAgICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgXCJcXFwiUmVwbGFjaW5nIHJvdXRlIHdpdGggXFxcIlwiXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgICBcImJlZm9yZVwiOiBbXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgICAgXSxcclxuICAgICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgICBcInJlcGxhY2VXaXRoXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwibWFwXCI6IHtcclxuICAgICAgICAgIFwicmVwbGFjZVdpdGhcIjogW1xyXG4gICAgICAgICAgICBcIlxcXCJSZXBsYWNpbmcgcm91dGUgd2l0aCBcXFwiXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIkZsdXhcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcImNvbm5lY3RTdG9yZXNcIixcclxuICAgICAgICAgICAgXCJkZXN0cm95XCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIldlYlNvY2tldFwiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjogXCIkPy5fX3Byb3RvX18/LmhhbmRsZUNvbm5lY3Rpb25cIixcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImJlZm9yZVwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIkFjdGl2aXR5QWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwic2VuZEFjdGl2aXR5SW52aXRlXCIsXHJcbiAgICAgICAgICAgIFwidXBkYXRlQWN0aXZpdHlcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiUHJpdmF0ZUNoYW5uZWxBY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJvcGVuUHJpdmF0ZUNoYW5uZWxcIixcclxuICAgICAgICAgICAgXCJlbnN1cmVQcml2YXRlQ2hhbm5lbFwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJBY2tBY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJpblwiOiBcInN0cmluZ3NcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJ0eXBlOlxcXCJCVUxLX0FDS1xcXCJcIlxyXG4gICAgICAgICAgXSxcclxuICAgICAgICAgIFtdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IHRydWUsXHJcbiAgICAgICAgXCJiZWZvcmVcIjogXCJleHBvcnRzXCJcclxuICAgICAgfSxcclxuICAgICAgXCJtYXBcIjoge1xyXG4gICAgICAgIFwiYWNrXCI6IFtcclxuICAgICAgICAgIFwidHlwZTpcXFwiQ0hBTk5FTF9BQ0tcXFwiXCIsXHJcbiAgICAgICAgICBcIm1lc3NhZ2VJZFwiLFxyXG4gICAgICAgICAgXCJjaGFubmVsSWRcIlxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgXCJidWxrQWNrXCI6IFtcclxuICAgICAgICAgIFwidHlwZTpcXFwiQlVMS19BQ0tcXFwiXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIkFuYWx5dGljc0FjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcImlzVGhyb3R0bGVkXCIsXHJcbiAgICAgICAgICAgIFwidHJhY2tcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiQW5pbWF0aW9uQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcInNwcmluZ1wiLFxyXG4gICAgICAgICAgICBcImRlY2F5XCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIkNvbm5lY3Rpb25BY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJzZXRTaG93QWN0aXZpdHlcIixcclxuICAgICAgICAgICAgXCJzZXRWaXNpYmlsaXR5XCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIlJUQ0Nvbm5lY3Rpb25BY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJnZXRDaGFubmVsSWRcIixcclxuICAgICAgICAgICAgXCJnZXRHdWlsZElkXCIsXHJcbiAgICAgICAgICAgIFwiZ2V0UlRDQ29ubmVjdGlvbklkXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIkVtb2ppQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwidHJhbnNsYXRlSW5saW5lRW1vamlUb1N1cnJvZ2F0ZXNcIixcclxuICAgICAgICAgICAgXCJ0cmFuc2xhdGVTdXJyb2dhdGVzVG9JbmxpbmVFbW9qaVwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJFbW9qaVN0YXRlQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwiZ2V0VVJMXCIsXHJcbiAgICAgICAgICAgIFwiaXNFbW9qaURpc2FibGVkXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIkd1aWxkTm90aWZpY2F0aW9uc0FjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcInVwZGF0ZUNoYW5uZWxPdmVycmlkZVNldHRpbmdzXCIsXHJcbiAgICAgICAgICAgIFwidXBkYXRlR3VpbGROb3RpZmljYXRpb25TZXR0aW5nc1wiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJJbnRlcm5hbFJlYWN0XCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJqc3hcIixcclxuICAgICAgICAgICAgXCJqc3hzXCIsXHJcbiAgICAgICAgICAgIFwiRnJhZ21lbnRcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiTG9naW5BY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJsb2dpblwiLFxyXG4gICAgICAgICAgICBcImxvZ291dFwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJRdWVyeUFjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcInF1ZXJ5RW1vamlSZXN1bHRzXCIsXHJcbiAgICAgICAgICAgIFwicXVlcnlGcmllbmRzXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIk1lc3NhZ2VBY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJyZWNlaXZlTWVzc2FnZVwiLFxyXG4gICAgICAgICAgICBcInNlbmRNZXNzYWdlXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIlByZW1pdW1BY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJpc1ByZW1pdW1cIixcclxuICAgICAgICAgICAgXCJjYW5Vc2VFbW9qaXNFdmVyeXdoZXJlXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIlZvaWNlQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwic2VsZWN0Vm9pY2VDaGFubmVsXCIsXHJcbiAgICAgICAgICAgIFwiZGlzY29ubmVjdFwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJUeXBpbmdBY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJzdGFydFR5cGluZ1wiLFxyXG4gICAgICAgICAgICBcInN0b3BUeXBpbmdcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiR3VpbGRBY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJzZXRDaGFubmVsXCIsXHJcbiAgICAgICAgICAgIFwic2V0U2VydmVyTXV0ZVwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJJbnZpdGVBY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJhY2NlcHRJbnZpdGVcIixcclxuICAgICAgICAgICAgXCJhY2NlcHRJbnZpdGVBbmRUcmFuc2l0aW9uVG9JbnZpdGVDaGFubmVsXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIk1lZGlhRW5naW5lQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwidG9nZ2xlU2VsZkRlYWZcIixcclxuICAgICAgICAgICAgXCJ0b2dnbGVTZWxmTXV0ZVwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJpMThuXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJfcmVxdWVzdGVkTG9jYWxlXCIsXHJcbiAgICAgICAgICAgIFwiZ2V0RGVmYXVsdExvY2FsZVwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJ1dWlkXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJ2MVwiLFxyXG4gICAgICAgICAgICBcInY0XCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcImhsanNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcImhpZ2hsaWdodEFsbFwiLFxyXG4gICAgICAgICAgICBcImhpZ2hsaWdodFwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59IiwgImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGZpbmRJblRyZWUoXHJcbiAgdHJlZSxcclxuICBzZWFyY2hGaWx0ZXIsXHJcbiAgeyB3YWxrYWJsZSA9IG51bGwsIGlnbm9yZSA9IFtdLCBsaW1pdCA9IDI1NiwgYWxsID0gZmFsc2UgfSA9IHt9XHJcbikge1xyXG4gIGxldCBpdGVyYXRpb24gPSAwO1xyXG4gIGxldCBmb3VuZExpc3QgPSBbXTtcclxuXHJcbiAgZnVuY3Rpb24gZG9TZWFyY2godHJlZSwgc2VhcmNoRmlsdGVyLCB7IHdhbGthYmxlID0gbnVsbCwgaWdub3JlID0gW10gfSA9IHt9KSB7XHJcbiAgICBpdGVyYXRpb24gKz0gMTtcclxuICAgIGlmIChpdGVyYXRpb24gPiBsaW1pdCkgcmV0dXJuO1xyXG5cclxuICAgIGlmICh0eXBlb2Ygc2VhcmNoRmlsdGVyID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgIGlmICh0cmVlLmhhc093blByb3BlcnR5KHNlYXJjaEZpbHRlcikpIHtcclxuICAgICAgICBpZiAoYWxsKSBmb3VuZExpc3QucHVzaCh0cmVlW3NlYXJjaEZpbHRlcl0pO1xyXG4gICAgICAgIGlmICghYWxsKSByZXR1cm4gdHJlZVtzZWFyY2hGaWx0ZXJdO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKHNlYXJjaEZpbHRlcih0cmVlKSkge1xyXG4gICAgICBpZiAoYWxsKSBmb3VuZExpc3QucHVzaCh0cmVlKTtcclxuICAgICAgaWYgKCFhbGwpIHJldHVybiB0cmVlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghdHJlZSkgcmV0dXJuO1xyXG5cclxuICAgIGlmIChBcnJheS5pc0FycmF5KHRyZWUpKSB7XHJcbiAgICAgIGZvciAoY29uc3QgaXRlbSBvZiB0cmVlKSB7XHJcbiAgICAgICAgY29uc3QgZm91bmQgPSBkb1NlYXJjaChpdGVtLCBzZWFyY2hGaWx0ZXIsIHsgd2Fsa2FibGUsIGlnbm9yZSB9KTtcclxuICAgICAgICBpZiAoZm91bmQpIGZvdW5kTGlzdC5wdXNoKGZvdW5kKTtcclxuICAgICAgICBpZiAoZm91bmQgJiYgIWFsbCkgcmV0dXJuIGZvdW5kO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB0cmVlID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgIGZvciAoY29uc3Qga2V5IGluIHRyZWUpIHtcclxuICAgICAgICBpZiAod2Fsa2FibGUgIT0gbnVsbCAmJiAhd2Fsa2FibGUuaW5jbHVkZXMoa2V5KSkgY29udGludWU7XHJcblxyXG4gICAgICAgIGlmIChpZ25vcmUuaW5jbHVkZXMoa2V5KSkgY29udGludWU7XHJcblxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICBjb25zdCBmb3VuZCA9IGRvU2VhcmNoKHRyZWVba2V5XSwgc2VhcmNoRmlsdGVyLCB7XHJcbiAgICAgICAgICAgIHdhbGthYmxlLFxyXG4gICAgICAgICAgICBpZ25vcmUsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGlmIChmb3VuZCkgZm91bmRMaXN0LnB1c2goZm91bmQpO1xyXG4gICAgICAgICAgaWYgKGZvdW5kICYmICFhbGwpIHJldHVybiBmb3VuZDtcclxuICAgICAgICB9IGNhdGNoIHsgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gZG9TZWFyY2godHJlZSwgc2VhcmNoRmlsdGVyLCB7IHdhbGthYmxlLCBpZ25vcmUgfSkgPz8gZm91bmRMaXN0O1xyXG59O1xyXG4iLCAiZnVuY3Rpb24gYnVpbGQocHJlZml4ID0gXCJBY29yZFwiLCB0eXBlLCBjb2xvcikge1xyXG4gIHJldHVybiAoLi4uaW5wdXQpID0+IGNvbnNvbGVbdHlwZV0oXHJcbiAgICBgJWMke3ByZWZpeH0lY2AsXHJcbiAgICBgYmFja2dyb3VuZC1jb2xvcjogJHtjb2xvcn07IGNvbG9yOiB3aGl0ZTsgYm9yZGVyLXJhZGl1czogNHB4OyBwYWRkaW5nOiAwcHggNnB4IDBweCA2cHg7IGZvbnQtd2VpZ2h0OiBib2xkYCxcclxuICAgIFwiXCIsXHJcbiAgICAuLi5pbnB1dFxyXG4gICk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBsb2c6IGJ1aWxkKFwiQWNvcmRcIiwgXCJsb2dcIiwgXCIjMDBmYmIwXCIpLFxyXG4gIGRlYnVnOiBidWlsZChcIkFjb3JkIERlYnVnXCIsIFwiZGVidWdcIiwgXCIjMDBmYmIwXCIpLFxyXG4gIGluZm86IGJ1aWxkKFwiQWNvcmQgSW5mb1wiLCBcImxvZ1wiLCBcIiM4MmFhZmZcIiksXHJcbiAgd2FybjogYnVpbGQoXCJBY29yZCBXYXJuXCIsIFwid2FyblwiLCBcIiNkZWJmMThcIiksXHJcbiAgZXJyb3I6IGJ1aWxkKFwiQWNvcmQgRXJyb3JcIiwgXCJlcnJvclwiLCBcIiNlZjU4NThcIiksXHJcbiAgYnVpbGRcclxufSIsICJpbXBvcnQgZmluZEluVHJlZSBmcm9tIFwiLi9yYXcvZmluZC1pbi10cmVlLmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgZ2V0SW5zdGFuY2Uobm9kZSkge1xyXG4gICAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKG5vZGUpLmZpbmQoaSA9PiBpWzBdLnN0YXJ0c1dpdGgoXCJfX3JlYWN0SW50ZXJuYWxJbnN0YW5jZVwiKSB8fCBpWzBdLnN0YXJ0c1dpdGgoXCJfX3JlYWN0RmliZXJcIikpPy5bMV07XHJcbiAgfSxcclxuICBnZXRPd25lckluc3RhbmNlKG5vZGUpIHtcclxuICAgIGxldCBpbnN0YW5jZSA9IHRoaXMuZ2V0SW5zdGFuY2Uobm9kZSk7XHJcbiAgICBmb3IgKGxldCBlbCA9IGluc3RhbmNlOyBlbDsgZWwgPSBlbC5yZXR1cm4pXHJcbiAgICAgIGlmIChlbC5zdGF0ZU5vZGU/LmZvcmNlVXBkYXRlKSByZXR1cm4gZWwuc3RhdGVOb2RlO1xyXG4gIH0sXHJcbiAgZmluZEluVHJlZSh0cmVlLCBmaWx0ZXIpIHtcclxuICAgIHJldHVybiBmaW5kSW5UcmVlKHRyZWUsIGZpbHRlciwge1xyXG4gICAgICB3YWxrYWJsZTogW1wicHJvcHNcIiwgXCJzdGF0ZVwiLCBcImNoaWxkcmVuXCIsIFwicmV0dXJuXCJdXHJcbiAgICB9KTtcclxuICB9LFxyXG4gIGdldENvbXBvbmVudHMobm9kZSkge1xyXG4gICAgY29uc3QgaW5zdGFuY2UgPSB0aGlzLmdldEluc3RhbmNlKG5vZGUpO1xyXG4gICAgY29uc3QgY29tcG9uZW50cyA9IFtdO1xyXG4gICAgbGV0IGxhc3RJbnN0YW5jZSA9IGluc3RhbmNlO1xyXG4gICAgd2hpbGUgKGxhc3RJbnN0YW5jZSAmJiBsYXN0SW5zdGFuY2UucmV0dXJuKSB7XHJcbiAgICAgIGlmICh0eXBlb2YgbGFzdEluc3RhbmNlLnJldHVybi50eXBlID09PSBcInN0cmluZ1wiKSBicmVhaztcclxuICAgICAgaWYgKGxhc3RJbnN0YW5jZS5yZXR1cm4udHlwZSkgY29tcG9uZW50cy5wdXNoKGxhc3RJbnN0YW5jZS5yZXR1cm4udHlwZSk7XHJcbiAgICAgIGxhc3RJbnN0YW5jZSA9IGxhc3RJbnN0YW5jZS5yZXR1cm47XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY29tcG9uZW50cztcclxuICB9LFxyXG4gIGdldFN0YXRlTm9kZXMobm9kZSkge1xyXG4gICAgY29uc3QgaW5zdGFuY2UgPSB0aGlzLmdldEluc3RhbmNlKG5vZGUpO1xyXG4gICAgY29uc3Qgc3RhdGVOb2RlcyA9IFtdO1xyXG4gICAgbGV0IGxhc3RJbnN0YW5jZSA9IGluc3RhbmNlO1xyXG4gICAgd2hpbGUgKGxhc3RJbnN0YW5jZSAmJiBsYXN0SW5zdGFuY2UucmV0dXJuKSB7XHJcbiAgICAgIGlmIChsYXN0SW5zdGFuY2UucmV0dXJuLnN0YXRlTm9kZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSBicmVhaztcclxuICAgICAgaWYgKGxhc3RJbnN0YW5jZS5yZXR1cm4uc3RhdGVOb2RlKVxyXG4gICAgICAgIHN0YXRlTm9kZXMucHVzaChsYXN0SW5zdGFuY2UucmV0dXJuLnN0YXRlTm9kZSk7XHJcbiAgICAgIGxhc3RJbnN0YW5jZSA9IGxhc3RJbnN0YW5jZS5yZXR1cm47XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3RhdGVOb2RlcztcclxuICB9LFxyXG4gIGdldFByb3BzKGVsLCBmaWx0ZXIgPSAoaSkgPT4gaSwgbWF4ID0gMTAwMDApIHtcclxuICAgIGNvbnN0IGluc3RhbmNlID0gdGhpcy5nZXRJbnN0YW5jZShlbCk7XHJcblxyXG4gICAgaWYgKCFpbnN0YW5jZT8ucmV0dXJuKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgICBmb3IgKFxyXG4gICAgICBsZXQgY3VycmVudCA9IGluc3RhbmNlPy5yZXR1cm4sIGkgPSAwO1xyXG4gICAgICBpID4gbWF4IHx8IGN1cnJlbnQgIT09IG51bGw7XHJcbiAgICAgIGN1cnJlbnQgPSBjdXJyZW50Py5yZXR1cm4sIGkrK1xyXG4gICAgKSB7XHJcbiAgICAgIGlmIChjdXJyZW50Py5wZW5kaW5nUHJvcHMgJiYgZmlsdGVyKGN1cnJlbnQucGVuZGluZ1Byb3BzKSlcclxuICAgICAgICByZXR1cm4gY3VycmVudC5wZW5kaW5nUHJvcHM7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfSxcclxufSIsICJpbXBvcnQgZmluZEluVHJlZSBmcm9tIFwiLi9yYXcvZmluZC1pbi10cmVlLmpzXCI7XHJcbmltcG9ydCBsb2dnZXIgZnJvbSBcIi4vbG9nZ2VyLmpzXCI7XHJcbmltcG9ydCByZWFjdCBmcm9tIFwiLi9yZWFjdC5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGxvZ2dlcixcclxuICByZWFjdCxcclxuICBmaW5kSW5UcmVlLFxyXG4gIGZvcm1hdCh2YWwsIC4uLmFyZ3MpIHtcclxuICAgIHJldHVybiBgJHt2YWx9YC5yZXBsYWNlQWxsKC97KFxcZCspfS9nLCAoXywgY2FwKSA9PiB7XHJcbiAgICAgIHJldHVybiBhcmdzW051bWJlcihjYXApXTtcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgaW50ZXJ2YWwoY2IsIGR1cikge1xyXG4gICAgbGV0IGludGVydmFsID0gc2V0SW50ZXJ2YWwoY2IsIGR1cik7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcclxuICAgIH07XHJcbiAgfSxcclxuICB0aW1lb3V0KGNiLCBkdXIpIHtcclxuICAgIGxldCB0aW1lb3V0ID0gc2V0VGltZW91dChjYiwgZHVyKTtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcclxuICAgIH07XHJcbiAgfSxcclxuICBpZkV4aXN0cyh2YWwsIGNiKSB7XHJcbiAgICBpZiAodmFsKSBjYih2YWwpO1xyXG4gIH0sXHJcbiAgY29weVRleHQodGV4dCkge1xyXG4gICAgaWYgKHdpbmRvdy5EaXNjb3JkTmF0aXZlKSB7XHJcbiAgICAgIERpc2NvcmROYXRpdmUuY2xpcGJvYXJkLmNvcHkodGV4dCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBuYXZpZ2F0b3IuY2xpcGJvYXJkLndyaXRlVGV4dCh0ZXh0KS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgIGNvbnN0IGNvcHlBcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRleHRhcmVhXCIpO1xyXG5cclxuICAgICAgY29weUFyZWEuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XHJcbiAgICAgIGNvcHlBcmVhLnN0eWxlLnBvc2l0aW9uID0gXCJmaXhlZFwiO1xyXG4gICAgICBjb3B5QXJlYS5zdHlsZS50b3AgPSBcIjBcIjtcclxuICAgICAgY29weUFyZWEuc3R5bGUubGVmdCA9IFwiMFwiO1xyXG5cclxuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjb3B5QXJlYSk7XHJcbiAgICAgIGNvcHlBcmVhLmZvY3VzKCk7XHJcbiAgICAgIGNvcHlBcmVhLnNlbGVjdCgpO1xyXG5cclxuICAgICAgdHJ5IHtcclxuICAgICAgICBkb2N1bWVudC5leGVjQ29tbWFuZChcImNvcHlcIik7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChjb3B5QXJlYSk7XHJcbiAgICB9KTtcclxuICB9LFxyXG4gIHNsZWVwKG1zKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgbXMpKTtcclxuICB9LFxyXG4gIG1hcFJlcGxhY2UodGV4dCwgbWFwID0ge30pIHtcclxuICAgIHJldHVybiAoQXJyYXkuaXNBcnJheShtYXApID8gbWFwIDogT2JqZWN0LmVudHJpZXMobWFwKSkucmVkdWNlKChhbGwsIGN1cnJlbnQpID0+IGFsbC5yZXBsYWNlQWxsKGN1cnJlbnRbMF0sIGN1cnJlbnRbMV0pLCB0ZXh0KTtcclxuICB9LFxyXG4gIGVzY2FwZVJlZ2V4KHN0cikge1xyXG4gICAgcmV0dXJuIHN0clxyXG4gICAgICAucmVwbGFjZSgvW3xcXFxce30oKVtcXF1eJCsqPy5dL2csICdcXFxcJCYnKVxyXG4gICAgICAucmVwbGFjZSgvLS9nLCAnXFxcXHgyZCcpO1xyXG4gIH1cclxufSIsICJpbXBvcnQgdXRpbHMgZnJvbSBcIi4uLy4uL3V0aWxzL2luZGV4LmpzXCI7XHJcbmltcG9ydCBsb2dnZXIgZnJvbSBcIi4uLy4uL3V0aWxzL2xvZ2dlci5qc1wiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHdyYXBGaWx0ZXIoZmlsdGVyKSB7XHJcbiAgcmV0dXJuICguLi5hcmdzKSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICBpZiAoYXJnc1swXT8uZG9jdW1lbnQgJiYgYXJnc1swXT8ud2luZG93KSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIGlmIChhcmdzWzBdPy5kZWZhdWx0Py5yZW1vdmUgJiYgYXJnc1swXT8uZGVmYXVsdD8uc2V0ICYmIGFyZ3NbMF0/LmRlZmF1bHQ/LmNsZWFyICYmIGFyZ3NbMF0/LmRlZmF1bHQ/LmdldCAmJiAhYXJnc1swXT8uZGVmYXVsdD8uc29ydCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICBpZiAoYXJnc1swXS5yZW1vdmUgJiYgYXJnc1swXS5zZXQgJiYgYXJnc1swXS5jbGVhciAmJiBhcmdzWzBdLmdldCAmJiAhYXJnc1swXS5zb3J0KSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIGlmIChhcmdzWzBdPy5kZWZhdWx0Py5nZXRUb2tlbiB8fCBhcmdzWzBdPy5kZWZhdWx0Py5nZXRFbWFpbCB8fCBhcmdzWzBdPy5kZWZhdWx0Py5zaG93VG9rZW4pIHJldHVybiBmYWxzZTtcclxuICAgICAgaWYgKGFyZ3NbMF0/LmdldFRva2VuIHx8IGFyZ3NbMF0/LmdldEVtYWlsIHx8IGFyZ3NbMF0/LnNob3dUb2tlbikgcmV0dXJuIGZhbHNlO1xyXG4gICAgICByZXR1cm4gZmlsdGVyKC4uLmFyZ3MpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycikge1xyXG4gICAgICBsb2dnZXIud2FybihcIk1vZHVsZSBmaWx0ZXIgdGhyZXcgYW4gZXhjZXB0aW9uLlwiLCBmaWx0ZXIsIGVycik7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBjaGVja01vZHVsZVN0cmluZ3MobSwgc3RyaW5ncywgaGFzTm90KSB7XHJcbiAgY29uc3QgY2hlY2sgPSAoczEsIHMyKSA9PiB7XHJcbiAgICByZXR1cm4gaGFzTm90ID8gczEudG9TdHJpbmcoKS5pbmRleE9mKHMyLnRvU3RyaW5nKCkpID09IC0xIDogczEudG9TdHJpbmcoKS5pbmRleE9mKHMyLnRvU3RyaW5nKCkpID4gLTE7XHJcbiAgfTtcclxuICByZXR1cm4gc3RyaW5ncy5ldmVyeShqID0+IHtcclxuICAgIHJldHVybiBjaGVjayhtPy50b1N0cmluZz8uKCkgfHwgXCJcIiwgailcclxuICAgICAgfHwgY2hlY2sobT8uX19vcmlnaW5hbF9fPy50b1N0cmluZz8uKCkgfHwgXCJcIiwgailcclxuICAgICAgfHwgY2hlY2sobT8udHlwZT8udG9TdHJpbmc/LigpIHx8IFwiXCIsIGopXHJcbiAgICAgIHx8IGNoZWNrKG0/LnR5cGU/Ll9fb3JpZ2luYWxfXz8udG9TdHJpbmc/LigpIHx8IFwiXCIsIGopXHJcbiAgICAgIHx8IE9iamVjdC5lbnRyaWVzKFsnZnVuY3Rpb24nLCAnb2JqZWN0J10uaW5jbHVkZXModHlwZW9mIG0/LnByb3RvdHlwZSkgPyB0eXBlb2YgbT8ucHJvdG90eXBlIDoge30pLmZpbHRlcihpID0+IGlbMF0/LmluY2x1ZGVzPy4oXCJyZW5kZXJcIikpLnNvbWUoaSA9PiBjaGVjayhpWzFdPy50b1N0cmluZz8uKCkgfHwgXCJcIiwgaikpXHJcbiAgfSk7XHJcbn07XHJcbmZ1bmN0aW9uIGNoZWNrTW9kdWxlUHJvcHMobSwgcHJvcGVydGllcywgaGFzTm90KSB7XHJcbiAgcmV0dXJuIHByb3BlcnRpZXMuZXZlcnkocHJvcCA9PiB7XHJcbiAgICBjb25zdCB2YWx1ZSA9IG1bcHJvcF0/Ll9fb3JpZ2luYWxfXyB8fCBtW3Byb3BdO1xyXG4gICAgcmV0dXJuIGhhc05vdCA/IHZhbHVlID09PSB1bmRlZmluZWQgOiAodmFsdWUgIT09IHVuZGVmaW5lZCAmJiAhKHR5cGVvZiB2YWx1ZSA9PSBcInN0cmluZ1wiICYmICF2YWx1ZSkpO1xyXG4gIH0pO1xyXG59O1xyXG5mdW5jdGlvbiBjaGVja01vZHVsZVByb3RvdHlwZXMobSwgcHJvdG9Qcm9wcywgaGFzTm90KSB7XHJcbiAgcmV0dXJuIG0ucHJvdG90eXBlICYmIHByb3RvUHJvcHMuZXZlcnkocHJvcCA9PiB7XHJcbiAgICBjb25zdCB2YWx1ZSA9IG0ucHJvdG90eXBlW3Byb3BdO1xyXG4gICAgcmV0dXJuIGhhc05vdCA/IHZhbHVlID09PSB1bmRlZmluZWQgOiAodmFsdWUgIT09IHVuZGVmaW5lZCAmJiAhKHR5cGVvZiB2YWx1ZSA9PSBcInN0cmluZ1wiICYmICF2YWx1ZSkpO1xyXG4gIH0pO1xyXG59O1xyXG5cclxuY29uc3Qgd2VicGFja0NodW5rTmFtZSA9IFwid2VicGFja0NodW5rZGlzY29yZF9hcHBcIjtcclxuY29uc3QgcHVzaExpc3RlbmVycyA9IG5ldyBTZXQoKTtcclxuXHJcblxyXG57XHJcbiAgbGV0IG9nUHVzaCA9IHdpbmRvd1t3ZWJwYWNrQ2h1bmtOYW1lXS5wdXNoO1xyXG5cclxuICBmdW5jdGlvbiBoYW5kbGVQdXNoKGNodW5rKSB7XHJcbiAgICBjb25zdCBbLCBtb2R1bGVzXSA9IGNodW5rO1xyXG5cclxuICAgIGZvciAoY29uc3QgbW9kdWxlSWQgaW4gT2JqZWN0LmtleXMobW9kdWxlcyB8fCB7fSkpIHtcclxuICAgICAgY29uc3Qgb2dNb2R1bGUgPSBtb2R1bGVzW21vZHVsZUlkXTtcclxuXHJcbiAgICAgIG1vZHVsZXNbbW9kdWxlSWRdID0gKG1vZHVsZSwgZXhwb3J0cywgcmVxdWlyZSkgPT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICBvZ01vZHVsZS5jYWxsKG51bGwsIG1vZHVsZSwgZXhwb3J0cywgcmVxdWlyZSk7XHJcblxyXG4gICAgICAgICAgcHVzaExpc3RlbmVycy5mb3JFYWNoKGxpc3RlbmVyID0+IHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICBsaXN0ZW5lcihleHBvcnRzKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICB1dGlscy5sb2dnZXIuZXJyb3IoXCJQdXNoIGxpc3RlbmVyIHRocmV3IGFuIGV4Y2VwdGlvbi5cIiwgbGlzdGVuZXIsIGVycm9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgdXRpbHMubG9nZ2VyLmVycm9yKFwiVW5hYmxlIHRvIHBhdGNoIHB1c2hlZCBtb2R1bGUuXCIsIGVycm9yLCBvZ01vZHVsZSwgbW9kdWxlSWQsIGNodW5rKTtcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcblxyXG4gICAgICBPYmplY3QuYXNzaWduKG1vZHVsZXNbbW9kdWxlSWRdLCBvZ01vZHVsZSwge1xyXG4gICAgICAgIF9fb3JpZ2luYWxfXzogb2dNb2R1bGUsXHJcbiAgICAgICAgdG9TdHJpbmc6ICgpID0+IG9nTW9kdWxlLnRvU3RyaW5nKCksXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBvZ1B1c2guY2FsbCh3aW5kb3dbd2VicGFja0NodW5rTmFtZV0sIGNodW5rKTtcclxuICB9XHJcblxyXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3dbd2VicGFja0NodW5rTmFtZV0sIFwicHVzaFwiLCB7XHJcbiAgICBjb25maWd1cmFibGU6IHRydWUsXHJcbiAgICBnZXQoKSB7IHJldHVybiBoYW5kbGVQdXNoOyB9LFxyXG4gICAgc2V0KHZhbHVlKSB7XHJcbiAgICAgIG9nUHVzaCA9IHZhbHVlO1xyXG5cclxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvd1t0aGlzLmNodW5rTmFtZV0sIFwicHVzaFwiLCB7XHJcbiAgICAgICAgdmFsdWU6IHRoaXMuaGFuZGxlUHVzaCxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXHJcbiAgICAgICAgd3JpdGFibGU6IHRydWVcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn1cclxuXHJcblxyXG5cclxuLyoqXHJcbiAqIFxyXG4gKiBAcGFyYW0ge2FueX0gZmlsdGVyIFxyXG4gKiBAcGFyYW0ge3sgc2lnbmFsOiBBYm9ydFNpZ25hbCwgc2VhcmNoRXhwb3J0czogYm9vbGVhbiB9fSBwYXJhbTEgXHJcbiAqIEByZXR1cm5zIFxyXG4gKi9cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGxhenlGaW5kKGZpbHRlciwgeyBzaWduYWwgPSBudWxsLCBzZWFyY2hFeHBvcnRzID0gZmFsc2UgfSkge1xyXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICBjb25zdCBjYW5jZWwgPSAoKSA9PiBwdXNoTGlzdGVuZXJzLmRlbGV0ZShsaXN0ZW5lcik7XHJcbiAgICBjb25zdCBsaXN0ZW5lciA9IChleHBvcnRzKSA9PiB7XHJcbiAgICAgIGlmICghZXhwb3J0cyB8fCBleHBvcnRzID09PSB3aW5kb3cgfHwgZXhwb3J0cyA9PT0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSByZXR1cm47XHJcblxyXG4gICAgICBsZXQgZm91bmQgPSBudWxsO1xyXG5cclxuICAgICAgaWYgKHR5cGVvZiBleHBvcnRzID09IFwib2JqZWN0XCIgJiYgc2VhcmNoRXhwb3J0cykge1xyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIGV4cG9ydHMpIHtcclxuICAgICAgICAgIGxldCBleHBvcnRlZCA9IGV4cG9ydHNba2V5XTtcclxuICAgICAgICAgIGlmICghZXhwb3J0ZWQpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgaWYgKGZpbHRlcihleHBvcnRlZCkpIHtcclxuICAgICAgICAgICAgZm91bmQgPSBleHBvcnRlZDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGxldCBwYXRocyA9IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIixcclxuICAgICAgICAgIFwiXCJcclxuICAgICAgICBdO1xyXG4gICAgICAgIGZvdW5kID0gcGF0aHMubWFwKGkgPT4ge1xyXG4gICAgICAgICAgbGV0IHBhdGhlZCA9ICFpID8gZXhwb3J0cyA6IF8uZ2V0KGV4cG9ydHMsIGkpO1xyXG4gICAgICAgICAgaWYgKHBhdGhlZCAmJiBmaWx0ZXIocGF0aGVkKSkgcmV0dXJuIHBhdGhlZDtcclxuICAgICAgICB9KS5maW5kKGkgPT4gaSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICghZm91bmQpIHJldHVybjtcclxuICAgICAgY2FuY2VsKCk7XHJcbiAgICAgIHJlc29sdmUoZm91bmQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1c2hMaXN0ZW5lcnMuYWRkKGxpc3RlbmVyKTtcclxuXHJcbiAgICBzaWduYWw/LmFkZEV2ZW50TGlzdGVuZXIoXCJhYm9ydFwiLCAoKSA9PiB7XHJcbiAgICAgIGNhbmNlbCgpO1xyXG4gICAgICByZXNvbHZlKG51bGwpO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBmaW5kKHJlcSwgZmlsdGVyLCBjb25maWcgPSB7fSkge1xyXG4gIGxldCBkZWZhdWx0RXhwb3J0ID0gdHlwZW9mIGNvbmZpZy5kZWZhdWx0RXhwb3J0ICE9IFwiYm9vbGVhblwiID8gZmFsc2UgOiBjb25maWcuZGVmYXVsdEV4cG9ydDtcclxuICBsZXQgdW5sb2FkZWQgPSB0eXBlb2YgY29uZmlnLnVubG9hZGVkICE9IFwiYm9vbGVhblwiID8gZmFsc2UgOiBjb25maWcudW5sb2FkZWQ7XHJcbiAgbGV0IGFsbCA9IHR5cGVvZiBjb25maWcuYWxsICE9IFwiYm9vbGVhblwiID8gZmFsc2UgOiBjb25maWcuYWxsO1xyXG4gIGNvbnN0IGZvdW5kID0gW107XHJcbiAgaWYgKCF1bmxvYWRlZCkgZm9yIChsZXQgaSBpbiByZXEuYykgaWYgKHJlcS5jLmhhc093blByb3BlcnR5KGkpKSB7XHJcbiAgICBsZXQgbSA9IHJlcS5jW2ldLmV4cG9ydHMsIHIgPSBudWxsO1xyXG4gICAgaWYgKG0gJiYgKHR5cGVvZiBtID09IFwib2JqZWN0XCIgfHwgdHlwZW9mIG0gPT0gXCJmdW5jdGlvblwiKSkge1xyXG4gICAgICBpZiAoISEociA9IGZpbHRlcihtLCBpKSkpIHtcclxuICAgICAgICBpZiAoYWxsKSBmb3VuZC5wdXNoKGRlZmF1bHRFeHBvcnQgPyByIDogcmVxLmNbaV0pO1xyXG4gICAgICAgIGVsc2UgcmV0dXJuIGRlZmF1bHRFeHBvcnQgPyByIDogcmVxLmNbaV07XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBmb3IgKGxldCBrZXkgb2YgT2JqZWN0LmtleXMobSkpIGlmIChrZXkubGVuZ3RoIDwgNCAmJiBtW2tleV0gJiYgISEociA9IGZpbHRlcihtW2tleV0sIGkpKSkge1xyXG4gICAgICAgIGlmIChhbGwpIGZvdW5kLnB1c2goZGVmYXVsdEV4cG9ydCA/IHIgOiByZXEuY1tpXSk7XHJcbiAgICAgICAgZWxzZSByZXR1cm4gZGVmYXVsdEV4cG9ydCA/IHIgOiByZXEuY1tpXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKG0gJiYgbS5fX2VzTW9kdWxlICYmIG0uZGVmYXVsdCAmJiAodHlwZW9mIG0uZGVmYXVsdCA9PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBtLmRlZmF1bHQgPT0gXCJmdW5jdGlvblwiKSkge1xyXG4gICAgICBpZiAoISEociA9IGZpbHRlcihtLmRlZmF1bHQsIGkpKSkge1xyXG4gICAgICAgIGlmIChhbGwpIGZvdW5kLnB1c2goZGVmYXVsdEV4cG9ydCA/IHIgOiByZXEuY1tpXSk7XHJcbiAgICAgICAgZWxzZSByZXR1cm4gZGVmYXVsdEV4cG9ydCA/IHIgOiByZXEuY1tpXTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIGlmIChtLmRlZmF1bHQudHlwZSAmJiAodHlwZW9mIG0uZGVmYXVsdC50eXBlID09IFwib2JqZWN0XCIgfHwgdHlwZW9mIG0uZGVmYXVsdC50eXBlID09IFwiZnVuY3Rpb25cIikgJiYgISEociA9IGZpbHRlcihtLmRlZmF1bHQudHlwZSwgaSkpKSB7XHJcbiAgICAgICAgaWYgKGFsbCkgZm91bmQucHVzaChkZWZhdWx0RXhwb3J0ID8gciA6IHJlcS5jW2ldKTtcclxuICAgICAgICBlbHNlIHJldHVybiBkZWZhdWx0RXhwb3J0ID8gciA6IHJlcS5jW2ldO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIGZvciAobGV0IGkgaW4gcmVxLm0pIGlmIChyZXEubS5oYXNPd25Qcm9wZXJ0eShpKSkge1xyXG4gICAgbGV0IG0gPSByZXEubVtpXTtcclxuICAgIGlmIChtICYmIHR5cGVvZiBtID09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICBpZiAocmVxLmNbaV0gJiYgIXVubG9hZGVkICYmIGZpbHRlcihtLCBpKSkge1xyXG4gICAgICAgIGlmIChhbGwpIGZvdW5kLnB1c2goZGVmYXVsdEV4cG9ydCA/IHJlcS5jW2ldLmV4cG9ydHMgOiByZXEuY1tpXSk7XHJcbiAgICAgICAgZWxzZSByZXR1cm4gZGVmYXVsdEV4cG9ydCA/IHJlcS5jW2ldLmV4cG9ydHMgOiByZXEuY1tpXTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoIXJlcS5jW2ldICYmIHVubG9hZGVkICYmIGZpbHRlcihtLCBpKSkge1xyXG4gICAgICAgIGNvbnN0IHJlc29sdmVkID0ge30sIHJlc29sdmVkMiA9IHt9O1xyXG4gICAgICAgIG0ocmVzb2x2ZWQsIHJlc29sdmVkMiwgcmVxKTtcclxuICAgICAgICBjb25zdCB0cnVlUmVzb2x2ZWQgPSByZXNvbHZlZDIgJiYgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMocmVzb2x2ZWQyIHx8IHt9KS5sZW5ndGggPT0gMCA/IHJlc29sdmVkIDogcmVzb2x2ZWQyO1xyXG4gICAgICAgIGlmIChhbGwpIGZvdW5kLnB1c2goZGVmYXVsdEV4cG9ydCA/IHRydWVSZXNvbHZlZC5leHBvcnRzIDogdHJ1ZVJlc29sdmVkKTtcclxuICAgICAgICBlbHNlIHJldHVybiBkZWZhdWx0RXhwb3J0ID8gdHJ1ZVJlc29sdmVkLmV4cG9ydHMgOiB0cnVlUmVzb2x2ZWQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgaWYgKGFsbCkgcmV0dXJuIGZvdW5kO1xyXG59O1xyXG5cclxuXHJcbmZ1bmN0aW9uIGZpbmRlckZpbmRGdW5jdGlvbihlbnRyaWVzLCBzdHJpbmdzKSB7XHJcbiAgcmV0dXJuIChlbnRyaWVzLmZpbmQobiA9PiB7XHJcbiAgICBsZXQgZnVuY1N0cmluZyA9IHR5cGVvZiBuWzFdID09IFwiZnVuY3Rpb25cIiA/IChuWzFdPy5fX29yaWdpbmFsX18/LnRvU3RyaW5nPy4oKSB8fCBuWzFdPy50b1N0cmluZz8uKCkgfHwgXCJcIikgOiAoKCkgPT4geyB0cnkgeyByZXR1cm4gSlNPTi5zdHJpbmdpZnkoblsxXSkgfSBjYXRjaCAoZXJyKSB7IHJldHVybiBuWzFdLnRvU3RyaW5nKCkgfSB9KSgpO1xyXG4gICAgbGV0IHJlbmRlckZ1bmNTdHJpbmcgPSBuWzFdPy5yZW5kZXI/Ll9fb3JpZ2luYWxfXz8udG9TdHJpbmc/LigpIHx8IG5bMV0/LnJlbmRlcj8udG9TdHJpbmc/LigpIHx8IFwiXCI7XHJcbiAgICByZXR1cm4gc3RyaW5ncy5ldmVyeShzdHJpbmcgPT4gZnVuY1N0cmluZy5pbmRleE9mKHN0cmluZykgIT0gLTEgfHwgcmVuZGVyRnVuY1N0cmluZy5pbmRleE9mKHN0cmluZykgIT0gLTEpO1xyXG4gIH0pKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRlclRvRmlsdGVyKGZpbmRlcikge1xyXG4gIGxldCBmb3VuZCA9ICgpID0+IGZhbHNlO1xyXG4gIGlmICh0eXBlb2YgZmluZGVyPy5maWx0ZXIgPT09IFwic3RyaW5nXCIpIHtcclxuICAgIGZvdW5kID0gd3JhcEZpbHRlcihldmFsKGAoKCQpPT57IHRyeSB7IHJldHVybiAoJHtmaW5kZXIuZmlsdGVyfSk7IH0gY2F0Y2ggeyByZXR1cm4gZmFsc2U7IH0gfSlgKSk7XHJcbiAgfSBlbHNlIGlmICh0eXBlb2YgZmluZGVyPy5maWx0ZXIgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgZm91bmQgPSB3cmFwRmlsdGVyKGZpbmRlci5maWx0ZXIpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBzd2l0Y2ggKGZpbmRlci5maWx0ZXIuaW4pIHtcclxuICAgICAgY2FzZSBcInByb3BlcnRpZXNcIjoge1xyXG4gICAgICAgIGlmIChmaW5kZXIuZmlsdGVyLmJ5Py5bMV0/Lmxlbmd0aCkge1xyXG4gICAgICAgICAgZm91bmQgPSB3cmFwRmlsdGVyKChtKSA9PiBjaGVja01vZHVsZVByb3BzKG0sIGZpbmRlci5maWx0ZXIuYnk/LlswXSB8fCBbXSkgJiYgY2hlY2tNb2R1bGVQcm9wcyhtLCBmaW5kZXIuZmlsdGVyLmJ5Py5bMV0gfHwgW10sIHRydWUpKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZm91bmQgPSB3cmFwRmlsdGVyKChtKSA9PiBjaGVja01vZHVsZVByb3BzKG0sIGZpbmRlci5maWx0ZXIuYnk/LlswXSB8fCBbXSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlIFwicHJvdG90eXBlc1wiOiB7XHJcbiAgICAgICAgaWYgKGZpbmRlci5maWx0ZXIuYnk/LlsxXT8ubGVuZ3RoKSB7XHJcbiAgICAgICAgICBmb3VuZCA9IHdyYXBGaWx0ZXIoKG0pID0+IGNoZWNrTW9kdWxlUHJvdG90eXBlcyhtLCBmaW5kZXIuZmlsdGVyLmJ5Py5bMF0gfHwgW10pICYmIGNoZWNrTW9kdWxlUHJvdG90eXBlcyhtLCBmaW5kZXIuZmlsdGVyLmJ5Py5bMV0gfHwgW10sIHRydWUpKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZm91bmQgPSB3cmFwRmlsdGVyKChtKSA9PiBjaGVja01vZHVsZVByb3RvdHlwZXMobSwgZmluZGVyLmZpbHRlci5ieT8uWzBdIHx8IFtdKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgXCJzdHJpbmdzXCI6IHtcclxuICAgICAgICBpZiAoZmluZGVyLmZpbHRlci5ieT8uWzFdPy5sZW5ndGgpIHtcclxuICAgICAgICAgIGZvdW5kID0gd3JhcEZpbHRlcigobSkgPT4gY2hlY2tNb2R1bGVTdHJpbmdzKG0sIGZpbmRlci5maWx0ZXIuYnk/LlswXSB8fCBbXSkgJiYgY2hlY2tNb2R1bGVTdHJpbmdzKG0sIGZpbmRlci5maWx0ZXIuYnk/LlsxXSB8fCBbXSwgdHJ1ZSkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBmb3VuZCA9IHdyYXBGaWx0ZXIoKG0pID0+IGNoZWNrTW9kdWxlU3RyaW5ncyhtLCBmaW5kZXIuZmlsdGVyLmJ5Py5bMF0gfHwgW10pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIGZvdW5kO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZmluZGVyTWFwKF9fb3JpZ2luYWxfXywgbWFwKSB7XHJcbiAgbGV0IF9fbWFwcGVkX18gPSB7fTtcclxuXHJcbiAgbGV0IHRlbXAgPSB7XHJcbiAgICBfX29yaWdpbmFsX18sXHJcbiAgICBfX21hcHBlZF9fLFxyXG4gICAgLi4uX19vcmlnaW5hbF9fXHJcbiAgfTtcclxuXHJcbiAgT2JqZWN0LmVudHJpZXMobWFwKS5mb3JFYWNoKChba2V5LCBzdHJpbmdzXSkgPT4ge1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRlbXAsIGtleSwge1xyXG4gICAgICBnZXQoKSB7XHJcbiAgICAgICAgaWYgKF9fbWFwcGVkX19ba2V5XSkgcmV0dXJuIF9fb3JpZ2luYWxfX1tfX21hcHBlZF9fW2tleV1dO1xyXG5cclxuICAgICAgICBsZXQgZm91bmRGdW5jID0gZmluZGVyRmluZEZ1bmN0aW9uKE9iamVjdC5lbnRyaWVzKF9fb3JpZ2luYWxfXyB8fCB7fSksIG1hcFtrZXldIHx8IFtdKTtcclxuICAgICAgICBpZiAoIWZvdW5kRnVuYz8ubGVuZ3RoKSByZXR1cm47XHJcblxyXG4gICAgICAgIF9fbWFwcGVkX19ba2V5XSA9IGZvdW5kRnVuY1swXTtcclxuICAgICAgICByZXR1cm4gZm91bmRGdW5jWzFdO1xyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gdGVtcDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRCeUZpbmRlcihyZXEsIGZpbmRlciA9IHt9KSB7XHJcbiAgY29uc3QgZGVmYXVsdEV4cG9ydCA9ICEhZmluZGVyPy5maWx0ZXI/LmV4cG9ydDtcclxuICBsZXQgZm91bmQgPSBmaW5kKHJlcSwgZmluZGVyVG9GaWx0ZXIoZmluZGVyKSwgeyBkZWZhdWx0RXhwb3J0LCBhbGw6IHRydWUgfSkuZmluZChpID0+IGkgIT09IGdsb2JhbFRoaXMud2luZG93IHx8IGk/LmV4cG9ydHMgIT09IGdsb2JhbFRoaXMud2luZG93KTtcclxuXHJcbiAgaWYgKCFmb3VuZCkgcmV0dXJuIG51bGw7XHJcblxyXG4gIGlmIChmaW5kZXIucGF0aD8uYmVmb3JlKSBmb3VuZCA9IChBcnJheS5pc0FycmF5KGZpbmRlci5wYXRoLmJlZm9yZSkgPyBmaW5kZXIucGF0aC5iZWZvcmUubWFwKGkgPT4gXy5nZXQoZm91bmQsIGkpKS5maW5kKGkgPT4gaSkgOiBfLmdldChmb3VuZCwgZmluZGVyLnBhdGguYmVmb3JlKSkgfHwgZm91bmQ7XHJcbiAgaWYgKGZpbmRlci5hc3NpZ24pIGZvdW5kID0gT2JqZWN0LmFzc2lnbih7fSwgZm91bmQpO1xyXG5cclxuICBpZiAoIWZvdW5kKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgaWYgKGZpbmRlci5tYXApIGZvdW5kID0gZmluZGVyTWFwKGZvdW5kLCBmaW5kZXIubWFwKTtcclxuXHJcbiAgaWYgKGZpbmRlci5wYXRoPy5hZnRlcikgZm91bmQgPSAoQXJyYXkuaXNBcnJheShmaW5kZXIucGF0aC5hZnRlcikgPyBmaW5kZXIucGF0aC5hZnRlci5tYXAoaSA9PiBfLmdldChmb3VuZCwgaSkpLmZpbmQoaSA9PiBpKSA6IF8uZ2V0KGZvdW5kLCBmaW5kZXIucGF0aC5hZnRlcikpIHx8IGZvdW5kO1xyXG5cclxuICByZXR1cm4gZm91bmQ7XHJcbn1cclxuXHJcblxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGxhenlGaW5kQnlGaW5kZXIoZmluZGVyID0ge30pIHtcclxuICBsZXQgZm91bmQgPSBhd2FpdCBsYXp5RmluZChmaW5kZXJUb0ZpbHRlcihmaW5kZXIpLCB7IHNlYXJjaEV4cG9ydHM6IGZhbHNlIH0pO1xyXG5cclxuICBpZiAoIWZvdW5kKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgaWYgKGZpbmRlci5wYXRoPy5iZWZvcmUpIGZvdW5kID0gKEFycmF5LmlzQXJyYXkoZmluZGVyLnBhdGguYmVmb3JlKSA/IGZpbmRlci5wYXRoLmJlZm9yZS5tYXAoaSA9PiBfLmdldChmb3VuZCwgaSkpLmZpbmQoaSA9PiBpKSA6IF8uZ2V0KGZvdW5kLCBmaW5kZXIucGF0aC5iZWZvcmUpKSB8fCBmb3VuZDtcclxuICBpZiAoZmluZGVyLmFzc2lnbikgZm91bmQgPSBPYmplY3QuYXNzaWduKHt9LCBmb3VuZCk7XHJcblxyXG4gIGlmICghZm91bmQpIHJldHVybiBudWxsO1xyXG5cclxuICBpZiAoZmluZGVyLm1hcCkgZm91bmQgPSBmaW5kZXJNYXAoZm91bmQsIGZpbmRlci5tYXApO1xyXG5cclxuICBpZiAoZmluZGVyLnBhdGg/LmFmdGVyKSBmb3VuZCA9IChBcnJheS5pc0FycmF5KGZpbmRlci5wYXRoLmFmdGVyKSA/IGZpbmRlci5wYXRoLmFmdGVyLm1hcChpID0+IF8uZ2V0KGZvdW5kLCBpKSkuZmluZChpID0+IGkpIDogXy5nZXQoZm91bmQsIGZpbmRlci5wYXRoLmFmdGVyKSkgfHwgZm91bmQ7XHJcblxyXG4gIHJldHVybiBmb3VuZDtcclxufSIsICJpbXBvcnQgKiBhcyBjb21wbGV4RmluZGVyIGZyb20gXCIuL3Jhdy9jb21wbGV4LWZpbmRlci5qc1wiO1xyXG5cclxuY29uc3QgZGVmYXVsdEJlZm9yZSA9IFtcclxuICBcImV4cG9ydHMuWlwiLFxyXG4gIFwiZXhwb3J0cy5aUFwiLFxyXG4gIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgXCJleHBvcnRzXCJcclxuXTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBfX2NhY2hlX186IHt9LFxyXG4gIGdldCByZXF1aXJlKCkge1xyXG4gICAgaWYgKHRoaXMuX19jYWNoZV9fLnJlcXVpcmUpIHJldHVybiB0aGlzLl9fY2FjaGVfXy5yZXF1aXJlO1xyXG4gICAgbGV0IHJlcUlkID0gYEFjb3JkV2VicGFja01vZHVsZXMke0RhdGUubm93KCl9YDtcclxuICAgIGNvbnN0IHJlcSA9IHdpbmRvdy53ZWJwYWNrQ2h1bmtkaXNjb3JkX2FwcC5wdXNoKFtbcmVxSWRdLCB7fSwgcmVxID0+IHJlcV0pO1xyXG4gICAgZGVsZXRlIHJlcS5tW3JlcUlkXTtcclxuICAgIGRlbGV0ZSByZXEuY1tyZXFJZF07XHJcbiAgICB3aW5kb3cud2VicGFja0NodW5rZGlzY29yZF9hcHAucG9wKCk7XHJcbiAgICB0aGlzLl9fY2FjaGVfXy5yZXF1aXJlID0gcmVxO1xyXG4gICAgcmV0dXJuIHJlcTtcclxuICB9LFxyXG4gIGZpbmQoZmlsdGVyLCBjb25maWcgPSB7fSkge1xyXG4gICAgcmV0dXJuIGNvbXBsZXhGaW5kZXIuZmluZCh0aGlzLnJlcXVpcmUsIGNvbXBsZXhGaW5kZXIud3JhcEZpbHRlcihmaWx0ZXIpLCBjb25maWcpO1xyXG4gIH0sXHJcbiAgbGF6eUZpbmQoZmlsdGVyLCBjb25maWcgPSB7fSkge1xyXG4gICAgcmV0dXJuIGNvbXBsZXhGaW5kZXIubGF6eUZpbmQoY29tcGxleEZpbmRlci53cmFwRmlsdGVyKGZpbHRlciksIGNvbmZpZyk7XHJcbiAgfSxcclxuICBsYXp5RmluZEJ5RmluZGVyKGZpbmRlcikge1xyXG4gICAgcmV0dXJuIGNvbXBsZXhGaW5kZXIubGF6eUZpbmRCeUZpbmRlcihmaW5kZXIpO1xyXG4gIH0sXHJcbiAgZmlsdGVyKGZpbHRlciwgY29uZmlnID0ge30pIHtcclxuICAgIHJldHVybiBjb21wbGV4RmluZGVyLmZpbmQodGhpcy5yZXF1aXJlLCBjb21wbGV4RmluZGVyLndyYXBGaWx0ZXIoZmlsdGVyKSwgeyAuLi5jb25maWcsIGFsbDogdHJ1ZSB9KTtcclxuICB9LFxyXG4gIGZpbmRCeUZpbmRlcihmaW5kZXIpIHtcclxuICAgIHJldHVybiBjb21wbGV4RmluZGVyLmZpbmRCeUZpbmRlcih0aGlzLnJlcXVpcmUsIGZpbmRlcik7XHJcbiAgfSxcclxuICBmaW5kQnlTdHJpbmdWYWx1ZXMoLi4uc3RyaW5nVmFsdWVzKSB7XHJcbiAgICByZXR1cm4gdGhpcy5maW5kKChhKSA9PiB7IGxldCB2YSA9IE9iamVjdC52YWx1ZXMoYSk7IHJldHVybiBzdHJpbmdWYWx1ZXMuZXZlcnkoeCA9PiB2YS5zb21lKHkgPT4gdHlwZW9mIHkgPT0gXCJzdHJpbmdcIiAmJiB5LmluY2x1ZGVzKHgpKSkgfSk/LmV4cG9ydHM7XHJcbiAgfSxcclxuICBmaW5kQnlQcm9wZXJ0aWVzKC4uLnByb3BzKSB7XHJcbiAgICByZXR1cm4gdGhpcy5maW5kQnlGaW5kZXIoe1xyXG4gICAgICBmaWx0ZXI6IHtcclxuICAgICAgICBleHBvcnQ6IGZhbHNlLFxyXG4gICAgICAgIGluOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBieTogW3Byb3BzXVxyXG4gICAgICB9LFxyXG4gICAgICBwYXRoOiB7XHJcbiAgICAgICAgYmVmb3JlOiBkZWZhdWx0QmVmb3JlXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgZmluZEJ5UHJvdG90eXBlcyguLi5wcm9wcykge1xyXG4gICAgcmV0dXJuIHRoaXMuZmluZEJ5RmluZGVyKHtcclxuICAgICAgZmlsdGVyOiB7XHJcbiAgICAgICAgZXhwb3J0OiBmYWxzZSxcclxuICAgICAgICBpbjogXCJwcm90b3R5cGVzXCIsXHJcbiAgICAgICAgYnk6IFtwcm9wc11cclxuICAgICAgfSxcclxuICAgICAgcGF0aDoge1xyXG4gICAgICAgIGJlZm9yZTogZGVmYXVsdEJlZm9yZVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9LFxyXG4gIGZpbmRCeVN0cmluZ3MoLi4ucHJvcHMpIHtcclxuICAgIHJldHVybiB0aGlzLmZpbmRCeUZpbmRlcih7XHJcbiAgICAgIGZpbHRlcjoge1xyXG4gICAgICAgIGV4cG9ydDogZmFsc2UsXHJcbiAgICAgICAgaW46IFwic3RyaW5nc1wiLFxyXG4gICAgICAgIGJ5OiBbcHJvcHNdXHJcbiAgICAgIH0sXHJcbiAgICAgIHBhdGg6IHtcclxuICAgICAgICBiZWZvcmU6IGRlZmF1bHRCZWZvcmVcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSxcclxufTsiLCAiaW1wb3J0IGNvbW1vbkRhdGEgZnJvbSAnLi4vLi4vZGF0YS9jb21tb24uanNvbic7XHJcbmltcG9ydCB3ZWJwYWNrIGZyb20gJy4vd2VicGFjay5qcyc7XHJcblxyXG5cclxuZnVuY3Rpb24gbWFwT2JqZWN0KHRlbXAsIGlucCkge1xyXG4gIGlmICghdGVtcD8uX19jYWNoZV9fKSB0ZW1wLl9fY2FjaGVfXyA9IHt9O1xyXG4gIGZvciAoY29uc3Qga2V5IGluIGlucCkge1xyXG4gICAgaWYgKGlucD8uW2tleV0/Ll9fID09PSB0cnVlKSB7XHJcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0ZW1wLCBrZXksIHtcclxuICAgICAgICBnZXQoKSB7XHJcbiAgICAgICAgICBpZiAodGVtcC5fX2NhY2hlX19ba2V5XSkgcmV0dXJuIHRlbXAuX19jYWNoZV9fW2tleV07XHJcbiAgICAgICAgICByZXR1cm4gdGVtcC5fX2NhY2hlX19ba2V5XSA9IHdlYnBhY2suZmluZEJ5RmluZGVyKGlucFtrZXldKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAodHlwZW9mIHRlbXBba2V5XSA9PT0gXCJ1bmRlZmluZWRcIikgdGVtcFtrZXldID0ge307XHJcbiAgICAgIG1hcE9iamVjdCh0ZW1wW2tleV0sIGlucFtrZXldKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcblxyXG5sZXQgY29tbW9uID0ge1xyXG4gIF9fY2FjaGVfXzoge30sXHJcbiAgTGF5ZXJBY3Rpb25zOiB7XHJcbiAgICBwdXNoKGNvbXBvbmVudCkge1xyXG4gICAgICBjb21tb24uRmx1eERpc3BhdGNoZXIuZGlzcGF0Y2goe1xyXG4gICAgICAgIHR5cGU6IFwiTEFZRVJfUFVTSFwiLFxyXG4gICAgICAgIGNvbXBvbmVudFxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBwb3AoKSB7XHJcbiAgICAgIGNvbW1vbi5GbHV4RGlzcGF0Y2hlci5kaXNwYXRjaCh7XHJcbiAgICAgICAgdHlwZTogXCJMQVlFUl9QT1BcIlxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBwb3BBbGwoKSB7XHJcbiAgICAgIGNvbW1vbi5GbHV4RGlzcGF0Y2hlci5kaXNwYXRjaCh7XHJcbiAgICAgICAgdHlwZTogXCJMQVlFUl9QT1BfQUxMXCJcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSxcclxufTtcclxubWFwT2JqZWN0KGNvbW1vbiwgY29tbW9uRGF0YS5jb21tb24pO1xyXG57XHJcbiAgbGV0IHBhdGhzID0gW1xyXG4gICAgXCJleHBvcnRzLlpcIixcclxuICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgIFwiZXhwb3J0c1wiXHJcbiAgXTtcclxuICB3ZWJwYWNrLmZpbHRlcigoaSkgPT4gaT8uZ2V0TmFtZT8uKCk/LmVuZHNXaXRoPy4oXCJTdG9yZVwiKSwgeyBkZWZhdWx0RXhwb3J0OiBmYWxzZSB9KS5mb3JFYWNoKChtKSA9PiB7XHJcbiAgICBsZXQgb2JqID0gcGF0aHMubWFwKHBhdGggPT4gXy5nZXQobSwgcGF0aCkpLmZpbmQoaSA9PiBpKTtcclxuICAgIGlmICghb2JqKSByZXR1cm47XHJcbiAgICBsZXQgbmFtZSA9IG9iaj8uZ2V0TmFtZT8uKCk7XHJcbiAgICBpZiAoIW5hbWUpIHJldHVybjtcclxuICAgIGlmIChjb21tb25bbmFtZV0pIHJldHVybjtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29tbW9uLCBuYW1lLCB7XHJcbiAgICAgIGdldCgpIHtcclxuICAgICAgICBpZiAoY29tbW9uLl9fY2FjaGVfX1tuYW1lXSkgcmV0dXJuIGNvbW1vbi5fX2NhY2hlX19bbmFtZV07XHJcbiAgICAgICAgcmV0dXJuIGNvbW1vbi5fX2NhY2hlX19bbmFtZV0gPSBvYmo7XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfSlcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29tbW9uOyIsICJpbXBvcnQgY29tbW9uIGZyb20gXCIuL2NvbW1vbi5qc1wiO1xyXG5pbXBvcnQgd2VicGFjayBmcm9tIFwiLi93ZWJwYWNrLmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgY29tbW9uLFxyXG4gIHdlYnBhY2ssXHJcbiAgcmVxdWlyZTogZ2xvYmFsVGhpc1tcIjxQUkVMT0FEX0tFWT5cIl0ucmVxdWlyZSxcclxuICBuYXRpdmU6IERpc2NvcmROYXRpdmUsXHJcbn0iLCAiaW1wb3J0IG1vZHVsZXMgZnJvbSBcIi4uL21vZHVsZXMvaW5kZXguanNcIlxyXG5pbXBvcnQgdXRpbHMgZnJvbSBcIi4uL3V0aWxzL2luZGV4LmpzXCI7XHJcblxyXG5jb25zdCBCQVNFX1VSTCA9IFwiaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2Fjb3JkLXN0YW5kYWxvbmUvYXNzZXRzL21haW4vaTE4blwiO1xyXG5jb25zdCBub1N0b3JlID0geyBjYWNoZTogXCJuby1zdG9yZVwiIH07XHJcblxyXG5cclxuY29uc3Qgb3V0ID0ge1xyXG4gIF9fY2FjaGVfXzoge1xyXG4gICAgbG9jYWxlSWRzOiBbXSxcclxuICAgIGxvY2FsaXphdGlvbnM6IHt9XHJcbiAgfSxcclxuICBnZXQgbG9jYWxlKCkge1xyXG4gICAgcmV0dXJuIG1vZHVsZXMuY29tbW9uLmkxOG4uX3JlcXVlc3RlZExvY2FsZTtcclxuICB9LFxyXG4gIGdldChrZXkpIHtcclxuICAgIGNoZWNrKCk7XHJcbiAgICByZXR1cm4gb3V0Ll9fY2FjaGVfXy5sb2NhbGl6YXRpb25zW291dC5sb2NhbGVdPy5ba2V5XVxyXG4gICAgICB8fCBvdXQuX19jYWNoZV9fLmxvY2FsaXphdGlvbnMuZGVmYXVsdD8uW2tleV1cclxuICAgICAgfHwgbW9kdWxlcy5jb21tb24uaTE4bi5NZXNzYWdlc1trZXldXHJcbiAgICAgIHx8IGtleTtcclxuICB9LFxyXG4gIG1lc3NhZ2VzOiBuZXcgUHJveHkoe30sIHtcclxuICAgIGdldChfLCBwcm9wKSB7XHJcbiAgICAgIHJldHVybiBvdXQuZ2V0KHByb3ApO1xyXG4gICAgfVxyXG4gIH0pLFxyXG4gIGxvY2FsaXplKHN0ciwgLi4uYXJncykge1xyXG4gICAgaWYgKHR5cGVvZiBzdHIgPT09IFwic3RyaW5nXCIpIHJldHVybiB1dGlscy5mb3JtYXQoc3RyLCAuLi5hcmdzKTtcclxuICAgIGxldCB2YWwgPSBzdHI/LltvdXQubG9jYWxlXVxyXG4gICAgICB8fCBzdHI/LmRlZmF1bHRcclxuICAgICAgfHwgT2JqZWN0LnZhbHVlcyhzdHIpWzBdO1xyXG4gICAgaWYgKCF2YWwpIHJldHVybiBudWxsO1xyXG4gICAgcmV0dXJuIHV0aWxzLmZvcm1hdCh2YWwsIC4uLmFyZ3MpO1xyXG4gIH0sXHJcbiAgZm9ybWF0KGtleSwgLi4uYXJncykge1xyXG4gICAgcmV0dXJuIHV0aWxzLmZvcm1hdChvdXQuZ2V0KGtleSksIC4uLmFyZ3MpO1xyXG4gIH1cclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gY2hlY2soKSB7XHJcbiAgY29uc3QgbG9jYWxlID0gb3V0LmxvY2FsZTtcclxuICBpZiAoIW91dC5fX2NhY2hlX18ubG9jYWxlSWRzLmxlbmd0aCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgb3V0Ll9fY2FjaGVfXy5sb2NhbGVJZHMgPSBhd2FpdCAoYXdhaXQgZmV0Y2goYCR7QkFTRV9VUkx9L2xvY2FsZXMuanNvbmAsIG5vU3RvcmUpKS5qc29uKCk7XHJcbiAgICB9IGNhdGNoIHsgfVxyXG4gICAgdHJ5IHtcclxuICAgICAgb3V0Ll9fY2FjaGVfXy5sb2NhbGl6YXRpb25zLmRlZmF1bHQgPSBhd2FpdCAoYXdhaXQgZmV0Y2goYCR7QkFTRV9VUkx9L2RlZmF1bHQuanNvbmAsIG5vU3RvcmUpKS5qc29uKCk7XHJcbiAgICB9IGNhdGNoIHsgfVxyXG4gIH1cclxuICBpZiAoXHJcbiAgICBvdXQuX19jYWNoZV9fLmxvY2FsZUlkcy5pbmNsdWRlcyhsb2NhbGUpXHJcbiAgICAmJiAhb3V0Ll9fY2FjaGVfXy5sb2NhbGl6YXRpb25zPy5bbG9jYWxlXVxyXG4gICkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgb3V0Ll9fY2FjaGVfXy5sb2NhbGl6YXRpb25zW2xvY2FsZV0gPSBhd2FpdCAoYXdhaXQgZmV0Y2goYCR7QkFTRV9VUkx9LyR7bG9jYWxlfS5qc29uYCwgbm9TdG9yZSkpLmpzb24oKTtcclxuICAgIH0gY2F0Y2ggeyB9O1xyXG4gIH1cclxufVxyXG5cclxuY2hlY2soKTtcclxuZXhwb3J0IGRlZmF1bHQgb3V0OyIsICJpbXBvcnQgbW9kdWxlcyBmcm9tIFwiLi4vYXBpL21vZHVsZXMvaW5kZXguanNcIjtcclxuaW1wb3J0IGkxOG4gZnJvbSBcIi4uL2FwaS9pMThuL2luZGV4LmpzXCI7XHJcblxyXG5sZXQgaXNDb25uZWN0aW9uT3BlbiA9IGZhbHNlO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHdhaXRVbnRpbENvbm5lY3Rpb25PcGVuKCkge1xyXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG4gICAgaWYgKGlzQ29ubmVjdGlvbk9wZW4pIHJldHVybiByZXNvbHZlKHRydWUpO1xyXG4gICAgZnVuY3Rpb24gb25FdmVudCgpIHtcclxuICAgICAgbW9kdWxlcy5jb21tb24uRmx1eERpc3BhdGNoZXIudW5zdWJzY3JpYmUoXCJDT05ORUNUSU9OX09QRU5cIiwgb25FdmVudCk7XHJcbiAgICAgIGlzQ29ubmVjdGlvbk9wZW4gPSB0cnVlO1xyXG4gICAgICByZXNvbHZlKHRydWUpO1xyXG4gICAgfVxyXG4gICAgbW9kdWxlcy5jb21tb24uRmx1eERpc3BhdGNoZXIuc3Vic2NyaWJlKFwiQ09OTkVDVElPTl9PUEVOXCIsIG9uRXZlbnQpO1xyXG4gIH0pO1xyXG59XHJcbiIsICJpbXBvcnQgbG9nZ2VyIGZyb20gXCIuLi9hcGkvdXRpbHMvbG9nZ2VyLmpzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQmFzaWNFdmVudEVtaXR0ZXIge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgLyoqIEB0eXBlIHtNYXA8c3RyaW5nLCBNYXA8KC4uLmFyZ3M6IGFueVtdKT0+dm9pZCwge29uY2U6IGJvb2xlYW59Pj59ICovXHJcbiAgICB0aGlzLmxpc3RlbmVycyA9IG5ldyBNYXAoKTtcclxuICB9XHJcblxyXG4gIF9wcmVwYXJlTGlzdGVuZXJzTWFwKGV2ZW50TmFtZSkge1xyXG4gICAgaWYgKCF0aGlzLmxpc3RlbmVycy5oYXMoZXZlbnROYW1lKSlcclxuICAgICAgdGhpcy5saXN0ZW5lcnMuc2V0KGV2ZW50TmFtZSwgbmV3IE1hcCgpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudE5hbWVcclxuICAgKiBAcGFyYW0geyguLi5hcmdzOiBhbnlbXSk9PnZvaWR9IGxpc3RlbmVyXHJcbiAgICovXHJcbiAgb24oZXZlbnROYW1lLCBsaXN0ZW5lcikge1xyXG4gICAgdGhpcy5fcHJlcGFyZUxpc3RlbmVyc01hcChldmVudE5hbWUpO1xyXG4gICAgdGhpcy5saXN0ZW5lcnMuZ2V0KGV2ZW50TmFtZSkuc2V0KGxpc3RlbmVyLCB7IG9uY2U6IGZhbHNlIH0pO1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgdGhpcy5saXN0ZW5lcnMuZ2V0KGV2ZW50TmFtZSkuZGVsZXRlKGxpc3RlbmVyKTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnROYW1lXHJcbiAgICogQHBhcmFtIHsoLi4uYXJnczogYW55W10pPT52b2lkfSBsaXN0ZW5lclxyXG4gICAqL1xyXG4gIG9uY2UoZXZlbnROYW1lLCBsaXN0ZW5lcikge1xyXG4gICAgdGhpcy5fcHJlcGFyZUxpc3RlbmVyc01hcChldmVudE5hbWUpO1xyXG4gICAgdGhpcy5saXN0ZW5lcnMuZ2V0KGV2ZW50TmFtZSk/LnNldChsaXN0ZW5lciwgeyBvbmNlOiB0cnVlIH0pO1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgdGhpcy5saXN0ZW5lcnMuZ2V0KGV2ZW50TmFtZSkuZGVsZXRlKGxpc3RlbmVyKTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge3N0cmluZz99IGV2ZW50TmFtZVxyXG4gICAqIEBwYXJhbSB7KCguLi5hcmdzOiBhbnlbXSk9PnZvaWQpP30gbGlzdGVuZXJcclxuICAgKi9cclxuICBvZmYoZXZlbnROYW1lLCBsaXN0ZW5lcikge1xyXG4gICAgaWYgKCFldmVudE5hbWUpIHJldHVybiAodGhpcy5saXN0ZW5lcnMgPSBuZXcgTWFwKCkpO1xyXG4gICAgaWYgKCFsaXN0ZW5lcikgcmV0dXJuIHRoaXMubGlzdGVuZXJzPy5kZWxldGUoZXZlbnROYW1lKTtcclxuICAgIHRoaXMubGlzdGVuZXJzLmdldChldmVudE5hbWUpPy5kZWxldGUobGlzdGVuZXIpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50TmFtZVxyXG4gICAqIEBwYXJhbSAgey4uLmFueX0gYXJnc1xyXG4gICAqL1xyXG4gIGVtaXQoZXZlbnROYW1lLCAuLi5hcmdzKSB7XHJcbiAgICBpZiAoIXRoaXMubGlzdGVuZXJzLmhhcyhldmVudE5hbWUpKSByZXR1cm47XHJcbiAgICBsZXQgZXZlbnRNYXAgPSB0aGlzLmxpc3RlbmVycy5nZXQoZXZlbnROYW1lKTtcclxuICAgIGV2ZW50TWFwLmZvckVhY2goKHsgb25jZSB9LCBsaXN0ZW5lcikgPT4ge1xyXG4gICAgICBpZiAob25jZSkgZXZlbnRNYXA/LmRlbGV0ZShsaXN0ZW5lcik7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgbGlzdGVuZXIoLi4uYXJncyk7XHJcbiAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICBsb2dnZXIuZXJyb3IoYEVycm9yIHdoaWxlIGVtaXR0aW5nICR7ZXZlbnROYW1lfSBldmVudC5gLCBlKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59O1xyXG4iLCAiaW1wb3J0IHsgQmFzaWNFdmVudEVtaXR0ZXIgfSBmcm9tIFwiLi4vLi4vbGliL0Jhc2ljRXZlbnRFbWl0dGVyLmpzXCI7XHJcblxyXG5jb25zdCBldmVudHMgPSBuZXcgQmFzaWNFdmVudEVtaXR0ZXIoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGV2ZW50czsiLCAiaW1wb3J0IGV2ZW50cyBmcm9tIFwiLi4vZXZlbnRzXCI7XHJcbmltcG9ydCB3ZWJwYWNrIGZyb20gXCIuLi9tb2R1bGVzL3dlYnBhY2suanNcIjtcclxuXHJcbmNvbnN0IHNjcm9sbGJhckNsYXNzZXMgPSB3ZWJwYWNrLmZpbmRCeVByb3BlcnRpZXMoXCJzY3JvbGxiYXJHaG9zdEhhaXJsaW5lXCIsIFwic3Bpbm5lclwiKTtcclxuXHJcbmNvbnN0IGZvcm1hdFJlZ2V4ZXMgPSB7XHJcbiAgYm9sZDogL1xcKlxcKihbXipdKylcXCpcXCovZyxcclxuICBpdGFsaWM6IC9cXCooW14qXSspXFwqL2csXHJcbiAgdW5kZXJsaW5lOiAvXFxfKFteKl0rKVxcXy9nLFxyXG4gIHN0cmlrZTogL1xcflxcfihbXipdKylcXH5cXH4vZyxcclxuICB1cmw6IC8oXFxiKGh0dHBzP3xmdHB8ZmlsZSk6XFwvXFwvWy1BLVowLTkrJkAjXFwvJT89fl98ITosLjtdKlstQS1aMC05KyZAI1xcLyU9fl98XSkvaWcsXHJcbiAgaW5saW5lOiAvXFxgKFteKl0rKVxcYC9nLFxyXG4gIGNvZGVibG9ja1NpbmdsZTogL1xcYFxcYFxcYChbXipdKylcXGBcXGBcXGAvZyxcclxuICBjb2RlYmxvY2tNdWx0aTogL1xcYFxcYFxcYChcXHcrKVxcbigoPzooPyFcXGBcXGBcXGApW1xcc1xcU10pKilcXGBcXGBcXGAvZ1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIHBhcnNlKGh0bWwpIHtcclxuICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgZGl2LmlubmVySFRNTCA9IGh0bWw7XHJcbiAgICByZXR1cm4gZGl2LmZpcnN0RWxlbWVudENoaWxkO1xyXG4gIH0sXHJcbiAgdG9DU1NQcm9wKG8pIHtcclxuICAgIGxldCBlbG0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgT2JqZWN0LmVudHJpZXMobykuZm9yRWFjaCgoaSkgPT4ge1xyXG4gICAgICBpZiAoZWxtLnN0eWxlLmhhc093blByb3BlcnR5KGlbMF0pKSB7XHJcbiAgICAgICAgZWxtLnN0eWxlW2lbMF1dID0gaVsxXTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBlbG0uc3R5bGUuc2V0UHJvcGVydHkoaVswXSwgaVsxXSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGVsbS5nZXRBdHRyaWJ1dGUoXCJzdHlsZVwiKTtcclxuICB9LFxyXG4gIHRvSFRNTFByb3BzKG8pIHtcclxuICAgIHJldHVybiBPYmplY3QuZW50cmllcyhvKVxyXG4gICAgICAubWFwKFxyXG4gICAgICAgIChpKSA9PlxyXG4gICAgICAgICAgYCR7aVswXS5yZXBsYWNlKC8gKy8sIFwiLVwiKX09XCIke2lbMF0gPT0gXCJzdHlsZVwiICYmIHR5cGVvZiBpWzFdICE9IFwic3RyaW5nXCJcclxuICAgICAgICAgICAgPyB0aGlzLnRvQ1NTUHJvcChpWzFdKVxyXG4gICAgICAgICAgICA6IHRoaXMuZXNjYXBlSFRNTChpWzFdKX1cImBcclxuICAgICAgKVxyXG4gICAgICAuam9pbihcIiBcIik7XHJcbiAgfSxcclxuICBlc2NhcGUoaHRtbCkge1xyXG4gICAgcmV0dXJuIG5ldyBPcHRpb24oaHRtbCkuaW5uZXJIVE1MO1xyXG4gIH0sXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtFbGVtZW50fSBlbG0gXHJcbiAgICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBzZWxlY3Rvck9yTnVtYmVyIFxyXG4gICAqIEByZXR1cm5zIHtFbGVtZW50W119XHJcbiAgICovXHJcbiAgcGFyZW50cyhlbG0sIHNlbGVjdG9yT3JOdW1iZXIpIHtcclxuICAgIGxldCBwYXJlbnRzID0gW107XHJcbiAgICBpZiAodHlwZW9mIHNlbGVjdG9yT3JOdW1iZXIgPT09IFwibnVtYmVyXCIpIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWxlY3Rvck9yTnVtYmVyOyBpKyspIHtcclxuICAgICAgICBpZiAoZWxtLnBhcmVudEVsZW1lbnQpIHtcclxuICAgICAgICAgIGVsbSA9IGVsbS5wYXJlbnRFbGVtZW50O1xyXG4gICAgICAgICAgcGFyZW50cy5wdXNoKGVsbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB3aGlsZSAoZWxtLnBhcmVudEVsZW1lbnQgJiYgZWxtLnBhcmVudEVsZW1lbnQuY2xvc2VzdChzZWxlY3Rvck9yTnVtYmVyKSkge1xyXG4gICAgICAgIGVsbSA9IGVsbS5wYXJlbnRFbGVtZW50LmNsb3Nlc3Qoc2VsZWN0b3JPck51bWJlcik7XHJcbiAgICAgICAgcGFyZW50cy5wdXNoKGVsbSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBwYXJlbnRzO1xyXG4gIH0sXHJcbiAgLyoqXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yIFxyXG4gICAqIEBwYXJhbSB7KGVsZW1lbnQ6IEhUTUxEaXZFbGVtZW50KT0+KCgpPT52b2lkKX0gY2IgXHJcbiAgICogQHJldHVybnMgeygpPT52b2lkfVxyXG4gICAqL1xyXG4gIHBhdGNoOiAoc2VsZWN0b3IsIGNiKSA9PlxyXG4gICAgKCgpID0+IHtcclxuICAgICAgZnVuY3Rpb24gbm9kZUFkZGVkKG5vZGUpIHtcclxuICAgICAgICBpZiAodHlwZW9mIG5vZGU/LnF1ZXJ5U2VsZWN0b3JBbGwgIT0gXCJmdW5jdGlvblwiKSByZXR1cm47XHJcbiAgICAgICAgbm9kZS5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKS5mb3JFYWNoKGFzeW5jIChlbG0pID0+IHtcclxuICAgICAgICAgIGlmICghZWxtLmFjb3JkKSB7XHJcbiAgICAgICAgICAgIGVsbS5hY29yZCA9IHsgdW5tb3VudDogW10sIHBhdGNoZWQ6IG5ldyBTZXQoKSB9O1xyXG4gICAgICAgICAgICBlbG0uY2xhc3NMaXN0LmFkZChcImFjb3JkLS1wYXRjaGVkXCIpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChlbG0uYWNvcmQucGF0Y2hlZC5oYXMoY2IpKSByZXR1cm47XHJcbiAgICAgICAgICBlbG0uYWNvcmQucGF0Y2hlZC5hZGQoY2IpO1xyXG5cclxuICAgICAgICAgIGxldCB1blBhdGNoQ2IgPSBhd2FpdCBjYihlbG0pO1xyXG4gICAgICAgICAgaWYgKHR5cGVvZiB1blBhdGNoQ2IgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICAgICAgZWxtLmFjb3JkLnVubW91bnQucHVzaCh1blBhdGNoQ2IpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBmdW5jdGlvbiBub2RlUmVtb3ZlZChub2RlKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBub2RlPy5xdWVyeVNlbGVjdG9yQWxsICE9IFwiZnVuY3Rpb25cIikgcmV0dXJuO1xyXG4gICAgICAgIG5vZGUucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikuZm9yRWFjaChhc3luYyAoZWxtKSA9PiB7XHJcbiAgICAgICAgICBpZiAoIWVsbS5hY29yZCkgcmV0dXJuO1xyXG4gICAgICAgICAgZWxtLmFjb3JkLnVubW91bnQuZm9yRWFjaCgoZikgPT4gZigpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikuZm9yRWFjaChub2RlQWRkZWQpO1xyXG5cclxuICAgICAgcmV0dXJuIGV2ZW50cy5vbihcclxuICAgICAgICBcIkRvbU11dGF0aW9uXCIsXHJcbiAgICAgICAgLyoqIEBwYXJhbSB7TXV0YXRpb25SZWNvcmR9IG11dCAqLyhtdXQpID0+IHtcclxuICAgICAgICAgIGlmIChtdXQudHlwZSA9PT0gXCJjaGlsZExpc3RcIikge1xyXG4gICAgICAgICAgICBtdXQuYWRkZWROb2Rlcy5mb3JFYWNoKG5vZGVBZGRlZCk7XHJcbiAgICAgICAgICAgIG11dC5yZW1vdmVkTm9kZXMuZm9yRWFjaChub2RlUmVtb3ZlZCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICApO1xyXG4gICAgfSkoKSxcclxuICBmb3JtYXRDb250ZW50KG1zZykge1xyXG4gICAgaWYgKCFtc2cpIHJldHVybiAnJztcclxuICAgIGNvbnN0IHsgYm9sZCwgaXRhbGljLCB1bmRlcmxpbmUsIHN0cmlrZSwgY29kZWJsb2NrTXVsdGksIGNvZGVibG9ja1NpbmdsZSwgaW5saW5lLCB1cmwgfSA9IGZvcm1hdFJlZ2V4ZXM7XHJcblxyXG4gICAgY29uc3QgY29kZUJsb2Nrc01hcCA9IE9iamVjdC5mcm9tRW50cmllcyhbXHJcbiAgICAgIC4uLihtc2cubWF0Y2hBbGwoY29kZWJsb2NrTXVsdGkpIHx8IFtdKSwgLi4uKG1zZy5tYXRjaEFsbChjb2RlYmxvY2tTaW5nbGUpIHx8IFtdKVxyXG4gICAgXS5tYXAoXHJcbiAgICAgIChbXywgY29kZUJsb2NrT3JDb2RlLCBjb2RlQmxvY2tDb250ZW50XSwgaSkgPT4ge1xyXG4gICAgICAgIG1zZyA9IG1zZy5yZXBsYWNlKF8sIGB7e0NPREVCTE9DS18ke2l9fX1gKTtcclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgYHt7Q09ERUJMT0NLXyR7aX19fWAsXHJcbiAgICAgICAgICBjb2RlQmxvY2tDb250ZW50ID9cclxuICAgICAgICAgICAgYDxwcmU+PGNvZGUgY2xhc3M9XCIke3Njcm9sbGJhckNsYXNzZXMuc2Nyb2xsYmFyR2hvc3RIYWlybGluZX0gaGxqcyAke2NvZGVCbG9ja09yQ29kZX1cIiBzdHlsZT1cInBvc2l0aW9uOiByZWxhdGl2ZTtcIj4ke21vZHVsZXMuY29tbW9uLmhsanMuaGlnaGxpZ2h0KGNvZGVCbG9ja09yQ29kZSwgY29kZUJsb2NrQ29udGVudCkudmFsdWV9PC9jb2RlPjwvcHJlPmAgOlxyXG4gICAgICAgICAgICBgPHByZT48Y29kZSBjbGFzcz1cIiR7c2Nyb2xsYmFyQ2xhc3Nlcy5zY3JvbGxiYXJHaG9zdEhhaXJsaW5lfSBobGpzXCIgc3R5bGU9XCJwb3NpdGlvbjogcmVsYXRpdmU7XCI+JHtjb2RlQmxvY2tPckNvZGV9PC9jb2RlPjwvcHJlPmBcclxuICAgICAgICBdO1xyXG4gICAgICB9XHJcbiAgICApKTtcclxuXHJcbiAgICBjb25zdCBpbmxpbmVNYXAgPSBPYmplY3QuZnJvbUVudHJpZXMoXHJcbiAgICAgIFsuLi4obXNnLm1hdGNoQWxsKGlubGluZSkgfHwgW10pXS5tYXAoXHJcbiAgICAgICAgKFtfLCBpbmxpbmVDb250ZW50XSwgaSkgPT4ge1xyXG4gICAgICAgICAgbXNnID0gbXNnLnJlcGxhY2UoXywgYHt7SU5MSU5FXyR7aX19fWApO1xyXG4gICAgICAgICAgcmV0dXJuIFtge3tJTkxJTkVfJHtpfX19YCwgYDxjb2RlIGNsYXNzPVwiaW5saW5lXCI+JHtpbmxpbmVDb250ZW50fTwvY29kZT5gXTtcclxuICAgICAgICB9XHJcbiAgICAgIClcclxuICAgICk7XHJcblxyXG4gICAgbXNnID0gbXNnLnJlcGxhY2UoYm9sZCwgXCI8Yj4kMTwvYj5cIilcclxuICAgICAgLnJlcGxhY2UoaXRhbGljLCBcIjxpPiQxPC9pPlwiKVxyXG4gICAgICAucmVwbGFjZSh1bmRlcmxpbmUsIFwiPFU+JDE8L1U+XCIpXHJcbiAgICAgIC5yZXBsYWNlKHN0cmlrZSwgXCI8cz4kMTwvcz5cIilcclxuICAgICAgLnJlcGxhY2UodXJsLCAnPGEgaHJlZj1cIiQxXCI+JDE8L2E+Jyk7XHJcblxyXG4gICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMoY29kZUJsb2Nrc01hcCkpIHtcclxuICAgICAgbXNnID0gbXNnLnJlcGxhY2Uoa2V5LCB2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMoaW5saW5lTWFwKSkge1xyXG4gICAgICBtc2cgPSBtc2cucmVwbGFjZShrZXksIHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbXNnO1xyXG4gIH0sXHJcbiAgcmVzb2x2ZShodG1sT3JFbG0pIHtcclxuICAgIGlmIChodG1sT3JFbG0gaW5zdGFuY2VvZiBFbGVtZW50KSByZXR1cm4gaHRtbE9yRWxtO1xyXG4gICAgcmV0dXJuIHRoaXMucGFyc2UoaHRtbE9yRWxtKTtcclxuICB9XHJcbn1cclxuXHJcbntcclxuICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKChtdXRhdGlvbnMpID0+IHtcclxuICAgIG11dGF0aW9ucy5mb3JFYWNoKChtdXRhdGlvbikgPT4ge1xyXG4gICAgICBldmVudHMuZW1pdChcIkRvbU11dGF0aW9uXCIsIG11dGF0aW9uKTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG4gIG9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQsIHtcclxuICAgIGF0dHJpYnV0ZXM6IHRydWUsXHJcbiAgICBjaGlsZExpc3Q6IHRydWUsXHJcbiAgICBzdWJ0cmVlOiB0cnVlXHJcbiAgfSk7XHJcbn0iLCAiLy8gd2UgdXNlIHRoaXMgYXJyYXkgbXVsdGlwbGUgdGltZXNcclxuZXhwb3J0IGNvbnN0IHBhdGNoVHlwZXMgPSBbXCJhXCIsIFwiYlwiLCBcImlcIl07XHJcbmV4cG9ydCBjb25zdCBwYXRjaGVkT2JqZWN0cyA9IG5ldyBNYXAoKTtcclxuIiwgIi8vIGNhbGxzIHJlbGV2YW50IHBhdGNoZXMgYW5kIHJldHVybnMgdGhlIGZpbmFsIHJlc3VsdFxyXG5pbXBvcnQgeyBwYXRjaGVkT2JqZWN0cyB9IGZyb20gXCIuL3NoYXJlZC5qc1wiO1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoZnVuY05hbWUsIGZ1bmNQYXJlbnQsIGZ1bmNBcmdzLCBcclxuLy8gdGhlIHZhbHVlIG9mIGB0aGlzYCB0byBhcHBseVxyXG5jdHh0LCBcclxuLy8gaWYgdHJ1ZSwgdGhlIGZ1bmN0aW9uIGlzIGFjdHVhbGx5IGNvbnN0cnVjdG9yXHJcbmlzQ29uc3RydWN0KSB7XHJcbiAgICBjb25zdCBwYXRjaCA9IHBhdGNoZWRPYmplY3RzLmdldChmdW5jUGFyZW50KT8uW2Z1bmNOYW1lXTtcclxuICAgIC8vIFRoaXMgaXMgaW4gdGhlIGV2ZW50IHRoYXQgdGhpcyBmdW5jdGlvbiBpcyBiZWluZyBjYWxsZWQgYWZ0ZXIgYWxsIHBhdGNoZXMgYXJlIHJlbW92ZWQuXHJcbiAgICBpZiAoIXBhdGNoKVxyXG4gICAgICAgIHJldHVybiBpc0NvbnN0cnVjdFxyXG4gICAgICAgICAgICA/IFJlZmxlY3QuY29uc3RydWN0KGZ1bmNQYXJlbnRbZnVuY05hbWVdLCBmdW5jQXJncywgY3R4dClcclxuICAgICAgICAgICAgOiBmdW5jUGFyZW50W2Z1bmNOYW1lXS5hcHBseShjdHh0LCBmdW5jQXJncyk7XHJcbiAgICAvLyBCZWZvcmUgcGF0Y2hlc1xyXG4gICAgZm9yIChjb25zdCBob29rIG9mIHBhdGNoLmIudmFsdWVzKCkpIHtcclxuICAgICAgICBjb25zdCBtYXliZWZ1bmNBcmdzID0gaG9vay5jYWxsKGN0eHQsIGZ1bmNBcmdzKTtcclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShtYXliZWZ1bmNBcmdzKSlcclxuICAgICAgICAgICAgZnVuY0FyZ3MgPSBtYXliZWZ1bmNBcmdzO1xyXG4gICAgfVxyXG4gICAgLy8gSW5zdGVhZCBwYXRjaGVzXHJcbiAgICBsZXQgaW5zdGVhZFBhdGNoZWRGdW5jID0gKC4uLmFyZ3MpID0+IGlzQ29uc3RydWN0XHJcbiAgICAgICAgPyBSZWZsZWN0LmNvbnN0cnVjdChwYXRjaC5vLCBhcmdzLCBjdHh0KVxyXG4gICAgICAgIDogcGF0Y2guby5hcHBseShjdHh0LCBhcmdzKTtcclxuICAgIGZvciAoY29uc3QgY2FsbGJhY2sgb2YgcGF0Y2guaS52YWx1ZXMoKSkge1xyXG4gICAgICAgIGNvbnN0IG9sZFBhdGNoRnVuYyA9IGluc3RlYWRQYXRjaGVkRnVuYztcclxuICAgICAgICBpbnN0ZWFkUGF0Y2hlZEZ1bmMgPSAoLi4uYXJncykgPT4gY2FsbGJhY2suY2FsbChjdHh0LCBhcmdzLCBvbGRQYXRjaEZ1bmMpO1xyXG4gICAgfVxyXG4gICAgbGV0IHdvcmtpbmdSZXRWYWwgPSBpbnN0ZWFkUGF0Y2hlZEZ1bmMoLi4uZnVuY0FyZ3MpO1xyXG4gICAgLy8gQWZ0ZXIgcGF0Y2hlc1xyXG4gICAgZm9yIChjb25zdCBob29rIG9mIHBhdGNoLmEudmFsdWVzKCkpXHJcbiAgICAgICAgd29ya2luZ1JldFZhbCA9IGhvb2suY2FsbChjdHh0LCBmdW5jQXJncywgd29ya2luZ1JldFZhbCkgPz8gd29ya2luZ1JldFZhbDtcclxuICAgIHJldHVybiB3b3JraW5nUmV0VmFsO1xyXG59XHJcbiIsICJpbXBvcnQgeyBwYXRjaGVkT2JqZWN0cywgcGF0Y2hUeXBlcyB9IGZyb20gXCIuL3NoYXJlZC5qc1wiO1xyXG5leHBvcnQgZnVuY3Rpb24gdW5QYXRjaChmdW5jUGFyZW50LCBmdW5jTmFtZSwgaG9va0lkLCB0eXBlKSB7XHJcbiAgICBjb25zdCBwYXRjaGVkT2JqZWN0ID0gcGF0Y2hlZE9iamVjdHMuZ2V0KGZ1bmNQYXJlbnQpO1xyXG4gICAgY29uc3QgcGF0Y2ggPSBwYXRjaGVkT2JqZWN0Py5bZnVuY05hbWVdO1xyXG4gICAgaWYgKCFwYXRjaD8uW3R5cGVdLmhhcyhob29rSWQpKVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIHBhdGNoW3R5cGVdLmRlbGV0ZShob29rSWQpO1xyXG4gICAgLy8gSWYgdGhlcmUgYXJlIG5vIG1vcmUgaG9va3MgZm9yIGV2ZXJ5IHR5cGUsIHJlbW92ZSB0aGUgcGF0Y2hcclxuICAgIGlmIChwYXRjaFR5cGVzLmV2ZXJ5KCh0KSA9PiBwYXRjaFt0XS5zaXplID09PSAwKSkge1xyXG4gICAgICAgIC8vIHJlZmxlY3QgZGVmaW5lcHJvcGVydHkgaXMgbGlrZSBvYmplY3QgZGVmaW5lcHJvcGVydHlcclxuICAgICAgICAvLyBidXQgaW5zdGVhZCBvZiBlcnJvcmluZyBpdCByZXR1cm5zIGlmIGl0IHdvcmtlZCBvciBub3QuXHJcbiAgICAgICAgLy8gdGhpcyBpcyBtb3JlIGVhc2lseSBtaW5pZmlhYmxlLCBoZW5jZSBpdHMgdXNlLiAtLSBzaW5rXHJcbiAgICAgICAgY29uc3Qgc3VjY2VzcyA9IFJlZmxlY3QuZGVmaW5lUHJvcGVydHkoZnVuY1BhcmVudCwgZnVuY05hbWUsIHtcclxuICAgICAgICAgICAgdmFsdWU6IHBhdGNoLm8sXHJcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKCFzdWNjZXNzKVxyXG4gICAgICAgICAgICBmdW5jUGFyZW50W2Z1bmNOYW1lXSA9IHBhdGNoLm87XHJcbiAgICAgICAgZGVsZXRlIHBhdGNoZWRPYmplY3RbZnVuY05hbWVdO1xyXG4gICAgfVxyXG4gICAgaWYgKE9iamVjdC5rZXlzKHBhdGNoZWRPYmplY3QpLmxlbmd0aCA9PSAwKVxyXG4gICAgICAgIHBhdGNoZWRPYmplY3RzLmRlbGV0ZShmdW5jUGFyZW50KTtcclxuICAgIHJldHVybiB0cnVlO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiB1blBhdGNoQWxsKCkge1xyXG4gICAgZm9yIChjb25zdCBbcGFyZW50T2JqZWN0LCBwYXRjaGVkT2JqZWN0XSBvZiBwYXRjaGVkT2JqZWN0cy5lbnRyaWVzKCkpXHJcbiAgICAgICAgZm9yIChjb25zdCBmdW5jTmFtZSBpbiBwYXRjaGVkT2JqZWN0KVxyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGhvb2tUeXBlIG9mIHBhdGNoVHlwZXMpXHJcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGhvb2tJZCBvZiBwYXRjaGVkT2JqZWN0W2Z1bmNOYW1lXT8uW2hvb2tUeXBlXS5rZXlzKCkgPz8gW10pXHJcbiAgICAgICAgICAgICAgICAgICAgdW5QYXRjaChwYXJlbnRPYmplY3QsIGZ1bmNOYW1lLCBob29rSWQsIGhvb2tUeXBlKTtcclxufVxyXG4iLCAiLy8gY3VycmllZCAtIGdldFBhdGNoRnVuYyhcImJlZm9yZVwiKSguLi4pXHJcbi8vIGFsbG93cyB1cyB0byBhcHBseSBhbiBhcmd1bWVudCB3aGlsZSBsZWF2aW5nIHRoZSByZXN0IG9wZW4gbXVjaCBjbGVhbmVyLlxyXG4vLyBmdW5jdGlvbmFsIHByb2dyYW1taW5nIHN0cmlrZXMgYWdhaW4hIC0tIHNpbmtcclxuaW1wb3J0IGhvb2sgZnJvbSBcIi4vaG9vay5qc1wiO1xyXG5pbXBvcnQgeyBwYXRjaGVkT2JqZWN0cyB9IGZyb20gXCIuL3NoYXJlZC5qc1wiO1xyXG5pbXBvcnQgeyB1blBhdGNoIH0gZnJvbSBcIi4vdW4tcGF0Y2guanNcIjtcclxuLy8gY3JlYXRlcyBhIGhvb2sgaWYgbmVlZGVkLCBlbHNlIGp1c3QgYWRkcyBvbmUgdG8gdGhlIHBhdGNoZXMgYXJyYXlcclxuZXhwb3J0IGRlZmF1bHQgKHBhdGNoVHlwZSkgPT4gKGZ1bmNOYW1lLCBmdW5jUGFyZW50LCBjYWxsYmFjaywgb25lVGltZSA9IGZhbHNlKSA9PiB7XHJcbiAgICBpZiAodHlwZW9mIGZ1bmNQYXJlbnRbZnVuY05hbWVdICE9PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke2Z1bmNOYW1lfSBpcyBub3QgYSBmdW5jdGlvbiBpbiAke2Z1bmNQYXJlbnQuY29uc3RydWN0b3IubmFtZX1gKTtcclxuICAgIGlmICghcGF0Y2hlZE9iamVjdHMuaGFzKGZ1bmNQYXJlbnQpKVxyXG4gICAgICAgIHBhdGNoZWRPYmplY3RzLnNldChmdW5jUGFyZW50LCB7fSk7XHJcbiAgICBjb25zdCBwYXJlbnRJbmplY3Rpb25zID0gcGF0Y2hlZE9iamVjdHMuZ2V0KGZ1bmNQYXJlbnQpO1xyXG4gICAgaWYgKCFwYXJlbnRJbmplY3Rpb25zW2Z1bmNOYW1lXSkge1xyXG4gICAgICAgIGNvbnN0IG9yaWdGdW5jID0gZnVuY1BhcmVudFtmdW5jTmFtZV07XHJcbiAgICAgICAgLy8gbm90ZSB0byBmdXR1cmUgbWUgb3B0aW1pc2luZyBmb3Igc2l6ZTogZXh0cmFjdGluZyBuZXcgTWFwKCkgdG8gYSBmdW5jIGluY3JlYXNlcyBzaXplIC0tc2lua1xyXG4gICAgICAgIHBhcmVudEluamVjdGlvbnNbZnVuY05hbWVdID0ge1xyXG4gICAgICAgICAgICBvOiBvcmlnRnVuYyxcclxuICAgICAgICAgICAgYjogbmV3IE1hcCgpLFxyXG4gICAgICAgICAgICBpOiBuZXcgTWFwKCksXHJcbiAgICAgICAgICAgIGE6IG5ldyBNYXAoKSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IHJ1bkhvb2sgPSAoY3R4dCwgYXJncywgY29uc3RydWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJldCA9IGhvb2soZnVuY05hbWUsIGZ1bmNQYXJlbnQsIGFyZ3MsIGN0eHQsIGNvbnN0cnVjdCk7XHJcbiAgICAgICAgICAgIGlmIChvbmVUaW1lKVxyXG4gICAgICAgICAgICAgICAgdW5wYXRjaFRoaXNQYXRjaCgpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29uc3QgcmVwbGFjZVByb3h5ID0gbmV3IFByb3h5KG9yaWdGdW5jLCB7XHJcbiAgICAgICAgICAgIGFwcGx5OiAoXywgY3R4dCwgYXJncykgPT4gcnVuSG9vayhjdHh0LCBhcmdzLCBmYWxzZSksXHJcbiAgICAgICAgICAgIGNvbnN0cnVjdDogKF8sIGFyZ3MpID0+IHJ1bkhvb2sob3JpZ0Z1bmMsIGFyZ3MsIHRydWUpLFxyXG4gICAgICAgICAgICBnZXQ6ICh0YXJnZXQsIHByb3AsIHJlY2VpdmVyKSA9PiBwcm9wID09IFwidG9TdHJpbmdcIlxyXG4gICAgICAgICAgICAgICAgPyBvcmlnRnVuYy50b1N0cmluZy5iaW5kKG9yaWdGdW5jKVxyXG4gICAgICAgICAgICAgICAgOiBSZWZsZWN0LmdldCh0YXJnZXQsIHByb3AsIHJlY2VpdmVyKSxcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyB0aGlzIHdvcmtzIGFyb3VuZCBicmVha2luZyBzb21lIGFzeW5jIGZpbmQgaW1wbGVtZW50YXRpb24gd2hpY2ggbGlzdGVucyBmb3IgYXNzaWducyB2aWEgcHJveHlcclxuICAgICAgICAvLyBzZWUgY29tbWVudCBpbiB1bnBhdGNoLnRzXHJcbiAgICAgICAgY29uc3Qgc3VjY2VzcyA9IFJlZmxlY3QuZGVmaW5lUHJvcGVydHkoZnVuY1BhcmVudCwgZnVuY05hbWUsIHtcclxuICAgICAgICAgICAgdmFsdWU6IHJlcGxhY2VQcm94eSxcclxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoIXN1Y2Nlc3MpXHJcbiAgICAgICAgICAgIGZ1bmNQYXJlbnRbZnVuY05hbWVdID0gcmVwbGFjZVByb3h5O1xyXG4gICAgICAgIGZ1bmNQYXJlbnRbZnVuY05hbWVdLl9fb3JpZ2luYWxfXyA9IHBhcmVudEluamVjdGlvbnNbZnVuY05hbWVdLm87XHJcbiAgICB9XHJcbiAgICBjb25zdCBob29rSWQgPSBTeW1ib2woKTtcclxuICAgIGNvbnN0IHVucGF0Y2hUaGlzUGF0Y2ggPSAoKSA9PiB1blBhdGNoKGZ1bmNQYXJlbnQsIGZ1bmNOYW1lLCBob29rSWQsIHBhdGNoVHlwZSk7XHJcbiAgICBwYXJlbnRJbmplY3Rpb25zW2Z1bmNOYW1lXVtwYXRjaFR5cGVdLnNldChob29rSWQsIGNhbGxiYWNrKTtcclxuICAgIHJldHVybiB1bnBhdGNoVGhpc1BhdGNoO1xyXG59O1xyXG4iLCAiaW1wb3J0IGdldFBhdGNoRnVuYyBmcm9tIFwiLi9nZXQtcGF0Y2gtZnVuYy5qc1wiO1xyXG5pbXBvcnQgeyB1blBhdGNoQWxsIH0gZnJvbSBcIi4vdW4tcGF0Y2guanNcIjtcclxuaW1wb3J0IHsgcGF0Y2hlZE9iamVjdHMgYXMgcGF0Y2hlZCB9IGZyb20gXCIuL3NoYXJlZC5qc1wiO1xyXG5jb25zdCBiZWZvcmUgPSBnZXRQYXRjaEZ1bmMoXCJiXCIpO1xyXG5jb25zdCBpbnN0ZWFkID0gZ2V0UGF0Y2hGdW5jKFwiaVwiKTtcclxuY29uc3QgYWZ0ZXIgPSBnZXRQYXRjaEZ1bmMoXCJhXCIpO1xyXG5leHBvcnQgeyBpbnN0ZWFkLCBiZWZvcmUsIGFmdGVyLCB1blBhdGNoQWxsLCBwYXRjaGVkIH07XHJcbiIsICJpbXBvcnQgKiBhcyBzcGl0Um9hc3QgZnJvbSBcIi4uLy4uL2xpYi9zcGl0cm9hc3QvZGlzdC9lc21cIjtcclxuXHJcbmZ1bmN0aW9uIHByb3BSZXBsYWNlcihjc3MsIHByb3BzID0ge30pIHtcclxuICBjc3MgPSBjc3MucmVwbGFjZSgvdmFyXFwoLS1hY29yZC0tKFtcXFNcXHNdKylcXCkvZywgKG1hdGNoLCBncm91cDEpID0+IHtcclxuICAgIGxldCBzcGxpdHRlZCA9IGdyb3VwMS5zcGxpdChcIixcIik7XHJcbiAgICBsZXQga2V5ID0gc3BsaXR0ZWQuc2hpZnQoKS50cmltKCk7XHJcbiAgICBsZXQgZGVmYXVsdFZhbHVlID0gc3BsaXR0ZWQuam9pbihcIixcIikudHJpbSgpO1xyXG4gICAgcmV0dXJuIHByb3BzW2tleV0gPz8gKGRlZmF1bHRWYWx1ZSB8fCBtYXRjaCk7XHJcbiAgfSk7XHJcbiAgcmV0dXJuIGNzcztcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIF9fY2FjaGVfXzoge1xyXG4gICAgcGF0Y2hlZDogc3BpdFJvYXN0LnBhdGNoZWQsXHJcbiAgfSxcclxuICBiZWZvcmU6IHNwaXRSb2FzdC5iZWZvcmUsXHJcbiAgYWZ0ZXI6IHNwaXRSb2FzdC5hZnRlcixcclxuICBpbnN0ZWFkOiBzcGl0Um9hc3QuaW5zdGVhZCxcclxuICB1blBhdGNoQWxsOiBzcGl0Um9hc3QudW5QYXRjaEFsbCxcclxuICBpbmplY3RDU1MoY3NzLCBjdXN0b21Qcm9wcyA9IHt9KSB7XHJcbiAgICBjb25zdCBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcclxuICAgIHN0eWxlLmNsYXNzTmFtZSA9IGBhY29yZC0taW5qZWN0ZWQtY3NzYDtcclxuICAgIHN0eWxlLnRleHRDb250ZW50ID0gcHJvcFJlcGxhY2VyKGNzcywgY3VzdG9tUHJvcHMpO1xyXG4gICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XHJcblxyXG4gICAgcmV0dXJuICguLi5hcmdzKSA9PiB7XHJcbiAgICAgIGlmICh0eXBlb2YgYXJnc1swXSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgIHN0eWxlLnRleHRDb250ZW50ID0gcHJvcFJlcGxhY2VyKGFyZ3NbMF0sIGFyZ3NbMV0pO1xyXG4gICAgICAgIGNzcyA9IGFyZ3NbMF07XHJcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGFyZ3NbMF0gPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICBzdHlsZS50ZXh0Q29udGVudCA9IHByb3BSZXBsYWNlcihjc3MsIGFyZ3NbMF0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHN0eWxlPy5yZW1vdmUoKTtcclxuICAgICAgICBjc3MgPSBudWxsO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgdW5QYXRjaEFsbENTUygpIHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYWNvcmQtLWluamVjdGVkLWNzc1wiKS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICBlbGVtZW50LnJlbW92ZSgpO1xyXG4gICAgfSlcclxuICB9XHJcbn0iLCAiZXhwb3J0IGRlZmF1bHQgYFxuQGtleWZyYW1lcyBhY29yZExvYWRpbmdGYWRlezAle29wYWNpdHk6LjF9MTAwJXtvcGFjaXR5Oi45fX0uYWNvcmQtLXN0YXJ0dXAtbG9hZGluZ3thbmltYXRpb246YWNvcmRMb2FkaW5nRmFkZSAuNXMgYWx0ZXJuYXRlIGluZmluaXRlIGxpbmVhcjtwb3NpdGlvbjphYnNvbHV0ZTt0cmFuc2l0aW9uOmFsbCAuNXMgbGluZWFyO3JpZ2h0OjhweDtib3R0b206OHB4O3dpZHRoOjE2cHg7aGVpZ2h0OjE2cHg7YmFja2dyb3VuZC1pbWFnZTp1cmwoXCJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vQWNvcmRQbHVnaW4vYXNzZXRzL21haW4vQWNvcmQuc3ZnXCIpO2ZpbHRlcjpncmF5c2NhbGUoMSkgYnJpZ2h0bmVzcygxKTtiYWNrZ3JvdW5kLXBvc2l0aW9uOmNlbnRlcjtiYWNrZ3JvdW5kLXJlcGVhdDpuby1yZXBlYXQ7YmFja2dyb3VuZC1zaXplOmNvbnRhaW47ei1pbmRleDo5OTk5OTl9LmFjb3JkLS1zdGFydHVwLWxvYWRpbmcuaGlkZGVue29wYWNpdHk6MCAhaW1wb3J0YW50fWA7XG4iLCAiaW1wb3J0IGRvbSBmcm9tIFwiLi4vLi4vYXBpL2RvbS9pbmRleC5qc1wiO1xyXG5pbXBvcnQgcGF0Y2hlciBmcm9tIFwiLi4vLi4vYXBpL3BhdGNoZXIvaW5kZXguanNcIjtcclxuXHJcbmltcG9ydCBjc3NUZXh0IGZyb20gXCIuL3N0eWxlLnNjc3NcIjtcclxubGV0IHVuSW5qZWN0O1xyXG5cclxuYXN5bmMgZnVuY3Rpb24gc2hvdygpIHtcclxuICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hY29yZC0tc3RhcnR1cC1sb2FkaW5nXCIpKSByZXR1cm47XHJcbiAgd2hpbGUgKHRydWUpIHtcclxuICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FwcC1tb3VudFwiKSkgYnJlYWs7XHJcbiAgICBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gc2V0VGltZW91dChyZXNvbHZlLCAxMDApKTtcclxuICB9XHJcbiAgXHJcbiAgdW5JbmplY3QgPSBwYXRjaGVyLmluamVjdENTUyhjc3NUZXh0KTtcclxuICBjb25zdCBlbGVtZW50ID0gZG9tLnBhcnNlKGBcclxuICAgIDxkaXYgY2xhc3M9XCJhY29yZC0tc3RhcnR1cC1sb2FkaW5nXCI+PC9kaXY+XHJcbiAgYClcclxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FwcC1tb3VudFwiKS5hcHBlbmRDaGlsZChlbGVtZW50KTtcclxufVxyXG5cclxuZnVuY3Rpb24gaGlkZSgpIHtcclxuICBsZXQgZWxtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hY29yZC0tc3RhcnR1cC1sb2FkaW5nXCIpO1xyXG4gIGlmIChlbG0pIHtcclxuICAgIGVsbS5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIGVsbS5yZW1vdmUoKTtcclxuICAgICAgdW5JbmplY3Q/LigpO1xyXG4gICAgICB1bkluamVjdCA9IG51bGw7XHJcbiAgICB9LCA1MDApO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIHNob3csXHJcbiAgaGlkZVxyXG59IiwgImltcG9ydCAqIGFzIG5lc3RzIGZyb20gXCJuZXN0c1wiO1xyXG5pbXBvcnQgKiBhcyBpZGJLZXl2YWwgZnJvbSBcImlkYi1rZXl2YWxcIjtcclxuaW1wb3J0IHsgZGVDeWNsZWQsIHJldml2ZSB9IGZyb20gXCIuLi8uLi9saWIvanNvbi1kZWN5Y2xlZFwiO1xyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgYXN5bmMgY3JlYXRlUGVyc2lzdE5lc3Qoc3VmZml4KSB7XHJcbiAgICBsZXQgY2FjaGVkID0gYXdhaXQgaWRiS2V5dmFsLmdldChgQWNvcmRTdG9yZTske3N1ZmZpeH1gKTtcclxuICAgIGlmICh0eXBlb2YgY2FjaGVkID09IFwic3RyaW5nXCIpIGNhY2hlZCA9IHJldml2ZShjYWNoZWQpO1xyXG4gICAgY29uc3QgbmVzdCA9IG5lc3RzLm1ha2UoY2FjaGVkID8/IHt9KTtcclxuXHJcbiAgICBjb25zdCBzYXZlID0gKCkgPT4ge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGlkYktleXZhbC5zZXQoYEFjb3JkU3RvcmU7JHtzdWZmaXh9YCwgZGVDeWNsZWQoeyAuLi5uZXN0Lmdob3N0IH0pKTtcclxuICAgICAgfSBjYXRjaCB7XHJcbiAgICAgICAgaWRiS2V5dmFsLnNldChgQWNvcmRTdG9yZTske3N1ZmZpeH1gLCBkZUN5Y2xlZCh7fSkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbmVzdC5vbihuZXN0cy5FdmVudHMuU0VULCBzYXZlKTtcclxuICAgIG5lc3Qub24obmVzdHMuRXZlbnRzLlVQREFURSwgc2F2ZSk7XHJcbiAgICBuZXN0Lm9uKG5lc3RzLkV2ZW50cy5ERUxFVEUsIHNhdmUpO1xyXG5cclxuICAgIHJldHVybiBuZXN0O1xyXG4gIH1cclxufSIsICJmdW5jdGlvbiBwcm9taXNpZnlSZXF1ZXN0KHJlcXVlc3QpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAvLyBAdHMtaWdub3JlIC0gZmlsZSBzaXplIGhhY2tzXG4gICAgICAgIHJlcXVlc3Qub25jb21wbGV0ZSA9IHJlcXVlc3Qub25zdWNjZXNzID0gKCkgPT4gcmVzb2x2ZShyZXF1ZXN0LnJlc3VsdCk7XG4gICAgICAgIC8vIEB0cy1pZ25vcmUgLSBmaWxlIHNpemUgaGFja3NcbiAgICAgICAgcmVxdWVzdC5vbmFib3J0ID0gcmVxdWVzdC5vbmVycm9yID0gKCkgPT4gcmVqZWN0KHJlcXVlc3QuZXJyb3IpO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gY3JlYXRlU3RvcmUoZGJOYW1lLCBzdG9yZU5hbWUpIHtcbiAgICBjb25zdCByZXF1ZXN0ID0gaW5kZXhlZERCLm9wZW4oZGJOYW1lKTtcbiAgICByZXF1ZXN0Lm9udXBncmFkZW5lZWRlZCA9ICgpID0+IHJlcXVlc3QucmVzdWx0LmNyZWF0ZU9iamVjdFN0b3JlKHN0b3JlTmFtZSk7XG4gICAgY29uc3QgZGJwID0gcHJvbWlzaWZ5UmVxdWVzdChyZXF1ZXN0KTtcbiAgICByZXR1cm4gKHR4TW9kZSwgY2FsbGJhY2spID0+IGRicC50aGVuKChkYikgPT4gY2FsbGJhY2soZGIudHJhbnNhY3Rpb24oc3RvcmVOYW1lLCB0eE1vZGUpLm9iamVjdFN0b3JlKHN0b3JlTmFtZSkpKTtcbn1cbmxldCBkZWZhdWx0R2V0U3RvcmVGdW5jO1xuZnVuY3Rpb24gZGVmYXVsdEdldFN0b3JlKCkge1xuICAgIGlmICghZGVmYXVsdEdldFN0b3JlRnVuYykge1xuICAgICAgICBkZWZhdWx0R2V0U3RvcmVGdW5jID0gY3JlYXRlU3RvcmUoJ2tleXZhbC1zdG9yZScsICdrZXl2YWwnKTtcbiAgICB9XG4gICAgcmV0dXJuIGRlZmF1bHRHZXRTdG9yZUZ1bmM7XG59XG4vKipcbiAqIEdldCBhIHZhbHVlIGJ5IGl0cyBrZXkuXG4gKlxuICogQHBhcmFtIGtleVxuICogQHBhcmFtIGN1c3RvbVN0b3JlIE1ldGhvZCB0byBnZXQgYSBjdXN0b20gc3RvcmUuIFVzZSB3aXRoIGNhdXRpb24gKHNlZSB0aGUgZG9jcykuXG4gKi9cbmZ1bmN0aW9uIGdldChrZXksIGN1c3RvbVN0b3JlID0gZGVmYXVsdEdldFN0b3JlKCkpIHtcbiAgICByZXR1cm4gY3VzdG9tU3RvcmUoJ3JlYWRvbmx5JywgKHN0b3JlKSA9PiBwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLmdldChrZXkpKSk7XG59XG4vKipcbiAqIFNldCBhIHZhbHVlIHdpdGggYSBrZXkuXG4gKlxuICogQHBhcmFtIGtleVxuICogQHBhcmFtIHZhbHVlXG4gKiBAcGFyYW0gY3VzdG9tU3RvcmUgTWV0aG9kIHRvIGdldCBhIGN1c3RvbSBzdG9yZS4gVXNlIHdpdGggY2F1dGlvbiAoc2VlIHRoZSBkb2NzKS5cbiAqL1xuZnVuY3Rpb24gc2V0KGtleSwgdmFsdWUsIGN1c3RvbVN0b3JlID0gZGVmYXVsdEdldFN0b3JlKCkpIHtcbiAgICByZXR1cm4gY3VzdG9tU3RvcmUoJ3JlYWR3cml0ZScsIChzdG9yZSkgPT4ge1xuICAgICAgICBzdG9yZS5wdXQodmFsdWUsIGtleSk7XG4gICAgICAgIHJldHVybiBwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLnRyYW5zYWN0aW9uKTtcbiAgICB9KTtcbn1cbi8qKlxuICogU2V0IG11bHRpcGxlIHZhbHVlcyBhdCBvbmNlLiBUaGlzIGlzIGZhc3RlciB0aGFuIGNhbGxpbmcgc2V0KCkgbXVsdGlwbGUgdGltZXMuXG4gKiBJdCdzIGFsc28gYXRvbWljIFx1MjAxMyBpZiBvbmUgb2YgdGhlIHBhaXJzIGNhbid0IGJlIGFkZGVkLCBub25lIHdpbGwgYmUgYWRkZWQuXG4gKlxuICogQHBhcmFtIGVudHJpZXMgQXJyYXkgb2YgZW50cmllcywgd2hlcmUgZWFjaCBlbnRyeSBpcyBhbiBhcnJheSBvZiBgW2tleSwgdmFsdWVdYC5cbiAqIEBwYXJhbSBjdXN0b21TdG9yZSBNZXRob2QgdG8gZ2V0IGEgY3VzdG9tIHN0b3JlLiBVc2Ugd2l0aCBjYXV0aW9uIChzZWUgdGhlIGRvY3MpLlxuICovXG5mdW5jdGlvbiBzZXRNYW55KGVudHJpZXMsIGN1c3RvbVN0b3JlID0gZGVmYXVsdEdldFN0b3JlKCkpIHtcbiAgICByZXR1cm4gY3VzdG9tU3RvcmUoJ3JlYWR3cml0ZScsIChzdG9yZSkgPT4ge1xuICAgICAgICBlbnRyaWVzLmZvckVhY2goKGVudHJ5KSA9PiBzdG9yZS5wdXQoZW50cnlbMV0sIGVudHJ5WzBdKSk7XG4gICAgICAgIHJldHVybiBwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLnRyYW5zYWN0aW9uKTtcbiAgICB9KTtcbn1cbi8qKlxuICogR2V0IG11bHRpcGxlIHZhbHVlcyBieSB0aGVpciBrZXlzXG4gKlxuICogQHBhcmFtIGtleXNcbiAqIEBwYXJhbSBjdXN0b21TdG9yZSBNZXRob2QgdG8gZ2V0IGEgY3VzdG9tIHN0b3JlLiBVc2Ugd2l0aCBjYXV0aW9uIChzZWUgdGhlIGRvY3MpLlxuICovXG5mdW5jdGlvbiBnZXRNYW55KGtleXMsIGN1c3RvbVN0b3JlID0gZGVmYXVsdEdldFN0b3JlKCkpIHtcbiAgICByZXR1cm4gY3VzdG9tU3RvcmUoJ3JlYWRvbmx5JywgKHN0b3JlKSA9PiBQcm9taXNlLmFsbChrZXlzLm1hcCgoa2V5KSA9PiBwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLmdldChrZXkpKSkpKTtcbn1cbi8qKlxuICogVXBkYXRlIGEgdmFsdWUuIFRoaXMgbGV0cyB5b3Ugc2VlIHRoZSBvbGQgdmFsdWUgYW5kIHVwZGF0ZSBpdCBhcyBhbiBhdG9taWMgb3BlcmF0aW9uLlxuICpcbiAqIEBwYXJhbSBrZXlcbiAqIEBwYXJhbSB1cGRhdGVyIEEgY2FsbGJhY2sgdGhhdCB0YWtlcyB0aGUgb2xkIHZhbHVlIGFuZCByZXR1cm5zIGEgbmV3IHZhbHVlLlxuICogQHBhcmFtIGN1c3RvbVN0b3JlIE1ldGhvZCB0byBnZXQgYSBjdXN0b20gc3RvcmUuIFVzZSB3aXRoIGNhdXRpb24gKHNlZSB0aGUgZG9jcykuXG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZShrZXksIHVwZGF0ZXIsIGN1c3RvbVN0b3JlID0gZGVmYXVsdEdldFN0b3JlKCkpIHtcbiAgICByZXR1cm4gY3VzdG9tU3RvcmUoJ3JlYWR3cml0ZScsIChzdG9yZSkgPT4gXG4gICAgLy8gTmVlZCB0byBjcmVhdGUgdGhlIHByb21pc2UgbWFudWFsbHkuXG4gICAgLy8gSWYgSSB0cnkgdG8gY2hhaW4gcHJvbWlzZXMsIHRoZSB0cmFuc2FjdGlvbiBjbG9zZXMgaW4gYnJvd3NlcnNcbiAgICAvLyB0aGF0IHVzZSBhIHByb21pc2UgcG9seWZpbGwgKElFMTAvMTEpLlxuICAgIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgc3RvcmUuZ2V0KGtleSkub25zdWNjZXNzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBzdG9yZS5wdXQodXBkYXRlcih0aGlzLnJlc3VsdCksIGtleSk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLnRyYW5zYWN0aW9uKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSkpO1xufVxuLyoqXG4gKiBEZWxldGUgYSBwYXJ0aWN1bGFyIGtleSBmcm9tIHRoZSBzdG9yZS5cbiAqXG4gKiBAcGFyYW0ga2V5XG4gKiBAcGFyYW0gY3VzdG9tU3RvcmUgTWV0aG9kIHRvIGdldCBhIGN1c3RvbSBzdG9yZS4gVXNlIHdpdGggY2F1dGlvbiAoc2VlIHRoZSBkb2NzKS5cbiAqL1xuZnVuY3Rpb24gZGVsKGtleSwgY3VzdG9tU3RvcmUgPSBkZWZhdWx0R2V0U3RvcmUoKSkge1xuICAgIHJldHVybiBjdXN0b21TdG9yZSgncmVhZHdyaXRlJywgKHN0b3JlKSA9PiB7XG4gICAgICAgIHN0b3JlLmRlbGV0ZShrZXkpO1xuICAgICAgICByZXR1cm4gcHJvbWlzaWZ5UmVxdWVzdChzdG9yZS50cmFuc2FjdGlvbik7XG4gICAgfSk7XG59XG4vKipcbiAqIERlbGV0ZSBtdWx0aXBsZSBrZXlzIGF0IG9uY2UuXG4gKlxuICogQHBhcmFtIGtleXMgTGlzdCBvZiBrZXlzIHRvIGRlbGV0ZS5cbiAqIEBwYXJhbSBjdXN0b21TdG9yZSBNZXRob2QgdG8gZ2V0IGEgY3VzdG9tIHN0b3JlLiBVc2Ugd2l0aCBjYXV0aW9uIChzZWUgdGhlIGRvY3MpLlxuICovXG5mdW5jdGlvbiBkZWxNYW55KGtleXMsIGN1c3RvbVN0b3JlID0gZGVmYXVsdEdldFN0b3JlKCkpIHtcbiAgICByZXR1cm4gY3VzdG9tU3RvcmUoJ3JlYWR3cml0ZScsIChzdG9yZSkgPT4ge1xuICAgICAgICBrZXlzLmZvckVhY2goKGtleSkgPT4gc3RvcmUuZGVsZXRlKGtleSkpO1xuICAgICAgICByZXR1cm4gcHJvbWlzaWZ5UmVxdWVzdChzdG9yZS50cmFuc2FjdGlvbik7XG4gICAgfSk7XG59XG4vKipcbiAqIENsZWFyIGFsbCB2YWx1ZXMgaW4gdGhlIHN0b3JlLlxuICpcbiAqIEBwYXJhbSBjdXN0b21TdG9yZSBNZXRob2QgdG8gZ2V0IGEgY3VzdG9tIHN0b3JlLiBVc2Ugd2l0aCBjYXV0aW9uIChzZWUgdGhlIGRvY3MpLlxuICovXG5mdW5jdGlvbiBjbGVhcihjdXN0b21TdG9yZSA9IGRlZmF1bHRHZXRTdG9yZSgpKSB7XG4gICAgcmV0dXJuIGN1c3RvbVN0b3JlKCdyZWFkd3JpdGUnLCAoc3RvcmUpID0+IHtcbiAgICAgICAgc3RvcmUuY2xlYXIoKTtcbiAgICAgICAgcmV0dXJuIHByb21pc2lmeVJlcXVlc3Qoc3RvcmUudHJhbnNhY3Rpb24pO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gZWFjaEN1cnNvcihzdG9yZSwgY2FsbGJhY2spIHtcbiAgICBzdG9yZS5vcGVuQ3Vyc29yKCkub25zdWNjZXNzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXRoaXMucmVzdWx0KVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjYWxsYmFjayh0aGlzLnJlc3VsdCk7XG4gICAgICAgIHRoaXMucmVzdWx0LmNvbnRpbnVlKCk7XG4gICAgfTtcbiAgICByZXR1cm4gcHJvbWlzaWZ5UmVxdWVzdChzdG9yZS50cmFuc2FjdGlvbik7XG59XG4vKipcbiAqIEdldCBhbGwga2V5cyBpbiB0aGUgc3RvcmUuXG4gKlxuICogQHBhcmFtIGN1c3RvbVN0b3JlIE1ldGhvZCB0byBnZXQgYSBjdXN0b20gc3RvcmUuIFVzZSB3aXRoIGNhdXRpb24gKHNlZSB0aGUgZG9jcykuXG4gKi9cbmZ1bmN0aW9uIGtleXMoY3VzdG9tU3RvcmUgPSBkZWZhdWx0R2V0U3RvcmUoKSkge1xuICAgIHJldHVybiBjdXN0b21TdG9yZSgncmVhZG9ubHknLCAoc3RvcmUpID0+IHtcbiAgICAgICAgLy8gRmFzdCBwYXRoIGZvciBtb2Rlcm4gYnJvd3NlcnNcbiAgICAgICAgaWYgKHN0b3JlLmdldEFsbEtleXMpIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLmdldEFsbEtleXMoKSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaXRlbXMgPSBbXTtcbiAgICAgICAgcmV0dXJuIGVhY2hDdXJzb3Ioc3RvcmUsIChjdXJzb3IpID0+IGl0ZW1zLnB1c2goY3Vyc29yLmtleSkpLnRoZW4oKCkgPT4gaXRlbXMpO1xuICAgIH0pO1xufVxuLyoqXG4gKiBHZXQgYWxsIHZhbHVlcyBpbiB0aGUgc3RvcmUuXG4gKlxuICogQHBhcmFtIGN1c3RvbVN0b3JlIE1ldGhvZCB0byBnZXQgYSBjdXN0b20gc3RvcmUuIFVzZSB3aXRoIGNhdXRpb24gKHNlZSB0aGUgZG9jcykuXG4gKi9cbmZ1bmN0aW9uIHZhbHVlcyhjdXN0b21TdG9yZSA9IGRlZmF1bHRHZXRTdG9yZSgpKSB7XG4gICAgcmV0dXJuIGN1c3RvbVN0b3JlKCdyZWFkb25seScsIChzdG9yZSkgPT4ge1xuICAgICAgICAvLyBGYXN0IHBhdGggZm9yIG1vZGVybiBicm93c2Vyc1xuICAgICAgICBpZiAoc3RvcmUuZ2V0QWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzaWZ5UmVxdWVzdChzdG9yZS5nZXRBbGwoKSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaXRlbXMgPSBbXTtcbiAgICAgICAgcmV0dXJuIGVhY2hDdXJzb3Ioc3RvcmUsIChjdXJzb3IpID0+IGl0ZW1zLnB1c2goY3Vyc29yLnZhbHVlKSkudGhlbigoKSA9PiBpdGVtcyk7XG4gICAgfSk7XG59XG4vKipcbiAqIEdldCBhbGwgZW50cmllcyBpbiB0aGUgc3RvcmUuIEVhY2ggZW50cnkgaXMgYW4gYXJyYXkgb2YgYFtrZXksIHZhbHVlXWAuXG4gKlxuICogQHBhcmFtIGN1c3RvbVN0b3JlIE1ldGhvZCB0byBnZXQgYSBjdXN0b20gc3RvcmUuIFVzZSB3aXRoIGNhdXRpb24gKHNlZSB0aGUgZG9jcykuXG4gKi9cbmZ1bmN0aW9uIGVudHJpZXMoY3VzdG9tU3RvcmUgPSBkZWZhdWx0R2V0U3RvcmUoKSkge1xuICAgIHJldHVybiBjdXN0b21TdG9yZSgncmVhZG9ubHknLCAoc3RvcmUpID0+IHtcbiAgICAgICAgLy8gRmFzdCBwYXRoIGZvciBtb2Rlcm4gYnJvd3NlcnNcbiAgICAgICAgLy8gKGFsdGhvdWdoLCBob3BlZnVsbHkgd2UnbGwgZ2V0IGEgc2ltcGxlciBwYXRoIHNvbWUgZGF5KVxuICAgICAgICBpZiAoc3RvcmUuZ2V0QWxsICYmIHN0b3JlLmdldEFsbEtleXMpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICAgICAgcHJvbWlzaWZ5UmVxdWVzdChzdG9yZS5nZXRBbGxLZXlzKCkpLFxuICAgICAgICAgICAgICAgIHByb21pc2lmeVJlcXVlc3Qoc3RvcmUuZ2V0QWxsKCkpLFxuICAgICAgICAgICAgXSkudGhlbigoW2tleXMsIHZhbHVlc10pID0+IGtleXMubWFwKChrZXksIGkpID0+IFtrZXksIHZhbHVlc1tpXV0pKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpdGVtcyA9IFtdO1xuICAgICAgICByZXR1cm4gY3VzdG9tU3RvcmUoJ3JlYWRvbmx5JywgKHN0b3JlKSA9PiBlYWNoQ3Vyc29yKHN0b3JlLCAoY3Vyc29yKSA9PiBpdGVtcy5wdXNoKFtjdXJzb3Iua2V5LCBjdXJzb3IudmFsdWVdKSkudGhlbigoKSA9PiBpdGVtcykpO1xuICAgIH0pO1xufVxuXG5leHBvcnQgeyBjbGVhciwgY3JlYXRlU3RvcmUsIGRlbCwgZGVsTWFueSwgZW50cmllcywgZ2V0LCBnZXRNYW55LCBrZXlzLCBwcm9taXNpZnlSZXF1ZXN0LCBzZXQsIHNldE1hbnksIHVwZGF0ZSwgdmFsdWVzIH07XG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5mdW5jdGlvbiBkZUN5Y2xlcih2YWwsIGNvbmZpZykge1xyXG4gIGNvbmZpZyA9IHR5cGVvZiBjb25maWcgPT09ICdudW1iZXInID8geyBkZWVwOiBjb25maWcgfSA6IChjb25maWcgfHwge30pO1xyXG4gIGNvbmZpZy5kZWVwID0gY29uZmlnLmRlZXAgfHwgMTA7XHJcbiAgcmV0dXJuIGRlY3ljbGVXYWxrZXIoW10sIFtdLCB2YWwsIGNvbmZpZyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRlQ3ljbGVkKHZhbCwgY29uZmlnKSB7XHJcbiAgY29uZmlnID0gdHlwZW9mIGNvbmZpZyA9PT0gJ251bWJlcicgPyB7IGRlZXA6IGNvbmZpZyB9IDogKGNvbmZpZyB8fCB7fSk7XHJcbiAgdmFsID0gZGVDeWNsZXIodmFsLCBjb25maWcpO1xyXG4gIHRyeSB7XHJcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodmFsLCB1bmRlZmluZWQsIGNvbmZpZy5zcGFjZXIpO1xyXG4gIH0gY2F0Y2ggKGUpIHtcclxuICAgIHJldHVybiBlO1xyXG4gIH1cclxufVxyXG5cclxudmFyIHJldml2ZXJEYXRlID0gL15cXFtEYXRlOigoXFxkezR9LVxcZHsyfS1cXGR7Mn0pW0EtWl0rKFxcZHsyfTpcXGR7Mn06XFxkezJ9KS4oWzAtOSstOl0rKVopXFxdJC87XHJcbnZhciByZXZpdmVyUmVnRXhwID0gL15cXFtSZWdleHA6XFwvKC4rKVxcL1xcXSQvO1xyXG52YXIgcmV2aXZlckVycm9yID0gL15cXFtFcnJvcjooW1xcV1xcd10rKVxcXSQvO1xyXG52YXIgcmV2aXZlckZ1bmN0aW9uID0gL15cXFtGdW5jdGlvbjooLispXFxdJC87XHJcbmZ1bmN0aW9uIHJldml2ZSh2YWwsIGZ1bmN0aW9ucykge1xyXG4gIHRyeSB7XHJcbiAgICByZXR1cm4gSlNPTi5wYXJzZSh2YWwsIHJldml2ZXIpO1xyXG4gIH0gY2F0Y2ggKGUpIHtcclxuICAgIHJldHVybiBlO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcmV2aXZlcihrZXksIHZhbCkge1xyXG4gICAgaWYgKHJldml2ZXJEYXRlLnRlc3QodmFsKSkge1xyXG4gICAgICB2YWwgPSByZXZpdmVyRGF0ZS5leGVjKHZhbCk7XHJcbiAgICAgIHZhbCA9IG5ldyBEYXRlKHZhbFsxXSk7XHJcbiAgICAgIHJldHVybiBuZXcgRGF0ZSh2YWwpO1xyXG4gICAgfSBlbHNlIGlmIChyZXZpdmVyUmVnRXhwLnRlc3QodmFsKSkge1xyXG4gICAgICB2YWwgPSByZXZpdmVyUmVnRXhwLmV4ZWModmFsKVsxXTtcclxuICAgICAgcmV0dXJuIG5ldyBSZWdFeHAodmFsKTtcclxuICAgIH0gZWxzZSBpZiAocmV2aXZlckVycm9yLnRlc3QodmFsKSkge1xyXG4gICAgICB2YWwgPSByZXZpdmVyRXJyb3IuZXhlYyh2YWwpWzFdO1xyXG4gICAgICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IodmFsLnNwbGl0KCdcXG4nKVswXSk7XHJcbiAgICAgIGlmIChlcnJvci5zdGFjaykge1xyXG4gICAgICAgIGVycm9yLnN0YWNrID0gdmFsO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBlcnJvcjtcclxuICAgIH0gZWxzZSBpZiAoZnVuY3Rpb25zICYmIHJldml2ZXJGdW5jdGlvbi50ZXN0KHZhbCkpIHtcclxuICAgICAgdmFsID0gcmV2aXZlckZ1bmN0aW9uLmV4ZWModmFsKVsxXTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICByZXR1cm4gKG5ldyBGdW5jdGlvbihcInJldHVybiBcIiArIHZhbCArIFwiO1wiKSkoKTtcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICByZXR1cm4gZXJyb3I7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB2YWw7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBkZWN5Y2xlV2Fsa2VyKHBhcmVudHMsIHBhdGgsIHZhbCwgY29uZmlnKSB7XHJcbiAgaWYgKFsndW5kZWZpbmVkJywgJ251bWJlcicsICdib29sZWFuJywgJ3N0cmluZyddLmluZGV4T2YodHlwZW9mIHZhbCkgPj0gMCB8fCB2YWwgPT09IG51bGwpIHtcclxuICAgIHJldHVybiB2YWw7XHJcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnb2JqZWN0JyAmJiB2YWwuY29uc3RydWN0b3IgPT09IERhdGUpIHtcclxuICAgIHJldHVybiBjb25maWcuZGF0ZXMgIT09IGZhbHNlID8gJ1tEYXRlOicgKyB2YWwudG9JU09TdHJpbmcoKSArICddJyA6IHZhbDtcclxuICAgIC8vdmFsLmZvcm1hdCgne1lZWVl9L3tNTX0ve0REfSB7aGh9OnttbX06e3NzfSBVVEM6XHUwMEI3e3BhcmFtcy50ej49MD9cIitcIitwYXJhbXMudHo6cGFyYW1zLnR6fVx1MDBCNycpO1xyXG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ29iamVjdCcgJiYgdmFsLmNvbnN0cnVjdG9yID09PSBSZWdFeHApIHtcclxuICAgIHJldHVybiBjb25maWcucmVnZXhwcyAhPT0gZmFsc2UgPyAnW1JlZ2V4cDonICsgdmFsLnRvU3RyaW5nKCkgKyAnXScgOiB2YWw7XHJcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnb2JqZWN0JyAmJiB2YWwuY29uc3RydWN0b3IgJiYgdHlwZW9mIHZhbC5jb25zdHJ1Y3Rvci5uYW1lID09PSAnc3RyaW5nJyAmJiB2YWwuY29uc3RydWN0b3IubmFtZS5zbGljZSgtNSkgPT09ICdFcnJvcicpIHtcclxuICAgIHZhciBzdGFjayA9ICh2YWwuc3RhY2sgfHwgJycpLnNwbGl0KCdcXG4nKS5zbGljZSgxKTtcclxuICAgIHZhciBtZXNzYWdlID0gKHZhbC5tZXNzYWdlIHx8IHZhbC50b1N0cmluZygpKTtcclxuICAgIHZhciBlcnJvciA9IG1lc3NhZ2UgKyBcIlxcblwiICsgc3RhY2s7XHJcbiAgICByZXR1cm4gY29uZmlnLmVycm9ycyAhPT0gZmFsc2UgPyAnW0Vycm9yOicgKyBlcnJvciArICddJyA6IHZhbDtcclxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSB7XHJcbiAgICBpZiAocGFyZW50cy5pbmRleE9mKHZhbCkgPj0gMCkge1xyXG4gICAgICB2YXIgcG9pbnQgPSBwYXRoLnNsaWNlKDAsIHBhcmVudHMuaW5kZXhPZih2YWwpKS5qb2luKCcuJyk7XHJcbiAgICAgIHJldHVybiAnW0NpcmN1bGFyJyArIChwb2ludCA/ICc6JyArIHBvaW50IDogJycpICsgJ10nO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFyIGNvcHksIGksIGssIGw7XHJcbiAgICAgIGlmICh2YWwuY29uc3RydWN0b3IgJiYgdHlwZW9mIHZhbC5jb25zdHJ1Y3Rvci5uYW1lID09PSAnc3RyaW5nJyAmJiB2YWwuY29uc3RydWN0b3IubmFtZS5zbGljZSgtNSkgPT09ICdBcnJheScpIHtcclxuICAgICAgICBpZiAocGFyZW50cy5sZW5ndGggPj0gY29uZmlnLmRlZXApIHtcclxuICAgICAgICAgIHJldHVybiAnW0FycmF5OicgKyB2YWwuY29uc3RydWN0b3IubmFtZSArICddJztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29weSA9IFtdO1xyXG4gICAgICAgICAgZm9yIChpID0gMCwgbCA9IHZhbC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICAgICAgY29weVtpXSA9IGRlY3ljbGVXYWxrZXIocGFyZW50cy5jb25jYXQoW3ZhbF0pLCBwYXRoLmNvbmNhdChpKSwgdmFsW2ldLCBjb25maWcpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIGNvcHk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChwYXJlbnRzLmxlbmd0aCA+PSBjb25maWcuZGVlcCkge1xyXG4gICAgICAgICAgcmV0dXJuICdbT2JqZWN0OicgKyAodmFsLmNvbnN0cnVjdG9yICYmIHZhbC5jb25zdHJ1Y3Rvci5uYW1lID8gdmFsLmNvbnN0cnVjdG9yLm5hbWUgOiAnT2JqZWN0JykgKyAnXSc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvcHkgPSB7fTtcclxuICAgICAgICAgIGZvciAoaSA9IDAsIGsgPSBPYmplY3Qua2V5cyh2YWwpLCBsID0gay5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICAgICAgY29weVtrW2ldXSA9IGRlY3ljbGVXYWxrZXIocGFyZW50cy5jb25jYXQoW3ZhbF0pLCBwYXRoLmNvbmNhdChba1tpXV0pLCB2YWxba1tpXV0sIGNvbmZpZyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gY29weTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicpIHtcclxuICAgIHJldHVybiBjb25maWcuZnVuY3Rpb25zID09PSB0cnVlID8gJ1tGdW5jdGlvbjonICsgdmFsLnRvU3RyaW5nKCkgKyAnXScgOiB1bmRlZmluZWQ7XHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiB2YWwudG9TdHJpbmcoKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7XHJcbiAgZGVDeWNsZXIsXHJcbiAgZGVDeWNsZWQsXHJcbiAgcmV2aXZlXHJcbn0iLCAiaW1wb3J0IGkxOG4gZnJvbSBcIi4uL2kxOG5cIjtcclxuaW1wb3J0IHV0aWxzIGZyb20gXCIuLi91dGlsc1wiO1xyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSB7eyBpMThuOiBzdHJpbmcgfCB7IFtsYW5nOiBzdHJpbmddOiB7IFtrOiBzdHJpbmddOiBzdHJpbmcgfSB9fX0gY2ZnIFxyXG4gKiBAcmV0dXJucyBcclxuICovXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBidWlsZEV4dGVuc2lvbkkxOE4oY2ZnKSB7XHJcbiAgaWYgKCFjZmc/LmkxOG4pIHJldHVybiBudWxsO1xyXG4gIGxldCBvdXQgPSB7XHJcbiAgICBfX2NhY2hlX186IHtcclxuICAgICAgbG9jYWxlSWRzOiBbXSxcclxuICAgICAgbG9jYWxpemF0aW9uczoge31cclxuICAgIH0sXHJcbiAgICBmb3JtYXQoa2V5LCAuLi5hcmdzKSB7XHJcbiAgICAgIHJldHVybiB1dGlscy5mb3JtYXQob3V0LmdldChrZXkpLCAuLi5hcmdzKTtcclxuICAgIH0sXHJcbiAgICBnZXQoa2V5KSB7XHJcbiAgICAgIHJldHVybiBvdXQuX19jYWNoZV9fLmxvY2FsaXphdGlvbnNbaTE4bi5sb2NhbGVdPy5ba2V5XVxyXG4gICAgICAgIHx8IG91dC5fX2NhY2hlX18ubG9jYWxpemF0aW9ucy5kZWZhdWx0Py5ba2V5XVxyXG4gICAgICAgIHx8IG91dC5nZXQoa2V5KTtcclxuICAgIH0sXHJcbiAgICBtZXNzYWdlczogbmV3IFByb3h5KHt9LCB7XHJcbiAgICAgIGdldChfLCBwcm9wKSB7XHJcbiAgICAgICAgcmV0dXJuIG91dC5nZXQocHJvcCk7XHJcbiAgICAgIH1cclxuICAgIH0pLFxyXG4gIH1cclxuICBhc3luYyBmdW5jdGlvbiBjaGVjaygpIHtcclxuICAgIGNvbnN0IGxvY2FsZSA9IGkxOG4ubG9jYWxlO1xyXG4gICAgaWYgKHR5cGVvZiBjZmcuaTE4biA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICBjb25zdCBCQVNFX1VSTCA9IGNmZy5pMThuLmVuZHNXaXRoKFwiL1wiKSA/IGNmZy5pMThuLnNsaWNlKDAsIC0xKSA6IGNmZy5pMThuO1xyXG4gICAgICBpZiAoIW91dC5fX2NhY2hlX18ubG9jYWxlSWRzLmxlbmd0aCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICBvdXQuX19jYWNoZV9fLmxvY2FsZUlkcyA9IGF3YWl0IChhd2FpdCBmZXRjaChgJHtCQVNFX1VSTH0vbG9jYWxlcy5qc29uYCwgbm9TdG9yZSkpLmpzb24oKTtcclxuICAgICAgICB9IGNhdGNoIHsgfVxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICBvdXQuX19jYWNoZV9fLmxvY2FsaXphdGlvbnMuZGVmYXVsdCA9IGF3YWl0IChhd2FpdCBmZXRjaChgJHtCQVNFX1VSTH0vZGVmYXVsdC5qc29uYCwgbm9TdG9yZSkpLmpzb24oKTtcclxuICAgICAgICB9IGNhdGNoIHsgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmIChcclxuICAgICAgICBvdXQuX19jYWNoZV9fLmxvY2FsZUlkcy5pbmNsdWRlcyhsb2NhbGUpXHJcbiAgICAgICAgJiYgIW91dC5fX2NhY2hlX18ubG9jYWxpemF0aW9ucz8uW2xvY2FsZV1cclxuICAgICAgKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIG91dC5fX2NhY2hlX18ubG9jYWxpemF0aW9uc1tsb2NhbGVdID0gYXdhaXQgKGF3YWl0IGZldGNoKGAke0JBU0VfVVJMfS8ke2xvY2FsZX0uanNvbmAsIG5vU3RvcmUpKS5qc29uKCk7XHJcbiAgICAgICAgfSBjYXRjaCB7IH07XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG91dC5fX2NhY2hlX18ubG9jYWxlSWRzID0gT2JqZWN0LmtleXMoY2ZnLmkxOG4pO1xyXG4gICAgICBvdXQuX19jYWNoZV9fLmxvY2FsaXphdGlvbnMgPSBjZmcuaTE4bjtcclxuICAgIH1cclxuICB9XHJcbiAgYXdhaXQgY2hlY2soKTtcclxuICByZXR1cm4gb3V0O1xyXG59IiwgImltcG9ydCB7IEJhc2ljRXZlbnRFbWl0dGVyIH0gZnJvbSBcIi4uLy4uL2xpYi9CYXNpY0V2ZW50RW1pdHRlci5qc1wiO1xyXG5pbXBvcnQgZGV2IGZyb20gXCIuLi9kZXYvaW5kZXguanNcIjtcclxuaW1wb3J0IGkxOG4gZnJvbSBcIi4uL2kxOG4vaW5kZXguanNcIjtcclxuaW1wb3J0IG1vZHVsZXMgZnJvbSBcIi4uL21vZHVsZXMvaW5kZXguanNcIjtcclxuaW1wb3J0IHN0b3JhZ2UgZnJvbSBcIi4uL3N0b3JhZ2UvaW5kZXguanNcIjtcclxuaW1wb3J0IHsgYnVpbGRFeHRlbnNpb25JMThOIH0gZnJvbSBcIi4vaTE4bi5qc1wiO1xyXG5pbXBvcnQgKiBhcyBuZXN0cyBmcm9tIFwibmVzdHNcIjtcclxuaW1wb3J0IGV2ZW50cyBmcm9tIFwiLi4vZXZlbnRzL2luZGV4LmpzXCI7XHJcbmltcG9ydCBwYXRjaGVyIGZyb20gXCIuLi9wYXRjaGVyL2luZGV4LmpzXCI7XHJcbmltcG9ydCBmaW5kSW5UcmVlIGZyb20gXCIuLi91dGlscy9yYXcvZmluZC1pbi10cmVlLmpzXCI7XHJcbmltcG9ydCB3ZWJzb2NrZXQgZnJvbSBcIi4uL3dlYnNvY2tldC9pbmRleC5qc1wiO1xyXG5pbXBvcnQgdWkgZnJvbSBcIi4uL3VpL2luZGV4LmpzXCI7XHJcbmltcG9ydCB1dGlscyBmcm9tIFwiLi4vdXRpbHMvaW5kZXguanNcIjtcclxuaW1wb3J0IGRvbSBmcm9tIFwiLi4vZG9tL2luZGV4LmpzXCI7XHJcbmltcG9ydCB7IHdhaXRVbnRpbENvbm5lY3Rpb25PcGVuIH0gZnJvbSBcIi4uLy4uL290aGVyL3V0aWxzLmpzXCI7XHJcblxyXG4vKipcclxuICogQHBhcmFtIHt7IG1vZGU/OiBcImRldmVsb3BtZW50XCIgfCBcInByb2R1Y3Rpb25cIiwgYXBpOiB7IHBhdGNoZXI/OiBzdHJpbmcgfCBib29sZWFuLCBzdG9yYWdlPzogc3RyaW5nIHwgYm9vbGVhbiwgaTE4bj86IHN0cmluZyB8IGJvb2xlYW4sIGV2ZW50cz86IHN0cmluZyB8IGJvb2xlYW4sIHV0aWxzPzogc3RyaW5nIHwgYm9vbGVhbiwgZG9tPzogc3RyaW5nIHwgYm9vbGVhbiwgd2Vic29ja2V0Pzogc3RyaW5nIHwgYm9vbGVhbiwgdWk/OiBzdHJpbmcgfCBib29sZWFuLCBkZXY/OiBzdHJpbmcgfCBib29sZWFuLCBtb2R1bGVzOiB7IG5vZGU6IHsgbmFtZTogc3RyaW5nLCByZWFzb246IHN0cmluZyB9W10sIGNvbW1vbjogeyBuYW1lOiBzdHJpbmcsIHJlYXNvbjogc3RyaW5nIH1bXSwgY3VzdG9tOiB7IHJlYXNvbjogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIGxhenk6IGJvb2xlYW4sIGZpbmRlcjogeyBmaWx0ZXI6IHsgZXhwb3J0OiBib29sZWFuLCBpbjogXCJwcm9wZXJ0aWVzXCIgfCBcInN0cmluZ3NcIiB8IFwicHJvdG90eXBlc1wiLCBieTogW3N0cmluZ1tdLCBzdHJpbmdbXT9dIH0sIHBhdGg6IHsgYmVmb3JlOiBzdHJpbmcgfCBzdHJpbmdbXSwgYWZ0ZXI6IHN0cmluZyB8IHN0cmluZ1tdIH0sIG1hcDogeyBbazogc3RyaW5nXTogc3RyaW5nW10gfSB9IH1bXSB9IH0sIGFib3V0OiB7IG5hbWU6IHN0cmluZyB8IHsgW2s6IHN0cmluZ106IHN0cmluZyB9LCBkZXNjcmlwdGlvbjogc3RyaW5nIHwgeyBbazogc3RyaW5nXTogc3RyaW5nIH0sIHNsdWc6IHN0cmluZyB9IH19IG1hbmlmZXN0IFxyXG4gKi9cclxuYXN5bmMgZnVuY3Rpb24gYnVpbGRQbHVnaW5BUEkobWFuaWZlc3QsIHBlcnNpc3RLZXkpIHtcclxuICBjb25zdCBkZXZNb2RlID0gZGV2LmVuYWJsZWQgfHwgbWFuaWZlc3Q/Lm1vZGUgPT09IFwiZGV2ZWxvcG1lbnRcIjtcclxuICBjb25zdCBwZXJzaXN0ID0gYXdhaXQgc3RvcmFnZS5jcmVhdGVQZXJzaXN0TmVzdChwZXJzaXN0S2V5KTtcclxuICBjb25zdCBvdXQgPSB7XHJcbiAgICBtb2R1bGVzOiB7XHJcbiAgICAgIF9fY2FjaGVfXzoge1xyXG4gICAgICAgIGNvbW1vbjoge30sXHJcbiAgICAgICAgbm9kZToge30sXHJcbiAgICAgICAgY3VzdG9tOiB7fSxcclxuICAgICAgICBjdXN0b21MYXp5OiB7fVxyXG4gICAgICB9LFxyXG4gICAgICByZXF1aXJlKG5hbWUpIHtcclxuICAgICAgICBpZiAoIWRldk1vZGUpIHtcclxuICAgICAgICAgIGlmICh0eXBlb2Ygb3V0Lm1vZHVsZXMuX19jYWNoZV9fLm5vZGVbbmFtZV0gIT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBvdXQubW9kdWxlcy5fX2NhY2hlX18ubm9kZVtuYW1lXTtcclxuICAgICAgICAgIGlmIChtYW5pZmVzdD8uYXBpPy5tb2R1bGVzPy5ub2RlPy5zb21lPy4oaSA9PiBpLm5hbWUgPT09IG5hbWUpKSByZXR1cm4gb3V0Lm1vZHVsZXMuX19jYWNoZV9fLm5vZGVbbmFtZV0gPSBtb2R1bGVzLnJlcXVpcmUobmFtZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJldHVybiBtb2R1bGVzLnJlcXVpcmUobmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICB9LFxyXG4gICAgICBjb21tb246IG5ldyBQcm94eSh7fSwge1xyXG4gICAgICAgIGdldChfLCBwcm9wKSB7XHJcbiAgICAgICAgICBpZiAoIWRldk1vZGUpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvdXQubW9kdWxlcy5fX2NhY2hlX18uY29tbW9uW3Byb3BdICE9PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gb3V0Lm1vZHVsZXMuX19jYWNoZV9fLmNvbW1vbltwcm9wXTtcclxuICAgICAgICAgICAgaWYgKG1hbmlmZXN0Py5hcGk/Lm1vZHVsZXM/LmNvbW1vbj8uc29tZT8uKGkgPT4gaS5uYW1lID09PSBwcm9wKSkgcmV0dXJuIG91dC5tb2R1bGVzLl9fY2FjaGVfXy5jb21tb25bcHJvcF0gPSBtb2R1bGVzLmNvbW1vbltwcm9wXTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtb2R1bGVzLmNvbW1vbltwcm9wXTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pLFxyXG4gICAgICBjdXN0b206IG5ldyBQcm94eSh7fSwge1xyXG4gICAgICAgIGdldChfLCBwcm9wKSB7XHJcbiAgICAgICAgICBpZiAodHlwZW9mIG91dC5tb2R1bGVzLl9fY2FjaGVfXy5jdXN0b21bcHJvcF0gIT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBvdXQubW9kdWxlcy5fX2NhY2hlX18uY3VzdG9tW3Byb3BdO1xyXG4gICAgICAgICAgbGV0IGRhdGEgPSBtYW5pZmVzdD8uYXBpPy5tb2R1bGVzPy5jdXN0b20/LnNvbWU/LihpID0+IGkubmFtZSA9PT0gcHJvcCk7XHJcbiAgICAgICAgICBpZiAoIWRhdGEpIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgaWYgKGRhdGEubGF6eSkge1xyXG4gICAgICAgICAgICBsZXQgcHJvbSA9IG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgICBsZXQgciA9IGF3YWl0IG1vZHVsZXMud2VicGFjay5sYXp5RmluZEJ5RmluZGVyKGRhdGEuZmluZGVyKTtcclxuICAgICAgICAgICAgICBvdXQubW9kdWxlcy5fX2NhY2hlX18uY3VzdG9tTGF6eVtwcm9wXSA9IHI7XHJcbiAgICAgICAgICAgICAgcmVzb2x2ZShyKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG91dC5tb2R1bGVzLl9fY2FjaGVfXy5jdXN0b21bcHJvcF0gPSB7XHJcbiAgICAgICAgICAgICAgZ2V0KCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb207XHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBnZXQgdmFsdWUoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb3V0Lm1vZHVsZXMuX19jYWNoZV9fLmN1c3RvbUxhenlbcHJvcF07XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IHZhbHVlID0gbW9kdWxlcy53ZWJwYWNrLmZpbmRCeUZpbmRlcihkYXRhLmZpbmRlcik7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZT8udmFsdWUgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgIG91dC5tb2R1bGVzLl9fY2FjaGVfXy5jdXN0b21bcHJvcF0gPSB2YWx1ZSA/IE9iamVjdC5hc3NpZ24odmFsdWUsIHsgdmFsdWUsIGdldCgpIHsgcmV0dXJuIHZhbHVlIH0gfSkgOiBudWxsO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBvdXQubW9kdWxlcy5fX2NhY2hlX18uY3VzdG9tW3Byb3BdID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGNhdGNoIHtcclxuICAgICAgICAgICAgICBvdXQubW9kdWxlcy5fX2NhY2hlX18uY3VzdG9tW3Byb3BdID0gdmFsdWUgPyB7IHZhbHVlLCBnZXQoKSB7IHJldHVybiB2YWx1ZSB9IH0gOiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gb3V0Lm1vZHVsZXMuX19jYWNoZV9fLmN1c3RvbVtwcm9wXTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pLFxyXG4gICAgICBnZXQgbmF0aXZlKCkge1xyXG4gICAgICAgIGlmIChtYW5pZmVzdD8ubW9kdWxlcz8ubmF0aXZlIHx8IGRldk1vZGUpIHJldHVybiBtb2R1bGVzLm5hdGl2ZTtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBleHRlbnNpb246IHtcclxuICAgICAgbWFuaWZlc3QsXHJcbiAgICAgIHBlcnNpc3QsXHJcbiAgICAgIGkxOG46IGF3YWl0IGJ1aWxkRXh0ZW5zaW9uSTE4TihtYW5pZmVzdCksXHJcbiAgICAgIGV2ZW50czogbmV3IEJhc2ljRXZlbnRFbWl0dGVyKCksXHJcbiAgICAgIHN1YnNjcmlwdGlvbnM6IFtdXHJcbiAgICB9LFxyXG4gICAgZ2V0IGkxOG4oKSB7XHJcbiAgICAgIGlmIChtYW5pZmVzdD8uYXBpPy5pMThuIHx8IGRldk1vZGUpIHJldHVybiBpMThuO1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH0sXHJcbiAgICBnZXQgcGF0Y2hlcigpIHtcclxuICAgICAgaWYgKG1hbmlmZXN0Py5hcGk/LnBhdGNoZXIgfHwgZGV2TW9kZSkgcmV0dXJuIHBhdGNoZXI7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfSxcclxuICAgIGdldCBldmVudHMoKSB7XHJcbiAgICAgIGlmIChtYW5pZmVzdD8uYXBpPy5ldmVudHMgfHwgZGV2TW9kZSkgcmV0dXJuIGV2ZW50cztcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9LFxyXG4gICAgZ2V0IHN0b3JhZ2UoKSB7XHJcbiAgICAgIGlmIChtYW5pZmVzdD8uYXBpPy5zdG9yYWdlIHx8IGRldk1vZGUpIHJldHVybiBzdG9yYWdlO1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH0sXHJcbiAgICBnZXQgd2Vic29ja2V0KCkge1xyXG4gICAgICBpZiAobWFuaWZlc3Q/LmFwaT8ud2Vic29ja2V0IHx8IGRldk1vZGUpIHJldHVybiB3ZWJzb2NrZXQ7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfSxcclxuICAgIGdldCB1aSgpIHtcclxuICAgICAgaWYgKG1hbmlmZXN0Py5hcGk/LnVpIHx8IGRldk1vZGUpIHJldHVybiB1aTtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9LFxyXG4gICAgZ2V0IHV0aWxzKCkge1xyXG4gICAgICBpZiAobWFuaWZlc3Q/LmFwaT8udXRpbHMgfHwgZGV2TW9kZSkgcmV0dXJuIHV0aWxzO1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH0sXHJcbiAgICBnZXQgZG9tKCkge1xyXG4gICAgICBpZiAobWFuaWZlc3Q/LmFwaT8uZG9tIHx8IGRldk1vZGUpIHJldHVybiBkb207XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfSxcclxuICAgIGdldCBkZXYoKSB7XHJcbiAgICAgIGlmIChtYW5pZmVzdD8uYXBpPy5kZXYgfHwgZGV2TW9kZSkgcmV0dXJuIGRldjtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIG91dDtcclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd0NvbmZpcm1hdGlvbk1vZGFsKCkge1xyXG5cclxufVxyXG5cclxuY29uc3Qgb3V0ID0ge1xyXG4gIF9fY2FjaGVfXzoge1xyXG4gICAgaW5pdGlhbGl6ZWQ6IGZhbHNlLFxyXG4gICAgbG9hZGVkOiBuZXN0cy5tYWtlKHt9KVxyXG4gIH0sXHJcbiAgc3RvcmFnZToge1xyXG4gICAgLyoqIEB0eXBlIHtuZXN0cy5OZXN0fSAqL1xyXG4gICAgaW5zdGFsbGVkOiB7fVxyXG4gIH0sXHJcbiAgYXN5bmMgaW5pdCgpIHtcclxuICAgIGlmIChvdXQuX19jYWNoZV9fLmluaXRpYWxpemVkKSByZXR1cm47XHJcbiAgICBvdXQuX19jYWNoZV9fLmluaXRpYWxpemVkID0gdHJ1ZTtcclxuICAgIG91dC5zdG9yYWdlLmluc3RhbGxlZCA9IGF3YWl0IHN0b3JhZ2UuY3JlYXRlUGVyc2lzdE5lc3QoXCJFeHRlbnNpb25zO0luc3RhbGxlZFwiKTtcclxuICB9LFxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgXHJcbiAgICovXHJcbiAgYXN5bmMgaW5zdGFsbCh1cmwsIGRlZmF1bHRDb25maWcgPSB7fSkge1xyXG4gICAgaWYgKCFvdXQuX19jYWNoZV9fLmluaXRpYWxpemVkKSBhd2FpdCBvdXQuaW5pdCgpO1xyXG4gICAgaWYgKHVybC5lbmRzV2l0aChcIi9cIikpIHVybCA9IHVybC5zbGljZSgwLCAtMSk7XHJcbiAgICBpZiAob3V0LnN0b3JhZ2UuaW5zdGFsbGVkLmdob3N0W3VybF0pIHRocm93IG5ldyBFcnJvcihgXCIke3VybH1cIiBleHRlbnNpb24gaXMgYWxyZWFkeSBpbnN0YWxsZWQuYCk7XHJcblxyXG4gICAgbGV0IG1ldGFSZXNwID0gYXdhaXQgZmV0Y2goYCR7dXJsfS9tYW5pZmVzdC5qc29uYCk7XHJcbiAgICBpZiAobWV0YVJlc3Auc3RhdHVzICE9PSAyMDApIHRocm93IG5ldyBFcnJvcihgXCIke3VybH1cIiBleHRlbnNpb24gbWFuaWZlc3QgaXMgbm90IHJlc3BvbmRlZCB3aXRoIDIwMCBzdGF0dXMgY29kZS5gKTtcclxuICAgIGxldCBtYW5pZmVzdCA9IGF3YWl0IG1ldGFSZXNwLmpzb24oKTtcclxuXHJcbiAgICBsZXQgcmVhZG1lUmVzcCA9IGF3YWl0IGZldGNoKGAke3VybH0vcmVhZG1lLm1kYCk7XHJcbiAgICBsZXQgcmVhZG1lID0gcmVhZG1lUmVzcC5zdGF0dXMgPT09IDIwMCA/IGF3YWl0IHJlYWRtZVJlc3AudGV4dCgpIDogbnVsbDtcclxuXHJcbiAgICAvLyBUT0RPOiBTaG93IG1vZGFsIGZvciB1c2VyIHRvIGFjY2VwdCB0aGUgZXh0ZW5zaW9uICh0ZXJtcywgcHJpdmFjeSwgZXRjLilcclxuICAgIGF3YWl0IHNob3dDb25maXJtYXRpb25Nb2RhbCh7XHJcbiAgICAgIG1hbmlmZXN0LFxyXG4gICAgICByZWFkbWUsXHJcbiAgICAgIGNvbmZpZzoge1xyXG4gICAgICAgIGF1dG9VcGRhdGU6IHRydWUsXHJcbiAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICBvcmRlcjogMCxcclxuICAgICAgICAuLi5kZWZhdWx0Q29uZmlnXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGxldCBzb3VyY2VSZXNwID0gYXdhaXQgZmV0Y2goYCR7dXJsfS9zb3VyY2UuanNgKTtcclxuICAgIGlmIChzb3VyY2VSZXNwLnN0YXR1cyAhPT0gMjAwKSB0aHJvdyBuZXcgRXJyb3IoYFwiJHt1cmx9XCIgZXh0ZW5zaW9uIHNvdXJjZSBpcyBub3QgcmVzcG9uZGVkIHdpdGggMjAwIHN0YXR1cyBjb2RlLmApO1xyXG4gICAgbGV0IHNvdXJjZSA9IGF3YWl0IHNvdXJjZVJlc3AudGV4dCgpO1xyXG5cclxuICAgIG91dC5zdG9yYWdlLmluc3RhbGxlZC5zdG9yZVt1cmxdID0ge1xyXG4gICAgICBtYW5pZmVzdCxcclxuICAgICAgc291cmNlLFxyXG4gICAgICByZWFkbWUsXHJcbiAgICAgIGNvbmZpZzoge1xyXG4gICAgICAgIGF1dG9VcGRhdGU6IHRydWUsXHJcbiAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICBvcmRlcjogMCxcclxuICAgICAgICAuLi5kZWZhdWx0Q29uZmlnXHJcbiAgICAgIH0sXHJcbiAgICAgIGV4dHJhOiB7XHJcbiAgICAgICAgbGFzdFVwZGF0ZWRBdDogRGF0ZS5ub3coKVxyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGF3YWl0IG91dC5sb2FkKHVybCk7XHJcbiAgfSxcclxuICBhc3luYyB1cGRhdGUodXJsKSB7XHJcbiAgICBpZiAoIW91dC5fX2NhY2hlX18uaW5pdGlhbGl6ZWQpIGF3YWl0IG91dC5pbml0KCk7XHJcbiAgICBpZiAodXJsLmVuZHNXaXRoKFwiL1wiKSkgdXJsID0gdXJsLnNsaWNlKDAsIC0xKTtcclxuICAgIGlmICghb3V0LnN0b3JhZ2UuaW5zdGFsbGVkLmdob3N0W3VybF0pIHRocm93IG5ldyBFcnJvcihgXCIke3VybH1cIiBleHRlbnNpb24gaXMgbm90IGluc3RhbGxlZC5gKTtcclxuICAgIGlmIChvdXQuX19jYWNoZV9fLmxvYWRlZC5naG9zdFt1cmxdKSB0aHJvdyBuZXcgRXJyb3IoYFwiJHt1cmx9XCIgZXh0ZW5zaW9uIGlzIGxvYWRlZC4gUGxlYXNlIHVubG9hZCBpdCBmaXJzdC5gKTtcclxuXHJcbiAgICBsZXQgZGF0YSA9IG91dC5zdG9yYWdlLmluc3RhbGxlZC5naG9zdFt1cmxdO1xyXG5cclxuICAgIGxldCBtZXRhUmVzcCA9IGF3YWl0IGZldGNoKGAke3VybH0vbWFuaWZlc3QuanNvbmApO1xyXG4gICAgaWYgKG1ldGFSZXNwLnN0YXR1cyAhPT0gMjAwKSB0aHJvdyBuZXcgRXJyb3IoYFwiJHt1cmx9XCIgZXh0ZW5zaW9uIG1hbmlmZXN0IGlzIG5vdCByZXNwb25kZWQgd2l0aCAyMDAgc3RhdHVzIGNvZGUuYCk7XHJcbiAgICBsZXQgbWFuaWZlc3QgPSBhd2FpdCBtZXRhUmVzcC5qc29uKCk7XHJcblxyXG4gICAgaWYgKGRhdGEubWFuaWZlc3QuaGFzaCA9PT0gbWFuaWZlc3QuaGFzaCkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgIGxldCByZWFkbWVSZXNwID0gYXdhaXQgZmV0Y2goYCR7dXJsfS9yZWFkbWUubWRgKTtcclxuICAgIGxldCByZWFkbWUgPSByZWFkbWVSZXNwLnN0YXR1cyA9PT0gMjAwID8gYXdhaXQgcmVhZG1lUmVzcC50ZXh0KCkgOiBudWxsO1xyXG5cclxuICAgIGxldCBzb3VyY2VSZXNwID0gYXdhaXQgZmV0Y2goYCR7dXJsfS9zb3VyY2UuanNgKTtcclxuICAgIGlmIChzb3VyY2VSZXNwLnN0YXR1cyAhPT0gMjAwKSB0aHJvdyBuZXcgRXJyb3IoYFwiJHt1cmx9XCIgZXh0ZW5zaW9uIHNvdXJjZSBpcyBub3QgcmVzcG9uZGVkIHdpdGggMjAwIHN0YXR1cyBjb2RlLmApO1xyXG4gICAgbGV0IHNvdXJjZSA9IGF3YWl0IHNvdXJjZVJlc3AudGV4dCgpO1xyXG5cclxuICAgIG91dC5zdG9yYWdlLmluc3RhbGxlZC5zdG9yZVt1cmxdID0ge1xyXG4gICAgICBtYW5pZmVzdCxcclxuICAgICAgc291cmNlLFxyXG4gICAgICByZWFkbWUsXHJcbiAgICAgIGNvbmZpZzogZGF0YS5jb25maWcsXHJcbiAgICAgIGV4dHJhOiB7XHJcbiAgICAgICAgbGFzdFVwZGF0ZWRBdDogRGF0ZS5ub3coKVxyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH0sXHJcbiAgYXN5bmMgdW5pbnN0YWxsKHVybCkge1xyXG4gICAgaWYgKCFvdXQuX19jYWNoZV9fLmluaXRpYWxpemVkKSBhd2FpdCBvdXQuaW5pdCgpO1xyXG4gICAgaWYgKHVybC5lbmRzV2l0aChcIi9cIikpIHVybCA9IHVybC5zbGljZSgwLCAtMSk7XHJcbiAgICBpZiAoIW91dC5zdG9yYWdlLmluc3RhbGxlZC5naG9zdFt1cmxdKSB0aHJvdyBuZXcgRXJyb3IoYFwiJHt1cmx9XCIgZXh0ZW5zaW9uIGlzIG5vdCBpbnN0YWxsZWQuYCk7XHJcblxyXG4gICAgZGVsZXRlIG91dC5zdG9yYWdlLmluc3RhbGxlZC5zdG9yZVt1cmxdO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGF3YWl0IG91dC51bmxvYWQodXJsKTtcclxuICAgIH0gY2F0Y2ggeyB9XHJcbiAgfSxcclxuICBhc3luYyBsb2FkKHVybCkge1xyXG4gICAgaWYgKCFvdXQuX19jYWNoZV9fLmluaXRpYWxpemVkKSBhd2FpdCBvdXQuaW5pdCgpO1xyXG4gICAgaWYgKHVybC5lbmRzV2l0aChcIi9cIikpIHVybCA9IHVybC5zbGljZSgwLCAtMSk7XHJcbiAgICBpZiAoIW91dC5zdG9yYWdlLmluc3RhbGxlZC5naG9zdFt1cmxdKSB0aHJvdyBuZXcgRXJyb3IoYFwiJHt1cmx9XCIgZXh0ZW5zaW9uIGlzIG5vdCBpbnN0YWxsZWQuYCk7XHJcbiAgICBsZXQgZGF0YSA9IG91dC5zdG9yYWdlLmluc3RhbGxlZC5naG9zdFt1cmxdO1xyXG5cclxuICAgIGlmIChvdXQuX19jYWNoZV9fLmxvYWRlZC5naG9zdFt1cmxdKSB0aHJvdyBuZXcgRXJyb3IoYFwiJHt1cmx9XCIgZXh0ZW5zaW9uIGlzIGFscmVhZHkgbG9hZGVkLmApO1xyXG5cclxuICAgIGF3YWl0IG91dC5sb2FkZXIubG9hZCh1cmwsIGRhdGEpO1xyXG4gIH0sXHJcbiAgYXN5bmMgdW5sb2FkKHVybCkge1xyXG4gICAgaWYgKCFvdXQuX19jYWNoZV9fLmluaXRpYWxpemVkKSBhd2FpdCBvdXQuaW5pdCgpO1xyXG4gICAgaWYgKHVybC5lbmRzV2l0aChcIi9cIikpIHVybCA9IHVybC5zbGljZSgwLCAtMSk7XHJcbiAgICBpZiAoIW91dC5zdG9yYWdlLmluc3RhbGxlZC5naG9zdFt1cmxdKSB0aHJvdyBuZXcgRXJyb3IoYFwiJHt1cmx9XCIgZXh0ZW5zaW9uIGlzIG5vdCBpbnN0YWxsZWQuYCk7XHJcblxyXG4gICAgaWYgKCFvdXQuX19jYWNoZV9fLmxvYWRlZC5naG9zdFt1cmxdKSB0aHJvdyBuZXcgRXJyb3IoYFwiJHt1cmx9XCIgZXh0ZW5zaW9uIGlzIG5vdCBsb2FkZWQuYCk7XHJcblxyXG4gICAgYXdhaXQgb3V0LmxvYWRlci51bmxvYWQodXJsKTtcclxuICB9LFxyXG4gIGV2YWx1YXRlKHNvdXJjZSwgYXBpKSB7XHJcbiAgICBjb25zdCAkYWNvcmQgPSBhcGk7XHJcbiAgICByZXR1cm4gZXZhbChzb3VyY2UpO1xyXG4gIH0sXHJcbiAgYXN5bmMgbG9hZEFsbCgpIHtcclxuICAgIGlmICghb3V0Ll9fY2FjaGVfXy5pbml0aWFsaXplZCkgYXdhaXQgb3V0LmluaXQoKTtcclxuICAgIHJldHVybiBQcm9taXNlLmFsbChPYmplY3QuZW50cmllcyhvdXQuc3RvcmFnZS5pbnN0YWxsZWQuZ2hvc3QpLnNvcnQoKFssIGFdLCBbLCBiXSkgPT4gYi5jb25maWcub3JkZXIgLSBhLmNvbmZpZy5vcmRlcikubWFwKGFzeW5jIChbdXJsLCBkXSkgPT4ge1xyXG4gICAgICBpZiAoZC5jb25maWcuYXV0b1VwZGF0ZSkgYXdhaXQgb3V0LnVwZGF0ZSh1cmwpO1xyXG4gICAgICBpZiAoZC5jb25maWcuZW5hYmxlZCkgYXdhaXQgb3V0LmxvYWQodXJsKTtcclxuICAgIH0pKTtcclxuICB9LFxyXG4gIGFzeW5jIHVubG9hZEFsbCgpIHtcclxuICAgIGlmICghb3V0Ll9fY2FjaGVfXy5pbml0aWFsaXplZCkgYXdhaXQgb3V0LmluaXQoKTtcclxuICAgIHJldHVybiBQcm9taXNlLmFsbChPYmplY3Qua2V5cyhvdXQuX19jYWNoZV9fLmxvYWRlZC5naG9zdCkubWFwKHVybCA9PiBvdXQudW5sb2FkKHVybCkpKTtcclxuICB9LFxyXG4gIGdldCh1cmwpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGxvYWRlZDogb3V0Ll9fY2FjaGVfXy5sb2FkZWQuZ2hvc3RbdXJsXSxcclxuICAgICAgaW5zdGFsbGVkOiBvdXQuc3RvcmFnZS5pbnN0YWxsZWQuZ2hvc3RbdXJsXVxyXG4gICAgfTtcclxuICB9LFxyXG4gIGxvYWRlcjoge1xyXG4gICAgYXN5bmMgbG9hZChpZCwgZGF0YSkge1xyXG4gICAgICBpZiAoZGF0YS5tYW5pZmVzdC50eXBlID09PSAncGx1Z2luJykge1xyXG4gICAgICAgIGxldCBhcGkgPSBhd2FpdCBidWlsZFBsdWdpbkFQSShkYXRhLm1hbmlmZXN0LCBgRXh0ZW5zaW9uO1BlcnNpc3Q7JHtpZH1gKTtcclxuICAgICAgICBpZiAoYXBpLmV4dGVuc2lvbi5wZXJzaXN0Lmdob3N0LnNldHRpbmdzID09PSB1bmRlZmluZWQpIGFwaS5leHRlbnNpb24ucGVyc2lzdC5zdG9yZS5zZXR0aW5ncyA9IHt9O1xyXG4gICAgICAgIGZpbmRJblRyZWUoZGF0YS5tYW5pZmVzdC5jb25maWcsIChpKSA9PiBpLmlkLCB7IGFsbDogdHJ1ZSB9KS5mb3JFYWNoKFxyXG4gICAgICAgICAgKGkpID0+IHtcclxuICAgICAgICAgICAgYXBpLmV4dGVuc2lvbi5wZXJzaXN0LnN0b3JlLnNldHRpbmdzW2kuaWRdID8/PSBpLmRlZmF1bHQ7XHJcbiAgICAgICAgICAgIGlmIChpLmhhc093blByb3BlcnR5KFwidmFsdWVcIikpIGkudmFsdWUgPz89IGFwaS5leHRlbnNpb24ucGVyc2lzdC5zdG9yZS5zZXR0aW5nc1tpLmlkXTtcclxuICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBsZXQgZXZhbHVhdGVkID0gb3V0LmV2YWx1YXRlKGRhdGEuc291cmNlLCBhcGkpO1xyXG4gICAgICAgIGF3YWl0IGV2YWx1YXRlZD8ubG9hZD8uKCk7XHJcbiAgICAgICAgY29uc3Qgb2ZmQ29uZmlnTGlzdGVuZXIgPVxyXG4gICAgICAgICAgZXZlbnRzLm9uKFwiZXh0ZW5zaW9uLWNvbmZpZy1pbnRlcmFjdGlvblwiLCAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5leHRlbnNpb24gIT09IGlkKSByZXR1cm47XHJcbiAgICAgICAgICAgIGlmIChkYXRhLml0ZW0uaWQpIHtcclxuICAgICAgICAgICAgICBhcGkuZXh0ZW5zaW9uLnBlcnNpc3Quc3RvcmUuc2V0dGluZ3NbZGF0YS5pdGVtLmlkXSA9IGRhdGEuaXRlbS52YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBldmFsdWF0ZWQ/LmNvbmZpZz8uKHtcclxuICAgICAgICAgICAgICBpdGVtOiBkYXRhLml0ZW0sXHJcbiAgICAgICAgICAgICAgZGF0YTogZGF0YS5kYXRhLFxyXG4gICAgICAgICAgICAgIGdldEl0ZW0oaXRlbUlkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmluZEluVHJlZShkYXRhLm1hbmlmZXN0LmNvbmZpZywgKGkpID0+IGkuaWQgPT09IGl0ZW1JZCk7XHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBnZXRJdGVtcygpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmaW5kSW5UcmVlKGRhdGEubWFuaWZlc3QuY29uZmlnLCAoaSkgPT4gaS5pZCwgeyBhbGw6IHRydWUgfSk7XHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBzYXZlKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFkYXRhLml0ZW0uaWQpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGFwaS5leHRlbnNpb24ucGVyc2lzdC5zdG9yZS5zZXR0aW5nc1tkYXRhLml0ZW0uaWRdID0gZGF0YS5pdGVtLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIGZ1bmN0aW9uIHVubG9hZCgpIHtcclxuICAgICAgICAgIG9mZkNvbmZpZ0xpc3RlbmVyKCk7XHJcbiAgICAgICAgICBhcGkuZXh0ZW5zaW9uLnN1YnNjcmlwdGlvbnMuZm9yRWFjaChpID0+IHsgaWYgKHR5cGVvZiBpID09PSBcImZ1bmN0aW9uXCIpIGkoKTsgfSk7XHJcbiAgICAgICAgICBhcGkuZXh0ZW5zaW9uLmV2ZW50cy5lbWl0KFwidW5sb2FkXCIpO1xyXG4gICAgICAgICAgZXZhbHVhdGVkPy51bmxvYWQ/LigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBvdXQuX19jYWNoZV9fLmxvYWRlZC5zdG9yZVtpZF0gPSB7IGV2YWx1YXRlZCwgYXBpLCB1bmxvYWQgfTtcclxuICAgICAgICByZXR1cm4geyBldmFsdWF0ZWQsIGFwaSwgdW5sb2FkIH07XHJcbiAgICAgIH0gZWxzZSBpZiAoZGF0YS5tYW5pZmVzdC50eXBlID09PSAndGhlbWUnKSB7XHJcbiAgICAgICAgbGV0IGV2YWx1YXRlZCA9IG91dC5ldmFsdWF0ZShkYXRhLnNvdXJjZSwgbnVsbCk7XHJcbiAgICAgICAgY29uc3QgcGVyc2lzdCA9IGF3YWl0IHN0b3JhZ2UuY3JlYXRlUGVyc2lzdE5lc3QoYEV4dGVuc2lvbjtQZXJzaXN0OyR7aWR9YCk7XHJcbiAgICAgICAgaWYgKHBlcnNpc3QuZ2hvc3Quc2V0dGluZ3MgPT09IHVuZGVmaW5lZCkgcGVyc2lzdC5zdG9yZS5zZXR0aW5ncyA9IHt9O1xyXG4gICAgICAgIGZpbmRJblRyZWUoZGF0YS5tYW5pZmVzdC5jb25maWcsIChpKSA9PiBpLmlkLCB7IGFsbDogdHJ1ZSB9KS5mb3JFYWNoKFxyXG4gICAgICAgICAgKGkpID0+IHtcclxuICAgICAgICAgICAgcGVyc2lzdC5zdG9yZS5zZXR0aW5nc1tpLmlkXSA/Pz0gaS5kZWZhdWx0O1xyXG4gICAgICAgICAgICBpZiAoaS5oYXNPd25Qcm9wZXJ0eShcInZhbHVlXCIpKSBpLnZhbHVlID8/PSBwZXJzaXN0LnN0b3JlLnNldHRpbmdzW2kuaWRdO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgbGV0IGNzc1RleHQgPSBldmFsdWF0ZWQoKTtcclxuICAgICAgICBsZXQgaW5qZWN0ZWRSZXMgPSBwYXRjaGVyLmluamVjdENTUyhjc3NUZXh0LCBwZXJzaXN0Lmdob3N0LnNldHRpbmdzKTtcclxuXHJcbiAgICAgICAgY29uc3Qgb2ZmQ29uZmlnTGlzdGVuZXIgPVxyXG4gICAgICAgICAgZXZlbnRzLm9uKFwiZXh0ZW5zaW9uLWNvbmZpZy1pbnRlcmFjdGlvblwiLCAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5leHRlbnNpb24gIT09IGlkKSByZXR1cm47XHJcbiAgICAgICAgICAgIGlmICghZGF0YS5jb25maWcuaWQpIHJldHVybjtcclxuICAgICAgICAgICAgcGVyc2lzdC5zdG9yZS5zZXR0aW5nc1tkYXRhLmNvbmZpZy5pZF0gPSBkYXRhLmRhdGEudmFsdWU7XHJcbiAgICAgICAgICAgIGluamVjdGVkUmVzKHBlcnNpc3QuZ2hvc3Quc2V0dGluZ3MpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgZnVuY3Rpb24gdW5sb2FkKCkge1xyXG4gICAgICAgICAgb2ZmQ29uZmlnTGlzdGVuZXIoKTtcclxuICAgICAgICAgIGluamVjdGVkUmVzKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvdXQuX19jYWNoZV9fLmxvYWRlZC5zdG9yZVtpZF0gPSB7IGV2YWx1YXRlZCwgdW5sb2FkIH07XHJcbiAgICAgICAgcmV0dXJuIHsgZXZhbHVhdGVkLCB1bmxvYWQgfTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIHVubG9hZChpZCkge1xyXG4gICAgICBvdXQuX19jYWNoZV9fLmxvYWRlZC5naG9zdD8uW2lkXT8udW5sb2FkPy4oKTtcclxuICAgICAgZGVsZXRlIG91dC5fX2NhY2hlX18ubG9hZGVkLnN0b3JlW2lkXTtcclxuICAgIH1cclxuICB9XHJcbn07XHJcblxyXG53YWl0VW50aWxDb25uZWN0aW9uT3BlbigpLnRoZW4oYXN5bmMgKCkgPT4ge1xyXG4gIGF3YWl0IHV0aWxzLnNsZWVwKDEwMCk7XHJcbiAgb3V0LmxvYWRBbGwoKTtcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBvdXQ7IiwgImltcG9ydCB7IHdhaXRVbnRpbENvbm5lY3Rpb25PcGVuIH0gZnJvbSBcIi4uLy4uL290aGVyL3V0aWxzLmpzXCI7XHJcbmltcG9ydCBjb21tb24gZnJvbSBcIi4uL21vZHVsZXMvY29tbW9uLmpzXCI7XHJcbmltcG9ydCBwYXRjaGVyIGZyb20gXCIuLi9wYXRjaGVyL2luZGV4LmpzXCI7XHJcblxyXG5jb25zdCBzb2NrZXRzID0gbmV3IFNldCgpO1xyXG5jb25zdCBoYW5kbGVycyA9IG5ldyBNYXAoKTtcclxuXHJcbndhaXRVbnRpbENvbm5lY3Rpb25PcGVuKCkudGhlbigoKSA9PiB7XHJcbiAgcGF0Y2hlci5pbnN0ZWFkKFxyXG4gICAgXCJoYW5kbGVDb25uZWN0aW9uXCIsXHJcbiAgICBjb21tb24uV2ViU29ja2V0LFxyXG4gICAgKGFyZ3MsIG9yaWcpID0+IHtcclxuICAgICAgY29uc3Qgd3MgPSBhcmdzWzBdO1xyXG4gICAgICBpZiAod3MudXBncmFkZVJlcSgpLnVybCAhPT0gXCIvYWNvcmRcIikgcmV0dXJuIG9yaWcoLi4uYXJncyk7XHJcblxyXG4gICAgICBzb2NrZXRzLmFkZCh3cyk7XHJcblxyXG4gICAgICB3cy5vbihcIm1lc3NhZ2VcIiwgYXN5bmMgKG1zZykgPT4ge1xyXG4gICAgICAgIGxldCBqc29uO1xyXG5cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAganNvbiA9IEpTT04ucGFyc2UobXNnKTtcclxuICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShqc29uKSB8fCBqc29uLmxlbmd0aCA8IDEgfHwganNvbi5sZW5ndGggPiAzKVxyXG4gICAgICAgICAgICB0aHJvdyBcIkFycmF5IGV4cGVjdGVkIGFzIG1lc3NhZ2UuXCI7XHJcbiAgICAgICAgICBpZiAodHlwZW9mIGpzb25bMF0gIT0gXCJzdHJpbmdcIikgdGhyb3cgXCJBcnJheVswXSBuZWVkcyB0byBiZSBzdHJpbmcuXCI7XHJcbiAgICAgICAgICBpZiAodHlwZW9mIGpzb25bMV0gIT0gXCJzdHJpbmdcIikgdGhyb3cgXCJBcnJheVsxXSBuZWVkcyB0byBiZSBzdHJpbmcuXCI7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICB3cy5zZW5kKFxyXG4gICAgICAgICAgICBKU09OLnN0cmluZ2lmeShbXHJcbiAgICAgICAgICAgICAgbnVsbCxcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBvazogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBlcnJvcjogYCR7ZXJyfWAsXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXSlcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBbZXZlbnRJZCwgZXZlbnROYW1lLCBldmVudERhdGFdID0ganNvbjtcclxuXHJcbiAgICAgICAgY29uc3QgaGFuZGxlciA9IGhhbmRsZXJzLmdldChldmVudE5hbWUpO1xyXG5cclxuICAgICAgICBpZiAoIWhhbmRsZXIpXHJcbiAgICAgICAgICByZXR1cm4gd3Muc2VuZChcclxuICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoW1xyXG4gICAgICAgICAgICAgIGV2ZW50SWQsXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgb2s6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgZXJyb3I6IGBVbmFibGUgdG8gZmluZCBoYW5kbGVyLmAsXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXSlcclxuICAgICAgICAgICk7XHJcblxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICBsZXQgcmVzcG9uc2UgPSBhd2FpdCBoYW5kbGVyKGV2ZW50RGF0YSk7XHJcbiAgICAgICAgICB3cy5zZW5kKFxyXG4gICAgICAgICAgICBKU09OLnN0cmluZ2lmeShbXHJcbiAgICAgICAgICAgICAgZXZlbnRJZCxcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBvazogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHJlc3BvbnNlLFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIF0pXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgd3Muc2VuZChcclxuICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoW1xyXG4gICAgICAgICAgICAgIGV2ZW50SWQsXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgb2s6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgZXJyb3I6IGAke2Vycn1gLFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIF0pXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgICB3cy5vbihcImNsb3NlXCIsICgpID0+IHNvY2tldHMuZGVsZXRlKHdzKSk7XHJcbiAgICB9XHJcbiAgKTtcclxufSk7XHJcblxyXG5mdW5jdGlvbiBzZXQoZXZlbnROYW1lLCBjYWxsYmFjaykge1xyXG4gIGlmICh0eXBlb2YgZXZlbnROYW1lICE9IFwic3RyaW5nXCIpXHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJFdmVudE5hbWUgbmVlZHMgdG8gYmUgYSBzdHJpbmcuXCIpO1xyXG4gIGlmICh0eXBlb2YgY2FsbGJhY2sgIT0gXCJmdW5jdGlvblwiKVxyXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ2FsbGJhY2sgbmVlZHMgdG8gYmUgYSBmdW5jdGlvbi5cIik7XHJcbiAgaWYgKGhhbmRsZXJzLmhhcyhldmVudE5hbWUpKVxyXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiRXZlbnROYW1lIGFscmVhZHkgaW4gdXNlLlwiKTtcclxuICBoYW5kbGVycy5zZXQoZXZlbnROYW1lLCBjYWxsYmFjayk7XHJcbiAgcmV0dXJuICgpID0+IHtcclxuICAgIGhhbmRsZXJzLmRlbGV0ZShldmVudE5hbWUpO1xyXG4gIH07XHJcbn1cclxuZnVuY3Rpb24gdHJpZ2dlcihldmVudE5hbWUsIC4uLmFyZ3MpIHtcclxuICBpZiAoIXNvY2tldEV2ZW50cy5oYXMoZXZlbnROYW1lKSlcclxuICAgIHRocm93IG5ldyBFcnJvcihcIlVuYWJsZSB0byBmaW5kIGhhbmRsZXIhXCIpO1xyXG4gIHJldHVybiBzb2NrZXRFdmVudHMuZ2V0KGV2ZW50TmFtZSkoLi4uYXJncyk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBzZXQsXHJcbiAgdHJpZ2dlclxyXG59XHJcblxyXG4iLCAiZXhwb3J0IGRlZmF1bHQgYFxuLmFjb3JkLS1sYXllci1jb250YWluZXJ7LS10b3Atb2Zmc2V0OiAwcHg7d2lkdGg6MTAwdnc7aGVpZ2h0OmNhbGMoMTAwdmggLSB2YXIoLS10b3Atb2Zmc2V0KSk7ei1pbmRleDo5OTk5OTk5O3BvaW50ZXItZXZlbnRzOm5vbmU7cG9zaXRpb246YWJzb2x1dGU7dG9wOnZhcigtLXRvcC1vZmZzZXQpO2xlZnQ6MHB4fS5hY29yZC0tbGF5ZXItY29udGFpbmVyICp7ei1pbmRleDo5OTk5OTk5OTk5OTk5OX0uYWNvcmQtLXRvb2x0aXAtbGF5ZXJ7b3BhY2l0eTowO3RyYW5zaXRpb246NTBtcyBsaW5lYXIgb3BhY2l0eTtwb3NpdGlvbjphYnNvbHV0ZTtwb2ludGVyLWV2ZW50czpub25lfS5hY29yZC0tdG9vbHRpcC1sYXllci52aXNpYmxle29wYWNpdHk6MTtwb2ludGVyLWV2ZW50czphbGx9LmFjb3JkLS10b29sdGlwLnZlcnRpY2Fse3RyYW5zZm9ybTp0cmFuc2xhdGVYKC01MCUpfS5hY29yZC0tdG9vbHRpcC5ob3Jpem9udGFse3RyYW5zZm9ybTp0cmFuc2xhdGVZKC01MCUpfS5hY29yZC0tdG9hc3RzLWNvbnRhaW5lcntkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2p1c3RpZnktY29udGVudDpmbGV4LWVuZDtmbGV4LWRpcmVjdGlvbjpjb2x1bW47d2lkdGg6MTAwdnc7aGVpZ2h0OmNhbGMoMTAwdmggLSB2YXIoLS10b3Atb2Zmc2V0KSk7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7bGVmdDowO3BvaW50ZXItZXZlbnRzOm5vbmU7cGFkZGluZy1ib3R0b206MzJweH0uYWNvcmQtLXRvYXN0cy1jb250YWluZXIgLmFjb3JkLS10b2FzdHt0cmFuc2l0aW9uOnRyYW5zZm9ybSAyNTBtcyBlYXNlLWluLW91dCxvcGFjaXR5IDI1MG1zIGVhc2UtaW4tb3V0O2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7cG9pbnRlci1ldmVudHM6bm9uZTtib3JkZXItcmFkaXVzOjRweDtwYWRkaW5nOjhweDtib3gtc2hhZG93OjBweCAycHggOHB4IHJnYmEoMCwwLDAsLjI1KTtvcGFjaXR5OjE7Z2FwOjhweDtmb250LXNpemU6MTRweDttYXJnaW46NHB4fS5hY29yZC0tdG9hc3RzLWNvbnRhaW5lciAuYWNvcmQtLXRvYXN0IHN2Z3t3aWR0aDoxNnB4O2hlaWdodDoxNnB4fS5hY29yZC0tdG9hc3RzLWNvbnRhaW5lciAuYWNvcmQtLXRvYXN0LmNsaWNrYWJsZXtjdXJzb3I6cG9pbnRlcjtwb2ludGVyLWV2ZW50czphbGx9LmFjb3JkLS10b2FzdHMtY29udGFpbmVyIC5hY29yZC0tdG9hc3QuY2xvc2luZ3tvcGFjaXR5OjA7dHJhbnNmb3JtOnRyYW5zbGF0ZSgwLCAtNTBweCl9LmFjb3JkLS10b2FzdHMtY29udGFpbmVyIC5hY29yZC0tdG9hc3QuaGlkZGVue29wYWNpdHk6MDt0cmFuc2Zvcm06dHJhbnNsYXRlKDAsIDUwcHgpfS5hY29yZC0tdG9hc3RzLWNvbnRhaW5lciAuYWNvcmQtLXRvYXN0LnN0eWxlLWluZm97YmFja2dyb3VuZC1jb2xvcjojNGE4ZmUxO2NvbG9yOiNmNWY1ZjV9LmFjb3JkLS10b2FzdHMtY29udGFpbmVyIC5hY29yZC0tdG9hc3Quc3R5bGUtd2FybmluZ3tiYWNrZ3JvdW5kLWNvbG9yOiNmYWE4MWE7Y29sb3I6IzAwMH0uYWNvcmQtLXRvYXN0cy1jb250YWluZXIgLmFjb3JkLS10b2FzdC5zdHlsZS1lcnJvcntiYWNrZ3JvdW5kLWNvbG9yOiNlZDQyNDU7Y29sb3I6IzAwMH0uYWNvcmQtLXRvYXN0cy1jb250YWluZXIgLmFjb3JkLS10b2FzdC5zdHlsZS1zdWNjZXNze2JhY2tncm91bmQtY29sb3I6IzNiYTU1ZDtjb2xvcjojZjVmNWY1fS5hY29yZC0tdG9hc3RzLWNvbnRhaW5lciAuYWNvcmQtLXRvYXN0LnN0eWxlLWRlZmF1bHR7YmFja2dyb3VuZC1jb2xvcjojZjVmNWY1O2NvbG9yOiMwMDB9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXJ7d2lkdGg6MTAwdnc7aGVpZ2h0OmNhbGMoMTAwdmggLSB2YXIoLS10b3Atb2Zmc2V0KSk7ZGlzcGxheTpmbGV4O3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6MDtwb2ludGVyLWV2ZW50czpub25lfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyIC5hY29yZC0tbm90aWZpY2F0aW9ue2Rpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpjb2x1bW47cG9pbnRlci1ldmVudHM6YWxsO3RyYW5zaXRpb246dHJhbnNmb3JtIDI1MG1zIGVhc2UtaW4tb3V0LG9wYWNpdHkgMjUwbXMgZWFzZS1pbi1vdXQ7bWFyZ2luOjRweDtiYWNrZHJvcC1maWx0ZXI6Ymx1cigxNnB4KSBicmlnaHRuZXNzKDAuNzUpOy13ZWJraXQtYXBwLXJlZ2lvbjpuby1kcmFnOy0tYW5pbWF0aW9uLXNpemU6IDUwcHh9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24uaGlkZGVuLC5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyIC5hY29yZC0tbm90aWZpY2F0aW9uLmNsb3Npbmd7b3BhY2l0eTowfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyIC5hY29yZC0tbm90aWZpY2F0aW9uPi5jb250YWluZXJ7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2VlbjtwYWRkaW5nOjhweDtjb2xvcjojZmZmO21pbi13aWR0aDoyNTBweH0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllciAuYWNvcmQtLW5vdGlmaWNhdGlvbj4uY29udGFpbmVyPi5jbG9zZXt3aWR0aDoyNHB4O2hlaWdodDoyNHB4O2NvbG9yOiNmZmY7b3BhY2l0eTouNTtjdXJzb3I6cG9pbnRlcjttYXJnaW4tbGVmdDo4cHg7ei1pbmRleDo5OTk5OTk5OTl9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24+LmNvbnRhaW5lcj4uY2xvc2UuaGlkZGVue2Rpc3BsYXk6bm9uZX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllciAuYWNvcmQtLW5vdGlmaWNhdGlvbj4ucHJvZ3Jlc3MtY29udGFpbmVye3dpZHRoOjEwMCU7aGVpZ2h0OjVweH0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllciAuYWNvcmQtLW5vdGlmaWNhdGlvbj4ucHJvZ3Jlc3MtY29udGFpbmVyPi5wcm9ncmVzc3t3aWR0aDowJTtoZWlnaHQ6NXB4O3RyYW5zaXRpb246d2lkdGggdmFyKC0tZHVyYXRpb24pIGxpbmVhcjtiYWNrZ3JvdW5kLWNvbG9yOnZhcigtLWJhci1jb2xvcil9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24+LnByb2dyZXNzLWNvbnRhaW5lcj4ucHJvZ3Jlc3MucHJvZ3Jlc3Npbmd7d2lkdGg6MTAwJX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllciAuYWNvcmQtLW5vdGlmaWNhdGlvbi5zdHlsZS1pbmZvey0tYmFyLWNvbG9yOiAjNGE4ZmUxfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyIC5hY29yZC0tbm90aWZpY2F0aW9uLnN0eWxlLXdhcm5pbmd7LS1iYXItY29sb3I6ICNmYWE4MWF9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24uc3R5bGUtZXJyb3J7LS1iYXItY29sb3I6ICNlZDQyNDV9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24uc3R5bGUtc3VjY2Vzc3stLWJhci1jb2xvcjogIzNiYTU1ZH0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllciAuYWNvcmQtLW5vdGlmaWNhdGlvbi5zdHlsZS1kZWZhdWx0ey0tYmFyLWNvbG9yOiB3aGl0ZXNtb2tlfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLnRvcC1yaWdodHtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1lbmQ7YWxpZ24taXRlbXM6ZmxleC1zdGFydH0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci50b3AtcmlnaHQgLmFjb3JkLS1ub3RpZmljYXRpb24uaGlkZGVue3RyYW5zZm9ybTp0cmFuc2xhdGUoMCwgY2FsYyh2YXIoLS1hbmltYXRpb24tc2l6ZSkgKiAtMSkpfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLnRvcC1yaWdodCAuYWNvcmQtLW5vdGlmaWNhdGlvbi5jbG9zaW5ne3RyYW5zZm9ybTp0cmFuc2xhdGUoMCwgdmFyKC0tYW5pbWF0aW9uLXNpemUpKX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci50b3AtbGVmdHtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1zdGFydDthbGlnbi1pdGVtczpmbGV4LXN0YXJ0fS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLnRvcC1sZWZ0IC5hY29yZC0tbm90aWZpY2F0aW9uLmhpZGRlbnt0cmFuc2Zvcm06dHJhbnNsYXRlKDAsIGNhbGModmFyKC0tYW5pbWF0aW9uLXNpemUpICogLTEpKX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci50b3AtbGVmdCAuYWNvcmQtLW5vdGlmaWNhdGlvbi5jbG9zaW5ne3RyYW5zZm9ybTp0cmFuc2xhdGUoMCwgdmFyKC0tYW5pbWF0aW9uLXNpemUpKX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci5ib3R0b20tcmlnaHR7anVzdGlmeS1jb250ZW50OmZsZXgtZW5kO2FsaWduLWl0ZW1zOmZsZXgtZW5kfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLmJvdHRvbS1yaWdodCAuYWNvcmQtLW5vdGlmaWNhdGlvbi5oaWRkZW57dHJhbnNmb3JtOnRyYW5zbGF0ZSgwLCB2YXIoLS1hbmltYXRpb24tc2l6ZSkpfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLmJvdHRvbS1yaWdodCAuYWNvcmQtLW5vdGlmaWNhdGlvbi5jbG9zaW5ne3RyYW5zZm9ybTp0cmFuc2xhdGUoMCwgY2FsYyh2YXIoLS1hbmltYXRpb24tc2l6ZSkgKiAtMSkpfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLmJvdHRvbS1sZWZ0e2p1c3RpZnktY29udGVudDpmbGV4LXN0YXJ0O2FsaWduLWl0ZW1zOmZsZXgtZW5kfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLmJvdHRvbS1sZWZ0IC5hY29yZC0tbm90aWZpY2F0aW9uLmhpZGRlbnt0cmFuc2Zvcm06dHJhbnNsYXRlKDAsIHZhcigtLWFuaW1hdGlvbi1zaXplKSl9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIuYm90dG9tLWxlZnQgLmFjb3JkLS1ub3RpZmljYXRpb24uY2xvc2luZ3t0cmFuc2Zvcm06dHJhbnNsYXRlKDAsIGNhbGModmFyKC0tYW5pbWF0aW9uLXNpemUpICogLTEpKX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci50b3AtY2VudGVye2p1c3RpZnktY29udGVudDpjZW50ZXI7YWxpZ24taXRlbXM6ZmxleC1zdGFydH0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci50b3AtY2VudGVyIC5hY29yZC0tbm90aWZpY2F0aW9uLmhpZGRlbnt0cmFuc2Zvcm06dHJhbnNsYXRlKDAsIGNhbGModmFyKC0tYW5pbWF0aW9uLXNpemUpICogLTEpKX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci50b3AtY2VudGVyIC5hY29yZC0tbm90aWZpY2F0aW9uLmNsb3Npbmd7dHJhbnNmb3JtOnRyYW5zbGF0ZSgwLCB2YXIoLS1hbmltYXRpb24tc2l6ZSkpfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLmJvdHRvbS1jZW50ZXJ7anVzdGlmeS1jb250ZW50OmNlbnRlcjthbGlnbi1pdGVtczpmbGV4LWVuZH0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci5ib3R0b20tY2VudGVyIC5hY29yZC0tbm90aWZpY2F0aW9uLmhpZGRlbnt0cmFuc2Zvcm06dHJhbnNsYXRlKDAsIHZhcigtLWFuaW1hdGlvbi1zaXplKSl9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIuYm90dG9tLWNlbnRlciAuYWNvcmQtLW5vdGlmaWNhdGlvbi5jbG9zaW5ne3RyYW5zZm9ybTp0cmFuc2xhdGUoMCwgY2FsYyh2YXIoLS1hbmltYXRpb24tc2l6ZSkgKiAtMSkpfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLmNlbnRlcntqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO2FsaWduLWl0ZW1zOmNlbnRlcn0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci5jZW50ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24uaGlkZGVue3RyYW5zZm9ybTpzY2FsZSgwLjUpfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLmNlbnRlciAuYWNvcmQtLW5vdGlmaWNhdGlvbi5jbG9zaW5ne3RyYW5zZm9ybTpzY2FsZSgwLjUpfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLmxlZnQtY2VudGVye2p1c3RpZnktY29udGVudDpmbGV4LXN0YXJ0O2FsaWduLWl0ZW1zOmNlbnRlcn0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci5sZWZ0LWNlbnRlciAuYWNvcmQtLW5vdGlmaWNhdGlvbi5oaWRkZW57dHJhbnNmb3JtOnRyYW5zbGF0ZShjYWxjKHZhcigtLWFuaW1hdGlvbi1zaXplKSAqIC0xKSwgMCl9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIubGVmdC1jZW50ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24uY2xvc2luZ3t0cmFuc2Zvcm06dHJhbnNsYXRlKHZhcigtLWFuaW1hdGlvbi1zaXplKSwgMCl9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIucmlnaHQtY2VudGVye2p1c3RpZnktY29udGVudDpmbGV4LWVuZDthbGlnbi1pdGVtczpjZW50ZXJ9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIucmlnaHQtY2VudGVyIC5hY29yZC0tbm90aWZpY2F0aW9uLmhpZGRlbnt0cmFuc2Zvcm06dHJhbnNsYXRlKHZhcigtLWFuaW1hdGlvbi1zaXplKSwgMCl9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIucmlnaHQtY2VudGVyIC5hY29yZC0tbm90aWZpY2F0aW9uLmNsb3Npbmd7dHJhbnNmb3JtOnRyYW5zbGF0ZShjYWxjKHZhcigtLWFuaW1hdGlvbi1zaXplKSAqIC0xKSwgMCl9YDtcbiIsICJpbXBvcnQgZG9tIGZyb20gXCIuLi9kb20vaW5kZXguanNcIjtcclxuaW1wb3J0IGV2ZW50cyBmcm9tIFwiLi4vZXZlbnRzL2luZGV4LmpzXCI7XHJcbmltcG9ydCB3ZWJwYWNrIGZyb20gXCIuLi9tb2R1bGVzL3dlYnBhY2suanNcIjtcclxuXHJcbmNvbnN0IHRvb2x0aXBDbGFzc2VzID0gd2VicGFjay5maW5kQnlQcm9wZXJ0aWVzKFwidG9vbHRpcENvbnRlbnRBbGxvd092ZXJmbG93XCIsIFwidG9vbHRpcFwiKTtcclxuXHJcbmNvbnN0IHRvb2x0aXBQb3NpdGlvbnMgPSB7XHJcbiAgdG9wOiB0b29sdGlwQ2xhc3Nlcy50b29sdGlwVG9wLFxyXG4gIGJvdHRvbTogdG9vbHRpcENsYXNzZXMudG9vbHRpcEJvdHRvbSxcclxuICBsZWZ0OiB0b29sdGlwQ2xhc3Nlcy50b29sdGlwTGVmdCxcclxuICByaWdodDogdG9vbHRpcENsYXNzZXMudG9vbHRpcFJpZ2h0LFxyXG59XHJcblxyXG5jbGFzcyBUb29sdGlwIHtcclxuICAvKipcclxuICAgKiBAcGFyYW0ge0hUTUxEaXZFbGVtZW50fSB0YXJnZXQgXHJcbiAgICogQHBhcmFtIHtzdHJpbmd8SFRNTERpdkVsZW1lbnR9IGNvbnRlbnRcclxuICAgKi9cclxuICBjb25zdHJ1Y3Rvcih0YXJnZXQsIGNvbnRlbnQsIHBvc2l0aW9uID0gXCJhdXRvXCIpIHtcclxuICAgIC8qKiBAdHlwZSB7SFRNTERpdkVsZW1lbnR9ICovXHJcbiAgICB0aGlzLmxheWVyRWxlbWVudCA9IGRvbS5wYXJzZShgXHJcbiAgICAgIDxkaXYgY2xhc3M9XCJhY29yZC0tdG9vbHRpcC1sYXllclwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCIke3Rvb2x0aXBDbGFzc2VzLnRvb2x0aXB9ICR7dG9vbHRpcENsYXNzZXMudG9vbHRpcFByaW1hcnl9IGFjb3JkLS10b29sdGlwXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiJHt0b29sdGlwQ2xhc3Nlcy50b29sdGlwUG9pbnRlcn0gYWNvcmQtLXRvb2x0aXAtcG9pbnRlclwiPjwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cIiR7dG9vbHRpcENsYXNzZXMudG9vbHRpcENvbnRlbnR9IGFjb3JkLS10b29sdGlwLWNvbnRlbnRcIj48L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICBgKTtcclxuICAgIHRoaXMudG9vbHRpcEVsZW1lbnQgPSB0aGlzLmxheWVyRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmFjb3JkLS10b29sdGlwXCIpO1xyXG4gICAgdGhpcy5jb250ZW50RWxlbWVudCA9IHRoaXMubGF5ZXJFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWNvcmQtLXRvb2x0aXAtY29udGVudFwiKTtcclxuICAgIHRoaXMuY29udGVudCA9IGNvbnRlbnQ7XHJcbiAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuICAgIHRoaXMucG9zaXRpb24gPSBwb3NpdGlvbjtcclxuXHJcbiAgICB0aGlzLnZpc2libGUgPSBmYWxzZTtcclxuICAgIHRoaXMuZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgIHRoaXMucGF1c2VkID0gZmFsc2U7XHJcblxyXG4gICAgY29uc3Qgb25Nb3VzZUVudGVyID0gKCkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5kaXNhYmxlZCB8fCB0aGlzLnBhdXNlZCkgcmV0dXJuO1xyXG4gICAgICB0aGlzLnNob3coKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBvbk1vdXNlTGVhdmUgPSAoKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLnBhdXNlZCkgcmV0dXJuO1xyXG4gICAgICB0aGlzLmhpZGUoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnRhcmdldC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCBvbk1vdXNlRW50ZXIpO1xyXG4gICAgdGhpcy50YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgb25Nb3VzZUxlYXZlKTtcclxuXHJcbiAgICBsZXQgdW5QYXRjaE9ic2VydmVyID0gZXZlbnRzLm9uKFxyXG4gICAgICBcIkRvbU11dGF0aW9uXCIsXHJcbiAgICAgIC8qKiBAcGFyYW0ge011dGF0aW9uUmVjb3JkfSBtdXQgKi8obXV0KSA9PiB7XHJcbiAgICAgICAgaWYgKG11dC50eXBlID09PSBcImF0dHJpYnV0ZXNcIikge1xyXG4gICAgICAgICAgaWYgKG11dC50YXJnZXQuaXNTYW1lTm9kZSh0aGlzLnRhcmdldCkpIHtcclxuICAgICAgICAgICAgc3dpdGNoIChtdXQuYXR0cmlidXRlTmFtZSkge1xyXG4gICAgICAgICAgICAgIGNhc2UgXCJhY29yZC0tdG9vbHRpcC1kaXNhYmxlZFwiOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRpc2FibGVkID0gdGhpcy50YXJnZXQuZ2V0QXR0cmlidXRlKFwiYWNvcmQtLXRvb2x0aXAtZGlzYWJsZWRcIikgPT09IFwidHJ1ZVwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGNhc2UgXCJhY29yZC0tdG9vbHRpcC1jb250ZW50XCI6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudCA9IHRoaXMudGFyZ2V0LmdldEF0dHJpYnV0ZShcImFjb3JkLS10b29sdGlwLWNvbnRlbnRcIik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgY2FzZSBcImFjb3JkLS10b29sdGlwLXBvc2l0aW9uXCI6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb24gPSB0aGlzLnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJhY29yZC0tdG9vbHRpcC1wb3NpdGlvblwiKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgKVxyXG5cclxuICAgIHRoaXMuZGVzdHJveSA9ICgpID0+IHtcclxuICAgICAgdGhpcy50YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgb25Nb3VzZUVudGVyKTtcclxuICAgICAgdGhpcy50YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgb25Nb3VzZUxlYXZlKTtcclxuICAgICAgdGhpcy5oaWRlKCk7XHJcbiAgICAgIHVuUGF0Y2hPYnNlcnZlcigpO1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGdldCBjb250ZW50KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY29udGVudEVsZW1lbnQuZmlyc3RFbGVtZW50Q2hpbGQ7XHJcbiAgfVxyXG5cclxuICBzZXQgY29udGVudCh2YWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICB0aGlzLmNvbnRlbnRFbGVtZW50LmlubmVySFRNTCA9IHZhbHVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5jb250ZW50RWxlbWVudC5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgICB0aGlzLmNvbnRlbnRFbGVtZW50Py5hcHBlbmRDaGlsZD8uKHZhbHVlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0YXRpYyBnZXRDb250YWluZXIoKSB7XHJcbiAgICBjb25zdCBhcHBFbG0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbY2xhc3MqPVwibm90QXBwQXNpZGVQYW5lbC1cIl0nKTtcclxuXHJcbiAgICBsZXQgY29udGFpbmVyID0gYXBwRWxtLnF1ZXJ5U2VsZWN0b3IoXCIuYWNvcmQtLXRvb2x0aXAtY29udGFpbmVyXCIpO1xyXG4gICAgaWYgKCFjb250YWluZXIpIHtcclxuICAgICAgY29udGFpbmVyID0gZG9tLnBhcnNlKGA8ZGl2IGNsYXNzPVwiYWNvcmQtLWxheWVyLWNvbnRhaW5lciBhY29yZC0tdG9vbHRpcC1jb250YWluZXJcIj48L2Rpdj5gKTtcclxuICAgICAgYXBwRWxtLmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XHJcbiAgICB9XHJcbiAgICBjb250YWluZXIuc3R5bGUuc2V0UHJvcGVydHkoXCItLXRvcC1vZmZzZXRcIiwgYCR7YXBwRWxtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcC50b0ZpeGVkKDEpfXB4YCk7XHJcblxyXG4gICAgcmV0dXJuIGNvbnRhaW5lcjtcclxuICB9XHJcblxyXG4gIHNob3coKSB7XHJcbiAgICBpZiAodGhpcy52aXNpYmxlKSByZXR1cm47XHJcbiAgICB0aGlzLnZpc2libGUgPSB0cnVlO1xyXG5cclxuICAgIGNvbnN0IGNvbnRhaW5lciA9IFRvb2x0aXAuZ2V0Q29udGFpbmVyKCk7XHJcblxyXG4gICAgaWYgKHRoaXMucG9zaXRpb24gPT09IFwiYXV0b1wiKSB7XHJcbiAgICAgIHRoaXMuY2FsY3VsYXRlUG9zaXRpb24oXHJcbiAgICAgICAgdGhpcy5jYW5TaG93QXRUb3AgPyBcInRvcFwiXHJcbiAgICAgICAgICA6IHRoaXMuY2FuU2hvd0F0Qm90dG9tID8gXCJib3R0b21cIlxyXG4gICAgICAgICAgICA6IHRoaXMuY2FuU2hvd0F0TGVmdCA/IFwibGVmdFwiXHJcbiAgICAgICAgICAgICAgOiB0aGlzLmNhblNob3dBdFJpZ2h0ID8gXCJyaWdodFwiXHJcbiAgICAgICAgICAgICAgICA6IFwidG9wXCJcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuY2FsY3VsYXRlUG9zaXRpb24odGhpcy5wb3NpdGlvbik7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmxheWVyRWxlbWVudCk7XHJcbiAgICB0aGlzLmxheWVyRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwidmlzaWJsZVwiKTtcclxuICB9XHJcblxyXG4gIGNhbGN1bGF0ZVBvc2l0aW9uKHBvc2l0aW9uKSB7XHJcbiAgICBjb25zdCBib3VuZGluZ1JlY3QgPSB0aGlzLnRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHJcbiAgICB0aGlzLmxheWVyRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKC4uLk9iamVjdC52YWx1ZXModG9vbHRpcFBvc2l0aW9ucykpO1xyXG4gICAgdGhpcy50b29sdGlwRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwidmVydGljYWxcIiwgXCJob3Jpem9udGFsXCIpO1xyXG5cclxuICAgIHN3aXRjaCAocG9zaXRpb24pIHtcclxuICAgICAgY2FzZSBcInRvcFwiOiB7XHJcbiAgICAgICAgdGhpcy5sYXllckVsZW1lbnQuc3R5bGUudG9wID0gYCR7Ym91bmRpbmdSZWN0LnRvcCAtIHRoaXMudGFyZ2V0Lm9mZnNldEhlaWdodCAtIDEwfXB4YDtcclxuICAgICAgICB0aGlzLmxheWVyRWxlbWVudC5zdHlsZS5sZWZ0ID0gYCR7Ym91bmRpbmdSZWN0LmxlZnR9cHhgO1xyXG4gICAgICAgIHRoaXMubGF5ZXJFbGVtZW50LmNsYXNzTGlzdC5hZGQodG9vbHRpcFBvc2l0aW9ucy50b3ApO1xyXG4gICAgICAgIHRoaXMudG9vbHRpcEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInZlcnRpY2FsXCIpO1xyXG4gICAgICAgIHRoaXMuY2VudGVyUG9zaXRpb24oXCJob3Jpem9udGFsXCIpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgXCJib3R0b21cIjoge1xyXG4gICAgICAgIHRoaXMubGF5ZXJFbGVtZW50LnN0eWxlLnRvcCA9IGAke2JvdW5kaW5nUmVjdC50b3AgKyB0aGlzLnRhcmdldC5vZmZzZXRIZWlnaHQgKyAxMH1weGA7XHJcbiAgICAgICAgdGhpcy5sYXllckVsZW1lbnQuc3R5bGUubGVmdCA9IGAke2JvdW5kaW5nUmVjdC5sZWZ0fXB4YDtcclxuICAgICAgICB0aGlzLmxheWVyRWxlbWVudC5jbGFzc0xpc3QuYWRkKHRvb2x0aXBQb3NpdGlvbnMuYm90dG9tKTtcclxuICAgICAgICB0aGlzLnRvb2x0aXBFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJ2ZXJ0aWNhbFwiKTtcclxuICAgICAgICB0aGlzLmNlbnRlclBvc2l0aW9uKFwiaG9yaXpvbnRhbFwiKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlIFwibGVmdFwiOiB7XHJcbiAgICAgICAgdGhpcy5sYXllckVsZW1lbnQuc3R5bGUudG9wID0gYCR7Ym91bmRpbmdSZWN0LnRvcH1weGA7XHJcbiAgICAgICAgdGhpcy5sYXllckVsZW1lbnQuc3R5bGUubGVmdCA9IGAke2JvdW5kaW5nUmVjdC5sZWZ0IC0gdGhpcy50YXJnZXQub2Zmc2V0V2lkdGggLSAxMH1weGA7XHJcbiAgICAgICAgdGhpcy5sYXllckVsZW1lbnQuY2xhc3NMaXN0LmFkZCh0b29sdGlwUG9zaXRpb25zLmxlZnQpO1xyXG4gICAgICAgIHRoaXMudG9vbHRpcEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImhvcml6b250YWxcIik7XHJcbiAgICAgICAgdGhpcy5jZW50ZXJQb3NpdGlvbihcInZlcnRpY2FsXCIpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgXCJyaWdodFwiOiB7XHJcbiAgICAgICAgdGhpcy5sYXllckVsZW1lbnQuc3R5bGUudG9wID0gYCR7Ym91bmRpbmdSZWN0LnRvcH1weGA7XHJcbiAgICAgICAgdGhpcy5sYXllckVsZW1lbnQuc3R5bGUubGVmdCA9IGAke2JvdW5kaW5nUmVjdC5sZWZ0ICsgdGhpcy50YXJnZXQub2Zmc2V0V2lkdGggKyAxMH1weGA7XHJcbiAgICAgICAgdGhpcy5sYXllckVsZW1lbnQuY2xhc3NMaXN0LmFkZCh0b29sdGlwUG9zaXRpb25zLnJpZ2h0KTtcclxuICAgICAgICB0aGlzLnRvb2x0aXBFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJob3Jpem9udGFsXCIpO1xyXG4gICAgICAgIHRoaXMuY2VudGVyUG9zaXRpb24oXCJ2ZXJ0aWNhbFwiKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY2VudGVyUG9zaXRpb24oZGlyZWN0aW9uKSB7XHJcbiAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xyXG4gICAgICBjYXNlIFwiaG9yaXpvbnRhbFwiOiB7XHJcbiAgICAgICAgY29uc3QgY2VudGVyID0gdGhpcy50YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCArICh0aGlzLnRhcmdldC5vZmZzZXRXaWR0aCAvIDIpO1xyXG4gICAgICAgIHRoaXMubGF5ZXJFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KFwibGVmdFwiLCBgJHtjZW50ZXIgLSAodGhpcy5sYXllckVsZW1lbnQub2Zmc2V0V2lkdGggLyAyKX1weGApO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgXCJ2ZXJ0aWNhbFwiOiB7XHJcbiAgICAgICAgY29uc3QgY2VudGVyID0gdGhpcy50YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgKHRoaXMudGFyZ2V0Lm9mZnNldEhlaWdodCAvIDIpO1xyXG4gICAgICAgIHRoaXMubGF5ZXJFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KFwidG9wXCIsIGAke2NlbnRlciAtICh0aGlzLmxheWVyRWxlbWVudC5vZmZzZXRIZWlnaHQgLyAyKX1weGApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBoaWRlKCkge1xyXG4gICAgaWYgKCF0aGlzLnZpc2libGUpIHJldHVybjtcclxuICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMubGF5ZXJFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJ2aXNpYmxlXCIpO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHRoaXMubGF5ZXJFbGVtZW50LnJlbW92ZSgpO1xyXG4gICAgfSwgNTApO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGNhblNob3dBdFRvcCgpIHsgcmV0dXJuIHRoaXMudGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCAtIHRoaXMubGF5ZXJFbGVtZW50Lm9mZnNldEhlaWdodCA+PSAwOyB9XHJcbiAgZ2V0IGNhblNob3dBdEJvdHRvbSgpIHsgcmV0dXJuIHRoaXMudGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCArIHRoaXMudGFyZ2V0Lm9mZnNldEhlaWdodCArIHRoaXMubGF5ZXJFbGVtZW50Lm9mZnNldEhlaWdodCA8PSB3aW5kb3cuaW5uZXJIZWlnaHQ7IH1cclxuICBnZXQgY2FuU2hvd0F0TGVmdCgpIHsgcmV0dXJuIHRoaXMudGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQgLSB0aGlzLmxheWVyRWxlbWVudC5vZmZzZXRXaWR0aCA+PSAwOyB9XHJcbiAgZ2V0IGNhblNob3dBdFJpZ2h0KCkgeyByZXR1cm4gdGhpcy50YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCArIHRoaXMudGFyZ2V0Lm9mZnNldFdpZHRoICsgdGhpcy5sYXllckVsZW1lbnQub2Zmc2V0V2lkdGggPD0gd2luZG93LmlubmVyV2lkdGg7IH1cclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlKHRhcmdldCwgY29udGVudCwgcG9zaXRpb24gPSBcImF1dG9cIikge1xyXG4gIHJldHVybiBuZXcgVG9vbHRpcCh0YXJnZXQsIGNvbnRlbnQsIHBvc2l0aW9uKTtcclxufVxyXG5cclxuZG9tLnBhdGNoKFxyXG4gIFwiW2Fjb3JkLS10b29sdGlwLWNvbnRlbnRdXCIsXHJcbiAgKGVsbSkgPT4ge1xyXG4gICAgbGV0IHRvb2x0aXAgPSBjcmVhdGUoZWxtLCBlbG0uZ2V0QXR0cmlidXRlKFwiYWNvcmQtLXRvb2x0aXAtY29udGVudFwiKSwgZWxtLmdldEF0dHJpYnV0ZShcImFjb3JkLS10b29sdGlwLXBvc2l0aW9uXCIpKTtcclxuICAgIHRvb2x0aXAuZGlzYWJsZWQgPSBlbG0uZ2V0QXR0cmlidXRlKFwiYWNvcmQtLXRvb2x0aXAtZGlzYWJsZWRcIikgPT09IFwidHJ1ZVwiO1xyXG5cclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIHRvb2x0aXAuZGVzdHJveSgpO1xyXG4gICAgfVxyXG4gIH0sXHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7IGNyZWF0ZSB9OyIsICJpbXBvcnQgZG9tIGZyb20gXCIuLi9kb20vaW5kZXguanNcIjtcclxuaW1wb3J0IHV0aWxzIGZyb20gXCIuLi91dGlscy9pbmRleC5qc1wiO1xyXG5cclxuY29uc3QgdmFsaWRQb3NpdGlvbnMgPSBbXHJcbiAgXCJ0b3AtcmlnaHRcIixcclxuICBcInRvcC1sZWZ0XCIsXHJcbiAgXCJib3R0b20tcmlnaHRcIixcclxuICBcImJvdHRvbS1sZWZ0XCIsXHJcbiAgXCJ0b3AtY2VudGVyXCIsXHJcbiAgXCJib3R0b20tY2VudGVyXCIsXHJcbiAgXCJjZW50ZXJcIixcclxuICBcImxlZnQtY2VudGVyXCIsXHJcbiAgXCJyaWdodC1jZW50ZXJcIlxyXG5dXHJcblxyXG5mdW5jdGlvbiBnZXRDb250YWluZXIocG9zaXRpb24pIHtcclxuICBpZiAoIXZhbGlkUG9zaXRpb25zLmluY2x1ZGVzKHBvc2l0aW9uKSkgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHBvc2l0aW9uIFwiJHtwb3NpdGlvbn1cIi4gVmFsaWQgcG9zaXRpb25zIGFyZTogJHt2YWxpZFBvc2l0aW9ucy5qb2luKFwiLCBcIil9YCk7XHJcbiAgY29uc3QgYXBwRWxtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2NsYXNzKj1cIm5vdEFwcEFzaWRlUGFuZWwtXCJdJyk7XHJcblxyXG4gIGxldCB0b3BDb250YWluZXIgPSBhcHBFbG0ucXVlcnlTZWxlY3RvcihcIi5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLWNvbnRhaW5lclwiKTtcclxuICBpZiAoIXRvcENvbnRhaW5lcikge1xyXG4gICAgdG9wQ29udGFpbmVyID0gZG9tLnBhcnNlKGA8ZGl2IGNsYXNzPVwiYWNvcmQtLWxheWVyLWNvbnRhaW5lciBhY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLWNvbnRhaW5lclwiPjwvZGl2PmApO1xyXG4gICAgYXBwRWxtLmFwcGVuZENoaWxkKHRvcENvbnRhaW5lcik7XHJcbiAgfVxyXG4gIHRvcENvbnRhaW5lci5zdHlsZS5zZXRQcm9wZXJ0eShcIi0tdG9wLW9mZnNldFwiLCBgJHthcHBFbG0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wLnRvRml4ZWQoMSl9cHhgKTtcclxuXHJcbiAgbGV0IHBvc2l0aW9uQ29udGFpbmVyID0gdG9wQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoYC5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLiR7cG9zaXRpb259YCk7XHJcbiAgaWYgKCFwb3NpdGlvbkNvbnRhaW5lcikge1xyXG4gICAgcG9zaXRpb25Db250YWluZXIgPSBkb20ucGFyc2UoYDxkaXYgY2xhc3M9XCJhY29yZC0tbm90aWZpY2F0aW9uLWxheWVyICR7cG9zaXRpb259XCI+PC9kaXY+YCk7XHJcbiAgICB0b3BDb250YWluZXIuYXBwZW5kQ2hpbGQocG9zaXRpb25Db250YWluZXIpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHBvc2l0aW9uQ29udGFpbmVyO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93KGNvbnRlbnQsIHtcclxuICBzdHlsZSA9IFwiZGVmYXVsdFwiLFxyXG4gIHRpbWVvdXQgPSAxMDAwMCxcclxuICBwb3NpdGlvbiA9IFwidG9wLXJpZ2h0XCIsXHJcbiAgY2xvc2FibGUgPSB0cnVlLFxyXG4gIG9uQ2xpY2sgPSBudWxsLFxyXG4gIG9uQ2xvc2UgPSBudWxsXHJcbn0gPSB7fSkge1xyXG4gIGNvbnN0IGNvbnRhaW5lciA9IGdldENvbnRhaW5lcihwb3NpdGlvbik7XHJcblxyXG4gIGNvbnN0IG5vdGlmRWxtID0gZG9tLnBhcnNlKGBcclxuICAgIDxkaXYgY2xhc3M9XCJhY29yZC0tbm90aWZpY2F0aW9uIHN0eWxlLSR7c3R5bGV9IGhpZGRlblwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRlbnRcIj48L2Rpdj5cclxuICAgICAgICAgICAgPHN2ZyBjbGFzcz1cImNsb3NlICR7IWNsb3NhYmxlID8gXCJoaWRkZW5cIiA6IFwiXCJ9XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMjRcIj5cclxuICAgICAgICAgICAgICAgIDxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTEyIDEwLjU4Nmw0Ljk1LTQuOTUgMS40MTQgMS40MTQtNC45NSA0Ljk1IDQuOTUgNC45NS0xLjQxNCAxLjQxNC00Ljk1LTQuOTUtNC45NSA0Ljk1LTEuNDE0LTEuNDE0IDQuOTUtNC45NS00Ljk1LTQuOTVMNy4wNSA1LjYzNnpcIi8+XHJcbiAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJwcm9ncmVzcy1jb250YWluZXJcIiBzdHlsZT1cIi0tZHVyYXRpb246ICR7dGltZW91dH1tcztcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2dyZXNzXCI+PC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICBgKTtcclxuXHJcbiAgbm90aWZFbG0ucXVlcnlTZWxlY3RvcihcIi5jb250ZW50XCIpLmlubmVySFRNTCA9IGNvbnRlbnQ7XHJcblxyXG4gIGxldCBjbG9zZWQgPSBmYWxzZTtcclxuICBmdW5jdGlvbiBjbG9zZShjbG9zZVR5cGUpIHtcclxuICAgIGlmIChjbG9zZWQpIHJldHVybjtcclxuICAgIGNsb3NlZCA9IHRydWU7XHJcblxyXG4gICAgbm90aWZFbG0uY2xhc3NMaXN0LmFkZChcImNsb3NpbmdcIik7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgbm90aWZFbG0ucmVtb3ZlKCk7XHJcblxyXG4gICAgICB1dGlscy5pZkV4aXN0cyhcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci1jb250YWluZXJgKSxcclxuICAgICAgICAvKiogQHBhcmFtIHtIVE1MRGl2RWxlbWVudH0gZWxtICovKGVsbSkgPT4ge1xyXG4gICAgICAgICAgaWYgKCEoWy4uLmVsbS5jaGlsZE5vZGVzLnZhbHVlcygpXS5yZWR1Y2UoKHByZXYsIGN1cnIpID0+IHByZXYgKyBjdXJyLmNoaWxkRWxlbWVudENvdW50LCAwKSkpIGVsbS5yZW1vdmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICk7XHJcbiAgICB9LCAyNzUpO1xyXG4gICAgb25DbG9zZT8uKGNsb3NlVHlwZSk7XHJcbiAgfVxyXG5cclxuICBpZiAodHlwZW9mIG9uQ2xpY2sgPT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICBub3RpZkVsbS5jbGFzc0xpc3QuYWRkKFwiY2xpY2thYmxlXCIpO1xyXG4gICAgbm90aWZFbG0ub25jbGljayA9ICgpID0+IHtcclxuICAgICAgb25DbGljayhjbG9zZSk7XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgdXRpbHMuaWZFeGlzdHMobm90aWZFbG0ucXVlcnlTZWxlY3RvcihcIi5jbG9zZVwiKSwgKGVsbSkgPT4ge1xyXG4gICAgZWxtLm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgIGNsb3NlKFwidXNlclwiKTtcclxuICAgIH07XHJcbiAgfSk7XHJcblxyXG4gIGNvbnRhaW5lci5wcmVwZW5kKG5vdGlmRWxtKTtcclxuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xyXG4gICAgbm90aWZFbG0uY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcclxuICAgIG5vdGlmRWxtLnF1ZXJ5U2VsZWN0b3IoXCIucHJvZ3Jlc3NcIikuY2xhc3NMaXN0LmFkZChcInByb2dyZXNzaW5nXCIpO1xyXG4gIH0pO1xyXG5cclxuICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgIGNsb3NlKFwidGltZW91dFwiKTtcclxuICB9LCB0aW1lb3V0KTtcclxuXHJcbiAgcmV0dXJuICgpID0+IHtcclxuICAgIGNsb3NlKFwiZm9yY2VcIik7XHJcbiAgfTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIHNob3c6IE9iamVjdC5hc3NpZ24oc2hvdywge1xyXG4gICAgaW5mbzogKGh0bWwsIG9iaiA9IHt9KSA9PiBzaG93KGh0bWwsIHsgLi4ub2JqLCBzdHlsZTogXCJpbmZvXCIgfSksXHJcbiAgICBlcnJvcjogKGh0bWwsIG9iaiA9IHt9KSA9PiBzaG93KGh0bWwsIHsgLi4ub2JqLCBzdHlsZTogXCJlcnJvclwiIH0pLFxyXG4gICAgd2FybmluZzogKGh0bWwsIG9iaiA9IHt9KSA9PiBzaG93KGh0bWwsIHsgLi4ub2JqLCBzdHlsZTogXCJ3YXJuaW5nXCIgfSksXHJcbiAgICBzdWNjZXNzOiAoaHRtbCwgb2JqID0ge30pID0+IHNob3coaHRtbCwgeyAuLi5vYmosIHN0eWxlOiBcInN1Y2Nlc3NcIiB9KSxcclxuICB9KSxcclxufTsiLCAiaW1wb3J0IHdlYnBhY2sgZnJvbSBcIi4uL21vZHVsZXMvd2VicGFjay5qc1wiO1xyXG5pbXBvcnQgcGF0Y2hlciBmcm9tIFwiLi4vcGF0Y2hlci9pbmRleC5qc1wiO1xyXG5pbXBvcnQgbG9nZ2VyIGZyb20gXCIuLi91dGlscy9sb2dnZXIuanNcIjtcclxuXHJcbmltcG9ydCBjb21tb24gZnJvbSBcIi4uL21vZHVsZXMvY29tbW9uLmpzXCI7XHJcbmltcG9ydCB7IGZpbmRlck1hcCB9IGZyb20gXCIuLi9tb2R1bGVzL3Jhdy9jb21wbGV4LWZpbmRlci5qc1wiO1xyXG5cclxuY29uc3QgeyBSZWFjdCB9ID0gY29tbW9uO1xyXG5cclxubGV0IGlzUmVhZHkgPSBmYWxzZTtcclxuXHJcbmxldCBDb21wb25lbnRzID0gbnVsbDtcclxuXHJcbmxldCBBY3Rpb25zID0gbnVsbDtcclxuXHJcbihhc3luYyAoKSA9PiB7XHJcbiAgQWN0aW9ucyA9IGF3YWl0IChhc3luYyAoKSA9PiB7XHJcbiAgICBsZXQgb2dNb2R1bGU7XHJcbiAgICB3aGlsZSAodHJ1ZSkge1xyXG4gICAgICBvZ01vZHVsZSA9IHdlYnBhY2suZmlsdGVyKG0gPT4gT2JqZWN0LnZhbHVlcyhtKS5zb21lKHYgPT4gdHlwZW9mIHYgPT09IFwiZnVuY3Rpb25cIiAmJiB2LnRvU3RyaW5nKCkuaW5jbHVkZXMoXCJDT05URVhUX01FTlVfQ0xPU0VcIikpKS5maW5kKG0gPT4gbS5leHBvcnRzICE9PSB3aW5kb3cpPy5leHBvcnRzO1xyXG4gICAgICBpZiAob2dNb2R1bGUpIGJyZWFrO1xyXG4gICAgICBhd2FpdCBuZXcgUHJvbWlzZShyID0+IHNldFRpbWVvdXQociwgMTAwKSk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBvdXQgPSBmaW5kZXJNYXAob2dNb2R1bGUsIHtcclxuICAgICAgY2xvc2U6IFtcIkNPTlRFWFRfTUVOVV9DTE9TRVwiXSxcclxuICAgICAgb3BlbjogW1wicmVuZGVyTGF6eVwiXVxyXG4gICAgfSk7XHJcblxyXG4gICAgaXNSZWFkeSA9ICEhb3V0LmNsb3NlICYmICEhb3V0Lm9wZW47XHJcbiAgICByZXR1cm4gb3V0O1xyXG4gIH0pKCk7XHJcblxyXG4gIENvbXBvbmVudHMgPSBhd2FpdCAoYXN5bmMgKCkgPT4ge1xyXG4gICAgY29uc3Qgb3V0ID0ge307XHJcbiAgICBjb25zdCBjb21wb25lbnRNYXAgPSB7XHJcbiAgICAgIHNlcGFyYXRvcjogXCJTZXBhcmF0b3JcIixcclxuICAgICAgY2hlY2tib3g6IFwiQ2hlY2tib3hJdGVtXCIsXHJcbiAgICAgIHJhZGlvOiBcIlJhZGlvSXRlbVwiLFxyXG4gICAgICBjb250cm9sOiBcIkNvbnRyb2xJdGVtXCIsXHJcbiAgICAgIGdyb3Vwc3RhcnQ6IFwiR3JvdXBcIixcclxuICAgICAgY3VzdG9taXRlbTogXCJJdGVtXCJcclxuICAgIH07XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgbGV0IG1vZHVsZUlkO1xyXG4gICAgICB3aGlsZSAodHJ1ZSkge1xyXG4gICAgICAgIG1vZHVsZUlkID0gT2JqZWN0LmVudHJpZXMod2VicGFjay5yZXF1aXJlLm0pLmZpbmQoKFssIG1dKSA9PiBtPy50b1N0cmluZygpLmluY2x1ZGVzKFwibWVudWl0ZW1jaGVja2JveFwiKSlbMF1cclxuICAgICAgICBpZiAobW9kdWxlSWQpIGJyZWFrO1xyXG4gICAgICAgIGF3YWl0IG5ldyBQcm9taXNlKHIgPT4gc2V0VGltZW91dChyLCAxMDApKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgY29udGV4dE1lbnVNb2R1bGUgPSB3ZWJwYWNrLmZpbmQoKF8sIGlkeCkgPT4gaWR4ID09IG1vZHVsZUlkKS5leHBvcnRzO1xyXG5cclxuICAgICAgY29uc3QgbW9kdWxlU3RyaW5nID0gd2VicGFjay5yZXF1aXJlLm1bbW9kdWxlSWRdLnRvU3RyaW5nKCk7XHJcbiAgICAgIGNvbnN0IHJhd01hdGNoZXMgPSBtb2R1bGVTdHJpbmcubWF0Y2hBbGwoL2lmXFwoXFx3K1xcLnR5cGU9PT0oPzpcXHcrXFwuKT8oXFx3KylcXCkuKz90eXBlOlwiKC4rPylcIi9ncyk7XHJcblxyXG4gICAgICBvdXQuTWVudSA9IE9iamVjdC52YWx1ZXMoY29udGV4dE1lbnVNb2R1bGUpLmZpbmQodiA9PiB2LnRvU3RyaW5nKCkuaW5jbHVkZXMoXCIuaXNVc2luZ0tleWJvYXJkTmF2aWdhdGlvblwiKSk7XHJcblxyXG4gICAgICBbLi4ucmF3TWF0Y2hlc10uZm9yRWFjaCgoWywgZnVuY3Rpb25OYW1lLCB0eXBlXSkgPT4ge1xyXG4gICAgICAgIGxldCBtb2R1bGVLZXkgPSBtb2R1bGVTdHJpbmcubWF0Y2gobmV3IFJlZ0V4cChuZXcgUmVnRXhwKGAoXFxcXHcrKTpcXFxcKFxcXFwpXFxcXD1cXFxcPiR7ZnVuY3Rpb25OYW1lfWApKSk/LlsxXVxyXG4gICAgICAgIG91dFtjb21wb25lbnRNYXBbdHlwZV1dID0gY29udGV4dE1lbnVNb2R1bGVbbW9kdWxlS2V5XTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpc1JlYWR5ID0gT2JqZWN0LmtleXMob3V0KS5sZW5ndGggPiAxO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGlzUmVhZHkgPSBmYWxzZTtcclxuICAgICAgbG9nZ2VyLmVycm9yKFwiRmFpbGVkIHRvIGxvYWQgY29udGV4dCBtZW51IGNvbXBvbmVudHNcIiwgZXJyKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gb3V0O1xyXG4gIH0pKCk7XHJcblxyXG4gIE1lbnVQYXRjaGVyLmluaXRpYWxpemUoKTtcclxufSkoKTtcclxuXHJcblxyXG5jbGFzcyBNZW51UGF0Y2hlciB7XHJcbiAgc3RhdGljIE1BWF9QQVRDSF9JVEVSQVRJT05TID0gMTY7XHJcbiAgc3RhdGljIHBhdGNoZXMgPSBuZXcgTWFwKCk7XHJcbiAgc3RhdGljIHN1YlBhdGNoZXMgPSBuZXcgV2Vha01hcCgpO1xyXG5cclxuICBzdGF0aWMgaW5pdGlhbGl6ZSgpIHtcclxuICAgIGlmICghaXNSZWFkeSkgcmV0dXJuIGxvZ2dlci53YXJuKFwiVW5hYmxlIHRvIGxvYWQgY29udGV4dCBtZW51LlwiKTtcclxuXHJcbiAgICBjb25zdCBtb2R1bGVUb1BhdGNoID0gd2VicGFjay5maWx0ZXIobSA9PiBPYmplY3QudmFsdWVzKG0pLnNvbWUodiA9PiB0eXBlb2YgdiA9PT0gXCJmdW5jdGlvblwiICYmIHYudG9TdHJpbmcoKS5pbmNsdWRlcyhcIkNPTlRFWFRfTUVOVV9DTE9TRVwiKSkpLmZpbmQobSA9PiBtLmV4cG9ydHMgIT09IHdpbmRvdykuZXhwb3J0cztcclxuICAgIGNvbnN0IGtleVRvUGF0Y2ggPSBPYmplY3Qua2V5cyhtb2R1bGVUb1BhdGNoKS5maW5kKGsgPT4gbW9kdWxlVG9QYXRjaFtrXT8ubGVuZ3RoID09PSAzKTtcclxuXHJcbiAgICBwYXRjaGVyLmJlZm9yZShcclxuICAgICAga2V5VG9QYXRjaCxcclxuICAgICAgbW9kdWxlVG9QYXRjaCxcclxuICAgICAgZnVuY3Rpb24gKG1ldGhvZEFyZ3MpIHtcclxuICAgICAgICBjb25zdCBwcm9taXNlID0gbWV0aG9kQXJnc1sxXTtcclxuICAgICAgICBtZXRob2RBcmdzWzFdID0gYXN5bmMgZnVuY3Rpb24gKC4uLmFyZ3MpIHtcclxuICAgICAgICAgIGNvbnN0IHJlbmRlciA9IGF3YWl0IHByb21pc2UuY2FsbCh0aGlzLCAuLi5hcmdzKTtcclxuXHJcbiAgICAgICAgICByZXR1cm4gKHByb3BzKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlcyA9IHJlbmRlcihwcm9wcyk7XHJcblxyXG4gICAgICAgICAgICBpZiAocmVzPy5wcm9wcy5uYXZJZCkge1xyXG4gICAgICAgICAgICAgIE1lbnVQYXRjaGVyLmV4ZWN1dGVQYXRjaGVzKHJlcy5wcm9wcy5uYXZJZCwgcmVzLCBwcm9wcyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHJlcz8udHlwZSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgICAgICAgTWVudVBhdGNoZXIucGF0Y2hSZWN1cnNpdmUocmVzLCBcInR5cGVcIik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZXM7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbWV0aG9kQXJncztcclxuICAgICAgfVxyXG4gICAgKVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIHBhdGNoUmVjdXJzaXZlKHRhcmdldCwgbWV0aG9kLCBpdGVyYXRpb24gPSAwKSB7XHJcbiAgICBpZiAoaXRlcmF0aW9uID49IHRoaXMuTUFYX1BBVENIX0lURVJBVElPTlMpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBwcm94eUZ1bmN0aW9uID0gdGhpcy5zdWJQYXRjaGVzLmdldCh0YXJnZXRbbWV0aG9kXSkgPz8gKCgpID0+IHtcclxuICAgICAgY29uc3Qgb3JpZ2luYWxGdW5jdGlvbiA9IHRhcmdldFttZXRob2RdO1xyXG4gICAgICBjb25zdCBkZXB0aCA9ICsraXRlcmF0aW9uO1xyXG4gICAgICBmdW5jdGlvbiBwYXRjaCguLi5hcmdzKSB7XHJcbiAgICAgICAgY29uc3QgcmVzID0gb3JpZ2luYWxGdW5jdGlvbi5jYWxsKHRoaXMsIC4uLmFyZ3MpO1xyXG5cclxuICAgICAgICBpZiAoIXJlcykgcmV0dXJuIHJlcztcclxuXHJcbiAgICAgICAgY29uc3QgbmF2SWQgPSByZXMucHJvcHM/Lm5hdklkID8/IHJlcy5wcm9wcz8uY2hpbGRyZW4/LnByb3BzPy5uYXZJZDtcclxuICAgICAgICBpZiAobmF2SWQpIHtcclxuICAgICAgICAgIE1lbnVQYXRjaGVyLmV4ZWN1dGVQYXRjaGVzKG5hdklkLCByZXMsIGFyZ3NbMF0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb25zdCBsYXllciA9IHJlcy5wcm9wcy5jaGlsZHJlbiA/IHJlcy5wcm9wcy5jaGlsZHJlbiA6IHJlcztcclxuXHJcbiAgICAgICAgICBpZiAodHlwZW9mIGxheWVyPy50eXBlID09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgICAgICBNZW51UGF0Y2hlci5wYXRjaFJlY3Vyc2l2ZShsYXllciwgXCJ0eXBlXCIsIGRlcHRoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiByZXM7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHBhdGNoLl9fb3JpZ2luYWxfXyA9IG9yaWdpbmFsRnVuY3Rpb247XHJcbiAgICAgIE9iamVjdC5hc3NpZ24ocGF0Y2gsIG9yaWdpbmFsRnVuY3Rpb24pO1xyXG4gICAgICB0aGlzLnN1YlBhdGNoZXMuc2V0KG9yaWdpbmFsRnVuY3Rpb24sIHBhdGNoKTtcclxuXHJcbiAgICAgIHJldHVybiBwYXRjaDtcclxuICAgIH0pKCk7XHJcblxyXG4gICAgdGFyZ2V0W21ldGhvZF0gPSBwcm94eUZ1bmN0aW9uO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGV4ZWN1dGVQYXRjaGVzKGlkLCByZXMsIHByb3BzKSB7XHJcbiAgICBpZiAoIXRoaXMucGF0Y2hlcy5oYXMoaWQpKSByZXR1cm47XHJcblxyXG4gICAgdGhpcy5wYXRjaGVzLmdldChpZCkuZm9yRWFjaChwYXRjaCA9PiB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgcGF0Y2gocmVzLCBwcm9wcyk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGxvZ2dlci5lcnJvcihcIkZhaWxlZCB0byBwYXRjaCBjb250ZXh0IG1lbnVcIiwgcGF0Y2gsIGVycik7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG5cclxuXHJcbi8vIENvcGllZCBmcm9tIGJkJ3Mgc291cmNlXHJcbmZ1bmN0aW9uIGJ1aWxkSXRlbShwcm9wcykge1xyXG4gIGNvbnN0IHsgdHlwZSB9ID0gcHJvcHM7XHJcbiAgaWYgKHR5cGUgPT09IFwic2VwYXJhdG9yXCIpIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KENvbXBvbmVudHMuU2VwYXJhdG9yKTtcclxuXHJcbiAgbGV0IGNvbXBvbmVudCA9IENvbXBvbmVudHMuSXRlbTtcclxuICBpZiAodHlwZSA9PT0gXCJzdWJtZW51XCIpIHtcclxuICAgIGlmICghcHJvcHMuY2hpbGRyZW4pIHByb3BzLmNoaWxkcmVuID0gYnVpbGRNZW51Q2hpbGRyZW4ocHJvcHMucmVuZGVyIHx8IHByb3BzLml0ZW1zKTtcclxuICB9IGVsc2UgaWYgKHR5cGUgPT09IFwidG9nZ2xlXCIgfHwgdHlwZSA9PT0gXCJyYWRpb1wiKSB7XHJcbiAgICBjb21wb25lbnQgPSB0eXBlID09PSBcInRvZ2dsZVwiID8gQ29tcG9uZW50cy5DaGVja2JveEl0ZW0gOiBDb21wb25lbnRzLlJhZGlvSXRlbTtcclxuICAgIGlmIChwcm9wcy5hY3RpdmUpIHByb3BzLmNoZWNrZWQgPSBwcm9wcy5hY3RpdmU7XHJcbiAgfSBlbHNlIGlmICh0eXBlID09PSBcImNvbnRyb2xcIikge1xyXG4gICAgY29tcG9uZW50ID0gQ29tcG9uZW50cy5Db250cm9sSXRlbTtcclxuICB9XHJcbiAgaWYgKCFwcm9wcy5pZCkgcHJvcHMuaWQgPSBgJHtwcm9wcy5sYWJlbC5yZXBsYWNlKC9eW15hLXpdK3xbXlxcdy1dKy9naSwgXCItXCIpfWA7XHJcbiAgaWYgKHByb3BzLmRhbmdlcikgcHJvcHMuY29sb3IgPSBcImRhbmdlclwiO1xyXG4gIHByb3BzLmV4dGVuZGVkID0gdHJ1ZTtcclxuXHJcbiAgaWYgKHR5cGUgPT09IFwidG9nZ2xlXCIpIHtcclxuICAgIGNvbnN0IFthY3RpdmUsIGRvVG9nZ2xlXSA9IFJlYWN0LnVzZVN0YXRlKHByb3BzLmNoZWNrZWQgfHwgZmFsc2UpO1xyXG4gICAgY29uc3Qgb3JpZ2luYWxBY3Rpb24gPSBwcm9wcy5hY3Rpb247XHJcbiAgICBwcm9wcy5jaGVja2VkID0gYWN0aXZlO1xyXG4gICAgcHJvcHMuYWN0aW9uID0gZnVuY3Rpb24gKGV2KSB7XHJcbiAgICAgIG9yaWdpbmFsQWN0aW9uKGV2KTtcclxuICAgICAgZG9Ub2dnbGUoIWFjdGl2ZSk7XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoY29tcG9uZW50LCBwcm9wcyk7XHJcbn1cclxuXHJcbi8vIENvcGllZCBmcm9tIGJkJ3Mgc291cmNlXHJcbmZ1bmN0aW9uIGJ1aWxkTWVudUNoaWxkcmVuKHNldHVwKSB7XHJcbiAgY29uc3QgbWFwcGVyID0gcyA9PiB7XHJcbiAgICBpZiAocy50eXBlID09PSBcImdyb3VwXCIpIHJldHVybiBidWlsZEdyb3VwKHMpO1xyXG4gICAgcmV0dXJuIGJ1aWxkSXRlbShzKTtcclxuICB9O1xyXG4gIGNvbnN0IGJ1aWxkR3JvdXAgPSBmdW5jdGlvbiAoZ3JvdXApIHtcclxuICAgIGNvbnN0IGl0ZW1zID0gZ3JvdXAuaXRlbXMubWFwKG1hcHBlcikuZmlsdGVyKGkgPT4gaSk7XHJcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChDb21wb25lbnRzLkdyb3VwLCBudWxsLCBpdGVtcyk7XHJcbiAgfTtcclxuICByZXR1cm4gc2V0dXAubWFwKG1hcHBlcikuZmlsdGVyKGkgPT4gaSk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBfX2NhY2hlX186IHtcclxuICAgIHBhdGNoZXM6IE1lbnVQYXRjaGVyLnBhdGNoZXMsXHJcbiAgICBzdWJQYXRjaGVzOiBNZW51UGF0Y2hlci5zdWJQYXRjaGVzXHJcbiAgfSxcclxuICBwYXRjaChuYXZJZCwgY2IpIHtcclxuICAgIGlmICghTWVudVBhdGNoZXIucGF0Y2hlcy5oYXMobmF2SWQpKSBNZW51UGF0Y2hlci5wYXRjaGVzLnNldChuYXZJZCwgbmV3IFNldCgpKTtcclxuICAgIE1lbnVQYXRjaGVyLnBhdGNoZXMuZ2V0KG5hdklkKS5hZGQoY2IpO1xyXG5cclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIE1lbnVQYXRjaGVyLnBhdGNoZXMuZ2V0KG5hdklkKS5kZWxldGUoY2IpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgb3BlbihldmVudCwgY29tcG9uZW50LCBjb25maWcpIHtcclxuICAgIHJldHVybiBBY3Rpb25zLm9wZW4oZXZlbnQsIChlKSA9PiBSZWFjdC5jcmVhdGVFbGVtZW50KGNvbXBvbmVudCwgT2JqZWN0LmFzc2lnbih7fSwgZSwgeyBvbkNsb3NlOiBBY3Rpb25zLmNsb3NlIH0pKSwgY29uZmlnKTtcclxuICB9LFxyXG4gIGNsb3NlKCkge1xyXG4gICAgcmV0dXJuIEFjdGlvbnMuY2xvc2UoKTtcclxuICB9LFxyXG4gIGJ1aWxkOiB7XHJcbiAgICBpdGVtKHNldHVwKSB7XHJcbiAgICAgIHJldHVybiBidWlsZE1lbnVDaGlsZHJlbihbc2V0dXBdKTtcclxuICAgIH0sXHJcbiAgICBtZW51KHNldHVwKSB7XHJcbiAgICAgIHJldHVybiAocHJvcHMpID0+IFJlYWN0LmNyZWF0ZUVsZW1lbnQoQ29tcG9uZW50cy5NZW51LCBwcm9wcywgYnVpbGRNZW51Q2hpbGRyZW4oc2V0dXApKTtcclxuICAgIH1cclxuICB9XHJcbn07IiwgImltcG9ydCBjb21tb24gZnJvbSBcIi4uLy4uL2FwaS9tb2R1bGVzL2NvbW1vblwiO1xyXG5pbXBvcnQgbG9nZ2VyIGZyb20gXCIuLi8uLi9hcGkvdXRpbHMvbG9nZ2VyLmpzXCI7XHJcbmNvbnN0IHsgUmVhY3QgfSA9IGNvbW1vbjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVycm9yQm91bmRhcnkgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcbiAgICB0aGlzLnN0YXRlID0geyBlcnJvcjogbnVsbCB9O1xyXG4gIH1cclxuXHJcbiAgY29tcG9uZW50RGlkQ2F0Y2goZXJyb3IpIHtcclxuICAgIHRoaXMuc2V0U3RhdGUoeyBlcnJvciB9KTtcclxuICAgIGxvZ2dlci5lcnJvcihlcnJvcik7XHJcbiAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMub25FcnJvciA9PT0gXCJmdW5jdGlvblwiKSB0aGlzLnByb3BzLm9uRXJyb3IoZXJyb3IpO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgaWYgKHRoaXMuc3RhdGUuZXJyb3IpIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImFjb3JkLS1yZWFjdC1lcnJvclwiPlxyXG4gICAgICA8cD5VbmV4cGVjdGVkIFJlYWN0IEVycm9yIEhhcHBlbmVkLjwvcD5cclxuICAgICAgPHA+e2Ake3RoaXMuc3RhdGUuZXJyb3J9YH08L3A+XHJcbiAgICA8L2Rpdj47XHJcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5jaGlsZHJlbjtcclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IG9yaWdpbmFsUmVuZGVyID0gRXJyb3JCb3VuZGFyeS5wcm90b3R5cGUucmVuZGVyO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoRXJyb3JCb3VuZGFyeS5wcm90b3R5cGUsIFwicmVuZGVyXCIsIHtcclxuICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICBjb25maWd1cmFibGU6IGZhbHNlLFxyXG4gIHNldDogZnVuY3Rpb24gKCkgeyB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3Qgc2V0IHJlbmRlciBtZXRob2Qgb2YgRXJyb3JCb3VuZGFyeVwiKTsgfSxcclxuICBnZXQ6ICgpID0+IG9yaWdpbmFsUmVuZGVyXHJcbn0pOyIsICJpbXBvcnQgRXJyb3JCb3VuZGFyeSBmcm9tIFwiLi4vLi4vbGliL2NvbXBvbmVudHMvRXJyb3JCb3VuZGFyeS5qc3hcIjtcclxuaW1wb3J0IGNvbW1vbiBmcm9tIFwiLi4vbW9kdWxlcy9jb21tb24uanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBFcnJvckJvdW5kYXJ5LFxyXG4gIEJ1dHRvbjogY29tbW9uLmNvbXBvbmVudHMuQnV0dG9uLFxyXG4gIE1hcmtkb3duOiBjb21tb24uY29tcG9uZW50cy5NYXJrZG93bixcclxuICBUZXh0OiBjb21tb24uY29tcG9uZW50cy5UZXh0LFxyXG4gIENvbmZpcm1hdGlvbk1vZGFsOiBjb21tb24uY29tcG9uZW50cy5Db25maXJtYXRpb25Nb2RhbCxcclxuICBNb2RhbFJvb3Q6IGNvbW1vbi5tb2RhbHMuY29tcG9uZW50cy5Sb290LFxyXG4gIE1vZGFsQ2xvc2VCdXR0b246IGNvbW1vbi5tb2RhbHMuY29tcG9uZW50cy5vdGhlci5DbG9zZUJ1dHRvbixcclxuICBNb2RhbEhlYWRlcjogY29tbW9uLm1vZGFscy5jb21wb25lbnRzLm90aGVyLkhlYWRlcixcclxuICBNb2RhbENvbnRlbnQ6IGNvbW1vbi5tb2RhbHMuY29tcG9uZW50cy5vdGhlci5Db250ZW50LFxyXG4gIE1vZGFsRm9vdGVyOiBjb21tb24ubW9kYWxzLmNvbXBvbmVudHMub3RoZXIuRm9vdGVyLFxyXG4gIE1vZGFsTGlzdENvbnRlbnQ6IGNvbW1vbi5tb2RhbHMuY29tcG9uZW50cy5vdGhlci5MaXN0Q29udGVudCxcclxuICBUb29sdGlwOiBjb21tb24uY29tcG9uZW50cy5Ub29sdGlwLFxyXG59IiwgImltcG9ydCBFcnJvckJvdW5kYXJ5IGZyb20gXCIuLi8uLi9saWIvY29tcG9uZW50cy9FcnJvckJvdW5kYXJ5LmpzeFwiO1xyXG5pbXBvcnQgY29tbW9uIGZyb20gXCIuLi9tb2R1bGVzL2NvbW1vbi5qc1wiO1xyXG5pbXBvcnQgaTE4biBmcm9tIFwiLi4vaTE4bi9pbmRleC5qc1wiXHJcbmNvbnN0IHsgUmVhY3QsIEZsdXhEaXNwYXRjaGVyLCBjb21wb25lbnRzLCBtb2RhbHMsIFVzZXJTdG9yZSB9ID0gY29tbW9uO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIHNob3c6IHtcclxuICAgIGNvbmZpcm1hdGlvbih0aXRsZSwgY29udGVudCwgeyBjb25maXJtID0gbnVsbCwgY2FuY2VsID0gbnVsbCwgZGFuZ2VyID0gZmFsc2UsIGtleSA9IHVuZGVmaW5lZCwgdGltZW91dCA9IDYwMDAwICogNSB9ID0ge30pIHtcclxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGNvbnRlbnQpKSBjb250ZW50ID0gW2NvbnRlbnRdO1xyXG4gICAgICAgIGNvbnRlbnQgPSBjb250ZW50Lm1hcChpID0+IHR5cGVvZiBpID09PSBcInN0cmluZ1wiID8gUmVhY3QuY3JlYXRlRWxlbWVudChjb21wb25lbnRzLk1hcmtkb3duLCBudWxsLCBpKSA6IGkpO1xyXG4gICAgICAgIGNvbnN0IG1vZGFsS2V5ID0gbW9kYWxzLmFjdGlvbnMub3BlbigocHJvcHMpID0+IHtcclxuICAgICAgICAgIGxldCBpbnRlcmFjdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICByZXR1cm4gPEVycm9yQm91bmRhcnkgb25FcnJvcj17KCkgPT4geyByZXNvbHZlKGZhbHNlKTsgfX0+XHJcbiAgICAgICAgICAgIDxjb21wb25lbnRzLkNvbmZpcm1hdGlvbk1vZGFsXHJcbiAgICAgICAgICAgICAgaGVhZGVyPXt0aXRsZX1cclxuICAgICAgICAgICAgICBjb25maXJtQnV0dG9uQ29sb3I9e2RhbmdlciA/IGNvbXBvbmVudHMuQnV0dG9uLkNvbG9ycy5SRUQgOiBjb21wb25lbnRzLkJ1dHRvbi5Db2xvcnMuQlJBTkR9XHJcbiAgICAgICAgICAgICAgY29uZmlybVRleHQ9e2NvbmZpcm0gfHwgaTE4bi5mb3JtYXQoXCJDT05GSVJNXCIpfVxyXG4gICAgICAgICAgICAgIGNhbmNlbFRleHQ9e2NhbmNlbH1cclxuICAgICAgICAgICAgICBvbkNhbmNlbD17KCkgPT4geyByZXNvbHZlKGZhbHNlKTsgbW9kYWxzLmFjdGlvbnMuY2xvc2UobW9kYWxLZXkpOyBpbnRlcmFjdGVkID0gdHJ1ZTsgfX1cclxuICAgICAgICAgICAgICBvbkNvbmZpcm09eygpID0+IHsgcmVzb2x2ZSh0cnVlKTsgbW9kYWxzLmFjdGlvbnMuY2xvc2UobW9kYWxLZXkpOyBpbnRlcmFjdGVkID0gdHJ1ZTsgfX1cclxuICAgICAgICAgICAgICB7Li4ucHJvcHN9XHJcbiAgICAgICAgICAgICAgb25DbG9zZT17KCkgPT4geyBwcm9wcy5vbkNsb3NlKCk7IHJlc29sdmUoZmFsc2UpOyBtb2RhbHMuYWN0aW9ucy5jbG9zZShtb2RhbEtleSk7IH19XHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICA8RXJyb3JCb3VuZGFyeSBvbkVycm9yPXsoKSA9PiB7IHJlc29sdmUoZmFsc2UpOyB9fT5cclxuICAgICAgICAgICAgICAgIHtjb250ZW50fVxyXG4gICAgICAgICAgICAgIDwvRXJyb3JCb3VuZGFyeT5cclxuICAgICAgICAgICAgPC9jb21wb25lbnRzLkNvbmZpcm1hdGlvbk1vZGFsPlxyXG4gICAgICAgICAgPC9FcnJvckJvdW5kYXJ5PlxyXG4gICAgICAgIH0sIHsgbW9kYWxLZXk6IGtleSB9KTtcclxuICAgICAgICBpZiAodGltZW91dCkge1xyXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghaW50ZXJhY3RlZCkge1xyXG4gICAgICAgICAgICAgIHJlc29sdmUoZmFsc2UpO1xyXG4gICAgICAgICAgICAgIG1vZGFscy5hY3Rpb25zLmNsb3NlKG1vZGFsS2V5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSwgdGltZW91dCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICB1c2VyKHVzZXJJZCkge1xyXG4gICAgICBpZiAoIVVzZXJTdG9yZS5nZXRVc2VyKHVzZXJJZCkpIHJldHVybiBmYWxzZTtcclxuICAgICAgRmx1eERpc3BhdGNoZXIuZGlzcGF0Y2goeyB0eXBlOiBcIlVTRVJfUFJPRklMRV9NT0RBTF9PUEVOXCIsIHVzZXJJZCB9KTtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9LFxyXG4gICAgYWxlcnQodGl0bGUsIGNvbnRlbnQsIHsgY29uZmlybSA9IG51bGwsIGtleSA9IHVuZGVmaW5lZCwgdGltZW91dCA9IDYwMDAwICogNSB9ID0ge30pIHtcclxuICAgICAgcmV0dXJuIHRoaXMuY29uZmlybWF0aW9uKHRpdGxlLCBjb250ZW50LCB7IGNvbmZpcm0sIGNhbmNlbDogbnVsbCwga2V5LCB0aW1lb3V0IH0pO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgY2xvc2Uoa2V5KSB7XHJcbiAgICByZXR1cm4gbW9kYWxzLmFjdGlvbnMuY2xvc2Uoa2V5KTtcclxuICB9XHJcbn0iLCAiaW1wb3J0IGRvbSBmcm9tIFwiLi4vZG9tL2luZGV4LmpzXCI7XHJcblxyXG5mdW5jdGlvbiBnZXRDb250YWluZXIoKSB7XHJcbiAgY29uc3QgYXBwRWxtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2NsYXNzKj1cIm5vdEFwcEFzaWRlUGFuZWwtXCJdJyk7XHJcblxyXG4gIGxldCB0b3BDb250YWluZXIgPSBhcHBFbG0ucXVlcnlTZWxlY3RvcihcIi5hY29yZC0tdG9hc3RzLWNvbnRhaW5lclwiKTtcclxuICBpZiAoIXRvcENvbnRhaW5lcikge1xyXG4gICAgdG9wQ29udGFpbmVyID0gZG9tLnBhcnNlKGA8ZGl2IGNsYXNzPVwiYWNvcmQtLWxheWVyLWNvbnRhaW5lciBhY29yZC0tdG9hc3RzLWNvbnRhaW5lclwiPjwvZGl2PmApO1xyXG4gICAgYXBwRWxtLmFwcGVuZENoaWxkKHRvcENvbnRhaW5lcik7XHJcbiAgfVxyXG4gIHRvcENvbnRhaW5lci5zdHlsZS5zZXRQcm9wZXJ0eShcIi0tdG9wLW9mZnNldFwiLCBgJHthcHBFbG0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wLnRvRml4ZWQoMSl9cHhgKTtcclxuXHJcbiAgcmV0dXJuIHRvcENvbnRhaW5lcjtcclxufVxyXG5cclxuY29uc3QgaWNvbnMgPSB7XHJcbiAgaW5mbzogYDxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiPjxwYXRoIGQ9XCJNMTIgMjJDNi40NzcgMjIgMiAxNy41MjMgMiAxMlM2LjQ3NyAyIDEyIDJzMTAgNC40NzcgMTAgMTAtNC40NzcgMTAtMTAgMTB6bS0xLTExdjZoMnYtNmgtMnptMC00djJoMlY3aC0yelwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIiAvPjwvc3ZnPmAsXHJcbiAgd2FybmluZzogYDxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiPjxwYXRoIGQ9XCJNMTIgMjJDNi40NzcgMjIgMiAxNy41MjMgMiAxMlM2LjQ3NyAyIDEyIDJzMTAgNC40NzcgMTAgMTAtNC40NzcgMTAtMTAgMTB6bS0xLTd2Mmgydi0yaC0yem0wLTh2NmgyVjdoLTJ6XCIgZmlsbD1cImN1cnJlbnRDb2xvclwiIC8+PC9zdmc+YCxcclxuICBlcnJvcjogYDxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiPjxwYXRoIGQ9XCJNMTIgMjJDNi40NzcgMjIgMiAxNy41MjMgMiAxMlM2LjQ3NyAyIDEyIDJzMTAgNC40NzcgMTAgMTAtNC40NzcgMTAtMTAgMTB6bS0xLTd2Mmgydi0yaC0yem0wLTh2NmgyVjdoLTJ6XCJmaWxsPVwiY3VycmVudENvbG9yXCIgLz48L3N2Zz5gLFxyXG4gIHN1Y2Nlc3M6IGA8c3ZnIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMjRcIj48cGF0aCBkPVwiTTEyIDIyQzYuNDc3IDIyIDIgMTcuNTIzIDIgMTJTNi40NzcgMiAxMiAyczEwIDQuNDc3IDEwIDEwLTQuNDc3IDEwLTEwIDEwem0tLjk5Ny02bDcuMDctNy4wNzEtMS40MTQtMS40MTQtNS42NTYgNS42NTctMi44MjktMi44MjktMS40MTQgMS40MTRMMTEuMDAzIDE2elwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIiAvPjwvc3ZnPmBcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIHNob3coXHJcbiAgY29udGVudCxcclxuICB7XHJcbiAgICBzdHlsZSA9IFwiZGVmYXVsdFwiLFxyXG4gICAgdGltZW91dCA9IDM1MDAsXHJcbiAgICBvbkNsaWNrID0gbnVsbCxcclxuICAgIGhpZGVJY29uID0gZmFsc2VcclxuICB9ID0ge31cclxuKSB7XHJcbiAgY29uc3QgY29udGFpbmVyID0gZ2V0Q29udGFpbmVyKCk7XHJcblxyXG4gIGNvbnN0IHRvYXN0RWxtID0gZG9tLnBhcnNlKGBcclxuICAgIDxkaXYgY2xhc3M9XCJhY29yZC0tdG9hc3Qgc3R5bGUtJHtzdHlsZX0gaGlkZGVuXCI+XHJcbiAgICAgICR7aGlkZUljb24gPyBcIlwiIDogKGljb25zW3N0eWxlXSB8fCBcIlwiKX1cclxuICAgICAgPGRpdiBjbGFzcz1cImNvbnRlbnRcIj48L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIGApO1xyXG5cclxuICB0b2FzdEVsbS5xdWVyeVNlbGVjdG9yKFwiLmNvbnRlbnRcIikuaW5uZXJIVE1MID0gY29udGVudDtcclxuXHJcbiAgbGV0IGNsb3NlZCA9IGZhbHNlO1xyXG4gIGZ1bmN0aW9uIGNsb3NlKCkge1xyXG4gICAgaWYgKGNsb3NlZCkgcmV0dXJuO1xyXG4gICAgY2xvc2VkID0gdHJ1ZTtcclxuXHJcbiAgICB0b2FzdEVsbS5jbGFzc0xpc3QuYWRkKFwiY2xvc2luZ1wiKTtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICB0b2FzdEVsbS5yZW1vdmUoKTtcclxuXHJcbiAgICAgIHV0aWxzLmlmRXhpc3RzKFxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5hY29yZC0tdG9hc3RzLWNvbnRhaW5lcmApLFxyXG4gICAgICAgIC8qKiBAcGFyYW0ge0hUTUxEaXZFbGVtZW50fSBlbG0gKi8oZWxtKSA9PiB7XHJcbiAgICAgICAgICBpZiAoIWVsbS5jaGlsZEVsZW1lbnRDb3VudCkgZWxtLnJlbW92ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgKTtcclxuICAgIH0sIDI3NSk7XHJcbiAgfVxyXG5cclxuICBpZiAodHlwZW9mIG9uQ2xpY2sgPT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICB0b2FzdEVsbS5jbGFzc0xpc3QuYWRkKFwiY2xpY2thYmxlXCIpO1xyXG4gICAgdG9hc3RFbG0ub25jbGljayA9ICgpID0+IHtcclxuICAgICAgb25DbGljayhjbG9zZSk7XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKHRvYXN0RWxtKTtcclxuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xyXG4gICAgdG9hc3RFbG0uY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcclxuICB9KTtcclxuXHJcbiAgc2V0VGltZW91dChjbG9zZSwgdGltZW91dCk7XHJcblxyXG4gIHJldHVybiAoKSA9PiB7XHJcbiAgICBjbG9zZSgpO1xyXG4gIH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBzaG93OiBPYmplY3QuYXNzaWduKHNob3csIHtcclxuICAgIGluZm86IChodG1sLCBvYmogPSB7fSkgPT4gc2hvdyhodG1sLCB7IC4uLm9iaiwgc3R5bGU6IFwiaW5mb1wiIH0pLFxyXG4gICAgZXJyb3I6IChodG1sLCBvYmogPSB7fSkgPT4gc2hvdyhodG1sLCB7IC4uLm9iaiwgc3R5bGU6IFwiZXJyb3JcIiB9KSxcclxuICAgIHdhcm5pbmc6IChodG1sLCBvYmogPSB7fSkgPT4gc2hvdyhodG1sLCB7IC4uLm9iaiwgc3R5bGU6IFwid2FybmluZ1wiIH0pLFxyXG4gICAgc3VjY2VzczogKGh0bWwsIG9iaiA9IHt9KSA9PiBzaG93KGh0bWwsIHsgLi4ub2JqLCBzdHlsZTogXCJzdWNjZXNzXCIgfSlcclxuICB9KVxyXG59IiwgImltcG9ydCB3ZWJwYWNrIGZyb20gXCIuLi8uLi8uLi8uLi8uLi9hcGkvbW9kdWxlcy93ZWJwYWNrLmpzXCI7XHJcblxyXG5jb25zdCBidXR0b25DbGFzc2VzID0gd2VicGFjay5maW5kQnlQcm9wZXJ0aWVzKFwibG93U2F0dXJhdGlvblVuZGVybGluZVwiLCBcImJ1dHRvblwiLCBcImRpc2FibGVkQnV0dG9uT3ZlcmxheVwiKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAvKiogQHBhcmFtIHtpbXBvcnQoXCJ2dWVcIikuQXBwfSB2dWVBcHAgKi9cclxuICBsb2FkKHZ1ZUFwcCkge1xyXG4gICAgdnVlQXBwLmNvbXBvbmVudChcImRpc2NvcmQtYnV0dG9uXCIsIHtcclxuICAgICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8ZGl2IGNsYXNzPVwiJHtidXR0b25DbGFzc2VzLmJ1dHRvbn0gJHtidXR0b25DbGFzc2VzLmxvb2tGaWxsZWR9ICR7YnV0dG9uQ2xhc3Nlcy5ncm93fVwiIDpjbGFzcz1cIlxcYFxcJHtjb2xvciA/IGJ1dHRvbkNsYXNzZXNbXFxgY29sb3JcXCR7Y29sb3JbMF0udG9VcHBlckNhc2UoKX1cXCR7Y29sb3Iuc2xpY2UoMSkudG9Mb3dlckNhc2UoKX1cXGBdIDogYnV0dG9uQ2xhc3Nlcy5jb2xvckJyYW5kfSBcXCR7c2l6ZSA/IGJ1dHRvbkNsYXNzZXNbXFxgc2l6ZVxcJHtzaXplWzBdLnRvVXBwZXJDYXNlKCl9XFwke3NpemUuc2xpY2UoMSkudG9Mb3dlckNhc2UoKX1cXGBdIDogYnV0dG9uQ2xhc3Nlcy5zaXplU21hbGx9XFxgXCIgQGNsaWNrPVwib25DbGlja1wiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cIiR7YnV0dG9uQ2xhc3Nlcy5jb250ZW50c31cIj57e3ZhbHVlfX08L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgYCxcclxuICAgICAgcHJvcHM6IFtcInZhbHVlXCIsIFwic2l6ZVwiLCBcImNvbG9yXCJdLFxyXG4gICAgICBlbWl0czogW1wiY2xpY2tcIl0sXHJcbiAgICAgIGRhdGEoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIGJ1dHRvbkNsYXNzZXNcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIG1ldGhvZHM6IHtcclxuICAgICAgICBvbkNsaWNrKGUpIHtcclxuICAgICAgICAgIHRoaXMuJGVtaXQoXCJjbGlja1wiLCBlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufSIsICJleHBvcnQgZGVmYXVsdCBgXG4uYWNvcmQtLWRpc2NvcmQtY2hlY2t7Y29sb3I6dmFyKC0td2hpdGUtNzAwKTtiYWNrZ3JvdW5kLWNvbG9yOmN1cnJlbnRDb2xvcjt6LWluZGV4OjB9LmFjb3JkLS1kaXNjb3JkLWNoZWNrIC5zbGlkZXJ7dHJhbnNpdGlvbjoxMDBtcyBlYXNlLWluLW91dCBhbGw7bGVmdDotM3B4fS5hY29yZC0tZGlzY29yZC1jaGVjay5jaGVja2Vke2NvbG9yOnZhcigtLWdyZWVuLTQwMCl9LmFjb3JkLS1kaXNjb3JkLWNoZWNrLmNoZWNrZWQgLnNsaWRlcnt0cmFuc2l0aW9uOjEwMG1zIGVhc2UtaW4tb3V0IGFsbDtsZWZ0OjEycHh9YDtcbiIsICJpbXBvcnQgd2VicGFjayBmcm9tIFwiLi4vLi4vLi4vLi4vbW9kdWxlcy93ZWJwYWNrLmpzXCI7XHJcbmltcG9ydCBwYXRjaGVyIGZyb20gXCIuLi8uLi8uLi8uLi9wYXRjaGVyL2luZGV4LmpzXCI7XHJcbmltcG9ydCBjc3NUZXh0IGZyb20gXCIuL3N0eWxlLnNjc3NcIjtcclxucGF0Y2hlci5pbmplY3RDU1MoY3NzVGV4dCk7XHJcblxyXG5jb25zdCBjaGVja0NsYXNzZXMgPSB3ZWJwYWNrLmZpbmRCeVByb3BlcnRpZXMoXCJjaGVja2VkXCIsIFwiY29udGFpbmVyXCIsIFwic2xpZGVyXCIpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIC8qKiBAcGFyYW0ge2ltcG9ydChcInZ1ZVwiKS5BcHB9IHZ1ZUFwcCAqL1xyXG4gIGxvYWQodnVlQXBwKSB7XHJcbiAgICB2dWVBcHAuY29tcG9uZW50KFwiZGlzY29yZC1jaGVja1wiLCB7XHJcbiAgICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cIiR7Y2hlY2tDbGFzc2VzLmNvbnRhaW5lcn0gZGVmYXVsdC1jb2xvcnMgYWNvcmQtLWRpc2NvcmQtY2hlY2tcIiBcclxuICAgICAgICAgIDpjbGFzcz1cInsnJHtjaGVja0NsYXNzZXMuY2hlY2tlZH0nOiBtb2RlbFZhbHVlLCAnY2hlY2tlZCc6IG1vZGVsVmFsdWV9XCIgXHJcbiAgICAgICAgICBAY2xpY2s9XCJvbkNsaWNrXCJcclxuICAgICAgICA+XHJcbiAgICAgICAgICA8c3ZnIGNsYXNzPVwiJHtjaGVja0NsYXNzZXMuc2xpZGVyfSBzbGlkZXJcIiB2aWV3Qm94PVwiMCAwIDI4IDIwXCIgcHJlc2VydmVBc3BlY3RSYXRpbz1cInhNaW5ZTWlkIG1lZXRcIj5cclxuICAgICAgICAgICAgPHJlY3QgZmlsbD1cIndoaXRlXCIgeD1cIjRcIiB5PVwiMFwiIHJ4PVwiMTBcIiB3aWR0aD1cIjIwXCIgaGVpZ2h0PVwiMjBcIj48L3JlY3Q+XHJcbiAgICAgICAgICAgIDxzdmcgdi1pZj1cIm1vZGVsVmFsdWVcIiB2aWV3Qm94PVwiMCAwIDIwIDIwXCIgZmlsbD1cIm5vbmVcIj5cclxuICAgICAgICAgICAgICA8cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk03Ljg5NTYxIDE0Ljg1MzhMNi4zMDQ2MiAxMy4yNjI5TDE0LjMwOTkgNS4yNTc1NUwxNS45MDA5IDYuODQ4NTRMNy44OTU2MSAxNC44NTM4WlwiPjwvcGF0aD5cclxuICAgICAgICAgICAgICA8cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk00LjA4NjQzIDExLjA5MDNMNS42Nzc0MiA5LjQ5OTI5TDkuNDQ4NSAxMy4yNzA0TDcuODU3NTEgMTQuODYxNEw0LjA4NjQzIDExLjA5MDNaXCI+PC9wYXRoPlxyXG4gICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgPHN2ZyB2LWVsc2Ugdmlld0JveD1cIjAgMCAyMCAyMFwiIGZpbGw9XCJub25lXCI+XHJcbiAgICAgICAgICAgICAgPHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNNS4xMzIzMSA2LjcyOTYzTDYuNzIzMyA1LjEzODY0TDE0Ljg1NSAxMy4yNzA0TDEzLjI2NCAxNC44NjE0TDUuMTMyMzEgNi43Mjk2M1pcIj48L3BhdGg+XHJcbiAgICAgICAgICAgICAgPHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNMTMuMjcwNCA1LjEzODY0TDE0Ljg2MTQgNi43Mjk2M0w2LjcyOTYzIDE0Ljg2MTRMNS4xMzg2NCAxMy4yNzA0TDEzLjI3MDQgNS4xMzg2NFpcIj48L3BhdGg+XHJcbiAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIGAsXHJcbiAgICAgIHByb3BzOiB7XHJcbiAgICAgICAgbW9kZWxWYWx1ZToge1xyXG4gICAgICAgICAgZGVmYXVsdCgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgZW1pdHM6IFsndXBkYXRlOm1vZGVsVmFsdWUnLCAnY2hhbmdlJ10sXHJcbiAgICAgIG1ldGhvZHM6IHtcclxuICAgICAgICBvbkNsaWNrKGV2ZW50KSB7XHJcbiAgICAgICAgICBsZXQgbmV3VmFsdWUgPSAhdGhpcy5tb2RlbFZhbHVlO1xyXG4gICAgICAgICAgdGhpcy4kZW1pdChcInVwZGF0ZTptb2RlbFZhbHVlXCIsIG5ld1ZhbHVlKTtcclxuICAgICAgICAgIHRoaXMuJGVtaXQoXCJjaGFuZ2VcIiwgeyB2YWx1ZTogbmV3VmFsdWUsIGV2ZW50IH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59IiwgImltcG9ydCB3ZWJwYWNrIGZyb20gXCIuLi8uLi8uLi8uLi8uLi9hcGkvbW9kdWxlcy93ZWJwYWNrLmpzXCI7XHJcblxyXG5sZXQgaW5wdXRDbGFzc2VzID0gd2VicGFjay5maW5kQnlQcm9wZXJ0aWVzKFwiaW5wdXREZWZhdWx0XCIsIFwiY29weUlucHV0XCIpO1xyXG5sZXQgaW5wdXRDbGFzc2VzMiA9IHdlYnBhY2suZmluZEJ5UHJvcGVydGllcyhcImlucHV0XCIsIFwiZWRpdGFibGVcIiwgXCJkaXNhYmxlZFwiLCBcImlucHV0V3JhcHBlclwiKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAvKiogQHBhcmFtIHtpbXBvcnQoXCJ2dWVcIikuQXBwfSB2dWVBcHAgKi9cclxuICBsb2FkKHZ1ZUFwcCkge1xyXG4gICAgdnVlQXBwLmNvbXBvbmVudChcImRpc2NvcmQtaW5wdXRcIiwge1xyXG4gICAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCIke2lucHV0Q2xhc3NlczI/LmlucHV0fVwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cIiR7aW5wdXRDbGFzc2VzPy5pbnB1dFdyYXBwZXJ9XCI+XHJcbiAgICAgICAgICAgIDxpbnB1dCA6dHlwZT1cInR5cGUgPz8gJ3RleHQnXCIgY2xhc3M9XCIke2lucHV0Q2xhc3Nlcz8uaW5wdXREZWZhdWx0fVwiIHYtYmluZD1cInZhbHVlXCIgOnBsYWNlaG9sZGVyPVwicGxhY2Vob2xkZXJcIiA6bWF4bGVuZ3RoPVwibWF4bGVuZ3RoXCIgOnN0eWxlPVwic3R5bGVcIiBAY2hhbmdlPVwib25DaGFuZ2VcIiAvPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIGAsXHJcbiAgICAgIHByb3BzOiBbXCJ2YWx1ZVwiLCBcInBsYWNlaG9sZGVyXCIsIFwidHlwZVwiLCBcIm1heGxlbmd0aFwiLCBcInN0eWxlXCJdLFxyXG4gICAgICBlbWl0czogW1wiY2hhbmdlXCJdLFxyXG4gICAgICBtZXRob2RzOiB7XHJcbiAgICAgICAgb25DaGFuZ2UoZXZlbnQpIHtcclxuICAgICAgICAgIHRoaXMuJGVtaXQoXCJjaGFuZ2VcIiwgeyBldmVudCwgdmFsdWU6IGV2ZW50LnRhcmdldC52YWx1ZSB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufSIsICJleHBvcnQgZGVmYXVsdCBgXG4uYWNvcmQtLWRpc2NvcmQtc2VsZWN0e3Bvc2l0aW9uOnJlbGF0aXZlO3dpZHRoOjEwMCV9LmFjb3JkLS1kaXNjb3JkLXNlbGVjdD4ub3B0aW9uc3twb3NpdGlvbjphYnNvbHV0ZTt0b3A6MTAwJTt3aWR0aDoxMDAlO21heC1oZWlnaHQ6Mjg2cHg7b3ZlcmZsb3cteDpoaWRkZW47b3ZlcmZsb3cteTpzY3JvbGw7ei1pbmRleDoxfS5hY29yZC0tZGlzY29yZC1zZWxlY3Q+Lm9wdGlvbnMudG9wLXBvcG91dHt0b3A6YXV0bztib3R0b206MTAwJX1gO1xuIiwgImltcG9ydCB3ZWJwYWNrIGZyb20gXCIuLi8uLi8uLi8uLi9tb2R1bGVzL3dlYnBhY2suanNcIjtcclxuaW1wb3J0IHBhdGNoZXIgZnJvbSBcIi4uLy4uLy4uLy4uL3BhdGNoZXIvaW5kZXguanNcIjtcclxuXHJcbmltcG9ydCBjc3NUZXh0IGZyb20gXCIuL3N0eWxlLnNjc3NcIjtcclxucGF0Y2hlci5pbmplY3RDU1MoY3NzVGV4dCk7XHJcblxyXG5jb25zdCBzZWxlY3RDbGFzc2VzID0gd2VicGFjay5maW5kQnlQcm9wZXJ0aWVzKFwic2VsZWN0XCIsIFwic2VhcmNoYWJsZVNlbGVjdFwiLCBcIm11bHRpU2VsZWN0Q2hlY2tcIik7XHJcbmNvbnN0IHNjcm9sbENsYXNzZXMgPSB3ZWJwYWNrLmZpbmRCeVByb3BlcnRpZXMoXCJtYW5hZ2VkUmVhY3RpdmVTY3JvbGxlclwiLCBcInNjcm9sbGVyQmFzZVwiLCBcInRoaW5cIik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgLyoqIEBwYXJhbSB7aW1wb3J0KFwidnVlXCIpLkFwcH0gdnVlQXBwICovXHJcbiAgbG9hZCh2dWVBcHApIHtcclxuICAgIHZ1ZUFwcC5jb21wb25lbnQoXCJkaXNjb3JkLXNlbGVjdFwiLCB7XHJcbiAgICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cIiR7c2VsZWN0Q2xhc3Nlcy5zZWxlY3R9ICR7c2VsZWN0Q2xhc3Nlcy5sb29rRmlsbGVkfSBhY29yZC0tZGlzY29yZC1zZWxlY3RcIiA6Y2xhc3M9XCJ7JyR7c2VsZWN0Q2xhc3Nlcy5vcGVufSc6IGFjdGl2ZX1cIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCIke3NlbGVjdENsYXNzZXMudmFsdWV9XCI+e3tvcHRpb25zLmZpbmQoaT0+aS52YWx1ZSA9PT0gbW9kZWxWYWx1ZSk/LmxhYmVsfX08L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCIke3NlbGVjdENsYXNzZXMuaWNvbnN9XCI+XHJcbiAgICAgICAgICAgICAgPHN2ZyB2LWlmPVwiIWFjdGl2ZVwiIGNsYXNzPVwiaWNvblwiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj48cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk0xNi41OSA4LjU5MDAzTDEyIDEzLjE3TDcuNDEgOC41OTAwM0w2IDEwTDEyIDE2TDE4IDEwTDE2LjU5IDguNTkwMDNaXCI+PC9wYXRoPjwvc3ZnPlxyXG4gICAgICAgICAgICAgIDxzdmcgdi1lbHNlIGNsYXNzPVwiaWNvblwiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj48cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk03LjQxIDE2LjAwMDFMMTIgMTEuNDIwMUwxNi41OSAxNi4wMDAxTDE4IDE0LjU5MDFMMTIgOC41OTAwNkw2IDE0LjU5MDFMNy40MSAxNi4wMDAxWlwiPjwvcGF0aD48L3N2Zz5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdiB2LWlmPVwiYWN0aXZlXCIgY2xhc3M9XCJvcHRpb25zICR7c2VsZWN0Q2xhc3Nlcy5wb3BvdXR9ICR7c2Nyb2xsQ2xhc3Nlcy5zY3JvbGxlckJhc2V9ICR7c2Nyb2xsQ2xhc3Nlcy50aGlufVwiIDpjbGFzcz1cInsndG9wLXBvcG91dCc6IHBvcG91dFBvc2l0aW9uID09PSAndG9wJ31cIj5cclxuICAgICAgICAgICAgPGRpdiB2LWZvcj1cIm9wdGlvbiBpbiBvcHRpb25zXCIgY2xhc3M9XCJvcHRpb24gJHtzZWxlY3RDbGFzc2VzLm9wdGlvbn1cIiBAY2xpY2s9XCJvbk9wdGlvbkNsaWNrKCRldmVudCwgb3B0aW9uKVwiIDprZXk9XCJvcHRpb24udmFsdWVcIiA6YXJpYS1zZWxlY3RlZD1cIlxcYFxcJHttb2RlbFZhbHVlID09PSBvcHRpb24udmFsdWV9XFxgXCI+XHJcbiAgICAgICAgICAgICAge3tvcHRpb24ubGFiZWx9fVxyXG4gICAgICAgICAgICAgIDxzdmcgdi1pZj1cIm1vZGVsVmFsdWUgPT09IG9wdGlvbi52YWx1ZVwiIGNsYXNzPVwiJHtzZWxlY3RDbGFzc2VzLnNlbGVjdGVkSWNvbn1cIiByb2xlPVwiaW1nXCIgd2lkdGg9XCIyMFwiIGhlaWdodD1cIjIwXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj48Y2lyY2xlIHI9XCI4XCIgY3g9XCIxMlwiIGN5PVwiMTJcIiBmaWxsPVwid2hpdGVcIj48L2NpcmNsZT48ZyBmaWxsPVwibm9uZVwiIGZpbGwtcnVsZT1cImV2ZW5vZGRcIj48cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk0xMiAyQzYuNDggMiAyIDYuNDggMiAxMnM0LjQ4IDEwIDEwIDEwIDEwLTQuNDggMTAtMTBTMTcuNTIgMiAxMiAyem0tMiAxNWwtNS01IDEuNDEtMS40MUwxMCAxNC4xN2w3LjU5LTcuNTlMMTkgOGwtOSA5elwiPjwvcGF0aD48L2c+PC9zdmc+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIGAsXHJcbiAgICAgIGRhdGEoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHNlbGVjdENsYXNzZXMsXHJcbiAgICAgICAgICBhY3RpdmU6IGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBwcm9wczogW1wib3B0aW9uc1wiLCBcIm1vZGVsVmFsdWVcIiwgXCJwb3BvdXRQb3NpdGlvblwiXSxcclxuICAgICAgZW1pdHM6IFsndXBkYXRlOm1vZGVsVmFsdWUnLCBcImNoYW5nZVwiXSxcclxuICAgICAgbW91bnRlZCgpIHtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMub25DbGljayk7XHJcbiAgICAgIH0sXHJcbiAgICAgIHVubW91bnRlZCgpIHtcclxuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMub25DbGljayk7XHJcbiAgICAgIH0sXHJcbiAgICAgIG1ldGhvZHM6IHtcclxuICAgICAgICBvbk9wdGlvbkNsaWNrKGV2ZW50LCBvcHRpb24pIHtcclxuICAgICAgICAgIHRoaXMuJGVtaXQoXCJ1cGRhdGU6bW9kZWxWYWx1ZVwiLCBvcHRpb24udmFsdWUpO1xyXG4gICAgICAgICAgdGhpcy4kZW1pdChcImNoYW5nZVwiLCB7IHZhbHVlOiBvcHRpb24udmFsdWUsIGV2ZW50IH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb25DbGljayhlKSB7XHJcbiAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhzZWxlY3RDbGFzc2VzLnNlbGVjdClcclxuICAgICAgICAgICAgfHwgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKHNlbGVjdENsYXNzZXMudmFsdWUpXHJcbiAgICAgICAgICAgIHx8IGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhzZWxlY3RDbGFzc2VzLmljb25zKVxyXG4gICAgICAgICAgICB8fCBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoc2VsZWN0Q2xhc3Nlcy5wb3BvdXQpXHJcbiAgICAgICAgICAgIHx8IGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhzZWxlY3RDbGFzc2VzLm9wdGlvbilcclxuICAgICAgICAgICAgfHwgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaWNvblwiKVxyXG4gICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlID0gIXRoaXMuYWN0aXZlO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59IiwgImV4cG9ydCBkZWZhdWx0IGBcbi5hY29yZC0tZGlzY29yZC10ZXh0YXJlYXt3aWR0aDoxMDAlfWA7XG4iLCAiaW1wb3J0IHdlYnBhY2sgZnJvbSBcIi4uLy4uLy4uLy4uL21vZHVsZXMvd2VicGFjay5qc1wiO1xyXG5pbXBvcnQgcGF0Y2hlciBmcm9tIFwiLi4vLi4vLi4vLi4vcGF0Y2hlci9pbmRleC5qc1wiO1xyXG5cclxuaW1wb3J0IGNzc1RleHQgZnJvbSBcIi4vc3R5bGUuc2Nzc1wiO1xyXG5wYXRjaGVyLmluamVjdENTUyhjc3NUZXh0KTtcclxuXHJcbmxldCBpbnB1dENsYXNzZXMgPSB3ZWJwYWNrLmZpbmRCeVByb3BlcnRpZXMoXCJ0ZXh0QXJlYVwiLCBcIm1heExlbmd0aFwiLCBcImNoYXJhY3RlckNvdW50XCIpO1xyXG5sZXQgaW5wdXRDbGFzc2VzMiA9IHdlYnBhY2suZmluZEJ5UHJvcGVydGllcyhcImlucHV0V3JhcHBlclwiLCBcImlucHV0RGVmYXVsdFwiKTtcclxubGV0IHNjcm9sbENsYXNzZXMgPSB3ZWJwYWNrLmZpbmRCeVByb3BlcnRpZXMoXCJzY3JvbGxiYXJEZWZhdWx0XCIsIFwic2Nyb2xsYmFyXCIsIFwic2Nyb2xsYmFyR2hvc3RcIik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgLyoqIEBwYXJhbSB7aW1wb3J0KFwidnVlXCIpLkFwcH0gdnVlQXBwICovXHJcbiAgbG9hZCh2dWVBcHApIHtcclxuICAgIHZ1ZUFwcC5jb21wb25lbnQoXCJkaXNjb3JkLXRleHRhcmVhXCIsIHtcclxuICAgICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8ZGl2IGNsYXNzPVwiJHtpbnB1dENsYXNzZXMyLmlucHV0V3JhcHBlcn0gYWNvcmQtLWRpc2NvcmQtdGV4dGFyZWFcIj5cclxuICAgICAgICAgIDx0ZXh0YXJlYSBjbGFzcz1cIiR7aW5wdXRDbGFzc2VzMi5pbnB1dERlZmF1bHR9ICR7aW5wdXRDbGFzc2VzLnRleHRBcmVhfSAke3Njcm9sbENsYXNzZXMuc2Nyb2xsYmFyRGVmYXVsdH1cIiB2LWJpbmQ9XCJ2YWx1ZVwiIDpwbGFjZWhvbGRlcj1cInBsYWNlaG9sZGVyXCIgOm1heGxlbmd0aD1cIm1heGxlbmd0aFwiIDpjb2xzPVwiY29sc1wiIDpyb3dzPVwicm93c1wiIDpzdHlsZT1cInN0eWxlXCI+PC90ZXh0YXJlYT5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgYCxcclxuICAgICAgcHJvcHM6IFtcInZhbHVlXCIsIFwicGxhY2Vob2xkZXJcIiwgXCJtYXhsZW5ndGhcIiwgXCJzdHlsZVwiLCBcImNvbHNcIiwgXCJyb3dzXCJdLFxyXG4gICAgICBlbWl0czogW1wiY2hhbmdlXCJdLFxyXG4gICAgICBtZXRob2RzOiB7XHJcbiAgICAgICAgb25DaGFuZ2UoZXZlbnQpIHtcclxuICAgICAgICAgIHRoaXMuJGVtaXQoXCJjaGFuZ2VcIiwgeyBldmVudCwgdmFsdWU6IGV2ZW50LnRhcmdldC52YWx1ZSB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iLCAiaW1wb3J0IGRpc2NvcmRCdXR0b24gZnJvbSBcIi4vZGlzY29yZC1idXR0b24vaW5kZXguanNcIjtcclxuaW1wb3J0IGRpc2NvcmRDaGVjayBmcm9tIFwiLi9kaXNjb3JkLWNoZWNrL2luZGV4LmpzXCI7XHJcbmltcG9ydCBkaXNjb3JkSW5wdXQgZnJvbSBcIi4vZGlzY29yZC1pbnB1dC9pbmRleC5qc1wiO1xyXG5pbXBvcnQgZGlzY29yZFNlbGVjdCBmcm9tIFwiLi9kaXNjb3JkLXNlbGVjdC9pbmRleC5qc1wiO1xyXG5pbXBvcnQgZGlzY29yZFRleHRhcmVhIGZyb20gXCIuL2Rpc2NvcmQtdGV4dGFyZWEvaW5kZXguanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBsb2FkKHZ1ZUFwcCkge1xyXG4gICAgZGlzY29yZENoZWNrLmxvYWQodnVlQXBwKTtcclxuICAgIGRpc2NvcmRUZXh0YXJlYS5sb2FkKHZ1ZUFwcCk7XHJcbiAgICBkaXNjb3JkU2VsZWN0LmxvYWQodnVlQXBwKTtcclxuICAgIGRpc2NvcmRJbnB1dC5sb2FkKHZ1ZUFwcCk7XHJcbiAgICBkaXNjb3JkQnV0dG9uLmxvYWQodnVlQXBwKTtcclxuICB9XHJcbn0iLCAiLy8gaHR0cHM6Ly9sb2dhcmV0bS5jb20vYmxvZy9mb3JjaW5nLXJlY29tcHV0YXRpb24tb2YtY29tcHV0ZWQtcHJvcGVydGllcy9cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZWNvbXB1dGUodm0sIHByb3BOYW1lKSB7XHJcbiAgLy8gaGFuZGxlIG5vbi1leGlzdGVudCBwcm9wcy5cclxuICBpZiAoIXZtLiRfX3JlY29tcHV0YWJsZXMgfHwgIXZtLiRfX3JlY29tcHV0YWJsZXNbcHJvcE5hbWVdKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICB2bS4kX19yZWNvbXB1dGFibGVzW3Byb3BOYW1lXS5iYWNrZG9vcisrO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmVjb21wdXRhYmxlKGZuLCBuYW1lKSB7XHJcbiAgY29uc3QgcmVhY3RpdmUgPSBWdWUuY29tcHV0ZWQoe1xyXG4gICAgYmFja2Rvb3I6IDBcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuICAgIC8vIGluaXRpYWxpemUgYSBtYXAgb25jZS5cclxuICAgIGlmICghdGhpcy4kX19yZWNvbXB1dGFibGVzKSB7XHJcbiAgICAgIHRoaXMuJF9fcmVjb21wdXRhYmxlcyA9IHt9O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGFkZCBhIHJlZmVyZW5jZSB0byBteSByZWFjdGl2ZSBiYWNrZG9vciB0cmlnZ2VyLlxyXG4gICAgaWYgKCF0aGlzLiRfX3JlY29tcHV0YWJsZXNbZm4ubmFtZSB8fCBuYW1lXSkge1xyXG4gICAgICB0aGlzLiRfX3JlY29tcHV0YWJsZXNbZm4ubmFtZSB8fCBuYW1lXSA9IHJlYWN0aXZlO1xyXG4gICAgfVxyXG5cclxuICAgIHJlYWN0aXZlLmJhY2tkb29yOyAvLyByZWZlcmVuY2UgaXQhXHJcblxyXG4gICAgcmV0dXJuIGZuLmNhbGwodGhpcyk7XHJcbiAgfTtcclxufSIsICJpbXBvcnQgdnVlQ29tcG9uZW50cyBmcm9tIFwiLi9jb21wb25lbnRzL2luZGV4LmpzXCI7XHJcbmltcG9ydCB7IHJlY29tcHV0YWJsZSwgcmVjb21wdXRlIH0gZnJvbSBcIi4vdXRpbHMvcmVjb21wdXRlLmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgY29tcG9uZW50czoge1xyXG4gICAgbG9hZCh2dWVBcHApIHtcclxuICAgICAgdnVlQ29tcG9uZW50cy5sb2FkKHZ1ZUFwcCk7XHJcbiAgICB9XHJcbiAgfSxcclxuICByZWFkeToge1xyXG4gICAgYXN5bmMgd2hlbigpIHtcclxuICAgICAgd2hpbGUgKCF3aW5kb3cuVnVlKSB7XHJcbiAgICAgICAgYXdhaXQgbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIDEwMCkpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSxcclxuICAgIGdldCBpcygpIHtcclxuICAgICAgcmV0dXJuICEhd2luZG93LlZ1ZTtcclxuICAgIH1cclxuICB9LFxyXG4gIGdldCBWdWUoKSB7XHJcbiAgICByZXR1cm4gd2luZG93LlZ1ZTtcclxuICB9LFxyXG4gIHV0aWxzOiB7XHJcbiAgICBjb21wdXRlZDoge1xyXG4gICAgICByZWNvbXB1dGUsXHJcbiAgICAgIHJlY29tcHV0YWJsZVxyXG4gICAgfVxyXG4gIH1cclxufSIsICJpbXBvcnQgcGF0Y2hlciBmcm9tIFwiLi4vcGF0Y2hlci9pbmRleC5qc1wiO1xyXG5pbXBvcnQgc3R5bGVDU1NUZXh0IGZyb20gXCIuL3N0eWxlcy5zY3NzXCI7XHJcbnBhdGNoZXIuaW5qZWN0Q1NTKHN0eWxlQ1NTVGV4dCk7XHJcblxyXG5pbXBvcnQgdG9vbHRpcHMgZnJvbSBcIi4vdG9vbHRpcHMuanNcIjtcclxuaW1wb3J0IG5vdGlmaWNhdGlvbnMgZnJvbSBcIi4vbm90aWZpY2F0aW9ucy5qc1wiO1xyXG5pbXBvcnQgY29udGV4dE1lbnVzIGZyb20gXCIuL2NvbnRleHRNZW51cy5qc1wiO1xyXG5pbXBvcnQgY29tcG9uZW50cyBmcm9tIFwiLi9jb21wb25lbnRzLmpzXCI7XHJcbmltcG9ydCBtb2RhbHMgZnJvbSBcIi4vbW9kYWxzLmpzeFwiO1xyXG5pbXBvcnQgdG9hc3RzIGZyb20gXCIuL3RvYXN0cy5qc1wiO1xyXG5pbXBvcnQgdnVlIGZyb20gXCIuL3Z1ZS9pbmRleC5qc1wiO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICB0b29sdGlwcyxcclxuICBub3RpZmljYXRpb25zLFxyXG4gIGNvbnRleHRNZW51cyxcclxuICBjb21wb25lbnRzLFxyXG4gIG1vZGFscyxcclxuICB0b2FzdHMsXHJcbiAgdnVlXHJcbn0iLCAiaW1wb3J0IGV4dGVuc2lvbnMgZnJvbSBcIi4uL2V4dGVuc2lvbnMvaW5kZXguanNcIjtcclxuaW1wb3J0IGxvZ2dlciBmcm9tIFwiLi4vdXRpbHMvbG9nZ2VyLmpzXCI7XHJcbmltcG9ydCBpMThuIGZyb20gXCIuLi9pMThuL2luZGV4LmpzXCI7XHJcbmltcG9ydCB3ZWJzb2NrZXQgZnJvbSBcIi4uL3dlYnNvY2tldC9pbmRleC5qc1wiO1xyXG5cclxubGV0IGRldk1vZGVFbmFibGVkID0gZmFsc2U7XHJcblxyXG5sZXQgaXNMb2FkaW5nID0gZmFsc2U7XHJcblxyXG5sZXQgbG9hZGVkO1xyXG5sZXQgaW5zdGFsbGVkO1xyXG5cclxuY29uc3QgZXh0ZW5zaW9uID0ge1xyXG4gIGdldCBsb2FkZWQoKSB7IHJldHVybiBsb2FkZWQ7IH0sXHJcbiAgZ2V0IGluc3RhbGxlZCgpIHsgcmV0dXJuIGluc3RhbGxlZDsgfSxcclxuICB1bmxvYWQoKSB7XHJcbiAgICBpZiAoIWxvYWRlZCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgZXh0ZW5zaW9ucy5sb2FkZXIudW5sb2FkKFwiRGV2ZWxvcG1lbnRcIik7XHJcbiAgICBsb2FkZWQgPSBudWxsO1xyXG4gICAgaW5zdGFsbGVkID0gbnVsbDtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH0sXHJcbiAgYXN5bmMgbG9hZChzb3VyY2UsIG1hbmlmZXN0KSB7XHJcbiAgICBpZiAoIXNvdXJjZSB8fCAhbWFuaWZlc3QpIHRocm93IG5ldyBFcnJvcihgU291cmNlIGFuZCBtYW5pZmVzdCBhcmUgcmVxdWlyZWQgdG8gbG9hZCBhbiBleHRlbnNpb24hYCk7XHJcbiAgICBpZiAobG9hZGVkKSB0aHJvdyBuZXcgRXJyb3IoYEV4dGVuc2lvbiBpcyBhbHJlYWR5IGxvYWRlZCFgKTtcclxuICAgIGlmIChpc0xvYWRpbmcpIHJldHVybiBmYWxzZTtcclxuICAgIGlzTG9hZGluZyA9IHRydWU7XHJcbiAgICB0cnkge1xyXG4gICAgICBsb2FkZWQgPSBhd2FpdCBleHRlbnNpb25zLmxvYWRlci5sb2FkKFwiRGV2ZWxvcG1lbnRcIiwgeyBzb3VyY2UsIG1hbmlmZXN0IH0pO1xyXG4gICAgICBpbnN0YWxsZWQgPSB7XHJcbiAgICAgICAgbWFuaWZlc3RcclxuICAgICAgfTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBsb2dnZXIuZXJyb3IoYFVuYWJsZSB0byBsb2FkIGRldmVsb3BtZW50IGV4dGVuc2lvbi5gLCBpMThuLmxvY2FsaXplKG1hbmlmZXN0LmFib3V0Lm5hbWUpLCBlcnIpO1xyXG4gICAgICBpc0xvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaXNMb2FkaW5nID0gZmFsc2U7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IG91dCA9IHtcclxuICBnZXQgZW5hYmxlZCgpIHtcclxuICAgIHJldHVybiBkZXZNb2RlRW5hYmxlZDtcclxuICB9LFxyXG4gIHNldCBlbmFibGVkKHZhbHVlKSB7XHJcbiAgICBpZiAoIWdsb2JhbFRoaXNbXCI8UFJFTE9BRF9LRVk+XCJdLmlzRGV2VG9vbHNPcGVuKCkpIHRocm93IG5ldyBFcnJvcihcIkRldiBtb2RlIHN0YXR1cyBjYW4gb25seSBiZSBtb2RpZmllZCB3aGVuIERldlRvb2xzIGlzIG9wZW4hXCIpO1xyXG4gICAgZGV2TW9kZUVuYWJsZWQgPSB2YWx1ZTtcclxuICB9LFxyXG4gIGdldCBleHRlbnNpb24oKSB7XHJcbiAgICBpZiAoIWRldk1vZGVFbmFibGVkKSB0aHJvdyBuZXcgRXJyb3IoXCJEZXYgbW9kZSBpcyBub3QgZW5hYmxlZCFcIik7XHJcbiAgICByZXR1cm4gZXh0ZW5zaW9uO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgb3V0O1xyXG5cclxubGV0IGlzUHJvY2Vzc2luZyA9IGZhbHNlO1xyXG53ZWJzb2NrZXQuc2V0KFxyXG4gIFwiVXBkYXRlRGV2ZWxvcG1lbnRFeHRlbnNpb25cIixcclxuICBhc3luYyAoeyBzb3VyY2UsIG1hbmlmZXN0IH0gPSB7fSkgPT4ge1xyXG4gICAgaWYgKCFkZXZNb2RlRW5hYmxlZClcclxuICAgICAgcmV0dXJuIGxvZ2dlci53YXJuKGBEZXZlbG9wbWVudCBleHRlbnNpb24gd2FzIHNlbnQgYmVmb3JlIGRldiBtb2RlIHdhcyBlbmFibGVkLmApO1xyXG5cclxuICAgIGlmICghc291cmNlIHx8ICFtYW5pZmVzdClcclxuICAgICAgcmV0dXJuIGxvZ2dlci53YXJuKGBEZXZlbG9wbWVudCBleHRlbnNpb24gd2FzIHNlbnQgd2l0aG91dCBzb3VyY2Ugb3IgbWFuaWZlc3QuYCk7XHJcblxyXG4gICAgaWYgKGlzUHJvY2Vzc2luZylcclxuICAgICAgcmV0dXJuIGxvZ2dlci53YXJuKGBEZXZlbG9wbWVudCBleHRlbnNpb24gd2FzIHNlbnQgd2hpbGUgZXh0ZW5zaW9uIHdhcyBhbHJlYWR5IGJlaW5nIHByb2Nlc3NlZC5gKTtcclxuXHJcbiAgICBpc1Byb2Nlc3NpbmcgPSB0cnVlO1xyXG5cclxuICAgIGV4dGVuc2lvbi51bmxvYWQoKTtcclxuICAgIGF3YWl0IG5ldyBQcm9taXNlKChyKSA9PiBzZXRUaW1lb3V0KHIsIDEpKTtcclxuICAgIGxldCBzdWNjZXNzID0gYXdhaXQgZXh0ZW5zaW9uLmxvYWQoc291cmNlLCBtYW5pZmVzdCk7XHJcbiAgICBpZiAoc3VjY2VzcykgbG9nZ2VyLmluZm8oYERldmVsb3BtZW50IGV4dGVuc2lvbiBpcyBsb2FkZWQhICgke2kxOG4ubG9jYWxpemUobWFuaWZlc3QuYWJvdXQubmFtZSl9KWApO1xyXG4gICAgaXNQcm9jZXNzaW5nID0gZmFsc2U7XHJcbiAgfVxyXG4pIiwgImV4cG9ydCBkZWZhdWx0IHtcclxuICBwcm9jZXNzOiBnbG9iYWxUaGlzW1wiPFBSRUxPQURfS0VZPlwiXS5wcm9jZXNzLFxyXG4gIGlzRGV2VG9vbHNPcGVuOiBnbG9iYWxUaGlzW1wiPFBSRUxPQURfS0VZPlwiXS5pc0RldlRvb2xzT3BlblxyXG59XHJcblxyXG4iLCAiaW1wb3J0IG1vZHVsZXMgZnJvbSAnLi9tb2R1bGVzJztcclxuaW1wb3J0IGRldiBmcm9tICcuL2Rldic7XHJcbmltcG9ydCB1dGlscyBmcm9tICcuL3V0aWxzJztcclxuaW1wb3J0IGV4dGVuc2lvbnMgZnJvbSAnLi9leHRlbnNpb25zJztcclxuaW1wb3J0IGkxOG4gZnJvbSAnLi9pMThuJztcclxuaW1wb3J0IHN0b3JhZ2UgZnJvbSAnLi9zdG9yYWdlJztcclxuaW1wb3J0IGV2ZW50cyBmcm9tICcuL2V2ZW50cyc7XHJcbmltcG9ydCBwYXRjaGVyIGZyb20gJy4vcGF0Y2hlcic7XHJcbmltcG9ydCBpbnRlcm5hbCBmcm9tICcuL2ludGVybmFsJztcclxuaW1wb3J0IHdlYnNvY2tldCBmcm9tICcuL3dlYnNvY2tldCc7XHJcbmltcG9ydCBkb20gZnJvbSAnLi9kb20nO1xyXG5pbXBvcnQgdWkgZnJvbSAnLi91aS9pbmRleC5qcyc7XHJcblxyXG51dGlscy5sb2dnZXIuZGVidWcoYFBSRUxPQURfS0VZOiA8UFJFTE9BRF9LRVk+YCk7XHJcblxyXG5mdW5jdGlvbiBkZXZFcnJvcihhcGkpIHtcclxuICByZXR1cm4gbmV3IEVycm9yKGBUaGUgJHthcGl9IEFQSSBjYW4gb25seSBiZSBhY2Nlc3NlZCB3aGVuIERldiBtb2RlIGlzIGVuYWJsZWQhYCk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBleHBvc2VkQVBJOiB7XHJcbiAgICBkZXYsXHJcbiAgICB1dGlscyxcclxuICAgIGkxOG4sXHJcbiAgICBldmVudHMsXHJcbiAgICB1aSxcclxuICAgIGdldCBkb20oKSB7XHJcbiAgICAgIGlmICghZGV2LmVuYWJsZWQpIHRocm93IGRldkVycm9yKFwiRE9NXCIpO1xyXG4gICAgICByZXR1cm4gZG9tO1xyXG4gICAgfSxcclxuICAgIGdldCBwYXRjaGVyKCkge1xyXG4gICAgICBpZiAoIWRldi5lbmFibGVkKSB0aHJvdyBkZXZFcnJvcihcIlBhdGNoZXJcIik7XHJcbiAgICAgIHJldHVybiBwYXRjaGVyO1xyXG4gICAgfSxcclxuICAgIGdldCBzdG9yYWdlKCkge1xyXG4gICAgICBpZiAoIWRldi5lbmFibGVkKSB0aHJvdyBkZXZFcnJvcihcIlN0b3JhZ2VcIik7XHJcbiAgICAgIHJldHVybiBzdG9yYWdlO1xyXG4gICAgfSxcclxuICAgIGdldCBtb2R1bGVzKCkge1xyXG4gICAgICBpZiAoIWRldi5lbmFibGVkKSB0aHJvdyBkZXZFcnJvcihcIk1vZHVsZXNcIik7XHJcbiAgICAgIHJldHVybiBtb2R1bGVzO1xyXG4gICAgfSxcclxuICAgIGdldCBleHRlbnNpb25zKCkge1xyXG4gICAgICBpZiAoIWRldi5lbmFibGVkKSB0aHJvdyBkZXZFcnJvcihcIkV4dGVuc2lvbnNcIik7XHJcbiAgICAgIHJldHVybiBleHRlbnNpb25zO1xyXG4gICAgfSxcclxuICAgIGdldCBpbnRlcm5hbCgpIHtcclxuICAgICAgaWYgKCFkZXYuZW5hYmxlZCkgdGhyb3cgZGV2RXJyb3IoXCJJbnRlcm5hbFwiKTtcclxuICAgICAgcmV0dXJuIGludGVybmFsO1xyXG4gICAgfSxcclxuICAgIGdldCB3ZWJzb2NrZXQoKSB7XHJcbiAgICAgIGlmICghZGV2LmVuYWJsZWQpIHRocm93IGRldkVycm9yKFwiV2Vic29ja2V0XCIpO1xyXG4gICAgICByZXR1cm4gd2Vic29ja2V0O1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgdW5leHBvc2VkQVBJOiB7XHJcbiAgICBkZXYsXHJcbiAgICBtb2R1bGVzLFxyXG4gICAgdXRpbHMsXHJcbiAgICBleHRlbnNpb25zLFxyXG4gICAgaTE4bixcclxuICAgIHN0b3JhZ2UsXHJcbiAgICBldmVudHMsXHJcbiAgICBwYXRjaGVyLFxyXG4gICAgaW50ZXJuYWwsXHJcbiAgICB3ZWJzb2NrZXQsXHJcbiAgICB1aSxcclxuICAgIGRvbVxyXG4gIH1cclxufSIsICJpbXBvcnQgZXZlbnRzIGZyb20gXCIuLi9hcGkvZXZlbnRzL2luZGV4LmpzXCI7XHJcblxyXG5jb25zdCBvZ1RpdGxlU2V0dGVyID0gZG9jdW1lbnQuX19sb29rdXBTZXR0ZXJfXyhcInRpdGxlXCIpO1xyXG5jb25zdCBvZ1RpdGxlR2V0dGVyID0gZG9jdW1lbnQuX19sb29rdXBHZXR0ZXJfXyhcInRpdGxlXCIpO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFxyXG4gIGRvY3VtZW50LFxyXG4gIFwidGl0bGVcIixcclxuICB7XHJcbiAgICBnZXQoKSB7XHJcbiAgICAgIHJldHVybiBvZ1RpdGxlR2V0dGVyLmNhbGwodGhpcyk7XHJcbiAgICB9LFxyXG4gICAgc2V0KHYpIHtcclxuICAgICAgZXZlbnRzLmVtaXQoXCJEb2N1bWVudFRpdGxlQ2hhbmdlXCIsIHYpO1xyXG4gICAgICByZXR1cm4gb2dUaXRsZVNldHRlci5jYWxsKHRoaXMsIHYpO1xyXG4gICAgfVxyXG4gIH1cclxuKTsiLCAiaW1wb3J0IG1vZHVsZXMgZnJvbSBcIi4uL2FwaS9tb2R1bGVzL2luZGV4LmpzXCI7XHJcbmltcG9ydCBtb2RhbHMgZnJvbSBcIi4uL2FwaS91aS9tb2RhbHMuanN4XCI7XHJcbmltcG9ydCBub3RpZmljYXRpb25zIGZyb20gXCIuLi9hcGkvdWkvbm90aWZpY2F0aW9ucy5qc1wiO1xyXG5pbXBvcnQgZXh0ZW5zaW9ucyBmcm9tIFwiLi4vYXBpL2V4dGVuc2lvbnMvaW5kZXguanNcIjtcclxuaW1wb3J0IHdlYnNvY2tldCBmcm9tIFwiLi4vYXBpL3dlYnNvY2tldC9pbmRleC5qc1wiO1xyXG5cclxud2Vic29ja2V0LnNldChcIkluc3RhbGxFeHRlbnNpb25cIiwgYXN5bmMgKHsgdXJsIH0gPSB7fSkgPT4ge1xyXG4gIGlmICghdXJsKSByZXR1cm47XHJcblxyXG4gIGF3YWl0IG1vZHVsZXMubmF0aXZlLndpbmRvdy5zZXRBbHdheXNPblRvcCgwLCB0cnVlKTtcclxuICBhd2FpdCBuZXcgUHJvbWlzZShyID0+IHNldFRpbWVvdXQociwgMjUwKSk7XHJcbiAgYXdhaXQgbW9kdWxlcy5uYXRpdmUud2luZG93LnNldEFsd2F5c09uVG9wKDAsIHRydWUpO1xyXG5cclxuICBjb25zdCBzdWNjZXNzID0gYXdhaXQgbW9kYWxzLnNob3cuY29uZmlybWF0aW9uKFxyXG4gICAgYWNvcmQuaTE4bi5mb3JtYXQoXCJJTVBPUlRfRVhURU5TSU9OX01PREFMX1RJVExFXCIpLFxyXG4gICAgYWNvcmQuaTE4bi5mb3JtYXQoXCJJTVBPUlRfRVhURU5TSU9OX01PREFMX0RFU0NSSVBUSU9OXCIsIHVybClcclxuICApO1xyXG5cclxuICBpZiAoIXN1Y2Nlc3MpIHJldHVybjtcclxuXHJcbiAgdHJ5IHtcclxuICAgIGF3YWl0IGV4dGVuc2lvbnMubG9hZCh1cmwpO1xyXG4gIH0gY2F0Y2ggKGVycikge1xyXG4gICAgbm90aWZpY2F0aW9ucy5zaG93LmVycm9yKGAke2Vycn1gLCB7IHRpbWVvdXQ6IDMwMDAwIH0pO1xyXG4gIH1cclxufSk7IiwgImV4cG9ydCBkZWZhdWx0IGBcbltjbGFzcyo9YWNvcmQtLV17Ym94LXNpemluZzpib3JkZXItYm94fVtjbGFzcyo9YWNvcmQtLV0gKntib3gtc2l6aW5nOmJvcmRlci1ib3h9LmFjb3JkLS10YWJzLWNvbnRlbnQtY29udGFpbmVye3BhZGRpbmc6MzJweCAxNnB4O2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpmbGV4LXN0YXJ0O2p1c3RpZnktY29udGVudDpjZW50ZXI7d2lkdGg6MTAwJX0uYWNvcmQtLXRhYnMtY29udGVudC1jb250YWluZXI+LnRhYnt3aWR0aDoxMDAlfS5hY29yZC0tdGFicy10YWItYnV0dG9uLnN0b3JlLXRhYi1idXR0b257YmFja2dyb3VuZC1jb2xvcjp2YXIoLS1zdGF0dXMtcG9zaXRpdmUtYmFja2dyb3VuZCk7Y29sb3I6dmFyKC0tc3RhdHVzLXBvc2l0aXZlLXRleHQpfS5hY29yZC0tdGFicy10YWItYnV0dG9uLnN0b3JlLXRhYi1idXR0b24uc2VsZWN0ZWR7Y29sb3I6dmFyKC0tdGV4dC1wb3NpdGl2ZSk7YmFja2dyb3VuZC1jb2xvcjp2YXIoLS1iYWNrZ3JvdW5kLW1vZGlmaWVyLXNlbGVjdGVkKX1gO1xuIiwgImV4cG9ydCBkZWZhdWx0IHtcclxuICAvKiogQHBhcmFtIHtpbXBvcnQoXCJ2dWVcIikuQXBwfSB2dWVBcHAgKi9cclxuICBsb2FkKHZ1ZUFwcCkge1xyXG4gICAgdnVlQXBwLmNvbXBvbmVudChcclxuICAgICAgXCJob21lLXBhZ2VcIixcclxuICAgICAge1xyXG4gICAgICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPVwid2lkdGg6IDMwMHB4O1wiPlxyXG4gICAgICAgICAgICAgIDxkaXNjb3JkLXNlbGVjdCB2LW1vZGVsPVwidmFsdWVcIiA6b3B0aW9ucz1cIm9wdGlvbnNcIiAvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGgxPnt7IHZhbHVlIH19PC9oMT5cclxuICAgICAgICAgICAgPGJyIC8+XHJcbiAgICAgICAgICAgIDxkaXNjb3JkLWNoZWNrIHYtbW9kZWw9XCJjaGVja2VkXCIgLz5cclxuICAgICAgICAgICAgPGgxPnt7IGNoZWNrZWQgfX08L2gxPlxyXG4gICAgICAgICAgICA8ZGlzY29yZC1jaGVjayB2LW1vZGVsPVwiY2hlY2tlZFwiIC8+XHJcbiAgICAgICAgICAgIDxoMT57eyBjaGVja2VkIH19PC9oMT5cclxuICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICBgLFxyXG4gICAgICAgIGRhdGEoKSB7XHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB2YWx1ZTogXCIxXCIsXHJcbiAgICAgICAgICAgIGNoZWNrZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBvcHRpb25zOiBbXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiMVwiLFxyXG4gICAgICAgICAgICAgICAgbGFiZWw6IFwiT3B0aW9uIDFcIlxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiMlwiLFxyXG4gICAgICAgICAgICAgICAgbGFiZWw6IFwiT3B0aW9uIDJcIlxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiM1wiLFxyXG4gICAgICAgICAgICAgICAgbGFiZWw6IFwiT3B0aW9uIDNcIlxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgKTtcclxuICB9XHJcbn0iLCAiZXhwb3J0IGRlZmF1bHQgYFxuLmFjb3JkLS1pbnN0YWxsZWQtZXh0ZW5zaW9ucy1wYWdle2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpmbGV4LXN0YXJ0O2p1c3RpZnktY29udGVudDpjZW50ZXI7cGFkZGluZzowIDE2cHh9LmFjb3JkLS1pbnN0YWxsZWQtZXh0ZW5zaW9ucy1wYWdlIC5jb250YWluZXJ7d2lkdGg6MTAwJTttYXgtd2lkdGg6MTAyNHB4O2Rpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpjb2x1bW59LmFjb3JkLS1pbnN0YWxsZWQtZXh0ZW5zaW9ucy1wYWdlIC5jb250YWluZXI+LnRvcHtkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2dhcDo4cHh9LmFjb3JkLS1pbnN0YWxsZWQtZXh0ZW5zaW9ucy1wYWdlIC5jb250YWluZXI+LnRvcD4uc2VhcmNoe3dpZHRoOjgwJX0uYWNvcmQtLWluc3RhbGxlZC1leHRlbnNpb25zLXBhZ2UgLmNvbnRhaW5lcj4udG9wPi5jYXRlZ29yeXt3aWR0aDoyMCV9YDtcbiIsICJpbXBvcnQgcGF0Y2hlciBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vLi4vYXBpL3BhdGNoZXIvaW5kZXguanNcIjtcclxuaW1wb3J0IGkxOG4gZnJvbSBcIi4uLy4uLy4uLy4uLy4uLy4uL2FwaS9pMThuL2luZGV4LmpzXCI7XHJcbmltcG9ydCBjc3NUZXh0IGZyb20gXCIuL3N0eWxlLnNjc3NcIjtcclxucGF0Y2hlci5pbmplY3RDU1MoY3NzVGV4dCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgLyoqIEBwYXJhbSB7aW1wb3J0KFwidnVlXCIpLkFwcH0gdnVlQXBwICovXHJcbiAgbG9hZCh2dWVBcHApIHtcclxuICAgIHZ1ZUFwcC5jb21wb25lbnQoXHJcbiAgICAgIFwiaW5zdGFsbGVkLWV4dGVuc2lvbnMtcGFnZVwiLFxyXG4gICAgICB7XHJcbiAgICAgICAgdGVtcGxhdGU6IGBcclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJhY29yZC0taW5zdGFsbGVkLWV4dGVuc2lvbnMtcGFnZVwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRvcFwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNlYXJjaFwiPlxyXG4gICAgICAgICAgICAgICAgICA8ZGlzY29yZC1pbnB1dCB2LW1vZGVsPVwic2VhcmNoVGV4dFwiIDpwbGFjZWhvbGRlcj1cImkxOG5Gb3JtYXQoJ1NFQVJDSCcpXCIgLz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhdGVnb3J5XCI+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXNjb3JkLXNlbGVjdCB2LW1vZGVsPVwic2VhcmNoQ2F0ZWdvcnlUZXh0XCIgOm9wdGlvbnM9XCJbe3ZhbHVlOiAnYWxsJywgbGFiZWw6IGkxOG5Gb3JtYXQoJ0FMTCcpfSwge3ZhbHVlOiAncGx1Z2lucycsIGxhYmVsOiBpMThuRm9ybWF0KCdQTFVHSU5TJyl9LCB7dmFsdWU6ICd0aGVtZXMnLCBsYWJlbDogaTE4bkZvcm1hdCgnVEhFTUVTJyl9XVwiIC8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnV0dG9uXCI+XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICBgLFxyXG4gICAgICAgIGRhdGEoKSB7XHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBzZWFyY2hUZXh0OiBcIlwiLFxyXG4gICAgICAgICAgICBzZWFyY2hDYXRlZ29yeVRleHQ6IFwiYWxsXCJcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIG1ldGhvZHM6IHtcclxuICAgICAgICAgIGkxOG5Gb3JtYXQ6IGkxOG4uZm9ybWF0XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICApO1xyXG4gIH1cclxufSIsICJleHBvcnQgZGVmYXVsdCB7XHJcbiAgLyoqIEBwYXJhbSB7aW1wb3J0KFwidnVlXCIpLkFwcH0gdnVlQXBwICovXHJcbiAgbG9hZCh2dWVBcHApIHtcclxuICAgIHZ1ZUFwcC5jb21wb25lbnQoXHJcbiAgICAgIFwic2V0dGluZ3MtcGFnZVwiLFxyXG4gICAgICB7XHJcbiAgICAgICAgdGVtcGxhdGU6IFwiPGRpdj5TZXR0aW5ncyBQYWdlPC9kaXY+XCIsXHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgfVxyXG59IiwgImV4cG9ydCBkZWZhdWx0IHtcclxuICAvKiogQHBhcmFtIHtpbXBvcnQoXCJ2dWVcIikuQXBwfSB2dWVBcHAgKi9cclxuICBsb2FkKHZ1ZUFwcCkge1xyXG4gICAgdnVlQXBwLmNvbXBvbmVudChcclxuICAgICAgXCJzdG9yZS1wYWdlXCIsXHJcbiAgICAgIHtcclxuICAgICAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxkaXY+XHJcbiAgICAgICAgICA8c3RvcmUtZXh0ZW5zaW9uLWNhcmQgdi1mb3I9XCJleHRlbnNpb24gaW4gZXh0ZW5zaW9uc1wiIDpleHRlbnNpb249XCJleHRlbnNpb25cIiA6a2V5PVwiZXh0ZW5zaW9uLm5hbWUuZGVmYXVsdFwiIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgYCxcclxuICAgICAgICBkYXRhKCkge1xyXG4gICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZXh0ZW5zaW9uczogW1xyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwicGx1Z2luXCIsXHJcbiAgICAgICAgICAgICAgICB1cmw6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiB7XHJcbiAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IFwiVGVzdCBQbHVnaW5cIixcclxuICAgICAgICAgICAgICAgICAgdHI6IFwiRGVuZW1lIFBsdWdpblwiLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IFwiVGVzdCBQbHVnaW4gZGVzY3JpcHRpb24uLlwiLFxyXG4gICAgICAgICAgICAgICAgICB0cjogXCJEZW5lbWUgUGx1Z2luIGFcdTAwRTdcdTAxMzFrbGFtYXNcdTAxMzEuLlwiLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHByZXZpZXdzOiBbXHJcbiAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIlRlc3QgUGx1Z2luIFByZXZpZXdcIixcclxuICAgICAgICAgICAgICAgICAgICBpbWFnZTogXCJodHRwczovL2kuaW1ndXIuY29tL1R0ZmpIZVAucG5nXCIsXHJcbiAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIlRlc3QgUGx1Z2luIFByZXZpZXcgMlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGltYWdlOiBcImh0dHBzOi8vaS5pbWd1ci5jb20vMFowWjBaMC5wbmdcIixcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIGF1dGhvcnM6IFtcclxuICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIjcwNzMwOTY5MzQ0OTUzNTU5OVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiQXJtYWdhbiMyNDQ4XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2U6IFwiaHR0cHM6Ly9pLmltZ3VyLmNvbS9yU0xWZDIzLnBuZ1wiXHJcbiAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogXCI3MDczMDk2OTM0NDk1MzU1OTlcIixcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIkFybWFnYW4jMjQ0OFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGltYWdlOiBcImh0dHBzOi8vaS5pbWd1ci5jb20vclNMVmQyMy5wbmdcIlxyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgdmVyc2lvbjogXCIxLjAuMFwiLFxyXG4gICAgICAgICAgICAgICAgcmVhZG1lOiBcIiMjIyBUZXN0IFBsdWdpbiByZWFkbWUuLlwiLFxyXG4gICAgICAgICAgICAgICAgaW5zdGFsbGVkOiB0cnVlXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgKTtcclxuICB9XHJcbn0iLCAiaW1wb3J0IGhvbWVQYWdlIGZyb20gXCIuL2hvbWUtcGFnZS9pbmRleC5qc1wiXHJcbmltcG9ydCBpbnN0YWxsZWRFeHRlbnNpb25zUGFnZSBmcm9tIFwiLi9pbnN0YWxsZWQtZXh0ZW5zaW9ucy1wYWdlL2luZGV4LmpzXCI7XHJcbmltcG9ydCBzZXR0aW5nc1BhZ2UgZnJvbSBcIi4vc2V0dGluZ3MtcGFnZS9pbmRleC5qc1wiO1xyXG5pbXBvcnQgc3RvcmVQYWdlIGZyb20gXCIuL3N0b3JlLXBhZ2UvaW5kZXguanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAvKiogQHBhcmFtIHtpbXBvcnQoXCJ2dWVcIikuQXBwfSB2dWVBcHAgKi9cclxuICBsb2FkKHZ1ZUFwcCkge1xyXG4gICAgaG9tZVBhZ2UubG9hZCh2dWVBcHApO1xyXG4gICAgaW5zdGFsbGVkRXh0ZW5zaW9uc1BhZ2UubG9hZCh2dWVBcHApO1xyXG4gICAgc2V0dGluZ3NQYWdlLmxvYWQodnVlQXBwKTtcclxuICAgIHN0b3JlUGFnZS5sb2FkKHZ1ZUFwcCk7XHJcbiAgfVxyXG59IiwgImltcG9ydCBldmVudHMgZnJvbSBcIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2FwaS9ldmVudHMvaW5kZXguanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAvKiogQHBhcmFtIHtpbXBvcnQoXCJ2dWVcIikuQXBwfSB2dWVBcHAgKi9cclxuICBsb2FkKHZ1ZUFwcCkge1xyXG4gICAgdnVlQXBwLmNvbXBvbmVudChcImNvbmZpZy1idXR0b25cIiwge1xyXG4gICAgICBwcm9wczogW1wiaXRlbVwiLCBcImV4dGVuc2lvblwiXSxcclxuICAgICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8ZGl2IHYtc2hvdz1cIml0ZW0/LnZpc2libGUgPz8gdHJ1ZVwiIGNsYXNzPVwiYWNvcmQtLWNvbmZpZy1idXR0b24gYWNvcmQtLWNvbmZpZy1pdGVtXCI+XHJcbiAgICAgICAgICA8ZGlzY29yZC1idXR0b24gQGNsaWNrPVwib25DbGlja1wiIDp2YWx1ZT1cIml0ZW0udmFsdWVcIiA6c2l6ZT1cIml0ZW0uc2l6ZVwiIDpjb2xvcj1cIml0ZW0uY29sb3JcIiAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICBgLFxyXG4gICAgICBtZXRob2RzOiB7XHJcbiAgICAgICAgb25DbGljayhldmVudCkge1xyXG4gICAgICAgICAgZXZlbnRzLmVtaXQoXHJcbiAgICAgICAgICAgIFwiZXh0ZW5zaW9uLWNvbmZpZy1pbnRlcmFjdGlvblwiLFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgZXh0ZW5zaW9uOiB0aGlzLmV4dGVuc2lvbixcclxuICAgICAgICAgICAgICBpdGVtOiB0aGlzLml0ZW0sXHJcbiAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgZXZlbnRcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIClcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufSIsICJpbXBvcnQgZXZlbnRzIGZyb20gXCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9hcGkvZXZlbnRzL2luZGV4LmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgLyoqIEBwYXJhbSB7aW1wb3J0KFwidnVlXCIpLkFwcH0gdnVlQXBwICovXHJcbiAgbG9hZCh2dWVBcHApIHtcclxuICAgIHZ1ZUFwcC5jb21wb25lbnQoXCJjb25maWctY2hlY2tcIiwge1xyXG4gICAgICBwcm9wczogW1wiaXRlbVwiLCBcImV4dGVuc2lvblwiXSxcclxuICAgICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8ZGl2IHYtc2hvdz1cIml0ZW0/LnZpc2libGUgPz8gdHJ1ZVwiIGNsYXNzPVwiYWNvcmQtLWNvbmZpZy1jaGVjayBhY29yZC0tY29uZmlnLWl0ZW1cIj5cclxuICAgICAgICAgIDxkaXNjb3JkLWNoZWNrIEBjaGFuZ2U9XCJvbkNoYW5nZVwiIHYtbW9kZWw9XCJpdGVtLnZhbHVlXCIgLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgYCxcclxuICAgICAgbWV0aG9kczoge1xyXG4gICAgICAgIG9uQ2hhbmdlKGRhdGEpIHtcclxuICAgICAgICAgIGV2ZW50cy5lbWl0KFxyXG4gICAgICAgICAgICBcImV4dGVuc2lvbi1jb25maWctaW50ZXJhY3Rpb25cIixcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIGV4dGVuc2lvbjogdGhpcy5leHRlbnNpb24sXHJcbiAgICAgICAgICAgICAgaXRlbTogdGhpcy5pdGVtLFxyXG4gICAgICAgICAgICAgIGRhdGFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59IiwgIntcclxuICBcIm5hbWVcIjoge1xyXG4gICAgXCJDb2x1bW5cIjogXCJjb25maWctY29sdW1uXCIsXHJcbiAgICBcIlJvd1wiOiBcImNvbmZpZy1yb3dcIixcclxuICAgIFwiQnV0dG9uXCI6IFwiY29uZmlnLWJ1dHRvblwiLFxyXG4gICAgXCJDaGVja1wiOiBcImNvbmZpZy1jaGVja1wiLFxyXG4gICAgXCJJbnB1dFwiOiBcImNvbmZpZy1pbnB1dFwiLFxyXG4gICAgXCJTZWxlY3RcIjogXCJjb25maWctc2VsZWN0XCIsXHJcbiAgICBcIlRleHRhcmVhXCI6IFwiY29uZmlnLXRleHRhcmVhXCIsXHJcbiAgICBcIlNwYWNlclwiOiBcImNvbmZpZy1zcGFjZXJcIixcclxuICAgIFwiUGFyYWdyYXBoXCI6IFwiY29uZmlnLXBhcmFncmFwaFwiLFxyXG4gICAgXCJIZWFkaW5nXCI6IFwiY29uZmlnLWhlYWRpbmdcIlxyXG4gIH1cclxufSIsICJpbXBvcnQgeyBuYW1lIGFzIG5hbWVNYXAgfSBmcm9tIFwiLi4vbWFwcy5qc29uXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgLyoqIEBwYXJhbSB7aW1wb3J0KFwidnVlXCIpLkFwcH0gdnVlQXBwICovXHJcbiAgbG9hZCh2dWVBcHApIHtcclxuICAgIHZ1ZUFwcC5jb21wb25lbnQoXHJcbiAgICAgIFwiY29uZmlnLWNvbHVtblwiLFxyXG4gICAgICB7XHJcbiAgICAgICAgcHJvcHM6IFtcIml0ZW1cIiwgXCJleHRlbnNpb25cIl0sXHJcbiAgICAgICAgdGVtcGxhdGU6IGBcclxuICAgICAgICAgIDxkaXYgdi1zaG93PVwiaXRlbT8udmlzaWJsZSA/PyB0cnVlXCIgY2xhc3M9XCJhY29yZC0tY29uZmlnLWNvbHVtbiBhY29yZC0tY29uZmlnLWl0ZW1cIiA6Y2xhc3M9XCJ7XHJcbiAgICAgICAgICAgICdob3Jpem9udGFsLWFsaWduLWxlZnQnOiBpdGVtPy5ob3Jpem9udGFsQWxpZ24gPT09ICdsZWZ0JyxcclxuICAgICAgICAgICAgJ2hvcml6b250YWwtYWxpZ24tY2VudGVyJzogaXRlbT8uaG9yaXpvbnRhbEFsaWduID09PSAnY2VudGVyJyxcclxuICAgICAgICAgICAgJ2hvcml6b250YWwtYWxpZ24tcmlnaHQnOiBpdGVtPy5ob3Jpem9udGFsQWxpZ24gPT09ICdyaWdodCcsXHJcbiAgICAgICAgICAgICdqdXN0aWZ5LXNwYWNlLWJldHdlZW4nOiBpdGVtPy5qdXN0aWZ5ID09PSAnc3BhY2UtYmV0d2VlbicsXHJcbiAgICAgICAgICAgICdqdXN0aWZ5LXNwYWNlLWFyb3VuZCc6IGl0ZW0/Lmp1c3RpZnkgPT09ICdzcGFjZS1hcm91bmQnLFxyXG4gICAgICAgICAgICAndmVydGljYWwtYWxpZ24tdG9wJzogaXRlbT8udmVydGljYWxBbGlnbiA9PT0gJ3RvcCcsXHJcbiAgICAgICAgICAgICd2ZXJ0aWNhbC1hbGlnbi1jZW50ZXInOiBpdGVtPy52ZXJ0aWNhbEFsaWduID09PSAnY2VudGVyJyxcclxuICAgICAgICAgICAgJ3ZlcnRpY2FsLWFsaWduLWJvdHRvbSc6IGl0ZW0/LnZlcnRpY2FsQWxpZ24gPT09ICdib3R0b20nXHJcbiAgICAgICAgICB9XCIgOnN0eWxlPVwieyd3aWR0aCc6IGl0ZW0/LndpZHRoID8/ICcxMDAlJywgJ2hlaWdodCc6IGl0ZW0/LmhlaWdodH1cIiA+XHJcbiAgICAgICAgICAgIDxjb21wb25lbnQgdi1mb3I9XCJjaGlsZCBpbiBpdGVtLmNoaWxkcmVuXCIgOmlzPVwibmFtZU1hcFtjaGlsZC50eXBlXVwiIDprZXk9XCJjaGlsZC5pZFwiIDppdGVtPVwiY2hpbGRcIiA6ZXh0ZW5zaW9uPVwiZXh0ZW5zaW9uXCIgLz5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIGAsXHJcbiAgICAgICAgZGF0YSgpIHtcclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG5hbWVNYXBcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgfVxyXG59IiwgImV4cG9ydCBkZWZhdWx0IHtcclxuICAvKiogQHBhcmFtIHtpbXBvcnQoXCJ2dWVcIikuQXBwfSB2dWVBcHAgKi9cclxuICBsb2FkKHZ1ZUFwcCkge1xyXG4gICAgdnVlQXBwLmNvbXBvbmVudChcImNvbmZpZy1oZWFkaW5nXCIsIHtcclxuICAgICAgcHJvcHM6IFtcIml0ZW1cIiwgXCJleHRlbnNpb25cIl0sXHJcbiAgICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiB2LXNob3c9XCJpdGVtPy52aXNpYmxlID8/IHRydWVcIiBjbGFzcz1cImFjb3JkLS1jb25maWctaGVhZGluZyBhY29yZC0tY29uZmlnLWl0ZW1cIj5cclxuICAgICAgICAgIDxoMSBjbGFzcz1cImhlYWRpbmdcIj57e2l0ZW0udmFsdWV9fTwvaDE+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIGAsXHJcbiAgICB9KTtcclxuICB9XHJcbn0iLCAiaW1wb3J0IGV2ZW50cyBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vYXBpL2V2ZW50cy9pbmRleC5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIC8qKiBAcGFyYW0ge2ltcG9ydChcInZ1ZVwiKS5BcHB9IHZ1ZUFwcCAqL1xyXG4gIGxvYWQodnVlQXBwKSB7XHJcbiAgICB2dWVBcHAuY29tcG9uZW50KFwiY29uZmlnLWlucHV0XCIsIHtcclxuICAgICAgcHJvcHM6IFtcIml0ZW1cIiwgXCJleHRlbnNpb25cIl0sXHJcbiAgICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiB2LXNob3c9XCJpdGVtPy52aXNpYmxlID8/IHRydWVcIiBjbGFzcz1cImFjb3JkLS1jb25maWctaW5wdXQgYWNvcmQtLWNvbmZpZy1pdGVtXCI+XHJcbiAgICAgICAgICA8ZGlzY29yZC1pbnB1dCBAY2hhbmdlPVwib25DaGFuZ2VcIiB2LW1vZGVsPVwiaXRlbS52YWx1ZVwiIDp0eXBlPVwiaXRlbS5pbnB1dFR5cGVcIiA6cGxhY2Vob2xkZXI9XCJpdGVtLnBsYWNlaG9sZGVyXCIgOm1heGxlbmd0aD1cIml0ZW0ubWF4bGVuZ3RoXCIgLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgYCxcclxuICAgICAgbWV0aG9kczoge1xyXG4gICAgICAgIG9uQ2hhbmdlKGRhdGEpIHtcclxuICAgICAgICAgIGV2ZW50cy5lbWl0KFxyXG4gICAgICAgICAgICBcImV4dGVuc2lvbi1jb25maWctaW50ZXJhY3Rpb25cIixcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIGV4dGVuc2lvbjogdGhpcy5leHRlbnNpb24sXHJcbiAgICAgICAgICAgICAgaXRlbTogdGhpcy5pdGVtLFxyXG4gICAgICAgICAgICAgIGRhdGFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59IiwgImV4cG9ydCBkZWZhdWx0IHtcclxuICAvKiogQHBhcmFtIHtpbXBvcnQoXCJ2dWVcIikuQXBwfSB2dWVBcHAgKi9cclxuICBsb2FkKHZ1ZUFwcCkge1xyXG4gICAgdnVlQXBwLmNvbXBvbmVudChcImNvbmZpZy1wYXJhZ3JhcGhcIiwge1xyXG4gICAgICBwcm9wczogW1wiaXRlbVwiLCBcImV4dGVuc2lvblwiXSxcclxuICAgICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8ZGl2IHYtc2hvdz1cIml0ZW0/LnZpc2libGUgPz8gdHJ1ZVwiIGNsYXNzPVwiYWNvcmQtLWNvbmZpZy1wYXJhZ3JhcGggYWNvcmQtLWNvbmZpZy1pdGVtXCI+XHJcbiAgICAgICAgICA8cCBjbGFzcz1cInBhcmFncmFwaFwiPnt7aXRlbS52YWx1ZX19PC9wPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICBgLFxyXG4gICAgfSk7XHJcbiAgfVxyXG59IiwgImltcG9ydCB7IG5hbWUgYXMgbmFtZU1hcCB9IGZyb20gXCIuLi9tYXBzLmpzb25cIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAvKiogQHBhcmFtIHtpbXBvcnQoXCJ2dWVcIikuQXBwfSB2dWVBcHAgKi9cclxuICBsb2FkKHZ1ZUFwcCkge1xyXG4gICAgdnVlQXBwLmNvbXBvbmVudChcclxuICAgICAgXCJjb25maWctcm93XCIsXHJcbiAgICAgIHtcclxuICAgICAgICBwcm9wczogW1wiaXRlbVwiLCBcImV4dGVuc2lvblwiXSxcclxuICAgICAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgICAgPGRpdiB2LXNob3c9XCJpdGVtPy52aXNpYmxlID8/IHRydWVcIiBjbGFzcz1cImFjb3JkLS1jb25maWctcm93IGFjb3JkLS1jb25maWctaXRlbVwiIDpjbGFzcz1cIntcclxuICAgICAgICAgICAgJ2hvcml6b250YWwtYWxpZ24tbGVmdCc6IGl0ZW0/Lmhvcml6b250YWxBbGlnbiA9PT0gJ2xlZnQnLFxyXG4gICAgICAgICAgICAnaG9yaXpvbnRhbC1hbGlnbi1jZW50ZXInOiBpdGVtPy5ob3Jpem9udGFsQWxpZ24gPT09ICdjZW50ZXInLFxyXG4gICAgICAgICAgICAnaG9yaXpvbnRhbC1hbGlnbi1yaWdodCc6IGl0ZW0/Lmhvcml6b250YWxBbGlnbiA9PT0gJ3JpZ2h0JyxcclxuICAgICAgICAgICAgJ2p1c3RpZnktc3BhY2UtYmV0d2Vlbic6IGl0ZW0/Lmp1c3RpZnkgPT09ICdzcGFjZS1iZXR3ZWVuJyxcclxuICAgICAgICAgICAgJ2p1c3RpZnktc3BhY2UtYXJvdW5kJzogaXRlbT8uanVzdGlmeSA9PT0gJ3NwYWNlLWFyb3VuZCcsXHJcbiAgICAgICAgICAgICd2ZXJ0aWNhbC1hbGlnbi10b3AnOiBpdGVtPy52ZXJ0aWNhbEFsaWduID09PSAndG9wJyxcclxuICAgICAgICAgICAgJ3ZlcnRpY2FsLWFsaWduLWNlbnRlcic6IGl0ZW0/LnZlcnRpY2FsQWxpZ24gPT09ICdjZW50ZXInLFxyXG4gICAgICAgICAgICAndmVydGljYWwtYWxpZ24tYm90dG9tJzogaXRlbT8udmVydGljYWxBbGlnbiA9PT0gJ2JvdHRvbSdcclxuICAgICAgICAgIH1cIiA6c3R5bGU9XCJ7J3dpZHRoJzogaXRlbT8ud2lkdGggPz8gJzEwMCUnLCAnaGVpZ2h0JzogaXRlbT8uaGVpZ2h0fVwiID5cclxuICAgICAgICAgICAgPGNvbXBvbmVudCB2LWZvcj1cImNoaWxkIGluIGl0ZW0uY2hpbGRyZW5cIiA6aXM9XCJuYW1lTWFwW2NoaWxkLnR5cGVdXCIgOmtleT1cImNoaWxkLmlkXCIgOml0ZW09XCJjaGlsZFwiIDpleHRlbnNpb249XCJleHRlbnNpb25cIiAvPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgYCxcclxuICAgICAgICBkYXRhKCkge1xyXG4gICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbmFtZU1hcFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgKTtcclxuICB9XHJcbn0iLCAiaW1wb3J0IGV2ZW50cyBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vYXBpL2V2ZW50cy9pbmRleC5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIC8qKiBAcGFyYW0ge2ltcG9ydChcInZ1ZVwiKS5BcHB9IHZ1ZUFwcCAqL1xyXG4gIGxvYWQodnVlQXBwKSB7XHJcbiAgICB2dWVBcHAuY29tcG9uZW50KFwiY29uZmlnLXNlbGVjdFwiLCB7XHJcbiAgICAgIHByb3BzOiBbXCJpdGVtXCIsIFwiZXh0ZW5zaW9uXCJdLFxyXG4gICAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxkaXYgdi1zaG93PVwiaXRlbT8udmlzaWJsZSA/PyB0cnVlXCIgY2xhc3M9XCJhY29yZC0tY29uZmlnLXNlbGVjdCBhY29yZC0tY29uZmlnLWl0ZW1cIj5cclxuICAgICAgICAgIDxkaXNjb3JkLXNlbGVjdCBAY2hhbmdlPVwib25DaGFuZ2VcIiB2LW1vZGVsPVwiaXRlbS52YWx1ZVwiIDpvcHRpb25zPVwiaXRlbS5vcHRpb25zXCIgLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgYCxcclxuICAgICAgbWV0aG9kczoge1xyXG4gICAgICAgIG9uQ2hhbmdlKGRhdGEpIHtcclxuICAgICAgICAgIGV2ZW50cy5lbWl0KFxyXG4gICAgICAgICAgICBcImV4dGVuc2lvbi1jb25maWctaW50ZXJhY3Rpb25cIixcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIGV4dGVuc2lvbjogdGhpcy5leHRlbnNpb24sXHJcbiAgICAgICAgICAgICAgaXRlbTogdGhpcy5pdGVtLFxyXG4gICAgICAgICAgICAgIGRhdGFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59IiwgImV4cG9ydCBkZWZhdWx0IHtcclxuICAvKiogQHBhcmFtIHtpbXBvcnQoXCJ2dWVcIikuQXBwfSB2dWVBcHAgKi9cclxuICBsb2FkKHZ1ZUFwcCkge1xyXG4gICAgdnVlQXBwLmNvbXBvbmVudChcImNvbmZpZy1zcGFjZXJcIiwge1xyXG4gICAgICBwcm9wczogW1wiaXRlbVwiLCBcImV4dGVuc2lvblwiXSxcclxuICAgICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8ZGl2IHYtc2hvdz1cIml0ZW0/LnZpc2libGUgPz8gdHJ1ZVwiIGNsYXNzPVwiYWNvcmQtLWNvbmZpZy1zcGFjZXIgYWNvcmQtLWNvbmZpZy1pdGVtXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwic3BhY2VyXCIgOnN0eWxlPVwieydoZWlnaHQnOiBpdGVtPy5oZWlnaHQsICd3aWR0aCc6IGl0ZW0/LndpZHRofVwiIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIGAsXHJcbiAgICB9KTtcclxuICB9XHJcbn0iLCAiaW1wb3J0IGV2ZW50cyBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vYXBpL2V2ZW50cy9pbmRleC5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIC8qKiBAcGFyYW0ge2ltcG9ydChcInZ1ZVwiKS5BcHB9IHZ1ZUFwcCAqL1xyXG4gIGxvYWQodnVlQXBwKSB7XHJcbiAgICB2dWVBcHAuY29tcG9uZW50KFwiY29uZmlnLXRleHRhcmVhXCIsIHtcclxuICAgICAgcHJvcHM6IFtcIml0ZW1cIiwgXCJleHRlbnNpb25cIl0sXHJcbiAgICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiB2LXNob3c9XCJpdGVtPy52aXNpYmxlID8/IHRydWVcIiBjbGFzcz1cImFjb3JkLS1jb25maWctdGV4dGFyZWEgYWNvcmQtLWNvbmZpZy1pdGVtXCI+XHJcbiAgICAgICAgICA8ZGlzY29yZC10ZXh0YXJlYSBAY2hhbmdlPVwib25DaGFuZ2VcIiB2LW1vZGVsPVwiaXRlbS52YWx1ZVwiIDp0eXBlPVwiaXRlbS5pbnB1dFR5cGVcIiA6cGxhY2Vob2xkZXI9XCJpdGVtLnBsYWNlaG9sZGVyXCIgOm1heGxlbmd0aD1cIml0ZW0ubWF4bGVuZ3RoXCIgOmNvbHM9XCJpdGVtLmNvbHVtbnNcIiA6cm93cz1cIml0ZW0ucm93c1wiIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIGAsXHJcbiAgICAgIG1ldGhvZHM6IHtcclxuICAgICAgICBvbkNoYW5nZShkYXRhKSB7XHJcbiAgICAgICAgICBldmVudHMuZW1pdChcclxuICAgICAgICAgICAgXCJleHRlbnNpb24tY29uZmlnLWludGVyYWN0aW9uXCIsXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBleHRlbnNpb246IHRoaXMuZXh0ZW5zaW9uLFxyXG4gICAgICAgICAgICAgIGl0ZW06IHRoaXMuaXRlbSxcclxuICAgICAgICAgICAgICBkYXRhXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIClcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufSIsICJleHBvcnQgZGVmYXVsdCBgXG4uYWNvcmQtLWNvbmZpZy1pdGVte3dpZHRoOjEwMCU7ZGlzcGxheTpmbGV4fS5hY29yZC0tY29uZmlnLXJvd3t3aWR0aDoxMDAlO2Rpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpyb3c7anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47YWxpZ24taXRlbXM6Y2VudGVyfS5hY29yZC0tY29uZmlnLXJvdy5ob3Jpem9udGFsLWFsaWduLWxlZnR7anVzdGlmeS1jb250ZW50OmZsZXgtc3RhcnR9LmFjb3JkLS1jb25maWctcm93Lmhvcml6b250YWwtYWxpZ24tcmlnaHR7anVzdGlmeS1jb250ZW50OmZsZXgtZW5kfS5hY29yZC0tY29uZmlnLXJvdy5ob3Jpem9udGFsLWFsaWduLWNlbnRlcntqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyfS5hY29yZC0tY29uZmlnLXJvdy5qdXN0aWZ5LXNwYWNlLWJldHdlZW57anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW59LmFjb3JkLS1jb25maWctcm93Lmp1c3RpZnktc3BhY2UtYXJvdW5ke2p1c3RpZnktY29udGVudDpzcGFjZS1hcm91bmR9LmFjb3JkLS1jb25maWctcm93LnZlcnRpY2FsLWFsaWduLXRvcHthbGlnbi1pdGVtczpmbGV4LXN0YXJ0fS5hY29yZC0tY29uZmlnLXJvdy52ZXJ0aWNhbC1hbGlnbi1ib3R0b217YWxpZ24taXRlbXM6ZmxleC1lbmR9LmFjb3JkLS1jb25maWctY29sdW1ue3dpZHRoOjEwMCU7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOmNvbHVtbjtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1zdGFydDthbGlnbi1pdGVtczpjZW50ZXJ9LmFjb3JkLS1jb25maWctY29sdW1uLmhvcml6b250YWwtYWxpZ24tbGVmdHtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1zdGFydH0uYWNvcmQtLWNvbmZpZy1jb2x1bW4uaG9yaXpvbnRhbC1hbGlnbi1yaWdodHtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1lbmR9LmFjb3JkLS1jb25maWctY29sdW1uLmhvcml6b250YWwtYWxpZ24tY2VudGVye2p1c3RpZnktY29udGVudDpjZW50ZXJ9LmFjb3JkLS1jb25maWctY29sdW1uLmp1c3RpZnktc3BhY2UtYmV0d2VlbntqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2Vlbn0uYWNvcmQtLWNvbmZpZy1jb2x1bW4uanVzdGlmeS1zcGFjZS1hcm91bmR7anVzdGlmeS1jb250ZW50OnNwYWNlLWFyb3VuZH0uYWNvcmQtLWNvbmZpZy1jb2x1bW4udmVydGljYWwtYWxpZ24tdG9we2FsaWduLWl0ZW1zOmZsZXgtc3RhcnR9LmFjb3JkLS1jb25maWctY29sdW1uLnZlcnRpY2FsLWFsaWduLWJvdHRvbXthbGlnbi1pdGVtczpmbGV4LWVuZH0uYWNvcmQtLWNvbmZpZy1jb2x1bW4udmVydGljYWwtYWxpZ24tY2VudGVye2FsaWduLWl0ZW1zOmNlbnRlcn0uYWNvcmQtLWNvbmZpZy1oZWFkaW5ne2ZvbnQtc2l6ZToxLjJyZW07Zm9udC13ZWlnaHQ6NTAwO21hcmdpbi1ib3R0b206LjVyZW07Y29sb3I6I2Y1ZjVmNX0uYWNvcmQtLWNvbmZpZy1wYXJhZ3JhcGh7Zm9udC1zaXplOjFyZW07Zm9udC13ZWlnaHQ6NDAwO21hcmdpbi1ib3R0b206LjVyZW07Y29sb3I6cmdiYSgyNDUsMjQ1LDI0NSwuODUpfWA7XG4iLCAiaW1wb3J0IHBhdGNoZXIgZnJvbSBcIi4uLy4uLy4uLy4uLy4uLy4uL2FwaS9wYXRjaGVyL2luZGV4LmpzXCI7XHJcbmltcG9ydCBjb25maWdCdXR0b24gZnJvbSBcIi4vY29uZmlnLWJ1dHRvbi9pbmRleC5qc1wiO1xyXG5pbXBvcnQgY29uZmlnQ2hlY2sgZnJvbSBcIi4vY29uZmlnLWNoZWNrL2luZGV4LmpzXCI7XHJcbmltcG9ydCBjb25maWdDb2x1bW4gZnJvbSBcIi4vY29uZmlnLWNvbHVtbi9pbmRleC5qc1wiXHJcbmltcG9ydCBjb25maWdIZWFkaW5nIGZyb20gXCIuL2NvbmZpZy1oZWFkaW5nL2luZGV4LmpzXCI7XHJcbmltcG9ydCBjb25maWdJbnB1dCBmcm9tIFwiLi9jb25maWctaW5wdXQvaW5kZXguanNcIjtcclxuaW1wb3J0IGNvbmZpZ1BhcmFncmFwaCBmcm9tIFwiLi9jb25maWctcGFyYWdyYXBoL2luZGV4LmpzXCI7XHJcbmltcG9ydCBjb25maWdSb3cgZnJvbSBcIi4vY29uZmlnLXJvdy9pbmRleC5qc1wiO1xyXG5pbXBvcnQgY29uZmlnU2VsZWN0IGZyb20gXCIuL2NvbmZpZy1zZWxlY3QvaW5kZXguanNcIjtcclxuaW1wb3J0IGNvbmZpZ1NwYWNlciBmcm9tIFwiLi9jb25maWctc3BhY2VyL2luZGV4LmpzXCI7XHJcbmltcG9ydCBjb25maWdUZXh0YXJlYSBmcm9tIFwiLi9jb25maWctdGV4dGFyZWEvaW5kZXguanNcIjtcclxuXHJcbmltcG9ydCBjc3NUZXh0IGZyb20gXCIuL3N0eWxlLnNjc3NcIjtcclxucGF0Y2hlci5pbmplY3RDU1MoY3NzVGV4dCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgLyoqIEBwYXJhbSB7aW1wb3J0KFwidnVlXCIpLkFwcH0gdnVlQXBwICovXHJcbiAgbG9hZCh2dWVBcHApIHtcclxuICAgIGNvbmZpZ1BhcmFncmFwaC5sb2FkKHZ1ZUFwcCk7XHJcbiAgICBjb25maWdIZWFkaW5nLmxvYWQodnVlQXBwKTtcclxuICAgIGNvbmZpZ1NwYWNlci5sb2FkKHZ1ZUFwcCk7XHJcbiAgICBjb25maWdCdXR0b24ubG9hZCh2dWVBcHApO1xyXG4gICAgY29uZmlnQ2hlY2subG9hZCh2dWVBcHApO1xyXG4gICAgY29uZmlnSW5wdXQubG9hZCh2dWVBcHApO1xyXG4gICAgY29uZmlnU2VsZWN0LmxvYWQodnVlQXBwKTtcclxuICAgIGNvbmZpZ1RleHRhcmVhLmxvYWQodnVlQXBwKTtcclxuICAgIGNvbmZpZ0NvbHVtbi5sb2FkKHZ1ZUFwcCk7XHJcbiAgICBjb25maWdSb3cubG9hZCh2dWVBcHApO1xyXG4gIH1cclxufSIsICJleHBvcnQgZGVmYXVsdCBgXG4uYWNvcmQtLWluc3RhbGxlZC1leHRlbnNpb24tY2FyZHt3aWR0aDoxMDAlO2JhY2tncm91bmQtY29sb3I6cmdiYSgwLDAsMCwuMSk7Ym9yZGVyLXJhZGl1czo4cHg7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOmNvbHVtbjtnYXA6MTZweH0uYWNvcmQtLWluc3RhbGxlZC1leHRlbnNpb24tY2FyZD4udG9we2JhY2tncm91bmQtY29sb3I6cmdiYSgwLDAsMCwuMSk7Ym9yZGVyLXJhZGl1czo4cHg7d2lkdGg6MTAwJTtwYWRkaW5nOjhweDtoZWlnaHQ6MTAwcHh9YDtcbiIsICJpbXBvcnQgaTE4biBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vYXBpL2kxOG4vaW5kZXguanNcIjtcclxuaW1wb3J0IHBhdGNoZXIgZnJvbSBcIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2FwaS9wYXRjaGVyL2luZGV4LmpzXCI7XHJcbmltcG9ydCBleHRlbnNpb25zIGZyb20gXCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9hcGkvZXh0ZW5zaW9ucy9pbmRleC5qc1wiO1xyXG5cclxuaW1wb3J0IGNzc1RleHQgZnJvbSBcIi4vc3R5bGUuc2Nzc1wiO1xyXG5pbXBvcnQgeyByZWNvbXB1dGFibGUsIHJlY29tcHV0ZSB9IGZyb20gXCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9hcGkvdWkvdnVlL3V0aWxzL3JlY29tcHV0ZS5qc1wiO1xyXG5wYXRjaGVyLmluamVjdENTUyhjc3NUZXh0KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAvKiogQHBhcmFtIHtpbXBvcnQoXCJ2dWVcIikuQXBwfSB2dWVBcHAgKi9cclxuICBsb2FkKHZ1ZUFwcCkge1xyXG4gICAgdnVlQXBwLmNvbXBvbmVudChcclxuICAgICAgXCJpbnN0YWxsZWQtZXh0ZW5zaW9uLWNhcmRcIixcclxuICAgICAge1xyXG4gICAgICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWNvcmQtLWluc3RhbGxlZC1leHRlbnNpb24tY2FyZFwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidG9wXCI+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxlZnRcIj5cclxuXHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJpZ2h0XCI+XHJcblxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJvdHRvbVwiPlxyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIGAsXHJcbiAgICAgICAgZGF0YSgpIHtcclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGV4cGFuZGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgdXJsOiBudWxsLFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbXB1dGVkOiB7XHJcbiAgICAgICAgICBleHRlbnNpb246IHJlY29tcHV0YWJsZShcclxuICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgIHJldHVybiBleHRlbnNpb25zLmdldCh0aGlzLnVybCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiZXh0ZW5zaW9uXCJcclxuICAgICAgICAgIClcclxuICAgICAgICB9LFxyXG4gICAgICAgIG1vdW50ZWQoKSB7XHJcbiAgICAgICAgICByZWNvbXB1dGUodGhpcywgXCJleHRlbnNpb25cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICApO1xyXG4gIH1cclxufSIsICJleHBvcnQgZGVmYXVsdCBgXG4uYWNvcmQtLXN0b3JlLWV4dGVuc2lvbi1jYXJke3dpZHRoOjI3NXB4O2hlaWdodDoyNTBweDtkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1uO2JvcmRlci1yYWRpdXM6NHB4O2NvbnRhaW46Y29udGVudDtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMCwwLDAsLjEpO2JveC1zaGFkb3c6dmFyKC0tZWxldmF0aW9uLW1lZGl1bSl9LmFjb3JkLS1zdG9yZS1leHRlbnNpb24tY2FyZD4ucHJldmlld3t3aWR0aDoxMDAlO2hlaWdodDoxMDBweDtkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1uO2p1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVuO2FsaWduLWl0ZW1zOmNlbnRlcjtiYWNrZ3JvdW5kLWNvbG9yOnZhcigtLWJyYW5kLTUwMCk7YmFja2dyb3VuZC1wb3NpdGlvbjpjZW50ZXI7YmFja2dyb3VuZC1zaXplOmNvdmVyfS5hY29yZC0tc3RvcmUtZXh0ZW5zaW9uLWNhcmQ+LnByZXZpZXc+LmNvbnRyb2xze3BhZGRpbmc6OHB4O2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47d2lkdGg6MTAwJX0uYWNvcmQtLXN0b3JlLWV4dGVuc2lvbi1jYXJkPi5wcmV2aWV3Pi5jb250cm9scyAuZ297YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDAsMCwwLC41KTtib3gtc2hhZG93OjBweCAwcHggNHB4IHJnYmEoMCwwLDAsLjUpO2JvcmRlci1yYWRpdXM6NTAlO3dpZHRoOjI0cHg7aGVpZ2h0OjI0cHg7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO2NvbG9yOnZhcigtLWhlYWRlci1wcmltYXJ5KTtmb250LXdlaWdodDo2MDA7Y3Vyc29yOnBvaW50ZXJ9LmFjb3JkLS1zdG9yZS1leHRlbnNpb24tY2FyZD4ucHJldmlldz4ubmFtZS1jb250YWluZXJ7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO2NvbG9yOnZhcigtLWhlYWRlci1wcmltYXJ5KTtwYWRkaW5nOjhweH0uYWNvcmQtLXN0b3JlLWV4dGVuc2lvbi1jYXJkPi5wcmV2aWV3Pi5uYW1lLWNvbnRhaW5lcj4ubmFtZXtmb250LXNpemU6MTRweDtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMCwwLDAsLjUpO2JveC1zaGFkb3c6MHB4IDBweCA0cHggcmdiYSgwLDAsMCwuNSk7Ym9yZGVyLXJhZGl1czo5OTk5cHg7cGFkZGluZzo0cHggOHB4fS5hY29yZC0tc3RvcmUtZXh0ZW5zaW9uLWNhcmQ+LmluZm8tY29udGFpbmVye2Rpc3BsYXk6ZmxleDtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2VlbjtmbGV4LWRpcmVjdGlvbjpjb2x1bW47cGFkZGluZzo4cHg7aGVpZ2h0OjE1MHB4O3dpZHRoOjEwMCV9LmFjb3JkLS1zdG9yZS1leHRlbnNpb24tY2FyZD4uaW5mby1jb250YWluZXI+LnRvcHtkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1uO2dhcDo0cHg7aGVpZ2h0OjEwMCV9LmFjb3JkLS1zdG9yZS1leHRlbnNpb24tY2FyZD4uaW5mby1jb250YWluZXI+LnRvcD4ubmFtZS1jb250YWluZXJ7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtnYXA6NHB4O3dpZHRoOjEwMCV9LmFjb3JkLS1zdG9yZS1leHRlbnNpb24tY2FyZD4uaW5mby1jb250YWluZXI+LnRvcD4ubmFtZS1jb250YWluZXI+Lm5hbWV7Zm9udC1zaXplOjE2cHg7Zm9udC13ZWlnaHQ6NTAwO2NvbG9yOnZhcigtLWhlYWRlci1wcmltYXJ5KX0uYWNvcmQtLXN0b3JlLWV4dGVuc2lvbi1jYXJkPi5pbmZvLWNvbnRhaW5lcj4udG9wPi5uYW1lLWNvbnRhaW5lcj4udmVyc2lvbntmb250LXNpemU6MTJweDtmb250LXdlaWdodDo1MDA7Y29sb3I6dmFyKC0taGVhZGVyLXByaW1hcnkpO29wYWNpdHk6LjV9LmFjb3JkLS1zdG9yZS1leHRlbnNpb24tY2FyZD4uaW5mby1jb250YWluZXI+LnRvcD4uZGVzY3JpcHRpb257Zm9udC1zaXplOjE0cHg7Zm9udC13ZWlnaHQ6MzAwO2NvbG9yOnZhcigtLWhlYWRlci1wcmltYXJ5KTtvcGFjaXR5Oi43NTt3aWR0aDoxMDAlfS5hY29yZC0tc3RvcmUtZXh0ZW5zaW9uLWNhcmQ+LmluZm8tY29udGFpbmVyPi5ib3R0b217ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmZsZXgtc3RhcnQ7anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47aGVpZ2h0OjEwMCV9LmFjb3JkLS1zdG9yZS1leHRlbnNpb24tY2FyZD4uaW5mby1jb250YWluZXI+LmJvdHRvbT4ubGVmdHtoZWlnaHQ6MTAwJTtkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1uO2FsaWduLWl0ZW1zOmZsZXgtc3RhcnQ7anVzdGlmeS1jb250ZW50OmZsZXgtZW5kfS5hY29yZC0tc3RvcmUtZXh0ZW5zaW9uLWNhcmQ+LmluZm8tY29udGFpbmVyPi5ib3R0b20+LmxlZnQ+LmF1dGhvcnN7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOmNvbHVtbjtnYXA6NHB4fS5hY29yZC0tc3RvcmUtZXh0ZW5zaW9uLWNhcmQ+LmluZm8tY29udGFpbmVyPi5ib3R0b20+LmxlZnQ+LmF1dGhvcnMgLmF1dGhvcntkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2JvcmRlci1yYWRpdXM6OTk5OXB4O2JhY2tncm91bmQtY29sb3I6cmdiYSgwLDAsMCwuMSk7Y3Vyc29yOnBvaW50ZXJ9LmFjb3JkLS1zdG9yZS1leHRlbnNpb24tY2FyZD4uaW5mby1jb250YWluZXI+LmJvdHRvbT4ubGVmdD4uYXV0aG9ycyAuYXV0aG9yPi5pbWFnZXtib3JkZXItcmFkaXVzOjUwJTt3aWR0aDoxOHB4O2hlaWdodDoxOHB4O2JhY2tncm91bmQtY29sb3I6dmFyKC0tYnJhbmQtNTAwKTtiYWNrZ3JvdW5kLXBvc2l0aW9uOmNlbnRlcjtiYWNrZ3JvdW5kLXNpemU6Y292ZXJ9LmFjb3JkLS1zdG9yZS1leHRlbnNpb24tY2FyZD4uaW5mby1jb250YWluZXI+LmJvdHRvbT4ubGVmdD4uYXV0aG9ycyAuYXV0aG9yPi5uYW1le2ZvbnQtc2l6ZToxMHB4O2ZvbnQtd2VpZ2h0OjQwMDtjb2xvcjp2YXIoLS1oZWFkZXItcHJpbWFyeSk7b3BhY2l0eTouNzU7cGFkZGluZzo2cHh9LmFjb3JkLS1zdG9yZS1leHRlbnNpb24tY2FyZD4uaW5mby1jb250YWluZXI+LmJvdHRvbT4ucmlnaHR7aGVpZ2h0OjEwMCU7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOmNvbHVtbjthbGlnbi1pdGVtczpmbGV4LWVuZDtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1lbmR9YDtcbiIsICJpbXBvcnQgbW9kYWxzIGZyb20gXCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9hcGkvdWkvbW9kYWxzLmpzeFwiO1xyXG5pbXBvcnQgaTE4biBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vYXBpL2kxOG4vaW5kZXguanNcIjtcclxuaW1wb3J0IHBhdGNoZXIgZnJvbSBcIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2FwaS9wYXRjaGVyL2luZGV4LmpzXCI7XHJcblxyXG5pbXBvcnQgY3NzVGV4dCBmcm9tIFwiLi9zdHlsZS5zY3NzXCI7XHJcbnBhdGNoZXIuaW5qZWN0Q1NTKGNzc1RleHQpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIC8qKiBAcGFyYW0ge2ltcG9ydChcInZ1ZVwiKS5BcHB9IHZ1ZUFwcCAqL1xyXG4gIGxvYWQodnVlQXBwKSB7XHJcbiAgICB2dWVBcHAuY29tcG9uZW50KFxyXG4gICAgICBcInN0b3JlLWV4dGVuc2lvbi1jYXJkXCIsXHJcbiAgICAgIHtcclxuICAgICAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImFjb3JkLS1zdG9yZS1leHRlbnNpb24tY2FyZFwiPlxyXG4gICAgICAgICAgICA8ZGl2IHYtaWY9XCJleHRlbnNpb24ucHJldmlld3M/Lmxlbmd0aFwiIGNsYXNzPVwicHJldmlld1wiIDpzdHlsZT1cInsgYmFja2dyb3VuZEltYWdlOiAndXJsKCcgKyBleHRlbnNpb24ucHJldmlld3Nbc2VsZWN0ZWRQcmV2aWV3XS5pbWFnZSArICcpJyB9XCI+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRyb2xzXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ28gZ28tYmFja1wiIEBjbGljaz1cImdvQmFja1wiPlxyXG4gICAgICAgICAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD1cIk0xMS44MjggMTJsMi44MjkgMi44MjgtMS40MTQgMS40MTVMOSAxMmw0LjI0My00LjI0MyAxLjQxNCAxLjQxNUwxMS44MjggMTJ6XCIgZmlsbD1cImN1cnJlbnRDb2xvclwiIC8+XHJcbiAgICAgICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ28gZ28tZm9yd2FyZFwiIEBjbGljaz1cImdvRm9yd2FyZFwiPlxyXG4gICAgICAgICAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD1cIk0xMi4xNzIgMTJMOS4zNDMgOS4xNzJsMS40MTQtMS40MTVMMTUgMTJsLTQuMjQzIDQuMjQzLTEuNDE0LTEuNDE1elwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIiAvPlxyXG4gICAgICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJuYW1lLWNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm5hbWVcIj5cclxuICAgICAgICAgICAgICAgICAge3sgZXh0ZW5zaW9uLnByZXZpZXdzW3NlbGVjdGVkUHJldmlld10ubmFtZSB9fVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IHYtZWxzZSBjbGFzcz1cInByZXZpZXcgbm8tcHJldmlld1wiPjwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5mby1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidG9wXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibmFtZS1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm5hbWVcIj57eyBpMThuTG9jYWxpemUoZXh0ZW5zaW9uLm5hbWUpIH19PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ2ZXJzaW9uXCI+dnt7IGV4dGVuc2lvbi52ZXJzaW9uIH19PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkZXNjcmlwdGlvblwiPnt7IGkxOG5Mb2NhbGl6ZShleHRlbnNpb24uZGVzY3JpcHRpb24pIH19PC9kaXY+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJvdHRvbVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxlZnRcIj5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImF1dGhvcnNcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHYtZm9yPVwiYXV0aG9yIGluIGV4dGVuc2lvbi5hdXRob3JzXCIgY2xhc3M9XCJhdXRob3JcIiA6a2V5PVwiYXV0aG9yLm5hbWVcIiBAY2xpY2s9XCJzaG93UHJvZmlsZShhdXRob3IuaWQpXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW1hZ2VcIiA6c3R5bGU9XCJ7IGJhY2tncm91bmRJbWFnZTogJ3VybCgnICsgYXV0aG9yLmltYWdlICsgJyknIH1cIj48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJuYW1lXCI+e3sgYXV0aG9yLm5hbWUgfX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyaWdodFwiPlxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnV0dG9uc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIEBjbGljaz1cImluc3RhbGxPclVuaW5zdGFsbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPGRpc2NvcmQtYnV0dG9uIDp2YWx1ZT1cImkxOG5Gb3JtYXQoZXh0ZW5zaW9uLmluc3RhbGxlZCA/ICdVTklOU1RBTEwnIDogJ0lOU1RBTEwnKVwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIGAsXHJcbiAgICAgICAgcHJvcHM6IFtcImV4dGVuc2lvblwiXSxcclxuICAgICAgICBkYXRhKCkge1xyXG4gICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgc2VsZWN0ZWRQcmV2aWV3OiAwLFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG1ldGhvZHM6IHtcclxuICAgICAgICAgIGkxOG5Gb3JtYXQ6IGkxOG4uZm9ybWF0LFxyXG4gICAgICAgICAgaTE4bkxvY2FsaXplOiBpMThuLmxvY2FsaXplLFxyXG4gICAgICAgICAgaW5zdGFsbE9yVW5pbnN0YWxsKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5leHRlbnNpb24uaW5zdGFsbGVkKSB7XHJcbiAgICAgICAgICAgICAgLy8gdW5pbnN0YWxsXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgLy8gaW5zdGFsbFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgZ29CYWNrKCkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkUHJldmlldy0tO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZFByZXZpZXcgPCAwKSB0aGlzLnNlbGVjdGVkUHJldmlldyA9IHRoaXMuZXh0ZW5zaW9uLnByZXZpZXdzLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgZ29Gb3J3YXJkKCkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkUHJldmlldysrO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZFByZXZpZXcgPj0gdGhpcy5leHRlbnNpb24ucHJldmlld3MubGVuZ3RoKSB0aGlzLnNlbGVjdGVkUHJldmlldyA9IDA7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgc2hvd1Byb2ZpbGUocHJvZmlsZUlkKSB7XHJcbiAgICAgICAgICAgIG1vZGFscy5zaG93LnVzZXIocHJvZmlsZUlkKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIClcclxuICB9XHJcbn0iLCAiaW1wb3J0IGluc3RhbGxlZEV4dGVuc2lvbkNhcmQgZnJvbSBcIi4vaW5zdGFsbGVkLWV4dGVuc2lvbi1jYXJkL2luZGV4LmpzXCI7XHJcbmltcG9ydCBzdG9yZUV4dGVuc2lvbkNhcmQgZnJvbSBcIi4vc3RvcmUtZXh0ZW5zaW9uLWNhcmQvaW5kZXguanNcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIC8qKiBAcGFyYW0ge2ltcG9ydChcInZ1ZVwiKS5BcHB9IHZ1ZUFwcCAqL1xyXG4gIGxvYWQodnVlQXBwKSB7XHJcbiAgICBzdG9yZUV4dGVuc2lvbkNhcmQubG9hZCh2dWVBcHApO1xyXG4gICAgaW5zdGFsbGVkRXh0ZW5zaW9uQ2FyZC5sb2FkKHZ1ZUFwcCk7XHJcbiAgfVxyXG59IiwgIlxyXG5pbXBvcnQgY29uZmlnQ29tcG9uZW50cyBmcm9tIFwiLi9jb25maWcvaW5kZXguanNcIjtcclxuaW1wb3J0IGNhcmRDb21wb25lbnRzIGZyb20gXCIuL2NhcmRzL2luZGV4LmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgLyoqIEBwYXJhbSB7aW1wb3J0KFwidnVlXCIpLkFwcH0gdnVlQXBwICovXHJcbiAgbG9hZCh2dWVBcHApIHtcclxuICAgIGNvbmZpZ0NvbXBvbmVudHMubG9hZCh2dWVBcHApO1xyXG4gICAgY2FyZENvbXBvbmVudHMubG9hZCh2dWVBcHApO1xyXG4gIH1cclxufSIsICJpbXBvcnQgcGFnZXMgZnJvbSBcIi4vcGFnZXMvaW5kZXguanNcIjtcclxuaW1wb3J0IGNvbXBvbmVudHMgZnJvbSBcIi4vY29tcG9uZW50cy9pbmRleC5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIC8qKiBAcGFyYW0ge2ltcG9ydChcInZ1ZVwiKS5BcHB9IHZ1ZUFwcCAqL1xyXG4gIGxvYWQodnVlQXBwKSB7XHJcbiAgICBjb21wb25lbnRzLmxvYWQodnVlQXBwKTtcclxuICAgIHBhZ2VzLmxvYWQodnVlQXBwKTtcclxuICB9XHJcbn0iLCAiaW1wb3J0IGRvbSBmcm9tIFwiLi4vLi4vYXBpL2RvbS9pbmRleC5qc1wiO1xyXG5pbXBvcnQgd2VicGFjayBmcm9tIFwiLi4vLi4vYXBpL21vZHVsZXMvd2VicGFjay5qc1wiO1xyXG5pbXBvcnQgcGF0Y2hlciBmcm9tIFwiLi4vLi4vYXBpL3BhdGNoZXIvaW5kZXguanNcIjtcclxuaW1wb3J0IHV0aWxzIGZyb20gXCIuLi8uLi9hcGkvdXRpbHMvaW5kZXguanNcIjtcclxuaW1wb3J0IGkxOG4gZnJvbSBcIi4uLy4uL2FwaS9pMThuL2luZGV4LmpzXCI7XHJcbmltcG9ydCB1aSBmcm9tIFwiLi4vLi4vYXBpL3VpL2luZGV4LmpzXCI7XHJcblxyXG5pbXBvcnQgY3NzVGV4dCBmcm9tIFwiLi9zdHlsZS5zY3NzXCI7XHJcbmltcG9ydCB2dWVDb21wb25lbnRzIGZyb20gXCIuL3Z1ZS9jb21wb25lbnRzL2luZGV4LmpzXCI7XHJcbnBhdGNoZXIuaW5qZWN0Q1NTKGNzc1RleHQpO1xyXG5cclxue1xyXG4gIGxldCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xyXG4gIHNjcmlwdC5zcmMgPSBcImh0dHBzOi8vdW5wa2cuY29tL3Z1ZUAzL2Rpc3QvdnVlLmdsb2JhbC5qc1wiO1xyXG4gIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcclxufVxyXG5cclxuZG9tLnBhdGNoKCdhW2hyZWY9XCIvc3RvcmVcIl1bZGF0YS1saXN0LWl0ZW0taWQkPVwiX19fbml0cm9cIl0nLCAoZWxtKSA9PiB7XHJcbiAgdXRpbHMuaWZFeGlzdHMoXHJcbiAgICBlbG0ucXVlcnlTZWxlY3RvcignW2NsYXNzKj1cIm5hbWVBbmREZWNvcmF0b3JzLVwiXSBbY2xhc3MqPVwibmFtZS1cIl0nKSxcclxuICAgIChuYW1lRWxtKSA9PiB7XHJcbiAgICAgIG5hbWVFbG0udGV4dENvbnRlbnQgPSBpMThuLmZvcm1hdChcIkFQUF9OQU1FXCIpO1xyXG4gICAgfVxyXG4gICk7XHJcblxyXG4gIHV0aWxzLmlmRXhpc3RzKFxyXG4gICAgZWxtLnF1ZXJ5U2VsZWN0b3IoJ1tjbGFzcyo9XCJwcmVtaXVtVHJpYWxBY2tub3dsZWRnZWRCYWRnZS1cIl0nKSxcclxuICAgIChuaXRyb0VsbSkgPT4ge1xyXG4gICAgICBuaXRyb0VsbS5yZW1vdmUoKTtcclxuICAgIH1cclxuICApO1xyXG5cclxuICB1dGlscy5pZkV4aXN0cyhcclxuICAgIGVsbS5xdWVyeVNlbGVjdG9yKCdbY2xhc3MqPVwiYXZhdGFyV2l0aFRleHQtXCJdIFtjbGFzcyo9XCJhdmF0YXItXCJdIHN2ZycpLFxyXG4gICAgZmlsbFNWR0VsbVdpdGhBY29yZExvZ29cclxuICApO1xyXG59KTtcclxuXHJcbmxldCBpbnRlcm5hbFZ1ZUFwcCA9IG51bGw7XHJcblxyXG5jb25zdCBoZWFkZXJJdGVtQ2xhc3NlcyA9IHdlYnBhY2suZmluZEJ5UHJvcGVydGllcyhcImRpdmlkZXJcIiwgXCJoYW1idXJnZXJcIiwgXCJ0aGVtZWRcIik7XHJcbmNvbnN0IHRhYkJhckNsYXNzZXMgPSB3ZWJwYWNrLmZpbmRCeVByb3BlcnRpZXMoXCJ0YWJCYXJcIiwgXCJtYXhXaWR0aFdpdGhUb29sYmFyXCIpO1xyXG5jb25zdCBoZWFkZXJDbGFzc2VzID0gd2VicGFjay5maW5kQnlQcm9wZXJ0aWVzKFwidG9wUGlsbFwiLCBcImhlYWRlclRleHRcIik7XHJcbmRvbS5wYXRjaCgnW2NsYXNzKj1cImFwcGxpY2F0aW9uU3RvcmUtXCJdIFtjbGFzcyo9XCJob21lV3JhcHBlck5vcm1hbC1cIl0nLCAoZWxtKSA9PiB7XHJcblxyXG4gIHV0aWxzLmlmRXhpc3RzKFxyXG4gICAgZWxtLnF1ZXJ5U2VsZWN0b3IoJ1tjbGFzcyo9XCJoZWFkZXJCYXItXCJdIFtjbGFzcyo9XCJ0aXRsZVdyYXBwZXItXCJdIFtjbGFzcyo9XCJ0aXRsZS1cIl0nKSxcclxuICAgICh0aXRsZUVsbSkgPT4ge1xyXG4gICAgICB0aXRsZUVsbS50ZXh0Q29udGVudCA9IGkxOG4uZm9ybWF0KFwiQVBQX05BTUVcIik7XHJcblxyXG4gICAgICBpZiAoaW50ZXJuYWxWdWVBcHApIHtcclxuICAgICAgICBsZXQgY29udGFpbmVyID0gZG9tLnBhcmVudHModGl0bGVFbG0sIDIpLnBvcCgpO1xyXG5cclxuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICBkb20ucGFyc2UoYDxkaXYgY2xhc3M9XCIke2hlYWRlckl0ZW1DbGFzc2VzLmRpdmlkZXJ9XCI+PC9kaXY+YClcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBjb25zdCBidXR0b25zQ29udGFpbmVyID0gZG9tLnBhcnNlKGBcclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCIke3RhYkJhckNsYXNzZXMudGFiQmFyfSAke2hlYWRlckNsYXNzZXMudG9wUGlsbH1cIj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIGApO1xyXG5cclxuICAgICAgICBsZXQgYnV0dG9ucyA9IFtdO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBidWlsZEJ1dHRvbihpZCwgdGV4dCwgY3VzdG9tQ2xhc3NlcyA9IFwiXCIpIHtcclxuICAgICAgICAgIGxldCBlbG0gPSBkb20ucGFyc2UoYDxkaXYgaWQ9XCJ0YWItYnV0dG9uLSR7aWR9XCIgY2xhc3M9XCJhY29yZC0tdGFicy10YWItYnV0dG9uICR7Y3VzdG9tQ2xhc3Nlc30gJHt0YWJCYXJDbGFzc2VzLml0ZW19ICR7aGVhZGVyQ2xhc3Nlcy5pdGVtfSAke2hlYWRlckNsYXNzZXMudGhlbWVkfVwiPiR7dGV4dH08L2Rpdj5gKTtcclxuXHJcbiAgICAgICAgICBidXR0b25zLnB1c2goZWxtKTtcclxuXHJcbiAgICAgICAgICBlbG0uc2V0U2VsZWN0ZWQgPSAocykgPT4ge1xyXG4gICAgICAgICAgICBpZiAocykgZWxtLmNsYXNzTGlzdC5hZGQoaGVhZGVyQ2xhc3Nlcy5zZWxlY3RlZCwgXCJzZWxlY3RlZFwiKTtcclxuICAgICAgICAgICAgZWxzZSBlbG0uY2xhc3NMaXN0LnJlbW92ZShoZWFkZXJDbGFzc2VzLnNlbGVjdGVkLCBcInNlbGVjdGVkXCIpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGVsbS5zZXRTZWxlY3RlZChpbnRlcm5hbFZ1ZUFwcC5zZWxlY3RlZFRhYiA9PT0gaWQpO1xyXG5cclxuICAgICAgICAgIGVsbS5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBidXR0b25zLmZvckVhY2goKGIpID0+IGIuc2V0U2VsZWN0ZWQoZmFsc2UpKTtcclxuICAgICAgICAgICAgZWxtLnNldFNlbGVjdGVkKHRydWUpO1xyXG4gICAgICAgICAgICBpbnRlcm5hbFZ1ZUFwcC5zZWxlY3RlZFRhYiA9IGlkO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIGVsbTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGJ1dHRvbnNDb250YWluZXIuYXBwZW5kQ2hpbGQoYnVpbGRCdXR0b24oXCJob21lXCIsIGkxOG4uZm9ybWF0KFwiSE9NRVwiKSkpO1xyXG4gICAgICAgIGJ1dHRvbnNDb250YWluZXIuYXBwZW5kQ2hpbGQoYnVpbGRCdXR0b24oXCJpbnN0YWxsZWQtZXh0ZW5zaW9uc1wiLCBpMThuLmZvcm1hdChcIklOU1RBTExFRF9FWFRFTlNJT05TXCIpKSk7XHJcbiAgICAgICAgYnV0dG9uc0NvbnRhaW5lci5hcHBlbmRDaGlsZChidWlsZEJ1dHRvbihcInNldHRpbmdzXCIsIGkxOG4uZm9ybWF0KFwiU0VUVElOR1NcIikpKTtcclxuICAgICAgICBidXR0b25zQ29udGFpbmVyLmFwcGVuZENoaWxkKGJ1aWxkQnV0dG9uKFwic3RvcmVcIiwgaTE4bi5mb3JtYXQoXCJFWFRFTlNJT05fU1RPUkVcIiksIFwic3RvcmUtdGFiLWJ1dHRvblwiKSk7XHJcblxyXG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChidXR0b25zQ29udGFpbmVyKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICk7XHJcbiAgdXRpbHMuaWZFeGlzdHMoXHJcbiAgICBlbG0ucXVlcnlTZWxlY3RvcignW2NsYXNzKj1cImhlYWRlckJhci1cIl0gW2NsYXNzKj1cImljb25XcmFwcGVyLVwiXSBbY2xhc3MqPVwiaWNvbi1cIl0nKSxcclxuICAgIGZpbGxTVkdFbG1XaXRoQWNvcmRMb2dvXHJcbiAgKTtcclxufSk7XHJcblxyXG5mdW5jdGlvbiBmaWxsU1ZHRWxtV2l0aEFjb3JkTG9nbyhzdmdFbG0pIHtcclxuICBzdmdFbG0uc2V0QXR0cmlidXRlKFwidmlld0JveFwiLCBcIjAgMCA4MTMuNSAxNDkzXCIpO1xyXG4gIHN2Z0VsbS5zZXRBdHRyaWJ1dGUoXCJ4bWxuc1wiLCBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIpO1xyXG4gIHN2Z0VsbS5pbm5lckhUTUwgPSBgXHJcbiAgICA8ZGVmcz5cclxuICAgICAgPHN0eWxlPlxyXG4gICAgICAgIC5hY29yZC0tbG9nby1jb2xvciB7XHJcbiAgICAgICAgICBmaWxsOiBjdXJyZW50Q29sb3I7XHJcbiAgICAgICAgICBmaWxsLXJ1bGU6IGV2ZW5vZGQ7XHJcbiAgICAgICAgfVxyXG4gICAgICA8L3N0eWxlPlxyXG4gICAgPC9kZWZzPlxyXG4gICAgPGc+XHJcbiAgICAgIDxwYXRoIGNsYXNzPVwiYWNvcmQtLWxvZ28tY29sb3JcIiBkPVwiTTgxNy4yNjYsMTMyMi41aDI4NXYzNjVoLTI4NXYtMzY1WlwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgtNTUzLjI1IC0yMTMuNSlcIi8+XHJcbiAgICAgIDxwYXRoIGNsYXNzPVwiYWNvcmQtLWxvZ28tY29sb3JcIiBkPVwiTTU1NS4yMzUsMTUyMy43OHM5MS4xNjktMzE5Ljg1LDkyLjUzMS0zMTkuMjhjMTE0LjcsNDcuODMsMTYwLDE5MiwxNjAsMTkybC01Mi4xMiwxODYuNjFzLTMxLjEyOSwxMzcuNzEtODAuODgsMTIwLjM5QzUyOC4wMjYsMTY1Mi40Miw1NTUuMjM1LDE1MjMuNzgsNTU1LjIzNSwxNTIzLjc4WlwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgtNTUzLjI1IC0yMTMuNSlcIi8+XHJcbiAgICAgIDxwYXRoIGNsYXNzPVwiYWNvcmQtLWxvZ28tY29sb3JcIiBkPVwiTTEzNjQuNzcsMTUyNS4yOHMtOTEuMTctMzE5Ljg1LTkyLjU0LTMxOS4yOGMtMTE0LjcsNDcuODMtMTYwLDE5Mi0xNjAsMTkybDUyLjEyLDE4Ni42MXMzMS4xMywxMzcuNzEsODAuODgsMTIwLjM5QzEzOTEuOTcsMTY1My45MiwxMzY0Ljc3LDE1MjUuMjgsMTM2NC43NywxNTI1LjI4WlwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgtNTUzLjI1IC0yMTMuNSlcIi8+XHJcbiAgICA8L2c+XHJcbiAgICA8cGF0aCBjbGFzcz1cImFjb3JkLS1sb2dvLWNvbG9yXCIgZD1cIk04NzQuNzY2LDI3NS41czE0LjU3OS02MS45MTgsODctNjJjODAuODI0LS4wOTIsODcsNjIsODcsNjJzMTk5LjQzLDg1MS40NywxOTgsODUyYy0yMTAuMzMsNzcuNzEtMTQ2LDE4MC0xNDYsMTgwaC0yODFzNjMuNy0xMDMuODItMTQ2LTE4MUM2NzEuMDE0LDExMjUuNDksODc0Ljc2NiwyNzUuNSw4NzQuNzY2LDI3NS41WlwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgtNTUzLjI1IC0yMTMuNSlcIi8+XHJcbiAgICA8Zz5cclxuICAgICAgPHBhdGggY2xhc3M9XCJhY29yZC0tbG9nby1jb2xvclwiIGQ9XCJNMTIzOC4xNCw4OTcuNWE1My44ODIsNTMuODgyLDAsMCwxLDUzLjg4LDUzLjg3NWMwLDI0LjkzOS0yMC4yNSw0Ni45ODctNDMuMjUsNTMuMTI1LTQuNDUsMS4xOC0xMC4xOS0zOS0xMS0zOS0wLjU4LDAtMjcuNzEsMy41MS0zMSw0LTUuNTguODI4LTExLjkzLTEzLjg3Ni00LTIwLDEuOTMtMS40OTEsMjYuNjItNi45NTksMjktNywwLjYyLS4wMTEtNy4zNC00MS42MTgtNy00M0MxMjI1LjY0LDg5NS45NDQsMTIzMy41Miw4OTcuNSwxMjM4LjE0LDg5Ny41WlwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgtNTUzLjI1IC0yMTMuNSlcIi8+XHJcbiAgICAgIDxwYXRoIGNsYXNzPVwiYWNvcmQtLWxvZ28tY29sb3JcIiBkPVwiTTExNzMuNjQsNjMyLjVhNTMuODgyLDUzLjg4MiwwLDAsMSw1My44OCw1My44NzVjMCwyNC45MzktMjAuMjUsNDYuOTg3LTQzLjI1LDUzLjEyNS00LjQ1LDEuMTg1LTEwLjE5LTM5LTExLTM5LTAuNTgsMC0yNy43MSwzLjUxLTMxLDQtNS41OC44MjgtMTEuOTMtMTMuODc2LTQtMjAsMS45My0xLjQ5MSwyNi42Mi02Ljk1OSwyOS03LDAuNjItLjAxMS03LjM0LTQxLjYxOC03LTQzQzExNjEuMTQsNjMwLjk0NCwxMTY5LjAyLDYzMi41LDExNzMuNjQsNjMyLjVaXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKC01NTMuMjUgLTIxMy41KVwiLz5cclxuICAgICAgPHBhdGggY2xhc3M9XCJhY29yZC0tbG9nby1jb2xvclwiIGQ9XCJNMTExNS4xNiwzNzNhNTMuODc0LDUzLjg3NCwwLDAsMSw1My44Nyw1My44NzVjMCwyNC45MzktMjAuMjQsNDYuOTg3LTQzLjI1LDUzLjEyNS00LjQ0LDEuMTg1LTEwLjE4LTM5LTExLTM5LTAuNTgsMC0yNy43LDMuNTEtMzEsNC01LjU3LjgyOC0xMS45Mi0xMy44NzYtNC0yMCwxLjkzLTEuNDkxLDI2LjYyLTYuOTU5LDI5LTcsMC42Mi0uMDExLTcuMzQtNDEuNjE4LTctNDNDMTEwMi42NSwzNzEuNDQ0LDExMTAuNTMsMzczLDExMTUuMTYsMzczWlwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgtNTUzLjI1IC0yMTMuNSlcIi8+XHJcbiAgICA8L2c+XHJcbiAgICA8Zz5cclxuICAgICAgPHBhdGggY2xhc3M9XCJhY29yZC0tbG9nby1jb2xvclwiIGQ9XCJNNjgzLjkyMiw4OTcuNzVhNTMuODc1LDUzLjg3NSwwLDAsMC01My44NzUsNTMuODc1YzAsMjQuOTM5LDIwLjI0NSw0Ni45ODcsNDMuMjUsNTMuMTI1LDQuNDQxLDEuMTgsMTAuMTg1LTM5LDExLTM5LDAuNTc2LDAsMjcuNywzLjUxLDMxLDQsNS41NzIsMC44MjgsMTEuOTI2LTEzLjg3Niw0LTIwLTEuOTMtMS40OTEtMjYuNjIxLTYuOTU5LTI5LTctMC42Mi0uMDExLDcuMzM5LTQxLjYxOCw3LTQzQzY5Ni40MjQsODk2LjE5NCw2ODguNTQ0LDg5Ny43NSw2ODMuOTIyLDg5Ny43NVpcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoLTU1My4yNSAtMjEzLjUpXCIvPlxyXG4gICAgICA8cGF0aCBjbGFzcz1cImFjb3JkLS1sb2dvLWNvbG9yXCIgZD1cIk03NDguNDIyLDYzMi43NWE1My44NzUsNTMuODc1LDAsMCwwLTUzLjg3NSw1My44NzVjMCwyNC45MzksMjAuMjQ1LDQ2Ljk4Nyw0My4yNSw1My4xMjUsNC40NDEsMS4xODUsMTAuMTg1LTM5LDExLTM5LDAuNTc2LDAsMjcuNywzLjUxLDMxLDQsNS41NzIsMC44MjgsMTEuOTI2LTEzLjg3Niw0LTIwLTEuOTMtMS40OTEtMjYuNjIxLTYuOTU5LTI5LTctMC42Mi0uMDExLDcuMzM5LTQxLjYxOCw3LTQzQzc2MC45MjQsNjMxLjE5NCw3NTMuMDQ0LDYzMi43NSw3NDguNDIyLDYzMi43NVpcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoLTU1My4yNSAtMjEzLjUpXCIvPlxyXG4gICAgICA8cGF0aCBjbGFzcz1cImFjb3JkLS1sb2dvLWNvbG9yXCIgZD1cIk04MDYuOTA2LDM3My4yNWE1My44NzUsNTMuODc1LDAsMCwwLTUzLjg3NSw1My44NzVjMCwyNC45MzksMjAuMjQ1LDQ2Ljk4Nyw0My4yNSw1My4xMjUsNC40NDIsMS4xODUsMTAuMTg1LTM5LDExLTM5LDAuNTc3LDAsMjcuNywzLjUxLDMxLDQsNS41NzIsMC44MjgsMTEuOTI2LTEzLjg3Niw0LTIwLTEuOTMtMS40OTEtMjYuNjIxLTYuOTU5LTI5LTctMC42Mi0uMDExLDcuMzM5LTQxLjYxOCw3LTQzQzgxOS40MDksMzcxLjY5NCw4MTEuNTI4LDM3My4yNSw4MDYuOTA2LDM3My4yNVpcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoLTU1My4yNSAtMjEzLjUpXCIvPlxyXG4gICAgPC9nPlxyXG4gIGA7XHJcbn1cclxuXHJcblxyXG4oYXN5bmMgKCkgPT4ge1xyXG4gIGF3YWl0IHVpLnZ1ZS5yZWFkeS53aGVuKCk7XHJcblxyXG4gIGNvbnN0IGJhc2VWdWVFbG0gPSBkb20ucGFyc2UoYFxyXG4gICAgPGRpdiBjbGFzcz1cImFjb3JkLS10YWJzLWNvbnRlbnQtY29udGFpbmVyXCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJ0YWJcIj5cclxuICAgICAgICA8a2VlcC1hbGl2ZT5cclxuICAgICAgICAgIDxjb21wb25lbnQgOmlzPVwiXFxgXFwke3NlbGVjdGVkVGFifS1wYWdlXFxgXCIgLz5cclxuICAgICAgICA8L2tlZXAtYWxpdmU+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgYCk7XHJcblxyXG4gIC8qKiBAdHlwZSB7aW1wb3J0KFwidnVlXCIpLkFwcH0gKi9cclxuICBjb25zdCB2dWVBcHAgPSBWdWUuY3JlYXRlQXBwKHtcclxuICAgIGRhdGEoKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgc2VsZWN0ZWRUYWI6IFwiaG9tZVwiXHJcbiAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgbW91bnRlZCgpIHtcclxuICAgICAgaW50ZXJuYWxWdWVBcHAgPSB0aGlzO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICB1aS52dWUuY29tcG9uZW50cy5sb2FkKHZ1ZUFwcCk7XHJcbiAgdnVlQ29tcG9uZW50cy5sb2FkKHZ1ZUFwcCk7XHJcbiAgdnVlQXBwLm1vdW50KGJhc2VWdWVFbG0pO1xyXG5cclxuICBkb20ucGF0Y2goJ1tjbGFzcyo9XCJhcHBsaWNhdGlvblN0b3JlLVwiXSBbY2xhc3MqPVwic2Nyb2xsZXJCYXNlLVwiXSBbY2xhc3MqPVwic3Vic2NyaXB0aW9uc1JlZGlyZWN0Q29udGFpbmVyLVwiXSwgW2NsYXNzKj1cImFwcGxpY2F0aW9uU3RvcmUtXCJdIFtjbGFzcyo9XCJzY3JvbGxlckJhc2UtXCJdIFtjbGFzcyo9XCJ0cmlhbE9mZmVyV3JhcHBlci1cIl0sIFtjbGFzcyo9XCJhcHBsaWNhdGlvblN0b3JlLVwiXSBbY2xhc3MqPVwic2Nyb2xsZXJCYXNlLVwiXSBbY2xhc3MqPVwicHJlbWl1bUNhcmRzLVwiXScsIChlbG0pID0+IHtcclxuICAgIC8qKiBAdHlwZSB7SFRNTERpdkVsZW1lbnR9ICovXHJcbiAgICBsZXQgY29udGFpbmVyRWxtID0gZG9tLnBhcmVudHMoZWxtLCA0KS5wb3AoKTtcclxuICAgIGNvbnRhaW5lckVsbS5yZXBsYWNlQ2hpbGRyZW4oYmFzZVZ1ZUVsbSk7XHJcbiAgfSk7XHJcbn0pKCk7XHJcblxyXG5cclxuXHJcblxyXG4iLCAiXHJcbihhc3luYyAoKSA9PiB7XHJcbiAgLyoqIEB0eXBlIHtTVkdFbGVtZW50fSAqL1xyXG4gIGxldCBzdmdFbG07XHJcbiAgd2hpbGUgKHRydWUpIHtcclxuICAgIHN2Z0VsbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tjbGFzcyo9XCJ3b3JkbWFyay1cIl0gc3ZnJyk7XHJcbiAgICBpZiAoc3ZnRWxtKSBicmVhaztcclxuICAgIGF3YWl0IG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCAxMDApKTtcclxuICB9XHJcblxyXG4gIHN2Z0VsbS5pbm5lckhUTUwgPSBgPHBhdGggZD1cIk02Ljg2NCAxMEw2LjQzMiA4Ljk1NkgzLjA0OEwyLjU0NCAxMEgwLjEwOEwzLjk0OCAxLjU2NEg2LjA0OEw5LjcyIDEwSDYuODY0Wk00Ljc0IDQuNzhMMy45MTIgNi43OTZINS41OEw0Ljc0IDQuNzhaTTE1LjUwNDUgNi4zMjhDMTUuMzQ0NSA2LjIyNCAxNS4xOTI1IDYuMTMyIDE1LjA0ODUgNi4wNTJDMTQuOTA0NSA1Ljk2NCAxNC43NTY1IDUuODkyIDE0LjYwNDUgNS44MzZDMTQuNDUyNSA1Ljc3MiAxNC4yOTI1IDUuNzI0IDE0LjEyNDUgNS42OTJDMTMuOTY0NSA1LjY2IDEzLjc4NDUgNS42NDQgMTMuNTg0NSA1LjY0NEMxMy4zMTI1IDUuNjQ0IDEzLjA4MDUgNS42OCAxMi44ODg1IDUuNzUyQzEyLjcwNDUgNS44MjQgMTIuNTU2NSA1LjkyIDEyLjQ0NDUgNi4wNEMxMi4zMzI1IDYuMTYgMTIuMjQ4NSA2LjI5NiAxMi4xOTI1IDYuNDQ4QzEyLjE0NDUgNi42IDEyLjEyMDUgNi43NTIgMTIuMTIwNSA2LjkwNEMxMi4xMjA1IDcuMDQ4IDEyLjE1MjUgNy4xOTIgMTIuMjE2NSA3LjMzNkMxMi4yODA1IDcuNDcyIDEyLjM3MjUgNy41OTIgMTIuNDkyNSA3LjY5NkMxMi42MjA1IDcuOCAxMi43NzI1IDcuODg0IDEyLjk0ODUgNy45NDhDMTMuMTI0NSA4LjAxMiAxMy4zMjg1IDguMDQ0IDEzLjU2MDUgOC4wNDRDMTMuNzI4NSA4LjA0NCAxMy44ODQ1IDguMDI4IDE0LjAyODUgNy45OTZDMTQuMTgwNSA3Ljk2NCAxNC4zMjg1IDcuOTE2IDE0LjQ3MjUgNy44NTJDMTQuNjI0NSA3Ljc4OCAxNC43ODA1IDcuNzEyIDE0Ljk0MDUgNy42MjRDMTUuMTA4NSA3LjUyOCAxNS4yOTY1IDcuNDIgMTUuNTA0NSA3LjNMMTYuMTI4NSA5LjA1MkMxNS43Njg1IDkuMzU2IDE1LjM0NDUgOS42MTYgMTQuODU2NSA5LjgzMkMxNC4zNjg1IDEwLjA0IDEzLjg0MDUgMTAuMTQ0IDEzLjI3MjUgMTAuMTQ0QzEyLjczNjUgMTAuMTQ0IDEyLjI0ODUgMTAuMDggMTEuODA4NSA5Ljk1MkMxMS4zNzY1IDkuODE2IDExLjAwNDUgOS42MTYgMTAuNjkyNSA5LjM1MkMxMC4zODg1IDkuMDggMTAuMTUyNSA4Ljc0NCA5Ljk4NDQ3IDguMzQ0QzkuODE2NDcgNy45MzYgOS43MzI0NyA3LjQ2IDkuNzMyNDcgNi45MTZDOS43MzI0NyA2LjM1NiA5LjgyNDQ3IDUuODcyIDEwLjAwODUgNS40NjRDMTAuMjAwNSA1LjA1NiAxMC40NTY1IDQuNzIgMTAuNzc2NSA0LjQ1NkMxMS4xMDQ1IDQuMTg0IDExLjQ4ODUgMy45ODQgMTEuOTI4NSAzLjg1NkMxMi4zNjg1IDMuNzIgMTIuODQwNSAzLjY1MiAxMy4zNDQ1IDMuNjUyQzE0LjMyMDUgMy42NTIgMTUuMTg0NSAzLjk0NCAxNS45MzY1IDQuNTI4TDE1LjUwNDUgNi4zMjhaTTIzLjM5MTkgNi44NTZDMjMuMzkxOSA3LjQzMiAyMy4zMTE5IDcuOTI4IDIzLjE1MTkgOC4zNDRDMjIuOTkxOSA4Ljc2IDIyLjc1OTkgOS4xMDQgMjIuNDU1OSA5LjM3NkMyMi4xNTk5IDkuNjQgMjEuNzk5OSA5LjgzNiAyMS4zNzU5IDkuOTY0QzIwLjk1OTkgMTAuMDg0IDIwLjQ5NTkgMTAuMTQ0IDE5Ljk4MzkgMTAuMTQ0QzE5LjQ4NzkgMTAuMTQ0IDE5LjAzMTkgMTAuMDggMTguNjE1OSA5Ljk1MkMxOC4xOTk5IDkuODE2IDE3LjgzOTkgOS42MTIgMTcuNTM1OSA5LjM0QzE3LjIzMTkgOS4wNjggMTYuOTkxOSA4LjcyOCAxNi44MTU5IDguMzJDMTYuNjQ3OSA3LjkwNCAxNi41NjM5IDcuNDE2IDE2LjU2MzkgNi44NTZDMTYuNTYzOSA2LjI3MiAxNi42NDc5IDUuNzcyIDE2LjgxNTkgNS4zNTZDMTYuOTkxOSA0Ljk0IDE3LjIzMTkgNC42IDE3LjUzNTkgNC4zMzZDMTcuODM5OSA0LjA3MiAxOC4xOTk5IDMuODggMTguNjE1OSAzLjc2QzE5LjAzMTkgMy42NCAxOS40ODc5IDMuNTggMTkuOTgzOSAzLjU4QzIwLjQ5NTkgMy41OCAyMC45NTk5IDMuNjQ4IDIxLjM3NTkgMy43ODRDMjEuNzk5OSAzLjkxMiAyMi4xNTk5IDQuMTEyIDIyLjQ1NTkgNC4zODRDMjIuNzU5OSA0LjY0OCAyMi45OTE5IDQuOTg4IDIzLjE1MTkgNS40MDRDMjMuMzExOSA1LjgxMiAyMy4zOTE5IDYuMjk2IDIzLjM5MTkgNi44NTZaTTIxLjEzNTkgNi44NDRDMjEuMTM1OSA2LjUyNCAyMS4wMzE5IDYuMjU2IDIwLjgyMzkgNi4wNEMyMC42MjM5IDUuODI0IDIwLjM0MzkgNS43MTYgMTkuOTgzOSA1LjcxNkMxOS42MjM5IDUuNzE2IDE5LjM0MzkgNS44MjQgMTkuMTQzOSA2LjA0QzE4Ljk1MTkgNi4yNDggMTguODU1OSA2LjUxNiAxOC44NTU5IDYuODQ0QzE4Ljg1NTkgNy4xNDggMTguOTUxOSA3LjQxNiAxOS4xNDM5IDcuNjQ4QzE5LjM0MzkgNy44NzIgMTkuNjIzOSA3Ljk4NCAxOS45ODM5IDcuOTg0QzIwLjM0MzkgNy45ODQgMjAuNjIzOSA3Ljg3MiAyMC44MjM5IDcuNjQ4QzIxLjAzMTkgNy40MjQgMjEuMTM1OSA3LjE1NiAyMS4xMzU5IDYuODQ0Wk0yOC42OTQ4IDYuNThMMjguNDc4OCA2LjU5MkMyOC40NzA4IDYuNDA4IDI4LjM5MDggNi4yNiAyOC4yMzg4IDYuMTQ4QzI4LjA4NjggNi4wMzYgMjcuOTIyOCA1Ljk4IDI3Ljc0NjggNS45OEMyNy41ODY4IDUuOTggMjcuNDA2OCA2LjAyOCAyNy4yMDY4IDYuMTI0QzI3LjAxNDggNi4yMTIgMjYuODQyOCA2LjM0OCAyNi42OTA4IDYuNTMyVjEwSDI0LjMxNDhWMy43ODRIMjYuNjkwOFY0LjM5NkMyNi44ODI4IDQuMjEyIDI3LjEwMjggNC4wNCAyNy4zNTA4IDMuODhDMjcuNjA2OCAzLjcyIDI3LjkxMDggMy42NCAyOC4yNjI4IDMuNjRDMjguMzE4OCAzLjY0IDI4LjM4NjggMy42NDQgMjguNDY2OCAzLjY1MkMyOC41NDY4IDMuNjYgMjguNjI2OCAzLjY3MiAyOC43MDY4IDMuNjg4QzI4Ljc4NjggMy43MDQgMjguODYyOCAzLjcyOCAyOC45MzQ4IDMuNzZDMjkuMDA2OCAzLjc4NCAyOS4wNjI4IDMuODE2IDI5LjEwMjggMy44NTZMMjguNjk0OCA2LjU4Wk0zNC4zOTI5IDEwVjkuNTU2QzM0LjMyMDkgOS42MjggMzQuMjIwOSA5LjY5NiAzNC4wOTI5IDkuNzZDMzMuOTY0OSA5LjgyNCAzMy44MjQ5IDkuODg0IDMzLjY3MjkgOS45NEMzMy41MjA5IDkuOTk2IDMzLjM2ODkgMTAuMDQgMzMuMjE2OSAxMC4wNzJDMzMuMDcyOSAxMC4xMDQgMzIuOTQ0OSAxMC4xMiAzMi44MzI5IDEwLjEyQzMyLjQyNDkgMTAuMTIgMzIuMDMyOSAxMC4wNTYgMzEuNjU2OSA5LjkyOEMzMS4yODA5IDkuNzkyIDMwLjk0ODkgOS41OTIgMzAuNjYwOSA5LjMyOEMzMC4zODA5IDkuMDU2IDMwLjE1NjkgOC43MjQgMjkuOTg4OSA4LjMzMkMyOS44MjA5IDcuOTMyIDI5LjczNjkgNy40NjggMjkuNzM2OSA2Ljk0QzI5LjczNjkgNi4zOCAyOS44MTY5IDUuODk2IDI5Ljk3NjkgNS40ODhDMzAuMTQ0OSA1LjA4IDMwLjM2ODkgNC43NCAzMC42NDg5IDQuNDY4QzMwLjkzNjkgNC4xOTYgMzEuMjcyOSAzLjk5NiAzMS42NTY5IDMuODY4QzMyLjA0MDkgMy43MzIgMzIuNDQ4OSAzLjY2NCAzMi44ODA5IDMuNjY0QzMyLjk2ODkgMy42NjQgMzMuMDgwOSAzLjY3NiAzMy4yMTY5IDMuN0MzMy4zNjA5IDMuNzE2IDMzLjUwNDkgMy43NDQgMzMuNjQ4OSAzLjc4NEMzMy43OTI5IDMuODE2IDMzLjkyODkgMy44NiAzNC4wNTY5IDMuOTE2QzM0LjE5MjkgMy45NzIgMzQuMjk2OSA0LjAzMiAzNC4zNjg5IDQuMDk2VjAuODU2SDM2LjcwODlWMTBIMzQuMzkyOVpNMzQuMzY4OSA2LjA2NEMzNC4zMDQ5IDYuMDE2IDM0LjIyNDkgNS45NzIgMzQuMTI4OSA1LjkzMkMzNC4wMzI5IDUuODkyIDMzLjkzMjkgNS44NiAzMy44Mjg5IDUuODM2QzMzLjcyNDkgNS44MDQgMzMuNjIwOSA1Ljc4IDMzLjUxNjkgNS43NjRDMzMuNDEyOSA1Ljc0OCAzMy4zMjA5IDUuNzQgMzMuMjQwOSA1Ljc0QzMzLjA4MDkgNS43NCAzMi45MjQ5IDUuNzY4IDMyLjc3MjkgNS44MjRDMzIuNjI4OSA1Ljg4IDMyLjUwMDkgNS45NiAzMi4zODg5IDYuMDY0QzMyLjI3NjkgNi4xNiAzMi4xODg5IDYuMjc2IDMyLjEyNDkgNi40MTJDMzIuMDYwOSA2LjU0OCAzMi4wMjg5IDYuNjkyIDMyLjAyODkgNi44NDRDMzIuMDI4OSA3LjAwNCAzMi4wNjA5IDcuMTUyIDMyLjEyNDkgNy4yODhDMzIuMTg4OSA3LjQyNCAzMi4yNzY5IDcuNTQ0IDMyLjM4ODkgNy42NDhDMzIuNTAwOSA3Ljc0NCAzMi42Mjg5IDcuODI0IDMyLjc3MjkgNy44ODhDMzIuOTI0OSA3Ljk0NCAzMy4wODA5IDcuOTcyIDMzLjI0MDkgNy45NzJDMzMuMzIwOSA3Ljk3MiAzMy40MTI5IDcuOTYgMzMuNTE2OSA3LjkzNkMzMy42MjA5IDcuOTEyIDMzLjcyNDkgNy44ODQgMzMuODI4OSA3Ljg1MkMzMy45MzI5IDcuODEyIDM0LjAzMjkgNy43NjggMzQuMTI4OSA3LjcyQzM0LjIyNDkgNy42NjQgMzQuMzA0OSA3LjYwOCAzNC4zNjg5IDcuNTUyVjYuMDY0WlwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIiAvPmA7XHJcbiAgc3ZnRWxtLnNldEF0dHJpYnV0ZShcInZpZXdCb3hcIiwgXCIwIDAgNTUgMTFcIik7XHJcbn0pKCk7IiwgImltcG9ydCB7IHdhaXRVbnRpbENvbm5lY3Rpb25PcGVuIH0gZnJvbSBcIi4vb3RoZXIvdXRpbHMuanNcIjtcclxuaW1wb3J0IGxvYWRpbmdBbmltYXRpb24gZnJvbSBcIi4vb3RoZXIvbG9hZGluZy1hbmltYXRpb25cIjtcclxuaW1wb3J0IGFwaSBmcm9tIFwiLi9hcGlcIjtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3csIFwiYWNvcmRcIiwge1xyXG4gIGdldCgpIHtcclxuICAgIHJldHVybiBhcGkuZXhwb3NlZEFQSTtcclxuICB9XHJcbn0pO1xyXG53aW5kb3cuZ2xvYmFsID0gd2luZG93O1xyXG5cclxuKGFzeW5jICgpID0+IHtcclxuICBsb2FkaW5nQW5pbWF0aW9uLnNob3coKTtcclxuICBhd2FpdCB3YWl0VW50aWxDb25uZWN0aW9uT3BlbigpO1xyXG4gIGxvYWRpbmdBbmltYXRpb24uaGlkZSgpO1xyXG59KSgpO1xyXG5cclxuLy8gZXh0cmFzXHJcbmltcG9ydCBcIi4vb3RoZXIvZG9jdW1lbnQtdGl0bGUtY2hhbmdlLmpzXCI7XHJcbmltcG9ydCBcIi4vb3RoZXIvd2Vic29ja2V0LXRyaWdnZXJzLmpzXCI7XHJcbmltcG9ydCBcIi4vdWkvaW5kZXguanNcIjsiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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QUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsVUFDQSxNQUFRO0FBQUEsWUFDTixRQUFVO0FBQUEsY0FDUjtBQUFBLGNBQ0E7QUFBQSxjQUNBO0FBQUEsY0FDQTtBQUFBLFlBQ0Y7QUFBQSxZQUNBLE9BQVM7QUFBQSxVQUNYO0FBQUEsVUFDQSxLQUFPO0FBQUEsWUFDTCxRQUFVO0FBQUEsY0FDUjtBQUFBLGNBQ0E7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxRQUNBLG1CQUFxQjtBQUFBLFVBQ25CLElBQU07QUFBQSxVQUNOLFFBQVU7QUFBQSxZQUNSLFFBQVU7QUFBQSxZQUNWLElBQU07QUFBQSxZQUNOLElBQU07QUFBQSxjQUNKO0FBQUEsZ0JBQ0U7QUFBQSxjQUNGO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxVQUNBLEtBQU87QUFBQSxZQUNMLG1CQUFxQjtBQUFBLGNBQ25CO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxVQUNBLE1BQVE7QUFBQSxZQUNOLFFBQVU7QUFBQSxjQUNSO0FBQUEsY0FDQTtBQUFBLGNBQ0E7QUFBQSxjQUNBO0FBQUEsWUFDRjtBQUFBLFlBQ0EsT0FBUztBQUFBLGNBQ1A7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxRQUNBLE1BQVE7QUFBQSxVQUNOLElBQU07QUFBQSxVQUNOLFFBQVU7QUFBQSxVQUNWLE1BQVE7QUFBQSxZQUNOLFFBQVU7QUFBQSxjQUNSO0FBQUEsY0FDQTtBQUFBLGNBQ0E7QUFBQSxjQUNBO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsUUFDQSxTQUFXO0FBQUEsVUFDVCxJQUFNO0FBQUEsVUFDTixRQUFVO0FBQUEsWUFDUixRQUFVO0FBQUEsWUFDVixJQUFNO0FBQUEsWUFDTixJQUFNO0FBQUEsY0FDSjtBQUFBLGdCQUNFO0FBQUEsY0FDRjtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsVUFDQSxNQUFRO0FBQUEsWUFDTixRQUFVO0FBQUEsY0FDUjtBQUFBLGNBQ0E7QUFBQSxjQUNBO0FBQUEsY0FDQTtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLFFBQ0EsVUFBWTtBQUFBLFVBQ1YsSUFBTTtBQUFBLFVBQ04sUUFBVTtBQUFBLFVBQ1YsTUFBUTtBQUFBLFlBQ04sT0FBUztBQUFBLGNBQ1A7QUFBQSxjQUNBO0FBQUEsY0FDQTtBQUFBLGNBQ0E7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsTUFDQSxnQkFBa0I7QUFBQSxRQUNoQixJQUFNO0FBQUEsUUFDTixNQUFRO0FBQUEsVUFDTixPQUFTO0FBQUEsWUFDUDtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsUUFDQSxRQUFVO0FBQUEsVUFDUixRQUFVO0FBQUEsVUFDVixJQUFNO0FBQUEsVUFDTixJQUFNO0FBQUEsWUFDSjtBQUFBLGNBQ0U7QUFBQSxjQUNBO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLE1BQ0EsT0FBUztBQUFBLFFBQ1AsSUFBTTtBQUFBLFFBQ04sTUFBUTtBQUFBLFVBQ04sT0FBUztBQUFBLFlBQ1A7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLFFBQ0EsUUFBVTtBQUFBLFVBQ1IsUUFBVTtBQUFBLFVBQ1YsSUFBTTtBQUFBLFVBQ04sSUFBTTtBQUFBLFlBQ0o7QUFBQSxjQUNFO0FBQUEsY0FDQTtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLE1BQVE7QUFBQSxRQUNOLElBQU07QUFBQSxRQUNOLE1BQVE7QUFBQSxVQUNOLE9BQVM7QUFBQSxZQUNQO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxRQUNBLFFBQVU7QUFBQSxVQUNSLFFBQVU7QUFBQSxVQUNWLElBQU07QUFBQSxVQUNOLElBQU07QUFBQSxZQUNKO0FBQUEsY0FDRTtBQUFBLGNBQ0E7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VUFBTSxhQUFhLFlBQUksTUFBTTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FRNUI7QUFHRCxVQUFNLFNBQVMsSUFBSSxVQUFVO0FBQUEsTUFDM0IsT0FBTztBQUNMLGVBQU87QUFBQSxVQUNMLGFBQWE7QUFBQSxRQUNmO0FBQUEsTUFDRjtBQUFBLE1BQ0EsVUFBVTtBQUNSLHlCQUFpQjtBQUFBLE1BQ25CO0FBQUEsSUFDRixDQUFDO0FBRUQsZUFBRyxJQUFJLFdBQVcsS0FBSyxNQUFNO0FBQzdCLElBQUFDLG9CQUFjLEtBQUssTUFBTTtBQUN6QixXQUFPLE1BQU0sVUFBVTtBQUV2QixnQkFBSSxNQUFNLHlRQUF5USxDQUFDLFFBQVE7QUFFMVIsVUFBSSxlQUFlLFlBQUksUUFBUSxLQUFLLENBQUMsRUFBRSxJQUFJO0FBQzNDLG1CQUFhLGdCQUFnQixVQUFVO0FBQUEsSUFDekMsQ0FBQztBQUFBLEVBQ0gsR0FBRzs7O0FDcEtILEdBQUMsWUFBWTtBQUVYLFFBQUk7QUFDSixXQUFPLE1BQU07QUFDWCxlQUFTLFNBQVMsY0FBYywwQkFBMEI7QUFDMUQsVUFBSTtBQUFRO0FBQ1osWUFBTSxJQUFJLFFBQVEsYUFBVyxXQUFXLFNBQVMsR0FBRyxDQUFDO0FBQUEsSUFDdkQ7QUFFQSxXQUFPLFlBQVk7QUFDbkIsV0FBTyxhQUFhLFdBQVcsV0FBVztBQUFBLEVBQzVDLEdBQUc7OztBQ1JILFNBQU8sZUFBZSxRQUFRLFNBQVM7QUFBQSxJQUNyQyxNQUFNO0FBQ0osYUFBTyxZQUFJO0FBQUEsSUFDYjtBQUFBLEVBQ0YsQ0FBQztBQUNELFNBQU8sU0FBUztBQUVoQixHQUFDLFlBQVk7QUFDWCw4QkFBaUIsS0FBSztBQUN0QixVQUFNLHdCQUF3QjtBQUM5Qiw4QkFBaUIsS0FBSztBQUFBLEVBQ3hCLEdBQUc7IiwKICAibmFtZXMiOiBbImV2ZW50IiwgIm1ha2UiLCAidGFyZ2V0IiwgInRyZWUiLCAic2VhcmNoRmlsdGVyIiwgIndhbGthYmxlIiwgImlnbm9yZSIsICJmb3VuZCIsICJjb21wb25lbnRzIiwgIl8iLCAiY2hlY2siLCAibW9kdWxlcyIsICJyZXF1aXJlIiwgImZvdW5kIiwgImZpbmRlciIsICJmb3VuZCIsICJyZXEiLCAiZmluZGVyIiwgIm5hbWUiLCAiY29tbW9uX2RlZmF1bHQiLCAiY29tbW9uX2RlZmF1bHQiLCAibm9TdG9yZSIsICJfIiwgIl8iLCAiXyIsICJ2YWwiLCAiZXJyb3IiLCAib3V0IiwgIl8iLCAiY2hlY2siLCAiQkFTRV9VUkwiLCAibmVzdHMiLCAiY29tbW9uX2RlZmF1bHQiLCAic2V0IiwgInNob3ciLCAiY29tbW9uX2RlZmF1bHQiLCAib3V0IiwgIl8iLCAiUmVhY3QiLCAiY29tbW9uX2RlZmF1bHQiLCAiY29tbW9uX2RlZmF1bHQiLCAiUmVhY3QiLCAiY29tbW9uX2RlZmF1bHQiLCAiaW50ZXJhY3RlZCIsICJnZXRDb250YWluZXIiLCAic2hvdyIsICJzdHlsZV9kZWZhdWx0IiwgInN0eWxlX2RlZmF1bHQiLCAic3R5bGVfZGVmYXVsdCIsICJzdHlsZV9kZWZhdWx0IiwgInN0eWxlX2RlZmF1bHQiLCAic3R5bGVfZGVmYXVsdCIsICJpbnB1dENsYXNzZXMiLCAiaW5wdXRDbGFzc2VzMiIsICJzY3JvbGxDbGFzc2VzIiwgImNvbXBvbmVudHNfZGVmYXVsdCIsICJuYW1lIiwgImNvbXBvbmVudHNfZGVmYXVsdCIsICJvdXQiLCAibmFtZSIsICJfIiwgInNvdXJjZSIsICJhcGkiLCAiZGF0YSIsICJzb3VyY2UiLCAib3V0IiwgImFwaSIsICJzdHlsZV9kZWZhdWx0IiwgInN0eWxlX2RlZmF1bHQiLCAic3R5bGVfZGVmYXVsdCIsICJzdHlsZV9kZWZhdWx0IiwgInN0eWxlX2RlZmF1bHQiLCAic3R5bGVfZGVmYXVsdCIsICJzdHlsZV9kZWZhdWx0IiwgInN0eWxlX2RlZmF1bHQiLCAic3R5bGVfZGVmYXVsdCIsICJjb21wb25lbnRzX2RlZmF1bHQiLCAiY29tcG9uZW50c19kZWZhdWx0IiwgInN0eWxlX2RlZmF1bHQiLCAiZWxtIiwgImNvbXBvbmVudHNfZGVmYXVsdCJdCn0K
