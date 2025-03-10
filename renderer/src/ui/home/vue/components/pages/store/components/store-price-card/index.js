import patcher from "../../../../../../../../api/patcher/index.js";
import storeData from "../../store-data.js";
import cssText from "./style.scss";
patcher.injectCSS(cssText);

export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    vueApp.component(
      "store-price-card",
      {
        template: `
        <div class="acord--store-price-card" :class="{small}">
          <div class="text">
            <div class="big">{{item.prices.try.toFixed(2)}}₺</div>
            <div class="small">{{item.prices.usd.toFixed(2)}}$</div>
          </div>
          <div class="add-to-cart" @click="addToCart(item, $event)" :class="{'disabled': disabled}">
          <svg v-if="reactive.cartItems.findIndex(i=> i.id === item.id) === -1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12.0049 2C15.3186 2 18.0049 4.68629 18.0049 8V9H22.0049V11H20.8379L20.0813 20.083C20.0381 20.6013 19.6048 21 19.0847 21H4.92502C4.40493 21 3.97166 20.6013 3.92847 20.083L3.17088 11H2.00488V9H6.00488V8C6.00488 4.68629 8.69117 2 12.0049 2ZM18.8309 11H5.17788L5.84488 19H18.1639L18.8309 11ZM13.0049 13V17H11.0049V13H13.0049ZM9.00488 13V17H7.00488V13H9.00488ZM17.0049 13V17H15.0049V13H17.0049ZM12.0049 4C9.86269 4 8.1138 5.68397 8.00978 7.80036L8.00488 8V9H16.0049V8C16.0049 5.8578 14.3209 4.10892 12.2045 4.0049L12.0049 4Z"></path>
          </svg>
          <svg v-else viewBox="0 0 225 225" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M18.5785 53.9278L29.1851 43.3212L56.465 70.601L88.9889 103.125L107.739 121.875L121.921 136.057L140.671 154.807L145.239 159.375L163.989 178.125L182.162 196.298L184.749 198.885L174.142 209.491L18.5785 53.9278Z" />
            <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M112.546 18.75C143.612 18.75 168.796 43.934 168.796 75V84.375H206.296V103.125H195.355L188.807 181.73L171.434 164.357L176.539 103.125H110.202L91.4521 84.375H150.046V75C150.046 54.9169 134.258 38.5211 114.417 37.5459L112.546 37.5C94.0429 37.5 78.6699 50.9003 75.6024 68.5253L60.5584 53.4812C69.0073 33.0922 89.1015 18.75 112.546 18.75ZM182.162 196.298L163.989 178.125H54.7955L48.5424 103.125H88.9889L56.465 70.601C56.3527 72.0526 56.2955 73.5196 56.2955 75V84.375H18.7955V103.125H29.7267L36.8291 188.278C37.234 193.137 41.296 196.875 46.1718 196.875H178.919C180.056 196.875 181.149 196.672 182.162 196.298ZM159.421 152.344V121.875H140.671V133.594L159.421 152.344ZM140.671 154.807L145.239 159.375H140.671V154.807ZM103.171 121.875H107.739L121.921 136.057V159.375H103.171V121.875ZM84.4205 121.875V159.375H65.6705V121.875H84.4205Z" />
          </svg>
          </div>
        </div>
        `,
        props: ["item", "small", "disabled"],
        data() {
          return {
            reactive: storeData.reactive
          }
        },
        methods: {
          addToCart(item, e) {
            e.stopPropagation();

            let idx = this.reactive.cartItems.findIndex(i => i.id === item.id);
            if (idx === -1) {
              this.reactive.cartItems.push(JSON.parse(JSON.stringify({ ...item, type: item.type ?? "single" })));
            } else {
              this.reactive.cartItems.splice(idx, 1);
            }
          }
        }
      }
    );
  }
}