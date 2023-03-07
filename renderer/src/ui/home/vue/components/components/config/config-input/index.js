import events from "../../../../../../../api/events/index.js";
import i18n from "../../../../../../../api/i18n/index.js";


export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    vueApp.component("config-input", {
      props: ["item", "extension"],
      template: `
        <div v-show="item?.visible ?? true" class="acord--config-input acord--config-item">
          <discord-input @input="onInput" v-model="item.value" :type="item.inputType" :placeholder="i18nFormat(item.placeholder)" :maxlength="item.maxlength"  :max="item.max" :min="item.min" :step="item.step" />
        </div>
      `,
      methods: {
        onInput(data) {
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