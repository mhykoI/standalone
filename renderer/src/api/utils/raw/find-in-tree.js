export default function findInTree(
  tree,
  searchFilter,
  { walkable = null, ignore = [], limit = 100 } = {}
) {
  let iteration = 0;

  function doSearch(tree, searchFilter, { walkable = null, ignore = [] } = {}) {
    iteration += 1;
    if (iteration > limit) return;

    if (typeof searchFilter === "string") {
      if (tree.hasOwnProperty(searchFilter)) return tree[searchFilter];
    } else if (searchFilter(tree)) return tree;

    if (!tree) return;

    if (Array.isArray(tree)) {
      for (const item of tree) {
        const found = doSearch(item, searchFilter, { walkable, ignore });
        if (found) return found;
      }
    } else if (typeof tree === "object") {
      for (const key of Object.keys(tree)) {
        if (walkable != null && !walkable.includes(key)) continue;

        if (ignore.includes(key)) continue;

        try {
          const found = doSearch(tree[key], searchFilter, {
            walkable,
            ignore,
          });
          if (found) return found;
        } catch { }
      }
    }
  }

  return doSearch(tree, searchFilter, { walkable, ignore });
};
