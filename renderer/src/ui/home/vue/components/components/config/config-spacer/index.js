export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    vueApp.component("config-spacer", {
      props: ["item", "extension"],
      template: `
        <div v-show="item?.visible ?? true" class="acord--config-spacer acord--config-item">
          <div class="spacer" :style="{'height': item?.height, 'width': item?.width}" />
        </div>
      `,
    });
  }
}