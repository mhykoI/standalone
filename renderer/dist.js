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

  // src/api/ui/vue/components/discord-button/style.scss
  var style_default2 = `
.acord--discord-button{position:relative;display:flex;justify-content:center;align-items:center;box-sizing:border-box;background:none;border:none;border-radius:3px;font-size:14px;font-weight:500;line-height:16px;padding:2px 16px;user-select:none}.acord--discord-button:disabled,.acord--discord-button[aria-disabled=true]{cursor:not-allowed;opacity:.5}.acord--discord-button .acord--discord-button-contents{--button--underline-color: transparent;background-image:linear-gradient(0deg, transparent, transparent 1px, var(--button--underline-color) 0, var(--button--underline-color) 2px, transparent 0)}.acord--discord-button-lookFilled.colorBrand{color:var(--white-500);background-color:var(--brand-experiment)}.acord--discord-button-lookFilled.colorBrand:hover{background-color:var(--brand-experiment-560)}.acord--discord-button-lookFilled.colorBrand:active{background-color:var(--brand-experiment-600)}.acord--discord-button-lookFilled.colorBrand .spinnerItem-3Y5NsU{background-color:var(--white-500)}.acord--discord-button-lookFilled.colorBrand:disabled,.acord--discord-button-lookFilled.colorBrand[aria-disabled=true]{background-color:var(--brand-experiment)}.acord--discord-button-lookFilled.colorPrimary{color:var(--white-500);background-color:var(--button-secondary-background)}.acord--discord-button-lookFilled.colorPrimary:hover{background-color:var(--button-secondary-background-hover)}.acord--discord-button-lookFilled.colorPrimary:active{background-color:var(--button-secondary-background-active)}.acord--discord-button-lookFilled.colorPrimary .spinnerItem-3Y5NsU{background-color:var(--primary-100)}.acord--discord-button-lookFilled.colorPrimary:disabled,.acord--discord-button-lookFilled.colorPrimary[aria-disabled=true]{background-color:var(--button-secondary-background-disabled)}.acord--discord-button-lookFilled.colorGreen{color:var(--white-500);background-color:var(--button-positive-background)}.acord--discord-button-lookFilled.colorGreen:hover{background-color:var(--button-positive-background-hover)}.acord--discord-button-lookFilled.colorGreen:active{background-color:var(--button-positive-background-active)}.acord--discord-button-lookFilled.colorGreen .spinnerItem-3Y5NsU{background-color:var(--white-500)}.acord--discord-button-lookFilled.colorGreen:disabled,.acord--discord-button-lookFilled.colorGreen[aria-disabled=true]{background-color:var(--button-positive-background-disabled)}.acord--discord-button-lookFilled.colorRed{color:var(--white-500);background-color:var(--button-danger-background)}.acord--discord-button-lookFilled.colorRed:hover{background-color:var(--button-danger-background-hover)}.acord--discord-button-lookFilled.colorRed:active{background-color:var(--button-danger-background-active)}.acord--discord-button-lookFilled.colorRed .spinnerItem-3Y5NsU{background-color:var(--white-500)}.acord--discord-button-lookFilled.colorRed:disabled,.acord--discord-button-lookFilled.colorRed[aria-disabled=true]{background-color:var(--button-danger-background-disabled)}.acord--discord-button-lookFilled.colorBrandNew{color:var(--white-500);background-color:var(--brand-500)}.acord--discord-button-lookFilled.colorBrandNew:hover{background-color:var(--brand-560)}.acord--discord-button-lookFilled.colorBrandNew:active{background-color:var(--brand-600)}.acord--discord-button-lookFilled.colorBrandNew .spinnerItem-3Y5NsU{background-color:var(--white-500)}.acord--discord-button-lookFilled.colorBrandNew:disabled,.acord--discord-button-lookFilled.colorBrandNew[aria-disabled=true]{background-color:var(--brand-500)}.acord--discord-button-lookFilled.colorWhite{color:var(--primary-500);background-color:var(--white-500)}.acord--discord-button-lookFilled.colorWhite .spinnerItem-3Y5NsU{background-color:var(--primary-500)}.acord--discord-button-lookFilled.colorWhite:disabled,.acord--discord-button-lookFilled.colorWhite[aria-disabled=true]{background-color:var(--white-500)}.acord--discord-button-lookFilled.colorYellow{color:var(--white-500);background-color:var(--status-warning)}.acord--discord-button-lookFilled.colorYellow .spinnerItem-3Y5NsU{background-color:var(--white-500)}.acord--discord-button-lookFilled.colorYellow:disabled,.acord--discord-button-lookFilled.colorYellow[aria-disabled=true]{background-color:var(--status-warning)}.acord--discord-button-grow{width:auto}.acord--discord-button .acord--discord-button-contents{--button--underline-color: transparent;background-image:linear-gradient(0deg, transparent, transparent 1px, var(--button--underline-color) 0, var(--button--underline-color) 2px, transparent 0)}.acord--discord-button.sizeTiny{width:52px;height:24px;min-width:52px;min-height:24px}.acord--discord-button.sizeSmall{width:60px;height:32px;min-width:60px;min-height:32px}.acord--discord-button.sizeMedium{width:96px;height:38px;min-width:96px;min-height:38px}.acord--discord-button.sizeLarge{width:130px;height:44px;min-width:130px;min-height:44px}.acord--discord-button.sizeXlarge{width:148px;height:50px;min-width:148px;min-height:50px;font-size:16px;line-height:normal;padding:2px 20px}.acord--discord-button.sizeMin{display:inline;width:auto;height:auto;padding:2px 4px}.acord--discord-button.sizeMax{width:100%;height:100%;min-width:100%;min-height:100%;font-size:16px}`;

  // src/api/ui/vue/components/discord-button/index.js
  patcher_default.injectCSS(style_default2);
  var discord_button_default = {
    /** @param {import("vue").App} vueApp */
    load(vueApp) {
      vueApp.component("discord-button", {
        template: `
        <div class="acord--discord-button acord--discord-button-lookFilled acord--discord-button-grow" :class="\`\${color ? \`color\${color[0].toUpperCase()}\${color.slice(1).toLowerCase()}\` : 'colorBrand'} \${size ? \`size\${size[0].toUpperCase()}\${size.slice(1).toLowerCase()}\` : 'sizeMedium'}\`" @click="onClick">
          <div class="acord--discord-button-contents">{{value}}</div>
        </div>
      `,
        props: ["value", "size", "color"],
        emits: ["click"],
        methods: {
          onClick(e) {
            this.$emit("click", e);
          }
        }
      });
    }
  };

  // src/api/ui/vue/components/discord-check/style.scss
  var style_default3 = `
.acord--discord-check{color:var(--white-700);background-color:currentColor;z-index:0}.acord--discord-check .slider{transition:100ms ease-in-out all;left:-3px}.acord--discord-check.checked{color:var(--green-400)}.acord--discord-check.checked .slider{transition:100ms ease-in-out all;left:12px}.acord--discord-check{position:relative;width:40px;height:24px}.acord--discord-check,.input-125oad{border-radius:14px;cursor:pointer}.acord--discord-check-slider{display:block;position:absolute;left:0;width:28px;height:18px;margin:3px}`;

  // src/api/ui/vue/components/discord-check/index.js
  patcher_default.injectCSS(style_default3);
  var discord_check_default = {
    /** @param {import("vue").App} vueApp */
    load(vueApp) {
      vueApp.component("discord-check", {
        template: `
        <div class="acord--discord-check default-colors" 
          :class="{'checked': modelValue}" 
          @click="onClick"
        >
          <svg class="acord--discord-check-slider slider" viewBox="0 0 28 20" preserveAspectRatio="xMinYMid meet">
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

  // src/api/ui/vue/components/discord-input/style.scss
  var style_default4 = `
.acord--discord-input{font-size:16px;box-sizing:border-box;width:100%;border-radius:3px;color:var(--text-normal);background-color:var(--input-background);border:none;transition:border-color .2s ease-in-out}.acord--discord-input::placeholder{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;color:var(--input-placeholder-text)}.acord--discord-input:hover{border-color:var(--deprecated-text-input-border-hover)}.acord--discord-input.focused-16iuXg,.acord--discord-input:focus{border-color:var(--text-link)}.acord--discord-input.error-10GvqR{border-color:var(--status-danger)}.acord--discord-input.success-1V4i3f{border-color:var(--green-360)}.acord--discord-input.disabled-1-f06g{border-color:var(--deprecated-text-input-border-disabled)}.acord--discord-input.editable-1wRwlY{background-color:rgba(0,0,0,0);border-color:rgba(0,0,0,0)}.acord--discord-inputWrapper{position:relative}.theme-dark .acord--discord-inputDefault::placeholder{color:hsl(var(--primary-100-hsl)/0.3)}.theme-dark .acord--discord-inputDefault{color:var(--primary-100)}.theme-light .acord--discord-inputDefault::placeholder{color:hsl(var(--primary-500-hsl)/0.3)}.theme-light .acord--discord-inputDefault{color:var(--primary-500)}.acord--discord-input-inner{position:relative;font-size:16px;line-height:20px;background-color:rgba(0,0,0,0);padding:10px 0 10px 10px;white-space:nowrap;text-overflow:ellipsis;overflow:hidden}.acord--discord-input-inner{width:100%;min-width:0;box-sizing:border-box;flex:1 1 auto;border:none;transition:color .15s ease;cursor:text}`;

  // src/api/ui/vue/components/discord-input/index.js
  patcher_default.injectCSS(style_default4);
  var discord_input_default = {
    /** @param {import("vue").App} vueApp */
    load(vueApp) {
      vueApp.component("discord-input", {
        template: `
        <div class="acord--discord-input">
          <div class="acord--discord-inputWrapper">
            <input :type="type ?? 'text'" class="acord--discord-inputDefault acord--discord-input-inner" :value="modelValue" :placeholder="placeholder" :maxlength="maxlength" :min="min" :step="step" :max="max" :style="style" @input="onInput" />
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
  var style_default5 = `
.acord--discord-select{position:relative;width:100%}.acord--discord-select>.options{position:absolute;top:100%;width:100%;max-height:286px;overflow-x:hidden;overflow-y:scroll;z-index:1}.acord--discord-select>.options.top-popout{top:auto;bottom:100%}.acord--discord-select{border:1px solid rgba(0,0,0,0);padding:8px 8px 8px 12px;cursor:pointer;-webkit-box-sizing:border-box;box-sizing:border-box;display:grid;grid-template-columns:1fr auto;-webkit-box-align:center;-ms-flex-align:center;align-items:center;border-radius:4px}.acord--discord-select{color:var(--text-normal);font-weight:500}.acord--discord-select-lookFilled.acord--discord-select-option,.acord--discord-select-lookFilled.acord--discord-select:hover.acord--discord-select-option{border-bottom-color:var(--brand-experiment);border-color:var(--brand-experiment) var(--brand-experiment) var(--background-tertiary)}.acord--discord-select-lookFilled.acord--discord-select{background-color:var(--input-background);border-color:var(--input-background)}.acord--discord-select-popout{box-sizing:border-box;border:1px solid var(--background-tertiary);background:var(--background-secondary);border-radius:0 0 4px 4px}.acord--discord-select-lookFilled.acord--discord-select-popout{border-radius:0 0 3px 3px}.acord--discord-select-lookFilled.acord--discord-select-popout.popoutPositionTop-3Uhefd{border-radius:3px 3px 0 0}.acord--discord-select-open{border-radius:4px 4px 0 0;border-bottom-color:rgba(0,0,0,0)}.selectPositionTop-3OGkHL.acord--discord-select-open{border-radius:0 0 4px 4px}.placeholder-2k_BvH,.acord--discord-select-value{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.wrapper-mJT04A .acord--discord-select-value{display:flex}.wrapper-mJT04A .acord--discord-select-value.multi-2vPqc4{display:block;white-space:normal}.acord--discord-select-value{gap:8px}.acord--discord-select-value{display:flex;align-items:center}.acord--discord-select-icons{gap:4px}.acord--discord-select-icons,.acord--discord-select-value{display:flex;align-items:center}.wrapper-mJT04A .acord--discord-select-icons{grid-column:2;grid-row:1;-webkit-margin-end:8px;margin-inline-end:8px;pointer-events:none}.acord--discord-select-scrollerBase{position:relative;-webkit-box-sizing:border-box;box-sizing:border-box;min-height:0;-webkit-box-flex:1;-ms-flex:1 1 auto;flex:1 1 auto}.acord--discord-select-scrollThin{scrollbar-width:thin}.acord--discord-select-scrollThin,.acord--discord-select-scrollThin.fade-27X6bG.scrolling-37kgoT,.acord--discord-select-scrollThin.fade-27X6bG:hover{scrollbar-color:var(--scrollbar-thin-thumb) var(--scrollbar-thin-track)}.acord--discord-select-scrollThin::-webkit-scrollbar{width:8px;height:8px}.acord--discord-select-scrollThin::-webkit-scrollbar-track{border-color:var(--scrollbar-thin-track);background-color:var(--scrollbar-thin-track);border:2px solid var(--scrollbar-thin-track)}.acord--discord-select-scrollThin::-webkit-scrollbar-thumb{background-clip:padding-box;border:2px solid rgba(0,0,0,0);border-radius:4px;background-color:var(--scrollbar-thin-thumb);min-height:40px}.acord--discord-select-scrollThin::-webkit-scrollbar-corner{background-color:rgba(0,0,0,0)}.theme-dark.custom-theme-background .customTheme-3QAYZq.acord--discord-select-scrollThin::-webkit-scrollbar-thumb{background-size:200vh;background-image:linear-gradient(rgb(var(--bg-overlay-color-inverse)/var(--bg-overlay-opacity-4)), rgb(var(--bg-overlay-color-inverse)/var(--bg-overlay-opacity-4))),var(--custom-theme-background)}.theme-light.custom-theme-background .customTheme-3QAYZq.acord--discord-select-scrollThin::-webkit-scrollbar-thumb{background-size:100vh;background-image:rgb(var(--bg-overlay-color-inverse)/var(--bg-overlay-opacity-6)),rgb(var(--bg-overlay-color)/var(--bg-overlay-opacity-3))}.acord--discord-select-lookFilled.acord--discord-select-option,.acord--discord-select-lookFilled.acord--discord-select:hover.acord--discord-select-option{border-bottom-color:var(--brand-experiment);border-color:var(--brand-experiment) var(--brand-experiment) var(--background-tertiary)}.acord--discord-select-option{padding:12px;cursor:pointer;color:var(--interactive-normal);display:grid;grid-template-columns:1fr auto;align-items:center;font-weight:500;box-sizing:border-box}.acord--discord-select-option.focused-10mbp-,.acord--discord-select-option:focus,.acord--discord-select-option:hover{background-color:var(--background-modifier-hover);color:var(--interactive-hover)}.acord--discord-select-option[aria-selected=true]:not(.acord--discord-select-option.multi-2vPqc4){color:var(--interactive-active);background-color:var(--background-modifier-selected)}.acord--discord-select-selectedIcon{color:var(--brand-experiment)}`;

  // src/api/ui/vue/components/discord-select/index.js
  patcher_default.injectCSS(style_default5);
  var discord_select_default = {
    /** @param {import("vue").App} vueApp */
    load(vueApp) {
      vueApp.component("discord-select", {
        template: `
        <div class="acord--discord-select acord--discord-select-lookFilled acord--discord-select" :class="{'acord--discord-select-open': active}">
          <div class="acord--discord-select-value">{{options.find(i=>i.value === modelValue)?.label}}</div>
          <div class="acord--discord-select-icons">
              <svg v-if="!active" class="icon" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M16.59 8.59003L12 13.17L7.41 8.59003L6 10L12 16L18 10L16.59 8.59003Z"></path></svg>
              <svg v-else class="icon" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M7.41 16.0001L12 11.4201L16.59 16.0001L18 14.5901L12 8.59006L6 14.5901L7.41 16.0001Z"></path></svg>
          </div>
          <div v-if="active" class="options acord--discord-select-popout acord--discord-select-scrollerBase acord--discord-select-scrollThin" :class="{'top-popout': popoutPosition === 'top'}">
            <div v-for="option in options" class="option acord--discord-select-option" @click="onOptionClick($event, option)" :key="option.value" :aria-selected="\`\${modelValue === option.value}\`">
              {{option.label}}
              <svg v-if="modelValue === option.value" class="acord--discord-select-selectedIcon" role="img" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle r="8" cx="12" cy="12" fill="white"></circle><g fill="none" fill-rule="evenodd"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></g></svg>
            </div>
          </div>
        </div>
      `,
        data() {
          return {
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
            if (e.target.classList.contains("acord--discord-select") || e.target.classList.contains("acord--discord-select-value") || e.target.classList.contains("acord--discord-select-icons") || e.target.classList.contains("acord--discord-select-popout") || e.target.classList.contains("acord--discord-select-option") || e.target.classList.contains("icon")) {
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
  var style_default6 = `
.acord--discord-textarea{width:100%}.acord--discord-textarea-inputWrapper{display:flex;flex-direction:column}.acord--discord-textarea-inputDefault{padding:10px;height:40px}.acord--discord-textarea-input{font-size:16px;box-sizing:border-box;width:100%;border-radius:3px;color:var(--text-normal);background-color:var(--input-background);border:none;transition:border-color .2s ease-in-out}.acord--discord-textarea-input::placeholder{user-select:none;color:var(--input-placeholder-text)}.acord--discord-textarea-input:hover{border-color:var(--deprecated-text-input-border-hover)}.acord--discord-textarea-input:focus{border-color:var(--text-link)}.acord--discord-textarea-input.error{border-color:var(--status-danger)}.acord--discord-textarea-input.success{border-color:var(--green-360)}.acord--discord-textarea-input.disabled{border-color:var(--deprecated-text-input-border-disabled)}.acord--discord-textarea-input.editable{background-color:rgba(0,0,0,0);border-color:rgba(0,0,0,0)}.acord--discord-textarea-textArea{height:auto;resize:none}.acord--discord-textarea-scrollbarDefault::-webkit-scrollbar{width:14px;height:14px}.acord--discord-textarea-scrollbarDefault::-webkit-scrollbar-thumb,.acord--discord-textarea-scrollbarDefault::-webkit-scrollbar-track{border-radius:7px;background-clip:padding-box;border:3px solid rgba(0,0,0,0)}.acord--discord-textarea-scrollbarDefault::-webkit-scrollbar-thumb{background-color:var(--scrollbar-auto-thumb)}.acord--discord-textarea-scrollbarDefault::-webkit-scrollbar-track{background-color:var(--scrollbar-auto-track);border-width:initial}.acord--discord-textarea-scrollbar::-webkit-scrollbar-corner{border:none;background:none}`;

  // src/api/ui/vue/components/discord-textarea/index.js
  patcher_default.injectCSS(style_default6);
  var discord_textarea_default = {
    /** @param {import("vue").App} vueApp */
    load(vueApp) {
      vueApp.component("discord-textarea", {
        template: `
        <div class="acord--discord-textarea-inputWrapper acord--discord-textarea">
          <textarea class="acord--discord-textarea-inputDefault acord--discord-textarea-input acord--discord-textarea-textArea acord--discord-textarea-scrollbarDefault acord--discord-textarea-scrollbar" :value="modelValue" :placeholder="placeholder" :maxlength="maxlength" :cols="cols" :rows="rows" :style="style" @input="onInput"></textarea>
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
  var style_default7 = `
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
  var style_default8 = `
.acord--installed-extensions-page{display:flex;align-items:flex-start;justify-content:center;padding:0 16px}.acord--installed-extensions-page .container{width:100%;max-width:1024px;display:flex;flex-direction:column}.acord--installed-extensions-page .container>.top{display:flex;align-items:center;gap:8px}.acord--installed-extensions-page .container>.top>.search{width:80%}.acord--installed-extensions-page .container>.top>.category{width:20%}.acord--installed-extensions-page .container>.bottom{display:flex;flex-direction:column;gap:16px;margin-top:16px}`;

  // src/ui/home/vue/components/pages/installed-extensions-page/index.js
  patcher_default.injectCSS(style_default8);
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
                  <discord-select v-model="searchCategoryText" :options="[{value: 'all', label: i18nFormat('ALL')}, {value: 'plugin', label: i18nFormat('PLUGINS')}, {value: 'theme', label: i18nFormat('THEMES')}]" />
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
              this.$forceUpdate();
            },
            searchCategoryText() {
              this.updateFiltered();
              this.$forceUpdate();
            }
          },
          mounted() {
            this.onStorageUpdate();
            this.updateFiltered();
            this.$forceUpdate();
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
  var style_default9 = `
.acord--config-item{width:100%;display:flex}.acord--config-row{width:100%;display:flex;flex-direction:row;justify-content:space-between;align-items:center;gap:4px}.acord--config-row.horizontal-align-left{justify-content:flex-start}.acord--config-row.horizontal-align-right{justify-content:flex-end}.acord--config-row.horizontal-align-center{justify-content:center}.acord--config-row.justify-space-between{justify-content:space-between}.acord--config-row.justify-space-around{justify-content:space-around}.acord--config-row.vertical-align-top{align-items:flex-start}.acord--config-row.vertical-align-bottom{align-items:flex-end}.acord--config-column{width:100%;display:flex;flex-direction:column;justify-content:flex-start;align-items:center;gap:4px}.acord--config-column.horizontal-align-left{justify-content:flex-start}.acord--config-column.horizontal-align-right{justify-content:flex-end}.acord--config-column.horizontal-align-center{justify-content:center}.acord--config-column.justify-space-between{justify-content:space-between}.acord--config-column.justify-space-around{justify-content:space-around}.acord--config-column.vertical-align-top{align-items:flex-start}.acord--config-column.vertical-align-bottom{align-items:flex-end}.acord--config-column.vertical-align-center{align-items:center}.acord--config-heading{font-size:1.2rem;font-weight:500;color:#f5f5f5}.acord--config-paragraph{font-size:1rem;font-weight:400;color:rgba(245,245,245,.85)}.acord--config-check,.acord--config-button{width:fit-content}`;

  // src/ui/home/vue/components/components/config/index.js
  patcher_default.injectCSS(style_default9);
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
  var style_default10 = `
.acord--installed-extension-card{width:100%;background-color:#2c2e32;border-radius:8px;display:flex;flex-direction:column;gap:8px;position:relative}.acord--installed-extension-card>.status-container{position:absolute;top:-9px;right:8px;border-radius:9999px;padding:8px;height:24px;display:flex;gap:6px;align-items:center;background-color:#1e1f22}.acord--installed-extension-card>.status-container>.loaded-state{width:14px;height:14px;border-radius:50%;background-color:#82858f}.acord--installed-extension-card>.status-container>.loaded-state.active{background-color:#23a55a;filter:drop-shadow(0px 0px 4px #23a55a)}.acord--installed-extension-card>.status-container>.development-mode-warning{color:#f0b232;filter:drop-shadow(0px 0px 4px #f0b232);display:flex;align-items:center;justify-content:center;border-radius:50%}.acord--installed-extension-card>.top{background-color:#212225;border-radius:8px;width:100%;padding:16px;height:128px;display:flex;justify-content:space-between}.acord--installed-extension-card>.top>.left{display:flex;flex-direction:column;height:100%;gap:4px}.acord--installed-extension-card>.top>.left>.top{display:flex;align-items:flex-end;gap:4px}.acord--installed-extension-card>.top>.left>.top>.name{font-size:1.4rem;font-weight:500;color:#fff}.acord--installed-extension-card>.top>.left>.top>.version{font-size:1rem;font-weight:300;color:rgba(255,255,255,.5)}.acord--installed-extension-card>.top>.left>.bottom{display:flex;flex-direction:column;gap:8px}.acord--installed-extension-card>.top>.left>.bottom>.top{display:flex}.acord--installed-extension-card>.top>.left>.bottom>.top>.authors{display:flex;gap:2px;font-size:12px;font-weight:300;color:rgba(255,255,255,.45)}.acord--installed-extension-card>.top>.left>.bottom>.top>.authors>.label{font-weight:500;margin-right:2px}.acord--installed-extension-card>.top>.left>.bottom>.top>.authors .author{display:flex}.acord--installed-extension-card>.top>.left>.bottom>.top>.authors .author .hoverable:hover{cursor:pointer;text-decoration:underline}.acord--installed-extension-card>.top>.left>.bottom>.bottom>.description{font-size:16px;color:rgba(255,255,255,.75)}.acord--installed-extension-card>.top>.right{display:flex;height:100%;flex-direction:column;justify-content:space-between;align-items:flex-end}.acord--installed-extension-card>.top>.right>.top{display:flex}.acord--installed-extension-card>.top>.right>.top>.controls{display:flex;align-items:center;gap:8px}.acord--installed-extension-card>.top>.right>.top>.controls .control{display:flex;padding:8px;background-color:rgba(0,0,0,.25);border-radius:8px;color:#f5f5f5;cursor:pointer}.acord--installed-extension-card>.top>.right>.top>.controls .control:hover{background-color:rgba(0,0,0,.5)}.acord--installed-extension-card>.top>.right>.bottom{display:flex}.acord--installed-extension-card>.top>.right>.bottom>.settings{display:flex;align-items:center;justify-content:flex-end;cursor:pointer;font-weight:300;color:rgba(255,255,255,.75);gap:8px}.acord--installed-extension-card>.top>.right>.bottom>.settings svg{padding:4px;background-color:rgba(0,0,0,.25);border-radius:4px;color:#fff}.acord--installed-extension-card>.bottom{border-radius:8px;width:100%;padding:16px}`;

  // src/ui/home/vue/components/components/cards/installed-extension-card/index.js
  patcher_default.injectCSS(style_default10);
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
  var style_default11 = `
.acord--store-extension-card{width:275px;height:250px;display:flex;flex-direction:column;border-radius:4px;contain:content;background-color:rgba(0,0,0,.1);box-shadow:var(--elevation-medium)}.acord--store-extension-card>.preview{width:100%;height:100px;display:flex;flex-direction:column;justify-content:space-between;align-items:center;background-color:var(--brand-500);background-position:center;background-size:cover}.acord--store-extension-card>.preview>.controls{padding:8px;display:flex;align-items:center;justify-content:space-between;width:100%}.acord--store-extension-card>.preview>.controls .go{background-color:rgba(0,0,0,.5);box-shadow:0px 0px 4px rgba(0,0,0,.5);border-radius:50%;width:24px;height:24px;display:flex;align-items:center;justify-content:center;color:var(--header-primary);font-weight:600;cursor:pointer}.acord--store-extension-card>.preview>.name-container{display:flex;align-items:center;justify-content:center;color:var(--header-primary);padding:8px}.acord--store-extension-card>.preview>.name-container>.name{font-size:14px;background-color:rgba(0,0,0,.5);box-shadow:0px 0px 4px rgba(0,0,0,.5);border-radius:9999px;padding:4px 8px}.acord--store-extension-card>.info-container{display:flex;justify-content:space-between;flex-direction:column;padding:8px;height:150px;width:100%}.acord--store-extension-card>.info-container>.top{display:flex;flex-direction:column;gap:4px;height:100%}.acord--store-extension-card>.info-container>.top>.name-container{display:flex;align-items:center;gap:4px;width:100%}.acord--store-extension-card>.info-container>.top>.name-container>.name{font-size:16px;font-weight:500;color:var(--header-primary)}.acord--store-extension-card>.info-container>.top>.name-container>.version{font-size:12px;font-weight:500;color:var(--header-primary);opacity:.5}.acord--store-extension-card>.info-container>.top>.description{font-size:14px;font-weight:300;color:var(--header-primary);opacity:.75;width:100%}.acord--store-extension-card>.info-container>.bottom{display:flex;align-items:flex-start;justify-content:space-between;height:100%}.acord--store-extension-card>.info-container>.bottom>.left{height:100%;display:flex;flex-direction:column;align-items:flex-start;justify-content:flex-end}.acord--store-extension-card>.info-container>.bottom>.left>.authors{display:flex;flex-direction:column;gap:4px}.acord--store-extension-card>.info-container>.bottom>.left>.authors .author{display:flex;align-items:center;border-radius:9999px;background-color:rgba(0,0,0,.1);cursor:pointer}.acord--store-extension-card>.info-container>.bottom>.left>.authors .author>.image{border-radius:50%;width:18px;height:18px;background-color:var(--brand-500);background-position:center;background-size:cover}.acord--store-extension-card>.info-container>.bottom>.left>.authors .author>.name{font-size:10px;font-weight:400;color:var(--header-primary);opacity:.75;padding:6px}.acord--store-extension-card>.info-container>.bottom>.right{height:100%;display:flex;flex-direction:column;align-items:flex-end;justify-content:flex-end}`;

  // src/ui/home/vue/components/components/cards/store-extension-card/index.js
  patcher_default.injectCSS(style_default11);
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
  patcher_default.injectCSS(style_default7);
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibm9kZV9tb2R1bGVzL25lc3RzL2Nqcy9FdmVudHMuanMiLCAibm9kZV9tb2R1bGVzL25lc3RzL2Nqcy9FdmVudEVtaXR0ZXIuanMiLCAibm9kZV9tb2R1bGVzL25lc3RzL2Nqcy9tYWtlLmpzIiwgIm5vZGVfbW9kdWxlcy9uZXN0cy9janMvaW5kZXguanMiLCAic3JjL2RhdGEvY29tbW9uLmpzb24iLCAic3JjL2FwaS91dGlscy9yYXcvZmluZC1pbi10cmVlLmpzIiwgInNyYy9hcGkvdXRpbHMvbG9nZ2VyLmpzIiwgInNyYy9hcGkvdXRpbHMvcmVhY3QuanMiLCAic3JjL2FwaS91dGlscy9pbmRleC5qcyIsICJzcmMvYXBpL21vZHVsZXMvcmF3L2NvbXBsZXgtZmluZGVyLmpzIiwgInNyYy9hcGkvbW9kdWxlcy93ZWJwYWNrLmpzIiwgInNyYy9hcGkvbW9kdWxlcy9jb21tb24uanMiLCAic3JjL2FwaS9tb2R1bGVzL2luZGV4LmpzIiwgInNyYy9hcGkvaTE4bi9pbmRleC5qcyIsICJzcmMvb3RoZXIvdXRpbHMuanMiLCAic3JjL2xpYi9CYXNpY0V2ZW50RW1pdHRlci5qcyIsICJzcmMvYXBpL2V2ZW50cy9pbmRleC5qcyIsICJzcmMvYXBpL2RvbS9pbmRleC5qcyIsICJzcmMvbGliL3NwaXRyb2FzdC9kaXN0L2VzbS9zaGFyZWQuanMiLCAic3JjL2xpYi9zcGl0cm9hc3QvZGlzdC9lc20vaG9vay5qcyIsICJzcmMvbGliL3NwaXRyb2FzdC9kaXN0L2VzbS91bi1wYXRjaC5qcyIsICJzcmMvbGliL3NwaXRyb2FzdC9kaXN0L2VzbS9nZXQtcGF0Y2gtZnVuYy5qcyIsICJzcmMvbGliL3NwaXRyb2FzdC9kaXN0L2VzbS9pbmRleC5qcyIsICJzcmMvYXBpL3BhdGNoZXIvaW5kZXguanMiLCAic3JjL290aGVyL2xvYWRpbmctYW5pbWF0aW9uL3N0eWxlLnNjc3MiLCAic3JjL290aGVyL2xvYWRpbmctYW5pbWF0aW9uL2luZGV4LmpzIiwgInNyYy9hcGkvc3RvcmFnZS9pbmRleC5qcyIsICJub2RlX21vZHVsZXMvaWRiLWtleXZhbC9kaXN0L2luZGV4LmpzIiwgInNyYy9saWIvanNvbi1kZWN5Y2xlZC9pbmRleC5qcyIsICJzcmMvYXBpL2V4dGVuc2lvbnMvaTE4bi5qcyIsICJzcmMvYXBpL2V4dGVuc2lvbnMvaW5kZXguanMiLCAic3JjL2FwaS93ZWJzb2NrZXQvaW5kZXguanMiLCAic3JjL2FwaS91aS9zdHlsZXMuc2NzcyIsICJzcmMvYXBpL3VpL3Rvb2x0aXBzLmpzIiwgInNyYy9hcGkvdWkvbm90aWZpY2F0aW9ucy5qcyIsICJzcmMvYXBpL3VpL2NvbnRleHRNZW51cy5qcyIsICJzcmMvbGliL2NvbXBvbmVudHMvRXJyb3JCb3VuZGFyeS5qc3giLCAic3JjL2FwaS91aS9jb21wb25lbnRzLmpzIiwgInNyYy9hcGkvdWkvbW9kYWxzLmpzeCIsICJzcmMvYXBpL3VpL3RvYXN0cy5qcyIsICJzcmMvYXBpL3VpL3Z1ZS9jb21wb25lbnRzL2Rpc2NvcmQtYnV0dG9uL3N0eWxlLnNjc3MiLCAic3JjL2FwaS91aS92dWUvY29tcG9uZW50cy9kaXNjb3JkLWJ1dHRvbi9pbmRleC5qcyIsICJzcmMvYXBpL3VpL3Z1ZS9jb21wb25lbnRzL2Rpc2NvcmQtY2hlY2svc3R5bGUuc2NzcyIsICJzcmMvYXBpL3VpL3Z1ZS9jb21wb25lbnRzL2Rpc2NvcmQtY2hlY2svaW5kZXguanMiLCAic3JjL2FwaS91aS92dWUvY29tcG9uZW50cy9kaXNjb3JkLWlucHV0L3N0eWxlLnNjc3MiLCAic3JjL2FwaS91aS92dWUvY29tcG9uZW50cy9kaXNjb3JkLWlucHV0L2luZGV4LmpzIiwgInNyYy9hcGkvdWkvdnVlL2NvbXBvbmVudHMvZGlzY29yZC1zZWxlY3Qvc3R5bGUuc2NzcyIsICJzcmMvYXBpL3VpL3Z1ZS9jb21wb25lbnRzL2Rpc2NvcmQtc2VsZWN0L2luZGV4LmpzIiwgInNyYy9hcGkvdWkvdnVlL2NvbXBvbmVudHMvZGlzY29yZC10ZXh0YXJlYS9zdHlsZS5zY3NzIiwgInNyYy9hcGkvdWkvdnVlL2NvbXBvbmVudHMvZGlzY29yZC10ZXh0YXJlYS9pbmRleC5qcyIsICJzcmMvYXBpL3VpL3Z1ZS9jb21wb25lbnRzL2luZGV4LmpzIiwgInNyYy9hcGkvdWkvdnVlL3V0aWxzL3JlY29tcHV0ZS5qcyIsICJzcmMvYXBpL3VpL3Z1ZS9pbmRleC5qcyIsICJzcmMvYXBpL3VpL2luZGV4LmpzIiwgInNyYy9hcGkvc2hhcmVkL2luZGV4LmpzIiwgInNyYy9hcGkvZGV2L2luZGV4LmpzIiwgInNyYy9hcGkvaW50ZXJuYWwvaW5kZXguanMiLCAic3JjL2FwaS9pbmRleC5qcyIsICJzcmMvb3RoZXIvZG9jdW1lbnQtdGl0bGUtY2hhbmdlLmpzIiwgInNyYy9vdGhlci93ZWJzb2NrZXQtdHJpZ2dlcnMuanMiLCAic3JjL3VpL2hvbWUvc3R5bGUuc2NzcyIsICJzcmMvdWkvaG9tZS92dWUvY29tcG9uZW50cy9wYWdlcy9ob21lLXBhZ2UvaW5kZXguanMiLCAic3JjL3VpL2hvbWUvdnVlL2NvbXBvbmVudHMvcGFnZXMvaW5zdGFsbGVkLWV4dGVuc2lvbnMtcGFnZS9zdHlsZS5zY3NzIiwgInNyYy91aS9ob21lL3Z1ZS9jb21wb25lbnRzL3BhZ2VzL2luc3RhbGxlZC1leHRlbnNpb25zLXBhZ2UvaW5kZXguanMiLCAic3JjL3VpL2hvbWUvdnVlL2NvbXBvbmVudHMvcGFnZXMvc2V0dGluZ3MtcGFnZS9pbmRleC5qcyIsICJzcmMvdWkvaG9tZS92dWUvY29tcG9uZW50cy9wYWdlcy9zdG9yZS1wYWdlL2luZGV4LmpzIiwgInNyYy91aS9ob21lL3Z1ZS9jb21wb25lbnRzL3BhZ2VzL2luZGV4LmpzIiwgInNyYy91aS9ob21lL3Z1ZS9jb21wb25lbnRzL2NvbXBvbmVudHMvY29uZmlnL2NvbmZpZy1idXR0b24vaW5kZXguanMiLCAic3JjL3VpL2hvbWUvdnVlL2NvbXBvbmVudHMvY29tcG9uZW50cy9jb25maWcvY29uZmlnLWNoZWNrL2luZGV4LmpzIiwgInNyYy91aS9ob21lL3Z1ZS9jb21wb25lbnRzL2NvbXBvbmVudHMvY29uZmlnL21hcHMuanNvbiIsICJzcmMvdWkvaG9tZS92dWUvY29tcG9uZW50cy9jb21wb25lbnRzL2NvbmZpZy9jb25maWctY29sdW1uL2luZGV4LmpzIiwgInNyYy91aS9ob21lL3Z1ZS9jb21wb25lbnRzL2NvbXBvbmVudHMvY29uZmlnL2NvbmZpZy1oZWFkaW5nL2luZGV4LmpzIiwgInNyYy91aS9ob21lL3Z1ZS9jb21wb25lbnRzL2NvbXBvbmVudHMvY29uZmlnL2NvbmZpZy1pbnB1dC9pbmRleC5qcyIsICJzcmMvdWkvaG9tZS92dWUvY29tcG9uZW50cy9jb21wb25lbnRzL2NvbmZpZy9jb25maWctcGFyYWdyYXBoL2luZGV4LmpzIiwgInNyYy91aS9ob21lL3Z1ZS9jb21wb25lbnRzL2NvbXBvbmVudHMvY29uZmlnL2NvbmZpZy1yb3cvaW5kZXguanMiLCAic3JjL3VpL2hvbWUvdnVlL2NvbXBvbmVudHMvY29tcG9uZW50cy9jb25maWcvY29uZmlnLXNlbGVjdC9pbmRleC5qcyIsICJzcmMvdWkvaG9tZS92dWUvY29tcG9uZW50cy9jb21wb25lbnRzL2NvbmZpZy9jb25maWctc3BhY2VyL2luZGV4LmpzIiwgInNyYy91aS9ob21lL3Z1ZS9jb21wb25lbnRzL2NvbXBvbmVudHMvY29uZmlnL2NvbmZpZy10ZXh0YXJlYS9pbmRleC5qcyIsICJzcmMvdWkvaG9tZS92dWUvY29tcG9uZW50cy9jb21wb25lbnRzL2NvbmZpZy9zdHlsZS5zY3NzIiwgInNyYy91aS9ob21lL3Z1ZS9jb21wb25lbnRzL2NvbXBvbmVudHMvY29uZmlnL2luZGV4LmpzIiwgInNyYy91aS9ob21lL3Z1ZS9jb21wb25lbnRzL2NvbXBvbmVudHMvY2FyZHMvaW5zdGFsbGVkLWV4dGVuc2lvbi1jYXJkL3N0eWxlLnNjc3MiLCAic3JjL3VpL2hvbWUvdnVlL2NvbXBvbmVudHMvY29tcG9uZW50cy9jYXJkcy9pbnN0YWxsZWQtZXh0ZW5zaW9uLWNhcmQvaW5kZXguanMiLCAic3JjL3VpL2hvbWUvdnVlL2NvbXBvbmVudHMvY29tcG9uZW50cy9jYXJkcy9zdG9yZS1leHRlbnNpb24tY2FyZC9zdHlsZS5zY3NzIiwgInNyYy91aS9ob21lL3Z1ZS9jb21wb25lbnRzL2NvbXBvbmVudHMvY2FyZHMvc3RvcmUtZXh0ZW5zaW9uLWNhcmQvaW5kZXguanMiLCAic3JjL3VpL2hvbWUvdnVlL2NvbXBvbmVudHMvY29tcG9uZW50cy9jYXJkcy9pbmRleC5qcyIsICJzcmMvdWkvaG9tZS92dWUvY29tcG9uZW50cy9jb21wb25lbnRzL2luZGV4LmpzIiwgInNyYy91aS9ob21lL3Z1ZS9jb21wb25lbnRzL2luZGV4LmpzIiwgInNyYy91aS9ob21lL2luZGV4LmpzIiwgInNyYy91aS9vdGhlci9pbmRleC5qcyIsICJzcmMvaW5kZXguanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuZGVmYXVsdCA9IE9iamVjdC5mcmVlemUoe1xyXG4gICAgR0VUOiBcIkdFVFwiLFxyXG4gICAgU0VUOiBcIlNFVFwiLFxyXG4gICAgREVMRVRFOiBcIkRFTEVURVwiLFxyXG4gICAgVVBEQVRFOiBcIlVQREFURVwiLFxyXG59KTtcclxuIiwgIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IEV2ZW50c18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL0V2ZW50c1wiKSk7XHJcbmNsYXNzIEV2ZW50RW1pdHRlciB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmxpc3RlbmVycyA9IE9iamVjdC52YWx1ZXMoRXZlbnRzXzEuZGVmYXVsdCkucmVkdWNlKChhY2MsIHZhbCkgPT4gKChhY2NbdmFsXSA9IG5ldyBTZXQoKSksIGFjYyksIHt9KTtcclxuICAgICAgICB0aGlzLm9uID0gZnVuY3Rpb24gKGV2ZW50LCBsaXN0ZW5lcikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5saXN0ZW5lcnNbZXZlbnRdLmhhcyhsaXN0ZW5lcikpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IEVycm9yKGBUaGlzIGxpc3RlbmVyIG9uICR7ZXZlbnR9IGFscmVhZHkgZXhpc3RzLmApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubGlzdGVuZXJzW2V2ZW50XS5hZGQobGlzdGVuZXIpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5vbmNlID0gZnVuY3Rpb24gKGV2ZW50LCBsaXN0ZW5lcikge1xyXG4gICAgICAgICAgICBjb25zdCBvbmNlTGlzdGVuZXIgPSAoZXZlbnQsIGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMub2ZmKGV2ZW50LCBvbmNlTGlzdGVuZXIpO1xyXG4gICAgICAgICAgICAgICAgbGlzdGVuZXIoZXZlbnQsIGRhdGEpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0aGlzLm9uKGV2ZW50LCBvbmNlTGlzdGVuZXIpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5vZmYgPSBmdW5jdGlvbiAoZXZlbnQsIGxpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGlzdGVuZXJzW2V2ZW50XS5kZWxldGUobGlzdGVuZXIpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5lbWl0ID0gZnVuY3Rpb24gKGV2ZW50LCBkYXRhKSB7XHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgbGlzdGVuZXIgb2YgdGhpcy5saXN0ZW5lcnNbZXZlbnRdKSB7XHJcbiAgICAgICAgICAgICAgICBsaXN0ZW5lcihldmVudCwgZGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIGZvciAoY29uc3QgZXZlbnQgb2YgT2JqZWN0LnZhbHVlcyhFdmVudHNfMS5kZWZhdWx0KSkge1xyXG4gICAgICAgICAgICB0aGlzW2V2ZW50LnRvTG93ZXJDYXNlKCldID0gKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZW1pdChldmVudCwgZGF0YSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuZGVmYXVsdCA9IEV2ZW50RW1pdHRlcjtcclxuIiwgIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IEV2ZW50RW1pdHRlcl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL0V2ZW50RW1pdHRlclwiKSk7XHJcbmZ1bmN0aW9uIG1ha2UoXHJcbi8vIFRoaXMgY2FuIGJlIHNhZmVseSBpZ25vcmVkLCB0aGUgRGF0YSB3aWxsIGFsd2F5cyBiZSBhbiBvYmplY3Qgb3IgaXQgd29uJ3Qgd29yayBhbnl3YXkuXHJcbi8vIEB0cy1pZ25vcmVcclxuZGF0YSA9IHt9LCB7IG5lc3RBcnJheXMgPSB0cnVlLCB9ID0ge30pIHtcclxuICAgIGNvbnN0IGVtaXR0ZXIgPSBuZXcgRXZlbnRFbWl0dGVyXzEuZGVmYXVsdCgpO1xyXG4gICAgZnVuY3Rpb24gY3JlYXRlUHJveHkodGFyZ2V0LCByb290LCBwYXRoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm94eSh0YXJnZXQsIHtcclxuICAgICAgICAgICAgZ2V0KHRhcmdldCwgcHJvcGVydHkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG5ld1BhdGggPSBbLi4ucGF0aCwgcHJvcGVydHldO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSB0YXJnZXRbcHJvcGVydHldO1xyXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbWl0dGVyLmdldCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGg6IG5ld1BhdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghbmVzdEFycmF5cyAmJiBBcnJheS5pc0FycmF5KHZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZVByb3h5KHZhbHVlLCByb290LCBuZXdQYXRoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZVByb3h5KCh0YXJnZXRbcHJvcGVydHldID0ge30pLCByb290LCBuZXdQYXRoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0KHRhcmdldCwgcHJvcGVydHksIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXRbcHJvcGVydHldID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBlbWl0dGVyLnNldCh7XHJcbiAgICAgICAgICAgICAgICAgICAgcGF0aDogWy4uLnBhdGgsIHByb3BlcnR5XSxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgLy8gVGhpcyBuZWVkcyB0byByZXR1cm4gdHJ1ZSBvciBpdCBlcnJvcnMuIC9zaHJ1Z1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGRlbGV0ZVByb3BlcnR5KHRhcmdldCwgcHJvcGVydHkpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkZWxldGUgdGFyZ2V0W3Byb3BlcnR5XSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVtaXR0ZXIuZGVsZXRlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogWy4uLnBhdGgsIHByb3BlcnR5XSxcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaGFzKHRhcmdldCwgcHJvcGVydHkpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGFyZ2V0W3Byb3BlcnR5XSA9PT0gXCJvYmplY3RcIiAmJlxyXG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKHRhcmdldFtwcm9wZXJ0eV0pLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBwcm9wZXJ0eSBpbiB0YXJnZXQ7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7IHN0b3JlOiBjcmVhdGVQcm94eShkYXRhLCBkYXRhLCBbXSksIFxyXG4gICAgICAgIC8vIFRoaXMgY2FuIGJlIHNhZmVseSBpZ25vcmVkLCB0aGUgRGF0YSB3aWxsIGFsd2F5cyBiZSBhbiBvYmplY3Qgb3IgaXQgd29uJ3Qgd29yayBhbnl3YXkuXHJcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgIGdob3N0OiBkYXRhIH0sIGVtaXR0ZXIpO1xyXG59XHJcbmV4cG9ydHMuZGVmYXVsdCA9IG1ha2U7XHJcbiIsICJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLm1ha2UgPSBleHBvcnRzLkV2ZW50cyA9IHZvaWQgMDtcclxudmFyIEV2ZW50c18xID0gcmVxdWlyZShcIi4vRXZlbnRzXCIpO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJFdmVudHNcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIF9faW1wb3J0RGVmYXVsdChFdmVudHNfMSkuZGVmYXVsdDsgfSB9KTtcclxudmFyIG1ha2VfMSA9IHJlcXVpcmUoXCIuL21ha2VcIik7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIm1ha2VcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIF9faW1wb3J0RGVmYXVsdChtYWtlXzEpLmRlZmF1bHQ7IH0gfSk7XHJcbiIsICJ7XHJcbiAgXCJjb21tb25cIjoge1xyXG4gICAgXCJtb2RhbHNcIjoge1xyXG4gICAgICBcImNvbXBvbmVudHNcIjoge1xyXG4gICAgICAgIFwib3RoZXJcIjoge1xyXG4gICAgICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgXCJIZWFkZXJcIixcclxuICAgICAgICAgICAgICAgIFwiRm9vdGVyXCJcclxuICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJSb290XCI6IHtcclxuICAgICAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgICAgIFwiaW5cIjogXCJzdHJpbmdzXCIsXHJcbiAgICAgICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgIFwiRU5URVJJTkdcIixcclxuICAgICAgICAgICAgICAgIFwiaGVhZGVySWRcIlxyXG4gICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgICAgIFwiYmVmb3JlXCI6IFtcclxuICAgICAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICAgICAgXCJSb290XCJcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIFwibWFwXCI6IHtcclxuICAgICAgICAgICAgXCJSb290XCI6IFtcclxuICAgICAgICAgICAgICBcIkVOVEVSSU5HXCIsXHJcbiAgICAgICAgICAgICAgXCJoZWFkZXJJZFwiXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIFwiYWN0aW9uc1wiOiB7XHJcbiAgICAgICAgXCJvcGVuXCI6IHtcclxuICAgICAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgICAgIFwiaW5cIjogXCJzdHJpbmdzXCIsXHJcbiAgICAgICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgIFwib25DbG9zZUNhbGxiYWNrXCIsXHJcbiAgICAgICAgICAgICAgICBcIkxheWVyXCJcclxuICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgICAgICBcImJlZm9yZVwiOiBbXHJcbiAgICAgICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgICAgIFwib3BlblwiXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBcIm1hcFwiOiB7XHJcbiAgICAgICAgICAgIFwib3BlblwiOiBbXHJcbiAgICAgICAgICAgICAgXCJvbkNsb3NlQ2FsbGJhY2tcIixcclxuICAgICAgICAgICAgICBcIkxheWVyXCJcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJjbG9zZVwiOiB7XHJcbiAgICAgICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgICAgICBcImluXCI6IFwic3RyaW5nc1wiLFxyXG4gICAgICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICBcIm9uQ2xvc2VDYWxsYmFjaygpXCJcclxuICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgICAgICBcImJlZm9yZVwiOiBbXHJcbiAgICAgICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgICAgIFwiY2xvc2VcIlxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgXCJtYXBcIjoge1xyXG4gICAgICAgICAgICBcImNsb3NlXCI6IFtcclxuICAgICAgICAgICAgICBcIm9uQ2xvc2VDYWxsYmFjaygpXCJcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiY29tcG9uZW50c1wiOiB7XHJcbiAgICAgIFwiQnV0dG9uXCI6IHtcclxuICAgICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICBcIkJvcmRlckNvbG9yc1wiXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgICBcImJlZm9yZVwiOiBbXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgICAgXSxcclxuICAgICAgICAgIFwiYWZ0ZXJcIjogXCJCdXR0b25cIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJtYXBcIjoge1xyXG4gICAgICAgICAgXCJCdXR0b25cIjogW1xyXG4gICAgICAgICAgICBcIi5GSUxMRURcIixcclxuICAgICAgICAgICAgXCIub25Nb3VzZUxlYXZlXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIFwiQ29uZmlybWF0aW9uTW9kYWxcIjoge1xyXG4gICAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICAgIFwiaW5cIjogXCJzdHJpbmdzXCIsXHJcbiAgICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgIFwiLmNvbmZpcm1CdXR0b25Db2xvclwiXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwibWFwXCI6IHtcclxuICAgICAgICAgIFwiQ29uZmlybWF0aW9uTW9kYWxcIjogW1xyXG4gICAgICAgICAgICBcIi5jb25maXJtQnV0dG9uQ29sb3JcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICAgIFwiYmVmb3JlXCI6IFtcclxuICAgICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgICBdLFxyXG4gICAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICAgIFwiQ29uZmlybWF0aW9uTW9kYWxcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgXCJUZXh0XCI6IHtcclxuICAgICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgICAgXCJmaWx0ZXJcIjogXCIkPy5TaXplcz8uU0laRV8zMiAmJiAkLkNvbG9yc1wiLFxyXG4gICAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgICBcImJlZm9yZVwiOiBbXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgXCJUb29sdGlwXCI6IHtcclxuICAgICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgICBcImluXCI6IFwicHJvdG90eXBlc1wiLFxyXG4gICAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICBcInJlbmRlclRvb2x0aXBcIlxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgICAgXCJiZWZvcmVcIjogW1xyXG4gICAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIFwiTWFya2Rvd25cIjoge1xyXG4gICAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgICBcImZpbHRlclwiOiBcIiQ/LnByb3RvdHlwZT8ucmVuZGVyICYmICQucnVsZXNcIixcclxuICAgICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiRmx1eERpc3BhdGNoZXJcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcIl9jdXJyZW50RGlzcGF0Y2hBY3Rpb25UeXBlXCIsXHJcbiAgICAgICAgICAgIFwiZGlzcGF0Y2hcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiUmVhY3RcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcImNyZWF0ZUVsZW1lbnRcIixcclxuICAgICAgICAgICAgXCJ1c2VTdGF0ZVwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJSZXN0XCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJnZXRcIixcclxuICAgICAgICAgICAgXCJwb3N0XCIsXHJcbiAgICAgICAgICAgIFwiZ2V0QVBJQmFzZVVSTFwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJSb3V0ZXJcIjoge1xyXG4gICAgICBcInRyYW5zaXRpb25Ub1wiOiB7XHJcbiAgICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgICAgXCJpblwiOiBcInN0cmluZ3NcIixcclxuICAgICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgXCJ0cmFuc2l0aW9uVG8gLSBUcmFuc2l0aW9uaW5nIHRvIFwiXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgICBcImJlZm9yZVwiOiBbXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgICAgXSxcclxuICAgICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgICBcInRyYW5zaXRpb25Ub1wiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIm1hcFwiOiB7XHJcbiAgICAgICAgICBcInRyYW5zaXRpb25Ub1wiOiBbXHJcbiAgICAgICAgICAgIFwidHJhbnNpdGlvblRvIC0gVHJhbnNpdGlvbmluZyB0byBcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgXCJyZXBsYWNlV2l0aFwiOiB7XHJcbiAgICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgICAgXCJpblwiOiBcInN0cmluZ3NcIixcclxuICAgICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgXCJcXFwiUmVwbGFjaW5nIHJvdXRlIHdpdGggXFxcIlwiXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgICBcImJlZm9yZVwiOiBbXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgICAgXSxcclxuICAgICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgICBcInJlcGxhY2VXaXRoXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwibWFwXCI6IHtcclxuICAgICAgICAgIFwicmVwbGFjZVdpdGhcIjogW1xyXG4gICAgICAgICAgICBcIlxcXCJSZXBsYWNpbmcgcm91dGUgd2l0aCBcXFwiXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIkZsdXhcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcImNvbm5lY3RTdG9yZXNcIixcclxuICAgICAgICAgICAgXCJkZXN0cm95XCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIldlYlNvY2tldFwiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjogXCIkPy5fX3Byb3RvX18/LmhhbmRsZUNvbm5lY3Rpb25cIixcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImJlZm9yZVwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIkFjdGl2aXR5QWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwic2VuZEFjdGl2aXR5SW52aXRlXCIsXHJcbiAgICAgICAgICAgIFwidXBkYXRlQWN0aXZpdHlcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiUHJpdmF0ZUNoYW5uZWxBY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJvcGVuUHJpdmF0ZUNoYW5uZWxcIixcclxuICAgICAgICAgICAgXCJlbnN1cmVQcml2YXRlQ2hhbm5lbFwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJBY2tBY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJpblwiOiBcInN0cmluZ3NcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJ0eXBlOlxcXCJCVUxLX0FDS1xcXCJcIlxyXG4gICAgICAgICAgXSxcclxuICAgICAgICAgIFtdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IHRydWUsXHJcbiAgICAgICAgXCJiZWZvcmVcIjogXCJleHBvcnRzXCJcclxuICAgICAgfSxcclxuICAgICAgXCJtYXBcIjoge1xyXG4gICAgICAgIFwiYWNrXCI6IFtcclxuICAgICAgICAgIFwidHlwZTpcXFwiQ0hBTk5FTF9BQ0tcXFwiXCIsXHJcbiAgICAgICAgICBcIm1lc3NhZ2VJZFwiLFxyXG4gICAgICAgICAgXCJjaGFubmVsSWRcIlxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgXCJidWxrQWNrXCI6IFtcclxuICAgICAgICAgIFwidHlwZTpcXFwiQlVMS19BQ0tcXFwiXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIkFuYWx5dGljc0FjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcImlzVGhyb3R0bGVkXCIsXHJcbiAgICAgICAgICAgIFwidHJhY2tcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiQW5pbWF0aW9uQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcInNwcmluZ1wiLFxyXG4gICAgICAgICAgICBcImRlY2F5XCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIkNvbm5lY3Rpb25BY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJzZXRTaG93QWN0aXZpdHlcIixcclxuICAgICAgICAgICAgXCJzZXRWaXNpYmlsaXR5XCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIlJUQ0Nvbm5lY3Rpb25BY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJnZXRDaGFubmVsSWRcIixcclxuICAgICAgICAgICAgXCJnZXRHdWlsZElkXCIsXHJcbiAgICAgICAgICAgIFwiZ2V0UlRDQ29ubmVjdGlvbklkXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIkVtb2ppQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwidHJhbnNsYXRlSW5saW5lRW1vamlUb1N1cnJvZ2F0ZXNcIixcclxuICAgICAgICAgICAgXCJ0cmFuc2xhdGVTdXJyb2dhdGVzVG9JbmxpbmVFbW9qaVwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJFbW9qaVN0YXRlQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwiZ2V0VVJMXCIsXHJcbiAgICAgICAgICAgIFwiaXNFbW9qaURpc2FibGVkXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIkd1aWxkTm90aWZpY2F0aW9uc0FjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcInVwZGF0ZUNoYW5uZWxPdmVycmlkZVNldHRpbmdzXCIsXHJcbiAgICAgICAgICAgIFwidXBkYXRlR3VpbGROb3RpZmljYXRpb25TZXR0aW5nc1wiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJJbnRlcm5hbFJlYWN0XCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJqc3hcIixcclxuICAgICAgICAgICAgXCJqc3hzXCIsXHJcbiAgICAgICAgICAgIFwiRnJhZ21lbnRcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiTG9naW5BY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJsb2dpblwiLFxyXG4gICAgICAgICAgICBcImxvZ291dFwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJRdWVyeUFjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcInF1ZXJ5RW1vamlSZXN1bHRzXCIsXHJcbiAgICAgICAgICAgIFwicXVlcnlGcmllbmRzXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIk1lc3NhZ2VBY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJyZWNlaXZlTWVzc2FnZVwiLFxyXG4gICAgICAgICAgICBcInNlbmRNZXNzYWdlXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIlByZW1pdW1BY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJpc1ByZW1pdW1cIixcclxuICAgICAgICAgICAgXCJjYW5Vc2VFbW9qaXNFdmVyeXdoZXJlXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIlZvaWNlQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwic2VsZWN0Vm9pY2VDaGFubmVsXCIsXHJcbiAgICAgICAgICAgIFwiZGlzY29ubmVjdFwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJUeXBpbmdBY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJzdGFydFR5cGluZ1wiLFxyXG4gICAgICAgICAgICBcInN0b3BUeXBpbmdcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiR3VpbGRBY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJzZXRDaGFubmVsXCIsXHJcbiAgICAgICAgICAgIFwic2V0U2VydmVyTXV0ZVwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJJbnZpdGVBY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJhY2NlcHRJbnZpdGVcIixcclxuICAgICAgICAgICAgXCJhY2NlcHRJbnZpdGVBbmRUcmFuc2l0aW9uVG9JbnZpdGVDaGFubmVsXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIk1lZGlhRW5naW5lQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwidG9nZ2xlU2VsZkRlYWZcIixcclxuICAgICAgICAgICAgXCJ0b2dnbGVTZWxmTXV0ZVwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJpMThuXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJfcmVxdWVzdGVkTG9jYWxlXCIsXHJcbiAgICAgICAgICAgIFwiZ2V0RGVmYXVsdExvY2FsZVwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJ1dWlkXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJ2MVwiLFxyXG4gICAgICAgICAgICBcInY0XCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcImhsanNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcImhpZ2hsaWdodEFsbFwiLFxyXG4gICAgICAgICAgICBcImhpZ2hsaWdodFwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59IiwgImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGZpbmRJblRyZWUoXHJcbiAgdHJlZSxcclxuICBzZWFyY2hGaWx0ZXIsXHJcbiAgeyB3YWxrYWJsZSA9IG51bGwsIGlnbm9yZSA9IFtdLCBsaW1pdCA9IDI1NiwgYWxsID0gZmFsc2UgfSA9IHt9XHJcbikge1xyXG4gIGxldCBpdGVyYXRpb24gPSAwO1xyXG4gIGxldCBmb3VuZExpc3QgPSBbXTtcclxuXHJcbiAgZnVuY3Rpb24gZG9TZWFyY2godHJlZSwgc2VhcmNoRmlsdGVyLCB7IHdhbGthYmxlID0gbnVsbCwgaWdub3JlID0gW10gfSA9IHt9KSB7XHJcbiAgICBpdGVyYXRpb24gKz0gMTtcclxuICAgIGlmIChpdGVyYXRpb24gPiBsaW1pdCkgcmV0dXJuO1xyXG5cclxuICAgIGlmICh0eXBlb2Ygc2VhcmNoRmlsdGVyID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgIGlmICh0cmVlLmhhc093blByb3BlcnR5KHNlYXJjaEZpbHRlcikpIHtcclxuICAgICAgICBpZiAoYWxsKSBmb3VuZExpc3QucHVzaCh0cmVlW3NlYXJjaEZpbHRlcl0pO1xyXG4gICAgICAgIGlmICghYWxsKSByZXR1cm4gdHJlZVtzZWFyY2hGaWx0ZXJdO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKHNlYXJjaEZpbHRlcih0cmVlKSkge1xyXG4gICAgICBpZiAoYWxsKSBmb3VuZExpc3QucHVzaCh0cmVlKTtcclxuICAgICAgaWYgKCFhbGwpIHJldHVybiB0cmVlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghdHJlZSkgcmV0dXJuO1xyXG5cclxuICAgIGlmIChBcnJheS5pc0FycmF5KHRyZWUpKSB7XHJcbiAgICAgIGZvciAoY29uc3QgaXRlbSBvZiB0cmVlKSB7XHJcbiAgICAgICAgY29uc3QgZm91bmQgPSBkb1NlYXJjaChpdGVtLCBzZWFyY2hGaWx0ZXIsIHsgd2Fsa2FibGUsIGlnbm9yZSB9KTtcclxuICAgICAgICBpZiAoZm91bmQpIGZvdW5kTGlzdC5wdXNoKGZvdW5kKTtcclxuICAgICAgICBpZiAoZm91bmQgJiYgIWFsbCkgcmV0dXJuIGZvdW5kO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB0cmVlID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgIGZvciAoY29uc3Qga2V5IGluIHRyZWUpIHtcclxuICAgICAgICBpZiAod2Fsa2FibGUgIT0gbnVsbCAmJiAhd2Fsa2FibGUuaW5jbHVkZXMoa2V5KSkgY29udGludWU7XHJcblxyXG4gICAgICAgIGlmIChpZ25vcmUuaW5jbHVkZXMoa2V5KSkgY29udGludWU7XHJcblxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICBjb25zdCBmb3VuZCA9IGRvU2VhcmNoKHRyZWVba2V5XSwgc2VhcmNoRmlsdGVyLCB7XHJcbiAgICAgICAgICAgIHdhbGthYmxlLFxyXG4gICAgICAgICAgICBpZ25vcmUsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGlmIChmb3VuZCkgZm91bmRMaXN0LnB1c2goZm91bmQpO1xyXG4gICAgICAgICAgaWYgKGZvdW5kICYmICFhbGwpIHJldHVybiBmb3VuZDtcclxuICAgICAgICB9IGNhdGNoIHsgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gZG9TZWFyY2godHJlZSwgc2VhcmNoRmlsdGVyLCB7IHdhbGthYmxlLCBpZ25vcmUgfSkgPz8gZm91bmRMaXN0O1xyXG59O1xyXG4iLCAiZnVuY3Rpb24gYnVpbGQocHJlZml4ID0gXCJBY29yZFwiLCB0eXBlLCBjb2xvcikge1xyXG4gIHJldHVybiAoLi4uaW5wdXQpID0+IGNvbnNvbGVbdHlwZV0oXHJcbiAgICBgJWMke3ByZWZpeH0lY2AsXHJcbiAgICBgYmFja2dyb3VuZC1jb2xvcjogJHtjb2xvcn07IGNvbG9yOiB3aGl0ZTsgYm9yZGVyLXJhZGl1czogNHB4OyBwYWRkaW5nOiAwcHggNnB4IDBweCA2cHg7IGZvbnQtd2VpZ2h0OiBib2xkYCxcclxuICAgIFwiXCIsXHJcbiAgICAuLi5pbnB1dFxyXG4gICk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBsb2c6IGJ1aWxkKFwiQWNvcmRcIiwgXCJsb2dcIiwgXCIjMDBmYmIwXCIpLFxyXG4gIGRlYnVnOiBidWlsZChcIkFjb3JkIERlYnVnXCIsIFwiZGVidWdcIiwgXCIjMDBmYmIwXCIpLFxyXG4gIGluZm86IGJ1aWxkKFwiQWNvcmQgSW5mb1wiLCBcImxvZ1wiLCBcIiM4MmFhZmZcIiksXHJcbiAgd2FybjogYnVpbGQoXCJBY29yZCBXYXJuXCIsIFwid2FyblwiLCBcIiNkZWJmMThcIiksXHJcbiAgZXJyb3I6IGJ1aWxkKFwiQWNvcmQgRXJyb3JcIiwgXCJlcnJvclwiLCBcIiNlZjU4NThcIiksXHJcbiAgYnVpbGRcclxufSIsICJpbXBvcnQgZmluZEluVHJlZSBmcm9tIFwiLi9yYXcvZmluZC1pbi10cmVlLmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgZ2V0SW5zdGFuY2Uobm9kZSkge1xyXG4gICAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKG5vZGUpLmZpbmQoaSA9PiBpWzBdLnN0YXJ0c1dpdGgoXCJfX3JlYWN0SW50ZXJuYWxJbnN0YW5jZVwiKSB8fCBpWzBdLnN0YXJ0c1dpdGgoXCJfX3JlYWN0RmliZXJcIikpPy5bMV07XHJcbiAgfSxcclxuICBnZXRPd25lckluc3RhbmNlKG5vZGUpIHtcclxuICAgIGxldCBpbnN0YW5jZSA9IHRoaXMuZ2V0SW5zdGFuY2Uobm9kZSk7XHJcbiAgICBmb3IgKGxldCBlbCA9IGluc3RhbmNlOyBlbDsgZWwgPSBlbC5yZXR1cm4pXHJcbiAgICAgIGlmIChlbC5zdGF0ZU5vZGU/LmZvcmNlVXBkYXRlKSByZXR1cm4gZWwuc3RhdGVOb2RlO1xyXG4gIH0sXHJcbiAgZmluZEluVHJlZSh0cmVlLCBmaWx0ZXIpIHtcclxuICAgIHJldHVybiBmaW5kSW5UcmVlKHRyZWUsIGZpbHRlciwge1xyXG4gICAgICB3YWxrYWJsZTogW1wicHJvcHNcIiwgXCJzdGF0ZVwiLCBcImNoaWxkcmVuXCIsIFwicmV0dXJuXCJdXHJcbiAgICB9KTtcclxuICB9LFxyXG4gIGdldENvbXBvbmVudHMobm9kZSkge1xyXG4gICAgY29uc3QgaW5zdGFuY2UgPSB0aGlzLmdldEluc3RhbmNlKG5vZGUpO1xyXG4gICAgY29uc3QgY29tcG9uZW50cyA9IFtdO1xyXG4gICAgbGV0IGxhc3RJbnN0YW5jZSA9IGluc3RhbmNlO1xyXG4gICAgd2hpbGUgKGxhc3RJbnN0YW5jZSAmJiBsYXN0SW5zdGFuY2UucmV0dXJuKSB7XHJcbiAgICAgIGlmICh0eXBlb2YgbGFzdEluc3RhbmNlLnJldHVybi50eXBlID09PSBcInN0cmluZ1wiKSBicmVhaztcclxuICAgICAgaWYgKGxhc3RJbnN0YW5jZS5yZXR1cm4udHlwZSkgY29tcG9uZW50cy5wdXNoKGxhc3RJbnN0YW5jZS5yZXR1cm4udHlwZSk7XHJcbiAgICAgIGxhc3RJbnN0YW5jZSA9IGxhc3RJbnN0YW5jZS5yZXR1cm47XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY29tcG9uZW50cztcclxuICB9LFxyXG4gIGdldFN0YXRlTm9kZXMobm9kZSkge1xyXG4gICAgY29uc3QgaW5zdGFuY2UgPSB0aGlzLmdldEluc3RhbmNlKG5vZGUpO1xyXG4gICAgY29uc3Qgc3RhdGVOb2RlcyA9IFtdO1xyXG4gICAgbGV0IGxhc3RJbnN0YW5jZSA9IGluc3RhbmNlO1xyXG4gICAgd2hpbGUgKGxhc3RJbnN0YW5jZSAmJiBsYXN0SW5zdGFuY2UucmV0dXJuKSB7XHJcbiAgICAgIGlmIChsYXN0SW5zdGFuY2UucmV0dXJuLnN0YXRlTm9kZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSBicmVhaztcclxuICAgICAgaWYgKGxhc3RJbnN0YW5jZS5yZXR1cm4uc3RhdGVOb2RlKVxyXG4gICAgICAgIHN0YXRlTm9kZXMucHVzaChsYXN0SW5zdGFuY2UucmV0dXJuLnN0YXRlTm9kZSk7XHJcbiAgICAgIGxhc3RJbnN0YW5jZSA9IGxhc3RJbnN0YW5jZS5yZXR1cm47XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3RhdGVOb2RlcztcclxuICB9LFxyXG4gIGdldFByb3BzKGVsLCBmaWx0ZXIgPSAoaSkgPT4gaSwgbWF4ID0gMTAwMDApIHtcclxuICAgIGNvbnN0IGluc3RhbmNlID0gdGhpcy5nZXRJbnN0YW5jZShlbCk7XHJcblxyXG4gICAgaWYgKCFpbnN0YW5jZT8ucmV0dXJuKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgICBmb3IgKFxyXG4gICAgICBsZXQgY3VycmVudCA9IGluc3RhbmNlPy5yZXR1cm4sIGkgPSAwO1xyXG4gICAgICBpID4gbWF4IHx8IGN1cnJlbnQgIT09IG51bGw7XHJcbiAgICAgIGN1cnJlbnQgPSBjdXJyZW50Py5yZXR1cm4sIGkrK1xyXG4gICAgKSB7XHJcbiAgICAgIGlmIChjdXJyZW50Py5wZW5kaW5nUHJvcHMgJiYgZmlsdGVyKGN1cnJlbnQucGVuZGluZ1Byb3BzKSlcclxuICAgICAgICByZXR1cm4gY3VycmVudC5wZW5kaW5nUHJvcHM7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfSxcclxufSIsICJpbXBvcnQgZmluZEluVHJlZSBmcm9tIFwiLi9yYXcvZmluZC1pbi10cmVlLmpzXCI7XHJcbmltcG9ydCBsb2dnZXIgZnJvbSBcIi4vbG9nZ2VyLmpzXCI7XHJcbmltcG9ydCByZWFjdCBmcm9tIFwiLi9yZWFjdC5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGxvZ2dlcixcclxuICByZWFjdCxcclxuICBmaW5kSW5UcmVlLFxyXG4gIGZvcm1hdCh2YWwsIC4uLmFyZ3MpIHtcclxuICAgIHJldHVybiBgJHt2YWx9YC5yZXBsYWNlQWxsKC97KFxcZCspfS9nLCAoXywgY2FwKSA9PiB7XHJcbiAgICAgIHJldHVybiBhcmdzW051bWJlcihjYXApXTtcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgaW50ZXJ2YWwoY2IsIGR1cikge1xyXG4gICAgbGV0IGludGVydmFsID0gc2V0SW50ZXJ2YWwoY2IsIGR1cik7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcclxuICAgIH07XHJcbiAgfSxcclxuICB0aW1lb3V0KGNiLCBkdXIpIHtcclxuICAgIGxldCB0aW1lb3V0ID0gc2V0VGltZW91dChjYiwgZHVyKTtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcclxuICAgIH07XHJcbiAgfSxcclxuICBpZkV4aXN0cyh2YWwsIGNiKSB7XHJcbiAgICBpZiAodmFsKSBjYih2YWwpO1xyXG4gIH0sXHJcbiAgY29weVRleHQodGV4dCkge1xyXG4gICAgaWYgKHdpbmRvdy5EaXNjb3JkTmF0aXZlKSB7XHJcbiAgICAgIERpc2NvcmROYXRpdmUuY2xpcGJvYXJkLmNvcHkodGV4dCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBuYXZpZ2F0b3IuY2xpcGJvYXJkLndyaXRlVGV4dCh0ZXh0KS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgIGNvbnN0IGNvcHlBcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRleHRhcmVhXCIpO1xyXG5cclxuICAgICAgY29weUFyZWEuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XHJcbiAgICAgIGNvcHlBcmVhLnN0eWxlLnBvc2l0aW9uID0gXCJmaXhlZFwiO1xyXG4gICAgICBjb3B5QXJlYS5zdHlsZS50b3AgPSBcIjBcIjtcclxuICAgICAgY29weUFyZWEuc3R5bGUubGVmdCA9IFwiMFwiO1xyXG5cclxuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjb3B5QXJlYSk7XHJcbiAgICAgIGNvcHlBcmVhLmZvY3VzKCk7XHJcbiAgICAgIGNvcHlBcmVhLnNlbGVjdCgpO1xyXG5cclxuICAgICAgdHJ5IHtcclxuICAgICAgICBkb2N1bWVudC5leGVjQ29tbWFuZChcImNvcHlcIik7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChjb3B5QXJlYSk7XHJcbiAgICB9KTtcclxuICB9LFxyXG4gIHNsZWVwKG1zKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgbXMpKTtcclxuICB9LFxyXG4gIG1hcFJlcGxhY2UodGV4dCwgbWFwID0ge30pIHtcclxuICAgIHJldHVybiAoQXJyYXkuaXNBcnJheShtYXApID8gbWFwIDogT2JqZWN0LmVudHJpZXMobWFwKSkucmVkdWNlKChhbGwsIGN1cnJlbnQpID0+IGFsbC5yZXBsYWNlQWxsKGN1cnJlbnRbMF0sIGN1cnJlbnRbMV0pLCB0ZXh0KTtcclxuICB9LFxyXG4gIGVzY2FwZVJlZ2V4KHN0cikge1xyXG4gICAgcmV0dXJuIHN0clxyXG4gICAgICAucmVwbGFjZSgvW3xcXFxce30oKVtcXF1eJCsqPy5dL2csICdcXFxcJCYnKVxyXG4gICAgICAucmVwbGFjZSgvLS9nLCAnXFxcXHgyZCcpO1xyXG4gIH1cclxufSIsICJpbXBvcnQgdXRpbHMgZnJvbSBcIi4uLy4uL3V0aWxzL2luZGV4LmpzXCI7XHJcbmltcG9ydCBsb2dnZXIgZnJvbSBcIi4uLy4uL3V0aWxzL2xvZ2dlci5qc1wiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHdyYXBGaWx0ZXIoZmlsdGVyKSB7XHJcbiAgcmV0dXJuICguLi5hcmdzKSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICBpZiAoYXJnc1swXT8uZG9jdW1lbnQgJiYgYXJnc1swXT8ud2luZG93KSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIGlmIChhcmdzWzBdPy5kZWZhdWx0Py5yZW1vdmUgJiYgYXJnc1swXT8uZGVmYXVsdD8uc2V0ICYmIGFyZ3NbMF0/LmRlZmF1bHQ/LmNsZWFyICYmIGFyZ3NbMF0/LmRlZmF1bHQ/LmdldCAmJiAhYXJnc1swXT8uZGVmYXVsdD8uc29ydCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICBpZiAoYXJnc1swXS5yZW1vdmUgJiYgYXJnc1swXS5zZXQgJiYgYXJnc1swXS5jbGVhciAmJiBhcmdzWzBdLmdldCAmJiAhYXJnc1swXS5zb3J0KSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIGlmIChhcmdzWzBdPy5kZWZhdWx0Py5nZXRUb2tlbiB8fCBhcmdzWzBdPy5kZWZhdWx0Py5nZXRFbWFpbCB8fCBhcmdzWzBdPy5kZWZhdWx0Py5zaG93VG9rZW4pIHJldHVybiBmYWxzZTtcclxuICAgICAgaWYgKGFyZ3NbMF0/LmdldFRva2VuIHx8IGFyZ3NbMF0/LmdldEVtYWlsIHx8IGFyZ3NbMF0/LnNob3dUb2tlbikgcmV0dXJuIGZhbHNlO1xyXG4gICAgICByZXR1cm4gZmlsdGVyKC4uLmFyZ3MpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycikge1xyXG4gICAgICBsb2dnZXIud2FybihcIk1vZHVsZSBmaWx0ZXIgdGhyZXcgYW4gZXhjZXB0aW9uLlwiLCBmaWx0ZXIsIGVycik7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBjaGVja01vZHVsZVN0cmluZ3MobSwgc3RyaW5ncyA9IFtdLCBoYXNOb3QpIHtcclxuICBjb25zdCBjaGVjayA9IChzMSwgczIpID0+IHtcclxuICAgIHJldHVybiBoYXNOb3QgPyBzMS50b1N0cmluZygpLmluZGV4T2YoczIudG9TdHJpbmcoKSkgPT0gLTEgOiBzMS50b1N0cmluZygpLmluZGV4T2YoczIudG9TdHJpbmcoKSkgPiAtMTtcclxuICB9O1xyXG4gIHJldHVybiBzdHJpbmdzLmV2ZXJ5KGogPT4ge1xyXG4gICAgcmV0dXJuIGNoZWNrKG0/LnRvU3RyaW5nPy4oKSB8fCBcIlwiLCBqKVxyXG4gICAgICB8fCBjaGVjayhtPy5fX29yaWdpbmFsX18/LnRvU3RyaW5nPy4oKSB8fCBcIlwiLCBqKVxyXG4gICAgICB8fCBjaGVjayhtPy50eXBlPy50b1N0cmluZz8uKCkgfHwgXCJcIiwgailcclxuICAgICAgfHwgY2hlY2sobT8udHlwZT8uX19vcmlnaW5hbF9fPy50b1N0cmluZz8uKCkgfHwgXCJcIiwgailcclxuICAgICAgfHwgT2JqZWN0LmVudHJpZXMoWydmdW5jdGlvbicsICdvYmplY3QnXS5pbmNsdWRlcyh0eXBlb2YgbT8ucHJvdG90eXBlKSA/IHR5cGVvZiBtPy5wcm90b3R5cGUgOiB7fSkuZmlsdGVyKGkgPT4gaVswXT8uaW5jbHVkZXM/LihcInJlbmRlclwiKSkuc29tZShpID0+IGNoZWNrKGlbMV0/LnRvU3RyaW5nPy4oKSB8fCBcIlwiLCBqKSlcclxuICB9KTtcclxufTtcclxuZnVuY3Rpb24gY2hlY2tNb2R1bGVQcm9wcyhtLCBwcm9wZXJ0aWVzID0gW10sIGhhc05vdCkge1xyXG4gIHJldHVybiBwcm9wZXJ0aWVzLmV2ZXJ5KHByb3AgPT4ge1xyXG4gICAgY29uc3QgdmFsdWUgPSBtW3Byb3BdPy5fX29yaWdpbmFsX18gfHwgbVtwcm9wXTtcclxuICAgIHJldHVybiBoYXNOb3QgPyB2YWx1ZSA9PT0gdW5kZWZpbmVkIDogKHZhbHVlICE9PSB1bmRlZmluZWQgJiYgISh0eXBlb2YgdmFsdWUgPT0gXCJzdHJpbmdcIiAmJiAhdmFsdWUpKTtcclxuICB9KTtcclxufTtcclxuZnVuY3Rpb24gY2hlY2tNb2R1bGVQcm90b3R5cGVzKG0sIHByb3RvUHJvcHMgPSBbXSwgaGFzTm90KSB7XHJcbiAgcmV0dXJuIG0ucHJvdG90eXBlICYmIHByb3RvUHJvcHMuZXZlcnkocHJvcCA9PiB7XHJcbiAgICBjb25zdCB2YWx1ZSA9IG0ucHJvdG90eXBlW3Byb3BdO1xyXG4gICAgcmV0dXJuIGhhc05vdCA/IHZhbHVlID09PSB1bmRlZmluZWQgOiAodmFsdWUgIT09IHVuZGVmaW5lZCAmJiAhKHR5cGVvZiB2YWx1ZSA9PSBcInN0cmluZ1wiICYmICF2YWx1ZSkpO1xyXG4gIH0pO1xyXG59O1xyXG5cclxuY29uc3Qgd2VicGFja0NodW5rTmFtZSA9IFwid2VicGFja0NodW5rZGlzY29yZF9hcHBcIjtcclxuY29uc3QgcHVzaExpc3RlbmVycyA9IG5ldyBTZXQoKTtcclxuXHJcblxyXG57XHJcbiAgbGV0IG9nUHVzaCA9IHdpbmRvd1t3ZWJwYWNrQ2h1bmtOYW1lXS5wdXNoO1xyXG5cclxuICBmdW5jdGlvbiBoYW5kbGVQdXNoKGNodW5rKSB7XHJcbiAgICBjb25zdCBbLCBtb2R1bGVzXSA9IGNodW5rO1xyXG5cclxuICAgIGZvciAoY29uc3QgbW9kdWxlSWQgaW4gT2JqZWN0LmtleXMobW9kdWxlcyB8fCB7fSkpIHtcclxuICAgICAgY29uc3Qgb2dNb2R1bGUgPSBtb2R1bGVzW21vZHVsZUlkXTtcclxuXHJcbiAgICAgIGlmICh0eXBlb2YgbW9kdWxlc1ttb2R1bGVJZF0gPT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgbW9kdWxlc1ttb2R1bGVJZF0gPSAobW9kdWxlLCBleHBvcnRzLCByZXF1aXJlKSA9PiB7XHJcbiAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBvZ01vZHVsZS5jYWxsKG51bGwsIG1vZHVsZSwgZXhwb3J0cywgcmVxdWlyZSk7XHJcblxyXG4gICAgICAgICAgICBwdXNoTGlzdGVuZXJzLmZvckVhY2gobGlzdGVuZXIgPT4ge1xyXG4gICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBsaXN0ZW5lcihleHBvcnRzKTtcclxuICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMubG9nZ2VyLmVycm9yKFwiUHVzaCBsaXN0ZW5lciB0aHJldyBhbiBleGNlcHRpb24uXCIsIGxpc3RlbmVyLCBlcnJvcik7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdXRpbHMubG9nZ2VyLmVycm9yKFwiVW5hYmxlIHRvIHBhdGNoIHB1c2hlZCBtb2R1bGUuXCIsIGVycm9yLCBvZ01vZHVsZSwgbW9kdWxlSWQsIGNodW5rKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBPYmplY3QuYXNzaWduKG1vZHVsZXNbbW9kdWxlSWRdLCBvZ01vZHVsZSwge1xyXG4gICAgICAgICAgX19vcmlnaW5hbF9fOiBvZ01vZHVsZSxcclxuICAgICAgICAgIHRvU3RyaW5nOiAoKSA9PiBvZ01vZHVsZS50b1N0cmluZygpLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG9nUHVzaC5jYWxsKHdpbmRvd1t3ZWJwYWNrQ2h1bmtOYW1lXSwgY2h1bmspO1xyXG4gIH1cclxuXHJcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvd1t3ZWJwYWNrQ2h1bmtOYW1lXSwgXCJwdXNoXCIsIHtcclxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcclxuICAgIGdldCgpIHsgcmV0dXJuIGhhbmRsZVB1c2g7IH0sXHJcbiAgICBzZXQodmFsdWUpIHtcclxuICAgICAgb2dQdXNoID0gdmFsdWU7XHJcblxyXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93W3RoaXMuY2h1bmtOYW1lXSwgXCJwdXNoXCIsIHtcclxuICAgICAgICB2YWx1ZTogdGhpcy5oYW5kbGVQdXNoLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcclxuICAgICAgICB3cml0YWJsZTogdHJ1ZVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9KTtcclxufVxyXG5cclxuXHJcblxyXG4vKipcclxuICogXHJcbiAqIEBwYXJhbSB7YW55fSBmaWx0ZXIgXHJcbiAqIEBwYXJhbSB7eyBzaWduYWw6IEFib3J0U2lnbmFsLCBzZWFyY2hFeHBvcnRzOiBib29sZWFuIH19IHBhcmFtMSBcclxuICogQHJldHVybnMgXHJcbiAqL1xyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbGF6eUZpbmQoZmlsdGVyLCB7IHNpZ25hbCA9IG51bGwsIHNlYXJjaEV4cG9ydHMgPSBmYWxzZSB9KSB7XHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgIGNvbnN0IGNhbmNlbCA9ICgpID0+IHB1c2hMaXN0ZW5lcnMuZGVsZXRlKGxpc3RlbmVyKTtcclxuICAgIGNvbnN0IGxpc3RlbmVyID0gKGV4cG9ydHMpID0+IHtcclxuICAgICAgaWYgKCFleHBvcnRzIHx8IGV4cG9ydHMgPT09IHdpbmRvdyB8fCBleHBvcnRzID09PSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpIHJldHVybjtcclxuXHJcbiAgICAgIGxldCBmb3VuZCA9IG51bGw7XHJcblxyXG4gICAgICBpZiAodHlwZW9mIGV4cG9ydHMgPT0gXCJvYmplY3RcIiAmJiBzZWFyY2hFeHBvcnRzKSB7XHJcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gZXhwb3J0cykge1xyXG4gICAgICAgICAgbGV0IGV4cG9ydGVkID0gZXhwb3J0c1trZXldO1xyXG4gICAgICAgICAgaWYgKCFleHBvcnRlZCkgY29udGludWU7XHJcbiAgICAgICAgICBpZiAoZmlsdGVyKGV4cG9ydGVkKSkge1xyXG4gICAgICAgICAgICBmb3VuZCA9IGV4cG9ydGVkO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbGV0IHBhdGhzID0gW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiLFxyXG4gICAgICAgICAgXCJcIlxyXG4gICAgICAgIF07XHJcbiAgICAgICAgZm91bmQgPSBwYXRocy5tYXAoaSA9PiB7XHJcbiAgICAgICAgICBsZXQgcGF0aGVkID0gIWkgPyBleHBvcnRzIDogXy5nZXQoZXhwb3J0cywgaSk7XHJcbiAgICAgICAgICBpZiAocGF0aGVkICYmIGZpbHRlcihwYXRoZWQpKSByZXR1cm4gcGF0aGVkO1xyXG4gICAgICAgIH0pLmZpbmQoaSA9PiBpKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCFmb3VuZCkgcmV0dXJuO1xyXG4gICAgICBjYW5jZWwoKTtcclxuICAgICAgcmVzb2x2ZShmb3VuZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVzaExpc3RlbmVycy5hZGQobGlzdGVuZXIpO1xyXG5cclxuICAgIHNpZ25hbD8uYWRkRXZlbnRMaXN0ZW5lcihcImFib3J0XCIsICgpID0+IHtcclxuICAgICAgY2FuY2VsKCk7XHJcbiAgICAgIHJlc29sdmUobnVsbCk7XHJcbiAgICB9KTtcclxuICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGZpbmQocmVxLCBmaWx0ZXIsIGNvbmZpZyA9IHt9KSB7XHJcbiAgbGV0IGRlZmF1bHRFeHBvcnQgPSB0eXBlb2YgY29uZmlnLmRlZmF1bHRFeHBvcnQgIT0gXCJib29sZWFuXCIgPyBmYWxzZSA6IGNvbmZpZy5kZWZhdWx0RXhwb3J0O1xyXG4gIGxldCB1bmxvYWRlZCA9IHR5cGVvZiBjb25maWcudW5sb2FkZWQgIT0gXCJib29sZWFuXCIgPyBmYWxzZSA6IGNvbmZpZy51bmxvYWRlZDtcclxuICBsZXQgYWxsID0gdHlwZW9mIGNvbmZpZy5hbGwgIT0gXCJib29sZWFuXCIgPyBmYWxzZSA6IGNvbmZpZy5hbGw7XHJcbiAgY29uc3QgZm91bmQgPSBbXTtcclxuICBpZiAoIXVubG9hZGVkKSBmb3IgKGxldCBpIGluIHJlcS5jKSBpZiAocmVxLmMuaGFzT3duUHJvcGVydHkoaSkpIHtcclxuICAgIGxldCBtID0gcmVxLmNbaV0uZXhwb3J0cywgciA9IG51bGw7XHJcbiAgICBpZiAobSAmJiAodHlwZW9mIG0gPT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgbSA9PSBcImZ1bmN0aW9uXCIpKSB7XHJcbiAgICAgIGlmICghIShyID0gZmlsdGVyKG0sIGkpKSkge1xyXG4gICAgICAgIGlmIChhbGwpIGZvdW5kLnB1c2goZGVmYXVsdEV4cG9ydCA/IHIgOiByZXEuY1tpXSk7XHJcbiAgICAgICAgZWxzZSByZXR1cm4gZGVmYXVsdEV4cG9ydCA/IHIgOiByZXEuY1tpXTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIGZvciAobGV0IGtleSBvZiBPYmplY3Qua2V5cyhtKSkgaWYgKGtleS5sZW5ndGggPCA0ICYmIG1ba2V5XSAmJiAhIShyID0gZmlsdGVyKG1ba2V5XSwgaSkpKSB7XHJcbiAgICAgICAgaWYgKGFsbCkgZm91bmQucHVzaChkZWZhdWx0RXhwb3J0ID8gciA6IHJlcS5jW2ldKTtcclxuICAgICAgICBlbHNlIHJldHVybiBkZWZhdWx0RXhwb3J0ID8gciA6IHJlcS5jW2ldO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAobSAmJiBtLl9fZXNNb2R1bGUgJiYgbS5kZWZhdWx0ICYmICh0eXBlb2YgbS5kZWZhdWx0ID09IFwib2JqZWN0XCIgfHwgdHlwZW9mIG0uZGVmYXVsdCA9PSBcImZ1bmN0aW9uXCIpKSB7XHJcbiAgICAgIGlmICghIShyID0gZmlsdGVyKG0uZGVmYXVsdCwgaSkpKSB7XHJcbiAgICAgICAgaWYgKGFsbCkgZm91bmQucHVzaChkZWZhdWx0RXhwb3J0ID8gciA6IHJlcS5jW2ldKTtcclxuICAgICAgICBlbHNlIHJldHVybiBkZWZhdWx0RXhwb3J0ID8gciA6IHJlcS5jW2ldO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYgKG0uZGVmYXVsdC50eXBlICYmICh0eXBlb2YgbS5kZWZhdWx0LnR5cGUgPT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgbS5kZWZhdWx0LnR5cGUgPT0gXCJmdW5jdGlvblwiKSAmJiAhIShyID0gZmlsdGVyKG0uZGVmYXVsdC50eXBlLCBpKSkpIHtcclxuICAgICAgICBpZiAoYWxsKSBmb3VuZC5wdXNoKGRlZmF1bHRFeHBvcnQgPyByIDogcmVxLmNbaV0pO1xyXG4gICAgICAgIGVsc2UgcmV0dXJuIGRlZmF1bHRFeHBvcnQgPyByIDogcmVxLmNbaV07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgZm9yIChsZXQgaSBpbiByZXEubSkgaWYgKHJlcS5tLmhhc093blByb3BlcnR5KGkpKSB7XHJcbiAgICBsZXQgbSA9IHJlcS5tW2ldO1xyXG4gICAgaWYgKG0gJiYgdHlwZW9mIG0gPT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgIGlmIChyZXEuY1tpXSAmJiAhdW5sb2FkZWQgJiYgZmlsdGVyKG0sIGkpKSB7XHJcbiAgICAgICAgaWYgKGFsbCkgZm91bmQucHVzaChkZWZhdWx0RXhwb3J0ID8gcmVxLmNbaV0uZXhwb3J0cyA6IHJlcS5jW2ldKTtcclxuICAgICAgICBlbHNlIHJldHVybiBkZWZhdWx0RXhwb3J0ID8gcmVxLmNbaV0uZXhwb3J0cyA6IHJlcS5jW2ldO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICghcmVxLmNbaV0gJiYgdW5sb2FkZWQgJiYgZmlsdGVyKG0sIGkpKSB7XHJcbiAgICAgICAgY29uc3QgcmVzb2x2ZWQgPSB7fSwgcmVzb2x2ZWQyID0ge307XHJcbiAgICAgICAgbShyZXNvbHZlZCwgcmVzb2x2ZWQyLCByZXEpO1xyXG4gICAgICAgIGNvbnN0IHRydWVSZXNvbHZlZCA9IHJlc29sdmVkMiAmJiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhyZXNvbHZlZDIgfHwge30pLmxlbmd0aCA9PSAwID8gcmVzb2x2ZWQgOiByZXNvbHZlZDI7XHJcbiAgICAgICAgaWYgKGFsbCkgZm91bmQucHVzaChkZWZhdWx0RXhwb3J0ID8gdHJ1ZVJlc29sdmVkLmV4cG9ydHMgOiB0cnVlUmVzb2x2ZWQpO1xyXG4gICAgICAgIGVsc2UgcmV0dXJuIGRlZmF1bHRFeHBvcnQgPyB0cnVlUmVzb2x2ZWQuZXhwb3J0cyA6IHRydWVSZXNvbHZlZDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICBpZiAoYWxsKSByZXR1cm4gZm91bmQ7XHJcbn07XHJcblxyXG5cclxuZnVuY3Rpb24gZmluZGVyRmluZEZ1bmN0aW9uKGVudHJpZXMsIHN0cmluZ3MpIHtcclxuICByZXR1cm4gKGVudHJpZXMuZmluZChuID0+IHtcclxuICAgIGxldCBmdW5jU3RyaW5nID0gdHlwZW9mIG5bMV0gPT0gXCJmdW5jdGlvblwiID8gKG5bMV0/Ll9fb3JpZ2luYWxfXz8udG9TdHJpbmc/LigpIHx8IG5bMV0/LnRvU3RyaW5nPy4oKSB8fCBcIlwiKSA6ICgoKSA9PiB7IHRyeSB7IHJldHVybiBKU09OLnN0cmluZ2lmeShuWzFdKSB9IGNhdGNoIChlcnIpIHsgcmV0dXJuIG5bMV0udG9TdHJpbmcoKSB9IH0pKCk7XHJcbiAgICBsZXQgcmVuZGVyRnVuY1N0cmluZyA9IG5bMV0/LnJlbmRlcj8uX19vcmlnaW5hbF9fPy50b1N0cmluZz8uKCkgfHwgblsxXT8ucmVuZGVyPy50b1N0cmluZz8uKCkgfHwgXCJcIjtcclxuICAgIHJldHVybiBzdHJpbmdzLmV2ZXJ5KHN0cmluZyA9PiBmdW5jU3RyaW5nLmluZGV4T2Yoc3RyaW5nKSAhPSAtMSB8fCByZW5kZXJGdW5jU3RyaW5nLmluZGV4T2Yoc3RyaW5nKSAhPSAtMSk7XHJcbiAgfSkpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZmluZGVyVG9GaWx0ZXIoZmluZGVyKSB7XHJcbiAgbGV0IGZvdW5kID0gKCkgPT4gZmFsc2U7XHJcbiAgaWYgKHR5cGVvZiBmaW5kZXI/LmZpbHRlciA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgZm91bmQgPSB3cmFwRmlsdGVyKGV2YWwoYCgoJCk9PnsgdHJ5IHsgcmV0dXJuICgke2ZpbmRlci5maWx0ZXJ9KTsgfSBjYXRjaCB7IHJldHVybiBmYWxzZTsgfSB9KWApKTtcclxuICB9IGVsc2UgaWYgKHR5cGVvZiBmaW5kZXI/LmZpbHRlciA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICBmb3VuZCA9IHdyYXBGaWx0ZXIoZmluZGVyLmZpbHRlcik7XHJcbiAgfSBlbHNlIHtcclxuICAgIHN3aXRjaCAoZmluZGVyLmZpbHRlci5pbikge1xyXG4gICAgICBjYXNlIFwicHJvcGVydGllc1wiOiB7XHJcbiAgICAgICAgaWYgKGZpbmRlci5maWx0ZXIuYnk/LlsxXT8ubGVuZ3RoKSB7XHJcbiAgICAgICAgICBmb3VuZCA9IHdyYXBGaWx0ZXIoKG0pID0+IGNoZWNrTW9kdWxlUHJvcHMobSwgZmluZGVyLmZpbHRlci5ieT8uWzBdIHx8IFtdKSAmJiBjaGVja01vZHVsZVByb3BzKG0sIGZpbmRlci5maWx0ZXIuYnk/LlsxXSB8fCBbXSwgdHJ1ZSkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBmb3VuZCA9IHdyYXBGaWx0ZXIoKG0pID0+IGNoZWNrTW9kdWxlUHJvcHMobSwgZmluZGVyLmZpbHRlci5ieT8uWzBdIHx8IFtdKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgXCJwcm90b3R5cGVzXCI6IHtcclxuICAgICAgICBpZiAoZmluZGVyLmZpbHRlci5ieT8uWzFdPy5sZW5ndGgpIHtcclxuICAgICAgICAgIGZvdW5kID0gd3JhcEZpbHRlcigobSkgPT4gY2hlY2tNb2R1bGVQcm90b3R5cGVzKG0sIGZpbmRlci5maWx0ZXIuYnk/LlswXSB8fCBbXSkgJiYgY2hlY2tNb2R1bGVQcm90b3R5cGVzKG0sIGZpbmRlci5maWx0ZXIuYnk/LlsxXSB8fCBbXSwgdHJ1ZSkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBmb3VuZCA9IHdyYXBGaWx0ZXIoKG0pID0+IGNoZWNrTW9kdWxlUHJvdG90eXBlcyhtLCBmaW5kZXIuZmlsdGVyLmJ5Py5bMF0gfHwgW10pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSBcInN0cmluZ3NcIjoge1xyXG4gICAgICAgIGlmIChmaW5kZXIuZmlsdGVyLmJ5Py5bMV0/Lmxlbmd0aCkge1xyXG4gICAgICAgICAgZm91bmQgPSB3cmFwRmlsdGVyKChtKSA9PiBjaGVja01vZHVsZVN0cmluZ3MobSwgZmluZGVyLmZpbHRlci5ieT8uWzBdIHx8IFtdKSAmJiBjaGVja01vZHVsZVN0cmluZ3MobSwgZmluZGVyLmZpbHRlci5ieT8uWzFdIHx8IFtdLCB0cnVlKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGZvdW5kID0gd3JhcEZpbHRlcigobSkgPT4gY2hlY2tNb2R1bGVTdHJpbmdzKG0sIGZpbmRlci5maWx0ZXIuYnk/LlswXSB8fCBbXSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gZm91bmQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBmaW5kZXJNYXAoX19vcmlnaW5hbF9fLCBtYXApIHtcclxuICBsZXQgX19tYXBwZWRfXyA9IHt9O1xyXG5cclxuICBsZXQgdGVtcCA9IHtcclxuICAgIF9fb3JpZ2luYWxfXyxcclxuICAgIF9fbWFwcGVkX18sXHJcbiAgICAuLi5fX29yaWdpbmFsX19cclxuICB9O1xyXG5cclxuICBPYmplY3QuZW50cmllcyhtYXApLmZvckVhY2goKFtrZXksIHN0cmluZ3NdKSA9PiB7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGVtcCwga2V5LCB7XHJcbiAgICAgIGdldCgpIHtcclxuICAgICAgICBpZiAoX19tYXBwZWRfX1trZXldKSByZXR1cm4gX19vcmlnaW5hbF9fW19fbWFwcGVkX19ba2V5XV07XHJcblxyXG4gICAgICAgIGxldCBmb3VuZEZ1bmMgPSBmaW5kZXJGaW5kRnVuY3Rpb24oT2JqZWN0LmVudHJpZXMoX19vcmlnaW5hbF9fIHx8IHt9KSwgbWFwW2tleV0gfHwgW10pO1xyXG4gICAgICAgIGlmICghZm91bmRGdW5jPy5sZW5ndGgpIHJldHVybjtcclxuXHJcbiAgICAgICAgX19tYXBwZWRfX1trZXldID0gZm91bmRGdW5jWzBdO1xyXG4gICAgICAgIHJldHVybiBmb3VuZEZ1bmNbMV07XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiB0ZW1wO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZmluZEJ5RmluZGVyKHJlcSwgZmluZGVyID0ge30pIHtcclxuICBjb25zdCBkZWZhdWx0RXhwb3J0ID0gISFmaW5kZXI/LmZpbHRlcj8uZXhwb3J0O1xyXG4gIGxldCBmb3VuZCA9IGZpbmQocmVxLCBmaW5kZXJUb0ZpbHRlcihmaW5kZXIpLCB7IGRlZmF1bHRFeHBvcnQsIGFsbDogdHJ1ZSB9KS5maW5kKGkgPT4gaSAhPT0gZ2xvYmFsVGhpcy53aW5kb3cgfHwgaT8uZXhwb3J0cyAhPT0gZ2xvYmFsVGhpcy53aW5kb3cpO1xyXG5cclxuICBpZiAoIWZvdW5kKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgaWYgKGZpbmRlci5wYXRoPy5iZWZvcmUpIGZvdW5kID0gKEFycmF5LmlzQXJyYXkoZmluZGVyLnBhdGguYmVmb3JlKSA/IGZpbmRlci5wYXRoLmJlZm9yZS5tYXAoaSA9PiBfLmdldChmb3VuZCwgaSkpLmZpbmQoaSA9PiBpKSA6IF8uZ2V0KGZvdW5kLCBmaW5kZXIucGF0aC5iZWZvcmUpKSB8fCBmb3VuZDtcclxuICBpZiAoZmluZGVyLmFzc2lnbikgZm91bmQgPSBPYmplY3QuYXNzaWduKHt9LCBmb3VuZCk7XHJcblxyXG4gIGlmICghZm91bmQpIHJldHVybiBudWxsO1xyXG5cclxuICBpZiAoZmluZGVyLm1hcCkgZm91bmQgPSBmaW5kZXJNYXAoZm91bmQsIGZpbmRlci5tYXApO1xyXG5cclxuICBpZiAoZmluZGVyLnBhdGg/LmFmdGVyKSBmb3VuZCA9IChBcnJheS5pc0FycmF5KGZpbmRlci5wYXRoLmFmdGVyKSA/IGZpbmRlci5wYXRoLmFmdGVyLm1hcChpID0+IF8uZ2V0KGZvdW5kLCBpKSkuZmluZChpID0+IGkpIDogXy5nZXQoZm91bmQsIGZpbmRlci5wYXRoLmFmdGVyKSkgfHwgZm91bmQ7XHJcblxyXG4gIHJldHVybiBmb3VuZDtcclxufVxyXG5cclxuXHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbGF6eUZpbmRCeUZpbmRlcihmaW5kZXIgPSB7fSkge1xyXG4gIGxldCBmb3VuZCA9IGF3YWl0IGxhenlGaW5kKGZpbmRlclRvRmlsdGVyKGZpbmRlciksIHsgc2VhcmNoRXhwb3J0czogZmFsc2UgfSk7XHJcblxyXG4gIGlmICghZm91bmQpIHJldHVybiBudWxsO1xyXG5cclxuICBpZiAoZmluZGVyLnBhdGg/LmJlZm9yZSkgZm91bmQgPSAoQXJyYXkuaXNBcnJheShmaW5kZXIucGF0aC5iZWZvcmUpID8gZmluZGVyLnBhdGguYmVmb3JlLm1hcChpID0+IF8uZ2V0KGZvdW5kLCBpKSkuZmluZChpID0+IGkpIDogXy5nZXQoZm91bmQsIGZpbmRlci5wYXRoLmJlZm9yZSkpIHx8IGZvdW5kO1xyXG4gIGlmIChmaW5kZXIuYXNzaWduKSBmb3VuZCA9IE9iamVjdC5hc3NpZ24oe30sIGZvdW5kKTtcclxuXHJcbiAgaWYgKCFmb3VuZCkgcmV0dXJuIG51bGw7XHJcblxyXG4gIGlmIChmaW5kZXIubWFwKSBmb3VuZCA9IGZpbmRlck1hcChmb3VuZCwgZmluZGVyLm1hcCk7XHJcblxyXG4gIGlmIChmaW5kZXIucGF0aD8uYWZ0ZXIpIGZvdW5kID0gKEFycmF5LmlzQXJyYXkoZmluZGVyLnBhdGguYWZ0ZXIpID8gZmluZGVyLnBhdGguYWZ0ZXIubWFwKGkgPT4gXy5nZXQoZm91bmQsIGkpKS5maW5kKGkgPT4gaSkgOiBfLmdldChmb3VuZCwgZmluZGVyLnBhdGguYWZ0ZXIpKSB8fCBmb3VuZDtcclxuXHJcbiAgcmV0dXJuIGZvdW5kO1xyXG59IiwgImltcG9ydCAqIGFzIGNvbXBsZXhGaW5kZXIgZnJvbSBcIi4vcmF3L2NvbXBsZXgtZmluZGVyLmpzXCI7XHJcblxyXG5jb25zdCBkZWZhdWx0QmVmb3JlID0gW1xyXG4gIFwiZXhwb3J0cy5aXCIsXHJcbiAgXCJleHBvcnRzLlpQXCIsXHJcbiAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICBcImV4cG9ydHNcIlxyXG5dO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIF9fY2FjaGVfXzoge30sXHJcbiAgZ2V0IHJlcXVpcmUoKSB7XHJcbiAgICBpZiAodGhpcy5fX2NhY2hlX18ucmVxdWlyZSkgcmV0dXJuIHRoaXMuX19jYWNoZV9fLnJlcXVpcmU7XHJcbiAgICBsZXQgcmVxSWQgPSBgQWNvcmRXZWJwYWNrTW9kdWxlcyR7RGF0ZS5ub3coKX1gO1xyXG4gICAgY29uc3QgcmVxID0gd2luZG93LndlYnBhY2tDaHVua2Rpc2NvcmRfYXBwLnB1c2goW1tyZXFJZF0sIHt9LCByZXEgPT4gcmVxXSk7XHJcbiAgICBkZWxldGUgcmVxLm1bcmVxSWRdO1xyXG4gICAgZGVsZXRlIHJlcS5jW3JlcUlkXTtcclxuICAgIHdpbmRvdy53ZWJwYWNrQ2h1bmtkaXNjb3JkX2FwcC5wb3AoKTtcclxuICAgIHRoaXMuX19jYWNoZV9fLnJlcXVpcmUgPSByZXE7XHJcbiAgICByZXR1cm4gcmVxO1xyXG4gIH0sXHJcbiAgZmluZChmaWx0ZXIsIGNvbmZpZyA9IHt9KSB7XHJcbiAgICByZXR1cm4gY29tcGxleEZpbmRlci5maW5kKHRoaXMucmVxdWlyZSwgY29tcGxleEZpbmRlci53cmFwRmlsdGVyKGZpbHRlciksIGNvbmZpZyk7XHJcbiAgfSxcclxuICBsYXp5RmluZChmaWx0ZXIsIGNvbmZpZyA9IHt9KSB7XHJcbiAgICByZXR1cm4gY29tcGxleEZpbmRlci5sYXp5RmluZChjb21wbGV4RmluZGVyLndyYXBGaWx0ZXIoZmlsdGVyKSwgY29uZmlnKTtcclxuICB9LFxyXG4gIGxhenlGaW5kQnlGaW5kZXIoZmluZGVyKSB7XHJcbiAgICByZXR1cm4gY29tcGxleEZpbmRlci5sYXp5RmluZEJ5RmluZGVyKGZpbmRlcik7XHJcbiAgfSxcclxuICBmaWx0ZXIoZmlsdGVyLCBjb25maWcgPSB7fSkge1xyXG4gICAgcmV0dXJuIGNvbXBsZXhGaW5kZXIuZmluZCh0aGlzLnJlcXVpcmUsIGNvbXBsZXhGaW5kZXIud3JhcEZpbHRlcihmaWx0ZXIpLCB7IC4uLmNvbmZpZywgYWxsOiB0cnVlIH0pO1xyXG4gIH0sXHJcbiAgZmluZEJ5RmluZGVyKGZpbmRlcikge1xyXG4gICAgcmV0dXJuIGNvbXBsZXhGaW5kZXIuZmluZEJ5RmluZGVyKHRoaXMucmVxdWlyZSwgZmluZGVyKTtcclxuICB9LFxyXG4gIGZpbmRCeVN0cmluZ1ZhbHVlcyguLi5zdHJpbmdWYWx1ZXMpIHtcclxuICAgIHJldHVybiB0aGlzLmZpbmQoKGEpID0+IHsgbGV0IHZhID0gT2JqZWN0LnZhbHVlcyhhKTsgcmV0dXJuIHN0cmluZ1ZhbHVlcy5ldmVyeSh4ID0+IHZhLnNvbWUoeSA9PiB0eXBlb2YgeSA9PSBcInN0cmluZ1wiICYmIHkuaW5jbHVkZXMoeCkpKSB9KT8uZXhwb3J0cztcclxuICB9LFxyXG4gIGZpbmRCeVByb3BlcnRpZXMoLi4ucHJvcHMpIHtcclxuICAgIHJldHVybiB0aGlzLmZpbmRCeUZpbmRlcih7XHJcbiAgICAgIGZpbHRlcjoge1xyXG4gICAgICAgIGV4cG9ydDogZmFsc2UsXHJcbiAgICAgICAgaW46IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIGJ5OiBbcHJvcHNdXHJcbiAgICAgIH0sXHJcbiAgICAgIHBhdGg6IHtcclxuICAgICAgICBiZWZvcmU6IGRlZmF1bHRCZWZvcmVcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSxcclxuICBmaW5kQnlQcm90b3R5cGVzKC4uLnByb3BzKSB7XHJcbiAgICByZXR1cm4gdGhpcy5maW5kQnlGaW5kZXIoe1xyXG4gICAgICBmaWx0ZXI6IHtcclxuICAgICAgICBleHBvcnQ6IGZhbHNlLFxyXG4gICAgICAgIGluOiBcInByb3RvdHlwZXNcIixcclxuICAgICAgICBieTogW3Byb3BzXVxyXG4gICAgICB9LFxyXG4gICAgICBwYXRoOiB7XHJcbiAgICAgICAgYmVmb3JlOiBkZWZhdWx0QmVmb3JlXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgZmluZEJ5U3RyaW5ncyguLi5wcm9wcykge1xyXG4gICAgcmV0dXJuIHRoaXMuZmluZEJ5RmluZGVyKHtcclxuICAgICAgZmlsdGVyOiB7XHJcbiAgICAgICAgZXhwb3J0OiBmYWxzZSxcclxuICAgICAgICBpbjogXCJzdHJpbmdzXCIsXHJcbiAgICAgICAgYnk6IFtwcm9wc11cclxuICAgICAgfSxcclxuICAgICAgcGF0aDoge1xyXG4gICAgICAgIGJlZm9yZTogZGVmYXVsdEJlZm9yZVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9LFxyXG59OyIsICJpbXBvcnQgY29tbW9uRGF0YSBmcm9tICcuLi8uLi9kYXRhL2NvbW1vbi5qc29uJztcclxuaW1wb3J0IHdlYnBhY2sgZnJvbSAnLi93ZWJwYWNrLmpzJztcclxuXHJcblxyXG5mdW5jdGlvbiBtYXBPYmplY3QodGVtcCwgaW5wKSB7XHJcbiAgaWYgKCF0ZW1wPy5fX2NhY2hlX18pIHRlbXAuX19jYWNoZV9fID0ge307XHJcbiAgZm9yIChjb25zdCBrZXkgaW4gaW5wKSB7XHJcbiAgICBpZiAoaW5wPy5ba2V5XT8uX18gPT09IHRydWUpIHtcclxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRlbXAsIGtleSwge1xyXG4gICAgICAgIGdldCgpIHtcclxuICAgICAgICAgIGlmICh0ZW1wLl9fY2FjaGVfX1trZXldKSByZXR1cm4gdGVtcC5fX2NhY2hlX19ba2V5XTtcclxuICAgICAgICAgIHJldHVybiB0ZW1wLl9fY2FjaGVfX1trZXldID0gd2VicGFjay5maW5kQnlGaW5kZXIoaW5wW2tleV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICh0eXBlb2YgdGVtcFtrZXldID09PSBcInVuZGVmaW5lZFwiKSB0ZW1wW2tleV0gPSB7fTtcclxuICAgICAgbWFwT2JqZWN0KHRlbXBba2V5XSwgaW5wW2tleV0pO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuXHJcbmxldCBjb21tb24gPSB7XHJcbiAgX19jYWNoZV9fOiB7fSxcclxuICBMYXllckFjdGlvbnM6IHtcclxuICAgIHB1c2goY29tcG9uZW50KSB7XHJcbiAgICAgIGNvbW1vbi5GbHV4RGlzcGF0Y2hlci5kaXNwYXRjaCh7XHJcbiAgICAgICAgdHlwZTogXCJMQVlFUl9QVVNIXCIsXHJcbiAgICAgICAgY29tcG9uZW50XHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIHBvcCgpIHtcclxuICAgICAgY29tbW9uLkZsdXhEaXNwYXRjaGVyLmRpc3BhdGNoKHtcclxuICAgICAgICB0eXBlOiBcIkxBWUVSX1BPUFwiXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIHBvcEFsbCgpIHtcclxuICAgICAgY29tbW9uLkZsdXhEaXNwYXRjaGVyLmRpc3BhdGNoKHtcclxuICAgICAgICB0eXBlOiBcIkxBWUVSX1BPUF9BTExcIlxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9LFxyXG59O1xyXG5tYXBPYmplY3QoY29tbW9uLCBjb21tb25EYXRhLmNvbW1vbik7XHJcbntcclxuICBsZXQgcGF0aHMgPSBbXHJcbiAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgXCJleHBvcnRzXCJcclxuICBdO1xyXG4gIHdlYnBhY2suZmlsdGVyKChpKSA9PiBpPy5nZXROYW1lPy4oKT8uZW5kc1dpdGg/LihcIlN0b3JlXCIpLCB7IGRlZmF1bHRFeHBvcnQ6IGZhbHNlIH0pLmZvckVhY2goKG0pID0+IHtcclxuICAgIGxldCBvYmogPSBwYXRocy5tYXAocGF0aCA9PiBfLmdldChtLCBwYXRoKSkuZmluZChpID0+IGkpO1xyXG4gICAgaWYgKCFvYmopIHJldHVybjtcclxuICAgIGxldCBuYW1lID0gb2JqPy5nZXROYW1lPy4oKTtcclxuICAgIGlmICghbmFtZSkgcmV0dXJuO1xyXG4gICAgaWYgKGNvbW1vbltuYW1lXSkgcmV0dXJuO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb21tb24sIG5hbWUsIHtcclxuICAgICAgZ2V0KCkge1xyXG4gICAgICAgIGlmIChjb21tb24uX19jYWNoZV9fW25hbWVdKSByZXR1cm4gY29tbW9uLl9fY2FjaGVfX1tuYW1lXTtcclxuICAgICAgICByZXR1cm4gY29tbW9uLl9fY2FjaGVfX1tuYW1lXSA9IG9iajtcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9KVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb21tb247IiwgImltcG9ydCBjb21tb24gZnJvbSBcIi4vY29tbW9uLmpzXCI7XHJcbmltcG9ydCB3ZWJwYWNrIGZyb20gXCIuL3dlYnBhY2suanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBjb21tb24sXHJcbiAgd2VicGFjayxcclxuICByZXF1aXJlOiBnbG9iYWxUaGlzW1wiPFBSRUxPQURfS0VZPlwiXS5yZXF1aXJlLFxyXG4gIG5hdGl2ZTogRGlzY29yZE5hdGl2ZSxcclxufSIsICJpbXBvcnQgbW9kdWxlcyBmcm9tIFwiLi4vbW9kdWxlcy9pbmRleC5qc1wiXHJcbmltcG9ydCB1dGlscyBmcm9tIFwiLi4vdXRpbHMvaW5kZXguanNcIjtcclxuXHJcbmNvbnN0IEJBU0VfVVJMID0gXCJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vYWNvcmQtc3RhbmRhbG9uZS9hc3NldHMvbWFpbi9pMThuXCI7XHJcbmNvbnN0IG5vU3RvcmUgPSB7IGNhY2hlOiBcIm5vLXN0b3JlXCIgfTtcclxuXHJcblxyXG5jb25zdCBvdXQgPSB7XHJcbiAgX19jYWNoZV9fOiB7XHJcbiAgICBsb2NhbGVJZHM6IFtdLFxyXG4gICAgbG9jYWxpemF0aW9uczoge31cclxuICB9LFxyXG4gIGdldCBsb2NhbGUoKSB7XHJcbiAgICByZXR1cm4gbW9kdWxlcy5jb21tb24uaTE4bi5fcmVxdWVzdGVkTG9jYWxlO1xyXG4gIH0sXHJcbiAgZ2V0KGtleSkge1xyXG4gICAgY2hlY2soKTtcclxuICAgIHJldHVybiBvdXQuX19jYWNoZV9fLmxvY2FsaXphdGlvbnNbb3V0LmxvY2FsZV0/LltrZXldXHJcbiAgICAgIHx8IG91dC5fX2NhY2hlX18ubG9jYWxpemF0aW9ucy5kZWZhdWx0Py5ba2V5XVxyXG4gICAgICB8fCBtb2R1bGVzLmNvbW1vbi5pMThuLk1lc3NhZ2VzW2tleV1cclxuICAgICAgfHwga2V5O1xyXG4gIH0sXHJcbiAgbWVzc2FnZXM6IG5ldyBQcm94eSh7fSwge1xyXG4gICAgZ2V0KF8sIHByb3ApIHtcclxuICAgICAgcmV0dXJuIG91dC5nZXQocHJvcCk7XHJcbiAgICB9XHJcbiAgfSksXHJcbiAgbG9jYWxpemUoc3RyLCAuLi5hcmdzKSB7XHJcbiAgICBpZiAodHlwZW9mIHN0ciA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIHV0aWxzLmZvcm1hdChzdHIsIC4uLmFyZ3MpO1xyXG4gICAgbGV0IHZhbCA9IHN0cj8uW291dC5sb2NhbGVdXHJcbiAgICAgIHx8IHN0cj8uZGVmYXVsdFxyXG4gICAgICB8fCBPYmplY3QudmFsdWVzKHN0cilbMF07XHJcbiAgICBpZiAoIXZhbCkgcmV0dXJuIG51bGw7XHJcbiAgICByZXR1cm4gdXRpbHMuZm9ybWF0KHZhbCwgLi4uYXJncyk7XHJcbiAgfSxcclxuICBmb3JtYXQoa2V5LCAuLi5hcmdzKSB7XHJcbiAgICByZXR1cm4gdXRpbHMuZm9ybWF0KG91dC5nZXQoa2V5KSwgLi4uYXJncyk7XHJcbiAgfVxyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBjaGVjaygpIHtcclxuICBjb25zdCBsb2NhbGUgPSBvdXQubG9jYWxlO1xyXG4gIGlmICghb3V0Ll9fY2FjaGVfXy5sb2NhbGVJZHMubGVuZ3RoKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBvdXQuX19jYWNoZV9fLmxvY2FsZUlkcyA9IGF3YWl0IChhd2FpdCBmZXRjaChgJHtCQVNFX1VSTH0vbG9jYWxlcy5qc29uYCwgbm9TdG9yZSkpLmpzb24oKTtcclxuICAgIH0gY2F0Y2ggeyB9XHJcbiAgICB0cnkge1xyXG4gICAgICBvdXQuX19jYWNoZV9fLmxvY2FsaXphdGlvbnMuZGVmYXVsdCA9IGF3YWl0IChhd2FpdCBmZXRjaChgJHtCQVNFX1VSTH0vZGVmYXVsdC5qc29uYCwgbm9TdG9yZSkpLmpzb24oKTtcclxuICAgIH0gY2F0Y2ggeyB9XHJcbiAgfVxyXG4gIGlmIChcclxuICAgIG91dC5fX2NhY2hlX18ubG9jYWxlSWRzLmluY2x1ZGVzKGxvY2FsZSlcclxuICAgICYmICFvdXQuX19jYWNoZV9fLmxvY2FsaXphdGlvbnM/Lltsb2NhbGVdXHJcbiAgKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBvdXQuX19jYWNoZV9fLmxvY2FsaXphdGlvbnNbbG9jYWxlXSA9IGF3YWl0IChhd2FpdCBmZXRjaChgJHtCQVNFX1VSTH0vJHtsb2NhbGV9Lmpzb25gLCBub1N0b3JlKSkuanNvbigpO1xyXG4gICAgfSBjYXRjaCB7IH07XHJcbiAgfVxyXG59XHJcblxyXG5jaGVjaygpO1xyXG5leHBvcnQgZGVmYXVsdCBvdXQ7IiwgImltcG9ydCBtb2R1bGVzIGZyb20gXCIuLi9hcGkvbW9kdWxlcy9pbmRleC5qc1wiO1xyXG5pbXBvcnQgaTE4biBmcm9tIFwiLi4vYXBpL2kxOG4vaW5kZXguanNcIjtcclxuXHJcbmxldCBpc0Nvbm5lY3Rpb25PcGVuID0gZmFsc2U7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gd2FpdFVudGlsQ29ubmVjdGlvbk9wZW4oKSB7XHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICBpZiAoaXNDb25uZWN0aW9uT3BlbikgcmV0dXJuIHJlc29sdmUodHJ1ZSk7XHJcbiAgICBmdW5jdGlvbiBvbkV2ZW50KCkge1xyXG4gICAgICBtb2R1bGVzLmNvbW1vbi5GbHV4RGlzcGF0Y2hlci51bnN1YnNjcmliZShcIkNPTk5FQ1RJT05fT1BFTlwiLCBvbkV2ZW50KTtcclxuICAgICAgaXNDb25uZWN0aW9uT3BlbiA9IHRydWU7XHJcbiAgICAgIHJlc29sdmUodHJ1ZSk7XHJcbiAgICB9XHJcbiAgICBtb2R1bGVzLmNvbW1vbi5GbHV4RGlzcGF0Y2hlci5zdWJzY3JpYmUoXCJDT05ORUNUSU9OX09QRU5cIiwgb25FdmVudCk7XHJcbiAgfSk7XHJcbn1cclxuIiwgImltcG9ydCBsb2dnZXIgZnJvbSBcIi4uL2FwaS91dGlscy9sb2dnZXIuanNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBCYXNpY0V2ZW50RW1pdHRlciB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAvKiogQHR5cGUge01hcDxzdHJpbmcsIE1hcDwoLi4uYXJnczogYW55W10pPT52b2lkLCB7b25jZTogYm9vbGVhbn0+Pn0gKi9cclxuICAgIHRoaXMubGlzdGVuZXJzID0gbmV3IE1hcCgpO1xyXG4gIH1cclxuXHJcbiAgX3ByZXBhcmVMaXN0ZW5lcnNNYXAoZXZlbnROYW1lKSB7XHJcbiAgICBpZiAoIXRoaXMubGlzdGVuZXJzLmhhcyhldmVudE5hbWUpKVxyXG4gICAgICB0aGlzLmxpc3RlbmVycy5zZXQoZXZlbnROYW1lLCBuZXcgTWFwKCkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50TmFtZVxyXG4gICAqIEBwYXJhbSB7KC4uLmFyZ3M6IGFueVtdKT0+dm9pZH0gbGlzdGVuZXJcclxuICAgKi9cclxuICBvbihldmVudE5hbWUsIGxpc3RlbmVyKSB7XHJcbiAgICB0aGlzLl9wcmVwYXJlTGlzdGVuZXJzTWFwKGV2ZW50TmFtZSk7XHJcbiAgICB0aGlzLmxpc3RlbmVycy5nZXQoZXZlbnROYW1lKS5zZXQobGlzdGVuZXIsIHsgb25jZTogZmFsc2UgfSk7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICB0aGlzLmxpc3RlbmVycy5nZXQoZXZlbnROYW1lKS5kZWxldGUobGlzdGVuZXIpO1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudE5hbWVcclxuICAgKiBAcGFyYW0geyguLi5hcmdzOiBhbnlbXSk9PnZvaWR9IGxpc3RlbmVyXHJcbiAgICovXHJcbiAgb25jZShldmVudE5hbWUsIGxpc3RlbmVyKSB7XHJcbiAgICB0aGlzLl9wcmVwYXJlTGlzdGVuZXJzTWFwKGV2ZW50TmFtZSk7XHJcbiAgICB0aGlzLmxpc3RlbmVycy5nZXQoZXZlbnROYW1lKT8uc2V0KGxpc3RlbmVyLCB7IG9uY2U6IHRydWUgfSk7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICB0aGlzLmxpc3RlbmVycy5nZXQoZXZlbnROYW1lKS5kZWxldGUobGlzdGVuZXIpO1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nP30gZXZlbnROYW1lXHJcbiAgICogQHBhcmFtIHsoKC4uLmFyZ3M6IGFueVtdKT0+dm9pZCk/fSBsaXN0ZW5lclxyXG4gICAqL1xyXG4gIG9mZihldmVudE5hbWUsIGxpc3RlbmVyKSB7XHJcbiAgICBpZiAoIWV2ZW50TmFtZSkgcmV0dXJuICh0aGlzLmxpc3RlbmVycyA9IG5ldyBNYXAoKSk7XHJcbiAgICBpZiAoIWxpc3RlbmVyKSByZXR1cm4gdGhpcy5saXN0ZW5lcnM/LmRlbGV0ZShldmVudE5hbWUpO1xyXG4gICAgdGhpcy5saXN0ZW5lcnMuZ2V0KGV2ZW50TmFtZSk/LmRlbGV0ZShsaXN0ZW5lcik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnROYW1lXHJcbiAgICogQHBhcmFtICB7Li4uYW55fSBhcmdzXHJcbiAgICovXHJcbiAgZW1pdChldmVudE5hbWUsIC4uLmFyZ3MpIHtcclxuICAgIGlmICghdGhpcy5saXN0ZW5lcnMuaGFzKGV2ZW50TmFtZSkpIHJldHVybjtcclxuICAgIGxldCBldmVudE1hcCA9IHRoaXMubGlzdGVuZXJzLmdldChldmVudE5hbWUpO1xyXG4gICAgZXZlbnRNYXAuZm9yRWFjaCgoeyBvbmNlIH0sIGxpc3RlbmVyKSA9PiB7XHJcbiAgICAgIGlmIChvbmNlKSBldmVudE1hcD8uZGVsZXRlKGxpc3RlbmVyKTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBsaXN0ZW5lciguLi5hcmdzKTtcclxuICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgIGxvZ2dlci5lcnJvcihgRXJyb3Igd2hpbGUgZW1pdHRpbmcgJHtldmVudE5hbWV9IGV2ZW50LmAsIGUpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn07XHJcbiIsICJpbXBvcnQgeyBCYXNpY0V2ZW50RW1pdHRlciB9IGZyb20gXCIuLi8uLi9saWIvQmFzaWNFdmVudEVtaXR0ZXIuanNcIjtcclxuXHJcbmNvbnN0IGV2ZW50cyA9IG5ldyBCYXNpY0V2ZW50RW1pdHRlcigpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZXZlbnRzOyIsICJpbXBvcnQgZXZlbnRzIGZyb20gXCIuLi9ldmVudHNcIjtcclxuaW1wb3J0IHdlYnBhY2sgZnJvbSBcIi4uL21vZHVsZXMvd2VicGFjay5qc1wiO1xyXG5cclxuY29uc3Qgc2Nyb2xsYmFyQ2xhc3NlcyA9IHdlYnBhY2suZmluZEJ5UHJvcGVydGllcyhcInNjcm9sbGJhckdob3N0SGFpcmxpbmVcIiwgXCJzcGlubmVyXCIpO1xyXG5cclxuY29uc3QgZm9ybWF0UmVnZXhlcyA9IHtcclxuICBib2xkOiAvXFwqXFwqKFteKl0rKVxcKlxcKi9nLFxyXG4gIGl0YWxpYzogL1xcKihbXipdKylcXCovZyxcclxuICB1bmRlcmxpbmU6IC9cXF8oW14qXSspXFxfL2csXHJcbiAgc3RyaWtlOiAvXFx+XFx+KFteKl0rKVxcflxcfi9nLFxyXG4gIHVybDogLyhcXGIoaHR0cHM/fGZ0cHxmaWxlKTpcXC9cXC9bLUEtWjAtOSsmQCNcXC8lPz1+X3whOiwuO10qWy1BLVowLTkrJkAjXFwvJT1+X3xdKS9pZyxcclxuICBpbmxpbmU6IC9cXGAoW14qXSspXFxgL2csXHJcbiAgY29kZWJsb2NrU2luZ2xlOiAvXFxgXFxgXFxgKFteKl0rKVxcYFxcYFxcYC9nLFxyXG4gIGNvZGVibG9ja011bHRpOiAvXFxgXFxgXFxgKFxcdyspXFxuKCg/Oig/IVxcYFxcYFxcYClbXFxzXFxTXSkqKVxcYFxcYFxcYC9nXHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgcGFyc2UoaHRtbCkge1xyXG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBkaXYuaW5uZXJIVE1MID0gaHRtbDtcclxuICAgIHJldHVybiBkaXYuZmlyc3RFbGVtZW50Q2hpbGQ7XHJcbiAgfSxcclxuICB0b0NTU1Byb3Aobykge1xyXG4gICAgbGV0IGVsbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBPYmplY3QuZW50cmllcyhvKS5mb3JFYWNoKChpKSA9PiB7XHJcbiAgICAgIGlmIChlbG0uc3R5bGUuaGFzT3duUHJvcGVydHkoaVswXSkpIHtcclxuICAgICAgICBlbG0uc3R5bGVbaVswXV0gPSBpWzFdO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGVsbS5zdHlsZS5zZXRQcm9wZXJ0eShpWzBdLCBpWzFdKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gZWxtLmdldEF0dHJpYnV0ZShcInN0eWxlXCIpO1xyXG4gIH0sXHJcbiAgdG9IVE1MUHJvcHMobykge1xyXG4gICAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKG8pXHJcbiAgICAgIC5tYXAoXHJcbiAgICAgICAgKGkpID0+XHJcbiAgICAgICAgICBgJHtpWzBdLnJlcGxhY2UoLyArLywgXCItXCIpfT1cIiR7aVswXSA9PSBcInN0eWxlXCIgJiYgdHlwZW9mIGlbMV0gIT0gXCJzdHJpbmdcIlxyXG4gICAgICAgICAgICA/IHRoaXMudG9DU1NQcm9wKGlbMV0pXHJcbiAgICAgICAgICAgIDogdGhpcy5lc2NhcGVIVE1MKGlbMV0pfVwiYFxyXG4gICAgICApXHJcbiAgICAgIC5qb2luKFwiIFwiKTtcclxuICB9LFxyXG4gIGVzY2FwZShodG1sKSB7XHJcbiAgICByZXR1cm4gbmV3IE9wdGlvbihodG1sKS5pbm5lckhUTUw7XHJcbiAgfSxcclxuICAvKipcclxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsbSBcclxuICAgKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IHNlbGVjdG9yT3JOdW1iZXIgXHJcbiAgICogQHJldHVybnMge0VsZW1lbnRbXX1cclxuICAgKi9cclxuICBwYXJlbnRzKGVsbSwgc2VsZWN0b3JPck51bWJlcikge1xyXG4gICAgbGV0IHBhcmVudHMgPSBbXTtcclxuICAgIGlmICh0eXBlb2Ygc2VsZWN0b3JPck51bWJlciA9PT0gXCJudW1iZXJcIikge1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlbGVjdG9yT3JOdW1iZXI7IGkrKykge1xyXG4gICAgICAgIGlmIChlbG0ucGFyZW50RWxlbWVudCkge1xyXG4gICAgICAgICAgZWxtID0gZWxtLnBhcmVudEVsZW1lbnQ7XHJcbiAgICAgICAgICBwYXJlbnRzLnB1c2goZWxtKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHdoaWxlIChlbG0ucGFyZW50RWxlbWVudCAmJiBlbG0ucGFyZW50RWxlbWVudC5jbG9zZXN0KHNlbGVjdG9yT3JOdW1iZXIpKSB7XHJcbiAgICAgICAgZWxtID0gZWxtLnBhcmVudEVsZW1lbnQuY2xvc2VzdChzZWxlY3Rvck9yTnVtYmVyKTtcclxuICAgICAgICBwYXJlbnRzLnB1c2goZWxtKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBhcmVudHM7XHJcbiAgfSxcclxuICAvKipcclxuICAgKiBcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3IgXHJcbiAgICogQHBhcmFtIHsoZWxlbWVudDogSFRNTERpdkVsZW1lbnQpPT4oKCk9PnZvaWQpfSBjYiBcclxuICAgKiBAcmV0dXJucyB7KCk9PnZvaWR9XHJcbiAgICovXHJcbiAgcGF0Y2g6IChzZWxlY3RvciwgY2IpID0+XHJcbiAgICAoKCkgPT4ge1xyXG4gICAgICBmdW5jdGlvbiBub2RlQWRkZWQobm9kZSkge1xyXG4gICAgICAgIGlmICh0eXBlb2Ygbm9kZT8ucXVlcnlTZWxlY3RvckFsbCAhPSBcImZ1bmN0aW9uXCIpIHJldHVybjtcclxuICAgICAgICBub2RlLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpLmZvckVhY2goYXN5bmMgKGVsbSkgPT4ge1xyXG4gICAgICAgICAgaWYgKCFlbG0uYWNvcmQpIHtcclxuICAgICAgICAgICAgZWxtLmFjb3JkID0geyB1bm1vdW50OiBbXSwgcGF0Y2hlZDogbmV3IFNldCgpIH07XHJcbiAgICAgICAgICAgIGVsbS5jbGFzc0xpc3QuYWRkKFwiYWNvcmQtLXBhdGNoZWRcIik7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGVsbS5hY29yZC5wYXRjaGVkLmhhcyhjYikpIHJldHVybjtcclxuICAgICAgICAgIGVsbS5hY29yZC5wYXRjaGVkLmFkZChjYik7XHJcblxyXG4gICAgICAgICAgbGV0IHVuUGF0Y2hDYiA9IGF3YWl0IGNiKGVsbSk7XHJcbiAgICAgICAgICBpZiAodHlwZW9mIHVuUGF0Y2hDYiA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgICAgICBlbG0uYWNvcmQudW5tb3VudC5wdXNoKHVuUGF0Y2hDYik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGZ1bmN0aW9uIG5vZGVSZW1vdmVkKG5vZGUpIHtcclxuICAgICAgICBpZiAodHlwZW9mIG5vZGU/LnF1ZXJ5U2VsZWN0b3JBbGwgIT0gXCJmdW5jdGlvblwiKSByZXR1cm47XHJcbiAgICAgICAgbm9kZS5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKS5mb3JFYWNoKGFzeW5jIChlbG0pID0+IHtcclxuICAgICAgICAgIGlmICghZWxtLmFjb3JkKSByZXR1cm47XHJcbiAgICAgICAgICBlbG0uYWNvcmQudW5tb3VudC5mb3JFYWNoKChmKSA9PiBmKCkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKS5mb3JFYWNoKG5vZGVBZGRlZCk7XHJcblxyXG4gICAgICByZXR1cm4gZXZlbnRzLm9uKFxyXG4gICAgICAgIFwiRG9tTXV0YXRpb25cIixcclxuICAgICAgICAvKiogQHBhcmFtIHtNdXRhdGlvblJlY29yZH0gbXV0ICovKG11dCkgPT4ge1xyXG4gICAgICAgICAgaWYgKG11dC50eXBlID09PSBcImNoaWxkTGlzdFwiKSB7XHJcbiAgICAgICAgICAgIG11dC5hZGRlZE5vZGVzLmZvckVhY2gobm9kZUFkZGVkKTtcclxuICAgICAgICAgICAgbXV0LnJlbW92ZWROb2Rlcy5mb3JFYWNoKG5vZGVSZW1vdmVkKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICk7XHJcbiAgICB9KSgpLFxyXG4gIGZvcm1hdENvbnRlbnQobXNnKSB7XHJcbiAgICBpZiAoIW1zZykgcmV0dXJuICcnO1xyXG4gICAgY29uc3QgeyBib2xkLCBpdGFsaWMsIHVuZGVybGluZSwgc3RyaWtlLCBjb2RlYmxvY2tNdWx0aSwgY29kZWJsb2NrU2luZ2xlLCBpbmxpbmUsIHVybCB9ID0gZm9ybWF0UmVnZXhlcztcclxuXHJcbiAgICBjb25zdCBjb2RlQmxvY2tzTWFwID0gT2JqZWN0LmZyb21FbnRyaWVzKFtcclxuICAgICAgLi4uKG1zZy5tYXRjaEFsbChjb2RlYmxvY2tNdWx0aSkgfHwgW10pLCAuLi4obXNnLm1hdGNoQWxsKGNvZGVibG9ja1NpbmdsZSkgfHwgW10pXHJcbiAgICBdLm1hcChcclxuICAgICAgKFtfLCBjb2RlQmxvY2tPckNvZGUsIGNvZGVCbG9ja0NvbnRlbnRdLCBpKSA9PiB7XHJcbiAgICAgICAgbXNnID0gbXNnLnJlcGxhY2UoXywgYHt7Q09ERUJMT0NLXyR7aX19fWApO1xyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICBge3tDT0RFQkxPQ0tfJHtpfX19YCxcclxuICAgICAgICAgIGNvZGVCbG9ja0NvbnRlbnQgP1xyXG4gICAgICAgICAgICBgPHByZT48Y29kZSBjbGFzcz1cIiR7c2Nyb2xsYmFyQ2xhc3Nlcy5zY3JvbGxiYXJHaG9zdEhhaXJsaW5lfSBobGpzICR7Y29kZUJsb2NrT3JDb2RlfVwiIHN0eWxlPVwicG9zaXRpb246IHJlbGF0aXZlO1wiPiR7bW9kdWxlcy5jb21tb24uaGxqcy5oaWdobGlnaHQoY29kZUJsb2NrT3JDb2RlLCBjb2RlQmxvY2tDb250ZW50KS52YWx1ZX08L2NvZGU+PC9wcmU+YCA6XHJcbiAgICAgICAgICAgIGA8cHJlPjxjb2RlIGNsYXNzPVwiJHtzY3JvbGxiYXJDbGFzc2VzLnNjcm9sbGJhckdob3N0SGFpcmxpbmV9IGhsanNcIiBzdHlsZT1cInBvc2l0aW9uOiByZWxhdGl2ZTtcIj4ke2NvZGVCbG9ja09yQ29kZX08L2NvZGU+PC9wcmU+YFxyXG4gICAgICAgIF07XHJcbiAgICAgIH1cclxuICAgICkpO1xyXG5cclxuICAgIGNvbnN0IGlubGluZU1hcCA9IE9iamVjdC5mcm9tRW50cmllcyhcclxuICAgICAgWy4uLihtc2cubWF0Y2hBbGwoaW5saW5lKSB8fCBbXSldLm1hcChcclxuICAgICAgICAoW18sIGlubGluZUNvbnRlbnRdLCBpKSA9PiB7XHJcbiAgICAgICAgICBtc2cgPSBtc2cucmVwbGFjZShfLCBge3tJTkxJTkVfJHtpfX19YCk7XHJcbiAgICAgICAgICByZXR1cm4gW2B7e0lOTElORV8ke2l9fX1gLCBgPGNvZGUgY2xhc3M9XCJpbmxpbmVcIj4ke2lubGluZUNvbnRlbnR9PC9jb2RlPmBdO1xyXG4gICAgICAgIH1cclxuICAgICAgKVxyXG4gICAgKTtcclxuXHJcbiAgICBtc2cgPSBtc2cucmVwbGFjZShib2xkLCBcIjxiPiQxPC9iPlwiKVxyXG4gICAgICAucmVwbGFjZShpdGFsaWMsIFwiPGk+JDE8L2k+XCIpXHJcbiAgICAgIC5yZXBsYWNlKHVuZGVybGluZSwgXCI8VT4kMTwvVT5cIilcclxuICAgICAgLnJlcGxhY2Uoc3RyaWtlLCBcIjxzPiQxPC9zPlwiKVxyXG4gICAgICAucmVwbGFjZSh1cmwsICc8YSBocmVmPVwiJDFcIj4kMTwvYT4nKTtcclxuXHJcbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhjb2RlQmxvY2tzTWFwKSkge1xyXG4gICAgICBtc2cgPSBtc2cucmVwbGFjZShrZXksIHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhpbmxpbmVNYXApKSB7XHJcbiAgICAgIG1zZyA9IG1zZy5yZXBsYWNlKGtleSwgdmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBtc2c7XHJcbiAgfSxcclxuICByZXNvbHZlKGh0bWxPckVsbSkge1xyXG4gICAgaWYgKGh0bWxPckVsbSBpbnN0YW5jZW9mIEVsZW1lbnQpIHJldHVybiBodG1sT3JFbG07XHJcbiAgICByZXR1cm4gdGhpcy5wYXJzZShodG1sT3JFbG0pO1xyXG4gIH1cclxufVxyXG5cclxue1xyXG4gIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKG11dGF0aW9ucykgPT4ge1xyXG4gICAgbXV0YXRpb25zLmZvckVhY2goKG11dGF0aW9uKSA9PiB7XHJcbiAgICAgIGV2ZW50cy5lbWl0KFwiRG9tTXV0YXRpb25cIiwgbXV0YXRpb24pO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbiAgb2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudCwge1xyXG4gICAgYXR0cmlidXRlczogdHJ1ZSxcclxuICAgIGNoaWxkTGlzdDogdHJ1ZSxcclxuICAgIHN1YnRyZWU6IHRydWVcclxuICB9KTtcclxufSIsICIvLyB3ZSB1c2UgdGhpcyBhcnJheSBtdWx0aXBsZSB0aW1lc1xyXG5leHBvcnQgY29uc3QgcGF0Y2hUeXBlcyA9IFtcImFcIiwgXCJiXCIsIFwiaVwiXTtcclxuZXhwb3J0IGNvbnN0IHBhdGNoZWRPYmplY3RzID0gbmV3IE1hcCgpO1xyXG4iLCAiLy8gY2FsbHMgcmVsZXZhbnQgcGF0Y2hlcyBhbmQgcmV0dXJucyB0aGUgZmluYWwgcmVzdWx0XHJcbmltcG9ydCB7IHBhdGNoZWRPYmplY3RzIH0gZnJvbSBcIi4vc2hhcmVkLmpzXCI7XHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChmdW5jTmFtZSwgZnVuY1BhcmVudCwgZnVuY0FyZ3MsIFxyXG4vLyB0aGUgdmFsdWUgb2YgYHRoaXNgIHRvIGFwcGx5XHJcbmN0eHQsIFxyXG4vLyBpZiB0cnVlLCB0aGUgZnVuY3Rpb24gaXMgYWN0dWFsbHkgY29uc3RydWN0b3JcclxuaXNDb25zdHJ1Y3QpIHtcclxuICAgIGNvbnN0IHBhdGNoID0gcGF0Y2hlZE9iamVjdHMuZ2V0KGZ1bmNQYXJlbnQpPy5bZnVuY05hbWVdO1xyXG4gICAgLy8gVGhpcyBpcyBpbiB0aGUgZXZlbnQgdGhhdCB0aGlzIGZ1bmN0aW9uIGlzIGJlaW5nIGNhbGxlZCBhZnRlciBhbGwgcGF0Y2hlcyBhcmUgcmVtb3ZlZC5cclxuICAgIGlmICghcGF0Y2gpXHJcbiAgICAgICAgcmV0dXJuIGlzQ29uc3RydWN0XHJcbiAgICAgICAgICAgID8gUmVmbGVjdC5jb25zdHJ1Y3QoZnVuY1BhcmVudFtmdW5jTmFtZV0sIGZ1bmNBcmdzLCBjdHh0KVxyXG4gICAgICAgICAgICA6IGZ1bmNQYXJlbnRbZnVuY05hbWVdLmFwcGx5KGN0eHQsIGZ1bmNBcmdzKTtcclxuICAgIC8vIEJlZm9yZSBwYXRjaGVzXHJcbiAgICBmb3IgKGNvbnN0IGhvb2sgb2YgcGF0Y2guYi52YWx1ZXMoKSkge1xyXG4gICAgICAgIGNvbnN0IG1heWJlZnVuY0FyZ3MgPSBob29rLmNhbGwoY3R4dCwgZnVuY0FyZ3MpO1xyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KG1heWJlZnVuY0FyZ3MpKVxyXG4gICAgICAgICAgICBmdW5jQXJncyA9IG1heWJlZnVuY0FyZ3M7XHJcbiAgICB9XHJcbiAgICAvLyBJbnN0ZWFkIHBhdGNoZXNcclxuICAgIGxldCBpbnN0ZWFkUGF0Y2hlZEZ1bmMgPSAoLi4uYXJncykgPT4gaXNDb25zdHJ1Y3RcclxuICAgICAgICA/IFJlZmxlY3QuY29uc3RydWN0KHBhdGNoLm8sIGFyZ3MsIGN0eHQpXHJcbiAgICAgICAgOiBwYXRjaC5vLmFwcGx5KGN0eHQsIGFyZ3MpO1xyXG4gICAgZm9yIChjb25zdCBjYWxsYmFjayBvZiBwYXRjaC5pLnZhbHVlcygpKSB7XHJcbiAgICAgICAgY29uc3Qgb2xkUGF0Y2hGdW5jID0gaW5zdGVhZFBhdGNoZWRGdW5jO1xyXG4gICAgICAgIGluc3RlYWRQYXRjaGVkRnVuYyA9ICguLi5hcmdzKSA9PiBjYWxsYmFjay5jYWxsKGN0eHQsIGFyZ3MsIG9sZFBhdGNoRnVuYyk7XHJcbiAgICB9XHJcbiAgICBsZXQgd29ya2luZ1JldFZhbCA9IGluc3RlYWRQYXRjaGVkRnVuYyguLi5mdW5jQXJncyk7XHJcbiAgICAvLyBBZnRlciBwYXRjaGVzXHJcbiAgICBmb3IgKGNvbnN0IGhvb2sgb2YgcGF0Y2guYS52YWx1ZXMoKSlcclxuICAgICAgICB3b3JraW5nUmV0VmFsID0gaG9vay5jYWxsKGN0eHQsIGZ1bmNBcmdzLCB3b3JraW5nUmV0VmFsKSA/PyB3b3JraW5nUmV0VmFsO1xyXG4gICAgcmV0dXJuIHdvcmtpbmdSZXRWYWw7XHJcbn1cclxuIiwgImltcG9ydCB7IHBhdGNoZWRPYmplY3RzLCBwYXRjaFR5cGVzIH0gZnJvbSBcIi4vc2hhcmVkLmpzXCI7XHJcbmV4cG9ydCBmdW5jdGlvbiB1blBhdGNoKGZ1bmNQYXJlbnQsIGZ1bmNOYW1lLCBob29rSWQsIHR5cGUpIHtcclxuICAgIGNvbnN0IHBhdGNoZWRPYmplY3QgPSBwYXRjaGVkT2JqZWN0cy5nZXQoZnVuY1BhcmVudCk7XHJcbiAgICBjb25zdCBwYXRjaCA9IHBhdGNoZWRPYmplY3Q/LltmdW5jTmFtZV07XHJcbiAgICBpZiAoIXBhdGNoPy5bdHlwZV0uaGFzKGhvb2tJZCkpXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgcGF0Y2hbdHlwZV0uZGVsZXRlKGhvb2tJZCk7XHJcbiAgICAvLyBJZiB0aGVyZSBhcmUgbm8gbW9yZSBob29rcyBmb3IgZXZlcnkgdHlwZSwgcmVtb3ZlIHRoZSBwYXRjaFxyXG4gICAgaWYgKHBhdGNoVHlwZXMuZXZlcnkoKHQpID0+IHBhdGNoW3RdLnNpemUgPT09IDApKSB7XHJcbiAgICAgICAgLy8gcmVmbGVjdCBkZWZpbmVwcm9wZXJ0eSBpcyBsaWtlIG9iamVjdCBkZWZpbmVwcm9wZXJ0eVxyXG4gICAgICAgIC8vIGJ1dCBpbnN0ZWFkIG9mIGVycm9yaW5nIGl0IHJldHVybnMgaWYgaXQgd29ya2VkIG9yIG5vdC5cclxuICAgICAgICAvLyB0aGlzIGlzIG1vcmUgZWFzaWx5IG1pbmlmaWFibGUsIGhlbmNlIGl0cyB1c2UuIC0tIHNpbmtcclxuICAgICAgICBjb25zdCBzdWNjZXNzID0gUmVmbGVjdC5kZWZpbmVQcm9wZXJ0eShmdW5jUGFyZW50LCBmdW5jTmFtZSwge1xyXG4gICAgICAgICAgICB2YWx1ZTogcGF0Y2gubyxcclxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoIXN1Y2Nlc3MpXHJcbiAgICAgICAgICAgIGZ1bmNQYXJlbnRbZnVuY05hbWVdID0gcGF0Y2gubztcclxuICAgICAgICBkZWxldGUgcGF0Y2hlZE9iamVjdFtmdW5jTmFtZV07XHJcbiAgICB9XHJcbiAgICBpZiAoT2JqZWN0LmtleXMocGF0Y2hlZE9iamVjdCkubGVuZ3RoID09IDApXHJcbiAgICAgICAgcGF0Y2hlZE9iamVjdHMuZGVsZXRlKGZ1bmNQYXJlbnQpO1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHVuUGF0Y2hBbGwoKSB7XHJcbiAgICBmb3IgKGNvbnN0IFtwYXJlbnRPYmplY3QsIHBhdGNoZWRPYmplY3RdIG9mIHBhdGNoZWRPYmplY3RzLmVudHJpZXMoKSlcclxuICAgICAgICBmb3IgKGNvbnN0IGZ1bmNOYW1lIGluIHBhdGNoZWRPYmplY3QpXHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgaG9va1R5cGUgb2YgcGF0Y2hUeXBlcylcclxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaG9va0lkIG9mIHBhdGNoZWRPYmplY3RbZnVuY05hbWVdPy5baG9va1R5cGVdLmtleXMoKSA/PyBbXSlcclxuICAgICAgICAgICAgICAgICAgICB1blBhdGNoKHBhcmVudE9iamVjdCwgZnVuY05hbWUsIGhvb2tJZCwgaG9va1R5cGUpO1xyXG59XHJcbiIsICIvLyBjdXJyaWVkIC0gZ2V0UGF0Y2hGdW5jKFwiYmVmb3JlXCIpKC4uLilcclxuLy8gYWxsb3dzIHVzIHRvIGFwcGx5IGFuIGFyZ3VtZW50IHdoaWxlIGxlYXZpbmcgdGhlIHJlc3Qgb3BlbiBtdWNoIGNsZWFuZXIuXHJcbi8vIGZ1bmN0aW9uYWwgcHJvZ3JhbW1pbmcgc3RyaWtlcyBhZ2FpbiEgLS0gc2lua1xyXG5pbXBvcnQgaG9vayBmcm9tIFwiLi9ob29rLmpzXCI7XHJcbmltcG9ydCB7IHBhdGNoZWRPYmplY3RzIH0gZnJvbSBcIi4vc2hhcmVkLmpzXCI7XHJcbmltcG9ydCB7IHVuUGF0Y2ggfSBmcm9tIFwiLi91bi1wYXRjaC5qc1wiO1xyXG4vLyBjcmVhdGVzIGEgaG9vayBpZiBuZWVkZWQsIGVsc2UganVzdCBhZGRzIG9uZSB0byB0aGUgcGF0Y2hlcyBhcnJheVxyXG5leHBvcnQgZGVmYXVsdCAocGF0Y2hUeXBlKSA9PiAoZnVuY05hbWUsIGZ1bmNQYXJlbnQsIGNhbGxiYWNrLCBvbmVUaW1lID0gZmFsc2UpID0+IHtcclxuICAgIGlmICh0eXBlb2YgZnVuY1BhcmVudFtmdW5jTmFtZV0gIT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7ZnVuY05hbWV9IGlzIG5vdCBhIGZ1bmN0aW9uIGluICR7ZnVuY1BhcmVudC5jb25zdHJ1Y3Rvci5uYW1lfWApO1xyXG4gICAgaWYgKCFwYXRjaGVkT2JqZWN0cy5oYXMoZnVuY1BhcmVudCkpXHJcbiAgICAgICAgcGF0Y2hlZE9iamVjdHMuc2V0KGZ1bmNQYXJlbnQsIHt9KTtcclxuICAgIGNvbnN0IHBhcmVudEluamVjdGlvbnMgPSBwYXRjaGVkT2JqZWN0cy5nZXQoZnVuY1BhcmVudCk7XHJcbiAgICBpZiAoIXBhcmVudEluamVjdGlvbnNbZnVuY05hbWVdKSB7XHJcbiAgICAgICAgY29uc3Qgb3JpZ0Z1bmMgPSBmdW5jUGFyZW50W2Z1bmNOYW1lXTtcclxuICAgICAgICAvLyBub3RlIHRvIGZ1dHVyZSBtZSBvcHRpbWlzaW5nIGZvciBzaXplOiBleHRyYWN0aW5nIG5ldyBNYXAoKSB0byBhIGZ1bmMgaW5jcmVhc2VzIHNpemUgLS1zaW5rXHJcbiAgICAgICAgcGFyZW50SW5qZWN0aW9uc1tmdW5jTmFtZV0gPSB7XHJcbiAgICAgICAgICAgIG86IG9yaWdGdW5jLFxyXG4gICAgICAgICAgICBiOiBuZXcgTWFwKCksXHJcbiAgICAgICAgICAgIGk6IG5ldyBNYXAoKSxcclxuICAgICAgICAgICAgYTogbmV3IE1hcCgpLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29uc3QgcnVuSG9vayA9IChjdHh0LCBhcmdzLCBjb25zdHJ1Y3QpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcmV0ID0gaG9vayhmdW5jTmFtZSwgZnVuY1BhcmVudCwgYXJncywgY3R4dCwgY29uc3RydWN0KTtcclxuICAgICAgICAgICAgaWYgKG9uZVRpbWUpXHJcbiAgICAgICAgICAgICAgICB1bnBhdGNoVGhpc1BhdGNoKCk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXQ7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCByZXBsYWNlUHJveHkgPSBuZXcgUHJveHkob3JpZ0Z1bmMsIHtcclxuICAgICAgICAgICAgYXBwbHk6IChfLCBjdHh0LCBhcmdzKSA9PiBydW5Ib29rKGN0eHQsIGFyZ3MsIGZhbHNlKSxcclxuICAgICAgICAgICAgY29uc3RydWN0OiAoXywgYXJncykgPT4gcnVuSG9vayhvcmlnRnVuYywgYXJncywgdHJ1ZSksXHJcbiAgICAgICAgICAgIGdldDogKHRhcmdldCwgcHJvcCwgcmVjZWl2ZXIpID0+IHByb3AgPT0gXCJ0b1N0cmluZ1wiXHJcbiAgICAgICAgICAgICAgICA/IG9yaWdGdW5jLnRvU3RyaW5nLmJpbmQob3JpZ0Z1bmMpXHJcbiAgICAgICAgICAgICAgICA6IFJlZmxlY3QuZ2V0KHRhcmdldCwgcHJvcCwgcmVjZWl2ZXIpLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIHRoaXMgd29ya3MgYXJvdW5kIGJyZWFraW5nIHNvbWUgYXN5bmMgZmluZCBpbXBsZW1lbnRhdGlvbiB3aGljaCBsaXN0ZW5zIGZvciBhc3NpZ25zIHZpYSBwcm94eVxyXG4gICAgICAgIC8vIHNlZSBjb21tZW50IGluIHVucGF0Y2gudHNcclxuICAgICAgICBjb25zdCBzdWNjZXNzID0gUmVmbGVjdC5kZWZpbmVQcm9wZXJ0eShmdW5jUGFyZW50LCBmdW5jTmFtZSwge1xyXG4gICAgICAgICAgICB2YWx1ZTogcmVwbGFjZVByb3h5LFxyXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICghc3VjY2VzcylcclxuICAgICAgICAgICAgZnVuY1BhcmVudFtmdW5jTmFtZV0gPSByZXBsYWNlUHJveHk7XHJcbiAgICAgICAgZnVuY1BhcmVudFtmdW5jTmFtZV0uX19vcmlnaW5hbF9fID0gcGFyZW50SW5qZWN0aW9uc1tmdW5jTmFtZV0ubztcclxuICAgIH1cclxuICAgIGNvbnN0IGhvb2tJZCA9IFN5bWJvbCgpO1xyXG4gICAgY29uc3QgdW5wYXRjaFRoaXNQYXRjaCA9ICgpID0+IHVuUGF0Y2goZnVuY1BhcmVudCwgZnVuY05hbWUsIGhvb2tJZCwgcGF0Y2hUeXBlKTtcclxuICAgIHBhcmVudEluamVjdGlvbnNbZnVuY05hbWVdW3BhdGNoVHlwZV0uc2V0KGhvb2tJZCwgY2FsbGJhY2spO1xyXG4gICAgcmV0dXJuIHVucGF0Y2hUaGlzUGF0Y2g7XHJcbn07XHJcbiIsICJpbXBvcnQgZ2V0UGF0Y2hGdW5jIGZyb20gXCIuL2dldC1wYXRjaC1mdW5jLmpzXCI7XHJcbmltcG9ydCB7IHVuUGF0Y2hBbGwgfSBmcm9tIFwiLi91bi1wYXRjaC5qc1wiO1xyXG5pbXBvcnQgeyBwYXRjaGVkT2JqZWN0cyBhcyBwYXRjaGVkIH0gZnJvbSBcIi4vc2hhcmVkLmpzXCI7XHJcbmNvbnN0IGJlZm9yZSA9IGdldFBhdGNoRnVuYyhcImJcIik7XHJcbmNvbnN0IGluc3RlYWQgPSBnZXRQYXRjaEZ1bmMoXCJpXCIpO1xyXG5jb25zdCBhZnRlciA9IGdldFBhdGNoRnVuYyhcImFcIik7XHJcbmV4cG9ydCB7IGluc3RlYWQsIGJlZm9yZSwgYWZ0ZXIsIHVuUGF0Y2hBbGwsIHBhdGNoZWQgfTtcclxuIiwgImltcG9ydCAqIGFzIHNwaXRSb2FzdCBmcm9tIFwiLi4vLi4vbGliL3NwaXRyb2FzdC9kaXN0L2VzbVwiO1xyXG5cclxuZnVuY3Rpb24gcHJvcFJlcGxhY2VyKGNzcywgcHJvcHMgPSB7fSkge1xyXG4gIGNzcyA9IGNzcy5yZXBsYWNlKC92YXJcXCgtLWFjb3JkLS0oW1xcU1xcc10rKVxcKS9nLCAobWF0Y2gsIGdyb3VwMSkgPT4ge1xyXG4gICAgbGV0IHNwbGl0dGVkID0gZ3JvdXAxLnNwbGl0KFwiLFwiKTtcclxuICAgIGxldCBrZXkgPSBzcGxpdHRlZC5zaGlmdCgpLnRyaW0oKTtcclxuICAgIGxldCBkZWZhdWx0VmFsdWUgPSBzcGxpdHRlZC5qb2luKFwiLFwiKS50cmltKCk7XHJcbiAgICByZXR1cm4gcHJvcHNba2V5XSA/PyAoZGVmYXVsdFZhbHVlIHx8IG1hdGNoKTtcclxuICB9KTtcclxuICByZXR1cm4gY3NzO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgX19jYWNoZV9fOiB7XHJcbiAgICBwYXRjaGVkOiBzcGl0Um9hc3QucGF0Y2hlZCxcclxuICB9LFxyXG4gIGJlZm9yZTogc3BpdFJvYXN0LmJlZm9yZSxcclxuICBhZnRlcjogc3BpdFJvYXN0LmFmdGVyLFxyXG4gIGluc3RlYWQ6IHNwaXRSb2FzdC5pbnN0ZWFkLFxyXG4gIHVuUGF0Y2hBbGw6IHNwaXRSb2FzdC51blBhdGNoQWxsLFxyXG4gIGluamVjdENTUyhjc3MsIGN1c3RvbVByb3BzID0ge30pIHtcclxuICAgIGNvbnN0IHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xyXG4gICAgc3R5bGUuY2xhc3NOYW1lID0gYGFjb3JkLS1pbmplY3RlZC1jc3NgO1xyXG4gICAgc3R5bGUudGV4dENvbnRlbnQgPSBwcm9wUmVwbGFjZXIoY3NzLCBjdXN0b21Qcm9wcyk7XHJcbiAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcclxuXHJcbiAgICByZXR1cm4gKC4uLmFyZ3MpID0+IHtcclxuICAgICAgaWYgKHR5cGVvZiBhcmdzWzBdID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgc3R5bGUudGV4dENvbnRlbnQgPSBwcm9wUmVwbGFjZXIoYXJnc1swXSwgYXJnc1sxXSk7XHJcbiAgICAgICAgY3NzID0gYXJnc1swXTtcclxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYXJnc1swXSA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgIHN0eWxlLnRleHRDb250ZW50ID0gcHJvcFJlcGxhY2VyKGNzcywgYXJnc1swXSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc3R5bGU/LnJlbW92ZSgpO1xyXG4gICAgICAgIGNzcyA9IG51bGw7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfSxcclxuICB1blBhdGNoQWxsQ1NTKCkge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5hY29yZC0taW5qZWN0ZWQtY3NzXCIpLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgIGVsZW1lbnQucmVtb3ZlKCk7XHJcbiAgICB9KVxyXG4gIH1cclxufSIsICJleHBvcnQgZGVmYXVsdCBgXG5Aa2V5ZnJhbWVzIGFjb3JkTG9hZGluZ0ZhZGV7MCV7b3BhY2l0eTouMX0xMDAle29wYWNpdHk6Ljl9fS5hY29yZC0tc3RhcnR1cC1sb2FkaW5ne2FuaW1hdGlvbjphY29yZExvYWRpbmdGYWRlIC41cyBhbHRlcm5hdGUgaW5maW5pdGUgbGluZWFyO3Bvc2l0aW9uOmFic29sdXRlO3RyYW5zaXRpb246YWxsIC41cyBsaW5lYXI7cmlnaHQ6OHB4O2JvdHRvbTo4cHg7d2lkdGg6MTZweDtoZWlnaHQ6MTZweDtiYWNrZ3JvdW5kLWltYWdlOnVybChcImh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9BY29yZFBsdWdpbi9hc3NldHMvbWFpbi9BY29yZC5zdmdcIik7ZmlsdGVyOmdyYXlzY2FsZSgxKSBicmlnaHRuZXNzKDEpO2JhY2tncm91bmQtcG9zaXRpb246Y2VudGVyO2JhY2tncm91bmQtcmVwZWF0Om5vLXJlcGVhdDtiYWNrZ3JvdW5kLXNpemU6Y29udGFpbjt6LWluZGV4Ojk5OTk5OX0uYWNvcmQtLXN0YXJ0dXAtbG9hZGluZy5oaWRkZW57b3BhY2l0eTowICFpbXBvcnRhbnR9YDtcbiIsICJpbXBvcnQgZG9tIGZyb20gXCIuLi8uLi9hcGkvZG9tL2luZGV4LmpzXCI7XHJcbmltcG9ydCBwYXRjaGVyIGZyb20gXCIuLi8uLi9hcGkvcGF0Y2hlci9pbmRleC5qc1wiO1xyXG5cclxuaW1wb3J0IGNzc1RleHQgZnJvbSBcIi4vc3R5bGUuc2Nzc1wiO1xyXG5sZXQgdW5JbmplY3Q7XHJcblxyXG5hc3luYyBmdW5jdGlvbiBzaG93KCkge1xyXG4gIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFjb3JkLS1zdGFydHVwLWxvYWRpbmdcIikpIHJldHVybjtcclxuICB3aGlsZSAodHJ1ZSkge1xyXG4gICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYXBwLW1vdW50XCIpKSBicmVhaztcclxuICAgIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIDEwMCkpO1xyXG4gIH1cclxuICBcclxuICB1bkluamVjdCA9IHBhdGNoZXIuaW5qZWN0Q1NTKGNzc1RleHQpO1xyXG4gIGNvbnN0IGVsZW1lbnQgPSBkb20ucGFyc2UoYFxyXG4gICAgPGRpdiBjbGFzcz1cImFjb3JkLS1zdGFydHVwLWxvYWRpbmdcIj48L2Rpdj5cclxuICBgKVxyXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYXBwLW1vdW50XCIpLmFwcGVuZENoaWxkKGVsZW1lbnQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBoaWRlKCkge1xyXG4gIGxldCBlbG0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFjb3JkLS1zdGFydHVwLWxvYWRpbmdcIik7XHJcbiAgaWYgKGVsbSkge1xyXG4gICAgZWxtLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgZWxtLnJlbW92ZSgpO1xyXG4gICAgICB1bkluamVjdD8uKCk7XHJcbiAgICAgIHVuSW5qZWN0ID0gbnVsbDtcclxuICAgIH0sIDUwMCk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgc2hvdyxcclxuICBoaWRlXHJcbn0iLCAiaW1wb3J0ICogYXMgbmVzdHMgZnJvbSBcIm5lc3RzXCI7XHJcbmltcG9ydCAqIGFzIGlkYktleXZhbCBmcm9tIFwiaWRiLWtleXZhbFwiO1xyXG5pbXBvcnQgeyBkZUN5Y2xlZCwgcmV2aXZlIH0gZnJvbSBcIi4uLy4uL2xpYi9qc29uLWRlY3ljbGVkXCI7XHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBhc3luYyBjcmVhdGVQZXJzaXN0TmVzdChzdWZmaXgpIHtcclxuICAgIGxldCBjYWNoZWQgPSBhd2FpdCBpZGJLZXl2YWwuZ2V0KGBBY29yZFN0b3JlOyR7c3VmZml4fWApO1xyXG4gICAgaWYgKHR5cGVvZiBjYWNoZWQgPT0gXCJzdHJpbmdcIikgY2FjaGVkID0gcmV2aXZlKGNhY2hlZCk7XHJcbiAgICBjb25zdCBuZXN0ID0gbmVzdHMubWFrZShjYWNoZWQgPz8ge30pO1xyXG5cclxuICAgIGNvbnN0IHNhdmUgPSAoKSA9PiB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgaWRiS2V5dmFsLnNldChgQWNvcmRTdG9yZTske3N1ZmZpeH1gLCBkZUN5Y2xlZCh7IC4uLm5lc3QuZ2hvc3QgfSkpO1xyXG4gICAgICB9IGNhdGNoIHtcclxuICAgICAgICBpZGJLZXl2YWwuc2V0KGBBY29yZFN0b3JlOyR7c3VmZml4fWAsIGRlQ3ljbGVkKHt9KSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBuZXN0Lm9uKG5lc3RzLkV2ZW50cy5TRVQsIHNhdmUpO1xyXG4gICAgbmVzdC5vbihuZXN0cy5FdmVudHMuVVBEQVRFLCBzYXZlKTtcclxuICAgIG5lc3Qub24obmVzdHMuRXZlbnRzLkRFTEVURSwgc2F2ZSk7XHJcblxyXG4gICAgcmV0dXJuIG5lc3Q7XHJcbiAgfVxyXG59IiwgImZ1bmN0aW9uIHByb21pc2lmeVJlcXVlc3QocmVxdWVzdCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmUgLSBmaWxlIHNpemUgaGFja3NcbiAgICAgICAgcmVxdWVzdC5vbmNvbXBsZXRlID0gcmVxdWVzdC5vbnN1Y2Nlc3MgPSAoKSA9PiByZXNvbHZlKHJlcXVlc3QucmVzdWx0KTtcbiAgICAgICAgLy8gQHRzLWlnbm9yZSAtIGZpbGUgc2l6ZSBoYWNrc1xuICAgICAgICByZXF1ZXN0Lm9uYWJvcnQgPSByZXF1ZXN0Lm9uZXJyb3IgPSAoKSA9PiByZWplY3QocmVxdWVzdC5lcnJvcik7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBjcmVhdGVTdG9yZShkYk5hbWUsIHN0b3JlTmFtZSkge1xuICAgIGNvbnN0IHJlcXVlc3QgPSBpbmRleGVkREIub3BlbihkYk5hbWUpO1xuICAgIHJlcXVlc3Qub251cGdyYWRlbmVlZGVkID0gKCkgPT4gcmVxdWVzdC5yZXN1bHQuY3JlYXRlT2JqZWN0U3RvcmUoc3RvcmVOYW1lKTtcbiAgICBjb25zdCBkYnAgPSBwcm9taXNpZnlSZXF1ZXN0KHJlcXVlc3QpO1xuICAgIHJldHVybiAodHhNb2RlLCBjYWxsYmFjaykgPT4gZGJwLnRoZW4oKGRiKSA9PiBjYWxsYmFjayhkYi50cmFuc2FjdGlvbihzdG9yZU5hbWUsIHR4TW9kZSkub2JqZWN0U3RvcmUoc3RvcmVOYW1lKSkpO1xufVxubGV0IGRlZmF1bHRHZXRTdG9yZUZ1bmM7XG5mdW5jdGlvbiBkZWZhdWx0R2V0U3RvcmUoKSB7XG4gICAgaWYgKCFkZWZhdWx0R2V0U3RvcmVGdW5jKSB7XG4gICAgICAgIGRlZmF1bHRHZXRTdG9yZUZ1bmMgPSBjcmVhdGVTdG9yZSgna2V5dmFsLXN0b3JlJywgJ2tleXZhbCcpO1xuICAgIH1cbiAgICByZXR1cm4gZGVmYXVsdEdldFN0b3JlRnVuYztcbn1cbi8qKlxuICogR2V0IGEgdmFsdWUgYnkgaXRzIGtleS5cbiAqXG4gKiBAcGFyYW0ga2V5XG4gKiBAcGFyYW0gY3VzdG9tU3RvcmUgTWV0aG9kIHRvIGdldCBhIGN1c3RvbSBzdG9yZS4gVXNlIHdpdGggY2F1dGlvbiAoc2VlIHRoZSBkb2NzKS5cbiAqL1xuZnVuY3Rpb24gZ2V0KGtleSwgY3VzdG9tU3RvcmUgPSBkZWZhdWx0R2V0U3RvcmUoKSkge1xuICAgIHJldHVybiBjdXN0b21TdG9yZSgncmVhZG9ubHknLCAoc3RvcmUpID0+IHByb21pc2lmeVJlcXVlc3Qoc3RvcmUuZ2V0KGtleSkpKTtcbn1cbi8qKlxuICogU2V0IGEgdmFsdWUgd2l0aCBhIGtleS5cbiAqXG4gKiBAcGFyYW0ga2V5XG4gKiBAcGFyYW0gdmFsdWVcbiAqIEBwYXJhbSBjdXN0b21TdG9yZSBNZXRob2QgdG8gZ2V0IGEgY3VzdG9tIHN0b3JlLiBVc2Ugd2l0aCBjYXV0aW9uIChzZWUgdGhlIGRvY3MpLlxuICovXG5mdW5jdGlvbiBzZXQoa2V5LCB2YWx1ZSwgY3VzdG9tU3RvcmUgPSBkZWZhdWx0R2V0U3RvcmUoKSkge1xuICAgIHJldHVybiBjdXN0b21TdG9yZSgncmVhZHdyaXRlJywgKHN0b3JlKSA9PiB7XG4gICAgICAgIHN0b3JlLnB1dCh2YWx1ZSwga2V5KTtcbiAgICAgICAgcmV0dXJuIHByb21pc2lmeVJlcXVlc3Qoc3RvcmUudHJhbnNhY3Rpb24pO1xuICAgIH0pO1xufVxuLyoqXG4gKiBTZXQgbXVsdGlwbGUgdmFsdWVzIGF0IG9uY2UuIFRoaXMgaXMgZmFzdGVyIHRoYW4gY2FsbGluZyBzZXQoKSBtdWx0aXBsZSB0aW1lcy5cbiAqIEl0J3MgYWxzbyBhdG9taWMgXHUyMDEzIGlmIG9uZSBvZiB0aGUgcGFpcnMgY2FuJ3QgYmUgYWRkZWQsIG5vbmUgd2lsbCBiZSBhZGRlZC5cbiAqXG4gKiBAcGFyYW0gZW50cmllcyBBcnJheSBvZiBlbnRyaWVzLCB3aGVyZSBlYWNoIGVudHJ5IGlzIGFuIGFycmF5IG9mIGBba2V5LCB2YWx1ZV1gLlxuICogQHBhcmFtIGN1c3RvbVN0b3JlIE1ldGhvZCB0byBnZXQgYSBjdXN0b20gc3RvcmUuIFVzZSB3aXRoIGNhdXRpb24gKHNlZSB0aGUgZG9jcykuXG4gKi9cbmZ1bmN0aW9uIHNldE1hbnkoZW50cmllcywgY3VzdG9tU3RvcmUgPSBkZWZhdWx0R2V0U3RvcmUoKSkge1xuICAgIHJldHVybiBjdXN0b21TdG9yZSgncmVhZHdyaXRlJywgKHN0b3JlKSA9PiB7XG4gICAgICAgIGVudHJpZXMuZm9yRWFjaCgoZW50cnkpID0+IHN0b3JlLnB1dChlbnRyeVsxXSwgZW50cnlbMF0pKTtcbiAgICAgICAgcmV0dXJuIHByb21pc2lmeVJlcXVlc3Qoc3RvcmUudHJhbnNhY3Rpb24pO1xuICAgIH0pO1xufVxuLyoqXG4gKiBHZXQgbXVsdGlwbGUgdmFsdWVzIGJ5IHRoZWlyIGtleXNcbiAqXG4gKiBAcGFyYW0ga2V5c1xuICogQHBhcmFtIGN1c3RvbVN0b3JlIE1ldGhvZCB0byBnZXQgYSBjdXN0b20gc3RvcmUuIFVzZSB3aXRoIGNhdXRpb24gKHNlZSB0aGUgZG9jcykuXG4gKi9cbmZ1bmN0aW9uIGdldE1hbnkoa2V5cywgY3VzdG9tU3RvcmUgPSBkZWZhdWx0R2V0U3RvcmUoKSkge1xuICAgIHJldHVybiBjdXN0b21TdG9yZSgncmVhZG9ubHknLCAoc3RvcmUpID0+IFByb21pc2UuYWxsKGtleXMubWFwKChrZXkpID0+IHByb21pc2lmeVJlcXVlc3Qoc3RvcmUuZ2V0KGtleSkpKSkpO1xufVxuLyoqXG4gKiBVcGRhdGUgYSB2YWx1ZS4gVGhpcyBsZXRzIHlvdSBzZWUgdGhlIG9sZCB2YWx1ZSBhbmQgdXBkYXRlIGl0IGFzIGFuIGF0b21pYyBvcGVyYXRpb24uXG4gKlxuICogQHBhcmFtIGtleVxuICogQHBhcmFtIHVwZGF0ZXIgQSBjYWxsYmFjayB0aGF0IHRha2VzIHRoZSBvbGQgdmFsdWUgYW5kIHJldHVybnMgYSBuZXcgdmFsdWUuXG4gKiBAcGFyYW0gY3VzdG9tU3RvcmUgTWV0aG9kIHRvIGdldCBhIGN1c3RvbSBzdG9yZS4gVXNlIHdpdGggY2F1dGlvbiAoc2VlIHRoZSBkb2NzKS5cbiAqL1xuZnVuY3Rpb24gdXBkYXRlKGtleSwgdXBkYXRlciwgY3VzdG9tU3RvcmUgPSBkZWZhdWx0R2V0U3RvcmUoKSkge1xuICAgIHJldHVybiBjdXN0b21TdG9yZSgncmVhZHdyaXRlJywgKHN0b3JlKSA9PiBcbiAgICAvLyBOZWVkIHRvIGNyZWF0ZSB0aGUgcHJvbWlzZSBtYW51YWxseS5cbiAgICAvLyBJZiBJIHRyeSB0byBjaGFpbiBwcm9taXNlcywgdGhlIHRyYW5zYWN0aW9uIGNsb3NlcyBpbiBicm93c2Vyc1xuICAgIC8vIHRoYXQgdXNlIGEgcHJvbWlzZSBwb2x5ZmlsbCAoSUUxMC8xMSkuXG4gICAgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBzdG9yZS5nZXQoa2V5KS5vbnN1Y2Nlc3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHN0b3JlLnB1dCh1cGRhdGVyKHRoaXMucmVzdWx0KSwga2V5KTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHByb21pc2lmeVJlcXVlc3Qoc3RvcmUudHJhbnNhY3Rpb24pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9KSk7XG59XG4vKipcbiAqIERlbGV0ZSBhIHBhcnRpY3VsYXIga2V5IGZyb20gdGhlIHN0b3JlLlxuICpcbiAqIEBwYXJhbSBrZXlcbiAqIEBwYXJhbSBjdXN0b21TdG9yZSBNZXRob2QgdG8gZ2V0IGEgY3VzdG9tIHN0b3JlLiBVc2Ugd2l0aCBjYXV0aW9uIChzZWUgdGhlIGRvY3MpLlxuICovXG5mdW5jdGlvbiBkZWwoa2V5LCBjdXN0b21TdG9yZSA9IGRlZmF1bHRHZXRTdG9yZSgpKSB7XG4gICAgcmV0dXJuIGN1c3RvbVN0b3JlKCdyZWFkd3JpdGUnLCAoc3RvcmUpID0+IHtcbiAgICAgICAgc3RvcmUuZGVsZXRlKGtleSk7XG4gICAgICAgIHJldHVybiBwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLnRyYW5zYWN0aW9uKTtcbiAgICB9KTtcbn1cbi8qKlxuICogRGVsZXRlIG11bHRpcGxlIGtleXMgYXQgb25jZS5cbiAqXG4gKiBAcGFyYW0ga2V5cyBMaXN0IG9mIGtleXMgdG8gZGVsZXRlLlxuICogQHBhcmFtIGN1c3RvbVN0b3JlIE1ldGhvZCB0byBnZXQgYSBjdXN0b20gc3RvcmUuIFVzZSB3aXRoIGNhdXRpb24gKHNlZSB0aGUgZG9jcykuXG4gKi9cbmZ1bmN0aW9uIGRlbE1hbnkoa2V5cywgY3VzdG9tU3RvcmUgPSBkZWZhdWx0R2V0U3RvcmUoKSkge1xuICAgIHJldHVybiBjdXN0b21TdG9yZSgncmVhZHdyaXRlJywgKHN0b3JlKSA9PiB7XG4gICAgICAgIGtleXMuZm9yRWFjaCgoa2V5KSA9PiBzdG9yZS5kZWxldGUoa2V5KSk7XG4gICAgICAgIHJldHVybiBwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLnRyYW5zYWN0aW9uKTtcbiAgICB9KTtcbn1cbi8qKlxuICogQ2xlYXIgYWxsIHZhbHVlcyBpbiB0aGUgc3RvcmUuXG4gKlxuICogQHBhcmFtIGN1c3RvbVN0b3JlIE1ldGhvZCB0byBnZXQgYSBjdXN0b20gc3RvcmUuIFVzZSB3aXRoIGNhdXRpb24gKHNlZSB0aGUgZG9jcykuXG4gKi9cbmZ1bmN0aW9uIGNsZWFyKGN1c3RvbVN0b3JlID0gZGVmYXVsdEdldFN0b3JlKCkpIHtcbiAgICByZXR1cm4gY3VzdG9tU3RvcmUoJ3JlYWR3cml0ZScsIChzdG9yZSkgPT4ge1xuICAgICAgICBzdG9yZS5jbGVhcigpO1xuICAgICAgICByZXR1cm4gcHJvbWlzaWZ5UmVxdWVzdChzdG9yZS50cmFuc2FjdGlvbik7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBlYWNoQ3Vyc29yKHN0b3JlLCBjYWxsYmFjaykge1xuICAgIHN0b3JlLm9wZW5DdXJzb3IoKS5vbnN1Y2Nlc3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghdGhpcy5yZXN1bHQpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNhbGxiYWNrKHRoaXMucmVzdWx0KTtcbiAgICAgICAgdGhpcy5yZXN1bHQuY29udGludWUoKTtcbiAgICB9O1xuICAgIHJldHVybiBwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLnRyYW5zYWN0aW9uKTtcbn1cbi8qKlxuICogR2V0IGFsbCBrZXlzIGluIHRoZSBzdG9yZS5cbiAqXG4gKiBAcGFyYW0gY3VzdG9tU3RvcmUgTWV0aG9kIHRvIGdldCBhIGN1c3RvbSBzdG9yZS4gVXNlIHdpdGggY2F1dGlvbiAoc2VlIHRoZSBkb2NzKS5cbiAqL1xuZnVuY3Rpb24ga2V5cyhjdXN0b21TdG9yZSA9IGRlZmF1bHRHZXRTdG9yZSgpKSB7XG4gICAgcmV0dXJuIGN1c3RvbVN0b3JlKCdyZWFkb25seScsIChzdG9yZSkgPT4ge1xuICAgICAgICAvLyBGYXN0IHBhdGggZm9yIG1vZGVybiBicm93c2Vyc1xuICAgICAgICBpZiAoc3RvcmUuZ2V0QWxsS2V5cykge1xuICAgICAgICAgICAgcmV0dXJuIHByb21pc2lmeVJlcXVlc3Qoc3RvcmUuZ2V0QWxsS2V5cygpKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpdGVtcyA9IFtdO1xuICAgICAgICByZXR1cm4gZWFjaEN1cnNvcihzdG9yZSwgKGN1cnNvcikgPT4gaXRlbXMucHVzaChjdXJzb3Iua2V5KSkudGhlbigoKSA9PiBpdGVtcyk7XG4gICAgfSk7XG59XG4vKipcbiAqIEdldCBhbGwgdmFsdWVzIGluIHRoZSBzdG9yZS5cbiAqXG4gKiBAcGFyYW0gY3VzdG9tU3RvcmUgTWV0aG9kIHRvIGdldCBhIGN1c3RvbSBzdG9yZS4gVXNlIHdpdGggY2F1dGlvbiAoc2VlIHRoZSBkb2NzKS5cbiAqL1xuZnVuY3Rpb24gdmFsdWVzKGN1c3RvbVN0b3JlID0gZGVmYXVsdEdldFN0b3JlKCkpIHtcbiAgICByZXR1cm4gY3VzdG9tU3RvcmUoJ3JlYWRvbmx5JywgKHN0b3JlKSA9PiB7XG4gICAgICAgIC8vIEZhc3QgcGF0aCBmb3IgbW9kZXJuIGJyb3dzZXJzXG4gICAgICAgIGlmIChzdG9yZS5nZXRBbGwpIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLmdldEFsbCgpKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpdGVtcyA9IFtdO1xuICAgICAgICByZXR1cm4gZWFjaEN1cnNvcihzdG9yZSwgKGN1cnNvcikgPT4gaXRlbXMucHVzaChjdXJzb3IudmFsdWUpKS50aGVuKCgpID0+IGl0ZW1zKTtcbiAgICB9KTtcbn1cbi8qKlxuICogR2V0IGFsbCBlbnRyaWVzIGluIHRoZSBzdG9yZS4gRWFjaCBlbnRyeSBpcyBhbiBhcnJheSBvZiBgW2tleSwgdmFsdWVdYC5cbiAqXG4gKiBAcGFyYW0gY3VzdG9tU3RvcmUgTWV0aG9kIHRvIGdldCBhIGN1c3RvbSBzdG9yZS4gVXNlIHdpdGggY2F1dGlvbiAoc2VlIHRoZSBkb2NzKS5cbiAqL1xuZnVuY3Rpb24gZW50cmllcyhjdXN0b21TdG9yZSA9IGRlZmF1bHRHZXRTdG9yZSgpKSB7XG4gICAgcmV0dXJuIGN1c3RvbVN0b3JlKCdyZWFkb25seScsIChzdG9yZSkgPT4ge1xuICAgICAgICAvLyBGYXN0IHBhdGggZm9yIG1vZGVybiBicm93c2Vyc1xuICAgICAgICAvLyAoYWx0aG91Z2gsIGhvcGVmdWxseSB3ZSdsbCBnZXQgYSBzaW1wbGVyIHBhdGggc29tZSBkYXkpXG4gICAgICAgIGlmIChzdG9yZS5nZXRBbGwgJiYgc3RvcmUuZ2V0QWxsS2V5cykge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgICAgICBwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLmdldEFsbEtleXMoKSksXG4gICAgICAgICAgICAgICAgcHJvbWlzaWZ5UmVxdWVzdChzdG9yZS5nZXRBbGwoKSksXG4gICAgICAgICAgICBdKS50aGVuKChba2V5cywgdmFsdWVzXSkgPT4ga2V5cy5tYXAoKGtleSwgaSkgPT4gW2tleSwgdmFsdWVzW2ldXSkpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGl0ZW1zID0gW107XG4gICAgICAgIHJldHVybiBjdXN0b21TdG9yZSgncmVhZG9ubHknLCAoc3RvcmUpID0+IGVhY2hDdXJzb3Ioc3RvcmUsIChjdXJzb3IpID0+IGl0ZW1zLnB1c2goW2N1cnNvci5rZXksIGN1cnNvci52YWx1ZV0pKS50aGVuKCgpID0+IGl0ZW1zKSk7XG4gICAgfSk7XG59XG5cbmV4cG9ydCB7IGNsZWFyLCBjcmVhdGVTdG9yZSwgZGVsLCBkZWxNYW55LCBlbnRyaWVzLCBnZXQsIGdldE1hbnksIGtleXMsIHByb21pc2lmeVJlcXVlc3QsIHNldCwgc2V0TWFueSwgdXBkYXRlLCB2YWx1ZXMgfTtcbiIsICJcInVzZSBzdHJpY3RcIjtcclxuXHJcbmZ1bmN0aW9uIGRlQ3ljbGVyKHZhbCwgY29uZmlnKSB7XHJcbiAgY29uZmlnID0gdHlwZW9mIGNvbmZpZyA9PT0gJ251bWJlcicgPyB7IGRlZXA6IGNvbmZpZyB9IDogKGNvbmZpZyB8fCB7fSk7XHJcbiAgY29uZmlnLmRlZXAgPSBjb25maWcuZGVlcCB8fCAxMDtcclxuICByZXR1cm4gZGVjeWNsZVdhbGtlcihbXSwgW10sIHZhbCwgY29uZmlnKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZGVDeWNsZWQodmFsLCBjb25maWcpIHtcclxuICBjb25maWcgPSB0eXBlb2YgY29uZmlnID09PSAnbnVtYmVyJyA/IHsgZGVlcDogY29uZmlnIH0gOiAoY29uZmlnIHx8IHt9KTtcclxuICB2YWwgPSBkZUN5Y2xlcih2YWwsIGNvbmZpZyk7XHJcbiAgdHJ5IHtcclxuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh2YWwsIHVuZGVmaW5lZCwgY29uZmlnLnNwYWNlcik7XHJcbiAgfSBjYXRjaCAoZSkge1xyXG4gICAgcmV0dXJuIGU7XHJcbiAgfVxyXG59XHJcblxyXG52YXIgcmV2aXZlckRhdGUgPSAvXlxcW0RhdGU6KChcXGR7NH0tXFxkezJ9LVxcZHsyfSlbQS1aXSsoXFxkezJ9OlxcZHsyfTpcXGR7Mn0pLihbMC05Ky06XSspWilcXF0kLztcclxudmFyIHJldml2ZXJSZWdFeHAgPSAvXlxcW1JlZ2V4cDpcXC8oLispXFwvXFxdJC87XHJcbnZhciByZXZpdmVyRXJyb3IgPSAvXlxcW0Vycm9yOihbXFxXXFx3XSspXFxdJC87XHJcbnZhciByZXZpdmVyRnVuY3Rpb24gPSAvXlxcW0Z1bmN0aW9uOiguKylcXF0kLztcclxuZnVuY3Rpb24gcmV2aXZlKHZhbCwgZnVuY3Rpb25zKSB7XHJcbiAgdHJ5IHtcclxuICAgIHJldHVybiBKU09OLnBhcnNlKHZhbCwgcmV2aXZlcik7XHJcbiAgfSBjYXRjaCAoZSkge1xyXG4gICAgcmV0dXJuIGU7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiByZXZpdmVyKGtleSwgdmFsKSB7XHJcbiAgICBpZiAocmV2aXZlckRhdGUudGVzdCh2YWwpKSB7XHJcbiAgICAgIHZhbCA9IHJldml2ZXJEYXRlLmV4ZWModmFsKTtcclxuICAgICAgdmFsID0gbmV3IERhdGUodmFsWzFdKTtcclxuICAgICAgcmV0dXJuIG5ldyBEYXRlKHZhbCk7XHJcbiAgICB9IGVsc2UgaWYgKHJldml2ZXJSZWdFeHAudGVzdCh2YWwpKSB7XHJcbiAgICAgIHZhbCA9IHJldml2ZXJSZWdFeHAuZXhlYyh2YWwpWzFdO1xyXG4gICAgICByZXR1cm4gbmV3IFJlZ0V4cCh2YWwpO1xyXG4gICAgfSBlbHNlIGlmIChyZXZpdmVyRXJyb3IudGVzdCh2YWwpKSB7XHJcbiAgICAgIHZhbCA9IHJldml2ZXJFcnJvci5leGVjKHZhbClbMV07XHJcbiAgICAgIHZhciBlcnJvciA9IG5ldyBFcnJvcih2YWwuc3BsaXQoJ1xcbicpWzBdKTtcclxuICAgICAgaWYgKGVycm9yLnN0YWNrKSB7XHJcbiAgICAgICAgZXJyb3Iuc3RhY2sgPSB2YWw7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGVycm9yO1xyXG4gICAgfSBlbHNlIGlmIChmdW5jdGlvbnMgJiYgcmV2aXZlckZ1bmN0aW9uLnRlc3QodmFsKSkge1xyXG4gICAgICB2YWwgPSByZXZpdmVyRnVuY3Rpb24uZXhlYyh2YWwpWzFdO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIHJldHVybiAobmV3IEZ1bmN0aW9uKFwicmV0dXJuIFwiICsgdmFsICsgXCI7XCIpKSgpO1xyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIHJldHVybiBlcnJvcjtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHZhbDtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRlY3ljbGVXYWxrZXIocGFyZW50cywgcGF0aCwgdmFsLCBjb25maWcpIHtcclxuICBpZiAoWyd1bmRlZmluZWQnLCAnbnVtYmVyJywgJ2Jvb2xlYW4nLCAnc3RyaW5nJ10uaW5kZXhPZih0eXBlb2YgdmFsKSA+PSAwIHx8IHZhbCA9PT0gbnVsbCkge1xyXG4gICAgcmV0dXJuIHZhbDtcclxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdvYmplY3QnICYmIHZhbC5jb25zdHJ1Y3RvciA9PT0gRGF0ZSkge1xyXG4gICAgcmV0dXJuIGNvbmZpZy5kYXRlcyAhPT0gZmFsc2UgPyAnW0RhdGU6JyArIHZhbC50b0lTT1N0cmluZygpICsgJ10nIDogdmFsO1xyXG4gICAgLy92YWwuZm9ybWF0KCd7WVlZWX0ve01NfS97RER9IHtoaH06e21tfTp7c3N9IFVUQzpcdTAwQjd7cGFyYW1zLnR6Pj0wP1wiK1wiK3BhcmFtcy50ejpwYXJhbXMudHp9XHUwMEI3Jyk7XHJcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnb2JqZWN0JyAmJiB2YWwuY29uc3RydWN0b3IgPT09IFJlZ0V4cCkge1xyXG4gICAgcmV0dXJuIGNvbmZpZy5yZWdleHBzICE9PSBmYWxzZSA/ICdbUmVnZXhwOicgKyB2YWwudG9TdHJpbmcoKSArICddJyA6IHZhbDtcclxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdvYmplY3QnICYmIHZhbC5jb25zdHJ1Y3RvciAmJiB0eXBlb2YgdmFsLmNvbnN0cnVjdG9yLm5hbWUgPT09ICdzdHJpbmcnICYmIHZhbC5jb25zdHJ1Y3Rvci5uYW1lLnNsaWNlKC01KSA9PT0gJ0Vycm9yJykge1xyXG4gICAgdmFyIHN0YWNrID0gKHZhbC5zdGFjayB8fCAnJykuc3BsaXQoJ1xcbicpLnNsaWNlKDEpO1xyXG4gICAgdmFyIG1lc3NhZ2UgPSAodmFsLm1lc3NhZ2UgfHwgdmFsLnRvU3RyaW5nKCkpO1xyXG4gICAgdmFyIGVycm9yID0gbWVzc2FnZSArIFwiXFxuXCIgKyBzdGFjaztcclxuICAgIHJldHVybiBjb25maWcuZXJyb3JzICE9PSBmYWxzZSA/ICdbRXJyb3I6JyArIGVycm9yICsgJ10nIDogdmFsO1xyXG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcclxuICAgIGlmIChwYXJlbnRzLmluZGV4T2YodmFsKSA+PSAwKSB7XHJcbiAgICAgIHZhciBwb2ludCA9IHBhdGguc2xpY2UoMCwgcGFyZW50cy5pbmRleE9mKHZhbCkpLmpvaW4oJy4nKTtcclxuICAgICAgcmV0dXJuICdbQ2lyY3VsYXInICsgKHBvaW50ID8gJzonICsgcG9pbnQgOiAnJykgKyAnXSc7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB2YXIgY29weSwgaSwgaywgbDtcclxuICAgICAgaWYgKHZhbC5jb25zdHJ1Y3RvciAmJiB0eXBlb2YgdmFsLmNvbnN0cnVjdG9yLm5hbWUgPT09ICdzdHJpbmcnICYmIHZhbC5jb25zdHJ1Y3Rvci5uYW1lLnNsaWNlKC01KSA9PT0gJ0FycmF5Jykge1xyXG4gICAgICAgIGlmIChwYXJlbnRzLmxlbmd0aCA+PSBjb25maWcuZGVlcCAmJiB2YWwuY29uc3RydWN0b3IubmFtZSAhPT0gJ0FycmF5Jykge1xyXG4gICAgICAgICAgcmV0dXJuICdbQXJyYXk6JyArIHZhbC5jb25zdHJ1Y3Rvci5uYW1lICsgJ10nO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb3B5ID0gW107XHJcbiAgICAgICAgICBmb3IgKGkgPSAwLCBsID0gdmFsLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgICAgICBjb3B5W2ldID0gZGVjeWNsZVdhbGtlcihwYXJlbnRzLmNvbmNhdChbdmFsXSksIHBhdGguY29uY2F0KGkpLCB2YWxbaV0sIGNvbmZpZyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gY29weTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKHBhcmVudHMubGVuZ3RoID49IGNvbmZpZy5kZWVwKSB7XHJcbiAgICAgICAgICByZXR1cm4gJ1tPYmplY3Q6JyArICh2YWwuY29uc3RydWN0b3IgJiYgdmFsLmNvbnN0cnVjdG9yLm5hbWUgPyB2YWwuY29uc3RydWN0b3IubmFtZSA6ICdPYmplY3QnKSArICddJztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29weSA9IHt9O1xyXG4gICAgICAgICAgZm9yIChpID0gMCwgayA9IE9iamVjdC5rZXlzKHZhbCksIGwgPSBrLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgICAgICBjb3B5W2tbaV1dID0gZGVjeWNsZVdhbGtlcihwYXJlbnRzLmNvbmNhdChbdmFsXSksIHBhdGguY29uY2F0KFtrW2ldXSksIHZhbFtrW2ldXSwgY29uZmlnKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBjb3B5O1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgcmV0dXJuIGNvbmZpZy5mdW5jdGlvbnMgPT09IHRydWUgPyAnW0Z1bmN0aW9uOicgKyB2YWwudG9TdHJpbmcoKSArICddJyA6IHVuZGVmaW5lZDtcclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIHZhbC50b1N0cmluZygpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IHtcclxuICBkZUN5Y2xlcixcclxuICBkZUN5Y2xlZCxcclxuICByZXZpdmVcclxufSIsICJpbXBvcnQgaTE4biBmcm9tIFwiLi4vaTE4blwiO1xyXG5pbXBvcnQgdXRpbHMgZnJvbSBcIi4uL3V0aWxzXCI7XHJcblxyXG4vKipcclxuICogQHBhcmFtIHt7IGkxOG46IHN0cmluZyB8IHsgW2xhbmc6IHN0cmluZ106IHsgW2s6IHN0cmluZ106IHN0cmluZyB9IH19fSBjZmcgXHJcbiAqIEByZXR1cm5zIFxyXG4gKi9cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGJ1aWxkRXh0ZW5zaW9uSTE4TihjZmcpIHtcclxuICBpZiAoIWNmZz8uaTE4bikgcmV0dXJuIG51bGw7XHJcbiAgbGV0IG91dCA9IHtcclxuICAgIF9fY2FjaGVfXzoge1xyXG4gICAgICBsb2NhbGVJZHM6IFtdLFxyXG4gICAgICBsb2NhbGl6YXRpb25zOiB7fVxyXG4gICAgfSxcclxuICAgIGZvcm1hdChrZXksIC4uLmFyZ3MpIHtcclxuICAgICAgcmV0dXJuIHV0aWxzLmZvcm1hdChvdXQuZ2V0KGtleSksIC4uLmFyZ3MpO1xyXG4gICAgfSxcclxuICAgIGdldChrZXkpIHtcclxuICAgICAgcmV0dXJuIG91dC5fX2NhY2hlX18ubG9jYWxpemF0aW9uc1tpMThuLmxvY2FsZV0/LltrZXldXHJcbiAgICAgICAgfHwgb3V0Ll9fY2FjaGVfXy5sb2NhbGl6YXRpb25zLmRlZmF1bHQ/LltrZXldXHJcbiAgICAgICAgfHwga2V5O1xyXG4gICAgfSxcclxuICAgIG1lc3NhZ2VzOiBuZXcgUHJveHkoe30sIHtcclxuICAgICAgZ2V0KF8sIHByb3ApIHtcclxuICAgICAgICByZXR1cm4gb3V0LmdldChwcm9wKTtcclxuICAgICAgfVxyXG4gICAgfSksXHJcbiAgfVxyXG4gIGFzeW5jIGZ1bmN0aW9uIGNoZWNrKCkge1xyXG4gICAgY29uc3QgbG9jYWxlID0gaTE4bi5sb2NhbGU7XHJcbiAgICBpZiAodHlwZW9mIGNmZy5pMThuID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgIGNvbnN0IEJBU0VfVVJMID0gY2ZnLmkxOG4uZW5kc1dpdGgoXCIvXCIpID8gY2ZnLmkxOG4uc2xpY2UoMCwgLTEpIDogY2ZnLmkxOG47XHJcbiAgICAgIGlmICghb3V0Ll9fY2FjaGVfXy5sb2NhbGVJZHMubGVuZ3RoKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIG91dC5fX2NhY2hlX18ubG9jYWxlSWRzID0gYXdhaXQgKGF3YWl0IGZldGNoKGAke0JBU0VfVVJMfS9sb2NhbGVzLmpzb25gLCBub1N0b3JlKSkuanNvbigpO1xyXG4gICAgICAgIH0gY2F0Y2ggeyB9XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIG91dC5fX2NhY2hlX18ubG9jYWxpemF0aW9ucy5kZWZhdWx0ID0gYXdhaXQgKGF3YWl0IGZldGNoKGAke0JBU0VfVVJMfS9kZWZhdWx0Lmpzb25gLCBub1N0b3JlKSkuanNvbigpO1xyXG4gICAgICAgIH0gY2F0Y2ggeyB9XHJcbiAgICAgIH1cclxuICAgICAgaWYgKFxyXG4gICAgICAgIG91dC5fX2NhY2hlX18ubG9jYWxlSWRzLmluY2x1ZGVzKGxvY2FsZSlcclxuICAgICAgICAmJiAhb3V0Ll9fY2FjaGVfXy5sb2NhbGl6YXRpb25zPy5bbG9jYWxlXVxyXG4gICAgICApIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgb3V0Ll9fY2FjaGVfXy5sb2NhbGl6YXRpb25zW2xvY2FsZV0gPSBhd2FpdCAoYXdhaXQgZmV0Y2goYCR7QkFTRV9VUkx9LyR7bG9jYWxlfS5qc29uYCwgbm9TdG9yZSkpLmpzb24oKTtcclxuICAgICAgICB9IGNhdGNoIHsgfTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgb3V0Ll9fY2FjaGVfXy5sb2NhbGVJZHMgPSBPYmplY3Qua2V5cyhjZmcuaTE4bik7XHJcbiAgICAgIG91dC5fX2NhY2hlX18ubG9jYWxpemF0aW9ucyA9IGNmZy5pMThuO1xyXG4gICAgfVxyXG4gIH1cclxuICBhd2FpdCBjaGVjaygpO1xyXG4gIHJldHVybiBvdXQ7XHJcbn0iLCAiaW1wb3J0IHsgQmFzaWNFdmVudEVtaXR0ZXIgfSBmcm9tIFwiLi4vLi4vbGliL0Jhc2ljRXZlbnRFbWl0dGVyLmpzXCI7XHJcbmltcG9ydCBkZXYgZnJvbSBcIi4uL2Rldi9pbmRleC5qc1wiO1xyXG5pbXBvcnQgaTE4biBmcm9tIFwiLi4vaTE4bi9pbmRleC5qc1wiO1xyXG5pbXBvcnQgbW9kdWxlcyBmcm9tIFwiLi4vbW9kdWxlcy9pbmRleC5qc1wiO1xyXG5pbXBvcnQgc3RvcmFnZSBmcm9tIFwiLi4vc3RvcmFnZS9pbmRleC5qc1wiO1xyXG5pbXBvcnQgeyBidWlsZEV4dGVuc2lvbkkxOE4gfSBmcm9tIFwiLi9pMThuLmpzXCI7XHJcbmltcG9ydCAqIGFzIG5lc3RzIGZyb20gXCJuZXN0c1wiO1xyXG5pbXBvcnQgZXZlbnRzIGZyb20gXCIuLi9ldmVudHMvaW5kZXguanNcIjtcclxuaW1wb3J0IHBhdGNoZXIgZnJvbSBcIi4uL3BhdGNoZXIvaW5kZXguanNcIjtcclxuaW1wb3J0IGZpbmRJblRyZWUgZnJvbSBcIi4uL3V0aWxzL3Jhdy9maW5kLWluLXRyZWUuanNcIjtcclxuaW1wb3J0IHdlYnNvY2tldCBmcm9tIFwiLi4vd2Vic29ja2V0L2luZGV4LmpzXCI7XHJcbmltcG9ydCB1aSBmcm9tIFwiLi4vdWkvaW5kZXguanNcIjtcclxuaW1wb3J0IHV0aWxzIGZyb20gXCIuLi91dGlscy9pbmRleC5qc1wiO1xyXG5pbXBvcnQgZG9tIGZyb20gXCIuLi9kb20vaW5kZXguanNcIjtcclxuaW1wb3J0IHNoYXJlZCBmcm9tIFwiLi4vc2hhcmVkL2luZGV4LmpzXCI7XHJcbmltcG9ydCB7IHdhaXRVbnRpbENvbm5lY3Rpb25PcGVuIH0gZnJvbSBcIi4uLy4uL290aGVyL3V0aWxzLmpzXCI7XHJcbmltcG9ydCBsb2dnZXIgZnJvbSBcIi4uL3V0aWxzL2xvZ2dlci5qc1wiO1xyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSB7eyBtb2RlPzogXCJkZXZlbG9wbWVudFwiIHwgXCJwcm9kdWN0aW9uXCIsIGFwaTogeyBwYXRjaGVyPzogc3RyaW5nIHwgYm9vbGVhbiwgc3RvcmFnZT86IHN0cmluZyB8IGJvb2xlYW4sIGkxOG4/OiBzdHJpbmcgfCBib29sZWFuLCBldmVudHM/OiBzdHJpbmcgfCBib29sZWFuLCB1dGlscz86IHN0cmluZyB8IGJvb2xlYW4sIGRvbT86IHN0cmluZyB8IGJvb2xlYW4sIHdlYnNvY2tldD86IHN0cmluZyB8IGJvb2xlYW4sIHVpPzogc3RyaW5nIHwgYm9vbGVhbiwgZGV2Pzogc3RyaW5nIHwgYm9vbGVhbiwgbW9kdWxlczogeyBub2RlOiB7IG5hbWU6IHN0cmluZywgcmVhc29uOiBzdHJpbmcgfVtdLCBjb21tb246IHsgbmFtZTogc3RyaW5nLCByZWFzb246IHN0cmluZyB9W10sIGN1c3RvbTogeyByZWFzb246IHN0cmluZywgbmFtZTogc3RyaW5nLCBsYXp5OiBib29sZWFuLCBmaW5kZXI6IHsgZmlsdGVyOiB7IGV4cG9ydDogYm9vbGVhbiwgaW46IFwicHJvcGVydGllc1wiIHwgXCJzdHJpbmdzXCIgfCBcInByb3RvdHlwZXNcIiwgYnk6IFtzdHJpbmdbXSwgc3RyaW5nW10/XSB9LCBwYXRoOiB7IGJlZm9yZTogc3RyaW5nIHwgc3RyaW5nW10sIGFmdGVyOiBzdHJpbmcgfCBzdHJpbmdbXSB9LCBtYXA6IHsgW2s6IHN0cmluZ106IHN0cmluZ1tdIH0gfSB9W10gfSB9LCBhYm91dDogeyBuYW1lOiBzdHJpbmcgfCB7IFtrOiBzdHJpbmddOiBzdHJpbmcgfSwgZGVzY3JpcHRpb246IHN0cmluZyB8IHsgW2s6IHN0cmluZ106IHN0cmluZyB9LCBzbHVnOiBzdHJpbmcgfSB9fSBtYW5pZmVzdCBcclxuICovXHJcbmFzeW5jIGZ1bmN0aW9uIGJ1aWxkUGx1Z2luQVBJKG1hbmlmZXN0LCBwZXJzaXN0S2V5KSB7XHJcbiAgY29uc3QgZGV2TW9kZSA9IGRldi5lbmFibGVkIHx8IG1hbmlmZXN0Py5tb2RlID09PSBcImRldmVsb3BtZW50XCI7XHJcbiAgY29uc3QgcGVyc2lzdCA9IGF3YWl0IHN0b3JhZ2UuY3JlYXRlUGVyc2lzdE5lc3QocGVyc2lzdEtleSk7XHJcbiAgY29uc3Qgb3V0ID0ge1xyXG4gICAgbW9kdWxlczoge1xyXG4gICAgICBfX2NhY2hlX186IHtcclxuICAgICAgICBjb21tb246IHt9LFxyXG4gICAgICAgIG5vZGU6IHt9LFxyXG4gICAgICAgIGN1c3RvbToge30sXHJcbiAgICAgICAgY3VzdG9tTGF6eToge31cclxuICAgICAgfSxcclxuICAgICAgcmVxdWlyZShuYW1lKSB7XHJcbiAgICAgICAgaWYgKCFkZXZNb2RlKSB7XHJcbiAgICAgICAgICBpZiAodHlwZW9mIG91dC5tb2R1bGVzLl9fY2FjaGVfXy5ub2RlW25hbWVdICE9PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gb3V0Lm1vZHVsZXMuX19jYWNoZV9fLm5vZGVbbmFtZV07XHJcbiAgICAgICAgICBpZiAobWFuaWZlc3Q/LmFwaT8ubW9kdWxlcz8ubm9kZT8uc29tZT8uKGkgPT4gaS5uYW1lID09PSBuYW1lKSkgcmV0dXJuIG91dC5tb2R1bGVzLl9fY2FjaGVfXy5ub2RlW25hbWVdID0gbW9kdWxlcy5yZXF1aXJlKG5hbWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZXR1cm4gbW9kdWxlcy5yZXF1aXJlKG5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgfSxcclxuICAgICAgY29tbW9uOiBuZXcgUHJveHkoe30sIHtcclxuICAgICAgICBnZXQoXywgcHJvcCkge1xyXG4gICAgICAgICAgaWYgKCFkZXZNb2RlKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb3V0Lm1vZHVsZXMuX19jYWNoZV9fLmNvbW1vbltwcm9wXSAhPT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIG91dC5tb2R1bGVzLl9fY2FjaGVfXy5jb21tb25bcHJvcF07XHJcbiAgICAgICAgICAgIGlmIChtYW5pZmVzdD8uYXBpPy5tb2R1bGVzPy5jb21tb24/LnNvbWU/LihpID0+IGkubmFtZSA9PT0gcHJvcCkpIHJldHVybiBvdXQubW9kdWxlcy5fX2NhY2hlX18uY29tbW9uW3Byb3BdID0gbW9kdWxlcy5jb21tb25bcHJvcF07XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbW9kdWxlcy5jb21tb25bcHJvcF07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9LFxyXG4gICAgICB9KSxcclxuICAgICAgY3VzdG9tOiBuZXcgUHJveHkoe30sIHtcclxuICAgICAgICBnZXQoXywgcHJvcCkge1xyXG4gICAgICAgICAgaWYgKHR5cGVvZiBvdXQubW9kdWxlcy5fX2NhY2hlX18uY3VzdG9tW3Byb3BdICE9PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gb3V0Lm1vZHVsZXMuX19jYWNoZV9fLmN1c3RvbVtwcm9wXTtcclxuICAgICAgICAgIGxldCBkYXRhID0gbWFuaWZlc3Q/LmFwaT8ubW9kdWxlcz8uY3VzdG9tPy5maW5kPy4oaSA9PiBpLm5hbWUgPT09IHByb3ApO1xyXG4gICAgICAgICAgaWYgKCFkYXRhPy5maW5kZXIpIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgaWYgKGRhdGEubGF6eSkge1xyXG4gICAgICAgICAgICBsZXQgcHJvbSA9IG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgICBsZXQgciA9IGF3YWl0IG1vZHVsZXMud2VicGFjay5sYXp5RmluZEJ5RmluZGVyKGRhdGEuZmluZGVyKTtcclxuICAgICAgICAgICAgICBvdXQubW9kdWxlcy5fX2NhY2hlX18uY3VzdG9tTGF6eVtwcm9wXSA9IHI7XHJcbiAgICAgICAgICAgICAgcmVzb2x2ZShyKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG91dC5tb2R1bGVzLl9fY2FjaGVfXy5jdXN0b21bcHJvcF0gPSB7XHJcbiAgICAgICAgICAgICAgZ2V0KCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb207XHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBnZXQgdmFsdWUoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb3V0Lm1vZHVsZXMuX19jYWNoZV9fLmN1c3RvbUxhenlbcHJvcF07XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IHZhbHVlID0gbW9kdWxlcy53ZWJwYWNrLmZpbmRCeUZpbmRlcihkYXRhLmZpbmRlcik7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZT8udmFsdWUgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgIG91dC5tb2R1bGVzLl9fY2FjaGVfXy5jdXN0b21bcHJvcF0gPSB2YWx1ZSA/IE9iamVjdC5hc3NpZ24odmFsdWUsIHsgdmFsdWUsIGdldCgpIHsgcmV0dXJuIHZhbHVlIH0gfSkgOiBudWxsO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBvdXQubW9kdWxlcy5fX2NhY2hlX18uY3VzdG9tW3Byb3BdID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGNhdGNoIHtcclxuICAgICAgICAgICAgICBvdXQubW9kdWxlcy5fX2NhY2hlX18uY3VzdG9tW3Byb3BdID0gdmFsdWUgPyB7IHZhbHVlLCBnZXQoKSB7IHJldHVybiB2YWx1ZSB9IH0gOiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gb3V0Lm1vZHVsZXMuX19jYWNoZV9fLmN1c3RvbVtwcm9wXTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pLFxyXG4gICAgICBnZXQgbmF0aXZlKCkge1xyXG4gICAgICAgIGlmIChtYW5pZmVzdD8ubW9kdWxlcz8ubmF0aXZlIHx8IGRldk1vZGUpIHJldHVybiBtb2R1bGVzLm5hdGl2ZTtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBleHRlbnNpb246IHtcclxuICAgICAgbWFuaWZlc3QsXHJcbiAgICAgIHBlcnNpc3QsXHJcbiAgICAgIGkxOG46IGF3YWl0IGJ1aWxkRXh0ZW5zaW9uSTE4TihtYW5pZmVzdCksXHJcbiAgICAgIGV2ZW50czogbmV3IEJhc2ljRXZlbnRFbWl0dGVyKCksXHJcbiAgICAgIHN1YnNjcmlwdGlvbnM6IFtdXHJcbiAgICB9LFxyXG4gICAgZ2V0IHNoYXJlZCgpIHtcclxuICAgICAgaWYgKG1hbmlmZXN0Py5hcGk/LnNoYXJlZCB8fCBkZXZNb2RlKSByZXR1cm4gc2hhcmVkO1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH0sXHJcbiAgICBnZXQgaTE4bigpIHtcclxuICAgICAgaWYgKG1hbmlmZXN0Py5hcGk/LmkxOG4gfHwgZGV2TW9kZSkgcmV0dXJuIGkxOG47XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfSxcclxuICAgIGdldCBwYXRjaGVyKCkge1xyXG4gICAgICBpZiAobWFuaWZlc3Q/LmFwaT8ucGF0Y2hlciB8fCBkZXZNb2RlKSByZXR1cm4gcGF0Y2hlcjtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9LFxyXG4gICAgZ2V0IGV2ZW50cygpIHtcclxuICAgICAgaWYgKG1hbmlmZXN0Py5hcGk/LmV2ZW50cyB8fCBkZXZNb2RlKSByZXR1cm4gZXZlbnRzO1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH0sXHJcbiAgICBnZXQgc3RvcmFnZSgpIHtcclxuICAgICAgaWYgKG1hbmlmZXN0Py5hcGk/LnN0b3JhZ2UgfHwgZGV2TW9kZSkgcmV0dXJuIHN0b3JhZ2U7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfSxcclxuICAgIGdldCB3ZWJzb2NrZXQoKSB7XHJcbiAgICAgIGlmIChtYW5pZmVzdD8uYXBpPy53ZWJzb2NrZXQgfHwgZGV2TW9kZSkgcmV0dXJuIHdlYnNvY2tldDtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9LFxyXG4gICAgZ2V0IHVpKCkge1xyXG4gICAgICBpZiAobWFuaWZlc3Q/LmFwaT8udWkgfHwgZGV2TW9kZSkgcmV0dXJuIHVpO1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH0sXHJcbiAgICBnZXQgdXRpbHMoKSB7XHJcbiAgICAgIGlmIChtYW5pZmVzdD8uYXBpPy51dGlscyB8fCBkZXZNb2RlKSByZXR1cm4gdXRpbHM7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfSxcclxuICAgIGdldCBkb20oKSB7XHJcbiAgICAgIGlmIChtYW5pZmVzdD8uYXBpPy5kb20gfHwgZGV2TW9kZSkgcmV0dXJuIGRvbTtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9LFxyXG4gICAgZ2V0IGRldigpIHtcclxuICAgICAgaWYgKG1hbmlmZXN0Py5hcGk/LmRldiB8fCBkZXZNb2RlKSByZXR1cm4gZGV2O1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICByZXR1cm4gb3V0O1xyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93Q29uZmlybWF0aW9uTW9kYWwoKSB7XHJcblxyXG59XHJcblxyXG5jb25zdCBvdXQgPSB7XHJcbiAgX19jYWNoZV9fOiB7XHJcbiAgICBpbml0aWFsaXplZDogZmFsc2UsXHJcbiAgICBsb2FkZWQ6IG5lc3RzLm1ha2Uoe30pLFxyXG4gICAgY29uZmlnOiB7fVxyXG4gIH0sXHJcbiAgc3RvcmFnZToge1xyXG4gICAgLyoqIEB0eXBlIHtuZXN0cy5OZXN0fSAqL1xyXG4gICAgaW5zdGFsbGVkOiB7fVxyXG4gIH0sXHJcbiAgYXN5bmMgaW5pdCgpIHtcclxuICAgIGlmIChvdXQuX19jYWNoZV9fLmluaXRpYWxpemVkKSByZXR1cm47XHJcbiAgICBvdXQuX19jYWNoZV9fLmluaXRpYWxpemVkID0gdHJ1ZTtcclxuICAgIG91dC5zdG9yYWdlLmluc3RhbGxlZCA9IGF3YWl0IHN0b3JhZ2UuY3JlYXRlUGVyc2lzdE5lc3QoXCJFeHRlbnNpb25zO0luc3RhbGxlZFwiKTtcclxuICB9LFxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgXHJcbiAgICovXHJcbiAgYXN5bmMgaW5zdGFsbCh1cmwsIGRlZmF1bHRDb25maWcgPSB7fSkge1xyXG4gICAgaWYgKCFvdXQuX19jYWNoZV9fLmluaXRpYWxpemVkKSBhd2FpdCBvdXQuaW5pdCgpO1xyXG4gICAgaWYgKHVybC5lbmRzV2l0aChcIi9cIikpIHVybCA9IHVybC5zbGljZSgwLCAtMSk7XHJcbiAgICBpZiAob3V0LnN0b3JhZ2UuaW5zdGFsbGVkLmdob3N0W3VybF0pIHRocm93IG5ldyBFcnJvcihgXCIke3VybH1cIiBleHRlbnNpb24gaXMgYWxyZWFkeSBpbnN0YWxsZWQuYCk7XHJcblxyXG4gICAgbGV0IG1ldGFSZXNwID0gYXdhaXQgZmV0Y2goYCR7dXJsfS9tYW5pZmVzdC5qc29uYCk7XHJcbiAgICBpZiAobWV0YVJlc3Auc3RhdHVzICE9PSAyMDApIHRocm93IG5ldyBFcnJvcihgXCIke3VybH1cIiBleHRlbnNpb24gbWFuaWZlc3QgaXMgbm90IHJlc3BvbmRlZCB3aXRoIDIwMCBzdGF0dXMgY29kZS5gKTtcclxuICAgIGxldCBtYW5pZmVzdCA9IEpTT04ucGFyc2UoYXdhaXQgbWV0YVJlc3AudGV4dCgpKTtcclxuXHJcbiAgICBsZXQgcmVhZG1lUmVzcCA9IGF3YWl0IGZldGNoKGAke3VybH0vcmVhZG1lLm1kYCk7XHJcbiAgICBsZXQgcmVhZG1lID0gcmVhZG1lUmVzcC5zdGF0dXMgPT09IDIwMCA/IGF3YWl0IHJlYWRtZVJlc3AudGV4dCgpIDogbnVsbDtcclxuXHJcbiAgICAvLyBUT0RPOiBTaG93IG1vZGFsIGZvciB1c2VyIHRvIGFjY2VwdCB0aGUgZXh0ZW5zaW9uICh0ZXJtcywgcHJpdmFjeSwgZXRjLilcclxuICAgIGF3YWl0IHNob3dDb25maXJtYXRpb25Nb2RhbCh7XHJcbiAgICAgIG1hbmlmZXN0LFxyXG4gICAgICByZWFkbWUsXHJcbiAgICAgIGNvbmZpZzoge1xyXG4gICAgICAgIGF1dG9VcGRhdGU6IHRydWUsXHJcbiAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICBvcmRlcjogMCxcclxuICAgICAgICAuLi5kZWZhdWx0Q29uZmlnXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGxldCBzb3VyY2VSZXNwID0gYXdhaXQgZmV0Y2goYCR7dXJsfS9zb3VyY2UuanNgKTtcclxuICAgIGlmIChzb3VyY2VSZXNwLnN0YXR1cyAhPT0gMjAwKSB0aHJvdyBuZXcgRXJyb3IoYFwiJHt1cmx9XCIgZXh0ZW5zaW9uIHNvdXJjZSBpcyBub3QgcmVzcG9uZGVkIHdpdGggMjAwIHN0YXR1cyBjb2RlLmApO1xyXG4gICAgbGV0IHNvdXJjZSA9IGF3YWl0IHNvdXJjZVJlc3AudGV4dCgpO1xyXG5cclxuICAgIG91dC5zdG9yYWdlLmluc3RhbGxlZC5zdG9yZVt1cmxdID0ge1xyXG4gICAgICBtYW5pZmVzdCxcclxuICAgICAgc291cmNlLFxyXG4gICAgICByZWFkbWUsXHJcbiAgICAgIGNvbmZpZzoge1xyXG4gICAgICAgIGF1dG9VcGRhdGU6IHRydWUsXHJcbiAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICBvcmRlcjogMCxcclxuICAgICAgICAuLi5kZWZhdWx0Q29uZmlnXHJcbiAgICAgIH0sXHJcbiAgICAgIGV4dHJhOiB7XHJcbiAgICAgICAgbGFzdFVwZGF0ZWRBdDogRGF0ZS5ub3coKVxyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGF3YWl0IG91dC5sb2FkKHVybCk7XHJcbiAgfSxcclxuICBhc3luYyB1cGRhdGUodXJsKSB7XHJcbiAgICBpZiAoIW91dC5fX2NhY2hlX18uaW5pdGlhbGl6ZWQpIGF3YWl0IG91dC5pbml0KCk7XHJcbiAgICBpZiAodXJsLmVuZHNXaXRoKFwiL1wiKSkgdXJsID0gdXJsLnNsaWNlKDAsIC0xKTtcclxuICAgIGlmICghb3V0LnN0b3JhZ2UuaW5zdGFsbGVkLmdob3N0W3VybF0pIHRocm93IG5ldyBFcnJvcihgXCIke3VybH1cIiBleHRlbnNpb24gaXMgbm90IGluc3RhbGxlZC5gKTtcclxuXHJcbiAgICBsZXQgZGF0YSA9IG91dC5zdG9yYWdlLmluc3RhbGxlZC5naG9zdFt1cmxdO1xyXG5cclxuICAgIGxldCBtZXRhUmVzcCA9IGF3YWl0IGZldGNoKGAke3VybH0vbWFuaWZlc3QuanNvbmApO1xyXG4gICAgaWYgKG1ldGFSZXNwLnN0YXR1cyAhPT0gMjAwKSB0aHJvdyBuZXcgRXJyb3IoYFwiJHt1cmx9XCIgZXh0ZW5zaW9uIG1hbmlmZXN0IGlzIG5vdCByZXNwb25kZWQgd2l0aCAyMDAgc3RhdHVzIGNvZGUuYCk7XHJcbiAgICBsZXQgbWFuaWZlc3QgPSBKU09OLnBhcnNlKGF3YWl0IG1ldGFSZXNwLnRleHQoKSk7XHJcblxyXG4gICAgaWYgKGRhdGEubWFuaWZlc3QuaGFzaCA9PT0gbWFuaWZlc3QuaGFzaCkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgIGxldCByZWFkbWVSZXNwID0gYXdhaXQgZmV0Y2goYCR7dXJsfS9yZWFkbWUubWRgKTtcclxuICAgIGxldCByZWFkbWUgPSByZWFkbWVSZXNwLnN0YXR1cyA9PT0gMjAwID8gYXdhaXQgcmVhZG1lUmVzcC50ZXh0KCkgOiBudWxsO1xyXG5cclxuICAgIGxldCBzb3VyY2VSZXNwID0gYXdhaXQgZmV0Y2goYCR7dXJsfS9zb3VyY2UuanNgKTtcclxuICAgIGlmIChzb3VyY2VSZXNwLnN0YXR1cyAhPT0gMjAwKSB0aHJvdyBuZXcgRXJyb3IoYFwiJHt1cmx9XCIgZXh0ZW5zaW9uIHNvdXJjZSBpcyBub3QgcmVzcG9uZGVkIHdpdGggMjAwIHN0YXR1cyBjb2RlLmApO1xyXG4gICAgbGV0IHNvdXJjZSA9IGF3YWl0IHNvdXJjZVJlc3AudGV4dCgpO1xyXG5cclxuICAgIGxldCBsb2FkZWRCZWZvcmUgPSBmYWxzZTtcclxuICAgIGlmIChvdXQuX19jYWNoZV9fLmxvYWRlZC5naG9zdFt1cmxdKSB7XHJcbiAgICAgIGxvYWRlZEJlZm9yZSA9IHRydWU7XHJcbiAgICAgIGF3YWl0IG91dC51bmxvYWQodXJsKTtcclxuICAgIH1cclxuXHJcbiAgICBvdXQuc3RvcmFnZS5pbnN0YWxsZWQuc3RvcmVbdXJsXSA9IHtcclxuICAgICAgbWFuaWZlc3QsXHJcbiAgICAgIHNvdXJjZSxcclxuICAgICAgcmVhZG1lLFxyXG4gICAgICBjb25maWc6IGRhdGEuY29uZmlnLFxyXG4gICAgICBleHRyYToge1xyXG4gICAgICAgIGxhc3RVcGRhdGVkQXQ6IERhdGUubm93KClcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAobG9hZGVkQmVmb3JlKSB7XHJcbiAgICAgIGF3YWl0IG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCAxKSk7XHJcbiAgICAgIGF3YWl0IG91dC5sb2FkKHVybCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfSxcclxuICBhc3luYyB1bmluc3RhbGwodXJsKSB7XHJcbiAgICBpZiAoIW91dC5fX2NhY2hlX18uaW5pdGlhbGl6ZWQpIGF3YWl0IG91dC5pbml0KCk7XHJcbiAgICBpZiAodXJsLmVuZHNXaXRoKFwiL1wiKSkgdXJsID0gdXJsLnNsaWNlKDAsIC0xKTtcclxuICAgIGlmICghb3V0LnN0b3JhZ2UuaW5zdGFsbGVkLmdob3N0W3VybF0pIHRocm93IG5ldyBFcnJvcihgXCIke3VybH1cIiBleHRlbnNpb24gaXMgbm90IGluc3RhbGxlZC5gKTtcclxuXHJcbiAgICBkZWxldGUgb3V0LnN0b3JhZ2UuaW5zdGFsbGVkLnN0b3JlW3VybF07XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgYXdhaXQgb3V0LnVubG9hZCh1cmwpO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGxvZ2dlci5lcnJvcihlcnIpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgYXN5bmMgbG9hZCh1cmwpIHtcclxuICAgIGlmICghb3V0Ll9fY2FjaGVfXy5pbml0aWFsaXplZCkgYXdhaXQgb3V0LmluaXQoKTtcclxuICAgIGlmICh1cmwuZW5kc1dpdGgoXCIvXCIpKSB1cmwgPSB1cmwuc2xpY2UoMCwgLTEpO1xyXG4gICAgaWYgKCFvdXQuc3RvcmFnZS5pbnN0YWxsZWQuZ2hvc3RbdXJsXSkgdGhyb3cgbmV3IEVycm9yKGBcIiR7dXJsfVwiIGV4dGVuc2lvbiBpcyBub3QgaW5zdGFsbGVkLmApO1xyXG4gICAgbGV0IGRhdGEgPSBvdXQuc3RvcmFnZS5pbnN0YWxsZWQuZ2hvc3RbdXJsXTtcclxuXHJcbiAgICBpZiAob3V0Ll9fY2FjaGVfXy5sb2FkZWQuZ2hvc3RbdXJsXSkgdGhyb3cgbmV3IEVycm9yKGBcIiR7dXJsfVwiIGV4dGVuc2lvbiBpcyBhbHJlYWR5IGxvYWRlZC5gKTtcclxuXHJcbiAgICBhd2FpdCBvdXQubG9hZGVyLmxvYWQodXJsLCBkYXRhKTtcclxuICB9LFxyXG4gIGFzeW5jIHVubG9hZCh1cmwpIHtcclxuICAgIGlmICghb3V0Ll9fY2FjaGVfXy5pbml0aWFsaXplZCkgYXdhaXQgb3V0LmluaXQoKTtcclxuICAgIGlmICh1cmwuZW5kc1dpdGgoXCIvXCIpKSB1cmwgPSB1cmwuc2xpY2UoMCwgLTEpO1xyXG4gICAgaWYgKCFvdXQuX19jYWNoZV9fLmxvYWRlZC5naG9zdFt1cmxdKSB0aHJvdyBuZXcgRXJyb3IoYFwiJHt1cmx9XCIgZXh0ZW5zaW9uIGlzIG5vdCBsb2FkZWQuYCk7XHJcblxyXG4gICAgYXdhaXQgb3V0LmxvYWRlci51bmxvYWQodXJsKTtcclxuICB9LFxyXG4gIGV2YWx1YXRlKHNvdXJjZSwgYXBpKSB7XHJcbiAgICBjb25zdCAkYWNvcmQgPSBhcGk7XHJcbiAgICByZXR1cm4gZXZhbChzb3VyY2UpO1xyXG4gIH0sXHJcbiAgYXN5bmMgbG9hZEFsbCgpIHtcclxuICAgIGlmICghb3V0Ll9fY2FjaGVfXy5pbml0aWFsaXplZCkgYXdhaXQgb3V0LmluaXQoKTtcclxuICAgIHJldHVybiBQcm9taXNlLmFsbChPYmplY3QuZW50cmllcyhvdXQuc3RvcmFnZS5pbnN0YWxsZWQuZ2hvc3QpLnNvcnQoKFssIGFdLCBbLCBiXSkgPT4gYi5jb25maWcub3JkZXIgLSBhLmNvbmZpZy5vcmRlcikubWFwKGFzeW5jIChbdXJsLCBkXSkgPT4ge1xyXG4gICAgICBpZiAoZC5jb25maWcuYXV0b1VwZGF0ZSkgYXdhaXQgb3V0LnVwZGF0ZSh1cmwpO1xyXG5cclxuICAgICAgdHJ5IHtcclxuICAgICAgICBpZiAoZC5jb25maWcuZW5hYmxlZCkgYXdhaXQgb3V0LmxvYWQodXJsKTtcclxuICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgIGxvZ2dlci5lcnJvcihcIlVuYWJsZSB0byBsb2FkIGV4dGVuc2lvblwiLCB1cmwsIGUpO1xyXG4gICAgICB9XHJcbiAgICB9KSk7XHJcbiAgfSxcclxuICBhc3luYyB1bmxvYWRBbGwoKSB7XHJcbiAgICBpZiAoIW91dC5fX2NhY2hlX18uaW5pdGlhbGl6ZWQpIGF3YWl0IG91dC5pbml0KCk7XHJcbiAgICByZXR1cm4gUHJvbWlzZS5hbGwoT2JqZWN0LmtleXMob3V0Ll9fY2FjaGVfXy5sb2FkZWQuZ2hvc3QpLm1hcCh1cmwgPT4gb3V0LnVubG9hZCh1cmwpKSk7XHJcbiAgfSxcclxuICBnZXQodXJsKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBsb2FkZWQ6IG91dC5fX2NhY2hlX18ubG9hZGVkLmdob3N0W3VybF0sXHJcbiAgICAgIGluc3RhbGxlZDogb3V0LnN0b3JhZ2UuaW5zdGFsbGVkLmdob3N0W3VybF1cclxuICAgIH07XHJcbiAgfSxcclxuICBsb2FkZXI6IHtcclxuICAgIGFzeW5jIGxvYWQoaWQsIGRhdGEpIHtcclxuICAgICAgaWYgKGRhdGEubWFuaWZlc3QudHlwZSA9PT0gJ3BsdWdpbicpIHtcclxuICAgICAgICBsZXQgYXBpID0gYXdhaXQgYnVpbGRQbHVnaW5BUEkoZGF0YS5tYW5pZmVzdCwgYEV4dGVuc2lvbjtQZXJzaXN0OyR7aWR9YCk7XHJcbiAgICAgICAgaWYgKGFwaS5leHRlbnNpb24ucGVyc2lzdC5naG9zdC5zZXR0aW5ncyA9PT0gdW5kZWZpbmVkKSBhcGkuZXh0ZW5zaW9uLnBlcnNpc3Quc3RvcmUuc2V0dGluZ3MgPSB7fTtcclxuICAgICAgICBhd2FpdCB1aS52dWUucmVhZHkud2hlbigpO1xyXG4gICAgICAgIG91dC5fX2NhY2hlX18uY29uZmlnW2lkXSA9IFZ1ZS5yZWFjdGl2ZShKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGRhdGEubWFuaWZlc3QuY29uZmlnKSkpO1xyXG4gICAgICAgIGZpbmRJblRyZWUob3V0Ll9fY2FjaGVfXy5jb25maWdbaWRdLCAoaSkgPT4gaS5pZCwgeyBhbGw6IHRydWUgfSkuZm9yRWFjaChcclxuICAgICAgICAgIChpKSA9PiB7XHJcbiAgICAgICAgICAgIGFwaS5leHRlbnNpb24ucGVyc2lzdC5zdG9yZS5zZXR0aW5nc1tpLmlkXSA9IGFwaS5leHRlbnNpb24ucGVyc2lzdC5naG9zdD8uc2V0dGluZ3M/LltpLmlkXSA/PyBpLmRlZmF1bHQ7XHJcbiAgICAgICAgICAgIGkudmFsdWUgPSBhcGkuZXh0ZW5zaW9uLnBlcnNpc3QuZ2hvc3Q/LnNldHRpbmdzPy5baS5pZF07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgbGV0IGV2YWx1YXRlZCA9IG91dC5ldmFsdWF0ZShkYXRhLnNvdXJjZSwgYXBpKTtcclxuICAgICAgICBhd2FpdCBldmFsdWF0ZWQ/LmxvYWQ/LigpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBvblBlcnNpc3RVcGRhdGUoZXZlbnROYW1lLCB7IHBhdGgsIHZhbHVlIH0gPSB7fSkge1xyXG4gICAgICAgICAgaWYgKHBhdGhbMF0gPT09IFwic2V0dGluZ3NcIikge1xyXG4gICAgICAgICAgICBsZXQgaXRlbSA9IGZpbmRJblRyZWUob3V0Ll9fY2FjaGVfXy5jb25maWdbaWRdLCAoaSkgPT4gaS5pZCA9PT0gcGF0aFsxXSk7XHJcbiAgICAgICAgICAgIGxldCB2YWwgPSBldmVudE5hbWUgPT09IFwiREVMRVRFXCIgPyBudWxsIDogdmFsdWU7XHJcbiAgICAgICAgICAgIGlmIChpdGVtLmlucHV0VHlwZSA9PT0gXCJudW1iZXJcIikgdmFsID0gTnVtYmVyKHZhbCk7XHJcbiAgICAgICAgICAgIGlmIChpdGVtKSBpdGVtLnZhbHVlID0gdmFsO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBhcGkuZXh0ZW5zaW9uLnBlcnNpc3Qub24oXCJVUERBVEVcIiwgb25QZXJzaXN0VXBkYXRlKTtcclxuICAgICAgICBhcGkuZXh0ZW5zaW9uLnBlcnNpc3Qub24oXCJERUxFVEVcIiwgb25QZXJzaXN0VXBkYXRlKTtcclxuICAgICAgICBhcGkuZXh0ZW5zaW9uLnBlcnNpc3Qub24oXCJTRVRcIiwgb25QZXJzaXN0VXBkYXRlKTtcclxuICAgICAgICBjb25zdCBvZmZDb25maWdMaXN0ZW5lciA9XHJcbiAgICAgICAgICBldmVudHMub24oXCJFeHRlbnNpb25Db25maWdJbnRlcmFjdGlvblwiLCAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5leHRlbnNpb24gIT09IGlkKSByZXR1cm47XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHNhdmUoKSB7XHJcbiAgICAgICAgICAgICAgaWYgKCFkYXRhLml0ZW0uaWQpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICBsZXQgdmFsID0gZGF0YS5pdGVtLnZhbHVlID8/IGRhdGEuZGF0YS52YWx1ZTtcclxuICAgICAgICAgICAgICBpZiAoZGF0YS5pdGVtLmlucHV0VHlwZSA9PT0gXCJudW1iZXJcIikgdmFsID0gTnVtYmVyKHZhbCk7XHJcbiAgICAgICAgICAgICAgYXBpLmV4dGVuc2lvbi5wZXJzaXN0LnN0b3JlLnNldHRpbmdzW2RhdGEuaXRlbS5pZF0gPSB2YWw7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2F2ZSgpO1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5pdGVtLmlkKSB7XHJcbiAgICAgICAgICAgICAgYXBpLmV4dGVuc2lvbi5wZXJzaXN0LnN0b3JlLnNldHRpbmdzW2RhdGEuaXRlbS5pZF0gPSBkYXRhLml0ZW0udmFsdWUgPz8gZGF0YS5kYXRhLnZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGV2YWx1YXRlZD8uY29uZmlnPy4oe1xyXG4gICAgICAgICAgICAgIGl0ZW06IGRhdGEuaXRlbSxcclxuICAgICAgICAgICAgICBkYXRhOiBkYXRhLmRhdGEsXHJcbiAgICAgICAgICAgICAgZ2V0SXRlbShpdGVtSWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmaW5kSW5UcmVlKG91dC5fX2NhY2hlX18uY29uZmlnW2lkXSwgKGkpID0+IGkuaWQgPT09IGl0ZW1JZCk7XHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBnZXRJdGVtcygpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmaW5kSW5UcmVlKG91dC5fX2NhY2hlX18uY29uZmlnW2lkXSwgKGkpID0+IGkuaWQsIHsgYWxsOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgc2F2ZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIGZ1bmN0aW9uIHVubG9hZCgpIHtcclxuICAgICAgICAgIG9mZkNvbmZpZ0xpc3RlbmVyKCk7XHJcbiAgICAgICAgICBhcGkuZXh0ZW5zaW9uLnN1YnNjcmlwdGlvbnMuZm9yRWFjaChpID0+IHsgaWYgKHR5cGVvZiBpID09PSBcImZ1bmN0aW9uXCIpIGkoKTsgfSk7XHJcbiAgICAgICAgICBhcGkuZXh0ZW5zaW9uLmV2ZW50cy5lbWl0KFwidW5sb2FkXCIpO1xyXG4gICAgICAgICAgZXZhbHVhdGVkPy51bmxvYWQ/LigpO1xyXG4gICAgICAgICAgYXBpLmV4dGVuc2lvbi5wZXJzaXN0Lm9mZihcIlVQREFURVwiLCBvblBlcnNpc3RVcGRhdGUpO1xyXG4gICAgICAgICAgYXBpLmV4dGVuc2lvbi5wZXJzaXN0Lm9mZihcIkRFTEVURVwiLCBvblBlcnNpc3RVcGRhdGUpO1xyXG4gICAgICAgICAgYXBpLmV4dGVuc2lvbi5wZXJzaXN0Lm9mZihcIlNFVFwiLCBvblBlcnNpc3RVcGRhdGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBvdXQuX19jYWNoZV9fLmxvYWRlZC5zdG9yZVtpZF0gPSB7IGV2YWx1YXRlZCwgYXBpLCB1bmxvYWQgfTtcclxuICAgICAgICBldmVudHMuZW1pdChcIkV4dGVuc2lvbkxvYWRlZFwiLCB7IGlkIH0pO1xyXG4gICAgICAgIHJldHVybiB7IGV2YWx1YXRlZCwgYXBpLCB1bmxvYWQgfTtcclxuICAgICAgfSBlbHNlIGlmIChkYXRhLm1hbmlmZXN0LnR5cGUgPT09ICd0aGVtZScpIHtcclxuICAgICAgICBsZXQgZXZhbHVhdGVkID0gb3V0LmV2YWx1YXRlKGRhdGEuc291cmNlLCBudWxsKTtcclxuICAgICAgICBjb25zdCBwZXJzaXN0ID0gYXdhaXQgc3RvcmFnZS5jcmVhdGVQZXJzaXN0TmVzdChgRXh0ZW5zaW9uO1BlcnNpc3Q7JHtpZH1gKTtcclxuICAgICAgICBpZiAocGVyc2lzdC5naG9zdC5zZXR0aW5ncyA9PT0gdW5kZWZpbmVkKSBwZXJzaXN0LnN0b3JlLnNldHRpbmdzID0ge307XHJcbiAgICAgICAgb3V0Ll9fY2FjaGVfXy5jb25maWdbaWRdID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShkYXRhLm1hbmlmZXN0LmNvbmZpZykpO1xyXG4gICAgICAgIGZpbmRJblRyZWUob3V0Ll9fY2FjaGVfXy5jb25maWdbaWRdLCAoaSkgPT4gaS5pZCwgeyBhbGw6IHRydWUgfSkuZm9yRWFjaChcclxuICAgICAgICAgIChpKSA9PiB7XHJcbiAgICAgICAgICAgIHBlcnNpc3Quc3RvcmUuc2V0dGluZ3NbaS5pZF0gPSBwZXJzaXN0Lmdob3N0Py5zZXR0aW5ncz8uW2kuaWRdID8/IGkuZGVmYXVsdDtcclxuICAgICAgICAgICAgaS52YWx1ZSA9IHBlcnNpc3QuZ2hvc3Q/LnNldHRpbmdzPy5baS5pZF07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgICAgICBsZXQgY3NzVGV4dCA9IGV2YWx1YXRlZCgpO1xyXG4gICAgICAgIGxldCBpbmplY3RlZFJlcyA9IHBhdGNoZXIuaW5qZWN0Q1NTKGNzc1RleHQsIHBlcnNpc3QuZ2hvc3Quc2V0dGluZ3MpO1xyXG5cclxuICAgICAgICBjb25zdCBvZmZDb25maWdMaXN0ZW5lciA9XHJcbiAgICAgICAgICBldmVudHMub24oXCJFeHRlbnNpb25Db25maWdJbnRlcmFjdGlvblwiLCAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5leHRlbnNpb24gIT09IGlkKSByZXR1cm47XHJcbiAgICAgICAgICAgIGlmICghZGF0YS5pdGVtLmlkKSByZXR1cm47XHJcbiAgICAgICAgICAgIHBlcnNpc3Quc3RvcmUuc2V0dGluZ3NbZGF0YS5pdGVtLmlkXSA9IGRhdGEuZGF0YS52YWx1ZTtcclxuICAgICAgICAgICAgaW5qZWN0ZWRSZXMocGVyc2lzdC5naG9zdC5zZXR0aW5ncyk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICBmdW5jdGlvbiB1bmxvYWQoKSB7XHJcbiAgICAgICAgICBvZmZDb25maWdMaXN0ZW5lcigpO1xyXG4gICAgICAgICAgaW5qZWN0ZWRSZXMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgb3V0Ll9fY2FjaGVfXy5sb2FkZWQuc3RvcmVbaWRdID0geyBldmFsdWF0ZWQsIHVubG9hZCB9O1xyXG4gICAgICAgIGV2ZW50cy5lbWl0KFwiRXh0ZW5zaW9uTG9hZGVkXCIsIHsgaWQgfSk7XHJcbiAgICAgICAgcmV0dXJuIHsgZXZhbHVhdGVkLCB1bmxvYWQgfTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIHVubG9hZChpZCkge1xyXG4gICAgICBvdXQuX19jYWNoZV9fLmxvYWRlZC5naG9zdD8uW2lkXT8udW5sb2FkPy4oKTtcclxuICAgICAgZGVsZXRlIG91dC5fX2NhY2hlX18ubG9hZGVkLnN0b3JlW2lkXTtcclxuICAgICAgZGVsZXRlIG91dC5fX2NhY2hlX18uY29uZmlnW2lkXTtcclxuICAgICAgZXZlbnRzLmVtaXQoXCJFeHRlbnNpb25VbmxvYWRlZFwiLCB7IGlkIH0pO1xyXG4gICAgfVxyXG4gIH1cclxufTtcclxuXHJcbndhaXRVbnRpbENvbm5lY3Rpb25PcGVuKCkudGhlbihhc3luYyAoKSA9PiB7XHJcbiAgYXdhaXQgdXRpbHMuc2xlZXAoMTAwKTtcclxuICBvdXQubG9hZEFsbCgpO1xyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IG91dDsiLCAiaW1wb3J0IHsgd2FpdFVudGlsQ29ubmVjdGlvbk9wZW4gfSBmcm9tIFwiLi4vLi4vb3RoZXIvdXRpbHMuanNcIjtcclxuaW1wb3J0IGNvbW1vbiBmcm9tIFwiLi4vbW9kdWxlcy9jb21tb24uanNcIjtcclxuaW1wb3J0IHBhdGNoZXIgZnJvbSBcIi4uL3BhdGNoZXIvaW5kZXguanNcIjtcclxuXHJcbmNvbnN0IHNvY2tldHMgPSBuZXcgU2V0KCk7XHJcbmNvbnN0IGhhbmRsZXJzID0gbmV3IE1hcCgpO1xyXG5cclxud2FpdFVudGlsQ29ubmVjdGlvbk9wZW4oKS50aGVuKCgpID0+IHtcclxuICBwYXRjaGVyLmluc3RlYWQoXHJcbiAgICBcImhhbmRsZUNvbm5lY3Rpb25cIixcclxuICAgIGNvbW1vbi5XZWJTb2NrZXQsXHJcbiAgICAoYXJncywgb3JpZykgPT4ge1xyXG4gICAgICBjb25zdCB3cyA9IGFyZ3NbMF07XHJcbiAgICAgIGlmICh3cy51cGdyYWRlUmVxKCkudXJsICE9PSBcIi9hY29yZFwiKSByZXR1cm4gb3JpZyguLi5hcmdzKTtcclxuXHJcbiAgICAgIHNvY2tldHMuYWRkKHdzKTtcclxuXHJcbiAgICAgIHdzLm9uKFwibWVzc2FnZVwiLCBhc3luYyAobXNnKSA9PiB7XHJcbiAgICAgICAgbGV0IGpzb247XHJcblxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICBqc29uID0gSlNPTi5wYXJzZShtc2cpO1xyXG4gICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGpzb24pIHx8IGpzb24ubGVuZ3RoIDwgMSB8fCBqc29uLmxlbmd0aCA+IDMpXHJcbiAgICAgICAgICAgIHRocm93IFwiQXJyYXkgZXhwZWN0ZWQgYXMgbWVzc2FnZS5cIjtcclxuICAgICAgICAgIGlmICh0eXBlb2YganNvblswXSAhPSBcInN0cmluZ1wiKSB0aHJvdyBcIkFycmF5WzBdIG5lZWRzIHRvIGJlIHN0cmluZy5cIjtcclxuICAgICAgICAgIGlmICh0eXBlb2YganNvblsxXSAhPSBcInN0cmluZ1wiKSB0aHJvdyBcIkFycmF5WzFdIG5lZWRzIHRvIGJlIHN0cmluZy5cIjtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgIHdzLnNlbmQoXHJcbiAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KFtcclxuICAgICAgICAgICAgICBudWxsLFxyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG9rOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGVycm9yOiBgJHtlcnJ9YCxcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBdKVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IFtldmVudElkLCBldmVudE5hbWUsIGV2ZW50RGF0YV0gPSBqc29uO1xyXG5cclxuICAgICAgICBjb25zdCBoYW5kbGVyID0gaGFuZGxlcnMuZ2V0KGV2ZW50TmFtZSk7XHJcblxyXG4gICAgICAgIGlmICghaGFuZGxlcilcclxuICAgICAgICAgIHJldHVybiB3cy5zZW5kKFxyXG4gICAgICAgICAgICBKU09OLnN0cmluZ2lmeShbXHJcbiAgICAgICAgICAgICAgZXZlbnRJZCxcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBvazogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBlcnJvcjogYFVuYWJsZSB0byBmaW5kIGhhbmRsZXIuYCxcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBdKVxyXG4gICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIGxldCByZXNwb25zZSA9IGF3YWl0IGhhbmRsZXIoZXZlbnREYXRhKTtcclxuICAgICAgICAgIHdzLnNlbmQoXHJcbiAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KFtcclxuICAgICAgICAgICAgICBldmVudElkLFxyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG9rOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogcmVzcG9uc2UsXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXSlcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICB3cy5zZW5kKFxyXG4gICAgICAgICAgICBKU09OLnN0cmluZ2lmeShbXHJcbiAgICAgICAgICAgICAgZXZlbnRJZCxcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBvazogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBlcnJvcjogYCR7ZXJyfWAsXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXSlcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHdzLm9uKFwiY2xvc2VcIiwgKCkgPT4gc29ja2V0cy5kZWxldGUod3MpKTtcclxuICAgIH1cclxuICApO1xyXG59KTtcclxuXHJcbmZ1bmN0aW9uIHNldChldmVudE5hbWUsIGNhbGxiYWNrKSB7XHJcbiAgaWYgKHR5cGVvZiBldmVudE5hbWUgIT0gXCJzdHJpbmdcIilcclxuICAgIHRocm93IG5ldyBFcnJvcihcIkV2ZW50TmFtZSBuZWVkcyB0byBiZSBhIHN0cmluZy5cIik7XHJcbiAgaWYgKHR5cGVvZiBjYWxsYmFjayAhPSBcImZ1bmN0aW9uXCIpXHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYWxsYmFjayBuZWVkcyB0byBiZSBhIGZ1bmN0aW9uLlwiKTtcclxuICBpZiAoaGFuZGxlcnMuaGFzKGV2ZW50TmFtZSkpXHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJFdmVudE5hbWUgYWxyZWFkeSBpbiB1c2UuXCIpO1xyXG4gIGhhbmRsZXJzLnNldChldmVudE5hbWUsIGNhbGxiYWNrKTtcclxuICByZXR1cm4gKCkgPT4ge1xyXG4gICAgaGFuZGxlcnMuZGVsZXRlKGV2ZW50TmFtZSk7XHJcbiAgfTtcclxufVxyXG5mdW5jdGlvbiB0cmlnZ2VyKGV2ZW50TmFtZSwgLi4uYXJncykge1xyXG4gIGlmICghc29ja2V0RXZlbnRzLmhhcyhldmVudE5hbWUpKVxyXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVW5hYmxlIHRvIGZpbmQgaGFuZGxlciFcIik7XHJcbiAgcmV0dXJuIHNvY2tldEV2ZW50cy5nZXQoZXZlbnROYW1lKSguLi5hcmdzKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIHNldCxcclxuICB0cmlnZ2VyXHJcbn1cclxuXHJcbiIsICJleHBvcnQgZGVmYXVsdCBgXG4uYWNvcmQtLWxheWVyLWNvbnRhaW5lcnstLXRvcC1vZmZzZXQ6IDBweDt3aWR0aDoxMDB2dztoZWlnaHQ6Y2FsYygxMDB2aCAtIHZhcigtLXRvcC1vZmZzZXQpKTt6LWluZGV4Ojk5OTk5OTk7cG9pbnRlci1ldmVudHM6bm9uZTtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6dmFyKC0tdG9wLW9mZnNldCk7bGVmdDowcHh9LmFjb3JkLS1sYXllci1jb250YWluZXIgKnt6LWluZGV4Ojk5OTk5OTk5OTk5OTk5fS5hY29yZC0tdG9vbHRpcC1sYXllcntvcGFjaXR5OjA7dHJhbnNpdGlvbjo1MG1zIGxpbmVhciBvcGFjaXR5O3Bvc2l0aW9uOmFic29sdXRlO3BvaW50ZXItZXZlbnRzOm5vbmV9LmFjb3JkLS10b29sdGlwLWxheWVyLnZpc2libGV7b3BhY2l0eToxO3BvaW50ZXItZXZlbnRzOmFsbH0uYWNvcmQtLXRvYXN0cy1jb250YWluZXJ7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1lbmQ7ZmxleC1kaXJlY3Rpb246Y29sdW1uO3dpZHRoOjEwMHZ3O2hlaWdodDpjYWxjKDEwMHZoIC0gdmFyKC0tdG9wLW9mZnNldCkpO3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6MDtwb2ludGVyLWV2ZW50czpub25lO3BhZGRpbmctYm90dG9tOjMycHh9LmFjb3JkLS10b2FzdHMtY29udGFpbmVyIC5hY29yZC0tdG9hc3R7dHJhbnNpdGlvbjp0cmFuc2Zvcm0gMjUwbXMgZWFzZS1pbi1vdXQsb3BhY2l0eSAyNTBtcyBlYXNlLWluLW91dDtkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO3BvaW50ZXItZXZlbnRzOm5vbmU7Ym9yZGVyLXJhZGl1czo0cHg7cGFkZGluZzo4cHg7Ym94LXNoYWRvdzowcHggMnB4IDhweCByZ2JhKDAsMCwwLC4yNSk7b3BhY2l0eToxO2dhcDo4cHg7Zm9udC1zaXplOjE0cHg7bWFyZ2luOjRweH0uYWNvcmQtLXRvYXN0cy1jb250YWluZXIgLmFjb3JkLS10b2FzdCBzdmd7d2lkdGg6MTZweDtoZWlnaHQ6MTZweH0uYWNvcmQtLXRvYXN0cy1jb250YWluZXIgLmFjb3JkLS10b2FzdC5jbGlja2FibGV7Y3Vyc29yOnBvaW50ZXI7cG9pbnRlci1ldmVudHM6YWxsfS5hY29yZC0tdG9hc3RzLWNvbnRhaW5lciAuYWNvcmQtLXRvYXN0LmNsb3Npbmd7b3BhY2l0eTowO3RyYW5zZm9ybTp0cmFuc2xhdGUoMCwgLTUwcHgpfS5hY29yZC0tdG9hc3RzLWNvbnRhaW5lciAuYWNvcmQtLXRvYXN0LmhpZGRlbntvcGFjaXR5OjA7dHJhbnNmb3JtOnRyYW5zbGF0ZSgwLCA1MHB4KX0uYWNvcmQtLXRvYXN0cy1jb250YWluZXIgLmFjb3JkLS10b2FzdC5zdHlsZS1pbmZve2JhY2tncm91bmQtY29sb3I6IzRhOGZlMTtjb2xvcjojZjVmNWY1fS5hY29yZC0tdG9hc3RzLWNvbnRhaW5lciAuYWNvcmQtLXRvYXN0LnN0eWxlLXdhcm5pbmd7YmFja2dyb3VuZC1jb2xvcjojZmFhODFhO2NvbG9yOiMwMDB9LmFjb3JkLS10b2FzdHMtY29udGFpbmVyIC5hY29yZC0tdG9hc3Quc3R5bGUtZXJyb3J7YmFja2dyb3VuZC1jb2xvcjojZWQ0MjQ1O2NvbG9yOiMwMDB9LmFjb3JkLS10b2FzdHMtY29udGFpbmVyIC5hY29yZC0tdG9hc3Quc3R5bGUtc3VjY2Vzc3tiYWNrZ3JvdW5kLWNvbG9yOiMzYmE1NWQ7Y29sb3I6I2Y1ZjVmNX0uYWNvcmQtLXRvYXN0cy1jb250YWluZXIgLmFjb3JkLS10b2FzdC5zdHlsZS1kZWZhdWx0e2JhY2tncm91bmQtY29sb3I6I2Y1ZjVmNTtjb2xvcjojMDAwfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVye3dpZHRoOjEwMHZ3O2hlaWdodDpjYWxjKDEwMHZoIC0gdmFyKC0tdG9wLW9mZnNldCkpO2Rpc3BsYXk6ZmxleDtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtsZWZ0OjA7cG9pbnRlci1ldmVudHM6bm9uZX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllciAuYWNvcmQtLW5vdGlmaWNhdGlvbntkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1uO3BvaW50ZXItZXZlbnRzOmFsbDt0cmFuc2l0aW9uOnRyYW5zZm9ybSAyNTBtcyBlYXNlLWluLW91dCxvcGFjaXR5IDI1MG1zIGVhc2UtaW4tb3V0O21hcmdpbjo0cHg7YmFja2Ryb3AtZmlsdGVyOmJsdXIoMTZweCkgYnJpZ2h0bmVzcygwLjc1KTstd2Via2l0LWFwcC1yZWdpb246bm8tZHJhZzstLWFuaW1hdGlvbi1zaXplOiA1MHB4fS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyIC5hY29yZC0tbm90aWZpY2F0aW9uLmhpZGRlbiwuYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllciAuYWNvcmQtLW5vdGlmaWNhdGlvbi5jbG9zaW5ne29wYWNpdHk6MH0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllciAuYWNvcmQtLW5vdGlmaWNhdGlvbj4uY29udGFpbmVye2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47cGFkZGluZzo4cHg7Y29sb3I6I2ZmZjttaW4td2lkdGg6MjUwcHh9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24+LmNvbnRhaW5lcj4uY2xvc2V7d2lkdGg6MjRweDtoZWlnaHQ6MjRweDtjb2xvcjojZmZmO29wYWNpdHk6LjU7Y3Vyc29yOnBvaW50ZXI7bWFyZ2luLWxlZnQ6OHB4O3otaW5kZXg6OTk5OTk5OTk5fS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyIC5hY29yZC0tbm90aWZpY2F0aW9uPi5jb250YWluZXI+LmNsb3NlLmhpZGRlbntkaXNwbGF5Om5vbmV9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24+LnByb2dyZXNzLWNvbnRhaW5lcnt3aWR0aDoxMDAlO2hlaWdodDo1cHh9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24+LnByb2dyZXNzLWNvbnRhaW5lcj4ucHJvZ3Jlc3N7d2lkdGg6MCU7aGVpZ2h0OjVweDt0cmFuc2l0aW9uOndpZHRoIHZhcigtLWR1cmF0aW9uKSBsaW5lYXI7YmFja2dyb3VuZC1jb2xvcjp2YXIoLS1iYXItY29sb3IpfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyIC5hY29yZC0tbm90aWZpY2F0aW9uPi5wcm9ncmVzcy1jb250YWluZXI+LnByb2dyZXNzLnByb2dyZXNzaW5ne3dpZHRoOjEwMCV9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24uc3R5bGUtaW5mb3stLWJhci1jb2xvcjogIzRhOGZlMX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllciAuYWNvcmQtLW5vdGlmaWNhdGlvbi5zdHlsZS13YXJuaW5ney0tYmFyLWNvbG9yOiAjZmFhODFhfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyIC5hY29yZC0tbm90aWZpY2F0aW9uLnN0eWxlLWVycm9yey0tYmFyLWNvbG9yOiAjZWQ0MjQ1fS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyIC5hY29yZC0tbm90aWZpY2F0aW9uLnN0eWxlLXN1Y2Nlc3N7LS1iYXItY29sb3I6ICMzYmE1NWR9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24uc3R5bGUtZGVmYXVsdHstLWJhci1jb2xvcjogd2hpdGVzbW9rZX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci50b3AtcmlnaHR7anVzdGlmeS1jb250ZW50OmZsZXgtZW5kO2FsaWduLWl0ZW1zOmZsZXgtc3RhcnR9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIudG9wLXJpZ2h0IC5hY29yZC0tbm90aWZpY2F0aW9uLmhpZGRlbnt0cmFuc2Zvcm06dHJhbnNsYXRlKDAsIGNhbGModmFyKC0tYW5pbWF0aW9uLXNpemUpICogLTEpKX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci50b3AtcmlnaHQgLmFjb3JkLS1ub3RpZmljYXRpb24uY2xvc2luZ3t0cmFuc2Zvcm06dHJhbnNsYXRlKDAsIHZhcigtLWFuaW1hdGlvbi1zaXplKSl9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIudG9wLWxlZnR7anVzdGlmeS1jb250ZW50OmZsZXgtc3RhcnQ7YWxpZ24taXRlbXM6ZmxleC1zdGFydH0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci50b3AtbGVmdCAuYWNvcmQtLW5vdGlmaWNhdGlvbi5oaWRkZW57dHJhbnNmb3JtOnRyYW5zbGF0ZSgwLCBjYWxjKHZhcigtLWFuaW1hdGlvbi1zaXplKSAqIC0xKSl9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIudG9wLWxlZnQgLmFjb3JkLS1ub3RpZmljYXRpb24uY2xvc2luZ3t0cmFuc2Zvcm06dHJhbnNsYXRlKDAsIHZhcigtLWFuaW1hdGlvbi1zaXplKSl9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIuYm90dG9tLXJpZ2h0e2p1c3RpZnktY29udGVudDpmbGV4LWVuZDthbGlnbi1pdGVtczpmbGV4LWVuZH0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci5ib3R0b20tcmlnaHQgLmFjb3JkLS1ub3RpZmljYXRpb24uaGlkZGVue3RyYW5zZm9ybTp0cmFuc2xhdGUoMCwgdmFyKC0tYW5pbWF0aW9uLXNpemUpKX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci5ib3R0b20tcmlnaHQgLmFjb3JkLS1ub3RpZmljYXRpb24uY2xvc2luZ3t0cmFuc2Zvcm06dHJhbnNsYXRlKDAsIGNhbGModmFyKC0tYW5pbWF0aW9uLXNpemUpICogLTEpKX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci5ib3R0b20tbGVmdHtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1zdGFydDthbGlnbi1pdGVtczpmbGV4LWVuZH0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci5ib3R0b20tbGVmdCAuYWNvcmQtLW5vdGlmaWNhdGlvbi5oaWRkZW57dHJhbnNmb3JtOnRyYW5zbGF0ZSgwLCB2YXIoLS1hbmltYXRpb24tc2l6ZSkpfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLmJvdHRvbS1sZWZ0IC5hY29yZC0tbm90aWZpY2F0aW9uLmNsb3Npbmd7dHJhbnNmb3JtOnRyYW5zbGF0ZSgwLCBjYWxjKHZhcigtLWFuaW1hdGlvbi1zaXplKSAqIC0xKSl9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIudG9wLWNlbnRlcntqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO2FsaWduLWl0ZW1zOmZsZXgtc3RhcnR9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIudG9wLWNlbnRlciAuYWNvcmQtLW5vdGlmaWNhdGlvbi5oaWRkZW57dHJhbnNmb3JtOnRyYW5zbGF0ZSgwLCBjYWxjKHZhcigtLWFuaW1hdGlvbi1zaXplKSAqIC0xKSl9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIudG9wLWNlbnRlciAuYWNvcmQtLW5vdGlmaWNhdGlvbi5jbG9zaW5ne3RyYW5zZm9ybTp0cmFuc2xhdGUoMCwgdmFyKC0tYW5pbWF0aW9uLXNpemUpKX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci5ib3R0b20tY2VudGVye2p1c3RpZnktY29udGVudDpjZW50ZXI7YWxpZ24taXRlbXM6ZmxleC1lbmR9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIuYm90dG9tLWNlbnRlciAuYWNvcmQtLW5vdGlmaWNhdGlvbi5oaWRkZW57dHJhbnNmb3JtOnRyYW5zbGF0ZSgwLCB2YXIoLS1hbmltYXRpb24tc2l6ZSkpfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLmJvdHRvbS1jZW50ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24uY2xvc2luZ3t0cmFuc2Zvcm06dHJhbnNsYXRlKDAsIGNhbGModmFyKC0tYW5pbWF0aW9uLXNpemUpICogLTEpKX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci5jZW50ZXJ7anVzdGlmeS1jb250ZW50OmNlbnRlcjthbGlnbi1pdGVtczpjZW50ZXJ9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIuY2VudGVyIC5hY29yZC0tbm90aWZpY2F0aW9uLmhpZGRlbnt0cmFuc2Zvcm06c2NhbGUoMC41KX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci5jZW50ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24uY2xvc2luZ3t0cmFuc2Zvcm06c2NhbGUoMC41KX0uYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci5sZWZ0LWNlbnRlcntqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1zdGFydDthbGlnbi1pdGVtczpjZW50ZXJ9LmFjb3JkLS1ub3RpZmljYXRpb24tbGF5ZXIubGVmdC1jZW50ZXIgLmFjb3JkLS1ub3RpZmljYXRpb24uaGlkZGVue3RyYW5zZm9ybTp0cmFuc2xhdGUoY2FsYyh2YXIoLS1hbmltYXRpb24tc2l6ZSkgKiAtMSksIDApfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLmxlZnQtY2VudGVyIC5hY29yZC0tbm90aWZpY2F0aW9uLmNsb3Npbmd7dHJhbnNmb3JtOnRyYW5zbGF0ZSh2YXIoLS1hbmltYXRpb24tc2l6ZSksIDApfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLnJpZ2h0LWNlbnRlcntqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1lbmQ7YWxpZ24taXRlbXM6Y2VudGVyfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLnJpZ2h0LWNlbnRlciAuYWNvcmQtLW5vdGlmaWNhdGlvbi5oaWRkZW57dHJhbnNmb3JtOnRyYW5zbGF0ZSh2YXIoLS1hbmltYXRpb24tc2l6ZSksIDApfS5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLnJpZ2h0LWNlbnRlciAuYWNvcmQtLW5vdGlmaWNhdGlvbi5jbG9zaW5ne3RyYW5zZm9ybTp0cmFuc2xhdGUoY2FsYyh2YXIoLS1hbmltYXRpb24tc2l6ZSkgKiAtMSksIDApfWA7XG4iLCAiaW1wb3J0IGRvbSBmcm9tIFwiLi4vZG9tL2luZGV4LmpzXCI7XHJcbmltcG9ydCBldmVudHMgZnJvbSBcIi4uL2V2ZW50cy9pbmRleC5qc1wiO1xyXG5pbXBvcnQgd2VicGFjayBmcm9tIFwiLi4vbW9kdWxlcy93ZWJwYWNrLmpzXCI7XHJcblxyXG5jb25zdCB0b29sdGlwQ2xhc3NlcyA9IHdlYnBhY2suZmluZEJ5UHJvcGVydGllcyhcInRvb2x0aXBDb250ZW50QWxsb3dPdmVyZmxvd1wiLCBcInRvb2x0aXBcIik7XHJcblxyXG5jb25zdCB0b29sdGlwUG9zaXRpb25zID0ge1xyXG4gIHRvcDogdG9vbHRpcENsYXNzZXMudG9vbHRpcFRvcCxcclxuICBib3R0b206IHRvb2x0aXBDbGFzc2VzLnRvb2x0aXBCb3R0b20sXHJcbiAgbGVmdDogdG9vbHRpcENsYXNzZXMudG9vbHRpcExlZnQsXHJcbiAgcmlnaHQ6IHRvb2x0aXBDbGFzc2VzLnRvb2x0aXBSaWdodCxcclxufVxyXG5cclxuY2xhc3MgVG9vbHRpcCB7XHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtIVE1MRGl2RWxlbWVudH0gdGFyZ2V0IFxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfEhUTUxEaXZFbGVtZW50fSBjb250ZW50XHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IodGFyZ2V0LCBjb250ZW50LCBwb3NpdGlvbiA9IFwiYXV0b1wiKSB7XHJcbiAgICAvKiogQHR5cGUge0hUTUxEaXZFbGVtZW50fSAqL1xyXG4gICAgdGhpcy5sYXllckVsZW1lbnQgPSBkb20ucGFyc2UoYFxyXG4gICAgICA8ZGl2IGNsYXNzPVwiYWNvcmQtLXRvb2x0aXAtbGF5ZXJcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiJHt0b29sdGlwQ2xhc3Nlcy50b29sdGlwfSAke3Rvb2x0aXBDbGFzc2VzLnRvb2x0aXBQcmltYXJ5fSBhY29yZC0tdG9vbHRpcFwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cIiR7dG9vbHRpcENsYXNzZXMudG9vbHRpcFBvaW50ZXJ9IGFjb3JkLS10b29sdGlwLXBvaW50ZXJcIj48L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCIke3Rvb2x0aXBDbGFzc2VzLnRvb2x0aXBDb250ZW50fSBhY29yZC0tdG9vbHRpcC1jb250ZW50XCI+PC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgYCk7XHJcbiAgICB0aGlzLnRvb2x0aXBFbGVtZW50ID0gdGhpcy5sYXllckVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5hY29yZC0tdG9vbHRpcFwiKTtcclxuICAgIHRoaXMuY29udGVudEVsZW1lbnQgPSB0aGlzLmxheWVyRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmFjb3JkLS10b29sdGlwLWNvbnRlbnRcIik7XHJcbiAgICB0aGlzLmNvbnRlbnQgPSBjb250ZW50O1xyXG4gICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XHJcblxyXG4gICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XHJcbiAgICB0aGlzLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLnBhdXNlZCA9IGZhbHNlO1xyXG5cclxuICAgIGNvbnN0IG9uTW91c2VFbnRlciA9ICgpID0+IHtcclxuICAgICAgaWYgKHRoaXMuZGlzYWJsZWQgfHwgdGhpcy5wYXVzZWQpIHJldHVybjtcclxuICAgICAgdGhpcy5zaG93KCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgb25Nb3VzZUxlYXZlID0gKCkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5wYXVzZWQpIHJldHVybjtcclxuICAgICAgdGhpcy5oaWRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy50YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgb25Nb3VzZUVudGVyKTtcclxuICAgIHRoaXMudGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIG9uTW91c2VMZWF2ZSk7XHJcblxyXG4gICAgbGV0IHVuUGF0Y2hPYnNlcnZlciA9IGV2ZW50cy5vbihcclxuICAgICAgXCJEb21NdXRhdGlvblwiLFxyXG4gICAgICAvKiogQHBhcmFtIHtNdXRhdGlvblJlY29yZH0gbXV0ICovKG11dCkgPT4ge1xyXG4gICAgICAgIGlmIChtdXQudHlwZSA9PT0gXCJhdHRyaWJ1dGVzXCIpIHtcclxuICAgICAgICAgIGlmIChtdXQudGFyZ2V0LmlzU2FtZU5vZGUodGhpcy50YXJnZXQpKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAobXV0LmF0dHJpYnV0ZU5hbWUpIHtcclxuICAgICAgICAgICAgICBjYXNlIFwiYWNvcmQtLXRvb2x0aXAtZGlzYWJsZWRcIjoge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kaXNhYmxlZCA9IHRoaXMudGFyZ2V0LmdldEF0dHJpYnV0ZShcImFjb3JkLS10b29sdGlwLWRpc2FibGVkXCIpID09PSBcInRydWVcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBjYXNlIFwiYWNvcmQtLXRvb2x0aXAtY29udGVudFwiOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQgPSB0aGlzLnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJhY29yZC0tdG9vbHRpcC1jb250ZW50XCIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGNhc2UgXCJhY29yZC0tdG9vbHRpcC1wb3NpdGlvblwiOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uID0gdGhpcy50YXJnZXQuZ2V0QXR0cmlidXRlKFwiYWNvcmQtLXRvb2x0aXAtcG9zaXRpb25cIik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIClcclxuXHJcbiAgICB0aGlzLmRlc3Ryb3kgPSAoKSA9PiB7XHJcbiAgICAgIHRoaXMudGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsIG9uTW91c2VFbnRlcik7XHJcbiAgICAgIHRoaXMudGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIG9uTW91c2VMZWF2ZSk7XHJcbiAgICAgIHRoaXMuaGlkZSgpO1xyXG4gICAgICB1blBhdGNoT2JzZXJ2ZXIoKTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBnZXQgY29udGVudCgpIHtcclxuICAgIHJldHVybiB0aGlzLmNvbnRlbnRFbGVtZW50LmZpcnN0RWxlbWVudENoaWxkO1xyXG4gIH1cclxuXHJcbiAgc2V0IGNvbnRlbnQodmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgdGhpcy5jb250ZW50RWxlbWVudC5pbm5lckhUTUwgPSB2YWx1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuY29udGVudEVsZW1lbnQuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgdGhpcy5jb250ZW50RWxlbWVudD8uYXBwZW5kQ2hpbGQ/Lih2YWx1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZ2V0Q29udGFpbmVyKCkge1xyXG4gICAgY29uc3QgYXBwRWxtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2NsYXNzKj1cIm5vdEFwcEFzaWRlUGFuZWwtXCJdJyk7XHJcblxyXG4gICAgbGV0IGNvbnRhaW5lciA9IGFwcEVsbS5xdWVyeVNlbGVjdG9yKFwiLmFjb3JkLS10b29sdGlwLWNvbnRhaW5lclwiKTtcclxuICAgIGlmICghY29udGFpbmVyKSB7XHJcbiAgICAgIGNvbnRhaW5lciA9IGRvbS5wYXJzZShgPGRpdiBjbGFzcz1cImFjb3JkLS1sYXllci1jb250YWluZXIgYWNvcmQtLXRvb2x0aXAtY29udGFpbmVyXCI+PC9kaXY+YCk7XHJcbiAgICAgIGFwcEVsbS5hcHBlbmRDaGlsZChjb250YWluZXIpO1xyXG4gICAgfVxyXG4gICAgLy8gY29udGFpbmVyLnN0eWxlLnNldFByb3BlcnR5KFwiLS10b3Atb2Zmc2V0XCIsIGAke2FwcEVsbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AudG9GaXhlZCgxKX1weGApO1xyXG5cclxuICAgIHJldHVybiBjb250YWluZXI7XHJcbiAgfVxyXG5cclxuICBzaG93KCkge1xyXG4gICAgaWYgKHRoaXMudmlzaWJsZSkgcmV0dXJuO1xyXG4gICAgdGhpcy52aXNpYmxlID0gdHJ1ZTtcclxuXHJcbiAgICBjb25zdCBjb250YWluZXIgPSBUb29sdGlwLmdldENvbnRhaW5lcigpO1xyXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMubGF5ZXJFbGVtZW50KTtcclxuXHJcbiAgICBpZiAoIXRoaXMucG9zaXRpb24gfHwgdGhpcy5wb3NpdGlvbiA9PT0gXCJhdXRvXCIpIHtcclxuICAgICAgdGhpcy5jYWxjdWxhdGVQb3NpdGlvbihcclxuICAgICAgICB0aGlzLmNhblNob3dBdFRvcCA/IFwidG9wXCJcclxuICAgICAgICAgIDogdGhpcy5jYW5TaG93QXRCb3R0b20gPyBcImJvdHRvbVwiXHJcbiAgICAgICAgICAgIDogdGhpcy5jYW5TaG93QXRMZWZ0ID8gXCJsZWZ0XCJcclxuICAgICAgICAgICAgICA6IHRoaXMuY2FuU2hvd0F0UmlnaHQgPyBcInJpZ2h0XCJcclxuICAgICAgICAgICAgICAgIDogXCJ0b3BcIlxyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5jYWxjdWxhdGVQb3NpdGlvbih0aGlzLnBvc2l0aW9uKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgdGhpcy5sYXllckVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInZpc2libGVcIik7XHJcbiAgfVxyXG5cclxuICBjYWxjdWxhdGVQb3NpdGlvbihwb3NpdGlvbikge1xyXG4gICAgY29uc3QgdGFyZ2V0UmVjdCA9IHRoaXMudGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cclxuICAgIHRoaXMubGF5ZXJFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoLi4uT2JqZWN0LnZhbHVlcyh0b29sdGlwUG9zaXRpb25zKSk7XHJcbiAgICB0aGlzLnRvb2x0aXBFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJ2ZXJ0aWNhbFwiLCBcImhvcml6b250YWxcIik7XHJcblxyXG4gICAgc3dpdGNoIChwb3NpdGlvbikge1xyXG4gICAgICBjYXNlIFwidG9wXCI6IHtcclxuICAgICAgICB0aGlzLmxheWVyRWxlbWVudC5jbGFzc0xpc3QuYWRkKHRvb2x0aXBQb3NpdGlvbnMudG9wKTtcclxuICAgICAgICB0aGlzLmxheWVyRWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShcImxlZnRcIiwgYCR7dGFyZ2V0UmVjdC5sZWZ0fXB4YCk7XHJcbiAgICAgICAgdGhpcy5sYXllckVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoXCJ0b3BcIiwgYCR7KHRhcmdldFJlY3QudG9wIC0gdGhpcy5sYXllckVsZW1lbnQub2Zmc2V0SGVpZ2h0IC0gMTApfXB4YCk7XHJcbiAgICAgICAgdGhpcy5jZW50ZXJQb3NpdGlvbihcImhvcml6b250YWxcIik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSBcImJvdHRvbVwiOiB7XHJcbiAgICAgICAgdGhpcy5sYXllckVsZW1lbnQuY2xhc3NMaXN0LmFkZCh0b29sdGlwUG9zaXRpb25zLmJvdHRvbSk7XHJcbiAgICAgICAgdGhpcy5sYXllckVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoXCJsZWZ0XCIsIGAke3RhcmdldFJlY3QubGVmdH1weGApO1xyXG4gICAgICAgIHRoaXMubGF5ZXJFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KFwidG9wXCIsIGAkeyh0YXJnZXRSZWN0LnRvcCArIHRoaXMubGF5ZXJFbGVtZW50Lm9mZnNldEhlaWdodCArIDEwKX1weGApO1xyXG4gICAgICAgIHRoaXMuY2VudGVyUG9zaXRpb24oXCJob3Jpem9udGFsXCIpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgXCJsZWZ0XCI6IHtcclxuICAgICAgICB0aGlzLmxheWVyRWxlbWVudC5jbGFzc0xpc3QuYWRkKHRvb2x0aXBQb3NpdGlvbnMubGVmdCk7XHJcbiAgICAgICAgdGhpcy5sYXllckVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoXCJ0b3BcIiwgYCR7dGFyZ2V0UmVjdC50b3B9cHhgKTtcclxuICAgICAgICB0aGlzLmxheWVyRWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShcImxlZnRcIiwgYCR7dGFyZ2V0UmVjdC5sZWZ0IC0gdGhpcy5sYXllckVsZW1lbnQub2Zmc2V0V2lkdGggLSAxMH1weGApO1xyXG4gICAgICAgIHRoaXMuY2VudGVyUG9zaXRpb24oXCJ2ZXJ0aWNhbFwiKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlIFwicmlnaHRcIjoge1xyXG4gICAgICAgIHRoaXMubGF5ZXJFbGVtZW50LmNsYXNzTGlzdC5hZGQodG9vbHRpcFBvc2l0aW9ucy5yaWdodCk7XHJcbiAgICAgICAgdGhpcy5sYXllckVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoXCJ0b3BcIiwgYCR7dGFyZ2V0UmVjdC50b3B9cHhgKTtcclxuICAgICAgICB0aGlzLmxheWVyRWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShcImxlZnRcIiwgYCR7dGFyZ2V0UmVjdC5sZWZ0ICsgdGhpcy5sYXllckVsZW1lbnQub2Zmc2V0V2lkdGggKyAxMH1weGApO1xyXG4gICAgICAgIHRoaXMuY2VudGVyUG9zaXRpb24oXCJ2ZXJ0aWNhbFwiKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY2VudGVyUG9zaXRpb24oZGlyZWN0aW9uKSB7XHJcbiAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xyXG4gICAgICBjYXNlIFwiaG9yaXpvbnRhbFwiOiB7XHJcbiAgICAgICAgY29uc3QgY2VudGVyID0gdGhpcy50YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCArICh0aGlzLnRhcmdldC5vZmZzZXRXaWR0aCAvIDIpO1xyXG4gICAgICAgIHRoaXMubGF5ZXJFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KFwibGVmdFwiLCBgJHtjZW50ZXIgLSAodGhpcy5sYXllckVsZW1lbnQub2Zmc2V0V2lkdGggLyAyKX1weGApO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgXCJ2ZXJ0aWNhbFwiOiB7XHJcbiAgICAgICAgY29uc3QgY2VudGVyID0gdGhpcy50YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgKHRoaXMudGFyZ2V0Lm9mZnNldEhlaWdodCAvIDIpO1xyXG4gICAgICAgIHRoaXMubGF5ZXJFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KFwidG9wXCIsIGAke2NlbnRlciAtICh0aGlzLmxheWVyRWxlbWVudC5vZmZzZXRIZWlnaHQgLyAyKX1weGApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBoaWRlKCkge1xyXG4gICAgaWYgKCF0aGlzLnZpc2libGUpIHJldHVybjtcclxuICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMubGF5ZXJFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJ2aXNpYmxlXCIpO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHRoaXMubGF5ZXJFbGVtZW50LnJlbW92ZSgpO1xyXG4gICAgfSwgNTApO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGNhblNob3dBdFRvcCgpIHsgcmV0dXJuIHRoaXMudGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCAtIHRoaXMubGF5ZXJFbGVtZW50Lm9mZnNldEhlaWdodCA+PSAwOyB9XHJcbiAgZ2V0IGNhblNob3dBdEJvdHRvbSgpIHsgcmV0dXJuIHRoaXMudGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCArIHRoaXMudGFyZ2V0Lm9mZnNldEhlaWdodCArIHRoaXMubGF5ZXJFbGVtZW50Lm9mZnNldEhlaWdodCA8PSB3aW5kb3cuaW5uZXJIZWlnaHQ7IH1cclxuICBnZXQgY2FuU2hvd0F0TGVmdCgpIHsgcmV0dXJuIHRoaXMudGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQgLSB0aGlzLmxheWVyRWxlbWVudC5vZmZzZXRXaWR0aCA+PSAwOyB9XHJcbiAgZ2V0IGNhblNob3dBdFJpZ2h0KCkgeyByZXR1cm4gdGhpcy50YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCArIHRoaXMudGFyZ2V0Lm9mZnNldFdpZHRoICsgdGhpcy5sYXllckVsZW1lbnQub2Zmc2V0V2lkdGggPD0gd2luZG93LmlubmVyV2lkdGg7IH1cclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlKHRhcmdldCwgY29udGVudCwgcG9zaXRpb24gPSBcImF1dG9cIikge1xyXG4gIHJldHVybiBuZXcgVG9vbHRpcCh0YXJnZXQsIGNvbnRlbnQsIHBvc2l0aW9uKTtcclxufVxyXG5cclxuZG9tLnBhdGNoKFxyXG4gIFwiW2Fjb3JkLS10b29sdGlwLWNvbnRlbnRdXCIsXHJcbiAgKGVsbSkgPT4ge1xyXG4gICAgbGV0IHRvb2x0aXAgPSBjcmVhdGUoZWxtLCBlbG0uZ2V0QXR0cmlidXRlKFwiYWNvcmQtLXRvb2x0aXAtY29udGVudFwiKSwgZWxtLmdldEF0dHJpYnV0ZShcImFjb3JkLS10b29sdGlwLXBvc2l0aW9uXCIpKTtcclxuICAgIHRvb2x0aXAuZGlzYWJsZWQgPSBlbG0uZ2V0QXR0cmlidXRlKFwiYWNvcmQtLXRvb2x0aXAtZGlzYWJsZWRcIikgPT09IFwidHJ1ZVwiO1xyXG4gIH0sXHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7IGNyZWF0ZSB9OyIsICJpbXBvcnQgZG9tIGZyb20gXCIuLi9kb20vaW5kZXguanNcIjtcclxuaW1wb3J0IHV0aWxzIGZyb20gXCIuLi91dGlscy9pbmRleC5qc1wiO1xyXG5cclxuY29uc3QgdmFsaWRQb3NpdGlvbnMgPSBbXHJcbiAgXCJ0b3AtcmlnaHRcIixcclxuICBcInRvcC1sZWZ0XCIsXHJcbiAgXCJib3R0b20tcmlnaHRcIixcclxuICBcImJvdHRvbS1sZWZ0XCIsXHJcbiAgXCJ0b3AtY2VudGVyXCIsXHJcbiAgXCJib3R0b20tY2VudGVyXCIsXHJcbiAgXCJjZW50ZXJcIixcclxuICBcImxlZnQtY2VudGVyXCIsXHJcbiAgXCJyaWdodC1jZW50ZXJcIlxyXG5dXHJcblxyXG5mdW5jdGlvbiBnZXRDb250YWluZXIocG9zaXRpb24pIHtcclxuICBpZiAoIXZhbGlkUG9zaXRpb25zLmluY2x1ZGVzKHBvc2l0aW9uKSkgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHBvc2l0aW9uIFwiJHtwb3NpdGlvbn1cIi4gVmFsaWQgcG9zaXRpb25zIGFyZTogJHt2YWxpZFBvc2l0aW9ucy5qb2luKFwiLCBcIil9YCk7XHJcbiAgY29uc3QgYXBwRWxtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2NsYXNzKj1cIm5vdEFwcEFzaWRlUGFuZWwtXCJdJyk7XHJcblxyXG4gIGxldCB0b3BDb250YWluZXIgPSBhcHBFbG0ucXVlcnlTZWxlY3RvcihcIi5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLWNvbnRhaW5lclwiKTtcclxuICBpZiAoIXRvcENvbnRhaW5lcikge1xyXG4gICAgdG9wQ29udGFpbmVyID0gZG9tLnBhcnNlKGA8ZGl2IGNsYXNzPVwiYWNvcmQtLWxheWVyLWNvbnRhaW5lciBhY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLWNvbnRhaW5lclwiPjwvZGl2PmApO1xyXG4gICAgYXBwRWxtLmFwcGVuZENoaWxkKHRvcENvbnRhaW5lcik7XHJcbiAgfVxyXG4gIHRvcENvbnRhaW5lci5zdHlsZS5zZXRQcm9wZXJ0eShcIi0tdG9wLW9mZnNldFwiLCBgJHthcHBFbG0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wLnRvRml4ZWQoMSl9cHhgKTtcclxuXHJcbiAgbGV0IHBvc2l0aW9uQ29udGFpbmVyID0gdG9wQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoYC5hY29yZC0tbm90aWZpY2F0aW9uLWxheWVyLiR7cG9zaXRpb259YCk7XHJcbiAgaWYgKCFwb3NpdGlvbkNvbnRhaW5lcikge1xyXG4gICAgcG9zaXRpb25Db250YWluZXIgPSBkb20ucGFyc2UoYDxkaXYgY2xhc3M9XCJhY29yZC0tbm90aWZpY2F0aW9uLWxheWVyICR7cG9zaXRpb259XCI+PC9kaXY+YCk7XHJcbiAgICB0b3BDb250YWluZXIuYXBwZW5kQ2hpbGQocG9zaXRpb25Db250YWluZXIpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHBvc2l0aW9uQ29udGFpbmVyO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93KGNvbnRlbnQsIHtcclxuICBzdHlsZSA9IFwiZGVmYXVsdFwiLFxyXG4gIHRpbWVvdXQgPSAxMDAwMCxcclxuICBwb3NpdGlvbiA9IFwidG9wLXJpZ2h0XCIsXHJcbiAgY2xvc2FibGUgPSB0cnVlLFxyXG4gIG9uQ2xpY2sgPSBudWxsLFxyXG4gIG9uQ2xvc2UgPSBudWxsXHJcbn0gPSB7fSkge1xyXG4gIGNvbnN0IGNvbnRhaW5lciA9IGdldENvbnRhaW5lcihwb3NpdGlvbik7XHJcblxyXG4gIGNvbnN0IG5vdGlmRWxtID0gZG9tLnBhcnNlKGBcclxuICAgIDxkaXYgY2xhc3M9XCJhY29yZC0tbm90aWZpY2F0aW9uIHN0eWxlLSR7c3R5bGV9IGhpZGRlblwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRlbnRcIj48L2Rpdj5cclxuICAgICAgICAgICAgPHN2ZyBjbGFzcz1cImNsb3NlICR7IWNsb3NhYmxlID8gXCJoaWRkZW5cIiA6IFwiXCJ9XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMjRcIj5cclxuICAgICAgICAgICAgICAgIDxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTEyIDEwLjU4Nmw0Ljk1LTQuOTUgMS40MTQgMS40MTQtNC45NSA0Ljk1IDQuOTUgNC45NS0xLjQxNCAxLjQxNC00Ljk1LTQuOTUtNC45NSA0Ljk1LTEuNDE0LTEuNDE0IDQuOTUtNC45NS00Ljk1LTQuOTVMNy4wNSA1LjYzNnpcIi8+XHJcbiAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJwcm9ncmVzcy1jb250YWluZXJcIiBzdHlsZT1cIi0tZHVyYXRpb246ICR7dGltZW91dH1tcztcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2dyZXNzXCI+PC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICBgKTtcclxuXHJcbiAgbm90aWZFbG0ucXVlcnlTZWxlY3RvcihcIi5jb250ZW50XCIpLmlubmVySFRNTCA9IGNvbnRlbnQ7XHJcblxyXG4gIGxldCBjbG9zZWQgPSBmYWxzZTtcclxuICBmdW5jdGlvbiBjbG9zZShjbG9zZVR5cGUpIHtcclxuICAgIGlmIChjbG9zZWQpIHJldHVybjtcclxuICAgIGNsb3NlZCA9IHRydWU7XHJcblxyXG4gICAgbm90aWZFbG0uY2xhc3NMaXN0LmFkZChcImNsb3NpbmdcIik7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgbm90aWZFbG0ucmVtb3ZlKCk7XHJcblxyXG4gICAgICB1dGlscy5pZkV4aXN0cyhcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuYWNvcmQtLW5vdGlmaWNhdGlvbi1sYXllci1jb250YWluZXJgKSxcclxuICAgICAgICAvKiogQHBhcmFtIHtIVE1MRGl2RWxlbWVudH0gZWxtICovKGVsbSkgPT4ge1xyXG4gICAgICAgICAgaWYgKCEoWy4uLmVsbS5jaGlsZE5vZGVzLnZhbHVlcygpXS5yZWR1Y2UoKHByZXYsIGN1cnIpID0+IHByZXYgKyBjdXJyLmNoaWxkRWxlbWVudENvdW50LCAwKSkpIGVsbS5yZW1vdmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICk7XHJcbiAgICB9LCAyNzUpO1xyXG4gICAgb25DbG9zZT8uKGNsb3NlVHlwZSk7XHJcbiAgfVxyXG5cclxuICBpZiAodHlwZW9mIG9uQ2xpY2sgPT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICBub3RpZkVsbS5jbGFzc0xpc3QuYWRkKFwiY2xpY2thYmxlXCIpO1xyXG4gICAgbm90aWZFbG0ub25jbGljayA9ICgpID0+IHtcclxuICAgICAgb25DbGljayhjbG9zZSk7XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgdXRpbHMuaWZFeGlzdHMobm90aWZFbG0ucXVlcnlTZWxlY3RvcihcIi5jbG9zZVwiKSwgKGVsbSkgPT4ge1xyXG4gICAgZWxtLm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgIGNsb3NlKFwidXNlclwiKTtcclxuICAgIH07XHJcbiAgfSk7XHJcblxyXG4gIGNvbnRhaW5lci5wcmVwZW5kKG5vdGlmRWxtKTtcclxuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xyXG4gICAgbm90aWZFbG0uY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcclxuICAgIG5vdGlmRWxtLnF1ZXJ5U2VsZWN0b3IoXCIucHJvZ3Jlc3NcIikuY2xhc3NMaXN0LmFkZChcInByb2dyZXNzaW5nXCIpO1xyXG4gIH0pO1xyXG5cclxuICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgIGNsb3NlKFwidGltZW91dFwiKTtcclxuICB9LCB0aW1lb3V0KTtcclxuXHJcbiAgcmV0dXJuICgpID0+IHtcclxuICAgIGNsb3NlKFwiZm9yY2VcIik7XHJcbiAgfTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIHNob3c6IE9iamVjdC5hc3NpZ24oc2hvdywge1xyXG4gICAgaW5mbzogKGh0bWwsIG9iaiA9IHt9KSA9PiBzaG93KGh0bWwsIHsgLi4ub2JqLCBzdHlsZTogXCJpbmZvXCIgfSksXHJcbiAgICBlcnJvcjogKGh0bWwsIG9iaiA9IHt9KSA9PiBzaG93KGh0bWwsIHsgLi4ub2JqLCBzdHlsZTogXCJlcnJvclwiIH0pLFxyXG4gICAgd2FybmluZzogKGh0bWwsIG9iaiA9IHt9KSA9PiBzaG93KGh0bWwsIHsgLi4ub2JqLCBzdHlsZTogXCJ3YXJuaW5nXCIgfSksXHJcbiAgICBzdWNjZXNzOiAoaHRtbCwgb2JqID0ge30pID0+IHNob3coaHRtbCwgeyAuLi5vYmosIHN0eWxlOiBcInN1Y2Nlc3NcIiB9KSxcclxuICB9KSxcclxufTsiLCAiaW1wb3J0IHdlYnBhY2sgZnJvbSBcIi4uL21vZHVsZXMvd2VicGFjay5qc1wiO1xyXG5pbXBvcnQgcGF0Y2hlciBmcm9tIFwiLi4vcGF0Y2hlci9pbmRleC5qc1wiO1xyXG5pbXBvcnQgbG9nZ2VyIGZyb20gXCIuLi91dGlscy9sb2dnZXIuanNcIjtcclxuXHJcbmltcG9ydCBjb21tb24gZnJvbSBcIi4uL21vZHVsZXMvY29tbW9uLmpzXCI7XHJcbmltcG9ydCB7IGZpbmRlck1hcCB9IGZyb20gXCIuLi9tb2R1bGVzL3Jhdy9jb21wbGV4LWZpbmRlci5qc1wiO1xyXG5cclxuY29uc3QgeyBSZWFjdCB9ID0gY29tbW9uO1xyXG5cclxubGV0IGlzUmVhZHkgPSBmYWxzZTtcclxuXHJcbmxldCBDb21wb25lbnRzID0gbnVsbDtcclxuXHJcbmxldCBBY3Rpb25zID0gbnVsbDtcclxuXHJcbihhc3luYyAoKSA9PiB7XHJcbiAgQWN0aW9ucyA9IGF3YWl0IChhc3luYyAoKSA9PiB7XHJcbiAgICBsZXQgb2dNb2R1bGU7XHJcbiAgICB3aGlsZSAodHJ1ZSkge1xyXG4gICAgICBvZ01vZHVsZSA9IHdlYnBhY2suZmlsdGVyKG0gPT4gT2JqZWN0LnZhbHVlcyhtKS5zb21lKHYgPT4gdHlwZW9mIHYgPT09IFwiZnVuY3Rpb25cIiAmJiB2LnRvU3RyaW5nKCkuaW5jbHVkZXMoXCJDT05URVhUX01FTlVfQ0xPU0VcIikpKS5maW5kKG0gPT4gbS5leHBvcnRzICE9PSB3aW5kb3cpPy5leHBvcnRzO1xyXG4gICAgICBpZiAob2dNb2R1bGUpIGJyZWFrO1xyXG4gICAgICBhd2FpdCBuZXcgUHJvbWlzZShyID0+IHNldFRpbWVvdXQociwgMTAwKSk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBvdXQgPSBmaW5kZXJNYXAob2dNb2R1bGUsIHtcclxuICAgICAgY2xvc2U6IFtcIkNPTlRFWFRfTUVOVV9DTE9TRVwiXSxcclxuICAgICAgb3BlbjogW1wicmVuZGVyTGF6eVwiXVxyXG4gICAgfSk7XHJcblxyXG4gICAgaXNSZWFkeSA9ICEhb3V0LmNsb3NlICYmICEhb3V0Lm9wZW47XHJcbiAgICByZXR1cm4gb3V0O1xyXG4gIH0pKCk7XHJcblxyXG4gIENvbXBvbmVudHMgPSBhd2FpdCAoYXN5bmMgKCkgPT4ge1xyXG4gICAgY29uc3Qgb3V0ID0ge307XHJcbiAgICBjb25zdCBjb21wb25lbnRNYXAgPSB7XHJcbiAgICAgIHNlcGFyYXRvcjogXCJTZXBhcmF0b3JcIixcclxuICAgICAgY2hlY2tib3g6IFwiQ2hlY2tib3hJdGVtXCIsXHJcbiAgICAgIHJhZGlvOiBcIlJhZGlvSXRlbVwiLFxyXG4gICAgICBjb250cm9sOiBcIkNvbnRyb2xJdGVtXCIsXHJcbiAgICAgIGdyb3Vwc3RhcnQ6IFwiR3JvdXBcIixcclxuICAgICAgY3VzdG9taXRlbTogXCJJdGVtXCJcclxuICAgIH07XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgbGV0IG1vZHVsZUlkO1xyXG4gICAgICB3aGlsZSAodHJ1ZSkge1xyXG4gICAgICAgIG1vZHVsZUlkID0gT2JqZWN0LmVudHJpZXMod2VicGFjay5yZXF1aXJlLm0pLmZpbmQoKFssIG1dKSA9PiBtPy50b1N0cmluZygpLmluY2x1ZGVzKFwibWVudWl0ZW1jaGVja2JveFwiKSlbMF1cclxuICAgICAgICBpZiAobW9kdWxlSWQpIGJyZWFrO1xyXG4gICAgICAgIGF3YWl0IG5ldyBQcm9taXNlKHIgPT4gc2V0VGltZW91dChyLCAxMDApKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgY29udGV4dE1lbnVNb2R1bGUgPSB3ZWJwYWNrLmZpbmQoKF8sIGlkeCkgPT4gaWR4ID09IG1vZHVsZUlkKS5leHBvcnRzO1xyXG5cclxuICAgICAgY29uc3QgbW9kdWxlU3RyaW5nID0gd2VicGFjay5yZXF1aXJlLm1bbW9kdWxlSWRdLnRvU3RyaW5nKCk7XHJcbiAgICAgIGNvbnN0IHJhd01hdGNoZXMgPSBtb2R1bGVTdHJpbmcubWF0Y2hBbGwoL2lmXFwoXFx3K1xcLnR5cGU9PT0oPzpcXHcrXFwuKT8oXFx3KylcXCkuKz90eXBlOlwiKC4rPylcIi9ncyk7XHJcblxyXG4gICAgICBvdXQuTWVudSA9IE9iamVjdC52YWx1ZXMoY29udGV4dE1lbnVNb2R1bGUpLmZpbmQodiA9PiB2LnRvU3RyaW5nKCkuaW5jbHVkZXMoXCIuaXNVc2luZ0tleWJvYXJkTmF2aWdhdGlvblwiKSk7XHJcblxyXG4gICAgICBbLi4ucmF3TWF0Y2hlc10uZm9yRWFjaCgoWywgZnVuY3Rpb25OYW1lLCB0eXBlXSkgPT4ge1xyXG4gICAgICAgIGxldCBtb2R1bGVLZXkgPSBtb2R1bGVTdHJpbmcubWF0Y2gobmV3IFJlZ0V4cChuZXcgUmVnRXhwKGAoXFxcXHcrKTpcXFxcKFxcXFwpXFxcXD1cXFxcPiR7ZnVuY3Rpb25OYW1lfWApKSk/LlsxXVxyXG4gICAgICAgIG91dFtjb21wb25lbnRNYXBbdHlwZV1dID0gY29udGV4dE1lbnVNb2R1bGVbbW9kdWxlS2V5XTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpc1JlYWR5ID0gT2JqZWN0LmtleXMob3V0KS5sZW5ndGggPiAxO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGlzUmVhZHkgPSBmYWxzZTtcclxuICAgICAgbG9nZ2VyLmVycm9yKFwiRmFpbGVkIHRvIGxvYWQgY29udGV4dCBtZW51IGNvbXBvbmVudHNcIiwgZXJyKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gb3V0O1xyXG4gIH0pKCk7XHJcblxyXG4gIE1lbnVQYXRjaGVyLmluaXRpYWxpemUoKTtcclxufSkoKTtcclxuXHJcblxyXG5jbGFzcyBNZW51UGF0Y2hlciB7XHJcbiAgc3RhdGljIE1BWF9QQVRDSF9JVEVSQVRJT05TID0gMTY7XHJcbiAgc3RhdGljIHBhdGNoZXMgPSBuZXcgTWFwKCk7XHJcbiAgc3RhdGljIHN1YlBhdGNoZXMgPSBuZXcgV2Vha01hcCgpO1xyXG5cclxuICBzdGF0aWMgaW5pdGlhbGl6ZSgpIHtcclxuICAgIGlmICghaXNSZWFkeSkgcmV0dXJuIGxvZ2dlci53YXJuKFwiVW5hYmxlIHRvIGxvYWQgY29udGV4dCBtZW51LlwiKTtcclxuXHJcbiAgICBjb25zdCBtb2R1bGVUb1BhdGNoID0gd2VicGFjay5maWx0ZXIobSA9PiBPYmplY3QudmFsdWVzKG0pLnNvbWUodiA9PiB0eXBlb2YgdiA9PT0gXCJmdW5jdGlvblwiICYmIHYudG9TdHJpbmcoKS5pbmNsdWRlcyhcIkNPTlRFWFRfTUVOVV9DTE9TRVwiKSkpLmZpbmQobSA9PiBtLmV4cG9ydHMgIT09IHdpbmRvdykuZXhwb3J0cztcclxuICAgIGNvbnN0IGtleVRvUGF0Y2ggPSBPYmplY3Qua2V5cyhtb2R1bGVUb1BhdGNoKS5maW5kKGsgPT4gbW9kdWxlVG9QYXRjaFtrXT8ubGVuZ3RoID09PSAzKTtcclxuXHJcbiAgICBwYXRjaGVyLmJlZm9yZShcclxuICAgICAga2V5VG9QYXRjaCxcclxuICAgICAgbW9kdWxlVG9QYXRjaCxcclxuICAgICAgZnVuY3Rpb24gKG1ldGhvZEFyZ3MpIHtcclxuICAgICAgICBjb25zdCBwcm9taXNlID0gbWV0aG9kQXJnc1sxXTtcclxuICAgICAgICBtZXRob2RBcmdzWzFdID0gYXN5bmMgZnVuY3Rpb24gKC4uLmFyZ3MpIHtcclxuICAgICAgICAgIGNvbnN0IHJlbmRlciA9IGF3YWl0IHByb21pc2UuY2FsbCh0aGlzLCAuLi5hcmdzKTtcclxuXHJcbiAgICAgICAgICByZXR1cm4gKHByb3BzKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlcyA9IHJlbmRlcihwcm9wcyk7XHJcblxyXG4gICAgICAgICAgICBpZiAocmVzPy5wcm9wcy5uYXZJZCkge1xyXG4gICAgICAgICAgICAgIE1lbnVQYXRjaGVyLmV4ZWN1dGVQYXRjaGVzKHJlcy5wcm9wcy5uYXZJZCwgcmVzLCBwcm9wcyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHJlcz8udHlwZSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgICAgICAgTWVudVBhdGNoZXIucGF0Y2hSZWN1cnNpdmUocmVzLCBcInR5cGVcIik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZXM7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbWV0aG9kQXJncztcclxuICAgICAgfVxyXG4gICAgKVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIHBhdGNoUmVjdXJzaXZlKHRhcmdldCwgbWV0aG9kLCBpdGVyYXRpb24gPSAwKSB7XHJcbiAgICBpZiAoaXRlcmF0aW9uID49IHRoaXMuTUFYX1BBVENIX0lURVJBVElPTlMpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBwcm94eUZ1bmN0aW9uID0gdGhpcy5zdWJQYXRjaGVzLmdldCh0YXJnZXRbbWV0aG9kXSkgPz8gKCgpID0+IHtcclxuICAgICAgY29uc3Qgb3JpZ2luYWxGdW5jdGlvbiA9IHRhcmdldFttZXRob2RdO1xyXG4gICAgICBjb25zdCBkZXB0aCA9ICsraXRlcmF0aW9uO1xyXG4gICAgICBmdW5jdGlvbiBwYXRjaCguLi5hcmdzKSB7XHJcbiAgICAgICAgY29uc3QgcmVzID0gb3JpZ2luYWxGdW5jdGlvbi5jYWxsKHRoaXMsIC4uLmFyZ3MpO1xyXG5cclxuICAgICAgICBpZiAoIXJlcykgcmV0dXJuIHJlcztcclxuXHJcbiAgICAgICAgY29uc3QgbmF2SWQgPSByZXMucHJvcHM/Lm5hdklkID8/IHJlcy5wcm9wcz8uY2hpbGRyZW4/LnByb3BzPy5uYXZJZDtcclxuICAgICAgICBpZiAobmF2SWQpIHtcclxuICAgICAgICAgIE1lbnVQYXRjaGVyLmV4ZWN1dGVQYXRjaGVzKG5hdklkLCByZXMsIGFyZ3NbMF0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb25zdCBsYXllciA9IHJlcy5wcm9wcy5jaGlsZHJlbiA/IHJlcy5wcm9wcy5jaGlsZHJlbiA6IHJlcztcclxuXHJcbiAgICAgICAgICBpZiAodHlwZW9mIGxheWVyPy50eXBlID09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgICAgICBNZW51UGF0Y2hlci5wYXRjaFJlY3Vyc2l2ZShsYXllciwgXCJ0eXBlXCIsIGRlcHRoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiByZXM7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHBhdGNoLl9fb3JpZ2luYWxfXyA9IG9yaWdpbmFsRnVuY3Rpb247XHJcbiAgICAgIE9iamVjdC5hc3NpZ24ocGF0Y2gsIG9yaWdpbmFsRnVuY3Rpb24pO1xyXG4gICAgICB0aGlzLnN1YlBhdGNoZXMuc2V0KG9yaWdpbmFsRnVuY3Rpb24sIHBhdGNoKTtcclxuXHJcbiAgICAgIHJldHVybiBwYXRjaDtcclxuICAgIH0pKCk7XHJcblxyXG4gICAgdGFyZ2V0W21ldGhvZF0gPSBwcm94eUZ1bmN0aW9uO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGV4ZWN1dGVQYXRjaGVzKGlkLCByZXMsIHByb3BzKSB7XHJcbiAgICBpZiAoIXRoaXMucGF0Y2hlcy5oYXMoaWQpKSByZXR1cm47XHJcblxyXG4gICAgdGhpcy5wYXRjaGVzLmdldChpZCkuZm9yRWFjaChwYXRjaCA9PiB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgcGF0Y2gocmVzLCBwcm9wcyk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGxvZ2dlci5lcnJvcihcIkZhaWxlZCB0byBwYXRjaCBjb250ZXh0IG1lbnVcIiwgcGF0Y2gsIGVycik7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG5cclxuXHJcbi8vIENvcGllZCBmcm9tIGJkJ3Mgc291cmNlXHJcbmZ1bmN0aW9uIGJ1aWxkSXRlbShwcm9wcykge1xyXG4gIGNvbnN0IHsgdHlwZSB9ID0gcHJvcHM7XHJcbiAgaWYgKHR5cGUgPT09IFwic2VwYXJhdG9yXCIpIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KENvbXBvbmVudHMuU2VwYXJhdG9yKTtcclxuXHJcbiAgbGV0IGNvbXBvbmVudCA9IENvbXBvbmVudHMuSXRlbTtcclxuICBpZiAodHlwZSA9PT0gXCJzdWJtZW51XCIpIHtcclxuICAgIGlmICghcHJvcHMuY2hpbGRyZW4pIHByb3BzLmNoaWxkcmVuID0gYnVpbGRNZW51Q2hpbGRyZW4ocHJvcHMucmVuZGVyIHx8IHByb3BzLml0ZW1zKTtcclxuICB9IGVsc2UgaWYgKHR5cGUgPT09IFwidG9nZ2xlXCIgfHwgdHlwZSA9PT0gXCJyYWRpb1wiKSB7XHJcbiAgICBjb21wb25lbnQgPSB0eXBlID09PSBcInRvZ2dsZVwiID8gQ29tcG9uZW50cy5DaGVja2JveEl0ZW0gOiBDb21wb25lbnRzLlJhZGlvSXRlbTtcclxuICAgIGlmIChwcm9wcy5hY3RpdmUpIHByb3BzLmNoZWNrZWQgPSBwcm9wcy5hY3RpdmU7XHJcbiAgfSBlbHNlIGlmICh0eXBlID09PSBcImNvbnRyb2xcIikge1xyXG4gICAgY29tcG9uZW50ID0gQ29tcG9uZW50cy5Db250cm9sSXRlbTtcclxuICB9XHJcbiAgaWYgKCFwcm9wcy5pZCkgcHJvcHMuaWQgPSBgJHtwcm9wcy5sYWJlbC5yZXBsYWNlKC9eW15hLXpdK3xbXlxcdy1dKy9naSwgXCItXCIpfWA7XHJcbiAgaWYgKHByb3BzLmRhbmdlcikgcHJvcHMuY29sb3IgPSBcImRhbmdlclwiO1xyXG4gIHByb3BzLmV4dGVuZGVkID0gdHJ1ZTtcclxuXHJcbiAgaWYgKHR5cGUgPT09IFwidG9nZ2xlXCIpIHtcclxuICAgIGNvbnN0IFthY3RpdmUsIGRvVG9nZ2xlXSA9IFJlYWN0LnVzZVN0YXRlKHByb3BzLmNoZWNrZWQgfHwgZmFsc2UpO1xyXG4gICAgY29uc3Qgb3JpZ2luYWxBY3Rpb24gPSBwcm9wcy5hY3Rpb247XHJcbiAgICBwcm9wcy5jaGVja2VkID0gYWN0aXZlO1xyXG4gICAgcHJvcHMuYWN0aW9uID0gZnVuY3Rpb24gKGV2KSB7XHJcbiAgICAgIG9yaWdpbmFsQWN0aW9uKGV2KTtcclxuICAgICAgZG9Ub2dnbGUoIWFjdGl2ZSk7XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoY29tcG9uZW50LCBwcm9wcyk7XHJcbn1cclxuXHJcbi8vIENvcGllZCBmcm9tIGJkJ3Mgc291cmNlXHJcbmZ1bmN0aW9uIGJ1aWxkTWVudUNoaWxkcmVuKHNldHVwKSB7XHJcbiAgY29uc3QgbWFwcGVyID0gcyA9PiB7XHJcbiAgICBpZiAocy50eXBlID09PSBcImdyb3VwXCIpIHJldHVybiBidWlsZEdyb3VwKHMpO1xyXG4gICAgcmV0dXJuIGJ1aWxkSXRlbShzKTtcclxuICB9O1xyXG4gIGNvbnN0IGJ1aWxkR3JvdXAgPSBmdW5jdGlvbiAoZ3JvdXApIHtcclxuICAgIGNvbnN0IGl0ZW1zID0gZ3JvdXAuaXRlbXMubWFwKG1hcHBlcikuZmlsdGVyKGkgPT4gaSk7XHJcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChDb21wb25lbnRzLkdyb3VwLCBudWxsLCBpdGVtcyk7XHJcbiAgfTtcclxuICByZXR1cm4gc2V0dXAubWFwKG1hcHBlcikuZmlsdGVyKGkgPT4gaSk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBfX2NhY2hlX186IHtcclxuICAgIHBhdGNoZXM6IE1lbnVQYXRjaGVyLnBhdGNoZXMsXHJcbiAgICBzdWJQYXRjaGVzOiBNZW51UGF0Y2hlci5zdWJQYXRjaGVzXHJcbiAgfSxcclxuICBwYXRjaChuYXZJZCwgY2IpIHtcclxuICAgIGlmICghTWVudVBhdGNoZXIucGF0Y2hlcy5oYXMobmF2SWQpKSBNZW51UGF0Y2hlci5wYXRjaGVzLnNldChuYXZJZCwgbmV3IFNldCgpKTtcclxuICAgIE1lbnVQYXRjaGVyLnBhdGNoZXMuZ2V0KG5hdklkKS5hZGQoY2IpO1xyXG5cclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIE1lbnVQYXRjaGVyLnBhdGNoZXMuZ2V0KG5hdklkKS5kZWxldGUoY2IpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgb3BlbihldmVudCwgY29tcG9uZW50LCBjb25maWcpIHtcclxuICAgIHJldHVybiBBY3Rpb25zLm9wZW4oZXZlbnQsIChlKSA9PiBSZWFjdC5jcmVhdGVFbGVtZW50KGNvbXBvbmVudCwgT2JqZWN0LmFzc2lnbih7fSwgZSwgeyBvbkNsb3NlOiBBY3Rpb25zLmNsb3NlIH0pKSwgY29uZmlnKTtcclxuICB9LFxyXG4gIGNsb3NlKCkge1xyXG4gICAgcmV0dXJuIEFjdGlvbnMuY2xvc2UoKTtcclxuICB9LFxyXG4gIGJ1aWxkOiB7XHJcbiAgICBpdGVtKHNldHVwKSB7XHJcbiAgICAgIHJldHVybiBidWlsZE1lbnVDaGlsZHJlbihbc2V0dXBdKTtcclxuICAgIH0sXHJcbiAgICBtZW51KHNldHVwKSB7XHJcbiAgICAgIHJldHVybiAocHJvcHMpID0+IFJlYWN0LmNyZWF0ZUVsZW1lbnQoQ29tcG9uZW50cy5NZW51LCBwcm9wcywgYnVpbGRNZW51Q2hpbGRyZW4oc2V0dXApKTtcclxuICAgIH1cclxuICB9XHJcbn07IiwgImltcG9ydCBjb21tb24gZnJvbSBcIi4uLy4uL2FwaS9tb2R1bGVzL2NvbW1vblwiO1xyXG5pbXBvcnQgbG9nZ2VyIGZyb20gXCIuLi8uLi9hcGkvdXRpbHMvbG9nZ2VyLmpzXCI7XHJcbmNvbnN0IHsgUmVhY3QgfSA9IGNvbW1vbjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVycm9yQm91bmRhcnkgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcbiAgICB0aGlzLnN0YXRlID0geyBlcnJvcjogbnVsbCB9O1xyXG4gIH1cclxuXHJcbiAgY29tcG9uZW50RGlkQ2F0Y2goZXJyb3IpIHtcclxuICAgIHRoaXMuc2V0U3RhdGUoeyBlcnJvciB9KTtcclxuICAgIGxvZ2dlci5lcnJvcihlcnJvcik7XHJcbiAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMub25FcnJvciA9PT0gXCJmdW5jdGlvblwiKSB0aGlzLnByb3BzLm9uRXJyb3IoZXJyb3IpO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgaWYgKHRoaXMuc3RhdGUuZXJyb3IpIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImFjb3JkLS1yZWFjdC1lcnJvclwiPlxyXG4gICAgICA8cD5VbmV4cGVjdGVkIFJlYWN0IEVycm9yIEhhcHBlbmVkLjwvcD5cclxuICAgICAgPHA+e2Ake3RoaXMuc3RhdGUuZXJyb3J9YH08L3A+XHJcbiAgICA8L2Rpdj47XHJcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5jaGlsZHJlbjtcclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IG9yaWdpbmFsUmVuZGVyID0gRXJyb3JCb3VuZGFyeS5wcm90b3R5cGUucmVuZGVyO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoRXJyb3JCb3VuZGFyeS5wcm90b3R5cGUsIFwicmVuZGVyXCIsIHtcclxuICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICBjb25maWd1cmFibGU6IGZhbHNlLFxyXG4gIHNldDogZnVuY3Rpb24gKCkgeyB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3Qgc2V0IHJlbmRlciBtZXRob2Qgb2YgRXJyb3JCb3VuZGFyeVwiKTsgfSxcclxuICBnZXQ6ICgpID0+IG9yaWdpbmFsUmVuZGVyXHJcbn0pOyIsICJpbXBvcnQgRXJyb3JCb3VuZGFyeSBmcm9tIFwiLi4vLi4vbGliL2NvbXBvbmVudHMvRXJyb3JCb3VuZGFyeS5qc3hcIjtcclxuaW1wb3J0IGNvbW1vbiBmcm9tIFwiLi4vbW9kdWxlcy9jb21tb24uanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBFcnJvckJvdW5kYXJ5LFxyXG4gIEJ1dHRvbjogY29tbW9uLmNvbXBvbmVudHMuQnV0dG9uLFxyXG4gIE1hcmtkb3duOiBjb21tb24uY29tcG9uZW50cy5NYXJrZG93bixcclxuICBUZXh0OiBjb21tb24uY29tcG9uZW50cy5UZXh0LFxyXG4gIENvbmZpcm1hdGlvbk1vZGFsOiBjb21tb24uY29tcG9uZW50cy5Db25maXJtYXRpb25Nb2RhbCxcclxuICBNb2RhbFJvb3Q6IGNvbW1vbi5tb2RhbHMuY29tcG9uZW50cy5Sb290LFxyXG4gIE1vZGFsQ2xvc2VCdXR0b246IGNvbW1vbi5tb2RhbHMuY29tcG9uZW50cy5vdGhlci5DbG9zZUJ1dHRvbixcclxuICBNb2RhbEhlYWRlcjogY29tbW9uLm1vZGFscy5jb21wb25lbnRzLm90aGVyLkhlYWRlcixcclxuICBNb2RhbENvbnRlbnQ6IGNvbW1vbi5tb2RhbHMuY29tcG9uZW50cy5vdGhlci5Db250ZW50LFxyXG4gIE1vZGFsRm9vdGVyOiBjb21tb24ubW9kYWxzLmNvbXBvbmVudHMub3RoZXIuRm9vdGVyLFxyXG4gIE1vZGFsTGlzdENvbnRlbnQ6IGNvbW1vbi5tb2RhbHMuY29tcG9uZW50cy5vdGhlci5MaXN0Q29udGVudCxcclxuICBUb29sdGlwOiBjb21tb24uY29tcG9uZW50cy5Ub29sdGlwLFxyXG59IiwgImltcG9ydCBFcnJvckJvdW5kYXJ5IGZyb20gXCIuLi8uLi9saWIvY29tcG9uZW50cy9FcnJvckJvdW5kYXJ5LmpzeFwiO1xyXG5pbXBvcnQgY29tbW9uIGZyb20gXCIuLi9tb2R1bGVzL2NvbW1vbi5qc1wiO1xyXG5pbXBvcnQgaTE4biBmcm9tIFwiLi4vaTE4bi9pbmRleC5qc1wiXHJcbmNvbnN0IHsgUmVhY3QsIEZsdXhEaXNwYXRjaGVyLCBjb21wb25lbnRzLCBtb2RhbHMsIFVzZXJTdG9yZSB9ID0gY29tbW9uO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIHNob3c6IHtcclxuICAgIGNvbmZpcm1hdGlvbih0aXRsZSwgY29udGVudCwgeyBjb25maXJtID0gbnVsbCwgY2FuY2VsID0gbnVsbCwgZGFuZ2VyID0gZmFsc2UsIGtleSA9IHVuZGVmaW5lZCwgdGltZW91dCA9IDYwMDAwICogNSB9ID0ge30pIHtcclxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGNvbnRlbnQpKSBjb250ZW50ID0gW2NvbnRlbnRdO1xyXG4gICAgICAgIGNvbnRlbnQgPSBjb250ZW50Lm1hcChpID0+IHR5cGVvZiBpID09PSBcInN0cmluZ1wiID8gUmVhY3QuY3JlYXRlRWxlbWVudChjb21wb25lbnRzLk1hcmtkb3duLCBudWxsLCBpKSA6IGkpO1xyXG4gICAgICAgIGNvbnN0IG1vZGFsS2V5ID0gbW9kYWxzLmFjdGlvbnMub3BlbigocHJvcHMpID0+IHtcclxuICAgICAgICAgIGxldCBpbnRlcmFjdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICByZXR1cm4gPEVycm9yQm91bmRhcnkgb25FcnJvcj17KCkgPT4geyByZXNvbHZlKGZhbHNlKTsgfX0+XHJcbiAgICAgICAgICAgIDxjb21wb25lbnRzLkNvbmZpcm1hdGlvbk1vZGFsXHJcbiAgICAgICAgICAgICAgaGVhZGVyPXt0aXRsZX1cclxuICAgICAgICAgICAgICBjb25maXJtQnV0dG9uQ29sb3I9e2RhbmdlciA/IGNvbXBvbmVudHMuQnV0dG9uLkNvbG9ycy5SRUQgOiBjb21wb25lbnRzLkJ1dHRvbi5Db2xvcnMuQlJBTkR9XHJcbiAgICAgICAgICAgICAgY29uZmlybVRleHQ9e2NvbmZpcm0gfHwgaTE4bi5mb3JtYXQoXCJDT05GSVJNXCIpfVxyXG4gICAgICAgICAgICAgIGNhbmNlbFRleHQ9e2NhbmNlbH1cclxuICAgICAgICAgICAgICBvbkNhbmNlbD17KCkgPT4geyByZXNvbHZlKGZhbHNlKTsgbW9kYWxzLmFjdGlvbnMuY2xvc2UobW9kYWxLZXkpOyBpbnRlcmFjdGVkID0gdHJ1ZTsgfX1cclxuICAgICAgICAgICAgICBvbkNvbmZpcm09eygpID0+IHsgcmVzb2x2ZSh0cnVlKTsgbW9kYWxzLmFjdGlvbnMuY2xvc2UobW9kYWxLZXkpOyBpbnRlcmFjdGVkID0gdHJ1ZTsgfX1cclxuICAgICAgICAgICAgICB7Li4ucHJvcHN9XHJcbiAgICAgICAgICAgICAgb25DbG9zZT17KCkgPT4geyBwcm9wcy5vbkNsb3NlKCk7IHJlc29sdmUoZmFsc2UpOyBtb2RhbHMuYWN0aW9ucy5jbG9zZShtb2RhbEtleSk7IH19XHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICA8RXJyb3JCb3VuZGFyeSBvbkVycm9yPXsoKSA9PiB7IHJlc29sdmUoZmFsc2UpOyB9fT5cclxuICAgICAgICAgICAgICAgIHtjb250ZW50fVxyXG4gICAgICAgICAgICAgIDwvRXJyb3JCb3VuZGFyeT5cclxuICAgICAgICAgICAgPC9jb21wb25lbnRzLkNvbmZpcm1hdGlvbk1vZGFsPlxyXG4gICAgICAgICAgPC9FcnJvckJvdW5kYXJ5PlxyXG4gICAgICAgIH0sIHsgbW9kYWxLZXk6IGtleSB9KTtcclxuICAgICAgICBpZiAodGltZW91dCkge1xyXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghaW50ZXJhY3RlZCkge1xyXG4gICAgICAgICAgICAgIHJlc29sdmUoZmFsc2UpO1xyXG4gICAgICAgICAgICAgIG1vZGFscy5hY3Rpb25zLmNsb3NlKG1vZGFsS2V5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSwgdGltZW91dCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICB1c2VyKHVzZXJJZCkge1xyXG4gICAgICBpZiAoIVVzZXJTdG9yZS5nZXRVc2VyKHVzZXJJZCkpIHJldHVybiBmYWxzZTtcclxuICAgICAgRmx1eERpc3BhdGNoZXIuZGlzcGF0Y2goeyB0eXBlOiBcIlVTRVJfUFJPRklMRV9NT0RBTF9PUEVOXCIsIHVzZXJJZCB9KTtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9LFxyXG4gICAgYWxlcnQodGl0bGUsIGNvbnRlbnQsIHsgY29uZmlybSA9IG51bGwsIGtleSA9IHVuZGVmaW5lZCwgdGltZW91dCA9IDYwMDAwICogNSB9ID0ge30pIHtcclxuICAgICAgcmV0dXJuIHRoaXMuY29uZmlybWF0aW9uKHRpdGxlLCBjb250ZW50LCB7IGNvbmZpcm0sIGNhbmNlbDogbnVsbCwga2V5LCB0aW1lb3V0IH0pO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgY2xvc2Uoa2V5KSB7XHJcbiAgICByZXR1cm4gbW9kYWxzLmFjdGlvbnMuY2xvc2Uoa2V5KTtcclxuICB9XHJcbn0iLCAiaW1wb3J0IGRvbSBmcm9tIFwiLi4vZG9tL2luZGV4LmpzXCI7XHJcblxyXG5mdW5jdGlvbiBnZXRDb250YWluZXIoKSB7XHJcbiAgY29uc3QgYXBwRWxtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2NsYXNzKj1cIm5vdEFwcEFzaWRlUGFuZWwtXCJdJyk7XHJcblxyXG4gIGxldCB0b3BDb250YWluZXIgPSBhcHBFbG0ucXVlcnlTZWxlY3RvcihcIi5hY29yZC0tdG9hc3RzLWNvbnRhaW5lclwiKTtcclxuICBpZiAoIXRvcENvbnRhaW5lcikge1xyXG4gICAgdG9wQ29udGFpbmVyID0gZG9tLnBhcnNlKGA8ZGl2IGNsYXNzPVwiYWNvcmQtLWxheWVyLWNvbnRhaW5lciBhY29yZC0tdG9hc3RzLWNvbnRhaW5lclwiPjwvZGl2PmApO1xyXG4gICAgYXBwRWxtLmFwcGVuZENoaWxkKHRvcENvbnRhaW5lcik7XHJcbiAgfVxyXG4gIHRvcENvbnRhaW5lci5zdHlsZS5zZXRQcm9wZXJ0eShcIi0tdG9wLW9mZnNldFwiLCBgJHthcHBFbG0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wLnRvRml4ZWQoMSl9cHhgKTtcclxuXHJcbiAgcmV0dXJuIHRvcENvbnRhaW5lcjtcclxufVxyXG5cclxuY29uc3QgaWNvbnMgPSB7XHJcbiAgaW5mbzogYDxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiPjxwYXRoIGQ9XCJNMTIgMjJDNi40NzcgMjIgMiAxNy41MjMgMiAxMlM2LjQ3NyAyIDEyIDJzMTAgNC40NzcgMTAgMTAtNC40NzcgMTAtMTAgMTB6bS0xLTExdjZoMnYtNmgtMnptMC00djJoMlY3aC0yelwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIiAvPjwvc3ZnPmAsXHJcbiAgd2FybmluZzogYDxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiPjxwYXRoIGQ9XCJNMTIgMjJDNi40NzcgMjIgMiAxNy41MjMgMiAxMlM2LjQ3NyAyIDEyIDJzMTAgNC40NzcgMTAgMTAtNC40NzcgMTAtMTAgMTB6bS0xLTd2Mmgydi0yaC0yem0wLTh2NmgyVjdoLTJ6XCIgZmlsbD1cImN1cnJlbnRDb2xvclwiIC8+PC9zdmc+YCxcclxuICBlcnJvcjogYDxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiPjxwYXRoIGQ9XCJNMTIgMjJDNi40NzcgMjIgMiAxNy41MjMgMiAxMlM2LjQ3NyAyIDEyIDJzMTAgNC40NzcgMTAgMTAtNC40NzcgMTAtMTAgMTB6bS0xLTd2Mmgydi0yaC0yem0wLTh2NmgyVjdoLTJ6XCJmaWxsPVwiY3VycmVudENvbG9yXCIgLz48L3N2Zz5gLFxyXG4gIHN1Y2Nlc3M6IGA8c3ZnIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMjRcIj48cGF0aCBkPVwiTTEyIDIyQzYuNDc3IDIyIDIgMTcuNTIzIDIgMTJTNi40NzcgMiAxMiAyczEwIDQuNDc3IDEwIDEwLTQuNDc3IDEwLTEwIDEwem0tLjk5Ny02bDcuMDctNy4wNzEtMS40MTQtMS40MTQtNS42NTYgNS42NTctMi44MjktMi44MjktMS40MTQgMS40MTRMMTEuMDAzIDE2elwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIiAvPjwvc3ZnPmBcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIHNob3coXHJcbiAgY29udGVudCxcclxuICB7XHJcbiAgICBzdHlsZSA9IFwiZGVmYXVsdFwiLFxyXG4gICAgdGltZW91dCA9IDM1MDAsXHJcbiAgICBvbkNsaWNrID0gbnVsbCxcclxuICAgIGhpZGVJY29uID0gZmFsc2VcclxuICB9ID0ge31cclxuKSB7XHJcbiAgY29uc3QgY29udGFpbmVyID0gZ2V0Q29udGFpbmVyKCk7XHJcblxyXG4gIGNvbnN0IHRvYXN0RWxtID0gZG9tLnBhcnNlKGBcclxuICAgIDxkaXYgY2xhc3M9XCJhY29yZC0tdG9hc3Qgc3R5bGUtJHtzdHlsZX0gaGlkZGVuXCI+XHJcbiAgICAgICR7aGlkZUljb24gPyBcIlwiIDogKGljb25zW3N0eWxlXSB8fCBcIlwiKX1cclxuICAgICAgPGRpdiBjbGFzcz1cImNvbnRlbnRcIj48L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIGApO1xyXG5cclxuICB0b2FzdEVsbS5xdWVyeVNlbGVjdG9yKFwiLmNvbnRlbnRcIikuaW5uZXJIVE1MID0gY29udGVudDtcclxuXHJcbiAgbGV0IGNsb3NlZCA9IGZhbHNlO1xyXG4gIGZ1bmN0aW9uIGNsb3NlKCkge1xyXG4gICAgaWYgKGNsb3NlZCkgcmV0dXJuO1xyXG4gICAgY2xvc2VkID0gdHJ1ZTtcclxuXHJcbiAgICB0b2FzdEVsbS5jbGFzc0xpc3QuYWRkKFwiY2xvc2luZ1wiKTtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICB0b2FzdEVsbS5yZW1vdmUoKTtcclxuXHJcbiAgICAgIHV0aWxzLmlmRXhpc3RzKFxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5hY29yZC0tdG9hc3RzLWNvbnRhaW5lcmApLFxyXG4gICAgICAgIC8qKiBAcGFyYW0ge0hUTUxEaXZFbGVtZW50fSBlbG0gKi8oZWxtKSA9PiB7XHJcbiAgICAgICAgICBpZiAoIWVsbS5jaGlsZEVsZW1lbnRDb3VudCkgZWxtLnJlbW92ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgKTtcclxuICAgIH0sIDI3NSk7XHJcbiAgfVxyXG5cclxuICBpZiAodHlwZW9mIG9uQ2xpY2sgPT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICB0b2FzdEVsbS5jbGFzc0xpc3QuYWRkKFwiY2xpY2thYmxlXCIpO1xyXG4gICAgdG9hc3RFbG0ub25jbGljayA9ICgpID0+IHtcclxuICAgICAgb25DbGljayhjbG9zZSk7XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKHRvYXN0RWxtKTtcclxuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xyXG4gICAgdG9hc3RFbG0uY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcclxuICB9KTtcclxuXHJcbiAgc2V0VGltZW91dChjbG9zZSwgdGltZW91dCk7XHJcblxyXG4gIHJldHVybiAoKSA9PiB7XHJcbiAgICBjbG9zZSgpO1xyXG4gIH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBzaG93OiBPYmplY3QuYXNzaWduKHNob3csIHtcclxuICAgIGluZm86IChodG1sLCBvYmogPSB7fSkgPT4gc2hvdyhodG1sLCB7IC4uLm9iaiwgc3R5bGU6IFwiaW5mb1wiIH0pLFxyXG4gICAgZXJyb3I6IChodG1sLCBvYmogPSB7fSkgPT4gc2hvdyhodG1sLCB7IC4uLm9iaiwgc3R5bGU6IFwiZXJyb3JcIiB9KSxcclxuICAgIHdhcm5pbmc6IChodG1sLCBvYmogPSB7fSkgPT4gc2hvdyhodG1sLCB7IC4uLm9iaiwgc3R5bGU6IFwid2FybmluZ1wiIH0pLFxyXG4gICAgc3VjY2VzczogKGh0bWwsIG9iaiA9IHt9KSA9PiBzaG93KGh0bWwsIHsgLi4ub2JqLCBzdHlsZTogXCJzdWNjZXNzXCIgfSlcclxuICB9KVxyXG59IiwgImV4cG9ydCBkZWZhdWx0IGBcbi5hY29yZC0tZGlzY29yZC1idXR0b257cG9zaXRpb246cmVsYXRpdmU7ZGlzcGxheTpmbGV4O2p1c3RpZnktY29udGVudDpjZW50ZXI7YWxpZ24taXRlbXM6Y2VudGVyO2JveC1zaXppbmc6Ym9yZGVyLWJveDtiYWNrZ3JvdW5kOm5vbmU7Ym9yZGVyOm5vbmU7Ym9yZGVyLXJhZGl1czozcHg7Zm9udC1zaXplOjE0cHg7Zm9udC13ZWlnaHQ6NTAwO2xpbmUtaGVpZ2h0OjE2cHg7cGFkZGluZzoycHggMTZweDt1c2VyLXNlbGVjdDpub25lfS5hY29yZC0tZGlzY29yZC1idXR0b246ZGlzYWJsZWQsLmFjb3JkLS1kaXNjb3JkLWJ1dHRvblthcmlhLWRpc2FibGVkPXRydWVde2N1cnNvcjpub3QtYWxsb3dlZDtvcGFjaXR5Oi41fS5hY29yZC0tZGlzY29yZC1idXR0b24gLmFjb3JkLS1kaXNjb3JkLWJ1dHRvbi1jb250ZW50c3stLWJ1dHRvbi0tdW5kZXJsaW5lLWNvbG9yOiB0cmFuc3BhcmVudDtiYWNrZ3JvdW5kLWltYWdlOmxpbmVhci1ncmFkaWVudCgwZGVnLCB0cmFuc3BhcmVudCwgdHJhbnNwYXJlbnQgMXB4LCB2YXIoLS1idXR0b24tLXVuZGVybGluZS1jb2xvcikgMCwgdmFyKC0tYnV0dG9uLS11bmRlcmxpbmUtY29sb3IpIDJweCwgdHJhbnNwYXJlbnQgMCl9LmFjb3JkLS1kaXNjb3JkLWJ1dHRvbi1sb29rRmlsbGVkLmNvbG9yQnJhbmR7Y29sb3I6dmFyKC0td2hpdGUtNTAwKTtiYWNrZ3JvdW5kLWNvbG9yOnZhcigtLWJyYW5kLWV4cGVyaW1lbnQpfS5hY29yZC0tZGlzY29yZC1idXR0b24tbG9va0ZpbGxlZC5jb2xvckJyYW5kOmhvdmVye2JhY2tncm91bmQtY29sb3I6dmFyKC0tYnJhbmQtZXhwZXJpbWVudC01NjApfS5hY29yZC0tZGlzY29yZC1idXR0b24tbG9va0ZpbGxlZC5jb2xvckJyYW5kOmFjdGl2ZXtiYWNrZ3JvdW5kLWNvbG9yOnZhcigtLWJyYW5kLWV4cGVyaW1lbnQtNjAwKX0uYWNvcmQtLWRpc2NvcmQtYnV0dG9uLWxvb2tGaWxsZWQuY29sb3JCcmFuZCAuc3Bpbm5lckl0ZW0tM1k1TnNVe2JhY2tncm91bmQtY29sb3I6dmFyKC0td2hpdGUtNTAwKX0uYWNvcmQtLWRpc2NvcmQtYnV0dG9uLWxvb2tGaWxsZWQuY29sb3JCcmFuZDpkaXNhYmxlZCwuYWNvcmQtLWRpc2NvcmQtYnV0dG9uLWxvb2tGaWxsZWQuY29sb3JCcmFuZFthcmlhLWRpc2FibGVkPXRydWVde2JhY2tncm91bmQtY29sb3I6dmFyKC0tYnJhbmQtZXhwZXJpbWVudCl9LmFjb3JkLS1kaXNjb3JkLWJ1dHRvbi1sb29rRmlsbGVkLmNvbG9yUHJpbWFyeXtjb2xvcjp2YXIoLS13aGl0ZS01MDApO2JhY2tncm91bmQtY29sb3I6dmFyKC0tYnV0dG9uLXNlY29uZGFyeS1iYWNrZ3JvdW5kKX0uYWNvcmQtLWRpc2NvcmQtYnV0dG9uLWxvb2tGaWxsZWQuY29sb3JQcmltYXJ5OmhvdmVye2JhY2tncm91bmQtY29sb3I6dmFyKC0tYnV0dG9uLXNlY29uZGFyeS1iYWNrZ3JvdW5kLWhvdmVyKX0uYWNvcmQtLWRpc2NvcmQtYnV0dG9uLWxvb2tGaWxsZWQuY29sb3JQcmltYXJ5OmFjdGl2ZXtiYWNrZ3JvdW5kLWNvbG9yOnZhcigtLWJ1dHRvbi1zZWNvbmRhcnktYmFja2dyb3VuZC1hY3RpdmUpfS5hY29yZC0tZGlzY29yZC1idXR0b24tbG9va0ZpbGxlZC5jb2xvclByaW1hcnkgLnNwaW5uZXJJdGVtLTNZNU5zVXtiYWNrZ3JvdW5kLWNvbG9yOnZhcigtLXByaW1hcnktMTAwKX0uYWNvcmQtLWRpc2NvcmQtYnV0dG9uLWxvb2tGaWxsZWQuY29sb3JQcmltYXJ5OmRpc2FibGVkLC5hY29yZC0tZGlzY29yZC1idXR0b24tbG9va0ZpbGxlZC5jb2xvclByaW1hcnlbYXJpYS1kaXNhYmxlZD10cnVlXXtiYWNrZ3JvdW5kLWNvbG9yOnZhcigtLWJ1dHRvbi1zZWNvbmRhcnktYmFja2dyb3VuZC1kaXNhYmxlZCl9LmFjb3JkLS1kaXNjb3JkLWJ1dHRvbi1sb29rRmlsbGVkLmNvbG9yR3JlZW57Y29sb3I6dmFyKC0td2hpdGUtNTAwKTtiYWNrZ3JvdW5kLWNvbG9yOnZhcigtLWJ1dHRvbi1wb3NpdGl2ZS1iYWNrZ3JvdW5kKX0uYWNvcmQtLWRpc2NvcmQtYnV0dG9uLWxvb2tGaWxsZWQuY29sb3JHcmVlbjpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOnZhcigtLWJ1dHRvbi1wb3NpdGl2ZS1iYWNrZ3JvdW5kLWhvdmVyKX0uYWNvcmQtLWRpc2NvcmQtYnV0dG9uLWxvb2tGaWxsZWQuY29sb3JHcmVlbjphY3RpdmV7YmFja2dyb3VuZC1jb2xvcjp2YXIoLS1idXR0b24tcG9zaXRpdmUtYmFja2dyb3VuZC1hY3RpdmUpfS5hY29yZC0tZGlzY29yZC1idXR0b24tbG9va0ZpbGxlZC5jb2xvckdyZWVuIC5zcGlubmVySXRlbS0zWTVOc1V7YmFja2dyb3VuZC1jb2xvcjp2YXIoLS13aGl0ZS01MDApfS5hY29yZC0tZGlzY29yZC1idXR0b24tbG9va0ZpbGxlZC5jb2xvckdyZWVuOmRpc2FibGVkLC5hY29yZC0tZGlzY29yZC1idXR0b24tbG9va0ZpbGxlZC5jb2xvckdyZWVuW2FyaWEtZGlzYWJsZWQ9dHJ1ZV17YmFja2dyb3VuZC1jb2xvcjp2YXIoLS1idXR0b24tcG9zaXRpdmUtYmFja2dyb3VuZC1kaXNhYmxlZCl9LmFjb3JkLS1kaXNjb3JkLWJ1dHRvbi1sb29rRmlsbGVkLmNvbG9yUmVke2NvbG9yOnZhcigtLXdoaXRlLTUwMCk7YmFja2dyb3VuZC1jb2xvcjp2YXIoLS1idXR0b24tZGFuZ2VyLWJhY2tncm91bmQpfS5hY29yZC0tZGlzY29yZC1idXR0b24tbG9va0ZpbGxlZC5jb2xvclJlZDpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOnZhcigtLWJ1dHRvbi1kYW5nZXItYmFja2dyb3VuZC1ob3Zlcil9LmFjb3JkLS1kaXNjb3JkLWJ1dHRvbi1sb29rRmlsbGVkLmNvbG9yUmVkOmFjdGl2ZXtiYWNrZ3JvdW5kLWNvbG9yOnZhcigtLWJ1dHRvbi1kYW5nZXItYmFja2dyb3VuZC1hY3RpdmUpfS5hY29yZC0tZGlzY29yZC1idXR0b24tbG9va0ZpbGxlZC5jb2xvclJlZCAuc3Bpbm5lckl0ZW0tM1k1TnNVe2JhY2tncm91bmQtY29sb3I6dmFyKC0td2hpdGUtNTAwKX0uYWNvcmQtLWRpc2NvcmQtYnV0dG9uLWxvb2tGaWxsZWQuY29sb3JSZWQ6ZGlzYWJsZWQsLmFjb3JkLS1kaXNjb3JkLWJ1dHRvbi1sb29rRmlsbGVkLmNvbG9yUmVkW2FyaWEtZGlzYWJsZWQ9dHJ1ZV17YmFja2dyb3VuZC1jb2xvcjp2YXIoLS1idXR0b24tZGFuZ2VyLWJhY2tncm91bmQtZGlzYWJsZWQpfS5hY29yZC0tZGlzY29yZC1idXR0b24tbG9va0ZpbGxlZC5jb2xvckJyYW5kTmV3e2NvbG9yOnZhcigtLXdoaXRlLTUwMCk7YmFja2dyb3VuZC1jb2xvcjp2YXIoLS1icmFuZC01MDApfS5hY29yZC0tZGlzY29yZC1idXR0b24tbG9va0ZpbGxlZC5jb2xvckJyYW5kTmV3OmhvdmVye2JhY2tncm91bmQtY29sb3I6dmFyKC0tYnJhbmQtNTYwKX0uYWNvcmQtLWRpc2NvcmQtYnV0dG9uLWxvb2tGaWxsZWQuY29sb3JCcmFuZE5ldzphY3RpdmV7YmFja2dyb3VuZC1jb2xvcjp2YXIoLS1icmFuZC02MDApfS5hY29yZC0tZGlzY29yZC1idXR0b24tbG9va0ZpbGxlZC5jb2xvckJyYW5kTmV3IC5zcGlubmVySXRlbS0zWTVOc1V7YmFja2dyb3VuZC1jb2xvcjp2YXIoLS13aGl0ZS01MDApfS5hY29yZC0tZGlzY29yZC1idXR0b24tbG9va0ZpbGxlZC5jb2xvckJyYW5kTmV3OmRpc2FibGVkLC5hY29yZC0tZGlzY29yZC1idXR0b24tbG9va0ZpbGxlZC5jb2xvckJyYW5kTmV3W2FyaWEtZGlzYWJsZWQ9dHJ1ZV17YmFja2dyb3VuZC1jb2xvcjp2YXIoLS1icmFuZC01MDApfS5hY29yZC0tZGlzY29yZC1idXR0b24tbG9va0ZpbGxlZC5jb2xvcldoaXRle2NvbG9yOnZhcigtLXByaW1hcnktNTAwKTtiYWNrZ3JvdW5kLWNvbG9yOnZhcigtLXdoaXRlLTUwMCl9LmFjb3JkLS1kaXNjb3JkLWJ1dHRvbi1sb29rRmlsbGVkLmNvbG9yV2hpdGUgLnNwaW5uZXJJdGVtLTNZNU5zVXtiYWNrZ3JvdW5kLWNvbG9yOnZhcigtLXByaW1hcnktNTAwKX0uYWNvcmQtLWRpc2NvcmQtYnV0dG9uLWxvb2tGaWxsZWQuY29sb3JXaGl0ZTpkaXNhYmxlZCwuYWNvcmQtLWRpc2NvcmQtYnV0dG9uLWxvb2tGaWxsZWQuY29sb3JXaGl0ZVthcmlhLWRpc2FibGVkPXRydWVde2JhY2tncm91bmQtY29sb3I6dmFyKC0td2hpdGUtNTAwKX0uYWNvcmQtLWRpc2NvcmQtYnV0dG9uLWxvb2tGaWxsZWQuY29sb3JZZWxsb3d7Y29sb3I6dmFyKC0td2hpdGUtNTAwKTtiYWNrZ3JvdW5kLWNvbG9yOnZhcigtLXN0YXR1cy13YXJuaW5nKX0uYWNvcmQtLWRpc2NvcmQtYnV0dG9uLWxvb2tGaWxsZWQuY29sb3JZZWxsb3cgLnNwaW5uZXJJdGVtLTNZNU5zVXtiYWNrZ3JvdW5kLWNvbG9yOnZhcigtLXdoaXRlLTUwMCl9LmFjb3JkLS1kaXNjb3JkLWJ1dHRvbi1sb29rRmlsbGVkLmNvbG9yWWVsbG93OmRpc2FibGVkLC5hY29yZC0tZGlzY29yZC1idXR0b24tbG9va0ZpbGxlZC5jb2xvclllbGxvd1thcmlhLWRpc2FibGVkPXRydWVde2JhY2tncm91bmQtY29sb3I6dmFyKC0tc3RhdHVzLXdhcm5pbmcpfS5hY29yZC0tZGlzY29yZC1idXR0b24tZ3Jvd3t3aWR0aDphdXRvfS5hY29yZC0tZGlzY29yZC1idXR0b24gLmFjb3JkLS1kaXNjb3JkLWJ1dHRvbi1jb250ZW50c3stLWJ1dHRvbi0tdW5kZXJsaW5lLWNvbG9yOiB0cmFuc3BhcmVudDtiYWNrZ3JvdW5kLWltYWdlOmxpbmVhci1ncmFkaWVudCgwZGVnLCB0cmFuc3BhcmVudCwgdHJhbnNwYXJlbnQgMXB4LCB2YXIoLS1idXR0b24tLXVuZGVybGluZS1jb2xvcikgMCwgdmFyKC0tYnV0dG9uLS11bmRlcmxpbmUtY29sb3IpIDJweCwgdHJhbnNwYXJlbnQgMCl9LmFjb3JkLS1kaXNjb3JkLWJ1dHRvbi5zaXplVGlueXt3aWR0aDo1MnB4O2hlaWdodDoyNHB4O21pbi13aWR0aDo1MnB4O21pbi1oZWlnaHQ6MjRweH0uYWNvcmQtLWRpc2NvcmQtYnV0dG9uLnNpemVTbWFsbHt3aWR0aDo2MHB4O2hlaWdodDozMnB4O21pbi13aWR0aDo2MHB4O21pbi1oZWlnaHQ6MzJweH0uYWNvcmQtLWRpc2NvcmQtYnV0dG9uLnNpemVNZWRpdW17d2lkdGg6OTZweDtoZWlnaHQ6MzhweDttaW4td2lkdGg6OTZweDttaW4taGVpZ2h0OjM4cHh9LmFjb3JkLS1kaXNjb3JkLWJ1dHRvbi5zaXplTGFyZ2V7d2lkdGg6MTMwcHg7aGVpZ2h0OjQ0cHg7bWluLXdpZHRoOjEzMHB4O21pbi1oZWlnaHQ6NDRweH0uYWNvcmQtLWRpc2NvcmQtYnV0dG9uLnNpemVYbGFyZ2V7d2lkdGg6MTQ4cHg7aGVpZ2h0OjUwcHg7bWluLXdpZHRoOjE0OHB4O21pbi1oZWlnaHQ6NTBweDtmb250LXNpemU6MTZweDtsaW5lLWhlaWdodDpub3JtYWw7cGFkZGluZzoycHggMjBweH0uYWNvcmQtLWRpc2NvcmQtYnV0dG9uLnNpemVNaW57ZGlzcGxheTppbmxpbmU7d2lkdGg6YXV0bztoZWlnaHQ6YXV0bztwYWRkaW5nOjJweCA0cHh9LmFjb3JkLS1kaXNjb3JkLWJ1dHRvbi5zaXplTWF4e3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCU7bWluLXdpZHRoOjEwMCU7bWluLWhlaWdodDoxMDAlO2ZvbnQtc2l6ZToxNnB4fWA7XG4iLCAiaW1wb3J0IHBhdGNoZXIgZnJvbSBcIi4uLy4uLy4uLy4uL3BhdGNoZXIvaW5kZXguanNcIjtcclxuXHJcbmltcG9ydCBjc3NUZXh0IGZyb20gXCIuL3N0eWxlLnNjc3NcIjtcclxucGF0Y2hlci5pbmplY3RDU1MoY3NzVGV4dCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgLyoqIEBwYXJhbSB7aW1wb3J0KFwidnVlXCIpLkFwcH0gdnVlQXBwICovXHJcbiAgbG9hZCh2dWVBcHApIHtcclxuICAgIHZ1ZUFwcC5jb21wb25lbnQoXCJkaXNjb3JkLWJ1dHRvblwiLCB7XHJcbiAgICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImFjb3JkLS1kaXNjb3JkLWJ1dHRvbiBhY29yZC0tZGlzY29yZC1idXR0b24tbG9va0ZpbGxlZCBhY29yZC0tZGlzY29yZC1idXR0b24tZ3Jvd1wiIDpjbGFzcz1cIlxcYFxcJHtjb2xvciA/IFxcYGNvbG9yXFwke2NvbG9yWzBdLnRvVXBwZXJDYXNlKCl9XFwke2NvbG9yLnNsaWNlKDEpLnRvTG93ZXJDYXNlKCl9XFxgIDogJ2NvbG9yQnJhbmQnfSBcXCR7c2l6ZSA/IFxcYHNpemVcXCR7c2l6ZVswXS50b1VwcGVyQ2FzZSgpfVxcJHtzaXplLnNsaWNlKDEpLnRvTG93ZXJDYXNlKCl9XFxgIDogJ3NpemVNZWRpdW0nfVxcYFwiIEBjbGljaz1cIm9uQ2xpY2tcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJhY29yZC0tZGlzY29yZC1idXR0b24tY29udGVudHNcIj57e3ZhbHVlfX08L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgYCxcclxuICAgICAgcHJvcHM6IFtcInZhbHVlXCIsIFwic2l6ZVwiLCBcImNvbG9yXCJdLFxyXG4gICAgICBlbWl0czogW1wiY2xpY2tcIl0sXHJcbiAgICAgIG1ldGhvZHM6IHtcclxuICAgICAgICBvbkNsaWNrKGUpIHtcclxuICAgICAgICAgIHRoaXMuJGVtaXQoXCJjbGlja1wiLCBlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufSIsICJleHBvcnQgZGVmYXVsdCBgXG4uYWNvcmQtLWRpc2NvcmQtY2hlY2t7Y29sb3I6dmFyKC0td2hpdGUtNzAwKTtiYWNrZ3JvdW5kLWNvbG9yOmN1cnJlbnRDb2xvcjt6LWluZGV4OjB9LmFjb3JkLS1kaXNjb3JkLWNoZWNrIC5zbGlkZXJ7dHJhbnNpdGlvbjoxMDBtcyBlYXNlLWluLW91dCBhbGw7bGVmdDotM3B4fS5hY29yZC0tZGlzY29yZC1jaGVjay5jaGVja2Vke2NvbG9yOnZhcigtLWdyZWVuLTQwMCl9LmFjb3JkLS1kaXNjb3JkLWNoZWNrLmNoZWNrZWQgLnNsaWRlcnt0cmFuc2l0aW9uOjEwMG1zIGVhc2UtaW4tb3V0IGFsbDtsZWZ0OjEycHh9LmFjb3JkLS1kaXNjb3JkLWNoZWNre3Bvc2l0aW9uOnJlbGF0aXZlO3dpZHRoOjQwcHg7aGVpZ2h0OjI0cHh9LmFjb3JkLS1kaXNjb3JkLWNoZWNrLC5pbnB1dC0xMjVvYWR7Ym9yZGVyLXJhZGl1czoxNHB4O2N1cnNvcjpwb2ludGVyfS5hY29yZC0tZGlzY29yZC1jaGVjay1zbGlkZXJ7ZGlzcGxheTpibG9jaztwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjA7d2lkdGg6MjhweDtoZWlnaHQ6MThweDttYXJnaW46M3B4fWA7XG4iLCAiaW1wb3J0IHBhdGNoZXIgZnJvbSBcIi4uLy4uLy4uLy4uL3BhdGNoZXIvaW5kZXguanNcIjtcclxuaW1wb3J0IGNzc1RleHQgZnJvbSBcIi4vc3R5bGUuc2Nzc1wiO1xyXG5wYXRjaGVyLmluamVjdENTUyhjc3NUZXh0KTtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgLyoqIEBwYXJhbSB7aW1wb3J0KFwidnVlXCIpLkFwcH0gdnVlQXBwICovXHJcbiAgbG9hZCh2dWVBcHApIHtcclxuICAgIHZ1ZUFwcC5jb21wb25lbnQoXCJkaXNjb3JkLWNoZWNrXCIsIHtcclxuICAgICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8ZGl2IGNsYXNzPVwiYWNvcmQtLWRpc2NvcmQtY2hlY2sgZGVmYXVsdC1jb2xvcnNcIiBcclxuICAgICAgICAgIDpjbGFzcz1cInsnY2hlY2tlZCc6IG1vZGVsVmFsdWV9XCIgXHJcbiAgICAgICAgICBAY2xpY2s9XCJvbkNsaWNrXCJcclxuICAgICAgICA+XHJcbiAgICAgICAgICA8c3ZnIGNsYXNzPVwiYWNvcmQtLWRpc2NvcmQtY2hlY2stc2xpZGVyIHNsaWRlclwiIHZpZXdCb3g9XCIwIDAgMjggMjBcIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPVwieE1pbllNaWQgbWVldFwiPlxyXG4gICAgICAgICAgICA8cmVjdCBmaWxsPVwid2hpdGVcIiB4PVwiNFwiIHk9XCIwXCIgcng9XCIxMFwiIHdpZHRoPVwiMjBcIiBoZWlnaHQ9XCIyMFwiPjwvcmVjdD5cclxuICAgICAgICAgICAgPHN2ZyB2LWlmPVwibW9kZWxWYWx1ZVwiIHZpZXdCb3g9XCIwIDAgMjAgMjBcIiBmaWxsPVwibm9uZVwiPlxyXG4gICAgICAgICAgICAgIDxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTcuODk1NjEgMTQuODUzOEw2LjMwNDYyIDEzLjI2MjlMMTQuMzA5OSA1LjI1NzU1TDE1LjkwMDkgNi44NDg1NEw3Ljg5NTYxIDE0Ljg1MzhaXCI+PC9wYXRoPlxyXG4gICAgICAgICAgICAgIDxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTQuMDg2NDMgMTEuMDkwM0w1LjY3NzQyIDkuNDk5MjlMOS40NDg1IDEzLjI3MDRMNy44NTc1MSAxNC44NjE0TDQuMDg2NDMgMTEuMDkwM1pcIj48L3BhdGg+XHJcbiAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICA8c3ZnIHYtZWxzZSB2aWV3Qm94PVwiMCAwIDIwIDIwXCIgZmlsbD1cIm5vbmVcIj5cclxuICAgICAgICAgICAgICA8cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk01LjEzMjMxIDYuNzI5NjNMNi43MjMzIDUuMTM4NjRMMTQuODU1IDEzLjI3MDRMMTMuMjY0IDE0Ljg2MTRMNS4xMzIzMSA2LjcyOTYzWlwiPjwvcGF0aD5cclxuICAgICAgICAgICAgICA8cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk0xMy4yNzA0IDUuMTM4NjRMMTQuODYxNCA2LjcyOTYzTDYuNzI5NjMgMTQuODYxNEw1LjEzODY0IDEzLjI3MDRMMTMuMjcwNCA1LjEzODY0WlwiPjwvcGF0aD5cclxuICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgYCxcclxuICAgICAgcHJvcHM6IHtcclxuICAgICAgICBtb2RlbFZhbHVlOiB7XHJcbiAgICAgICAgICBkZWZhdWx0KCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBlbWl0czogWyd1cGRhdGU6bW9kZWxWYWx1ZScsICdjaGFuZ2UnXSxcclxuICAgICAgbWV0aG9kczoge1xyXG4gICAgICAgIG9uQ2xpY2soZXZlbnQpIHtcclxuICAgICAgICAgIGxldCBuZXdWYWx1ZSA9ICF0aGlzLm1vZGVsVmFsdWU7XHJcbiAgICAgICAgICB0aGlzLiRlbWl0KFwidXBkYXRlOm1vZGVsVmFsdWVcIiwgbmV3VmFsdWUpO1xyXG4gICAgICAgICAgdGhpcy4kZW1pdChcImNoYW5nZVwiLCB7IHZhbHVlOiBuZXdWYWx1ZSwgZXZlbnQgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn0iLCAiZXhwb3J0IGRlZmF1bHQgYFxuLmFjb3JkLS1kaXNjb3JkLWlucHV0e2ZvbnQtc2l6ZToxNnB4O2JveC1zaXppbmc6Ym9yZGVyLWJveDt3aWR0aDoxMDAlO2JvcmRlci1yYWRpdXM6M3B4O2NvbG9yOnZhcigtLXRleHQtbm9ybWFsKTtiYWNrZ3JvdW5kLWNvbG9yOnZhcigtLWlucHV0LWJhY2tncm91bmQpO2JvcmRlcjpub25lO3RyYW5zaXRpb246Ym9yZGVyLWNvbG9yIC4ycyBlYXNlLWluLW91dH0uYWNvcmQtLWRpc2NvcmQtaW5wdXQ6OnBsYWNlaG9sZGVyey13ZWJraXQtdXNlci1zZWxlY3Q6bm9uZTstbW96LXVzZXItc2VsZWN0Om5vbmU7LW1zLXVzZXItc2VsZWN0Om5vbmU7dXNlci1zZWxlY3Q6bm9uZTtjb2xvcjp2YXIoLS1pbnB1dC1wbGFjZWhvbGRlci10ZXh0KX0uYWNvcmQtLWRpc2NvcmQtaW5wdXQ6aG92ZXJ7Ym9yZGVyLWNvbG9yOnZhcigtLWRlcHJlY2F0ZWQtdGV4dC1pbnB1dC1ib3JkZXItaG92ZXIpfS5hY29yZC0tZGlzY29yZC1pbnB1dC5mb2N1c2VkLTE2aXVYZywuYWNvcmQtLWRpc2NvcmQtaW5wdXQ6Zm9jdXN7Ym9yZGVyLWNvbG9yOnZhcigtLXRleHQtbGluayl9LmFjb3JkLS1kaXNjb3JkLWlucHV0LmVycm9yLTEwR3ZxUntib3JkZXItY29sb3I6dmFyKC0tc3RhdHVzLWRhbmdlcil9LmFjb3JkLS1kaXNjb3JkLWlucHV0LnN1Y2Nlc3MtMVY0aTNme2JvcmRlci1jb2xvcjp2YXIoLS1ncmVlbi0zNjApfS5hY29yZC0tZGlzY29yZC1pbnB1dC5kaXNhYmxlZC0xLWYwNmd7Ym9yZGVyLWNvbG9yOnZhcigtLWRlcHJlY2F0ZWQtdGV4dC1pbnB1dC1ib3JkZXItZGlzYWJsZWQpfS5hY29yZC0tZGlzY29yZC1pbnB1dC5lZGl0YWJsZS0xd1J3bFl7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDAsMCwwLDApO2JvcmRlci1jb2xvcjpyZ2JhKDAsMCwwLDApfS5hY29yZC0tZGlzY29yZC1pbnB1dFdyYXBwZXJ7cG9zaXRpb246cmVsYXRpdmV9LnRoZW1lLWRhcmsgLmFjb3JkLS1kaXNjb3JkLWlucHV0RGVmYXVsdDo6cGxhY2Vob2xkZXJ7Y29sb3I6aHNsKHZhcigtLXByaW1hcnktMTAwLWhzbCkvMC4zKX0udGhlbWUtZGFyayAuYWNvcmQtLWRpc2NvcmQtaW5wdXREZWZhdWx0e2NvbG9yOnZhcigtLXByaW1hcnktMTAwKX0udGhlbWUtbGlnaHQgLmFjb3JkLS1kaXNjb3JkLWlucHV0RGVmYXVsdDo6cGxhY2Vob2xkZXJ7Y29sb3I6aHNsKHZhcigtLXByaW1hcnktNTAwLWhzbCkvMC4zKX0udGhlbWUtbGlnaHQgLmFjb3JkLS1kaXNjb3JkLWlucHV0RGVmYXVsdHtjb2xvcjp2YXIoLS1wcmltYXJ5LTUwMCl9LmFjb3JkLS1kaXNjb3JkLWlucHV0LWlubmVye3Bvc2l0aW9uOnJlbGF0aXZlO2ZvbnQtc2l6ZToxNnB4O2xpbmUtaGVpZ2h0OjIwcHg7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDAsMCwwLDApO3BhZGRpbmc6MTBweCAwIDEwcHggMTBweDt3aGl0ZS1zcGFjZTpub3dyYXA7dGV4dC1vdmVyZmxvdzplbGxpcHNpcztvdmVyZmxvdzpoaWRkZW59LmFjb3JkLS1kaXNjb3JkLWlucHV0LWlubmVye3dpZHRoOjEwMCU7bWluLXdpZHRoOjA7Ym94LXNpemluZzpib3JkZXItYm94O2ZsZXg6MSAxIGF1dG87Ym9yZGVyOm5vbmU7dHJhbnNpdGlvbjpjb2xvciAuMTVzIGVhc2U7Y3Vyc29yOnRleHR9YDtcbiIsICJpbXBvcnQgcGF0Y2hlciBmcm9tIFwiLi4vLi4vLi4vLi4vcGF0Y2hlci9pbmRleC5qc1wiO1xyXG5cclxuaW1wb3J0IGNzc1RleHQgZnJvbSBcIi4vc3R5bGUuc2Nzc1wiO1xyXG5wYXRjaGVyLmluamVjdENTUyhjc3NUZXh0KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAvKiogQHBhcmFtIHtpbXBvcnQoXCJ2dWVcIikuQXBwfSB2dWVBcHAgKi9cclxuICBsb2FkKHZ1ZUFwcCkge1xyXG4gICAgdnVlQXBwLmNvbXBvbmVudChcImRpc2NvcmQtaW5wdXRcIiwge1xyXG4gICAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJhY29yZC0tZGlzY29yZC1pbnB1dFwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImFjb3JkLS1kaXNjb3JkLWlucHV0V3JhcHBlclwiPlxyXG4gICAgICAgICAgICA8aW5wdXQgOnR5cGU9XCJ0eXBlID8/ICd0ZXh0J1wiIGNsYXNzPVwiYWNvcmQtLWRpc2NvcmQtaW5wdXREZWZhdWx0IGFjb3JkLS1kaXNjb3JkLWlucHV0LWlubmVyXCIgOnZhbHVlPVwibW9kZWxWYWx1ZVwiIDpwbGFjZWhvbGRlcj1cInBsYWNlaG9sZGVyXCIgOm1heGxlbmd0aD1cIm1heGxlbmd0aFwiIDptaW49XCJtaW5cIiA6c3RlcD1cInN0ZXBcIiA6bWF4PVwibWF4XCIgOnN0eWxlPVwic3R5bGVcIiBAaW5wdXQ9XCJvbklucHV0XCIgLz5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICBgLFxyXG4gICAgICBwcm9wczogW1wibW9kZWxWYWx1ZVwiLCBcInBsYWNlaG9sZGVyXCIsIFwidHlwZVwiLCBcIm1heGxlbmd0aFwiLCBcIm1heFwiLCBcIm1pblwiLCBcInN0ZXBcIiwgXCJzdHlsZVwiXSxcclxuICAgICAgZW1pdHM6IFtcImlucHV0XCIsICd1cGRhdGU6bW9kZWxWYWx1ZSddLFxyXG4gICAgICBtZXRob2RzOiB7XHJcbiAgICAgICAgb25JbnB1dChldmVudCkge1xyXG4gICAgICAgICAgdGhpcy4kZW1pdChcInVwZGF0ZTptb2RlbFZhbHVlXCIsIGV2ZW50LnRhcmdldC52YWx1ZSk7XHJcbiAgICAgICAgICB0aGlzLiRlbWl0KFwiaW5wdXRcIiwgeyBldmVudCwgdmFsdWU6IGV2ZW50LnRhcmdldC52YWx1ZSB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufSIsICJleHBvcnQgZGVmYXVsdCBgXG4uYWNvcmQtLWRpc2NvcmQtc2VsZWN0e3Bvc2l0aW9uOnJlbGF0aXZlO3dpZHRoOjEwMCV9LmFjb3JkLS1kaXNjb3JkLXNlbGVjdD4ub3B0aW9uc3twb3NpdGlvbjphYnNvbHV0ZTt0b3A6MTAwJTt3aWR0aDoxMDAlO21heC1oZWlnaHQ6Mjg2cHg7b3ZlcmZsb3cteDpoaWRkZW47b3ZlcmZsb3cteTpzY3JvbGw7ei1pbmRleDoxfS5hY29yZC0tZGlzY29yZC1zZWxlY3Q+Lm9wdGlvbnMudG9wLXBvcG91dHt0b3A6YXV0bztib3R0b206MTAwJX0uYWNvcmQtLWRpc2NvcmQtc2VsZWN0e2JvcmRlcjoxcHggc29saWQgcmdiYSgwLDAsMCwwKTtwYWRkaW5nOjhweCA4cHggOHB4IDEycHg7Y3Vyc29yOnBvaW50ZXI7LXdlYmtpdC1ib3gtc2l6aW5nOmJvcmRlci1ib3g7Ym94LXNpemluZzpib3JkZXItYm94O2Rpc3BsYXk6Z3JpZDtncmlkLXRlbXBsYXRlLWNvbHVtbnM6MWZyIGF1dG87LXdlYmtpdC1ib3gtYWxpZ246Y2VudGVyOy1tcy1mbGV4LWFsaWduOmNlbnRlcjthbGlnbi1pdGVtczpjZW50ZXI7Ym9yZGVyLXJhZGl1czo0cHh9LmFjb3JkLS1kaXNjb3JkLXNlbGVjdHtjb2xvcjp2YXIoLS10ZXh0LW5vcm1hbCk7Zm9udC13ZWlnaHQ6NTAwfS5hY29yZC0tZGlzY29yZC1zZWxlY3QtbG9va0ZpbGxlZC5hY29yZC0tZGlzY29yZC1zZWxlY3Qtb3B0aW9uLC5hY29yZC0tZGlzY29yZC1zZWxlY3QtbG9va0ZpbGxlZC5hY29yZC0tZGlzY29yZC1zZWxlY3Q6aG92ZXIuYWNvcmQtLWRpc2NvcmQtc2VsZWN0LW9wdGlvbntib3JkZXItYm90dG9tLWNvbG9yOnZhcigtLWJyYW5kLWV4cGVyaW1lbnQpO2JvcmRlci1jb2xvcjp2YXIoLS1icmFuZC1leHBlcmltZW50KSB2YXIoLS1icmFuZC1leHBlcmltZW50KSB2YXIoLS1iYWNrZ3JvdW5kLXRlcnRpYXJ5KX0uYWNvcmQtLWRpc2NvcmQtc2VsZWN0LWxvb2tGaWxsZWQuYWNvcmQtLWRpc2NvcmQtc2VsZWN0e2JhY2tncm91bmQtY29sb3I6dmFyKC0taW5wdXQtYmFja2dyb3VuZCk7Ym9yZGVyLWNvbG9yOnZhcigtLWlucHV0LWJhY2tncm91bmQpfS5hY29yZC0tZGlzY29yZC1zZWxlY3QtcG9wb3V0e2JveC1zaXppbmc6Ym9yZGVyLWJveDtib3JkZXI6MXB4IHNvbGlkIHZhcigtLWJhY2tncm91bmQtdGVydGlhcnkpO2JhY2tncm91bmQ6dmFyKC0tYmFja2dyb3VuZC1zZWNvbmRhcnkpO2JvcmRlci1yYWRpdXM6MCAwIDRweCA0cHh9LmFjb3JkLS1kaXNjb3JkLXNlbGVjdC1sb29rRmlsbGVkLmFjb3JkLS1kaXNjb3JkLXNlbGVjdC1wb3BvdXR7Ym9yZGVyLXJhZGl1czowIDAgM3B4IDNweH0uYWNvcmQtLWRpc2NvcmQtc2VsZWN0LWxvb2tGaWxsZWQuYWNvcmQtLWRpc2NvcmQtc2VsZWN0LXBvcG91dC5wb3BvdXRQb3NpdGlvblRvcC0zVWhlZmR7Ym9yZGVyLXJhZGl1czozcHggM3B4IDAgMH0uYWNvcmQtLWRpc2NvcmQtc2VsZWN0LW9wZW57Ym9yZGVyLXJhZGl1czo0cHggNHB4IDAgMDtib3JkZXItYm90dG9tLWNvbG9yOnJnYmEoMCwwLDAsMCl9LnNlbGVjdFBvc2l0aW9uVG9wLTNPR2tITC5hY29yZC0tZGlzY29yZC1zZWxlY3Qtb3Blbntib3JkZXItcmFkaXVzOjAgMCA0cHggNHB4fS5wbGFjZWhvbGRlci0ya19CdkgsLmFjb3JkLS1kaXNjb3JkLXNlbGVjdC12YWx1ZXt0ZXh0LW92ZXJmbG93OmVsbGlwc2lzO3doaXRlLXNwYWNlOm5vd3JhcDtvdmVyZmxvdzpoaWRkZW59LndyYXBwZXItbUpUMDRBIC5hY29yZC0tZGlzY29yZC1zZWxlY3QtdmFsdWV7ZGlzcGxheTpmbGV4fS53cmFwcGVyLW1KVDA0QSAuYWNvcmQtLWRpc2NvcmQtc2VsZWN0LXZhbHVlLm11bHRpLTJ2UHFjNHtkaXNwbGF5OmJsb2NrO3doaXRlLXNwYWNlOm5vcm1hbH0uYWNvcmQtLWRpc2NvcmQtc2VsZWN0LXZhbHVle2dhcDo4cHh9LmFjb3JkLS1kaXNjb3JkLXNlbGVjdC12YWx1ZXtkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyfS5hY29yZC0tZGlzY29yZC1zZWxlY3QtaWNvbnN7Z2FwOjRweH0uYWNvcmQtLWRpc2NvcmQtc2VsZWN0LWljb25zLC5hY29yZC0tZGlzY29yZC1zZWxlY3QtdmFsdWV7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcn0ud3JhcHBlci1tSlQwNEEgLmFjb3JkLS1kaXNjb3JkLXNlbGVjdC1pY29uc3tncmlkLWNvbHVtbjoyO2dyaWQtcm93OjE7LXdlYmtpdC1tYXJnaW4tZW5kOjhweDttYXJnaW4taW5saW5lLWVuZDo4cHg7cG9pbnRlci1ldmVudHM6bm9uZX0uYWNvcmQtLWRpc2NvcmQtc2VsZWN0LXNjcm9sbGVyQmFzZXtwb3NpdGlvbjpyZWxhdGl2ZTstd2Via2l0LWJveC1zaXppbmc6Ym9yZGVyLWJveDtib3gtc2l6aW5nOmJvcmRlci1ib3g7bWluLWhlaWdodDowOy13ZWJraXQtYm94LWZsZXg6MTstbXMtZmxleDoxIDEgYXV0bztmbGV4OjEgMSBhdXRvfS5hY29yZC0tZGlzY29yZC1zZWxlY3Qtc2Nyb2xsVGhpbntzY3JvbGxiYXItd2lkdGg6dGhpbn0uYWNvcmQtLWRpc2NvcmQtc2VsZWN0LXNjcm9sbFRoaW4sLmFjb3JkLS1kaXNjb3JkLXNlbGVjdC1zY3JvbGxUaGluLmZhZGUtMjdYNmJHLnNjcm9sbGluZy0zN2tnb1QsLmFjb3JkLS1kaXNjb3JkLXNlbGVjdC1zY3JvbGxUaGluLmZhZGUtMjdYNmJHOmhvdmVye3Njcm9sbGJhci1jb2xvcjp2YXIoLS1zY3JvbGxiYXItdGhpbi10aHVtYikgdmFyKC0tc2Nyb2xsYmFyLXRoaW4tdHJhY2spfS5hY29yZC0tZGlzY29yZC1zZWxlY3Qtc2Nyb2xsVGhpbjo6LXdlYmtpdC1zY3JvbGxiYXJ7d2lkdGg6OHB4O2hlaWdodDo4cHh9LmFjb3JkLS1kaXNjb3JkLXNlbGVjdC1zY3JvbGxUaGluOjotd2Via2l0LXNjcm9sbGJhci10cmFja3tib3JkZXItY29sb3I6dmFyKC0tc2Nyb2xsYmFyLXRoaW4tdHJhY2spO2JhY2tncm91bmQtY29sb3I6dmFyKC0tc2Nyb2xsYmFyLXRoaW4tdHJhY2spO2JvcmRlcjoycHggc29saWQgdmFyKC0tc2Nyb2xsYmFyLXRoaW4tdHJhY2spfS5hY29yZC0tZGlzY29yZC1zZWxlY3Qtc2Nyb2xsVGhpbjo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWJ7YmFja2dyb3VuZC1jbGlwOnBhZGRpbmctYm94O2JvcmRlcjoycHggc29saWQgcmdiYSgwLDAsMCwwKTtib3JkZXItcmFkaXVzOjRweDtiYWNrZ3JvdW5kLWNvbG9yOnZhcigtLXNjcm9sbGJhci10aGluLXRodW1iKTttaW4taGVpZ2h0OjQwcHh9LmFjb3JkLS1kaXNjb3JkLXNlbGVjdC1zY3JvbGxUaGluOjotd2Via2l0LXNjcm9sbGJhci1jb3JuZXJ7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDAsMCwwLDApfS50aGVtZS1kYXJrLmN1c3RvbS10aGVtZS1iYWNrZ3JvdW5kIC5jdXN0b21UaGVtZS0zUUFZWnEuYWNvcmQtLWRpc2NvcmQtc2VsZWN0LXNjcm9sbFRoaW46Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1ie2JhY2tncm91bmQtc2l6ZToyMDB2aDtiYWNrZ3JvdW5kLWltYWdlOmxpbmVhci1ncmFkaWVudChyZ2IodmFyKC0tYmctb3ZlcmxheS1jb2xvci1pbnZlcnNlKS92YXIoLS1iZy1vdmVybGF5LW9wYWNpdHktNCkpLCByZ2IodmFyKC0tYmctb3ZlcmxheS1jb2xvci1pbnZlcnNlKS92YXIoLS1iZy1vdmVybGF5LW9wYWNpdHktNCkpKSx2YXIoLS1jdXN0b20tdGhlbWUtYmFja2dyb3VuZCl9LnRoZW1lLWxpZ2h0LmN1c3RvbS10aGVtZS1iYWNrZ3JvdW5kIC5jdXN0b21UaGVtZS0zUUFZWnEuYWNvcmQtLWRpc2NvcmQtc2VsZWN0LXNjcm9sbFRoaW46Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1ie2JhY2tncm91bmQtc2l6ZToxMDB2aDtiYWNrZ3JvdW5kLWltYWdlOnJnYih2YXIoLS1iZy1vdmVybGF5LWNvbG9yLWludmVyc2UpL3ZhcigtLWJnLW92ZXJsYXktb3BhY2l0eS02KSkscmdiKHZhcigtLWJnLW92ZXJsYXktY29sb3IpL3ZhcigtLWJnLW92ZXJsYXktb3BhY2l0eS0zKSl9LmFjb3JkLS1kaXNjb3JkLXNlbGVjdC1sb29rRmlsbGVkLmFjb3JkLS1kaXNjb3JkLXNlbGVjdC1vcHRpb24sLmFjb3JkLS1kaXNjb3JkLXNlbGVjdC1sb29rRmlsbGVkLmFjb3JkLS1kaXNjb3JkLXNlbGVjdDpob3Zlci5hY29yZC0tZGlzY29yZC1zZWxlY3Qtb3B0aW9ue2JvcmRlci1ib3R0b20tY29sb3I6dmFyKC0tYnJhbmQtZXhwZXJpbWVudCk7Ym9yZGVyLWNvbG9yOnZhcigtLWJyYW5kLWV4cGVyaW1lbnQpIHZhcigtLWJyYW5kLWV4cGVyaW1lbnQpIHZhcigtLWJhY2tncm91bmQtdGVydGlhcnkpfS5hY29yZC0tZGlzY29yZC1zZWxlY3Qtb3B0aW9ue3BhZGRpbmc6MTJweDtjdXJzb3I6cG9pbnRlcjtjb2xvcjp2YXIoLS1pbnRlcmFjdGl2ZS1ub3JtYWwpO2Rpc3BsYXk6Z3JpZDtncmlkLXRlbXBsYXRlLWNvbHVtbnM6MWZyIGF1dG87YWxpZ24taXRlbXM6Y2VudGVyO2ZvbnQtd2VpZ2h0OjUwMDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LmFjb3JkLS1kaXNjb3JkLXNlbGVjdC1vcHRpb24uZm9jdXNlZC0xMG1icC0sLmFjb3JkLS1kaXNjb3JkLXNlbGVjdC1vcHRpb246Zm9jdXMsLmFjb3JkLS1kaXNjb3JkLXNlbGVjdC1vcHRpb246aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjp2YXIoLS1iYWNrZ3JvdW5kLW1vZGlmaWVyLWhvdmVyKTtjb2xvcjp2YXIoLS1pbnRlcmFjdGl2ZS1ob3Zlcil9LmFjb3JkLS1kaXNjb3JkLXNlbGVjdC1vcHRpb25bYXJpYS1zZWxlY3RlZD10cnVlXTpub3QoLmFjb3JkLS1kaXNjb3JkLXNlbGVjdC1vcHRpb24ubXVsdGktMnZQcWM0KXtjb2xvcjp2YXIoLS1pbnRlcmFjdGl2ZS1hY3RpdmUpO2JhY2tncm91bmQtY29sb3I6dmFyKC0tYmFja2dyb3VuZC1tb2RpZmllci1zZWxlY3RlZCl9LmFjb3JkLS1kaXNjb3JkLXNlbGVjdC1zZWxlY3RlZEljb257Y29sb3I6dmFyKC0tYnJhbmQtZXhwZXJpbWVudCl9YDtcbiIsICJpbXBvcnQgcGF0Y2hlciBmcm9tIFwiLi4vLi4vLi4vLi4vcGF0Y2hlci9pbmRleC5qc1wiO1xyXG5cclxuaW1wb3J0IGNzc1RleHQgZnJvbSBcIi4vc3R5bGUuc2Nzc1wiO1xyXG5wYXRjaGVyLmluamVjdENTUyhjc3NUZXh0KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAvKiogQHBhcmFtIHtpbXBvcnQoXCJ2dWVcIikuQXBwfSB2dWVBcHAgKi9cclxuICBsb2FkKHZ1ZUFwcCkge1xyXG4gICAgdnVlQXBwLmNvbXBvbmVudChcImRpc2NvcmQtc2VsZWN0XCIsIHtcclxuICAgICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8ZGl2IGNsYXNzPVwiYWNvcmQtLWRpc2NvcmQtc2VsZWN0IGFjb3JkLS1kaXNjb3JkLXNlbGVjdC1sb29rRmlsbGVkIGFjb3JkLS1kaXNjb3JkLXNlbGVjdFwiIDpjbGFzcz1cInsnYWNvcmQtLWRpc2NvcmQtc2VsZWN0LW9wZW4nOiBhY3RpdmV9XCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWNvcmQtLWRpc2NvcmQtc2VsZWN0LXZhbHVlXCI+e3tvcHRpb25zLmZpbmQoaT0+aS52YWx1ZSA9PT0gbW9kZWxWYWx1ZSk/LmxhYmVsfX08L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJhY29yZC0tZGlzY29yZC1zZWxlY3QtaWNvbnNcIj5cclxuICAgICAgICAgICAgICA8c3ZnIHYtaWY9XCIhYWN0aXZlXCIgY2xhc3M9XCJpY29uXCIgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiPjxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTE2LjU5IDguNTkwMDNMMTIgMTMuMTdMNy40MSA4LjU5MDAzTDYgMTBMMTIgMTZMMTggMTBMMTYuNTkgOC41OTAwM1pcIj48L3BhdGg+PC9zdmc+XHJcbiAgICAgICAgICAgICAgPHN2ZyB2LWVsc2UgY2xhc3M9XCJpY29uXCIgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiPjxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTcuNDEgMTYuMDAwMUwxMiAxMS40MjAxTDE2LjU5IDE2LjAwMDFMMTggMTQuNTkwMUwxMiA4LjU5MDA2TDYgMTQuNTkwMUw3LjQxIDE2LjAwMDFaXCI+PC9wYXRoPjwvc3ZnPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IHYtaWY9XCJhY3RpdmVcIiBjbGFzcz1cIm9wdGlvbnMgYWNvcmQtLWRpc2NvcmQtc2VsZWN0LXBvcG91dCBhY29yZC0tZGlzY29yZC1zZWxlY3Qtc2Nyb2xsZXJCYXNlIGFjb3JkLS1kaXNjb3JkLXNlbGVjdC1zY3JvbGxUaGluXCIgOmNsYXNzPVwieyd0b3AtcG9wb3V0JzogcG9wb3V0UG9zaXRpb24gPT09ICd0b3AnfVwiPlxyXG4gICAgICAgICAgICA8ZGl2IHYtZm9yPVwib3B0aW9uIGluIG9wdGlvbnNcIiBjbGFzcz1cIm9wdGlvbiBhY29yZC0tZGlzY29yZC1zZWxlY3Qtb3B0aW9uXCIgQGNsaWNrPVwib25PcHRpb25DbGljaygkZXZlbnQsIG9wdGlvbilcIiA6a2V5PVwib3B0aW9uLnZhbHVlXCIgOmFyaWEtc2VsZWN0ZWQ9XCJcXGBcXCR7bW9kZWxWYWx1ZSA9PT0gb3B0aW9uLnZhbHVlfVxcYFwiPlxyXG4gICAgICAgICAgICAgIHt7b3B0aW9uLmxhYmVsfX1cclxuICAgICAgICAgICAgICA8c3ZnIHYtaWY9XCJtb2RlbFZhbHVlID09PSBvcHRpb24udmFsdWVcIiBjbGFzcz1cImFjb3JkLS1kaXNjb3JkLXNlbGVjdC1zZWxlY3RlZEljb25cIiByb2xlPVwiaW1nXCIgd2lkdGg9XCIyMFwiIGhlaWdodD1cIjIwXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj48Y2lyY2xlIHI9XCI4XCIgY3g9XCIxMlwiIGN5PVwiMTJcIiBmaWxsPVwid2hpdGVcIj48L2NpcmNsZT48ZyBmaWxsPVwibm9uZVwiIGZpbGwtcnVsZT1cImV2ZW5vZGRcIj48cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk0xMiAyQzYuNDggMiAyIDYuNDggMiAxMnM0LjQ4IDEwIDEwIDEwIDEwLTQuNDggMTAtMTBTMTcuNTIgMiAxMiAyem0tMiAxNWwtNS01IDEuNDEtMS40MUwxMCAxNC4xN2w3LjU5LTcuNTlMMTkgOGwtOSA5elwiPjwvcGF0aD48L2c+PC9zdmc+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIGAsXHJcbiAgICAgIGRhdGEoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIGFjdGl2ZTogZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIHByb3BzOiBbXCJvcHRpb25zXCIsIFwibW9kZWxWYWx1ZVwiLCBcInBvcG91dFBvc2l0aW9uXCJdLFxyXG4gICAgICBlbWl0czogWyd1cGRhdGU6bW9kZWxWYWx1ZScsIFwiY2hhbmdlXCJdLFxyXG4gICAgICBtb3VudGVkKCkge1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5vbkNsaWNrKTtcclxuICAgICAgfSxcclxuICAgICAgdW5tb3VudGVkKCkge1xyXG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5vbkNsaWNrKTtcclxuICAgICAgfSxcclxuICAgICAgbWV0aG9kczoge1xyXG4gICAgICAgIG9uT3B0aW9uQ2xpY2soZXZlbnQsIG9wdGlvbikge1xyXG4gICAgICAgICAgdGhpcy4kZW1pdChcInVwZGF0ZTptb2RlbFZhbHVlXCIsIG9wdGlvbi52YWx1ZSk7XHJcbiAgICAgICAgICB0aGlzLiRlbWl0KFwiY2hhbmdlXCIsIHsgdmFsdWU6IG9wdGlvbi52YWx1ZSwgZXZlbnQgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvbkNsaWNrKGUpIHtcclxuICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY29yZC0tZGlzY29yZC1zZWxlY3QnKVxyXG4gICAgICAgICAgICB8fCBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2Fjb3JkLS1kaXNjb3JkLXNlbGVjdC12YWx1ZScpXHJcbiAgICAgICAgICAgIHx8IGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnYWNvcmQtLWRpc2NvcmQtc2VsZWN0LWljb25zJylcclxuICAgICAgICAgICAgfHwgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY29yZC0tZGlzY29yZC1zZWxlY3QtcG9wb3V0JylcclxuICAgICAgICAgICAgfHwgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY29yZC0tZGlzY29yZC1zZWxlY3Qtb3B0aW9uJylcclxuICAgICAgICAgICAgfHwgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaWNvblwiKVxyXG4gICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlID0gIXRoaXMuYWN0aXZlO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59IiwgImV4cG9ydCBkZWZhdWx0IGBcbi5hY29yZC0tZGlzY29yZC10ZXh0YXJlYXt3aWR0aDoxMDAlfS5hY29yZC0tZGlzY29yZC10ZXh0YXJlYS1pbnB1dFdyYXBwZXJ7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOmNvbHVtbn0uYWNvcmQtLWRpc2NvcmQtdGV4dGFyZWEtaW5wdXREZWZhdWx0e3BhZGRpbmc6MTBweDtoZWlnaHQ6NDBweH0uYWNvcmQtLWRpc2NvcmQtdGV4dGFyZWEtaW5wdXR7Zm9udC1zaXplOjE2cHg7Ym94LXNpemluZzpib3JkZXItYm94O3dpZHRoOjEwMCU7Ym9yZGVyLXJhZGl1czozcHg7Y29sb3I6dmFyKC0tdGV4dC1ub3JtYWwpO2JhY2tncm91bmQtY29sb3I6dmFyKC0taW5wdXQtYmFja2dyb3VuZCk7Ym9yZGVyOm5vbmU7dHJhbnNpdGlvbjpib3JkZXItY29sb3IgLjJzIGVhc2UtaW4tb3V0fS5hY29yZC0tZGlzY29yZC10ZXh0YXJlYS1pbnB1dDo6cGxhY2Vob2xkZXJ7dXNlci1zZWxlY3Q6bm9uZTtjb2xvcjp2YXIoLS1pbnB1dC1wbGFjZWhvbGRlci10ZXh0KX0uYWNvcmQtLWRpc2NvcmQtdGV4dGFyZWEtaW5wdXQ6aG92ZXJ7Ym9yZGVyLWNvbG9yOnZhcigtLWRlcHJlY2F0ZWQtdGV4dC1pbnB1dC1ib3JkZXItaG92ZXIpfS5hY29yZC0tZGlzY29yZC10ZXh0YXJlYS1pbnB1dDpmb2N1c3tib3JkZXItY29sb3I6dmFyKC0tdGV4dC1saW5rKX0uYWNvcmQtLWRpc2NvcmQtdGV4dGFyZWEtaW5wdXQuZXJyb3J7Ym9yZGVyLWNvbG9yOnZhcigtLXN0YXR1cy1kYW5nZXIpfS5hY29yZC0tZGlzY29yZC10ZXh0YXJlYS1pbnB1dC5zdWNjZXNze2JvcmRlci1jb2xvcjp2YXIoLS1ncmVlbi0zNjApfS5hY29yZC0tZGlzY29yZC10ZXh0YXJlYS1pbnB1dC5kaXNhYmxlZHtib3JkZXItY29sb3I6dmFyKC0tZGVwcmVjYXRlZC10ZXh0LWlucHV0LWJvcmRlci1kaXNhYmxlZCl9LmFjb3JkLS1kaXNjb3JkLXRleHRhcmVhLWlucHV0LmVkaXRhYmxle2JhY2tncm91bmQtY29sb3I6cmdiYSgwLDAsMCwwKTtib3JkZXItY29sb3I6cmdiYSgwLDAsMCwwKX0uYWNvcmQtLWRpc2NvcmQtdGV4dGFyZWEtdGV4dEFyZWF7aGVpZ2h0OmF1dG87cmVzaXplOm5vbmV9LmFjb3JkLS1kaXNjb3JkLXRleHRhcmVhLXNjcm9sbGJhckRlZmF1bHQ6Oi13ZWJraXQtc2Nyb2xsYmFye3dpZHRoOjE0cHg7aGVpZ2h0OjE0cHh9LmFjb3JkLS1kaXNjb3JkLXRleHRhcmVhLXNjcm9sbGJhckRlZmF1bHQ6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iLC5hY29yZC0tZGlzY29yZC10ZXh0YXJlYS1zY3JvbGxiYXJEZWZhdWx0Ojotd2Via2l0LXNjcm9sbGJhci10cmFja3tib3JkZXItcmFkaXVzOjdweDtiYWNrZ3JvdW5kLWNsaXA6cGFkZGluZy1ib3g7Ym9yZGVyOjNweCBzb2xpZCByZ2JhKDAsMCwwLDApfS5hY29yZC0tZGlzY29yZC10ZXh0YXJlYS1zY3JvbGxiYXJEZWZhdWx0Ojotd2Via2l0LXNjcm9sbGJhci10aHVtYntiYWNrZ3JvdW5kLWNvbG9yOnZhcigtLXNjcm9sbGJhci1hdXRvLXRodW1iKX0uYWNvcmQtLWRpc2NvcmQtdGV4dGFyZWEtc2Nyb2xsYmFyRGVmYXVsdDo6LXdlYmtpdC1zY3JvbGxiYXItdHJhY2t7YmFja2dyb3VuZC1jb2xvcjp2YXIoLS1zY3JvbGxiYXItYXV0by10cmFjayk7Ym9yZGVyLXdpZHRoOmluaXRpYWx9LmFjb3JkLS1kaXNjb3JkLXRleHRhcmVhLXNjcm9sbGJhcjo6LXdlYmtpdC1zY3JvbGxiYXItY29ybmVye2JvcmRlcjpub25lO2JhY2tncm91bmQ6bm9uZX1gO1xuIiwgImltcG9ydCBwYXRjaGVyIGZyb20gXCIuLi8uLi8uLi8uLi9wYXRjaGVyL2luZGV4LmpzXCI7XHJcblxyXG5pbXBvcnQgY3NzVGV4dCBmcm9tIFwiLi9zdHlsZS5zY3NzXCI7XHJcbnBhdGNoZXIuaW5qZWN0Q1NTKGNzc1RleHQpO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAvKiogQHBhcmFtIHtpbXBvcnQoXCJ2dWVcIikuQXBwfSB2dWVBcHAgKi9cclxuICBsb2FkKHZ1ZUFwcCkge1xyXG4gICAgdnVlQXBwLmNvbXBvbmVudChcImRpc2NvcmQtdGV4dGFyZWFcIiwge1xyXG4gICAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJhY29yZC0tZGlzY29yZC10ZXh0YXJlYS1pbnB1dFdyYXBwZXIgYWNvcmQtLWRpc2NvcmQtdGV4dGFyZWFcIj5cclxuICAgICAgICAgIDx0ZXh0YXJlYSBjbGFzcz1cImFjb3JkLS1kaXNjb3JkLXRleHRhcmVhLWlucHV0RGVmYXVsdCBhY29yZC0tZGlzY29yZC10ZXh0YXJlYS1pbnB1dCBhY29yZC0tZGlzY29yZC10ZXh0YXJlYS10ZXh0QXJlYSBhY29yZC0tZGlzY29yZC10ZXh0YXJlYS1zY3JvbGxiYXJEZWZhdWx0IGFjb3JkLS1kaXNjb3JkLXRleHRhcmVhLXNjcm9sbGJhclwiIDp2YWx1ZT1cIm1vZGVsVmFsdWVcIiA6cGxhY2Vob2xkZXI9XCJwbGFjZWhvbGRlclwiIDptYXhsZW5ndGg9XCJtYXhsZW5ndGhcIiA6Y29scz1cImNvbHNcIiA6cm93cz1cInJvd3NcIiA6c3R5bGU9XCJzdHlsZVwiIEBpbnB1dD1cIm9uSW5wdXRcIj48L3RleHRhcmVhPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICBgLFxyXG4gICAgICBwcm9wczogW1wibW9kZWxWYWx1ZVwiLCBcInBsYWNlaG9sZGVyXCIsIFwibWF4bGVuZ3RoXCIsIFwic3R5bGVcIiwgXCJjb2xzXCIsIFwicm93c1wiXSxcclxuICAgICAgZW1pdHM6IFtcImlucHV0XCIsICd1cGRhdGU6bW9kZWxWYWx1ZSddLFxyXG4gICAgICBtZXRob2RzOiB7XHJcbiAgICAgICAgb25JbnB1dChldmVudCkge1xyXG4gICAgICAgICAgdGhpcy4kZW1pdChcInVwZGF0ZTptb2RlbFZhbHVlXCIsIGV2ZW50LnRhcmdldC52YWx1ZSk7XHJcbiAgICAgICAgICB0aGlzLiRlbWl0KFwiaW5wdXRcIiwgeyBldmVudCwgdmFsdWU6IGV2ZW50LnRhcmdldC52YWx1ZSB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iLCAiaW1wb3J0IGRpc2NvcmRCdXR0b24gZnJvbSBcIi4vZGlzY29yZC1idXR0b24vaW5kZXguanNcIjtcclxuaW1wb3J0IGRpc2NvcmRDaGVjayBmcm9tIFwiLi9kaXNjb3JkLWNoZWNrL2luZGV4LmpzXCI7XHJcbmltcG9ydCBkaXNjb3JkSW5wdXQgZnJvbSBcIi4vZGlzY29yZC1pbnB1dC9pbmRleC5qc1wiO1xyXG5pbXBvcnQgZGlzY29yZFNlbGVjdCBmcm9tIFwiLi9kaXNjb3JkLXNlbGVjdC9pbmRleC5qc1wiO1xyXG5pbXBvcnQgZGlzY29yZFRleHRhcmVhIGZyb20gXCIuL2Rpc2NvcmQtdGV4dGFyZWEvaW5kZXguanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBsb2FkKHZ1ZUFwcCkge1xyXG4gICAgZGlzY29yZENoZWNrLmxvYWQodnVlQXBwKTtcclxuICAgIGRpc2NvcmRUZXh0YXJlYS5sb2FkKHZ1ZUFwcCk7XHJcbiAgICBkaXNjb3JkU2VsZWN0LmxvYWQodnVlQXBwKTtcclxuICAgIGRpc2NvcmRJbnB1dC5sb2FkKHZ1ZUFwcCk7XHJcbiAgICBkaXNjb3JkQnV0dG9uLmxvYWQodnVlQXBwKTtcclxuICB9XHJcbn0iLCAiLy8gaHR0cHM6Ly9sb2dhcmV0bS5jb20vYmxvZy9mb3JjaW5nLXJlY29tcHV0YXRpb24tb2YtY29tcHV0ZWQtcHJvcGVydGllcy9cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZWNvbXB1dGUodm0sIHByb3BOYW1lKSB7XHJcbiAgLy8gaGFuZGxlIG5vbi1leGlzdGVudCBwcm9wcy5cclxuICBpZiAoIXZtLiRfX3JlY29tcHV0YWJsZXMgfHwgIXZtLiRfX3JlY29tcHV0YWJsZXNbcHJvcE5hbWVdKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICB2bS4kX19yZWNvbXB1dGFibGVzW3Byb3BOYW1lXS5iYWNrZG9vcisrO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmVjb21wdXRhYmxlKGZuLCBuYW1lKSB7XHJcbiAgY29uc3QgcmVhY3RpdmUgPSBWdWUuY29tcHV0ZWQoe1xyXG4gICAgYmFja2Rvb3I6IDBcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuICAgIC8vIGluaXRpYWxpemUgYSBtYXAgb25jZS5cclxuICAgIGlmICghdGhpcy4kX19yZWNvbXB1dGFibGVzKSB7XHJcbiAgICAgIHRoaXMuJF9fcmVjb21wdXRhYmxlcyA9IHt9O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGFkZCBhIHJlZmVyZW5jZSB0byBteSByZWFjdGl2ZSBiYWNrZG9vciB0cmlnZ2VyLlxyXG4gICAgaWYgKCF0aGlzLiRfX3JlY29tcHV0YWJsZXNbZm4ubmFtZSB8fCBuYW1lXSkge1xyXG4gICAgICB0aGlzLiRfX3JlY29tcHV0YWJsZXNbZm4ubmFtZSB8fCBuYW1lXSA9IHJlYWN0aXZlO1xyXG4gICAgfVxyXG5cclxuICAgIHJlYWN0aXZlLmJhY2tkb29yOyAvLyByZWZlcmVuY2UgaXQhXHJcblxyXG4gICAgcmV0dXJuIGZuLmNhbGwodGhpcyk7XHJcbiAgfTtcclxufSIsICJpbXBvcnQgdnVlQ29tcG9uZW50cyBmcm9tIFwiLi9jb21wb25lbnRzL2luZGV4LmpzXCI7XHJcbmltcG9ydCB7IHJlY29tcHV0YWJsZSwgcmVjb21wdXRlIH0gZnJvbSBcIi4vdXRpbHMvcmVjb21wdXRlLmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgY29tcG9uZW50czoge1xyXG4gICAgbG9hZCh2dWVBcHApIHtcclxuICAgICAgdnVlQ29tcG9uZW50cy5sb2FkKHZ1ZUFwcCk7XHJcbiAgICB9XHJcbiAgfSxcclxuICByZWFkeToge1xyXG4gICAgYXN5bmMgd2hlbigpIHtcclxuICAgICAgd2hpbGUgKCF3aW5kb3cuVnVlKSB7XHJcbiAgICAgICAgYXdhaXQgbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIDEwMCkpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSxcclxuICAgIGdldCBpcygpIHtcclxuICAgICAgcmV0dXJuICEhd2luZG93LlZ1ZTtcclxuICAgIH1cclxuICB9LFxyXG4gIGdldCBWdWUoKSB7XHJcbiAgICByZXR1cm4gd2luZG93LlZ1ZTtcclxuICB9LFxyXG4gIHV0aWxzOiB7XHJcbiAgICBjb21wdXRlZDoge1xyXG4gICAgICByZWNvbXB1dGUsXHJcbiAgICAgIHJlY29tcHV0YWJsZVxyXG4gICAgfVxyXG4gIH1cclxufSIsICJpbXBvcnQgcGF0Y2hlciBmcm9tIFwiLi4vcGF0Y2hlci9pbmRleC5qc1wiO1xyXG5pbXBvcnQgc3R5bGVDU1NUZXh0IGZyb20gXCIuL3N0eWxlcy5zY3NzXCI7XHJcbnBhdGNoZXIuaW5qZWN0Q1NTKHN0eWxlQ1NTVGV4dCk7XHJcblxyXG5pbXBvcnQgdG9vbHRpcHMgZnJvbSBcIi4vdG9vbHRpcHMuanNcIjtcclxuaW1wb3J0IG5vdGlmaWNhdGlvbnMgZnJvbSBcIi4vbm90aWZpY2F0aW9ucy5qc1wiO1xyXG5pbXBvcnQgY29udGV4dE1lbnVzIGZyb20gXCIuL2NvbnRleHRNZW51cy5qc1wiO1xyXG5pbXBvcnQgY29tcG9uZW50cyBmcm9tIFwiLi9jb21wb25lbnRzLmpzXCI7XHJcbmltcG9ydCBtb2RhbHMgZnJvbSBcIi4vbW9kYWxzLmpzeFwiO1xyXG5pbXBvcnQgdG9hc3RzIGZyb20gXCIuL3RvYXN0cy5qc1wiO1xyXG5pbXBvcnQgdnVlIGZyb20gXCIuL3Z1ZS9pbmRleC5qc1wiO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICB0b29sdGlwcyxcclxuICBub3RpZmljYXRpb25zLFxyXG4gIGNvbnRleHRNZW51cyxcclxuICBjb21wb25lbnRzLFxyXG4gIG1vZGFscyxcclxuICB0b2FzdHMsXHJcbiAgdnVlXHJcbn0iLCAiY29uc3Qgc2hhcmVkID0ge307XHJcbmV4cG9ydCBkZWZhdWx0IHNoYXJlZDsiLCAiaW1wb3J0IGV4dGVuc2lvbnMgZnJvbSBcIi4uL2V4dGVuc2lvbnMvaW5kZXguanNcIjtcclxuaW1wb3J0IGxvZ2dlciBmcm9tIFwiLi4vdXRpbHMvbG9nZ2VyLmpzXCI7XHJcbmltcG9ydCBpMThuIGZyb20gXCIuLi9pMThuL2luZGV4LmpzXCI7XHJcbmltcG9ydCB3ZWJzb2NrZXQgZnJvbSBcIi4uL3dlYnNvY2tldC9pbmRleC5qc1wiO1xyXG5cclxubGV0IGRldk1vZGVFbmFibGVkID0gZmFsc2U7XHJcblxyXG5sZXQgaXNMb2FkaW5nID0gZmFsc2U7XHJcblxyXG5sZXQgbG9hZGVkO1xyXG5sZXQgaW5zdGFsbGVkO1xyXG5cclxuY29uc3QgZXh0ZW5zaW9uID0ge1xyXG4gIGdldCBsb2FkZWQoKSB7IHJldHVybiBsb2FkZWQ7IH0sXHJcbiAgZ2V0IGluc3RhbGxlZCgpIHsgcmV0dXJuIGluc3RhbGxlZDsgfSxcclxuICB1bmxvYWQoKSB7XHJcbiAgICBpZiAoIWxvYWRlZCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgZXh0ZW5zaW9ucy5sb2FkZXIudW5sb2FkKFwiRGV2ZWxvcG1lbnRcIik7XHJcbiAgICBsb2FkZWQgPSBudWxsO1xyXG4gICAgaW5zdGFsbGVkID0gbnVsbDtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH0sXHJcbiAgYXN5bmMgbG9hZChzb3VyY2UsIG1hbmlmZXN0KSB7XHJcbiAgICBpZiAoIXNvdXJjZSB8fCAhbWFuaWZlc3QpIHRocm93IG5ldyBFcnJvcihgU291cmNlIGFuZCBtYW5pZmVzdCBhcmUgcmVxdWlyZWQgdG8gbG9hZCBhbiBleHRlbnNpb24hYCk7XHJcbiAgICBpZiAobG9hZGVkKSB0aHJvdyBuZXcgRXJyb3IoYEV4dGVuc2lvbiBpcyBhbHJlYWR5IGxvYWRlZCFgKTtcclxuICAgIGlmIChpc0xvYWRpbmcpIHJldHVybiBmYWxzZTtcclxuICAgIGlzTG9hZGluZyA9IHRydWU7XHJcbiAgICB0cnkge1xyXG4gICAgICBsb2FkZWQgPSBhd2FpdCBleHRlbnNpb25zLmxvYWRlci5sb2FkKFwiRGV2ZWxvcG1lbnRcIiwgeyBzb3VyY2UsIG1hbmlmZXN0IH0pO1xyXG4gICAgICBpbnN0YWxsZWQgPSB7XHJcbiAgICAgICAgbWFuaWZlc3RcclxuICAgICAgfTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBsb2dnZXIuZXJyb3IoYFVuYWJsZSB0byBsb2FkIGRldmVsb3BtZW50IGV4dGVuc2lvbi5gLCBpMThuLmxvY2FsaXplKG1hbmlmZXN0LmFib3V0Lm5hbWUpLCBlcnIpO1xyXG4gICAgICBpc0xvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaXNMb2FkaW5nID0gZmFsc2U7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IG91dCA9IHtcclxuICBnZXQgZW5hYmxlZCgpIHtcclxuICAgIHJldHVybiBkZXZNb2RlRW5hYmxlZDtcclxuICB9LFxyXG4gIHNldCBlbmFibGVkKHZhbHVlKSB7XHJcbiAgICBpZiAoIWdsb2JhbFRoaXNbXCI8UFJFTE9BRF9LRVk+XCJdLmlzRGV2VG9vbHNPcGVuKCkpIHRocm93IG5ldyBFcnJvcihcIkRldiBtb2RlIHN0YXR1cyBjYW4gb25seSBiZSBtb2RpZmllZCB3aGVuIERldlRvb2xzIGlzIG9wZW4hXCIpO1xyXG4gICAgZGV2TW9kZUVuYWJsZWQgPSB2YWx1ZTtcclxuICB9LFxyXG4gIGdldCBleHRlbnNpb24oKSB7XHJcbiAgICBpZiAoIWRldk1vZGVFbmFibGVkKSB0aHJvdyBuZXcgRXJyb3IoXCJEZXYgbW9kZSBpcyBub3QgZW5hYmxlZCFcIik7XHJcbiAgICByZXR1cm4gZXh0ZW5zaW9uO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgb3V0O1xyXG5cclxubGV0IGlzUHJvY2Vzc2luZyA9IGZhbHNlO1xyXG53ZWJzb2NrZXQuc2V0KFxyXG4gIFwiVXBkYXRlRGV2ZWxvcG1lbnRFeHRlbnNpb25cIixcclxuICBhc3luYyAoeyBzb3VyY2UsIG1hbmlmZXN0IH0gPSB7fSkgPT4ge1xyXG4gICAgaWYgKCFkZXZNb2RlRW5hYmxlZClcclxuICAgICAgcmV0dXJuIGxvZ2dlci53YXJuKGBEZXZlbG9wbWVudCBleHRlbnNpb24gd2FzIHNlbnQgYmVmb3JlIGRldiBtb2RlIHdhcyBlbmFibGVkLmApO1xyXG5cclxuICAgIGlmICghc291cmNlIHx8ICFtYW5pZmVzdClcclxuICAgICAgcmV0dXJuIGxvZ2dlci53YXJuKGBEZXZlbG9wbWVudCBleHRlbnNpb24gd2FzIHNlbnQgd2l0aG91dCBzb3VyY2Ugb3IgbWFuaWZlc3QuYCk7XHJcblxyXG4gICAgaWYgKGlzUHJvY2Vzc2luZylcclxuICAgICAgcmV0dXJuIGxvZ2dlci53YXJuKGBEZXZlbG9wbWVudCBleHRlbnNpb24gd2FzIHNlbnQgd2hpbGUgZXh0ZW5zaW9uIHdhcyBhbHJlYWR5IGJlaW5nIHByb2Nlc3NlZC5gKTtcclxuXHJcbiAgICBpc1Byb2Nlc3NpbmcgPSB0cnVlO1xyXG5cclxuICAgIGV4dGVuc2lvbi51bmxvYWQoKTtcclxuICAgIGF3YWl0IG5ldyBQcm9taXNlKChyKSA9PiBzZXRUaW1lb3V0KHIsIDEpKTtcclxuICAgIGxldCBzdWNjZXNzID0gYXdhaXQgZXh0ZW5zaW9uLmxvYWQoc291cmNlLCBtYW5pZmVzdCk7XHJcbiAgICBpZiAoc3VjY2VzcykgbG9nZ2VyLmluZm8oYERldmVsb3BtZW50IGV4dGVuc2lvbiBpcyBsb2FkZWQhICgke2kxOG4ubG9jYWxpemUobWFuaWZlc3QuYWJvdXQubmFtZSl9KWApO1xyXG4gICAgaXNQcm9jZXNzaW5nID0gZmFsc2U7XHJcbiAgfVxyXG4pIiwgImV4cG9ydCBkZWZhdWx0IHtcclxuICBwcm9jZXNzOiBnbG9iYWxUaGlzW1wiPFBSRUxPQURfS0VZPlwiXS5wcm9jZXNzLFxyXG4gIGlzRGV2VG9vbHNPcGVuOiBnbG9iYWxUaGlzW1wiPFBSRUxPQURfS0VZPlwiXS5pc0RldlRvb2xzT3BlblxyXG59XHJcblxyXG4iLCAiaW1wb3J0IG1vZHVsZXMgZnJvbSAnLi9tb2R1bGVzJztcclxuaW1wb3J0IGRldiBmcm9tICcuL2Rldic7XHJcbmltcG9ydCB1dGlscyBmcm9tICcuL3V0aWxzJztcclxuaW1wb3J0IGV4dGVuc2lvbnMgZnJvbSAnLi9leHRlbnNpb25zJztcclxuaW1wb3J0IGkxOG4gZnJvbSAnLi9pMThuJztcclxuaW1wb3J0IHN0b3JhZ2UgZnJvbSAnLi9zdG9yYWdlJztcclxuaW1wb3J0IGV2ZW50cyBmcm9tICcuL2V2ZW50cyc7XHJcbmltcG9ydCBwYXRjaGVyIGZyb20gJy4vcGF0Y2hlcic7XHJcbmltcG9ydCBpbnRlcm5hbCBmcm9tICcuL2ludGVybmFsJztcclxuaW1wb3J0IHdlYnNvY2tldCBmcm9tICcuL3dlYnNvY2tldCc7XHJcbmltcG9ydCBkb20gZnJvbSAnLi9kb20nO1xyXG5pbXBvcnQgdWkgZnJvbSAnLi91aS9pbmRleC5qcyc7XHJcbmltcG9ydCBzaGFyZWQgZnJvbSAnLi9zaGFyZWQvaW5kZXguanMnO1xyXG5cclxuLy8gdXRpbHMubG9nZ2VyLmRlYnVnKGBQUkVMT0FEX0tFWTogPFBSRUxPQURfS0VZPmApO1xyXG5cclxuZnVuY3Rpb24gZGV2RXJyb3IoYXBpKSB7XHJcbiAgcmV0dXJuIG5ldyBFcnJvcihgVGhlICR7YXBpfSBBUEkgY2FuIG9ubHkgYmUgYWNjZXNzZWQgd2hlbiBEZXYgbW9kZSBpcyBlbmFibGVkIWApO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgZXhwb3NlZEFQSToge1xyXG4gICAgZGV2LFxyXG4gICAgZ2V0IHV0aWxzKCkge1xyXG4gICAgICBpZiAoIWRldi5lbmFibGVkKSB0aHJvdyBkZXZFcnJvcihcIlV0aWxzXCIpO1xyXG4gICAgICByZXR1cm4gdXRpbHM7XHJcbiAgICB9LFxyXG4gICAgZ2V0IGkxOG4oKSB7XHJcbiAgICAgIGlmICghZGV2LmVuYWJsZWQpIHRocm93IGRldkVycm9yKFwiaTE4blwiKTtcclxuICAgICAgcmV0dXJuIGkxOG47XHJcbiAgICB9LFxyXG4gICAgZ2V0IGV2ZW50cygpIHtcclxuICAgICAgaWYgKCFkZXYuZW5hYmxlZCkgdGhyb3cgZGV2RXJyb3IoXCJFdmVudHNcIik7XHJcbiAgICAgIHJldHVybiBldmVudHM7XHJcbiAgICB9LFxyXG4gICAgZ2V0IHVpKCkge1xyXG4gICAgICBpZiAoIWRldi5lbmFibGVkKSB0aHJvdyBkZXZFcnJvcihcIlVJXCIpO1xyXG4gICAgICByZXR1cm4gdWk7XHJcbiAgICB9LFxyXG4gICAgZ2V0IHNoYXJlZCgpIHtcclxuICAgICAgaWYgKCFkZXYuZW5hYmxlZCkgdGhyb3cgZGV2RXJyb3IoXCJTaGFyZWRcIik7XHJcbiAgICAgIHJldHVybiBzaGFyZWQ7XHJcbiAgICB9LFxyXG4gICAgZ2V0IGRvbSgpIHtcclxuICAgICAgaWYgKCFkZXYuZW5hYmxlZCkgdGhyb3cgZGV2RXJyb3IoXCJET01cIik7XHJcbiAgICAgIHJldHVybiBkb207XHJcbiAgICB9LFxyXG4gICAgZ2V0IHBhdGNoZXIoKSB7XHJcbiAgICAgIGlmICghZGV2LmVuYWJsZWQpIHRocm93IGRldkVycm9yKFwiUGF0Y2hlclwiKTtcclxuICAgICAgcmV0dXJuIHBhdGNoZXI7XHJcbiAgICB9LFxyXG4gICAgZ2V0IHN0b3JhZ2UoKSB7XHJcbiAgICAgIGlmICghZGV2LmVuYWJsZWQpIHRocm93IGRldkVycm9yKFwiU3RvcmFnZVwiKTtcclxuICAgICAgcmV0dXJuIHN0b3JhZ2U7XHJcbiAgICB9LFxyXG4gICAgZ2V0IG1vZHVsZXMoKSB7XHJcbiAgICAgIGlmICghZGV2LmVuYWJsZWQpIHRocm93IGRldkVycm9yKFwiTW9kdWxlc1wiKTtcclxuICAgICAgcmV0dXJuIG1vZHVsZXM7XHJcbiAgICB9LFxyXG4gICAgZ2V0IGV4dGVuc2lvbnMoKSB7XHJcbiAgICAgIGlmICghZGV2LmVuYWJsZWQpIHRocm93IGRldkVycm9yKFwiRXh0ZW5zaW9uc1wiKTtcclxuICAgICAgcmV0dXJuIGV4dGVuc2lvbnM7XHJcbiAgICB9LFxyXG4gICAgZ2V0IGludGVybmFsKCkge1xyXG4gICAgICBpZiAoIWRldi5lbmFibGVkKSB0aHJvdyBkZXZFcnJvcihcIkludGVybmFsXCIpO1xyXG4gICAgICByZXR1cm4gaW50ZXJuYWw7XHJcbiAgICB9LFxyXG4gICAgZ2V0IHdlYnNvY2tldCgpIHtcclxuICAgICAgaWYgKCFkZXYuZW5hYmxlZCkgdGhyb3cgZGV2RXJyb3IoXCJXZWJzb2NrZXRcIik7XHJcbiAgICAgIHJldHVybiB3ZWJzb2NrZXQ7XHJcbiAgICB9XHJcbiAgfSxcclxuICB1bmV4cG9zZWRBUEk6IHtcclxuICAgIGRldixcclxuICAgIG1vZHVsZXMsXHJcbiAgICB1dGlscyxcclxuICAgIGV4dGVuc2lvbnMsXHJcbiAgICBpMThuLFxyXG4gICAgc3RvcmFnZSxcclxuICAgIGV2ZW50cyxcclxuICAgIHBhdGNoZXIsXHJcbiAgICBpbnRlcm5hbCxcclxuICAgIHdlYnNvY2tldCxcclxuICAgIHNoYXJlZCxcclxuICAgIHVpLFxyXG4gICAgZG9tXHJcbiAgfVxyXG59IiwgImltcG9ydCBldmVudHMgZnJvbSBcIi4uL2FwaS9ldmVudHMvaW5kZXguanNcIjtcclxuXHJcbmNvbnN0IG9nVGl0bGVTZXR0ZXIgPSBkb2N1bWVudC5fX2xvb2t1cFNldHRlcl9fKFwidGl0bGVcIik7XHJcbmNvbnN0IG9nVGl0bGVHZXR0ZXIgPSBkb2N1bWVudC5fX2xvb2t1cEdldHRlcl9fKFwidGl0bGVcIik7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoXHJcbiAgZG9jdW1lbnQsXHJcbiAgXCJ0aXRsZVwiLFxyXG4gIHtcclxuICAgIGdldCgpIHtcclxuICAgICAgcmV0dXJuIG9nVGl0bGVHZXR0ZXIuY2FsbCh0aGlzKTtcclxuICAgIH0sXHJcbiAgICBzZXQodikge1xyXG4gICAgICBldmVudHMuZW1pdChcIkRvY3VtZW50VGl0bGVDaGFuZ2VcIiwgdik7XHJcbiAgICAgIHJldHVybiBvZ1RpdGxlU2V0dGVyLmNhbGwodGhpcywgdik7XHJcbiAgICB9XHJcbiAgfVxyXG4pOyIsICJpbXBvcnQgbW9kdWxlcyBmcm9tIFwiLi4vYXBpL21vZHVsZXMvaW5kZXguanNcIjtcclxuaW1wb3J0IG1vZGFscyBmcm9tIFwiLi4vYXBpL3VpL21vZGFscy5qc3hcIjtcclxuaW1wb3J0IG5vdGlmaWNhdGlvbnMgZnJvbSBcIi4uL2FwaS91aS9ub3RpZmljYXRpb25zLmpzXCI7XHJcbmltcG9ydCBleHRlbnNpb25zIGZyb20gXCIuLi9hcGkvZXh0ZW5zaW9ucy9pbmRleC5qc1wiO1xyXG5pbXBvcnQgd2Vic29ja2V0IGZyb20gXCIuLi9hcGkvd2Vic29ja2V0L2luZGV4LmpzXCI7XHJcblxyXG53ZWJzb2NrZXQuc2V0KFwiSW5zdGFsbEV4dGVuc2lvblwiLCBhc3luYyAoeyB1cmwgfSA9IHt9KSA9PiB7XHJcbiAgaWYgKCF1cmwpIHJldHVybjtcclxuXHJcbiAgYXdhaXQgbW9kdWxlcy5uYXRpdmUud2luZG93LnNldEFsd2F5c09uVG9wKDAsIHRydWUpO1xyXG4gIGF3YWl0IG5ldyBQcm9taXNlKHIgPT4gc2V0VGltZW91dChyLCAyNTApKTtcclxuICBhd2FpdCBtb2R1bGVzLm5hdGl2ZS53aW5kb3cuc2V0QWx3YXlzT25Ub3AoMCwgdHJ1ZSk7XHJcblxyXG4gIGNvbnN0IHN1Y2Nlc3MgPSBhd2FpdCBtb2RhbHMuc2hvdy5jb25maXJtYXRpb24oXHJcbiAgICBhY29yZC5pMThuLmZvcm1hdChcIklNUE9SVF9FWFRFTlNJT05fTU9EQUxfVElUTEVcIiksXHJcbiAgICBhY29yZC5pMThuLmZvcm1hdChcIklNUE9SVF9FWFRFTlNJT05fTU9EQUxfREVTQ1JJUFRJT05cIiwgdXJsKVxyXG4gICk7XHJcblxyXG4gIGlmICghc3VjY2VzcykgcmV0dXJuO1xyXG5cclxuICB0cnkge1xyXG4gICAgYXdhaXQgZXh0ZW5zaW9ucy5sb2FkKHVybCk7XHJcbiAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICBub3RpZmljYXRpb25zLnNob3cuZXJyb3IoYCR7ZXJyfWAsIHsgdGltZW91dDogMzAwMDAgfSk7XHJcbiAgfVxyXG59KTsiLCAiZXhwb3J0IGRlZmF1bHQgYFxuW2NsYXNzKj1hY29yZC0tXXtib3gtc2l6aW5nOmJvcmRlci1ib3h9W2NsYXNzKj1hY29yZC0tXSAqe2JveC1zaXppbmc6Ym9yZGVyLWJveH0uYWNvcmQtLXRhYnMtY29udGVudC1jb250YWluZXJ7cGFkZGluZzozMnB4IDE2cHg7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmZsZXgtc3RhcnQ7anVzdGlmeS1jb250ZW50OmNlbnRlcjt3aWR0aDoxMDAlfS5hY29yZC0tdGFicy1jb250ZW50LWNvbnRhaW5lcj4udGFie3dpZHRoOjEwMCV9LmFjb3JkLS10YWJzLXRhYi1idXR0b24uc3RvcmUtdGFiLWJ1dHRvbntiYWNrZ3JvdW5kLWNvbG9yOnZhcigtLXN0YXR1cy1wb3NpdGl2ZS1iYWNrZ3JvdW5kKTtjb2xvcjp2YXIoLS1zdGF0dXMtcG9zaXRpdmUtdGV4dCl9LmFjb3JkLS10YWJzLXRhYi1idXR0b24uc3RvcmUtdGFiLWJ1dHRvbi5zZWxlY3RlZHtjb2xvcjp2YXIoLS10ZXh0LXBvc2l0aXZlKTtiYWNrZ3JvdW5kLWNvbG9yOnZhcigtLWJhY2tncm91bmQtbW9kaWZpZXItc2VsZWN0ZWQpfWA7XG4iLCAiZXhwb3J0IGRlZmF1bHQge1xyXG4gIC8qKiBAcGFyYW0ge2ltcG9ydChcInZ1ZVwiKS5BcHB9IHZ1ZUFwcCAqL1xyXG4gIGxvYWQodnVlQXBwKSB7XHJcbiAgICB2dWVBcHAuY29tcG9uZW50KFxyXG4gICAgICBcImhvbWUtcGFnZVwiLFxyXG4gICAgICB7XHJcbiAgICAgICAgdGVtcGxhdGU6IGBcclxuICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJ3aWR0aDogMzAwcHg7XCI+XHJcbiAgICAgICAgICAgICAgPGRpc2NvcmQtc2VsZWN0IHYtbW9kZWw9XCJ2YWx1ZVwiIDpvcHRpb25zPVwib3B0aW9uc1wiIC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8aDE+e3sgdmFsdWUgfX08L2gxPlxyXG4gICAgICAgICAgICA8YnIgLz5cclxuICAgICAgICAgICAgPGRpc2NvcmQtY2hlY2sgdi1tb2RlbD1cImNoZWNrZWRcIiAvPlxyXG4gICAgICAgICAgICA8aDE+e3sgY2hlY2tlZCB9fTwvaDE+XHJcbiAgICAgICAgICAgIDxkaXNjb3JkLWNoZWNrIHYtbW9kZWw9XCJjaGVja2VkXCIgLz5cclxuICAgICAgICAgICAgPGgxPnt7IGNoZWNrZWQgfX08L2gxPlxyXG4gICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIGAsXHJcbiAgICAgICAgZGF0YSgpIHtcclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHZhbHVlOiBcIjFcIixcclxuICAgICAgICAgICAgY2hlY2tlZDogZmFsc2UsXHJcbiAgICAgICAgICAgIG9wdGlvbnM6IFtcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCIxXCIsXHJcbiAgICAgICAgICAgICAgICBsYWJlbDogXCJPcHRpb24gMVwiXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCIyXCIsXHJcbiAgICAgICAgICAgICAgICBsYWJlbDogXCJPcHRpb24gMlwiXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCIzXCIsXHJcbiAgICAgICAgICAgICAgICBsYWJlbDogXCJPcHRpb24gM1wiXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICApO1xyXG4gIH1cclxufSIsICJleHBvcnQgZGVmYXVsdCBgXG4uYWNvcmQtLWluc3RhbGxlZC1leHRlbnNpb25zLXBhZ2V7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmZsZXgtc3RhcnQ7anVzdGlmeS1jb250ZW50OmNlbnRlcjtwYWRkaW5nOjAgMTZweH0uYWNvcmQtLWluc3RhbGxlZC1leHRlbnNpb25zLXBhZ2UgLmNvbnRhaW5lcnt3aWR0aDoxMDAlO21heC13aWR0aDoxMDI0cHg7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOmNvbHVtbn0uYWNvcmQtLWluc3RhbGxlZC1leHRlbnNpb25zLXBhZ2UgLmNvbnRhaW5lcj4udG9we2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7Z2FwOjhweH0uYWNvcmQtLWluc3RhbGxlZC1leHRlbnNpb25zLXBhZ2UgLmNvbnRhaW5lcj4udG9wPi5zZWFyY2h7d2lkdGg6ODAlfS5hY29yZC0taW5zdGFsbGVkLWV4dGVuc2lvbnMtcGFnZSAuY29udGFpbmVyPi50b3A+LmNhdGVnb3J5e3dpZHRoOjIwJX0uYWNvcmQtLWluc3RhbGxlZC1leHRlbnNpb25zLXBhZ2UgLmNvbnRhaW5lcj4uYm90dG9te2Rpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpjb2x1bW47Z2FwOjE2cHg7bWFyZ2luLXRvcDoxNnB4fWA7XG4iLCAiaW1wb3J0IHBhdGNoZXIgZnJvbSBcIi4uLy4uLy4uLy4uLy4uLy4uL2FwaS9wYXRjaGVyL2luZGV4LmpzXCI7XHJcbmltcG9ydCBpMThuIGZyb20gXCIuLi8uLi8uLi8uLi8uLi8uLi9hcGkvaTE4bi9pbmRleC5qc1wiO1xyXG5pbXBvcnQgZXh0ZW5zaW9ucyBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vLi4vYXBpL2V4dGVuc2lvbnMvaW5kZXguanNcIjtcclxuaW1wb3J0IGNzc1RleHQgZnJvbSBcIi4vc3R5bGUuc2Nzc1wiO1xyXG5wYXRjaGVyLmluamVjdENTUyhjc3NUZXh0KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAvKiogQHBhcmFtIHtpbXBvcnQoXCJ2dWVcIikuQXBwfSB2dWVBcHAgKi9cclxuICBsb2FkKHZ1ZUFwcCkge1xyXG4gICAgdnVlQXBwLmNvbXBvbmVudChcclxuICAgICAgXCJpbnN0YWxsZWQtZXh0ZW5zaW9ucy1wYWdlXCIsXHJcbiAgICAgIHtcclxuICAgICAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImFjb3JkLS1pbnN0YWxsZWQtZXh0ZW5zaW9ucy1wYWdlXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidG9wXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2VhcmNoXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXNjb3JkLWlucHV0IHYtbW9kZWw9XCJzZWFyY2hUZXh0XCIgOnBsYWNlaG9sZGVyPVwiaTE4bkZvcm1hdCgnU0VBUkNIJylcIiAvPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2F0ZWdvcnlcIj5cclxuICAgICAgICAgICAgICAgICAgPGRpc2NvcmQtc2VsZWN0IHYtbW9kZWw9XCJzZWFyY2hDYXRlZ29yeVRleHRcIiA6b3B0aW9ucz1cIlt7dmFsdWU6ICdhbGwnLCBsYWJlbDogaTE4bkZvcm1hdCgnQUxMJyl9LCB7dmFsdWU6ICdwbHVnaW4nLCBsYWJlbDogaTE4bkZvcm1hdCgnUExVR0lOUycpfSwge3ZhbHVlOiAndGhlbWUnLCBsYWJlbDogaTE4bkZvcm1hdCgnVEhFTUVTJyl9XVwiIC8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYm90dG9tXCI+XHJcbiAgICAgICAgICAgICAgICA8aW5zdGFsbGVkLWV4dGVuc2lvbi1jYXJkIHYtZm9yPVwiKGV4dGVuc2lvbiwgaWQpIG9mIGZpbHRlcmVkRXh0ZW5zaW9uc1wiIDppZD1cImlkXCIgOmV4dGVuc2lvbj1cImV4dGVuc2lvblwiIDprZXk9XCJpZFwiIC8+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgYCxcclxuICAgICAgICBkYXRhKCkge1xyXG4gICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgc2VhcmNoVGV4dDogXCJcIixcclxuICAgICAgICAgICAgc2VhcmNoQ2F0ZWdvcnlUZXh0OiBcImFsbFwiLFxyXG4gICAgICAgICAgICBleHRlbnNpb25zOiB7fSxcclxuICAgICAgICAgICAgZmlsdGVyZWRFeHRlbnNpb25zOiB7fVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbWV0aG9kczoge1xyXG4gICAgICAgICAgb25TdG9yYWdlVXBkYXRlKCkge1xyXG4gICAgICAgICAgICB0aGlzLmV4dGVuc2lvbnMgPSBleHRlbnNpb25zLnN0b3JhZ2UuaW5zdGFsbGVkLmdob3N0O1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUZpbHRlcmVkKCk7XHJcbiAgICAgICAgICAgIHRoaXMuJGZvcmNlVXBkYXRlKCk7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgaTE4bkZvcm1hdDogaTE4bi5mb3JtYXQsXHJcbiAgICAgICAgICB1cGRhdGVGaWx0ZXJlZCgpIHtcclxuICAgICAgICAgICAgY29uc3Qgc2VhcmNoVGV4dCA9IHRoaXMuc2VhcmNoVGV4dC50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICBjb25zdCBzZWFyY2hDYXRlZ29yeVRleHQgPSB0aGlzLnNlYXJjaENhdGVnb3J5VGV4dDtcclxuICAgICAgICAgICAgdGhpcy5maWx0ZXJlZEV4dGVuc2lvbnMgPSBPYmplY3QuZnJvbUVudHJpZXMoXHJcbiAgICAgICAgICAgICAgT2JqZWN0LmVudHJpZXModGhpcy5leHRlbnNpb25zKVxyXG4gICAgICAgICAgICAgICAgLmZpbHRlcigoW2lkLCBleHRlbnNpb25dKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIGlmIChzZWFyY2hDYXRlZ29yeVRleHQgPT09IFwiYWxsXCIpIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICByZXR1cm4gZXh0ZW5zaW9uLm1hbmlmZXN0LnR5cGUgPT09IHNlYXJjaENhdGVnb3J5VGV4dDtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZmlsdGVyKChbaWQsIGV4dGVuc2lvbl0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgaWYgKCFzZWFyY2hUZXh0KSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgcmV0dXJuIGkxOG4ubG9jYWxpemUoZXh0ZW5zaW9uLm1hbmlmZXN0LmFib3V0Lm5hbWUpLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoVGV4dCkgfHwgaTE4bi5sb2NhbGl6ZShleHRlbnNpb24ubWFuaWZlc3QuYWJvdXQuZGVzY3JpcHRpb24pLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoVGV4dCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgd2F0Y2g6IHtcclxuICAgICAgICAgIHNlYXJjaFRleHQoKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlRmlsdGVyZWQoKTtcclxuICAgICAgICAgICAgdGhpcy4kZm9yY2VVcGRhdGUoKTtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBzZWFyY2hDYXRlZ29yeVRleHQoKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlRmlsdGVyZWQoKTtcclxuICAgICAgICAgICAgdGhpcy4kZm9yY2VVcGRhdGUoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIG1vdW50ZWQoKSB7XHJcbiAgICAgICAgICB0aGlzLm9uU3RvcmFnZVVwZGF0ZSgpO1xyXG4gICAgICAgICAgdGhpcy51cGRhdGVGaWx0ZXJlZCgpO1xyXG4gICAgICAgICAgdGhpcy4kZm9yY2VVcGRhdGUoKTtcclxuICAgICAgICAgIGV4dGVuc2lvbnMuc3RvcmFnZS5pbnN0YWxsZWQub24oXCJVUERBVEVcIiwgdGhpcy5vblN0b3JhZ2VVcGRhdGUpO1xyXG4gICAgICAgICAgZXh0ZW5zaW9ucy5zdG9yYWdlLmluc3RhbGxlZC5vbihcIlNFVFwiLCB0aGlzLm9uU3RvcmFnZVVwZGF0ZSk7XHJcbiAgICAgICAgICBleHRlbnNpb25zLnN0b3JhZ2UuaW5zdGFsbGVkLm9uKFwiREVMRVRFXCIsIHRoaXMub25TdG9yYWdlVXBkYXRlKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHVubW91bnRlZCgpIHtcclxuICAgICAgICAgIGV4dGVuc2lvbnMuc3RvcmFnZS5pbnN0YWxsZWQub2ZmKFwiVVBEQVRFXCIsIHRoaXMub25TdG9yYWdlVXBkYXRlKTtcclxuICAgICAgICAgIGV4dGVuc2lvbnMuc3RvcmFnZS5pbnN0YWxsZWQub2ZmKFwiU0VUXCIsIHRoaXMub25TdG9yYWdlVXBkYXRlKTtcclxuICAgICAgICAgIGV4dGVuc2lvbnMuc3RvcmFnZS5pbnN0YWxsZWQub2ZmKFwiREVMRVRFXCIsIHRoaXMub25TdG9yYWdlVXBkYXRlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgfVxyXG59IiwgImV4cG9ydCBkZWZhdWx0IHtcclxuICAvKiogQHBhcmFtIHtpbXBvcnQoXCJ2dWVcIikuQXBwfSB2dWVBcHAgKi9cclxuICBsb2FkKHZ1ZUFwcCkge1xyXG4gICAgdnVlQXBwLmNvbXBvbmVudChcclxuICAgICAgXCJzZXR0aW5ncy1wYWdlXCIsXHJcbiAgICAgIHtcclxuICAgICAgICB0ZW1wbGF0ZTogXCI8ZGl2PlNldHRpbmdzIFBhZ2U8L2Rpdj5cIixcclxuICAgICAgfVxyXG4gICAgKTtcclxuICB9XHJcbn0iLCAiZXhwb3J0IGRlZmF1bHQge1xyXG4gIC8qKiBAcGFyYW0ge2ltcG9ydChcInZ1ZVwiKS5BcHB9IHZ1ZUFwcCAqL1xyXG4gIGxvYWQodnVlQXBwKSB7XHJcbiAgICB2dWVBcHAuY29tcG9uZW50KFxyXG4gICAgICBcInN0b3JlLXBhZ2VcIixcclxuICAgICAge1xyXG4gICAgICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdj5cclxuICAgICAgICAgIDxzdG9yZS1leHRlbnNpb24tY2FyZCB2LWZvcj1cImV4dGVuc2lvbiBpbiBleHRlbnNpb25zXCIgOmV4dGVuc2lvbj1cImV4dGVuc2lvblwiIDprZXk9XCJleHRlbnNpb24ubmFtZS5kZWZhdWx0XCIgLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICBgLFxyXG4gICAgICAgIGRhdGEoKSB7XHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBleHRlbnNpb25zOiBbXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJwbHVnaW5cIixcclxuICAgICAgICAgICAgICAgIHVybDogXCJcIixcclxuICAgICAgICAgICAgICAgIG5hbWU6IHtcclxuICAgICAgICAgICAgICAgICAgZGVmYXVsdDogXCJUZXN0IFBsdWdpblwiLFxyXG4gICAgICAgICAgICAgICAgICB0cjogXCJEZW5lbWUgUGx1Z2luXCIsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IHtcclxuICAgICAgICAgICAgICAgICAgZGVmYXVsdDogXCJUZXN0IFBsdWdpbiBkZXNjcmlwdGlvbi4uXCIsXHJcbiAgICAgICAgICAgICAgICAgIHRyOiBcIkRlbmVtZSBQbHVnaW4gYVx1MDBFN1x1MDEzMWtsYW1hc1x1MDEzMS4uXCIsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgcHJldmlld3M6IFtcclxuICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiVGVzdCBQbHVnaW4gUHJldmlld1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGltYWdlOiBcImh0dHBzOi8vaS5pbWd1ci5jb20vVHRmakhlUC5wbmdcIixcclxuICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiVGVzdCBQbHVnaW4gUHJldmlldyAyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2U6IFwiaHR0cHM6Ly9pLmltZ3VyLmNvbS8wWjBaMFowLnBuZ1wiLFxyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgYXV0aG9yczogW1xyXG4gICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiNzA3MzA5NjkzNDQ5NTM1NTk5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJBcm1hZ2FuIzI0NDhcIixcclxuICAgICAgICAgICAgICAgICAgICBpbWFnZTogXCJodHRwczovL2kuaW1ndXIuY29tL3JTTFZkMjMucG5nXCJcclxuICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIjcwNzMwOTY5MzQ0OTUzNTU5OVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiQXJtYWdhbiMyNDQ4XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2U6IFwiaHR0cHM6Ly9pLmltZ3VyLmNvbS9yU0xWZDIzLnBuZ1wiXHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICB2ZXJzaW9uOiBcIjEuMC4wXCIsXHJcbiAgICAgICAgICAgICAgICByZWFkbWU6IFwiIyMjIFRlc3QgUGx1Z2luIHJlYWRtZS4uXCIsXHJcbiAgICAgICAgICAgICAgICBpbnN0YWxsZWQ6IHRydWVcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICApO1xyXG4gIH1cclxufSIsICJpbXBvcnQgaG9tZVBhZ2UgZnJvbSBcIi4vaG9tZS1wYWdlL2luZGV4LmpzXCJcclxuaW1wb3J0IGluc3RhbGxlZEV4dGVuc2lvbnNQYWdlIGZyb20gXCIuL2luc3RhbGxlZC1leHRlbnNpb25zLXBhZ2UvaW5kZXguanNcIjtcclxuaW1wb3J0IHNldHRpbmdzUGFnZSBmcm9tIFwiLi9zZXR0aW5ncy1wYWdlL2luZGV4LmpzXCI7XHJcbmltcG9ydCBzdG9yZVBhZ2UgZnJvbSBcIi4vc3RvcmUtcGFnZS9pbmRleC5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIC8qKiBAcGFyYW0ge2ltcG9ydChcInZ1ZVwiKS5BcHB9IHZ1ZUFwcCAqL1xyXG4gIGxvYWQodnVlQXBwKSB7XHJcbiAgICBob21lUGFnZS5sb2FkKHZ1ZUFwcCk7XHJcbiAgICBpbnN0YWxsZWRFeHRlbnNpb25zUGFnZS5sb2FkKHZ1ZUFwcCk7XHJcbiAgICBzZXR0aW5nc1BhZ2UubG9hZCh2dWVBcHApO1xyXG4gICAgc3RvcmVQYWdlLmxvYWQodnVlQXBwKTtcclxuICB9XHJcbn0iLCAiaW1wb3J0IGV2ZW50cyBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vYXBpL2V2ZW50cy9pbmRleC5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIC8qKiBAcGFyYW0ge2ltcG9ydChcInZ1ZVwiKS5BcHB9IHZ1ZUFwcCAqL1xyXG4gIGxvYWQodnVlQXBwKSB7XHJcbiAgICB2dWVBcHAuY29tcG9uZW50KFwiY29uZmlnLWJ1dHRvblwiLCB7XHJcbiAgICAgIHByb3BzOiBbXCJpdGVtXCIsIFwiZXh0ZW5zaW9uXCJdLFxyXG4gICAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxkaXYgdi1zaG93PVwiaXRlbT8udmlzaWJsZSA/PyB0cnVlXCIgY2xhc3M9XCJhY29yZC0tY29uZmlnLWJ1dHRvbiBhY29yZC0tY29uZmlnLWl0ZW1cIj5cclxuICAgICAgICAgIDxkaXNjb3JkLWJ1dHRvbiBAY2xpY2s9XCJvbkNsaWNrXCIgOnZhbHVlPVwiaXRlbS52YWx1ZVwiIDpzaXplPVwiaXRlbS5zaXplXCIgOmNvbG9yPVwiaXRlbS5jb2xvclwiIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIGAsXHJcbiAgICAgIG1ldGhvZHM6IHtcclxuICAgICAgICBvbkNsaWNrKGV2ZW50KSB7XHJcbiAgICAgICAgICBldmVudHMuZW1pdChcclxuICAgICAgICAgICAgXCJFeHRlbnNpb25Db25maWdJbnRlcmFjdGlvblwiLFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgZXh0ZW5zaW9uOiB0aGlzLmV4dGVuc2lvbixcclxuICAgICAgICAgICAgICBpdGVtOiB0aGlzLml0ZW0sXHJcbiAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgZXZlbnRcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIClcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufSIsICJpbXBvcnQgZXZlbnRzIGZyb20gXCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9hcGkvZXZlbnRzL2luZGV4LmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgLyoqIEBwYXJhbSB7aW1wb3J0KFwidnVlXCIpLkFwcH0gdnVlQXBwICovXHJcbiAgbG9hZCh2dWVBcHApIHtcclxuICAgIHZ1ZUFwcC5jb21wb25lbnQoXCJjb25maWctY2hlY2tcIiwge1xyXG4gICAgICBwcm9wczogW1wiaXRlbVwiLCBcImV4dGVuc2lvblwiXSxcclxuICAgICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8ZGl2IHYtc2hvdz1cIml0ZW0/LnZpc2libGUgPz8gdHJ1ZVwiIGNsYXNzPVwiYWNvcmQtLWNvbmZpZy1jaGVjayBhY29yZC0tY29uZmlnLWl0ZW1cIj5cclxuICAgICAgICAgIDxkaXNjb3JkLWNoZWNrIEBjaGFuZ2U9XCJvbkNoYW5nZVwiIHYtbW9kZWw9XCJpdGVtLnZhbHVlXCIgLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgYCxcclxuICAgICAgbWV0aG9kczoge1xyXG4gICAgICAgIG9uQ2hhbmdlKGRhdGEpIHtcclxuICAgICAgICAgIGV2ZW50cy5lbWl0KFxyXG4gICAgICAgICAgICBcIkV4dGVuc2lvbkNvbmZpZ0ludGVyYWN0aW9uXCIsXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBleHRlbnNpb246IHRoaXMuZXh0ZW5zaW9uLFxyXG4gICAgICAgICAgICAgIGl0ZW06IHRoaXMuaXRlbSxcclxuICAgICAgICAgICAgICBkYXRhXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIClcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufSIsICJ7XHJcbiAgXCJuYW1lXCI6IHtcclxuICAgIFwiQ29sdW1uXCI6IFwiY29uZmlnLWNvbHVtblwiLFxyXG4gICAgXCJSb3dcIjogXCJjb25maWctcm93XCIsXHJcbiAgICBcIkJ1dHRvblwiOiBcImNvbmZpZy1idXR0b25cIixcclxuICAgIFwiQ2hlY2tcIjogXCJjb25maWctY2hlY2tcIixcclxuICAgIFwiSW5wdXRcIjogXCJjb25maWctaW5wdXRcIixcclxuICAgIFwiU2VsZWN0XCI6IFwiY29uZmlnLXNlbGVjdFwiLFxyXG4gICAgXCJUZXh0YXJlYVwiOiBcImNvbmZpZy10ZXh0YXJlYVwiLFxyXG4gICAgXCJTcGFjZXJcIjogXCJjb25maWctc3BhY2VyXCIsXHJcbiAgICBcIlBhcmFncmFwaFwiOiBcImNvbmZpZy1wYXJhZ3JhcGhcIixcclxuICAgIFwiSGVhZGluZ1wiOiBcImNvbmZpZy1oZWFkaW5nXCJcclxuICB9XHJcbn0iLCAiaW1wb3J0IHsgbmFtZSBhcyBuYW1lTWFwIH0gZnJvbSBcIi4uL21hcHMuanNvblwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIC8qKiBAcGFyYW0ge2ltcG9ydChcInZ1ZVwiKS5BcHB9IHZ1ZUFwcCAqL1xyXG4gIGxvYWQodnVlQXBwKSB7XHJcbiAgICB2dWVBcHAuY29tcG9uZW50KFxyXG4gICAgICBcImNvbmZpZy1jb2x1bW5cIixcclxuICAgICAge1xyXG4gICAgICAgIHByb3BzOiBbXCJpdGVtXCIsIFwiZXh0ZW5zaW9uXCJdLFxyXG4gICAgICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgICA8ZGl2IHYtc2hvdz1cIml0ZW0/LnZpc2libGUgPz8gdHJ1ZVwiIGNsYXNzPVwiYWNvcmQtLWNvbmZpZy1jb2x1bW4gYWNvcmQtLWNvbmZpZy1pdGVtXCIgOmNsYXNzPVwie1xyXG4gICAgICAgICAgICAnaG9yaXpvbnRhbC1hbGlnbi1sZWZ0JzogaXRlbT8uaG9yaXpvbnRhbEFsaWduID09PSAnbGVmdCcsXHJcbiAgICAgICAgICAgICdob3Jpem9udGFsLWFsaWduLWNlbnRlcic6IGl0ZW0/Lmhvcml6b250YWxBbGlnbiA9PT0gJ2NlbnRlcicsXHJcbiAgICAgICAgICAgICdob3Jpem9udGFsLWFsaWduLXJpZ2h0JzogaXRlbT8uaG9yaXpvbnRhbEFsaWduID09PSAncmlnaHQnLFxyXG4gICAgICAgICAgICAnanVzdGlmeS1zcGFjZS1iZXR3ZWVuJzogaXRlbT8uanVzdGlmeSA9PT0gJ3NwYWNlLWJldHdlZW4nLFxyXG4gICAgICAgICAgICAnanVzdGlmeS1zcGFjZS1hcm91bmQnOiBpdGVtPy5qdXN0aWZ5ID09PSAnc3BhY2UtYXJvdW5kJyxcclxuICAgICAgICAgICAgJ3ZlcnRpY2FsLWFsaWduLXRvcCc6IGl0ZW0/LnZlcnRpY2FsQWxpZ24gPT09ICd0b3AnLFxyXG4gICAgICAgICAgICAndmVydGljYWwtYWxpZ24tY2VudGVyJzogaXRlbT8udmVydGljYWxBbGlnbiA9PT0gJ2NlbnRlcicsXHJcbiAgICAgICAgICAgICd2ZXJ0aWNhbC1hbGlnbi1ib3R0b20nOiBpdGVtPy52ZXJ0aWNhbEFsaWduID09PSAnYm90dG9tJ1xyXG4gICAgICAgICAgfVwiIDpzdHlsZT1cInsnd2lkdGgnOiBpdGVtPy53aWR0aCA/PyAnMTAwJScsICdoZWlnaHQnOiBpdGVtPy5oZWlnaHQsICdnYXAnOiBpdGVtPy5nYXB9XCIgPlxyXG4gICAgICAgICAgICA8Y29tcG9uZW50IHYtZm9yPVwiKGNoaWxkLCBpZHgpIGluIGl0ZW0uY2hpbGRyZW5cIiA6aXM9XCJuYW1lTWFwW2NoaWxkLnR5cGVdXCIgOmtleT1cImlkeFwiIDppdGVtPVwiY2hpbGRcIiA6ZXh0ZW5zaW9uPVwiZXh0ZW5zaW9uXCIgLz5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIGAsXHJcbiAgICAgICAgZGF0YSgpIHtcclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG5hbWVNYXBcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgfVxyXG59IiwgImV4cG9ydCBkZWZhdWx0IHtcclxuICAvKiogQHBhcmFtIHtpbXBvcnQoXCJ2dWVcIikuQXBwfSB2dWVBcHAgKi9cclxuICBsb2FkKHZ1ZUFwcCkge1xyXG4gICAgdnVlQXBwLmNvbXBvbmVudChcImNvbmZpZy1oZWFkaW5nXCIsIHtcclxuICAgICAgcHJvcHM6IFtcIml0ZW1cIiwgXCJleHRlbnNpb25cIl0sXHJcbiAgICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiB2LXNob3c9XCJpdGVtPy52aXNpYmxlID8/IHRydWVcIiBjbGFzcz1cImFjb3JkLS1jb25maWctaGVhZGluZyBhY29yZC0tY29uZmlnLWl0ZW1cIj5cclxuICAgICAgICAgIHt7aXRlbS52YWx1ZX19XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIGAsXHJcbiAgICB9KTtcclxuICB9XHJcbn0iLCAiaW1wb3J0IGV2ZW50cyBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vYXBpL2V2ZW50cy9pbmRleC5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIC8qKiBAcGFyYW0ge2ltcG9ydChcInZ1ZVwiKS5BcHB9IHZ1ZUFwcCAqL1xyXG4gIGxvYWQodnVlQXBwKSB7XHJcbiAgICB2dWVBcHAuY29tcG9uZW50KFwiY29uZmlnLWlucHV0XCIsIHtcclxuICAgICAgcHJvcHM6IFtcIml0ZW1cIiwgXCJleHRlbnNpb25cIl0sXHJcbiAgICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiB2LXNob3c9XCJpdGVtPy52aXNpYmxlID8/IHRydWVcIiBjbGFzcz1cImFjb3JkLS1jb25maWctaW5wdXQgYWNvcmQtLWNvbmZpZy1pdGVtXCI+XHJcbiAgICAgICAgICA8ZGlzY29yZC1pbnB1dCBAaW5wdXQ9XCJvbklucHV0XCIgdi1tb2RlbD1cIml0ZW0udmFsdWVcIiA6dHlwZT1cIml0ZW0uaW5wdXRUeXBlXCIgOnBsYWNlaG9sZGVyPVwiaXRlbS5wbGFjZWhvbGRlclwiIDptYXhsZW5ndGg9XCJpdGVtLm1heGxlbmd0aFwiICA6bWF4PVwiaXRlbS5tYXhcIiA6bWluPVwiaXRlbS5taW5cIiA6c3RlcD1cIml0ZW0uc3RlcFwiIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIGAsXHJcbiAgICAgIG1ldGhvZHM6IHtcclxuICAgICAgICBvbklucHV0KGRhdGEpIHtcclxuICAgICAgICAgIGV2ZW50cy5lbWl0KFxyXG4gICAgICAgICAgICBcIkV4dGVuc2lvbkNvbmZpZ0ludGVyYWN0aW9uXCIsXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBleHRlbnNpb246IHRoaXMuZXh0ZW5zaW9uLFxyXG4gICAgICAgICAgICAgIGl0ZW06IHRoaXMuaXRlbSxcclxuICAgICAgICAgICAgICBkYXRhXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIClcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufSIsICJleHBvcnQgZGVmYXVsdCB7XHJcbiAgLyoqIEBwYXJhbSB7aW1wb3J0KFwidnVlXCIpLkFwcH0gdnVlQXBwICovXHJcbiAgbG9hZCh2dWVBcHApIHtcclxuICAgIHZ1ZUFwcC5jb21wb25lbnQoXCJjb25maWctcGFyYWdyYXBoXCIsIHtcclxuICAgICAgcHJvcHM6IFtcIml0ZW1cIiwgXCJleHRlbnNpb25cIl0sXHJcbiAgICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiB2LXNob3c9XCJpdGVtPy52aXNpYmxlID8/IHRydWVcIiBjbGFzcz1cImFjb3JkLS1jb25maWctcGFyYWdyYXBoIGFjb3JkLS1jb25maWctaXRlbVwiPlxyXG4gICAgICAgICAge3tpdGVtLnZhbHVlfX1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgYCxcclxuICAgIH0pO1xyXG4gIH1cclxufSIsICJpbXBvcnQgeyBuYW1lIGFzIG5hbWVNYXAgfSBmcm9tIFwiLi4vbWFwcy5qc29uXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgLyoqIEBwYXJhbSB7aW1wb3J0KFwidnVlXCIpLkFwcH0gdnVlQXBwICovXHJcbiAgbG9hZCh2dWVBcHApIHtcclxuICAgIHZ1ZUFwcC5jb21wb25lbnQoXHJcbiAgICAgIFwiY29uZmlnLXJvd1wiLFxyXG4gICAgICB7XHJcbiAgICAgICAgcHJvcHM6IFtcIml0ZW1cIiwgXCJleHRlbnNpb25cIl0sXHJcbiAgICAgICAgdGVtcGxhdGU6IGBcclxuICAgICAgICAgIDxkaXYgdi1zaG93PVwiaXRlbT8udmlzaWJsZSA/PyB0cnVlXCIgY2xhc3M9XCJhY29yZC0tY29uZmlnLXJvdyBhY29yZC0tY29uZmlnLWl0ZW1cIiA6Y2xhc3M9XCJ7XHJcbiAgICAgICAgICAgICdob3Jpem9udGFsLWFsaWduLWxlZnQnOiBpdGVtPy5ob3Jpem9udGFsQWxpZ24gPT09ICdsZWZ0JyxcclxuICAgICAgICAgICAgJ2hvcml6b250YWwtYWxpZ24tY2VudGVyJzogaXRlbT8uaG9yaXpvbnRhbEFsaWduID09PSAnY2VudGVyJyxcclxuICAgICAgICAgICAgJ2hvcml6b250YWwtYWxpZ24tcmlnaHQnOiBpdGVtPy5ob3Jpem9udGFsQWxpZ24gPT09ICdyaWdodCcsXHJcbiAgICAgICAgICAgICdqdXN0aWZ5LXNwYWNlLWJldHdlZW4nOiBpdGVtPy5qdXN0aWZ5ID09PSAnc3BhY2UtYmV0d2VlbicsXHJcbiAgICAgICAgICAgICdqdXN0aWZ5LXNwYWNlLWFyb3VuZCc6IGl0ZW0/Lmp1c3RpZnkgPT09ICdzcGFjZS1hcm91bmQnLFxyXG4gICAgICAgICAgICAndmVydGljYWwtYWxpZ24tdG9wJzogaXRlbT8udmVydGljYWxBbGlnbiA9PT0gJ3RvcCcsXHJcbiAgICAgICAgICAgICd2ZXJ0aWNhbC1hbGlnbi1jZW50ZXInOiBpdGVtPy52ZXJ0aWNhbEFsaWduID09PSAnY2VudGVyJyxcclxuICAgICAgICAgICAgJ3ZlcnRpY2FsLWFsaWduLWJvdHRvbSc6IGl0ZW0/LnZlcnRpY2FsQWxpZ24gPT09ICdib3R0b20nXHJcbiAgICAgICAgICB9XCIgOnN0eWxlPVwieyd3aWR0aCc6IGl0ZW0/LndpZHRoID8/ICcxMDAlJywgJ2hlaWdodCc6IGl0ZW0/LmhlaWdodCwgJ2dhcCc6IGl0ZW0/LmdhcH1cIiA+XHJcbiAgICAgICAgICAgIDxjb21wb25lbnQgdi1mb3I9XCIoY2hpbGQsIGlkeCkgaW4gaXRlbS5jaGlsZHJlblwiIDppcz1cIm5hbWVNYXBbY2hpbGQudHlwZV1cIiA6a2V5PVwiaWR4XCIgOml0ZW09XCJjaGlsZFwiIDpleHRlbnNpb249XCJleHRlbnNpb25cIiAvPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgYCxcclxuICAgICAgICBkYXRhKCkge1xyXG4gICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbmFtZU1hcFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgKTtcclxuICB9XHJcbn0iLCAiaW1wb3J0IGV2ZW50cyBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vYXBpL2V2ZW50cy9pbmRleC5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIC8qKiBAcGFyYW0ge2ltcG9ydChcInZ1ZVwiKS5BcHB9IHZ1ZUFwcCAqL1xyXG4gIGxvYWQodnVlQXBwKSB7XHJcbiAgICB2dWVBcHAuY29tcG9uZW50KFwiY29uZmlnLXNlbGVjdFwiLCB7XHJcbiAgICAgIHByb3BzOiBbXCJpdGVtXCIsIFwiZXh0ZW5zaW9uXCJdLFxyXG4gICAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxkaXYgdi1zaG93PVwiaXRlbT8udmlzaWJsZSA/PyB0cnVlXCIgY2xhc3M9XCJhY29yZC0tY29uZmlnLXNlbGVjdCBhY29yZC0tY29uZmlnLWl0ZW1cIj5cclxuICAgICAgICAgIDxkaXNjb3JkLXNlbGVjdCBAY2hhbmdlPVwib25DaGFuZ2VcIiB2LW1vZGVsPVwiaXRlbS52YWx1ZVwiIDpvcHRpb25zPVwiaXRlbS5vcHRpb25zXCIgLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgYCxcclxuICAgICAgbWV0aG9kczoge1xyXG4gICAgICAgIG9uQ2hhbmdlKGRhdGEpIHtcclxuICAgICAgICAgIGV2ZW50cy5lbWl0KFxyXG4gICAgICAgICAgICBcIkV4dGVuc2lvbkNvbmZpZ0ludGVyYWN0aW9uXCIsXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBleHRlbnNpb246IHRoaXMuZXh0ZW5zaW9uLFxyXG4gICAgICAgICAgICAgIGl0ZW06IHRoaXMuaXRlbSxcclxuICAgICAgICAgICAgICBkYXRhXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIClcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufSIsICJleHBvcnQgZGVmYXVsdCB7XHJcbiAgLyoqIEBwYXJhbSB7aW1wb3J0KFwidnVlXCIpLkFwcH0gdnVlQXBwICovXHJcbiAgbG9hZCh2dWVBcHApIHtcclxuICAgIHZ1ZUFwcC5jb21wb25lbnQoXCJjb25maWctc3BhY2VyXCIsIHtcclxuICAgICAgcHJvcHM6IFtcIml0ZW1cIiwgXCJleHRlbnNpb25cIl0sXHJcbiAgICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiB2LXNob3c9XCJpdGVtPy52aXNpYmxlID8/IHRydWVcIiBjbGFzcz1cImFjb3JkLS1jb25maWctc3BhY2VyIGFjb3JkLS1jb25maWctaXRlbVwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cInNwYWNlclwiIDpzdHlsZT1cInsnaGVpZ2h0JzogaXRlbT8uaGVpZ2h0LCAnd2lkdGgnOiBpdGVtPy53aWR0aH1cIiAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICBgLFxyXG4gICAgfSk7XHJcbiAgfVxyXG59IiwgImltcG9ydCBldmVudHMgZnJvbSBcIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2FwaS9ldmVudHMvaW5kZXguanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAvKiogQHBhcmFtIHtpbXBvcnQoXCJ2dWVcIikuQXBwfSB2dWVBcHAgKi9cclxuICBsb2FkKHZ1ZUFwcCkge1xyXG4gICAgdnVlQXBwLmNvbXBvbmVudChcImNvbmZpZy10ZXh0YXJlYVwiLCB7XHJcbiAgICAgIHByb3BzOiBbXCJpdGVtXCIsIFwiZXh0ZW5zaW9uXCJdLFxyXG4gICAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxkaXYgdi1zaG93PVwiaXRlbT8udmlzaWJsZSA/PyB0cnVlXCIgY2xhc3M9XCJhY29yZC0tY29uZmlnLXRleHRhcmVhIGFjb3JkLS1jb25maWctaXRlbVwiPlxyXG4gICAgICAgICAgPGRpc2NvcmQtdGV4dGFyZWEgQGlucHV0PVwib25JbnB1dFwiIHYtbW9kZWw9XCJpdGVtLnZhbHVlXCIgOnR5cGU9XCJpdGVtLmlucHV0VHlwZVwiIDpwbGFjZWhvbGRlcj1cIml0ZW0ucGxhY2Vob2xkZXJcIiA6bWF4bGVuZ3RoPVwiaXRlbS5tYXhsZW5ndGhcIiA6Y29scz1cIml0ZW0uY29sc1wiIDpyb3dzPVwiaXRlbS5yb3dzXCIgOnN0eWxlPVwieydoZWlnaHQnOiBpdGVtPy5oZWlnaHQsICd3aWR0aCc6IGl0ZW0/LndpZHRofVwiIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIGAsXHJcbiAgICAgIG1ldGhvZHM6IHtcclxuICAgICAgICBvbklucHV0KGRhdGEpIHtcclxuICAgICAgICAgIGV2ZW50cy5lbWl0KFxyXG4gICAgICAgICAgICBcIkV4dGVuc2lvbkNvbmZpZ0ludGVyYWN0aW9uXCIsXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBleHRlbnNpb246IHRoaXMuZXh0ZW5zaW9uLFxyXG4gICAgICAgICAgICAgIGl0ZW06IHRoaXMuaXRlbSxcclxuICAgICAgICAgICAgICBkYXRhXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIClcclxuICAgICAgICB9LFxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn0iLCAiZXhwb3J0IGRlZmF1bHQgYFxuLmFjb3JkLS1jb25maWctaXRlbXt3aWR0aDoxMDAlO2Rpc3BsYXk6ZmxleH0uYWNvcmQtLWNvbmZpZy1yb3d7d2lkdGg6MTAwJTtkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246cm93O2p1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVuO2FsaWduLWl0ZW1zOmNlbnRlcjtnYXA6NHB4fS5hY29yZC0tY29uZmlnLXJvdy5ob3Jpem9udGFsLWFsaWduLWxlZnR7anVzdGlmeS1jb250ZW50OmZsZXgtc3RhcnR9LmFjb3JkLS1jb25maWctcm93Lmhvcml6b250YWwtYWxpZ24tcmlnaHR7anVzdGlmeS1jb250ZW50OmZsZXgtZW5kfS5hY29yZC0tY29uZmlnLXJvdy5ob3Jpem9udGFsLWFsaWduLWNlbnRlcntqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyfS5hY29yZC0tY29uZmlnLXJvdy5qdXN0aWZ5LXNwYWNlLWJldHdlZW57anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW59LmFjb3JkLS1jb25maWctcm93Lmp1c3RpZnktc3BhY2UtYXJvdW5ke2p1c3RpZnktY29udGVudDpzcGFjZS1hcm91bmR9LmFjb3JkLS1jb25maWctcm93LnZlcnRpY2FsLWFsaWduLXRvcHthbGlnbi1pdGVtczpmbGV4LXN0YXJ0fS5hY29yZC0tY29uZmlnLXJvdy52ZXJ0aWNhbC1hbGlnbi1ib3R0b217YWxpZ24taXRlbXM6ZmxleC1lbmR9LmFjb3JkLS1jb25maWctY29sdW1ue3dpZHRoOjEwMCU7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOmNvbHVtbjtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1zdGFydDthbGlnbi1pdGVtczpjZW50ZXI7Z2FwOjRweH0uYWNvcmQtLWNvbmZpZy1jb2x1bW4uaG9yaXpvbnRhbC1hbGlnbi1sZWZ0e2p1c3RpZnktY29udGVudDpmbGV4LXN0YXJ0fS5hY29yZC0tY29uZmlnLWNvbHVtbi5ob3Jpem9udGFsLWFsaWduLXJpZ2h0e2p1c3RpZnktY29udGVudDpmbGV4LWVuZH0uYWNvcmQtLWNvbmZpZy1jb2x1bW4uaG9yaXpvbnRhbC1hbGlnbi1jZW50ZXJ7anVzdGlmeS1jb250ZW50OmNlbnRlcn0uYWNvcmQtLWNvbmZpZy1jb2x1bW4uanVzdGlmeS1zcGFjZS1iZXR3ZWVue2p1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVufS5hY29yZC0tY29uZmlnLWNvbHVtbi5qdXN0aWZ5LXNwYWNlLWFyb3VuZHtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYXJvdW5kfS5hY29yZC0tY29uZmlnLWNvbHVtbi52ZXJ0aWNhbC1hbGlnbi10b3B7YWxpZ24taXRlbXM6ZmxleC1zdGFydH0uYWNvcmQtLWNvbmZpZy1jb2x1bW4udmVydGljYWwtYWxpZ24tYm90dG9te2FsaWduLWl0ZW1zOmZsZXgtZW5kfS5hY29yZC0tY29uZmlnLWNvbHVtbi52ZXJ0aWNhbC1hbGlnbi1jZW50ZXJ7YWxpZ24taXRlbXM6Y2VudGVyfS5hY29yZC0tY29uZmlnLWhlYWRpbmd7Zm9udC1zaXplOjEuMnJlbTtmb250LXdlaWdodDo1MDA7Y29sb3I6I2Y1ZjVmNX0uYWNvcmQtLWNvbmZpZy1wYXJhZ3JhcGh7Zm9udC1zaXplOjFyZW07Zm9udC13ZWlnaHQ6NDAwO2NvbG9yOnJnYmEoMjQ1LDI0NSwyNDUsLjg1KX0uYWNvcmQtLWNvbmZpZy1jaGVjaywuYWNvcmQtLWNvbmZpZy1idXR0b257d2lkdGg6Zml0LWNvbnRlbnR9YDtcbiIsICJpbXBvcnQgcGF0Y2hlciBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vLi4vYXBpL3BhdGNoZXIvaW5kZXguanNcIjtcclxuaW1wb3J0IGNvbmZpZ0J1dHRvbiBmcm9tIFwiLi9jb25maWctYnV0dG9uL2luZGV4LmpzXCI7XHJcbmltcG9ydCBjb25maWdDaGVjayBmcm9tIFwiLi9jb25maWctY2hlY2svaW5kZXguanNcIjtcclxuaW1wb3J0IGNvbmZpZ0NvbHVtbiBmcm9tIFwiLi9jb25maWctY29sdW1uL2luZGV4LmpzXCJcclxuaW1wb3J0IGNvbmZpZ0hlYWRpbmcgZnJvbSBcIi4vY29uZmlnLWhlYWRpbmcvaW5kZXguanNcIjtcclxuaW1wb3J0IGNvbmZpZ0lucHV0IGZyb20gXCIuL2NvbmZpZy1pbnB1dC9pbmRleC5qc1wiO1xyXG5pbXBvcnQgY29uZmlnUGFyYWdyYXBoIGZyb20gXCIuL2NvbmZpZy1wYXJhZ3JhcGgvaW5kZXguanNcIjtcclxuaW1wb3J0IGNvbmZpZ1JvdyBmcm9tIFwiLi9jb25maWctcm93L2luZGV4LmpzXCI7XHJcbmltcG9ydCBjb25maWdTZWxlY3QgZnJvbSBcIi4vY29uZmlnLXNlbGVjdC9pbmRleC5qc1wiO1xyXG5pbXBvcnQgY29uZmlnU3BhY2VyIGZyb20gXCIuL2NvbmZpZy1zcGFjZXIvaW5kZXguanNcIjtcclxuaW1wb3J0IGNvbmZpZ1RleHRhcmVhIGZyb20gXCIuL2NvbmZpZy10ZXh0YXJlYS9pbmRleC5qc1wiO1xyXG5cclxuaW1wb3J0IGNzc1RleHQgZnJvbSBcIi4vc3R5bGUuc2Nzc1wiO1xyXG5wYXRjaGVyLmluamVjdENTUyhjc3NUZXh0KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAvKiogQHBhcmFtIHtpbXBvcnQoXCJ2dWVcIikuQXBwfSB2dWVBcHAgKi9cclxuICBsb2FkKHZ1ZUFwcCkge1xyXG4gICAgY29uZmlnUGFyYWdyYXBoLmxvYWQodnVlQXBwKTtcclxuICAgIGNvbmZpZ0hlYWRpbmcubG9hZCh2dWVBcHApO1xyXG4gICAgY29uZmlnU3BhY2VyLmxvYWQodnVlQXBwKTtcclxuICAgIGNvbmZpZ0J1dHRvbi5sb2FkKHZ1ZUFwcCk7XHJcbiAgICBjb25maWdDaGVjay5sb2FkKHZ1ZUFwcCk7XHJcbiAgICBjb25maWdJbnB1dC5sb2FkKHZ1ZUFwcCk7XHJcbiAgICBjb25maWdTZWxlY3QubG9hZCh2dWVBcHApO1xyXG4gICAgY29uZmlnVGV4dGFyZWEubG9hZCh2dWVBcHApO1xyXG4gICAgY29uZmlnQ29sdW1uLmxvYWQodnVlQXBwKTtcclxuICAgIGNvbmZpZ1Jvdy5sb2FkKHZ1ZUFwcCk7XHJcbiAgfVxyXG59IiwgImV4cG9ydCBkZWZhdWx0IGBcbi5hY29yZC0taW5zdGFsbGVkLWV4dGVuc2lvbi1jYXJke3dpZHRoOjEwMCU7YmFja2dyb3VuZC1jb2xvcjojMmMyZTMyO2JvcmRlci1yYWRpdXM6OHB4O2Rpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpjb2x1bW47Z2FwOjhweDtwb3NpdGlvbjpyZWxhdGl2ZX0uYWNvcmQtLWluc3RhbGxlZC1leHRlbnNpb24tY2FyZD4uc3RhdHVzLWNvbnRhaW5lcntwb3NpdGlvbjphYnNvbHV0ZTt0b3A6LTlweDtyaWdodDo4cHg7Ym9yZGVyLXJhZGl1czo5OTk5cHg7cGFkZGluZzo4cHg7aGVpZ2h0OjI0cHg7ZGlzcGxheTpmbGV4O2dhcDo2cHg7YWxpZ24taXRlbXM6Y2VudGVyO2JhY2tncm91bmQtY29sb3I6IzFlMWYyMn0uYWNvcmQtLWluc3RhbGxlZC1leHRlbnNpb24tY2FyZD4uc3RhdHVzLWNvbnRhaW5lcj4ubG9hZGVkLXN0YXRle3dpZHRoOjE0cHg7aGVpZ2h0OjE0cHg7Ym9yZGVyLXJhZGl1czo1MCU7YmFja2dyb3VuZC1jb2xvcjojODI4NThmfS5hY29yZC0taW5zdGFsbGVkLWV4dGVuc2lvbi1jYXJkPi5zdGF0dXMtY29udGFpbmVyPi5sb2FkZWQtc3RhdGUuYWN0aXZle2JhY2tncm91bmQtY29sb3I6IzIzYTU1YTtmaWx0ZXI6ZHJvcC1zaGFkb3coMHB4IDBweCA0cHggIzIzYTU1YSl9LmFjb3JkLS1pbnN0YWxsZWQtZXh0ZW5zaW9uLWNhcmQ+LnN0YXR1cy1jb250YWluZXI+LmRldmVsb3BtZW50LW1vZGUtd2FybmluZ3tjb2xvcjojZjBiMjMyO2ZpbHRlcjpkcm9wLXNoYWRvdygwcHggMHB4IDRweCAjZjBiMjMyKTtkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2p1c3RpZnktY29udGVudDpjZW50ZXI7Ym9yZGVyLXJhZGl1czo1MCV9LmFjb3JkLS1pbnN0YWxsZWQtZXh0ZW5zaW9uLWNhcmQ+LnRvcHtiYWNrZ3JvdW5kLWNvbG9yOiMyMTIyMjU7Ym9yZGVyLXJhZGl1czo4cHg7d2lkdGg6MTAwJTtwYWRkaW5nOjE2cHg7aGVpZ2h0OjEyOHB4O2Rpc3BsYXk6ZmxleDtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2Vlbn0uYWNvcmQtLWluc3RhbGxlZC1leHRlbnNpb24tY2FyZD4udG9wPi5sZWZ0e2Rpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpjb2x1bW47aGVpZ2h0OjEwMCU7Z2FwOjRweH0uYWNvcmQtLWluc3RhbGxlZC1leHRlbnNpb24tY2FyZD4udG9wPi5sZWZ0Pi50b3B7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmZsZXgtZW5kO2dhcDo0cHh9LmFjb3JkLS1pbnN0YWxsZWQtZXh0ZW5zaW9uLWNhcmQ+LnRvcD4ubGVmdD4udG9wPi5uYW1le2ZvbnQtc2l6ZToxLjRyZW07Zm9udC13ZWlnaHQ6NTAwO2NvbG9yOiNmZmZ9LmFjb3JkLS1pbnN0YWxsZWQtZXh0ZW5zaW9uLWNhcmQ+LnRvcD4ubGVmdD4udG9wPi52ZXJzaW9ue2ZvbnQtc2l6ZToxcmVtO2ZvbnQtd2VpZ2h0OjMwMDtjb2xvcjpyZ2JhKDI1NSwyNTUsMjU1LC41KX0uYWNvcmQtLWluc3RhbGxlZC1leHRlbnNpb24tY2FyZD4udG9wPi5sZWZ0Pi5ib3R0b217ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOmNvbHVtbjtnYXA6OHB4fS5hY29yZC0taW5zdGFsbGVkLWV4dGVuc2lvbi1jYXJkPi50b3A+LmxlZnQ+LmJvdHRvbT4udG9we2Rpc3BsYXk6ZmxleH0uYWNvcmQtLWluc3RhbGxlZC1leHRlbnNpb24tY2FyZD4udG9wPi5sZWZ0Pi5ib3R0b20+LnRvcD4uYXV0aG9yc3tkaXNwbGF5OmZsZXg7Z2FwOjJweDtmb250LXNpemU6MTJweDtmb250LXdlaWdodDozMDA7Y29sb3I6cmdiYSgyNTUsMjU1LDI1NSwuNDUpfS5hY29yZC0taW5zdGFsbGVkLWV4dGVuc2lvbi1jYXJkPi50b3A+LmxlZnQ+LmJvdHRvbT4udG9wPi5hdXRob3JzPi5sYWJlbHtmb250LXdlaWdodDo1MDA7bWFyZ2luLXJpZ2h0OjJweH0uYWNvcmQtLWluc3RhbGxlZC1leHRlbnNpb24tY2FyZD4udG9wPi5sZWZ0Pi5ib3R0b20+LnRvcD4uYXV0aG9ycyAuYXV0aG9ye2Rpc3BsYXk6ZmxleH0uYWNvcmQtLWluc3RhbGxlZC1leHRlbnNpb24tY2FyZD4udG9wPi5sZWZ0Pi5ib3R0b20+LnRvcD4uYXV0aG9ycyAuYXV0aG9yIC5ob3ZlcmFibGU6aG92ZXJ7Y3Vyc29yOnBvaW50ZXI7dGV4dC1kZWNvcmF0aW9uOnVuZGVybGluZX0uYWNvcmQtLWluc3RhbGxlZC1leHRlbnNpb24tY2FyZD4udG9wPi5sZWZ0Pi5ib3R0b20+LmJvdHRvbT4uZGVzY3JpcHRpb257Zm9udC1zaXplOjE2cHg7Y29sb3I6cmdiYSgyNTUsMjU1LDI1NSwuNzUpfS5hY29yZC0taW5zdGFsbGVkLWV4dGVuc2lvbi1jYXJkPi50b3A+LnJpZ2h0e2Rpc3BsYXk6ZmxleDtoZWlnaHQ6MTAwJTtmbGV4LWRpcmVjdGlvbjpjb2x1bW47anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47YWxpZ24taXRlbXM6ZmxleC1lbmR9LmFjb3JkLS1pbnN0YWxsZWQtZXh0ZW5zaW9uLWNhcmQ+LnRvcD4ucmlnaHQ+LnRvcHtkaXNwbGF5OmZsZXh9LmFjb3JkLS1pbnN0YWxsZWQtZXh0ZW5zaW9uLWNhcmQ+LnRvcD4ucmlnaHQ+LnRvcD4uY29udHJvbHN7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtnYXA6OHB4fS5hY29yZC0taW5zdGFsbGVkLWV4dGVuc2lvbi1jYXJkPi50b3A+LnJpZ2h0Pi50b3A+LmNvbnRyb2xzIC5jb250cm9se2Rpc3BsYXk6ZmxleDtwYWRkaW5nOjhweDtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMCwwLDAsLjI1KTtib3JkZXItcmFkaXVzOjhweDtjb2xvcjojZjVmNWY1O2N1cnNvcjpwb2ludGVyfS5hY29yZC0taW5zdGFsbGVkLWV4dGVuc2lvbi1jYXJkPi50b3A+LnJpZ2h0Pi50b3A+LmNvbnRyb2xzIC5jb250cm9sOmhvdmVye2JhY2tncm91bmQtY29sb3I6cmdiYSgwLDAsMCwuNSl9LmFjb3JkLS1pbnN0YWxsZWQtZXh0ZW5zaW9uLWNhcmQ+LnRvcD4ucmlnaHQ+LmJvdHRvbXtkaXNwbGF5OmZsZXh9LmFjb3JkLS1pbnN0YWxsZWQtZXh0ZW5zaW9uLWNhcmQ+LnRvcD4ucmlnaHQ+LmJvdHRvbT4uc2V0dGluZ3N7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1lbmQ7Y3Vyc29yOnBvaW50ZXI7Zm9udC13ZWlnaHQ6MzAwO2NvbG9yOnJnYmEoMjU1LDI1NSwyNTUsLjc1KTtnYXA6OHB4fS5hY29yZC0taW5zdGFsbGVkLWV4dGVuc2lvbi1jYXJkPi50b3A+LnJpZ2h0Pi5ib3R0b20+LnNldHRpbmdzIHN2Z3twYWRkaW5nOjRweDtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMCwwLDAsLjI1KTtib3JkZXItcmFkaXVzOjRweDtjb2xvcjojZmZmfS5hY29yZC0taW5zdGFsbGVkLWV4dGVuc2lvbi1jYXJkPi5ib3R0b217Ym9yZGVyLXJhZGl1czo4cHg7d2lkdGg6MTAwJTtwYWRkaW5nOjE2cHh9YDtcbiIsICJpbXBvcnQgaTE4biBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vYXBpL2kxOG4vaW5kZXguanNcIjtcclxuaW1wb3J0IHBhdGNoZXIgZnJvbSBcIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2FwaS9wYXRjaGVyL2luZGV4LmpzXCI7XHJcbmltcG9ydCB1aSBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vYXBpL3VpL2luZGV4LmpzXCI7XHJcbmltcG9ydCBleHRlbnNpb25zIGZyb20gXCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9hcGkvZXh0ZW5zaW9ucy9pbmRleC5qc1wiO1xyXG5pbXBvcnQgZXZlbnRzIGZyb20gXCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9hcGkvZXZlbnRzL2luZGV4LmpzXCI7XHJcblxyXG5pbXBvcnQgY3NzVGV4dCBmcm9tIFwiLi9zdHlsZS5zY3NzXCI7XHJcbnBhdGNoZXIuaW5qZWN0Q1NTKGNzc1RleHQpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIC8qKiBAcGFyYW0ge2ltcG9ydChcInZ1ZVwiKS5BcHB9IHZ1ZUFwcCAqL1xyXG4gIGxvYWQodnVlQXBwKSB7XHJcbiAgICB2dWVBcHAuY29tcG9uZW50KFxyXG4gICAgICBcImluc3RhbGxlZC1leHRlbnNpb24tY2FyZFwiLFxyXG4gICAgICB7XHJcbiAgICAgICAgdGVtcGxhdGU6IGBcclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJhY29yZC0taW5zdGFsbGVkLWV4dGVuc2lvbi1jYXJkXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0dXMtY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxvYWRlZC1zdGF0ZVwiIDpjbGFzcz1cInsnYWN0aXZlJzogISF0aGlzLmNvbmZpZ0NhY2hlfVwiIDphY29yZC0tdG9vbHRpcC1jb250ZW50PVwiaTE4bkZvcm1hdCghIXRoaXMuY29uZmlnQ2FjaGUgPyAnRVhURU5TSU9OX0FDVElWRScgOiAnRVhURU5TSU9OX0lOQUNUSVZFJylcIj48L2Rpdj5cclxuICAgICAgICAgICAgICA8ZGl2IHYtaWY9XCJleHRlbnNpb24ubWFuaWZlc3QubW9kZSA9PSAnZGV2ZWxvcG1lbnQnXCIgY2xhc3M9XCJkZXZlbG9wbWVudC1tb2RlLXdhcm5pbmdcIiA6YWNvcmQtLXRvb2x0aXAtY29udGVudD1cImkxOG5Gb3JtYXQoJ0VYVEVOU0lPTl9JTl9ERVZFTE9QTUVOVF9NT0RFJylcIj5cclxuICAgICAgICAgICAgICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiB3aWR0aD1cIjE2XCIgaGVpZ2h0PVwiMTZcIj5cclxuICAgICAgICAgICAgICAgICAgPHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNMTIgMjJDNi40NzcgMjIgMiAxNy41MjMgMiAxMlM2LjQ3NyAyIDEyIDJzMTAgNC40NzcgMTAgMTAtNC40NzcgMTAtMTAgMTB6bS0xLTd2Mmgydi0yaC0yem0wLTh2NmgyVjdoLTJ6XCIvPlxyXG4gICAgICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidG9wXCI+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxlZnRcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0b3BcIj5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm5hbWVcIj57eyBpMThuTG9jYWxpemUoZXh0ZW5zaW9uLm1hbmlmZXN0LmFib3V0Lm5hbWUpIH19PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ2ZXJzaW9uXCI+dnt7ZXh0ZW5zaW9uLm1hbmlmZXN0LmFib3V0LnZlcnNpb259fTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYm90dG9tXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0b3BcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXV0aG9yc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxhYmVsXCI+e3sgaTE4bkZvcm1hdCgnQVVUSE9SUycpIH19OjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiB2LWZvcj1cIihhdXRob3IsIGF1dGhvcklkeCkgaW4gZXh0ZW5zaW9uLm1hbmlmZXN0LmFib3V0LmF1dGhvcnNcIiBjbGFzcz1cImF1dGhvclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibmFtZVwiIDpjbGFzcz1cInsnaG92ZXJhYmxlJzogISFhdXRob3IuaWR9XCIgQGNsaWNrPVwib25BdXRob3JDbGljayhhdXRob3IpXCI+e3sgaTE4bkxvY2FsaXplKGF1dGhvci5uYW1lKSB9fTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHYtaWY9XCJhdXRob3JJZHggIT0gKGV4dGVuc2lvbi5tYW5pZmVzdC5hYm91dC5hdXRob3JzLmxlbmd0aC0xKVwiIGNsYXNzPVwiY29tbWFcIj4sPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJib3R0b21cIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGVzY3JpcHRpb25cIj57eyBpMThuTG9jYWxpemUoZXh0ZW5zaW9uLm1hbmlmZXN0LmFib3V0LmRlc2NyaXB0aW9uKSB9fTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyaWdodFwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRvcFwiPlxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udHJvbHNcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udHJvbFwiIEBjbGljaz1cIm9uVXBkYXRlRXh0ZW5zaW9uXCIgOmFjb3JkLS10b29sdGlwLWNvbnRlbnQ9XCJpMThuRm9ybWF0KCdVUERBVEVfRVhURU5TSU9OJylcIj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiB3aWR0aD1cIjIwXCIgaGVpZ2h0PVwiMjBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNNS40NjMgNC40MzNBOS45NjEgOS45NjEgMCAwIDEgMTIgMmM1LjUyMyAwIDEwIDQuNDc3IDEwIDEwIDAgMi4xMzYtLjY3IDQuMTE2LTEuODEgNS43NEwxNyAxMmgzQTggOCAwIDAgMCA2LjQ2IDYuMjI4bC0uOTk3LTEuNzk1em0xMy4wNzQgMTUuMTM0QTkuOTYxIDkuOTYxIDAgMCAxIDEyIDIyQzYuNDc3IDIyIDIgMTcuNTIzIDIgMTJjMC0yLjEzNi42Ny00LjExNiAxLjgxLTUuNzRMNyAxMkg0YTggOCAwIDAgMCAxMy41NCA1Ljc3MmwuOTk3IDEuNzk1elwiLz5cclxuICAgICAgICAgICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250cm9sXCIgQGNsaWNrPVwib25Vbmluc3RhbGxFeHRlbnNpb25cIiA6YWNvcmQtLXRvb2x0aXAtY29udGVudD1cImkxOG5Gb3JtYXQoJ1VOSU5TVEFMTF9FWFRFTlNJT04nKVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIHdpZHRoPVwiMjBcIiBoZWlnaHQ9XCIyMFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk0xNyA2aDV2MmgtMnYxM2ExIDEgMCAwIDEtMSAxSDVhMSAxIDAgMCAxLTEtMVY4SDJWNmg1VjNhMSAxIDAgMCAxIDEtMWg4YTEgMSAwIDAgMSAxIDF2M3ptMSAySDZ2MTJoMTJWOHptLTkgM2gydjZIOXYtNnptNCAwaDJ2NmgtMnYtNnpNOSA0djJoNlY0SDl6XCIvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRyb2xcIiBAY2xpY2s9XCJvblRvZ2dsZUV4dGVuc2lvblwiIDphY29yZC0tdG9vbHRpcC1jb250ZW50PVwiaTE4bkZvcm1hdChlbmFibGVkID8gJ0RJU0FCTEVfRVhURU5TSU9OJyA6ICdFTkFCTEVfRVhURU5TSU9OJylcIj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxzdmcgdi1pZj1cIiFlbmFibGVkXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiB3aWR0aD1cIjIwXCIgaGVpZ2h0PVwiMjBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNOCA3YTUgNSAwIDEgMCAwIDEwaDhhNSA1IDAgMCAwIDAtMTBIOHptMC0yaDhhNyA3IDAgMCAxIDAgMTRIOEE3IDcgMCAwIDEgOCA1em0wIDEwYTMgMyAwIDEgMSAwLTYgMyAzIDAgMCAxIDAgNnpcIi8+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgICAgICAgICAgIDxzdmcgdi1lbHNlIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgd2lkdGg9XCIyMFwiIGhlaWdodD1cIjIwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTggNWg4YTcgNyAwIDAgMSAwIDE0SDhBNyA3IDAgMCAxIDggNXptOCAxMGEzIDMgMCAxIDAgMC02IDMgMyAwIDAgMCAwIDZ6XCIvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYm90dG9tXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgdi1pZj1cImV4dGVuc2lvbi5tYW5pZmVzdD8uY29uZmlnPy5sZW5ndGggJiYgISFjb25maWdDYWNoZVwiIGNsYXNzPVwic2V0dGluZ3NcIiBAY2xpY2s9XCJleHBhbmRlZCA9ICFleHBhbmRlZFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0XCI+e3tpMThuRm9ybWF0KGV4cGFuZGVkID8gJ0hJREVfU0VUVElOR1MnIDogJ1NIT1dfU0VUVElOR1MnKX19PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPHN2ZyB2LWlmPVwiIWV4cGFuZGVkXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMjRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTEyIDE1bC00LjI0My00LjI0MyAxLjQxNS0xLjQxNEwxMiAxMi4xNzJsMi44MjgtMi44MjkgMS40MTUgMS40MTR6XCIvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzdmcgdi1lbHNlIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk0xMiAxMS44MjhsLTIuODI4IDIuODI5LTEuNDE1LTEuNDE0TDEyIDlsNC4yNDMgNC4yNDMtMS40MTUgMS40MTRMMTIgMTEuODI4elwiLz5cclxuICAgICAgICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgdi1pZj1cImV4cGFuZGVkXCIgY2xhc3M9XCJib3R0b21cIj5cclxuICAgICAgICAgICAgICA8Y29uZmlnLWNvbHVtbiA6ZXh0ZW5zaW9uPVwiaWRcIiA6aXRlbT1cIntjaGlsZHJlbjogY29uZmlnQ2FjaGUsIGdhcDogJzhweCd9XCIvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIGAsXHJcbiAgICAgICAgZGF0YSgpIHtcclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGV4cGFuZGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgY29uZmlnQ2FjaGU6IG51bGwsXHJcbiAgICAgICAgICAgIGVuYWJsZWQ6IGV4dGVuc2lvbnMuc3RvcmFnZS5pbnN0YWxsZWQuZ2hvc3RbdGhpcy5pZF0uY29uZmlnLmVuYWJsZWRcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgfSxcclxuICAgICAgICBtZXRob2RzOiB7XHJcbiAgICAgICAgICBpMThuRm9ybWF0OiBpMThuLmZvcm1hdCxcclxuICAgICAgICAgIGkxOG5Mb2NhbGl6ZTogaTE4bi5sb2NhbGl6ZSxcclxuICAgICAgICAgIG9uQXV0aG9yQ2xpY2soYXV0aG9yKSB7XHJcbiAgICAgICAgICAgIGlmIChhdXRob3IuaWQpIHVpLm1vZGFscy5zaG93LnVzZXIoYXV0aG9yLmlkKTtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBvbkV4dGVuc2lvbkxvYWRlZCh7IGlkIH0pIHtcclxuICAgICAgICAgICAgaWYgKGlkID09PSB0aGlzLmlkKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5jb25maWdDYWNoZSA9IGV4dGVuc2lvbnMuX19jYWNoZV9fLmNvbmZpZ1t0aGlzLmlkXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIG9uRXh0ZW5zaW9uVW5sb2FkZWQoeyBpZCB9KSB7XHJcbiAgICAgICAgICAgIGlmIChpZCA9PT0gdGhpcy5pZCkge1xyXG4gICAgICAgICAgICAgIHRoaXMuY29uZmlnQ2FjaGUgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgb25Ub2dnbGVFeHRlbnNpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCBlbmFibGVkID0gZXh0ZW5zaW9ucy5zdG9yYWdlLmluc3RhbGxlZC5naG9zdFt0aGlzLmlkXS5jb25maWcuZW5hYmxlZDtcclxuICAgICAgICAgICAgbGV0IG5ld1N0YXRlID0gIWVuYWJsZWQ7XHJcbiAgICAgICAgICAgIGV4dGVuc2lvbnMuc3RvcmFnZS5pbnN0YWxsZWQuc3RvcmVbdGhpcy5pZF0uY29uZmlnLmVuYWJsZWQgPSBuZXdTdGF0ZTtcclxuICAgICAgICAgICAgdGhpcy5lbmFibGVkID0gbmV3U3RhdGU7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgaWYgKG5ld1N0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICBleHRlbnNpb25zLmxvYWQodGhpcy5pZCk7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGV4dGVuc2lvbnMudW5sb2FkKHRoaXMuaWQpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBjYXRjaCB7IH1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBvblVwZGF0ZUV4dGVuc2lvbigpIHtcclxuICAgICAgICAgICAgZXh0ZW5zaW9ucy51cGRhdGUodGhpcy5pZCk7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgb25Vbmluc3RhbGxFeHRlbnNpb24oKSB7XHJcbiAgICAgICAgICAgIGV4dGVuc2lvbnMudW5pbnN0YWxsKHRoaXMuaWQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcHJvcHM6IFtcImlkXCIsIFwiZXh0ZW5zaW9uXCJdLFxyXG4gICAgICAgIG1vdW50ZWQoKSB7XHJcbiAgICAgICAgICB0aGlzLmNvbmZpZ0NhY2hlID0gZXh0ZW5zaW9ucy5fX2NhY2hlX18uY29uZmlnW3RoaXMuaWRdO1xyXG4gICAgICAgICAgZXZlbnRzLm9uKFwiRXh0ZW5zaW9uTG9hZGVkXCIsIHRoaXMub25FeHRlbnNpb25Mb2FkZWQpO1xyXG4gICAgICAgICAgZXZlbnRzLm9uKFwiRXh0ZW5zaW9uVW5sb2FkZWRcIiwgdGhpcy5vbkV4dGVuc2lvblVubG9hZGVkKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHVubW91bnRlZCgpIHtcclxuICAgICAgICAgIGV2ZW50cy5vZmYoXCJFeHRlbnNpb25Mb2FkZWRcIiwgdGhpcy5vbkV4dGVuc2lvbkxvYWRlZCk7XHJcbiAgICAgICAgICBldmVudHMub2ZmKFwiRXh0ZW5zaW9uVW5sb2FkZWRcIiwgdGhpcy5vbkV4dGVuc2lvblVubG9hZGVkKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgfVxyXG59IiwgImV4cG9ydCBkZWZhdWx0IGBcbi5hY29yZC0tc3RvcmUtZXh0ZW5zaW9uLWNhcmR7d2lkdGg6Mjc1cHg7aGVpZ2h0OjI1MHB4O2Rpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpjb2x1bW47Ym9yZGVyLXJhZGl1czo0cHg7Y29udGFpbjpjb250ZW50O2JhY2tncm91bmQtY29sb3I6cmdiYSgwLDAsMCwuMSk7Ym94LXNoYWRvdzp2YXIoLS1lbGV2YXRpb24tbWVkaXVtKX0uYWNvcmQtLXN0b3JlLWV4dGVuc2lvbi1jYXJkPi5wcmV2aWV3e3dpZHRoOjEwMCU7aGVpZ2h0OjEwMHB4O2Rpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpjb2x1bW47anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47YWxpZ24taXRlbXM6Y2VudGVyO2JhY2tncm91bmQtY29sb3I6dmFyKC0tYnJhbmQtNTAwKTtiYWNrZ3JvdW5kLXBvc2l0aW9uOmNlbnRlcjtiYWNrZ3JvdW5kLXNpemU6Y292ZXJ9LmFjb3JkLS1zdG9yZS1leHRlbnNpb24tY2FyZD4ucHJldmlldz4uY29udHJvbHN7cGFkZGluZzo4cHg7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2Vlbjt3aWR0aDoxMDAlfS5hY29yZC0tc3RvcmUtZXh0ZW5zaW9uLWNhcmQ+LnByZXZpZXc+LmNvbnRyb2xzIC5nb3tiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMCwwLDAsLjUpO2JveC1zaGFkb3c6MHB4IDBweCA0cHggcmdiYSgwLDAsMCwuNSk7Ym9yZGVyLXJhZGl1czo1MCU7d2lkdGg6MjRweDtoZWlnaHQ6MjRweDtkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2p1c3RpZnktY29udGVudDpjZW50ZXI7Y29sb3I6dmFyKC0taGVhZGVyLXByaW1hcnkpO2ZvbnQtd2VpZ2h0OjYwMDtjdXJzb3I6cG9pbnRlcn0uYWNvcmQtLXN0b3JlLWV4dGVuc2lvbi1jYXJkPi5wcmV2aWV3Pi5uYW1lLWNvbnRhaW5lcntkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2p1c3RpZnktY29udGVudDpjZW50ZXI7Y29sb3I6dmFyKC0taGVhZGVyLXByaW1hcnkpO3BhZGRpbmc6OHB4fS5hY29yZC0tc3RvcmUtZXh0ZW5zaW9uLWNhcmQ+LnByZXZpZXc+Lm5hbWUtY29udGFpbmVyPi5uYW1le2ZvbnQtc2l6ZToxNHB4O2JhY2tncm91bmQtY29sb3I6cmdiYSgwLDAsMCwuNSk7Ym94LXNoYWRvdzowcHggMHB4IDRweCByZ2JhKDAsMCwwLC41KTtib3JkZXItcmFkaXVzOjk5OTlweDtwYWRkaW5nOjRweCA4cHh9LmFjb3JkLS1zdG9yZS1leHRlbnNpb24tY2FyZD4uaW5mby1jb250YWluZXJ7ZGlzcGxheTpmbGV4O2p1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVuO2ZsZXgtZGlyZWN0aW9uOmNvbHVtbjtwYWRkaW5nOjhweDtoZWlnaHQ6MTUwcHg7d2lkdGg6MTAwJX0uYWNvcmQtLXN0b3JlLWV4dGVuc2lvbi1jYXJkPi5pbmZvLWNvbnRhaW5lcj4udG9we2Rpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpjb2x1bW47Z2FwOjRweDtoZWlnaHQ6MTAwJX0uYWNvcmQtLXN0b3JlLWV4dGVuc2lvbi1jYXJkPi5pbmZvLWNvbnRhaW5lcj4udG9wPi5uYW1lLWNvbnRhaW5lcntkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2dhcDo0cHg7d2lkdGg6MTAwJX0uYWNvcmQtLXN0b3JlLWV4dGVuc2lvbi1jYXJkPi5pbmZvLWNvbnRhaW5lcj4udG9wPi5uYW1lLWNvbnRhaW5lcj4ubmFtZXtmb250LXNpemU6MTZweDtmb250LXdlaWdodDo1MDA7Y29sb3I6dmFyKC0taGVhZGVyLXByaW1hcnkpfS5hY29yZC0tc3RvcmUtZXh0ZW5zaW9uLWNhcmQ+LmluZm8tY29udGFpbmVyPi50b3A+Lm5hbWUtY29udGFpbmVyPi52ZXJzaW9ue2ZvbnQtc2l6ZToxMnB4O2ZvbnQtd2VpZ2h0OjUwMDtjb2xvcjp2YXIoLS1oZWFkZXItcHJpbWFyeSk7b3BhY2l0eTouNX0uYWNvcmQtLXN0b3JlLWV4dGVuc2lvbi1jYXJkPi5pbmZvLWNvbnRhaW5lcj4udG9wPi5kZXNjcmlwdGlvbntmb250LXNpemU6MTRweDtmb250LXdlaWdodDozMDA7Y29sb3I6dmFyKC0taGVhZGVyLXByaW1hcnkpO29wYWNpdHk6Ljc1O3dpZHRoOjEwMCV9LmFjb3JkLS1zdG9yZS1leHRlbnNpb24tY2FyZD4uaW5mby1jb250YWluZXI+LmJvdHRvbXtkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6ZmxleC1zdGFydDtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2VlbjtoZWlnaHQ6MTAwJX0uYWNvcmQtLXN0b3JlLWV4dGVuc2lvbi1jYXJkPi5pbmZvLWNvbnRhaW5lcj4uYm90dG9tPi5sZWZ0e2hlaWdodDoxMDAlO2Rpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpjb2x1bW47YWxpZ24taXRlbXM6ZmxleC1zdGFydDtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1lbmR9LmFjb3JkLS1zdG9yZS1leHRlbnNpb24tY2FyZD4uaW5mby1jb250YWluZXI+LmJvdHRvbT4ubGVmdD4uYXV0aG9yc3tkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1uO2dhcDo0cHh9LmFjb3JkLS1zdG9yZS1leHRlbnNpb24tY2FyZD4uaW5mby1jb250YWluZXI+LmJvdHRvbT4ubGVmdD4uYXV0aG9ycyAuYXV0aG9ye2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7Ym9yZGVyLXJhZGl1czo5OTk5cHg7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDAsMCwwLC4xKTtjdXJzb3I6cG9pbnRlcn0uYWNvcmQtLXN0b3JlLWV4dGVuc2lvbi1jYXJkPi5pbmZvLWNvbnRhaW5lcj4uYm90dG9tPi5sZWZ0Pi5hdXRob3JzIC5hdXRob3I+LmltYWdle2JvcmRlci1yYWRpdXM6NTAlO3dpZHRoOjE4cHg7aGVpZ2h0OjE4cHg7YmFja2dyb3VuZC1jb2xvcjp2YXIoLS1icmFuZC01MDApO2JhY2tncm91bmQtcG9zaXRpb246Y2VudGVyO2JhY2tncm91bmQtc2l6ZTpjb3Zlcn0uYWNvcmQtLXN0b3JlLWV4dGVuc2lvbi1jYXJkPi5pbmZvLWNvbnRhaW5lcj4uYm90dG9tPi5sZWZ0Pi5hdXRob3JzIC5hdXRob3I+Lm5hbWV7Zm9udC1zaXplOjEwcHg7Zm9udC13ZWlnaHQ6NDAwO2NvbG9yOnZhcigtLWhlYWRlci1wcmltYXJ5KTtvcGFjaXR5Oi43NTtwYWRkaW5nOjZweH0uYWNvcmQtLXN0b3JlLWV4dGVuc2lvbi1jYXJkPi5pbmZvLWNvbnRhaW5lcj4uYm90dG9tPi5yaWdodHtoZWlnaHQ6MTAwJTtkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1uO2FsaWduLWl0ZW1zOmZsZXgtZW5kO2p1c3RpZnktY29udGVudDpmbGV4LWVuZH1gO1xuIiwgImltcG9ydCBtb2RhbHMgZnJvbSBcIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2FwaS91aS9tb2RhbHMuanN4XCI7XHJcbmltcG9ydCBpMThuIGZyb20gXCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9hcGkvaTE4bi9pbmRleC5qc1wiO1xyXG5pbXBvcnQgcGF0Y2hlciBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vYXBpL3BhdGNoZXIvaW5kZXguanNcIjtcclxuXHJcbmltcG9ydCBjc3NUZXh0IGZyb20gXCIuL3N0eWxlLnNjc3NcIjtcclxucGF0Y2hlci5pbmplY3RDU1MoY3NzVGV4dCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgLyoqIEBwYXJhbSB7aW1wb3J0KFwidnVlXCIpLkFwcH0gdnVlQXBwICovXHJcbiAgbG9hZCh2dWVBcHApIHtcclxuICAgIHZ1ZUFwcC5jb21wb25lbnQoXHJcbiAgICAgIFwic3RvcmUtZXh0ZW5zaW9uLWNhcmRcIixcclxuICAgICAge1xyXG4gICAgICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWNvcmQtLXN0b3JlLWV4dGVuc2lvbi1jYXJkXCI+XHJcbiAgICAgICAgICAgIDxkaXYgdi1pZj1cImV4dGVuc2lvbi5wcmV2aWV3cz8ubGVuZ3RoXCIgY2xhc3M9XCJwcmV2aWV3XCIgOnN0eWxlPVwieyBiYWNrZ3JvdW5kSW1hZ2U6ICd1cmwoJyArIGV4dGVuc2lvbi5wcmV2aWV3c1tzZWxlY3RlZFByZXZpZXddLmltYWdlICsgJyknIH1cIj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udHJvbHNcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJnbyBnby1iYWNrXCIgQGNsaWNrPVwiZ29CYWNrXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMjRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTExLjgyOCAxMmwyLjgyOSAyLjgyOC0xLjQxNCAxLjQxNUw5IDEybDQuMjQzLTQuMjQzIDEuNDE0IDEuNDE1TDExLjgyOCAxMnpcIiBmaWxsPVwiY3VycmVudENvbG9yXCIgLz5cclxuICAgICAgICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJnbyBnby1mb3J3YXJkXCIgQGNsaWNrPVwiZ29Gb3J3YXJkXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMjRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTEyLjE3MiAxMkw5LjM0MyA5LjE3MmwxLjQxNC0xLjQxNUwxNSAxMmwtNC4yNDMgNC4yNDMtMS40MTQtMS40MTV6XCIgZmlsbD1cImN1cnJlbnRDb2xvclwiIC8+XHJcbiAgICAgICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm5hbWUtY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibmFtZVwiPlxyXG4gICAgICAgICAgICAgICAgICB7eyBleHRlbnNpb24ucHJldmlld3Nbc2VsZWN0ZWRQcmV2aWV3XS5uYW1lIH19XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgdi1lbHNlIGNsYXNzPVwicHJldmlldyBuby1wcmV2aWV3XCI+PC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbmZvLWNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0b3BcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJuYW1lLWNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibmFtZVwiPnt7IGkxOG5Mb2NhbGl6ZShleHRlbnNpb24ubmFtZSkgfX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInZlcnNpb25cIj52e3sgZXh0ZW5zaW9uLnZlcnNpb24gfX08L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRlc2NyaXB0aW9uXCI+e3sgaTE4bkxvY2FsaXplKGV4dGVuc2lvbi5kZXNjcmlwdGlvbikgfX08L2Rpdj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYm90dG9tXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGVmdFwiPlxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXV0aG9yc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgdi1mb3I9XCJhdXRob3IgaW4gZXh0ZW5zaW9uLmF1dGhvcnNcIiBjbGFzcz1cImF1dGhvclwiIDprZXk9XCJhdXRob3IubmFtZVwiIEBjbGljaz1cInNob3dQcm9maWxlKGF1dGhvci5pZClcIj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbWFnZVwiIDpzdHlsZT1cInsgYmFja2dyb3VuZEltYWdlOiAndXJsKCcgKyBhdXRob3IuaW1hZ2UgKyAnKScgfVwiPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm5hbWVcIj57eyBhdXRob3IubmFtZSB9fTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJpZ2h0XCI+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJidXR0b25zXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gQGNsaWNrPVwiaW5zdGFsbE9yVW5pbnN0YWxsXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8ZGlzY29yZC1idXR0b24gOnZhbHVlPVwiaTE4bkZvcm1hdChleHRlbnNpb24uaW5zdGFsbGVkID8gJ1VOSU5TVEFMTCcgOiAnSU5TVEFMTCcpXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgYCxcclxuICAgICAgICBwcm9wczogW1wiZXh0ZW5zaW9uXCJdLFxyXG4gICAgICAgIGRhdGEoKSB7XHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBzZWxlY3RlZFByZXZpZXc6IDAsXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbWV0aG9kczoge1xyXG4gICAgICAgICAgaTE4bkZvcm1hdDogaTE4bi5mb3JtYXQsXHJcbiAgICAgICAgICBpMThuTG9jYWxpemU6IGkxOG4ubG9jYWxpemUsXHJcbiAgICAgICAgICBpbnN0YWxsT3JVbmluc3RhbGwoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmV4dGVuc2lvbi5pbnN0YWxsZWQpIHtcclxuICAgICAgICAgICAgICAvLyB1bmluc3RhbGxcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAvLyBpbnN0YWxsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBnb0JhY2soKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRQcmV2aWV3LS07XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkUHJldmlldyA8IDApIHRoaXMuc2VsZWN0ZWRQcmV2aWV3ID0gdGhpcy5leHRlbnNpb24ucHJldmlld3MubGVuZ3RoIC0gMTtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBnb0ZvcndhcmQoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRQcmV2aWV3Kys7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkUHJldmlldyA+PSB0aGlzLmV4dGVuc2lvbi5wcmV2aWV3cy5sZW5ndGgpIHRoaXMuc2VsZWN0ZWRQcmV2aWV3ID0gMDtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBzaG93UHJvZmlsZShwcm9maWxlSWQpIHtcclxuICAgICAgICAgICAgbW9kYWxzLnNob3cudXNlcihwcm9maWxlSWQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgKVxyXG4gIH1cclxufSIsICJpbXBvcnQgaW5zdGFsbGVkRXh0ZW5zaW9uQ2FyZCBmcm9tIFwiLi9pbnN0YWxsZWQtZXh0ZW5zaW9uLWNhcmQvaW5kZXguanNcIjtcclxuaW1wb3J0IHN0b3JlRXh0ZW5zaW9uQ2FyZCBmcm9tIFwiLi9zdG9yZS1leHRlbnNpb24tY2FyZC9pbmRleC5qc1wiXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgLyoqIEBwYXJhbSB7aW1wb3J0KFwidnVlXCIpLkFwcH0gdnVlQXBwICovXHJcbiAgbG9hZCh2dWVBcHApIHtcclxuICAgIHN0b3JlRXh0ZW5zaW9uQ2FyZC5sb2FkKHZ1ZUFwcCk7XHJcbiAgICBpbnN0YWxsZWRFeHRlbnNpb25DYXJkLmxvYWQodnVlQXBwKTtcclxuICB9XHJcbn0iLCAiXHJcbmltcG9ydCBjb25maWdDb21wb25lbnRzIGZyb20gXCIuL2NvbmZpZy9pbmRleC5qc1wiO1xyXG5pbXBvcnQgY2FyZENvbXBvbmVudHMgZnJvbSBcIi4vY2FyZHMvaW5kZXguanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAvKiogQHBhcmFtIHtpbXBvcnQoXCJ2dWVcIikuQXBwfSB2dWVBcHAgKi9cclxuICBsb2FkKHZ1ZUFwcCkge1xyXG4gICAgY29uZmlnQ29tcG9uZW50cy5sb2FkKHZ1ZUFwcCk7XHJcbiAgICBjYXJkQ29tcG9uZW50cy5sb2FkKHZ1ZUFwcCk7XHJcbiAgfVxyXG59IiwgImltcG9ydCBwYWdlcyBmcm9tIFwiLi9wYWdlcy9pbmRleC5qc1wiO1xyXG5pbXBvcnQgY29tcG9uZW50cyBmcm9tIFwiLi9jb21wb25lbnRzL2luZGV4LmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgLyoqIEBwYXJhbSB7aW1wb3J0KFwidnVlXCIpLkFwcH0gdnVlQXBwICovXHJcbiAgbG9hZCh2dWVBcHApIHtcclxuICAgIGNvbXBvbmVudHMubG9hZCh2dWVBcHApO1xyXG4gICAgcGFnZXMubG9hZCh2dWVBcHApO1xyXG4gIH1cclxufSIsICJpbXBvcnQgZG9tIGZyb20gXCIuLi8uLi9hcGkvZG9tL2luZGV4LmpzXCI7XHJcbmltcG9ydCB3ZWJwYWNrIGZyb20gXCIuLi8uLi9hcGkvbW9kdWxlcy93ZWJwYWNrLmpzXCI7XHJcbmltcG9ydCBwYXRjaGVyIGZyb20gXCIuLi8uLi9hcGkvcGF0Y2hlci9pbmRleC5qc1wiO1xyXG5pbXBvcnQgdXRpbHMgZnJvbSBcIi4uLy4uL2FwaS91dGlscy9pbmRleC5qc1wiO1xyXG5pbXBvcnQgaTE4biBmcm9tIFwiLi4vLi4vYXBpL2kxOG4vaW5kZXguanNcIjtcclxuaW1wb3J0IHVpIGZyb20gXCIuLi8uLi9hcGkvdWkvaW5kZXguanNcIjtcclxuXHJcbmltcG9ydCBjc3NUZXh0IGZyb20gXCIuL3N0eWxlLnNjc3NcIjtcclxuaW1wb3J0IHZ1ZUNvbXBvbmVudHMgZnJvbSBcIi4vdnVlL2NvbXBvbmVudHMvaW5kZXguanNcIjtcclxucGF0Y2hlci5pbmplY3RDU1MoY3NzVGV4dCk7XHJcblxyXG57XHJcbiAgbGV0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XHJcbiAgc2NyaXB0LnNyYyA9IFwiaHR0cHM6Ly91bnBrZy5jb20vdnVlQDMvZGlzdC92dWUuZ2xvYmFsLmpzXCI7XHJcbiAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xyXG59XHJcblxyXG5kb20ucGF0Y2goJ2FbaHJlZj1cIi9zdG9yZVwiXVtkYXRhLWxpc3QtaXRlbS1pZCQ9XCJfX19uaXRyb1wiXScsIChlbG0pID0+IHtcclxuICB1dGlscy5pZkV4aXN0cyhcclxuICAgIGVsbS5xdWVyeVNlbGVjdG9yKCdbY2xhc3MqPVwibmFtZUFuZERlY29yYXRvcnMtXCJdIFtjbGFzcyo9XCJuYW1lLVwiXScpLFxyXG4gICAgKG5hbWVFbG0pID0+IHtcclxuICAgICAgbmFtZUVsbS50ZXh0Q29udGVudCA9IGkxOG4uZm9ybWF0KFwiQVBQX05BTUVcIik7XHJcbiAgICB9XHJcbiAgKTtcclxuXHJcbiAgdXRpbHMuaWZFeGlzdHMoXHJcbiAgICBlbG0ucXVlcnlTZWxlY3RvcignW2NsYXNzKj1cInByZW1pdW1UcmlhbEFja25vd2xlZGdlZEJhZGdlLVwiXScpLFxyXG4gICAgKG5pdHJvRWxtKSA9PiB7XHJcbiAgICAgIG5pdHJvRWxtLnJlbW92ZSgpO1xyXG4gICAgfVxyXG4gICk7XHJcblxyXG4gIHV0aWxzLmlmRXhpc3RzKFxyXG4gICAgZWxtLnF1ZXJ5U2VsZWN0b3IoJ1tjbGFzcyo9XCJhdmF0YXJXaXRoVGV4dC1cIl0gW2NsYXNzKj1cImF2YXRhci1cIl0gc3ZnJyksXHJcbiAgICBmaWxsU1ZHRWxtV2l0aEFjb3JkTG9nb1xyXG4gICk7XHJcbn0pO1xyXG5cclxubGV0IGludGVybmFsVnVlQXBwID0gbnVsbDtcclxuXHJcbihhc3luYyAoKSA9PiB7XHJcbiAgbGV0IGhlYWRlckl0ZW1DbGFzc2VzO1xyXG4gIHdoaWxlICh0cnVlKSB7XHJcbiAgICBoZWFkZXJJdGVtQ2xhc3NlcyA9IHdlYnBhY2suZmluZEJ5UHJvcGVydGllcyhcImRpdmlkZXJcIiwgXCJoYW1idXJnZXJcIiwgXCJ0aGVtZWRcIik7XHJcbiAgICBpZiAoaGVhZGVySXRlbUNsYXNzZXMpIGJyZWFrO1xyXG4gICAgYXdhaXQgbmV3IFByb21pc2UoKHIpID0+IHNldFRpbWVvdXQociwgMTAwKSk7XHJcbiAgfVxyXG5cclxuICBjb25zdCB0YWJCYXJDbGFzc2VzID0gd2VicGFjay5maW5kQnlQcm9wZXJ0aWVzKFwidGFiQmFyXCIsIFwibWF4V2lkdGhXaXRoVG9vbGJhclwiKTtcclxuICBjb25zdCBoZWFkZXJDbGFzc2VzID0gd2VicGFjay5maW5kQnlQcm9wZXJ0aWVzKFwidG9wUGlsbFwiLCBcImhlYWRlclRleHRcIik7XHJcbiAgZG9tLnBhdGNoKCdbY2xhc3MqPVwiYXBwbGljYXRpb25TdG9yZS1cIl0gW2NsYXNzKj1cImhvbWVXcmFwcGVyTm9ybWFsLVwiXScsIChlbG0pID0+IHtcclxuXHJcbiAgICB1dGlscy5pZkV4aXN0cyhcclxuICAgICAgZWxtLnF1ZXJ5U2VsZWN0b3IoJ1tjbGFzcyo9XCJoZWFkZXJCYXItXCJdIFtjbGFzcyo9XCJ0aXRsZVdyYXBwZXItXCJdIFtjbGFzcyo9XCJ0aXRsZS1cIl0nKSxcclxuICAgICAgKHRpdGxlRWxtKSA9PiB7XHJcbiAgICAgICAgdGl0bGVFbG0udGV4dENvbnRlbnQgPSBpMThuLmZvcm1hdChcIkFQUF9OQU1FXCIpO1xyXG5cclxuICAgICAgICBpZiAoaW50ZXJuYWxWdWVBcHApIHtcclxuICAgICAgICAgIGxldCBjb250YWluZXIgPSBkb20ucGFyZW50cyh0aXRsZUVsbSwgMikucG9wKCk7XHJcblxyXG4gICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKFxyXG4gICAgICAgICAgICBkb20ucGFyc2UoYDxkaXYgY2xhc3M9XCIke2hlYWRlckl0ZW1DbGFzc2VzLmRpdmlkZXJ9XCI+PC9kaXY+YClcclxuICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgY29uc3QgYnV0dG9uc0NvbnRhaW5lciA9IGRvbS5wYXJzZShgXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiJHt0YWJCYXJDbGFzc2VzLnRhYkJhcn0gJHtoZWFkZXJDbGFzc2VzLnRvcFBpbGx9XCI+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICBgKTtcclxuXHJcbiAgICAgICAgICBsZXQgYnV0dG9ucyA9IFtdO1xyXG5cclxuICAgICAgICAgIGZ1bmN0aW9uIGJ1aWxkQnV0dG9uKGlkLCB0ZXh0LCBjdXN0b21DbGFzc2VzID0gXCJcIikge1xyXG4gICAgICAgICAgICBsZXQgZWxtID0gZG9tLnBhcnNlKGA8ZGl2IGlkPVwidGFiLWJ1dHRvbi0ke2lkfVwiIGNsYXNzPVwiYWNvcmQtLXRhYnMtdGFiLWJ1dHRvbiAke2N1c3RvbUNsYXNzZXN9ICR7dGFiQmFyQ2xhc3Nlcy5pdGVtfSAke2hlYWRlckNsYXNzZXMuaXRlbX0gJHtoZWFkZXJDbGFzc2VzLnRoZW1lZH1cIj4ke3RleHR9PC9kaXY+YCk7XHJcblxyXG4gICAgICAgICAgICBidXR0b25zLnB1c2goZWxtKTtcclxuXHJcbiAgICAgICAgICAgIGVsbS5zZXRTZWxlY3RlZCA9IChzKSA9PiB7XHJcbiAgICAgICAgICAgICAgaWYgKHMpIGVsbS5jbGFzc0xpc3QuYWRkKGhlYWRlckNsYXNzZXMuc2VsZWN0ZWQsIFwic2VsZWN0ZWRcIik7XHJcbiAgICAgICAgICAgICAgZWxzZSBlbG0uY2xhc3NMaXN0LnJlbW92ZShoZWFkZXJDbGFzc2VzLnNlbGVjdGVkLCBcInNlbGVjdGVkXCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBlbG0uc2V0U2VsZWN0ZWQoaW50ZXJuYWxWdWVBcHAuc2VsZWN0ZWRUYWIgPT09IGlkKTtcclxuXHJcbiAgICAgICAgICAgIGVsbS5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgIGJ1dHRvbnMuZm9yRWFjaCgoYikgPT4gYi5zZXRTZWxlY3RlZChmYWxzZSkpO1xyXG4gICAgICAgICAgICAgIGVsbS5zZXRTZWxlY3RlZCh0cnVlKTtcclxuICAgICAgICAgICAgICBpbnRlcm5hbFZ1ZUFwcC5zZWxlY3RlZFRhYiA9IGlkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBlbG07XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgYnV0dG9uc0NvbnRhaW5lci5hcHBlbmRDaGlsZChidWlsZEJ1dHRvbihcImhvbWVcIiwgaTE4bi5mb3JtYXQoXCJIT01FXCIpKSk7XHJcbiAgICAgICAgICBidXR0b25zQ29udGFpbmVyLmFwcGVuZENoaWxkKGJ1aWxkQnV0dG9uKFwiaW5zdGFsbGVkLWV4dGVuc2lvbnNcIiwgaTE4bi5mb3JtYXQoXCJJTlNUQUxMRURfRVhURU5TSU9OU1wiKSkpO1xyXG4gICAgICAgICAgYnV0dG9uc0NvbnRhaW5lci5hcHBlbmRDaGlsZChidWlsZEJ1dHRvbihcInNldHRpbmdzXCIsIGkxOG4uZm9ybWF0KFwiU0VUVElOR1NcIikpKTtcclxuICAgICAgICAgIGJ1dHRvbnNDb250YWluZXIuYXBwZW5kQ2hpbGQoYnVpbGRCdXR0b24oXCJzdG9yZVwiLCBpMThuLmZvcm1hdChcIlNUT1JFXCIpLCBcInN0b3JlLXRhYi1idXR0b25cIikpO1xyXG5cclxuICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChidXR0b25zQ29udGFpbmVyKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgICB1dGlscy5pZkV4aXN0cyhcclxuICAgICAgZWxtLnF1ZXJ5U2VsZWN0b3IoJ1tjbGFzcyo9XCJoZWFkZXJCYXItXCJdIFtjbGFzcyo9XCJpY29uV3JhcHBlci1cIl0gW2NsYXNzKj1cImljb24tXCJdJyksXHJcbiAgICAgIGZpbGxTVkdFbG1XaXRoQWNvcmRMb2dvXHJcbiAgICApO1xyXG4gIH0pO1xyXG59KSgpO1xyXG5cclxuZnVuY3Rpb24gZmlsbFNWR0VsbVdpdGhBY29yZExvZ28oc3ZnRWxtKSB7XHJcbiAgc3ZnRWxtLnNldEF0dHJpYnV0ZShcInZpZXdCb3hcIiwgXCIwIDAgODEzLjUgMTQ5M1wiKTtcclxuICBzdmdFbG0uc2V0QXR0cmlidXRlKFwieG1sbnNcIiwgXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiKTtcclxuICBzdmdFbG0uaW5uZXJIVE1MID0gYFxyXG4gICAgPGRlZnM+XHJcbiAgICAgIDxzdHlsZT5cclxuICAgICAgICAuYWNvcmQtLWxvZ28tY29sb3Ige1xyXG4gICAgICAgICAgZmlsbDogY3VycmVudENvbG9yO1xyXG4gICAgICAgICAgZmlsbC1ydWxlOiBldmVub2RkO1xyXG4gICAgICAgIH1cclxuICAgICAgPC9zdHlsZT5cclxuICAgIDwvZGVmcz5cclxuICAgIDxnPlxyXG4gICAgICA8cGF0aCBjbGFzcz1cImFjb3JkLS1sb2dvLWNvbG9yXCIgZD1cIk04MTcuMjY2LDEzMjIuNWgyODV2MzY1aC0yODV2LTM2NVpcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoLTU1My4yNSAtMjEzLjUpXCIvPlxyXG4gICAgICA8cGF0aCBjbGFzcz1cImFjb3JkLS1sb2dvLWNvbG9yXCIgZD1cIk01NTUuMjM1LDE1MjMuNzhzOTEuMTY5LTMxOS44NSw5Mi41MzEtMzE5LjI4YzExNC43LDQ3LjgzLDE2MCwxOTIsMTYwLDE5MmwtNTIuMTIsMTg2LjYxcy0zMS4xMjksMTM3LjcxLTgwLjg4LDEyMC4zOUM1MjguMDI2LDE2NTIuNDIsNTU1LjIzNSwxNTIzLjc4LDU1NS4yMzUsMTUyMy43OFpcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoLTU1My4yNSAtMjEzLjUpXCIvPlxyXG4gICAgICA8cGF0aCBjbGFzcz1cImFjb3JkLS1sb2dvLWNvbG9yXCIgZD1cIk0xMzY0Ljc3LDE1MjUuMjhzLTkxLjE3LTMxOS44NS05Mi41NC0zMTkuMjhjLTExNC43LDQ3LjgzLTE2MCwxOTItMTYwLDE5Mmw1Mi4xMiwxODYuNjFzMzEuMTMsMTM3LjcxLDgwLjg4LDEyMC4zOUMxMzkxLjk3LDE2NTMuOTIsMTM2NC43NywxNTI1LjI4LDEzNjQuNzcsMTUyNS4yOFpcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoLTU1My4yNSAtMjEzLjUpXCIvPlxyXG4gICAgPC9nPlxyXG4gICAgPHBhdGggY2xhc3M9XCJhY29yZC0tbG9nby1jb2xvclwiIGQ9XCJNODc0Ljc2NiwyNzUuNXMxNC41NzktNjEuOTE4LDg3LTYyYzgwLjgyNC0uMDkyLDg3LDYyLDg3LDYyczE5OS40Myw4NTEuNDcsMTk4LDg1MmMtMjEwLjMzLDc3LjcxLTE0NiwxODAtMTQ2LDE4MGgtMjgxczYzLjctMTAzLjgyLTE0Ni0xODFDNjcxLjAxNCwxMTI1LjQ5LDg3NC43NjYsMjc1LjUsODc0Ljc2NiwyNzUuNVpcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoLTU1My4yNSAtMjEzLjUpXCIvPlxyXG4gICAgPGc+XHJcbiAgICAgIDxwYXRoIGNsYXNzPVwiYWNvcmQtLWxvZ28tY29sb3JcIiBkPVwiTTEyMzguMTQsODk3LjVhNTMuODgyLDUzLjg4MiwwLDAsMSw1My44OCw1My44NzVjMCwyNC45MzktMjAuMjUsNDYuOTg3LTQzLjI1LDUzLjEyNS00LjQ1LDEuMTgtMTAuMTktMzktMTEtMzktMC41OCwwLTI3LjcxLDMuNTEtMzEsNC01LjU4LjgyOC0xMS45My0xMy44NzYtNC0yMCwxLjkzLTEuNDkxLDI2LjYyLTYuOTU5LDI5LTcsMC42Mi0uMDExLTcuMzQtNDEuNjE4LTctNDNDMTIyNS42NCw4OTUuOTQ0LDEyMzMuNTIsODk3LjUsMTIzOC4xNCw4OTcuNVpcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoLTU1My4yNSAtMjEzLjUpXCIvPlxyXG4gICAgICA8cGF0aCBjbGFzcz1cImFjb3JkLS1sb2dvLWNvbG9yXCIgZD1cIk0xMTczLjY0LDYzMi41YTUzLjg4Miw1My44ODIsMCwwLDEsNTMuODgsNTMuODc1YzAsMjQuOTM5LTIwLjI1LDQ2Ljk4Ny00My4yNSw1My4xMjUtNC40NSwxLjE4NS0xMC4xOS0zOS0xMS0zOS0wLjU4LDAtMjcuNzEsMy41MS0zMSw0LTUuNTguODI4LTExLjkzLTEzLjg3Ni00LTIwLDEuOTMtMS40OTEsMjYuNjItNi45NTksMjktNywwLjYyLS4wMTEtNy4zNC00MS42MTgtNy00M0MxMTYxLjE0LDYzMC45NDQsMTE2OS4wMiw2MzIuNSwxMTczLjY0LDYzMi41WlwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgtNTUzLjI1IC0yMTMuNSlcIi8+XHJcbiAgICAgIDxwYXRoIGNsYXNzPVwiYWNvcmQtLWxvZ28tY29sb3JcIiBkPVwiTTExMTUuMTYsMzczYTUzLjg3NCw1My44NzQsMCwwLDEsNTMuODcsNTMuODc1YzAsMjQuOTM5LTIwLjI0LDQ2Ljk4Ny00My4yNSw1My4xMjUtNC40NCwxLjE4NS0xMC4xOC0zOS0xMS0zOS0wLjU4LDAtMjcuNywzLjUxLTMxLDQtNS41Ny44MjgtMTEuOTItMTMuODc2LTQtMjAsMS45My0xLjQ5MSwyNi42Mi02Ljk1OSwyOS03LDAuNjItLjAxMS03LjM0LTQxLjYxOC03LTQzQzExMDIuNjUsMzcxLjQ0NCwxMTEwLjUzLDM3MywxMTE1LjE2LDM3M1pcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoLTU1My4yNSAtMjEzLjUpXCIvPlxyXG4gICAgPC9nPlxyXG4gICAgPGc+XHJcbiAgICAgIDxwYXRoIGNsYXNzPVwiYWNvcmQtLWxvZ28tY29sb3JcIiBkPVwiTTY4My45MjIsODk3Ljc1YTUzLjg3NSw1My44NzUsMCwwLDAtNTMuODc1LDUzLjg3NWMwLDI0LjkzOSwyMC4yNDUsNDYuOTg3LDQzLjI1LDUzLjEyNSw0LjQ0MSwxLjE4LDEwLjE4NS0zOSwxMS0zOSwwLjU3NiwwLDI3LjcsMy41MSwzMSw0LDUuNTcyLDAuODI4LDExLjkyNi0xMy44NzYsNC0yMC0xLjkzLTEuNDkxLTI2LjYyMS02Ljk1OS0yOS03LTAuNjItLjAxMSw3LjMzOS00MS42MTgsNy00M0M2OTYuNDI0LDg5Ni4xOTQsNjg4LjU0NCw4OTcuNzUsNjgzLjkyMiw4OTcuNzVaXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKC01NTMuMjUgLTIxMy41KVwiLz5cclxuICAgICAgPHBhdGggY2xhc3M9XCJhY29yZC0tbG9nby1jb2xvclwiIGQ9XCJNNzQ4LjQyMiw2MzIuNzVhNTMuODc1LDUzLjg3NSwwLDAsMC01My44NzUsNTMuODc1YzAsMjQuOTM5LDIwLjI0NSw0Ni45ODcsNDMuMjUsNTMuMTI1LDQuNDQxLDEuMTg1LDEwLjE4NS0zOSwxMS0zOSwwLjU3NiwwLDI3LjcsMy41MSwzMSw0LDUuNTcyLDAuODI4LDExLjkyNi0xMy44NzYsNC0yMC0xLjkzLTEuNDkxLTI2LjYyMS02Ljk1OS0yOS03LTAuNjItLjAxMSw3LjMzOS00MS42MTgsNy00M0M3NjAuOTI0LDYzMS4xOTQsNzUzLjA0NCw2MzIuNzUsNzQ4LjQyMiw2MzIuNzVaXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKC01NTMuMjUgLTIxMy41KVwiLz5cclxuICAgICAgPHBhdGggY2xhc3M9XCJhY29yZC0tbG9nby1jb2xvclwiIGQ9XCJNODA2LjkwNiwzNzMuMjVhNTMuODc1LDUzLjg3NSwwLDAsMC01My44NzUsNTMuODc1YzAsMjQuOTM5LDIwLjI0NSw0Ni45ODcsNDMuMjUsNTMuMTI1LDQuNDQyLDEuMTg1LDEwLjE4NS0zOSwxMS0zOSwwLjU3NywwLDI3LjcsMy41MSwzMSw0LDUuNTcyLDAuODI4LDExLjkyNi0xMy44NzYsNC0yMC0xLjkzLTEuNDkxLTI2LjYyMS02Ljk1OS0yOS03LTAuNjItLjAxMSw3LjMzOS00MS42MTgsNy00M0M4MTkuNDA5LDM3MS42OTQsODExLjUyOCwzNzMuMjUsODA2LjkwNiwzNzMuMjVaXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKC01NTMuMjUgLTIxMy41KVwiLz5cclxuICAgIDwvZz5cclxuICBgO1xyXG59XHJcblxyXG5cclxuKGFzeW5jICgpID0+IHtcclxuICBhd2FpdCB1aS52dWUucmVhZHkud2hlbigpO1xyXG5cclxuICBjb25zdCBiYXNlVnVlRWxtID0gZG9tLnBhcnNlKGBcclxuICAgIDxkaXYgY2xhc3M9XCJhY29yZC0tdGFicy1jb250ZW50LWNvbnRhaW5lclwiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwidGFiXCI+XHJcbiAgICAgICAgPGtlZXAtYWxpdmU+XHJcbiAgICAgICAgICA8Y29tcG9uZW50IDppcz1cIlxcYFxcJHtzZWxlY3RlZFRhYn0tcGFnZVxcYFwiIC8+XHJcbiAgICAgICAgPC9rZWVwLWFsaXZlPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIGApO1xyXG5cclxuICAvKiogQHR5cGUge2ltcG9ydChcInZ1ZVwiKS5BcHB9ICovXHJcbiAgY29uc3QgdnVlQXBwID0gVnVlLmNyZWF0ZUFwcCh7XHJcbiAgICBkYXRhKCkge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHNlbGVjdGVkVGFiOiBcImhvbWVcIlxyXG4gICAgICB9O1xyXG4gICAgfSxcclxuICAgIG1vdW50ZWQoKSB7XHJcbiAgICAgIGludGVybmFsVnVlQXBwID0gdGhpcztcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgdWkudnVlLmNvbXBvbmVudHMubG9hZCh2dWVBcHApO1xyXG4gIHZ1ZUNvbXBvbmVudHMubG9hZCh2dWVBcHApO1xyXG4gIHZ1ZUFwcC5tb3VudChiYXNlVnVlRWxtKTtcclxuXHJcbiAgZG9tLnBhdGNoKCdbY2xhc3MqPVwiYXBwbGljYXRpb25TdG9yZS1cIl0gW2NsYXNzKj1cInNjcm9sbGVyQmFzZS1cIl0gW2NsYXNzKj1cInN1YnNjcmlwdGlvbnNSZWRpcmVjdENvbnRhaW5lci1cIl0sIFtjbGFzcyo9XCJhcHBsaWNhdGlvblN0b3JlLVwiXSBbY2xhc3MqPVwic2Nyb2xsZXJCYXNlLVwiXSBbY2xhc3MqPVwidHJpYWxPZmZlcldyYXBwZXItXCJdLCBbY2xhc3MqPVwiYXBwbGljYXRpb25TdG9yZS1cIl0gW2NsYXNzKj1cInNjcm9sbGVyQmFzZS1cIl0gW2NsYXNzKj1cInByZW1pdW1DYXJkcy1cIl0nLCAoZWxtKSA9PiB7XHJcbiAgICAvKiogQHR5cGUge0hUTUxEaXZFbGVtZW50fSAqL1xyXG4gICAgbGV0IGNvbnRhaW5lckVsbSA9IGRvbS5wYXJlbnRzKGVsbSwgNCkucG9wKCk7XHJcbiAgICBjb250YWluZXJFbG0ucmVwbGFjZUNoaWxkcmVuKGJhc2VWdWVFbG0pO1xyXG4gIH0pO1xyXG59KSgpO1xyXG5cclxuXHJcblxyXG5cclxuIiwgIlxyXG4oYXN5bmMgKCkgPT4ge1xyXG4gIC8qKiBAdHlwZSB7U1ZHRWxlbWVudH0gKi9cclxuICBsZXQgc3ZnRWxtO1xyXG4gIHdoaWxlICh0cnVlKSB7XHJcbiAgICBzdmdFbG0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbY2xhc3MqPVwid29yZG1hcmstXCJdIHN2ZycpO1xyXG4gICAgaWYgKHN2Z0VsbSkgYnJlYWs7XHJcbiAgICBhd2FpdCBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgMTAwKSk7XHJcbiAgfVxyXG5cclxuICBzdmdFbG0uaW5uZXJIVE1MID0gYDxwYXRoIGQ9XCJNNi44NjQgMTBMNi40MzIgOC45NTZIMy4wNDhMMi41NDQgMTBIMC4xMDhMMy45NDggMS41NjRINi4wNDhMOS43MiAxMEg2Ljg2NFpNNC43NCA0Ljc4TDMuOTEyIDYuNzk2SDUuNThMNC43NCA0Ljc4Wk0xNS41MDQ1IDYuMzI4QzE1LjM0NDUgNi4yMjQgMTUuMTkyNSA2LjEzMiAxNS4wNDg1IDYuMDUyQzE0LjkwNDUgNS45NjQgMTQuNzU2NSA1Ljg5MiAxNC42MDQ1IDUuODM2QzE0LjQ1MjUgNS43NzIgMTQuMjkyNSA1LjcyNCAxNC4xMjQ1IDUuNjkyQzEzLjk2NDUgNS42NiAxMy43ODQ1IDUuNjQ0IDEzLjU4NDUgNS42NDRDMTMuMzEyNSA1LjY0NCAxMy4wODA1IDUuNjggMTIuODg4NSA1Ljc1MkMxMi43MDQ1IDUuODI0IDEyLjU1NjUgNS45MiAxMi40NDQ1IDYuMDRDMTIuMzMyNSA2LjE2IDEyLjI0ODUgNi4yOTYgMTIuMTkyNSA2LjQ0OEMxMi4xNDQ1IDYuNiAxMi4xMjA1IDYuNzUyIDEyLjEyMDUgNi45MDRDMTIuMTIwNSA3LjA0OCAxMi4xNTI1IDcuMTkyIDEyLjIxNjUgNy4zMzZDMTIuMjgwNSA3LjQ3MiAxMi4zNzI1IDcuNTkyIDEyLjQ5MjUgNy42OTZDMTIuNjIwNSA3LjggMTIuNzcyNSA3Ljg4NCAxMi45NDg1IDcuOTQ4QzEzLjEyNDUgOC4wMTIgMTMuMzI4NSA4LjA0NCAxMy41NjA1IDguMDQ0QzEzLjcyODUgOC4wNDQgMTMuODg0NSA4LjAyOCAxNC4wMjg1IDcuOTk2QzE0LjE4MDUgNy45NjQgMTQuMzI4NSA3LjkxNiAxNC40NzI1IDcuODUyQzE0LjYyNDUgNy43ODggMTQuNzgwNSA3LjcxMiAxNC45NDA1IDcuNjI0QzE1LjEwODUgNy41MjggMTUuMjk2NSA3LjQyIDE1LjUwNDUgNy4zTDE2LjEyODUgOS4wNTJDMTUuNzY4NSA5LjM1NiAxNS4zNDQ1IDkuNjE2IDE0Ljg1NjUgOS44MzJDMTQuMzY4NSAxMC4wNCAxMy44NDA1IDEwLjE0NCAxMy4yNzI1IDEwLjE0NEMxMi43MzY1IDEwLjE0NCAxMi4yNDg1IDEwLjA4IDExLjgwODUgOS45NTJDMTEuMzc2NSA5LjgxNiAxMS4wMDQ1IDkuNjE2IDEwLjY5MjUgOS4zNTJDMTAuMzg4NSA5LjA4IDEwLjE1MjUgOC43NDQgOS45ODQ0NyA4LjM0NEM5LjgxNjQ3IDcuOTM2IDkuNzMyNDcgNy40NiA5LjczMjQ3IDYuOTE2QzkuNzMyNDcgNi4zNTYgOS44MjQ0NyA1Ljg3MiAxMC4wMDg1IDUuNDY0QzEwLjIwMDUgNS4wNTYgMTAuNDU2NSA0LjcyIDEwLjc3NjUgNC40NTZDMTEuMTA0NSA0LjE4NCAxMS40ODg1IDMuOTg0IDExLjkyODUgMy44NTZDMTIuMzY4NSAzLjcyIDEyLjg0MDUgMy42NTIgMTMuMzQ0NSAzLjY1MkMxNC4zMjA1IDMuNjUyIDE1LjE4NDUgMy45NDQgMTUuOTM2NSA0LjUyOEwxNS41MDQ1IDYuMzI4Wk0yMy4zOTE5IDYuODU2QzIzLjM5MTkgNy40MzIgMjMuMzExOSA3LjkyOCAyMy4xNTE5IDguMzQ0QzIyLjk5MTkgOC43NiAyMi43NTk5IDkuMTA0IDIyLjQ1NTkgOS4zNzZDMjIuMTU5OSA5LjY0IDIxLjc5OTkgOS44MzYgMjEuMzc1OSA5Ljk2NEMyMC45NTk5IDEwLjA4NCAyMC40OTU5IDEwLjE0NCAxOS45ODM5IDEwLjE0NEMxOS40ODc5IDEwLjE0NCAxOS4wMzE5IDEwLjA4IDE4LjYxNTkgOS45NTJDMTguMTk5OSA5LjgxNiAxNy44Mzk5IDkuNjEyIDE3LjUzNTkgOS4zNEMxNy4yMzE5IDkuMDY4IDE2Ljk5MTkgOC43MjggMTYuODE1OSA4LjMyQzE2LjY0NzkgNy45MDQgMTYuNTYzOSA3LjQxNiAxNi41NjM5IDYuODU2QzE2LjU2MzkgNi4yNzIgMTYuNjQ3OSA1Ljc3MiAxNi44MTU5IDUuMzU2QzE2Ljk5MTkgNC45NCAxNy4yMzE5IDQuNiAxNy41MzU5IDQuMzM2QzE3LjgzOTkgNC4wNzIgMTguMTk5OSAzLjg4IDE4LjYxNTkgMy43NkMxOS4wMzE5IDMuNjQgMTkuNDg3OSAzLjU4IDE5Ljk4MzkgMy41OEMyMC40OTU5IDMuNTggMjAuOTU5OSAzLjY0OCAyMS4zNzU5IDMuNzg0QzIxLjc5OTkgMy45MTIgMjIuMTU5OSA0LjExMiAyMi40NTU5IDQuMzg0QzIyLjc1OTkgNC42NDggMjIuOTkxOSA0Ljk4OCAyMy4xNTE5IDUuNDA0QzIzLjMxMTkgNS44MTIgMjMuMzkxOSA2LjI5NiAyMy4zOTE5IDYuODU2Wk0yMS4xMzU5IDYuODQ0QzIxLjEzNTkgNi41MjQgMjEuMDMxOSA2LjI1NiAyMC44MjM5IDYuMDRDMjAuNjIzOSA1LjgyNCAyMC4zNDM5IDUuNzE2IDE5Ljk4MzkgNS43MTZDMTkuNjIzOSA1LjcxNiAxOS4zNDM5IDUuODI0IDE5LjE0MzkgNi4wNEMxOC45NTE5IDYuMjQ4IDE4Ljg1NTkgNi41MTYgMTguODU1OSA2Ljg0NEMxOC44NTU5IDcuMTQ4IDE4Ljk1MTkgNy40MTYgMTkuMTQzOSA3LjY0OEMxOS4zNDM5IDcuODcyIDE5LjYyMzkgNy45ODQgMTkuOTgzOSA3Ljk4NEMyMC4zNDM5IDcuOTg0IDIwLjYyMzkgNy44NzIgMjAuODIzOSA3LjY0OEMyMS4wMzE5IDcuNDI0IDIxLjEzNTkgNy4xNTYgMjEuMTM1OSA2Ljg0NFpNMjguNjk0OCA2LjU4TDI4LjQ3ODggNi41OTJDMjguNDcwOCA2LjQwOCAyOC4zOTA4IDYuMjYgMjguMjM4OCA2LjE0OEMyOC4wODY4IDYuMDM2IDI3LjkyMjggNS45OCAyNy43NDY4IDUuOThDMjcuNTg2OCA1Ljk4IDI3LjQwNjggNi4wMjggMjcuMjA2OCA2LjEyNEMyNy4wMTQ4IDYuMjEyIDI2Ljg0MjggNi4zNDggMjYuNjkwOCA2LjUzMlYxMEgyNC4zMTQ4VjMuNzg0SDI2LjY5MDhWNC4zOTZDMjYuODgyOCA0LjIxMiAyNy4xMDI4IDQuMDQgMjcuMzUwOCAzLjg4QzI3LjYwNjggMy43MiAyNy45MTA4IDMuNjQgMjguMjYyOCAzLjY0QzI4LjMxODggMy42NCAyOC4zODY4IDMuNjQ0IDI4LjQ2NjggMy42NTJDMjguNTQ2OCAzLjY2IDI4LjYyNjggMy42NzIgMjguNzA2OCAzLjY4OEMyOC43ODY4IDMuNzA0IDI4Ljg2MjggMy43MjggMjguOTM0OCAzLjc2QzI5LjAwNjggMy43ODQgMjkuMDYyOCAzLjgxNiAyOS4xMDI4IDMuODU2TDI4LjY5NDggNi41OFpNMzQuMzkyOSAxMFY5LjU1NkMzNC4zMjA5IDkuNjI4IDM0LjIyMDkgOS42OTYgMzQuMDkyOSA5Ljc2QzMzLjk2NDkgOS44MjQgMzMuODI0OSA5Ljg4NCAzMy42NzI5IDkuOTRDMzMuNTIwOSA5Ljk5NiAzMy4zNjg5IDEwLjA0IDMzLjIxNjkgMTAuMDcyQzMzLjA3MjkgMTAuMTA0IDMyLjk0NDkgMTAuMTIgMzIuODMyOSAxMC4xMkMzMi40MjQ5IDEwLjEyIDMyLjAzMjkgMTAuMDU2IDMxLjY1NjkgOS45MjhDMzEuMjgwOSA5Ljc5MiAzMC45NDg5IDkuNTkyIDMwLjY2MDkgOS4zMjhDMzAuMzgwOSA5LjA1NiAzMC4xNTY5IDguNzI0IDI5Ljk4ODkgOC4zMzJDMjkuODIwOSA3LjkzMiAyOS43MzY5IDcuNDY4IDI5LjczNjkgNi45NEMyOS43MzY5IDYuMzggMjkuODE2OSA1Ljg5NiAyOS45NzY5IDUuNDg4QzMwLjE0NDkgNS4wOCAzMC4zNjg5IDQuNzQgMzAuNjQ4OSA0LjQ2OEMzMC45MzY5IDQuMTk2IDMxLjI3MjkgMy45OTYgMzEuNjU2OSAzLjg2OEMzMi4wNDA5IDMuNzMyIDMyLjQ0ODkgMy42NjQgMzIuODgwOSAzLjY2NEMzMi45Njg5IDMuNjY0IDMzLjA4MDkgMy42NzYgMzMuMjE2OSAzLjdDMzMuMzYwOSAzLjcxNiAzMy41MDQ5IDMuNzQ0IDMzLjY0ODkgMy43ODRDMzMuNzkyOSAzLjgxNiAzMy45Mjg5IDMuODYgMzQuMDU2OSAzLjkxNkMzNC4xOTI5IDMuOTcyIDM0LjI5NjkgNC4wMzIgMzQuMzY4OSA0LjA5NlYwLjg1NkgzNi43MDg5VjEwSDM0LjM5MjlaTTM0LjM2ODkgNi4wNjRDMzQuMzA0OSA2LjAxNiAzNC4yMjQ5IDUuOTcyIDM0LjEyODkgNS45MzJDMzQuMDMyOSA1Ljg5MiAzMy45MzI5IDUuODYgMzMuODI4OSA1LjgzNkMzMy43MjQ5IDUuODA0IDMzLjYyMDkgNS43OCAzMy41MTY5IDUuNzY0QzMzLjQxMjkgNS43NDggMzMuMzIwOSA1Ljc0IDMzLjI0MDkgNS43NEMzMy4wODA5IDUuNzQgMzIuOTI0OSA1Ljc2OCAzMi43NzI5IDUuODI0QzMyLjYyODkgNS44OCAzMi41MDA5IDUuOTYgMzIuMzg4OSA2LjA2NEMzMi4yNzY5IDYuMTYgMzIuMTg4OSA2LjI3NiAzMi4xMjQ5IDYuNDEyQzMyLjA2MDkgNi41NDggMzIuMDI4OSA2LjY5MiAzMi4wMjg5IDYuODQ0QzMyLjAyODkgNy4wMDQgMzIuMDYwOSA3LjE1MiAzMi4xMjQ5IDcuMjg4QzMyLjE4ODkgNy40MjQgMzIuMjc2OSA3LjU0NCAzMi4zODg5IDcuNjQ4QzMyLjUwMDkgNy43NDQgMzIuNjI4OSA3LjgyNCAzMi43NzI5IDcuODg4QzMyLjkyNDkgNy45NDQgMzMuMDgwOSA3Ljk3MiAzMy4yNDA5IDcuOTcyQzMzLjMyMDkgNy45NzIgMzMuNDEyOSA3Ljk2IDMzLjUxNjkgNy45MzZDMzMuNjIwOSA3LjkxMiAzMy43MjQ5IDcuODg0IDMzLjgyODkgNy44NTJDMzMuOTMyOSA3LjgxMiAzNC4wMzI5IDcuNzY4IDM0LjEyODkgNy43MkMzNC4yMjQ5IDcuNjY0IDM0LjMwNDkgNy42MDggMzQuMzY4OSA3LjU1MlY2LjA2NFpcIiBmaWxsPVwiY3VycmVudENvbG9yXCIgLz5gO1xyXG4gIHN2Z0VsbS5zZXRBdHRyaWJ1dGUoXCJ2aWV3Qm94XCIsIFwiMCAwIDU1IDExXCIpO1xyXG59KSgpOyIsICJpbXBvcnQgeyB3YWl0VW50aWxDb25uZWN0aW9uT3BlbiB9IGZyb20gXCIuL290aGVyL3V0aWxzLmpzXCI7XHJcbmltcG9ydCBsb2FkaW5nQW5pbWF0aW9uIGZyb20gXCIuL290aGVyL2xvYWRpbmctYW5pbWF0aW9uXCI7XHJcbmltcG9ydCBhcGkgZnJvbSBcIi4vYXBpXCI7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LCBcImFjb3JkXCIsIHtcclxuICBnZXQoKSB7XHJcbiAgICByZXR1cm4gYXBpLmV4cG9zZWRBUEk7XHJcbiAgfVxyXG59KTtcclxud2luZG93Lmdsb2JhbCA9IHdpbmRvdztcclxuXHJcbihhc3luYyAoKSA9PiB7XHJcbiAgbG9hZGluZ0FuaW1hdGlvbi5zaG93KCk7XHJcbiAgYXdhaXQgd2FpdFVudGlsQ29ubmVjdGlvbk9wZW4oKTtcclxuICBsb2FkaW5nQW5pbWF0aW9uLmhpZGUoKTtcclxufSkoKTtcclxuXHJcbi8vIGV4dHJhc1xyXG5pbXBvcnQgXCIuL290aGVyL2RvY3VtZW50LXRpdGxlLWNoYW5nZS5qc1wiO1xyXG5pbXBvcnQgXCIuL290aGVyL3dlYnNvY2tldC10cmlnZ2Vycy5qc1wiO1xyXG5pbXBvcnQgXCIuL3VpL2luZGV4LmpzXCI7Il0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQ0EsYUFBTyxlQUFlLFNBQVMsY0FBYyxFQUFFLE9BQU8sS0FBSyxDQUFDO0FBQzVELGNBQVEsVUFBVSxPQUFPLE9BQU87QUFBQSxRQUM1QixLQUFLO0FBQUEsUUFDTCxLQUFLO0FBQUEsUUFDTCxRQUFRO0FBQUEsUUFDUixRQUFRO0FBQUEsTUFDWixDQUFDO0FBQUE7QUFBQTs7O0FDUEQ7QUFBQTtBQUFBO0FBQ0EsVUFBSSxrQkFBbUIsV0FBUSxRQUFLLG1CQUFvQixTQUFVLEtBQUs7QUFDbkUsZUFBUSxPQUFPLElBQUksYUFBYyxNQUFNLEVBQUUsV0FBVyxJQUFJO0FBQUEsTUFDNUQ7QUFDQSxhQUFPLGVBQWUsU0FBUyxjQUFjLEVBQUUsT0FBTyxLQUFLLENBQUM7QUFDNUQsVUFBTSxX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T0FBUztBQUFBLFlBQ1A7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLFFBQ0EsUUFBVTtBQUFBLFVBQ1IsUUFBVTtBQUFBLFVBQ1YsSUFBTTtBQUFBLFVBQ04sSUFBTTtBQUFBLFlBQ0o7QUFBQSxjQUNFO0FBQUEsY0FDQTtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLE9BQVM7QUFBQSxRQUNQLElBQU07QUFBQSxRQUNOLE1BQVE7QUFBQSxVQUNOLE9BQVM7QUFBQSxZQUNQO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxRQUNBLFFBQVU7QUFBQSxVQUNSLFFBQVU7QUFBQSxVQUNWLElBQU07QUFBQSxVQUNOLElBQU07QUFBQSxZQUNKO0FBQUEsY0FDRTtBQUFBLGNBQ0E7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsTUFDQSxNQUFRO0FBQUEsUUFDTixJQUFNO0FBQUEsUUFDTixNQUFRO0FBQUEsVUFDTixPQUFTO0FBQUEsWUFDUDtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsUUFDQSxRQUFVO0FBQUEsVUFDUixRQUFVO0FBQUEsVUFDVixJQUFNO0FBQUEsVUFDTixJQUFNO0FBQUEsWUFDSjtBQUFBLGNBQ0U7QUFBQSxjQUNBO0FBQUEsY0FDQTtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLFFBQVU7QUFBQSxRQUNSLGNBQWdCO0FBQUEsVUFDZCxJQUFNO0FBQUEsVUFDTixRQUFVO0FBQUEsWUFDUixRQUFVO0FBQUEsWUFDVixJQUFNO0FBQUEsWUFDTixJQUFNO0FBQUEsY0FDSjtBQUFBLGdCQUNFO0FBQUEsY0FDRjtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsVUFDQSxNQUFRO0FBQUEsWUFDTixRQUFVO0FBQUEsY0FD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QUFjLEtBQUssTUFBTTtBQUN6QixXQUFPLE1BQU0sVUFBVTtBQUV2QixnQkFBSSxNQUFNLHlRQUF5USxDQUFDLFFBQVE7QUFFMVIsVUFBSSxlQUFlLFlBQUksUUFBUSxLQUFLLENBQUMsRUFBRSxJQUFJO0FBQzNDLG1CQUFhLGdCQUFnQixVQUFVO0FBQUEsSUFDekMsQ0FBQztBQUFBLEVBQ0gsR0FBRzs7O0FDNUtILEdBQUMsWUFBWTtBQUVYLFFBQUk7QUFDSixXQUFPLE1BQU07QUFDWCxlQUFTLFNBQVMsY0FBYywwQkFBMEI7QUFDMUQsVUFBSTtBQUFRO0FBQ1osWUFBTSxJQUFJLFFBQVEsYUFBVyxXQUFXLFNBQVMsR0FBRyxDQUFDO0FBQUEsSUFDdkQ7QUFFQSxXQUFPLFlBQVk7QUFDbkIsV0FBTyxhQUFhLFdBQVcsV0FBVztBQUFBLEVBQzVDLEdBQUc7OztBQ1JILFNBQU8sZUFBZSxRQUFRLFNBQVM7QUFBQSxJQUNyQyxNQUFNO0FBQ0osYUFBTyxZQUFJO0FBQUEsSUFDYjtBQUFBLEVBQ0YsQ0FBQztBQUNELFNBQU8sU0FBUztBQUVoQixHQUFDLFlBQVk7QUFDWCw4QkFBaUIsS0FBSztBQUN0QixVQUFNLHdCQUF3QjtBQUM5Qiw4QkFBaUIsS0FBSztBQUFBLEVBQ3hCLEdBQUc7IiwKICAibmFtZXMiOiBbImV2ZW50IiwgIm1ha2UiLCAidGFyZ2V0IiwgInRyZWUiLCAic2VhcmNoRmlsdGVyIiwgIndhbGthYmxlIiwgImlnbm9yZSIsICJmb3VuZCIsICJjb21wb25lbnRzIiwgIl8iLCAiY2hlY2siLCAibW9kdWxlcyIsICJyZXF1aXJlIiwgImZvdW5kIiwgImZpbmRlciIsICJmb3VuZCIsICJyZXEiLCAiZmluZGVyIiwgIm5hbWUiLCAiY29tbW9uX2RlZmF1bHQiLCAiY29tbW9uX2RlZmF1bHQiLCAibm9TdG9yZSIsICJfIiwgIl8iLCAiXyIsICJ2YWwiLCAiZXJyb3IiLCAib3V0IiwgIl8iLCAiY2hlY2siLCAiQkFTRV9VUkwiLCAibmVzdHMiLCAiY29tbW9uX2RlZmF1bHQiLCAic2V0IiwgInNob3ciLCAiY29tbW9uX2RlZmF1bHQiLCAib3V0IiwgIl8iLCAiUmVhY3QiLCAiY29tbW9uX2RlZmF1bHQiLCAiY29tbW9uX2RlZmF1bHQiLCAiUmVhY3QiLCAiY29tbW9uX2RlZmF1bHQiLCAiaW50ZXJhY3RlZCIsICJnZXRDb250YWluZXIiLCAic2hvdyIsICJzdHlsZV9kZWZhdWx0IiwgInN0eWxlX2RlZmF1bHQiLCAic3R5bGVfZGVmYXVsdCIsICJzdHlsZV9kZWZhdWx0IiwgInN0eWxlX2RlZmF1bHQiLCAic3R5bGVfZGVmYXVsdCIsICJzdHlsZV9kZWZhdWx0IiwgInN0eWxlX2RlZmF1bHQiLCAic3R5bGVfZGVmYXVsdCIsICJzdHlsZV9kZWZhdWx0IiwgImNvbXBvbmVudHNfZGVmYXVsdCIsICJuYW1lIiwgImNvbXBvbmVudHNfZGVmYXVsdCIsICJvdXQiLCAibmFtZSIsICJfIiwgInNvdXJjZSIsICJhcGkiLCAiZGF0YSIsICJzb3VyY2UiLCAib3V0IiwgImFwaSIsICJzdHlsZV9kZWZhdWx0IiwgInN0eWxlX2RlZmF1bHQiLCAic3R5bGVfZGVmYXVsdCIsICJleHRlbnNpb24iLCAic3R5bGVfZGVmYXVsdCIsICJzdHlsZV9kZWZhdWx0IiwgInN0eWxlX2RlZmF1bHQiLCAic3R5bGVfZGVmYXVsdCIsICJzdHlsZV9kZWZhdWx0IiwgInN0eWxlX2RlZmF1bHQiLCAiY29tcG9uZW50c19kZWZhdWx0IiwgImNvbXBvbmVudHNfZGVmYXVsdCIsICJzdHlsZV9kZWZhdWx0IiwgImVsbSIsICJjb21wb25lbnRzX2RlZmF1bHQiXQp9Cg==
