import React from 'react';
import { randomStr } from 'src/utils';
import * as helper from './helper';

// css for browser
// '//cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.16.2/build/styles/default.min.css'
// css for local
// @import 'highlight.js/styles/github-dark.css';

interface HighlightProps {
  [key: string]: any;
  /**
   * specify language
   * * applied to `<code />` tag
   */
  lang?: string;
  /**
   * enable highlighting?
   * * applied to `<code />` tag
   */
  'data-highlight'?: boolean;
  /**
   * custom id
   * * applied for `<pre />` tag
   */
  id?: string;
  /**
   * custom class names
   * * applied for `<pre />` tag
   */
  className?: string;
}

class HighlightElement extends React.Component<HighlightProps, Record<string, any>> {
  constructor(props: HighlightProps) {
    super(props);
  }

  componentDidMount() {
    helper.initHljs();
    //window.addEventListener('load', helper.initHljs.bind(this));
  }

  componentWillUnmount() {
    //window.removeEventListener('load', helper.initHljs.bind(this));
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
      <pre id={this.props.id || 'pre-' + randomStr(3)} className={this.props.className}>
        <code {...buildProps}>{this.props.children}</code>
        <button
          className="copy-code-button"
          type="button"
          title="Copy code block"
          data-clipboard-text={this.props.children}
        >
          <span>Copy</span>
        </button>
      </pre>
    );
  }

  getLang(): string | undefined {
    const { lang } = this.props;
    const map = {
      js: 'javascript',
      kt: 'kotlin',
      ts: 'typescript',
      mysql: 'sql'
    };
    if (lang in map) {
      return map[lang];
    } else {
      return lang;
    }
  }
}

export default HighlightElement;
