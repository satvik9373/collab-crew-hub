import { base64Decode } from './core.js';
import { wlog } from './wlog.js';

/**
 * Extracts the email from the pageUrl and returns it if found
 * @param {string} pageUrl the url of the page
 * @returns {string | null} the email if found, null otherwise
 */
export const extractEmailFromParams = (pageUrl: string): string | null => {
  const wemail = /wemail=([^&#]+)/.exec(pageUrl) ?? null;

  if (wemail) {
    return wemail[1];
  }

  const wkey = /wkey=([^&#]+)/.exec(pageUrl) ?? null;

  if (wkey) {
    const base64Email = wkey[1];
    try {
      const decodedEmail = base64Decode(base64Email);
      return decodedEmail;
    } catch (error) {
      wlog.info('Failed to decode email from wkey', error);
    }
  }

  return null;
};
