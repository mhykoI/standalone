import modules from "../modules/index.js"
import utils from "../utils/index.js";

const BASE_URL = "https://raw.githubusercontent.com/acord-standalone/assets/main/i18n";
const noStore = { cache: "no-store" };

let initialized = false;
const out = {
  __cache__: {
    localeIds: [],
    localizations: {}
  },
  get locale() {
    return modules.common.i18n._requestedLocale;
  },
  get(key) {
    check();
    return out.__cache__.localizations[out.locale]?.[key]
      || out.__cache__.localizations.default?.[key]
      || modules.common.i18n.Messages[key]
      || key;
  },
  messages: new Proxy({}, {
    get(_, prop) {
      return out.get(prop);
    }
  }),
  localize(str, ...args) {
    if (typeof str === "string") return utils.format(str, ...args);
    let val = str?.[out.locale]
      || str?.default
      || Object.values(str)[0];
    if (!val) return null;
    return utils.format(val, ...args);
  },
  format(key, ...args) {
    return utils.format(out.get(key), ...args);
  },
  async init() {
    await check();
  }
}

async function check() {
  const locale = out.locale;
  if (!out.__cache__.localeIds.length) {
    try {
      out.__cache__.localeIds = await (await fetch(`${BASE_URL}/locales.json`, noStore)).json();
    } catch { }
    try {
      out.__cache__.localizations.default = await (await fetch(`${BASE_URL}/default.json`, noStore)).json();
    } catch { }
  }
  if (
    out.__cache__.localeIds.includes(locale)
    && !out.__cache__.localizations?.[locale]
  ) {
    try {
      out.__cache__.localizations[locale] = await (await fetch(`${BASE_URL}/${locale}.json`, noStore)).json();
    } catch { };
  }
}


export default out;