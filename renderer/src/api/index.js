import modules from './modules';

export default {
  modules,
  internal: {
    process: globalThis["<PRELOAD_KEY>"].process
  }
}