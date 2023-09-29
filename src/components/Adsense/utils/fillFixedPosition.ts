import createIns from './createIns';
import getCurrentSlot from './getCurrentSlot';

/**
 * find element *[adsense="fill"] for render first
 */
export default function fillFixedPosition(currentSlot?: ReturnType<typeof getCurrentSlot>) {
  if (!currentSlot) currentSlot = getCurrentSlot();

  const fixedPlacement = Array.from(document.querySelectorAll('[adsense="fill"]'));
  if (fixedPlacement.length > 0) {
    for (let i = 0; i < fixedPlacement.length; i++) {
      const placement = fixedPlacement[i];
      let attr: (typeof currentSlot.ads)[number];

      if (currentSlot.ads.length > 0) {
        attr = currentSlot.ads.shift();
        // ad slot empty, break
        // if (!attr) break;
        // let doneFill = false;
        // let hasExisting = document.querySelector(`[data-ad-slot="${attr['data-ad-slot']}"]`);
        // if (hasExisting) {
        //   while (!doneFill) {
        //     // skip slot empty
        //     if (currentSlot.ads.length === 0) {
        //       doneFill = true;
        //       break;
        //     }
        //     attr = currentSlot.ads.shift();
        //     hasExisting = document.querySelector(`[data-ad-slot="${attr['data-ad-slot']}"]`);
        //     if (!hasExisting) {
        //       doneFill = true;
        //       break;
        //     }
        //   }
        // }
      }
      if (attr) {
        attr['data-ad-client'] = 'ca-pub-' + currentSlot.pub.replace('ca-pub-', '');

        // const parentAttr = Array.from(placement.attributes)
        //   .filter(({ name }) => {
        //     return name !== 'adsense';
        //   })
        //   .map(({ name, value }) => {
        //     return { [name]: value };
        //   })
        //   // reduce to single object
        //   .reduce((prev, curr) => ({ ...prev, ...curr }), {});

        // const style = attr.style + parentAttr.style;

        const ins = createIns(attr);
        if (ins) {
          // console.log('fill', attr);
          // replaceWith(ins, placement);
          placement.appendChild(ins);
        }
      }
    }
  }
}
