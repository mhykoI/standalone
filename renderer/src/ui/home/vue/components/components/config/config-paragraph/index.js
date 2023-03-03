export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    vueApp.component("config-paragraph", {
      props: ["item", "extension"],
      template: `
        <div v-show="item?.visible ?? true" class="acord--config-paragraph acord--config-item">
          <p class="paragraph">{{item.value}}</p>
        </div>
      `,
    });
  }
}