import { app } from "electron";

import { patchHeaders } from "./patches/headers.js";
import { patchIPC } from "./patches/ipc.js";
import { patchPermissions } from "./patches/web-permissions.js";
import { patchBrowserWindow } from "./patches/browser-window.js";

if (!process.argv.includes("--original")) {
  process.env.NODE_OPTIONS = "--no-force-async-hooks-checks";
  app.commandLine.appendSwitch("no-force-async-hooks-checks");

  patchBrowserWindow();

  patchPermissions();
  patchHeaders();
  patchIPC();
}

