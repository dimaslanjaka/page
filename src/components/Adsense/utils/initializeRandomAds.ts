import { array_shuffle, insertAfter, loadJS } from 'src/utils';
import { paramBuilder } from './config';
import createIns from './createIns';
import findRootPlaces from './findRootPlaces';
import getCurrentSlot from './getCurrentSlot';
import isLocalHostname from './isLocalHostname';

/**
 * initialize ads on random places
 * * you can specify places on `window.adsense_option.places`
 */
export default function initializeRandomAds() {
  const { places = [] } = window.adsense_option || {};
  const currentSlot = getCurrentSlot();
  const roots = findRootPlaces();

  // select random place
  let adsPlaces: (Element | HTMLElement)[] = [];

  // get from window.adsense_option.places
  if (places.length > 0) {
    adsPlaces = array_shuffle(places)
      .map(selector => roots.map(root => Array.from(root.querySelectorAll(selector))))
      .flat(2);
  } else {
    adsPlaces = array_shuffle(roots.map(getAllPlaces).flat(1)).filter(el => el !== null);
  }

  // console.log('total targeted ads places', adsPlaces.length, ...adsPlaces.map(el => el.tagName));
  // console.log('total ads left', currentSlot.ads.length);

  if (adsPlaces.length > 0 && currentSlot.ads.length > 0) {
    array_shuffle(adsPlaces).forEach((el, i) => {
      const prevEl = el.previousElementSibling || ({} as Element);
      const nextEl = el.nextElementSibling || ({} as Element);
      if (prevEl.tagName === 'INS' || nextEl.tagName === 'INS' || el.tagName == 'INS') {
        console.error('same ins at index', i);
        // skip if there are adjacent `ins` elements
        return;
      }
      const bannedElement = [el.classList.contains('fixed-top')].some(Boolean);
      // console.log(el.clientWidth, el.scrollWidth, el.clientHeight, el.scrollHeight);
      const isWidthAvailable = el.clientWidth > 250 && el.scrollWidth > 250;
      if (isWidthAvailable && currentSlot.ads.length > 0 && !bannedElement) {
        const ad = currentSlot.ads.shift();
        ad['data-ad-client'] = 'ca-pub-' + currentSlot.pub.replace('ca-pub-', '');
        if (isLocalHostname()) {
          ad['data-adtest'] = 'on';
        }
        const ins = createIns(ad);
        if (ins) {
          console.log('apply ads to', el.tagName, el.className, '#' + el.id);
          insertAfter(ins, el);
        }
      } else if (!isWidthAvailable) {
        console.error('width', el.tagName, 'is insufficient');
      } else if (bannedElement) {
        console.error(el.tagName, el.className, 'is banned from ads');
      }
    });

    // for (let i = 0; i < currentSlot.ads.length; i++) {
    //   const attr = currentSlot.ads[i];
    //   if (attr) {
    //     attr['data-ad-client'] = 'ca-pub-' + currentSlot.pub.replace('ca-pub-', '');
    //     let nextOf = adsPlaces.shift(); // get first element and remove it from list
    //     // iterate adsPlaces
    //     while (adsPlaces.length > 0) {
    //       // find next when nextOf = null
    //       if (adsPlaces.length > 0) {
    //         // select next place
    //         nextOf = adsPlaces.shift();
    //       } else {
    //         // if ads places empty, put to any div
    //         nextOf = document.querySelector('div');
    //       }
    //     }
    //     if (nextOf) {
    //       console.log(i + 1, 'add banner', attr['data-ad-slot']);
    //       const prevEl = nextOf.previousElementSibling || ({} as Element);
    //       const nextEl = nextOf.nextElementSibling || ({} as Element);
    //       if (prevEl.tagName === 'INS' || nextEl.tagName === 'INS' || nextOf.tagName == 'INS') {
    //         // push back the ads
    //         currentSlot.ads.push(attr);
    //         // skip on same ins
    //         // prevent banner side on side
    //         continue;
    //       }
    //       const ins = createIns(attr);
    //       insertAfter(ins, nextOf);
    //     }
    //   }
    // }
  }

  const pageAd = `//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${currentSlot.pub.replace(
    'ca-pub-',
    ''
  )}`;
  const existingSources = Array.from(document.scripts).map(el => el.src);
  //console.info({ existingSources });
  if (!existingSources.some(str => str.includes('pagead/js/adsbygoogle.js'))) {
    // create pagead when not existing page ad
    loadJS(pageAd, { onload: onloadAds });
  } else {
    // load callback instead
    onloadAds();
  }

  //loadJS("//imasdk.googleapis.com/js/sdkloader/ima3.js")
}

/**
 * get all ads places
 * @param from
 */
function getAllPlaces(from: Element | Document) {
  return Array.from(from.querySelectorAll('h1,h2,h3,h4,h5,pre,header,hr,br,table,blockquote'))
    .sort(function () {
      return 0.5 - Math.random();
    })
    .filter(el => el !== null);
}

export function onloadAds() {
  const allIns = Array.from(document.querySelectorAll('ins.adsbygoogle'));
  console.info('total ins', allIns.length);

  for (let i = 0; i < allIns.length; i++) {
    // log('apply banner', i + 1);
    const ins = allIns[i];
    if (!ins) {
      continue;
    } else if (!ins.getAttribute('data-ad-client')) {
      // ins.adsbygoogle-noablate is default adsense hidden element
      if (!ins.classList.contains('adsbygoogle-noablate')) {
        console.error('no data-ad-client', ins);
      }
      continue;
    } else if (ins.getAttribute('data-adsbygoogle-status') === 'done') {
      console.error('adsense already loaded', ins);
      continue;
    }

    // log('parent width banner', i + 0, ins.parentElement.offsetWidth);

    const slot = ins.getAttribute('data-ad-slot').trim();
    const client = ins.getAttribute('data-ad-client').trim();
    // if (ins.parentElement.offsetWidth < 250) {
    //   // remove banner when parent width is 0 or display: none
    //   if (window.adsense_option.remove) {
    //     console.info(i + 1, 'remove', slot);
    //     ins.remove();
    //   }
    // } else if (ins.innerHTML.trim().length === 0) {
    //   console.info('adsbygoogle.push', i + 1, '.' + ins.classList, {
    //     slot,
    //     client,
    //     width: {
    //       parent: ins.parentElement.offsetWidth,
    //       self: ins.offsetWidth
    //     },
    //     height: {
    //       parent: ins.parentElement.offsetHeight,
    //       self: ins.offsetHeight
    //     }
    //   });
    //   window.adsbygoogle.push({
    //     params: paramBuilder({ slot, client })
    //   });
    // }

    window.adsbygoogle.push({
      params: paramBuilder({ slot, client })
    });
  }
}
