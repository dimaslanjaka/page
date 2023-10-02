import fs from 'fs';
import path from 'path';
import React from 'react';
import paths from '../config/paths';
import { rConfig } from './routeConfig';
import { renderStatic } from './template';
// const devMode = /dev/i.test(process.env.NODE_ENV);

async function generateRouteHtml() {
  const generatedIndex = paths.build + '/index.html';
  const routes = rConfig;
  const regex = /<script[\s\S]*?>[\s\S]*?<\/script>/gi;
  const sitemaps: string[] = [];
  let m: RegExpExecArray | null = null;
  const scripts = [] as JSX.Element[];

  if (fs.existsSync(generatedIndex)) {
    const contents = fs.readFileSync(generatedIndex, 'utf-8');
    // get script bundles
    while ((m = regex.exec(contents)) !== null) {
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }
      if (typeof m[0] === 'string' && m[0].length > 0 && !m[0].includes('/page/main.js')) {
        const srcRegEx = /src=["'](.*?)["']/g;
        const source = srcRegEx.exec(m[0]);
        if (source) {
          scripts.push(<script src={source[1]} key={source[1]} defer={true}></script>);
        }
      }
    }
  }

  for (let i = 0; i < routes.length; i++) {
    const route = routes[i];
    const { meta = {} as typeof route.meta, title = 'Website Manajemen Indonesia', filename } = route;
    const head = ([] as JSX.Element[]).concat(...scripts);
    if (meta) {
      for (const key in meta) {
        const val = meta[key];
        if (typeof val === 'string') {
          head.push(<meta name={key} content={val} key={'_' + Math.random()} />);
        } else {
          head.push(<meta {...val} key={'_' + Math.random()} />);
        }
      }
    }
    await renderStatic(
      {
        title,
        head
      },
      path.join(paths.build, filename)
    );
    const canonical = meta?.canonical;
    let sitemap: string = '';
    if (typeof canonical === 'string') {
      sitemap = canonical;
    } else if (canonical) {
      sitemap = canonical.href;
    }
    sitemaps.push(sitemap);
  }
  const uniqueSitemaps = sitemaps.filter((item, i, ar) => ar.indexOf(item) === i && item.length > 0);
  fs.writeFileSync(path.join(paths.build, 'sitemap.txt'), uniqueSitemaps.join('\n'));
}

export { generateRouteHtml };
