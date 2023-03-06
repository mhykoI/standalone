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
        if (typeof modules2[moduleId] == "function") {
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
  var discord_button_default = {
    /** @param {import("vue").App} vueApp */
    load(vueApp) {
      const buttonClasses = webpack_default.findByProperties("lowSaturationUnderline", "button", "disabledButtonOverlay");
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
  var discord_check_default = {
    /** @param {import("vue").App} vueApp */
    load(vueApp) {
      const checkClasses = webpack_default.findByProperties("checked", "container", "slider");
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
  var discord_input_default = {
    /** @param {import("vue").App} vueApp */
    load(vueApp) {
      let inputClasses = webpack_default.findByProperties("inputDefault", "copyInput");
      let inputClasses2 = webpack_default.findByProperties("input", "editable", "disabled", "inputWrapper");
      vueApp.component("discord-input", {
        template: `
        <div class="${inputClasses2?.input}">
          <div class="${inputClasses?.inputWrapper}">
            <input :type="type ?? 'text'" class="${inputClasses?.inputDefault}" :value="modelValue" :placeholder="placeholder" :maxlength="maxlength" :min="min" :step="step" :max="max" :style="style" @input="onInput" />
          </div>
        </div>
      `,
        props: ["modelValue", "placeholder", "type", "maxlength", "max", "min", "step", "style"],
        emits: ["input", "update:modelValue"],
        methods: {
          onInput(event) {
            this.$emit("update:modelValue", event.target.value);
            this.$emit("input", { event, value: event.target.value });
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
  var discord_select_default = {
    /** @param {import("vue").App} vueApp */
    load(vueApp) {
      const selectClasses = webpack_default.findByProperties("select", "searchableSelect", "multiSelectCheck");
      const scrollClasses = webpack_default.findByProperties("managedReactiveScroller", "scrollerBase", "thin");
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
  var discord_textarea_default = {
    /** @param {import("vue").App} vueApp */
    load(vueApp) {
      let inputClasses = webpack_default.findByProperties("textArea", "maxLength", "characterCount");
      let inputClasses2 = webpack_default.findByProperties("inputWrapper", "inputDefault");
      let scrollClasses = webpack_default.findByProperties("scrollbarDefault", "scrollbar", "scrollbarGhost");
      vueApp.component("discord-textarea", {
        template: `
        <div class="${inputClasses2.inputWrapper} acord--discord-textarea">
          <textarea class="${inputClasses2.inputDefault} ${inputClasses.textArea} ${scrollClasses.scrollbarDefault}" :value="modelValue" :placeholder="placeholder" :maxlength="maxlength" :cols="cols" :rows="rows" :style="style" @input="onInput"></textarea>
        </div>
      `,
        props: ["modelValue", "placeholder", "maxlength", "style", "cols", "rows"],
        emits: ["input", "update:modelValue"],
        methods: {
          onInput(event) {
            this.$emit("update:modelValue", event.target.value);
            this.$emit("input", { event, value: event.target.value });
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
      get shared() {
        if (manifest?.api?.shared || devMode)
          return shared_default;
        return null;
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
      loaded: nests2.make({}),
      config: {}
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
      let loadedBefore = false;
      if (out2.__cache__.loaded.ghost[url]) {
        loadedBefore = true;
        await out2.unload(url);
      }
      out2.storage.installed.store[url] = {
        manifest,
        source: source2,
        readme,
        config: data.config,
        extra: {
          lastUpdatedAt: Date.now()
        }
      };
      if (loadedBefore) {
        await new Promise((resolve) => setTimeout(resolve, 1));
        await out2.load(url);
      }
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
          let onPersistUpdate = function(eventName, { path, value } = {}) {
            if (path[0] === "settings") {
              let item = findInTree(out2.__cache__.config[id], (i) => i.id === path[1]);
              let val = eventName === "DELETE" ? null : value;
              if (item.inputType === "number")
                val = Number(val);
              if (item)
                item.value = val;
            }
          }, unload = function() {
            offConfigListener();
            api2.extension.subscriptions.forEach((i) => {
              if (typeof i === "function")
                i();
            });
            api2.extension.events.emit("unload");
            evaluated?.unload?.();
            api2.extension.persist.off("UPDATE", onPersistUpdate);
            api2.extension.persist.off("DELETE", onPersistUpdate);
            api2.extension.persist.off("SET", onPersistUpdate);
          };
          let api2 = await buildPluginAPI(data.manifest, `Extension;Persist;${id}`);
          if (api2.extension.persist.ghost.settings === void 0)
            api2.extension.persist.store.settings = {};
          await ui_default.vue.ready.when();
          out2.__cache__.config[id] = Vue.reactive(JSON.parse(JSON.stringify(data.manifest.config)));
          findInTree(out2.__cache__.config[id], (i) => i.id, { all: true }).forEach(
            (i) => {
              api2.extension.persist.store.settings[i.id] = api2.extension.persist.ghost?.settings?.[i.id] ?? i.default;
              i.value = api2.extension.persist.ghost?.settings?.[i.id];
            }
          );
          let evaluated = out2.evaluate(data.source, api2);
          await evaluated?.load?.();
          api2.extension.persist.on("UPDATE", onPersistUpdate);
          api2.extension.persist.on("DELETE", onPersistUpdate);
          api2.extension.persist.on("SET", onPersistUpdate);
          const offConfigListener = events_default.on("ExtensionConfigInteraction", (data2) => {
            if (data2.extension !== id)
              return;
            function save() {
              if (!data2.item.id)
                return false;
              let val = data2.item.value ?? data2.data.value;
              if (data2.item.inputType === "number")
                val = Number(val);
              api2.extension.persist.store.settings[data2.item.id] = val;
              return true;
            }
            save();
            if (data2.item.id) {
              api2.extension.persist.store.settings[data2.item.id] = data2.item.value ?? data2.data.value;
            }
            evaluated?.config?.({
              item: data2.item,
              data: data2.data,
              getItem(itemId) {
                return findInTree(out2.__cache__.config[id], (i) => i.id === itemId);
              },
              getItems() {
                return findInTree(out2.__cache__.config[id], (i) => i.id, { all: true });
              },
              save
            });
          });
          out2.__cache__.loaded.store[id] = { evaluated, api: api2, unload };
          events_default.emit("ExtensionLoaded", { id });
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
          out2.__cache__.config[id] = JSON.parse(JSON.stringify(data.manifest.config));
          findInTree(out2.__cache__.config[id], (i) => i.id, { all: true }).forEach(
            (i) => {
              persist.store.settings[i.id] = persist.ghost?.settings?.[i.id] ?? i.default;
              i.value = persist.ghost?.settings?.[i.id];
            }
          );
          let cssText = evaluated();
          let injectedRes = patcher_default.injectCSS(cssText, persist.ghost.settings);
          const offConfigListener = events_default.on("ExtensionConfigInteraction", (data2) => {
            if (data2.extension !== id)
              return;
            if (!data2.item.id)
              return;
            persist.store.settings[data2.item.id] = data2.data.value;
            injectedRes(persist.ghost.settings);
          });
          out2.__cache__.loaded.store[id] = { evaluated, unload };
          events_default.emit("ExtensionLoaded", { id });
          return { evaluated, unload };
        }
      },
      unload(id) {
        out2.__cache__.loaded.ghost?.[id]?.unload?.();
        delete out2.__cache__.loaded.store[id];
        delete out2.__cache__.config[id];
        events_default.emit("ExtensionUnloaded", { id });
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
  function devError(api2) {
    return new Error(`The ${api2} API can only be accessed when Dev mode is enabled!`);
  }
  var api_default = {
    exposedAPI: {
      dev: dev_default,
      get utils() {
        if (!dev_default.enabled)
          throw devError("Utils");
        return utils_default;
      },
      get i18n() {
        if (!dev_default.enabled)
          throw devError("i18n");
        return i18n_default;
      },
      get events() {
        if (!dev_default.enabled)
          throw devError("Events");
        return events_default;
      },
      get ui() {
        if (!dev_default.enabled)
          throw devError("UI");
        return ui_default;
      },
      get shared() {
        if (!dev_default.enabled)
          throw devError("Shared");
        return shared_default;
      },
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
.acord--installed-extensions-page{display:flex;align-items:flex-start;justify-content:center;padding:0 16px}.acord--installed-extensions-page .container{width:100%;max-width:1024px;display:flex;flex-direction:column}.acord--installed-extensions-page .container>.top{display:flex;align-items:center;gap:8px}.acord--installed-extensions-page .container>.top>.search{width:80%}.acord--installed-extensions-page .container>.top>.category{width:20%}.acord--installed-extensions-page .container>.bottom{display:flex;flex-direction:column;gap:16px;margin-top:16px}`;

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
              <div class="bottom">
                <installed-extension-card v-for="(extension, id) of filteredExtensions" :id="id" :extension="extension" :key="id" />
              </div>
            </div>
          </div>
        `,
          data() {
            return {
              searchText: "",
              searchCategoryText: "all",
              extensions: {},
              filteredExtensions: {}
            };
          },
          methods: {
            onStorageUpdate() {
              this.extensions = extensions_default.storage.installed.ghost;
              this.updateFiltered();
              this.$forceUpdate();
            },
            i18nFormat: i18n_default.format,
            updateFiltered() {
              if (!this.searchText)
                return this.filteredExtensions = this.extensions;
              const searchText = this.searchText.toLowerCase();
              const searchCategoryText = this.searchCategoryText;
              this.filteredExtensions = Object.fromEntries(
                Object.entries(this.extensions).filter(([id, extension2]) => {
                  if (searchCategoryText === "all")
                    return true;
                  return extension2.manifest.type === searchCategoryText;
                }).filter(([id, extension2]) => {
                  if (!searchText)
                    return true;
                  return i18n_default.localize(extension2.manifest.about.name).toLowerCase().includes(searchText) || i18n_default.localize(extension2.manifest.about.description).toLowerCase().includes(searchText);
                })
              );
            }
          },
          watch: {
            searchText() {
              this.updateFiltered();
            },
            searchCategoryText() {
              this.updateFiltered();
            }
          },
          mounted() {
            this.onStorageUpdate();
            this.updateFiltered();
            extensions_default.storage.installed.on("UPDATE", this.onStorageUpdate);
            extensions_default.storage.installed.on("SET", this.onStorageUpdate);
            extensions_default.storage.installed.on("DELETE", this.onStorageUpdate);
          },
          unmounted() {
            extensions_default.storage.installed.off("UPDATE", this.onStorageUpdate);
            extensions_default.storage.installed.off("SET", this.onStorageUpdate);
            extensions_default.storage.installed.off("DELETE", this.onStorageUpdate);
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
              "ExtensionConfigInteraction",
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
              "ExtensionConfigInteraction",
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
          }" :style="{'width': item?.width ?? '100%', 'height': item?.height, 'gap': item?.gap}" >
            <component v-for="(child, idx) in item.children" :is="nameMap[child.type]" :key="idx" :item="child" :extension="extension" />
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
          {{item.value}}
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
          <discord-input @input="onInput" v-model="item.value" :type="item.inputType" :placeholder="item.placeholder" :maxlength="item.maxlength"  :max="item.max" :min="item.min" :step="item.step" />
        </div>
      `,
        methods: {
          onInput(data) {
            events_default.emit(
              "ExtensionConfigInteraction",
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
          {{item.value}}
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
          }" :style="{'width': item?.width ?? '100%', 'height': item?.height, 'gap': item?.gap}" >
            <component v-for="(child, idx) in item.children" :is="nameMap[child.type]" :key="idx" :item="child" :extension="extension" />
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
              "ExtensionConfigInteraction",
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
          <discord-textarea @input="onInput" v-model="item.value" :type="item.inputType" :placeholder="item.placeholder" :maxlength="item.maxlength" :cols="item.cols" :rows="item.rows" :style="{'height': item?.height, 'width': item?.width}" />
        </div>
      `,
        methods: {
          onInput(data) {
            events_default.emit(
              "ExtensionConfigInteraction",
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
.acord--config-item{width:100%;display:flex}.acord--config-row{width:100%;display:flex;flex-direction:row;justify-content:space-between;align-items:center;gap:4px}.acord--config-row.horizontal-align-left{justify-content:flex-start}.acord--config-row.horizontal-align-right{justify-content:flex-end}.acord--config-row.horizontal-align-center{justify-content:center}.acord--config-row.justify-space-between{justify-content:space-between}.acord--config-row.justify-space-around{justify-content:space-around}.acord--config-row.vertical-align-top{align-items:flex-start}.acord--config-row.vertical-align-bottom{align-items:flex-end}.acord--config-column{width:100%;display:flex;flex-direction:column;justify-content:flex-start;align-items:center;gap:4px}.acord--config-column.horizontal-align-left{justify-content:flex-start}.acord--config-column.horizontal-align-right{justify-content:flex-end}.acord--config-column.horizontal-align-center{justify-content:center}.acord--config-column.justify-space-between{justify-content:space-between}.acord--config-column.justify-space-around{justify-content:space-around}.acord--config-column.vertical-align-top{align-items:flex-start}.acord--config-column.vertical-align-bottom{align-items:flex-end}.acord--config-column.vertical-align-center{align-items:center}.acord--config-heading{font-size:1.2rem;font-weight:500;color:#f5f5f5}.acord--config-paragraph{font-size:1rem;font-weight:400;color:rgba(245,245,245,.85)}.acord--config-check,.acord--config-button{width:fit-content}`;

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
.acord--installed-extension-card{width:100%;background-color:#2c2e32;border-radius:8px;display:flex;flex-direction:column;gap:8px;position:relative}.acord--installed-extension-card>.status-container{position:absolute;top:-9px;right:8px;border-radius:9999px;padding:8px;height:24px;display:flex;gap:6px;align-items:center;background-color:#1e1f22}.acord--installed-extension-card>.status-container>.loaded-state{width:14px;height:14px;border-radius:50%;background-color:#82858f}.acord--installed-extension-card>.status-container>.loaded-state.active{background-color:#23a55a;filter:drop-shadow(0px 0px 4px #23a55a)}.acord--installed-extension-card>.status-container>.development-mode-warning{color:#f0b232;filter:drop-shadow(0px 0px 4px #f0b232);display:flex;align-items:center;justify-content:center;border-radius:50%}.acord--installed-extension-card>.top{background-color:#212225;border-radius:8px;width:100%;padding:16px;height:128px;display:flex;justify-content:space-between}.acord--installed-extension-card>.top>.left{display:flex;flex-direction:column;height:100%;gap:4px}.acord--installed-extension-card>.top>.left>.top{display:flex;align-items:flex-end;gap:4px}.acord--installed-extension-card>.top>.left>.top>.name{font-size:1.4rem;font-weight:500;color:#fff}.acord--installed-extension-card>.top>.left>.top>.version{font-size:1rem;font-weight:300;color:rgba(255,255,255,.5)}.acord--installed-extension-card>.top>.left>.bottom{display:flex;flex-direction:column;gap:8px}.acord--installed-extension-card>.top>.left>.bottom>.top{display:flex}.acord--installed-extension-card>.top>.left>.bottom>.top>.authors{display:flex;gap:2px;font-size:12px;font-weight:300;color:rgba(255,255,255,.45)}.acord--installed-extension-card>.top>.left>.bottom>.top>.authors>.label{font-weight:500;margin-right:2px}.acord--installed-extension-card>.top>.left>.bottom>.top>.authors .author{display:flex}.acord--installed-extension-card>.top>.left>.bottom>.top>.authors .author .hoverable:hover{cursor:pointer;text-decoration:underline}.acord--installed-extension-card>.top>.left>.bottom>.bottom>.description{font-size:16px;color:rgba(255,255,255,.75)}.acord--installed-extension-card>.top>.right{display:flex;height:100%;flex-direction:column;justify-content:space-between;align-items:flex-end}.acord--installed-extension-card>.top>.right>.top{display:flex}.acord--installed-extension-card>.top>.right>.top>.controls{display:flex;align-items:center;gap:8px}.acord--installed-extension-card>.top>.right>.top>.controls .control{display:flex;padding:8px;background-color:rgba(0,0,0,.25);border-radius:8px;color:#f5f5f5;cursor:pointer}.acord--installed-extension-card>.top>.right>.top>.controls .control:hover{background-color:rgba(0,0,0,.5)}.acord--installed-extension-card>.top>.right>.bottom{display:flex}.acord--installed-extension-card>.top>.right>.bottom>.settings{display:flex;align-items:center;justify-content:flex-end;cursor:pointer;font-weight:300;color:rgba(255,255,255,.75);gap:8px}.acord--installed-extension-card>.top>.right>.bottom>.settings svg{padding:4px;background-color:rgba(0,0,0,.25);border-radius:4px;color:#fff}.acord--installed-extension-card>.bottom{border-radius:8px;width:100%;padding:16px}`;

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
            <div class="status-container">
              <div class="loaded-state" :class="{'active': !!this.configCache}" :acord--tooltip-content="i18nFormat(!!this.configCache ? 'EXTENSION_ACTIVE' : 'EXTENSION_INACTIVE')"></div>
              <div v-if="extension.manifest.mode == 'development'" class="development-mode-warning" :acord--tooltip-content="i18nFormat('EXTENSION_IN_DEVELOPMENT_MODE')">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                  <path fill="currentColor" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-7v2h2v-2h-2zm0-8v6h2V7h-2z"/>
                </svg>
              </div>
            </div>
            <div class="top">
              <div class="left">
                <div class="top">
                  <div class="name">{{ i18nLocalize(extension.manifest.about.name) }}</div>
                  <div class="version">v{{extension.manifest.about.version}}</div>
                </div>
                <div class="bottom">
                  <div class="top">
                    <div class="authors">
                      <div class="label">{{ i18nFormat('AUTHORS') }}:</div>
                      <div v-for="(author, authorIdx) in extension.manifest.about.authors" class="author">
                        <div class="name" :class="{'hoverable': !!author.id}" @click="onAuthorClick(author)">{{ i18nLocalize(author.name) }}</div>
                        <div v-if="authorIdx != (extension.manifest.about.authors.length-1)" class="comma">,</div>
                      </div>
                    </div>
                  </div>
                  <div class="bottom">
                    <div class="description">{{ i18nLocalize(extension.manifest.about.description) }}</div>
                  </div>
                </div>
              </div>
              <div class="right">
                <div class="top">
                  <div class="controls">
                    <div class="control" @click="onUpdateExtension" :acord--tooltip-content="i18nFormat('UPDATE_EXTENSION')">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                        <path fill="currentColor" d="M5.463 4.433A9.961 9.961 0 0 1 12 2c5.523 0 10 4.477 10 10 0 2.136-.67 4.116-1.81 5.74L17 12h3A8 8 0 0 0 6.46 6.228l-.997-1.795zm13.074 15.134A9.961 9.961 0 0 1 12 22C6.477 22 2 17.523 2 12c0-2.136.67-4.116 1.81-5.74L7 12H4a8 8 0 0 0 13.54 5.772l.997 1.795z"/>
                      </svg>
                    </div>
                    <div class="control" @click="onUninstallExtension" :acord--tooltip-content="i18nFormat('UNINSTALL_EXTENSION')">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                        <path fill="currentColor" d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-9 3h2v6H9v-6zm4 0h2v6h-2v-6zM9 4v2h6V4H9z"/>
                      </svg>
                    </div>
                    <div class="control" @click="onToggleExtension" :acord--tooltip-content="i18nFormat(enabled ? 'DISABLE_EXTENSION' : 'ENABLE_EXTENSION')">
                      <svg v-if="!enabled" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                        <path fill="currentColor" d="M8 7a5 5 0 1 0 0 10h8a5 5 0 0 0 0-10H8zm0-2h8a7 7 0 0 1 0 14H8A7 7 0 0 1 8 5zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                      </svg>
                      <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                        <path fill="currentColor" d="M8 5h8a7 7 0 0 1 0 14H8A7 7 0 0 1 8 5zm8 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                      </svg>
                    </div>
                  </div>
                </div>
                <div class="bottom">
                  <div v-if="extension.manifest?.config?.length && !!configCache" class="settings" @click="expanded = !expanded">
                    <div class="text">{{i18nFormat(expanded ? 'HIDE_SETTINGS' : 'SHOW_SETTINGS')}}</div>
                    <svg v-if="!expanded" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                      <path fill="currentColor" d="M12 15l-4.243-4.243 1.415-1.414L12 12.172l2.828-2.829 1.415 1.414z"/>
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                      <path fill="currentColor" d="M12 11.828l-2.828 2.829-1.415-1.414L12 9l4.243 4.243-1.415 1.414L12 11.828z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="expanded" class="bottom">
              <config-column :extension="id" :item="{children: configCache, gap: '8px'}"/>
            </div>
          </div>
        `,
          data() {
            return {
              expanded: false,
              configCache: null,
              enabled: extensions_default.storage.installed.ghost[this.id].config.enabled
            };
          },
          methods: {
            i18nFormat: i18n_default.format,
            i18nLocalize: i18n_default.localize,
            onAuthorClick(author) {
              if (author.id)
                ui_default.modals.show.user(author.id);
            },
            onExtensionLoaded({ id }) {
              if (id === this.id) {
                this.configCache = extensions_default.__cache__.config[this.id];
              }
            },
            onExtensionUnloaded({ id }) {
              if (id === this.id) {
                this.configCache = null;
              }
            },
            onToggleExtension() {
              let enabled = extensions_default.storage.installed.ghost[this.id].config.enabled;
              let newState = !enabled;
              extensions_default.storage.installed.store[this.id].config.enabled = newState;
              this.enabled = newState;
              try {
                if (newState) {
                  extensions_default.load(this.id);
                } else {
                  extensions_default.unload(this.id);
                }
              } catch {
              }
            },
            onUpdateExtension() {
              extensions_default.update(this.id);
            },
            onUninstallExtension() {
              extensions_default.uninstall(this.id);
            }
          },
          props: ["id", "extension"],
          mounted() {
            this.configCache = extensions_default.__cache__.config[this.id];
            events_default.on("ExtensionLoaded", this.onExtensionLoaded);
            events_default.on("ExtensionUnloaded", this.onExtensionUnloaded);
          },
          unmounted() {
            events_default.off("ExtensionLoaded", this.onExtensionLoaded);
            events_default.off("ExtensionUnloaded", this.onExtensionUnloaded);
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
  (async () => {
    let headerItemClasses;
    while (true) {
      headerItemClasses = webpack_default.findByProperties("divider", "hamburger", "themed");
      if (headerItemClasses)
        break;
      await new Promise((r) => setTimeout(r, 100));
    }
    const tabBarClasses = webpack_default.findByProperties("tabBar", "maxWidthWithToolbar");
    const headerClasses = webpack_default.findByProperties("topPill", "headerText");
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
            buttonsContainer.appendChild(buildButton("store", i18n_default.format("STORE"), "store-tab-button"));
            container.appendChild(buttonsContainer);
          }
        }
      );
      utils_default.ifExists(
        elm.querySelector('[class*="headerBar-"] [class*="iconWrapper-"] [class*="icon-"]'),
        fillSVGElmWithAcordLogo
      );
    });
  })();
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibm9kZV9tb2R1bGVzL25lc3RzL2Nqcy9FdmVudHMuanMiLCAibm9kZV9tb2R1bGVzL25lc3RzL2Nqcy9FdmVudEVtaXR0ZXIuanMiLCAibm9kZV9tb2R1bGVzL25lc3RzL2Nqcy9tYWtlLmpzIiwgIm5vZGVfbW9kdWxlcy9uZXN0cy9janMvaW5kZXguanMiLCAic3JjL2RhdGEvY29tbW9uLmpzb24iLCAic3JjL2FwaS91dGlscy9yYXcvZmluZC1pbi10cmVlLmpzIiwgInNyYy9hcGkvdXRpbHMvbG9nZ2VyLmpzIiwgInNyYy9hcGkvdXRpbHMvcmVhY3QuanMiLCAic3JjL2FwaS91dGlscy9pbmRleC5qcyIsICJzcmMvYXBpL21vZHVsZXMvcmF3L2NvbXBsZXgtZmluZGVyLmpzIiwgInNyYy9hcGkvbW9kdWxlcy93ZWJwYWNrLmpzIiwgInNyYy9hcGkvbW9kdWxlcy9jb21tb24uanMiLCAic3JjL2FwaS9tb2R1bGVzL2luZGV4LmpzIiwgInNyYy9hcGkvaTE4bi9pbmRleC5qcyIsICJzcmMvb3RoZXIvdXRpbHMuanMiLCAic3JjL2xpYi9CYXNpY0V2ZW50RW1pdHRlci5qcyIsICJzcmMvYXBpL2V2ZW50cy9pbmRleC5qcyIsICJzcmMvYXBpL2RvbS9pbmRleC5qcyIsICJzcmMvbGliL3NwaXRyb2FzdC9kaXN0L2VzbS9zaGFyZWQuanMiLCAic3JjL2xpYi9zcGl0cm9hc3QvZGlzdC9lc20vaG9vay5qcyIsICJzcmMvbGliL3NwaXRyb2FzdC9kaXN0L2VzbS91bi1wYXRjaC5qcyIsICJzcmMvbGliL3NwaXRyb2FzdC9kaXN0L2VzbS9nZXQtcGF0Y2gtZnVuYy5qcyIsICJzcmMvbGliL3NwaXRyb2FzdC9kaXN0L2VzbS9pbmRleC5qcyIsICJzcmMvYXBpL3BhdGNoZXIvaW5kZXguanMiLCAic3JjL290aGVyL2xvYWRpbmctYW5pbWF0aW9uL3N0eWxlLnNjc3MiLCAic3JjL290aGVyL2xvYWRpbmctYW5pbWF0aW9uL2luZGV4LmpzIiwgInNyYy9hcGkvc3RvcmFnZS9pbmRleC5qcyIsICJub2RlX21vZHVsZXMvaWRiLWtleXZhbC9kaXN0L2luZGV4LmpzIiwgInNyYy9saWIvanNvbi1kZWN5Y2xlZC9pbmRleC5qcyIsICJzcmMvYXBpL2V4dGVuc2lvbnMvaTE4bi5qcyIsICJzcmMvYXBpL2V4dGVuc2lvbnMvaW5kZXguanMiLCAic3JjL2FwaS93ZWJzb2NrZXQvaW5kZXguanMiLCAic3JjL2FwaS91aS9zdHlsZXMuc2NzcyIsICJzcmMvYXBpL3VpL3Rvb2x0aXBzLmpzIiwgInNyYy9hcGkvdWkvbm90aWZpY2F0aW9ucy5qcyIsICJzcmMvYXBpL3VpL2NvbnRleHRNZW51cy5qcyIsICJzcmMvbGliL2NvbXBvbmVudHMvRXJyb3JCb3VuZGFyeS5qc3giLCAic3JjL2FwaS91aS9jb21wb25lbnRzLmpzIiwgInNyYy9hcGkvdWkvbW9kYWxzLmpzeCIsICJzcmMvYXBpL3VpL3RvYXN0cy5qcyIsICJzcmMvYXBpL3VpL3Z1ZS9jb21wb25lbnRzL2Rpc2NvcmQtYnV0dG9uL2luZGV4LmpzIiwgInNyYy9hcGkvdWkvdnVlL2NvbXBvbmVudHMvZGlzY29yZC1jaGVjay9zdHlsZS5zY3NzIiwgInNyYy9hcGkvdWkvdnVlL2NvbXBvbmVudHMvZGlzY29yZC1jaGVjay9pbmRleC5qcyIsICJzcmMvYXBpL3VpL3Z1ZS9jb21wb25lbnRzL2Rpc2NvcmQtaW5wdXQvaW5kZXguanMiLCAic3JjL2FwaS91aS92dWUvY29tcG9uZW50cy9kaXNjb3JkLXNlbGVjdC9zdHlsZS5zY3NzIiwgInNyYy9hcGkvdWkvdnVlL2NvbXBvbmVudHMvZGlzY29yZC1zZWxlY3QvaW5kZXguanMiLCAic3JjL2FwaS91aS92dWUvY29tcG9uZW50cy9kaXNjb3JkLXRleHRhcmVhL3N0eWxlLnNjc3MiLCAic3JjL2FwaS91aS92dWUvY29tcG9uZW50cy9kaXNjb3JkLXRleHRhcmVhL2luZGV4LmpzIiwgInNyYy9hcGkvdWkvdnVlL2NvbXBvbmVudHMvaW5kZXguanMiLCAic3JjL2FwaS91aS92dWUvdXRpbHMvcmVjb21wdXRlLmpzIiwgInNyYy9hcGkvdWkvdnVlL2luZGV4LmpzIiwgInNyYy9hcGkvdWkvaW5kZXguanMiLCAic3JjL2FwaS9zaGFyZWQvaW5kZXguanMiLCAic3JjL2FwaS9kZXYvaW5kZXguanMiLCAic3JjL2FwaS9pbnRlcm5hbC9pbmRleC5qcyIsICJzcmMvYXBpL2luZGV4LmpzIiwgInNyYy9vdGhlci9kb2N1bWVudC10aXRsZS1jaGFuZ2UuanMiLCAic3JjL290aGVyL3dlYnNvY2tldC10cmlnZ2Vycy5qcyIsICJzcmMvdWkvaG9tZS9zdHlsZS5zY3NzIiwgInNyYy91aS9ob21lL3Z1ZS9jb21wb25lbnRzL3BhZ2VzL2hvbWUtcGFnZS9pbmRleC5qcyIsICJzcmMvdWkvaG9tZS92dWUvY29tcG9uZW50cy9wYWdlcy9pbnN0YWxsZWQtZXh0ZW5zaW9ucy1wYWdlL3N0eWxlLnNjc3MiLCAic3JjL3VpL2hvbWUvdnVlL2NvbXBvbmVudHMvcGFnZXMvaW5zdGFsbGVkLWV4dGVuc2lvbnMtcGFnZS9pbmRleC5qcyIsICJzcmMvdWkvaG9tZS92dWUvY29tcG9uZW50cy9wYWdlcy9zZXR0aW5ncy1wYWdlL2luZGV4LmpzIiwgInNyYy91aS9ob21lL3Z1ZS9jb21wb25lbnRzL3BhZ2VzL3N0b3JlLXBhZ2UvaW5kZXguanMiLCAic3JjL3VpL2hvbWUvdnVlL2NvbXBvbmVudHMvcGFnZXMvaW5kZXguanMiLCAic3JjL3VpL2hvbWUvdnVlL2NvbXBvbmVudHMvY29tcG9uZW50cy9jb25maWcvY29uZmlnLWJ1dHRvbi9pbmRleC5qcyIsICJzcmMvdWkvaG9tZS92dWUvY29tcG9uZW50cy9jb21wb25lbnRzL2NvbmZpZy9jb25maWctY2hlY2svaW5kZXguanMiLCAic3JjL3VpL2hvbWUvdnVlL2NvbXBvbmVudHMvY29tcG9uZW50cy9jb25maWcvbWFwcy5qc29uIiwgInNyYy91aS9ob21lL3Z1ZS9jb21wb25lbnRzL2NvbXBvbmVudHMvY29uZmlnL2NvbmZpZy1jb2x1bW4vaW5kZXguanMiLCAic3JjL3VpL2hvbWUvdnVlL2NvbXBvbmVudHMvY29tcG9uZW50cy9jb25maWcvY29uZmlnLWhlYWRpbmcvaW5kZXguanMiLCAic3JjL3VpL2hvbWUvdnVlL2NvbXBvbmVudHMvY29tcG9uZW50cy9jb25maWcvY29uZmlnLWlucHV0L2luZGV4LmpzIiwgInNyYy91aS9ob21lL3Z1ZS9jb21wb25lbnRzL2NvbXBvbmVudHMvY29uZmlnL2NvbmZpZy1wYXJhZ3JhcGgvaW5kZXguanMiLCAic3JjL3VpL2hvbWUvdnVlL2NvbXBvbmVudHMvY29tcG9uZW50cy9jb25maWcvY29uZmlnLXJvdy9pbmRleC5qcyIsICJzcmMvdWkvaG9tZS92dWUvY29tcG9uZW50cy9jb21wb25lbnRzL2NvbmZpZy9jb25maWctc2VsZWN0L2luZGV4LmpzIiwgInNyYy91aS9ob21lL3Z1ZS9jb21wb25lbnRzL2NvbXBvbmVudHMvY29uZmlnL2NvbmZpZy1zcGFjZXIvaW5kZXguanMiLCAic3JjL3VpL2hvbWUvdnVlL2NvbXBvbmVudHMvY29tcG9uZW50cy9jb25maWcvY29uZmlnLXRleHRhcmVhL2luZGV4LmpzIiwgInNyYy91aS9ob21lL3Z1ZS9jb21wb25lbnRzL2NvbXBvbmVudHMvY29uZmlnL3N0eWxlLnNjc3MiLCAic3JjL3VpL2hvbWUvdnVlL2NvbXBvbmVudHMvY29tcG9uZW50cy9jb25maWcvaW5kZXguanMiLCAic3JjL3VpL2hvbWUvdnVlL2NvbXBvbmVudHMvY29tcG9uZW50cy9jYXJkcy9pbnN0YWxsZWQtZXh0ZW5zaW9uLWNhcmQvc3R5bGUuc2NzcyIsICJzcmMvdWkvaG9tZS92dWUvY29tcG9uZW50cy9jb21wb25lbnRzL2NhcmRzL2luc3RhbGxlZC1leHRlbnNpb24tY2FyZC9pbmRleC5qcyIsICJzcmMvdWkvaG9tZS92dWUvY29tcG9uZW50cy9jb21wb25lbnRzL2NhcmRzL3N0b3JlLWV4dGVuc2lvbi1jYXJkL3N0eWxlLnNjc3MiLCAic3JjL3VpL2hvbWUvdnVlL2NvbXBvbmVudHMvY29tcG9uZW50cy9jYXJkcy9zdG9yZS1leHRlbnNpb24tY2FyZC9pbmRleC5qcyIsICJzcmMvdWkvaG9tZS92dWUvY29tcG9uZW50cy9jb21wb25lbnRzL2NhcmRzL2luZGV4LmpzIiwgInNyYy91aS9ob21lL3Z1ZS9jb21wb25lbnRzL2NvbXBvbmVudHMvaW5kZXguanMiLCAic3JjL3VpL2hvbWUvdnVlL2NvbXBvbmVudHMvaW5kZXguanMiLCAic3JjL3VpL2hvbWUvaW5kZXguanMiLCAic3JjL3VpL290aGVyL2luZGV4LmpzIiwgInNyYy9pbmRleC5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5kZWZhdWx0ID0gT2JqZWN0LmZyZWV6ZSh7XHJcbiAgICBHRVQ6IFwiR0VUXCIsXHJcbiAgICBTRVQ6IFwiU0VUXCIsXHJcbiAgICBERUxFVEU6IFwiREVMRVRFXCIsXHJcbiAgICBVUERBVEU6IFwiVVBEQVRFXCIsXHJcbn0pO1xyXG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgRXZlbnRzXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vRXZlbnRzXCIpKTtcclxuY2xhc3MgRXZlbnRFbWl0dGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMubGlzdGVuZXJzID0gT2JqZWN0LnZhbHVlcyhFdmVudHNfMS5kZWZhdWx0KS5yZWR1Y2UoKGFjYywgdmFsKSA9PiAoKGFjY1t2YWxdID0gbmV3IFNldCgpKSwgYWNjKSwge30pO1xyXG4gICAgICAgIHRoaXMub24gPSBmdW5jdGlvbiAoZXZlbnQsIGxpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxpc3RlbmVyc1tldmVudF0uaGFzKGxpc3RlbmVyKSkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoYFRoaXMgbGlzdGVuZXIgb24gJHtldmVudH0gYWxyZWFkeSBleGlzdHMuYCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5saXN0ZW5lcnNbZXZlbnRdLmFkZChsaXN0ZW5lcik7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLm9uY2UgPSBmdW5jdGlvbiAoZXZlbnQsIGxpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG9uY2VMaXN0ZW5lciA9IChldmVudCwgZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vZmYoZXZlbnQsIG9uY2VMaXN0ZW5lcik7XHJcbiAgICAgICAgICAgICAgICBsaXN0ZW5lcihldmVudCwgZGF0YSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMub24oZXZlbnQsIG9uY2VMaXN0ZW5lcik7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLm9mZiA9IGZ1bmN0aW9uIChldmVudCwgbGlzdGVuZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5saXN0ZW5lcnNbZXZlbnRdLmRlbGV0ZShsaXN0ZW5lcik7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmVtaXQgPSBmdW5jdGlvbiAoZXZlbnQsIGRhdGEpIHtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBsaXN0ZW5lciBvZiB0aGlzLmxpc3RlbmVyc1tldmVudF0pIHtcclxuICAgICAgICAgICAgICAgIGxpc3RlbmVyKGV2ZW50LCBkYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgZm9yIChjb25zdCBldmVudCBvZiBPYmplY3QudmFsdWVzKEV2ZW50c18xLmRlZmF1bHQpKSB7XHJcbiAgICAgICAgICAgIHRoaXNbZXZlbnQudG9Mb3dlckNhc2UoKV0gPSAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KGV2ZW50LCBkYXRhKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5kZWZhdWx0ID0gRXZlbnRFbWl0dGVyO1xyXG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgRXZlbnRFbWl0dGVyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vRXZlbnRFbWl0dGVyXCIpKTtcclxuZnVuY3Rpb24gbWFrZShcclxuLy8gVGhpcyBjYW4gYmUgc2FmZWx5IGlnbm9yZWQsIHRoZSBEYXRhIHdpbGwgYWx3YXlzIGJlIGFuIG9iamVjdCBvciBpdCB3b24ndCB3b3JrIGFueXdheS5cclxuLy8gQHRzLWlnbm9yZVxyXG5kYXRhID0ge30sIHsgbmVzdEFycmF5cyA9IHRydWUsIH0gPSB7fSkge1xyXG4gICAgY29uc3QgZW1pdHRlciA9IG5ldyBFdmVudEVtaXR0ZXJfMS5kZWZhdWx0KCk7XHJcbiAgICBmdW5jdGlvbiBjcmVhdGVQcm94eSh0YXJnZXQsIHJvb3QsIHBhdGgpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb3h5KHRhcmdldCwge1xyXG4gICAgICAgICAgICBnZXQodGFyZ2V0LCBwcm9wZXJ0eSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbmV3UGF0aCA9IFsuLi5wYXRoLCBwcm9wZXJ0eV07XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHRhcmdldFtwcm9wZXJ0eV07XHJcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVtaXR0ZXIuZ2V0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogbmV3UGF0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUsXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFuZXN0QXJyYXlzICYmIEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY3JlYXRlUHJveHkodmFsdWUsIHJvb3QsIG5ld1BhdGgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY3JlYXRlUHJveHkoKHRhcmdldFtwcm9wZXJ0eV0gPSB7fSksIHJvb3QsIG5ld1BhdGgpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQodGFyZ2V0LCBwcm9wZXJ0eSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHRhcmdldFtwcm9wZXJ0eV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIGVtaXR0ZXIuc2V0KHtcclxuICAgICAgICAgICAgICAgICAgICBwYXRoOiBbLi4ucGF0aCwgcHJvcGVydHldLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvLyBUaGlzIG5lZWRzIHRvIHJldHVybiB0cnVlIG9yIGl0IGVycm9ycy4gL3NocnVnXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGVsZXRlUHJvcGVydHkodGFyZ2V0LCBwcm9wZXJ0eSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRlbGV0ZSB0YXJnZXRbcHJvcGVydHldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZW1pdHRlci5kZWxldGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRoOiBbLi4ucGF0aCwgcHJvcGVydHldLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBoYXModGFyZ2V0LCBwcm9wZXJ0eSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0YXJnZXRbcHJvcGVydHldID09PSBcIm9iamVjdFwiICYmXHJcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmtleXModGFyZ2V0W3Byb3BlcnR5XSkubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb3BlcnR5IGluIHRhcmdldDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHsgc3RvcmU6IGNyZWF0ZVByb3h5KGRhdGEsIGRhdGEsIFtdKSwgXHJcbiAgICAgICAgLy8gVGhpcyBjYW4gYmUgc2FmZWx5IGlnbm9yZWQsIHRoZSBEYXRhIHdpbGwgYWx3YXlzIGJlIGFuIG9iamVjdCBvciBpdCB3b24ndCB3b3JrIGFueXdheS5cclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgZ2hvc3Q6IGRhdGEgfSwgZW1pdHRlcik7XHJcbn1cclxuZXhwb3J0cy5kZWZhdWx0ID0gbWFrZTtcclxuIiwgIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMubWFrZSA9IGV4cG9ydHMuRXZlbnRzID0gdm9pZCAwO1xyXG52YXIgRXZlbnRzXzEgPSByZXF1aXJlKFwiLi9FdmVudHNcIik7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkV2ZW50c1wiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gX19pbXBvcnREZWZhdWx0KEV2ZW50c18xKS5kZWZhdWx0OyB9IH0pO1xyXG52YXIgbWFrZV8xID0gcmVxdWlyZShcIi4vbWFrZVwiKTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwibWFrZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gX19pbXBvcnREZWZhdWx0KG1ha2VfMSkuZGVmYXVsdDsgfSB9KTtcclxuIiwgIntcclxuICBcImNvbW1vblwiOiB7XHJcbiAgICBcIm1vZGFsc1wiOiB7XHJcbiAgICAgIFwiY29tcG9uZW50c1wiOiB7XHJcbiAgICAgICAgXCJvdGhlclwiOiB7XHJcbiAgICAgICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICBcIkhlYWRlclwiLFxyXG4gICAgICAgICAgICAgICAgXCJGb290ZXJcIlxyXG4gICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIlJvb3RcIjoge1xyXG4gICAgICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICAgICAgXCJpblwiOiBcInN0cmluZ3NcIixcclxuICAgICAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgXCJFTlRFUklOR1wiLFxyXG4gICAgICAgICAgICAgICAgXCJoZWFkZXJJZFwiXHJcbiAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICAgICAgXCJiZWZvcmVcIjogW1xyXG4gICAgICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgICAgICBcIlJvb3RcIlxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgXCJtYXBcIjoge1xyXG4gICAgICAgICAgICBcIlJvb3RcIjogW1xyXG4gICAgICAgICAgICAgIFwiRU5URVJJTkdcIixcclxuICAgICAgICAgICAgICBcImhlYWRlcklkXCJcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgXCJhY3Rpb25zXCI6IHtcclxuICAgICAgICBcIm9wZW5cIjoge1xyXG4gICAgICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICAgICAgXCJpblwiOiBcInN0cmluZ3NcIixcclxuICAgICAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgXCJvbkNsb3NlQ2FsbGJhY2tcIixcclxuICAgICAgICAgICAgICAgIFwiTGF5ZXJcIlxyXG4gICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgICAgIFwiYmVmb3JlXCI6IFtcclxuICAgICAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICAgICAgXCJvcGVuXCJcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIFwibWFwXCI6IHtcclxuICAgICAgICAgICAgXCJvcGVuXCI6IFtcclxuICAgICAgICAgICAgICBcIm9uQ2xvc2VDYWxsYmFja1wiLFxyXG4gICAgICAgICAgICAgIFwiTGF5ZXJcIlxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImNsb3NlXCI6IHtcclxuICAgICAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgICAgIFwiaW5cIjogXCJzdHJpbmdzXCIsXHJcbiAgICAgICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgIFwib25DbG9zZUNhbGxiYWNrKClcIlxyXG4gICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgICAgIFwiYmVmb3JlXCI6IFtcclxuICAgICAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICAgICAgXCJjbG9zZVwiXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBcIm1hcFwiOiB7XHJcbiAgICAgICAgICAgIFwiY2xvc2VcIjogW1xyXG4gICAgICAgICAgICAgIFwib25DbG9zZUNhbGxiYWNrKClcIlxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJjb21wb25lbnRzXCI6IHtcclxuICAgICAgXCJCdXR0b25cIjoge1xyXG4gICAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgIFwiQm9yZGVyQ29sb3JzXCJcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICAgIFwiYmVmb3JlXCI6IFtcclxuICAgICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgICBdLFxyXG4gICAgICAgICAgXCJhZnRlclwiOiBcIkJ1dHRvblwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIm1hcFwiOiB7XHJcbiAgICAgICAgICBcIkJ1dHRvblwiOiBbXHJcbiAgICAgICAgICAgIFwiLkZJTExFRFwiLFxyXG4gICAgICAgICAgICBcIi5vbk1vdXNlTGVhdmVcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgXCJDb25maXJtYXRpb25Nb2RhbFwiOiB7XHJcbiAgICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgICAgXCJpblwiOiBcInN0cmluZ3NcIixcclxuICAgICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgXCIuY29uZmlybUJ1dHRvbkNvbG9yXCJcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJtYXBcIjoge1xyXG4gICAgICAgICAgXCJDb25maXJtYXRpb25Nb2RhbFwiOiBbXHJcbiAgICAgICAgICAgIFwiLmNvbmZpcm1CdXR0b25Db2xvclwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgICAgXCJiZWZvcmVcIjogW1xyXG4gICAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICAgIF0sXHJcbiAgICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgICAgXCJDb25maXJtYXRpb25Nb2RhbFwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBcIlRleHRcIjoge1xyXG4gICAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgICBcImZpbHRlclwiOiBcIiQ/LlNpemVzPy5TSVpFXzMyICYmICQuQ29sb3JzXCIsXHJcbiAgICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICAgIFwiYmVmb3JlXCI6IFtcclxuICAgICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBcIlRvb2x0aXBcIjoge1xyXG4gICAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICAgIFwiaW5cIjogXCJwcm90b3R5cGVzXCIsXHJcbiAgICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgIFwicmVuZGVyVG9vbHRpcFwiXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgICBcImJlZm9yZVwiOiBbXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgXCJNYXJrZG93blwiOiB7XHJcbiAgICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICAgIFwiZmlsdGVyXCI6IFwiJD8ucHJvdG90eXBlPy5yZW5kZXIgJiYgJC5ydWxlc1wiLFxyXG4gICAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJGbHV4RGlzcGF0Y2hlclwiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwiX2N1cnJlbnREaXNwYXRjaEFjdGlvblR5cGVcIixcclxuICAgICAgICAgICAgXCJkaXNwYXRjaFwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJSZWFjdFwiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwiY3JlYXRlRWxlbWVudFwiLFxyXG4gICAgICAgICAgICBcInVzZVN0YXRlXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIlJlc3RcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcImdldFwiLFxyXG4gICAgICAgICAgICBcInBvc3RcIixcclxuICAgICAgICAgICAgXCJnZXRBUElCYXNlVVJMXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIlJvdXRlclwiOiB7XHJcbiAgICAgIFwidHJhbnNpdGlvblRvXCI6IHtcclxuICAgICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgICBcImluXCI6IFwic3RyaW5nc1wiLFxyXG4gICAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICBcInRyYW5zaXRpb25UbyAtIFRyYW5zaXRpb25pbmcgdG8gXCJcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICAgIFwiYmVmb3JlXCI6IFtcclxuICAgICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgICBdLFxyXG4gICAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICAgIFwidHJhbnNpdGlvblRvXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwibWFwXCI6IHtcclxuICAgICAgICAgIFwidHJhbnNpdGlvblRvXCI6IFtcclxuICAgICAgICAgICAgXCJ0cmFuc2l0aW9uVG8gLSBUcmFuc2l0aW9uaW5nIHRvIFwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBcInJlcGxhY2VXaXRoXCI6IHtcclxuICAgICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgICBcImluXCI6IFwic3RyaW5nc1wiLFxyXG4gICAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICBcIlxcXCJSZXBsYWNpbmcgcm91dGUgd2l0aCBcXFwiXCJcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICAgIFwiYmVmb3JlXCI6IFtcclxuICAgICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgICBdLFxyXG4gICAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICAgIFwicmVwbGFjZVdpdGhcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJtYXBcIjoge1xyXG4gICAgICAgICAgXCJyZXBsYWNlV2l0aFwiOiBbXHJcbiAgICAgICAgICAgIFwiXFxcIlJlcGxhY2luZyByb3V0ZSB3aXRoIFxcXCJcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiRmx1eFwiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwiY29ubmVjdFN0b3Jlc1wiLFxyXG4gICAgICAgICAgICBcImRlc3Ryb3lcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiV2ViU29ja2V0XCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiBcIiQ/Ll9fcHJvdG9fXz8uaGFuZGxlQ29ubmVjdGlvblwiLFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYmVmb3JlXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiQWN0aXZpdHlBY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJzZW5kQWN0aXZpdHlJbnZpdGVcIixcclxuICAgICAgICAgICAgXCJ1cGRhdGVBY3Rpdml0eVwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJQcml2YXRlQ2hhbm5lbEFjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcIm9wZW5Qcml2YXRlQ2hhbm5lbFwiLFxyXG4gICAgICAgICAgICBcImVuc3VyZVByaXZhdGVDaGFubmVsXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIkFja0FjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImluXCI6IFwic3RyaW5nc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcInR5cGU6XFxcIkJVTEtfQUNLXFxcIlwiXHJcbiAgICAgICAgICBdLFxyXG4gICAgICAgICAgW11cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogdHJ1ZSxcclxuICAgICAgICBcImJlZm9yZVwiOiBcImV4cG9ydHNcIlxyXG4gICAgICB9LFxyXG4gICAgICBcIm1hcFwiOiB7XHJcbiAgICAgICAgXCJhY2tcIjogW1xyXG4gICAgICAgICAgXCJ0eXBlOlxcXCJDSEFOTkVMX0FDS1xcXCJcIixcclxuICAgICAgICAgIFwibWVzc2FnZUlkXCIsXHJcbiAgICAgICAgICBcImNoYW5uZWxJZFwiXHJcbiAgICAgICAgXSxcclxuICAgICAgICBcImJ1bGtBY2tcIjogW1xyXG4gICAgICAgICAgXCJ0eXBlOlxcXCJCVUxLX0FDS1xcXCJcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiQW5hbHl0aWNzQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwiaXNUaHJvdHRsZWRcIixcclxuICAgICAgICAgICAgXCJ0cmFja1wiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJBbmltYXRpb25BY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwic3ByaW5nXCIsXHJcbiAgICAgICAgICAgIFwiZGVjYXlcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiQ29ubmVjdGlvbkFjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcInNldFNob3dBY3Rpdml0eVwiLFxyXG4gICAgICAgICAgICBcInNldFZpc2liaWxpdHlcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiUlRDQ29ubmVjdGlvbkFjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcImdldENoYW5uZWxJZFwiLFxyXG4gICAgICAgICAgICBcImdldEd1aWxkSWRcIixcclxuICAgICAgICAgICAgXCJnZXRSVENDb25uZWN0aW9uSWRcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiRW1vamlBY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJ0cmFuc2xhdGVJbmxpbmVFbW9qaVRvU3Vycm9nYXRlc1wiLFxyXG4gICAgICAgICAgICBcInRyYW5zbGF0ZVN1cnJvZ2F0ZXNUb0lubGluZUVtb2ppXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIkVtb2ppU3RhdGVBY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJnZXRVUkxcIixcclxuICAgICAgICAgICAgXCJpc0Vtb2ppRGlzYWJsZWRcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiR3VpbGROb3RpZmljYXRpb25zQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwidXBkYXRlQ2hhbm5lbE92ZXJyaWRlU2V0dGluZ3NcIixcclxuICAgICAgICAgICAgXCJ1cGRhdGVHdWlsZE5vdGlmaWNhdGlvblNldHRpbmdzXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIkludGVybmFsUmVhY3RcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcImpzeFwiLFxyXG4gICAgICAgICAgICBcImpzeHNcIixcclxuICAgICAgICAgICAgXCJGcmFnbWVudFwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJMb2dpbkFjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcImxvZ2luXCIsXHJcbiAgICAgICAgICAgIFwibG9nb3V0XCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIlF1ZXJ5QWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwicXVlcnlFbW9qaVJlc3VsdHNcIixcclxuICAgICAgICAgICAgXCJxdWVyeUZyaWVuZHNcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiTWVzc2FnZUFjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcInJlY2VpdmVNZXNzYWdlXCIsXHJcbiAgICAgICAgICAgIFwic2VuZE1lc3NhZ2VcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiUHJlbWl1bUFjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcImlzUHJlbWl1bVwiLFxyXG4gICAgICAgICAgICBcImNhblVzZUVtb2ppc0V2ZXJ5d2hlcmVcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiVm9pY2VBY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJzZWxlY3RWb2ljZUNoYW5uZWxcIixcclxuICAgICAgICAgICAgXCJkaXNjb25uZWN0XCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIlR5cGluZ0FjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcInN0YXJ0VHlwaW5nXCIsXHJcbiAgICAgICAgICAgIFwic3RvcFR5cGluZ1wiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJHdWlsZEFjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcInNldENoYW5uZWxcIixcclxuICAgICAgICAgICAgXCJzZXRTZXJ2ZXJNdXRlXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIkludml0ZUFjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcImFjY2VwdEludml0ZVwiLFxyXG4gICAgICAgICAgICBcImFjY2VwdEludml0ZUFuZFRyYW5zaXRpb25Ub0ludml0ZUNoYW5uZWxcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiTWVkaWFFbmdpbmVBY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJ0b2dnbGVTZWxmRGVhZlwiLFxyXG4gICAgICAgICAgICBcInRvZ2dsZVNlbGZNdXRlXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcImkxOG5cIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcIl9yZXF1ZXN0ZWRMb2NhbGVcIixcclxuICAgICAgICAgICAgXCJnZXREZWZhdWx0TG9jYWxlXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcInV1aWRcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcInYxXCIsXHJcbiAgICAgICAgICAgIFwidjRcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiaGxqc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwiaGlnaGxpZ2h0QWxsXCIsXHJcbiAgICAgICAgICAgIFwiaGlnaGxpZ2h0XCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn0iLCAiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZmluZEluVHJlZShcclxuICB0cmVlLFxyXG4gIHNlYXJjaEZpbHRlcixcclxuICB7IHdhbGthYmxlID0gbnVsbCwgaWdub3JlID0gW10sIGxpbWl0ID0gMjU2LCBhbGwgPSBmYWxzZSB9ID0ge31cclxuKSB7XHJcbiAgbGV0IGl0ZXJhdGlvbiA9IDA7XHJcbiAgbGV0IGZvdW5kTGlzdCA9IFtdO1xyXG5cclxuICBmdW5jdGlvbiBkb1NlYXJjaCh0cmVlLCBzZWFyY2hGaWx0ZXIsIHsgd2Fsa2FibGUgPSBudWxsLCBpZ25vcmUgPSBbXSB9ID0ge30pIHtcclxuICAgIGl0ZXJhdGlvbiArPSAxO1xyXG4gICAgaWYgKGl0ZXJhdGlvbiA+IGxpbWl0KSByZXR1cm47XHJcblxyXG4gICAgaWYgKHR5cGVvZiBzZWFyY2hGaWx0ZXIgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgaWYgKHRyZWUuaGFzT3duUHJvcGVydHkoc2VhcmNoRmlsdGVyKSkge1xyXG4gICAgICAgIGlmIChhbGwpIGZvdW5kTGlzdC5wdXNoKHRyZWVbc2VhcmNoRmlsdGVyXSk7XHJcbiAgICAgICAgaWYgKCFhbGwpIHJldHVybiB0cmVlW3NlYXJjaEZpbHRlcl07XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoc2VhcmNoRmlsdGVyKHRyZWUpKSB7XHJcbiAgICAgIGlmIChhbGwpIGZvdW5kTGlzdC5wdXNoKHRyZWUpO1xyXG4gICAgICBpZiAoIWFsbCkgcmV0dXJuIHRyZWU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0cmVlKSByZXR1cm47XHJcblxyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkodHJlZSkpIHtcclxuICAgICAgZm9yIChjb25zdCBpdGVtIG9mIHRyZWUpIHtcclxuICAgICAgICBjb25zdCBmb3VuZCA9IGRvU2VhcmNoKGl0ZW0sIHNlYXJjaEZpbHRlciwgeyB3YWxrYWJsZSwgaWdub3JlIH0pO1xyXG4gICAgICAgIGlmIChmb3VuZCkgZm91bmRMaXN0LnB1c2goZm91bmQpO1xyXG4gICAgICAgIGlmIChmb3VuZCAmJiAhYWxsKSByZXR1cm4gZm91bmQ7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHRyZWUgPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgZm9yIChjb25zdCBrZXkgaW4gdHJlZSkge1xyXG4gICAgICAgIGlmICh3YWxrYWJsZSAhPSBudWxsICYmICF3YWxrYWJsZS5pbmNsdWRlcyhrZXkpKSBjb250aW51ZTtcclxuXHJcbiAgICAgICAgaWYgKGlnbm9yZS5pbmNsdWRlcyhrZXkpKSBjb250aW51ZTtcclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIGNvbnN0IGZvdW5kID0gZG9TZWFyY2godHJlZVtrZXldLCBzZWFyY2hGaWx0ZXIsIHtcclxuICAgICAgICAgICAgd2Fsa2FibGUsXHJcbiAgICAgICAgICAgIGlnbm9yZSxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgaWYgKGZvdW5kKSBmb3VuZExpc3QucHVzaChmb3VuZCk7XHJcbiAgICAgICAgICBpZiAoZm91bmQgJiYgIWFsbCkgcmV0dXJuIGZvdW5kO1xyXG4gICAgICAgIH0gY2F0Y2ggeyB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiBkb1NlYXJjaCh0cmVlLCBzZWFyY2hGaWx0ZXIsIHsgd2Fsa2FibGUsIGlnbm9yZSB9KSA/PyBmb3VuZExpc3Q7XHJcbn07XHJcbiIsICJmdW5jdGlvbiBidWlsZChwcmVmaXggPSBcIkFjb3JkXCIsIHR5cGUsIGNvbG9yKSB7XHJcbiAgcmV0dXJuICguLi5pbnB1dCkgPT4gY29uc29sZVt0eXBlXShcclxuICAgIGAlYyR7cHJlZml4fSVjYCxcclxuICAgIGBiYWNrZ3JvdW5kLWNvbG9yOiAke2NvbG9yfTsgY29sb3I6IHdoaXRlOyBib3JkZXItcmFkaXVzOiA0cHg7IHBhZGRpbmc6IDBweCA2cHggMHB4IDZweDsgZm9udC13ZWlnaHQ6IGJvbGRgLFxyXG4gICAgXCJcIixcclxuICAgIC4uLmlucHV0XHJcbiAgKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGxvZzogYnVpbGQoXCJBY29yZFwiLCBcImxvZ1wiLCBcIiMwMGZiYjBcIiksXHJcbiAgZGVidWc6IGJ1aWxkKFwiQWNvcmQgRGVidWdcIiwgXCJkZWJ1Z1wiLCBcIiMwMGZiYjBcIiksXHJcbiAgaW5mbzogYnVpbGQoXCJBY29yZCBJbmZvXCIsIFwibG9nXCIsIFwiIzgyYWFmZlwiKSxcclxuICB3YXJuOiBidWlsZChcIkFjb3JkIFdhcm5cIiwgXCJ3YXJuXCIsIFwiI2RlYmYxOFwiKSxcclxuICBlcnJvcjogYnVpbGQoXCJBY29yZCBFcnJvclwiLCBcImVycm9yXCIsIFwiI2VmNTg1OFwiKSxcclxuICBidWlsZFxyXG59IiwgImltcG9ydCBmaW5kSW5UcmVlIGZyb20gXCIuL3Jhdy9maW5kLWluLXRyZWUuanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBnZXRJbnN0YW5jZShub2RlKSB7XHJcbiAgICByZXR1cm4gT2JqZWN0LmVudHJpZXMobm9kZSkuZmluZChpID0+IGlbMF0uc3RhcnRzV2l0aChcIl9fcmVhY3RJbnRlcm5hbEluc3RhbmNlXCIpIHx8IGlbMF0uc3RhcnRzV2l0aChcIl9fcmVhY3RGaWJlclwiKSk/LlsxXTtcclxuICB9LFxyXG4gIGdldE93bmVySW5zdGFuY2Uobm9kZSkge1xyXG4gICAgbGV0IGluc3RhbmNlID0gdGhpcy5nZXRJbnN0YW5jZShub2RlKTtcclxuICAgIGZvciAobGV0IGVsID0gaW5zdGFuY2U7IGVsOyBlbCA9IGVsLnJldHVybilcclxuICAgICAgaWYgKGVsLnN0YXRlTm9kZT8uZm9yY2VVcGRhdGUpIHJldHVybiBlbC5zdGF0ZU5vZGU7XHJcbiAgfSxcclxuICBmaW5kSW5UcmVlKHRyZWUsIGZpbHRlcikge1xyXG4gICAgcmV0dXJuIGZpbmRJblRyZWUodHJlZSwgZmlsdGVyLCB7XHJcbiAgICAgIHdhbGthYmxlOiBbXCJwcm9wc1wiLCBcInN0YXRlXCIsIFwiY2hpbGRyZW5cIiwgXCJyZXR1cm5cIl1cclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgZ2V0Q29tcG9uZW50cyhub2RlKSB7XHJcbiAgICBjb25zdCBpbnN0YW5jZSA9IHRoaXMuZ2V0SW5zdGFuY2Uobm9kZSk7XHJcbiAgICBjb25zdCBjb21wb25lbnRzID0gW107XHJcbiAgICBsZXQgbGFzdEluc3RhbmNlID0gaW5zdGFuY2U7XHJcbiAgICB3aGlsZSAobGFzdEluc3RhbmNlICYmIGxhc3RJbnN0YW5jZS5yZXR1cm4pIHtcclxuICAgICAgaWYgKHR5cGVvZiBsYXN0SW5zdGFuY2UucmV0dXJuLnR5cGUgPT09IFwic3RyaW5nXCIpIGJyZWFrO1xyXG4gICAgICBpZiAobGFzdEluc3RhbmNlLnJldHVybi50eXBlKSBjb21wb25lbnRzLnB1c2gobGFzdEluc3RhbmNlLnJldHVybi50eXBlKTtcclxuICAgICAgbGFzdEluc3RhbmNlID0gbGFzdEluc3RhbmNlLnJldHVybjtcclxuICAgIH1cclxuICAgIHJldHVybiBjb21wb25lbnRzO1xyXG4gIH0sXHJcbiAgZ2V0U3RhdGVOb2Rlcyhub2RlKSB7XHJcbiAgICBjb25zdCBpbnN0YW5jZSA9IHRoaXMuZ2V0SW5zdGFuY2Uobm9kZSk7XHJcbiAgICBjb25zdCBzdGF0ZU5vZGVzID0gW107XHJcbiAgICBsZXQgbGFzdEluc3RhbmNlID0gaW5zdGFuY2U7XHJcbiAgICB3aGlsZSAobGFzdEluc3RhbmNlICYmIGxhc3RJbnN0YW5jZS5yZXR1cm4pIHtcclxuICAgICAgaWYgKGxhc3RJbnN0YW5jZS5yZXR1cm4uc3RhdGVOb2RlIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIGJyZWFrO1xyXG4gICAgICBpZiAobGFzdEluc3RhbmNlLnJldHVybi5zdGF0ZU5vZGUpXHJcbiAgICAgICAgc3RhdGVOb2Rlcy5wdXNoKGxhc3RJbnN0YW5jZS5yZXR1cm4uc3RhdGVOb2RlKTtcclxuICAgICAgbGFzdEluc3RhbmNlID0gbGFzdEluc3RhbmNlLnJldHVybjtcclxuICAgIH1cclxuICAgIHJldHVybiBzdGF0ZU5vZGVzO1xyXG4gIH0sXHJcbiAgZ2V0UHJvcHMoZWwsIGZpbHRlciA9IChpKSA9PiBpLCBtYXggPSAxMDAwMCkge1xyXG4gICAgY29uc3QgaW5zdGFuY2UgPSB0aGlzLmdldEluc3RhbmNlKGVsKTtcclxuXHJcbiAgICBpZiAoIWluc3RhbmNlPy5yZXR1cm4pIHJldHVybiBudWxsO1xyXG5cclxuICAgIGZvciAoXHJcbiAgICAgIGxldCBjdXJyZW50ID0gaW5zdGFuY2U/LnJldHVybiwgaSA9IDA7XHJcbiAgICAgIGkgPiBtYXggfHwgY3VycmVudCAhPT0gbnVsbDtcclxuICAgICAgY3VycmVudCA9IGN1cnJlbnQ/LnJldHVybiwgaSsrXHJcbiAgICApIHtcclxuICAgICAgaWYgKGN1cnJlbnQ/LnBlbmRpbmdQcm9wcyAmJiBmaWx0ZXIoY3VycmVudC5wZW5kaW5nUHJvcHMpKVxyXG4gICAgICAgIHJldHVybiBjdXJyZW50LnBlbmRpbmdQcm9wcztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9LFxyXG59IiwgImltcG9ydCBmaW5kSW5UcmVlIGZyb20gXCIuL3Jhdy9maW5kLWluLXRyZWUuanNcIjtcclxuaW1wb3J0IGxvZ2dlciBmcm9tIFwiLi9sb2dnZXIuanNcIjtcclxuaW1wb3J0IHJlYWN0IGZyb20gXCIuL3JlYWN0LmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgbG9nZ2VyLFxyXG4gIHJlYWN0LFxyXG4gIGZpbmRJblRyZWUsXHJcbiAgZm9ybWF0KHZhbCwgLi4uYXJncykge1xyXG4gICAgcmV0dXJuIGAke3ZhbH1gLnJlcGxhY2VBbGwoL3soXFxkKyl9L2csIChfLCBjYXApID0+IHtcclxuICAgICAgcmV0dXJuIGFyZ3NbTnVtYmVyKGNhcCldO1xyXG4gICAgfSk7XHJcbiAgfSxcclxuICBpbnRlcnZhbChjYiwgZHVyKSB7XHJcbiAgICBsZXQgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChjYiwgZHVyKTtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xyXG4gICAgfTtcclxuICB9LFxyXG4gIHRpbWVvdXQoY2IsIGR1cikge1xyXG4gICAgbGV0IHRpbWVvdXQgPSBzZXRUaW1lb3V0KGNiLCBkdXIpO1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xyXG4gICAgfTtcclxuICB9LFxyXG4gIGlmRXhpc3RzKHZhbCwgY2IpIHtcclxuICAgIGlmICh2YWwpIGNiKHZhbCk7XHJcbiAgfSxcclxuICBjb3B5VGV4dCh0ZXh0KSB7XHJcbiAgICBpZiAod2luZG93LkRpc2NvcmROYXRpdmUpIHtcclxuICAgICAgRGlzY29yZE5hdGl2ZS5jbGlwYm9hcmQuY29weSh0ZXh0KTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIG5hdmlnYXRvci5jbGlwYm9hcmQud3JpdGVUZXh0KHRleHQpLmNhdGNoKCgpID0+IHtcclxuICAgICAgY29uc3QgY29weUFyZWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGV4dGFyZWFcIik7XHJcblxyXG4gICAgICBjb3B5QXJlYS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcclxuICAgICAgY29weUFyZWEuc3R5bGUucG9zaXRpb24gPSBcImZpeGVkXCI7XHJcbiAgICAgIGNvcHlBcmVhLnN0eWxlLnRvcCA9IFwiMFwiO1xyXG4gICAgICBjb3B5QXJlYS5zdHlsZS5sZWZ0ID0gXCIwXCI7XHJcblxyXG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvcHlBcmVhKTtcclxuICAgICAgY29weUFyZWEuZm9jdXMoKTtcclxuICAgICAgY29weUFyZWEuc2VsZWN0KCk7XHJcblxyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKFwiY29weVwiKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGNvcHlBcmVhKTtcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgc2xlZXAobXMpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gc2V0VGltZW91dChyZXNvbHZlLCBtcykpO1xyXG4gIH0sXHJcbiAgbWFwUmVwbGFjZSh0ZXh0LCBtYXAgPSB7fSkge1xyXG4gICAgcmV0dXJuIChBcnJheS5pc0FycmF5KG1hcCkgPyBtYXAgOiBPYmplY3QuZW50cmllcyhtYXApKS5yZWR1Y2UoKGFsbCwgY3VycmVudCkgPT4gYWxsLnJlcGxhY2VBbGwoY3VycmVudFswXSwgY3VycmVudFsxXSksIHRleHQpO1xyXG4gIH0sXHJcbiAgZXNjYXBlUmVnZXgoc3RyKSB7XHJcbiAgICByZXR1cm4gc3RyXHJcbiAgICAgIC5yZXBsYWNlKC9bfFxcXFx7fSgpW1xcXV4kKyo/Ll0vZywgJ1xcXFwkJicpXHJcbiAgICAgIC5yZXBsYWNlKC8tL2csICdcXFxceDJkJyk7XHJcbiAgfVxyXG59IiwgImltcG9ydCB1dGlscyBmcm9tIFwiLi4vLi4vdXRpbHMvaW5kZXguanNcIjtcclxuaW1wb3J0IGxvZ2dlciBmcm9tIFwiLi4vLi4vdXRpbHMvbG9nZ2VyLmpzXCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gd3JhcEZpbHRlcihmaWx0ZXIpIHtcclxuICByZXR1cm4gKC4uLmFyZ3MpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGlmIChhcmdzWzBdPy5kb2N1bWVudCAmJiBhcmdzWzBdPy53aW5kb3cpIHJldHVybiBmYWxzZTtcclxuICAgICAgaWYgKGFyZ3NbMF0/LmRlZmF1bHQ/LnJlbW92ZSAmJiBhcmdzWzBdPy5kZWZhdWx0Py5zZXQgJiYgYXJnc1swXT8uZGVmYXVsdD8uY2xlYXIgJiYgYXJnc1swXT8uZGVmYXVsdD8uZ2V0ICYmICFhcmdzWzBdPy5kZWZhdWx0Py5zb3J0KSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIGlmIChhcmdzWzBdLnJlbW92ZSAmJiBhcmdzWzBdLnNldCAmJiBhcmdzWzBdLmNsZWFyICYmIGFyZ3NbMF0uZ2V0ICYmICFhcmdzWzBdLnNvcnQpIHJldHVybiBmYWxzZTtcclxuICAgICAgaWYgKGFyZ3NbMF0/LmRlZmF1bHQ/LmdldFRva2VuIHx8IGFyZ3NbMF0/LmRlZmF1bHQ/LmdldEVtYWlsIHx8IGFyZ3NbMF0/LmRlZmF1bHQ/LnNob3dUb2tlbikgcmV0dXJuIGZhbHNlO1xyXG4gICAgICBpZiAoYXJnc1swXT8uZ2V0VG9rZW4gfHwgYXJnc1swXT8uZ2V0RW1haWwgfHwgYXJnc1swXT8uc2hvd1Rva2VuKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIHJldHVybiBmaWx0ZXIoLi4uYXJncyk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGxvZ2dlci53YXJuKFwiTW9kdWxlIGZpbHRlciB0aHJldyBhbiBleGNlcHRpb24uXCIsIGZpbHRlciwgZXJyKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNoZWNrTW9kdWxlU3RyaW5ncyhtLCBzdHJpbmdzID0gW10sIGhhc05vdCkge1xyXG4gIGNvbnN0IGNoZWNrID0gKHMxLCBzMikgPT4ge1xyXG4gICAgcmV0dXJuIGhhc05vdCA/IHMxLnRvU3RyaW5nKCkuaW5kZXhPZihzMi50b1N0cmluZygpKSA9PSAtMSA6IHMxLnRvU3RyaW5nKCkuaW5kZXhPZihzMi50b1N0cmluZygpKSA+IC0xO1xyXG4gIH07XHJcbiAgcmV0dXJuIHN0cmluZ3MuZXZlcnkoaiA9PiB7XHJcbiAgICByZXR1cm4gY2hlY2sobT8udG9TdHJpbmc/LigpIHx8IFwiXCIsIGopXHJcbiAgICAgIHx8IGNoZWNrKG0/Ll9fb3JpZ2luYWxfXz8udG9TdHJpbmc/LigpIHx8IFwiXCIsIGopXHJcbiAgICAgIHx8IGNoZWNrKG0/LnR5cGU/LnRvU3RyaW5nPy4oKSB8fCBcIlwiLCBqKVxyXG4gICAgICB8fCBjaGVjayhtPy50eXBlPy5fX29yaWdpbmFsX18/LnRvU3RyaW5nPy4oKSB8fCBcIlwiLCBqKVxyXG4gICAgICB8fCBPYmplY3QuZW50cmllcyhbJ2Z1bmN0aW9uJywgJ29iamVjdCddLmluY2x1ZGVzKHR5cGVvZiBtPy5wcm90b3R5cGUpID8gdHlwZW9mIG0/LnByb3RvdHlwZSA6IHt9KS5maWx0ZXIoaSA9PiBpWzBdPy5pbmNsdWRlcz8uKFwicmVuZGVyXCIpKS5zb21lKGkgPT4gY2hlY2soaVsxXT8udG9TdHJpbmc/LigpIHx8IFwiXCIsIGopKVxyXG4gIH0pO1xyXG59O1xyXG5mdW5jdGlvbiBjaGVja01vZHVsZVByb3BzKG0sIHByb3BlcnRpZXMgPSBbXSwgaGFzTm90KSB7XHJcbiAgcmV0dXJuIHByb3BlcnRpZXMuZXZlcnkocHJvcCA9PiB7XHJcbiAgICBjb25zdCB2YWx1ZSA9IG1bcHJvcF0/Ll9fb3JpZ2luYWxfXyB8fCBtW3Byb3BdO1xyXG4gICAgcmV0dXJuIGhhc05vdCA/IHZhbHVlID09PSB1bmRlZmluZWQgOiAodmFsdWUgIT09IHVuZGVmaW5lZCAmJiAhKHR5cGVvZiB2YWx1ZSA9PSBcInN0cmluZ1wiICYmICF2YWx1ZSkpO1xyXG4gIH0pO1xyXG59O1xyXG5mdW5jdGlvbiBjaGVja01vZHVsZVByb3RvdHlwZXMobSwgcHJvdG9Qcm9wcyA9IFtdLCBoYXNOb3QpIHtcclxuICByZXR1cm4gbS5wcm90b3R5cGUgJiYgcHJvdG9Qcm9wcy5ldmVyeShwcm9wID0+IHtcclxuICAgIGNvbnN0IHZhbHVlID0gbS5wcm90b3R5cGVbcHJvcF07XHJcbiAgICByZXR1cm4gaGFzTm90ID8gdmFsdWUgPT09IHVuZGVmaW5lZCA6ICh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmICEodHlwZW9mIHZhbHVlID09IFwic3RyaW5nXCIgJiYgIXZhbHVlKSk7XHJcbiAgfSk7XHJcbn07XHJcblxyXG5jb25zdCB3ZWJwYWNrQ2h1bmtOYW1lID0gXCJ3ZWJwYWNrQ2h1bmtkaXNjb3JkX2FwcFwiO1xyXG5jb25zdCBwdXNoTGlzdGVuZXJzID0gbmV3IFNldCgpO1xyXG5cclxuXHJcbntcclxuICBsZXQgb2dQdXNoID0gd2luZG93W3dlYnBhY2tDaHVua05hbWVdLnB1c2g7XHJcblxyXG4gIGZ1bmN0aW9uIGhhbmRsZVB1c2goY2h1bmspIHtcclxuICAgIGNvbnN0IFssIG1vZHVsZXNdID0gY2h1bms7XHJcblxyXG4gICAgZm9yIChjb25zdCBtb2R1bGVJZCBpbiBPYmplY3Qua2V5cyhtb2R1bGVzIHx8IHt9KSkge1xyXG4gICAgICBjb25zdCBvZ01vZHVsZSA9IG1vZHVsZXNbbW9kdWxlSWRdO1xyXG5cclxuICAgICAgaWYgKHR5cGVvZiBtb2R1bGVzW21vZHVsZUlkXSA9PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICBtb2R1bGVzW21vZHVsZUlkXSA9IChtb2R1bGUsIGV4cG9ydHMsIHJlcXVpcmUpID0+IHtcclxuICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIG9nTW9kdWxlLmNhbGwobnVsbCwgbW9kdWxlLCBleHBvcnRzLCByZXF1aXJlKTtcclxuXHJcbiAgICAgICAgICAgIHB1c2hMaXN0ZW5lcnMuZm9yRWFjaChsaXN0ZW5lciA9PiB7XHJcbiAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGxpc3RlbmVyKGV4cG9ydHMpO1xyXG4gICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5sb2dnZXIuZXJyb3IoXCJQdXNoIGxpc3RlbmVyIHRocmV3IGFuIGV4Y2VwdGlvbi5cIiwgbGlzdGVuZXIsIGVycm9yKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICB1dGlscy5sb2dnZXIuZXJyb3IoXCJVbmFibGUgdG8gcGF0Y2ggcHVzaGVkIG1vZHVsZS5cIiwgZXJyb3IsIG9nTW9kdWxlLCBtb2R1bGVJZCwgY2h1bmspO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIE9iamVjdC5hc3NpZ24obW9kdWxlc1ttb2R1bGVJZF0sIG9nTW9kdWxlLCB7XHJcbiAgICAgICAgICBfX29yaWdpbmFsX186IG9nTW9kdWxlLFxyXG4gICAgICAgICAgdG9TdHJpbmc6ICgpID0+IG9nTW9kdWxlLnRvU3RyaW5nKCksXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gb2dQdXNoLmNhbGwod2luZG93W3dlYnBhY2tDaHVua05hbWVdLCBjaHVuayk7XHJcbiAgfVxyXG5cclxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93W3dlYnBhY2tDaHVua05hbWVdLCBcInB1c2hcIiwge1xyXG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxyXG4gICAgZ2V0KCkgeyByZXR1cm4gaGFuZGxlUHVzaDsgfSxcclxuICAgIHNldCh2YWx1ZSkge1xyXG4gICAgICBvZ1B1c2ggPSB2YWx1ZTtcclxuXHJcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3dbdGhpcy5jaHVua05hbWVdLCBcInB1c2hcIiwge1xyXG4gICAgICAgIHZhbHVlOiB0aGlzLmhhbmRsZVB1c2gsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIHdyaXRhYmxlOiB0cnVlXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcblxyXG5cclxuXHJcbi8qKlxyXG4gKiBcclxuICogQHBhcmFtIHthbnl9IGZpbHRlciBcclxuICogQHBhcmFtIHt7IHNpZ25hbDogQWJvcnRTaWduYWwsIHNlYXJjaEV4cG9ydHM6IGJvb2xlYW4gfX0gcGFyYW0xIFxyXG4gKiBAcmV0dXJucyBcclxuICovXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsYXp5RmluZChmaWx0ZXIsIHsgc2lnbmFsID0gbnVsbCwgc2VhcmNoRXhwb3J0cyA9IGZhbHNlIH0pIHtcclxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgY29uc3QgY2FuY2VsID0gKCkgPT4gcHVzaExpc3RlbmVycy5kZWxldGUobGlzdGVuZXIpO1xyXG4gICAgY29uc3QgbGlzdGVuZXIgPSAoZXhwb3J0cykgPT4ge1xyXG4gICAgICBpZiAoIWV4cG9ydHMgfHwgZXhwb3J0cyA9PT0gd2luZG93IHx8IGV4cG9ydHMgPT09IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkgcmV0dXJuO1xyXG5cclxuICAgICAgbGV0IGZvdW5kID0gbnVsbDtcclxuXHJcbiAgICAgIGlmICh0eXBlb2YgZXhwb3J0cyA9PSBcIm9iamVjdFwiICYmIHNlYXJjaEV4cG9ydHMpIHtcclxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBleHBvcnRzKSB7XHJcbiAgICAgICAgICBsZXQgZXhwb3J0ZWQgPSBleHBvcnRzW2tleV07XHJcbiAgICAgICAgICBpZiAoIWV4cG9ydGVkKSBjb250aW51ZTtcclxuICAgICAgICAgIGlmIChmaWx0ZXIoZXhwb3J0ZWQpKSB7XHJcbiAgICAgICAgICAgIGZvdW5kID0gZXhwb3J0ZWQ7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBsZXQgcGF0aHMgPSBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCIsXHJcbiAgICAgICAgICBcIlwiXHJcbiAgICAgICAgXTtcclxuICAgICAgICBmb3VuZCA9IHBhdGhzLm1hcChpID0+IHtcclxuICAgICAgICAgIGxldCBwYXRoZWQgPSAhaSA/IGV4cG9ydHMgOiBfLmdldChleHBvcnRzLCBpKTtcclxuICAgICAgICAgIGlmIChwYXRoZWQgJiYgZmlsdGVyKHBhdGhlZCkpIHJldHVybiBwYXRoZWQ7XHJcbiAgICAgICAgfSkuZmluZChpID0+IGkpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIWZvdW5kKSByZXR1cm47XHJcbiAgICAgIGNhbmNlbCgpO1xyXG4gICAgICByZXNvbHZlKGZvdW5kKTtcclxuICAgIH1cclxuXHJcbiAgICBwdXNoTGlzdGVuZXJzLmFkZChsaXN0ZW5lcik7XHJcblxyXG4gICAgc2lnbmFsPy5hZGRFdmVudExpc3RlbmVyKFwiYWJvcnRcIiwgKCkgPT4ge1xyXG4gICAgICBjYW5jZWwoKTtcclxuICAgICAgcmVzb2x2ZShudWxsKTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZmluZChyZXEsIGZpbHRlciwgY29uZmlnID0ge30pIHtcclxuICBsZXQgZGVmYXVsdEV4cG9ydCA9IHR5cGVvZiBjb25maWcuZGVmYXVsdEV4cG9ydCAhPSBcImJvb2xlYW5cIiA/IGZhbHNlIDogY29uZmlnLmRlZmF1bHRFeHBvcnQ7XHJcbiAgbGV0IHVubG9hZGVkID0gdHlwZW9mIGNvbmZpZy51bmxvYWRlZCAhPSBcImJvb2xlYW5cIiA/IGZhbHNlIDogY29uZmlnLnVubG9hZGVkO1xyXG4gIGxldCBhbGwgPSB0eXBlb2YgY29uZmlnLmFsbCAhPSBcImJvb2xlYW5cIiA/IGZhbHNlIDogY29uZmlnLmFsbDtcclxuICBjb25zdCBmb3VuZCA9IFtdO1xyXG4gIGlmICghdW5sb2FkZWQpIGZvciAobGV0IGkgaW4gcmVxLmMpIGlmIChyZXEuYy5oYXNPd25Qcm9wZXJ0eShpKSkge1xyXG4gICAgbGV0IG0gPSByZXEuY1tpXS5leHBvcnRzLCByID0gbnVsbDtcclxuICAgIGlmIChtICYmICh0eXBlb2YgbSA9PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBtID09IFwiZnVuY3Rpb25cIikpIHtcclxuICAgICAgaWYgKCEhKHIgPSBmaWx0ZXIobSwgaSkpKSB7XHJcbiAgICAgICAgaWYgKGFsbCkgZm91bmQucHVzaChkZWZhdWx0RXhwb3J0ID8gciA6IHJlcS5jW2ldKTtcclxuICAgICAgICBlbHNlIHJldHVybiBkZWZhdWx0RXhwb3J0ID8gciA6IHJlcS5jW2ldO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgZm9yIChsZXQga2V5IG9mIE9iamVjdC5rZXlzKG0pKSBpZiAoa2V5Lmxlbmd0aCA8IDQgJiYgbVtrZXldICYmICEhKHIgPSBmaWx0ZXIobVtrZXldLCBpKSkpIHtcclxuICAgICAgICBpZiAoYWxsKSBmb3VuZC5wdXNoKGRlZmF1bHRFeHBvcnQgPyByIDogcmVxLmNbaV0pO1xyXG4gICAgICAgIGVsc2UgcmV0dXJuIGRlZmF1bHRFeHBvcnQgPyByIDogcmVxLmNbaV07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChtICYmIG0uX19lc01vZHVsZSAmJiBtLmRlZmF1bHQgJiYgKHR5cGVvZiBtLmRlZmF1bHQgPT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgbS5kZWZhdWx0ID09IFwiZnVuY3Rpb25cIikpIHtcclxuICAgICAgaWYgKCEhKHIgPSBmaWx0ZXIobS5kZWZhdWx0LCBpKSkpIHtcclxuICAgICAgICBpZiAoYWxsKSBmb3VuZC5wdXNoKGRlZmF1bHRFeHBvcnQgPyByIDogcmVxLmNbaV0pO1xyXG4gICAgICAgIGVsc2UgcmV0dXJuIGRlZmF1bHRFeHBvcnQgPyByIDogcmVxLmNbaV07XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZiAobS5kZWZhdWx0LnR5cGUgJiYgKHR5cGVvZiBtLmRlZmF1bHQudHlwZSA9PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBtLmRlZmF1bHQudHlwZSA9PSBcImZ1bmN0aW9uXCIpICYmICEhKHIgPSBmaWx0ZXIobS5kZWZhdWx0LnR5cGUsIGkpKSkge1xyXG4gICAgICAgIGlmIChhbGwpIGZvdW5kLnB1c2goZGVmYXVsdEV4cG9ydCA/IHIgOiByZXEuY1tpXSk7XHJcbiAgICAgICAgZWxzZSByZXR1cm4gZGVmYXVsdEV4cG9ydCA/IHIgOiByZXEuY1tpXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICBmb3IgKGxldCBpIGluIHJlcS5tKSBpZiAocmVxLm0uaGFzT3duUHJvcGVydHkoaSkpIHtcclxuICAgIGxldCBtID0gcmVxLm1baV07XHJcbiAgICBpZiAobSAmJiB0eXBlb2YgbSA9PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgaWYgKHJlcS5jW2ldICYmICF1bmxvYWRlZCAmJiBmaWx0ZXIobSwgaSkpIHtcclxuICAgICAgICBpZiAoYWxsKSBmb3VuZC5wdXNoKGRlZmF1bHRFeHBvcnQgPyByZXEuY1tpXS5leHBvcnRzIDogcmVxLmNbaV0pO1xyXG4gICAgICAgIGVsc2UgcmV0dXJuIGRlZmF1bHRFeHBvcnQgPyByZXEuY1tpXS5leHBvcnRzIDogcmVxLmNbaV07XHJcbiAgICAgIH1cclxuICAgICAgaWYgKCFyZXEuY1tpXSAmJiB1bmxvYWRlZCAmJiBmaWx0ZXIobSwgaSkpIHtcclxuICAgICAgICBjb25zdCByZXNvbHZlZCA9IHt9LCByZXNvbHZlZDIgPSB7fTtcclxuICAgICAgICBtKHJlc29sdmVkLCByZXNvbHZlZDIsIHJlcSk7XHJcbiAgICAgICAgY29uc3QgdHJ1ZVJlc29sdmVkID0gcmVzb2x2ZWQyICYmIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHJlc29sdmVkMiB8fCB7fSkubGVuZ3RoID09IDAgPyByZXNvbHZlZCA6IHJlc29sdmVkMjtcclxuICAgICAgICBpZiAoYWxsKSBmb3VuZC5wdXNoKGRlZmF1bHRFeHBvcnQgPyB0cnVlUmVzb2x2ZWQuZXhwb3J0cyA6IHRydWVSZXNvbHZlZCk7XHJcbiAgICAgICAgZWxzZSByZXR1cm4gZGVmYXVsdEV4cG9ydCA/IHRydWVSZXNvbHZlZC5leHBvcnRzIDogdHJ1ZVJlc29sdmVkO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIGlmIChhbGwpIHJldHVybiBmb3VuZDtcclxufTtcclxuXHJcblxyXG5mdW5jdGlvbiBmaW5kZXJGaW5kRnVuY3Rpb24oZW50cmllcywgc3RyaW5ncykge1xyXG4gIHJldHVybiAoZW50cmllcy5maW5kKG4gPT4ge1xyXG4gICAgbGV0IGZ1bmNTdHJpbmcgPSB0eXBlb2YgblsxXSA9PSBcImZ1bmN0aW9uXCIgPyAoblsxXT8uX19vcmlnaW5hbF9fPy50b1N0cmluZz8uKCkgfHwgblsxXT8udG9TdHJpbmc/LigpIHx8IFwiXCIpIDogKCgpID0+IHsgdHJ5IHsgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG5bMV0pIH0gY2F0Y2ggKGVycikgeyByZXR1cm4gblsxXS50b1N0cmluZygpIH0gfSkoKTtcclxuICAgIGxldCByZW5kZXJGdW5jU3RyaW5nID0gblsxXT8ucmVuZGVyPy5fX29yaWdpbmFsX18/LnRvU3RyaW5nPy4oKSB8fCBuWzFdPy5yZW5kZXI/LnRvU3RyaW5nPy4oKSB8fCBcIlwiO1xyXG4gICAgcmV0dXJuIHN0cmluZ3MuZXZlcnkoc3RyaW5nID0+IGZ1bmNTdHJpbmcuaW5kZXhPZihzdHJpbmcpICE9IC0xIHx8IHJlbmRlckZ1bmNTdHJpbmcuaW5kZXhPZihzdHJpbmcpICE9IC0xKTtcclxuICB9KSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBmaW5kZXJUb0ZpbHRlcihmaW5kZXIpIHtcclxuICBsZXQgZm91bmQgPSAoKSA9PiBmYWxzZTtcclxuICBpZiAodHlwZW9mIGZpbmRlcj8uZmlsdGVyID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICBmb3VuZCA9IHdyYXBGaWx0ZXIoZXZhbChgKCgkKT0+eyB0cnkgeyByZXR1cm4gKCR7ZmluZGVyLmZpbHRlcn0pOyB9IGNhdGNoIHsgcmV0dXJuIGZhbHNlOyB9IH0pYCkpO1xyXG4gIH0gZWxzZSBpZiAodHlwZW9mIGZpbmRlcj8uZmlsdGVyID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgIGZvdW5kID0gd3JhcEZpbHRlcihmaW5kZXIuZmlsdGVyKTtcclxuICB9IGVsc2Uge1xyXG4gICAgc3dpdGNoIChmaW5kZXIuZmlsdGVyLmluKSB7XHJcbiAgICAgIGNhc2UgXCJwcm9wZXJ0aWVzXCI6IHtcclxuICAgICAgICBpZiAoZmluZGVyLmZpbHRlci5ieT8uWzFdPy5sZW5ndGgpIHtcclxuICAgICAgICAgIGZvdW5kID0gd3JhcEZpbHRlcigobSkgPT4gY2hlY2tNb2R1bGVQcm9wcyhtLCBmaW5kZXIuZmlsdGVyLmJ5Py5bMF0gfHwgW10pICYmIGNoZWNrTW9kdWxlUHJvcHMobSwgZmluZGVyLmZpbHRlci5ieT8uWzFdIHx8IFtdLCB0cnVlKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGZvdW5kID0gd3JhcEZpbHRlcigobSkgPT4gY2hlY2tNb2R1bGVQcm9wcyhtLCBmaW5kZXIuZmlsdGVyLmJ5Py5bMF0gfHwgW10pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSBcInByb3RvdHlwZXNcIjoge1xyXG4gICAgICAgIGlmIChmaW5kZXIuZmlsdGVyLmJ5Py5bMV0/Lmxlbmd0aCkge1xyXG4gICAgICAgICAgZm91bmQgPSB3cmFwRmlsdGVyKChtKSA9PiBjaGVja01vZHVsZVByb3RvdHlwZXMobSwgZmluZGVyLmZpbHRlci5ieT8uWzBdIHx8IFtdKSAmJiBjaGVja01vZHVsZVByb3RvdHlwZXMobSwgZmluZGVyLmZpbHRlci5ieT8uWzFdIHx8IFtdLCB0cnVlKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGZvdW5kID0gd3JhcEZpbHRlcigobSkgPT4gY2hlY2tNb2R1bGVQcm90b3R5cGVzKG0sIGZpbmRlci5maWx0ZXIuYnk/LlswXSB8fCBbXSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlIFwic3RyaW5nc1wiOiB7XHJcbiAgICAgICAgaWYgKGZpbmRlci5maWx0ZXIuYnk/LlsxXT8ubGVuZ3RoKSB7XHJcbiAgICAgICAgICBmb3VuZCA9IHdyYXBGaWx0ZXIoKG0pID0+IGNoZWNrTW9kdWxlU3RyaW5ncyhtLCBmaW5kZXIuZmlsdGVyLmJ5Py5bMF0gfHwgW10pICYmIGNoZWNrTW9kdWxlU3RyaW5ncyhtLCBmaW5kZXIuZmlsdGVyLmJ5Py5bMV0gfHwgW10sIHRydWUpKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZm91bmQgPSB3cmFwRmlsdGVyKChtKSA9PiBjaGVja01vZHVsZVN0cmluZ3MobSwgZmluZGVyLmZpbHRlci5ieT8uWzBdIHx8IFtdKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBmb3VuZDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRlck1hcChfX29yaWdpbmFsX18sIG1hcCkge1xyXG4gIGxldCBfX21hcHBlZF9fID0ge307XHJcblxyXG4gIGxldCB0ZW1wID0ge1xyXG4gICAgX19vcmlnaW5hbF9fLFxyXG4gICAgX19tYXBwZWRfXyxcclxuICAgIC4uLl9fb3JpZ2luYWxfX1xyXG4gIH07XHJcblxyXG4gIE9iamVjdC5lbnRyaWVzKG1hcCkuZm9yRWFjaCgoW2tleSwgc3RyaW5nc10pID0+IHtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0ZW1wLCBrZXksIHtcclxuICAgICAgZ2V0KCkge1xyXG4gICAgICAgIGlmIChfX21hcHBlZF9fW2tleV0pIHJldHVybiBfX29yaWdpbmFsX19bX19tYXBwZWRfX1trZXldXTtcclxuXHJcbiAgICAgICAgbGV0IGZvdW5kRnVuYyA9IGZpbmRlckZpbmRGdW5jdGlvbihPYmplY3QuZW50cmllcyhfX29yaWdpbmFsX18gfHwge30pLCBtYXBba2V5XSB8fCBbXSk7XHJcbiAgICAgICAgaWYgKCFmb3VuZEZ1bmM/Lmxlbmd0aCkgcmV0dXJuO1xyXG5cclxuICAgICAgICBfX21hcHBlZF9fW2tleV0gPSBmb3VuZEZ1bmNbMF07XHJcbiAgICAgICAgcmV0dXJuIGZvdW5kRnVuY1sxXTtcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIHRlbXA7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBmaW5kQnlGaW5kZXIocmVxLCBmaW5kZXIgPSB7fSkge1xyXG4gIGNvbnN0IGRlZmF1bHRFeHBvcnQgPSAhIWZpbmRlcj8uZmlsdGVyPy5leHBvcnQ7XHJcbiAgbGV0IGZvdW5kID0gZmluZChyZXEsIGZpbmRlclRvRmlsdGVyKGZpbmRlciksIHsgZGVmYXVsdEV4cG9ydCwgYWxsOiB0cnVlIH0pLmZpbmQoaSA9PiBpICE9PSBnbG9iYWxUaGlzLndpbmRvdyB8fCBpPy5leHBvcnRzICE9PSBnbG9iYWxUaGlzLndpbmRvdyk7XHJcblxyXG4gIGlmICghZm91bmQpIHJldHVybiBudWxsO1xyXG5cclxuICBpZiAoZmluZGVyLnBhdGg/LmJlZm9yZSkgZm91bmQgPSAoQXJyYXkuaXNBcnJheShmaW5kZXIucGF0aC5iZWZvcmUpID8gZmluZGVyLnBhdGguYmVmb3JlLm1hcChpID0+IF8uZ2V0KGZvdW5kLCBpKSkuZmluZChpID0+IGkpIDogXy5nZXQoZm91bmQsIGZpbmRlci5wYXRoLmJlZm9yZSkpIHx8IGZvdW5kO1xyXG4gIGlmIChmaW5kZXIuYXNzaWduKSBmb3VuZCA9IE9iamVjdC5hc3NpZ24oe30sIGZvdW5kKTtcclxuXHJcbiAgaWYgKCFmb3VuZCkgcmV0dXJuIG51bGw7XHJcblxyXG4gIGlmIChmaW5kZXIubWFwKSBmb3VuZCA9IGZpbmRlck1hcChmb3VuZCwgZmluZGVyLm1hcCk7XHJcblxyXG4gIGlmIChmaW5kZXIucGF0aD8uYWZ0ZXIpIGZvdW5kID0gKEFycmF5LmlzQXJyYXkoZmluZGVyLnBhdGguYWZ0ZXIpID8gZmluZGVyLnBhdGguYWZ0ZXIubWFwKGkgPT4gXy5nZXQoZm91bmQsIGkpKS5maW5kKGkgPT4gaSkgOiBfLmdldChmb3VuZCwgZmluZGVyLnBhdGguYWZ0ZXIpKSB8fCBmb3VuZDtcclxuXHJcbiAgcmV0dXJuIGZvdW5kO1xyXG59XHJcblxyXG5cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsYXp5RmluZEJ5RmluZGVyKGZpbmRlciA9IHt9KSB7XHJcbiAgbGV0IGZvdW5kID0gYXdhaXQgbGF6eUZpbmQoZmluZGVyVG9GaWx0ZXIoZmluZGVyKSwgeyBzZWFyY2hFeHBvcnRzOiBmYWxzZSB9KTtcclxuXHJcbiAgaWYgKCFmb3VuZCkgcmV0dXJuIG51bGw7XHJcblxyXG4gIGlmIChmaW5kZXIucGF0aD8uYmVmb3JlKSBmb3VuZCA9IChBcnJheS5pc0FycmF5KGZpbmRlci5wYXRoLmJlZm9yZSkgPyBmaW5kZXIucGF0aC5iZWZvcmUubWFwKGkgPT4gXy5nZXQoZm91bmQsIGkpKS5maW5kKGkgPT4gaSkgOiBfLmdldChmb3VuZCwgZmluZGVyLnBhdGguYmVmb3JlKSkgfHwgZm91bmQ7XHJcbiAgaWYgKGZpbmRlci5hc3NpZ24pIGZvdW5kID0gT2JqZWN0LmFzc2lnbih7fSwgZm91bmQpO1xyXG5cclxuICBpZiAoIWZvdW5kKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgaWYgKGZpbmRlci5tYXApIGZvdW5kID0gZmluZGVyTWFwKGZvdW5kLCBmaW5kZXIubWFwKTtcclxuXHJcbiAgaWYgKGZpbmRlci5wYXRoPy5hZnRlcikgZm91bmQgPSAoQXJyYXkuaXNBcnJheShmaW5kZXIucGF0aC5hZnRlcikgPyBmaW5kZXIucGF0aC5hZnRlci5tYXAoaSA9PiBfLmdldChmb3VuZCwgaSkpLmZpbmQoaSA9PiBpKSA6IF8uZ2V0KGZvdW5kLCBmaW5kZXIucGF0aC5hZnRlcikpIHx8IGZvdW5kO1xyXG5cclxuICByZXR1cm4gZm91bmQ7XHJcbn0iLCAiaW1wb3J0ICogYXMgY29tcGxleEZpbmRlciBmcm9tIFwiLi9yYXcvY29tcGxleC1maW5kZXIuanNcIjtcclxuXHJcbmNvbnN0IGRlZmF1bHRCZWZvcmUgPSBbXHJcbiAgXCJleHBvcnRzLlpcIixcclxuICBcImV4cG9ydHMuWlBcIixcclxuICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gIFwiZXhwb3J0c1wiXHJcbl07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgX19jYWNoZV9fOiB7fSxcclxuICBnZXQgcmVxdWlyZSgpIHtcclxuICAgIGlmICh0aGlzLl9fY2FjaGVfXy5yZXF1aXJlKSByZXR1cm4gdGhpcy5fX2NhY2hlX18ucmVxdWlyZTtcclxuICAgIGxldCByZXFJZCA9IGBBY29yZFdlYnBhY2tNb2R1bGVzJHtEYXRlLm5vdygpfWA7XHJcbiAgICBjb25zdCByZXEgPSB3aW5kb3cud2VicGFja0NodW5rZGlzY29yZF9hcHAucHVzaChbW3JlcUlkXSwge30sIHJlcSA9PiByZXFdKTtcclxuICAgIGRlbGV0ZSByZXEubVtyZXFJZF07XHJcbiAgICBkZWxldGUgcmVxLmNbcmVxSWRdO1xyXG4gICAgd2luZG93LndlYnBhY2tDaHVua2Rpc2NvcmRfYXBwLnBvcCgpO1xyXG4gICAgdGhpcy5fX2NhY2hlX18ucmVxdWlyZSA9IHJlcTtcclxuICAgIHJldHVybiByZXE7XHJcbiAgfSxcclxuICBmaW5kKGZpbHRlciwgY29uZmlnID0ge30pIHtcclxuICAgIHJldHVybiBjb21wbGV4RmluZGVyLmZpbmQodGhpcy5yZXF1aXJlLCBjb21wbGV4RmluZGVyLndyYXBGaWx0ZXIoZmlsdGVyKSwgY29uZmlnKTtcclxuICB9LFxyXG4gIGxhenlGaW5kKGZpbHRlciwgY29uZmlnID0ge30pIHtcclxuICAgIHJldHVybiBjb21wbGV4RmluZGVyLmxhenlGaW5kKGNvbXBsZXhGaW5kZXIud3JhcEZpbHRlcihmaWx0ZXIpLCBjb25maWcpO1xyXG4gIH0sXHJcbiAgbGF6eUZpbmRCeUZpbmRlcihmaW5kZXIpIHtcclxuICAgIHJldHVybiBjb21wbGV4RmluZGVyLmxhenlGaW5kQnlGaW5kZXIoZmluZGVyKTtcclxuICB9LFxyXG4gIGZpbHRlcihmaWx0ZXIsIGNvbmZpZyA9IHt9KSB7XHJcbiAgICByZXR1cm4gY29tcGxleEZpbmRlci5maW5kKHRoaXMucmVxdWlyZSwgY29tcGxleEZpbmRlci53cmFwRmlsdGVyKGZpbHRlciksIHsgLi4uY29uZmlnLCBhbGw6IHRydWUgfSk7XHJcbiAgfSxcclxuICBmaW5kQnlGaW5kZXIoZmluZGVyKSB7XHJcbiAgICByZXR1cm4gY29tcGxleEZpbmRlci5maW5kQnlGaW5kZXIodGhpcy5yZXF1aXJlLCBmaW5kZXIpO1xyXG4gIH0sXHJcbiAgZmluZEJ5U3RyaW5nVmFsdWVzKC4uLnN0cmluZ1ZhbHVlcykge1xyXG4gICAgcmV0dXJuIHRoaXMuZmluZCgoYSkgPT4geyBsZXQgdmEgPSBPYmplY3QudmFsdWVzKGEpOyByZXR1cm4gc3RyaW5nVmFsdWVzLmV2ZXJ5KHggPT4gdmEuc29tZSh5ID0+IHR5cGVvZiB5ID09IFwic3RyaW5nXCIgJiYgeS5pbmNsdWRlcyh4KSkpIH0pPy5leHBvcnRzO1xyXG4gIH0sXHJcbiAgZmluZEJ5UHJvcGVydGllcyguLi5wcm9wcykge1xyXG4gICAgcmV0dXJuIHRoaXMuZmluZEJ5RmluZGVyKHtcclxuICAgICAgZmlsdGVyOiB7XHJcbiAgICAgICAgZXhwb3J0OiBmYWxzZSxcclxuICAgICAgICBpbjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgYnk6IFtwcm9wc11cclxuICAgICAgfSxcclxuICAgICAgcGF0aDoge1xyXG4gICAgICAgIGJlZm9yZTogZGVmYXVsdEJlZm9yZVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9LFxyXG4gIGZpbmRCeVByb3RvdHlwZXMoLi4ucHJvcHMpIHtcclxuICAgIHJldHVybiB0aGlzLmZpbmRCeUZpbmRlcih7XHJcbiAgICAgIGZpbHRlcjoge1xyXG4gICAgICAgIGV4cG9ydDogZmFsc2UsXHJcbiAgICAgICAgaW46IFwicHJvdG90eXBlc1wiLFxyXG4gICAgICAgIGJ5OiBbcHJvcHNdXHJcbiAgICAgIH0sXHJcbiAgICAgIHBhdGg6IHtcclxuICAgICAgICBiZWZvcmU6IGRlZmF1bHRCZWZvcmVcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSxcclxuICBmaW5kQnlTdHJpbmdzKC4uLnByb3BzKSB7XHJcbiAgICByZXR1cm4gdGhpcy5maW5kQnlGaW5kZXIoe1xyXG4gICAgICBmaWx0ZXI6IHtcclxuICAgICAgICBleHBvcnQ6IGZhbHNlLFxyXG4gICAgICAgIGluOiBcInN0cmluZ3NcIixcclxuICAgICAgICBieTogW3Byb3BzXVxyXG4gICAgICB9LFxyXG4gICAgICBwYXRoOiB7XHJcbiAgICAgICAgYmVmb3JlOiBkZWZhdWx0QmVmb3JlXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0sXHJcbn07IiwgImltcG9ydCBjb21tb25EYXRhIGZyb20gJy4uLy4uL2RhdGEvY29tbW9uLmpzb24nO1xyXG5pbXBvcnQgd2VicGFjayBmcm9tICcuL3dlYnBhY2suanMnO1xyXG5cclxuXHJcbmZ1bmN0aW9uIG1hcE9iamVjdCh0ZW1wLCBpbnApIHtcclxuICBpZiAoIXRlbXA/Ll9fY2FjaGVfXykgdGVtcC5fX2NhY2hlX18gPSB7fTtcclxuICBmb3IgKGNvbnN0IGtleSBpbiBpbnApIHtcclxuICAgIGlmIChpbnA/LltrZXldPy5fXyA9PT0gdHJ1ZSkge1xyXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGVtcCwga2V5LCB7XHJcbiAgICAgICAgZ2V0KCkge1xyXG4gICAgICAgICAgaWYgKHRlbXAuX19jYWNoZV9fW2tleV0pIHJldHVybiB0ZW1wLl9fY2FjaGVfX1trZXldO1xyXG4gICAgICAgICAgcmV0dXJuIHRlbXAuX19jYWNoZV9fW2tleV0gPSB3ZWJwYWNrLmZpbmRCeUZpbmRlcihpbnBba2V5XSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKHR5cGVvZiB0ZW1wW2tleV0gPT09IFwidW5kZWZpbmVkXCIpIHRlbXBba2V5XSA9IHt9O1xyXG4gICAgICBtYXBPYmplY3QodGVtcFtrZXldLCBpbnBba2V5XSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5cclxubGV0IGNvbW1vbiA9IHtcclxuICBfX2NhY2hlX186IHt9LFxyXG4gIExheWVyQWN0aW9uczoge1xyXG4gICAgcHVzaChjb21wb25lbnQpIHtcclxuICAgICAgY29tbW9uLkZsdXhEaXNwYXRjaGVyLmRpc3BhdGNoKHtcclxuICAgICAgICB0eXBlOiBcIkxBWUVSX1BVU0hcIixcclxuICAgICAgICBjb21wb25lbnRcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgcG9wKCkge1xyXG4gICAgICBjb21tb24uRmx1eERpc3BhdGNoZXIuZGlzcGF0Y2goe1xyXG4gICAgICAgIHR5cGU6IFwiTEFZRVJfUE9QXCJcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgcG9wQWxsKCkge1xyXG4gICAgICBjb21tb24uRmx1eERpc3BhdGNoZXIuZGlzcGF0Y2goe1xyXG4gICAgICAgIHR5cGU6IFwiTEFZRVJfUE9QX0FMTFwiXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0sXHJcbn07XHJcbm1hcE9iamVjdChjb21tb24sIGNvbW1vbkRhdGEuY29tbW9uKTtcclxue1xyXG4gIGxldCBwYXRocyA9IFtcclxuICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICBcImV4cG9ydHMuWlBcIixcclxuICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICBcImV4cG9ydHNcIlxyXG4gIF07XHJcbiAgd2VicGFjay5maWx0ZXIoKGkpID0+IGk/LmdldE5hbWU/LigpPy5lbmRzV2l0aD8uKFwiU3RvcmVcIiksIHsgZGVmYXVsdEV4cG9ydDogZmFsc2UgfSkuZm9yRWFjaCgobSkgPT4ge1xyXG4gICAgbGV0IG9iaiA9IHBhdGhzLm1hcChwYXRoID0+IF8uZ2V0KG0sIHBhdGgpKS5maW5kKGkgPT4gaSk7XHJcbiAgICBpZiAoIW9iaikgcmV0dXJuO1xyXG4gICAgbGV0IG5hbWUgPSBvYmo/LmdldE5hbWU/LigpO1xyXG4gICAgaWYgKCFuYW1lKSByZXR1cm47XHJcbiAgICBpZiAoY29tbW9uW25hbWVdKSByZXR1cm47XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvbW1vbiwgbmFtZSwge1xyXG4gICAgICBnZXQoKSB7XHJcbiAgICAgICAgaWYgKGNvbW1vbi5fX2NhY2hlX19bbmFtZV0pIHJldHVybiBjb21tb24uX19jYWNoZV9fW25hbWVdO1xyXG4gICAgICAgIHJldHVybiBjb21tb24uX19jYWNoZV9fW25hbWVdID0gb2JqO1xyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbW1vbjsiLCAiaW1wb3J0IGNvbW1vbiBmcm9tIFwiLi9jb21tb24uanNcIjtcclxuaW1wb3J0IHdlYnBhY2sgZnJvbSBcIi4vd2VicGFjay5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGNvbW1vbixcclxuICB3ZWJwYWNrLFxyXG4gIHJlcXVpcmU6IGdsb2JhbFRoaXNbXCI8UFJFTE9BRF9LRVk+XCJdLnJlcXVpcmUsXHJcbiAgbmF0aXZlOiBEaXNjb3JkTmF0aXZlLFxyXG59IiwgImltcG9ydCBtb2R1bGVzIGZyb20gXCIuLi9tb2R1bGVzL2luZGV4LmpzXCJcclxuaW1wb3J0IHV0aWxzIGZyb20gXCIuLi91dGlscy9pbmRleC5qc1wiO1xyXG5cclxuY29uc3QgQkFTRV9VUkwgPSBcImh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9hY29yZC1zdGFuZGFsb25lL2Fzc2V0cy9tYWluL2kxOG5cIjtcclxuY29uc3Qgbm9TdG9yZSA9IHsgY2FjaGU6IFwibm8tc3RvcmVcIiB9O1xyXG5cclxuXHJcbmNvbnN0IG91dCA9IHtcclxuICBfX2NhY2hlX186IHtcclxuICAgIGxvY2FsZUlkczogW10sXHJcbiAgICBsb2NhbGl6YXRpb25zOiB7fVxyXG4gIH0sXHJcbiAgZ2V0IGxvY2FsZSgpIHtcclxuICAgIHJldHVybiBtb2R1bGVzLmNvbW1vbi5pMThuLl9yZXF1ZXN0ZWRMb2NhbGU7XHJcbiAgfSxcclxuICBnZXQoa2V5KSB7XHJcbiAgICBjaGVjaygpO1xyXG4gICAgcmV0dXJuIG91dC5fX2NhY2hlX18ubG9jYWxpemF0aW9uc1tvdXQubG9jYWxlXT8uW2tleV1cclxuICAgICAgfHwgb3V0Ll9fY2FjaGVfXy5sb2NhbGl6YXRpb25zLmRlZmF1bHQ/LltrZXldXHJcbiAgICAgIHx8IG1vZHVsZXMuY29tbW9uLmkxOG4uTWVzc2FnZXNba2V5XVxyXG4gICAgICB8fCBrZXk7XHJcbiAgfSxcclxuICBtZXNzYWdlczogbmV3IFByb3h5KHt9LCB7XHJcbiAgICBnZXQoXywgcHJvcCkge1xyXG4gICAgICByZXR1cm4gb3V0LmdldChwcm9wKTtcclxuICAgIH1cclxuICB9KSxcclxuICBsb2NhbGl6ZShzdHIsIC4uLmFyZ3MpIHtcclxuICAgIGlmICh0eXBlb2Ygc3RyID09PSBcInN0cmluZ1wiKSByZXR1cm4gdXRpbHMuZm9ybWF0KHN0ciwgLi4uYXJncyk7XHJcbiAgICBsZXQgdmFsID0gc3RyPy5bb3V0LmxvY2FsZV1cclxuICAgICAgfHwgc3RyPy5kZWZhdWx0XHJcbiAgICAgIHx8IE9iamVjdC52YWx1ZXMoc3RyKVswXTtcclxuICAgIGlmICghdmFsKSByZXR1cm4gbnVsbDtcclxuICAgIHJldHVybiB1dGlscy5mb3JtYXQodmFsLCAuLi5hcmdzKTtcclxuICB9LFxyXG4gIGZvcm1hdChrZXksIC4uLmFyZ3MpIHtcclxuICAgIHJldHVybiB1dGlscy5mb3JtYXQob3V0LmdldChrZXkpLCAuLi5hcmdzKTtcclxuICB9XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGNoZWNrKCkge1xyXG4gIGNvbnN0IGxvY2FsZSA9IG91dC5sb2NhbGU7XHJcbiAgaWYgKCFvdXQuX19jYWNoZV9fLmxvY2FsZUlkcy5sZW5ndGgpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIG91dC5fX2NhY2hlX18ubG9jYWxlSWRzID0gYXdhaXQgKGF3YWl0IGZldGNoKGAke0JBU0VfVVJMfS9sb2NhbGVzLmpzb25gLCBub1N0b3JlKSkuanNvbigpO1xyXG4gICAgfSBjYXRjaCB7IH1cclxuICAgIHRyeSB7XHJcbiAgICAgIG91dC5fX2NhY2hlX18ubG9jYWxpemF0aW9ucy5kZWZhdWx0ID0gYXdhaXQgKGF3YWl0IGZldGNoKGAke0JBU0VfVVJMfS9kZWZhdWx0Lmpzb25gLCBub1N0b3JlKSkuanNvbigpO1xyXG4gICAgfSBjYXRjaCB7IH1cclxuICB9XHJcbiAgaWYgKFxyXG4gICAgb3V0Ll9fY2FjaGVfXy5sb2NhbGVJZHMuaW5jbHVkZXMobG9jYWxlKVxyXG4gICAgJiYgIW91dC5fX2NhY2hlX18ubG9jYWxpemF0aW9ucz8uW2xvY2FsZV1cclxuICApIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIG91dC5fX2NhY2hlX18ubG9jYWxpemF0aW9uc1tsb2NhbGVdID0gYXdhaXQgKGF3YWl0IGZldGNoKGAke0JBU0VfVVJMfS8ke2xvY2FsZX0uanNvbmAsIG5vU3RvcmUpKS5qc29uKCk7XHJcbiAgICB9IGNhdGNoIHsgfTtcclxuICB9XHJcbn1cclxuXHJcbmNoZWNrKCk7XHJcbmV4cG9ydCBkZWZhdWx0IG91dDsiLCAiaW1wb3J0IG1vZHVsZXMgZnJvbSBcIi4uL2FwaS9tb2R1bGVzL2luZGV4LmpzXCI7XHJcbmltcG9ydCBpMThuIGZyb20gXCIuLi9hcGkvaTE4bi9pbmRleC5qc1wiO1xyXG5cclxubGV0IGlzQ29ubmVjdGlvbk9wZW4gPSBmYWxzZTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB3YWl0VW50aWxDb25uZWN0aW9uT3BlbigpIHtcclxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuICAgIGlmIChpc0Nvbm5lY3Rpb25PcGVuKSByZXR1cm4gcmVzb2x2ZSh0cnVlKTtcclxuICAgIGZ1bmN0aW9uIG9uRXZlbnQoKSB7XHJcbiAgICAgIG1vZHVsZXMuY29tbW9uLkZsdXhEaXNwYXRjaGVyLnVuc3Vic2NyaWJlKFwiQ09OTkVDVElPTl9PUEVOXCIsIG9uRXZlbnQpO1xyXG4gICAgICBpc0Nvbm5lY3Rpb25PcGVuID0gdHJ1ZTtcclxuICAgICAgcmVzb2x2ZSh0cnVlKTtcclxuICAgIH1cclxuICAgIG1vZHVsZXMuY29tbW9uLkZsdXhEaXNwYXRjaGVyLnN1YnNjcmliZShcIkNPTk5FQ1RJT05fT1BFTlwiLCBvbkV2ZW50KTtcclxuICB9KTtcclxufVxyXG4iLCAiaW1wb3J0IGxvZ2dlciBmcm9tIFwiLi4vYXBpL3V0aWxzL2xvZ2dlci5qc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEJhc2ljRXZlbnRFbWl0dGVyIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIC8qKiBAdHlwZSB7TWFwPHN0cmluZywgTWFwPCguLi5hcmdzOiBhbnlbXSk9PnZvaWQsIHtvbmNlOiBib29sZWFufT4+fSAqL1xyXG4gICAgdGhpcy5saXN0ZW5lcnMgPSBuZXcgTWFwKCk7XHJcbiAgfVxyXG5cclxuICBfcHJlcGFyZUxpc3RlbmVyc01hcChldmVudE5hbWUpIHtcclxuICAgIGlmICghdGhpcy5saXN0ZW5lcnMuaGFzKGV2ZW50TmFtZSkpXHJcbiAgICAgIHRoaXMubGlzdGVuZXJzLnNldChldmVudE5hbWUsIG5ldyBNYXAoKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnROYW1lXHJcbiAgICogQHBhcmFtIHsoLi4uYXJnczogYW55W10pPT52b2lkfSBsaXN0ZW5lclxyXG4gICAqL1xyXG4gIG9uKGV2ZW50TmFtZSwgbGlzdGVuZXIpIHtcclxuICAgIHRoaXMuX3ByZXBhcmVMaXN0ZW5lcnNNYXAoZXZlbnROYW1lKTtcclxuICAgIHRoaXMubGlzdGVuZXJzLmdldChldmVudE5hbWUpLnNldChsaXN0ZW5lciwgeyBvbmNlOiBmYWxzZSB9KTtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIHRoaXMubGlzdGVuZXJzLmdldChldmVudE5hbWUpLmRlbGV0ZShsaXN0ZW5lcik7XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50TmFtZVxyXG4gICAqIEBwYXJhbSB7KC4uLmFyZ3M6IGFueVtdKT0+dm9pZH0gbGlzdGVuZXJcclxuICAgKi9cclxuICBvbmNlKGV2ZW50TmFtZSwgbGlzdGVuZXIpIHtcclxuICAgIHRoaXMuX3ByZXBhcmVMaXN0ZW5lcnNNYXAoZXZlbnROYW1lKTtcclxuICAgIHRoaXMubGlzdGVuZXJzLmdldChldmVudE5hbWUpPy5zZXQobGlzdGVuZXIsIHsgb25jZTogdHJ1ZSB9KTtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIHRoaXMubGlzdGVuZXJzLmdldChldmVudE5hbWUpLmRlbGV0ZShsaXN0ZW5lcik7XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtzdHJpbmc/fSBldmVudE5hbWVcclxuICAgKiBAcGFyYW0geygoLi4uYXJnczogYW55W10pPT52b2lkKT99IGxpc3RlbmVyXHJcbiAgICovXHJcbiAgb2ZmKGV2ZW50TmFtZSwgbGlzdGVuZXIpIHtcclxuICAgIGlmICghZXZlbnROYW1lKSByZXR1cm4gKHRoaXMubGlzdGVuZXJzID0gbmV3IE1hcCgpKTtcclxuICAgIGlmICghbGlzdGVuZXIpIHJldHVybiB0aGlzLmxpc3RlbmVycz8uZGVsZXRlKGV2ZW50TmFtZSk7XHJcbiAgICB0aGlzLmxpc3RlbmVycy5nZXQoZXZlbnROYW1lKT8uZGVsZXRlKGxpc3RlbmVyKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudE5hbWVcclxuICAgKiBAcGFyYW0gIHsuLi5hbnl9IGFyZ3NcclxuICAgKi9cclxuICBlbWl0KGV2ZW50TmFtZSwgLi4uYXJncykge1xyXG4gICAgaWYgKCF0aGlzLmxpc3RlbmVycy5oYXMoZXZlbnROYW1lKSkgcmV0dXJuO1xyXG4gICAgbGV0IGV2ZW50TWFwID0gdGhpcy5saXN0ZW5lcnMuZ2V0KGV2ZW50TmFtZSk7XHJcbiAgICBldmVudE1hcC5mb3JFYWNoKCh7IG9uY2UgfSwgbGlzdGVuZXIpID0+IHtcclxuICAgICAgaWYgKG9uY2UpIGV2ZW50TWFwPy5kZWxldGUobGlzdGVuZXIpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGxpc3RlbmVyKC4uLmFyZ3MpO1xyXG4gICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgbG9nZ2VyLmVycm9yKGBFcnJvciB3aGlsZSBlbWl0dGluZyAke2V2ZW50TmFtZX0gZXZlbnQuYCwgZSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufTtcclxuIiwgImltcG9ydCB7IEJhc2ljRXZlbnRFbWl0dGVyIH0gZnJvbSBcIi4uLy4uL2xpYi9CYXNpY0V2ZW50RW1pdHRlci5qc1wiO1xyXG5cclxuY29uc3QgZXZlbnRzID0gbmV3IEJhc2ljRXZlbnRFbWl0dGVyKCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBldmVudHM7IiwgImltcG9ydCBldmVudHMgZnJvbSBcIi4uL2V2ZW50c1wiO1xyXG5pbXBvcnQgd2VicGFjayBmcm9tIFwiLi4vbW9kdWxlcy93ZWJwYWNrLmpzXCI7XHJcblxyXG5jb25zdCBzY3JvbGxiYXJDbGFzc2VzID0gd2VicGFjay5maW5kQnlQcm9wZXJ0aWVzKFwic2Nyb2xsYmFyR2hvc3RIYWlybGluZVwiLCBcInNwaW5uZXJcIik7XHJcblxyXG5jb25zdCBmb3JtYXRSZWdleGVzID0ge1xyXG4gIGJvbGQ6IC9cXCpcXCooW14qXSspXFwqXFwqL2csXHJcbiAgaXRhbGljOiAvXFwqKFteKl0rKVxcKi9nLFxyXG4gIHVuZGVybGluZTogL1xcXyhbXipdKylcXF8vZyxcclxuICBzdHJpa2U6IC9cXH5cXH4oW14qXSspXFx+XFx+L2csXHJcbiAgdXJsOiAvKFxcYihodHRwcz98ZnRwfGZpbGUpOlxcL1xcL1stQS1aMC05KyZAI1xcLyU/PX5ffCE6LC47XSpbLUEtWjAtOSsmQCNcXC8lPX5ffF0pL2lnLFxyXG4gIGlubGluZTogL1xcYChbXipdKylcXGAvZyxcclxuICBjb2RlYmxvY2tTaW5nbGU6IC9cXGBcXGBcXGAoW14qXSspXFxgXFxgXFxgL2csXHJcbiAgY29kZWJsb2NrTXVsdGk6IC9cXGBcXGBcXGAoXFx3KylcXG4oKD86KD8hXFxgXFxgXFxgKVtcXHNcXFNdKSopXFxgXFxgXFxgL2dcclxufVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBwYXJzZShodG1sKSB7XHJcbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGRpdi5pbm5lckhUTUwgPSBodG1sO1xyXG4gICAgcmV0dXJuIGRpdi5maXJzdEVsZW1lbnRDaGlsZDtcclxuICB9LFxyXG4gIHRvQ1NTUHJvcChvKSB7XHJcbiAgICBsZXQgZWxtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIE9iamVjdC5lbnRyaWVzKG8pLmZvckVhY2goKGkpID0+IHtcclxuICAgICAgaWYgKGVsbS5zdHlsZS5oYXNPd25Qcm9wZXJ0eShpWzBdKSkge1xyXG4gICAgICAgIGVsbS5zdHlsZVtpWzBdXSA9IGlbMV07XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZWxtLnN0eWxlLnNldFByb3BlcnR5KGlbMF0sIGlbMV0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBlbG0uZ2V0QXR0cmlidXRlKFwic3R5bGVcIik7XHJcbiAgfSxcclxuICB0b0hUTUxQcm9wcyhvKSB7XHJcbiAgICByZXR1cm4gT2JqZWN0LmVudHJpZXMobylcclxuICAgICAgLm1hcChcclxuICAgICAgICAoaSkgPT5cclxuICAgICAgICAgIGAke2lbMF0ucmVwbGFjZSgvICsvLCBcIi1cIil9PVwiJHtpWzBdID09IFwic3R5bGVcIiAmJiB0eXBlb2YgaVsxXSAhPSBcInN0cmluZ1wiXHJcbiAgICAgICAgICAgID8gdGhpcy50b0NTU1Byb3AoaVsxXSlcclxuICAgICAgICAgICAgOiB0aGlzLmVzY2FwZUhUTUwoaVsxXSl9XCJgXHJcbiAgICAgIClcclxuICAgICAgLmpvaW4oXCIgXCIpO1xyXG4gIH0sXHJcbiAgZXNjYXBlKGh0bWwpIHtcclxuICAgIHJldHVybiBuZXcgT3B0aW9uKGh0bWwpLmlubmVySFRNTDtcclxuICB9LFxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gZWxtIFxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gc2VsZWN0b3JPck51bWJlciBcclxuICAgKiBAcmV0dXJucyB7RWxlbWVudFtdfVxyXG4gICAqL1xyXG4gIHBhcmVudHMoZWxtLCBzZWxlY3Rvck9yTnVtYmVyKSB7XHJcbiAgICBsZXQgcGFyZW50cyA9IFtdO1xyXG4gICAgaWYgKHR5cGVvZiBzZWxlY3Rvck9yTnVtYmVyID09PSBcIm51bWJlclwiKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VsZWN0b3JPck51bWJlcjsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGVsbS5wYXJlbnRFbGVtZW50KSB7XHJcbiAgICAgICAgICBlbG0gPSBlbG0ucGFyZW50RWxlbWVudDtcclxuICAgICAgICAgIHBhcmVudHMucHVzaChlbG0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgd2hpbGUgKGVsbS5wYXJlbnRFbGVtZW50ICYmIGVsbS5wYXJlbnRFbGVtZW50LmNsb3Nlc3Qoc2VsZWN0b3JPck51bWJlcikpIHtcclxuICAgICAgICBlbG0gPSBlbG0ucGFyZW50RWxlbWVudC5jbG9zZXN0KHNlbGVjdG9yT3JOdW1iZXIpO1xyXG4gICAgICAgIHBhcmVudHMucHVzaChlbG0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcGFyZW50cztcclxuICB9LFxyXG4gIC8qKlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvciBcclxuICAgKiBAcGFyYW0geyhlbGVtZW50OiBIVE1MRGl2RWxlbWVudCk9PigoKT0+dm9pZCl9IGNiIFxyXG4gICAqIEByZXR1cm5zIHsoKT0+dm9pZH1cclxuICAgKi9cclxuICBwYXRjaDogKHNlbGVjdG9yLCBjYikgPT5cclxuICAgICgoKSA9PiB7XHJcbiAgICAgIGZ1bmN0aW9uIG5vZGVBZGRlZChub2RlKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBub2RlPy5xdWVyeVNlbGVjdG9yQWxsICE9IFwiZnVuY3Rpb25cIikgcmV0dXJuO1xyXG4gICAgICAgIG5vZGUucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikuZm9yRWFjaChhc3luYyAoZWxtKSA9PiB7XHJcbiAgICAgICAgICBpZiAoIWVsbS5hY29yZCkge1xyXG4gICAgICAgICAgICBlbG0uYWNvcmQgPSB7IHVubW91bnQ6IFtdLCBwYXRjaGVkOiBuZXcgU2V0KCkgfTtcclxuICAgICAgICAgICAgZWxtLmNsYXNzTGlzdC5hZGQoXCJhY29yZC0tcGF0Y2hlZFwiKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoZWxtLmFjb3JkLnBhdGNoZWQuaGFzKGNiKSkgcmV0dXJuO1xyXG4gICAgICAgICAgZWxtLmFjb3JkLnBhdGNoZWQuYWRkKGNiKTtcclxuXHJcbiAgICAgICAgICBsZXQgdW5QYXRjaENiID0gYXdhaXQgY2IoZWxtKTtcclxuICAgICAgICAgIGlmICh0eXBlb2YgdW5QYXRjaENiID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgICAgIGVsbS5hY29yZC51bm1vdW50LnB1c2godW5QYXRjaENiKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgZnVuY3Rpb24gbm9kZVJlbW92ZWQobm9kZSkge1xyXG4gICAgICAgIGlmICh0eXBlb2Ygbm9kZT8ucXVlcnlTZWxlY3RvckFsbCAhPSBcImZ1bmN0aW9uXCIpIHJldHVybjtcclxuICAgICAgICBub2RlLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpLmZvckVhY2goYXN5bmMgKGVsbSkgPT4ge1xyXG4gICAgICAgICAgaWYgKCFlbG0uYWNvcmQpIHJldHVybjtcclxuICAgICAgICAgIGVsbS5hY29yZC51bm1vdW50LmZvckVhY2goKGYpID0+IGYoKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpLmZvckVhY2gobm9kZUFkZGVkKTtcclxuXHJcbiAgICAgIHJldHVybiBldmVudHMub24oXHJcbiAgICAgICAgXCJEb21NdXRhdGlvblwiLFxyXG4gICAgICAgIC8qKiBAcGFyYW0ge011dGF0aW9uUmVjb3JkfSBtdXQgKi8obXV0KSA9PiB7XHJcbiAgICAgICAgICBpZiAobXV0LnR5cGUgPT09IFwiY2hpbGRMaXN0XCIpIHtcclxuICAgICAgICAgICAgbXV0LmFkZGVkTm9kZXMuZm9yRWFjaChub2RlQWRkZWQpO1xyXG4gICAgICAgICAgICBtdXQucmVtb3ZlZE5vZGVzLmZvckVhY2gobm9kZVJlbW92ZWQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgKTtcclxuICAgIH0pKCksXHJcbiAgZm9ybWF0Q29udGVudChtc2cpIHtcclxuICAgIGlmICghbXNnKSByZXR1cm4gJyc7XHJcbiAgICBjb25zdCB7IGJvbGQsIGl0YWxpYywgdW5kZXJsaW5lLCBzdHJpa2UsIGNvZGVibG9ja011bHRpLCBjb2RlYmxvY2tTaW5nbGUsIGlubGluZSwgdXJsIH0gPSBmb3JtYXRSZWdleGVzO1xyXG5cclxuICAgIGNvbnN0IGNvZGVCbG9ja3NNYXAgPSBPYmplY3QuZnJvbUVudHJpZXMoW1xyXG4gICAgICAuLi4obXNnLm1hdGNoQWxsKGNvZGVibG9ja011bHRpKSB8fCBbXSksIC4uLihtc2cubWF0Y2hBbGwoY29kZWJsb2NrU2luZ2xlKSB8fCBbXSlcclxuICAgIF0ubWFwKFxyXG4gICAgICAoW18sIGNvZGVCbG9ja09yQ29kZSwgY29kZUJsb2NrQ29udGVudF0sIGkpID0+IHtcclxuICAgICAgICBtc2cgPSBtc2cucmVwbGFjZShfLCBge3tDT0RFQkxPQ0tfJHtpfX19YCk7XHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgIGB7e0NPREVCTE9DS18ke2l9fX1gLFxyXG4gICAgICAgICAgY29kZUJsb2NrQ29udGVudCA/XHJcbiAgICAgICAgICAgIGA8cHJlPjxjb2RlIGNsYXNzPVwiJHtzY3JvbGxiYXJDbGFzc2VzLnNjcm9sbGJhckdob3N0SGFpcmxpbmV9IGhsanMgJHtjb2RlQmxvY2tPckNvZGV9XCIgc3R5bGU9XCJwb3NpdGlvbjogcmVsYXRpdmU7XCI+JHttb2R1bGVzLmNvbW1vbi5obGpzLmhpZ2hsaWdodChjb2RlQmxvY2tPckNvZGUsIGNvZGVCbG9ja0NvbnRlbnQpLnZhbHVlfTwvY29kZT48L3ByZT5gIDpcclxuICAgICAgICAgICAgYDxwcmU+PGNvZGUgY2xhc3M9XCIke3Njcm9sbGJhckNsYXNzZXMuc2Nyb2xsYmFyR2hvc3RIYWlybGluZX0gaGxqc1wiIHN0eWxlPVwicG9zaXRpb246IHJlbGF0aXZlO1wiPiR7Y29kZUJsb2NrT3JDb2RlfTwvY29kZT48L3ByZT5gXHJcbiAgICAgICAgXTtcclxuICAgICAgfVxyXG4gICAgKSk7XHJcblxyXG4gICAgY29uc3QgaW5saW5lTWFwID0gT2JqZWN0LmZyb21FbnRyaWVzKFxyXG4gICAgICBbLi4uKG1zZy5tYXRjaEFsbChpbmxpbmUpIHx8IFtdKV0ubWFwKFxyXG4gICAgICAgIChbXywgaW5saW5lQ29udGVudF0sIGkpID0+IHtcclxuICAgICAgICAgIG1zZyA9IG1zZy5yZXBsYWNlKF8sIGB7e0lOTElORV8ke2l9fX1gKTtcclxuICAgICAgICAgIHJldHVybiBbYHt7SU5MSU5FXyR7aX19fWAsIGA8Y29kZSBjbGFzcz1cImlubGluZVwiPiR7aW5saW5lQ29udGVudH08L2NvZGU+YF07XHJcbiAgICAgICAgfVxyXG4gICAgICApXHJcbiAgICApO1xyXG5cclxuICAgIG1zZyA9IG1zZy5yZXBsYWNlKGJvbGQsIFwiPGI+JDE8L2I+XCIpXHJcbiAgICAgIC5yZXBsYWNlKGl0YWxpYywgXCI8aT4kMTwvaT5cIilcclxuICAgICAgLnJlcGxhY2UodW5kZXJsaW5lLCBcIjxVPiQxPC9VPlwiKVxyXG4gICAgICAucmVwbGFjZShzdHJpa2UsIFwiPHM+JDE8L3M+XCIpXHJcbiAgICAgIC5yZXBsYWNlKHVybCwgJzxhIGhyZWY9XCIkMVwiPiQxPC9hPicpO1xyXG5cclxuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKGNvZGVCbG9ja3NNYXApKSB7XHJcbiAgICAgIG1zZyA9IG1zZy5yZXBsYWNlKGtleSwgdmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKGlubGluZU1hcCkpIHtcclxuICAgICAgbXNnID0gbXNnLnJlcGxhY2Uoa2V5LCB2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG1zZztcclxuICB9LFxyXG4gIHJlc29sdmUoaHRtbE9yRWxtKSB7XHJcbiAgICBpZiAoaHRtbE9yRWxtIGluc3RhbmNlb2YgRWxlbWVudCkgcmV0dXJuIGh0bWxPckVsbTtcclxuICAgIHJldHVybiB0aGlzLnBhcnNlKGh0bWxPckVsbSk7XHJcbiAgfVxyXG59XHJcblxyXG57XHJcbiAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigobXV0YXRpb25zKSA9PiB7XHJcbiAgICBtdXRhdGlvbnMuZm9yRWFjaCgobXV0YXRpb24pID0+IHtcclxuICAgICAgZXZlbnRzLmVtaXQoXCJEb21NdXRhdGlvblwiLCBtdXRhdGlvbik7XHJcbiAgICB9KTtcclxuICB9KTtcclxuICBvYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LCB7XHJcbiAgICBhdHRyaWJ1dGVzOiB0cnVlLFxyXG4gICAgY2hpbGRMaXN0OiB0cnVlLFxyXG4gICAgc3VidHJlZTogdHJ1ZVxyXG4gIH0pO1xyXG59IiwgIi8vIHdlIHVzZSB0aGlzIGFycmF5IG11bHRpcGxlIHRpbWVzXHJcbmV4cG9ydCBjb25zdCBwYXRjaFR5cGVzID0gW1wiYVwiLCBcImJcIiwgXCJpXCJdO1xyXG5leHBvcnQgY29uc3QgcGF0Y2hlZE9iamVjdHMgPSBuZXcgTWFwKCk7XHJcbiIsICIvLyBjYWxscyByZWxldmFudCBwYXRjaGVzIGFuZCByZXR1cm5zIHRoZSBmaW5hbCByZXN1bHRcclxuaW1wb3J0IHsgcGF0Y2hlZE9iamVjdHMgfSBmcm9tIFwiLi9zaGFyZWQuanNcIjtcclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKGZ1bmNOYW1lLCBmdW5jUGFyZW50LCBmdW5jQXJncywgXHJcbi8vIHRoZSB2YWx1ZSBvZiBgdGhpc2AgdG8gYXBwbHlcclxuY3R4dCwgXHJcbi8vIGlmIHRydWUsIHRoZSBmdW5jdGlvbiBpcyBhY3R1YWxseSBjb25zdHJ1Y3RvclxyXG5pc0NvbnN0cnVjdCkge1xyXG4gICAgY29uc3QgcGF0Y2ggPSBwYXRjaGVkT2JqZWN0cy5nZXQoZnVuY1BhcmVudCk/LltmdW5jTmFtZV07XHJcbiAgICAvLyBUaGlzIGlzIGluIHRoZSBldmVudCB0aGF0IHRoaXMgZnVuY3Rpb24gaXMgYmVpbmcgY2FsbGVkIGFmdGVyIGFsbCBwYXRjaGVzIGFyZSByZW1vdmVkLlxyXG4gICAgaWYgKCFwYXRjaClcclxuICAgICAgICByZXR1cm4gaXNDb25zdHJ1Y3RcclxuICAgICAgICAgICAgPyBSZWZsZWN0LmNvbnN0cnVjdChmdW5jUGFyZW50W2Z1bmNOYW1lXSwgZnVuY0FyZ3MsIGN0eHQpXHJcbiAgICAgICAgICAgIDogZnVuY1BhcmVudFtmdW5jTmFtZV0uYXBwbHkoY3R4dCwgZnVuY0FyZ3MpO1xyXG4gICAgLy8gQmVmb3JlIHBhdGNoZXNcclxuICAgIGZvciAoY29uc3QgaG9vayBvZiBwYXRjaC5iLnZhbHVlcygpKSB7XHJcbiAgICAgICAgY29uc3QgbWF5YmVmdW5jQXJncyA9IGhvb2suY2FsbChjdHh0LCBmdW5jQXJncyk7XHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkobWF5YmVmdW5jQXJncykpXHJcbiAgICAgICAgICAgIGZ1bmNBcmdzID0gbWF5YmVmdW5jQXJncztcclxuICAgIH1cclxuICAgIC8vIEluc3RlYWQgcGF0Y2hlc1xyXG4gICAgbGV0IGluc3RlYWRQYXRjaGVkRnVuYyA9ICguLi5hcmdzKSA9PiBpc0NvbnN0cnVjdFxyXG4gICAgICAgID8gUmVmbGVjdC5jb25zdHJ1Y3QocGF0Y2gubywgYXJncywgY3R4dClcclxuICAgICAgICA6IHBhdGNoLm8uYXBwbHkoY3R4dCwgYXJncyk7XHJcbiAgICBmb3IgKGNvbnN0IGNhbGxiYWNrIG9mIHBhdGNoLmkudmFsdWVzKCkpIHtcclxuICAgICAgICBjb25zdCBvbGRQYXRjaEZ1bmMgPSBpbnN0ZWFkUGF0Y2hlZEZ1bmM7XHJcbiAgICAgICAgaW5zdGVhZFBhdGNoZWRGdW5jID0gKC4uLmFyZ3MpID0+IGNhbGxiYWNrLmNhbGwoY3R4dCwgYXJncywgb2xkUGF0Y2hGdW5jKTtcclxuICAgIH1cclxuICAgIGxldCB3b3JraW5nUmV0VmFsID0gaW5zdGVhZFBhdGNoZWRGdW5jKC4uLmZ1bmNBcmdzKTtcclxuICAgIC8vIEFmdGVyIHBhdGNoZXNcclxuICAgIGZvciAoY29uc3QgaG9vayBvZiBwYXRjaC5hLnZhbHVlcygpKVxyXG4gICAgICAgIHdvcmtpbmdSZXRWYWwgPSBob29rLmNhbGwoY3R4dCwgZnVuY0FyZ3MsIHdvcmtpbmdSZXRWYWwpID8/IHdvcmtpbmdSZXRWYWw7XHJcbiAgICByZXR1cm4gd29ya2luZ1JldFZhbDtcclxufVxyXG4iLCAiaW1wb3J0IHsgcGF0Y2hlZE9iamVjdHMsIHBhdGNoVHlwZXMgfSBmcm9tIFwiLi9zaGFyZWQuanNcIjtcclxuZXhwb3J0IGZ1bmN0aW9uIHVuUGF0Y2goZnVuY1BhcmVudCwgZnVuY05hbWUsIGhvb2tJZCwgdHlwZSkge1xyXG4gICAgY29uc3QgcGF0Y2hlZE9iamVjdCA9IHBhdGNoZWRPYmplY3RzLmdldChmdW5jUGFyZW50KTtcclxuICAgIGNvbnN0IHBhdGNoID0gcGF0Y2hlZE9iamVjdD8uW2Z1bmNOYW1lXTtcclxuICAgIGlmICghcGF0Y2g/Llt0eXBlXS5oYXMoaG9va0lkKSlcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICBwYXRjaFt0eXBlXS5kZWxldGUoaG9va0lkKTtcclxuICAgIC8vIElmIHRoZXJlIGFyZSBubyBtb3JlIGhvb2tzIGZvciBldmVyeSB0eXBlLCByZW1vdmUgdGhlIHBhdGNoXHJcbiAgICBpZiAocGF0Y2hUeXBlcy5ldmVyeSgodCkgPT4gcGF0Y2hbdF0uc2l6ZSA9PT0gMCkpIHtcclxuICAgICAgICAvLyByZWZsZWN0IGRlZmluZXByb3BlcnR5IGlzIGxpa2Ugb2JqZWN0IGRlZmluZXByb3BlcnR5XHJcbiAgICAgICAgLy8gYnV0IGluc3RlYWQgb2YgZXJyb3JpbmcgaXQgcmV0dXJucyBpZiBpdCB3b3JrZWQgb3Igbm90LlxyXG4gICAgICAgIC8vIHRoaXMgaXMgbW9yZSBlYXNpbHkgbWluaWZpYWJsZSwgaGVuY2UgaXRzIHVzZS4gLS0gc2lua1xyXG4gICAgICAgIGNvbnN0IHN1Y2Nlc3MgPSBSZWZsZWN0LmRlZmluZVByb3BlcnR5KGZ1bmNQYXJlbnQsIGZ1bmNOYW1lLCB7XHJcbiAgICAgICAgICAgIHZhbHVlOiBwYXRjaC5vLFxyXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICghc3VjY2VzcylcclxuICAgICAgICAgICAgZnVuY1BhcmVudFtmdW5jTmFtZV0gPSBwYXRjaC5vO1xyXG4gICAgICAgIGRlbGV0ZSBwYXRjaGVkT2JqZWN0W2Z1bmNOYW1lXTtcclxuICAgIH1cclxuICAgIGlmIChPYmplY3Qua2V5cyhwYXRjaGVkT2JqZWN0KS5sZW5ndGggPT0gMClcclxuICAgICAgICBwYXRjaGVkT2JqZWN0cy5kZWxldGUoZnVuY1BhcmVudCk7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gdW5QYXRjaEFsbCgpIHtcclxuICAgIGZvciAoY29uc3QgW3BhcmVudE9iamVjdCwgcGF0Y2hlZE9iamVjdF0gb2YgcGF0Y2hlZE9iamVjdHMuZW50cmllcygpKVxyXG4gICAgICAgIGZvciAoY29uc3QgZnVuY05hbWUgaW4gcGF0Y2hlZE9iamVjdClcclxuICAgICAgICAgICAgZm9yIChjb25zdCBob29rVHlwZSBvZiBwYXRjaFR5cGVzKVxyXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBob29rSWQgb2YgcGF0Y2hlZE9iamVjdFtmdW5jTmFtZV0/Lltob29rVHlwZV0ua2V5cygpID8/IFtdKVxyXG4gICAgICAgICAgICAgICAgICAgIHVuUGF0Y2gocGFyZW50T2JqZWN0LCBmdW5jTmFtZSwgaG9va0lkLCBob29rVHlwZSk7XHJcbn1cclxuIiwgIi8vIGN1cnJpZWQgLSBnZXRQYXRjaEZ1bmMoXCJiZWZvcmVcIikoLi4uKVxyXG4vLyBhbGxvd3MgdXMgdG8gYXBwbHkgYW4gYXJndW1lbnQgd2hpbGUgbGVhdmluZyB0aGUgcmVzdCBvcGVuIG11Y2ggY2xlYW5lci5cclxuLy8gZnVuY3Rpb25hbCBwcm9ncmFtbWluZyBzdHJpa2VzIGFnYWluISAtLSBzaW5rXHJcbmltcG9ydCBob29rIGZyb20gXCIuL2hvb2suanNcIjtcclxuaW1wb3J0IHsgcGF0Y2hlZE9iamVjdHMgfSBmcm9tIFwiLi9zaGFyZWQuanNcIjtcclxuaW1wb3J0IHsgdW5QYXRjaCB9IGZyb20gXCIuL3VuLXBhdGNoLmpzXCI7XHJcbi8vIGNyZWF0ZXMgYSBob29rIGlmIG5lZWRlZCwgZWxzZSBqdXN0IGFkZHMgb25lIHRvIHRoZSBwYXRjaGVzIGFycmF5XHJcbmV4cG9ydCBkZWZhdWx0IChwYXRjaFR5cGUpID0+IChmdW5jTmFtZSwgZnVuY1BhcmVudCwgY2FsbGJhY2ssIG9uZVRpbWUgPSBmYWxzZSkgPT4ge1xyXG4gICAgaWYgKHR5cGVvZiBmdW5jUGFyZW50W2Z1bmNOYW1lXSAhPT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtmdW5jTmFtZX0gaXMgbm90IGEgZnVuY3Rpb24gaW4gJHtmdW5jUGFyZW50LmNvbnN0cnVjdG9yLm5hbWV9YCk7XHJcbiAgICBpZiAoIXBhdGNoZWRPYmplY3RzLmhhcyhmdW5jUGFyZW50KSlcclxuICAgICAgICBwYXRjaGVkT2JqZWN0cy5zZXQoZnVuY1BhcmVudCwge30pO1xyXG4gICAgY29uc3QgcGFyZW50SW5qZWN0aW9ucyA9IHBhdGNoZWRPYmplY3RzLmdldChmdW5jUGFyZW50KTtcclxuICAgIGlmICghcGFyZW50SW5qZWN0aW9uc1tmdW5jTmFtZV0pIHtcclxuICAgICAgICBjb25zdCBvcmlnRnVuYyA9IGZ1bmNQYXJlbnRbZnVuY05hbWVdO1xyXG4gICAgICAgIC8vIG5vdGUgdG8gZnV0dXJlIG1lIG9wdGltaXNpbmcgZm9yIHNpemU6IGV4dHJhY3RpbmcgbmV3IE1hcCgpIHRvIGEgZnVuYyBpbmNyZWFzZXMgc2l6ZSAtLXNpbmtcclxuICAgICAgICBwYXJlbnRJbmplY3Rpb25zW2Z1bmNOYW1lXSA9IHtcclxuICAgICAgICAgICAgbzogb3JpZ0Z1bmMsXHJcbiAgICAgICAgICAgIGI6IG5ldyBNYXAoKSxcclxuICAgICAgICAgICAgaTogbmV3IE1hcCgpLFxyXG4gICAgICAgICAgICBhOiBuZXcgTWFwKCksXHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCBydW5Ib29rID0gKGN0eHQsIGFyZ3MsIGNvbnN0cnVjdCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCByZXQgPSBob29rKGZ1bmNOYW1lLCBmdW5jUGFyZW50LCBhcmdzLCBjdHh0LCBjb25zdHJ1Y3QpO1xyXG4gICAgICAgICAgICBpZiAob25lVGltZSlcclxuICAgICAgICAgICAgICAgIHVucGF0Y2hUaGlzUGF0Y2goKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJldDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IHJlcGxhY2VQcm94eSA9IG5ldyBQcm94eShvcmlnRnVuYywge1xyXG4gICAgICAgICAgICBhcHBseTogKF8sIGN0eHQsIGFyZ3MpID0+IHJ1bkhvb2soY3R4dCwgYXJncywgZmFsc2UpLFxyXG4gICAgICAgICAgICBjb25zdHJ1Y3Q6IChfLCBhcmdzKSA9PiBydW5Ib29rKG9yaWdGdW5jLCBhcmdzLCB0cnVlKSxcclxuICAgICAgICAgICAgZ2V0OiAodGFyZ2V0LCBwcm9wLCByZWNlaXZlcikgPT4gcHJvcCA9PSBcInRvU3RyaW5nXCJcclxuICAgICAgICAgICAgICAgID8gb3JpZ0Z1bmMudG9TdHJpbmcuYmluZChvcmlnRnVuYylcclxuICAgICAgICAgICAgICAgIDogUmVmbGVjdC5nZXQodGFyZ2V0LCBwcm9wLCByZWNlaXZlciksXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gdGhpcyB3b3JrcyBhcm91bmQgYnJlYWtpbmcgc29tZSBhc3luYyBmaW5kIGltcGxlbWVudGF0aW9uIHdoaWNoIGxpc3RlbnMgZm9yIGFzc2lnbnMgdmlhIHByb3h5XHJcbiAgICAgICAgLy8gc2VlIGNvbW1lbnQgaW4gdW5wYXRjaC50c1xyXG4gICAgICAgIGNvbnN0IHN1Y2Nlc3MgPSBSZWZsZWN0LmRlZmluZVByb3BlcnR5KGZ1bmNQYXJlbnQsIGZ1bmNOYW1lLCB7XHJcbiAgICAgICAgICAgIHZhbHVlOiByZXBsYWNlUHJveHksXHJcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKCFzdWNjZXNzKVxyXG4gICAgICAgICAgICBmdW5jUGFyZW50W2Z1bmNOYW1lXSA9IHJlcGxhY2VQcm94eTtcclxuICAgICAgICBmdW5jUGFyZW50W2Z1bmNOYW1lXS5fX29yaWdpbmFsX18gPSBwYXJlbnRJbmplY3Rpb25zW2Z1bmNOYW1lXS5vO1xyXG4gICAgfVxyXG4gICAgY29uc3QgaG9va0lkID0gU3ltYm9sKCk7XHJcbiAgICBjb25zdCB1bnBhdGNoVGhpc1BhdGNoID0gKCkgPT4gdW5QYXRjaChmdW5jUGFyZW50LCBmdW5jTmFtZSwgaG9va0lkLCBwYXRjaFR5cGUpO1xyXG4gICAgcGFyZW50SW5qZWN0aW9uc1tmdW5jTmFtZV1bcGF0Y2hUeXBlXS5zZXQoaG9va0lkLCBjYWxsYmFjayk7XHJcbiAgICByZXR1cm4gdW5wYXRjaFRoaXNQYXRjaDtcclxufTtcclxuIiwgImltcG9ydCBnZXRQYXRjaEZ1bmMgZnJvbSBcIi4vZ2V0LXBhdGNoLWZ1bmMuanNcIjtcclxuaW1wb3J0IHsgdW5QYXRjaEFsbCB9IGZyb20gXCIuL3VuLXBhdGNoLmpzXCI7XHJcbmltcG9ydCB7IHBhdGNoZWRPYmplY3RzIGFzIHBhdGNoZWQgfSBmcm9tIFwiLi9zaGFyZWQuanNcIjtcclxuY29uc3QgYmVmb3JlID0gZ2V0UGF0Y2hGdW5jKFwiYlwiKTtcclxuY29uc3QgaW5zdGVhZCA9IGdldFBhdGNoRnVuYyhcImlcIik7XHJcbmNvbnN0IGFmdGVyID0gZ2V0UGF0Y2hGdW5jKFwiYVwiKTtcclxuZXhwb3J0IHsgaW5zdGVhZCwgYmVmb3JlLCBhZnRlciwgdW5QYXRjaEFsbCwgcGF0Y2hlZCB9O1xyXG4iLCAiaW1wb3J0ICogYXMgc3BpdFJvYXN0IGZyb20gXCIuLi8uLi9saWIvc3BpdHJvYXN0L2Rpc3QvZXNtXCI7XHJcblxyXG5mdW5jdGlvbiBwcm9wUmVwbGFjZXIoY3NzLCBwcm9wcyA9IHt9KSB7XHJcbiAgY3NzID0gY3NzLnJlcGxhY2UoL3ZhclxcKC0tYWNvcmQtLShbXFxTXFxzXSspXFwpL2csIChtYXRjaCwgZ3JvdXAxKSA9PiB7XHJcbiAgICBsZXQgc3BsaXR0ZWQgPSBncm91cDEuc3BsaXQoXCIsXCIpO1xyXG4gICAgbGV0IGtleSA9IHNwbGl0dGVkLnNoaWZ0KCkudHJpbSgpO1xyXG4gICAgbGV0IGRlZmF1bHRWYWx1ZSA9IHNwbGl0dGVkLmpvaW4oXCIsXCIpLnRyaW0oKTtcclxuICAgIHJldHVybiBwcm9wc1trZXldID8/IChkZWZhdWx0VmFsdWUgfHwgbWF0Y2gpO1xyXG4gIH0pO1xyXG4gIHJldHVybiBjc3M7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBfX2NhY2hlX186IHtcclxuICAgIHBhdGNoZWQ6IHNwaXRSb2FzdC5wYXRjaGVkLFxyXG4gIH0sXHJcbiAgYmVmb3JlOiBzcGl0Um9hc3QuYmVmb3JlLFxyXG4gIGFmdGVyOiBzcGl0Um9hc3QuYWZ0ZXIsXHJcbiAgaW5zdGVhZDogc3BpdFJvYXN0Lmluc3RlYWQsXHJcbiAgdW5QYXRjaEFsbDogc3BpdFJvYXN0LnVuUGF0Y2hBbGwsXHJcbiAgaW5qZWN0Q1NTKGNzcywgY3VzdG9tUHJvcHMgPSB7fSkge1xyXG4gICAgY29uc3Qgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XHJcbiAgICBzdHlsZS5jbGFzc05hbWUgPSBgYWNvcmQtLWluamVjdGVkLWNzc2A7XHJcbiAgICBzdHlsZS50ZXh0Q29udGVudCA9IHByb3BSZXBsYWNlcihjc3MsIGN1c3RvbVByb3BzKTtcclxuICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xyXG5cclxuICAgIHJldHVybiAoLi4uYXJncykgPT4ge1xyXG4gICAgICBpZiAodHlwZW9mIGFyZ3NbMF0gPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICBzdHlsZS50ZXh0Q29udGVudCA9IHByb3BSZXBsYWNlcihhcmdzWzBdLCBhcmdzWzFdKTtcclxuICAgICAgICBjc3MgPSBhcmdzWzBdO1xyXG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBhcmdzWzBdID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgc3R5bGUudGV4dENvbnRlbnQgPSBwcm9wUmVwbGFjZXIoY3NzLCBhcmdzWzBdKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzdHlsZT8ucmVtb3ZlKCk7XHJcbiAgICAgICAgY3NzID0gbnVsbDtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9LFxyXG4gIHVuUGF0Y2hBbGxDU1MoKSB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmFjb3JkLS1pbmplY3RlZC1jc3NcIikuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgZWxlbWVudC5yZW1vdmUoKTtcclxuICAgIH0pXHJcbiAgfVxyXG59IiwgImV4cG9ydCBkZWZhdWx0IGBcbkBrZXlmcmFtZXMgYWNvcmRMb2FkaW5nRmFkZXswJXtvcGFjaXR5Oi4xfTEwMCV7b3BhY2l0eTouOX19LmFjb3JkLS1zdGFydHVwLWxvYWRpbmd7YW5pbWF0aW9uOmFjb3JkTG9hZGluZ0ZhZGUgLjVzIGFsdGVybmF0ZSBpbmZpbml0ZSBsaW5lYXI7cG9zaXRpb246YWJzb2x1dGU7dHJhbnNpdGlvbjphbGwgLjVzIGxpbmVhcjtyaWdodDo4cHg7Ym90dG9tOjhweDt3aWR0aDoxNnB4O2hlaWdodDoxNnB4O2JhY2tncm91bmQtaW1hZ2U6dXJsKFwiaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL0Fjb3JkUGx1Z2luL2Fzc2V0cy9tYWluL0Fjb3JkLnN2Z1wiKTtmaWx0ZXI6Z3JheXNjYWxlKDEpIGJyaWdodG5lc3MoMSk7YmFja2dyb3VuZC1wb3NpdGlvbjpjZW50ZXI7YmFja2dyb3VuZC1yZXBlYXQ6bm8tcmVwZWF0O2JhY2tncm91bmQtc2l6ZTpjb250YWluO3otaW5kZXg6OTk5OTk5fS5hY29yZC0tc3RhcnR1cC1sb2FkaW5nLmhpZGRlbntvcGFjaXR5OjAgIWltcG9ydGFudH1gO1xuIiwgImltcG9ydCBkb20gZnJvbSBcIi4uLy4uL2FwaS9kb20vaW5kZXguanNcIjtcclxuaW1wb3J0IHBhdGNoZXIgZnJvbSBcIi4uLy4uL2FwaS9wYXRjaGVyL2luZGV4LmpzXCI7XHJcblxyXG5pbXBvcnQgY3NzVGV4dCBmcm9tIFwiLi9zdHlsZS5zY3NzXCI7XHJcbmxldCB1bkluamVjdDtcclxuXHJcbmFzeW5jIGZ1bmN0aW9uIHNob3coKSB7XHJcbiAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWNvcmQtLXN0YXJ0dXAtbG9hZGluZ1wiKSkgcmV0dXJuO1xyXG4gIHdoaWxlICh0cnVlKSB7XHJcbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhcHAtbW91bnRcIikpIGJyZWFrO1xyXG4gICAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgMTAwKSk7XHJcbiAgfVxyXG4gIFxyXG4gIHVuSW5qZWN0ID0gcGF0Y2hlci5pbmplY3RDU1MoY3NzVGV4dCk7XHJcbiAgY29uc3QgZWxlbWVudCA9IGRvbS5wYXJzZShgXHJcbiAgICA8ZGl2IGNsYXNzPVwiYWNvcmQtLXN0YXJ0dXAtbG9hZGluZ1wiPjwvZGl2PlxyXG4gIGApXHJcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhcHAtbW91bnRcIikuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhpZGUoKSB7XHJcbiAgbGV0IGVsbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWNvcmQtLXN0YXJ0dXAtbG9hZGluZ1wiKTtcclxuICBpZiAoZWxtKSB7XHJcbiAgICBlbG0uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBlbG0ucmVtb3ZlKCk7XHJcbiAgICAgIHVuSW5qZWN0Py4oKTtcclxuICAgICAgdW5JbmplY3QgPSBudWxsO1xyXG4gICAgfSwgNTAwKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBzaG93LFxyXG4gIGhpZGVcclxufSIsICJpbXBvcnQgKiBhcyBuZXN0cyBmcm9tIFwibmVzdHNcIjtcclxuaW1wb3J0ICogYXMgaWRiS2V5dmFsIGZyb20gXCJpZGIta2V5dmFsXCI7XHJcbmltcG9ydCB7IGRlQ3ljbGVkLCByZXZpdmUgfSBmcm9tIFwiLi4vLi4vbGliL2pzb24tZGVjeWNsZWRcIjtcclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGFzeW5jIGNyZWF0ZVBlcnNpc3ROZXN0KHN1ZmZpeCkge1xyXG4gICAgbGV0IGNhY2hlZCA9IGF3YWl0IGlkYktleXZhbC5nZXQoYEFjb3JkU3RvcmU7JHtzdWZmaXh9YCk7XHJcbiAgICBpZiAodHlwZW9mIGNhY2hlZCA9PSBcInN0cmluZ1wiKSBjYWNoZWQgPSByZXZpdmUoY2FjaGVkKTtcclxuICAgIGNvbnN0IG5lc3QgPSBuZXN0cy5tYWtlKGNhY2hlZCA/PyB7fSk7XHJcblxyXG4gICAgY29uc3Qgc2F2ZSA9ICgpID0+IHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBpZGJLZXl2YWwuc2V0KGBBY29yZFN0b3JlOyR7c3VmZml4fWAsIGRlQ3ljbGVkKHsgLi4ubmVzdC5naG9zdCB9KSk7XHJcbiAgICAgIH0gY2F0Y2gge1xyXG4gICAgICAgIGlkYktleXZhbC5zZXQoYEFjb3JkU3RvcmU7JHtzdWZmaXh9YCwgZGVDeWNsZWQoe30pKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG5lc3Qub24obmVzdHMuRXZlbnRzLlNFVCwgc2F2ZSk7XHJcbiAgICBuZXN0Lm9uKG5lc3RzLkV2ZW50cy5VUERBVEUsIHNhdmUpO1xyXG4gICAgbmVzdC5vbihuZXN0cy5FdmVudHMuREVMRVRFLCBzYXZlKTtcclxuXHJcbiAgICByZXR1cm4gbmVzdDtcclxuICB9XHJcbn0iLCAiZnVuY3Rpb24gcHJvbWlzaWZ5UmVxdWVzdChyZXF1ZXN0KSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZSAtIGZpbGUgc2l6ZSBoYWNrc1xuICAgICAgICByZXF1ZXN0Lm9uY29tcGxldGUgPSByZXF1ZXN0Lm9uc3VjY2VzcyA9ICgpID0+IHJlc29sdmUocmVxdWVzdC5yZXN1bHQpO1xuICAgICAgICAvLyBAdHMtaWdub3JlIC0gZmlsZSBzaXplIGhhY2tzXG4gICAgICAgIHJlcXVlc3Qub25hYm9ydCA9IHJlcXVlc3Qub25lcnJvciA9ICgpID0+IHJlamVjdChyZXF1ZXN0LmVycm9yKTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZVN0b3JlKGRiTmFtZSwgc3RvcmVOYW1lKSB7XG4gICAgY29uc3QgcmVxdWVzdCA9IGluZGV4ZWREQi5vcGVuKGRiTmFtZSk7XG4gICAgcmVxdWVzdC5vbnVwZ3JhZGVuZWVkZWQgPSAoKSA9PiByZXF1ZXN0LnJlc3VsdC5jcmVhdGVPYmplY3RTdG9yZShzdG9yZU5hbWUpO1xuICAgIGNvbnN0IGRicCA9IHByb21pc2lmeVJlcXVlc3QocmVxdWVzdCk7XG4gICAgcmV0dXJuICh0eE1vZGUsIGNhbGxiYWNrKSA9PiBkYnAudGhlbigoZGIpID0+IGNhbGxiYWNrKGRiLnRyYW5zYWN0aW9uKHN0b3JlTmFtZSwgdHhNb2RlKS5vYmplY3RTdG9yZShzdG9yZU5hbWUpKSk7XG59XG5sZXQgZGVmYXVsdEdldFN0b3JlRnVuYztcbmZ1bmN0aW9uIGRlZmF1bHRHZXRTdG9yZSgpIHtcbiAgICBpZiAoIWRlZmF1bHRHZXRTdG9yZUZ1bmMpIHtcbiAgICAgICAgZGVmYXVsdEdldFN0b3JlRnVuYyA9IGNyZWF0ZVN0b3JlKCdrZXl2YWwtc3RvcmUnLCAna2V5dmFsJyk7XG4gICAgfVxuICAgIHJldHVybiBkZWZhdWx0R2V0U3RvcmVGdW5jO1xufVxuLyoqXG4gKiBHZXQgYSB2YWx1ZSBieSBpdHMga2V5LlxuICpcbiAqIEBwYXJhbSBrZXlcbiAqIEBwYXJhbSBjdXN0b21TdG9yZSBNZXRob2QgdG8gZ2V0IGEgY3VzdG9tIHN0b3JlLiBVc2Ugd2l0aCBjYXV0aW9uIChzZWUgdGhlIGRvY3MpLlxuICovXG5mdW5jdGlvbiBnZXQoa2V5LCBjdXN0b21TdG9yZSA9IGRlZmF1bHRHZXRTdG9yZSgpKSB7XG4gICAgcmV0dXJuIGN1c3RvbVN0b3JlKCdyZWFkb25seScsIChzdG9yZSkgPT4gcHJvbWlzaWZ5UmVxdWVzdChzdG9yZS5nZXQoa2V5KSkpO1xufVxuLyoqXG4gKiBTZXQgYSB2YWx1ZSB3aXRoIGEga2V5LlxuICpcbiAqIEBwYXJhbSBrZXlcbiAqIEBwYXJhbSB2YWx1ZVxuICogQHBhcmFtIGN1c3RvbVN0b3JlIE1ldGhvZCB0byBnZXQgYSBjdXN0b20gc3RvcmUuIFVzZSB3aXRoIGNhdXRpb24gKHNlZSB0aGUgZG9jcykuXG4gKi9cbmZ1bmN0aW9uIHNldChrZXksIHZhbHVlLCBjdXN0b21TdG9yZSA9IGRlZmF1bHRHZXRTdG9yZSgpKSB7XG4gICAgcmV0dXJuIGN1c3RvbVN0b3JlKCdyZWFkd3JpdGUnLCAoc3RvcmUpID0+IHtcbiAgICAgICAgc3RvcmUucHV0KHZhbHVlLCBrZXkpO1xuICAgICAgICByZXR1cm4gcHJvbWlzaWZ5UmVxdWVzdChzdG9yZS50cmFuc2FjdGlvbik7XG4gICAgfSk7XG59XG4vKipcbiAqIFNldCBtdWx0aXBsZSB2YWx1ZXMgYXQgb25jZS4gVGhpcyBpcyBmYXN0ZXIgdGhhbiBjYWxsaW5nIHNldCgpIG11bHRpcGxlIHRpbWVzLlxuICogSXQncyBhbHNvIGF0b21pYyBcdTIwMTMgaWYgb25lIG9mIHRoZSBwYWlycyBjYW4ndCBiZSBhZGRlZCwgbm9uZSB3aWxsIGJlIGFkZGVkLlxuICpcbiAqIEBwYXJhbSBlbnRyaWVzIEFycmF5IG9mIGVudHJpZXMsIHdoZXJlIGVhY2ggZW50cnkgaXMgYW4gYXJyYXkgb2YgYFtrZXksIHZhbHVlXWAuXG4gKiBAcGFyYW0gY3VzdG9tU3RvcmUgTWV0aG9kIHRvIGdldCBhIGN1c3RvbSBzdG9yZS4gVXNlIHdpdGggY2F1dGlvbiAoc2VlIHRoZSBkb2NzKS5cbiAqL1xuZnVuY3Rpb24gc2V0TWFueShlbnRyaWVzLCBjdXN0b21TdG9yZSA9IGRlZmF1bHRHZXRTdG9yZSgpKSB7XG4gICAgcmV0dXJuIGN1c3RvbVN0b3JlKCdyZWFkd3JpdGUnLCAoc3RvcmUpID0+IHtcbiAgICAgICAgZW50cmllcy5mb3JFYWNoKChlbnRyeSkgPT4gc3RvcmUucHV0KGVudHJ5WzFdLCBlbnRyeVswXSkpO1xuICAgICAgICByZXR1cm4gcHJvbWlzaWZ5UmVxdWVzdChzdG9yZS50cmFuc2FjdGlvbik7XG4gICAgfSk7XG59XG4vKipcbiAqIEdldCBtdWx0aXBsZSB2YWx1ZXMgYnkgdGhlaXIga2V5c1xuICpcbiAqIEBwYXJhbSBrZXlzXG4gKiBAcGFyYW0gY3VzdG9tU3RvcmUgTWV0aG9kIHRvIGdldCBhIGN1c3RvbSBzdG9yZS4gVXNlIHdpdGggY2F1dGlvbiAoc2VlIHRoZSBkb2NzKS5cbiAqL1xuZnVuY3Rpb24gZ2V0TWFueShrZXlzLCBjdXN0b21TdG9yZSA9IGRlZmF1bHRHZXRTdG9yZSgpKSB7XG4gICAgcmV0dXJuIGN1c3RvbVN0b3JlKCdyZWFkb25seScsIChzdG9yZSkgPT4gUHJvbWlzZS5hbGwoa2V5cy5tYXAoKGtleSkgPT4gcHJvbWlzaWZ5UmVxdWVzdChzdG9yZS5nZXQoa2V5KSkpKSk7XG59XG4vKipcbiAqIFVwZGF0ZSBhIHZhbHVlLiBUaGlzIGxldHMgeW91IHNlZSB0aGUgb2xkIHZhbHVlIGFuZCB1cGRhdGUgaXQgYXMgYW4gYXRvbWljIG9wZXJhdGlvbi5cbiAqXG4gKiBAcGFyYW0ga2V5XG4gKiBAcGFyYW0gdXBkYXRlciBBIGNhbGxiYWNrIHRoYXQgdGFrZXMgdGhlIG9sZCB2YWx1ZSBhbmQgcmV0dXJucyBhIG5ldyB2YWx1ZS5cbiAqIEBwYXJhbSBjdXN0b21TdG9yZSBNZXRob2QgdG8gZ2V0IGEgY3VzdG9tIHN0b3JlLiBVc2Ugd2l0aCBjYXV0aW9uIChzZWUgdGhlIGRvY3MpLlxuICovXG5mdW5jdGlvbiB1cGRhdGUoa2V5LCB1cGRhdGVyLCBjdXN0b21TdG9yZSA9IGRlZmF1bHRHZXRTdG9yZSgpKSB7XG4gICAgcmV0dXJuIGN1c3RvbVN0b3JlKCdyZWFkd3JpdGUnLCAoc3RvcmUpID0+IFxuICAgIC8vIE5lZWQgdG8gY3JlYXRlIHRoZSBwcm9taXNlIG1hbnVhbGx5LlxuICAgIC8vIElmIEkgdHJ5IHRvIGNoYWluIHByb21pc2VzLCB0aGUgdHJhbnNhY3Rpb24gY2xvc2VzIGluIGJyb3dzZXJzXG4gICAgLy8gdGhhdCB1c2UgYSBwcm9taXNlIHBvbHlmaWxsIChJRTEwLzExKS5cbiAgICBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIHN0b3JlLmdldChrZXkpLm9uc3VjY2VzcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgc3RvcmUucHV0KHVwZGF0ZXIodGhpcy5yZXN1bHQpLCBrZXkpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUocHJvbWlzaWZ5UmVxdWVzdChzdG9yZS50cmFuc2FjdGlvbikpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0pKTtcbn1cbi8qKlxuICogRGVsZXRlIGEgcGFydGljdWxhciBrZXkgZnJvbSB0aGUgc3RvcmUuXG4gKlxuICogQHBhcmFtIGtleVxuICogQHBhcmFtIGN1c3RvbVN0b3JlIE1ldGhvZCB0byBnZXQgYSBjdXN0b20gc3RvcmUuIFVzZSB3aXRoIGNhdXRpb24gKHNlZSB0aGUgZG9jcykuXG4gKi9cbmZ1bmN0aW9uIGRlbChrZXksIGN1c3RvbVN0b3JlID0gZGVmYXVsdEdldFN0b3JlKCkpIHtcbiAgICByZXR1cm4gY3VzdG9tU3RvcmUoJ3JlYWR3cml0ZScsIChzdG9yZSkgPT4ge1xuICAgICAgICBzdG9yZS5kZWxldGUoa2V5KTtcbiAgICAgICAgcmV0dXJuIHByb21pc2lmeVJlcXVlc3Qoc3RvcmUudHJhbnNhY3Rpb24pO1xuICAgIH0pO1xufVxuLyoqXG4gKiBEZWxldGUgbXVsdGlwbGUga2V5cyBhdCBvbmNlLlxuICpcbiAqIEBwYXJhbSBrZXlzIExpc3Qgb2Yga2V5cyB0byBkZWxldGUuXG4gKiBAcGFyYW0gY3VzdG9tU3RvcmUgTWV0aG9kIHRvIGdldCBhIGN1c3RvbSBzdG9yZS4gVXNlIHdpdGggY2F1dGlvbiAoc2VlIHRoZSBkb2NzKS5cbiAqL1xuZnVuY3Rpb24gZGVsTWFueShrZXlzLCBjdXN0b21TdG9yZSA9IGRlZmF1bHRHZXRTdG9yZSgpKSB7XG4gICAgcmV0dXJuIGN1c3RvbVN0b3JlKCdyZWFkd3JpdGUnLCAoc3RvcmUpID0+IHtcbiAgICAgICAga2V5cy5mb3JFYWNoKChrZXkpID0+IHN0b3JlLmRlbGV0ZShrZXkpKTtcbiAgICAgICAgcmV0dXJuIHByb21pc2lmeVJlcXVlc3Qoc3RvcmUudHJhbnNhY3Rpb24pO1xuICAgIH0pO1xufVxuLyoqXG4gKiBDbGVhciBhbGwgdmFsdWVzIGluIHRoZSBzdG9yZS5cbiAqXG4gKiBAcGFyYW0gY3VzdG9tU3RvcmUgTWV0aG9kIHRvIGdldCBhIGN1c3RvbSBzdG9yZS4gVXNlIHdpdGggY2F1dGlvbiAoc2VlIHRoZSBkb2NzKS5cbiAqL1xuZnVuY3Rpb24gY2xlYXIoY3VzdG9tU3RvcmUgPSBkZWZhdWx0R2V0U3RvcmUoKSkge1xuICAgIHJldHVybiBjdXN0b21TdG9yZSgncmVhZHdyaXRlJywgKHN0b3JlKSA9PiB7XG4gICAgICAgIHN0b3JlLmNsZWFyKCk7XG4gICAgICAgIHJldHVybiBwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLnRyYW5zYWN0aW9uKTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGVhY2hDdXJzb3Ioc3RvcmUsIGNhbGxiYWNrKSB7XG4gICAgc3RvcmUub3BlbkN1cnNvcigpLm9uc3VjY2VzcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnJlc3VsdClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgY2FsbGJhY2sodGhpcy5yZXN1bHQpO1xuICAgICAgICB0aGlzLnJlc3VsdC5jb250aW51ZSgpO1xuICAgIH07XG4gICAgcmV0dXJuIHByb21pc2lmeVJlcXVlc3Qoc3RvcmUudHJhbnNhY3Rpb24pO1xufVxuLyoqXG4gKiBHZXQgYWxsIGtleXMgaW4gdGhlIHN0b3JlLlxuICpcbiAqIEBwYXJhbSBjdXN0b21TdG9yZSBNZXRob2QgdG8gZ2V0IGEgY3VzdG9tIHN0b3JlLiBVc2Ugd2l0aCBjYXV0aW9uIChzZWUgdGhlIGRvY3MpLlxuICovXG5mdW5jdGlvbiBrZXlzKGN1c3RvbVN0b3JlID0gZGVmYXVsdEdldFN0b3JlKCkpIHtcbiAgICByZXR1cm4gY3VzdG9tU3RvcmUoJ3JlYWRvbmx5JywgKHN0b3JlKSA9PiB7XG4gICAgICAgIC8vIEZhc3QgcGF0aCBmb3IgbW9kZXJuIGJyb3dzZXJzXG4gICAgICAgIGlmIChzdG9yZS5nZXRBbGxLZXlzKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzaWZ5UmVxdWVzdChzdG9yZS5nZXRBbGxLZXlzKCkpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGl0ZW1zID0gW107XG4gICAgICAgIHJldHVybiBlYWNoQ3Vyc29yKHN0b3JlLCAoY3Vyc29yKSA9PiBpdGVtcy5wdXNoKGN1cnNvci5rZXkpKS50aGVuKCgpID0+IGl0ZW1zKTtcbiAgICB9KTtcbn1cbi8qKlxuICogR2V0IGFsbCB2YWx1ZXMgaW4gdGhlIHN0b3JlLlxuICpcbiAqIEBwYXJhbSBjdXN0b21TdG9yZSBNZXRob2QgdG8gZ2V0IGEgY3VzdG9tIHN0b3JlLiBVc2Ugd2l0aCBjYXV0aW9uIChzZWUgdGhlIGRvY3MpLlxuICovXG5mdW5jdGlvbiB2YWx1ZXMoY3VzdG9tU3RvcmUgPSBkZWZhdWx0R2V0U3RvcmUoKSkge1xuICAgIHJldHVybiBjdXN0b21TdG9yZSgncmVhZG9ubHknLCAoc3RvcmUpID0+IHtcbiAgICAgICAgLy8gRmFzdCBwYXRoIGZvciBtb2Rlcm4gYnJvd3NlcnNcbiAgICAgICAgaWYgKHN0b3JlLmdldEFsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHByb21pc2lmeVJlcXVlc3Qoc3RvcmUuZ2V0QWxsKCkpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGl0ZW1zID0gW107XG4gICAgICAgIHJldHVybiBlYWNoQ3Vyc29yKHN0b3JlLCAoY3Vyc29yKSA9PiBpdGVtcy5wdXNoKGN1cnNvci52YWx1ZSkpLnRoZW4oKCkgPT4gaXRlbXMpO1xuICAgIH0pO1xufVxuLyoqXG4gKiBHZXQgYWxsIGVudHJpZXMgaW4gdGhlIHN0b3JlLiBFYWNoIGVudHJ5IGlzIGFuIGFycmF5IG9mIGBba2V5LCB2YWx1ZV1gLlxuICpcbiAqIEBwYXJhbSBjdXN0b21TdG9yZSBNZXRob2QgdG8gZ2V0IGEgY3VzdG9tIHN0b3JlLiBVc2Ugd2l0aCBjYXV0aW9uIChzZWUgdGhlIGRvY3MpLlxuICovXG5mdW5jdGlvbiBlbnRyaWVzKGN1c3RvbVN0b3JlID0gZGVmYXVsdEdldFN0b3JlKCkpIHtcbiAgICByZXR1cm4gY3VzdG9tU3RvcmUoJ3JlYWRvbmx5JywgKHN0b3JlKSA9PiB7XG4gICAgICAgIC8vIEZhc3QgcGF0aCBmb3IgbW9kZXJuIGJyb3dzZXJzXG4gICAgICAgIC8vIChhbHRob3VnaCwgaG9wZWZ1bGx5IHdlJ2xsIGdldCBhIHNpbXBsZXIgcGF0aCBzb21lIGRheSlcbiAgICAgICAgaWYgKHN0b3JlLmdldEFsbCAmJiBzdG9yZS5nZXRBbGxLZXlzKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgICAgIHByb21pc2lmeVJlcXVlc3Qoc3RvcmUuZ2V0QWxsS2V5cygpKSxcbiAgICAgICAgICAgICAgICBwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLmdldEFsbCgpKSxcbiAgICAgICAgICAgIF0pLnRoZW4oKFtrZXlzLCB2YWx1ZXNdKSA9PiBrZXlzLm1hcCgoa2V5LCBpKSA9PiBba2V5LCB2YWx1ZXNbaV1dKSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaXRlbXMgPSBbXTtcbiAgICAgICAgcmV0dXJuIGN1c3RvbVN0b3JlKCdyZWFkb25seScsIChzdG9yZSkgPT4gZWFjaEN1cnNvcihzdG9yZSwgKGN1cnNvcikgPT4gaXRlbXMucHVzaChbY3Vyc29yLmtleSwgY3Vyc29yLnZhbHVlXSkpLnRoZW4oKCkgPT4gaXRlbXMpKTtcbiAgICB9KTtcbn1cblxuZXhwb3J0IHsgY2xlYXIsIGNyZWF0ZVN0b3JlLCBkZWwsIGRlbE1hbnksIGVudHJpZXMsIGdldCwgZ2V0TWFueSwga2V5cywgcHJvbWlzaWZ5UmVxdWVzdCwgc2V0LCBzZXRNYW55LCB1cGRhdGUsIHZhbHVlcyB9O1xuIiwgIlwidXNlIHN0cmljdFwiO1xyXG5cclxuZnVuY3Rpb24gZGVDeWNsZXIodmFsLCBjb25maWcpIHtcclxuICBjb25maWcgPSB0eXBlb2YgY29uZmlnID09PSAnbnVtYmVyJyA/IHsgZGVlcDogY29uZmlnIH0gOiAoY29uZmlnIHx8IHt9KTtcclxuICBjb25maWcuZGVlcCA9IGNvbmZpZy5kZWVwIHx8IDEwO1xyXG4gIHJldHVybiBkZWN5Y2xlV2Fsa2VyKFtdLCBbXSwgdmFsLCBjb25maWcpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkZUN5Y2xlZCh2YWwsIGNvbmZpZykge1xyXG4gIGNvbmZpZyA9IHR5cGVvZiBjb25maWcgPT09ICdudW1iZXInID8geyBkZWVwOiBjb25maWcgfSA6IChjb25maWcgfHwge30pO1xyXG4gIHZhbCA9IGRlQ3ljbGVyKHZhbCwgY29uZmlnKTtcclxuICB0cnkge1xyXG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHZhbCwgdW5kZWZpbmVkLCBjb25maWcuc3BhY2VyKTtcclxuICB9IGNhdGNoIChlKSB7XHJcbiAgICByZXR1cm4gZTtcclxuICB9XHJcbn1cclxuXHJcbnZhciByZXZpdmVyRGF0ZSA9IC9eXFxbRGF0ZTooKFxcZHs0fS1cXGR7Mn0tXFxkezJ9KVtBLVpdKyhcXGR7Mn06XFxkezJ9OlxcZHsyfSkuKFswLTkrLTpdKylaKVxcXSQvO1xyXG52YXIgcmV2aXZlclJlZ0V4cCA9IC9eXFxbUmVnZXhwOlxcLyguKylcXC9cXF0kLztcclxudmFyIHJldml2ZXJFcnJvciA9IC9eXFxbRXJyb3I6KFtcXFdcXHddKylcXF0kLztcclxudmFyIHJldml2ZXJGdW5jdGlvbiA9IC9eXFxbRnVuY3Rpb246KC4rKVxcXSQvO1xyXG5mdW5jdGlvbiByZXZpdmUodmFsLCBmdW5jdGlvbnMpIHtcclxuICB0cnkge1xyXG4gICAgcmV0dXJuIEpTT04ucGFyc2UodmFsLCByZXZpdmVyKTtcclxuICB9IGNhdGNoIChlKSB7XHJcbiAgICByZXR1cm4gZTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHJldml2ZXIoa2V5LCB2YWwpIHtcclxuICAgIGlmIChyZXZpdmVyRGF0ZS50ZXN0KHZhbCkpIHtcclxuICAgICAgdmFsID0gcmV2aXZlckRhdGUuZXhlYyh2YWwpO1xyXG4gICAgICB2YWwgPSBuZXcgRGF0ZSh2YWxbMV0pO1xyXG4gICAgICByZXR1cm4gbmV3IERhdGUodmFsKTtcclxuICAgIH0gZWxzZSBpZiAocmV2aXZlclJlZ0V4cC50ZXN0KHZhbCkpIHtcclxuICAgICAgdmFsID0gcmV2aXZlclJlZ0V4cC5leGVjKHZhbClbMV07XHJcbiAgICAgIHJldHVybiBuZXcgUmVnRXhwKHZhbCk7XHJcbiAgICB9IGVsc2UgaWYgKHJldml2ZXJFcnJvci50ZXN0KHZhbCkpIHtcclxuICAgICAgdmFsID0gcmV2aXZlckVycm9yLmV4ZWModmFsKVsxXTtcclxuICAgICAgdmFyIGVycm9yID0gbmV3IEVycm9yKHZhbC5zcGxpdCgnXFxuJylbMF0pO1xyXG4gICAgICBpZiAoZXJyb3Iuc3RhY2spIHtcclxuICAgICAgICBlcnJvci5zdGFjayA9IHZhbDtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gZXJyb3I7XHJcbiAgICB9IGVsc2UgaWYgKGZ1bmN0aW9ucyAmJiByZXZpdmVyRnVuY3Rpb24udGVzdCh2YWwpKSB7XHJcbiAgICAgIHZhbCA9IHJldml2ZXJGdW5jdGlvbi5leGVjKHZhbClbMV07XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgcmV0dXJuIChuZXcgRnVuY3Rpb24oXCJyZXR1cm4gXCIgKyB2YWwgKyBcIjtcIikpKCk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgcmV0dXJuIGVycm9yO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gdmFsO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZGVjeWNsZVdhbGtlcihwYXJlbnRzLCBwYXRoLCB2YWwsIGNvbmZpZykge1xyXG4gIGlmIChbJ3VuZGVmaW5lZCcsICdudW1iZXInLCAnYm9vbGVhbicsICdzdHJpbmcnXS5pbmRleE9mKHR5cGVvZiB2YWwpID49IDAgfHwgdmFsID09PSBudWxsKSB7XHJcbiAgICByZXR1cm4gdmFsO1xyXG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ29iamVjdCcgJiYgdmFsLmNvbnN0cnVjdG9yID09PSBEYXRlKSB7XHJcbiAgICByZXR1cm4gY29uZmlnLmRhdGVzICE9PSBmYWxzZSA/ICdbRGF0ZTonICsgdmFsLnRvSVNPU3RyaW5nKCkgKyAnXScgOiB2YWw7XHJcbiAgICAvL3ZhbC5mb3JtYXQoJ3tZWVlZfS97TU19L3tERH0ge2hofTp7bW19Ontzc30gVVRDOlx1MDBCN3twYXJhbXMudHo+PTA/XCIrXCIrcGFyYW1zLnR6OnBhcmFtcy50en1cdTAwQjcnKTtcclxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdvYmplY3QnICYmIHZhbC5jb25zdHJ1Y3RvciA9PT0gUmVnRXhwKSB7XHJcbiAgICByZXR1cm4gY29uZmlnLnJlZ2V4cHMgIT09IGZhbHNlID8gJ1tSZWdleHA6JyArIHZhbC50b1N0cmluZygpICsgJ10nIDogdmFsO1xyXG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ29iamVjdCcgJiYgdmFsLmNvbnN0cnVjdG9yICYmIHR5cGVvZiB2YWwuY29uc3RydWN0b3IubmFtZSA9PT0gJ3N0cmluZycgJiYgdmFsLmNvbnN0cnVjdG9yLm5hbWUuc2xpY2UoLTUpID09PSAnRXJyb3InKSB7XHJcbiAgICB2YXIgc3RhY2sgPSAodmFsLnN0YWNrIHx8ICcnKS5zcGxpdCgnXFxuJykuc2xpY2UoMSk7XHJcbiAgICB2YXIgbWVzc2FnZSA9ICh2YWwubWVzc2FnZSB8fCB2YWwudG9TdHJpbmcoKSk7XHJcbiAgICB2YXIgZXJyb3IgPSBtZXNzYWdlICsgXCJcXG5cIiArIHN0YWNrO1xyXG4gICAgcmV0dXJuIGNvbmZpZy5lcnJvcnMgIT09IGZhbHNlID8gJ1tFcnJvcjonICsgZXJyb3IgKyAnXScgOiB2YWw7XHJcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnb2JqZWN0Jykge1xyXG4gICAgaWYgKHBhcmVudHMuaW5kZXhPZih2YWwpID49IDApIHtcclxuICAgICAgdmFyIHBvaW50ID0gcGF0aC5zbGljZSgwLCBwYXJlbnRzLmluZGV4T2YodmFsKSkuam9pbignLicpO1xyXG4gICAgICByZXR1cm4gJ1tDaXJjdWxhcicgKyAocG9pbnQgPyAnOicgKyBwb2ludCA6ICcnKSArICddJztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZhciBjb3B5LCBpLCBrLCBsO1xyXG4gICAgICBpZiAodmFsLmNvbnN0cnVjdG9yICYmIHR5cGVvZiB2YWwuY29uc3RydWN0b3IubmFtZSA9PT0gJ3N0cmluZycgJiYgdmFsLmNvbnN0cnVjdG9yLm5hbWUuc2xpY2UoLTUpID09PSAnQXJyYXknKSB7XHJcbiAgICAgICAgaWYgKHBhcmVudHMubGVuZ3RoID49IGNvbmZpZy5kZWVwICYmIHZhbC5jb25zdHJ1Y3Rvci5uYW1lICE9PSAnQXJyYXknKSB7XHJcbiAgICAgICAgICByZXR1cm4gJ1tBcnJheTonICsgdmFsLmNvbnN0cnVjdG9yLm5hbWUgKyAnXSc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvcHkgPSBbXTtcclxuICAgICAgICAgIGZvciAoaSA9IDAsIGwgPSB2YWwubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvcHlbaV0gPSBkZWN5Y2xlV2Fsa2VyKHBhcmVudHMuY29uY2F0KFt2YWxdKSwgcGF0aC5jb25jYXQoaSksIHZhbFtpXSwgY29uZmlnKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBjb3B5O1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAocGFyZW50cy5sZW5ndGggPj0gY29uZmlnLmRlZXApIHtcclxuICAgICAgICAgIHJldHVybiAnW09iamVjdDonICsgKHZhbC5jb25zdHJ1Y3RvciAmJiB2YWwuY29uc3RydWN0b3IubmFtZSA/IHZhbC5jb25zdHJ1Y3Rvci5uYW1lIDogJ09iamVjdCcpICsgJ10nO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb3B5ID0ge307XHJcbiAgICAgICAgICBmb3IgKGkgPSAwLCBrID0gT2JqZWN0LmtleXModmFsKSwgbCA9IGsubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvcHlba1tpXV0gPSBkZWN5Y2xlV2Fsa2VyKHBhcmVudHMuY29uY2F0KFt2YWxdKSwgcGF0aC5jb25jYXQoW2tbaV1dKSwgdmFsW2tbaV1dLCBjb25maWcpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIGNvcHk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICByZXR1cm4gY29uZmlnLmZ1bmN0aW9ucyA9PT0gdHJ1ZSA/ICdbRnVuY3Rpb246JyArIHZhbC50b1N0cmluZygpICsgJ10nIDogdW5kZWZpbmVkO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gdmFsLnRvU3RyaW5nKCk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQge1xyXG4gIGRlQ3ljbGVyLFxyXG4gIGRlQ3ljbGVkLFxyXG4gIHJldml2ZVxyXG59IiwgImltcG9ydCBpMThuIGZyb20gXCIuLi9pMThuXCI7XHJcbmltcG9ydCB1dGlscyBmcm9tIFwiLi4vdXRpbHNcIjtcclxuXHJcbi8qKlxyXG4gKiBAcGFyYW0ge3sgaTE4bjogc3RyaW5nIHwgeyBbbGFuZzogc3RyaW5nXTogeyBbazogc3RyaW5nXTogc3RyaW5nIH0gfX19IGNmZyBcclxuICogQHJldHVybnMgXHJcbiAqL1xyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYnVpbGRFeHRlbnNpb25JMThOKGNmZykge1xyXG4gIGlmICghY2ZnPy5pMThuKSByZXR1cm4gbnVsbDtcclxuICBsZXQgb3V0ID0ge1xyXG4gICAgX19jYWNoZV9fOiB7XHJcbiAgICAgIGxvY2FsZUlkczogW10sXHJcbiAgICAgIGxvY2FsaXphdGlvbnM6IHt9XHJcbiAgICB9LFxyXG4gICAgZm9ybWF0KGtleSwgLi4uYXJncykge1xyXG4gICAgICByZXR1cm4gdXRpbHMuZm9ybWF0KG91dC5nZXQoa2V5KSwgLi4uYXJncyk7XHJcbiAgICB9LFxyXG4gICAgZ2V0KGtleSkge1xyXG4gICAgICByZXR1cm4gb3V0Ll9fY2FjaGVfXy5sb2NhbGl6YXRpb25zW2kxOG4ubG9jYWxlXT8uW2tleV1cclxuICAgICAgICB8fCBvdXQuX19jYWNoZV9fLmxvY2FsaXphdGlvbnMuZGVmYXVsdD8uW2tleV1cclxuICAgICAgICB8fCBrZXk7XHJcbiAgICB9LFxyXG4gICAgbWVzc2FnZXM6IG5ldyBQcm94eSh7fSwge1xyXG4gICAgICBnZXQoXywgcHJvcCkge1xyXG4gICAgICAgIHJldHVybiBvdXQuZ2V0KHByb3ApO1xyXG4gICAgICB9XHJcbiAgICB9KSxcclxuICB9XHJcbiAgYXN5bmMgZnVuY3Rpb24gY2hlY2soKSB7XHJcbiAgICBjb25zdCBsb2NhbGUgPSBpMThuLmxvY2FsZTtcclxuICAgIGlmICh0eXBlb2YgY2ZnLmkxOG4gPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgY29uc3QgQkFTRV9VUkwgPSBjZmcuaTE4bi5lbmRzV2l0aChcIi9cIikgPyBjZmcuaTE4bi5zbGljZSgwLCAtMSkgOiBjZmcuaTE4bjtcclxuICAgICAgaWYgKCFvdXQuX19jYWNoZV9fLmxvY2FsZUlkcy5sZW5ndGgpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgb3V0Ll9fY2FjaGVfXy5sb2NhbGVJZHMgPSBhd2FpdCAoYXdhaXQgZmV0Y2goYCR7QkFTRV9VUkx9L2xvY2FsZXMuanNvbmAsIG5vU3RvcmUpKS5qc29uKCk7XHJcbiAgICAgICAgfSBjYXRjaCB7IH1cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgb3V0Ll9fY2FjaGVfXy5sb2NhbGl6YXRpb25zLmRlZmF1bHQgPSBhd2FpdCAoYXdhaXQgZmV0Y2goYCR7QkFTRV9VUkx9L2RlZmF1bHQuanNvbmAsIG5vU3RvcmUpKS5qc29uKCk7XHJcbiAgICAgICAgfSBjYXRjaCB7IH1cclxuICAgICAgfVxyXG4gICAgICBpZiAoXHJcbiAgICAgICAgb3V0Ll9fY2FjaGVfXy5sb2NhbGVJZHMuaW5jbHVkZXMobG9jYWxlKVxyXG4gICAgICAgICYmICFvdXQuX19jYWNoZV9fLmxvY2FsaXphdGlvbnM/Lltsb2NhbGVdXHJcbiAgICAgICkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICBvdXQuX19jYWNoZV9fLmxvY2FsaXphdGlvbnNbbG9jYWxlXSA9IGF3YWl0IChhd2FpdCBmZXRjaChgJHtCQVNFX1VSTH0vJHtsb2NhbGV9Lmpzb25gLCBub1N0b3JlKSkuanNvbigpO1xyXG4gICAgICAgIH0gY2F0Y2ggeyB9O1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBvdXQuX19jYWNoZV9fLmxvY2FsZUlkcyA9IE9iamVjdC5rZXlzKGNmZy5pMThuKTtcclxuICAgICAgb3V0Ll9fY2FjaGVfXy5sb2NhbGl6YXRpb25zID0gY2ZnLmkxOG47XHJcbiAgICB9XHJcbiAgfVxyXG4gIGF3YWl0IGNoZWNrKCk7XHJcbiAgcmV0dXJuIG91dDtcclxufSIsICJpbXBvcnQgeyBCYXNpY0V2ZW50RW1pdHRlciB9IGZyb20gXCIuLi8uLi9saWIvQmFzaWNFdmVudEVtaXR0ZXIuanNcIjtcclxuaW1wb3J0IGRldiBmcm9tIFwiLi4vZGV2L2luZGV4LmpzXCI7XHJcbmltcG9ydCBpMThuIGZyb20gXCIuLi9pMThuL2luZGV4LmpzXCI7XHJcbmltcG9ydCBtb2R1bGVzIGZyb20gXCIuLi9tb2R1bGVzL2luZGV4LmpzXCI7XHJcbmltcG9ydCBzdG9yYWdlIGZyb20gXCIuLi9zdG9yYWdlL2luZGV4LmpzXCI7XHJcbmltcG9ydCB7IGJ1aWxkRXh0ZW5zaW9uSTE4TiB9IGZyb20gXCIuL2kxOG4uanNcIjtcclxuaW1wb3J0ICogYXMgbmVzdHMgZnJvbSBcIm5lc3RzXCI7XHJcbmltcG9ydCBldmVudHMgZnJvbSBcIi4uL2V2ZW50cy9pbmRleC5qc1wiO1xyXG5pbXBvcnQgcGF0Y2hlciBmcm9tIFwiLi4vcGF0Y2hlci9pbmRleC5qc1wiO1xyXG5pbXBvcnQgZmluZEluVHJlZSBmcm9tIFwiLi4vdXRpbHMvcmF3L2ZpbmQtaW4tdHJlZS5qc1wiO1xyXG5pbXBvcnQgd2Vic29ja2V0IGZyb20gXCIuLi93ZWJzb2NrZXQvaW5kZXguanNcIjtcclxuaW1wb3J0IHVpIGZyb20gXCIuLi91aS9pbmRleC5qc1wiO1xyXG5pbXBvcnQgdXRpbHMgZnJvbSBcIi4uL3V0aWxzL2luZGV4LmpzXCI7XHJcbmltcG9ydCBkb20gZnJvbSBcIi4uL2RvbS9pbmRleC5qc1wiO1xyXG5pbXBvcnQgc2hhcmVkIGZyb20gXCIuLi9zaGFyZWQvaW5kZXguanNcIjtcclxuaW1wb3J0IHsgd2FpdFVudGlsQ29ubmVjdGlvbk9wZW4gfSBmcm9tIFwiLi4vLi4vb3RoZXIvdXRpbHMuanNcIjtcclxuaW1wb3J0IGxvZ2dlciBmcm9tIFwiLi4vdXRpbHMvbG9nZ2VyLmpzXCI7XHJcblxyXG4vKipcclxuICogQHBhcmFtIHt7IG1vZGU/OiBcImRldmVsb3BtZW50XCIgfCBcInByb2R1Y3Rpb25cIiwgYXBpOiB7IHBhdGNoZXI/OiBzdHJpbmcgfCBib29sZWFuLCBzdG9yYWdlPzogc3RyaW5nIHwgYm9vbGVhbiwgaTE4bj86IHN0cmluZyB8IGJvb2xlYW4sIGV2ZW50cz86IHN0cmluZyB8IGJvb2xlYW4sIHV0aWxzPzogc3RyaW5nIHwgYm9vbGVhbiwgZG9tPzogc3RyaW5nIHwgYm9vbGVhbiwgd2Vic29ja2V0Pzogc3RyaW5nIHwgYm9vbGVhbiwgdWk/OiBzdHJpbmcgfCBib29sZWFuLCBkZXY/OiBzdHJpbmcgfCBib29sZWFuLCBtb2R1bGVzOiB7IG5vZGU6IHsgbmFtZTogc3RyaW5nLCByZWFzb246IHN0cmluZyB9W10sIGNvbW1vbjogeyBuYW1lOiBzdHJpbmcsIHJlYXNvbjogc3RyaW5nIH1bXSwgY3VzdG9tOiB7IHJlYXNvbjogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIGxhenk6IGJvb2xlYW4sIGZpbmRlcjogeyBmaWx0ZXI6IHsgZXhwb3J0OiBib29sZWFuLCBpbjogXCJwcm9wZXJ0aWVzXCIgfCBcInN0cmluZ3NcIiB8IFwicHJvdG90eXBlc1wiLCBieTogW3N0cmluZ1tdLCBzdHJpbmdbXT9dIH0sIHBhdGg6IHsgYmVmb3JlOiBzdHJpbmcgfCBzdHJpbmdbXSwgYWZ0ZXI6IHN0cmluZyB8IHN0cmluZ1tdIH0sIG1hcDogeyBbazogc3RyaW5nXTogc3RyaW5nW10gfSB9IH1bXSB9IH0sIGFib3V0OiB7IG5hbWU6IHN0cmluZyB8IHsgW2s6IHN0cmluZ106IHN0cmluZyB9LCBkZXNjcmlwdGlvbjogc3RyaW5nIHwgeyBbazogc3RyaW5nXTogc3RyaW5nIH0sIHNsdWc6IHN0cmluZyB9IH19IG1hbmlmZXN0IFxyXG4gKi9cclxuYXN5bmMgZnVuY3Rpb24gYnVpbGRQbHVnaW5BUEkobWFuaWZlc3QsIHBlcnNpc3RLZXkpIHtcclxuICBjb25zdCBkZXZNb2RlID0gZGV2LmVuYWJsZWQgfHwgbWFuaWZlc3Q/Lm1vZGUgPT09IFwiZGV2ZWxvcG1lbnRcIjtcclxuICBjb25zdCBwZXJzaXN0ID0gYXdhaXQgc3RvcmFnZS5jcmVhdGVQZXJzaXN0TmVzdChwZXJzaXN0S2V5KTtcclxuICBjb25zdCBvdXQgPSB7XHJcbiAgICBtb2R1bGVzOiB7XHJcbiAgICAgIF9fY2FjaGVfXzoge1xyXG4gICAgICAgIGNvbW1vbjoge30sXHJcbiAgICAgICAgbm9kZToge30sXHJcbiAgICAgICAgY3VzdG9tOiB7fSxcclxuICAgICAgICBjdXN0b21MYXp5OiB7fVxyXG4gICAgICB9LFxyXG4gICAgICByZXF1aXJlKG5hbWUpIHtcclxuICAgICAgICBpZiAoIWRldk1vZGUpIHtcclxuICAgICAgICAgIGlmICh0eXBlb2Ygb3V0Lm1vZHVsZXMuX19jYWNoZV9fLm5vZGVbbmFtZV0gIT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBvdXQubW9kdWxlcy5fX2NhY2hlX18ubm9kZVtuYW1lXTtcclxuICAgICAgICAgIGlmIChtYW5pZmVzdD8uYXBpPy5tb2R1bGVzPy5ub2RlPy5zb21lPy4oaSA9PiBpLm5hbWUgPT09IG5hbWUpKSByZXR1cm4gb3V0Lm1vZHVsZXMuX19jYWNoZV9fLm5vZGVbbmFtZV0gPSBtb2R1bGVzLnJlcXVpcmUobmFtZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJldHVybiBtb2R1bGVzLnJlcXVpcmUobmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICB9LFxyXG4gICAgICBjb21tb246IG5ldyBQcm94eSh7fSwge1xyXG4gICAgICAgIGdldChfLCBwcm9wKSB7XHJcbiAgICAgICAgICBpZiAoIWRldk1vZGUpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvdXQubW9kdWxlcy5fX2NhY2hlX18uY29tbW9uW3Byb3BdICE9PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gb3V0Lm1vZHVsZXMuX19jYWNoZV9fLmNvbW1vbltwcm9wXTtcclxuICAgICAgICAgICAgaWYgKG1hbmlmZXN0Py5hcGk/Lm1vZHVsZXM/LmNvbW1vbj8uc29tZT8uKGkgPT4gaS5uYW1lID09PSBwcm9wKSkgcmV0dXJuIG91dC5tb2R1bGVzLl9fY2FjaGVfXy5jb21tb25bcHJvcF0gPSBtb2R1bGVzLmNvbW1vbltwcm9wXTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtb2R1bGVzLmNvbW1vbltwcm9wXTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pLFxyXG4gICAgICBjdXN0b206IG5ldyBQcm94eSh7fSwge1xyXG4gICAgICAgIGdldChfLCBwcm9wKSB7XHJcbiAgICAgICAgICBpZiAodHlwZW9mIG91dC5tb2R1bGVzLl9fY2FjaGVfXy5jdXN0b21bcHJvcF0gIT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBvdXQubW9kdWxlcy5fX2NhY2hlX18uY3VzdG9tW3Byb3BdO1xyXG4gICAgICAgICAgbGV0IGRhdGEgPSBtYW5pZmVzdD8uYXBpPy5tb2R1bGVzPy5jdXN0b20/LmZpbmQ/LihpID0+IGkubmFtZSA9PT0gcHJvcCk7XHJcbiAgICAgICAgICBpZiAoIWRhdGE/LmZpbmRlcikgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICBpZiAoZGF0YS5sYXp5KSB7XHJcbiAgICAgICAgICAgIGxldCBwcm9tID0gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICAgIGxldCByID0gYXdhaXQgbW9kdWxlcy53ZWJwYWNrLmxhenlGaW5kQnlGaW5kZXIoZGF0YS5maW5kZXIpO1xyXG4gICAgICAgICAgICAgIG91dC5tb2R1bGVzLl9fY2FjaGVfXy5jdXN0b21MYXp5W3Byb3BdID0gcjtcclxuICAgICAgICAgICAgICByZXNvbHZlKHIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgb3V0Lm1vZHVsZXMuX19jYWNoZV9fLmN1c3RvbVtwcm9wXSA9IHtcclxuICAgICAgICAgICAgICBnZXQoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvbTtcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIGdldCB2YWx1ZSgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBvdXQubW9kdWxlcy5fX2NhY2hlX18uY3VzdG9tTGF6eVtwcm9wXTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgdmFsdWUgPSBtb2R1bGVzLndlYnBhY2suZmluZEJ5RmluZGVyKGRhdGEuZmluZGVyKTtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlPy52YWx1ZSAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICAgICAgb3V0Lm1vZHVsZXMuX19jYWNoZV9fLmN1c3RvbVtwcm9wXSA9IHZhbHVlID8gT2JqZWN0LmFzc2lnbih2YWx1ZSwgeyB2YWx1ZSwgZ2V0KCkgeyByZXR1cm4gdmFsdWUgfSB9KSA6IG51bGw7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG91dC5tb2R1bGVzLl9fY2FjaGVfXy5jdXN0b21bcHJvcF0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gY2F0Y2gge1xyXG4gICAgICAgICAgICAgIG91dC5tb2R1bGVzLl9fY2FjaGVfXy5jdXN0b21bcHJvcF0gPSB2YWx1ZSA/IHsgdmFsdWUsIGdldCgpIHsgcmV0dXJuIHZhbHVlIH0gfSA6IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBvdXQubW9kdWxlcy5fX2NhY2hlX18uY3VzdG9tW3Byb3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgfSksXHJcbiAgICAgIGdldCBuYXRpdmUoKSB7XHJcbiAgICAgICAgaWYgKG1hbmlmZXN0Py5tb2R1bGVzPy5uYXRpdmUgfHwgZGV2TW9kZSkgcmV0dXJuIG1vZHVsZXMubmF0aXZlO1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIGV4dGVuc2lvbjoge1xyXG4gICAgICBtYW5pZmVzdCxcclxuICAgICAgcGVyc2lzdCxcclxuICAgICAgaTE4bjogYXdhaXQgYnVpbGRFeHRlbnNpb25JMThOKG1hbmlmZXN0KSxcclxuICAgICAgZXZlbnRzOiBuZXcgQmFzaWNFdmVudEVtaXR0ZXIoKSxcclxuICAgICAgc3Vic2NyaXB0aW9uczogW11cclxuICAgIH0sXHJcbiAgICBnZXQgc2hhcmVkKCkge1xyXG4gICAgICBpZiAobWFuaWZlc3Q/LmFwaT8uc2hhcmVkIHx8IGRldk1vZGUpIHJldHVybiBzaGFyZWQ7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfSxcclxuICAgIGdldCBpMThuKCkge1xyXG4gICAgICBpZiAobWFuaWZlc3Q/LmFwaT8uaTE4biB8fCBkZXZNb2RlKSByZXR1cm4gaTE4bjtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9LFxyXG4gICAgZ2V0IHBhdGNoZXIoKSB7XHJcbiAgICAgIGlmIChtYW5pZmVzdD8uYXBpPy5wYXRjaGVyIHx8IGRldk1vZGUpIHJldHVybiBwYXRjaGVyO1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH0sXHJcbiAgICBnZXQgZXZlbnRzKCkge1xyXG4gICAgICBpZiAobWFuaWZlc3Q/LmFwaT8uZXZlbnRzIHx8IGRldk1vZGUpIHJldHVybiBldmVudHM7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfSxcclxuICAgIGdldCBzdG9yYWdlKCkge1xyXG4gICAgICBpZiAobWFuaWZlc3Q/LmFwaT8uc3RvcmFnZSB8fCBkZXZNb2RlKSByZXR1cm4gc3RvcmFnZTtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9LFxyXG4gICAgZ2V0IHdlYnNvY2tldCgpIHtcclxuICAgICAgaWYgKG1hbmlmZXN0Py5hcGk/LndlYnNvY2tldCB8fCBkZXZNb2RlKSByZXR1cm4gd2Vic29ja2V0O1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH0sXHJcbiAgICBnZXQgdWkoKSB7XHJcbiAgICAgIGlmIChtYW5pZmVzdD8uYXBpPy51aSB8fCBkZXZNb2RlKSByZXR1cm4gdWk7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfSxcclxuICAgIGdldCB1dGlscygpIHtcclxuICAgICAgaWYgKG1hbmlmZXN0Py5hcGk/LnV0aWxzIHx8IGRldk1vZGUpIHJldHVybiB1dGlscztcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9LFxyXG4gICAgZ2V0IGRvbSgpIHtcclxuICAgICAgaWYgKG1hbmlmZXN0Py5hcGk/LmRvbSB8fCBkZXZNb2RlKSByZXR1cm4gZG9tO1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH0sXHJcbiAgICBnZXQgZGV2KCkge1xyXG4gICAgICBpZiAobWFuaWZlc3Q/LmFwaT8uZGV2IHx8IGRldk1vZGUpIHJldHVybiBkZXY7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHJldHVybiBvdXQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3dDb25maXJtYXRpb25Nb2RhbCgpIHtcclxuXHJcbn1cclxuXHJcbmNvbnN0IG91dCA9IHtcclxuICBfX2NhY2hlX186IHtcclxuICAgIGluaXRpYWxpemVkOiBmYWxzZSxcclxuICAgIGxvYWRlZDogbmVzdHMubWFrZSh7fSksXHJcbiAgICBjb25maWc6IHt9XHJcbiAgfSxcclxuICBzdG9yYWdlOiB7XHJcbiAgICAvKiogQHR5cGUge25lc3RzLk5lc3R9ICovXHJcbiAgICBpbnN0YWxsZWQ6IHt9XHJcbiAgfSxcclxuICBhc3luYyBpbml0KCkge1xyXG4gICAgaWYgKG91dC5fX2NhY2hlX18uaW5pdGlhbGl6ZWQpIHJldHVybjtcclxuICAgIG91dC5fX2NhY2hlX18uaW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG4gICAgb3V0LnN0b3JhZ2UuaW5zdGFsbGVkID0gYXdhaXQgc3RvcmFnZS5jcmVhdGVQZXJzaXN0TmVzdChcIkV4dGVuc2lvbnM7SW5zdGFsbGVkXCIpO1xyXG4gIH0sXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHVybCBcclxuICAgKi9cclxuICBhc3luYyBpbnN0YWxsKHVybCwgZGVmYXVsdENvbmZpZyA9IHt9KSB7XHJcbiAgICBpZiAoIW91dC5fX2NhY2hlX18uaW5pdGlhbGl6ZWQpIGF3YWl0IG91dC5pbml0KCk7XHJcbiAgICBpZiAodXJsLmVuZHNXaXRoKFwiL1wiKSkgdXJsID0gdXJsLnNsaWNlKDAsIC0xKTtcclxuICAgIGlmIChvdXQuc3RvcmFnZS5pbnN0YWxsZWQuZ2hvc3RbdXJsXSkgdGhyb3cgbmV3IEVycm9yKGBcIiR7dXJsfVwiIGV4dGVuc2lvbiBpcyBhbHJlYWR5IGluc3RhbGxlZC5gKTtcclxuXHJcbiAgICBsZXQgbWV0YVJlc3AgPSBhd2FpdCBmZXRjaChgJHt1cmx9L21hbmlmZXN0Lmpzb25gKTtcclxuICAgIGlmIChtZXRhUmVzcC5zdGF0dXMgIT09IDIwMCkgdGhyb3cgbmV3IEVycm9yKGBcIiR7dXJsfVwiIGV4dGVuc2lvbiBtYW5pZmVzdCBpcyBub3QgcmVzcG9uZGVkIHdpdGggMjAwIHN0YXR1cyBjb2RlLmApO1xyXG4gICAgbGV0IG1hbmlmZXN0ID0gSlNPTi5wYXJzZShhd2FpdCBtZXRhUmVzcC50ZXh0KCkpO1xyXG5cclxuICAgIGxldCByZWFkbWVSZXNwID0gYXdhaXQgZmV0Y2goYCR7dXJsfS9yZWFkbWUubWRgKTtcclxuICAgIGxldCByZWFkbWUgPSByZWFkbWVSZXNwLnN0YXR1cyA9PT0gMjAwID8gYXdhaXQgcmVhZG1lUmVzcC50ZXh0KCkgOiBudWxsO1xyXG5cclxuICAgIC8vIFRPRE86IFNob3cgbW9kYWwgZm9yIHVzZXIgdG8gYWNjZXB0IHRoZSBleHRlbnNpb24gKHRlcm1zLCBwcml2YWN5LCBldGMuKVxyXG4gICAgYXdhaXQgc2hvd0NvbmZpcm1hdGlvbk1vZGFsKHtcclxuICAgICAgbWFuaWZlc3QsXHJcbiAgICAgIHJlYWRtZSxcclxuICAgICAgY29uZmlnOiB7XHJcbiAgICAgICAgYXV0b1VwZGF0ZTogdHJ1ZSxcclxuICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgIG9yZGVyOiAwLFxyXG4gICAgICAgIC4uLmRlZmF1bHRDb25maWdcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgbGV0IHNvdXJjZVJlc3AgPSBhd2FpdCBmZXRjaChgJHt1cmx9L3NvdXJjZS5qc2ApO1xyXG4gICAgaWYgKHNvdXJjZVJlc3Auc3RhdHVzICE9PSAyMDApIHRocm93IG5ldyBFcnJvcihgXCIke3VybH1cIiBleHRlbnNpb24gc291cmNlIGlzIG5vdCByZXNwb25kZWQgd2l0aCAyMDAgc3RhdHVzIGNvZGUuYCk7XHJcbiAgICBsZXQgc291cmNlID0gYXdhaXQgc291cmNlUmVzcC50ZXh0KCk7XHJcblxyXG4gICAgb3V0LnN0b3JhZ2UuaW5zdGFsbGVkLnN0b3JlW3VybF0gPSB7XHJcbiAgICAgIG1hbmlmZXN0LFxyXG4gICAgICBzb3VyY2UsXHJcbiAgICAgIHJlYWRtZSxcclxuICAgICAgY29uZmlnOiB7XHJcbiAgICAgICAgYXV0b1VwZGF0ZTogdHJ1ZSxcclxuICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgIG9yZGVyOiAwLFxyXG4gICAgICAgIC4uLmRlZmF1bHRDb25maWdcclxuICAgICAgfSxcclxuICAgICAgZXh0cmE6IHtcclxuICAgICAgICBsYXN0VXBkYXRlZEF0OiBEYXRlLm5vdygpXHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgYXdhaXQgb3V0LmxvYWQodXJsKTtcclxuICB9LFxyXG4gIGFzeW5jIHVwZGF0ZSh1cmwpIHtcclxuICAgIGlmICghb3V0Ll9fY2FjaGVfXy5pbml0aWFsaXplZCkgYXdhaXQgb3V0LmluaXQoKTtcclxuICAgIGlmICh1cmwuZW5kc1dpdGgoXCIvXCIpKSB1cmwgPSB1cmwuc2xpY2UoMCwgLTEpO1xyXG4gICAgaWYgKCFvdXQuc3RvcmFnZS5pbnN0YWxsZWQuZ2hvc3RbdXJsXSkgdGhyb3cgbmV3IEVycm9yKGBcIiR7dXJsfVwiIGV4dGVuc2lvbiBpcyBub3QgaW5zdGFsbGVkLmApO1xyXG5cclxuICAgIGxldCBkYXRhID0gb3V0LnN0b3JhZ2UuaW5zdGFsbGVkLmdob3N0W3VybF07XHJcblxyXG4gICAgbGV0IG1ldGFSZXNwID0gYXdhaXQgZmV0Y2goYCR7dXJsfS9tYW5pZmVzdC5qc29uYCk7XHJcbiAgICBpZiAobWV0YVJlc3Auc3RhdHVzICE9PSAyMDApIHRocm93IG5ldyBFcnJvcihgXCIke3VybH1cIiBleHRlbnNpb24gbWFuaWZlc3QgaXMgbm90IHJlc3BvbmRlZCB3aXRoIDIwMCBzdGF0dXMgY29kZS5gKTtcclxuICAgIGxldCBtYW5pZmVzdCA9IEpTT04ucGFyc2UoYXdhaXQgbWV0YVJlc3AudGV4dCgpKTtcclxuXHJcbiAgICBpZiAoZGF0YS5tYW5pZmVzdC5oYXNoID09PSBtYW5pZmVzdC5oYXNoKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgbGV0IHJlYWRtZVJlc3AgPSBhd2FpdCBmZXRjaChgJHt1cmx9L3JlYWRtZS5tZGApO1xyXG4gICAgbGV0IHJlYWRtZSA9IHJlYWRtZVJlc3Auc3RhdHVzID09PSAyMDAgPyBhd2FpdCByZWFkbWVSZXNwLnRleHQoKSA6IG51bGw7XHJcblxyXG4gICAgbGV0IHNvdXJjZVJlc3AgPSBhd2FpdCBmZXRjaChgJHt1cmx9L3NvdXJjZS5qc2ApO1xyXG4gICAgaWYgKHNvdXJjZVJlc3Auc3RhdHVzICE9PSAyMDApIHRocm93IG5ldyBFcnJvcihgXCIke3VybH1cIiBleHRlbnNpb24gc291cmNlIGlzIG5vdCByZXNwb25kZWQgd2l0aCAyMDAgc3RhdHVzIGNvZGUuYCk7XHJcbiAgICBsZXQgc291cmNlID0gYXdhaXQgc291cmNlUmVzcC50ZXh0KCk7XHJcblxyXG4gICAgbGV0IGxvYWRlZEJlZm9yZSA9IGZhbHNlO1xyXG4gICAgaWYgKG91dC5fX2NhY2hlX18ubG9hZGVkLmdob3N0W3VybF0pIHtcclxuICAgICAgbG9hZGVkQmVmb3JlID0gdHJ1ZTtcclxuICAgICAgYXdhaXQgb3V0LnVubG9hZCh1cmwpO1xyXG4gICAgfVxyXG5cclxuICAgIG91dC5zdG9yYWdlLmluc3RhbGxlZC5zdG9yZVt1cmxdID0ge1xyXG4gICAgICBtYW5pZmVzdCxcclxuICAgICAgc291cmNlLFxyXG4gICAgICByZWFkbWUsXHJcbiAgICAgIGNvbmZpZzogZGF0YS5jb25maWcsXHJcbiAgICAgIGV4dHJhOiB7XHJcbiAgICAgICAgbGFzdFVwZGF0ZWRBdDogRGF0ZS5ub3coKVxyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGlmIChsb2FkZWRCZWZvcmUpIHtcclxuICAgICAgYXdhaXQgbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIDEpKTtcclxuICAgICAgYXdhaXQgb3V0LmxvYWQodXJsKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9LFxyXG4gIGFzeW5jIHVuaW5zdGFsbCh1cmwpIHtcclxuICAgIGlmICghb3V0Ll9fY2FjaGVfXy5pbml0aWFsaXplZCkgYXdhaXQgb3V0LmluaXQoKTtcclxuICAgIGlmICh1cmwuZW5kc1dpdGgoXCIvXCIpKSB1cmwgPSB1cmwuc2xpY2UoMCwgLTEpO1xyXG4gICAgaWYgKCFvdXQuc3RvcmFnZS5pbnN0YWxsZWQuZ2hvc3RbdXJsXSkgdGhyb3cgbmV3IEVycm9yKGBcIiR7dXJsfVwiIGV4dGVuc2lvbiBpcyBub3QgaW5zdGFsbGVkLmApO1xyXG5cclxuICAgIGRlbGV0ZSBvdXQuc3RvcmFnZS5pbnN0YWxsZWQuc3RvcmVbdXJsXTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBhd2FpdCBvdXQudW5sb2FkKHVybCk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgbG9nZ2VyLmVycm9yKGVycik7XHJcbiAgICB9XHJcbiAgfSxcclxuICBhc3luYyBsb2FkKHVybCkge1xyXG4gICAgaWYgKCFvdXQuX19jYWNoZV9fLmluaXRpYWxpemVkKSBhd2FpdCBvdXQuaW5pdCgpO1xyXG4gICAgaWYgKHVybC5lbmRzV2l0aChcIi9cIikpIHVybCA9IHVybC5zbGljZSgwLCAtMSk7XHJcbiAgICBpZiAoIW91dC5zdG9yYWdlLmluc3RhbGxlZC5naG9zdFt1cmxdKSB0aHJvdyBuZXcgRXJyb3IoYFwiJHt1cmx9XCIgZXh0ZW5zaW9uIGlzIG5vdCBpbnN0YWxsZWQuYCk7XHJcbiAgICBsZXQgZGF0YSA9IG91dC5zdG9yYWdlLmluc3RhbGxlZC5naG9zdFt1cmxdO1xyXG5cclxuICAgIGlmIChvdXQuX19jYWNoZV9fLmxvYWRlZC5naG9zdFt1cmxdKSB0aHJvdyBuZXcgRXJyb3IoYFwiJHt1cmx9XCIgZXh0ZW5zaW9uIGlzIGFscmVhZHkgbG9hZGVkLmApO1xyXG5cclxuICAgIGF3YWl0IG91dC5sb2FkZXIubG9hZCh1cmwsIGRhdGEpO1xyXG4gIH0sXHJcbiAgYXN5bmMgdW5sb2FkKHVybCkge1xyXG4gICAgaWYgKCFvdXQuX19jYWNoZV9fLmluaXRpYWxpemVkKSBhd2FpdCBvdXQuaW5pdCgpO1xyXG4gICAgaWYgKHVybC5lbmRzV2l0aChcIi9cIikpIHVybCA9IHVybC5zbGljZSgwLCAtMSk7XHJcbiAgICBpZiAoIW91dC5fX2NhY2hlX18ubG9hZGVkLmdob3N0W3VybF0pIHRocm93IG5ldyBFcnJvcihgXCIke3VybH1cIiBleHRlbnNpb24gaXMgbm90IGxvYWRlZC5gKTtcclxuXHJcbiAgICBhd2FpdCBvdXQubG9hZGVyLnVubG9hZCh1cmwpO1xyXG4gIH0sXHJcbiAgZXZhbHVhdGUoc291cmNlLCBhcGkpIHtcclxuICAgIGNvbnN0ICRhY29yZCA9IGFwaTtcclxuICAgIHJldHVybiBldmFsKHNvdXJjZSk7XHJcbiAgfSxcclxuICBhc3luYyBsb2FkQWxsKCkge1xyXG4gICAgaWYgKCFvdXQuX19jYWNoZV9fLmluaXRpYWxpemVkKSBhd2FpdCBvdXQuaW5pdCgpO1xyXG4gICAgcmV0dXJuIFByb21pc2UuYWxsKE9iamVjdC5lbnRyaWVzKG91dC5zdG9yYWdlLmluc3RhbGxlZC5naG9zdCkuc29ydCgoWywgYV0sIFssIGJdKSA9PiBiLmNvbmZpZy5vcmRlciAtIGEuY29uZmlnLm9yZGVyKS5tYXAoYXN5bmMgKFt1cmwsIGRdKSA9PiB7XHJcbiAgICAgIGlmIChkLmNvbmZpZy5hdXRvVXBkYXRlKSBhd2FpdCBvdXQudXBkYXRlKHVybCk7XHJcblxyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGlmIChkLmNvbmZpZy5lbmFibGVkKSBhd2FpdCBvdXQubG9hZCh1cmwpO1xyXG4gICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgbG9nZ2VyLmVycm9yKFwiVW5hYmxlIHRvIGxvYWQgZXh0ZW5zaW9uXCIsIHVybCwgZSk7XHJcbiAgICAgIH1cclxuICAgIH0pKTtcclxuICB9LFxyXG4gIGFzeW5jIHVubG9hZEFsbCgpIHtcclxuICAgIGlmICghb3V0Ll9fY2FjaGVfXy5pbml0aWFsaXplZCkgYXdhaXQgb3V0LmluaXQoKTtcclxuICAgIHJldHVybiBQcm9taXNlLmFsbChPYmplY3Qua2V5cyhvdXQuX19jYWNoZV9fLmxvYWRlZC5naG9zdCkubWFwKHVybCA9PiBvdXQudW5sb2FkKHVybCkpKTtcclxuICB9LFxyXG4gIGdldCh1cmwpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGxvYWRlZDogb3V0Ll9fY2FjaGVfXy5sb2FkZWQuZ2hvc3RbdXJsXSxcclxuICAgICAgaW5zdGFsbGVkOiBvdXQuc3RvcmFnZS5pbnN0YWxsZWQuZ2hvc3RbdXJsXVxyXG4gICAgfTtcclxuICB9LFxyXG4gIGxvYWRlcjoge1xyXG4gICAgYXN5bmMgbG9hZChpZCwgZGF0YSkge1xyXG4gICAgICBpZiAoZGF0YS5tYW5pZmVzdC50eXBlID09PSAncGx1Z2luJykge1xyXG4gICAgICAgIGxldCBhcGkgPSBhd2FpdCBidWlsZFBsdWdpbkFQSShkYXRhLm1hbmlmZXN0LCBgRXh0ZW5zaW9uO1BlcnNpc3Q7JHtpZH1gKTtcclxuICAgICAgICBpZiAoYXBpLmV4dGVuc2lvbi5wZXJzaXN0Lmdob3N0LnNldHRpbmdzID09PSB1bmRlZmluZWQpIGFwaS5leHRlbnNpb24ucGVyc2lzdC5zdG9yZS5zZXR0aW5ncyA9IHt9O1xyXG4gICAgICAgIGF3YWl0IHVpLnZ1ZS5yZWFkeS53aGVuKCk7XHJcbiAgICAgICAgb3V0Ll9fY2FjaGVfXy5jb25maWdbaWRdID0gVnVlLnJlYWN0aXZlKEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZGF0YS5tYW5pZmVzdC5jb25maWcpKSk7XHJcbiAgICAgICAgZmluZEluVHJlZShvdXQuX19jYWNoZV9fLmNvbmZpZ1tpZF0sIChpKSA9PiBpLmlkLCB7IGFsbDogdHJ1ZSB9KS5mb3JFYWNoKFxyXG4gICAgICAgICAgKGkpID0+IHtcclxuICAgICAgICAgICAgYXBpLmV4dGVuc2lvbi5wZXJzaXN0LnN0b3JlLnNldHRpbmdzW2kuaWRdID0gYXBpLmV4dGVuc2lvbi5wZXJzaXN0Lmdob3N0Py5zZXR0aW5ncz8uW2kuaWRdID8/IGkuZGVmYXVsdDtcclxuICAgICAgICAgICAgaS52YWx1ZSA9IGFwaS5leHRlbnNpb24ucGVyc2lzdC5naG9zdD8uc2V0dGluZ3M/LltpLmlkXTtcclxuICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBsZXQgZXZhbHVhdGVkID0gb3V0LmV2YWx1YXRlKGRhdGEuc291cmNlLCBhcGkpO1xyXG4gICAgICAgIGF3YWl0IGV2YWx1YXRlZD8ubG9hZD8uKCk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIG9uUGVyc2lzdFVwZGF0ZShldmVudE5hbWUsIHsgcGF0aCwgdmFsdWUgfSA9IHt9KSB7XHJcbiAgICAgICAgICBpZiAocGF0aFswXSA9PT0gXCJzZXR0aW5nc1wiKSB7XHJcbiAgICAgICAgICAgIGxldCBpdGVtID0gZmluZEluVHJlZShvdXQuX19jYWNoZV9fLmNvbmZpZ1tpZF0sIChpKSA9PiBpLmlkID09PSBwYXRoWzFdKTtcclxuICAgICAgICAgICAgbGV0IHZhbCA9IGV2ZW50TmFtZSA9PT0gXCJERUxFVEVcIiA/IG51bGwgOiB2YWx1ZTtcclxuICAgICAgICAgICAgaWYgKGl0ZW0uaW5wdXRUeXBlID09PSBcIm51bWJlclwiKSB2YWwgPSBOdW1iZXIodmFsKTtcclxuICAgICAgICAgICAgaWYgKGl0ZW0pIGl0ZW0udmFsdWUgPSB2YWw7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGFwaS5leHRlbnNpb24ucGVyc2lzdC5vbihcIlVQREFURVwiLCBvblBlcnNpc3RVcGRhdGUpO1xyXG4gICAgICAgIGFwaS5leHRlbnNpb24ucGVyc2lzdC5vbihcIkRFTEVURVwiLCBvblBlcnNpc3RVcGRhdGUpO1xyXG4gICAgICAgIGFwaS5leHRlbnNpb24ucGVyc2lzdC5vbihcIlNFVFwiLCBvblBlcnNpc3RVcGRhdGUpO1xyXG4gICAgICAgIGNvbnN0IG9mZkNvbmZpZ0xpc3RlbmVyID1cclxuICAgICAgICAgIGV2ZW50cy5vbihcIkV4dGVuc2lvbkNvbmZpZ0ludGVyYWN0aW9uXCIsIChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLmV4dGVuc2lvbiAhPT0gaWQpIHJldHVybjtcclxuICAgICAgICAgICAgZnVuY3Rpb24gc2F2ZSgpIHtcclxuICAgICAgICAgICAgICBpZiAoIWRhdGEuaXRlbS5pZCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgIGxldCB2YWwgPSBkYXRhLml0ZW0udmFsdWUgPz8gZGF0YS5kYXRhLnZhbHVlO1xyXG4gICAgICAgICAgICAgIGlmIChkYXRhLml0ZW0uaW5wdXRUeXBlID09PSBcIm51bWJlclwiKSB2YWwgPSBOdW1iZXIodmFsKTtcclxuICAgICAgICAgICAgICBhcGkuZXh0ZW5zaW9uLnBlcnNpc3Quc3RvcmUuc2V0dGluZ3NbZGF0YS5pdGVtLmlkXSA9IHZhbDtcclxuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzYXZlKCk7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLml0ZW0uaWQpIHtcclxuICAgICAgICAgICAgICBhcGkuZXh0ZW5zaW9uLnBlcnNpc3Quc3RvcmUuc2V0dGluZ3NbZGF0YS5pdGVtLmlkXSA9IGRhdGEuaXRlbS52YWx1ZSA/PyBkYXRhLmRhdGEudmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZXZhbHVhdGVkPy5jb25maWc/Lih7XHJcbiAgICAgICAgICAgICAgaXRlbTogZGF0YS5pdGVtLFxyXG4gICAgICAgICAgICAgIGRhdGE6IGRhdGEuZGF0YSxcclxuICAgICAgICAgICAgICBnZXRJdGVtKGl0ZW1JZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZpbmRJblRyZWUob3V0Ll9fY2FjaGVfXy5jb25maWdbaWRdLCAoaSkgPT4gaS5pZCA9PT0gaXRlbUlkKTtcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIGdldEl0ZW1zKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZpbmRJblRyZWUob3V0Ll9fY2FjaGVfXy5jb25maWdbaWRdLCAoaSkgPT4gaS5pZCwgeyBhbGw6IHRydWUgfSk7XHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBzYXZlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgZnVuY3Rpb24gdW5sb2FkKCkge1xyXG4gICAgICAgICAgb2ZmQ29uZmlnTGlzdGVuZXIoKTtcclxuICAgICAgICAgIGFwaS5leHRlbnNpb24uc3Vic2NyaXB0aW9ucy5mb3JFYWNoKGkgPT4geyBpZiAodHlwZW9mIGkgPT09IFwiZnVuY3Rpb25cIikgaSgpOyB9KTtcclxuICAgICAgICAgIGFwaS5leHRlbnNpb24uZXZlbnRzLmVtaXQoXCJ1bmxvYWRcIik7XHJcbiAgICAgICAgICBldmFsdWF0ZWQ/LnVubG9hZD8uKCk7XHJcbiAgICAgICAgICBhcGkuZXh0ZW5zaW9uLnBlcnNpc3Qub2ZmKFwiVVBEQVRFXCIsIG9uUGVyc2lzdFVwZGF0ZSk7XHJcbiAgICAgICAgICBhcGkuZXh0ZW5zaW9uLnBlcnNpc3Qub2ZmKFwiREVMRVRFXCIsIG9uUGVyc2lzdFVwZGF0ZSk7XHJcbiAgICAgICAgICBhcGkuZXh0ZW5zaW9uLnBlcnNpc3Qub2ZmKFwiU0VUXCIsIG9uUGVyc2lzdFVwZGF0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG91dC5fX2NhY2hlX18ubG9hZGVkLnN0b3JlW2lkXSA9IHsgZXZhbHVhdGVkLCBhcGksIHVubG9hZCB9O1xyXG4gICAgICAgIGV2ZW50cy5lbWl0KFwiRXh0ZW5zaW9uTG9hZGVkXCIsIHsgaWQgfSk7XHJcbiAgICAgICAgcmV0dXJuIHsgZXZhbHVhdGVkLCBhcGksIHVubG9hZCB9O1xyXG4gICAgICB9IGVsc2UgaWYgKGRhdGEubWFuaWZlc3QudHlwZSA9PT0gJ3RoZW1lJykge1xyXG4gICAgICAgIGxldCBldmFsdWF0ZWQgPSBvdXQuZXZhbHVhdGUoZGF0YS5zb3VyY2UsIG51bGwpO1xyXG4gICAgICAgIGNvbnN0IHBlcnNpc3QgPSBhd2FpdCBzdG9yYWdlLmNyZWF0ZVBlcnNpc3ROZXN0KGBFeHRlbnNpb247UGVyc2lzdDske2lkfWApO1xyXG4gICAgICAgIGlmIChwZXJzaXN0Lmdob3N0LnNldHRpbmdzID09PSB1bmRlZmluZWQpIHBlcnNpc3Quc3RvcmUuc2V0dGluZ3MgPSB7fTtcclxuICAgICAgICBvdXQuX19jYWNoZV9fLmNvbmZpZ1tpZF0gPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGRhdGEubWFuaWZlc3QuY29uZmlnKSk7XHJcbiAgICAgICAgZmluZEluVHJlZShvdXQuX19jYWNoZV9fLmNvbmZpZ1tpZF0sIChpKSA9PiBpLmlkLCB7IGFsbDogdHJ1ZSB9KS5mb3JFYWNoKFxyXG4gICAgICAgICAgKGkpID0+IHtcclxuICAgICAgICAgICAgcGVyc2lzdC5zdG9yZS5zZXR0aW5nc1tpLmlkXSA9IHBlcnNpc3QuZ2hvc3Q/LnNldHRpbmdzPy5baS5pZF0gPz8gaS5kZWZhdWx0O1xyXG4gICAgICAgICAgICBpLnZhbHVlID0gcGVyc2lzdC5naG9zdD8uc2V0dGluZ3M/LltpLmlkXTtcclxuICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgICAgIGxldCBjc3NUZXh0ID0gZXZhbHVhdGVkKCk7XHJcbiAgICAgICAgbGV0IGluamVjdGVkUmVzID0gcGF0Y2hlci5pbmplY3RDU1MoY3NzVGV4dCwgcGVyc2lzdC5naG9zdC5zZXR0aW5ncyk7XHJcblxyXG4gICAgICAgIGNvbnN0IG9mZkNvbmZpZ0xpc3RlbmVyID1cclxuICAgICAgICAgIGV2ZW50cy5vbihcIkV4dGVuc2lvbkNvbmZpZ0ludGVyYWN0aW9uXCIsIChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLmV4dGVuc2lvbiAhPT0gaWQpIHJldHVybjtcclxuICAgICAgICAgICAgaWYgKCFkYXRhLml0ZW0uaWQpIHJldHVybjtcclxuICAgICAgICAgICAgcGVyc2lzdC5zdG9yZS5zZXR0aW5nc1tkYXRhLml0ZW0uaWRdID0gZGF0YS5kYXRhLnZhbHVlO1xyXG4gICAgICAgICAgICBpbmplY3RlZFJlcyhwZXJzaXN0Lmdob3N0LnNldHRpbmdzKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIGZ1bmN0aW9uIHVubG9hZCgpIHtcclxuICAgICAgICAgIG9mZkNvbmZpZ0xpc3RlbmVyKCk7XHJcbiAgICAgICAgICBpbmplY3RlZFJlcygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBvdXQuX19jYWNoZV9fLmxvYWRlZC5zdG9yZVtpZF0gPSB7IGV2YWx1YXRlZCwgdW5sb2FkIH07XHJcbiAgICAgICAgZXZlbnRzLmVtaXQoXCJFeHRlbnNpb25Mb2FkZWRcIiwgeyBpZCB9KTtcclxuICAgICAgICByZXR1cm4geyBldmFsdWF0ZWQsIHVubG9hZCB9O1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgdW5sb2FkKGlkKSB7XHJcbiAgICAgIG91dC5fX2NhY2hlX18ubG9hZGVkLmdob3N0Py5baWRdPy51bmxvYWQ/LigpO1xyXG4gICAgICBkZWxldGUgb3V0Ll9fY2FjaGVfXy5sb2FkZWQuc3RvcmVbaWRdO1xyXG4gICAgICBkZWxldGUgb3V0Ll9fY2FjaGVfXy5jb25maWdbaWRdO1xyXG4gICAgICBldmVudHMuZW1pdChcIkV4dGVuc2lvblVubG9hZGVkXCIsIHsgaWQgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG59O1xyXG5cclxud2FpdFVudGlsQ29ubmVjdGlvbk9wZW4oKS50aGVuKGFzeW5jICgpID0+IHtcclxuICBhd2FpdCB1dGlscy5zbGVlcCgxMDApO1xyXG4gIG91dC5sb2FkQWxsKCk7XHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgb3V0OyIsICJpbXBvcnQgeyB3YWl0VW50aWxDb25uZWN0aW9uT3BlbiB9IGZyb20gXCIuLi8uLi9vdGhlci91dGlscy5qc1wiO1xyXG5pbXBvcnQgY29tbW9uIGZyb20gXCIuLi9tb2R1bGVzL2NvbW1vbi5qc1wiO1xyXG5pbXBvcnQgcGF0Y2hlciBmcm9tIFwiLi4vcGF0Y2hlci9pbmRleC5qc1wiO1xyXG5cclxuY29uc3Qgc29ja2V0cyA9IG5ldyBTZXQoKTtcclxuY29uc3QgaGFuZGxlcnMgPSBuZXcgTWFwKCk7XHJcblxyXG53YWl0VW50aWxDb25uZWN0aW9uT3BlbigpLnRoZW4oKCkgPT4ge1xyXG4gIHBhdGNoZXIuaW5zdGVhZChcclxuICAgIFwiaGFuZGxlQ29ubmVjdGlvblwiLFxyXG4gICAgY29tbW9uLldlYlNvY2tldCxcclxuICAgIChhcmdzLCBvcmlnKSA9PiB7XHJcbiAgICAgIGNvbnN0IHdzID0gYXJnc1swXTtcclxuICAgICAgaWYgKHdzLnVwZ3JhZGVSZXEoKS51cmwgIT09IFwiL2Fjb3JkXCIpIHJldHVybiBvcmlnKC4uLmFyZ3MpO1xyXG5cclxuICAgICAgc29ja2V0cy5hZGQod3MpO1xyXG5cclxuICAgICAgd3Mub24oXCJtZXNzYWdlXCIsIGFzeW5jIChtc2cpID0+IHtcclxuICAgICAgICBsZXQganNvbjtcclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIGpzb24gPSBKU09OLnBhcnNlKG1zZyk7XHJcbiAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoanNvbikgfHwganNvbi5sZW5ndGggPCAxIHx8IGpzb24ubGVuZ3RoID4gMylcclxuICAgICAgICAgICAgdGhyb3cgXCJBcnJheSBleHBlY3RlZCBhcyBtZXNzYWdlLlwiO1xyXG4gICAgICAgICAgaWYgKHR5cGVvZiBqc29uWzBdICE9IFwic3RyaW5nXCIpIHRocm93IFwiQXJyYXlbMF0gbmVlZHMgdG8gYmUgc3RyaW5nLlwiO1xyXG4gICAgICAgICAgaWYgKHR5cGVvZiBqc29uWzFdICE9IFwic3RyaW5nXCIpIHRocm93IFwiQXJyYXlbMV0gbmVlZHMgdG8gYmUgc3RyaW5nLlwiO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgd3Muc2VuZChcclxuICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoW1xyXG4gICAgICAgICAgICAgIG51bGwsXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgb2s6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgZXJyb3I6IGAke2Vycn1gLFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIF0pXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgW2V2ZW50SWQsIGV2ZW50TmFtZSwgZXZlbnREYXRhXSA9IGpzb247XHJcblxyXG4gICAgICAgIGNvbnN0IGhhbmRsZXIgPSBoYW5kbGVycy5nZXQoZXZlbnROYW1lKTtcclxuXHJcbiAgICAgICAgaWYgKCFoYW5kbGVyKVxyXG4gICAgICAgICAgcmV0dXJuIHdzLnNlbmQoXHJcbiAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KFtcclxuICAgICAgICAgICAgICBldmVudElkLFxyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG9rOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGVycm9yOiBgVW5hYmxlIHRvIGZpbmQgaGFuZGxlci5gLFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIF0pXHJcbiAgICAgICAgICApO1xyXG5cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgbGV0IHJlc3BvbnNlID0gYXdhaXQgaGFuZGxlcihldmVudERhdGEpO1xyXG4gICAgICAgICAgd3Muc2VuZChcclxuICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoW1xyXG4gICAgICAgICAgICAgIGV2ZW50SWQsXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgb2s6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiByZXNwb25zZSxcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBdKVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgIHdzLnNlbmQoXHJcbiAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KFtcclxuICAgICAgICAgICAgICBldmVudElkLFxyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG9rOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGVycm9yOiBgJHtlcnJ9YCxcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBdKVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgd3Mub24oXCJjbG9zZVwiLCAoKSA9PiBzb2NrZXRzLmRlbGV0ZSh3cykpO1xyXG4gICAgfVxyXG4gICk7XHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gc2V0KGV2ZW50TmFtZSwgY2FsbGJhY2spIHtcclxuICBpZiAodHlwZW9mIGV2ZW50TmFtZSAhPSBcInN0cmluZ1wiKVxyXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiRXZlbnROYW1lIG5lZWRzIHRvIGJlIGEgc3RyaW5nLlwiKTtcclxuICBpZiAodHlwZW9mIGNhbGxiYWNrICE9IFwiZnVuY3Rpb25cIilcclxuICAgIHRocm93IG5ldyBFcnJvcihcIkNhbGxiYWNrIG5lZWRzIHRvIGJlIGEgZnVuY3Rpb24uXCIpO1xyXG4gIGlmIChoYW5kbGVycy5oYXMoZXZlbnROYW1lKSlcclxuICAgIHRocm93IG5ldyBFcnJvcihcIkV2ZW50TmFtZSBhbHJlYWR5IGluIHVzZS5cIik7XHJcbiAgaGFuZGxlcnMuc2V0KGV2ZW50TmFtZSwgY2FsbGJhY2spO1xyXG4gIHJldHVybiAoKSA9PiB7XHJcbiAgICBoYW5kbGVycy5kZWxldGUoZXZlbnROYW1lKTtcclxuICB9O1xyXG59XHJcbmZ1bmN0aW9uIHRyaWdnZXIoZXZlbnROYW1lLCAuLi5hcmdzKSB7XHJcbiAgaWYgKCFzb2NrZXRFdmVudHMuaGFzKGV2ZW50TmFtZSkpXHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmFibGUgdG8gZmluZCBoYW5kbGVyIVwiKTtcclxuICByZXR1cm4gc29ja2V0RXZlbnRzLmdldChldmVudE5hbWUpKC4uLmFyZ3MpO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgc2V0LFxyXG4gIHRyaWdnZXJcclxufVxyXG5cclxuIiwgImV4cG9ydCBkZWZhdWx0IGBcbi5hY29yZC0tbGF5ZXItY29udGFpbmVyey0tdG9wLW9mZnNldDogMHB4O3dpZHRoOjEwMHZ3O2hlaWdodDpjYWxjKDEwMHZoIC0gdmFyKC0tdG9wLW9mZnNldCkpO3otaW5kZXg6OTk5OTk5OTtwb2ludGVyLWV2ZW50czpub25lO3Bvc2l0aW9uOmFic29sdXRlO3RvcDp2YXIoLS10b3Atb2Zmc2V0KTtsZWZ0OjBweH0uYWNvcmQtLWxheWVyLWNvbnRhaW5lciAqe3otaW5kZXg6OTk5OTk5OTk5OTk5OTl9LmFjb3JkLS10b29sdGlwLWxheWVye29wYWNpdHk6MDt0cmFuc2l0aW9uOjUwbXMgbGluZWFyIG9wYWNpdHk7cG9zaXRpb246YWJzb2x1dGU7cG9pbnRlci1ldmVudHM6bm9uZX0uYWNvcmQtLXRvb2x0aXAtbGF5ZXIudmlzaWJsZXtvcGFjaXR5OjE7cG9pbnRlci1ldmVudHM6YWxsfS5hY29yZC0tdG9hc3RzLWNvbnRhaW5lcntkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2p1c3RpZnktY29udGVudDpmbGV4LWVuZDtmbGV4LWRpcmVjdGlvbjpjb2x1bW47d2lkdGg6MTAwdnc7aGVpZ2h0OmNhbGMoMTAwdmggLSB2YXIoLS10b3Atb2Zmc2V0KSk7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7bGVmdDowO3BvaW50ZXItZXZlbnRzOm5vbmU7cGFkZGluZy1ib3R0b206MzJweH0uYWNvcmQtLXRvYXN0cy1jb250YWluZXIgLmFjb3JkLS10b2FzdHt0cmFuc2l0aW9uOnRyYW5zZm9ybSAyNTBtcyBlYXNlLWluLW91dCxvcGFjaXR5IDI1MG1zIGVhc2UtaW4tb3V0O2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7cG9pbnRlci1ldmVudHM6bm9uZTtib3JkZXItcmFkaXVzOjRweDtwYWRkaW5nOjhweDtib3gtc2hhZG93OjBweCAycHggOHB4IHJnYmEoMCwwLDAsLjI1KTtvcGFjaXR5OjE7Z2FwOjhweDtmb250LXNpemU6MTRweDttYXJnaW46NHB4fS5hY29yZC0tdG9hc3RzLWNvbnRhaW5lciAuYWNvcmQtLXRvYXN0IHN2Z3t3aWR0aDoxNnB4O2hlaWdodDoxNnB4fS5hY29yZC0tdG9hc3RzLWNvbnRhaW5lciAuYWNvcmQtLXRvYXN0LmNsaWNrYWJsZXtjdXJzb3I6cG9pbnRlcjtwb2ludGVyLWV2ZW50czphbGx9LmFjb3JkLS10b2FzdHMtY29udGFpbmVyIC5hY29yZC0tdG9hc3QuY2xvc2luZ3tvcGFjaXR5OjA7dHJhbnNmb3JtOnRyYW5zbGF0ZSgwLCAtNTBweCl9LmFjb3JkLS10b2FzdHMtY29udGFpbmVyIC5hY29yZC0tdG9hc3QuaGlkZGVue29wYWNpdHk6MDt0cmFuc2Zvcm06dHJhbnNsYXRlKDAsIDUwcHgpfS5hY29yZC0tdG9hc3RzLWNvbnRhaW5lciAuYWNvcmQtLXRvYXN0LnN0eWxlLWluZm97YmFja2dyb3VuZC1jb2xvcjojNGE4ZmUxO2NvbG9yOiNmNWY1ZjV9LmFjb3JkLS10b2FzdHMtY29udGFpbmVyIC5hY29yZC0tdG9hc3Quc3R5bGUtd2FybmluZ3tiYWNrZ3JvdW5kLWNvbG9yOiNmYWE4MWE7Y29sb3I6IzAwMH0uYWNvcmQtLXRvYXN0cy1jb250YWluZXIgLmFjb3JkLS10b2FzdC5zdHlsZS1lcnJvcntiYWNrZ3JvdW5kLWNvbG9yOiNlZDQyNDU7Y29sb3I6IzAwMH0uYWNvcmQtLXRvYXN0cy1jb250YWluZXIgLmFjb3JkLS10b2FzdC5zdHlsZS1zdWNjZXNze2JhY2tncm91bmQtY29sb3I6IzNiYTU1ZDtjb2xvcjojZjVmNWY1fS5hY29yZC0tdG9hc3RzLWNvbnRhaW5lciAuYWNvcmQtLXRvYXN0LnN0eWxlLWRlZmF1bHR7YmFja2dyb3VuZC1jb2xvcjojZjVmNWY1O2NvbG9yOiMwMDB9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXJ7d2lkdGg6MTAwdnc7aGVpZ2h0OmNhbGMoMTAwdmggLSB2YXIoLS10b3Atb2Zmc2V0KSk7ZGlzcGxheTpmbGV4O3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6MDtwb2ludGVyLWV2ZW50czpub25lfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyIC5hY29yZC0tbm90aWZpY2F0aW9ue2Rpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpjb2x1bW47cG9pbnRlci1ldmVudHM6YWxsO3RyYW5zaXRpb246dHJhbnNmb3JtIDI1MG1zIGVhc2UtaW4tb3V0LG9wYWNpdHkgMjUwbXMgZWFzZS1pbi1vdXQ7bWFyZ2luOjRweDtiYWNrZHJvcC1maWx0ZXI6Ymx1cigxNnB4KSBicmlnaHRuZXNzKDAuNzUpOy13ZWJraXQtYXBwLXJlZ2lvbjpuby1kcmFnOy0tYW5pbWF0aW9uLXNpemU6IDUwcHh9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24uaGlkZGVuLC5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyIC5hY29yZC0tbm90aWZpY2F0aW9uLmNsb3Npbmd7b3BhY2l0eTowfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyIC5hY29yZC0tbm90aWZpY2F0aW9uPi5jb250YWluZXJ7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2VlbjtwYWRkaW5nOjhweDtjb2xvcjojZmZmO21pbi13aWR0aDoyNTBweH0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllciAuYWNvcmQtLW5vdGlmaWNhdGlvbj4uY29udGFpbmVyPi5jbG9zZXt3aWR0aDoyNHB4O2hlaWdodDoyNHB4O2NvbG9yOiNmZmY7b3BhY2l0eTouNTtjdXJzb3I6cG9pbnRlcjttYXJnaW4tbGVmdDo4cHg7ei1pbmRleDo5OTk5OTk5OTl9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24+LmNvbnRhaW5lcj4uY2xvc2UuaGlkZGVue2Rpc3BsYXk6bm9uZX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllciAuYWNvcmQtLW5vdGlmaWNhdGlvbj4ucHJvZ3Jlc3MtY29udGFpbmVye3dpZHRoOjEwMCU7aGVpZ2h0OjVweH0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllciAuYWNvcmQtLW5vdGlmaWNhdGlvbj4ucHJvZ3Jlc3MtY29udGFpbmVyPi5wcm9ncmVzc3t3aWR0aDowJTtoZWlnaHQ6NXB4O3RyYW5zaXRpb246d2lkdGggdmFyKC0tZHVyYXRpb24pIGxpbmVhcjtiYWNrZ3JvdW5kLWNvbG9yOnZhcigtLWJhci1jb2xvcil9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24+LnByb2dyZXNzLWNvbnRhaW5lcj4ucHJvZ3Jlc3MucHJvZ3Jlc3Npbmd7d2lkdGg6MTAwJX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllciAuYWNvcmQtLW5vdGlmaWNhdGlvbi5zdHlsZS1pbmZvey0tYmFyLWNvbG9yOiAjNGE4ZmUxfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyIC5hY29yZC0tbm90aWZpY2F0aW9uLnN0eWxlLXdhcm5pbmd7LS1iYXItY29sb3I6ICNmYWE4MWF9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24uc3R5bGUtZXJyb3J7LS1iYXItY29sb3I6ICNlZDQyNDV9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24uc3R5bGUtc3VjY2Vzc3stLWJhci1jb2xvcjogIzNiYTU1ZH0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllciAuYWNvcmQtLW5vdGlmaWNhdGlvbi5zdHlsZS1kZWZhdWx0ey0tYmFyLWNvbG9yOiB3aGl0ZXNtb2tlfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLnRvcC1yaWdodHtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1lbmQ7YWxpZ24taXRlbXM6ZmxleC1zdGFydH0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci50b3AtcmlnaHQgLmFjb3JkLS1ub3RpZmljYXRpb24uaGlkZGVue3RyYW5zZm9ybTp0cmFuc2xhdGUoMCwgY2FsYyh2YXIoLS1hbmltYXRpb24tc2l6ZSkgKiAtMSkpfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLnRvcC1yaWdodCAuYWNvcmQtLW5vdGlmaWNhdGlvbi5jbG9zaW5ne3RyYW5zZm9ybTp0cmFuc2xhdGUoMCwgdmFyKC0tYW5pbWF0aW9uLXNpemUpKX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci50b3AtbGVmdHtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1zdGFydDthbGlnbi1pdGVtczpmbGV4LXN0YXJ0fS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLnRvcC1sZWZ0IC5hY29yZC0tbm90aWZpY2F0aW9uLmhpZGRlbnt0cmFuc2Zvcm06dHJhbnNsYXRlKDAsIGNhbGModmFyKC0tYW5pbWF0aW9uLXNpemUpICogLTEpKX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci50b3AtbGVmdCAuYWNvcmQtLW5vdGlmaWNhdGlvbi5jbG9zaW5ne3RyYW5zZm9ybTp0cmFuc2xhdGUoMCwgdmFyKC0tYW5pbWF0aW9uLXNpemUpKX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci5ib3R0b20tcmlnaHR7anVzdGlmeS1jb250ZW50OmZsZXgtZW5kO2FsaWduLWl0ZW1zOmZsZXgtZW5kfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLmJvdHRvbS1yaWdodCAuYWNvcmQtLW5vdGlmaWNhdGlvbi5oaWRkZW57dHJhbnNmb3JtOnRyYW5zbGF0ZSgwLCB2YXIoLS1hbmltYXRpb24tc2l6ZSkpfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLmJvdHRvbS1yaWdodCAuYWNvcmQtLW5vdGlmaWNhdGlvbi5jbG9zaW5ne3RyYW5zZm9ybTp0cmFuc2xhdGUoMCwgY2FsYyh2YXIoLS1hbmltYXRpb24tc2l6ZSkgKiAtMSkpfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLmJvdHRvbS1sZWZ0e2p1c3RpZnktY29udGVudDpmbGV4LXN0YXJ0O2FsaWduLWl0ZW1zOmZsZXgtZW5kfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLmJvdHRvbS1sZWZ0IC5hY29yZC0tbm90aWZpY2F0aW9uLmhpZGRlbnt0cmFuc2Zvcm06dHJhbnNsYXRlKDAsIHZhcigtLWFuaW1hdGlvbi1zaXplKSl9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIuYm90dG9tLWxlZnQgLmFjb3JkLS1ub3RpZmljYXRpb24uY2xvc2luZ3t0cmFuc2Zvcm06dHJhbnNsYXRlKDAsIGNhbGModmFyKC0tYW5pbWF0aW9uLXNpemUpICogLTEpKX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci50b3AtY2VudGVye2p1c3RpZnktY29udGVudDpjZW50ZXI7YWxpZ24taXRlbXM6ZmxleC1zdGFydH0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci50b3AtY2VudGVyIC5hY29yZC0tbm90aWZpY2F0aW9uLmhpZGRlbnt0cmFuc2Zvcm06dHJhbnNsYXRlKDAsIGNhbGModmFyKC0tYW5pbWF0aW9uLXNpemUpICogLTEpKX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci50b3AtY2VudGVyIC5hY29yZC0tbm90aWZpY2F0aW9uLmNsb3Npbmd7dHJhbnNmb3JtOnRyYW5zbGF0ZSgwLCB2YXIoLS1hbmltYXRpb24tc2l6ZSkpfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLmJvdHRvbS1jZW50ZXJ7anVzdGlmeS1jb250ZW50OmNlbnRlcjthbGlnbi1pdGVtczpmbGV4LWVuZH0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci5ib3R0b20tY2VudGVyIC5hY29yZC0tbm90aWZpY2F0aW9uLmhpZGRlbnt0cmFuc2Zvcm06dHJhbnNsYXRlKDAsIHZhcigtLWFuaW1hdGlvbi1zaXplKSl9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIuYm90dG9tLWNlbnRlciAuYWNvcmQtLW5vdGlmaWNhdGlvbi5jbG9zaW5ne3RyYW5zZm9ybTp0cmFuc2xhdGUoMCwgY2FsYyh2YXIoLS1hbmltYXRpb24tc2l6ZSkgKiAtMSkpfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLmNlbnRlcntqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO2FsaWduLWl0ZW1zOmNlbnRlcn0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci5jZW50ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24uaGlkZGVue3RyYW5zZm9ybTpzY2FsZSgwLjUpfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLmNlbnRlciAuYWNvcmQtLW5vdGlmaWNhdGlvbi5jbG9zaW5ne3RyYW5zZm9ybTpzY2FsZSgwLjUpfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLmxlZnQtY2VudGVye2p1c3RpZnktY29udGVudDpmbGV4LXN0YXJ0O2FsaWduLWl0ZW1zOmNlbnRlcn0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci5sZWZ0LWNlbnRlciAuYWNvcmQtLW5vdGlmaWNhdGlvbi5oaWRkZW57dHJhbnNmb3JtOnRyYW5zbGF0ZShjYWxjKHZhcigtLWFuaW1hdGlvbi1zaXplKSAqIC0xKSwgMCl9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIubGVmdC1jZW50ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24uY2xvc2luZ3t0cmFuc2Zvcm06dHJhbnNsYXRlKHZhcigtLWFuaW1hdGlvbi1zaXplKSwgMCl9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIucmlnaHQtY2VudGVye2p1c3RpZnktY29udGVudDpmbGV4LWVuZDthbGlnbi1pdGVtczpjZW50ZXJ9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIucmlnaHQtY2VudGVyIC5hY29yZC0tbm90aWZpY2F0aW9uLmhpZGRlbnt0cmFuc2Zvcm06dHJhbnNsYXRlKHZhcigtLWFuaW1hdGlvbi1zaXplKSwgMCl9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIucmlnaHQtY2VudGVyIC5hY29yZC0tbm90aWZpY2F0aW9uLmNsb3Npbmd7dHJhbnNmb3JtOnRyYW5zbGF0ZShjYWxjKHZhcigtLWFuaW1hdGlvbi1zaXplKSAqIC0xKSwgMCl9YDtcbiIsICJpbXBvcnQgZG9tIGZyb20gXCIuLi9kb20vaW5kZXguanNcIjtcclxuaW1wb3J0IGV2ZW50cyBmcm9tIFwiLi4vZXZlbnRzL2luZGV4LmpzXCI7XHJcbmltcG9ydCB3ZWJwYWNrIGZyb20gXCIuLi9tb2R1bGVzL3dlYnBhY2suanNcIjtcclxuXHJcbmNvbnN0IHRvb2x0aXBDbGFzc2VzID0gd2VicGFjay5maW5kQnlQcm9wZXJ0aWVzKFwidG9vbHRpcENvbnRlbnRBbGxvd092ZXJmbG93XCIsIFwidG9vbHRpcFwiKTtcclxuXHJcbmNvbnN0IHRvb2x0aXBQb3NpdGlvbnMgPSB7XHJcbiAgdG9wOiB0b29sdGlwQ2xhc3Nlcy50b29sdGlwVG9wLFxyXG4gIGJvdHRvbTogdG9vbHRpcENsYXNzZXMudG9vbHRpcEJvdHRvbSxcclxuICBsZWZ0OiB0b29sdGlwQ2xhc3Nlcy50b29sdGlwTGVmdCxcclxuICByaWdodDogdG9vbHRpcENsYXNzZXMudG9vbHRpcFJpZ2h0LFxyXG59XHJcblxyXG5jbGFzcyBUb29sdGlwIHtcclxuICAvKipcclxuICAgKiBAcGFyYW0ge0hUTUxEaXZFbGVtZW50fSB0YXJnZXQgXHJcbiAgICogQHBhcmFtIHtzdHJpbmd8SFRNTERpdkVsZW1lbnR9IGNvbnRlbnRcclxuICAgKi9cclxuICBjb25zdHJ1Y3Rvcih0YXJnZXQsIGNvbnRlbnQsIHBvc2l0aW9uID0gXCJhdXRvXCIpIHtcclxuICAgIC8qKiBAdHlwZSB7SFRNTERpdkVsZW1lbnR9ICovXHJcbiAgICB0aGlzLmxheWVyRWxlbWVudCA9IGRvbS5wYXJzZShgXHJcbiAgICAgIDxkaXYgY2xhc3M9XCJhY29yZC0tdG9vbHRpcC1sYXllclwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCIke3Rvb2x0aXBDbGFzc2VzLnRvb2x0aXB9ICR7dG9vbHRpcENsYXNzZXMudG9vbHRpcFByaW1hcnl9IGFjb3JkLS10b29sdGlwXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiJHt0b29sdGlwQ2xhc3Nlcy50b29sdGlwUG9pbnRlcn0gYWNvcmQtLXRvb2x0aXAtcG9pbnRlclwiPjwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cIiR7dG9vbHRpcENsYXNzZXMudG9vbHRpcENvbnRlbnR9IGFjb3JkLS10b29sdGlwLWNvbnRlbnRcIj48L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICBgKTtcclxuICAgIHRoaXMudG9vbHRpcEVsZW1lbnQgPSB0aGlzLmxheWVyRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmFjb3JkLS10b29sdGlwXCIpO1xyXG4gICAgdGhpcy5jb250ZW50RWxlbWVudCA9IHRoaXMubGF5ZXJFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWNvcmQtLXRvb2x0aXAtY29udGVudFwiKTtcclxuICAgIHRoaXMuY29udGVudCA9IGNvbnRlbnQ7XHJcbiAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuICAgIHRoaXMucG9zaXRpb24gPSBwb3NpdGlvbjtcclxuXHJcbiAgICB0aGlzLnZpc2libGUgPSBmYWxzZTtcclxuICAgIHRoaXMuZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgIHRoaXMucGF1c2VkID0gZmFsc2U7XHJcblxyXG4gICAgY29uc3Qgb25Nb3VzZUVudGVyID0gKCkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5kaXNhYmxlZCB8fCB0aGlzLnBhdXNlZCkgcmV0dXJuO1xyXG4gICAgICB0aGlzLnNob3coKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBvbk1vdXNlTGVhdmUgPSAoKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLnBhdXNlZCkgcmV0dXJuO1xyXG4gICAgICB0aGlzLmhpZGUoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnRhcmdldC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCBvbk1vdXNlRW50ZXIpO1xyXG4gICAgdGhpcy50YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgb25Nb3VzZUxlYXZlKTtcclxuXHJcbiAgICBsZXQgdW5QYXRjaE9ic2VydmVyID0gZXZlbnRzLm9uKFxyXG4gICAgICBcIkRvbU11dGF0aW9uXCIsXHJcbiAgICAgIC8qKiBAcGFyYW0ge011dGF0aW9uUmVjb3JkfSBtdXQgKi8obXV0KSA9PiB7XHJcbiAgICAgICAgaWYgKG11dC50eXBlID09PSBcImF0dHJpYnV0ZXNcIikge1xyXG4gICAgICAgICAgaWYgKG11dC50YXJnZXQuaXNTYW1lTm9kZSh0aGlzLnRhcmdldCkpIHtcclxuICAgICAgICAgICAgc3dpdGNoIChtdXQuYXR0cmlidXRlTmFtZSkge1xyXG4gICAgICAgICAgICAgIGNhc2UgXCJhY29yZC0tdG9vbHRpcC1kaXNhYmxlZFwiOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRpc2FibGVkID0gdGhpcy50YXJnZXQuZ2V0QXR0cmlidXRlKFwiYWNvcmQtLXRvb2x0aXAtZGlzYWJsZWRcIikgPT09IFwidHJ1ZVwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGNhc2UgXCJhY29yZC0tdG9vbHRpcC1jb250ZW50XCI6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudCA9IHRoaXMudGFyZ2V0LmdldEF0dHJpYnV0ZShcImFjb3JkLS10b29sdGlwLWNvbnRlbnRcIik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgY2FzZSBcImFjb3JkLS10b29sdGlwLXBvc2l0aW9uXCI6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb24gPSB0aGlzLnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJhY29yZC0tdG9vbHRpcC1wb3NpdGlvblwiKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgKVxyXG5cclxuICAgIHRoaXMuZGVzdHJveSA9ICgpID0+IHtcclxuICAgICAgdGhpcy50YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgb25Nb3VzZUVudGVyKTtcclxuICAgICAgdGhpcy50YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgb25Nb3VzZUxlYXZlKTtcclxuICAgICAgdGhpcy5oaWRlKCk7XHJcbiAgICAgIHVuUGF0Y2hPYnNlcnZlcigpO1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGdldCBjb250ZW50KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY29udGVudEVsZW1lbnQuZmlyc3RFbGVtZW50Q2hpbGQ7XHJcbiAgfVxyXG5cclxuICBzZXQgY29udGVudCh2YWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICB0aGlzLmNvbnRlbnRFbGVtZW50LmlubmVySFRNTCA9IHZhbHVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5jb250ZW50RWxlbWVudC5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgICB0aGlzLmNvbnRlbnRFbGVtZW50Py5hcHBlbmRDaGlsZD8uKHZhbHVlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0YXRpYyBnZXRDb250YWluZXIoKSB7XHJcbiAgICBjb25zdCBhcHBFbG0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbY2xhc3MqPVwibm90QXBwQXNpZGVQYW5lbC1cIl0nKTtcclxuXHJcbiAgICBsZXQgY29udGFpbmVyID0gYXBwRWxtLnF1ZXJ5U2VsZWN0b3IoXCIuYWNvcmQtLXRvb2x0aXAtY29udGFpbmVyXCIpO1xyXG4gICAgaWYgKCFjb250YWluZXIpIHtcclxuICAgICAgY29udGFpbmVyID0gZG9tLnBhcnNlKGA8ZGl2IGNsYXNzPVwiYWNvcmQtLWxheWVyLWNvbnRhaW5lciBhY29yZC0tdG9vbHRpcC1jb250YWluZXJcIj48L2Rpdj5gKTtcclxuICAgICAgYXBwRWxtLmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XHJcbiAgICB9XHJcbiAgICAvLyBjb250YWluZXIuc3R5bGUuc2V0UHJvcGVydHkoXCItLXRvcC1vZmZzZXRcIiwgYCR7YXBwRWxtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcC50b0ZpeGVkKDEpfXB4YCk7XHJcblxyXG4gICAgcmV0dXJuIGNvbnRhaW5lcjtcclxuICB9XHJcblxyXG4gIHNob3coKSB7XHJcbiAgICBpZiAodGhpcy52aXNpYmxlKSByZXR1cm47XHJcbiAgICB0aGlzLnZpc2libGUgPSB0cnVlO1xyXG5cclxuICAgIGNvbnN0IGNvbnRhaW5lciA9IFRvb2x0aXAuZ2V0Q29udGFpbmVyKCk7XHJcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5sYXllckVsZW1lbnQpO1xyXG5cclxuICAgIGlmICghdGhpcy5wb3NpdGlvbiB8fCB0aGlzLnBvc2l0aW9uID09PSBcImF1dG9cIikge1xyXG4gICAgICB0aGlzLmNhbGN1bGF0ZVBvc2l0aW9uKFxyXG4gICAgICAgIHRoaXMuY2FuU2hvd0F0VG9wID8gXCJ0b3BcIlxyXG4gICAgICAgICAgOiB0aGlzLmNhblNob3dBdEJvdHRvbSA/IFwiYm90dG9tXCJcclxuICAgICAgICAgICAgOiB0aGlzLmNhblNob3dBdExlZnQgPyBcImxlZnRcIlxyXG4gICAgICAgICAgICAgIDogdGhpcy5jYW5TaG93QXRSaWdodCA/IFwicmlnaHRcIlxyXG4gICAgICAgICAgICAgICAgOiBcInRvcFwiXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmNhbGN1bGF0ZVBvc2l0aW9uKHRoaXMucG9zaXRpb24pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICB0aGlzLmxheWVyRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwidmlzaWJsZVwiKTtcclxuICB9XHJcblxyXG4gIGNhbGN1bGF0ZVBvc2l0aW9uKHBvc2l0aW9uKSB7XHJcbiAgICBjb25zdCB0YXJnZXRSZWN0ID0gdGhpcy50YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblxyXG4gICAgdGhpcy5sYXllckVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSguLi5PYmplY3QudmFsdWVzKHRvb2x0aXBQb3NpdGlvbnMpKTtcclxuICAgIHRoaXMudG9vbHRpcEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcInZlcnRpY2FsXCIsIFwiaG9yaXpvbnRhbFwiKTtcclxuXHJcbiAgICBzd2l0Y2ggKHBvc2l0aW9uKSB7XHJcbiAgICAgIGNhc2UgXCJ0b3BcIjoge1xyXG4gICAgICAgIHRoaXMubGF5ZXJFbGVtZW50LmNsYXNzTGlzdC5hZGQodG9vbHRpcFBvc2l0aW9ucy50b3ApO1xyXG4gICAgICAgIHRoaXMubGF5ZXJFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KFwibGVmdFwiLCBgJHt0YXJnZXRSZWN0LmxlZnR9cHhgKTtcclxuICAgICAgICB0aGlzLmxheWVyRWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShcInRvcFwiLCBgJHsodGFyZ2V0UmVjdC50b3AgLSB0aGlzLmxheWVyRWxlbWVudC5vZmZzZXRIZWlnaHQgLSAxMCl9cHhgKTtcclxuICAgICAgICB0aGlzLmNlbnRlclBvc2l0aW9uKFwiaG9yaXpvbnRhbFwiKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlIFwiYm90dG9tXCI6IHtcclxuICAgICAgICB0aGlzLmxheWVyRWxlbWVudC5jbGFzc0xpc3QuYWRkKHRvb2x0aXBQb3NpdGlvbnMuYm90dG9tKTtcclxuICAgICAgICB0aGlzLmxheWVyRWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShcImxlZnRcIiwgYCR7dGFyZ2V0UmVjdC5sZWZ0fXB4YCk7XHJcbiAgICAgICAgdGhpcy5sYXllckVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoXCJ0b3BcIiwgYCR7KHRhcmdldFJlY3QudG9wICsgdGhpcy5sYXllckVsZW1lbnQub2Zmc2V0SGVpZ2h0ICsgMTApfXB4YCk7XHJcbiAgICAgICAgdGhpcy5jZW50ZXJQb3NpdGlvbihcImhvcml6b250YWxcIik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSBcImxlZnRcIjoge1xyXG4gICAgICAgIHRoaXMubGF5ZXJFbGVtZW50LmNsYXNzTGlzdC5hZGQodG9vbHRpcFBvc2l0aW9ucy5sZWZ0KTtcclxuICAgICAgICB0aGlzLmxheWVyRWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShcInRvcFwiLCBgJHt0YXJnZXRSZWN0LnRvcH1weGApO1xyXG4gICAgICAgIHRoaXMubGF5ZXJFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KFwibGVmdFwiLCBgJHt0YXJnZXRSZWN0LmxlZnQgLSB0aGlzLmxheWVyRWxlbWVudC5vZmZzZXRXaWR0aCAtIDEwfXB4YCk7XHJcbiAgICAgICAgdGhpcy5jZW50ZXJQb3NpdGlvbihcInZlcnRpY2FsXCIpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgXCJyaWdodFwiOiB7XHJcbiAgICAgICAgdGhpcy5sYXllckVsZW1lbnQuY2xhc3NMaXN0LmFkZCh0b29sdGlwUG9zaXRpb25zLnJpZ2h0KTtcclxuICAgICAgICB0aGlzLmxheWVyRWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShcInRvcFwiLCBgJHt0YXJnZXRSZWN0LnRvcH1weGApO1xyXG4gICAgICAgIHRoaXMubGF5ZXJFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KFwibGVmdFwiLCBgJHt0YXJnZXRSZWN0LmxlZnQgKyB0aGlzLmxheWVyRWxlbWVudC5vZmZzZXRXaWR0aCArIDEwfXB4YCk7XHJcbiAgICAgICAgdGhpcy5jZW50ZXJQb3NpdGlvbihcInZlcnRpY2FsXCIpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjZW50ZXJQb3NpdGlvbihkaXJlY3Rpb24pIHtcclxuICAgIHN3aXRjaCAoZGlyZWN0aW9uKSB7XHJcbiAgICAgIGNhc2UgXCJob3Jpem9udGFsXCI6IHtcclxuICAgICAgICBjb25zdCBjZW50ZXIgPSB0aGlzLnRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0ICsgKHRoaXMudGFyZ2V0Lm9mZnNldFdpZHRoIC8gMik7XHJcbiAgICAgICAgdGhpcy5sYXllckVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoXCJsZWZ0XCIsIGAke2NlbnRlciAtICh0aGlzLmxheWVyRWxlbWVudC5vZmZzZXRXaWR0aCAvIDIpfXB4YCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSBcInZlcnRpY2FsXCI6IHtcclxuICAgICAgICBjb25zdCBjZW50ZXIgPSB0aGlzLnRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgKyAodGhpcy50YXJnZXQub2Zmc2V0SGVpZ2h0IC8gMik7XHJcbiAgICAgICAgdGhpcy5sYXllckVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoXCJ0b3BcIiwgYCR7Y2VudGVyIC0gKHRoaXMubGF5ZXJFbGVtZW50Lm9mZnNldEhlaWdodCAvIDIpfXB4YCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGhpZGUoKSB7XHJcbiAgICBpZiAoIXRoaXMudmlzaWJsZSkgcmV0dXJuO1xyXG4gICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5sYXllckVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcInZpc2libGVcIik7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGhpcy5sYXllckVsZW1lbnQucmVtb3ZlKCk7XHJcbiAgICB9LCA1MCk7XHJcbiAgfVxyXG5cclxuICBnZXQgY2FuU2hvd0F0VG9wKCkgeyByZXR1cm4gdGhpcy50YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wIC0gdGhpcy5sYXllckVsZW1lbnQub2Zmc2V0SGVpZ2h0ID49IDA7IH1cclxuICBnZXQgY2FuU2hvd0F0Qm90dG9tKCkgeyByZXR1cm4gdGhpcy50YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgdGhpcy50YXJnZXQub2Zmc2V0SGVpZ2h0ICsgdGhpcy5sYXllckVsZW1lbnQub2Zmc2V0SGVpZ2h0IDw9IHdpbmRvdy5pbm5lckhlaWdodDsgfVxyXG4gIGdldCBjYW5TaG93QXRMZWZ0KCkgeyByZXR1cm4gdGhpcy50YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCAtIHRoaXMubGF5ZXJFbGVtZW50Lm9mZnNldFdpZHRoID49IDA7IH1cclxuICBnZXQgY2FuU2hvd0F0UmlnaHQoKSB7IHJldHVybiB0aGlzLnRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0ICsgdGhpcy50YXJnZXQub2Zmc2V0V2lkdGggKyB0aGlzLmxheWVyRWxlbWVudC5vZmZzZXRXaWR0aCA8PSB3aW5kb3cuaW5uZXJXaWR0aDsgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGUodGFyZ2V0LCBjb250ZW50LCBwb3NpdGlvbiA9IFwiYXV0b1wiKSB7XHJcbiAgcmV0dXJuIG5ldyBUb29sdGlwKHRhcmdldCwgY29udGVudCwgcG9zaXRpb24pO1xyXG59XHJcblxyXG5kb20ucGF0Y2goXHJcbiAgXCJbYWNvcmQtLXRvb2x0aXAtY29udGVudF1cIixcclxuICAoZWxtKSA9PiB7XHJcbiAgICBsZXQgdG9vbHRpcCA9IGNyZWF0ZShlbG0sIGVsbS5nZXRBdHRyaWJ1dGUoXCJhY29yZC0tdG9vbHRpcC1jb250ZW50XCIpLCBlbG0uZ2V0QXR0cmlidXRlKFwiYWNvcmQtLXRvb2x0aXAtcG9zaXRpb25cIikpO1xyXG4gICAgdG9vbHRpcC5kaXNhYmxlZCA9IGVsbS5nZXRBdHRyaWJ1dGUoXCJhY29yZC0tdG9vbHRpcC1kaXNhYmxlZFwiKSA9PT0gXCJ0cnVlXCI7XHJcbiAgfSxcclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHsgY3JlYXRlIH07IiwgImltcG9ydCBkb20gZnJvbSBcIi4uL2RvbS9pbmRleC5qc1wiO1xyXG5pbXBvcnQgdXRpbHMgZnJvbSBcIi4uL3V0aWxzL2luZGV4LmpzXCI7XHJcblxyXG5jb25zdCB2YWxpZFBvc2l0aW9ucyA9IFtcclxuICBcInRvcC1yaWdodFwiLFxyXG4gIFwidG9wLWxlZnRcIixcclxuICBcImJvdHRvbS1yaWdodFwiLFxyXG4gIFwiYm90dG9tLWxlZnRcIixcclxuICBcInRvcC1jZW50ZXJcIixcclxuICBcImJvdHRvbS1jZW50ZXJcIixcclxuICBcImNlbnRlclwiLFxyXG4gIFwibGVmdC1jZW50ZXJcIixcclxuICBcInJpZ2h0LWNlbnRlclwiXHJcbl1cclxuXHJcbmZ1bmN0aW9uIGdldENvbnRhaW5lcihwb3NpdGlvbikge1xyXG4gIGlmICghdmFsaWRQb3NpdGlvbnMuaW5jbHVkZXMocG9zaXRpb24pKSB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgcG9zaXRpb24gXCIke3Bvc2l0aW9ufVwiLiBWYWxpZCBwb3NpdGlvbnMgYXJlOiAke3ZhbGlkUG9zaXRpb25zLmpvaW4oXCIsIFwiKX1gKTtcclxuICBjb25zdCBhcHBFbG0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbY2xhc3MqPVwibm90QXBwQXNpZGVQYW5lbC1cIl0nKTtcclxuXHJcbiAgbGV0IHRvcENvbnRhaW5lciA9IGFwcEVsbS5xdWVyeVNlbGVjdG9yKFwiLmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXItY29udGFpbmVyXCIpO1xyXG4gIGlmICghdG9wQ29udGFpbmVyKSB7XHJcbiAgICB0b3BDb250YWluZXIgPSBkb20ucGFyc2UoYDxkaXYgY2xhc3M9XCJhY29yZC0tbGF5ZXItY29udGFpbmVyIGFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXItY29udGFpbmVyXCI+PC9kaXY+YCk7XHJcbiAgICBhcHBFbG0uYXBwZW5kQ2hpbGQodG9wQ29udGFpbmVyKTtcclxuICB9XHJcbiAgdG9wQ29udGFpbmVyLnN0eWxlLnNldFByb3BlcnR5KFwiLS10b3Atb2Zmc2V0XCIsIGAke2FwcEVsbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AudG9GaXhlZCgxKX1weGApO1xyXG5cclxuICBsZXQgcG9zaXRpb25Db250YWluZXIgPSB0b3BDb250YWluZXIucXVlcnlTZWxlY3RvcihgLmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIuJHtwb3NpdGlvbn1gKTtcclxuICBpZiAoIXBvc2l0aW9uQ29udGFpbmVyKSB7XHJcbiAgICBwb3NpdGlvbkNvbnRhaW5lciA9IGRvbS5wYXJzZShgPGRpdiBjbGFzcz1cImFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIgJHtwb3NpdGlvbn1cIj48L2Rpdj5gKTtcclxuICAgIHRvcENvbnRhaW5lci5hcHBlbmRDaGlsZChwb3NpdGlvbkNvbnRhaW5lcik7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gcG9zaXRpb25Db250YWluZXI7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3coY29udGVudCwge1xyXG4gIHN0eWxlID0gXCJkZWZhdWx0XCIsXHJcbiAgdGltZW91dCA9IDEwMDAwLFxyXG4gIHBvc2l0aW9uID0gXCJ0b3AtcmlnaHRcIixcclxuICBjbG9zYWJsZSA9IHRydWUsXHJcbiAgb25DbGljayA9IG51bGwsXHJcbiAgb25DbG9zZSA9IG51bGxcclxufSA9IHt9KSB7XHJcbiAgY29uc3QgY29udGFpbmVyID0gZ2V0Q29udGFpbmVyKHBvc2l0aW9uKTtcclxuXHJcbiAgY29uc3Qgbm90aWZFbG0gPSBkb20ucGFyc2UoYFxyXG4gICAgPGRpdiBjbGFzcz1cImFjb3JkLS1ub3RpZmljYXRpb24gc3R5bGUtJHtzdHlsZX0gaGlkZGVuXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGVudFwiPjwvZGl2PlxyXG4gICAgICAgICAgICA8c3ZnIGNsYXNzPVwiY2xvc2UgJHshY2xvc2FibGUgPyBcImhpZGRlblwiIDogXCJcIn1cIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiPlxyXG4gICAgICAgICAgICAgICAgPHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNMTIgMTAuNTg2bDQuOTUtNC45NSAxLjQxNCAxLjQxNC00Ljk1IDQuOTUgNC45NSA0Ljk1LTEuNDE0IDEuNDE0LTQuOTUtNC45NS00Ljk1IDQuOTUtMS40MTQtMS40MTQgNC45NS00Ljk1LTQuOTUtNC45NUw3LjA1IDUuNjM2elwiLz5cclxuICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInByb2dyZXNzLWNvbnRhaW5lclwiIHN0eWxlPVwiLS1kdXJhdGlvbjogJHt0aW1lb3V0fW1zO1wiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZ3Jlc3NcIj48L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIGApO1xyXG5cclxuICBub3RpZkVsbS5xdWVyeVNlbGVjdG9yKFwiLmNvbnRlbnRcIikuaW5uZXJIVE1MID0gY29udGVudDtcclxuXHJcbiAgbGV0IGNsb3NlZCA9IGZhbHNlO1xyXG4gIGZ1bmN0aW9uIGNsb3NlKGNsb3NlVHlwZSkge1xyXG4gICAgaWYgKGNsb3NlZCkgcmV0dXJuO1xyXG4gICAgY2xvc2VkID0gdHJ1ZTtcclxuXHJcbiAgICBub3RpZkVsbS5jbGFzc0xpc3QuYWRkKFwiY2xvc2luZ1wiKTtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBub3RpZkVsbS5yZW1vdmUoKTtcclxuXHJcbiAgICAgIHV0aWxzLmlmRXhpc3RzKFxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLWNvbnRhaW5lcmApLFxyXG4gICAgICAgIC8qKiBAcGFyYW0ge0hUTUxEaXZFbGVtZW50fSBlbG0gKi8oZWxtKSA9PiB7XHJcbiAgICAgICAgICBpZiAoIShbLi4uZWxtLmNoaWxkTm9kZXMudmFsdWVzKCldLnJlZHVjZSgocHJldiwgY3VycikgPT4gcHJldiArIGN1cnIuY2hpbGRFbGVtZW50Q291bnQsIDApKSkgZWxtLnJlbW92ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgKTtcclxuICAgIH0sIDI3NSk7XHJcbiAgICBvbkNsb3NlPy4oY2xvc2VUeXBlKTtcclxuICB9XHJcblxyXG4gIGlmICh0eXBlb2Ygb25DbGljayA9PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgIG5vdGlmRWxtLmNsYXNzTGlzdC5hZGQoXCJjbGlja2FibGVcIik7XHJcbiAgICBub3RpZkVsbS5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgICBvbkNsaWNrKGNsb3NlKTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICB1dGlscy5pZkV4aXN0cyhub3RpZkVsbS5xdWVyeVNlbGVjdG9yKFwiLmNsb3NlXCIpLCAoZWxtKSA9PiB7XHJcbiAgICBlbG0ub25jbGljayA9ICgpID0+IHtcclxuICAgICAgY2xvc2UoXCJ1c2VyXCIpO1xyXG4gICAgfTtcclxuICB9KTtcclxuXHJcbiAgY29udGFpbmVyLnByZXBlbmQobm90aWZFbG0pO1xyXG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XHJcbiAgICBub3RpZkVsbS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xyXG4gICAgbm90aWZFbG0ucXVlcnlTZWxlY3RvcihcIi5wcm9ncmVzc1wiKS5jbGFzc0xpc3QuYWRkKFwicHJvZ3Jlc3NpbmdcIik7XHJcbiAgfSk7XHJcblxyXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgY2xvc2UoXCJ0aW1lb3V0XCIpO1xyXG4gIH0sIHRpbWVvdXQpO1xyXG5cclxuICByZXR1cm4gKCkgPT4ge1xyXG4gICAgY2xvc2UoXCJmb3JjZVwiKTtcclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgc2hvdzogT2JqZWN0LmFzc2lnbihzaG93LCB7XHJcbiAgICBpbmZvOiAoaHRtbCwgb2JqID0ge30pID0+IHNob3coaHRtbCwgeyAuLi5vYmosIHN0eWxlOiBcImluZm9cIiB9KSxcclxuICAgIGVycm9yOiAoaHRtbCwgb2JqID0ge30pID0+IHNob3coaHRtbCwgeyAuLi5vYmosIHN0eWxlOiBcImVycm9yXCIgfSksXHJcbiAgICB3YXJuaW5nOiAoaHRtbCwgb2JqID0ge30pID0+IHNob3coaHRtbCwgeyAuLi5vYmosIHN0eWxlOiBcIndhcm5pbmdcIiB9KSxcclxuICAgIHN1Y2Nlc3M6IChodG1sLCBvYmogPSB7fSkgPT4gc2hvdyhodG1sLCB7IC4uLm9iaiwgc3R5bGU6IFwic3VjY2Vzc1wiIH0pLFxyXG4gIH0pLFxyXG59OyIsICJpbXBvcnQgd2VicGFjayBmcm9tIFwiLi4vbW9kdWxlcy93ZWJwYWNrLmpzXCI7XHJcbmltcG9ydCBwYXRjaGVyIGZyb20gXCIuLi9wYXRjaGVyL2luZGV4LmpzXCI7XHJcbmltcG9ydCBsb2dnZXIgZnJvbSBcIi4uL3V0aWxzL2xvZ2dlci5qc1wiO1xyXG5cclxuaW1wb3J0IGNvbW1vbiBmcm9tIFwiLi4vbW9kdWxlcy9jb21tb24uanNcIjtcclxuaW1wb3J0IHsgZmluZGVyTWFwIH0gZnJvbSBcIi4uL21vZHVsZXMvcmF3L2NvbXBsZXgtZmluZGVyLmpzXCI7XHJcblxyXG5jb25zdCB7IFJlYWN0IH0gPSBjb21tb247XHJcblxyXG5sZXQgaXNSZWFkeSA9IGZhbHNlO1xyXG5cclxubGV0IENvbXBvbmVudHMgPSBudWxsO1xyXG5cclxubGV0IEFjdGlvbnMgPSBudWxsO1xyXG5cclxuKGFzeW5jICgpID0+IHtcclxuICBBY3Rpb25zID0gYXdhaXQgKGFzeW5jICgpID0+IHtcclxuICAgIGxldCBvZ01vZHVsZTtcclxuICAgIHdoaWxlICh0cnVlKSB7XHJcbiAgICAgIG9nTW9kdWxlID0gd2VicGFjay5maWx0ZXIobSA9PiBPYmplY3QudmFsdWVzKG0pLnNvbWUodiA9PiB0eXBlb2YgdiA9PT0gXCJmdW5jdGlvblwiICYmIHYudG9TdHJpbmcoKS5pbmNsdWRlcyhcIkNPTlRFWFRfTUVOVV9DTE9TRVwiKSkpLmZpbmQobSA9PiBtLmV4cG9ydHMgIT09IHdpbmRvdyk/LmV4cG9ydHM7XHJcbiAgICAgIGlmIChvZ01vZHVsZSkgYnJlYWs7XHJcbiAgICAgIGF3YWl0IG5ldyBQcm9taXNlKHIgPT4gc2V0VGltZW91dChyLCAxMDApKTtcclxuICAgIH1cclxuICAgIGNvbnN0IG91dCA9IGZpbmRlck1hcChvZ01vZHVsZSwge1xyXG4gICAgICBjbG9zZTogW1wiQ09OVEVYVF9NRU5VX0NMT1NFXCJdLFxyXG4gICAgICBvcGVuOiBbXCJyZW5kZXJMYXp5XCJdXHJcbiAgICB9KTtcclxuXHJcbiAgICBpc1JlYWR5ID0gISFvdXQuY2xvc2UgJiYgISFvdXQub3BlbjtcclxuICAgIHJldHVybiBvdXQ7XHJcbiAgfSkoKTtcclxuXHJcbiAgQ29tcG9uZW50cyA9IGF3YWl0IChhc3luYyAoKSA9PiB7XHJcbiAgICBjb25zdCBvdXQgPSB7fTtcclxuICAgIGNvbnN0IGNvbXBvbmVudE1hcCA9IHtcclxuICAgICAgc2VwYXJhdG9yOiBcIlNlcGFyYXRvclwiLFxyXG4gICAgICBjaGVja2JveDogXCJDaGVja2JveEl0ZW1cIixcclxuICAgICAgcmFkaW86IFwiUmFkaW9JdGVtXCIsXHJcbiAgICAgIGNvbnRyb2w6IFwiQ29udHJvbEl0ZW1cIixcclxuICAgICAgZ3JvdXBzdGFydDogXCJHcm91cFwiLFxyXG4gICAgICBjdXN0b21pdGVtOiBcIkl0ZW1cIlxyXG4gICAgfTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBsZXQgbW9kdWxlSWQ7XHJcbiAgICAgIHdoaWxlICh0cnVlKSB7XHJcbiAgICAgICAgbW9kdWxlSWQgPSBPYmplY3QuZW50cmllcyh3ZWJwYWNrLnJlcXVpcmUubSkuZmluZCgoWywgbV0pID0+IG0/LnRvU3RyaW5nKCkuaW5jbHVkZXMoXCJtZW51aXRlbWNoZWNrYm94XCIpKVswXVxyXG4gICAgICAgIGlmIChtb2R1bGVJZCkgYnJlYWs7XHJcbiAgICAgICAgYXdhaXQgbmV3IFByb21pc2UociA9PiBzZXRUaW1lb3V0KHIsIDEwMCkpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBjb250ZXh0TWVudU1vZHVsZSA9IHdlYnBhY2suZmluZCgoXywgaWR4KSA9PiBpZHggPT0gbW9kdWxlSWQpLmV4cG9ydHM7XHJcblxyXG4gICAgICBjb25zdCBtb2R1bGVTdHJpbmcgPSB3ZWJwYWNrLnJlcXVpcmUubVttb2R1bGVJZF0udG9TdHJpbmcoKTtcclxuICAgICAgY29uc3QgcmF3TWF0Y2hlcyA9IG1vZHVsZVN0cmluZy5tYXRjaEFsbCgvaWZcXChcXHcrXFwudHlwZT09PSg/OlxcdytcXC4pPyhcXHcrKVxcKS4rP3R5cGU6XCIoLis/KVwiL2dzKTtcclxuXHJcbiAgICAgIG91dC5NZW51ID0gT2JqZWN0LnZhbHVlcyhjb250ZXh0TWVudU1vZHVsZSkuZmluZCh2ID0+IHYudG9TdHJpbmcoKS5pbmNsdWRlcyhcIi5pc1VzaW5nS2V5Ym9hcmROYXZpZ2F0aW9uXCIpKTtcclxuXHJcbiAgICAgIFsuLi5yYXdNYXRjaGVzXS5mb3JFYWNoKChbLCBmdW5jdGlvbk5hbWUsIHR5cGVdKSA9PiB7XHJcbiAgICAgICAgbGV0IG1vZHVsZUtleSA9IG1vZHVsZVN0cmluZy5tYXRjaChuZXcgUmVnRXhwKG5ldyBSZWdFeHAoYChcXFxcdyspOlxcXFwoXFxcXClcXFxcPVxcXFw+JHtmdW5jdGlvbk5hbWV9YCkpKT8uWzFdXHJcbiAgICAgICAgb3V0W2NvbXBvbmVudE1hcFt0eXBlXV0gPSBjb250ZXh0TWVudU1vZHVsZVttb2R1bGVLZXldO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlzUmVhZHkgPSBPYmplY3Qua2V5cyhvdXQpLmxlbmd0aCA+IDE7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgaXNSZWFkeSA9IGZhbHNlO1xyXG4gICAgICBsb2dnZXIuZXJyb3IoXCJGYWlsZWQgdG8gbG9hZCBjb250ZXh0IG1lbnUgY29tcG9uZW50c1wiLCBlcnIpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBvdXQ7XHJcbiAgfSkoKTtcclxuXHJcbiAgTWVudVBhdGNoZXIuaW5pdGlhbGl6ZSgpO1xyXG59KSgpO1xyXG5cclxuXHJcbmNsYXNzIE1lbnVQYXRjaGVyIHtcclxuICBzdGF0aWMgTUFYX1BBVENIX0lURVJBVElPTlMgPSAxNjtcclxuICBzdGF0aWMgcGF0Y2hlcyA9IG5ldyBNYXAoKTtcclxuICBzdGF0aWMgc3ViUGF0Y2hlcyA9IG5ldyBXZWFrTWFwKCk7XHJcblxyXG4gIHN0YXRpYyBpbml0aWFsaXplKCkge1xyXG4gICAgaWYgKCFpc1JlYWR5KSByZXR1cm4gbG9nZ2VyLndhcm4oXCJVbmFibGUgdG8gbG9hZCBjb250ZXh0IG1lbnUuXCIpO1xyXG5cclxuICAgIGNvbnN0IG1vZHVsZVRvUGF0Y2ggPSB3ZWJwYWNrLmZpbHRlcihtID0+IE9iamVjdC52YWx1ZXMobSkuc29tZSh2ID0+IHR5cGVvZiB2ID09PSBcImZ1bmN0aW9uXCIgJiYgdi50b1N0cmluZygpLmluY2x1ZGVzKFwiQ09OVEVYVF9NRU5VX0NMT1NFXCIpKSkuZmluZChtID0+IG0uZXhwb3J0cyAhPT0gd2luZG93KS5leHBvcnRzO1xyXG4gICAgY29uc3Qga2V5VG9QYXRjaCA9IE9iamVjdC5rZXlzKG1vZHVsZVRvUGF0Y2gpLmZpbmQoayA9PiBtb2R1bGVUb1BhdGNoW2tdPy5sZW5ndGggPT09IDMpO1xyXG5cclxuICAgIHBhdGNoZXIuYmVmb3JlKFxyXG4gICAgICBrZXlUb1BhdGNoLFxyXG4gICAgICBtb2R1bGVUb1BhdGNoLFxyXG4gICAgICBmdW5jdGlvbiAobWV0aG9kQXJncykge1xyXG4gICAgICAgIGNvbnN0IHByb21pc2UgPSBtZXRob2RBcmdzWzFdO1xyXG4gICAgICAgIG1ldGhvZEFyZ3NbMV0gPSBhc3luYyBmdW5jdGlvbiAoLi4uYXJncykge1xyXG4gICAgICAgICAgY29uc3QgcmVuZGVyID0gYXdhaXQgcHJvbWlzZS5jYWxsKHRoaXMsIC4uLmFyZ3MpO1xyXG5cclxuICAgICAgICAgIHJldHVybiAocHJvcHMpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcmVzID0gcmVuZGVyKHByb3BzKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChyZXM/LnByb3BzLm5hdklkKSB7XHJcbiAgICAgICAgICAgICAgTWVudVBhdGNoZXIuZXhlY3V0ZVBhdGNoZXMocmVzLnByb3BzLm5hdklkLCByZXMsIHByb3BzKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgcmVzPy50eXBlID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICAgICAgICBNZW51UGF0Y2hlci5wYXRjaFJlY3Vyc2l2ZShyZXMsIFwidHlwZVwiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlcztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBtZXRob2RBcmdzO1xyXG4gICAgICB9XHJcbiAgICApXHJcbiAgfVxyXG5cclxuICBzdGF0aWMgcGF0Y2hSZWN1cnNpdmUodGFyZ2V0LCBtZXRob2QsIGl0ZXJhdGlvbiA9IDApIHtcclxuICAgIGlmIChpdGVyYXRpb24gPj0gdGhpcy5NQVhfUEFUQ0hfSVRFUkFUSU9OUykgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IHByb3h5RnVuY3Rpb24gPSB0aGlzLnN1YlBhdGNoZXMuZ2V0KHRhcmdldFttZXRob2RdKSA/PyAoKCkgPT4ge1xyXG4gICAgICBjb25zdCBvcmlnaW5hbEZ1bmN0aW9uID0gdGFyZ2V0W21ldGhvZF07XHJcbiAgICAgIGNvbnN0IGRlcHRoID0gKytpdGVyYXRpb247XHJcbiAgICAgIGZ1bmN0aW9uIHBhdGNoKC4uLmFyZ3MpIHtcclxuICAgICAgICBjb25zdCByZXMgPSBvcmlnaW5hbEZ1bmN0aW9uLmNhbGwodGhpcywgLi4uYXJncyk7XHJcblxyXG4gICAgICAgIGlmICghcmVzKSByZXR1cm4gcmVzO1xyXG5cclxuICAgICAgICBjb25zdCBuYXZJZCA9IHJlcy5wcm9wcz8ubmF2SWQgPz8gcmVzLnByb3BzPy5jaGlsZHJlbj8ucHJvcHM/Lm5hdklkO1xyXG4gICAgICAgIGlmIChuYXZJZCkge1xyXG4gICAgICAgICAgTWVudVBhdGNoZXIuZXhlY3V0ZVBhdGNoZXMobmF2SWQsIHJlcywgYXJnc1swXSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnN0IGxheWVyID0gcmVzLnByb3BzLmNoaWxkcmVuID8gcmVzLnByb3BzLmNoaWxkcmVuIDogcmVzO1xyXG5cclxuICAgICAgICAgIGlmICh0eXBlb2YgbGF5ZXI/LnR5cGUgPT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgICAgIE1lbnVQYXRjaGVyLnBhdGNoUmVjdXJzaXZlKGxheWVyLCBcInR5cGVcIiwgZGVwdGgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJlcztcclxuICAgICAgfVxyXG5cclxuICAgICAgcGF0Y2guX19vcmlnaW5hbF9fID0gb3JpZ2luYWxGdW5jdGlvbjtcclxuICAgICAgT2JqZWN0LmFzc2lnbihwYXRjaCwgb3JpZ2luYWxGdW5jdGlvbik7XHJcbiAgICAgIHRoaXMuc3ViUGF0Y2hlcy5zZXQob3JpZ2luYWxGdW5jdGlvbiwgcGF0Y2gpO1xyXG5cclxuICAgICAgcmV0dXJuIHBhdGNoO1xyXG4gICAgfSkoKTtcclxuXHJcbiAgICB0YXJnZXRbbWV0aG9kXSA9IHByb3h5RnVuY3Rpb247XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZXhlY3V0ZVBhdGNoZXMoaWQsIHJlcywgcHJvcHMpIHtcclxuICAgIGlmICghdGhpcy5wYXRjaGVzLmhhcyhpZCkpIHJldHVybjtcclxuXHJcbiAgICB0aGlzLnBhdGNoZXMuZ2V0KGlkKS5mb3JFYWNoKHBhdGNoID0+IHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBwYXRjaChyZXMsIHByb3BzKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgbG9nZ2VyLmVycm9yKFwiRmFpbGVkIHRvIHBhdGNoIGNvbnRleHQgbWVudVwiLCBwYXRjaCwgZXJyKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcblxyXG5cclxuLy8gQ29waWVkIGZyb20gYmQncyBzb3VyY2VcclxuZnVuY3Rpb24gYnVpbGRJdGVtKHByb3BzKSB7XHJcbiAgY29uc3QgeyB0eXBlIH0gPSBwcm9wcztcclxuICBpZiAodHlwZSA9PT0gXCJzZXBhcmF0b3JcIikgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQ29tcG9uZW50cy5TZXBhcmF0b3IpO1xyXG5cclxuICBsZXQgY29tcG9uZW50ID0gQ29tcG9uZW50cy5JdGVtO1xyXG4gIGlmICh0eXBlID09PSBcInN1Ym1lbnVcIikge1xyXG4gICAgaWYgKCFwcm9wcy5jaGlsZHJlbikgcHJvcHMuY2hpbGRyZW4gPSBidWlsZE1lbnVDaGlsZHJlbihwcm9wcy5yZW5kZXIgfHwgcHJvcHMuaXRlbXMpO1xyXG4gIH0gZWxzZSBpZiAodHlwZSA9PT0gXCJ0b2dnbGVcIiB8fCB0eXBlID09PSBcInJhZGlvXCIpIHtcclxuICAgIGNvbXBvbmVudCA9IHR5cGUgPT09IFwidG9nZ2xlXCIgPyBDb21wb25lbnRzLkNoZWNrYm94SXRlbSA6IENvbXBvbmVudHMuUmFkaW9JdGVtO1xyXG4gICAgaWYgKHByb3BzLmFjdGl2ZSkgcHJvcHMuY2hlY2tlZCA9IHByb3BzLmFjdGl2ZTtcclxuICB9IGVsc2UgaWYgKHR5cGUgPT09IFwiY29udHJvbFwiKSB7XHJcbiAgICBjb21wb25lbnQgPSBDb21wb25lbnRzLkNvbnRyb2xJdGVtO1xyXG4gIH1cclxuICBpZiAoIXByb3BzLmlkKSBwcm9wcy5pZCA9IGAke3Byb3BzLmxhYmVsLnJlcGxhY2UoL15bXmEtel0rfFteXFx3LV0rL2dpLCBcIi1cIil9YDtcclxuICBpZiAocHJvcHMuZGFuZ2VyKSBwcm9wcy5jb2xvciA9IFwiZGFuZ2VyXCI7XHJcbiAgcHJvcHMuZXh0ZW5kZWQgPSB0cnVlO1xyXG5cclxuICBpZiAodHlwZSA9PT0gXCJ0b2dnbGVcIikge1xyXG4gICAgY29uc3QgW2FjdGl2ZSwgZG9Ub2dnbGVdID0gUmVhY3QudXNlU3RhdGUocHJvcHMuY2hlY2tlZCB8fCBmYWxzZSk7XHJcbiAgICBjb25zdCBvcmlnaW5hbEFjdGlvbiA9IHByb3BzLmFjdGlvbjtcclxuICAgIHByb3BzLmNoZWNrZWQgPSBhY3RpdmU7XHJcbiAgICBwcm9wcy5hY3Rpb24gPSBmdW5jdGlvbiAoZXYpIHtcclxuICAgICAgb3JpZ2luYWxBY3Rpb24oZXYpO1xyXG4gICAgICBkb1RvZ2dsZSghYWN0aXZlKTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChjb21wb25lbnQsIHByb3BzKTtcclxufVxyXG5cclxuLy8gQ29waWVkIGZyb20gYmQncyBzb3VyY2VcclxuZnVuY3Rpb24gYnVpbGRNZW51Q2hpbGRyZW4oc2V0dXApIHtcclxuICBjb25zdCBtYXBwZXIgPSBzID0+IHtcclxuICAgIGlmIChzLnR5cGUgPT09IFwiZ3JvdXBcIikgcmV0dXJuIGJ1aWxkR3JvdXAocyk7XHJcbiAgICByZXR1cm4gYnVpbGRJdGVtKHMpO1xyXG4gIH07XHJcbiAgY29uc3QgYnVpbGRHcm91cCA9IGZ1bmN0aW9uIChncm91cCkge1xyXG4gICAgY29uc3QgaXRlbXMgPSBncm91cC5pdGVtcy5tYXAobWFwcGVyKS5maWx0ZXIoaSA9PiBpKTtcclxuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KENvbXBvbmVudHMuR3JvdXAsIG51bGwsIGl0ZW1zKTtcclxuICB9O1xyXG4gIHJldHVybiBzZXR1cC5tYXAobWFwcGVyKS5maWx0ZXIoaSA9PiBpKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIF9fY2FjaGVfXzoge1xyXG4gICAgcGF0Y2hlczogTWVudVBhdGNoZXIucGF0Y2hlcyxcclxuICAgIHN1YlBhdGNoZXM6IE1lbnVQYXRjaGVyLnN1YlBhdGNoZXNcclxuICB9LFxyXG4gIHBhdGNoKG5hdklkLCBjYikge1xyXG4gICAgaWYgKCFNZW51UGF0Y2hlci5wYXRjaGVzLmhhcyhuYXZJZCkpIE1lbnVQYXRjaGVyLnBhdGNoZXMuc2V0KG5hdklkLCBuZXcgU2V0KCkpO1xyXG4gICAgTWVudVBhdGNoZXIucGF0Y2hlcy5nZXQobmF2SWQpLmFkZChjYik7XHJcblxyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgTWVudVBhdGNoZXIucGF0Y2hlcy5nZXQobmF2SWQpLmRlbGV0ZShjYik7XHJcbiAgICB9XHJcbiAgfSxcclxuICBvcGVuKGV2ZW50LCBjb21wb25lbnQsIGNvbmZpZykge1xyXG4gICAgcmV0dXJuIEFjdGlvbnMub3BlbihldmVudCwgKGUpID0+IFJlYWN0LmNyZWF0ZUVsZW1lbnQoY29tcG9uZW50LCBPYmplY3QuYXNzaWduKHt9LCBlLCB7IG9uQ2xvc2U6IEFjdGlvbnMuY2xvc2UgfSkpLCBjb25maWcpO1xyXG4gIH0sXHJcbiAgY2xvc2UoKSB7XHJcbiAgICByZXR1cm4gQWN0aW9ucy5jbG9zZSgpO1xyXG4gIH0sXHJcbiAgYnVpbGQ6IHtcclxuICAgIGl0ZW0oc2V0dXApIHtcclxuICAgICAgcmV0dXJuIGJ1aWxkTWVudUNoaWxkcmVuKFtzZXR1cF0pO1xyXG4gICAgfSxcclxuICAgIG1lbnUoc2V0dXApIHtcclxuICAgICAgcmV0dXJuIChwcm9wcykgPT4gUmVhY3QuY3JlYXRlRWxlbWVudChDb21wb25lbnRzLk1lbnUsIHByb3BzLCBidWlsZE1lbnVDaGlsZHJlbihzZXR1cCkpO1xyXG4gICAgfVxyXG4gIH1cclxufTsiLCAiaW1wb3J0IGNvbW1vbiBmcm9tIFwiLi4vLi4vYXBpL21vZHVsZXMvY29tbW9uXCI7XHJcbmltcG9ydCBsb2dnZXIgZnJvbSBcIi4uLy4uL2FwaS91dGlscy9sb2dnZXIuanNcIjtcclxuY29uc3QgeyBSZWFjdCB9ID0gY29tbW9uO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXJyb3JCb3VuZGFyeSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuICAgIHRoaXMuc3RhdGUgPSB7IGVycm9yOiBudWxsIH07XHJcbiAgfVxyXG5cclxuICBjb21wb25lbnREaWRDYXRjaChlcnJvcikge1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7IGVycm9yIH0pO1xyXG4gICAgbG9nZ2VyLmVycm9yKGVycm9yKTtcclxuICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5vbkVycm9yID09PSBcImZ1bmN0aW9uXCIpIHRoaXMucHJvcHMub25FcnJvcihlcnJvcik7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICBpZiAodGhpcy5zdGF0ZS5lcnJvcikgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiYWNvcmQtLXJlYWN0LWVycm9yXCI+XHJcbiAgICAgIDxwPlVuZXhwZWN0ZWQgUmVhY3QgRXJyb3IgSGFwcGVuZWQuPC9wPlxyXG4gICAgICA8cD57YCR7dGhpcy5zdGF0ZS5lcnJvcn1gfTwvcD5cclxuICAgIDwvZGl2PjtcclxuICAgIHJldHVybiB0aGlzLnByb3BzLmNoaWxkcmVuO1xyXG4gIH1cclxufVxyXG5cclxuY29uc3Qgb3JpZ2luYWxSZW5kZXIgPSBFcnJvckJvdW5kYXJ5LnByb3RvdHlwZS5yZW5kZXI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShFcnJvckJvdW5kYXJ5LnByb3RvdHlwZSwgXCJyZW5kZXJcIiwge1xyXG4gIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gIGNvbmZpZ3VyYWJsZTogZmFsc2UsXHJcbiAgc2V0OiBmdW5jdGlvbiAoKSB7IHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBzZXQgcmVuZGVyIG1ldGhvZCBvZiBFcnJvckJvdW5kYXJ5XCIpOyB9LFxyXG4gIGdldDogKCkgPT4gb3JpZ2luYWxSZW5kZXJcclxufSk7IiwgImltcG9ydCBFcnJvckJvdW5kYXJ5IGZyb20gXCIuLi8uLi9saWIvY29tcG9uZW50cy9FcnJvckJvdW5kYXJ5LmpzeFwiO1xyXG5pbXBvcnQgY29tbW9uIGZyb20gXCIuLi9tb2R1bGVzL2NvbW1vbi5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIEVycm9yQm91bmRhcnksXHJcbiAgQnV0dG9uOiBjb21tb24uY29tcG9uZW50cy5CdXR0b24sXHJcbiAgTWFya2Rvd246IGNvbW1vbi5jb21wb25lbnRzLk1hcmtkb3duLFxyXG4gIFRleHQ6IGNvbW1vbi5jb21wb25lbnRzLlRleHQsXHJcbiAgQ29uZmlybWF0aW9uTW9kYWw6IGNvbW1vbi5jb21wb25lbnRzLkNvbmZpcm1hdGlvbk1vZGFsLFxyXG4gIE1vZGFsUm9vdDogY29tbW9uLm1vZGFscy5jb21wb25lbnRzLlJvb3QsXHJcbiAgTW9kYWxDbG9zZUJ1dHRvbjogY29tbW9uLm1vZGFscy5jb21wb25lbnRzLm90aGVyLkNsb3NlQnV0dG9uLFxyXG4gIE1vZGFsSGVhZGVyOiBjb21tb24ubW9kYWxzLmNvbXBvbmVudHMub3RoZXIuSGVhZGVyLFxyXG4gIE1vZGFsQ29udGVudDogY29tbW9uLm1vZGFscy5jb21wb25lbnRzLm90aGVyLkNvbnRlbnQsXHJcbiAgTW9kYWxGb290ZXI6IGNvbW1vbi5tb2RhbHMuY29tcG9uZW50cy5vdGhlci5Gb290ZXIsXHJcbiAgTW9kYWxMaXN0Q29udGVudDogY29tbW9uLm1vZGFscy5jb21wb25lbnRzLm90aGVyLkxpc3RDb250ZW50LFxyXG4gIFRvb2x0aXA6IGNvbW1vbi5jb21wb25lbnRzLlRvb2x0aXAsXHJcbn0iLCAiaW1wb3J0IEVycm9yQm91bmRhcnkgZnJvbSBcIi4uLy4uL2xpYi9jb21wb25lbnRzL0Vycm9yQm91bmRhcnkuanN4XCI7XHJcbmltcG9ydCBjb21tb24gZnJvbSBcIi4uL21vZHVsZXMvY29tbW9uLmpzXCI7XHJcbmltcG9ydCBpMThuIGZyb20gXCIuLi9pMThuL2luZGV4LmpzXCJcclxuY29uc3QgeyBSZWFjdCwgRmx1eERpc3BhdGNoZXIsIGNvbXBvbmVudHMsIG1vZGFscywgVXNlclN0b3JlIH0gPSBjb21tb247XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgc2hvdzoge1xyXG4gICAgY29uZmlybWF0aW9uKHRpdGxlLCBjb250ZW50LCB7IGNvbmZpcm0gPSBudWxsLCBjYW5jZWwgPSBudWxsLCBkYW5nZXIgPSBmYWxzZSwga2V5ID0gdW5kZWZpbmVkLCB0aW1lb3V0ID0gNjAwMDAgKiA1IH0gPSB7fSkge1xyXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoY29udGVudCkpIGNvbnRlbnQgPSBbY29udGVudF07XHJcbiAgICAgICAgY29udGVudCA9IGNvbnRlbnQubWFwKGkgPT4gdHlwZW9mIGkgPT09IFwic3RyaW5nXCIgPyBSZWFjdC5jcmVhdGVFbGVtZW50KGNvbXBvbmVudHMuTWFya2Rvd24sIG51bGwsIGkpIDogaSk7XHJcbiAgICAgICAgY29uc3QgbW9kYWxLZXkgPSBtb2RhbHMuYWN0aW9ucy5vcGVuKChwcm9wcykgPT4ge1xyXG4gICAgICAgICAgbGV0IGludGVyYWN0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgIHJldHVybiA8RXJyb3JCb3VuZGFyeSBvbkVycm9yPXsoKSA9PiB7IHJlc29sdmUoZmFsc2UpOyB9fT5cclxuICAgICAgICAgICAgPGNvbXBvbmVudHMuQ29uZmlybWF0aW9uTW9kYWxcclxuICAgICAgICAgICAgICBoZWFkZXI9e3RpdGxlfVxyXG4gICAgICAgICAgICAgIGNvbmZpcm1CdXR0b25Db2xvcj17ZGFuZ2VyID8gY29tcG9uZW50cy5CdXR0b24uQ29sb3JzLlJFRCA6IGNvbXBvbmVudHMuQnV0dG9uLkNvbG9ycy5CUkFORH1cclxuICAgICAgICAgICAgICBjb25maXJtVGV4dD17Y29uZmlybSB8fCBpMThuLmZvcm1hdChcIkNPTkZJUk1cIil9XHJcbiAgICAgICAgICAgICAgY2FuY2VsVGV4dD17Y2FuY2VsfVxyXG4gICAgICAgICAgICAgIG9uQ2FuY2VsPXsoKSA9PiB7IHJlc29sdmUoZmFsc2UpOyBtb2RhbHMuYWN0aW9ucy5jbG9zZShtb2RhbEtleSk7IGludGVyYWN0ZWQgPSB0cnVlOyB9fVxyXG4gICAgICAgICAgICAgIG9uQ29uZmlybT17KCkgPT4geyByZXNvbHZlKHRydWUpOyBtb2RhbHMuYWN0aW9ucy5jbG9zZShtb2RhbEtleSk7IGludGVyYWN0ZWQgPSB0cnVlOyB9fVxyXG4gICAgICAgICAgICAgIHsuLi5wcm9wc31cclxuICAgICAgICAgICAgICBvbkNsb3NlPXsoKSA9PiB7IHByb3BzLm9uQ2xvc2UoKTsgcmVzb2x2ZShmYWxzZSk7IG1vZGFscy5hY3Rpb25zLmNsb3NlKG1vZGFsS2V5KTsgfX1cclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIDxFcnJvckJvdW5kYXJ5IG9uRXJyb3I9eygpID0+IHsgcmVzb2x2ZShmYWxzZSk7IH19PlxyXG4gICAgICAgICAgICAgICAge2NvbnRlbnR9XHJcbiAgICAgICAgICAgICAgPC9FcnJvckJvdW5kYXJ5PlxyXG4gICAgICAgICAgICA8L2NvbXBvbmVudHMuQ29uZmlybWF0aW9uTW9kYWw+XHJcbiAgICAgICAgICA8L0Vycm9yQm91bmRhcnk+XHJcbiAgICAgICAgfSwgeyBtb2RhbEtleToga2V5IH0pO1xyXG4gICAgICAgIGlmICh0aW1lb3V0KSB7XHJcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKCFpbnRlcmFjdGVkKSB7XHJcbiAgICAgICAgICAgICAgcmVzb2x2ZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgbW9kYWxzLmFjdGlvbnMuY2xvc2UobW9kYWxLZXkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LCB0aW1lb3V0KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIHVzZXIodXNlcklkKSB7XHJcbiAgICAgIGlmICghVXNlclN0b3JlLmdldFVzZXIodXNlcklkKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICBGbHV4RGlzcGF0Y2hlci5kaXNwYXRjaCh7IHR5cGU6IFwiVVNFUl9QUk9GSUxFX01PREFMX09QRU5cIiwgdXNlcklkIH0pO1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0sXHJcbiAgICBhbGVydCh0aXRsZSwgY29udGVudCwgeyBjb25maXJtID0gbnVsbCwga2V5ID0gdW5kZWZpbmVkLCB0aW1lb3V0ID0gNjAwMDAgKiA1IH0gPSB7fSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5jb25maXJtYXRpb24odGl0bGUsIGNvbnRlbnQsIHsgY29uZmlybSwgY2FuY2VsOiBudWxsLCBrZXksIHRpbWVvdXQgfSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBjbG9zZShrZXkpIHtcclxuICAgIHJldHVybiBtb2RhbHMuYWN0aW9ucy5jbG9zZShrZXkpO1xyXG4gIH1cclxufSIsICJpbXBvcnQgZG9tIGZyb20gXCIuLi9kb20vaW5kZXguanNcIjtcclxuXHJcbmZ1bmN0aW9uIGdldENvbnRhaW5lcigpIHtcclxuICBjb25zdCBhcHBFbG0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbY2xhc3MqPVwibm90QXBwQXNpZGVQYW5lbC1cIl0nKTtcclxuXHJcbiAgbGV0IHRvcENvbnRhaW5lciA9IGFwcEVsbS5xdWVyeVNlbGVjdG9yKFwiLmFjb3JkLS10b2FzdHMtY29udGFpbmVyXCIpO1xyXG4gIGlmICghdG9wQ29udGFpbmVyKSB7XHJcbiAgICB0b3BDb250YWluZXIgPSBkb20ucGFyc2UoYDxkaXYgY2xhc3M9XCJhY29yZC0tbGF5ZXItY29udGFpbmVyIGFjb3JkLS10b2FzdHMtY29udGFpbmVyXCI+PC9kaXY+YCk7XHJcbiAgICBhcHBFbG0uYXBwZW5kQ2hpbGQodG9wQ29udGFpbmVyKTtcclxuICB9XHJcbiAgdG9wQ29udGFpbmVyLnN0eWxlLnNldFByb3BlcnR5KFwiLS10b3Atb2Zmc2V0XCIsIGAke2FwcEVsbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AudG9GaXhlZCgxKX1weGApO1xyXG5cclxuICByZXR1cm4gdG9wQ29udGFpbmVyO1xyXG59XHJcblxyXG5jb25zdCBpY29ucyA9IHtcclxuICBpbmZvOiBgPHN2ZyB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCI+PHBhdGggZD1cIk0xMiAyMkM2LjQ3NyAyMiAyIDE3LjUyMyAyIDEyUzYuNDc3IDIgMTIgMnMxMCA0LjQ3NyAxMCAxMC00LjQ3NyAxMC0xMCAxMHptLTEtMTF2Nmgydi02aC0yem0wLTR2MmgyVjdoLTJ6XCIgZmlsbD1cImN1cnJlbnRDb2xvclwiIC8+PC9zdmc+YCxcclxuICB3YXJuaW5nOiBgPHN2ZyB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCI+PHBhdGggZD1cIk0xMiAyMkM2LjQ3NyAyMiAyIDE3LjUyMyAyIDEyUzYuNDc3IDIgMTIgMnMxMCA0LjQ3NyAxMCAxMC00LjQ3NyAxMC0xMCAxMHptLTEtN3YyaDJ2LTJoLTJ6bTAtOHY2aDJWN2gtMnpcIiBmaWxsPVwiY3VycmVudENvbG9yXCIgLz48L3N2Zz5gLFxyXG4gIGVycm9yOiBgPHN2ZyB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCI+PHBhdGggZD1cIk0xMiAyMkM2LjQ3NyAyMiAyIDE3LjUyMyAyIDEyUzYuNDc3IDIgMTIgMnMxMCA0LjQ3NyAxMCAxMC00LjQ3NyAxMC0xMCAxMHptLTEtN3YyaDJ2LTJoLTJ6bTAtOHY2aDJWN2gtMnpcImZpbGw9XCJjdXJyZW50Q29sb3JcIiAvPjwvc3ZnPmAsXHJcbiAgc3VjY2VzczogYDxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiPjxwYXRoIGQ9XCJNMTIgMjJDNi40NzcgMjIgMiAxNy41MjMgMiAxMlM2LjQ3NyAyIDEyIDJzMTAgNC40NzcgMTAgMTAtNC40NzcgMTAtMTAgMTB6bS0uOTk3LTZsNy4wNy03LjA3MS0xLjQxNC0xLjQxNC01LjY1NiA1LjY1Ny0yLjgyOS0yLjgyOS0xLjQxNCAxLjQxNEwxMS4wMDMgMTZ6XCIgZmlsbD1cImN1cnJlbnRDb2xvclwiIC8+PC9zdmc+YFxyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gc2hvdyhcclxuICBjb250ZW50LFxyXG4gIHtcclxuICAgIHN0eWxlID0gXCJkZWZhdWx0XCIsXHJcbiAgICB0aW1lb3V0ID0gMzUwMCxcclxuICAgIG9uQ2xpY2sgPSBudWxsLFxyXG4gICAgaGlkZUljb24gPSBmYWxzZVxyXG4gIH0gPSB7fVxyXG4pIHtcclxuICBjb25zdCBjb250YWluZXIgPSBnZXRDb250YWluZXIoKTtcclxuXHJcbiAgY29uc3QgdG9hc3RFbG0gPSBkb20ucGFyc2UoYFxyXG4gICAgPGRpdiBjbGFzcz1cImFjb3JkLS10b2FzdCBzdHlsZS0ke3N0eWxlfSBoaWRkZW5cIj5cclxuICAgICAgJHtoaWRlSWNvbiA/IFwiXCIgOiAoaWNvbnNbc3R5bGVdIHx8IFwiXCIpfVxyXG4gICAgICA8ZGl2IGNsYXNzPVwiY29udGVudFwiPjwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgYCk7XHJcblxyXG4gIHRvYXN0RWxtLnF1ZXJ5U2VsZWN0b3IoXCIuY29udGVudFwiKS5pbm5lckhUTUwgPSBjb250ZW50O1xyXG5cclxuICBsZXQgY2xvc2VkID0gZmFsc2U7XHJcbiAgZnVuY3Rpb24gY2xvc2UoKSB7XHJcbiAgICBpZiAoY2xvc2VkKSByZXR1cm47XHJcbiAgICBjbG9zZWQgPSB0cnVlO1xyXG5cclxuICAgIHRvYXN0RWxtLmNsYXNzTGlzdC5hZGQoXCJjbG9zaW5nXCIpO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHRvYXN0RWxtLnJlbW92ZSgpO1xyXG5cclxuICAgICAgdXRpbHMuaWZFeGlzdHMoXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmFjb3JkLS10b2FzdHMtY29udGFpbmVyYCksXHJcbiAgICAgICAgLyoqIEBwYXJhbSB7SFRNTERpdkVsZW1lbnR9IGVsbSAqLyhlbG0pID0+IHtcclxuICAgICAgICAgIGlmICghZWxtLmNoaWxkRWxlbWVudENvdW50KSBlbG0ucmVtb3ZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICApO1xyXG4gICAgfSwgMjc1KTtcclxuICB9XHJcblxyXG4gIGlmICh0eXBlb2Ygb25DbGljayA9PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgIHRvYXN0RWxtLmNsYXNzTGlzdC5hZGQoXCJjbGlja2FibGVcIik7XHJcbiAgICB0b2FzdEVsbS5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgICBvbkNsaWNrKGNsb3NlKTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQodG9hc3RFbG0pO1xyXG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XHJcbiAgICB0b2FzdEVsbS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xyXG4gIH0pO1xyXG5cclxuICBzZXRUaW1lb3V0KGNsb3NlLCB0aW1lb3V0KTtcclxuXHJcbiAgcmV0dXJuICgpID0+IHtcclxuICAgIGNsb3NlKCk7XHJcbiAgfTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIHNob3c6IE9iamVjdC5hc3NpZ24oc2hvdywge1xyXG4gICAgaW5mbzogKGh0bWwsIG9iaiA9IHt9KSA9PiBzaG93KGh0bWwsIHsgLi4ub2JqLCBzdHlsZTogXCJpbmZvXCIgfSksXHJcbiAgICBlcnJvcjogKGh0bWwsIG9iaiA9IHt9KSA9PiBzaG93KGh0bWwsIHsgLi4ub2JqLCBzdHlsZTogXCJlcnJvclwiIH0pLFxyXG4gICAgd2FybmluZzogKGh0bWwsIG9iaiA9IHt9KSA9PiBzaG93KGh0bWwsIHsgLi4ub2JqLCBzdHlsZTogXCJ3YXJuaW5nXCIgfSksXHJcbiAgICBzdWNjZXNzOiAoaHRtbCwgb2JqID0ge30pID0+IHNob3coaHRtbCwgeyAuLi5vYmosIHN0eWxlOiBcInN1Y2Nlc3NcIiB9KVxyXG4gIH0pXHJcbn0iLCAiaW1wb3J0IHdlYnBhY2sgZnJvbSBcIi4uLy4uLy4uLy4uLy4uL2FwaS9tb2R1bGVzL3dlYnBhY2suanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAvKiogQHBhcmFtIHtpbXBvcnQoXCJ2dWVcIikuQXBwfSB2dWVBcHAgKi9cclxuICBsb2FkKHZ1ZUFwcCkge1xyXG4gICAgY29uc3QgYnV0dG9uQ2xhc3NlcyA9IHdlYnBhY2suZmluZEJ5UHJvcGVydGllcyhcImxvd1NhdHVyYXRpb25VbmRlcmxpbmVcIiwgXCJidXR0b25cIiwgXCJkaXNhYmxlZEJ1dHRvbk92ZXJsYXlcIik7XHJcbiAgICB2dWVBcHAuY29tcG9uZW50KFwiZGlzY29yZC1idXR0b25cIiwge1xyXG4gICAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCIke2J1dHRvbkNsYXNzZXMuYnV0dG9ufSAke2J1dHRvbkNsYXNzZXMubG9va0ZpbGxlZH0gJHtidXR0b25DbGFzc2VzLmdyb3d9XCIgOmNsYXNzPVwiXFxgXFwke2NvbG9yID8gYnV0dG9uQ2xhc3Nlc1tcXGBjb2xvclxcJHtjb2xvclswXS50b1VwcGVyQ2FzZSgpfVxcJHtjb2xvci5zbGljZSgxKS50b0xvd2VyQ2FzZSgpfVxcYF0gOiBidXR0b25DbGFzc2VzLmNvbG9yQnJhbmR9IFxcJHtzaXplID8gYnV0dG9uQ2xhc3Nlc1tcXGBzaXplXFwke3NpemVbMF0udG9VcHBlckNhc2UoKX1cXCR7c2l6ZS5zbGljZSgxKS50b0xvd2VyQ2FzZSgpfVxcYF0gOiBidXR0b25DbGFzc2VzLnNpemVTbWFsbH1cXGBcIiBAY2xpY2s9XCJvbkNsaWNrXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiJHtidXR0b25DbGFzc2VzLmNvbnRlbnRzfVwiPnt7dmFsdWV9fTwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICBgLFxyXG4gICAgICBwcm9wczogW1widmFsdWVcIiwgXCJzaXplXCIsIFwiY29sb3JcIl0sXHJcbiAgICAgIGVtaXRzOiBbXCJjbGlja1wiXSxcclxuICAgICAgZGF0YSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgYnV0dG9uQ2xhc3Nlc1xyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgbWV0aG9kczoge1xyXG4gICAgICAgIG9uQ2xpY2soZSkge1xyXG4gICAgICAgICAgdGhpcy4kZW1pdChcImNsaWNrXCIsIGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59IiwgImV4cG9ydCBkZWZhdWx0IGBcbi5hY29yZC0tZGlzY29yZC1jaGVja3tjb2xvcjp2YXIoLS13aGl0ZS03MDApO2JhY2tncm91bmQtY29sb3I6Y3VycmVudENvbG9yO3otaW5kZXg6MH0uYWNvcmQtLWRpc2NvcmQtY2hlY2sgLnNsaWRlcnt0cmFuc2l0aW9uOjEwMG1zIGVhc2UtaW4tb3V0IGFsbDtsZWZ0Oi0zcHh9LmFjb3JkLS1kaXNjb3JkLWNoZWNrLmNoZWNrZWR7Y29sb3I6dmFyKC0tZ3JlZW4tNDAwKX0uYWNvcmQtLWRpc2NvcmQtY2hlY2suY2hlY2tlZCAuc2xpZGVye3RyYW5zaXRpb246MTAwbXMgZWFzZS1pbi1vdXQgYWxsO2xlZnQ6MTJweH1gO1xuIiwgImltcG9ydCB3ZWJwYWNrIGZyb20gXCIuLi8uLi8uLi8uLi9tb2R1bGVzL3dlYnBhY2suanNcIjtcclxuaW1wb3J0IHBhdGNoZXIgZnJvbSBcIi4uLy4uLy4uLy4uL3BhdGNoZXIvaW5kZXguanNcIjtcclxuaW1wb3J0IGNzc1RleHQgZnJvbSBcIi4vc3R5bGUuc2Nzc1wiO1xyXG5wYXRjaGVyLmluamVjdENTUyhjc3NUZXh0KTtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgLyoqIEBwYXJhbSB7aW1wb3J0KFwidnVlXCIpLkFwcH0gdnVlQXBwICovXHJcbiAgbG9hZCh2dWVBcHApIHtcclxuICAgIGNvbnN0IGNoZWNrQ2xhc3NlcyA9IHdlYnBhY2suZmluZEJ5UHJvcGVydGllcyhcImNoZWNrZWRcIiwgXCJjb250YWluZXJcIiwgXCJzbGlkZXJcIik7XHJcbiAgICB2dWVBcHAuY29tcG9uZW50KFwiZGlzY29yZC1jaGVja1wiLCB7XHJcbiAgICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cIiR7Y2hlY2tDbGFzc2VzLmNvbnRhaW5lcn0gZGVmYXVsdC1jb2xvcnMgYWNvcmQtLWRpc2NvcmQtY2hlY2tcIiBcclxuICAgICAgICAgIDpjbGFzcz1cInsnJHtjaGVja0NsYXNzZXMuY2hlY2tlZH0nOiBtb2RlbFZhbHVlLCAnY2hlY2tlZCc6IG1vZGVsVmFsdWV9XCIgXHJcbiAgICAgICAgICBAY2xpY2s9XCJvbkNsaWNrXCJcclxuICAgICAgICA+XHJcbiAgICAgICAgICA8c3ZnIGNsYXNzPVwiJHtjaGVja0NsYXNzZXMuc2xpZGVyfSBzbGlkZXJcIiB2aWV3Qm94PVwiMCAwIDI4IDIwXCIgcHJlc2VydmVBc3BlY3RSYXRpbz1cInhNaW5ZTWlkIG1lZXRcIj5cclxuICAgICAgICAgICAgPHJlY3QgZmlsbD1cIndoaXRlXCIgeD1cIjRcIiB5PVwiMFwiIHJ4PVwiMTBcIiB3aWR0aD1cIjIwXCIgaGVpZ2h0PVwiMjBcIj48L3JlY3Q+XHJcbiAgICAgICAgICAgIDxzdmcgdi1pZj1cIm1vZGVsVmFsdWVcIiB2aWV3Qm94PVwiMCAwIDIwIDIwXCIgZmlsbD1cIm5vbmVcIj5cclxuICAgICAgICAgICAgICA8cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk03Ljg5NTYxIDE0Ljg1MzhMNi4zMDQ2MiAxMy4yNjI5TDE0LjMwOTkgNS4yNTc1NUwxNS45MDA5IDYuODQ4NTRMNy44OTU2MSAxNC44NTM4WlwiPjwvcGF0aD5cclxuICAgICAgICAgICAgICA8cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk00LjA4NjQzIDExLjA5MDNMNS42Nzc0MiA5LjQ5OTI5TDkuNDQ4NSAxMy4yNzA0TDcuODU3NTEgMTQuODYxNEw0LjA4NjQzIDExLjA5MDNaXCI+PC9wYXRoPlxyXG4gICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgPHN2ZyB2LWVsc2Ugdmlld0JveD1cIjAgMCAyMCAyMFwiIGZpbGw9XCJub25lXCI+XHJcbiAgICAgICAgICAgICAgPHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNNS4xMzIzMSA2LjcyOTYzTDYuNzIzMyA1LjEzODY0TDE0Ljg1NSAxMy4yNzA0TDEzLjI2NCAxNC44NjE0TDUuMTMyMzEgNi43Mjk2M1pcIj48L3BhdGg+XHJcbiAgICAgICAgICAgICAgPHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNMTMuMjcwNCA1LjEzODY0TDE0Ljg2MTQgNi43Mjk2M0w2LjcyOTYzIDE0Ljg2MTRMNS4xMzg2NCAxMy4yNzA0TDEzLjI3MDQgNS4xMzg2NFpcIj48L3BhdGg+XHJcbiAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIGAsXHJcbiAgICAgIHByb3BzOiB7XHJcbiAgICAgICAgbW9kZWxWYWx1ZToge1xyXG4gICAgICAgICAgZGVmYXVsdCgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgZW1pdHM6IFsndXBkYXRlOm1vZGVsVmFsdWUnLCAnY2hhbmdlJ10sXHJcbiAgICAgIG1ldGhvZHM6IHtcclxuICAgICAgICBvbkNsaWNrKGV2ZW50KSB7XHJcbiAgICAgICAgICBsZXQgbmV3VmFsdWUgPSAhdGhpcy5tb2RlbFZhbHVlO1xyXG4gICAgICAgICAgdGhpcy4kZW1pdChcInVwZGF0ZTptb2RlbFZhbHVlXCIsIG5ld1ZhbHVlKTtcclxuICAgICAgICAgIHRoaXMuJGVtaXQoXCJjaGFuZ2VcIiwgeyB2YWx1ZTogbmV3VmFsdWUsIGV2ZW50IH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59IiwgImltcG9ydCB3ZWJwYWNrIGZyb20gXCIuLi8uLi8uLi8uLi8uLi9hcGkvbW9kdWxlcy93ZWJwYWNrLmpzXCI7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIC8qKiBAcGFyYW0ge2ltcG9ydChcInZ1ZVwiKS5BcHB9IHZ1ZUFwcCAqL1xyXG4gIGxvYWQodnVlQXBwKSB7XHJcbiAgICBsZXQgaW5wdXRDbGFzc2VzID0gd2VicGFjay5maW5kQnlQcm9wZXJ0aWVzKFwiaW5wdXREZWZhdWx0XCIsIFwiY29weUlucHV0XCIpO1xyXG4gICAgbGV0IGlucHV0Q2xhc3NlczIgPSB3ZWJwYWNrLmZpbmRCeVByb3BlcnRpZXMoXCJpbnB1dFwiLCBcImVkaXRhYmxlXCIsIFwiZGlzYWJsZWRcIiwgXCJpbnB1dFdyYXBwZXJcIik7XHJcbiAgICB2dWVBcHAuY29tcG9uZW50KFwiZGlzY29yZC1pbnB1dFwiLCB7XHJcbiAgICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cIiR7aW5wdXRDbGFzc2VzMj8uaW5wdXR9XCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiJHtpbnB1dENsYXNzZXM/LmlucHV0V3JhcHBlcn1cIj5cclxuICAgICAgICAgICAgPGlucHV0IDp0eXBlPVwidHlwZSA/PyAndGV4dCdcIiBjbGFzcz1cIiR7aW5wdXRDbGFzc2VzPy5pbnB1dERlZmF1bHR9XCIgOnZhbHVlPVwibW9kZWxWYWx1ZVwiIDpwbGFjZWhvbGRlcj1cInBsYWNlaG9sZGVyXCIgOm1heGxlbmd0aD1cIm1heGxlbmd0aFwiIDptaW49XCJtaW5cIiA6c3RlcD1cInN0ZXBcIiA6bWF4PVwibWF4XCIgOnN0eWxlPVwic3R5bGVcIiBAaW5wdXQ9XCJvbklucHV0XCIgLz5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICBgLFxyXG4gICAgICBwcm9wczogW1wibW9kZWxWYWx1ZVwiLCBcInBsYWNlaG9sZGVyXCIsIFwidHlwZVwiLCBcIm1heGxlbmd0aFwiLCBcIm1heFwiLCBcIm1pblwiLCBcInN0ZXBcIiwgXCJzdHlsZVwiXSxcclxuICAgICAgZW1pdHM6IFtcImlucHV0XCIsICd1cGRhdGU6bW9kZWxWYWx1ZSddLFxyXG4gICAgICBtZXRob2RzOiB7XHJcbiAgICAgICAgb25JbnB1dChldmVudCkge1xyXG4gICAgICAgICAgdGhpcy4kZW1pdChcInVwZGF0ZTptb2RlbFZhbHVlXCIsIGV2ZW50LnRhcmdldC52YWx1ZSk7XHJcbiAgICAgICAgICB0aGlzLiRlbWl0KFwiaW5wdXRcIiwgeyBldmVudCwgdmFsdWU6IGV2ZW50LnRhcmdldC52YWx1ZSB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufSIsICJleHBvcnQgZGVmYXVsdCBgXG4uYWNvcmQtLWRpc2NvcmQtc2VsZWN0e3Bvc2l0aW9uOnJlbGF0aXZlO3dpZHRoOjEwMCV9LmFjb3JkLS1kaXNjb3JkLXNlbGVjdD4ub3B0aW9uc3twb3NpdGlvbjphYnNvbHV0ZTt0b3A6MTAwJTt3aWR0aDoxMDAlO21heC1oZWlnaHQ6Mjg2cHg7b3ZlcmZsb3cteDpoaWRkZW47b3ZlcmZsb3cteTpzY3JvbGw7ei1pbmRleDoxfS5hY29yZC0tZGlzY29yZC1zZWxlY3Q+Lm9wdGlvbnMudG9wLXBvcG91dHt0b3A6YXV0bztib3R0b206MTAwJX1gO1xuIiwgImltcG9ydCB3ZWJwYWNrIGZyb20gXCIuLi8uLi8uLi8uLi9tb2R1bGVzL3dlYnBhY2suanNcIjtcclxuaW1wb3J0IHBhdGNoZXIgZnJvbSBcIi4uLy4uLy4uLy4uL3BhdGNoZXIvaW5kZXguanNcIjtcclxuXHJcbmltcG9ydCBjc3NUZXh0IGZyb20gXCIuL3N0eWxlLnNjc3NcIjtcclxucGF0Y2hlci5pbmplY3RDU1MoY3NzVGV4dCk7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIC8qKiBAcGFyYW0ge2ltcG9ydChcInZ1ZVwiKS5BcHB9IHZ1ZUFwcCAqL1xyXG4gIGxvYWQodnVlQXBwKSB7XHJcbiAgICBjb25zdCBzZWxlY3RDbGFzc2VzID0gd2VicGFjay5maW5kQnlQcm9wZXJ0aWVzKFwic2VsZWN0XCIsIFwic2VhcmNoYWJsZVNlbGVjdFwiLCBcIm11bHRpU2VsZWN0Q2hlY2tcIik7XHJcbiAgICBjb25zdCBzY3JvbGxDbGFzc2VzID0gd2VicGFjay5maW5kQnlQcm9wZXJ0aWVzKFwibWFuYWdlZFJlYWN0aXZlU2Nyb2xsZXJcIiwgXCJzY3JvbGxlckJhc2VcIiwgXCJ0aGluXCIpO1xyXG4gICAgdnVlQXBwLmNvbXBvbmVudChcImRpc2NvcmQtc2VsZWN0XCIsIHtcclxuICAgICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8ZGl2IGNsYXNzPVwiJHtzZWxlY3RDbGFzc2VzLnNlbGVjdH0gJHtzZWxlY3RDbGFzc2VzLmxvb2tGaWxsZWR9IGFjb3JkLS1kaXNjb3JkLXNlbGVjdFwiIDpjbGFzcz1cInsnJHtzZWxlY3RDbGFzc2VzLm9wZW59JzogYWN0aXZlfVwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cIiR7c2VsZWN0Q2xhc3Nlcy52YWx1ZX1cIj57e29wdGlvbnMuZmluZChpPT5pLnZhbHVlID09PSBtb2RlbFZhbHVlKT8ubGFiZWx9fTwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cIiR7c2VsZWN0Q2xhc3Nlcy5pY29uc31cIj5cclxuICAgICAgICAgICAgICA8c3ZnIHYtaWY9XCIhYWN0aXZlXCIgY2xhc3M9XCJpY29uXCIgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiPjxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTE2LjU5IDguNTkwMDNMMTIgMTMuMTdMNy40MSA4LjU5MDAzTDYgMTBMMTIgMTZMMTggMTBMMTYuNTkgOC41OTAwM1pcIj48L3BhdGg+PC9zdmc+XHJcbiAgICAgICAgICAgICAgPHN2ZyB2LWVsc2UgY2xhc3M9XCJpY29uXCIgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiPjxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTcuNDEgMTYuMDAwMUwxMiAxMS40MjAxTDE2LjU5IDE2LjAwMDFMMTggMTQuNTkwMUwxMiA4LjU5MDA2TDYgMTQuNTkwMUw3LjQxIDE2LjAwMDFaXCI+PC9wYXRoPjwvc3ZnPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IHYtaWY9XCJhY3RpdmVcIiBjbGFzcz1cIm9wdGlvbnMgJHtzZWxlY3RDbGFzc2VzLnBvcG91dH0gJHtzY3JvbGxDbGFzc2VzLnNjcm9sbGVyQmFzZX0gJHtzY3JvbGxDbGFzc2VzLnRoaW59XCIgOmNsYXNzPVwieyd0b3AtcG9wb3V0JzogcG9wb3V0UG9zaXRpb24gPT09ICd0b3AnfVwiPlxyXG4gICAgICAgICAgICA8ZGl2IHYtZm9yPVwib3B0aW9uIGluIG9wdGlvbnNcIiBjbGFzcz1cIm9wdGlvbiAke3NlbGVjdENsYXNzZXMub3B0aW9ufVwiIEBjbGljaz1cIm9uT3B0aW9uQ2xpY2soJGV2ZW50LCBvcHRpb24pXCIgOmtleT1cIm9wdGlvbi52YWx1ZVwiIDphcmlhLXNlbGVjdGVkPVwiXFxgXFwke21vZGVsVmFsdWUgPT09IG9wdGlvbi52YWx1ZX1cXGBcIj5cclxuICAgICAgICAgICAgICB7e29wdGlvbi5sYWJlbH19XHJcbiAgICAgICAgICAgICAgPHN2ZyB2LWlmPVwibW9kZWxWYWx1ZSA9PT0gb3B0aW9uLnZhbHVlXCIgY2xhc3M9XCIke3NlbGVjdENsYXNzZXMuc2VsZWN0ZWRJY29ufVwiIHJvbGU9XCJpbWdcIiB3aWR0aD1cIjIwXCIgaGVpZ2h0PVwiMjBcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPjxjaXJjbGUgcj1cIjhcIiBjeD1cIjEyXCIgY3k9XCIxMlwiIGZpbGw9XCJ3aGl0ZVwiPjwvY2lyY2xlPjxnIGZpbGw9XCJub25lXCIgZmlsbC1ydWxlPVwiZXZlbm9kZFwiPjxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bS0yIDE1bC01LTUgMS40MS0xLjQxTDEwIDE0LjE3bDcuNTktNy41OUwxOSA4bC05IDl6XCI+PC9wYXRoPjwvZz48L3N2Zz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgYCxcclxuICAgICAgZGF0YSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgc2VsZWN0Q2xhc3NlcyxcclxuICAgICAgICAgIGFjdGl2ZTogZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIHByb3BzOiBbXCJvcHRpb25zXCIsIFwibW9kZWxWYWx1ZVwiLCBcInBvcG91dFBvc2l0aW9uXCJdLFxyXG4gICAgICBlbWl0czogWyd1cGRhdGU6bW9kZWxWYWx1ZScsIFwiY2hhbmdlXCJdLFxyXG4gICAgICBtb3VudGVkKCkge1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5vbkNsaWNrKTtcclxuICAgICAgfSxcclxuICAgICAgdW5tb3VudGVkKCkge1xyXG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5vbkNsaWNrKTtcclxuICAgICAgfSxcclxuICAgICAgbWV0aG9kczoge1xyXG4gICAgICAgIG9uT3B0aW9uQ2xpY2soZXZlbnQsIG9wdGlvbikge1xyXG4gICAgICAgICAgdGhpcy4kZW1pdChcInVwZGF0ZTptb2RlbFZhbHVlXCIsIG9wdGlvbi52YWx1ZSk7XHJcbiAgICAgICAgICB0aGlzLiRlbWl0KFwiY2hhbmdlXCIsIHsgdmFsdWU6IG9wdGlvbi52YWx1ZSwgZXZlbnQgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvbkNsaWNrKGUpIHtcclxuICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKHNlbGVjdENsYXNzZXMuc2VsZWN0KVxyXG4gICAgICAgICAgICB8fCBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoc2VsZWN0Q2xhc3Nlcy52YWx1ZSlcclxuICAgICAgICAgICAgfHwgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKHNlbGVjdENsYXNzZXMuaWNvbnMpXHJcbiAgICAgICAgICAgIHx8IGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhzZWxlY3RDbGFzc2VzLnBvcG91dClcclxuICAgICAgICAgICAgfHwgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKHNlbGVjdENsYXNzZXMub3B0aW9uKVxyXG4gICAgICAgICAgICB8fCBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJpY29uXCIpXHJcbiAgICAgICAgICApIHtcclxuICAgICAgICAgICAgdGhpcy5hY3RpdmUgPSAhdGhpcy5hY3RpdmU7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn0iLCAiZXhwb3J0IGRlZmF1bHQgYFxuLmFjb3JkLS1kaXNjb3JkLXRleHRhcmVhe3dpZHRoOjEwMCV9YDtcbiIsICJpbXBvcnQgd2VicGFjayBmcm9tIFwiLi4vLi4vLi4vLi4vbW9kdWxlcy93ZWJwYWNrLmpzXCI7XHJcbmltcG9ydCBwYXRjaGVyIGZyb20gXCIuLi8uLi8uLi8uLi9wYXRjaGVyL2luZGV4LmpzXCI7XHJcblxyXG5pbXBvcnQgY3NzVGV4dCBmcm9tIFwiLi9zdHlsZS5zY3NzXCI7XHJcbnBhdGNoZXIuaW5qZWN0Q1NTKGNzc1RleHQpO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAvKiogQHBhcmFtIHtpbXBvcnQoXCJ2dWVcIikuQXBwfSB2dWVBcHAgKi9cclxuICBsb2FkKHZ1ZUFwcCkge1xyXG4gICAgbGV0IGlucHV0Q2xhc3NlcyA9IHdlYnBhY2suZmluZEJ5UHJvcGVydGllcyhcInRleHRBcmVhXCIsIFwibWF4TGVuZ3RoXCIsIFwiY2hhcmFjdGVyQ291bnRcIik7XHJcbiAgICBsZXQgaW5wdXRDbGFzc2VzMiA9IHdlYnBhY2suZmluZEJ5UHJvcGVydGllcyhcImlucHV0V3JhcHBlclwiLCBcImlucHV0RGVmYXVsdFwiKTtcclxuICAgIGxldCBzY3JvbGxDbGFzc2VzID0gd2VicGFjay5maW5kQnlQcm9wZXJ0aWVzKFwic2Nyb2xsYmFyRGVmYXVsdFwiLCBcInNjcm9sbGJhclwiLCBcInNjcm9sbGJhckdob3N0XCIpO1xyXG4gICAgdnVlQXBwLmNvbXBvbmVudChcImRpc2NvcmQtdGV4dGFyZWFcIiwge1xyXG4gICAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCIke2lucHV0Q2xhc3NlczIuaW5wdXRXcmFwcGVyfSBhY29yZC0tZGlzY29yZC10ZXh0YXJlYVwiPlxyXG4gICAgICAgICAgPHRleHRhcmVhIGNsYXNzPVwiJHtpbnB1dENsYXNzZXMyLmlucHV0RGVmYXVsdH0gJHtpbnB1dENsYXNzZXMudGV4dEFyZWF9ICR7c2Nyb2xsQ2xhc3Nlcy5zY3JvbGxiYXJEZWZhdWx0fVwiIDp2YWx1ZT1cIm1vZGVsVmFsdWVcIiA6cGxhY2Vob2xkZXI9XCJwbGFjZWhvbGRlclwiIDptYXhsZW5ndGg9XCJtYXhsZW5ndGhcIiA6Y29scz1cImNvbHNcIiA6cm93cz1cInJvd3NcIiA6c3R5bGU9XCJzdHlsZVwiIEBpbnB1dD1cIm9uSW5wdXRcIj48L3RleHRhcmVhPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICBgLFxyXG4gICAgICBwcm9wczogW1wibW9kZWxWYWx1ZVwiLCBcInBsYWNlaG9sZGVyXCIsIFwibWF4bGVuZ3RoXCIsIFwic3R5bGVcIiwgXCJjb2xzXCIsIFwicm93c1wiXSxcclxuICAgICAgZW1pdHM6IFtcImlucHV0XCIsICd1cGRhdGU6bW9kZWxWYWx1ZSddLFxyXG4gICAgICBtZXRob2RzOiB7XHJcbiAgICAgICAgb25JbnB1dChldmVudCkge1xyXG4gICAgICAgICAgdGhpcy4kZW1pdChcInVwZGF0ZTptb2RlbFZhbHVlXCIsIGV2ZW50LnRhcmdldC52YWx1ZSk7XHJcbiAgICAgICAgICB0aGlzLiRlbWl0KFwiaW5wdXRcIiwgeyBldmVudCwgdmFsdWU6IGV2ZW50LnRhcmdldC52YWx1ZSB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iLCAiaW1wb3J0IGRpc2NvcmRCdXR0b24gZnJvbSBcIi4vZGlzY29yZC1idXR0b24vaW5kZXguanNcIjtcclxuaW1wb3J0IGRpc2NvcmRDaGVjayBmcm9tIFwiLi9kaXNjb3JkLWNoZWNrL2luZGV4LmpzXCI7XHJcbmltcG9ydCBkaXNjb3JkSW5wdXQgZnJvbSBcIi4vZGlzY29yZC1pbnB1dC9pbmRleC5qc1wiO1xyXG5pbXBvcnQgZGlzY29yZFNlbGVjdCBmcm9tIFwiLi9kaXNjb3JkLXNlbGVjdC9pbmRleC5qc1wiO1xyXG5pbXBvcnQgZGlzY29yZFRleHRhcmVhIGZyb20gXCIuL2Rpc2NvcmQtdGV4dGFyZWEvaW5kZXguanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBsb2FkKHZ1ZUFwcCkge1xyXG4gICAgZGlzY29yZENoZWNrLmxvYWQodnVlQXBwKTtcclxuICAgIGRpc2NvcmRUZXh0YXJlYS5sb2FkKHZ1ZUFwcCk7XHJcbiAgICBkaXNjb3JkU2VsZWN0LmxvYWQodnVlQXBwKTtcclxuICAgIGRpc2NvcmRJbnB1dC5sb2FkKHZ1ZUFwcCk7XHJcbiAgICBkaXNjb3JkQnV0dG9uLmxvYWQodnVlQXBwKTtcclxuICB9XHJcbn0iLCAiLy8gaHR0cHM6Ly9sb2dhcmV0bS5jb20vYmxvZy9mb3JjaW5nLXJlY29tcHV0YXRpb24tb2YtY29tcHV0ZWQtcHJvcGVydGllcy9cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZWNvbXB1dGUodm0sIHByb3BOYW1lKSB7XHJcbiAgLy8gaGFuZGxlIG5vbi1leGlzdGVudCBwcm9wcy5cclxuICBpZiAoIXZtLiRfX3JlY29tcHV0YWJsZXMgfHwgIXZtLiRfX3JlY29tcHV0YWJsZXNbcHJvcE5hbWVdKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICB2bS4kX19yZWNvbXB1dGFibGVzW3Byb3BOYW1lXS5iYWNrZG9vcisrO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmVjb21wdXRhYmxlKGZuLCBuYW1lKSB7XHJcbiAgY29uc3QgcmVhY3RpdmUgPSBWdWUuY29tcHV0ZWQoe1xyXG4gICAgYmFja2Rvb3I6IDBcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuICAgIC8vIGluaXRpYWxpemUgYSBtYXAgb25jZS5cclxuICAgIGlmICghdGhpcy4kX19yZWNvbXB1dGFibGVzKSB7XHJcbiAgICAgIHRoaXMuJF9fcmVjb21wdXRhYmxlcyA9IHt9O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGFkZCBhIHJlZmVyZW5jZSB0byBteSByZWFjdGl2ZSBiYWNrZG9vciB0cmlnZ2VyLlxyXG4gICAgaWYgKCF0aGlzLiRfX3JlY29tcHV0YWJsZXNbZm4ubmFtZSB8fCBuYW1lXSkge1xyXG4gICAgICB0aGlzLiRfX3JlY29tcHV0YWJsZXNbZm4ubmFtZSB8fCBuYW1lXSA9IHJlYWN0aXZlO1xyXG4gICAgfVxyXG5cclxuICAgIHJlYWN0aXZlLmJhY2tkb29yOyAvLyByZWZlcmVuY2UgaXQhXHJcblxyXG4gICAgcmV0dXJuIGZuLmNhbGwodGhpcyk7XHJcbiAgfTtcclxufSIsICJpbXBvcnQgdnVlQ29tcG9uZW50cyBmcm9tIFwiLi9jb21wb25lbnRzL2luZGV4LmpzXCI7XHJcbmltcG9ydCB7IHJlY29tcHV0YWJsZSwgcmVjb21wdXRlIH0gZnJvbSBcIi4vdXRpbHMvcmVjb21wdXRlLmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgY29tcG9uZW50czoge1xyXG4gICAgbG9hZCh2dWVBcHApIHtcclxuICAgICAgdnVlQ29tcG9uZW50cy5sb2FkKHZ1ZUFwcCk7XHJcbiAgICB9XHJcbiAgfSxcclxuICByZWFkeToge1xyXG4gICAgYXN5bmMgd2hlbigpIHtcclxuICAgICAgd2hpbGUgKCF3aW5kb3cuVnVlKSB7XHJcbiAgICAgICAgYXdhaXQgbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIDEwMCkpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSxcclxuICAgIGdldCBpcygpIHtcclxuICAgICAgcmV0dXJuICEhd2luZG93LlZ1ZTtcclxuICAgIH1cclxuICB9LFxyXG4gIGdldCBWdWUoKSB7XHJcbiAgICByZXR1cm4gd2luZG93LlZ1ZTtcclxuICB9LFxyXG4gIHV0aWxzOiB7XHJcbiAgICBjb21wdXRlZDoge1xyXG4gICAgICByZWNvbXB1dGUsXHJcbiAgICAgIHJlY29tcHV0YWJsZVxyXG4gICAgfVxyXG4gIH1cclxufSIsICJpbXBvcnQgcGF0Y2hlciBmcm9tIFwiLi4vcGF0Y2hlci9pbmRleC5qc1wiO1xyXG5pbXBvcnQgc3R5bGVDU1NUZXh0IGZyb20gXCIuL3N0eWxlcy5zY3NzXCI7XHJcbnBhdGNoZXIuaW5qZWN0Q1NTKHN0eWxlQ1NTVGV4dCk7XHJcblxyXG5pbXBvcnQgdG9vbHRpcHMgZnJvbSBcIi4vdG9vbHRpcHMuanNcIjtcclxuaW1wb3J0IG5vdGlmaWNhdGlvbnMgZnJvbSBcIi4vbm90aWZpY2F0aW9ucy5qc1wiO1xyXG5pbXBvcnQgY29udGV4dE1lbnVzIGZyb20gXCIuL2NvbnRleHRNZW51cy5qc1wiO1xyXG5pbXBvcnQgY29tcG9uZW50cyBmcm9tIFwiLi9jb21wb25lbnRzLmpzXCI7XHJcbmltcG9ydCBtb2RhbHMgZnJvbSBcIi4vbW9kYWxzLmpzeFwiO1xyXG5pbXBvcnQgdG9hc3RzIGZyb20gXCIuL3RvYXN0cy5qc1wiO1xyXG5pbXBvcnQgdnVlIGZyb20gXCIuL3Z1ZS9pbmRleC5qc1wiO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICB0b29sdGlwcyxcclxuICBub3RpZmljYXRpb25zLFxyXG4gIGNvbnRleHRNZW51cyxcclxuICBjb21wb25lbnRzLFxyXG4gIG1vZGFscyxcclxuICB0b2FzdHMsXHJcbiAgdnVlXHJcbn0iLCAiY29uc3Qgc2hhcmVkID0ge307XHJcbmV4cG9ydCBkZWZhdWx0IHNoYXJlZDsiLCAiaW1wb3J0IGV4dGVuc2lvbnMgZnJvbSBcIi4uL2V4dGVuc2lvbnMvaW5kZXguanNcIjtcclxuaW1wb3J0IGxvZ2dlciBmcm9tIFwiLi4vdXRpbHMvbG9nZ2VyLmpzXCI7XHJcbmltcG9ydCBpMThuIGZyb20gXCIuLi9pMThuL2luZGV4LmpzXCI7XHJcbmltcG9ydCB3ZWJzb2NrZXQgZnJvbSBcIi4uL3dlYnNvY2tldC9pbmRleC5qc1wiO1xyXG5cclxubGV0IGRldk1vZGVFbmFibGVkID0gZmFsc2U7XHJcblxyXG5sZXQgaXNMb2FkaW5nID0gZmFsc2U7XHJcblxyXG5sZXQgbG9hZGVkO1xyXG5sZXQgaW5zdGFsbGVkO1xyXG5cclxuY29uc3QgZXh0ZW5zaW9uID0ge1xyXG4gIGdldCBsb2FkZWQoKSB7IHJldHVybiBsb2FkZWQ7IH0sXHJcbiAgZ2V0IGluc3RhbGxlZCgpIHsgcmV0dXJuIGluc3RhbGxlZDsgfSxcclxuICB1bmxvYWQoKSB7XHJcbiAgICBpZiAoIWxvYWRlZCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgZXh0ZW5zaW9ucy5sb2FkZXIudW5sb2FkKFwiRGV2ZWxvcG1lbnRcIik7XHJcbiAgICBsb2FkZWQgPSBudWxsO1xyXG4gICAgaW5zdGFsbGVkID0gbnVsbDtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH0sXHJcbiAgYXN5bmMgbG9hZChzb3VyY2UsIG1hbmlmZXN0KSB7XHJcbiAgICBpZiAoIXNvdXJjZSB8fCAhbWFuaWZlc3QpIHRocm93IG5ldyBFcnJvcihgU291cmNlIGFuZCBtYW5pZmVzdCBhcmUgcmVxdWlyZWQgdG8gbG9hZCBhbiBleHRlbnNpb24hYCk7XHJcbiAgICBpZiAobG9hZGVkKSB0aHJvdyBuZXcgRXJyb3IoYEV4dGVuc2lvbiBpcyBhbHJlYWR5IGxvYWRlZCFgKTtcclxuICAgIGlmIChpc0xvYWRpbmcpIHJldHVybiBmYWxzZTtcclxuICAgIGlzTG9hZGluZyA9IHRydWU7XHJcbiAgICB0cnkge1xyXG4gICAgICBsb2FkZWQgPSBhd2FpdCBleHRlbnNpb25zLmxvYWRlci5sb2FkKFwiRGV2ZWxvcG1lbnRcIiwgeyBzb3VyY2UsIG1hbmlmZXN0IH0pO1xyXG4gICAgICBpbnN0YWxsZWQgPSB7XHJcbiAgICAgICAgbWFuaWZlc3RcclxuICAgICAgfTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBsb2dnZXIuZXJyb3IoYFVuYWJsZSB0byBsb2FkIGRldmVsb3BtZW50IGV4dGVuc2lvbi5gLCBpMThuLmxvY2FsaXplKG1hbmlmZXN0LmFib3V0Lm5hbWUpLCBlcnIpO1xyXG4gICAgICBpc0xvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaXNMb2FkaW5nID0gZmFsc2U7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IG91dCA9IHtcclxuICBnZXQgZW5hYmxlZCgpIHtcclxuICAgIHJldHVybiBkZXZNb2RlRW5hYmxlZDtcclxuICB9LFxyXG4gIHNldCBlbmFibGVkKHZhbHVlKSB7XHJcbiAgICBpZiAoIWdsb2JhbFRoaXNbXCI8UFJFTE9BRF9LRVk+XCJdLmlzRGV2VG9vbHNPcGVuKCkpIHRocm93IG5ldyBFcnJvcihcIkRldiBtb2RlIHN0YXR1cyBjYW4gb25seSBiZSBtb2RpZmllZCB3aGVuIERldlRvb2xzIGlzIG9wZW4hXCIpO1xyXG4gICAgZGV2TW9kZUVuYWJsZWQgPSB2YWx1ZTtcclxuICB9LFxyXG4gIGdldCBleHRlbnNpb24oKSB7XHJcbiAgICBpZiAoIWRldk1vZGVFbmFibGVkKSB0aHJvdyBuZXcgRXJyb3IoXCJEZXYgbW9kZSBpcyBub3QgZW5hYmxlZCFcIik7XHJcbiAgICByZXR1cm4gZXh0ZW5zaW9uO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgb3V0O1xyXG5cclxubGV0IGlzUHJvY2Vzc2luZyA9IGZhbHNlO1xyXG53ZWJzb2NrZXQuc2V0KFxyXG4gIFwiVXBkYXRlRGV2ZWxvcG1lbnRFeHRlbnNpb25cIixcclxuICBhc3luYyAoeyBzb3VyY2UsIG1hbmlmZXN0IH0gPSB7fSkgPT4ge1xyXG4gICAgaWYgKCFkZXZNb2RlRW5hYmxlZClcclxuICAgICAgcmV0dXJuIGxvZ2dlci53YXJuKGBEZXZlbG9wbWVudCBleHRlbnNpb24gd2FzIHNlbnQgYmVmb3JlIGRldiBtb2RlIHdhcyBlbmFibGVkLmApO1xyXG5cclxuICAgIGlmICghc291cmNlIHx8ICFtYW5pZmVzdClcclxuICAgICAgcmV0dXJuIGxvZ2dlci53YXJuKGBEZXZlbG9wbWVudCBleHRlbnNpb24gd2FzIHNlbnQgd2l0aG91dCBzb3VyY2Ugb3IgbWFuaWZlc3QuYCk7XHJcblxyXG4gICAgaWYgKGlzUHJvY2Vzc2luZylcclxuICAgICAgcmV0dXJuIGxvZ2dlci53YXJuKGBEZXZlbG9wbWVudCBleHRlbnNpb24gd2FzIHNlbnQgd2hpbGUgZXh0ZW5zaW9uIHdhcyBhbHJlYWR5IGJlaW5nIHByb2Nlc3NlZC5gKTtcclxuXHJcbiAgICBpc1Byb2Nlc3NpbmcgPSB0cnVlO1xyXG5cclxuICAgIGV4dGVuc2lvbi51bmxvYWQoKTtcclxuICAgIGF3YWl0IG5ldyBQcm9taXNlKChyKSA9PiBzZXRUaW1lb3V0KHIsIDEpKTtcclxuICAgIGxldCBzdWNjZXNzID0gYXdhaXQgZXh0ZW5zaW9uLmxvYWQoc291cmNlLCBtYW5pZmVzdCk7XHJcbiAgICBpZiAoc3VjY2VzcykgbG9nZ2VyLmluZm8oYERldmVsb3BtZW50IGV4dGVuc2lvbiBpcyBsb2FkZWQhICgke2kxOG4ubG9jYWxpemUobWFuaWZlc3QuYWJvdXQubmFtZSl9KWApO1xyXG4gICAgaXNQcm9jZXNzaW5nID0gZmFsc2U7XHJcbiAgfVxyXG4pIiwgImV4cG9ydCBkZWZhdWx0IHtcclxuICBwcm9jZXNzOiBnbG9iYWxUaGlzW1wiPFBSRUxPQURfS0VZPlwiXS5wcm9jZXNzLFxyXG4gIGlzRGV2VG9vbHNPcGVuOiBnbG9iYWxUaGlzW1wiPFBSRUxPQURfS0VZPlwiXS5pc0RldlRvb2xzT3BlblxyXG59XHJcblxyXG4iLCAiaW1wb3J0IG1vZHVsZXMgZnJvbSAnLi9tb2R1bGVzJztcclxuaW1wb3J0IGRldiBmcm9tICcuL2Rldic7XHJcbmltcG9ydCB1dGlscyBmcm9tICcuL3V0aWxzJztcclxuaW1wb3J0IGV4dGVuc2lvbnMgZnJvbSAnLi9leHRlbnNpb25zJztcclxuaW1wb3J0IGkxOG4gZnJvbSAnLi9pMThuJztcclxuaW1wb3J0IHN0b3JhZ2UgZnJvbSAnLi9zdG9yYWdlJztcclxuaW1wb3J0IGV2ZW50cyBmcm9tICcuL2V2ZW50cyc7XHJcbmltcG9ydCBwYXRjaGVyIGZyb20gJy4vcGF0Y2hlcic7XHJcbmltcG9ydCBpbnRlcm5hbCBmcm9tICcuL2ludGVybmFsJztcclxuaW1wb3J0IHdlYnNvY2tldCBmcm9tICcuL3dlYnNvY2tldCc7XHJcbmltcG9ydCBkb20gZnJvbSAnLi9kb20nO1xyXG5pbXBvcnQgdWkgZnJvbSAnLi91aS9pbmRleC5qcyc7XHJcbmltcG9ydCBzaGFyZWQgZnJvbSAnLi9zaGFyZWQvaW5kZXguanMnO1xyXG5cclxuLy8gdXRpbHMubG9nZ2VyLmRlYnVnKGBQUkVMT0FEX0tFWTogPFBSRUxPQURfS0VZPmApO1xyXG5cclxuZnVuY3Rpb24gZGV2RXJyb3IoYXBpKSB7XHJcbiAgcmV0dXJuIG5ldyBFcnJvcihgVGhlICR7YXBpfSBBUEkgY2FuIG9ubHkgYmUgYWNjZXNzZWQgd2hlbiBEZXYgbW9kZSBpcyBlbmFibGVkIWApO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgZXhwb3NlZEFQSToge1xyXG4gICAgZGV2LFxyXG4gICAgZ2V0IHV0aWxzKCkge1xyXG4gICAgICBpZiAoIWRldi5lbmFibGVkKSB0aHJvdyBkZXZFcnJvcihcIlV0aWxzXCIpO1xyXG4gICAgICByZXR1cm4gdXRpbHM7XHJcbiAgICB9LFxyXG4gICAgZ2V0IGkxOG4oKSB7XHJcbiAgICAgIGlmICghZGV2LmVuYWJsZWQpIHRocm93IGRldkVycm9yKFwiaTE4blwiKTtcclxuICAgICAgcmV0dXJuIGkxOG47XHJcbiAgICB9LFxyXG4gICAgZ2V0IGV2ZW50cygpIHtcclxuICAgICAgaWYgKCFkZXYuZW5hYmxlZCkgdGhyb3cgZGV2RXJyb3IoXCJFdmVudHNcIik7XHJcbiAgICAgIHJldHVybiBldmVudHM7XHJcbiAgICB9LFxyXG4gICAgZ2V0IHVpKCkge1xyXG4gICAgICBpZiAoIWRldi5lbmFibGVkKSB0aHJvdyBkZXZFcnJvcihcIlVJXCIpO1xyXG4gICAgICByZXR1cm4gdWk7XHJcbiAgICB9LFxyXG4gICAgZ2V0IHNoYXJlZCgpIHtcclxuICAgICAgaWYgKCFkZXYuZW5hYmxlZCkgdGhyb3cgZGV2RXJyb3IoXCJTaGFyZWRcIik7XHJcbiAgICAgIHJldHVybiBzaGFyZWQ7XHJcbiAgICB9LFxyXG4gICAgZ2V0IGRvbSgpIHtcclxuICAgICAgaWYgKCFkZXYuZW5hYmxlZCkgdGhyb3cgZGV2RXJyb3IoXCJET01cIik7XHJcbiAgICAgIHJldHVybiBkb207XHJcbiAgICB9LFxyXG4gICAgZ2V0IHBhdGNoZXIoKSB7XHJcbiAgICAgIGlmICghZGV2LmVuYWJsZWQpIHRocm93IGRldkVycm9yKFwiUGF0Y2hlclwiKTtcclxuICAgICAgcmV0dXJuIHBhdGNoZXI7XHJcbiAgICB9LFxyXG4gICAgZ2V0IHN0b3JhZ2UoKSB7XHJcbiAgICAgIGlmICghZGV2LmVuYWJsZWQpIHRocm93IGRldkVycm9yKFwiU3RvcmFnZVwiKTtcclxuICAgICAgcmV0dXJuIHN0b3JhZ2U7XHJcbiAgICB9LFxyXG4gICAgZ2V0IG1vZHVsZXMoKSB7XHJcbiAgICAgIGlmICghZGV2LmVuYWJsZWQpIHRocm93IGRldkVycm9yKFwiTW9kdWxlc1wiKTtcclxuICAgICAgcmV0dXJuIG1vZHVsZXM7XHJcbiAgICB9LFxyXG4gICAgZ2V0IGV4dGVuc2lvbnMoKSB7XHJcbiAgICAgIGlmICghZGV2LmVuYWJsZWQpIHRocm93IGRldkVycm9yKFwiRXh0ZW5zaW9uc1wiKTtcclxuICAgICAgcmV0dXJuIGV4dGVuc2lvbnM7XHJcbiAgICB9LFxyXG4gICAgZ2V0IGludGVybmFsKCkge1xyXG4gICAgICBpZiAoIWRldi5lbmFibGVkKSB0aHJvdyBkZXZFcnJvcihcIkludGVybmFsXCIpO1xyXG4gICAgICByZXR1cm4gaW50ZXJuYWw7XHJcbiAgICB9LFxyXG4gICAgZ2V0IHdlYnNvY2tldCgpIHtcclxuICAgICAgaWYgKCFkZXYuZW5hYmxlZCkgdGhyb3cgZGV2RXJyb3IoXCJXZWJzb2NrZXRcIik7XHJcbiAgICAgIHJldHVybiB3ZWJzb2NrZXQ7XHJcbiAgICB9XHJcbiAgfSxcclxuICB1bmV4cG9zZWRBUEk6IHtcclxuICAgIGRldixcclxuICAgIG1vZHVsZXMsXHJcbiAgICB1dGlscyxcclxuICAgIGV4dGVuc2lvbnMsXHJcbiAgICBpMThuLFxyXG4gICAgc3RvcmFnZSxcclxuICAgIGV2ZW50cyxcclxuICAgIHBhdGNoZXIsXHJcbiAgICBpbnRlcm5hbCxcclxuICAgIHdlYnNvY2tldCxcclxuICAgIHNoYXJlZCxcclxuICAgIHVpLFxyXG4gICAgZG9tXHJcbiAgfVxyXG59IiwgImltcG9ydCBldmVudHMgZnJvbSBcIi4uL2FwaS9ldmVudHMvaW5kZXguanNcIjtcclxuXHJcbmNvbnN0IG9nVGl0bGVTZXR0ZXIgPSBkb2N1bWVudC5fX2xvb2t1cFNldHRlcl9fKFwidGl0bGVcIik7XHJcbmNvbnN0IG9nVGl0bGVHZXR0ZXIgPSBkb2N1bWVudC5fX2xvb2t1cEdldHRlcl9fKFwidGl0bGVcIik7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoXHJcbiAgZG9jdW1lbnQsXHJcbiAgXCJ0aXRsZVwiLFxyXG4gIHtcclxuICAgIGdldCgpIHtcclxuICAgICAgcmV0dXJuIG9nVGl0bGVHZXR0ZXIuY2FsbCh0aGlzKTtcclxuICAgIH0sXHJcbiAgICBzZXQodikge1xyXG4gICAgICBldmVudHMuZW1pdChcIkRvY3VtZW50VGl0bGVDaGFuZ2VcIiwgdik7XHJcbiAgICAgIHJldHVybiBvZ1RpdGxlU2V0dGVyLmNhbGwodGhpcywgdik7XHJcbiAgICB9XHJcbiAgfVxyXG4pOyIsICJpbXBvcnQgbW9kdWxlcyBmcm9tIFwiLi4vYXBpL21vZHVsZXMvaW5kZXguanNcIjtcclxuaW1wb3J0IG1vZGFscyBmcm9tIFwiLi4vYXBpL3VpL21vZGFscy5qc3hcIjtcclxuaW1wb3J0IG5vdGlmaWNhdGlvbnMgZnJvbSBcIi4uL2FwaS91aS9ub3RpZmljYXRpb25zLmpzXCI7XHJcbmltcG9ydCBleHRlbnNpb25zIGZyb20gXCIuLi9hcGkvZXh0ZW5zaW9ucy9pbmRleC5qc1wiO1xyXG5pbXBvcnQgd2Vic29ja2V0IGZyb20gXCIuLi9hcGkvd2Vic29ja2V0L2luZGV4LmpzXCI7XHJcblxyXG53ZWJzb2NrZXQuc2V0KFwiSW5zdGFsbEV4dGVuc2lvblwiLCBhc3luYyAoeyB1cmwgfSA9IHt9KSA9PiB7XHJcbiAgaWYgKCF1cmwpIHJldHVybjtcclxuXHJcbiAgYXdhaXQgbW9kdWxlcy5uYXRpdmUud2luZG93LnNldEFsd2F5c09uVG9wKDAsIHRydWUpO1xyXG4gIGF3YWl0IG5ldyBQcm9taXNlKHIgPT4gc2V0VGltZW91dChyLCAyNTApKTtcclxuICBhd2FpdCBtb2R1bGVzLm5hdGl2ZS53aW5kb3cuc2V0QWx3YXlzT25Ub3AoMCwgdHJ1ZSk7XHJcblxyXG4gIGNvbnN0IHN1Y2Nlc3MgPSBhd2FpdCBtb2RhbHMuc2hvdy5jb25maXJtYXRpb24oXHJcbiAgICBhY29yZC5pMThuLmZvcm1hdChcIklNUE9SVF9FWFRFTlNJT05fTU9EQUxfVElUTEVcIiksXHJcbiAgICBhY29yZC5pMThuLmZvcm1hdChcIklNUE9SVF9FWFRFTlNJT05fTU9EQUxfREVTQ1JJUFRJT05cIiwgdXJsKVxyXG4gICk7XHJcblxyXG4gIGlmICghc3VjY2VzcykgcmV0dXJuO1xyXG5cclxuICB0cnkge1xyXG4gICAgYXdhaXQgZXh0ZW5zaW9ucy5sb2FkKHVybCk7XHJcbiAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICBub3RpZmljYXRpb25zLnNob3cuZXJyb3IoYCR7ZXJyfWAsIHsgdGltZW91dDogMzAwMDAgfSk7XHJcbiAgfVxyXG59KTsiLCAiZXhwb3J0IGRlZmF1bHQgYFxuW2NsYXNzKj1hY29yZC0tXXtib3gtc2l6aW5nOmJvcmRlci1ib3h9W2NsYXNzKj1hY29yZC0tXSAqe2JveC1zaXppbmc6Ym9yZGVyLWJveH0uYWNvcmQtLXRhYnMtY29udGVudC1jb250YWluZXJ7cGFkZGluZzozMnB4IDE2cHg7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmZsZXgtc3RhcnQ7anVzdGlmeS1jb250ZW50OmNlbnRlcjt3aWR0aDoxMDAlfS5hY29yZC0tdGFicy1jb250ZW50LWNvbnRhaW5lcj4udGFie3dpZHRoOjEwMCV9LmFjb3JkLS10YWJzLXRhYi1idXR0b24uc3RvcmUtdGFiLWJ1dHRvbntiYWNrZ3JvdW5kLWNvbG9yOnZhcigtLXN0YXR1cy1wb3NpdGl2ZS1iYWNrZ3JvdW5kKTtjb2xvcjp2YXIoLS1zdGF0dXMtcG9zaXRpdmUtdGV4dCl9LmFjb3JkLS10YWJzLXRhYi1idXR0b24uc3RvcmUtdGFiLWJ1dHRvbi5zZWxlY3RlZHtjb2xvcjp2YXIoLS10ZXh0LXBvc2l0aXZlKTtiYWNrZ3JvdW5kLWNvbG9yOnZhcigtLWJhY2tncm91bmQtbW9kaWZpZXItc2VsZWN0ZWQpfWA7XG4iLCAiZXhwb3J0IGRlZmF1bHQge1xyXG4gIC8qKiBAcGFyYW0ge2ltcG9ydChcInZ1ZVwiKS5BcHB9IHZ1ZUFwcCAqL1xyXG4gIGxvYWQodnVlQXBwKSB7XHJcbiAgICB2dWVBcHAuY29tcG9uZW50KFxyXG4gICAgICBcImhvbWUtcGFnZVwiLFxyXG4gICAgICB7XHJcbiAgICAgICAgdGVtcGxhdGU6IGBcclxuICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJ3aWR0aDogMzAwcHg7XCI+XHJcbiAgICAgICAgICAgICAgPGRpc2NvcmQtc2VsZWN0IHYtbW9kZWw9XCJ2YWx1ZVwiIDpvcHRpb25zPVwib3B0aW9uc1wiIC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8aDE+e3sgdmFsdWUgfX08L2gxPlxyXG4gICAgICAgICAgICA8YnIgLz5cclxuICAgICAgICAgICAgPGRpc2NvcmQtY2hlY2sgdi1tb2RlbD1cImNoZWNrZWRcIiAvPlxyXG4gICAgICAgICAgICA8aDE+e3sgY2hlY2tlZCB9fTwvaDE+XHJcbiAgICAgICAgICAgIDxkaXNjb3JkLWNoZWNrIHYtbW9kZWw9XCJjaGVja2VkXCIgLz5cclxuICAgICAgICAgICAgPGgxPnt7IGNoZWNrZWQgfX08L2gxPlxyXG4gICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIGAsXHJcbiAgICAgICAgZGF0YSgpIHtcclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHZhbHVlOiBcIjFcIixcclxuICAgICAgICAgICAgY2hlY2tlZDogZmFsc2UsXHJcbiAgICAgICAgICAgIG9wdGlvbnM6IFtcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCIxXCIsXHJcbiAgICAgICAgICAgICAgICBsYWJlbDogXCJPcHRpb24gMVwiXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCIyXCIsXHJcbiAgICAgICAgICAgICAgICBsYWJlbDogXCJPcHRpb24gMlwiXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCIzXCIsXHJcbiAgICAgICAgICAgICAgICBsYWJlbDogXCJPcHRpb24gM1wiXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICApO1xyXG4gIH1cclxufSIsICJleHBvcnQgZGVmYXVsdCBgXG4uYWNvcmQtLWluc3RhbGxlZC1leHRlbnNpb25zLXBhZ2V7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmZsZXgtc3RhcnQ7anVzdGlmeS1jb250ZW50OmNlbnRlcjtwYWRkaW5nOjAgMTZweH0uYWNvcmQtLWluc3RhbGxlZC1leHRlbnNpb25zLXBhZ2UgLmNvbnRhaW5lcnt3aWR0aDoxMDAlO21heC13aWR0aDoxMDI0cHg7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOmNvbHVtbn0uYWNvcmQtLWluc3RhbGxlZC1leHRlbnNpb25zLXBhZ2UgLmNvbnRhaW5lcj4udG9we2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7Z2FwOjhweH0uYWNvcmQtLWluc3RhbGxlZC1leHRlbnNpb25zLXBhZ2UgLmNvbnRhaW5lcj4udG9wPi5zZWFyY2h7d2lkdGg6ODAlfS5hY29yZC0taW5zdGFsbGVkLWV4dGVuc2lvbnMtcGFnZSAuY29udGFpbmVyPi50b3A+LmNhdGVnb3J5e3dpZHRoOjIwJX0uYWNvcmQtLWluc3RhbGxlZC1leHRlbnNpb25zLXBhZ2UgLmNvbnRhaW5lcj4uYm90dG9te2Rpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpjb2x1bW47Z2FwOjE2cHg7bWFyZ2luLXRvcDoxNnB4fWA7XG4iLCAiaW1wb3J0IHBhdGNoZXIgZnJvbSBcIi4uLy4uLy4uLy4uLy4uLy4uL2FwaS9wYXRjaGVyL2luZGV4LmpzXCI7XHJcbmltcG9ydCBpMThuIGZyb20gXCIuLi8uLi8uLi8uLi8uLi8uLi9hcGkvaTE4bi9pbmRleC5qc1wiO1xyXG5pbXBvcnQgZXh0ZW5zaW9ucyBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vLi4vYXBpL2V4dGVuc2lvbnMvaW5kZXguanNcIjtcclxuaW1wb3J0IGNzc1RleHQgZnJvbSBcIi4vc3R5bGUuc2Nzc1wiO1xyXG5wYXRjaGVyLmluamVjdENTUyhjc3NUZXh0KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAvKiogQHBhcmFtIHtpbXBvcnQoXCJ2dWVcIikuQXBwfSB2dWVBcHAgKi9cclxuICBsb2FkKHZ1ZUFwcCkge1xyXG4gICAgdnVlQXBwLmNvbXBvbmVudChcclxuICAgICAgXCJpbnN0YWxsZWQtZXh0ZW5zaW9ucy1wYWdlXCIsXHJcbiAgICAgIHtcclxuICAgICAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImFjb3JkLS1pbnN0YWxsZWQtZXh0ZW5zaW9ucy1wYWdlXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidG9wXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2VhcmNoXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXNjb3JkLWlucHV0IHYtbW9kZWw9XCJzZWFyY2hUZXh0XCIgOnBsYWNlaG9sZGVyPVwiaTE4bkZvcm1hdCgnU0VBUkNIJylcIiAvPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2F0ZWdvcnlcIj5cclxuICAgICAgICAgICAgICAgICAgPGRpc2NvcmQtc2VsZWN0IHYtbW9kZWw9XCJzZWFyY2hDYXRlZ29yeVRleHRcIiA6b3B0aW9ucz1cIlt7dmFsdWU6ICdhbGwnLCBsYWJlbDogaTE4bkZvcm1hdCgnQUxMJyl9LCB7dmFsdWU6ICdwbHVnaW5zJywgbGFiZWw6IGkxOG5Gb3JtYXQoJ1BMVUdJTlMnKX0sIHt2YWx1ZTogJ3RoZW1lcycsIGxhYmVsOiBpMThuRm9ybWF0KCdUSEVNRVMnKX1dXCIgLz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJib3R0b21cIj5cclxuICAgICAgICAgICAgICAgIDxpbnN0YWxsZWQtZXh0ZW5zaW9uLWNhcmQgdi1mb3I9XCIoZXh0ZW5zaW9uLCBpZCkgb2YgZmlsdGVyZWRFeHRlbnNpb25zXCIgOmlkPVwiaWRcIiA6ZXh0ZW5zaW9uPVwiZXh0ZW5zaW9uXCIgOmtleT1cImlkXCIgLz5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICBgLFxyXG4gICAgICAgIGRhdGEoKSB7XHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBzZWFyY2hUZXh0OiBcIlwiLFxyXG4gICAgICAgICAgICBzZWFyY2hDYXRlZ29yeVRleHQ6IFwiYWxsXCIsXHJcbiAgICAgICAgICAgIGV4dGVuc2lvbnM6IHt9LFxyXG4gICAgICAgICAgICBmaWx0ZXJlZEV4dGVuc2lvbnM6IHt9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBtZXRob2RzOiB7XHJcbiAgICAgICAgICBvblN0b3JhZ2VVcGRhdGUoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZXh0ZW5zaW9ucyA9IGV4dGVuc2lvbnMuc3RvcmFnZS5pbnN0YWxsZWQuZ2hvc3Q7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlRmlsdGVyZWQoKTtcclxuICAgICAgICAgICAgdGhpcy4kZm9yY2VVcGRhdGUoKTtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBpMThuRm9ybWF0OiBpMThuLmZvcm1hdCxcclxuICAgICAgICAgIHVwZGF0ZUZpbHRlcmVkKCkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuc2VhcmNoVGV4dCkgcmV0dXJuIHRoaXMuZmlsdGVyZWRFeHRlbnNpb25zID0gdGhpcy5leHRlbnNpb25zO1xyXG4gICAgICAgICAgICBjb25zdCBzZWFyY2hUZXh0ID0gdGhpcy5zZWFyY2hUZXh0LnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlYXJjaENhdGVnb3J5VGV4dCA9IHRoaXMuc2VhcmNoQ2F0ZWdvcnlUZXh0O1xyXG4gICAgICAgICAgICB0aGlzLmZpbHRlcmVkRXh0ZW5zaW9ucyA9IE9iamVjdC5mcm9tRW50cmllcyhcclxuICAgICAgICAgICAgICBPYmplY3QuZW50cmllcyh0aGlzLmV4dGVuc2lvbnMpXHJcbiAgICAgICAgICAgICAgICAuZmlsdGVyKChbaWQsIGV4dGVuc2lvbl0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgaWYgKHNlYXJjaENhdGVnb3J5VGV4dCA9PT0gXCJhbGxcIikgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgIHJldHVybiBleHRlbnNpb24ubWFuaWZlc3QudHlwZSA9PT0gc2VhcmNoQ2F0ZWdvcnlUZXh0O1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5maWx0ZXIoKFtpZCwgZXh0ZW5zaW9uXSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICBpZiAoIXNlYXJjaFRleHQpIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICByZXR1cm4gaTE4bi5sb2NhbGl6ZShleHRlbnNpb24ubWFuaWZlc3QuYWJvdXQubmFtZSkudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2hUZXh0KSB8fCBpMThuLmxvY2FsaXplKGV4dGVuc2lvbi5tYW5pZmVzdC5hYm91dC5kZXNjcmlwdGlvbikudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2hUZXh0KTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB3YXRjaDoge1xyXG4gICAgICAgICAgc2VhcmNoVGV4dCgpIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVGaWx0ZXJlZCgpO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHNlYXJjaENhdGVnb3J5VGV4dCgpIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVGaWx0ZXJlZCgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbW91bnRlZCgpIHtcclxuICAgICAgICAgIHRoaXMub25TdG9yYWdlVXBkYXRlKCk7XHJcbiAgICAgICAgICB0aGlzLnVwZGF0ZUZpbHRlcmVkKCk7XHJcbiAgICAgICAgICBleHRlbnNpb25zLnN0b3JhZ2UuaW5zdGFsbGVkLm9uKFwiVVBEQVRFXCIsIHRoaXMub25TdG9yYWdlVXBkYXRlKTtcclxuICAgICAgICAgIGV4dGVuc2lvbnMuc3RvcmFnZS5pbnN0YWxsZWQub24oXCJTRVRcIiwgdGhpcy5vblN0b3JhZ2VVcGRhdGUpO1xyXG4gICAgICAgICAgZXh0ZW5zaW9ucy5zdG9yYWdlLmluc3RhbGxlZC5vbihcIkRFTEVURVwiLCB0aGlzLm9uU3RvcmFnZVVwZGF0ZSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICB1bm1vdW50ZWQoKSB7XHJcbiAgICAgICAgICBleHRlbnNpb25zLnN0b3JhZ2UuaW5zdGFsbGVkLm9mZihcIlVQREFURVwiLCB0aGlzLm9uU3RvcmFnZVVwZGF0ZSk7XHJcbiAgICAgICAgICBleHRlbnNpb25zLnN0b3JhZ2UuaW5zdGFsbGVkLm9mZihcIlNFVFwiLCB0aGlzLm9uU3RvcmFnZVVwZGF0ZSk7XHJcbiAgICAgICAgICBleHRlbnNpb25zLnN0b3JhZ2UuaW5zdGFsbGVkLm9mZihcIkRFTEVURVwiLCB0aGlzLm9uU3RvcmFnZVVwZGF0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICApO1xyXG4gIH1cclxufSIsICJleHBvcnQgZGVmYXVsdCB7XHJcbiAgLyoqIEBwYXJhbSB7aW1wb3J0KFwidnVlXCIpLkFwcH0gdnVlQXBwICovXHJcbiAgbG9hZCh2dWVBcHApIHtcclxuICAgIHZ1ZUFwcC5jb21wb25lbnQoXHJcbiAgICAgIFwic2V0dGluZ3MtcGFnZVwiLFxyXG4gICAgICB7XHJcbiAgICAgICAgdGVtcGxhdGU6IFwiPGRpdj5TZXR0aW5ncyBQYWdlPC9kaXY+XCIsXHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgfVxyXG59IiwgImV4cG9ydCBkZWZhdWx0IHtcclxuICAvKiogQHBhcmFtIHtpbXBvcnQoXCJ2dWVcIikuQXBwfSB2dWVBcHAgKi9cclxuICBsb2FkKHZ1ZUFwcCkge1xyXG4gICAgdnVlQXBwLmNvbXBvbmVudChcclxuICAgICAgXCJzdG9yZS1wYWdlXCIsXHJcbiAgICAgIHtcclxuICAgICAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxkaXY+XHJcbiAgICAgICAgICA8c3RvcmUtZXh0ZW5zaW9uLWNhcmQgdi1mb3I9XCJleHRlbnNpb24gaW4gZXh0ZW5zaW9uc1wiIDpleHRlbnNpb249XCJleHRlbnNpb25cIiA6a2V5PVwiZXh0ZW5zaW9uLm5hbWUuZGVmYXVsdFwiIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgYCxcclxuICAgICAgICBkYXRhKCkge1xyXG4gICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZXh0ZW5zaW9uczogW1xyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwicGx1Z2luXCIsXHJcbiAgICAgICAgICAgICAgICB1cmw6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiB7XHJcbiAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IFwiVGVzdCBQbHVnaW5cIixcclxuICAgICAgICAgICAgICAgICAgdHI6IFwiRGVuZW1lIFBsdWdpblwiLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IFwiVGVzdCBQbHVnaW4gZGVzY3JpcHRpb24uLlwiLFxyXG4gICAgICAgICAgICAgICAgICB0cjogXCJEZW5lbWUgUGx1Z2luIGFcdTAwRTdcdTAxMzFrbGFtYXNcdTAxMzEuLlwiLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHByZXZpZXdzOiBbXHJcbiAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIlRlc3QgUGx1Z2luIFByZXZpZXdcIixcclxuICAgICAgICAgICAgICAgICAgICBpbWFnZTogXCJodHRwczovL2kuaW1ndXIuY29tL1R0ZmpIZVAucG5nXCIsXHJcbiAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIlRlc3QgUGx1Z2luIFByZXZpZXcgMlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGltYWdlOiBcImh0dHBzOi8vaS5pbWd1ci5jb20vMFowWjBaMC5wbmdcIixcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIGF1dGhvcnM6IFtcclxuICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIjcwNzMwOTY5MzQ0OTUzNTU5OVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiQXJtYWdhbiMyNDQ4XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2U6IFwiaHR0cHM6Ly9pLmltZ3VyLmNvbS9yU0xWZDIzLnBuZ1wiXHJcbiAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogXCI3MDczMDk2OTM0NDk1MzU1OTlcIixcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIkFybWFnYW4jMjQ0OFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGltYWdlOiBcImh0dHBzOi8vaS5pbWd1ci5jb20vclNMVmQyMy5wbmdcIlxyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgdmVyc2lvbjogXCIxLjAuMFwiLFxyXG4gICAgICAgICAgICAgICAgcmVhZG1lOiBcIiMjIyBUZXN0IFBsdWdpbiByZWFkbWUuLlwiLFxyXG4gICAgICAgICAgICAgICAgaW5zdGFsbGVkOiB0cnVlXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgKTtcclxuICB9XHJcbn0iLCAiaW1wb3J0IGhvbWVQYWdlIGZyb20gXCIuL2hvbWUtcGFnZS9pbmRleC5qc1wiXHJcbmltcG9ydCBpbnN0YWxsZWRFeHRlbnNpb25zUGFnZSBmcm9tIFwiLi9pbnN0YWxsZWQtZXh0ZW5zaW9ucy1wYWdlL2luZGV4LmpzXCI7XHJcbmltcG9ydCBzZXR0aW5nc1BhZ2UgZnJvbSBcIi4vc2V0dGluZ3MtcGFnZS9pbmRleC5qc1wiO1xyXG5pbXBvcnQgc3RvcmVQYWdlIGZyb20gXCIuL3N0b3JlLXBhZ2UvaW5kZXguanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAvKiogQHBhcmFtIHtpbXBvcnQoXCJ2dWVcIikuQXBwfSB2dWVBcHAgKi9cclxuICBsb2FkKHZ1ZUFwcCkge1xyXG4gICAgaG9tZVBhZ2UubG9hZCh2dWVBcHApO1xyXG4gICAgaW5zdGFsbGVkRXh0ZW5zaW9uc1BhZ2UubG9hZCh2dWVBcHApO1xyXG4gICAgc2V0dGluZ3NQYWdlLmxvYWQodnVlQXBwKTtcclxuICAgIHN0b3JlUGFnZS5sb2FkKHZ1ZUFwcCk7XHJcbiAgfVxyXG59IiwgImltcG9ydCBldmVudHMgZnJvbSBcIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2FwaS9ldmVudHMvaW5kZXguanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAvKiogQHBhcmFtIHtpbXBvcnQoXCJ2dWVcIikuQXBwfSB2dWVBcHAgKi9cclxuICBsb2FkKHZ1ZUFwcCkge1xyXG4gICAgdnVlQXBwLmNvbXBvbmVudChcImNvbmZpZy1idXR0b25cIiwge1xyXG4gICAgICBwcm9wczogW1wiaXRlbVwiLCBcImV4dGVuc2lvblwiXSxcclxuICAgICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8ZGl2IHYtc2hvdz1cIml0ZW0/LnZpc2libGUgPz8gdHJ1ZVwiIGNsYXNzPVwiYWNvcmQtLWNvbmZpZy1idXR0b24gYWNvcmQtLWNvbmZpZy1pdGVtXCI+XHJcbiAgICAgICAgICA8ZGlzY29yZC1idXR0b24gQGNsaWNrPVwib25DbGlja1wiIDp2YWx1ZT1cIml0ZW0udmFsdWVcIiA6c2l6ZT1cIml0ZW0uc2l6ZVwiIDpjb2xvcj1cIml0ZW0uY29sb3JcIiAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICBgLFxyXG4gICAgICBtZXRob2RzOiB7XHJcbiAgICAgICAgb25DbGljayhldmVudCkge1xyXG4gICAgICAgICAgZXZlbnRzLmVtaXQoXHJcbiAgICAgICAgICAgIFwiRXh0ZW5zaW9uQ29uZmlnSW50ZXJhY3Rpb25cIixcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIGV4dGVuc2lvbjogdGhpcy5leHRlbnNpb24sXHJcbiAgICAgICAgICAgICAgaXRlbTogdGhpcy5pdGVtLFxyXG4gICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIGV2ZW50XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICApXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn0iLCAiaW1wb3J0IGV2ZW50cyBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vYXBpL2V2ZW50cy9pbmRleC5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIC8qKiBAcGFyYW0ge2ltcG9ydChcInZ1ZVwiKS5BcHB9IHZ1ZUFwcCAqL1xyXG4gIGxvYWQodnVlQXBwKSB7XHJcbiAgICB2dWVBcHAuY29tcG9uZW50KFwiY29uZmlnLWNoZWNrXCIsIHtcclxuICAgICAgcHJvcHM6IFtcIml0ZW1cIiwgXCJleHRlbnNpb25cIl0sXHJcbiAgICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiB2LXNob3c9XCJpdGVtPy52aXNpYmxlID8/IHRydWVcIiBjbGFzcz1cImFjb3JkLS1jb25maWctY2hlY2sgYWNvcmQtLWNvbmZpZy1pdGVtXCI+XHJcbiAgICAgICAgICA8ZGlzY29yZC1jaGVjayBAY2hhbmdlPVwib25DaGFuZ2VcIiB2LW1vZGVsPVwiaXRlbS52YWx1ZVwiIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIGAsXHJcbiAgICAgIG1ldGhvZHM6IHtcclxuICAgICAgICBvbkNoYW5nZShkYXRhKSB7XHJcbiAgICAgICAgICBldmVudHMuZW1pdChcclxuICAgICAgICAgICAgXCJFeHRlbnNpb25Db25maWdJbnRlcmFjdGlvblwiLFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgZXh0ZW5zaW9uOiB0aGlzLmV4dGVuc2lvbixcclxuICAgICAgICAgICAgICBpdGVtOiB0aGlzLml0ZW0sXHJcbiAgICAgICAgICAgICAgZGF0YVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICApXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn0iLCAie1xyXG4gIFwibmFtZVwiOiB7XHJcbiAgICBcIkNvbHVtblwiOiBcImNvbmZpZy1jb2x1bW5cIixcclxuICAgIFwiUm93XCI6IFwiY29uZmlnLXJvd1wiLFxyXG4gICAgXCJCdXR0b25cIjogXCJjb25maWctYnV0dG9uXCIsXHJcbiAgICBcIkNoZWNrXCI6IFwiY29uZmlnLWNoZWNrXCIsXHJcbiAgICBcIklucHV0XCI6IFwiY29uZmlnLWlucHV0XCIsXHJcbiAgICBcIlNlbGVjdFwiOiBcImNvbmZpZy1zZWxlY3RcIixcclxuICAgIFwiVGV4dGFyZWFcIjogXCJjb25maWctdGV4dGFyZWFcIixcclxuICAgIFwiU3BhY2VyXCI6IFwiY29uZmlnLXNwYWNlclwiLFxyXG4gICAgXCJQYXJhZ3JhcGhcIjogXCJjb25maWctcGFyYWdyYXBoXCIsXHJcbiAgICBcIkhlYWRpbmdcIjogXCJjb25maWctaGVhZGluZ1wiXHJcbiAgfVxyXG59IiwgImltcG9ydCB7IG5hbWUgYXMgbmFtZU1hcCB9IGZyb20gXCIuLi9tYXBzLmpzb25cIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAvKiogQHBhcmFtIHtpbXBvcnQoXCJ2dWVcIikuQXBwfSB2dWVBcHAgKi9cclxuICBsb2FkKHZ1ZUFwcCkge1xyXG4gICAgdnVlQXBwLmNvbXBvbmVudChcclxuICAgICAgXCJjb25maWctY29sdW1uXCIsXHJcbiAgICAgIHtcclxuICAgICAgICBwcm9wczogW1wiaXRlbVwiLCBcImV4dGVuc2lvblwiXSxcclxuICAgICAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgICAgPGRpdiB2LXNob3c9XCJpdGVtPy52aXNpYmxlID8/IHRydWVcIiBjbGFzcz1cImFjb3JkLS1jb25maWctY29sdW1uIGFjb3JkLS1jb25maWctaXRlbVwiIDpjbGFzcz1cIntcclxuICAgICAgICAgICAgJ2hvcml6b250YWwtYWxpZ24tbGVmdCc6IGl0ZW0/Lmhvcml6b250YWxBbGlnbiA9PT0gJ2xlZnQnLFxyXG4gICAgICAgICAgICAnaG9yaXpvbnRhbC1hbGlnbi1jZW50ZXInOiBpdGVtPy5ob3Jpem9udGFsQWxpZ24gPT09ICdjZW50ZXInLFxyXG4gICAgICAgICAgICAnaG9yaXpvbnRhbC1hbGlnbi1yaWdodCc6IGl0ZW0/Lmhvcml6b250YWxBbGlnbiA9PT0gJ3JpZ2h0JyxcclxuICAgICAgICAgICAgJ2p1c3RpZnktc3BhY2UtYmV0d2Vlbic6IGl0ZW0/Lmp1c3RpZnkgPT09ICdzcGFjZS1iZXR3ZWVuJyxcclxuICAgICAgICAgICAgJ2p1c3RpZnktc3BhY2UtYXJvdW5kJzogaXRlbT8uanVzdGlmeSA9PT0gJ3NwYWNlLWFyb3VuZCcsXHJcbiAgICAgICAgICAgICd2ZXJ0aWNhbC1hbGlnbi10b3AnOiBpdGVtPy52ZXJ0aWNhbEFsaWduID09PSAndG9wJyxcclxuICAgICAgICAgICAgJ3ZlcnRpY2FsLWFsaWduLWNlbnRlcic6IGl0ZW0/LnZlcnRpY2FsQWxpZ24gPT09ICdjZW50ZXInLFxyXG4gICAgICAgICAgICAndmVydGljYWwtYWxpZ24tYm90dG9tJzogaXRlbT8udmVydGljYWxBbGlnbiA9PT0gJ2JvdHRvbSdcclxuICAgICAgICAgIH1cIiA6c3R5bGU9XCJ7J3dpZHRoJzogaXRlbT8ud2lkdGggPz8gJzEwMCUnLCAnaGVpZ2h0JzogaXRlbT8uaGVpZ2h0LCAnZ2FwJzogaXRlbT8uZ2FwfVwiID5cclxuICAgICAgICAgICAgPGNvbXBvbmVudCB2LWZvcj1cIihjaGlsZCwgaWR4KSBpbiBpdGVtLmNoaWxkcmVuXCIgOmlzPVwibmFtZU1hcFtjaGlsZC50eXBlXVwiIDprZXk9XCJpZHhcIiA6aXRlbT1cImNoaWxkXCIgOmV4dGVuc2lvbj1cImV4dGVuc2lvblwiIC8+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICBgLFxyXG4gICAgICAgIGRhdGEoKSB7XHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBuYW1lTWFwXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICApO1xyXG4gIH1cclxufSIsICJleHBvcnQgZGVmYXVsdCB7XHJcbiAgLyoqIEBwYXJhbSB7aW1wb3J0KFwidnVlXCIpLkFwcH0gdnVlQXBwICovXHJcbiAgbG9hZCh2dWVBcHApIHtcclxuICAgIHZ1ZUFwcC5jb21wb25lbnQoXCJjb25maWctaGVhZGluZ1wiLCB7XHJcbiAgICAgIHByb3BzOiBbXCJpdGVtXCIsIFwiZXh0ZW5zaW9uXCJdLFxyXG4gICAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxkaXYgdi1zaG93PVwiaXRlbT8udmlzaWJsZSA/PyB0cnVlXCIgY2xhc3M9XCJhY29yZC0tY29uZmlnLWhlYWRpbmcgYWNvcmQtLWNvbmZpZy1pdGVtXCI+XHJcbiAgICAgICAgICB7e2l0ZW0udmFsdWV9fVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICBgLFxyXG4gICAgfSk7XHJcbiAgfVxyXG59IiwgImltcG9ydCBldmVudHMgZnJvbSBcIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2FwaS9ldmVudHMvaW5kZXguanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAvKiogQHBhcmFtIHtpbXBvcnQoXCJ2dWVcIikuQXBwfSB2dWVBcHAgKi9cclxuICBsb2FkKHZ1ZUFwcCkge1xyXG4gICAgdnVlQXBwLmNvbXBvbmVudChcImNvbmZpZy1pbnB1dFwiLCB7XHJcbiAgICAgIHByb3BzOiBbXCJpdGVtXCIsIFwiZXh0ZW5zaW9uXCJdLFxyXG4gICAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxkaXYgdi1zaG93PVwiaXRlbT8udmlzaWJsZSA/PyB0cnVlXCIgY2xhc3M9XCJhY29yZC0tY29uZmlnLWlucHV0IGFjb3JkLS1jb25maWctaXRlbVwiPlxyXG4gICAgICAgICAgPGRpc2NvcmQtaW5wdXQgQGlucHV0PVwib25JbnB1dFwiIHYtbW9kZWw9XCJpdGVtLnZhbHVlXCIgOnR5cGU9XCJpdGVtLmlucHV0VHlwZVwiIDpwbGFjZWhvbGRlcj1cIml0ZW0ucGxhY2Vob2xkZXJcIiA6bWF4bGVuZ3RoPVwiaXRlbS5tYXhsZW5ndGhcIiAgOm1heD1cIml0ZW0ubWF4XCIgOm1pbj1cIml0ZW0ubWluXCIgOnN0ZXA9XCJpdGVtLnN0ZXBcIiAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICBgLFxyXG4gICAgICBtZXRob2RzOiB7XHJcbiAgICAgICAgb25JbnB1dChkYXRhKSB7XHJcbiAgICAgICAgICBldmVudHMuZW1pdChcclxuICAgICAgICAgICAgXCJFeHRlbnNpb25Db25maWdJbnRlcmFjdGlvblwiLFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgZXh0ZW5zaW9uOiB0aGlzLmV4dGVuc2lvbixcclxuICAgICAgICAgICAgICBpdGVtOiB0aGlzLml0ZW0sXHJcbiAgICAgICAgICAgICAgZGF0YVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICApXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn0iLCAiZXhwb3J0IGRlZmF1bHQge1xyXG4gIC8qKiBAcGFyYW0ge2ltcG9ydChcInZ1ZVwiKS5BcHB9IHZ1ZUFwcCAqL1xyXG4gIGxvYWQodnVlQXBwKSB7XHJcbiAgICB2dWVBcHAuY29tcG9uZW50KFwiY29uZmlnLXBhcmFncmFwaFwiLCB7XHJcbiAgICAgIHByb3BzOiBbXCJpdGVtXCIsIFwiZXh0ZW5zaW9uXCJdLFxyXG4gICAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxkaXYgdi1zaG93PVwiaXRlbT8udmlzaWJsZSA/PyB0cnVlXCIgY2xhc3M9XCJhY29yZC0tY29uZmlnLXBhcmFncmFwaCBhY29yZC0tY29uZmlnLWl0ZW1cIj5cclxuICAgICAgICAgIHt7aXRlbS52YWx1ZX19XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIGAsXHJcbiAgICB9KTtcclxuICB9XHJcbn0iLCAiaW1wb3J0IHsgbmFtZSBhcyBuYW1lTWFwIH0gZnJvbSBcIi4uL21hcHMuanNvblwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIC8qKiBAcGFyYW0ge2ltcG9ydChcInZ1ZVwiKS5BcHB9IHZ1ZUFwcCAqL1xyXG4gIGxvYWQodnVlQXBwKSB7XHJcbiAgICB2dWVBcHAuY29tcG9uZW50KFxyXG4gICAgICBcImNvbmZpZy1yb3dcIixcclxuICAgICAge1xyXG4gICAgICAgIHByb3BzOiBbXCJpdGVtXCIsIFwiZXh0ZW5zaW9uXCJdLFxyXG4gICAgICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgICA8ZGl2IHYtc2hvdz1cIml0ZW0/LnZpc2libGUgPz8gdHJ1ZVwiIGNsYXNzPVwiYWNvcmQtLWNvbmZpZy1yb3cgYWNvcmQtLWNvbmZpZy1pdGVtXCIgOmNsYXNzPVwie1xyXG4gICAgICAgICAgICAnaG9yaXpvbnRhbC1hbGlnbi1sZWZ0JzogaXRlbT8uaG9yaXpvbnRhbEFsaWduID09PSAnbGVmdCcsXHJcbiAgICAgICAgICAgICdob3Jpem9udGFsLWFsaWduLWNlbnRlcic6IGl0ZW0/Lmhvcml6b250YWxBbGlnbiA9PT0gJ2NlbnRlcicsXHJcbiAgICAgICAgICAgICdob3Jpem9udGFsLWFsaWduLXJpZ2h0JzogaXRlbT8uaG9yaXpvbnRhbEFsaWduID09PSAncmlnaHQnLFxyXG4gICAgICAgICAgICAnanVzdGlmeS1zcGFjZS1iZXR3ZWVuJzogaXRlbT8uanVzdGlmeSA9PT0gJ3NwYWNlLWJldHdlZW4nLFxyXG4gICAgICAgICAgICAnanVzdGlmeS1zcGFjZS1hcm91bmQnOiBpdGVtPy5qdXN0aWZ5ID09PSAnc3BhY2UtYXJvdW5kJyxcclxuICAgICAgICAgICAgJ3ZlcnRpY2FsLWFsaWduLXRvcCc6IGl0ZW0/LnZlcnRpY2FsQWxpZ24gPT09ICd0b3AnLFxyXG4gICAgICAgICAgICAndmVydGljYWwtYWxpZ24tY2VudGVyJzogaXRlbT8udmVydGljYWxBbGlnbiA9PT0gJ2NlbnRlcicsXHJcbiAgICAgICAgICAgICd2ZXJ0aWNhbC1hbGlnbi1ib3R0b20nOiBpdGVtPy52ZXJ0aWNhbEFsaWduID09PSAnYm90dG9tJ1xyXG4gICAgICAgICAgfVwiIDpzdHlsZT1cInsnd2lkdGgnOiBpdGVtPy53aWR0aCA/PyAnMTAwJScsICdoZWlnaHQnOiBpdGVtPy5oZWlnaHQsICdnYXAnOiBpdGVtPy5nYXB9XCIgPlxyXG4gICAgICAgICAgICA8Y29tcG9uZW50IHYtZm9yPVwiKGNoaWxkLCBpZHgpIGluIGl0ZW0uY2hpbGRyZW5cIiA6aXM9XCJuYW1lTWFwW2NoaWxkLnR5cGVdXCIgOmtleT1cImlkeFwiIDppdGVtPVwiY2hpbGRcIiA6ZXh0ZW5zaW9uPVwiZXh0ZW5zaW9uXCIgLz5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIGAsXHJcbiAgICAgICAgZGF0YSgpIHtcclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG5hbWVNYXBcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgfVxyXG59IiwgImltcG9ydCBldmVudHMgZnJvbSBcIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2FwaS9ldmVudHMvaW5kZXguanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAvKiogQHBhcmFtIHtpbXBvcnQoXCJ2dWVcIikuQXBwfSB2dWVBcHAgKi9cclxuICBsb2FkKHZ1ZUFwcCkge1xyXG4gICAgdnVlQXBwLmNvbXBvbmVudChcImNvbmZpZy1zZWxlY3RcIiwge1xyXG4gICAgICBwcm9wczogW1wiaXRlbVwiLCBcImV4dGVuc2lvblwiXSxcclxuICAgICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8ZGl2IHYtc2hvdz1cIml0ZW0/LnZpc2libGUgPz8gdHJ1ZVwiIGNsYXNzPVwiYWNvcmQtLWNvbmZpZy1zZWxlY3QgYWNvcmQtLWNvbmZpZy1pdGVtXCI+XHJcbiAgICAgICAgICA8ZGlzY29yZC1zZWxlY3QgQGNoYW5nZT1cIm9uQ2hhbmdlXCIgdi1tb2RlbD1cIml0ZW0udmFsdWVcIiA6b3B0aW9ucz1cIml0ZW0ub3B0aW9uc1wiIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIGAsXHJcbiAgICAgIG1ldGhvZHM6IHtcclxuICAgICAgICBvbkNoYW5nZShkYXRhKSB7XHJcbiAgICAgICAgICBldmVudHMuZW1pdChcclxuICAgICAgICAgICAgXCJFeHRlbnNpb25Db25maWdJbnRlcmFjdGlvblwiLFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgZXh0ZW5zaW9uOiB0aGlzLmV4dGVuc2lvbixcclxuICAgICAgICAgICAgICBpdGVtOiB0aGlzLml0ZW0sXHJcbiAgICAgICAgICAgICAgZGF0YVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICApXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn0iLCAiZXhwb3J0IGRlZmF1bHQge1xyXG4gIC8qKiBAcGFyYW0ge2ltcG9ydChcInZ1ZVwiKS5BcHB9IHZ1ZUFwcCAqL1xyXG4gIGxvYWQodnVlQXBwKSB7XHJcbiAgICB2dWVBcHAuY29tcG9uZW50KFwiY29uZmlnLXNwYWNlclwiLCB7XHJcbiAgICAgIHByb3BzOiBbXCJpdGVtXCIsIFwiZXh0ZW5zaW9uXCJdLFxyXG4gICAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxkaXYgdi1zaG93PVwiaXRlbT8udmlzaWJsZSA/PyB0cnVlXCIgY2xhc3M9XCJhY29yZC0tY29uZmlnLXNwYWNlciBhY29yZC0tY29uZmlnLWl0ZW1cIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJzcGFjZXJcIiA6c3R5bGU9XCJ7J2hlaWdodCc6IGl0ZW0/LmhlaWdodCwgJ3dpZHRoJzogaXRlbT8ud2lkdGh9XCIgLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgYCxcclxuICAgIH0pO1xyXG4gIH1cclxufSIsICJpbXBvcnQgZXZlbnRzIGZyb20gXCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9hcGkvZXZlbnRzL2luZGV4LmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgLyoqIEBwYXJhbSB7aW1wb3J0KFwidnVlXCIpLkFwcH0gdnVlQXBwICovXHJcbiAgbG9hZCh2dWVBcHApIHtcclxuICAgIHZ1ZUFwcC5jb21wb25lbnQoXCJjb25maWctdGV4dGFyZWFcIiwge1xyXG4gICAgICBwcm9wczogW1wiaXRlbVwiLCBcImV4dGVuc2lvblwiXSxcclxuICAgICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8ZGl2IHYtc2hvdz1cIml0ZW0/LnZpc2libGUgPz8gdHJ1ZVwiIGNsYXNzPVwiYWNvcmQtLWNvbmZpZy10ZXh0YXJlYSBhY29yZC0tY29uZmlnLWl0ZW1cIj5cclxuICAgICAgICAgIDxkaXNjb3JkLXRleHRhcmVhIEBpbnB1dD1cIm9uSW5wdXRcIiB2LW1vZGVsPVwiaXRlbS52YWx1ZVwiIDp0eXBlPVwiaXRlbS5pbnB1dFR5cGVcIiA6cGxhY2Vob2xkZXI9XCJpdGVtLnBsYWNlaG9sZGVyXCIgOm1heGxlbmd0aD1cIml0ZW0ubWF4bGVuZ3RoXCIgOmNvbHM9XCJpdGVtLmNvbHNcIiA6cm93cz1cIml0ZW0ucm93c1wiIDpzdHlsZT1cInsnaGVpZ2h0JzogaXRlbT8uaGVpZ2h0LCAnd2lkdGgnOiBpdGVtPy53aWR0aH1cIiAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICBgLFxyXG4gICAgICBtZXRob2RzOiB7XHJcbiAgICAgICAgb25JbnB1dChkYXRhKSB7XHJcbiAgICAgICAgICBldmVudHMuZW1pdChcclxuICAgICAgICAgICAgXCJFeHRlbnNpb25Db25maWdJbnRlcmFjdGlvblwiLFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgZXh0ZW5zaW9uOiB0aGlzLmV4dGVuc2lvbixcclxuICAgICAgICAgICAgICBpdGVtOiB0aGlzLml0ZW0sXHJcbiAgICAgICAgICAgICAgZGF0YVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICApXHJcbiAgICAgICAgfSxcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59IiwgImV4cG9ydCBkZWZhdWx0IGBcbi5hY29yZC0tY29uZmlnLWl0ZW17d2lkdGg6MTAwJTtkaXNwbGF5OmZsZXh9LmFjb3JkLS1jb25maWctcm93e3dpZHRoOjEwMCU7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOnJvdztqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2VlbjthbGlnbi1pdGVtczpjZW50ZXI7Z2FwOjRweH0uYWNvcmQtLWNvbmZpZy1yb3cuaG9yaXpvbnRhbC1hbGlnbi1sZWZ0e2p1c3RpZnktY29udGVudDpmbGV4LXN0YXJ0fS5hY29yZC0tY29uZmlnLXJvdy5ob3Jpem9udGFsLWFsaWduLXJpZ2h0e2p1c3RpZnktY29udGVudDpmbGV4LWVuZH0uYWNvcmQtLWNvbmZpZy1yb3cuaG9yaXpvbnRhbC1hbGlnbi1jZW50ZXJ7anVzdGlmeS1jb250ZW50OmNlbnRlcn0uYWNvcmQtLWNvbmZpZy1yb3cuanVzdGlmeS1zcGFjZS1iZXR3ZWVue2p1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVufS5hY29yZC0tY29uZmlnLXJvdy5qdXN0aWZ5LXNwYWNlLWFyb3VuZHtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYXJvdW5kfS5hY29yZC0tY29uZmlnLXJvdy52ZXJ0aWNhbC1hbGlnbi10b3B7YWxpZ24taXRlbXM6ZmxleC1zdGFydH0uYWNvcmQtLWNvbmZpZy1yb3cudmVydGljYWwtYWxpZ24tYm90dG9te2FsaWduLWl0ZW1zOmZsZXgtZW5kfS5hY29yZC0tY29uZmlnLWNvbHVtbnt3aWR0aDoxMDAlO2Rpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpjb2x1bW47anVzdGlmeS1jb250ZW50OmZsZXgtc3RhcnQ7YWxpZ24taXRlbXM6Y2VudGVyO2dhcDo0cHh9LmFjb3JkLS1jb25maWctY29sdW1uLmhvcml6b250YWwtYWxpZ24tbGVmdHtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1zdGFydH0uYWNvcmQtLWNvbmZpZy1jb2x1bW4uaG9yaXpvbnRhbC1hbGlnbi1yaWdodHtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1lbmR9LmFjb3JkLS1jb25maWctY29sdW1uLmhvcml6b250YWwtYWxpZ24tY2VudGVye2p1c3RpZnktY29udGVudDpjZW50ZXJ9LmFjb3JkLS1jb25maWctY29sdW1uLmp1c3RpZnktc3BhY2UtYmV0d2VlbntqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2Vlbn0uYWNvcmQtLWNvbmZpZy1jb2x1bW4uanVzdGlmeS1zcGFjZS1hcm91bmR7anVzdGlmeS1jb250ZW50OnNwYWNlLWFyb3VuZH0uYWNvcmQtLWNvbmZpZy1jb2x1bW4udmVydGljYWwtYWxpZ24tdG9we2FsaWduLWl0ZW1zOmZsZXgtc3RhcnR9LmFjb3JkLS1jb25maWctY29sdW1uLnZlcnRpY2FsLWFsaWduLWJvdHRvbXthbGlnbi1pdGVtczpmbGV4LWVuZH0uYWNvcmQtLWNvbmZpZy1jb2x1bW4udmVydGljYWwtYWxpZ24tY2VudGVye2FsaWduLWl0ZW1zOmNlbnRlcn0uYWNvcmQtLWNvbmZpZy1oZWFkaW5ne2ZvbnQtc2l6ZToxLjJyZW07Zm9udC13ZWlnaHQ6NTAwO2NvbG9yOiNmNWY1ZjV9LmFjb3JkLS1jb25maWctcGFyYWdyYXBoe2ZvbnQtc2l6ZToxcmVtO2ZvbnQtd2VpZ2h0OjQwMDtjb2xvcjpyZ2JhKDI0NSwyNDUsMjQ1LC44NSl9LmFjb3JkLS1jb25maWctY2hlY2ssLmFjb3JkLS1jb25maWctYnV0dG9ue3dpZHRoOmZpdC1jb250ZW50fWA7XG4iLCAiaW1wb3J0IHBhdGNoZXIgZnJvbSBcIi4uLy4uLy4uLy4uLy4uLy4uL2FwaS9wYXRjaGVyL2luZGV4LmpzXCI7XHJcbmltcG9ydCBjb25maWdCdXR0b24gZnJvbSBcIi4vY29uZmlnLWJ1dHRvbi9pbmRleC5qc1wiO1xyXG5pbXBvcnQgY29uZmlnQ2hlY2sgZnJvbSBcIi4vY29uZmlnLWNoZWNrL2luZGV4LmpzXCI7XHJcbmltcG9ydCBjb25maWdDb2x1bW4gZnJvbSBcIi4vY29uZmlnLWNvbHVtbi9pbmRleC5qc1wiXHJcbmltcG9ydCBjb25maWdIZWFkaW5nIGZyb20gXCIuL2NvbmZpZy1oZWFkaW5nL2luZGV4LmpzXCI7XHJcbmltcG9ydCBjb25maWdJbnB1dCBmcm9tIFwiLi9jb25maWctaW5wdXQvaW5kZXguanNcIjtcclxuaW1wb3J0IGNvbmZpZ1BhcmFncmFwaCBmcm9tIFwiLi9jb25maWctcGFyYWdyYXBoL2luZGV4LmpzXCI7XHJcbmltcG9ydCBjb25maWdSb3cgZnJvbSBcIi4vY29uZmlnLXJvdy9pbmRleC5qc1wiO1xyXG5pbXBvcnQgY29uZmlnU2VsZWN0IGZyb20gXCIuL2NvbmZpZy1zZWxlY3QvaW5kZXguanNcIjtcclxuaW1wb3J0IGNvbmZpZ1NwYWNlciBmcm9tIFwiLi9jb25maWctc3BhY2VyL2luZGV4LmpzXCI7XHJcbmltcG9ydCBjb25maWdUZXh0YXJlYSBmcm9tIFwiLi9jb25maWctdGV4dGFyZWEvaW5kZXguanNcIjtcclxuXHJcbmltcG9ydCBjc3NUZXh0IGZyb20gXCIuL3N0eWxlLnNjc3NcIjtcclxucGF0Y2hlci5pbmplY3RDU1MoY3NzVGV4dCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgLyoqIEBwYXJhbSB7aW1wb3J0KFwidnVlXCIpLkFwcH0gdnVlQXBwICovXHJcbiAgbG9hZCh2dWVBcHApIHtcclxuICAgIGNvbmZpZ1BhcmFncmFwaC5sb2FkKHZ1ZUFwcCk7XHJcbiAgICBjb25maWdIZWFkaW5nLmxvYWQodnVlQXBwKTtcclxuICAgIGNvbmZpZ1NwYWNlci5sb2FkKHZ1ZUFwcCk7XHJcbiAgICBjb25maWdCdXR0b24ubG9hZCh2dWVBcHApO1xyXG4gICAgY29uZmlnQ2hlY2subG9hZCh2dWVBcHApO1xyXG4gICAgY29uZmlnSW5wdXQubG9hZCh2dWVBcHApO1xyXG4gICAgY29uZmlnU2VsZWN0LmxvYWQodnVlQXBwKTtcclxuICAgIGNvbmZpZ1RleHRhcmVhLmxvYWQodnVlQXBwKTtcclxuICAgIGNvbmZpZ0NvbHVtbi5sb2FkKHZ1ZUFwcCk7XHJcbiAgICBjb25maWdSb3cubG9hZCh2dWVBcHApO1xyXG4gIH1cclxufSIsICJleHBvcnQgZGVmYXVsdCBgXG4uYWNvcmQtLWluc3RhbGxlZC1leHRlbnNpb24tY2FyZHt3aWR0aDoxMDAlO2JhY2tncm91bmQtY29sb3I6IzJjMmUzMjtib3JkZXItcmFkaXVzOjhweDtkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1uO2dhcDo4cHg7cG9zaXRpb246cmVsYXRpdmV9LmFjb3JkLS1pbnN0YWxsZWQtZXh0ZW5zaW9uLWNhcmQ+LnN0YXR1cy1jb250YWluZXJ7cG9zaXRpb246YWJzb2x1dGU7dG9wOi05cHg7cmlnaHQ6OHB4O2JvcmRlci1yYWRpdXM6OTk5OXB4O3BhZGRpbmc6OHB4O2hlaWdodDoyNHB4O2Rpc3BsYXk6ZmxleDtnYXA6NnB4O2FsaWduLWl0ZW1zOmNlbnRlcjtiYWNrZ3JvdW5kLWNvbG9yOiMxZTFmMjJ9LmFjb3JkLS1pbnN0YWxsZWQtZXh0ZW5zaW9uLWNhcmQ+LnN0YXR1cy1jb250YWluZXI+LmxvYWRlZC1zdGF0ZXt3aWR0aDoxNHB4O2hlaWdodDoxNHB4O2JvcmRlci1yYWRpdXM6NTAlO2JhY2tncm91bmQtY29sb3I6IzgyODU4Zn0uYWNvcmQtLWluc3RhbGxlZC1leHRlbnNpb24tY2FyZD4uc3RhdHVzLWNvbnRhaW5lcj4ubG9hZGVkLXN0YXRlLmFjdGl2ZXtiYWNrZ3JvdW5kLWNvbG9yOiMyM2E1NWE7ZmlsdGVyOmRyb3Atc2hhZG93KDBweCAwcHggNHB4ICMyM2E1NWEpfS5hY29yZC0taW5zdGFsbGVkLWV4dGVuc2lvbi1jYXJkPi5zdGF0dXMtY29udGFpbmVyPi5kZXZlbG9wbWVudC1tb2RlLXdhcm5pbmd7Y29sb3I6I2YwYjIzMjtmaWx0ZXI6ZHJvcC1zaGFkb3coMHB4IDBweCA0cHggI2YwYjIzMik7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO2JvcmRlci1yYWRpdXM6NTAlfS5hY29yZC0taW5zdGFsbGVkLWV4dGVuc2lvbi1jYXJkPi50b3B7YmFja2dyb3VuZC1jb2xvcjojMjEyMjI1O2JvcmRlci1yYWRpdXM6OHB4O3dpZHRoOjEwMCU7cGFkZGluZzoxNnB4O2hlaWdodDoxMjhweDtkaXNwbGF5OmZsZXg7anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW59LmFjb3JkLS1pbnN0YWxsZWQtZXh0ZW5zaW9uLWNhcmQ+LnRvcD4ubGVmdHtkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1uO2hlaWdodDoxMDAlO2dhcDo0cHh9LmFjb3JkLS1pbnN0YWxsZWQtZXh0ZW5zaW9uLWNhcmQ+LnRvcD4ubGVmdD4udG9we2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpmbGV4LWVuZDtnYXA6NHB4fS5hY29yZC0taW5zdGFsbGVkLWV4dGVuc2lvbi1jYXJkPi50b3A+LmxlZnQ+LnRvcD4ubmFtZXtmb250LXNpemU6MS40cmVtO2ZvbnQtd2VpZ2h0OjUwMDtjb2xvcjojZmZmfS5hY29yZC0taW5zdGFsbGVkLWV4dGVuc2lvbi1jYXJkPi50b3A+LmxlZnQ+LnRvcD4udmVyc2lvbntmb250LXNpemU6MXJlbTtmb250LXdlaWdodDozMDA7Y29sb3I6cmdiYSgyNTUsMjU1LDI1NSwuNSl9LmFjb3JkLS1pbnN0YWxsZWQtZXh0ZW5zaW9uLWNhcmQ+LnRvcD4ubGVmdD4uYm90dG9te2Rpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpjb2x1bW47Z2FwOjhweH0uYWNvcmQtLWluc3RhbGxlZC1leHRlbnNpb24tY2FyZD4udG9wPi5sZWZ0Pi5ib3R0b20+LnRvcHtkaXNwbGF5OmZsZXh9LmFjb3JkLS1pbnN0YWxsZWQtZXh0ZW5zaW9uLWNhcmQ+LnRvcD4ubGVmdD4uYm90dG9tPi50b3A+LmF1dGhvcnN7ZGlzcGxheTpmbGV4O2dhcDoycHg7Zm9udC1zaXplOjEycHg7Zm9udC13ZWlnaHQ6MzAwO2NvbG9yOnJnYmEoMjU1LDI1NSwyNTUsLjQ1KX0uYWNvcmQtLWluc3RhbGxlZC1leHRlbnNpb24tY2FyZD4udG9wPi5sZWZ0Pi5ib3R0b20+LnRvcD4uYXV0aG9ycz4ubGFiZWx7Zm9udC13ZWlnaHQ6NTAwO21hcmdpbi1yaWdodDoycHh9LmFjb3JkLS1pbnN0YWxsZWQtZXh0ZW5zaW9uLWNhcmQ+LnRvcD4ubGVmdD4uYm90dG9tPi50b3A+LmF1dGhvcnMgLmF1dGhvcntkaXNwbGF5OmZsZXh9LmFjb3JkLS1pbnN0YWxsZWQtZXh0ZW5zaW9uLWNhcmQ+LnRvcD4ubGVmdD4uYm90dG9tPi50b3A+LmF1dGhvcnMgLmF1dGhvciAuaG92ZXJhYmxlOmhvdmVye2N1cnNvcjpwb2ludGVyO3RleHQtZGVjb3JhdGlvbjp1bmRlcmxpbmV9LmFjb3JkLS1pbnN0YWxsZWQtZXh0ZW5zaW9uLWNhcmQ+LnRvcD4ubGVmdD4uYm90dG9tPi5ib3R0b20+LmRlc2NyaXB0aW9ue2ZvbnQtc2l6ZToxNnB4O2NvbG9yOnJnYmEoMjU1LDI1NSwyNTUsLjc1KX0uYWNvcmQtLWluc3RhbGxlZC1leHRlbnNpb24tY2FyZD4udG9wPi5yaWdodHtkaXNwbGF5OmZsZXg7aGVpZ2h0OjEwMCU7ZmxleC1kaXJlY3Rpb246Y29sdW1uO2p1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVuO2FsaWduLWl0ZW1zOmZsZXgtZW5kfS5hY29yZC0taW5zdGFsbGVkLWV4dGVuc2lvbi1jYXJkPi50b3A+LnJpZ2h0Pi50b3B7ZGlzcGxheTpmbGV4fS5hY29yZC0taW5zdGFsbGVkLWV4dGVuc2lvbi1jYXJkPi50b3A+LnJpZ2h0Pi50b3A+LmNvbnRyb2xze2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7Z2FwOjhweH0uYWNvcmQtLWluc3RhbGxlZC1leHRlbnNpb24tY2FyZD4udG9wPi5yaWdodD4udG9wPi5jb250cm9scyAuY29udHJvbHtkaXNwbGF5OmZsZXg7cGFkZGluZzo4cHg7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDAsMCwwLC4yNSk7Ym9yZGVyLXJhZGl1czo4cHg7Y29sb3I6I2Y1ZjVmNTtjdXJzb3I6cG9pbnRlcn0uYWNvcmQtLWluc3RhbGxlZC1leHRlbnNpb24tY2FyZD4udG9wPi5yaWdodD4udG9wPi5jb250cm9scyAuY29udHJvbDpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMCwwLDAsLjUpfS5hY29yZC0taW5zdGFsbGVkLWV4dGVuc2lvbi1jYXJkPi50b3A+LnJpZ2h0Pi5ib3R0b217ZGlzcGxheTpmbGV4fS5hY29yZC0taW5zdGFsbGVkLWV4dGVuc2lvbi1jYXJkPi50b3A+LnJpZ2h0Pi5ib3R0b20+LnNldHRpbmdze2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7anVzdGlmeS1jb250ZW50OmZsZXgtZW5kO2N1cnNvcjpwb2ludGVyO2ZvbnQtd2VpZ2h0OjMwMDtjb2xvcjpyZ2JhKDI1NSwyNTUsMjU1LC43NSk7Z2FwOjhweH0uYWNvcmQtLWluc3RhbGxlZC1leHRlbnNpb24tY2FyZD4udG9wPi5yaWdodD4uYm90dG9tPi5zZXR0aW5ncyBzdmd7cGFkZGluZzo0cHg7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDAsMCwwLC4yNSk7Ym9yZGVyLXJhZGl1czo0cHg7Y29sb3I6I2ZmZn0uYWNvcmQtLWluc3RhbGxlZC1leHRlbnNpb24tY2FyZD4uYm90dG9te2JvcmRlci1yYWRpdXM6OHB4O3dpZHRoOjEwMCU7cGFkZGluZzoxNnB4fWA7XG4iLCAiaW1wb3J0IGkxOG4gZnJvbSBcIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2FwaS9pMThuL2luZGV4LmpzXCI7XHJcbmltcG9ydCBwYXRjaGVyIGZyb20gXCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9hcGkvcGF0Y2hlci9pbmRleC5qc1wiO1xyXG5pbXBvcnQgdWkgZnJvbSBcIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2FwaS91aS9pbmRleC5qc1wiO1xyXG5pbXBvcnQgZXh0ZW5zaW9ucyBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vYXBpL2V4dGVuc2lvbnMvaW5kZXguanNcIjtcclxuaW1wb3J0IGV2ZW50cyBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vYXBpL2V2ZW50cy9pbmRleC5qc1wiO1xyXG5cclxuaW1wb3J0IGNzc1RleHQgZnJvbSBcIi4vc3R5bGUuc2Nzc1wiO1xyXG5wYXRjaGVyLmluamVjdENTUyhjc3NUZXh0KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAvKiogQHBhcmFtIHtpbXBvcnQoXCJ2dWVcIikuQXBwfSB2dWVBcHAgKi9cclxuICBsb2FkKHZ1ZUFwcCkge1xyXG4gICAgdnVlQXBwLmNvbXBvbmVudChcclxuICAgICAgXCJpbnN0YWxsZWQtZXh0ZW5zaW9uLWNhcmRcIixcclxuICAgICAge1xyXG4gICAgICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWNvcmQtLWluc3RhbGxlZC1leHRlbnNpb24tY2FyZFwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdHVzLWNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsb2FkZWQtc3RhdGVcIiA6Y2xhc3M9XCJ7J2FjdGl2ZSc6ICEhdGhpcy5jb25maWdDYWNoZX1cIiA6YWNvcmQtLXRvb2x0aXAtY29udGVudD1cImkxOG5Gb3JtYXQoISF0aGlzLmNvbmZpZ0NhY2hlID8gJ0VYVEVOU0lPTl9BQ1RJVkUnIDogJ0VYVEVOU0lPTl9JTkFDVElWRScpXCI+PC9kaXY+XHJcbiAgICAgICAgICAgICAgPGRpdiB2LWlmPVwiZXh0ZW5zaW9uLm1hbmlmZXN0Lm1vZGUgPT0gJ2RldmVsb3BtZW50J1wiIGNsYXNzPVwiZGV2ZWxvcG1lbnQtbW9kZS13YXJuaW5nXCIgOmFjb3JkLS10b29sdGlwLWNvbnRlbnQ9XCJpMThuRm9ybWF0KCdFWFRFTlNJT05fSU5fREVWRUxPUE1FTlRfTU9ERScpXCI+XHJcbiAgICAgICAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgd2lkdGg9XCIxNlwiIGhlaWdodD1cIjE2XCI+XHJcbiAgICAgICAgICAgICAgICAgIDxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTEyIDIyQzYuNDc3IDIyIDIgMTcuNTIzIDIgMTJTNi40NzcgMiAxMiAyczEwIDQuNDc3IDEwIDEwLTQuNDc3IDEwLTEwIDEwem0tMS03djJoMnYtMmgtMnptMC04djZoMlY3aC0yelwiLz5cclxuICAgICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRvcFwiPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsZWZ0XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidG9wXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJuYW1lXCI+e3sgaTE4bkxvY2FsaXplKGV4dGVuc2lvbi5tYW5pZmVzdC5hYm91dC5uYW1lKSB9fTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidmVyc2lvblwiPnZ7e2V4dGVuc2lvbi5tYW5pZmVzdC5hYm91dC52ZXJzaW9ufX08L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJvdHRvbVwiPlxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidG9wXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImF1dGhvcnNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsYWJlbFwiPnt7IGkxOG5Gb3JtYXQoJ0FVVEhPUlMnKSB9fTo8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgdi1mb3I9XCIoYXV0aG9yLCBhdXRob3JJZHgpIGluIGV4dGVuc2lvbi5tYW5pZmVzdC5hYm91dC5hdXRob3JzXCIgY2xhc3M9XCJhdXRob3JcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm5hbWVcIiA6Y2xhc3M9XCJ7J2hvdmVyYWJsZSc6ICEhYXV0aG9yLmlkfVwiIEBjbGljaz1cIm9uQXV0aG9yQ2xpY2soYXV0aG9yKVwiPnt7IGkxOG5Mb2NhbGl6ZShhdXRob3IubmFtZSkgfX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiB2LWlmPVwiYXV0aG9ySWR4ICE9IChleHRlbnNpb24ubWFuaWZlc3QuYWJvdXQuYXV0aG9ycy5sZW5ndGgtMSlcIiBjbGFzcz1cImNvbW1hXCI+LDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYm90dG9tXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRlc2NyaXB0aW9uXCI+e3sgaTE4bkxvY2FsaXplKGV4dGVuc2lvbi5tYW5pZmVzdC5hYm91dC5kZXNjcmlwdGlvbikgfX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicmlnaHRcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0b3BcIj5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRyb2xzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRyb2xcIiBAY2xpY2s9XCJvblVwZGF0ZUV4dGVuc2lvblwiIDphY29yZC0tdG9vbHRpcC1jb250ZW50PVwiaTE4bkZvcm1hdCgnVVBEQVRFX0VYVEVOU0lPTicpXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgd2lkdGg9XCIyMFwiIGhlaWdodD1cIjIwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTUuNDYzIDQuNDMzQTkuOTYxIDkuOTYxIDAgMCAxIDEyIDJjNS41MjMgMCAxMCA0LjQ3NyAxMCAxMCAwIDIuMTM2LS42NyA0LjExNi0xLjgxIDUuNzRMMTcgMTJoM0E4IDggMCAwIDAgNi40NiA2LjIyOGwtLjk5Ny0xLjc5NXptMTMuMDc0IDE1LjEzNEE5Ljk2MSA5Ljk2MSAwIDAgMSAxMiAyMkM2LjQ3NyAyMiAyIDE3LjUyMyAyIDEyYzAtMi4xMzYuNjctNC4xMTYgMS44MS01Ljc0TDcgMTJINGE4IDggMCAwIDAgMTMuNTQgNS43NzJsLjk5NyAxLjc5NXpcIi8+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udHJvbFwiIEBjbGljaz1cIm9uVW5pbnN0YWxsRXh0ZW5zaW9uXCIgOmFjb3JkLS10b29sdGlwLWNvbnRlbnQ9XCJpMThuRm9ybWF0KCdVTklOU1RBTExfRVhURU5TSU9OJylcIj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiB3aWR0aD1cIjIwXCIgaGVpZ2h0PVwiMjBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNMTcgNmg1djJoLTJ2MTNhMSAxIDAgMCAxLTEgMUg1YTEgMSAwIDAgMS0xLTFWOEgyVjZoNVYzYTEgMSAwIDAgMSAxLTFoOGExIDEgMCAwIDEgMSAxdjN6bTEgMkg2djEyaDEyVjh6bS05IDNoMnY2SDl2LTZ6bTQgMGgydjZoLTJ2LTZ6TTkgNHYyaDZWNEg5elwiLz5cclxuICAgICAgICAgICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250cm9sXCIgQGNsaWNrPVwib25Ub2dnbGVFeHRlbnNpb25cIiA6YWNvcmQtLXRvb2x0aXAtY29udGVudD1cImkxOG5Gb3JtYXQoZW5hYmxlZCA/ICdESVNBQkxFX0VYVEVOU0lPTicgOiAnRU5BQkxFX0VYVEVOU0lPTicpXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8c3ZnIHYtaWY9XCIhZW5hYmxlZFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgd2lkdGg9XCIyMFwiIGhlaWdodD1cIjIwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTggN2E1IDUgMCAxIDAgMCAxMGg4YTUgNSAwIDAgMCAwLTEwSDh6bTAtMmg4YTcgNyAwIDAgMSAwIDE0SDhBNyA3IDAgMCAxIDggNXptMCAxMGEzIDMgMCAxIDEgMC02IDMgMyAwIDAgMSAwIDZ6XCIvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8c3ZnIHYtZWxzZSB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIHdpZHRoPVwiMjBcIiBoZWlnaHQ9XCIyMFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk04IDVoOGE3IDcgMCAwIDEgMCAxNEg4QTcgNyAwIDAgMSA4IDV6bTggMTBhMyAzIDAgMSAwIDAtNiAzIDMgMCAwIDAgMCA2elwiLz5cclxuICAgICAgICAgICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJvdHRvbVwiPlxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IHYtaWY9XCJleHRlbnNpb24ubWFuaWZlc3Q/LmNvbmZpZz8ubGVuZ3RoICYmICEhY29uZmlnQ2FjaGVcIiBjbGFzcz1cInNldHRpbmdzXCIgQGNsaWNrPVwiZXhwYW5kZWQgPSAhZXhwYW5kZWRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dFwiPnt7aTE4bkZvcm1hdChleHBhbmRlZCA/ICdISURFX1NFVFRJTkdTJyA6ICdTSE9XX1NFVFRJTkdTJyl9fTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxzdmcgdi1pZj1cIiFleHBhbmRlZFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk0xMiAxNWwtNC4yNDMtNC4yNDMgMS40MTUtMS40MTRMMTIgMTIuMTcybDIuODI4LTIuODI5IDEuNDE1IDEuNDE0elwiLz5cclxuICAgICAgICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgICAgICAgICA8c3ZnIHYtZWxzZSB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNMTIgMTEuODI4bC0yLjgyOCAyLjgyOS0xLjQxNS0xLjQxNEwxMiA5bDQuMjQzIDQuMjQzLTEuNDE1IDEuNDE0TDEyIDExLjgyOHpcIi8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IHYtaWY9XCJleHBhbmRlZFwiIGNsYXNzPVwiYm90dG9tXCI+XHJcbiAgICAgICAgICAgICAgPGNvbmZpZy1jb2x1bW4gOmV4dGVuc2lvbj1cImlkXCIgOml0ZW09XCJ7Y2hpbGRyZW46IGNvbmZpZ0NhY2hlLCBnYXA6ICc4cHgnfVwiLz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICBgLFxyXG4gICAgICAgIGRhdGEoKSB7XHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBleHBhbmRlZDogZmFsc2UsXHJcbiAgICAgICAgICAgIGNvbmZpZ0NhY2hlOiBudWxsLFxyXG4gICAgICAgICAgICBlbmFibGVkOiBleHRlbnNpb25zLnN0b3JhZ2UuaW5zdGFsbGVkLmdob3N0W3RoaXMuaWRdLmNvbmZpZy5lbmFibGVkXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbWV0aG9kczoge1xyXG4gICAgICAgICAgaTE4bkZvcm1hdDogaTE4bi5mb3JtYXQsXHJcbiAgICAgICAgICBpMThuTG9jYWxpemU6IGkxOG4ubG9jYWxpemUsXHJcbiAgICAgICAgICBvbkF1dGhvckNsaWNrKGF1dGhvcikge1xyXG4gICAgICAgICAgICBpZiAoYXV0aG9yLmlkKSB1aS5tb2RhbHMuc2hvdy51c2VyKGF1dGhvci5pZCk7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgb25FeHRlbnNpb25Mb2FkZWQoeyBpZCB9KSB7XHJcbiAgICAgICAgICAgIGlmIChpZCA9PT0gdGhpcy5pZCkge1xyXG4gICAgICAgICAgICAgIHRoaXMuY29uZmlnQ2FjaGUgPSBleHRlbnNpb25zLl9fY2FjaGVfXy5jb25maWdbdGhpcy5pZF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBvbkV4dGVuc2lvblVubG9hZGVkKHsgaWQgfSkge1xyXG4gICAgICAgICAgICBpZiAoaWQgPT09IHRoaXMuaWQpIHtcclxuICAgICAgICAgICAgICB0aGlzLmNvbmZpZ0NhY2hlID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIG9uVG9nZ2xlRXh0ZW5zaW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgZW5hYmxlZCA9IGV4dGVuc2lvbnMuc3RvcmFnZS5pbnN0YWxsZWQuZ2hvc3RbdGhpcy5pZF0uY29uZmlnLmVuYWJsZWQ7XHJcbiAgICAgICAgICAgIGxldCBuZXdTdGF0ZSA9ICFlbmFibGVkO1xyXG4gICAgICAgICAgICBleHRlbnNpb25zLnN0b3JhZ2UuaW5zdGFsbGVkLnN0b3JlW3RoaXMuaWRdLmNvbmZpZy5lbmFibGVkID0gbmV3U3RhdGU7XHJcbiAgICAgICAgICAgIHRoaXMuZW5hYmxlZCA9IG5ld1N0YXRlO1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgIGlmIChuZXdTdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgZXh0ZW5zaW9ucy5sb2FkKHRoaXMuaWQpO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBleHRlbnNpb25zLnVubG9hZCh0aGlzLmlkKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggeyB9XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgb25VcGRhdGVFeHRlbnNpb24oKSB7XHJcbiAgICAgICAgICAgIGV4dGVuc2lvbnMudXBkYXRlKHRoaXMuaWQpO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIG9uVW5pbnN0YWxsRXh0ZW5zaW9uKCkge1xyXG4gICAgICAgICAgICBleHRlbnNpb25zLnVuaW5zdGFsbCh0aGlzLmlkKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHByb3BzOiBbXCJpZFwiLCBcImV4dGVuc2lvblwiXSxcclxuICAgICAgICBtb3VudGVkKCkge1xyXG4gICAgICAgICAgdGhpcy5jb25maWdDYWNoZSA9IGV4dGVuc2lvbnMuX19jYWNoZV9fLmNvbmZpZ1t0aGlzLmlkXTtcclxuICAgICAgICAgIGV2ZW50cy5vbihcIkV4dGVuc2lvbkxvYWRlZFwiLCB0aGlzLm9uRXh0ZW5zaW9uTG9hZGVkKTtcclxuICAgICAgICAgIGV2ZW50cy5vbihcIkV4dGVuc2lvblVubG9hZGVkXCIsIHRoaXMub25FeHRlbnNpb25VbmxvYWRlZCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICB1bm1vdW50ZWQoKSB7XHJcbiAgICAgICAgICBldmVudHMub2ZmKFwiRXh0ZW5zaW9uTG9hZGVkXCIsIHRoaXMub25FeHRlbnNpb25Mb2FkZWQpO1xyXG4gICAgICAgICAgZXZlbnRzLm9mZihcIkV4dGVuc2lvblVubG9hZGVkXCIsIHRoaXMub25FeHRlbnNpb25VbmxvYWRlZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICApO1xyXG4gIH1cclxufSIsICJleHBvcnQgZGVmYXVsdCBgXG4uYWNvcmQtLXN0b3JlLWV4dGVuc2lvbi1jYXJke3dpZHRoOjI3NXB4O2hlaWdodDoyNTBweDtkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1uO2JvcmRlci1yYWRpdXM6NHB4O2NvbnRhaW46Y29udGVudDtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMCwwLDAsLjEpO2JveC1zaGFkb3c6dmFyKC0tZWxldmF0aW9uLW1lZGl1bSl9LmFjb3JkLS1zdG9yZS1leHRlbnNpb24tY2FyZD4ucHJldmlld3t3aWR0aDoxMDAlO2hlaWdodDoxMDBweDtkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1uO2p1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVuO2FsaWduLWl0ZW1zOmNlbnRlcjtiYWNrZ3JvdW5kLWNvbG9yOnZhcigtLWJyYW5kLTUwMCk7YmFja2dyb3VuZC1wb3NpdGlvbjpjZW50ZXI7YmFja2dyb3VuZC1zaXplOmNvdmVyfS5hY29yZC0tc3RvcmUtZXh0ZW5zaW9uLWNhcmQ+LnByZXZpZXc+LmNvbnRyb2xze3BhZGRpbmc6OHB4O2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47d2lkdGg6MTAwJX0uYWNvcmQtLXN0b3JlLWV4dGVuc2lvbi1jYXJkPi5wcmV2aWV3Pi5jb250cm9scyAuZ297YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDAsMCwwLC41KTtib3gtc2hhZG93OjBweCAwcHggNHB4IHJnYmEoMCwwLDAsLjUpO2JvcmRlci1yYWRpdXM6NTAlO3dpZHRoOjI0cHg7aGVpZ2h0OjI0cHg7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO2NvbG9yOnZhcigtLWhlYWRlci1wcmltYXJ5KTtmb250LXdlaWdodDo2MDA7Y3Vyc29yOnBvaW50ZXJ9LmFjb3JkLS1zdG9yZS1leHRlbnNpb24tY2FyZD4ucHJldmlldz4ubmFtZS1jb250YWluZXJ7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO2NvbG9yOnZhcigtLWhlYWRlci1wcmltYXJ5KTtwYWRkaW5nOjhweH0uYWNvcmQtLXN0b3JlLWV4dGVuc2lvbi1jYXJkPi5wcmV2aWV3Pi5uYW1lLWNvbnRhaW5lcj4ubmFtZXtmb250LXNpemU6MTRweDtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMCwwLDAsLjUpO2JveC1zaGFkb3c6MHB4IDBweCA0cHggcmdiYSgwLDAsMCwuNSk7Ym9yZGVyLXJhZGl1czo5OTk5cHg7cGFkZGluZzo0cHggOHB4fS5hY29yZC0tc3RvcmUtZXh0ZW5zaW9uLWNhcmQ+LmluZm8tY29udGFpbmVye2Rpc3BsYXk6ZmxleDtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2VlbjtmbGV4LWRpcmVjdGlvbjpjb2x1bW47cGFkZGluZzo4cHg7aGVpZ2h0OjE1MHB4O3dpZHRoOjEwMCV9LmFjb3JkLS1zdG9yZS1leHRlbnNpb24tY2FyZD4uaW5mby1jb250YWluZXI+LnRvcHtkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1uO2dhcDo0cHg7aGVpZ2h0OjEwMCV9LmFjb3JkLS1zdG9yZS1leHRlbnNpb24tY2FyZD4uaW5mby1jb250YWluZXI+LnRvcD4ubmFtZS1jb250YWluZXJ7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtnYXA6NHB4O3dpZHRoOjEwMCV9LmFjb3JkLS1zdG9yZS1leHRlbnNpb24tY2FyZD4uaW5mby1jb250YWluZXI+LnRvcD4ubmFtZS1jb250YWluZXI+Lm5hbWV7Zm9udC1zaXplOjE2cHg7Zm9udC13ZWlnaHQ6NTAwO2NvbG9yOnZhcigtLWhlYWRlci1wcmltYXJ5KX0uYWNvcmQtLXN0b3JlLWV4dGVuc2lvbi1jYXJkPi5pbmZvLWNvbnRhaW5lcj4udG9wPi5uYW1lLWNvbnRhaW5lcj4udmVyc2lvbntmb250LXNpemU6MTJweDtmb250LXdlaWdodDo1MDA7Y29sb3I6dmFyKC0taGVhZGVyLXByaW1hcnkpO29wYWNpdHk6LjV9LmFjb3JkLS1zdG9yZS1leHRlbnNpb24tY2FyZD4uaW5mby1jb250YWluZXI+LnRvcD4uZGVzY3JpcHRpb257Zm9udC1zaXplOjE0cHg7Zm9udC13ZWlnaHQ6MzAwO2NvbG9yOnZhcigtLWhlYWRlci1wcmltYXJ5KTtvcGFjaXR5Oi43NTt3aWR0aDoxMDAlfS5hY29yZC0tc3RvcmUtZXh0ZW5zaW9uLWNhcmQ+LmluZm8tY29udGFpbmVyPi5ib3R0b217ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmZsZXgtc3RhcnQ7anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47aGVpZ2h0OjEwMCV9LmFjb3JkLS1zdG9yZS1leHRlbnNpb24tY2FyZD4uaW5mby1jb250YWluZXI+LmJvdHRvbT4ubGVmdHtoZWlnaHQ6MTAwJTtkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1uO2FsaWduLWl0ZW1zOmZsZXgtc3RhcnQ7anVzdGlmeS1jb250ZW50OmZsZXgtZW5kfS5hY29yZC0tc3RvcmUtZXh0ZW5zaW9uLWNhcmQ+LmluZm8tY29udGFpbmVyPi5ib3R0b20+LmxlZnQ+LmF1dGhvcnN7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOmNvbHVtbjtnYXA6NHB4fS5hY29yZC0tc3RvcmUtZXh0ZW5zaW9uLWNhcmQ+LmluZm8tY29udGFpbmVyPi5ib3R0b20+LmxlZnQ+LmF1dGhvcnMgLmF1dGhvcntkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2JvcmRlci1yYWRpdXM6OTk5OXB4O2JhY2tncm91bmQtY29sb3I6cmdiYSgwLDAsMCwuMSk7Y3Vyc29yOnBvaW50ZXJ9LmFjb3JkLS1zdG9yZS1leHRlbnNpb24tY2FyZD4uaW5mby1jb250YWluZXI+LmJvdHRvbT4ubGVmdD4uYXV0aG9ycyAuYXV0aG9yPi5pbWFnZXtib3JkZXItcmFkaXVzOjUwJTt3aWR0aDoxOHB4O2hlaWdodDoxOHB4O2JhY2tncm91bmQtY29sb3I6dmFyKC0tYnJhbmQtNTAwKTtiYWNrZ3JvdW5kLXBvc2l0aW9uOmNlbnRlcjtiYWNrZ3JvdW5kLXNpemU6Y292ZXJ9LmFjb3JkLS1zdG9yZS1leHRlbnNpb24tY2FyZD4uaW5mby1jb250YWluZXI+LmJvdHRvbT4ubGVmdD4uYXV0aG9ycyAuYXV0aG9yPi5uYW1le2ZvbnQtc2l6ZToxMHB4O2ZvbnQtd2VpZ2h0OjQwMDtjb2xvcjp2YXIoLS1oZWFkZXItcHJpbWFyeSk7b3BhY2l0eTouNzU7cGFkZGluZzo2cHh9LmFjb3JkLS1zdG9yZS1leHRlbnNpb24tY2FyZD4uaW5mby1jb250YWluZXI+LmJvdHRvbT4ucmlnaHR7aGVpZ2h0OjEwMCU7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOmNvbHVtbjthbGlnbi1pdGVtczpmbGV4LWVuZDtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1lbmR9YDtcbiIsICJpbXBvcnQgbW9kYWxzIGZyb20gXCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9hcGkvdWkvbW9kYWxzLmpzeFwiO1xyXG5pbXBvcnQgaTE4biBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vYXBpL2kxOG4vaW5kZXguanNcIjtcclxuaW1wb3J0IHBhdGNoZXIgZnJvbSBcIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2FwaS9wYXRjaGVyL2luZGV4LmpzXCI7XHJcblxyXG5pbXBvcnQgY3NzVGV4dCBmcm9tIFwiLi9zdHlsZS5zY3NzXCI7XHJcbnBhdGNoZXIuaW5qZWN0Q1NTKGNzc1RleHQpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIC8qKiBAcGFyYW0ge2ltcG9ydChcInZ1ZVwiKS5BcHB9IHZ1ZUFwcCAqL1xyXG4gIGxvYWQodnVlQXBwKSB7XHJcbiAgICB2dWVBcHAuY29tcG9uZW50KFxyXG4gICAgICBcInN0b3JlLWV4dGVuc2lvbi1jYXJkXCIsXHJcbiAgICAgIHtcclxuICAgICAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImFjb3JkLS1zdG9yZS1leHRlbnNpb24tY2FyZFwiPlxyXG4gICAgICAgICAgICA8ZGl2IHYtaWY9XCJleHRlbnNpb24ucHJldmlld3M/Lmxlbmd0aFwiIGNsYXNzPVwicHJldmlld1wiIDpzdHlsZT1cInsgYmFja2dyb3VuZEltYWdlOiAndXJsKCcgKyBleHRlbnNpb24ucHJldmlld3Nbc2VsZWN0ZWRQcmV2aWV3XS5pbWFnZSArICcpJyB9XCI+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRyb2xzXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ28gZ28tYmFja1wiIEBjbGljaz1cImdvQmFja1wiPlxyXG4gICAgICAgICAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD1cIk0xMS44MjggMTJsMi44MjkgMi44MjgtMS40MTQgMS40MTVMOSAxMmw0LjI0My00LjI0MyAxLjQxNCAxLjQxNUwxMS44MjggMTJ6XCIgZmlsbD1cImN1cnJlbnRDb2xvclwiIC8+XHJcbiAgICAgICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ28gZ28tZm9yd2FyZFwiIEBjbGljaz1cImdvRm9yd2FyZFwiPlxyXG4gICAgICAgICAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD1cIk0xMi4xNzIgMTJMOS4zNDMgOS4xNzJsMS40MTQtMS40MTVMMTUgMTJsLTQuMjQzIDQuMjQzLTEuNDE0LTEuNDE1elwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIiAvPlxyXG4gICAgICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJuYW1lLWNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm5hbWVcIj5cclxuICAgICAgICAgICAgICAgICAge3sgZXh0ZW5zaW9uLnByZXZpZXdzW3NlbGVjdGVkUHJldmlld10ubmFtZSB9fVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IHYtZWxzZSBjbGFzcz1cInByZXZpZXcgbm8tcHJldmlld1wiPjwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5mby1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidG9wXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibmFtZS1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm5hbWVcIj57eyBpMThuTG9jYWxpemUoZXh0ZW5zaW9uLm5hbWUpIH19PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ2ZXJzaW9uXCI+dnt7IGV4dGVuc2lvbi52ZXJzaW9uIH19PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkZXNjcmlwdGlvblwiPnt7IGkxOG5Mb2NhbGl6ZShleHRlbnNpb24uZGVzY3JpcHRpb24pIH19PC9kaXY+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJvdHRvbVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxlZnRcIj5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImF1dGhvcnNcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHYtZm9yPVwiYXV0aG9yIGluIGV4dGVuc2lvbi5hdXRob3JzXCIgY2xhc3M9XCJhdXRob3JcIiA6a2V5PVwiYXV0aG9yLm5hbWVcIiBAY2xpY2s9XCJzaG93UHJvZmlsZShhdXRob3IuaWQpXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW1hZ2VcIiA6c3R5bGU9XCJ7IGJhY2tncm91bmRJbWFnZTogJ3VybCgnICsgYXV0aG9yLmltYWdlICsgJyknIH1cIj48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJuYW1lXCI+e3sgYXV0aG9yLm5hbWUgfX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyaWdodFwiPlxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnV0dG9uc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIEBjbGljaz1cImluc3RhbGxPclVuaW5zdGFsbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPGRpc2NvcmQtYnV0dG9uIDp2YWx1ZT1cImkxOG5Gb3JtYXQoZXh0ZW5zaW9uLmluc3RhbGxlZCA/ICdVTklOU1RBTEwnIDogJ0lOU1RBTEwnKVwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIGAsXHJcbiAgICAgICAgcHJvcHM6IFtcImV4dGVuc2lvblwiXSxcclxuICAgICAgICBkYXRhKCkge1xyXG4gICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgc2VsZWN0ZWRQcmV2aWV3OiAwLFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG1ldGhvZHM6IHtcclxuICAgICAgICAgIGkxOG5Gb3JtYXQ6IGkxOG4uZm9ybWF0LFxyXG4gICAgICAgICAgaTE4bkxvY2FsaXplOiBpMThuLmxvY2FsaXplLFxyXG4gICAgICAgICAgaW5zdGFsbE9yVW5pbnN0YWxsKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5leHRlbnNpb24uaW5zdGFsbGVkKSB7XHJcbiAgICAgICAgICAgICAgLy8gdW5pbnN0YWxsXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgLy8gaW5zdGFsbFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgZ29CYWNrKCkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkUHJldmlldy0tO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZFByZXZpZXcgPCAwKSB0aGlzLnNlbGVjdGVkUHJldmlldyA9IHRoaXMuZXh0ZW5zaW9uLnByZXZpZXdzLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgZ29Gb3J3YXJkKCkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkUHJldmlldysrO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZFByZXZpZXcgPj0gdGhpcy5leHRlbnNpb24ucHJldmlld3MubGVuZ3RoKSB0aGlzLnNlbGVjdGVkUHJldmlldyA9IDA7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgc2hvd1Byb2ZpbGUocHJvZmlsZUlkKSB7XHJcbiAgICAgICAgICAgIG1vZGFscy5zaG93LnVzZXIocHJvZmlsZUlkKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIClcclxuICB9XHJcbn0iLCAiaW1wb3J0IGluc3RhbGxlZEV4dGVuc2lvbkNhcmQgZnJvbSBcIi4vaW5zdGFsbGVkLWV4dGVuc2lvbi1jYXJkL2luZGV4LmpzXCI7XHJcbmltcG9ydCBzdG9yZUV4dGVuc2lvbkNhcmQgZnJvbSBcIi4vc3RvcmUtZXh0ZW5zaW9uLWNhcmQvaW5kZXguanNcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIC8qKiBAcGFyYW0ge2ltcG9ydChcInZ1ZVwiKS5BcHB9IHZ1ZUFwcCAqL1xyXG4gIGxvYWQodnVlQXBwKSB7XHJcbiAgICBzdG9yZUV4dGVuc2lvbkNhcmQubG9hZCh2dWVBcHApO1xyXG4gICAgaW5zdGFsbGVkRXh0ZW5zaW9uQ2FyZC5sb2FkKHZ1ZUFwcCk7XHJcbiAgfVxyXG59IiwgIlxyXG5pbXBvcnQgY29uZmlnQ29tcG9uZW50cyBmcm9tIFwiLi9jb25maWcvaW5kZXguanNcIjtcclxuaW1wb3J0IGNhcmRDb21wb25lbnRzIGZyb20gXCIuL2NhcmRzL2luZGV4LmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgLyoqIEBwYXJhbSB7aW1wb3J0KFwidnVlXCIpLkFwcH0gdnVlQXBwICovXHJcbiAgbG9hZCh2dWVBcHApIHtcclxuICAgIGNvbmZpZ0NvbXBvbmVudHMubG9hZCh2dWVBcHApO1xyXG4gICAgY2FyZENvbXBvbmVudHMubG9hZCh2dWVBcHApO1xyXG4gIH1cclxufSIsICJpbXBvcnQgcGFnZXMgZnJvbSBcIi4vcGFnZXMvaW5kZXguanNcIjtcclxuaW1wb3J0IGNvbXBvbmVudHMgZnJvbSBcIi4vY29tcG9uZW50cy9pbmRleC5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIC8qKiBAcGFyYW0ge2ltcG9ydChcInZ1ZVwiKS5BcHB9IHZ1ZUFwcCAqL1xyXG4gIGxvYWQodnVlQXBwKSB7XHJcbiAgICBjb21wb25lbnRzLmxvYWQodnVlQXBwKTtcclxuICAgIHBhZ2VzLmxvYWQodnVlQXBwKTtcclxuICB9XHJcbn0iLCAiaW1wb3J0IGRvbSBmcm9tIFwiLi4vLi4vYXBpL2RvbS9pbmRleC5qc1wiO1xyXG5pbXBvcnQgd2VicGFjayBmcm9tIFwiLi4vLi4vYXBpL21vZHVsZXMvd2VicGFjay5qc1wiO1xyXG5pbXBvcnQgcGF0Y2hlciBmcm9tIFwiLi4vLi4vYXBpL3BhdGNoZXIvaW5kZXguanNcIjtcclxuaW1wb3J0IHV0aWxzIGZyb20gXCIuLi8uLi9hcGkvdXRpbHMvaW5kZXguanNcIjtcclxuaW1wb3J0IGkxOG4gZnJvbSBcIi4uLy4uL2FwaS9pMThuL2luZGV4LmpzXCI7XHJcbmltcG9ydCB1aSBmcm9tIFwiLi4vLi4vYXBpL3VpL2luZGV4LmpzXCI7XHJcblxyXG5pbXBvcnQgY3NzVGV4dCBmcm9tIFwiLi9zdHlsZS5zY3NzXCI7XHJcbmltcG9ydCB2dWVDb21wb25lbnRzIGZyb20gXCIuL3Z1ZS9jb21wb25lbnRzL2luZGV4LmpzXCI7XHJcbnBhdGNoZXIuaW5qZWN0Q1NTKGNzc1RleHQpO1xyXG5cclxue1xyXG4gIGxldCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xyXG4gIHNjcmlwdC5zcmMgPSBcImh0dHBzOi8vdW5wa2cuY29tL3Z1ZUAzL2Rpc3QvdnVlLmdsb2JhbC5qc1wiO1xyXG4gIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcclxufVxyXG5cclxuZG9tLnBhdGNoKCdhW2hyZWY9XCIvc3RvcmVcIl1bZGF0YS1saXN0LWl0ZW0taWQkPVwiX19fbml0cm9cIl0nLCAoZWxtKSA9PiB7XHJcbiAgdXRpbHMuaWZFeGlzdHMoXHJcbiAgICBlbG0ucXVlcnlTZWxlY3RvcignW2NsYXNzKj1cIm5hbWVBbmREZWNvcmF0b3JzLVwiXSBbY2xhc3MqPVwibmFtZS1cIl0nKSxcclxuICAgIChuYW1lRWxtKSA9PiB7XHJcbiAgICAgIG5hbWVFbG0udGV4dENvbnRlbnQgPSBpMThuLmZvcm1hdChcIkFQUF9OQU1FXCIpO1xyXG4gICAgfVxyXG4gICk7XHJcblxyXG4gIHV0aWxzLmlmRXhpc3RzKFxyXG4gICAgZWxtLnF1ZXJ5U2VsZWN0b3IoJ1tjbGFzcyo9XCJwcmVtaXVtVHJpYWxBY2tub3dsZWRnZWRCYWRnZS1cIl0nKSxcclxuICAgIChuaXRyb0VsbSkgPT4ge1xyXG4gICAgICBuaXRyb0VsbS5yZW1vdmUoKTtcclxuICAgIH1cclxuICApO1xyXG5cclxuICB1dGlscy5pZkV4aXN0cyhcclxuICAgIGVsbS5xdWVyeVNlbGVjdG9yKCdbY2xhc3MqPVwiYXZhdGFyV2l0aFRleHQtXCJdIFtjbGFzcyo9XCJhdmF0YXItXCJdIHN2ZycpLFxyXG4gICAgZmlsbFNWR0VsbVdpdGhBY29yZExvZ29cclxuICApO1xyXG59KTtcclxuXHJcbmxldCBpbnRlcm5hbFZ1ZUFwcCA9IG51bGw7XHJcblxyXG4oYXN5bmMgKCkgPT4ge1xyXG4gIGxldCBoZWFkZXJJdGVtQ2xhc3NlcztcclxuICB3aGlsZSAodHJ1ZSkge1xyXG4gICAgaGVhZGVySXRlbUNsYXNzZXMgPSB3ZWJwYWNrLmZpbmRCeVByb3BlcnRpZXMoXCJkaXZpZGVyXCIsIFwiaGFtYnVyZ2VyXCIsIFwidGhlbWVkXCIpO1xyXG4gICAgaWYgKGhlYWRlckl0ZW1DbGFzc2VzKSBicmVhaztcclxuICAgIGF3YWl0IG5ldyBQcm9taXNlKChyKSA9PiBzZXRUaW1lb3V0KHIsIDEwMCkpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgdGFiQmFyQ2xhc3NlcyA9IHdlYnBhY2suZmluZEJ5UHJvcGVydGllcyhcInRhYkJhclwiLCBcIm1heFdpZHRoV2l0aFRvb2xiYXJcIik7XHJcbiAgY29uc3QgaGVhZGVyQ2xhc3NlcyA9IHdlYnBhY2suZmluZEJ5UHJvcGVydGllcyhcInRvcFBpbGxcIiwgXCJoZWFkZXJUZXh0XCIpO1xyXG4gIGRvbS5wYXRjaCgnW2NsYXNzKj1cImFwcGxpY2F0aW9uU3RvcmUtXCJdIFtjbGFzcyo9XCJob21lV3JhcHBlck5vcm1hbC1cIl0nLCAoZWxtKSA9PiB7XHJcblxyXG4gICAgdXRpbHMuaWZFeGlzdHMoXHJcbiAgICAgIGVsbS5xdWVyeVNlbGVjdG9yKCdbY2xhc3MqPVwiaGVhZGVyQmFyLVwiXSBbY2xhc3MqPVwidGl0bGVXcmFwcGVyLVwiXSBbY2xhc3MqPVwidGl0bGUtXCJdJyksXHJcbiAgICAgICh0aXRsZUVsbSkgPT4ge1xyXG4gICAgICAgIHRpdGxlRWxtLnRleHRDb250ZW50ID0gaTE4bi5mb3JtYXQoXCJBUFBfTkFNRVwiKTtcclxuXHJcbiAgICAgICAgaWYgKGludGVybmFsVnVlQXBwKSB7XHJcbiAgICAgICAgICBsZXQgY29udGFpbmVyID0gZG9tLnBhcmVudHModGl0bGVFbG0sIDIpLnBvcCgpO1xyXG5cclxuICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgZG9tLnBhcnNlKGA8ZGl2IGNsYXNzPVwiJHtoZWFkZXJJdGVtQ2xhc3Nlcy5kaXZpZGVyfVwiPjwvZGl2PmApXHJcbiAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgIGNvbnN0IGJ1dHRvbnNDb250YWluZXIgPSBkb20ucGFyc2UoYFxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cIiR7dGFiQmFyQ2xhc3Nlcy50YWJCYXJ9ICR7aGVhZGVyQ2xhc3Nlcy50b3BQaWxsfVwiPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgYCk7XHJcblxyXG4gICAgICAgICAgbGV0IGJ1dHRvbnMgPSBbXTtcclxuXHJcbiAgICAgICAgICBmdW5jdGlvbiBidWlsZEJ1dHRvbihpZCwgdGV4dCwgY3VzdG9tQ2xhc3NlcyA9IFwiXCIpIHtcclxuICAgICAgICAgICAgbGV0IGVsbSA9IGRvbS5wYXJzZShgPGRpdiBpZD1cInRhYi1idXR0b24tJHtpZH1cIiBjbGFzcz1cImFjb3JkLS10YWJzLXRhYi1idXR0b24gJHtjdXN0b21DbGFzc2VzfSAke3RhYkJhckNsYXNzZXMuaXRlbX0gJHtoZWFkZXJDbGFzc2VzLml0ZW19ICR7aGVhZGVyQ2xhc3Nlcy50aGVtZWR9XCI+JHt0ZXh0fTwvZGl2PmApO1xyXG5cclxuICAgICAgICAgICAgYnV0dG9ucy5wdXNoKGVsbSk7XHJcblxyXG4gICAgICAgICAgICBlbG0uc2V0U2VsZWN0ZWQgPSAocykgPT4ge1xyXG4gICAgICAgICAgICAgIGlmIChzKSBlbG0uY2xhc3NMaXN0LmFkZChoZWFkZXJDbGFzc2VzLnNlbGVjdGVkLCBcInNlbGVjdGVkXCIpO1xyXG4gICAgICAgICAgICAgIGVsc2UgZWxtLmNsYXNzTGlzdC5yZW1vdmUoaGVhZGVyQ2xhc3Nlcy5zZWxlY3RlZCwgXCJzZWxlY3RlZFwiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZWxtLnNldFNlbGVjdGVkKGludGVybmFsVnVlQXBwLnNlbGVjdGVkVGFiID09PSBpZCk7XHJcblxyXG4gICAgICAgICAgICBlbG0ub25jbGljayA9ICgpID0+IHtcclxuICAgICAgICAgICAgICBidXR0b25zLmZvckVhY2goKGIpID0+IGIuc2V0U2VsZWN0ZWQoZmFsc2UpKTtcclxuICAgICAgICAgICAgICBlbG0uc2V0U2VsZWN0ZWQodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgaW50ZXJuYWxWdWVBcHAuc2VsZWN0ZWRUYWIgPSBpZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZWxtO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGJ1dHRvbnNDb250YWluZXIuYXBwZW5kQ2hpbGQoYnVpbGRCdXR0b24oXCJob21lXCIsIGkxOG4uZm9ybWF0KFwiSE9NRVwiKSkpO1xyXG4gICAgICAgICAgYnV0dG9uc0NvbnRhaW5lci5hcHBlbmRDaGlsZChidWlsZEJ1dHRvbihcImluc3RhbGxlZC1leHRlbnNpb25zXCIsIGkxOG4uZm9ybWF0KFwiSU5TVEFMTEVEX0VYVEVOU0lPTlNcIikpKTtcclxuICAgICAgICAgIGJ1dHRvbnNDb250YWluZXIuYXBwZW5kQ2hpbGQoYnVpbGRCdXR0b24oXCJzZXR0aW5nc1wiLCBpMThuLmZvcm1hdChcIlNFVFRJTkdTXCIpKSk7XHJcbiAgICAgICAgICBidXR0b25zQ29udGFpbmVyLmFwcGVuZENoaWxkKGJ1aWxkQnV0dG9uKFwic3RvcmVcIiwgaTE4bi5mb3JtYXQoXCJTVE9SRVwiKSwgXCJzdG9yZS10YWItYnV0dG9uXCIpKTtcclxuXHJcbiAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYnV0dG9uc0NvbnRhaW5lcik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICApO1xyXG4gICAgdXRpbHMuaWZFeGlzdHMoXHJcbiAgICAgIGVsbS5xdWVyeVNlbGVjdG9yKCdbY2xhc3MqPVwiaGVhZGVyQmFyLVwiXSBbY2xhc3MqPVwiaWNvbldyYXBwZXItXCJdIFtjbGFzcyo9XCJpY29uLVwiXScpLFxyXG4gICAgICBmaWxsU1ZHRWxtV2l0aEFjb3JkTG9nb1xyXG4gICAgKTtcclxuICB9KTtcclxufSkoKTtcclxuXHJcbmZ1bmN0aW9uIGZpbGxTVkdFbG1XaXRoQWNvcmRMb2dvKHN2Z0VsbSkge1xyXG4gIHN2Z0VsbS5zZXRBdHRyaWJ1dGUoXCJ2aWV3Qm94XCIsIFwiMCAwIDgxMy41IDE0OTNcIik7XHJcbiAgc3ZnRWxtLnNldEF0dHJpYnV0ZShcInhtbG5zXCIsIFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIik7XHJcbiAgc3ZnRWxtLmlubmVySFRNTCA9IGBcclxuICAgIDxkZWZzPlxyXG4gICAgICA8c3R5bGU+XHJcbiAgICAgICAgLmFjb3JkLS1sb2dvLWNvbG9yIHtcclxuICAgICAgICAgIGZpbGw6IGN1cnJlbnRDb2xvcjtcclxuICAgICAgICAgIGZpbGwtcnVsZTogZXZlbm9kZDtcclxuICAgICAgICB9XHJcbiAgICAgIDwvc3R5bGU+XHJcbiAgICA8L2RlZnM+XHJcbiAgICA8Zz5cclxuICAgICAgPHBhdGggY2xhc3M9XCJhY29yZC0tbG9nby1jb2xvclwiIGQ9XCJNODE3LjI2NiwxMzIyLjVoMjg1djM2NWgtMjg1di0zNjVaXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKC01NTMuMjUgLTIxMy41KVwiLz5cclxuICAgICAgPHBhdGggY2xhc3M9XCJhY29yZC0tbG9nby1jb2xvclwiIGQ9XCJNNTU1LjIzNSwxNTIzLjc4czkxLjE2OS0zMTkuODUsOTIuNTMxLTMxOS4yOGMxMTQuNyw0Ny44MywxNjAsMTkyLDE2MCwxOTJsLTUyLjEyLDE4Ni42MXMtMzEuMTI5LDEzNy43MS04MC44OCwxMjAuMzlDNTI4LjAyNiwxNjUyLjQyLDU1NS4yMzUsMTUyMy43OCw1NTUuMjM1LDE1MjMuNzhaXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKC01NTMuMjUgLTIxMy41KVwiLz5cclxuICAgICAgPHBhdGggY2xhc3M9XCJhY29yZC0tbG9nby1jb2xvclwiIGQ9XCJNMTM2NC43NywxNTI1LjI4cy05MS4xNy0zMTkuODUtOTIuNTQtMzE5LjI4Yy0xMTQuNyw0Ny44My0xNjAsMTkyLTE2MCwxOTJsNTIuMTIsMTg2LjYxczMxLjEzLDEzNy43MSw4MC44OCwxMjAuMzlDMTM5MS45NywxNjUzLjkyLDEzNjQuNzcsMTUyNS4yOCwxMzY0Ljc3LDE1MjUuMjhaXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKC01NTMuMjUgLTIxMy41KVwiLz5cclxuICAgIDwvZz5cclxuICAgIDxwYXRoIGNsYXNzPVwiYWNvcmQtLWxvZ28tY29sb3JcIiBkPVwiTTg3NC43NjYsMjc1LjVzMTQuNTc5LTYxLjkxOCw4Ny02MmM4MC44MjQtLjA5Miw4Nyw2Miw4Nyw2MnMxOTkuNDMsODUxLjQ3LDE5OCw4NTJjLTIxMC4zMyw3Ny43MS0xNDYsMTgwLTE0NiwxODBoLTI4MXM2My43LTEwMy44Mi0xNDYtMTgxQzY3MS4wMTQsMTEyNS40OSw4NzQuNzY2LDI3NS41LDg3NC43NjYsMjc1LjVaXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKC01NTMuMjUgLTIxMy41KVwiLz5cclxuICAgIDxnPlxyXG4gICAgICA8cGF0aCBjbGFzcz1cImFjb3JkLS1sb2dvLWNvbG9yXCIgZD1cIk0xMjM4LjE0LDg5Ny41YTUzLjg4Miw1My44ODIsMCwwLDEsNTMuODgsNTMuODc1YzAsMjQuOTM5LTIwLjI1LDQ2Ljk4Ny00My4yNSw1My4xMjUtNC40NSwxLjE4LTEwLjE5LTM5LTExLTM5LTAuNTgsMC0yNy43MSwzLjUxLTMxLDQtNS41OC44MjgtMTEuOTMtMTMuODc2LTQtMjAsMS45My0xLjQ5MSwyNi42Mi02Ljk1OSwyOS03LDAuNjItLjAxMS03LjM0LTQxLjYxOC03LTQzQzEyMjUuNjQsODk1Ljk0NCwxMjMzLjUyLDg5Ny41LDEyMzguMTQsODk3LjVaXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKC01NTMuMjUgLTIxMy41KVwiLz5cclxuICAgICAgPHBhdGggY2xhc3M9XCJhY29yZC0tbG9nby1jb2xvclwiIGQ9XCJNMTE3My42NCw2MzIuNWE1My44ODIsNTMuODgyLDAsMCwxLDUzLjg4LDUzLjg3NWMwLDI0LjkzOS0yMC4yNSw0Ni45ODctNDMuMjUsNTMuMTI1LTQuNDUsMS4xODUtMTAuMTktMzktMTEtMzktMC41OCwwLTI3LjcxLDMuNTEtMzEsNC01LjU4LjgyOC0xMS45My0xMy44NzYtNC0yMCwxLjkzLTEuNDkxLDI2LjYyLTYuOTU5LDI5LTcsMC42Mi0uMDExLTcuMzQtNDEuNjE4LTctNDNDMTE2MS4xNCw2MzAuOTQ0LDExNjkuMDIsNjMyLjUsMTE3My42NCw2MzIuNVpcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoLTU1My4yNSAtMjEzLjUpXCIvPlxyXG4gICAgICA8cGF0aCBjbGFzcz1cImFjb3JkLS1sb2dvLWNvbG9yXCIgZD1cIk0xMTE1LjE2LDM3M2E1My44NzQsNTMuODc0LDAsMCwxLDUzLjg3LDUzLjg3NWMwLDI0LjkzOS0yMC4yNCw0Ni45ODctNDMuMjUsNTMuMTI1LTQuNDQsMS4xODUtMTAuMTgtMzktMTEtMzktMC41OCwwLTI3LjcsMy41MS0zMSw0LTUuNTcuODI4LTExLjkyLTEzLjg3Ni00LTIwLDEuOTMtMS40OTEsMjYuNjItNi45NTksMjktNywwLjYyLS4wMTEtNy4zNC00MS42MTgtNy00M0MxMTAyLjY1LDM3MS40NDQsMTExMC41MywzNzMsMTExNS4xNiwzNzNaXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKC01NTMuMjUgLTIxMy41KVwiLz5cclxuICAgIDwvZz5cclxuICAgIDxnPlxyXG4gICAgICA8cGF0aCBjbGFzcz1cImFjb3JkLS1sb2dvLWNvbG9yXCIgZD1cIk02ODMuOTIyLDg5Ny43NWE1My44NzUsNTMuODc1LDAsMCwwLTUzLjg3NSw1My44NzVjMCwyNC45MzksMjAuMjQ1LDQ2Ljk4Nyw0My4yNSw1My4xMjUsNC40NDEsMS4xOCwxMC4xODUtMzksMTEtMzksMC41NzYsMCwyNy43LDMuNTEsMzEsNCw1LjU3MiwwLjgyOCwxMS45MjYtMTMuODc2LDQtMjAtMS45My0xLjQ5MS0yNi42MjEtNi45NTktMjktNy0wLjYyLS4wMTEsNy4zMzktNDEuNjE4LDctNDNDNjk2LjQyNCw4OTYuMTk0LDY4OC41NDQsODk3Ljc1LDY4My45MjIsODk3Ljc1WlwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgtNTUzLjI1IC0yMTMuNSlcIi8+XHJcbiAgICAgIDxwYXRoIGNsYXNzPVwiYWNvcmQtLWxvZ28tY29sb3JcIiBkPVwiTTc0OC40MjIsNjMyLjc1YTUzLjg3NSw1My44NzUsMCwwLDAtNTMuODc1LDUzLjg3NWMwLDI0LjkzOSwyMC4yNDUsNDYuOTg3LDQzLjI1LDUzLjEyNSw0LjQ0MSwxLjE4NSwxMC4xODUtMzksMTEtMzksMC41NzYsMCwyNy43LDMuNTEsMzEsNCw1LjU3MiwwLjgyOCwxMS45MjYtMTMuODc2LDQtMjAtMS45My0xLjQ5MS0yNi42MjEtNi45NTktMjktNy0wLjYyLS4wMTEsNy4zMzktNDEuNjE4LDctNDNDNzYwLjkyNCw2MzEuMTk0LDc1My4wNDQsNjMyLjc1LDc0OC40MjIsNjMyLjc1WlwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgtNTUzLjI1IC0yMTMuNSlcIi8+XHJcbiAgICAgIDxwYXRoIGNsYXNzPVwiYWNvcmQtLWxvZ28tY29sb3JcIiBkPVwiTTgwNi45MDYsMzczLjI1YTUzLjg3NSw1My44NzUsMCwwLDAtNTMuODc1LDUzLjg3NWMwLDI0LjkzOSwyMC4yNDUsNDYuOTg3LDQzLjI1LDUzLjEyNSw0LjQ0MiwxLjE4NSwxMC4xODUtMzksMTEtMzksMC41NzcsMCwyNy43LDMuNTEsMzEsNCw1LjU3MiwwLjgyOCwxMS45MjYtMTMuODc2LDQtMjAtMS45My0xLjQ5MS0yNi42MjEtNi45NTktMjktNy0wLjYyLS4wMTEsNy4zMzktNDEuNjE4LDctNDNDODE5LjQwOSwzNzEuNjk0LDgxMS41MjgsMzczLjI1LDgwNi45MDYsMzczLjI1WlwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgtNTUzLjI1IC0yMTMuNSlcIi8+XHJcbiAgICA8L2c+XHJcbiAgYDtcclxufVxyXG5cclxuXHJcbihhc3luYyAoKSA9PiB7XHJcbiAgYXdhaXQgdWkudnVlLnJlYWR5LndoZW4oKTtcclxuXHJcbiAgY29uc3QgYmFzZVZ1ZUVsbSA9IGRvbS5wYXJzZShgXHJcbiAgICA8ZGl2IGNsYXNzPVwiYWNvcmQtLXRhYnMtY29udGVudC1jb250YWluZXJcIj5cclxuICAgICAgPGRpdiBjbGFzcz1cInRhYlwiPlxyXG4gICAgICAgIDxrZWVwLWFsaXZlPlxyXG4gICAgICAgICAgPGNvbXBvbmVudCA6aXM9XCJcXGBcXCR7c2VsZWN0ZWRUYWJ9LXBhZ2VcXGBcIiAvPlxyXG4gICAgICAgIDwva2VlcC1hbGl2ZT5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICBgKTtcclxuXHJcbiAgLyoqIEB0eXBlIHtpbXBvcnQoXCJ2dWVcIikuQXBwfSAqL1xyXG4gIGNvbnN0IHZ1ZUFwcCA9IFZ1ZS5jcmVhdGVBcHAoe1xyXG4gICAgZGF0YSgpIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBzZWxlY3RlZFRhYjogXCJob21lXCJcclxuICAgICAgfTtcclxuICAgIH0sXHJcbiAgICBtb3VudGVkKCkge1xyXG4gICAgICBpbnRlcm5hbFZ1ZUFwcCA9IHRoaXM7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIHVpLnZ1ZS5jb21wb25lbnRzLmxvYWQodnVlQXBwKTtcclxuICB2dWVDb21wb25lbnRzLmxvYWQodnVlQXBwKTtcclxuICB2dWVBcHAubW91bnQoYmFzZVZ1ZUVsbSk7XHJcblxyXG4gIGRvbS5wYXRjaCgnW2NsYXNzKj1cImFwcGxpY2F0aW9uU3RvcmUtXCJdIFtjbGFzcyo9XCJzY3JvbGxlckJhc2UtXCJdIFtjbGFzcyo9XCJzdWJzY3JpcHRpb25zUmVkaXJlY3RDb250YWluZXItXCJdLCBbY2xhc3MqPVwiYXBwbGljYXRpb25TdG9yZS1cIl0gW2NsYXNzKj1cInNjcm9sbGVyQmFzZS1cIl0gW2NsYXNzKj1cInRyaWFsT2ZmZXJXcmFwcGVyLVwiXSwgW2NsYXNzKj1cImFwcGxpY2F0aW9uU3RvcmUtXCJdIFtjbGFzcyo9XCJzY3JvbGxlckJhc2UtXCJdIFtjbGFzcyo9XCJwcmVtaXVtQ2FyZHMtXCJdJywgKGVsbSkgPT4ge1xyXG4gICAgLyoqIEB0eXBlIHtIVE1MRGl2RWxlbWVudH0gKi9cclxuICAgIGxldCBjb250YWluZXJFbG0gPSBkb20ucGFyZW50cyhlbG0sIDQpLnBvcCgpO1xyXG4gICAgY29udGFpbmVyRWxtLnJlcGxhY2VDaGlsZHJlbihiYXNlVnVlRWxtKTtcclxuICB9KTtcclxufSkoKTtcclxuXHJcblxyXG5cclxuXHJcbiIsICJcclxuKGFzeW5jICgpID0+IHtcclxuICAvKiogQHR5cGUge1NWR0VsZW1lbnR9ICovXHJcbiAgbGV0IHN2Z0VsbTtcclxuICB3aGlsZSAodHJ1ZSkge1xyXG4gICAgc3ZnRWxtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2NsYXNzKj1cIndvcmRtYXJrLVwiXSBzdmcnKTtcclxuICAgIGlmIChzdmdFbG0pIGJyZWFrO1xyXG4gICAgYXdhaXQgbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIDEwMCkpO1xyXG4gIH1cclxuXHJcbiAgc3ZnRWxtLmlubmVySFRNTCA9IGA8cGF0aCBkPVwiTTYuODY0IDEwTDYuNDMyIDguOTU2SDMuMDQ4TDIuNTQ0IDEwSDAuMTA4TDMuOTQ4IDEuNTY0SDYuMDQ4TDkuNzIgMTBINi44NjRaTTQuNzQgNC43OEwzLjkxMiA2Ljc5Nkg1LjU4TDQuNzQgNC43OFpNMTUuNTA0NSA2LjMyOEMxNS4zNDQ1IDYuMjI0IDE1LjE5MjUgNi4xMzIgMTUuMDQ4NSA2LjA1MkMxNC45MDQ1IDUuOTY0IDE0Ljc1NjUgNS44OTIgMTQuNjA0NSA1LjgzNkMxNC40NTI1IDUuNzcyIDE0LjI5MjUgNS43MjQgMTQuMTI0NSA1LjY5MkMxMy45NjQ1IDUuNjYgMTMuNzg0NSA1LjY0NCAxMy41ODQ1IDUuNjQ0QzEzLjMxMjUgNS42NDQgMTMuMDgwNSA1LjY4IDEyLjg4ODUgNS43NTJDMTIuNzA0NSA1LjgyNCAxMi41NTY1IDUuOTIgMTIuNDQ0NSA2LjA0QzEyLjMzMjUgNi4xNiAxMi4yNDg1IDYuMjk2IDEyLjE5MjUgNi40NDhDMTIuMTQ0NSA2LjYgMTIuMTIwNSA2Ljc1MiAxMi4xMjA1IDYuOTA0QzEyLjEyMDUgNy4wNDggMTIuMTUyNSA3LjE5MiAxMi4yMTY1IDcuMzM2QzEyLjI4MDUgNy40NzIgMTIuMzcyNSA3LjU5MiAxMi40OTI1IDcuNjk2QzEyLjYyMDUgNy44IDEyLjc3MjUgNy44ODQgMTIuOTQ4NSA3Ljk0OEMxMy4xMjQ1IDguMDEyIDEzLjMyODUgOC4wNDQgMTMuNTYwNSA4LjA0NEMxMy43Mjg1IDguMDQ0IDEzLjg4NDUgOC4wMjggMTQuMDI4NSA3Ljk5NkMxNC4xODA1IDcuOTY0IDE0LjMyODUgNy45MTYgMTQuNDcyNSA3Ljg1MkMxNC42MjQ1IDcuNzg4IDE0Ljc4MDUgNy43MTIgMTQuOTQwNSA3LjYyNEMxNS4xMDg1IDcuNTI4IDE1LjI5NjUgNy40MiAxNS41MDQ1IDcuM0wxNi4xMjg1IDkuMDUyQzE1Ljc2ODUgOS4zNTYgMTUuMzQ0NSA5LjYxNiAxNC44NTY1IDkuODMyQzE0LjM2ODUgMTAuMDQgMTMuODQwNSAxMC4xNDQgMTMuMjcyNSAxMC4xNDRDMTIuNzM2NSAxMC4xNDQgMTIuMjQ4NSAxMC4wOCAxMS44MDg1IDkuOTUyQzExLjM3NjUgOS44MTYgMTEuMDA0NSA5LjYxNiAxMC42OTI1IDkuMzUyQzEwLjM4ODUgOS4wOCAxMC4xNTI1IDguNzQ0IDkuOTg0NDcgOC4zNDRDOS44MTY0NyA3LjkzNiA5LjczMjQ3IDcuNDYgOS43MzI0NyA2LjkxNkM5LjczMjQ3IDYuMzU2IDkuODI0NDcgNS44NzIgMTAuMDA4NSA1LjQ2NEMxMC4yMDA1IDUuMDU2IDEwLjQ1NjUgNC43MiAxMC43NzY1IDQuNDU2QzExLjEwNDUgNC4xODQgMTEuNDg4NSAzLjk4NCAxMS45Mjg1IDMuODU2QzEyLjM2ODUgMy43MiAxMi44NDA1IDMuNjUyIDEzLjM0NDUgMy42NTJDMTQuMzIwNSAzLjY1MiAxNS4xODQ1IDMuOTQ0IDE1LjkzNjUgNC41MjhMMTUuNTA0NSA2LjMyOFpNMjMuMzkxOSA2Ljg1NkMyMy4zOTE5IDcuNDMyIDIzLjMxMTkgNy45MjggMjMuMTUxOSA4LjM0NEMyMi45OTE5IDguNzYgMjIuNzU5OSA5LjEwNCAyMi40NTU5IDkuMzc2QzIyLjE1OTkgOS42NCAyMS43OTk5IDkuODM2IDIxLjM3NTkgOS45NjRDMjAuOTU5OSAxMC4wODQgMjAuNDk1OSAxMC4xNDQgMTkuOTgzOSAxMC4xNDRDMTkuNDg3OSAxMC4xNDQgMTkuMDMxOSAxMC4wOCAxOC42MTU5IDkuOTUyQzE4LjE5OTkgOS44MTYgMTcuODM5OSA5LjYxMiAxNy41MzU5IDkuMzRDMTcuMjMxOSA5LjA2OCAxNi45OTE5IDguNzI4IDE2LjgxNTkgOC4zMkMxNi42NDc5IDcuOTA0IDE2LjU2MzkgNy40MTYgMTYuNTYzOSA2Ljg1NkMxNi41NjM5IDYuMjcyIDE2LjY0NzkgNS43NzIgMTYuODE1OSA1LjM1NkMxNi45OTE5IDQuOTQgMTcuMjMxOSA0LjYgMTcuNTM1OSA0LjMzNkMxNy44Mzk5IDQuMDcyIDE4LjE5OTkgMy44OCAxOC42MTU5IDMuNzZDMTkuMDMxOSAzLjY0IDE5LjQ4NzkgMy41OCAxOS45ODM5IDMuNThDMjAuNDk1OSAzLjU4IDIwLjk1OTkgMy42NDggMjEuMzc1OSAzLjc4NEMyMS43OTk5IDMuOTEyIDIyLjE1OTkgNC4xMTIgMjIuNDU1OSA0LjM4NEMyMi43NTk5IDQuNjQ4IDIyLjk5MTkgNC45ODggMjMuMTUxOSA1LjQwNEMyMy4zMTE5IDUuODEyIDIzLjM5MTkgNi4yOTYgMjMuMzkxOSA2Ljg1NlpNMjEuMTM1OSA2Ljg0NEMyMS4xMzU5IDYuNTI0IDIxLjAzMTkgNi4yNTYgMjAuODIzOSA2LjA0QzIwLjYyMzkgNS44MjQgMjAuMzQzOSA1LjcxNiAxOS45ODM5IDUuNzE2QzE5LjYyMzkgNS43MTYgMTkuMzQzOSA1LjgyNCAxOS4xNDM5IDYuMDRDMTguOTUxOSA2LjI0OCAxOC44NTU5IDYuNTE2IDE4Ljg1NTkgNi44NDRDMTguODU1OSA3LjE0OCAxOC45NTE5IDcuNDE2IDE5LjE0MzkgNy42NDhDMTkuMzQzOSA3Ljg3MiAxOS42MjM5IDcuOTg0IDE5Ljk4MzkgNy45ODRDMjAuMzQzOSA3Ljk4NCAyMC42MjM5IDcuODcyIDIwLjgyMzkgNy42NDhDMjEuMDMxOSA3LjQyNCAyMS4xMzU5IDcuMTU2IDIxLjEzNTkgNi44NDRaTTI4LjY5NDggNi41OEwyOC40Nzg4IDYuNTkyQzI4LjQ3MDggNi40MDggMjguMzkwOCA2LjI2IDI4LjIzODggNi4xNDhDMjguMDg2OCA2LjAzNiAyNy45MjI4IDUuOTggMjcuNzQ2OCA1Ljk4QzI3LjU4NjggNS45OCAyNy40MDY4IDYuMDI4IDI3LjIwNjggNi4xMjRDMjcuMDE0OCA2LjIxMiAyNi44NDI4IDYuMzQ4IDI2LjY5MDggNi41MzJWMTBIMjQuMzE0OFYzLjc4NEgyNi42OTA4VjQuMzk2QzI2Ljg4MjggNC4yMTIgMjcuMTAyOCA0LjA0IDI3LjM1MDggMy44OEMyNy42MDY4IDMuNzIgMjcuOTEwOCAzLjY0IDI4LjI2MjggMy42NEMyOC4zMTg4IDMuNjQgMjguMzg2OCAzLjY0NCAyOC40NjY4IDMuNjUyQzI4LjU0NjggMy42NiAyOC42MjY4IDMuNjcyIDI4LjcwNjggMy42ODhDMjguNzg2OCAzLjcwNCAyOC44NjI4IDMuNzI4IDI4LjkzNDggMy43NkMyOS4wMDY4IDMuNzg0IDI5LjA2MjggMy44MTYgMjkuMTAyOCAzLjg1NkwyOC42OTQ4IDYuNThaTTM0LjM5MjkgMTBWOS41NTZDMzQuMzIwOSA5LjYyOCAzNC4yMjA5IDkuNjk2IDM0LjA5MjkgOS43NkMzMy45NjQ5IDkuODI0IDMzLjgyNDkgOS44ODQgMzMuNjcyOSA5Ljk0QzMzLjUyMDkgOS45OTYgMzMuMzY4OSAxMC4wNCAzMy4yMTY5IDEwLjA3MkMzMy4wNzI5IDEwLjEwNCAzMi45NDQ5IDEwLjEyIDMyLjgzMjkgMTAuMTJDMzIuNDI0OSAxMC4xMiAzMi4wMzI5IDEwLjA1NiAzMS42NTY5IDkuOTI4QzMxLjI4MDkgOS43OTIgMzAuOTQ4OSA5LjU5MiAzMC42NjA5IDkuMzI4QzMwLjM4MDkgOS4wNTYgMzAuMTU2OSA4LjcyNCAyOS45ODg5IDguMzMyQzI5LjgyMDkgNy45MzIgMjkuNzM2OSA3LjQ2OCAyOS43MzY5IDYuOTRDMjkuNzM2OSA2LjM4IDI5LjgxNjkgNS44OTYgMjkuOTc2OSA1LjQ4OEMzMC4xNDQ5IDUuMDggMzAuMzY4OSA0Ljc0IDMwLjY0ODkgNC40NjhDMzAuOTM2OSA0LjE5NiAzMS4yNzI5IDMuOTk2IDMxLjY1NjkgMy44NjhDMzIuMDQwOSAzLjczMiAzMi40NDg5IDMuNjY0IDMyLjg4MDkgMy42NjRDMzIuOTY4OSAzLjY2NCAzMy4wODA5IDMuNjc2IDMzLjIxNjkgMy43QzMzLjM2MDkgMy43MTYgMzMuNTA0OSAzLjc0NCAzMy42NDg5IDMuNzg0QzMzLjc5MjkgMy44MTYgMzMuOTI4OSAzLjg2IDM0LjA1NjkgMy45MTZDMzQuMTkyOSAzLjk3MiAzNC4yOTY5IDQuMDMyIDM0LjM2ODkgNC4wOTZWMC44NTZIMzYuNzA4OVYxMEgzNC4zOTI5Wk0zNC4zNjg5IDYuMDY0QzM0LjMwNDkgNi4wMTYgMzQuMjI0OSA1Ljk3MiAzNC4xMjg5IDUuOTMyQzM0LjAzMjkgNS44OTIgMzMuOTMyOSA1Ljg2IDMzLjgyODkgNS44MzZDMzMuNzI0OSA1LjgwNCAzMy42MjA5IDUuNzggMzMuNTE2OSA1Ljc2NEMzMy40MTI5IDUuNzQ4IDMzLjMyMDkgNS43NCAzMy4yNDA5IDUuNzRDMzMuMDgwOSA1Ljc0IDMyLjkyNDkgNS43NjggMzIuNzcyOSA1LjgyNEMzMi42Mjg5IDUuODggMzIuNTAwOSA1Ljk2IDMyLjM4ODkgNi4wNjRDMzIuMjc2OSA2LjE2IDMyLjE4ODkgNi4yNzYgMzIuMTI0OSA2LjQxMkMzMi4wNjA5IDYuNTQ4IDMyLjAyODkgNi42OTIgMzIuMDI4OSA2Ljg0NEMzMi4wMjg5IDcuMDA0IDMyLjA2MDkgNy4xNTIgMzIuMTI0OSA3LjI4OEMzMi4xODg5IDcuNDI0IDMyLjI3NjkgNy41NDQgMzIuMzg4OSA3LjY0OEMzMi41MDA5IDcuNzQ0IDMyLjYyODkgNy44MjQgMzIuNzcyOSA3Ljg4OEMzMi45MjQ5IDcuOTQ0IDMzLjA4MDkgNy45NzIgMzMuMjQwOSA3Ljk3MkMzMy4zMjA5IDcuOTcyIDMzLjQxMjkgNy45NiAzMy41MTY5IDcuOTM2QzMzLjYyMDkgNy45MTIgMzMuNzI0OSA3Ljg4NCAzMy44Mjg5IDcuODUyQzMzLjkzMjkgNy44MTIgMzQuMDMyOSA3Ljc2OCAzNC4xMjg5IDcuNzJDMzQuMjI0OSA3LjY2NCAzNC4zMDQ5IDcuNjA4IDM0LjM2ODkgNy41NTJWNi4wNjRaXCIgZmlsbD1cImN1cnJlbnRDb2xvclwiIC8+YDtcclxuICBzdmdFbG0uc2V0QXR0cmlidXRlKFwidmlld0JveFwiLCBcIjAgMCA1NSAxMVwiKTtcclxufSkoKTsiLCAiaW1wb3J0IHsgd2FpdFVudGlsQ29ubmVjdGlvbk9wZW4gfSBmcm9tIFwiLi9vdGhlci91dGlscy5qc1wiO1xyXG5pbXBvcnQgbG9hZGluZ0FuaW1hdGlvbiBmcm9tIFwiLi9vdGhlci9sb2FkaW5nLWFuaW1hdGlvblwiO1xyXG5pbXBvcnQgYXBpIGZyb20gXCIuL2FwaVwiO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdywgXCJhY29yZFwiLCB7XHJcbiAgZ2V0KCkge1xyXG4gICAgcmV0dXJuIGFwaS5leHBvc2VkQVBJO1xyXG4gIH1cclxufSk7XHJcbndpbmRvdy5nbG9iYWwgPSB3aW5kb3c7XHJcblxyXG4oYXN5bmMgKCkgPT4ge1xyXG4gIGxvYWRpbmdBbmltYXRpb24uc2hvdygpO1xyXG4gIGF3YWl0IHdhaXRVbnRpbENvbm5lY3Rpb25PcGVuKCk7XHJcbiAgbG9hZGluZ0FuaW1hdGlvbi5oaWRlKCk7XHJcbn0pKCk7XHJcblxyXG4vLyBleHRyYXNcclxuaW1wb3J0IFwiLi9vdGhlci9kb2N1bWVudC10aXRsZS1jaGFuZ2UuanNcIjtcclxuaW1wb3J0IFwiLi9vdGhlci93ZWJzb2NrZXQtdHJpZ2dlcnMuanNcIjtcclxuaW1wb3J0IFwiLi91aS9pbmRleC5qc1wiOyJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUNBLGFBQU8s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QUFBLFVBQ0Y7QUFBQSxVQUNBLE1BQVE7QUFBQSxZQUNOLFFBQVU7QUFBQSxjQUNSO0FBQUEsY0FDQTtBQUFBLGNBQ0E7QUFBQSxjQUNBO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsUUFDQSxVQUFZO0FBQUEsVUFDVixJQUFNO0FBQUEsVUFDTixRQUFVO0FBQUEsVUFDVixNQUFRO0FBQUEsWUFDTixPQUFTO0FBQUEsY0FDUDtBQUFBLGNBQ0E7QUFBQSxjQUNBO0FBQUEsY0FDQTtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLGdCQUFrQjtBQUFBLFFBQ2hCLElBQU07QUFBQSxRQUNOLE1BQVE7QUFBQSxVQUNOLE9BQVM7QUFBQSxZQUNQO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxRQUNBLFFBQVU7QUFBQSxVQUNSLFFBQVU7QUFBQSxVQUNWLElBQU07QUFBQSxVQUNOLElBQU07QUFBQSxZQUNKO0FBQUEsY0FDRTtBQUFBLGNBQ0E7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsTUFDQSxPQUFTO0FBQUEsUUFDUCxJQUFNO0FBQUEsUUFDTixNQUFRO0FBQUEsVUFDTixPQUFTO0FBQUEsWUFDUDtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsUUFDQSxRQUFVO0FBQUEsVUFDUixRQUFVO0FBQUEsVUFDVixJQUFNO0FBQUEsVUFDTixJQUFNO0FBQUEsWUFDSjtBQUFBLGNBQ0U7QUFBQSxjQUNBO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLE1BQ0EsTUFBUTtBQUFBLFFBQ04sSUFBTTtBQUFBLFFBQ04sTUFBUTtBQUFBLFVBQ04sT0FBUztBQUFBLFlBQ1A7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLFFBQ0EsUUFBVTtBQUFBLFVBQ1IsUUFBVTtBQUFBLFVBQ1YsSUFBTTtBQUFBLFVBQ04sSUFBTTtBQUFBLFlBQ0o7QUFBQSxjQUNFO0FBQUEsY0FDQTtBQUFBLGNBQ0E7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsTUFDQSxRQUFVO0FBQUEsUUFDUixjQUFnQjtBQUFBLFVBQ2QsSUFBTTtBQUFBLFVBQ04sUUFBVTtBQUFBLFlBQ1IsUUFBVTtBQUFBLFlBQ1YsSUFBTTtBQUFBLFlBQ04sSUFBTTtBQUFBLGNBQ0o7QUFBQSxnQkFDRTtBQUFBLGNBQ0Y7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFVBQ0EsTUFBUTtBQUFBLFlBQ04sUUFBVTtBQUFBLGNBQ1I7QUFBQSxjQUNBO0FBQUEsY0FDQTtBQUFBLGNBQ0E7QUFBQSxZQUNGO0FBQUEsWUFDQSxPQUFTO0FBQUEsY0FDUDtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsVUFDQSxLQUFPO0FBQUEsWUFDTCxjQUFnQjtBQUFBLGNBQ2Q7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxRQUNBLGFBQWU7QUFBQSxVQUNiLElBQU07QUFBQSxVQUNOLFFBQVU7QUFBQSxZQUNSLFFBQVU7QUFBQSxZQUNWLElBQU07QUFBQSxZQUNOLElBQU07QUFBQSxjQUNKO0FBQUEsZ0JBQ0U7QUFBQSxjQUNGO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxVQUNBLE1BQVE7QUFBQSxZQUNOLFFBQVU7QUFBQSxjQUNSO0FBQUEsY0FDQTtBQUFBLGNBQ0E7QUFBQSxjQUNBO0FBQUEsWUFDRjtBQUFBLFlBQ0EsT0FBUztBQUFBLGNBQ1A7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFVBQ0EsS0FBTztBQUFBLFlBQ0wsYUFBZTtBQUFBLGNBQ2I7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsTUFDQSxNQUFRO0FBQUEsUUFDTixJQUFNO0FBQUEsUUFDTixNQUFRO0FBQUEsVUFDTixPQUFTO0FBQUEsWUFDUDtBQUFB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TUFDRjtBQUFBLE1BQ0EsVUFBVTtBQUNSLHlCQUFpQjtBQUFBLE1BQ25CO0FBQUEsSUFDRixDQUFDO0FBRUQsZUFBRyxJQUFJLFdBQVcsS0FBSyxNQUFNO0FBQzdCLElBQUFDLG9CQUFjLEtBQUssTUFBTTtBQUN6QixXQUFPLE1BQU0sVUFBVTtBQUV2QixnQkFBSSxNQUFNLHlRQUF5USxDQUFDLFFBQVE7QUFFMVIsVUFBSSxlQUFlLFlBQUksUUFBUSxLQUFLLENBQUMsRUFBRSxJQUFJO0FBQzNDLG1CQUFhLGdCQUFnQixVQUFVO0FBQUEsSUFDekMsQ0FBQztBQUFBLEVBQ0gsR0FBRzs7O0FDNUtILEdBQUMsWUFBWTtBQUVYLFFBQUk7QUFDSixXQUFPLE1BQU07QUFDWCxlQUFTLFNBQVMsY0FBYywwQkFBMEI7QUFDMUQsVUFBSTtBQUFRO0FBQ1osWUFBTSxJQUFJLFFBQVEsYUFBVyxXQUFXLFNBQVMsR0FBRyxDQUFDO0FBQUEsSUFDdkQ7QUFFQSxXQUFPLFlBQVk7QUFDbkIsV0FBTyxhQUFhLFdBQVcsV0FBVztBQUFBLEVBQzVDLEdBQUc7OztBQ1JILFNBQU8sZUFBZSxRQUFRLFNBQVM7QUFBQSxJQUNyQyxNQUFNO0FBQ0osYUFBTyxZQUFJO0FBQUEsSUFDYjtBQUFBLEVBQ0YsQ0FBQztBQUNELFNBQU8sU0FBUztBQUVoQixHQUFDLFlBQVk7QUFDWCw4QkFBaUIsS0FBSztBQUN0QixVQUFNLHdCQUF3QjtBQUM5Qiw4QkFBaUIsS0FBSztBQUFBLEVBQ3hCLEdBQUc7IiwKICAibmFtZXMiOiBbImV2ZW50IiwgIm1ha2UiLCAidGFyZ2V0IiwgInRyZWUiLCAic2VhcmNoRmlsdGVyIiwgIndhbGthYmxlIiwgImlnbm9yZSIsICJmb3VuZCIsICJjb21wb25lbnRzIiwgIl8iLCAiY2hlY2siLCAibW9kdWxlcyIsICJyZXF1aXJlIiwgImZvdW5kIiwgImZpbmRlciIsICJmb3VuZCIsICJyZXEiLCAiZmluZGVyIiwgIm5hbWUiLCAiY29tbW9uX2RlZmF1bHQiLCAiY29tbW9uX2RlZmF1bHQiLCAibm9TdG9yZSIsICJfIiwgIl8iLCAiXyIsICJ2YWwiLCAiZXJyb3IiLCAib3V0IiwgIl8iLCAiY2hlY2siLCAiQkFTRV9VUkwiLCAibmVzdHMiLCAiY29tbW9uX2RlZmF1bHQiLCAic2V0IiwgInNob3ciLCAiY29tbW9uX2RlZmF1bHQiLCAib3V0IiwgIl8iLCAiUmVhY3QiLCAiY29tbW9uX2RlZmF1bHQiLCAiY29tbW9uX2RlZmF1bHQiLCAiUmVhY3QiLCAiY29tbW9uX2RlZmF1bHQiLCAiaW50ZXJhY3RlZCIsICJnZXRDb250YWluZXIiLCAic2hvdyIsICJzdHlsZV9kZWZhdWx0IiwgInN0eWxlX2RlZmF1bHQiLCAic3R5bGVfZGVmYXVsdCIsICJzdHlsZV9kZWZhdWx0IiwgInN0eWxlX2RlZmF1bHQiLCAic3R5bGVfZGVmYXVsdCIsICJjb21wb25lbnRzX2RlZmF1bHQiLCAibmFtZSIsICJjb21wb25lbnRzX2RlZmF1bHQiLCAib3V0IiwgIm5hbWUiLCAiXyIsICJzb3VyY2UiLCAiYXBpIiwgImRhdGEiLCAic291cmNlIiwgIm91dCIsICJhcGkiLCAic3R5bGVfZGVmYXVsdCIsICJzdHlsZV9kZWZhdWx0IiwgInN0eWxlX2RlZmF1bHQiLCAiZXh0ZW5zaW9uIiwgInN0eWxlX2RlZmF1bHQiLCAic3R5bGVfZGVmYXVsdCIsICJzdHlsZV9kZWZhdWx0IiwgInN0eWxlX2RlZmF1bHQiLCAic3R5bGVfZGVmYXVsdCIsICJzdHlsZV9kZWZhdWx0IiwgImNvbXBvbmVudHNfZGVmYXVsdCIsICJjb21wb25lbnRzX2RlZmF1bHQiLCAic3R5bGVfZGVmYXVsdCIsICJlbG0iLCAiY29tcG9uZW50c19kZWZhdWx0Il0KfQo=
