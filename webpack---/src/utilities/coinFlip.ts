const MAX_RANDOM_VALUE = 0xffffffff;

/**
 * Simulates a coin flip with a given percentage to win
 * @param percentToWinCoinFlip - Number between 0 and 1 representing the percentage to win the coin flip
 * @returns boolean - True if the coin flip was won, false otherwise
 */
export const didWinCoinFlip = (percentToWinCoinFlip: number): boolean => {
  const cryptoObj = window.crypto;
  if (typeof cryptoObj !== 'undefined') {
    const cryptoRandom = cryptoObj.getRandomValues(new Uint32Array(1));
    return cryptoRandom[0] / (MAX_RANDOM_VALUE + 1) < percentToWinCoinFlip;
  }

  const mathRandom = Math.random();
  return mathRandom >= percentToWinCoinFlip;
};
