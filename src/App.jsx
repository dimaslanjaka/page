import React from 'react';
import { Home } from './route/Home';
import { Login } from './route/Login';
import { Route, Routes } from 'react-router-dom';
import './assets/css/main.scss';
import { loadMainScript } from './assets/js/main';
import { Layout, NoMatch } from './components/Layout';
import { Safelink } from './route/Safelink';
/*
https://codesandbox.io/s/mzj1j0ryxx?file=/src/Icons.js
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons';
library.add(fab, faCheckSquare, faCoffee);
*/

class App extends React.Component {
  componentDidMount() {
    // load main script
    loadMainScript();
  }

  render() {
    return (
      <React.Fragment>
        <Routes>
          <Route path="/page" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="safelink" element={<Safelink />} />
            {/*<Route path="fontawesome" element={<FontAwesome />} />*/}

            {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </React.Fragment>
    );
  }
}

export default App;
