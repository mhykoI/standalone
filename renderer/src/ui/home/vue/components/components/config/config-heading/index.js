export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    vueApp.component("config-heading", {
      props: ["item", "extension"],
      template: `
        <div v-show="item?.visible ?? true" class="acord--config-heading acord--config-item">
          {{item.value}}
        </div>
      `,
    });
  }
}