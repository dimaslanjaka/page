import React from 'react';
//

// import HomeIcon from '@rsuite/icons/legacy/Home';
// import { Nav, Navbar } from 'rsuite';

const Nav = React.lazy(() => import('rsuite/esm/Nav'));
const NavItem = React.lazy(() =>
  import('rsuite/esm/Nav').then(module => ({
    default: module.default.Item,
  })),
);
const NavMenu = React.lazy(() =>
  import('rsuite/esm/Nav').then(module => ({
    default: module.default.Menu,
  })),
);
const Navbar = React.lazy(() => import('rsuite/esm/Navbar'));
const NavbarBrand = React.lazy(() =>
  import('rsuite/esm/Navbar').then(module => ({
    default: module.default.Brand,
  })),
);

const HomeIcon = React.lazy(() => import('@rsuite/icons/legacy/Home'));

const MyNavbar = ({ ...props }) => {
  return (
    <Navbar {...props}>
      <NavbarBrand href="#">WMI</NavbarBrand>
      <Nav>
        <NavItem icon={<HomeIcon />} href="/page">
          Home
        </NavItem>
        <NavItem href="/page/google/login">Login</NavItem>
        <NavMenu title="Tools">
          <NavItem onClick={navItemClick} href="/page/bot-detect">
            Selenium Checker
          </NavItem>
          <NavItem onClick={navItemClick} href="/page/moment-timezone">
            Moment Timezone Playground
          </NavItem>
          <NavItem onClick={navItemClick} href="/page/cookies">
            Cookie Manager
          </NavItem>
        </NavMenu>
      </Nav>
      {/* <Nav pullRight>
        <NavItem icon={<CogIcon />}>Settings</NavItem>
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
