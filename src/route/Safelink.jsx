import React from 'react';
import './Safelink.scss';
import { delay, parse_query, parse_url, safelinkInstance } from '../utils/utils';
import { createCookieMins, getCookie } from '../assets/js/cookie';
import { SafelinkContents } from '../components/SafelinkContents';

export class Safelink extends React.Component {
  componentDidMount() {
    // check google translate
    const queryURL = parse_query('url') || parse_query('o') || parse_query('u');
    const safelinkURL = 'https://www.webmanajemen.com/page/safelink.html';
    const origin = queryURL ? safelinkURL + '?url=' + queryURL : safelinkURL;
    console.log(origin);
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
    decodeStart();
  }

  render() {
    return (
      <main>
        <section id="main-content">
          <div id="ads-left">
            {/*<!-- vertikal kiri -->*/}
            <ins
              className="adsbygoogle"
              style={{ display: 'block' }}
              data-ad-client="ca-pub-2188063137129806"
              data-ad-slot="2450061646"
              data-ad-format="auto"
              data-full-width-responsive="true"
            ></ins>
          </div>
          <SafelinkContents />
          <div id="ads-right">
            {/*<!-- vertikal kanan -->*/}
            <ins
              className="adsbygoogle"
              style={{ display: 'block' }}
              data-ad-client="ca-pub-2188063137129806"
              data-ad-slot="1136979979"
              data-ad-format="auto"
              data-full-width-responsive="true"
            ></ins>
          </div>
        </section>
      </main>
    );
  }
}

/**
 * start decoding safelink
 * @returns
 */
function decodeStart() {
  const parse_safelink = safelinkInstance.resolveQueryUrl(location.href);
  if (parse_safelink) {
    const value_from_query = parse_safelink.url || parse_safelink.o || parse_safelink.u;
    if (value_from_query) {
      /**
       * @type {import('safelinkify').Nullable<string>}
       */
      let value_cookie = value_from_query.aes.decode || value_from_query.base64.decode;

      // set cookie value and refresh without parameters
      if (value_cookie) {
        // eslint-disable-next-line no-undef
        createCookieMins('safelink_value', value_cookie, 5, location.pathname).then(refreshWithoutParam);
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

async function replaceGoButton(url) {
  const go = document.querySelector('#go');
  go.setAttribute('disabled', 'true');
  go.textContent = 'Please Wait';
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

/**
 * Replace elements with new
 * @param {HTMLElement} newElement
 * @param {HTMLElement} oldElement
 */
function replaceWith(newElement, oldElement) {
  if (!oldElement.parentNode) {
    console.log(oldElement, 'parent null');
    let d = document.createElement('div');
    d.appendChild(oldElement);
  } else {
    //log(oldElement.parentNode.tagName);
    oldElement.parentNode.replaceChild(newElement, oldElement);
  }
}
