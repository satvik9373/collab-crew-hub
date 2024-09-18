/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */

import {
    eV1Protocol
} from 'utilities/hosts.js';
import {
    proto
} from 'utilities/url.js';
import {
    doTimeout,
    clearTimeouts
} from 'utilities/timeout-utils.js';
import {
    seqId
} from 'utilities/seqid.js';
import {
    merge
} from 'utilities/obj.js';

(function(Wistia) {
    Wistia.BandwidthTest = class BandwidthTest {
        constructor(opt) {
            this.opt = opt;
            this.opt = merge({
                    minKbps: 2500,
                    timeoutLength: 4000,
                    freshFor: 3600000,
                },
                this.opt,
            );
            if (!this.opt.uuid) {
                this.opt.uuid = seqId('bandwidth_test_');
            }
        }

        start() {
            this._testXhr ? .abort();
            this._testStart = new Date().getTime();
            this._testXhr = new XMLHttpRequest();
            this._testXhr.open('GET', this.testFileUrl(), true);

            // The problem we've had in the past with moving to a non-fastly CDN is
            // that the client cache expiry must match how long the file is cached on
            // the CDN. Because of that, for repeated bandwidth tests, we basically
            // had to choose between always pulling from origin (because the file is
            // expired) or always pulling from cache, neither of which would give an
            // accurate representation of whether you can support HD.
            //
            // To combat that problem, we use a trick with Range requests to strike a
            // balance between pulling from origin and avoiding the local cache. When
            // one of our CDNs receives a range request for a file, they will do the
            // following:
            //
            // 1. Proxy the exact request back to us so it's served quickly.
            // 2. Make a second request for the full file.
            // 3. Cache the full file on an edge node.
            // 4. Subsequent range requests are served directly from the edge node,
            // using the fully cached file.
            //
            // So to minimize requests to origin, I uploaded a 100MB file to the
            // bakery. For any given bandwidth test, it will pick a random 1MB chunk
            // of the file and download that. This makes sure that, the vast majority
            // of the time, the file is being pulled from the CDN but is not cached
            // locally.
            //
            // The client-side expiry of the file is set to 1 day, so every day our
            // chances of getting an already-cached file will reset to 0.
            const randIndex = Math.floor(Math.random() * 100);
            const startOffset = randIndex * 1000000;
            const endOffset = startOffset + 999999;
            this._testXhr.setRequestHeader('Range', `bytes=${startOffset}-${endOffset}`);

            // If the image takes longer than the allotted time, bail.
            doTimeout(
                `${this.uuid}.cancel_bandwidth_test`,
                () => {
                    this.trigger('timeout');
                    return this.fail();
                },
                this.opt.timeoutLength,
            );

            // If the bandwidth test ends early, then progress can be used to
            // determine approximate bandwidth.
            this._testDataLoaded = 0;
            this._onTestXhrProgress = (event) => {
                this._testDataLoaded = event.loaded;
                return this.trigger('progress', event);
            };
            this._testXhr.addEventListener('progress', this._onTestXhrProgress);

            // If the image finishes, then we're good to go.
            this._onTestXhrLoaded = () => this.succeed();
            this._testXhr.addEventListener('load', this._onTestXhrLoaded);

            this._testXhr.send(null);
            return this.trigger('started');
        }

        fail() {
            this._sampleKbps();
            this._supportsHd = false;
            this.saveResult();
            this.trigger('failed');
            return this.end();
        }

        succeed() {
            this._sampleKbps();
            this._supportsHd = true;
            this.saveResult();
            this.trigger('succeeded');
            this.end();
            if (this._suspiciouslyFast()) {
                return this._reportSuspiciousBandwidthTest();
            }
        }

        _reportSuspiciousBandwidthTest() {
            try {
                if (this._suspiciouslyFast()) {
                    return Wistia.Metrics.count('player/suspicious-bandwidth-test', 1, {
                        bw_test_time: this._testTime,
                        visitor_key: Wistia.visitorKey.value(),
                        location: location ? .protocol ? .length && location ? .hostname ? .length ?
                            `${location.protocol}//${location.hostname}` :
                            null,
                        connection_type: Wistia.Metrics.connectionType(),
                        agent: navigator.userAgent,
                    });
                }
            } catch (e) {
                return Wistia.error(e);
            }
        }

        _suspiciouslyFast() {
            return this._testTime < 0.05;
        }

        _sampleKbps() {
            this._testEnd = new Date().getTime();
            this._testTime = (this._testEnd - this._testStart) / 1000;
            return (this._kbps = (this._testDataLoaded * 8) / 1000 / this._testTime);
        }

        endEarly() {
            if (this._supportsHd == null && this._testDataLoaded != null) {
                this._sampleKbps();
                this._supportsHd = this._testTime > 1 ? this._kbps >= this.opt.minKbps : true;
                this.trigger('ended-early');
                return this.end();
            }
            this.end();
            return this.trigger('ended-early');
        }

        end() {
            // GC
            if (this._onTestXhrLoaded) {
                this._testXhr ? .removeEventListener('load', this._onTestXhrLoaded);
            }
            if (this._onTestXhrProgress) {
                this._testXhr ? .removeEventListener('progress', this._onTestXhrProgress);
            }

            // Stop the request
            this._testXhr ? .abort();
            this._testXhr = null;

            // Clear related async methods
            clearTimeouts(`${this.uuid}.cancel_bandwidth_test`);

            return this.trigger('ended');
        }

        testFileUrl() {
            return (
                this.opt.testFileUrl ||
                (proto() === 'https:' ?
                    'https://embed-ssl.wistia.com/deliveries/6992339c876a95a37250fbe5b0a0eaecca3018a5/file.jpg?bust=2015-12-29a' :
                    'http://embed.wistia.com/deliveries/76a57ca47a1978a834d82dcf7eeb03a6.bin?bust=2015-12-29a')
            );
        }

        saveKey() {
            return this.opt.saveKey || 'bandwidth_test';
        }

        saveResult() {
            return Wistia.localStorage(this.saveKey(), {
                updatedAt: new Date().getTime(),
                supportsHd: this._supportsHd,
                clientKbps: this._kbps,
            });
        }

        savedResult() {
            return Wistia.localStorage(this.saveKey());
        }

        isFresh() {
            const elapsed = new Date().getTime() - (this.savedResult() ? .updatedAt || 0);
            return elapsed < this.opt.freshFor;
        }

        supportsHd() {
            return this._supportsHd || false;
        }
    };

    return Wistia.mixin(Wistia.BandwidthTest.prototype, Wistia.bindable);
})(window.Wistia);