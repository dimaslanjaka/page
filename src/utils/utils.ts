import Bluebird from 'bluebird';
import safelink from 'safelinkify/dist/safelink';

export interface LoadJSOpt {
  proxy?: boolean;
  async?: boolean;
  defer?: boolean;
  onload?: GlobalEventHandlers['onload'];
  onerror?: GlobalEventHandlers['onerror'];
  crossOrigin?: string;
}

/**
 * load js with prevent duplicated ability
 * @param url
 * @param onload
 * @example
 * React.useEffect(() -> { loadJS('//host/path/file.js') });
 * // or in class React.Component
 * componentDidMount() { loadJS('//host/path/file.js') }
 */
export function loadJS(url: string, props: LoadJSOpt) {
  return new Bluebird((resolve, reject) => {
    const script = document.createElement('script');
    // fix dynamic protocol source
    if (url.startsWith('//')) url = window.location.protocol + url;
    // proxying when enabled
    if (url.startsWith('http') && props.proxy) url = 'https://crossorigin.me/' + url;
    // skip duplicate
    const existingSources = Array.from(document.scripts)
      .map(el => stripProtocol(el.src))
      .filter(source => source === stripProtocol(url));
    if (existingSources.length > 0) return resolve(props.onload?.call(null));
    if (document.querySelector(`script[src="${url}"]`)) return resolve(props.onload?.call(null));
    script.src = url.replace(/(^\w+:|^)/, window.location.protocol);
    script.async = props.async || false;
    script.defer = props.defer || false;
    script.crossOrigin = props.crossOrigin || 'anonymous';
    script.onload = () => resolve(props.onload?.call(null));
    script.onerror = err => reject(props.onerror?.call(null) || err);
    document.body.appendChild(script);
  });
}

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
 * remove protocol (https?) from url
 * @param url
 * @returns
 */
export function stripProtocol(url: string) {
  return url.replace(/(^\w+:|^)\/\//, '');
}

/**
 * Parse Query URL and Hash
 * @param string query
 * @param string search query (?url=xxxx)
 */
export function parse_query(query: string | Record<string, any>, search: string) {
  if (!search) {
    search = window.location.search;
  } else if (/^https?:\/\//i.test(search)) {
    search = new URL(search).search;
  }
  let urlParams = new URLSearchParams(search);
  const urlp = Object.fromEntries(urlParams);
  const hash = window.location.hash.substring(1);
  urlParams = new URLSearchParams(hash);
  const urlh = Object.fromEntries(urlParams);
  const urlO = Object.assign(urlh, urlp);
  if (typeof query == 'function') {
    return urlO;
  }
  if (typeof query === 'string' && urlO[query]) {
    return urlO[query];
  }
  return undefined;
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
