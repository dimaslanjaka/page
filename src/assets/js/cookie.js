/* eslint-disable @typescript-eslint/no-unused-vars */

function setCookie(name, value, days, path = '/') {
  var expires = '';
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=' + path + ';';
}

function createCookieMins(name, value, minutes, path = '/') {
  return new Promise(function (resolve) {
    if (minutes) {
      var date = new Date();
      date.setTime(date.getTime() + minutes * 60 * 1000);
      var expires = '; expires=' + date.toGMTString();
    } else {
      expires = '';
    }
    document.cookie = name + '=' + value + expires + '; path=' + path + ';';
    resolve(null);
  });
}

function getCookie(name) {
  var nameEQ = name + '=';
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

/**
 * get all cookies
 * @returns
 */
function getCookies() {
  const cookies = document.cookie
    .split(';')
    .reduce((ac, cv, _i) => Object.assign(ac, { [cv.split('=')[0].trim()]: cv.split('=')[1] }), {});

  const index = Object.keys(cookies).sort(function (a, b) {
    return a === b ? 0 : a < b ? -1 : 1;
  });
  // console.log(index);

  return cookies;
}

/**
 * remove cookie
 * @param {string} name
 * @returns
 */
function eraseCookie(name) {
  document.cookie = name + '=; Max-Age=-99999999;';
}

/**
 * remove cookie
 * @param {string} name
 * @returns
 */
function removeCookie(name) {
  return eraseCookie(name);
}

function deleteAllCookies() {
  var cookies = document.cookie.split(';');

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf('=');
    var name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }
}

/*if (typeof module === 'object' && 'exports' in module) {
  module.exports = { getCookie, removeCookie, eraseCookie, setCookie, createCookieMins };
}*/

module.exports = { getCookie, getCookies, removeCookie, eraseCookie, setCookie, createCookieMins, deleteAllCookies };
