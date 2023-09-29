(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
})((function () { 'use strict';

    /**
     * google analytics query collections
     *
     * source: [API v4 Explorer](https://developers.google.com/analytics/devguides/reporting/core/v4/rest/v4/reports/batchGet?apix_params=%7B%22resource%22%3A%7B%22reportRequests%22%3A%5B%7B%22dateRanges%22%3A%5B%7B%22startDate%22%3A%22today%22%2C%22endDate%22%3A%22today%22%7D%5D%2C%22dimensions%22%3A%5B%7B%22name%22%3A%22ga%3ApagePath%22%7D%5D%2C%22viewId%22%3A%22ga%3A159996509%22%2C%22metrics%22%3A%5B%7B%22expression%22%3A%22ga%3Apageviews%22%7D%5D%2C%22dimensionFilterClauses%22%3A%5B%7B%22filters%22%3A%5B%7B%22dimensionName%22%3A%22ga%3ApagePath%22%2C%22operator%22%3A%22EXACT%22%2C%22expressions%22%3A%5B%22%2Fchimeraland%2Findex.html%22%5D%7D%5D%7D%5D%7D%5D%7D%7D)
     *
     * explorer: [Metrics and dimensions explorer](https://ga-dev-tools.google/dimensions-metrics-explorer/)
     */
    var AnalyticsQueries = /** @class */ (function () {
        function AnalyticsQueries() {
        }
        /**
         * get all page views with the path
         * @param {{ [key:string]: any; startDate: string, endDate: string; viewId: string; }} param0
         * @returns
         */
        AnalyticsQueries.getAllPagePathsWithView = function (_a) {
            var _b = _a === void 0 ? {} : _a, _c = _b.startDate, startDate = _c === void 0 ? 'today' : _c, _d = _b.endDate, endDate = _d === void 0 ? 'today' : _d, _e = _b.viewId, viewId = _e === void 0 ? 'ga:159996509' : _e;
            return {
                dateRanges: [
                    {
                        startDate: startDate,
                        endDate: endDate,
                    },
                ],
                dimensions: [
                    {
                        name: 'ga:pagePath',
                    },
                ],
                viewId: viewId,
                metrics: [
                    {
                        expression: 'ga:pageviews',
                    },
                ],
            };
        };
        /**
         * get page views by path
         * @param value
         * @returns
         */
        AnalyticsQueries.byPath = function (_a) {
            var _b = _a === void 0 ? {} : _a, _c = _b.startDate, startDate = _c === void 0 ? 'today' : _c, _d = _b.endDate, endDate = _d === void 0 ? 'today' : _d, _e = _b.value, value = _e === void 0 ? undefined : _e, _f = _b.viewId, viewId = _f === void 0 ? 'ga:159996509' : _f;
            return {
                dateRanges: [
                    {
                        startDate: startDate,
                        endDate: endDate,
                    },
                ],
                dimensions: [
                    {
                        name: 'ga:pagePath',
                    },
                ],
                viewId: viewId || 'ga:159996509',
                metrics: [
                    {
                        expression: 'ga:pageviews',
                    },
                ],
                dimensionFilterClauses: [
                    {
                        filters: [
                            {
                                dimensionName: 'ga:pagePath',
                                operator: 'IN_LIST' /*EXACT*/,
                                expressions: [value],
                            },
                        ],
                    },
                ],
            };
        };
        return AnalyticsQueries;
    }());

    const GOOGLE_SCOPES = [
      'https://www.googleapis.com/auth/analytics.readonly',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/contacts.readonly',
      'https://www.googleapis.com/auth/plus.login',
    ];
    const GOOGLE_CONFIG = {
      apiKey: 'AIzaSyA7A6yPL2V8OBGh-DsQ1spG0suJfe5ZJaw',
      response_type: 'token',
      access_type: 'offline',
      // auto select account
      auto_select: false,
      prompt: 'select_account',
      // google client id
      client_id: '974269993480-30i5epi0r6a9uiafq3rkpgsjuooe2t3q.apps.googleusercontent.com',
      // handle callback response
      //callback: handleCredentialResponse,
      // cookie origin
      state_cookie_domain: window.location.origin,
      // scope library
      scope: GOOGLE_SCOPES.join(' '),
    };

    // key to save credential for offline usage
    const KEY_LOCALSTORAGE$1 = 'google_credential';
    // last login credential
    let g_credential$1 = getLocalCredential();

    /**
     * Global token handler
     * @param {Record<string,any>} response
     * @param {(g_credential: Record<string,any>) => any} [callback]
     * @returns
     */
    async function handleCredentialResponse(response, callback) {
      if (!response) {
        console.error('token response is null');
        return;
      }
      // handle credential responses
      for (let key in response) {
        g_credential$1[key] = response[key];
      }
      // determine expires time
      g_credential$1._expires_in = g_credential$1.expires_in * 1000 + new Date().getTime();
      // handle google one tap jwt login
      if ('credential' in response && typeof response.credential === 'string') {
        g_credential$1['credential'] = {};
        // parse jwt token
        const parse = parseJwt(response.credential);
        for (let key in parse) {
          g_credential$1['credential'][key] = parse[key];
        }
      } else if ('access_token' in response) {
        // fetch user profile
        await fetch('https://www.googleapis.com/oauth2/v3/userinfo?access_token=' + response.access_token)
          .then(res => res.json())
          .then(response => {
            g_credential$1['credential'] = {};
            for (let key in response) {
              g_credential$1['credential'][key] = response[key];
            }
          });
      }

      //console.log('credential', { g_credential }, { response });

      // save credential to local storage
      window.localStorage.setItem(KEY_LOCALSTORAGE$1, JSON.stringify(g_credential$1));

      if (typeof callback === 'function') callback(g_credential$1);
      return g_credential$1;
    }

    /**
     * get saved credential in local storage
     * @returns {{ [key:string]: any; access_token?: string; }}
     */
    function getLocalCredential() {
      return JSON.parse(localStorage.getItem(KEY_LOCALSTORAGE$1) || '{}');
    }

    /**
     * parse JWT response
     * @param {string} token
     * @returns
     */
    function parseJwt(token) {
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      var jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join(''),
      );
      return JSON.parse(jsonPayload);
    }

    /**
     * generate oauth url
     * @param {string} [redirect_uri]
     * @returns
     */
    function generateAuthUrl(redirect_uri) {
      return (
        'https://accounts.google.com/o/oauth2/v2/auth?' +
        'client_id=' +
        GOOGLE_CONFIG.client_id +
        '&redirect_uri=' +
        (redirect_uri || window.location.href) +
        '&response_type=token' +
        '&scope=https://www.googleapis.com/auth/analytics.readonly'
      );
    }

    var constants = {
      GOOGLE_SCOPES,
      GOOGLE_CONFIG,
      handleCredentialResponse,
      parseJwt,
      generateAuthUrl,
      getLocalCredential,
      KEY_LOCALSTORAGE: KEY_LOCALSTORAGE$1,
    };

    // key to save credential for offline usage
    const KEY_LOCALSTORAGE = 'google_credential';
    /**
     * last login credential
     * @type {Parameters<typeof gapi.auth.authorize>[0]}
     */
    const g_credential = Object.assign(JSON.parse(localStorage.getItem(KEY_LOCALSTORAGE) || '{}'), constants.GOOGLE_CONFIG, {
      response_type: 'token',
      cookiepolicy: 'single_host_origin',
      authuser: -1,
      prompt: 'consent',
    });
    var tokenClient;

    //const apiKey = 'AIzaSyA7A6yPL2V8OBGh-DsQ1spG0suJfe5ZJaw';
    window.onload = async function () {
      // load gapi
      await new Promise((resolve, reject) => {
        // NOTE: the 'auth2' module is no longer loaded.
        gapi.load('client', { callback: resolve, onerror: reject });
      });

      await gapi.client
        .init({
          // NOTE: OAuth2 'scope' and 'client_id' parameters have moved to initTokenClient().
        })
        .then(function () {
          //gapi.client.load('analytics', 'v3');
          gapi.client.load('https://analyticsreporting.googleapis.com/$discovery/rest?version=v4');
          //gapi.client.load('https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest');
          //gapi.client.load('https://analyticsdata.googleapis.com/$discovery/rest?version=v1beta');
          //gapi.client.load('https://analyticsdata.googleapis.com/$discovery/rest?version=v1alpha');
        })
        .then(
          function (response) {
            console.log('discovery document loaded', response);
          },
          function (reason) {
            console.log('Error: ' + reason.result.error.message);
          },
        );

      // load gsi
      await new Promise((resolve, reject) => {
        try {
          tokenClient = google.accounts.oauth2.initTokenClient({
            ...g_credential,
            prompt: 'consent',
            callback: tokenResponse => {
              constants.handleCredentialResponse(tokenResponse);
              gapi.auth.setToken(tokenResponse);
              startAnalytics();
            },
          });
          resolve();
        } catch (err) {
          reject(err);
        }
      });

      // start analytics when token previously resolved
      if (g_credential.access_token) {
        gapi.auth.setToken(g_credential);
        startAnalytics();
      }

      // force obtain new access token click handler
      document.getElementById('authBtn').addEventListener('click', () => authorize(true));
      // revoke token handler
      document.getElementById('revokeBtn').addEventListener('click', revokeToken);
    };

    function authorize(force) {
      // force obtain new access token
      if (force) return tokenClient.requestAccessToken();
      // credential undefined
      if ('credential' in g_credential === false) return tokenClient.requestAccessToken();
      // token expired
      const isExpired =
        'exp' in g_credential.credential
          ? Date.now() >= g_credential.credential.exp * 1000
          : Date.now() >= g_credential._expires_in;
      if (isExpired) return tokenClient.requestAccessToken();
    }

    function startAnalytics() {
      const viewId = 'ga:159996509';
      gapi.client
        .request({
          path: '/v4/reports:batchGet',
          root: 'https://analyticsreporting.googleapis.com/',
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + gapi.client.getToken().access_token,
          },
          body: {
            reportRequests: [AnalyticsQueries.getAllPagePathsWithView({ viewId })],
          },
        })
        .then(displayResults, handleError);
    }

    function handleError(e) {
      //if (e.status === 403) return redirectLogin();
      displayResults(e);
    }

    const messages = [];
    function displayResults(response) {
      var formattedJson = 'UNAUTHORIZED';
      if ('result' in response) {
        formattedJson = JSON.stringify(response.result, null, 2);

        if (response.result.reports) {
          const tbody = document.getElementById('renderResult');
          const queryResult = response.result.reports[0].data.rows;
          for (let i = 0; i < queryResult.length; i++) {
            const result = queryResult[i];
            tbody.appendChild(createTr(result.dimensions[0], result.metrics[0].values[0]));
          }
        }
      } else {
        formattedJson = JSON.stringify(response, null, 2);
      }

      messages.push(formattedJson);
      document.getElementById('query-output').innerHTML = messages.reverse().join('<hr/>');
    }

    function createTr(...texts) {
      const td = text => {
        const el = document.createElement('td');
        el.textContent = text;
        return el;
      };
      const tr = document.createElement('tr');
      for (let i = 0; i < texts.length; i++) {
        tr.appendChild(td(texts[i]));
      }
      return tr;
    }

    function revokeToken() {
      let cred = gapi.client.getToken();
      if (cred !== null) {
        google.accounts.oauth2.revoke(cred.access_token, () => {
          console.log('Revoked: ' + cred.access_token);
        });
        gapi.client.setToken('');
      }
    }

}));
