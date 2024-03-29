import '@utils/promise';
import React from 'react';
//

// import AdsenseFill from '@components/Adsense/AdsenseFill';
// import Image from '@components/Image';
// import Link from '@components/Link';
// import { Col, Container, Grid, Row } from 'rsuite';
import { Spinner } from 'src/components/Loader';
import { getGeoIp, getHeaders, getIp, isSelenium } from './bot-detect';

const AdsenseFill = React.lazy(
  () => import(/* webpackChunkName: "bot-detect-AdsenseFill" */ '@components/Adsense/AdsenseFill')
);
const Container = React.lazy(() => import(/* webpackChunkName: "bot-detect-Container" */ 'rsuite/esm/Container'));
const Row = React.lazy(() => import(/* webpackChunkName: "bot-detect-Row" */ 'rsuite/esm/Row'));
const Grid = React.lazy(() => import(/* webpackChunkName: "bot-detect-Grid" */ 'rsuite/esm/Grid'));
const Col = React.lazy(() => import(/* webpackChunkName: "bot-detect-Col" */ 'rsuite/esm/Col'));
const Link = React.lazy(() => import(/* webpackChunkName: "bot-detect-Link" */ '@components/Link'));
const Image = React.lazy(() => import(/* webpackChunkName: "bot-detect-Image" */ '@components/Image'));

type Results = Partial<ReturnType<typeof isSelenium>> &
  Partial<ReturnType<typeof getHeaders>> &
  Partial<ReturnType<typeof getIp>> &
  Partial<ReturnType<typeof getGeoIp>>;

interface State extends Results {
  [x: string]: any;
  /** page id */
  id?: string;
  selenium?: boolean;
  // headers: { key: string; value: string }[];
  // cookies?: { key: string; value: string }[];
}

class BotDetect extends React.Component<Record<string, any>, State> {
  _mounted: boolean;
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  // runner = this.runDetection.bind(this);

  componentDidMount(): void {
    document.title = 'Bot Selenium Checker - WMI';
    // load stylesheet
    require('./BotDetect.scss');
    // set mounted
    this._mounted = true;
    // get current unique page id
    import('@utils/index').then(utils => {
      this._utils = utils;
      if (this._mounted) {
        this.setState({ id: utils.getCurrentPageId() });
      }
      import(/* webpackChunkName: "bot-detect" */ './bot-detect').then(detector => {
        this._detector = detector;
        // detector loaded
        this.runDetection();
      });
    });

    // load page script
    // window.addEventListener('load', this.runner);
  }

  componentWillUnmount(): void {
    // remove page script
    // window.removeEventListener('load', this.runner);
    // reset mounted
    this._mounted = false;
    if (this.abortController) this.abortController.abort();
    this.promises.map(item => item && item.cancel && item.cancel());
    this.promises = [];
  }

  abortController: AbortController;
  promises: Promise<any>[] = [];
  _utils: typeof import('@utils/index');
  _detector: typeof import('./bot-detect');

  runDetection() {
    if (!this._mounted) return;
    this.abortController = new AbortController();

    this._utils.waitUntilPageFullyLoaded(() => {
      this._detector.runBotDetectionCookies();
      this._detector.runBotDetectionNavigator();
      const wrap = Promise.all([
        this._detector.isSelenium(),
        this._detector.getHeaders(this.abortController),
        this._detector.getIp(this.abortController).then(async ipResult => {
          const geoIp = await this._detector.getGeoIp(ipResult.ip);
          return Object.assign(ipResult, geoIp);
        })
      ]);
      this.promises.push(wrap);
      wrap.each(result => {
        for (const key in result) {
          if (this._mounted) {
            const value = result[key];
            this.setState({ [key]: value });
          }
        }
      });
    });
  }

  render() {
    return (
      <React.Suspense fallback={<Spinner />}>
        <Container id="bot-detector">
          <div className="text-center mb-2">
            <h1>is iam bot ?</h1>
            <p>
              <Link href="https://codepen.io/dimaslanjaka/pen/OJpQBzJ" target="_blank">
                Source Code
              </Link>
            </p>
          </div>

          <div className="m-">
            <AdsenseFill />
          </div>

          <Grid fluid className="mb-2">
            <Row>
              <Col xs={24} sm={24} md={12} className="mb-2">
                <h3 className="text-center">Cloudflare Trace</h3>
                <div className="table-responsive">
                  <table className="table table-striped table-bordered" id="cloudflare-tracer">
                    <thead>
                      <tr>
                        <th>Key</th>
                        <th>Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr title="is using selenium?">
                        <th>Selenium</th>
                        <td>
                          <span id="selenium">{String(this.state.selenium)}</span>
                        </td>
                      </tr>
                      <tr title="your ip address">
                        <th>IP</th>
                        <td id="sel-ip">{String(this.state.ip)}</td>
                      </tr>
                      <tr>
                        <th>Country</th>
                        <td id="sel-country">{String(this.state.country)}</td>
                      </tr>
                      <tr title="your useragent">
                        <th>User-Agent</th>
                        <td id="sel-ua">{String(this.state.uag)}</td>
                      </tr>
                      <tr title="your proxy">
                        <th>Proxy</th>
                        <td id="sel-proxyInfo">{String(this.state.proxy)}</td>
                      </tr>
                      <tr title="is using cloudflare warp">
                        <th>WARP</th>
                        <td id="sel-warp">{this.state.warp}</td>
                      </tr>
                      <tr title="is using cloudflare gateway">
                        <th>GATEWAY</th>
                        <td id="sel-gate">{this.state.gateway}</td>
                      </tr>
                      <tr title="is using cloudflare Remote Browser Isolation">
                        <th>RBI</th>
                        <td id="sel-rbi">{this.state.rbi}</td>
                      </tr>
                      <tr title="current page id">
                        <th>ID</th>
                        <td>
                          <span id="unique-id">{this.state.id}</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <AdsenseFill />
              </Col>

              <Col xs={24} sm={24} md={12} className="mb-2">
                <h3 className="text-center">Your Connection Informations</h3>
                <div className="table-responsive">
                  <table className="table table-striped table-bordered" id="con-headers">
                    <thead>
                      <tr>
                        <th>Key</th>
                        <th>Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.headers &&
                        Object.keys(this.state.headers)
                          .filter(key => !['host'].some(item => item.toLowerCase() === key.toLowerCase()))
                          .map(key => (
                            <tr key={key}>
                              <td>{key}</td>
                              <td>{this.state.headers[key]}</td>
                            </tr>
                          ))}
                    </tbody>
                  </table>
                </div>
                <AdsenseFill />
              </Col>
            </Row>

            <Row className="show-grid">
              <Col xs={24} sm={24} md={12} className="mb-2">
                <h3 className="text-center">Cookies information</h3>
                <table id="cookies" className="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th>Key</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody></tbody>
                </table>
                <AdsenseFill />
              </Col>

              <Col xs={24} sm={24} md={12} className="mb-2">
                <h3 className="text-center">Your browser navigator</h3>
                <table className="table" id="navigator">
                  <thead>
                    <tr>
                      <th>Navigator Key</th>
                      <th>Navigator Value</th>
                    </tr>
                  </thead>
                  <tbody></tbody>
                </table>
                <AdsenseFill />
              </Col>
            </Row>
          </Grid>

          <Image src="https://blog.cloudflare.com/content/images/2020/10/image7-7.png" width={100} height={100} />
        </Container>
      </React.Suspense>
    );
  }
}

export default BotDetect;
