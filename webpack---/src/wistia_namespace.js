import {
    root
} from 'utilities/root.js';

if (root.Wistia == null) {
    root.Wistia = {};
}

export const Wistia = root.Wistia;

if (Wistia._initializers == null) {
    Wistia._initializers = {};
}

if (Wistia._destructors == null) {
    Wistia._destructors = {};
}

if (Wistia.mixin == null) {
    Wistia.mixin = (klass, obj) => {
        for (let k in obj) {
            if (Object.hasOwn(obj, k)) {
                klass[k] = obj[k];
            }
        }
    };
}

if (Wistia._remoteData == null) {
    Wistia._remoteData = new Map();
}

if (Wistia._mediaDataPromises == null) {
    Wistia._mediaDataPromises = {};
}