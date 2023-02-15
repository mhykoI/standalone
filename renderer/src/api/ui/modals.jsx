import ErrorBoundary from "../../lib/components/ErrorBoundary.jsx";
import common from "../modules/common.js";
import i18n from "../i18n/index.js"
const { React, FluxDispatcher, components, modals, UserStore } = common;

export default {
  show: {
    confirmation(title, content, { confirm = null, cancel = null, danger = false, key = undefined, timeout = 60000 * 5 } = {}) {
      return new Promise((resolve) => {
        if (!Array.isArray(content)) content = [content];
        content = content.map(i => typeof i === "string" ? React.createElement(components.Markdown, null, i) : i);
        const modalKey = modals.actions.open((props) => {
          let interacted = false;
          return <ErrorBoundary onError={() => { resolve(false); }}>
            <components.ConfirmationModal
              header={title}
              confirmButtonColor={danger ? components.Button.Colors.RED : components.Button.Colors.BRAND}
              confirmText={confirm || i18n.format("CONFIRM")}
              cancelText={cancel}
              onCancel={() => { resolve(false); modals.actions.close(modalKey); interacted = true; }}
              onConfirm={() => { resolve(true); modals.actions.close(modalKey); interacted = true; }}
              {...props}
              onClose={() => { props.onClose(); resolve(false); modals.actions.close(modalKey); }}
            >
              <ErrorBoundary onError={() => { resolve(false); }}>
                {content}
              </ErrorBoundary>
            </components.ConfirmationModal>
          </ErrorBoundary>
        }, { modalKey: key });
        if (timeout) {
          setTimeout(() => {
            if (!interacted) {
              resolve(false);
              modals.actions.close(modalKey);
            }
          }, timeout);
        }
      });
    },
    close(key) {
      return modals.actions.close(key);
    },
    user(userId) {
      if (!UserStore.getUser(userId)) return false;
      FluxDispatcher.dispatch({ type: "USER_PROFILE_MODAL_OPEN", userId });
      return true;
    },
    alert(title, content, { confirm = null, key = undefined, timeout = 60000 * 5 } = {}) {
      return this.confirmation(title, content, { confirm, cancel: null, key, timeout });
    }
  }
}