import React from 'react';
import { Container, Footer } from 'rsuite';
import { Link } from '../components/Link';
import { Loader } from './Loader';
import { CustomNavbar } from './Navbar';

export function Layout(props: any) {
  const [activeKey, setActiveKey] = React.useState(null);

  return (
    <div>
      <CustomNavbar appearance="inverse" activeKey={activeKey} onSelect={setActiveKey} />

      <Loader />

      <div style={{ marginTop: '4em' }} id="react-content-wrapper">
        {props.children}
      </div>

      <Container>
        <Footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <div className="col-md-4 d-flex align-items-center">
            <a href="/page" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
              <i className="fa-brands fa-boostrap"></i>
            </a>
            <span className="mb-3 mb-md-0 text-muted">© {new Date().getFullYear()} WMI, Inc</span>
          </div>

          <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
            <li className="ms-3">
              <Link className="text-muted" href={`https://wa.me/+6285655667573?text=${encodeURI('Hi, Webmaster WMI')}`}>
                <i className="fa-brands fa-whatsapp"></i>
              </Link>
            </li>
            <li className="ms-3">
              <Link className="text-muted" href="https://github.com/dimaslanjaka">
                <i className="fa-brands fa-github"></i>
              </Link>
            </li>
            <li className="ms-3">
              <Link className="text-muted" href="https://fb.me/dimaslanjaka1">
                <i className="fa-brands fa-facebook"></i>
              </Link>
            </li>
          </ul>
        </Footer>
      </Container>
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
