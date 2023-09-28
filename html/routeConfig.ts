import paths from '../config/paths';

type Routes = import('html-webpack-plugin').Options & {
  [key: string]: any;
  meta?: Record<string, any>;
  filename: string;
};

const rconfig: Routes[] = [
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
];

const routes = rconfig
  .map(obj => {
    obj.meta = obj.meta || ({} as any);
    return obj;
  })
  .map(o => {
    // const o = obj as { meta?: import('html-webpack-plugin').Options['meta'] } & Record<string, any>;
    // assign template
    if (!o.template) o.template = paths.public + '/template.html';
    // auto add meta key
    const { meta = {} } = o;
    // if (!o.meta) o.meta = {} as Record<string, any>;
    if (!meta?.canonical) {
      // auto add meta canonical
      meta.canonical = {
        rel: 'canonical',
        href: 'https://www.webmanajemen.com/page/' + o.filename
      };
    }

    if (!meta.language) {
      meta.language = {
        name: 'language',
        content: 'en_US'
      };
    }
    const defaultMeta: import('html-webpack-plugin').Options['meta'] = {
      author: 'Dimas Lanjaka <dimaslanjaka@gmail.com> (http://webmanajemen.com)',
      description: 'Page - WMI',
      canonical: {
        rel: 'canonical',
        href: 'https://www.webmanajemen.com/page/index.html'
      }
    };
    // assign with default meta
    o.meta = Object.assign(defaultMeta, meta || {});

    // console.log('map', meta.canonical);
    return o;
  });

export { routes as rConfig };

// if (!fs.existsSync(paths.tmp)) {
//   fs.mkdirSync(paths.tmp);
// }
// fs.writeFileSync(path.join(paths.tmp, 'html.json'), JSON.stringify(rConfig, null, 2));
// if (require.main === module) {
//   generateRouteHtml();
// }
