// UI dump and tester

import React from 'react';
//import { Button, Col, Container, Grid, Row } from 'rsuite';

const Button = React.lazy(() => import('rsuite/esm/Button'));
const Container = React.lazy(() => import('rsuite/esm/Container'));
const Row = React.lazy(() => import('rsuite/esm/Row'));
const Grid = React.lazy(() => import('rsuite/esm/Grid'));
const Col = React.lazy(() => import('rsuite/esm/Col'));
const Notification = React.lazy(() => import('rsuite/esm/Notification'));
const Panel = React.lazy(() => import('rsuite/esm/Panel'));
const Avatar = React.lazy(() => import('rsuite/esm/Avatar'));
const AvatarGroup = React.lazy(() => import('rsuite/esm/AvatarGroup'));
const Loader = React.lazy(() => import('rsuite/esm/Loader'));
const ButtonToolbar = React.lazy(() => import('rsuite/esm/ButtonToolbar'));
const Badge = React.lazy(() => import('rsuite/esm/Badge'));
const Divider = React.lazy(() => import('rsuite/esm/Divider'));
//const Placeholder = React.lazy(() => import('rsuite/esm/Placeholder'));
const PlaceholderParagraph = React.lazy(() => import('rsuite/esm/Placeholder/PlaceholderParagraph')); // Placeholder.Paragraph
const Link = React.lazy(() => import('@components/Link'));
const Image = React.lazy(() => import('@components/Image'));

/**
 * check if the component still mounted
 */
export const useIsMounted = () => {
  const mountedRef = React.useRef(false);
  const isMounted = React.useCallback(() => mountedRef.current, []);

  React.useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  });

  return isMounted;
};

interface State {
  [key: string]: any;
  toasterReady: boolean;
  isMounted: boolean;
}

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
class UI extends React.Component<Record<string, never>, State> {
  toaster: ReturnType<(typeof import('rsuite'))['useToaster']>;
  constructor(props: any) {
    super(props);
    this.state = {
      toasterReady: false,
      isMounted: false
    };
  }

  componentDidMount(): void {
    document.title = 'React Suite Components';
    require('./ui.scss');
    this.setState({ isMounted: true });
    import('rsuite').then(loaded => {
      this.setState({ toasterReady: true });
      this.toaster = loaded.toaster;
    });
  }

  componentWillUnmount(): void {
    this.setState({ isMounted: false, toasterReady: false });
  }

  pushToast() {
    const ready = this.state.toasterReady;
    const isMounted = this.state.isMounted;
    if (!isMounted || !ready || !this.toaster) return;
    this.toaster.push(
      <Notification closable type="info" header="Informational">
        <PlaceholderParagraph style={{ width: 320 }} rows={3} />
      </Notification>,
      { placement: 'topStart' }
    );
  }

  render() {
    const Heading = (props: any) => (
      <React.Suspense fallback={<div>Header loading</div>}>
        <Divider />
        <b>{props.children}</b>
        <Divider />
      </React.Suspense>
    );
    return (
      <Container className="myUi">
        <h1 className="text-center">
          <Link href="#">React Suite Component</Link>
        </h1>
        <b>button</b>
        <ButtonToolbar>
          <Button color="red" appearance="primary">
            Red
          </Button>
          <Button color="orange" appearance="primary">
            Orange
          </Button>
          <Button color="yellow" appearance="primary">
            Yellow
          </Button>
          <Button color="green" appearance="primary">
            Green
          </Button>
          <Button color="cyan" appearance="primary">
            Cyan
          </Button>
          <Button color="blue" appearance="primary">
            Blue
          </Button>
          <Button color="violet" appearance="primary">
            Violet
          </Button>
        </ButtonToolbar>
        <ButtonToolbar>
          <Button color="red" appearance="subtle">
            Red
          </Button>
          <Button color="orange" appearance="subtle">
            Orange
          </Button>
          <Button color="yellow" appearance="subtle">
            Yellow
          </Button>
          <Button color="green" appearance="subtle">
            Green
          </Button>
          <Button color="cyan" appearance="subtle">
            Cyan
          </Button>
          <Button color="blue" appearance="subtle">
            Blue
          </Button>
          <Button color="violet" appearance="subtle">
            Violet
          </Button>
        </ButtonToolbar>

        <ButtonToolbar style={{ background: '#000', padding: 10 }}>
          <Button color="red" appearance="ghost">
            Red
          </Button>
          <Button color="orange" appearance="ghost">
            Orange
          </Button>
          <Button color="yellow" appearance="ghost">
            Yellow
          </Button>
          <Button color="green" appearance="ghost">
            Green
          </Button>
          <Button color="cyan" appearance="ghost">
            Cyan
          </Button>
          <Button color="blue" appearance="ghost">
            Blue
          </Button>
          <Button color="violet" appearance="ghost">
            Violet
          </Button>
        </ButtonToolbar>
        <Heading>grid</Heading>
        <Grid>
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
        <Heading>panel</Heading>
        <Panel header="Panel title" bordered>
          <PlaceholderParagraph />
        </Panel>
        <Heading>avatar</Heading>
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
        <Heading>loader</Heading>
        <div className="position-relative">
          <PlaceholderParagraph rows={8} />
          <Loader center content="loading" />
        </div>
        <Heading>Notification</Heading>
        <Notification closable type="info" header="Informational">
          <PlaceholderParagraph style={{ width: 320 }} rows={3} />
        </Notification>
        <Button onClick={this.pushToast.bind(this)}>Push</Button>
      </Container>
    );
  }
}

export default UI;
