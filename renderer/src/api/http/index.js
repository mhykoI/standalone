import logger from "../utils/logger.js";

const handlers = new Map();

window["<<PRELOAD_KEY>>"].http.setHandler(async ({ url, method, body, headers }) => {
  if (url == "/handler") {
    if (method == "POST") {
      if (!body) return { status: 400, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ok: false, error: "Missing body" }) };
      if (!body.name) return { status: 400, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ok: false, error: "Missing name" }) };
      if (!handlers.has(body.name)) return { status: 404, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ok: false, error: "Unable to find handler" }) };
      try {
        let result = await handlers.get(body.name)(body.data);
        return { status: 200, body: JSON.stringify({ ok: true, data: result }), headers: { "Content-Type": "application/json" } };
      } catch (e) {
        logger.error(e);
        return { status: 500, body: JSON.stringify({ ok: false, error: e.message }), headers: { "Content-Type": "application/json" } };
      }
    } else {
      return { status: 405 };
    }
  } else if (url == "/ping") {
    return { status: 200, body: JSON.stringify({ ok: true, data: "pong" }), headers: { "Content-Type": "application/json" } };
  }
})

function set(reqName, callback) {
  if (typeof reqName != "string")
    throw new Error("RequestName needs to be a string.");
  if (typeof callback != "function")
    throw new Error("Callback needs to be a function.");
  if (handlers.has(reqName))
    throw new Error("RequestName already in use.");
  handlers.set(reqName, callback);
  return () => {
    handlers.delete(reqName);
  };
}
function trigger(reqName, ...args) {
  if (!socketEvents.has(reqName))
    throw new Error("Unable to find handler!");
  return socketEvents.get(reqName)(...args);
}



export default {
  set,
  trigger,
  get port() {
    return window["<<PRELOAD_KEY>>"].http.getPort();
  }
}

