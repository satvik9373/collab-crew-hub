const throwAsync = (e) => {
    setTimeout(() => {
        throw e;
    }, 0);
};

const logPromiseErrors = (promise) => {
    return promise.catch(throwAsync);
};

export {
    throwAsync,
    logPromiseErrors
};