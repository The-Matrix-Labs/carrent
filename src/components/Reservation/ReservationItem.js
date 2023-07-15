import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';

// Redux
import { connect } from 'react-redux';

import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Reservation.css';
import logoUrl from './logo-small.jpg';
import {
  Button,
  Grid,
  Row,
  Col,
  Label
} from 'react-bootstrap';

// Component
import Link from '../Link';
import Avatar from '../Avatar';
import CurrencyConverter from '../CurrencyConverter';

// Redux action
import { sendMessageAction } from '../../actions/message/sendMessageAction';

// Locale
import messages from '../../locale/messages';
import carRed from '../../../public/SiteIcons/steering-4.png';
import carGreen from '../../../public/SiteIcons/steering-3.png';
import carYellow from '../../../public/SiteIcons/steering-2.png';
import carBlue from '../../../public/SiteIcons/steering-1.png';
import HostClaimModal from '../HostClaimModal/HostClaimModal';
import { convert } from '../../helpers/currencyConvertion';


class ReservationItem extends Component {
  static propTypes = {
    noList: PropTypes.bool,
    userType: PropTypes.string.isRequired,
    threadId: PropTypes.number.isRequired,
    reservationId: PropTypes.number.isRequired,
    reservationState: PropTypes.string.isRequired,
    checkIn: PropTypes.string.isRequired,
    checkOut: PropTypes.string.isRequired,
    guests: PropTypes.number.isRequired,
    listId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    street: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    zipcode: PropTypes.string.isRequired,
    profileId: PropTypes.number.isRequired,
    displayName: PropTypes.string.isRequired,
    picture: PropTypes.string,
    guestServiceFee: PropTypes.number.isRequired,
    hostServiceFee: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    sendMessageAction: PropTypes.any.isRequired,
    phoneNumber: PropTypes.string,
    email: PropTypes.string,
    formatMessage: PropTypes.any,
  };

  static defaultProps = {
    noList: false,
    checkIn: null,
    checkOut: null
  };

  state = { 
    showModal: false 
  };

  sendMessage(type) {
    const { sendMessageAction, threadId, userType, checkIn, checkOut, guests, reservationId } = this.props;
    sendMessageAction(threadId, userType, null, type, checkIn, checkOut, guests, reservationId);
  }

  reservationStyle() {
    const { reservationState } = this.props;
    let style, label;
    switch (reservationState) {
      case 'pending':
        label = <FormattedMessage {...messages.messageStatus5} />
        style = 'primary';
        break;
      case 'expired':
        label = <FormattedMessage {...messages.messageStatus9} />
        style = 'warning';
        break;
      case 'approved':
        label = <FormattedMessage {...messages.messageStatus4} />
        style = 'success';
        break;
      case 'declined':
        label = <FormattedMessage {...messages.messageStatus3} />
        style = 'danger';
        break;
      case 'completed':
        label = <FormattedMessage {...messages.panelHeader2} />
        style = 'success';
        break;
      case 'cancelled':
        label = <FormattedMessage {...messages.messageStatus11} />
        style = 'danger';
        break;
    }
    return <Label className={s.labelText} bsStyle={style}>{label}</Label>;
  }

  changeModalState = (status = false) => this.setState({ showModal: status });

  render() {
    const { threadId, userType, reservationId, reservationState, checkIn, checkOut, createdAt } = this.props;
    const { listId, title, street, city, state, country, zipcode } = this.props;
    const { profileId, displayName, picture, phoneNumber, email } = this.props;
    const { guestServiceFee, hostServiceFee, total, currency, refetchData } = this.props;
    const { noList, data, cancellationDetails, currencyRates } = this.props;
    const { showModal } = this.state;

    console.log('showModalshowModal--->>>', showModal);

    let imgSrc, modalInitialValues = {};
    if (data) {
      modalInitialValues.securityDeposit = convert(currencyRates.base, currencyRates.rates, data.securityDeposit, currency, currencyRates.to).toFixed(2);
      if (data.claimStatus && data.claimStatus != 'pending') {
        modalInitialValues.claimAmount = convert(currencyRates.base, currencyRates.rates, data.claimAmount, currency, currencyRates.to).toFixed(2);
        modalInitialValues.claimReason = data.claimReason;
        modalInitialValues.claimImages = data.claimImages;
      }
    }

    if (reservationState == 'completed' || reservationState == 'approved') {
      imgSrc = carGreen
    } else if (reservationState == 'expired') {
      imgSrc = carYellow
    } else if (reservationState == 'pending') {
      imgSrc = carBlue
    } else if (reservationState == 'declined') {
      imgSrc = carRed
    } else if (reservationState == 'cancelled') {
      imgSrc = carRed
    }

    let checkInDate = checkIn ? moment(checkIn).format('Do MMM - ') : '';
    let checkOutDate = checkOut ? moment(checkOut).format('Do MMM, YYYY') : '';
    let createdDate = createdAt ? moment(createdAt).format('Do MMM, YYYY') : '';
    let subTotal = 0, enableCancel = false, enableIternary = false;
    if (reservationState === 'approved') {
      enableCancel = true;
      enableIternary = true;
    }
    if (userType === 'owner') {
      subTotal = total - hostServiceFee;
    } else {
      subTotal = total + guestServiceFee
    }
    let checkOutDifference = 0;
    if (reservationState == 'completed') checkOutDifference = moment().diff(moment(checkOut), 'hour', true);
    if (cancellationDetails && reservationState == 'cancelled') {
      let todayDiff = moment().diff(moment(checkIn), 'hour', true);
      if (todayDiff > 0) checkOutDifference = moment().diff(moment(cancellationDetails.createdAt), 'hour', true);
    }

    return (
      <div className={s.positionRelative}>
        {
          showModal && <HostClaimModal
            refetchData={refetchData}
            claimed={Boolean(data && data.claimStatus && data.claimStatus != 'pending')}
            reservationId={reservationId}
            show={showModal}
            currency={currency}
            changeModalState={this.changeModalState}
            initialValues={modalInitialValues}
          />
        }
        <div className={s.displayTable}>
          <div className={s.displayTableRow}>
            <div className={cx(s.displayTableCell, s.borderLine, s.dateSectionWidth, s.dateSection, 'borderLineRTL')}>
              <div className={cx('hidden-xs hidden-sm')}>
                <p className={cx(s.noMargin, s.dateFontNew, s.dateFontMargin, s.fontWeight, 'dateFontMarginRTL')}>{createdDate}</p>
              </div>
            </div>
            <div className={cx(s.circle, 'circleRTL')}>
              <img src={imgSrc} className={s.circleImg} />
            </div>
            <div className={cx(s.positionRelative, s.spaceTop3)}>
              <div className={cx(s.displayTableCell, s.mainSection, s.space2, s.afterSection, 'reservationAfterSection')}>
                <div className={s.displayTable}>
                  <div className={s.displayTableRow}>
                    <div className={cx(s.sectionTitleLight, s.displayTableCell, s.addressWidth, s.responsiveDisplay, s.tabScreenresolution)}>
                      {
                        !noList && <div>
                          <a href={"/cars/" + listId} target={'_blank'} className={s.linkTitle}> {title} </a><br />
                        </div>
                      }
                      <span>{checkInDate}{checkOutDate}</span><br />
                      {
                        noList && userType === 'renter' && <span className={s.errorMessage}> <FormattedMessage {...messages.noList} /> </span>
                      }
                      {
                        noList && userType === 'owner' && <span className={s.errorMessageLeft}> <FormattedMessage {...messages.notexist} /> </span>
                      }


                      {
                        !noList && <div>
                          <span>{street}</span> <br />
                          <span>{city}, {state} {zipcode} </span>
                        </div>
                      }
                      <p className={cx(s.sectionTitleLight, s.spaceTop1)}>
                        {this.reservationStyle()}
                      </p>
                    </div>
                    <div className={cx(s.displayTableCell, s.logoWidth, s.alignCenter, s.responsiveDisplay, s.responsiveAvatarSection, s.tabAvatarSection, 'textAlignRightRTL')}>
                      <div className={cx(s.mediaContainer, s.mediaWidth, s.responsiveAvatarImg, 'responsiveAvatarImgRTL')}>
                        <Avatar
                          source={picture}
                          height={50}
                          width={50}
                          title={displayName}
                          className={cx(s.profileAvatar, s.profileAvatarLink)}
                          withLink={noList ? false : true}
                          profileId={profileId}
                        />
                      </div>
                      <Link to={"/users/show/" + profileId} className={s.sectionTitleLight}>{displayName}</Link> <br />
                      <ul className={cx(s.listLayout, 'listContainerRTL')}>
                        <li>{phoneNumber}</li>
                        <li className={s.textWordBreak}>{email}</li>
                      </ul>
                    </div>
                    <div className={cx(s.displayTableCell, s.responsiveDisplay, s.tabPriceSection)}>
                      {(userType === 'renter' || (userType === 'owner' && (reservationState != 'cancelled' && reservationState != 'expired'))) && <p className={cx(s.space1, s.fontWeight, s.dateFont)}>
                        <CurrencyConverter
                          amount={subTotal}
                          className={s.bookItPrice}
                          from={currency}
                        />
                      </p>}

                      {(userType === 'owner' && (reservationState == 'cancelled' || reservationState == 'expired')) && <><p className={cx(s.space1, s.fontWeight, s.dateFont)}>
                        <FormattedMessage {...messages.estimatedEarnings} />: <CurrencyConverter
                          amount={subTotal}
                          className={s.bookItPrice}
                          from={currency}
                        />
                      </p>
                        <p className={cx(s.space1, s.fontWeight, s.dateFont)}>
                          <FormattedMessage {...messages.actualEarnings} />: <CurrencyConverter
                            amount={(reservationState == 'cancelled' && cancellationDetails) ? cancellationDetails.payoutToHost : 0}
                            className={s.bookItPrice}
                            from={currency}
                          />
                        </p></>}

                      <ul className={cx(s.listLayout, 'listContainerRTL')}>

                        {
                          !noList && <li><Link to={"/message/" + threadId + "/" + userType}> <FormattedMessage {...messages.messageHistroy} /></Link></li>
                        }

                        {
                          noList && <li><Link to={"/#"}><FormattedMessage {...messages.contactSupport} /></Link></li>
                        }

                        {
                          !noList && userType === 'renter' && enableIternary && <li><Link to={"/users/trips/itinerary/" + reservationId}> <FormattedMessage {...messages.viewItinerary} /></Link></li>
                        }
                        {
                          !noList && userType === 'renter' && <li><Link to={"/users/trips/receipt/" + reservationId}><FormattedMessage {...messages.viewReceipt} /></Link></li>
                        }
                        {
                          !noList && userType === 'owner' && (reservationState === 'approved' || reservationState === 'completed' || (reservationState === 'cancelled' && (cancellationDetails && cancellationDetails.payoutToHost > 0))) && <li><Link to={"/users/trips/receipt/" + reservationId}><FormattedMessage {...messages.viewReceipt} /></Link></li>
                        }
                        {
                          !noList &&
                          userType === 'owner' &&
                          data.securityDeposit > 0 &&
                          data.claimStatus == 'pending' &&
                          checkOutDifference > 0 &&
                          checkOutDifference < 24 && <li>
                            <Link
                              onClick={() => this.changeModalState(true)}
                            >
                              <FormattedMessage {...messages.claimDamage} />
                            </Link>
                          </li>
                        }
                        {
                          !noList && userType === 'owner' && data.securityDeposit > 0 && data.claimStatus == 'requested' && <li><Link onClick={() => this.changeModalState(true)}><FormattedMessage {...messages.requestedForClaim} /></Link></li>
                        }
                        {
                          !noList && userType === 'owner' && data.securityDeposit > 0 && data.claimStatus == 'approved' && <li><Link onClick={() => this.changeModalState(true)}><FormattedMessage {...messages.claimDetails} /></Link></li>
                        }
                        {
                          !noList && userType === 'owner' && reservationState === 'pending' && <li>
                            <a onClick={() => this.sendMessage('approved')}>
                              <FormattedMessage {...messages.approve} />
                            </a>
                          </li>
                        }
                        {
                          !noList && userType === 'owner' && reservationState === 'pending' && <li>
                            <a onClick={() => this.sendMessage('declined')}>
                              <FormattedMessage {...messages.decline} />
                            </a>
                          </li>
                        }
                        {
                          !noList && enableCancel && <li> <Link to={"/cancel/" + reservationId + "/" + userType}><FormattedMessage {...messages.cancel} /></Link></li>
                        }

                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <tr className={'hidden-xs'}>
          <td className={s.sectionTitleLight}>
            <span>{checkInDate}{checkOutDate}</span><br />
            {
              noList && userType === 'guest' && <span className={s.errorMessage}> <FormattedMessage {...messages.noList} /> </span>
            }
            {
              noList && userType === 'host' && <span className={s.errorMessage}> <FormattedMessage {...messages.notexist} /> </span>
            }

            {
              !noList && <div>
                <a href={"/cars/" + listId} target={'_blank'}> {title} </a><br />
                <span>{street}</span> <br />
                <span>{city}, {state} {zipcode} </span>
              </div>
            }
            <p className={s.sectionTitleLight}>
              {this.reservationStyle()}
            </p>
          </td>
          <td className={s.sectionTitleLight}>
            <div className={s.mediaContainer}>
              <Avatar
                source={picture}
                height={50}
                width={50}
                title={displayName}
                className={cx(s.profileAvatar, s.profileAvatarLink)}
                withLink={noList ? false : true}
                profileId={profileId}
              />
            </div>
            <Link to={"/users/show/" + profileId} className={s.sectionTitleLight}>{displayName}</Link> <br />
            <ul className={s.listLayout}>
              <li>{phoneNumber}</li>
              <li>{email}</li>
            </ul>
          </td>
          <td className={s.sectionTitleLight}>
            <p>
              <CurrencyConverter
                amount={subTotal}
                className={s.bookItPrice}
                from={currency}
              />

            </p>
            <ul className={s.listLayout}>

              {
                !noList && <li className={s.space1}><Link to={"/message/" + threadId + "/" + userType}> <FormattedMessage {...messages.messageHistroy} /></Link></li>
              }

              {
                noList && <li className={s.space1}><Link to={"/#"}><FormattedMessage {...messages.contactSupport} /></Link></li>
              }

              {
                !noList && userType === 'guest' && enableIternary && <li className={s.space1}><Link to={"/users/trips/itinerary/" + reservationId}> <FormattedMessage {...messages.viewItinerary} /></Link></li>
              }
              {
                !noList && userType === 'guest' && <li className={s.space1}><Link to={"/users/trips/receipt/" + reservationId}><FormattedMessage {...messages.viewReceipt} /></Link></li>
              }
              {
                !noList && userType === 'host' && reservationState === 'approved' && <li><Link to={"/users/trips/receipt/" + reservationId}><FormattedMessage {...messages.viewReceipt} /></Link></li>
              }
              {
                !noList && userType === 'host' && reservationState === 'pending' && <li className={s.space1}>
                  <a onClick={() => this.sendMessage('approved')}>
                    <FormattedMessage {...messages.approve} />
                  </a>
                </li>
              }
              {
                !noList && userType === 'host' && reservationState === 'pending' && <li className={s.space1}>
                  <a onClick={() => this.sendMessage('declined')}>
                    <FormattedMessage {...messages.decline} />
                  </a>
                </li>
              }
              {
                !noList && enableCancel && <li> <Link to={"/cancel/" + reservationId + "/" + userType}><FormattedMessage {...messages.cancel} /></Link></li>
              }

            </ul>
          </td>
        </tr> */}
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  currencyRates: state.currency
});

const mapDispatch = {
  sendMessageAction,
};

export default withStyles(s)(connect(mapState, mapDispatch)(ReservationItem));