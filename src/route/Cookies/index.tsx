import React from 'react';
//

import { Form } from 'rsuite';
import HighlightElement from 'src/components/Highlight.js';
import { getCookies } from 'src/utils';

interface State {
  allCookies: string;
}

class CookieManager extends React.Component<any, State> {
  _mounted = false;
  _interval: NodeJS.Timeout;
  _abortController: AbortController;
  _hljs: (typeof import('highlight.js'))['default'];
  _utils: typeof import('@utils/index');

  constructor(props: any) {
    super(props);
    this.state = {
      allCookies: '{}'
    };
  }

  componentDidMount(): void {
    require('./cookies.scss');
    this._mounted = true;
    this._abortController = new AbortController();
    import('bluebird').then(({ default: promise }) => {
      promise
        .all([
          import('highlight.js').then(({ default: hljs }) => {
            this._hljs = hljs;
          }),
          import('@utils/index').then(utils => {
            this._utils = utils;
          })
        ])
        .then(() => {
          // auto set for development
          // if (this._mounted) this.handleChanges('key', this._utils.randomStr(3));
        });
    });

    this._interval = setInterval(() => {
      if (this._mounted) {
        const allCookies = JSON.stringify(getCookies({ sort: true }), null, 2);
        if (this._hljs) {
          const codes = this._hljs.highlightAuto(allCookies, ['json']);
          // this.setState({ allCookies: codes.value });
          document.querySelector('#cookies-print code').innerHTML = codes.value;
        }
      }
    }, 1000);
  }

  componentWillUnmount(): void {
    this._mounted = false;
    if (this._interval) clearInterval(this._interval);
    if (this._abortController) this._abortController.abort();
  }

  render() {
    // const { allCookies } = this.state;
    const handleChanges = this.handleChanges.bind(this);
    return (
      <div>
        <div className="text-center">
          <h1>Cookie Management</h1>
        </div>
        <Form layout="horizontal" id="cookie-form">
          <Form.Group controlId="name-6">
            <Form.ControlLabel>Key</Form.ControlLabel>
            <Form.Control name="key" onChange={handleChanges} defaultValue="key" />
            <Form.HelpText tooltip>Cookie key</Form.HelpText>
          </Form.Group>
          <Form.Group controlId="email-6">
            <Form.ControlLabel>Value</Form.ControlLabel>
            <Form.Control name="val" onChange={handleChanges} defaultValue="val" />
            <Form.HelpText tooltip>Cookie value</Form.HelpText>
          </Form.Group>
        </Form>
        <div className="text-center">
          <h2>All Cookies</h2>
        </div>
        <HighlightElement id="cookies-print" lang="json"></HighlightElement>
      </div>
    );
  }

  handleChanges(ckey: string, cval: any) {
    const form = document.querySelector('#cookie-form') as HTMLFormElement;
    if (form && this._utils) {
      const formData = new FormData(form);
      let key = ckey,
        val = cval;
      if (typeof cval !== 'string') {
        for (const pair of formData.entries()) {
          if (String(pair[0]) === 'key') {
            key = String(pair[1]);
          } else if (String(pair[0]) === 'val') {
            val = String(pair[1]);
          }
        }
      }
      if (key.trim().length > 0 && val.trim().length > 0) {
        console.log('create cookie', key, val);
        const cookiekey = `cookieKey_${key}`;
        const cookieval = `cookieVal_${val}`;
        this._utils.setCookieMins(`cookieKey_${key}`, `cookieVal_${val}`, 7, location.pathname);
        // const formatCookie = cookiekey + '=' + cookieval + ';domain=' + location.host + ';path=/page';
        // console.log(formatCookie);
        // document.cookie = formatCookie;
        // [
        //   cookiekey + ` = ${this._utils.randomStr(3)}; path = /page`,
        //   `FNX = ${this._utils.randomStr(3)}; path = /page`
        // ].forEach(x => (document.cookie = String(x)));
        console.log(this._utils.getCookie(cookiekey) === cookieval);
      }
    }
  }
}

export default CookieManager;
