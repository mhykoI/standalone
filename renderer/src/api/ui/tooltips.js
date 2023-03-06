import dom from "../dom/index.js";
import events from "../events/index.js";
import webpack from "../modules/webpack.js";

const tooltipClasses = webpack.findByProperties("tooltipContentAllowOverflow", "tooltip");

const tooltipPositions = {
  top: tooltipClasses.tooltipTop,
  bottom: tooltipClasses.tooltipBottom,
  left: tooltipClasses.tooltipLeft,
  right: tooltipClasses.tooltipRight,
}

class Tooltip {
  /**
   * @param {HTMLDivElement} target 
   * @param {string|HTMLDivElement} content
   */
  constructor(target, content, position = "auto") {
    /** @type {HTMLDivElement} */
    this.layerElement = dom.parse(`
      <div class="acord--tooltip-layer">
        <div class="${tooltipClasses.tooltip} ${tooltipClasses.tooltipPrimary} acord--tooltip">
          <div class="${tooltipClasses.tooltipPointer} acord--tooltip-pointer"></div>
          <div class="${tooltipClasses.tooltipContent} acord--tooltip-content"></div>
        </div>
      </div>
    `);
    this.tooltipElement = this.layerElement.querySelector(".acord--tooltip");
    this.contentElement = this.layerElement.querySelector(".acord--tooltip-content");
    this.content = content;
    this.target = target;
    this.position = position;

    this.visible = false;
    this.disabled = false;
    this.paused = false;

    const onMouseEnter = () => {
      if (this.disabled || this.paused) return;
      this.show();
    }

    const onMouseLeave = () => {
      if (this.paused) return;
      this.hide();
    }

    this.target.addEventListener("mouseenter", onMouseEnter);
    this.target.addEventListener("mouseleave", onMouseLeave);

    let unPatchObserver = events.on(
      "DomMutation",
      /** @param {MutationRecord} mut */(mut) => {
        if (mut.type === "attributes") {
          if (mut.target.isSameNode(this.target)) {
            switch (mut.attributeName) {
              case "acord--tooltip-disabled": {
                this.disabled = this.target.getAttribute("acord--tooltip-disabled") === "true";
                break;
              }
              case "acord--tooltip-content": {
                this.content = this.target.getAttribute("acord--tooltip-content");
                break;
              }
              case "acord--tooltip-position": {
                this.position = this.target.getAttribute("acord--tooltip-position");
                break;
              }
            }
          }
        }
      }
    )

    this.destroy = () => {
      this.target.removeEventListener("mouseenter", onMouseEnter);
      this.target.removeEventListener("mouseleave", onMouseLeave);
      this.hide();
      unPatchObserver();
    };
  }

  get content() {
    return this.contentElement.firstElementChild;
  }

  set content(value) {
    if (typeof value === "string") {
      this.contentElement.innerHTML = value;
    } else {
      this.contentElement.innerHTML = "";
      this.contentElement?.appendChild?.(value);
    }
  }

  static getContainer() {
    const appElm = document.querySelector('[class*="notAppAsidePanel-"]');

    let container = appElm.querySelector(".acord--tooltip-container");
    if (!container) {
      container = dom.parse(`<div class="acord--layer-container acord--tooltip-container"></div>`);
      appElm.appendChild(container);
    }
    // container.style.setProperty("--top-offset", `${appElm.getBoundingClientRect().top.toFixed(1)}px`);

    return container;
  }

  show() {
    if (this.visible) return;
    this.visible = true;

    const container = Tooltip.getContainer();
    container.appendChild(this.layerElement);

    if (!this.position || this.position === "auto") {
      this.calculatePosition(
        this.canShowAtTop ? "top"
          : this.canShowAtBottom ? "bottom"
            : this.canShowAtLeft ? "left"
              : this.canShowAtRight ? "right"
                : "top"
      );
    } else {
      this.calculatePosition(this.position);
    }


    this.layerElement.classList.add("visible");
  }

  calculatePosition(position) {
    const targetRect = this.target.getBoundingClientRect();

    this.layerElement.classList.remove(...Object.values(tooltipPositions));
    this.tooltipElement.classList.remove("vertical", "horizontal");

    switch (position) {
      case "top": {
        this.layerElement.classList.add(tooltipPositions.top);
        this.layerElement.style.setProperty("left", `${targetRect.left}px`);
        this.layerElement.style.setProperty("top", `${(targetRect.top - this.layerElement.offsetHeight - 10)}px`);
        this.centerPosition("horizontal");
        break;
      }
      case "bottom": {
        this.layerElement.classList.add(tooltipPositions.bottom);
        this.layerElement.style.setProperty("left", `${targetRect.left}px`);
        this.layerElement.style.setProperty("top", `${(targetRect.top + this.layerElement.offsetHeight + 10)}px`);
        this.centerPosition("horizontal");
        break;
      }
      case "left": {
        this.layerElement.classList.add(tooltipPositions.left);
        this.layerElement.style.setProperty("top", `${targetRect.top}px`);
        this.layerElement.style.setProperty("left", `${targetRect.left - this.layerElement.offsetWidth - 10}px`);
        this.centerPosition("vertical");
        break;
      }
      case "right": {
        this.layerElement.classList.add(tooltipPositions.right);
        this.layerElement.style.setProperty("top", `${targetRect.top}px`);
        this.layerElement.style.setProperty("left", `${targetRect.left + this.layerElement.offsetWidth + 10}px`);
        this.centerPosition("vertical");
        break;
      }
    }
  }

  centerPosition(direction) {
    switch (direction) {
      case "horizontal": {
        const center = this.target.getBoundingClientRect().left + (this.target.offsetWidth / 2);
        this.layerElement.style.setProperty("left", `${center - (this.layerElement.offsetWidth / 2)}px`);
        break;
      }
      case "vertical": {
        const center = this.target.getBoundingClientRect().top + (this.target.offsetHeight / 2);
        this.layerElement.style.setProperty("top", `${center - (this.layerElement.offsetHeight / 2)}px`);
      }
    }
  }

  hide() {
    if (!this.visible) return;
    this.visible = false;

    this.layerElement.classList.remove("visible");
    setTimeout(() => {
      this.layerElement.remove();
    }, 50);
  }

  get canShowAtTop() { return this.target.getBoundingClientRect().top - this.layerElement.offsetHeight >= 0; }
  get canShowAtBottom() { return this.target.getBoundingClientRect().top + this.target.offsetHeight + this.layerElement.offsetHeight <= window.innerHeight; }
  get canShowAtLeft() { return this.target.getBoundingClientRect().left - this.layerElement.offsetWidth >= 0; }
  get canShowAtRight() { return this.target.getBoundingClientRect().left + this.target.offsetWidth + this.layerElement.offsetWidth <= window.innerWidth; }
}

function create(target, content, position = "auto") {
  return new Tooltip(target, content, position);
}

dom.patch(
  "[acord--tooltip-content]",
  (elm) => {
    let tooltip = create(elm, elm.getAttribute("acord--tooltip-content"), elm.getAttribute("acord--tooltip-position"));
    tooltip.disabled = elm.getAttribute("acord--tooltip-disabled") === "true";
  },
);

export default { create };