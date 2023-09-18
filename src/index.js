import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Loader from './components/Loader';

const RSuiteLayout = React.lazy(() => import('@components/RsuiteLayout'));
const UI = React.lazy(() => import('@route/UI'));
const NoMatch = React.lazy(() => import('@components/NoMatch'));
const Login = React.lazy(() => import('@route/Login'));
const Safelink = React.lazy(() => import('@route/Safelink'));
const Home = React.lazy(() => import('@route/HomePage'));
const BotDetect = React.lazy(() => import('@route/BotDetect'));
const HighlightLayout = React.lazy(() => import('@route/Highlight'));
const MomentTimezone = React.lazy(() => import('@/route/MomentTimezone'));

const router = createBrowserRouter(
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

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById('app'),
);

// hot reloading
if (module.hot && module.hot.accept) module.hot.accept();

function suspenseIt(element, fallback = <Loader />) {
  return <React.Suspense fallback={fallback}>{element}</React.Suspense>;
}
