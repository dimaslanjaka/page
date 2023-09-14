// special
import React from 'react';
//

// styling
import './assets/css/main.scss';
//

import { all } from 'bluebird';
import { Route, Routes } from 'react-router-dom';
import { Layout, NoMatch } from './components/Layout';
import { HighlightLayout } from './route/Highlight';
import { Home } from './route/Home';
import { Login } from './route/Login';
import { MomentTimezone } from './route/MomentTimezone';
import { Safelink } from './route/safelink';
import { copyTextToClipboard, randomStr } from './utils';
import { initHljs } from './utils/highlightjs';
import { UI } from './route/UI';
import { BotDetect } from './route/BotDetect';

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
    // load highlight.js
    initHljs();
    // load bootstrap
    // loadBootstrapModule();
  }

  render() {
    return (
      <main>
        <Layout>
          <Routes>
            <Route index element={<Home />} />
            <Route path="page" element={<Home />} />
            <Route path="page/google/login" element={<Login />} />
            <Route path="page/google/login.html" element={<Login />} />
            <Route path="page/safelink" element={<Safelink />} />
            <Route path="page/safelink.html" element={<Safelink />} />
            <Route path="page/bot-detect" element={<BotDetect />} />
            <Route path="page/bot-detect.html" element={<BotDetect />} />
            <Route path="page/highlight-js" element={<HighlightLayout />} />
            <Route path="page/highlight-js.html" element={<HighlightLayout />} />
            <Route path="page/moment-timezone" element={<MomentTimezone />} />
            <Route path="page/moment-timezone.html" element={<MomentTimezone />} />
            <Route path="ui" element={<UI />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </Layout>
      </main>
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
