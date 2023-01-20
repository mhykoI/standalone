import api from "./api";

Object.defineProperty(window, "acord", {
  get() {
    return api.exposedAPI;
  }
});
window.global = window;