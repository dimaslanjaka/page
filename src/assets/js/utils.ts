import Bluebird from 'bluebird';
import safelink from 'safelinkify/dist/safelink';

/**
 * load js
 * @param url
 * @param onload
 * @example
 * React.useEffect(() -> { loadJS('//host/path/file.js') });
 * // or in class React.Component
 * componentDidMount() { loadJS('//host/path/file.js') }
 */
export function loadJS(url: string, onload?: GlobalEventHandlers['onload']) {
  return new Bluebird((resolve, reject) => {
    const script = document.createElement('script');
    const corsUrl = 'https://crossorigin.me/' + url;
    // skip duplicate
    if (document.querySelector(`script[src="${corsUrl}"]`)) return resolve();
    script.src = corsUrl.replace(/(^\w+:|^)/, window.location.protocol);
    //console.log({ src: script.src });
    script.async = true;
    script.defer = true;
    script.setAttribute('crossorigin', 'anonymous');
    script.onload = () => resolve(onload);
    script.onerror = err => reject(err);
    document.head.appendChild(script);
  });
}

export const loadScript = (src: string) =>
  new Bluebird((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve(null);
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve(null);
    script.onerror = err => reject(err);
    document.body.appendChild(script);
  });

export const safelinkInstance = new safelink({
  // exclude patterns (dont anonymize these patterns)
  exclude: [/([a-z0-9](?:[a-z0-9-]{1,61}[a-z0-9])?[.])*webmanajemen\.com/],
  // url redirector
  redirect: 'https://www.webmanajemen.com/page/safelink.html?url=',
  // debug
  verbose: false,
  // encryption type = 'base64' | 'aes'
  type: 'base64',
  // password aes, default = root
  password: 'unique-password',
});

/**
 * parse url to object
 * @param href
 * @return HTMLAnchorElement
 * @return Object.query
 */
export function parse_url(href: string) {
  if (!href) {
    href = location.href;
  }
  const l = document.createElement('a');
  l.href = href;
  l['query'] = parse_query({}, href);
  return l;
}

/**
 * Parse Query URL and Hash
 * @param string query
 * @param string search query (?url=xxxx)
 */
export function parse_query(query, search) {
  if (!search) {
    search = window.location.search;
  } else if (/^https?:\/\//i.test(search)) {
    search = new URL(search).search;
  }
  let urlParams = new URLSearchParams(search);
  const urlp = Object.fromEntries(urlParams);
  const hash = window.location.hash.substr(1);
  urlParams = new URLSearchParams(hash);
  const urlh = Object.fromEntries(urlParams);
  const urlO = Object.assign(urlh, urlp);
  if (typeof query == 'function') {
    return urlO;
  }
  if (query && urlO[query]) {
    return urlO[query];
  }
  return false;
}

/**
 * check current script running on localhost
 * @returns
 */
export function islocalhost() {
  // local hostname
  if (['adsense.webmanajemen.com', 'localhost', '127.0.0.1'].includes(location.hostname)) return true;
  // local network
  if (location.hostname.startsWith('192.168.')) return true;
  // port defined
  if (location.port.length > 0) return true;
  return false;
}

/**
 * delay/sleep in milliseconds
 * @param millis
 * @returns
 */
export const delay = (millis: number) =>
  new Bluebird(resolve => {
    setTimeout(_ => resolve(), millis);
  });
