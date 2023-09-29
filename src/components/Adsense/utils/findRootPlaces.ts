/**
 * find wrapper to iterate random ads
 * @returns
 */
export default function findRootPlaces() {
  const { root } = window.adsense_option || {};
  let roots: (Element | HTMLElement)[] = [];
  if (root && root.length > 0) {
    roots = Array.from(document.querySelectorAll(root));
  }
  // find content/article wrapper
  if (roots.length === 0) {
    roots = Array.from(document.querySelectorAll('article'));
  }
  if (roots.length === 0) {
    // theme-next main content
    roots = Array.from(document.querySelectorAll('.page.main-inner'));
  }
  if (roots.length === 0) {
    roots = Array.from(document.querySelectorAll('#main-content'));
  }
  if (roots.length === 0) {
    // bootstrap wrapper
    roots = Array.from(document.querySelectorAll('#bootstrap-wrapper'));
  }
  if (roots.length === 0) {
    // typedoc documentation page
    roots = Array.from(document.querySelectorAll('[class="col-8 col-content"]'));
  }
  // fallback search at body
  if (roots.length === 0) {
    roots = Array.from(document.querySelectorAll('body'));
  }
  return roots;
}
