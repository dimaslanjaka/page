import React from 'react';
import { Outlet } from 'react-router-dom';
import { Image } from '../components/Image';
import { Link } from '../components/Link';
import { querySelector, removeElement } from '../utils';

export function Layout() {
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!interval) {
      interval = setInterval(() => {
        if (document.readyState == 'complete') {
          removeElement(querySelector('.loader'));
          clearInterval(interval);
        }
      }, 400);
    }
  });

  return (
    <div>
      <div className="loader">
        <div className="sp sp-circle"></div>
      </div>
      <nav className="navbar navbar-expand-lg fixed-top" id="navbar-top">
        <div className="container-fluid">
          <Link className="navbar-brand" href="/page">
            <Image
              src="//www.webmanajemen.com/favicon.ico"
              alt="Logo"
              width="30"
              height="30"
              className="d-inline-block align-text-top"
            />
            {/*WMI*/}
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/page">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a href="/page/google/login" className="nav-link">
                  Login
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  id="navbarDropdown"
                >
                  Tools
                </a>
                <ul className="dropdown-menu" style={{ maxWidth: '300px' }} aria-labelledby="navbarDropdown">
                  <li>
                    <a className="dropdown-item" href="/page/cookies">
                      Cookie Manager
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/page/moment-timezone.html">
                      Moment Timezone Playground
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/page/bot-detect.html">
                      Bot Detection
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" aria-disabled="true">
                  Disabled
                </a>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>

      <div style={{ marginTop: '4em' }} id="react-content-wrapper">
        {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
        <Outlet />
      </div>

      <div className="container">
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <div className="col-md-4 d-flex align-items-center">
            <Link href="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
              <i className="fab fa-boostrap"></i>
            </Link>
            <span className="mb-3 mb-md-0 text-muted">© {new Date().getFullYear()} WMI, Inc</span>
          </div>

          <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
            <li className="ms-3">
              <Link className="text-muted" href={`https://wa.me/+6285655667573?text=${encodeURI('Hi, Webmaster WMI')}`}>
                <i className="fab fa-whatsapp"></i>
              </Link>
            </li>
            <li className="ms-3">
              <Link className="text-muted" href="https://github.com/dimaslanjaka">
                <i className="fab fa-github"></i>
              </Link>
            </li>
            <li className="ms-3">
              <Link className="text-muted" href="https://fb.me/dimaslanjaka1">
                <i className="fab fa-facebook"></i>
              </Link>
            </li>
          </ul>
        </footer>
      </div>
    </div>
  );
}

export function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/page">Go to the home page</Link>
      </p>
    </div>
  );
}
