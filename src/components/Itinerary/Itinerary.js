import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import moment from 'moment';
import {
  Row,
  Col,
  Panel,
}
  from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Itinerary.css';
import * as FontAwesome from 'react-icons/lib/fa';
import { connect } from 'react-redux';

// Components
import Avatar from '../Avatar';
import CurrencyConverter from '../CurrencyConverter';
import ListCoverPhoto from '../ListCoverPhoto';
import Link from '../Link';
import StarRating from '../StarRating';

// Helper
import { generateTime } from '../Receipt/helper';

// Locale
import messages from '../../locale/messages';
import ListNotFound from '../../routes/listNotFound/ListNotFound';
import { formatTime } from '../../helpers/formatting';
class Itinerary extends React.Component {
  static propTypes = {
    formatMessage: PropTypes.any,
    data: PropTypes.shape({
      id: PropTypes.number.isRequired,
      listId: PropTypes.number.isRequired,
      checkIn: PropTypes.string.isRequired,
      checkOut: PropTypes.string.isRequired,
      total: PropTypes.number.isRequired,
      guestServiceFee: PropTypes.number.isRequired,
      currency: PropTypes.string.isRequired,
      confirmationCode: PropTypes.number.isRequired,
      reservationState: PropTypes.string.isRequired,
      listData: PropTypes.shape({
        title: PropTypes.string.isRequired,
        street: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
        state: PropTypes.string.isRequired,
        country: PropTypes.string.isRequired,
        zipcode: PropTypes.string.isRequired,
        reviewsCount: PropTypes.number.isRequired,
        reviewsStarRating: PropTypes.number.isRequired,
        listingData: PropTypes.shape({
          checkInStart: PropTypes.string.isRequired,
          checkInEnd: PropTypes.string.isRequired
        }),
        coverPhoto: PropTypes.number,
        listPhotos: PropTypes.arrayOf({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired
        }),
      }),
      messageData: PropTypes.shape({
        id: PropTypes.number.isRequired
      }),
      hostData: PropTypes.shape({
        profileId: PropTypes.number.isRequired,
        displayName: PropTypes.string.isRequired,
        picture: PropTypes.string.isRequired
      })
    })
  };

  static defaultProps = {
    data: null
  };

  render() {
    const { data } = this.props;
    const { formatMessage } = this.props.intl;
    const { userId } = this.props;

    if (data === null) {
      return <div> <FormattedMessage {...messages.errorMessage} /> </div>;
    } else if (data.listData === null) {
      return <div><ListNotFound /></div>;
    } else {
      const { data, data: { startTime, endTime, id, listId, checkIn, checkOut, total, guestServiceFee, currency, confirmationCode, reservationState, hostId, guestId } } = this.props;
      const { data: { hostData: { profileId, displayName, picture } } } = this.props;
      const { data: { listData: { title, street, city, state, country, zipcode } } } = this.props;
      const { data: { listData: { coverPhoto, listPhotos, reviewsCount, reviewsStarRating } } } = this.props;
      const { data: { listData: { listingData: { checkInStart, checkInEnd } } } } = this.props;
      const { data: { messageData, securityDeposit } } = this.props;

      let checkInDate = checkIn ? moment(checkIn).format('ddd, Do MMM') : '';
      let checkOutDate = checkOut ? moment(checkOut).format('ddd, Do MMM') : '';

      let momentStartDate, momentEndDate, dayDifference, checkInTime, checkOutTime;
      let formattedStartTime, formattedEndTime;

      if (checkIn != null && checkOut != null) {
        momentStartDate = moment(checkIn).startOf('day');
        momentEndDate = moment(checkOut).startOf('day');
        dayDifference = momentEndDate.diff(momentStartDate, 'days');
        dayDifference = dayDifference + 1;
      }
      if (checkInStart === 'Flexible') {
        checkInTime = formatMessage(messages.flexibleCheckIn);
      } else {
        checkInTime = generateTime(checkInStart);
      }

      if (checkInEnd === 'Flexible') {
        checkOutTime = formatMessage(messages.flexibleCheckOut);
      } else {
        checkOutTime = generateTime(checkInEnd);
      }

      let subTotal = total + guestServiceFee;
      let subTotalWithSecurityDeposit = total + guestServiceFee + securityDeposit;
      let starRatingValue = 0;
      if (reviewsCount > 0 && reviewsStarRating > 0) {
        starRatingValue = Number(reviewsStarRating / reviewsCount)
      }

      let isHost = false;
      if (userId === hostId) {
        isHost = true;
      }

      formattedStartTime = formatTime(startTime);
      formattedEndTime = formatTime(endTime);

      return (
        <div className={cx(s.Container, s.spaceTop5, 'ViewProfile', s.space5)}>
          <div className={s.containerResponsive}>
            <Row>
              <Col md={7} lg={7}>
                <Col xs={12} sm={12} md={12} lg={12} className={cx(s.landingContainer, s.space6)}>
                  {
                    reservationState === "approved" && <h2 className={s.textCenter}>
                      <FormattedMessage {...messages.itinerayTitle} />
                    </h2>
                  }
                  <div className={s.textCenter}>
                    <span><FormattedMessage {...messages.reservationCode} /></span>
                    <span>&nbsp;</span>
                    <span>{confirmationCode}</span>
                    <span>.&nbsp;</span>
                    <Link to={"/users/trips/receipt/" + id} className={s.receiptPadding}>
                      <FormattedMessage {...messages.viewReceipt} />
                    </Link>
                  </div>
                </Col>
                <Panel className={s.cardPanel}>
                  <div className={s.paneBody}>
                    <Row className={cx(s.rowTable, s.dateRange)}>
                      <div className={s.hideSm}>
                        <Col sm={3} md={3} lg={3} xs={12} className={s.space2}>
                          <div>
                            <span className={s.textBold}>
                              <FormattedMessage {...messages.checkIn} />
                            </span>
                          </div>
                        </Col>
                        <Col sm={9} md={9} lg={9} xs={12} className={s.space2}>
                          <div>
                            <span>{checkInDate}</span>{' '} {' '}
                            <span>{formattedStartTime}</span>
                          </div>
                        </Col>
                        <Col sm={3} md={3} lg={3} xs={12}>
                          <div>
                            <span className={s.textBold}>
                              <FormattedMessage {...messages.checkOut} />
                            </span>
                          </div>
                        </Col>
                        <Col sm={9} md={9} lg={9} xs={12}>
                          <div>
                            <span>{checkOutDate}</span>{' '}  {' '}
                            <span>{formattedEndTime}</span>
                          </div>
                        </Col>
                      </div>
                      <div className={cx(s.textCenter, s.showSm)}>
                        <Col sm={6} xs={12} className={s.mobileMargin}>
                          <span className={s.textBold}>
                            <FormattedMessage {...messages.checkIn} />
                          </span><br />
                          <span>{checkInDate}</span><br />
                          <span>{formattedStartTime}</span>
                        </Col>
                        <Col sm={6} xs={12}>
                          <span className={s.textBold}>
                            <FormattedMessage {...messages.checkOut} />
                          </span><br />
                          <span>{checkOutDate}</span><br />
                          <span>{formattedEndTime}</span>
                        </Col>
                      </div>
                    </Row>
                    <hr className={s.hrMargin} />
                  </div>
                  <div className={cx(s.textCenter, s.panelBody)}>
                    <Row className={cx(s.rowTable)}>
                      <Col md={3} lg={3} className={s.space1}>
                        <span className={s.textBold}>
                          <FormattedMessage {...messages.location} />
                        </span>
                      </Col>
                      <Col md={9} lg={9}>
                        <div>
                          <span>{street}</span> <br />
                          <span>{city}, {state} {zipcode}</span> <br />
                          <span>{country}</span> <br />
                        </div>
                        <div className={s.spaceTop2}>
                          <a href={"/cars/" + listId} target={'_blank'}>
                            <FormattedMessage {...messages.viewListing} />
                          </a>
                        </div>
                      </Col>
                    </Row>
                    <hr className={s.hrMargin} />
                  </div>
                  <div className={cx(s.textCenter, s.panelBody)}>
                    <Row className={cx(s.rowTable)}>
                      <Col md={3} lg={3} className={s.space1}>
                        <span className={s.textBold}><FormattedMessage {...messages.carOwnerLabel} /></span>
                      </Col>
                      <Col md={3} lg={3} className={s.showSm}>
                        <div className={cx(s.profileAvatarSection, s.profileAvatarLink)}>
                          <Avatar
                            source={picture}
                            height={115}
                            width={115}
                            className={s.profileAvatar}
                            withLink
                            profileId={profileId}
                          />
                        </div>
                      </Col>
                      {
                        !isHost && <Col md={9} lg={9}>
                          <div className={cx(s.avatarSection, s.avarPadding, s.hideSm)}>
                            <div className={cx(s.profileAvatarSection, s.profileAvatarLink)}>
                              <Avatar
                                source={picture}
                                height={115}
                                width={115}
                                className={s.profileAvatar}
                                withLink
                                profileId={profileId}
                              />
                            </div>
                          </div>
                          <div className={cx(s.spaceTop1, s.avatarSection)}>
                            <div>{displayName}</div>
                            <Link to={"/message/" + messageData.id + "/renter"}>
                              <FormattedMessage {...messages.messageHost} />
                            </Link>
                          </div>
                        </Col>
                      }
                    </Row>
                    <hr className={s.hrMargin} />
                  </div>
                  <div className={cx(s.textCenter, s.panelBody)}>
                    {securityDeposit > 0 && <>
                      <Row className={cx(s.rowTable)}>
                        <Col md={3} lg={3} className={s.space1}>
                          <span className={s.textBold}><FormattedMessage {...messages.securityDeposit} /></span>
                        </Col>
                        <Col md={9} lg={9}>
                          <table className={cx('table')}>
                            <tbody>
                              <tr className={s.displayFlex}>
                                <td className={cx(s.noBorder, s.noPadding)}>
                                  <CurrencyConverter
                                    amount={securityDeposit}
                                    from={currency}
                                  />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </Col>
                      </Row>
                      <hr className={s.hrMargin} />
                    </>}
                    <Row className={cx(s.rowTable)}>
                      <Col md={3} lg={3} className={s.space1}>
                        <span className={s.textBold}><FormattedMessage {...messages.billing} /></span>
                      </Col>
                      <Col md={9} lg={9}>
                        <table className={cx('table')}>
                          <tbody>
                            <tr className={s.displayFlex}>
                              <td className={cx(s.noBorder, s.noPadding)}>
                                <CurrencyConverter
                                  amount={subTotal}
                                  from={currency}
                                />
                                <span className={s.billingArrow}>-</span>
                                {dayDifference} {dayDifference > 1 ? formatMessage(messages.nights) : formatMessage(messages.night)}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </Col>
                    </Row>
                    <hr className={s.hrMargin} />
                  </div>
                  <div className={cx(s.textCenter, s.panelBody)}>
                    <Row className={cx(s.rowTable)}>
                      <Col md={3} lg={3} className={s.space1}>
                        <span className={s.textBold}><FormattedMessage {...messages.totalPaid} /></span>
                      </Col>
                      <Col md={9} lg={9}>
                        <table className={cx('table')}>
                          <tbody>
                            <tr className={s.displayFlex}>
                              <td className={cx(s.noBorder, s.noPadding)}>
                                <CurrencyConverter
                                  amount={subTotalWithSecurityDeposit}
                                  from={currency}
                                />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </Col>
                    </Row>
                  </div>
                </Panel>
              </Col>
              <Col lg={5} md={5} className={cx(s.bannerMarginTop)}>
                <div className={cx(s.imgContainer)}>
                  <div className={cx(s.parent)}>
                    <div className={cx(s.children)}>
                      <div className={cx(s.content)}>
                        <Link to={"/cars/" + listId}>
                          <ListCoverPhoto
                            className={cx(s.imageContent)}
                            coverPhoto={coverPhoto}
                            listPhotos={listPhotos}
                            photoType={"x_medium"}
                            bgImage
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className={s.textSection}>
                    <h1 className={cx(s.spaceTop2, s.space1, s.titleText)}>
                      <Link to={"/cars/" + listId} className={s.titleText}>
                        {title}
                      </Link>
                    </h1>
                    <div className={cx(s.space1)}>
                      <a className={s.textMuted}>{city}, {state}, {country}</a>
                    </div>
                    <div>
                      <span><StarRating value={starRatingValue} name={"Itinerary"} className={cx(s.starReview, 'floatRightRTL')} /></span>
                      <span className={s.textMuted}>&nbsp;{reviewsCount} {reviewsCount > 1 ? formatMessage(messages.reviews) : formatMessage(messages.review)}</span>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      );
    }
  }
}

const mapState = (state) => ({
  userId: state.account.data.userId,
});

const mapDispatch = {};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(Itinerary)));
