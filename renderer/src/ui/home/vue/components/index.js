import pages from "./pages/index.js";
import discord from "./discord/index.js.js";
import components from "./components/index.js";

export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    components.load(vueApp);
    discord.load(vueApp);
    pages.load(vueApp);
  }
}