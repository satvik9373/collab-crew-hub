import {
    onFindApiHandle,
    ALL_API_HANDLES_KEY
} from '../../../utilities/onFindApiHandle.ts';
import {
    dynamicImport
} from '../../../utilities/dynamicImport.ts';
import {
    didWinCoinFlip
} from '../../../utilities/coinFlip.ts';
import {
    MUX_PERCENTAGE_TO_ENABLE,
    shouldEnableMux
} from '../../../utilities/shouldEnableMux.ts';

(function(Wistia) {
    const W = Wistia;

    if (!Wistia.mux) {
        Wistia.mux = {};
    }

    Wistia._initializers.initMux = () => {
        if (Wistia.mux._setup) {
            return;
        }

        // to save on COGS, we don't want to initialize Mux
        // on every load. Do a coin flip to see if we should init
        const percentageToInitialize = MUX_PERCENTAGE_TO_ENABLE;
        const shouldRandomEnableMux = didWinCoinFlip(percentageToInitialize);

        if (!shouldRandomEnableMux) {
            Wistia.mux._disabled = true;
        } else {
            Wistia.mux._setup = true;
            Wistia.mux._disabled = false;
        }

        onFindApiHandle({
            matcher: ALL_API_HANDLES_KEY,
            functionToRun: (video) => {
                // If this embed has been translated into a web component, the web component
                // will handle the mux initialization.
                const isTranslatedEmbed = video.container ? .tagName === 'WISTIA-PLAYER';
                const shouldEnableMuxForVideo = () =>
                    isTranslatedEmbed ? false : shouldEnableMux(video, !Wistia.mux._disabled);

                if (shouldEnableMuxForVideo()) {
                    dynamicImport('assets/external/wistia-mux.js').then((mod) => {
                        video.embedded(() => {
                            if (shouldEnableMuxForVideo()) {
                                mod.init(video, {
                                    embedType: 'legacy'
                                });
                            }
                        });
                    });
                }
            },
        });
    };

    Wistia._destructors.destroyMux = () => {
        Wistia.mux._disabled = true;
        const all = Wistia.api.all();
        for (let v = 0; v < all.length; v++) {
            all[v].mux ? .destroy();
        }
    };
})(window.Wistia);