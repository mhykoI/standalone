import logger from "../api/utils/logger.js";

export class BasicEventEmitter {
  constructor() {
    /** @type {Map<string, Map<(...args: any[])=>void, {once: boolean}>>} */
    this.listeners = new Map();
  }

  _prepareListenersMap(eventName) {
    if (!this.listeners.has(eventName))
      this.listeners.set(eventName, new Map());
  }

  /**
   * @param {string} eventName
   * @param {(...args: any[])=>void} listener
   */
  on(eventName, listener) {
    this._prepareListenersMap(eventName);
    this.listeners.get(eventName).set(listener, { once: false });
    return () => {
      this.listeners.get(eventName).delete(listener);
    };
  }

  /**
   * @param {string} eventName
   * @param {(...args: any[])=>void} listener
   */
  once(eventName, listener) {
    this._prepareListenersMap(eventName);
    this.listeners.get(eventName)?.set(listener, { once: true });
    return () => {
      this.listeners.get(eventName).delete(listener);
    };
  }

  /**
   * @param {string?} eventName
   * @param {((...args: any[])=>void)?} listener
   */
  off(eventName, listener) {
    if (!eventName) return (this.listeners = new Map());
    if (!listener) return this.listeners?.delete(eventName);
    this.listeners.get(eventName)?.delete(listener);
  }

  /**
   * @param {string} eventName
   * @param  {...any} args
   */
  emit(eventName, ...args) {
    if (!this.listeners.has(eventName)) return;
    let eventMap = this.listeners.get(eventName);
    eventMap.forEach(({ once }, listener) => {
      if (once) eventMap?.delete(listener);
      try {
        listener(...args);
      } catch (e) {
        logger.error(`Error while emitting ${eventName} event.`, e);
      }
    });
  }
};
