export const sanePlayerColor = (playerColor) => {
    if (playerColor) {
        // Strip leading # from the playerColor.
        playerColor = `${playerColor}`.replace(/^#/g, '');

        // If the player color is passed in short-hand (e.g. 000 for black),
        // expand each of the channels so it's 6 characters long.
        if (playerColor.length < 6) {
            let prefix = '';
            for (let i = 0; i < 6 - playerColor.length; i++) {
                prefix += '0';
            }
            playerColor = `${prefix}${playerColor}`;
        }

        // Set a default player color if it's not provided or invalid.
        if (!/^[\da-f]{6}$/i.test(playerColor)) {
            playerColor = '636155';
        }

        return playerColor;
    }
    return '636155';
};