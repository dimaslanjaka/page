import React from 'react';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';
import { Image } from './Image';

export function NavbarBasic() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary fixed-top mx-auto p-2">
      <Navbar.Brand href="#home">
        <Image
          src="//www.webmanajemen.com/favicon.ico"
          alt="Logo"
          width="30"
          height="30"
          className="d-inline-block align-text-top"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/page">Home</Nav.Link>
          <Nav.Link href="/page/google/login">Login</Nav.Link>
          <NavDropdown title="Tools" id="basic-nav-dropdown" style={{ width: '300px' }}>
            <NavDropdown.Item href="/page/cookies">Cookie Manager</NavDropdown.Item>
            <NavDropdown.Item href="/page/moment-timezone">Moment Timezone Playground</NavDropdown.Item>
            <NavDropdown.Item href="/page/bot-detect">Selenium Checker</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
