import { isNotNil } from '@wistia/type-guards';
import { normalizeChapters } from './normalizeChapters.ts';
import { ChaptersPlugin, ChapterData } from '../types/plugins.ts';
import type { EmbedOptions, MediaData } from '../types/player-api-types.ts';

// Google got mad that the default chapter title is (of course) not very
// descriptive, and wanted us to make sure it's never used for Key Moments.
const DEFAULT_CHAPTER_TITLE = 'Chapter Title';
const MINIMUM_DURATION = 30;

export const shouldAddClipsFromChapters = (embedOptions: EmbedOptions): boolean => {
  const chapters = normalizeChapters(embedOptions);
  if (!chapters) {
    return false;
  }

  const { chapterList } = chapters;

  // the `on` property must be explicitly false to disable
  return (
    chapters.on !== false &&
    chapters.on !== 'false' &&
    Array.isArray(chapterList) &&
    chapterList.length > 0
  );
};

// keyMoments should only be limited by a few factors:
// 1. a turnstile is blocking content
// 2. it's password protected
// 3. the video is really short
// 4. only available for VOD, not Live
// Then, there are two different _types_ of key moments. If we have chapters
// we will use the Clips format to specifically tell google the timestamps we think
// are important. Otherwise, we will use the SeekToAction field along with the wtime
// param to allow Google to search through the video for key moments
export const shouldAddKeyMoments = (mediaData: MediaData, embedOptions: EmbedOptions): boolean => {
  if (embedOptions.keyMoments === false) {
    return false;
  }

  const { duration, type } = mediaData;
  const { passwordProtectedVideo, 'requireEmail-v1': turnstilePlugin } = embedOptions.plugin ?? {};
  const isLiveStream = type === 'LiveStream';

  const passwordEnabled =
    passwordProtectedVideo?.on === true || passwordProtectedVideo?.on === 'true';

  const turnstileBlocksContent =
    turnstilePlugin &&
    turnstilePlugin.on !== false &&
    turnstilePlugin.time !== 'end' &&
    !turnstilePlugin.persistentTurnstile;

  return Boolean(
    !passwordEnabled &&
      !turnstileBlocksContent &&
      !isLiveStream &&
      typeof duration === 'number' &&
      duration >= MINIMUM_DURATION,
  );
};

const sortedFilteredChapters = (
  chapterList: ChaptersPlugin['chapterList'],
): ChaptersPlugin['chapterList'] => {
  const chapterExistsAtTime = {};

  return [...chapterList]
    .sort((firstChapter: ChapterData, secondChapter) => firstChapter.time - secondChapter.time)
    .filter(({ time, title, deleted }) => {
      if (Boolean(chapterExistsAtTime[time]) || deleted || title === DEFAULT_CHAPTER_TITLE) {
        return false;
      }
      chapterExistsAtTime[time] = true;
      return true;
    });
};

type Clips = {
  '@type': string;
  endOffset: number;
  name: string;
  startOffset: number;
  url: string;
}[];

export const clipsFromChapters = (
  chapterList: ChaptersPlugin['chapterList'],
  baseUrl: string,
  mediaDuration: number,
): Clips => {
  if (!Array.isArray(chapterList) || chapterList.length === 0) {
    return [];
  }

  const clips = sortedFilteredChapters(chapterList).map((chapter, index, chapters) => {
    const { time, title } = chapter;
    const url = new window.URL(baseUrl);
    const floorTime = Math.floor(time);
    const nextChapter = chapters[index + 1];
    const endOffsetTime = isNotNil(nextChapter) ? nextChapter.time : mediaDuration;

    // wtime does not support decimals
    url.searchParams.append('wtime', `${floorTime}s`);

    // https://schema.org/Clip
    return {
      '@type': 'Clip',
      endOffset: Math.floor(endOffsetTime),
      name: title,
      startOffset: floorTime,
      url: url.toString(),
    };
  });

  return clips;
};

type SeekToAction = {
  '@type': string;
  'startOffset-input': string;
  target: string;
};
// https://developers.google.com/search/docs/advanced/structured-data/video#seek
export const seekToAction = (): SeekToAction => {
  const url = new window.URL(window.location.href);
  // if wtime is already on the url as query param, it will be overwritten here. This is only for the JSON+LD though.
  url.searchParams.append('wtime', '{seek_to_second_number}');

  return {
    '@type': 'SeekToAction',
    target: url.toString().replace('%7Bseek_to_second_number%7D', '{seek_to_second_number}'), // we need to replace the encoded uri with the direct string
    'startOffset-input': 'required name=seek_to_second_number',
  };
};
