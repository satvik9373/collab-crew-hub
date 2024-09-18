// chapters has two ways of being defined in embed options.
// The current way is as an object inside `embedOptions.plugin`
// The old way was as root embed options like `chaptersOn` and `chapterList`.
// This function normalizes the old root embed option format to an object
// like the current model

import { isNotNil } from '@wistia/type-guards';
import { EmbedOptions } from '../types/player-api-types.ts';
import { ChaptersPlugin } from '../types/plugins.ts';

export const normalizeChapters = (embedOptions: EmbedOptions): ChaptersPlugin | undefined => {
  const { plugin, chaptersOn, chapterList } = embedOptions;

  if (plugin?.chapters) {
    return plugin.chapters;
  }

  const areChaptersOn = chaptersOn === true || chaptersOn === 'true';

  if (isNotNil(chapterList) || areChaptersOn) {
    const hasChapters = isNotNil(chapterList) && chapterList.length > 0;
    const list = hasChapters ? chapterList : [];

    return {
      on: chaptersOn,
      chapterList: list,
    } as ChaptersPlugin;
  }

  return undefined;
};
