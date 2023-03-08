import events from "../api/events";
import i18n from "../api/i18n";
let lastLocale = i18n.locale;
setInterval(() => {
  if (i18n.locale !== lastLocale) {
    lastLocale = i18n.locale;
    events.emit("LocaleChange", { locale: lastLocale });
  }
}, 1000);