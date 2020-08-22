# @pixi-build-tools/rollup-configurator

This package can be used directly as a Rollup configuration.

## Installation :package:

```bash
npm install --dev @pixi-build-tools/rollup-configurator
```

## Usage :page_facing_up:

### as a Rollup configuration

```
rollup -c @pixi-build-tools/rollup-configurator
```

### in your custom configuration

```
import { main } from '@pixi-build-tools/rollup-configurator/main';
```

## Requirements

This package relies on your library's `package.json` manifest to configure the
build process.  By default, it will not include your package dependencies (and peer-dependencies)
in the bundle; to prevent this, set `standalone` in your `package.json`.

The following table summarizes the fields you might need to fill:

| Field            | Recommended              | Description                              |
| ---------------- | ------------------------ | ---------------------------------------- |
| `main`           | :white_check_mark:       | Output path for CommonJS bundle          |
| `module`         | :white_check_mark:       | Output path for ESM bundle               |
| `bundle`         | :white_check_mark:       | Output path for UMD bundle. In production mode, will also produce a minified bundle with a `.min.js` extension |
| `namespace`      |                          | Configure your package's global/namespace, i.e. how applications will access. For example, the namespace of pixi.js is `PIXI` |
| `bundleInput`    |                          | Alternative entry point for UMD bundles (other than `src/index.(ts|js)`)  |
| `bundleOutput`   |                          | Used to configure the Rollup `output` for UMD bundles |
| `bundleNoExport` |                          | Enable if your package does not export anything (for example, mixins) |
| `standalone`     |                          | Bundle all your dependencies in the UMD output |