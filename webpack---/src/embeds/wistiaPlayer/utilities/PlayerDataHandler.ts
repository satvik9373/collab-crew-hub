import merge from 'lodash.merge';
import { cast } from '../../../utilities/obj.js';
import type { EmbedOptions, MediaData } from '../../../types/player-api-types.ts';

interface SourceMediaData {
  inlineData?: MediaData;
  serverData?: MediaData;
}

interface SourceEmbedOptions {
  domOptions?: EmbedOptions;
  inlineMediaDataOptions?: EmbedOptions;
  serverMediaDataOptions?: EmbedOptions;
  wistiaWindowOptions?: EmbedOptions;
}

export class PlayerDataHandler {
  // Embed options set after initialization which override the embed options
  // gathered from the source data
  #embedOptionOverrides: EmbedOptions = {};

  // Merged embed options gathered from source data
  #embedOptions: EmbedOptions = {};

  // Merged media data gathered from source data
  #mediaData: MediaData = {};

  // Source data which is used to create the final embed options
  readonly #sourceEmbedOptions: SourceEmbedOptions = {
    domOptions: {} as EmbedOptions,
    inlineMediaDataOptions: {} as EmbedOptions,
    serverMediaDataOptions: {} as EmbedOptions,
    wistiaWindowOptions: {} as EmbedOptions,
  };

  // Source data which is used to create the final media data
  readonly #sourceMediaData: SourceMediaData = {
    serverData: {} as MediaData,
    inlineData: {} as MediaData,
  };

  /**
   * Returns the final embed options which are a merge of all the source data and the overrides
   * @returns {EmbedOptions}
   * @readonly
   */
  public get embedOptions(): EmbedOptions {
    return this.#embedOptions;
  }

  /**
   * Returns the final media data which is a merge of all the source data
   * @returns {MediaData}
   * @readonly
   */
  public get mediaData(): MediaData {
    // Our embed options can be overridden after our initial source data fetches
    // Make sure the embed options within the media data are up to date
    this.#mediaData.embedOptions = this.#embedOptions;
    return this.#mediaData;
  }

  /**
   * Sets the source data for the embed options set on the <wistia-player> DOM element
   * @param {EmbedOptions} data
   * @returns {void}
   */
  public setDomEmbedOptionSource(data: EmbedOptions): void {
    this.#sourceEmbedOptions.domOptions = data;
    this.#updatePlayerEmbedOptions();
  }

  /**
   * Sets the source data for the media data set inline on the window
   * @param {MediaData} data
   * @returns {void}
   */
  public setInlineMediaDataSource(data: MediaData): void {
    this.#sourceMediaData.inlineData = data;
    this.#sourceEmbedOptions.inlineMediaDataOptions = data.embedOptions ?? {};
    this.#updatePlayerMediaData();
  }

  /**
   * Sets the source data for the media data fetched from the server
   * @param {MediaData} data
   * @returns {void}
   */
  public setServerMediaDataSource(data: MediaData): void {
    this.#sourceMediaData.serverData = data;
    this.#sourceEmbedOptions.serverMediaDataOptions = data.embedOptions ?? {};
    this.#updatePlayerMediaData();
  }

  /**
   * Sets the source data for the embed options set on the window via wistiaOptions
   * @param {EmbedOptions} data
   * @returns {void}
   */
  public setWistiaWindowEmbedOptionSource(data: EmbedOptions): void {
    this.#sourceEmbedOptions.wistiaWindowOptions = data;
    this.#updatePlayerEmbedOptions();
  }

  /**
   * Updates the embed option overrides which will be merged with the source embed option data
   * This merge can happen more frequently than our finite source data sets, which is why it's separate.
   * That way we don't have to re-merge the source data every time we update the overrides.
   * @param {EmbedOptions} data
   * @returns {void}
   */
  public updateEmbedOptionOverrides(data: EmbedOptions): void {
    this.#embedOptionOverrides = merge(this.#embedOptionOverrides, data);
    this.#embedOptions = merge(this.#embedOptions, this.#embedOptionOverrides);
  }

  /**
   * Merge the source embed options together to create a single source of truth of embed options
   * @private
   * @returns {void}
   */
  #updatePlayerEmbedOptions(): void {
    const { inlineData } = this.#sourceMediaData;
    const { serverMediaDataOptions, wistiaWindowOptions, inlineMediaDataOptions, domOptions } =
      this.#sourceEmbedOptions;

    const hasInlineMediaData = inlineData && Object.keys(inlineData).length > 0;

    // Merge the embed options together to create a single source of truth of embed options
    this.#embedOptions = cast(
      merge(
        hasInlineMediaData === true
          ? (inlineMediaDataOptions ?? {})
          : (serverMediaDataOptions ?? {}),
        wistiaWindowOptions ?? {},
        domOptions ?? {},
        this.#embedOptionOverrides,
      ),
    ) as EmbedOptions;

    // Make sure the embed options within the media data are up to date
    this.#mediaData.embedOptions = this.#embedOptions;
  }

  /**
   * Merge the source media data together to create a single source of truth of media data
   * This will also update the embed options from the media data
   * @private
   * @returns {void}
   */
  #updatePlayerMediaData(): void {
    // Choose the media data we'll use based on whether we have inline data or not
    const { inlineData, serverData } = this.#sourceMediaData;
    const hasInlineMediaData = inlineData && Object.keys(inlineData).length > 0;

    const data = hasInlineMediaData ? inlineData : (serverData ?? {});
    this.#mediaData = cast(data) as MediaData;
    this.#updatePlayerEmbedOptions();
  }
}
