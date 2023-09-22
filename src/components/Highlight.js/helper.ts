import { copyTextToClipboard, loadJS, randomStr } from '@/utils';
import hljs from 'highlight.js';

// start highlight pre code
function startHighlighter(preCode: HTMLElement) {
  // validate hljs for browser
  // if ('hljs' in window === false) return loadHljs();
  // validate hljs for react
  if ('highlightAll' in hljs === false) return loadHljs();
  // deterimine <code /> tag
  let code = preCode;
  if (preCode.tagName.toLowerCase() === 'pre') {
    // select inner <code /> from <pre /> tag
    code = preCode.querySelector('code');
    if (!code) {
      // create <code /> tag on single <pre /> tag
      const newC = document.createElement('code');
      newC.innerHTML = preCode.innerHTML;
      preCode.innerHTML = '';
      preCode.appendChild(newC);
      // re-assign new created <code />
      code = preCode.querySelector('code');
    }
  }
  if (!code) {
    console.log('pre code is null');
    console.log(preCode);
    return;
  }
  // add new id
  if (!code.id) code.id = 'code-' + randomStr(4);
  // fix mysql highlight
  if (code.classList.contains('language-mysql')) {
    code.classList.remove('language-mysql');
    code.classList.add('language-sql');
  }
  // start highlight pre code[data-highlight]
  if (code.hasAttribute('data-highlight')) {
    if (code.getAttribute('data-highlight') != 'false') {
      // highlight on data-highlight="true"
      highlightElement(code);
      // console.log('highlighting', code.id);
    }
  } else {
    // highlight no attribute data-highlight
    // enable highlighting by default
    highlightElement(code);
  }
}

function highlightElement(code: HTMLElement) {
  // only execute highlight on non-highlighted element
  if (!code.hasAttribute('highlighted')) {
    code.setAttribute('highlighted', 'true');
    if (hljs.highlightElement) {
      hljs.highlightElement(code);
    } else {
      hljs.highlightBlock(code);
    }
  }
}

/**
 * load Highlight.js
 * @returns
 */
function loadHljs() {
  // validate hljs already imported
  if ('hljs' in window === true) return;
  // otherwise create one
  loadJS('//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/highlight.min.js', { onload: initHljs });
}

export function initHljs() {
  // highlight pre code
  document.querySelectorAll('pre').forEach(startHighlighter);

  // highlight all pre code elements
  // when use below syntax, please remove above syntax
  /*
  if ("initHighlightingOnLoad" in hljs) {
    hljs.initHighlightingOnLoad();
  } else if ("highlightAll" in hljs) {
    hljs.highlightAll();
  }
  */
}

/**
 * init copy to clipboard button on pre-code
 * @returns
 */
export function initClipBoard() {
  import('bluebird').then(({ default: Bluebird }) => {
    Bluebird.all(Array.from(document.querySelectorAll('pre'))).each(function (codeBlock) {
      if (!codeBlock.getAttribute('id')) {
        codeBlock.setAttribute('id', randomStr(4));
      }

      let button = codeBlock.querySelector('.copy-code-button') as HTMLButtonElement;
      let append = false;
      if (!button) {
        // create one when copy button not found
        append = true;
        button = document.createElement('button');
        button.className = 'copy-code-button';
        button.type = 'button';
        const s = codeBlock.innerText;
        button.setAttribute('data-clipboard-text', s);
        button.setAttribute('title', 'Copy code block');
        const span = document.createElement('span');
        span.innerText = 'Copy';
        button.appendChild(span);
      }

      button.onclick = function (e) {
        const el = document.getElementById(codeBlock.getAttribute('id'));

        copyTextToClipboard(el.textContent.replace(/(Copy|Copied)$/gm, ''), e)
          .then(() => {
            (e.target as Element).textContent = 'Copied';
          })
          .finally(() => {
            window.setTimeout(function () {
              (e.target as Element).textContent = 'Copy';
            }, 2000);
          })
          .catch(console.error);
      };

      if (append) codeBlock.appendChild(button);
    });
  });
}
