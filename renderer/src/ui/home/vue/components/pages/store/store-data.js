import ui from "../../../../../../api/ui/index.js";
import authentication from "../../../../../../api/authentication/index.js";

let reactive;

ui.vue.ready.when().then(() => {
  reactive = Vue.reactive({
    cartItems: [],
    balance: 0
  })
});

export default {
  get reactive() {
    return reactive;
  },
  async fetchBalance() {
    let data = await (await fetch(`https://api.acord.app/store/balance`, {
      cache: "no-store",
      headers: {
        "x-acord-token": authentication.token,
      }
    })).json();
    reactive.balance = data.data;
    return data.data;
  }
}