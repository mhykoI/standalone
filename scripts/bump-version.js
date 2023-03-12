const semver = require('semver');
const fs = require('fs');
const path = require('path');

const versionPath = path.join(__dirname, "../version");
const bumped = semver.inc(fs.readFileSync(versionPath, "utf8"), "patch");
fs.writeFileSync(versionPath, bumped, "utf8");
console.log(`Bumped version to ${bumped}`);

try {
  const rendererPath = path.join(__dirname, "../dist/renderer.js");
  fs.writeFileSync(rendererPath, fs.readFileSync(rendererPath, "utf8").trim().replaceAll("<<CURRENT_VERSION>>", bumped), "utf-8");
  console.log("Updated renderer version");
} catch { }