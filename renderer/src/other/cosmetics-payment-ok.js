import events from "../api/events/index.js";
import http from "../api/http/index.js";

http.set("CosmeticsPaymentOk", async () => {
  events.emit("CosmeticsPaymentOk");
  console.log("CosmeticsPaymentOk");
  return true;
});