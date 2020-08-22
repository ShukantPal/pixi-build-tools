# @pixi-build-tools/floss-rush-monorepo

This package makes testing Rush monorepos easy with floss (and possibly mocha)! It will use the current
working directory to find the Rush configuration file and use the rush-lib API to `require` all of your
test files.

It expects scoped packages to each have a `test/index.js` file that `require`s all the test suites. This
way all test suites have a single entry point.

## Installation :package:

```bash
npm install --dev @pixi-build-tools/floss-rush-monorepo
```

## Usage :page_facing_up:

```bash
floss --path node_modules/\@pixi-build-tools/floss-rush-monorepo/index.js
```