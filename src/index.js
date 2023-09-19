import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  useRoutes,
} from 'react-router-dom';
import { suspenseIt } from './utils/suspense';

const RSuiteLayout = React.lazy(() => import('@components/RsuiteLayout'));
const UI = React.lazy(() => import('@route/UI'));
const NoMatch = React.lazy(() => import('@components/NoMatch'));
const Login = React.lazy(() => import('@route/Login'));
const Safelink = React.lazy(() => import('@route/Safelink'));
const Home = React.lazy(() => import('@route/HomePage'));
const BotDetect = React.lazy(() => import('@route/BotDetect'));
const HighlightLayout = React.lazy(() => import('@route/Highlight'));
const MomentTimezone = React.lazy(() => import('@/route/MomentTimezone'));

const _Router_jsx = () => {
  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/page" element={suspenseIt(<RSuiteLayout />)}>
        <Route index element={suspenseIt(<Home />)} />
        <Route path="google/login" element={suspenseIt(<Login />)} />
        <Route path="google/login.html" element={suspenseIt(<Login />)} />
        <Route path="safelink" element={suspenseIt(<Safelink />)} />
        <Route path="safelink.html" element={suspenseIt(<Safelink />)} />
        <Route path="bot-detect" element={suspenseIt(<BotDetect />)} />
        <Route path="bot-detect.html" element={suspenseIt(<BotDetect />)} />
        <Route path="highlight-js" element={suspenseIt(<HighlightLayout />)} />
        <Route path="highlight-js.html" element={suspenseIt(<HighlightLayout />)} />
        <Route path="moment-timezone" element={suspenseIt(<MomentTimezone />)} />
        <Route path="moment-timezone.html" element={suspenseIt(<MomentTimezone />)} />
        <Route path="ui" element={<UI />} />
        <Route path="*" element={<NoMatch />} />
      </Route>,
    ),
  );

  return <RouterProvider router={routes} />;
};

let _Router_array = () => {
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
        element: suspenseIt(jsx),
        path,
      },
      // create path.html
      {
        element: suspenseIt(jsx),
        path: `${path}.html`,
      },
      // create path/index.html
      {
        element: suspenseIt(jsx),
        path: `${path}/index.html`,
      },
    ];
  };
  const routes = [
    {
      element: suspenseIt(<RSuiteLayout />),
      path: '/',
      children: [
        {
          index: true,
          element: suspenseIt(<Home />),
        },
        {
          element: suspenseIt(<NoMatch />),
          path: '*',
        },
        ...createDual('ui', <UI />),
      ],
    },
    {
      element: suspenseIt(<RSuiteLayout />),
      path: '/page',
      children: [
        {
          index: true,
          element: suspenseIt(<Home />),
        },
        ...createDual('ui', <UI />),
        ...createDual('safelink', <Safelink />),
        ...createDual('google/login', <Login />),
        ...createDual('bot-detect', <BotDetect />),
        ...createDual('highlight-js', <HighlightLayout />),
        ...createDual('moment-timezone', <MomentTimezone />),
      ],
    },
  ];

  const Router = () => useRoutes(routes);

  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <_Router_array />
  </React.StrictMode>,
  document.getElementById('app'),
);

// hot reloading
if (module.hot && module.hot.accept) module.hot.accept();
