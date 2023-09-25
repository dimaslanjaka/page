import { getCurrentPageId } from '@/utils';
import Bluebird from 'bluebird';
import React from 'react';
//

import {
  getGeoIp,
  getHeaders,
  getIp,
  isSelenium,
  runBotDetectionCookies,
  runBotDetectionNavigator
} from './bot-detect';

const AdsenseFill = React.lazy(() => import('@component/Adsense/AdsenseFill'));
const Container = React.lazy(() => import('rsuite/esm/Container'));
const Row = React.lazy(() => import('rsuite/esm/Row'));
const Grid = React.lazy(() => import('rsuite/esm/Grid'));
const Col = React.lazy(() => import('rsuite/esm/Col'));
const Link = React.lazy(() => import('@components/Link'));
const Image = React.lazy(() => import('@components/Image'));

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
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  runner = this.runDetection.bind(this);

  componentDidMount(): void {
    // load stylesheet
    require('./BotDetect.scss');
    // get current unique page id
    this.setState({ id: getCurrentPageId() });
    // load page script
    window.addEventListener('load', this.runner);
  }

  componentWillUnmount(): void {
    // remove page script
    window.removeEventListener('load', this.runner);
    if (this.abortController) this.abortController.abort();
    this.promises.map(item => item.cancel());
    this.promises = [];
  }

  abortController: AbortController;
  promises: Bluebird<any>[] = [];

  runDetection() {
    this.abortController = new AbortController();
    const wrap = Bluebird.all([
      isSelenium(),
      getHeaders(this.abortController),
      getIp(this.abortController).then(ipResult => {
        return getGeoIp(ipResult.ip).then(geoIp => {
          return Object.assign(ipResult, geoIp);
        });
      })
    ]);
    this.promises.push(wrap);
    wrap.each(result => {
      for (const key in result) {
        if (Object.prototype.hasOwnProperty.call(result, key)) {
          const value = result[key];
          this.setState({ [key]: value });
        }
      }
    });

    runBotDetectionNavigator();
    runBotDetectionCookies();
  }

  render() {
    return (
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
          <Row className="show-grid">
            <Col xs={12}>
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

            <Col xs={12}>
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

            <Col xs={12}>
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

            <Col xs={12}>
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
    );
  }
}

export default BotDetect;
