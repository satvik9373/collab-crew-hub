var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

(function(W) {
  var Color, addInlineCss, asyncChain, clearTimeouts, controlMultiplierEstimatedByWidth, doTimeout, eV1HostWithPort, eV1Protocol, elemAddClass, elemAnimate, elemAppend, elemBind, elemContainsOffset, elemFromObject, elemHeight, elemInDom, elemIsInside, elemPrepend, elemRebind, elemRemove, elemRemoveClass, elemStyle, elemUnbind, elemUnbindAllInside, elemWidth, flexibleDuration, notSetOrTrue, ref, ref1, ref2, ref3, sanePlayerColor, scrollLeft, scrollTop, seqId;
  if (Wistia.Popover) {
    return;
  }
  require('../embeds/media/modules/_big_play_button.js');
  require('../embeds/media/modules/_thumbnail.js');
  Color = require('utilities/color.js').Color;
  ref = require('utilities/hosts.js'), eV1HostWithPort = ref.eV1HostWithPort, eV1Protocol = ref.eV1Protocol;
  ref1 = require('utilities/scroll.js'), scrollTop = ref1.scrollTop, scrollLeft = ref1.scrollLeft;
  flexibleDuration = require('utilities/duration.ts').flexibleDuration;
  asyncChain = require('utilities/asyncChain.js').asyncChain;
  notSetOrTrue = require('utilities/core.js').notSetOrTrue;
  ref2 = require('utilities/timeout-utils.js'), doTimeout = ref2.doTimeout, clearTimeouts = ref2.clearTimeouts;
  controlMultiplierEstimatedByWidth = require('utilities/fit-control.js').controlMultiplierEstimatedByWidth;
  seqId = require('utilities/seqid.js').seqId;
  ref3 = require('utilities/elem.js'), addInlineCss = ref3.addInlineCss, elemAddClass = ref3.elemAddClass, elemAnimate = ref3.elemAnimate, elemAppend = ref3.elemAppend, elemBind = ref3.elemBind, elemContainsOffset = ref3.elemContainsOffset, elemFromObject = ref3.elemFromObject, elemHeight = ref3.elemHeight, elemInDom = ref3.elemInDom, elemIsInside = ref3.elemIsInside, elemPrepend = ref3.elemPrepend, elemRebind = ref3.elemRebind, elemRemove = ref3.elemRemove, elemRemoveClass = ref3.elemRemoveClass, elemStyle = ref3.elemStyle, elemUnbind = ref3.elemUnbind, elemUnbindAllInside = ref3.elemUnbindAllInside, elemWidth = ref3.elemWidth;
  sanePlayerColor = require('utilities/sane-player-color.js').sanePlayerColor;
  Wistia.Popover = (function() {
    function Popover(video) {
      var opts;
      this.video = video;
      this.fitVideo = bind(this.fitVideo, this);
      this.show = bind(this.show, this);
      this.showAndPlay = bind(this.showAndPlay, this);
      this.showHandler = bind(this.showHandler, this);
      this.showAndMaybePlay = bind(this.showAndMaybePlay, this);
      this.hide = bind(this.hide, this);
      this.fitCloseButton = bind(this.fitCloseButton, this);
      this.fitOverlay = bind(this.fitOverlay, this);
      this.fit = bind(this.fit, this);
      this.fitEmbedContainer = bind(this.fitEmbedContainer, this);
      this.fitNatural = bind(this.fitNatural, this);
      this._closeButtonBlurStyle = bind(this._closeButtonBlurStyle, this);
      this._closeButtonFocusStyle = bind(this._closeButtonFocusStyle, this);
      this._onLeaveVideoOrCloseButton = bind(this._onLeaveVideoOrCloseButton, this);
      this._onEnterVideoOrCloseButton = bind(this._onEnterVideoOrCloseButton, this);
      this.setupBindings = bind(this.setupBindings, this);
      this.unexpandPlayButtonOnMouseOut = bind(this.unexpandPlayButtonOnMouseOut, this);
      this.unexpandPlayButtonImmediately = bind(this.unexpandPlayButtonImmediately, this);
      this.unexpandPlayButton = bind(this.unexpandPlayButton, this);
      this.expandPlayButton = bind(this.expandPlayButton, this);
      this.setupThumbnailAfterMediaData = bind(this.setupThumbnailAfterMediaData, this);
      this.inlineHtmlHandler = bind(this.inlineHtmlHandler, this);
      if (this.video.isRemoved()) {
        this.video.notice('abort popover initialization, video already removed');
        return;
      }
      this.info('init');
      this.uuid = seqId();
      this._embedContainer = this.video._embedContainer;
      this._popoverContainer = this.video._popoverContainer;
      elemAddClass(this._embedContainer, 'wistia_popover_embed');
      this._scaleFactor = this.containerScaleFactor() || 1;
      this._thumbContainer = elemFromObject({
        id: (seqId()) + ".thumb_container",
        "class": 'wistia_click_to_play',
        style: {
          position: 'relative'
        }
      });
      if (this.video.container.style.display === 'inline') {
        elemStyle(this._thumbContainer, {
          display: 'inline'
        });
      }
      elemAppend(this.video.container, this._thumbContainer);
      opts = this.video._gatherOptions();
      this.info('opts', opts);
      if (opts.popoverContent === 'thumbnail' || (opts.popoverContent == null)) {
        this._hasThumbnail = true;
        this.video.hasData(this.setupThumbnailAfterMediaData);
      } else {
        this.info('init with bare html', this.video._startingHtml);
        this._thumbContainer.innerHTML = this.video._startingHtml;
        elemBind(this._thumbContainer, 'keydown', this.inlineHtmlHandler);
        elemBind(this._thumbContainer, 'click', this.inlineHtmlHandler);
      }
      this.resizeToContainer();
      this.createCloseButton();
      this.hide(true);
      this.setupBindings();
      this.video.embedded((function(_this) {
        return function() {
          _this._popoverContainer.setAttribute('aria-label', _this.video.name());
          if (_this.video._attrs.popoverShowOnLoad) {
            if (_this.video._attrs.autoplay === false) {
              _this.show();
            } else {
              _this.showAndPlay();
            }
            _this.video.focus();
            return _this._closeButtonSetVisibleStyle();
          }
        };
      })(this));
    }

    Popover.prototype.inlineHtmlHandler = function(event) {
      var isKeyboardButtonClick, isKeyboardEvent, isKeyboardLinkClick, isMouseEvent, keyCode, target;
      isKeyboardEvent = event instanceof KeyboardEvent;
      isMouseEvent = event instanceof MouseEvent;
      target = event != null ? event.target.tagName.toLowerCase() : void 0;
      keyCode = event != null ? event.keyCode : void 0;
      isKeyboardButtonClick = target === 'button' && (keyCode === 13 || keyCode === 32);
      isKeyboardLinkClick = target === 'a' && keyCode === 13;
      if (isKeyboardEvent && (isKeyboardButtonClick || isKeyboardLinkClick)) {
        event.preventDefault();
        return this.showHandler(event);
      } else if (isMouseEvent) {
        event.preventDefault();
        return this.showHandler(event);
      }
    };

    Popover.prototype.isMobile = function() {
      return Wistia.detect.ipad || Wistia.detect.iphone || Wistia.detect.android;
    };

    Popover.prototype.setupThumbnailAfterMediaData = function() {
      this.info('setupThumbnailAfterMediaData');
      return asyncChain(this.video.uuid + ".popover.setup_thumbnail", [
        ((function(_this) {
          return function() {
            _this.initThumbnail();
            return elemStyle(_this.thumbnail.elem, {
              cursor: 'pointer'
            });
          };
        })(this)), ((function(_this) {
          return function() {
            return _this.resizeToContainer();
          };
        })(this)), ((function(_this) {
          return function() {
            return _this.monitor();
          };
        })(this))
      ]);
    };

    Popover.prototype.initThumbnail = function() {
      var options, opts, ref4;
      opts = {
        tabbable: true,
        fitStrategy: 'cropfill',
        onActivate: this.showHandler,
        images: this.video._impl.thumbnailAssets(),
        borderRadius: (this.video._attrs.playerBorderRadius * this._scaleFactor) || 0,
        bigPlayButton: (notSetOrTrue(this.video._attrs.bigPlayButton) ? (options = {
          color: this.video.playerColor(),
          tabbable: false,
          borderRadius: (this.video._attrs.bigPlayButtonBorderRadius * this._scaleFactor) || 0,
          newRoundedIcons: this.video._opts.newRoundedIcons
        }, this.shouldAnimate() ? (notSetOrTrue(this.video._opts.popoverHoverDuration) ? options.bottomText = this.shortHumanDuration(this.video.duration()) : void 0, this.video._opts.popoverHoverName ? options.topText = this.video.name() : void 0) : void 0, options) : false),
        onMouseover: this.shouldAnimate() ? this.expandPlayButton : null,
        onMouseout: this.shouldAnimate() ? this.unexpandPlayButtonOnMouseOut : null
      };
      if (this.video._opts.thumbnailAltText != null) {
        opts.altText = this.video._opts.thumbnailAltText;
      }
      this.thumbnail = new Wistia.Thumbnail(this._thumbContainer, opts);
      if ((ref4 = this.thumbnail.bigPlayButton) != null) {
        if (typeof ref4.removeBottomText === "function") {
          ref4.removeBottomText();
        }
      }
      return this.thumbnail;
    };

    Popover.prototype.shortHumanDuration = function(seconds) {
      return flexibleDuration(seconds);
    };

    Popover.prototype.shouldAnimate = function() {
      return this.video._attrs.popoverAnimateThumbnail === true;
    };

    Popover.prototype.expandPlayButton = function() {
      var ref4, ref5;
      return (ref4 = this.thumbnail) != null ? (ref5 = ref4.bigPlayButton) != null ? ref5.cover() : void 0 : void 0;
    };

    Popover.prototype.unexpandPlayButton = function() {
      var ref4, ref5;
      return (ref4 = this.thumbnail) != null ? (ref5 = ref4.bigPlayButton) != null ? ref5.uncover() : void 0 : void 0;
    };

    Popover.prototype.unexpandPlayButtonImmediately = function() {
      var ref4, ref5;
      return (ref4 = this.thumbnail) != null ? (ref5 = ref4.bigPlayButton) != null ? ref5.uncoverImmediately() : void 0 : void 0;
    };

    Popover.prototype.unexpandPlayButtonOnMouseOut = function(event) {
      var insideThumbnail;
      insideThumbnail = elemContainsOffset(this.thumbnail.elem, event.pageX, event.pageY);
      if (!insideThumbnail) {
        return this.unexpandPlayButton();
      }
    };

    Popover.prototype.fixedSizeTooBigForWindow = function() {
      return this.video._popoverSize().width + 160 > elemWidth(window) || this.video._popoverSize().height + 160 > elemHeight(window);
    };

    Popover.prototype.isResponsive = function() {
      return !this.isFixedSize();
    };

    Popover.prototype.isFixedSize = function() {
      return !!this.video._opts.popoverSize;
    };

    Popover.prototype.monitor = function() {
      this.info('monitor container size');
      this._lastWidth = this.containerWidth();
      this._lastHeight = this.containerHeight();
      return Wistia.eventLoop.add(this.video.uuid + "_popover.watch_popover_thumb_elem", 300, (function(_this) {
        return function() {
          if (_this._lastWidth !== _this.containerWidth() || _this._lastHeight !== _this.containerHeight()) {
            _this.preventAnimation();
            _this.resizeToContainer();
            _this.allowAnimation();
            _this._lastWidth = _this.containerWidth();
            _this._lastHeight = _this.containerHeight();
          }
          if (_this._thumbContainer && !elemInDom(_this._thumbContainer)) {
            return elemAppend(_this.video.container, _this._thumbContainer);
          }
        };
      })(this));
    };

    Popover.prototype.resizeToContainer = function() {
      var bigPlayButtonBorderRadius, ref4, ref5, ref6, ref7, thumbContainerHeight, thumbnailBorderRadius;
      thumbContainerHeight = this.containerHeight();
      if (this.video.container.tagName === 'WISTIA-PLAYER' && this._hasThumbnail && this.video.container.style.width === '' && this.video.container.style.height === '') {
        thumbContainerHeight = this.video.heightForWidth(this.containerWidth());
        elemStyle(this.video.container, {
          height: thumbContainerHeight + "px"
        });
      }
      elemStyle(this._thumbContainer, {
        height: thumbContainerHeight + "px",
        width: (this.containerWidth()) + "px"
      });
      if ((ref4 = this.thumbnail) != null) {
        ref4.fit();
      }
      this._scaleFactor = this.containerScaleFactor() || 1;
      thumbnailBorderRadius = (this.video._attrs.playerBorderRadius * this._scaleFactor) || 0;
      if ((ref5 = this.thumbnail) != null) {
        ref5.setBorderRadius(thumbnailBorderRadius);
      }
      bigPlayButtonBorderRadius = (this.video._attrs.bigPlayButtonBorderRadius * this._scaleFactor) || 0;
      return (ref6 = this.thumbnail) != null ? (ref7 = ref6.bigPlayButton) != null ? ref7.setBorderRadius(bigPlayButtonBorderRadius) : void 0 : void 0;
    };

    Popover.prototype.containerWidth = function() {
      return elemWidth(this.video.container);
    };

    Popover.prototype.containerHeight = function() {
      return elemHeight(this.video.container);
    };

    Popover.prototype.containerScaleFactor = function() {
      return Math.min(1.3, Math.max(0.6, controlMultiplierEstimatedByWidth(this.containerWidth()))) || 1;
    };

    Popover.prototype.setupBindings = function() {
      if (!this.video.videoFoam()) {
        elemRebind(window, 'resize', this.fit);
      }
      this.video.rebind('cancel-fullscreen', this.fitNatural);
      this.video.rebind('widthchange', this.fitEmbedContainer);
      this.video.rebind('widthchange', this.fit);
      this.video.rebind('heightchange', this.fit);
      if (this._showIfHidden == null) {
        this._showIfHidden = (function(_this) {
          return function() {
            if (!_this._visible) {
              return _this.show();
            }
          };
        })(this);
      }
      this.video.rebind('play', this._showIfHidden);
      this.video.rebind('afterreplace', this.setupBindings);
      elemRebind(this._embedContainer, 'mouseover', this._onEnterVideoOrCloseButton);
      elemRebind(this._embedContainer, 'mouseout', this._onLeaveVideoOrCloseButton);
      elemRebind(this._closeButton, 'mouseover', this._onEnterVideoOrCloseButton);
      elemRebind(this._closeButton, 'mouseout', this._onLeaveVideoOrCloseButton);
      elemRebind(this._closeButton, 'focus', this._closeButtonFocusStyle);
      return elemRebind(this._closeButton, 'blur', this._closeButtonBlurStyle);
    };

    Popover.prototype._onEnterVideoOrCloseButton = function(event) {
      var toElem;
      if (!this._visible) {
        return;
      }
      toElem = event.target || event.srcElement;
      if (toElem && (elemIsInside(toElem, this._embedContainer) || elemIsInside(toElem, this._closeButton))) {
        return this._closeButtonSetVisibleStyle();
      }
    };

    Popover.prototype._onLeaveVideoOrCloseButton = function(event) {
      var toElem;
      toElem = event.relatedTarget || event.toElement;
      if (toElem && elemIsInside(toElem, this._overlay)) {
        return elemStyle(this._closeButton, {
          opacity: 0
        });
      }
    };

    Popover.prototype._closeButtonFocusStyle = function(event) {
      return elemStyle(this._closeButton, {
        outline: '2px solid white'
      });
    };

    Popover.prototype._closeButtonBlurStyle = function(event) {
      return elemStyle(this._closeButton, {
        outline: 'none'
      });
    };

    Popover.prototype._closeButtonSetVisibleStyle = function() {
      return elemStyle(this._closeButton, {
        opacity: 0.8
      });
    };

    Popover.prototype.unbindAll = function() {
      elemUnbind(window, 'resize', this.fit);
      if (this._overlay && this._hideOnClick) {
        elemUnbind(this._overlay, 'click', this._hideOnClick);
      }
      if (this._hideOnEscape) {
        elemUnbind(document, 'keyup', this._hideOnEscape);
      }
      this.video.unbind('widthchange', this.fitEmbedContainer);
      this.video.unbind('widthchange', this.fit);
      this.video.unbind('heightchange', this.fit);
      if (this._showIfHidden) {
        this.video.unbind('play', this._showIfHidden);
      }
      elemUnbindAllInside(this._thumbContainer);
      elemUnbind(this._thumbContainer, 'keydown', this.inlineHtmlHandler);
      elemUnbind(this._thumbContainer, 'mousedown', this.inlineHtmlHandler);
      elemUnbind(this._dummyStartFocusTrap, 'focus');
      return elemUnbind(this._dummyEndFocusTrap, 'focus');
    };

    Popover.prototype.remove = function() {
      var ref4;
      if ((ref4 = this.thumbnail) != null) {
        ref4.destroy();
      }
      this.unbindAll();
      Wistia.eventLoop.remove(this.video.uuid + "_popover");
      clearTimeouts(this.video.uuid + "_popover");
      elemRemove(this._thumbContainer);
      elemRemove(this._overlay);
      elemRemove(this._closeButton);
      elemRemove(this._captionElem);
      return this._thumbContainer = this._overlay = this._captionElem = this.thumbnail = null;
    };

    Popover.prototype.letViewportReturnToNaturalSize = function() {
      if (this._overlay) {
        elemStyle(this._overlay, {
          height: '1px',
          width: '1px'
        });
      }
      if (this._closeButton) {
        elemStyle(this._closeButton, {
          left: 0
        });
      }
      if (this._embedContainer) {
        elemStyle(this._embedContainer, {
          bottom: '',
          left: 0,
          right: '',
          top: 0
        });
      }
      return this.video.width(100, {
        constrain: true
      });
    };

    Popover.prototype.fitNatural = function() {
      this.letViewportReturnToNaturalSize();
      this.fit();
      return this.video.monitor();
    };

    Popover.prototype.fitEmbedContainer = function(width) {
      var calcedWidth, shouldUpdateSize;
      shouldUpdateSize = this.isResponsive && this._embedContainer.style.width !== width;
      if (shouldUpdateSize || this.fixedSizeTooBigForWindow()) {
        if (this.video.container.tagName === 'WISTIA-PLAYER') {
          calcedWidth = this.getEmbedContainerWidth();
        } else {
          calcedWidth = width;
        }
        elemStyle(this._embedContainer, {
          height: (this.video.heightForWidth(calcedWidth)) + "px",
          width: calcedWidth + "px"
        });
      }
      shouldUpdateSize = this.isFixedSize && this._embedContainer.style.width !== this.video._popoverSize().width;
      if (shouldUpdateSize && !this.fixedSizeTooBigForWindow()) {
        return elemStyle(this._embedContainer, {
          height: (this.video._popoverSize().height) + "px",
          width: (this.video._popoverSize().width) + "px"
        });
      }
    };

    Popover.prototype.fit = function() {
      if (this._fitCount > 20) {
        return;
      }
      this._fitCount += 1;
      return this.video.embedded((function(_this) {
        return function() {
          if (_this._overlay) {
            elemStyle(_this._overlay, {
              height: '1px',
              width: '1px'
            });
            setTimeout(function() {
              _this._fitCount = 0;
              return _this.fitOverlay();
            }, 1);
          } else {
            _this._fitCount = 0;
          }
          if (_this._closeButton) {
            elemStyle(_this._closeButton, {
              left: 0
            });
            requestAnimationFrame(function() {
              return _this.fitCloseButton();
            });
          }
          return requestAnimationFrame(function() {
            _this.fitVideo();
            return _this.resizeToContainer();
          });
        };
      })(this));
    };

    Popover.prototype.bestOverlayHeight = function() {
      return Math.max(elemHeight(document), elemHeight(window));
    };

    Popover.prototype.bestOverlayWidth = function() {
      return Math.max(elemWidth(document), elemWidth(window));
    };

    Popover.prototype.createCloseButton = function() {
      this._closeButton = elemFromObject({
        id: this._embedContainer.id + "_popover_close_button",
        "class": 'wistia_placebo_close_button',
        alt: 'Close',
        tagName: 'button',
        role: 'button',
        tabindex: -1,
        'aria-label': 'Close',
        style: {
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          height: '34px',
          left: 0,
          opacity: 0,
          position: 'absolute',
          top: 0,
          width: '34px',
          zIndex: 10002,
          overflow: 'hidden',
          margin: 0,
          padding: 0
        },
        childNodes: [
          {
            tagName: 'img',
            alt: 'Click to close video',
            style: {
              height: '34px',
              width: '34px',
              position: 'absolute',
              maxWidth: 'none',
              right: '2px',
              top: '1px'
            }
          }
        ]
      });
      if (this._hideOnClickClose == null) {
        this._hideOnClickClose = (function(_this) {
          return function() {
            return _this.hide();
          };
        })(this);
      }
      elemRebind(this._closeButton, 'click', this._hideOnClickClose);
      return elemAppend(this._popoverContainer, this._closeButton);
    };

    Popover.prototype._closeButtonBase64 = function() {
      return "data:image/gif;base64,R0lGODlhRABEAIABAP///////yH5BAEAAAEALAAAAABEAEQAAAKVjI+py+0Po5y02oszBPxyoGFfR41gWJlnpKJWu5muJzvw/NbLjefjruvRfgiecPg5GI/IzpLZfEKjyelMtbKisFoXltQVfcHhkkxaZtzQ6WIwwG4/42E03Rq/M+/6Xr9/RTTxVkc2aNiWqLjI2Oj4CBkpOUlZaXmJmam5ydnp+QkaKjpKWmp6ipqqusra6voKGyvbUwAAOw==";
    };

    Popover.prototype.createAndAddDummyFocusTraps = function() {
      this._dummyStartFocusTrap = elemFromObject({
        id: this.video.uuid + "_start_focus",
        tabindex: 0
      });
      this._dummyEndFocusTrap = elemFromObject({
        id: this.video.uuid + "_end_focus",
        tabindex: 0
      });
      elemPrepend(this._popoverContainer, this._dummyStartFocusTrap);
      elemAppend(this._popoverContainer, this._dummyEndFocusTrap);
      if (this._unbindFocusOnFocusTrapStart) {
        this._unbindFocusOnFocusTrapStart();
      }
      this._unbindFocusOnFocusTrapStart = elemBind(this._dummyStartFocusTrap, 'focus', (function(_this) {
        return function(e) {
          _this._focusHelper = true;
          return _this._dummyEndFocusTrap.focus();
        };
      })(this));
      if (this._unbindFocusOnFocusTrapEnd) {
        this._unbindFocusOnFocusTrapEnd();
      }
      return this._unbindFocusOnFocusTrapEnd = elemBind(this._dummyEndFocusTrap, 'focus', (function(_this) {
        return function(e) {
          if (_this._focusHelper === true) {
            _this._focusHelper = false;
            if (_this._captionElem) {
              return _this._captionElem.focus();
            } else {
              return _this._closeButton.focus();
            }
          } else {
            return _this.video.focus();
          }
        };
      })(this));
    };

    Popover.prototype.createOverlay = function() {
      this.destroyOverlay();
      this.info('createOverlay');
      this._overlay = elemFromObject({
        id: this._embedContainer.id + "_overlay",
        "class": 'wistia_popover_overlay',
        style: {
          backgroundImage: "url(" + (eV1Protocol()) + "//" + (eV1HostWithPort()) + "/assets/images/blank.gif)",
          height: (this.bestOverlayHeight()) + "px",
          left: 0,
          opacity: 0,
          position: 'absolute',
          top: 0,
          width: (this.bestOverlayWidth()) + "px",
          zIndex: 10000
        }
      });
      elemStyle(this._overlay, {
        backgroundColor: this._overlayColor().toRgba()
      });
      elemAppend(document.body, this._overlay);
      this._blockClick = true;
      if (this._hideOnClick == null) {
        this._hideOnClick = (function(_this) {
          return function() {
            _this.info('hideOnClick', _this._blockClick);
            if (!_this._blockClick) {
              return _this.hide();
            }
          };
        })(this);
      }
      elemRebind(this._overlay, 'click', this._hideOnClick);
      return doTimeout(this.video.uuid + ".popover.allow_click", (function(_this) {
        return function() {
          return _this._blockClick = false;
        };
      })(this), 600);
    };

    Popover.prototype._popoverBorderWidth = function() {
      var borderWidth;
      borderWidth = this.video._attrs.popoverBorderWidth || 0;
      return String(borderWidth).replace(/\D/g, '');
    };

    Popover.prototype._overlayColor = function() {
      var popoverOverlayColorHex, popoverOverlayOpacity;
      popoverOverlayColorHex = sanePlayerColor(this.video._attrs.popoverOverlayColor || '000000');
      popoverOverlayOpacity = (this.video._attrs.popoverOverlayOpacity != null ? this.video._attrs.popoverOverlayOpacity : 0.5);
      return new Color(popoverOverlayColorHex).alpha(popoverOverlayOpacity);
    };

    Popover.prototype._playerColor = function() {
      return new Color(this.video.playerColor()).alpha(0.9);
    };

    Popover.prototype.destroyOverlay = function() {
      this.info('destroyOverlay');
      elemRemove(this._overlay);
      return this._overlay = null;
    };

    Popover.prototype.destroyDummyFocusElems = function() {
      elemRemove(this._dummyStartFocusTrap);
      return elemRemove(this._dummyEndFocusTrap);
    };

    Popover.prototype.fitOverlay = function() {
      if (!this._visible) {
        return;
      }
      if (!this._overlay) {
        return;
      }
      return elemStyle(this._overlay, {
        height: (this.bestOverlayHeight()) + "px",
        width: (this.bestOverlayWidth()) + "px"
      });
    };

    Popover.prototype.closeButtonHeight = function() {
      return Math.min(18, this.bestVideoBoundingBox().left);
    };

    Popover.prototype.closeButtonWidth = function() {
      return Math.min(21, this.bestVideoBoundingBox().left);
    };

    Popover.prototype.fitCloseButton = function() {
      return elemStyle(this._closeButton, {
        width: (this.closeButtonWidth()) + "px",
        height: (this.closeButtonHeight()) + "px"
      });
    };

    Popover.prototype.hide = function(now) {
      var args, instaHide, ref4, ref5, wasEnabled, wasVisible;
      if (now == null) {
        now = false;
      }
      this.info('hide');
      this.video.trigger('beforepopoverhide');
      wasVisible = this._visible;
      this._visible = false;
      elemRemoveClass(document.body, 'wistia_popover_mode');
      if (((ref4 = this.video._opts) != null ? ref4.popoverResume : void 0) && this.video.time() > 0) {
        this.video._saveState();
      }
      instaHide = (function(_this) {
        return function() {
          var direction, ref5, ref6;
          elemStyle([_this._embedContainer, _this._closeButton], {
            boxShadow: '',
            position: 'absolute',
            top: 0
          });
          _this._closeButton.setAttribute('tabindex', -1);
          direction = ((ref5 = document.getElementsByTagName('html')) != null ? (ref6 = ref5[0]) != null ? ref6.dir : void 0 : void 0) || '';
          if (direction === "rtl") {
            elemStyle([_this._embedContainer, _this._closeButton], {
              right: '-99999px'
            });
          } else {
            elemStyle([_this._embedContainer, _this._closeButton], {
              left: '-99999px'
            });
          }
          _this.destroyOverlay();
          _this.destroyCaption();
          _this.destroyDummyFocusElems();
          if (!_this.video._attrs || _this.video._attrs.popoverPreventScroll) {
            return _this.allowScroll();
          } else {
            return _this.allowHorizontalScroll();
          }
        };
      })(this);
      if (this.video.state() === 'playing') {
        wasEnabled = this.video.isControlEnabled('playPauseNotifier');
        this.video.setControlEnabled('playPauseNotifier', false);
        this.video.on('pause', (function(_this) {
          return function() {
            doTimeout(_this.uuid + ".disable_notifier_on_hide", function() {
              return _this.video.setControlEnabled('playPauseNotifier', wasEnabled);
            }, 1);
            return _this.video.unbind;
          };
        })(this));
        this.video.pause();
      }
      if (wasVisible) {
        doTimeout(this.uuid + ".delayed_rebuild", (function(_this) {
          return function() {
            return _this.video.rebuild();
          };
        })(this), 600);
      }
      this.video.embedded((function(_this) {
        return function() {
          _this.video._pauseEventLoop();
          if (_this.shouldAnimate()) {
            return _this.unexpandPlayButtonImmediately();
          }
        };
      })(this));
      this.video.trigger('popoverhide');
      this.video.container.dispatchEvent(new CustomEvent('popover-hide'));
      if ((ref5 = this._prevActiveEelement) != null) {
        ref5.focus();
      }
      if (now === true) {
        return instaHide();
      } else {
        args = this.animateArgs();
        args.push(instaHide);
        return this.animateClose.apply(this, args);
      }
    };

    Popover.prototype.animateClose = function(fade, dir, callback) {
      if (fade == null) {
        fade = true;
      }
      this.info('animateClose', fade, dir);
      if (this._overlay) {
        if (!fade) {
          elemStyle(this._overlay, {
            opacity: 0
          });
        }
        setTimeout((function(_this) {
          return function() {
            return elemAnimate(_this._overlay, {
              opacity: 0
            });
          };
        })(this), 1);
      }
      if (!fade) {
        elemStyle([this._embedContainer, this._closeButton], {
          opacity: 0
        });
      }
      setTimeout((function(_this) {
        return function() {
          return elemAnimate([_this._embedContainer, _this._closeButton], {
            opacity: 0,
            transform: _this.transformProp(dir)
          }, {
            callback: callback
          });
        };
      })(this), 1);
      if (this._captionElem) {
        if (!fade) {
          elemStyle(this._captionElem, {
            opacity: 0
          });
        }
        return setTimeout((function(_this) {
          return function() {
            return elemAnimate(_this._captionElem, {
              opacity: 0,
              transform: _this.transformProp(dir)
            });
          };
        })(this), 1);
      }
    };

    Popover.prototype.showAndMaybePlay = function() {
      if (this.video._attrs.popoverDisableAutoplay) {
        return this.show();
      } else {
        return this.showAndPlay();
      }
    };

    Popover.prototype.showHandler = function(event) {
      this.showAndMaybePlay();
      setTimeout((function(_this) {
        return function() {
          return _this.video.focus();
        };
      })(this), 0);
      if ((event != null ? event.type : void 0) !== 'click') {
        return this._closeButtonSetVisibleStyle();
      }
    };

    Popover.prototype.showAndPlay = function() {
      this.info('showAndPlay');
      this.show();
      return this.video.play();
    };

    Popover.prototype.transformProp = function(dir) {
      if (dir === 'up') {
        return "translate(0, " + (Math.round(this.fullHeight() / 6)) + "px)";
      } else if (dir === 'down') {
        return "translate(0, " + (-Math.round(this.fullHeight() / 6)) + "px)";
      } else if (dir === 'left') {
        return "translate(" + (Math.round(this.fullWidth() / 6)) + "px, 0)";
      } else if (dir === 'right') {
        return "translate(" + (-Math.round(this.fullWidth() / 6)) + "px, 0)";
      } else {
        return '';
      }
    };

    Popover.prototype.animateOpen = function(fade, dir) {
      if (fade == null) {
        fade = true;
      }
      this.info('animateOpen', fade, dir);
      if (!fade) {
        elemStyle(this._overlay, {
          opacity: 1
        });
      }
      if (!fade) {
        elemStyle([this._embedContainer], {
          opacity: 1
        });
      }
      elemStyle([this._embedContainer], {
        transform: this.transformProp(dir)
      });
      setTimeout((function(_this) {
        return function() {
          elemAnimate([_this._embedContainer], {
            opacity: 1,
            transform: 'translate(0px, 0px)'
          });
          return elemAnimate(_this._overlay, {
            opacity: 1
          });
        };
      })(this), 1);
      if (this._captionElem) {
        if (!fade) {
          elemStyle(this._captionElem, {
            opacity: 1
          });
        }
        elemStyle(this._captionElem, {
          transform: this.transformProp(dir)
        });
        return setTimeout((function(_this) {
          return function() {
            return elemAnimate(_this._captionElem, {
              opacity: 1,
              transform: 'translate(0px, 0px)'
            });
          };
        })(this), 1);
      }
    };

    Popover.prototype.animateArgs = function() {
      if (this.video._attrs.popoverAnimation === 'fade') {
        return [true, 'none'];
      } else if (this.video._attrs.popoverAnimation === 'slide') {
        return this.slideOrFadeBasedOnPlayerType();
      } else if (this.video._attrs.popoverAnimation === 'none') {
        return [false, 'none'];
      } else {
        return this.slideOrFadeBasedOnPlayerType();
      }
    };

    Popover.prototype.slideOrFadeBasedOnPlayerType = function() {
      return [true, 'none'];
    };

    Popover.prototype.isVisible = function() {
      return this._visible;
    };

    Popover.prototype.show = function() {
      var ref4;
      this.info('show');
      this._visible = true;
      elemAddClass(document.body, 'wistia_popover_mode');
      clearTimeouts(this.uuid + ".delayed_rebuild");
      if (this.video._attrs.popoverPreventScroll) {
        this.preventScroll();
      } else {
        this.preventHorizontalScroll();
      }
      this._closeButton.childNodes[0].setAttribute('src', this._closeButtonBase64());
      this._closeButton.setAttribute('tabindex', 0);
      this.createOverlay();
      this.applyVisibleStyles();
      this.addCaption();
      this.createAndAddDummyFocusTraps();
      this.fitVideo();
      this.animateOpen.apply(this, this.animateArgs());
      this.setupVisibleBindings();
      this._prevActiveEelement = document.activeElement;
      if ((ref4 = this.video._opts) != null ? ref4.popoverResume : void 0) {
        this.video.unsuspend();
      }
      this.video.embedded((function(_this) {
        return function() {
          return _this.video._unpauseEventLoop();
        };
      })(this));
      this.video.trigger('popovershow');
      return this.video.container.dispatchEvent(new CustomEvent('popover-show'));
    };

    Popover.prototype.preventScroll = function() {
      if (this._savedCss) {
        return;
      }
      this._savedCss = {
        height: document.body.style.height || '',
        overflow: document.body.style.overflow || ''
      };
      return elemStyle(document.body, {
        height: '100%',
        overflow: 'hidden'
      });
    };

    Popover.prototype.allowScroll = function() {
      if (!this._savedCss) {
        return;
      }
      elemStyle(document.body, {
        height: this._savedCss.height,
        overflow: this._savedCss.overflow
      });
      return this._savedCss = null;
    };

    Popover.prototype.preventHorizontalScroll = function() {
      if (this._savedCss) {
        return;
      }
      this._savedCss = {
        width: document.body.style.width || '',
        'overflow-x': document.body.style['overflow-x'] || ''
      };
      return elemStyle(document.body, {
        width: '100%',
        'overflow-x': 'hidden'
      });
    };

    Popover.prototype.allowHorizontalScroll = function() {
      if (!this._savedCss) {
        return;
      }
      elemStyle(document.body, {
        width: this._savedCss.width,
        'overflow-x': this._savedCss['overflow-x']
      });
      return this._savedCss = null;
    };

    Popover.prototype.setupVisibleBindings = function() {
      if (this._hideOnEscape == null) {
        this._hideOnEscape = (function(_this) {
          return function(event) {
            if (event.keyCode === 27 && !event.escapeHandled) {
              _this.info('hide on escape');
              _this.hide();
              return elemUnbind(document, 'keyup', _this._hideOnEscape);
            }
          };
        })(this);
      }
      return elemRebind(document, 'keyup', this._hideOnEscape);
    };

    Popover.prototype.applyVisibleStyles = function() {
      var borderColor, borderRadius, borderWidth, boxShadow, boxShadowBlur, boxShadowOn, boxShadowSpread, parsedBorderRadius, parsedBoxShadowBlur, parsedBoxShadowSpread, scaleFactor;
      borderWidth = this._popoverBorderWidth();
      borderColor = new Color(this.video._attrs.popoverBorderColor || '#ffffff').toHex();
      scaleFactor = 1;
      if (this.video._impl && this.video._impl.ui) {
        scaleFactor = this.video._impl.ui.scale();
      }
      borderRadius = this.video._opts.popoverborderradius || this.video._attrs.popoverBorderRadius || (this.video._attrs.playerBorderRadius * scaleFactor) || 0;
      parsedBorderRadius = String(borderRadius).replace(/\D/g, '');
      boxShadowBlur = this.video._opts.popoverBoxShadowBlur != null ? this.video._opts.popoverBoxShadowBlur : 50;
      parsedBoxShadowBlur = String(boxShadowBlur).replace(/\D/g, '');
      boxShadowSpread = this.video._opts.popoverBoxShadowSpread != null ? this.video._opts.popoverBoxShadowSpread : 20;
      parsedBoxShadowSpread = String(boxShadowSpread).replace(/\D/g, '');
      boxShadowOn = this.video._attrs.popoverBoxShadow != null ? this.video._attrs.popoverBoxShadow : true;
      boxShadow = (boxShadowOn ? "0 0 " + parsedBoxShadowBlur + "px " + parsedBoxShadowSpread + "px rgba(0,0,0,.2)" : '');
      return elemStyle(this._embedContainer, {
        border: borderWidth + "px solid #" + borderColor,
        borderRadius: parsedBorderRadius + "px",
        boxShadow: boxShadow,
        boxSizing: 'content-box',
        left: 0,
        opacity: 0,
        position: 'absolute',
        top: 0,
        zIndex: 10001
      });
    };

    Popover.prototype.addCaption = function() {
      if (!(this.video._attrs.popoverCaption || this.video._attrs.popoverCaptionContainer)) {
        return;
      }
      this.destroyCaption();
      this.info('addCaption');
      this._captionElem = elemFromObject({
        id: this.video.uuid + "_popover_caption",
        tabindex: '-1',
        style: {
          color: '#ffffff',
          fontFamily: 'Verdana, Geneva, sans-serif',
          fontSize: '14px',
          left: 0,
          opacity: 0,
          position: 'absolute',
          top: 0,
          width: 0,
          zIndex: 10001
        }
      });
      elemAppend(this._popoverContainer, this._captionElem);
      if (this.video._attrs.popoverCaption) {
        this.info('build new caption with content', this.video._attrs.popoverCaption);
        if (this._captionContainer) {
          this._captionContainer.style.display = 'block';
        } else {
          this._captionContainer = elemFromObject({
            innerHTML: this.video._attrs.popoverCaption,
            style: {
              padding: '10px 0 0 0'
            }
          });
        }
        return elemAppend(this._captionElem, this._captionContainer);
      } else if (this.video._attrs.popoverCaptionContainer) {
        this.info('use caption container', this.video._attrs.popoverCaptionContainer);
        if (this._captionContainer) {
          this._captionContainer.style.display = 'block';
        } else {
          this._captionContainer = document.getElementById(this.video._attrs.popoverCaptionContainer);
        }
        elemStyle(this._captionContainer, {
          display: 'block'
        });
        return elemAppend(this._captionElem, this._captionContainer);
      }
    };

    Popover.prototype.destroyCaption = function() {
      this.info('destroyCaption');
      if (this._captionContainer) {
        elemStyle(this._captionContainer, {
          display: 'none'
        });
        elemAppend(this._popoverContainer, this._captionContainer);
      }
      elemRemove(this._captionElem);
      return this._captionElem = null;
    };

    Popover.prototype.fitCaption = function() {
      if (!this._captionElem) {
        return;
      }
      return elemStyle(this._captionElem, {
        left: (parseInt(elemStyle(this._embedContainer, 'left'), 10)) + "px",
        top: (parseInt(elemStyle(this._embedContainer, 'top'), 10) + this.fullHeight()) + "px",
        width: (this.fullWidth()) + "px"
      });
    };

    Popover.prototype.height = function(h, options) {
      if (options == null) {
        options = {};
      }
      if (h != null) {
        this.preventAnimation();
        elemStyle(this.video.container, {
          height: h + "px"
        });
        if (options.constrain) {
          elemStyle(this.video.container, {
            width: (this.video.widthForHeight(h)) + "px"
          });
        }
        this.resizeToContainer();
        this.allowAnimation();
        return this;
      } else {
        return elemHeight(this.video.container);
      }
    };

    Popover.prototype.width = function(w, options) {
      if (options == null) {
        options = {};
      }
      if (w != null) {
        this.preventAnimation();
        elemStyle(this.video.container, {
          width: w + "px"
        });
        if (options.constrain) {
          elemStyle(this.video.container, {
            height: (this.video.heightForWidth(w)) + "px"
          });
        }
        this.resizeToContainer();
        this.allowAnimation();
        return this;
      } else {
        return elemWidth(this.video.container);
      }
    };

    Popover.prototype.preventAnimation = function() {
      if (this._wistiaNoAnimateStyle == null) {
        this._wistiaNoAnimateStyle = addInlineCss(this._thumbContainer, ".wistia_no_animate * {\ntransition: none !important;\n-mozilla-transition: none !important;\n-ms-transition: none !important;\n-o-transition: none !important;\n-webkit-transition: none !important;\n}");
      }
      return elemAddClass(this._thumbContainer, 'wistia_no_animate');
    };

    Popover.prototype.allowAnimation = function() {
      this._thumbContainer.offsetTop;
      return elemRemoveClass(this._thumbContainer, 'wistia_no_animate');
    };

    Popover.prototype.fullWidth = function() {
      return this.video.width() + this._popoverBorderWidth() * 2;
    };

    Popover.prototype.fullHeight = function() {
      return this.video.height() + this._popoverBorderWidth() * 2;
    };

    Popover.prototype.fitVideo = function() {
      if (!this._visible) {
        return;
      }
      return this.video.embedded((function(_this) {
        return function() {
          var boundingBox, closeButtonDistanceFromEdge, direction, ref4, ref5;
          _this.video._doMonitor();
          boundingBox = _this.bestVideoBoundingBox();
          direction = ((ref4 = document.getElementsByTagName('html')) != null ? (ref5 = ref4[0]) != null ? ref5.dir : void 0 : void 0) || '';
          if (direction === "rtl") {
            elemStyle(_this._embedContainer, {
              right: boundingBox.left + "px",
              top: boundingBox.top + "px"
            });
            elemStyle(_this._closeButton, {
              right: (boundingBox.right + 17) + "px",
              top: boundingBox.top + "px"
            });
          } else {
            elemStyle(_this._embedContainer, {
              left: boundingBox.left + "px",
              top: boundingBox.top + "px"
            });
            if (_this.closeButtonWidth() + 10 > boundingBox.left) {
              closeButtonDistanceFromEdge = (boundingBox.left - _this.closeButtonWidth()) / 2;
            } else {
              closeButtonDistanceFromEdge = 10;
            }
            elemStyle(_this._closeButton, {
              left: (boundingBox.right + closeButtonDistanceFromEdge) + "px",
              top: (boundingBox.top - 2) + "px"
            });
          }
          return _this.fitCaption();
        };
      })(this));
    };

    Popover.prototype.bestVideoBoundingBox = function() {
      var bottom, height, left, right, screenHeight, screenWidth, top, width;
      screenWidth = elemWidth(window);
      screenHeight = elemHeight(window);
      width = this.fullWidth();
      height = this.fullHeight();
      left = scrollLeft() + Math.round((screenWidth - width) / 2);
      top = scrollTop() + Math.round((screenHeight - height) / 2);
      right = left + width;
      bottom = top + height;
      return {
        top: top,
        left: left,
        right: right,
        bottom: bottom,
        width: width,
        height: height
      };
    };

    Popover.prototype.getEmbedContainerWidth = function() {
      var distanceFromEdge, parentWidthNow, smallestDim, winAspect, winHeight, winWidth;
      winWidth = elemWidth(window);
      winHeight = elemHeight(window);
      winAspect = winWidth / winHeight;
      smallestDim = Math.min(winWidth, winHeight);
      if (smallestDim > 500) {
        distanceFromEdge = 160;
      } else {
        if (Math.abs(winAspect - this.video.aspect()) < 0.2) {
          distanceFromEdge = smallestDim * 0.2;
        } else {
          distanceFromEdge = smallestDim * 0.1;
        }
      }
      if (winAspect > this.video.aspect()) {
        parentWidthNow = Math.round((winHeight - distanceFromEdge) * this.video.aspect());
      } else {
        parentWidthNow = winWidth - distanceFromEdge;
      }
      return parentWidthNow;
    };

    return Popover;

  })();
  Wistia.mixin(Wistia.Popover.prototype, Wistia.logHelpers);
  return Wistia.Popover.prototype._logPrefix = function() {
    var ref4, ref5;
    return ['popover', ((ref4 = this.video) != null ? ref4.hashedId() : void 0) || 'no hashedId', (ref5 = this._thumbContainer) != null ? ref5.id : void 0];
  };
})(Wistia);
