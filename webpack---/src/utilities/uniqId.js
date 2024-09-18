export const uniqId = (prefix = '', suffix = '') => {
    let d = new Date().getTime();

    if (window.performance && typeof window.performance.now == 'function') {
        d += window.performance.now(); // use high-precision timer if available
    }

    const randStr = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx-xxxxxxxxx-xxxxxxxxxxxx-xxxx'.replace(
        /[xy]/g,
        (c) => {
            const r = (d + Math.random() * 16) % 16 | 0;

            d = Math.floor(d / 16);
            const v = c === 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        },
    );

    return prefix + randStr + suffix;
};