# dev-server-info-rspack-plugin
A **Rspack** plugin that prints the local & network development server URLs after build — and optionally opens the browser.

Helps developers quickly access their dev server during development. Cross-platform support (macOS / Windows / Linux), and supports both CommonJS and ESM module systems.

## Installation

```bash
npm install --save-dev dev-server-info-rspack-plugin
```

## 🚀 Features

✅ Automatically logs the Local and Network URLs after dev build

✅ Auto-detects http or https protocol

✅ Supports both CommonJS and ESM

✅ Optional: automatically open browser after server starts

✅ Cross-platform: macOS, Windows, Linux


## Usage
**CommonJs**

```js
const DevServerInfoRspackPlugin = require('./plugins/DevServerInfoPlugin');

module.exports = {
  plugins: [
    new DevServerInfoRspackPlugin({
      open: false
    })
  ],
};
```

**CommonJs**
```js
import DevServerInfoRspackPlugin from './plugins/DevServerInfoPlugin.js';

export default {
  plugins: [
    new DevServerInfoRspackPlugin({
      open: false
    })
  ],
};
```

## Options

|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|**`open`**|`{Boolean}`|`true`|Whether to automatically open the browser after dev server start|

## Output Example

```bash
➜  Local:    http://localhost:8080/
➜  Network:  http://192.168.1.100:8080/

  Note that the development build is not optimized.
  To create a production build, run npm run build.

```

## License

Copyright (c) 2025-present VN666

MIT (see [LICENSE](LICENSE))
