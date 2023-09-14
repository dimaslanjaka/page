import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { Link } from '../components/Link';
import './Home.scss';

export class Home extends React.Component {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    document.title = 'Home page - WMI';
  }

  render() {
    return (
      <div>
        <header id="header">
          <div className="intro">
            <img
              src="//rawcdn.githack.com/dimaslanjaka/dimaslanjaka.github.io/4e6098df3f102e2bd36b33b9055644bccd4faac3/images/PicsArt_09-09-12.12.25%201584x512px.png"
              className="banner"
            />
            <div className="overlay">
              <div className="container">
                <div className="row">
                  <div className="col-md-8 col-md-offset-2 intro-text">
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div id="features" className="text-center">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-md-offset-1 section-title">
                <h2>Features</h2>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-6 col-md-3">
                <i className="fa-solid fa-arrow-right-to-bracket fa-size-large"></i>
                <h3>Login</h3>
                <p>User portal to use any features</p>
                <a href="/page/login" className="btn btn-sm btn-custom">
                  <i className="fa-thin fa-arrow-right"></i>
                </a>
              </div>
              <div className="col-xs-6 col-md-3">
                <i className="fa-solid fa-clock fa-size-large"></i>
                <h3>Moment Timezone playground</h3>
                <p>
                  Test, format, interval using <code>moment-timezone</code> module
                </p>
                <a href="/page/moment-timezone" className="btn btn-sm btn-custom">
                  <i className="fa-thin fa-arrow-right"></i>
                </a>
              </div>
              <div className="col-xs-6 col-md-3">
                <i className="fa-regular fa-person-walking-arrow-right fa-size-large"></i>
                <h3>Outbound Page</h3>
                <p>
                  All external links proxied using outbound page using{' '}
                  <Link href="https://www.npmjs.com/safelinkify">safelinkify</Link>
                </p>
                <a href="/page/safelink" className="btn btn-sm btn-custom">
                  <i className="fa-thin fa-arrow-right"></i>
                </a>
              </div>
              <div className="col-xs-6 col-md-3">
                <i className="fa-light fa-code fa-size-large"></i>
                <h3>Auto highlight.js</h3>
                <p>
                  Auto syntax highlighting on <kbd>{`<pre><code>`}</kbd> tag using <kbd>highlight.js</kbd>
                </p>
                <a href="/page/highlight-js" className="btn btn-sm btn-custom">
                  <i className="fa-thin fa-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
