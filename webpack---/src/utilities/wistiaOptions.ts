import merge from 'lodash.merge';
import type { EmbedOptions } from '../types/player-api-types.ts';

export const getWistiaOptions = (mediaId: string): EmbedOptions => {
  if (!window.wistiaOptions) {
    return {};
  }

  const globalOptions: EmbedOptions = window.wistiaOptions._all ?? {};

  const mediaOptions: EmbedOptions = window.wistiaOptions[mediaId] ?? {};

  return merge(globalOptions, mediaOptions);
};
