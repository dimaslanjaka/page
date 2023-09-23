/** scroll to hash */
const hash = window.location.hash.substring(1).replace(/[=]/gi, '');
if (hash.length > 0) {
  const el = document.querySelector(hash);
  if (el) {
    const distanceFromTop = el.getBoundingClientRect().top;
    if (typeof distanceFromTop === 'number')
      window.scrollTo({
        top: distanceFromTop,
        behavior: 'smooth',
      });
  }
}
