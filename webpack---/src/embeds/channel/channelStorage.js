import {
    getWistiaLocalStorage,
    updateWistiaLocalStorage
} from 'utilities/wistiaLocalStorage.js';
import {
    getLocalStorage,
    updateLocalStorage
} from 'utilities/namespacedLocalStorage.js';

const copyLegacyLsOnce = (hashedId) => {
    const legacyLsKey = legacyChannelLsKey(hashedId);
    const legacyLs = getWistiaLocalStorage()[legacyLsKey] || {};
    const key = lsKey(hashedId);

    if (legacyLs.copied === true || Object.keys(legacyLs).length === 0) {
        return;
    }

    // copy over the old channel ls to the new namespace
    updateLocalStorage(key, (ls) => {
        Object.keys(legacyLs).forEach((k) => {
            ls[k] = legacyLs[k];
        });
    });

    // set legacy to having been copied so it won't get copied again
    updateWistiaLocalStorage((ls) => {
        const key = legacyChannelLsKey(hashedId);
        ls[key].copied = true;
    });
};

const legacyChannelLsKey = (hashedId) => {
    return `channel_${hashedId}`;
};

const lsKey = (hashedId) => {
    return `wistia_channel_${hashedId}`;
};

export const getChannelStorage = (hashedId) => {
    copyLegacyLsOnce(hashedId);

    return getLocalStorage([lsKey(hashedId)]) || {};
};

export const setChannelStorage = (hashedId, val) => {
    copyLegacyLsOnce(hashedId);

    updateLocalStorage((ls) => (ls[lsKey(hashedId)] = val));
    return getChannelStorage(hashedId);
};

export const updateChannelStorage = (hashedId, fn) => {
    copyLegacyLsOnce(hashedId);

    const key = lsKey(hashedId);
    updateLocalStorage(key, fn);
    return getChannelStorage(hashedId);
};

export const channelStorageHelpers = {
    getChannelStorage,
};