import React from 'react';
import './Home.scss';
import { Link } from 'react-router-dom';

export const Home = () => {
  React.useEffect(() => {
    document.title = 'Home page - WMI';
  });

  return (
    <main>
      <header id="header">
        <div class="intro">
          <img
            src="//rawcdn.githack.com/dimaslanjaka/dimaslanjaka.github.io/4e6098df3f102e2bd36b33b9055644bccd4faac3/images/PicsArt_09-09-12.12.25%201584x512px.png"
            className="banner"
          />
          <div class="overlay">
            <div class="container">
              <div class="row">
                <div class="col-md-8 col-md-offset-2 intro-text">
                  <h1>
                    W<span>M</span>I
                  </h1>
                  <p>
                    Website Management Indonesia is a blog about scripts, tips and tricks, games, software. Covering
                    php, javascript, jquery, mysql, seo, e-commerce and others.
                  </p>
                  <a href="#features" class="btn btn-custom btn-lg page-scroll">
                    <i class="far fa-chevron-double-down"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div id="features" class="text-center">
        <div class="container">
          <div className="row">
            <div class="col-md-12 col-md-offset-1 section-title">
              <h2>Features</h2>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-6 col-md-3">
              <i class="fa-solid fa-arrow-right-to-bracket fa-size-large"></i>
              <h3>Login</h3>
              <p>User portal to use any features</p>
              <Link to="/page/login" className="btn btn-sm btn-custom">
                <i class="fa-thin fa-arrow-right"></i>
              </Link>
            </div>
            <div class="col-xs-6 col-md-3">
              <i class="fa-sharp fa-solid fa-clock fa-size-large"></i>
              <h3>Moment Timezone playground</h3>
              <p>
                Test, format, interval using <code>moment-timezone</code> module
              </p>
              <Link to="/page/moment-timezone" className="btn btn-sm btn-custom">
                <i class="fa-thin fa-arrow-right"></i>
              </Link>
            </div>
            <div class="col-xs-6 col-md-3">
              <i class="fa-solid fa-group fa-size-large"></i>
              <h3>Lorem ipsum</h3>
              <p>
                Lorem ipsum dolor sit amet placerat facilisis felis mi in tempus eleifend pellentesque natoque etiam.
              </p>
            </div>
            <div class="col-xs-6 col-md-3">
              <i class="fa-solid fa-magic fa-size-large"></i>
              <h3>Lorem ipsum</h3>
              <p>
                Lorem ipsum dolor sit amet placerat facilisis felis mi in tempus eleifend pellentesque natoque etiam.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
