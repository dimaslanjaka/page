import HomeIcon from '@rsuite/icons/legacy/Home';
import React from 'react';
import { Nav, Navbar } from 'rsuite';

// const Nav = React.lazy(() => import('rsuite/esm/Nav'));
// const NavMenu = React.lazy(() => import('rsuite/esm/Nav/NavMenu'));
// const NavItem = React.lazy(() => import('rsuite/esm/Nav/NavItem'));
// const Navbar = React.lazy(() => import('rsuite/esm/Navbar'));
// const NavbarBrand = React.lazy(() => import('rsuite/esm/Navbar/NavbarBrand'));
// const HomeIcon = React.lazy(() => import('@rsuite/icons/legacy/Home'));

const MyNavbar = ({ ...props }) => {
  return (
    <Navbar {...props}>
      <Navbar.Brand href="#">WMI</Navbar.Brand>
      <Nav>
        <Nav.Item icon={<HomeIcon />} href="/page">
          Home
        </Nav.Item>
        <Nav.Item href="/page/google/login">Login</Nav.Item>
        <Nav.Menu title="Tools">
          <Nav.Item onClick={navItemClick} href="/page/bot-detect">
            Selenium Checker
          </Nav.Item>
          <Nav.Item onClick={navItemClick} href="/page/moment-timezone">
            Moment Timezone Playground
          </Nav.Item>
          <Nav.Item onClick={navItemClick} href="/page/cookies">
            Cookie Manager
          </Nav.Item>
        </Nav.Menu>
      </Nav>
      {/* <Nav pullRight>
        <Nav.Item icon={<CogIcon />}>Settings</Nav.Item>
      </Nav> */}
    </Navbar>
  );
};

export default MyNavbar;

function navItemClick(e: { target: any }): any {
  const el = e.target as HTMLElement;
  if (el.hasAttribute('href')) {
    window.location.href = el.getAttribute('href');
  }
}
