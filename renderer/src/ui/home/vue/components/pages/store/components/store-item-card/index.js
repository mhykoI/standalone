import patcher from "../../../../../../../../api/patcher/index.js";
import cssText from "./style.scss";
patcher.injectCSS(cssText);

export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    vueApp.component(
      "store-item-card",
      {
        template: `
          <div class="acord--store-item-card" :style="\`background-image: url('\${item.image[0]}');\`">
            <div class="name">{{item.name}}</div>
            <div class="price-card">
              <store-price-card :item="item" :small="true" />
            </div>
          </div>
        `,
        props: ["item"]
      }
    );
  }
}