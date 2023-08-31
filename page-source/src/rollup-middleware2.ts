import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import assert from 'assert';
import fs from 'fs-extra';
import { OutputOptions, rollup, RollupOptions } from 'rollup';
import { md5, writefile } from 'sbg-utility';
import path from 'upath';
import logger from './logger';
import { isDev } from './utils';

const defaults = {
  src: null as string,
  dest: null as string,
  cwd: process.cwd(),
  rollupOpts: {},
  bundleOpts: { format: 'iife' },
  debug: false,
  maxAge: 0,
  base: '',
};

export default function rollupMiddleware(options: Partial<typeof defaults>): import('express').RequestHandler {
  const console = new logger('rollup');
  const opts = Object.assign({}, defaults, options);
  assert(opts.src, 'rollup middleware requires src directory.');
  // Source directory (required)
  const src = path.join(options.cwd, options.src.replace(options.cwd, ''));
  // Destination directory (source by default)
  const dest = path.join(options.cwd, options.dest.replace(options.cwd, '')) || src;
  // cache max age
  const maxAge = options.maxAge || 0;

  return async function rollupRenderer(req, res, next) {
    const pathname = new URL('http://' + req.hostname + req.url).pathname;
    if (!/\.js$/.test(pathname) || path.extname(pathname) !== '.js') {
      if (options.debug) console.log('debug', 'skip', pathname);
      return next();
    }

    const fixedPath = pathname.replace(options.base, '');
    const jsPath = path.join(dest, fixedPath);
    const sourcePath = path.join(src, fixedPath.replace(/\.css$/, '.scss'));

    // skip when not found
    if (!fs.existsSync(sourcePath)) return next();

    writefile('tmp/rollup-middleware/' + pathname + '.log', JSON.stringify({ dest, src, jsPath, sourcePath }, null, 2));

    const bundleOpt: RollupOptions = {
      input: sourcePath,
      // external: Object.keys(globals),
      cache: !isDev(),
      plugins: [
        json(),
        resolve(),
        commonjs(),
        typescript({ compilerOptions: { lib: ['es5', 'es6', 'dom'], target: 'es5' } }),
      ],
      output: {
        plugins: [],
        file: jsPath,
        sourcemap: false,
        format: 'umd',
        name: '_' + md5(pathname) /*, globals*/,
      },
    };
    if (!isDev()) ((bundleOpt.output as OutputOptions).plugins as any[]).push(terser());
    const _bundle = await rollup(bundleOpt);
    const _gen = await _bundle.generate(bundleOpt.output as OutputOptions);
    res.writeHead(200, {
      'Content-Type': 'text/javascript',
      'Cache-Control': 'max-age=' + maxAge,
    });
    let code = '';
    for (const chunkOrAsset of _gen.output) {
      if (chunkOrAsset.type === 'asset') {
        //console.log('Asset', chunkOrAsset);
      } else {
        //console.log('Chunk', chunkOrAsset.module);
        code += chunkOrAsset.code;
      }
    }
    // write compiled
    writefile(jsPath, code);
    res.end(code);
  };
}
