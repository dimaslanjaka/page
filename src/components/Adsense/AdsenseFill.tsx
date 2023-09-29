import React from 'react';

// initialize adsense="fill" attribute
declare module 'react' {
  interface HTMLAttributes<T> extends React.AriaAttributes, React.DOMAttributes<T> {
    // extends React's HTMLAttributes
    adsense?: string;
  }
}

interface AdsenseFillAttr extends React.HTMLAttributes<HTMLElement> {
  /** fill only for specific data-ad-format */
  format?: string;
}

/**
 * create div[adsense="fill"]
 * @returns
 */
export default function AdsenseFill(props: AdsenseFillAttr) {
  return <div adsense="fill" style={{ minWidth: '50px' }} {...props}></div>;
}
