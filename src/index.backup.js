var Promise = require('bluebird');
if (/dev/i.test(process.env.NODE_ENV)) {
  // Configure webpack and browserify for development/debugging
  Promise.config({
    longStackTraces: true,
    warnings: true, // note, run node with --trace-warnings to see full stack traces for warnings
    // Enable cancellation
    cancellation: true
  });
} else {
  // Configure webpack and browserify for production/performance
  Promise.config({
    longStackTraces: false,
    warnings: false,
    // Enable cancellation
    cancellation: true
  });
}

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import Loader from './components/Loader';

const RSuiteLayout = React.lazy(() => import('@components/RsuiteLayout'));
const UI = React.lazy(() => import('@route/UI'));
const NoMatch = React.lazy(() => import('@components/NoMatch'));
const Login = React.lazy(() => import('@route/Login'));
const Safelink = React.lazy(() => import('@route/Safelink'));
const Home = React.lazy(() => import('@route/HomePage'));
const BotDetect = React.lazy(() => import('@route/BotDetect'));
const HighlightLayout = React.lazy(() => import('@route/Highlight'));
const MomentTimezone = React.lazy(() => import('@route/MomentTimezone'));

const _Router_array = () => {
  /**
   * create multiple routes based on defined path
   * @param {string} path
   * @param {JSX.Element|React.ReactNode} jsx
   * @returns
   * @example
   * defined path is 'home' will be returned 'home', 'home.html', 'home/index.html'
   */
  const createDual = (path, jsx) => {
    return [
      {
        element: <React.Suspense fallback={<div>route loading</div>}>{jsx}</React.Suspense>,
        path
      },
      // create path.html
      {
        element: <React.Suspense fallback={<div>ext route loading</div>}>{jsx}</React.Suspense>,
        path: `${path}.html`
      },
      // create path/index.html
      {
        element: <React.Suspense fallback={<div>index route loading</div>}>{jsx}</React.Suspense>,
        path: `${path}/index.html`
      }
    ];
  };
  const routes = [
    {
      element: (
        <React.Suspense fallback={<Loader />}>
          <RSuiteLayout />
        </React.Suspense>
      ),
      path: '/',
      children: [
        {
          index: true,
          element: (
            <React.Suspense fallback={<div>Homepage loading</div>}>
              <Home />
            </React.Suspense>
          )
        },
        {
          element: (
            <React.Suspense fallback={<div>404 loading</div>}>
              <NoMatch />
            </React.Suspense>
          ),
          path: '*'
        },
        ...createDual('ui', <UI />),
        ...createDual('safelink', <Safelink />),
        ...createDual('google/login', <Login />),
        ...createDual('bot-detect', <BotDetect />),
        ...createDual('highlight-js', <HighlightLayout />),
        ...createDual('moment-timezone', <MomentTimezone />)
      ]
    }
  ];

  const Router = () => useRoutes(routes);

  return (
    <BrowserRouter basename="/page">
      <Router />
    </BrowserRouter>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <_Router_array />
  </React.StrictMode>,
  document.getElementById('app')
);

// hot reloading
if (module.hot && module.hot.accept) module.hot.accept();
