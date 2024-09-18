import { isNotNil } from '@wistia/type-guards';
import { Wistia } from '../wistia_namespace.ts';
import { mediaDataHost } from './hosts.js';
import { mediaDataTransforms } from './media-data-transforms.js';
import { cacheMediaData } from './remote-data-cache.ts';
import type {
  MediaDataServerResponse,
  MediaDataServerErrorResponse,
  MediaData,
} from '../types/player-api-types.ts';
import { isMediaDataError } from './mediaDataError.ts';

type FetchMediaDataOptions = {
  embedHost?: string;
};

export const fetchMediaData = async (
  hashedId: string,
  options: FetchMediaDataOptions = {},
): Promise<MediaData | MediaDataServerErrorResponse> => {
  const cacheKey = hashedId;
  if (isNotNil(Wistia._mediaDataPromises[cacheKey])) {
    return Wistia._mediaDataPromises[cacheKey];
  }

  const host = mediaDataHost(options) as string;
  const url = `https://${host}/embed/medias/${hashedId}.json`;

  const promise = fetch(url)
    .then((resp) => resp.json() as MediaDataServerResponse)
    .then((response: MediaDataServerResponse): MediaData | MediaDataServerErrorResponse => {
      if (isMediaDataError(response)) {
        return response;
      }
      const { media: mediaData } = response;

      if (mediaData && isNotNil(mediaData.hashedId)) {
        mediaDataTransforms(mediaData, options);
        cacheMediaData(mediaData.hashedId, mediaData);
        return mediaData;
      }

      return {};
    });

  Wistia._mediaDataPromises[cacheKey] = promise;

  return promise;
};
