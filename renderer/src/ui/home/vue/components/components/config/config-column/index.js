import { name as nameMap } from "../maps.json";

export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    vueApp.component(
      "config-column",
      {
        props: ["config", "extension"],
        template: `
          <div class="acord--config-column acord--config-item" :class="{
            'horizontal-align-left': config?.horizontalAlign === 'left',
            'horizontal-align-center': config?.horizontalAlign === 'center',
            'horizontal-align-right': config?.horizontalAlign === 'right',
            'justify-space-between': config?.justify === 'space-between',
            'justify-space-around': config?.justify === 'space-around',
            'vertical-align-top': config?.verticalAlign === 'top',
            'vertical-align-center': config?.verticalAlign === 'center',
            'vertical-align-bottom': config?.verticalAlign === 'bottom'
          }" :style="{'width': config?.width ?? '100%', 'height': config?.height}" >
            <component v-for="child in config.children" :is="nameMap[child.type]" :key="child.id" :config="child" :extension="extension" />
          </div>
        `,
        data() {
          return {
            nameMap
          }
        }
      }
    );
  }
}