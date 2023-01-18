import { contextBridge } from "electron";
import { patchPreload } from "./patches/preload.js";
import { patchWebpackChunk } from "./patches/webpack-chunk.js";

patchWebpackChunk();
patchPreload();

setInterval(() => {
  console.log("PRELOAD: Hello, world!");
}, 1000);
