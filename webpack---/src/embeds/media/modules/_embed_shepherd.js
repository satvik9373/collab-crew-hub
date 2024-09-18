/*
 * decaffeinate suggestions:
 * DS002: Fix invalid constructor
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS202: Simplify dynamic range loops
 * DS205: Consider reworking code to avoid use of IIFEs
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */

import {
    wlog
} from 'utilities/wlog.js';
import {
    wData
} from 'utilities/wistiaData.js';
import {
    doTimeout
} from 'utilities/timeout-utils.js';
import {
    seqId
} from 'utilities/seqid.js';
import {
    elemInDom,
    elemIsHidden
} from '../../../utilities/elem.js';

(function(Wistia) {
    if (Wistia.EmbedListener) {
        return;
    }

    Wistia.EmbedListener = class EmbedListener extends Array {
        constructor() {
            super();
            this.uuid = seqId();
            this.logger = wlog.getPrefixedFunctions('EmbedShepherd');
            this.bindHandles();
            this.bind('down', () => {
                this.logger.info('got down event, prune and rebind handles');
                return doTimeout('prune_zombies_later', () => {
                    this.pruneZombies();
                    return this.bindHandles();
                });
            });
            this.bind('up', (video) => {
                this.logger.info('got up event, set _bound=false for', video);
                video._bound = false;
                return this.bindHandles();
            });
        }

        bindHandles() {
            const allUnboundHandles = this.allUnboundHandles();
            this.logger.info('bindHandles', allUnboundHandles);
            return (() => {
                const result = [];
                for (let handle of Array.from(allUnboundHandles)) {
                    this.logger.info('bind to all events for', handle);
                    // Actually marshalling events is now handled directly from
                    // PublicApi#trigger and Iframeapi#trigger monkeypatches to avoid code
                    // deoptimization, which leads to memory leaks on re-embed if setup
                    // when binding 'all' from here.
                    handle._bound = true;
                    result.push(this.push(handle));
                }
                return result;
            })();
        }

        isHandleDown(handle) {
            if (handle.looksDown) {
                return handle.looksDown();
            }

            const container = handle.container;

            return !container || !elemInDom(container) || elemIsHidden(container);
        }

        pruneZombies() {
            let handle;
            this.logger.info('pruneZombies');
            const saved = [];
            for (handle of Array.from(this.allBoundHandles())) {
                if (this.isHandleDown(handle)) {
                    this.logger.info('prune zombie', handle);
                } else {
                    saved.push(handle);
                }
            }
            for (
                let i = 0, end = this.length, asc = end >= 0; asc ? i <= end : i >= end;
                // eslint-disable-next-line no-plusplus
                asc ? i++ : i--
            ) {
                delete this[i];
            }
            this.length = 0;
            return (() => {
                const result = [];
                for (handle of Array.from(saved)) {
                    result.push(this.push(handle));
                }
                return result;
            })();
        }

        allBoundHandles() {
            const result = [];
            for (let handle of Array.from(this.allHandles())) {
                if (handle._bound) {
                    result.push(handle);
                }
            }
            return result;
        }

        allUnboundHandles() {
            const result = [];
            for (let handle of Array.from(this.allHandles())) {
                if (!handle._bound) {
                    result.push(handle);
                }
            }
            return result;
        }

        allHandles() {
            return this.apiHandles().concat(this.iframeApiHandles());
        }

        iframeApiHandles() {
            if (!this.iframes) {
                this.iframes = document.getElementsByTagName('iframe');
            }
            const result = [];
            for (let iframe of Array.from(this.iframes)) {
                if (
                    iframe.wistiaApi &&
                    !(iframe.wistiaApi instanceof Wistia.IframeApiProxy) &&
                    iframe.wistiaApi !== 'removed'
                ) {
                    result.push(iframe.wistiaApi);
                }
            }
            return result;
        }

        apiHandles() {
            const result = [];
            if (window.Wistia) {
                const vidHash = wData('video');
                for (let uuid in vidHash) {
                    let handle = vidHash[uuid];
                    result.push(handle);
                }
            }
            return result;
        }

        each(fn) {
            return Array.from(this.allBoundHandles()).map((handle) => fn(handle));
        }

        onFind(fn) {
            const runWhenUp = (video) => {
                return video.up(() => {
                    this.logger.info('onFind', video);
                    fn(video);
                    return video.unbind;
                });
            };
            this.each(runWhenUp);
            return this.bind('initembed', runWhenUp);
        }
    };

    Wistia.mixin(Wistia.EmbedListener.prototype, Wistia.bindable);

    Wistia._initializers.initEmbedShepherd = function() {
        if (window.wistiaEmbeds) {
            wlog.info('EmbedShepherd window.wistiaEmbeds already exists, call bindHandles');
            window.wistiaEmbeds.bindHandles ? .();
        } else {
            wlog.info('EmbedShepherd initialize embed shepherd');
            window.wistiaEmbeds = new Wistia.EmbedListener();
        }

        wlog.info('EmbedShepherd call window.wistiaEmbedShepherdReady()');
        return window.wistiaEmbedShepherdReady ? .();
    };

    return (Wistia._destructors.destroyEmbedShepherd = function() {
        window.wistiaEmbeds ? .each((video) => (video._bound = false));
        return (window.wistiaEmbeds = null);
    });
})(window.Wistia);