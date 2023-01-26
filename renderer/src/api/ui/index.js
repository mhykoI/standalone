import patcher from "../patcher/index.js";
import styleCSSText from "./styles.scss";
patcher.injectCSS(styleCSSText);

import tooltips from "./tooltips.js";
import notifications from "./notifications.js";
import contextMenus from "./contextMenus.js";
import components from "./components.js";


export default {
  tooltips,
  notifications,
  contextMenus,
  components
}