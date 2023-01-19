import { contextBridge } from "electron";
import { patchDevTools } from "./patches/devtools.js";
import { patchPreload } from "./patches/preload.js";
import { patchWebpackChunk } from "./patches/webpack-chunk.js";

contextBridge.exposeInMainWorld("require", require);
contextBridge.exposeInMainWorld("process", process);

patchWebpackChunk();
patchDevTools();
patchPreload();
