import { ipcMain, BrowserWindow, app, dialog } from "electron";

export function patchIPC() {
  ipcMain.on("GetPath", (event, arg) => {
    if (arg === "appPath") {
      event.returnValue = app.getAppPath();
      return;
    }

    try {
      event.returnValue = app.getPath(arg);
    } catch {
      event.returnValue = null;
    }
  });

  ipcMain.on("Relaunch", () => {
    app.quit();
    app.relaunch();
  });

  ipcMain.on("DevTools:Open", (event, arg) => {
    try {
      event.sender.openDevTools({
        mode: arg,
        activate: true
      });
    } catch { }
  });

  ipcMain.on("DevTools:Close", (event) => {
    try {
      event.sender.closeDevTools();
    } catch { }
  });

  ipcMain.on("DevTools:Toggle", (event, arg) => {
    try {
      if (event.sender.isDevToolsOpened()) {
        event.sender.closeDevTools();
      } else {
        event.sender.openDevTools({
          mode: arg,
          activate: true
        });
      }
    } catch { }
  });

  ipcMain.on("RegisterPreload", (event, arg) => {
    try {
      dialog.showMessageBox(null, { message: arg });
      app.commandLine.appendSwitch("preload", arg);
    } catch { }
  });

  ipcMain.handle("ExecuteWindowScript", async (event, arg) => {
    try {
      let res = await event.sender.executeJavaScript(`(() => {try {${arg}} catch {}})();`, true);
      return { ok: true, data: res };
    } catch (err) {
      return { ok: false, error: `${err}` };
    }
  });

  ipcMain.handle("ExecuteInjectorScript", async (event, arg) => {
    try {
      let res = await eval(`(() => {try {${arg}} catch {}})();`);
      return { ok: true, data: res };
    } catch (err) {
      return { ok: false, error: `${err}` };
    }
  });

  ipcMain.handle("ShowDialog", async (
    event,
    {
      mode = "open",
      openDirectory = false,
      openFile = true,
      multiSelections = false,
      filters,
      promptToCreate = false,
      defaultPath,
      title,
      showOverwriteConfirmation,
      message,
      showHiddenFiles,
      modal = false,
      buttons,
      defaultId,
      type,
      cancelId
    } = {}
  ) => {
    const show = {
      open: dialog.showOpenDialog,
      save: dialog.showSaveDialog,
      message: dialog.showMessageBox,
    }[mode];
    if (!show) return { error: `Invalid mode.`, ok: false };

    return {
      ok: false,
      data: await show.apply(dialog, [
        modal && BrowserWindow.fromWebContents(event.sender),
        {
          defaultPath,
          filters,
          title,
          message,
          createDirectory: true,
          buttons,
          type,
          defaultId,
          cancelId,
          properties: [
            showHiddenFiles && "showHiddenFiles",
            openDirectory && "openDirectory",
            promptToCreate && "promptToCreate",
            openDirectory && "openDirectory",
            openFile && "openFile",
            multiSelections && "multiSelections",
            showOverwriteConfirmation && "showOverwriteConfirmation"
          ].filter(i => i),
        }
      ].filter(i => i))
    }
  });

  ipcMain.handle("ShowWindow", (event, { url = "", options = null, closeOnUrl = "" } = {}) => {
    return new Promise((resolve) => {
      const bw = new BrowserWindow(options);
      bw.loadURL(url);
      bw.webContents.on("did-navigate", (_, navigationURL) => {
        if (navigationURL != closeOnUrl) return;
        windowInstance.close();
        resolve(bw.id);
      });
      if (!closeOnUrl) {
        return resolve(bw.id);
      }
    });
  });
}