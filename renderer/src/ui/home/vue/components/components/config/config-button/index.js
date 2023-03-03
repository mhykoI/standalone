import events from "../../../../../../../api/events/index.js";

export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    vueApp.component("config-button", {
      props: ["config", "extension"],
      template: `
        <div class="acord--config-button acord--config-item">
          <discord-button @click="onClick" :value="config.value" :size="config.size" :color="config.color" />
        </div>
      `,
      methods: {
        onClick(event) {
          events.emit(
            "extension-config-interaction",
            {
              extension: this.extension,
              config: this.config,
              data: {
                event
              }
            }
          )
        }
      }
    });
  }
}