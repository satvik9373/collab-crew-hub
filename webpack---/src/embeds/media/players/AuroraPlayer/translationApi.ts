import { isNumber } from '@wistia/type-guards';
import { StopGo } from '../../../../utilities/stopgo.js';
import { translateEmbedOptionKeyValuePairForWebComponent } from '../../../../utilities/deprecatedEmbedOptionTranslation.ts';
import { getSourceName } from '../../../../utilities/pluginScriptsToLoad.js';
import { API_READY_EVENT, AFTER_REPLACE_EVENT } from '../../../../utilities/eventConstants.ts';
import type { WistiaPlayer } from '../../../wistiaPlayer/WistiaPlayer.tsx';
import type { EmbedOptions, PublicApi, StopGoType } from '../../../../types/player-api-types.ts';

type videoHeightOrWidthOptions = {
  constrain?: boolean;
};

export class TranslationApi {
  readonly #commandQueueOpen: StopGoType;

  #wistiaPlayerComponent: WistiaPlayer;

  /**
   * @param wpComponent instance of the wistia-player component
   */
  public constructor(wpComponent: WistiaPlayer) {
    this.#wistiaPlayerComponent = wpComponent;

    const SG = StopGo as StopGoType;
    this.#commandQueueOpen = new SG();

    this.#commandQueueOpen(true);
  }

  /**
   * Often used in Wistia.api and helper methods
   * @returns {WistiaPlayer} returns the Aurora player component
   */
  public get container(): WistiaPlayer {
    return this.#wistiaPlayerComponent;
  }

  /**
   * Often used in Wistia.api and helper methods
   * @returns {object} returns the Aurora player component
   */
  public get popover(): object {
    return {
      show: () => {
        this.#commandQueueOpen.synchronize((done) => {
          this.#wistiaPlayerComponent
            .showPopover()
            .then(() => {
              done();
            })
            .catch(() => {
              done();
            });
        });
      },
      hide: () => {
        this.#commandQueueOpen.synchronize((done) => {
          this.#wistiaPlayerComponent
            .hidePopover()
            .then(() => {
              done();
            })
            .catch(() => {
              done();
            });
        });
      },
      height: (newHeight?: number, options?: { constrain?: boolean }) => {
        // Since fixed styles can be set on the original popover embed container, we need
        // to set those alongside the usual styles on the wistia-player element
        const popoverContainer = this.#wistiaPlayerComponent.parentElement;
        if (!popoverContainer) {
          return this;
        }

        if (newHeight !== undefined) {
          popoverContainer.style.height = `${newHeight}px`;

          if (options?.constrain) {
            const widthForHeight = newHeight / this.#wistiaPlayerComponent.aspect;

            popoverContainer.style.width = `${widthForHeight}px`;
          }
        }

        return this.height(newHeight, options);
      },
      width: (newWidth?: number, options?: { constrain?: boolean }) => {
        // Since fixed styles can be set on the original popover embed container, we need
        // to set those alongside the usual styles on the wistia-player element
        const popoverContainer = this.#wistiaPlayerComponent.parentElement;
        if (!popoverContainer) {
          return this;
        }

        if (newWidth !== undefined) {
          popoverContainer.style.width = `${newWidth}px`;

          if (options?.constrain) {
            const widthForHeight = newWidth / this.#wistiaPlayerComponent.aspect;

            popoverContainer.style.height = `${widthForHeight}px`;
          }
        }

        return this.width(newWidth, options);
      },
    };
  }

  /**
   * Adds a media to the playlist.
   * @param {string} mediaId - the id of the media to add
   * @param {object} options - embed options to apply for this media in the playlist
   * @param {object} position - position to add the media in the playlist
   * @returns {Record<string, object | string>[]} - returns an array of media and their embed options in the playlist
   */
  public addToPlaylist(
    mediaId: string,
    options: object,
    position: object,
  ): Record<string, object | string>[] {
    return this.#wistiaPlayerComponent.api?.addToPlaylist(mediaId, options, position) ?? [];
  }

  /**
   * Maps aspect property to the old aspect method
   * @returns {number} returns the aspect ratio of the video
   */
  public aspect(): number {
    return this.#wistiaPlayerComponent.aspect;
  }

  /**
   * bind doesn't and won't exist on wistia-player, so we need to call its PublicApi instance directly
   * @returns {Function} returns an unbind function
   */
  public bind(
    event: string,
    param1: number | (() => void),
    param2?: number | (() => void),
    param3?: () => void,
  ): (() => void) | undefined {
    switch (event) {
      case 'crosstime':
        return this.#wistiaPlayerComponent.api?.bind(event, param1, param2);
      case 'betweentimes':
        return this.#wistiaPlayerComponent.api?.bind(event, param1, param2, param3);
      default:
        return this.#wistiaPlayerComponent.api?.bind(event, param1);
    }
  }

  /**
   * Maps cancelFullscreen method to the legacy cancelFullscreen method
   * @returns {this} .
   */
  public cancelFullscreen(): this {
    this.#commandQueueOpen.synchronize((done) => {
      this.#wistiaPlayerComponent
        .cancelFullscreen()
        .then(() => {
          done();
        })
        // old api always continued with the synchronize, even if cancelFullscreen fails
        .catch(() => {
          done();
        });
    });

    return this;
  }

  /**
   * Maps duration property to the old duration method
   * @returns {number} returns the duration of the media in seconds
   */
  public duration(): number {
    return this.#wistiaPlayerComponent.duration;
  }

  /**
   * Maps email property to the old email method
   * @param {string | undefined} newEmail - the new email to save
   * @returns {string} returns the email currently associated with this viewer
   */
  public email(newEmail: string | undefined): string | this | null {
    // Get
    if (newEmail === undefined) {
      return this.#wistiaPlayerComponent.email ?? null;
    }

    // Set
    this.#commandQueueOpen.synchronize((done) => {
      this.#wistiaPlayerComponent.email = newEmail;
      done();
    });

    return this;
  }

  /**
   * In order to preserve the same timing executions for legacy embeds we hook up
   * hasData, embedded, and ready to their respective legacy public_api/impl StopGos.
   * At a later point, when the Aurora player no longer depends on the public_api to build
   * a player, we can convert these to use newer events
   *
   * hasData method to execute a given callback when the video hasData
   * Hook into the legacy public api's embedded
   * @callback callbackFn
   * @param {callbackFn} callbackFn - callback function
   */
  public embedded(callbackFn?: () => void): PublicApi | boolean {
    if (this.#wistiaPlayerComponent.api) {
      if (callbackFn) {
        return this.#wistiaPlayerComponent.api.embedded(callbackFn);
      }
      return this.#wistiaPlayerComponent.api.embedded();
    }

    const legacyEmbeddedCallback = () => {
      this.#wistiaPlayerComponent.removeEventListener(
        'legacypublicapicreated',
        legacyEmbeddedCallback,
      );
      this.#wistiaPlayerComponent.api?.embedded(callbackFn);
    };

    this.#wistiaPlayerComponent.addEventListener('legacypublicapicreated', legacyEmbeddedCallback);
    return false;
  }

  public eventKey(): string | undefined {
    return this.#wistiaPlayerComponent.eventKey;
  }

  /**
   *
   * @param {string} name the handle name of the control to be retrieved
   * @returns {object} the control object
   */
  public getControl(name: string): object | undefined {
    return this.#wistiaPlayerComponent.controls[name];
  }

  /**
   * In order to preserve the same timing executions for legacy embeds we hook up
   * hasData, embedded, and ready to their respective legacy public_api/impl StopGos.
   * At a later point, when the Aurora player no longer depends on the public_api to build
   * a player, we can convert these to use newer events
   *
   * hasData method to execute a given callback when the video hasData
   * @callback callbackFn
   * @param {callbackFn} callbackFn - callback function
   */
  public hasData(callbackFn?: () => void): PublicApi | boolean {
    if (this.#wistiaPlayerComponent.api) {
      if (callbackFn) {
        return this.#wistiaPlayerComponent.api.hasData(callbackFn);
      }
      return this.#wistiaPlayerComponent.api.hasData();
    }
    const legacyHasDataCallback = () => {
      this.#wistiaPlayerComponent.removeEventListener(
        'legacypublicapicreated',
        legacyHasDataCallback,
      );
      this.#wistiaPlayerComponent.api?.hasData(callbackFn);
    };

    this.#wistiaPlayerComponent.addEventListener('legacypublicapicreated', legacyHasDataCallback);
    return false;
  }

  /**
   * Maps mediaId property to the old hashedId method
   * @returns {string} returns the hashed id of the video
   */
  public hashedId(): string {
    return this.#wistiaPlayerComponent.mediaId;
  }

  /**
   * Maps height of Aurora web component to the old height method
   * @returns {number} returns the height of the video
   * @param {number} val new height in px
   * @param {Object=} options options object
   * @param {boolean=} options.constrain whether or not to constrain the embed to maintain the aspect ratio
   */
  public height(val?: number, options: { constrain?: boolean } = {}): number | this {
    if (val != null && !Number.isNaN(val)) {
      this.#wistiaPlayerComponent.style.height = `${val}px`;

      this.#executeAllEventBindings('heightchange');

      if (options.constrain) {
        const widthForHeight = val * this.#wistiaPlayerComponent.aspect;

        this.#wistiaPlayerComponent.style.width = `${widthForHeight}px`;
        this.#executeAllEventBindings('widthchange');
      }

      return this;
    }
    return this.#wistiaPlayerComponent.getBoundingClientRect().height;
  }

  /**
   * Maps inFullscreen property to the old inFullscreen method
   * @returns {boolean} returns whether the video is in fullscreen
   */
  public inFullscreen(): boolean {
    return this.#wistiaPlayerComponent.inFullscreen;
  }

  /**
   * Maps muted property to the old isMuted method
   * @returns {boolean} returns whether the video is muted
   */
  public isMuted(): boolean {
    return this.#wistiaPlayerComponent.muted;
  }

  /**
   * @returns {this} returns an instance of the TranslationApi for chaining
   */
  public mute(): this {
    this.#commandQueueOpen.synchronize((done) => {
      this.#wistiaPlayerComponent.muted = true;
      done();
    });

    return this;
  }

  /**
   * Maps name property to the old name method
   * @returns {string} returns the name of the video
   */
  public name(): string | null {
    return this.#wistiaPlayerComponent.name ?? null;
  }

  /**
   * turns the promise version from the wistia-player into the old chainable version
   * @returns {this} returns an instance of the TranslationApi for chaining
   */
  public pause(): this {
    this.#commandQueueOpen.synchronize((done) => {
      this.#wistiaPlayerComponent
        .pause()
        .then(() => {
          done();
        })
        // old api always continued with the synchronize, even if pause failed
        .catch(() => {
          done();
        });
    });

    return this;
  }

  /**
   * Maps percentWatched property to the old percentWatched method
   * @returns {number} returns the percent of the video that has been watched as a decimal between 0 and 1
   */
  public percentWatched(): number {
    return this.#wistiaPlayerComponent.percentWatched;
  }

  /**
   * turns the promise version from the wistia-player into the old chainable version
   * @returns {this} returns an instance of the TranslationApi for chaining
   */
  public play(): this {
    this.#commandQueueOpen.synchronize((done) => {
      this.#wistiaPlayerComponent
        .play()
        .then(() => {
          done();
        })
        // old api always continued with the synchronize, even if play failed
        .catch(() => {
          done();
        });
    });

    return this;
  }

  /**
   * Maps playbackRate property to the old playbackRate method
   * @param {number | undefined} newRate - the new playback rate of the media
   * @returns {number} returns the current playback rate of the media
   */
  public playbackRate(newRate: number | undefined): number | this {
    // Get
    if (newRate === undefined) {
      return this.#wistiaPlayerComponent.playbackRate;
    }

    // Set
    this.#commandQueueOpen.synchronize((done) => {
      this.#wistiaPlayerComponent.playbackRate = newRate;
      done();
    });

    return this;
  }

  public plugin(name: string, fn?: (name?, options?) => void): Promise<void> | this {
    if (!fn) {
      return this.#wistiaPlayerComponent.getPlugin(name);
    }

    this.#commandQueueOpen.synchronize((done) => {
      fn(this.#wistiaPlayerComponent.getPlugin(name));
      done();
    });

    return this;
  }

  /**
   * In order to preserve the same timing executions for legacy embeds we hook up
   * hasData, embedded, and ready to their respective legacy public_api/impl StopGos.
   * At a later point, when the Aurora player no longer depends on the public_api to build
   * a player, we can convert these to use newer events
   *
   * Ready method to execute a given callback when the video is ready
   * @callback callbackFn
   * @param {callbackFn} callbackFn - callback function
   */
  public ready(callbackFn?: () => void): PublicApi | boolean {
    if (this.#wistiaPlayerComponent.api) {
      if (callbackFn) {
        return this.#wistiaPlayerComponent.api.ready(callbackFn);
      }
      return this.#wistiaPlayerComponent.api.ready();
    }
    const legacyReadyCallback = () => {
      this.#wistiaPlayerComponent.removeEventListener(
        'legacypublicapicreated',
        legacyReadyCallback,
      );
      this.#wistiaPlayerComponent.api?.ready(callbackFn);
    };

    this.#wistiaPlayerComponent.addEventListener('legacypublicapicreated', legacyReadyCallback);
    return false;
  }

  /**
   * @param {string} name name of the control
   * @returns {Promise}
   */
  public async releaseControls(name: string): Promise<void> {
    return this.#wistiaPlayerComponent.releaseControls(name);
  }

  /**
   * remove doesn't and won't exist on wistia-player, so we need to call its PublicApi instance directly
   * @param {object} opts - options to pass to the remove method
   * @returns {void}
   */
  public remove(opts?: object): void {
    this.#wistiaPlayerComponent.api?.remove(opts);
  }

  /**
   * @param {string} hashedId
   * @param {object} options
   * @returns {this}
   */
  public replaceWith(hashedId: string, options: EmbedOptions = {}): this {
    this.#commandQueueOpen.synchronize((done) => {
      this.#executeAllEventBindings('beforereplace');

      const newPlayer = document.createElement('wistia-player');

      newPlayer.mediaId = hashedId;

      // plugins are not added <wistia-player/> via an attribute/property but through a method
      if (options.plugin) {
        const plugins = { ...options.plugin };

        Object.keys(plugins).forEach((key) => {
          const translationKeyName = getSourceName(key);

          newPlayer.definePlugin(translationKeyName, plugins[key] as object).catch(() => {
            // eslint-disable-next-line no-console
            console.warn('could not add plugin');
          });
        });
      }

      // define all the existing plugins on the new element
      const optionsWithoutPlugins = { ...options };
      delete optionsWithoutPlugins.plugin;

      Object.keys(optionsWithoutPlugins).forEach((key) => {
        const [translatedKey, translatedValue] = translateEmbedOptionKeyValuePairForWebComponent(
          key,
          options[key] as boolean | number | string,
        );

        newPlayer.setAttribute(translatedKey, translatedValue.toString());
      });

      newPlayer.addEventListener(API_READY_EVENT, () => {
        done();
      });

      // port the old engine to the new element. Ignore the deprecation warning until
      // engine transfers are refactored
      // eslint-disable-next-line deprecation/deprecation
      newPlayer._oldEngine = this.#wistiaPlayerComponent.api?._impl?.engine;

      // save the underlying video element. This allows us to keep autoplaying with sound
      // we put it in the head as a bit of a cheat to hide any possible flickering of moving the video.
      const head = document.getElementsByTagName('head')[0];
      const video = this.#wistiaPlayerComponent.shadowRoot?.querySelector('video');
      if (video) {
        head.appendChild(video);
      }

      // transfer the fullscreen state to the new element
      // ignore the deprecation warning until fullscreenState transfers are refactored
      newPlayer._fullscreenState = this.#wistiaPlayerComponent._fullscreenState;

      this.#wistiaPlayerComponent.replaceWith(newPlayer);

      this.#executeAllEventBindings(AFTER_REPLACE_EVENT);

      this.#wistiaPlayerComponent = newPlayer;
      this.#wistiaPlayerComponent.dispatchEvent(
        new CustomEvent(AFTER_REPLACE_EVENT, { detail: { api: this } }),
      );
    });

    return this;
  }

  /**
   * @param {string} name name of the control
   * @returns {Promise}
   */
  public async requestControls(name: string): Promise<void> {
    return this.#wistiaPlayerComponent.requestControls(name);
  }

  /**
   * Maps requestFullscreen method to the legacy requestFullscreen method
   * @returns {this}
   */
  public requestFullscreen(): this {
    this.#commandQueueOpen.synchronize((done) => {
      this.#wistiaPlayerComponent
        .requestFullscreen()
        .then(() => {
          done();
        })
        // old api always continued with the synchronize, even if requestFullscreen fails
        .catch(() => {
          done();
        });
    });

    return this;
  }

  /**
   * Maps secondsWatched property to the old secondsWatched method
   * @returns {number} returns the number of unique seconds that have been watched for the video.
   */
  public secondsWatched(): number {
    return this.#wistiaPlayerComponent.secondsWatched;
  }

  /**
   * Maps secondsWatchedVector property to the old secondsWatchedVector method
   * @returns {number[]} returns an array where each index represents the number of times the viewer has watched each second of the video.
   */
  public secondsWatchedVector(): number[] {
    return this.#wistiaPlayerComponent.secondsWatchedVector;
  }

  /**
   *
   * @param {string} handle Handle the control
   * @param {boolean} enabled Boolean to enable or disable the control
   * @returns {this}
   */
  public setControlEnabled(handle: string, enabled: boolean): this {
    this.#commandQueueOpen.synchronize((done) => {
      if (enabled) {
        this.#wistiaPlayerComponent
          .enableControl(handle)
          .then(() => {
            done();
          })
          .catch(() => {
            done();
          });
      }

      if (!enabled) {
        this.#wistiaPlayerComponent
          .disableControl(handle)
          .then(() => {
            done();
          })
          .catch(() => {
            done();
          });
      }
      done();
    });
    return this;
  }

  /**
   * Maps state property to the old state method
   * @returns {string} returns the state of the video
   */
  public state(): string {
    return this.#wistiaPlayerComponent.state;
  }

  /**
   * Maps currentTime property to the old time method
   * @param {number | undefined} newTime - the new time to set the video to
   * @returns {number} returns the current time of the video
   */
  public time(newTime: number | undefined): number | this {
    // Get
    if (newTime === undefined) {
      return this.#wistiaPlayerComponent.currentTime;
    }

    // Set
    this.#commandQueueOpen.synchronize((done) => {
      const seekComplete = () => {
        this.#wistiaPlayerComponent.removeEventListener('seeked', seekComplete);
        done();
      };
      this.#wistiaPlayerComponent.addEventListener('seeked', seekComplete);
      this.#wistiaPlayerComponent.currentTime = newTime;
    });

    return this;
  }

  /**
   * unbind doesn't and won't exist on wistia-player, so we need to call its PublicApi instance directly
   * @returns {this} returns an instance of the TranslationApi for chaining
   */
  public unbind(
    event: string,
    param1: number | (() => void),
    param2?: number | (() => void),
    param3?: () => void,
  ): (() => void) | undefined {
    switch (event) {
      case 'crosstime':
        return this.#wistiaPlayerComponent.api?.unbind(event, param1, param2);
      case 'betweentimes':
        return this.#wistiaPlayerComponent.api?.unbind(event, param1, param2, param3);
      default:
        return this.#wistiaPlayerComponent.api?.unbind(event, param1);
    }
  }

  /**
   * map legacy unmute method to Aurora web component
   * @returns {this} returns an instance of the TranslationApi for chaining
   */
  public unmute(): this {
    this.#commandQueueOpen.synchronize((done) => {
      this.#wistiaPlayerComponent.muted = false;

      done();
    });

    return this;
  }

  /**
   *
   * @param {number} val
   * @param {videoHeightOrWidthOptions} options
   * @returns {number | this | undefined}
   */
  public videoHeight(
    val: number,
    options: videoHeightOrWidthOptions = {},
  ): number | this | undefined {
    if (isNumber(val)) {
      if (this.#wistiaPlayerComponent.embedOptions.videoFoam !== true) {
        this.#wistiaPlayerComponent.style.height = `${val}px`;
        if (options.constrain) {
          const widthForHeight = val / this.#wistiaPlayerComponent.aspect;

          this.#wistiaPlayerComponent.style.width = `${widthForHeight}px`;
        } else {
          // eslint-disable-next-line no-console
          console.warn('setting `videoHeight` while `videoFoam` is enabled results in a no-op');
        }

        return this;
      }
    }
    return Number(getComputedStyle(this.#wistiaPlayerComponent).height);
  }

  /**
   * Maps videoQuality property to the old videoQuality method
   * @param {number | 'auto' | undefined} quality - the new quality for the video - number or string 'auto'
   * @returns {number | this | 'auto'} returns the quality of the video or the api itself when using as a setter
   */
  public videoQuality(quality: number | 'auto' | undefined): number | this | 'auto' {
    // Get
    if (quality === undefined) {
      return this.#wistiaPlayerComponent.videoQuality;
    }

    // Set
    this.#commandQueueOpen.synchronize((done) => {
      this.#wistiaPlayerComponent.videoQuality = quality;

      done();
    });

    return this;
  }

  /**
   *
   * @param {number} val
   * @param {videoHeightOrWidthOptions} options
   * @returns {number | this | undefined}
   */
  public videoWidth(
    val: number,
    options: videoHeightOrWidthOptions = {},
  ): number | this | undefined {
    if (isNumber(val)) {
      if (this.#wistiaPlayerComponent.embedOptions.videoFoam !== true) {
        this.#wistiaPlayerComponent.style.width = `${val}px`;
        if (options.constrain) {
          const heightForWidth = val / this.#wistiaPlayerComponent.aspect;

          this.#wistiaPlayerComponent.style.height = `${heightForWidth}px`;
        } else {
          // eslint-disable-next-line no-console
          console.warn('setting `videoWidth` while `videoFoam` is enabled results in a no-op');
        }

        return this;
      }
    }
    return Number(getComputedStyle(this.#wistiaPlayerComponent).width);
  }

  /**
   * translation method for the visitorKey method that talks directly to the wistia global
   * @returns {string | null} returns the visitor_key of the person watching the video.
   */
  public visitorKey(): string | null {
    if (window.Wistia?.visitorKey?.value() != null) {
      return window.Wistia.visitorKey.value();
    }

    return null;
  }

  /**
   * Maps volume property to the old volume method
   * @param {number | undefined} level - the new volume for the video - Number between 0 and 1
   * @returns {number} returns the volume of the video as a Number between 0 and 1
   */
  public volume(level: number | undefined): number | this {
    // Get
    if (level === undefined) {
      return this.#wistiaPlayerComponent.volume;
    }

    // Set
    this.#commandQueueOpen.synchronize((done) => {
      this.#wistiaPlayerComponent.volume = level;

      done();
    });

    return this;
  }

  /**
   * Maps width of Aurora web component to the old width method
   * @returns {number} returns the width of the video
   * @param {number} val new height in px
   * @param {Object=} options options object
   * @param {boolean=} options.constrain whether or not to constrain the embed to maintain the aspect ratio
   */
  public width(val?: number, options: { constrain?: boolean } = {}): number | this {
    if (val != null && !Number.isNaN(val)) {
      this.#wistiaPlayerComponent.style.width = `${val}px`;

      this.#executeAllEventBindings('widthchange');

      if (options.constrain) {
        const heightForWidth = val / this.#wistiaPlayerComponent.aspect;

        this.#wistiaPlayerComponent.style.height = `${heightForWidth}px`;
        this.#executeAllEventBindings('heightchange');
      }

      return this;
    }
    return this.#wistiaPlayerComponent.getBoundingClientRect().width;
  }

  #executeAllEventBindings(eventName: string): void {
    if (this.#wistiaPlayerComponent.api?._bindings?.[eventName]) {
      const bindings = this.#wistiaPlayerComponent.api._bindings[eventName];
      bindings.forEach((fn: (api) => void) => {
        fn(this);
      });
    }
  }
}
