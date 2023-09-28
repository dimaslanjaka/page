import React from 'react';
//

import Link from '@components/Link';
import HomeIcon from '@rsuite/icons/legacy/Home';
import { Nav, Navbar } from 'rsuite';

const { Brand: NavbarBrand } = Navbar;
const { Item: NavItem, Menu: NavMenu } = Nav;

// const Link = React.lazy(() => import('@components/Link'));
// const Nav = React.lazy(() => import('rsuite/esm/Nav'));
// const NavItem = React.lazy(() =>
//   import('rsuite/esm/Nav').then(module => ({
//     default: module.default.Item
//   }))
// );
// const Navbar = React.lazy(() => import('rsuite/esm/Navbar'));
// const NavbarBrand = React.lazy(() =>
//   import('rsuite/esm/Navbar').then(module => ({
//     default: module.default.Brand
//   }))
// );
// const HomeIcon = React.lazy(() => import('@rsuite/icons/legacy/Home'));
// const NavMenu = React.lazy(() =>
//   import('rsuite/esm/Nav').then(module => ({
//     default: module.default.Menu
//   }))
// );

const MyNavbar = ({ ...props }) => {
  return (
    <Navbar {...props}>
      <NavbarBrand href="#">WMI</NavbarBrand>
      <Nav>
        <NavItem icon={<HomeIcon />} as={Link} href="/" eventKey="home" title="Home"></NavItem>
        <NavItem href="/page/google/login" eventKey="login" title="login">
          <i className="fa-regular fa-arrow-right-to-arc"></i>
        </NavItem>
        <NavItem as={Link} href="/page/bot-detect" title="Selenium Checker" eventKey="selenium">
          <i className="fa-thin fa-robot"></i>
        </NavItem>
        <NavItem as={Link} href="/page/moment-timezone" title="Moment Timezone Playground" eventKey="momentTimezone">
          <i className="fa-thin fa-clock"></i>
        </NavItem>
        <NavItem as={Link} href="/page/cookies" title="Cookie Manager" eventKey="cookieMgr">
          <i className="fa-thin fa-cookie"></i>
        </NavItem>
      </Nav>
      {/* <Nav pullRight>
        <NavItem icon={<CogIcon />}>Settings</NavItem>
      </Nav> */}
    </Navbar>
  );
};

export default MyNavbar;

// function navItemClick(e: { target: any }): any {
//   const el = e.target as HTMLElement;
//   if (el.hasAttribute('href')) {
//     window.location.href = el.getAttribute('href');
//   }
// }
