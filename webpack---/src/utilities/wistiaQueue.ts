import { Wistia } from '../wistia_namespace.ts';
import type { WistiaGlobal } from '../types/player-api-types.ts';

const QUEUE_INTERVAL = 500;
const doesWQExist = Boolean(window._wq);

let wistiaQueue = null as unknown as NodeJS.Timeout | null;

/**
 * Periodically checks the Wistia queue and executes the functions in it
 * @returns {void}
 */
export const maybeStartWistiaQueue = (): void => {
  if (wistiaQueue || doesWQExist) {
    return;
  }

  wistiaQueue = setInterval(() => {
    const queue = window._wq;
    if (!queue || queue.length === 0) {
      return;
    }

    while (queue.length > 0) {
      const fn = queue.shift();
      if (typeof fn === 'function') {
        fn(Wistia as unknown as WistiaGlobal);
      }
    }

    queue.length = 0;
  }, QUEUE_INTERVAL);
};

/**
 * Stops the Wistia queue
 * @returns {void}
 */
export const stopWistiaQueue = (): void => {
  if (wistiaQueue) {
    clearInterval(wistiaQueue);
    wistiaQueue = null;
  }
};
