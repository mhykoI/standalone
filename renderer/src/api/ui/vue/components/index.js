import discordButton from "./discord-button/index.js";
import discordInput from "./discord-input/index.js";
import discordSelect from "./discord-select/index.js";
import discordTextarea from "./discord-textarea/index.js";

export default {
  load(vueApp) {
    discordTextarea.load(vueApp);
    discordSelect.load(vueApp);
    discordInput.load(vueApp);
    discordButton.load(vueApp);
  }
}