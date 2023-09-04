import React from 'react';
import './Login.scss';
import { Image } from '../components/Image';

export class Login extends React.Component {
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
                  <tr>
                    <td>Email</td>
                    <td id="gEmail"></td>
                  </tr>
                  <tr>
                    <td>Is token expired</td>
                    <td id="isExpired"></td>
                  </tr>
                </table>
                <button title="Login Google" className="iconButton" id="loginGoogle">
                  <i className="fab fa-google"></i>
                </button>
                <button title="Login Firebase" className="iconButton firebaseIcon" id="loginFirebase"></button>
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
}
