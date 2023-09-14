import CogIcon from '@rsuite/icons/legacy/Cog';
import HomeIcon from '@rsuite/icons/legacy/Home';
import React from 'react';
import { Nav, Navbar } from 'rsuite';

export const CustomNavbar = ({ onSelect, activeKey, ...props }) => {
  return (
    <Navbar {...props}>
      <Navbar.Brand href="#">WMI</Navbar.Brand>
      <Nav onSelect={onSelect} activeKey={activeKey}>
        <Nav.Item eventKey="1" icon={<HomeIcon />} href="/page">
          Home
        </Nav.Item>
        <Nav.Item eventKey="2" href="/page/google/login">
          Login
        </Nav.Item>
        <Nav.Item eventKey="3" href="https://github.com/dimaslanjaka">
          <i className="fa-brands fa-github"></i>
        </Nav.Item>
        <Nav.Menu title="Tools" style={{ width: 300 }}>
          <Nav.Item eventKey="4">
            <a href="/page/bot-detect">Selenium Checker</a>
          </Nav.Item>
          <Nav.Item eventKey="5">
            <a href="/page/moment-timezone">Moment Timezone Playground</a>
          </Nav.Item>
          <Nav.Item eventKey="6">
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
