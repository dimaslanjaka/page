import React from 'react';
import { arrayDedupe } from '../utils';
import '../utils/adsense';

interface AdsenseProperties {
  /** data-ad-slot */
  slot?: string;
  /** data-ad-client */
  client?: string;
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
  /** custom channel ID
   * @link https://support.google.com/adsense/answer/1354736?hl=en#zippy=%2Csetting-custom-channels-dynamically
   */
  channel?: string;
  /** custom ad width in pixel */
  width?: number;
  /** custom ad height in pixel */
  height?: number;
}

interface AdsenseState extends AdsenseProperties {
  currentSlot: Record<string, any>;
}

export class Adsense extends React.Component<AdsenseProperties, AdsenseState> {
  property = {};
  allAds = [
    {
      name: 'kiki',
      pub: '2188063137129806',
      ads: [
        {
          style: 'display: block !important; text-align: center',
          'data-ad-layout': 'in-article',
          'data-ad-format': 'fluid',
          'data-ad-slot': '5634823028',
        },
        {
          style: 'display: block !important; text-align: center',
          'data-ad-layout': 'in-article',
          'data-ad-format': 'fluid',
          'data-ad-slot': '8481296455',
        },
        {
          style: 'display:block !important',
          'data-ad-slot': '2667720583',
          'data-ad-format': 'auto',
          'data-full-width-responsive': 'true',
        },
        {
          style: 'display:block !important',
          'data-ad-format': 'fluid',
          'data-ad-layout-key': '-gw-3+1f-3d+2z',
          'data-ad-slot': '6979059162',
        },
      ],
    },
  ];

  constructor(props: AdsenseProperties) {
    super(props);
    const defaults: AdsenseState = {
      slot: '',
      client: '',
      format: 'auto',
      style: {},
      currentSlot: {},
    };
    this.state = Object.assign(defaults, props);
  }

  componentDidMount(): void {
    if (!window.adsbygoogle) window.adsbygoogle = [] as any;
    const params = { google_ad_slot: this.state.slot } as Record<string, any>;
    if (this.state.channel) {
      // push custom channel
      params.google_ad_channel = this.state.channel;
    }
    if (this.state.width) {
      params.google_ad_width = this.state.width;
    }
    if (this.state.height) {
      params.google_ad_height = this.state.height;
    }
    window.adsbygoogle.push({ params });
  }

  componentDidUpdate(prevProps: Readonly<AdsenseProperties>, prevState: Readonly<AdsenseState>, snapshot?: any): void {
    console.log({ prevProps, prevState, snapshot });
  }

  render(): React.ReactNode {
    const props = {
      'data-ad-slot': this.state.slot,
      'data-ad-client': 'ca-pub-' + this.state.client.replace('ca-pub-', ''),
      'data-ad-format': this.state.format,
      style: { display: 'block', ...this.state.style },
      className: arrayDedupe(['adsbygoogle'].concat(this.state.className.split(' ')))
        // rejoin
        .join(' '),
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
