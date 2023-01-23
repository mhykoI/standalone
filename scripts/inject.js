const fs = require("fs");
const path = require("path");
const cp = require("child_process");

cp.execSync("node ./build.js", { stdio: "inherit", cwd: __dirname });
cp.execSync("node ./asar.js", { stdio: "inherit", cwd: __dirname });

const releaseInput = process.argv[2]?.toLowerCase?.();
const release = ({ canary: "Discord Canary", ptb: "Discord PTB", stable: "Discord" })[releaseInput] || "Discord";

// thx to better discord for this
const discordPath = (function () {
  let resourcePath = "";
  if (process.platform === "win32") {
    const basedir = path.join(process.env.LOCALAPPDATA, release.replace(/ /g, ""));
    if (!fs.existsSync(basedir)) throw new Error(`Cannot find directory for ${release}`);
    const version = fs.readdirSync(basedir).filter(f => fs.lstatSync(path.join(basedir, f)).isDirectory() && f.split(".").length > 1).sort().reverse()[0];
    const coreWrap = fs.readdirSync(path.join(basedir, version, "modules")).filter(e => e.indexOf("discord_desktop_core") === 0).sort().reverse()[0];
    resourcePath = path.join(basedir, version, "modules", coreWrap, "discord_desktop_core");
  }
  else {
    let userData = process.env.XDG_CONFIG_HOME ? process.env.XDG_CONFIG_HOME : path.join(process.env.HOME, ".config");
    if (process.platform === "darwin") userData = path.join(process.env.HOME, "Library", "Application Support");
    const basedir = path.join(userData, release.toLowerCase().replace(" ", ""));
    if (!fs.existsSync(basedir)) return "";
    const version = fs.readdirSync(basedir).filter(f => fs.lstatSync(path.join(basedir, f)).isDirectory() && f.split(".").length > 1).sort().reverse()[0];
    if (!version) return "";
    resourcePath = path.join(basedir, version, "modules", "discord_desktop_core");
  }

  if (fs.existsSync(resourcePath)) return resourcePath;
  return "";
})();

if (!discordPath) throw new Error(`Cannot find Discord installation for ${release}`);


const acordPath = path.join(__dirname, "..", "dist", "acord.asar");

const indexJs = path.join(discordPath, "index.js");
if (fs.existsSync(indexJs)) fs.rmSync(indexJs, { force: true });
fs.writeFileSync(indexJs, `require("${acordPath.replace(/\\/g, "\\\\").replace(/"/g, "\\\"")}");\nmodule.exports = require("./core.asar");`);

console.log("Injected Acord into Discord!");