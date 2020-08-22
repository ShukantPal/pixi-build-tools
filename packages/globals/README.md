# @pixi-build-tools/globals

This package exports the global namespaces of popular PixiJS libraries. It provides a centralized
source of this information so you do not have to configure dependency globals yourself!

## Installation :package:

```bash
npm install --dev @pixi-build-tools/globals
```

## Globals :page_facing_up:

Feel free to create a PR if you want to add your own PixiJS library to this package.

| Project                    | Namespaces                     |
| -------------------------- | ------------------------------ |
| PixiJS                     | PIXI                           |
| PixiJS Official Plugins    | PIXI.animate, PIXI.brend, PIXI.layers, PIXI.particles, PIXI.picture, PIXI.projection, PIXI.sound, PIXI.spine, PIXI.tilemap |
| PixiJS Filters             | PIXI.filters                   |
| Pixi Essentials            | PIXI, ReactPixi                |
| PuxiJS (formerly pixi-ui)  | PUXI                           |
| @inlet/react-pixi          | ReactPixi                      |

Additional plugins made by individual authors:

| Author                     | Namespaces                     |
| -------------------------- | ------------------------------ |
| David Fignater             | Cull, Ease, ScrollBox, Viewport. Intersects, RenderSheet |
| Ivan Popleyshev            | PIXI                           |
| Nazari Gonzalez            | PIXI.audio, PIXI.tween, PIXI.keyboard |
| Shukant K. Pal             | PIXI                           |