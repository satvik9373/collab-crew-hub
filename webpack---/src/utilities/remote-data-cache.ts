import { isNil } from '@wistia/type-guards';
import { Wistia } from '../wistia_namespace.ts';
import { MediaData } from '../types/player-api-types.ts';

export const getMediaDataFromCache = (hashedId: string): MediaData | null | undefined => {
  const mediaData = Wistia._remoteData.get(`media_${hashedId}`);
  if (isNil(mediaData)) return null;

  return mediaData;
};

export const cacheMediaData = (hashedId: string, data: MediaData): void => {
  Wistia._remoteData.set(`media_${hashedId}`, data);
};

export const uncacheMediaData = (hashedId: string): void => {
  Wistia._remoteData.delete(`media_${hashedId}`);
};
