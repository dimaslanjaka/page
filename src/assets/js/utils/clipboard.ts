export const isIe =
  navigator.userAgent.toLowerCase().indexOf('msie') != -1 || navigator.userAgent.toLowerCase().indexOf('trident') != -1;

interface FakeWindow {
  clipboardData: any;
}

interface FakeEvent extends Event {
  clipboardData: any;
}

export async function copyTextToClipboard(textToCopy: string, e: FakeEvent) {
  try {
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
