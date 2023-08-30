const { GOOGLE_CONFIG, handleCredentialResponse, getLocalCredential } = require('./constants');

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
GOOGLE_CONFIG.callback = handleCredResp;

(function () {
  document.getElementById('logout').addEventListener('click', function () {
    google.accounts.oauth2.revoke(g_credential.credential.access_token);
  });

  // initialize google account
  google.accounts.id.initialize({
    ...GOOGLE_CONFIG,
    allowed_parent_origin: true,
  });
  // prevent UX dead loop
  google.accounts.id.disableAutoSelect();
  // initialize token client
  const tokenClient = google.accounts.oauth2.initTokenClient({
    ...GOOGLE_CONFIG,
    //login_hint: 'credential' in g_credential ? g_credential.credential.email : null,
    prompt: 'consent', // '' | 'none' | 'consent' | 'select_account'
    callback: handleCredResp, // your function to handle the response after login. 'access_token' will be returned as property on the response
  });
  // render profile card
  updateProfileCard();

  document.getElementById('changeAccount').addEventListener('click', function () {
    tokenClient.requestAccessToken();
  });
})();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function handleCredResp(response) {
  const tokenDebugger = document.getElementById('tokenResponse');
  if (!response) {
    tokenDebugger.textContent = 'response is null';
    return;
  }
  handleCredentialResponse(response, function () {
    //console.log('credential', { g_credential }, { response });

    const redirecto = urlParameters.get('redirect');
    if (redirecto) {
      window.location.replace(redirecto);
    }

    // change profile card
    updateProfileCard();
  });
}

function updateProfileCard() {
  const tokenDebugger = document.getElementById('tokenResponse');
  g_credential = getLocalCredential();
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
