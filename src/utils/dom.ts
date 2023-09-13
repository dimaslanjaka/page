/**
 * safe query selector
 * @param str
 * @returns
 */
export function querySelector(str: string): HTMLElement | Record<string, any> {
  const select = document.querySelector(str);
  if (!select) {
    console.error(`document.querySelector("${str}") is null, return {}`);
  }
  return select || {};
}

/**
 * safe get element by id
 * @param id
 * @returns
 */
export const getElementById = (id: string) => querySelector('#' + id);

/**
 * element remover
 *
 * remove element with their childs
 * @param e
 */
export function removeElement(e: HTMLElement | Record<string, any> | undefined | null) {
  if (!e) return;
  let child = e.lastElementChild;
  while (child) {
    e.removeChild(child);
    child = e.lastElementChild;
  }
  if (e.remove) e.remove();
}
