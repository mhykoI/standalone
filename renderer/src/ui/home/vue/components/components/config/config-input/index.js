import events from "../../../../../../../api/events/index.js";

export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    vueApp.component("config-input", {
      props: ["config", "extension"],
      template: `
        <div class="acord--config-input acord--config-item">
          <discord-input @change="onChange" v-model="config.value" :type="config.inputType" :placeholder="config.placeholder" :maxlength="config.maxlength" />
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