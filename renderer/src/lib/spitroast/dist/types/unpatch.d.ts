import { PatchType } from "./shared";
export declare function unPatch(funcParent: any, funcName: string, hookId: symbol, type: PatchType): boolean;
export declare function unPatchAll(): void;
