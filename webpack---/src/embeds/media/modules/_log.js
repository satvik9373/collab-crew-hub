/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */

import {
    wlog,
    LOG_LEVELS
} from 'utilities/wlog.js';
import {
    parseUrl
} from 'utilities/url.js';

(function(Wistia) {
    const W = Wistia;
    if (Wistia.wlog) {
        return;
    }

    Wistia.wlog = wlog;

    Wistia.log = wlog.error;
    Wistia.error = wlog.error;
    Wistia.warn = wlog.warn;
    Wistia.notice = wlog.notice;
    Wistia.info = wlog.info;
    Wistia.debug = wlog.debug;
    Wistia.logLevels = LOG_LEVELS;

    // Convenient for logging the trace of the current location. Works on Chrome
    // and a few other browsers.
    Wistia.stacktrace = function() {
        try {
            throw new Error('stacktrace');
        } catch (e) {
            return e.stack;
        }
    };

    Wistia.logHelpers = {
        _log(type, ...messages) {
            const logFn = W[type];
            messages = [].concat(this._logPrefix()).concat(messages);
            return logFn(...Array.from(messages || []));
        },
        _logPrefix() {
            return [this.constructor.name];
        },
        error(...messages) {
            return this._log('error', ...Array.from(messages));
        },
        warn(...messages) {
            return this._log('notice', ...Array.from(messages));
        },
        notice(...messages) {
            return this._log('notice', ...Array.from(messages));
        },
        info(...messages) {
            return this._log('info', ...Array.from(messages));
        },
        debug(...messages) {
            return this._log('debug', ...Array.from(messages));
        },
        log(...messages) {
            return this._log('error', ...Array.from(messages));
        },
    };

    Wistia._initializers.initWLog = function() {
        // Allow the page to override the log level
        let level;
        let referrerUrl;
        let wgrep;
        let wgrepv;
        const pageUrl = parseUrl(location.href);
        if (document.referrer) {
            referrerUrl = parseUrl(document.referrer);
        }

        if ((level = pageUrl ? .params ? .wlog) || (top !== self && (level = referrerUrl ? .params ? .wlog))) {
            wlog.setLevel(level);
        }

        if ((wgrep = pageUrl ? .params ? .wgrep) || (wgrep = referrerUrl ? .params ? .wgrep)) {
            wlog.setGrep(new RegExp(wgrep, 'i'));
        }

        if ((wgrepv = pageUrl ? .params ? .wgrepv) || (wgrepv = referrerUrl ? .params ? .wgrepv)) {
            return wlog.setGrepv(new RegExp(wgrepv, 'i'));
        }
    };

    return (Wistia._destructors.destroyWLog = () => wlog ? .reset());
})(window.Wistia);