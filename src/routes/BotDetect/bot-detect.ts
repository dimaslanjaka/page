/*console.clear();*/

import { axiosWithCache, axiosWithoutCache, fetchWithCache } from '@utils/ajax';
import { getCookies, getElementById } from '@utils/index';

export const runBotDetectionMain = () => {
  const logdiv = getElementById('selenium');
  let proxyInfo = getElementById('sel-proxyInfo');
  isSelenium()
    .then(result => {
      logdiv.innerHTML = String(result);
    })
    .then(() => {
      if (!proxyInfo) proxyInfo = getElementById('sel-proxyInfo');
      if (typeof fetch != 'undefined') {
        const trace = () =>
          fetchWithCache('//www.cloudflare.com/cdn-cgi/trace').then(response => {
            response.text().then(function (response) {
              const data = response
                .trim()
                .split('\n')
                .reduce(function (obj, pair) {
                  const splitPair = pair.split('=');
                  return (obj[splitPair[0]] = splitPair[1]), obj;
                }, {}) as Record<string, any>;
              //console.log(data);
              getElementById('sel-ip').textContent = data.ip;
              getElementById('sel-ua').textContent = data.uag;
              getElementById('sel-country').textContent = data.loc;
              getElementById('sel-warp').textContent = data.warp.toUpperCase();
              getElementById('sel-rbi').textContent = data.rbi.toUpperCase();
              getElementById('sel-gateway').textContent = data.gateway.toUpperCase();
            });
          });
        const tableCon = getElementById('con-headers').querySelector('tbody');
        const fetchHeaders = () =>
          fetchWithCache('//httpbin.org/headers')
            .then(response => response.json())
            .then(data => {
              //console.log(data.headers);
              const headers = [
                'HTTP_VIA',
                'HTTP_X_FORWARDED_FOR',
                'HTTP_FORWARDED_FOR',
                'HTTP_X_FORWARDED',
                'HTTP_FORWARDED',
                'HTTP_CLIENT_IP',
                'HTTP_FORWARDED_FOR_IP',
                'VIA',
                'X_FORWARDED_FOR',
                'FORWARDED_FOR',
                'X_FORWARDED',
                'FORWARDED',
                'CLIENT_IP',
                'FORWARDED_FOR_IP',
                'HTTP_PROXY_CONNECTION'
              ];
              headers.forEach(function (header) {
                // proxy detection
                const isProxy = header in data.headers;
                if (!isProxy) {
                  proxyInfo.innerHTML = 'No Proxy';
                } else {
                  proxyInfo.innerHTML += (data.headers[header] || '') + '<br/>';
                }
              });

              for (const key in data.headers) {
                // skip headers
                if (['host'].includes(key.toLowerCase())) continue;
                // print header
                if (Object.hasOwnProperty.call(data.headers, key)) {
                  const value = data.headers[key];
                  const tr = document.createElement('tr');
                  const hkey = document.createElement('td');
                  const hval = document.createElement('td');
                  hkey.textContent = key;
                  hval.textContent = value;
                  const hasVpnHeaders = ['X-Amzn-Trace-Id'].map(str => str.toLowerCase()).includes(key.toLowerCase());
                  if (hasVpnHeaders) {
                    hkey.classList.add('text-danger');
                    hval.classList.add('text-danger');
                    tr.classList.add('border', 'border-danger');
                    tr.setAttribute('title', 'your connection contains external service');
                    const texts = [proxyInfo.textContent.replace('No Proxy', '').trim(), 'External Service ' + key]
                      // trim string
                      .map(str => str.trim())
                      // filter empty string
                      .filter(str => str.length > 0)
                      // remove duplicated string
                      .filter(function (value, index, array) {
                        return array.indexOf(value) === index;
                      });
                    proxyInfo.innerHTML = texts.join('<br/>');
                  }
                  tr.appendChild(hkey);
                  tr.appendChild(hval);
                  tableCon.appendChild(tr);
                }
              }
            });

        const fetchGeoIp = () =>
          fetchWithCache('http://ip-api.com/json/').then(response => {
            response.text().then(function (data) {
              try {
                const parse = JSON.parse(data);
                const mapText = { lat: 'Latitude', lon: 'Longitude', query: 'IP' };
                if ('status' in parse && parse.status == 'success') {
                  for (const key in parse) {
                    // skip keys
                    if (['status'].includes(key)) continue;
                    if (Object.hasOwnProperty.call(parse, key)) {
                      const value = parse[key];
                      const tr = document.createElement('tr');
                      const hkey = document.createElement('td');
                      const hval = document.createElement('td');

                      if (mapText[key]) {
                        hkey.textContent = mapText[key];
                        hkey.setAttribute('id', 'con-' + mapText[key].toLowerCase());
                      } else {
                        hkey.textContent = key;
                        hkey.setAttribute('id', 'con-' + key.toLowerCase());
                      }
                      hval.textContent = value;
                      tr.appendChild(hkey);
                      tr.appendChild(hval);
                      tableCon.appendChild(tr);
                    }
                  }
                }
              } catch (_e) {
                //
              }
            });
          });

        // execute
        trace().then(fetchHeaders).then(fetchGeoIp);
      }
    })
    .then(() => {
      runBotDetectionCookies();
      runBotDetectionNavigator();
    });
};

export type IpResult = {
  [key: string]: any;
  ip: string;
  uag: string;
  loc: string;
  warp: string;
  rbi: string;
  gateway: string;
};

export async function getIp(abortController: AbortController) {
  const response = await axiosWithoutCache('//www.cloudflare.com/cdn-cgi/trace', {
    method: 'GET',
    signal: abortController.signal
  });

  const data = String(response.data)
    .trim()
    .split('\n')
    .reduce(function (obj, pair) {
      const splitPair = pair.split('=');
      return (obj[splitPair[0]] = splitPair[1]), obj;
    }, {}) as IpResult;
  // console.log(data);
  data.warp = data.warp.toUpperCase();
  data.rbi = data.rbi.toUpperCase();
  data.gateway = data.gateway.toUpperCase();
  return data;
}

const headersResult = {
  proxy: false,
  headers: {} as Record<string, string>
};

export type headersResult = typeof headersResult;

export async function getHeaders(abortController: AbortController) {
  const response = await axiosWithoutCache('//httpbin.org/headers', { signal: abortController.signal });
  const { data } = response;
  // console.log('headers', data.headers);
  const headers = [
    'HTTP_VIA',
    'HTTP_X_FORWARDED_FOR',
    'HTTP_FORWARDED_FOR',
    'HTTP_X_FORWARDED',
    'HTTP_FORWARDED',
    'HTTP_CLIENT_IP',
    'HTTP_FORWARDED_FOR_IP',
    'VIA',
    'X_FORWARDED_FOR',
    'FORWARDED_FOR',
    'X_FORWARDED',
    'FORWARDED',
    'CLIENT_IP',
    'FORWARDED_FOR_IP',
    'HTTP_PROXY_CONNECTION'
  ];
  headers.forEach(function (header) {
    // proxy detection
    const isProxy = header in data.headers;
    headersResult.proxy = isProxy;
  });
  headersResult.headers = data.headers;
  return headersResult;
}

export interface GeoIpResult {
  status: string;
  country: string;
  countryCode: string;
  region: string;
  regionName: string;
  city: string;
  zip: string;
  lat: number;
  lon: number;
  timezone: string;
  isp: string;
  org: string;
  as: string;
  query: string;
}

export async function getGeoIp(ip?: string | AbortController, abortController?: AbortController) {
  const controller = ip instanceof AbortController ? ip : abortController;
  const response = await axiosWithCache.withoutCredentials(
    'http://ip-api.com/json/' + (typeof ip === 'string' ? ip : ''),
    {
      signal: controller?.signal
    }
  );
  // console.log('geo ip', JSON.stringify(data));
  return (response?.data || {}) as GeoIpResult;
}

/**
 * detect selenium
 * @returns
 */
export function isSelenium(): Promise<{ selenium: boolean }> {
  return new Promise(resolve => {
    const documentDetectionKeys = [
      '__webdriver_evaluate',
      '__selenium_evaluate',
      '__webdriver_script_function',
      '__webdriver_script_func',
      '__webdriver_script_fn',
      '__fxdriver_evaluate',
      '__driver_unwrapped',
      '__webdriver_unwrapped',
      '__driver_evaluate',
      '__selenium_unwrapped',
      '__fxdriver_unwrapped'
    ];
    const windowDetectionKeys = [
      '_phantom',
      '__nightmare',
      '_selenium',
      'callPhantom',
      'callSelenium',
      '_Selenium_IDE_Recorder'
    ];
    for (const windowDetectionKey in windowDetectionKeys) {
      const windowDetectionKeyValue = windowDetectionKeys[windowDetectionKey];
      if (window[windowDetectionKeyValue] || windowDetectionKeyValue in window) {
        return resolve({ selenium: true });
      }
    }
    for (const documentDetectionKey in documentDetectionKeys) {
      const documentDetectionKeyValue = documentDetectionKeys[documentDetectionKey];
      if (window['document'][documentDetectionKeyValue] || documentDetectionKeyValue in document) {
        return resolve({ selenium: true });
      }
    }
    for (const documentKey in window['document']) {
      if (documentKey.match(/\$[a-z]dc_/) && window['document'][documentKey]['cache_']) {
        return resolve({ selenium: true });
      }
    }
    if (
      window['external'] &&
      window['external'].toString() &&
      window['external'].toString()['indexOf']('Sequentum') !== -1
    )
      return resolve({ selenium: true });
    if (window['document']['documentElement']['getAttribute']('selenium')) return resolve({ selenium: true });
    if (window['document']['documentElement']['getAttribute']('webdriver')) return resolve({ selenium: true });
    if (window['document']['documentElement']['getAttribute']('driver')) return resolve({ selenium: true });
    if (window.document.documentElement.getAttribute('webdriver')) {
      return resolve({ selenium: true });
    }
    if ('callPhantom' in window || '_phantom' in window) {
      if (window.callPhantom || window._phantom) {
        return resolve({ selenium: true });
      }
    }
    if ('webdriver' in navigator) {
      if (navigator.webdriver == true) {
        return resolve({ selenium: true });
      }
    }
    if ('userAgentData' in navigator) {
      const udata = JSON.stringify(navigator.userAgentData);
      return resolve({ selenium: udata.includes('Not=A?Brand') });
    }
    return resolve({ selenium: false });
  });
}

/** Cookies **/
export function runBotDetectionCookies() {
  // document.querySelector('span#sid').textContent = getCurrentPageId();
  // getElementById('unique-id').textContent = getCurrentPageId();

  const tbl = document.querySelector('table#cookies');
  const tbody = tbl.querySelector('tbody');
  const gck = getCookies({ sort: true });
  for (const key in gck) {
    //console.log(key, gck[key]);
    const row = document.createElement('tr');
    let cell = document.createElement('td');
    let cellText = document.createTextNode(key);
    cell.appendChild(cellText);
    row.appendChild(cell);

    cell = document.createElement('td');
    cellText = document.createTextNode(gck[key]);
    cell.appendChild(cellText);
    row.appendChild(cell);
    tbody.appendChild(row);
  }
}

/** Navigator **/
export function runBotDetectionNavigator() {
  const tbln = document.querySelector('table#navigator');
  const tbodyn = tbln.querySelector('tbody');
  for (const key in navigator) {
    let value = navigator[key];
    if (typeof value === 'object') {
      value = '<pre>' + JSON.stringify(value, null, 2) + '</pre>';
    }
    const row = document.createElement('tr');
    let cell = document.createElement('td');
    let cellText = document.createTextNode(key);
    cell.appendChild(cellText);
    row.appendChild(cell);

    cell = document.createElement('td');
    cellText = document.createTextNode(value);
    //cell.appendChild(cellText);
    cell.innerHTML = value;
    row.appendChild(cell);
    tbodyn.appendChild(row);
  }
}

/** Stylesheet **/
// loadStyleSheet('//cdnjs.cloudflare.com/ajax/libs/bootstrap/5.0.2/css/bootstrap.min.css');
// load google analytics
// loadScript('//www.googletagmanager.com/gtag/js?id=UA-106238155-1').then(function () {
//   window.dataLayer = window.dataLayer || [];

//   function gtag() {
//     window.dataLayer.push(arguments);
//   }
//   gtag('js', new Date());
//   gtag('send', 'pageview');
//   gtag('config', 'UA-106238155-1', {
//     page_title: document.title,
//     page_path: location.pathname,
//     page_location: location.href,
//   });
//   gtag('config', 'G-BG75CLNJZ1', {
//     page_title: document.title,
//     page_path: location.pathname,
//     page_location: location.href,
//   });
// });

// to defer the loading of stylesheets
// just add it right before the </body> tag
// and before any javaScript file inclusion (for performance)
// function loadStyleSheet(src) {
//   if (document.createStyleSheet) document.createStyleSheet(src);
//   else {
//     var stylesheet = document.createElement('link');
//     stylesheet.href = src;
//     stylesheet.rel = 'stylesheet';
//     stylesheet.type = 'text/css';
//     document.getElementsByTagName('head')[0].appendChild(stylesheet);
//   }
// }

// function loadScript(src) {
//   return new Promise(resolve => {
//     const script = document.createElement('script');
//     script.src = src;
//     script.onload = resolve;
//     document.getElementsByTagName('head')[0].appendChild(script);
//   });
// }
