import { getAuth } from 'firebase/auth';
import { firebaseApp } from './firebase';

export const GOOGLE_SCOPES = [
  'https://www.googleapis.com/auth/analytics.readonly',
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
  //'https://www.googleapis.com/auth/contacts.readonly',
  //'https://www.googleapis.com/auth/plus.login',
];

export interface googleConfig extends google.accounts.id.IdConfiguration {
  [key: string]: any;
  apiKey: string;
  state_cookie_domain: string;
  prompt: 'select_account';
  client_id: string;
  scope: string;
}

export const GOOGLE_CONFIG = {
  apiKey: 'AIzaSyA7A6yPL2V8OBGh-DsQ1spG0suJfe5ZJaw',
  response_type: 'token',
  access_type: 'offline',
  // auto select account
  auto_select: false,
  prompt: 'select_account',
  // google client id
  client_id: '974269993480-0e6vhfl8j688jal91o6c93eh90cg88o2.apps.googleusercontent.com',
  // handle callback response
  //callback: handleCredentialResponse,
  // cookie origin
  state_cookie_domain: window.location.origin,
  // scope library
  scope: GOOGLE_SCOPES.join(' '),
} as googleConfig;

// key to save credential for offline usage
export const KEY_LOCALSTORAGE = 'google_credential';
// last login credential
let g_credential = getLocalCredential();

/**
 * Global token handler
 * @param response
 * @param callback
 * @returns
 */
export async function handleCredentialResponse(
  response: Record<string, any>,
  callback?: { (): void; (arg0: LocalCredential): void },
) {
  if (!response) {
    console.error('token response is null');
    return;
  }
  // handle credential responses
  for (const key in response) {
    g_credential[key] = response[key];
  }
  // determine expires time
  if (g_credential.expires_in) {
    g_credential._expires_in = g_credential.expires_in * 1000 + new Date().getTime();
  } else {
    const auth = await getAuth(firebaseApp).currentUser.getIdTokenResult();
    g_credential._expires_in = new Date(auth.expirationTime).getTime();
  }

  if ('credential' in response && response.credential) {
    if (typeof response.credential === 'string') {
      // handle google one tap jwt login
      g_credential['credential'] = {} as (typeof g_credential)['credential'];
      // parse jwt token
      const parse = parseJwt(response.credential);
      for (const key in parse) {
        g_credential['credential'][key] = parse[key];
      }
    } else if ('accessToken' in response.credential) {
      // apply tokenInfo property
      g_credential.tokenInfo = response.credential;
      // fetch user profile
      await fetchUserInfo(response.credential.accessToken);
    }
  } else if ('access_token' in response) {
    // fetch user profile
    await fetchUserInfo(response.access_token);
  }

  //console.log('credential', { g_credential }, { response });

  // save credential to local storage
  window.localStorage.setItem(KEY_LOCALSTORAGE, JSON.stringify(g_credential));

  if (typeof callback === 'function') callback(g_credential);
  return g_credential;
}

/**
 * is current user token expired
 * @param desiredCredential credential object, default using global g_credential
 * @returns
 */
export function isTokenExpired(desiredCredential?: LocalCredential) {
  if (!desiredCredential) desiredCredential = g_credential;
  if (desiredCredential.credential && typeof desiredCredential.credential !== 'string') {
    if (desiredCredential.credential.exp) {
      return Date.now() >= desiredCredential.credential.exp * 1000;
    } else if ('_expires_in' in desiredCredential) {
      return Date.now() >= desiredCredential._expires_in;
    }
  }
  return false;
}

export async function fetchUserInfo(access_token: string) {
  await fetch('https://www.googleapis.com/oauth2/v3/userinfo?access_token=' + access_token)
    .then(res => res.json())
    .then(response => {
      g_credential['credential'] = {} as (typeof g_credential)['credential'];
      for (const key in response) {
        g_credential['credential'][key] = response[key];
      }
    });
}

export interface LocalCredential {
  token: string;
  providerId: string;
  proactiveRefresh: {
    user: {
      uid: string;
      email: string;
      emailVerified: boolean;
      displayName: string;
      isAnonymous: boolean;
      photoURL: string;
      providerData: Array<{
        providerId: string;
        uid: string;
        displayName: string;
        email: string;
        phoneNumber: any;
        photoURL: string;
      }>;
      stsTokenManager: {
        refreshToken: string;
        accessToken: string;
        expirationTime: number;
      };
      createdAt: string;
      lastLoginAt: string;
      apiKey: string;
      appName: string;
    };
    isRunning: boolean;
    timerId: any;
    errorBackoff: number;
  };
  reloadUserInfo: {
    localId: string;
    email: string;
    displayName: string;
    photoUrl: string;
    emailVerified: boolean;
    providerUserInfo: Array<{
      providerId: string;
      displayName: string;
      photoUrl: string;
      federatedId: string;
      email: string;
      rawId: string;
    }>;
    validSince: string;
    lastLoginAt: string;
    createdAt: string;
    lastRefreshAt: string;
  };
  reloadListener: any;
  uid: string;
  auth: {
    apiKey: string;
    authDomain: string;
    appName: string;
    currentUser: {
      uid: string;
      email: string;
      emailVerified: boolean;
      displayName: string;
      isAnonymous: boolean;
      photoURL: string;
      providerData: Array<{
        providerId: string;
        uid: string;
        displayName: string;
        email: string;
        phoneNumber: any;
        photoURL: string;
      }>;
      stsTokenManager: {
        refreshToken: string;
        accessToken: string;
        expirationTime: number;
      };
      createdAt: string;
      lastLoginAt: string;
      apiKey: string;
      appName: string;
    };
  };
  stsTokenManager: {
    refreshToken: string;
    accessToken: string;
    expirationTime: number;
  };
  /** firebase token */
  accessToken: string;
  displayName: string;
  email: string;
  emailVerified: boolean;
  phoneNumber: any;
  photoURL: string;
  isAnonymous: boolean;
  tenantId: any;
  providerData: Array<{
    providerId: string;
    uid: string;
    displayName: string;
    email: string;
    phoneNumber: any;
    photoURL: string;
  }>;
  metadata: {
    createdAt: string;
    lastLoginAt: string;
  };
  credential:
    | string
    | {
        sub: string;
        name: string;
        given_name: string;
        family_name: string;
        picture: string;
        email: string;
        email_verified: boolean;
        locale: string;
        exp?: number;
      };
  tokenInfo: {
    idToken: string;
    accessToken: string;
    pendingToken: any;
    providerId: string;
    signInMethod: string;
  };
  _expires_in: number;
  /** google api/GSI token */
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  authuser: string;
  prompt: string;
}

/**
 * get saved credential in local storage
 * @returns
 */
export function getLocalCredential(): LocalCredential {
  if (!g_credential) g_credential = JSON.parse(localStorage.getItem(KEY_LOCALSTORAGE) || '{}');
  return g_credential;
}

/**
 * save credential in local storage
 * @param obj
 */
export function setLocalCredential(obj: Record<string, any>, merge = false) {
  localStorage.setItem(KEY_LOCALSTORAGE, JSON.stringify(merge ? Object.assign(g_credential, obj) : obj));
}

/**
 * parse JWT response
 * @param token
 * @returns
 */
export function parseJwt(token: string) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
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
 * @param redirect_uri
 * @returns
 */
export function generateAuthUrl(redirect_uri?: string) {
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
