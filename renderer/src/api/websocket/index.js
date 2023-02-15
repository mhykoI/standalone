import common from "../modules/common.js";
import patcher from "../patcher/index.js";

const sockets = new Set();
const handlers = new Map();

patcher.instead(
  "handleConnection",
  common.WebSocket,
  (args, orig) => {
    const ws = args[0];
    if (ws.upgradeReq().url !== "/acord") return orig(...args);

    sockets.add(ws);

    ws.on("message", async (msg) => {
      let json;

      try {
        json = JSON.parse(msg);
        if (!Array.isArray(json) || json.length < 1 || json.length > 3)
          throw "Array expected as message.";
        if (typeof json[0] != "string") throw "Array[0] needs to be string.";
        if (typeof json[1] != "string") throw "Array[1] needs to be string.";
      } catch (err) {
        ws.send(
          JSON.stringify([
            null,
            {
              ok: false,
              error: `${err}`,
            },
          ])
        );
      }

      const [eventId, eventName, eventData] = json;

      const handler = handlers.get(eventName);

      if (!handler)
        return ws.send(
          JSON.stringify([
            eventId,
            {
              ok: false,
              error: `Unable to find handler.`,
            },
          ])
        );

      try {
        let response = await handler(eventData);
        ws.send(
          JSON.stringify([
            eventId,
            {
              ok: true,
              data: response,
            },
          ])
        );
      } catch (err) {
        ws.send(
          JSON.stringify([
            eventId,
            {
              ok: false,
              error: `${err}`,
            },
          ])
        );
      }
    });

    ws.on("close", () => sockets.delete(ws));
  }
);

function set(eventName, callback) {
  if (typeof eventName != "string")
    throw new Error("EventName needs to be a string.");
  if (typeof callback != "function")
    throw new Error("Callback needs to be a function.");
  if (handlers.has(eventName))
    throw new Error("EventName already in use.");
  handlers.set(eventName, callback);
  return () => {
    handlers.delete(eventName);
  };
}
function trigger(eventName, ...args) {
  if (!socketEvents.has(eventName))
    throw new Error("Unable to find handler!");
  return socketEvents.get(eventName)(...args);
}


export default {
  set,
  trigger
}

