import * as utils from '@utils/index';
import React from 'react';
import './utils';
import * as conf from './utils/config';

interface AdsenseProperties extends conf.ParamsAdsByGoogle {
  /** data-ad-format */
  format?: 'fluid' | 'auto' | string;
  /** data-ad-layout */
  layout?: 'in-article' | string;
  /** data-ad-layout-key */
  layoutKey?: string;
  /** data-full-width-responsive */
  widthResponsive?: 'true' | 'false';
  /** style attribute */
  style?: React.CSSProperties;
  /** custom class name */
  className?: string;
}

interface AdsenseState extends AdsenseProperties {
  currentSlot: Record<string, any>;
}

class Adsense extends React.Component<AdsenseProperties, AdsenseState> {
  constructor(props: AdsenseProperties) {
    super(props);
    const defaults: AdsenseState = {
      slot: '',
      client: '',
      format: 'auto',
      style: {},
      currentSlot: {}
    };
    this.state = Object.assign(defaults, props);
  }

  componentDidMount(): void {
    if (!window.adsbygoogle) window.adsbygoogle = [] as any;
  }

  render() {
    const props = {
      'data-ad-slot': this.state.slot,
      'data-ad-client': 'ca-pub-' + this.state.client.replace('ca-pub-', ''),
      'data-ad-format': this.state.format,
      style: { display: 'block', ...this.state.style },
      className: utils
        .arrayDedupe(['adsbygoogle'].concat((this.state.className || '').split(' ')))
        //filter empty
        .filter(str => str.length > 0)
        // rejoin
        .join(' ')
    } as Record<string, any>;
    if (this.state.widthResponsive) {
      props['data-full-width-responsive'] = this.state.widthResponsive;
    }
    if (/dev/i.test(process.env.NODE_ENV)) {
      // enable adsense test on development mode
      props['data-adtest'] = 'on';
    }

    return <ins {...props}></ins>;
  }
}

export default Adsense;
