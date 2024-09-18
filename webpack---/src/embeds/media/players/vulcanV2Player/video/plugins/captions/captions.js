import {
    Wistia
} from 'wistia_namespace.js';
import {
    getDeep
} from 'utilities/obj.js';
import {
    wlog
} from 'utilities/wlog.js';
import {
    captionsPromises,
    fetchCaptions
} from '../../../shared/captionsHelper.js';

class CaptionsPlugin extends Wistia.Plugin.Base {
    constructor(video, options) {
        super(video, options);
        this.video = video;
        this.options = options;
        this.captions = null;

        const opts = this.options.language ? {
            language: this.options.language
        } : {};
        this.fetched = fetchCaptions(video, opts).then((captionsResp) => {
            this.captions = captionsResp.captions;
        });
        this.isEnabled = options.on !== false;
        this.unbinds = [];

        // Do this in a timeout so that video.plugin.captions will be set when the
        // controls initialize.
        this.unbinds.push(
            this.video.on('plugininitialized', (pluginName) => {
                if (pluginName !== 'captions') {
                    return;
                }
                if (this.isEnabled) {
                    this.enable();
                    if (this.options.onByDefault) {
                        this.turnOn();
                    } else if (this.options.autoEnableForSilentAutoPlay !== false) {
                        if (this.video.state() === 'playing' && this.video.inSilentPlaybackMode()) {
                            this.turnOn();
                        }
                        this.video.on('play', () => {
                            if (this.video.inSilentPlaybackMode()) {
                                this.turnOn();
                            }

                            return this.video.unbind;
                        });
                        this.video.on('silentplaybackmodechange', (inSilentPlaybackMode) => {
                            if (inSilentPlaybackMode) {
                                this.turnOn();
                            }

                            return this.video.unbind;
                        });
                    }
                } else {
                    this.disable();
                }
            }),
        );
    }

    customizePreview(changeSet) {
        if (!changeSet.anyChanged(['plugin[captions]', 'plugin[captions-v1]', 'ephemeral[captions]'])) {
            return;
        }
        return new Promise((resolve) => {
            const captionsOptions = changeSet.currentValue('plugin[captions]') ||
                changeSet.currentValue('plugin[captions-v1]') || {
                    on: false
                };

            // if the language or text of any captions changed, or a set of captions was
            // added or removed, fetch the new array of captions from the server.
            if (changeSet.changed('ephemeral[captions][captionsArray]')) {
                this.clearCache();
            }

            this.allMountedAndFetched().then(() => {
                this.video.requestControls('customizePreview-captions', 4000);
                const dialog = getDeep(this.video, 'controls.captionsButton.dialog');
                dialog ? .open();
                setTimeout(() => {
                    const dialog = getDeep(this.video, 'controls.captionsButton.dialog');
                    dialog ? .close();
                }, 4000);
                if (!this.captions.length) {
                    const defaultCaptions = [{
                            start: 0,
                            end: 5,
                            text: ['These captions are only an example.']
                        },
                        {
                            start: 5,
                            end: 10,
                            text: ['When you get real captions,', "they'll be automatically enabled."],
                        },
                        {
                            start: 10,
                            end: 15,
                            text: ['Go ahead: upload an SRT or VTT file,', 'or order a transcript!'],
                        },
                    ];
                    this.insertCaptions(defaultCaptions);
                    this.turnOn();
                } else if (captionsOptions.onByDefault) {
                    this.turnOn();
                } else {
                    this.turnOff();
                }

                resolve();
            });
        });
    }

    captionsOptionsChanged(changedOptions) {
        return changedOptions.some((option) => {
            return (
                option.indexOf('plugin[captions-v1]') === 0 || option.indexOf('ephemeral[captions]') === 0
            );
        });
    }

    captionsArrayChanged(changedOptions) {
        return changedOptions.some((option) => {
            return option.indexOf('ephemeral[captions][captionsArray]') === 0;
        });
    }

    enable() {
        this.video.setControlEnabled('captions', true);
        this.video.setControlEnabled('captionsButton', true);
        // This plugin will already be defined by virtue of loading this script, so
        // shouldn't make another request.
        this.video.addPlugin('captions-v1', {
            legacy: true
        });
    }

    disable() {
        this.video.setControlEnabled('captions', false);
        this.video.setControlEnabled('captionsButton', false);
        this.video.removePlugin('captions-v1');
    }

    allMountedAndFetched() {
        const mountPromises = [
            this.video.whenControlMounted('captionsButton'),
            this.video.whenControlMounted('captions'),
        ];
        return Promise.all(mountPromises).then(([captionsButton, captions]) => {
            return Promise.all([captionsButton.fetchCaptions(), captions.fetchCaptions()]);
        });
    }

    turnOn() {
        this.allMountedAndFetched().then(() => {
            const captionsButton = this.video.controls.captionsButton;
            if (!captionsButton) {
                return;
            }
            const preferredCaptions = captionsButton.getPreferredCaptions();
            if (preferredCaptions) {
                captionsButton.setSelectedLanguage(preferredCaptions.language);
            } else {
                const firstInList = captionsButton.captionsResp.captions[0];
                if (firstInList) {
                    captionsButton.setSelectedLanguage(firstInList.language);
                }
            }
        });
    }

    remove() {
        this.unbinds.forEach((e) => {
            if (typeof e === 'function') {
                e();
            } else {
                wlog.warn('trying to unbind a non-function', e);
            }
        });

        this.disable();
        delete this.video.plugin.captions;
        delete this.video.plugin['captions-v1'];

        super.remove();
    }

    turnOff() {
        this.video.controls.captionsButton.turnOff();
    }

    show() {
        this.video.setControlEnabled('captions', true);
    }

    hide() {
        this.video.setControlEnabled('captions', false);
    }

    setSubtitlesScale(s) {
        this.video.whenControlMounted('captions').then(() => {
            this.video.controls.captions.setUserScale(s);
        });
    }

    getSubtitlesScale() {
        if (this.video.controls.captions) {
            return this.video.controls.captions.getUserScale();
        }
        return 1;
    }

    saveOriginalHash(language) {
        if (!this.captions) {
            return;
        }

        if (!this.originalHashByLanguage) {
            this.originalHashByLanguage = {};
        }

        if (!this.originalHashByLanguage[language]) {
            const originalCaptions = this.captions.find((c) => {
                return c.language === language;
            });
            if (originalCaptions) {
                this.originalHashByLanguage[language] = originalCaptions.hash;
            }
        }
    }

    restoreOriginalHash(language) {
        if (!this.captions) {
            return;
        }

        if (!this.originalHashByLanguage) {
            this.originalHashByLanguage = {};
        }

        if (this.originalHashByLanguage[language]) {
            const originalCaptions = this.captions.find((c) => {
                return c.language === language;
            });
            if (originalCaptions) {
                originalCaptions.hash = this.originalHashByLanguage[language];
            }
            delete this.originalHashByLanguage[language];
        }
        this.video.controls.captions ? .setActiveLineForTime(this.video.time());
    }

    restoreOriginalCaptions() {
        Object.keys(this.originalHashByLanguage || {}).forEach((language) => {
            this.restoreOriginalHash(language);
        });
    }

    setCaptionsHash(language, hash) {
        if (!this.captions) {
            return;
        }

        this.captions.forEach((c) => {
            if (c.language === language) {
                c.hash = hash;
            }
        });
        this.video.controls.captions ? .setActiveLineForTime(this.video.time());
    }

    refreshDataFromServer() {
        return new Promise((resolve) => {
            this.clearCache();
            if (
                this.video.isControlEnabled('captions') ||
                this.video.isControlEnabled('captionsButton')
            ) {
                this.video.setControlEnabled('captions', false);
                this.video.setControlEnabled('captionsButton', false);
                const unbind = this.video.on('controldisabled', (handle) => {
                    if (handle === 'captions' || handle === 'captionsButton') {
                        unbind();
                        this.video.setControlEnabled('captions', true);
                        this.video.setControlEnabled('captionsButton', true);
                        this.video.whenControlMounted('captions').then((captions) => {
                            captions.setActiveLineForTime(this.video.time());
                            resolve();
                        });
                    }
                });
            }
        });
    }

    insertCaptions(lines) {
        // for Customize to inject fake temporary captions
        const c = {
            english_name: 'English',
            hash: {
                lines
            },
            language: '_preview_',
            native_name: 'English',
            right_to_left: false,
        };
        const fakeResp = {
            captions: [c],
            preferred_languages: []
        };
        this.video.controls.captions.captionsResp = fakeResp;
        this.video.controls.captionsButton.captionsResp = fakeResp;
        this.video.controls.transcript.captionsResp = fakeResp;
        this.captions = [c];
        captionsPromises[this.video.hashedId()] = Promise.resolve(fakeResp);
    }

    clearCache() {
        this.captions = null;
        delete captionsPromises[this.video.hashedId()];
        this.fetched = fetchCaptions(this.video, this.options).then((captionsResp) => {
            this.captions = captionsResp.captions;
        });
    }

    setLanguage(lang) {
        this.video.controls.captionsButton.setSelectedLanguage(lang);
    }
}

Wistia.plugin('captions', (video, options) => {
    return new CaptionsPlugin(video, options);
});

// Legacy support for usage like video.plugin['captions-v1'].turnOn(), etc.
Wistia.plugin('captions-v1', (video, _options) => {
    return {
        turnOn: () => {
            video.plugin.captions.turnOn();
        },
        turnOff: () => {
            video.plugin.captions.turnOff();
        },
    };
});