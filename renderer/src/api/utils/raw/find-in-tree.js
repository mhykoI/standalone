export default function findInTree(
  tree,
  searchFilter,
  { walkable = null, ignore = [], limit = 256, all = false } = {}
) {
  let iteration = 0;
  let foundList = [];

  function doSearch(tree, searchFilter, { walkable = null, ignore = [] } = {}) {
    iteration += 1;
    if (iteration > limit) return;

    if (typeof searchFilter === "string") {
      if (tree.hasOwnProperty(searchFilter)) {
        if (all) foundList.push(tree[searchFilter]);
        if (!all) return tree[searchFilter];
      }
    } else if (searchFilter(tree)) {
      if (all) foundList.push(tree);
      if (!all) return tree;
    }

    if (!tree) return;

    if (Array.isArray(tree)) {
      for (const item of tree) {
        const found = doSearch(item, searchFilter, { walkable, ignore });
        if (found) foundList.push(found);
        if (found && !all) return found;
      }
    } else if (typeof tree === "object") {
      for (const key in tree) {
        if (walkable != null && !walkable.includes(key)) continue;

        if (ignore.includes(key)) continue;

        try {
          const found = doSearch(tree[key], searchFilter, {
            walkable,
            ignore,
          });
          if (found) foundList.push(found);
          if (found && !all) return found;
        } catch { }
      }
    }
  }

  return doSearch(tree, searchFilter, { walkable, ignore }) ?? foundList;
};
