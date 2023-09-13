import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import { randomStr } from '.';
import { loadJS } from './utils';

// css for browser
// '//cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.16.2/build/styles/default.min.css'

// start highlight pre code
function startHighlighter(preCode: HTMLElement) {
  // validate hljs for browser
  // if ('hljs' in window === false) return loadHljs();
  // validate hljs for react
  if ('highlightAll' in hljs === false) return loadHljs();
  // deterimine <code /> tag
  let code = preCode;
  if (preCode.tagName.toLowerCase() === 'pre') {
    code = preCode.querySelector('code');
    if (!code) {
      // create <code /> tag on single <pre /> tag
      const newC = document.createElement('code');
      newC.innerHTML = preCode.innerHTML;
      preCode.innerHTML = '';
      preCode.appendChild(newC);
    }
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
  if (hljs.highlightElement) {
    hljs.highlightElement(code);
  } else {
    hljs.highlightBlock(code);
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
