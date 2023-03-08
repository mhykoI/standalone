import electron from "electron";

export function patchHeaders() {
  const keysToDelete = ["content-security-policy", "access-control-allow-origin", "access-control-allow-credentials", "access-control-expose-headers"];
  const allowList = ["cdn.discordapp.com", "discord.com/channels"];
  electron.session.defaultSession.webRequest.onHeadersReceived((details, cb) => {
    if (!allowList.some(i => details.url.toLowerCase().includes(i))) return cb({ cancel: false, responseHeaders: details.responseHeaders });
    Object.keys(details.responseHeaders).forEach((key) => {
      if (!keysToDelete.includes(key.toLowerCase())) return;
      delete details.responseHeaders[key];
    });
    details.responseHeaders["Access-Control-Allow-Origin"] = ["*"];
    cb({ cancel: false, responseHeaders: details.responseHeaders });
  });
}