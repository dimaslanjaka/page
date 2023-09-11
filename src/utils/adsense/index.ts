// 5 6 ^ %

import { array_shuffle, insertAfter, islocalhost, loadJS, replaceWith } from '..';
import { getCookie, setCookie } from '../../assets/js/cookie';
import { allAds, paramBuilder } from './config';

/**
 * ADSENSE FULLY AUTOMATIC
 */

/**
 * Prevent Duplicate
 */
let called = false;

/** Option */
if (!window.adsense_option) window.adsense_option = {};

/**
 * do not show ads to these page title
 */
const banned = [/lagu|jackpot|montok|hack|crack|nulled/gi]
  .map(regex => regex.test(document.title))
  .some(result => result == true);
/** localhost indicator */
const localhost = islocalhost();
/** current slot */
let currentSlot = window.adsense_option.currentSlot;

/**
 * Trigger adsense
 * @param _e
 * @returns
 */
function triggerAdsense(_e?: Event) {
  // run once
  if (called) return;
  called = true;

  // apply current slot
  window.adsense_option.currentSlot = getCurrentSlot();
  fillFixedPosition(window.adsense_option.currentSlot);
  initializeRandomAds();
  applyEnviromentAds();
}

/**
 * get current page ad slot
 * @returns
 */
export function getCurrentSlot() {
  // select ads
  // cookie key
  const ck = 'currentAds';
  // select previous ads id from cookie
  const ca = getCookie(ck) || '';
  currentSlot = allAds.find(item => item.pub === ca);

  if (ca.length > 0 && typeof currentSlot === 'object') {
    console.log('cached pub', ca);
  } else {
    currentSlot = allAds[0];

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
  // apply to window.adsense_option.currentSlot
  window.adsense_option.currentSlot = currentSlot;
  return currentSlot;
}

/**
 * find element *[adsense="fill"] for render first
 */
export function fillFixedPosition(currentSlot?: (typeof allAds)[number]) {
  if (!currentSlot) currentSlot = getCurrentSlot();

  const fixedPlacement = Array.from(document.querySelectorAll('[adsense="fill"]'));
  if (fixedPlacement.length > 0) {
    for (let i = 0; i < fixedPlacement.length; i++) {
      const place = fixedPlacement[i];
      let attr = currentSlot.ads.shift();
      // ad slot empty, break
      if (!attr) break;
      let doneFill = false;
      let hasExisting = document.querySelector(`[data-ad-slot="${attr['data-ad-slot']}"]`);
      if (hasExisting) {
        while (!doneFill) {
          // skip slot empty
          if (currentSlot.ads.length === 0) {
            doneFill = true;
            break;
          }
          attr = currentSlot.ads.shift();
          hasExisting = document.querySelector(`[data-ad-slot="${attr['data-ad-slot']}"]`);
          if (!hasExisting) {
            doneFill = true;
            break;
          }
        }
      }
      if (attr) {
        attr['data-ad-client'] = 'ca-pub-' + currentSlot.pub.replace('ca-pub-', '');
        const ins = createIns(attr);
        console.log('insert ads to adsense="fill"', i + 1);
        replaceWith(ins, place);
      }
    }
  }
}

/**
 * initialize background image, height, ad-test to existing `ins` tags
 */
export function applyEnviromentAds() {
  // apply ad testing
  const existingIns = Array.from(document.querySelectorAll('ins[class*=adsbygoogle]'));
  console.log('existing ins', existingIns.length);

  for (let i = 0; i < existingIns.length; i++) {
    const ins = existingIns[i] as HTMLElement | undefined;
    if (!ins) continue;
    if (ins.hasAttribute('data-ad-client')) {
      // apply background image and height
      const adclient = ins.getAttribute('data-ad-client')?.replace('ca-pub-', '');
      const anonclient = adclient.slice(0, 3) + 'xxx' + adclient.slice(adclient.length - 3);
      const adsid = ins.getAttribute('data-ad-slot');
      const anonid = adsid.slice(0, 3) + 'xxx' + adsid.slice(adsid.length - 3);
      const bg = `//via.placeholder.com/200x50/FFFFFF/000000/?text=${anonclient}-${anonid}`;
      ins.style.backgroundImage = `url('${bg}')`;
      ins.style.backgroundRepeat = 'no-repeat';
      ins.style.minHeight = '50px';
    }

    if (localhost) {
      console.log('apply test ad to existing ins', ins.getAttribute('data-ad-slot'));
      ins.setAttribute('data-adtest', 'on');
    }
  }
}

export function initializeRandomAds() {
  // find content/article wrapper
  let findPlaces = Array.from(document.querySelectorAll('article'));
  if (findPlaces.length === 0) {
    // theme-next main content
    findPlaces = Array.from(document.querySelectorAll('.page.main-inner'));
  }
  if (findPlaces.length === 0) {
    findPlaces = Array.from(document.querySelectorAll('#main-content'));
  }
  if (findPlaces.length === 0) {
    // bootstrap wrapper
    findPlaces = Array.from(document.querySelectorAll('#bootstrap-wrapper'));
  }
  if (findPlaces.length === 0) {
    // typedoc documentation page
    findPlaces = Array.from(document.querySelectorAll('[class="col-8 col-content"]'));
  }
  // fallback search at body
  if (findPlaces.length === 0) {
    findPlaces = Array.from(document.querySelectorAll('body'));
  }

  // select random place
  const adsPlaces = array_shuffle(findPlaces.map(getAllPlaces).flat(1)).filter(el => el !== null);

  console.log('total targeted ads places', adsPlaces.length);

  if (adsPlaces.length > 0 && currentSlot.ads.length > 0) {
    for (let i = 0; i < currentSlot.ads.length; i++) {
      const attr = currentSlot.ads[i];
      if (attr) {
        attr['data-ad-client'] = 'ca-pub-' + currentSlot.pub.replace('ca-pub-', '');

        let nextOf = adsPlaces.shift(); // get first element and remove it from list
        // iterate adsPlaces
        while (adsPlaces.length > 0) {
          // find next when nextOf = null
          if (adsPlaces.length > 0) {
            // select next place
            nextOf = adsPlaces.shift();
          } else {
            // if ads places empty, put to any div
            nextOf = document.querySelector('div');
          }
        }

        if (nextOf) {
          console.log(i + 1, 'add banner', attr['data-ad-slot']);
          const prevEl = nextOf.previousElementSibling || ({} as Element);
          const nextEl = nextOf.nextElementSibling || ({} as Element);
          if (prevEl.tagName === 'INS' || nextEl.tagName === 'INS' || nextOf.tagName == 'INS') {
            // push back the ads
            currentSlot.ads.push(attr);
            // skip on same ins
            // prevent banner side on side
            continue;
          }
          const ins = createIns(attr);
          insertAfter(ins, nextOf);
        }
      }
    }
  }

  const pageAd = `//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${currentSlot.pub.replace(
    'ca-pub-',
    '',
  )}`;
  const existingSources = Array.from(document.scripts).map(el => el.src);
  //console.log({ existingSources });
  if (!existingSources.some(str => str.includes('pagead/js/adsbygoogle.js'))) {
    // create pagead when not existing page ad
    loadJS(pageAd, { onload: onloadAds });
  } else {
    // load callback instead
    onloadAds();
  }

  //loadJS("//imasdk.googleapis.com/js/sdkloader/ima3.js")
}

function onloadAds() {
  const allIns = Array.from(document.querySelectorAll('ins'));
  console.log('total ins', allIns.length);

  for (let i = 0; i < allIns.length; i++) {
    // log('apply banner', i + 1);
    const ins = allIns[i];
    if (!ins) {
      continue;
    } else if (!ins.getAttribute('data-ad-client')) {
      // ins.adsbygoogle-noablate is default adsense hidden element
      if (!ins.classList.contains('adsbygoogle-noablate')) {
        console.log('no data-ad-client', ins);
      }
      continue;
    }

    // log('parent width banner', i + 0, ins.parentElement.offsetWidth);

    const slot = ins.getAttribute('data-ad-slot').trim();
    if (ins.parentElement.offsetWidth < 250) {
      // remove banner when parent width is 0 or display: none
      if (window.adsense_option.remove) {
        console.log(i + 1, 'remove', slot);
        ins.remove();
      }
    } else if (ins.innerHTML.trim().length === 0) {
      console.log(i + 1, slot, 'width', ins.parentElement.offsetWidth);
      // (adsbygoogle = window.adsbygoogle || []).push({});
      if (!window.adsbygoogle) window.adsbygoogle = [];
      window.adsbygoogle.push({
        params: paramBuilder({ slot, client: ins.getAttribute('data-ad-client').trim() }),
      });
    }
  }
}

/**
 * create ins
 * @param attributes
 * @returns
 */
function createIns(attributes: Record<string, any>) {
  if (!attributes['data-ad-client']) {
    attributes['data-ad-client'] = 'ca-pub-' + currentSlot.pub;
  }
  const ins = document.createElement('ins');
  Object.keys(attributes).forEach(key => {
    ins.setAttribute(key, attributes[key]);
  });
  if (!ins.classList.contains('adsbygoogle')) {
    ins.classList.add('adsbygoogle');
  }
  if (!ins.classList.contains('bannerAds')) {
    ins.classList.add('bannerAds');
  }
  if (localhost) {
    ins.setAttribute('data-adtest', 'on');
  }
  ins.style.minWidth = '250px';
  ins.style.minHeight = '50px';
  return ins;
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

/*if (typeof module === 'object' && 'exports' in module) {
  module.exports = { triggerAdsense };
}*/

/** main */

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  if (!banned) {
    // skip showing ads on non-domain host
    // skip showing ads from banned page
    if (document.readyState !== 'loading') {
      // fix react
      document.addEventListener('scroll', triggerAdsense);
      //triggerAdsense(undefined);
    } else {
      document.addEventListener('DOMContentLoaded', triggerAdsense);
    }
  }
}

// console.log('adsense', {
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
