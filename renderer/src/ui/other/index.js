import patcher from "../../api/patcher/index.js";

import "./logo";
import "./fix-window-actions";
import "./badges";
import "./colored-name";

import styleText from "./style.scss";
patcher.injectCSS(styleText);