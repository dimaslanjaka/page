// special
import React from 'react';
//

// styling
//import './assets/fonts/Cera Pro Bold.otf';
import './assets/css/main.scss';
import 'bootstrap/dist/js/bootstrap.bundle.js';
//

import { Home } from './route/Home';
import { Login } from './route/Login';
import { Route, Routes } from 'react-router-dom';
import { Layout, NoMatch } from './components/Layout';
import { all } from 'bluebird';
import { copyTextToClipboard, randomStr } from './utils';
import { Safelink } from './route/safelink';
import { MomentTimezone } from './route/MomentTimezone';
import { HighlightLayout } from './route/Highlight';

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
    initClipBoard();
  }

  render() {
    return (
      <React.Fragment>
        <Routes>
          <Route path="/page" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="google/login" element={<Login />} />
            <Route path="google/login.html" element={<Login />} />
            <Route path="safelink" element={<Safelink />} />
            <Route path="safelink.html" element={<Safelink />} />
            <Route path="highlight-js" element={<HighlightLayout />} />
            <Route path="highlight-js.html" element={<HighlightLayout />} />
            <Route path="moment-timezone" element={<MomentTimezone />} />
            <Route path="moment-timezone.html" element={<MomentTimezone />} />

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

export function initClipBoard() {
  return all(Array.from(document.querySelectorAll('pre'))).each(function (codeBlock) {
    if (!codeBlock.getAttribute('id')) {
      codeBlock.setAttribute('id', randomStr(4));
    }

    var button = document.createElement('button');
    button.className = 'copy-code-button';
    button.type = 'button';
    var s = codeBlock.innerText;
    button.setAttribute('data-clipboard-text', s);
    button.innerText = 'Copy';
    // button.setAttribute('title', 'Copiar para a área de transferência');
    button.onclick = function (e) {
      const el = document.getElementById(codeBlock.getAttribute('id'));
      copyTextToClipboard(el.textContent.replace(/(Copy|Copied)$/gm, ''), e)
        .then(() => {
          e.target.textContent = 'Copied';
        })
        .finally(() => {
          window.setTimeout(function () {
            e.target.textContent = 'Copy';
          }, 2000);
        })
        .catch(console.error);
    };

    // var pre = codeBlock.parentNode;
    //codeBlock.classList.add('prettyprint');
    // pre.parentNode.insertBefore(button, pre);
    codeBlock.appendChild(button);
  });
}
