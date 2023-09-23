/** scroll to hash */
export function scrollToHash() {
  const hash = window.location.hash.substring(1).replace(/[=]/gi, '');
  if (hash.length > 0) {
    const el = document.querySelector(hash);
    if (el) {
      const distanceFromTop = el.getBoundingClientRect().top;
      if (typeof distanceFromTop === 'number')
        window.scrollTo({
          top: distanceFromTop,
          behavior: 'smooth'
        });
    }
  }

  return hash.length > 0;
}

/* remember scroll position start - https://stackoverflow.com/a/65746118 */

export const saveScrollPosition = function () {
  let scrollPos: number;
  if (typeof window.pageYOffset != 'undefined') {
    scrollPos = window.pageYOffset;
  } else if (typeof document.compatMode != 'undefined' && document.compatMode != 'BackCompat') {
    scrollPos = document.documentElement.scrollTop;
  } else if (typeof document.body != 'undefined') {
    scrollPos = document.body.scrollTop;
  }
  document.cookie = 'scrollTop=' + scrollPos + 'URL=' + window.location.href;
};

window.onbeforeunload = saveScrollPosition;

export const restoreScrollPosition = function () {
  // restore scroll position only when hash not exist in url
  if (!scrollToHash()) {
    if (document.cookie.includes(window.location.href)) {
      if (document.cookie.match(/scrollTop=([^;]+)(;|$)/) != null) {
        const arr = document.cookie.match(/scrollTop=([^;]+)(;|$)/);
        document.documentElement.scrollTop = parseInt(arr[1]);
        document.body.scrollTop = parseInt(arr[1]);
      }
    }
  }
};

window.onload = restoreScrollPosition;
