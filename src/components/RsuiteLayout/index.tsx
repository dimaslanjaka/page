import React from 'react';
//

import { isRouteErrorResponse, Outlet, useRouteError } from 'react-router-dom';
//

import * as hljs from '@components/Highlight.js/helper';

import { Container, Content, Footer, Header, Sidebar } from 'rsuite';
import AdBlockModal from '../Adsense/AdBlockModal';
import MyFooter from './Footer';
import MyNavbar from './Navbar';
import MySidebar from './Sidebar';

// const Container = React.lazy(() => import('rsuite/esm/Container'));
// const Sidebar = React.lazy(() => import('rsuite/esm/Sidebar'));
// const Header = React.lazy(() => import('rsuite/esm/Header'));
// const Content = React.lazy(() => import('rsuite/esm/Content'));
// const Footer = React.lazy(() => import('rsuite/esm/Footer'));
// const MyNavbar = React.lazy(() => import('./Navbar'));
// const MySidebar = React.lazy(() => import('./Sidebar'));
// const MyFooter = React.lazy(() => import('./Footer'));

class RSuiteLayout extends React.Component<Record<string, any>, Record<string, any>> {
  constructor(props: any) {
    super(props);
    this.state = {
      activeKey: null
    };
  }

  static getDerivedStateFromError(_error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(_error: Error, _errorInfo: React.ErrorInfo): void {
    console.error('theme error caught');
  }

  componentDidMount() {
    // load main stylesheet
    require('src/assets/css/main.scss');
    // load theme stylesheet
    require('./theme.scss');
    // load adsense option
    window.adsense_option = Object.assign(window.adsense_option || {}, {
      places: ['.RsuiteLayout'],
      localhost: ['adsense.webmanajemen.com', 'agc.io', 'dev.webmanajemen.com']
    });
    // import('@components/Adsense/utils').then(load => {
    //   load.triggerAdsense({ react: true });
    // });
    // load scroll helper
    // import('@utils/scroll-helper');

    window.addEventListener('load', this.handleLoad.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('load', this.handleLoad.bind(this));
  }

  handleLoad() {
    // load highlight.js with copy button
    // utils.waitUntilPageFullyLoaded(() => {
    //   if (document.querySelectorAll('pre').length > 0) hljs.initHljs();
    // });
    hljs.initHljs();
    hljs.initClipBoard();
  }

  render() {
    //const [activeKey, setActiveKey] = React.useState(null);

    return (
      <div className="RsuiteLayout">
        <Container>
          <Header className="fixed-top">
            <MyNavbar />
          </Header>
          <Container id="content-wrapper">
            {/* <Content>{this.props.children}</Content> */}
            <Content style={{ maxWidth: '100%', height: '100%' }} className="p-2">
              <Outlet />
            </Content>
            <Sidebar className="d-none d-lg-block d-xl-block">
              <MySidebar />
            </Sidebar>
          </Container>
          <Footer>
            <MyFooter />
          </Footer>
        </Container>
        <AdBlockModal />
      </div>
    );
  }
}

// export { RSuiteLayout as Component };
export default RSuiteLayout;

export function ErrorBoundary() {
  const error = useRouteError() as Record<string, any>;
  return isRouteErrorResponse(error) ? (
    <h1>
      {error.status} {error.statusText}
    </h1>
  ) : (
    <h1>{error.message || error}</h1>
  );
}

// If you want to customize the component display name in React dev tools:
ErrorBoundary.displayName = 'RSuiteLayoutErrorBoundary';
