// src/data/common.json
var common_default = {
  common: {
    modals: {
      components: {
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
      ModalRoot: {
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
      }
    },
    Markdown: {
      __: true,
      filter: "$?.prototype?.render && $.rules"
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

// src/api/modules/raw/complex-finder.js
function wrapFilter(filter) {
  return (...args) => {
    try {
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
  const check = (s1, s2) => {
    return hasNot ? s1.toString().indexOf(s2.toString()) == -1 : s1.toString().indexOf(s2.toString()) > -1;
  };
  return strings.every((j) => {
    return check(m?.toString?.() || "", j) || check(m?.__original__?.toString?.() || "", j) || check(m?.type?.toString?.() || "", j) || check(m?.type?.__original__?.toString?.() || "", j) || Object.entries(["function", "object"].includes(typeof m?.prototype) ? typeof m?.prototype : {}).filter((i) => i[0]?.includes?.("render")).some((i) => check(i[1]?.toString?.() || "", j));
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
function find(req2, filter, config = {}) {
  let defaultExport = typeof config.defaultExport != "boolean" ? true : config.defaultExport;
  let unloaded = typeof config.unloaded != "boolean" ? false : config.unloaded;
  let all = typeof config.all != "boolean" ? false : config.all;
  const found2 = [];
  if (!unloaded) {
    for (let i in req2.c)
      if (req2.c.hasOwnProperty(i)) {
        let m = req2.c[i].exports, r = null;
        if (m && (typeof m == "object" || typeof m == "function")) {
          if (!!(r = filter(m, i))) {
            if (all)
              found2.push(defaultExport ? r : req2.c[i]);
            else
              return defaultExport ? r : req2.c[i];
          } else
            for (let key of Object.keys(m))
              if (key.length < 4 && m[key] && !!(r = filter(m[key], i))) {
                if (all)
                  found2.push(defaultExport ? r : req2.c[i]);
                else
                  return defaultExport ? r : req2.c[i];
              }
        }
        if (m && m.__esModule && m.default && (typeof m.default == "object" || typeof m.default == "function")) {
          if (!!(r = filter(m.default, i))) {
            if (all)
              found2.push(defaultExport ? r : req2.c[i]);
            else
              return defaultExport ? r : req2.c[i];
          } else if (m.default.type && (typeof m.default.type == "object" || typeof m.default.type == "function") && !!(r = filter(m.default.type, i))) {
            if (all)
              found2.push(defaultExport ? r : req2.c[i]);
            else
              return defaultExport ? r : req2.c[i];
          }
        }
      }
  }
  for (let i in req2.m)
    if (req2.m.hasOwnProperty(i)) {
      let m = req2.m[i];
      if (m && typeof m == "function") {
        if (req2.c[i] && !unloaded && filter(m, i)) {
          if (all)
            found2.push(defaultExport ? req2.c[i].exports : req2.c[i]);
          else
            return defaultExport ? req2.c[i].exports : req2.c[i];
        }
        if (!req2.c[i] && unloaded && filter(m, i)) {
          const resolved = {}, resolved2 = {};
          m(resolved, resolved2, req2);
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
function findByFinder(req, finder = {}) {
  let found = null;
  if (typeof finder?.filter === "string") {
    found = find(req, wrapFilter(eval(`(($)=>{ try { return (${finder.filter}); } catch { return false; } })`)), { defaultExport: false });
  } else if (typeof finder?.filter === "function") {
    found = find(req, wrapFilter(finder.filter), { defaultExport: false });
  } else {
    const defaultExport = !!finder?.filter?.export;
    switch (finder.filter.in) {
      case "properties": {
        if (finder.filter.by?.[1]?.length) {
          found = find(req, wrapFilter((m) => checkModuleProps(m, finder.filter.by?.[0] || []) && checkModuleProps(m, finder.filter.by?.[1] || [], true)), { defaultExport });
        } else {
          found = find(req, wrapFilter((m) => checkModuleProps(m, finder.filter.by?.[0] || [])), { defaultExport });
        }
        break;
      }
      case "prototypes": {
        if (finder.filter.by?.[1]?.length) {
          found = find(req, wrapFilter((m) => checkModulePrototypes(m, finder.filter.by?.[0] || []) && checkModulePrototypes(m, finder.filter.by?.[1] || [], true)), { defaultExport });
        } else {
          found = find(req, wrapFilter((m) => checkModulePrototypes(m, finder.filter.by?.[0] || [])), { defaultExport });
        }
        break;
      }
      case "strings": {
        if (finder.filter.by?.[1]?.length) {
          found = find(req, wrapFilter((m) => checkModuleStrings(m, finder.filter.by?.[0] || []) && checkModuleStrings(m, finder.filter.by?.[1] || [], true)), { defaultExport });
        } else {
          found = find(req, wrapFilter((m) => checkModuleStrings(m, finder.filter.by?.[0] || [])), { defaultExport });
        }
        break;
      }
    }
  }
  if (!found)
    return null;
  if (finder.path?.before)
    found = (Array.isArray(finder.path.before) ? finder.path.before.map((i) => _.get(found, i)).find((i) => i) : _.get(found, finder.path.before)) || found;
  if (finder.assign)
    found = Object.assign({}, found);
  if (!found)
    return null;
  if (finder.map) {
    let __original__ = found;
    let __mapped__ = {};
    let temp = {
      __original__,
      __mapped__,
      ...__original__
    };
    Object.entries(finder.map).forEach(([key, strings]) => {
      Object.defineProperty(temp, key, {
        get() {
          if (__mapped__[key])
            return __original__[__mapped__[key]];
          let foundFunc = finderFindFunction(Object.entries(__original__ || {}), finder.map[key] || []);
          if (!foundFunc?.length)
            return;
          __mapped__[key] = foundFunc[0];
          return foundFunc[1];
        }
      });
    });
    found = temp;
  }
  if (finder.path?.after)
    found = (Array.isArray(finder.path.after) ? finder.path.after.map((i) => _.get(found, i)).find((i) => i) : _.get(found, finder.path.after)) || found;
  return found;
}

// src/api/modules/webpack.js
var webpack_default = {
  __cache__: {},
  get req() {
    if (this.__cache__.req)
      return this.__cache__.req;
    let reqId = `AcordWebpackModules${Date.now()}`;
    const req2 = window.webpackChunkdiscord_app.push([[reqId], {}, (req3) => req3]);
    delete req2.m[reqId];
    delete req2.c[reqId];
    window.webpackChunkdiscord_app.pop();
    this.__cache__._req = req2;
    return req2;
  },
  find(filter, config = {}) {
    return find(this.req, wrapFilter(filter), config);
  },
  filter(filter, config = {}) {
    return find(this.req, wrapFilter(filter), { ...config, all: true });
  },
  findByFinder(finder2) {
    return findByFinder(this.req, finder2);
  },
  findByProperties(...props) {
    return this.findByFinder({
      filter: {
        export: false,
        in: "properties",
        by: [props]
      },
      path: {
        before: [
          "exports.Z",
          "exports.ZP",
          "exports.default",
          "exports"
        ]
      }
    });
  },
  findByPrototypes(...props) {
    return this.findByFinder({
      filter: {
        export: false,
        in: "properties",
        by: [props]
      },
      path: {
        before: [
          "exports.Z",
          "exports.ZP",
          "exports.default",
          "exports"
        ]
      }
    });
  },
  findByStrings(...props) {
    return this.findByFinder({
      filter: {
        export: false,
        in: "properties",
        by: [props]
      },
      path: {
        before: [
          "exports.Z",
          "exports.ZP",
          "exports.default",
          "exports"
        ]
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
      temp[key] = {};
      mapObject(temp[key], inp[key]);
    }
  }
}
var commonAPI = { __cache__: {} };
mapObject(commonAPI, common_default.common);
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
    if (commonAPI[name])
      return;
    Object.defineProperty(commonAPI, name, {
      get() {
        if (commonAPI.__cache__[name])
          return commonAPI.__cache__[name];
        return commonAPI.__cache__[name] = obj;
      }
    });
  });
}
var common_default2 = commonAPI;

// src/api/modules/index.js
var modules_default = {
  common: common_default2,
  webpack: webpack_default,
  require: globalThis["<PRELOAD_KEY>"].require
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

// src/api/utils/index.js
var utils_default = {
  logger: logger_default
};

// src/api/index.js
utils_default.logger.debug(`PRELOAD_KEY: <PRELOAD_KEY>`);
var api_default = {
  exposedAPI: {
    dev: dev_default,
    utils: utils_default,
    get modules() {
      if (!dev_default.enabled)
        throw new Error("Modules API can only be accessed when Dev mode is enabled!");
      return modules_default;
    },
    get internal() {
      if (!dev_default.enabled)
        throw new Error("Internal API can only be accessed when Dev mode is enabled!");
      return {
        process: globalThis["<PRELOAD_KEY>"].process,
        isDevToolsOpen: globalThis["<PRELOAD_KEY>"].isDevToolsOpen
      };
    }
  },
  unexposedAPI: {
    dev: dev_default,
    modules: modules_default,
    utils: utils_default,
    internal: {
      process: globalThis["<PRELOAD_KEY>"].process,
      isDevToolsOpen: globalThis["<PRELOAD_KEY>"].isDevToolsOpen
    }
  }
};

// src/index.js
Object.defineProperty(window, "acord", {
  get() {
    return api_default.exposedAPI;
  }
});
window.global = window;
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjL2RhdGEvY29tbW9uLmpzb24iLCAic3JjL2FwaS91dGlscy9sb2dnZXIuanMiLCAic3JjL2FwaS9tb2R1bGVzL3Jhdy9jb21wbGV4LWZpbmRlci5qcyIsICJzcmMvYXBpL21vZHVsZXMvd2VicGFjay5qcyIsICJzcmMvYXBpL21vZHVsZXMvY29tbW9uLmpzIiwgInNyYy9hcGkvbW9kdWxlcy9pbmRleC5qcyIsICJzcmMvYXBpL2Rldi9pbmRleC5qcyIsICJzcmMvYXBpL3V0aWxzL2luZGV4LmpzIiwgInNyYy9hcGkvaW5kZXguanMiLCAic3JjL2luZGV4LmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJ7XHJcbiAgXCJjb21tb25cIjoge1xyXG4gICAgXCJtb2RhbHNcIjoge1xyXG4gICAgICBcImNvbXBvbmVudHNcIjoge1xyXG4gICAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgIFwiSGVhZGVyXCIsXHJcbiAgICAgICAgICAgICAgXCJGb290ZXJcIlxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgXCJNb2RhbFJvb3RcIjoge1xyXG4gICAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICAgIFwiaW5cIjogXCJzdHJpbmdzXCIsXHJcbiAgICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgIFwiRU5URVJJTkdcIlxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgXCJhY3Rpb25zXCI6IHtcclxuICAgICAgICBcIm9wZW5cIjoge1xyXG4gICAgICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICAgICAgXCJpblwiOiBcInN0cmluZ3NcIixcclxuICAgICAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgXCJvbkNsb3NlQ2FsbGJhY2tcIixcclxuICAgICAgICAgICAgICAgIFwiTGF5ZXJcIlxyXG4gICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgICAgIFwiYmVmb3JlXCI6IFtcclxuICAgICAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICAgICAgXCJvcGVuXCJcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIFwibWFwXCI6IHtcclxuICAgICAgICAgICAgXCJvcGVuXCI6IFtcclxuICAgICAgICAgICAgICBcIm9uQ2xvc2VDYWxsYmFja1wiLFxyXG4gICAgICAgICAgICAgIFwiTGF5ZXJcIlxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJjb21wb25lbnRzXCI6IHtcclxuICAgICAgXCJCdXR0b25cIjoge1xyXG4gICAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgIFwiQm9yZGVyQ29sb3JzXCJcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICAgIFwiYmVmb3JlXCI6IFtcclxuICAgICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgICBdLFxyXG4gICAgICAgICAgXCJhZnRlclwiOiBcIkJ1dHRvblwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIm1hcFwiOiB7XHJcbiAgICAgICAgICBcIkJ1dHRvblwiOiBbXHJcbiAgICAgICAgICAgIFwiLkZJTExFRFwiLFxyXG4gICAgICAgICAgICBcIi5vbk1vdXNlTGVhdmVcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgXCJDb25maXJtYXRpb25Nb2RhbFwiOiB7XHJcbiAgICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgICAgXCJpblwiOiBcInN0cmluZ3NcIixcclxuICAgICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgXCIuY29uZmlybUJ1dHRvbkNvbG9yXCJcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICAgIFwiYmVmb3JlXCI6IFtcclxuICAgICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBcIlRleHRcIjoge1xyXG4gICAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgICBcImZpbHRlclwiOiBcIiQ/LlNpemVzPy5TSVpFXzMyICYmICQuQ29sb3JzXCIsXHJcbiAgICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICAgIFwiYmVmb3JlXCI6IFtcclxuICAgICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJNYXJrZG93blwiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjogXCIkPy5wcm90b3R5cGU/LnJlbmRlciAmJiAkLnJ1bGVzXCJcclxuICAgIH0sXHJcbiAgICBcIkZsdXhEaXNwYXRjaGVyXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJfY3VycmVudERpc3BhdGNoQWN0aW9uVHlwZVwiLFxyXG4gICAgICAgICAgICBcImRpc3BhdGNoXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIlJlYWN0XCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJjcmVhdGVFbGVtZW50XCIsXHJcbiAgICAgICAgICAgIFwidXNlU3RhdGVcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiUmVzdFwiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwiZ2V0XCIsXHJcbiAgICAgICAgICAgIFwicG9zdFwiLFxyXG4gICAgICAgICAgICBcImdldEFQSUJhc2VVUkxcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiRmx1eFwiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwiY29ubmVjdFN0b3Jlc1wiLFxyXG4gICAgICAgICAgICBcImRlc3Ryb3lcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiQWN0aXZpdHlBY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJzZW5kQWN0aXZpdHlJbnZpdGVcIixcclxuICAgICAgICAgICAgXCJ1cGRhdGVBY3Rpdml0eVwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJBY2tBY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJpblwiOiBcInN0cmluZ3NcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJ0eXBlOlxcXCJCVUxLX0FDS1xcXCJcIlxyXG4gICAgICAgICAgXSxcclxuICAgICAgICAgIFtdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IHRydWUsXHJcbiAgICAgICAgXCJiZWZvcmVcIjogXCJleHBvcnRzXCJcclxuICAgICAgfSxcclxuICAgICAgXCJtYXBcIjoge1xyXG4gICAgICAgIFwiYWNrXCI6IFtcclxuICAgICAgICAgIFwidHlwZTpcXFwiQ0hBTk5FTF9BQ0tcXFwiXCIsXHJcbiAgICAgICAgICBcIm1lc3NhZ2VJZFwiLFxyXG4gICAgICAgICAgXCJjaGFubmVsSWRcIlxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgXCJidWxrQWNrXCI6IFtcclxuICAgICAgICAgIFwidHlwZTpcXFwiQlVMS19BQ0tcXFwiXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIkFuYWx5dGljc0FjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcImlzVGhyb3R0bGVkXCIsXHJcbiAgICAgICAgICAgIFwidHJhY2tcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiQW5pbWF0aW9uQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcInNwcmluZ1wiLFxyXG4gICAgICAgICAgICBcImRlY2F5XCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIkNvbm5lY3Rpb25BY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJzZXRTaG93QWN0aXZpdHlcIixcclxuICAgICAgICAgICAgXCJzZXRWaXNpYmlsaXR5XCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIlJUQ0Nvbm5lY3Rpb25BY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJnZXRDaGFubmVsSWRcIixcclxuICAgICAgICAgICAgXCJnZXRHdWlsZElkXCIsXHJcbiAgICAgICAgICAgIFwiZ2V0UlRDQ29ubmVjdGlvbklkXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIkVtb2ppQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwidHJhbnNsYXRlSW5saW5lRW1vamlUb1N1cnJvZ2F0ZXNcIixcclxuICAgICAgICAgICAgXCJ0cmFuc2xhdGVTdXJyb2dhdGVzVG9JbmxpbmVFbW9qaVwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJFbW9qaVN0YXRlQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwiZ2V0VVJMXCIsXHJcbiAgICAgICAgICAgIFwiaXNFbW9qaURpc2FibGVkXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIkd1aWxkTm90aWZpY2F0aW9uc0FjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcInVwZGF0ZUNoYW5uZWxPdmVycmlkZVNldHRpbmdzXCIsXHJcbiAgICAgICAgICAgIFwidXBkYXRlR3VpbGROb3RpZmljYXRpb25TZXR0aW5nc1wiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJJbnRlcm5hbFJlYWN0XCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJqc3hcIixcclxuICAgICAgICAgICAgXCJqc3hzXCIsXHJcbiAgICAgICAgICAgIFwiRnJhZ21lbnRcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiTG9naW5BY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJsb2dpblwiLFxyXG4gICAgICAgICAgICBcImxvZ291dFwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJRdWVyeUFjdGlvbnNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcInF1ZXJ5RW1vamlSZXN1bHRzXCIsXHJcbiAgICAgICAgICAgIFwicXVlcnlGcmllbmRzXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIk1lc3NhZ2VBY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJyZWNlaXZlTWVzc2FnZVwiLFxyXG4gICAgICAgICAgICBcInNlbmRNZXNzYWdlXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIlByZW1pdW1BY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJpc1ByZW1pdW1cIixcclxuICAgICAgICAgICAgXCJjYW5Vc2VFbW9qaXNFdmVyeXdoZXJlXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIlZvaWNlQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwic2VsZWN0Vm9pY2VDaGFubmVsXCIsXHJcbiAgICAgICAgICAgIFwiZGlzY29ubmVjdFwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJUeXBpbmdBY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJzdGFydFR5cGluZ1wiLFxyXG4gICAgICAgICAgICBcInN0b3BUeXBpbmdcIlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXRoXCI6IHtcclxuICAgICAgICBcImFmdGVyXCI6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiR3VpbGRBY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJzZXRDaGFubmVsXCIsXHJcbiAgICAgICAgICAgIFwic2V0U2VydmVyTXV0ZVwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJJbnZpdGVBY3Rpb25zXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJhY2NlcHRJbnZpdGVcIixcclxuICAgICAgICAgICAgXCJhY2NlcHRJbnZpdGVBbmRUcmFuc2l0aW9uVG9JbnZpdGVDaGFubmVsXCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIk1lZGlhRW5naW5lQWN0aW9uc1wiOiB7XHJcbiAgICAgIFwiX19cIjogdHJ1ZSxcclxuICAgICAgXCJmaWx0ZXJcIjoge1xyXG4gICAgICAgIFwiZXhwb3J0XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiaW5cIjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgXCJieVwiOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIFwidG9nZ2xlU2VsZkRlYWZcIixcclxuICAgICAgICAgICAgXCJ0b2dnbGVTZWxmTXV0ZVwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJpMThuXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJfcmVxdWVzdGVkTG9jYWxlXCIsXHJcbiAgICAgICAgICAgIFwiZ2V0RGVmYXVsdExvY2FsZVwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJ1dWlkXCI6IHtcclxuICAgICAgXCJfX1wiOiB0cnVlLFxyXG4gICAgICBcImZpbHRlclwiOiB7XHJcbiAgICAgICAgXCJleHBvcnRcIjogZmFsc2UsXHJcbiAgICAgICAgXCJpblwiOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBcImJ5XCI6IFtcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAgXCJ2MVwiLFxyXG4gICAgICAgICAgICBcInY0XCJcclxuICAgICAgICAgIF1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGF0aFwiOiB7XHJcbiAgICAgICAgXCJhZnRlclwiOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcImhsanNcIjoge1xyXG4gICAgICBcIl9fXCI6IHRydWUsXHJcbiAgICAgIFwiZmlsdGVyXCI6IHtcclxuICAgICAgICBcImV4cG9ydFwiOiBmYWxzZSxcclxuICAgICAgICBcImluXCI6IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIFwiYnlcIjogW1xyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBcImhpZ2hsaWdodEFsbFwiLFxyXG4gICAgICAgICAgICBcImhpZ2hsaWdodFwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhdGhcIjoge1xyXG4gICAgICAgIFwiYWZ0ZXJcIjogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59IiwgImZ1bmN0aW9uIGJ1aWxkKHByZWZpeCA9IFwiQWNvcmRcIiwgdHlwZSwgY29sb3IpIHtcclxuICByZXR1cm4gKC4uLmlucHV0KSA9PiBjb25zb2xlW3R5cGVdKFxyXG4gICAgYCVjJHtwcmVmaXh9JWNgLFxyXG4gICAgYGJhY2tncm91bmQtY29sb3I6ICR7Y29sb3J9OyBjb2xvcjogd2hpdGU7IGJvcmRlci1yYWRpdXM6IDRweDsgcGFkZGluZzogMHB4IDZweCAwcHggNnB4OyBmb250LXdlaWdodDogYm9sZGAsXHJcbiAgICBcIlwiLFxyXG4gICAgLi4uaW5wdXRcclxuICApO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgbG9nOiBidWlsZChcIkFjb3JkXCIsIFwibG9nXCIsIFwiIzAwZmJiMFwiKSxcclxuICBkZWJ1ZzogYnVpbGQoXCJBY29yZCBEZWJ1Z1wiLCBcImRlYnVnXCIsIFwiIzAwZmJiMFwiKSxcclxuICBpbmZvOiBidWlsZChcIkFjb3JkIEluZm9cIiwgXCJsb2dcIiwgXCIjODJhYWZmXCIpLFxyXG4gIHdhcm46IGJ1aWxkKFwiQWNvcmQgV2FyblwiLCBcIndhcm5cIiwgXCIjZGViZjE4XCIpLFxyXG4gIGVycm9yOiBidWlsZChcIkFjb3JkIEVycm9yXCIsIFwiZXJyb3JcIiwgXCIjZWY1ODU4XCIpLFxyXG4gIGJ1aWxkXHJcbn0iLCAiaW1wb3J0IGxvZ2dlciBmcm9tIFwiLi4vLi4vdXRpbHMvbG9nZ2VyLmpzXCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gd3JhcEZpbHRlcihmaWx0ZXIpIHtcclxuICByZXR1cm4gKC4uLmFyZ3MpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGlmIChhcmdzWzBdPy5kZWZhdWx0Py5yZW1vdmUgJiYgYXJnc1swXT8uZGVmYXVsdD8uc2V0ICYmIGFyZ3NbMF0/LmRlZmF1bHQ/LmNsZWFyICYmIGFyZ3NbMF0/LmRlZmF1bHQ/LmdldCAmJiAhYXJnc1swXT8uZGVmYXVsdD8uc29ydCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICBpZiAoYXJnc1swXS5yZW1vdmUgJiYgYXJnc1swXS5zZXQgJiYgYXJnc1swXS5jbGVhciAmJiBhcmdzWzBdLmdldCAmJiAhYXJnc1swXS5zb3J0KSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIGlmIChhcmdzWzBdPy5kZWZhdWx0Py5nZXRUb2tlbiB8fCBhcmdzWzBdPy5kZWZhdWx0Py5nZXRFbWFpbCB8fCBhcmdzWzBdPy5kZWZhdWx0Py5zaG93VG9rZW4pIHJldHVybiBmYWxzZTtcclxuICAgICAgaWYgKGFyZ3NbMF0/LmdldFRva2VuIHx8IGFyZ3NbMF0/LmdldEVtYWlsIHx8IGFyZ3NbMF0/LnNob3dUb2tlbikgcmV0dXJuIGZhbHNlO1xyXG4gICAgICByZXR1cm4gZmlsdGVyKC4uLmFyZ3MpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycikge1xyXG4gICAgICBsb2dnZXIud2FybihcIk1vZHVsZSBmaWx0ZXIgdGhyZXcgYW4gZXhjZXB0aW9uLlwiLCBmaWx0ZXIsIGVycik7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBjaGVja01vZHVsZVN0cmluZ3MobSwgc3RyaW5ncywgaGFzTm90KSB7XHJcbiAgY29uc3QgY2hlY2sgPSAoczEsIHMyKSA9PiB7XHJcbiAgICByZXR1cm4gaGFzTm90ID8gczEudG9TdHJpbmcoKS5pbmRleE9mKHMyLnRvU3RyaW5nKCkpID09IC0xIDogczEudG9TdHJpbmcoKS5pbmRleE9mKHMyLnRvU3RyaW5nKCkpID4gLTE7XHJcbiAgfTtcclxuICByZXR1cm4gc3RyaW5ncy5ldmVyeShqID0+IHtcclxuICAgIHJldHVybiBjaGVjayhtPy50b1N0cmluZz8uKCkgfHwgXCJcIiwgailcclxuICAgICAgfHwgY2hlY2sobT8uX19vcmlnaW5hbF9fPy50b1N0cmluZz8uKCkgfHwgXCJcIiwgailcclxuICAgICAgfHwgY2hlY2sobT8udHlwZT8udG9TdHJpbmc/LigpIHx8IFwiXCIsIGopXHJcbiAgICAgIHx8IGNoZWNrKG0/LnR5cGU/Ll9fb3JpZ2luYWxfXz8udG9TdHJpbmc/LigpIHx8IFwiXCIsIGopXHJcbiAgICAgIHx8IE9iamVjdC5lbnRyaWVzKFsnZnVuY3Rpb24nLCAnb2JqZWN0J10uaW5jbHVkZXModHlwZW9mIG0/LnByb3RvdHlwZSkgPyB0eXBlb2YgbT8ucHJvdG90eXBlIDoge30pLmZpbHRlcihpID0+IGlbMF0/LmluY2x1ZGVzPy4oXCJyZW5kZXJcIikpLnNvbWUoaSA9PiBjaGVjayhpWzFdPy50b1N0cmluZz8uKCkgfHwgXCJcIiwgaikpXHJcbiAgfSk7XHJcbn07XHJcbmZ1bmN0aW9uIGNoZWNrTW9kdWxlUHJvcHMobSwgcHJvcGVydGllcywgaGFzTm90KSB7XHJcbiAgcmV0dXJuIHByb3BlcnRpZXMuZXZlcnkocHJvcCA9PiB7XHJcbiAgICBjb25zdCB2YWx1ZSA9IG1bcHJvcF0/Ll9fb3JpZ2luYWxfXyB8fCBtW3Byb3BdO1xyXG4gICAgcmV0dXJuIGhhc05vdCA/IHZhbHVlID09PSB1bmRlZmluZWQgOiAodmFsdWUgIT09IHVuZGVmaW5lZCAmJiAhKHR5cGVvZiB2YWx1ZSA9PSBcInN0cmluZ1wiICYmICF2YWx1ZSkpO1xyXG4gIH0pO1xyXG59O1xyXG5mdW5jdGlvbiBjaGVja01vZHVsZVByb3RvdHlwZXMobSwgcHJvdG9Qcm9wcywgaGFzTm90KSB7XHJcbiAgcmV0dXJuIG0ucHJvdG90eXBlICYmIHByb3RvUHJvcHMuZXZlcnkocHJvcCA9PiB7XHJcbiAgICBjb25zdCB2YWx1ZSA9IG0ucHJvdG90eXBlW3Byb3BdO1xyXG4gICAgcmV0dXJuIGhhc05vdCA/IHZhbHVlID09PSB1bmRlZmluZWQgOiAodmFsdWUgIT09IHVuZGVmaW5lZCAmJiAhKHR5cGVvZiB2YWx1ZSA9PSBcInN0cmluZ1wiICYmICF2YWx1ZSkpO1xyXG4gIH0pO1xyXG59O1xyXG5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBmaW5kKHJlcSwgZmlsdGVyLCBjb25maWcgPSB7fSkge1xyXG4gIGxldCBkZWZhdWx0RXhwb3J0ID0gdHlwZW9mIGNvbmZpZy5kZWZhdWx0RXhwb3J0ICE9IFwiYm9vbGVhblwiID8gdHJ1ZSA6IGNvbmZpZy5kZWZhdWx0RXhwb3J0O1xyXG4gIGxldCB1bmxvYWRlZCA9IHR5cGVvZiBjb25maWcudW5sb2FkZWQgIT0gXCJib29sZWFuXCIgPyBmYWxzZSA6IGNvbmZpZy51bmxvYWRlZDtcclxuICBsZXQgYWxsID0gdHlwZW9mIGNvbmZpZy5hbGwgIT0gXCJib29sZWFuXCIgPyBmYWxzZSA6IGNvbmZpZy5hbGw7XHJcbiAgY29uc3QgZm91bmQgPSBbXTtcclxuICBpZiAoIXVubG9hZGVkKSBmb3IgKGxldCBpIGluIHJlcS5jKSBpZiAocmVxLmMuaGFzT3duUHJvcGVydHkoaSkpIHtcclxuICAgIGxldCBtID0gcmVxLmNbaV0uZXhwb3J0cywgciA9IG51bGw7XHJcbiAgICBpZiAobSAmJiAodHlwZW9mIG0gPT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgbSA9PSBcImZ1bmN0aW9uXCIpKSB7XHJcbiAgICAgIGlmICghIShyID0gZmlsdGVyKG0sIGkpKSkge1xyXG4gICAgICAgIGlmIChhbGwpIGZvdW5kLnB1c2goZGVmYXVsdEV4cG9ydCA/IHIgOiByZXEuY1tpXSk7XHJcbiAgICAgICAgZWxzZSByZXR1cm4gZGVmYXVsdEV4cG9ydCA/IHIgOiByZXEuY1tpXTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIGZvciAobGV0IGtleSBvZiBPYmplY3Qua2V5cyhtKSkgaWYgKGtleS5sZW5ndGggPCA0ICYmIG1ba2V5XSAmJiAhIShyID0gZmlsdGVyKG1ba2V5XSwgaSkpKSB7XHJcbiAgICAgICAgaWYgKGFsbCkgZm91bmQucHVzaChkZWZhdWx0RXhwb3J0ID8gciA6IHJlcS5jW2ldKTtcclxuICAgICAgICBlbHNlIHJldHVybiBkZWZhdWx0RXhwb3J0ID8gciA6IHJlcS5jW2ldO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAobSAmJiBtLl9fZXNNb2R1bGUgJiYgbS5kZWZhdWx0ICYmICh0eXBlb2YgbS5kZWZhdWx0ID09IFwib2JqZWN0XCIgfHwgdHlwZW9mIG0uZGVmYXVsdCA9PSBcImZ1bmN0aW9uXCIpKSB7XHJcbiAgICAgIGlmICghIShyID0gZmlsdGVyKG0uZGVmYXVsdCwgaSkpKSB7XHJcbiAgICAgICAgaWYgKGFsbCkgZm91bmQucHVzaChkZWZhdWx0RXhwb3J0ID8gciA6IHJlcS5jW2ldKTtcclxuICAgICAgICBlbHNlIHJldHVybiBkZWZhdWx0RXhwb3J0ID8gciA6IHJlcS5jW2ldO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYgKG0uZGVmYXVsdC50eXBlICYmICh0eXBlb2YgbS5kZWZhdWx0LnR5cGUgPT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgbS5kZWZhdWx0LnR5cGUgPT0gXCJmdW5jdGlvblwiKSAmJiAhIShyID0gZmlsdGVyKG0uZGVmYXVsdC50eXBlLCBpKSkpIHtcclxuICAgICAgICBpZiAoYWxsKSBmb3VuZC5wdXNoKGRlZmF1bHRFeHBvcnQgPyByIDogcmVxLmNbaV0pO1xyXG4gICAgICAgIGVsc2UgcmV0dXJuIGRlZmF1bHRFeHBvcnQgPyByIDogcmVxLmNbaV07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgZm9yIChsZXQgaSBpbiByZXEubSkgaWYgKHJlcS5tLmhhc093blByb3BlcnR5KGkpKSB7XHJcbiAgICBsZXQgbSA9IHJlcS5tW2ldO1xyXG4gICAgaWYgKG0gJiYgdHlwZW9mIG0gPT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgIGlmIChyZXEuY1tpXSAmJiAhdW5sb2FkZWQgJiYgZmlsdGVyKG0sIGkpKSB7XHJcbiAgICAgICAgaWYgKGFsbCkgZm91bmQucHVzaChkZWZhdWx0RXhwb3J0ID8gcmVxLmNbaV0uZXhwb3J0cyA6IHJlcS5jW2ldKTtcclxuICAgICAgICBlbHNlIHJldHVybiBkZWZhdWx0RXhwb3J0ID8gcmVxLmNbaV0uZXhwb3J0cyA6IHJlcS5jW2ldO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICghcmVxLmNbaV0gJiYgdW5sb2FkZWQgJiYgZmlsdGVyKG0sIGkpKSB7XHJcbiAgICAgICAgY29uc3QgcmVzb2x2ZWQgPSB7fSwgcmVzb2x2ZWQyID0ge307XHJcbiAgICAgICAgbShyZXNvbHZlZCwgcmVzb2x2ZWQyLCByZXEpO1xyXG4gICAgICAgIGNvbnN0IHRydWVSZXNvbHZlZCA9IHJlc29sdmVkMiAmJiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhyZXNvbHZlZDIgfHwge30pLmxlbmd0aCA9PSAwID8gcmVzb2x2ZWQgOiByZXNvbHZlZDI7XHJcbiAgICAgICAgaWYgKGFsbCkgZm91bmQucHVzaChkZWZhdWx0RXhwb3J0ID8gdHJ1ZVJlc29sdmVkLmV4cG9ydHMgOiB0cnVlUmVzb2x2ZWQpO1xyXG4gICAgICAgIGVsc2UgcmV0dXJuIGRlZmF1bHRFeHBvcnQgPyB0cnVlUmVzb2x2ZWQuZXhwb3J0cyA6IHRydWVSZXNvbHZlZDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICBpZiAoYWxsKSByZXR1cm4gZm91bmQ7XHJcbn07XHJcblxyXG5cclxuZnVuY3Rpb24gZmluZGVyRmluZEZ1bmN0aW9uKGVudHJpZXMsIHN0cmluZ3MpIHtcclxuICByZXR1cm4gKGVudHJpZXMuZmluZChuID0+IHtcclxuICAgIGxldCBmdW5jU3RyaW5nID0gdHlwZW9mIG5bMV0gPT0gXCJmdW5jdGlvblwiID8gKG5bMV0/Ll9fb3JpZ2luYWxfXz8udG9TdHJpbmc/LigpIHx8IG5bMV0/LnRvU3RyaW5nPy4oKSB8fCBcIlwiKSA6ICgoKSA9PiB7IHRyeSB7IHJldHVybiBKU09OLnN0cmluZ2lmeShuWzFdKSB9IGNhdGNoIChlcnIpIHsgcmV0dXJuIG5bMV0udG9TdHJpbmcoKSB9IH0pKCk7XHJcbiAgICBsZXQgcmVuZGVyRnVuY1N0cmluZyA9IG5bMV0/LnJlbmRlcj8uX19vcmlnaW5hbF9fPy50b1N0cmluZz8uKCkgfHwgblsxXT8ucmVuZGVyPy50b1N0cmluZz8uKCkgfHwgXCJcIjtcclxuICAgIHJldHVybiBzdHJpbmdzLmV2ZXJ5KHN0cmluZyA9PiBmdW5jU3RyaW5nLmluZGV4T2Yoc3RyaW5nKSAhPSAtMSB8fCByZW5kZXJGdW5jU3RyaW5nLmluZGV4T2Yoc3RyaW5nKSAhPSAtMSk7XHJcbiAgfSkpO1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRCeUZpbmRlcihyZXEsIGZpbmRlciA9IHt9KSB7XHJcbiAgbGV0IGZvdW5kID0gbnVsbDtcclxuXHJcbiAgaWYgKHR5cGVvZiBmaW5kZXI/LmZpbHRlciA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgZm91bmQgPSBmaW5kKHJlcSwgd3JhcEZpbHRlcihldmFsKGAoKCQpPT57IHRyeSB7IHJldHVybiAoJHtmaW5kZXIuZmlsdGVyfSk7IH0gY2F0Y2ggeyByZXR1cm4gZmFsc2U7IH0gfSlgKSksIHsgZGVmYXVsdEV4cG9ydDogZmFsc2UgfSk7XHJcbiAgfSBlbHNlIGlmICh0eXBlb2YgZmluZGVyPy5maWx0ZXIgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgZm91bmQgPSBmaW5kKHJlcSwgd3JhcEZpbHRlcihmaW5kZXIuZmlsdGVyKSwgeyBkZWZhdWx0RXhwb3J0OiBmYWxzZSB9KTtcclxuICB9IGVsc2Uge1xyXG4gICAgY29uc3QgZGVmYXVsdEV4cG9ydCA9ICEhZmluZGVyPy5maWx0ZXI/LmV4cG9ydDtcclxuXHJcbiAgICBzd2l0Y2ggKGZpbmRlci5maWx0ZXIuaW4pIHtcclxuICAgICAgY2FzZSBcInByb3BlcnRpZXNcIjoge1xyXG4gICAgICAgIGlmIChmaW5kZXIuZmlsdGVyLmJ5Py5bMV0/Lmxlbmd0aCkge1xyXG4gICAgICAgICAgZm91bmQgPSBmaW5kKHJlcSwgd3JhcEZpbHRlcigobSkgPT4gY2hlY2tNb2R1bGVQcm9wcyhtLCBmaW5kZXIuZmlsdGVyLmJ5Py5bMF0gfHwgW10pICYmIGNoZWNrTW9kdWxlUHJvcHMobSwgZmluZGVyLmZpbHRlci5ieT8uWzFdIHx8IFtdLCB0cnVlKSksIHsgZGVmYXVsdEV4cG9ydCB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZm91bmQgPSBmaW5kKHJlcSwgd3JhcEZpbHRlcigobSkgPT4gY2hlY2tNb2R1bGVQcm9wcyhtLCBmaW5kZXIuZmlsdGVyLmJ5Py5bMF0gfHwgW10pKSwgeyBkZWZhdWx0RXhwb3J0IH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlIFwicHJvdG90eXBlc1wiOiB7XHJcbiAgICAgICAgaWYgKGZpbmRlci5maWx0ZXIuYnk/LlsxXT8ubGVuZ3RoKSB7XHJcbiAgICAgICAgICBmb3VuZCA9IGZpbmQocmVxLCB3cmFwRmlsdGVyKChtKSA9PiBjaGVja01vZHVsZVByb3RvdHlwZXMobSwgZmluZGVyLmZpbHRlci5ieT8uWzBdIHx8IFtdKSAmJiBjaGVja01vZHVsZVByb3RvdHlwZXMobSwgZmluZGVyLmZpbHRlci5ieT8uWzFdIHx8IFtdLCB0cnVlKSksIHsgZGVmYXVsdEV4cG9ydCB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZm91bmQgPSBmaW5kKHJlcSwgd3JhcEZpbHRlcigobSkgPT4gY2hlY2tNb2R1bGVQcm90b3R5cGVzKG0sIGZpbmRlci5maWx0ZXIuYnk/LlswXSB8fCBbXSkpLCB7IGRlZmF1bHRFeHBvcnQgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgXCJzdHJpbmdzXCI6IHtcclxuICAgICAgICBpZiAoZmluZGVyLmZpbHRlci5ieT8uWzFdPy5sZW5ndGgpIHtcclxuICAgICAgICAgIGZvdW5kID0gZmluZChyZXEsIHdyYXBGaWx0ZXIoKG0pID0+IGNoZWNrTW9kdWxlU3RyaW5ncyhtLCBmaW5kZXIuZmlsdGVyLmJ5Py5bMF0gfHwgW10pICYmIGNoZWNrTW9kdWxlU3RyaW5ncyhtLCBmaW5kZXIuZmlsdGVyLmJ5Py5bMV0gfHwgW10sIHRydWUpKSwgeyBkZWZhdWx0RXhwb3J0IH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBmb3VuZCA9IGZpbmQocmVxLCB3cmFwRmlsdGVyKChtKSA9PiBjaGVja01vZHVsZVN0cmluZ3MobSwgZmluZGVyLmZpbHRlci5ieT8uWzBdIHx8IFtdKSksIHsgZGVmYXVsdEV4cG9ydCB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlmICghZm91bmQpIHJldHVybiBudWxsO1xyXG5cclxuICBpZiAoZmluZGVyLnBhdGg/LmJlZm9yZSkgZm91bmQgPSAoQXJyYXkuaXNBcnJheShmaW5kZXIucGF0aC5iZWZvcmUpID8gZmluZGVyLnBhdGguYmVmb3JlLm1hcChpID0+IF8uZ2V0KGZvdW5kLCBpKSkuZmluZChpID0+IGkpIDogXy5nZXQoZm91bmQsIGZpbmRlci5wYXRoLmJlZm9yZSkpIHx8IGZvdW5kO1xyXG4gIGlmIChmaW5kZXIuYXNzaWduKSBmb3VuZCA9IE9iamVjdC5hc3NpZ24oe30sIGZvdW5kKTtcclxuXHJcbiAgaWYgKCFmb3VuZCkgcmV0dXJuIG51bGw7XHJcblxyXG4gIGlmIChmaW5kZXIubWFwKSB7XHJcbiAgICBsZXQgX19vcmlnaW5hbF9fID0gZm91bmQ7XHJcbiAgICBsZXQgX19tYXBwZWRfXyA9IHt9O1xyXG5cclxuICAgIGxldCB0ZW1wID0ge1xyXG4gICAgICBfX29yaWdpbmFsX18sXHJcbiAgICAgIF9fbWFwcGVkX18sXHJcbiAgICAgIC4uLl9fb3JpZ2luYWxfX1xyXG4gICAgfTtcclxuXHJcbiAgICBPYmplY3QuZW50cmllcyhmaW5kZXIubWFwKS5mb3JFYWNoKChba2V5LCBzdHJpbmdzXSkgPT4ge1xyXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGVtcCwga2V5LCB7XHJcbiAgICAgICAgZ2V0KCkge1xyXG4gICAgICAgICAgaWYgKF9fbWFwcGVkX19ba2V5XSkgcmV0dXJuIF9fb3JpZ2luYWxfX1tfX21hcHBlZF9fW2tleV1dO1xyXG5cclxuICAgICAgICAgIGxldCBmb3VuZEZ1bmMgPSBmaW5kZXJGaW5kRnVuY3Rpb24oT2JqZWN0LmVudHJpZXMoX19vcmlnaW5hbF9fIHx8IHt9KSwgZmluZGVyLm1hcFtrZXldIHx8IFtdKTtcclxuICAgICAgICAgIGlmICghZm91bmRGdW5jPy5sZW5ndGgpIHJldHVybjtcclxuXHJcbiAgICAgICAgICBfX21hcHBlZF9fW2tleV0gPSBmb3VuZEZ1bmNbMF07XHJcbiAgICAgICAgICByZXR1cm4gZm91bmRGdW5jWzFdO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH0pO1xyXG5cclxuICAgIGZvdW5kID0gdGVtcDtcclxuICB9XHJcblxyXG4gIGlmIChmaW5kZXIucGF0aD8uYWZ0ZXIpIGZvdW5kID0gKEFycmF5LmlzQXJyYXkoZmluZGVyLnBhdGguYWZ0ZXIpID8gZmluZGVyLnBhdGguYWZ0ZXIubWFwKGkgPT4gXy5nZXQoZm91bmQsIGkpKS5maW5kKGkgPT4gaSkgOiBfLmdldChmb3VuZCwgZmluZGVyLnBhdGguYWZ0ZXIpKSB8fCBmb3VuZDtcclxuXHJcbiAgcmV0dXJuIGZvdW5kO1xyXG59IiwgImltcG9ydCAqIGFzIGNvbXBsZXhGaW5kZXIgZnJvbSBcIi4vcmF3L2NvbXBsZXgtZmluZGVyLmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgX19jYWNoZV9fOiB7fSxcclxuICBnZXQgcmVxKCkge1xyXG4gICAgaWYgKHRoaXMuX19jYWNoZV9fLnJlcSkgcmV0dXJuIHRoaXMuX19jYWNoZV9fLnJlcTtcclxuICAgIGxldCByZXFJZCA9IGBBY29yZFdlYnBhY2tNb2R1bGVzJHtEYXRlLm5vdygpfWA7XHJcbiAgICBjb25zdCByZXEgPSB3aW5kb3cud2VicGFja0NodW5rZGlzY29yZF9hcHAucHVzaChbW3JlcUlkXSwge30sIHJlcSA9PiByZXFdKTtcclxuICAgIGRlbGV0ZSByZXEubVtyZXFJZF07XHJcbiAgICBkZWxldGUgcmVxLmNbcmVxSWRdO1xyXG4gICAgd2luZG93LndlYnBhY2tDaHVua2Rpc2NvcmRfYXBwLnBvcCgpO1xyXG4gICAgdGhpcy5fX2NhY2hlX18uX3JlcSA9IHJlcTtcclxuICAgIHJldHVybiByZXE7XHJcbiAgfSxcclxuICBmaW5kKGZpbHRlciwgY29uZmlnID0ge30pIHtcclxuICAgIHJldHVybiBjb21wbGV4RmluZGVyLmZpbmQodGhpcy5yZXEsIGNvbXBsZXhGaW5kZXIud3JhcEZpbHRlcihmaWx0ZXIpLCBjb25maWcpO1xyXG4gIH0sXHJcbiAgZmlsdGVyKGZpbHRlciwgY29uZmlnID0ge30pIHtcclxuICAgIHJldHVybiBjb21wbGV4RmluZGVyLmZpbmQodGhpcy5yZXEsIGNvbXBsZXhGaW5kZXIud3JhcEZpbHRlcihmaWx0ZXIpLCB7IC4uLmNvbmZpZywgYWxsOiB0cnVlIH0pO1xyXG4gIH0sXHJcbiAgZmluZEJ5RmluZGVyKGZpbmRlcikge1xyXG4gICAgcmV0dXJuIGNvbXBsZXhGaW5kZXIuZmluZEJ5RmluZGVyKHRoaXMucmVxLCBmaW5kZXIpO1xyXG4gIH0sXHJcbiAgZmluZEJ5UHJvcGVydGllcyguLi5wcm9wcykge1xyXG4gICAgcmV0dXJuIHRoaXMuZmluZEJ5RmluZGVyKHtcclxuICAgICAgZmlsdGVyOiB7XHJcbiAgICAgICAgZXhwb3J0OiBmYWxzZSxcclxuICAgICAgICBpbjogXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgYnk6IFtwcm9wc11cclxuICAgICAgfSxcclxuICAgICAgcGF0aDoge1xyXG4gICAgICAgIGJlZm9yZTogW1xyXG4gICAgICAgICAgXCJleHBvcnRzLlpcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5aUFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLmRlZmF1bHRcIixcclxuICAgICAgICAgIFwiZXhwb3J0c1wiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9LFxyXG4gIGZpbmRCeVByb3RvdHlwZXMoLi4ucHJvcHMpIHtcclxuICAgIHJldHVybiB0aGlzLmZpbmRCeUZpbmRlcih7XHJcbiAgICAgIGZpbHRlcjoge1xyXG4gICAgICAgIGV4cG9ydDogZmFsc2UsXHJcbiAgICAgICAgaW46IFwicHJvcGVydGllc1wiLFxyXG4gICAgICAgIGJ5OiBbcHJvcHNdXHJcbiAgICAgIH0sXHJcbiAgICAgIHBhdGg6IHtcclxuICAgICAgICBiZWZvcmU6IFtcclxuICAgICAgICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlBcIixcclxuICAgICAgICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICAgICAgICBcImV4cG9ydHNcIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSxcclxuICBmaW5kQnlTdHJpbmdzKC4uLnByb3BzKSB7XHJcbiAgICByZXR1cm4gdGhpcy5maW5kQnlGaW5kZXIoe1xyXG4gICAgICBmaWx0ZXI6IHtcclxuICAgICAgICBleHBvcnQ6IGZhbHNlLFxyXG4gICAgICAgIGluOiBcInByb3BlcnRpZXNcIixcclxuICAgICAgICBieTogW3Byb3BzXVxyXG4gICAgICB9LFxyXG4gICAgICBwYXRoOiB7XHJcbiAgICAgICAgYmVmb3JlOiBbXHJcbiAgICAgICAgICBcImV4cG9ydHMuWlwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzLlpQXCIsXHJcbiAgICAgICAgICBcImV4cG9ydHMuZGVmYXVsdFwiLFxyXG4gICAgICAgICAgXCJleHBvcnRzXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0sXHJcbn07IiwgImltcG9ydCBjb21tb25EYXRhIGZyb20gJy4uLy4uL2RhdGEvY29tbW9uLmpzb24nO1xyXG5pbXBvcnQgd2VicGFjayBmcm9tICcuL3dlYnBhY2suanMnO1xyXG5cclxuXHJcbmZ1bmN0aW9uIG1hcE9iamVjdCh0ZW1wLCBpbnApIHtcclxuICBpZiAoIXRlbXA/Ll9fY2FjaGVfXykgdGVtcC5fX2NhY2hlX18gPSB7fTtcclxuICBmb3IgKGNvbnN0IGtleSBpbiBpbnApIHtcclxuICAgIGlmIChpbnA/LltrZXldPy5fXyA9PT0gdHJ1ZSkge1xyXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGVtcCwga2V5LCB7XHJcbiAgICAgICAgZ2V0KCkge1xyXG4gICAgICAgICAgaWYgKHRlbXAuX19jYWNoZV9fW2tleV0pIHJldHVybiB0ZW1wLl9fY2FjaGVfX1trZXldO1xyXG4gICAgICAgICAgcmV0dXJuIHRlbXAuX19jYWNoZV9fW2tleV0gPSB3ZWJwYWNrLmZpbmRCeUZpbmRlcihpbnBba2V5XSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGVtcFtrZXldID0ge307XHJcbiAgICAgIG1hcE9iamVjdCh0ZW1wW2tleV0sIGlucFtrZXldKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcblxyXG5sZXQgY29tbW9uQVBJID0geyBfX2NhY2hlX186IHt9IH07XHJcbm1hcE9iamVjdChjb21tb25BUEksIGNvbW1vbkRhdGEuY29tbW9uKTtcclxue1xyXG4gIGxldCBwYXRocyA9IFtcclxuICAgIFwiZXhwb3J0cy5aXCIsXHJcbiAgICBcImV4cG9ydHMuWlBcIixcclxuICAgIFwiZXhwb3J0cy5kZWZhdWx0XCIsXHJcbiAgICBcImV4cG9ydHNcIlxyXG4gIF07XHJcbiAgd2VicGFjay5maWx0ZXIoKGkpID0+IGk/LmdldE5hbWU/LigpPy5lbmRzV2l0aD8uKFwiU3RvcmVcIiksIHsgZGVmYXVsdEV4cG9ydDogZmFsc2UgfSkuZm9yRWFjaCgobSkgPT4ge1xyXG4gICAgbGV0IG9iaiA9IHBhdGhzLm1hcChwYXRoID0+IF8uZ2V0KG0sIHBhdGgpKS5maW5kKGkgPT4gaSk7XHJcbiAgICBpZiAoIW9iaikgcmV0dXJuO1xyXG4gICAgbGV0IG5hbWUgPSBvYmo/LmdldE5hbWU/LigpO1xyXG4gICAgaWYgKCFuYW1lKSByZXR1cm47XHJcbiAgICBpZiAoY29tbW9uQVBJW25hbWVdKSByZXR1cm47XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvbW1vbkFQSSwgbmFtZSwge1xyXG4gICAgICBnZXQoKSB7XHJcbiAgICAgICAgaWYgKGNvbW1vbkFQSS5fX2NhY2hlX19bbmFtZV0pIHJldHVybiBjb21tb25BUEkuX19jYWNoZV9fW25hbWVdO1xyXG4gICAgICAgIHJldHVybiBjb21tb25BUEkuX19jYWNoZV9fW25hbWVdID0gb2JqO1xyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbW1vbkFQSTsiLCAiaW1wb3J0IGNvbW1vbiBmcm9tIFwiLi9jb21tb24uanNcIjtcclxuaW1wb3J0IHdlYnBhY2sgZnJvbSBcIi4vd2VicGFjay5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGNvbW1vbixcclxuICB3ZWJwYWNrLFxyXG4gIHJlcXVpcmU6IGdsb2JhbFRoaXNbXCI8UFJFTE9BRF9LRVk+XCJdLnJlcXVpcmVcclxufSIsICJpbXBvcnQgYXBpIGZyb20gXCIuLi9pbmRleC5qc1wiO1xyXG5cclxubGV0IGRldk1vZGVFbmFibGVkID0gZmFsc2U7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgZ2V0IGVuYWJsZWQoKSB7XHJcbiAgICByZXR1cm4gZGV2TW9kZUVuYWJsZWQ7XHJcbiAgfSxcclxuICBzZXQgZW5hYmxlZCh2YWx1ZSkge1xyXG4gICAgaWYgKCFnbG9iYWxUaGlzW1wiPFBSRUxPQURfS0VZPlwiXS5pc0RldlRvb2xzT3BlbigpKSB0aHJvdyBuZXcgRXJyb3IoXCJEZXYgbW9kZSBzdGF0dXMgY2FuIG9ubHkgYmUgbW9kaWZpZWQgd2hlbiBEZXZUb29scyBpcyBvcGVuIVwiKTtcclxuICAgIGRldk1vZGVFbmFibGVkID0gdmFsdWU7XHJcbiAgfVxyXG59IiwgImltcG9ydCBsb2dnZXIgZnJvbSBcIi4vbG9nZ2VyLmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgbG9nZ2VyXHJcbn0iLCAiaW1wb3J0IG1vZHVsZXMgZnJvbSAnLi9tb2R1bGVzJztcclxuaW1wb3J0IGRldiBmcm9tICcuL2Rldic7XHJcbmltcG9ydCB1dGlscyBmcm9tICcuL3V0aWxzJztcclxuXHJcbnV0aWxzLmxvZ2dlci5kZWJ1ZyhgUFJFTE9BRF9LRVk6IDxQUkVMT0FEX0tFWT5gKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBleHBvc2VkQVBJOiB7XHJcbiAgICBkZXYsXHJcbiAgICB1dGlscyxcclxuICAgIGdldCBtb2R1bGVzKCkge1xyXG4gICAgICBpZiAoIWRldi5lbmFibGVkKSB0aHJvdyBuZXcgRXJyb3IoXCJNb2R1bGVzIEFQSSBjYW4gb25seSBiZSBhY2Nlc3NlZCB3aGVuIERldiBtb2RlIGlzIGVuYWJsZWQhXCIpO1xyXG4gICAgICByZXR1cm4gbW9kdWxlcztcclxuICAgIH0sXHJcbiAgICBnZXQgaW50ZXJuYWwoKSB7XHJcbiAgICAgIGlmICghZGV2LmVuYWJsZWQpIHRocm93IG5ldyBFcnJvcihcIkludGVybmFsIEFQSSBjYW4gb25seSBiZSBhY2Nlc3NlZCB3aGVuIERldiBtb2RlIGlzIGVuYWJsZWQhXCIpO1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHByb2Nlc3M6IGdsb2JhbFRoaXNbXCI8UFJFTE9BRF9LRVk+XCJdLnByb2Nlc3MsXHJcbiAgICAgICAgaXNEZXZUb29sc09wZW46IGdsb2JhbFRoaXNbXCI8UFJFTE9BRF9LRVk+XCJdLmlzRGV2VG9vbHNPcGVuLFxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICB1bmV4cG9zZWRBUEk6IHtcclxuICAgIGRldixcclxuICAgIG1vZHVsZXMsXHJcbiAgICB1dGlscyxcclxuICAgIGludGVybmFsOiB7XHJcbiAgICAgIHByb2Nlc3M6IGdsb2JhbFRoaXNbXCI8UFJFTE9BRF9LRVk+XCJdLnByb2Nlc3MsXHJcbiAgICAgIGlzRGV2VG9vbHNPcGVuOiBnbG9iYWxUaGlzW1wiPFBSRUxPQURfS0VZPlwiXS5pc0RldlRvb2xzT3BlbixcclxuICAgIH1cclxuICB9XHJcbn0iLCAiaW1wb3J0IGFwaSBmcm9tIFwiLi9hcGlcIjtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3csIFwiYWNvcmRcIiwge1xyXG4gIGdldCgpIHtcclxuICAgIHJldHVybiBhcGkuZXhwb3NlZEFQSTtcclxuICB9XHJcbn0pO1xyXG53aW5kb3cuZ2xvYmFsID0gd2luZG93OyJdLAogICJtYXBwaW5ncyI6ICI7QUFBQTtBQUFBLEVBQ0UsUUFBVTtBQUFBLElBQ1IsUUFBVTtBQUFBLE1BQ1IsWUFBYztBQUFBLFFBQ1osSUFBTTtBQUFBLFFBQ04sUUFBVTtBQUFBLFVBQ1IsUUFBVTtBQUFBLFVBQ1YsSUFBTTtBQUFBLFVBQ04sSUFBTTtBQUFBLFlBQ0o7QUFBQSxjQUNFO0FBQUEsY0FDQTtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLFFBQ0EsTUFBUTtBQUFBLFVBQ04sT0FBUztBQUFBLFlBQ1A7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLFdBQWE7QUFBQSxRQUNYLElBQU07QUFBQSxRQUNOLFFBQVU7QUFBQSxVQUNSLFFBQVU7QUFBQSxVQUNWLElBQU07QUFBQSxVQUNOLElBQU07QUFBQSxZQUNKO0FBQUEsY0FDRTtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLFFBQ0EsTUFBUTtBQUFBLFVBQ04sT0FBUztBQUFBLFlBQ1A7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLFNBQVc7QUFBQSxRQUNULE1BQVE7QUFBQSxVQUNO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UUFBUSxPQUFPO0FBQ2pCLFFBQUksQ0FBQyxXQUFXLGVBQWUsRUFBRSxlQUFlO0FBQUcsWUFBTSxJQUFJLE1BQU0sNkRBQTZEO0FBQ2hJLHFCQUFpQjtBQUFBLEVBQ25CO0FBQ0Y7OztBQ1ZBLElBQU8sZ0JBQVE7QUFBQSxFQUNiO0FBQ0Y7OztBQ0FBLGNBQU0sT0FBTyxNQUFNLDRCQUE0QjtBQUUvQyxJQUFPLGNBQVE7QUFBQSxFQUNiLFlBQVk7QUFBQSxJQUNWO0FBQUEsSUFDQTtBQUFBLElBQ0EsSUFBSSxVQUFVO0FBQ1osVUFBSSxDQUFDLFlBQUk7QUFBUyxjQUFNLElBQUksTUFBTSw0REFBNEQ7QUFDOUYsYUFBTztBQUFBLElBQ1Q7QUFBQSxJQUNBLElBQUksV0FBVztBQUNiLFVBQUksQ0FBQyxZQUFJO0FBQVMsY0FBTSxJQUFJLE1BQU0sNkRBQTZEO0FBQy9GLGFBQU87QUFBQSxRQUNMLFNBQVMsV0FBVyxlQUFlLEVBQUU7QUFBQSxRQUNyQyxnQkFBZ0IsV0FBVyxlQUFlLEVBQUU7QUFBQSxNQUM5QztBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxjQUFjO0FBQUEsSUFDWjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQSxVQUFVO0FBQUEsTUFDUixTQUFTLFdBQVcsZUFBZSxFQUFFO0FBQUEsTUFDckMsZ0JBQWdCLFdBQVcsZUFBZSxFQUFFO0FBQUEsSUFDOUM7QUFBQSxFQUNGO0FBQ0Y7OztBQzdCQSxPQUFPLGVBQWUsUUFBUSxTQUFTO0FBQUEsRUFDckMsTUFBTTtBQUNKLFdBQU8sWUFBSTtBQUFBLEVBQ2I7QUFDRixDQUFDO0FBQ0QsT0FBTyxTQUFTOyIsCiAgIm5hbWVzIjogWyJyZXEiLCAiZm91bmQiLCAicmVxIiwgImZpbmRlciIsICJjb21tb25fZGVmYXVsdCIsICJjb21tb25fZGVmYXVsdCJdCn0K
