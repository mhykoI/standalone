const cp = require("child_process");
const path = require("path");
const fs = require("fs");

if (fs.existsSync(path.resolve(__dirname, "../dist"))) fs.rmSync(path.resolve(__dirname, "../dist"), { recursive: true, force: true });
if (!fs.existsSync(path.resolve(__dirname, "../dist"))) fs.mkdirSync(path.resolve(__dirname, "../dist"));
cp.execSync("npm run build", { stdio: "inherit", cwd: path.resolve(__dirname, "../injector") });
if (fs.existsSync(path.resolve(__dirname, "../injector/build.js"))) fs.copyFileSync(path.resolve(__dirname, "../injector/build.js"), path.resolve(__dirname, "../dist/injector.js"));
console.log("Injector built!");
cp.execSync("npm run build", { stdio: "inherit", cwd: path.resolve(__dirname, "../preload") });
if (fs.existsSync(path.resolve(__dirname, "../preload/build.js"))) fs.copyFileSync(path.resolve(__dirname, "../preload/build.js"), path.resolve(__dirname, "../dist/preload.js"));
console.log("Preload built!");
cp.execSync("npm run build", { stdio: "inherit", cwd: path.resolve(__dirname, "../renderer") });
if (fs.existsSync(path.resolve(__dirname, "../renderer/build.js"))) fs.copyFileSync(path.resolve(__dirname, "../renderer/build.js"), path.resolve(__dirname, "../dist/renderer.js"));
console.log("Renderer built!");