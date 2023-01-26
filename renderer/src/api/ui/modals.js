import common from "../modules/common.js";
const { React, FluxDispatcher } = common;



export default {
  show: {
    confirmation(title, content, { confirm = null, cancel = null, danger = false } = {}) {
      return new Promise((resolve) => {

      });
    },
    user(userId) {
      return FluxDispatcher.dispatch({ type: "USER_PROFILE_MODAL_OPEN", userId });
    }
  }
}