import { isNil } from '@wistia/type-guards';

export const loadCustomFont = async (fontFamily: string, fontUrl: string): Promise<void> => {
  const fontFace = new FontFace(fontFamily, `url(${fontUrl})`);
  document.fonts.add(fontFace);
  await fontFace.load();
};

export const getCurrentFontsInDocument = (): Map<string, FontFace> => {
  const loadedFonts = new Map<string, FontFace>();

  if (isNil(document.fonts)) {
    return loadedFonts;
  }

  document.fonts.forEach((font) => {
    loadedFonts.set(font.family, font);
  });

  return loadedFonts;
};

// START SELF-HOSTED GOOGLE FONTS

export const SUPPORTED_GOOGLE_FONTS = [
  'Arsenal',
  'Barlow Condensed',
  'Catamaran',
  'Chivo',
  'Corben',
  'Dancing Script',
  'Fira Mono',
  'Inconsolata',
  'Inter',
  'Lato',
  'Libre Franklin',
  'Lora',
  'Merriweather',
  'Montserrat',
  'Nunito',
  'Open Sans',
  'Oswald',
  'PT Serif',
  'Playfair Display',
  'Poppins',
  'Roboto',
  'Slabo 13px',
  'Source Sans Pro',
  'Source Serif Pro',
  'Work Sans',
  'Zilla Slab',
] as const;

export type SupportedGoogleFont = (typeof SUPPORTED_GOOGLE_FONTS)[number];

// We self-host Google fonts instead of pulling them in from Google's API, since Google collects PII from their fonts API,
// and we want to remain GDPR compliant.
export const SELF_HOSTED_GOOGLE_FONTS_BASE_URL = 'https://fast.wistia.com/fonts/google_fonts/';

export const getLoadedSelfHostedGoogleFonts = (): SupportedGoogleFont[] => {
  const linkElements = document.querySelectorAll<HTMLLinkElement>(
    `link[rel="stylesheet"][href^="${SELF_HOSTED_GOOGLE_FONTS_BASE_URL}"]`,
  );

  if (linkElements.length === 0) return [];

  return Array.from(linkElements).reduce((loadedFontNames: SupportedGoogleFont[], linkElement) => {
    const url = new URL(linkElement.href);
    const fontFamily = url.pathname.split('/')[3] as SupportedGoogleFont;
    if (!loadedFontNames.includes(fontFamily)) {
      loadedFontNames.push(fontFamily);
    }
    return loadedFontNames;
  }, []);
};

export const loadSelfHostedGoogleFont = (fontName: SupportedGoogleFont): void => {
  // If the fontName being passed in is NOT a supported Google font (perhaps a bad inline embed option)
  // don't try to load it
  if (!SUPPORTED_GOOGLE_FONTS.includes(fontName)) return;

  const encodedFontName = encodeURIComponent(fontName).replaceAll('%20', '_');

  // If we've already loaded this Google font, don't load it again.
  if (getLoadedSelfHostedGoogleFonts().includes(encodedFontName as SupportedGoogleFont)) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `${SELF_HOSTED_GOOGLE_FONTS_BASE_URL}${encodedFontName}/${encodedFontName}.css`;
  document.head.appendChild(link);
};
