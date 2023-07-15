import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Lightbox from 'react-images';
import { injectIntl } from 'react-intl';
import { isRTL } from '../../../helpers/formatLocale';

class ImageSlider extends Component {

  static propTypes = {
  };

  constructor(props) {
    super(props);
    this.state = {
      lightboxIsOpen: false,
      currentImage: props.currentImage || 0,
      sources: []
    };
    this.closeLightbox = this.closeLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
    this.gotoImage = this.gotoImage.bind(this);
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    const { imageLightBox, sources, currentImage } = nextProps;
    if (imageLightBox) {
      this.setState({ lightboxIsOpen: imageLightBox });
    }
    if (currentImage >= 0) {
      this.setState({
        currentImage,
      });
    }
    if (sources) {
      this.setState({ sources });
    }

  }

  openLightbox (index, event) {
    event.preventDefault();
    this.setState({
      currentImage: index,
      lightboxIsOpen: true,
    });
  }

  closeLightbox () {
    const { closeImageLightBox } = this.props;
    closeImageLightBox();
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    });
  }
  gotoPrevious () {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  }

  gotoNext () {
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  }

  gotoImage (index) {
    this.setState({
      currentImage: index,
    });
  }

  render() {
    const { lightboxIsOpen, currentImage, sources } = this.state;
    const { locale } = this.props.intl;
    return (
      <div>
        <Lightbox
          images={sources}
          isOpen={lightboxIsOpen}
          currentImage={currentImage}
          onClickPrev={this.gotoPrevious}
          onClickNext={this.gotoNext}
          onClose={this.closeLightbox}
          onClickThumbnail={this.gotoImage}
          showThumbnails={true}
          showCloseButton={true}
          enableKeyboardInput={true}
          showImageCount={!isRTL(locale)}
        />
      </div>
    );
  }

}
export default injectIntl(ImageSlider);
