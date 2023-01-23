import getPatchFunc from "./get-patch-func";
import { unPatchAll } from "./un-patch";
import { patchedObjects as patched } from "./shared";

type BeforeCallback = (args: any[]) => void | undefined | any[];
type InsteadCallback = (args: any[], origFunc: Function) => any;
type AfterCallback = (args: any[], ret: any) => void | undefined | any;

const before = getPatchFunc<BeforeCallback>("b");
const instead = getPatchFunc<InsteadCallback>("i");
const after = getPatchFunc<AfterCallback>("a");

export { instead, before, after, unPatchAll, patched };
