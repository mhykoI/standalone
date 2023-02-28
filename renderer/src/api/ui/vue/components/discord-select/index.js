import webpack from "../../../../modules/webpack.js";

const selectClasses = webpack.findByProperties("select", "searchableSelect", "multiSelectCheck");

export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    vueApp.component("discord-select", {
      template: `
        <div></div>
      `
    });
  }
}