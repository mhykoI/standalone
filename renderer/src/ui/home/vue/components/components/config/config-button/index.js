import events from "../../../../../../../api/events/index.js";
import i18n from "../../../../../../../api/i18n/index.js";

export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    vueApp.component("config-button", {
      props: ["item", "extension"],
      template: `
        <div v-show="item?.visible ?? true" class="acord--config-button acord--config-item">
          <discord-button @click="onClick" :value="i18nFormat(item.value)" :size="item.size" :color="item.color" />
        </div>
      `,
      methods: {
        onClick(event) {
          events.emit(
            "ExtensionConfigInteraction",
            {
              extension: this.extension,
              item: this.item,
              data: {
                event
              }
            }
          )
        },
        i18nFormat: i18n.format,
      }
    });
  }
}