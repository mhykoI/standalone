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
      this.__originalPreload = originalPreload;

      this.webContents.on("dom-ready", async () => {
        const location = path.join(__dirname, "renderer.js");
        if (!fs.existsSync(location)) return;
        const content = fs.readFileSync(location, "utf-8");
        this.webContents.executeJavaScript(`(() => { try { ${content} return true; } catch (error) { console.error(error); return false; } })();`);
      });

      this.webContents.on("did-navigate-in-page", () => {
        this.webContents.send("NavigateInPage");
      });
    }
  }

  Object.assign(BrowserWindow, electron.BrowserWindow);
}