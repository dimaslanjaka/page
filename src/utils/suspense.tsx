import React from 'react';
// react suspense helpers

import Loader from '@components/Loader';

/**
 * delayed import
 * @param importFn
 * @param delayMs default 500 ms
 * @returns
 * @example
 * const Component = React.lazy(importDelay(import("./component"), 900));
 */
export const importDelay =
  (importFn: () => Promise<any>, delayMs = 500) =>
  async () => {
    const [result] = await Promise.all([importFn(), new Promise(resolve => setTimeout(resolve, delayMs))]);

    return result as { default: /*ComponentType<any>*/ any };
  };

/**
 * react suspense helper
 * @param element
 * @param fallback
 * @returns
 */
export function suspenseIt(element: JSX.Element, fallback = <Loader />) {
  return <React.Suspense fallback={fallback}>{element}</React.Suspense>;
}
