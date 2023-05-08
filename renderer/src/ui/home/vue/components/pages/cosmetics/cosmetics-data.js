import ui from "../../../../../../api/ui/index.js";

let reactive;

ui.vue.ready.when().then(() => {
  reactive = Vue.reactive({
    cartItems: [],
  })
});

export default {
  get reactive() {
    return reactive;
  }
}