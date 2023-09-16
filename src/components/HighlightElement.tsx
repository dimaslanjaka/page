import hljs from 'highlight.js';
import React from 'react';
import { loadJS, randomStr } from '../utils';

// css for browser
// '//cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.16.2/build/styles/default.min.css'
// css for local
// @import 'highlight.js/styles/github-dark.css';

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

interface HighlightProps {
  /** specify language */
  lang?: string;
  /** enable highlighting? */
  'data-highlight'?: boolean;
}

export class HighlightElement extends React.Component<HighlightProps, Record<string, any>> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount(): void {
    initHljs();
  }

  render() {
    const buildProps = {} as Record<string, any>;
    if (this.props.lang) {
      buildProps.className = 'hljs language-' + this.getLang();
    }
    if (this.props['data-highlight']) {
      buildProps['data-highlight'] = String(this.props['data-highlight']);
    }
    return (
      <pre>
        <code {...buildProps}>{this.props.children}</code>
      </pre>
    );
  }

  getLang(): string | undefined {
    const { lang } = this.props;
    const map = {
      js: 'javascript',
      kt: 'kotlin',
      ts: 'typescript',
      mysql: 'sql',
    };
    if (lang in map) {
      return map[lang];
    } else {
      return lang;
    }
  }
}