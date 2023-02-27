export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    vueApp.component(
      "home-page",
      {
        template: "<div>Home Page</div>",
      }
    );
  }
}