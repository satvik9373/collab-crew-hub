import type { WistiaContainerHTMLElement } from '../types/player-api-types.ts';

/**
 * Get all API embed container elements. That's anything matching div/span.wistia_embed.
 * @param {string} [klass='wistia_embed'] - The class name to match on
 * @returns {HTMLElement[]}
 */
export const getAllApiEmbedElements = (klass = 'wistia_embed'): WistiaContainerHTMLElement[] => {
  const allWistiaEmbedElements = document.querySelectorAll(
    `div.${klass},span.${klass},iframe.${klass}`,
  ) as unknown as WistiaContainerHTMLElement[];

  const allApis = Array.from(allWistiaEmbedElements).map((elem) => {
    if (elem.lastChild?.nodeName === 'WISTIA-PLAYER') {
      return elem.lastChild as WistiaContainerHTMLElement;
    }

    return elem;
  });

  return allApis;
};
