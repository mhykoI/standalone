import common from "../../api/modules/common";
import logger from "../../api/utils/logger.js";
const { React } = common;

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  componentDidCatch(error) {
    this.setState({ error });
    logger.error(error);
    if (typeof this.props.onError === "function") this.props.onError(error);
  }

  render() {
    if (this.state.error) return <div className="acord--react-error">
      <p>Unexpected React Error Happened.</p>
      <p>{`${this.state.error}`}</p>
    </div>;
    return this.props.children;
  }
}

const originalRender = ErrorBoundary.prototype.render;
Object.defineProperty(ErrorBoundary.prototype, "render", {
  enumerable: false,
  configurable: false,
  set: function () { throw new Error("Cannot set render method of ErrorBoundary"); },
  get: () => originalRender
});