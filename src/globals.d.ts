import google from '@types/google.accounts';

// Code Splitting and Loading Other Resources
declare let require: {
  <T>(path: string): T;
  (paths: string[], callback: (...modules: any[]) => void): void;
  ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
};

// assets
// declare module '*.svg' {
//   const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
//   export default content;
// }

declare module '*.svg' {
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}

// typescript css modules

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.sass' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.less' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.styl' {
  const classes: { [key: string]: string };
  export default classes;
}

// browser global scope
declare global {
  interface Window {
    [key: string]: any; // enable dynamic object support
    dataLayer: Record<string, any>[]; // google analytics
    adsbygoogle: any; // google adsense
    clipboardData?: any; // safari clipboard
    google: google; // google new api GSI client
    opera: Record<string, any>;
    opr: Record<string, any>;
    safari: Record<string, any>;
    adsense_option: import('./components/Adsense/utils/config').AdsenseOption;
  }

  interface Event {
    [key: string]: any; // enable dynamic object support
    clipboardData?: any; // safari clipboard
  }
}
