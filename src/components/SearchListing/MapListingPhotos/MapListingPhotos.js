
import React from 'react';
import PropTypes from 'prop-types';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './MapListingPhotos.css';
import {
  Button,
  Carousel,
} from 'react-bootstrap';
import cx from 'classnames';
import * as FontAwesome from 'react-icons/lib/fa';

import Slider from 'react-slick';
// import 'slick-carousel/slick/slick-theme.css';
// import 'slick-carousel/slick/slick.css';
import { COMMON_TEXT_COLOR } from '../../../constants/index';

import Loader from '../../Loader';

const nextArrowStyle = {
  right: '5px',
  color: COMMON_TEXT_COLOR, zIndex: '1', width: '34px', height: '34px', top: '50%',
  fontSize: '18px', cursor: 'pointer', textAlign: 'center', backgroundColor: 'rgba(255, 255, 255, 0.9)', backgroundRepeat: 'repeat-x',
  filter: 'progid:DXImageTransform.Microsoft.gradient(startColorstr="#00000000",endColorstr="#80000000",GradientType=1)',
  borderRadius: '50%', position: 'absolute'
};

const prevArrowStyle = {
  left: '5px',
  color: COMMON_TEXT_COLOR, zIndex: '1', width: '34px', height: '34px', top: '50%',
  fontSize: '18px', cursor: 'pointer', textAlign: 'center', backgroundColor: 'rgba(255, 255, 255, 0.9)', backgroundRepeat: 'repeat-x',
  filter: 'progid:DXImageTransform.Microsoft.gradient(startColorstr="#80000000",endColorstr="#00000000",GradientType=1)',
  borderRadius: '50%', position: 'absolute'
};


function SampleNextArrow(props) {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={nextArrowStyle}
      onClick={onClick}
    >
      <svg viewBox="0 0 18 18" role="img" aria-label="Previous" focusable="false"
        style={{ height: '13px', width: '13px', display: 'block', fill: '#484848', position: 'absolute', top: '31%', right: '10px' }}>
        <path d="m4.29 1.71a1 1 0 1 1 1.42-1.41l8 8a1 1 0 0 1 0 1.41l-8 8a1 1 0 1 1 -1.42-1.41l7.29-7.29z"></path>
      </svg>
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={prevArrowStyle}
      onClick={onClick}
    >
      <svg viewBox="0 0 18 18" role="img" aria-label="Previous" focusable="false"
        style={{ height: '13px', width: '13px', display: 'block', fill: '#484848', position: 'absolute', top: '31%', left: '10px' }}>
        <path d="m13.7 16.29a1 1 0 1 1 -1.42 1.41l-8-8a1 1 0 0 1 0-1.41l8-8a1 1 0 1 1 1.42 1.41l-7.29 7.29z"></path>
      </svg>
    </div>
  );
}

class MapListingPhotos extends React.Component {
  static propTypes = {
    id: PropTypes.number,
    listPhotos: PropTypes.array,
    coverPhoto: PropTypes.number,
    size: PropTypes.string,
  };

  static defaultProps = {
    listPhotos: [],
    coverPhoto: 0,
    size: 'x_medium_'
  };

  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
  }

  componentDidMount() {
    setTimeout(() => { this.setState({ loaded: true }) }, 1000)
  }

  render() {
    const { id, listPhotos, coverPhoto, size, formatURL, title } = this.props;
    const { loaded } = this.state;
    let imagepath = '/images/upload/' + size;

    let indicators = (listPhotos != null && listPhotos.length > 1) ? true : false;

    let settings = {
      dots: indicators,
      infinite: indicators,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 0,
      swipe: indicators,
      swipeToSlide: indicators,
      touchMove: indicators
    };

    if (!loaded) {
      return (
        <div className={s.listPhotoContainer}>
          <div className={cx('col-md-12 col-sm-12 col-xs-12', s.sliderItem)}>
              <div className={s.parent}>
                <div className={cx(s.children)}>
                  <div className={s.content}>
                    <div className={cx(s.imageContent)}>
                      <div className={s.slideLoader}>
                        <Loader type={'circle'} show={true} className='arButtonLoader'/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      );
    }

    return (
      <div className={s.listPhotoContainer}>
        {
          listPhotos != null && listPhotos.length && <div>
            <Slider {...settings}>
              {
                listPhotos.map((item, itemIndex) => {
                  return (
                    <div className={cx('col-md-12 col-sm-12 col-xs-12', s.sliderItem)} key={itemIndex}>
                      <a href={"/cars/" + formatURL(title) + '-' + id} target={"_blank"}>
                        <div className={s.parent}>
                          <div className={cx(s.children)}>
                            <div className={s.content}>
                              <div className={cx(s.imageContent)}
                                style={{ backgroundImage: 'url(' + imagepath + item.name + ')' }}></div>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                  )
                })
              }
            </Slider>
          </div>
        }
      </div>
    );

  }
}

export default withStyles(s)(MapListingPhotos);
