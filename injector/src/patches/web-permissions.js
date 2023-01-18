import electron from "electron";

export function patchPermissions() {
  electron.session.fromPartition("default").setPermissionRequestHandler((webContents, permission, callback) => {
    callback(true);
  });
}