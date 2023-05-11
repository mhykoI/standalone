import patcher from "../../../../../../../../api/patcher/index.js";
import cssText from "./style.scss";
patcher.injectCSS(cssText);

export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    vueApp.component(
      "cosmetics-item-card",
      {
        template: `
          <div class="acord--cosmetics-item-card" :style="\`background-image: url('\${item.image[0]}');\`">
            <div class="name">{{item.name}}</div>
            <div class="price-card">
              <cosmetics-price-card :item="item" :small="true" />
            </div>
          </div>
        `,
        props: ["item"]
      }
    );
  }
}