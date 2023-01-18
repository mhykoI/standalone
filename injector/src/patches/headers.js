import electron from "electron";

export function patchHeaders() {
  const keysToDelete = ["content-security-policy", "access-control-allow-origin"];
  electron.session.defaultSession.webRequest.onHeadersReceived((details, cb) => {
    Object.keys(details.responseHeaders).forEach((key) => {
      if (!keysToDelete.includes(key.toLowerCase())) return;
      delete details.responseHeaders[key];
    });
    details.responseHeaders["Access-Control-Allow-Origin"] = ["*"];
    cb({ cancel: false, responseHeaders: details.responseHeaders });
  });
}