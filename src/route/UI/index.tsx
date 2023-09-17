// UI dump and tester

import * as React from 'react';
import { Button, Col, Container, Grid, Row } from 'rsuite';

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class UI extends React.Component<Record<string, never>, Record<string, never>> {
  componentDidMount(): void {
    require('./ui.scss');
  }

  render() {
    return (
      <Container className="myUi">
        <Grid>
          <h1>Hello world</h1>
          <Button appearance="default" size="lg">
            React Suite
          </Button>
        </Grid>
        <Grid fluid>
          <Row className="show-grid">
            <Col xs={24} sm={24} md={8}>
              xs={24} sm={24} md={8}
            </Col>
            <Col xs={24} sm={24} md={8}>
              xs={24} sm={24} md={8}
            </Col>
            <Col xs={24} sm={24} md={8}>
              xs={24} sm={24} md={8}
            </Col>
          </Row>

          <Row className="show-grid">
            <Col sm={24} md={8} lg={6}>
              sm={24} md={8}
            </Col>
            <Col sm={12} md={8} lg={12}>
              sm={12} md={6} lg={12}
            </Col>
            <Col sm={12} md={8} lg={6}>
              sm={12} md={8}
            </Col>
          </Row>

          <Row className="show-grid">
            <Col lg={6} xl={8} xxl={6}>
              lg={6} xl={8} xxl={6}
            </Col>
            <Col lg={12} xl={8} xxl={12}>
              lg={12} xl={6} xxl={12}
            </Col>
            <Col lg={6} xl={8} xxl={6}>
              lg={6} xl={8} xxl={6}
            </Col>
          </Row>
        </Grid>
      </Container>
    );
  }
}
