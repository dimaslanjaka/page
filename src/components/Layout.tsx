import React from 'react';
import { Outlet } from 'react-router-dom';
import { Link } from '../components/Link';
import { querySelector, removeElement } from '../utils';
import { NavbarBasic } from './NavbarBasic';

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
      <NavbarBasic />

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
