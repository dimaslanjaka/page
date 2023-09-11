import { array_shuffle } from '../utils';

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
    ].filter(ads => {
      if (typeof document !== 'undefined') {
        // filter the ad slot not exist in dom tree
        return document.querySelectorAll(`[data-ad-slot="${ads['data-ad-slot']}"]`).length === 0;
      } else {
        // this script running on NodeJS
        return true;
      }
    }),
  },
]);
