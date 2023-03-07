import events from "../../../../../../../api/events/index.js";
import i18n from "../../../../../../../api/i18n/index.js";


export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    vueApp.component("config-textarea", {
      props: ["item", "extension"],
      template: `
        <div v-show="item?.visible ?? true" class="acord--config-textarea acord--config-item">
          <discord-textarea @input="onInput" v-model="item.value" :type="item.inputType" :placeholder="i18nFormat(item.placeholder)" :maxlength="item.maxlength" :cols="item.cols" :rows="item.rows" :style="{'height': item?.height, 'width': item?.width}" />
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