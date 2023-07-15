import React from 'react';
import PropTypes from 'prop-types';
import Swiper from 'react-id-swiper';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';

import s from './HomeSlider.css';
import * as FontAwesome from 'react-icons/lib/fa';
import {
  Grid,
  Row,
  Col,
} from 'react-bootstrap';

import { FormattedMessage, injectIntl } from 'react-intl';

// Component
import HomeItem from '../HomeItem';
import ListCoverPhoto from '../../ListCoverPhoto';
import CurrencyConverter from '../../CurrencyConverter';

// Helpers
import { formatURL } from '../../../helpers/formatURL';
import { isRTL } from '../../../helpers/formatLocale';
import { COMMON_TEXT_COLOR } from '../../../constants/index'
// Locale
import messages from '../../../locale/messages';
import WishListIcon from '../../WishListIcon';
import Loader from '../../Loader/Loader';

const nextArrowStyle = {
  right: '5px',
  background: '#fff', color: COMMON_TEXT_COLOR, zIndex: '5', width: '36px', height: '36px', top: '32%',
  fontSize: '40px', cursor: 'pointer', borderRadius: '50%', textAlign: 'center',
  border: '2px solid transparent', boxShadow: '0px 0px 4px 0px #484848', position: 'absolute'
};

const prevArrowStyle = {
  left: '5px',
  background: '#fff', color: COMMON_TEXT_COLOR, zIndex: '5', width: '36px', height: '36px', top: '32%',
  fontSize: '40px', cursor: 'pointer', borderRadius: '50%', textAlign: 'center',
  border: '2px solid transparent', boxShadow: '0px 0px 4px 0px #484848', position: 'absolute'
};

const nextArrowMobileStyle = {
  display: 'none', right: '10px',
  background: '#fff', color: COMMON_TEXT_COLOR, zIndex: '5', width: '36px', height: '36px', top: '40%',
  fontSize: '40px', cursor: 'pointer', borderRadius: '50%', textAlign: 'center',
  border: '2px solid transparent', boxShadow: '0px 0px 4px 0px #484848'
};

const prevArrowMobileStyle = {
  display: 'none', left: '10px',
  background: '#fff', color: COMMON_TEXT_COLOR, zIndex: '5', width: '36px', height: '36px', top: '40%',
  fontSize: '40px', cursor: 'pointer', borderRadius: '50%', textAlign: 'center',
  border: '2px solid transparent', boxShadow: '0px 0px 4px 0px #484848'
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
        style={{ height: '15px', width: '15px', display: 'block', fill: '#484848', position: 'absolute', top: '28%', right: '8px' }}>
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
        style={{ height: '15px', width: '15px', display: 'block', fill: '#484848', position: 'absolute', top: '28%', left: '8px' }}>
        <path d="m13.7 16.29a1 1 0 1 1 -1.42 1.41l-8-8a1 1 0 0 1 0-1.41l8-8a1 1 0 1 1 1.42 1.41l-7.29 7.29z"></path>
      </svg>

    </div>
  );
}

function MobileNextArrow(props) {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={nextArrowMobileStyle}
      onClick={onClick}
    >
    </div>
  );
}

function MobilePrevArrow(props) {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={prevArrowMobileStyle}
      onClick={onClick}
    >
    </div>
  );
}



class SlideComponent extends React.Component {

  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
      listPhotos: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string
      })),
      coverPhoto: PropTypes.number,
      listingData: PropTypes.shape({
        basePrice: PropTypes.number,
        currency: PropTypes.string,
      }),
      settingsData: PropTypes.arrayOf(PropTypes.shape({
        listsettings: PropTypes.shape({
          itemName: PropTypes.string,
        }),
      })),
      id: PropTypes.number,
      beds: PropTypes.number,
      title: PropTypes.string,
      bookingType: PropTypes.string,
      reviewsCount: PropTypes.number,
      reviewsStarRating: PropTypes.number
    }))
  };

  static defaultProps = {
    data: []
  }

 



  static defaultProps = {
    data: [],
    arrow: true
  }

  constructor(props) {
    super(props);
    this.state = {
      isClient: false
    };
    this.swiper = null;
    this.goNext = this.goNext.bind(this);
    this.goPrev = this.goPrev.bind(this);
    this.progress = this.progress.bind(this);

    this.state = {
      isBeginning: true,
      isEnd: false,
      load: false
    }
  }
  componentDidMount() {
    this.setState({
      isClient: true,
      load: true
    });
  }
  componentDidUpdate(prevProps) {
    const { locale } = this.props.intl;
    const { locale: prevLocale } = prevProps.intl;

    if (locale !== prevLocale) {
      this.setState({
        load: false
      });
      clearTimeout(this.loadSync);
      this.loadSync = null;
      this.loadSync = setTimeout(() => {
        this.setState({
          load: true
        })
        this.progress()
      }, 1);
    }
  }
  goNext() {
    this.swiper.slideNext();
    this.progress();
  }

  goPrev() {
    this.swiper.slidePrev();
    this.progress();
  }

  progress() {
    this.setState({ isEnd: this.swiper.isEnd, isBeginning: this.swiper.isBeginning });
  }

  render() {
    const { data,  intl: { locale }, arrow } = this.props;
    const { load, isBeginning, isEnd } = this.state;
    const { formatMessage } = this.props.intl;

    const params = {
      slidesPerView: 4,
      breakpoints: {
        768: {
          slidesPerView: 'auto',
        },
        640: {
          slidesPerView: 'auto',
        }
      }
    }

    return (
      <Grid fluid>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
          {
              !load && <div>
                <Loader type="text" />
              </div>
            }
             {
              load && <Swiper {...params} rtl={isRTL(locale)} ref={node => this.swiper = node !== null ? node.swiper : null} className={cx('row homeSlickSlider', s.noMargin)}>
              {
                data && data.length > 0 && data.map((item, index) => {

                  let carType = item.settingsData[0].listsettings.itemName, transmissionLabel;
                  let transmission = item.transmission;
                  let isListOwner = item.isListOwner
                  transmission == '1' ? transmissionLabel = 'Automatic' : transmissionLabel = 'Manual';

                  if (item.listPhotos.length > 0) {
                    return (
                      <div className={cx(s.background, s.positionRelative)}>
                        {
                          !isListOwner && <WishListIcon listId={item.id} key={item.id} isChecked={item.wishListStatus} />
                        }
                        <a href={"/cars/" + formatURL(item.title) + '-' + item.id} target={'_blank'}>
                          <div className={s.boxShadow}>
                            <ListCoverPhoto
                              className={s.HRCar}
                              listPhotos={item.listPhotos}
                              coverPhoto={item.coverPhoto}
                              photoType={"x_medium"}
                              bgImage
                            />
                            <div className={s.PerDayWrap}>
                              <div className={cx(s.PerDay, 'PerDayRTL')}>
                                <div className={s.InnerPerDay}>
                                  <div className={s.trip}>

                                  </div>
                                  <h3 className={s.margintop5}>
                                    <CurrencyConverter
                                      amount={item.listingData.basePrice}
                                      from={item.listingData.currency}
                                    />
                                  </h3>
                                  <p>
                                    {formatMessage(messages.perNight)}

                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className={s.sliderbackground}>
                              <div className={cx(s.HRDetails, 'HRDetailsRTL')}>
                                <div className={cx(s.trip, s.hiddentextSlider, 'hiddentextSliderRTL')}>
                                  <span className='carTypeRTL'>{carType}</span>
                                  <span className='dotRTL'>&nbsp;·&nbsp;</span>
                                  <span className='dotRTL'>{transmissionLabel}</span>
                                </div>
                                <h3>{item.title}</h3>
                              </div>
                              <div className={cx(s.HRbtnWrap, 'textAlignRightRTL')}>
                                <div className={s.HRRight}>
                                  <a className={s.btn} href={"/cars/" + formatURL(item.title) + '-' + item.id} target={'_blank'}>
                                    <FormattedMessage {...messages.bookNow} />
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </a>
                      </div>
                    )
                  }
                })
              }
            </Swiper>
             }
            <div className={'homeSwiperArrow'}>
              {load && arrow && arrow == true && data && data.length > 3 && !isBeginning && <SamplePrevArrow className={cx('hidden-xs hidden-sm', 'prevRTL')} onClick={this.goPrev} />}
              {load && arrow && arrow == true && data && data.length > 3 && !isEnd && <SampleNextArrow className={cx('hidden-xs hidden-sm', 'nextRTL')} onClick={this.goNext} />}
            </div>

          </Col>
        </Row>
      </Grid>
    );

  }
};

export default injectIntl(withStyles(s)(SlideComponent));
