import { name as nameMap } from "../maps.json";

export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    vueApp.component(
      "config-column",
      {
        props: ["item", "extension"],
        template: `
          <div v-show="item?.visible ?? true" class="acord--config-column acord--config-item" :class="{
            'horizontal-align-left': item?.horizontalAlign === 'left',
            'horizontal-align-center': item?.horizontalAlign === 'center',
            'horizontal-align-right': item?.horizontalAlign === 'right',
            'justify-space-between': item?.justify === 'space-between',
            'justify-space-around': item?.justify === 'space-around',
            'vertical-align-top': item?.verticalAlign === 'top',
            'vertical-align-center': item?.verticalAlign === 'center',
            'vertical-align-bottom': item?.verticalAlign === 'bottom'
          }" :style="{'width': item?.width ?? '100%', 'height': item?.height, 'gap': item?.gap}" >
            <component v-for="(child, idx) in item.children" :is="nameMap[child.type]" :key="idx" :item="child" :extension="extension" />
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