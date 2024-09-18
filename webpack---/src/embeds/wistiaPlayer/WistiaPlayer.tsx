import { Fragment, h, render } from 'preact';
import { isNotNil } from '@wistia/type-guards';
import { Wistia } from '../../wistia_namespace.ts';
import type { Authorization, FullscreenState, WistiaFullscreenContainer } from './types.ts';
import type { EmailChangeEventData } from '../../types/custom-event-data.js';
import type { WistiaPlayerEvents } from '../../types/events.ts';
import type {
  AnnotationOverlayOptions,
  AllowedQualities,
  EmbedOptions,
  LoggerType,
  JudyContext,
  PublicApi,
  MediaData,
  Mux,
  PublicApiOptions,
  PlayerState,
  Players,
  PopoverAnimation,
  PopoverContentSettings,
  WistiaLocalStorage,
  MediaDataServerErrorResponse,
} from '../../types/player-api-types.ts';
import { PreloadThumbnail } from './components/PreloadThumbnail.tsx';
import { PlayerDataProvider } from './hooks/usePlayerData.tsx';
import { DEFAULT_ASPECT } from './utilities/constants.ts';
import { PlayerDataHandler } from './utilities/PlayerDataHandler.ts';
import { appHostname } from '../../appHostname.js';
import { thumbnailAssets as getThumbnailAssets } from '../../utilities/assets.js';
import { didWinCoinFlip } from '../../utilities/coinFlip.ts';
import { detectIsMobile } from '../../utilities/detect.js';
import { dynamicImport } from '../../utilities/dynamicImport.ts';
import { setEmbedOptionStore } from '../../utilities/embedOptionStore.ts';
import { elemWidth } from '../../utilities/elem.js';
import {
  API_READY_EVENT,
  INTERNAL_API_ON_FIND_EVENT,
  AFTER_REPLACE_EVENT,
  LOADED_MEDIADATA_EVENT,
} from '../../utilities/eventConstants.ts';
import { extractEmailFromParams } from '../../utilities/extractEmailFromParams.ts';
import { cdnFastWistiaComHost } from '../../utilities/hosts.js';
import { inferPageUrl } from '../../utilities/inferPageUrl.ts';
import { buildContext, choosePlayer } from '../../utilities/judy.js';
import { getDefaultPlayerBorderRadius } from '../../utilities/roundedPlayerDefaults.ts';
import { runScript } from '../../utilities/runScript.js';
import { MUX_PERCENTAGE_TO_ENABLE, shouldEnableMux } from '../../utilities/shouldEnableMux.ts';
import { countMetric } from '../../utilities/simpleMetrics.js';
import { isVisitorTrackingEnabled } from '../../utilities/trackingConsentApi.js';
import { proto } from '../../utilities/url.js';
import {
  getWistiaLocalStorage,
  updateWistiaLocalStorage,
} from '../../utilities/wistiaLocalStorage.js';
import { getWistiaOptions } from '../../utilities/wistiaOptions.ts';
import { maybeStartWistiaQueue } from '../../utilities/wistiaQueue.ts';
import { wlog } from '../../utilities/wlog.js';
import { injectJsonLd, removeInjectedJsonLd } from '../../utilities/injectJsonLd.js';
import { getInitialMediaData } from './utilities/getInitialMediaData.ts';
import { isMediaDataError } from '../../utilities/mediaDataError.ts';

// The component will not run without these attributes.
const requiredAttributes = ['media-id'];

// Optional attributes surfaced in documentation to our customers.
const optionalPublicAttributes = [
  'aspect',
  'audio-description-control',
  'autoplay',
  'big-play-button',
  'controls-visible-on-load',
  'copy-link-and-thumbnail',
  'current-time',
  'do-not-track',
  'email',
  'end-video-behavior',
  'fullscreen-control',
  'muted',
  'playback-rate-control',
  'play-bar-control',
  'player-color',
  'playlist-links',
  'playlist-loop',
  'play-pause-control',
  'play-pause-notifier',
  'popover-animate-thumbnail',
  'popover-animation',
  'popover-border-color',
  'popover-border-radius',
  'popover-border-width',
  'popover-box-shadow',
  'popover-caption',
  'popover-caption-container',
  'popover-content',
  'popover-disable-autoplay',
  'popover-overlay-color',
  'popover-overlay-opacity',
  'popover-prevent-scroll',
  'popover-show-on-load',
  'poster',
  'preload',
  'quality-control',
  'quality-max',
  'quality-min',
  'resumable',
  'rounded-player',
  'seo',
  'settings-control',
  'silent-autoplay',
  'transparent-letterbox',
  'video-quality',
  'volume',
  'volume-control',
  'wistia-popover',
];

// Optional attributes used by Wistia developers.
const optionalPrivateAttributes = [
  'big-play-button-border-radius',
  'control-bar-border-radius',
  'embed-host',
  'hls',
  'page-url',
  'player-border-radius',
  'player-force',
  'stats-url',
  'swatch',
  'unique-id',
  'use-web-component',
];

const defaultEmbedOptions = {
  audioDescriptionControl: false,
  autoplay: false,
  bigPlayButton: true,
  bigPlayButtonBorderRadius: undefined,
  controlBarBorderRadius: undefined,
  controlsVisibleOnLoad: true,
  copyLinkAndThumbnail: true,
  currentTime: 0,
  doNotTrack: false,
  endVideoBehavior: 'default',
  fullscreenControl: true,
  hls: true,
  playBarControl: true,
  playerBorderRadius: undefined,
  playerColor: '636155',
  playPauseControl: true,
  playPauseNotifier: true,
  playbackRateControl: true,
  playlistLinks: '',
  playlistLoop: false,
  popoverAnimateThumbnail: false,
  popoverAnimation: 'slide',
  popoverBorderColor: 'ffffff',
  popoverBorderRadius: 0,
  popoverBorderWidth: 0,
  popoverBoxShadow: true,
  popoverCaption: '',
  popoverCaptionContainer: '',
  popoverContent: undefined,
  popoverDisableAutoplay: false,
  popoverOverlayColor: '000000',
  popoverOverlayOpacity: 0.5,
  popoverPreventScroll: false,
  popoverShowOnLoad: false,
  poster: '',
  qualityControl: true,
  qualityMax: undefined,
  qualityMin: undefined,
  resumable: 'auto',
  roundedPlayer: undefined,
  seo: true,
  settingsControl: true,
  silentAutoplay: false,
  state: 'beforeplay' as PlayerState,
  statsUrl: null,
  transparentLetterbox: false,
  volume: 1,
  volumeControl: true,
  wistiaPopover: false,
};

/**
 * Returns the swatch url for a given mediaId
 * @param {string} mediaId
 * @param {string} embedHost
 * @returns {string}
 */
const getSwatchUrl = (mediaId, embedHost = '') => {
  const fastHost = cdnFastWistiaComHost(embedHost);
  return `https://${fastHost}/embed/medias/${mediaId}/swatch`;
};

export class WistiaPlayer extends HTMLElement {
  public plugin: object | null;

  // can be null when doing document.createElement and referencing an attribute/property
  // before being injected into the dom
  #_api: PublicApi | null;

  // private internal fullscreen state of the video. Stored as a property on the web component
  // for easy transfer to another web component during replace if necessary.
  #_fullscreenState: FullscreenState = {
    heightBeforeFullscreen: undefined,
    inFullscreen: false,
    nativeFullscreen: false,
    widthBeforeFullscreen: undefined,
  };

  #_jsonLdId: string;

  #_judyContext: JudyContext | null = null;

  #_logger: LoggerType;

  // private value used during the replace flow to pass along the old engine.
  #_oldEngine: object | null | undefined;

  readonly #_playerData: PlayerDataHandler;

  #_playerType: Players;

  readonly #_removeEventListeners: (() => void)[] = [];

  // when in fullscreen we wrap the web-component in a wrapper element so that
  // we can safely replace the web-component without destroying the video and/or leave fullscreen
  #_usingFullscreenContainer = false;

  #hasElementConnectedToDOM = false;

  #paddingTop = '0px';

  #playPending = false;

  #preactRoot: HTMLDivElement | null = null;

  #preloadAspectRatio: number | undefined = undefined;

  #preloadThumbnailRoot: HTMLDivElement | null = null;

  readonly #publicApiScript: Promise<void> = runScript(
    `${proto()}//${appHostname('fast')}/assets/external/publicApi.js`,
  ) as Promise<void>;

  #resizeObserver: ResizeObserver | null = null;

  /**
   * Represents one embedded Wistia media player.
   * @constructor
   */
  public constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.dispatchEvent(new CustomEvent('load-start'));

    this.paddingTop = getComputedStyle(this).paddingTop;

    // Set up a prefixed logger
    this.#_logger = (wlog as unknown as LoggerType).getPrefixedFunctions(
      'WistiaPlayer',
    ) as LoggerType;

    this.#_playerData = new PlayerDataHandler();

    // Wistia global setup if this is the first time we've seen a Wistia player
    if (Wistia.wistia === undefined) {
      Wistia.wistia = Date.now();
    }
  }

  // --------------------------------------------------
  // Public properties
  // --------------------------------------------------

  /**
   * Return an array of the attributes that we want to observe for changes.
   * If one of these attributes changes, the attributeChangedCallback will be called.
   * @returns {string[]}
   */
  public static get observedAttributes(): string[] {
    return [...requiredAttributes, ...optionalPublicAttributes, ...optionalPrivateAttributes];
  }

  /**
   * @returns {FullscreenState} private fullscreenState of the video.
   */
  public get _fullscreenState(): FullscreenState {
    return this.#_fullscreenState;
  }

  /**
   * @param {FullscreenState} state private fullscreenState of the video.
   */
  public set _fullscreenState(state: FullscreenState) {
    this.#_fullscreenState = state;
  }

  /**
   * @deprecated The method should not be used
   * @returns {object | null |undefined }  private - old engine being transferred.
   */
  public get _oldEngine(): object | null | undefined {
    return this.#_oldEngine;
  }

  /**
   * @deprecated The method should not be used
   * @param {object | null | undefined} engine private old engine to be transferred of the video.
   */
  public set _oldEngine(engine: object | null | undefined) {
    this.#_oldEngine = engine;
  }

  /**
   * Returns the public api instance.
   * TODO: Not sure if we want to expose this.
   * @returns {PublicApi | null}
   */
  public get api(): PublicApi | null {
    return this.#_api;
  }

  /**
   * Returns the aspect ratio (width / height) of the originally uploaded video or given aspect ratio.
   * @returns {number}
   */
  public get aspect(): number {
    const fallbackAspect =
      !Number.isNaN(this.offsetWidth / this.offsetHeight) &&
      Number.isFinite(this.offsetWidth / this.offsetHeight)
        ? this.offsetWidth / this.offsetHeight
        : DEFAULT_ASPECT;

    return (
      this.api?._impl?.aspect() ??
      this.embedOptions.aspect ??
      (this.#getValueFromAttribute('aspect') as number | null) ??
      fallbackAspect
    );
  }

  /**
   * Sets the aspect ratio (width / height) of the video.
   * @param {number} newAspect
   * @returns {void}
   */
  public set aspect(newAspect: number) {
    this.#setSyncedEmbedOption('aspect', newAspect);

    // By re-setting width to the same value, we trigger the aspect ratio to be recalculated.
    this.api?._impl?.width(elemWidth(this) as number, { constrain: true });
  }

  /**
   * Returns whether the Audio Description control in the control bar is enabled.
   * @returns {boolean}
   */
  public get audioDescriptionControl(): boolean {
    return this.#getSyncedEmbedOption('audioDescriptionControl') as boolean;
  }

  /**
   * Enable or disable the Audio Description control in the control bar. Note: Even if set to `true`, this control will
   * only appear if the video has an Audio Description track.
   * @param {boolean} shouldDisplay
   * @returns {void}
   */
  public set audioDescriptionControl(shouldDisplay: boolean) {
    this.api?._impl?.audioDescriptionControlEnabled(shouldDisplay);
    this.#setSyncedEmbedOption('audioDescriptionControl', shouldDisplay);
  }

  /**
   * sets the authorization property to be used for authorized asset delivery
   * @param {Authorization}
   * @returns {void}
   */
  public set authorization(auth: Authorization) {
    this.#setSyncedEmbedOption('authorization', auth);
  }

  /**
   * Returns if the player should attempt to autoplay as soon as it's ready.
   * @returns {boolean}
   */
  public get autoplay(): boolean {
    return this.#getSyncedEmbedOption('autoplay') as boolean;
  }

  /**
   * Sets the attribute to enable/disable autoplay.
   * @param {boolean} shouldSetAutoplay
   * @returns {void}
   */
  public set autoplay(shouldSetAutoplay: boolean) {
    // This method is called a second time when the attribute value (string | null)
    // is set on the element. Checking for typeof boolean here prevents us from
    // saving that second value to the api.
    if (typeof shouldSetAutoplay !== 'boolean') {
      return;
    }
    this.#setSyncedEmbedOption('autoplay', shouldSetAutoplay);

    // Sync the element's autoplay attribute with this property
    // This matches the behavior of the native <video> element
    if (shouldSetAutoplay) {
      this.setAttribute('autoplay', '');
    } else {
      this.removeAttribute('autoplay');
    }
  }

  /**
   * Returns if the big play button control will appear in the center of the video before play.
   * @returns {boolean}
   */
  public get bigPlayButton(): boolean {
    return this.#getSyncedEmbedOption('bigPlayButton') as boolean;
  }

  /**
   * Sets if the big play button control will appear in the center of the video before play.
   * @param {boolean} shouldDisplay
   * @returns {void}
   */
  public set bigPlayButton(shouldDisplay: boolean) {
    this.api?._impl?.bigPlayButtonEnabled(shouldDisplay);
    this.#setSyncedEmbedOption('bigPlayButton', shouldDisplay);
  }

  /**
   * Returns the border radius of the big play button.
   * @returns {number}
   */
  public get bigPlayButtonBorderRadius(): number {
    return this.#getSyncedEmbedOption('bigPlayButtonBorderRadius') as number;
  }

  /**
   * Sets the border radius of the big play button.
   * @param {number} radius
   * @returns {void}
   */
  public set bigPlayButtonBorderRadius(radius: number) {
    this.api?._impl?.setBigPlayButtonBorderRadius(Number(radius));
    this.#setSyncedEmbedOption('bigPlayButtonBorderRadius', radius);
  }

  /**
   * Returns a new static normalized TimeRanges object that represents the ranges of the media resource,
   * if any, that the user agent has buffered at the moment the buffered property is accessed.
   * @returns {TimeRanges}
   */
  public get buffered(): TimeRanges {
    return this.api?._impl?.getStandardBuffered() ?? ({} as TimeRanges);
  }

  /**
   * Returns the border radius of the control bar.
   * @returns {number}
   */
  public get controlBarBorderRadius(): number {
    return this.#getSyncedEmbedOption('controlBarBorderRadius') as number;
  }

  /**
   * Sets the border radius of the control bar.
   * @param {number} radius
   * @returns {void}
   */
  public set controlBarBorderRadius(radius: number) {
    this.api?._impl?.setControlBarBorderRadius(Number(radius));
    this.#setSyncedEmbedOption('controlBarBorderRadius', radius);
  }

  /**
   * Getter. Returns all defined controls.
   * @returns {Record<string, object>} returns object of defined controls. Please note this may return an
   * empty object if not controls have yet been defined.
   */
  public get controls(): Record<string, object> {
    if (this.api?._impl) {
      // We don't want customers modifying this object (adding/deleting what is already here).
      // But they may need to interact/modify the existing ones, so we only use `seal`.
      return Object.seal({ ...this.api._impl.controls });
    }
    return {};
  }

  /**
   * Returns whether or not to hide the controls on load.
   * @returns {boolean}
   */
  public get controlsVisibleOnLoad(): boolean {
    return this.#getSyncedEmbedOption('controlsVisibleOnLoad') as boolean;
  }

  /**
   * Sets whether or not to hide the controls on load.
   * @param {boolean} shouldHide
   * @returns {void}
   */
  public set controlsVisibleOnLoad(shouldHide: boolean) {
    this.api?._impl?.renderUI();
    this.#setSyncedEmbedOption('controlsVisibleOnLoad', shouldHide);
  }

  /**
   * Returns whether or the copy link and thumbnail option from the context menu
   * is available.
   * @returns {boolean}
   */
  public get copyLinkAndThumbnail(): boolean {
    return this.#getSyncedEmbedOption('copyLinkAndThumbnail') as boolean;
  }

  /**
   * Enable or disable the copy link and thumbnail option from the context menu.
   * @param {boolean} enabled
   * @returns {void}
   */
  public set copyLinkAndThumbnail(enabled: boolean) {
    const prevVal = this.copyLinkAndThumbnail;
    this.#setSyncedEmbedOption('copyLinkAndThumbnail', enabled);

    if (prevVal !== enabled) {
      this.dispatchEvent(
        new CustomEvent('copy-link-and-thumbnail-change', {
          detail: { copyLinkAndThumbnail: enabled },
        }),
      );
    }
  }

  /**
   * Returns the current time of the video as a decimal in seconds.
   * @returns {number}
   */
  public get currentTime(): number {
    return (this.api?._impl?.time() as number | null) ?? this.embedOptions.currentTime ?? 0;
  }

  /**
   * Sets the current time of the video as a decimal in seconds.
   * @param {number} newTime
   * @returns {void}
   */
  public set currentTime(newTime: number) {
    void this.#_api?._impl?.time(newTime);
    this.#setSyncedEmbedOption('currentTime', newTime);
  }

  /**
   * Returns the status of the do not track embed option that controls whether the player
   * sends tracking pings.
   * @returns {boolean}
   */
  public get doNotTrack(): boolean {
    return this.#getSyncedEmbedOption('doNotTrack') as boolean;
  }

  /**
   * When present the player will not send tracking events for stats.
   * Note that this must be set at the time of embed to have any impact.
   * @param {boolean} dontTrack
   * @returns {void}
   */
  public set doNotTrack(dontTrack: boolean) {
    this.#setSyncedEmbedOption('doNotTrack', dontTrack);
  }

  /**
   * Returns the duration of the video in seconds.
   * @returns {number}
   */
  public get duration(): number {
    return this.api?._impl?.duration() ?? 0;
  }

  /**
   * Returns the email associated with this viewing session.
   * If no email is associated, it will return undefined.
   * NOTE: This attribute will impact the entire page and is not scoped to the player.
   * @returns {string | undefined}
   */
  public get email(): string | undefined {
    return (
      extractEmailFromParams(this.#pageUrl) ??
      ((getWistiaLocalStorage() as WistiaLocalStorage)[this.#pageUrl]?.trackEmail as
        | string
        | undefined) ??
      this.embedOptions.email ??
      undefined
    );
  }

  /**
   * Associates the view of this media with the given email value.
   * This email will appear in stats for the video.
   * NOTE: This attribute will impact the entire page and is not scoped to the player.
   * @param {string} newEmail
   * @returns {void}
   */
  public set email(newEmail: string) {
    if (this.email === newEmail) {
      return;
    }
    this.#updateEmail(newEmail);
    this.#setSyncedEmbedOption('email', newEmail);
  }

  /**
   * Returns the overridding embed host for the player.
   * Internal use only.
   * @returns {string | null | undefined}
   */
  public get embedHost(): string | null | undefined {
    return this.#getSyncedEmbedOption('embedHost') as string | null | undefined;
  }

  /**
   * Sets the overridding embed host for the player.
   * Internal use only.
   * @param {string} newEmbedHost
   * @returns {void}
   */
  public set embedHost(newEmbedHost: string) {
    this.#setSyncedEmbedOption('embedHost', newEmbedHost);
  }

  /**
   * Returns all the embed options being set on the WistiaPlayer from attributes and mediaData json
   * @returns {EmbedOptions }
   */
  public get embedOptions(): EmbedOptions {
    return this.#_playerData.embedOptions;
  }

  /**
   * Returns whether the video has ended playback.
   * @returns {boolean}
   */
  public get ended(): boolean {
    return this.api?._impl?.state() === 'ended';
  }

  /**
   * Returns the current end video behavior value
   * @returns {string}
   */
  public get endVideoBehavior(): string {
    return this.#getSyncedEmbedOption('endVideoBehavior') as string;
  }

  /**
   * Sets the behavior for what the video should do when it ends.
   * @param {'default' | 'loop' | 'reset'} behavior
   * @returns {void}
   */
  public set endVideoBehavior(behavior: 'default' | 'loop' | 'reset') {
    // loop is a slightly odd option, as it's set as an attribute directly on the
    // underlying <video /> element. So we must do more than just change the api._attrs
    // for it to be updated.
    if (behavior === 'loop') {
      this.api?._impl?.addLoopBehavior();
    } else {
      this.api?._impl?.removeLoopBehavior();
    }

    this.#setSyncedEmbedOption('endVideoBehavior', behavior);
  }

  /**
   * Returns the embed's event key if it exists.
   * @returns {string | undefined}
   */
  public get eventKey(): string | undefined {
    return this.api?._impl?.eventKey();
  }

  /**
   * Returns if the fullscreen button control will appear in the control bar.
   * @returns {boolean}
   */
  public get fullscreenControl(): boolean {
    return this.#getSyncedEmbedOption('fullscreenControl') as boolean;
  }

  /**
   * Sets if the fullscreen button control is enabled in the control bar.
   * @param {boolean} shouldDisplay
   * @returns {void}
   */
  public set fullscreenControl(shouldDisplay: boolean) {
    this.api?._impl?.fullscreenControlEnabled(shouldDisplay);
    this.#setSyncedEmbedOption('fullscreenControl', shouldDisplay);
  }

  /**
   * Returns if the video should use HLS playback.
   * Internal only.
   * @returns {boolean}
   */
  public get hls(): boolean {
    return this.#getSyncedEmbedOption('hls') as boolean;
  }

  /**
   * Sets if the video should use HLS playback.
   * Internal only.
   * @param {boolean} shouldUseHls
   * @returns {void}
   */
  public set hls(shouldUseHls: boolean) {
    this.#setSyncedEmbedOption('hls', shouldUseHls);
  }

  /**
   * Returns whether the video is currently in fullscreen
   * @returns {boolean}
   */
  public get inFullscreen(): boolean {
    return this.api?._impl?.inFullscreen() ?? false;
  }

  /**
   * Returns the hashed id of the media.
   * @returns {string}
   */
  public get mediaId(): string {
    return this.getAttribute('media-id') ?? '';
  }

  /**
   * Replaces the content of the current video with the video identified by the given mediaId.
   * @param {string} newMediaId
   * @returns {void}
   */
  public set mediaId(newMediaId: string) {
    const prevMediaId = this.mediaId;

    if (prevMediaId === newMediaId) {
      return;
    }

    this.#_logger.info('set mediaId', newMediaId);

    // Sync the element's media-id attribute with this property
    // This is the most important and only required attribute on the element
    // and won't change frequently, so it shouldn't cost too much to keep in sync
    this.setAttribute('media-id', newMediaId);
  }

  /**
   * Returns if player is currently muted
   * @returns {boolean}
   */
  public get muted(): boolean {
    return this.#_api?._impl?.isMuted() ?? this.embedOptions.muted ?? false;
  }

  /**
   * Change player muted state
   * @param {boolean} shouldMute
   */
  public set muted(shouldMute: boolean) {
    if (this.api) {
      if (shouldMute) {
        void this.api._impl?.mute();
      } else {
        void this.api._impl?.unmute();
      }
    }

    this.#setSyncedEmbedOption('muted', shouldMute);
  }

  /**
   * Returns the name of the media as it is in the Wistia application.
   * Returns undefined until media data is loaded.
   * @returns {string | undefined}
   */
  public get name(): string | undefined {
    return this.#_playerData.mediaData.name ?? this.api?._mediaData?.name ?? undefined;
  }

  public get paddingTop(): string {
    return this.#paddingTop;
  }

  public set paddingTop(paddingTop: string) {
    this.#paddingTop = paddingTop;
  }

  /**
   * Returns a boolean that indicates whether the video is paused.
   * @returns {boolean}
   */
  public get paused(): boolean {
    return this.api?._impl?.state() === 'paused';
  }

  /**
   * Returns the percent of the video that has been watched as a decimal between 0 and 1.
   * @returns {number}
   */
  public get percentWatched(): number {
    return this.api?._impl?.percentWatched() ?? 0;
  }

  /**
   * Returns the playback rate of the video.
   * @returns {number}
   */
  public get playbackRate(): number {
    return this.api?._impl?.playbackRate() ?? this.embedOptions.playbackRate ?? 1;
  }

  /**
   * Set the playback rate of the video.
   * @param {number} rate
   * @returns {void}
   */
  public set playbackRate(rate: number) {
    this.api?._impl?.playbackRate(rate);
    this.#setSyncedEmbedOption('playbackRate', rate);
  }

  /**
   * If set to true, the playback rate control will appear in the setting control.
   * @returns {boolean}
   */
  public get playbackRateControl(): boolean {
    return this.#getSyncedEmbedOption('playbackRateControl') as boolean;
  }

  /**
   * enable or disable the playback rate control in the settings control.
   * @param {boolean} shouldDisplay
   * @returns {void}
   */
  public set playbackRateControl(shouldDisplay: boolean) {
    this.api?._impl?.playbackRateControlEnabled(shouldDisplay);
    this.#setSyncedEmbedOption('playbackRateControl', shouldDisplay);
  }

  /**
   * Returns if the playbar - which includes the playhead, current time, and scrubbing functionality - will be available.
   * @returns {boolean}
   */
  public get playBarControl(): boolean {
    return this.#getSyncedEmbedOption('playBarControl') as boolean;
  }

  /**
   * Sets if the playbar - which includes the playhead, current time, and scrubbing functionality - will be available.
   * @param {boolean} shouldDisplay
   * @returns {void}
   */
  public set playBarControl(shouldDisplay: boolean) {
    this.api?._impl?.playbarControlEnabled(shouldDisplay);
    this.#setSyncedEmbedOption('playBarControl', shouldDisplay);
  }

  /**
   * Returns the border radius of the player.
   * @returns {number}
   */
  public get playerBorderRadius(): number {
    return this.#getSyncedEmbedOption('playerBorderRadius') as number;
  }

  /**
   * Sets the border radius of the player.
   * @param {number} radius
   * @returns {void}
   */
  public set playerBorderRadius(radius: number) {
    this.api?._impl?.setPlayerBorderRadius(Number(radius));
    this.#setSyncedEmbedOption('playerBorderRadius', radius);
  }

  /**
   * Returns the base color of the player.
   * @returns {string}
   */
  public get playerColor(): string {
    return this.#getSyncedEmbedOption('playerColor') as string;
  }

  /**
   * Changes the base color of the player.
   * Expects a hexadecimal rgb string like “ff0000” (red), “000000” (black), “ffffff” (white), or “0000ff” (blue).
   * @param {string} newColor
   * @returns {void}
   */
  public set playerColor(newColor: string) {
    this.api?._impl?.playerColor(newColor);
    this.#setSyncedEmbedOption('playerColor', newColor);
  }

  /**
   * Returns the overridding player.
   * Internal use only.
   * @returns {Players | undefined}
   */
  public get playerForce(): Players | undefined {
    return (this.getAttribute('player-force') as Players | null) ?? undefined;
  }

  /**
   * Sets the overridding player.
   * Internal use only.
   * @param {string} newPlayer
   * @returns {void}
   */
  public set playerForce(newPlayer: Players) {
    this.#_logger.info('set playerForce', newPlayer);
    this.setAttribute('player-force', newPlayer);
  }

  /**
   * Returns the strategy for associating specially crafted links on a page with a video, turning them into a playlist.
   * auto: For each video on the page, look for links after the video, until we come to another Wistia video.
   * manual: Given each link element, look at its ’container' option to determine which video it should connect to.
   * "container": For all embed links in a container whose id matches this given string, connect them to this specific video.
   * @returns {'auto' | 'manual' | string}
   */
  public get playlistLinks(): string {
    return this.#getSyncedEmbedOption('playlistLinks') as string;
  }

  /**
   * Sets the strategy for associating specially crafted links on a page with a video, turning them into a playlist.
   * @param {'auto' | 'manual' | string} newStrategy
   * @returns {void}
   */
  public set playlistLinks(newStrategy: string) {
    this.#setSyncedEmbedOption('playlistLinks', newStrategy);
  }

  /**
   * When present or set to true and this video has a playlist, it will loop back to
   * the first video and replay it once the last video has finished.
   * @returns {boolean}
   */
  public get playlistLoop(): boolean {
    return this.#getSyncedEmbedOption('playlistLoop') as boolean;
  }

  /**
   * When present or set to true and this video has a playlist, it will loop back to
   * the first video and replay it once the last video has finished.
   * @param {boolean} shouldLoop
   * @returns {void}
   */
  public set playlistLoop(shouldLoop: boolean) {
    this.#setSyncedEmbedOption('playlistLoop', shouldLoop);
  }

  /**
   * If set to true, the small play button control will be available.
   * @returns {boolean}
   */
  public get playPauseControl(): boolean {
    return this.#getSyncedEmbedOption('playPauseControl') as boolean;
  }

  /**
   * If set to true, the small play button control will be available.
   * @param {boolean} shouldDisplay
   * @returns {void}
   */
  public set playPauseControl(shouldDisplay: boolean) {
    this.api?._impl?.playPauseControlEnabled(shouldDisplay);
    this.#setSyncedEmbedOption('playPauseControl', shouldDisplay);
  }

  /**
   * By default, pausing a video will display a brief animation of the pause symbol
   * and resuming the video will display an animation of the play symbol.
   * Setting this embed option to false will remove those animations.
   * @returns {boolean}
   */
  public get playPauseNotifier(): boolean {
    return this.#getSyncedEmbedOption('playPauseNotifier') as boolean;
  }

  /**
   * By default, pausing a video will display a brief animation of the pause symbol
   * and resuming the video will display an animation of the play symbol.
   * Setting this embed option to false will remove those animations.
   * @param {boolean} shouldDisplay
   * @returns {void}
   */
  public set playPauseNotifier(shouldDisplay: boolean) {
    this.api?._impl?.playPauseNotifierEnabled(shouldDisplay);
    this.#setSyncedEmbedOption('playPauseNotifier', shouldDisplay);
  }

  /**
   * Getter. Returns all defined plugins.
   * @returns {Record<string, object>} returns object of defined plugins. Please note this may return an
   * empty object if not plugins have yet been defined.
   */
  public get plugins(): Record<string, object> {
    if (this.api?._impl) {
      // We don't want customers modifying this object (adding/deleting what is already here).
      // But they may need to interact/modify the existing ones, so we only use `seal`.
      return Object.seal({ ...this.api._impl.plugin });
    }
    return {};
  }

  /**
   * Returns if the play button will expand to cover the thumbnail on hover,
   * while also displaying the duration of the video.
   * @returns {boolean}
   */
  public get popoverAnimateThumbnail(): boolean {
    return this.#getSyncedEmbedOption('popoverAnimateThumbnail') as boolean;
  }

  /**
   * Sets if the play button will expand to cover the thumbnail on hover,
   * while also displaying the duration of the video.
   * @param {boolean} shouldAnimate
   * @returns {void}
   */
  public set popoverAnimateThumbnail(shouldAnimate: boolean) {
    this.#setSyncedEmbedOption('popoverAnimateThumbnail', shouldAnimate);
  }

  /**
   * Returns the current state of the video.
   * @returns {PopoverAnimation}
   */
  public get popoverAnimation(): PopoverAnimation {
    return this.#getSyncedEmbedOption('popoverAnimation') as PopoverAnimation;
  }

  /**
   * Sets if the play button will expand to cover the thumbnail on hover,
   * while also displaying the duration of the video.
   * @param {PopoverAnimation} newAnimation
   * @returns {void}
   */
  public set popoverAnimation(newAnimation: PopoverAnimation) {
    this.#setSyncedEmbedOption('popoverAnimation', newAnimation);
  }

  /**
   * Returns the border color of the popover.
   * @returns {string}
   */
  public get popoverBorderColor(): string {
    return this.#getSyncedEmbedOption('popoverBorderColor') as string;
  }

  /**
   * Sets the border color of the popover.
   * @param {string} newColor
   * @returns {void}
   */
  public set popoverBorderColor(newColor: string) {
    this.#setSyncedEmbedOption('popoverBorderColor', newColor);
  }

  /**
   * Returns the border radius of the popover.
   * @returns {number}
   */
  public get popoverBorderRadius(): number {
    return this.#getSyncedEmbedOption('popoverBorderRadius') as number;
  }

  /**
   * Sets the border radius of the popover.
   * @param {number} newRadius
   * @returns {void}
   */
  public set popoverBorderRadius(newRadius: number) {
    this.#setSyncedEmbedOption('popoverBorderRadius', newRadius);
  }

  /**
   * Returns the border width of the popover.
   * @returns {number}
   */
  public get popoverBorderWidth(): number {
    return this.#getSyncedEmbedOption('popoverBorderWidth') as number;
  }

  /**
   * Sets the border width of the popover.
   * @param {number} newWidth
   * @returns {void}
   */
  public set popoverBorderWidth(newWidth: number) {
    this.#setSyncedEmbedOption('popoverBorderWidth', newWidth);
  }

  /**
   * Returns if the popover should be displayed with a box shadow.
   * @returns {boolean}
   */
  public get popoverBoxShadow(): boolean {
    return this.#getSyncedEmbedOption('popoverBoxShadow') as boolean;
  }

  /**
   * Sets if the popover should be displayed with a box shadow.
   * @param {boolean} shouldDisplayBoxShadow
   * @returns {void}
   */
  public set popoverBoxShadow(shouldDisplayBoxShadow: boolean) {
    this.#setSyncedEmbedOption('popoverBoxShadow', shouldDisplayBoxShadow);
  }

  /**
   * Returns text set to be displayed directly below the popover.
   * @returns {string}
   */
  public get popoverCaption(): string {
    return this.#getSyncedEmbedOption('popoverCaption') as string;
  }

  /**
   * Sets text set to be displayed directly below the popover.
   * @param {string} newCaption
   * @returns {void}
   */
  public set popoverCaption(newCaption: string) {
    this.#setSyncedEmbedOption('popoverCaption', newCaption);
  }

  /**
   * Returns the id of the dom element which will be moved beneath the popover.
   * @returns {string}
   */
  public get popoverCaptionContainer(): string {
    return this.#getSyncedEmbedOption('popoverCaptionContainer') as string;
  }

  /**
   * Sets the id of the dom element which will be moved beneath the popover.
   * @param {string} newCaptionContainer
   * @returns {void}
   */
  public set popoverCaptionContainer(newCaptionContainer: string) {
    this.#setSyncedEmbedOption('popoverCaptionContainer', newCaptionContainer);
  }

  /**
   * Returns how the popover content will render.
   * @returns {PopoverContentSettings | string | undefined}
   */
  public get popoverContent(): string | undefined {
    return this.#getSyncedEmbedOption('popoverContent') as string | undefined;
  }

  /**
   * Sets how the popover content will render.
   * @param {PopoverContentSettings} newContentType
   * @returns {void}
   */
  public set popoverContent(newContentType: PopoverContentSettings) {
    this.#setSyncedEmbedOption('popoverContent', newContentType);
  }

  /**
   * Returns if embed should override the behavior for the autoplay option in Customize for
   * a popover specifically, so that launching the popover doesn't also play the video.
   * @returns {boolean}
   */
  public get popoverDisableAutoplay(): boolean {
    return this.#getSyncedEmbedOption('popoverDisableAutoplay') as boolean;
  }

  /**
   * Sets if embed should override the behavior for the autoplay option in Customize for
   * a popover specifically, so that launching the popover doesn't also play the video.
   * @param {boolean} shouldDisable
   * @returns {void}
   */
  public set popoverDisableAutoplay(shouldDisable: boolean) {
    this.#setSyncedEmbedOption('popoverDisableAutoplay', shouldDisable);
  }

  /**
   * Returns the overlay's background color in RGB hexadecimal.
   * @returns {string}
   */
  public get popoverOverlayColor(): string {
    return this.#getSyncedEmbedOption('popoverOverlayColor') as string;
  }

  /**
   * Sets the overlay's background color in RGB hexadecimal.
   * @param {string} newColor
   * @returns {void}
   */
  public set popoverOverlayColor(newColor: string) {
    this.#setSyncedEmbedOption('popoverOverlayColor', newColor);
  }

  /**
   * Returns the overlay's opacity. Expects a decimal value between 0 and 1.
   * @returns {number}
   */
  public get popoverOverlayOpacity(): number {
    return this.#getSyncedEmbedOption('popoverOverlayOpacity') as number;
  }

  /**
   * Sets the overlay's opacity. Expects a decimal value between 0 and 1.
   * @param {number} newOpacity
   * @returns {void}
   */
  public set popoverOverlayOpacity(newOpacity: number) {
    this.#setSyncedEmbedOption('popoverOverlayOpacity', newOpacity);
  }

  /**
   * Returns if scrolling should be prevented when the popover is open.
   * @returns {boolean}
   */
  public get popoverPreventScroll(): boolean {
    return this.#getSyncedEmbedOption('popoverPreventScroll') as boolean;
  }

  /**
   * Sets if scrolling should be prevented when the popover is open.
   * @param {boolean} shouldPreventScroll
   * @returns {void}
   */
  public set popoverPreventScroll(shouldPreventScroll: boolean) {
    this.#setSyncedEmbedOption('popoverPreventScroll', shouldPreventScroll);
  }

  /**
   * Returns if popover should immediately open as if it was clicked.
   * @returns {boolean}
   */
  public get popoverShowOnLoad(): boolean {
    return this.#getSyncedEmbedOption('popoverShowOnLoad') as boolean;
  }

  /**
   * Sets if popover should immediately open as if it was clicked.
   * @param {boolean} shouldShow
   * @returns {void}
   */
  public set popoverShowOnLoad(shouldShow: boolean) {
    this.#setSyncedEmbedOption('popoverShowOnLoad', shouldShow);
  }

  /**
   * Overrides the thumbnail image that appears before the video plays.
   * Expects an absolute URL to an image.
   * @returns {string}
   */
  public get poster(): string {
    return this.#getSyncedEmbedOption('poster') as string;
  }

  /**
   * Overrides the thumbnail image that appears before the video plays.
   * Expects an absolute URL to an image.
   * @param {string} newUrl
   * @returns {void}
   */
  public set poster(newUrl: string) {
    // This method is called a second time when the attribute value
    // is set on the element. Checking for the same value here prevents
    // us from running that second redundant set.
    const prevVal = this.poster;
    if (prevVal === newUrl) {
      return;
    }

    const prevUrl = this.poster;
    this.#setSyncedEmbedOption('poster', newUrl);

    // Sync the element's autoplay attribute with this property
    // This matches the behavior of the native <video> element
    this.setAttribute('poster', newUrl);

    if (prevUrl !== newUrl) {
      this.dispatchEvent(new CustomEvent('thumbnailchange'));
    }
  }

  /**
   * Returns the preload setting for the player.
   * @returns {string | undefined}
   * undefined is allowed as a return type because there may be situations
   * where the player and/or engine has not loaded and we don't know what
   * preload setting will be used
   */
  public get preload(): string | undefined {
    return this.api?._impl?.preloadValue() ?? this.embedOptions.preload ?? undefined;
  }

  /**
   * sets the preload value for the player. Note that changing this option
   * after player initialization has no impact.
   * @param {'auto'| 'metadata' | 'none'} preloadValue
   * @returns {void}
   */
  public set preload(preloadValue: 'auto' | 'metadata' | 'none') {
    // This method is called a second time when the attribute value
    // is set on the element. Checking for the same value here prevents
    // us from running that second redundant set.
    const prevVal = this.preload;
    if (prevVal === preloadValue) {
      return;
    }
    this.#setSyncedEmbedOption('preload', preloadValue);

    // Sync the element's autoplay attribute with this property
    // This matches the behavior of the native <video> element
    this.setAttribute('preload', preloadValue);
  }

  /**
   * If set to true, the quality control will appear in the setting control.
   * @returns {boolean}
   */
  public get qualityControl(): boolean {
    return this.#getSyncedEmbedOption('qualityControl') as boolean;
  }

  /**
   * enable or disable the quality control in the settings control.
   * @param {boolean} shouldDisplay
   * @returns {void}
   */
  public set qualityControl(shouldDisplay: boolean) {
    this.api?._impl?.qualityControlEnabled(shouldDisplay);
    this.#setSyncedEmbedOption('qualityControl', shouldDisplay);
  }

  /**
   * Return the max quality allowed for the 'Auto' asset in HLS playback
   * @returns {number | undefined}
   */
  public get qualityMax(): number | undefined {
    return this.#getSyncedEmbedOption('qualityMax') as number | undefined;
  }

  /**
   * Set the max quality to be used for "Auto" in the HLS stream.
   * @param {number} quality
   * @returns {void}
   */
  public set qualityMax(quality: AllowedQualities) {
    this.api?._impl?.qualityMax(quality);
    this.#setSyncedEmbedOption('qualityMax', quality);
  }

  /**
   * Return the min quality allowed for the 'Auto' asset in HLS playback
   * @returns {number}
   */
  public get qualityMin(): number | undefined {
    return this.#getSyncedEmbedOption('qualityMin') as number | undefined;
  }

  /**
   * Set the min quality to be used for "Auto" in the HLS stream.
   * @param {number} quality
   * @returns {void}
   */
  public set qualityMin(quality: AllowedQualities) {
    this.api?._impl?.qualityMin(quality);
    this.#setSyncedEmbedOption('qualityMin', quality);
  }

  /**
   * Returns the readyState of the inner video HTML element.
   * @returns {number}
   */
  public get readyState(): number {
    return this.api?._impl?.getReadyState() ?? 0;
  }

  /**
   * Returns the current resumable status of the video.
   * @returns {'auto' | boolean}
   */
  public get resumable(): boolean | string {
    return this.#getSyncedEmbedOption('resumable') as boolean | string;
  }

  /**
   * set the resumable state of the video to 'auto' | true | false.
   * note that this can be changed 'beforeplay', however changing the
   * value after play will have no effect
   * @param {'auto' | boolean} resumableState
   * @returns {void}
   */
  public set resumable(resumableState: boolean | 'auto') {
    this.api?._impl?.setResumable(resumableState);
    this.#setSyncedEmbedOption('resumable', resumableState);
  }

  /**
   * Returns a value which controls all rounded corners of the player.
   * @returns {number}
   */
  public get roundedPlayer(): number {
    return this.#getSyncedEmbedOption('roundedPlayer') as number;
  }

  /**
   * Returns the value which controls all rounded corners of the player.
   * @param {number} radius
   * @returns {void}
   */
  public set roundedPlayer(radius: number) {
    this.api?._impl?.setRoundedPlayer(Number(radius));
    this.#setSyncedEmbedOption('roundedPlayer', radius);
  }

  /**
   * Returns the number of unique seconds that have been watched for the video.
   * This does not include seconds that have been skipped by seeking.
   * @returns {number}
   */
  public get secondsWatched(): number {
    return this.api?._impl?.secondsWatched() ?? 0;
  }

  /**
   * Returns an array where each index represents the number of times the viewer has watched each second of the video.
   * @returns {number[]}
   */
  public get secondsWatchedVector(): number[] {
    return this.api?._impl?.secondsWatchedVector() ?? [];
  }

  /**
   * Returns whether JSON+LD seo data will be injected.
   * @returns {boolean}
   */
  public get seo(): boolean {
    return this.#getSyncedEmbedOption('seo') as boolean;
  }

  /**
   * Set whether JSON+LD seo data will be injected.
   * Note that changing this value after embed has no impact as JSON+LD needs
   * to be injected as soon as possible.
   * @param {boolean} val
   * @returns {void}
   */
  public set seo(val: boolean) {
    this.#setSyncedEmbedOption('seo', val);
  }

  /**
   * If set to true, the settings control will appear in the control bar.
   * @returns {boolean}
   */
  public get settingsControl(): boolean {
    return this.#getSyncedEmbedOption('settingsControl') as boolean;
  }

  /**
   * enable or disable the settings control in the control bar.
   * @param {boolean} shouldDisplay
   * @returns {void}
   */
  public set settingsControl(shouldDisplay: boolean) {
    this.api?._impl?.settingsControlEnabled(shouldDisplay);
    this.#setSyncedEmbedOption('settingsControl', shouldDisplay);
  }

  /**
   * This option allows videos to autoplay in a muted state in contexts where normal autoplay
   * is blocked or not supported (e.g. iOS, Safari 11+, Chrome 66+).
   * allow: The video will default to normal autoplay, with silent autoplay as a fallback if needed.
   * false: The video will not autoplay silently.
   * true: The video will default to autoplaying silently.
   * @returns {boolean | 'allow'}
   */
  public get silentAutoplay(): boolean | 'allow' {
    return this.#getSyncedEmbedOption('silentAutoplay') as boolean | 'allow';
  }

  /**
   * This option allows videos to autoplay in a muted state in contexts where normal autoplay
   * is blocked or not supported (e.g. iOS, Safari 11+, Chrome 66+).
   * @param {boolean | 'allow'} silentAutoplayValue
   * @returns {void}
   */
  public set silentAutoplay(silentAutoplayValue: boolean | 'allow') {
    this.#setSyncedEmbedOption('silentAutoplay', silentAutoplayValue);
  }

  /**
   * Returns the current state of the video.
   * @returns {PlayerState}
   */
  public get state(): PlayerState {
    return this.api?.state() ?? defaultEmbedOptions.state;
  }

  /**
   * Returns the stats url for the player.
   * @returns {string | null}
   */
  public get statsUrl(): string | null {
    return this.#getSyncedEmbedOption('statsUrl') as string | null;
  }

  /**
   * Sets the stats url for the player.
   * @param {string} url
   * @returns {void}
   */
  public set statsUrl(url: string) {
    this.#setSyncedEmbedOption('statsUrl', url);
  }

  /**
   * Returns if a swatch should be shown before the player renders.
   * Internal use only.
   * @returns {boolean | undefined}
   */
  public get swatch(): boolean | undefined {
    return this.#getSyncedEmbedOption('swatch') as boolean | undefined;
  }

  /**
   * Sets if a swatch should be shown before the player renders.
   * Internal use only.
   * @param {boolean} shouldShowSwatch
   * @returns {void}
   */
  public set swatch(shouldShowSwatch: boolean) {
    this.#setSyncedEmbedOption('swatch', shouldShowSwatch);
  }

  /**
   * If present, the background behind the video player will be transparent
   * allowing the page color to show through instead of black.
   * @returns {boolean}
   */
  public get transparentLetterbox(): boolean {
    return this.#getSyncedEmbedOption('transparentLetterbox') as boolean;
  }

  /**
   * Sets the letterbox to be transparent or not.
   * @param {boolean} shouldSetTransparentLetterbox
   * @returns {void}
   */
  public set transparentLetterbox(shouldSetTransparentLetterbox: boolean) {
    this.#setSyncedEmbedOption('transparentLetterbox', shouldSetTransparentLetterbox);
  }

  /**
   * Returns the unique id of this embed
   * Expected format is `wistia-mediaId-index`
   * @returns {string}
   */
  public get uniqueId(): string {
    return this.getAttribute('unique-id') ?? '';
  }

  /**
   * Sets the unique id of this embed.
   * Expected format is `wistia-mediaId-index`
   * @returns {string}
   */
  public set uniqueId(id: string) {
    this.setAttribute('unique-id', id);
  }

  /**
   * Returns if this custom element was created from a legacy translated embed.
   * Internal use only.
   * @returns {boolean}
   */
  public get useWebComponent(): boolean {
    return this.getAttribute('use-web-component') === 'true';
  }

  /**
   * Set if this custom element was created from a legacy translated embed.
   * Internal use only.
   * @param {boolean} val
   * @returns {void}
   */
  public set useWebComponent(val: boolean) {
    if (val) {
      this.setAttribute('use-web-component', String(val));
    } else {
      this.removeAttribute('use-web-component');
    }
  }

  /**
   * @returns {boolean}
   */
  public get usingFullscreenContainer(): boolean {
    return this.#_usingFullscreenContainer;
  }

  /**
   * Returns the current video quality.
   * @returns {number | 'auto'}
   */
  public get videoQuality(): number | 'auto' {
    return this.api?._impl?.getVideoQuality() ?? this.embedOptions.videoQuality ?? 'auto';
  }

  /**
   * Sets the video quality.
   * @param {number | 'auto'} quality
   * @returns {void}
   */
  public set videoQuality(quality: number | 'auto') {
    this.api?._impl?.setVideoQuality(quality);
    this.#setSyncedEmbedOption('videoQuality', quality);
  }

  /**
   * Returns the current volume set on the player
   * @returns {number}
   */
  public get volume(): number {
    return this.#getSyncedEmbedOption('volume') as number;
  }

  /**
   * Set the current volume set on the player
   * @param {number} level - a Number from 0 - 1
   * @returns {void}
   */
  public set volume(level: number) {
    this.api?._impl?.volume(level);
    this.#setSyncedEmbedOption('volume', level);
  }

  /**
   * If set to true, the volume control will appear in the control bar.
   * Note that on mobile, we never show a volume control, as the device
   * volume is used.
   * @returns {boolean}
   */
  public get volumeControl(): boolean {
    return this.#getSyncedEmbedOption('volumeControl') as boolean;
  }

  /**
   * enable or disable the volume control in the control bar.
   * @param {boolean} shouldDisplay
   * @returns {void}
   */
  public set volumeControl(shouldDisplay: boolean) {
    this.api?._impl?.volumeControlEnabled(shouldDisplay);
    this.#setSyncedEmbedOption('volumeControl', shouldDisplay);
  }

  /**
   * Returns if the player embed is a popover.
   * @returns {boolean}
   */
  public get wistiaPopover(): boolean {
    return this.#getSyncedEmbedOption('wistiaPopover') as boolean;
  }

  /**
   * Sets if the player embed is a popover.
   * @param {boolean} shouldBePopover
   * @returns {void}
   */
  public set wistiaPopover(shouldBePopover: boolean) {
    this.#setSyncedEmbedOption('wistiaPopover', shouldBePopover);
  }

  get #pageUrl(): string {
    return this.getAttribute('page-url') ?? inferPageUrl();
  }

  set #usingFullscreenContainer(val: boolean) {
    this.#_usingFullscreenContainer = val;
  }

  // --------------------------------------------------
  // Public api methods
  // --------------------------------------------------

  /**
   * Adds a media to the playlist.
   * @param {string} mediaId - the id of the media to add
   * @param {object} options - embed options to apply for this media in the playlist
   * @param {object} position - position to add the media in the playlist
   * @returns {Promise<void>}
   */
  public async addToPlaylist(mediaId: string, options: object, position: object): Promise<void> {
    if (this.api) {
      this.api.addToPlaylist(mediaId, options, position);
      return Promise.resolve();
    }

    return Promise.reject(new Error(`Playlist cannot be accessed`));
  }

  /**
   * Attempt to enter fullscreen mode.
   * @returns {Promise<void>}
   */
  public async cancelFullscreen(): Promise<void> {
    this.#usingFullscreenContainer = false;
    const parent = this.parentNode as WistiaFullscreenContainer;

    if (isNotNil(this._fullscreenState.widthBeforeFullscreen)) {
      this.style.width = this._fullscreenState.widthBeforeFullscreen;
      this.api?._impl?.width(parseFloat(this._fullscreenState.widthBeforeFullscreen), {
        fullscreen: true,
      });
    }

    if (isNotNil(this._fullscreenState.heightBeforeFullscreen)) {
      this.style.height = this._fullscreenState.heightBeforeFullscreen;
      this.api?._impl?.height(parseFloat(this._fullscreenState.heightBeforeFullscreen), {
        fullscreen: true,
      });
    }

    return this.api?._impl?.cancelFullscreen().then(() => {
      if (parent.wistiaFullscreenContainer && !parent.classList.contains('wistia_embed')) {
        parent.replaceWith(this);
      }

      this._fullscreenState.heightBeforeFullscreen = undefined;
      this._fullscreenState.widthBeforeFullscreen = undefined;
    });
  }

  /**
   * Creates an overlay with the specified name and options.
   * @param {string} name - The name of the overlay.
   * @param {AnnotationOverlayOptions} options - The options for the overlay.
   * @returns A promise that resolves when the overlay is created successfully, or rejects with an error if the overlay cannot be defined at this time.
   */
  public async createOverlay(name: string, options: AnnotationOverlayOptions): Promise<void> {
    if (this.api?._impl?.defineOverlay) {
      return this.api._impl.defineOverlay(name, options);
    }
    return Promise.reject(new Error(`overlay ${name} cannot be defined at this time`));
  }

  /**
   * Defines a plugin on the player.
   * @param {string} name name of the plugin to define
   * @param {object} options object of plugin options related to the specific plugin
   * @returns {Promise<void>} returns a Promise that resolves with the defined plugin
   */
  public async definePlugin(name: string, options: object): Promise<void> {
    const addPlugin = async (): Promise<void> => {
      return (
        this.api?.addPlugin(name, options) ??
        Promise.reject(new Error(`plugin ${name} cannot be defined`))
      );
    };

    if (this.api) {
      return addPlugin();
    }

    return new Promise((resolve, reject) => {
      const handler = () => {
        this.removeEventListener(API_READY_EVENT, handler);
        addPlugin()
          .then((plugin) => resolve(plugin))
          .catch((err: unknown) => {
            if (err instanceof Error) {
              reject(err);
            } else {
              reject(new Error('Promise rejected with non-Error value'));
            }
          });
      };

      this.addEventListener(API_READY_EVENT, handler);
    });
  }

  /**
   * Deletes an overlay with the specified name.
   * @param {string} name - The name of the overlay to delete.
   * @returns A promise that resolves when the overlay is successfully deleted, or rejects with an error if the overlay cannot be deleted at this time.
   */
  public async deleteOverlay(name: string): Promise<void> {
    if (this.api?._impl?.undefineOverlay) {
      return this.api._impl.undefineOverlay(name);
    }
    return Promise.reject(new Error(`overlay ${name} cannot be deleted at this time`));
  }

  /**
   *
   * @param {string} name the handle name of the control to be disabled
   * @returns {Promise<void>} Promise that resolves when operation is complete
   */
  public async disableControl(name: string): Promise<void> {
    if (this.api?._impl?.setControlEnabled) {
      return this.api._impl.setControlEnabled(name, false);
    }
    return Promise.reject(new Error(`control "${name}" cannot be disabled at this time`));
  }

  /**
   *
   * @param {string} name the handle name of the control to be enabled
   * @returns {Promise<void>} Promise that resolves when operation is complete
   */
  public async enableControl(name: string): Promise<void> {
    if (this.api?._impl?.setControlEnabled) {
      return this.api._impl.setControlEnabled(name, true);
    }
    return Promise.reject(new Error(`control "${name}" cannot be enabled at this time`));
  }

  /**
   * Gets a plugin from the player.
   * @param {string} name name of the plugin to retrieve
   * @returns {Promise<void>} returns a Promise that resolves with the request plugin
   */
  public async getPlugin(name: string): Promise<void> {
    if (this.api) {
      return this.api.plugin(name);
    }

    return Promise.reject(new Error(`plugin ${name} is not yet defined`));
  }

  /**
   * Hides the specified overlay.
   * @param {string} name - The name of the overlay to hide.
   * @returns A promise that resolves when the overlay is hidden, or rejects with an error if the overlay cannot be cancelled at this time.
   */
  public async hideOverlay(name: string): Promise<void> {
    if (this.api?._impl?.cancelOverlay) {
      return this.api._impl.cancelOverlay(name);
    }
    return Promise.reject(new Error(`overlay ${name} cannot be cancelled at this time`));
  }

  /**
   * Hides the popover if this is a popover embed.
   * @returns {Promise<void>}
   */
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  public async hidePopover(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.api?.popover) {
        this.api.popover.hide();
        resolve();
      }

      reject(new Error(`Popover cannot be accessed`));
    });
  }

  /**
   * Pauses the video.
   * If this is called and the video’s state is “playing,”
   * it’s expected that it will change to “paused.”
   * @returns {Promise<void>}
   */
  public async pause(): Promise<void> {
    return this.api?._impl?.pause();
  }

  /**
   * Plays the video.
   * If this is called, it is expected that the state will change to “playing.”
   * @returns {Promise<void>}
   */
  public async play(): Promise<void> {
    return this.api?._impl?.play();
  }

  /**
   * @param {string} name name of the controls
   * @returns {Promise<void?>}
   */
  public async releaseControls(name: string): Promise<void> {
    return this.api?._impl?.releaseControls(name);
  }

  /**
   * Replaces the media
   * @param {string} mediaId
   * @param {EmbedOptions} options
   */
  public async replaceWithMedia(mediaId: string, options: EmbedOptions = {}): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.api) {
        reject(new Error('api not ready to replace'));
      }

      const handler = () => {
        this.removeEventListener(AFTER_REPLACE_EVENT, handler);
        this.mediaId = mediaId;
        this.uniqueId = this.#generateUniqueId(mediaId);
        this.#maybeInjectJsonLd();
        resolve();
      };

      this.addEventListener(AFTER_REPLACE_EVENT, handler);

      removeInjectedJsonLd(this.#_jsonLdId);
      this.api?.replaceWith(mediaId, options);
    });
  }

  /**
   * @param {string} name name of the controls
   * @returns {Promise<void?>}
   */
  public async requestControls(name: string): Promise<void> {
    return this.api?._impl?.requestControls(name);
  }

  /**
   * Attempt to enter fullscreen mode.
   * @returns {Promise<void>}
   */
  public async requestFullscreen(): Promise<void> {
    // when converting legacy embeds, wrapping an empty div around the web component causes the legacy
    // public api dom watcher to think there has been no embed, so it will try and inject a new video
    // and since we essentially already have a wrapper when using legacy embeds, just use that
    if (this.useWebComponent && this.parentNode) {
      const parent = this.parentNode as WistiaFullscreenContainer;
      parent.wistiaFullscreenContainer = true;
      this.#usingFullscreenContainer = true;
    } else if (this.parentNode) {
      const wrapper = document.createElement('div') as WistiaFullscreenContainer;
      wrapper.wistiaFullscreenContainer = true;
      this.#usingFullscreenContainer = true;
      this.parentNode.insertBefore(wrapper, this);
      wrapper.appendChild(this);
    }

    // The fullscreenBehavior will set the `inFullscreen` and `nativeFullscreen` values
    this._fullscreenState.heightBeforeFullscreen = this.style.height;
    this._fullscreenState.widthBeforeFullscreen = this.style.width;

    return this.api?._impl?.requestFullscreen().then(() => {
      this.style.width = '100%';
      this.style.height = '100%';

      if (this.api?.chrome) {
        this.api.chrome.style.height = '100%';
        this.api.chrome.style.width = '100%';
      }
    });
  }

  /**
   * Shows an overlay with the specified name.
   * @param {string} name - The name of the overlay to show.
   * @returns A promise that resolves when the overlay is shown, or rejects with an error if the overlay cannot be requested at this time.
   */
  public async showOverlay(name: string): Promise<void> {
    if (this.api?._impl?.requestOverlay) {
      return this.api._impl.requestOverlay(name);
    }
    return Promise.reject(new Error(`overlay ${name} cannot be requested at this time`));
  }

  /**
   * Shows the popover if this is a popover embed.
   * @returns {Promise<void>}
   */
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  public async showPopover(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.api?.popover) {
        this.api.popover.show();
        resolve();
      }

      reject(new Error(`Popover cannot be accessed`));
    });
  }

  // --------------------------------------------------
  // Custom element lifecycle methods
  // --------------------------------------------------

  /**
   * Called when an observed attribute has been added, removed, updated, or replaced.
   * Also called for initial values when an element is created by the parser, or upgraded.
   * Note: only attributes listed in the observedAttributes property will receive this callback.
   * @param {string} name - The name of the attribute that changed.
   * @param {string} oldValue - The previous value of the attribute, or null if it was added for the first time.
   * @param {string} newValue - The new value of the attribute, or null if it was removed.
   * @returns {void}
   */
  protected attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    // We need this to make sure we don't needlessly call api methods during initial component setup
    if (!this.#hasElementConnectedToDOM) {
      return;
    }

    if (oldValue === newValue) {
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (oldValue === null && newValue === '') {
      return;
    }

    // If the attribute string is equal to 'true' or 'false', go ahead and assume we'd
    // like the boolean value instead of the string
    let finalValue: boolean | string = newValue;
    switch (newValue) {
      case 'true':
        finalValue = true;
        break;
      case 'false':
        finalValue = false;
        break;
      default:
        break;
    }

    // Attribute names must match their corresponding property names (kebab-case -> camelCase)
    // So the player-color attribute maps to the playerColor property
    this[this.#kebabCaseToCamelCase(name)] = finalValue;
  }

  protected connectedCallback(): void {
    if (this.#hasElementConnectedToDOM) {
      return;
    }

    const mediaId = this.getAttribute('media-id');
    if (mediaId == null) {
      countMetric('player/failure/init-failed');
      throw new Error('media-id attribute is required');
    }

    if (Wistia._inlineMediaData?.[this.mediaId]) {
      this.#_playerData.setInlineMediaDataSource(Wistia._inlineMediaData[this.mediaId]);
    }

    // Allows for all bulk setting of embed options and mediaData
    window.wistiaOptions = window.wistiaOptions ?? {};
    const opts = getWistiaOptions(this.mediaId);
    this.#_playerData.setWistiaWindowEmbedOptionSource(opts);

    // Add the media id to the logger now that we have it
    this.#_logger = (wlog as unknown as LoggerType).getPrefixedFunctions(
      `WistiaPlayer ${mediaId}`,
    ) as LoggerType;

    this.#_judyContext = buildContext() as JudyContext;

    // If the player was created from our React wrapper component, send a tracking event
    if (this.getAttribute('react') === 'true') {
      countMetric('player/initembed.react');
    }

    this.#setupEventListeners();

    this.#_logger.info('initialize embed');

    maybeStartWistiaQueue();

    // Generate a unique id for this embed in case there are
    // multiple embeds with the same hashed id on the page
    this.uniqueId = this.#generateUniqueId(mediaId);

    // Sometimes if an attribute is set on the player, we want to do something immediately
    this.#runMethodsFromAttributes();

    // Gather any attributes set on the element and save them so the public api can use them
    this.#saveInitialAttributesFromDomOptions();

    const resizeCallback = () => {
      this.#renderPreloadThumbnail();
    };
    this.#resizeObserver = new ResizeObserver(resizeCallback);
    this.#resizeObserver.observe(this);

    getInitialMediaData(mediaId, { embedHost: this.embedHost ?? '' })
      .then((mediaData) => {
        this.#_playerData.setServerMediaDataSource(mediaData as MediaData);
        this.#initPlayerEmbed({
          container: this.uniqueId,
          mediaData: this.#_playerData.mediaData,
        });
      })
      .catch((error: unknown) => {
        countMetric('player/failure/init-failed');
        throw new Error((error as Error).message);
      });

    // Add our responsive embed template to the shadow DOM
    if (this.shadowRoot) {
      // If an aspect attribute is set on the element, use that immediately to set the container of the embed
      this.#preloadAspectRatio =
        (this.#getValueFromAttribute('aspect') as number | null) ?? DEFAULT_ASPECT;

      // Render the embed template as soon as we can
      this.#preactRoot = document.createElement('div');
      this.#renderEmbedTemplate();
      this.shadowRoot.insertBefore(this.#preactRoot, this.shadowRoot.firstChild);
    }

    this.#hasElementConnectedToDOM = true;
  }

  protected disconnectedCallback(): void {
    this.#_removeEventListeners.forEach((removeListener) => removeListener());

    removeInjectedJsonLd(this.#_jsonLdId);

    this.#resizeObserver?.disconnect();
    this.#resizeObserver = null;
  }

  // --------------------------------------------------
  // Private methods
  // --------------------------------------------------

  /**
   * Takes a string in camelCase and converts it to kebab-case
   * This is a pretty generic helper function, so it could be moved to a utility file if needed
   * @param {string} camelCaseString - String in camelCase
   * @returns {string}
   */
  #camelCaseToKebabCase(camelCaseString: string): string {
    return camelCaseString.replace(/[A-Z]+(?![a-z])|[A-Z]/g, (letter: string, idx?: number) => {
      return (idx !== undefined ? '-' : '') + letter.toLowerCase();
    });
  }

  /**
   * Generates a unique id for the embed
   * @param {number | string} mediaId - The media id
   * @returns {string}
   */
  #generateUniqueId(mediaId): string {
    let index = 1;
    let candidate = `wistia-${mediaId}-${index}`;

    while (
      document.querySelector(`[unique-id=${candidate}]`) ??
      document.querySelector(`#${candidate}`)
    ) {
      index += 1;
      candidate = `wistia-${mediaId}-${index}`;
    }
    return candidate;
  }

  /**
   * Returns either the value of an embed option from the public api
   * or the value of an embed option saved on this element.
   *
   * For now, the public api is the source of truth for embed options.
   * However, this will change in the future. We also need a non-public
   * api source for embed options so we can use them before the public
   * api is ready.
   * @param {string} key - Name of the embed option
   * @returns {boolean | number | string | null}
   */
  #getSyncedEmbedOption(key: string): boolean | number | string | null | undefined {
    // If the public api is ready, use it as the source of truth
    if (this.api && key in this.api._attrs) {
      return this.api._attrs[key] as boolean | number | string | null | undefined;
    }

    // Otherwise check this element's embed config for a value and fallback
    // to the default embed options as a last resort
    return (
      (this.embedOptions[key] as boolean | number | string | null | undefined) ??
      (this.#getValueFromAttribute(this.#camelCaseToKebabCase(key)) as
        | boolean
        | number
        | string
        | null
        | undefined) ??
      (defaultEmbedOptions[key] as boolean | number | string | undefined)
    );
  }

  /**
   * Gets the value of an attribute if it exists, returns null if not
   * @param {string} name - Name of the attribute
   * @returns {boolean | string | null}
   */
  #getValueFromAttribute(name: string): boolean | string | null {
    // If no attribute is present, return null instead of an explicit false
    // so our media data config doesn't get overridden
    if (!this.hasAttribute(name)) {
      return null;
    }

    switch (this.getAttribute(name)) {
      case 'true':
        return true;
      case 'false':
        return false;
      case '':
        // Boolean attributes are set to '' when they are present
        // so we need to convert them to true
        return true;
      default:
        return this.getAttribute(name);
    }
  }

  /**
   * Handles initialization of the player for fresh Aurora embeds
   * @returns {void}
   */
  #initPlayerEmbed({
    container,
    mediaData,
  }: {
    container: WistiaPlayer | string;
    mediaData?: MediaData | MediaDataServerErrorResponse;
  }): void {
    this.#_playerData.updateEmbedOptionOverrides({ videoFoam: true });

    if (mediaData && !isMediaDataError(mediaData as MediaDataServerErrorResponse)) {
      this.#_playerType = choosePlayer(
        this.#_judyContext,
        this.#_playerData.mediaData,
        this.#_playerData.embedOptions,
      ) as Players;

      this.#renderPreloadThumbnail();

      this.#maybeInjectJsonLd();
    }

    // Create and save the public api instance
    void this.#initPublicApi(this.mediaId, {
      container,
      mediaData,
    });
  }

  /**
   * Initializes the public api instance and sends a ready event
   * @param {number | string} mediaId - The media id
   * @param {EmbedOptions | PublicApiOptions | undefined} options - The public api options
   * @returns {Promise<void>}
   */
  async #initPublicApi(
    mediaId: number | string,
    options: EmbedOptions | PublicApiOptions | undefined,
  ): Promise<void> {
    // Import the public api script
    await this.#publicApiScript;

    if (!Wistia.PublicApi) {
      countMetric('player/failure/init-failed');
      throw new Error('Wistia.PublicApi is not defined');
    }

    // Initialize!
    this.#_api = new Wistia.PublicApi(mediaId, options) as PublicApi;
    this.api?.embedded(() => {
      void this.#maybeInitializeMux();
      this.#preloadAspectRatio = undefined;
      this.#renderEmbedTemplate();
      this.#preloadThumbnailRoot?.remove();

      this.#resizeObserver?.disconnect();
      this.#resizeObserver = null;

      if (this.#playPending) {
        void this.play();
      }
    });

    this.api?.ready(() => {
      // event for public consumption, exposed on our event types
      this.dispatchEvent(new CustomEvent(API_READY_EVENT, { detail: { mediaId } }));

      // event for internal consumption, not exposed on our event types
      this.dispatchEvent(
        new CustomEvent(INTERNAL_API_ON_FIND_EVENT, { detail: { mediaId, api: this.api } }),
      );

      // Sync embed options from the public api back to the embed config
      if (this.api) {
        Object.entries(this.api._attrs).forEach(
          ([key, value]: [string, boolean | number | string]) => {
            this.#_playerData.updateEmbedOptionOverrides({ [key]: value });
          },
        );
      }

      // Updates our PlayerDataProvider and re-renders the thumbnail with the new embed options
      this.#renderPreloadThumbnail();
    });
  }

  /**
   * Returns if this player is a popover embed with a thumbnail.
   * @returns {boolean}
   */
  #isPopoverWithThumbnail(): boolean {
    return (
      this.wistiaPopover &&
      (this.popoverContent === undefined ||
        this.popoverContent === '' ||
        this.popoverContent === 'thumbnail')
    );
  }

  /**
   * Takes a string in kebab-case and converts it to camelCase
   * This is a pretty generic helper function, so it could be moved to a utility file if needed
   * @param {string} kebabCaseString - String in kebab-case
   * @returns {string}
   */
  #kebabCaseToCamelCase(kebabCaseString: string): string {
    return kebabCaseString.replace(/-./g, (word) => word[1].toUpperCase());
  }

  /**
   * Do a coin flip to determine if Mux should be enabled
   * And enable Mux for the player if the coin flip is a win
   * @returns {Promise<void>}
   */
  async #maybeInitializeMux() {
    if (!this.api) {
      return;
    }

    const shouldRandomEnableMux = didWinCoinFlip(MUX_PERCENTAGE_TO_ENABLE);
    const shouldEnableMuxForPlayer =
      shouldEnableMux(this.api, shouldRandomEnableMux) && (isVisitorTrackingEnabled() as boolean);

    const embedType = this.useWebComponent ? 'translated-web-component' : 'web-component';

    if (shouldEnableMuxForPlayer) {
      const mux = (await dynamicImport('assets/external/wistia-mux.js')) as Mux;
      mux.init(this.api, { embedType });

      this.addEventListener(
        'visitor-tracking-change',
        (event: CustomEvent<{ isTrackingEnabled: boolean }>) => {
          const { isTrackingEnabled } = event.detail;

          if (!isTrackingEnabled) {
            this.api?.mux?.destroy();
          }
        },
      );
    }
  }

  #maybeInjectJsonLd() {
    if (
      this.seo &&
      this.#_playerType !== 'notplayable' &&
      this.#_playerType !== 'passwordprotected'
    ) {
      this.#_jsonLdId = `w-json-ld-${this.uniqueId}`;
      removeInjectedJsonLd(this.#_jsonLdId);

      injectJsonLd(this.#_jsonLdId, this.#_playerData.mediaData, {
        embedOptions: this.#_playerData.embedOptions,
        videoHeight: this.offsetHeight,
        videoWidth: this.offsetWidth,
      });
    }
  }

  /**
   * Renders a template for the embed code
   * @returns {HTMLTemplateElement}
   */
  #renderEmbedTemplate() {
    if (!this.#preactRoot) {
      return;
    }

    const swatchUrl = getSwatchUrl(this.mediaId, this.embedHost ?? '');

    let swatchHeight = '100%';
    if (parseFloat(this.#paddingTop) !== 0 && this.#paddingTop !== '') {
      swatchHeight = `${parseFloat(this.#paddingTop)}px`;
    }

    const playerBorderRadius = getDefaultPlayerBorderRadius({
      playerBorderRadius: this.playerBorderRadius,
      roundedPlayer: this.roundedPlayer,
    });

    render(
      <Fragment>
        <style>
          {`:host {
              display: flex;
              position: relative;
              ${
                this.#preloadAspectRatio !== undefined &&
                `aspect-ratio: ${this.#preloadAspectRatio};`
              }
            }`}
        </style>
        {this.#shouldDisplaySwatch() && (
          <div
            style={{ height: swatchHeight, left: 0, position: 'absolute', top: 0, width: '100%' }}
            class="wistia_swatch"
          >
            <div style={{ height: '100%', position: 'relative', width: '100%' }}>
              <div
                style={{
                  height: '100%',
                  left: 0,
                  overflow: 'hidden',
                  position: 'absolute',
                  top: 0,
                  width: '100%',
                  borderRadius: `${playerBorderRadius}px`,
                }}
              >
                <img
                  src={swatchUrl}
                  style={{
                    filter: 'blur(5px)',
                    height: '100%',
                    objectFit: 'contain',
                    width: '100%',
                  }}
                  alt=""
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        )}
        <div
          ref={(ref) => {
            this.#preloadThumbnailRoot = ref;
          }}
        ></div>
      </Fragment>,
      this.#preactRoot,
    );
  }

  /**
   * Renders a progressive thumbnail and a big play button as soon as possible,
   * while the rest of the player is loading.
   * @returns {void}
   */
  #renderPreloadThumbnail() {
    if (!this.#preloadThumbnailRoot) {
      return;
    }

    const { assets, mediaType } = this.#_playerData.mediaData;
    const { autoPlay, plugin } = this.#_playerData.embedOptions;

    const thumbnailAssets = getThumbnailAssets(assets, {});
    const willAutoplay = this.autoplay || autoPlay;
    const hasVideoThumbnail = plugin?.videoThumbnail !== undefined;

    const shouldRenderThumbnail =
      (!this.wistiaPopover || this.#isPopoverWithThumbnail()) &&
      mediaType !== 'Audio' &&
      thumbnailAssets.length > 0 &&
      !willAutoplay &&
      !hasVideoThumbnail;

    if (!shouldRenderThumbnail) {
      return;
    }

    render(
      <PlayerDataProvider
        embedOptions={this.#_playerData.embedOptions}
        mediaData={this.#_playerData.mediaData}
      >
        <PreloadThumbnail
          mediaId={this.mediaId}
          playerType={this.playerForce ?? this.#_playerType}
          playerWidth={this.offsetWidth}
          isPlayPending={this.#playPending}
        ></PreloadThumbnail>
      </PlayerDataProvider>,
      this.#preloadThumbnailRoot,
    );
  }

  /**
   * Runs any methods associated with set attributes when the element is connected to the DOM
   * @returns {void}
   * @private
   */
  #runMethodsFromAttributes(): void {
    // We have to wait until the api is ready to set the current time
    if (this.#getValueFromAttribute('current-time') !== null) {
      const setInitialCurrentTime = () => {
        const newTime = Number(this.#getValueFromAttribute('current-time'));

        const isClosedPopover = (this.api?.popover && !this.api.popover.isVisible()) ?? false;
        const isMobile = detectIsMobile() as unknown as boolean;
        const shouldDelayUntilPlay = this.state !== 'playing' && (isMobile || isClosedPopover);

        void this.api?.time(newTime, { lazy: shouldDelayUntilPlay });
        this.#setSyncedEmbedOption('currentTime', newTime);

        this.removeEventListener(API_READY_EVENT, setInitialCurrentTime);
      };

      this.addEventListener(API_READY_EVENT, setInitialCurrentTime);
    }

    if (this.#getValueFromAttribute('email') !== null) {
      this.#updateEmail(this.#getValueFromAttribute('email') as string);
    }

    if (this.#getValueFromAttribute('video-quality') !== null) {
      const setVideoQualityFromAttribute = () => {
        const newQuality = this.#getValueFromAttribute('video-quality') as number | 'auto';

        this.api?._impl?.setVideoQuality(newQuality);
        this.#setSyncedEmbedOption('videoQuality', newQuality);

        this.removeEventListener(API_READY_EVENT, setVideoQualityFromAttribute);
      };

      this.addEventListener(API_READY_EVENT, setVideoQualityFromAttribute);
    }
  }

  /**
   * Saves the initial attributes from the DOM to a store so the public api can use them
   * @returns {void}
   * @private
   */
  #saveInitialAttributesFromDomOptions(): void {
    const domOptions = Object.fromEntries(
      Object.entries(this.attributes).map(([, value]) => [
        this.#kebabCaseToCamelCase(value.name),
        this.#getValueFromAttribute(value.name),
      ]),
    );

    this.#_playerData.setDomEmbedOptionSource(domOptions);

    // Override the embed options from other sources with the options from the DOM
    const finalOptions = { ...this.embedOptions, ...domOptions };

    // The public api uses this store when it gathers options from our many different sources
    setEmbedOptionStore(`__${this.uniqueId}_dom_options__`, finalOptions);
  }

  /**
   * Sets both the value of an embed option from the public api
   * and the value of an embed option saved on this element.
   *
   * For now, the public api is the source of truth for embed options.
   * However, this will change in the future. We also need a non-public
   * api source for embed options so we can use them before the public
   * api is ready.
   * @param {string} key - Name of the embed option
   * @param {boolean | number | string} value - Value of the embed option
   * @returns {void}
   */
  #setSyncedEmbedOption(key: string, value: Authorization | boolean | number | string): void {
    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    this.#_logger.info(`set ${key}`, value.toString());

    if (this.api) {
      this.api._attrs[key] = value;
    }
    this.#_playerData.updateEmbedOptionOverrides({ [key]: value });

    // Updates our PlayerDataProvider and re-renders the thumbnail with the new embed option
    this.#renderPreloadThumbnail();
  }

  #setupEventListeners(): void {
    const loadedMediaDataCallback = (event) => {
      const { mediaData } = (event as CustomEvent).detail as { mediaData: MediaData };
      this.#updateMediaData(mediaData);
    };

    this.addEventListener(LOADED_MEDIADATA_EVENT, loadedMediaDataCallback);
    this.#_removeEventListeners.push(() => {
      this.removeEventListener(LOADED_MEDIADATA_EVENT, loadedMediaDataCallback);
    });

    this.addEventListener(
      'click',
      () => {
        this.#playPending = true;
        this.#renderPreloadThumbnail();
      },
      { once: true },
    );
  }

  /**
   * Determines if a swatch should be displayed based on the embed options
   * @returns {boolean}
   */
  #shouldDisplaySwatch(): boolean {
    // If this is a popover and it renders a thumbnail in its container, we'll want to show a swatch
    return this.swatch !== false && (!this.wistiaPopover || this.#isPopoverWithThumbnail());
  }

  /**
   * Saves new email within localstorage and dispatches an emailchange event
   * @param {string} email - The new email
   * @returns {void}
   * @emits {EmailChangeEventData}
   * @private
   */
  #updateEmail(email: string): void {
    updateWistiaLocalStorage((localStorage: WistiaLocalStorage) => {
      // eslint-disable-next-line no-param-reassign
      localStorage[this.#pageUrl] = {
        ...localStorage[this.#pageUrl],
        trackEmail: email,
      };
    });
    this.dispatchEvent(
      new CustomEvent<EmailChangeEventData>('emailchange', {
        detail: { email },
      }),
    );
  }

  /**
   * Called when we have new mediadata for the player
   * @param {MediaData} mediaData
   * @returns {void}
   * @private
   */
  #updateMediaData(mediaData: MediaData): void {
    this.#_playerData.setServerMediaDataSource(mediaData);

    this.#_playerType = choosePlayer(
      this.#_judyContext,
      this.#_playerData.mediaData,
      this.#_playerData.embedOptions,
    ) as Players;

    this.#renderPreloadThumbnail();
  }
}

/**
 * Takes an image url (swatch) and returns the image metadata
 * @param {string} url
 * @returns {Promise<HTMLImageElement>}
 */
const getSwatchMetaData = async (url: string) => {
  const swatch = new Image();
  swatch.src = url;
  await swatch.decode();
  return swatch;
};

/**
 * Takes a media id and returns a swatch style element once we
 * have the swatch image metadata to calculate the aspect ratio
 * @param {string} mediaId
 * @returns {Promise<HTMLStyleElement>}
 */
export const wistiaSwatchElement = async (
  mediaId: string,
  embedHost?: string | undefined,
): Promise<HTMLStyleElement> => {
  const swatchUrl = getSwatchUrl(mediaId, embedHost);

  const swatchImg = await getSwatchMetaData(swatchUrl);
  const { naturalHeight, naturalWidth } = swatchImg;
  const ratio = (naturalHeight / naturalWidth) * 100;

  const style = document.createElement('style');
  style.innerHTML = `
    wistia-player[media-id='${mediaId}']:not(:defined) {
      padding: ${ratio}% 0 0 0;
      background: url(${swatchUrl});
      background-size: contain;
      filter: blur(5px);
      display: block;
    }
  `;
  return style;
};

if (customElements.get('wistia-player') === undefined) {
  customElements.define('wistia-player', WistiaPlayer);
}

declare global {
  interface HTMLElementTagNameMap {
    'wistia-player': WistiaPlayer;
  }

  interface GlobalEventHandlersEventMap {
    [API_READY_EVENT]: WistiaPlayerEvents[typeof API_READY_EVENT];
    [LOADED_MEDIADATA_EVENT]: WistiaPlayerEvents[typeof LOADED_MEDIADATA_EVENT];
  }
}
