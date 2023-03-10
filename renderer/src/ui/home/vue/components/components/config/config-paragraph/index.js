import i18n from "../../../../../../../api/i18n/index.js";

export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    vueApp.component("config-paragraph", {
      props: ["item", "extension"],
      template: `
        <div v-show="item?.visible ?? true" class="acord--config-paragraph acord--config-item">
          {{i18nLocalize(item.value)}}
        </div>
      `,
      methods: {
        i18nLocalize: i18n.localize,
      }
    });
  }
}