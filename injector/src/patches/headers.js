import electron from "electron";

export function patchHeaders() {
  const keysToDelete = [
    "content-security-policy",
    "access-control-allow-origin"
  ];
  const ignoreList = ["googlevideo.com"];
  electron.session.defaultSession.webRequest.onHeadersReceived((details, cb) => {
    if (ignoreList.some((x) => details.url.includes(x))) return cb({ cancel: false, responseHeaders: details.responseHeaders });
    Object.keys(details.responseHeaders).forEach((key) => {
      if (!(keysToDelete.includes(key.toLowerCase()))) return;
      delete details.responseHeaders[key];
    });
    details.responseHeaders["Access-Control-Allow-Origin"] = ["*"];
    cb({ cancel: false, responseHeaders: details.responseHeaders });
  });
}