import {
  delay,
  getCookie,
  loadCSS,
  parse_query,
  parse_url,
  querySelector,
  replaceWith,
  safelinkInstance,
  setCookieMins,
  waitUntilPageFullyLoaded
} from '@utils/index';
import React from 'react';
import SafelinkLayout2 from './layout2';

// const SafelinkLayout2 = React.lazy(() => import('./layout2'));

class Safelink extends React.Component {
  componentDidMount() {
    loadCSS('//cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css');

    // check google translate
    const queryURL = parse_query('url') || parse_query('o') || parse_query('u');
    const safelinkURL = 'https://www.webmanajemen.com/page/safelink.html';
    const origin = queryURL ? safelinkURL + '?url=' + queryURL : safelinkURL;
    // redirect when in translate google
    if (location.host == 'translate.googleusercontent.com' || location.host.endsWith('translate.goog')) {
      location.href = origin;
    }

    // scroll to top by default
    setTimeout(() => {
      window.scrollTo(0, 0);
      setTimeout(() => {
        window.scrollTo(0, document.body.scrollHeight / 2);
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 800);
      }, 800);
    }, 800);

    // decoding
    waitUntilPageFullyLoaded(decodeStart);
  }

  render() {
    return <SafelinkLayout2 />;
  }
}

export default Safelink;

/**
 * start decoding safelink
 * @returns
 */
function decodeStart() {
  const parse_safelink = safelinkInstance.resolveQueryUrl(location.href);
  if (parse_safelink) {
    const value_from_query = parse_safelink.url || parse_safelink.o || parse_safelink.u;
    if (value_from_query) {
      const value_cookie = value_from_query.aes.decode || value_from_query.base64.decode;

      // set cookie value and refresh without parameters
      if (value_cookie) {
        // eslint-disable-next-line no-undef
        setCookieMins('safelink_value', value_cookie, 5, location.pathname).then(refreshWithoutParam);
      } else {
        try {
          // check if query is url
          const parse = new URL(value_from_query.value);
          // redirecto to url
          location.href = parse.toString();
        } catch {
          // the query is not valid url
          console.log('cannot decode', value_from_query.value);
        }
      }
    }
  } else {
    // get safelink value from cookie
    // eslint-disable-next-line no-undef
    const value = getCookie('safelink_value');
    replaceGoButton(value);
  }
}

function refreshWithoutParam() {
  location.href = location.pathname;
}

async function replaceGoButton(url: string) {
  const go = querySelector('#go');
  if (go instanceof Element) {
    go.setAttribute('disabled', 'true');
    go.textContent = 'Please Wait';
    // wait 10 seconds
    await delay(10000);
    const a = document.createElement('a');
    a.href = url;
    a.rel = 'nofollow noopener noreferer';
    a.target = '_blank';
    a.classList.add('btn', 'btn-sm', 'btn-success', 'text-decoration-none');
    const parse_redirect = parse_url(url);
    a.textContent = 'goto ' + parse_redirect.host;
    replaceWith(a, go);
  }
}
