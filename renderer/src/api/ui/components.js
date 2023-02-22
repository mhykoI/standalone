import ErrorBoundary from "../../lib/components/ErrorBoundary.jsx";
import common from "../modules/common.js";

export default {
  ErrorBoundary,
  Button: common.components.Button,
  Markdown: common.components.Markdown,
  Text: common.components.Text,
  ConfirmationModal: common.components.ConfirmationModal,
  ModalRoot: common.modals.components.Root,
  ModalCloseButton: common.modals.components.other.CloseButton,
  ModalHeader: common.modals.components.other.Header,
  ModalContent: common.modals.components.other.Content,
  ModalFooter: common.modals.components.other.Footer,
  ModalListContent: common.modals.components.other.ListContent,
  Tooltip: common.components.Tooltip,
}