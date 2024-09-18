import {
    PlayerBehavior
} from './PlayerBehavior.js';

export class PlaySuspendedOffScreenBehavior extends PlayerBehavior {
    init() {
        const impl = this.impl;
        const publicApi = impl.publicApi;

        this.unbinds.push(
            publicApi.on('enterviewport', () => {
                if (impl.inFullscreen()) {
                    return;
                }
                if (this._isSuspended) {
                    this._isSuspended = false;
                    if (publicApi._playSuspendedOffScreenEnabled() && impl.state() === 'paused') {
                        impl.play();
                    }
                }
            }),

            publicApi.on('leaveviewport', () => {
                if (impl.inFullscreen()) {
                    return;
                }
                if (!this._isSuspended) {
                    if (publicApi._playSuspendedOffScreenEnabled() && impl.state() === 'playing') {
                        impl.pause();
                        this._isSuspended = true;
                    }
                }
            }),

            impl.on('receivepause', () => {
                if (this._isSuspended) {
                    this._isSuspended = false;
                }
            }),
        );
    }
}

PlaySuspendedOffScreenBehavior.handle = 'playSuspendedOffScreen';