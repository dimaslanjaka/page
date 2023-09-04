//import * as cookies from './cookie.js';
const cookies = require('./cookie');

// 5 6 ^ %

/**
 * ADSENSE FULLY AUTOMATIC
 */

/*document.addEventListener('DOMContentLoaded', function () {
  if (!islocalhost()) {
    window.addEventListener('scroll', triggerAdsense);
  } else {
    triggerAdsense();
  }
});*/

/**
 * do not show ads to these page title
 */
const banned = [/lagu|jackpot|montok|hack|crack|nulled/gi]
  .map(regex => regex.test(document.title))
  .some(result => result == true);

if (!islocalhost() && !banned) {
  // skip showing ads on non-domain host
  // skip showing ads from banned page
  document.addEventListener('DOMContentLoaded', triggerAdsense);
}

/**
 * Prevent Duplicate
 */
let called = false;

/** Option */
if (!window.adsense_option) window.adsense_option = {};

/**
 * debug on localhost
 */
const adsense_log =
  islocalhost() || window['adsense-debug'] === true
    ? console.log
    : function (..._args) {
        //
      };

const allAds = [
  {
    name: 'kiki',
    pub: '2188063137129806',
    ads: [
      {
        style: 'display: block; text-align: center',
        'data-ad-layout': 'in-article',
        'data-ad-format': 'fluid',
        'data-ad-slot': '5634823028',
      },
      {
        style: 'display: block; text-align: center',
        'data-ad-layout': 'in-article',
        'data-ad-format': 'fluid',
        'data-ad-slot': '8481296455',
      },
      {
        style: 'display:block',
        'data-ad-slot': '2667720583',
        'data-ad-format': 'auto',
        'data-full-width-responsive': 'true',
      },
      {
        style: 'display:block',
        'data-ad-format': 'fluid',
        'data-ad-layout-key': '-gw-3+1f-3d+2z',
        'data-ad-slot': '6979059162',
      },
    ],
  },
].sort(function () {
  // shuffle
  return 0.5 - Math.random();
});

/**
 * @type {typeof allAds[number]}
 */
let currentSlot = [];

/**
 * Trigger adsense
 * @param {Event?} _e
 * @returns
 */
function triggerAdsense(_e) {
  if (called) return;
  called = true;

  const existingIns = Array.from(document.querySelectorAll('ins[class*=adsbygoogle]'));
  adsense_log('existing ins', existingIns.length);

  for (let i = 0; i < existingIns.length; i++) {
    const ins = existingIns[i];

    if (islocalhost()) {
      adsense_log('apply test ad to existing ins', i + 1);
      ins.setAttribute('data-adtest', 'on');
    }
  }

  // select ads
  // cookie key
  const ck = 'currentAds';
  // select previous ads id from cookie
  const ca = cookies.getCookie(ck) || [];
  /**
   * @type {typeof allAds[number]}
   */
  currentSlot = allAds.find(item => item.pub === ca);

  if (ca.length > 0 && typeof currentSlot === 'object') {
    adsense_log('cached pub', ca);
  } else {
    currentSlot = allAds[0];

    if (location.pathname != '/') {
      adsense_log('caching pub', currentSlot.pub);
      cookies.setCookie(
        ck,
        currentSlot.pub,
        1,
        location.pathname,
        location.hostname,
        location.protocol.includes('https') && location.host === 'www.webmanajemen.com',
      );
    }
  }

  adsense_log('total ads banner', currentSlot.ads.length);

  // find element *[adsense="fill"] for render first
  const fixedPlacement = Array.from(document.querySelectorAll('[adsense="fill"]'));
  if (fixedPlacement.length > 0) {
    for (let i = 0; i < fixedPlacement.length; i++) {
      const place = fixedPlacement[i];
      const attr = currentSlot.ads.shift();
      if (attr) {
        attr['data-ad-client'] = 'ca-pub-' + currentSlot.pub;
        const ins = createIns(attr);
        adsense_log('insert ads to adsense="fill"', i + 1);
        replaceWith(ins, place);
      }
    }
  }

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
  let adsPlaces = findPlaces
    .map(getAllPlaces)
    .flat(1)
    .sort(function () {
      return 0.5 - Math.random();
    })
    .filter(el => el !== null)
    .sort(function () {
      return 0.5 - Math.random();
    });

  adsense_log('total targeted ads places', adsPlaces.length);

  if (adsPlaces.length > 0 && currentSlot.ads.length > 0) {
    for (let i = 0; i < currentSlot.ads.length; i++) {
      const attr = currentSlot.ads[i];
      if (attr) {
        attr['data-ad-client'] = 'ca-pub-' + currentSlot.pub;

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
          adsense_log(i + 1, 'add banner', attr['data-ad-slot']);
          const prevEl = nextOf.previousElementSibling || {};
          const nextEl = nextOf.nextElementSibling || {};
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

  // create pagead
  const script = document.createElement('script');
  script.src = `//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${currentSlot.pub}`;
  script.async = true;
  script.setAttribute('crossorigin', 'anonymous');
  script.onload = onloadAds;
  document.head.appendChild(script);
}

function onloadAds() {
  const allIns = Array.from(document.querySelectorAll('ins'));
  adsense_log('total ins', allIns.length);

  for (let i = 0; i < allIns.length; i++) {
    // log('apply banner', i + 1);
    const ins = allIns[i];
    if (!ins) {
      continue;
    } else if (!ins.getAttribute('data-ad-client')) {
      adsense_log('no data-ad-client', ins);
      continue;
    }
    const adclient = ins.getAttribute('data-ad-client').replace('ca-pub-', '');
    const anonclient = adclient.slice(0, 3) + 'xxx' + adclient.slice(adclient.length - 3);
    const adsid = ins.getAttribute('data-ad-slot');
    const anonid = adsid.slice(0, 3) + 'xxx' + adsid.slice(adsid.length - 3);
    const bg = `//via.placeholder.com/200x50/FFFFFF/000000/?text=${anonclient}-${anonid}`;
    ins.style.backgroundImage = `url('${bg}')`;
    ins.style.backgroundRepeat = 'no-repeat';
    // log('parent width banner', i + 0, ins.parentElement.offsetWidth);

    const slot = ins.getAttribute('data-ad-client').trim();
    if (ins.parentElement.offsetWidth < 250) {
      // remove banner when parent width is 0 or display: none
      adsense_log(i + 1, 'remove', slot);
      if (window.adsense_option.remove) ins.remove();
    } else if (ins.innerHTML.trim().length === 0) {
      adsense_log(i + 1, slot, 'width', ins.parentElement.offsetWidth);
      // (adsbygoogle = window.adsbygoogle || []).push({});
      if (!window.adsbygoogle) window.adsbygoogle = [];
      window.adsbygoogle.push({});
    }
  }
}

/**
 * create ins
 * @param {Record<string,any>} attributes
 * @returns
 */
function createIns(attributes) {
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
  if (islocalhost()) {
    ins.setAttribute('data-adtest', 'on');
  }
  return ins;
}

/**
 * insert next other
 * @param {HTMLElement} newNode
 * @param {HTMLElement|undefined} referenceNode insert after this element
 */
function insertAfter(newNode, referenceNode) {
  if (referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  }
}

/**
 * get all ads places
 * @param {Element|Document} from
 */
function getAllPlaces(from) {
  return Array.from(from.querySelectorAll('h1,h2,h3,h4,h5,pre,header,hr,br,table,blockquote'))
    .sort(function () {
      return 0.5 - Math.random();
    })
    .filter(el => el !== null);
}

/**
 * Replace elements with new
 * @param {HTMLElement} newElement
 * @param {HTMLElement} oldElement
 */
function replaceWith(newElement, oldElement) {
  if (!oldElement.parentNode) {
    adsense_log(oldElement, 'parent null');
    let d = document.createElement('div');
    d.appendChild(oldElement);
  } else {
    //log(oldElement.parentNode.tagName);
    oldElement.parentNode.replaceChild(newElement, oldElement);
  }
}

/**
 * check current script running on localhost
 * @returns
 */
function islocalhost() {
  return /(localhost|127.0.0.1|192.168.[0-9]{1,3}\.[0-9]{1,3}):?/gim.test(window.location.host);
}

if (typeof module === 'object' && 'exports' in module) {
  module.exports = { islocalhost, triggerAdsense };
}