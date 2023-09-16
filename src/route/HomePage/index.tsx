//import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { Col, Container, Grid, Panel, Row } from 'rsuite';
import { Link } from '../../components/Link';
import './homepage.scss';

export class Home extends React.Component {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    document.title = 'Home page - WMI';
    //loadCSS('//cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css');
  }

  render() {
    const featuresConfig = [
      {
        icon: 'fa-arrow-right-to-bracket',
        title: 'Login',
        link: '/page/login',
        desc: <>User portal to use any features</>,
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
        ),
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
        ),
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
        ),
      },
    ];
    return (
      <div className="myHome">
        <header id="header">
          <div className="intro" id="intro">
            {/* <img
              src="//rawcdn.githack.com/dimaslanjaka/dimaslanjaka.github.io/4e6098df3f102e2bd36b33b9055644bccd4faac3/images/PicsArt_09-09-12.12.25%201584x512px.png"
              className="banner"
            /> */}
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
            <Row>
              <Col md={12} mdOffset={1} className="section-title">
                <h2>Features</h2>
              </Col>
            </Row>
            <Row className="features-item">
              {featuresConfig.slice(0, 4).map(item => {
                return (
                  <Col xs={24} sm={24} md={6} className="mb-2">
                    <Panel shaded bordered bodyFill className="pt-4 pb-4">
                      <i className={'fa-thin fa-size-large ' + item.icon}></i>
                      <Panel header={item.title}>
                        <p>{item.desc}</p>
                        <a href={item.link} className="btn btn-sm btn-custom">
                          <i className="fa-thin fa-arrow-right"></i>
                        </a>
                      </Panel>
                    </Panel>
                  </Col>
                );
              })}
            </Row>
          </Grid>
        </div>
      </div>
    );
  }
}

export default Home;
