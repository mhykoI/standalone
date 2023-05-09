
const http = require('http');

let httpHandler = null;
let port = null;

function readJSONBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", chunk => {
      body += chunk;
    });
    req.on("end", () => {
      try {
        resolve(JSON.parse(body));
      } catch (e) {
        reject(e);
      }
    });
  });
}

function rawHeadersToObject(rawHeaders) {
  let headers = {};
  for (let i = 0; i < rawHeaders.length; i += 2) {
    headers[rawHeaders[i].toLowerCase()] = rawHeaders[i + 1];
  }
  return headers;
}

const defaultHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "content-type",
  "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS"
};

const server = http.createServer(async (req, res) => {
  if (!httpHandler) {
    res.writeHead(500, defaultHeaders);
    res.end(JSON.stringify({ ok: false, error: "HTTP Handler not set" }));
    return;
  }

  if (req.method == "OPTIONS") {
    res.writeHead(200, defaultHeaders);
    res.end();
    return;
  }

  req.headers = rawHeadersToObject(req.rawHeaders);
  if (req.headers["content-type"] == "application/json") {
    try {
      req.body = await readJSONBody(req);
    } catch (e) {
      res.writeHead(400, defaultHeaders);
      res.end(JSON.stringify({ ok: false, error: e.message }));
      return;
    }
  }

  try {
    const d = await httpHandler({
      method: req.method,
      url: req.url,
      body: req.body || null,
      headers: req.headers
    });
    if (!d) {
      res.writeHead(500, defaultHeaders);
      res.end(JSON.stringify({ ok: false, error: "HTTP Handler returned nothing." }));
      return;
    }
    const { body, headers = {}, status = 200 } = d;
    headers["Access-Control-Allow-Origin"] = "*";
    headers["Access-Control-Allow-Headers"] = "content-type";
    headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, PATCH, DELETE, OPTIONS";

    res.writeHead(status, headers);
    res.end(body);
  } catch (e) {
    res.writeHead(500, defaultHeaders);
    res.end(JSON.stringify({ ok: false, error: e?.stack || e?.message || e || "Unknown error" }));
    return;
  }

});


function tryToListen(i) {
  try {
    server.listen(i, () => {
      console.log(`HTTP Server listening on port ${i}`);
    });
    port = i;
  } catch (e) {
    if (i > 6170) return;
    console.log(`Unable to listen on port ${i}. Trying next port...`, e);
    tryToListen(i + 1);
  }
}

tryToListen(6160);

export default {
  setHandler(handler) {
    if (httpHandler) return;
    httpHandler = handler;
  },
  getPort() {
    return port;
  }
}