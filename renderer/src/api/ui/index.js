import patcher from "../patcher/index.js";
import tooltips from "./tooltips.js";

import styleCSSText from "./styles.scss";
import notifications from "./notifications.js";
import contextMenus from "./contextMenus.js";
patcher.injectCSS(styleCSSText);

export default {
  tooltips,
  notifications,
  contextMenus
}