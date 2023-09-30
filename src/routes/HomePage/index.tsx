import React from 'react';
//

import Link from '@components/Link';
import { Col, Container, Grid, Panel, Row } from 'rsuite';
import Adsense from 'src/components/Adsense';
import AdsenseFill from 'src/components/Adsense/AdsenseFill';

// const Panel = React.lazy(() => import('rsuite/esm/Panel'));
// const Container = React.lazy(() => import('rsuite/esm/Container'));
// const Row = React.lazy(() => import('rsuite/esm/Row'));
// const Grid = React.lazy(() => import('rsuite/esm/Grid'));
// const Col = React.lazy(() => import('rsuite/esm/Col'));
// const Link = React.lazy(() => import('@components/Link'));

class Home extends React.Component {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    document.title = 'Home page - WMI';
    // loadCSS('//cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css');
    require('./homepage.scss');
    if (!window.adsense_option) window.adsense_option = {};
    window.adsense_option.root = '.myHome';
    // window.adsense_option.places = ['#features', 'h1', '.rs-panel-body'];
  }

  render() {
    const featuresConfig = [
      {
        icon: 'fa-arrow-right-to-bracket',
        title: 'Login',
        link: '/page/login',
        desc: <>User portal to use any features</>
      },
      {
        title: 'Moment Timezone playground',
        icon: 'fa-clock',
        link: '/page/moment-timezone',
        desc: (
          <>
            Test, format, interval using <Link href="https://www.npmjs.com/moment-timezone">moment-timezone</Link>{' '}
            module
          </>
        )
      },
      {
        title: 'Outbound Page',
        icon: 'fa-person-walking-arrow-right',
        link: '/page/safelink',
        desc: (
          <>
            All external links proxied using outbound page using{' '}
            <Link href="https://www.npmjs.com/safelinkify">safelinkify</Link>
          </>
        )
      },
      {
        icon: 'fa-code',
        title: 'Auto highlight.js',
        link: '/page/highlight-js',
        desc: (
          <>
            Auto syntax highlighting on <b>{`<pre><code>`}</b> tag using{' '}
            <Link href="https://www.npmjs.com/highlight.js">highlight.js</Link>
          </>
        )
      }
    ];
    return (
      <div className="myHome">
        <header id="header">
          <div className="intro" id="intro">
            <div className="banner"></div>
            <div className="overlay" id="overlay">
              <Container>
                <Row>
                  <Col md={8} mdOffset={2} className="intro-text">
                    <h1>
                      W<span>M</span>I
                    </h1>
                    <p>
                      Website Management Indonesia is a blog about scripts, tips and tricks, games, software. Covering
                      php, javascript, jquery, mysql, seo, e-commerce and others.
                    </p>
                    <a href="#features" className="btn btn-custom btn-lg page-scroll">
                      <i className="fa-regular fa-chevron-double-down"></i>
                    </a>
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
        </header>

        <div id="features" className="text-center features mt-4">
          <Grid fluid>
            <Row className="features-item">
              <div className="section-title">
                <h2>Features</h2>
              </div>
              {featuresConfig.slice(0, 4).map((item, i) => {
                return (
                  <Col xs={24} sm={24} md={6} className="mb-2" key={i + item.title}>
                    <Panel shaded bordered bodyFill className="pt-4 pb-4">
                      <i className={'fa-thin fa-size-large ' + item.icon}></i>
                      <Panel header={item.title}>
                        <p>{item.desc}</p>
                        <a href={item.link} className="btn btn-sm btn-custom">
                          <i className="fa-thin fa-arrow-right"></i>
                        </a>
                      </Panel>
                      <AdsenseFill style={{ height: '150px' }} format="auto" />
                    </Panel>
                  </Col>
                );
              })}
            </Row>
          </Grid>
        </div>

        <div className="mt-2 mb-2">
          <Adsense
            style={{ display: 'block' }}
            format="autorelaxed"
            client="ca-pub-2188063137129806"
            slot="5041245242"
          />
        </div>
      </div>
    );
  }
}

export default Home;
