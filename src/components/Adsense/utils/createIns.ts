import getCurrentSlot from './getCurrentSlot';
import isLocalHostname from './isLocalHostname';

/**
 * create ins
 * @param attributes
 * @returns
 */
export default function createIns(attributes: Record<string, any>) {
  let ins: HTMLElement | null = null;

  const fallbackDiv = (ins: HTMLElement) => {
    ins.style.backgroundRepeat = 'no-repeat';
    ins.style.backgroundSize = 'cover';
    ins.style.minHeight = '250px';
    ins.style.width = '100%';
    for (const key in attributes) {
      if (key === 'style') continue;
      ins.setAttribute(key, attributes[key]);
    }
  };

  const adsid = attributes['data-ad-slot'];
  if (document.querySelector(`[data-ad-slot="${adsid}"]`)) {
    console.error('ad slot', adsid, 'already deployed');
    ins = document.createElement('div');
    ins.style.backgroundImage =
      'url(//images.velog.io/images/dhlee91/post/6afa58f4-77f2-470e-8519-ad11013919f8/react-logo.png)';
    fallbackDiv(ins);
    return ins;
  }

  if (isLocalHostname()) {
    ins = document.createElement('div');
    ins.style.backgroundImage = 'url(//picsum.photos/1000/300)';
    fallbackDiv(ins);
    return ins;
  }

  if (!attributes['data-ad-client']) {
    attributes['data-ad-client'] = 'ca-pub-' + getCurrentSlot().pub;
  }
  ins = document.createElement('ins');
  for (const key in attributes) {
    ins.setAttribute(key, attributes[key]);
  }
  if (!ins.classList.contains('adsbygoogle')) {
    ins.classList.add('adsbygoogle');
  }
  if (!ins.classList.contains('bannerAds')) {
    ins.classList.add('bannerAds');
  }
  if (isLocalHostname()) {
    ins.setAttribute('data-adtest', 'on');
  }

  // ins.style.backgroundImage = 'url(//picsum.photos/1000/300)';
  // ins.style.backgroundRepeat = 'no-repeat';
  // ins.style.backgroundSize = 'cover';
  // ins.style.minWidth = '250px';
  // ins.style.minHeight = '50px';
  // apply background image and height
  const adclient = attributes['data-ad-client']?.replace('ca-pub-', '');
  const anonclient = adclient.slice(0, 3) + 'xxx' + adclient.slice(adclient.length - 3);
  const anonid = adsid.slice(0, 3) + 'xxx' + adsid.slice(adsid.length - 3);
  const bg = `//via.placeholder.com/200x50/FFFFFF/000000/?text=${anonclient}-${anonid}`;
  ins.style.backgroundImage = `url('${bg}')`;
  ins.style.backgroundRepeat = 'no-repeat';
  ins.style.minHeight = '50px';
  ins.style.maxHeight = '100%';
  ins.setAttribute('dynamic', 'true');
  // ins.style.minHeight = '250px';
  return ins;
}
