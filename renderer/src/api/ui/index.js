import patcher from "../patcher/index.js";
import tooltips from "./tooltips.js";

import styleCSSText from "./styles.scss";
patcher.injectCSS(styleCSSText);

export default {
  tooltips
}