import { allAds } from '../../utils/adsense/config';

declare global {
  interface Window {
    dataLayer: Record<string, any>[];
    opera: Record<string, any>;
    opr: Record<string, any>;
    safari: Record<string, any>;
    adsense_option: AdsenseOption;
    adsbygoogle: any;
  }
}

interface AdsenseOption {
  /**
   * remove banner when parent width is 0 or display: none
   */
  remove?: boolean;
  /**
   * current ad slot
   */
  currentSlot?: (typeof allAds)[number];
}
