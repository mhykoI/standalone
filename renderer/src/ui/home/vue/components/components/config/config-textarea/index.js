import events from "../../../../../../../api/events/index.js";

export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    vueApp.component("config-textarea", {
      props: ["config", "extension"],
      template: `
        <div class="acord--config-textarea acord--config-item">
          <discord-textarea @change="onChange" v-model="config.value" :type="config.inputType" :placeholder="config.placeholder" :maxlength="config.maxlength" :cols="config.columns" :rows="config.rows" />
        </div>
      `,
      methods: {
        onChange(data) {
          events.emit(
            "extension-config-interaction",
            {
              extension: this.extension,
              config: this.config,
              data
            }
          )
        }
      }
    });
  }
}