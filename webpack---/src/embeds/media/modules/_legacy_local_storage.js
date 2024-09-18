/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */
import {
    setOrGet,
    removeLocalStorage
} from 'utilities/legacyLocalstorage.js';

(function(Wistia) {
    if (Wistia.localStorage) {
        return;
    }

    Wistia.localStorage = setOrGet;
    Wistia.removeLocalStorage = removeLocalStorage;
})(window.Wistia);