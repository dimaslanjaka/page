import React from 'react';
import { LinkProps, Link as OriginalLink } from 'react-router-dom';
import { isValidHttpUrl, safelinkInstance } from '../utils';

interface LinkProperties extends React.ForwardRefExoticComponent<LinkProps & React.RefAttributes<HTMLAnchorElement>> {
  /** target url */
  href?: string;
  /** same as href */
  to?: string;
}

/**
 * React Safelink Converter
 * * Anonymize external links into page redirector
 */
export class Link extends React.Component<LinkProperties> {
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

    if (type === 'external') {
      return (
        <a {...props} href={result} target={type == 'external' ? '_blank' : '_self'} data-type={type}>
          {this.props.children}
        </a>
      );
    }

    return (
      <OriginalLink {...props} to={dest} target={type == 'external' ? '_blank' : '_self'} data-type={type}>
        {this.props.children}
      </OriginalLink>
    );
  }
}
