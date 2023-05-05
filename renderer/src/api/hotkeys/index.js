
let keyObjMap = {
  "ctrl": { ctrlKey: true },
  "shift": { shiftKey: true },
  "alt": { altKey: true },
  "meta": { metaKey: true },
  "cmd": { metaKey: true },
  "win": { metaKey: true }
}

function parse(keyCombo) {
  keyCombo = keyCombo.toLowerCase();
  return keyCombo.split("+").map((key) => {
    return keyObjMap[key] || { key };
  }).reduce((all, curr) => {
    return Object.assign(all, curr)
  }, { ctrlKey: false, shiftKey: false, altKey: false, metaKey: false, key: "" })
}

function check(keyCombo, e) {
  let keyObj = parse(keyCombo);
  e.key = e.key.toLowerCase();
  return Object.keys(keyObj).every((key) => {
    return e[key] === keyObj[key];
  });
}

function format(e) {
  let keyCombo = [];
  if (e.ctrlKey) keyCombo.push("ctrl");
  if (e.shiftKey) keyCombo.push("shift");
  if (e.altKey) keyCombo.push("alt");
  if (e.metaKey) keyCombo.push("meta");
  if (e.key) keyCombo.push(e.key.toLowerCase());
  return keyCombo.join("+");
}

const out = {
  __cache__: {
    /** @type {Map<string, Set<Function>>} */
    listeners: new Map(),
    initialized: false
  },
  register(keyCombo, callback) {
    if (!out.__cache__.listeners.has(keyCombo)) {
      out.__cache__.listeners.set(keyCombo, new Set())
    }
    let map = out.__cache__.listeners.get(keyCombo);
    map.add(callback);

    return () => {
      map.delete(callback);
    }
  },
  init() {
    if (out.__cache__.initialized) return;
    out.__cache__.initialized = true;

    document.addEventListener("keydown", (e) => {
      out.__cache__.listeners.forEach((callbacks, keyCombo) => {
        if (check(keyCombo, e)) callbacks.forEach((callback) => {
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
  check,
  format
}

export default out