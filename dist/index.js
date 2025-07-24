// src/index.mjs
import os from "os";
import chalk from "chalk";
import open from "open";
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
        const interfaces = os.networkInterfaces();
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
      console.log(chalk.green.bold(`  \u279C  Local:   `) + chalk.blue.bold(localUrl));
      console.log(chalk.green.bold(`  \u279C  Network: `) + chalk.blue.bold(networkUrl));
      console.log();
      console.log(chalk.yellow("  Note that the development build is not optimized."));
      console.log(chalk.yellow("  To create a production build, run npm run build."));
      console.log();
      if (this.open) {
        open(networkUrl).catch((err) => {
          console.error(chalk.red("  \u2716 Failed to open browser:"), err);
        });
      }
    });
  }
};
var index_default = DevServerInfoRspackPlugin;
export {
  index_default as default
};
