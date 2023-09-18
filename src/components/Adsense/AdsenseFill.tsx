import React from 'react';

// initialize adsense="fill" attribute
declare module 'react' {
  interface HTMLAttributes<T> extends React.AriaAttributes, React.DOMAttributes<T> {
    // extends React's HTMLAttributes
    adsense?: string;
  }
}

/**
 * create div[adsense="fill"]
 * @returns
 */
export default function AdsenseFill() {
  return <div adsense="fill" style={{ minWidth: '50px' }}></div>;
}
