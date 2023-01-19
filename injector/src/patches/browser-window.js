import electron from "electron";
import path from "path";
import fs from "fs";

export function patchBrowserWindow() {
  class BrowserWindow extends electron.BrowserWindow {
    constructor(options) {
      if (!options || !options.webPreferences || !options.webPreferences.preload || !options.title) return super(options);
      const originalPreload = options.webPreferences.preload;
      options.webPreferences.preload = path.join(__dirname, "preload.js");

      super(options);

      this.__ORIGINAL_PRELOAD__ = originalPreload;
      process.env.ORIGINAL_DISCORD_PRELOAD = originalPreload;
      process.env.ACORD_PRELOAD_KEY = Array(2).fill(0).map(() => Math.random().toString(36).slice(2)).join("").replace(/^\d+/, "");

      this.webContents.on("dom-ready", async () => {
        const location = path.join(__dirname, "renderer.js");
        if (!fs.existsSync(location)) return;
        let content = fs.readFileSync(location, "utf-8");
        content = content.replace(/<PRELOAD_KEY>/gm, process.env.ACORD_PRELOAD_KEY);
        this.webContents.executeJavaScript(content, true);
      });

      this.webContents.on("did-navigate-in-page", () => {
        this.webContents.send("NavigateInPage");
      });

      this.setMinimumSize(1, 1);
    }
  }

  Object.assign(BrowserWindow, electron.BrowserWindow);

  const electronPath = require.resolve("electron");
  delete require.cache[electronPath].exports; // If it didn't work, try to delete existing
  require.cache[electronPath].exports = { ...electron, BrowserWindow }; // Try to assign again after deleting
}