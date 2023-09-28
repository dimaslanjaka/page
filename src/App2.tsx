import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Loader from './components/Loader';
import NoMatch from './components/NoMatch';
import RSuiteLayout from './components/RsuiteLayout';
import BotDetect from './route/BotDetect';
import HighlightLayout from './route/Highlight';
import Home from './route/HomePage';
import Login from './route/Login';
import MomentTimezone from './route/MomentTimezone';
import Safelink from './route/Safelink';
import UI from './route/UI';

/**
 * create multiple routes based on defined path
 * @param path
 * @param element
 * @returns
 * @example
 * defined path is 'home' will be returned 'home', 'home.html', 'home/index.html'
 */
const _createMultipleRoute = (path: string, element: JSX.Element | React.ReactNode) => {
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
                  let { Handler: Component } = await import('@components/TestUnit');
                  return { Component };
                }
                // element: <Handler />
              }
            ]
          },
          ..._createMultipleRoute('safelink', <Safelink />),
          ..._createMultipleRoute('google/login', <Login />),
          ..._createMultipleRoute('bot-detect', <BotDetect />),
          ..._createMultipleRoute('highlight-js', <HighlightLayout />),
          ..._createMultipleRoute('moment-timezone', <MomentTimezone />)
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
