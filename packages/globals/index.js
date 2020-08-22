// Official PixiJS
const { globals: main } = require('./main');
const { globals: filters } = require('./filters');
const { globals: plugins } = require('./plugins');
const { globals: puxi } = require('./puxi');

// Shukant K. Pal <shukantpal@outlook.com>
const { globals: essentials } = require('./essentials');
const spatialHash = { 'pixi-spatial-hash': 'PIXI' };

// David Fignater <david@yopeyopey.com>
const davidFignater = {
    'pixi-cull': 'PIXI.extras.Cull',
    'pixi-ease': 'Ease',
    'pixi-scrollbox': 'Scrollbox',
    'pixi-viewport': 'Viewport',

    'intersects': 'Intersects',
    'rendersheet': 'RenderSheet'
};

// Ivan Popelyshev
const ivanPopelyshev = {
    'pixi-blit': 'PIXI'
};

// Nazarí González <nazari.nz@gmail.com>
const nazariGonzalez = {
    'pixi-audio': 'PIXI.audio',
    'pixi-tween': 'PIXI.tween',
    'pixi-keyboard': 'PIXI.keyboard'
};

exports.globals = {
    ...main,
    ...filters,
    ...plugins,
    ...puxi,

    ...essentials,
    ...spatialHash,

    ...davidFignater,
    ...nazariGonzalez,

    // External libraries related to the PixiJS ecosystem
    '@inlet/react-pixi': 'ReactPixi',
};
