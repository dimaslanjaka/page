import React from 'react';
import { FlexboxGrid } from 'rsuite';
import { Image } from '../Image';
import { Link } from '../Link';

export function MyFooter() {
  return (
    <FlexboxGrid justify="space-between">
      <FlexboxGrid.Item style={{ marginLeft: '3em' }}>
        <a href="/page" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
          <Image
            src="https://rsuitejs.com/favicon.ico"
            width="16px"
            height="16px"
            style={{ verticalAlign: 'middle', marginRight: '3px' }}
          />
        </a>
        <span className="mb-3 mb-md-0 text-muted">© {new Date().getFullYear()} WMI, Inc</span>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item id="socmed">
        <FlexboxGrid justify="end" style={{ marginRight: '3em' }}>
          <FlexboxGrid.Item>
            <Link className="text-muted" href={`https://wa.me/+6285655667573?text=${encodeURI('Hi, Webmaster WMI')}`}>
              <i className="fa-brands fa-whatsapp"></i>
            </Link>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item>
            <Link className="text-muted" href="https://github.com/dimaslanjaka">
              <i className="fa-brands fa-github"></i>
            </Link>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item>
            <Link className="text-muted" href="https://fb.me/dimaslanjaka1">
              <i className="fa-brands fa-facebook"></i>
            </Link>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
}
