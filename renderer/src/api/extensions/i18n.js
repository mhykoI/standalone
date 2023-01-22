import i18n from "../i18n";
import utils from "../utils";

/**
 * @param {{ i18n: string | { [lang: string]: { [k: string]: string } }}} cfg 
 * @returns 
 */
export async function buildExtensionI18N(cfg) {
  if (!cfg?.i18n) return null;
  let out = {
    __cache__: {
      localeIds: [],
      localizations: {}
    },
    format(key, ...args) {
      return utils.format(out.get(key), ...args);
    },
    get(key) {
      if (typeof cfg.i18n === "string") check();
      return out.__cache__.localizations[out.locale]?.[key]
        || out.__cache__.localizations.default?.[key]
        || out.get(key);
    },
    messages: new Proxy({}, {
      get(_, prop) {
        return out.get(prop);
      }
    }),
  }
  async function check() {
    const locale = i18n.locale;
    if (typeof cfg.i18n === "string") {
      const BASE_URL = cfg.i18n.endsWith("/") ? cfg.i18n.slice(0, -1) : cfg.i18n;
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
    } else {
      out.__cache__.localeIds = Object.keys(cfg.i18n);
      out.__cache__.localizations = cfg.i18n;
    }
  }
  await check();
  return out;
}