import { bestImage, blankImage, sortedImages } from 'utilities/image.js';
import { Component, h, render } from 'preact';
import { assign } from 'utilities/obj.js';
import { elemInDom } from 'utilities/elem.js';
import { defineTranslations, getTranslation } from './translations.js';

defineTranslations('en-US', {
  THUMBNAIL_VIDEO_THUMBNAIL: 'Video Thumbnail',
});

export class Thumbnail extends Component {
  constructor(props) {
    super(props);
    this.initialState = this.state = {
      isLoaded: false,
      isDisplaying: false,
    };

    this.onDisplay = this.props.onDisplay;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.images !== this.props.images) {
      // clear the cache if we're changing which images to operate on.
      this._sortedImages = null;
      this.setState({ isLoaded: false, isDisplaying: false });
    }

    if (!this.onDisplay && nextProps.onDisplay) {
      this.onDisplay = nextProps.onDisplay;
    }
  }

  render() {
    const altText =
      this.props.thumbnailAltText !== undefined
        ? this.props.thumbnailAltText
        : this.translate('VIDEO_THUMBNAIL');
    return (
      <div style={this.wrapperStyle()} class="w-css-reset">
        <img
          class="w-css-reset"
          srcset={this.props.images.length > 1 ? this.srcSet() : null}
          src={this.bestSrc()}
          style={this.imgStyle()}
          alt={altText}
          ref={(e) => (this.imgElem = e)}
          aria-hidden={this.props.ariaHidden ? 'true' : null}
        />
      </div>
    );
  }

  translate(key) {
    return getTranslation(this.props.playerLanguage, `THUMBNAIL_${key}`);
  }

  componentDidMount() {
    this.setStateBasedOnImgStatus();
    this.maybeCallOnDisplay(this.initialState);
  }

  componentDidUpdate(prevProps, prevState) {
    this.setStateBasedOnImgStatus();
    this.maybeCallOnDisplay(prevState);
  }

  maybeCallOnDisplay() {
    if (this.onDisplay && this.state.isDisplaying && !this.calledOnDisplay) {
      // There may be components outside the thumbnail that depend on this.
      // For example, we might not want to show controls until the thumbnail
      // is displayed.
      this.calledOnDisplay = true;
      this.onDisplay();
    }
  }

  setStateBasedOnImgStatus() {
    const state = this.state;

    const imgElem = this.imgElem;
    if (state.isLoaded) {
      return;
    }

    if (!imgElem.onload) {
      imgElem.onload = () => {
        if (elemInDom(imgElem)) {
          this.setState({ isLoaded: true, isDisplaying: true });
        }
      };
    }

    if (imgElem.complete) {
      this.setState({ isLoaded: true, isDisplaying: true });
    }
  }

  wrapperStyle() {
    const shouldShow = this.state.isDisplaying && this.props.isVisible;
    return assign({}, this.props.wrapperStyle, {
      display: this.state.isLoaded && !shouldShow ? 'none' : 'block',
    });
  }

  baseStyle() {
    const fitStrategy = this.props.fitStrategy;
    if (fitStrategy === 'cover') {
      return this.coverStyle();
    }
    if (fitStrategy === 'contain') {
      return this.containStyle();
    }
    if (fitStrategy === 'fill') {
      return this.fillStyle();
    }
    if (fitStrategy === 'naturalHeight') {
      return this.naturalHeightStyle();
    }
    return this.containStyle();
  }

  imgStyle() {
    const shouldShow = this.state.isDisplaying && this.props.isVisible;
    return assign(this.baseStyle(), {
      // We use position/clip to hide/show the thumbnail until it has loaded
      // because the img may not try to load if it's not visible. But after
      // it's loaded, we use display: none/block to defeat over-aggressive css
      // that might do something like position: static !important.
      clip: shouldShow ? 'auto' : 'rect(0,0,0,0)',
      display: this.state.isLoaded && !shouldShow ? 'none' : 'block',
      borderRadius: `${this.props.playerBorderRadius}px`,
    });
  }

  containStyle() {
    return {
      backgroundColor: this.props.backgroundColor || '#000',
      height: '100%',
      objectFit: 'contain',
      position: 'absolute',
      width: '100%',
      top: 0,
      left: 0,
    };
  }

  coverStyle() {
    // IE11 does not support objectFit. Screw em.
    return {
      height: '100%',
      objectFit: 'cover',
      position: 'absolute',
      width: '100%',
    };
  }

  fillStyle() {
    // Though object-fit will be ignored, this will work in IE1 because the
    // default is to stretch the image.
    return {
      height: '100%',
      objectFit: 'fill',
      position: 'absolute',
      width: '100%',
    };
  }

  naturalHeightStyle() {
    return {
      width: '100%',
      position: 'relative',
    };
  }

  bestSrc() {
    return bestImage(this.props.images, {
      videoWidth: this.props.videoWidth,
      videoHeight: this.props.videoHeight,
    }).url;
  }

  srcSet() {
    let sortedImages = this.sortedImages();

    if (sortedImages.length === 0) {
      sortedImages = [blankImage(this.props.videoWidth, this.props.videoHeight)];
    }

    return sortedImages
      .map((image) => {
        return `${image.url} ${image.width}w`;
      })
      .join(', ');
  }

  sortedImages() {
    if (this._sortedImages) {
      return this._sortedImages;
    }

    this._sortedImages = sortedImages(this.props.images);

    return this._sortedImages;
  }

  stretchLimit() {
    const stretchLimit = this.props.stretchLimit;
    if (stretchLimit != null) {
      return stretchLimit;
    }
    return 10;
  }
}
