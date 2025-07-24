// plugins/DevServerInfoPlugin.js
import os from "os";
import chalk from "chalk";
import open from "open";

class DevServerInfoRspackPlugin {
  constructor(options = {}) {
    this.open = options.open !== false; // 默认 true
  }

  apply (compiler) {
    if (process.env.NODE_ENV !== "development") return;

    compiler.hooks.done.tap("DevServerInfoPlugin", () => {
      const devServer = compiler.options.devServer || {};
      const port = devServer.port || undefined;
      const useHttps = devServer.https === true;
      const protocol = useHttps ? "https" : "http";

      const host = (devServer.host === "0.0.0.0" || !devServer.host)
        ? "localhost"
        : devServer.host;

      const publicPath =
        devServer.devMiddleware?.publicPath ||
        compiler.options.output?.publicPath ||
        "/";

      function getPreferredLocalIP() {
        const interfaces = os.networkInterfaces();
        const candidates = [];

        for (const name of Object.keys(interfaces)) {
          for (const iface of interfaces[name]) {
            if (
              iface.family === "IPv4" &&
              !iface.internal &&
              !iface.address.startsWith("172.") &&
              !iface.address.startsWith("169.") &&
              !iface.address.startsWith("26.")
            ) {
              candidates.push(iface.address);
            }
          }
        }

        return candidates.length > 0 ? candidates[0] : "localhost";
      }

      const localIP = getPreferredLocalIP();
      const localUrl = `${protocol}://localhost:${port}${publicPath}`;
      const networkUrl = `${protocol}://${localIP}:${port}${publicPath}`;

      // 打印样式
      console.log("\n\n\n");
      console.log(chalk.green.bold(`  ➜  Local:   `) + chalk.blue.bold(localUrl));
      console.log(chalk.green.bold(`  ➜  Network: `) + chalk.blue.bold(networkUrl));
      console.log();
      console.log(chalk.yellow("  Note that the development build is not optimized."));
      console.log(chalk.yellow("  To create a production build, run npm run build."));
      console.log();

      if (this.open) {
        open(networkUrl).catch((err) => {
          console.error(chalk.red("  ✖ Failed to open browser:"), err);
        });
      }
    });
  }
}

export default DevServerInfoRspackPlugin;