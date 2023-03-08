import getPatchFunc from "./get-patch-func.js";
import { unPatchAll } from "./un-patch.js";
import { patchedObjects as patched } from "./shared.js";
const before = getPatchFunc("b");
const instead = getPatchFunc("i");
const after = getPatchFunc("a");
export { instead, before, after, unPatchAll, patched };
