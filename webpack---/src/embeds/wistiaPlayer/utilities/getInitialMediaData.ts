import { Wistia } from '../../../wistia_namespace.ts';
import { findScriptInDomBySrc } from '../../../utilities/script-utils.js';
import { mediaDataScriptRegExp, mediaDataUrl } from '../../../utilities/media_data.js';
import { eV1Protocol, mediaDataHost } from '../../../utilities/hosts.js';
import { fetchMediaData } from '../../../utilities/fetchMediaData.ts';
import { mediaDataTransforms } from '../../../utilities/media-data-transforms.js';
import { cacheMediaData } from '../../../utilities/remote-data-cache.ts';
import { isMediaDataError } from '../../../utilities/mediaDataError.ts';
import type {
  MediaData,
  MediaDataServerResponse,
  MediaDataServerErrorResponse,
} from '../../../types/player-api-types.ts';

type GetInitialMediaDataOptions = {
  embedHost?: string;
};

// This file is designed to efficiently retrieve media data from multiple potential sources.
// The goal is to obtain the media data as quickly as possible.
// Our legacy embed scripts use JSONP and our new scripts use a JS module.
// It includes functions to check for the presence of these JSONP and JavaScript embed scripts in the DOM,
// which can provide the necessary media data.
// If they aren't there or don't load fast enough, we use server data.

const INTERVAL_TIME = 15;

const doesJsonpExist = (mediaId: string, options: GetInitialMediaDataOptions = {}): boolean => {
  const url = mediaDataUrl(mediaId, options);
  // the mediaDataUrl above 👆 ends with `json` and we're specifically looking for jsonp here
  // also, really old embed codes may have added query params to the end of the url, which we want to exclude
  const matchUrl = url.replace(/\.json(?!p)/, '.jsonp').replace(/&$/, '');

  const isJsonpScriptInDom = findScriptInDomBySrc(matchUrl, {
    ignoreProtocol: true,
    scriptRegex: mediaDataScriptRegExp(mediaId),
  });

  return Boolean(isJsonpScriptInDom);
};

const jsScriptUrl = (mediaId: string, options: GetInitialMediaDataOptions = {}): string => {
  const host = mediaDataHost(options) as string;
  return `${eV1Protocol()}//${host}/embed/${mediaId}.js`;
};

const doesJsMediaDataScriptExist = (
  mediaId: string,
  options: GetInitialMediaDataOptions = {},
): boolean => {
  const url = jsScriptUrl(mediaId, options);
  const isJsScriptInDom = findScriptInDomBySrc(url, {
    ignoreProtocol: true,
  });

  return Boolean(isJsScriptInDom);
};

const pollForJsonp = async (mediaId: string): Promise<MediaData | MediaDataServerErrorResponse> => {
  let count = 0;

  return new Promise((resolve, reject) => {
    // try looking once before the interval. This is especially useful for tests
    // since using jest.useFakeTimers() doesn't work with this function
    const jsonp = window[`wistiajsonp-/embed/medias/${mediaId}.jsonp`] as
      | MediaDataServerResponse
      | undefined;

    if (jsonp) {
      if (jsonp.media) {
        resolve(jsonp.media);
        return;
      }

      if (isMediaDataError(jsonp)) {
        resolve(jsonp);
      }
    }

    const poll = setInterval(() => {
      const jsonpData = window[`wistiajsonp-/embed/medias/${mediaId}.jsonp`] as
        | MediaDataServerResponse
        | undefined;

      if (jsonpData) {
        clearInterval(poll);
        if (jsonpData.media) {
          resolve(jsonpData.media);
        }

        if (isMediaDataError(jsonpData)) {
          resolve(jsonpData);
        }
      }

      if (count > 3) {
        clearInterval(poll);
        reject(new Error('Failed to load jsonp media data'));
      }

      count += 1;
    }, INTERVAL_TIME);
  });
};

const getJsScript = async (url: string): Promise<MediaData | MediaDataServerErrorResponse> => {
  return new Promise((resolve, reject) => {
    void import(/* webpackIgnore: true */ url)
      .then((module: { mediaData: MediaDataServerResponse }) => {
        const { mediaData } = module;

        resolve(mediaData);
      })
      .catch(() => {
        reject(new Error('Failed to load js media data'));
      });
  });
};

const getJsonFromServer = async (
  url: string,
  options: GetInitialMediaDataOptions,
): Promise<MediaData | MediaDataServerErrorResponse> => {
  return new Promise((resolve, reject) => {
    void fetchMediaData(url, options)
      .then((mediaData) => {
        resolve(mediaData);
      })
      .catch(() => {
        reject(new Error('Failed to load json mediaData'));
      });
  });
};

const getInlineMediaData = async (
  mediaId: string,
): Promise<MediaData | MediaDataServerErrorResponse> => {
  return new Promise((resolve, reject) => {
    if (Wistia._inlineMediaData?.[mediaId]) {
      resolve(Wistia._inlineMediaData[mediaId]);
    }

    reject(new Error('Failed to load inline media data'));
  });
};

export const getInitialMediaData = async (
  mediaId: string,
  options: GetInitialMediaDataOptions = {},
): Promise<MediaData | MediaDataServerErrorResponse> => {
  const promises = [getJsonFromServer(mediaId, options), getInlineMediaData(mediaId)];

  if (doesJsonpExist(mediaId, options)) {
    promises.push(pollForJsonp(mediaId));
  }

  if (doesJsMediaDataScriptExist(mediaId, options)) {
    promises.push(getJsScript(jsScriptUrl(mediaId, options)));
  }

  return Promise.any(promises).then((mediaData) => {
    if (!isMediaDataError(mediaData as MediaDataServerResponse)) {
      mediaDataTransforms(mediaData, options);
      cacheMediaData(mediaId, mediaData as MediaData);
    }
    return mediaData;
  });
};
