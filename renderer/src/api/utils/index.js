import logger from "./logger.js";

export default {
  logger,
  format(val, ...args) {
    return `${val}`.replaceAll(/{(\d+)}/g, (_, cap) => {
      return args[Number(cap)];
    });
  },
}