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
  path: string | string,
  domain: string,
  secure: boolean,
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

export function createCookieMins(name: string, value: string, minutes: number, path = '/') {
  return new Promise(function (resolve) {
    let expires: string;
    if (minutes) {
      const date = new Date();
      date.setTime(date.getTime() + minutes * 60 * 1000);
      expires = '; expires=' + date.toUTCString();
    } else {
      expires = '';
    }
    document.cookie = name + '=' + value + expires + '; path=' + path + ';';
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

/**
 * get all cookies
 * @returns
 */
export function getCookies() {
  const cookies = document.cookie
    .split(';')
    .reduce((ac, cv, _i) => Object.assign(ac, { [cv.split('=')[0].trim()]: cv.split('=')[1] }), {});

  const index = Object.keys(cookies).sort(function (a, b) {
    return a === b ? 0 : a < b ? -1 : 1;
  });
  console.log({ index });

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

/*if (typeof module === 'object' && 'exports' in module) {
  module.exports = { getCookie, removeCookie, eraseCookie, setCookie, createCookieMins };
}*/

//module.exports = { getCookie, getCookies, removeCookie, eraseCookie, setCookie, createCookieMins, deleteAllCookies };
