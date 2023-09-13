/**
 * safe query selector
 * @param str
 * @returns
 */
export function querySelector(str: string): HTMLElement | Record<string, any> {
  const select = document.querySelector(str);
  if (!select) {
    console.error(`document.querySelector("${str}") is null`);
  }
  return select || {};
}

/**
 * safe get element by id
 * @param id
 * @returns
 */
export const getElementById = (id: string) => querySelector('#' + id);
