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
              before: [
                "exports.Z",
                "exports.ZP",
                "exports.default",
                "exports"
              ],
              after: [
                "Root"
              ]
            },
            map: {
              Root: [
                "ENTERING",
                "headerId"
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
  function checkModuleStrings(m, strings = [], hasNot) {
    const check2 = (s1, s2) => {
      return hasNot ? s1.toString().indexOf(s2.toString()) == -1 : s1.toString().indexOf(s2.toString()) > -1;
    };
    return strings.every((j) => {
      return check2(m?.toString?.() || "", j) || check2(m?.__original__?.toString?.() || "", j) || check2(m?.type?.toString?.() || "", j) || check2(m?.type?.__original__?.toString?.() || "", j) || Object.entries(["function", "object"].includes(typeof m?.prototype) ? typeof m?.prototype : {}).filter((i) => i[0]?.includes?.("render")).some((i) => check2(i[1]?.toString?.() || "", j));
    });
  }
  function checkModuleProps(m, properties = [], hasNot) {
    return properties.every((prop) => {
      const value = m[prop]?.__original__ || m[prop];
      return hasNot ? value === void 0 : value !== void 0 && !(typeof value == "string" && !value);
    });
  }
  function checkModulePrototypes(m, protoProps = [], hasNot) {
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
          if (parents.length >= config.deep && val.constructor.name !== "Array") {
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
        return out4.__cache__.localizations[i18n_default.locale]?.[key] || out4.__cache__.localizations.default?.[key] || key;
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
.acord--layer-container{--top-offset: 0px;width:100vw;height:calc(100vh - var(--top-offset));z-index:9999999;pointer-events:none;position:absolute;top:var(--top-offset);left:0px}.acord--layer-container *{z-index:99999999999999}.acord--tooltip-layer{opacity:0;transition:50ms linear opacity;position:absolute;pointer-events:none}.acord--tooltip-layer.visible{opacity:1;pointer-events:all}.acord--toasts-container{display:flex;align-items:center;justify-content:flex-end;flex-direction:column;width:100vw;height:calc(100vh - var(--top-offset));position:absolute;top:0;left:0;pointer-events:none;padding-bottom:32px}.acord--toasts-container .acord--toast{transition:transform 250ms ease-in-out,opacity 250ms ease-in-out;display:flex;align-items:center;pointer-events:none;border-radius:4px;padding:8px;box-shadow:0px 2px 8px rgba(0,0,0,.25);opacity:1;gap:8px;font-size:14px;margin:4px}.acord--toasts-container .acord--toast svg{width:16px;height:16px}.acord--toasts-container .acord--toast.clickable{cursor:pointer;pointer-events:all}.acord--toasts-container .acord--toast.closing{opacity:0;transform:translate(0, -50px)}.acord--toasts-container .acord--toast.hidden{opacity:0;transform:translate(0, 50px)}.acord--toasts-container .acord--toast.style-info{background-color:#4a8fe1;color:#f5f5f5}.acord--toasts-container .acord--toast.style-warning{background-color:#faa81a;color:#000}.acord--toasts-container .acord--toast.style-error{background-color:#ed4245;color:#000}.acord--toasts-container .acord--toast.style-success{background-color:#3ba55d;color:#f5f5f5}.acord--toasts-container .acord--toast.style-default{background-color:#f5f5f5;color:#000}.acord--notification-layer{width:100vw;height:calc(100vh - var(--top-offset));display:flex;position:absolute;top:0;left:0;pointer-events:none}.acord--notification-layer .acord--notification{display:flex;flex-direction:column;pointer-events:all;transition:transform 250ms ease-in-out,opacity 250ms ease-in-out;margin:4px;backdrop-filter:blur(16px) brightness(0.75);-webkit-app-region:no-drag;--animation-size: 50px}.acord--notification-layer .acord--notification.hidden,.acord--notification-layer .acord--notification.closing{opacity:0}.acord--notification-layer .acord--notification>.container{display:flex;align-items:center;justify-content:space-between;padding:8px;color:#fff;min-width:250px}.acord--notification-layer .acord--notification>.container>.close{width:24px;height:24px;color:#fff;opacity:.5;cursor:pointer;margin-left:8px;z-index:999999999}.acord--notification-layer .acord--notification>.container>.close.hidden{display:none}.acord--notification-layer .acord--notification>.progress-container{width:100%;height:5px}.acord--notification-layer .acord--notification>.progress-container>.progress{width:0%;height:5px;transition:width var(--duration) linear;background-color:var(--bar-color)}.acord--notification-layer .acord--notification>.progress-container>.progress.progressing{width:100%}.acord--notification-layer .acord--notification.style-info{--bar-color: #4a8fe1}.acord--notification-layer .acord--notification.style-warning{--bar-color: #faa81a}.acord--notification-layer .acord--notification.style-error{--bar-color: #ed4245}.acord--notification-layer .acord--notification.style-success{--bar-color: #3ba55d}.acord--notification-layer .acord--notification.style-default{--bar-color: whitesmoke}.acord--notification-layer.top-right{justify-content:flex-end;align-items:flex-start}.acord--notification-layer.top-right .acord--notification.hidden{transform:translate(0, calc(var(--animation-size) * -1))}.acord--notification-layer.top-right .acord--notification.closing{transform:translate(0, var(--animation-size))}.acord--notification-layer.top-left{justify-content:flex-start;align-items:flex-start}.acord--notification-layer.top-left .acord--notification.hidden{transform:translate(0, calc(var(--animation-size) * -1))}.acord--notification-layer.top-left .acord--notification.closing{transform:translate(0, var(--animation-size))}.acord--notification-layer.bottom-right{justify-content:flex-end;align-items:flex-end}.acord--notification-layer.bottom-right .acord--notification.hidden{transform:translate(0, var(--animation-size))}.acord--notification-layer.bottom-right .acord--notification.closing{transform:translate(0, calc(var(--animation-size) * -1))}.acord--notification-layer.bottom-left{justify-content:flex-start;align-items:flex-end}.acord--notification-layer.bottom-left .acord--notification.hidden{transform:translate(0, var(--animation-size))}.acord--notification-layer.bottom-left .acord--notification.closing{transform:translate(0, calc(var(--animation-size) * -1))}.acord--notification-layer.top-center{justify-content:center;align-items:flex-start}.acord--notification-layer.top-center .acord--notification.hidden{transform:translate(0, calc(var(--animation-size) * -1))}.acord--notification-layer.top-center .acord--notification.closing{transform:translate(0, var(--animation-size))}.acord--notification-layer.bottom-center{justify-content:center;align-items:flex-end}.acord--notification-layer.bottom-center .acord--notification.hidden{transform:translate(0, var(--animation-size))}.acord--notification-layer.bottom-center .acord--notification.closing{transform:translate(0, calc(var(--animation-size) * -1))}.acord--notification-layer.center{justify-content:center;align-items:center}.acord--notification-layer.center .acord--notification.hidden{transform:scale(0.5)}.acord--notification-layer.center .acord--notification.closing{transform:scale(0.5)}.acord--notification-layer.left-center{justify-content:flex-start;align-items:center}.acord--notification-layer.left-center .acord--notification.hidden{transform:translate(calc(var(--animation-size) * -1), 0)}.acord--notification-layer.left-center .acord--notification.closing{transform:translate(var(--animation-size), 0)}.acord--notification-layer.right-center{justify-content:flex-end;align-items:center}.acord--notification-layer.right-center .acord--notification.hidden{transform:translate(var(--animation-size), 0)}.acord--notification-layer.right-center .acord--notification.closing{transform:translate(calc(var(--animation-size) * -1), 0)}`;

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
      return container;
    }
    show() {
      if (this.visible)
        return;
      this.visible = true;
      const container = Tooltip.getContainer();
      container.appendChild(this.layerElement);
      if (!this.position || this.position === "auto") {
        this.calculatePosition(
          this.canShowAtTop ? "top" : this.canShowAtBottom ? "bottom" : this.canShowAtLeft ? "left" : this.canShowAtRight ? "right" : "top"
        );
      } else {
        this.calculatePosition(this.position);
      }
      this.layerElement.classList.add("visible");
    }
    calculatePosition(position) {
      const targetRect = this.target.getBoundingClientRect();
      this.layerElement.classList.remove(...Object.values(tooltipPositions));
      this.tooltipElement.classList.remove("vertical", "horizontal");
      switch (position) {
        case "top": {
          this.layerElement.classList.add(tooltipPositions.top);
          this.layerElement.style.setProperty("left", `${targetRect.left}px`);
          this.layerElement.style.setProperty("top", `${targetRect.top - this.layerElement.offsetHeight - 10}px`);
          this.centerPosition("horizontal");
          break;
        }
        case "bottom": {
          this.layerElement.classList.add(tooltipPositions.bottom);
          this.layerElement.style.setProperty("left", `${targetRect.left}px`);
          this.layerElement.style.setProperty("top", `${targetRect.top + this.layerElement.offsetHeight + 10}px`);
          this.centerPosition("horizontal");
          break;
        }
        case "left": {
          this.layerElement.classList.add(tooltipPositions.left);
          this.layerElement.style.setProperty("top", `${targetRect.top}px`);
          this.layerElement.style.setProperty("left", `${targetRect.left - this.layerElement.offsetWidth - 10}px`);
          this.centerPosition("vertical");
          break;
        }
        case "right": {
          this.layerElement.classList.add(tooltipPositions.right);
          this.layerElement.style.setProperty("top", `${targetRect.top}px`);
          this.layerElement.style.setProperty("left", `${targetRect.left + this.layerElement.offsetWidth + 10}px`);
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

  // src/api/shared/index.js
  var shared = {};
  var shared_default = shared;

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
            let data = manifest?.api?.modules?.custom?.find?.((i) => i.name === prop);
            if (!data?.finder)
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
      shared: shared_default,
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
      let manifest = JSON.parse(await metaResp.text());
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
      let manifest = JSON.parse(await metaResp.text());
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
      } catch (err) {
        logger_default.error(err);
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
        try {
          if (d.config.enabled)
            await out2.load(url);
        } catch (e) {
          logger_default.error("Unable to load extension", url, e);
        }
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
          findInTree(data.manifest?.config ?? [], (i) => i.id, { all: true }).forEach(
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
          findInTree(data.manifest?.config ?? [], (i) => i.id, { all: true }).forEach(
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
      shared: shared_default,
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
      shared: shared_default,
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibm9kZV9tb2R1bGVzL25lc3RzL2Nqcy9FdmVudHMuanMiLCAibm9kZV9tb2R1bGVzL25lc3RzL2Nqcy9FdmVudEVtaXR0ZXIuanMiLCAibm9kZV9tb2R1bGVzL25lc3RzL2Nqcy9tYWtlLmpzIiwgIm5vZGVfbW9kdWxlcy9uZXN0cy9janMvaW5kZXguanMiLCAic3JjL2RhdGEvY29tbW9uLmpzb24iLCAic3JjL2FwaS91dGlscy9yYXcvZmluZC1pbi10cmVlLmpzIiwgInNyYy9hcGkvdXRpbHMvbG9nZ2VyLmpzIiwgInNyYy9hcGkvdXRpbHMvcmVhY3QuanMiLCAic3JjL2FwaS91dGlscy9pbmRleC5qcyIsICJzcmMvYXBpL21vZHVsZXMvcmF3L2NvbXBsZXgtZmluZGVyLmpzIiwgInNyYy9hcGkvbW9kdWxlcy93ZWJwYWNrLmpzIiwgInNyYy9hcGkvbW9kdWxlcy9jb21tb24uanMiLCAic3JjL2FwaS9tb2R1bGVzL2luZGV4LmpzIiwgInNyYy9hcGkvaTE4bi9pbmRleC5qcyIsICJzcmMvb3RoZXIvdXRpbHMuanMiLCAic3JjL2xpYi9CYXNpY0V2ZW50RW1pdHRlci5qcyIsICJzcmMvYXBpL2V2ZW50cy9pbmRleC5qcyIsICJzcmMvYXBpL2RvbS9pbmRleC5qcyIsICJzcmMvbGliL3NwaXRyb2FzdC9kaXN0L2VzbS9zaGFyZWQuanMiLCAic3JjL2xpYi9zcGl0cm9hc3QvZGlzdC9lc20vaG9vay5qcyIsICJzcmMvbGliL3NwaXRyb2FzdC9kaXN0L2VzbS91bi1wYXRjaC5qcyIsICJzcmMvbGliL3NwaXRyb2FzdC9kaXN0L2VzbS9nZXQtcGF0Y2gtZnVuYy5qcyIsICJzcmMvbGliL3NwaXRyb2FzdC9kaXN0L2VzbS9pbmRleC5qcyIsICJzcmMvYXBpL3BhdGNoZXIvaW5kZXguanMiLCAic3JjL290aGVyL2xvYWRpbmctYW5pbWF0aW9uL3N0eWxlLnNjc3MiLCAic3JjL290aGVyL2xvYWRpbmctYW5pbWF0aW9uL2luZGV4LmpzIiwgInNyYy9hcGkvc3RvcmFnZS9pbmRleC5qcyIsICJub2RlX21vZHVsZXMvaWRiLWtleXZhbC9kaXN0L2luZGV4LmpzIiwgInNyYy9saWIvanNvbi1kZWN5Y2xlZC9pbmRleC5qcyIsICJzcmMvYXBpL2V4dGVuc2lvbnMvaTE4bi5qcyIsICJzcmMvYXBpL2V4dGVuc2lvbnMvaW5kZXguanMiLCAic3JjL2FwaS93ZWJzb2NrZXQvaW5kZXguanMiLCAic3JjL2FwaS91aS9zdHlsZXMuc2NzcyIsICJzcmMvYXBpL3VpL3Rvb2x0aXBzLmpzIiwgInNyYy9hcGkvdWkvbm90aWZpY2F0aW9ucy5qcyIsICJzcmMvYXBpL3VpL2NvbnRleHRNZW51cy5qcyIsICJzcmMvbGliL2NvbXBvbmVudHMvRXJyb3JCb3VuZGFyeS5qc3giLCAic3JjL2FwaS91aS9jb21wb25lbnRzLmpzIiwgInNyYy9hcGkvdWkvbW9kYWxzLmpzeCIsICJzcmMvYXBpL3VpL3RvYXN0cy5qcyIsICJzcmMvYXBpL3VpL3Z1ZS9jb21wb25lbnRzL2Rpc2NvcmQtYnV0dG9uL2luZGV4LmpzIiwgInNyYy9hcGkvdWkvdnVlL2NvbXBvbmVudHMvZGlzY29yZC1jaGVjay9zdHlsZS5zY3NzIiwgInNyYy9hcGkvdWkvdnVlL2NvbXBvbmVudHMvZGlzY29yZC1jaGVjay9pbmRleC5qcyIsICJzcmMvYXBpL3VpL3Z1ZS9jb21wb25lbnRzL2Rpc2NvcmQtaW5wdXQvaW5kZXguanMiLCAic3JjL2FwaS91aS92dWUvY29tcG9uZW50cy9kaXNjb3JkLXNlbGVjdC9zdHlsZS5zY3NzIiwgInNyYy9hcGkvdWkvdnVlL2NvbXBvbmVudHMvZGlzY29yZC1zZWxlY3QvaW5kZXguanMiLCAic3JjL2FwaS91aS92dWUvY29tcG9uZW50cy9kaXNjb3JkLXRleHRhcmVhL3N0eWxlLnNjc3MiLCAic3JjL2FwaS91aS92dWUvY29tcG9uZW50cy9kaXNjb3JkLXRleHRhcmVhL2luZGV4LmpzIiwgInNyYy9hcGkvdWkvdnVlL2NvbXBvbmVudHMvaW5kZXguanMiLCAic3JjL2FwaS91aS92dWUvdXRpbHMvcmVjb21wdXRlLmpzIiwgInNyYy9hcGkvdWkvdnVlL2luZGV4LmpzIiwgInNyYy9hcGkvdWkvaW5kZXguanMiLCAic3JjL2FwaS9zaGFyZWQvaW5kZXguanMiLCAic3JjL2FwaS9kZXYvaW5kZXguanMiLCAic3JjL2FwaS9pbnRlcm5hbC9pbmRleC5qcyIsICJzcmMvYXBpL2luZGV4LmpzIiwgInNyYy9vdGhlci9kb2N1bWVudC10aXRsZS1jaGFuZ2UuanMiLCAic3JjL290aGVyL3dlYnNvY2tldC10cmlnZ2Vycy5qcyIsICJzcmMvdWkvaG9tZS9zdHlsZS5zY3NzIiwgInNyYy91aS9ob21lL3Z1ZS9jb21wb25lbnRzL3BhZ2VzL2hvbWUtcGFnZS9pbmRleC5qcyIsICJzcmMvdWkvaG9tZS92dWUvY29tcG9uZW50cy9wYWdlcy9pbnN0YWxsZWQtZXh0ZW5zaW9ucy1wYWdlL3N0eWxlLnNjc3MiLCAic3JjL3VpL2hvbWUvdnVlL2NvbXBvbmVudHMvcGFnZXMvaW5zdGFsbGVkLWV4dGVuc2lvbnMtcGFnZS9pbmRleC5qcyIsICJzcmMvdWkvaG9tZS92dWUvY29tcG9uZW50cy9wYWdlcy9zZXR0aW5ncy1wYWdlL2luZGV4LmpzIiwgInNyYy91aS9ob21lL3Z1ZS9jb21wb25lbnRzL3BhZ2VzL3N0b3JlLXBhZ2UvaW5kZXguanMiLCAic3JjL3VpL2hvbWUvdnVlL2NvbXBvbmVudHMvcGFnZXMvaW5kZXguanMiLCAic3JjL3VpL2hvbWUvdnVlL2NvbXBvbmVudHMvY29tcG9uZW50cy9jb25maWcvY29uZmlnLWJ1dHRvbi9pbmRleC5qcyIsICJzcmMvdWkvaG9tZS92dWUvY29tcG9uZW50cy9jb21wb25lbnRzL2NvbmZpZy9jb25maWctY2hlY2svaW5kZXguanMiLCAic3JjL3VpL2hvbWUvdnVlL2NvbXBvbmVudHMvY29tcG9uZW50cy9jb25maWcvbWFwcy5qc29uIiwgInNyYy91aS9ob21lL3Z1ZS9jb21wb25lbnRzL2NvbXBvbmVudHMvY29uZmlnL2NvbmZpZy1jb2x1bW4vaW5kZXguanMiLCAic3JjL3VpL2hvbWUvdnVlL2NvbXBvbmVudHMvY29tcG9uZW50cy9jb25maWcvY29uZmlnLWhlYWRpbmcvaW5kZXguanMiLCAic3JjL3VpL2hvbWUvdnVlL2NvbXBvbmVudHMvY29tcG9uZW50cy9jb25maWcvY29uZmlnLWlucHV0L2luZGV4LmpzIiwgInNyYy91aS9ob21lL3Z1ZS9jb21wb25lbnRzL2NvbXBvbmVudHMvY29uZmlnL2NvbmZpZy1wYXJhZ3JhcGgvaW5kZXguanMiLCAic3JjL3VpL2hvbWUvdnVlL2NvbXBvbmVudHMvY29tcG9uZW50cy9jb25maWcvY29uZmlnLXJvdy9pbmRleC5qcyIsICJzcmMvdWkvaG9tZS92dWUvY29tcG9uZW50cy9jb21wb25lbnRzL2NvbmZpZy9jb25maWctc2VsZWN0L2luZGV4LmpzIiwgInNyYy91aS9ob21lL3Z1ZS9jb21wb25lbnRzL2NvbXBvbmVudHMvY29uZmlnL2NvbmZpZy1zcGFjZXIvaW5kZXguanMiLCAic3JjL3VpL2hvbWUvdnVlL2NvbXBvbmVudHMvY29tcG9uZW50cy9jb25maWcvY29uZmlnLXRleHRhcmVhL2luZGV4LmpzIiwgInNyYy91aS9ob21lL3Z1ZS9jb21wb25lbnRzL2NvbXBvbmVudHMvY29uZmlnL3N0eWxlLnNjc3MiLCAic3JjL3VpL2hvbWUvdnVlL2NvbXBvbmVudHMvY29tcG9uZW50cy9jb25maWcvaW5kZXguanMiLCAic3JjL3VpL2hvbWUvdnVlL2NvbXBvbmVudHMvY29tcG9uZW50cy9jYXJkcy9pbnN0YWxsZWQtZXh0ZW5zaW9uLWNhcmQvc3R5bGUuc2NzcyIsICJzcmMvdWkvaG9tZS92dWUvY29tcG9uZW50cy9jb21wb25lbnRzL2NhcmRzL2luc3RhbGxlZC1leHRlbnNpb24tY2FyZC9pbmRleC5qcyIsICJzcmMvdWkvaG9tZS92dWUvY29tcG9uZW50cy9jb21wb25lbnRzL2NhcmRzL3N0b3JlLWV4dGVuc2lvbi1jYXJkL3N0eWxlLnNjc3MiLCAic3JjL3VpL2hvbWUvdnVlL2NvbXBvbmVudHMvY29tcG9uZW50cy9jYXJkcy9zdG9yZS1leHRlbnNpb24tY2FyZC9pbmRleC5qcyIsICJzcmMvdWkvaG9tZS92dWUvY29tcG9uZW50cy9jb21wb25lbnRzL2NhcmRzL2luZGV4LmpzIiwgInNyYy91aS9ob21lL3Z1ZS9jb21wb25lbnRzL2NvbXBvbmVudHMvaW5kZXguanMiLCAic3JjL3VpL2hvbWUvdnVlL2NvbXBvbmVudHMvaW5kZXguanMiLCAic3JjL3VpL2hvbWUvaW5kZXguanMiLCAic3JjL3VpL290aGVyL2luZGV4LmpzIiwgInNyYy9pbmRleC5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5kZWZhdWx0ID0gT2JqZWN0LmZyZWV6ZSh7XHJcbiAgICBHRVQ6IFwiR0VUXCIsXHJcbiAgICBTRVQ6IFwiU0VUXCIsXHJcbiAgICBERUxFVEU6IFwiREVMRVRFXCIsXHJcbiAgICBVUERBVEU6IFwiVVBEQVRFXCIsXHJcbn0pO1xyXG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgRXZlbnRzXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vRXZlbnRzXCIpKTtcclxuY2xhc3MgRXZlbnRFbWl0dGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMubGlzdGVuZXJzID0gT2JqZWN0LnZhbHVlcyhFdmVudHNfMS5kZWZhdWx0KS5yZWR1Y2UoKGFjYywgdmFsKSA9PiAoKGFjY1t2YWxdID0gbmV3IFNldCgpKSwgYWNjKSwge30pO1xyXG4gICAgICAgIHRoaXMub24gPSBmdW5jdGlvbiAoZXZlbnQsIGxpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxpc3RlbmVyc1tldmVudF0uaGFzKGxpc3RlbmVyKSkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoYFRoaXMgbGlzdGVuZXIgb24gJHtldmVudH0gYWxyZWFkeSBleGlzdHMuYCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5saXN0ZW5lcnNbZXZlbnRdLmFkZChsaXN0ZW5lcik7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLm9uY2UgPSBmdW5jdGlvbiAoZXZlbnQsIGxpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG9uY2VMaXN0ZW5lciA9IChldmVudCwgZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vZmYoZXZlbnQsIG9uY2VMaXN0ZW5lcik7XHJcbiAgICAgICAgICAgICAgICBsaXN0ZW5lcihldmVudCwgZGF0YSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMub24oZXZlbnQsIG9uY2VMaXN0ZW5lcik7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLm9mZiA9IGZ1bmN0aW9uIChldmVudCwgbGlzdGVuZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5saXN0ZW5lcnNbZXZlbnRdLmRlbGV0ZShsaXN0ZW5lcik7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmVtaXQgPSBmdW5jdGlvbiAoZXZlbnQsIGRhdGEpIHtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBsaXN0ZW5lciBvZiB0aGlzLmxpc3RlbmVyc1tldmVudF0pIHtcclxuICAgICAgICAgICAgICAgIGxpc3RlbmVyKGV2ZW50LCBkYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgZm9yIChjb25zdCBldmVudCBvZiBPYmplY3QudmFsdWVzKEV2ZW50c18xLmRlZmF1bHQpKSB7XHJcbiAgICAgICAgICAgIHRoaXNbZXZlbnQudG9Mb3dlckNhc2UoKV0gPSAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KGV2ZW50LCBkYXRhKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5kZWZhdWx0ID0gRXZlbnRFbWl0dGVyO1xyXG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgRXZlbnRFbWl0dGVyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vRXZlbnRFbWl0dGVyXCIpKTtcclxuZnVuY3Rpb24gbWFrZShcclxuLy8gVGhpcyBjYW4gYmUgc2FmZWx5IGlnbm9yZWQsIHRoZSBEYXRhIHdpbGwgYWx3YXlzIGJlIGFuIG9iamVjdCBvciBpdCB3b24ndCB3b3JrIGFueXdheS5cclxuLy8gQHRzLWlnbm9yZVxyXG5kYXRhID0ge30sIHsgbmVzdEFycmF5cyA9IHRydWUsIH0gPSB7fSkge1xyXG4gICAgY29uc3QgZW1pdHRlciA9IG5ldyBFdmVudEVtaXR0ZXJfMS5kZWZhdWx0KCk7XHJcbiAgICBmdW5jdGlvbiBjcmVhdGVQcm94eSh0YXJnZXQsIHJvb3QsIHBhdGgpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb3h5KHRhcmdldCwge1xyXG4gICAgICAgICAgICBnZXQodGFyZ2V0LCBwcm9wZXJ0eSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbmV3UGF0aCA9IFsuLi5wYXRoLCBwcm9wZXJ0eV07XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHRhcmdldFtwcm9wZXJ0eV07XHJcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVtaXR0ZXIuZ2V0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogbmV3UGF0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUsXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFuZXN0QXJyYXlzICYmIEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY3JlYXRlUHJveHkodmFsdWUsIHJvb3QsIG5ld1BhdGgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY3JlYXRlUHJveHkoKHRhcmdldFtwcm9wZXJ0eV0gPSB7fSksIHJvb3QsIG5ld1BhdGgpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQodGFyZ2V0LCBwcm9wZXJ0eSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHRhcmdldFtwcm9wZXJ0eV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIGVtaXR0ZXIuc2V0KHtcclxuICAgICAgICAgICAgICAgICAgICBwYXRoOiBbLi4ucGF0aCwgcHJvcGVydHldLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvLyBUaGlzIG5lZWRzIHRvIHJldHVybiB0cnVlIG9yIGl0IGVycm9ycy4gL3NocnVnXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGVsZXRlUHJvcGVydHkodGFyZ2V0LCBwcm9wZXJ0eSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRlbGV0ZSB0YXJnZXRbcHJvcGVydHldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZW1pdHRlci5kZWxldGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRoOiBbLi4ucGF0aCwgcHJvcGVydHldLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBoYXModGFyZ2V0LCBwcm9wZXJ0eSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0YXJnZXRbcHJvcGVydHldID09PSBcIm9iamVjdFwiICYmXHJcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmtleXModGFyZ2V0W3Byb3BlcnR5XSkubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb3BlcnR5IGluIHRhcmdldDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHsgc3RvcmU6IGNyZWF0ZVByb3h5KGRhdGEsIGRhdGEsIFtdKSwgXHJcbiAgICAgICAgLy8gVGhpcyBjYW4gYmUgc2FmZWx5IGlnbm9yZWQsIHRoZSBEYXRhIHdpbGwgYWx3YXlzIGJlIGFuIG9iamVjdCBvciBpdCB3b24ndCB3b3JrIGFueXdheS5cclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgZ2hvc3Q6IGRhdGEgfSwgZW1pdHRlcik7XHJcbn1cclxuZXhwb3J0cy5kZWZhdWx0ID0gbWFrZTtcclxuIiwgIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMubWFrZSA9IGV4cG9ydHMuRXZlbnRzID0gdm9pZCAwO1xyXG52YXIgRXZlbnRzXzEgPSByZXF1aXJlKFwiLi9FdmVudHNcIik7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkV2ZW50c1wiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gX19pbXBvcnREZWZhdWx0KEV2ZW50c18xKS5kZWZhdWx0OyB9IH0pO1xyXG52YXIgbWFrZV8xID0gcmVxdWlyZShcIi4vbWFrZVwiKTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwibWFrZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gX19pbXBvcnREZWZhdWx0KG1ha2VfMSkuZGVmYXVsdDsgfSB9KTtcclxuIiwgIntcclxuICBcImNvbW1vblwiOiB7XHJcbiAgICBcIm1vZGFsc1wiOiB7XHJcbiAgICAgIFwiY29tcG9uZW50c1wiOiB7XHJcbiAgICAgICAgXCJvdGhlclwiOiB7XHJcbiAgICAgICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICBcIkhlYWRlclwiLFxyXG4gICAgICAgICAgICAgICAgXCJGb290ZXJcIlxyXG4gICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIlJvb3RcIjoge1xyXG4gICAgICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICAgICAgXCJpblwiOiBcInN0cmluZ3NcIixcclxuICAgICAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgXCJFTlRFUklOR1wiLFxyXG4gICAgICAgICAgICAgICAgXCJoZWFkZXJJZFwiXHJcbiAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICAgICAgXCJiZWZvcmVcIjogW1xyXG4gICAgICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgICAgICBcIlJvb3RcIlxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgXCJtYXBcIjoge1xyXG4gICAgICAgICAgICBcIlJvb3RcIjogW1xyXG4gICAgICAgICAgICAgIFwiRU5URVJJTkdcIixcclxuICAgICAgICAgICAgICBcImhlYWRlcklkXCJcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgXCJhY3Rpb25zXCI6IHtcclxuICAgICAgICBcIm9wZW5cIjoge1xyXG4gICAgICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICAgICAgXCJpblwiOiBcInN0cmluZ3NcIixcclxuICAgICAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgXCJvbkNsb3NlQ2FsbGJhY2tcIixcclxuICAgICAgICAgICAgICAgIFwiTGF5ZXJcIlxyXG4gICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgICAgIFwiYmVmb3JlXCI6IFtcclxuICAgICAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICAgICAgXCJvcGVuXCJcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIFwibWFwXCI6IHtcclxuICAgICAgICAgICAgXCJvcGVuXCI6IFtcclxuICAgICAgICAgICAgICBcIm9uQ2xvc2VDYWxsYmFja1wiLFxyXG4gICAgICAgICAgICAgIFwiTGF5ZXJcIlxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImNsb3NlXCI6IHtcclxuICAgICAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgICAgIFwiaW5cIjogXCJzdHJpbmdzXCIsXHJcbiAgICAgICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgIFwib25DbG9zZUNhbGxiYWNrKClcIlxyXG4gICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgICAgIFwiYmVmb3JlXCI6IFtcclxuICAgICAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICAgICAgXCJjbG9zZVwiXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBcIm1hcFwiOiB7XHJcbiAgICAgICAgICAgIFwiY2xvc2VcIjogW1xyXG4gICAgICAgICAgICAgIFwib25DbG9zZUNhbGxiYWNrKClcIlxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJjb21wb25lbnRzXCI6IHtcclxuICAgICAgXCJCdXR0b25cIjoge1xyXG4gICAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgIFwiQm9yZGVyQ29sb3JzXCJcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICAgIFwiYmVmb3JlXCI6IFtcclxuICAgICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgICBdLFxyXG4gICAgICAgICAgXCJhZnRlclwiOiBcIkJ1dHRvblwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIm1hcFwiOiB7XHJcbiAgICAgICAgICBcIkJ1dHRvblwiOiBbXHJcbiAgICAgICAgICAgIFwiLkZJTExFRFwiLFxyXG4gICAgICAgICAgICBcIi5vbk1vdXNlTGVhdmVcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgXCJDb25maXJtYXRpb25Nb2RhbFwiOiB7XHJcbiAgICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgICAgXCJpblwiOiBcInN0cmluZ3NcIixcclxuICAgICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgXCIuY29uZmlybUJ1dHRvbkNvbG9yXCJcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJtYXBcIjoge1xyXG4gICAgICAgICAgXCJDb25maXJtYXRpb25Nb2RhbFwiOiBbXHJcbiAgICAgICAgICAgIFwiLmNvbmZpcm1CdXR0b25Db2xvclwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgICAgXCJiZWZvcmVcIjogW1xyXG4gICAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICAgIF0sXHJcbiAgICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgICAgXCJDb25maXJtYXRpb25Nb2RhbFwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBcIlRleHRcIjoge1xyXG4gICAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgICBcImZpbHRlclwiOiBcIiQ/LlNpemVzPy5TSVpFXzMyICYmICQuQ29sb3JzXCIsXHJcbiAgICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICAgIFwiYmVmb3JlXCI6IFtcclxuICAgICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBcIlRvb2x0aXBcIjoge1xyXG4gICAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICAgIFwiaW5cIjogXCJwcm90b3R5cGVzXCIsXHJcbiAgICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgIFwicmVuZGVyVG9vbHRpcFwiXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgICBcImJlZm9yZVwiOiBbXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgXCJNYXJrZG93blwiOiB7XHJcbiAgICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICAgIFwiZmlsdGVyXCI6IFwiJD8ucHJvdG90eXBlPy5yZW5kZXIgJiYgJC5ydWxlc1wiLFxyXG4gICAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJGbHV4RGlzcGF0Y2hlclwiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwiX2N1cnJlbnREaXNwYXRjaEFjdGlvblR5cGVcIixcclxuICAgICAgICAgICAgXCJkaXNwYXRjaFwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJSZWFjdFwiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwiY3JlYXRlRWxlbWVudFwiLFxyXG4gICAgICAgICAgICBcInVzZVN0YXRlXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIlJlc3RcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcImdldFwiLFxyXG4gICAgICAgICAgICBcInBvc3RcIixcclxuICAgICAgICAgICAgXCJnZXRBUElCYXNlVVJMXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIlJvdXRlclwiOiB7XHJcbiAgICAgIFwidHJhbnNpdGlvblRvXCI6IHtcclxuICAgICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgICBcImluXCI6IFwic3RyaW5nc1wiLFxyXG4gICAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICBcInRyYW5zaXRpb25UbyAtIFRyYW5zaXRpb25pbmcgdG8gXCJcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICAgIFwiYmVmb3JlXCI6IFtcclxuICAgICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgICBdLFxyXG4gICAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICAgIFwidHJhbnNpdGlvblRvXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwibWFwXCI6IHtcclxuICAgICAgICAgIFwidHJhbnNpdGlvblRvXCI6IFtcclxuICAgICAgICAgICAgXCJ0cmFuc2l0aW9uVG8gLSBUcmFuc2l0aW9uaW5nIHRvIFwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBcInJlcGxhY2VXaXRoXCI6IHtcclxuICAgICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgICBcImluXCI6IFwic3RyaW5nc1wiLFxyXG4gICAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICBcIlxcXCJSZXBsYWNpbmcgcm91dGUgd2l0aCBcXFwiXCJcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICAgIFwiYmVmb3JlXCI6IFtcclxuICAgICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgICBdLFxyXG4gICAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICAgIFwicmVwbGFjZVdpdGhcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJtYXBcIjoge1xyXG4gICAgICAgICAgXCJyZXBsYWNlV2l0aFwiOiBbXHJcbiAgICAgICAgICAgIFwiXFxcIlJlcGxhY2luZyByb3V0ZSB3aXRoIFxcXCJcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiRmx1eFwiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwiY29ubmVjdFN0b3Jlc1wiLFxyXG4gICAgICAgICAgICBcImRlc3Ryb3lcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiV2ViU29ja2V0XCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiBcIiQ/Ll9fcHJvdG9fXz8uaGFuZGxlQ29ubmVjdGlvblwiLFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYmVmb3JlXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiQWN0aXZpdHlBY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJzZW5kQWN0aXZpdHlJbnZpdGVcIixcclxuICAgICAgICAgICAgXCJ1cGRhdGVBY3Rpdml0eVwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJQcml2YXRlQ2hhbm5lbEFjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcIm9wZW5Qcml2YXRlQ2hhbm5lbFwiLFxyXG4gICAgICAgICAgICBcImVuc3VyZVByaXZhdGVDaGFubmVsXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIkFja0FjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImluXCI6IFwic3RyaW5nc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcInR5cGU6XFxcIkJVTEtfQUNLXFxcIlwiXHJcbiAgICAgICAgICBdLFxyXG4gICAgICAgICAgW11cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogdHJ1ZSxcclxuICAgICAgICBcImJlZm9yZVwiOiBcImV4cG9ydHNcIlxyXG4gICAgICB9LFxyXG4gICAgICBcIm1hcFwiOiB7XHJcbiAgICAgICAgXCJhY2tcIjogW1xyXG4gICAgICAgICAgXCJ0eXBlOlxcXCJDSEFOTkVMX0FDS1xcXCJcIixcclxuICAgICAgICAgIFwibWVzc2FnZUlkXCIsXHJcbiAgICAgICAgICBcImNoYW5uZWxJZFwiXHJcbiAgICAgICAgXSxcclxuICAgICAgICBcImJ1bGtBY2tcIjogW1xyXG4gICAgICAgICAgXCJ0eXBlOlxcXCJCVUxLX0FDS1xcXCJcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiQW5hbHl0aWNzQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwiaXNUaHJvdHRsZWRcIixcclxuICAgICAgICAgICAgXCJ0cmFja1wiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJBbmltYXRpb25BY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwic3ByaW5nXCIsXHJcbiAgICAgICAgICAgIFwiZGVjYXlcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiQ29ubmVjdGlvbkFjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcInNldFNob3dBY3Rpdml0eVwiLFxyXG4gICAgICAgICAgICBcInNldFZpc2liaWxpdHlcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiUlRDQ29ubmVjdGlvbkFjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcImdldENoYW5uZWxJZFwiLFxyXG4gICAgICAgICAgICBcImdldEd1aWxkSWRcIixcclxuICAgICAgICAgICAgXCJnZXRSVENDb25uZWN0aW9uSWRcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiRW1vamlBY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJ0cmFuc2xhdGVJbmxpbmVFbW9qaVRvU3Vycm9nYXRlc1wiLFxyXG4gICAgICAgICAgICBcInRyYW5zbGF0ZVN1cnJvZ2F0ZXNUb0lubGluZUVtb2ppXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIkVtb2ppU3RhdGVBY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJnZXRVUkxcIixcclxuICAgICAgICAgICAgXCJpc0Vtb2ppRGlzYWJsZWRcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiR3VpbGROb3RpZmljYXRpb25zQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwidXBkYXRlQ2hhbm5lbE92ZXJyaWRlU2V0dGluZ3NcIixcclxuICAgICAgICAgICAgXCJ1cGRhdGVHdWlsZE5vdGlmaWNhdGlvblNldHRpbmdzXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIkludGVybmFsUmVhY3RcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcImpzeFwiLFxyXG4gICAgICAgICAgICBcImpzeHNcIixcclxuICAgICAgICAgICAgXCJGcmFnbWVudFwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJMb2dpbkFjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcImxvZ2luXCIsXHJcbiAgICAgICAgICAgIFwibG9nb3V0XCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIlF1ZXJ5QWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwicXVlcnlFbW9qaVJlc3VsdHNcIixcclxuICAgICAgICAgICAgXCJxdWVyeUZyaWVuZHNcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiTWVzc2FnZUFjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcInJlY2VpdmVNZXNzYWdlXCIsXHJcbiAgICAgICAgICAgIFwic2VuZE1lc3NhZ2VcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiUHJlbWl1bUFjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcImlzUHJlbWl1bVwiLFxyXG4gICAgICAgICAgICBcImNhblVzZUVtb2ppc0V2ZXJ5d2hlcmVcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiVm9pY2VBY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJzZWxlY3RWb2ljZUNoYW5uZWxcIixcclxuICAgICAgICAgICAgXCJkaXNjb25uZWN0XCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIlR5cGluZ0FjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcInN0YXJ0VHlwaW5nXCIsXHJcbiAgICAgICAgICAgIFwic3RvcFR5cGluZ1wiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJHdWlsZEFjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcInNldENoYW5uZWxcIixcclxuICAgICAgICAgICAgXCJzZXRTZXJ2ZXJNdXRlXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIkludml0ZUFjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcImFjY2VwdEludml0ZVwiLFxyXG4gICAgICAgICAgICBcImFjY2VwdEludml0ZUFuZFRyYW5zaXRpb25Ub0ludml0ZUNoYW5uZWxcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiTWVkaWFFbmdpbmVBY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJ0b2dnbGVTZWxmRGVhZlwiLFxyXG4gICAgICAgICAgICBcInRvZ2dsZVNlbGZNdXRlXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcImkxOG5cIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcIl9yZXF1ZXN0ZWRMb2NhbGVcIixcclxuICAgICAgICAgICAgXCJnZXREZWZhdWx0TG9jYWxlXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcInV1aWRcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcInYxXCIsXHJcbiAgICAgICAgICAgIFwidjRcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiaGxqc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwiaGlnaGxpZ2h0QWxsXCIsXHJcbiAgICAgICAgICAgIFwiaGlnaGxpZ2h0XCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn0iLCAiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZmluZEluVHJlZShcclxuICB0cmVlLFxyXG4gIHNlYXJjaEZpbHRlcixcclxuICB7IHdhbGthYmxlID0gbnVsbCwgaWdub3JlID0gW10sIGxpbWl0ID0gMjU2LCBhbGwgPSBmYWxzZSB9ID0ge31cclxuKSB7XHJcbiAgbGV0IGl0ZXJhdGlvbiA9IDA7XHJcbiAgbGV0IGZvdW5kTGlzdCA9IFtdO1xyXG5cclxuICBmdW5jdGlvbiBkb1NlYXJjaCh0cmVlLCBzZWFyY2hGaWx0ZXIsIHsgd2Fsa2FibGUgPSBudWxsLCBpZ25vcmUgPSBbXSB9ID0ge30pIHtcclxuICAgIGl0ZXJhdGlvbiArPSAxO1xyXG4gICAgaWYgKGl0ZXJhdGlvbiA+IGxpbWl0KSByZXR1cm47XHJcblxyXG4gICAgaWYgKHR5cGVvZiBzZWFyY2hGaWx0ZXIgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgaWYgKHRyZWUuaGFzT3duUHJvcGVydHkoc2VhcmNoRmlsdGVyKSkge1xyXG4gICAgICAgIGlmIChhbGwpIGZvdW5kTGlzdC5wdXNoKHRyZWVbc2VhcmNoRmlsdGVyXSk7XHJcbiAgICAgICAgaWYgKCFhbGwpIHJldHVybiB0cmVlW3NlYXJjaEZpbHRlcl07XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoc2VhcmNoRmlsdGVyKHRyZWUpKSB7XHJcbiAgICAgIGlmIChhbGwpIGZvdW5kTGlzdC5wdXNoKHRyZWUpO1xyXG4gICAgICBpZiAoIWFsbCkgcmV0dXJuIHRyZWU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0cmVlKSByZXR1cm47XHJcblxyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkodHJlZSkpIHtcclxuICAgICAgZm9yIChjb25zdCBpdGVtIG9mIHRyZWUpIHtcclxuICAgICAgICBjb25zdCBmb3VuZCA9IGRvU2VhcmNoKGl0ZW0sIHNlYXJjaEZpbHRlciwgeyB3YWxrYWJsZSwgaWdub3JlIH0pO1xyXG4gICAgICAgIGlmIChmb3VuZCkgZm91bmRMaXN0LnB1c2goZm91bmQpO1xyXG4gICAgICAgIGlmIChmb3VuZCAmJiAhYWxsKSByZXR1cm4gZm91bmQ7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHRyZWUgPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgZm9yIChjb25zdCBrZXkgaW4gdHJlZSkge1xyXG4gICAgICAgIGlmICh3YWxrYWJsZSAhPSBudWxsICYmICF3YWxrYWJsZS5pbmNsdWRlcyhrZXkpKSBjb250aW51ZTtcclxuXHJcbiAgICAgICAgaWYgKGlnbm9yZS5pbmNsdWRlcyhrZXkpKSBjb250aW51ZTtcclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIGNvbnN0IGZvdW5kID0gZG9TZWFyY2godHJlZVtrZXldLCBzZWFyY2hGaWx0ZXIsIHtcclxuICAgICAgICAgICAgd2Fsa2FibGUsXHJcbiAgICAgICAgICAgIGlnbm9yZSxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgaWYgKGZvdW5kKSBmb3VuZExpc3QucHVzaChmb3VuZCk7XHJcbiAgICAgICAgICBpZiAoZm91bmQgJiYgIWFsbCkgcmV0dXJuIGZvdW5kO1xyXG4gICAgICAgIH0gY2F0Y2ggeyB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiBkb1NlYXJjaCh0cmVlLCBzZWFyY2hGaWx0ZXIsIHsgd2Fsa2FibGUsIGlnbm9yZSB9KSA/PyBmb3VuZExpc3Q7XHJcbn07XHJcbiIsICJmdW5jdGlvbiBidWlsZChwcmVmaXggPSBcIkFjb3JkXCIsIHR5cGUsIGNvbG9yKSB7XHJcbiAgcmV0dXJuICguLi5pbnB1dCkgPT4gY29uc29sZVt0eXBlXShcclxuICAgIGAlYyR7cHJlZml4fSVjYCxcclxuICAgIGBiYWNrZ3JvdW5kLWNvbG9yOiAke2NvbG9yfTsgY29sb3I6IHdoaXRlOyBib3JkZXItcmFkaXVzOiA0cHg7IHBhZGRpbmc6IDBweCA2cHggMHB4IDZweDsgZm9udC13ZWlnaHQ6IGJvbGRgLFxyXG4gICAgXCJcIixcclxuICAgIC4uLmlucHV0XHJcbiAgKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGxvZzogYnVpbGQoXCJBY29yZFwiLCBcImxvZ1wiLCBcIiMwMGZiYjBcIiksXHJcbiAgZGVidWc6IGJ1aWxkKFwiQWNvcmQgRGVidWdcIiwgXCJkZWJ1Z1wiLCBcIiMwMGZiYjBcIiksXHJcbiAgaW5mbzogYnVpbGQoXCJBY29yZCBJbmZvXCIsIFwibG9nXCIsIFwiIzgyYWFmZlwiKSxcclxuICB3YXJuOiBidWlsZChcIkFjb3JkIFdhcm5cIiwgXCJ3YXJuXCIsIFwiI2RlYmYxOFwiKSxcclxuICBlcnJvcjogYnVpbGQoXCJBY29yZCBFcnJvclwiLCBcImVycm9yXCIsIFwiI2VmNTg1OFwiKSxcclxuICBidWlsZFxyXG59IiwgImltcG9ydCBmaW5kSW5UcmVlIGZyb20gXCIuL3Jhdy9maW5kLWluLXRyZWUuanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBnZXRJbnN0YW5jZShub2RlKSB7XHJcbiAgICByZXR1cm4gT2JqZWN0LmVudHJpZXMobm9kZSkuZmluZChpID0+IGlbMF0uc3RhcnRzV2l0aChcIl9fcmVhY3RJbnRlcm5hbEluc3RhbmNlXCIpIHx8IGlbMF0uc3RhcnRzV2l0aChcIl9fcmVhY3RGaWJlclwiKSk/LlsxXTtcclxuICB9LFxyXG4gIGdldE93bmVySW5zdGFuY2Uobm9kZSkge1xyXG4gICAgbGV0IGluc3RhbmNlID0gdGhpcy5nZXRJbnN0YW5jZShub2RlKTtcclxuICAgIGZvciAobGV0IGVsID0gaW5zdGFuY2U7IGVsOyBlbCA9IGVsLnJldHVybilcclxuICAgICAgaWYgKGVsLnN0YXRlTm9kZT8uZm9yY2VVcGRhdGUpIHJldHVybiBlbC5zdGF0ZU5vZGU7XHJcbiAgfSxcclxuICBmaW5kSW5UcmVlKHRyZWUsIGZpbHRlcikge1xyXG4gICAgcmV0dXJuIGZpbmRJblRyZWUodHJlZSwgZmlsdGVyLCB7XHJcbiAgICAgIHdhbGthYmxlOiBbXCJwcm9wc1wiLCBcInN0YXRlXCIsIFwiY2hpbGRyZW5cIiwgXCJyZXR1cm5cIl1cclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgZ2V0Q29tcG9uZW50cyhub2RlKSB7XHJcbiAgICBjb25zdCBpbnN0YW5jZSA9IHRoaXMuZ2V0SW5zdGFuY2Uobm9kZSk7XHJcbiAgICBjb25zdCBjb21wb25lbnRzID0gW107XHJcbiAgICBsZXQgbGFzdEluc3RhbmNlID0gaW5zdGFuY2U7XHJcbiAgICB3aGlsZSAobGFzdEluc3RhbmNlICYmIGxhc3RJbnN0YW5jZS5yZXR1cm4pIHtcclxuICAgICAgaWYgKHR5cGVvZiBsYXN0SW5zdGFuY2UucmV0dXJuLnR5cGUgPT09IFwic3RyaW5nXCIpIGJyZWFrO1xyXG4gICAgICBpZiAobGFzdEluc3RhbmNlLnJldHVybi50eXBlKSBjb21wb25lbnRzLnB1c2gobGFzdEluc3RhbmNlLnJldHVybi50eXBlKTtcclxuICAgICAgbGFzdEluc3RhbmNlID0gbGFzdEluc3RhbmNlLnJldHVybjtcclxuICAgIH1cclxuICAgIHJldHVybiBjb21wb25lbnRzO1xyXG4gIH0sXHJcbiAgZ2V0U3RhdGVOb2Rlcyhub2RlKSB7XHJcbiAgICBjb25zdCBpbnN0YW5jZSA9IHRoaXMuZ2V0SW5zdGFuY2Uobm9kZSk7XHJcbiAgICBjb25zdCBzdGF0ZU5vZGVzID0gW107XHJcbiAgICBsZXQgbGFzdEluc3RhbmNlID0gaW5zdGFuY2U7XHJcbiAgICB3aGlsZSAobGFzdEluc3RhbmNlICYmIGxhc3RJbnN0YW5jZS5yZXR1cm4pIHtcclxuICAgICAgaWYgKGxhc3RJbnN0YW5jZS5yZXR1cm4uc3RhdGVOb2RlIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIGJyZWFrO1xyXG4gICAgICBpZiAobGFzdEluc3RhbmNlLnJldHVybi5zdGF0ZU5vZGUpXHJcbiAgICAgICAgc3RhdGVOb2Rlcy5wdXNoKGxhc3RJbnN0YW5jZS5yZXR1cm4uc3RhdGVOb2RlKTtcclxuICAgICAgbGFzdEluc3RhbmNlID0gbGFzdEluc3RhbmNlLnJldHVybjtcclxuICAgIH1cclxuICAgIHJldHVybiBzdGF0ZU5vZGVzO1xyXG4gIH0sXHJcbiAgZ2V0UHJvcHMoZWwsIGZpbHRlciA9IChpKSA9PiBpLCBtYXggPSAxMDAwMCkge1xyXG4gICAgY29uc3QgaW5zdGFuY2UgPSB0aGlzLmdldEluc3RhbmNlKGVsKTtcclxuXHJcbiAgICBpZiAoIWluc3RhbmNlPy5yZXR1cm4pIHJldHVybiBudWxsO1xyXG5cclxuICAgIGZvciAoXHJcbiAgICAgIGxldCBjdXJyZW50ID0gaW5zdGFuY2U/LnJldHVybiwgaSA9IDA7XHJcbiAgICAgIGkgPiBtYXggfHwgY3VycmVudCAhPT0gbnVsbDtcclxuICAgICAgY3VycmVudCA9IGN1cnJlbnQ/LnJldHVybiwgaSsrXHJcbiAgICApIHtcclxuICAgICAgaWYgKGN1cnJlbnQ/LnBlbmRpbmdQcm9wcyAmJiBmaWx0ZXIoY3VycmVudC5wZW5kaW5nUHJvcHMpKVxyXG4gICAgICAgIHJldHVybiBjdXJyZW50LnBlbmRpbmdQcm9wcztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9LFxyXG59IiwgImltcG9ydCBmaW5kSW5UcmVlIGZyb20gXCIuL3Jhdy9maW5kLWluLXRyZWUuanNcIjtcclxuaW1wb3J0IGxvZ2dlciBmcm9tIFwiLi9sb2dnZXIuanNcIjtcclxuaW1wb3J0IHJlYWN0IGZyb20gXCIuL3JlYWN0LmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgbG9nZ2VyLFxyXG4gIHJlYWN0LFxyXG4gIGZpbmRJblRyZWUsXHJcbiAgZm9ybWF0KHZhbCwgLi4uYXJncykge1xyXG4gICAgcmV0dXJuIGAke3ZhbH1gLnJlcGxhY2VBbGwoL3soXFxkKyl9L2csIChfLCBjYXApID0+IHtcclxuICAgICAgcmV0dXJuIGFyZ3NbTnVtYmVyKGNhcCldO1xyXG4gICAgfSk7XHJcbiAgfSxcclxuICBpbnRlcnZhbChjYiwgZHVyKSB7XHJcbiAgICBsZXQgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChjYiwgZHVyKTtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xyXG4gICAgfTtcclxuICB9LFxyXG4gIHRpbWVvdXQoY2IsIGR1cikge1xyXG4gICAgbGV0IHRpbWVvdXQgPSBzZXRUaW1lb3V0KGNiLCBkdXIpO1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xyXG4gICAgfTtcclxuICB9LFxyXG4gIGlmRXhpc3RzKHZhbCwgY2IpIHtcclxuICAgIGlmICh2YWwpIGNiKHZhbCk7XHJcbiAgfSxcclxuICBjb3B5VGV4dCh0ZXh0KSB7XHJcbiAgICBpZiAod2luZG93LkRpc2NvcmROYXRpdmUpIHtcclxuICAgICAgRGlzY29yZE5hdGl2ZS5jbGlwYm9hcmQuY29weSh0ZXh0KTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIG5hdmlnYXRvci5jbGlwYm9hcmQud3JpdGVUZXh0KHRleHQpLmNhdGNoKCgpID0+IHtcclxuICAgICAgY29uc3QgY29weUFyZWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGV4dGFyZWFcIik7XHJcblxyXG4gICAgICBjb3B5QXJlYS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcclxuICAgICAgY29weUFyZWEuc3R5bGUucG9zaXRpb24gPSBcImZpeGVkXCI7XHJcbiAgICAgIGNvcHlBcmVhLnN0eWxlLnRvcCA9IFwiMFwiO1xyXG4gICAgICBjb3B5QXJlYS5zdHlsZS5sZWZ0ID0gXCIwXCI7XHJcblxyXG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvcHlBcmVhKTtcclxuICAgICAgY29weUFyZWEuZm9jdXMoKTtcclxuICAgICAgY29weUFyZWEuc2VsZWN0KCk7XHJcblxyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKFwiY29weVwiKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGNvcHlBcmVhKTtcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgc2xlZXAobXMpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gc2V0VGltZW91dChyZXNvbHZlLCBtcykpO1xyXG4gIH0sXHJcbiAgbWFwUmVwbGFjZSh0ZXh0LCBtYXAgPSB7fSkge1xyXG4gICAgcmV0dXJuIChBcnJheS5pc0FycmF5KG1hcCkgPyBtYXAgOiBPYmplY3QuZW50cmllcyhtYXApKS5yZWR1Y2UoKGFsbCwgY3VycmVudCkgPT4gYWxsLnJlcGxhY2VBbGwoY3VycmVudFswXSwgY3VycmVudFsxXSksIHRleHQpO1xyXG4gIH0sXHJcbiAgZXNjYXBlUmVnZXgoc3RyKSB7XHJcbiAgICByZXR1cm4gc3RyXHJcbiAgICAgIC5yZXBsYWNlKC9bfFxcXFx7fSgpW1xcXV4kKyo/Ll0vZywgJ1xcXFwkJicpXHJcbiAgICAgIC5yZXBsYWNlKC8tL2csICdcXFxceDJkJyk7XHJcbiAgfVxyXG59IiwgImltcG9ydCB1dGlscyBmcm9tIFwiLi4vLi4vdXRpbHMvaW5kZXguanNcIjtcclxuaW1wb3J0IGxvZ2dlciBmcm9tIFwiLi4vLi4vdXRpbHMvbG9nZ2VyLmpzXCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gd3JhcEZpbHRlcihmaWx0ZXIpIHtcclxuICByZXR1cm4gKC4uLmFyZ3MpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGlmIChhcmdzWzBdPy5kb2N1bWVudCAmJiBhcmdzWzBdPy53aW5kb3cpIHJldHVybiBmYWxzZTtcclxuICAgICAgaWYgKGFyZ3NbMF0/LmRlZmF1bHQ/LnJlbW92ZSAmJiBhcmdzWzBdPy5kZWZhdWx0Py5zZXQgJiYgYXJnc1swXT8uZGVmYXVsdD8uY2xlYXIgJiYgYXJnc1swXT8uZGVmYXVsdD8uZ2V0ICYmICFhcmdzWzBdPy5kZWZhdWx0Py5zb3J0KSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIGlmIChhcmdzWzBdLnJlbW92ZSAmJiBhcmdzWzBdLnNldCAmJiBhcmdzWzBdLmNsZWFyICYmIGFyZ3NbMF0uZ2V0ICYmICFhcmdzWzBdLnNvcnQpIHJldHVybiBmYWxzZTtcclxuICAgICAgaWYgKGFyZ3NbMF0/LmRlZmF1bHQ/LmdldFRva2VuIHx8IGFyZ3NbMF0/LmRlZmF1bHQ/LmdldEVtYWlsIHx8IGFyZ3NbMF0/LmRlZmF1bHQ/LnNob3dUb2tlbikgcmV0dXJuIGZhbHNlO1xyXG4gICAgICBpZiAoYXJnc1swXT8uZ2V0VG9rZW4gfHwgYXJnc1swXT8uZ2V0RW1haWwgfHwgYXJnc1swXT8uc2hvd1Rva2VuKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIHJldHVybiBmaWx0ZXIoLi4uYXJncyk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGxvZ2dlci53YXJuKFwiTW9kdWxlIGZpbHRlciB0aHJldyBhbiBleGNlcHRpb24uXCIsIGZpbHRlciwgZXJyKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNoZWNrTW9kdWxlU3RyaW5ncyhtLCBzdHJpbmdzID0gW10sIGhhc05vdCkge1xyXG4gIGNvbnN0IGNoZWNrID0gKHMxLCBzMikgPT4ge1xyXG4gICAgcmV0dXJuIGhhc05vdCA/IHMxLnRvU3RyaW5nKCkuaW5kZXhPZihzMi50b1N0cmluZygpKSA9PSAtMSA6IHMxLnRvU3RyaW5nKCkuaW5kZXhPZihzMi50b1N0cmluZygpKSA+IC0xO1xyXG4gIH07XHJcbiAgcmV0dXJuIHN0cmluZ3MuZXZlcnkoaiA9PiB7XHJcbiAgICByZXR1cm4gY2hlY2sobT8udG9TdHJpbmc/LigpIHx8IFwiXCIsIGopXHJcbiAgICAgIHx8IGNoZWNrKG0/Ll9fb3JpZ2luYWxfXz8udG9TdHJpbmc/LigpIHx8IFwiXCIsIGopXHJcbiAgICAgIHx8IGNoZWNrKG0/LnR5cGU/LnRvU3RyaW5nPy4oKSB8fCBcIlwiLCBqKVxyXG4gICAgICB8fCBjaGVjayhtPy50eXBlPy5fX29yaWdpbmFsX18/LnRvU3RyaW5nPy4oKSB8fCBcIlwiLCBqKVxyXG4gICAgICB8fCBPYmplY3QuZW50cmllcyhbJ2Z1bmN0aW9uJywgJ29iamVjdCddLmluY2x1ZGVzKHR5cGVvZiBtPy5wcm90b3R5cGUpID8gdHlwZW9mIG0/LnByb3RvdHlwZSA6IHt9KS5maWx0ZXIoaSA9PiBpWzBdPy5pbmNsdWRlcz8uKFwicmVuZGVyXCIpKS5zb21lKGkgPT4gY2hlY2soaVsxXT8udG9TdHJpbmc/LigpIHx8IFwiXCIsIGopKVxyXG4gIH0pO1xyXG59O1xyXG5mdW5jdGlvbiBjaGVja01vZHVsZVByb3BzKG0sIHByb3BlcnRpZXMgPSBbXSwgaGFzTm90KSB7XHJcbiAgcmV0dXJuIHByb3BlcnRpZXMuZXZlcnkocHJvcCA9PiB7XHJcbiAgICBjb25zdCB2YWx1ZSA9IG1bcHJvcF0/Ll9fb3JpZ2luYWxfXyB8fCBtW3Byb3BdO1xyXG4gICAgcmV0dXJuIGhhc05vdCA/IHZhbHVlID09PSB1bmRlZmluZWQgOiAodmFsdWUgIT09IHVuZGVmaW5lZCAmJiAhKHR5cGVvZiB2YWx1ZSA9PSBcInN0cmluZ1wiICYmICF2YWx1ZSkpO1xyXG4gIH0pO1xyXG59O1xyXG5mdW5jdGlvbiBjaGVja01vZHVsZVByb3RvdHlwZXMobSwgcHJvdG9Qcm9wcyA9IFtdLCBoYXNOb3QpIHtcclxuICByZXR1cm4gbS5wcm90b3R5cGUgJiYgcHJvdG9Qcm9wcy5ldmVyeShwcm9wID0+IHtcclxuICAgIGNvbnN0IHZhbHVlID0gbS5wcm90b3R5cGVbcHJvcF07XHJcbiAgICByZXR1cm4gaGFzTm90ID8gdmFsdWUgPT09IHVuZGVmaW5lZCA6ICh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmICEodHlwZW9mIHZhbHVlID09IFwic3RyaW5nXCIgJiYgIXZhbHVlKSk7XHJcbiAgfSk7XHJcbn07XHJcblxyXG5jb25zdCB3ZWJwYWNrQ2h1bmtOYW1lID0gXCJ3ZWJwYWNrQ2h1bmtkaXNjb3JkX2FwcFwiO1xyXG5jb25zdCBwdXNoTGlzdGVuZXJzID0gbmV3IFNldCgpO1xyXG5cclxuXHJcbntcclxuICBsZXQgb2dQdXNoID0gd2luZG93W3dlYnBhY2tDaHVua05hbWVdLnB1c2g7XHJcblxyXG4gIGZ1bmN0aW9uIGhhbmRsZVB1c2goY2h1bmspIHtcclxuICAgIGNvbnN0IFssIG1vZHVsZXNdID0gY2h1bms7XHJcblxyXG4gICAgZm9yIChjb25zdCBtb2R1bGVJZCBpbiBPYmplY3Qua2V5cyhtb2R1bGVzIHx8IHt9KSkge1xyXG4gICAgICBjb25zdCBvZ01vZHVsZSA9IG1vZHVsZXNbbW9kdWxlSWRdO1xyXG5cclxuICAgICAgbW9kdWxlc1ttb2R1bGVJZF0gPSAobW9kdWxlLCBleHBvcnRzLCByZXF1aXJlKSA9PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIG9nTW9kdWxlLmNhbGwobnVsbCwgbW9kdWxlLCBleHBvcnRzLCByZXF1aXJlKTtcclxuXHJcbiAgICAgICAgICBwdXNoTGlzdGVuZXJzLmZvckVhY2gobGlzdGVuZXIgPT4ge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgIGxpc3RlbmVyKGV4cG9ydHMpO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgIHV0aWxzLmxvZ2dlci5lcnJvcihcIlB1c2ggbGlzdGVuZXIgdGhyZXcgYW4gZXhjZXB0aW9uLlwiLCBsaXN0ZW5lciwgZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICB1dGlscy5sb2dnZXIuZXJyb3IoXCJVbmFibGUgdG8gcGF0Y2ggcHVzaGVkIG1vZHVsZS5cIiwgZXJyb3IsIG9nTW9kdWxlLCBtb2R1bGVJZCwgY2h1bmspO1xyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuXHJcbiAgICAgIE9iamVjdC5hc3NpZ24obW9kdWxlc1ttb2R1bGVJZF0sIG9nTW9kdWxlLCB7XHJcbiAgICAgICAgX19vcmlnaW5hbF9fOiBvZ01vZHVsZSxcclxuICAgICAgICB0b1N0cmluZzogKCkgPT4gb2dNb2R1bGUudG9TdHJpbmcoKSxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG9nUHVzaC5jYWxsKHdpbmRvd1t3ZWJwYWNrQ2h1bmtOYW1lXSwgY2h1bmspO1xyXG4gIH1cclxuXHJcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvd1t3ZWJwYWNrQ2h1bmtOYW1lXSwgXCJwdXNoXCIsIHtcclxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcclxuICAgIGdldCgpIHsgcmV0dXJuIGhhbmRsZVB1c2g7IH0sXHJcbiAgICBzZXQodmFsdWUpIHtcclxuICAgICAgb2dQdXNoID0gdmFsdWU7XHJcblxyXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93W3RoaXMuY2h1bmtOYW1lXSwgXCJwdXNoXCIsIHtcclxuICAgICAgICB2YWx1ZTogdGhpcy5oYW5kbGVQdXNoLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcclxuICAgICAgICB3cml0YWJsZTogdHJ1ZVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9KTtcclxufVxyXG5cclxuXHJcblxyXG4vKipcclxuICogXHJcbiAqIEBwYXJhbSB7YW55fSBmaWx0ZXIgXHJcbiAqIEBwYXJhbSB7eyBzaWduYWw6IEFib3J0U2lnbmFsLCBzZWFyY2hFeHBvcnRzOiBib29sZWFuIH19IHBhcmFtMSBcclxuICogQHJldHVybnMgXHJcbiAqL1xyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbGF6eUZpbmQoZmlsdGVyLCB7IHNpZ25hbCA9IG51bGwsIHNlYXJjaEV4cG9ydHMgPSBmYWxzZSB9KSB7XHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgIGNvbnN0IGNhbmNlbCA9ICgpID0+IHB1c2hMaXN0ZW5lcnMuZGVsZXRlKGxpc3RlbmVyKTtcclxuICAgIGNvbnN0IGxpc3RlbmVyID0gKGV4cG9ydHMpID0+IHtcclxuICAgICAgaWYgKCFleHBvcnRzIHx8IGV4cG9ydHMgPT09IHdpbmRvdyB8fCBleHBvcnRzID09PSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpIHJldHVybjtcclxuXHJcbiAgICAgIGxldCBmb3VuZCA9IG51bGw7XHJcblxyXG4gICAgICBpZiAodHlwZW9mIGV4cG9ydHMgPT0gXCJvYmplY3RcIiAmJiBzZWFyY2hFeHBvcnRzKSB7XHJcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gZXhwb3J0cykge1xyXG4gICAgICAgICAgbGV0IGV4cG9ydGVkID0gZXhwb3J0c1trZXldO1xyXG4gICAgICAgICAgaWYgKCFleHBvcnRlZCkgY29udGludWU7XHJcbiAgICAgICAgICBpZiAoZmlsdGVyKGV4cG9ydGVkKSkge1xyXG4gICAgICAgICAgICBmb3VuZCA9IGV4cG9ydGVkO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbGV0IHBhdGhzID0gW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiLFxyXG4gICAgICAgICAgXCJcIlxyXG4gICAgICAgIF07XHJcbiAgICAgICAgZm91bmQgPSBwYXRocy5tYXAoaSA9PiB7XHJcbiAgICAgICAgICBsZXQgcGF0aGVkID0gIWkgPyBleHBvcnRzIDogXy5nZXQoZXhwb3J0cywgaSk7XHJcbiAgICAgICAgICBpZiAocGF0aGVkICYmIGZpbHRlcihwYXRoZWQpKSByZXR1cm4gcGF0aGVkO1xyXG4gICAgICAgIH0pLmZpbmQoaSA9PiBpKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCFmb3VuZCkgcmV0dXJuO1xyXG4gICAgICBjYW5jZWwoKTtcclxuICAgICAgcmVzb2x2ZShmb3VuZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVzaExpc3RlbmVycy5hZGQobGlzdGVuZXIpO1xyXG5cclxuICAgIHNpZ25hbD8uYWRkRXZlbnRMaXN0ZW5lcihcImFib3J0XCIsICgpID0+IHtcclxuICAgICAgY2FuY2VsKCk7XHJcbiAgICAgIHJlc29sdmUobnVsbCk7XHJcbiAgICB9KTtcclxuICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGZpbmQocmVxLCBmaWx0ZXIsIGNvbmZpZyA9IHt9KSB7XHJcbiAgbGV0IGRlZmF1bHRFeHBvcnQgPSB0eXBlb2YgY29uZmlnLmRlZmF1bHRFeHBvcnQgIT0gXCJib29sZWFuXCIgPyBmYWxzZSA6IGNvbmZpZy5kZWZhdWx0RXhwb3J0O1xyXG4gIGxldCB1bmxvYWRlZCA9IHR5cGVvZiBjb25maWcudW5sb2FkZWQgIT0gXCJib29sZWFuXCIgPyBmYWxzZSA6IGNvbmZpZy51bmxvYWRlZDtcclxuICBsZXQgYWxsID0gdHlwZW9mIGNvbmZpZy5hbGwgIT0gXCJib29sZWFuXCIgPyBmYWxzZSA6IGNvbmZpZy5hbGw7XHJcbiAgY29uc3QgZm91bmQgPSBbXTtcclxuICBpZiAoIXVubG9hZGVkKSBmb3IgKGxldCBpIGluIHJlcS5jKSBpZiAocmVxLmMuaGFzT3duUHJvcGVydHkoaSkpIHtcclxuICAgIGxldCBtID0gcmVxLmNbaV0uZXhwb3J0cywgciA9IG51bGw7XHJcbiAgICBpZiAobSAmJiAodHlwZW9mIG0gPT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgbSA9PSBcImZ1bmN0aW9uXCIpKSB7XHJcbiAgICAgIGlmICghIShyID0gZmlsdGVyKG0sIGkpKSkge1xyXG4gICAgICAgIGlmIChhbGwpIGZvdW5kLnB1c2goZGVmYXVsdEV4cG9ydCA/IHIgOiByZXEuY1tpXSk7XHJcbiAgICAgICAgZWxzZSByZXR1cm4gZGVmYXVsdEV4cG9ydCA/IHIgOiByZXEuY1tpXTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIGZvciAobGV0IGtleSBvZiBPYmplY3Qua2V5cyhtKSkgaWYgKGtleS5sZW5ndGggPCA0ICYmIG1ba2V5XSAmJiAhIShyID0gZmlsdGVyKG1ba2V5XSwgaSkpKSB7XHJcbiAgICAgICAgaWYgKGFsbCkgZm91bmQucHVzaChkZWZhdWx0RXhwb3J0ID8gciA6IHJlcS5jW2ldKTtcclxuICAgICAgICBlbHNlIHJldHVybiBkZWZhdWx0RXhwb3J0ID8gciA6IHJlcS5jW2ldO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAobSAmJiBtLl9fZXNNb2R1bGUgJiYgbS5kZWZhdWx0ICYmICh0eXBlb2YgbS5kZWZhdWx0ID09IFwib2JqZWN0XCIgfHwgdHlwZW9mIG0uZGVmYXVsdCA9PSBcImZ1bmN0aW9uXCIpKSB7XHJcbiAgICAgIGlmICghIShyID0gZmlsdGVyKG0uZGVmYXVsdCwgaSkpKSB7XHJcbiAgICAgICAgaWYgKGFsbCkgZm91bmQucHVzaChkZWZhdWx0RXhwb3J0ID8gciA6IHJlcS5jW2ldKTtcclxuICAgICAgICBlbHNlIHJldHVybiBkZWZhdWx0RXhwb3J0ID8gciA6IHJlcS5jW2ldO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYgKG0uZGVmYXVsdC50eXBlICYmICh0eXBlb2YgbS5kZWZhdWx0LnR5cGUgPT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgbS5kZWZhdWx0LnR5cGUgPT0gXCJmdW5jdGlvblwiKSAmJiAhIShyID0gZmlsdGVyKG0uZGVmYXVsdC50eXBlLCBpKSkpIHtcclxuICAgICAgICBpZiAoYWxsKSBmb3VuZC5wdXNoKGRlZmF1bHRFeHBvcnQgPyByIDogcmVxLmNbaV0pO1xyXG4gICAgICAgIGVsc2UgcmV0dXJuIGRlZmF1bHRFeHBvcnQgPyByIDogcmVxLmNbaV07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgZm9yIChsZXQgaSBpbiByZXEubSkgaWYgKHJlcS5tLmhhc093blByb3BlcnR5KGkpKSB7XHJcbiAgICBsZXQgbSA9IHJlcS5tW2ldO1xyXG4gICAgaWYgKG0gJiYgdHlwZW9mIG0gPT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgIGlmIChyZXEuY1tpXSAmJiAhdW5sb2FkZWQgJiYgZmlsdGVyKG0sIGkpKSB7XHJcbiAgICAgICAgaWYgKGFsbCkgZm91bmQucHVzaChkZWZhdWx0RXhwb3J0ID8gcmVxLmNbaV0uZXhwb3J0cyA6IHJlcS5jW2ldKTtcclxuICAgICAgICBlbHNlIHJldHVybiBkZWZhdWx0RXhwb3J0ID8gcmVxLmNbaV0uZXhwb3J0cyA6IHJlcS5jW2ldO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICghcmVxLmNbaV0gJiYgdW5sb2FkZWQgJiYgZmlsdGVyKG0sIGkpKSB7XHJcbiAgICAgICAgY29uc3QgcmVzb2x2ZWQgPSB7fSwgcmVzb2x2ZWQyID0ge307XHJcbiAgICAgICAgbShyZXNvbHZlZCwgcmVzb2x2ZWQyLCByZXEpO1xyXG4gICAgICAgIGNvbnN0IHRydWVSZXNvbHZlZCA9IHJlc29sdmVkMiAmJiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhyZXNvbHZlZDIgfHwge30pLmxlbmd0aCA9PSAwID8gcmVzb2x2ZWQgOiByZXNvbHZlZDI7XHJcbiAgICAgICAgaWYgKGFsbCkgZm91bmQucHVzaChkZWZhdWx0RXhwb3J0ID8gdHJ1ZVJlc29sdmVkLmV4cG9ydHMgOiB0cnVlUmVzb2x2ZWQpO1xyXG4gICAgICAgIGVsc2UgcmV0dXJuIGRlZmF1bHRFeHBvcnQgPyB0cnVlUmVzb2x2ZWQuZXhwb3J0cyA6IHRydWVSZXNvbHZlZDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICBpZiAoYWxsKSByZXR1cm4gZm91bmQ7XHJcbn07XHJcblxyXG5cclxuZnVuY3Rpb24gZmluZGVyRmluZEZ1bmN0aW9uKGVudHJpZXMsIHN0cmluZ3MpIHtcclxuICByZXR1cm4gKGVudHJpZXMuZmluZChuID0+IHtcclxuICAgIGxldCBmdW5jU3RyaW5nID0gdHlwZW9mIG5bMV0gPT0gXCJmdW5jdGlvblwiID8gKG5bMV0/Ll9fb3JpZ2luYWxfXz8udG9TdHJpbmc/LigpIHx8IG5bMV0/LnRvU3RyaW5nPy4oKSB8fCBcIlwiKSA6ICgoKSA9PiB7IHRyeSB7IHJldHVybiBKU09OLnN0cmluZ2lmeShuWzFdKSB9IGNhdGNoIChlcnIpIHsgcmV0dXJuIG5bMV0udG9TdHJpbmcoKSB9IH0pKCk7XHJcbiAgICBsZXQgcmVuZGVyRnVuY1N0cmluZyA9IG5bMV0/LnJlbmRlcj8uX19vcmlnaW5hbF9fPy50b1N0cmluZz8uKCkgfHwgblsxXT8ucmVuZGVyPy50b1N0cmluZz8uKCkgfHwgXCJcIjtcclxuICAgIHJldHVybiBzdHJpbmdzLmV2ZXJ5KHN0cmluZyA9PiBmdW5jU3RyaW5nLmluZGV4T2Yoc3RyaW5nKSAhPSAtMSB8fCByZW5kZXJGdW5jU3RyaW5nLmluZGV4T2Yoc3RyaW5nKSAhPSAtMSk7XHJcbiAgfSkpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZmluZGVyVG9GaWx0ZXIoZmluZGVyKSB7XHJcbiAgbGV0IGZvdW5kID0gKCkgPT4gZmFsc2U7XHJcbiAgaWYgKHR5cGVvZiBmaW5kZXI/LmZpbHRlciA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgZm91bmQgPSB3cmFwRmlsdGVyKGV2YWwoYCgoJCk9PnsgdHJ5IHsgcmV0dXJuICgke2ZpbmRlci5maWx0ZXJ9KTsgfSBjYXRjaCB7IHJldHVybiBmYWxzZTsgfSB9KWApKTtcclxuICB9IGVsc2UgaWYgKHR5cGVvZiBmaW5kZXI/LmZpbHRlciA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICBmb3VuZCA9IHdyYXBGaWx0ZXIoZmluZGVyLmZpbHRlcik7XHJcbiAgfSBlbHNlIHtcclxuICAgIHN3aXRjaCAoZmluZGVyLmZpbHRlci5pbikge1xyXG4gICAgICBjYXNlIFwicHJvcGVydGllc1wiOiB7XHJcbiAgICAgICAgaWYgKGZpbmRlci5maWx0ZXIuYnk/LlsxXT8ubGVuZ3RoKSB7XHJcbiAgICAgICAgICBmb3VuZCA9IHdyYXBGaWx0ZXIoKG0pID0+IGNoZWNrTW9kdWxlUHJvcHMobSwgZmluZGVyLmZpbHRlci5ieT8uWzBdIHx8IFtdKSAmJiBjaGVja01vZHVsZVByb3BzKG0sIGZpbmRlci5maWx0ZXIuYnk/LlsxXSB8fCBbXSwgdHJ1ZSkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBmb3VuZCA9IHdyYXBGaWx0ZXIoKG0pID0+IGNoZWNrTW9kdWxlUHJvcHMobSwgZmluZGVyLmZpbHRlci5ieT8uWzBdIHx8IFtdKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgXCJwcm90b3R5cGVzXCI6IHtcclxuICAgICAgICBpZiAoZmluZGVyLmZpbHRlci5ieT8uWzFdPy5sZW5ndGgpIHtcclxuICAgICAgICAgIGZvdW5kID0gd3JhcEZpbHRlcigobSkgPT4gY2hlY2tNb2R1bGVQcm90b3R5cGVzKG0sIGZpbmRlci5maWx0ZXIuYnk/LlswXSB8fCBbXSkgJiYgY2hlY2tNb2R1bGVQcm90b3R5cGVzKG0sIGZpbmRlci5maWx0ZXIuYnk/LlsxXSB8fCBbXSwgdHJ1ZSkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBmb3VuZCA9IHdyYXBGaWx0ZXIoKG0pID0+IGNoZWNrTW9kdWxlUHJvdG90eXBlcyhtLCBmaW5kZXIuZmlsdGVyLmJ5Py5bMF0gfHwgW10pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSBcInN0cmluZ3NcIjoge1xyXG4gICAgICAgIGlmIChmaW5kZXIuZmlsdGVyLmJ5Py5bMV0/Lmxlbmd0aCkge1xyXG4gICAgICAgICAgZm91bmQgPSB3cmFwRmlsdGVyKChtKSA9PiBjaGVja01vZHVsZVN0cmluZ3MobSwgZmluZGVyLmZpbHRlci5ieT8uWzBdIHx8IFtdKSAmJiBjaGVja01vZHVsZVN0cmluZ3MobSwgZmluZGVyLmZpbHRlci5ieT8uWzFdIHx8IFtdLCB0cnVlKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGZvdW5kID0gd3JhcEZpbHRlcigobSkgPT4gY2hlY2tNb2R1bGVTdHJpbmdzKG0sIGZpbmRlci5maWx0ZXIuYnk/LlswXSB8fCBbXSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gZm91bmQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBmaW5kZXJNYXAoX19vcmlnaW5hbF9fLCBtYXApIHtcclxuICBsZXQgX19tYXBwZWRfXyA9IHt9O1xyXG5cclxuICBsZXQgdGVtcCA9IHtcclxuICAgIF9fb3JpZ2luYWxfXyxcclxuICAgIF9fbWFwcGVkX18sXHJcbiAgICAuLi5fX29yaWdpbmFsX19cclxuICB9O1xyXG5cclxuICBPYmplY3QuZW50cmllcyhtYXApLmZvckVhY2goKFtrZXksIHN0cmluZ3NdKSA9PiB7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGVtcCwga2V5LCB7XHJcbiAgICAgIGdldCgpIHtcclxuICAgICAgICBpZiAoX19tYXBwZWRfX1trZXldKSByZXR1cm4gX19vcmlnaW5hbF9fW19fbWFwcGVkX19ba2V5XV07XHJcblxyXG4gICAgICAgIGxldCBmb3VuZEZ1bmMgPSBmaW5kZXJGaW5kRnVuY3Rpb24oT2JqZWN0LmVudHJpZXMoX19vcmlnaW5hbF9fIHx8IHt9KSwgbWFwW2tleV0gfHwgW10pO1xyXG4gICAgICAgIGlmICghZm91bmRGdW5jPy5sZW5ndGgpIHJldHVybjtcclxuXHJcbiAgICAgICAgX19tYXBwZWRfX1trZXldID0gZm91bmRGdW5jWzBdO1xyXG4gICAgICAgIHJldHVybiBmb3VuZEZ1bmNbMV07XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiB0ZW1wO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZmluZEJ5RmluZGVyKHJlcSwgZmluZGVyID0ge30pIHtcclxuICBjb25zdCBkZWZhdWx0RXhwb3J0ID0gISFmaW5kZXI/LmZpbHRlcj8uZXhwb3J0O1xyXG4gIGxldCBmb3VuZCA9IGZpbmQocmVxLCBmaW5kZXJUb0ZpbHRlcihmaW5kZXIpLCB7IGRlZmF1bHRFeHBvcnQsIGFsbDogdHJ1ZSB9KS5maW5kKGkgPT4gaSAhPT0gZ2xvYmFsVGhpcy53aW5kb3cgfHwgaT8uZXhwb3J0cyAhPT0gZ2xvYmFsVGhpcy53aW5kb3cpO1xyXG5cclxuICBpZiAoIWZvdW5kKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgaWYgKGZpbmRlci5wYXRoPy5iZWZvcmUpIGZvdW5kID0gKEFycmF5LmlzQXJyYXkoZmluZGVyLnBhdGguYmVmb3JlKSA/IGZpbmRlci5wYXRoLmJlZm9yZS5tYXAoaSA9PiBfLmdldChmb3VuZCwgaSkpLmZpbmQoaSA9PiBpKSA6IF8uZ2V0KGZvdW5kLCBmaW5kZXIucGF0aC5iZWZvcmUpKSB8fCBmb3VuZDtcclxuICBpZiAoZmluZGVyLmFzc2lnbikgZm91bmQgPSBPYmplY3QuYXNzaWduKHt9LCBmb3VuZCk7XHJcblxyXG4gIGlmICghZm91bmQpIHJldHVybiBudWxsO1xyXG5cclxuICBpZiAoZmluZGVyLm1hcCkgZm91bmQgPSBmaW5kZXJNYXAoZm91bmQsIGZpbmRlci5tYXApO1xyXG5cclxuICBpZiAoZmluZGVyLnBhdGg/LmFmdGVyKSBmb3VuZCA9IChBcnJheS5pc0FycmF5KGZpbmRlci5wYXRoLmFmdGVyKSA/IGZpbmRlci5wYXRoLmFmdGVyLm1hcChpID0+IF8uZ2V0KGZvdW5kLCBpKSkuZmluZChpID0+IGkpIDogXy5nZXQoZm91bmQsIGZpbmRlci5wYXRoLmFmdGVyKSkgfHwgZm91bmQ7XHJcblxyXG4gIHJldHVybiBmb3VuZDtcclxufVxyXG5cclxuXHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbGF6eUZpbmRCeUZpbmRlcihmaW5kZXIgPSB7fSkge1xyXG4gIGxldCBmb3VuZCA9IGF3YWl0IGxhenlGaW5kKGZpbmRlclRvRmlsdGVyKGZpbmRlciksIHsgc2VhcmNoRXhwb3J0czogZmFsc2UgfSk7XHJcblxyXG4gIGlmICghZm91bmQpIHJldHVybiBudWxsO1xyXG5cclxuICBpZiAoZmluZGVyLnBhdGg/LmJlZm9yZSkgZm91bmQgPSAoQXJyYXkuaXNBcnJheShmaW5kZXIucGF0aC5iZWZvcmUpID8gZmluZGVyLnBhdGguYmVmb3JlLm1hcChpID0+IF8uZ2V0KGZvdW5kLCBpKSkuZmluZChpID0+IGkpIDogXy5nZXQoZm91bmQsIGZpbmRlci5wYXRoLmJlZm9yZSkpIHx8IGZvdW5kO1xyXG4gIGlmIChmaW5kZXIuYXNzaWduKSBmb3VuZCA9IE9iamVjdC5hc3NpZ24oe30sIGZvdW5kKTtcclxuXHJcbiAgaWYgKCFmb3VuZCkgcmV0dXJuIG51bGw7XHJcblxyXG4gIGlmIChmaW5kZXIubWFwKSBmb3VuZCA9IGZpbmRlck1hcChmb3VuZCwgZmluZGVyLm1hcCk7XHJcblxyXG4gIGlmIChmaW5kZXIucGF0aD8uYWZ0ZXIpIGZvdW5kID0gKEFycmF5LmlzQXJyYXkoZmluZGVyLnBhdGguYWZ0ZXIpID8gZmluZGVyLnBhdGguYWZ0ZXIubWFwKGkgPT4gXy5nZXQoZm91bmQsIGkpKS5maW5kKGkgPT4gaSkgOiBfLmdldChmb3VuZCwgZmluZGVyLnBhdGguYWZ0ZXIpKSB8fCBmb3VuZDtcclxuXHJcbiAgcmV0dXJuIGZvdW5kO1xyXG59IiwgImltcG9ydCAqIGFzIGNvbXBsZXhGaW5kZXIgZnJvbSBcIi4vcmF3L2NvbXBsZXgtZmluZGVyLmpzXCI7XHJcblxyXG5jb25zdCBkZWZhdWx0QmVmb3JlID0gW1xyXG4gIFwiZXhwb3J0cy5aXCIsXHJcbiAgXCJleHBvcnRzLlpQXCIsXHJcbiAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICBcImV4cG9ydHNcIlxyXG5dO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIF9fY2FjaGVfXzoge30sXHJcbiAgZ2V0IHJlcXVpcmUoKSB7XHJcbiAgICBpZiAodGhpcy5fX2NhY2hlX18ucmVxdWlyZSkgcmV0dXJuIHRoaXMuX19jYWNoZV9fLnJlcXVpcmU7XHJcbiAgICBsZXQgcmVxSWQgPSBgQWNvcmRXZWJwYWNrTW9kdWxlcyR7RGF0ZS5ub3coKX1gO1xyXG4gICAgY29uc3QgcmVxID0gd2luZG93LndlYnBhY2tDaHVua2Rpc2NvcmRfYXBwLnB1c2goW1tyZXFJZF0sIHt9LCByZXEgPT4gcmVxXSk7XHJcbiAgICBkZWxldGUgcmVxLm1bcmVxSWRdO1xyXG4gICAgZGVsZXRlIHJlcS5jW3JlcUlkXTtcclxuICAgIHdpbmRvdy53ZWJwYWNrQ2h1bmtkaXNjb3JkX2FwcC5wb3AoKTtcclxuICAgIHRoaXMuX19jYWNoZV9fLnJlcXVpcmUgPSByZXE7XHJcbiAgICByZXR1cm4gcmVxO1xyXG4gIH0sXHJcbiAgZmluZChmaWx0ZXIsIGNvbmZpZyA9IHt9KSB7XHJcbiAgICByZXR1cm4gY29tcGxleEZpbmRlci5maW5kKHRoaXMucmVxdWlyZSwgY29tcGxleEZpbmRlci53cmFwRmlsdGVyKGZpbHRlciksIGNvbmZpZyk7XHJcbiAgfSxcclxuICBsYXp5RmluZChmaWx0ZXIsIGNvbmZpZyA9IHt9KSB7XHJcbiAgICByZXR1cm4gY29tcGxleEZpbmRlci5sYXp5RmluZChjb21wbGV4RmluZGVyLndyYXBGaWx0ZXIoZmlsdGVyKSwgY29uZmlnKTtcclxuICB9LFxyXG4gIGxhenlGaW5kQnlGaW5kZXIoZmluZGVyKSB7XHJcbiAgICByZXR1cm4gY29tcGxleEZpbmRlci5sYXp5RmluZEJ5RmluZGVyKGZpbmRlcik7XHJcbiAgfSxcclxuICBmaWx0ZXIoZmlsdGVyLCBjb25maWcgPSB7fSkge1xyXG4gICAgcmV0dXJuIGNvbXBsZXhGaW5kZXIuZmluZCh0aGlzLnJlcXVpcmUsIGNvbXBsZXhGaW5kZXIud3JhcEZpbHRlcihmaWx0ZXIpLCB7IC4uLmNvbmZpZywgYWxsOiB0cnVlIH0pO1xyXG4gIH0sXHJcbiAgZmluZEJ5RmluZGVyKGZpbmRlcikge1xyXG4gICAgcmV0dXJuIGNvbXBsZXhGaW5kZXIuZmluZEJ5RmluZGVyKHRoaXMucmVxdWlyZSwgZmluZGVyKTtcclxuICB9LFxyXG4gIGZpbmRCeVN0cmluZ1ZhbHVlcyguLi5zdHJpbmdWYWx1ZXMpIHtcclxuICAgIHJldHVybiB0aGlzLmZpbmQoKGEpID0+IHsgbGV0IHZhID0gT2JqZWN0LnZhbHVlcyhhKTsgcmV0dXJuIHN0cmluZ1ZhbHVlcy5ldmVyeSh4ID0+IHZhLnNvbWUoeSA9PiB0eXBlb2YgeSA9PSBcInN0cmluZ1wiICYmIHkuaW5jbHVkZXMoeCkpKSB9KT8uZXhwb3J0cztcclxuICB9LFxyXG4gIGZpbmRCeVByb3BlcnRpZXMoLi4ucHJvcHMpIHtcclxuICAgIHJldHVybiB0aGlzLmZpbmRCeUZpbmRlcih7XHJcbiAgICAgIGZpbHRlcjoge1xyXG4gICAgICAgIGV4cG9ydDogZmFsc2UsXHJcbiAgICAgICAgaW46IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIGJ5OiBbcHJvcHNdXHJcbiAgICAgIH0sXHJcbiAgICAgIHBhdGg6IHtcclxuICAgICAgICBiZWZvcmU6IGRlZmF1bHRCZWZvcmVcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSxcclxuICBmaW5kQnlQcm90b3R5cGVzKC4uLnByb3BzKSB7XHJcbiAgICByZXR1cm4gdGhpcy5maW5kQnlGaW5kZXIoe1xyXG4gICAgICBmaWx0ZXI6IHtcclxuICAgICAgICBleHBvcnQ6IGZhbHNlLFxyXG4gICAgICAgIGluOiBcInByb3RvdHlwZXNcIixcclxuICAgICAgICBieTogW3Byb3BzXVxyXG4gICAgICB9LFxyXG4gICAgICBwYXRoOiB7XHJcbiAgICAgICAgYmVmb3JlOiBkZWZhdWx0QmVmb3JlXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgZmluZEJ5U3RyaW5ncyguLi5wcm9wcykge1xyXG4gICAgcmV0dXJuIHRoaXMuZmluZEJ5RmluZGVyKHtcclxuICAgICAgZmlsdGVyOiB7XHJcbiAgICAgICAgZXhwb3J0OiBmYWxzZSxcclxuICAgICAgICBpbjogXCJzdHJpbmdzXCIsXHJcbiAgICAgICAgYnk6IFtwcm9wc11cclxuICAgICAgfSxcclxuICAgICAgcGF0aDoge1xyXG4gICAgICAgIGJlZm9yZTogZGVmYXVsdEJlZm9yZVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9LFxyXG59OyIsICJpbXBvcnQgY29tbW9uRGF0YSBmcm9tICcuLi8uLi9kYXRhL2NvbW1vbi5qc29uJztcclxuaW1wb3J0IHdlYnBhY2sgZnJvbSAnLi93ZWJwYWNrLmpzJztcclxuXHJcblxyXG5mdW5jdGlvbiBtYXBPYmplY3QodGVtcCwgaW5wKSB7XHJcbiAgaWYgKCF0ZW1wPy5fX2NhY2hlX18pIHRlbXAuX19jYWNoZV9fID0ge307XHJcbiAgZm9yIChjb25zdCBrZXkgaW4gaW5wKSB7XHJcbiAgICBpZiAoaW5wPy5ba2V5XT8uX18gPT09IHRydWUpIHtcclxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRlbXAsIGtleSwge1xyXG4gICAgICAgIGdldCgpIHtcclxuICAgICAgICAgIGlmICh0ZW1wLl9fY2FjaGVfX1trZXldKSByZXR1cm4gdGVtcC5fX2NhY2hlX19ba2V5XTtcclxuICAgICAgICAgIHJldHVybiB0ZW1wLl9fY2FjaGVfX1trZXldID0gd2VicGFjay5maW5kQnlGaW5kZXIoaW5wW2tleV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICh0eXBlb2YgdGVtcFtrZXldID09PSBcInVuZGVmaW5lZFwiKSB0ZW1wW2tleV0gPSB7fTtcclxuICAgICAgbWFwT2JqZWN0KHRlbXBba2V5XSwgaW5wW2tleV0pO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuXHJcbmxldCBjb21tb24gPSB7XHJcbiAgX19jYWNoZV9fOiB7fSxcclxuICBMYXllckFjdGlvbnM6IHtcclxuICAgIHB1c2goY29tcG9uZW50KSB7XHJcbiAgICAgIGNvbW1vbi5GbHV4RGlzcGF0Y2hlci5kaXNwYXRjaCh7XHJcbiAgICAgICAgdHlwZTogXCJMQVlFUl9QVVNIXCIsXHJcbiAgICAgICAgY29tcG9uZW50XHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIHBvcCgpIHtcclxuICAgICAgY29tbW9uLkZsdXhEaXNwYXRjaGVyLmRpc3BhdGNoKHtcclxuICAgICAgICB0eXBlOiBcIkxBWUVSX1BPUFwiXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIHBvcEFsbCgpIHtcclxuICAgICAgY29tbW9uLkZsdXhEaXNwYXRjaGVyLmRpc3BhdGNoKHtcclxuICAgICAgICB0eXBlOiBcIkxBWUVSX1BPUF9BTExcIlxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9LFxyXG59O1xyXG5tYXBPYmplY3QoY29tbW9uLCBjb21tb25EYXRhLmNvbW1vbik7XHJcbntcclxuICBsZXQgcGF0aHMgPSBbXHJcbiAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgXCJleHBvcnRzXCJcclxuICBdO1xyXG4gIHdlYnBhY2suZmlsdGVyKChpKSA9PiBpPy5nZXROYW1lPy4oKT8uZW5kc1dpdGg/LihcIlN0b3JlXCIpLCB7IGRlZmF1bHRFeHBvcnQ6IGZhbHNlIH0pLmZvckVhY2goKG0pID0+IHtcclxuICAgIGxldCBvYmogPSBwYXRocy5tYXAocGF0aCA9PiBfLmdldChtLCBwYXRoKSkuZmluZChpID0+IGkpO1xyXG4gICAgaWYgKCFvYmopIHJldHVybjtcclxuICAgIGxldCBuYW1lID0gb2JqPy5nZXROYW1lPy4oKTtcclxuICAgIGlmICghbmFtZSkgcmV0dXJuO1xyXG4gICAgaWYgKGNvbW1vbltuYW1lXSkgcmV0dXJuO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb21tb24sIG5hbWUsIHtcclxuICAgICAgZ2V0KCkge1xyXG4gICAgICAgIGlmIChjb21tb24uX19jYWNoZV9fW25hbWVdKSByZXR1cm4gY29tbW9uLl9fY2FjaGVfX1tuYW1lXTtcclxuICAgICAgICByZXR1cm4gY29tbW9uLl9fY2FjaGVfX1tuYW1lXSA9IG9iajtcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9KVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb21tb247IiwgImltcG9ydCBjb21tb24gZnJvbSBcIi4vY29tbW9uLmpzXCI7XHJcbmltcG9ydCB3ZWJwYWNrIGZyb20gXCIuL3dlYnBhY2suanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBjb21tb24sXHJcbiAgd2VicGFjayxcclxuICByZXF1aXJlOiBnbG9iYWxUaGlzW1wiPFBSRUxPQURfS0VZPlwiXS5yZXF1aXJlLFxyXG4gIG5hdGl2ZTogRGlzY29yZE5hdGl2ZSxcclxufSIsICJpbXBvcnQgbW9kdWxlcyBmcm9tIFwiLi4vbW9kdWxlcy9pbmRleC5qc1wiXHJcbmltcG9ydCB1dGlscyBmcm9tIFwiLi4vdXRpbHMvaW5kZXguanNcIjtcclxuXHJcbmNvbnN0IEJBU0VfVVJMID0gXCJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vYWNvcmQtc3RhbmRhbG9uZS9hc3NldHMvbWFpbi9pMThuXCI7XHJcbmNvbnN0IG5vU3RvcmUgPSB7IGNhY2hlOiBcIm5vLXN0b3JlXCIgfTtcclxuXHJcblxyXG5jb25zdCBvdXQgPSB7XHJcbiAgX19jYWNoZV9fOiB7XHJcbiAgICBsb2NhbGVJZHM6IFtdLFxyXG4gICAgbG9jYWxpemF0aW9uczoge31cclxuICB9LFxyXG4gIGdldCBsb2NhbGUoKSB7XHJcbiAgICByZXR1cm4gbW9kdWxlcy5jb21tb24uaTE4bi5fcmVxdWVzdGVkTG9jYWxlO1xyXG4gIH0sXHJcbiAgZ2V0KGtleSkge1xyXG4gICAgY2hlY2soKTtcclxuICAgIHJldHVybiBvdXQuX19jYWNoZV9fLmxvY2FsaXphdGlvbnNbb3V0LmxvY2FsZV0/LltrZXldXHJcbiAgICAgIHx8IG91dC5fX2NhY2hlX18ubG9jYWxpemF0aW9ucy5kZWZhdWx0Py5ba2V5XVxyXG4gICAgICB8fCBtb2R1bGVzLmNvbW1vbi5pMThuLk1lc3NhZ2VzW2tleV1cclxuICAgICAgfHwga2V5O1xyXG4gIH0sXHJcbiAgbWVzc2FnZXM6IG5ldyBQcm94eSh7fSwge1xyXG4gICAgZ2V0KF8sIHByb3ApIHtcclxuICAgICAgcmV0dXJuIG91dC5nZXQocHJvcCk7XHJcbiAgICB9XHJcbiAgfSksXHJcbiAgbG9jYWxpemUoc3RyLCAuLi5hcmdzKSB7XHJcbiAgICBpZiAodHlwZW9mIHN0ciA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIHV0aWxzLmZvcm1hdChzdHIsIC4uLmFyZ3MpO1xyXG4gICAgbGV0IHZhbCA9IHN0cj8uW291dC5sb2NhbGVdXHJcbiAgICAgIHx8IHN0cj8uZGVmYXVsdFxyXG4gICAgICB8fCBPYmplY3QudmFsdWVzKHN0cilbMF07XHJcbiAgICBpZiAoIXZhbCkgcmV0dXJuIG51bGw7XHJcbiAgICByZXR1cm4gdXRpbHMuZm9ybWF0KHZhbCwgLi4uYXJncyk7XHJcbiAgfSxcclxuICBmb3JtYXQoa2V5LCAuLi5hcmdzKSB7XHJcbiAgICByZXR1cm4gdXRpbHMuZm9ybWF0KG91dC5nZXQoa2V5KSwgLi4uYXJncyk7XHJcbiAgfVxyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBjaGVjaygpIHtcclxuICBjb25zdCBsb2NhbGUgPSBvdXQubG9jYWxlO1xyXG4gIGlmICghb3V0Ll9fY2FjaGVfXy5sb2NhbGVJZHMubGVuZ3RoKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBvdXQuX19jYWNoZV9fLmxvY2FsZUlkcyA9IGF3YWl0IChhd2FpdCBmZXRjaChgJHtCQVNFX1VSTH0vbG9jYWxlcy5qc29uYCwgbm9TdG9yZSkpLmpzb24oKTtcclxuICAgIH0gY2F0Y2ggeyB9XHJcbiAgICB0cnkge1xyXG4gICAgICBvdXQuX19jYWNoZV9fLmxvY2FsaXphdGlvbnMuZGVmYXVsdCA9IGF3YWl0IChhd2FpdCBmZXRjaChgJHtCQVNFX1VSTH0vZGVmYXVsdC5qc29uYCwgbm9TdG9yZSkpLmpzb24oKTtcclxuICAgIH0gY2F0Y2ggeyB9XHJcbiAgfVxyXG4gIGlmIChcclxuICAgIG91dC5fX2NhY2hlX18ubG9jYWxlSWRzLmluY2x1ZGVzKGxvY2FsZSlcclxuICAgICYmICFvdXQuX19jYWNoZV9fLmxvY2FsaXphdGlvbnM/Lltsb2NhbGVdXHJcbiAgKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBvdXQuX19jYWNoZV9fLmxvY2FsaXphdGlvbnNbbG9jYWxlXSA9IGF3YWl0IChhd2FpdCBmZXRjaChgJHtCQVNFX1VSTH0vJHtsb2NhbGV9Lmpzb25gLCBub1N0b3JlKSkuanNvbigpO1xyXG4gICAgfSBjYXRjaCB7IH07XHJcbiAgfVxyXG59XHJcblxyXG5jaGVjaygpO1xyXG5leHBvcnQgZGVmYXVsdCBvdXQ7IiwgImltcG9ydCBtb2R1bGVzIGZyb20gXCIuLi9hcGkvbW9kdWxlcy9pbmRleC5qc1wiO1xyXG5pbXBvcnQgaTE4biBmcm9tIFwiLi4vYXBpL2kxOG4vaW5kZXguanNcIjtcclxuXHJcbmxldCBpc0Nvbm5lY3Rpb25PcGVuID0gZmFsc2U7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gd2FpdFVudGlsQ29ubmVjdGlvbk9wZW4oKSB7XHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICBpZiAoaXNDb25uZWN0aW9uT3BlbikgcmV0dXJuIHJlc29sdmUodHJ1ZSk7XHJcbiAgICBmdW5jdGlvbiBvbkV2ZW50KCkge1xyXG4gICAgICBtb2R1bGVzLmNvbW1vbi5GbHV4RGlzcGF0Y2hlci51bnN1YnNjcmliZShcIkNPTk5FQ1RJT05fT1BFTlwiLCBvbkV2ZW50KTtcclxuICAgICAgaXNDb25uZWN0aW9uT3BlbiA9IHRydWU7XHJcbiAgICAgIHJlc29sdmUodHJ1ZSk7XHJcbiAgICB9XHJcbiAgICBtb2R1bGVzLmNvbW1vbi5GbHV4RGlzcGF0Y2hlci5zdWJzY3JpYmUoXCJDT05ORUNUSU9OX09QRU5cIiwgb25FdmVudCk7XHJcbiAgfSk7XHJcbn1cclxuIiwgImltcG9ydCBsb2dnZXIgZnJvbSBcIi4uL2FwaS91dGlscy9sb2dnZXIuanNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBCYXNpY0V2ZW50RW1pdHRlciB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAvKiogQHR5cGUge01hcDxzdHJpbmcsIE1hcDwoLi4uYXJnczogYW55W10pPT52b2lkLCB7b25jZTogYm9vbGVhbn0+Pn0gKi9cclxuICAgIHRoaXMubGlzdGVuZXJzID0gbmV3IE1hcCgpO1xyXG4gIH1cclxuXHJcbiAgX3ByZXBhcmVMaXN0ZW5lcnNNYXAoZXZlbnROYW1lKSB7XHJcbiAgICBpZiAoIXRoaXMubGlzdGVuZXJzLmhhcyhldmVudE5hbWUpKVxyXG4gICAgICB0aGlzLmxpc3RlbmVycy5zZXQoZXZlbnROYW1lLCBuZXcgTWFwKCkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50TmFtZVxyXG4gICAqIEBwYXJhbSB7KC4uLmFyZ3M6IGFueVtdKT0+dm9pZH0gbGlzdGVuZXJcclxuICAgKi9cclxuICBvbihldmVudE5hbWUsIGxpc3RlbmVyKSB7XHJcbiAgICB0aGlzLl9wcmVwYXJlTGlzdGVuZXJzTWFwKGV2ZW50TmFtZSk7XHJcbiAgICB0aGlzLmxpc3RlbmVycy5nZXQoZXZlbnROYW1lKS5zZXQobGlzdGVuZXIsIHsgb25jZTogZmFsc2UgfSk7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICB0aGlzLmxpc3RlbmVycy5nZXQoZXZlbnROYW1lKS5kZWxldGUobGlzdGVuZXIpO1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudE5hbWVcclxuICAgKiBAcGFyYW0geyguLi5hcmdzOiBhbnlbXSk9PnZvaWR9IGxpc3RlbmVyXHJcbiAgICovXHJcbiAgb25jZShldmVudE5hbWUsIGxpc3RlbmVyKSB7XHJcbiAgICB0aGlzLl9wcmVwYXJlTGlzdGVuZXJzTWFwKGV2ZW50TmFtZSk7XHJcbiAgICB0aGlzLmxpc3RlbmVycy5nZXQoZXZlbnROYW1lKT8uc2V0KGxpc3RlbmVyLCB7IG9uY2U6IHRydWUgfSk7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICB0aGlzLmxpc3RlbmVycy5nZXQoZXZlbnROYW1lKS5kZWxldGUobGlzdGVuZXIpO1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nP30gZXZlbnROYW1lXHJcbiAgICogQHBhcmFtIHsoKC4uLmFyZ3M6IGFueVtdKT0+dm9pZCk/fSBsaXN0ZW5lclxyXG4gICAqL1xyXG4gIG9mZihldmVudE5hbWUsIGxpc3RlbmVyKSB7XHJcbiAgICBpZiAoIWV2ZW50TmFtZSkgcmV0dXJuICh0aGlzLmxpc3RlbmVycyA9IG5ldyBNYXAoKSk7XHJcbiAgICBpZiAoIWxpc3RlbmVyKSByZXR1cm4gdGhpcy5saXN0ZW5lcnM/LmRlbGV0ZShldmVudE5hbWUpO1xyXG4gICAgdGhpcy5saXN0ZW5lcnMuZ2V0KGV2ZW50TmFtZSk/LmRlbGV0ZShsaXN0ZW5lcik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnROYW1lXHJcbiAgICogQHBhcmFtICB7Li4uYW55fSBhcmdzXHJcbiAgICovXHJcbiAgZW1pdChldmVudE5hbWUsIC4uLmFyZ3MpIHtcclxuICAgIGlmICghdGhpcy5saXN0ZW5lcnMuaGFzKGV2ZW50TmFtZSkpIHJldHVybjtcclxuICAgIGxldCBldmVudE1hcCA9IHRoaXMubGlzdGVuZXJzLmdldChldmVudE5hbWUpO1xyXG4gICAgZXZlbnRNYXAuZm9yRWFjaCgoeyBvbmNlIH0sIGxpc3RlbmVyKSA9PiB7XHJcbiAgICAgIGlmIChvbmNlKSBldmVudE1hcD8uZGVsZXRlKGxpc3RlbmVyKTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBsaXN0ZW5lciguLi5hcmdzKTtcclxuICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgIGxvZ2dlci5lcnJvcihgRXJyb3Igd2hpbGUgZW1pdHRpbmcgJHtldmVudE5hbWV9IGV2ZW50LmAsIGUpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn07XHJcbiIsICJpbXBvcnQgeyBCYXNpY0V2ZW50RW1pdHRlciB9IGZyb20gXCIuLi8uLi9saWIvQmFzaWNFdmVudEVtaXR0ZXIuanNcIjtcclxuXHJcbmNvbnN0IGV2ZW50cyA9IG5ldyBCYXNpY0V2ZW50RW1pdHRlcigpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZXZlbnRzOyIsICJpbXBvcnQgZXZlbnRzIGZyb20gXCIuLi9ldmVudHNcIjtcclxuaW1wb3J0IHdlYnBhY2sgZnJvbSBcIi4uL21vZHVsZXMvd2VicGFjay5qc1wiO1xyXG5cclxuY29uc3Qgc2Nyb2xsYmFyQ2xhc3NlcyA9IHdlYnBhY2suZmluZEJ5UHJvcGVydGllcyhcInNjcm9sbGJhckdob3N0SGFpcmxpbmVcIiwgXCJzcGlubmVyXCIpO1xyXG5cclxuY29uc3QgZm9ybWF0UmVnZXhlcyA9IHtcclxuICBib2xkOiAvXFwqXFwqKFteKl0rKVxcKlxcKi9nLFxyXG4gIGl0YWxpYzogL1xcKihbXipdKylcXCovZyxcclxuICB1bmRlcmxpbmU6IC9cXF8oW14qXSspXFxfL2csXHJcbiAgc3RyaWtlOiAvXFx+XFx+KFteKl0rKVxcflxcfi9nLFxyXG4gIHVybDogLyhcXGIoaHR0cHM/fGZ0cHxmaWxlKTpcXC9cXC9bLUEtWjAtOSsmQCNcXC8lPz1+X3whOiwuO10qWy1BLVowLTkrJkAjXFwvJT1+X3xdKS9pZyxcclxuICBpbmxpbmU6IC9cXGAoW14qXSspXFxgL2csXHJcbiAgY29kZWJsb2NrU2luZ2xlOiAvXFxgXFxgXFxgKFteKl0rKVxcYFxcYFxcYC9nLFxyXG4gIGNvZGVibG9ja011bHRpOiAvXFxgXFxgXFxgKFxcdyspXFxuKCg/Oig/IVxcYFxcYFxcYClbXFxzXFxTXSkqKVxcYFxcYFxcYC9nXHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgcGFyc2UoaHRtbCkge1xyXG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBkaXYuaW5uZXJIVE1MID0gaHRtbDtcclxuICAgIHJldHVybiBkaXYuZmlyc3RFbGVtZW50Q2hpbGQ7XHJcbiAgfSxcclxuICB0b0NTU1Byb3Aobykge1xyXG4gICAgbGV0IGVsbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBPYmplY3QuZW50cmllcyhvKS5mb3JFYWNoKChpKSA9PiB7XHJcbiAgICAgIGlmIChlbG0uc3R5bGUuaGFzT3duUHJvcGVydHkoaVswXSkpIHtcclxuICAgICAgICBlbG0uc3R5bGVbaVswXV0gPSBpWzFdO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGVsbS5zdHlsZS5zZXRQcm9wZXJ0eShpWzBdLCBpWzFdKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gZWxtLmdldEF0dHJpYnV0ZShcInN0eWxlXCIpO1xyXG4gIH0sXHJcbiAgdG9IVE1MUHJvcHMobykge1xyXG4gICAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKG8pXHJcbiAgICAgIC5tYXAoXHJcbiAgICAgICAgKGkpID0+XHJcbiAgICAgICAgICBgJHtpWzBdLnJlcGxhY2UoLyArLywgXCItXCIpfT1cIiR7aVswXSA9PSBcInN0eWxlXCIgJiYgdHlwZW9mIGlbMV0gIT0gXCJzdHJpbmdcIlxyXG4gICAgICAgICAgICA/IHRoaXMudG9DU1NQcm9wKGlbMV0pXHJcbiAgICAgICAgICAgIDogdGhpcy5lc2NhcGVIVE1MKGlbMV0pfVwiYFxyXG4gICAgICApXHJcbiAgICAgIC5qb2luKFwiIFwiKTtcclxuICB9LFxyXG4gIGVzY2FwZShodG1sKSB7XHJcbiAgICByZXR1cm4gbmV3IE9wdGlvbihodG1sKS5pbm5lckhUTUw7XHJcbiAgfSxcclxuICAvKipcclxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsbSBcclxuICAgKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IHNlbGVjdG9yT3JOdW1iZXIgXHJcbiAgICogQHJldHVybnMge0VsZW1lbnRbXX1cclxuICAgKi9cclxuICBwYXJlbnRzKGVsbSwgc2VsZWN0b3JPck51bWJlcikge1xyXG4gICAgbGV0IHBhcmVudHMgPSBbXTtcclxuICAgIGlmICh0eXBlb2Ygc2VsZWN0b3JPck51bWJlciA9PT0gXCJudW1iZXJcIikge1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlbGVjdG9yT3JOdW1iZXI7IGkrKykge1xyXG4gICAgICAgIGlmIChlbG0ucGFyZW50RWxlbWVudCkge1xyXG4gICAgICAgICAgZWxtID0gZWxtLnBhcmVudEVsZW1lbnQ7XHJcbiAgICAgICAgICBwYXJlbnRzLnB1c2goZWxtKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHdoaWxlIChlbG0ucGFyZW50RWxlbWVudCAmJiBlbG0ucGFyZW50RWxlbWVudC5jbG9zZXN0KHNlbGVjdG9yT3JOdW1iZXIpKSB7XHJcbiAgICAgICAgZWxtID0gZWxtLnBhcmVudEVsZW1lbnQuY2xvc2VzdChzZWxlY3Rvck9yTnVtYmVyKTtcclxuICAgICAgICBwYXJlbnRzLnB1c2goZWxtKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBhcmVudHM7XHJcbiAgfSxcclxuICAvKipcclxuICAgKiBcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3IgXHJcbiAgICogQHBhcmFtIHsoZWxlbWVudDogSFRNTERpdkVsZW1lbnQpPT4oKCk9PnZvaWQpfSBjYiBcclxuICAgKiBAcmV0dXJucyB7KCk9PnZvaWR9XHJcbiAgICovXHJcbiAgcGF0Y2g6IChzZWxlY3RvciwgY2IpID0+XHJcbiAgICAoKCkgPT4ge1xyXG4gICAgICBmdW5jdGlvbiBub2RlQWRkZWQobm9kZSkge1xyXG4gICAgICAgIGlmICh0eXBlb2Ygbm9kZT8ucXVlcnlTZWxlY3RvckFsbCAhPSBcImZ1bmN0aW9uXCIpIHJldHVybjtcclxuICAgICAgICBub2RlLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpLmZvckVhY2goYXN5bmMgKGVsbSkgPT4ge1xyXG4gICAgICAgICAgaWYgKCFlbG0uYWNvcmQpIHtcclxuICAgICAgICAgICAgZWxtLmFjb3JkID0geyB1bm1vdW50OiBbXSwgcGF0Y2hlZDogbmV3IFNldCgpIH07XHJcbiAgICAgICAgICAgIGVsbS5jbGFzc0xpc3QuYWRkKFwiYWNvcmQtLXBhdGNoZWRcIik7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGVsbS5hY29yZC5wYXRjaGVkLmhhcyhjYikpIHJldHVybjtcclxuICAgICAgICAgIGVsbS5hY29yZC5wYXRjaGVkLmFkZChjYik7XHJcblxyXG4gICAgICAgICAgbGV0IHVuUGF0Y2hDYiA9IGF3YWl0IGNiKGVsbSk7XHJcbiAgICAgICAgICBpZiAodHlwZW9mIHVuUGF0Y2hDYiA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgICAgICBlbG0uYWNvcmQudW5tb3VudC5wdXNoKHVuUGF0Y2hDYik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGZ1bmN0aW9uIG5vZGVSZW1vdmVkKG5vZGUpIHtcclxuICAgICAgICBpZiAodHlwZW9mIG5vZGU/LnF1ZXJ5U2VsZWN0b3JBbGwgIT0gXCJmdW5jdGlvblwiKSByZXR1cm47XHJcbiAgICAgICAgbm9kZS5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKS5mb3JFYWNoKGFzeW5jIChlbG0pID0+IHtcclxuICAgICAgICAgIGlmICghZWxtLmFjb3JkKSByZXR1cm47XHJcbiAgICAgICAgICBlbG0uYWNvcmQudW5tb3VudC5mb3JFYWNoKChmKSA9PiBmKCkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKS5mb3JFYWNoKG5vZGVBZGRlZCk7XHJcblxyXG4gICAgICByZXR1cm4gZXZlbnRzLm9uKFxyXG4gICAgICAgIFwiRG9tTXV0YXRpb25cIixcclxuICAgICAgICAvKiogQHBhcmFtIHtNdXRhdGlvblJlY29yZH0gbXV0ICovKG11dCkgPT4ge1xyXG4gICAgICAgICAgaWYgKG11dC50eXBlID09PSBcImNoaWxkTGlzdFwiKSB7XHJcbiAgICAgICAgICAgIG11dC5hZGRlZE5vZGVzLmZvckVhY2gobm9kZUFkZGVkKTtcclxuICAgICAgICAgICAgbXV0LnJlbW92ZWROb2Rlcy5mb3JFYWNoKG5vZGVSZW1vdmVkKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICk7XHJcbiAgICB9KSgpLFxyXG4gIGZvcm1hdENvbnRlbnQobXNnKSB7XHJcbiAgICBpZiAoIW1zZykgcmV0dXJuICcnO1xyXG4gICAgY29uc3QgeyBib2xkLCBpdGFsaWMsIHVuZGVybGluZSwgc3RyaWtlLCBjb2RlYmxvY2tNdWx0aSwgY29kZWJsb2NrU2luZ2xlLCBpbmxpbmUsIHVybCB9ID0gZm9ybWF0UmVnZXhlcztcclxuXHJcbiAgICBjb25zdCBjb2RlQmxvY2tzTWFwID0gT2JqZWN0LmZyb21FbnRyaWVzKFtcclxuICAgICAgLi4uKG1zZy5tYXRjaEFsbChjb2RlYmxvY2tNdWx0aSkgfHwgW10pLCAuLi4obXNnLm1hdGNoQWxsKGNvZGVibG9ja1NpbmdsZSkgfHwgW10pXHJcbiAgICBdLm1hcChcclxuICAgICAgKFtfLCBjb2RlQmxvY2tPckNvZGUsIGNvZGVCbG9ja0NvbnRlbnRdLCBpKSA9PiB7XHJcbiAgICAgICAgbXNnID0gbXNnLnJlcGxhY2UoXywgYHt7Q09ERUJMT0NLXyR7aX19fWApO1xyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICBge3tDT0RFQkxPQ0tfJHtpfX19YCxcclxuICAgICAgICAgIGNvZGVCbG9ja0NvbnRlbnQgP1xyXG4gICAgICAgICAgICBgPHByZT48Y29kZSBjbGFzcz1cIiR7c2Nyb2xsYmFyQ2xhc3Nlcy5zY3JvbGxiYXJHaG9zdEhhaXJsaW5lfSBobGpzICR7Y29kZUJsb2NrT3JDb2RlfVwiIHN0eWxlPVwicG9zaXRpb246IHJlbGF0aXZlO1wiPiR7bW9kdWxlcy5jb21tb24uaGxqcy5oaWdobGlnaHQoY29kZUJsb2NrT3JDb2RlLCBjb2RlQmxvY2tDb250ZW50KS52YWx1ZX08L2NvZGU+PC9wcmU+YCA6XHJcbiAgICAgICAgICAgIGA8cHJlPjxjb2RlIGNsYXNzPVwiJHtzY3JvbGxiYXJDbGFzc2VzLnNjcm9sbGJhckdob3N0SGFpcmxpbmV9IGhsanNcIiBzdHlsZT1cInBvc2l0aW9uOiByZWxhdGl2ZTtcIj4ke2NvZGVCbG9ja09yQ29kZX08L2NvZGU+PC9wcmU+YFxyXG4gICAgICAgIF07XHJcbiAgICAgIH1cclxuICAgICkpO1xyXG5cclxuICAgIGNvbnN0IGlubGluZU1hcCA9IE9iamVjdC5mcm9tRW50cmllcyhcclxuICAgICAgWy4uLihtc2cubWF0Y2hBbGwoaW5saW5lKSB8fCBbXSldLm1hcChcclxuICAgICAgICAoW18sIGlubGluZUNvbnRlbnRdLCBpKSA9PiB7XHJcbiAgICAgICAgICBtc2cgPSBtc2cucmVwbGFjZShfLCBge3tJTkxJTkVfJHtpfX19YCk7XHJcbiAgICAgICAgICByZXR1cm4gW2B7e0lOTElORV8ke2l9fX1gLCBgPGNvZGUgY2xhc3M9XCJpbmxpbmVcIj4ke2lubGluZUNvbnRlbnR9PC9jb2RlPmBdO1xyXG4gICAgICAgIH1cclxuICAgICAgKVxyXG4gICAgKTtcclxuXHJcbiAgICBtc2cgPSBtc2cucmVwbGFjZShib2xkLCBcIjxiPiQxPC9iPlwiKVxyXG4gICAgICAucmVwbGFjZShpdGFsaWMsIFwiPGk+JDE8L2k+XCIpXHJcbiAgICAgIC5yZXBsYWNlKHVuZGVybGluZSwgXCI8VT4kMTwvVT5cIilcclxuICAgICAgLnJlcGxhY2Uoc3RyaWtlLCBcIjxzPiQxPC9zPlwiKVxyXG4gICAgICAucmVwbGFjZSh1cmwsICc8YSBocmVmPVwiJDFcIj4kMTwvYT4nKTtcclxuXHJcbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhjb2RlQmxvY2tzTWFwKSkge1xyXG4gICAgICBtc2cgPSBtc2cucmVwbGFjZShrZXksIHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhpbmxpbmVNYXApKSB7XHJcbiAgICAgIG1zZyA9IG1zZy5yZXBsYWNlKGtleSwgdmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBtc2c7XHJcbiAgfSxcclxuICByZXNvbHZlKGh0bWxPckVsbSkge1xyXG4gICAgaWYgKGh0bWxPckVsbSBpbnN0YW5jZW9mIEVsZW1lbnQpIHJldHVybiBodG1sT3JFbG07XHJcbiAgICByZXR1cm4gdGhpcy5wYXJzZShodG1sT3JFbG0pO1xyXG4gIH1cclxufVxyXG5cclxue1xyXG4gIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKG11dGF0aW9ucykgPT4ge1xyXG4gICAgbXV0YXRpb25zLmZvckVhY2goKG11dGF0aW9uKSA9PiB7XHJcbiAgICAgIGV2ZW50cy5lbWl0KFwiRG9tTXV0YXRpb25cIiwgbXV0YXRpb24pO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbiAgb2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudCwge1xyXG4gICAgYXR0cmlidXRlczogdHJ1ZSxcclxuICAgIGNoaWxkTGlzdDogdHJ1ZSxcclxuICAgIHN1YnRyZWU6IHRydWVcclxuICB9KTtcclxufSIsICIvLyB3ZSB1c2UgdGhpcyBhcnJheSBtdWx0aXBsZSB0aW1lc1xyXG5leHBvcnQgY29uc3QgcGF0Y2hUeXBlcyA9IFtcImFcIiwgXCJiXCIsIFwiaVwiXTtcclxuZXhwb3J0IGNvbnN0IHBhdGNoZWRPYmplY3RzID0gbmV3IE1hcCgpO1xyXG4iLCAiLy8gY2FsbHMgcmVsZXZhbnQgcGF0Y2hlcyBhbmQgcmV0dXJucyB0aGUgZmluYWwgcmVzdWx0XHJcbmltcG9ydCB7IHBhdGNoZWRPYmplY3RzIH0gZnJvbSBcIi4vc2hhcmVkLmpzXCI7XHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChmdW5jTmFtZSwgZnVuY1BhcmVudCwgZnVuY0FyZ3MsIFxyXG4vLyB0aGUgdmFsdWUgb2YgYHRoaXNgIHRvIGFwcGx5XHJcbmN0eHQsIFxyXG4vLyBpZiB0cnVlLCB0aGUgZnVuY3Rpb24gaXMgYWN0dWFsbHkgY29uc3RydWN0b3JcclxuaXNDb25zdHJ1Y3QpIHtcclxuICAgIGNvbnN0IHBhdGNoID0gcGF0Y2hlZE9iamVjdHMuZ2V0KGZ1bmNQYXJlbnQpPy5bZnVuY05hbWVdO1xyXG4gICAgLy8gVGhpcyBpcyBpbiB0aGUgZXZlbnQgdGhhdCB0aGlzIGZ1bmN0aW9uIGlzIGJlaW5nIGNhbGxlZCBhZnRlciBhbGwgcGF0Y2hlcyBhcmUgcmVtb3ZlZC5cclxuICAgIGlmICghcGF0Y2gpXHJcbiAgICAgICAgcmV0dXJuIGlzQ29uc3RydWN0XHJcbiAgICAgICAgICAgID8gUmVmbGVjdC5jb25zdHJ1Y3QoZnVuY1BhcmVudFtmdW5jTmFtZV0sIGZ1bmNBcmdzLCBjdHh0KVxyXG4gICAgICAgICAgICA6IGZ1bmNQYXJlbnRbZnVuY05hbWVdLmFwcGx5KGN0eHQsIGZ1bmNBcmdzKTtcclxuICAgIC8vIEJlZm9yZSBwYXRjaGVzXHJcbiAgICBmb3IgKGNvbnN0IGhvb2sgb2YgcGF0Y2guYi52YWx1ZXMoKSkge1xyXG4gICAgICAgIGNvbnN0IG1heWJlZnVuY0FyZ3MgPSBob29rLmNhbGwoY3R4dCwgZnVuY0FyZ3MpO1xyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KG1heWJlZnVuY0FyZ3MpKVxyXG4gICAgICAgICAgICBmdW5jQXJncyA9IG1heWJlZnVuY0FyZ3M7XHJcbiAgICB9XHJcbiAgICAvLyBJbnN0ZWFkIHBhdGNoZXNcclxuICAgIGxldCBpbnN0ZWFkUGF0Y2hlZEZ1bmMgPSAoLi4uYXJncykgPT4gaXNDb25zdHJ1Y3RcclxuICAgICAgICA/IFJlZmxlY3QuY29uc3RydWN0KHBhdGNoLm8sIGFyZ3MsIGN0eHQpXHJcbiAgICAgICAgOiBwYXRjaC5vLmFwcGx5KGN0eHQsIGFyZ3MpO1xyXG4gICAgZm9yIChjb25zdCBjYWxsYmFjayBvZiBwYXRjaC5pLnZhbHVlcygpKSB7XHJcbiAgICAgICAgY29uc3Qgb2xkUGF0Y2hGdW5jID0gaW5zdGVhZFBhdGNoZWRGdW5jO1xyXG4gICAgICAgIGluc3RlYWRQYXRjaGVkRnVuYyA9ICguLi5hcmdzKSA9PiBjYWxsYmFjay5jYWxsKGN0eHQsIGFyZ3MsIG9sZFBhdGNoRnVuYyk7XHJcbiAgICB9XHJcbiAgICBsZXQgd29ya2luZ1JldFZhbCA9IGluc3RlYWRQYXRjaGVkRnVuYyguLi5mdW5jQXJncyk7XHJcbiAgICAvLyBBZnRlciBwYXRjaGVzXHJcbiAgICBmb3IgKGNvbnN0IGhvb2sgb2YgcGF0Y2guYS52YWx1ZXMoKSlcclxuICAgICAgICB3b3JraW5nUmV0VmFsID0gaG9vay5jYWxsKGN0eHQsIGZ1bmNBcmdzLCB3b3JraW5nUmV0VmFsKSA/PyB3b3JraW5nUmV0VmFsO1xyXG4gICAgcmV0dXJuIHdvcmtpbmdSZXRWYWw7XHJcbn1cclxuIiwgImltcG9ydCB7IHBhdGNoZWRPYmplY3RzLCBwYXRjaFR5cGVzIH0gZnJvbSBcIi4vc2hhcmVkLmpzXCI7XHJcbmV4cG9ydCBmdW5jdGlvbiB1blBhdGNoKGZ1bmNQYXJlbnQsIGZ1bmNOYW1lLCBob29rSWQsIHR5cGUpIHtcclxuICAgIGNvbnN0IHBhdGNoZWRPYmplY3QgPSBwYXRjaGVkT2JqZWN0cy5nZXQoZnVuY1BhcmVudCk7XHJcbiAgICBjb25zdCBwYXRjaCA9IHBhdGNoZWRPYmplY3Q/LltmdW5jTmFtZV07XHJcbiAgICBpZiAoIXBhdGNoPy5bdHlwZV0uaGFzKGhvb2tJZCkpXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgcGF0Y2hbdHlwZV0uZGVsZXRlKGhvb2tJZCk7XHJcbiAgICAvLyBJZiB0aGVyZSBhcmUgbm8gbW9yZSBob29rcyBmb3IgZXZlcnkgdHlwZSwgcmVtb3ZlIHRoZSBwYXRjaFxyXG4gICAgaWYgKHBhdGNoVHlwZXMuZXZlcnkoKHQpID0+IHBhdGNoW3RdLnNpemUgPT09IDApKSB7XHJcbiAgICAgICAgLy8gcmVmbGVjdCBkZWZpbmVwcm9wZXJ0eSBpcyBsaWtlIG9iamVjdCBkZWZpbmVwcm9wZXJ0eVxyXG4gICAgICAgIC8vIGJ1dCBpbnN0ZWFkIG9mIGVycm9yaW5nIGl0IHJldHVybnMgaWYgaXQgd29ya2VkIG9yIG5vdC5cclxuICAgICAgICAvLyB0aGlzIGlzIG1vcmUgZWFzaWx5IG1pbmlmaWFibGUsIGhlbmNlIGl0cyB1c2UuIC0tIHNpbmtcclxuICAgICAgICBjb25zdCBzdWNjZXNzID0gUmVmbGVjdC5kZWZpbmVQcm9wZXJ0eShmdW5jUGFyZW50LCBmdW5jTmFtZSwge1xyXG4gICAgICAgICAgICB2YWx1ZTogcGF0Y2gubyxcclxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoIXN1Y2Nlc3MpXHJcbiAgICAgICAgICAgIGZ1bmNQYXJlbnRbZnVuY05hbWVdID0gcGF0Y2gubztcclxuICAgICAgICBkZWxldGUgcGF0Y2hlZE9iamVjdFtmdW5jTmFtZV07XHJcbiAgICB9XHJcbiAgICBpZiAoT2JqZWN0LmtleXMocGF0Y2hlZE9iamVjdCkubGVuZ3RoID09IDApXHJcbiAgICAgICAgcGF0Y2hlZE9iamVjdHMuZGVsZXRlKGZ1bmNQYXJlbnQpO1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHVuUGF0Y2hBbGwoKSB7XHJcbiAgICBmb3IgKGNvbnN0IFtwYXJlbnRPYmplY3QsIHBhdGNoZWRPYmplY3RdIG9mIHBhdGNoZWRPYmplY3RzLmVudHJpZXMoKSlcclxuICAgICAgICBmb3IgKGNvbnN0IGZ1bmNOYW1lIGluIHBhdGNoZWRPYmplY3QpXHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgaG9va1R5cGUgb2YgcGF0Y2hUeXBlcylcclxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaG9va0lkIG9mIHBhdGNoZWRPYmplY3RbZnVuY05hbWVdPy5baG9va1R5cGVdLmtleXMoKSA/PyBbXSlcclxuICAgICAgICAgICAgICAgICAgICB1blBhdGNoKHBhcmVudE9iamVjdCwgZnVuY05hbWUsIGhvb2tJZCwgaG9va1R5cGUpO1xyXG59XHJcbiIsICIvLyBjdXJyaWVkIC0gZ2V0UGF0Y2hGdW5jKFwiYmVmb3JlXCIpKC4uLilcclxuLy8gYWxsb3dzIHVzIHRvIGFwcGx5IGFuIGFyZ3VtZW50IHdoaWxlIGxlYXZpbmcgdGhlIHJlc3Qgb3BlbiBtdWNoIGNsZWFuZXIuXHJcbi8vIGZ1bmN0aW9uYWwgcHJvZ3JhbW1pbmcgc3RyaWtlcyBhZ2FpbiEgLS0gc2lua1xyXG5pbXBvcnQgaG9vayBmcm9tIFwiLi9ob29rLmpzXCI7XHJcbmltcG9ydCB7IHBhdGNoZWRPYmplY3RzIH0gZnJvbSBcIi4vc2hhcmVkLmpzXCI7XHJcbmltcG9ydCB7IHVuUGF0Y2ggfSBmcm9tIFwiLi91bi1wYXRjaC5qc1wiO1xyXG4vLyBjcmVhdGVzIGEgaG9vayBpZiBuZWVkZWQsIGVsc2UganVzdCBhZGRzIG9uZSB0byB0aGUgcGF0Y2hlcyBhcnJheVxyXG5leHBvcnQgZGVmYXVsdCAocGF0Y2hUeXBlKSA9PiAoZnVuY05hbWUsIGZ1bmNQYXJlbnQsIGNhbGxiYWNrLCBvbmVUaW1lID0gZmFsc2UpID0+IHtcclxuICAgIGlmICh0eXBlb2YgZnVuY1BhcmVudFtmdW5jTmFtZV0gIT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7ZnVuY05hbWV9IGlzIG5vdCBhIGZ1bmN0aW9uIGluICR7ZnVuY1BhcmVudC5jb25zdHJ1Y3Rvci5uYW1lfWApO1xyXG4gICAgaWYgKCFwYXRjaGVkT2JqZWN0cy5oYXMoZnVuY1BhcmVudCkpXHJcbiAgICAgICAgcGF0Y2hlZE9iamVjdHMuc2V0KGZ1bmNQYXJlbnQsIHt9KTtcclxuICAgIGNvbnN0IHBhcmVudEluamVjdGlvbnMgPSBwYXRjaGVkT2JqZWN0cy5nZXQoZnVuY1BhcmVudCk7XHJcbiAgICBpZiAoIXBhcmVudEluamVjdGlvbnNbZnVuY05hbWVdKSB7XHJcbiAgICAgICAgY29uc3Qgb3JpZ0Z1bmMgPSBmdW5jUGFyZW50W2Z1bmNOYW1lXTtcclxuICAgICAgICAvLyBub3RlIHRvIGZ1dHVyZSBtZSBvcHRpbWlzaW5nIGZvciBzaXplOiBleHRyYWN0aW5nIG5ldyBNYXAoKSB0byBhIGZ1bmMgaW5jcmVhc2VzIHNpemUgLS1zaW5rXHJcbiAgICAgICAgcGFyZW50SW5qZWN0aW9uc1tmdW5jTmFtZV0gPSB7XHJcbiAgICAgICAgICAgIG86IG9yaWdGdW5jLFxyXG4gICAgICAgICAgICBiOiBuZXcgTWFwKCksXHJcbiAgICAgICAgICAgIGk6IG5ldyBNYXAoKSxcclxuICAgICAgICAgICAgYTogbmV3IE1hcCgpLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29uc3QgcnVuSG9vayA9IChjdHh0LCBhcmdzLCBjb25zdHJ1Y3QpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcmV0ID0gaG9vayhmdW5jTmFtZSwgZnVuY1BhcmVudCwgYXJncywgY3R4dCwgY29uc3RydWN0KTtcclxuICAgICAgICAgICAgaWYgKG9uZVRpbWUpXHJcbiAgICAgICAgICAgICAgICB1bnBhdGNoVGhpc1BhdGNoKCk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXQ7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCByZXBsYWNlUHJveHkgPSBuZXcgUHJveHkob3JpZ0Z1bmMsIHtcclxuICAgICAgICAgICAgYXBwbHk6IChfLCBjdHh0LCBhcmdzKSA9PiBydW5Ib29rKGN0eHQsIGFyZ3MsIGZhbHNlKSxcclxuICAgICAgICAgICAgY29uc3RydWN0OiAoXywgYXJncykgPT4gcnVuSG9vayhvcmlnRnVuYywgYXJncywgdHJ1ZSksXHJcbiAgICAgICAgICAgIGdldDogKHRhcmdldCwgcHJvcCwgcmVjZWl2ZXIpID0+IHByb3AgPT0gXCJ0b1N0cmluZ1wiXHJcbiAgICAgICAgICAgICAgICA/IG9yaWdGdW5jLnRvU3RyaW5nLmJpbmQob3JpZ0Z1bmMpXHJcbiAgICAgICAgICAgICAgICA6IFJlZmxlY3QuZ2V0KHRhcmdldCwgcHJvcCwgcmVjZWl2ZXIpLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIHRoaXMgd29ya3MgYXJvdW5kIGJyZWFraW5nIHNvbWUgYXN5bmMgZmluZCBpbXBsZW1lbnRhdGlvbiB3aGljaCBsaXN0ZW5zIGZvciBhc3NpZ25zIHZpYSBwcm94eVxyXG4gICAgICAgIC8vIHNlZSBjb21tZW50IGluIHVucGF0Y2gudHNcclxuICAgICAgICBjb25zdCBzdWNjZXNzID0gUmVmbGVjdC5kZWZpbmVQcm9wZXJ0eShmdW5jUGFyZW50LCBmdW5jTmFtZSwge1xyXG4gICAgICAgICAgICB2YWx1ZTogcmVwbGFjZVByb3h5LFxyXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICghc3VjY2VzcylcclxuICAgICAgICAgICAgZnVuY1BhcmVudFtmdW5jTmFtZV0gPSByZXBsYWNlUHJveHk7XHJcbiAgICAgICAgZnVuY1BhcmVudFtmdW5jTmFtZV0uX19vcmlnaW5hbF9fID0gcGFyZW50SW5qZWN0aW9uc1tmdW5jTmFtZV0ubztcclxuICAgIH1cclxuICAgIGNvbnN0IGhvb2tJZCA9IFN5bWJvbCgpO1xyXG4gICAgY29uc3QgdW5wYXRjaFRoaXNQYXRjaCA9ICgpID0+IHVuUGF0Y2goZnVuY1BhcmVudCwgZnVuY05hbWUsIGhvb2tJZCwgcGF0Y2hUeXBlKTtcclxuICAgIHBhcmVudEluamVjdGlvbnNbZnVuY05hbWVdW3BhdGNoVHlwZV0uc2V0KGhvb2tJZCwgY2FsbGJhY2spO1xyXG4gICAgcmV0dXJuIHVucGF0Y2hUaGlzUGF0Y2g7XHJcbn07XHJcbiIsICJpbXBvcnQgZ2V0UGF0Y2hGdW5jIGZyb20gXCIuL2dldC1wYXRjaC1mdW5jLmpzXCI7XHJcbmltcG9ydCB7IHVuUGF0Y2hBbGwgfSBmcm9tIFwiLi91bi1wYXRjaC5qc1wiO1xyXG5pbXBvcnQgeyBwYXRjaGVkT2JqZWN0cyBhcyBwYXRjaGVkIH0gZnJvbSBcIi4vc2hhcmVkLmpzXCI7XHJcbmNvbnN0IGJlZm9yZSA9IGdldFBhdGNoRnVuYyhcImJcIik7XHJcbmNvbnN0IGluc3RlYWQgPSBnZXRQYXRjaEZ1bmMoXCJpXCIpO1xyXG5jb25zdCBhZnRlciA9IGdldFBhdGNoRnVuYyhcImFcIik7XHJcbmV4cG9ydCB7IGluc3RlYWQsIGJlZm9yZSwgYWZ0ZXIsIHVuUGF0Y2hBbGwsIHBhdGNoZWQgfTtcclxuIiwgImltcG9ydCAqIGFzIHNwaXRSb2FzdCBmcm9tIFwiLi4vLi4vbGliL3NwaXRyb2FzdC9kaXN0L2VzbVwiO1xyXG5cclxuZnVuY3Rpb24gcHJvcFJlcGxhY2VyKGNzcywgcHJvcHMgPSB7fSkge1xyXG4gIGNzcyA9IGNzcy5yZXBsYWNlKC92YXJcXCgtLWFjb3JkLS0oW1xcU1xcc10rKVxcKS9nLCAobWF0Y2gsIGdyb3VwMSkgPT4ge1xyXG4gICAgbGV0IHNwbGl0dGVkID0gZ3JvdXAxLnNwbGl0KFwiLFwiKTtcclxuICAgIGxldCBrZXkgPSBzcGxpdHRlZC5zaGlmdCgpLnRyaW0oKTtcclxuICAgIGxldCBkZWZhdWx0VmFsdWUgPSBzcGxpdHRlZC5qb2luKFwiLFwiKS50cmltKCk7XHJcbiAgICByZXR1cm4gcHJvcHNba2V5XSA/PyAoZGVmYXVsdFZhbHVlIHx8IG1hdGNoKTtcclxuICB9KTtcclxuICByZXR1cm4gY3NzO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgX19jYWNoZV9fOiB7XHJcbiAgICBwYXRjaGVkOiBzcGl0Um9hc3QucGF0Y2hlZCxcclxuICB9LFxyXG4gIGJlZm9yZTogc3BpdFJvYXN0LmJlZm9yZSxcclxuICBhZnRlcjogc3BpdFJvYXN0LmFmdGVyLFxyXG4gIGluc3RlYWQ6IHNwaXRSb2FzdC5pbnN0ZWFkLFxyXG4gIHVuUGF0Y2hBbGw6IHNwaXRSb2FzdC51blBhdGNoQWxsLFxyXG4gIGluamVjdENTUyhjc3MsIGN1c3RvbVByb3BzID0ge30pIHtcclxuICAgIGNvbnN0IHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xyXG4gICAgc3R5bGUuY2xhc3NOYW1lID0gYGFjb3JkLS1pbmplY3RlZC1jc3NgO1xyXG4gICAgc3R5bGUudGV4dENvbnRlbnQgPSBwcm9wUmVwbGFjZXIoY3NzLCBjdXN0b21Qcm9wcyk7XHJcbiAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcclxuXHJcbiAgICByZXR1cm4gKC4uLmFyZ3MpID0+IHtcclxuICAgICAgaWYgKHR5cGVvZiBhcmdzWzBdID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgc3R5bGUudGV4dENvbnRlbnQgPSBwcm9wUmVwbGFjZXIoYXJnc1swXSwgYXJnc1sxXSk7XHJcbiAgICAgICAgY3NzID0gYXJnc1swXTtcclxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYXJnc1swXSA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgIHN0eWxlLnRleHRDb250ZW50ID0gcHJvcFJlcGxhY2VyKGNzcywgYXJnc1swXSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc3R5bGU/LnJlbW92ZSgpO1xyXG4gICAgICAgIGNzcyA9IG51bGw7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfSxcclxuICB1blBhdGNoQWxsQ1NTKCkge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5hY29yZC0taW5qZWN0ZWQtY3NzXCIpLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgIGVsZW1lbnQucmVtb3ZlKCk7XHJcbiAgICB9KVxyXG4gIH1cclxufSIsICJleHBvcnQgZGVmYXVsdCBgXG5Aa2V5ZnJhbWVzIGFjb3JkTG9hZGluZ0ZhZGV7MCV7b3BhY2l0eTouMX0xMDAle29wYWNpdHk6Ljl9fS5hY29yZC0tc3RhcnR1cC1sb2FkaW5ne2FuaW1hdGlvbjphY29yZExvYWRpbmdGYWRlIC41cyBhbHRlcm5hdGUgaW5maW5pdGUgbGluZWFyO3Bvc2l0aW9uOmFic29sdXRlO3RyYW5zaXRpb246YWxsIC41cyBsaW5lYXI7cmlnaHQ6OHB4O2JvdHRvbTo4cHg7d2lkdGg6MTZweDtoZWlnaHQ6MTZweDtiYWNrZ3JvdW5kLWltYWdlOnVybChcImh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9BY29yZFBsdWdpbi9hc3NldHMvbWFpbi9BY29yZC5zdmdcIik7ZmlsdGVyOmdyYXlzY2FsZSgxKSBicmlnaHRuZXNzKDEpO2JhY2tncm91bmQtcG9zaXRpb246Y2VudGVyO2JhY2tncm91bmQtcmVwZWF0Om5vLXJlcGVhdDtiYWNrZ3JvdW5kLXNpemU6Y29udGFpbjt6LWluZGV4Ojk5OTk5OX0uYWNvcmQtLXN0YXJ0dXAtbG9hZGluZy5oaWRkZW57b3BhY2l0eTowICFpbXBvcnRhbnR9YDtcbiIsICJpbXBvcnQgZG9tIGZyb20gXCIuLi8uLi9hcGkvZG9tL2luZGV4LmpzXCI7XHJcbmltcG9ydCBwYXRjaGVyIGZyb20gXCIuLi8uLi9hcGkvcGF0Y2hlci9pbmRleC5qc1wiO1xyXG5cclxuaW1wb3J0IGNzc1RleHQgZnJvbSBcIi4vc3R5bGUuc2Nzc1wiO1xyXG5sZXQgdW5JbmplY3Q7XHJcblxyXG5hc3luYyBmdW5jdGlvbiBzaG93KCkge1xyXG4gIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFjb3JkLS1zdGFydHVwLWxvYWRpbmdcIikpIHJldHVybjtcclxuICB3aGlsZSAodHJ1ZSkge1xyXG4gICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYXBwLW1vdW50XCIpKSBicmVhaztcclxuICAgIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIDEwMCkpO1xyXG4gIH1cclxuICBcclxuICB1bkluamVjdCA9IHBhdGNoZXIuaW5qZWN0Q1NTKGNzc1RleHQpO1xyXG4gIGNvbnN0IGVsZW1lbnQgPSBkb20ucGFyc2UoYFxyXG4gICAgPGRpdiBjbGFzcz1cImFjb3JkLS1zdGFydHVwLWxvYWRpbmdcIj48L2Rpdj5cclxuICBgKVxyXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYXBwLW1vdW50XCIpLmFwcGVuZENoaWxkKGVsZW1lbnQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBoaWRlKCkge1xyXG4gIGxldCBlbG0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFjb3JkLS1zdGFydHVwLWxvYWRpbmdcIik7XHJcbiAgaWYgKGVsbSkge1xyXG4gICAgZWxtLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgZWxtLnJlbW92ZSgpO1xyXG4gICAgICB1bkluamVjdD8uKCk7XHJcbiAgICAgIHVuSW5qZWN0ID0gbnVsbDtcclxuICAgIH0sIDUwMCk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgc2hvdyxcclxuICBoaWRlXHJcbn0iLCAiaW1wb3J0ICogYXMgbmVzdHMgZnJvbSBcIm5lc3RzXCI7XHJcbmltcG9ydCAqIGFzIGlkYktleXZhbCBmcm9tIFwiaWRiLWtleXZhbFwiO1xyXG5pbXBvcnQgeyBkZUN5Y2xlZCwgcmV2aXZlIH0gZnJvbSBcIi4uLy4uL2xpYi9qc29uLWRlY3ljbGVkXCI7XHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBhc3luYyBjcmVhdGVQZXJzaXN0TmVzdChzdWZmaXgpIHtcclxuICAgIGxldCBjYWNoZWQgPSBhd2FpdCBpZGJLZXl2YWwuZ2V0KGBBY29yZFN0b3JlOyR7c3VmZml4fWApO1xyXG4gICAgaWYgKHR5cGVvZiBjYWNoZWQgPT0gXCJzdHJpbmdcIikgY2FjaGVkID0gcmV2aXZlKGNhY2hlZCk7XHJcbiAgICBjb25zdCBuZXN0ID0gbmVzdHMubWFrZShjYWNoZWQgPz8ge30pO1xyXG5cclxuICAgIGNvbnN0IHNhdmUgPSAoKSA9PiB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgaWRiS2V5dmFsLnNldChgQWNvcmRTdG9yZTske3N1ZmZpeH1gLCBkZUN5Y2xlZCh7IC4uLm5lc3QuZ2hvc3QgfSkpO1xyXG4gICAgICB9IGNhdGNoIHtcclxuICAgICAgICBpZGJLZXl2YWwuc2V0KGBBY29yZFN0b3JlOyR7c3VmZml4fWAsIGRlQ3ljbGVkKHt9KSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBuZXN0Lm9uKG5lc3RzLkV2ZW50cy5TRVQsIHNhdmUpO1xyXG4gICAgbmVzdC5vbihuZXN0cy5FdmVudHMuVVBEQVRFLCBzYXZlKTtcclxuICAgIG5lc3Qub24obmVzdHMuRXZlbnRzLkRFTEVURSwgc2F2ZSk7XHJcblxyXG4gICAgcmV0dXJuIG5lc3Q7XHJcbiAgfVxyXG59IiwgImZ1bmN0aW9uIHByb21pc2lmeVJlcXVlc3QocmVxdWVzdCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmUgLSBmaWxlIHNpemUgaGFja3NcbiAgICAgICAgcmVxdWVzdC5vbmNvbXBsZXRlID0gcmVxdWVzdC5vbnN1Y2Nlc3MgPSAoKSA9PiByZXNvbHZlKHJlcXVlc3QucmVzdWx0KTtcbiAgICAgICAgLy8gQHRzLWlnbm9yZSAtIGZpbGUgc2l6ZSBoYWNrc1xuICAgICAgICByZXF1ZXN0Lm9uYWJvcnQgPSByZXF1ZXN0Lm9uZXJyb3IgPSAoKSA9PiByZWplY3QocmVxdWVzdC5lcnJvcik7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBjcmVhdGVTdG9yZShkYk5hbWUsIHN0b3JlTmFtZSkge1xuICAgIGNvbnN0IHJlcXVlc3QgPSBpbmRleGVkREIub3BlbihkYk5hbWUpO1xuICAgIHJlcXVlc3Qub251cGdyYWRlbmVlZGVkID0gKCkgPT4gcmVxdWVzdC5yZXN1bHQuY3JlYXRlT2JqZWN0U3RvcmUoc3RvcmVOYW1lKTtcbiAgICBjb25zdCBkYnAgPSBwcm9taXNpZnlSZXF1ZXN0KHJlcXVlc3QpO1xuICAgIHJldHVybiAodHhNb2RlLCBjYWxsYmFjaykgPT4gZGJwLnRoZW4oKGRiKSA9PiBjYWxsYmFjayhkYi50cmFuc2FjdGlvbihzdG9yZU5hbWUsIHR4TW9kZSkub2JqZWN0U3RvcmUoc3RvcmVOYW1lKSkpO1xufVxubGV0IGRlZmF1bHRHZXRTdG9yZUZ1bmM7XG5mdW5jdGlvbiBkZWZhdWx0R2V0U3RvcmUoKSB7XG4gICAgaWYgKCFkZWZhdWx0R2V0U3RvcmVGdW5jKSB7XG4gICAgICAgIGRlZmF1bHRHZXRTdG9yZUZ1bmMgPSBjcmVhdGVTdG9yZSgna2V5dmFsLXN0b3JlJywgJ2tleXZhbCcpO1xuICAgIH1cbiAgICByZXR1cm4gZGVmYXVsdEdldFN0b3JlRnVuYztcbn1cbi8qKlxuICogR2V0IGEgdmFsdWUgYnkgaXRzIGtleS5cbiAqXG4gKiBAcGFyYW0ga2V5XG4gKiBAcGFyYW0gY3VzdG9tU3RvcmUgTWV0aG9kIHRvIGdldCBhIGN1c3RvbSBzdG9yZS4gVXNlIHdpdGggY2F1dGlvbiAoc2VlIHRoZSBkb2NzKS5cbiAqL1xuZnVuY3Rpb24gZ2V0KGtleSwgY3VzdG9tU3RvcmUgPSBkZWZhdWx0R2V0U3RvcmUoKSkge1xuICAgIHJldHVybiBjdXN0b21TdG9yZSgncmVhZG9ubHknLCAoc3RvcmUpID0+IHByb21pc2lmeVJlcXVlc3Qoc3RvcmUuZ2V0KGtleSkpKTtcbn1cbi8qKlxuICogU2V0IGEgdmFsdWUgd2l0aCBhIGtleS5cbiAqXG4gKiBAcGFyYW0ga2V5XG4gKiBAcGFyYW0gdmFsdWVcbiAqIEBwYXJhbSBjdXN0b21TdG9yZSBNZXRob2QgdG8gZ2V0IGEgY3VzdG9tIHN0b3JlLiBVc2Ugd2l0aCBjYXV0aW9uIChzZWUgdGhlIGRvY3MpLlxuICovXG5mdW5jdGlvbiBzZXQoa2V5LCB2YWx1ZSwgY3VzdG9tU3RvcmUgPSBkZWZhdWx0R2V0U3RvcmUoKSkge1xuICAgIHJldHVybiBjdXN0b21TdG9yZSgncmVhZHdyaXRlJywgKHN0b3JlKSA9PiB7XG4gICAgICAgIHN0b3JlLnB1dCh2YWx1ZSwga2V5KTtcbiAgICAgICAgcmV0dXJuIHByb21pc2lmeVJlcXVlc3Qoc3RvcmUudHJhbnNhY3Rpb24pO1xuICAgIH0pO1xufVxuLyoqXG4gKiBTZXQgbXVsdGlwbGUgdmFsdWVzIGF0IG9uY2UuIFRoaXMgaXMgZmFzdGVyIHRoYW4gY2FsbGluZyBzZXQoKSBtdWx0aXBsZSB0aW1lcy5cbiAqIEl0J3MgYWxzbyBhdG9taWMgXHUyMDEzIGlmIG9uZSBvZiB0aGUgcGFpcnMgY2FuJ3QgYmUgYWRkZWQsIG5vbmUgd2lsbCBiZSBhZGRlZC5cbiAqXG4gKiBAcGFyYW0gZW50cmllcyBBcnJheSBvZiBlbnRyaWVzLCB3aGVyZSBlYWNoIGVudHJ5IGlzIGFuIGFycmF5IG9mIGBba2V5LCB2YWx1ZV1gLlxuICogQHBhcmFtIGN1c3RvbVN0b3JlIE1ldGhvZCB0byBnZXQgYSBjdXN0b20gc3RvcmUuIFVzZSB3aXRoIGNhdXRpb24gKHNlZSB0aGUgZG9jcykuXG4gKi9cbmZ1bmN0aW9uIHNldE1hbnkoZW50cmllcywgY3VzdG9tU3RvcmUgPSBkZWZhdWx0R2V0U3RvcmUoKSkge1xuICAgIHJldHVybiBjdXN0b21TdG9yZSgncmVhZHdyaXRlJywgKHN0b3JlKSA9PiB7XG4gICAgICAgIGVudHJpZXMuZm9yRWFjaCgoZW50cnkpID0+IHN0b3JlLnB1dChlbnRyeVsxXSwgZW50cnlbMF0pKTtcbiAgICAgICAgcmV0dXJuIHByb21pc2lmeVJlcXVlc3Qoc3RvcmUudHJhbnNhY3Rpb24pO1xuICAgIH0pO1xufVxuLyoqXG4gKiBHZXQgbXVsdGlwbGUgdmFsdWVzIGJ5IHRoZWlyIGtleXNcbiAqXG4gKiBAcGFyYW0ga2V5c1xuICogQHBhcmFtIGN1c3RvbVN0b3JlIE1ldGhvZCB0byBnZXQgYSBjdXN0b20gc3RvcmUuIFVzZSB3aXRoIGNhdXRpb24gKHNlZSB0aGUgZG9jcykuXG4gKi9cbmZ1bmN0aW9uIGdldE1hbnkoa2V5cywgY3VzdG9tU3RvcmUgPSBkZWZhdWx0R2V0U3RvcmUoKSkge1xuICAgIHJldHVybiBjdXN0b21TdG9yZSgncmVhZG9ubHknLCAoc3RvcmUpID0+IFByb21pc2UuYWxsKGtleXMubWFwKChrZXkpID0+IHByb21pc2lmeVJlcXVlc3Qoc3RvcmUuZ2V0KGtleSkpKSkpO1xufVxuLyoqXG4gKiBVcGRhdGUgYSB2YWx1ZS4gVGhpcyBsZXRzIHlvdSBzZWUgdGhlIG9sZCB2YWx1ZSBhbmQgdXBkYXRlIGl0IGFzIGFuIGF0b21pYyBvcGVyYXRpb24uXG4gKlxuICogQHBhcmFtIGtleVxuICogQHBhcmFtIHVwZGF0ZXIgQSBjYWxsYmFjayB0aGF0IHRha2VzIHRoZSBvbGQgdmFsdWUgYW5kIHJldHVybnMgYSBuZXcgdmFsdWUuXG4gKiBAcGFyYW0gY3VzdG9tU3RvcmUgTWV0aG9kIHRvIGdldCBhIGN1c3RvbSBzdG9yZS4gVXNlIHdpdGggY2F1dGlvbiAoc2VlIHRoZSBkb2NzKS5cbiAqL1xuZnVuY3Rpb24gdXBkYXRlKGtleSwgdXBkYXRlciwgY3VzdG9tU3RvcmUgPSBkZWZhdWx0R2V0U3RvcmUoKSkge1xuICAgIHJldHVybiBjdXN0b21TdG9yZSgncmVhZHdyaXRlJywgKHN0b3JlKSA9PiBcbiAgICAvLyBOZWVkIHRvIGNyZWF0ZSB0aGUgcHJvbWlzZSBtYW51YWxseS5cbiAgICAvLyBJZiBJIHRyeSB0byBjaGFpbiBwcm9taXNlcywgdGhlIHRyYW5zYWN0aW9uIGNsb3NlcyBpbiBicm93c2Vyc1xuICAgIC8vIHRoYXQgdXNlIGEgcHJvbWlzZSBwb2x5ZmlsbCAoSUUxMC8xMSkuXG4gICAgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBzdG9yZS5nZXQoa2V5KS5vbnN1Y2Nlc3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHN0b3JlLnB1dCh1cGRhdGVyKHRoaXMucmVzdWx0KSwga2V5KTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHByb21pc2lmeVJlcXVlc3Qoc3RvcmUudHJhbnNhY3Rpb24pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9KSk7XG59XG4vKipcbiAqIERlbGV0ZSBhIHBhcnRpY3VsYXIga2V5IGZyb20gdGhlIHN0b3JlLlxuICpcbiAqIEBwYXJhbSBrZXlcbiAqIEBwYXJhbSBjdXN0b21TdG9yZSBNZXRob2QgdG8gZ2V0IGEgY3VzdG9tIHN0b3JlLiBVc2Ugd2l0aCBjYXV0aW9uIChzZWUgdGhlIGRvY3MpLlxuICovXG5mdW5jdGlvbiBkZWwoa2V5LCBjdXN0b21TdG9yZSA9IGRlZmF1bHRHZXRTdG9yZSgpKSB7XG4gICAgcmV0dXJuIGN1c3RvbVN0b3JlKCdyZWFkd3JpdGUnLCAoc3RvcmUpID0+IHtcbiAgICAgICAgc3RvcmUuZGVsZXRlKGtleSk7XG4gICAgICAgIHJldHVybiBwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLnRyYW5zYWN0aW9uKTtcbiAgICB9KTtcbn1cbi8qKlxuICogRGVsZXRlIG11bHRpcGxlIGtleXMgYXQgb25jZS5cbiAqXG4gKiBAcGFyYW0ga2V5cyBMaXN0IG9mIGtleXMgdG8gZGVsZXRlLlxuICogQHBhcmFtIGN1c3RvbVN0b3JlIE1ldGhvZCB0byBnZXQgYSBjdXN0b20gc3RvcmUuIFVzZSB3aXRoIGNhdXRpb24gKHNlZSB0aGUgZG9jcykuXG4gKi9cbmZ1bmN0aW9uIGRlbE1hbnkoa2V5cywgY3VzdG9tU3RvcmUgPSBkZWZhdWx0R2V0U3RvcmUoKSkge1xuICAgIHJldHVybiBjdXN0b21TdG9yZSgncmVhZHdyaXRlJywgKHN0b3JlKSA9PiB7XG4gICAgICAgIGtleXMuZm9yRWFjaCgoa2V5KSA9PiBzdG9yZS5kZWxldGUoa2V5KSk7XG4gICAgICAgIHJldHVybiBwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLnRyYW5zYWN0aW9uKTtcbiAgICB9KTtcbn1cbi8qKlxuICogQ2xlYXIgYWxsIHZhbHVlcyBpbiB0aGUgc3RvcmUuXG4gKlxuICogQHBhcmFtIGN1c3RvbVN0b3JlIE1ldGhvZCB0byBnZXQgYSBjdXN0b20gc3RvcmUuIFVzZSB3aXRoIGNhdXRpb24gKHNlZSB0aGUgZG9jcykuXG4gKi9cbmZ1bmN0aW9uIGNsZWFyKGN1c3RvbVN0b3JlID0gZGVmYXVsdEdldFN0b3JlKCkpIHtcbiAgICByZXR1cm4gY3VzdG9tU3RvcmUoJ3JlYWR3cml0ZScsIChzdG9yZSkgPT4ge1xuICAgICAgICBzdG9yZS5jbGVhcigpO1xuICAgICAgICByZXR1cm4gcHJvbWlzaWZ5UmVxdWVzdChzdG9yZS50cmFuc2FjdGlvbik7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBlYWNoQ3Vyc29yKHN0b3JlLCBjYWxsYmFjaykge1xuICAgIHN0b3JlLm9wZW5DdXJzb3IoKS5vbnN1Y2Nlc3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghdGhpcy5yZXN1bHQpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNhbGxiYWNrKHRoaXMucmVzdWx0KTtcbiAgICAgICAgdGhpcy5yZXN1bHQuY29udGludWUoKTtcbiAgICB9O1xuICAgIHJldHVybiBwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLnRyYW5zYWN0aW9uKTtcbn1cbi8qKlxuICogR2V0IGFsbCBrZXlzIGluIHRoZSBzdG9yZS5cbiAqXG4gKiBAcGFyYW0gY3VzdG9tU3RvcmUgTWV0aG9kIHRvIGdldCBhIGN1c3RvbSBzdG9yZS4gVXNlIHdpdGggY2F1dGlvbiAoc2VlIHRoZSBkb2NzKS5cbiAqL1xuZnVuY3Rpb24ga2V5cyhjdXN0b21TdG9yZSA9IGRlZmF1bHRHZXRTdG9yZSgpKSB7XG4gICAgcmV0dXJuIGN1c3RvbVN0b3JlKCdyZWFkb25seScsIChzdG9yZSkgPT4ge1xuICAgICAgICAvLyBGYXN0IHBhdGggZm9yIG1vZGVybiBicm93c2Vyc1xuICAgICAgICBpZiAoc3RvcmUuZ2V0QWxsS2V5cykge1xuICAgICAgICAgICAgcmV0dXJuIHByb21pc2lmeVJlcXVlc3Qoc3RvcmUuZ2V0QWxsS2V5cygpKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpdGVtcyA9IFtdO1xuICAgICAgICByZXR1cm4gZWFjaEN1cnNvcihzdG9yZSwgKGN1cnNvcikgPT4gaXRlbXMucHVzaChjdXJzb3Iua2V5KSkudGhlbigoKSA9PiBpdGVtcyk7XG4gICAgfSk7XG59XG4vKipcbiAqIEdldCBhbGwgdmFsdWVzIGluIHRoZSBzdG9yZS5cbiAqXG4gKiBAcGFyYW0gY3VzdG9tU3RvcmUgTWV0aG9kIHRvIGdldCBhIGN1c3RvbSBzdG9yZS4gVXNlIHdpdGggY2F1dGlvbiAoc2VlIHRoZSBkb2NzKS5cbiAqL1xuZnVuY3Rpb24gdmFsdWVzKGN1c3RvbVN0b3JlID0gZGVmYXVsdEdldFN0b3JlKCkpIHtcbiAgICByZXR1cm4gY3VzdG9tU3RvcmUoJ3JlYWRvbmx5JywgKHN0b3JlKSA9PiB7XG4gICAgICAgIC8vIEZhc3QgcGF0aCBmb3IgbW9kZXJuIGJyb3dzZXJzXG4gICAgICAgIGlmIChzdG9yZS5nZXRBbGwpIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLmdldEFsbCgpKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpdGVtcyA9IFtdO1xuICAgICAgICByZXR1cm4gZWFjaEN1cnNvcihzdG9yZSwgKGN1cnNvcikgPT4gaXRlbXMucHVzaChjdXJzb3IudmFsdWUpKS50aGVuKCgpID0+IGl0ZW1zKTtcbiAgICB9KTtcbn1cbi8qKlxuICogR2V0IGFsbCBlbnRyaWVzIGluIHRoZSBzdG9yZS4gRWFjaCBlbnRyeSBpcyBhbiBhcnJheSBvZiBgW2tleSwgdmFsdWVdYC5cbiAqXG4gKiBAcGFyYW0gY3VzdG9tU3RvcmUgTWV0aG9kIHRvIGdldCBhIGN1c3RvbSBzdG9yZS4gVXNlIHdpdGggY2F1dGlvbiAoc2VlIHRoZSBkb2NzKS5cbiAqL1xuZnVuY3Rpb24gZW50cmllcyhjdXN0b21TdG9yZSA9IGRlZmF1bHRHZXRTdG9yZSgpKSB7XG4gICAgcmV0dXJuIGN1c3RvbVN0b3JlKCdyZWFkb25seScsIChzdG9yZSkgPT4ge1xuICAgICAgICAvLyBGYXN0IHBhdGggZm9yIG1vZGVybiBicm93c2Vyc1xuICAgICAgICAvLyAoYWx0aG91Z2gsIGhvcGVmdWxseSB3ZSdsbCBnZXQgYSBzaW1wbGVyIHBhdGggc29tZSBkYXkpXG4gICAgICAgIGlmIChzdG9yZS5nZXRBbGwgJiYgc3RvcmUuZ2V0QWxsS2V5cykge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgICAgICBwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLmdldEFsbEtleXMoKSksXG4gICAgICAgICAgICAgICAgcHJvbWlzaWZ5UmVxdWVzdChzdG9yZS5nZXRBbGwoKSksXG4gICAgICAgICAgICBdKS50aGVuKChba2V5cywgdmFsdWVzXSkgPT4ga2V5cy5tYXAoKGtleSwgaSkgPT4gW2tleSwgdmFsdWVzW2ldXSkpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGl0ZW1zID0gW107XG4gICAgICAgIHJldHVybiBjdXN0b21TdG9yZSgncmVhZG9ubHknLCAoc3RvcmUpID0+IGVhY2hDdXJzb3Ioc3RvcmUsIChjdXJzb3IpID0+IGl0ZW1zLnB1c2goW2N1cnNvci5rZXksIGN1cnNvci52YWx1ZV0pKS50aGVuKCgpID0+IGl0ZW1zKSk7XG4gICAgfSk7XG59XG5cbmV4cG9ydCB7IGNsZWFyLCBjcmVhdGVTdG9yZSwgZGVsLCBkZWxNYW55LCBlbnRyaWVzLCBnZXQsIGdldE1hbnksIGtleXMsIHByb21pc2lmeVJlcXVlc3QsIHNldCwgc2V0TWFueSwgdXBkYXRlLCB2YWx1ZXMgfTtcbiIsICJcInVzZSBzdHJpY3RcIjtcclxuXHJcbmZ1bmN0aW9uIGRlQ3ljbGVyKHZhbCwgY29uZmlnKSB7XHJcbiAgY29uZmlnID0gdHlwZW9mIGNvbmZpZyA9PT0gJ251bWJlcicgPyB7IGRlZXA6IGNvbmZpZyB9IDogKGNvbmZpZyB8fCB7fSk7XHJcbiAgY29uZmlnLmRlZXAgPSBjb25maWcuZGVlcCB8fCAxMDtcclxuICByZXR1cm4gZGVjeWNsZVdhbGtlcihbXSwgW10sIHZhbCwgY29uZmlnKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZGVDeWNsZWQodmFsLCBjb25maWcpIHtcclxuICBjb25maWcgPSB0eXBlb2YgY29uZmlnID09PSAnbnVtYmVyJyA/IHsgZGVlcDogY29uZmlnIH0gOiAoY29uZmlnIHx8IHt9KTtcclxuICB2YWwgPSBkZUN5Y2xlcih2YWwsIGNvbmZpZyk7XHJcbiAgdHJ5IHtcclxuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh2YWwsIHVuZGVmaW5lZCwgY29uZmlnLnNwYWNlcik7XHJcbiAgfSBjYXRjaCAoZSkge1xyXG4gICAgcmV0dXJuIGU7XHJcbiAgfVxyXG59XHJcblxyXG52YXIgcmV2aXZlckRhdGUgPSAvXlxcW0RhdGU6KChcXGR7NH0tXFxkezJ9LVxcZHsyfSlbQS1aXSsoXFxkezJ9OlxcZHsyfTpcXGR7Mn0pLihbMC05Ky06XSspWilcXF0kLztcclxudmFyIHJldml2ZXJSZWdFeHAgPSAvXlxcW1JlZ2V4cDpcXC8oLispXFwvXFxdJC87XHJcbnZhciByZXZpdmVyRXJyb3IgPSAvXlxcW0Vycm9yOihbXFxXXFx3XSspXFxdJC87XHJcbnZhciByZXZpdmVyRnVuY3Rpb24gPSAvXlxcW0Z1bmN0aW9uOiguKylcXF0kLztcclxuZnVuY3Rpb24gcmV2aXZlKHZhbCwgZnVuY3Rpb25zKSB7XHJcbiAgdHJ5IHtcclxuICAgIHJldHVybiBKU09OLnBhcnNlKHZhbCwgcmV2aXZlcik7XHJcbiAgfSBjYXRjaCAoZSkge1xyXG4gICAgcmV0dXJuIGU7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiByZXZpdmVyKGtleSwgdmFsKSB7XHJcbiAgICBpZiAocmV2aXZlckRhdGUudGVzdCh2YWwpKSB7XHJcbiAgICAgIHZhbCA9IHJldml2ZXJEYXRlLmV4ZWModmFsKTtcclxuICAgICAgdmFsID0gbmV3IERhdGUodmFsWzFdKTtcclxuICAgICAgcmV0dXJuIG5ldyBEYXRlKHZhbCk7XHJcbiAgICB9IGVsc2UgaWYgKHJldml2ZXJSZWdFeHAudGVzdCh2YWwpKSB7XHJcbiAgICAgIHZhbCA9IHJldml2ZXJSZWdFeHAuZXhlYyh2YWwpWzFdO1xyXG4gICAgICByZXR1cm4gbmV3IFJlZ0V4cCh2YWwpO1xyXG4gICAgfSBlbHNlIGlmIChyZXZpdmVyRXJyb3IudGVzdCh2YWwpKSB7XHJcbiAgICAgIHZhbCA9IHJldml2ZXJFcnJvci5leGVjKHZhbClbMV07XHJcbiAgICAgIHZhciBlcnJvciA9IG5ldyBFcnJvcih2YWwuc3BsaXQoJ1xcbicpWzBdKTtcclxuICAgICAgaWYgKGVycm9yLnN0YWNrKSB7XHJcbiAgICAgICAgZXJyb3Iuc3RhY2sgPSB2YWw7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGVycm9yO1xyXG4gICAgfSBlbHNlIGlmIChmdW5jdGlvbnMgJiYgcmV2aXZlckZ1bmN0aW9uLnRlc3QodmFsKSkge1xyXG4gICAgICB2YWwgPSByZXZpdmVyRnVuY3Rpb24uZXhlYyh2YWwpWzFdO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIHJldHVybiAobmV3IEZ1bmN0aW9uKFwicmV0dXJuIFwiICsgdmFsICsgXCI7XCIpKSgpO1xyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIHJldHVybiBlcnJvcjtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHZhbDtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRlY3ljbGVXYWxrZXIocGFyZW50cywgcGF0aCwgdmFsLCBjb25maWcpIHtcclxuICBpZiAoWyd1bmRlZmluZWQnLCAnbnVtYmVyJywgJ2Jvb2xlYW4nLCAnc3RyaW5nJ10uaW5kZXhPZih0eXBlb2YgdmFsKSA+PSAwIHx8IHZhbCA9PT0gbnVsbCkge1xyXG4gICAgcmV0dXJuIHZhbDtcclxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdvYmplY3QnICYmIHZhbC5jb25zdHJ1Y3RvciA9PT0gRGF0ZSkge1xyXG4gICAgcmV0dXJuIGNvbmZpZy5kYXRlcyAhPT0gZmFsc2UgPyAnW0RhdGU6JyArIHZhbC50b0lTT1N0cmluZygpICsgJ10nIDogdmFsO1xyXG4gICAgLy92YWwuZm9ybWF0KCd7WVlZWX0ve01NfS97RER9IHtoaH06e21tfTp7c3N9IFVUQzpcdTAwQjd7cGFyYW1zLnR6Pj0wP1wiK1wiK3BhcmFtcy50ejpwYXJhbXMudHp9XHUwMEI3Jyk7XHJcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnb2JqZWN0JyAmJiB2YWwuY29uc3RydWN0b3IgPT09IFJlZ0V4cCkge1xyXG4gICAgcmV0dXJuIGNvbmZpZy5yZWdleHBzICE9PSBmYWxzZSA/ICdbUmVnZXhwOicgKyB2YWwudG9TdHJpbmcoKSArICddJyA6IHZhbDtcclxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdvYmplY3QnICYmIHZhbC5jb25zdHJ1Y3RvciAmJiB0eXBlb2YgdmFsLmNvbnN0cnVjdG9yLm5hbWUgPT09ICdzdHJpbmcnICYmIHZhbC5jb25zdHJ1Y3Rvci5uYW1lLnNsaWNlKC01KSA9PT0gJ0Vycm9yJykge1xyXG4gICAgdmFyIHN0YWNrID0gKHZhbC5zdGFjayB8fCAnJykuc3BsaXQoJ1xcbicpLnNsaWNlKDEpO1xyXG4gICAgdmFyIG1lc3NhZ2UgPSAodmFsLm1lc3NhZ2UgfHwgdmFsLnRvU3RyaW5nKCkpO1xyXG4gICAgdmFyIGVycm9yID0gbWVzc2FnZSArIFwiXFxuXCIgKyBzdGFjaztcclxuICAgIHJldHVybiBjb25maWcuZXJyb3JzICE9PSBmYWxzZSA/ICdbRXJyb3I6JyArIGVycm9yICsgJ10nIDogdmFsO1xyXG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcclxuICAgIGlmIChwYXJlbnRzLmluZGV4T2YodmFsKSA+PSAwKSB7XHJcbiAgICAgIHZhciBwb2ludCA9IHBhdGguc2xpY2UoMCwgcGFyZW50cy5pbmRleE9mKHZhbCkpLmpvaW4oJy4nKTtcclxuICAgICAgcmV0dXJuICdbQ2lyY3VsYXInICsgKHBvaW50ID8gJzonICsgcG9pbnQgOiAnJykgKyAnXSc7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB2YXIgY29weSwgaSwgaywgbDtcclxuICAgICAgaWYgKHZhbC5jb25zdHJ1Y3RvciAmJiB0eXBlb2YgdmFsLmNvbnN0cnVjdG9yLm5hbWUgPT09ICdzdHJpbmcnICYmIHZhbC5jb25zdHJ1Y3Rvci5uYW1lLnNsaWNlKC01KSA9PT0gJ0FycmF5Jykge1xyXG4gICAgICAgIGlmIChwYXJlbnRzLmxlbmd0aCA+PSBjb25maWcuZGVlcCAmJiB2YWwuY29uc3RydWN0b3IubmFtZSAhPT0gJ0FycmF5Jykge1xyXG4gICAgICAgICAgcmV0dXJuICdbQXJyYXk6JyArIHZhbC5jb25zdHJ1Y3Rvci5uYW1lICsgJ10nO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb3B5ID0gW107XHJcbiAgICAgICAgICBmb3IgKGkgPSAwLCBsID0gdmFsLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgICAgICBjb3B5W2ldID0gZGVjeWNsZVdhbGtlcihwYXJlbnRzLmNvbmNhdChbdmFsXSksIHBhdGguY29uY2F0KGkpLCB2YWxbaV0sIGNvbmZpZyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gY29weTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKHBhcmVudHMubGVuZ3RoID49IGNvbmZpZy5kZWVwKSB7XHJcbiAgICAgICAgICByZXR1cm4gJ1tPYmplY3Q6JyArICh2YWwuY29uc3RydWN0b3IgJiYgdmFsLmNvbnN0cnVjdG9yLm5hbWUgPyB2YWwuY29uc3RydWN0b3IubmFtZSA6ICdPYmplY3QnKSArICddJztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29weSA9IHt9O1xyXG4gICAgICAgICAgZm9yIChpID0gMCwgayA9IE9iamVjdC5rZXlzKHZhbCksIGwgPSBrLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgICAgICBjb3B5W2tbaV1dID0gZGVjeWNsZVdhbGtlcihwYXJlbnRzLmNvbmNhdChbdmFsXSksIHBhdGguY29uY2F0KFtrW2ldXSksIHZhbFtrW2ldXSwgY29uZmlnKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBjb3B5O1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgcmV0dXJuIGNvbmZpZy5mdW5jdGlvbnMgPT09IHRydWUgPyAnW0Z1bmN0aW9uOicgKyB2YWwudG9TdHJpbmcoKSArICddJyA6IHVuZGVmaW5lZDtcclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIHZhbC50b1N0cmluZygpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IHtcclxuICBkZUN5Y2xlcixcclxuICBkZUN5Y2xlZCxcclxuICByZXZpdmVcclxufSIsICJpbXBvcnQgaTE4biBmcm9tIFwiLi4vaTE4blwiO1xyXG5pbXBvcnQgdXRpbHMgZnJvbSBcIi4uL3V0aWxzXCI7XHJcblxyXG4vKipcclxuICogQHBhcmFtIHt7IGkxOG46IHN0cmluZyB8IHsgW2xhbmc6IHN0cmluZ106IHsgW2s6IHN0cmluZ106IHN0cmluZyB9IH19fSBjZmcgXHJcbiAqIEByZXR1cm5zIFxyXG4gKi9cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGJ1aWxkRXh0ZW5zaW9uSTE4TihjZmcpIHtcclxuICBpZiAoIWNmZz8uaTE4bikgcmV0dXJuIG51bGw7XHJcbiAgbGV0IG91dCA9IHtcclxuICAgIF9fY2FjaGVfXzoge1xyXG4gICAgICBsb2NhbGVJZHM6IFtdLFxyXG4gICAgICBsb2NhbGl6YXRpb25zOiB7fVxyXG4gICAgfSxcclxuICAgIGZvcm1hdChrZXksIC4uLmFyZ3MpIHtcclxuICAgICAgcmV0dXJuIHV0aWxzLmZvcm1hdChvdXQuZ2V0KGtleSksIC4uLmFyZ3MpO1xyXG4gICAgfSxcclxuICAgIGdldChrZXkpIHtcclxuICAgICAgcmV0dXJuIG91dC5fX2NhY2hlX18ubG9jYWxpemF0aW9uc1tpMThuLmxvY2FsZV0/LltrZXldXHJcbiAgICAgICAgfHwgb3V0Ll9fY2FjaGVfXy5sb2NhbGl6YXRpb25zLmRlZmF1bHQ/LltrZXldXHJcbiAgICAgICAgfHwga2V5O1xyXG4gICAgfSxcclxuICAgIG1lc3NhZ2VzOiBuZXcgUHJveHkoe30sIHtcclxuICAgICAgZ2V0KF8sIHByb3ApIHtcclxuICAgICAgICByZXR1cm4gb3V0LmdldChwcm9wKTtcclxuICAgICAgfVxyXG4gICAgfSksXHJcbiAgfVxyXG4gIGFzeW5jIGZ1bmN0aW9uIGNoZWNrKCkge1xyXG4gICAgY29uc3QgbG9jYWxlID0gaTE4bi5sb2NhbGU7XHJcbiAgICBpZiAodHlwZW9mIGNmZy5pMThuID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgIGNvbnN0IEJBU0VfVVJMID0gY2ZnLmkxOG4uZW5kc1dpdGgoXCIvXCIpID8gY2ZnLmkxOG4uc2xpY2UoMCwgLTEpIDogY2ZnLmkxOG47XHJcbiAgICAgIGlmICghb3V0Ll9fY2FjaGVfXy5sb2NhbGVJZHMubGVuZ3RoKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIG91dC5fX2NhY2hlX18ubG9jYWxlSWRzID0gYXdhaXQgKGF3YWl0IGZldGNoKGAke0JBU0VfVVJMfS9sb2NhbGVzLmpzb25gLCBub1N0b3JlKSkuanNvbigpO1xyXG4gICAgICAgIH0gY2F0Y2ggeyB9XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIG91dC5fX2NhY2hlX18ubG9jYWxpemF0aW9ucy5kZWZhdWx0ID0gYXdhaXQgKGF3YWl0IGZldGNoKGAke0JBU0VfVVJMfS9kZWZhdWx0Lmpzb25gLCBub1N0b3JlKSkuanNvbigpO1xyXG4gICAgICAgIH0gY2F0Y2ggeyB9XHJcbiAgICAgIH1cclxuICAgICAgaWYgKFxyXG4gICAgICAgIG91dC5fX2NhY2hlX18ubG9jYWxlSWRzLmluY2x1ZGVzKGxvY2FsZSlcclxuICAgICAgICAmJiAhb3V0Ll9fY2FjaGVfXy5sb2NhbGl6YXRpb25zPy5bbG9jYWxlXVxyXG4gICAgICApIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgb3V0Ll9fY2FjaGVfXy5sb2NhbGl6YXRpb25zW2xvY2FsZV0gPSBhd2FpdCAoYXdhaXQgZmV0Y2goYCR7QkFTRV9VUkx9LyR7bG9jYWxlfS5qc29uYCwgbm9TdG9yZSkpLmpzb24oKTtcclxuICAgICAgICB9IGNhdGNoIHsgfTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgb3V0Ll9fY2FjaGVfXy5sb2NhbGVJZHMgPSBPYmplY3Qua2V5cyhjZmcuaTE4bik7XHJcbiAgICAgIG91dC5fX2NhY2hlX18ubG9jYWxpemF0aW9ucyA9IGNmZy5pMThuO1xyXG4gICAgfVxyXG4gIH1cclxuICBhd2FpdCBjaGVjaygpO1xyXG4gIHJldHVybiBvdXQ7XHJcbn0iLCAiaW1wb3J0IHsgQmFzaWNFdmVudEVtaXR0ZXIgfSBmcm9tIFwiLi4vLi4vbGliL0Jhc2ljRXZlbnRFbWl0dGVyLmpzXCI7XHJcbmltcG9ydCBkZXYgZnJvbSBcIi4uL2Rldi9pbmRleC5qc1wiO1xyXG5pbXBvcnQgaTE4biBmcm9tIFwiLi4vaTE4bi9pbmRleC5qc1wiO1xyXG5pbXBvcnQgbW9kdWxlcyBmcm9tIFwiLi4vbW9kdWxlcy9pbmRleC5qc1wiO1xyXG5pbXBvcnQgc3RvcmFnZSBmcm9tIFwiLi4vc3RvcmFnZS9pbmRleC5qc1wiO1xyXG5pbXBvcnQgeyBidWlsZEV4dGVuc2lvbkkxOE4gfSBmcm9tIFwiLi9pMThuLmpzXCI7XHJcbmltcG9ydCAqIGFzIG5lc3RzIGZyb20gXCJuZXN0c1wiO1xyXG5pbXBvcnQgZXZlbnRzIGZyb20gXCIuLi9ldmVudHMvaW5kZXguanNcIjtcclxuaW1wb3J0IHBhdGNoZXIgZnJvbSBcIi4uL3BhdGNoZXIvaW5kZXguanNcIjtcclxuaW1wb3J0IGZpbmRJblRyZWUgZnJvbSBcIi4uL3V0aWxzL3Jhdy9maW5kLWluLXRyZWUuanNcIjtcclxuaW1wb3J0IHdlYnNvY2tldCBmcm9tIFwiLi4vd2Vic29ja2V0L2luZGV4LmpzXCI7XHJcbmltcG9ydCB1aSBmcm9tIFwiLi4vdWkvaW5kZXguanNcIjtcclxuaW1wb3J0IHV0aWxzIGZyb20gXCIuLi91dGlscy9pbmRleC5qc1wiO1xyXG5pbXBvcnQgZG9tIGZyb20gXCIuLi9kb20vaW5kZXguanNcIjtcclxuaW1wb3J0IHNoYXJlZCBmcm9tIFwiLi4vc2hhcmVkL2luZGV4LmpzXCI7XHJcbmltcG9ydCB7IHdhaXRVbnRpbENvbm5lY3Rpb25PcGVuIH0gZnJvbSBcIi4uLy4uL290aGVyL3V0aWxzLmpzXCI7XHJcbmltcG9ydCBsb2dnZXIgZnJvbSBcIi4uL3V0aWxzL2xvZ2dlci5qc1wiO1xyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSB7eyBtb2RlPzogXCJkZXZlbG9wbWVudFwiIHwgXCJwcm9kdWN0aW9uXCIsIGFwaTogeyBwYXRjaGVyPzogc3RyaW5nIHwgYm9vbGVhbiwgc3RvcmFnZT86IHN0cmluZyB8IGJvb2xlYW4sIGkxOG4/OiBzdHJpbmcgfCBib29sZWFuLCBldmVudHM/OiBzdHJpbmcgfCBib29sZWFuLCB1dGlscz86IHN0cmluZyB8IGJvb2xlYW4sIGRvbT86IHN0cmluZyB8IGJvb2xlYW4sIHdlYnNvY2tldD86IHN0cmluZyB8IGJvb2xlYW4sIHVpPzogc3RyaW5nIHwgYm9vbGVhbiwgZGV2Pzogc3RyaW5nIHwgYm9vbGVhbiwgbW9kdWxlczogeyBub2RlOiB7IG5hbWU6IHN0cmluZywgcmVhc29uOiBzdHJpbmcgfVtdLCBjb21tb246IHsgbmFtZTogc3RyaW5nLCByZWFzb246IHN0cmluZyB9W10sIGN1c3RvbTogeyByZWFzb246IHN0cmluZywgbmFtZTogc3RyaW5nLCBsYXp5OiBib29sZWFuLCBmaW5kZXI6IHsgZmlsdGVyOiB7IGV4cG9ydDogYm9vbGVhbiwgaW46IFwicHJvcGVydGllc1wiIHwgXCJzdHJpbmdzXCIgfCBcInByb3RvdHlwZXNcIiwgYnk6IFtzdHJpbmdbXSwgc3RyaW5nW10/XSB9LCBwYXRoOiB7IGJlZm9yZTogc3RyaW5nIHwgc3RyaW5nW10sIGFmdGVyOiBzdHJpbmcgfCBzdHJpbmdbXSB9LCBtYXA6IHsgW2s6IHN0cmluZ106IHN0cmluZ1tdIH0gfSB9W10gfSB9LCBhYm91dDogeyBuYW1lOiBzdHJpbmcgfCB7IFtrOiBzdHJpbmddOiBzdHJpbmcgfSwgZGVzY3JpcHRpb246IHN0cmluZyB8IHsgW2s6IHN0cmluZ106IHN0cmluZyB9LCBzbHVnOiBzdHJpbmcgfSB9fSBtYW5pZmVzdCBcclxuICovXHJcbmFzeW5jIGZ1bmN0aW9uIGJ1aWxkUGx1Z2luQVBJKG1hbmlmZXN0LCBwZXJzaXN0S2V5KSB7XHJcbiAgY29uc3QgZGV2TW9kZSA9IGRldi5lbmFibGVkIHx8IG1hbmlmZXN0Py5tb2RlID09PSBcImRldmVsb3BtZW50XCI7XHJcbiAgY29uc3QgcGVyc2lzdCA9IGF3YWl0IHN0b3JhZ2UuY3JlYXRlUGVyc2lzdE5lc3QocGVyc2lzdEtleSk7XHJcbiAgY29uc3Qgb3V0ID0ge1xyXG4gICAgbW9kdWxlczoge1xyXG4gICAgICBfX2NhY2hlX186IHtcclxuICAgICAgICBjb21tb246IHt9LFxyXG4gICAgICAgIG5vZGU6IHt9LFxyXG4gICAgICAgIGN1c3RvbToge30sXHJcbiAgICAgICAgY3VzdG9tTGF6eToge31cclxuICAgICAgfSxcclxuICAgICAgcmVxdWlyZShuYW1lKSB7XHJcbiAgICAgICAgaWYgKCFkZXZNb2RlKSB7XHJcbiAgICAgICAgICBpZiAodHlwZW9mIG91dC5tb2R1bGVzLl9fY2FjaGVfXy5ub2RlW25hbWVdICE9PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gb3V0Lm1vZHVsZXMuX19jYWNoZV9fLm5vZGVbbmFtZV07XHJcbiAgICAgICAgICBpZiAobWFuaWZlc3Q/LmFwaT8ubW9kdWxlcz8ubm9kZT8uc29tZT8uKGkgPT4gaS5uYW1lID09PSBuYW1lKSkgcmV0dXJuIG91dC5tb2R1bGVzLl9fY2FjaGVfXy5ub2RlW25hbWVdID0gbW9kdWxlcy5yZXF1aXJlKG5hbWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZXR1cm4gbW9kdWxlcy5yZXF1aXJlKG5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgfSxcclxuICAgICAgY29tbW9uOiBuZXcgUHJveHkoe30sIHtcclxuICAgICAgICBnZXQoXywgcHJvcCkge1xyXG4gICAgICAgICAgaWYgKCFkZXZNb2RlKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb3V0Lm1vZHVsZXMuX19jYWNoZV9fLmNvbW1vbltwcm9wXSAhPT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIG91dC5tb2R1bGVzLl9fY2FjaGVfXy5jb21tb25bcHJvcF07XHJcbiAgICAgICAgICAgIGlmIChtYW5pZmVzdD8uYXBpPy5tb2R1bGVzPy5jb21tb24/LnNvbWU/LihpID0+IGkubmFtZSA9PT0gcHJvcCkpIHJldHVybiBvdXQubW9kdWxlcy5fX2NhY2hlX18uY29tbW9uW3Byb3BdID0gbW9kdWxlcy5jb21tb25bcHJvcF07XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbW9kdWxlcy5jb21tb25bcHJvcF07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9LFxyXG4gICAgICB9KSxcclxuICAgICAgY3VzdG9tOiBuZXcgUHJveHkoe30sIHtcclxuICAgICAgICBnZXQoXywgcHJvcCkge1xyXG4gICAgICAgICAgaWYgKHR5cGVvZiBvdXQubW9kdWxlcy5fX2NhY2hlX18uY3VzdG9tW3Byb3BdICE9PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gb3V0Lm1vZHVsZXMuX19jYWNoZV9fLmN1c3RvbVtwcm9wXTtcclxuICAgICAgICAgIGxldCBkYXRhID0gbWFuaWZlc3Q/LmFwaT8ubW9kdWxlcz8uY3VzdG9tPy5maW5kPy4oaSA9PiBpLm5hbWUgPT09IHByb3ApO1xyXG4gICAgICAgICAgaWYgKCFkYXRhPy5maW5kZXIpIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgaWYgKGRhdGEubGF6eSkge1xyXG4gICAgICAgICAgICBsZXQgcHJvbSA9IG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgICBsZXQgciA9IGF3YWl0IG1vZHVsZXMud2VicGFjay5sYXp5RmluZEJ5RmluZGVyKGRhdGEuZmluZGVyKTtcclxuICAgICAgICAgICAgICBvdXQubW9kdWxlcy5fX2NhY2hlX18uY3VzdG9tTGF6eVtwcm9wXSA9IHI7XHJcbiAgICAgICAgICAgICAgcmVzb2x2ZShyKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG91dC5tb2R1bGVzLl9fY2FjaGVfXy5jdXN0b21bcHJvcF0gPSB7XHJcbiAgICAgICAgICAgICAgZ2V0KCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb207XHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBnZXQgdmFsdWUoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb3V0Lm1vZHVsZXMuX19jYWNoZV9fLmN1c3RvbUxhenlbcHJvcF07XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IHZhbHVlID0gbW9kdWxlcy53ZWJwYWNrLmZpbmRCeUZpbmRlcihkYXRhLmZpbmRlcik7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZT8udmFsdWUgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgIG91dC5tb2R1bGVzLl9fY2FjaGVfXy5jdXN0b21bcHJvcF0gPSB2YWx1ZSA/IE9iamVjdC5hc3NpZ24odmFsdWUsIHsgdmFsdWUsIGdldCgpIHsgcmV0dXJuIHZhbHVlIH0gfSkgOiBudWxsO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBvdXQubW9kdWxlcy5fX2NhY2hlX18uY3VzdG9tW3Byb3BdID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGNhdGNoIHtcclxuICAgICAgICAgICAgICBvdXQubW9kdWxlcy5fX2NhY2hlX18uY3VzdG9tW3Byb3BdID0gdmFsdWUgPyB7IHZhbHVlLCBnZXQoKSB7IHJldHVybiB2YWx1ZSB9IH0gOiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gb3V0Lm1vZHVsZXMuX19jYWNoZV9fLmN1c3RvbVtwcm9wXTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pLFxyXG4gICAgICBnZXQgbmF0aXZlKCkge1xyXG4gICAgICAgIGlmIChtYW5pZmVzdD8ubW9kdWxlcz8ubmF0aXZlIHx8IGRldk1vZGUpIHJldHVybiBtb2R1bGVzLm5hdGl2ZTtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBleHRlbnNpb246IHtcclxuICAgICAgbWFuaWZlc3QsXHJcbiAgICAgIHBlcnNpc3QsXHJcbiAgICAgIGkxOG46IGF3YWl0IGJ1aWxkRXh0ZW5zaW9uSTE4TihtYW5pZmVzdCksXHJcbiAgICAgIGV2ZW50czogbmV3IEJhc2ljRXZlbnRFbWl0dGVyKCksXHJcbiAgICAgIHN1YnNjcmlwdGlvbnM6IFtdXHJcbiAgICB9LFxyXG4gICAgc2hhcmVkLFxyXG4gICAgZ2V0IGkxOG4oKSB7XHJcbiAgICAgIGlmIChtYW5pZmVzdD8uYXBpPy5pMThuIHx8IGRldk1vZGUpIHJldHVybiBpMThuO1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH0sXHJcbiAgICBnZXQgcGF0Y2hlcigpIHtcclxuICAgICAgaWYgKG1hbmlmZXN0Py5hcGk/LnBhdGNoZXIgfHwgZGV2TW9kZSkgcmV0dXJuIHBhdGNoZXI7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfSxcclxuICAgIGdldCBldmVudHMoKSB7XHJcbiAgICAgIGlmIChtYW5pZmVzdD8uYXBpPy5ldmVudHMgfHwgZGV2TW9kZSkgcmV0dXJuIGV2ZW50cztcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9LFxyXG4gICAgZ2V0IHN0b3JhZ2UoKSB7XHJcbiAgICAgIGlmIChtYW5pZmVzdD8uYXBpPy5zdG9yYWdlIHx8IGRldk1vZGUpIHJldHVybiBzdG9yYWdlO1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH0sXHJcbiAgICBnZXQgd2Vic29ja2V0KCkge1xyXG4gICAgICBpZiAobWFuaWZlc3Q/LmFwaT8ud2Vic29ja2V0IHx8IGRldk1vZGUpIHJldHVybiB3ZWJzb2NrZXQ7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfSxcclxuICAgIGdldCB1aSgpIHtcclxuICAgICAgaWYgKG1hbmlmZXN0Py5hcGk/LnVpIHx8IGRldk1vZGUpIHJldHVybiB1aTtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9LFxyXG4gICAgZ2V0IHV0aWxzKCkge1xyXG4gICAgICBpZiAobWFuaWZlc3Q/LmFwaT8udXRpbHMgfHwgZGV2TW9kZSkgcmV0dXJuIHV0aWxzO1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH0sXHJcbiAgICBnZXQgZG9tKCkge1xyXG4gICAgICBpZiAobWFuaWZlc3Q/LmFwaT8uZG9tIHx8IGRldk1vZGUpIHJldHVybiBkb207XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfSxcclxuICAgIGdldCBkZXYoKSB7XHJcbiAgICAgIGlmIChtYW5pZmVzdD8uYXBpPy5kZXYgfHwgZGV2TW9kZSkgcmV0dXJuIGRldjtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIG91dDtcclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd0NvbmZpcm1hdGlvbk1vZGFsKCkge1xyXG5cclxufVxyXG5cclxuY29uc3Qgb3V0ID0ge1xyXG4gIF9fY2FjaGVfXzoge1xyXG4gICAgaW5pdGlhbGl6ZWQ6IGZhbHNlLFxyXG4gICAgbG9hZGVkOiBuZXN0cy5tYWtlKHt9KVxyXG4gIH0sXHJcbiAgc3RvcmFnZToge1xyXG4gICAgLyoqIEB0eXBlIHtuZXN0cy5OZXN0fSAqL1xyXG4gICAgaW5zdGFsbGVkOiB7fVxyXG4gIH0sXHJcbiAgYXN5bmMgaW5pdCgpIHtcclxuICAgIGlmIChvdXQuX19jYWNoZV9fLmluaXRpYWxpemVkKSByZXR1cm47XHJcbiAgICBvdXQuX19jYWNoZV9fLmluaXRpYWxpemVkID0gdHJ1ZTtcclxuICAgIG91dC5zdG9yYWdlLmluc3RhbGxlZCA9IGF3YWl0IHN0b3JhZ2UuY3JlYXRlUGVyc2lzdE5lc3QoXCJFeHRlbnNpb25zO0luc3RhbGxlZFwiKTtcclxuICB9LFxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgXHJcbiAgICovXHJcbiAgYXN5bmMgaW5zdGFsbCh1cmwsIGRlZmF1bHRDb25maWcgPSB7fSkge1xyXG4gICAgaWYgKCFvdXQuX19jYWNoZV9fLmluaXRpYWxpemVkKSBhd2FpdCBvdXQuaW5pdCgpO1xyXG4gICAgaWYgKHVybC5lbmRzV2l0aChcIi9cIikpIHVybCA9IHVybC5zbGljZSgwLCAtMSk7XHJcbiAgICBpZiAob3V0LnN0b3JhZ2UuaW5zdGFsbGVkLmdob3N0W3VybF0pIHRocm93IG5ldyBFcnJvcihgXCIke3VybH1cIiBleHRlbnNpb24gaXMgYWxyZWFkeSBpbnN0YWxsZWQuYCk7XHJcblxyXG4gICAgbGV0IG1ldGFSZXNwID0gYXdhaXQgZmV0Y2goYCR7dXJsfS9tYW5pZmVzdC5qc29uYCk7XHJcbiAgICBpZiAobWV0YVJlc3Auc3RhdHVzICE9PSAyMDApIHRocm93IG5ldyBFcnJvcihgXCIke3VybH1cIiBleHRlbnNpb24gbWFuaWZlc3QgaXMgbm90IHJlc3BvbmRlZCB3aXRoIDIwMCBzdGF0dXMgY29kZS5gKTtcclxuICAgIGxldCBtYW5pZmVzdCA9IEpTT04ucGFyc2UoYXdhaXQgbWV0YVJlc3AudGV4dCgpKTtcclxuXHJcbiAgICBsZXQgcmVhZG1lUmVzcCA9IGF3YWl0IGZldGNoKGAke3VybH0vcmVhZG1lLm1kYCk7XHJcbiAgICBsZXQgcmVhZG1lID0gcmVhZG1lUmVzcC5zdGF0dXMgPT09IDIwMCA/IGF3YWl0IHJlYWRtZVJlc3AudGV4dCgpIDogbnVsbDtcclxuXHJcbiAgICAvLyBUT0RPOiBTaG93IG1vZGFsIGZvciB1c2VyIHRvIGFjY2VwdCB0aGUgZXh0ZW5zaW9uICh0ZXJtcywgcHJpdmFjeSwgZXRjLilcclxuICAgIGF3YWl0IHNob3dDb25maXJtYXRpb25Nb2RhbCh7XHJcbiAgICAgIG1hbmlmZXN0LFxyXG4gICAgICByZWFkbWUsXHJcbiAgICAgIGNvbmZpZzoge1xyXG4gICAgICAgIGF1dG9VcGRhdGU6IHRydWUsXHJcbiAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICBvcmRlcjogMCxcclxuICAgICAgICAuLi5kZWZhdWx0Q29uZmlnXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGxldCBzb3VyY2VSZXNwID0gYXdhaXQgZmV0Y2goYCR7dXJsfS9zb3VyY2UuanNgKTtcclxuICAgIGlmIChzb3VyY2VSZXNwLnN0YXR1cyAhPT0gMjAwKSB0aHJvdyBuZXcgRXJyb3IoYFwiJHt1cmx9XCIgZXh0ZW5zaW9uIHNvdXJjZSBpcyBub3QgcmVzcG9uZGVkIHdpdGggMjAwIHN0YXR1cyBjb2RlLmApO1xyXG4gICAgbGV0IHNvdXJjZSA9IGF3YWl0IHNvdXJjZVJlc3AudGV4dCgpO1xyXG5cclxuICAgIG91dC5zdG9yYWdlLmluc3RhbGxlZC5zdG9yZVt1cmxdID0ge1xyXG4gICAgICBtYW5pZmVzdCxcclxuICAgICAgc291cmNlLFxyXG4gICAgICByZWFkbWUsXHJcbiAgICAgIGNvbmZpZzoge1xyXG4gICAgICAgIGF1dG9VcGRhdGU6IHRydWUsXHJcbiAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICBvcmRlcjogMCxcclxuICAgICAgICAuLi5kZWZhdWx0Q29uZmlnXHJcbiAgICAgIH0sXHJcbiAgICAgIGV4dHJhOiB7XHJcbiAgICAgICAgbGFzdFVwZGF0ZWRBdDogRGF0ZS5ub3coKVxyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGF3YWl0IG91dC5sb2FkKHVybCk7XHJcbiAgfSxcclxuICBhc3luYyB1cGRhdGUodXJsKSB7XHJcbiAgICBpZiAoIW91dC5fX2NhY2hlX18uaW5pdGlhbGl6ZWQpIGF3YWl0IG91dC5pbml0KCk7XHJcbiAgICBpZiAodXJsLmVuZHNXaXRoKFwiL1wiKSkgdXJsID0gdXJsLnNsaWNlKDAsIC0xKTtcclxuICAgIGlmICghb3V0LnN0b3JhZ2UuaW5zdGFsbGVkLmdob3N0W3VybF0pIHRocm93IG5ldyBFcnJvcihgXCIke3VybH1cIiBleHRlbnNpb24gaXMgbm90IGluc3RhbGxlZC5gKTtcclxuICAgIGlmIChvdXQuX19jYWNoZV9fLmxvYWRlZC5naG9zdFt1cmxdKSB0aHJvdyBuZXcgRXJyb3IoYFwiJHt1cmx9XCIgZXh0ZW5zaW9uIGlzIGxvYWRlZC4gUGxlYXNlIHVubG9hZCBpdCBmaXJzdC5gKTtcclxuXHJcbiAgICBsZXQgZGF0YSA9IG91dC5zdG9yYWdlLmluc3RhbGxlZC5naG9zdFt1cmxdO1xyXG5cclxuICAgIGxldCBtZXRhUmVzcCA9IGF3YWl0IGZldGNoKGAke3VybH0vbWFuaWZlc3QuanNvbmApO1xyXG4gICAgaWYgKG1ldGFSZXNwLnN0YXR1cyAhPT0gMjAwKSB0aHJvdyBuZXcgRXJyb3IoYFwiJHt1cmx9XCIgZXh0ZW5zaW9uIG1hbmlmZXN0IGlzIG5vdCByZXNwb25kZWQgd2l0aCAyMDAgc3RhdHVzIGNvZGUuYCk7XHJcbiAgICBsZXQgbWFuaWZlc3QgPSBKU09OLnBhcnNlKGF3YWl0IG1ldGFSZXNwLnRleHQoKSk7XHJcblxyXG4gICAgaWYgKGRhdGEubWFuaWZlc3QuaGFzaCA9PT0gbWFuaWZlc3QuaGFzaCkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgIGxldCByZWFkbWVSZXNwID0gYXdhaXQgZmV0Y2goYCR7dXJsfS9yZWFkbWUubWRgKTtcclxuICAgIGxldCByZWFkbWUgPSByZWFkbWVSZXNwLnN0YXR1cyA9PT0gMjAwID8gYXdhaXQgcmVhZG1lUmVzcC50ZXh0KCkgOiBudWxsO1xyXG5cclxuICAgIGxldCBzb3VyY2VSZXNwID0gYXdhaXQgZmV0Y2goYCR7dXJsfS9zb3VyY2UuanNgKTtcclxuICAgIGlmIChzb3VyY2VSZXNwLnN0YXR1cyAhPT0gMjAwKSB0aHJvdyBuZXcgRXJyb3IoYFwiJHt1cmx9XCIgZXh0ZW5zaW9uIHNvdXJjZSBpcyBub3QgcmVzcG9uZGVkIHdpdGggMjAwIHN0YXR1cyBjb2RlLmApO1xyXG4gICAgbGV0IHNvdXJjZSA9IGF3YWl0IHNvdXJjZVJlc3AudGV4dCgpO1xyXG5cclxuICAgIG91dC5zdG9yYWdlLmluc3RhbGxlZC5zdG9yZVt1cmxdID0ge1xyXG4gICAgICBtYW5pZmVzdCxcclxuICAgICAgc291cmNlLFxyXG4gICAgICByZWFkbWUsXHJcbiAgICAgIGNvbmZpZzogZGF0YS5jb25maWcsXHJcbiAgICAgIGV4dHJhOiB7XHJcbiAgICAgICAgbGFzdFVwZGF0ZWRBdDogRGF0ZS5ub3coKVxyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH0sXHJcbiAgYXN5bmMgdW5pbnN0YWxsKHVybCkge1xyXG4gICAgaWYgKCFvdXQuX19jYWNoZV9fLmluaXRpYWxpemVkKSBhd2FpdCBvdXQuaW5pdCgpO1xyXG4gICAgaWYgKHVybC5lbmRzV2l0aChcIi9cIikpIHVybCA9IHVybC5zbGljZSgwLCAtMSk7XHJcbiAgICBpZiAoIW91dC5zdG9yYWdlLmluc3RhbGxlZC5naG9zdFt1cmxdKSB0aHJvdyBuZXcgRXJyb3IoYFwiJHt1cmx9XCIgZXh0ZW5zaW9uIGlzIG5vdCBpbnN0YWxsZWQuYCk7XHJcblxyXG4gICAgZGVsZXRlIG91dC5zdG9yYWdlLmluc3RhbGxlZC5zdG9yZVt1cmxdO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGF3YWl0IG91dC51bmxvYWQodXJsKTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBsb2dnZXIuZXJyb3IoZXJyKTtcclxuICAgIH1cclxuICB9LFxyXG4gIGFzeW5jIGxvYWQodXJsKSB7XHJcbiAgICBpZiAoIW91dC5fX2NhY2hlX18uaW5pdGlhbGl6ZWQpIGF3YWl0IG91dC5pbml0KCk7XHJcbiAgICBpZiAodXJsLmVuZHNXaXRoKFwiL1wiKSkgdXJsID0gdXJsLnNsaWNlKDAsIC0xKTtcclxuICAgIGlmICghb3V0LnN0b3JhZ2UuaW5zdGFsbGVkLmdob3N0W3VybF0pIHRocm93IG5ldyBFcnJvcihgXCIke3VybH1cIiBleHRlbnNpb24gaXMgbm90IGluc3RhbGxlZC5gKTtcclxuICAgIGxldCBkYXRhID0gb3V0LnN0b3JhZ2UuaW5zdGFsbGVkLmdob3N0W3VybF07XHJcblxyXG4gICAgaWYgKG91dC5fX2NhY2hlX18ubG9hZGVkLmdob3N0W3VybF0pIHRocm93IG5ldyBFcnJvcihgXCIke3VybH1cIiBleHRlbnNpb24gaXMgYWxyZWFkeSBsb2FkZWQuYCk7XHJcblxyXG4gICAgYXdhaXQgb3V0LmxvYWRlci5sb2FkKHVybCwgZGF0YSk7XHJcbiAgfSxcclxuICBhc3luYyB1bmxvYWQodXJsKSB7XHJcbiAgICBpZiAoIW91dC5fX2NhY2hlX18uaW5pdGlhbGl6ZWQpIGF3YWl0IG91dC5pbml0KCk7XHJcbiAgICBpZiAodXJsLmVuZHNXaXRoKFwiL1wiKSkgdXJsID0gdXJsLnNsaWNlKDAsIC0xKTtcclxuICAgIGlmICghb3V0Ll9fY2FjaGVfXy5sb2FkZWQuZ2hvc3RbdXJsXSkgdGhyb3cgbmV3IEVycm9yKGBcIiR7dXJsfVwiIGV4dGVuc2lvbiBpcyBub3QgbG9hZGVkLmApO1xyXG5cclxuICAgIGF3YWl0IG91dC5sb2FkZXIudW5sb2FkKHVybCk7XHJcbiAgfSxcclxuICBldmFsdWF0ZShzb3VyY2UsIGFwaSkge1xyXG4gICAgY29uc3QgJGFjb3JkID0gYXBpO1xyXG4gICAgcmV0dXJuIGV2YWwoc291cmNlKTtcclxuICB9LFxyXG4gIGFzeW5jIGxvYWRBbGwoKSB7XHJcbiAgICBpZiAoIW91dC5fX2NhY2hlX18uaW5pdGlhbGl6ZWQpIGF3YWl0IG91dC5pbml0KCk7XHJcbiAgICByZXR1cm4gUHJvbWlzZS5hbGwoT2JqZWN0LmVudHJpZXMob3V0LnN0b3JhZ2UuaW5zdGFsbGVkLmdob3N0KS5zb3J0KChbLCBhXSwgWywgYl0pID0+IGIuY29uZmlnLm9yZGVyIC0gYS5jb25maWcub3JkZXIpLm1hcChhc3luYyAoW3VybCwgZF0pID0+IHtcclxuICAgICAgaWYgKGQuY29uZmlnLmF1dG9VcGRhdGUpIGF3YWl0IG91dC51cGRhdGUodXJsKTtcclxuXHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgaWYgKGQuY29uZmlnLmVuYWJsZWQpIGF3YWl0IG91dC5sb2FkKHVybCk7XHJcbiAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICBsb2dnZXIuZXJyb3IoXCJVbmFibGUgdG8gbG9hZCBleHRlbnNpb25cIiwgdXJsLCBlKTtcclxuICAgICAgfVxyXG4gICAgfSkpO1xyXG4gIH0sXHJcbiAgYXN5bmMgdW5sb2FkQWxsKCkge1xyXG4gICAgaWYgKCFvdXQuX19jYWNoZV9fLmluaXRpYWxpemVkKSBhd2FpdCBvdXQuaW5pdCgpO1xyXG4gICAgcmV0dXJuIFByb21pc2UuYWxsKE9iamVjdC5rZXlzKG91dC5fX2NhY2hlX18ubG9hZGVkLmdob3N0KS5tYXAodXJsID0+IG91dC51bmxvYWQodXJsKSkpO1xyXG4gIH0sXHJcbiAgZ2V0KHVybCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbG9hZGVkOiBvdXQuX19jYWNoZV9fLmxvYWRlZC5naG9zdFt1cmxdLFxyXG4gICAgICBpbnN0YWxsZWQ6IG91dC5zdG9yYWdlLmluc3RhbGxlZC5naG9zdFt1cmxdXHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgbG9hZGVyOiB7XHJcbiAgICBhc3luYyBsb2FkKGlkLCBkYXRhKSB7XHJcbiAgICAgIGlmIChkYXRhLm1hbmlmZXN0LnR5cGUgPT09ICdwbHVnaW4nKSB7XHJcbiAgICAgICAgbGV0IGFwaSA9IGF3YWl0IGJ1aWxkUGx1Z2luQVBJKGRhdGEubWFuaWZlc3QsIGBFeHRlbnNpb247UGVyc2lzdDske2lkfWApO1xyXG4gICAgICAgIGlmIChhcGkuZXh0ZW5zaW9uLnBlcnNpc3QuZ2hvc3Quc2V0dGluZ3MgPT09IHVuZGVmaW5lZCkgYXBpLmV4dGVuc2lvbi5wZXJzaXN0LnN0b3JlLnNldHRpbmdzID0ge307XHJcbiAgICAgICAgZmluZEluVHJlZShkYXRhLm1hbmlmZXN0Py5jb25maWcgPz8gW10sIChpKSA9PiBpLmlkLCB7IGFsbDogdHJ1ZSB9KS5mb3JFYWNoKFxyXG4gICAgICAgICAgKGkpID0+IHtcclxuICAgICAgICAgICAgYXBpLmV4dGVuc2lvbi5wZXJzaXN0LnN0b3JlLnNldHRpbmdzW2kuaWRdID8/PSBpLmRlZmF1bHQ7XHJcbiAgICAgICAgICAgIGlmIChpLmhhc093blByb3BlcnR5KFwidmFsdWVcIikpIGkudmFsdWUgPz89IGFwaS5leHRlbnNpb24ucGVyc2lzdC5zdG9yZS5zZXR0aW5nc1tpLmlkXTtcclxuICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBsZXQgZXZhbHVhdGVkID0gb3V0LmV2YWx1YXRlKGRhdGEuc291cmNlLCBhcGkpO1xyXG4gICAgICAgIGF3YWl0IGV2YWx1YXRlZD8ubG9hZD8uKCk7XHJcbiAgICAgICAgY29uc3Qgb2ZmQ29uZmlnTGlzdGVuZXIgPVxyXG4gICAgICAgICAgZXZlbnRzLm9uKFwiZXh0ZW5zaW9uLWNvbmZpZy1pbnRlcmFjdGlvblwiLCAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5leHRlbnNpb24gIT09IGlkKSByZXR1cm47XHJcbiAgICAgICAgICAgIGlmIChkYXRhLml0ZW0uaWQpIHtcclxuICAgICAgICAgICAgICBhcGkuZXh0ZW5zaW9uLnBlcnNpc3Quc3RvcmUuc2V0dGluZ3NbZGF0YS5pdGVtLmlkXSA9IGRhdGEuaXRlbS52YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBldmFsdWF0ZWQ/LmNvbmZpZz8uKHtcclxuICAgICAgICAgICAgICBpdGVtOiBkYXRhLml0ZW0sXHJcbiAgICAgICAgICAgICAgZGF0YTogZGF0YS5kYXRhLFxyXG4gICAgICAgICAgICAgIGdldEl0ZW0oaXRlbUlkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmluZEluVHJlZShkYXRhLm1hbmlmZXN0LmNvbmZpZywgKGkpID0+IGkuaWQgPT09IGl0ZW1JZCk7XHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBnZXRJdGVtcygpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmaW5kSW5UcmVlKGRhdGEubWFuaWZlc3QuY29uZmlnLCAoaSkgPT4gaS5pZCwgeyBhbGw6IHRydWUgfSk7XHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBzYXZlKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFkYXRhLml0ZW0uaWQpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGFwaS5leHRlbnNpb24ucGVyc2lzdC5zdG9yZS5zZXR0aW5nc1tkYXRhLml0ZW0uaWRdID0gZGF0YS5pdGVtLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIGZ1bmN0aW9uIHVubG9hZCgpIHtcclxuICAgICAgICAgIG9mZkNvbmZpZ0xpc3RlbmVyKCk7XHJcbiAgICAgICAgICBhcGkuZXh0ZW5zaW9uLnN1YnNjcmlwdGlvbnMuZm9yRWFjaChpID0+IHsgaWYgKHR5cGVvZiBpID09PSBcImZ1bmN0aW9uXCIpIGkoKTsgfSk7XHJcbiAgICAgICAgICBhcGkuZXh0ZW5zaW9uLmV2ZW50cy5lbWl0KFwidW5sb2FkXCIpO1xyXG4gICAgICAgICAgZXZhbHVhdGVkPy51bmxvYWQ/LigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBvdXQuX19jYWNoZV9fLmxvYWRlZC5zdG9yZVtpZF0gPSB7IGV2YWx1YXRlZCwgYXBpLCB1bmxvYWQgfTtcclxuICAgICAgICByZXR1cm4geyBldmFsdWF0ZWQsIGFwaSwgdW5sb2FkIH07XHJcbiAgICAgIH0gZWxzZSBpZiAoZGF0YS5tYW5pZmVzdC50eXBlID09PSAndGhlbWUnKSB7XHJcbiAgICAgICAgbGV0IGV2YWx1YXRlZCA9IG91dC5ldmFsdWF0ZShkYXRhLnNvdXJjZSwgbnVsbCk7XHJcbiAgICAgICAgY29uc3QgcGVyc2lzdCA9IGF3YWl0IHN0b3JhZ2UuY3JlYXRlUGVyc2lzdE5lc3QoYEV4dGVuc2lvbjtQZXJzaXN0OyR7aWR9YCk7XHJcbiAgICAgICAgaWYgKHBlcnNpc3QuZ2hvc3Quc2V0dGluZ3MgPT09IHVuZGVmaW5lZCkgcGVyc2lzdC5zdG9yZS5zZXR0aW5ncyA9IHt9O1xyXG4gICAgICAgIGZpbmRJblRyZWUoZGF0YS5tYW5pZmVzdD8uY29uZmlnID8/IFtdLCAoaSkgPT4gaS5pZCwgeyBhbGw6IHRydWUgfSkuZm9yRWFjaChcclxuICAgICAgICAgIChpKSA9PiB7XHJcbiAgICAgICAgICAgIHBlcnNpc3Quc3RvcmUuc2V0dGluZ3NbaS5pZF0gPz89IGkuZGVmYXVsdDtcclxuICAgICAgICAgICAgaWYgKGkuaGFzT3duUHJvcGVydHkoXCJ2YWx1ZVwiKSkgaS52YWx1ZSA/Pz0gcGVyc2lzdC5zdG9yZS5zZXR0aW5nc1tpLmlkXTtcclxuICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgICAgIGxldCBjc3NUZXh0ID0gZXZhbHVhdGVkKCk7XHJcbiAgICAgICAgbGV0IGluamVjdGVkUmVzID0gcGF0Y2hlci5pbmplY3RDU1MoY3NzVGV4dCwgcGVyc2lzdC5naG9zdC5zZXR0aW5ncyk7XHJcblxyXG4gICAgICAgIGNvbnN0IG9mZkNvbmZpZ0xpc3RlbmVyID1cclxuICAgICAgICAgIGV2ZW50cy5vbihcImV4dGVuc2lvbi1jb25maWctaW50ZXJhY3Rpb25cIiwgKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgaWYgKGRhdGEuZXh0ZW5zaW9uICE9PSBpZCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBpZiAoIWRhdGEuY29uZmlnLmlkKSByZXR1cm47XHJcbiAgICAgICAgICAgIHBlcnNpc3Quc3RvcmUuc2V0dGluZ3NbZGF0YS5jb25maWcuaWRdID0gZGF0YS5kYXRhLnZhbHVlO1xyXG4gICAgICAgICAgICBpbmplY3RlZFJlcyhwZXJzaXN0Lmdob3N0LnNldHRpbmdzKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIGZ1bmN0aW9uIHVubG9hZCgpIHtcclxuICAgICAgICAgIG9mZkNvbmZpZ0xpc3RlbmVyKCk7XHJcbiAgICAgICAgICBpbmplY3RlZFJlcygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb3V0Ll9fY2FjaGVfXy5sb2FkZWQuc3RvcmVbaWRdID0geyBldmFsdWF0ZWQsIHVubG9hZCB9O1xyXG4gICAgICAgIHJldHVybiB7IGV2YWx1YXRlZCwgdW5sb2FkIH07XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICB1bmxvYWQoaWQpIHtcclxuICAgICAgb3V0Ll9fY2FjaGVfXy5sb2FkZWQuZ2hvc3Q/LltpZF0/LnVubG9hZD8uKCk7XHJcbiAgICAgIGRlbGV0ZSBvdXQuX19jYWNoZV9fLmxvYWRlZC5zdG9yZVtpZF07XHJcbiAgICB9XHJcbiAgfVxyXG59O1xyXG5cclxud2FpdFVudGlsQ29ubmVjdGlvbk9wZW4oKS50aGVuKGFzeW5jICgpID0+IHtcclxuICBhd2FpdCB1dGlscy5zbGVlcCgxMDApO1xyXG4gIG91dC5sb2FkQWxsKCk7XHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgb3V0OyIsICJpbXBvcnQgeyB3YWl0VW50aWxDb25uZWN0aW9uT3BlbiB9IGZyb20gXCIuLi8uLi9vdGhlci91dGlscy5qc1wiO1xyXG5pbXBvcnQgY29tbW9uIGZyb20gXCIuLi9tb2R1bGVzL2NvbW1vbi5qc1wiO1xyXG5pbXBvcnQgcGF0Y2hlciBmcm9tIFwiLi4vcGF0Y2hlci9pbmRleC5qc1wiO1xyXG5cclxuY29uc3Qgc29ja2V0cyA9IG5ldyBTZXQoKTtcclxuY29uc3QgaGFuZGxlcnMgPSBuZXcgTWFwKCk7XHJcblxyXG53YWl0VW50aWxDb25uZWN0aW9uT3BlbigpLnRoZW4oKCkgPT4ge1xyXG4gIHBhdGNoZXIuaW5zdGVhZChcclxuICAgIFwiaGFuZGxlQ29ubmVjdGlvblwiLFxyXG4gICAgY29tbW9uLldlYlNvY2tldCxcclxuICAgIChhcmdzLCBvcmlnKSA9PiB7XHJcbiAgICAgIGNvbnN0IHdzID0gYXJnc1swXTtcclxuICAgICAgaWYgKHdzLnVwZ3JhZGVSZXEoKS51cmwgIT09IFwiL2Fjb3JkXCIpIHJldHVybiBvcmlnKC4uLmFyZ3MpO1xyXG5cclxuICAgICAgc29ja2V0cy5hZGQod3MpO1xyXG5cclxuICAgICAgd3Mub24oXCJtZXNzYWdlXCIsIGFzeW5jIChtc2cpID0+IHtcclxuICAgICAgICBsZXQganNvbjtcclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIGpzb24gPSBKU09OLnBhcnNlKG1zZyk7XHJcbiAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoanNvbikgfHwganNvbi5sZW5ndGggPCAxIHx8IGpzb24ubGVuZ3RoID4gMylcclxuICAgICAgICAgICAgdGhyb3cgXCJBcnJheSBleHBlY3RlZCBhcyBtZXNzYWdlLlwiO1xyXG4gICAgICAgICAgaWYgKHR5cGVvZiBqc29uWzBdICE9IFwic3RyaW5nXCIpIHRocm93IFwiQXJyYXlbMF0gbmVlZHMgdG8gYmUgc3RyaW5nLlwiO1xyXG4gICAgICAgICAgaWYgKHR5cGVvZiBqc29uWzFdICE9IFwic3RyaW5nXCIpIHRocm93IFwiQXJyYXlbMV0gbmVlZHMgdG8gYmUgc3RyaW5nLlwiO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgd3Muc2VuZChcclxuICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoW1xyXG4gICAgICAgICAgICAgIG51bGwsXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgb2s6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgZXJyb3I6IGAke2Vycn1gLFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIF0pXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgW2V2ZW50SWQsIGV2ZW50TmFtZSwgZXZlbnREYXRhXSA9IGpzb247XHJcblxyXG4gICAgICAgIGNvbnN0IGhhbmRsZXIgPSBoYW5kbGVycy5nZXQoZXZlbnROYW1lKTtcclxuXHJcbiAgICAgICAgaWYgKCFoYW5kbGVyKVxyXG4gICAgICAgICAgcmV0dXJuIHdzLnNlbmQoXHJcbiAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KFtcclxuICAgICAgICAgICAgICBldmVudElkLFxyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG9rOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGVycm9yOiBgVW5hYmxlIHRvIGZpbmQgaGFuZGxlci5gLFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIF0pXHJcbiAgICAgICAgICApO1xyXG5cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgbGV0IHJlc3BvbnNlID0gYXdhaXQgaGFuZGxlcihldmVudERhdGEpO1xyXG4gICAgICAgICAgd3Muc2VuZChcclxuICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoW1xyXG4gICAgICAgICAgICAgIGV2ZW50SWQsXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgb2s6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiByZXNwb25zZSxcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBdKVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgIHdzLnNlbmQoXHJcbiAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KFtcclxuICAgICAgICAgICAgICBldmVudElkLFxyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG9rOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGVycm9yOiBgJHtlcnJ9YCxcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBdKVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgd3Mub24oXCJjbG9zZVwiLCAoKSA9PiBzb2NrZXRzLmRlbGV0ZSh3cykpO1xyXG4gICAgfVxyXG4gICk7XHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gc2V0KGV2ZW50TmFtZSwgY2FsbGJhY2spIHtcclxuICBpZiAodHlwZW9mIGV2ZW50TmFtZSAhPSBcInN0cmluZ1wiKVxyXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiRXZlbnROYW1lIG5lZWRzIHRvIGJlIGEgc3RyaW5nLlwiKTtcclxuICBpZiAodHlwZW9mIGNhbGxiYWNrICE9IFwiZnVuY3Rpb25cIilcclxuICAgIHRocm93IG5ldyBFcnJvcihcIkNhbGxiYWNrIG5lZWRzIHRvIGJlIGEgZnVuY3Rpb24uXCIpO1xyXG4gIGlmIChoYW5kbGVycy5oYXMoZXZlbnROYW1lKSlcclxuICAgIHRocm93IG5ldyBFcnJvcihcIkV2ZW50TmFtZSBhbHJlYWR5IGluIHVzZS5cIik7XHJcbiAgaGFuZGxlcnMuc2V0KGV2ZW50TmFtZSwgY2FsbGJhY2spO1xyXG4gIHJldHVybiAoKSA9PiB7XHJcbiAgICBoYW5kbGVycy5kZWxldGUoZXZlbnROYW1lKTtcclxuICB9O1xyXG59XHJcbmZ1bmN0aW9uIHRyaWdnZXIoZXZlbnROYW1lLCAuLi5hcmdzKSB7XHJcbiAgaWYgKCFzb2NrZXRFdmVudHMuaGFzKGV2ZW50TmFtZSkpXHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmFibGUgdG8gZmluZCBoYW5kbGVyIVwiKTtcclxuICByZXR1cm4gc29ja2V0RXZlbnRzLmdldChldmVudE5hbWUpKC4uLmFyZ3MpO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgc2V0LFxyXG4gIHRyaWdnZXJcclxufVxyXG5cclxuIiwgImV4cG9ydCBkZWZhdWx0IGBcbi5hY29yZC0tbGF5ZXItY29udGFpbmVyey0tdG9wLW9mZnNldDogMHB4O3dpZHRoOjEwMHZ3O2hlaWdodDpjYWxjKDEwMHZoIC0gdmFyKC0tdG9wLW9mZnNldCkpO3otaW5kZXg6OTk5OTk5OTtwb2ludGVyLWV2ZW50czpub25lO3Bvc2l0aW9uOmFic29sdXRlO3RvcDp2YXIoLS10b3Atb2Zmc2V0KTtsZWZ0OjBweH0uYWNvcmQtLWxheWVyLWNvbnRhaW5lciAqe3otaW5kZXg6OTk5OTk5OTk5OTk5OTl9LmFjb3JkLS10b29sdGlwLWxheWVye29wYWNpdHk6MDt0cmFuc2l0aW9uOjUwbXMgbGluZWFyIG9wYWNpdHk7cG9zaXRpb246YWJzb2x1dGU7cG9pbnRlci1ldmVudHM6bm9uZX0uYWNvcmQtLXRvb2x0aXAtbGF5ZXIudmlzaWJsZXtvcGFjaXR5OjE7cG9pbnRlci1ldmVudHM6YWxsfS5hY29yZC0tdG9hc3RzLWNvbnRhaW5lcntkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2p1c3RpZnktY29udGVudDpmbGV4LWVuZDtmbGV4LWRpcmVjdGlvbjpjb2x1bW47d2lkdGg6MTAwdnc7aGVpZ2h0OmNhbGMoMTAwdmggLSB2YXIoLS10b3Atb2Zmc2V0KSk7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7bGVmdDowO3BvaW50ZXItZXZlbnRzOm5vbmU7cGFkZGluZy1ib3R0b206MzJweH0uYWNvcmQtLXRvYXN0cy1jb250YWluZXIgLmFjb3JkLS10b2FzdHt0cmFuc2l0aW9uOnRyYW5zZm9ybSAyNTBtcyBlYXNlLWluLW91dCxvcGFjaXR5IDI1MG1zIGVhc2UtaW4tb3V0O2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7cG9pbnRlci1ldmVudHM6bm9uZTtib3JkZXItcmFkaXVzOjRweDtwYWRkaW5nOjhweDtib3gtc2hhZG93OjBweCAycHggOHB4IHJnYmEoMCwwLDAsLjI1KTtvcGFjaXR5OjE7Z2FwOjhweDtmb250LXNpemU6MTRweDttYXJnaW46NHB4fS5hY29yZC0tdG9hc3RzLWNvbnRhaW5lciAuYWNvcmQtLXRvYXN0IHN2Z3t3aWR0aDoxNnB4O2hlaWdodDoxNnB4fS5hY29yZC0tdG9hc3RzLWNvbnRhaW5lciAuYWNvcmQtLXRvYXN0LmNsaWNrYWJsZXtjdXJzb3I6cG9pbnRlcjtwb2ludGVyLWV2ZW50czphbGx9LmFjb3JkLS10b2FzdHMtY29udGFpbmVyIC5hY29yZC0tdG9hc3QuY2xvc2luZ3tvcGFjaXR5OjA7dHJhbnNmb3JtOnRyYW5zbGF0ZSgwLCAtNTBweCl9LmFjb3JkLS10b2FzdHMtY29udGFpbmVyIC5hY29yZC0tdG9hc3QuaGlkZGVue29wYWNpdHk6MDt0cmFuc2Zvcm06dHJhbnNsYXRlKDAsIDUwcHgpfS5hY29yZC0tdG9hc3RzLWNvbnRhaW5lciAuYWNvcmQtLXRvYXN0LnN0eWxlLWluZm97YmFja2dyb3VuZC1jb2xvcjojNGE4ZmUxO2NvbG9yOiNmNWY1ZjV9LmFjb3JkLS10b2FzdHMtY29udGFpbmVyIC5hY29yZC0tdG9hc3Quc3R5bGUtd2FybmluZ3tiYWNrZ3JvdW5kLWNvbG9yOiNmYWE4MWE7Y29sb3I6IzAwMH0uYWNvcmQtLXRvYXN0cy1jb250YWluZXIgLmFjb3JkLS10b2FzdC5zdHlsZS1lcnJvcntiYWNrZ3JvdW5kLWNvbG9yOiNlZDQyNDU7Y29sb3I6IzAwMH0uYWNvcmQtLXRvYXN0cy1jb250YWluZXIgLmFjb3JkLS10b2FzdC5zdHlsZS1zdWNjZXNze2JhY2tncm91bmQtY29sb3I6IzNiYTU1ZDtjb2xvcjojZjVmNWY1fS5hY29yZC0tdG9hc3RzLWNvbnRhaW5lciAuYWNvcmQtLXRvYXN0LnN0eWxlLWRlZmF1bHR7YmFja2dyb3VuZC1jb2xvcjojZjVmNWY1O2NvbG9yOiMwMDB9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXJ7d2lkdGg6MTAwdnc7aGVpZ2h0OmNhbGMoMTAwdmggLSB2YXIoLS10b3Atb2Zmc2V0KSk7ZGlzcGxheTpmbGV4O3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6MDtwb2ludGVyLWV2ZW50czpub25lfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyIC5hY29yZC0tbm90aWZpY2F0aW9ue2Rpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpjb2x1bW47cG9pbnRlci1ldmVudHM6YWxsO3RyYW5zaXRpb246dHJhbnNmb3JtIDI1MG1zIGVhc2UtaW4tb3V0LG9wYWNpdHkgMjUwbXMgZWFzZS1pbi1vdXQ7bWFyZ2luOjRweDtiYWNrZHJvcC1maWx0ZXI6Ymx1cigxNnB4KSBicmlnaHRuZXNzKDAuNzUpOy13ZWJraXQtYXBwLXJlZ2lvbjpuby1kcmFnOy0tYW5pbWF0aW9uLXNpemU6IDUwcHh9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24uaGlkZGVuLC5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyIC5hY29yZC0tbm90aWZpY2F0aW9uLmNsb3Npbmd7b3BhY2l0eTowfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyIC5hY29yZC0tbm90aWZpY2F0aW9uPi5jb250YWluZXJ7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2VlbjtwYWRkaW5nOjhweDtjb2xvcjojZmZmO21pbi13aWR0aDoyNTBweH0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllciAuYWNvcmQtLW5vdGlmaWNhdGlvbj4uY29udGFpbmVyPi5jbG9zZXt3aWR0aDoyNHB4O2hlaWdodDoyNHB4O2NvbG9yOiNmZmY7b3BhY2l0eTouNTtjdXJzb3I6cG9pbnRlcjttYXJnaW4tbGVmdDo4cHg7ei1pbmRleDo5OTk5OTk5OTl9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24+LmNvbnRhaW5lcj4uY2xvc2UuaGlkZGVue2Rpc3BsYXk6bm9uZX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllciAuYWNvcmQtLW5vdGlmaWNhdGlvbj4ucHJvZ3Jlc3MtY29udGFpbmVye3dpZHRoOjEwMCU7aGVpZ2h0OjVweH0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllciAuYWNvcmQtLW5vdGlmaWNhdGlvbj4ucHJvZ3Jlc3MtY29udGFpbmVyPi5wcm9ncmVzc3t3aWR0aDowJTtoZWlnaHQ6NXB4O3RyYW5zaXRpb246d2lkdGggdmFyKC0tZHVyYXRpb24pIGxpbmVhcjtiYWNrZ3JvdW5kLWNvbG9yOnZhcigtLWJhci1jb2xvcil9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24+LnByb2dyZXNzLWNvbnRhaW5lcj4ucHJvZ3Jlc3MucHJvZ3Jlc3Npbmd7d2lkdGg6MTAwJX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllciAuYWNvcmQtLW5vdGlmaWNhdGlvbi5zdHlsZS1pbmZvey0tYmFyLWNvbG9yOiAjNGE4ZmUxfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyIC5hY29yZC0tbm90aWZpY2F0aW9uLnN0eWxlLXdhcm5pbmd7LS1iYXItY29sb3I6ICNmYWE4MWF9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24uc3R5bGUtZXJyb3J7LS1iYXItY29sb3I6ICNlZDQyNDV9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24uc3R5bGUtc3VjY2Vzc3stLWJhci1jb2xvcjogIzNiYTU1ZH0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllciAuYWNvcmQtLW5vdGlmaWNhdGlvbi5zdHlsZS1kZWZhdWx0ey0tYmFyLWNvbG9yOiB3aGl0ZXNtb2tlfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLnRvcC1yaWdodHtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1lbmQ7YWxpZ24taXRlbXM6ZmxleC1zdGFydH0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci50b3AtcmlnaHQgLmFjb3JkLS1ub3RpZmljYXRpb24uaGlkZGVue3RyYW5zZm9ybTp0cmFuc2xhdGUoMCwgY2FsYyh2YXIoLS1hbmltYXRpb24tc2l6ZSkgKiAtMSkpfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLnRvcC1yaWdodCAuYWNvcmQtLW5vdGlmaWNhdGlvbi5jbG9zaW5ne3RyYW5zZm9ybTp0cmFuc2xhdGUoMCwgdmFyKC0tYW5pbWF0aW9uLXNpemUpKX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci50b3AtbGVmdHtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1zdGFydDthbGlnbi1pdGVtczpmbGV4LXN0YXJ0fS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLnRvcC1sZWZ0IC5hY29yZC0tbm90aWZpY2F0aW9uLmhpZGRlbnt0cmFuc2Zvcm06dHJhbnNsYXRlKDAsIGNhbGModmFyKC0tYW5pbWF0aW9uLXNpemUpICogLTEpKX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci50b3AtbGVmdCAuYWNvcmQtLW5vdGlmaWNhdGlvbi5jbG9zaW5ne3RyYW5zZm9ybTp0cmFuc2xhdGUoMCwgdmFyKC0tYW5pbWF0aW9uLXNpemUpKX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci5ib3R0b20tcmlnaHR7anVzdGlmeS1jb250ZW50OmZsZXgtZW5kO2FsaWduLWl0ZW1zOmZsZXgtZW5kfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLmJvdHRvbS1yaWdodCAuYWNvcmQtLW5vdGlmaWNhdGlvbi5oaWRkZW57dHJhbnNmb3JtOnRyYW5zbGF0ZSgwLCB2YXIoLS1hbmltYXRpb24tc2l6ZSkpfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLmJvdHRvbS1yaWdodCAuYWNvcmQtLW5vdGlmaWNhdGlvbi5jbG9zaW5ne3RyYW5zZm9ybTp0cmFuc2xhdGUoMCwgY2FsYyh2YXIoLS1hbmltYXRpb24tc2l6ZSkgKiAtMSkpfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLmJvdHRvbS1sZWZ0e2p1c3RpZnktY29udGVudDpmbGV4LXN0YXJ0O2FsaWduLWl0ZW1zOmZsZXgtZW5kfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLmJvdHRvbS1sZWZ0IC5hY29yZC0tbm90aWZpY2F0aW9uLmhpZGRlbnt0cmFuc2Zvcm06dHJhbnNsYXRlKDAsIHZhcigtLWFuaW1hdGlvbi1zaXplKSl9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIuYm90dG9tLWxlZnQgLmFjb3JkLS1ub3RpZmljYXRpb24uY2xvc2luZ3t0cmFuc2Zvcm06dHJhbnNsYXRlKDAsIGNhbGModmFyKC0tYW5pbWF0aW9uLXNpemUpICogLTEpKX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci50b3AtY2VudGVye2p1c3RpZnktY29udGVudDpjZW50ZXI7YWxpZ24taXRlbXM6ZmxleC1zdGFydH0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci50b3AtY2VudGVyIC5hY29yZC0tbm90aWZpY2F0aW9uLmhpZGRlbnt0cmFuc2Zvcm06dHJhbnNsYXRlKDAsIGNhbGModmFyKC0tYW5pbWF0aW9uLXNpemUpICogLTEpKX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci50b3AtY2VudGVyIC5hY29yZC0tbm90aWZpY2F0aW9uLmNsb3Npbmd7dHJhbnNmb3JtOnRyYW5zbGF0ZSgwLCB2YXIoLS1hbmltYXRpb24tc2l6ZSkpfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLmJvdHRvbS1jZW50ZXJ7anVzdGlmeS1jb250ZW50OmNlbnRlcjthbGlnbi1pdGVtczpmbGV4LWVuZH0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci5ib3R0b20tY2VudGVyIC5hY29yZC0tbm90aWZpY2F0aW9uLmhpZGRlbnt0cmFuc2Zvcm06dHJhbnNsYXRlKDAsIHZhcigtLWFuaW1hdGlvbi1zaXplKSl9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIuYm90dG9tLWNlbnRlciAuYWNvcmQtLW5vdGlmaWNhdGlvbi5jbG9zaW5ne3RyYW5zZm9ybTp0cmFuc2xhdGUoMCwgY2FsYyh2YXIoLS1hbmltYXRpb24tc2l6ZSkgKiAtMSkpfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLmNlbnRlcntqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO2FsaWduLWl0ZW1zOmNlbnRlcn0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci5jZW50ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24uaGlkZGVue3RyYW5zZm9ybTpzY2FsZSgwLjUpfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLmNlbnRlciAuYWNvcmQtLW5vdGlmaWNhdGlvbi5jbG9zaW5ne3RyYW5zZm9ybTpzY2FsZSgwLjUpfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLmxlZnQtY2VudGVye2p1c3RpZnktY29udGVudDpmbGV4LXN0YXJ0O2FsaWduLWl0ZW1zOmNlbnRlcn0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci5sZWZ0LWNlbnRlciAuYWNvcmQtLW5vdGlmaWNhdGlvbi5oaWRkZW57dHJhbnNmb3JtOnRyYW5zbGF0ZShjYWxjKHZhcigtLWFuaW1hdGlvbi1zaXplKSAqIC0xKSwgMCl9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIubGVmdC1jZW50ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24uY2xvc2luZ3t0cmFuc2Zvcm06dHJhbnNsYXRlKHZhcigtLWFuaW1hdGlvbi1zaXplKSwgMCl9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIucmlnaHQtY2VudGVye2p1c3RpZnktY29udGVudDpmbGV4LWVuZDthbGlnbi1pdGVtczpjZW50ZXJ9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIucmlnaHQtY2VudGVyIC5hY29yZC0tbm90aWZpY2F0aW9uLmhpZGRlbnt0cmFuc2Zvcm06dHJhbnNsYXRlKHZhcigtLWFuaW1hdGlvbi1zaXplKSwgMCl9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIucmlnaHQtY2VudGVyIC5hY29yZC0tbm90aWZpY2F0aW9uLmNsb3Npbmd7dHJhbnNmb3JtOnRyYW5zbGF0ZShjYWxjKHZhcigtLWFuaW1hdGlvbi1zaXplKSAqIC0xKSwgMCl9YDtcbiIsICJpbXBvcnQgZG9tIGZyb20gXCIuLi9kb20vaW5kZXguanNcIjtcclxuaW1wb3J0IGV2ZW50cyBmcm9tIFwiLi4vZXZlbnRzL2luZGV4LmpzXCI7XHJcbmltcG9ydCB3ZWJwYWNrIGZyb20gXCIuLi9tb2R1bGVzL3dlYnBhY2suanNcIjtcclxuXHJcbmNvbnN0IHRvb2x0aXBDbGFzc2VzID0gd2VicGFjay5maW5kQnlQcm9wZXJ0aWVzKFwidG9vbHRpcENvbnRlbnRBbGxvd092ZXJmbG93XCIsIFwidG9vbHRpcFwiKTtcclxuXHJcbmNvbnN0IHRvb2x0aXBQb3NpdGlvbnMgPSB7XHJcbiAgdG9wOiB0b29sdGlwQ2xhc3Nlcy50b29sdGlwVG9wLFxyXG4gIGJvdHRvbTogdG9vbHRpcENsYXNzZXMudG9vbHRpcEJvdHRvbSxcclxuICBsZWZ0OiB0b29sdGlwQ2xhc3Nlcy50b29sdGlwTGVmdCxcclxuICByaWdodDogdG9vbHRpcENsYXNzZXMudG9vbHRpcFJpZ2h0LFxyXG59XHJcblxyXG5jbGFzcyBUb29sdGlwIHtcclxuICAvKipcclxuICAgKiBAcGFyYW0ge0hUTUxEaXZFbGVtZW50fSB0YXJnZXQgXHJcbiAgICogQHBhcmFtIHtzdHJpbmd8SFRNTERpdkVsZW1lbnR9IGNvbnRlbnRcclxuICAgKi9cclxuICBjb25zdHJ1Y3Rvcih0YXJnZXQsIGNvbnRlbnQsIHBvc2l0aW9uID0gXCJhdXRvXCIpIHtcclxuICAgIC8qKiBAdHlwZSB7SFRNTERpdkVsZW1lbnR9ICovXHJcbiAgICB0aGlzLmxheWVyRWxlbWVudCA9IGRvbS5wYXJzZShgXHJcbiAgICAgIDxkaXYgY2xhc3M9XCJhY29yZC0tdG9vbHRpcC1sYXllclwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCIke3Rvb2x0aXBDbGFzc2VzLnRvb2x0aXB9ICR7dG9vbHRpcENsYXNzZXMudG9vbHRpcFByaW1hcnl9IGFjb3JkLS10b29sdGlwXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiJHt0b29sdGlwQ2xhc3Nlcy50b29sdGlwUG9pbnRlcn0gYWNvcmQtLXRvb2x0aXAtcG9pbnRlclwiPjwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cIiR7dG9vbHRpcENsYXNzZXMudG9vbHRpcENvbnRlbnR9IGFjb3JkLS10b29sdGlwLWNvbnRlbnRcIj48L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICBgKTtcclxuICAgIHRoaXMudG9vbHRpcEVsZW1lbnQgPSB0aGlzLmxheWVyRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmFjb3JkLS10b29sdGlwXCIpO1xyXG4gICAgdGhpcy5jb250ZW50RWxlbWVudCA9IHRoaXMubGF5ZXJFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWNvcmQtLXRvb2x0aXAtY29udGVudFwiKTtcclxuICAgIHRoaXMuY29udGVudCA9IGNvbnRlbnQ7XHJcbiAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuICAgIHRoaXMucG9zaXRpb24gPSBwb3NpdGlvbjtcclxuXHJcbiAgICB0aGlzLnZpc2libGUgPSBmYWxzZTtcclxuICAgIHRoaXMuZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgIHRoaXMucGF1c2VkID0gZmFsc2U7XHJcblxyXG4gICAgY29uc3Qgb25Nb3VzZUVudGVyID0gKCkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5kaXNhYmxlZCB8fCB0aGlzLnBhdXNlZCkgcmV0dXJuO1xyXG4gICAgICB0aGlzLnNob3coKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBvbk1vdXNlTGVhdmUgPSAoKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLnBhdXNlZCkgcmV0dXJuO1xyXG4gICAgICB0aGlzLmhpZGUoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnRhcmdldC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCBvbk1vdXNlRW50ZXIpO1xyXG4gICAgdGhpcy50YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgb25Nb3VzZUxlYXZlKTtcclxuXHJcbiAgICBsZXQgdW5QYXRjaE9ic2VydmVyID0gZXZlbnRzLm9uKFxyXG4gICAgICBcIkRvbU11dGF0aW9uXCIsXHJcbiAgICAgIC8qKiBAcGFyYW0ge011dGF0aW9uUmVjb3JkfSBtdXQgKi8obXV0KSA9PiB7XHJcbiAgICAgICAgaWYgKG11dC50eXBlID09PSBcImF0dHJpYnV0ZXNcIikge1xyXG4gICAgICAgICAgaWYgKG11dC50YXJnZXQuaXNTYW1lTm9kZSh0aGlzLnRhcmdldCkpIHtcclxuICAgICAgICAgICAgc3dpdGNoIChtdXQuYXR0cmlidXRlTmFtZSkge1xyXG4gICAgICAgICAgICAgIGNhc2UgXCJhY29yZC0tdG9vbHRpcC1kaXNhYmxlZFwiOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRpc2FibGVkID0gdGhpcy50YXJnZXQuZ2V0QXR0cmlidXRlKFwiYWNvcmQtLXRvb2x0aXAtZGlzYWJsZWRcIikgPT09IFwidHJ1ZVwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGNhc2UgXCJhY29yZC0tdG9vbHRpcC1jb250ZW50XCI6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudCA9IHRoaXMudGFyZ2V0LmdldEF0dHJpYnV0ZShcImFjb3JkLS10b29sdGlwLWNvbnRlbnRcIik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgY2FzZSBcImFjb3JkLS10b29sdGlwLXBvc2l0aW9uXCI6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb24gPSB0aGlzLnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJhY29yZC0tdG9vbHRpcC1wb3NpdGlvblwiKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgKVxyXG5cclxuICAgIHRoaXMuZGVzdHJveSA9ICgpID0+IHtcclxuICAgICAgdGhpcy50YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgb25Nb3VzZUVudGVyKTtcclxuICAgICAgdGhpcy50YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgb25Nb3VzZUxlYXZlKTtcclxuICAgICAgdGhpcy5oaWRlKCk7XHJcbiAgICAgIHVuUGF0Y2hPYnNlcnZlcigpO1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGdldCBjb250ZW50KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY29udGVudEVsZW1lbnQuZmlyc3RFbGVtZW50Q2hpbGQ7XHJcbiAgfVxyXG5cclxuICBzZXQgY29udGVudCh2YWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICB0aGlzLmNvbnRlbnRFbGVtZW50LmlubmVySFRNTCA9IHZhbHVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5jb250ZW50RWxlbWVudC5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgICB0aGlzLmNvbnRlbnRFbGVtZW50Py5hcHBlbmRDaGlsZD8uKHZhbHVlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0YXRpYyBnZXRDb250YWluZXIoKSB7XHJcbiAgICBjb25zdCBhcHBFbG0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbY2xhc3MqPVwibm90QXBwQXNpZGVQYW5lbC1cIl0nKTtcclxuXHJcbiAgICBsZXQgY29udGFpbmVyID0gYXBwRWxtLnF1ZXJ5U2VsZWN0b3IoXCIuYWNvcmQtLXRvb2x0aXAtY29udGFpbmVyXCIpO1xyXG4gICAgaWYgKCFjb250YWluZXIpIHtcclxuICAgICAgY29udGFpbmVyID0gZG9tLnBhcnNlKGA8ZGl2IGNsYXNzPVwiYWNvcmQtLWxheWVyLWNvbnRhaW5lciBhY29yZC0tdG9vbHRpcC1jb250YWluZXJcIj48L2Rpdj5gKTtcclxuICAgICAgYXBwRWxtLmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XHJcbiAgICB9XHJcbiAgICAvLyBjb250YWluZXIuc3R5bGUuc2V0UHJvcGVydHkoXCItLXRvcC1vZmZzZXRcIiwgYCR7YXBwRWxtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcC50b0ZpeGVkKDEpfXB4YCk7XHJcblxyXG4gICAgcmV0dXJuIGNvbnRhaW5lcjtcclxuICB9XHJcblxyXG4gIHNob3coKSB7XHJcbiAgICBpZiAodGhpcy52aXNpYmxlKSByZXR1cm47XHJcbiAgICB0aGlzLnZpc2libGUgPSB0cnVlO1xyXG5cclxuICAgIGNvbnN0IGNvbnRhaW5lciA9IFRvb2x0aXAuZ2V0Q29udGFpbmVyKCk7XHJcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5sYXllckVsZW1lbnQpO1xyXG5cclxuICAgIGlmICghdGhpcy5wb3NpdGlvbiB8fCB0aGlzLnBvc2l0aW9uID09PSBcImF1dG9cIikge1xyXG4gICAgICB0aGlzLmNhbGN1bGF0ZVBvc2l0aW9uKFxyXG4gICAgICAgIHRoaXMuY2FuU2hvd0F0VG9wID8gXCJ0b3BcIlxyXG4gICAgICAgICAgOiB0aGlzLmNhblNob3dBdEJvdHRvbSA/IFwiYm90dG9tXCJcclxuICAgICAgICAgICAgOiB0aGlzLmNhblNob3dBdExlZnQgPyBcImxlZnRcIlxyXG4gICAgICAgICAgICAgIDogdGhpcy5jYW5TaG93QXRSaWdodCA/IFwicmlnaHRcIlxyXG4gICAgICAgICAgICAgICAgOiBcInRvcFwiXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmNhbGN1bGF0ZVBvc2l0aW9uKHRoaXMucG9zaXRpb24pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICB0aGlzLmxheWVyRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwidmlzaWJsZVwiKTtcclxuICB9XHJcblxyXG4gIGNhbGN1bGF0ZVBvc2l0aW9uKHBvc2l0aW9uKSB7XHJcbiAgICBjb25zdCB0YXJnZXRSZWN0ID0gdGhpcy50YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblxyXG4gICAgdGhpcy5sYXllckVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSguLi5PYmplY3QudmFsdWVzKHRvb2x0aXBQb3NpdGlvbnMpKTtcclxuICAgIHRoaXMudG9vbHRpcEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcInZlcnRpY2FsXCIsIFwiaG9yaXpvbnRhbFwiKTtcclxuXHJcbiAgICBzd2l0Y2ggKHBvc2l0aW9uKSB7XHJcbiAgICAgIGNhc2UgXCJ0b3BcIjoge1xyXG4gICAgICAgIHRoaXMubGF5ZXJFbGVtZW50LmNsYXNzTGlzdC5hZGQodG9vbHRpcFBvc2l0aW9ucy50b3ApO1xyXG4gICAgICAgIHRoaXMubGF5ZXJFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KFwibGVmdFwiLCBgJHt0YXJnZXRSZWN0LmxlZnR9cHhgKTtcclxuICAgICAgICB0aGlzLmxheWVyRWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShcInRvcFwiLCBgJHsodGFyZ2V0UmVjdC50b3AgLSB0aGlzLmxheWVyRWxlbWVudC5vZmZzZXRIZWlnaHQgLSAxMCl9cHhgKTtcclxuICAgICAgICB0aGlzLmNlbnRlclBvc2l0aW9uKFwiaG9yaXpvbnRhbFwiKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlIFwiYm90dG9tXCI6IHtcclxuICAgICAgICB0aGlzLmxheWVyRWxlbWVudC5jbGFzc0xpc3QuYWRkKHRvb2x0aXBQb3NpdGlvbnMuYm90dG9tKTtcclxuICAgICAgICB0aGlzLmxheWVyRWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShcImxlZnRcIiwgYCR7dGFyZ2V0UmVjdC5sZWZ0fXB4YCk7XHJcbiAgICAgICAgdGhpcy5sYXllckVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoXCJ0b3BcIiwgYCR7KHRhcmdldFJlY3QudG9wICsgdGhpcy5sYXllckVsZW1lbnQub2Zmc2V0SGVpZ2h0ICsgMTApfXB4YCk7XHJcbiAgICAgICAgdGhpcy5jZW50ZXJQb3NpdGlvbihcImhvcml6b250YWxcIik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSBcImxlZnRcIjoge1xyXG4gICAgICAgIHRoaXMubGF5ZXJFbGVtZW50LmNsYXNzTGlzdC5hZGQodG9vbHRpcFBvc2l0aW9ucy5sZWZ0KTtcclxuICAgICAgICB0aGlzLmxheWVyRWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShcInRvcFwiLCBgJHt0YXJnZXRSZWN0LnRvcH1weGApO1xyXG4gICAgICAgIHRoaXMubGF5ZXJFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KFwibGVmdFwiLCBgJHt0YXJnZXRSZWN0LmxlZnQgLSB0aGlzLmxheWVyRWxlbWVudC5vZmZzZXRXaWR0aCAtIDEwfXB4YCk7XHJcbiAgICAgICAgdGhpcy5jZW50ZXJQb3NpdGlvbihcInZlcnRpY2FsXCIpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgXCJyaWdodFwiOiB7XHJcbiAgICAgICAgdGhpcy5sYXllckVsZW1lbnQuY2xhc3NMaXN0LmFkZCh0b29sdGlwUG9zaXRpb25zLnJpZ2h0KTtcclxuICAgICAgICB0aGlzLmxheWVyRWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShcInRvcFwiLCBgJHt0YXJnZXRSZWN0LnRvcH1weGApO1xyXG4gICAgICAgIHRoaXMubGF5ZXJFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KFwibGVmdFwiLCBgJHt0YXJnZXRSZWN0LmxlZnQgKyB0aGlzLmxheWVyRWxlbWVudC5vZmZzZXRXaWR0aCArIDEwfXB4YCk7XHJcbiAgICAgICAgdGhpcy5jZW50ZXJQb3NpdGlvbihcInZlcnRpY2FsXCIpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjZW50ZXJQb3NpdGlvbihkaXJlY3Rpb24pIHtcclxuICAgIHN3aXRjaCAoZGlyZWN0aW9uKSB7XHJcbiAgICAgIGNhc2UgXCJob3Jpem9udGFsXCI6IHtcclxuICAgICAgICBjb25zdCBjZW50ZXIgPSB0aGlzLnRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0ICsgKHRoaXMudGFyZ2V0Lm9mZnNldFdpZHRoIC8gMik7XHJcbiAgICAgICAgdGhpcy5sYXllckVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoXCJsZWZ0XCIsIGAke2NlbnRlciAtICh0aGlzLmxheWVyRWxlbWVudC5vZmZzZXRXaWR0aCAvIDIpfXB4YCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSBcInZlcnRpY2FsXCI6IHtcclxuICAgICAgICBjb25zdCBjZW50ZXIgPSB0aGlzLnRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgKyAodGhpcy50YXJnZXQub2Zmc2V0SGVpZ2h0IC8gMik7XHJcbiAgICAgICAgdGhpcy5sYXllckVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoXCJ0b3BcIiwgYCR7Y2VudGVyIC0gKHRoaXMubGF5ZXJFbGVtZW50Lm9mZnNldEhlaWdodCAvIDIpfXB4YCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGhpZGUoKSB7XHJcbiAgICBpZiAoIXRoaXMudmlzaWJsZSkgcmV0dXJuO1xyXG4gICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5sYXllckVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcInZpc2libGVcIik7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGhpcy5sYXllckVsZW1lbnQucmVtb3ZlKCk7XHJcbiAgICB9LCA1MCk7XHJcbiAgfVxyXG5cclxuICBnZXQgY2FuU2hvd0F0VG9wKCkgeyByZXR1cm4gdGhpcy50YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wIC0gdGhpcy5sYXllckVsZW1lbnQub2Zmc2V0SGVpZ2h0ID49IDA7IH1cclxuICBnZXQgY2FuU2hvd0F0Qm90dG9tKCkgeyByZXR1cm4gdGhpcy50YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgdGhpcy50YXJnZXQub2Zmc2V0SGVpZ2h0ICsgdGhpcy5sYXllckVsZW1lbnQub2Zmc2V0SGVpZ2h0IDw9IHdpbmRvdy5pbm5lckhlaWdodDsgfVxyXG4gIGdldCBjYW5TaG93QXRMZWZ0KCkgeyByZXR1cm4gdGhpcy50YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCAtIHRoaXMubGF5ZXJFbGVtZW50Lm9mZnNldFdpZHRoID49IDA7IH1cclxuICBnZXQgY2FuU2hvd0F0UmlnaHQoKSB7IHJldHVybiB0aGlzLnRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0ICsgdGhpcy50YXJnZXQub2Zmc2V0V2lkdGggKyB0aGlzLmxheWVyRWxlbWVudC5vZmZzZXRXaWR0aCA8PSB3aW5kb3cuaW5uZXJXaWR0aDsgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGUodGFyZ2V0LCBjb250ZW50LCBwb3NpdGlvbiA9IFwiYXV0b1wiKSB7XHJcbiAgcmV0dXJuIG5ldyBUb29sdGlwKHRhcmdldCwgY29udGVudCwgcG9zaXRpb24pO1xyXG59XHJcblxyXG5kb20ucGF0Y2goXHJcbiAgXCJbYWNvcmQtLXRvb2x0aXAtY29udGVudF1cIixcclxuICAoZWxtKSA9PiB7XHJcbiAgICBsZXQgdG9vbHRpcCA9IGNyZWF0ZShlbG0sIGVsbS5nZXRBdHRyaWJ1dGUoXCJhY29yZC0tdG9vbHRpcC1jb250ZW50XCIpLCBlbG0uZ2V0QXR0cmlidXRlKFwiYWNvcmQtLXRvb2x0aXAtcG9zaXRpb25cIikpO1xyXG4gICAgdG9vbHRpcC5kaXNhYmxlZCA9IGVsbS5nZXRBdHRyaWJ1dGUoXCJhY29yZC0tdG9vbHRpcC1kaXNhYmxlZFwiKSA9PT0gXCJ0cnVlXCI7XHJcblxyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgdG9vbHRpcC5kZXN0cm95KCk7XHJcbiAgICB9XHJcbiAgfSxcclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHsgY3JlYXRlIH07IiwgImltcG9ydCBkb20gZnJvbSBcIi4uL2RvbS9pbmRleC5qc1wiO1xyXG5pbXBvcnQgdXRpbHMgZnJvbSBcIi4uL3V0aWxzL2luZGV4LmpzXCI7XHJcblxyXG5jb25zdCB2YWxpZFBvc2l0aW9ucyA9IFtcclxuICBcInRvcC1yaWdodFwiLFxyXG4gIFwidG9wLWxlZnRcIixcclxuICBcImJvdHRvbS1yaWdodFwiLFxyXG4gIFwiYm90dG9tLWxlZnRcIixcclxuICBcInRvcC1jZW50ZXJcIixcclxuICBcImJvdHRvbS1jZW50ZXJcIixcclxuICBcImNlbnRlclwiLFxyXG4gIFwibGVmdC1jZW50ZXJcIixcclxuICBcInJpZ2h0LWNlbnRlclwiXHJcbl1cclxuXHJcbmZ1bmN0aW9uIGdldENvbnRhaW5lcihwb3NpdGlvbikge1xyXG4gIGlmICghdmFsaWRQb3NpdGlvbnMuaW5jbHVkZXMocG9zaXRpb24pKSB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgcG9zaXRpb24gXCIke3Bvc2l0aW9ufVwiLiBWYWxpZCBwb3NpdGlvbnMgYXJlOiAke3ZhbGlkUG9zaXRpb25zLmpvaW4oXCIsIFwiKX1gKTtcclxuICBjb25zdCBhcHBFbG0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbY2xhc3MqPVwibm90QXBwQXNpZGVQYW5lbC1cIl0nKTtcclxuXHJcbiAgbGV0IHRvcENvbnRhaW5lciA9IGFwcEVsbS5xdWVyeVNlbGVjdG9yKFwiLmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXItY29udGFpbmVyXCIpO1xyXG4gIGlmICghdG9wQ29udGFpbmVyKSB7XHJcbiAgICB0b3BDb250YWluZXIgPSBkb20ucGFyc2UoYDxkaXYgY2xhc3M9XCJhY29yZC0tbGF5ZXItY29udGFpbmVyIGFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXItY29udGFpbmVyXCI+PC9kaXY+YCk7XHJcbiAgICBhcHBFbG0uYXBwZW5kQ2hpbGQodG9wQ29udGFpbmVyKTtcclxuICB9XHJcbiAgdG9wQ29udGFpbmVyLnN0eWxlLnNldFByb3BlcnR5KFwiLS10b3Atb2Zmc2V0XCIsIGAke2FwcEVsbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AudG9GaXhlZCgxKX1weGApO1xyXG5cclxuICBsZXQgcG9zaXRpb25Db250YWluZXIgPSB0b3BDb250YWluZXIucXVlcnlTZWxlY3RvcihgLmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIuJHtwb3NpdGlvbn1gKTtcclxuICBpZiAoIXBvc2l0aW9uQ29udGFpbmVyKSB7XHJcbiAgICBwb3NpdGlvbkNvbnRhaW5lciA9IGRvbS5wYXJzZShgPGRpdiBjbGFzcz1cImFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIgJHtwb3NpdGlvbn1cIj48L2Rpdj5gKTtcclxuICAgIHRvcENvbnRhaW5lci5hcHBlbmRDaGlsZChwb3NpdGlvbkNvbnRhaW5lcik7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gcG9zaXRpb25Db250YWluZXI7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3coY29udGVudCwge1xyXG4gIHN0eWxlID0gXCJkZWZhdWx0XCIsXHJcbiAgdGltZW91dCA9IDEwMDAwLFxyXG4gIHBvc2l0aW9uID0gXCJ0b3AtcmlnaHRcIixcclxuICBjbG9zYWJsZSA9IHRydWUsXHJcbiAgb25DbGljayA9IG51bGwsXHJcbiAgb25DbG9zZSA9IG51bGxcclxufSA9IHt9KSB7XHJcbiAgY29uc3QgY29udGFpbmVyID0gZ2V0Q29udGFpbmVyKHBvc2l0aW9uKTtcclxuXHJcbiAgY29uc3Qgbm90aWZFbG0gPSBkb20ucGFyc2UoYFxyXG4gICAgPGRpdiBjbGFzcz1cImFjb3JkLS1ub3RpZmljYXRpb24gc3R5bGUtJHtzdHlsZX0gaGlkZGVuXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGVudFwiPjwvZGl2PlxyXG4gICAgICAgICAgICA8c3ZnIGNsYXNzPVwiY2xvc2UgJHshY2xvc2FibGUgPyBcImhpZGRlblwiIDogXCJcIn1cIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiPlxyXG4gICAgICAgICAgICAgICAgPHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNMTIgMTAuNTg2bDQuOTUtNC45NSAxLjQxNCAxLjQxNC00Ljk1IDQuOTUgNC45NSA0Ljk1LTEuNDE0IDEuNDE0LTQuOTUtNC45NS00Ljk1IDQuOTUtMS40MTQtMS40MTQgNC45NS00Ljk1LTQuOTUtNC45NUw3LjA1IDUuNjM2elwiLz5cclxuICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInByb2dyZXNzLWNvbnRhaW5lclwiIHN0eWxlPVwiLS1kdXJhdGlvbjogJHt0aW1lb3V0fW1zO1wiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZ3Jlc3NcIj48L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIGApO1xyXG5cclxuICBub3RpZkVsbS5xdWVyeVNlbGVjdG9yKFwiLmNvbnRlbnRcIikuaW5uZXJIVE1MID0gY29udGVudDtcclxuXHJcbiAgbGV0IGNsb3NlZCA9IGZhbHNlO1xyXG4gIGZ1bmN0aW9uIGNsb3NlKGNsb3NlVHlwZSkge1xyXG4gICAgaWYgKGNsb3NlZCkgcmV0dXJuO1xyXG4gICAgY2xvc2VkID0gdHJ1ZTtcclxuXHJcbiAgICBub3RpZkVsbS5jbGFzc0xpc3QuYWRkKFwiY2xvc2luZ1wiKTtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBub3RpZkVsbS5yZW1vdmUoKTtcclxuXHJcbiAgICAgIHV0aWxzLmlmRXhpc3RzKFxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLWNvbnRhaW5lcmApLFxyXG4gICAgICAgIC8qKiBAcGFyYW0ge0hUTUxEaXZFbGVtZW50fSBlbG0gKi8oZWxtKSA9PiB7XHJcbiAgICAgICAgICBpZiAoIShbLi4uZWxtLmNoaWxkTm9kZXMudmFsdWVzKCldLnJlZHVjZSgocHJldiwgY3VycikgPT4gcHJldiArIGN1cnIuY2hpbGRFbGVtZW50Q291bnQsIDApKSkgZWxtLnJlbW92ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgKTtcclxuICAgIH0sIDI3NSk7XHJcbiAgICBvbkNsb3NlPy4oY2xvc2VUeXBlKTtcclxuICB9XHJcblxyXG4gIGlmICh0eXBlb2Ygb25DbGljayA9PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgIG5vdGlmRWxtLmNsYXNzTGlzdC5hZGQoXCJjbGlja2FibGVcIik7XHJcbiAgICBub3RpZkVsbS5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgICBvbkNsaWNrKGNsb3NlKTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICB1dGlscy5pZkV4aXN0cyhub3RpZkVsbS5xdWVyeVNlbGVjdG9yKFwiLmNsb3NlXCIpLCAoZWxtKSA9PiB7XHJcbiAgICBlbG0ub25jbGljayA9ICgpID0+IHtcclxuICAgICAgY2xvc2UoXCJ1c2VyXCIpO1xyXG4gICAgfTtcclxuICB9KTtcclxuXHJcbiAgY29udGFpbmVyLnByZXBlbmQobm90aWZFbG0pO1xyXG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XHJcbiAgICBub3RpZkVsbS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xyXG4gICAgbm90aWZFbG0ucXVlcnlTZWxlY3RvcihcIi5wcm9ncmVzc1wiKS5jbGFzc0xpc3QuYWRkKFwicHJvZ3Jlc3NpbmdcIik7XHJcbiAgfSk7XHJcblxyXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgY2xvc2UoXCJ0aW1lb3V0XCIpO1xyXG4gIH0sIHRpbWVvdXQpO1xyXG5cclxuICByZXR1cm4gKCkgPT4ge1xyXG4gICAgY2xvc2UoXCJmb3JjZVwiKTtcclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgc2hvdzogT2JqZWN0LmFzc2lnbihzaG93LCB7XHJcbiAgICBpbmZvOiAoaHRtbCwgb2JqID0ge30pID0+IHNob3coaHRtbCwgeyAuLi5vYmosIHN0eWxlOiBcImluZm9cIiB9KSxcclxuICAgIGVycm9yOiAoaHRtbCwgb2JqID0ge30pID0+IHNob3coaHRtbCwgeyAuLi5vYmosIHN0eWxlOiBcImVycm9yXCIgfSksXHJcbiAgICB3YXJuaW5nOiAoaHRtbCwgb2JqID0ge30pID0+IHNob3coaHRtbCwgeyAuLi5vYmosIHN0eWxlOiBcIndhcm5pbmdcIiB9KSxcclxuICAgIHN1Y2Nlc3M6IChodG1sLCBvYmogPSB7fSkgPT4gc2hvdyhodG1sLCB7IC4uLm9iaiwgc3R5bGU6IFwic3VjY2Vzc1wiIH0pLFxyXG4gIH0pLFxyXG59OyIsICJpbXBvcnQgd2VicGFjayBmcm9tIFwiLi4vbW9kdWxlcy93ZWJwYWNrLmpzXCI7XHJcbmltcG9ydCBwYXRjaGVyIGZyb20gXCIuLi9wYXRjaGVyL2luZGV4LmpzXCI7XHJcbmltcG9ydCBsb2dnZXIgZnJvbSBcIi4uL3V0aWxzL2xvZ2dlci5qc1wiO1xyXG5cclxuaW1wb3J0IGNvbW1vbiBmcm9tIFwiLi4vbW9kdWxlcy9jb21tb24uanNcIjtcclxuaW1wb3J0IHsgZmluZGVyTWFwIH0gZnJvbSBcIi4uL21vZHVsZXMvcmF3L2NvbXBsZXgtZmluZGVyLmpzXCI7XHJcblxyXG5jb25zdCB7IFJlYWN0IH0gPSBjb21tb247XHJcblxyXG5sZXQgaXNSZWFkeSA9IGZhbHNlO1xyXG5cclxubGV0IENvbXBvbmVudHMgPSBudWxsO1xyXG5cclxubGV0IEFjdGlvbnMgPSBudWxsO1xyXG5cclxuKGFzeW5jICgpID0+IHtcclxuICBBY3Rpb25zID0gYXdhaXQgKGFzeW5jICgpID0+IHtcclxuICAgIGxldCBvZ01vZHVsZTtcclxuICAgIHdoaWxlICh0cnVlKSB7XHJcbiAgICAgIG9nTW9kdWxlID0gd2VicGFjay5maWx0ZXIobSA9PiBPYmplY3QudmFsdWVzKG0pLnNvbWUodiA9PiB0eXBlb2YgdiA9PT0gXCJmdW5jdGlvblwiICYmIHYudG9TdHJpbmcoKS5pbmNsdWRlcyhcIkNPTlRFWFRfTUVOVV9DTE9TRVwiKSkpLmZpbmQobSA9PiBtLmV4cG9ydHMgIT09IHdpbmRvdyk/LmV4cG9ydHM7XHJcbiAgICAgIGlmIChvZ01vZHVsZSkgYnJlYWs7XHJcbiAgICAgIGF3YWl0IG5ldyBQcm9taXNlKHIgPT4gc2V0VGltZW91dChyLCAxMDApKTtcclxuICAgIH1cclxuICAgIGNvbnN0IG91dCA9IGZpbmRlck1hcChvZ01vZHVsZSwge1xyXG4gICAgICBjbG9zZTogW1wiQ09OVEVYVF9NRU5VX0NMT1NFXCJdLFxyXG4gICAgICBvcGVuOiBbXCJyZW5kZXJMYXp5XCJdXHJcbiAgICB9KTtcclxuXHJcbiAgICBpc1JlYWR5ID0gISFvdXQuY2xvc2UgJiYgISFvdXQub3BlbjtcclxuICAgIHJldHVybiBvdXQ7XHJcbiAgfSkoKTtcclxuXHJcbiAgQ29tcG9uZW50cyA9IGF3YWl0IChhc3luYyAoKSA9PiB7XHJcbiAgICBjb25zdCBvdXQgPSB7fTtcclxuICAgIGNvbnN0IGNvbXBvbmVudE1hcCA9IHtcclxuICAgICAgc2VwYXJhdG9yOiBcIlNlcGFyYXRvclwiLFxyXG4gICAgICBjaGVja2JveDogXCJDaGVja2JveEl0ZW1cIixcclxuICAgICAgcmFkaW86IFwiUmFkaW9JdGVtXCIsXHJcbiAgICAgIGNvbnRyb2w6IFwiQ29udHJvbEl0ZW1cIixcclxuICAgICAgZ3JvdXBzdGFydDogXCJHcm91cFwiLFxyXG4gICAgICBjdXN0b21pdGVtOiBcIkl0ZW1cIlxyXG4gICAgfTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBsZXQgbW9kdWxlSWQ7XHJcbiAgICAgIHdoaWxlICh0cnVlKSB7XHJcbiAgICAgICAgbW9kdWxlSWQgPSBPYmplY3QuZW50cmllcyh3ZWJwYWNrLnJlcXVpcmUubSkuZmluZCgoWywgbV0pID0+IG0/LnRvU3RyaW5nKCkuaW5jbHVkZXMoXCJtZW51aXRlbWNoZWNrYm94XCIpKVswXVxyXG4gICAgICAgIGlmIChtb2R1bGVJZCkgYnJlYWs7XHJcbiAgICAgICAgYXdhaXQgbmV3IFByb21pc2UociA9PiBzZXRUaW1lb3V0KHIsIDEwMCkpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBjb250ZXh0TWVudU1vZHVsZSA9IHdlYnBhY2suZmluZCgoXywgaWR4KSA9PiBpZHggPT0gbW9kdWxlSWQpLmV4cG9ydHM7XHJcblxyXG4gICAgICBjb25zdCBtb2R1bGVTdHJpbmcgPSB3ZWJwYWNrLnJlcXVpcmUubVttb2R1bGVJZF0udG9TdHJpbmcoKTtcclxuICAgICAgY29uc3QgcmF3TWF0Y2hlcyA9IG1vZHVsZVN0cmluZy5tYXRjaEFsbCgvaWZcXChcXHcrXFwudHlwZT09PSg/OlxcdytcXC4pPyhcXHcrKVxcKS4rP3R5cGU6XCIoLis/KVwiL2dzKTtcclxuXHJcbiAgICAgIG91dC5NZW51ID0gT2JqZWN0LnZhbHVlcyhjb250ZXh0TWVudU1vZHVsZSkuZmluZCh2ID0+IHYudG9TdHJpbmcoKS5pbmNsdWRlcyhcIi5pc1VzaW5nS2V5Ym9hcmROYXZpZ2F0aW9uXCIpKTtcclxuXHJcbiAgICAgIFsuLi5yYXdNYXRjaGVzXS5mb3JFYWNoKChbLCBmdW5jdGlvbk5hbWUsIHR5cGVdKSA9PiB7XHJcbiAgICAgICAgbGV0IG1vZHVsZUtleSA9IG1vZHVsZVN0cmluZy5tYXRjaChuZXcgUmVnRXhwKG5ldyBSZWdFeHAoYChcXFxcdyspOlxcXFwoXFxcXClcXFxcPVxcXFw+JHtmdW5jdGlvbk5hbWV9YCkpKT8uWzFdXHJcbiAgICAgICAgb3V0W2NvbXBvbmVudE1hcFt0eXBlXV0gPSBjb250ZXh0TWVudU1vZHVsZVttb2R1bGVLZXldO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlzUmVhZHkgPSBPYmplY3Qua2V5cyhvdXQpLmxlbmd0aCA+IDE7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgaXNSZWFkeSA9IGZhbHNlO1xyXG4gICAgICBsb2dnZXIuZXJyb3IoXCJGYWlsZWQgdG8gbG9hZCBjb250ZXh0IG1lbnUgY29tcG9uZW50c1wiLCBlcnIpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBvdXQ7XHJcbiAgfSkoKTtcclxuXHJcbiAgTWVudVBhdGNoZXIuaW5pdGlhbGl6ZSgpO1xyXG59KSgpO1xyXG5cclxuXHJcbmNsYXNzIE1lbnVQYXRjaGVyIHtcclxuICBzdGF0aWMgTUFYX1BBVENIX0lURVJBVElPTlMgPSAxNjtcclxuICBzdGF0aWMgcGF0Y2hlcyA9IG5ldyBNYXAoKTtcclxuICBzdGF0aWMgc3ViUGF0Y2hlcyA9IG5ldyBXZWFrTWFwKCk7XHJcblxyXG4gIHN0YXRpYyBpbml0aWFsaXplKCkge1xyXG4gICAgaWYgKCFpc1JlYWR5KSByZXR1cm4gbG9nZ2VyLndhcm4oXCJVbmFibGUgdG8gbG9hZCBjb250ZXh0IG1lbnUuXCIpO1xyXG5cclxuICAgIGNvbnN0IG1vZHVsZVRvUGF0Y2ggPSB3ZWJwYWNrLmZpbHRlcihtID0+IE9iamVjdC52YWx1ZXMobSkuc29tZSh2ID0+IHR5cGVvZiB2ID09PSBcImZ1bmN0aW9uXCIgJiYgdi50b1N0cmluZygpLmluY2x1ZGVzKFwiQ09OVEVYVF9NRU5VX0NMT1NFXCIpKSkuZmluZChtID0+IG0uZXhwb3J0cyAhPT0gd2luZG93KS5leHBvcnRzO1xyXG4gICAgY29uc3Qga2V5VG9QYXRjaCA9IE9iamVjdC5rZXlzKG1vZHVsZVRvUGF0Y2gpLmZpbmQoayA9PiBtb2R1bGVUb1BhdGNoW2tdPy5sZW5ndGggPT09IDMpO1xyXG5cclxuICAgIHBhdGNoZXIuYmVmb3JlKFxyXG4gICAgICBrZXlUb1BhdGNoLFxyXG4gICAgICBtb2R1bGVUb1BhdGNoLFxyXG4gICAgICBmdW5jdGlvbiAobWV0aG9kQXJncykge1xyXG4gICAgICAgIGNvbnN0IHByb21pc2UgPSBtZXRob2RBcmdzWzFdO1xyXG4gICAgICAgIG1ldGhvZEFyZ3NbMV0gPSBhc3luYyBmdW5jdGlvbiAoLi4uYXJncykge1xyXG4gICAgICAgICAgY29uc3QgcmVuZGVyID0gYXdhaXQgcHJvbWlzZS5jYWxsKHRoaXMsIC4uLmFyZ3MpO1xyXG5cclxuICAgICAgICAgIHJldHVybiAocHJvcHMpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcmVzID0gcmVuZGVyKHByb3BzKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChyZXM/LnByb3BzLm5hdklkKSB7XHJcbiAgICAgICAgICAgICAgTWVudVBhdGNoZXIuZXhlY3V0ZVBhdGNoZXMocmVzLnByb3BzLm5hdklkLCByZXMsIHByb3BzKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgcmVzPy50eXBlID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICAgICAgICBNZW51UGF0Y2hlci5wYXRjaFJlY3Vyc2l2ZShyZXMsIFwidHlwZVwiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlcztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBtZXRob2RBcmdzO1xyXG4gICAgICB9XHJcbiAgICApXHJcbiAgfVxyXG5cclxuICBzdGF0aWMgcGF0Y2hSZWN1cnNpdmUodGFyZ2V0LCBtZXRob2QsIGl0ZXJhdGlvbiA9IDApIHtcclxuICAgIGlmIChpdGVyYXRpb24gPj0gdGhpcy5NQVhfUEFUQ0hfSVRFUkFUSU9OUykgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IHByb3h5RnVuY3Rpb24gPSB0aGlzLnN1YlBhdGNoZXMuZ2V0KHRhcmdldFttZXRob2RdKSA/PyAoKCkgPT4ge1xyXG4gICAgICBjb25zdCBvcmlnaW5hbEZ1bmN0aW9uID0gdGFyZ2V0W21ldGhvZF07XHJcbiAgICAgIGNvbnN0IGRlcHRoID0gKytpdGVyYXRpb247XHJcbiAgICAgIGZ1bmN0aW9uIHBhdGNoKC4uLmFyZ3MpIHtcclxuICAgICAgICBjb25zdCByZXMgPSBvcmlnaW5hbEZ1bmN0aW9uLmNhbGwodGhpcywgLi4uYXJncyk7XHJcblxyXG4gICAgICAgIGlmICghcmVzKSByZXR1cm4gcmVzO1xyXG5cclxuICAgICAgICBjb25zdCBuYXZJZCA9IHJlcy5wcm9wcz8ubmF2SWQgPz8gcmVzLnByb3BzPy5jaGlsZHJlbj8ucHJvcHM/Lm5hdklkO1xyXG4gICAgICAgIGlmIChuYXZJZCkge1xyXG4gICAgICAgICAgTWVudVBhdGNoZXIuZXhlY3V0ZVBhdGNoZXMobmF2SWQsIHJlcywgYXJnc1swXSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnN0IGxheWVyID0gcmVzLnByb3BzLmNoaWxkcmVuID8gcmVzLnByb3BzLmNoaWxkcmVuIDogcmVzO1xyXG5cclxuICAgICAgICAgIGlmICh0eXBlb2YgbGF5ZXI/LnR5cGUgPT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgICAgIE1lbnVQYXRjaGVyLnBhdGNoUmVjdXJzaXZlKGxheWVyLCBcInR5cGVcIiwgZGVwdGgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJlcztcclxuICAgICAgfVxyXG5cclxuICAgICAgcGF0Y2guX19vcmlnaW5hbF9fID0gb3JpZ2luYWxGdW5jdGlvbjtcclxuICAgICAgT2JqZWN0LmFzc2lnbihwYXRjaCwgb3JpZ2luYWxGdW5jdGlvbik7XHJcbiAgICAgIHRoaXMuc3ViUGF0Y2hlcy5zZXQob3JpZ2luYWxGdW5jdGlvbiwgcGF0Y2gpO1xyXG5cclxuICAgICAgcmV0dXJuIHBhdGNoO1xyXG4gICAgfSkoKTtcclxuXHJcbiAgICB0YXJnZXRbbWV0aG9kXSA9IHByb3h5RnVuY3Rpb247XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZXhlY3V0ZVBhdGNoZXMoaWQsIHJlcywgcHJvcHMpIHtcclxuICAgIGlmICghdGhpcy5wYXRjaGVzLmhhcyhpZCkpIHJldHVybjtcclxuXHJcbiAgICB0aGlzLnBhdGNoZXMuZ2V0KGlkKS5mb3JFYWNoKHBhdGNoID0+IHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBwYXRjaChyZXMsIHByb3BzKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgbG9nZ2VyLmVycm9yKFwiRmFpbGVkIHRvIHBhdGNoIGNvbnRleHQgbWVudVwiLCBwYXRjaCwgZXJyKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcblxyXG5cclxuLy8gQ29waWVkIGZyb20gYmQncyBzb3VyY2VcclxuZnVuY3Rpb24gYnVpbGRJdGVtKHByb3BzKSB7XHJcbiAgY29uc3QgeyB0eXBlIH0gPSBwcm9wcztcclxuICBpZiAodHlwZSA9PT0gXCJzZXBhcmF0b3JcIikgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQ29tcG9uZW50cy5TZXBhcmF0b3IpO1xyXG5cclxuICBsZXQgY29tcG9uZW50ID0gQ29tcG9uZW50cy5JdGVtO1xyXG4gIGlmICh0eXBlID09PSBcInN1Ym1lbnVcIikge1xyXG4gICAgaWYgKCFwcm9wcy5jaGlsZHJlbikgcHJvcHMuY2hpbGRyZW4gPSBidWlsZE1lbnVDaGlsZHJlbihwcm9wcy5yZW5kZXIgfHwgcHJvcHMuaXRlbXMpO1xyXG4gIH0gZWxzZSBpZiAodHlwZSA9PT0gXCJ0b2dnbGVcIiB8fCB0eXBlID09PSBcInJhZGlvXCIpIHtcclxuICAgIGNvbXBvbmVudCA9IHR5cGUgPT09IFwidG9nZ2xlXCIgPyBDb21wb25lbnRzLkNoZWNrYm94SXRlbSA6IENvbXBvbmVudHMuUmFkaW9JdGVtO1xyXG4gICAgaWYgKHByb3BzLmFjdGl2ZSkgcHJvcHMuY2hlY2tlZCA9IHByb3BzLmFjdGl2ZTtcclxuICB9IGVsc2UgaWYgKHR5cGUgPT09IFwiY29udHJvbFwiKSB7XHJcbiAgICBjb21wb25lbnQgPSBDb21wb25lbnRzLkNvbnRyb2xJdGVtO1xyXG4gIH1cclxuICBpZiAoIXByb3BzLmlkKSBwcm9wcy5pZCA9IGAke3Byb3BzLmxhYmVsLnJlcGxhY2UoL15bXmEtel0rfFteXFx3LV0rL2dpLCBcIi1cIil9YDtcclxuICBpZiAocHJvcHMuZGFuZ2VyKSBwcm9wcy5jb2xvciA9IFwiZGFuZ2VyXCI7XHJcbiAgcHJvcHMuZXh0ZW5kZWQgPSB0cnVlO1xyXG5cclxuICBpZiAodHlwZSA9PT0gXCJ0b2dnbGVcIikge1xyXG4gICAgY29uc3QgW2FjdGl2ZSwgZG9Ub2dnbGVdID0gUmVhY3QudXNlU3RhdGUocHJvcHMuY2hlY2tlZCB8fCBmYWxzZSk7XHJcbiAgICBjb25zdCBvcmlnaW5hbEFjdGlvbiA9IHByb3BzLmFjdGlvbjtcclxuICAgIHByb3BzLmNoZWNrZWQgPSBhY3RpdmU7XHJcbiAgICBwcm9wcy5hY3Rpb24gPSBmdW5jdGlvbiAoZXYpIHtcclxuICAgICAgb3JpZ2luYWxBY3Rpb24oZXYpO1xyXG4gICAgICBkb1RvZ2dsZSghYWN0aXZlKTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChjb21wb25lbnQsIHByb3BzKTtcclxufVxyXG5cclxuLy8gQ29waWVkIGZyb20gYmQncyBzb3VyY2VcclxuZnVuY3Rpb24gYnVpbGRNZW51Q2hpbGRyZW4oc2V0dXApIHtcclxuICBjb25zdCBtYXBwZXIgPSBzID0+IHtcclxuICAgIGlmIChzLnR5cGUgPT09IFwiZ3JvdXBcIikgcmV0dXJuIGJ1aWxkR3JvdXAocyk7XHJcbiAgICByZXR1cm4gYnVpbGRJdGVtKHMpO1xyXG4gIH07XHJcbiAgY29uc3QgYnVpbGRHcm91cCA9IGZ1bmN0aW9uIChncm91cCkge1xyXG4gICAgY29uc3QgaXRlbXMgPSBncm91cC5pdGVtcy5tYXAobWFwcGVyKS5maWx0ZXIoaSA9PiBpKTtcclxuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KENvbXBvbmVudHMuR3JvdXAsIG51bGwsIGl0ZW1zKTtcclxuICB9O1xyXG4gIHJldHVybiBzZXR1cC5tYXAobWFwcGVyKS5maWx0ZXIoaSA9PiBpKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIF9fY2FjaGVfXzoge1xyXG4gICAgcGF0Y2hlczogTWVudVBhdGNoZXIucGF0Y2hlcyxcclxuICAgIHN1YlBhdGNoZXM6IE1lbnVQYXRjaGVyLnN1YlBhdGNoZXNcclxuICB9LFxyXG4gIHBhdGNoKG5hdklkLCBjYikge1xyXG4gICAgaWYgKCFNZW51UGF0Y2hlci5wYXRjaGVzLmhhcyhuYXZJZCkpIE1lbnVQYXRjaGVyLnBhdGNoZXMuc2V0KG5hdklkLCBuZXcgU2V0KCkpO1xyXG4gICAgTWVudVBhdGNoZXIucGF0Y2hlcy5nZXQobmF2SWQpLmFkZChjYik7XHJcblxyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgTWVudVBhdGNoZXIucGF0Y2hlcy5nZXQobmF2SWQpLmRlbGV0ZShjYik7XHJcbiAgICB9XHJcbiAgfSxcclxuICBvcGVuKGV2ZW50LCBjb21wb25lbnQsIGNvbmZpZykge1xyXG4gICAgcmV0dXJuIEFjdGlvbnMub3BlbihldmVudCwgKGUpID0+IFJlYWN0LmNyZWF0ZUVsZW1lbnQoY29tcG9uZW50LCBPYmplY3QuYXNzaWduKHt9LCBlLCB7IG9uQ2xvc2U6IEFjdGlvbnMuY2xvc2UgfSkpLCBjb25maWcpO1xyXG4gIH0sXHJcbiAgY2xvc2UoKSB7XHJcbiAgICByZXR1cm4gQWN0aW9ucy5jbG9zZSgpO1xyXG4gIH0sXHJcbiAgYnVpbGQ6IHtcclxuICAgIGl0ZW0oc2V0dXApIHtcclxuICAgICAgcmV0dXJuIGJ1aWxkTWVudUNoaWxkcmVuKFtzZXR1cF0pO1xyXG4gICAgfSxcclxuICAgIG1lbnUoc2V0dXApIHtcclxuICAgICAgcmV0dXJuIChwcm9wcykgPT4gUmVhY3QuY3JlYXRlRWxlbWVudChDb21wb25lbnRzLk1lbnUsIHByb3BzLCBidWlsZE1lbnVDaGlsZHJlbihzZXR1cCkpO1xyXG4gICAgfVxyXG4gIH1cclxufTsiLCAiaW1wb3J0IGNvbW1vbiBmcm9tIFwiLi4vLi4vYXBpL21vZHVsZXMvY29tbW9uXCI7XHJcbmltcG9ydCBsb2dnZXIgZnJvbSBcIi4uLy4uL2FwaS91dGlscy9sb2dnZXIuanNcIjtcclxuY29uc3QgeyBSZWFjdCB9ID0gY29tbW9uO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXJyb3JCb3VuZGFyeSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuICAgIHRoaXMuc3RhdGUgPSB7IGVycm9yOiBudWxsIH07XHJcbiAgfVxyXG5cclxuICBjb21wb25lbnREaWRDYXRjaChlcnJvcikge1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7IGVycm9yIH0pO1xyXG4gICAgbG9nZ2VyLmVycm9yKGVycm9yKTtcclxuICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5vbkVycm9yID09PSBcImZ1bmN0aW9uXCIpIHRoaXMucHJvcHMub25FcnJvcihlcnJvcik7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICBpZiAodGhpcy5zdGF0ZS5lcnJvcikgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiYWNvcmQtLXJlYWN0LWVycm9yXCI+XHJcbiAgICAgIDxwPlVuZXhwZWN0ZWQgUmVhY3QgRXJyb3IgSGFwcGVuZWQuPC9wPlxyXG4gICAgICA8cD57YCR7dGhpcy5zdGF0ZS5lcnJvcn1gfTwvcD5cclxuICAgIDwvZGl2PjtcclxuICAgIHJldHVybiB0aGlzLnByb3BzLmNoaWxkcmVuO1xyXG4gIH1cclxufVxyXG5cclxuY29uc3Qgb3JpZ2luYWxSZW5kZXIgPSBFcnJvckJvdW5kYXJ5LnByb3RvdHlwZS5yZW5kZXI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShFcnJvckJvdW5kYXJ5LnByb3RvdHlwZSwgXCJyZW5kZXJcIiwge1xyXG4gIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gIGNvbmZpZ3VyYWJsZTogZmFsc2UsXHJcbiAgc2V0OiBmdW5jdGlvbiAoKSB7IHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBzZXQgcmVuZGVyIG1ldGhvZCBvZiBFcnJvckJvdW5kYXJ5XCIpOyB9LFxyXG4gIGdldDogKCkgPT4gb3JpZ2luYWxSZW5kZXJcclxufSk7IiwgImltcG9ydCBFcnJvckJvdW5kYXJ5IGZyb20gXCIuLi8uLi9saWIvY29tcG9uZW50cy9FcnJvckJvdW5kYXJ5LmpzeFwiO1xyXG5pbXBvcnQgY29tbW9uIGZyb20gXCIuLi9tb2R1bGVzL2NvbW1vbi5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIEVycm9yQm91bmRhcnksXHJcbiAgQnV0dG9uOiBjb21tb24uY29tcG9uZW50cy5CdXR0b24sXHJcbiAgTWFya2Rvd246IGNvbW1vbi5jb21wb25lbnRzLk1hcmtkb3duLFxyXG4gIFRleHQ6IGNvbW1vbi5jb21wb25lbnRzLlRleHQsXHJcbiAgQ29uZmlybWF0aW9uTW9kYWw6IGNvbW1vbi5jb21wb25lbnRzLkNvbmZpcm1hdGlvbk1vZGFsLFxyXG4gIE1vZGFsUm9vdDogY29tbW9uLm1vZGFscy5jb21wb25lbnRzLlJvb3QsXHJcbiAgTW9kYWxDbG9zZUJ1dHRvbjogY29tbW9uLm1vZGFscy5jb21wb25lbnRzLm90aGVyLkNsb3NlQnV0dG9uLFxyXG4gIE1vZGFsSGVhZGVyOiBjb21tb24ubW9kYWxzLmNvbXBvbmVudHMub3RoZXIuSGVhZGVyLFxyXG4gIE1vZGFsQ29udGVudDogY29tbW9uLm1vZGFscy5jb21wb25lbnRzLm90aGVyLkNvbnRlbnQsXHJcbiAgTW9kYWxGb290ZXI6IGNvbW1vbi5tb2RhbHMuY29tcG9uZW50cy5vdGhlci5Gb290ZXIsXHJcbiAgTW9kYWxMaXN0Q29udGVudDogY29tbW9uLm1vZGFscy5jb21wb25lbnRzLm90aGVyLkxpc3RDb250ZW50LFxyXG4gIFRvb2x0aXA6IGNvbW1vbi5jb21wb25lbnRzLlRvb2x0aXAsXHJcbn0iLCAiaW1wb3J0IEVycm9yQm91bmRhcnkgZnJvbSBcIi4uLy4uL2xpYi9jb21wb25lbnRzL0Vycm9yQm91bmRhcnkuanN4XCI7XHJcbmltcG9ydCBjb21tb24gZnJvbSBcIi4uL21vZHVsZXMvY29tbW9uLmpzXCI7XHJcbmltcG9ydCBpMThuIGZyb20gXCIuLi9pMThuL2luZGV4LmpzXCJcclxuY29uc3QgeyBSZWFjdCwgRmx1eERpc3BhdGNoZXIsIGNvbXBvbmVudHMsIG1vZGFscywgVXNlclN0b3JlIH0gPSBjb21tb247XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgc2hvdzoge1xyXG4gICAgY29uZmlybWF0aW9uKHRpdGxlLCBjb250ZW50LCB7IGNvbmZpcm0gPSBudWxsLCBjYW5jZWwgPSBudWxsLCBkYW5nZXIgPSBmYWxzZSwga2V5ID0gdW5kZWZpbmVkLCB0aW1lb3V0ID0gNjAwMDAgKiA1IH0gPSB7fSkge1xyXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoY29udGVudCkpIGNvbnRlbnQgPSBbY29udGVudF07XHJcbiAgICAgICAgY29udGVudCA9IGNvbnRlbnQubWFwKGkgPT4gdHlwZW9mIGkgPT09IFwic3RyaW5nXCIgPyBSZWFjdC5jcmVhdGVFbGVtZW50KGNvbXBvbmVudHMuTWFya2Rvd24sIG51bGwsIGkpIDogaSk7XHJcbiAgICAgICAgY29uc3QgbW9kYWxLZXkgPSBtb2RhbHMuYWN0aW9ucy5vcGVuKChwcm9wcykgPT4ge1xyXG4gICAgICAgICAgbGV0IGludGVyYWN0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgIHJldHVybiA8RXJyb3JCb3VuZGFyeSBvbkVycm9yPXsoKSA9PiB7IHJlc29sdmUoZmFsc2UpOyB9fT5cclxuICAgICAgICAgICAgPGNvbXBvbmVudHMuQ29uZmlybWF0aW9uTW9kYWxcclxuICAgICAgICAgICAgICBoZWFkZXI9e3RpdGxlfVxyXG4gICAgICAgICAgICAgIGNvbmZpcm1CdXR0b25Db2xvcj17ZGFuZ2VyID8gY29tcG9uZW50cy5CdXR0b24uQ29sb3JzLlJFRCA6IGNvbXBvbmVudHMuQnV0dG9uLkNvbG9ycy5CUkFORH1cclxuICAgICAgICAgICAgICBjb25maXJtVGV4dD17Y29uZmlybSB8fCBpMThuLmZvcm1hdChcIkNPTkZJUk1cIil9XHJcbiAgICAgICAgICAgICAgY2FuY2VsVGV4dD17Y2FuY2VsfVxyXG4gICAgICAgICAgICAgIG9uQ2FuY2VsPXsoKSA9PiB7IHJlc29sdmUoZmFsc2UpOyBtb2RhbHMuYWN0aW9ucy5jbG9zZShtb2RhbEtleSk7IGludGVyYWN0ZWQgPSB0cnVlOyB9fVxyXG4gICAgICAgICAgICAgIG9uQ29uZmlybT17KCkgPT4geyByZXNvbHZlKHRydWUpOyBtb2RhbHMuYWN0aW9ucy5jbG9zZShtb2RhbEtleSk7IGludGVyYWN0ZWQgPSB0cnVlOyB9fVxyXG4gICAgICAgICAgICAgIHsuLi5wcm9wc31cclxuICAgICAgICAgICAgICBvbkNsb3NlPXsoKSA9PiB7IHByb3BzLm9uQ2xvc2UoKTsgcmVzb2x2ZShmYWxzZSk7IG1vZGFscy5hY3Rpb25zLmNsb3NlKG1vZGFsS2V5KTsgfX1cclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIDxFcnJvckJvdW5kYXJ5IG9uRXJyb3I9eygpID0+IHsgcmVzb2x2ZShmYWxzZSk7IH19PlxyXG4gICAgICAgICAgICAgICAge2NvbnRlbnR9XHJcbiAgICAgICAgICAgICAgPC9FcnJvckJvdW5kYXJ5PlxyXG4gICAgICAgICAgICA8L2NvbXBvbmVudHMuQ29uZmlybWF0aW9uTW9kYWw+XHJcbiAgICAgICAgICA8L0Vycm9yQm91bmRhcnk+XHJcbiAgICAgICAgfSwgeyBtb2RhbEtleToga2V5IH0pO1xyXG4gICAgICAgIGlmICh0aW1lb3V0KSB7XHJcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKCFpbnRlcmFjdGVkKSB7XHJcbiAgICAgICAgICAgICAgcmVzb2x2ZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgbW9kYWxzLmFjdGlvbnMuY2xvc2UobW9kYWxLZXkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LCB0aW1lb3V0KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIHVzZXIodXNlcklkKSB7XHJcbiAgICAgIGlmICghVXNlclN0b3JlLmdldFVzZXIodXNlcklkKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICBGbHV4RGlzcGF0Y2hlci5kaXNwYXRjaCh7IHR5cGU6IFwiVVNFUl9QUk9GSUxFX01PREFMX09QRU5cIiwgdXNlcklkIH0pO1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0sXHJcbiAgICBhbGVydCh0aXRsZSwgY29udGVudCwgeyBjb25maXJtID0gbnVsbCwga2V5ID0gdW5kZWZpbmVkLCB0aW1lb3V0ID0gNjAwMDAgKiA1IH0gPSB7fSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5jb25maXJtYXRpb24odGl0bGUsIGNvbnRlbnQsIHsgY29uZmlybSwgY2FuY2VsOiBudWxsLCBrZXksIHRpbWVvdXQgfSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBjbG9zZShrZXkpIHtcclxuICAgIHJldHVybiBtb2RhbHMuYWN0aW9ucy5jbG9zZShrZXkpO1xyXG4gIH1cclxufSIsICJpbXBvcnQgZG9tIGZyb20gXCIuLi9kb20vaW5kZXguanNcIjtcclxuXHJcbmZ1bmN0aW9uIGdldENvbnRhaW5lcigpIHtcclxuICBjb25zdCBhcHBFbG0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbY2xhc3MqPVwibm90QXBwQXNpZGVQYW5lbC1cIl0nKTtcclxuXHJcbiAgbGV0IHRvcENvbnRhaW5lciA9IGFwcEVsbS5xdWVyeVNlbGVjdG9yKFwiLmFjb3JkLS10b2FzdHMtY29udGFpbmVyXCIpO1xyXG4gIGlmICghdG9wQ29udGFpbmVyKSB7XHJcbiAgICB0b3BDb250YWluZXIgPSBkb20ucGFyc2UoYDxkaXYgY2xhc3M9XCJhY29yZC0tbGF5ZXItY29udGFpbmVyIGFjb3JkLS10b2FzdHMtY29udGFpbmVyXCI+PC9kaXY+YCk7XHJcbiAgICBhcHBFbG0uYXBwZW5kQ2hpbGQodG9wQ29udGFpbmVyKTtcclxuICB9XHJcbiAgdG9wQ29udGFpbmVyLnN0eWxlLnNldFByb3BlcnR5KFwiLS10b3Atb2Zmc2V0XCIsIGAke2FwcEVsbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AudG9GaXhlZCgxKX1weGApO1xyXG5cclxuICByZXR1cm4gdG9wQ29udGFpbmVyO1xyXG59XHJcblxyXG5jb25zdCBpY29ucyA9IHtcclxuICBpbmZvOiBgPHN2ZyB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCI+PHBhdGggZD1cIk0xMiAyMkM2LjQ3NyAyMiAyIDE3LjUyMyAyIDEyUzYuNDc3IDIgMTIgMnMxMCA0LjQ3NyAxMCAxMC00LjQ3NyAxMC0xMCAxMHptLTEtMTF2Nmgydi02aC0yem0wLTR2MmgyVjdoLTJ6XCIgZmlsbD1cImN1cnJlbnRDb2xvclwiIC8+PC9zdmc+YCxcclxuICB3YXJuaW5nOiBgPHN2ZyB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCI+PHBhdGggZD1cIk0xMiAyMkM2LjQ3NyAyMiAyIDE3LjUyMyAyIDEyUzYuNDc3IDIgMTIgMnMxMCA0LjQ3NyAxMCAxMC00LjQ3NyAxMC0xMCAxMHptLTEtN3YyaDJ2LTJoLTJ6bTAtOHY2aDJWN2gtMnpcIiBmaWxsPVwiY3VycmVudENvbG9yXCIgLz48L3N2Zz5gLFxyXG4gIGVycm9yOiBgPHN2ZyB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCI+PHBhdGggZD1cIk0xMiAyMkM2LjQ3NyAyMiAyIDE3LjUyMyAyIDEyUzYuNDc3IDIgMTIgMnMxMCA0LjQ3NyAxMCAxMC00LjQ3NyAxMC0xMCAxMHptLTEtN3YyaDJ2LTJoLTJ6bTAtOHY2aDJWN2gtMnpcImZpbGw9XCJjdXJyZW50Q29sb3JcIiAvPjwvc3ZnPmAsXHJcbiAgc3VjY2VzczogYDxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiPjxwYXRoIGQ9XCJNMTIgMjJDNi40NzcgMjIgMiAxNy41MjMgMiAxMlM2LjQ3NyAyIDEyIDJzMTAgNC40NzcgMTAgMTAtNC40NzcgMTAtMTAgMTB6bS0uOTk3LTZsNy4wNy03LjA3MS0xLjQxNC0xLjQxNC01LjY1NiA1LjY1Ny0yLjgyOS0yLjgyOS0xLjQxNCAxLjQxNEwxMS4wMDMgMTZ6XCIgZmlsbD1cImN1cnJlbnRDb2xvclwiIC8+PC9zdmc+YFxyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gc2hvdyhcclxuICBjb250ZW50LFxyXG4gIHtcclxuICAgIHN0eWxlID0gXCJkZWZhdWx0XCIsXHJcbiAgICB0aW1lb3V0ID0gMzUwMCxcclxuICAgIG9uQ2xpY2sgPSBudWxsLFxyXG4gICAgaGlkZUljb24gPSBmYWxzZVxyXG4gIH0gPSB7fVxyXG4pIHtcclxuICBjb25zdCBjb250YWluZXIgPSBnZXRDb250YWluZXIoKTtcclxuXHJcbiAgY29uc3QgdG9hc3RFbG0gPSBkb20ucGFyc2UoYFxyXG4gICAgPGRpdiBjbGFzcz1cImFjb3JkLS10b2FzdCBzdHlsZS0ke3N0eWxlfSBoaWRkZW5cIj5cclxuICAgICAgJHtoaWRlSWNvbiA/IFwiXCIgOiAoaWNvbnNbc3R5bGVdIHx8IFwiXCIpfVxyXG4gICAgICA8ZGl2IGNsYXNzPVwiY29udGVudFwiPjwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgYCk7XHJcblxyXG4gIHRvYXN0RWxtLnF1ZXJ5U2VsZWN0b3IoXCIuY29udGVudFwiKS5pbm5lckhUTUwgPSBjb250ZW50O1xyXG5cclxuICBsZXQgY2xvc2VkID0gZmFsc2U7XHJcbiAgZnVuY3Rpb24gY2xvc2UoKSB7XHJcbiAgICBpZiAoY2xvc2VkKSByZXR1cm47XHJcbiAgICBjbG9zZWQgPSB0cnVlO1xyXG5cclxuICAgIHRvYXN0RWxtLmNsYXNzTGlzdC5hZGQoXCJjbG9zaW5nXCIpO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHRvYXN0RWxtLnJlbW92ZSgpO1xyXG5cclxuICAgICAgdXRpbHMuaWZFeGlzdHMoXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmFjb3JkLS10b2FzdHMtY29udGFpbmVyYCksXHJcbiAgICAgICAgLyoqIEBwYXJhbSB7SFRNTERpdkVsZW1lbnR9IGVsbSAqLyhlbG0pID0+IHtcclxuICAgICAgICAgIGlmICghZWxtLmNoaWxkRWxlbWVudENvdW50KSBlbG0ucmVtb3ZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICApO1xyXG4gICAgfSwgMjc1KTtcclxuICB9XHJcblxyXG4gIGlmICh0eXBlb2Ygb25DbGljayA9PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgIHRvYXN0RWxtLmNsYXNzTGlzdC5hZGQoXCJjbGlja2FibGVcIik7XHJcbiAgICB0b2FzdEVsbS5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgICBvbkNsaWNrKGNsb3NlKTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQodG9hc3RFbG0pO1xyXG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XHJcbiAgICB0b2FzdEVsbS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xyXG4gIH0pO1xyXG5cclxuICBzZXRUaW1lb3V0KGNsb3NlLCB0aW1lb3V0KTtcclxuXHJcbiAgcmV0dXJuICgpID0+IHtcclxuICAgIGNsb3NlKCk7XHJcbiAgfTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIHNob3c6IE9iamVjdC5hc3NpZ24oc2hvdywge1xyXG4gICAgaW5mbzogKGh0bWwsIG9iaiA9IHt9KSA9PiBzaG93KGh0bWwsIHsgLi4ub2JqLCBzdHlsZTogXCJpbmZvXCIgfSksXHJcbiAgICBlcnJvcjogKGh0bWwsIG9iaiA9IHt9KSA9PiBzaG93KGh0bWwsIHsgLi4ub2JqLCBzdHlsZTogXCJlcnJvclwiIH0pLFxyXG4gICAgd2FybmluZzogKGh0bWwsIG9iaiA9IHt9KSA9PiBzaG93KGh0bWwsIHsgLi4ub2JqLCBzdHlsZTogXCJ3YXJuaW5nXCIgfSksXHJcbiAgICBzdWNjZXNzOiAoaHRtbCwgb2JqID0ge30pID0+IHNob3coaHRtbCwgeyAuLi5vYmosIHN0eWxlOiBcInN1Y2Nlc3NcIiB9KVxyXG4gIH0pXHJcbn0iLCAiaW1wb3J0IHdlYnBhY2sgZnJvbSBcIi4uLy4uLy4uLy4uLy4uL2FwaS9tb2R1bGVzL3dlYnBhY2suanNcIjtcclxuXHJcbmNvbnN0IGJ1dHRvbkNsYXNzZXMgPSB3ZWJwYWNrLmZpbmRCeVByb3BlcnRpZXMoXCJsb3dTYXR1cmF0aW9uVW5kZXJsaW5lXCIsIFwiYnV0dG9uXCIsIFwiZGlzYWJsZWRCdXR0b25PdmVybGF5XCIpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIC8qKiBAcGFyYW0ge2ltcG9ydChcInZ1ZVwiKS5BcHB9IHZ1ZUFwcCAqL1xyXG4gIGxvYWQodnVlQXBwKSB7XHJcbiAgICB2dWVBcHAuY29tcG9uZW50KFwiZGlzY29yZC1idXR0b25cIiwge1xyXG4gICAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCIke2J1dHRvbkNsYXNzZXMuYnV0dG9ufSAke2J1dHRvbkNsYXNzZXMubG9va0ZpbGxlZH0gJHtidXR0b25DbGFzc2VzLmdyb3d9XCIgOmNsYXNzPVwiXFxgXFwke2NvbG9yID8gYnV0dG9uQ2xhc3Nlc1tcXGBjb2xvclxcJHtjb2xvclswXS50b1VwcGVyQ2FzZSgpfVxcJHtjb2xvci5zbGljZSgxKS50b0xvd2VyQ2FzZSgpfVxcYF0gOiBidXR0b25DbGFzc2VzLmNvbG9yQnJhbmR9IFxcJHtzaXplID8gYnV0dG9uQ2xhc3Nlc1tcXGBzaXplXFwke3NpemVbMF0udG9VcHBlckNhc2UoKX1cXCR7c2l6ZS5zbGljZSgxKS50b0xvd2VyQ2FzZSgpfVxcYF0gOiBidXR0b25DbGFzc2VzLnNpemVTbWFsbH1cXGBcIiBAY2xpY2s9XCJvbkNsaWNrXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiJHtidXR0b25DbGFzc2VzLmNvbnRlbnRzfVwiPnt7dmFsdWV9fTwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICBgLFxyXG4gICAgICBwcm9wczogW1widmFsdWVcIiwgXCJzaXplXCIsIFwiY29sb3JcIl0sXHJcbiAgICAgIGVtaXRzOiBbXCJjbGlja1wiXSxcclxuICAgICAgZGF0YSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgYnV0dG9uQ2xhc3Nlc1xyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgbWV0aG9kczoge1xyXG4gICAgICAgIG9uQ2xpY2soZSkge1xyXG4gICAgICAgICAgdGhpcy4kZW1pdChcImNsaWNrXCIsIGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59IiwgImV4cG9ydCBkZWZhdWx0IGBcbi5hY29yZC0tZGlzY29yZC1jaGVja3tjb2xvcjp2YXIoLS13aGl0ZS03MDApO2JhY2tncm91bmQtY29sb3I6Y3VycmVudENvbG9yO3otaW5kZXg6MH0uYWNvcmQtLWRpc2NvcmQtY2hlY2sgLnNsaWRlcnt0cmFuc2l0aW9uOjEwMG1zIGVhc2UtaW4tb3V0IGFsbDtsZWZ0Oi0zcHh9LmFjb3JkLS1kaXNjb3JkLWNoZWNrLmNoZWNrZWR7Y29sb3I6dmFyKC0tZ3JlZW4tNDAwKX0uYWNvcmQtLWRpc2NvcmQtY2hlY2suY2hlY2tlZCAuc2xpZGVye3RyYW5zaXRpb246MTAwbXMgZWFzZS1pbi1vdXQgYWxsO2xlZnQ6MTJweH1gO1xuIiwgImltcG9ydCB3ZWJwYWNrIGZyb20gXCIuLi8uLi8uLi8uLi9tb2R1bGVzL3dlYnBhY2suanNcIjtcclxuaW1wb3J0IHBhdGNoZXIgZnJvbSBcIi4uLy4uLy4uLy4uL3BhdGNoZXIvaW5kZXguanNcIjtcclxuaW1wb3J0IGNzc1RleHQgZnJvbSBcIi4vc3R5bGUuc2Nzc1wiO1xyXG5wYXRjaGVyLmluamVjdENTUyhjc3NUZXh0KTtcclxuXHJcbmNvbnN0IGNoZWNrQ2xhc3NlcyA9IHdlYnBhY2suZmluZEJ5UHJvcGVydGllcyhcImNoZWNrZWRcIiwgXCJjb250YWluZXJcIiwgXCJzbGlkZXJcIik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgLyoqIEBwYXJhbSB7aW1wb3J0KFwidnVlXCIpLkFwcH0gdnVlQXBwICovXHJcbiAgbG9hZCh2dWVBcHApIHtcclxuICAgIHZ1ZUFwcC5jb21wb25lbnQoXCJkaXNjb3JkLWNoZWNrXCIsIHtcclxuICAgICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8ZGl2IGNsYXNzPVwiJHtjaGVja0NsYXNzZXMuY29udGFpbmVyfSBkZWZhdWx0LWNvbG9ycyBhY29yZC0tZGlzY29yZC1jaGVja1wiIFxyXG4gICAgICAgICAgOmNsYXNzPVwieycke2NoZWNrQ2xhc3Nlcy5jaGVja2VkfSc6IG1vZGVsVmFsdWUsICdjaGVja2VkJzogbW9kZWxWYWx1ZX1cIiBcclxuICAgICAgICAgIEBjbGljaz1cIm9uQ2xpY2tcIlxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxzdmcgY2xhc3M9XCIke2NoZWNrQ2xhc3Nlcy5zbGlkZXJ9IHNsaWRlclwiIHZpZXdCb3g9XCIwIDAgMjggMjBcIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPVwieE1pbllNaWQgbWVldFwiPlxyXG4gICAgICAgICAgICA8cmVjdCBmaWxsPVwid2hpdGVcIiB4PVwiNFwiIHk9XCIwXCIgcng9XCIxMFwiIHdpZHRoPVwiMjBcIiBoZWlnaHQ9XCIyMFwiPjwvcmVjdD5cclxuICAgICAgICAgICAgPHN2ZyB2LWlmPVwibW9kZWxWYWx1ZVwiIHZpZXdCb3g9XCIwIDAgMjAgMjBcIiBmaWxsPVwibm9uZVwiPlxyXG4gICAgICAgICAgICAgIDxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTcuODk1NjEgMTQuODUzOEw2LjMwNDYyIDEzLjI2MjlMMTQuMzA5OSA1LjI1NzU1TDE1LjkwMDkgNi44NDg1NEw3Ljg5NTYxIDE0Ljg1MzhaXCI+PC9wYXRoPlxyXG4gICAgICAgICAgICAgIDxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTQuMDg2NDMgMTEuMDkwM0w1LjY3NzQyIDkuNDk5MjlMOS40NDg1IDEzLjI3MDRMNy44NTc1MSAxNC44NjE0TDQuMDg2NDMgMTEuMDkwM1pcIj48L3BhdGg+XHJcbiAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICA8c3ZnIHYtZWxzZSB2aWV3Qm94PVwiMCAwIDIwIDIwXCIgZmlsbD1cIm5vbmVcIj5cclxuICAgICAgICAgICAgICA8cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk01LjEzMjMxIDYuNzI5NjNMNi43MjMzIDUuMTM4NjRMMTQuODU1IDEzLjI3MDRMMTMuMjY0IDE0Ljg2MTRMNS4xMzIzMSA2LjcyOTYzWlwiPjwvcGF0aD5cclxuICAgICAgICAgICAgICA8cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk0xMy4yNzA0IDUuMTM4NjRMMTQuODYxNCA2LjcyOTYzTDYuNzI5NjMgMTQuODYxNEw1LjEzODY0IDEzLjI3MDRMMTMuMjcwNCA1LjEzODY0WlwiPjwvcGF0aD5cclxuICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgYCxcclxuICAgICAgcHJvcHM6IHtcclxuICAgICAgICBtb2RlbFZhbHVlOiB7XHJcbiAgICAgICAgICBkZWZhdWx0KCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBlbWl0czogWyd1cGRhdGU6bW9kZWxWYWx1ZScsICdjaGFuZ2UnXSxcclxuICAgICAgbWV0aG9kczoge1xyXG4gICAgICAgIG9uQ2xpY2soZXZlbnQpIHtcclxuICAgICAgICAgIGxldCBuZXdWYWx1ZSA9ICF0aGlzLm1vZGVsVmFsdWU7XHJcbiAgICAgICAgICB0aGlzLiRlbWl0KFwidXBkYXRlOm1vZGVsVmFsdWVcIiwgbmV3VmFsdWUpO1xyXG4gICAgICAgICAgdGhpcy4kZW1pdChcImNoYW5nZVwiLCB7IHZhbHVlOiBuZXdWYWx1ZSwgZXZlbnQgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn0iLCAiaW1wb3J0IHdlYnBhY2sgZnJvbSBcIi4uLy4uLy4uLy4uLy4uL2FwaS9tb2R1bGVzL3dlYnBhY2suanNcIjtcclxuXHJcbmxldCBpbnB1dENsYXNzZXMgPSB3ZWJwYWNrLmZpbmRCeVByb3BlcnRpZXMoXCJpbnB1dERlZmF1bHRcIiwgXCJjb3B5SW5wdXRcIik7XHJcbmxldCBpbnB1dENsYXNzZXMyID0gd2VicGFjay5maW5kQnlQcm9wZXJ0aWVzKFwiaW5wdXRcIiwgXCJlZGl0YWJsZVwiLCBcImRpc2FibGVkXCIsIFwiaW5wdXRXcmFwcGVyXCIpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIC8qKiBAcGFyYW0ge2ltcG9ydChcInZ1ZVwiKS5BcHB9IHZ1ZUFwcCAqL1xyXG4gIGxvYWQodnVlQXBwKSB7XHJcbiAgICB2dWVBcHAuY29tcG9uZW50KFwiZGlzY29yZC1pbnB1dFwiLCB7XHJcbiAgICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cIiR7aW5wdXRDbGFzc2VzMj8uaW5wdXR9XCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiJHtpbnB1dENsYXNzZXM/LmlucHV0V3JhcHBlcn1cIj5cclxuICAgICAgICAgICAgPGlucHV0IDp0eXBlPVwidHlwZSA/PyAndGV4dCdcIiBjbGFzcz1cIiR7aW5wdXRDbGFzc2VzPy5pbnB1dERlZmF1bHR9XCIgdi1iaW5kPVwidmFsdWVcIiA6cGxhY2Vob2xkZXI9XCJwbGFjZWhvbGRlclwiIDptYXhsZW5ndGg9XCJtYXhsZW5ndGhcIiA6c3R5bGU9XCJzdHlsZVwiIEBjaGFuZ2U9XCJvbkNoYW5nZVwiIC8+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgYCxcclxuICAgICAgcHJvcHM6IFtcInZhbHVlXCIsIFwicGxhY2Vob2xkZXJcIiwgXCJ0eXBlXCIsIFwibWF4bGVuZ3RoXCIsIFwic3R5bGVcIl0sXHJcbiAgICAgIGVtaXRzOiBbXCJjaGFuZ2VcIl0sXHJcbiAgICAgIG1ldGhvZHM6IHtcclxuICAgICAgICBvbkNoYW5nZShldmVudCkge1xyXG4gICAgICAgICAgdGhpcy4kZW1pdChcImNoYW5nZVwiLCB7IGV2ZW50LCB2YWx1ZTogZXZlbnQudGFyZ2V0LnZhbHVlIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59IiwgImV4cG9ydCBkZWZhdWx0IGBcbi5hY29yZC0tZGlzY29yZC1zZWxlY3R7cG9zaXRpb246cmVsYXRpdmU7d2lkdGg6MTAwJX0uYWNvcmQtLWRpc2NvcmQtc2VsZWN0Pi5vcHRpb25ze3Bvc2l0aW9uOmFic29sdXRlO3RvcDoxMDAlO3dpZHRoOjEwMCU7bWF4LWhlaWdodDoyODZweDtvdmVyZmxvdy14OmhpZGRlbjtvdmVyZmxvdy15OnNjcm9sbDt6LWluZGV4OjF9LmFjb3JkLS1kaXNjb3JkLXNlbGVjdD4ub3B0aW9ucy50b3AtcG9wb3V0e3RvcDphdXRvO2JvdHRvbToxMDAlfWA7XG4iLCAiaW1wb3J0IHdlYnBhY2sgZnJvbSBcIi4uLy4uLy4uLy4uL21vZHVsZXMvd2VicGFjay5qc1wiO1xyXG5pbXBvcnQgcGF0Y2hlciBmcm9tIFwiLi4vLi4vLi4vLi4vcGF0Y2hlci9pbmRleC5qc1wiO1xyXG5cclxuaW1wb3J0IGNzc1RleHQgZnJvbSBcIi4vc3R5bGUuc2Nzc1wiO1xyXG5wYXRjaGVyLmluamVjdENTUyhjc3NUZXh0KTtcclxuXHJcbmNvbnN0IHNlbGVjdENsYXNzZXMgPSB3ZWJwYWNrLmZpbmRCeVByb3BlcnRpZXMoXCJzZWxlY3RcIiwgXCJzZWFyY2hhYmxlU2VsZWN0XCIsIFwibXVsdGlTZWxlY3RDaGVja1wiKTtcclxuY29uc3Qgc2Nyb2xsQ2xhc3NlcyA9IHdlYnBhY2suZmluZEJ5UHJvcGVydGllcyhcIm1hbmFnZWRSZWFjdGl2ZVNjcm9sbGVyXCIsIFwic2Nyb2xsZXJCYXNlXCIsIFwidGhpblwiKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAvKiogQHBhcmFtIHtpbXBvcnQoXCJ2dWVcIikuQXBwfSB2dWVBcHAgKi9cclxuICBsb2FkKHZ1ZUFwcCkge1xyXG4gICAgdnVlQXBwLmNvbXBvbmVudChcImRpc2NvcmQtc2VsZWN0XCIsIHtcclxuICAgICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8ZGl2IGNsYXNzPVwiJHtzZWxlY3RDbGFzc2VzLnNlbGVjdH0gJHtzZWxlY3RDbGFzc2VzLmxvb2tGaWxsZWR9IGFjb3JkLS1kaXNjb3JkLXNlbGVjdFwiIDpjbGFzcz1cInsnJHtzZWxlY3RDbGFzc2VzLm9wZW59JzogYWN0aXZlfVwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cIiR7c2VsZWN0Q2xhc3Nlcy52YWx1ZX1cIj57e29wdGlvbnMuZmluZChpPT5pLnZhbHVlID09PSBtb2RlbFZhbHVlKT8ubGFiZWx9fTwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cIiR7c2VsZWN0Q2xhc3Nlcy5pY29uc31cIj5cclxuICAgICAgICAgICAgICA8c3ZnIHYtaWY9XCIhYWN0aXZlXCIgY2xhc3M9XCJpY29uXCIgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiPjxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTE2LjU5IDguNTkwMDNMMTIgMTMuMTdMNy40MSA4LjU5MDAzTDYgMTBMMTIgMTZMMTggMTBMMTYuNTkgOC41OTAwM1pcIj48L3BhdGg+PC9zdmc+XHJcbiAgICAgICAgICAgICAgPHN2ZyB2LWVsc2UgY2xhc3M9XCJpY29uXCIgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiPjxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTcuNDEgMTYuMDAwMUwxMiAxMS40MjAxTDE2LjU5IDE2LjAwMDFMMTggMTQuNTkwMUwxMiA4LjU5MDA2TDYgMTQuNTkwMUw3LjQxIDE2LjAwMDFaXCI+PC9wYXRoPjwvc3ZnPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IHYtaWY9XCJhY3RpdmVcIiBjbGFzcz1cIm9wdGlvbnMgJHtzZWxlY3RDbGFzc2VzLnBvcG91dH0gJHtzY3JvbGxDbGFzc2VzLnNjcm9sbGVyQmFzZX0gJHtzY3JvbGxDbGFzc2VzLnRoaW59XCIgOmNsYXNzPVwieyd0b3AtcG9wb3V0JzogcG9wb3V0UG9zaXRpb24gPT09ICd0b3AnfVwiPlxyXG4gICAgICAgICAgICA8ZGl2IHYtZm9yPVwib3B0aW9uIGluIG9wdGlvbnNcIiBjbGFzcz1cIm9wdGlvbiAke3NlbGVjdENsYXNzZXMub3B0aW9ufVwiIEBjbGljaz1cIm9uT3B0aW9uQ2xpY2soJGV2ZW50LCBvcHRpb24pXCIgOmtleT1cIm9wdGlvbi52YWx1ZVwiIDphcmlhLXNlbGVjdGVkPVwiXFxgXFwke21vZGVsVmFsdWUgPT09IG9wdGlvbi52YWx1ZX1cXGBcIj5cclxuICAgICAgICAgICAgICB7e29wdGlvbi5sYWJlbH19XHJcbiAgICAgICAgICAgICAgPHN2ZyB2LWlmPVwibW9kZWxWYWx1ZSA9PT0gb3B0aW9uLnZhbHVlXCIgY2xhc3M9XCIke3NlbGVjdENsYXNzZXMuc2VsZWN0ZWRJY29ufVwiIHJvbGU9XCJpbWdcIiB3aWR0aD1cIjIwXCIgaGVpZ2h0PVwiMjBcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPjxjaXJjbGUgcj1cIjhcIiBjeD1cIjEyXCIgY3k9XCIxMlwiIGZpbGw9XCJ3aGl0ZVwiPjwvY2lyY2xlPjxnIGZpbGw9XCJub25lXCIgZmlsbC1ydWxlPVwiZXZlbm9kZFwiPjxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bS0yIDE1bC01LTUgMS40MS0xLjQxTDEwIDE0LjE3bDcuNTktNy41OUwxOSA4bC05IDl6XCI+PC9wYXRoPjwvZz48L3N2Zz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgYCxcclxuICAgICAgZGF0YSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgc2VsZWN0Q2xhc3NlcyxcclxuICAgICAgICAgIGFjdGl2ZTogZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIHByb3BzOiBbXCJvcHRpb25zXCIsIFwibW9kZWxWYWx1ZVwiLCBcInBvcG91dFBvc2l0aW9uXCJdLFxyXG4gICAgICBlbWl0czogWyd1cGRhdGU6bW9kZWxWYWx1ZScsIFwiY2hhbmdlXCJdLFxyXG4gICAgICBtb3VudGVkKCkge1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5vbkNsaWNrKTtcclxuICAgICAgfSxcclxuICAgICAgdW5tb3VudGVkKCkge1xyXG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5vbkNsaWNrKTtcclxuICAgICAgfSxcclxuICAgICAgbWV0aG9kczoge1xyXG4gICAgICAgIG9uT3B0aW9uQ2xpY2soZXZlbnQsIG9wdGlvbikge1xyXG4gICAgICAgICAgdGhpcy4kZW1pdChcInVwZGF0ZTptb2RlbFZhbHVlXCIsIG9wdGlvbi52YWx1ZSk7XHJcbiAgICAgICAgICB0aGlzLiRlbWl0KFwiY2hhbmdlXCIsIHsgdmFsdWU6IG9wdGlvbi52YWx1ZSwgZXZlbnQgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvbkNsaWNrKGUpIHtcclxuICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKHNlbGVjdENsYXNzZXMuc2VsZWN0KVxyXG4gICAgICAgICAgICB8fCBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoc2VsZWN0Q2xhc3Nlcy52YWx1ZSlcclxuICAgICAgICAgICAgfHwgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKHNlbGVjdENsYXNzZXMuaWNvbnMpXHJcbiAgICAgICAgICAgIHx8IGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhzZWxlY3RDbGFzc2VzLnBvcG91dClcclxuICAgICAgICAgICAgfHwgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKHNlbGVjdENsYXNzZXMub3B0aW9uKVxyXG4gICAgICAgICAgICB8fCBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJpY29uXCIpXHJcbiAgICAgICAgICApIHtcclxuICAgICAgICAgICAgdGhpcy5hY3RpdmUgPSAhdGhpcy5hY3RpdmU7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn0iLCAiZXhwb3J0IGRlZmF1bHQgYFxuLmFjb3JkLS1kaXNjb3JkLXRleHRhcmVhe3dpZHRoOjEwMCV9YDtcbiIsICJpbXBvcnQgd2VicGFjayBmcm9tIFwiLi4vLi4vLi4vLi4vbW9kdWxlcy93ZWJwYWNrLmpzXCI7XHJcbmltcG9ydCBwYXRjaGVyIGZyb20gXCIuLi8uLi8uLi8uLi9wYXRjaGVyL2luZGV4LmpzXCI7XHJcblxyXG5pbXBvcnQgY3NzVGV4dCBmcm9tIFwiLi9zdHlsZS5zY3NzXCI7XHJcbnBhdGNoZXIuaW5qZWN0Q1NTKGNzc1RleHQpO1xyXG5cclxubGV0IGlucHV0Q2xhc3NlcyA9IHdlYnBhY2suZmluZEJ5UHJvcGVydGllcyhcInRleHRBcmVhXCIsIFwibWF4TGVuZ3RoXCIsIFwiY2hhcmFjdGVyQ291bnRcIik7XHJcbmxldCBpbnB1dENsYXNzZXMyID0gd2VicGFjay5maW5kQnlQcm9wZXJ0aWVzKFwiaW5wdXRXcmFwcGVyXCIsIFwiaW5wdXREZWZhdWx0XCIpO1xyXG5sZXQgc2Nyb2xsQ2xhc3NlcyA9IHdlYnBhY2suZmluZEJ5UHJvcGVydGllcyhcInNjcm9sbGJhckRlZmF1bHRcIiwgXCJzY3JvbGxiYXJcIiwgXCJzY3JvbGxiYXJHaG9zdFwiKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAvKiogQHBhcmFtIHtpbXBvcnQoXCJ2dWVcIikuQXBwfSB2dWVBcHAgKi9cclxuICBsb2FkKHZ1ZUFwcCkge1xyXG4gICAgdnVlQXBwLmNvbXBvbmVudChcImRpc2NvcmQtdGV4dGFyZWFcIiwge1xyXG4gICAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCIke2lucHV0Q2xhc3NlczIuaW5wdXRXcmFwcGVyfSBhY29yZC0tZGlzY29yZC10ZXh0YXJlYVwiPlxyXG4gICAgICAgICAgPHRleHRhcmVhIGNsYXNzPVwiJHtpbnB1dENsYXNzZXMyLmlucHV0RGVmYXVsdH0gJHtpbnB1dENsYXNzZXMudGV4dEFyZWF9ICR7c2Nyb2xsQ2xhc3Nlcy5zY3JvbGxiYXJEZWZhdWx0fVwiIHYtYmluZD1cInZhbHVlXCIgOnBsYWNlaG9sZGVyPVwicGxhY2Vob2xkZXJcIiA6bWF4bGVuZ3RoPVwibWF4bGVuZ3RoXCIgOmNvbHM9XCJjb2xzXCIgOnJvd3M9XCJyb3dzXCIgOnN0eWxlPVwic3R5bGVcIj48L3RleHRhcmVhPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICBgLFxyXG4gICAgICBwcm9wczogW1widmFsdWVcIiwgXCJwbGFjZWhvbGRlclwiLCBcIm1heGxlbmd0aFwiLCBcInN0eWxlXCIsIFwiY29sc1wiLCBcInJvd3NcIl0sXHJcbiAgICAgIGVtaXRzOiBbXCJjaGFuZ2VcIl0sXHJcbiAgICAgIG1ldGhvZHM6IHtcclxuICAgICAgICBvbkNoYW5nZShldmVudCkge1xyXG4gICAgICAgICAgdGhpcy4kZW1pdChcImNoYW5nZVwiLCB7IGV2ZW50LCB2YWx1ZTogZXZlbnQudGFyZ2V0LnZhbHVlIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiIsICJpbXBvcnQgZGlzY29yZEJ1dHRvbiBmcm9tIFwiLi9kaXNjb3JkLWJ1dHRvbi9pbmRleC5qc1wiO1xyXG5pbXBvcnQgZGlzY29yZENoZWNrIGZyb20gXCIuL2Rpc2NvcmQtY2hlY2svaW5kZXguanNcIjtcclxuaW1wb3J0IGRpc2NvcmRJbnB1dCBmcm9tIFwiLi9kaXNjb3JkLWlucHV0L2luZGV4LmpzXCI7XHJcbmltcG9ydCBkaXNjb3JkU2VsZWN0IGZyb20gXCIuL2Rpc2NvcmQtc2VsZWN0L2luZGV4LmpzXCI7XHJcbmltcG9ydCBkaXNjb3JkVGV4dGFyZWEgZnJvbSBcIi4vZGlzY29yZC10ZXh0YXJlYS9pbmRleC5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGxvYWQodnVlQXBwKSB7XHJcbiAgICBkaXNjb3JkQ2hlY2subG9hZCh2dWVBcHApO1xyXG4gICAgZGlzY29yZFRleHRhcmVhLmxvYWQodnVlQXBwKTtcclxuICAgIGRpc2NvcmRTZWxlY3QubG9hZCh2dWVBcHApO1xyXG4gICAgZGlzY29yZElucHV0LmxvYWQodnVlQXBwKTtcclxuICAgIGRpc2NvcmRCdXR0b24ubG9hZCh2dWVBcHApO1xyXG4gIH1cclxufSIsICIvLyBodHRwczovL2xvZ2FyZXRtLmNvbS9ibG9nL2ZvcmNpbmctcmVjb21wdXRhdGlvbi1vZi1jb21wdXRlZC1wcm9wZXJ0aWVzL1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJlY29tcHV0ZSh2bSwgcHJvcE5hbWUpIHtcclxuICAvLyBoYW5kbGUgbm9uLWV4aXN0ZW50IHByb3BzLlxyXG4gIGlmICghdm0uJF9fcmVjb21wdXRhYmxlcyB8fCAhdm0uJF9fcmVjb21wdXRhYmxlc1twcm9wTmFtZV0pIHtcclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIHZtLiRfX3JlY29tcHV0YWJsZXNbcHJvcE5hbWVdLmJhY2tkb29yKys7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZWNvbXB1dGFibGUoZm4sIG5hbWUpIHtcclxuICBjb25zdCByZWFjdGl2ZSA9IFZ1ZS5jb21wdXRlZCh7XHJcbiAgICBiYWNrZG9vcjogMFxyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gZnVuY3Rpb24gKCkge1xyXG4gICAgLy8gaW5pdGlhbGl6ZSBhIG1hcCBvbmNlLlxyXG4gICAgaWYgKCF0aGlzLiRfX3JlY29tcHV0YWJsZXMpIHtcclxuICAgICAgdGhpcy4kX19yZWNvbXB1dGFibGVzID0ge307XHJcbiAgICB9XHJcblxyXG4gICAgLy8gYWRkIGEgcmVmZXJlbmNlIHRvIG15IHJlYWN0aXZlIGJhY2tkb29yIHRyaWdnZXIuXHJcbiAgICBpZiAoIXRoaXMuJF9fcmVjb21wdXRhYmxlc1tmbi5uYW1lIHx8IG5hbWVdKSB7XHJcbiAgICAgIHRoaXMuJF9fcmVjb21wdXRhYmxlc1tmbi5uYW1lIHx8IG5hbWVdID0gcmVhY3RpdmU7XHJcbiAgICB9XHJcblxyXG4gICAgcmVhY3RpdmUuYmFja2Rvb3I7IC8vIHJlZmVyZW5jZSBpdCFcclxuXHJcbiAgICByZXR1cm4gZm4uY2FsbCh0aGlzKTtcclxuICB9O1xyXG59IiwgImltcG9ydCB2dWVDb21wb25lbnRzIGZyb20gXCIuL2NvbXBvbmVudHMvaW5kZXguanNcIjtcclxuaW1wb3J0IHsgcmVjb21wdXRhYmxlLCByZWNvbXB1dGUgfSBmcm9tIFwiLi91dGlscy9yZWNvbXB1dGUuanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBjb21wb25lbnRzOiB7XHJcbiAgICBsb2FkKHZ1ZUFwcCkge1xyXG4gICAgICB2dWVDb21wb25lbnRzLmxvYWQodnVlQXBwKTtcclxuICAgIH1cclxuICB9LFxyXG4gIHJlYWR5OiB7XHJcbiAgICBhc3luYyB3aGVuKCkge1xyXG4gICAgICB3aGlsZSAoIXdpbmRvdy5WdWUpIHtcclxuICAgICAgICBhd2FpdCBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgMTAwKSk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9LFxyXG4gICAgZ2V0IGlzKCkge1xyXG4gICAgICByZXR1cm4gISF3aW5kb3cuVnVlO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgZ2V0IFZ1ZSgpIHtcclxuICAgIHJldHVybiB3aW5kb3cuVnVlO1xyXG4gIH0sXHJcbiAgdXRpbHM6IHtcclxuICAgIGNvbXB1dGVkOiB7XHJcbiAgICAgIHJlY29tcHV0ZSxcclxuICAgICAgcmVjb21wdXRhYmxlXHJcbiAgICB9XHJcbiAgfVxyXG59IiwgImltcG9ydCBwYXRjaGVyIGZyb20gXCIuLi9wYXRjaGVyL2luZGV4LmpzXCI7XHJcbmltcG9ydCBzdHlsZUNTU1RleHQgZnJvbSBcIi4vc3R5bGVzLnNjc3NcIjtcclxucGF0Y2hlci5pbmplY3RDU1Moc3R5bGVDU1NUZXh0KTtcclxuXHJcbmltcG9ydCB0b29sdGlwcyBmcm9tIFwiLi90b29sdGlwcy5qc1wiO1xyXG5pbXBvcnQgbm90aWZpY2F0aW9ucyBmcm9tIFwiLi9ub3RpZmljYXRpb25zLmpzXCI7XHJcbmltcG9ydCBjb250ZXh0TWVudXMgZnJvbSBcIi4vY29udGV4dE1lbnVzLmpzXCI7XHJcbmltcG9ydCBjb21wb25lbnRzIGZyb20gXCIuL2NvbXBvbmVudHMuanNcIjtcclxuaW1wb3J0IG1vZGFscyBmcm9tIFwiLi9tb2RhbHMuanN4XCI7XHJcbmltcG9ydCB0b2FzdHMgZnJvbSBcIi4vdG9hc3RzLmpzXCI7XHJcbmltcG9ydCB2dWUgZnJvbSBcIi4vdnVlL2luZGV4LmpzXCI7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIHRvb2x0aXBzLFxyXG4gIG5vdGlmaWNhdGlvbnMsXHJcbiAgY29udGV4dE1lbnVzLFxyXG4gIGNvbXBvbmVudHMsXHJcbiAgbW9kYWxzLFxyXG4gIHRvYXN0cyxcclxuICB2dWVcclxufSIsICJjb25zdCBzaGFyZWQgPSB7fTtcclxuZXhwb3J0IGRlZmF1bHQgc2hhcmVkOyIsICJpbXBvcnQgZXh0ZW5zaW9ucyBmcm9tIFwiLi4vZXh0ZW5zaW9ucy9pbmRleC5qc1wiO1xyXG5pbXBvcnQgbG9nZ2VyIGZyb20gXCIuLi91dGlscy9sb2dnZXIuanNcIjtcclxuaW1wb3J0IGkxOG4gZnJvbSBcIi4uL2kxOG4vaW5kZXguanNcIjtcclxuaW1wb3J0IHdlYnNvY2tldCBmcm9tIFwiLi4vd2Vic29ja2V0L2luZGV4LmpzXCI7XHJcblxyXG5sZXQgZGV2TW9kZUVuYWJsZWQgPSBmYWxzZTtcclxuXHJcbmxldCBpc0xvYWRpbmcgPSBmYWxzZTtcclxuXHJcbmxldCBsb2FkZWQ7XHJcbmxldCBpbnN0YWxsZWQ7XHJcblxyXG5jb25zdCBleHRlbnNpb24gPSB7XHJcbiAgZ2V0IGxvYWRlZCgpIHsgcmV0dXJuIGxvYWRlZDsgfSxcclxuICBnZXQgaW5zdGFsbGVkKCkgeyByZXR1cm4gaW5zdGFsbGVkOyB9LFxyXG4gIHVubG9hZCgpIHtcclxuICAgIGlmICghbG9hZGVkKSByZXR1cm4gZmFsc2U7XHJcbiAgICBleHRlbnNpb25zLmxvYWRlci51bmxvYWQoXCJEZXZlbG9wbWVudFwiKTtcclxuICAgIGxvYWRlZCA9IG51bGw7XHJcbiAgICBpbnN0YWxsZWQgPSBudWxsO1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfSxcclxuICBhc3luYyBsb2FkKHNvdXJjZSwgbWFuaWZlc3QpIHtcclxuICAgIGlmICghc291cmNlIHx8ICFtYW5pZmVzdCkgdGhyb3cgbmV3IEVycm9yKGBTb3VyY2UgYW5kIG1hbmlmZXN0IGFyZSByZXF1aXJlZCB0byBsb2FkIGFuIGV4dGVuc2lvbiFgKTtcclxuICAgIGlmIChsb2FkZWQpIHRocm93IG5ldyBFcnJvcihgRXh0ZW5zaW9uIGlzIGFscmVhZHkgbG9hZGVkIWApO1xyXG4gICAgaWYgKGlzTG9hZGluZykgcmV0dXJuIGZhbHNlO1xyXG4gICAgaXNMb2FkaW5nID0gdHJ1ZTtcclxuICAgIHRyeSB7XHJcbiAgICAgIGxvYWRlZCA9IGF3YWl0IGV4dGVuc2lvbnMubG9hZGVyLmxvYWQoXCJEZXZlbG9wbWVudFwiLCB7IHNvdXJjZSwgbWFuaWZlc3QgfSk7XHJcbiAgICAgIGluc3RhbGxlZCA9IHtcclxuICAgICAgICBtYW5pZmVzdFxyXG4gICAgICB9O1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGxvZ2dlci5lcnJvcihgVW5hYmxlIHRvIGxvYWQgZGV2ZWxvcG1lbnQgZXh0ZW5zaW9uLmAsIGkxOG4ubG9jYWxpemUobWFuaWZlc3QuYWJvdXQubmFtZSksIGVycik7XHJcbiAgICAgIGlzTG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpc0xvYWRpbmcgPSBmYWxzZTtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxufVxyXG5cclxuY29uc3Qgb3V0ID0ge1xyXG4gIGdldCBlbmFibGVkKCkge1xyXG4gICAgcmV0dXJuIGRldk1vZGVFbmFibGVkO1xyXG4gIH0sXHJcbiAgc2V0IGVuYWJsZWQodmFsdWUpIHtcclxuICAgIGlmICghZ2xvYmFsVGhpc1tcIjxQUkVMT0FEX0tFWT5cIl0uaXNEZXZUb29sc09wZW4oKSkgdGhyb3cgbmV3IEVycm9yKFwiRGV2IG1vZGUgc3RhdHVzIGNhbiBvbmx5IGJlIG1vZGlmaWVkIHdoZW4gRGV2VG9vbHMgaXMgb3BlbiFcIik7XHJcbiAgICBkZXZNb2RlRW5hYmxlZCA9IHZhbHVlO1xyXG4gIH0sXHJcbiAgZ2V0IGV4dGVuc2lvbigpIHtcclxuICAgIGlmICghZGV2TW9kZUVuYWJsZWQpIHRocm93IG5ldyBFcnJvcihcIkRldiBtb2RlIGlzIG5vdCBlbmFibGVkIVwiKTtcclxuICAgIHJldHVybiBleHRlbnNpb247XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBvdXQ7XHJcblxyXG5sZXQgaXNQcm9jZXNzaW5nID0gZmFsc2U7XHJcbndlYnNvY2tldC5zZXQoXHJcbiAgXCJVcGRhdGVEZXZlbG9wbWVudEV4dGVuc2lvblwiLFxyXG4gIGFzeW5jICh7IHNvdXJjZSwgbWFuaWZlc3QgfSA9IHt9KSA9PiB7XHJcbiAgICBpZiAoIWRldk1vZGVFbmFibGVkKVxyXG4gICAgICByZXR1cm4gbG9nZ2VyLndhcm4oYERldmVsb3BtZW50IGV4dGVuc2lvbiB3YXMgc2VudCBiZWZvcmUgZGV2IG1vZGUgd2FzIGVuYWJsZWQuYCk7XHJcblxyXG4gICAgaWYgKCFzb3VyY2UgfHwgIW1hbmlmZXN0KVxyXG4gICAgICByZXR1cm4gbG9nZ2VyLndhcm4oYERldmVsb3BtZW50IGV4dGVuc2lvbiB3YXMgc2VudCB3aXRob3V0IHNvdXJjZSBvciBtYW5pZmVzdC5gKTtcclxuXHJcbiAgICBpZiAoaXNQcm9jZXNzaW5nKVxyXG4gICAgICByZXR1cm4gbG9nZ2VyLndhcm4oYERldmVsb3BtZW50IGV4dGVuc2lvbiB3YXMgc2VudCB3aGlsZSBleHRlbnNpb24gd2FzIGFscmVhZHkgYmVpbmcgcHJvY2Vzc2VkLmApO1xyXG5cclxuICAgIGlzUHJvY2Vzc2luZyA9IHRydWU7XHJcblxyXG4gICAgZXh0ZW5zaW9uLnVubG9hZCgpO1xyXG4gICAgYXdhaXQgbmV3IFByb21pc2UoKHIpID0+IHNldFRpbWVvdXQociwgMSkpO1xyXG4gICAgbGV0IHN1Y2Nlc3MgPSBhd2FpdCBleHRlbnNpb24ubG9hZChzb3VyY2UsIG1hbmlmZXN0KTtcclxuICAgIGlmIChzdWNjZXNzKSBsb2dnZXIuaW5mbyhgRGV2ZWxvcG1lbnQgZXh0ZW5zaW9uIGlzIGxvYWRlZCEgKCR7aTE4bi5sb2NhbGl6ZShtYW5pZmVzdC5hYm91dC5uYW1lKX0pYCk7XHJcbiAgICBpc1Byb2Nlc3NpbmcgPSBmYWxzZTtcclxuICB9XHJcbikiLCAiZXhwb3J0IGRlZmF1bHQge1xyXG4gIHByb2Nlc3M6IGdsb2JhbFRoaXNbXCI8UFJFTE9BRF9LRVk+XCJdLnByb2Nlc3MsXHJcbiAgaXNEZXZUb29sc09wZW46IGdsb2JhbFRoaXNbXCI8UFJFTE9BRF9LRVk+XCJdLmlzRGV2VG9vbHNPcGVuXHJcbn1cclxuXHJcbiIsICJpbXBvcnQgbW9kdWxlcyBmcm9tICcuL21vZHVsZXMnO1xyXG5pbXBvcnQgZGV2IGZyb20gJy4vZGV2JztcclxuaW1wb3J0IHV0aWxzIGZyb20gJy4vdXRpbHMnO1xyXG5pbXBvcnQgZXh0ZW5zaW9ucyBmcm9tICcuL2V4dGVuc2lvbnMnO1xyXG5pbXBvcnQgaTE4biBmcm9tICcuL2kxOG4nO1xyXG5pbXBvcnQgc3RvcmFnZSBmcm9tICcuL3N0b3JhZ2UnO1xyXG5pbXBvcnQgZXZlbnRzIGZyb20gJy4vZXZlbnRzJztcclxuaW1wb3J0IHBhdGNoZXIgZnJvbSAnLi9wYXRjaGVyJztcclxuaW1wb3J0IGludGVybmFsIGZyb20gJy4vaW50ZXJuYWwnO1xyXG5pbXBvcnQgd2Vic29ja2V0IGZyb20gJy4vd2Vic29ja2V0JztcclxuaW1wb3J0IGRvbSBmcm9tICcuL2RvbSc7XHJcbmltcG9ydCB1aSBmcm9tICcuL3VpL2luZGV4LmpzJztcclxuaW1wb3J0IHNoYXJlZCBmcm9tICcuL3NoYXJlZC9pbmRleC5qcyc7XHJcblxyXG51dGlscy5sb2dnZXIuZGVidWcoYFBSRUxPQURfS0VZOiA8UFJFTE9BRF9LRVk+YCk7XHJcblxyXG5mdW5jdGlvbiBkZXZFcnJvcihhcGkpIHtcclxuICByZXR1cm4gbmV3IEVycm9yKGBUaGUgJHthcGl9IEFQSSBjYW4gb25seSBiZSBhY2Nlc3NlZCB3aGVuIERldiBtb2RlIGlzIGVuYWJsZWQhYCk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBleHBvc2VkQVBJOiB7XHJcbiAgICBkZXYsXHJcbiAgICB1dGlscyxcclxuICAgIGkxOG4sXHJcbiAgICBldmVudHMsXHJcbiAgICB1aSxcclxuICAgIHNoYXJlZCxcclxuICAgIGdldCBkb20oKSB7XHJcbiAgICAgIGlmICghZGV2LmVuYWJsZWQpIHRocm93IGRldkVycm9yKFwiRE9NXCIpO1xyXG4gICAgICByZXR1cm4gZG9tO1xyXG4gICAgfSxcclxuICAgIGdldCBwYXRjaGVyKCkge1xyXG4gICAgICBpZiAoIWRldi5lbmFibGVkKSB0aHJvdyBkZXZFcnJvcihcIlBhdGNoZXJcIik7XHJcbiAgICAgIHJldHVybiBwYXRjaGVyO1xyXG4gICAgfSxcclxuICAgIGdldCBzdG9yYWdlKCkge1xyXG4gICAgICBpZiAoIWRldi5lbmFibGVkKSB0aHJvdyBkZXZFcnJvcihcIlN0b3JhZ2VcIik7XHJcbiAgICAgIHJldHVybiBzdG9yYWdlO1xyXG4gICAgfSxcclxuICAgIGdldCBtb2R1bGVzKCkge1xyXG4gICAgICBpZiAoIWRldi5lbmFibGVkKSB0aHJvdyBkZXZFcnJvcihcIk1vZHVsZXNcIik7XHJcbiAgICAgIHJldHVybiBtb2R1bGVzO1xyXG4gICAgfSxcclxuICAgIGdldCBleHRlbnNpb25zKCkge1xyXG4gICAgICBpZiAoIWRldi5lbmFibGVkKSB0aHJvdyBkZXZFcnJvcihcIkV4dGVuc2lvbnNcIik7XHJcbiAgICAgIHJldHVybiBleHRlbnNpb25zO1xyXG4gICAgfSxcclxuICAgIGdldCBpbnRlcm5hbCgpIHtcclxuICAgICAgaWYgKCFkZXYuZW5hYmxlZCkgdGhyb3cgZGV2RXJyb3IoXCJJbnRlcm5hbFwiKTtcclxuICAgICAgcmV0dXJuIGludGVybmFsO1xyXG4gICAgfSxcclxuICAgIGdldCB3ZWJzb2NrZXQoKSB7XHJcbiAgICAgIGlmICghZGV2LmVuYWJsZWQpIHRocm93IGRldkVycm9yKFwiV2Vic29ja2V0XCIpO1xyXG4gICAgICByZXR1cm4gd2Vic29ja2V0O1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgdW5leHBvc2VkQVBJOiB7XHJcbiAgICBkZXYsXHJcbiAgICBtb2R1bGVzLFxyXG4gICAgdXRpbHMsXHJcbiAgICBleHRlbnNpb25zLFxyXG4gICAgaTE4bixcclxuICAgIHN0b3JhZ2UsXHJcbiAgICBldmVudHMsXHJcbiAgICBwYXRjaGVyLFxyXG4gICAgaW50ZXJuYWwsXHJcbiAgICB3ZWJzb2NrZXQsXHJcbiAgICBzaGFyZWQsXHJcbiAgICB1aSxcclxuICAgIGRvbVxyXG4gIH1cclxufSIsICJpbXBvcnQgZXZlbnRzIGZyb20gXCIuLi9hcGkvZXZlbnRzL2luZGV4LmpzXCI7XHJcblxyXG5jb25zdCBvZ1RpdGxlU2V0dGVyID0gZG9jdW1lbnQuX19sb29rdXBTZXR0ZXJfXyhcInRpdGxlXCIpO1xyXG5jb25zdCBvZ1RpdGxlR2V0dGVyID0gZG9jdW1lbnQuX19sb29rdXBHZXR0ZXJfXyhcInRpdGxlXCIpO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFxyXG4gIGRvY3VtZW50LFxyXG4gIFwidGl0bGVcIixcclxuICB7XHJcbiAgICBnZXQoKSB7XHJcbiAgICAgIHJldHVybiBvZ1RpdGxlR2V0dGVyLmNhbGwodGhpcyk7XHJcbiAgICB9LFxyXG4gICAgc2V0KHYpIHtcclxuICAgICAgZXZlbnRzLmVtaXQoXCJEb2N1bWVudFRpdGxlQ2hhbmdlXCIsIHYpO1xyXG4gICAgICByZXR1cm4gb2dUaXRsZVNldHRlci5jYWxsKHRoaXMsIHYpO1xyXG4gICAgfVxyXG4gIH1cclxuKTsiLCAiaW1wb3J0IG1vZHVsZXMgZnJvbSBcIi4uL2FwaS9tb2R1bGVzL2luZGV4LmpzXCI7XHJcbmltcG9ydCBtb2RhbHMgZnJvbSBcIi4uL2FwaS91aS9tb2RhbHMuanN4XCI7XHJcbmltcG9ydCBub3RpZmljYXRpb25zIGZyb20gXCIuLi9hcGkvdWkvbm90aWZpY2F0aW9ucy5qc1wiO1xyXG5pbXBvcnQgZXh0ZW5zaW9ucyBmcm9tIFwiLi4vYXBpL2V4dGVuc2lvbnMvaW5kZXguanNcIjtcclxuaW1wb3J0IHdlYnNvY2tldCBmcm9tIFwiLi4vYXBpL3dlYnNvY2tldC9pbmRleC5qc1wiO1xyXG5cclxud2Vic29ja2V0LnNldChcIkluc3RhbGxFeHRlbnNpb25cIiwgYXN5bmMgKHsgdXJsIH0gPSB7fSkgPT4ge1xyXG4gIGlmICghdXJsKSByZXR1cm47XHJcblxyXG4gIGF3YWl0IG1vZHVsZXMubmF0aXZlLndpbmRvdy5zZXRBbHdheXNPblRvcCgwLCB0cnVlKTtcclxuICBhd2FpdCBuZXcgUHJvbWlzZShyID0+IHNldFRpbWVvdXQociwgMjUwKSk7XHJcbiAgYXdhaXQgbW9kdWxlcy5uYXRpdmUud2luZG93LnNldEFsd2F5c09uVG9wKDAsIHRydWUpO1xyXG5cclxuICBjb25zdCBzdWNjZXNzID0gYXdhaXQgbW9kYWxzLnNob3cuY29uZmlybWF0aW9uKFxyXG4gICAgYWNvcmQuaTE4bi5mb3JtYXQoXCJJTVBPUlRfRVhURU5TSU9OX01PREFMX1RJVExFXCIpLFxyXG4gICAgYWNvcmQuaTE4bi5mb3JtYXQoXCJJTVBPUlRfRVhURU5TSU9OX01PREFMX0RFU0NSSVBUSU9OXCIsIHVybClcclxuICApO1xyXG5cclxuICBpZiAoIXN1Y2Nlc3MpIHJldHVybjtcclxuXHJcbiAgdHJ5IHtcclxuICAgIGF3YWl0IGV4dGVuc2lvbnMubG9hZCh1cmwpO1xyXG4gIH0gY2F0Y2ggKGVycikge1xyXG4gICAgbm90aWZpY2F0aW9ucy5zaG93LmVycm9yKGAke2Vycn1gLCB7IHRpbWVvdXQ6IDMwMDAwIH0pO1xyXG4gIH1cclxufSk7IiwgImV4cG9ydCBkZWZhdWx0IGBcbltjbGFzcyo9YWNvcmQtLV17Ym94LXNpemluZzpib3JkZXItYm94fVtjbGFzcyo9YWNvcmQtLV0gKntib3gtc2l6aW5nOmJvcmRlci1ib3h9LmFjb3JkLS10YWJzLWNvbnRlbnQtY29udGFpbmVye3BhZGRpbmc6MzJweCAxNnB4O2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpmbGV4LXN0YXJ0O2p1c3RpZnktY29udGVudDpjZW50ZXI7d2lkdGg6MTAwJX0uYWNvcmQtLXRhYnMtY29udGVudC1jb250YWluZXI+LnRhYnt3aWR0aDoxMDAlfS5hY29yZC0tdGFicy10YWItYnV0dG9uLnN0b3JlLXRhYi1idXR0b257YmFja2dyb3VuZC1jb2xvcjp2YXIoLS1zdGF0dXMtcG9zaXRpdmUtYmFja2dyb3VuZCk7Y29sb3I6dmFyKC0tc3RhdHVzLXBvc2l0aXZlLXRleHQpfS5hY29yZC0tdGFicy10YWItYnV0dG9uLnN0b3JlLXRhYi1idXR0b24uc2VsZWN0ZWR7Y29sb3I6dmFyKC0tdGV4dC1wb3NpdGl2ZSk7YmFja2dyb3VuZC1jb2xvcjp2YXIoLS1iYWNrZ3JvdW5kLW1vZGlmaWVyLXNlbGVjdGVkKX1gO1xuIiwgImV4cG9ydCBkZWZhdWx0IHtcclxuICAvKiogQHBhcmFtIHtpbXBvcnQoXCJ2dWVcIikuQXBwfSB2dWVBcHAgKi9cclxuICBsb2FkKHZ1ZUFwcCkge1xyXG4gICAgdnVlQXBwLmNvbXBvbmVudChcclxuICAgICAgXCJob21lLXBhZ2VcIixcclxuICAgICAge1xyXG4gICAgICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPVwid2lkdGg6IDMwMHB4O1wiPlxyXG4gICAgICAgICAgICAgIDxkaXNjb3JkLXNlbGVjdCB2LW1vZGVsPVwidmFsdWVcIiA6b3B0aW9ucz1cIm9wdGlvbnNcIiAvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGgxPnt7IHZhbHVlIH19PC9oMT5cclxuICAgICAgICAgICAgPGJyIC8+XHJcbiAgICAgICAgICAgIDxkaXNjb3JkLWNoZWNrIHYtbW9kZWw9XCJjaGVja2VkXCIgLz5cclxuICAgICAgICAgICAgPGgxPnt7IGNoZWNrZWQgfX08L2gxPlxyXG4gICAgICAgICAgICA8ZGlzY29yZC1jaGVjayB2LW1vZGVsPVwiY2hlY2tlZFwiIC8+XHJcbiAgICAgICAgICAgIDxoMT57eyBjaGVja2VkIH19PC9oMT5cclxuICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICBgLFxyXG4gICAgICAgIGRhdGEoKSB7XHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB2YWx1ZTogXCIxXCIsXHJcbiAgICAgICAgICAgIGNoZWNrZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBvcHRpb25zOiBbXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiMVwiLFxyXG4gICAgICAgICAgICAgICAgbGFiZWw6IFwiT3B0aW9uIDFcIlxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiMlwiLFxyXG4gICAgICAgICAgICAgICAgbGFiZWw6IFwiT3B0aW9uIDJcIlxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiM1wiLFxyXG4gICAgICAgICAgICAgICAgbGFiZWw6IFwiT3B0aW9uIDNcIlxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgKTtcclxuICB9XHJcbn0iLCAiZXhwb3J0IGRlZmF1bHQgYFxuLmFjb3JkLS1pbnN0YWxsZWQtZXh0ZW5zaW9ucy1wYWdle2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpmbGV4LXN0YXJ0O2p1c3RpZnktY29udGVudDpjZW50ZXI7cGFkZGluZzowIDE2cHh9LmFjb3JkLS1pbnN0YWxsZWQtZXh0ZW5zaW9ucy1wYWdlIC5jb250YWluZXJ7d2lkdGg6MTAwJTttYXgtd2lkdGg6MTAyNHB4O2Rpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpjb2x1bW59LmFjb3JkLS1pbnN0YWxsZWQtZXh0ZW5zaW9ucy1wYWdlIC5jb250YWluZXI+LnRvcHtkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2dhcDo4cHh9LmFjb3JkLS1pbnN0YWxsZWQtZXh0ZW5zaW9ucy1wYWdlIC5jb250YWluZXI+LnRvcD4uc2VhcmNoe3dpZHRoOjgwJX0uYWNvcmQtLWluc3RhbGxlZC1leHRlbnNpb25zLXBhZ2UgLmNvbnRhaW5lcj4udG9wPi5jYXRlZ29yeXt3aWR0aDoyMCV9YDtcbiIsICJpbXBvcnQgcGF0Y2hlciBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vLi4vYXBpL3BhdGNoZXIvaW5kZXguanNcIjtcclxuaW1wb3J0IGkxOG4gZnJvbSBcIi4uLy4uLy4uLy4uLy4uLy4uL2FwaS9pMThuL2luZGV4LmpzXCI7XHJcbmltcG9ydCBjc3NUZXh0IGZyb20gXCIuL3N0eWxlLnNjc3NcIjtcclxucGF0Y2hlci5pbmplY3RDU1MoY3NzVGV4dCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgLyoqIEBwYXJhbSB7aW1wb3J0KFwidnVlXCIpLkFwcH0gdnVlQXBwICovXHJcbiAgbG9hZCh2dWVBcHApIHtcclxuICAgIHZ1ZUFwcC5jb21wb25lbnQoXHJcbiAgICAgIFwiaW5zdGFsbGVkLWV4dGVuc2lvbnMtcGFnZVwiLFxyXG4gICAgICB7XHJcbiAgICAgICAgdGVtcGxhdGU6IGBcclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJhY29yZC0taW5zdGFsbGVkLWV4dGVuc2lvbnMtcGFnZVwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRvcFwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNlYXJjaFwiPlxyXG4gICAgICAgICAgICAgICAgICA8ZGlzY29yZC1pbnB1dCB2LW1vZGVsPVwic2VhcmNoVGV4dFwiIDpwbGFjZWhvbGRlcj1cImkxOG5Gb3JtYXQoJ1NFQVJDSCcpXCIgLz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhdGVnb3J5XCI+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXNjb3JkLXNlbGVjdCB2LW1vZGVsPVwic2VhcmNoQ2F0ZWdvcnlUZXh0XCIgOm9wdGlvbnM9XCJbe3ZhbHVlOiAnYWxsJywgbGFiZWw6IGkxOG5Gb3JtYXQoJ0FMTCcpfSwge3ZhbHVlOiAncGx1Z2lucycsIGxhYmVsOiBpMThuRm9ybWF0KCdQTFVHSU5TJyl9LCB7dmFsdWU6ICd0aGVtZXMnLCBsYWJlbDogaTE4bkZvcm1hdCgnVEhFTUVTJyl9XVwiIC8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnV0dG9uXCI+XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICBgLFxyXG4gICAgICAgIGRhdGEoKSB7XHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBzZWFyY2hUZXh0OiBcIlwiLFxyXG4gICAgICAgICAgICBzZWFyY2hDYXRlZ29yeVRleHQ6IFwiYWxsXCJcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIG1ldGhvZHM6IHtcclxuICAgICAgICAgIGkxOG5Gb3JtYXQ6IGkxOG4uZm9ybWF0XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICApO1xyXG4gIH1cclxufSIsICJleHBvcnQgZGVmYXVsdCB7XHJcbiAgLyoqIEBwYXJhbSB7aW1wb3J0KFwidnVlXCIpLkFwcH0gdnVlQXBwICovXHJcbiAgbG9hZCh2dWVBcHApIHtcclxuICAgIHZ1ZUFwcC5jb21wb25lbnQoXHJcbiAgICAgIFwic2V0dGluZ3MtcGFnZVwiLFxyXG4gICAgICB7XHJcbiAgICAgICAgdGVtcGxhdGU6IFwiPGRpdj5TZXR0aW5ncyBQYWdlPC9kaXY+XCIsXHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgfVxyXG59IiwgImV4cG9ydCBkZWZhdWx0IHtcclxuICAvKiogQHBhcmFtIHtpbXBvcnQoXCJ2dWVcIikuQXBwfSB2dWVBcHAgKi9cclxuICBsb2FkKHZ1ZUFwcCkge1xyXG4gICAgdnVlQXBwLmNvbXBvbmVudChcclxuICAgICAgXCJzdG9yZS1wYWdlXCIsXHJcbiAgICAgIHtcclxuICAgICAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxkaXY+XHJcbiAgICAgICAgICA8c3RvcmUtZXh0ZW5zaW9uLWNhcmQgdi1mb3I9XCJleHRlbnNpb24gaW4gZXh0ZW5zaW9uc1wiIDpleHRlbnNpb249XCJleHRlbnNpb25cIiA6a2V5PVwiZXh0ZW5zaW9uLm5hbWUuZGVmYXVsdFwiIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgYCxcclxuICAgICAgICBkYXRhKCkge1xyXG4gICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZXh0ZW5zaW9uczogW1xyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwicGx1Z2luXCIsXHJcbiAgICAgICAgICAgICAgICB1cmw6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiB7XHJcbiAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IFwiVGVzdCBQbHVnaW5cIixcclxuICAgICAgICAgICAgICAgICAgdHI6IFwiRGVuZW1lIFBsdWdpblwiLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IFwiVGVzdCBQbHVnaW4gZGVzY3JpcHRpb24uLlwiLFxyXG4gICAgICAgICAgICAgICAgICB0cjogXCJEZW5lbWUgUGx1Z2luIGFcdTAwRTdcdTAxMzFrbGFtYXNcdTAxMzEuLlwiLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHByZXZpZXdzOiBbXHJcbiAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIlRlc3QgUGx1Z2luIFByZXZpZXdcIixcclxuICAgICAgICAgICAgICAgICAgICBpbWFnZTogXCJodHRwczovL2kuaW1ndXIuY29tL1R0ZmpIZVAucG5nXCIsXHJcbiAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIlRlc3QgUGx1Z2luIFByZXZpZXcgMlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGltYWdlOiBcImh0dHBzOi8vaS5pbWd1ci5jb20vMFowWjBaMC5wbmdcIixcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIGF1dGhvcnM6IFtcclxuICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIjcwNzMwOTY5MzQ0OTUzNTU5OVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiQXJtYWdhbiMyNDQ4XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2U6IFwiaHR0cHM6Ly9pLmltZ3VyLmNvbS9yU0xWZDIzLnBuZ1wiXHJcbiAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogXCI3MDczMDk2OTM0NDk1MzU1OTlcIixcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIkFybWFnYW4jMjQ0OFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGltYWdlOiBcImh0dHBzOi8vaS5pbWd1ci5jb20vclNMVmQyMy5wbmdcIlxyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgdmVyc2lvbjogXCIxLjAuMFwiLFxyXG4gICAgICAgICAgICAgICAgcmVhZG1lOiBcIiMjIyBUZXN0IFBsdWdpbiByZWFkbWUuLlwiLFxyXG4gICAgICAgICAgICAgICAgaW5zdGFsbGVkOiB0cnVlXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgKTtcclxuICB9XHJcbn0iLCAiaW1wb3J0IGhvbWVQYWdlIGZyb20gXCIuL2hvbWUtcGFnZS9pbmRleC5qc1wiXHJcbmltcG9ydCBpbnN0YWxsZWRFeHRlbnNpb25zUGFnZSBmcm9tIFwiLi9pbnN0YWxsZWQtZXh0ZW5zaW9ucy1wYWdlL2luZGV4LmpzXCI7XHJcbmltcG9ydCBzZXR0aW5nc1BhZ2UgZnJvbSBcIi4vc2V0dGluZ3MtcGFnZS9pbmRleC5qc1wiO1xyXG5pbXBvcnQgc3RvcmVQYWdlIGZyb20gXCIuL3N0b3JlLXBhZ2UvaW5kZXguanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAvKiogQHBhcmFtIHtpbXBvcnQoXCJ2dWVcIikuQXBwfSB2dWVBcHAgKi9cclxuICBsb2FkKHZ1ZUFwcCkge1xyXG4gICAgaG9tZVBhZ2UubG9hZCh2dWVBcHApO1xyXG4gICAgaW5zdGFsbGVkRXh0ZW5zaW9uc1BhZ2UubG9hZCh2dWVBcHApO1xyXG4gICAgc2V0dGluZ3NQYWdlLmxvYWQodnVlQXBwKTtcclxuICAgIHN0b3JlUGFnZS5sb2FkKHZ1ZUFwcCk7XHJcbiAgfVxyXG59IiwgImltcG9ydCBldmVudHMgZnJvbSBcIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2FwaS9ldmVudHMvaW5kZXguanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAvKiogQHBhcmFtIHtpbXBvcnQoXCJ2dWVcIikuQXBwfSB2dWVBcHAgKi9cclxuICBsb2FkKHZ1ZUFwcCkge1xyXG4gICAgdnVlQXBwLmNvbXBvbmVudChcImNvbmZpZy1idXR0b25cIiwge1xyXG4gICAgICBwcm9wczogW1wiaXRlbVwiLCBcImV4dGVuc2lvblwiXSxcclxuICAgICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8ZGl2IHYtc2hvdz1cIml0ZW0/LnZpc2libGUgPz8gdHJ1ZVwiIGNsYXNzPVwiYWNvcmQtLWNvbmZpZy1idXR0b24gYWNvcmQtLWNvbmZpZy1pdGVtXCI+XHJcbiAgICAgICAgICA8ZGlzY29yZC1idXR0b24gQGNsaWNrPVwib25DbGlja1wiIDp2YWx1ZT1cIml0ZW0udmFsdWVcIiA6c2l6ZT1cIml0ZW0uc2l6ZVwiIDpjb2xvcj1cIml0ZW0uY29sb3JcIiAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICBgLFxyXG4gICAgICBtZXRob2RzOiB7XHJcbiAgICAgICAgb25DbGljayhldmVudCkge1xyXG4gICAgICAgICAgZXZlbnRzLmVtaXQoXHJcbiAgICAgICAgICAgIFwiZXh0ZW5zaW9uLWNvbmZpZy1pbnRlcmFjdGlvblwiLFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgZXh0ZW5zaW9uOiB0aGlzLmV4dGVuc2lvbixcclxuICAgICAgICAgICAgICBpdGVtOiB0aGlzLml0ZW0sXHJcbiAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgZXZlbnRcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIClcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufSIsICJpbXBvcnQgZXZlbnRzIGZyb20gXCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9hcGkvZXZlbnRzL2luZGV4LmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgLyoqIEBwYXJhbSB7aW1wb3J0KFwidnVlXCIpLkFwcH0gdnVlQXBwICovXHJcbiAgbG9hZCh2dWVBcHApIHtcclxuICAgIHZ1ZUFwcC5jb21wb25lbnQoXCJjb25maWctY2hlY2tcIiwge1xyXG4gICAgICBwcm9wczogW1wiaXRlbVwiLCBcImV4dGVuc2lvblwiXSxcclxuICAgICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8ZGl2IHYtc2hvdz1cIml0ZW0/LnZpc2libGUgPz8gdHJ1ZVwiIGNsYXNzPVwiYWNvcmQtLWNvbmZpZy1jaGVjayBhY29yZC0tY29uZmlnLWl0ZW1cIj5cclxuICAgICAgICAgIDxkaXNjb3JkLWNoZWNrIEBjaGFuZ2U9XCJvbkNoYW5nZVwiIHYtbW9kZWw9XCJpdGVtLnZhbHVlXCIgLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgYCxcclxuICAgICAgbWV0aG9kczoge1xyXG4gICAgICAgIG9uQ2hhbmdlKGRhdGEpIHtcclxuICAgICAgICAgIGV2ZW50cy5lbWl0KFxyXG4gICAgICAgICAgICBcImV4dGVuc2lvbi1jb25maWctaW50ZXJhY3Rpb25cIixcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIGV4dGVuc2lvbjogdGhpcy5leHRlbnNpb24sXHJcbiAgICAgICAgICAgICAgaXRlbTogdGhpcy5pdGVtLFxyXG4gICAgICAgICAgICAgIGRhdGFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59IiwgIntcclxuICBcIm5hbWVcIjoge1xyXG4gICAgXCJDb2x1bW5cIjogXCJjb25maWctY29sdW1uXCIsXHJcbiAgICBcIlJvd1wiOiBcImNvbmZpZy1yb3dcIixcclxuICAgIFwiQnV0dG9uXCI6IFwiY29uZmlnLWJ1dHRvblwiLFxyXG4gICAgXCJDaGVja1wiOiBcImNvbmZpZy1jaGVja1wiLFxyXG4gICAgXCJJbnB1dFwiOiBcImNvbmZpZy1pbnB1dFwiLFxyXG4gICAgXCJTZWxlY3RcIjogXCJjb25maWctc2VsZWN0XCIsXHJcbiAgICBcIlRleHRhcmVhXCI6IFwiY29uZmlnLXRleHRhcmVhXCIsXHJcbiAgICBcIlNwYWNlclwiOiBcImNvbmZpZy1zcGFjZXJcIixcclxuICAgIFwiUGFyYWdyYXBoXCI6IFwiY29uZmlnLXBhcmFncmFwaFwiLFxyXG4gICAgXCJIZWFkaW5nXCI6IFwiY29uZmlnLWhlYWRpbmdcIlxyXG4gIH1cclxufSIsICJpbXBvcnQgeyBuYW1lIGFzIG5hbWVNYXAgfSBmcm9tIFwiLi4vbWFwcy5qc29uXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgLyoqIEBwYXJhbSB7aW1wb3J0KFwidnVlXCIpLkFwcH0gdnVlQXBwICovXHJcbiAgbG9hZCh2dWVBcHApIHtcclxuICAgIHZ1ZUFwcC5jb21wb25lbnQoXHJcbiAgICAgIFwiY29uZmlnLWNvbHVtblwiLFxyXG4gICAgICB7XHJcbiAgICAgICAgcHJvcHM6IFtcIml0ZW1cIiwgXCJleHRlbnNpb25cIl0sXHJcbiAgICAgICAgdGVtcGxhdGU6IGBcclxuICAgICAgICAgIDxkaXYgdi1zaG93PVwiaXRlbT8udmlzaWJsZSA/PyB0cnVlXCIgY2xhc3M9XCJhY29yZC0tY29uZmlnLWNvbHVtbiBhY29yZC0tY29uZmlnLWl0ZW1cIiA6Y2xhc3M9XCJ7XHJcbiAgICAgICAgICAgICdob3Jpem9udGFsLWFsaWduLWxlZnQnOiBpdGVtPy5ob3Jpem9udGFsQWxpZ24gPT09ICdsZWZ0JyxcclxuICAgICAgICAgICAgJ2hvcml6b250YWwtYWxpZ24tY2VudGVyJzogaXRlbT8uaG9yaXpvbnRhbEFsaWduID09PSAnY2VudGVyJyxcclxuICAgICAgICAgICAgJ2hvcml6b250YWwtYWxpZ24tcmlnaHQnOiBpdGVtPy5ob3Jpem9udGFsQWxpZ24gPT09ICdyaWdodCcsXHJcbiAgICAgICAgICAgICdqdXN0aWZ5LXNwYWNlLWJldHdlZW4nOiBpdGVtPy5qdXN0aWZ5ID09PSAnc3BhY2UtYmV0d2VlbicsXHJcbiAgICAgICAgICAgICdqdXN0aWZ5LXNwYWNlLWFyb3VuZCc6IGl0ZW0/Lmp1c3RpZnkgPT09ICdzcGFjZS1hcm91bmQnLFxyXG4gICAgICAgICAgICAndmVydGljYWwtYWxpZ24tdG9wJzogaXRlbT8udmVydGljYWxBbGlnbiA9PT0gJ3RvcCcsXHJcbiAgICAgICAgICAgICd2ZXJ0aWNhbC1hbGlnbi1jZW50ZXInOiBpdGVtPy52ZXJ0aWNhbEFsaWduID09PSAnY2VudGVyJyxcclxuICAgICAgICAgICAgJ3ZlcnRpY2FsLWFsaWduLWJvdHRvbSc6IGl0ZW0/LnZlcnRpY2FsQWxpZ24gPT09ICdib3R0b20nXHJcbiAgICAgICAgICB9XCIgOnN0eWxlPVwieyd3aWR0aCc6IGl0ZW0/LndpZHRoID8/ICcxMDAlJywgJ2hlaWdodCc6IGl0ZW0/LmhlaWdodH1cIiA+XHJcbiAgICAgICAgICAgIDxjb21wb25lbnQgdi1mb3I9XCJjaGlsZCBpbiBpdGVtLmNoaWxkcmVuXCIgOmlzPVwibmFtZU1hcFtjaGlsZC50eXBlXVwiIDprZXk9XCJjaGlsZC5pZFwiIDppdGVtPVwiY2hpbGRcIiA6ZXh0ZW5zaW9uPVwiZXh0ZW5zaW9uXCIgLz5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIGAsXHJcbiAgICAgICAgZGF0YSgpIHtcclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG5hbWVNYXBcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgfVxyXG59IiwgImV4cG9ydCBkZWZhdWx0IHtcclxuICAvKiogQHBhcmFtIHtpbXBvcnQoXCJ2dWVcIikuQXBwfSB2dWVBcHAgKi9cclxuICBsb2FkKHZ1ZUFwcCkge1xyXG4gICAgdnVlQXBwLmNvbXBvbmVudChcImNvbmZpZy1oZWFkaW5nXCIsIHtcclxuICAgICAgcHJvcHM6IFtcIml0ZW1cIiwgXCJleHRlbnNpb25cIl0sXHJcbiAgICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiB2LXNob3c9XCJpdGVtPy52aXNpYmxlID8/IHRydWVcIiBjbGFzcz1cImFjb3JkLS1jb25maWctaGVhZGluZyBhY29yZC0tY29uZmlnLWl0ZW1cIj5cclxuICAgICAgICAgIDxoMSBjbGFzcz1cImhlYWRpbmdcIj57e2l0ZW0udmFsdWV9fTwvaDE+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIGAsXHJcbiAgICB9KTtcclxuICB9XHJcbn0iLCAiaW1wb3J0IGV2ZW50cyBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vYXBpL2V2ZW50cy9pbmRleC5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIC8qKiBAcGFyYW0ge2ltcG9ydChcInZ1ZVwiKS5BcHB9IHZ1ZUFwcCAqL1xyXG4gIGxvYWQodnVlQXBwKSB7XHJcbiAgICB2dWVBcHAuY29tcG9uZW50KFwiY29uZmlnLWlucHV0XCIsIHtcclxuICAgICAgcHJvcHM6IFtcIml0ZW1cIiwgXCJleHRlbnNpb25cIl0sXHJcbiAgICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiB2LXNob3c9XCJpdGVtPy52aXNpYmxlID8/IHRydWVcIiBjbGFzcz1cImFjb3JkLS1jb25maWctaW5wdXQgYWNvcmQtLWNvbmZpZy1pdGVtXCI+XHJcbiAgICAgICAgICA8ZGlzY29yZC1pbnB1dCBAY2hhbmdlPVwib25DaGFuZ2VcIiB2LW1vZGVsPVwiaXRlbS52YWx1ZVwiIDp0eXBlPVwiaXRlbS5pbnB1dFR5cGVcIiA6cGxhY2Vob2xkZXI9XCJpdGVtLnBsYWNlaG9sZGVyXCIgOm1heGxlbmd0aD1cIml0ZW0ubWF4bGVuZ3RoXCIgLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgYCxcclxuICAgICAgbWV0aG9kczoge1xyXG4gICAgICAgIG9uQ2hhbmdlKGRhdGEpIHtcclxuICAgICAgICAgIGV2ZW50cy5lbWl0KFxyXG4gICAgICAgICAgICBcImV4dGVuc2lvbi1jb25maWctaW50ZXJhY3Rpb25cIixcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIGV4dGVuc2lvbjogdGhpcy5leHRlbnNpb24sXHJcbiAgICAgICAgICAgICAgaXRlbTogdGhpcy5pdGVtLFxyXG4gICAgICAgICAgICAgIGRhdGFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59IiwgImV4cG9ydCBkZWZhdWx0IHtcclxuICAvKiogQHBhcmFtIHtpbXBvcnQoXCJ2dWVcIikuQXBwfSB2dWVBcHAgKi9cclxuICBsb2FkKHZ1ZUFwcCkge1xyXG4gICAgdnVlQXBwLmNvbXBvbmVudChcImNvbmZpZy1wYXJhZ3JhcGhcIiwge1xyXG4gICAgICBwcm9wczogW1wiaXRlbVwiLCBcImV4dGVuc2lvblwiXSxcclxuICAgICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8ZGl2IHYtc2hvdz1cIml0ZW0/LnZpc2libGUgPz8gdHJ1ZVwiIGNsYXNzPVwiYWNvcmQtLWNvbmZpZy1wYXJhZ3JhcGggYWNvcmQtLWNvbmZpZy1pdGVtXCI+XHJcbiAgICAgICAgICA8cCBjbGFzcz1cInBhcmFncmFwaFwiPnt7aXRlbS52YWx1ZX19PC9wPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICBgLFxyXG4gICAgfSk7XHJcbiAgfVxyXG59IiwgImltcG9ydCB7IG5hbWUgYXMgbmFtZU1hcCB9IGZyb20gXCIuLi9tYXBzLmpzb25cIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAvKiogQHBhcmFtIHtpbXBvcnQoXCJ2dWVcIikuQXBwfSB2dWVBcHAgKi9cclxuICBsb2FkKHZ1ZUFwcCkge1xyXG4gICAgdnVlQXBwLmNvbXBvbmVudChcclxuICAgICAgXCJjb25maWctcm93XCIsXHJcbiAgICAgIHtcclxuICAgICAgICBwcm9wczogW1wiaXRlbVwiLCBcImV4dGVuc2lvblwiXSxcclxuICAgICAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgICAgPGRpdiB2LXNob3c9XCJpdGVtPy52aXNpYmxlID8/IHRydWVcIiBjbGFzcz1cImFjb3JkLS1jb25maWctcm93IGFjb3JkLS1jb25maWctaXRlbVwiIDpjbGFzcz1cIntcclxuICAgICAgICAgICAgJ2hvcml6b250YWwtYWxpZ24tbGVmdCc6IGl0ZW0/Lmhvcml6b250YWxBbGlnbiA9PT0gJ2xlZnQnLFxyXG4gICAgICAgICAgICAnaG9yaXpvbnRhbC1hbGlnbi1jZW50ZXInOiBpdGVtPy5ob3Jpem9udGFsQWxpZ24gPT09ICdjZW50ZXInLFxyXG4gICAgICAgICAgICAnaG9yaXpvbnRhbC1hbGlnbi1yaWdodCc6IGl0ZW0/Lmhvcml6b250YWxBbGlnbiA9PT0gJ3JpZ2h0JyxcclxuICAgICAgICAgICAgJ2p1c3RpZnktc3BhY2UtYmV0d2Vlbic6IGl0ZW0/Lmp1c3RpZnkgPT09ICdzcGFjZS1iZXR3ZWVuJyxcclxuICAgICAgICAgICAgJ2p1c3RpZnktc3BhY2UtYXJvdW5kJzogaXRlbT8uanVzdGlmeSA9PT0gJ3NwYWNlLWFyb3VuZCcsXHJcbiAgICAgICAgICAgICd2ZXJ0aWNhbC1hbGlnbi10b3AnOiBpdGVtPy52ZXJ0aWNhbEFsaWduID09PSAndG9wJyxcclxuICAgICAgICAgICAgJ3ZlcnRpY2FsLWFsaWduLWNlbnRlcic6IGl0ZW0/LnZlcnRpY2FsQWxpZ24gPT09ICdjZW50ZXInLFxyXG4gICAgICAgICAgICAndmVydGljYWwtYWxpZ24tYm90dG9tJzogaXRlbT8udmVydGljYWxBbGlnbiA9PT0gJ2JvdHRvbSdcclxuICAgICAgICAgIH1cIiA6c3R5bGU9XCJ7J3dpZHRoJzogaXRlbT8ud2lkdGggPz8gJzEwMCUnLCAnaGVpZ2h0JzogaXRlbT8uaGVpZ2h0fVwiID5cclxuICAgICAgICAgICAgPGNvbXBvbmVudCB2LWZvcj1cImNoaWxkIGluIGl0ZW0uY2hpbGRyZW5cIiA6aXM9XCJuYW1lTWFwW2NoaWxkLnR5cGVdXCIgOmtleT1cImNoaWxkLmlkXCIgOml0ZW09XCJjaGlsZFwiIDpleHRlbnNpb249XCJleHRlbnNpb25cIiAvPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgYCxcclxuICAgICAgICBkYXRhKCkge1xyXG4gICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbmFtZU1hcFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgKTtcclxuICB9XHJcbn0iLCAiaW1wb3J0IGV2ZW50cyBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vYXBpL2V2ZW50cy9pbmRleC5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIC8qKiBAcGFyYW0ge2ltcG9ydChcInZ1ZVwiKS5BcHB9IHZ1ZUFwcCAqL1xyXG4gIGxvYWQodnVlQXBwKSB7XHJcbiAgICB2dWVBcHAuY29tcG9uZW50KFwiY29uZmlnLXNlbGVjdFwiLCB7XHJcbiAgICAgIHByb3BzOiBbXCJpdGVtXCIsIFwiZXh0ZW5zaW9uXCJdLFxyXG4gICAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxkaXYgdi1zaG93PVwiaXRlbT8udmlzaWJsZSA/PyB0cnVlXCIgY2xhc3M9XCJhY29yZC0tY29uZmlnLXNlbGVjdCBhY29yZC0tY29uZmlnLWl0ZW1cIj5cclxuICAgICAgICAgIDxkaXNjb3JkLXNlbGVjdCBAY2hhbmdlPVwib25DaGFuZ2VcIiB2LW1vZGVsPVwiaXRlbS52YWx1ZVwiIDpvcHRpb25zPVwiaXRlbS5vcHRpb25zXCIgLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgYCxcclxuICAgICAgbWV0aG9kczoge1xyXG4gICAgICAgIG9uQ2hhbmdlKGRhdGEpIHtcclxuICAgICAgICAgIGV2ZW50cy5lbWl0KFxyXG4gICAgICAgICAgICBcImV4dGVuc2lvbi1jb25maWctaW50ZXJhY3Rpb25cIixcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIGV4dGVuc2lvbjogdGhpcy5leHRlbnNpb24sXHJcbiAgICAgICAgICAgICAgaXRlbTogdGhpcy5pdGVtLFxyXG4gICAgICAgICAgICAgIGRhdGFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59IiwgImV4cG9ydCBkZWZhdWx0IHtcclxuICAvKiogQHBhcmFtIHtpbXBvcnQoXCJ2dWVcIikuQXBwfSB2dWVBcHAgKi9cclxuICBsb2FkKHZ1ZUFwcCkge1xyXG4gICAgdnVlQXBwLmNvbXBvbmVudChcImNvbmZpZy1zcGFjZXJcIiwge1xyXG4gICAgICBwcm9wczogW1wiaXRlbVwiLCBcImV4dGVuc2lvblwiXSxcclxuICAgICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8ZGl2IHYtc2hvdz1cIml0ZW0/LnZpc2libGUgPz8gdHJ1ZVwiIGNsYXNzPVwiYWNvcmQtLWNvbmZpZy1zcGFjZXIgYWNvcmQtLWNvbmZpZy1pdGVtXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwic3BhY2VyXCIgOnN0eWxlPVwieydoZWlnaHQnOiBpdGVtPy5oZWlnaHQsICd3aWR0aCc6IGl0ZW0/LndpZHRofVwiIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIGAsXHJcbiAgICB9KTtcclxuICB9XHJcbn0iLCAiaW1wb3J0IGV2ZW50cyBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vYXBpL2V2ZW50cy9pbmRleC5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIC8qKiBAcGFyYW0ge2ltcG9ydChcInZ1ZVwiKS5BcHB9IHZ1ZUFwcCAqL1xyXG4gIGxvYWQodnVlQXBwKSB7XHJcbiAgICB2dWVBcHAuY29tcG9uZW50KFwiY29uZmlnLXRleHRhcmVhXCIsIHtcclxuICAgICAgcHJvcHM6IFtcIml0ZW1cIiwgXCJleHRlbnNpb25cIl0sXHJcbiAgICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiB2LXNob3c9XCJpdGVtPy52aXNpYmxlID8/IHRydWVcIiBjbGFzcz1cImFjb3JkLS1jb25maWctdGV4dGFyZWEgYWNvcmQtLWNvbmZpZy1pdGVtXCI+XHJcbiAgICAgICAgICA8ZGlzY29yZC10ZXh0YXJlYSBAY2hhbmdlPVwib25DaGFuZ2VcIiB2LW1vZGVsPVwiaXRlbS52YWx1ZVwiIDp0eXBlPVwiaXRlbS5pbnB1dFR5cGVcIiA6cGxhY2Vob2xkZXI9XCJpdGVtLnBsYWNlaG9sZGVyXCIgOm1heGxlbmd0aD1cIml0ZW0ubWF4bGVuZ3RoXCIgOmNvbHM9XCJpdGVtLmNvbHVtbnNcIiA6cm93cz1cIml0ZW0ucm93c1wiIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIGAsXHJcbiAgICAgIG1ldGhvZHM6IHtcclxuICAgICAgICBvbkNoYW5nZShkYXRhKSB7XHJcbiAgICAgICAgICBldmVudHMuZW1pdChcclxuICAgICAgICAgICAgXCJleHRlbnNpb24tY29uZmlnLWludGVyYWN0aW9uXCIsXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBleHRlbnNpb246IHRoaXMuZXh0ZW5zaW9uLFxyXG4gICAgICAgICAgICAgIGl0ZW06IHRoaXMuaXRlbSxcclxuICAgICAgICAgICAgICBkYXRhXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIClcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufSIsICJleHBvcnQgZGVmYXVsdCBgXG4uYWNvcmQtLWNvbmZpZy1pdGVte3dpZHRoOjEwMCU7ZGlzcGxheTpmbGV4fS5hY29yZC0tY29uZmlnLXJvd3t3aWR0aDoxMDAlO2Rpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpyb3c7anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47YWxpZ24taXRlbXM6Y2VudGVyfS5hY29yZC0tY29uZmlnLXJvdy5ob3Jpem9udGFsLWFsaWduLWxlZnR7anVzdGlmeS1jb250ZW50OmZsZXgtc3RhcnR9LmFjb3JkLS1jb25maWctcm93Lmhvcml6b250YWwtYWxpZ24tcmlnaHR7anVzdGlmeS1jb250ZW50OmZsZXgtZW5kfS5hY29yZC0tY29uZmlnLXJvdy5ob3Jpem9udGFsLWFsaWduLWNlbnRlcntqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyfS5hY29yZC0tY29uZmlnLXJvdy5qdXN0aWZ5LXNwYWNlLWJldHdlZW57anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW59LmFjb3JkLS1jb25maWctcm93Lmp1c3RpZnktc3BhY2UtYXJvdW5ke2p1c3RpZnktY29udGVudDpzcGFjZS1hcm91bmR9LmFjb3JkLS1jb25maWctcm93LnZlcnRpY2FsLWFsaWduLXRvcHthbGlnbi1pdGVtczpmbGV4LXN0YXJ0fS5hY29yZC0tY29uZmlnLXJvdy52ZXJ0aWNhbC1hbGlnbi1ib3R0b217YWxpZ24taXRlbXM6ZmxleC1lbmR9LmFjb3JkLS1jb25maWctY29sdW1ue3dpZHRoOjEwMCU7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOmNvbHVtbjtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1zdGFydDthbGlnbi1pdGVtczpjZW50ZXJ9LmFjb3JkLS1jb25maWctY29sdW1uLmhvcml6b250YWwtYWxpZ24tbGVmdHtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1zdGFydH0uYWNvcmQtLWNvbmZpZy1jb2x1bW4uaG9yaXpvbnRhbC1hbGlnbi1yaWdodHtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1lbmR9LmFjb3JkLS1jb25maWctY29sdW1uLmhvcml6b250YWwtYWxpZ24tY2VudGVye2p1c3RpZnktY29udGVudDpjZW50ZXJ9LmFjb3JkLS1jb25maWctY29sdW1uLmp1c3RpZnktc3BhY2UtYmV0d2VlbntqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2Vlbn0uYWNvcmQtLWNvbmZpZy1jb2x1bW4uanVzdGlmeS1zcGFjZS1hcm91bmR7anVzdGlmeS1jb250ZW50OnNwYWNlLWFyb3VuZH0uYWNvcmQtLWNvbmZpZy1jb2x1bW4udmVydGljYWwtYWxpZ24tdG9we2FsaWduLWl0ZW1zOmZsZXgtc3RhcnR9LmFjb3JkLS1jb25maWctY29sdW1uLnZlcnRpY2FsLWFsaWduLWJvdHRvbXthbGlnbi1pdGVtczpmbGV4LWVuZH0uYWNvcmQtLWNvbmZpZy1jb2x1bW4udmVydGljYWwtYWxpZ24tY2VudGVye2FsaWduLWl0ZW1zOmNlbnRlcn0uYWNvcmQtLWNvbmZpZy1oZWFkaW5ne2ZvbnQtc2l6ZToxLjJyZW07Zm9udC13ZWlnaHQ6NTAwO21hcmdpbi1ib3R0b206LjVyZW07Y29sb3I6I2Y1ZjVmNX0uYWNvcmQtLWNvbmZpZy1wYXJhZ3JhcGh7Zm9udC1zaXplOjFyZW07Zm9udC13ZWlnaHQ6NDAwO21hcmdpbi1ib3R0b206LjVyZW07Y29sb3I6cmdiYSgyNDUsMjQ1LDI0NSwuODUpfWA7XG4iLCAiaW1wb3J0IHBhdGNoZXIgZnJvbSBcIi4uLy4uLy4uLy4uLy4uLy4uL2FwaS9wYXRjaGVyL2luZGV4LmpzXCI7XHJcbmltcG9ydCBjb25maWdCdXR0b24gZnJvbSBcIi4vY29uZmlnLWJ1dHRvbi9pbmRleC5qc1wiO1xyXG5pbXBvcnQgY29uZmlnQ2hlY2sgZnJvbSBcIi4vY29uZmlnLWNoZWNrL2luZGV4LmpzXCI7XHJcbmltcG9ydCBjb25maWdDb2x1bW4gZnJvbSBcIi4vY29uZmlnLWNvbHVtbi9pbmRleC5qc1wiXHJcbmltcG9ydCBjb25maWdIZWFkaW5nIGZyb20gXCIuL2NvbmZpZy1oZWFkaW5nL2luZGV4LmpzXCI7XHJcbmltcG9ydCBjb25maWdJbnB1dCBmcm9tIFwiLi9jb25maWctaW5wdXQvaW5kZXguanNcIjtcclxuaW1wb3J0IGNvbmZpZ1BhcmFncmFwaCBmcm9tIFwiLi9jb25maWctcGFyYWdyYXBoL2luZGV4LmpzXCI7XHJcbmltcG9ydCBjb25maWdSb3cgZnJvbSBcIi4vY29uZmlnLXJvdy9pbmRleC5qc1wiO1xyXG5pbXBvcnQgY29uZmlnU2VsZWN0IGZyb20gXCIuL2NvbmZpZy1zZWxlY3QvaW5kZXguanNcIjtcclxuaW1wb3J0IGNvbmZpZ1NwYWNlciBmcm9tIFwiLi9jb25maWctc3BhY2VyL2luZGV4LmpzXCI7XHJcbmltcG9ydCBjb25maWdUZXh0YXJlYSBmcm9tIFwiLi9jb25maWctdGV4dGFyZWEvaW5kZXguanNcIjtcclxuXHJcbmltcG9ydCBjc3NUZXh0IGZyb20gXCIuL3N0eWxlLnNjc3NcIjtcclxucGF0Y2hlci5pbmplY3RDU1MoY3NzVGV4dCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgLyoqIEBwYXJhbSB7aW1wb3J0KFwidnVlXCIpLkFwcH0gdnVlQXBwICovXHJcbiAgbG9hZCh2dWVBcHApIHtcclxuICAgIGNvbmZpZ1BhcmFncmFwaC5sb2FkKHZ1ZUFwcCk7XHJcbiAgICBjb25maWdIZWFkaW5nLmxvYWQodnVlQXBwKTtcclxuICAgIGNvbmZpZ1NwYWNlci5sb2FkKHZ1ZUFwcCk7XHJcbiAgICBjb25maWdCdXR0b24ubG9hZCh2dWVBcHApO1xyXG4gICAgY29uZmlnQ2hlY2subG9hZCh2dWVBcHApO1xyXG4gICAgY29uZmlnSW5wdXQubG9hZCh2dWVBcHApO1xyXG4gICAgY29uZmlnU2VsZWN0LmxvYWQodnVlQXBwKTtcclxuICAgIGNvbmZpZ1RleHRhcmVhLmxvYWQodnVlQXBwKTtcclxuICAgIGNvbmZpZ0NvbHVtbi5sb2FkKHZ1ZUFwcCk7XHJcbiAgICBjb25maWdSb3cubG9hZCh2dWVBcHApO1xyXG4gIH1cclxufSIsICJleHBvcnQgZGVmYXVsdCBgXG4uYWNvcmQtLWluc3RhbGxlZC1leHRlbnNpb24tY2FyZHt3aWR0aDoxMDAlO2JhY2tncm91bmQtY29sb3I6cmdiYSgwLDAsMCwuMSk7Ym9yZGVyLXJhZGl1czo4cHg7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOmNvbHVtbjtnYXA6MTZweH0uYWNvcmQtLWluc3RhbGxlZC1leHRlbnNpb24tY2FyZD4udG9we2JhY2tncm91bmQtY29sb3I6cmdiYSgwLDAsMCwuMSk7Ym9yZGVyLXJhZGl1czo4cHg7d2lkdGg6MTAwJTtwYWRkaW5nOjhweDtoZWlnaHQ6MTAwcHh9YDtcbiIsICJpbXBvcnQgaTE4biBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vYXBpL2kxOG4vaW5kZXguanNcIjtcclxuaW1wb3J0IHBhdGNoZXIgZnJvbSBcIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2FwaS9wYXRjaGVyL2luZGV4LmpzXCI7XHJcbmltcG9ydCBleHRlbnNpb25zIGZyb20gXCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9hcGkvZXh0ZW5zaW9ucy9pbmRleC5qc1wiO1xyXG5cclxuaW1wb3J0IGNzc1RleHQgZnJvbSBcIi4vc3R5bGUuc2Nzc1wiO1xyXG5pbXBvcnQgeyByZWNvbXB1dGFibGUsIHJlY29tcHV0ZSB9IGZyb20gXCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9hcGkvdWkvdnVlL3V0aWxzL3JlY29tcHV0ZS5qc1wiO1xyXG5wYXRjaGVyLmluamVjdENTUyhjc3NUZXh0KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAvKiogQHBhcmFtIHtpbXBvcnQoXCJ2dWVcIikuQXBwfSB2dWVBcHAgKi9cclxuICBsb2FkKHZ1ZUFwcCkge1xyXG4gICAgdnVlQXBwLmNvbXBvbmVudChcclxuICAgICAgXCJpbnN0YWxsZWQtZXh0ZW5zaW9uLWNhcmRcIixcclxuICAgICAge1xyXG4gICAgICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWNvcmQtLWluc3RhbGxlZC1leHRlbnNpb24tY2FyZFwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidG9wXCI+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxlZnRcIj5cclxuXHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJpZ2h0XCI+XHJcblxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJvdHRvbVwiPlxyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIGAsXHJcbiAgICAgICAgZGF0YSgpIHtcclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGV4cGFuZGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgdXJsOiBudWxsLFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbXB1dGVkOiB7XHJcbiAgICAgICAgICBleHRlbnNpb246IHJlY29tcHV0YWJsZShcclxuICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgIHJldHVybiBleHRlbnNpb25zLmdldCh0aGlzLnVybCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiZXh0ZW5zaW9uXCJcclxuICAgICAgICAgIClcclxuICAgICAgICB9LFxyXG4gICAgICAgIG1vdW50ZWQoKSB7XHJcbiAgICAgICAgICByZWNvbXB1dGUodGhpcywgXCJleHRlbnNpb25cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICApO1xyXG4gIH1cclxufSIsICJleHBvcnQgZGVmYXVsdCBgXG4uYWNvcmQtLXN0b3JlLWV4dGVuc2lvbi1jYXJke3dpZHRoOjI3NXB4O2hlaWdodDoyNTBweDtkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1uO2JvcmRlci1yYWRpdXM6NHB4O2NvbnRhaW46Y29udGVudDtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMCwwLDAsLjEpO2JveC1zaGFkb3c6dmFyKC0tZWxldmF0aW9uLW1lZGl1bSl9LmFjb3JkLS1zdG9yZS1leHRlbnNpb24tY2FyZD4ucHJldmlld3t3aWR0aDoxMDAlO2hlaWdodDoxMDBweDtkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1uO2p1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVuO2FsaWduLWl0ZW1zOmNlbnRlcjtiYWNrZ3JvdW5kLWNvbG9yOnZhcigtLWJyYW5kLTUwMCk7YmFja2dyb3VuZC1wb3NpdGlvbjpjZW50ZXI7YmFja2dyb3VuZC1zaXplOmNvdmVyfS5hY29yZC0tc3RvcmUtZXh0ZW5zaW9uLWNhcmQ+LnByZXZpZXc+LmNvbnRyb2xze3BhZGRpbmc6OHB4O2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47d2lkdGg6MTAwJX0uYWNvcmQtLXN0b3JlLWV4dGVuc2lvbi1jYXJkPi5wcmV2aWV3Pi5jb250cm9scyAuZ297YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDAsMCwwLC41KTtib3gtc2hhZG93OjBweCAwcHggNHB4IHJnYmEoMCwwLDAsLjUpO2JvcmRlci1yYWRpdXM6NTAlO3dpZHRoOjI0cHg7aGVpZ2h0OjI0cHg7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO2NvbG9yOnZhcigtLWhlYWRlci1wcmltYXJ5KTtmb250LXdlaWdodDo2MDA7Y3Vyc29yOnBvaW50ZXJ9LmFjb3JkLS1zdG9yZS1leHRlbnNpb24tY2FyZD4ucHJldmlldz4ubmFtZS1jb250YWluZXJ7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO2NvbG9yOnZhcigtLWhlYWRlci1wcmltYXJ5KTtwYWRkaW5nOjhweH0uYWNvcmQtLXN0b3JlLWV4dGVuc2lvbi1jYXJkPi5wcmV2aWV3Pi5uYW1lLWNvbnRhaW5lcj4ubmFtZXtmb250LXNpemU6MTRweDtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMCwwLDAsLjUpO2JveC1zaGFkb3c6MHB4IDBweCA0cHggcmdiYSgwLDAsMCwuNSk7Ym9yZGVyLXJhZGl1czo5OTk5cHg7cGFkZGluZzo0cHggOHB4fS5hY29yZC0tc3RvcmUtZXh0ZW5zaW9uLWNhcmQ+LmluZm8tY29udGFpbmVye2Rpc3BsYXk6ZmxleDtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2VlbjtmbGV4LWRpcmVjdGlvbjpjb2x1bW47cGFkZGluZzo4cHg7aGVpZ2h0OjE1MHB4O3dpZHRoOjEwMCV9LmFjb3JkLS1zdG9yZS1leHRlbnNpb24tY2FyZD4uaW5mby1jb250YWluZXI+LnRvcHtkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1uO2dhcDo0cHg7aGVpZ2h0OjEwMCV9LmFjb3JkLS1zdG9yZS1leHRlbnNpb24tY2FyZD4uaW5mby1jb250YWluZXI+LnRvcD4ubmFtZS1jb250YWluZXJ7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtnYXA6NHB4O3dpZHRoOjEwMCV9LmFjb3JkLS1zdG9yZS1leHRlbnNpb24tY2FyZD4uaW5mby1jb250YWluZXI+LnRvcD4ubmFtZS1jb250YWluZXI+Lm5hbWV7Zm9udC1zaXplOjE2cHg7Zm9udC13ZWlnaHQ6NTAwO2NvbG9yOnZhcigtLWhlYWRlci1wcmltYXJ5KX0uYWNvcmQtLXN0b3JlLWV4dGVuc2lvbi1jYXJkPi5pbmZvLWNvbnRhaW5lcj4udG9wPi5uYW1lLWNvbnRhaW5lcj4udmVyc2lvbntmb250LXNpemU6MTJweDtmb250LXdlaWdodDo1MDA7Y29sb3I6dmFyKC0taGVhZGVyLXByaW1hcnkpO29wYWNpdHk6LjV9LmFjb3JkLS1zdG9yZS1leHRlbnNpb24tY2FyZD4uaW5mby1jb250YWluZXI+LnRvcD4uZGVzY3JpcHRpb257Zm9udC1zaXplOjE0cHg7Zm9udC13ZWlnaHQ6MzAwO2NvbG9yOnZhcigtLWhlYWRlci1wcmltYXJ5KTtvcGFjaXR5Oi43NTt3aWR0aDoxMDAlfS5hY29yZC0tc3RvcmUtZXh0ZW5zaW9uLWNhcmQ+LmluZm8tY29udGFpbmVyPi5ib3R0b217ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmZsZXgtc3RhcnQ7anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47aGVpZ2h0OjEwMCV9LmFjb3JkLS1zdG9yZS1leHRlbnNpb24tY2FyZD4uaW5mby1jb250YWluZXI+LmJvdHRvbT4ubGVmdHtoZWlnaHQ6MTAwJTtkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1uO2FsaWduLWl0ZW1zOmZsZXgtc3RhcnQ7anVzdGlmeS1jb250ZW50OmZsZXgtZW5kfS5hY29yZC0tc3RvcmUtZXh0ZW5zaW9uLWNhcmQ+LmluZm8tY29udGFpbmVyPi5ib3R0b20+LmxlZnQ+LmF1dGhvcnN7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOmNvbHVtbjtnYXA6NHB4fS5hY29yZC0tc3RvcmUtZXh0ZW5zaW9uLWNhcmQ+LmluZm8tY29udGFpbmVyPi5ib3R0b20+LmxlZnQ+LmF1dGhvcnMgLmF1dGhvcntkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2JvcmRlci1yYWRpdXM6OTk5OXB4O2JhY2tncm91bmQtY29sb3I6cmdiYSgwLDAsMCwuMSk7Y3Vyc29yOnBvaW50ZXJ9LmFjb3JkLS1zdG9yZS1leHRlbnNpb24tY2FyZD4uaW5mby1jb250YWluZXI+LmJvdHRvbT4ubGVmdD4uYXV0aG9ycyAuYXV0aG9yPi5pbWFnZXtib3JkZXItcmFkaXVzOjUwJTt3aWR0aDoxOHB4O2hlaWdodDoxOHB4O2JhY2tncm91bmQtY29sb3I6dmFyKC0tYnJhbmQtNTAwKTtiYWNrZ3JvdW5kLXBvc2l0aW9uOmNlbnRlcjtiYWNrZ3JvdW5kLXNpemU6Y292ZXJ9LmFjb3JkLS1zdG9yZS1leHRlbnNpb24tY2FyZD4uaW5mby1jb250YWluZXI+LmJvdHRvbT4ubGVmdD4uYXV0aG9ycyAuYXV0aG9yPi5uYW1le2ZvbnQtc2l6ZToxMHB4O2ZvbnQtd2VpZ2h0OjQwMDtjb2xvcjp2YXIoLS1oZWFkZXItcHJpbWFyeSk7b3BhY2l0eTouNzU7cGFkZGluZzo2cHh9LmFjb3JkLS1zdG9yZS1leHRlbnNpb24tY2FyZD4uaW5mby1jb250YWluZXI+LmJvdHRvbT4ucmlnaHR7aGVpZ2h0OjEwMCU7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOmNvbHVtbjthbGlnbi1pdGVtczpmbGV4LWVuZDtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1lbmR9YDtcbiIsICJpbXBvcnQgbW9kYWxzIGZyb20gXCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9hcGkvdWkvbW9kYWxzLmpzeFwiO1xyXG5pbXBvcnQgaTE4biBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vYXBpL2kxOG4vaW5kZXguanNcIjtcclxuaW1wb3J0IHBhdGNoZXIgZnJvbSBcIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2FwaS9wYXRjaGVyL2luZGV4LmpzXCI7XHJcblxyXG5pbXBvcnQgY3NzVGV4dCBmcm9tIFwiLi9zdHlsZS5zY3NzXCI7XHJcbnBhdGNoZXIuaW5qZWN0Q1NTKGNzc1RleHQpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIC8qKiBAcGFyYW0ge2ltcG9ydChcInZ1ZVwiKS5BcHB9IHZ1ZUFwcCAqL1xyXG4gIGxvYWQodnVlQXBwKSB7XHJcbiAgICB2dWVBcHAuY29tcG9uZW50KFxyXG4gICAgICBcInN0b3JlLWV4dGVuc2lvbi1jYXJkXCIsXHJcbiAgICAgIHtcclxuICAgICAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImFjb3JkLS1zdG9yZS1leHRlbnNpb24tY2FyZFwiPlxyXG4gICAgICAgICAgICA8ZGl2IHYtaWY9XCJleHRlbnNpb24ucHJldmlld3M/Lmxlbmd0aFwiIGNsYXNzPVwicHJldmlld1wiIDpzdHlsZT1cInsgYmFja2dyb3VuZEltYWdlOiAndXJsKCcgKyBleHRlbnNpb24ucHJldmlld3Nbc2VsZWN0ZWRQcmV2aWV3XS5pbWFnZSArICcpJyB9XCI+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRyb2xzXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ28gZ28tYmFja1wiIEBjbGljaz1cImdvQmFja1wiPlxyXG4gICAgICAgICAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD1cIk0xMS44MjggMTJsMi44MjkgMi44MjgtMS40MTQgMS40MTVMOSAxMmw0LjI0My00LjI0MyAxLjQxNCAxLjQxNUwxMS44MjggMTJ6XCIgZmlsbD1cImN1cnJlbnRDb2xvclwiIC8+XHJcbiAgICAgICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ28gZ28tZm9yd2FyZFwiIEBjbGljaz1cImdvRm9yd2FyZFwiPlxyXG4gICAgICAgICAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD1cIk0xMi4xNzIgMTJMOS4zNDMgOS4xNzJsMS40MTQtMS40MTVMMTUgMTJsLTQuMjQzIDQuMjQzLTEuNDE0LTEuNDE1elwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIiAvPlxyXG4gICAgICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJuYW1lLWNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm5hbWVcIj5cclxuICAgICAgICAgICAgICAgICAge3sgZXh0ZW5zaW9uLnByZXZpZXdzW3NlbGVjdGVkUHJldmlld10ubmFtZSB9fVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IHYtZWxzZSBjbGFzcz1cInByZXZpZXcgbm8tcHJldmlld1wiPjwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5mby1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidG9wXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibmFtZS1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm5hbWVcIj57eyBpMThuTG9jYWxpemUoZXh0ZW5zaW9uLm5hbWUpIH19PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ2ZXJzaW9uXCI+dnt7IGV4dGVuc2lvbi52ZXJzaW9uIH19PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkZXNjcmlwdGlvblwiPnt7IGkxOG5Mb2NhbGl6ZShleHRlbnNpb24uZGVzY3JpcHRpb24pIH19PC9kaXY+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJvdHRvbVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxlZnRcIj5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImF1dGhvcnNcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHYtZm9yPVwiYXV0aG9yIGluIGV4dGVuc2lvbi5hdXRob3JzXCIgY2xhc3M9XCJhdXRob3JcIiA6a2V5PVwiYXV0aG9yLm5hbWVcIiBAY2xpY2s9XCJzaG93UHJvZmlsZShhdXRob3IuaWQpXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW1hZ2VcIiA6c3R5bGU9XCJ7IGJhY2tncm91bmRJbWFnZTogJ3VybCgnICsgYXV0aG9yLmltYWdlICsgJyknIH1cIj48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJuYW1lXCI+e3sgYXV0aG9yLm5hbWUgfX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyaWdodFwiPlxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnV0dG9uc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIEBjbGljaz1cImluc3RhbGxPclVuaW5zdGFsbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPGRpc2NvcmQtYnV0dG9uIDp2YWx1ZT1cImkxOG5Gb3JtYXQoZXh0ZW5zaW9uLmluc3RhbGxlZCA/ICdVTklOU1RBTEwnIDogJ0lOU1RBTEwnKVwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIGAsXHJcbiAgICAgICAgcHJvcHM6IFtcImV4dGVuc2lvblwiXSxcclxuICAgICAgICBkYXRhKCkge1xyXG4gICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgc2VsZWN0ZWRQcmV2aWV3OiAwLFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG1ldGhvZHM6IHtcclxuICAgICAgICAgIGkxOG5Gb3JtYXQ6IGkxOG4uZm9ybWF0LFxyXG4gICAgICAgICAgaTE4bkxvY2FsaXplOiBpMThuLmxvY2FsaXplLFxyXG4gICAgICAgICAgaW5zdGFsbE9yVW5pbnN0YWxsKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5leHRlbnNpb24uaW5zdGFsbGVkKSB7XHJcbiAgICAgICAgICAgICAgLy8gdW5pbnN0YWxsXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgLy8gaW5zdGFsbFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgZ29CYWNrKCkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkUHJldmlldy0tO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZFByZXZpZXcgPCAwKSB0aGlzLnNlbGVjdGVkUHJldmlldyA9IHRoaXMuZXh0ZW5zaW9uLnByZXZpZXdzLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgZ29Gb3J3YXJkKCkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkUHJldmlldysrO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZFByZXZpZXcgPj0gdGhpcy5leHRlbnNpb24ucHJldmlld3MubGVuZ3RoKSB0aGlzLnNlbGVjdGVkUHJldmlldyA9IDA7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgc2hvd1Byb2ZpbGUocHJvZmlsZUlkKSB7XHJcbiAgICAgICAgICAgIG1vZGFscy5zaG93LnVzZXIocHJvZmlsZUlkKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIClcclxuICB9XHJcbn0iLCAiaW1wb3J0IGluc3RhbGxlZEV4dGVuc2lvbkNhcmQgZnJvbSBcIi4vaW5zdGFsbGVkLWV4dGVuc2lvbi1jYXJkL2luZGV4LmpzXCI7XHJcbmltcG9ydCBzdG9yZUV4dGVuc2lvbkNhcmQgZnJvbSBcIi4vc3RvcmUtZXh0ZW5zaW9uLWNhcmQvaW5kZXguanNcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIC8qKiBAcGFyYW0ge2ltcG9ydChcInZ1ZVwiKS5BcHB9IHZ1ZUFwcCAqL1xyXG4gIGxvYWQodnVlQXBwKSB7XHJcbiAgICBzdG9yZUV4dGVuc2lvbkNhcmQubG9hZCh2dWVBcHApO1xyXG4gICAgaW5zdGFsbGVkRXh0ZW5zaW9uQ2FyZC5sb2FkKHZ1ZUFwcCk7XHJcbiAgfVxyXG59IiwgIlxyXG5pbXBvcnQgY29uZmlnQ29tcG9uZW50cyBmcm9tIFwiLi9jb25maWcvaW5kZXguanNcIjtcclxuaW1wb3J0IGNhcmRDb21wb25lbnRzIGZyb20gXCIuL2NhcmRzL2luZGV4LmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgLyoqIEBwYXJhbSB7aW1wb3J0KFwidnVlXCIpLkFwcH0gdnVlQXBwICovXHJcbiAgbG9hZCh2dWVBcHApIHtcclxuICAgIGNvbmZpZ0NvbXBvbmVudHMubG9hZCh2dWVBcHApO1xyXG4gICAgY2FyZENvbXBvbmVudHMubG9hZCh2dWVBcHApO1xyXG4gIH1cclxufSIsICJpbXBvcnQgcGFnZXMgZnJvbSBcIi4vcGFnZXMvaW5kZXguanNcIjtcclxuaW1wb3J0IGNvbXBvbmVudHMgZnJvbSBcIi4vY29tcG9uZW50cy9pbmRleC5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIC8qKiBAcGFyYW0ge2ltcG9ydChcInZ1ZVwiKS5BcHB9IHZ1ZUFwcCAqL1xyXG4gIGxvYWQodnVlQXBwKSB7XHJcbiAgICBjb21wb25lbnRzLmxvYWQodnVlQXBwKTtcclxuICAgIHBhZ2VzLmxvYWQodnVlQXBwKTtcclxuICB9XHJcbn0iLCAiaW1wb3J0IGRvbSBmcm9tIFwiLi4vLi4vYXBpL2RvbS9pbmRleC5qc1wiO1xyXG5pbXBvcnQgd2VicGFjayBmcm9tIFwiLi4vLi4vYXBpL21vZHVsZXMvd2VicGFjay5qc1wiO1xyXG5pbXBvcnQgcGF0Y2hlciBmcm9tIFwiLi4vLi4vYXBpL3BhdGNoZXIvaW5kZXguanNcIjtcclxuaW1wb3J0IHV0aWxzIGZyb20gXCIuLi8uLi9hcGkvdXRpbHMvaW5kZXguanNcIjtcclxuaW1wb3J0IGkxOG4gZnJvbSBcIi4uLy4uL2FwaS9pMThuL2luZGV4LmpzXCI7XHJcbmltcG9ydCB1aSBmcm9tIFwiLi4vLi4vYXBpL3VpL2luZGV4LmpzXCI7XHJcblxyXG5pbXBvcnQgY3NzVGV4dCBmcm9tIFwiLi9zdHlsZS5zY3NzXCI7XHJcbmltcG9ydCB2dWVDb21wb25lbnRzIGZyb20gXCIuL3Z1ZS9jb21wb25lbnRzL2luZGV4LmpzXCI7XHJcbnBhdGNoZXIuaW5qZWN0Q1NTKGNzc1RleHQpO1xyXG5cclxue1xyXG4gIGxldCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xyXG4gIHNjcmlwdC5zcmMgPSBcImh0dHBzOi8vdW5wa2cuY29tL3Z1ZUAzL2Rpc3QvdnVlLmdsb2JhbC5qc1wiO1xyXG4gIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcclxufVxyXG5cclxuZG9tLnBhdGNoKCdhW2hyZWY9XCIvc3RvcmVcIl1bZGF0YS1saXN0LWl0ZW0taWQkPVwiX19fbml0cm9cIl0nLCAoZWxtKSA9PiB7XHJcbiAgdXRpbHMuaWZFeGlzdHMoXHJcbiAgICBlbG0ucXVlcnlTZWxlY3RvcignW2NsYXNzKj1cIm5hbWVBbmREZWNvcmF0b3JzLVwiXSBbY2xhc3MqPVwibmFtZS1cIl0nKSxcclxuICAgIChuYW1lRWxtKSA9PiB7XHJcbiAgICAgIG5hbWVFbG0udGV4dENvbnRlbnQgPSBpMThuLmZvcm1hdChcIkFQUF9OQU1FXCIpO1xyXG4gICAgfVxyXG4gICk7XHJcblxyXG4gIHV0aWxzLmlmRXhpc3RzKFxyXG4gICAgZWxtLnF1ZXJ5U2VsZWN0b3IoJ1tjbGFzcyo9XCJwcmVtaXVtVHJpYWxBY2tub3dsZWRnZWRCYWRnZS1cIl0nKSxcclxuICAgIChuaXRyb0VsbSkgPT4ge1xyXG4gICAgICBuaXRyb0VsbS5yZW1vdmUoKTtcclxuICAgIH1cclxuICApO1xyXG5cclxuICB1dGlscy5pZkV4aXN0cyhcclxuICAgIGVsbS5xdWVyeVNlbGVjdG9yKCdbY2xhc3MqPVwiYXZhdGFyV2l0aFRleHQtXCJdIFtjbGFzcyo9XCJhdmF0YXItXCJdIHN2ZycpLFxyXG4gICAgZmlsbFNWR0VsbVdpdGhBY29yZExvZ29cclxuICApO1xyXG59KTtcclxuXHJcbmxldCBpbnRlcm5hbFZ1ZUFwcCA9IG51bGw7XHJcblxyXG5jb25zdCBoZWFkZXJJdGVtQ2xhc3NlcyA9IHdlYnBhY2suZmluZEJ5UHJvcGVydGllcyhcImRpdmlkZXJcIiwgXCJoYW1idXJnZXJcIiwgXCJ0aGVtZWRcIik7XHJcbmNvbnN0IHRhYkJhckNsYXNzZXMgPSB3ZWJwYWNrLmZpbmRCeVByb3BlcnRpZXMoXCJ0YWJCYXJcIiwgXCJtYXhXaWR0aFdpdGhUb29sYmFyXCIpO1xyXG5jb25zdCBoZWFkZXJDbGFzc2VzID0gd2VicGFjay5maW5kQnlQcm9wZXJ0aWVzKFwidG9wUGlsbFwiLCBcImhlYWRlclRleHRcIik7XHJcbmRvbS5wYXRjaCgnW2NsYXNzKj1cImFwcGxpY2F0aW9uU3RvcmUtXCJdIFtjbGFzcyo9XCJob21lV3JhcHBlck5vcm1hbC1cIl0nLCAoZWxtKSA9PiB7XHJcblxyXG4gIHV0aWxzLmlmRXhpc3RzKFxyXG4gICAgZWxtLnF1ZXJ5U2VsZWN0b3IoJ1tjbGFzcyo9XCJoZWFkZXJCYXItXCJdIFtjbGFzcyo9XCJ0aXRsZVdyYXBwZXItXCJdIFtjbGFzcyo9XCJ0aXRsZS1cIl0nKSxcclxuICAgICh0aXRsZUVsbSkgPT4ge1xyXG4gICAgICB0aXRsZUVsbS50ZXh0Q29udGVudCA9IGkxOG4uZm9ybWF0KFwiQVBQX05BTUVcIik7XHJcblxyXG4gICAgICBpZiAoaW50ZXJuYWxWdWVBcHApIHtcclxuICAgICAgICBsZXQgY29udGFpbmVyID0gZG9tLnBhcmVudHModGl0bGVFbG0sIDIpLnBvcCgpO1xyXG5cclxuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICBkb20ucGFyc2UoYDxkaXYgY2xhc3M9XCIke2hlYWRlckl0ZW1DbGFzc2VzLmRpdmlkZXJ9XCI+PC9kaXY+YClcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBjb25zdCBidXR0b25zQ29udGFpbmVyID0gZG9tLnBhcnNlKGBcclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCIke3RhYkJhckNsYXNzZXMudGFiQmFyfSAke2hlYWRlckNsYXNzZXMudG9wUGlsbH1cIj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIGApO1xyXG5cclxuICAgICAgICBsZXQgYnV0dG9ucyA9IFtdO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBidWlsZEJ1dHRvbihpZCwgdGV4dCwgY3VzdG9tQ2xhc3NlcyA9IFwiXCIpIHtcclxuICAgICAgICAgIGxldCBlbG0gPSBkb20ucGFyc2UoYDxkaXYgaWQ9XCJ0YWItYnV0dG9uLSR7aWR9XCIgY2xhc3M9XCJhY29yZC0tdGFicy10YWItYnV0dG9uICR7Y3VzdG9tQ2xhc3Nlc30gJHt0YWJCYXJDbGFzc2VzLml0ZW19ICR7aGVhZGVyQ2xhc3Nlcy5pdGVtfSAke2hlYWRlckNsYXNzZXMudGhlbWVkfVwiPiR7dGV4dH08L2Rpdj5gKTtcclxuXHJcbiAgICAgICAgICBidXR0b25zLnB1c2goZWxtKTtcclxuXHJcbiAgICAgICAgICBlbG0uc2V0U2VsZWN0ZWQgPSAocykgPT4ge1xyXG4gICAgICAgICAgICBpZiAocykgZWxtLmNsYXNzTGlzdC5hZGQoaGVhZGVyQ2xhc3Nlcy5zZWxlY3RlZCwgXCJzZWxlY3RlZFwiKTtcclxuICAgICAgICAgICAgZWxzZSBlbG0uY2xhc3NMaXN0LnJlbW92ZShoZWFkZXJDbGFzc2VzLnNlbGVjdGVkLCBcInNlbGVjdGVkXCIpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGVsbS5zZXRTZWxlY3RlZChpbnRlcm5hbFZ1ZUFwcC5zZWxlY3RlZFRhYiA9PT0gaWQpO1xyXG5cclxuICAgICAgICAgIGVsbS5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBidXR0b25zLmZvckVhY2goKGIpID0+IGIuc2V0U2VsZWN0ZWQoZmFsc2UpKTtcclxuICAgICAgICAgICAgZWxtLnNldFNlbGVjdGVkKHRydWUpO1xyXG4gICAgICAgICAgICBpbnRlcm5hbFZ1ZUFwcC5zZWxlY3RlZFRhYiA9IGlkO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIGVsbTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGJ1dHRvbnNDb250YWluZXIuYXBwZW5kQ2hpbGQoYnVpbGRCdXR0b24oXCJob21lXCIsIGkxOG4uZm9ybWF0KFwiSE9NRVwiKSkpO1xyXG4gICAgICAgIGJ1dHRvbnNDb250YWluZXIuYXBwZW5kQ2hpbGQoYnVpbGRCdXR0b24oXCJpbnN0YWxsZWQtZXh0ZW5zaW9uc1wiLCBpMThuLmZvcm1hdChcIklOU1RBTExFRF9FWFRFTlNJT05TXCIpKSk7XHJcbiAgICAgICAgYnV0dG9uc0NvbnRhaW5lci5hcHBlbmRDaGlsZChidWlsZEJ1dHRvbihcInNldHRpbmdzXCIsIGkxOG4uZm9ybWF0KFwiU0VUVElOR1NcIikpKTtcclxuICAgICAgICBidXR0b25zQ29udGFpbmVyLmFwcGVuZENoaWxkKGJ1aWxkQnV0dG9uKFwic3RvcmVcIiwgaTE4bi5mb3JtYXQoXCJFWFRFTlNJT05fU1RPUkVcIiksIFwic3RvcmUtdGFiLWJ1dHRvblwiKSk7XHJcblxyXG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChidXR0b25zQ29udGFpbmVyKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICk7XHJcbiAgdXRpbHMuaWZFeGlzdHMoXHJcbiAgICBlbG0ucXVlcnlTZWxlY3RvcignW2NsYXNzKj1cImhlYWRlckJhci1cIl0gW2NsYXNzKj1cImljb25XcmFwcGVyLVwiXSBbY2xhc3MqPVwiaWNvbi1cIl0nKSxcclxuICAgIGZpbGxTVkdFbG1XaXRoQWNvcmRMb2dvXHJcbiAgKTtcclxufSk7XHJcblxyXG5mdW5jdGlvbiBmaWxsU1ZHRWxtV2l0aEFjb3JkTG9nbyhzdmdFbG0pIHtcclxuICBzdmdFbG0uc2V0QXR0cmlidXRlKFwidmlld0JveFwiLCBcIjAgMCA4MTMuNSAxNDkzXCIpO1xyXG4gIHN2Z0VsbS5zZXRBdHRyaWJ1dGUoXCJ4bWxuc1wiLCBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIpO1xyXG4gIHN2Z0VsbS5pbm5lckhUTUwgPSBgXHJcbiAgICA8ZGVmcz5cclxuICAgICAgPHN0eWxlPlxyXG4gICAgICAgIC5hY29yZC0tbG9nby1jb2xvciB7XHJcbiAgICAgICAgICBmaWxsOiBjdXJyZW50Q29sb3I7XHJcbiAgICAgICAgICBmaWxsLXJ1bGU6IGV2ZW5vZGQ7XHJcbiAgICAgICAgfVxyXG4gICAgICA8L3N0eWxlPlxyXG4gICAgPC9kZWZzPlxyXG4gICAgPGc+XHJcbiAgICAgIDxwYXRoIGNsYXNzPVwiYWNvcmQtLWxvZ28tY29sb3JcIiBkPVwiTTgxNy4yNjYsMTMyMi41aDI4NXYzNjVoLTI4NXYtMzY1WlwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgtNTUzLjI1IC0yMTMuNSlcIi8+XHJcbiAgICAgIDxwYXRoIGNsYXNzPVwiYWNvcmQtLWxvZ28tY29sb3JcIiBkPVwiTTU1NS4yMzUsMTUyMy43OHM5MS4xNjktMzE5Ljg1LDkyLjUzMS0zMTkuMjhjMTE0LjcsNDcuODMsMTYwLDE5MiwxNjAsMTkybC01Mi4xMiwxODYuNjFzLTMxLjEyOSwxMzcuNzEtODAuODgsMTIwLjM5QzUyOC4wMjYsMTY1Mi40Miw1NTUuMjM1LDE1MjMuNzgsNTU1LjIzNSwxNTIzLjc4WlwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgtNTUzLjI1IC0yMTMuNSlcIi8+XHJcbiAgICAgIDxwYXRoIGNsYXNzPVwiYWNvcmQtLWxvZ28tY29sb3JcIiBkPVwiTTEzNjQuNzcsMTUyNS4yOHMtOTEuMTctMzE5Ljg1LTkyLjU0LTMxOS4yOGMtMTE0LjcsNDcuODMtMTYwLDE5Mi0xNjAsMTkybDUyLjEyLDE4Ni42MXMzMS4xMywxMzcuNzEsODAuODgsMTIwLjM5QzEzOTEuOTcsMTY1My45MiwxMzY0Ljc3LDE1MjUuMjgsMTM2NC43NywxNTI1LjI4WlwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgtNTUzLjI1IC0yMTMuNSlcIi8+XHJcbiAgICA8L2c+XHJcbiAgICA8cGF0aCBjbGFzcz1cImFjb3JkLS1sb2dvLWNvbG9yXCIgZD1cIk04NzQuNzY2LDI3NS41czE0LjU3OS02MS45MTgsODctNjJjODAuODI0LS4wOTIsODcsNjIsODcsNjJzMTk5LjQzLDg1MS40NywxOTgsODUyYy0yMTAuMzMsNzcuNzEtMTQ2LDE4MC0xNDYsMTgwaC0yODFzNjMuNy0xMDMuODItMTQ2LTE4MUM2NzEuMDE0LDExMjUuNDksODc0Ljc2NiwyNzUuNSw4NzQuNzY2LDI3NS41WlwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgtNTUzLjI1IC0yMTMuNSlcIi8+XHJcbiAgICA8Zz5cclxuICAgICAgPHBhdGggY2xhc3M9XCJhY29yZC0tbG9nby1jb2xvclwiIGQ9XCJNMTIzOC4xNCw4OTcuNWE1My44ODIsNTMuODgyLDAsMCwxLDUzLjg4LDUzLjg3NWMwLDI0LjkzOS0yMC4yNSw0Ni45ODctNDMuMjUsNTMuMTI1LTQuNDUsMS4xOC0xMC4xOS0zOS0xMS0zOS0wLjU4LDAtMjcuNzEsMy41MS0zMSw0LTUuNTguODI4LTExLjkzLTEzLjg3Ni00LTIwLDEuOTMtMS40OTEsMjYuNjItNi45NTksMjktNywwLjYyLS4wMTEtNy4zNC00MS42MTgtNy00M0MxMjI1LjY0LDg5NS45NDQsMTIzMy41Miw4OTcuNSwxMjM4LjE0LDg5Ny41WlwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgtNTUzLjI1IC0yMTMuNSlcIi8+XHJcbiAgICAgIDxwYXRoIGNsYXNzPVwiYWNvcmQtLWxvZ28tY29sb3JcIiBkPVwiTTExNzMuNjQsNjMyLjVhNTMuODgyLDUzLjg4MiwwLDAsMSw1My44OCw1My44NzVjMCwyNC45MzktMjAuMjUsNDYuOTg3LTQzLjI1LDUzLjEyNS00LjQ1LDEuMTg1LTEwLjE5LTM5LTExLTM5LTAuNTgsMC0yNy43MSwzLjUxLTMxLDQtNS41OC44MjgtMTEuOTMtMTMuODc2LTQtMjAsMS45My0xLjQ5MSwyNi42Mi02Ljk1OSwyOS03LDAuNjItLjAxMS03LjM0LTQxLjYxOC03LTQzQzExNjEuMTQsNjMwLjk0NCwxMTY5LjAyLDYzMi41LDExNzMuNjQsNjMyLjVaXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKC01NTMuMjUgLTIxMy41KVwiLz5cclxuICAgICAgPHBhdGggY2xhc3M9XCJhY29yZC0tbG9nby1jb2xvclwiIGQ9XCJNMTExNS4xNiwzNzNhNTMuODc0LDUzLjg3NCwwLDAsMSw1My44Nyw1My44NzVjMCwyNC45MzktMjAuMjQsNDYuOTg3LTQzLjI1LDUzLjEyNS00LjQ0LDEuMTg1LTEwLjE4LTM5LTExLTM5LTAuNTgsMC0yNy43LDMuNTEtMzEsNC01LjU3LjgyOC0xMS45Mi0xMy44NzYtNC0yMCwxLjkzLTEuNDkxLDI2LjYyLTYuOTU5LDI5LTcsMC42Mi0uMDExLTcuMzQtNDEuNjE4LTctNDNDMTEwMi42NSwzNzEuNDQ0LDExMTAuNTMsMzczLDExMTUuMTYsMzczWlwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgtNTUzLjI1IC0yMTMuNSlcIi8+XHJcbiAgICA8L2c+XHJcbiAgICA8Zz5cclxuICAgICAgPHBhdGggY2xhc3M9XCJhY29yZC0tbG9nby1jb2xvclwiIGQ9XCJNNjgzLjkyMiw4OTcuNzVhNTMuODc1LDUzLjg3NSwwLDAsMC01My44NzUsNTMuODc1YzAsMjQuOTM5LDIwLjI0NSw0Ni45ODcsNDMuMjUsNTMuMTI1LDQuNDQxLDEuMTgsMTAuMTg1LTM5LDExLTM5LDAuNTc2LDAsMjcuNywzLjUxLDMxLDQsNS41NzIsMC44MjgsMTEuOTI2LTEzLjg3Niw0LTIwLTEuOTMtMS40OTEtMjYuNjIxLTYuOTU5LTI5LTctMC42Mi0uMDExLDcuMzM5LTQxLjYxOCw3LTQzQzY5Ni40MjQsODk2LjE5NCw2ODguNTQ0LDg5Ny43NSw2ODMuOTIyLDg5Ny43NVpcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoLTU1My4yNSAtMjEzLjUpXCIvPlxyXG4gICAgICA8cGF0aCBjbGFzcz1cImFjb3JkLS1sb2dvLWNvbG9yXCIgZD1cIk03NDguNDIyLDYzMi43NWE1My44NzUsNTMuODc1LDAsMCwwLTUzLjg3NSw1My44NzVjMCwyNC45MzksMjAuMjQ1LDQ2Ljk4Nyw0My4yNSw1My4xMjUsNC40NDEsMS4xODUsMTAuMTg1LTM5LDExLTM5LDAuNTc2LDAsMjcuNywzLjUxLDMxLDQsNS41NzIsMC44MjgsMTEuOTI2LTEzLjg3Niw0LTIwLTEuOTMtMS40OTEtMjYuNjIxLTYuOTU5LTI5LTctMC42Mi0uMDExLDcuMzM5LTQxLjYxOCw3LTQzQzc2MC45MjQsNjMxLjE5NCw3NTMuMDQ0LDYzMi43NSw3NDguNDIyLDYzMi43NVpcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoLTU1My4yNSAtMjEzLjUpXCIvPlxyXG4gICAgICA8cGF0aCBjbGFzcz1cImFjb3JkLS1sb2dvLWNvbG9yXCIgZD1cIk04MDYuOTA2LDM3My4yNWE1My44NzUsNTMuODc1LDAsMCwwLTUzLjg3NSw1My44NzVjMCwyNC45MzksMjAuMjQ1LDQ2Ljk4Nyw0My4yNSw1My4xMjUsNC40NDIsMS4xODUsMTAuMTg1LTM5LDExLTM5LDAuNTc3LDAsMjcuNywzLjUxLDMxLDQsNS41NzIsMC44MjgsMTEuOTI2LTEzLjg3Niw0LTIwLTEuOTMtMS40OTEtMjYuNjIxLTYuOTU5LTI5LTctMC42Mi0uMDExLDcuMzM5LTQxLjYxOCw3LTQzQzgxOS40MDksMzcxLjY5NCw4MTEuNTI4LDM3My4yNSw4MDYuOTA2LDM3My4yNVpcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoLTU1My4yNSAtMjEzLjUpXCIvPlxyXG4gICAgPC9nPlxyXG4gIGA7XHJcbn1cclxuXHJcblxyXG4oYXN5bmMgKCkgPT4ge1xyXG4gIGF3YWl0IHVpLnZ1ZS5yZWFkeS53aGVuKCk7XHJcblxyXG4gIGNvbnN0IGJhc2VWdWVFbG0gPSBkb20ucGFyc2UoYFxyXG4gICAgPGRpdiBjbGFzcz1cImFjb3JkLS10YWJzLWNvbnRlbnQtY29udGFpbmVyXCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJ0YWJcIj5cclxuICAgICAgICA8a2VlcC1hbGl2ZT5cclxuICAgICAgICAgIDxjb21wb25lbnQgOmlzPVwiXFxgXFwke3NlbGVjdGVkVGFifS1wYWdlXFxgXCIgLz5cclxuICAgICAgICA8L2tlZXAtYWxpdmU+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgYCk7XHJcblxyXG4gIC8qKiBAdHlwZSB7aW1wb3J0KFwidnVlXCIpLkFwcH0gKi9cclxuICBjb25zdCB2dWVBcHAgPSBWdWUuY3JlYXRlQXBwKHtcclxuICAgIGRhdGEoKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgc2VsZWN0ZWRUYWI6IFwiaG9tZVwiXHJcbiAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgbW91bnRlZCgpIHtcclxuICAgICAgaW50ZXJuYWxWdWVBcHAgPSB0aGlzO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICB1aS52dWUuY29tcG9uZW50cy5sb2FkKHZ1ZUFwcCk7XHJcbiAgdnVlQ29tcG9uZW50cy5sb2FkKHZ1ZUFwcCk7XHJcbiAgdnVlQXBwLm1vdW50KGJhc2VWdWVFbG0pO1xyXG5cclxuICBkb20ucGF0Y2goJ1tjbGFzcyo9XCJhcHBsaWNhdGlvblN0b3JlLVwiXSBbY2xhc3MqPVwic2Nyb2xsZXJCYXNlLVwiXSBbY2xhc3MqPVwic3Vic2NyaXB0aW9uc1JlZGlyZWN0Q29udGFpbmVyLVwiXSwgW2NsYXNzKj1cImFwcGxpY2F0aW9uU3RvcmUtXCJdIFtjbGFzcyo9XCJzY3JvbGxlckJhc2UtXCJdIFtjbGFzcyo9XCJ0cmlhbE9mZmVyV3JhcHBlci1cIl0sIFtjbGFzcyo9XCJhcHBsaWNhdGlvblN0b3JlLVwiXSBbY2xhc3MqPVwic2Nyb2xsZXJCYXNlLVwiXSBbY2xhc3MqPVwicHJlbWl1bUNhcmRzLVwiXScsIChlbG0pID0+IHtcclxuICAgIC8qKiBAdHlwZSB7SFRNTERpdkVsZW1lbnR9ICovXHJcbiAgICBsZXQgY29udGFpbmVyRWxtID0gZG9tLnBhcmVudHMoZWxtLCA0KS5wb3AoKTtcclxuICAgIGNvbnRhaW5lckVsbS5yZXBsYWNlQ2hpbGRyZW4oYmFzZVZ1ZUVsbSk7XHJcbiAgfSk7XHJcbn0pKCk7XHJcblxyXG5cclxuXHJcblxyXG4iLCAiXHJcbihhc3luYyAoKSA9PiB7XHJcbiAgLyoqIEB0eXBlIHtTVkdFbGVtZW50fSAqL1xyXG4gIGxldCBzdmdFbG07XHJcbiAgd2hpbGUgKHRydWUpIHtcclxuICAgIHN2Z0VsbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tjbGFzcyo9XCJ3b3JkbWFyay1cIl0gc3ZnJyk7XHJcbiAgICBpZiAoc3ZnRWxtKSBicmVhaztcclxuICAgIGF3YWl0IG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCAxMDApKTtcclxuICB9XHJcblxyXG4gIHN2Z0VsbS5pbm5lckhUTUwgPSBgPHBhdGggZD1cIk02Ljg2NCAxMEw2LjQzMiA4Ljk1NkgzLjA0OEwyLjU0NCAxMEgwLjEwOEwzLjk0OCAxLjU2NEg2LjA0OEw5LjcyIDEwSDYuODY0Wk00Ljc0IDQuNzhMMy45MTIgNi43OTZINS41OEw0Ljc0IDQuNzhaTTE1LjUwNDUgNi4zMjhDMTUuMzQ0NSA2LjIyNCAxNS4xOTI1IDYuMTMyIDE1LjA0ODUgNi4wNTJDMTQuOTA0NSA1Ljk2NCAxNC43NTY1IDUuODkyIDE0LjYwNDUgNS44MzZDMTQuNDUyNSA1Ljc3MiAxNC4yOTI1IDUuNzI0IDE0LjEyNDUgNS42OTJDMTMuOTY0NSA1LjY2IDEzLjc4NDUgNS42NDQgMTMuNTg0NSA1LjY0NEMxMy4zMTI1IDUuNjQ0IDEzLjA4MDUgNS42OCAxMi44ODg1IDUuNzUyQzEyLjcwNDUgNS44MjQgMTIuNTU2NSA1LjkyIDEyLjQ0NDUgNi4wNEMxMi4zMzI1IDYuMTYgMTIuMjQ4NSA2LjI5NiAxMi4xOTI1IDYuNDQ4QzEyLjE0NDUgNi42IDEyLjEyMDUgNi43NTIgMTIuMTIwNSA2LjkwNEMxMi4xMjA1IDcuMDQ4IDEyLjE1MjUgNy4xOTIgMTIuMjE2NSA3LjMzNkMxMi4yODA1IDcuNDcyIDEyLjM3MjUgNy41OTIgMTIuNDkyNSA3LjY5NkMxMi42MjA1IDcuOCAxMi43NzI1IDcuODg0IDEyLjk0ODUgNy45NDhDMTMuMTI0NSA4LjAxMiAxMy4zMjg1IDguMDQ0IDEzLjU2MDUgOC4wNDRDMTMuNzI4NSA4LjA0NCAxMy44ODQ1IDguMDI4IDE0LjAyODUgNy45OTZDMTQuMTgwNSA3Ljk2NCAxNC4zMjg1IDcuOTE2IDE0LjQ3MjUgNy44NTJDMTQuNjI0NSA3Ljc4OCAxNC43ODA1IDcuNzEyIDE0Ljk0MDUgNy42MjRDMTUuMTA4NSA3LjUyOCAxNS4yOTY1IDcuNDIgMTUuNTA0NSA3LjNMMTYuMTI4NSA5LjA1MkMxNS43Njg1IDkuMzU2IDE1LjM0NDUgOS42MTYgMTQuODU2NSA5LjgzMkMxNC4zNjg1IDEwLjA0IDEzLjg0MDUgMTAuMTQ0IDEzLjI3MjUgMTAuMTQ0QzEyLjczNjUgMTAuMTQ0IDEyLjI0ODUgMTAuMDggMTEuODA4NSA5Ljk1MkMxMS4zNzY1IDkuODE2IDExLjAwNDUgOS42MTYgMTAuNjkyNSA5LjM1MkMxMC4zODg1IDkuMDggMTAuMTUyNSA4Ljc0NCA5Ljk4NDQ3IDguMzQ0QzkuODE2NDcgNy45MzYgOS43MzI0NyA3LjQ2IDkuNzMyNDcgNi45MTZDOS43MzI0NyA2LjM1NiA5LjgyNDQ3IDUuODcyIDEwLjAwODUgNS40NjRDMTAuMjAwNSA1LjA1NiAxMC40NTY1IDQuNzIgMTAuNzc2NSA0LjQ1NkMxMS4xMDQ1IDQuMTg0IDExLjQ4ODUgMy45ODQgMTEuOTI4NSAzLjg1NkMxMi4zNjg1IDMuNzIgMTIuODQwNSAzLjY1MiAxMy4zNDQ1IDMuNjUyQzE0LjMyMDUgMy42NTIgMTUuMTg0NSAzLjk0NCAxNS45MzY1IDQuNTI4TDE1LjUwNDUgNi4zMjhaTTIzLjM5MTkgNi44NTZDMjMuMzkxOSA3LjQzMiAyMy4zMTE5IDcuOTI4IDIzLjE1MTkgOC4zNDRDMjIuOTkxOSA4Ljc2IDIyLjc1OTkgOS4xMDQgMjIuNDU1OSA5LjM3NkMyMi4xNTk5IDkuNjQgMjEuNzk5OSA5LjgzNiAyMS4zNzU5IDkuOTY0QzIwLjk1OTkgMTAuMDg0IDIwLjQ5NTkgMTAuMTQ0IDE5Ljk4MzkgMTAuMTQ0QzE5LjQ4NzkgMTAuMTQ0IDE5LjAzMTkgMTAuMDggMTguNjE1OSA5Ljk1MkMxOC4xOTk5IDkuODE2IDE3LjgzOTkgOS42MTIgMTcuNTM1OSA5LjM0QzE3LjIzMTkgOS4wNjggMTYuOTkxOSA4LjcyOCAxNi44MTU5IDguMzJDMTYuNjQ3OSA3LjkwNCAxNi41NjM5IDcuNDE2IDE2LjU2MzkgNi44NTZDMTYuNTYzOSA2LjI3MiAxNi42NDc5IDUuNzcyIDE2LjgxNTkgNS4zNTZDMTYuOTkxOSA0Ljk0IDE3LjIzMTkgNC42IDE3LjUzNTkgNC4zMzZDMTcuODM5OSA0LjA3MiAxOC4xOTk5IDMuODggMTguNjE1OSAzLjc2QzE5LjAzMTkgMy42NCAxOS40ODc5IDMuNTggMTkuOTgzOSAzLjU4QzIwLjQ5NTkgMy41OCAyMC45NTk5IDMuNjQ4IDIxLjM3NTkgMy43ODRDMjEuNzk5OSAzLjkxMiAyMi4xNTk5IDQuMTEyIDIyLjQ1NTkgNC4zODRDMjIuNzU5OSA0LjY0OCAyMi45OTE5IDQuOTg4IDIzLjE1MTkgNS40MDRDMjMuMzExOSA1LjgxMiAyMy4zOTE5IDYuMjk2IDIzLjM5MTkgNi44NTZaTTIxLjEzNTkgNi44NDRDMjEuMTM1OSA2LjUyNCAyMS4wMzE5IDYuMjU2IDIwLjgyMzkgNi4wNEMyMC42MjM5IDUuODI0IDIwLjM0MzkgNS43MTYgMTkuOTgzOSA1LjcxNkMxOS42MjM5IDUuNzE2IDE5LjM0MzkgNS44MjQgMTkuMTQzOSA2LjA0QzE4Ljk1MTkgNi4yNDggMTguODU1OSA2LjUxNiAxOC44NTU5IDYuODQ0QzE4Ljg1NTkgNy4xNDggMTguOTUxOSA3LjQxNiAxOS4xNDM5IDcuNjQ4QzE5LjM0MzkgNy44NzIgMTkuNjIzOSA3Ljk4NCAxOS45ODM5IDcuOTg0QzIwLjM0MzkgNy45ODQgMjAuNjIzOSA3Ljg3MiAyMC44MjM5IDcuNjQ4QzIxLjAzMTkgNy40MjQgMjEuMTM1OSA3LjE1NiAyMS4xMzU5IDYuODQ0Wk0yOC42OTQ4IDYuNThMMjguNDc4OCA2LjU5MkMyOC40NzA4IDYuNDA4IDI4LjM5MDggNi4yNiAyOC4yMzg4IDYuMTQ4QzI4LjA4NjggNi4wMzYgMjcuOTIyOCA1Ljk4IDI3Ljc0NjggNS45OEMyNy41ODY4IDUuOTggMjcuNDA2OCA2LjAyOCAyNy4yMDY4IDYuMTI0QzI3LjAxNDggNi4yMTIgMjYuODQyOCA2LjM0OCAyNi42OTA4IDYuNTMyVjEwSDI0LjMxNDhWMy43ODRIMjYuNjkwOFY0LjM5NkMyNi44ODI4IDQuMjEyIDI3LjEwMjggNC4wNCAyNy4zNTA4IDMuODhDMjcuNjA2OCAzLjcyIDI3LjkxMDggMy42NCAyOC4yNjI4IDMuNjRDMjguMzE4OCAzLjY0IDI4LjM4NjggMy42NDQgMjguNDY2OCAzLjY1MkMyOC41NDY4IDMuNjYgMjguNjI2OCAzLjY3MiAyOC43MDY4IDMuNjg4QzI4Ljc4NjggMy43MDQgMjguODYyOCAzLjcyOCAyOC45MzQ4IDMuNzZDMjkuMDA2OCAzLjc4NCAyOS4wNjI4IDMuODE2IDI5LjEwMjggMy44NTZMMjguNjk0OCA2LjU4Wk0zNC4zOTI5IDEwVjkuNTU2QzM0LjMyMDkgOS42MjggMzQuMjIwOSA5LjY5NiAzNC4wOTI5IDkuNzZDMzMuOTY0OSA5LjgyNCAzMy44MjQ5IDkuODg0IDMzLjY3MjkgOS45NEMzMy41MjA5IDkuOTk2IDMzLjM2ODkgMTAuMDQgMzMuMjE2OSAxMC4wNzJDMzMuMDcyOSAxMC4xMDQgMzIuOTQ0OSAxMC4xMiAzMi44MzI5IDEwLjEyQzMyLjQyNDkgMTAuMTIgMzIuMDMyOSAxMC4wNTYgMzEuNjU2OSA5LjkyOEMzMS4yODA5IDkuNzkyIDMwLjk0ODkgOS41OTIgMzAuNjYwOSA5LjMyOEMzMC4zODA5IDkuMDU2IDMwLjE1NjkgOC43MjQgMjkuOTg4OSA4LjMzMkMyOS44MjA5IDcuOTMyIDI5LjczNjkgNy40NjggMjkuNzM2OSA2Ljk0QzI5LjczNjkgNi4zOCAyOS44MTY5IDUuODk2IDI5Ljk3NjkgNS40ODhDMzAuMTQ0OSA1LjA4IDMwLjM2ODkgNC43NCAzMC42NDg5IDQuNDY4QzMwLjkzNjkgNC4xOTYgMzEuMjcyOSAzLjk5NiAzMS42NTY5IDMuODY4QzMyLjA0MDkgMy43MzIgMzIuNDQ4OSAzLjY2NCAzMi44ODA5IDMuNjY0QzMyLjk2ODkgMy42NjQgMzMuMDgwOSAzLjY3NiAzMy4yMTY5IDMuN0MzMy4zNjA5IDMuNzE2IDMzLjUwNDkgMy43NDQgMzMuNjQ4OSAzLjc4NEMzMy43OTI5IDMuODE2IDMzLjkyODkgMy44NiAzNC4wNTY5IDMuOTE2QzM0LjE5MjkgMy45NzIgMzQuMjk2OSA0LjAzMiAzNC4zNjg5IDQuMDk2VjAuODU2SDM2LjcwODlWMTBIMzQuMzkyOVpNMzQuMzY4OSA2LjA2NEMzNC4zMDQ5IDYuMDE2IDM0LjIyNDkgNS45NzIgMzQuMTI4OSA1LjkzMkMzNC4wMzI5IDUuODkyIDMzLjkzMjkgNS44NiAzMy44Mjg5IDUuODM2QzMzLjcyNDkgNS44MDQgMzMuNjIwOSA1Ljc4IDMzLjUxNjkgNS43NjRDMzMuNDEyOSA1Ljc0OCAzMy4zMjA5IDUuNzQgMzMuMjQwOSA1Ljc0QzMzLjA4MDkgNS43NCAzMi45MjQ5IDUuNzY4IDMyLjc3MjkgNS44MjRDMzIuNjI4OSA1Ljg4IDMyLjUwMDkgNS45NiAzMi4zODg5IDYuMDY0QzMyLjI3NjkgNi4xNiAzMi4xODg5IDYuMjc2IDMyLjEyNDkgNi40MTJDMzIuMDYwOSA2LjU0OCAzMi4wMjg5IDYuNjkyIDMyLjAyODkgNi44NDRDMzIuMDI4OSA3LjAwNCAzMi4wNjA5IDcuMTUyIDMyLjEyNDkgNy4yODhDMzIuMTg4OSA3LjQyNCAzMi4yNzY5IDcuNTQ0IDMyLjM4ODkgNy42NDhDMzIuNTAwOSA3Ljc0NCAzMi42Mjg5IDcuODI0IDMyLjc3MjkgNy44ODhDMzIuOTI0OSA3Ljk0NCAzMy4wODA5IDcuOTcyIDMzLjI0MDkgNy45NzJDMzMuMzIwOSA3Ljk3MiAzMy40MTI5IDcuOTYgMzMuNTE2OSA3LjkzNkMzMy42MjA5IDcuOTEyIDMzLjcyNDkgNy44ODQgMzMuODI4OSA3Ljg1MkMzMy45MzI5IDcuODEyIDM0LjAzMjkgNy43NjggMzQuMTI4OSA3LjcyQzM0LjIyNDkgNy42NjQgMzQuMzA0OSA3LjYwOCAzNC4zNjg5IDcuNTUyVjYuMDY0WlwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIiAvPmA7XHJcbiAgc3ZnRWxtLnNldEF0dHJpYnV0ZShcInZpZXdCb3hcIiwgXCIwIDAgNTUgMTFcIik7XHJcbn0pKCk7IiwgImltcG9ydCB7IHdhaXRVbnRpbENvbm5lY3Rpb25PcGVuIH0gZnJvbSBcIi4vb3RoZXIvdXRpbHMuanNcIjtcclxuaW1wb3J0IGxvYWRpbmdBbmltYXRpb24gZnJvbSBcIi4vb3RoZXIvbG9hZGluZy1hbmltYXRpb25cIjtcclxuaW1wb3J0IGFwaSBmcm9tIFwiLi9hcGlcIjtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3csIFwiYWNvcmRcIiwge1xyXG4gIGdldCgpIHtcclxuICAgIHJldHVybiBhcGkuZXhwb3NlZEFQSTtcclxuICB9XHJcbn0pO1xyXG53aW5kb3cuZ2xvYmFsID0gd2luZG93O1xyXG5cclxuKGFzeW5jICgpID0+IHtcclxuICBsb2FkaW5nQW5pbWF0aW9uLnNob3coKTtcclxuICBhd2FpdCB3YWl0VW50aWxDb25uZWN0aW9uT3BlbigpO1xyXG4gIGxvYWRpbmdBbmltYXRpb24uaGlkZSgpO1xyXG59KSgpO1xyXG5cclxuLy8gZXh0cmFzXHJcbmltcG9ydCBcIi4vb3RoZXIvZG9jdW1lbnQtdGl0bGUtY2hhbmdlLmpzXCI7XHJcbmltcG9ydCBcIi4vb3RoZXIvd2Vic29ja2V0LXRyaWdnZXJzLmpzXCI7XHJcbmltcG9ydCBcIi4vdWkvaW5kZXguanNcIjsiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFDQSxhQUFPLGVBQWUsU0FBUyxjQUFjLEVBQUUsT0FBTyxLQUFLLENBQUM7QUFDNUQsY0FBUSxVQUFVLE9BQU8sT0FBTztBQUFBLFFBQzVCLEtBQUs7QUFBQSxRQUNMLEtBQUs7QUFBQSxRQUNMLFFBQVE7QUFBQSxRQUNSLFFBQVE7QUFBQSxNQUNaLENBQUM7QUFBQTtBQUFBOzs7QUNQRDtBQUFBO0FBQUE7QUFDQSxVQUFJLGtCQUFtQixXQUFRLFFBQUssbUJBQW9CLFNBQVUsS0FBSztBQUNuRSxlQUFRLE9BQU8sSUFBSSxhQUFjLE1BQU0sRUFBRSxXQUFXLElBQUk7QUFBQSxNQUM1RDtBQUNBLGFBQU8sZUFBZSxTQUFTLGNBQWMsRUFBRSxPQUFPLEtBQUssQ0FBQztBQUM1RCxVQUFNLFdBQVcsZ0JBQWdCLGdCQUFtQjtBQUNwRCxVQUFNLGVBQU4sTUFBbUI7QUFBQSxRQUNmLGNBQWM7QUFDVixlQUFLLFlBQVksT0FBTyxPQUFPLFNBQVMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxLQUFLLFNBQVUsSUFBSSxHQUFHLElB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QUEsWUFDSjtBQUFBLGNBQ0U7QUFBQSxjQUNBO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLE1BQ0EsT0FBUztBQUFBLFFBQ1AsSUFBTTtBQUFBLFFBQ04sTUFBUTtBQUFBLFVBQ04sT0FBUztBQUFBLFlBQ1A7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLFFBQ0EsUUFBVTtBQUFBLFVBQ1IsUUFBVTtBQUFBLFVBQ1YsSUFBTTtBQUFBLFVBQ04sSUFBTTtBQUFBLFlBQ0o7QUFBQSxjQUNFO0FBQUEsY0FDQTtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLE1BQVE7QUFBQSxRQUNOLElBQU07QUFBQSxRQUNOLE1BQVE7QUFBQSxVQUNOLE9BQVM7QUFBQSxZQUNQO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxRQUNBLFFBQVU7QUFBQSxVQUNSLFFBQVU7QUFBQSxVQUNWLElBQU07QUFBQSxVQUNOLElBQU07QUFBQSxZQUNKO0FBQUEsY0FDRTtBQUFBLGNBQ0E7QUFBQSxjQUNBO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLE1BQ0EsUUFBVTtBQUFBLFFBQ1IsY0FBZ0I7QUFBQSxVQUNkLElBQU07QUFBQSxVQUNOLFFBQVU7QUFBQSxZQUNSLFFBQVU7QUFBQSxZQUNWLElBQU07QUFBQSxZQUNOLElBQU07QUFBQSxjQUNKO0FBQUEsZ0JBQ0U7QUFBQSxjQUNGO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxVQUNBLE1BQVE7QUFBQSxZQUNOLFFBQVU7QUFBQSxjQUNSO0FBQUEsY0FDQTtBQUFBLGNBQ0E7QUFBQSxjQUNBO0FBQUEsWUFDRjtBQUFBLFlBQ0EsT0FBUztBQUFBLGNBQ1A7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFVBQ0EsS0FBTztBQUFBLFlBQ0wsY0FBZ0I7QUFBQSxjQUNk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RXZCLGdCQUFJLE1BQU0seVFBQXlRLENBQUMsUUFBUTtBQUUxUixVQUFJLGVBQWUsWUFBSSxRQUFRLEtBQUssQ0FBQyxFQUFFLElBQUk7QUFDM0MsbUJBQWEsZ0JBQWdCLFVBQVU7QUFBQSxJQUN6QyxDQUFDO0FBQUEsRUFDSCxHQUFHOzs7QUNwS0gsR0FBQyxZQUFZO0FBRVgsUUFBSTtBQUNKLFdBQU8sTUFBTTtBQUNYLGVBQVMsU0FBUyxjQUFjLDBCQUEwQjtBQUMxRCxVQUFJO0FBQVE7QUFDWixZQUFNLElBQUksUUFBUSxhQUFXLFdBQVcsU0FBUyxHQUFHLENBQUM7QUFBQSxJQUN2RDtBQUVBLFdBQU8sWUFBWTtBQUNuQixXQUFPLGFBQWEsV0FBVyxXQUFXO0FBQUEsRUFDNUMsR0FBRzs7O0FDUkgsU0FBTyxlQUFlLFFBQVEsU0FBUztBQUFBLElBQ3JDLE1BQU07QUFDSixhQUFPLFlBQUk7QUFBQSxJQUNiO0FBQUEsRUFDRixDQUFDO0FBQ0QsU0FBTyxTQUFTO0FBRWhCLEdBQUMsWUFBWTtBQUNYLDhCQUFpQixLQUFLO0FBQ3RCLFVBQU0sd0JBQXdCO0FBQzlCLDhCQUFpQixLQUFLO0FBQUEsRUFDeEIsR0FBRzsiLAogICJuYW1lcyI6IFsiZXZlbnQiLCAibWFrZSIsICJ0YXJnZXQiLCAidHJlZSIsICJzZWFyY2hGaWx0ZXIiLCAid2Fsa2FibGUiLCAiaWdub3JlIiwgImZvdW5kIiwgImNvbXBvbmVudHMiLCAiXyIsICJjaGVjayIsICJtb2R1bGVzIiwgInJlcXVpcmUiLCAiZm91bmQiLCAiZmluZGVyIiwgImZvdW5kIiwgInJlcSIsICJmaW5kZXIiLCAibmFtZSIsICJjb21tb25fZGVmYXVsdCIsICJjb21tb25fZGVmYXVsdCIsICJub1N0b3JlIiwgIl8iLCAiXyIsICJfIiwgInZhbCIsICJlcnJvciIsICJvdXQiLCAiXyIsICJjaGVjayIsICJCQVNFX1VSTCIsICJuZXN0cyIsICJjb21tb25fZGVmYXVsdCIsICJzZXQiLCAic2hvdyIsICJjb21tb25fZGVmYXVsdCIsICJvdXQiLCAiXyIsICJSZWFjdCIsICJjb21tb25fZGVmYXVsdCIsICJjb21tb25fZGVmYXVsdCIsICJSZWFjdCIsICJjb21tb25fZGVmYXVsdCIsICJpbnRlcmFjdGVkIiwgImdldENvbnRhaW5lciIsICJzaG93IiwgInN0eWxlX2RlZmF1bHQiLCAic3R5bGVfZGVmYXVsdCIsICJzdHlsZV9kZWZhdWx0IiwgInN0eWxlX2RlZmF1bHQiLCAic3R5bGVfZGVmYXVsdCIsICJzdHlsZV9kZWZhdWx0IiwgImlucHV0Q2xhc3NlcyIsICJpbnB1dENsYXNzZXMyIiwgInNjcm9sbENsYXNzZXMiLCAiY29tcG9uZW50c19kZWZhdWx0IiwgIm5hbWUiLCAiY29tcG9uZW50c19kZWZhdWx0IiwgIm91dCIsICJuYW1lIiwgIl8iLCAic291cmNlIiwgImFwaSIsICJkYXRhIiwgInNvdXJjZSIsICJvdXQiLCAiYXBpIiwgInN0eWxlX2RlZmF1bHQiLCAic3R5bGVfZGVmYXVsdCIsICJzdHlsZV9kZWZhdWx0IiwgInN0eWxlX2RlZmF1bHQiLCAic3R5bGVfZGVmYXVsdCIsICJzdHlsZV9kZWZhdWx0IiwgInN0eWxlX2RlZmF1bHQiLCAic3R5bGVfZGVmYXVsdCIsICJzdHlsZV9kZWZhdWx0IiwgImNvbXBvbmVudHNfZGVmYXVsdCIsICJjb21wb25lbnRzX2RlZmF1bHQiLCAic3R5bGVfZGVmYXVsdCIsICJlbG0iLCAiY29tcG9uZW50c19kZWZhdWx0Il0KfQo=
