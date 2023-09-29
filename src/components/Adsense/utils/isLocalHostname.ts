/**
 * is local domains ?
 * * only works when `window.adsense_option.localhost` not empty
 * @returns
 */
export default function isLocalHostname() {
  const { localhost: localdomains = [] } = window.adsense_option || {};
  return localdomains.includes(window.location.hostname);
}
