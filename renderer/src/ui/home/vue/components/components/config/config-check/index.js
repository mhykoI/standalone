import events from "../../../../../../../api/events/index.js";

export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    vueApp.component("config-check", {
      props: ["config", "extension"],
      template: `
        <div class="acord--config-check acord--config-item">
          <discord-check @change="onChange" v-model="config.value" />
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