import {
    getLastTime
} from 'utilities/resumableVideoData.js';
import {
    one,
    READY
} from 'utilities/assets.js';
import {
    doTimeout
} from 'utilities/timeout-utils.js';
import {
    isMouseDown
} from 'utilities/isMouseDown.js';
import {
    elemBind,
    formInputIsFocused
} from 'utilities/elem.js';
import {
    h,
    render
} from 'preact';
import {
    destroyControl
} from '../../../../../shared/control-lifecycle.js';
import Playbar from '../ui_components/Playbar.jsx';
import Control from './Control.js';

const LEFT_KEY = 37;
const RIGHT_KEY = 39;
const PAGE_UP_KEY = 33;
const PAGE_DOWN_KEY = 34;
const SPACEBAR_KEY = 32;

class PlaybarControlBase extends Control {
    constructor(video) {
        super(video);
        this.PlaybarComponent = Playbar;
        this.showTime = true;
    }

    destroy() {
        destroyControl(this);
    }

    mount(rootElem) {
        super.mount(rootElem);

        this.eventListeners.set('playercolorchange', () => this.render());
        this.eventListeners.set('resumablechange', () => this.render());

        const {
            video
        } = this;
        this.unbinds.push(
            video.on('play', () => {
                this.render();
            }),
            video.on('pause', () => {
                this.render();
            }),
            video.on('progress', this.renderIfNotPlaying),
            video.on('timechange', () => {
                this.render();
            }),
            video.on('end', () => {
                this.render();
            }),
            video.on('widthchange', () => {
                this.render();
            }),
            video.on('seeking', () => {
                this.render();
            }),
            video.on('trimchange', () => {
                // This isn't a frequent operation and it would affect a lot of
                // shouldComponentUpdate checks. Instead of marshalling it all the way
                // through our components, let's force a hard re-render of everything.
                this.renderNothing();
                this.render();
            }),
            elemBind(document, 'keydown', this.onKeyDown),
            elemBind(document, 'keyup', this.onKeyUp),
        );

        const bindToChaptersEvents = () => {
            const chaptersPlugin = video.plugin.chapters;
            this.unbinds.push(
                chaptersPlugin.on('focuschange', () => {
                    this.render();
                }),
                chaptersPlugin.on('changechapters', () => {
                    this.render();
                }),
            );
        };
        video.plugin('chapters').then(bindToChaptersEvents);
        video.on('plugininitialized', (pluginName) => {
            if (pluginName === 'chapters') {
                bindToChaptersEvents();
            }
        });

        this.render();
    }

    onControlPropsUpdated(prevProps) {
        if (prevProps.width !== this.props.width) {
            this.render();
        }

        if (prevProps.controlsAreVisible && !this.props.controlsAreVisible) {
            this.render();
        }

        if (!prevProps.controlsAreVisible && this.props.controlsAreVisible) {
            this.render();
        }

        if (this.props.controlBarBorderRadius !== prevProps.controlBarBorderRadius) {
            this.render();
        }
    }

    onResize = ({
        playbarBarWidth,
        playbarBarLeftOffsetFromPlayerLeftEdge
    }) => {
        // We bind to this event over in the timeline UI on the media page in
        // wistia/wistia.
        this.video.trigger('playbarresize', {
            playbarBarWidth,
            playbarBarLeftOffsetFromPlayerLeftEdge,
        });
    };

    render() {
        if (this.video.publicApi.isLiveMedia()) {
            this.renderNothing();
        } else {
            this.renderPlaybar();
        }
    }

    renderPlaybar = () => {
        const video = this.video;

        const chaptersPlugin = video.plugin.chapters;
        const chapters = chaptersPlugin ? chaptersPlugin.getAllChapters() : [];
        const chapterWithVisibleTitle = chaptersPlugin ?
            chaptersPlugin.getChapterWithVisibleTitle() :
            null;
        const chapterWithFocusedMarker = chaptersPlugin ?
            chaptersPlugin.getChapterWithFocusedMarker() :
            null;

        const PlaybarComponent = this.PlaybarComponent;
        render( <
            PlaybarComponent getCurrentTime = {
                this.getCurrentTime
            }
            getCurrentBufferTime = {
                this.getCurrentBufferTime
            }
            duration = {
                video.duration()
            }
            isBeforePlay = {
                video.state() === 'beforeplay'
            }
            isVisible = {
                this.props.controlsAreVisible
            }
            isPlaying = {
                video.state() === 'playing'
            }
            isSeeking = {
                video._impl.engine && video._impl.engine.isSeeking()
            } { ...this.props
            }
            onDragStart = {
                this.onDragStart
            }
            onDrag = {
                this.onDrag
            }
            onDragEnd = {
                this.onDragEnd
            }
            onBlur = {
                this.onBlurPlaybar
            }
            onFocus = {
                this.onFocusPlaybar
            }
            isPlaceholder = {
                this.isPlaceholder()
            }
            chapters = {
                chapters
            }
            chapterWithFocusedMarker = {
                chapterWithFocusedMarker
            }
            chapterWithVisibleTitle = {
                chapterWithVisibleTitle
            }
            onClickChapter = {
                this.onClickChapter
            }
            onMouseEnterOrFocusChapter = {
                this.onMouseEnterOrFocusChapter
            }
            onMouseLeaveOrBlurChapter = {
                this.onMouseLeaveOrBlurChapter
            }
            mediaData = {
                this.video._mediaData
            }
            embedOptions = {
                this.video._opts
            }
            color = {
                this.video.playerColor()
            }
            showTime = {
                this.showTime
            }
            shouldShowStoryboard = {
                this.shouldShowStoryboard()
            }
            shouldShowChapterTitles = {
                true
            }
            shouldShowTime = {
                this.shouldShowTime()
            }
            storyboardAsset = {
                this.storyboardAsset()
            }
            leftControlBarWidth = {
                this.props.leftControlBarWidth
            }
            setTimeWidth = {
                this.setTimeWidth
            }
            setRightBarMargin = {
                this.setRightBarMargin
            }
            resumableTime = {
                this.resumableTime()
            }
            getDurationBeforeCuts = {
                this.getDurationBeforeCuts
            }
            getTimeBeforeCuts = {
                this.getTimeBeforeCuts
            }
            onResize = {
                this.onResize
            }
            />,
            this.rootElem,
        );
        this.reactMounts = [this.rootElem];
    };

    getDurationBeforeCuts = () => {
        if (!this.video ? .engine) {
            return -1;
        }

        return this.video.engine.getDurationBeforeCuts();
    };

    getTimeBeforeCuts = (t) => {
        if (!this.video ? .engine) {
            return -1;
        }

        return this.video.engine.getTimeBeforeCuts(t);
    };

    resumableTime() {
        if (!this.video.shouldResume()) {
            return;
        }
        return getLastTime(this.video.hashedId());
    }

    setTimeWidth = (timeWidth) => {
        this._timeWidth = timeWidth;
    };

    timeWidth() {
        return this._timeWidth;
    }

    setRightBarMargin = (rightBarMargin) => {
        this._rightBarMargin = rightBarMargin;
    };

    rightBarMargin() {
        return this._rightBarMargin;
    }

    renderNothing = () => {
        render( < nothing / > , this.rootElem);
        this.reactMounts = [this.rootElem];
    };

    renderIfNotPlaying = () => {
        if (this.video.state() !== 'playing') {
            this.render();
        }
    };

    getCurrentTime = () => {
        return this.video ? this.video.time() : 0;
    };

    getCurrentBufferTime = () => {
        const buffered = this.video ? this.video.getBuffered() : [];
        if (buffered.length === 0) {
            return 0;
        }
        return buffered[buffered.length - 1].end;
    };

    chaptersPlugin() {
        return this.video.plugin.chapters;
    }

    onClickChapter = (e, chapter) => {
        if (!chapter) {
            return;
        }
        this.video.time(chapter.time);
        if (this.video.state() === 'beforeplay') {
            this.video.play();
        }
    };

    onMouseEnterOrFocusChapter = (e, chapter) => {
        if (!chapter) {
            return;
        }
        this.chaptersPlugin().setChapterWithVisibleTitle(chapter.id);
        this.chaptersPlugin().setChapterWithFocusedMarker(chapter.id);
    };

    onMouseLeaveOrBlurChapter = () => {
        this.chaptersPlugin().setChapterWithVisibleTitle(null);
        this.chaptersPlugin().setChapterWithFocusedMarker(null);
    };

    onDragStart = (e, percent) => {
        this.video.requestControls('playbar-drag');
        this.stateBeforeDrag = this.video.state();
        this.onDrag(e, percent);
        doTimeout(
            `${this.video.uuid}.maybe-pause-on-scrub`,
            () => {
                if (isMouseDown()) {
                    this.video.pause();
                }
            },
            300,
        );
    };

    onDrag = (e, percent) => {
        if (!this.video) {
            return;
        }
        const timeToSeekTo = percent * this.video.duration();
        if (timeToSeekTo === this._timeSeekedToRecently) {
            // Since we call onDrag in the handlers for 'mousedown' _and_ 'mouseup', we
            // disable seeking to the exact same time again within a few hundred ms. the
            // video would otherwise:
            // - seek
            // - continue playing for a moment after the seek while the mouse is down
            // - seek back to that same seek point again on mouse up
            // We call that the "double-seek jitter" and it is bad.
            return;
        }
        this.video.time(timeToSeekTo);
        this._timeSeekedToRecently = timeToSeekTo;
        doTimeout(
            `${this.video.uuid}.prevent-double-seek`,
            () => {
                this._timeSeekedToRecently = null;
            },
            300,
        );
    };

    onDragEnd = (e, percent) => {
        if (!this.video) {
            return;
        }
        this.video.releaseControls('playbar-drag');
        this.onDrag(e, percent);
        this.video.trigger('playbardragend');
        if (this.stateBeforeDrag === 'beforeplay' || this.stateBeforeDrag === 'playing') {
            this.video.play();
        }
    };

    onFocusPlaybar = () => {
        this.video.enterInputContext('playbar-focus');
    };

    onBlurPlaybar = () => {
        this.video.exitInputContext('playbar-focus');
    };

    // TODO: This handler will probably move to the player level.
    onKeyDown = (e) => {
        const video = this.video;
        if (!this.isVisible() || this.video._opts.spherical) {
            return;
        }

        if (formInputIsFocused()) {
            return;
        }

        const context = video.getInputContext();

        if (
            context !== 'playbar-focus' &&
            context !== 'player-mouseover' &&
            context !== 'background-focus' &&
            context !== 'player-focus'
        ) {
            return;
        }

        const duration = video.duration();
        const keyCode = e.keyCode;

        if (keyCode === SPACEBAR_KEY) {
            // this prevent default is requied to stop us from scrolling the page
            // when clicking spacebar in the playbar focus or mouseover context
            if (context === 'playbar-focus' || context === 'player-mouseover') {
                e.preventDefault();
            }

            return;
        }

        if (this.keyDownStartedAt == null) {
            this.keyDownStartedAt = Date.now();
        }
        const timeSinceKeyDown = Date.now() - this.keyDownStartedAt;
        let timeDiff = 0;
        if (video.state() === 'playing') {
            if (e.shiftKey || timeSinceKeyDown > 200) {
                if (keyCode === PAGE_UP_KEY || keyCode === PAGE_DOWN_KEY) {
                    if (duration < 30) {
                        timeDiff = 5;
                    } else if (duration < 60) {
                        timeDiff = 10;
                    } else {
                        timeDiff = 10 + duration / 60;
                    }
                } else if (duration < 30) {
                    timeDiff = 2;
                } else if (duration < 60) {
                    timeDiff = 5;
                } else {
                    timeDiff = 5 + duration / 60 / 2;
                }
            } else if (keyCode === PAGE_UP_KEY || keyCode === PAGE_DOWN_KEY) {
                if (duration < 60) {
                    timeDiff = 5;
                } else {
                    timeDiff = 20;
                }
            } else {
                timeDiff = 2;
            }
        } else if (e.shiftKey || timeSinceKeyDown > 200) {
            timeDiff = 1;
        } else {
            timeDiff = 1 / 24;
        }

        let dir = 0;
        if (keyCode === RIGHT_KEY || keyCode === PAGE_UP_KEY) {
            dir = 1;
        } else if (keyCode === LEFT_KEY || keyCode === PAGE_DOWN_KEY) {
            dir = -1;
        }

        if (dir === -1) {
            e.preventDefault();
            video.time(video.time() - timeDiff);
        } else if (dir === 1) {
            e.preventDefault();
            video.time(video.time() + timeDiff);
        }
    };

    onKeyUp = (e) => {
        if (!this.isVisible()) {
            return;
        }

        if (formInputIsFocused()) {
            return;
        }

        this.keyDownStartedAt = null;

        const video = this.video;
        const context = video.getInputContext();
        if (context === 'playbar-focus') {
            if (e.keyCode === SPACEBAR_KEY) {
                if (video.state() === 'playing') {
                    video.pause();
                } else {
                    video.play();
                }
            }
        }
    };

    isPlaceholder() {
        return false;
    }

    isVisible() {
        return true;
    }

    shouldShowTime() {
        return true;
    }

    shouldShowStoryboard() {
        if (this._shouldShowStoryboard != null) {
            return this._shouldShowStoryboard;
        }

        const hasReadyStoryboardAsset = !!this.storyboardAsset();
        const isTwoStroke = !!this.video._mediaData.secondaryMediaData;

        return (this._shouldShowStoryboard = hasReadyStoryboardAsset && !isTwoStroke);
    }

    storyboardAsset() {
        return one(this.video._mediaData.assets, {
            type: 'storyboard',
            status: READY,
            metadata: (m) => {
                return m && m.frame_count && m.frame_width && m.frame_height;
            },
        });
    }
}

export default PlaybarControlBase;