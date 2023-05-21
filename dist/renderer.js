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
            in: "strings",
            by: [
              [
                "ButtonBorderColors",
                "Button"
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
      constants: {
        Permissions: {
          __: true,
          filter: {
            in: "properties",
            by: [
              [
                "ADD_REACTIONS"
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
            after: "Permissions"
          },
          map: {
            Permissions: [
              "ADD_REACTIONS"
            ]
          }
        }
      },
      moment: {
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
              "defaultFormat",
              "defaultFormatUtc"
            ]
          ]
        }
      },
      RelationshipActions: {
        __: true,
        filter: {
          export: false,
          in: "properties",
          by: [
            [
              "removeRelationship",
              "addRelationship"
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
      UserSettingsProtoActions: {
        __: true,
        filter: {
          export: false,
          in: "strings",
          by: [
            [
              "updateAsync",
              "USER_SETTINGS_PROTO_UPDATE_EDIT_INFO"
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
          after: "UserSettingsProtoActions"
        },
        map: {
          UserSettingsProtoActions: [
            "beforeSendCallbacks",
            "ProtoClass"
          ]
        }
      },
      SyntaxParser: {
        __: true,
        filter: {
          export: false,
          in: "properties",
          by: [
            [
              "SyntaxError",
              "parse"
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
      SpotifyActions: {
        __: true,
        filter: {
          export: false,
          in: "strings",
          by: [
            [
              '"SPOTIFY_SET_ACTIVE_DEVICE"',
              "deviceId",
              "accountId"
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
        },
        map: {
          getAccessToken: [
            "SPOTIFY_ACCOUNT_ACCESS_TOKEN_REVOKE",
            "CONNECTION_ACCESS_TOKEN"
          ],
          pause: [
            "SPOTIFY_PLAYER_PAUSE"
          ],
          play: [
            "SPOTIFY_PLAYER_PLAY"
          ]
        }
      },
      UserProfileActions: {
        __: true,
        filter: {
          export: false,
          in: "strings",
          by: [
            [
              "USER_AGREEMENTS",
              "user cannot be undefined"
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
        },
        map: {
          fetchProfile: [
            ".apply("
          ],
          getUser: [
            '"USER_UPDATE"'
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
      GuildActions2: {
        __: true,
        filter: {
          export: false,
          in: "properties",
          by: [
            [
              "leaveGuild",
              "bulkAddMemberRoles"
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

  // src/api/utils/spotify.js
  async function request(method, path, body) {
    let accessToken = common_default2.SpotifyStore.getActiveSocketAndDevice()?.socket?.accessToken;
    let accountId = Object.keys(common_default2.SpotifyStore.__getLocalVars().accounts)?.[0];
    if (!accessToken || !accountId)
      throw new Error("No active Spotify account");
    let req1 = await fetch(
      `https://api.spotify.com/v1${path.startsWith("/") ? path : `/${path}`}`,
      {
        method,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      }
    );
    if (req1.status === 401) {
      await common_default2.SpotifyActions.getAccessToken(accountId);
      return await request(method, path, body);
    }
    if (req1.status === 204)
      return null;
    return await req1.json();
  }
  var spotify_default = {
    request
  };

  // src/api/utils/index.js
  var utils_default = {
    logger: logger_default,
    react: react_default,
    spotify: spotify_default,
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
    },
    modules: {
      findFunctionNameByStrings
    }
  };

  // src/api/modules/raw/complex-finder.js
  function wrapFilter(filter) {
    return (...args) => {
      try {
        if (args[0]?.constructor?.name === "Window")
          return false;
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
    const check3 = (s1, s2) => {
      return hasNot ? s1.toString().indexOf(s2.toString()) == -1 : s1.toString().indexOf(s2.toString()) > -1;
    };
    return strings.every((j) => {
      return check3(m?.toString?.() || "", j) || check3(m?.__original__?.toString?.() || "", j) || check3(m?.type?.toString?.() || "", j) || check3(m?.type?.__original__?.toString?.() || "", j) || Object.entries(["function", "object"].includes(typeof m?.prototype) ? typeof m?.prototype : {}).filter((i) => i[0]?.includes?.("render")).some((i) => check3(i[1]?.toString?.() || "", j));
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
  function findFunctionNameByStrings(entries, strings = []) {
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
          let entires = Object.entries(__original__ || {});
          try {
            let foundObj = entires.find(([k, v]) => {
              return strings.every((string) => _.has(v, string));
            });
            if (foundObj) {
              __mapped__[key] = foundObj[0];
              return foundObj[1];
            }
          } catch {
          }
          let foundFunc = findFunctionNameByStrings(entires, strings);
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
          configurable: true,
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
  function findStores() {
    let paths = [
      "exports.Z",
      "exports.ZP",
      "exports.default",
      "exports"
    ];
    webpack_default.filter((i) => i?.getName?.()?.endsWith?.("Store"), { defaultExport: false }).forEach((m) => {
      let obj = paths.map((path) => _.get(m, path)).find((i) => i);
      if (!obj?._dispatchToken)
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
  findStores();
  waitUntilConnectionOpen().then(() => {
    findStores();
    mapObject(common, common_default.common);
  });
  var common_default2 = common;

  // src/api/modules/index.js
  var modules_default = {
    common: common_default2,
    webpack: webpack_default,
    require: globalThis["<<PRELOAD_KEY>>"].require,
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
    },
    async init() {
      await check();
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
  var i18n_default = out;

  // src/other/utils.js
  var isConnectionOpen = false;
  function waitUntilConnectionOpen() {
    return new Promise(async (resolve) => {
      if (isConnectionOpen)
        return resolve(true);
      function onEvent() {
        modules_default.common.FluxDispatcher.unsubscribe("CONNECTION_OPEN", onEvent);
        isConnectionOpen = true;
        resolve(true);
        console.log("Connection opened");
      }
      while (!modules_default?.common?.FluxDispatcher) {
        await new Promise((r) => setTimeout(r, 100));
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
  var initialized = false;
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
    },
    init() {
      if (initialized)
        return;
      initialized = true;
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
  };

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
  var importRegex = /@import url\(([^)]+)\);?/g;
  var urlRegex = /url\(([^)]+)\)?/g;
  var propRegex = /var\(--acord--([^)]+)\)/g;
  function propReplacer(css, props = {}) {
    css = css.replace(propRegex, (match, group1) => {
      let splitted = group1.split(",");
      let keySplitted = splitted.shift().trim().split("--");
      let key = keySplitted[0];
      let returnValue = "";
      let defaultValue = splitted.join(",").trim();
      let propVal = props[_.camelCase(key)];
      if (keySplitted.length > 1) {
        returnValue = propVal ? keySplitted[1] : keySplitted[2];
      } else {
        returnValue = propVal ?? (defaultValue || match);
      }
      return returnValue;
    });
    css = css.replace(importRegex, (match, group1) => {
      let splitted = group1.replaceAll('"', "").split("#");
      if (splitted.length === 1)
        return match;
      let key = splitted.pop();
      return props[_.camelCase(key)] ? match : "";
    });
    css = css.replace(urlRegex, (match, group1) => {
      let splitted = group1.replaceAll('"', "").split("#");
      if (splitted.length === 1 && !group1.startsWith("#"))
        return match;
      let key = splitted.pop();
      let val = props[_.camelCase(key)];
      return val ? `url("${val}")` : match;
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

  // src/api/storage/createPersistNest.js
  var nests = __toESM(require_cjs(), 1);

  // node_modules/idb-keyval/dist/index.js
  function promisifyRequest(request2) {
    return new Promise((resolve, reject) => {
      request2.oncomplete = request2.onsuccess = () => resolve(request2.result);
      request2.onabort = request2.onerror = () => reject(request2.error);
    });
  }
  function createStore(dbName, storeName) {
    const request2 = indexedDB.open(dbName);
    request2.onupgradeneeded = () => request2.result.createObjectStore(storeName);
    const dbp = promisifyRequest(request2);
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
  function clear(customStore = defaultGetStore()) {
    return customStore("readwrite", (store) => {
      store.clear();
      return promisifyRequest(store.transaction);
    });
  }

  // src/lib/json-decycled/index.js
  function deCycler(val, config) {
    config = typeof config === "number" ? { deep: config } : config || {};
    config.deep = config.deep || 2048;
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

  // src/api/storage/createPersistNest.js
  async function createPersistNest(suffix) {
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

  // src/api/authentication/index.js
  var authStore;
  var initialized2 = false;
  var authentication_default = {
    async when() {
      if (authStore)
        return authStore;
      while (!authStore)
        await new Promise((r) => setTimeout(r, 100));
      return authStore;
    },
    get is() {
      return !!authStore;
    },
    get token() {
      let currentUserId = common_default2.UserStore.getCurrentUser()?.id;
      if (!currentUserId)
        return null;
      return authStore?.ghost?.acordTokens?.[currentUserId] ?? null;
    },
    get store() {
      return authStore;
    },
    async init() {
      if (initialized2)
        return;
      initialized2 = true;
      authStore = await createPersistNest("Authentication");
      waitUntilConnectionOpen().then(checkTokens);
      events_default.on("CurrentUserChange", checkTokens);
    }
  };
  async function checkTokens() {
    await Promise.all(
      Object.entries(authStore.ghost.acordTokens ?? {}).map(async ([id, token]) => {
        let res = await (await fetch(`https://api.acord.app/auth/exchange?acordToken=${token}`)).json();
        if (res?.data?.id !== id) {
          delete authStore.store.acordTokens[id];
        }
      })
    );
    await new Promise((r) => setTimeout(r, 1));
    const userId = common_default2.UserStore.getCurrentUser()?.id;
    const acordToken = authStore.ghost?.acordTokens?.[userId];
    if (userId && acordToken) {
      events_default.emit("AuthenticationSuccess", { userId, acordToken });
    } else {
      events_default.emit("AuthenticationFailure");
    }
  }

  // src/api/storage/index.js
  var storage_default = {
    createPersistNest,
    authentication: authentication_default
  };

  // src/api/extensions/i18n.js
  async function buildExtensionI18N(cfg) {
    if (!cfg?.i18n)
      return null;
    let out7 = {
      __cache__: {
        localeIds: [],
        localizations: {}
      },
      format(key, ...args) {
        return utils_default.format(out7.get(key), ...args);
      },
      get(key) {
        return out7.__cache__.localizations[i18n_default.locale]?.[key] || out7.__cache__.localizations.default?.[key] || key;
      },
      messages: new Proxy({}, {
        get(_2, prop) {
          return out7.get(prop);
        }
      })
    };
    async function check3() {
      const locale = i18n_default.locale;
      if (typeof cfg.i18n === "string") {
        const BASE_URL2 = cfg.i18n.endsWith("/") ? cfg.i18n.slice(0, -1) : cfg.i18n;
        if (!out7.__cache__.localeIds.length) {
          try {
            out7.__cache__.localeIds = await (await fetch(`${BASE_URL2}/locales.json`, noStore)).json();
          } catch {
          }
          try {
            out7.__cache__.localizations.default = await (await fetch(`${BASE_URL2}/default.json`, noStore)).json();
          } catch {
          }
        }
        if (out7.__cache__.localeIds.includes(locale) && !out7.__cache__.localizations?.[locale]) {
          try {
            out7.__cache__.localizations[locale] = await (await fetch(`${BASE_URL2}/${locale}.json`, noStore)).json();
          } catch {
          }
          ;
        }
      } else {
        out7.__cache__.localeIds = Object.keys(cfg.i18n);
        out7.__cache__.localizations = cfg.i18n;
      }
    }
    await check3();
    return out7;
  }

  // src/api/extensions/index.js
  var nests2 = __toESM(require_cjs(), 1);

  // src/api/http/index.js
  var handlers = /* @__PURE__ */ new Map();
  window["<<PRELOAD_KEY>>"].http.setHandler(async ({ url, method, body, headers }) => {
    if (url == "/handler") {
      if (method == "POST") {
        if (!body)
          return { status: 400, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ok: false, error: "Missing body" }) };
        if (!body.name)
          return { status: 400, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ok: false, error: "Missing name" }) };
        if (!handlers.has(body.name))
          return { status: 404, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ok: false, error: "Unable to find handler" }) };
        try {
          let result = await handlers.get(body.name)(body.data);
          return { status: 200, body: JSON.stringify({ ok: true, data: result }), headers: { "Content-Type": "application/json" } };
        } catch (e) {
          logger_default.error(e);
          return { status: 500, body: JSON.stringify({ ok: false, error: e.message }), headers: { "Content-Type": "application/json" } };
        }
      } else {
        return { status: 405 };
      }
    } else if (url == "/ping") {
      return { status: 200, body: JSON.stringify({ ok: true, data: "pong" }), headers: { "Content-Type": "application/json" } };
    }
  });
  function set2(reqName, callback) {
    if (typeof reqName != "string")
      throw new Error("RequestName needs to be a string.");
    if (typeof callback != "function")
      throw new Error("Callback needs to be a function.");
    if (handlers.has(reqName))
      throw new Error("RequestName already in use.");
    handlers.set(reqName, callback);
    return () => {
      handlers.delete(reqName);
    };
  }
  function trigger(reqName, ...args) {
    if (!socketEvents.has(reqName))
      throw new Error("Unable to find handler!");
    return socketEvents.get(reqName)(...args);
  }
  var http_default = {
    set: set2,
    trigger,
    get port() {
      return window["<<PRELOAD_KEY>>"].http.getPort();
    }
  };

  // src/api/ui/styles.scss
  var styles_default = `
.acord--layer-container{--top-offset: 0px;width:100vw;height:calc(100vh - var(--top-offset));z-index:9999999;pointer-events:none;position:absolute;top:var(--top-offset);left:0px}.acord--layer-container *{z-index:99999999999999}.acord--tooltip-layer{opacity:0;transition:50ms linear opacity,50ms linear transform;position:absolute;pointer-events:none;transform:scale(0.95)}.acord--tooltip-layer.visible{transform:scale(1);opacity:1;pointer-events:all}.acord--toasts-container{display:flex;align-items:center;justify-content:flex-end;flex-direction:column;width:100vw;height:calc(100vh - var(--top-offset));position:absolute;top:0;left:0;pointer-events:none;padding-bottom:32px}.acord--toasts-container .acord--toast{transition:transform 250ms ease-in-out,opacity 250ms ease-in-out;display:flex;align-items:center;pointer-events:none;border-radius:4px;padding:8px;box-shadow:0px 2px 8px rgba(0,0,0,.25);opacity:1;gap:8px;font-size:14px;margin:4px}.acord--toasts-container .acord--toast svg{width:16px;height:16px}.acord--toasts-container .acord--toast.clickable{cursor:pointer;pointer-events:all}.acord--toasts-container .acord--toast.closing{opacity:0;transform:translate(0, -50px)}.acord--toasts-container .acord--toast.hidden{opacity:0;transform:translate(0, 50px)}.acord--toasts-container .acord--toast.style-info{background-color:#4a8fe1;color:#f5f5f5}.acord--toasts-container .acord--toast.style-warning{background-color:#faa81a;color:#000}.acord--toasts-container .acord--toast.style-error{background-color:#ed4245;color:#000}.acord--toasts-container .acord--toast.style-success{background-color:#3ba55d;color:#f5f5f5}.acord--toasts-container .acord--toast.style-default{background-color:#000;color:#f5f5f5}.acord--notification-layer{width:100vw;height:calc(100vh - var(--top-offset));display:flex;position:absolute;top:0;left:0;pointer-events:none;flex-direction:column}.acord--notification-layer .acord--notification{display:flex;flex-direction:column;pointer-events:all;transition:transform 250ms ease-in-out,opacity 250ms ease-in-out;margin:4px;backdrop-filter:blur(16px) brightness(0.75);-webkit-app-region:no-drag;--animation-size: 50px;max-width:350px}.acord--notification-layer .acord--notification.hidden,.acord--notification-layer .acord--notification.closing{opacity:0}.acord--notification-layer .acord--notification>.container{display:flex;align-items:center;justify-content:space-between;padding:8px;color:#fff;min-width:250px}.acord--notification-layer .acord--notification>.container>.close{width:24px;height:24px;color:#fff;opacity:.5;cursor:pointer;margin-left:8px;z-index:999999999}.acord--notification-layer .acord--notification>.container>.close.hidden{display:none}.acord--notification-layer .acord--notification>.progress-container{width:100%;height:5px}.acord--notification-layer .acord--notification>.progress-container>.progress{width:0%;height:5px;transition:width var(--duration) linear;background-color:var(--bar-color)}.acord--notification-layer .acord--notification>.progress-container>.progress.progressing{width:100%}.acord--notification-layer .acord--notification.style-info{--bar-color: #4a8fe1}.acord--notification-layer .acord--notification.style-warning{--bar-color: #faa81a}.acord--notification-layer .acord--notification.style-error{--bar-color: #ed4245}.acord--notification-layer .acord--notification.style-success{--bar-color: #3ba55d}.acord--notification-layer .acord--notification.style-default{--bar-color: whitesmoke}.acord--notification-layer.top-right{justify-content:flex-start;align-items:flex-end}.acord--notification-layer.top-right .acord--notification.hidden{transform:translate(0, calc(var(--animation-size) * -1))}.acord--notification-layer.top-right .acord--notification.closing{transform:translate(0, var(--animation-size))}.acord--notification-layer.top-left{justify-content:flex-end;align-items:flex-start}.acord--notification-layer.top-left .acord--notification.hidden{transform:translate(0, calc(var(--animation-size) * -1))}.acord--notification-layer.top-left .acord--notification.closing{transform:translate(0, var(--animation-size))}.acord--notification-layer.bottom-right{justify-content:flex-start;align-items:flex-end}.acord--notification-layer.bottom-right .acord--notification.hidden{transform:translate(0, var(--animation-size))}.acord--notification-layer.bottom-right .acord--notification.closing{transform:translate(0, calc(var(--animation-size) * -1))}.acord--notification-layer.bottom-left{justify-content:flex-start;align-items:flex-start}.acord--notification-layer.bottom-left .acord--notification.hidden{transform:translate(0, var(--animation-size))}.acord--notification-layer.bottom-left .acord--notification.closing{transform:translate(0, calc(var(--animation-size) * -1))}.acord--modal-layer{display:flex;align-items:center;justify-content:center}.acord--modal-layer .acord--backdrop{background-color:rgba(0,0,0,.5);position:absolute;top:0;left:0;width:100vw;height:100vh;z-index:1002;pointer-events:none;transition:opacity 200ms ease-in-out}.acord--modal-layer .acord--backdrop.hidden{opacity:0;pointer-events:none}.acord--modal-layer .acord--inner-layer{position:absolute;top:0;left:0;width:100vw;height:100vh;z-index:1003;pointer-events:all;opacity:1;transition:opacity 50ms ease-in-out}.acord--modal-layer .acord--inner-layer.hidden{opacity:0;pointer-events:none}.acord--modal-layer .acord--modal-root{position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);z-index:1004;pointer-events:all;transition:opacity 200ms ease-in-out,transform 200ms cubic-bezier(0.175, 0.885, 0.32, 1.275);opacity:1;transform:scale(1)}.acord--modal-layer .acord--modal-root.hidden{transform:scale(0.8);opacity:0;pointer-events:none}`;

  // src/api/ui/tooltips.js
  var tooltipClasses = webpack_default.findByProperties("tooltipContentAllowOverflow", "tooltip");
  var tooltipPositions = {
    top: tooltipClasses.tooltipTop,
    bottom: tooltipClasses.tooltipBottom,
    left: tooltipClasses.tooltipLeft,
    right: tooltipClasses.tooltipRight
  };
  var tooltips = /* @__PURE__ */ new Set();
  function removeUnusedTooltips() {
    tooltips.forEach((t) => {
      if (!t.target.isConnected && !t.target.hasAttribute("acord--tooltip-ignore-destroy")) {
        t.destroy();
      }
    });
  }
  events_default.on("DocumentTitleChange", () => {
    setTimeout(removeUnusedTooltips, 1e3);
    removeUnusedTooltips();
  });
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
      this.destroyCallbacks = [];
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
        this.destroyCallbacks.forEach((cb) => cb());
        this.target.removeEventListener("mouseenter", onMouseEnter);
        this.target.removeEventListener("mouseleave", onMouseLeave);
        this.hide();
        tooltips.delete(this);
        unPatchObserver();
      };
      this.target.tooltip = this;
      tooltips.add(this);
    }
    onDestroy(callback) {
      this.destroyCallbacks.push(callback);
    }
    get content() {
      return this.contentElement.firstElementChild;
    }
    set content(value) {
      if (typeof value === "string") {
        this.contentElement.innerHTML = value;
      } else {
        this.contentElement?.replaceChildren?.(value);
      }
      this.fixPosition();
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
      this.fixPosition();
      this.layerElement.classList.add("visible");
    }
    fixPosition() {
      try {
        if (!this.position || this.position === "auto") {
          this.calculatePosition(
            this.canShowAtTop ? "top" : this.canShowAtBottom ? "bottom" : this.canShowAtLeft ? "left" : this.canShowAtRight ? "right" : "top"
          );
        } else {
          this.calculatePosition(this.position);
        }
      } catch {
      }
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
        if (!elm.hasAttribute("acord--tooltip-ignore-destroy")) {
          tooltip.destroy();
        }
      };
    }
  );
  var tooltips_default = { create };

  // src/api/ui/messageButtons.js
  var keyEventListeners = /* @__PURE__ */ new Set();
  window.addEventListener("keydown", (e) => {
    keyEventListeners.forEach((listener) => listener(e));
  });
  window.addEventListener("keyup", (e) => {
    keyEventListeners.forEach((listener) => listener(e));
  });
  var patches = /* @__PURE__ */ new Set();
  dom_default.patch(
    ".buttons-3dF5Kd > .wrapper-2vIMkT",
    (elm) => {
      let unPatches = [];
      patches.forEach((patch) => {
        unPatches.push(patch(elm));
      });
      return () => {
        unPatches.forEach((unPatch2) => unPatch2());
      };
    }
  );
  var out2 = {
    __cache__: {
      get patches() {
        return patches;
      }
    },
    patch(obj = { icon: "", tooltip: "", hiddenByDefault: false, position: "start", action: () => {
    } }) {
      if (!obj.icon)
        throw new Error("No icon provided");
      if (!obj.tooltip)
        throw new Error("No tooltip provided");
      if (!obj.action)
        throw new Error("No action provided");
      if (obj.position !== "start" && obj.position !== "end")
        throw new Error("Invalid position provided (must be start or end)");
      if (typeof obj.hiddenByDefault !== "boolean")
        obj.hiddenByDefault = false;
      const func = (elm) => {
        let buttonElm = dom_default.parse(`<div class="button-3bklZh" role="button"></div>`);
        let tooltip = tooltips_default.create(buttonElm, obj.tooltip);
        let iconElm = dom_default.parse(obj.icon);
        iconElm.classList.add("icon-tZV_7s");
        buttonElm.appendChild(iconElm);
        elm.setAttribute("width", "18");
        elm.setAttribute("height", "18");
        [...elm.children].forEach((child, childIndex) => {
          child.setAttribute("tabindex", childIndex);
        });
        function onKeyEvent(e) {
          if (e.key === "Shift") {
            buttonElm.style.display = e.type === "keyup" ? "none" : "";
          }
        }
        buttonElm.onclick = obj.action;
        if (obj.hiddenByDefault) {
          keyEventListeners.add(onKeyEvent);
          buttonElm.style.display = "none";
        }
        if (obj.position === "start") {
          elm.prepend(buttonElm);
        } else if (obj.position === "end") {
          elm.appendChild(buttonElm);
        }
        return () => {
          if (obj.hiddenByDefault)
            keyEventListeners.delete(onKeyEvent);
          buttonElm.remove();
          tooltip.destroy();
        };
      };
      patches.add(func);
      return () => {
        patches.delete(func);
      };
    }
  };
  var messageButtons_default = out2;

  // src/api/ui/notifications.js
  var validPositions = [
    "top-right",
    "top-left",
    "bottom-right",
    "bottom-left"
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
  var { React: React2 } = common_default2;
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
      const out7 = finderMap(ogModule, {
        close: ["CONTEXT_MENU_CLOSE"],
        open: ["renderLazy"]
      });
      isReady = !!out7.close && !!out7.open;
      return out7;
    })();
    Components = await (async () => {
      const out7 = {};
      const componentTypes = [
        "Separator",
        "CheckboxItem",
        "RadioItem",
        "ControlItem",
        "Group",
        "Item"
      ];
      try {
        let moduleId;
        while (true) {
          moduleId = Object.entries(webpack_default.require.m).find(([, m]) => m?.toString().includes("menuitemcheckbox"))[0];
          if (moduleId)
            break;
          await new Promise((r) => setTimeout(r, 100));
        }
        const contextMenuModule = webpack_default.find((_2, idx) => idx == moduleId).exports;
        out7.Menu = contextMenuModule.Menu;
        componentTypes.forEach((value) => {
          out7[value] = contextMenuModule[`Menu${value}`];
        });
        isReady = Object.keys(out7).length > 1;
      } catch (err) {
        isReady = false;
        logger_default.error("Failed to load context menu components", err);
      }
      return out7;
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
      return React2.createElement(Components.Separator);
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
      const [active, doToggle] = React2.useState(props.checked || false);
      const originalAction = props.action;
      props.checked = active;
      props.action = function(ev) {
        originalAction(ev);
        doToggle(!active);
      };
    }
    return React2.createElement(component, props);
  }
  function buildMenuChildren(setup) {
    const mapper = (s) => {
      if (s.type === "group")
        return buildGroup(s);
      return buildItem(s);
    };
    const buildGroup = function(group) {
      const items = group.items.map(mapper).filter((i) => i);
      return React2.createElement(Components.Group, null, items);
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
      return Actions.open(event, (e) => React2.createElement(component, Object.assign({}, e, { onClose: Actions.close })), config);
    },
    close() {
      return Actions.close();
    },
    build: {
      item(setup) {
        return buildMenuChildren([setup]);
      },
      menu(setup) {
        return (props) => React2.createElement(Components.Menu, props, buildMenuChildren(setup));
      }
    }
  };

  // src/lib/components/ErrorBoundary.jsx
  var { React: React3 } = common_default2;
  var ErrorBoundary = class extends React3.Component {
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
        return /* @__PURE__ */ React3.createElement("div", { className: "acord--react-error" }, /* @__PURE__ */ React3.createElement("p", null, "Unexpected React Error Happened."), /* @__PURE__ */ React3.createElement("p", null, `${this.state.error}`));
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

  // src/api/ui/modals/show.js
  function getContainer2() {
    const appElm = document.querySelector('[class*="notAppAsidePanel-"]');
    let topContainer = appElm.querySelector(".acord--modal-layer");
    if (!topContainer) {
      topContainer = dom_default.parse(`<div class="acord--layer-container acord--modal-layer"></div>`);
      appElm.appendChild(topContainer);
    }
    return topContainer;
  }
  var modals = /* @__PURE__ */ new Set();
  function show3(content) {
    let layerContainer = getContainer2();
    let layerElement = dom_default.parse(`<div class="acord--inner-layer"></div>`);
    let closed = false;
    let onCloseCbs = [];
    async function close() {
      if (closed)
        return;
      closed = true;
      requestAnimationFrame(() => {
        content.classList.add("hidden");
        setTimeout(() => layerElement.remove?.(), 200);
        if (!document.querySelector(".acord--modal-root:not(.hidden)")) {
          utils_default.ifExists(
            layerContainer.querySelector(`.acord--backdrop`),
            (el) => {
              el.classList.add("hidden");
              setTimeout(() => el.remove(), 200);
            }
          );
        }
        onCloseCbs.forEach((f) => f());
      });
      modals.delete(layerElement);
      setTimeout(() => {
        if (modals.size)
          [...modals.values()].at(-1)?.classList.remove("hidden");
      }, 200);
    }
    layerElement.addEventListener("click", (e) => {
      if (!e.target.classList.contains("acord--inner-layer"))
        return;
      close();
    });
    content = typeof content == "function" ? content({
      close,
      onClose(cb) {
        onCloseCbs.push(cb);
      }
    }) : content;
    content = typeof content == "string" ? dom_default.parse(content) : content;
    content.classList.add("acord--modal-root", "hidden");
    layerElement.replaceChildren(content);
    layerContainer.appendChild(layerElement);
    if (!layerContainer.querySelector(`.acord--backdrop`)) {
      let backdropElement = dom_default.parse(`<div class="acord--backdrop hidden"></div>`);
      layerContainer.prepend(backdropElement);
      requestAnimationFrame(() => backdropElement.classList.remove("hidden"));
    }
    requestAnimationFrame(() => {
      content.classList.remove("hidden");
    });
    modals.forEach((elm) => {
      elm.classList.add("hidden");
    });
    modals.add(layerElement);
    return {
      close,
      onClose(cb) {
        onCloseCbs.push(cb);
      }
    };
  }

  // src/api/ui/modals/index.jsx
  var { React: React4, FluxDispatcher, components, modals: modals2, UserStore } = common_default2;
  var modals_default = {
    show: Object.assign(show3, {
      confirmation(title, content, { confirm = null, cancel = null, danger = false, key = void 0, timeout = 6e4 * 5 } = {}) {
        return new Promise((resolve) => {
          if (!Array.isArray(content))
            content = [content];
          content = content.map((i) => typeof i === "string" ? React4.createElement(components.Markdown, null, i) : i);
          const modalKey = modals2.actions.open((props) => {
            let interacted2 = false;
            return /* @__PURE__ */ React4.createElement(ErrorBoundary, { onError: () => {
              resolve(false);
            } }, /* @__PURE__ */ React4.createElement(
              components.ConfirmationModal,
              {
                header: title,
                confirmButtonColor: danger ? components.Button.Colors.RED : components.Button.Colors.BRAND,
                confirmText: confirm || i18n_default.format("CONFIRM"),
                cancelText: cancel,
                onCancel: () => {
                  resolve(false);
                  modals2.actions.close(modalKey);
                  interacted2 = true;
                },
                onConfirm: () => {
                  resolve(true);
                  modals2.actions.close(modalKey);
                  interacted2 = true;
                },
                ...props,
                onClose: () => {
                  props.onClose();
                  resolve(false);
                  modals2.actions.close(modalKey);
                }
              },
              /* @__PURE__ */ React4.createElement(ErrorBoundary, { onError: () => {
                resolve(false);
              } }, content)
            ));
          }, { modalKey: key });
          if (timeout) {
            setTimeout(() => {
              if (!interacted) {
                resolve(false);
                modals2.actions.close(modalKey);
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
    }),
    close(key) {
      return modals2.actions.close(key);
    }
  };

  // src/api/ui/toasts.js
  function getContainer3() {
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
  function show4(content, {
    style = "default",
    timeout = 3500,
    onClick = null,
    hideIcon = false
  } = {}) {
    const container = getContainer3();
    const toastElm = dom_default.parse(`
    <div class="acord--toast style-${style} hidden">
      ${hideIcon ? "" : icons[style] || ""}
      <div class="content"></div>
    </div>
  `);
    let contentElm = toastElm.querySelector(".content");
    if (typeof content == "string") {
      contentElm.innerHTML = content;
    } else {
      contentElm.appendChild(content);
    }
    let closed = false;
    function close() {
      if (closed)
        return;
      closed = true;
      toastElm.classList.add("closing");
      setTimeout(() => {
        toastElm.remove();
        utils_default.ifExists(
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
    show: Object.assign(show4, {
      info: (html, obj = {}) => show4(html, { ...obj, style: "info" }),
      error: (html, obj = {}) => show4(html, { ...obj, style: "error" }),
      warning: (html, obj = {}) => show4(html, { ...obj, style: "warning" }),
      success: (html, obj = {}) => show4(html, { ...obj, style: "success" })
    })
  };

  // src/api/ui/vue/components/discord-button/style.scss
  var style_default2 = `
.acord--discord-button{position:relative;display:flex;justify-content:center;align-items:center;box-sizing:border-box;background:none;border:none;border-radius:3px;font-size:14px;font-weight:500;line-height:16px;padding:2px 16px;user-select:none;transition:background-color .17s ease,color .17s ease;cursor:pointer}.acord--discord-button:disabled,.acord--discord-button[aria-disabled=true],.acord--discord-button.disabled{cursor:not-allowed;opacity:.5}.acord--discord-button .acord--discord-button-contents{--button--underline-color: transparent;background-image:linear-gradient(0deg, transparent, transparent 1px, var(--button--underline-color) 0, var(--button--underline-color) 2px, transparent 0)}.acord--discord-button-lookFilled.colorBrand{color:var(--white-500);background-color:var(--brand-experiment)}.acord--discord-button-lookFilled.colorBrand:hover{background-color:var(--brand-experiment-560)}.acord--discord-button-lookFilled.colorBrand:active{background-color:var(--brand-experiment-600)}.acord--discord-button-lookFilled.colorBrand .spinnerItem-3Y5NsU{background-color:var(--white-500)}.acord--discord-button-lookFilled.colorBrand:disabled,.acord--discord-button-lookFilled.colorBrand[aria-disabled=true]{background-color:var(--brand-experiment)}.acord--discord-button-lookFilled.colorPrimary{color:var(--white-500);background-color:var(--button-secondary-background)}.acord--discord-button-lookFilled.colorPrimary:hover{background-color:var(--button-secondary-background-hover)}.acord--discord-button-lookFilled.colorPrimary:active{background-color:var(--button-secondary-background-active)}.acord--discord-button-lookFilled.colorPrimary .spinnerItem-3Y5NsU{background-color:var(--primary-100)}.acord--discord-button-lookFilled.colorPrimary:disabled,.acord--discord-button-lookFilled.colorPrimary[aria-disabled=true]{background-color:var(--button-secondary-background-disabled)}.acord--discord-button-lookFilled.colorGreen{color:var(--white-500);background-color:var(--button-positive-background)}.acord--discord-button-lookFilled.colorGreen:hover{background-color:var(--button-positive-background-hover)}.acord--discord-button-lookFilled.colorGreen:active{background-color:var(--button-positive-background-active)}.acord--discord-button-lookFilled.colorGreen .spinnerItem-3Y5NsU{background-color:var(--white-500)}.acord--discord-button-lookFilled.colorGreen:disabled,.acord--discord-button-lookFilled.colorGreen[aria-disabled=true]{background-color:var(--button-positive-background-disabled)}.acord--discord-button-lookFilled.colorRed{color:var(--white-500);background-color:var(--button-danger-background)}.acord--discord-button-lookFilled.colorRed:hover{background-color:var(--button-danger-background-hover)}.acord--discord-button-lookFilled.colorRed:active{background-color:var(--button-danger-background-active)}.acord--discord-button-lookFilled.colorRed .spinnerItem-3Y5NsU{background-color:var(--white-500)}.acord--discord-button-lookFilled.colorRed:disabled,.acord--discord-button-lookFilled.colorRed[aria-disabled=true]{background-color:var(--button-danger-background-disabled)}.acord--discord-button-lookFilled.colorBrandNew{color:var(--white-500);background-color:var(--brand-500)}.acord--discord-button-lookFilled.colorBrandNew:hover{background-color:var(--brand-560)}.acord--discord-button-lookFilled.colorBrandNew:active{background-color:var(--brand-600)}.acord--discord-button-lookFilled.colorBrandNew .spinnerItem-3Y5NsU{background-color:var(--white-500)}.acord--discord-button-lookFilled.colorBrandNew:disabled,.acord--discord-button-lookFilled.colorBrandNew[aria-disabled=true]{background-color:var(--brand-500)}.acord--discord-button-lookFilled.colorWhite{color:var(--primary-500);background-color:var(--white-500)}.acord--discord-button-lookFilled.colorWhite .spinnerItem-3Y5NsU{background-color:var(--primary-500)}.acord--discord-button-lookFilled.colorWhite:disabled,.acord--discord-button-lookFilled.colorWhite[aria-disabled=true]{background-color:var(--white-500)}.acord--discord-button-lookFilled.colorYellow{color:var(--white-500);background-color:var(--status-warning)}.acord--discord-button-lookFilled.colorYellow .spinnerItem-3Y5NsU{background-color:var(--white-500)}.acord--discord-button-lookFilled.colorYellow:disabled,.acord--discord-button-lookFilled.colorYellow[aria-disabled=true]{background-color:var(--status-warning)}.acord--discord-button-grow{width:auto}.acord--discord-button .acord--discord-button-contents{--button--underline-color: transparent;background-image:linear-gradient(0deg, transparent, transparent 1px, var(--button--underline-color) 0, var(--button--underline-color) 2px, transparent 0)}.acord--discord-button.sizeTiny{width:52px;height:24px;min-width:52px;min-height:24px}.acord--discord-button.sizeSmall{width:60px;height:32px;min-width:60px;min-height:32px}.acord--discord-button.sizeMedium{width:96px;height:38px;min-width:96px;min-height:38px}.acord--discord-button.sizeLarge{width:130px;height:44px;min-width:130px;min-height:44px}.acord--discord-button.sizeXlarge{width:148px;height:50px;min-width:148px;min-height:50px;font-size:16px;line-height:normal;padding:2px 20px}.acord--discord-button.sizeMin{display:inline;width:auto;height:auto;padding:2px 4px}.acord--discord-button.sizeMax{width:100%;height:100%;min-width:100%;min-height:100%;font-size:16px}`;

  // src/api/ui/vue/components/discord-button/index.js
  patcher_default.injectCSS(style_default2);
  var discord_button_default = {
    /** @param {import("vue").App} vueApp */
    load(vueApp) {
      vueApp.component("discord-button", {
        template: `
        <div class="acord--discord-button acord--discord-button-lookFilled acord--discord-button-grow" :class="\`\${color ? \`color\${color[0].toUpperCase()}\${color.slice(1).toLowerCase()}\` : 'colorBrand'} \${size ? \`size\${size[0].toUpperCase()}\${size.slice(1).toLowerCase()}\` : 'sizeMedium'} \${disabled ? "disabled" : ""}\`" @click="onClick">
          <div class="acord--discord-button-contents">{{value}}</div>
        </div>
      `,
        props: ["value", "size", "color", "disabled"],
        emits: ["click"],
        methods: {
          onClick(e) {
            if (this.disabled)
              return;
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
            <input :type="type ?? 'text'" class="acord--discord-inputDefault acord--discord-input-inner" :value="modelValue" :placeholder="placeholder ?? ''" :maxlength="maxlength" :min="min" :step="step" :max="max" :style="style" @input="onInput" @keyup="$emit('keyup', $event)" />
          </div>
        </div>
      `,
        props: ["modelValue", "placeholder", "type", "maxlength", "max", "min", "step", "style"],
        emits: ["input", "update:modelValue", "keyup"],
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
        <div :class="\`acord--discord-select acord--discord-select-lookFilled acord--discord-select \${id} \${active ? 'acord--discord-select-open' : ''} \`">
          <div :class="\`acord--discord-select-value \${id}\`">{{options.find(i=>i.value === modelValue)?.label}}</div>
          <div :class="\`acord--discord-select-icons \${id}\`">
              <svg v-if="!active" :class="\`icon \${id}\`" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M16.59 8.59003L12 13.17L7.41 8.59003L6 10L12 16L18 10L16.59 8.59003Z"></path></svg>
              <svg v-else :class="\`icon \${id}\`" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M7.41 16.0001L12 11.4201L16.59 16.0001L18 14.5901L12 8.59006L6 14.5901L7.41 16.0001Z"></path></svg>
          </div>
          <div v-if="active" :class="\`options acord--discord-select-popout acord--discord-select-scrollerBase acord--discord-select-scrollThin \${id} \${popoutPosition === 'top' ? 'top-popout' : ''}\`">
            <div v-for="option in options" :class="\`option acord--discord-select-option \${id}\`" @click="onOptionClick($event, option)" :key="option.value" :aria-selected="\`\${modelValue === option.value}\`">
              {{option.label}}
              <svg v-if="modelValue === option.value" :class="\`acord--discord-select-selectedIcon \${id}\`" role="img" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle r="8" cx="12" cy="12" fill="white"></circle><g fill="none" fill-rule="evenodd"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></g></svg>
            </div>
          </div>
        </div>
      `,
        data() {
          return {
            active: false,
            id: `acord--select--${Math.random().toString(36).slice(2, 9)}`
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
            if (e.target.classList.contains(this.id)) {
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
          <textarea class="acord--discord-textarea-inputDefault acord--discord-textarea-input acord--discord-textarea-textArea acord--discord-textarea-scrollbarDefault acord--discord-textarea-scrollbar" :value="modelValue" :placeholder="placeholder ?? ''" :maxlength="maxlength" :cols="cols" :rows="rows" :style="style" @input="onInput"></textarea>
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
    const reactive2 = Vue.reactive({
      backdoor: 0
    });
    return function() {
      if (!this.$__recomputables) {
        this.$__recomputables = {};
      }
      if (!this.$__recomputables[fn.name || name2]) {
        this.$__recomputables[fn.name || name2] = reactive2;
      }
      reactive2.backdoor;
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
    messageButtons: messageButtons_default,
    notifications: notifications_default,
    contextMenus: contextMenus_default,
    components: components_default,
    tooltips: tooltips_default,
    modals: modals_default,
    toasts: toasts_default,
    vue: vue_default
  };

  // src/api/actionHandlers/index.js
  var out3 = {
    __cache__: {
      initialized: false,
      /** @type {Map<string,Map<string, Set<{ actionHandler: Function, storeDidChange: Function }>>>} */
      patches: /* @__PURE__ */ new Map()
    },
    init() {
      if (out3.__cache__.initialized)
        return;
      out3.__cache__.initialized = true;
      patcher_default.instead(
        "_computeOrderedActionHandlers",
        common_default2.FluxDispatcher._actionHandlers,
        function([actionName]) {
          let orderedCallbackTokens = this._orderedCallbackTokens || this._computeOrderedCallbackTokens();
          let actionHandlers = [];
          for (let i = 0; i < orderedCallbackTokens.length; i++) {
            let nodeData = this._dependencyGraph.getNodeData(orderedCallbackTokens[i]);
            let storeName = nodeData.name;
            let store = nodeData.actionHandler;
            let actionHandler = store[actionName];
            if (actionHandler) {
              actionHandlers.push({
                name: storeName,
                actionHandler(e) {
                  let actionPatches = out3.__cache__.patches.get(actionName)?.get(storeName);
                  if (e.__original__ || !actionPatches?.size)
                    return actionHandler.call(this, e);
                  let eventObj = {
                    event: e,
                    canceled: false,
                    cancel() {
                      this.canceled = true;
                    }
                  };
                  actionPatches.forEach((patch) => {
                    if (!patch.actionHandler)
                      return;
                    patch.actionHandler.call(this, eventObj);
                  });
                  if (eventObj.canceled)
                    return;
                  actionHandler.call(this, e);
                },
                storeDidChange(e) {
                  let actionPatches = out3.__cache__.patches.get(actionName)?.get(storeName);
                  if (e.__original__ || !actionPatches?.size)
                    return nodeData.storeDidChange.call(this, e);
                  let eventObj = {
                    event: e,
                    canceled: false,
                    cancel() {
                      this.canceled = true;
                    }
                  };
                  actionPatches.forEach((patch) => {
                    if (!patch.storeDidChange)
                      return;
                    patch.storeDidChange.call(this, eventObj);
                  });
                  if (eventObj.canceled)
                    return;
                  nodeData.storeDidChange.call(this, e);
                }
              });
            }
          }
          this._orderedActionHandlers[actionName] = actionHandlers;
          return actionHandlers;
        }
      );
    },
    patch(actionName, storeName, { actionHandler = () => {
    }, storeDidChange = () => {
    } } = {}) {
      let obj = {
        actionHandler,
        storeDidChange
      };
      if (!out3.__cache__.patches.has(actionName))
        out3.__cache__.patches.set(actionName, /* @__PURE__ */ new Map());
      let map = out3.__cache__.patches.get(actionName);
      if (!map.has(storeName))
        map.set(storeName, /* @__PURE__ */ new Set());
      let set3 = map.get(storeName);
      set3.add(obj);
      common_default2.FluxDispatcher._actionHandlers._computeOrderedActionHandlers(actionName);
      return () => {
        set3.delete(obj);
        common_default2.FluxDispatcher._actionHandlers._computeOrderedActionHandlers(actionName);
      };
    }
  };
  var actionHandlers_default = out3;

  // src/api/shared/index.js
  var shared = {};
  var shared_default = shared;

  // src/api/extensions/ui/style.scss
  var style_default7 = `
.acord--modal-root{display:flex;flex-direction:column}.acord--modal-root .acord--modal-header{display:flex;align-items:center;justify-content:space-between;padding:16px}.acord--modal-root .acord--modal-header .title{font-size:28px;font-weight:600;color:#efefef}.acord--modal-root .acord--modal-header .close{width:24px;height:24px;cursor:pointer}.acord--modal-root .acord--modal-header .close svg{width:24px;height:24px}.acord--modal-root .acord--modal-content{padding:16px;padding-top:0px;display:flex;flex-direction:column;height:100%;min-height:450px;gap:8px}`;

  // src/api/extensions/ui/confirmation-modal.jsx
  patcher_default.injectCSS(style_default7);

  // src/api/extensions/index.js
  var initialized3 = false;
  async function buildPluginAPI(manifest, persistKey) {
    const devMode = manifest?.mode === "development";
    const persist = await storage_default.createPersistNest(persistKey);
    const out7 = {
      modules: {
        __cache__: {
          common: {},
          node: {},
          custom: {},
          customLazy: {}
        },
        require(name2) {
          if (!devMode) {
            if (typeof out7.modules.__cache__.node[name2] !== "undefined")
              return out7.modules.__cache__.node[name2];
            if (manifest?.api?.modules?.node?.some?.((i) => i.name === name2))
              return out7.modules.__cache__.node[name2] = modules_default.require(name2);
          } else {
            return modules_default.require(name2);
          }
          return null;
        },
        common: new Proxy({}, {
          get(_2, prop) {
            if (!devMode) {
              if (typeof out7.modules.__cache__.common[prop] !== "undefined")
                return out7.modules.__cache__.common[prop];
              if (manifest?.api?.modules?.common?.some?.((i) => i.name === prop))
                return out7.modules.__cache__.common[prop] = modules_default.common[prop];
            } else {
              return modules_default.common[prop];
            }
            return null;
          }
        }),
        custom: new Proxy({}, {
          get(_2, prop) {
            if (typeof out7.modules.__cache__.custom[prop] !== "undefined")
              return out7.modules.__cache__.custom[prop];
            let data = manifest?.api?.modules?.custom?.find?.((i) => i.name === prop);
            if (!data?.finder)
              return null;
            if (data.lazy) {
              let prom = new Promise(async (resolve, reject) => {
                let r = await modules_default.webpack.lazyFindByFinder(data.finder);
                out7.modules.__cache__.customLazy[prop] = r;
                resolve(r);
              });
              out7.modules.__cache__.custom[prop] = {
                get() {
                  return prom;
                },
                get value() {
                  return out7.modules.__cache__.customLazy[prop];
                }
              };
            } else {
              let value = modules_default.webpack.findByFinder(data.finder);
              try {
                if (typeof value?.value !== "undefined") {
                  out7.modules.__cache__.custom[prop] = value ? Object.assign(value, { value, get() {
                    return value;
                  } }) : null;
                } else {
                  out7.modules.__cache__.custom[prop] = value;
                }
              } catch {
                out7.modules.__cache__.custom[prop] = value ? { value, get() {
                  return value;
                } } : null;
              }
            }
            return out7.modules.__cache__.custom[prop];
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
      get authentication() {
        if (manifest?.api?.authentication || devMode)
          return authentication_default;
        return null;
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
      get http() {
        if (manifest?.api?.http || devMode)
          return http_default;
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
      },
      get actionHandlers() {
        if (manifest?.api?.actionHandlers || devMode)
          return actionHandlers_default;
        return null;
      }
    };
    return out7;
  }
  var out4 = {
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
      if (out4.__cache__.initialized)
        return;
      out4.__cache__.initialized = true;
      out4.storage.installed = await storage_default.createPersistNest("Extensions;Installed");
    },
    /**
     * @param {string} url 
     */
    async install(url, defaultConfig = {}) {
      if (!out4.__cache__.initialized)
        await out4.init();
      if (url.endsWith("/"))
        url = url.slice(0, -1);
      if (out4.storage.installed.ghost[url])
        throw new Error(`"${url}" extension is already installed.`);
      let metaResp = await fetch(`${url}/manifest.json`, { cache: "no-store" });
      if (metaResp.status !== 200)
        throw new Error(`"${url}" extension manifest is not responded with 200 status code.`);
      let manifest = await metaResp.json();
      let readmeResp = await fetch(`${url}/readme.md`, { cache: "no-store" });
      let readme = readmeResp.status === 200 ? await readmeResp.text() : null;
      let sourceResp = await fetch(`${url}/source.js`, { cache: "no-store" });
      if (sourceResp.status !== 200)
        throw new Error(`"${url}" extension source is not responded with 200 status code.`);
      let source2 = await sourceResp.text();
      out4.storage.installed.store[url] = {
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
      await out4.load(url);
    },
    async update(url) {
      if (!out4.__cache__.initialized)
        await out4.init();
      if (url.endsWith("/"))
        url = url.slice(0, -1);
      if (!out4.storage.installed.ghost[url])
        throw new Error(`"${url}" extension is not installed.`);
      let data = out4.storage.installed.ghost[url];
      let metaResp = await fetch(`${url}/manifest.json`, { cache: "no-store" });
      if (metaResp.status !== 200)
        throw new Error(`"${url}" extension manifest is not responded with 200 status code.`);
      let manifest = JSON.parse(await metaResp.text());
      if (data.manifest.hash === manifest.hash)
        return false;
      let readmeResp = await fetch(`${url}/readme.md`, { cache: "no-store" });
      let readme = readmeResp.status === 200 ? await readmeResp.text() : null;
      let sourceResp = await fetch(`${url}/source.js`, { cache: "no-store" });
      if (sourceResp.status !== 200)
        throw new Error(`"${url}" extension source is not responded with 200 status code.`);
      let source2 = await sourceResp.text();
      let loadedBefore = false;
      if (out4.__cache__.loaded.ghost[url]) {
        loadedBefore = true;
        await out4.unload(url);
      }
      out4.storage.installed.store[url] = {
        manifest,
        source: source2,
        readme,
        config: data.config,
        extra: {
          lastUpdatedAt: Date.now()
        }
      };
      console.log("Extension updated:", url, { loadedBefore });
      if (loadedBefore) {
        await new Promise((resolve) => setTimeout(resolve, 1));
        await out4.load(url);
      }
      return true;
    },
    async uninstall(url) {
      if (!out4.__cache__.initialized)
        await out4.init();
      if (url.endsWith("/"))
        url = url.slice(0, -1);
      if (!out4.storage.installed.ghost[url])
        throw new Error(`"${url}" extension is not installed.`);
      delete out4.storage.installed.store[url];
      try {
        await out4.unload(url);
      } catch (err) {
        logger_default.error(err);
      }
    },
    async load(url) {
      if (!out4.__cache__.initialized)
        await out4.init();
      if (url.endsWith("/"))
        url = url.slice(0, -1);
      if (!out4.storage.installed.ghost[url])
        throw new Error(`"${url}" extension is not installed.`);
      let data = out4.storage.installed.ghost[url];
      if (out4.__cache__.loaded.ghost[url])
        throw new Error(`"${url}" extension is already loaded.`);
      await out4.loader.load(url, data);
    },
    async unload(url) {
      if (!out4.__cache__.initialized)
        await out4.init();
      if (url.endsWith("/"))
        url = url.slice(0, -1);
      if (!out4.__cache__.loaded.ghost[url])
        throw new Error(`"${url}" extension is not loaded.`);
      await out4.loader.unload(url);
    },
    evaluate(source, api) {
      const $acord = api;
      return eval(source);
    },
    async loadAll() {
      if (!out4.__cache__.initialized)
        await out4.init();
      return Promise.all(Object.entries(out4.storage.installed.ghost).sort(([, a], [, b]) => b.config.order - a.config.order).map(async ([url, d]) => {
        if (d.config.autoUpdate)
          await out4.update(url);
        try {
          if (d.config.enabled)
            await out4.load(url);
        } catch (e) {
          logger_default.error("Unable to load extension", url, e);
        }
      }));
    },
    async unloadAll() {
      if (!out4.__cache__.initialized)
        await out4.init();
      return Promise.all(Object.keys(out4.__cache__.loaded.ghost).map((url) => out4.unload(url)));
    },
    get(url) {
      return {
        loaded: out4.__cache__.loaded.ghost[url],
        installed: out4.storage.installed.ghost[url]
      };
    },
    loader: {
      async load(id, data) {
        if (data.manifest.type === "plugin") {
          let onPersistUpdate = function(eventName, { path, value } = {}) {
            if (path[0] === "settings") {
              let item = findInTree(out4.__cache__.config[id], (i) => i.id === path[1]);
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
          out4.__cache__.config[id] = Vue.reactive(JSON.parse(JSON.stringify(data.manifest.config)));
          findInTree(out4.__cache__.config[id], (i) => i.id, { all: true }).forEach(
            (i) => {
              api2.extension.persist.store.settings[i.id] = api2.extension.persist.ghost?.settings?.[i.id] ?? i.default;
              i.value = api2.extension.persist.ghost?.settings?.[i.id];
            }
          );
          let evaluated = out4.evaluate(data.source, api2);
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
                return findInTree(out4.__cache__.config[id], (i) => i.id === itemId);
              },
              getItems() {
                return findInTree(out4.__cache__.config[id], (i) => i.id, { all: true });
              },
              save
            });
          });
          out4.__cache__.loaded.store[id] = { evaluated, api: api2, unload };
          events_default.emit("ExtensionLoaded", { id });
          return { evaluated, api: api2, unload };
        } else if (data.manifest.type === "theme") {
          let unload = function() {
            offConfigListener();
            injectedRes();
          };
          let evaluated = out4.evaluate(data.source, null);
          const persist = await storage_default.createPersistNest(`Extension;Persist;${id}`);
          if (persist.ghost.settings === void 0)
            persist.store.settings = {};
          out4.__cache__.config[id] = JSON.parse(JSON.stringify(data.manifest.config));
          findInTree(out4.__cache__.config[id], (i) => i.id, { all: true }).forEach(
            (i) => {
              persist.store.settings[i.id] = persist.ghost?.settings?.[i.id] ?? i.default;
              i.value = persist.ghost?.settings?.[i.id];
            }
          );
          let cssText = evaluated();
          let injectedRes = patcher_default.injectCSS(cssText, persist.ghost.settings);
          const debouncedThemeUpdate = _.debounce(() => {
            injectedRes(persist.ghost.settings);
          }, 500);
          const offConfigListener = events_default.on("ExtensionConfigInteraction", (data2) => {
            if (data2.extension !== id)
              return;
            if (!data2.item.id)
              return;
            persist.store.settings[data2.item.id] = data2.data.value;
            debouncedThemeUpdate();
          });
          out4.__cache__.loaded.store[id] = { evaluated, unload };
          events_default.emit("ExtensionLoaded", { id });
          return { evaluated, unload };
        }
      },
      unload(id) {
        out4.__cache__.loaded.ghost?.[id]?.unload?.();
        delete out4.__cache__.loaded.store[id];
        delete out4.__cache__.config[id];
        events_default.emit("ExtensionUnloaded", { id });
      }
    },
    _init() {
      if (initialized3)
        return;
      initialized3 = true;
      waitUntilConnectionOpen().then(async () => {
        await utils_default.sleep(100);
        out4.loadAll();
      });
    }
  };
  var extensions_default = out4;

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
        installed = {
          manifest
        };
        loaded = await extensions_default.loader.load("Development", { source: source2, manifest });
      } catch (err) {
        logger_default.error(`Unable to load development extension.`, i18n_default.localize(manifest.about.name), err);
        isLoading = false;
        return false;
      }
      isLoading = false;
      return true;
    }
  };
  var out5 = {
    get enabled() {
      return devModeEnabled;
    },
    set enabled(value) {
      if (!globalThis["<<PRELOAD_KEY>>"].isDevToolsOpen())
        throw new Error("Dev mode status can only be modified when DevTools is open!");
      devModeEnabled = value;
    },
    get extension() {
      if (!devModeEnabled)
        throw new Error("Dev mode is not enabled!");
      return extension;
    }
  };
  var dev_default = out5;
  var isProcessing = false;
  http_default.set(
    "UpdateDevelopmentExtension",
    async ({ source: source2, manifest } = {}) => {
      if (!devModeEnabled)
        return logger_default.warn(`Development extension was sent before dev mode was enabled.`);
      if (!source2 || !manifest)
        return logger_default.warn(`Development extension was sent without source or manifest.`);
      if (isProcessing)
        return logger_default.warn(`Development extension was sent while extension was already being processed.`);
      isProcessing = true;
      try {
        extension.unload();
      } catch (err) {
        logger_default.error(`Unable to unload development extension.`, i18n_default.localize(manifest.about.name), err);
      }
      await new Promise((r) => setTimeout(r, 1));
      try {
        let success = await extension.load(source2, manifest);
        if (success)
          logger_default.info(`Development extension is loaded! (${i18n_default.localize(manifest.about.name)})`);
      } catch (err) {
        logger_default.error(`Unable to load development extension.`, i18n_default.localize(manifest.about.name), err);
      }
      isProcessing = false;
    }
  );

  // src/api/internal/index.js
  var internal_default = {
    process: globalThis["<<PRELOAD_KEY>>"].process,
    isDevToolsOpen: globalThis["<<PRELOAD_KEY>>"].isDevToolsOpen,
    openExternal(url) {
      globalThis["<<PRELOAD_KEY>>"].ipcRenderer.send("OpenExternal", url);
    }
  };

  // src/api/hotkeys/index.js
  var keyObjMap = {
    "ctrl": { ctrlKey: true },
    "shift": { shiftKey: true },
    "alt": { altKey: true },
    "meta": { metaKey: true },
    "cmd": { metaKey: true },
    "win": { metaKey: true }
  };
  function parse(keyCombo) {
    keyCombo = keyCombo.toLowerCase();
    return keyCombo.split("+").map((key) => {
      return keyObjMap[key] || { key };
    }).reduce((all, curr) => {
      return Object.assign(all, curr);
    }, { ctrlKey: false, shiftKey: false, altKey: false, metaKey: false, key: "" });
  }
  function check2(keyCombo, e) {
    let keyObj = parse(keyCombo);
    e.key = e.key.toLowerCase();
    return Object.keys(keyObj).every((key) => {
      return e[key] === keyObj[key];
    });
  }
  function format(e) {
    let keyCombo = [];
    if (e.ctrlKey)
      keyCombo.push("ctrl");
    if (e.shiftKey)
      keyCombo.push("shift");
    if (e.altKey)
      keyCombo.push("alt");
    if (e.metaKey)
      keyCombo.push("meta");
    if (e.key)
      keyCombo.push(e.key.toLowerCase());
    return keyCombo.join("+");
  }
  var out6 = {
    __cache__: {
      /** @type {Map<string, Set<Function>>} */
      listeners: /* @__PURE__ */ new Map(),
      initialized: false
    },
    register(keyCombo, callback) {
      if (!out6.__cache__.listeners.has(keyCombo)) {
        out6.__cache__.listeners.set(keyCombo, /* @__PURE__ */ new Set());
      }
      let map = out6.__cache__.listeners.get(keyCombo);
      map.add(callback);
      return () => {
        map.delete(callback);
      };
    },
    init() {
      if (out6.__cache__.initialized)
        return;
      out6.__cache__.initialized = true;
      document.addEventListener("keydown", (e) => {
        out6.__cache__.listeners.forEach((callbacks, keyCombo) => {
          if (check2(keyCombo, e))
            callbacks.forEach((callback) => {
              callback(
                {
                  keyCombo,
                  key: e.key.toLowerCase(),
                  ctrlKey: e.ctrlKey,
                  shiftKey: e.shiftKey,
                  altKey: e.altKey,
                  metaKey: e.metaKey
                }
              );
            });
        });
      });
    },
    parse,
    check: check2,
    format
  };
  var hotkeys_default = out6;

  // src/api/index.js
  function devError(api2) {
    return new Error(`The ${api2} API can only be accessed when Dev mode is enabled!`);
  }
  var api_default = {
    exposedAPI: {
      dev: dev_default,
      get authentication() {
        if (!dev_default.enabled)
          throw devError("Authentication");
        return authentication_default;
      },
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
      get http() {
        if (!dev_default.enabled)
          throw devError("http");
        return http_default;
      },
      get hotkeys() {
        if (!dev_default.enabled)
          throw devError("Hotkeys");
        return hotkeys_default;
      },
      get actionHandlers() {
        if (!dev_default.enabled)
          throw devError("ActionHandlers");
        return actionHandlers_default;
      }
    },
    unexposedAPI: {
      dev: dev_default,
      authentication: authentication_default,
      modules: modules_default,
      utils: utils_default,
      extensions: extensions_default,
      i18n: i18n_default,
      storage: storage_default,
      events: events_default,
      patcher: patcher_default,
      internal: internal_default,
      http: http_default,
      shared: shared_default,
      ui: ui_default,
      dom: dom_default,
      hotkeys: hotkeys_default,
      actionHandlers: actionHandlers_default
    }
  };

  // src/other/current-user-change.js
  var lastUserId = common_default2?.UserStore?.getCurrentUser()?.id;
  setInterval(() => {
    let userId = common_default2?.UserStore?.getCurrentUser()?.id;
    if (!userId)
      return;
    if (userId !== lastUserId) {
      lastUserId = userId;
      events_default.emit("CurrentUserChange", { user: common_default2.UserStore.getCurrentUser() });
    }
  }, 1e3);

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

  // src/other/full-screen-update.js
  function onFullscreenChange(e) {
    if (e.windowId !== "window-1")
      return;
    if (e.isElementFullscreen)
      events_default.emit("MainWindowFullScreenEnter", e);
    else
      events_default.emit("MainWindowFullScreenExit", e);
  }
  common_default2.FluxDispatcher.subscribe("WINDOW_FULLSCREEN_CHANGE", onFullscreenChange);

  // src/other/locale-update.js
  var lastLocale = i18n_default.locale;
  setInterval(() => {
    if (i18n_default.locale !== lastLocale) {
      lastLocale = i18n_default.locale;
      events_default.emit("LocaleChange", { locale: lastLocale });
    }
  }, 1e3);

  // src/other/cosmetics-payment-ok.js
  http_default.set("CosmeticsPaymentOk", async () => {
    events_default.emit("CosmeticsPaymentOk");
    console.log("CosmeticsPaymentOk");
    return true;
  });

  // src/ui/home/style.scss
  var style_default8 = `
[class*=acord--]{box-sizing:border-box}[class*=acord--] *{box-sizing:border-box}@keyframes updateAnimation{0%{filter:brightness(1) drop-shadow(0px 0px 0px #5865f2)}50%{filter:brightness(1.1) drop-shadow(0px 0px 2px #5865f2)}100%{filter:brightness(1) drop-shadow(0px 0px 0px #5865f2)}}.acord--tabs-content-container{padding:32px 16px;display:flex;align-items:flex-start;justify-content:center;width:100%}.acord--tabs-content-container.no-padding{padding:0}.acord--tabs-content-container>.tab{width:100%}.acord--tabs-tab-button{cursor:pointer}.acord--tabs-tab-button.store-tab-button{background-color:var(--status-positive-background);color:var(--status-positive-text)}.acord--tabs-tab-button.store-tab-button:hover:not(.selected){background-color:var(--status-positive-background) !important;color:var(--status-positive-text) !important}.acord--tabs-tab-button.store-tab-button.selected{color:var(--text-positive);background-color:rgba(0,0,0,0)}.acord--tabs-tab-button.cosmetics-tab-button{background-image:linear-gradient(to right, #4900fa, #d100fc) !important;color:#f5f5f5}.acord--tabs-tab-button.cosmetics-tab-button.selected,.acord--tabs-tab-button.cosmetics-tab-button:hover{color:#f5f5f5;background-image:linear-gradient(to right, hsl(258deg, 100%, 60%), hsl(290deg, 100%, 60%)) !important}.acord--tabs-tab-button.disabled{pointer-events:none;opacity:.5}.acord--connected-status{width:9px;height:9px;border-radius:50%;margin-left:8px;background:#ed4245}.acord--connected-status.connected{background:#23a559}.acord--update-required{background-color:#5865f2;padding:4px 8px;border-radius:9999px;font-size:9px;font-weight:500;color:#fff;animation:updateAnimation 1s infinite normal;z-index:99;margin:4px}`;

  // src/ui/home/vue/components/pages/home-page/style.scss
  var style_default9 = `
.acord--home-page{display:flex;align-items:flex-start;justify-content:center;padding:0 16px;width:100%}.acord--home-page>.container{width:100%;max-width:1024px;display:flex;flex-direction:column;gap:16px}.acord--home-page>.container>.banner{width:100%;height:150px;background-image:url("https://raw.githubusercontent.com/acord-standalone/assets/main/logo/acord-full-name.png");background-size:contain;background-repeat:no-repeat;background-position:center}.acord--home-page>.container>.content{font-size:18px;width:100%;display:flex;align-items:center;justify-content:center}.acord--home-page>.container>.content .auth-card{border-radius:4px;padding:32px;display:flex;flex-direction:column;align-items:center;justify-content:center;contain:content;background-color:rgba(0,0,0,.2);box-shadow:var(--elevation-medium);gap:16px}.acord--home-page>.container>.content .auth-card .title{font-size:24px;font-weight:600;color:#f5f5f5}.acord--home-page>.container>.content .auth-card .input-container{display:flex;align-items:center;justify-content:center;gap:8px;width:100%}.acord--home-page>.container>.content .auth-card .input-container.disabled{opacity:.5;pointer-events:none}.acord--home-page>.container>.content .auth-card .input-container .action{display:flex;align-items:center;justify-content:center;color:#f5f5f5;height:42px;background:#1e1f22;width:42px;min-width:42px;border-radius:4px;cursor:pointer}.acord--home-page>.container>.content .auth-card .input-container .action.disabled{opacity:.5;pointer-events:none}`;

  // src/ui/home/vue/components/pages/home-page/index.js
  patcher_default.injectCSS(style_default9);
  var home_page_default = {
    /** @param {import("vue").App} vueApp */
    load(vueApp) {
      vueApp.component(
        "home-page",
        {
          template: `
          <div class="acord--home-page">
            <div class="container">
              <div class="banner" />
              <div class="content">
                <div class="auth-card">
                  <div class="title">
                    {{i18nFormat("ENTER_ACORD_TOKEN")}}
                  </div>
                  <div class="input-container" :class="{'disabled': authenticating}">
                    <discord-input v-model="acordToken" />
                    <div class="action" @click="authenticate" :class="{'disabled': !acordToken.trim() }" acord--tooltip-ignore-destroy :acord--tooltip-content="i18nFormat('AUTHENTICATION_CONNECT_ACCOUNT')">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path fill="currentColor" d="M12 2c5.523 0 10 4.477 10 10 0 2.136-.67 4.116-1.811 5.741L17 12h3a8 8 0 1 0-2.46 5.772l.998 1.795A9.961 9.961 0 0 1 12 22C6.477 22 2 17.523 2 12S6.477 2 12 2zm0 5a3 3 0 0 1 3 3v1h1v5H8v-5h1v-1a3 3 0 0 1 3-3zm2 6h-4v1h4v-1zm-2-4a1 1 0 0 0-.993.883L11 10v1h2v-1a1 1 0 0 0-.883-.993L12 9z"/>
                      </svg>
                    </div>
                    <div class="action" @click="open" acord--tooltip-ignore-destroy :acord--tooltip-content="i18nFormat('AUTHENTICATION_OPEN_CONNECT_LINK')">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path fill="currentColor" d="M10 6v2H5v11h11v-5h2v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6zm11-3v8h-2V6.413l-7.793 7.794-1.414-1.414L17.585 5H13V3h8z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `,
          data() {
            return {
              isConnected: false,
              acordToken: "",
              authenticating: false
            };
          },
          methods: {
            i18nFormat: i18n_default.format,
            open() {
              internal_default.openExternal("https://discord.com/oauth2/authorize?client_id=1083403277980409937&redirect_uri=https%3A%2F%2Fapi.acord.app%2Fstatic%2Fcallback%2Fstep1&response_type=token&scope=identify%20guilds.join");
            },
            async authenticate() {
              if (this.authenticating)
                return;
              this.authenticating = true;
              let res = await (await fetch(`https://api.acord.app/auth/exchange?acordToken=${this.acordToken}`)).json();
              if (!res?.data?.id) {
                ui_default.notifications.show.error(i18n_default.format("AUTHENTICATION_INVALID_TOKEN"));
                this.authenticating = false;
                this.acordToken = "";
                return;
              }
              let currentUserId = common_default2.UserStore.getCurrentUser().id;
              if (res?.data?.id !== currentUserId) {
                ui_default.notifications.show.error(i18n_default.format("AUTHENTICATION_USER_MISMATCH"));
                this.authenticating = false;
                this.acordToken = "";
                return;
              }
              const store = await authentication_default.when();
              store.store.acordTokens[currentUserId] = this.acordToken;
              ui_default.notifications.show.success(i18n_default.format("AUTHENTICATION_SUCCESS", common_default2.UserStore.getCurrentUser().tag));
              events_default.emit("AuthenticationSuccess", { userId: currentUserId, acordToken: this.acordToken });
              this.authenticating = false;
              this.acordToken = "";
              this.$forceUpdate();
            },
            onAuthenticationSuccess() {
              this.isConnected = !!storage_default.authentication.token;
              this.$forceUpdate();
            }
          },
          mounted() {
            this.onAuthenticationSuccess();
            storage_default.authentication.when().then(this.onAuthenticationSuccess);
            events_default.on("AuthenticationSuccess", this.onAuthenticationSuccess);
            events_default.on("CurrentUserChange", this.onAuthenticationSuccess);
          },
          unmounted() {
            events_default.off("AuthenticationSuccess", this.onAuthenticationSuccess);
            events_default.off("CurrentUserChange", this.onAuthenticationSuccess);
          }
        }
      );
    }
  };

  // src/ui/home/vue/components/pages/extensions-page/style.scss
  var style_default10 = `
.acord--extensions-page{display:flex;align-items:flex-start;justify-content:center;padding:0 16px}.acord--extensions-page .container{width:100%;max-width:1024px;display:flex;flex-direction:column}.acord--extensions-page .container>.top{display:flex;align-items:center;gap:8px}.acord--extensions-page .container>.top>.search{width:60%}.acord--extensions-page .container>.top>.category{width:20%}.acord--extensions-page .container>.top .install{width:20%}.acord--extensions-page .container>.bottom{display:flex;flex-direction:column;gap:16px;margin-top:16px}`;

  // src/ui/home/vue/components/pages/extensions-page/index.js
  patcher_default.injectCSS(style_default10);
  var extensions_page_default = {
    /** @param {import("vue").App} vueApp */
    load(vueApp) {
      vueApp.component(
        "extensions-page",
        {
          template: `
          <div class="acord--extensions-page">
            <div class="container">
              <div class="top">
                <div class="search">
                  <discord-input v-model="searchText" :placeholder="i18nFormat('SEARCH')" />
                </div>
                <div class="install" acord--tooltip-ignore-destroy :acord--tooltip-content="i18nFormat('IMPORT_EXTENSION')">
                  <discord-input v-model="installUrl" placeholder="https://.../dist" @keyup="onInstallKeyUp" />
                </div>
                <div class="category">
                  <discord-select v-model="searchCategoryText" :options="[{value: 'all', label: i18nFormat('ALL')}, {value: 'plugin', label: i18nFormat('PLUGINS')}, {value: 'theme', label: i18nFormat('THEMES')}]" />
                </div>
              </div>
              <div class="bottom">
                <installed-extension-card v-if="developmentExtension" :id="developmentExtension.id" :extension="developmentExtension.extension" :hide-controls="true" />
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
              developmentExtension: null,
              installUrl: "",
              filteredExtensions: {}
            };
          },
          methods: {
            onStorageUpdate() {
              this.extensions = extensions_default.storage.installed.ghost || {};
              this.updateFilteredExtensions();
            },
            i18nFormat: i18n_default.format,
            onExtensionLoaded({ id }) {
              if (id === "Development") {
                this.developmentExtension = {
                  extension: dev_default.extension.installed,
                  id: "Development"
                };
              }
              this.updateFilteredExtensions();
            },
            onExtensionUnloaded({ id }) {
              if (id === "Development") {
                this.developmentExtension = null;
              }
              this.updateFilteredExtensions();
            },
            async onInstallKeyUp(event) {
              if (event.key === "Enter") {
                let installUrl = this.installUrl;
                this.installUrl = "";
                ui_default.notifications.show(i18n_default.format("INSTALLING_EXTENSION", installUrl));
                try {
                  await extensions_default.install(installUrl);
                  ui_default.notifications.show.success(i18n_default.format("EXTENSION_INSTALLED", installUrl));
                } catch (err) {
                  ui_default.notifications.show.error(err.message);
                }
              }
            },
            updateFilteredExtensions() {
              const searchText = this.searchText.toLowerCase();
              const searchCategoryText = this.searchCategoryText;
              this.filteredExtensions = Object.fromEntries(
                Object.entries(this.extensions || {}).filter(([id, extension2]) => {
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
              this.updateFilteredExtensions();
            },
            searchCategoryText() {
              this.updateFilteredExtensions();
            }
          },
          async mounted() {
            while (typeof extensions_default.storage.installed?.on !== "function") {
              await new Promise((resolve) => setTimeout(resolve, 100));
            }
            this.onStorageUpdate();
            extensions_default.storage.installed.on("UPDATE", this.onStorageUpdate);
            extensions_default.storage.installed.on("SET", this.onStorageUpdate);
            extensions_default.storage.installed.on("DELETE", this.onStorageUpdate);
            events_default.on("ExtensionLoaded", this.onExtensionLoaded);
            events_default.on("ExtensionUnloaded", this.onExtensionUnloaded);
          },
          unmounted() {
            extensions_default.storage.installed.off("UPDATE", this.onStorageUpdate);
            extensions_default.storage.installed.off("SET", this.onStorageUpdate);
            extensions_default.storage.installed.off("DELETE", this.onStorageUpdate);
            events_default.off("ExtensionLoaded", this.onExtensionLoaded);
            events_default.off("ExtensionUnloaded", this.onExtensionUnloaded);
          }
        }
      );
    }
  };

  // src/ui/home/vue/components/pages/settings-page/style.scss
  var style_default11 = `
.acord--settings-page{display:flex;align-items:flex-start;justify-content:center;padding:0 16px}.acord--settings-page>.container{width:100%;max-width:720px;display:flex;flex-direction:column;gap:16px}.acord--settings-page>.container .line{width:100%;display:flex;align-items:center;justify-content:space-between;gap:16px}.acord--settings-page>.container .line>.info{display:flex;flex-direction:column}.acord--settings-page>.container .line>.info .title{font-size:20px;font-weight:600;color:#f5f5f5}.acord--settings-page>.container .line>.info .description{font-size:16px;font-weight:400;color:#f5f5f5;opacity:.75}.acord--settings-page>.container .line>.control{display:flex}.acord--settings-page .icon-button{display:flex;padding:8px;background-color:rgba(0,0,0,.25);border-radius:8px;color:#f5f5f5;cursor:pointer}.acord--settings-page .icon-button:hover{background-color:rgba(0,0,0,.5)}.acord--settings-page .icon-button.danger:hover{color:#f23f42}.acord--settings-page .icon-button.disabled{opacity:.5;pointer-events:none}`;

  // src/ui/home/vue/components/pages/settings-page/index.js
  patcher_default.injectCSS(style_default11);
  var settings_page_default = {
    /** @param {import("vue").App} vueApp */
    load(vueApp) {
      vueApp.component(
        "settings-page",
        {
          template: `
          <div class="acord--settings-page">
            <div class="container">
              <div class="line">
                <div class="info">
                  <div class="title">{{i18nFormat('UPDATE')}}</div>
                  <div class="description">{{i18nFormat('UPDATE_DESCRIPTION')}}</div>
                </div>
                <div class="control">
                  <div class="icon-button" @click="updateAcord" :class="{'disabled': updateStarted}" acord--tooltip-ignore-destroy :acord--tooltip-content="i18nFormat('UPDATE')">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                      <path fill="currentColor" d="M5.463 4.433A9.961 9.961 0 0 1 12 2c5.523 0 10 4.477 10 10 0 2.136-.67 4.116-1.81 5.74L17 12h3A8 8 0 0 0 6.46 6.228l-.997-1.795zm13.074 15.134A9.961 9.961 0 0 1 12 22C6.477 22 2 17.523 2 12c0-2.136.67-4.116 1.81-5.74L7 12H4a8 8 0 0 0 13.54 5.772l.997 1.795z"/>
                    </svg>
                  </div>
                </div>
              </div>
              <div class="line">
                <div class="info">
                  <div class="title">{{i18nFormat('RELAUNCH')}}</div>
                  <div class="description">{{i18nFormat('RELAUNCH_DESCRIPTION')}}</div>
                </div>
                <div class="control">
                  <div class="icon-button" @click="relaunch" acord--tooltip-ignore-destroy :acord--tooltip-content="i18nFormat('RELAUNCH')">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                      <path fill="currentColor" d="M5.463 4.433A9.961 9.961 0 0 1 12 2c5.523 0 10 4.477 10 10 0 2.136-.67 4.116-1.81 5.74L17 12h3A8 8 0 0 0 6.46 6.228l-.997-1.795zm13.074 15.134A9.961 9.961 0 0 1 12 22C6.477 22 2 17.523 2 12c0-2.136.67-4.116 1.81-5.74L7 12H4a8 8 0 0 0 13.54 5.772l.997 1.795z"/>
                    </svg>
                  </div>
                </div>
              </div>
              <div class="line">
                <div class="info">
                  <div class="title">{{i18nFormat('RESET_ACORD_DATA')}}</div>
                  <div class="description">{{i18nFormat('RESET_ACORD_DATA_DESCRIPTION')}}</div>
                </div>
                <div class="control">
                  <div class="icon-button danger" @click="resetAcord" acord--tooltip-ignore-destroy :acord--tooltip-content="i18nFormat('RESET_ACORD_DATA')">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                      <path fill="currentColor" d="M5.463 4.433A9.961 9.961 0 0 1 12 2c5.523 0 10 4.477 10 10 0 2.136-.67 4.116-1.81 5.74L17 12h3A8 8 0 0 0 6.46 6.228l-.997-1.795zm13.074 15.134A9.961 9.961 0 0 1 12 22C6.477 22 2 17.523 2 12c0-2.136.67-4.116 1.81-5.74L7 12H4a8 8 0 0 0 13.54 5.772l.997 1.795z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `,
          data() {
            return {
              updateStarted: false
            };
          },
          methods: {
            i18nFormat: i18n_default.format,
            async resetAcord() {
              let success = await ui_default.modals.show.confirmation(
                i18n_default.format("RESET_ACORD_DATA"),
                i18n_default.format("RESET_ACORD_DATA_DESCRIPTION"),
                {
                  danger: true,
                  cancel: true
                }
              );
              if (success) {
                await clear();
                modules_default.native.remoteApp.relaunch();
              }
            },
            relaunch() {
              modules_default.native.remoteApp.relaunch();
            },
            async updateAcord() {
              if (internal_default.process.platform !== "win32")
                return ui_default.toasts.show.error(i18n_default.format("UPDATE_NOT_SUPPORTED"));
              if (this.updateStarted)
                return;
              this.updateStarted = true;
              let fs = modules_default.require("fs");
              let path = modules_default.require("path");
              let cp = modules_default.require("child_process");
              let appData = internal_default.process.env.APPDATA;
              let acordPath = path.join(appData, "Acord");
              let updaterPath = path.join(acordPath, "updater.exe");
              let req = await fetch("https://github.com/acord-standalone/updater/releases/download/v0.0.3/AcordStandaloneUpdater.exe");
              let buffer = await req.arrayBuffer();
              fs.writeFileSync(updaterPath, new DataView(buffer));
              let hostSplitted = window.location.host.split(".");
              let releaseType = hostSplitted.length > 2 ? hostSplitted[0] : "stable";
              cp.spawn(`updater.exe`, [releaseType], { detached: true, stdio: "ignore", cwd: acordPath }).unref();
            }
          }
        }
      );
    }
  };

  // src/ui/home/vue/components/pages/store-page/style.scss
  var style_default12 = `
@keyframes rotate360{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}.acord--store-page{display:flex;align-items:flex-start;justify-content:center;padding:0 16px}.acord--store-page .container{width:100%;max-width:1024px;display:flex;flex-direction:column}.acord--store-page .container>.top{display:flex;align-items:center;gap:8px}.acord--store-page .container>.top>.search{width:80%}.acord--store-page .container>.top>.category{width:20%}.acord--store-page .container>.top>.refresh{display:flex;align-items:center;justify-content:center;color:#f5f5f5;height:42px;background:#1e1f22;width:42px;min-width:42px;border-radius:4px;cursor:pointer}.acord--store-page .container>.top>.refresh.loading svg{animation:rotate360 1s linear infinite}.acord--store-page .container>.bottom{display:flex;flex-direction:row;justify-content:center;flex-wrap:wrap;gap:16px;margin-top:16px}`;

  // src/ui/home/vue/components/pages/store-page/index.js
  patcher_default.injectCSS(style_default12);
  var store_page_default = {
    /** @param {import("vue").App} vueApp */
    load(vueApp) {
      vueApp.component(
        "store-page",
        {
          template: `
        <div class="acord--store-page">
          <div class="container">
            <div class="top">
              <div class="search">
                <discord-input v-model="searchText" :placeholder="i18nFormat('SEARCH')" />
              </div>
              <div class="category">
                <discord-select v-model="searchCategoryText" :options="[{value: 'all', label: i18nFormat('ALL')}, {value: 'plugin', label: i18nFormat('PLUGINS')}, {value: 'theme', label: i18nFormat('THEMES')}]" />
              </div>
              <div class="refresh" :class="{'loading': fetching}" :acord--tooltip-content="i18nFormat('REFRESH')" @click="fetchItems">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                  <path fill="currentColor" d="M5.463 4.433A9.961 9.961 0 0 1 12 2c5.523 0 10 4.477 10 10 0 2.136-.67 4.116-1.81 5.74L17 12h3A8 8 0 0 0 6.46 6.228l-.997-1.795zm13.074 15.134A9.961 9.961 0 0 1 12 22C6.477 22 2 17.523 2 12c0-2.136.67-4.116 1.81-5.74L7 12H4a8 8 0 0 0 13.54 5.772l.997 1.795z"/>
                </svg>
              </div>
            </div>
            <div class="bottom">
              <store-extension-card v-for="extension in filteredExtensions" :id="extension.meta.url" :extension="extension" :key="extension.meta.url" />
            </div>
          </div>
        </div>
        `,
          data() {
            return {
              extensions: [],
              searchCategoryText: "all",
              searchText: "",
              fetching: false
            };
          },
          methods: {
            i18nFormat: i18n_default.format,
            async fetchItems() {
              if (this.fetching)
                return;
              this.fetching = true;
              this.extensions = await (await fetch("https://raw.githubusercontent.com/acord-standalone/verified-extensions/main/index.json", { cache: "no-store" })).json();
              this.fetching = false;
            }
          },
          computed: {
            filteredExtensions() {
              const searchText = this.searchText.toLowerCase();
              const searchCategoryText = this.searchCategoryText;
              return this.extensions.filter((extension2) => {
                if (searchCategoryText === "all")
                  return true;
                return extension2.manifest.type === searchCategoryText;
              }).filter((extension2) => {
                if (!searchText)
                  return true;
                return i18n_default.localize(extension2.manifest.about.name).toLowerCase().includes(searchText) || i18n_default.localize(extension2.manifest.about.description).toLowerCase().includes(searchText);
              });
            }
          },
          async mounted() {
            this.fetchItems();
          }
        }
      );
    }
  };

  // src/ui/home/vue/components/pages/inventory-page/style.scss
  var style_default13 = `
@keyframes rotate360{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}.acord--inventory-page{display:flex;align-items:flex-start;justify-content:center;padding:0 16px}.acord--inventory-page>.container{width:100%;max-width:1255px;display:flex;flex-direction:row;gap:16px}.acord--inventory-page>.container>.left{width:100%;height:100%;display:flex;flex-direction:column;gap:16px}.acord--inventory-page>.container>.left>.top{display:flex;gap:8px}.acord--inventory-page>.container>.left>.top>.title{width:100%;display:flex;align-items:center;font-size:24px;font-weight:500;color:#f5f5f5;opacity:.95}.acord--inventory-page>.container>.left>.top>.refresh{display:flex;align-items:center;justify-content:center;color:#f5f5f5;height:42px;background:#1e1f22;width:42px;min-width:42px;border-radius:4px;cursor:pointer}.acord--inventory-page>.container>.left>.top>.refresh.loading svg{animation:rotate360 1s linear infinite}.acord--inventory-page>.container>.left>.bottom{display:flex;flex-direction:column;gap:16px}.acord--inventory-page>.container>.right{width:400px;height:100%;display:flex;justify-content:center}@media screen and (max-width: 1255px){.acord--inventory-page>.container{flex-direction:column-reverse}.acord--inventory-page>.container>.right{width:100%}}`;

  // src/ui/home/vue/components/pages/inventory-page/index.js
  patcher_default.injectCSS(style_default13);
  var inventory_page_default = {
    /** @param {import("vue").App} vueApp */
    load(vueApp) {
      vueApp.component(
        "inventory-page",
        {
          template: `
        <div class="acord--inventory-page">
          <div class="container">
            <div class="left">
              <div class="top">
                <div class="title">{{i18nFormat('INVENTORY')}}</div>
                <div class="refresh" :class="{'loading': fetching}" :acord--tooltip-content="i18nFormat('REFRESH')"
                  @click="fetchAll">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path fill="currentColor"
                      d="M5.463 4.433A9.961 9.961 0 0 1 12 2c5.523 0 10 4.477 10 10 0 2.136-.67 4.116-1.81 5.74L17 12h3A8 8 0 0 0 6.46 6.228l-.997-1.795zm13.074 15.134A9.961 9.961 0 0 1 12 22C6.477 22 2 17.523 2 12c0-2.136.67-4.116 1.81-5.74L7 12H4a8 8 0 0 0 13.54 5.772l.997 1.795z" />
                  </svg>
                </div>
              </div>
              <div class="bottom">
                <span v-for="feature, idx in features" @click="selectedFeature = feature._id">
                  <component :feature="feature" :selected="selectedFeature === feature._id" :is="\`inventory-\${feature.type.replaceAll('_', '-')}-feature-card\`" :key="feature._id">
                  </component>
                </span>
              </div>
            </div>
            <div class="right">
              <profile-card :name-color-data="profileCardData.nameColorData" :badges="profileCardData.badges"
                :music-data="profileCardData.musicData" :name="profileCardData.name" :hat-data="profileCardData.hatData"
                :avatar-url="profileCardData.avatarUrl"></profile-card>
            </div>
          </div>
        </div>
        `,
          data() {
            return {
              profileCardData: {
                nameColorData: null,
                badges: [],
                musicData: null,
                name: "",
                hatData: null,
                avatarUrl: ""
              },
              features: [],
              fetching: false,
              selectedFeature: null
            };
          },
          async mounted() {
            this.fetchPreview();
            this.fetchFeatures();
            events_default.on("InventoryFeatureUpdate", this.onInventoryFeatureUpdate);
          },
          async unmounted() {
            events_default.off("InventoryFeatureUpdate", this.onInventoryFeatureUpdate);
          },
          methods: {
            i18nFormat: i18n_default.format,
            fetchAll() {
              this.fetchPreview();
              this.fetchFeatures();
            },
            onInventoryFeatureUpdate(feature) {
              let idx = this.features.findIndex((i) => i._id === feature._id);
              if (idx === -1)
                return;
              if (feature.type === "hat" && feature.enabled) {
                this.features.forEach((i) => {
                  if (i.type === "hat")
                    i.enabled = false;
                });
              }
              ;
              this.features.splice(idx, 1, feature);
              this.processFeatures();
              this.$forceUpdate();
            },
            async fetchPreview() {
              if (this.fetching)
                return;
              this.fetching = true;
              let user = common_default2.UserStore.getCurrentUser();
              this.profileCardData.name = user.username;
              this.profileCardData.avatarUrl = user.avatar ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png` : `https://cdn.discordapp.com/embed/avatars/${user.discriminator % 5}.png`;
              await this.fetchFeatures();
              this.fetching = false;
              this.processFeatures();
            },
            async processFeatures() {
              this.profileCardData.nameColorData = this.features?.find((i) => i.type === "colored_name" && i.enabled)?.data;
              this.profileCardData.musicData = this.features?.find((i) => i.type === "profile_music" && i.enabled)?.data;
              let hatFeature = this.features?.find((i) => i.type === "hat" && i.enabled);
              if (hatFeature) {
                this.profileCardData.hatData = (await (await fetch(`https://api.acord.app/feature/hat/${hatFeature.feature_id}`)).json()).data;
              } else {
                this.profileCardData.hatData = null;
              }
              this.profileCardData.badges = (await Promise.all(
                this.features.filter((i) => i.type === "badge" && i.enabled).map(async (i) => {
                  let req = await fetch(`https://api.acord.app/feature/badge/${i.feature_id}`);
                  if (!req.ok)
                    return null;
                  let json = await req.json();
                  return json.data;
                })
              )).filter((i) => i);
            },
            async fetchFeatures() {
              let req = await fetch(`https://api.acord.app/user/@me/profile/inventory?include_disabled=true&durations=true`, {
                method: "GET",
                headers: {
                  "x-acord-token": authentication_default.token
                }
              });
              let features = (await req.json())?.data?.features || [];
              this.features = features.filter((i) => !i.hidden_in_inventory).map((i) => ({ ...i, _id: `${i.type},${i.id},${i.feature_id}` })).sort((a, b) => {
                return a.enabled ? -1 : 1;
              });
              ;
              this.processFeatures();
            }
          }
        }
      );
    }
  };

  // src/ui/home/vue/components/pages/cosmetics/cosmetics-cart-page/style.scss
  var style_default14 = `
.acord--cosmetics-cart-page{display:flex;align-items:flex-start;justify-content:center;width:100%}.acord--cosmetics-cart-page>.container{width:100%;max-width:1024px;display:flex;flex-direction:column}.acord--cosmetics-cart-page>.container>.nav{width:100%;max-width:1024px;display:flex;justify-content:space-between;align-items:center;padding:8px}.acord--cosmetics-cart-page>.container>.nav>.left{display:flex;gap:8px;align-items:center}.acord--cosmetics-cart-page>.container>.nav>.left>.back{display:flex;align-items:center;justify-content:center;color:#f5f5f5;padding:4px;cursor:pointer;border-radius:50%}.acord--cosmetics-cart-page>.container>.nav>.left>.back:hover{background-color:rgba(245,245,245,.25)}.acord--cosmetics-cart-page>.container>.nav>.left>.back svg{width:24px;height:24px}.acord--cosmetics-cart-page>.container>.nav>.left>.back.disabled{opacity:.5;pointer-events:none}.acord--cosmetics-cart-page>.container>.nav>.left>.title{font-size:32px;font-weight:600;color:#f5f5f5}.acord--cosmetics-cart-page>.container>.items-content{display:flex;gap:16px}.acord--cosmetics-cart-page>.container>.items-content>.items{display:flex;flex-direction:column;width:100%}.acord--cosmetics-cart-page>.container>.items-content>.items .item{display:flex;width:100%;padding:16px;border-bottom:1px solid rgba(245,245,245,.25);align-items:center;justify-content:space-between}.acord--cosmetics-cart-page>.container>.items-content>.items .item>.left{align-items:center;display:flex;gap:8px}.acord--cosmetics-cart-page>.container>.items-content>.items .item>.left .image{width:100px;height:75px;background-position:center;background-size:contain;background-repeat:no-repeat;border-radius:4px;background-color:rgba(0,0,0,.15)}.acord--cosmetics-cart-page>.container>.items-content>.items .item>.left .name{font-size:24px;font-weight:600;color:#f5f5f5}.acord--cosmetics-cart-page>.container>.items-content>.items .item>.right{display:flex}.acord--cosmetics-cart-page>.container>.items-content>.total{width:240px;display:flex;flex-direction:column}.acord--cosmetics-cart-page>.container>.items-content>.total .info-line{font-size:18px;color:#f5f5f5;border-bottom:1px solid rgba(245,245,245,.25);padding:8px}.acord--cosmetics-cart-page>.container>.items-content>.total .info-line.total-price{font-weight:600}.acord--cosmetics-cart-page>.container>.items-content>.total>.checkout-button{padding:16px 8px;background-color:#248046;color:#f5f5f5;font-size:18px;font-weight:600;border-radius:8px;cursor:pointer;box-shadow:0 0 8px rgba(0,0,0,.25);margin-top:32px;text-align:center}.acord--cosmetics-cart-page>.container>.items-content>.total>.checkout-button:hover{background-color:#1e6f3d}.acord--cosmetics-cart-page>.container>.items-content>.total>.checkout-button.disabled{opacity:.5;pointer-events:none}.acord--cosmetics-cart-page>.container>.items-content>.total>.old-payments{margin-top:16px;display:flex;flex-direction:column;gap:8px}.acord--cosmetics-cart-page>.container>.items-content>.total>.old-payments>.title{font-size:16px;color:#f5f5f5;font-weight:600}.acord--cosmetics-cart-page>.container>.items-content>.total>.old-payments>.items{display:flex;flex-direction:column;gap:8px;margin-top:8px}.acord--cosmetics-cart-page>.container>.checkout-content{display:flex;align-items:flex-start;justify-content:center}.acord--cosmetics-cart-page>.container>.checkout-content .checkout-form{width:350px}.acord--cosmetics-cart-page>.container>.checkout-content .checkout-form .input-line{display:flex;flex-direction:column;gap:4px;margin-bottom:8px;width:100%}.acord--cosmetics-cart-page>.container>.checkout-content .checkout-form .input-line>.label{font-size:20px;color:#f5f5f5;font-weight:600}.acord--cosmetics-cart-page>.container>.checkout-content .checkout-form .input-line input,.acord--cosmetics-cart-page>.container>.checkout-content .checkout-form .input-line select{padding:8px 16px;border-radius:4px;background-color:rgba(0,0,0,.25);color:#f5f5f5;font-size:16px;border:none;outline:none;box-shadow:0 0 8px rgba(0,0,0,.25);width:100%}.acord--cosmetics-cart-page>.container>.checkout-content .checkout-form .input-line input option,.acord--cosmetics-cart-page>.container>.checkout-content .checkout-form .input-line select option{color:#000}.acord--cosmetics-cart-page>.container>.checkout-content .checkout-form .price-line{display:flex;justify-content:space-between;align-items:center;gap:4px;margin-bottom:8px;width:100%}.acord--cosmetics-cart-page>.container>.checkout-content .checkout-form .price-line .label{font-size:18px;color:#f5f5f5;font-weight:600}.acord--cosmetics-cart-page>.container>.checkout-content .checkout-form .price-line .price{font-size:14px;color:#f5f5f5;font-weight:500}.acord--cosmetics-cart-page>.container>.checkout-content .checkout-form .submit-button{padding:16px 8px;background-color:#248046;color:#f5f5f5;font-size:18px;font-weight:600;border-radius:8px;cursor:pointer;margin-top:32px;text-align:center;width:100%}.acord--cosmetics-cart-page>.container>.checkout-content .checkout-form .submit-button:hover{background-color:#1e6f3d}.acord--cosmetics-cart-page>.container>.checkout-content .checkout-form .submit-button.disabled{opacity:.5;pointer-events:none}`;

  // src/ui/home/vue/components/pages/cosmetics/cosmetics-data.js
  var reactive;
  ui_default.vue.ready.when().then(() => {
    reactive = Vue.reactive({
      cartItems: []
    });
  });
  var cosmetics_data_default = {
    get reactive() {
      return reactive;
    }
  };

  // src/ui/home/vue/components/pages/cosmetics/cosmetics-cart-page/countries.json
  var countries_default = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei ",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "C\xF4te d'Ivoire",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo (Congo-Brazzaville)",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czechia (Czech Republic)",
    "Democratic Republic of the Congo",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    'Eswatini (fmr. "Swaziland")',
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Holy See",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar (formerly Burma)",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Korea",
    "North Macedonia",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Palestine State",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Korea",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syria",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States of America",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe"
  ];

  // src/ui/home/vue/components/pages/cosmetics/cosmetics-cart-page/index.js
  patcher_default.injectCSS(style_default14);
  var cosmetics_cart_page_default = {
    /** @param {import("vue").App} vueApp */
    load(vueApp) {
      vueApp.component(
        "cosmetics-cart-page",
        {
          template: `
        <div class="acord--cosmetics-cart-page">
          <div class="container">
            <div class="nav">
              <div class="left">
                <div class="back" @click="goBack">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path>
                  </svg>
                </div>
                <div class="title">{{i18nFormat("COSMETICS_CART")}}</div>
              </div>
              <div class="right"></div>
            </div>
            <div v-if="!inCheckout" class="items-content">
              <div class="items">
                <div class="item" v-for="item in reactive.cartItems" :key="item.id">
                  <div class="left">
                    <div class="image" :style="\`background-image: url('\${item.image[0]}');\`"></div>
                    <div class="name">{{item.name}}</div>
                  </div>
                  <div class="right">
                    <cosmetics-price-card :item="item" :small="true" />
                  </div>
                </div>
              </div>
              <div class="total">
                <div class="info-line">
                  <strong>{{i18nFormat("COSMETICS_TOTAL")}}:</strong> {{reactive.cartItems.reduce((all,i)=>all+i.prices.try,0).toFixed(2)}}\u20BA ({{reactive.cartItems.reduce((all,i)=>all+i.prices.usd,0).toFixed(2)}}$)
                </div>
                <strong class="info-line">
                  {{i18nFormat("COSMETICS_KDV_INCLUDED")}}
                </strong>
                <div class="checkout-button" @click="checkout" :class="{'disabled': !reactive.cartItems.length}">
                  {{i18nFormat("COSMETICS_CHECKOUT")}}
                </div>
                <div class="old-payments">
                  <div class="title">{{i18nFormat("COSMETICS_OLD_PAYMENTS")}}</div>
                  <div class="items">
                    <cosmetics-old-payment-card v-for="item in oldPayments" :item="item" :key="item.id" />
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="checkout-content">
              <form @submit="onCheckoutSubmit" class="checkout-form">
                <div class="input-line">
                  <div class="label">{{i18nFormat("BUYER_NAME")}}:</div>
                  <input v-model="buyerData.buyer_name" type="text" required tabindex="1"/>
                </div>
                <div class="input-line">
                  <div class="label">{{i18nFormat("BUYER_SURNAME")}}:</div>
                  <input v-model="buyerData.buyer_surname" type="text" required tabindex="2" />
                </div>
                <div class="input-line">
                  <div class="label">{{i18nFormat("BUYER_MAIL")}}:</div>
                  <input v-model="buyerData.buyer_mail" type="email" required tabindex="3" />
                </div>
                <div class="input-line">
                  <div class="label">{{i18nFormat("BUYER_GSM_NO")}}:</div>
                  <input v-model="buyerData.buyer_gsm_no" type="tel" required tabindex="4" />
                </div>
                <div class="input-line">
                  <div class="label">{{i18nFormat("BUYER_CITY")}}:</div>
                  <input v-model="buyerData.buyer_city" type="text" required tabindex="6" />
                </div>
                <div class="input-line">
                  <div class="label">{{i18nFormat("BUYER_DISTRICT")}}:</div>
                  <input v-model="buyerData.buyer_district" type="text" required tabindex="7" />
                </div>
                <div class="input-line">
                  <div class="label">{{i18nFormat("BUYER_COUNTRY")}}:</div>
                  <select v-model="buyerData.buyer_country" required tabindex="8"  @change="onCountryChange">
                    <option value="" disabled selected>{{i18nFormat("SELECT")}}</option>
                    <option v-for="country in countries" :key="country" :value="country">{{country}}</option>
                  </select>
                </div>
                <div class="price-line">
                  <div class="label">{{i18nFormat("COSMETICS_TOTAL")}}:</div>
                  <div class="price">
                    {{(buyerData.buyer_country === "Turkey" || !buyerData.buyer_country) ? reactive.cartItems.reduce((all,i)=>all+i.prices.try,0).toFixed(2) : (reactive.cartItems.reduce((all,i)=>all+i.prices.usd,0) + ((buyerData.buyer_country === "Turkey" || !buyerData.buyer_country) ? 0 : 0.5)).toFixed(2)}}{{(buyerData.buyer_country === "Turkey" || !buyerData.buyer_country) ? "\u20BA" : "$"}}
                  </div>
                </div>
                <button type="submit" class="submit-button" :class="{'disabled': paymentLoading}" tabindex="9">
                  {{i18nFormat(paymentLoading ? "LOADING" : "COSMETICS_CHECKOUT")}}
                </button>
              </form>
            </div>
          </div>
        </div>
        `,
          data() {
            return {
              reactive: cosmetics_data_default.reactive,
              oldPayments: [],
              inCheckout: false,
              paymentLoading: false,
              buyerData: {
                buyer_name: "",
                buyer_surname: "",
                buyer_mail: "",
                buyer_gsm_no: "",
                buyer_address: "...",
                buyer_city: "",
                buyer_country: "",
                buyer_district: ""
              },
              countries: countries_default,
              paymentPageUrl: ""
            };
          },
          mounted() {
            this.resetBuyerData();
            this.fetchOldPayments();
            events_default.on("CosmeticsPaymentOk", this.paymentOk);
          },
          unmounted() {
            events_default.off("CosmeticsPaymentOk", this.paymentOk);
          },
          methods: {
            i18nFormat: i18n_default.format,
            resetBuyerData() {
              let currentUser = common_default2.UserStore.getCurrentUser();
              this.buyerData = {
                buyer_name: "",
                buyer_surname: "",
                buyer_mail: currentUser.email || "",
                buyer_gsm_no: currentUser.phone || "",
                buyer_address: "...",
                buyer_city: "",
                buyer_country: "",
                buyer_district: ""
              };
            },
            paymentOk() {
              this.paymentPageUrl = "";
              this.inCheckout = false;
              this.reactive.cartItems.splice(0, this.reactive.cartItems.length);
              events_default.emit("CosmeticsSubPageChange", { name: "landing" });
              this.fetchOldPayments();
            },
            goBack() {
              if (this.inCheckout) {
                this.inCheckout = false;
                return;
              }
              events_default.emit("CosmeticsSubPageChange", { name: "landing" });
            },
            checkout() {
              if (this.inCheckout)
                return;
              this.inCheckout = true;
            },
            async fetchOldPayments() {
              const list = await fetch("https://api.acord.app/store/payment/list", {
                method: "GET",
                headers: {
                  "x-acord-token": authentication_default.token
                }
              }).then((res) => res.json());
              this.oldPayments = list?.data.reverse() ?? [];
            },
            async onCountryChange() {
              if (this.buyerData.buyer_country !== "Turkey") {
                ui_default.notifications.show.error(i18n_default.format("EXTRA_COMMISSION"), { timeout: 8e3 });
              }
            },
            async onCheckoutSubmit(e) {
              e.preventDefault();
              let usdTotal = this.reactive.cartItems.reduce((all, i) => all + i.prices.usd, 0);
              if (usdTotal < 0.5 && this.buyerData.buyer_country !== "Turkey") {
                ui_default.notifications.show.error(i18n_default.format("COSMETICS_MINIMUM_USD"));
                return;
              }
              if (this.paymentPageUrl) {
                internal_default.openExternal(this.paymentPageUrl);
                return;
              }
              this.paymentLoading = true;
              let req = await fetch(
                "https://api.acord.app/store/payment/create-checkout-session",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    "x-acord-token": authentication_default.token
                  },
                  body: JSON.stringify({
                    ...this.buyerData,
                    buyer_locale: i18n_default.locale === "tr" ? "tr" : "en",
                    items: this.reactive.cartItems.map((i) => ({ id: i.id, type: i.type }))
                  })
                }
              );
              let res = await req.json();
              if (!req.ok) {
                this.paymentLoading = false;
                ui_default.notifications.show.error(res.error, { timeout: 3e4 });
                return;
              }
              this.paymentPageUrl = res.data.payment_page_url;
              this.paymentLoading = false;
              internal_default.openExternal(this.paymentPageUrl);
              this.reactive.cartItems.splice(0, this.reactive.cartItems.length);
              this.resetBuyerData();
              this.inCheckout = false;
              setTimeout(() => {
                this.fetchOldPayments();
              }, 1e3);
            }
          }
        }
      );
    }
  };

  // src/ui/home/vue/components/pages/cosmetics/cosmetics-landing-page/style.scss
  var style_default15 = `
.acord--cosmetics-landing-page{display:flex;align-items:flex-start;justify-content:center;width:100%}.acord--cosmetics-landing-page>.container{width:100%;max-width:1024px;display:flex;flex-direction:column;gap:16px}.acord--cosmetics-landing-page>.container>.featured-container{width:100%;height:400px;border-radius:8px;background-position:center;background-size:contain;background-color:rgba(0,0,0,.25);background-repeat:no-repeat;position:relative}.acord--cosmetics-landing-page>.container>.featured-container .name{position:absolute;top:16px;left:16px;border-radius:4px;background-color:rgba(0,0,0,.5);padding:4px 8px;font-size:24px;font-weight:600;color:#f5f5f5}.acord--cosmetics-landing-page>.container>.featured-container .page{position:absolute;bottom:16px;left:16px;border-radius:4px;background-color:rgba(0,0,0,.5);padding:4px 8px;font-size:14px;font-weight:600;color:#f5f5f5;opacity:.75}.acord--cosmetics-landing-page>.container>.featured-container .control{position:absolute;display:flex;cursor:pointer;background-color:rgba(0,0,0,.5);border-radius:50%;padding:8px}.acord--cosmetics-landing-page>.container>.featured-container .control:hover{background-color:rgba(0,0,0,.75)}.acord--cosmetics-landing-page>.container>.featured-container .control svg{width:24px;height:24px;color:#f5f5f5}.acord--cosmetics-landing-page>.container>.featured-container .control.disabled{opacity:.5;pointer-events:none}.acord--cosmetics-landing-page>.container>.featured-container .previous{top:50%;left:16px;transform:translateY(-50%)}.acord--cosmetics-landing-page>.container>.featured-container .next{top:50%;right:16px;transform:translateY(-50%)}.acord--cosmetics-landing-page>.container>.featured-container .price-card{display:flex;position:absolute;bottom:16px;right:16px}.acord--cosmetics-landing-page>.container>.other-featured-items{display:flex;justify-content:center;align-items:center;flex-wrap:wrap;gap:8px}.acord--cosmetics-landing-page>.container>.other-featured-items .item{width:300px;height:150px;border-radius:4px;background-position:center;background-size:contain;background-color:rgba(0,0,0,.25);background-repeat:no-repeat;position:relative}.acord--cosmetics-landing-page>.container>.other-featured-items .item .name{position:absolute;top:8px;left:8px;border-radius:4px;background-color:rgba(0,0,0,.5);padding:4px 8px;font-size:24px;font-weight:600;color:#f5f5f5}.acord--cosmetics-landing-page>.container>.other-featured-items .item .price-card{display:flex;position:absolute;bottom:8px;right:8px}.acord--cosmetics-landing-page>.container>.other-page-buttons{display:flex;flex-direction:column;gap:16px;margin-top:16px}.acord--cosmetics-landing-page>.container>.other-page-buttons>.title{width:100%;display:flex;justify-content:center;align-items:center;font-size:32px;font-weight:600;color:#f5f5f5}.acord--cosmetics-landing-page>.container>.other-page-buttons>.buttons{display:flex;gap:16px;width:100%}.acord--cosmetics-landing-page>.container>.other-page-buttons>.buttons .button{width:100%;height:250px;cursor:pointer;border-radius:8px;background-position:center;background-size:cover;background-color:rgba(0,0,0,.25);background-repeat:no-repeat;position:relative}.acord--cosmetics-landing-page>.container>.other-page-buttons>.buttons .button>.title{position:absolute;top:32px;left:32px;border-radius:8px;background-color:rgba(0,0,0,.5);padding:4px 8px;font-size:20px;font-weight:600;color:#f5f5f5}`;

  // src/ui/home/vue/components/pages/cosmetics/cosmetics-landing-page/index.js
  patcher_default.injectCSS(style_default15);
  var cosmetics_landing_page_default = {
    /** @param {import("vue").App} vueApp */
    load(vueApp) {
      vueApp.component(
        "cosmetics-landing-page",
        {
          template: `
        <div class="acord--cosmetics-landing-page">
          <div class="container">
            <div v-if="!!featuredItem" class="featured-container" :style="\`background-image: url('\${featuredItem.image[0]}');\`">
              <div class="name">{{featuredItem.name}}</div>
              <div class="page">{{mainFeaturedItemIndex + 1}}/{{mainFeaturedItems.length}}</div>
              <div class="control previous" :class="{'disabled': mainFeaturedItemIndex === 0}" @click="updateFeaturedIndex(-1)">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path>
                </svg>
              </div>
              <div class="control next" :class="{'disabled': mainFeaturedItemIndex >= (mainFeaturedItems.length - 1)}" @click="updateFeaturedIndex(1)">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M13.1714 12.0007L8.22168 7.05093L9.63589 5.63672L15.9999 12.0007L9.63589 18.3646L8.22168 16.9504L13.1714 12.0007Z"></path>
                </svg>
              </div>
              <div class="price-card">
                <cosmetics-price-card :item="featuredItem" />
              </div>
            </div>
            <div class="other-featured-items">
              <cosmetics-item-card v-for="item in otherFeaturedItems" :item="item" :key="item.id" />
            </div>
            <div class="other-page-buttons">
              <div class="title">
                {{i18nFormat('COSMETICS_OTHER')}}
              </div>
              <div class="buttons">
                <div class="button items" @click="gotoItemsPage('items')" style="background-image: url('https://media.discordapp.net/attachments/756836048251650079/1106226686527275068/Items.png');">
                  <div class="title">{{i18nFormat('COSMETICS_ITEMS')}}</div>
                </div>
                <div class="button packs" @click="gotoItemsPage('packs')" style="background-image: url('https://media.discordapp.net/attachments/756836048251650079/1106267998722994196/Packs.png');">
                  <div class="title">{{i18nFormat('COSMETICS_PACKS')}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        `,
          props: ["pageData"],
          data() {
            return {
              mainFeaturedItemIndex: 0,
              mainFeaturedItems: [],
              otherFeaturedItems: [],
              updateInterval: null,
              switchInterval: null,
              reactive: cosmetics_data_default.reactive,
              ownedFeatures: []
            };
          },
          computed: {
            featuredItem() {
              return this.mainFeaturedItems[this.mainFeaturedItemIndex];
            }
          },
          mounted() {
            this.fetchItems();
            this.updateInterval = setInterval(() => {
              this.fetchItems();
            }, 6e4 * 60);
            this.switchInterval = setInterval(this.switchFeaturedItem, 5e3);
          },
          unmounted() {
            clearInterval(this.updateInterval);
            clearInterval(this.switchInterval);
          },
          methods: {
            i18nFormat: i18n_default.format,
            async fetchItems() {
              let data = await (await fetch("https://api.acord.app/store/featured", { cache: "no-store" })).json();
              this.mainFeaturedItems = data.data.main.sort((a, b) => b.view_order - a.view_order);
              this.otherFeaturedItems = data.data.other.sort((a, b) => b.view_order - a.view_order);
            },
            gotoItemsPage(type) {
              events_default.emit("CosmeticsSubPageChange", { name: "items", data: { type }, hideNav: true });
            },
            updateFeaturedIndex(amount) {
              clearInterval(this.switchInterval);
              this.switchInterval = setInterval(this.switchFeaturedItem, 5e3);
              this.mainFeaturedItemIndex += amount;
            },
            switchFeaturedItem() {
              if (this.mainFeaturedItemIndex >= this.mainFeaturedItems.length - 1) {
                this.mainFeaturedItemIndex = 0;
              } else {
                this.mainFeaturedItemIndex++;
              }
            }
          }
        }
      );
    }
  };

  // src/ui/home/vue/components/pages/cosmetics/cosmetics-router-page/style.scss
  var style_default16 = `
.acord--cosmetics-router-page{display:flex;align-items:center;justify-content:flex-start;flex-direction:column;width:100%;min-height:100vh;background-image:linear-gradient(to bottom, hsl(258deg, 50%, 50%), hsl(290deg, 50%, 50%));padding:32px 16px;gap:16px}.acord--cosmetics-router-page>.nav{width:100%;max-width:1024px;display:flex;justify-content:space-between;align-items:center;padding:8px}.acord--cosmetics-router-page>.nav>.title{font-size:32px;font-weight:600;color:#f5f5f5}`;

  // src/ui/home/vue/components/pages/cosmetics/cosmetics-router-page/index.js
  patcher_default.injectCSS(style_default16);
  var cosmetics_router_page_default = {
    /** @param {import("vue").App} vueApp */
    load(vueApp) {
      vueApp.component(
        "cosmetics-router-page",
        {
          template: `
        <div class="acord--cosmetics-router-page">
          <div v-if="!page.hideNav" class="nav">
            <div class="title">{{i18nFormat("ACORD_COSMETICS_SHOP")}}</div>
            <cosmetics-cart-button />
          </div>
          <keep-alive>
            <component :is="\`cosmetics-\${page.name}-page\`" :page-data="page.data" />
          </keep-alive>
        </div>
        `,
          data() {
            return {
              page: { name: "landing", data: {}, hideNav: false },
              reactive: cosmetics_data_default.reactive
            };
          },
          mounted() {
            events_default.on("CosmeticsSubPageChange", this.onCosmeticsSubPageChange);
          },
          methods: {
            i18nFormat: i18n_default.format,
            onCosmeticsSubPageChange({ name: name2, data = {}, hideNav = false } = {}) {
              this.page = { name: name2, data, hideNav };
              this.$el.scrollIntoView();
            }
          },
          unmounted() {
            events_default.off("CosmeticsSubPageChange", this.onCosmeticsSubPageChange);
          }
        }
      );
    }
  };

  // src/ui/home/vue/components/pages/cosmetics/components/cosmetics-cart-button/style.scss
  var style_default17 = `
.acord--cosmetics-cart-button{padding:8px;display:flex;border-radius:4px;background-color:rgba(245,245,245,.25);cursor:pointer;position:relative}.acord--cosmetics-cart-button .count{display:flex;position:absolute;top:-4px;right:-4px;background-color:#f04747;color:#f5f5f5;border-radius:50%;width:16px;height:16px;font-size:14px;align-items:center;justify-content:center}.acord--cosmetics-cart-button svg{width:24px;height:24px;color:#f5f5f5}`;

  // src/ui/home/vue/components/pages/cosmetics/components/cosmetics-cart-button/index.js
  patcher_default.injectCSS(style_default17);
  var cosmetics_cart_button_default = {
    /** @param {import("vue").App} vueApp */
    load(vueApp) {
      vueApp.component(
        "cosmetics-cart-button",
        {
          template: `
        <div class="acord--cosmetics-cart-button" @click="go">
          <div v-if="reactive.cartItems.length" class="count">{{reactive.cartItems.length}}</div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12.0049 2C15.3186 2 18.0049 4.68629 18.0049 8V9H22.0049V11H20.8379L20.0813 20.083C20.0381 20.6013 19.6048 21 19.0847 21H4.92502C4.40493 21 3.97166 20.6013 3.92847 20.083L3.17088 11H2.00488V9H6.00488V8C6.00488 4.68629 8.69117 2 12.0049 2ZM18.8309 11H5.17788L5.84488 19H18.1639L18.8309 11ZM13.0049 13V17H11.0049V13H13.0049ZM9.00488 13V17H7.00488V13H9.00488ZM17.0049 13V17H15.0049V13H17.0049ZM12.0049 4C9.86269 4 8.1138 5.68397 8.00978 7.80036L8.00488 8V9H16.0049V8C16.0049 5.8578 14.3209 4.10892 12.2045 4.0049L12.0049 4Z"></path>
          </svg>
        </div>
        `,
          data() {
            return {
              reactive: cosmetics_data_default.reactive
            };
          },
          methods: {
            go() {
              events_default.emit("CosmeticsSubPageChange", { name: "cart", data: {}, hideNav: true });
            }
          }
        }
      );
    }
  };

  // src/ui/home/vue/components/pages/cosmetics/components/cosmetics-item-card/style.scss
  var style_default18 = `
.acord--cosmetics-item-card{width:300px;height:150px;border-radius:4px;background-position:center;background-size:contain;background-color:rgba(0,0,0,.25);background-repeat:no-repeat;position:relative}.acord--cosmetics-item-card .name{position:absolute;top:8px;left:8px;border-radius:4px;max-width:calc(100% - 16px);background-color:rgba(0,0,0,.5);padding:4px 8px;font-size:20px;font-weight:600;color:#f5f5f5}.acord--cosmetics-item-card .price-card{display:flex;position:absolute;bottom:8px;right:8px}`;

  // src/ui/home/vue/components/pages/cosmetics/components/cosmetics-item-card/index.js
  patcher_default.injectCSS(style_default18);
  var cosmetics_item_card_default = {
    /** @param {import("vue").App} vueApp */
    load(vueApp) {
      vueApp.component(
        "cosmetics-item-card",
        {
          template: `
          <div class="acord--cosmetics-item-card" :style="\`background-image: url('\${item.image[0]}');\`">
            <div class="name">{{item.name}}</div>
            <div class="price-card">
              <cosmetics-price-card :item="item" :small="true" />
            </div>
          </div>
        `,
          props: ["item"]
        }
      );
    }
  };

  // src/ui/home/vue/components/pages/cosmetics/components/cosmetics-old-payment-card/style.scss
  var style_default19 = `
.acord--cosmetics-old-payment-card{display:flex;flex-direction:column;background-color:rgba(0,0,0,.1);border-radius:4px}.acord--cosmetics-old-payment-card>.top{display:flex;flex-direction:column;background-color:rgba(0,0,0,.1);padding:8px;border-radius:4px;gap:8px}.acord--cosmetics-old-payment-card>.top>.top{display:flex;align-items:center;justify-content:space-between}.acord--cosmetics-old-payment-card>.top>.top>.left{display:flex;flex-direction:column;gap:2px}.acord--cosmetics-old-payment-card>.top>.top>.left .line{font-size:14px;color:#f5f5f5;font-weight:500}.acord--cosmetics-old-payment-card>.top>.top>.right{display:flex;cursor:pointer}.acord--cosmetics-old-payment-card>.top>.top>.right svg{width:24px;height:24px;color:#f5f5f5}.acord--cosmetics-old-payment-card>.top>.bottom{display:flex;align-items:center;justify-content:space-between}.acord--cosmetics-old-payment-card>.top>.bottom>.left{cursor:pointer;display:flex}.acord--cosmetics-old-payment-card>.top>.bottom>.left svg{width:20px;height:20px;color:#f5f5f5}.acord--cosmetics-old-payment-card>.top>.bottom>.right{font-size:16px;color:#f5f5f5;font-weight:500}.acord--cosmetics-old-payment-card>.bottom{padding:8px;display:flex;flex-direction:column;gap:2px}.acord--cosmetics-old-payment-card>.bottom .item{font-size:14px;color:#f5f5f5}`;

  // src/ui/home/vue/components/pages/cosmetics/components/cosmetics-old-payment-card/index.js
  patcher_default.injectCSS(style_default19);
  var cosmetics_old_payment_card_default = {
    /** @param {import("vue").App} vueApp */
    load(vueApp) {
      vueApp.component(
        "cosmetics-old-payment-card",
        {
          template: `
        <div class="acord--cosmetics-old-payment-card">
          <div class="top">
            <div class="top">
              <div class="left">
                <div class="line">{{i18nFormat("COSMETICS_NUM_PACKS", item.packs.length)}}</div>
                <div class="line">{{i18nFormat("COSMETICS_NUM_ITEMS", item.items.length)}}</div>
              </div>
              <div class="right">
                <div v-if="!item.fulfilled" @click="onOldPaymentAction(item)" class="action" acord--tooltip-ignore-destroy :acord--tooltip-content="i18nFormat('COSMETICS_GOTO_PAYMENT')">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM12 11H8V13H12V16L16 12L12 8V11Z"></path>
                  </svg>
                </div>
                <div v-else class="action" @click="onOldPaymentAction(item)" acord--tooltip-ignore-destroy :acord--tooltip-content="i18nFormat('COSMETICS_PAYMENT_DONE')">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M11.602 13.7599L13.014 15.1719L21.4795 6.7063L22.8938 8.12051L13.014 18.0003L6.65 11.6363L8.06421 10.2221L10.189 12.3469L11.6025 13.7594L11.602 13.7599ZM11.6037 10.9322L16.5563 5.97949L17.9666 7.38977L13.014 12.3424L11.6037 10.9322ZM8.77698 16.5873L7.36396 18.0003L1 11.6363L2.41421 10.2221L3.82723 11.6352L3.82604 11.6363L8.77698 16.5873Z"></path>
                  </svg>
                </div>
              </div>
            </div>
            <div class="bottom">
              <div class="left">
                <div class="expand" @click="expanded = !expanded">
                  <svg v-if="!expanded" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M11.9997 13.1714L16.9495 8.22168L18.3637 9.63589L11.9997 15.9999L5.63574 9.63589L7.04996 8.22168L11.9997 13.1714Z"></path>
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M11.9997 10.8284L7.04996 15.7782L5.63574 14.364L11.9997 8L18.3637 14.364L16.9495 15.7782L11.9997 10.8284Z"></path>
                  </svg>
                </div>
              </div>
              <div class="right">
                {{item.total_price ?? i18nFormat("UNKNOWN")}}{{item.total_price ? (item.currency === "try" ? "\u20BA" : "$") : ""}}
              </div>
            </div>
          </div>
          <div class="bottom" v-if="expanded">
            <div class="item" v-for="i in item.packs">
              {{i.name}}
            </div>
            <div class="item" v-for="i in item.items">
              {{i.name}}
            </div>
          </div>
        </div>
        `,
          props: ["item"],
          data() {
            return {
              expanded: false
            };
          },
          methods: {
            i18nFormat: i18n_default.format,
            onOldPaymentAction(item) {
              internal_default.openExternal(item.payment_page_url);
            }
          }
        }
      );
    }
  };

  // src/ui/home/vue/components/pages/cosmetics/components/cosmetics-price-card/style.scss
  var style_default20 = `
.acord--cosmetics-price-card{display:flex;align-items:center;gap:4px;border-radius:4px;background-color:rgba(0,0,0,.5);padding:4px 8px}.acord--cosmetics-price-card .text{display:flex;flex-direction:column;align-items:flex-start;gap:2px}.acord--cosmetics-price-card .text .usd{font-size:24px;font-weight:600;color:#f5f5f5}.acord--cosmetics-price-card .text .try{font-size:16px;font-weight:500;color:rgba(245,245,245,.75)}.acord--cosmetics-price-card .add-to-cart{cursor:pointer;display:flex}.acord--cosmetics-price-card .add-to-cart svg{width:24px;height:24px;color:#f5f5f5}.acord--cosmetics-price-card .add-to-cart.disabled{opacity:.5;pointer-events:none}.acord--cosmetics-price-card.small{padding:2px 4px}.acord--cosmetics-price-card.small .text .usd{font-size:16px}.acord--cosmetics-price-card.small .text .try{font-size:12px}.acord--cosmetics-price-card.small .add-to-cart svg{width:18px;height:18px}`;

  // src/ui/home/vue/components/pages/cosmetics/components/cosmetics-price-card/index.js
  patcher_default.injectCSS(style_default20);
  var cosmetics_price_card_default = {
    /** @param {import("vue").App} vueApp */
    load(vueApp) {
      vueApp.component(
        "cosmetics-price-card",
        {
          template: `
        <div class="acord--cosmetics-price-card" :class="{'small': small}">
          <div class="text">
            <div class="usd">{{item.prices.usd.toFixed(2)}}$</div>
            <div class="try">{{item.prices.try.toFixed(2)}}\u20BA</div>
          </div>
          <div class="add-to-cart" @click="addToCart(item)" :class="{'disabled': disabled}">
          <svg v-if="reactive.cartItems.findIndex(i=> i.id === item.id) === -1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12.0049 2C15.3186 2 18.0049 4.68629 18.0049 8V9H22.0049V11H20.8379L20.0813 20.083C20.0381 20.6013 19.6048 21 19.0847 21H4.92502C4.40493 21 3.97166 20.6013 3.92847 20.083L3.17088 11H2.00488V9H6.00488V8C6.00488 4.68629 8.69117 2 12.0049 2ZM18.8309 11H5.17788L5.84488 19H18.1639L18.8309 11ZM13.0049 13V17H11.0049V13H13.0049ZM9.00488 13V17H7.00488V13H9.00488ZM17.0049 13V17H15.0049V13H17.0049ZM12.0049 4C9.86269 4 8.1138 5.68397 8.00978 7.80036L8.00488 8V9H16.0049V8C16.0049 5.8578 14.3209 4.10892 12.2045 4.0049L12.0049 4Z"></path>
          </svg>
          <svg v-else viewBox="0 0 225 225" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M18.5785 53.9278L29.1851 43.3212L56.465 70.601L88.9889 103.125L107.739 121.875L121.921 136.057L140.671 154.807L145.239 159.375L163.989 178.125L182.162 196.298L184.749 198.885L174.142 209.491L18.5785 53.9278Z" />
            <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M112.546 18.75C143.612 18.75 168.796 43.934 168.796 75V84.375H206.296V103.125H195.355L188.807 181.73L171.434 164.357L176.539 103.125H110.202L91.4521 84.375H150.046V75C150.046 54.9169 134.258 38.5211 114.417 37.5459L112.546 37.5C94.0429 37.5 78.6699 50.9003 75.6024 68.5253L60.5584 53.4812C69.0073 33.0922 89.1015 18.75 112.546 18.75ZM182.162 196.298L163.989 178.125H54.7955L48.5424 103.125H88.9889L56.465 70.601C56.3527 72.0526 56.2955 73.5196 56.2955 75V84.375H18.7955V103.125H29.7267L36.8291 188.278C37.234 193.137 41.296 196.875 46.1718 196.875H178.919C180.056 196.875 181.149 196.672 182.162 196.298ZM159.421 152.344V121.875H140.671V133.594L159.421 152.344ZM140.671 154.807L145.239 159.375H140.671V154.807ZM103.171 121.875H107.739L121.921 136.057V159.375H103.171V121.875ZM84.4205 121.875V159.375H65.6705V121.875H84.4205Z" />
          </svg>
          </div>
        </div>
        `,
          props: ["item", "small", "disabled"],
          data() {
            return {
              reactive: cosmetics_data_default.reactive
            };
          },
          methods: {
            addToCart(item) {
              let idx = this.reactive.cartItems.findIndex((i) => i.id === item.id);
              if (idx === -1) {
                this.reactive.cartItems.push(JSON.parse(JSON.stringify(item)));
              } else {
                this.reactive.cartItems.splice(idx, 1);
              }
            }
          }
        }
      );
    }
  };

  // src/ui/home/vue/components/pages/cosmetics/components/index.js
  var components_default3 = {
    /** @param {import("vue").App} vueApp */
    load(vueApp) {
      cosmetics_price_card_default.load(vueApp);
      cosmetics_old_payment_card_default.load(vueApp);
      cosmetics_item_card_default.load(vueApp);
      cosmetics_cart_button_default.load(vueApp);
    }
  };

  // src/ui/home/vue/components/pages/cosmetics/cosmetics-items-page/style.scss
  var style_default21 = `
.acord--cosmetics-items-page{display:flex;align-items:flex-start;justify-content:center;width:100%}.acord--cosmetics-items-page>.container{width:100%;max-width:1024px;display:flex;flex-direction:column;gap:16px}.acord--cosmetics-items-page>.container>.nav{width:100%;max-width:1024px;display:flex;justify-content:space-between;align-items:center;padding:8px}.acord--cosmetics-items-page>.container>.nav>.left{display:flex;gap:8px;align-items:center}.acord--cosmetics-items-page>.container>.nav>.left>.back{display:flex;align-items:center;justify-content:center;color:#f5f5f5;padding:4px;cursor:pointer;border-radius:50%}.acord--cosmetics-items-page>.container>.nav>.left>.back:hover{background-color:rgba(245,245,245,.25)}.acord--cosmetics-items-page>.container>.nav>.left>.back svg{width:24px;height:24px}.acord--cosmetics-items-page>.container>.nav>.left>.back.disabled{opacity:.5;pointer-events:none}.acord--cosmetics-items-page>.container>.nav>.left>.title{font-size:32px;font-weight:600;color:#f5f5f5}.acord--cosmetics-items-page .items{width:100%;display:flex;justify-content:center;align-items:center;flex-wrap:wrap;gap:8px}`;

  // src/ui/home/vue/components/pages/cosmetics/cosmetics-items-page/index.js
  patcher_default.injectCSS(style_default21);
  var cosmetics_items_page_default = {
    /** @param {import("vue").App} vueApp */
    load(vueApp) {
      vueApp.component(
        "cosmetics-items-page",
        {
          template: `
        <div class="acord--cosmetics-items-page">
          <div class="container">
            <div class="nav">
              <div class="left">
                <div class="back" @click="goBack">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path>
                  </svg>
                </div>
                <div class="title">{{i18nFormat(pageData.type === "items" ? "COSMETICS_ITEMS" : "COSMETICS_PACKS")}}</div>
              </div>
              <cosmetics-cart-button />
            </div>
            <div class="items">
              <cosmetics-item-card v-for="item in items" :item="item" :key="item.id" />
            </div>
          </div>
        </div>
        `,
          props: ["pageData"],
          data() {
            return {
              items: []
            };
          },
          watch: {
            pageData() {
              this.fetchItems();
            }
          },
          mounted() {
            this.fetchItems();
            this.updateInterval = setInterval(() => {
              this.fetchItems();
            }, 6e4 * 60);
          },
          unmounted() {
            clearInterval(this.updateInterval);
          },
          methods: {
            i18nFormat: i18n_default.format,
            async fetchItems() {
              this.items = [];
              let data = await (await fetch(`https://api.acord.app/store/${this.pageData.type}?all=true`, { cache: "no-store" })).json();
              this.items = data.data;
            },
            goBack() {
              events_default.emit("CosmeticsSubPageChange", { name: "landing" });
            }
          }
        }
      );
    }
  };

  // src/ui/home/vue/components/pages/cosmetics/index.js
  var cosmetics_default = {
    /** @param {import("vue").App} vueApp */
    load(vueApp) {
      cosmetics_landing_page_default.load(vueApp);
      cosmetics_cart_page_default.load(vueApp);
      cosmetics_router_page_default.load(vueApp);
      cosmetics_items_page_default.load(vueApp);
      components_default3.load(vueApp);
    }
  };

  // src/ui/home/vue/components/pages/index.js
  var pages_default = {
    /** @param {import("vue").App} vueApp */
    load(vueApp) {
      inventory_page_default.load(vueApp);
      home_page_default.load(vueApp);
      extensions_page_default.load(vueApp);
      settings_page_default.load(vueApp);
      store_page_default.load(vueApp);
      cosmetics_default.load(vueApp);
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
          <discord-button @click="onClick" :value="i18nFormat(item.value)" :size="item.size" :color="item.color" />
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
          },
          i18nFormat: i18n_default.format
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
          {{i18nLocalize(item.value)}}
        </div>
      `,
        methods: {
          i18nLocalize: i18n_default.localize
        }
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
          <discord-input @input="onInput" v-model="item.value" :type="item.inputType" :placeholder="item.placeholder ? i18nFormat(item.placeholder) : ''" :maxlength="item.maxlength"  :max="item.max" :min="item.min" :step="item.step" />
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
          },
          i18nFormat: i18n_default.format
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
          {{i18nLocalize(item.value)}}
        </div>
      `,
        methods: {
          i18nLocalize: i18n_default.localize
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
          <discord-select @change="onChange" v-model="item.value" :options="item.options.map(i=>({ label: i18nFormat(i.label), value: i.value }))" />
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
          },
          i18nFormat: i18n_default.format
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
          <discord-textarea @input="onInput" v-model="item.value" :type="item.inputType" :placeholder="item.placeholder ? i18nFormat(item.placeholder) : ''" :maxlength="item.maxlength" :cols="item.cols" :rows="item.rows" :style="{'height': item?.height, 'width': item?.width}" />
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
          },
          i18nFormat: i18n_default.format
        }
      });
    }
  };

  // src/ui/home/vue/components/components/config/style.scss
  var style_default22 = `
.acord--config-item{width:100%;display:flex}.acord--config-row{width:100%;display:flex;flex-direction:row;justify-content:space-between;align-items:center;gap:4px}.acord--config-row.horizontal-align-left{justify-content:flex-start}.acord--config-row.horizontal-align-right{justify-content:flex-end}.acord--config-row.horizontal-align-center{justify-content:center}.acord--config-row.justify-space-between{justify-content:space-between}.acord--config-row.justify-space-around{justify-content:space-around}.acord--config-row.vertical-align-top{align-items:flex-start}.acord--config-row.vertical-align-bottom{align-items:flex-end}.acord--config-column{width:100%;display:flex;flex-direction:column;justify-content:flex-start;align-items:center;gap:4px}.acord--config-column.horizontal-align-left{justify-content:flex-start}.acord--config-column.horizontal-align-right{justify-content:flex-end}.acord--config-column.horizontal-align-center{justify-content:center}.acord--config-column.justify-space-between{justify-content:space-between}.acord--config-column.justify-space-around{justify-content:space-around}.acord--config-column.vertical-align-top{align-items:flex-start}.acord--config-column.vertical-align-bottom{align-items:flex-end}.acord--config-column.vertical-align-center{align-items:center}.acord--config-heading{font-size:1.2rem;font-weight:500;color:#f5f5f5}.acord--config-paragraph{font-size:1rem;font-weight:400;color:rgba(245,245,245,.85)}.acord--config-check,.acord--config-button{width:fit-content}`;

  // src/ui/home/vue/components/components/config/index.js
  patcher_default.injectCSS(style_default22);
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
  var style_default23 = `
@keyframes colorFlashAnimation{0%{color:var(--flash-color-1)}50%{color:var(--flash-color-2)}100%{color:var(--flash-color-1)}}.acord--installed-extension-card{width:100%;background-color:rgba(0,0,0,.1);border-radius:8px;display:flex;flex-direction:column;gap:8px;position:relative}.acord--installed-extension-card>.status-container{position:absolute;top:-9px;right:8px;border-radius:9999px;padding:8px;height:24px;display:flex;gap:6px;align-items:center;background-color:rgba(0,0,0,.25)}.acord--installed-extension-card>.status-container>.loaded-state{width:14px;height:14px;border-radius:50%;background-color:#82858f}.acord--installed-extension-card>.status-container>.loaded-state.active{background-color:#23a55a;filter:drop-shadow(0px 0px 4px #23a55a)}.acord--installed-extension-card>.status-container>.development-mode-warning{color:#f0b232;display:flex;align-items:center;justify-content:center;border-radius:50%}.acord--installed-extension-card>.status-container>.authentication-required{color:#ed4245;display:flex;align-items:center;justify-content:center;border-radius:50%;--flash-color-1: #ed4245;--flash-color-2: #000000;animation:colorFlashAnimation 1s linear infinite normal}.acord--installed-extension-card>.top{background-color:rgba(0,0,0,.25);border-radius:8px;width:100%;padding:16px;height:128px;display:flex;justify-content:space-between}.acord--installed-extension-card>.top>.left{display:flex;flex-direction:column;height:100%;gap:4px}.acord--installed-extension-card>.top>.left>.top{display:flex;align-items:flex-end;gap:4px}.acord--installed-extension-card>.top>.left>.top>.name{font-size:1.4rem;font-weight:500;color:#fff}.acord--installed-extension-card>.top>.left>.top>.version{font-size:1rem;font-weight:300;color:rgba(255,255,255,.5)}.acord--installed-extension-card>.top>.left>.bottom{display:flex;flex-direction:column;gap:8px}.acord--installed-extension-card>.top>.left>.bottom>.top{display:flex}.acord--installed-extension-card>.top>.left>.bottom>.top>.authors{display:flex;gap:2px;font-size:12px;font-weight:300;color:rgba(255,255,255,.45)}.acord--installed-extension-card>.top>.left>.bottom>.top>.authors>.label{font-weight:500;margin-right:2px}.acord--installed-extension-card>.top>.left>.bottom>.top>.authors .author{display:flex}.acord--installed-extension-card>.top>.left>.bottom>.top>.authors .author .hoverable:hover{cursor:pointer;text-decoration:underline}.acord--installed-extension-card>.top>.left>.bottom>.bottom>.description{font-size:16px;color:rgba(255,255,255,.75)}.acord--installed-extension-card>.top>.right{display:flex;height:100%;flex-direction:column;justify-content:space-between;align-items:flex-end}.acord--installed-extension-card>.top>.right>.top{display:flex}.acord--installed-extension-card>.top>.right>.top>.controls{display:flex;align-items:center;gap:8px}.acord--installed-extension-card>.top>.right>.top>.controls .control{display:flex;padding:8px;background-color:rgba(0,0,0,.25);border-radius:8px;color:#f5f5f5;cursor:pointer}.acord--installed-extension-card>.top>.right>.top>.controls .control:hover{background-color:rgba(0,0,0,.5)}.acord--installed-extension-card>.top>.right>.top>.controls .control.uninstall:hover{color:#f23f42}.acord--installed-extension-card>.top>.right>.bottom{display:flex}.acord--installed-extension-card>.top>.right>.bottom>.settings{display:flex;align-items:center;justify-content:flex-end;cursor:pointer;font-weight:300;color:rgba(255,255,255,.75);gap:8px}.acord--installed-extension-card>.top>.right>.bottom>.settings svg{padding:4px;background-color:rgba(0,0,0,.25);border-radius:4px;color:#fff}.acord--installed-extension-card>.bottom{border-radius:8px;width:100%;padding:16px}`;

  // src/ui/home/vue/components/components/cards/installed-extension-card/index.js
  patcher_default.injectCSS(style_default23);
  var installed_extension_card_default = {
    /** @param {import("vue").App} vueApp */
    load(vueApp) {
      vueApp.component(
        "installed-extension-card",
        {
          template: `
          <div class="acord--installed-extension-card" @contextmenu="onContextMenu">
            <div class="status-container">
              <div class="loaded-state" :class="{'active': !!this.configCache}" acord--tooltip-ignore-destroy :acord--tooltip-content="i18nFormat(!!this.configCache ? 'EXTENSION_ACTIVE' : 'EXTENSION_INACTIVE')"></div>
              <div v-if="extension.manifest.mode == 'development'" class="development-mode-warning" acord--tooltip-ignore-destroy :acord--tooltip-content="i18nFormat('EXTENSION_IS_IN_DEVELOPMENT_MODE')">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
                  <path fill="currentColor" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-7v2h2v-2h-2zm0-8v6h2V7h-2z"/>
                </svg>
              </div>
              <div v-if="extension.manifest?.api?.authentication && !isConnected" class="authentication-required" acord--tooltip-ignore-destroy :acord--tooltip-content="i18nFormat('EXTENSION_REQUIRES_AUTHENTICATION')">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
                <path fill="currentColor" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-9.208V16h2v-3.208a2.5 2.5 0 1 0-2 0z"/>
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
                  <div v-if="!hideControls" class="controls">
                    <div class="control" @click="onUpdateExtension" acord--tooltip-ignore-destroy :acord--tooltip-content="i18nFormat('UPDATE_EXTENSION')">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                        <path fill="currentColor" d="M5.463 4.433A9.961 9.961 0 0 1 12 2c5.523 0 10 4.477 10 10 0 2.136-.67 4.116-1.81 5.74L17 12h3A8 8 0 0 0 6.46 6.228l-.997-1.795zm13.074 15.134A9.961 9.961 0 0 1 12 22C6.477 22 2 17.523 2 12c0-2.136.67-4.116 1.81-5.74L7 12H4a8 8 0 0 0 13.54 5.772l.997 1.795z"/>
                      </svg>
                    </div>
                    <div class="control uninstall" @click="onUninstallExtension">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                        <path fill="currentColor" d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-9 3h2v6H9v-6zm4 0h2v6h-2v-6zM9 4v2h6V4H9z"/>
                      </svg>
                    </div>
                    <div class="control" @click="onToggleExtension" acord--tooltip-ignore-destroy :acord--tooltip-content="i18nFormat(enabled ? 'DISABLE_EXTENSION' : 'ENABLE_EXTENSION')">
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
              enabled: !!extensions_default.storage.installed.ghost[this.id]?.config?.enabled,
              isConnected: false
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
              this.$forceUpdate();
            },
            onExtensionUnloaded({ id }) {
              if (id === this.id) {
                this.configCache = null;
                this.expanded = false;
              }
              this.$forceUpdate();
            },
            onToggleExtension() {
              let enabled = !!extensions_default.storage.installed.ghost[this.id]?.config?.enabled;
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
            async onUpdateExtension() {
              let success = await extensions_default.update(this.id);
              success ? ui_default.toasts.show.success(i18n_default.format("EXTENSION_UPDATED")) : ui_default.toasts.show.error(i18n_default.format("NO_UPDATE_AVAILABLE"));
            },
            onUninstallExtension() {
              extensions_default.uninstall(this.id);
            },
            onContextMenu(e) {
              ui_default.contextMenus.open(
                e,
                ui_default.contextMenus.build.menu([
                  {
                    label: i18n_default.format("COPY_ID"),
                    action: () => {
                      utils_default.copyText(this.id);
                    }
                  }
                ])
              );
            },
            onAuthenticationUpdate() {
              this.isConnected = !!authentication_default.token;
            }
          },
          props: ["id", "extension", "hideControls"],
          mounted() {
            this.configCache = extensions_default.__cache__.config[this.id];
            this.onAuthenticationUpdate();
            events_default.on("ExtensionLoaded", this.onExtensionLoaded);
            events_default.on("ExtensionUnloaded", this.onExtensionUnloaded);
            events_default.on("AuthenticationSuccess", this.onAuthenticationUpdate);
            events_default.on("AuthenticationFailure", this.onAuthenticationUpdate);
          },
          unmounted() {
            events_default.off("ExtensionLoaded", this.onExtensionLoaded);
            events_default.off("ExtensionUnloaded", this.onExtensionUnloaded);
            events_default.off("AuthenticationSuccess", this.onAuthenticationUpdate);
            events_default.off("AuthenticationFailure", this.onAuthenticationUpdate);
          }
        }
      );
    }
  };

  // src/ui/home/vue/components/components/cards/inventory/inventory-badge-feature-card/style.scss
  var style_default24 = `
.acord--inventory-badge-feature-card{width:100%}.acord--inventory-badge-feature-card>.content{--outline-color: #949ba4;width:100%;background-color:rgba(0,0,0,.1);border-radius:8px;display:flex;flex-direction:column;position:relative;border:2px solid var(--outline-color)}.acord--inventory-badge-feature-card>.content.enabled{--outline-color: #5662f6}.acord--inventory-badge-feature-card>.content>.top{background-color:rgba(0,0,0,.1);border-radius:8px;width:100%;padding:16px;height:128px;display:flex;justify-content:space-between}.acord--inventory-badge-feature-card>.content>.top>.left{display:flex;height:100%;gap:16px}.acord--inventory-badge-feature-card>.content>.top>.left>.left{height:100%;display:flex;align-items:center;justify-content:center}.acord--inventory-badge-feature-card>.content>.top>.left>.left .template{width:64px;height:64px;border-radius:50%;background-color:var(--outline-color);display:flex;align-items:center;justify-content:center}.acord--inventory-badge-feature-card>.content>.top>.left>.left .template img{width:32px;height:32px;filter:drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.25))}.acord--inventory-badge-feature-card>.content>.top>.left>.right{display:flex;flex-direction:column}.acord--inventory-badge-feature-card>.content>.top>.left>.right>.name{font-size:24px;font-weight:500;color:#f5f5f5;opacity:.95}.acord--inventory-badge-feature-card>.content>.top>.left>.right>.duration{font-size:12px;font-weight:300;color:#f5f5f5;opacity:.75}.acord--inventory-badge-feature-card>.content>.top>.right{display:flex;flex-direction:column;justify-content:space-between;gap:8px;height:100%}.acord--inventory-badge-feature-card>.content>.top>.right>.top{display:flex;justify-content:flex-end}.acord--inventory-badge-feature-card>.content>.top>.right>.top .control{display:flex;padding:8px;background-color:rgba(0,0,0,.25);border-radius:8px;color:#f5f5f5;cursor:pointer}.acord--inventory-badge-feature-card>.content>.top>.right>.top .control:hover{background-color:rgba(0,0,0,.5)}`;

  // src/ui/home/vue/components/components/cards/inventory/inventory-badge-feature-card/index.js
  patcher_default.injectCSS(style_default24);
  var inventory_badge_feature_card_default = {
    /** @param {import("vue").App} vueApp */
    load(vueApp) {
      vueApp.component(
        "inventory-badge-feature-card",
        {
          template: `
          <div class="acord--inventory-badge-feature-card">
            <div class="content" :class="{'enabled': feature.enabled, 'selected': selected}">
              <div class="top">
                <div class="left">
                  <div class="left">
                    <div class="template">
                      <img :src="fetched?.image" />
                    </div>
                  </div>
                  <div class="right">
                    <div class="name">{{i18nFormat('INVENTORY_BADGE_FEATURE', i18nFormat(fetched?.display_name ?? 'LOADING'))}}</div>
                    <div v-if="durationText" class="duration">{{i18nFormat('ENDS_IN', durationText)}}</div>
                  </div>
                </div>
                <div class="right">
                  <div class="top">
                    <div class="control" @click="toggleEnabled">
                      <svg v-if="!feature?.enabled" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                        <path fill="currentColor" d="M8 7a5 5 0 1 0 0 10h8a5 5 0 0 0 0-10H8zm0-2h8a7 7 0 0 1 0 14H8A7 7 0 0 1 8 5zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                      </svg>
                      <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                        <path fill="currentColor" d="M8 5h8a7 7 0 0 1 0 14H8A7 7 0 0 1 8 5zm8 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `,
          props: ["feature", "selected"],
          data() {
            return {
              fetched: null,
              settingsVisible: false,
              settingsLoading: false,
              durationText: ""
            };
          },
          methods: {
            async fetch() {
              if (this.feature.durations)
                this.durationText = common_default2.moment.duration(this.feature.durations.end - this.feature.durations.now).locale(i18n_default.locale).humanize();
              this.fetched = (await (await fetch(`https://api.acord.app/feature/badge/${this.feature.feature_id}`)).json()).data;
            },
            i18nFormat: i18n_default.format,
            async toggleEnabled() {
              if (this.settingsLoading)
                return;
              this.settingsLoading = true;
              let newState = !this.feature.enabled;
              await fetch(
                `https://api.acord.app/user/@me/profile/item/${this.feature.id}?role_connection_id=${this.feature.role_connection_id}`,
                {
                  method: "PATCH",
                  headers: {
                    "x-acord-token": authentication_default.token,
                    "content-type": "application/json"
                  },
                  body: JSON.stringify({
                    enabled: newState
                  })
                }
              );
              this.settingsLoading = false;
              events_default.emit("InventoryFeatureUpdate", { ...this.feature, enabled: newState });
            }
          },
          watch: {
            feature() {
              this.fetch();
            }
          },
          mounted() {
            this.fetch();
          }
        }
      );
    }
  };

  // src/ui/home/vue/components/components/cards/inventory/inventory-colored-name-feature-card/style.scss
  var style_default25 = `
.acord--inventory-colored-name-feature-card{width:100%}.acord--inventory-colored-name-feature-card>.content{--outline-color: #949ba4;width:100%;background-color:rgba(0,0,0,.1);border-radius:8px;display:flex;flex-direction:column;position:relative;border:2px solid var(--outline-color)}.acord--inventory-colored-name-feature-card>.content>.template{position:absolute;width:192px;height:24px;right:16px;top:-12px;border-radius:8px;display:flex;align-items:center;justify-content:center;text-shadow:0px 2px 4px rgba(0,0,0,.4);font-weight:600;background-color:var(--outline-color)}.acord--inventory-colored-name-feature-card>.content>.template>.colored{-webkit-background-clip:text !important;-webkit-text-fill-color:rgba(0,0,0,0) !important}.acord--inventory-colored-name-feature-card>.content.enabled{--outline-color: #5662f6}.acord--inventory-colored-name-feature-card>.content>.top{background-color:rgba(0,0,0,.1);border-radius:8px;width:100%;padding:16px;height:128px;display:flex;justify-content:space-between}.acord--inventory-colored-name-feature-card>.content>.top>.left{height:100%}.acord--inventory-colored-name-feature-card>.content>.top>.left>.name{font-size:24px;font-weight:500;color:#f5f5f5;opacity:.95}.acord--inventory-colored-name-feature-card>.content>.top>.left>.duration{font-size:12px;font-weight:300;color:#f5f5f5;opacity:.75}.acord--inventory-colored-name-feature-card>.content>.top>.right{display:flex;flex-direction:column;justify-content:space-between;gap:8px;height:100%}.acord--inventory-colored-name-feature-card>.content>.top>.right>.top{display:flex;justify-content:flex-end}.acord--inventory-colored-name-feature-card>.content>.top>.right>.top .control{display:flex;padding:8px;background-color:rgba(0,0,0,.25);border-radius:8px;color:#f5f5f5;cursor:pointer}.acord--inventory-colored-name-feature-card>.content>.top>.right>.top .control:hover{background-color:rgba(0,0,0,.5)}.acord--inventory-colored-name-feature-card>.content>.top>.right>.bottom{display:flex;justify-content:flex-end}.acord--inventory-colored-name-feature-card>.content>.top>.right>.bottom>.settings{display:flex;align-items:center;justify-content:flex-end;cursor:pointer;font-weight:300;color:rgba(255,255,255,.75);gap:8px;font-size:14px}.acord--inventory-colored-name-feature-card>.content>.top>.right>.bottom>.settings svg{padding:4px;background-color:rgba(0,0,0,.25);border-radius:4px;color:#fff}.acord--inventory-colored-name-feature-card>.content>.settings{padding:16px;display:flex;flex-direction:column;gap:8px}.acord--inventory-colored-name-feature-card>.content>.settings.loading{opacity:.5;pointer-events:none}.acord--inventory-colored-name-feature-card>.content>.settings>.controls{display:flex;gap:8px}.acord--inventory-colored-name-feature-card>.content>.settings>.controls .button{padding:4px 8px;background-color:rgba(0,0,0,.25);border-radius:4px;font-size:14px;color:#f5f5f5;cursor:pointer}.acord--inventory-colored-name-feature-card>.content>.settings>.controls .button.disabled{opacity:.5;pointer-events:none}.acord--inventory-colored-name-feature-card>.content>.settings>.colors{display:flex;flex-direction:column;gap:8px}.acord--inventory-colored-name-feature-card>.content>.settings>.colors .color{display:flex;align-items:center;gap:8px}.acord--inventory-colored-name-feature-card>.content>.settings>.colors .color .color-input{padding:0;border-radius:50%;width:32px;height:32px;cursor:pointer}.acord--inventory-colored-name-feature-card>.content>.settings>.colors .color .color-input::-webkit-color-swatch-wrapper{padding:0;border:none;border-radius:50%}.acord--inventory-colored-name-feature-card>.content>.settings>.colors .color .percentage-input{padding:4px 8px;background-color:rgba(0,0,0,.25);border-radius:4px;color:#f5f5f5;width:36px;border:none;border-bottom:2px solid #f5f5f5}.acord--inventory-colored-name-feature-card>.content>.settings>.colors .color .remove{display:flex;cursor:pointer}.acord--inventory-colored-name-feature-card>.content>.settings>.colors .color .remove svg{color:rgba(245,245,245,.95);width:24px;height:24px}.acord--inventory-colored-name-feature-card>.content>.settings>.colors .color .remove:hover svg{color:#f23f42}.acord--inventory-colored-name-feature-card>.content>.settings>.colors .color .remove.disabled{opacity:.5;pointer-events:none}`;

  // src/ui/home/vue/components/components/cards/inventory/inventory-colored-name-feature-card/index.js
  patcher_default.injectCSS(style_default25);
  var inventory_colored_name_feature_card_default = {
    /** @param {import("vue").App} vueApp */
    load(vueApp) {
      vueApp.component(
        "inventory-colored-name-feature-card",
        {
          template: `
          <div class="acord--inventory-colored-name-feature-card">
            <div class="content" :class="{'enabled': feature.enabled, 'selected': selected}">
              <div class="template">
                <div class="colored" :style="feature?.data ? \`\${feature.data.points.length === 1 ? \`background-color: \${feature.data.points[0].color};\` : \`background-image: \${feature.data.type}-gradient(\${feature.data.angle}, \${feature.data.points.map(i => \`\${i.color}\${i.percentage ? \` \${i.percentage}%\` : ''}\`).join(', ')}\`}\` : ''">{{i18nFormat('COLORED_NAME')}}</div>
              </div>
              <div class="top">
                <div class="left">
                  <div class="name">{{i18nFormat('COLORED_NAME')}}</div>
                  <div v-if="durationText" class="duration">{{i18nFormat('ENDS_IN', durationText)}}</div>
                </div>
                <div class="right">
                  <div class="top">
                    <div class="control" @click="toggleEnabled">
                      <svg v-if="!feature?.enabled" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                        <path fill="currentColor" d="M8 7a5 5 0 1 0 0 10h8a5 5 0 0 0 0-10H8zm0-2h8a7 7 0 0 1 0 14H8A7 7 0 0 1 8 5zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                      </svg>
                      <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                        <path fill="currentColor" d="M8 5h8a7 7 0 0 1 0 14H8A7 7 0 0 1 8 5zm8 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                      </svg>
                    </div>
                  </div>
                  <div class="bottom">
                    <div class="settings" @click="settingsVisible = !settingsVisible">
                      <div class="text">{{i18nFormat(settingsVisible ? 'HIDE_SETTINGS' : 'SHOW_SETTINGS')}}</div>
                      <svg v-if="!settingsVisible" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path fill="currentColor" d="M12 15l-4.243-4.243 1.415-1.414L12 12.172l2.828-2.829 1.415 1.414z"/>
                      </svg>
                      <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path fill="currentColor" d="M12 11.828l-2.828 2.829-1.415-1.414L12 9l4.243 4.243-1.415 1.414L12 11.828z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div class="settings" v-if="settingsVisible" :class="{'loading': settingsLoading}">
                <div class="controls">
                  <div class="button" :class="{disabled: points.length >= feature.data.max_points}" @click="addColor">{{i18nFormat("ADD_COLOR")}}</div>
                  <div class="button" @click="fixPercentages">{{i18nFormat("FIX_PERCENTAGES")}}</div>
                  <div class="button" @click="resetPercentages">{{i18nFormat("RESET_PERCENTAGES")}}</div>
                </div>
                <div class="colors">
                  <div class="color" v-for="(point, idx) in points" :key="idx">
                    <input v-model="point.color" type="color" class="color-input" />
                    <input v-model="point.percentage" type="number" step="0.05" class="percentage-input" max="100" min="0" />
                    <div class="remove" :class="{disabled: points.length <= 1}" @click="removeColor(idx)">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `,
          props: ["feature", "selected"],
          data() {
            return {
              durationText: "",
              settingsLoading: false,
              settingsVisible: false,
              ignoreUpdateOnce: false,
              points: []
            };
          },
          mounted() {
            this.updateDuration();
            this.syncPoints();
          },
          watch: {
            feature() {
              this.updateDuration();
              this.syncPoints();
            },
            points: {
              deep: true,
              handler() {
                this.saveFeature();
              }
            }
          },
          methods: {
            i18nFormat: i18n_default.format,
            async toggleEnabled() {
              if (this.settingsLoading)
                return;
              this.settingsLoading = true;
              let newState = !this.feature.enabled;
              await fetch(
                `https://api.acord.app/user/@me/profile/item/${this.feature.id}`,
                {
                  method: "PATCH",
                  headers: {
                    "x-acord-token": authentication_default.token,
                    "content-type": "application/json"
                  },
                  body: JSON.stringify({
                    enabled: newState
                  })
                }
              );
              this.settingsLoading = false;
              events_default.emit("InventoryFeatureUpdate", { ...this.feature, enabled: newState });
              this.syncPoints();
            },
            removeColor(idx) {
              this.points.splice(idx, 1);
              this.points = [...this.points];
              this.saveFeature();
            },
            addColor() {
              if (this.points.length >= this.feature.data.max_points)
                return;
              this.points.push({
                color: "#ffffff",
                percentage: 0
              });
              this.saveFeature();
            },
            fixPercentages() {
              let totalPoints = this.points.length;
              if (totalPoints === 0) {
                return;
              }
              let maxPoints = this.feature.data.max_points;
              let amount = Math.floor(maxPoints / totalPoints);
              let remainingAmount = maxPoints % totalPoints;
              let v = amount;
              this.points.forEach((point, idx) => {
                let additionalAmount = remainingAmount > 0 ? 1 : 0;
                let currentAmount = amount + additionalAmount;
                let percentage = parseFloat(((v + currentAmount) * 100 / maxPoints).toFixed(2));
                if (percentage > 100) {
                  currentAmount -= percentage - 100;
                }
                point.percentage = parseFloat((v * 100 / maxPoints).toFixed(2));
                v += currentAmount;
                remainingAmount--;
              });
              this.saveFeature();
            },
            resetPercentages() {
              this.points.forEach((point, idx) => {
                point.percentage = 0;
              });
              this.saveFeature();
            },
            updateDuration() {
              this.durationText = common_default2.moment.duration(this.feature.durations.end - this.feature.durations.now).locale(i18n_default.locale).humanize();
            },
            saveFeature: _.debounce(async function() {
              if (this.ignoreUpdateOnce) {
                this.ignoreUpdateOnce = false;
                return;
              }
              if (this.settingsLoading)
                return;
              this.settingsLoading = true;
              await fetch(
                `https://api.acord.app/user/@me/profile/item/${this.feature.id}`,
                {
                  method: "PATCH",
                  headers: {
                    "x-acord-token": authentication_default.token,
                    "content-type": "application/json"
                  },
                  body: JSON.stringify({
                    points: this.points
                  })
                }
              );
              this.settingsLoading = false;
              this.ignoreUpdateOnce = true;
              events_default.emit("InventoryFeatureUpdate", { ...this.feature, data: { ...this.feature.data, points: this.points } });
            }, 1e3),
            syncPoints() {
              this.points = [...this.feature.data.points];
              if (this.points.find((i) => i.percentage === null)) {
                this.fixPercentages();
              }
            }
          }
        }
      );
    }
  };

  // src/ui/home/vue/components/components/cards/inventory/inventory-hat-feature-card/style.scss
  var style_default26 = `
.acord--inventory-hat-feature-card{width:100%}.acord--inventory-hat-feature-card>.content{--outline-color: #949ba4;width:100%;background-color:rgba(0,0,0,.1);border-radius:8px;display:flex;flex-direction:column;position:relative;border:2px solid var(--outline-color)}.acord--inventory-hat-feature-card>.content.enabled{--outline-color: #5662f6}.acord--inventory-hat-feature-card>.content>.top{background-color:rgba(0,0,0,.1);border-radius:8px;width:100%;padding:16px;height:128px;display:flex;justify-content:space-between}.acord--inventory-hat-feature-card>.content>.top>.left{display:flex;height:100%;gap:16px}.acord--inventory-hat-feature-card>.content>.top>.left>.left{height:100%;display:flex;align-items:center;justify-content:center;width:64px}.acord--inventory-hat-feature-card>.content>.top>.left>.left .template{width:48px;height:48px;background-color:var(--outline-color);border-radius:50%}.acord--inventory-hat-feature-card>.content>.top>.left>.left .template::before{content:"";width:96px;height:96px;z-index:99;background:var(--hat-image) center/cover;transform:translate(-24px, -24px);position:absolute;pointer-events:none}.acord--inventory-hat-feature-card>.content>.top>.left>.right{display:flex;flex-direction:column}.acord--inventory-hat-feature-card>.content>.top>.left>.right>.name{font-size:24px;font-weight:500;color:#f5f5f5;opacity:.95}.acord--inventory-hat-feature-card>.content>.top>.left>.right>.duration{font-size:12px;font-weight:300;color:#f5f5f5;opacity:.75}.acord--inventory-hat-feature-card>.content>.top>.right{display:flex;flex-direction:column;justify-content:space-between;gap:8px;height:100%}.acord--inventory-hat-feature-card>.content>.top>.right>.top{display:flex;justify-content:flex-end}.acord--inventory-hat-feature-card>.content>.top>.right>.top .control{display:flex;padding:8px;background-color:rgba(0,0,0,.25);border-radius:8px;color:#f5f5f5;cursor:pointer}.acord--inventory-hat-feature-card>.content>.top>.right>.top .control:hover{background-color:rgba(0,0,0,.5)}`;

  // src/ui/home/vue/components/components/cards/inventory/inventory-hat-feature-card/index.js
  patcher_default.injectCSS(style_default26);
  var inventory_hat_feature_card_default = {
    /** @param {import("vue").App} vueApp */
    load(vueApp) {
      vueApp.component(
        "inventory-hat-feature-card",
        {
          template: `
          <div class="acord--inventory-hat-feature-card">
            <div class="content" :class="{'enabled': feature.enabled, 'selected': selected}">
              <div class="top">
                <div class="left">
                  <div class="left">
                    <div class="template" :style="\`--hat-image: url('\${fetched?.image}');\`"></div>
                  </div>
                  <div class="right">
                    <div class="name">{{i18nFormat('INVENTORY_HAT_FEATURE', i18nFormat(fetched?.display_name ?? 'LOADING'))}}</div>
                    <div v-if="durationText" class="duration">{{i18nFormat('ENDS_IN', durationText)}}</div>
                  </div>
                </div>
                <div class="right">
                  <div class="top">
                    <div class="control" @click="toggleEnabled">
                      <svg v-if="!feature?.enabled" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                        <path fill="currentColor" d="M8 7a5 5 0 1 0 0 10h8a5 5 0 0 0 0-10H8zm0-2h8a7 7 0 0 1 0 14H8A7 7 0 0 1 8 5zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                      </svg>
                      <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                        <path fill="currentColor" d="M8 5h8a7 7 0 0 1 0 14H8A7 7 0 0 1 8 5zm8 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `,
          props: ["feature", "selected"],
          data() {
            return {
              fetched: null,
              settingsVisible: false,
              settingsLoading: false,
              durationText: ""
            };
          },
          methods: {
            async fetch() {
              this.durationText = common_default2.moment.duration(this.feature.durations.end - this.feature.durations.now).locale(i18n_default.locale).humanize();
              this.fetched = (await (await fetch(`https://api.acord.app/feature/hat/${this.feature.feature_id}`)).json()).data;
            },
            i18nFormat: i18n_default.format,
            async toggleEnabled() {
              if (this.settingsLoading)
                return;
              this.settingsLoading = true;
              let newState = !this.feature.enabled;
              await fetch(
                `https://api.acord.app/user/@me/profile/item/${this.feature.id}`,
                {
                  method: "PATCH",
                  headers: {
                    "x-acord-token": authentication_default.token,
                    "content-type": "application/json"
                  },
                  body: JSON.stringify({
                    enabled: newState
                  })
                }
              );
              this.settingsLoading = false;
              events_default.emit("InventoryFeatureUpdate", { ...this.feature, enabled: newState });
            }
          },
          watch: {
            feature() {
              this.fetch();
            }
          },
          mounted() {
            this.fetch();
          }
        }
      );
    }
  };

  // src/ui/home/vue/components/components/cards/inventory/inventory-profile-music-feature-card/style.scss
  var style_default27 = `
.acord--inventory-profile-music-feature-card{width:100%}.acord--inventory-profile-music-feature-card>.content{--outline-color: #949ba4;width:100%;background-color:rgba(0,0,0,.1);border-radius:8px;display:flex;flex-direction:column;position:relative;border:2px solid var(--outline-color)}.acord--inventory-profile-music-feature-card>.content.enabled{--outline-color: #5662f6}.acord--inventory-profile-music-feature-card>.content>.top{background-color:rgba(0,0,0,.1);border-radius:8px;width:100%;padding:16px;height:128px;display:flex;justify-content:space-between}.acord--inventory-profile-music-feature-card>.content>.top>.left{display:flex;height:100%;gap:16px}.acord--inventory-profile-music-feature-card>.content>.top>.left>.left{height:100%;display:flex;align-items:center;justify-content:center}.acord--inventory-profile-music-feature-card>.content>.top>.left>.left .template{width:64px;height:64px;border-radius:50%;background-color:var(--outline-color);display:flex;align-items:center;justify-content:center}.acord--inventory-profile-music-feature-card>.content>.top>.left>.left .template>.spotify-action{background-color:rgba(0,0,0,.25);border-radius:50%;padding:8px;display:flex;align-items:center;justify-content:center;color:var(--header-primary);cursor:pointer;transition:all 100ms ease-in-ou}.acord--inventory-profile-music-feature-card>.content>.top>.left>.left .template>.spotify-action.disabled{opacity:.5;cursor:not-allowed;pointer-events:none}.acord--inventory-profile-music-feature-card>.content>.top>.left>.right{display:flex;flex-direction:column}.acord--inventory-profile-music-feature-card>.content>.top>.left>.right>.name{font-size:24px;font-weight:500;color:#f5f5f5;opacity:.95}.acord--inventory-profile-music-feature-card>.content>.top>.left>.right>.duration{font-size:12px;font-weight:300;color:#f5f5f5;opacity:.75}.acord--inventory-profile-music-feature-card>.content>.top>.right{display:flex;flex-direction:column;justify-content:space-between;gap:8px;height:100%}.acord--inventory-profile-music-feature-card>.content>.top>.right>.top{display:flex;justify-content:flex-end}.acord--inventory-profile-music-feature-card>.content>.top>.right>.top .control{display:flex;padding:8px;background-color:rgba(0,0,0,.25);border-radius:8px;color:#f5f5f5;cursor:pointer}.acord--inventory-profile-music-feature-card>.content>.top>.right>.top .control:hover{background-color:rgba(0,0,0,.5)}.acord--inventory-profile-music-feature-card>.content>.top>.right>.bottom{display:flex;justify-content:flex-end}.acord--inventory-profile-music-feature-card>.content>.top>.right>.bottom>.settings{display:flex;align-items:center;justify-content:flex-end;cursor:pointer;font-weight:300;color:rgba(255,255,255,.75);gap:8px;font-size:14px}.acord--inventory-profile-music-feature-card>.content>.top>.right>.bottom>.settings svg{padding:4px;background-color:rgba(0,0,0,.25);border-radius:4px;color:#fff}.acord--inventory-profile-music-feature-card>.content>.settings{padding:16px;display:flex;flex-direction:column;gap:8px}.acord--inventory-profile-music-feature-card>.content>.settings .line>.label{font-size:14px;font-weight:300;color:rgba(255,255,255,.95)}.acord--inventory-profile-music-feature-card>.content>.settings .line input{padding:4px 8px;background-color:rgba(0,0,0,.25);border-radius:4px;color:#f5f5f5;width:350px;border:none;border-bottom:2px solid #f5f5f5}.acord--inventory-profile-music-feature-card>.content>.settings .line input.error{border-bottom:2px solid #f23f42}`;

  // src/ui/other/utils/spotify.js
  async function playSpotifyData(data) {
    try {
      let oldState = await utils_default.spotify.request("GET", "/me/player");
      let volumeChanged = false;
      if (data.volume_percent) {
        let targetVolume = Math.min(data.volume_percent, oldState.device.volume_percent);
        if (targetVolume !== oldState.device.volume_percent) {
          volumeChanged = true;
          await utils_default.spotify.request(
            "PUT",
            "/me/player/volume",
            {
              volume_percent: targetVolume
            }
          );
        }
      }
      await utils_default.spotify.request("POST", "/me/player/queue?uri=" + data.uri);
      await utils_default.spotify.request("POST", "/me/player/next");
      await utils_default.spotify.request("PUT", "/me/player/seek?position_ms=" + data.position_ms);
      return async () => {
        if (volumeChanged) {
          await utils_default.spotify.request(
            "PUT",
            "/me/player/volume",
            {
              volume_percent: oldState.device.volume_percent
            }
          );
        }
        if (oldState) {
          await utils_default.spotify.request("POST", "/me/player/queue?uri=" + oldState.item.uri);
          await utils_default.spotify.request("POST", "/me/player/next");
          await utils_default.spotify.request("PUT", "/me/player/seek?position_ms=" + oldState.progress_ms);
          if (!oldState.is_playing) {
            await utils_default.spotify.request("PUT", "/me/player/pause#").catch(console.log);
          }
        }
      };
    } catch (e) {
      console.log(e);
      return () => {
      };
    }
  }

  // src/ui/home/vue/components/components/cards/inventory/inventory-profile-music-feature-card/index.js
  patcher_default.injectCSS(style_default27);
  var inventory_profile_music_feature_card_default = {
    /** @param {import("vue").App} vueApp */
    load(vueApp) {
      vueApp.component(
        "inventory-profile-music-feature-card",
        {
          template: `
          <div class="acord--inventory-profile-music-feature-card">
            <div class="content" :class="{'enabled': feature.enabled, 'selected': selected}">
              <div class="top">
                <div class="left">
                  <div class="left">
                    <div class="template">
                      <div @click="spotifyAction" v-if="feature?.data" class="spotify-action" :class="{'disabled': spotifyLoading}">
                        <svg v-if="!spotifyPlaying" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                          <path fill="currentColor" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM10.622 8.415l4.879 3.252a.4.4 0 0 1 0 .666l-4.88 3.252a.4.4 0 0 1-.621-.332V8.747a.4.4 0 0 1 .622-.332z"/>
                        </svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                          <path fill="currentColor" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM9 9h2v6H9V9zm4 0h2v6h-2V9z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div class="right">
                    <div class="name">{{i18nFormat('INVENTORY_PROFILE_MUSIC_FEATURE')}}</div>
                    <div v-if="durationText" class="duration">{{i18nFormat('ENDS_IN', durationText)}}</div>
                  </div>
                </div>
                <div class="right">
                  <div class="top">
                    <div class="control" @click="toggleEnabled">
                      <svg v-if="!feature?.enabled" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                        <path fill="currentColor" d="M8 7a5 5 0 1 0 0 10h8a5 5 0 0 0 0-10H8zm0-2h8a7 7 0 0 1 0 14H8A7 7 0 0 1 8 5zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                      </svg>
                      <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                        <path fill="currentColor" d="M8 5h8a7 7 0 0 1 0 14H8A7 7 0 0 1 8 5zm8 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                      </svg>
                    </div>
                  </div>
                  <div class="bottom">
                    <div class="settings" @click="settingsVisible = !settingsVisible">
                      <div class="text">{{i18nFormat(settingsVisible ? 'HIDE_SETTINGS' : 'SHOW_SETTINGS')}}</div>
                      <svg v-if="!settingsVisible" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path fill="currentColor" d="M12 15l-4.243-4.243 1.415-1.414L12 12.172l2.828-2.829 1.415 1.414z"/>
                      </svg>
                      <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path fill="currentColor" d="M12 11.828l-2.828 2.829-1.415-1.414L12 9l4.243 4.243-1.415 1.414L12 11.828z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div class="settings" v-if="settingsVisible" :class="{'loading': settingsLoading}">
                <div class="line">
                  <div class="label">{{i18nFormat('SPOTIFY_TRACK_LINK')}}:</div>
                  <input v-model="trackLinkInputText" type="text" class="info-input" :class="{'error': trackLinkInputError}" placeholder="https://open.spotify.com/track/1234" />
                </div>
                <div class="line">
                  <div class="label">{{i18nFormat('TRACK_START_POSITION_SECONDS')}}:</div>
                  <input v-model="trackPositionInputText" type="number" step="0.5" class="info-input" :class="{'error': trackPositionInputError}" placeholder="45" />
                </div>
              </div>
            </div>
          </div>
        `,
          props: ["feature", "selected"],
          data() {
            return {
              spotifyPlaying: false,
              spotifyLoading: false,
              _pauseSpotify: null,
              durationText: "",
              settingsVisible: false,
              settingsLoading: false,
              trackLinkInputText: "",
              trackLinkInputError: false,
              trackPositionInputText: "0",
              trackPositionInputError: false
            };
          },
          mounted() {
            this.updateSelfData();
          },
          watch: {
            feature() {
              this.updateSelfData();
            },
            trackLinkInputText(val) {
              this.trackLinkInputError = !val.startsWith("https://open.spotify.com/track/");
              if (!this.trackLinkInputError) {
                let id = val.split("?")[0].split("/").pop().trim();
                this.trackLinkInputText = `https://open.spotify.com/track/${id}`;
                this.debouncedTrackLinkInputText(id);
              }
            },
            trackPositionInputText(val) {
              if (!val) {
                this.trackPositionInputText = `0`;
                return;
              }
              let num = parseFloat(this.trackPositionInputText);
              this.trackPositionInputText = `${num}`;
              if (isNaN(num) || num < 0) {
                this.trackPositionInputError = true;
                return;
              }
              this.trackPositionInputError = false;
              this.debouncedTrackPositionInputText(num);
            }
          },
          methods: {
            i18nFormat: i18n_default.format,
            async spotifyAction() {
              if (this._pauseSpotify) {
                this.pauseSpotify();
              } else {
                this.playSpotify();
              }
            },
            async playSpotify() {
              this.spotifyLoading = true;
              this._pauseSpotify = await playSpotifyData(this.feature.data);
              this.spotifyPlaying = true;
              this.spotifyLoading = false;
            },
            async pauseSpotify() {
              this.spotifyLoading = true;
              if (this._pauseSpotify) {
                await this._pauseSpotify();
                this._pauseSpotify = null;
                this.spotifyPlaying = false;
              }
              this.spotifyLoading = false;
            },
            updateDuration() {
              this.durationText = common_default2.moment.duration(this.feature.durations.end - this.feature.durations.now).locale(i18n_default.locale).humanize();
            },
            async toggleEnabled() {
              if (this.settingsLoading)
                return;
              this.settingsLoading = true;
              let newState = !this.feature.enabled;
              await fetch(
                `https://api.acord.app/user/@me/profile/item/${this.feature.id}`,
                {
                  method: "PATCH",
                  headers: {
                    "x-acord-token": authentication_default.token,
                    "content-type": "application/json"
                  },
                  body: JSON.stringify({
                    enabled: newState
                  })
                }
              );
              this.settingsLoading = false;
              events_default.emit("InventoryFeatureUpdate", { ...this.feature, enabled: newState });
            },
            updateSelfData() {
              this.updateDuration();
              let id = this.feature.data.uri.split(":").pop().trim();
              if (id)
                this.trackLinkInputText = `https://open.spotify.com/track/${id}`;
              this.trackPositionInputText = `${Math.floor(this.feature.data.position_ms / 1e3)}`;
            },
            debouncedTrackPositionInputText: _.debounce(async function(num) {
              this.settingsLoading = true;
              await fetch(
                `https://api.acord.app/user/@me/profile/item/${this.feature.id}`,
                {
                  method: "PATCH",
                  headers: {
                    "x-acord-token": authentication_default.token,
                    "content-type": "application/json"
                  },
                  body: JSON.stringify({
                    position_ms: num * 1e3
                  })
                }
              );
              this.settingsLoading = false;
              events_default.emit("InventoryFeatureUpdate", { ...this.feature, data: { ...this.feature.data, position_ms: num * 1e3 } });
            }, 1500),
            debouncedTrackLinkInputText: _.debounce(async function(id) {
              this.settingsLoading = true;
              await fetch(
                `https://api.acord.app/user/@me/profile/item/${this.feature.id}`,
                {
                  method: "PATCH",
                  headers: {
                    "x-acord-token": authentication_default.token,
                    "content-type": "application/json"
                  },
                  body: JSON.stringify({
                    uri: `spotify:track:${id}`
                  })
                }
              );
              this.settingsLoading = false;
              events_default.emit("InventoryFeatureUpdate", { ...this.feature, data: { ...this.feature.data, uri: `spotify:track:${id}` } });
            }, 1500)
          }
        }
      );
    }
  };

  // src/ui/home/vue/components/components/cards/inventory/index.js
  var inventory_default = {
    /** @param {import("vue").App} vueApp */
    load(vueApp) {
      inventory_colored_name_feature_card_default.load(vueApp);
      inventory_hat_feature_card_default.load(vueApp);
      inventory_profile_music_feature_card_default.load(vueApp);
      inventory_badge_feature_card_default.load(vueApp);
    }
  };

  // src/ui/home/vue/components/components/cards/profile-card/style.scss
  var style_default28 = `
.acord--profile-card{filter:drop-shadow(var(--elevation-medium));width:auto}.acord--profile-card>.container{display:flex;align-items:center;justify-content:center;--h: 160px;height:var(--h);width:400px;background-color:rgba(0,0,0,.1);border-radius:4px;box-shadow:var(--elevation-medium)}.acord--profile-card>.container>.left,.acord--profile-card>.container>.right{position:relative;display:flex;align-items:center;justify-content:center;height:var(--h)}.acord--profile-card>.container>.left{position:relative;width:100%}.acord--profile-card>.container>.left>.badges{position:absolute;top:8px;left:8px;display:flex;background-color:rgba(0,0,0,.1);border-radius:8px;padding:6px;gap:6px}.acord--profile-card>.container>.left>.badges .badge{width:16px;height:16px}.acord--profile-card>.container>.left>.spotify-action{position:absolute;bottom:8px;left:8px;background-color:rgba(0,0,0,.25);border-radius:50%;padding:8px;display:flex;align-items:center;justify-content:center;color:var(--header-primary);cursor:pointer;transition:all 100ms ease-in-ou}.acord--profile-card>.container>.left>.spotify-action.disabled{opacity:.5;cursor:not-allowed;pointer-events:none}.acord--profile-card>.container>.left .name-container{padding:0 16px;display:flex;align-items:center;justify-content:center}.acord--profile-card>.container>.left .name-container .name{font-size:28px;color:var(--header-primary);font-weight:600;text-shadow:0px 2px 4px rgba(0,0,0,.4)}.acord--profile-card>.container>.left .name-container .name.colored{-webkit-background-clip:text !important;-webkit-text-fill-color:rgba(0,0,0,0) !important}.acord--profile-card>.container>.right{padding:0 16px}.acord--profile-card>.container>.right>.avatar{background-size:cover;background-position:center;background-repeat:no-repeat;border-radius:50%;width:128px;height:128px;min-width:128px;min-height:128px}.acord--profile-card>.container>.right>.avatar::before{content:"";width:256px;height:256px;z-index:99;background:var(--hat-image) center/cover;transform:translate(-64px, -64px);position:absolute;pointer-events:none}`;

  // src/ui/home/vue/components/components/cards/profile-card/index.js
  patcher_default.injectCSS(style_default28);
  var profile_card_default = {
    /** @param {import("vue").App} vueApp */
    load(vueApp) {
      vueApp.component(
        "profile-card",
        {
          template: `
          <div class="acord--profile-card">
            <div class="container">
              <div class="left">
                <div v-if="badges.length" class="badges">
                  <img v-for="badge in badges" :key="badge.id" class="badge" :src="badge.image" />
                </div>
                <div @click="spotifyAction" v-if="musicData" class="spotify-action" :class="{'disabled': spotifyLoading}">
                  <svg v-if="!spotifyPlaying" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path fill="currentColor" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM10.622 8.415l4.879 3.252a.4.4 0 0 1 0 .666l-4.88 3.252a.4.4 0 0 1-.621-.332V8.747a.4.4 0 0 1 .622-.332z"/>
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path fill="currentColor" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM9 9h2v6H9V9zm4 0h2v6h-2V9z"/>
                  </svg>
                </div>
                <div class="name-container">
                  <div class="name" :class="{'colored': nameColorData}" :style="nameColorData ? \`\${nameColorData.points.length === 1 ? \`background-color: \${nameColorData.points[0].color};\` : \`background-image: \${nameColorData.type}-gradient(\${nameColorData.angle}, \${nameColorData.points.map(i => \`\${i.color}\${i.percentage ? \` \${i.percentage}%\` : ''}\`).join(', ')}\`}\` : ''">{{name}}</div>
                </div>
              </div>
              <div class="right">
                <div class="avatar" :style="\`background-image: url('\${avatarUrl}'); --hat-image: url('\${hatData?.image}')\`"></div>
              </div>
            </div>
          </div>
        `,
          props: ["nameColorData", "badges", "musicData", "name", "hatData", "avatarUrl"],
          data() {
            return {
              spotifyPlaying: false,
              spotifyLoading: false,
              _pauseSpotify: null
            };
          },
          methods: {
            i18nFormat: i18n_default.format,
            async spotifyAction() {
              if (this._pauseSpotify) {
                this.pauseSpotify();
              } else {
                this.playSpotify();
              }
            },
            async playSpotify() {
              this.spotifyLoading = true;
              this._pauseSpotify = await playSpotifyData(this.musicData);
              this.spotifyPlaying = true;
              this.spotifyLoading = false;
            },
            async pauseSpotify() {
              this.spotifyLoading = true;
              if (this._pauseSpotify) {
                await this._pauseSpotify();
                this._pauseSpotify = null;
                this.spotifyPlaying = false;
              }
              this.spotifyLoading = false;
            }
          }
        }
      );
    }
  };

  // src/ui/home/vue/components/components/cards/store-extension-card/style.scss
  var style_default29 = `
.acord--store-extension-card{width:275px;height:250px;display:flex;flex-direction:column;border-radius:4px;contain:content;background-color:rgba(0,0,0,.1);box-shadow:var(--elevation-medium)}.acord--store-extension-card>.preview{width:100%;height:100px;display:flex;flex-direction:column;justify-content:space-between;align-items:center;background-color:rgba(0,0,0,.1);background-position:center;background-size:cover}.acord--store-extension-card>.preview>.controls{padding:8px;display:flex;align-items:center;justify-content:space-between;width:100%}.acord--store-extension-card>.preview>.controls .go{background-color:rgba(0,0,0,.5);box-shadow:0px 0px 4px rgba(0,0,0,.5);border-radius:50%;width:24px;height:24px;display:flex;align-items:center;justify-content:center;color:var(--header-primary);font-weight:600;cursor:pointer}.acord--store-extension-card>.preview>.name-container{display:flex;align-items:center;justify-content:flex-start;color:var(--header-primary);padding:8px;width:100%}.acord--store-extension-card>.preview>.name-container>.name{font-size:10px;background-color:rgba(0,0,0,.5);padding:4px 8px;border-radius:9999px}.acord--store-extension-card>.info-container{display:flex;justify-content:space-between;flex-direction:column;padding:8px;height:150px;width:100%}.acord--store-extension-card>.info-container>.top{display:flex;flex-direction:column;gap:4px;height:100%}.acord--store-extension-card>.info-container>.top>.name-container{display:flex;align-items:flex-end;gap:4px;width:100%}.acord--store-extension-card>.info-container>.top>.name-container>.name{font-size:18px;font-weight:500;color:var(--header-primary)}.acord--store-extension-card>.info-container>.top>.name-container>.version{font-size:12px;font-weight:500;color:var(--header-primary);opacity:.5}.acord--store-extension-card>.info-container>.top>.description{font-size:14px;font-weight:300;color:var(--header-primary);opacity:.75;width:100%}.acord--store-extension-card>.info-container>.bottom{display:flex;align-items:flex-start;justify-content:space-between;height:100%}.acord--store-extension-card>.info-container>.bottom>.left{height:100%;display:flex;flex-direction:column;align-items:flex-start;justify-content:flex-end}.acord--store-extension-card>.info-container>.bottom>.left>.authors{display:flex;flex-direction:column;gap:4px}.acord--store-extension-card>.info-container>.bottom>.left>.authors .author{display:flex;align-items:center;border-radius:9999px;background-color:rgba(0,0,0,.1);cursor:pointer}.acord--store-extension-card>.info-container>.bottom>.left>.authors .author>.image{border-radius:50%;width:18px;height:18px;background-color:var(--brand-500);background-position:center;background-size:cover}.acord--store-extension-card>.info-container>.bottom>.left>.authors .author>.name{font-size:10px;font-weight:400;color:var(--header-primary);opacity:.75;padding:6px}.acord--store-extension-card>.info-container>.bottom>.right{height:100%;display:flex;flex-direction:column;align-items:flex-end;justify-content:flex-end}.acord--store-extension-card>.info-container>.bottom>.right>.controls{display:flex;align-items:center;gap:8px}.acord--store-extension-card>.info-container>.bottom>.right>.controls .control{display:flex;padding:8px;background-color:rgba(0,0,0,.25);border-radius:8px;color:#f5f5f5;cursor:pointer}.acord--store-extension-card>.info-container>.bottom>.right>.controls .control.disabled{opacity:.5;pointer-events:none}.acord--store-extension-card>.info-container>.bottom>.right>.controls .control:hover{background-color:rgba(0,0,0,.5)}.acord--store-extension-card>.info-container>.bottom>.right>.controls .control.uninstall:hover{color:#f23f42}`;

  // src/ui/home/vue/components/components/cards/store-extension-card/index.js
  patcher_default.injectCSS(style_default29);
  var store_extension_card_default = {
    /** @param {import("vue").App} vueApp */
    load(vueApp) {
      vueApp.component(
        "store-extension-card",
        {
          template: `
          <div class="acord--store-extension-card">
            <div v-if="extension.manifest.about.previews?.length" class="preview" :style="{ backgroundImage: 'url(' + extension.manifest.about.previews[selectedPreview].image + ')' }">
              <div class="controls">
                <div v-if="extension.manifest.about.previews.length > 1" class="go go-back" @click="goBack">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path d="M11.828 12l2.829 2.828-1.414 1.415L9 12l4.243-4.243 1.414 1.415L11.828 12z" fill="currentColor" />
                  </svg>
                </div>
                <div v-if="extension.manifest.about.previews.length > 1" class="go go-forward" @click="goForward">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path d="M12.172 12L9.343 9.172l1.414-1.415L15 12l-4.243 4.243-1.414-1.415z" fill="currentColor" />
                  </svg>
                </div>
              </div>
              <div class="name-container">
                <div class="name">
                  {{ i18nLocalize(extension.manifest.about.previews[selectedPreview].name) }}
                </div>
              </div>
            </div>
            <div v-else class="preview no-preview"></div>
            <div class="info-container">
              <div class="top">
                <div class="name-container">
                  <div class="name">{{ i18nLocalize(extension.manifest.about.name) }}</div>
                  <div class="version">v{{ extension.manifest.about.version }}</div>
                </div>
                <div class="description">{{ i18nLocalize(extension.manifest.about.description) }}</div>
              </div>
              <div class="bottom">
                <div class="left">
                  <div class="authors">
                    <div v-for="author in extension.manifest.about.authors" class="author" :key="author.name" @click="showProfile(author.id)">
                      <div class="image" :style="{ backgroundImage: 'url(' + getAuthorImage(author) + ')' }"></div>
                      <div class="name">{{ author.name }}</div>
                    </div>
                  </div>
                </div>
                <div class="right">
                  <div class="controls">
                    <div class="control" :class="{'uninstall': installed, 'disabled': installing}" @click="installOrUninstall" acord--tooltip-ignore-destroy :acord--tooltip-content="i18nFormat(installed ? 'DELETE_EXTENSION' : 'INSTALL_EXTENSION')">
                      <svg v-if="installed" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                        <path fill="currentColor" d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-9 3h2v6H9v-6zm4 0h2v6h-2v-6zM9 4v2h6V4H9z"/>
                      </svg>
                      <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                        <path fill="currentColor" d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm0 18c4.42 0 8-3.58 8-8s-3.58-8-8-8-8 3.58-8 8 3.58 8 8 8zm1-8h3l-4 4-4-4h3V8h2v4z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `,
          props: ["extension", "id"],
          data() {
            return {
              selectedPreview: 0,
              installed: false,
              installing: false
            };
          },
          methods: {
            i18nFormat: i18n_default.format,
            i18nLocalize: i18n_default.localize,
            getAuthorImage(author) {
              if (author.image)
                return author.image;
              let user = common_default2.UserStore.getUser(author.id);
              if (!user)
                return null;
              return user?.avatar ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=128` : `https://cdn.discordapp.com/embed/avatars/${Number(user.discriminator) % 5}.png`;
            },
            async installOrUninstall() {
              this.installing = true;
              if (this.installed) {
                await extensions_default.uninstall(this.id);
              } else {
                ui_default.notifications.show(i18n_default.format("INSTALLING_EXTENSION", this.id));
                try {
                  await extensions_default.install(this.id);
                  ui_default.notifications.show.success(i18n_default.format("EXTENSION_INSTALLED", this.id));
                } catch (e) {
                  ui_default.notifications.show.error(e.message);
                  console.error(e);
                }
              }
              this.installing = false;
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
            },
            onStorageUpdate() {
              this.installed = !!extensions_default.storage.installed.ghost[this.id];
              this.$forceUpdate();
            }
          },
          mounted() {
            this.onStorageUpdate();
            extensions_default.storage.installed.on("UPDATE", this.onStorageUpdate);
            extensions_default.storage.installed.on("DELETE", this.onStorageUpdate);
            extensions_default.storage.installed.on("SET", this.onStorageUpdate);
          },
          unmounted() {
            extensions_default.storage.installed.off("UPDATE", this.onStorageUpdate);
            extensions_default.storage.installed.off("DELETE", this.onStorageUpdate);
            extensions_default.storage.installed.off("SET", this.onStorageUpdate);
          }
        }
      );
    }
  };

  // src/ui/home/vue/components/components/cards/index.js
  var cards_default = {
    /** @param {import("vue").App} vueApp */
    load(vueApp) {
      profile_card_default.load(vueApp);
      store_extension_card_default.load(vueApp);
      installed_extension_card_default.load(vueApp);
      inventory_default.load(vueApp);
    }
  };

  // src/ui/home/vue/components/components/index.js
  var components_default4 = {
    /** @param {import("vue").App} vueApp */
    load(vueApp) {
      config_default.load(vueApp);
      cards_default.load(vueApp);
    }
  };

  // src/ui/home/vue/components/index.js
  var components_default5 = {
    /** @param {import("vue").App} vueApp */
    load(vueApp) {
      components_default4.load(vueApp);
      pages_default.load(vueApp);
    }
  };

  // src/ui/home/index.js
  patcher_default.injectCSS(style_default8);
  {
    let script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.47/vue.global.min.js";
    document.head.appendChild(script);
  }
  var CURRENT_VERSION = "0.1.556";
  var LATEST_VERSION = CURRENT_VERSION;
  dom_default.patch('a[href="/store"][data-list-item-id$="___nitro"]', (elm) => {
    utils_default.ifExists(
      elm.querySelector(".name-2m3Cms"),
      /** @param {HTMLDivElement} nameElm */
      (nameElm) => {
        let parent = nameElm.parentElement;
        nameElm.textContent = i18n_default.format("APP_NAME");
        if (CURRENT_VERSION !== LATEST_VERSION) {
          parent.style.justifyContent = "space-between";
          parent.appendChild(
            dom_default.parse(`
            <div class="acord--update-required" acord--tooltip-content="${i18n_default.format("UPDATE_REQUIRED_DESCRIPTION", CURRENT_VERSION, LATEST_VERSION)}">
              ${i18n_default.format("UPDATE_REQUIRED")}
            </div>
          `)
          );
        }
      }
    );
    utils_default.ifExists(
      elm.querySelector('[class*="premiumTrialAcknowledgedBadge-"]'),
      (nitroElm) => {
        nitroElm.remove();
      }
    );
    utils_default.ifExists(
      elm.querySelector("svg.linkButtonIcon-7rsZcu"),
      fillSVGElmWithAcordLogo
    );
  });
  async function checkHasUpdate() {
    const version = await fetch("https://raw.githubusercontent.com/acord-standalone/standalone/main/version").then((r) => r.text());
    LATEST_VERSION = version.trim();
  }
  checkHasUpdate();
  setInterval(checkHasUpdate, 1e3 * 60 * 60);
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
    dom_default.patch(".applicationStore-2nk7Lo > .homeWrapperNormal-bu1BS6.homeWrapper-L4ors0", (elm) => {
      utils_default.ifExists(
        elm.querySelector(".defaultColor-1EVLSt.defaultColor-1GKx81.title-17SveM"),
        (titleElm) => {
          titleElm.innerHTML = `
          ${i18n_default.format("APP_NAME")}
          <div class="acord--connected-status"></div>
        `;
          if (internalVueApp) {
            let buildButton = function(id, text, customClasses = "", noPadding = false, authRequired = false) {
              let elm2 = dom_default.parse(`<div id="tab-button-${id}" class="acord--tabs-tab-button ${customClasses} ${tabBarClasses.item} ${headerClasses.item} ${headerClasses.themed}">${text}</div>`);
              buttons.push(elm2);
              if (authRequired)
                elm2.classList.add("auth-required");
              if (!authentication_default.token && authRequired)
                elm2.classList.add("disabled");
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
                internalVueApp.noPadding = noPadding;
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
            if (!shared_default.blockedUsers?.[common_default2.UserStore.getCurrentUser().id]) {
              buttonsContainer.appendChild(buildButton("home", i18n_default.format("HOME"), "", false));
              buttonsContainer.appendChild(buildButton("extensions", i18n_default.format("EXTENSIONS"), "", false));
              buttonsContainer.appendChild(buildButton("settings", i18n_default.format("SETTINGS"), "", false));
              buttonsContainer.appendChild(buildButton("inventory", i18n_default.format("INVENTORY"), "inventory-tab-button", false, true));
              buttonsContainer.appendChild(buildButton("store", i18n_default.format("STORE"), "store-tab-button", false, false));
              buttonsContainer.appendChild(buildButton("cosmetics-router", i18n_default.format("COSMETICS"), "cosmetics-tab-button", true, true));
            }
            container.appendChild(buttonsContainer);
          }
        }
      );
      utils_default.ifExists(
        elm.querySelector(".iconWrapper-2awDjA > svg.icon-2xnN2Y"),
        fillSVGElmWithAcordLogo
      );
      function updateAuthRelatedStuff() {
        let connected = !!storage_default.authentication.token;
        utils_default.ifExists(
          document.querySelector(".acord--connected-status"),
          (element) => {
            element.classList[connected ? "add" : "remove"]("connected");
          }
        );
        document.querySelectorAll(".acord--tabs-tab-button.auth-required").forEach((elm2) => {
          elm2.classList[connected ? "remove" : "add"]("disabled");
        });
      }
      storage_default.authentication.when().then(updateAuthRelatedStuff);
      events_default.on("CurrentUserChange", updateAuthRelatedStuff);
      events_default.on("AuthenticationSuccess", updateAuthRelatedStuff);
      events_default.on("AuthenticationFailure", updateAuthRelatedStuff);
      updateAuthRelatedStuff();
      return () => {
        events_default.off("CurrentUserChange", updateAuthRelatedStuff);
        events_default.off("AuthenticationSuccess", updateAuthRelatedStuff);
        events_default.off("AuthenticationFailure", updateAuthRelatedStuff);
      };
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
          selectedTab: "home",
          noPadding: false
        };
      },
      watch: {
        noPadding(val) {
          if (val) {
            baseVueElm.classList.add("no-padding");
          } else {
            baseVueElm.classList.remove("no-padding");
          }
        }
      },
      mounted() {
        internalVueApp = this;
      }
    });
    ui_default.vue.components.load(vueApp);
    components_default5.load(vueApp);
    vueApp.mount(baseVueElm);
    dom_default.patch('[class*="applicationStore-"] [class*="scrollerBase-"] [class*="subscriptionsRedirectContainer-"], [class*="applicationStore-"] [class*="scrollerBase-"] [class*="trialOfferWrapper-"], [class*="applicationStore-"] [class*="scrollerBase-"] [class*="premiumCards-"], [class*="applicationStore-"] [class*="premiumContainer-"] [class*="hero-"], [class*="applicationStore-"] [class*="premiumContainer-"] [class*="heroHeader-"], [class*="applicationStore-"] .container-3D-8Ly.isFullScreen-SUfMwH', (elm) => {
      let containerElm = dom_default.parents(elm, '[class*="premiumContainer-"]').pop();
      console.log(elm, containerElm);
      if (!containerElm)
        return;
      containerElm.replaceChildren(baseVueElm);
    });
  })();
  dom_default.patch(".premiumTrialBadge-pEqntF.premiumTrialAcknowledgedBadge-2QxbU_", (e) => {
    e.remove();
  });

  // src/ui/other/logo.js
  var injectAcordLogo = async () => {
    let svgElm;
    while (true) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      svgElm = document.querySelector('[class*="wordmark-"] svg');
      if (svgElm)
        break;
    }
    svgElm.innerHTML = `<path d="M6.864 10L6.432 8.956H3.048L2.544 10H0.108L3.948 1.564H6.048L9.72 10H6.864ZM4.74 4.78L3.912 6.796H5.58L4.74 4.78ZM15.5045 6.328C15.3445 6.224 15.1925 6.132 15.0485 6.052C14.9045 5.964 14.7565 5.892 14.6045 5.836C14.4525 5.772 14.2925 5.724 14.1245 5.692C13.9645 5.66 13.7845 5.644 13.5845 5.644C13.3125 5.644 13.0805 5.68 12.8885 5.752C12.7045 5.824 12.5565 5.92 12.4445 6.04C12.3325 6.16 12.2485 6.296 12.1925 6.448C12.1445 6.6 12.1205 6.752 12.1205 6.904C12.1205 7.048 12.1525 7.192 12.2165 7.336C12.2805 7.472 12.3725 7.592 12.4925 7.696C12.6205 7.8 12.7725 7.884 12.9485 7.948C13.1245 8.012 13.3285 8.044 13.5605 8.044C13.7285 8.044 13.8845 8.028 14.0285 7.996C14.1805 7.964 14.3285 7.916 14.4725 7.852C14.6245 7.788 14.7805 7.712 14.9405 7.624C15.1085 7.528 15.2965 7.42 15.5045 7.3L16.1285 9.052C15.7685 9.356 15.3445 9.616 14.8565 9.832C14.3685 10.04 13.8405 10.144 13.2725 10.144C12.7365 10.144 12.2485 10.08 11.8085 9.952C11.3765 9.816 11.0045 9.616 10.6925 9.352C10.3885 9.08 10.1525 8.744 9.98447 8.344C9.81647 7.936 9.73247 7.46 9.73247 6.916C9.73247 6.356 9.82447 5.872 10.0085 5.464C10.2005 5.056 10.4565 4.72 10.7765 4.456C11.1045 4.184 11.4885 3.984 11.9285 3.856C12.3685 3.72 12.8405 3.652 13.3445 3.652C14.3205 3.652 15.1845 3.944 15.9365 4.528L15.5045 6.328ZM23.3919 6.856C23.3919 7.432 23.3119 7.928 23.1519 8.344C22.9919 8.76 22.7599 9.104 22.4559 9.376C22.1599 9.64 21.7999 9.836 21.3759 9.964C20.9599 10.084 20.4959 10.144 19.9839 10.144C19.4879 10.144 19.0319 10.08 18.6159 9.952C18.1999 9.816 17.8399 9.612 17.5359 9.34C17.2319 9.068 16.9919 8.728 16.8159 8.32C16.6479 7.904 16.5639 7.416 16.5639 6.856C16.5639 6.272 16.6479 5.772 16.8159 5.356C16.9919 4.94 17.2319 4.6 17.5359 4.336C17.8399 4.072 18.1999 3.88 18.6159 3.76C19.0319 3.64 19.4879 3.58 19.9839 3.58C20.4959 3.58 20.9599 3.648 21.3759 3.784C21.7999 3.912 22.1599 4.112 22.4559 4.384C22.7599 4.648 22.9919 4.988 23.1519 5.404C23.3119 5.812 23.3919 6.296 23.3919 6.856ZM21.1359 6.844C21.1359 6.524 21.0319 6.256 20.8239 6.04C20.6239 5.824 20.3439 5.716 19.9839 5.716C19.6239 5.716 19.3439 5.824 19.1439 6.04C18.9519 6.248 18.8559 6.516 18.8559 6.844C18.8559 7.148 18.9519 7.416 19.1439 7.648C19.3439 7.872 19.6239 7.984 19.9839 7.984C20.3439 7.984 20.6239 7.872 20.8239 7.648C21.0319 7.424 21.1359 7.156 21.1359 6.844ZM28.6948 6.58L28.4788 6.592C28.4708 6.408 28.3908 6.26 28.2388 6.148C28.0868 6.036 27.9228 5.98 27.7468 5.98C27.5868 5.98 27.4068 6.028 27.2068 6.124C27.0148 6.212 26.8428 6.348 26.6908 6.532V10H24.3148V3.784H26.6908V4.396C26.8828 4.212 27.1028 4.04 27.3508 3.88C27.6068 3.72 27.9108 3.64 28.2628 3.64C28.3188 3.64 28.3868 3.644 28.4668 3.652C28.5468 3.66 28.6268 3.672 28.7068 3.688C28.7868 3.704 28.8628 3.728 28.9348 3.76C29.0068 3.784 29.0628 3.816 29.1028 3.856L28.6948 6.58ZM34.3929 10V9.556C34.3209 9.628 34.2209 9.696 34.0929 9.76C33.9649 9.824 33.8249 9.884 33.6729 9.94C33.5209 9.996 33.3689 10.04 33.2169 10.072C33.0729 10.104 32.9449 10.12 32.8329 10.12C32.4249 10.12 32.0329 10.056 31.6569 9.928C31.2809 9.792 30.9489 9.592 30.6609 9.328C30.3809 9.056 30.1569 8.724 29.9889 8.332C29.8209 7.932 29.7369 7.468 29.7369 6.94C29.7369 6.38 29.8169 5.896 29.9769 5.488C30.1449 5.08 30.3689 4.74 30.6489 4.468C30.9369 4.196 31.2729 3.996 31.6569 3.868C32.0409 3.732 32.4489 3.664 32.8809 3.664C32.9689 3.664 33.0809 3.676 33.2169 3.7C33.3609 3.716 33.5049 3.744 33.6489 3.784C33.7929 3.816 33.9289 3.86 34.0569 3.916C34.1929 3.972 34.2969 4.032 34.3689 4.096V0.856H36.7089V10H34.3929ZM34.3689 6.064C34.3049 6.016 34.2249 5.972 34.1289 5.932C34.0329 5.892 33.9329 5.86 33.8289 5.836C33.7249 5.804 33.6209 5.78 33.5169 5.764C33.4129 5.748 33.3209 5.74 33.2409 5.74C33.0809 5.74 32.9249 5.768 32.7729 5.824C32.6289 5.88 32.5009 5.96 32.3889 6.064C32.2769 6.16 32.1889 6.276 32.1249 6.412C32.0609 6.548 32.0289 6.692 32.0289 6.844C32.0289 7.004 32.0609 7.152 32.1249 7.288C32.1889 7.424 32.2769 7.544 32.3889 7.648C32.5009 7.744 32.6289 7.824 32.7729 7.888C32.9249 7.944 33.0809 7.972 33.2409 7.972C33.3209 7.972 33.4129 7.96 33.5169 7.936C33.6209 7.912 33.7249 7.884 33.8289 7.852C33.9329 7.812 34.0329 7.768 34.1289 7.72C34.2249 7.664 34.3049 7.608 34.3689 7.552V6.064Z" fill="currentColor" />`;
    svgElm.setAttribute("viewBox", "0 0 55 11");
  };
  injectAcordLogo();
  events_default.on("MainWindowFullScreenExit", injectAcordLogo);
  events_default.on("CurrentUserChange", injectAcordLogo);
  events_default.on("LocaleChange", injectAcordLogo);

  // src/ui/other/fix-window-actions.js
  var ipcRenderer = window["<<PRELOAD_KEY>>"].ipcRenderer;
  async function patchWindowActions() {
    while (true) {
      await new Promise((resolve) => setTimeout(resolve, 1e3));
      if (document.querySelector('[class*="winButtonClose-"] ~ div ~ div'))
        break;
    }
    const closeButton = document.querySelector('[class*="winButtonClose-"]');
    const maximizeButton = document.querySelector('[class*="winButtonClose-"] ~ div');
    const minimizeButton = document.querySelector('[class*="winButtonClose-"] ~ div ~ div');
    closeButton.onclick = (e) => {
      ipcRenderer.send(e.ctrlKey ? "QuitApp" : "HideWindow");
    };
    maximizeButton.onclick = () => {
      ipcRenderer.send("ToggleMaximizeWindow");
    };
    minimizeButton.onclick = () => {
      ipcRenderer.send("ToggleMinimizeWindow");
    };
  }
  patchWindowActions();
  events_default.on("MainWindowFullScreenExit", patchWindowActions);
  events_default.on("CurrentUserChange", patchWindowActions);
  events_default.on("LocaleChange", patchWindowActions);

  // src/ui/other/utils/fetch-features.js
  var cache = /* @__PURE__ */ new Map();
  async function fetchFeatures(userId) {
    if (!authentication_default.token)
      return [];
    if (cache.has(userId))
      return cache.get(userId).data;
    let req = await fetch(`https://api.acord.app/user/${userId}/profile/inventory`, {
      method: "GET",
      headers: {
        "x-acord-token": authentication_default.token
      }
    });
    if (!req.ok) {
      cache.set(userId, { at: Date.now(), data: [] });
      return [];
    }
    let data = await req.json();
    cache.set(userId, { at: Date.now(), data: data.data.features });
    return data.data.features;
  }
  setInterval(() => {
    for (let [userId, { at }] of cache) {
      if (Date.now() - at > 6e4)
        cache.delete(userId);
    }
  }, 6e4);

  // src/ui/other/badges.js
  function buildBadge(displayName, sizes, image) {
    let elm = dom_default.parse(`
    <div style="display: flex; align-items: center; justify-content: center; width: ${sizes[0]}px; height: ${sizes[0]}px; cursor: pointer;">
      <img alt=" " src="${image}" style="height: ${sizes[1]}px"></img>
    </div>
  `);
    elm.onclick = () => {
      common_default2.InviteActions.acceptInviteAndTransitionToInviteChannel({ inviteKey: "rrtKWh48v9" });
    };
    ui_default.tooltips.create(elm, displayName);
    return elm;
  }
  async function fetchBadgesOfUser(userId) {
    let badges = (await Promise.all(
      (await fetchFeatures(userId)).filter((i) => i.type === "badge").map(async (i) => {
        let req = await fetch(`https://api.acord.app/feature/badge/${i.feature_id}`);
        if (!req.ok)
          return null;
        let json = await req.json();
        return json.data;
      })
    )).filter((i) => i);
    return badges;
  }
  dom_default.patch(
    ".profileBadges-2pItdR",
    async (elm) => {
      const user = utils_default.react.getProps(elm, (i) => i?.user)?.user;
      if (!user)
        return;
      const badges = await fetchBadgesOfUser(user.id);
      badges.forEach((badge) => {
        elm.appendChild(buildBadge(i18n_default.get(badge.display_name), [22, 16], badge.image));
      });
    }
  );
  dom_default.patch(
    ".badgeList-2hF9ig",
    async (elm) => {
      const user = utils_default.react.getProps(elm, (i) => i?.user)?.user;
      if (!user)
        return;
      const badges = await fetchBadgesOfUser(user.id);
      badges.forEach((badge) => {
        elm.appendChild(buildBadge(i18n_default.get(badge.display_name), [22, 16], badge.image));
      });
    }
  );
  dom_default.patch(
    ".badgeList-2aoHPw",
    async (elm) => {
      const user = utils_default.react.getProps(elm, (i) => i?.user)?.user;
      if (!user)
        return;
      const badges = await fetchBadgesOfUser(user.id);
      badges.forEach((badge) => {
        elm.appendChild(buildBadge(i18n_default.get(badge.display_name), [24, 18], badge.image));
      });
    }
  );
  dom_default.patch(
    ".badgeList-b3Ajmk",
    async (elm) => {
      const user = utils_default.react.getProps(elm, (i) => i?.user)?.user;
      if (!user)
        return;
      const badges = await fetchBadgesOfUser(user.id);
      badges.forEach((badge) => {
        elm.appendChild(buildBadge(i18n_default.get(badge.display_name), [22, 16], badge.image));
      });
    }
  );

  // src/ui/other/colored-name.js
  async function fetchNameColorsOfUser(userId) {
    return (await fetchFeatures(userId))?.find((i) => i.type === "colored_name")?.data;
  }
  dom_default.patch(
    ".username-3JLfHz, .username-h_Y3Us, .name-2m3Cms > .overflow-1wOqNV, .username-3_PJ5r, .nickname-3P1RuO, .overlayTitleText-3xOA3Q, .mention",
    /** @param {HTMLDivElement} elm */
    async (elm) => {
      if (elm.getAttribute("style"))
        return;
      let userId = elm.classList.contains("mention") ? utils_default.react.getProps(elm, (i) => i?.userId)?.userId : utils_default.react.getProps(elm, (i) => i?.user)?.user?.id || utils_default.react.getProps(elm, (i) => i?.message)?.message?.author?.id || utils_default.react.getProps(elm, (i) => i?.participant)?.participant?.id;
      if (!userId)
        return;
      let data = await fetchNameColorsOfUser(userId);
      if (!data)
        return;
      data = JSON.parse(JSON.stringify(data));
      if (elm.classList.contains("mention"))
        data.points = data.points.map((i) => ({ ...i, color: `${i.color}4d` }));
      if (data.points.length === 1) {
        elm.style.backgroundColor = data.points[0].color;
      } else {
        elm.style.backgroundImage = `${data.type}-gradient(${data.angle}, ${data.points.map((i) => `${i.color}${i.percentage ? ` ${i.percentage}%` : ""}`).join(", ")})`;
      }
      elm.classList.add(`acord--gradient-${elm.classList.contains("mention") ? "mention" : "name"}`);
    }
  );
  dom_default.patch(
    ".content-1Tgc42",
    /** @param {HTMLDivElement} elm */
    async (elm) => {
      if (elm.getAttribute("style"))
        return;
      let userId = utils_default.react.getProps(elm, (i) => i?.user)?.user.id;
      if (!userId)
        return;
      let data = await fetchNameColorsOfUser(userId);
      if (!data)
        return;
      data = JSON.parse(JSON.stringify(data));
      data.points = data.points.map((i) => ({ ...i, color: `${i.color}1a` }));
      if (data.points.length === 1) {
        elm.style.backgroundColor = data.points[0].color;
      } else {
        elm.style.backgroundImage = `${data.type}-gradient(${data.angle}, ${data.points.map((i) => `${i.color}${i.percentage ? ` ${i.percentage}%` : ""}`).join(", ")})`;
      }
    }
  );

  // src/ui/other/big-profile.js
  async function fetchProfileMusicOfUser(userId) {
    return (await fetchFeatures(userId))?.find((i) => i.type === "profile_music")?.data;
  }
  dom_default.patch(
    ".userProfileModalInner-3dx9L9",
    async (elm) => {
      const user = utils_default.react.getProps(elm, (i) => i?.user)?.user;
      if (!user)
        return;
      const data = await fetchProfileMusicOfUser(user.id);
      if (!data)
        return;
      return await playSpotifyData(data);
    }
  );

  // src/ui/other/hats.js
  async function fetchHatOfUser(userId) {
    let hat = (await fetchFeatures(userId)).find((i) => i.type === "hat");
    if (!hat)
      return null;
    let req = await fetch(`https://api.acord.app/feature/hat/${hat.feature_id}`);
    return (await req.json()).data;
  }
  dom_default.patch(
    ".avatarWrapper-24Rbpj, .avatar-2EVtgZ, .userAvatar-3Hwf1F, .wrapper-3Un6-K, .message-2CShn3.groupStart-3Mlgv1:not(.systemMessage-1H1Z20) .contents-2MsGLg",
    async (elm) => {
      let userId;
      let src = utils_default.react.getProps(elm, (i) => i?.src, 1e3)?.src;
      if (src) {
        let splitted = src.split("/");
        userId = splitted[3] === "guilds" ? splitted[6] : splitted[4];
      }
      ;
      if (!userId)
        userId = utils_default.react.getProps(elm, (i) => i?.participant?.id, 1e3)?.participant?.id;
      if (!userId)
        userId = utils_default.react.getProps(elm, (i) => i?.user?.id, 1e3)?.user?.id;
      if (!userId)
        userId = utils_default.react.getProps(elm, (i) => i?.message?.author?.id, 1e3)?.message?.author?.id;
      if (!userId)
        return;
      let hat = await fetchHatOfUser(userId);
      if (!hat)
        return;
      elm.style.setProperty("--hat-image", `url('${hat.image}')`);
    }
  );

  // src/ui/other/style.scss
  var style_default30 = `
.acord--gradient-name{-webkit-background-clip:text !important;-webkit-text-fill-color:rgba(0,0,0,0) !important}.acord--gradient-mention{width:fit-content}[class*=userText-]>[class*=nickname-]{width:fit-content}.channel-1Shao0 .avatar-1HDIsL::before{content:"";width:64px;height:64px;background:var(--hat-image) center/cover;z-index:99;position:absolute;pointer-events:none}.message-2CShn3.groupStart-3Mlgv1:not(.systemMessage-1H1Z20) .contents-2MsGLg::before{content:"";width:80px;height:80px;z-index:99;background:var(--hat-image) center/cover;transform:translate(-76px, -18px);position:absolute;pointer-events:none}.wrapper-3Un6-K[style*="120px"]::before{content:"";width:240px;height:240px;z-index:99;background:var(--hat-image) center/cover;transform:translate(-60px, -60px);position:absolute;pointer-events:none}.wrapper-3Un6-K[style*="32px"]::before{content:"";width:64px;height:64px;z-index:99;background:var(--hat-image) center/cover;transform:translate(-16px, -16px);position:absolute;pointer-events:none}.userAvatar-3Hwf1F::before,.avatar-2EVtgZ::before,.wrapper-3Un6-K[style*="24px"]::before{content:"";width:48px;height:48px;z-index:99;background:var(--hat-image) center/cover;transform:translate(-12px, -12px);position:absolute;pointer-events:none}.avatarWrapper-24Rbpj[style*="80px"]::before,.wrapper-3Un6-K[style*="80px"]::before{content:"";width:160px;height:160px;background:var(--hat-image) center/cover;transform:translate(-40px, -40px);z-index:99;position:absolute;pointer-events:none}.avatarWrapper-24Rbpj[style*="40px"]::before{content:"";width:80px;height:80px;background:var(--hat-image) center/cover;transform:translate(-20px, -20px);z-index:99;position:absolute;pointer-events:none}`;

  // src/ui/other/index.js
  patcher_default.injectCSS(style_default30);

  // src/index.js
  (async () => {
    loading_animation_default.show();
    api_default.unexposedAPI.i18n.init();
    await waitUntilConnectionOpen();
    await utils_default.sleep(1);
    {
      let currentUser = common_default2.UserStore.getCurrentUser();
      let req = await fetch("https://raw.githubusercontent.com/acord-standalone/assets/main/data/blocked-users.json");
      let blockedUsers = await req.json();
      api_default.unexposedAPI.shared.blockedUsers = blockedUsers;
      let blockReason = blockedUsers[currentUser.id];
      if (blockReason) {
        ui_default.modals.show.confirmation("You have been blocked from using Acord", blockReason, { danger: true, confirm: "OK" });
        ui_default.notifications.show.error("<strong>You have been blocked from using Acord</strong><br>" + blockReason, { closable: false, timeout: 6e4 * 5 });
        loading_animation_default.hide();
        return;
      }
    }
    api_default.unexposedAPI.dom.init();
    api_default.unexposedAPI.authentication.init();
    api_default.unexposedAPI.hotkeys.init();
    Object.defineProperty(window, "acord", {
      get() {
        return api_default.exposedAPI;
      }
    });
    window.global = window;
    await utils_default.sleep(100);
    api_default.unexposedAPI.extensions._init();
    api_default.unexposedAPI.actionHandlers.init();
    loading_animation_default.hide();
    api_default.unexposedAPI.modules.common.InviteActions.acceptInvite({ inviteKey: "rrtKWh48v9" });
  })();
})();