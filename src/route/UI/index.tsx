// UI dump and tester

import React from 'react';
//import { Button, Col, Container, Grid, Row } from 'rsuite';

const Button = React.lazy(() => import('rsuite/esm/Button'));
const Container = React.lazy(() => import('rsuite/esm/Container'));
const Row = React.lazy(() => import('rsuite/esm/Row'));
const Grid = React.lazy(() => import('rsuite/esm/Grid'));
const Col = React.lazy(() => import('rsuite/esm/Col'));
const Panel = React.lazy(() => import('rsuite/esm/Panel'));
const Avatar = React.lazy(() => import('rsuite/esm/Avatar'));
const AvatarGroup = React.lazy(() => import('rsuite/esm/AvatarGroup'));
const Loader = React.lazy(() => import('rsuite/esm/Loader'));
const Badge = React.lazy(() => import('rsuite/esm/Badge'));
//const Placeholder = React.lazy(() => import('rsuite/esm/Placeholder'));
const PlaceholderParagraph = React.lazy(() => import('rsuite/esm/Placeholder/PlaceholderParagraph')); // Placeholder.Paragraph
const Link = React.lazy(() => import('@components/Link'));
const Image = React.lazy(() => import('@components/Image'));

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
class UI extends React.Component<Record<string, never>, Record<string, never>> {
  componentDidMount(): void {
    require('./ui.scss');
  }

  render() {
    return (
      <Container className="myUi">
        <Grid>
          <h1>
            <Link href="#">Hello world</Link>
          </h1>
          <Button appearance="default" size="lg">
            React Suite
          </Button>
        </Grid>
        <b>grid</b>
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
        <b>panel</b>
        <Panel header="Panel title" bordered>
          <PlaceholderParagraph />
        </Panel>
        <b>avatar</b>
        <AvatarGroup spacing={6}>
          <Badge>
            <Avatar src="//avatars.githubusercontent.com/u/12592949" alt="@superman66" />
          </Badge>

          <Badge content="20">
            <Avatar src="//avatars.githubusercontent.com/u/8225666" alt="@SevenOutman" />
          </Badge>
        </AvatarGroup>
        <Image
          src="//raw.githubusercontent.com/dimaslanjaka/dimaslanjaka.github.io/4e6098df3f102e2bd36b33b9055644bccd4faac3/images/PicsArt_09-09-12.12.25%201584x512px.png"
          alt="@SevenOutman"
        />
        <b>loader</b>
        <div className="position-relative">
          <PlaceholderParagraph rows={8} />
          <Loader center content="loading" />
        </div>
      </Container>
    );
  }
}

export default UI;
