import React from 'react';
import { Link as OriginalLink } from 'react-router-dom';
import safelink from 'safelinkify/dist/safelink';

/**
 * React Safelink Converter
 * * Anonymize external links into page redirector
 */
export class Link extends React.Component {
  /** @type {safelink} */
  sf;
  constructor(props) {
    super(props);
    this.sf = new safelink({
      // exclude patterns (dont anonymize these patterns)
      exclude: [
        /https?:\/\/?(?:([^*]+)\.)?webmanajemen\.com/,
        /([a-z0-9](?:[a-z0-9-]{1,61}[a-z0-9])?[.])*webmanajemen\.com/,
      ],
      // url redirector
      redirect: 'https://www.webmanajemen.com/page/safelink?url=',
      // debug
      verbose: false,
      // encryption type = 'base64' | 'aes'
      type: 'base64',
      // password aes, default = root
      password: 'unique-password',
    });
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
