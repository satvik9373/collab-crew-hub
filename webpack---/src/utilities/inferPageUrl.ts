/**
 * Infer the url of the page best we can
 * @returns {string} the url of the page
 */
export const inferPageUrl = (): string => {
  if (window.FreshUrl?.originalUrl != null) {
    return window.FreshUrl.originalUrl;
  }
  if (window.top === window.self) {
    return window.location.href || '';
  }
  return document.referrer || '';
};
