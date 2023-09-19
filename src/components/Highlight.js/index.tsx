import React from 'react';
import * as helper from './helper';

// css for browser
// '//cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.16.2/build/styles/default.min.css'
// css for local
// @import 'highlight.js/styles/github-dark.css';

interface HighlightProps {
  /** specify language */
  lang?: string;
  /** enable highlighting? */
  'data-highlight'?: boolean;
}

class HighlightElement extends React.Component<HighlightProps, Record<string, any>> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount(): void {
    helper.initHljs();
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

export default HighlightElement;