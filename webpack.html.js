const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const devMode = /dev/i.test(process.env.NODE_ENV);
const ASSET_PATH = '/page';

/**
 * @type {HtmlWebpackPlugin.Options['meta']}
 */
const defaultMeta = {
  author: 'Dimas Lanjaka <dimaslanjaka@gmail.com> (http://webmanajemen.com)',
  description: 'Page - WMI',
  canonical: {
    rel: 'canonical',
    href: 'https://www.webmanajemen.com/page/index.html'
  }
};

const htmlTemplate = path.resolve(__dirname, 'src', 'main.html'); // source html layout

/**
 * @type {HtmlWebpackPlugin.Options[]}
 */
const routes = [
  {
    title: 'Login page - WMI',
    filename: 'login.html' // filename
  },
  {
    title: 'Home page - WMI',
    filename: 'index.html'
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
].map(o => {
  // assign template
  if (!o.template) o.template = htmlTemplate;
  // auto add meta key
  if (!o.meta) o.meta = {};
  if (!o.meta.canonical) {
    // auto add meta canonical
    o.meta.canonical = {
      rel: 'canonical',
      href: 'https://www.webmanajemen.com/page/' + o.filename
    };
  }
  // assign with default meta
  o.meta = Object.assign(defaultMeta, o.meta || {});
  return o;
});

function webpackHtmlRoutes() {
  return routes.map(
    option =>
      new HtmlWebpackPlugin(
        Object.assign(
          {
            baseUrl: 'https://www.webmanajemen.com', // site url
            filename: 'index.html', // create index.html
            template: path.resolve('src', 'main.html'), // source html layout
            publicPath: ASSET_PATH, // base directory from root domain
            minify: devMode === false // minify on production
          },
          option
        )
      )
  );
}

module.exports = { webpackHtmlRoutes };
