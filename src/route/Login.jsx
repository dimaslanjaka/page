import React from 'react';
import './Login.scss';
import { Image } from '../components/Image';
import {
  GOOGLE_CONFIG,
  KEY_LOCALSTORAGE,
  getLocalCredential,
  handleCredentialResponse,
} from '../assets/js/google/constants.js';
import { loadScript } from '../assets/js/utils';

export class Login extends React.Component {
  /**
   * @type {import('../assets/js/google/constants').LocalCredential}
   */
  g_credential = {};

  componentDidMount() {
    document.title = 'Login page - WMI';
    loadScript('https://accounts.google.com/gsi/client').then(this.start.bind(this));
  }

  render() {
    return (
      <main>
        <section>
          <div className="mb-2" id="profileWrapper">
            <div className="card">
              <Image
                src="https://codingyaar.com/wp-content/uploads/bootstrap-profile-card-image.jpg"
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
                  <button title="Login Google" className="iconButton googleIcon" id="loginGoogle"></button>
                  <button title="Login Firebase" className="iconButton firebaseIcon" id="loginFirebase"></button>
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
      </main>
    );
  }

  start() {
    // last login credential
    this.g_credential = getLocalCredential();
    // clear
    const queryString = window.location.search;
    const urlParameters = new URLSearchParams(queryString);
    const value = urlParameters.get('clear');
    const needClean = value !== null;
    if (needClean) {
      this.g_credential = {};
      localStorage.removeItem(KEY_LOCALSTORAGE);
      window.location.replace(window.location.href.split('?')[0]);
    }
    // GSI initializer options
    GOOGLE_CONFIG.callback = this.handleCredResp;

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
      callback: this.handleCredResp, // your function to handle the response after login. 'access_token' will be returned as property on the response
    });

    document.getElementById('loginGoogle').addEventListener('click', function () {
      tokenClient.requestAccessToken();
    });
    document.getElementById('loginFirebase').addEventListener('click', function () {
      // firebaseAuthGoogle();
    });
  }

  handleCredResp(response) {
    const tokenDebugger = document.getElementById('tokenResponse');
    if (!response) {
      if (tokenDebugger) tokenDebugger.textContent = 'response is null';
      return;
    }
    handleCredentialResponse(response, function () {
      //console.log('credential', { g_credential }, { response });

      // redirect to page
      const queryString = window.location.search;
      const urlParameters = new URLSearchParams(queryString);
      const redirecto = urlParameters.get('redirect');
      if (redirecto) {
        window.location.replace(redirecto);
      }

      // change profile card
      // updateProfileCard();
    });
  }
}
