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
