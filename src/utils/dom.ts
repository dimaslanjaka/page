export interface querySelectorResult extends Element {
  [key: string]: any;
}

/**
 * safe query selector
 * @param str
 * @returns
 */
export function querySelector(str: string): querySelectorResult {
  const select = document.querySelector(str);
  if (!select) {
    console.error(`document.querySelector("${str}") is null, return {}`);
  }
  return select || ({} as querySelectorResult);
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

/**
 * react helper - wait until page fully loaded
 * @param callback
 */
export function waitUntilPageFullyLoaded(callback: (...args: any[]) => any) {
  let interval: NodeJS.Timeout;
  if (!interval) {
    interval = setInterval(() => {
      if (document.readyState == 'complete') {
        callback.apply(null);
        clearInterval(interval);
      }
    }, 400);
  }
}
