import {
    getLocalStorage,
    updateLocalStorage
} from 'utilities/namespacedLocalStorage.js';

const BASICALLY_ENDED_THRESHOLD = 5;
const DURATION_THRESHOLD = 300;
const NEAR_BEGINNING_THRESHOLD = 10;

export const getLocalStorageKey = (hashedId) => {
    return `wistia-video-progress-${hashedId}`;
};

export const getLastTime = (hashedId) => {
    return getLocalStorage(getLocalStorageKey(hashedId)).lastTime;
};

export const setLastTime = (hashedId, time) => {
    updateLocalStorage(getLocalStorageKey(hashedId), (obj) => {
        obj.lastTime = time;
    });
};

export const getResumableKeyForVideo = (hashedId) => {
    return getLocalStorage(getLocalStorageKey(hashedId)).resumableKey;
};

export const setResumableKeyForVideo = (hashedId, key) => {
    updateLocalStorage(getLocalStorageKey(hashedId), (obj) => {
        obj.resumableKey = key;
    });
};

export const atOrNearEnd = (hashedId, duration) => {
    return (getLastTime(hashedId) || 0) + BASICALLY_ENDED_THRESHOLD > duration;
};

export const atOrNearBeginning = (hashedId) => {
    const time = getLastTime(hashedId) || 0;
    return time < NEAR_BEGINNING_THRESHOLD;
};

export const shorterThanResumableThreshold = (duration) => {
    return duration < DURATION_THRESHOLD;
};

export const withinResumableTime = (hashedId, duration) => {
    return !atOrNearBeginning(hashedId) && !atOrNearEnd(hashedId, duration);
};