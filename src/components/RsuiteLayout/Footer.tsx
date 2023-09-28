import React from 'react';
import { FlexboxGrid } from 'rsuite';
import Image from '../Image';
import Link from '../Link';

const FlexboxGridItem = FlexboxGrid.Item;

// const FlexboxGrid = React.lazy(() => import('rsuite/esm/FlexboxGrid'));
// const FlexboxGridItem = React.lazy(() => import('rsuite/esm/FlexboxGrid/FlexboxGridItem'));
// const Image = React.lazy(() => import('../Image'));
// const Link = React.lazy(() => import('../Link'));

class MyFooter extends React.Component {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <FlexboxGrid justify="space-between">
        <FlexboxGridItem style={{ marginLeft: '3em' }}>
          <a href="/page" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
            <Image
              src="//rsuitejs.com/favicon.ico"
              width="16px"
              height="16px"
              style={{ verticalAlign: 'middle', marginRight: '3px', width: '16px', height: '16px' }}
            />
          </a>
          <span className="mb-3 mb-md-0 text-muted">© {new Date().getFullYear()} WMI, Inc</span>
        </FlexboxGridItem>
        <FlexboxGridItem id="socmed">
          <FlexboxGrid justify="end" style={{ marginRight: '3em' }}>
            <FlexboxGridItem>
              <Link className="text-muted" href={`https://wa.me/+6285655667573?text=${encodeURI('Hi, Webmaster WMI')}`}>
                <i className="fa-brands fa-whatsapp"></i>
              </Link>
            </FlexboxGridItem>
            <FlexboxGridItem>
              <Link className="text-muted" href="https://github.com/dimaslanjaka">
                <i className="fa-brands fa-github"></i>
              </Link>
            </FlexboxGridItem>
            <FlexboxGridItem>
              <Link className="text-muted" href="https://fb.me/dimaslanjaka1">
                <i className="fa-brands fa-facebook"></i>
              </Link>
            </FlexboxGridItem>
          </FlexboxGrid>
        </FlexboxGridItem>
      </FlexboxGrid>
    );
  }
}

export default MyFooter;
