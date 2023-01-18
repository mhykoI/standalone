import { app } from "electron";

import { patchHeaders } from "./patches/headers.js";
import { patchIPC } from "./patches/ipc.js";
import { patchPermissions } from "./patches/web-permissions.js";
import { patchBrowserWindow } from "./patches/browser-window.js";

if (!process.argv.includes("--original")) {
  process.env.NODE_OPTIONS = "--no-force-async-hooks-checks";
  app.commandLine.appendSwitch("no-force-async-hooks-checks");

  patchPermissions();
  patchHeaders();
  patchIPC();
}

try {
  let ogSettings;
  Object.defineProperty(global, "appSettings", {
    get() {
      return ogSettings;
    },
    set(value) {
      if (!value.hasOwnProperty("settings")) value.settings = {};
      value.settings.DANGEROUS_ENABLE_DEVTOOLS_ONLY_ENABLE_IF_YOU_KNOW_WHAT_YOURE_DOING = true;
      ogSettings = value;
    }
  });
} catch { }

if (!process.argv.includes("--original")) {
  patchBrowserWindow();
}