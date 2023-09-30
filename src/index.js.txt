import '@utils/promise';
//
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, useRoutes } from 'react-router-dom';
//
import Loader from './components/Loader';

const RSuiteLayout = React.lazy(() => import('@components/RsuiteLayout'));
const UI = React.lazy(() => import('@routes/UI'));
const NoMatch = React.lazy(() => import('@components/NoMatch'));
const Login = React.lazy(() => import('@routes/Login'));
const Safelink = React.lazy(() => import('@routes/Safelink'));
const Home = React.lazy(() => import('@routes/HomePage'));
const BotDetect = React.lazy(() => import('@routes/BotDetect'));
const HighlightLayout = React.lazy(() => import('@routes/Highlight'));
const MomentTimezone = React.lazy(() => import('@routes/MomentTimezone'));

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
