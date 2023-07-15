import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import Swiper from 'react-id-swiper';
import s from './PopularLocationSlider.css';
import * as FontAwesome from 'react-icons/lib/fa';
import {
  Button,
  Grid,
  Row,
  Col,
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  Carousel,
} from 'react-bootstrap';

// Component
import PopularLocationItem from '../PopularLocationItem';
import Loader from '../../Loader/Loader';
import {injectIntl } from 'react-intl';
// Helpers
import { isRTL } from '../../../helpers/formatLocale';


const nextArrowStyle = {
  position: 'absolute',
  right: '-55px',
  background: 'transparent',
  color: '#00B0CD',
  zIndex: '5',
  width: 'auto',
  height: 'auto',
  top: '30%',
  fontSize: '40px',
  cursor: 'pointer',
  borderRadius: '50%',
  textAlign: 'center',
};

const prevArrowStyle = {
  position: 'absolute',
  left: '-55px',
  background: 'transparent',
  color: '#00B0CD',
  zIndex: '5',
  width: 'auto',
  height: 'auto',
  top: '30%',
  fontSize: '40px',
  cursor: 'pointer',
  borderRadius: '50%',
  textAlign: 'center',
};



function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={nextArrowStyle}
      onClick={onClick}
    >
      <FontAwesome.FaAngleRight className={s.navigationIcon} />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={prevArrowStyle}
      onClick={onClick}
    >
      <FontAwesome.FaAngleLeft className={s.navigationIcon} />
    </div>
  );
}

class PopularLocationSlideComponent extends React.Component {

  static propTypes = {
  };

  static defaultProps = {
    data: [],
    arrow: true
  }

  constructor(props) {
    super(props);
    this.swiper = null;
    this.goNext = this.goNext.bind(this);
    this.goPrev = this.goPrev.bind(this);
    this.progress = this.progress.bind(this);

    this.state = {
      isClient: false,
      isBeginning: true,
      isEnd: false,
      load: false
    };
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
  }

  goPrev() {
    this.swiper.slidePrev();
  }
  progress() {
    if (!this.swiper) return;
    if (this.swiper.isEnd) {
      this.setState({ isEnd: true });
    } else if (this.swiper.isBeginning) {
      this.setState({ isBeginning: true });
    } else {
      this.setState({ isEnd: false, isBeginning: false });
    }
  }


  render() {
    const { data, arrow, intl: { locale } } = this.props;
    const { isClient, load } = this.state;
    let arrow_display = this.props.arrow;
    arrow_display = false;
    let th = this, autoPlaySlider;


    const params = {


      slidesPerView: 5,
      spaceBetween: 10,
      draggable: true,
      freeMode: true,

      breakpoints: {
        1024: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 0,
        },
        640: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        500: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        320: {
          slidesPerView: 1,
          spaceBetween: 10,
          centeredSlides: true,
        }
      }
    }
      if(arrow === true){
        // params.autoplay = true,
        params.loop = true
    } else{
        // params.autoplay = false,
        params.loop = true
    }


    return (
      <Grid fluid>
        <div className="popularLocation">
          <Row>
            <Col xs={12} sm={12} md={12} lg={12} className={s.paddingNone}>
            {
              !load && <div>
                <Loader type="text" />
              </div>
            }
              {
                load && isClient && <Swiper {...params} rtl={isRTL(locale)} ref={node => th.swiper = node !== null ? node.swiper : null}>
                  {
                    data.length > 0 && data.map((item, index) => {
                      if (item.isEnable == 'true') {
                        return (
                          <div className={cx('col-md-12 col-sm-12 col-xs-12', s.paddingRight, s.locationWidth, s.displayFlex)} key={index}>
                            <PopularLocationItem
                              id={item.id}
                              location={item.location}
                              image={item.image}
                              locationAddress={item.locationAddress}
                            />
                          </div>
                        )
                      }
                    })
                  }
                </Swiper>

              }

              {
                arrow == true &&
                <div>
                  <SamplePrevArrow
                    className={cx(s.displayNone, 'arrowPrevRTL')}
                    onClick={this.goPrev}
                  />
                  <SampleNextArrow
                    className={cx(s.displayNone, 'arrowNextRTL')}
                    onClick={this.goNext}
                  />
                </div>
              }

            </Col>
          </Row>
        </div>
      </Grid>
    );

  }
};

export default injectIntl(withStyles(s)(PopularLocationSlideComponent));
