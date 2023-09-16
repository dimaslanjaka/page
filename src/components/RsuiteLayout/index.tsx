import React from 'react';
import { Container, Content, Footer, Header, Sidebar } from 'rsuite';
import { Loader } from '../Loader';
import { CustomNavbar } from '../Navbar';
import { MyFooter } from './Footer';
import { MySidebar } from './Sidebar';
import './theme.scss';

export class RSuiteLayout extends React.Component<Record<string, any>, Record<string, any>> {
  constructor(props: any) {
    super(props);
    this.state = {
      activeKey: null,
    };
  }

  render() {
    //const [activeKey, setActiveKey] = React.useState(null);

    return (
      <div className="RsuiteLayout">
        <Loader />
        <Container>
          <Header className="fixed-top">
            <CustomNavbar />
          </Header>
          <Container style={{ marginTop: '4em' }}>
            <Content>{this.props.children}</Content>
            <Sidebar>
              <MySidebar />
            </Sidebar>
          </Container>
          <Footer>
            <MyFooter />
          </Footer>
        </Container>
      </div>
    );
  }
}
