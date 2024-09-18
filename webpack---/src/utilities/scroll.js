export const scrollLeft = (l) => {
    if (l) {
        if (document.body) {
            document.body.scrollLeft = l;
        }
        if (document.documentElement) {
            document.documentElement.scrollLeft = l;
        }
    } else {
        return document ? .documentElement ? .scrollLeft || document ? .body ? .scrollLeft || 0;
    }
};

export const scrollTop = (t) => {
    if (t) {
        if (document.body) {
            document.body.scrollTop = t;
        }

        if (document.documentElement) {
            document.documentElement.scrollTop = t;
        }
    } else {
        return document ? .documentElement ? .scrollTop || document ? .body ? .scrollTop || 0;
    }
};