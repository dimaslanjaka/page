// 5 6 ^ %
//

import { islocalhost } from '@utils/index';
import applyEnviromentAds from './applyEnviromentAds';
import fillFixedPosition from './fillFixedPosition';
import getCurrentSlot from './getCurrentSlot';
import initializeRandomAds from './initializeRandomAds';

/**
 * ADSENSE FULLY AUTOMATIC
 */

/** Option */
if (!window.adsense_option)
  window.adsense_option = {
    places: []
  };

/**
 * do not show ads to these page title
 */
const banned = [/lagu|jackpot|montok|hack|crack|nulled/gi]
  .map(regex => regex.test(document.title))
  .some(result => result == true);
/** localhost indicator */
const localhost = islocalhost();

/**
 * Trigger adsense
 * @param _e
 * @returns
 */
export function triggerAdsense(_e?: Event) {
  // run once
  if (window.adsenseInitialized) return;
  window.adsenseInitialized = true;

  // apply current slot
  window.adsense_option.currentSlot = getCurrentSlot();
  fillFixedPosition(window.adsense_option.currentSlot);
  initializeRandomAds();
  applyEnviromentAds();
}

/*if (typeof module === 'object' && 'exports' in module) {
  module.exports = { triggerAdsense };
}*/

/** main */

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  if (!banned && !localhost) {
    // skip showing ads on non-domain host
    // skip showing ads from banned page
    if (document.readyState !== 'loading') {
      // fix react
      // document.addEventListener('load', triggerAdsense);
      document.addEventListener('scroll', triggerAdsense);
      //triggerAdsense(undefined);
    } else {
      document.addEventListener('DOMContentLoaded', triggerAdsense);
    }
  }
}

// console.info('adsense', {
//   localhost,
//   banned,
//   state: document.readyState,
//   react:
//     window.React ||
//     window.__REACT_DEVTOOLS_GLOBAL_HOOK__ ||
//     document.querySelector('[data-reactroot], [data-reactid]') ||
//     Array.from(document.querySelectorAll('*')).some(e => typeof e['_reactRootContainer'] !== 'undefined') ||
//     Array.from(document.querySelectorAll('[id]')).some(e => typeof e['_reactRootContainer'] !== 'undefined'),
// });
