import React from 'react';
//

import * as utils from '@/utils';
import * as hljs from '@components/Highlight.js/helper';
import Bluebird from 'bluebird';
import { isRouteErrorResponse, Outlet, useRouteError } from 'react-router-dom';
// import { Container, Content, Footer, Header, Sidebar } from 'rsuite';
// import MyFooter from './Footer';
// import MyNavbar from './Navbar';
// import MySidebar from './Sidebar';

const Container = React.lazy(() => import('rsuite/esm/Container'));
const Sidebar = React.lazy(() => import('rsuite/esm/Sidebar'));
const Header = React.lazy(() => import('rsuite/esm/Header'));
const Content = React.lazy(() => import('rsuite/esm/Content'));
const Footer = React.lazy(() => import('rsuite/esm/Footer'));
const MyNavbar = React.lazy(() => import('./Navbar'));
const MySidebar = React.lazy(() => import('./Sidebar'));
const MyFooter = React.lazy(() => import('./Footer'));

class RSuiteLayout extends React.Component<Record<string, any>, Record<string, any>> {
  constructor(props: any) {
    super(props);
    this.state = {
      activeKey: null,
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
    require('@assets/css/main.scss');
    // load theme stylesheet
    require('./theme.scss');

    window.addEventListener('load', this.handleLoad.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('load', this.handleLoad.bind(this));
  }

  handleLoad() {
    // load pre/code copy button
    this.initClipBoard();
    // load highlight.js
    // utils.waitUntilPageFullyLoaded(() => {
    //   if (document.querySelectorAll('pre').length > 0) hljs.initHljs();
    // });
    hljs.initHljs();
  }

  render() {
    //const [activeKey, setActiveKey] = React.useState(null);

    return (
      <React.Suspense fallback={<div>Theme loading</div>}>
        <div className="RsuiteLayout">
          <Container>
            <React.Suspense fallback={<div>Navbar loading</div>}>
              <Header className="fixed-top">
                <MyNavbar />
              </Header>
            </React.Suspense>
            <React.Suspense fallback={<div>Content wrapper loading</div>}>
              <Container id="content-wrapper">
                {/* <Content>{this.props.children}</Content> */}
                <React.Suspense fallback={<div>Content loading</div>}>
                  <Content>
                    <Outlet />
                  </Content>
                </React.Suspense>
                <React.Suspense fallback={<div>Sidebar loading</div>}>
                  <Sidebar className="d-none d-lg-block d-xl-block">
                    <MySidebar />
                  </Sidebar>
                </React.Suspense>
              </Container>
            </React.Suspense>
            <React.Suspense fallback={<div>Footer loading</div>}>
              <Footer>
                <MyFooter />
              </Footer>
            </React.Suspense>
          </Container>
        </div>
      </React.Suspense>
    );
  }

  /**
   * init copy clipboard on pre-code
   * @returns
   */
  initClipBoard() {
    return Bluebird.all(Array.from(document.querySelectorAll('pre'))).each(function (codeBlock) {
      if (!codeBlock.getAttribute('id')) {
        codeBlock.setAttribute('id', utils.randomStr(4));
      }

      const button = document.createElement('button');
      button.className = 'copy-code-button';
      button.type = 'button';
      const s = codeBlock.innerText;
      button.setAttribute('data-clipboard-text', s);
      // button.innerText = 'Copy';
      const span = document.createElement('span');
      span.innerText = 'Copy';
      button.appendChild(span);
      // button.setAttribute('title', 'Copiar para a área de transferência');
      button.onclick = function (e) {
        const el = document.getElementById(codeBlock.getAttribute('id'));
        utils
          .copyTextToClipboard(el.textContent.replace(/(Copy|Copied)$/gm, ''), e)
          .then(() => {
            (e.target as Element).textContent = 'Copied';
          })
          .finally(() => {
            window.setTimeout(function () {
              (e.target as Element).textContent = 'Copy';
            }, 2000);
          })
          .catch(console.error);
      };

      // var pre = codeBlock.parentNode;
      //codeBlock.classList.add('prettyprint');
      // pre.parentNode.insertBefore(button, pre);
      codeBlock.appendChild(button);
    });
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
