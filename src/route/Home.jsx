import React from 'react';
import './Home.scss';
import { Link } from '../components/Link';

export const Home = () => {
  React.useEffect(() => {
    document.title = 'Home page - WMI';
  });

  return (
    <main>
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
                    <i className="far fa-chevron-double-down"></i>
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
              <Link to="/page/login" className="btn btn-sm btn-custom">
                <i className="fa-thin fa-arrow-right"></i>
              </Link>
            </div>
            <div className="col-xs-6 col-md-3">
              <i className="fa-solid fa-clock fa-size-large"></i>
              <h3>Moment Timezone playground</h3>
              <p>
                Test, format, interval using <code>moment-timezone</code> module
              </p>
              <Link to="/page/moment-timezone" className="btn btn-sm btn-custom">
                <i className="fa-thin fa-arrow-right"></i>
              </Link>
            </div>
            <div className="col-xs-6 col-md-3">
              <i className="fa-solid fa-group fa-size-large"></i>
              <h3>Lorem ipsum</h3>
              <p>
                Lorem ipsum dolor sit amet placerat facilisis felis mi in tempus eleifend pellentesque natoque etiam.
              </p>
            </div>
            <div className="col-xs-6 col-md-3">
              <i className="fa-light fa-code fa-size-large"></i>
              <h3>Auto highlight.js</h3>
              <p>
                Auto 
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
