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
    this.state = {
      result: undefined,
      finish: false,
      type: 'internal',
    };
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
    this.parseLink = this.parseLink.bind(this);
  }

  parseLink() {
    const { href, to } = this.props;
    const dest = href || to;
    if (typeof dest === 'string') {
      if (this.isValidHttpUrl(dest)) {
        const result = this.sf.parseUrl(dest);
        //console.log('external url', dest, '->', result);
        this.setState({
          result: result,
          finish: true,
          type: 'external',
        });
      } else {
        //console.log('internal url', dest);
        this.setState({
          result: dest,
          finish: true,
          type: 'internal',
        });
      }
    }
  }

  render() {
    const { result, finish, type } = this.state;
    const { href, ...props } = this.props;

    if (!finish && !result) {
      this.parseLink();
      return (
        <a href={href} {...props}>
          {this.props.children}
        </a>
      );
    }

    return (
      <OriginalLink
        to={typeof result == 'string' && result.length > 0 ? result : href}
        {...props}
        target={type == 'external' ? '_blank' : '_self'}
      >
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
