import events from "../../../../../../../api/events/index.js";

export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    vueApp.component("config-select", {
      props: ["config", "extension"],
      template: `
        <div class="acord--config-select acord--config-item">
          <discord-select @change="onChange" v-model="config.value" :options="config.options" />
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