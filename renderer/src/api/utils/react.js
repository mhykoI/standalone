import findInTree from "./raw/find-in-tree.js";

export default {
  getInstance(node) {
    return Object.entries(node).find(i => i[0].startsWith("__reactFiber$"))?.[1];
  },
  getOwnerInstance(node) {
    let instance = this.getInstance(node);
    for (let el = instance; el; el = el.return)
      if (el.stateNode?.forceUpdate) return el.stateNode;
  },
  findInTree(tree, filter) {
    return findInTree(tree, filter, {
      walkable: ["props", "state", "children", "return"]
    });
  },
  getComponents(node) {
    const instance = this.getInstance(node);
    const components = [];
    let lastInstance = instance;
    while (lastInstance && lastInstance.return) {
      if (typeof lastInstance.return.type === "string") break;
      if (lastInstance.return.type) components.push(lastInstance.return.type);
      lastInstance = lastInstance.return;
    }
    return components;
  },
  getStateNodes(node) {
    const instance = this.getInstance(node);
    const stateNodes = [];
    let lastInstance = instance;
    while (lastInstance && lastInstance.return) {
      if (lastInstance.return.stateNode instanceof HTMLElement) break;
      if (lastInstance.return.stateNode)
        stateNodes.push(lastInstance.return.stateNode);
      lastInstance = lastInstance.return;
    }
    return stateNodes;
  },
  getProps(el, filter = (i) => i, max = 10000) {
    const instance = this.getInstance(el);

    if (!instance?.return) return null;

    for (
      let current = instance?.return, i = 0;
      i > max || current !== null;
      current = current?.return, i++
    ) {
      if (current?.pendingProps && filter(current.pendingProps))
        return current.pendingProps;
    }

    return null;
  },
}