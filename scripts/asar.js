const path = require("path");
const asar = require("asar");
const fs = require("fs");

(async () => {
  const dist = path.resolve(__dirname, "..", "dist");

  await fs.promises.writeFile(
    path.join(dist, "package.json"),
    JSON.stringify({ name: "acord", main: "injector.js" }),
    "utf-8"
  );

  await asar.createPackageFromFiles(
    dist,
    path.join(dist, "acord.asar"),
    [
      path.join(dist, "./injector.js"),
      path.join(dist, "./package.json"),
      path.join(dist, "./preload.js"),
      path.join(dist, "./renderer.js")
    ]
  );

  console.log("Asar created!");
})();