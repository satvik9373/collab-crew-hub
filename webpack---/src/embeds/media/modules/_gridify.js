/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS205: Consider reworking code to avoid use of IIFEs
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */

import {
    addInlineCss,
    elemAppend,
    elemFromObject,
    elemHeight,
    elemRemove,
    elemStyle,
    elemWidth,
} from 'utilities/elem.js';
import {
    countMetric
} from 'utilities/simpleMetrics.js';
import {
    seqId
} from 'utilities/seqid.js';
import {
    pluginScriptsToLoad,
    getPluginsNotInList
} from 'utilities/pluginScriptsToLoad.js';
import {
    generateHtml
} from 'utilities/generate.js';

(function(Wistia) {
    if (Wistia.gridify) {
        return;
    }

    Wistia.gridifyCss = function(gridId) {
        const containerId = gridId.replace(/_grid$/, '');
        return `\
#${gridId}_wrapper{-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box;font-family:Arial,sans-serif;font-size:14px;height:100%;position:relative;text-align:left;width:100%;}
#${gridId}_wrapper *{-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box;}
#${gridId}_above{position:relative;}
#${gridId}_main{display:block;height:100%;position:relative;}
#${gridId}_behind{height:100%;left:0;position:absolute;top:0;width:100%;}
#${gridId}_center{height:100%;overflow:hidden;position:relative;width:100%;}
#${gridId}_front{display:none;height:100%;left:0;position:absolute;top:0;width:100%;}
#${gridId}_top_inside{position:absolute;left:0;top:0;width:100%;}
#${gridId}_top{width:100%;position:absolute;bottom:0;left:0;}
#${gridId}_bottom_inside{position:absolute;left:0;bottom:0;width:100%;}
#${gridId}_bottom{width:100%;position:absolute;top:0;left:0;}
#${gridId}_left_inside{height:100%;position:absolute;left:0;top:0;}
#${gridId}_left{height:100%;position:absolute;right:0;top:0;}
#${gridId}_right_inside{height:100%;right:0;position:absolute;top:0;}
#${gridId}_right{height:100%;left:0;position:absolute;top:0;}
#${gridId}_below{position:relative;}\
`;
    };

    Wistia.gridifyHtml = (gridId) => ({
        id: `${gridId}_wrapper`,

        childNodes: [{
                id: `${gridId}_above`
            },
            {
                id: `${gridId}_main`,
                childNodes: [{
                        id: `${gridId}_behind`
                    },
                    {
                        id: `${gridId}_center`
                    },
                    {
                        id: `${gridId}_front`
                    },
                    {
                        id: `${gridId}_top_inside`,
                        childNodes: {
                            id: `${gridId}_top`
                        },
                    },
                    {
                        id: `${gridId}_bottom_inside`,
                        childNodes: {
                            id: `${gridId}_bottom`
                        },
                    },
                    {
                        id: `${gridId}_left_inside`,
                        childNodes: {
                            id: `${gridId}_left`
                        },
                    },
                    {
                        id: `${gridId}_right_inside`,
                        childNodes: {
                            id: `${gridId}_right`
                        },
                    },
                ],
            },
            {
                id: `${gridId}_below`
            },
        ],
    });

    Wistia.createGrid = function(video, options) {
        const grid = Wistia.createGridSkeleton();
        Wistia.initGridEventListeners(grid);
        for (let node in grid) {
            if (grid[node].nodeName !== 'STYLE' && video._opts._inLegacyPlaylist !== true) {
                addTrackingForGrid(grid[node], video);
            }
        }
        return grid;
    };

    // We want to learn how often the grid is maniupulated by 3rd party plugins.
    // To do this, we're intercepting and monitoring calls to `append` and `appendChild`
    // on the grid elems.
    // playlist-v1 is ignored entirely, and we add a `wistiaGridCaller` to other internal
    // calls to the grid to stop us from tracking our own usage
    const addTrackingForGrid = (node, video) => {
        node.originalAppendChild = node.appendChild;
        node.originalAppend = node.append;
        node.originalPrepend = node.prepend;

        node.appendChild = (val, opts) => {
            if (opts == null) {
                opts = {};
            }
            if (opts.wistiaGridCaller !== true && Wistia._hasTrackedGrid !== true) {
                Wistia._hasTrackedGrid = true;
                trackGridAppend(video);
            }
            return node.originalAppendChild(val);
        };

        node.append = (val, opts) => {
            if (opts == null) {
                opts = {};
            }
            if (opts.wistiaGridCaller !== true && Wistia._hasTrackedGrid !== true) {
                Wistia._hasTrackedGrid = true;
                trackGridAppend(video);
            }
            return node.originalAppend(val);
        };

        return (node.prepend = (val, opts) => {
            if (opts == null) {
                opts = {};
            }
            if (opts.wistiaGridCaller !== true && Wistia._hasTrackedGrid !== true) {
                Wistia._hasTrackedGrid = true;
                trackGridAppend(video);
            }
            return node.originalPrepend(val);
        });
    };

    const trackGridAppend = function(video) {
        const pluginScripts = pluginScriptsToLoad(video._mediaData, video._opts);

        return countMetric('custom-plugin-grid-append', 1, {
            hashedId: video._mediaData.hashedId,
            href: window.location.href,
            plugins: getPluginsNotInList(pluginScripts),
        });
    };

    Wistia.createGridSkeleton = function() {
        const gridId = seqId('wistia_grid_');
        const gridRoot = elemFromObject(Wistia.gridifyHtml(gridId));
        const gridCss = addInlineCss(gridRoot, Wistia.gridifyCss(gridId));

        // Return an object with easy access to different grid sections,
        // e.g. grid.above, grid.center, grid.right.
        const result = {};
        result.css = gridCss;
        result.root = gridRoot;

        // Actually add grid to the DOM so we can get handles to each section
        // using document.getElementById.
        elemStyle(gridRoot, {
            display: 'none'
        });
        elemAppend(document.body, gridRoot);

        // Setup the DOM handles.
        const sectors = [
            'wrapper',
            'main',
            'above',
            'below',
            'top',
            'right',
            'bottom',
            'left',
            'top_inside',
            'right_inside',
            'bottom_inside',
            'left_inside',
            'front',
            'center',
            'behind',
        ];
        for (let sector of Array.from(sectors)) {
            result[sector] = document.getElementById(`${gridId}_${sector}`);
        }

        // Detach the grid from the DOM. Up to the caller to use it or not.
        elemRemove(gridRoot);
        elemStyle(gridRoot, {
            display: 'block'
        });

        return result;
    };

    Wistia.initGridEventListeners = (grid) =>
        grid.center.addEventListener(
            'scroll',
            () =>
            // You'd think the grid center can't scroll, because it has
            // overflow: hidden... but you would be mistaken! It can be scrolled when
            // a descendant element that's overflowing it gets focus, which can happen
            // for things like opening the context menu (momentarily overflows before
            // we determine that it's overflowing and render it in a different
            // direction), and on tabbing to the control bar buttons when they're
            // hidden (and translated down such that they overflow the bottom of the
            // player) due to the player's narrowness, i.e. when we show the ellipsis
            // control. Such scrolling is undesired, so we unscroll it here.
            (grid.center.scrollTop = 0),
        );

    Wistia.gridify = function(options, container) {
        const result = {};
        const gridId = `${container.id}_grid`;

        container.innerHTML = generateHtml(Wistia.gridifyHtml(gridId));
        for (let sector of [
                'wrapper',
                'main',
                'above',
                'below',
                'top',
                'right',
                'bottom',
                'left',
                'top_inside',
                'right_inside',
                'bottom_inside',
                'left_inside',
                'front',
                'center',
                'behind',
            ]) {
            result[sector] = document.getElementById(`${gridId}_${sector}`);
        }
        addInlineCss(result.wrapper, Wistia.gridifyCss(gridId));

        result.wrapper.style.height = `100%`;
        result.main.style.width = `100%`;
        return result;
    };

    Wistia.isGridElem = function(grid, elem) {
        for (let sectionName in grid) {
            let sectionElem = grid[sectionName];
            if (elem === sectionElem) {
                return true;
            }
        }
        return false;
    };

    Wistia.grid = {};
    Wistia.grid.allNodesHidden = function(nodes) {
        if (nodes.length === 0) {
            return true;
        }
        for (let node of Array.from(nodes)) {
            if (node.style && node.style.display !== 'none') {
                return false;
            }
        }
        return true;
    };

    Wistia.grid.zeroEmptySections = (video) =>
        (() => {
            const result = [];
            for (let section of ['top', 'bottom', 'left', 'right', 'above', 'below']) {
                let elem = video.grid[section];
                if (!elem.childNodes.length) {
                    elem.appendChild(document.createTextNode(' '), {
                        wistiaGridCaller: true
                    });
                    elem.style.height = '0px';
                    elem.style.fontSize = '0px';
                    elem.style.lineHeight = '0px';
                    result.push((elem.isEmpty = true));
                } else if (Wistia.grid.allNodesHidden(elem.childNodes)) {
                    elem.style.height = '0px';
                    elem.style.fontSize = '0px';
                    elem.style.lineHeight = '0px';
                    result.push((elem.isEmpty = true));
                } else {
                    elem.style.height = '';
                    elem.style.fontSize = '';
                    result.push((elem.style.lineHeight = ''));
                }
            }
            return result;
        })();

    Wistia.grid.wrapperHeight = function(video) {
        const {
            wrapper
        } = video.grid;

        // resize the video so top/bottom grid elems fit too
        const wrapperHeight = elemHeight(wrapper);

        return wrapperHeight;
    };

    Wistia.grid.wrapperWidth = function(video) {
        const {
            wrapper
        } = video.grid;

        // resize the video so top/bottom grid elems fit too
        const wrapperWidth = elemWidth(wrapper);

        return wrapperWidth;
    };
})(window.Wistia);