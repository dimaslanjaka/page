import React from 'react';
import { getCookie, setCookie } from '../assets/js/cookie';
import { arrayDedupe, loadJS } from '../utils';

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
  className?: string;
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

    //window.adsbygoogle.pauseAdRequests = 1;
    let pub: string;
    if (this.state.currentSlot.pub) {
      pub = this.state.currentSlot.pub;
    } else {
      // select client pub from ins
      pub = arrayDedupe(
        Array.from(document.querySelectorAll('ins.adsbygoogle')).map(el => el.getAttribute('data-ad-client')),
      )[0];
    }

    if (pub) {
      pub = pub.replace('ca-pub-', '');
      loadJS(`//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${pub}`, {
        onload: this.onloadAds.bind(this),
      });
    }
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

    return <ins {...props}></ins>;
  }

  onloadAds() {
    // fix undefined vars
    if (!window.adsbygoogle) window.adsbygoogle = [];
    if (!window.adsense_option) window.adsense_option = {};

    const allIns = Array.from(document.querySelectorAll('ins'));
    console.log(
      'adsense onload',
      allIns.map(el => el.getAttribute('data-ad-slot')),
    );

    for (let i = 0; i < allIns.length; i++) {
      // log('apply banner', i + 1);
      const ins = allIns[i];
      if (!ins) {
        continue;
      } else if (!ins.getAttribute('data-ad-slot') || !ins.getAttribute('data-ad-client')) {
        // ins.adsbygoogle-noablate is default adsense hidden element
        if (!ins.classList.contains('adsbygoogle-noablate')) {
          console.log('no data-ad-client', ins);
        }
        continue;
      }
      const adclient = ins.getAttribute('data-ad-client').replace('ca-pub-', '');
      const anonclient = adclient.slice(0, 3) + 'xxx' + adclient.slice(adclient.length - 3);
      const adsid = ins.getAttribute('data-ad-slot');
      const anonid = adsid.slice(0, 3) + 'xxx' + adsid.slice(adsid.length - 3);
      const bg = `//via.placeholder.com/200x50/FFFFFF/000000/?text=${anonclient}-${anonid}`;
      ins.style.backgroundImage = `url('${bg}')`;
      ins.style.backgroundRepeat = 'no-repeat';
      ins.style.minHeight = '50px';
      // log('parent width banner', i + 0, ins.parentElement.offsetWidth);

      const slot = ins.getAttribute('data-ad-slot').trim();
      if (ins.parentElement.offsetWidth < 250) {
        // remove banner when parent width is 0 or display: none
        if (window.adsense_option.remove) {
          console.log(i + 1, 'remove', slot);
          ins.remove();
        }
      } else if (ins.innerHTML.trim().length === 0) {
        console.log('push', i + 1, slot, 'width', ins.parentElement.offsetWidth);
        //window.adsbygoogle.push({});
      }
    }
  }

  randomAds() {
    // select ads
    // cookie key
    const ck = 'currentAds';
    // select previous ads id from cookie
    const ca = getCookie(ck) || [];
    let currentSlot = this.allAds.find(item => item.pub === ca);
    this.setState({
      currentSlot,
    });
    if (ca.length > 0 && typeof currentSlot === 'object') {
      console.log('cached pub', ca);
    } else {
      currentSlot = this.allAds.sort(function () {
        // shuffle
        return 0.5 - Math.random();
      })[0];

      if (location.pathname != '/') {
        console.log('caching pub', currentSlot.pub);
        setCookie(
          ck,
          currentSlot.pub,
          1,
          location.pathname,
          location.hostname,
          location.protocol.includes('https') && location.host === 'www.webmanajemen.com',
        );
      }
    }
  }
}
