import isLocalHostname from './isLocalHostname';

/**
 * initialize background image, height, ad-test to existing `ins` tags
 */
export default function applyEnviromentAds() {
  // apply ad testing
  const existingIns = Array.from(document.querySelectorAll('ins[class*=adsbygoogle]'));
  console.info('existing ins', existingIns.length);

  for (let i = 0; i < existingIns.length; i++) {
    const ins = existingIns[i] as HTMLElement | undefined;
    if (!ins) continue;
    if (
      ins.hasAttribute('data-ad-client') &&
      ins.hasAttribute('data-ad-slot') &&
      // skip modify background for ins created by './createIns.ts'
      !ins.hasAttribute('dynamic')
    ) {
      // apply background image and height
      const adclient = ins.getAttribute('data-ad-client')?.replace('ca-pub-', '');
      const anonclient = adclient.slice(0, 3) + 'xxx' + adclient.slice(adclient.length - 3);
      const adsid = ins.getAttribute('data-ad-slot');
      const anonid = adsid.slice(0, 3) + 'xxx' + adsid.slice(adsid.length - 3);
      const bg = `//via.placeholder.com/200x50/FFFFFF/000000/?text=${anonclient}-${anonid}`;
      ins.style.backgroundImage = `url('${bg}')`;
      // ins.style.backgroundImage = 'url(//picsum.photos/1000/300)';
      ins.style.backgroundRepeat = 'no-repeat';
      ins.style.minHeight = '50px';
    }

    // apply ad test to non-localhost ip and process.env.NODE_ENV is dev

    if (/dev/i.test(process.env.NODE_ENV) || isLocalHostname()) {
      console.info('apply test ad to existing ins', ins.getAttribute('data-ad-slot'));
      ins.setAttribute('data-adtest', 'on');
    }
  }
}
