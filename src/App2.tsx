import React from 'react';
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';
import Loader from './components/Loader';

if (!window.adsense_option) {
  window.adsense_option = {
    places: ['.RsuiteLayout'],
    localhost: ['adsense.webmanajemen.com', 'agc.io', 'dev.webmanajemen.com'],
    adblock: false
  };
}

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
      if ('default' in awaited) return { Component: awaited.default };
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
    // element: <RSuiteLayout />,
    async lazy() {
      const { default: Layout } = await import('@components/RsuiteLayout');
      const { default: Adblock } = await import('@components/Adsense/AdBlockModal');
      const Component = () => (
        <React.Fragment>
          <Layout />
          <Adblock />
        </React.Fragment>
      );
      return { Component };
    },
    children: [
      {
        index: true,
        // element: <Home />
        async lazy() {
          const { default: Component } = await import('@routes/HomePage');
          return { Component };
        }
      },
      {
        path: 'page',
        children: [
          {
            index: true,
            // element: <Home />
            async lazy() {
              const { default: Component } = await import('@routes/HomePage');
              return { Component };
            }
          },
          {
            path: 'ui',
            children: [
              {
                index: true,
                // element: <UI />
                async lazy() {
                  const { default: Component } = await import('@routes/UI');
                  return { Component };
                }
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
                // element: <TestAdsense />
                async lazy() {
                  const { default: Component } = await import('src/pages/TestAdsense');
                  return { Component };
                }
              },
              {
                path: 'adblock',
                // element: <TestAdsense />
                async lazy() {
                  const { default: Component } = await import('src/components/Adsense/AdBlockModal');
                  return { Component };
                }
              }
            ]
          },
          ..._createMultipleRoute('cookies', import('@routes/Cookies')),
          ..._createMultipleRoute('safelink', import('@routes/Safelink')),
          ..._createMultipleRoute('google/login', import('@routes/Login')),
          ..._createMultipleRoute('bot-detect', import('@routes/BotDetect')),
          ..._createMultipleRoute('highlight-js', import('@routes/Highlight')),
          ..._createMultipleRoute('moment-timezone', import('@routes/MomentTimezone'))
        ]
      },
      {
        path: '*',
        // element: <NoMatch />
        async lazy() {
          const { default: Component } = await import('@components/NoMatch');
          return { Component };
        }
      }
    ]
  }
]);

export default function App() {
  return <RouterProvider router={router} fallbackElement={<Loader />} />;
}
