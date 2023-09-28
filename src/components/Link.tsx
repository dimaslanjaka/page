import React from 'react';
//
import { Link as OriginalLink } from 'react-router-dom';
import { isValidHttpUrl, safelinkInstance } from '../utils';

interface LinkProperties {
  [key: string]: any;
  /** target url */
  href?: string;
  /** same as href */
  to?: string;
  /** open in target tab */
  target?: string;
  /** class names */
  className?: string;
  /** link title */
  title?: string;
  /** rel */
  rel?: string;
}

/**
 * React Safelink Converter
 * * Anonymize external links into page redirector
 */
class Link extends React.Component<LinkProperties> {
  sf = safelinkInstance;
  constructor(props: LinkProperties) {
    super(props);
  }

  render() {
    const { href, to, ...props } = this.props;
    const dest = href || to;
    let result = dest;
    let type = 'internal';
    if (typeof dest === 'string') {
      if (isValidHttpUrl(dest)) {
        result = this.sf.parseUrl(dest);
        if (result === dest) {
          type = 'internal';
        } else {
          type = 'external';
        }
      }
    }

    let render: JSX.Element;

    if (type === 'external') {
      render = (
        <a {...props} href={result} target="_blank">
          {this.props.children}
        </a>
      );
    } else {
      render = (
        <OriginalLink {...props} to={dest}>
          {this.props.children}
        </OriginalLink>
      );
    }

    return render;
  }
}

export default Link;
