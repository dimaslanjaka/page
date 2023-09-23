import { array_shuffle } from '@/utils';

// initialize undefined window properties
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  if (!window.adsense_option) window.adsense_option = {};
  if (!window.adsbygoogle) window.adsbygoogle = [];
  if (typeof window.adsenseInitialized === 'undefined') window.adsenseInitialized = false;
}

/**
 * shuffled all ads
 */
export const allAds = array_shuffle([
  {
    name: 'kiki',
    pub: '2188063137129806',
    ads: [
      {
        style: 'display: block !important; text-align: center',
        'data-ad-layout': 'in-article',
        'data-ad-format': 'fluid',
        'data-ad-slot': '5634823028'
      },
      {
        style: 'display: block !important; text-align: center',
        'data-ad-layout': 'in-article',
        'data-ad-format': 'fluid',
        'data-ad-slot': '8481296455'
      },
      {
        style: 'display:block !important',
        'data-ad-slot': '2667720583',
        'data-ad-format': 'auto',
        'data-full-width-responsive': 'true'
      },
      {
        style: 'display:block !important',
        'data-ad-format': 'fluid',
        'data-ad-layout-key': '-gw-3+1f-3d+2z',
        'data-ad-slot': '6979059162'
      }
    ]
  }
]);

export interface AdsenseOption {
  /**
   * remove banner when parent width is 0 or display: none
   */
  remove?: boolean;
  /**
   * current ad slot
   */
  currentSlot?: (typeof allAds)[number];
}

export interface ParamsAdsByGoogle {
  /** data-ad-slot */
  slot?: string;
  /** data-ad-client */
  client?: string;
  /** custom channel ID
   * @link https://support.google.com/adsense/answer/1354736?hl=en#zippy=%2Csetting-custom-channels-dynamically
   */
  channel?: string;
  /** custom ad width in pixel */
  width?: number;
  /** custom ad height in pixel */
  height?: number;
}

/**
 * build .push params
 * @param opt
 * @returns
 * @example
 * (adsbygoogle = window.adsbygoogle || []).push({
 *   params: { \/\* will generate this \*\/ google_ad_channel: "channel id number" }
 * });
 */
export function paramBuilder(opt: ParamsAdsByGoogle) {
  const params = { google_ad_slot: opt.slot, google_ad_client: opt.client } as Record<string, any>;
  if (opt.channel) {
    // push custom channel
    params.google_ad_channel = opt.channel;
  }
  if (opt.width) {
    params.google_ad_width = opt.width;
  }
  if (opt.height) {
    params.google_ad_height = opt.height;
  }
  return params;
}

/**
 * remove ads when exist in document
 * @param ads
 * @returns
 */
export function removeDuplicateAds(
  adsConfig: typeof allAds | (typeof allAds)[number]['ads']
): typeof allAds | (typeof allAds)[number]['ads'] {
  const filter = (item: (typeof allAds)[number]['ads']) =>
    item.filter(ads => {
      if (typeof document !== 'undefined') {
        // filter the ad slot not exist in dom tree
        return document.querySelectorAll(`[data-ad-slot="${ads['data-ad-slot']}"]`).length === 0;
      } else {
        // this script running on NodeJS
        return true;
      }
    });

  if ('ads' in adsConfig === false) {
    return (adsConfig as typeof allAds).map(item => {
      item.ads = filter(item.ads);
      return item;
    });
  } else {
    return filter(adsConfig as (typeof allAds)[number]['ads']);
  }
}

export const getAllAds = () => removeDuplicateAds(allAds);
