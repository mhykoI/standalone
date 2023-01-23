import esbuild from 'esbuild'

import { sassPlugin } from 'esbuild-sass-plugin'

await esbuild.build({
  plugins: [sassPlugin({
    type: "css"
  })],
  entryPoints: ['src/index.js'],
  bundle: true,
  minify: true,
  sourcemap: "inline",
  platform: "node",
  external: ["electron", "path", "fs"],
  outfile: "./dist.js",
  logLevel: "info"
}).then(() => {
  console.log("Renderer built!")
});