import internal from "../internal/index.js";

const showDialog = async (obj) => {
  return (await internal.showDialog(obj))?.data;
}

export default {
  show: Object.assign(showDialog, {
    save(obj) {
      return showDialog({ mode: "save", ...obj });
    },
    message(obj) {
      return showDialog({ mode: "message", ...obj });
    },
    open(obj) {
      return showDialog({ mode: "open", ...obj });
    },
  })
}