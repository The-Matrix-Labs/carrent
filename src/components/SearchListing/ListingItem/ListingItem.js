
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { change, submit as submitForm, formValueSelector, reduxForm } from 'redux-form';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ListingItem.css';
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
import cx from 'classnames';
import * as FontAwesome from 'react-icons/lib/fa';

import CurrencyConverter from '../../CurrencyConverter';
import ListingPhotos from '../ListingPhotos';
import StarRating from '../../StarRating';
import WishListIcon from '../../WishListIcon';

// Locale
import messages from '../../../locale/messages';

import { formatURL } from '../../../helpers/formatURL';
import { COMMON_TEXT_COLOR } from '../../../constants/index'; 


class ListingItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
  }

  static propTypes = {
    formatMessage: PropTypes.func,
    id: PropTypes.number,
    basePrice: PropTypes.number,
    currency: PropTypes.string,
    title: PropTypes.string,
    beds: PropTypes.number,
    personCapacity: PropTypes.number,
    carType: PropTypes.string,
    listPhotos: PropTypes.array,
    coverPhoto: PropTypes.number,
    bookingType: PropTypes.string.isRequired,
    reviewsCount: PropTypes.number,
    reviewsStarRating: PropTypes.number,
    wishListStatus: PropTypes.bool,
    isListOwner: PropTypes.bool
  };

  handleMouseOver(value) {
    const { change } = this.props;
    change('SearchForm', 'markerHighlight', { 'id': value, 'hover': 'true' });
  }

  handleMouseOut(value) {
    const { change } = this.props;
    change('SearchForm', 'markerHighlight', {});
  }

  render() {
    const { formatMessage } = this.props.intl;
    const {
      id,
      basePrice,
      currency,
      title,
      beds,
      personCapacity,
      carType,
      coverPhoto,
      listPhotos,
      bookingType,
      reviewsCount,
      reviewsStarRating,
      wishListStatus,
      isListOwner,
      transmission
    } = this.props;
    let bedsLabel = 'Trip';
    let guestsLabel = 'guest';
    let heartIcon = 'heartIcon';
    let transmissionLabel;
    if (beds > 1) {
      bedsLabel = 'Trips';
    }

    if (personCapacity > 1) {
      guestsLabel = 'guests';
    }
    let starRatingValue = 0;
    if (reviewsCount > 0 && reviewsStarRating > 0) {
      starRatingValue = Number(reviewsStarRating / reviewsCount)
    }
    let activeItem = 0, photoTemp, photosList = listPhotos.slice();
    if (listPhotos && listPhotos.length > 1) {
      listPhotos.map((x, y) => { if (x.id === coverPhoto) activeItem = y });
      if (activeItem > 0) {
        photoTemp = photosList[0];
        photosList[0] = photosList[activeItem];
        photosList[activeItem] = photoTemp;
      }
    }

    transmission == '1' ? transmissionLabel = 'Automatic' : transmissionLabel = 'Manual';

    return (
      <div className={cx(s.listItemContainer)} onMouseOver={() => this.handleMouseOver(id)} onMouseOut={() => this.handleMouseOut(id)}>
        {
          !isListOwner && <WishListIcon listId={id} key={id} isChecked={wishListStatus} heartIcon={heartIcon} />
        }

        <ListingPhotos
          id={id}
          coverPhoto={coverPhoto}
          listPhotos={photosList}
          formatURL={formatURL}
          title={title}
        />


        <div className={s.listInfo}>
          <a className={s.listInfoLink} href={"/cars/" + formatURL(title) + '-' + id} target={"_blank"}>
            <Row>
              <Col xs={12} sm={12} md={12} className={cx(s.textEllipsis, s.infoDesc, s.infoText, s.infoSpace)}>
                <div className={cx(s.listingInfo, 'floatRightRTL')}>

                  <span className='carTypeRTL'>{carType}</span>
                  <span className='dotRTL'>&nbsp;&#183;&nbsp;</span>
                  {/* <span>{beds} {bedsLabel}</span> */}
                  <span className='dotRTL'>{transmissionLabel}</span>

                </div>

              </Col>
              <Col xs={12} sm={12} md={12} className={cx(s.textEllipsis, s.listingTitle, 'directionLtr', 'textAlignRightRTL')}>
                {title}

              </Col>
              <Col xs={12} sm={12} md={12} className={cx(s.textEllipsis, s.infoPrice, s.infoText, s.infoSpaceTop1)}>
                {/* {
                  <CurrencyConverter
                    amount={basePrice}
                    from={currency}
                  />
                } */}
                {/* {
                  bookingType === "instant" && <span><FontAwesome.FaBolt className={s.instantIcon} /></span>
                }
                {' '}<FormattedMessage {...messages.perNight} /> */}
              </Col>
              <Col xs={12} sm={12} md={12}
                className={cx(s.textEllipsis, s.infoReview, s.infoSpaceTop1)}
              >
                <div className={cx(s.reviewStar, 'small-star-rating')}>
                  <StarRating
                    value={starRatingValue}
                    name={'review'}
                    className={s.displayInline}
                    starColor={COMMON_TEXT_COLOR}
                    emptyStarColor={'#cccccc'}
                  />
                  <span className={s.textInline}>&nbsp; {reviewsCount + ' '}{reviewsCount > 1 ? formatMessage(messages.reviews) : formatMessage(messages.review)}
                  </span>
                </div>

              </Col>
            </Row>
            <div className={cx(s.priceCss, 'priceCssRTL')}>
              <div>{
                <CurrencyConverter
                  amount={basePrice}
                  from={currency}
                />
              }</div>
              <div className={cx(s.perDaySize, 'textAlignRightRTL')}>
                {
                  bookingType === "instant" && <span><FontAwesome.FaBolt className={s.instantIcon} /></span>
                }
                {' '}<span className='floatRightRTL'><FormattedMessage {...messages.perNight} /></span>
              </div>
            </div>
          </a>
        </div>

      </div>
    );
  }
}

// export default injectIntl(withStyles(s)(ListingItem));
//export default injectIntl(withStyles(s)(ListingItem));

const mapState = (state) => ({});

const mapDispatch = {
  change
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(ListingItem)));
