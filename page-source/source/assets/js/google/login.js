// key to save credential for offline usage
const KEY_LOCALSTORAGE = 'google_credential';
// last login credential
let g_credential = JSON.parse(localStorage.getItem(KEY_LOCALSTORAGE) || '{}');
// clear
const queryString = window.location.search;
const urlParameters = new URLSearchParams(queryString);
const value = urlParameters.get('clear');
if (value !== null) g_credential = {};
// GSI initializer options
const initOpt = {
  apiKey: 'AIzaSyA7A6yPL2V8OBGh-DsQ1spG0suJfe5ZJaw',
  response_type: 'token',
  access_type: 'offline',
  // auto select account
  auto_select: false,
  prompt: 'select_account',
  // google client id
  client_id: '974269993480-30i5epi0r6a9uiafq3rkpgsjuooe2t3q.apps.googleusercontent.com',
  // handle callback response
  callback: handleCredentialResponse,
  // cookie origin
  state_cookie_domain: window.location.origin,
  // scope library
  scope: [
    'https://www.googleapis.com/auth/analytics.readonly',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/contacts.readonly',
    'https://www.googleapis.com/auth/plus.login',
  ].join(' '),
};

(function () {
  document.getElementById('logout').addEventListener('click', function () {
    google.accounts.oauth2.revoke(g_credential.credential.access_token);
  });

  // initialize google account
  google.accounts.id.initialize({
    ...initOpt,
    allowed_parent_origin: true,
  });
  // prevent UX dead loop
  google.accounts.id.disableAutoSelect();
  // initialize token client
  const tokenClient = google.accounts.oauth2.initTokenClient({
    ...initOpt,
    //login_hint: 'credential' in g_credential ? g_credential.credential.email : null,
    prompt: 'consent', // '' | 'none' | 'consent' | 'select_account'
    callback: handleCredentialResponse, // your function to handle the response after login. 'access_token' will be returned as property on the response
  });
  // render profile card
  updateProfileCard();

  document.getElementById('changeAccount').addEventListener('click', function () {
    tokenClient.requestAccessToken();
  });
})();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function handleCredentialResponse(response) {
  const tokenDebugger = document.getElementById('tokenResponse');
  if (!response) {
    return (tokenDebugger.textContent = 'response is null');
  }
  // handle credential responses
  for (let key in response) {
    g_credential[key] = response[key];
  }
  // determine expires time
  g_credential._expires_in = g_credential.expires_in * 1000 + new Date().getTime();
  // handle google one tap jwt login
  if ('credential' in response) {
    g_credential['credential'] = {};
    // parse jwt token
    const parse = parseJwt(response.credential);
    for (let key in parse) {
      g_credential['credential'][key] = parse[key];
    }
  } else if ('access_token' in response) {
    // fetch user profile
    await fetch('https://www.googleapis.com/oauth2/v3/userinfo?access_token=' + response.access_token)
      .then(res => res.json())
      .then(response => {
        g_credential['credential'] = {};
        for (let key in response) {
          g_credential['credential'][key] = response[key];
        }
      });
  }

  //console.log('credential', { g_credential }, { response });

  // save credential to local storage
  window.localStorage.setItem(KEY_LOCALSTORAGE, JSON.stringify(g_credential));

  const redirecto = urlParameters.get('redirect');
  if (redirecto) {
    window.location.replace(redirecto);
  }

  // change profile card
  updateProfileCard();
}

function updateProfileCard() {
  const tokenDebugger = document.getElementById('tokenResponse');
  if ('credential' in g_credential === false) {
    return (tokenDebugger.innerHTML = 'UNAUTHORIZED');
  }
  const wrapper = document.getElementById('profileWrapper');
  const img = wrapper.querySelector('.card-img-top');
  img.setAttribute('src', g_credential.credential.picture);
  const fullName = `${g_credential.credential.given_name} ${g_credential.credential.family_name}`;
  img.setAttribute('alt', `${fullName}`);
  wrapper.querySelector('.card-title').innerHTML = fullName;
  const isExpired =
    'exp' in g_credential.credential
      ? Date.now() >= g_credential.credential.exp * 1000
      : Date.now() >= g_credential._expires_in;
  document.getElementById('gEmail').textContent = g_credential.credential.email;
  document.getElementById('isExpired').innerHTML = isExpired
    ? '<span class="text-danger">true</span>'
    : '<span class="text-success">false</span>';

  // print debug
  tokenDebugger.textContent = JSON.stringify(g_credential, null, 2);
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
