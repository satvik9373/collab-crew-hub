import type { PublicApi, WistiaContainerHTMLElement } from '../types/player-api-types.ts';
import { poll } from './poll.js';
import { getOneApiHandle } from './getApiHandles.ts';
import { getAllApiEmbedElements } from './getEmbedElements.ts';
import { elemHasClass, elemMutationObserver } from './elem.js';
import { isDocReady, onDocReady } from './docReady.js';
import { wlog } from './wlog.js';
import {
  INIT_EMBED_EVENT,
  INTERNAL_API_ON_FIND_EVENT,
  AFTER_REPLACE_EVENT,
} from './eventConstants.ts';

type ApiHandle =
  | MatcherFunction
  | PublicApi
  | WistiaContainerHTMLElement
  | 'removed'
  | null
  | undefined;
type MatcherFunction = (video?: ApiHandle) => void;
type MatcherEventCallback = (event: CustomEvent) => void;
type CleanupCallback = () => void;

// The special key which matches all api handles
export const ALL_API_HANDLES_KEY = '_all';

// The mutation observer which watches for new wistia-player elements
// Should only be defined once
let WistiaPlayerElementAddedObserver = null as MutationObserver | null;

// The list of functions which should run when a new api handle is found
const onFindApiFunctionsList = [] as MatcherFunction[];
const onFindApiEventCallbacksList = [] as MatcherEventCallback[];

/**
 * Run a function on either legacy or web component embeds
 * @param {WistiaContainerHTMLElement} wistiaPlayer - Embed element containing the api handle
 * @param {Function} fn - Function to run
 * @returns {void}
 */
const runFunctionOnAnyEmbedType = (
  wistiaPlayer: WistiaContainerHTMLElement,
  fn: MatcherFunction,
) => {
  // TODO: We need to call the PublicApi methods for now, but once WistiaPlayer
  // is more built out we should be able to just send that over directly
  const api = wistiaPlayer.wistiaApi ?? wistiaPlayer.api ?? null;
  if (api !== null && api !== 'removed') {
    fn(api);
  }
};

/**
 * Set and return the event listeners for a wistia-player custom element
 * @param {WistiaContainerHTMLElement} wistiaPlayer - Embed element
 * @param {Function} runIfMatchCallback - Function to try running when event is fired
 * @returns {Function[]} - RemoveEventListener functions
 */
const setAndReturnEventListeners = (
  wistiaPlayer: WistiaContainerHTMLElement,
  runIfMatchCallback: MatcherEventCallback,
): CleanupCallback[] => {
  wistiaPlayer.addEventListener(INIT_EMBED_EVENT, runIfMatchCallback);
  wistiaPlayer.addEventListener(INTERNAL_API_ON_FIND_EVENT, runIfMatchCallback);
  wistiaPlayer.addEventListener(AFTER_REPLACE_EVENT, runIfMatchCallback);

  return [
    () => wistiaPlayer.removeEventListener(INIT_EMBED_EVENT, runIfMatchCallback),
    () => wistiaPlayer.removeEventListener(INTERNAL_API_ON_FIND_EVENT, runIfMatchCallback),
    () => wistiaPlayer.removeEventListener(AFTER_REPLACE_EVENT, runIfMatchCallback),
  ] as CleanupCallback[];
};

/**
 * Set up a mutation observer to watch for new embed elements
 * Should only be called and created once
 * @returns {void}
 */
const createNewEmbedMutationObserver = () => {
  WistiaPlayerElementAddedObserver = elemMutationObserver((mutations: MutationRecord[]) => {
    mutations.forEach((mutation) => {
      const { addedNodes } = mutation as unknown as MutationRecord;
      addedNodes.forEach((addedNode: HTMLElement) => {
        if (!(addedNode instanceof HTMLElement)) {
          return;
        }

        let wistiaPlayer: WistiaContainerHTMLElement | null = null;

        // Look for wistia-player elements or legacy embed elements as the added node
        // or as children of the added node
        if (addedNode.tagName === 'WISTIA-PLAYER' || elemHasClass(addedNode, 'wistia_embed')) {
          wistiaPlayer = addedNode as WistiaContainerHTMLElement;
        } else if (addedNode.querySelector('wistia-player')) {
          wistiaPlayer = addedNode.querySelector('wistia-player') as WistiaContainerHTMLElement;
        } else if (addedNode.querySelector('.wistia_embed')) {
          wistiaPlayer = addedNode.querySelector(
            '.wistia_embed',
          ) as unknown as WistiaContainerHTMLElement;
        }

        if (wistiaPlayer === null) {
          return;
        }

        // Run any functions which should run when a new embed is found
        onFindApiFunctionsList.forEach((onFindApiFunction) => {
          runFunctionOnAnyEmbedType(
            wistiaPlayer as unknown as WistiaContainerHTMLElement,
            onFindApiFunction,
          );
        });

        // And set up event listeners for that embed
        onFindApiEventCallbacksList.forEach((onFindApiEventCallback) => {
          setAndReturnEventListeners(
            wistiaPlayer as unknown as WistiaContainerHTMLElement,
            onFindApiEventCallback,
          );
        });
      });
    });
  }) as MutationObserver;

  onDocReady(() => {
    if (WistiaPlayerElementAddedObserver !== null) {
      try {
        // eslint-disable-next-line observers/no-missing-unobserve-or-disconnect
        WistiaPlayerElementAddedObserver.observe(document.body, { subtree: true, childList: true });
      } catch (err: unknown) {
        wlog.error(err);
      }
    }
  });
};

/**
 * Run a function and set up listeners on any embeds which already exist in the dom
 * @param {Function} runIfMatch - Function to try running
 * @param {Function} runIfMatchCallback - Callback to set on event listeners
 * @returns {Function[]} - Cleanup functions (unbind or removeEventListener)
 */
const setupOnFindForExistingEmbeds = (
  runIfMatch: MatcherFunction,
  runIfMatchCallback: MatcherEventCallback,
) => {
  const legacyEmbeds = Array.from(getAllApiEmbedElements());
  const webComponentEmbeds = Array.from(
    document.getElementsByTagName('wistia-player'),
  ) as WistiaContainerHTMLElement[];

  const wistiaPlayers = legacyEmbeds.concat(webComponentEmbeds);

  return wistiaPlayers.reduce(
    (accumulator: CleanupCallback[], wistiaPlayer: WistiaContainerHTMLElement) => {
      // Try running the function on every existing api handle now
      runFunctionOnAnyEmbedType(wistiaPlayer, runIfMatch);

      // Set up event listeners for this embed's initembed and afterreplace events
      return [...accumulator, ...setAndReturnEventListeners(wistiaPlayer, runIfMatchCallback)];
    },
    [],
  );
};

/**
 * Try to run a function on an api handle if it matches the matcher
 * @param {PublicApi | 'removed' | null | undefined} api - The api handle
 * @param {HTMLElement | number | string} matcher - The matcher
 * @param {Function} functionToRun - The function to run
 * @param {boolean} shouldOnlyRunWhenVisible - If true, only run the function when the embed is visible
 * @returns {void}
 */
const maybeRunFunction = (
  api: PublicApi | 'removed' | null | undefined,
  matcher: HTMLElement | number | string,
  functionToRun: MatcherFunction,
  shouldOnlyRunWhenVisible: boolean,
) => {
  // Check if the api handle is valid
  if (api === null || api === 'removed' || api === undefined) {
    return;
  }

  // Check if the api handle matches the matcher (or if the matcher is the special key for all api handles)
  if (matcher !== ALL_API_HANDLES_KEY && api !== getOneApiHandle(matcher)) {
    return;
  }

  if (shouldOnlyRunWhenVisible) {
    // If the function should only run when the embed is visible, add the function to the api's up StopGo
    api.up(() => functionToRun(api));
  } else {
    // Otherwise we can just run the function now
    functionToRun(api);
  }
};

type OnFindApiHandleOptions = {
  functionToRun: MatcherFunction;
  matcher: HTMLElement | number | string;
  shouldOnlyRunWhenVisible?: boolean;
};

/**
 * Run a function on a single API handle or all API handles when they are found
 * @param {HTMLElement | number | string} matcher - The matcher
 * @param {Function} fn - The function to run
 * @param {boolean} shouldOnlyRunWhenVisible - If true, only run the function when the embed is visible
 * @returns {Function} - The function to unbind the event listener
 */
export const onFindApiHandle = ({
  matcher,
  functionToRun,
  shouldOnlyRunWhenVisible = false,
}: OnFindApiHandleOptions): void => {
  const runIfMatch = ((api: PublicApi) => {
    maybeRunFunction(api, matcher, functionToRun, shouldOnlyRunWhenVisible);
  }) as MatcherFunction;

  // Save the event callback separately so we avoid adding duplicate event listeners
  // when an element is removed and added back to the dom
  const runIfMatchCallback = (event: CustomEvent<WistiaContainerHTMLElement>) => {
    const { api } = event.detail;
    maybeRunFunction(api, matcher, functionToRun, shouldOnlyRunWhenVisible);
  };

  // --- For NEW embeds ---

  // Add this function to the list of functions which run and are bound to the
  // initembed and afterreplace events whenever NEW embeds are added to the dom
  onFindApiFunctionsList.push(runIfMatch);
  onFindApiEventCallbacksList.push(runIfMatchCallback);

  // Initialize the single mutation observer which watches for new embeds
  if (WistiaPlayerElementAddedObserver === null) {
    createNewEmbedMutationObserver();
  }

  // --- For EXISTING embeds ---

  // Run the function and add listeners for initembed and afterreplace events
  const runOnExistingEmbeds = () => {
    const cleanupCallbacks = setupOnFindForExistingEmbeds(runIfMatch, runIfMatchCallback);

    return () => cleanupCallbacks.map((cleanupCallback) => cleanupCallback());
  };

  const POLL_INTERVAL = 300;
  const POLL_TIMEOUT = 10000;

  // Try to run it once immediately, then poll until the document is ready and try again
  runOnExistingEmbeds();
  poll(isDocReady, runOnExistingEmbeds, POLL_INTERVAL, POLL_TIMEOUT);
};

/**
 * onFindApiHandle can run its function multiple times for the same api handle, based on its
 * initialization/replacement events. This function will instead run that function only once.
 * @param {HTMLElement | number | string} matcher - The matcher
 * @param {Function} functionToRun - The function to run
 * @param {boolean} shouldOnlyRunWhenVisible - If true, only run the function when the embed is visible
 * @returns {void}
 */
export const onFindApiHandleRunOnce = ({
  matcher,
  functionToRun,
  shouldOnlyRunWhenVisible = false,
}: OnFindApiHandleOptions): void => {
  const finishedApiHandles = new Set<ApiHandle>();

  onFindApiHandle({
    matcher,
    shouldOnlyRunWhenVisible,
    functionToRun: (api) => {
      if (!finishedApiHandles.has(api)) {
        finishedApiHandles.add(api);
        functionToRun(api);
      }
    },
  });
};
