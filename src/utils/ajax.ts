import Axios from 'axios';
import { buildWebStorage, setupCache } from 'axios-cache-interceptor';

export { Axios as axiosWithoutCache };

export const axiosWithCache = {
  /** Axios cache with credentials included */
  withCredentials: setupCache(
    Axios.create({
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Access-Control-Allow-Origin': '*',
        // 'Content-Type': 'application/json',
        Origin: window.location.origin
      },
      withCredentials: true
    }),
    { storage: buildWebStorage(localStorage, 'axios-cache:') }
  ),
  /** Axios cache without credentials included */
  withoutCredentials: setupCache(
    Axios.create({
      withCredentials: false
    }),
    { storage: buildWebStorage(localStorage, 'axios-cache:') }
  )
};

/**
 * Axios cache builder
 * @param axiosOption
 */
export function axiosCache(
  axiosOptions: Parameters<(typeof Axios)['create']>[0],
  cacheOptions: Parameters<typeof setupCache>[1] = {}
) {
  return setupCache(Axios.create(axiosOptions), cacheOptions);
}

export interface FetchCacheOptions extends RequestInit {
  seconds?: number;
}

/**
 * fetch with cache ability
 * @link {@url https://github.com/abhishekasana/jsDevelopCell/blob/master/cached_fetch.js}
 * @param url
 * @param options
 * @returns
 */
export const fetchWithCache = async (url: string, options: FetchCacheOptions = {}) => {
  let expiry = 5 * 60; // 5 min default
  if (typeof options === 'number') {
    expiry = options;
    options = undefined;
  } else if (typeof options === 'object') {
    // I hope you didn't set it to 0 seconds
    expiry = options.seconds || expiry;
  }
  // Use the URL as the cache key to sessionStorage
  const cacheKey = url;
  const cached = localStorage.getItem(cacheKey);
  const whenCached = parseInt(localStorage.getItem(cacheKey + ':ts'));
  if (cached !== null && whenCached !== null) {
    // it was in sessionStorage! Yay!
    // Even though 'whenCached' is a string, this operation
    // works because the minus sign converts the
    // string to an integer and it will work.
    const age = (Date.now() - whenCached) / 1000;
    if (age < expiry) {
      const response = new Response(new Blob([cached]));
      return Promise.resolve(response);
    } else {
      // We need to clean up this old key
      localStorage.removeItem(cacheKey);
      localStorage.removeItem(cacheKey + ':ts');
    }
  }

  const response = await fetch(url, options);
  // let's only store in cache if the content-type is
  // JSON or something non-binary
  if (response.status === 200) {
    const ct = response.headers.get('Content-Type');
    if (ct && (ct.match(/application\/json/i) || ct.match(/text\//i))) {
      // There is a .json() instead of .text() but
      // we're going to store it in sessionStorage as
      // string anyway.
      // If we don't clone the response, it will be
      // consumed by the time it's returned. This
      // way we're being un-intrusive.
      response
        .clone()
        .text()
        .then(content => {
          localStorage.setItem(cacheKey, content);
          localStorage.setItem(cacheKey + ':ts', String(Date.now()));
        });
    }
  }
  return response;
};
