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

export const isIe =
  navigator.userAgent.toLowerCase().indexOf('msie') != -1 || navigator.userAgent.toLowerCase().indexOf('trident') != -1;

/**
 * fallback when `navigator.clipboard` not found
 * @param text
 */
function fallbackCopyTextToClipboard(text: string) {
  const textArea = document.createElement('textarea');
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = '0';
  textArea.style.left = '0';
  textArea.style.position = 'fixed';

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    const successful = document.execCommand('copy');
    const msg = successful ? 'successful' : 'unsuccessful';
    console.log('Fallback: Copying text command was ' + msg);
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }

  document.body.removeChild(textArea);
}

export async function copyTextToClipboard(textToCopy: string, e?: Event) {
  try {
    if (!navigator.clipboard) {
      return fallbackCopyTextToClipboard(textToCopy);
    }
    await navigator.clipboard.writeText(textToCopy);
    if (isIe && window.clipboardData) {
      window.clipboardData.setData('Text', textToCopy);
    } else if (e && e.clipboardData) {
      e.clipboardData.setData('text/plain', textToCopy);
    }
  } catch (error) {
    console.error('failed to copy to clipboard', error);
  }
}
