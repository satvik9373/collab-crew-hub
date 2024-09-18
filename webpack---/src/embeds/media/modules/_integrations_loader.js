import {
    pageLoaded
} from '../../../utilities/elem.js';
import {
    dynamicImport
} from '../../../utilities/dynamicImport.ts';
import {
    onFindApiHandleRunOnce,
    ALL_API_HANDLES_KEY
} from '../../../utilities/onFindApiHandle.ts';

const hasAnyIntegrations = (video) => {
    if (video._mediaData && video._mediaData.integrations) {
        for (let k in video._mediaData.integrations) {
            if (video._mediaData.integrations[k]) {
                return true;
            }
        }
    }
    return false;
};

onFindApiHandleRunOnce({
    matcher: ALL_API_HANDLES_KEY,
    functionToRun: (video) => {
        video.hasData(() => {
            if (hasAnyIntegrations(video)) {
                pageLoaded(() => {
                    setTimeout(() => {
                        dynamicImport('assets/external/allIntegrations.js').then((mod) => {
                            mod.runIntegrationsSetup();
                        });
                    }, 1000);
                });
            }
        });
    },
});