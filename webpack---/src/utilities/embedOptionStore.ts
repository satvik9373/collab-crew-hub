import type { PublicApi } from '../types/player-api-types.ts';
import { cast, clone, isObject } from './obj.js';
import { wData } from './wistiaData.js';
import { getOneApiHandle } from './getApiHandles.ts';

export const OPTION_PREFIX = 'wistia_embed_options_';
export const GLOBAL_ID_KEY = '__global__';

/**
 * Get the embed options for a given key or embed id
 * @param {string} id - The key or embed id
 * @param {Function} [matcherFn=getOneApiHandle] - Custom matcher function
 * @returns {object}
 */
export const getEmbedOptionStore = (id: string, matcherFn = getOneApiHandle): object => {
  // If options exist for the provided id, just return them
  if (wData([OPTION_PREFIX, id]) !== undefined) {
    return wData([OPTION_PREFIX, id]) as object;
  }

  // Otherwise, lets check this key's api handle
  const apiHandleFromKey = matcherFn(id) as PublicApi | 'removed' | null;
  if (apiHandleFromKey === null || apiHandleFromKey === 'removed') {
    return {};
  }
  // And compare it against all the other stored api handles
  if (wData(OPTION_PREFIX) !== undefined) {
    // If the api handles match, return the options for that key
    const matchedKey = Object.keys(wData(OPTION_PREFIX) as object).find(
      (key) => matcherFn(key) === apiHandleFromKey,
    );
    if (wData([OPTION_PREFIX, matchedKey]) !== undefined) {
      return wData([OPTION_PREFIX, matchedKey]) as object;
    }
  }
  return {};
};

/**
 * Set the embed options for a given key or embed id
 * @param {string} id - The key or embed id
 * @param {object} options - The options to set
 * @returns {object}
 */
export const setEmbedOptionStore = (id: string, options: object | null): object => {
  if (options !== null) {
    return wData([OPTION_PREFIX, id], cast(clone(options))) as object;
  }
  return {};
};

/**
 * Legacy behavior replacement for Wistia.options - Get or set embed options based
 * on the parameters provided
 * @param {string | object} id - The id of the embed or an object of options
 * @param {object} options - The options to set
 * @returns {object}
 */
export const getOrSetEmbedOptionStore = (
  id?: object | string,
  options?: object | null | undefined,
): object => {
  let optionsKey = id;
  let embedOptions = options;

  // Redundant "typeof" check is needed to make typescript happy
  if (isObject(optionsKey) && typeof optionsKey === 'object') {
    embedOptions = optionsKey;
    optionsKey = GLOBAL_ID_KEY;
  }

  // Set options
  if (embedOptions !== undefined && embedOptions !== null) {
    return wData([OPTION_PREFIX, optionsKey], cast(clone(embedOptions))) as object;
  }

  // Get options
  if (optionsKey !== undefined) {
    // If options exist for the provided id, just return them
    if (wData([OPTION_PREFIX, id]) !== undefined) {
      return wData([OPTION_PREFIX, id]) as object;
    }

    // Otherwise, lets check this key's api handle
    const apiHandleFromKey = getOneApiHandle(optionsKey as string) as PublicApi | 'removed' | null;
    if (apiHandleFromKey === null || apiHandleFromKey === 'removed') {
      return {};
    }
    // And compare it against all the other stored api handles
    if (wData(OPTION_PREFIX) !== undefined) {
      // If the api handles match, return the options for that key
      const matchedKey = Object.keys(wData(OPTION_PREFIX) as object).find(
        (key) => getOneApiHandle(key) === apiHandleFromKey,
      );
      if (wData([OPTION_PREFIX, matchedKey]) !== undefined) {
        return wData([OPTION_PREFIX, matchedKey]) as object;
      }
    }
    return {};
  }
  return wData(OPTION_PREFIX) as object;
};
