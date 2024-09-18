export class Client {#
    host;

    constructor(host) {
        this.#host = host;
    }

    liveStream = (data) => {
        return this.#post('/live-stream/1.0.0', data);
    };

    #
    post(path, data) {
        const url = new URL(path, this.#host);

        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            mode: 'cors',
            credentials: 'omit',
            body: JSON.stringify(data),
            keepalive: true,
        });
    }
}