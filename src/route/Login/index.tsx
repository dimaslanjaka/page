import { loadCSS } from '@/utils';
import * as constants from '@assets/js/google/constants';
import { firebaseAuthGoogle } from '@assets/js/google/firebase';
import React from 'react';

const Image = React.lazy(() => import('@components/Image'));

class Login extends React.Component {
  g_credential: Record<string, any>;

  componentDidMount() {
    document.title = 'Login page - WMI';
    this.loadGSI().then(this.start.bind(this));
    loadCSS('//cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css');
    require('./Login.scss');
  }

  render() {
    return (
      <div>
        <section>
          <div className="mb-2" id="profileWrapper">
            <div className="card">
              <Image
                src="//codingyaar.com/wp-content/uploads/bootstrap-profile-card-image.jpg"
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">Your Name</h5>
                <table className="table">
                  <tbody>
                    <tr>
                      <td>Email</td>
                      <td id="gEmail"></td>
                    </tr>
                    <tr>
                      <td>Is token expired</td>
                      <td id="isExpired"></td>
                    </tr>
                  </tbody>
                </table>
                <div className="btn-group">
                  <button title="Login Google" className="btn iconButton googleIcon" id="loginGoogle"></button>
                  <button title="Login Firebase" className="btn iconButton firebaseIcon" id="loginFirebase"></button>
                </div>
              </div>
            </div>
          </div>

          <button className="btn btn-danger btn-sm d-none" id="logout">
            Logout
          </button>
        </section>

        <section>
          <pre>
            <code id="tokenResponse"></code>
          </pre>
        </section>
      </div>
    );
  }

  start() {
    // clear
    const queryString = window.location.search;
    const urlParameters = new URLSearchParams(queryString);
    const value = urlParameters.get('clear');
    const needClean = value !== null;
    if (needClean) {
      this.g_credential = {} as Record<string, any>;
      localStorage.removeItem(constants.KEY_LOCALSTORAGE);
      window.location.replace(window.location.href.split('?')[0]);
    }
    // GSI initializer options
    constants.GOOGLE_CONFIG.callback = this.handleCredResp;

    // initialize google account
    google.accounts.id.initialize({
      ...constants.GOOGLE_CONFIG
      //allowed_parent_origin: true,
    });
    // prevent UX dead loop
    google.accounts.id.disableAutoSelect();
    // initialize token client
    const tokenClient = google.accounts.oauth2.initTokenClient({
      ...constants.GOOGLE_CONFIG,
      //login_hint: 'credential' in g_credential ? g_credential.credential.email : null,
      prompt: 'consent', // '' | 'none' | 'consent' | 'select_account'
      callback: this.handleCredResp // your function to handle the response after login. 'access_token' will be returned as property on the response
    });

    document.getElementById('loginGoogle').addEventListener('click', function () {
      tokenClient.requestAccessToken();
    });
    const self = this;
    document.getElementById('loginFirebase').addEventListener('click', function () {
      firebaseAuthGoogle().then(self.handleCredResp);
    });

    updateProfileCard();
  }

  handleCredResp(response: Record<string, any>) {
    const tokenDebugger = document.getElementById('tokenResponse');
    if (!response) {
      if (tokenDebugger) tokenDebugger.textContent = 'response is null';
      return;
    }
    constants.handleCredentialResponse(response, function () {
      //console.log('credential', { g_credential }, { response });

      // redirect to page
      const queryString = window.location.search;
      const urlParameters = new URLSearchParams(queryString);
      const redirecto = urlParameters.get('redirect');
      if (redirecto) {
        window.location.replace(redirecto);
      }

      // change profile card
      updateProfileCard();
    });
  }

  loadGSI() {
    return new Promise(resolve => {
      const script = document.createElement('script');
      script.src = '//accounts.google.com/gsi/client';
      script.onload = resolve;
      document.getElementsByTagName('head')[0].appendChild(script);
    });
  }
}

export default Login;

function updateProfileCard() {
  const g_credential = constants.getLocalCredential();
  document.getElementById('tokenResponse').textContent =
    Object.keys(g_credential).length > 0 ? JSON.stringify(g_credential, null, 2) : 'UNAUTHORIZED';
  if ('credential' in g_credential) {
    const wrapper = document.getElementById('profileWrapper');
    const img = wrapper.querySelector('.card-img-top');
    if (typeof g_credential.credential == 'object') {
      if ('picture' in g_credential.credential) {
        img.setAttribute('src', g_credential.credential.picture);
      }
      if ('given_name' in g_credential.credential) {
        const fullName = `${g_credential.credential.given_name} ${g_credential.credential.family_name}`;
        img.setAttribute('alt', `${fullName}`);
        wrapper.querySelector('.card-title').innerHTML = fullName;
      }
      document.getElementById('gEmail').textContent = g_credential.credential.email;
      document.getElementById('isExpired').innerHTML = constants.isTokenExpired(g_credential)
        ? '<span className="text-danger">true</span>'
        : '<span className="text-success">false</span>';
    }
  }
}
