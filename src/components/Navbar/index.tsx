import CogIcon from '@rsuite/icons/legacy/Cog';
import HomeIcon from '@rsuite/icons/legacy/Home';
import React from 'react';
import { Nav, Navbar } from 'rsuite';
import './Navbar.scss';

export const CustomNavbar = ({ ...props }) => {
  return (
    <Navbar {...props}>
      <Navbar.Brand href="#">WMI</Navbar.Brand>
      <Nav>
        <Nav.Item icon={<HomeIcon />} href="/page">
          Home
        </Nav.Item>
        <Nav.Item href="/page/google/login">Login</Nav.Item>
        <Nav.Menu title="Tools">
          <Nav.Item>
            <a href="/page/bot-detect" className="text-decoration-none">
              Selenium Checker
            </a>
          </Nav.Item>
          <Nav.Item>
            <a href="/page/moment-timezone">Moment Timezone Playground</a>
          </Nav.Item>
          <Nav.Item>
            <a href="/page/cookies">Cookie Manager</a>
          </Nav.Item>
        </Nav.Menu>
      </Nav>
      <Nav pullRight>
        <Nav.Item icon={<CogIcon />}>Settings</Nav.Item>
      </Nav>
    </Navbar>
  );
};
