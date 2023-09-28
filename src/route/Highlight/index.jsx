import React from 'react';
//

import AdsenseFill from '@components/Adsense/AdsenseFill';
import HighlightElement from '@components/Highlight.js';

// const AdsenseFill = React.lazy(() => import('@components/Adsense/AdsenseFill'));
// const HighlightElement = React.lazy(() => import('@components/Highlight.js'));
// const Link = React.lazy(() => import('@components/Link'));

function HighlightLayout() {
  React.useEffect(() => {
    require('./Highlight.scss');
  });

  return (
    <React.Fragment>
      <div className="text-center">
        <h1>Auto highlight.js</h1>
        <p>
          implement auto syntax highlighting using <Link href="https://npmjs.com/highlight.js">highlight.js</Link>
        </p>
      </div>
      <div className="mx-auto p-2">
        <h4>Enable Highlighting</h4>
        <HighlightElement lang="js">
          {`
function Shape2D(){
this.name = 'Shape 2D';
}
`}
        </HighlightElement>
        <h4>Disable Highlighting</h4>
        <HighlightElement className="ss" data-highlight="false">
          {`
function Triangle(base,height){
  this.name = 'Triangle';
  this.base = base;
  this.height = height;
  this.getArea = function(){return this.base*this.height/2;};
}
`}
        </HighlightElement>

        <AdsenseFill />

        <h4>
          without <code>data-highlight</code> attribute
        </h4>

        <pre>
          <code className="language-sql">
            {`
CREATE USER 'dimaslanjaka'@'%' IDENTIFIED VIA mysql_native_password USING '***';
GRANT ALL PRIVILEGES ON *.* TO 'dimaslanjaka'@'%' REQUIRE NONE WITH GRANT OPTION
MAX_QUERIES_PER_HOUR 0 MAX_CONNECTIONS_PER_HOUR 0 MAX_UPDATES_PER_HOUR 0 MAX_USER_CONNECTIONS 0;
GRANT ALL PRIVILEGES ON \`dimaslanjaka\\_%\`.* TO 'dimaslanjaka'@'%';
            `}
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
          <code className="language-scss">{`
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
<pre><code class="language-javascript">
// your codes to print here
</code></pre>
<!-- disable highlight -->
<pre><code class="language-javascript" data-highlight="false">
// your codes to print here
</code></pre>
    `}</code>
        </pre>

        <h2>React</h2>
        <p>
          This code also works on reactjs{' '}
          <Link href="https://github.com/dimaslanjaka/page/tree/83bc6fe/src/components/Highlight.js">
            see full codes
          </Link>{' '}
          |{' '}
          <Link href="https://github.com/dimaslanjaka/page/tree/83bc6fecf11178a42503b15c8df26edaa5823961/src/route/Highlight">
            see implementation usages
          </Link>
        </p>
      </div>
    </React.Fragment>
  );
}

export default HighlightLayout;
