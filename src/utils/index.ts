import CryptoJS from 'crypto-js';

export const isIe =
  navigator.userAgent.toLowerCase().indexOf('msie') != -1 || navigator.userAgent.toLowerCase().indexOf('trident') != -1;

interface FakeWindow {
  clipboardData: any;
}

interface FakeEvent extends Event {
  clipboardData: any;
}

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

export async function copyTextToClipboard(textToCopy: string, e: FakeEvent) {
  try {
    if (!navigator.clipboard) {
      return fallbackCopyTextToClipboard(textToCopy);
    }
    await navigator.clipboard.writeText(textToCopy);
    const win = window as unknown as FakeWindow;
    if (isIe && win.clipboardData) {
      win.clipboardData.setData('Text', textToCopy);
    } else if (e && e.clipboardData) {
      e.clipboardData.setData('text/plain', textToCopy);
    }
  } catch (error) {
    console.error('failed to copy to clipboard', error);
  }
}

/**
 * generate random string
 * @param len length
 * @returns
 */
export const randomStr = (len = 8) =>
  Math.random()
    .toString(36)
    .substring(2, len + 2);

/** md5 encoder */
export const md5 = (str: string) => CryptoJS.MD5(str).toString();

export * from './dom';
export * from './utils';

/**
 * remove duplicate array items
 * @param arr
 * @returns
 */
export function arrayDedupe<T extends any[]>(arr: T): T[] {
  return arr.filter(function (value, index, array) {
    return array.indexOf(value) === index;
  });
}
