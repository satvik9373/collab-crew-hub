/* eslint-disable no-console */
import { root } from './utilities/root.js';
import { WistiaGlobal } from './types/player-api-types.ts';

if (root.Wistia == null) {
  root.Wistia = {
    _destructors: {},
    _initializers: {},
    _mediaDataPromises: {},
    _remoteData: new Map(),
    api: () => {
      console.error('Accessed Wistia.api() before it was initialized');
      return null;
    },
    // this will be overwritten in _async.coffee
    defineControl: () => {
      console.error('Accessed Wistia.defineControl() before it was initialized');
      return null;
    },
    mixin: <T>(klass: T, obj: Partial<Record<keyof T, unknown>>) => {
      Object.keys(obj).forEach((key) => {
        if (Object.hasOwn(obj, key)) {
          // eslint-disable-next-line no-param-reassign
          klass[key as keyof T] = obj[key] as unknown as T[keyof T];
        }
      });
    },
    // will be overwritten in _public_api.coffee
    PublicApi: null,

    // will be overwritten in _remote_data.js
    uncacheMedia: () => {
      console.error('Accessed Wistia.uncacheMedia() before it was initialized');
      return null;
    },
    // will be overwritten in _visitor_key.js
    VisitorKey: null,

    // will be overwritten in _visitor_key.js
    visitorKey: null,

    // will be overwritten in WistiaPlayer.tsx
    wistia: undefined,
  } satisfies WistiaGlobal;
}

export const Wistia = root.Wistia as WistiaGlobal;
