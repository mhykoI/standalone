import findInTree from "./raw/find-in-tree.js";
import logger from "./logger.js";
import react from "./react.js";

export default {
  logger,
  react,
  findInTree,
  format(val, ...args) {
    return `${val}`.replaceAll(/{(\d+)}/g, (_, cap) => {
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
    if (val) cb(val);
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
}