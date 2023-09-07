import React from 'react';
import { Home } from './route/Home';
import { Login } from './route/Login';
import { Route, Routes } from 'react-router-dom';
import './assets/css/main.scss';
import { Layout, NoMatch } from './components/Layout';
import { Safelink } from './route/Safelink';
import { all } from 'bluebird';
import { copyTextToClipboard, randomStr } from './utils';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import '../public/page/assets/js/analystic';

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
