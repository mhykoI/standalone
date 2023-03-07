import events from "../../../../../../../api/events/index.js";
import i18n from "../../../../../../../api/i18n/index.js";

export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    vueApp.component("config-select", {
      props: ["item", "extension"],
      template: `
        <div v-show="item?.visible ?? true" class="acord--config-select acord--config-item">
          <discord-select @change="onChange" v-model="item.value" :options="item.options.map(i=>({ label: i18nFormat(i.label), value: i.value }))" />
        </div>
      `,
      methods: {
        onChange(data) {
          events.emit(
            "ExtensionConfigInteraction",
            {
              extension: this.extension,
              item: this.item,
              data
            }
          )
        },
        i18nFormat: i18n.format,
      }
    });
  }
}