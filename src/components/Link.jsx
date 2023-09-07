import React from 'react';
import { Link as OriginalLink } from 'react-router-dom';
import { safelinkInstance } from '../utils/utils';

/**
 * React Safelink Converter
 * * Anonymize external links into page redirector
 */
export class Link extends React.Component {
  sf = safelinkInstance;
  constructor(props) {
    super(props);
  }

  render() {
    const { href, to, ...props } = this.props;
    const dest = href || to;
    let result = dest;
    let type = 'internal';
    if (typeof dest === 'string') {
      if (this.isValidHttpUrl(dest)) {
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
        <a {...props} href={href} target={type == 'external' ? '_blank' : '_self'}>
          {this.props.children}
        </a>
      );
    }

    return (
      <OriginalLink {...props} to={dest} target={type == 'external' ? '_blank' : '_self'}>
        {this.props.children}
      </OriginalLink>
    );
  }

  isValidHttpUrl(string) {
    let url;

    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }

    return url.protocol === 'http:' || url.protocol === 'https:';
  }
}
