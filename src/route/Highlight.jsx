/* global hljs */
import React from 'react';
import './Highlight.scss';
import { AdsenseFill } from '../components/Adsense';

export function HighlightLayout() {
  React.useEffect(() => {
    initHljs();
  });

  return (
    <main className="mx-auto p-2">
      <h1>Auto highlight.js</h1>
      <p>
        implement auto syntax highlighting using <kbd>highlight.js</kbd>
      </p>
      <h4>Enable Highlighting</h4>
      <pre>
        <code data-highlight="true">
          {`function Shape2D(){
  this.name = 'Shape 2D';
}`}
        </code>
      </pre>
      <h4>Disable Highlighting</h4>
      <pre>
        <code className="ss" data-highlight="false">
          {`
function Triangle(base,height){
    this.name = 'Triangle';
    this.base = base;
    this.height = height;
    this.getArea = function(){return this.base*this.height/2;};
}
`}
        </code>
      </pre>

      <AdsenseFill />

      <h4>
        without <code>data-highlight</code> attribute
      </h4>

      <pre>
        <code className="language-sql">
          CREATE USER 'dimaslanjaka'@'%' IDENTIFIED VIA mysql_native_password USING '***';GRANT ALL PRIVILEGES ON *.* TO
          'dimaslanjaka'@'%' REQUIRE NONE WITH GRANT OPTION MAX_QUERIES_PER_HOUR 0 MAX_CONNECTIONS_PER_HOUR 0
          MAX_UPDATES_PER_HOUR 0 MAX_USER_CONNECTIONS 0;GRANT ALL PRIVILEGES ON `dimaslanjaka\_%`.* TO
          'dimaslanjaka'@'%';
        </code>
      </pre>

      <pre>
        <code>
          {`
function Shape(){
  // this is a comment
  this.name = 'Shape';
  this.toString = function(){return this.name;};
}
`}
        </code>
      </pre>

      <h2>Full codes</h2>
      <h3>CSS</h3>
      <pre>
        <code>{`
@import url('//cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.16.2/build/styles/default.min.css');
`}</code>
      </pre>
      <h3>JS</h3>
      <pre>
        <code>{`
// init highlight.js after page loaded
document.addEventListener('DOMContentLoaded', initHljs);

// start highlight pre code
function startHighlighter(block) {
  // validate hljs
  if ('hljs' in window === false) return loadHljs();
  // fix mysql highlight
  if (block.classList.contains('language-mysql')) {
    block.classList.remove('language-mysql');
    block.classList.add('language-sql');
  }
  // start highlight pre code[data-highlight]
  if (block.hasAttribute('data-highlight')) {
    if (block.getAttribute('data-highlight') != 'false') {
      // highlight on data-highlight="true"
      hljs.highlightBlock(block);
    }
  } else {
    // highlight no attribute data-highlight
    hljs.highlightBlock(block);
  }
}

function loadHljs() {
  // validate hljs already imported
  if ('hljs' in window === true) return;
  // otherwise create one
  const scr = document.createElement('script');
  scr.src = '//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/highlight.min.js';
  scr.onload = initHljs;
  const referenceNode = document.querySelectorAll('script').item(0);
  referenceNode.parentNode.insertBefore(scr, referenceNode.nextSibling);
}

function initHljs() {
  // highlight pre code
  document.querySelectorAll('pre code').forEach(startHighlighter);

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
      `}</code>
      </pre>
      <h3>HTML</h3>
      <pre>
        <code>{`
// your codes to print here
      `}</code>
      </pre>
    </main>
  );
}

// document.addEventListener('DOMContentLoaded', initHljs);

// start highlight pre code
function startHighlighter(block) {
  // validate hljs
  if ('hljs' in window === false) return loadHljs();
  // fix mysql highlight
  if (block.classList.contains('language-mysql')) {
    block.classList.remove('language-mysql');
    block.classList.add('language-sql');
  }
  // start highlight pre code[data-highlight]
  if (block.hasAttribute('data-highlight')) {
    if (block.getAttribute('data-highlight') != 'false') {
      // highlight on data-highlight="true"
      hljs.highlightBlock(block);
    }
  } else {
    // highlight no attribute data-highlight
    hljs.highlightBlock(block);
  }
}

function loadHljs() {
  // validate hljs already imported
  if ('hljs' in window === true) return;
  // otherwise create one
  const scr = document.createElement('script');
  scr.src = '//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/highlight.min.js';
  scr.onload = initHljs;
  const referenceNode = document.querySelectorAll('script').item(0);
  referenceNode.parentNode.insertBefore(scr, referenceNode.nextSibling);
}

function initHljs() {
  // highlight pre code
  document.querySelectorAll('pre code').forEach(startHighlighter);

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
