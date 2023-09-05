import { all } from 'bluebird';
import { copyTextToClipboard, randomStr } from '../../utils';

export async function loadMainScript() {
  await import('./analystic');
  await import('bootstrap/dist/js/bootstrap.bundle.js');
  await import('./r-ads');
  await initClipBoard();
}

function initClipBoard() {
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

/*
if (typeof require != 'undefined' && typeof module != 'undefined' && require.main === module) {
  // load script
  loadMainScript();
}

if (typeof module === 'object' && 'exports' in module) {
  module.exports = { loadMainScript };
}
*/
