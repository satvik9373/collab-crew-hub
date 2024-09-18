// This is called very very frequently; creating and removing an element to
// test constantly is not ideal. So this method exists as an abstraction to
// cache the result.
let _isBoxModel;
export const isBoxModel = () => {
    if (_isBoxModel != null) {
        return _isBoxModel;
    }

    const box = document.createElement('div');
    box.style.paddingLeft = box.style.width = '1px';
    document.body.appendChild(box);
    _isBoxModel = box.offsetWidth === 2;
    document.body.removeChild(box);
    return _isBoxModel;
};

export const elemOffset = (elem) => {
    const body = document.body;
    const win = document.defaultView;
    const docElem = document.documentElement;

    const box = elem.getBoundingClientRect();
    const clientTop = docElem.clientTop || body.clientTop || 0;
    const clientLeft = docElem.clientLeft || body.clientLeft || 0;

    let scrollTop;
    if (win && win.pageYOffset != null) {
        scrollTop = win.pageYOffset;
    } else if (isBoxModel() && docElem && docElem.scrollTop != null) {
        scrollTop = docElem.scrollTop;
    } else {
        scrollTop = body.scrollTop;
    }

    let scrollLeft;
    if (win && win.pageXOffset != null) {
        scrollLeft = win.pageXOffset;
    } else if (isBoxModel() && docElem && docElem.scrollLeft != null) {
        scrollLeft = docElem.scrollLeft;
    } else {
        scrollLeft = body.scrollLeft;
    }

    const zoom = elemZoom(elem);

    return {
        height: box.height * zoom,
        top: box.top * zoom + scrollTop - clientTop,
        left: box.left * zoom + scrollLeft - clientLeft,
        width: box.width * zoom,
        zoom,
    };
};

export const elemZoom = (elem) =>
    elem && elem !== document.documentElement ?
    elemZoom(elem.parentElement) * (getComputedStyle(elem).zoom || 1) :
    1;