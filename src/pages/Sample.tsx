import React from 'react';
//

import HomeIcon from '@rsuite/icons/legacy/Home';
import { Nav } from 'rsuite';

const Navbar = ({ active, onSelect, ...props }) => {
  return (
    <Nav {...props} activeKey={active} onSelect={onSelect} style={{ marginBottom: 50 }}>
      <Nav.Item eventKey="home" icon={<HomeIcon />}>
        Home
      </Nav.Item>
      <Nav.Item eventKey="news">News</Nav.Item>
      <Nav.Item eventKey="solutions">Solutions</Nav.Item>
      <Nav.Item eventKey="products">Products</Nav.Item>
      <Nav.Item eventKey="about">About</Nav.Item>
    </Nav>
  );
};

export function Tabs() {
  const [active, setActive] = React.useState('home');

  return (
    <>
      <Navbar active={active} onSelect={setActive} />
      <Navbar appearance="tabs" active={active} onSelect={setActive} />
      <Navbar appearance="tabs" reversed active={active} onSelect={setActive} />
      <Navbar appearance="subtle" active={active} onSelect={setActive} />
      <Navbar appearance="subtle" reversed active={active} onSelect={setActive} />
    </>
  );
}
