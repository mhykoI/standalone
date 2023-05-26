import events from "../api/events/index.js";
import http from "../api/http/index.js";

http.set("StorePaymentOk", async () => {
  events.emit("StorePaymentOk");
  console.log("StorePaymentOk");
  return true;
});