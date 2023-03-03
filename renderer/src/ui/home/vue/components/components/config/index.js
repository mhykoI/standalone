import patcher from "../../../../../../api/patcher/index.js";
import configButton from "./config-button/index.js";
import configCheck from "./config-check/index.js";
import configColumn from "./config-column/index.js"
import configHeading from "./config-heading/index.js";
import configInput from "./config-input/index.js";
import configParagraph from "./config-paragraph/index.js";
import configRow from "./config-row/index.js";
import configSelect from "./config-select/index.js";
import configSpacer from "./config-spacer/index.js";
import configTextarea from "./config-textarea/index.js";

import cssText from "./style.scss";
patcher.injectCSS(cssText);

export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    configParagraph.load(vueApp);
    configHeading.load(vueApp);
    configSpacer.load(vueApp);
    configButton.load(vueApp);
    configCheck.load(vueApp);
    configInput.load(vueApp);
    configSelect.load(vueApp);
    configTextarea.load(vueApp);
    configColumn.load(vueApp);
    configRow.load(vueApp);
  }
}