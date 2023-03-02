import vueComponents from "./components/index.js";
import { recomputable, recompute } from "./utils/recompute.js";

export default {
  components: {
    load(vueApp) {
      vueComponents.load(vueApp);
    }
  },
  ready: {
    async when() {
      while (!window.Vue) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      return true;
    },
    get is() {
      return !!window.Vue;
    }
  },
  get Vue() {
    return window.Vue;
  },
  utils: {
    computed: {
      recompute,
      recomputable
    }
  }
}