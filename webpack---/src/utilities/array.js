const indexOf = (arr, val) => {
    for (
        let i = 0, end = arr.length, asc = end >= 0; asc ? i <= end : i >= end; asc ? (i += 1) : (i -= 1)
    ) {
        if (typeof val === 'function') {
            if (val(arr[i])) {
                return i;
            }
        } else if (arr[i] === val) {
            if (arr[i] === val) {
                return i;
            }
        }
    }
    return -1;
};

export const insertIntoArray = function(arr, value, position) {
    let index;
    if (position == null) {
        position = {};
    }
    if (position.after) {
        index = indexOf(arr, position.detect || position.after);
        if (index >= 0) {
            return arr.splice(index + 1, 0, value);
        }
        return typeof console !== 'undefined' && console !== null ? // eslint-disable-next-line no-console
            console.log(`${position.after} not found when trying to add ${value} to array`) :
            undefined;
    }
    if (position.before) {
        index = indexOf(arr, position.detect || position.before);
        if (index >= 0) {
            return arr.splice(index, 0, value);
        }
        return typeof console !== 'undefined' && console !== null ? // eslint-disable-next-line no-console
            console.log(`${position.before} not found when trying to add ${value} to array`) :
            undefined;
    }
    if (position.index != null) {
        return arr.splice(position.index, 0, value);
    }
    return arr.push(value);
};

export const toArray = function(thing, splitOn) {
    if (splitOn == null) {
        splitOn = /\s+/;
    }
    if (thing instanceof Array) {
        return thing;
    }
    if (typeof thing === 'string') {
        return thing.split(splitOn);
    }
    throw new Error(`Don't know how to convert ${thing} into an array.`);
};