import events from "../api/events/index.js";

const ogTitleSetter = document.__lookupSetter__("title");
const ogTitleGetter = document.__lookupGetter__("title");

Object.defineProperty(
  document,
  "title",
  {
    get() {
      return ogTitleGetter.call(this);
    },
    set(v) {
      events.emit("DocumentTitleChange", v);
      return ogTitleSetter.call(this, v);
    }
  }
);