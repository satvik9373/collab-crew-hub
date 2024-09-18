import {
    Wistia
} from 'wistia_namespace.js';

export const seqId = (prefix = 'wistia_', suffix = '') => {
    const currentVal = Wistia._sequenceVal || 1;
    const result = `${prefix}${currentVal}${suffix}`;
    Wistia._sequenceVal = currentVal + 1;
    return result;
};