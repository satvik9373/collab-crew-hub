import {
    Wistia
} from 'wistia_namespace.js';
import {
    h,
    render
} from 'preact';
import Control from '../../../shared/controls/Control.js';
import {
    ProgressiveThumbnail
} from '../../../../../../shared/ProgressiveThumbnail.jsx';
import shouldShowAsBeforePlay from '../../../shouldShowAsBeforePlay.js';
import {
    destroyControl
} from '../../../../../../shared/control-lifecycle.js';
import {
    defineControl
} from '../../../../../../shared/control_definitions.js';

class ThumbnailControl extends Control {
    constructor(video) {
        super(video);
        this.unbinds.push(
            video.on('play', () => {
                this._hasPlayed = true;
                this.renderThumbnailAndUpdateSwatch();
            }),
            video.on('playrejected', () => {
                this.renderThumbnailAndUpdateSwatch();
            }),
            video.on('playpending', () => {
                this.renderThumbnailAndUpdateSwatch();
            }),
            video.on('up', this.renderThumbnailAndUpdateSwatch),
            video.on('end', this.renderThumbnailAndUpdateSwatch),
        );

        this.eventListeners.set('thumbnailchange', () => {
            this.thumbnailAssets = this.video.thumbnailAssets();
            this.renderThumbnailAndUpdateSwatch();
        });

        // If swatchEnabled is passed, defer to that. Otherwise, use this logic if
        // a swatch element is actually present in the DOM.
        this._swatchEnabled = video._opts.swatchEnabled ?
            video._opts.swatchEnabled :
            video._embedContainer.querySelector('.wistia_swatch');
    }

    destroy() {
        destroyControl(this);
    }

    mount(rootElem) {
        this.rootElem = rootElem;
        this.thumbnailAssets = this.thumbnailAssets || this.video.thumbnailAssets();
        if (!this.shouldShow()) {
            return Promise.resolve();
        }

        const oneSecondElapsed = new Promise((resolve) => {
            setTimeout(resolve, 1000);
        });
        const thumbnailRendered = new Promise((resolve) => {
            this.renderThumbnailAndUpdateSwatch(resolve);
            this.video.embedded(() => {
                if (!this.__destroyed) {
                    this.renderThumbnailAndUpdateSwatch();
                }
            });
        });
        return Promise.race([thumbnailRendered, oneSecondElapsed]);
    }

    renderThumbnail = (onDisplay) => {
        const video = this.video;
        const lastPlay = video.lastPlayInfo();
        const timeSincePlay = Date.now() - lastPlay.issuedAt;

        // checking for existence here because we want to allow empty strings as valid alt tags. Null is used to determine
        // if we should fall back to the default player translation for the alt tag.
        const thumbnailAltText = video.embedOptions().thumbnailAltText;

        // To clarify the isPending logic:
        // - If the state() is beforeplay and isPending === false, then we are not
        //   trying to play the video, so we want to show the thumbnail.
        // - If the state() is beforeplay and isPending === true, then we are
        //   trying to play the video, and we want to show the thumbnail until 2
        //   seconds has elapsed.
        this._isVisible = this.shouldShow();

        const isBackgroundTransparent = video._attrs.transparentLetterbox === true;

        render( <
            ProgressiveThumbnail { ...this.props
            }
            backgroundColor = {
                isBackgroundTransparent ? 'transparent' : undefined
            }
            elemRef = {
                (elem) => (this.thumbnailElem = elem)
            }
            images = {
                this.thumbnailAssets
            }
            isVisible = {
                this.shouldShow()
            }
            onDisplay = {
                onDisplay
            }
            hashedId = {
                this.video.hashedId()
            }
            swatchEnabled = {!video._attrs.poster && this._swatchEnabled
            }
            uiHasRendered = {
                this.video._impl.ui.hasRendered()
            }
            fitStrategy = {
                this.video._opts.fitStrategy
            }
            thumbnailAltText = {
                thumbnailAltText
            }
            />,
            this.rootElem,
        );

        if (this._isVisible) {
            this._hasRenderedVisible = true;
        }

        // We might want this to hide in 2 seconds if the video still hasn't
        // played.
        const timeoutTime = 2000 - timeSincePlay + 1;
        if (this._isVisible && timeSincePlay < 2000) {
            setTimeout(() => {
                if (!this._destroyed) {
                    this.renderThumbnailAndUpdateSwatch();
                }
            }, timeoutTime);
        }

        this.reactMounts = [this.rootElem];
    };

    renderThumbnailAndUpdateSwatch = (args) => {
        this.renderThumbnail(args);
        this.updateSwatch();
    };

    shouldShow() {
        return Boolean(shouldShowAsBeforePlay(this.video) && this.video.thumbnailAssets().length);
    }

    onControlPropsUpdated(prevProps) {
        if (!this._hasRenderedVisible) {
            return;
        }

        const propsWeCareAbout = ['videoWidth', 'videoHeight', 'playerLanguage', 'playerBorderRadius'];
        const anyPropChanged = propsWeCareAbout.some((prop) => {
            return this.props[prop] !== prevProps[prop];
        });
        if (anyPropChanged) {
            this.renderThumbnailAndUpdateSwatch();
        }
    }

    updateSwatch() {
        const swatch = this.video._embedContainer.querySelector('.wistia_swatch');
        if (swatch) {
            swatch.style.borderRadius = `${this.props.playerBorderRadius}px`;
        }
    }
}

// XXX: Temporary compatibility.
const shouldShow = function() {
    return shouldShowAsBeforePlay(this.video);
};
ThumbnailControl.shouldShow = shouldShow;

ThumbnailControl.shouldMount = (video) => {
    if (video._opts.spherical) {
        return false;
    }

    return true;
};

ThumbnailControl.handle = 'thumbnail';
ThumbnailControl.type = 'background';
ThumbnailControl.sortValue = 1000;
defineControl(ThumbnailControl);

export default ThumbnailControl;