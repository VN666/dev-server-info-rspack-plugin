var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.js
var index_exports = {};
__export(index_exports, {
  default: () => index_default
});
module.exports = __toCommonJS(index_exports);
var import_os = __toESM(require("os"), 1);
var import_chalk = __toESM(require("chalk"), 1);
var import_open = __toESM(require("open"), 1);
var DevServerInfoRspackPlugin = class {
  constructor(options = {}) {
    this.open = options.open !== false;
  }
  apply(compiler) {
    if (process.env.NODE_ENV !== "development") return;
    compiler.hooks.done.tap("DevServerInfoPlugin", () => {
      var _a, _b;
      const devServer = compiler.options.devServer || {};
      const port = devServer.port || void 0;
      const useHttps = devServer.https === true;
      const protocol = useHttps ? "https" : "http";
      const host = devServer.host === "0.0.0.0" || !devServer.host ? "localhost" : devServer.host;
      const publicPath = ((_a = devServer.devMiddleware) == null ? void 0 : _a.publicPath) || ((_b = compiler.options.output) == null ? void 0 : _b.publicPath) || "/";
      function getPreferredLocalIP() {
        const interfaces = import_os.default.networkInterfaces();
        const candidates = [];
        for (const name of Object.keys(interfaces)) {
          for (const iface of interfaces[name]) {
            if (iface.family === "IPv4" && !iface.internal && !iface.address.startsWith("172.") && !iface.address.startsWith("169.") && !iface.address.startsWith("26.")) {
              candidates.push(iface.address);
            }
          }
        }
        return candidates.length > 0 ? candidates[0] : "localhost";
      }
      const localIP = getPreferredLocalIP();
      const localUrl = `${protocol}://localhost:${port}${publicPath}`;
      const networkUrl = `${protocol}://${localIP}:${port}${publicPath}`;
      console.log("\n\n\n");
      console.log(import_chalk.default.green.bold(`  \u279C  Local:   `) + import_chalk.default.blue.bold(localUrl));
      console.log(import_chalk.default.green.bold(`  \u279C  Network: `) + import_chalk.default.blue.bold(networkUrl));
      console.log();
      console.log(import_chalk.default.yellow("  Note that the development build is not optimized."));
      console.log(import_chalk.default.yellow("  To create a production build, run npm run build."));
      console.log();
      if (this.open) {
        (0, import_open.default)(networkUrl).catch((err) => {
          console.error(import_chalk.default.red("  \u2716 Failed to open browser:"), err);
        });
      }
    });
  }
};
var index_default = DevServerInfoRspackPlugin;
