# LogLoom-js — file-first Node logger 🪵⚡️

A tiny, file-first logger for Node.js that focuses on **reliable writes**, simple **log levels**, and optional **timestamps**. It supports **ESM + CommonJS**, comes with **TypeScript types**, and offers both **async** and **sync** modes for different workloads. Package name on npm: **`logloom`**. ([GitHub][1])

---

## ✨ Features

* **Async & Sync loggers**: choose between background queued writes (async) or immediate writes (sync). ([GitHub][2])
* **Simple levels**: `INFO`, `WARNING`, `ERROR`, `ALERT`. ([GitHub][3])
* **Optional timestamps**: enable/disable time column (default: enabled). Format `DD-MM-YYYY HH:mm:ss`. ([GitHub][4])
* **Stable line format**: `uuid | LEVEL | message | timestamp?`. ([GitHub][5])
* **File-first by design**: appends to `<destination>/<filename>.<extension>`; directories auto-created. ([GitHub][6])
* **ESM & CJS** with exported types subpath (`logloom/types`). Node **18+**. ([GitHub][1])

---

## 📦 Install

```bash
npm install logloom
```

> Requires **Node.js 18+**. Works in both **ESM** (`import`) and **CommonJS** (`require`). Types are bundled and also available via `logloom/types`. ([GitHub][1])

---

## 🚀 Quick start (Async logger)

### TypeScript

```ts
import { initLogLoom } from 'logloom';

const logger = await initLogLoom({
  file: {
    destination: './logs',
    filename: 'app',
    extension: 'log', // 'log' | 'txt' | 'csv'
  },
  time: { isTimestampEnable: true },
});

await logger.write('Server started', 'INFO');
await logger.write('Cache warmed', 'ALERT');

// Ensure all queued writes are flushed before process exit:
await logger.flush();
```

### JavaScript (ESM)

```js
import { initLogLoom } from 'logloom';

const logger = await initLogLoom({
  file: { destination: './logs', filename: 'app', extension: 'log' },
  time: { isTimestampEnable: true },
});

await logger.write('Server started', 'INFO');
await logger.flush();
```

### JavaScript (CommonJS)

```js
const { initLogLoom } = require('logloom');

(async () => {
  const logger = await initLogLoom({
    file: { destination: './logs', filename: 'app', extension: 'log' },
  });

  await logger.write('Server started');
  await logger.flush();
})();
```

**What gets written?** Each call appends a line like:

```
3a3a1d3e-3b20-4b86-8b39-0e7e9c8f5b73 | INFO | Server started | 10-09-2025 14:32:18
```

Format is `uuid | LEVEL | message | timestamp?`. Timestamps are included only when enabled. ([GitHub][2])

---

## 🧵 Synchronous logger (no queue)

Use this when you need immediate writes (e.g., very short scripts, early-boot logs):

### TypeScript

```ts
import { initLogLoomSync } from 'logloom';

const logger = initLogLoomSync({
  file: { destination: './logs', filename: 'setup', extension: 'txt' },
  time: { isTimestampEnable: false },
});

logger.write('Bootstrapping...', 'INFO');
logger.write('Done.');
```

### JavaScript

```js
const { initLogLoomSync } = require('logloom');

const logger = initLogLoomSync({
  file: { destination: './logs', filename: 'setup', extension: 'txt' },
  time: { isTimestampEnable: false },
});

logger.write('Bootstrapping...');
```

Sync mode appends directly using `appendFileSync` after ensuring the directory and file exist. ([GitHub][6])

---

## 🧰 API

### Factory functions

* `await initLogLoom(options) -> AsyncLogger`
  Creates an async logger that **queues** appends; call `flush()` to wait for completion. ([GitHub][2])

* `initLogLoomSync(options) -> SyncLogger`
  Creates a synchronous logger that writes immediately. ([GitHub][5])

### Logger methods

* `write(message: string, type?: RowType) => void | Promise<void>`
  Appends a line: `uuid | type | message | timestamp?`. Default `type` is `INFO`. (Async flavor returns a resolved promise; sync returns void.) ([GitHub][5])

* `flush() => Promise<void>` **(async logger only)**
  Resolves when all queued writes are on disk. ([GitHub][7])

### Options (TypeScript)

```ts
// from `logloom/types`
import type { logParams, fileParams, timeParams } from 'logloom/types';
```

* `logParams`

  ```ts
  interface logParams {
    time?: TimeOptions;
    file: fileOptions;
    row?: rowOptions; // (currently reserved)
  }
  ```
* `timeParams`

  ```ts
  interface timeParams {
    isTimestampEnable?: boolean; // default true
  }
  ```
* `fileParams`

  ```ts
  interface fileParams {
    destination: string;              // folder path
    filename: string;                 // file name (no extension)
    extension: 'log' | 'txt' | 'csv'; // file extension only
  }
  ```
* `RowType`

  ```ts
  type rowType = 'ERROR' | 'INFO' | 'WARNING' | 'ALERT';
  ```

Types are re-exported via the `logloom/types` subpath. ([GitHub][8])

---

## 📝 Output & file behavior

* **Line format**: `uuid | LEVEL | message | timestamp?`. The timestamp column is omitted when `time.isTimestampEnable === false`. ([GitHub][5])
* **Timestamps**: `DD-MM-YYYY HH:mm:ss` via an internal helper. ([GitHub][4])
* **Files**: The logger creates `<destination>` recursively (if needed) and ensures `<filename>.<extension>` exists (no overwrite). Writes are appended with a trailing newline. ([GitHub][6])
* **Note on `.csv`**: the `extension` is purely the file suffix; the content is the same pipe-delimited line format (not RFC-CSV). ([GitHub][5])

---

## 🛡️ Reliability tips

* **Async mode** internally serializes appends with a promise queue; call `logger.flush()` before process exit to ensure everything is written. ([GitHub][7])
* Prefer **one logger instance per file** in a single process. Multiple processes writing to the same file will interleave lines (as expected for append).
* Consider external tools for **rotation** or **size limits** (not provided by this package).

---

## 🔄 ESM / CJS / Types

The package exports both ESM and CJS entry points and ships `.d.ts` types:

* ESM: `"module": "dist/index.mjs"`
* CJS: `"main": "dist/index.cjs"`
* Types: `"types": "dist/index.d.ts"` and subpath export `logloom/types`
* Node engines: `"node": ">=18"`

See `package.json` for full details. ([GitHub][1])

---

## 🧪 Example patterns

### Disable timestamps

```ts
const logger = initLogLoomSync({
  file: { destination: './logs', filename: 'no-time', extension: 'log' },
  time: { isTimestampEnable: false },
});
logger.write('Timestamps are off');
```

### Flush on shutdown (async)

```ts
const logger = await LogLoom({ file: { destination: './logs', filename: 'app', extension: 'log' } });

process.on('beforeExit', async () => {
  await logger.flush();
});
```

---

## 🤝 Contributing

PRs and issues are welcome in the GitHub repo.

---

## 📄 License

MIT. ([GitHub][9])

---

### Sources

Key implementation details were derived from the repository source:

* Package metadata, exports, engines, and name (`logloom`). ([GitHub][1])
* Public exports (`initLogLoom`, `initLogLoomSync`). ([GitHub][10])
* Async logger (queue, `flush`, write format). ([GitHub][2])
* Sync logger (direct append). ([GitHub][5])
* Line format & timestamp helper. ([GitHub][4])
* Types & allowed log levels. ([GitHub][8])

---

If you want, I can also drop this into your repo as `README.md` with badges and a quick “Why LogLoom?” section tailored to your project voice.

[1]: https://github.com/fotros-dev/logloom-js/raw/main/package.json "raw.githubusercontent.com"
[2]: https://github.com/fotros-dev/logloom-js/raw/main/src/core/logger/async.ts "raw.githubusercontent.com"
[3]: https://github.com/fotros-dev/logloom-js/raw/main/src/types.ts "raw.githubusercontent.com"
[4]: https://github.com/fotros-dev/logloom-js/raw/main/src/core/logger/Logger.ts "raw.githubusercontent.com"
[5]: https://github.com/fotros-dev/logloom-js/raw/main/src/core/logger/sync.ts "raw.githubusercontent.com"
[6]: https://github.com/fotros-dev/logloom-js/raw/main/src/core/file/sync.ts "raw.githubusercontent.com"
[7]: https://github.com/fotros-dev/logloom-js/raw/main/src/core/file/async.ts "raw.githubusercontent.com"
[8]: https://github.com/fotros-dev/logloom-js/raw/main/src/types/index.ts "raw.githubusercontent.com"
[9]: https://github.com/fotros-dev/logloom-js "GitHub - fotros-dev/logloom-js: File-first Node logger — levels, context, reliable writes."
[10]: https://github.com/fotros-dev/logloom-js/raw/main/src/index.ts "raw.githubusercontent.com"
