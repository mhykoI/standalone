export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    vueApp.component(
      "installed-extensions-page",
      {
        template: "<div>Installed Extensions Page</div>",
      }
    );
  }
}