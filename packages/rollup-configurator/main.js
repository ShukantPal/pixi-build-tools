const fs = require('fs');
const path = require('path');
const { globals } = require('@pixi-build-tools/globals');

const resolve = require('rollup-plugin-node-resolve').default;
const string = require('rollup-plugin-string').string;
const sourcemaps = require('rollup-plugin-sourcemaps').default;
const typescript = require('rollup-plugin-typescript');
const commonjs = require('rollup-plugin-commonjs').default;
const replace = require('rollup-plugin-replace').default;

const projectFolder = process.cwd();
const packageJsonPath = path.relative(__dirname, path.join(projectFolder, './package.json'));

const pkg = require(packageJsonPath);
const pkgName = pkg.name;
const pkgAuthor = pkg.author;

/**
 * This method generates a rollup configuration suited for most PixiJS plugin libraries.
 * 
 * @param {object}[options]
 * @param {boolean}[options.sourcemap=true] - whether to output sourcemaps
 * @param {string[]}[options.externals] - list of dependencies to not be compiled into the bundle. By default,
 *  this includes all your dependencies & peer-dependencies.
 * @param {string}[options.input] - entry file for your library. By default, this is `src/index.ts` or `src/index.js` -
 *  whichever is found.
 * @param {boolean}[options.production=false] - whether to produced minifed UMD bundle
 * @returns an array of upto four rollup configurations, one for CommonJS & ESM bundles & the other two for 
 * unminified & minifed UMD bundles. The minified bundle is generated only in production env or if `options.production` is true.
 */
exports.main = function main(options) {    
    options = Object.assign({
        sourcemap: true,
        globals: {},
        production: false
    }, options);

    const plugins = [
        sourcemaps(),
        resolve({
            browser: true,
            preferBuiltins: false,
        }),
        commonjs({
            namedExports: {
                'resource-loader': ['Resource'],
            },
        }),
        typescript(),
        string({
            include: [
                '**/*.frag',
                '**/*.vert',
            ],
        }),
        replace({
            __VERSION__: repo.version,
        }),
    ];

    const compiled = (new Date()).toUTCString().replace(/GMT/g, 'UTC');
    const banner = [
        `/* eslint-disable */`,
        ` `,
        `/*!`,
        ` * ${pkg.name} - v${pkg.version}`,
        ` * Compiled ${compiled}`,
        ` *`,
        ` * ${pkg.name} is licensed under the MIT License.`,
        ` * http://www.opensource.org/licenses/mit-license`,
        ` * `,
        ` * Copyright 2019-2020, ${pkg.author}, All Rights Reserved`,
        ` */`,
    ].join('\n');

    const {
        main,
        module,
        bundle,
        bundleInput,
        bundleOutput,
        bundleNoExports,
        namespace,
        standalone,
        peerDependencies,
        dependencies
    } = pkg;

    let input = options.input;

    if (!input) {
        const indexTs = path.join(projectFolder, 'src/index.ts');

        if (fs.existsSync(indexTs)) {
            input = indexTs;
        }
    }
    if (!input) {
        const indexJs = path.join(projectFolder, 'src/index.js');

        if (fs.existsSync(indexJs)) {
            input = indexJs;
        }
    }
    if (!input) {
        throw new Error(`Unable to resolve entry file: <projectFolder>/src/index.(js|ts) do not exist?`)
    }

    const externals = []
        .concat(Object.keys(pkg.peerDependencies || {}))
        .concat(Object.keys(pkg.dependencies || {}));

    const config = {
        plugins,
        input,
        output: []
    };

    if (main) {
        config.output.push({
            banner,
            file: path.join(projectFolder, main),
            format: 'cjs',
            sourcemap: options.sourcemap
        });
    }
    if (module) {
        config.output.push({
            banner,
            file: path.join(projectFolder, module),
            format: 'esm',
            sourcemap: options.sourcemap
        });
    }

    if (!bundle) {
        // No UMD bundle, we're done!
        return [config];
    }

    const results = [config];
    const name = pkg.name.replace(/[^a-z]+/g, '_');
    const ns = namespace || 'PIXI';

    // Assign to namespace
    let footer;

    // Standalone packages do not export anything into a namespace
    if (!standalone) {
        if (bundleNoExports !== true) {
            footer = `Object.assign(this.${ns}, ${name});`
        }

        // Allow namespaces upto 2-depth (like PIXI.tilemap)
        if (ns.includes('.')) {
            const base = ns.split(.)[0];

            banner += `\nthis.${base} = this.${base} || {};`;
        }

        banner += `\nthis.${ns} = this.${ns} || {};`;
    }

    results.push({
        input,
        external,
        output: Object.assign({
            banner,
            file: path.join(projectFolder, bundle),
            format: 'umd',
            globals: { ...globals, ...options.globals },
            name,
            footer,
            sourcemap: options.sourcemap
        }, bundleOutput),
        treeshake: false,
        plugins
    })

    if (process.env.NODE_ENV === 'production' || options.production) {
        results.push({
            input,
            external,
            output: Object.assign({
                banner,
                file: file.replace(/\.js$/, '.min.js'),
                format: 'umd',
                globals: { ...globals, ...options.globals },
                name,
                footer,
                sourcemap: options.sourcemap
            }, bundleOutput),
            treeshake: false,
            plugins: [...plugins, terser({
                output: {
                    comments: (node, comment) => comment.line === 1,
                },
            })],
        });
    }

    return results;
}