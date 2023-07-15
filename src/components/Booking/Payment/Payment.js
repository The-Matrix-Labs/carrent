import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import {
  Grid,
  Row,
  Col,
  Panel,
} from 'react-bootstrap';
import * as FontAwesome from 'react-icons/lib/fa';
import logoUrl from './logo-small.jpg';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Payment.css';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Elements } from 'react-stripe-elements';

// Component
import PaymentDetails from './PaymentDetails';
import PaymentForm from './PaymentForm';
import Avatar from '../../Avatar';
import CurrencyConverter from '../../CurrencyConverter';
import ListCoverPhoto from '../../ListCoverPhoto';

// Helper
import { convert } from '../../../helpers/currencyConvertion';

// Locale
import messages from '../../../locale/messages';
import { formatTime } from '../../../helpers/formatting';

class Payment extends Component {

  static propTypes = {
    listId: PropTypes.number.isRequired,
    hostId: PropTypes.string.isRequired,
    guestId: PropTypes.string.isRequired,
    guestEmail: PropTypes.string.isRequired,
    hostDisplayName: PropTypes.string.isRequired,
    hostPicture: PropTypes.string,
    coverPhoto: PropTypes.string,
    listTitle: PropTypes.string.isRequired,
    allowedPersonCapacity: PropTypes.number.isRequired,
    listType: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    houseRules: PropTypes.arrayOf(PropTypes.shape({
      listsettings: PropTypes.shape({
        itemName: PropTypes.string.isRequired
      })
    })),
    checkIn: PropTypes.object.isRequired,
    checkOut: PropTypes.object.isRequired,
    guests: PropTypes.number.isRequired,
    basePrice: PropTypes.number.isRequired,
    delivery: PropTypes.number,
    currency: PropTypes.string.isRequired,
    weeklyDiscount: PropTypes.number,
    monthlyDiscount: PropTypes.number,
    listPhotos: PropTypes.array,
    serviceFees: PropTypes.shape({
      guest: PropTypes.shape({
        type: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
        currency: PropTypes.string.isRequired
      }).isRequired,
      host: PropTypes.shape({
        type: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
        currency: PropTypes.string.isRequired
      }).isRequired
    }).isRequired,
    base: PropTypes.string.isRequired,
    rates: PropTypes.object.isRequired,
    bookingType: PropTypes.string.isRequired,
    policyName: PropTypes.string.isRequired,
    formatMessage: PropTypes.any,
  };

  render() {
    const { guestEmail, hostDisplayName, hostPicture, coverPhoto, listPhotos, bookingType, policyName } = this.props;
    const { listId, listTitle, listType, city, state, country, allowedPersonCapacity } = this.props;
    const { houseRules, hostId, guestId, securityDeposit } = this.props;
    const { guests, checkIn, checkOut, startTime, endTime } = this.props;
    const { basePrice, delivery, currency, weeklyDiscount, monthlyDiscount } = this.props;
    const { serviceFees, base, rates, specialPricing, bookingData } = this.props;
    let guestServiceFee = 0, hostServiceFee = 0, priceForDays = 0;
    let discount = 0, discountType, total = 0, totalWithoutFees = 0;
    let momentStartDate, momentEndDate, dayDifference, isAverage = 0, totalWithoutServiceFee = 0;
    let currentDay, bookingSpecialPricing = [], isSpecialPriceAssigned = false;
    let isDayTotal = 0, formattedStartTime, formattedEndTime;

    if (checkIn != null && checkOut != null) {
      momentStartDate = moment(checkIn);
      momentEndDate = moment(checkOut);
      dayDifference = momentEndDate.diff(momentStartDate, 'days');
      // priceForDays = Number(basePrice) * Number(dayDifference);
      dayDifference = dayDifference + 1;

      //New 
      if (dayDifference > 0) {

        let stayedNights = [];
        // Find stayed nights
        for (let i = 0; i < dayDifference; i++) {
          let currentDate = moment(checkIn).add(i, 'day');
          stayedNights.push(currentDate);
        }

        if (stayedNights && stayedNights.length > 0) {
          stayedNights.map((item, key) => {
            let isSpecialPricing;
            if (item) {
              let pricingRow, currentPrice;
              currentDay = (moment(item).format('dddd').toLowerCase());
              // isSpecialPricing = specialPricing.find(o => moment(item).format('MM/DD/YYYY') == moment(o.blockedDates).format('MM/DD/YYYY'));
              isSpecialPricing = bookingData && bookingData.listBlockedPrice.find(o => moment(item).format('MM/DD/YYYY') == moment(o.blockedDates).format('MM/DD/YYYY'));

              if (isSpecialPricing && isSpecialPricing.isSpecialPrice) {
                isSpecialPriceAssigned = true;
                currentPrice = Number(isSpecialPricing.isSpecialPrice);
              } else {
                currentPrice = Number(basePrice);
              }
              // Price object
              pricingRow = {
                blockedDates: item,
                isSpecialPrice: currentPrice,
              };
              bookingSpecialPricing.push(pricingRow);
            }
          });
        }
      }

      if (isSpecialPriceAssigned) {
        bookingSpecialPricing.map((item, index) => {
          priceForDays = priceForDays + Number(item.isSpecialPrice);
        });
      } else {
        bookingSpecialPricing.map((item, index) => {
          priceForDays = priceForDays + Number(item.isSpecialPrice);
        });
      }
    }

    isAverage = Number(priceForDays) / Number(dayDifference);
    isDayTotal = isAverage.toFixed(2) * dayDifference;
    priceForDays = isDayTotal;
    totalWithoutServiceFee = (isDayTotal + delivery) - discount;


    if (serviceFees) {
      if (serviceFees.guest.type === 'percentage') {
        guestServiceFee = totalWithoutServiceFee * (Number(serviceFees.guest.value) / 100);
      } else {
        guestServiceFee = convert(base, rates, serviceFees.guest.value, serviceFees.guest.currency, currency);
      }

      if (serviceFees.host.type === 'percentage') {
        hostServiceFee = totalWithoutServiceFee * (Number(serviceFees.host.value) / 100);
      } else {
        hostServiceFee = convert(base, rates, serviceFees.host.value, serviceFees.host.currency, currency);
      }

    }

    if (dayDifference >= 7) {
      if (monthlyDiscount > 0 && dayDifference >= 28) {
        discount = (Number(priceForDays) * Number(monthlyDiscount)) / 100;
        discountType = monthlyDiscount + "% monthly price discount";
      } else {
        if (weeklyDiscount > 0) {
          discount = (Number(priceForDays) * Number(weeklyDiscount)) / 100;
          discountType = weeklyDiscount + "% weekly price discount";
        }
      }
    }

    total = (priceForDays + guestServiceFee + delivery + securityDeposit) - discount;
    totalWithoutFees = (priceForDays + delivery) - discount;

    let checkInDate = checkIn != null ? moment(checkIn).format('ddd, Do MMM') : '';
    let checkOutDate = checkOut != null ? moment(checkOut).format('ddd, Do MMM') : '';

    let initialValues = {
      listId,
      listTitle,
      hostId,
      guestId,
      guests,
      checkIn,
      checkOut,
      basePrice,
      currency,
      delivery,
      discount,
      discountType,
      guestServiceFee,
      hostServiceFee,
      total: totalWithoutFees,
      bookingType,
      paymentType: '2',
      guestEmail,
      isSpecialPriceAssigned,
      bookingSpecialPricing: JSON.stringify(bookingSpecialPricing),
      isSpecialPriceAverage: isAverage.toFixed(2),
      dayDifference,
      startTime,
      endTime,
      securityDeposit
    };

    formattedStartTime = formatTime(startTime);
    formattedEndTime = formatTime(endTime);

    return (

      <Grid>
        <Row>
          <Col md={5} mdPush={7}>
            <div className={cx(s.summaryCard, s.colCenter, s.paymentSectionShadow)}>
              <ListCoverPhoto
                className={cx(s.bannerImage, s.backgroundCover)}
                coverPhoto={coverPhoto}
                listPhotos={listPhotos}
                photoType={"x_medium"}
                bgImage
              />
              <div className={cx(s.hostProfilePhoto, s.pullRight, s.space3, 'bookingAvatarRTL')}>
                <div className={cx(s.profileAvatarLink, s.profileAvatarSection)}>
                  <Avatar
                    source={hostPicture}
                    title={hostDisplayName}
                    className={s.profileAvatar}
                  />
                </div>
              </div>
              <Panel className={cx(s.panelHeader, s.panelBoxShadow)}>
                <div className={cx(s.textMuted, s.space2)}>
                  <span><FormattedMessage {...messages.hostedBy} /> {hostDisplayName}</span>
                </div>
                <div className={cx(s.textLarge, s.space1)}>
                  <span>{listTitle}</span>
                </div>
                <div className={s.spaceTop2}>
                  <hr className={s.horizondalLine} />
                  <Row className={cx(s.spaceTop3, s.space3)}>
                    <Col xs={5} sm={5}>
                      <div className={cx(s.textGray, s.space1)}>
                        <span><FormattedMessage {...messages.checkIn} /></span>
                      </div>
                      <div className={s.checkInDate}>{checkInDate}</div>
                      {
                        formattedStartTime &&
                        <p> {formattedStartTime} </p>
                      }
                    </Col>
                    <Col xs={1} sm={1}>
                      <FontAwesome.FaChevronRight className={cx(s.textGray, s.chevronIcon, 'chevronIconRTL')} />
                    </Col>
                    <Col xs={5} sm={5} className={cx(s.pullRight, s.textLeft)}>
                      <div className={cx(s.textGray, s.space1)}>
                        <span><FormattedMessage {...messages.checkOut} /></span>
                      </div>
                      <div className={s.checkInDate}>{checkOutDate}</div>
                      {
                        formattedEndTime &&
                        <p> {formattedEndTime}  </p>
                      }
                    </Col>
                  </Row>
                  <hr className={s.horizondalLine} />
                </div>
                <PaymentDetails
                  basePrice={basePrice}
                  delivery={delivery}
                  securityDeposit={securityDeposit}
                  currency={currency}
                  dayDifference={dayDifference}
                  priceForDays={priceForDays}
                  discount={discount}
                  discountType={discountType}
                  serviceFees={guestServiceFee}
                  total={total}
                  bookingSpecialPricing={bookingSpecialPricing}
                  isSpecialPriceAssigned={isSpecialPriceAssigned}
                  isAverage={isAverage}
                />
                <div>
                  <span><FormattedMessage {...messages.cancellationPolicy} />: </span>
                  <span className={s.policyText}>{policyName}</span>
                </div>
              </Panel>
            </div>
          </Col>
          <Col md={7} mdPull={5}>
            <Elements>
            <PaymentForm
              hostDisplayName={hostDisplayName}
              houseRules={houseRules}
              allowedPersonCapacity={allowedPersonCapacity}
              initialValues={initialValues}
              listId={listId}
            />
            </Elements>
          </Col>
        </Row>
      </Grid>

    );
  }
}

export default withStyles(s)(Payment);
