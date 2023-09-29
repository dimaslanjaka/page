/**
 * Create detailed cookie
 * @param name
 * @param value
 * @param expires expires in day
 * @param path set on spesific path
 * @param domain set on spesific domain
 * @param secure set secured cookie (https only)
 */
export function setCookie(
  name: string,
  value: string | number | boolean,
  expires: number,
  path?: string | string,
  domain?: string,
  secure?: boolean
) {
  let exp = '';
  if (expires) {
    const d = new Date();
    d.setTime(d.getTime() + parseInt(`${expires}`) * 24 * 60 * 60 * 1000); // days
    exp = '; expires=' + d.toUTCString(); // toGMTString | toUTCString
  }
  if (!path) {
    path = '/';
  }
  const cookie =
    name +
    '=' +
    encodeURIComponent(value) +
    exp +
    '; path=' +
    path +
    (domain ? '; domain=' + domain : '') +
    (secure ? '; secure' : '');
  document.cookie = cookie;
}

/**
 * Create detailed cookie in minutes
 * @param name
 * @param value
 * @param expires expires in minutes
 * @param path set on spesific path
 * @param domain set on spesific domain
 * @param secure set secured cookie (https only)
 */
export function setCookieMins(
  name: string,
  value: string,
  minutes = 10,
  path = '/',
  domain?: string,
  secure?: boolean
) {
  return new Promise(function (resolve) {
    let expires: string;
    if (minutes) {
      const date = new Date();
      date.setTime(date.getTime() + minutes * 60 * 1000);
      expires = '; expires=' + date.toUTCString();
    } else {
      expires = '';
    }
    // document.cookie = name + '=' + value + expires + '; path=' + path + ';';
    const cookie =
      name +
      '=' +
      encodeURIComponent(value) +
      expires +
      '; path=' +
      path +
      (domain ? '; domain=' + domain : '') +
      (secure ? '; secure' : '');
    // console.log(cookie);
    document.cookie = cookie;
    resolve(null);
  });
}

export function getCookie(name: string) {
  const nameEQ = name + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// export const createCookieExpires = ({ mins = 0, hours = 0, week = 0, month = 0 }) => {
//   return new Date(new Date().getTime() + mins * 60 * 1000);
// };

interface GetCookiesOptions {
  /** sort cookies by key? */
  sort: boolean;
  /** skip these keys from result */
  skipKey?: string[];
}

/**
 * get all cookies
 * @param sort sort cookies by key?
 * @returns
 */
export function getCookies(
  options: GetCookiesOptions = {
    sort: false
  }
): Record<string, any> {
  const { sort = false, skipKey = [] } = options;
  const pairs = document.cookie.split(';');
  const cookies = {};
  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i].split('=');
    cookies[(pair[0] + '').trim()] = unescape(pair.slice(1).join('='));
  }

  // delete keys from result
  if (skipKey.length > 0) {
    for (const key in cookies) {
      if (skipKey.includes(key)) delete cookies[key];
    }
  }

  // do sorting
  if (sort) {
    const sorted = {};

    const sortKeys = Object.keys(cookies).sort(function (a, b) {
      return a === b ? 0 : a < b ? -1 : 1;
    });
    sortKeys.forEach(key => {
      sorted[key] = cookies[key];
    });

    return sorted;
  }

  return cookies;
}

/**
 * remove cookie
 * @param name
 * @returns
 */
export function eraseCookie(name: string) {
  document.cookie = name + '=; Max-Age=-99999999;';
}

/**
 * remove cookie
 * @param name
 * @returns
 */
export function removeCookie(name: string) {
  return eraseCookie(name);
}

export function deleteAllCookies() {
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }
}

/**
 * get current unique page id by cookie
 * @returns
 */
export function getCurrentPageId() {
  if (!getCookie('___current_id')) {
    setCookie(
      '___current_id',
      Math.random()
        .toString(36)
        .substring(2, 7 + 2),
      1
    );
  }
  if (!window.pageId) window.pageId = getCookie('___current_id');
  return window.pageId;
}

/*if (typeof module === 'object' && 'exports' in module) {
  module.exports = { getCookie, removeCookie, eraseCookie, setCookie, setCookieMins };
}*/

//module.exports = { getCookie, getCookies, removeCookie, eraseCookie, setCookie, setCookieMins, deleteAllCookies };
