export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    vueApp.component(
      "settings-page",
      {
        template: "<div>Settings Page</div>",
      }
    );
  }
}