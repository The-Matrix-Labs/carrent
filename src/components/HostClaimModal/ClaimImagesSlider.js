import React from 'react';
import cx from 'classnames';
import { isRTL } from '../../helpers/formatLocale';
import { injectIntl } from 'react-intl';
import messages from '../../locale/messages';
import Swiper from 'react-id-swiper';
import { Col, Row } from 'react-bootstrap';
import s from './HostClaimModal.css'
import { COMMON_TEXT_COLOR } from '../../constants/index';
//Images
import closeIcon from '../../../public/SiteIcons/claimPhotoClose.svg';
import ImageSlider from '../ViewListing/ImageSlider/ImageSlider';

const nextArrowStyle = {
    right: '-17px',
    background: '#fff', color: COMMON_TEXT_COLOR, zIndex: '5', width: '36px', height: '36px', top: '32%',
    fontSize: '40px', cursor: 'pointer', borderRadius: '50%', textAlign: 'center',
    border: '2px solid transparent', boxShadow: '0px 0px 4px 0px #484848', position: 'absolute'
};

const prevArrowStyle = {
    left: '-15px',
    background: '#fff', color: COMMON_TEXT_COLOR, zIndex: '5', width: '36px', height: '36px', top: '32%',
    fontSize: '40px', cursor: 'pointer', borderRadius: '50%', textAlign: 'center',
    border: '2px solid transparent', boxShadow: '0px 0px 4px 0px #484848', position: 'absolute'
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

class ClaimImagesSlider extends React.Component {
    state = { isBeginning: true, isEnd: false, lightBox: false, currentImage: 0 };

    goNext = () => {
        this.swiper.slideNext();
        this.progress();
    }

    goPrev = () => {
        this.swiper.slidePrev();
        this.progress();
    }

    progress = () => {
        this.setState({ isEnd: this.swiper.isEnd, isBeginning: this.swiper.isBeginning });
    }

    changeLightBoxStatus = (status, currentImage) => {
        this.setState({ lightBox: status, currentImage })
    }

    render() {
        const { data, slidesPerView, intl: { locale }, arrow, claimed, removeImage } = this.props;
        const { isBeginning, isEnd, lightBox, currentImage } = this.state;
        const { formatMessage } = this.props.intl;
        const params = {
            slidesPerView: 3,
            spaceBetween: 20,
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
            <div className={cx(s.positionRelative, s.sliderBottom)}>
                <ImageSlider
                    imageLightBox={lightBox}
                    currentImage={currentImage}
                    closeImageLightBox={this.changeLightBoxStatus}
                    sources={data.map(value => ({ src: `/images/claims/${value}` }))}
                />
                <Swiper {...params} rtl={isRTL(locale)} ref={node => this.swiper = node && node.swiper} className={cx('row homeSlickSlider')}>
                    {
                        data && data.map((item, index) => {
                            return (<div>
                                <div className={s.bgImage} style={{ backgroundImage: `url(/images/claims/${item}` }} onClick={() => this.changeLightBoxStatus(true, index)}>
                                    {!claimed && <a onClick={() => removeImage(item)}><img src={closeIcon} className={cx(s.closeIcon, 'closeIconRTL')} /></a>}
                                </div>
                            </div>
                            )
                        })
                    }

                </Swiper>
                <div>
                    {arrow && data && data.length > (slidesPerView) && !isBeginning && <SamplePrevArrow className={cx('prevRTL')} onClick={this.goPrev} />}
                    {arrow && data && data.length > (slidesPerView) && !isEnd && <SampleNextArrow className={cx('nextRTL')} onClick={this.goNext} />}
                </div>
            </div>
        )
    }
}

export default injectIntl(ClaimImagesSlider);