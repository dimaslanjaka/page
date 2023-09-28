import fs from 'fs';
import path from 'path';
import React from 'react';
import paths from '../config/paths';
import { renderStatic } from './template';
// const devMode = /dev/i.test(process.env.NODE_ENV);

const defaultMeta: import('html-webpack-plugin').Options['meta'] = {
  author: 'Dimas Lanjaka <dimaslanjaka@gmail.com> (http://webmanajemen.com)',
  description: 'Page - WMI',
  canonical: {
    rel: 'canonical',
    href: 'https://www.webmanajemen.com/page/index.html'
  }
};

const htmlTemplate = paths.public + '/template.html'; // source html layout

const routes = [
  {
    title: 'Home page - WMI',
    filename: 'index.html'
  },
  {
    title: 'Login page - WMI',
    filename: 'login.html'
  },
  {
    title: '404 - WMI',
    filename: '404.html'
  },
  {
    title: 'Outbound page - WMI',
    filename: 'safelink.html'
  },
  {
    title: 'Auto highlight.js - WMI',
    filename: 'highlight-js.html'
  },
  {
    title: 'Login page - WMI',
    filename: 'google/login.html'
  },
  {
    title: 'Moment Timezone Playground',
    filename: 'moment-timezone.html',
    meta: {
      description: 'Moment Timezone Online Playground For Free. Support custom format pattern',
      language: {
        httpEquiv: 'Content-Language',
        content: 'en_US'
      },
      canonical: {
        rel: 'canonical',
        href: 'https://www.webmanajemen.com/page/moment-timezone.html'
      }
    }
  },
  {
    title: 'Selenium checker - bot detector',
    description: 'Javascript Bot Detector Tools - WMI',
    filename: 'bot-detect.html',
    meta: {
      canonical: {
        rel: 'canonical',
        href: 'https://www.webmanajemen.com/page/bot-detect.html'
      }
    }
  }
].map(obj => {
  const o = obj as { meta?: import('html-webpack-plugin').Options['meta'] } & Record<string, any>;
  // assign template
  if (!o.template) o.template = htmlTemplate;
  // auto add meta key
  if (!o.meta) o.meta = {} as Record<string, any>;
  if (!o.meta.canonical) {
    // auto add meta canonical
    o.meta.canonical = {
      rel: 'canonical',
      href: 'https://www.webmanajemen.com/page/' + o.filename
    };
  }
  if (!o.meta.language) {
    o.meta.language = {
      name: 'language',
      content: 'en_US'
    };
  }
  // assign with default meta
  o.meta = Object.assign(defaultMeta, o.meta || {});
  return o as typeof obj;
});

function webpackHtmlRoutes() {
  const mapped = routes.map(option =>
    Object.assign(
      {
        baseUrl: 'https://www.webmanajemen.com', // site url
        filename: 'index.html', // create index.html
        template: htmlTemplate, // source html layout
        publicPath: paths.base, // base directory from root domain
        // minify: devMode === false, // minify on production
        minify: false
        // inject: true
      },
      option
    )
  );
  if (!fs.existsSync(paths.tmp)) {
    fs.mkdirSync(paths.tmp);
  }
  fs.writeFileSync(path.join(paths.tmp, 'html.json'), JSON.stringify(mapped, null, 2));
  return mapped;
}

function generateRouteHtml() {
  const generatedIndex = paths.build + '/index.html';
  const contents = fs.readFileSync(generatedIndex, 'utf-8');
  const routes = webpackHtmlRoutes();
  const regex = /<script[\s\S]*?>[\s\S]*?<\/script>/gi;
  let m: RegExpExecArray | null = null;
  const scripts = [] as JSX.Element[];
  // get script bundles
  while ((m = regex.exec(contents)) !== null) {
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    if (typeof m[0] === 'string' && m[0].length > 0 && !m[0].includes('/page/main.js')) {
      var srcRegEx = /src=["'](.*?)["']/g;
      var source = srcRegEx.exec(m[0]);
      if (source) {
        scripts.push(<script src={source[1]} key={source[1]} defer={true}></script>);
      }
    }
  }

  for (let i = 0; i < routes.length; i++) {
    const route = routes[i];
    const { meta, title, filename } = route;
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
    renderStatic(
      {
        title,
        head
      },
      path.join(paths.build, filename)
    );
  }
}

if (require.main === module) {
  generateRouteHtml();
}

export { webpackHtmlRoutes, generateRouteHtml };
