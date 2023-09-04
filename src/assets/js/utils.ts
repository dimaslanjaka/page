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
    script.src = url.replace(/(^\w+:|^)/, window.location.protocol);
    //console.log({ src: script.src });
    script.async = true;
    script.defer = true;
    script.setAttribute('crossorigin', 'anonymous');
    script.onload = () => resolve(onload);
    script.onerror = err => reject(err);
    document.head.appendChild(script);
  });
}
