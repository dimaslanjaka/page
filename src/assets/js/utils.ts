import Bluebird from 'bluebird';

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