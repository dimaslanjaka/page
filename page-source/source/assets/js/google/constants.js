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

module.exports = { GOOGLE_SCOPES, GOOGLE_CONFIG };
