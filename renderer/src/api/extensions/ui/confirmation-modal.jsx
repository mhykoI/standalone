import common from "../../modules/common.js";
import i18n from "../../i18n/index.js";
import patcher from "../../patcher/index.js";

import cssText from "./style.scss";
patcher.injectCSS(cssText);

function ConfirmationModal({ e, data, r }) {
  return (
    <common.modals.components.Root
      transitionState={e.transitionState}
      size="large"
      className="acord--modal-root"
    >
      <div className="acord--modal-header">
        <div className="title">
          {i18n.format("CONFIRMATION_MODAL_TITLE")}
        </div>

        <div onClick={e.onClose} className="close" >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className={`acord--icon acord--close-icon`}
            style={{ color: "var(--primary-dark-800)" }}
          >
            <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" fill="currentColor"></path>
          </svg>
        </div>
      </div>
      <div className="acord--modal-content">

      </div>
    </common.modals.components.Root>
  );
}

export function showConfirmationModal(data) {
  return new Promise(r => {
    common.modals.actions.open((e) => {
      return <ConfirmationModal e={e} data={data} r={r} />;
    });
  })
}