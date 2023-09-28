import Bluebird from 'bluebird';
import * as safelinkify from 'safelinkify';

/** md5 encoder */
export const md5 = (str: string) => CryptoJS.MD5(str).toString();

/**
 * remove duplicate array items
 * @param arr
 * @returns
 */
export function arrayDedupe<T extends any[]>(arr: T): T[] {
  return arr.filter(function (value, index, array) {
    return array.indexOf(value) === index;
  });
}

/**
 * generate random string
 * @param len length
 * @returns
 */
export const randomStr = (len = 8) =>
  Math.random()
    .toString(36)
    .substring(2, len + 2);

/**
 * No Operations
 * @param _
 */
export const noop = (..._: any[]) => {
  //
};

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
export function loadJS(url: string, props?: LoadJSOpt) {
  props = Object.assign(
    {
      proxy: false,
      onload: noop,
      onerror: noop
    },
    props || {}
  );

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

/**
 * load external css
 * @param url
 */
export function loadCSS(url: string) {
  const head = document.getElementsByTagName('head')[0];
  const link = document.createElement('link');
  link.id = 'css-' + randomStr(4);
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = url;
  link.media = 'all';
  head.appendChild(link);
}

export const safelinkInstance = new safelinkify.safelink({
  // exclude patterns (dont anonymize these patterns)
  exclude: [/([a-z0-9](?:[a-z0-9-]{1,61}[a-z0-9])?[.])*webmanajemen\.com/],
  // url redirector
  redirect: 'https://www.webmanajemen.com/page/safelink.html?url=',
  // debug
  verbose: false,
  // encryption type = 'base64' | 'aes'
  type: 'base64',
  // password aes, default = root
  password: 'unique-password'
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
export function parse_query(query: string | Record<string, any>, search?: string) {
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
 * check current script running on localhost (localhost, 127.0.0.1, 192.168.*)
 * * not local domains
 * @returns
 */
export function islocalhost() {
  // local hostname
  //if (['adsense.webmanajemen.com', 'localhost', '127.0.0.1'].includes(location.hostname)) return true;
  // local network
  if (location.hostname.startsWith('192.168.')) return true;
  // port defined
  //if (location.port.length > 0) return true;
  // pattern regex
  if (/(localhost|127.0.0.1|192.168.[0-9]{1,3}\.[0-9]{1,3}):?/gim.test(window.location.host)) return true;
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

export type InstanceHtml = HTMLElement | Element;

/**
 * Replace elements with new
 * @param newElement
 * @param oldElement
 */
export function replaceWith(newElement: InstanceHtml, oldElement: InstanceHtml) {
  if (!oldElement.parentNode) {
    console.log(oldElement, 'parent null');
    const d = document.createElement('div');
    d.appendChild(oldElement);
  } else {
    //log(oldElement.parentNode.tagName);
    oldElement.parentNode.replaceChild(newElement, oldElement);
  }
}

/**
 * insert next other
 * @param newNode
 * @param referenceNode insert after this element
 */
export function insertAfter(newNode: InstanceHtml, referenceNode: InstanceHtml | undefined) {
  if (referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  }
}

/**
 * shuffle array
 * @param arr
 * @returns
 */
export function array_shuffle<T extends any[]>(arr: T) {
  return arr.sort(function () {
    // shuffle
    return 0.5 - Math.random();
  });
}

/**
 * validate url
 * @param str
 * @returns
 */
export function isValidHttpUrl(str: string) {
  let url: URL;

  try {
    url = new URL(str);
  } catch (_) {
    return false;
  }

  return url.protocol === 'http:' || url.protocol === 'https:';
}
