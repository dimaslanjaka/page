import React from 'react';
import { runBotDetectionMain } from '../assets/js/bot-detect';
import './BotDetect.scss';

export class BotDetect extends React.Component {
  constructor(props: any) {
    super(props);
  }

  componentDidMount(): void {
    //loadJS('/page/assets/js/bot-detect.js');
    runBotDetectionMain();
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="mb-3 col-md-12">
            <ol itemScope itemType="https://schema.org/BreadcrumbList" className="breadcrumb" id="BreadcrumbList">
              <li className="me-1" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <a itemProp="item" href="https://webmanajemen.com">
                  {' '}
                  <span itemProp="name">Homepage</span>
                </a>
                <meta itemProp="position" content="1" />
              </li>
              ›
              <li className="me-1" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <a itemProp="item" href="https://webmanajemen.com/page">
                  {' '}
                  <span itemProp="name">Page</span>
                </a>
                <meta itemProp="position" content="2" />
              </li>
              ›
              <li className="me-1" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <a itemProp="item" href="https://www.webmanajemen.com/page/bot-detect">
                  <span itemProp="name">Selenium Checker</span>
                </a>
                <meta itemProp="position" content="2" />
              </li>
            </ol>
          </div>

          <div className="text-center col-md-12">
            <h1>is iam bot ?</h1>
            <p>
              <a href="https://www.webmanajemen.com/page/bot-detect" target="_blank">
                https://www.webmanajemen.com/page/bot-detect
              </a>
              -
              <a href="https://codepen.io/dimaslanjaka/pen/OJpQBzJ" rel="nofollow noopener noreferrer" target="_blank">
                Source Code
              </a>{' '}
              - <span id="sid"></span>
            </p>
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-lg-6">
            <div className="row">
              <h3>Cloudflare Trace</h3>
              <div className="col-12">
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
                          <span id="selenium">Message Result</span>
                        </td>
                      </tr>
                      <tr title="your ip address">
                        <th>IP</th>
                        <td id="sel-ip"></td>
                      </tr>
                      <tr>
                        <th>Country</th>
                        <td id="sel-country">-</td>
                      </tr>
                      <tr title="your useragent">
                        <th>UA</th>
                        <td id="sel-ua"></td>
                      </tr>
                      <tr title="your proxy">
                        <th>Proxy</th>
                        <td id="sel-proxyInfo"></td>
                      </tr>
                      <tr title="is using cloudflare warp">
                        <th>WARP</th>
                        <td id="sel-warp">OFF</td>
                      </tr>
                      <tr title="is using cloudflare gateway">
                        <th>GATEWAY</th>
                        <td id="sel-gate">OFF</td>
                      </tr>
                      <tr title="is using cloudflare Remote Browser Isolation">
                        <th>RBI</th>
                        <td id="sel-rbi"></td>
                      </tr>
                      <tr title="current page id">
                        <th>ID</th>
                        <td>
                          <span id="unique-id">undefined</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <h3>Your Connection Informations</h3>
              <div className="col-12">
                <div className="table-responsive">
                  <table className="table table-striped table-bordered" id="con-headers">
                    <thead>
                      <tr>
                        <th>Key</th>
                        <th>Value</th>
                      </tr>
                    </thead>
                    <tbody></tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-6">
            <table id="cookies" className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Cookie Key</th>
                  <th>Cookie Value</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>

          <div className="col-12">
            <table className="table" id="navigator">
              <thead>
                <tr>
                  <th>Navigator Key</th>
                  <th>Navigator Value</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
