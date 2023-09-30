import React from 'react';
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';
import Loader from './components/Loader';
import NoMatch from './components/NoMatch';
import RSuiteLayout from './components/RsuiteLayout';
import TestAdsense from './pages/TestAdsense';
import BotDetect from './routes/BotDetect';
import CookieManager from './routes/Cookies';
import HighlightLayout from './routes/Highlight';
import Home from './routes/HomePage';
import Login from './routes/Login';
import Safelink from './routes/Safelink';
import UI from './routes/UI';

/**
 * create multiple routes based on defined path
 * @param path
 * @param element
 * @returns
 * @example
 * defined path is 'home' will be returned 'home', 'home.html', 'home/index.html'
 */
const _createMultipleRoute = (path: string, element: RouteObject['element'] | RouteObject['lazy']): RouteObject[] => {
  if (element instanceof Promise) {
    const lazy = async function lazy() {
      const awaited = await element;
      // component export
      if ('Component' in awaited) return { Component: awaited.Component };
      // default export
      return { Component: awaited };
    };
    return [
      {
        path,
        lazy
      },
      // create path.html
      {
        path: `${path}.html`,
        lazy
      },
      // create path/index.html
      {
        path: `${path}/index.html`,
        lazy
      }
    ];
  }
  return [
    {
      element,
      path
    },
    // create path.html
    {
      element,
      path: `${path}.html`
    },
    // create path/index.html
    {
      element,
      path: `${path}/index.html`
    }
  ];
};

// const CookieManagerWithCookie = reactCookie.withCookies(CookieManager);

const router = createBrowserRouter([
  {
    path: '/',
    element: <RSuiteLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'page',
        children: [
          {
            index: true,
            element: <Home />
          },
          {
            path: 'ui',
            children: [
              {
                index: true,
                element: <UI />
              },
              {
                path: 'test',
                async lazy() {
                  const { Handler: Component } = await import('@components/TestUnit');
                  return { Component };
                }
                // element: <Handler />
              },
              {
                path: 'adsense',
                element: <TestAdsense />
              }
            ]
          },
          ..._createMultipleRoute('cookies', <CookieManager />),
          ..._createMultipleRoute('safelink', <Safelink />),
          ..._createMultipleRoute('google/login', <Login />),
          ..._createMultipleRoute('bot-detect', <BotDetect />),
          ..._createMultipleRoute('highlight-js', <HighlightLayout />),
          ..._createMultipleRoute('moment-timezone', import('@routes/MomentTimezone'))
        ]
      },
      {
        path: '*',
        element: <NoMatch />
      }
    ]
  }
]);

export default function App() {
  return <RouterProvider router={router} fallbackElement={<Loader />} />;
}
