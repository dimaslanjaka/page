import React from 'react';
import { Home } from './route/Home';
import { Login } from './route/Login';
import { Link, Outlet, Route, Routes } from 'react-router-dom';
import './assets/css/main.scss';
import { loadMainScript } from './assets/js/main';

class App extends React.Component {
  componentDidMount() {
    //document.title = 'dfsdfsdfsd';
    loadMainScript();
  }

  render() {
    return (
      <React.Fragment>
        <Routes>
          <Route path="/page" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="safelink" element={<Login />} />

            {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </React.Fragment>
    );
  }
}

function Layout() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top" id="navbar-top">
        <div className="container-fluid">
          <Link className="navbar-brand" href="/page">
            <img
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
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <Link to="login" className="nav-link">
                  Login
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
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

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />

      <div className="container">
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <div className="col-md-4 d-flex align-items-center">
            <a href="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
              <i className="fab fa-boostrap"></i>
            </a>
            <span className="mb-3 mb-md-0 text-muted">© {new Date().getFullYear()} WMI, Inc</span>
          </div>

          <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
            <li className="ms-3">
              <a className="text-muted" href={`https://wa.me/+6285655667573?text=${encodeURI('Hi, Webmaster WMI')}`}>
                <i className="fab fa-whatsapp"></i>
              </a>
            </li>
            <li className="ms-3">
              <a className="text-muted" href="https://github.com/dimaslanjaka">
                <i className="fab fa-github"></i>
              </a>
            </li>
            <li className="ms-3">
              <a className="text-muted" href="https://fb.me/dimaslanjaka1">
                <i className="fab fa-facebook"></i>
              </a>
            </li>
          </ul>
        </footer>
      </div>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/page">Go to the home page</Link>
      </p>
    </div>
  );
}

export default App;
