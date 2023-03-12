import common from "./common.js";
import webpack from "./webpack.js";

export default {
  common,
  webpack,
  require: globalThis["<<PRELOAD_KEY>>"].require,
  native: DiscordNative,
}