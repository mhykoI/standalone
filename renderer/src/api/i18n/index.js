import modules from "../modules/index.js"
import utils from "../utils/index.js";

const BASE_URL = "https://raw.githubusercontent.com/AcordPlugin/i18n/main";
const noStore = { cache: "no-store" };


const i18n = {
  __cache__: {
    localeIds: [],
    localizations: {}
  },
  get locale() {
    return modules.common.i18n._requestedLocale;
  },
  messages: new Proxy({}, {
    get(_, prop) {
      check();
      return i18n.__cache__.localizations[i18n.locale]?.[prop]
        || i18n.__cache__.localizations.default?.[prop]
        || modules.common.i18n.Messages[prop]
        || prop;
    }
  }),
  localize(str) {
    if (typeof str === "string") return str;
    return str?.[i18n.locale]
      || str?.default
      || Object.values(str)[0];
  },
  format(key, ...args) {
    return utils.format(i18n.messages[key], ...args);
  }
}

async function check() {
  const locale = i18n.locale;
  if (!i18n.__cache__.localeIds.length) {
    try {
      i18n.__cache__.localeIds = await (await fetch(`${BASE_URL}/locales.json`, noStore)).json();
    } catch { }
    try {
      i18n.__cache__.localizations.default = await (await fetch(`${BASE_URL}/default.json`, noStore)).json();
    } catch { }
  }
  if (
    i18n.__cache__.localeIds.includes(locale)
    && !i18n.__cache__.localizations?.[locale]
  ) {
    try {
      i18n.__cache__.localizations[locale] = await (await fetch(`${BASE_URL}/${locale}.json`, noStore)).json();
    } catch { };
  }
}

check();
export default i18n;