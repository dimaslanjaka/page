import React from 'react';
import { Home } from './route/Home';
import { Login } from './route/Login';
import { Route, Routes } from 'react-router-dom';
import './assets/css/main.scss';
import { loadMainScript } from './assets/js/main';
import { Layout, NoMatch } from './components/Layout';

class App extends React.Component {
  componentDidMount() {
    //document.title = 'dfsdfsdfsd';
    loadMainScript();
  }

  render() {
    return (
      <React.Fragment>
        <Routes>
          <Route path="/page" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="safelink" element={<Login />} />

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
