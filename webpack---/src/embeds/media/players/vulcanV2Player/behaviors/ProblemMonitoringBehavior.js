import {
    PlayerBehavior
} from './PlayerBehavior.js';

export class ProblemMonitoringBehavior extends PlayerBehavior {
    init() {
        this.unbinds = [
            this.impl.on('waiting', (secondsWaiting) => {
                if (secondsWaiting >= 5) {
                    this.impl.trigger('problem', {
                        type: 'long-buffer',
                        data: {
                            secondsWaiting
                        },
                    });
                }
            }),

            this.impl.on('error', (_error) => {
                const videoEl = this.impl.getMediaElement();
                const videoError = videoEl.error;
                this.impl.trigger('problem', {
                    type: 'video-error',
                    errorCode: (videoError && videoError.code) || videoError,
                    errorMessage: videoError && videoError.message,
                });
            }),
        ];
    }
}

ProblemMonitoringBehavior.handle = 'problemMonitoring';