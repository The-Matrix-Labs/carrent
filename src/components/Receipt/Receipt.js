import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';

import moment from 'moment';
import {
    Grid,
    Row,
    Col,
    Panel,
    Table,
    Tooltip,
    OverlayTrigger,
    Button
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Receipt.css';
import * as FontAwesome from 'react-icons/lib/fa';
import { graphql, gql, compose } from 'react-apollo';

//Images
import Faq from './question.svg'

// Components
import CurrencyConverter from '../CurrencyConverter';
import Link from '../Link';

// Helper
import { generateTime } from './helper';

// Locale
import messages from '../../locale/messages';
import ListNotFound from '../../routes/listNotFound/ListNotFound';
import { formatTime } from '../../helpers/formatting';
import HostClaimModal from '../HostClaimModal/HostClaimModal';
import { convert } from '../../helpers/currencyConvertion';

class PaymentReceipt extends React.Component {

    static propTypes = {
        formatMessage: PropTypes.any,
        siteName: PropTypes.string.isRequired,
        data: PropTypes.shape({
            id: PropTypes.number.isRequired,
            listId: PropTypes.number.isRequired,
            checkIn: PropTypes.string.isRequired,
            checkOut: PropTypes.string.isRequired,
            basePrice: PropTypes.number.isRequired,
            delivery: PropTypes.number.isRequired,
            total: PropTypes.number.isRequired,
            discount: PropTypes.number.isRequired,
            discountType: PropTypes.string,
            guestServiceFee: PropTypes.number.isRequired,
            currency: PropTypes.string.isRequired,
            confirmationCode: PropTypes.number.isRequired,
            createdAt: PropTypes.string.isRequired,
            updatedAt: PropTypes.string.isRequired,
            listData: PropTypes.shape({
                id: PropTypes.number.isRequired,
                title: PropTypes.string.isRequired,
                street: PropTypes.string.isRequired,
                city: PropTypes.string.isRequired,
                state: PropTypes.string.isRequired,
                country: PropTypes.string.isRequired,
                zipcode: PropTypes.string.isRequired,
                listingData: PropTypes.shape({
                    checkInStart: PropTypes.string.isRequired,
                    checkInEnd: PropTypes.string.isRequired
                }),
                settingsData: PropTypes.arrayOf(PropTypes.shape({
                    id: PropTypes.number,
                    listsettings: PropTypes.shape({
                        itemName: PropTypes.string.isRequired
                    })
                }))
            }),
            hostData: PropTypes.shape({
                displayName: PropTypes.string.isRequired,
            }),
            guestData: PropTypes.shape({
                displayName: PropTypes.string.isRequired,
            }),
            bookingSpecialPricing: PropTypes.array,
        })
    };

    static defaultProps = {
        data: null
    };

    state = { showModal: false };

    print() {
        window.print();
    }

    changeModalState = (status = false) => this.setState({ showModal: status });

    render() {
        const { data, siteName, userId } = this.props;
        const { formatMessage } = this.props.intl;

        function LinkWithTooltip({ id, children, href, tooltip }) {
            return (
                <OverlayTrigger
                    overlay={<Tooltip className={s.tooltip} id={id}>{tooltip}</Tooltip>}
                    placement="top"
                    delayShow={300}
                    delayHide={150}
                >
                    {children}
                </OverlayTrigger>
            );
        }



        if (!data) {
            return <div> <FormattedMessage {...messages.errorMessage} /> </div>;
        } else if (!data.listData) {
            return <ListNotFound />
        } else {
            const { data, data: { id, checkIn, checkOut, confirmationCode, createdAt, updatedAt, hostId, guestId, startTime, endTime } } = this.props;
            const { data: { basePrice, delivery, total, discount, discountType, guestServiceFee, currency, hostServiceFee } } = this.props;
            const { data: { hostData, guestData, licenseNumber, firstName, middleName, lastName, dateOfBirth, countryCode, countryLabel } } = this.props;
            const { data: { listData: { title, street, city, state, country, zipcode } } } = this.props;
            const { data: { listData: { listingData: { checkInStart, checkInEnd } } } } = this.props;
            const { data: { listData: { settingsData } }, refetch, currencyRates } = this.props;
            const { data: { bookingSpecialPricing, securityDeposit, claimRefund, claimAmount, claimStatus, claimImages, claimReason, cancellationDetails, reservationState, claimPayout } } = this.props;
            const { data: { claimRefundedAt } } = this.props;
            const { showModal } = this.state;
            let roomType = settingsData[0].listsettings.itemName;
            let createdDate = createdAt ? moment(createdAt).format('ddd, MMM Do, YYYY ') : '';
            let updatedDate = updatedAt ? moment(updatedAt).format('ddd, MMM Do, YYYY ') : '';
            let claimRefundedDate = claimRefundedAt ? moment(claimRefundedAt).format('ddd, MMM Do, YYYY ') : '';
            let checkInDate = checkIn ? moment(checkIn).format('ddd, Do MMM') : '';
            let checkOutDate = checkOut ? moment(checkOut).format('ddd, Do MMM') : '';
            let momentStartDate, momentEndDate, dayDifference, dayPrice = 0, checkInTime, checkOutTime;
            let isSpecialPricingAssinged = (bookingSpecialPricing && bookingSpecialPricing.length > 0) ? true : false;
            let isAverage = 0, subTotal, userType, modalInitialValues = {};
            let isDayTotal = 0, formattedStartTime, formattedEndTime;
            modalInitialValues.securityDeposit = convert(currencyRates.base, currencyRates.rates, securityDeposit, currency, currencyRates.to).toFixed(2);
            if (claimStatus && claimStatus != 'pending') {
                modalInitialValues.claimAmount = convert(currencyRates.base, currencyRates.rates, claimAmount, currency, currencyRates.to).toFixed(2);
                modalInitialValues.claimReason = claimReason;
                modalInitialValues.claimImages = claimImages;
            }

            if (checkIn != null && checkOut != null) {
                momentStartDate = moment(checkIn).startOf('day');
                momentEndDate = moment(checkOut).startOf('day');
                dayDifference = momentEndDate.diff(momentStartDate, 'days');
                dayDifference = dayDifference + 1;

                if (isSpecialPricingAssinged) {
                    bookingSpecialPricing && bookingSpecialPricing.map((item, index) => {
                        dayPrice = dayPrice + Number(item.isSpecialPrice);
                    });
                } else {
                    dayPrice = basePrice * dayDifference;
                }
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

            if (userId === hostId) {
                userType = 'owner';
                subTotal = total - hostServiceFee;
            } else {
                userType = 'renter';
                subTotal = total + guestServiceFee + securityDeposit;
            }

            isAverage = Number(dayPrice) / Number(dayDifference);
            isDayTotal = isAverage.toFixed(2) * dayDifference;
            dayPrice = isDayTotal;

            formattedStartTime = formatTime(startTime);
            formattedEndTime = formatTime(endTime);

            let checkOutDifference = 0;
            if (reservationState == 'completed') checkOutDifference = moment().diff(moment(checkOut), 'hour', true);
            if (cancellationDetails && reservationState == 'cancelled') {
                let todayDiff = moment().diff(moment(checkIn), 'hour', true);
                if (todayDiff > 0) checkOutDifference = moment().diff(moment(cancellationDetails.createdAt), 'hour', true);
            }

            return (
                <div className={cx(s.containerResponsive, s.spaceTop4)}>
                    {showModal && <HostClaimModal
                        refetchData={refetch}
                        claimed={Boolean(claimStatus && claimStatus != 'pending')}
                        reservationId={id}
                        show={showModal}
                        currency={currency}
                        changeModalState={this.changeModalState}
                        initialValues={modalInitialValues}
                    />}
                    <div className={cx(s.space4, s.rowTable)}>
                        <Col xs={12} sm={12} md={3} lg={3} className={s.noPadding}>
                            <span className={s.textBold}>{createdDate}</span><br />
                            <span><FormattedMessage {...messages.receipt} /> # {id}</span>
                        </Col>
                    </div>

                    <div>
                        <Panel className={s.receiptPanel}>
                            <h2><FormattedMessage {...messages.customerReceipt} /></h2>
                            <div className={cx(s.spaceTop1, s.pullRight, 'floatLeftRTL')}>
                                <a className={cx(s.button, s.btnPrimaryBorder, s.btnlarge, "hidden-print")} onClick={this.print}>
                                    <FormattedMessage {...messages.receipt} />
                                </a>
                            </div>
                            <div className={s.space1}>
                                <h6><FormattedMessage {...messages.confirmationCode} /> </h6>
                            </div>
                            <div className={s.space1}>
                                <h4>{confirmationCode}</h4>
                            </div>
                            <hr />
                            <Row className={s.space4}>
                                <Col sm={3} md={3} lg={3}>
                                    <span className={s.textBold}><FormattedMessage {...messages.ownersName} /></span>
                                    <p>{hostData.displayName}</p>
                                </Col>
                                <Col sm={3} md={3} lg={3}>
                                    <span className={s.textBold}><FormattedMessage {...messages.travelDestination} /></span>
                                    <p>{city}</p>
                                </Col>
                                <Col sm={3} md={3} lg={3}>
                                    <span className={s.textBold}><FormattedMessage {...messages.duration} /></span>
                                    <p>{dayDifference} {dayDifference > 1 ? formatMessage(messages.nights) : formatMessage(messages.night)}</p>
                                </Col>
                                <Col sm={3} md={3} lg={3}>
                                    <span className={s.textBold}><FormattedMessage {...messages.whatKindOfPlace} /></span>
                                    <p>{roomType}</p>
                                </Col>
                            </Row>
                            <hr />

                            <Row className={s.space4}>
                                <Col sm={3} md={3} lg={3} className={s.wordBreak}>
                                    <span className={s.textBold}><FormattedMessage {...messages.location} /></span>
                                    <h4>{title}</h4>
                                    <p>
                                        <span>{street}</span> <br />
                                        <span>{city}, {state} {zipcode}</span> <br />
                                        <span>{country}</span> <br />
                                    </p>
                                </Col>
                                <Col sm={3} md={3} lg={3} className={s.wordBreak}>
                                    <span className={s.textBold}><FormattedMessage {...messages.checkIn} /></span>
                                    <p>
                                        <span>{checkInDate}</span><br />
                                        <span>{formattedStartTime}</span>
                                    </p>
                                </Col>
                                <Col sm={3} md={3} lg={3} className={s.wordBreak}>
                                    <span className={s.textBold}><FormattedMessage {...messages.checkOut} /></span>
                                    <p>
                                        <span>{checkOutDate}</span><br />
                                        <span>{formattedEndTime}</span>
                                    </p>
                                </Col>
                                <Col sm={3} md={3} lg={3} className={s.wordBreak}>
                                    <span className={s.textBold}><FormattedMessage {...messages.driverInfo} /></span>
                                    <p>{firstName}</p>
                                    {middleName && <p>{middleName}</p>}
                                    <p>{lastName}</p>
                                    <p>{licenseNumber}</p>
                                    <p><FormattedMessage {...messages.dob} />:&nbsp;{dateOfBirth}</p>
                                    {countryLabel && <p>{countryLabel}</p>}
                                </Col>
                            </Row>
                            <hr />
                            <Row>
                                <Col xs={12} sm={12} md={12} lg={12}>
                                    <h2><FormattedMessage {...messages.reservationCharges} /></h2>
                                    <table className={cx('table', 'table-bordered')}>
                                        <tbody>

                                            <tr className={cx(s.positionR)}>
                                                <th className={s.rowWidth}>
                                                    <div className={cx(s.specialPriceIcon, "hidden-print")}>
                                                        {
                                                            isSpecialPricingAssinged &&
                                                            <span className={s.iconSection}>
                                                                <img src={Faq} className={cx(s.faqImage, 'faqImageRTL')} />
                                                                {/* <FontAwesome.FaQuestion className={s.toolTipColor} /> */}
                                                            </span>

                                                        }

                                                        <div className={cx(s.tltip, s.relativeSection, 'relativeSectionRTL')}>
                                                            <FormattedMessage {...messages.averageRate} />
                                                        </div>
                                                    </div>
                                                    <span className={cx('directionLtr', s.displayInline)}>
                                                        <CurrencyConverter
                                                            //amount={basePrice}
                                                            amount={isAverage}
                                                            from={currency}
                                                        />
                                                        {' x'} {dayDifference} {dayDifference > 1 ? formatMessage(messages.nights) : formatMessage(messages.night)}
                                                    </span>
                                                    {/* {
                                                        isSpecialPricingAssinged && <LinkWithTooltip
                                                            tooltip="Average rate per day for your trip."
                                                            // href="#"
                                                            id="tooltip-1"
                                                        >
                                                            <span className={s.iconSection}>
                                                                <FontAwesome.FaQuestion className={s.instantIcon} />
                                                            </span>
                                                        </LinkWithTooltip>
                                                    } */}

                                                </th>

                                                <td>
                                                    <CurrencyConverter
                                                        amount={dayPrice}
                                                        from={currency}
                                                    />
                                                </td>

                                            </tr>

                                            {
                                                delivery > 0 && <tr>
                                                    <th className={s.rowWidth}>
                                                        <FormattedMessage {...messages.cleaningFee} />
                                                    </th>
                                                    <td>
                                                        <CurrencyConverter
                                                            amount={delivery}
                                                            from={currency}
                                                        />
                                                    </td>
                                                </tr>
                                            }
                                            {
                                                discount > 0 && <tr>
                                                    <th className={s.rowWidth}>{discountType}</th>
                                                    <td>
                                                        -{' '}<CurrencyConverter
                                                            amount={discount}
                                                            from={currency}
                                                        />
                                                    </td>
                                                </tr>
                                            }
                                            {
                                                userType === 'renter' && guestServiceFee > 0 && <tr>
                                                    <th className={s.rowWidth}><FormattedMessage {...messages.serviceFee} /></th>
                                                    <td>
                                                        <CurrencyConverter
                                                            amount={guestServiceFee}
                                                            from={currency}
                                                        />
                                                    </td>
                                                </tr>
                                            }
                                            {
                                                userType === 'owner' && hostServiceFee > 0 && <tr>
                                                    <th className={s.rowWidth}><FormattedMessage {...messages.serviceFee} /></th>
                                                    <td> - &nbsp;
                                                        <CurrencyConverter
                                                            amount={hostServiceFee}
                                                            from={currency}
                                                        />
                                                    </td>
                                                </tr>
                                            }
                                            {
                                                userType === 'renter' && securityDeposit > 0 && <tr>
                                                    <th className={s.rowWidth}>
                                                        <FormattedMessage {...messages.securityDeposit} />
                                                    </th>
                                                    <td>
                                                        <CurrencyConverter
                                                            amount={securityDeposit}
                                                            from={currency}
                                                        />
                                                    </td>
                                                </tr>
                                            }
                                            {userType === 'renter' || (userType === 'owner' && (data.reservationState != 'cancelled')) && <tr>
                                                <th className={s.rowWidth}><FormattedMessage {...messages.total} /></th>
                                                <td>
                                                    <CurrencyConverter
                                                        amount={subTotal}
                                                        from={currency}
                                                    />
                                                </td>
                                            </tr>}
                                            {(userType === 'owner' && (reservationState == 'cancelled')) && <tr>
                                                <th className={s.rowWidth}><FormattedMessage {...messages.estimatedEarnings} /></th>
                                                <td>
                                                    <CurrencyConverter
                                                        amount={subTotal}
                                                        from={currency}
                                                    />
                                                </td>
                                            </tr>}
                                            {(userType === 'owner' && reservationState == 'cancelled' && (cancellationDetails && cancellationDetails.payoutToHost && cancellationDetails.payoutToHost > 0)) && <tr>
                                                <th className={s.rowWidth}><FormattedMessage {...messages.actualEarnings} /></th>
                                                <td>
                                                    <CurrencyConverter
                                                        amount={cancellationDetails.payoutToHost}
                                                        from={currency}
                                                    />
                                                </td>
                                            </tr>}
                                        </tbody>
                                    </table>
                                    {
                                        userType === 'owner' && securityDeposit > 0 && <table className={cx('table', 'table-bordered')}>
                                            <tbody>
                                                <tr>
                                                    <th className={s.rowWidth}><FormattedMessage {...messages.securityDepositByRenter} /> </th>
                                                    <td>
                                                        <CurrencyConverter
                                                            amount={securityDeposit}
                                                            from={currency}
                                                        />
                                                        {claimStatus == 'pending' && checkOutDifference > 0 && checkOutDifference < 24 && <a onClick={() => this.changeModalState(true)} className={s.link}>{' ('}<FormattedMessage {...messages.claimDamage} />{')'}</a>}
                                                        {claimAmount > 0 && <a onClick={() => this.changeModalState(true)} className={s.link}>{' ('}<FormattedMessage {...messages.claimDetails} />{')'}</a>}

                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    }
                                    {
                                        userType === 'renter' && <table className={cx('table', 'table-bordered')}>
                                            <tbody>
                                                <tr>
                                                    <th className={s.rowWidth}><FormattedMessage {...messages.paymentReceived} /> {updatedDate}</th>
                                                    <td>
                                                        <CurrencyConverter
                                                            amount={subTotal}
                                                            from={currency}
                                                        />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    }
                                    {
                                        userType === 'renter' && (['approved', 'fullyRefunded'].includes(claimStatus)) && <table className={cx('table', 'table-bordered')}>
                                            <tbody>
                                                <tr>
                                                    <th className={s.rowWidth}><FormattedMessage {...messages.refundedSecurityDeposit} />: {claimRefundedDate}</th>
                                                    <td>
                                                        <CurrencyConverter
                                                            amount={claimRefund}
                                                            from={currency}
                                                        />
                                                        {securityDeposit > 0 && claimAmount > 0 && <a onClick={() => this.changeModalState(true)} className={s.link}>{' ('}<FormattedMessage {...messages.claimDetails} />{')'}</a>}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    }
                                    {
                                        userType === 'owner' && claimStatus == 'approved' && claimPayout > 0 && <table className={cx('table', 'table-bordered')}>
                                            <tbody>
                                                <tr>
                                                    <th className={s.rowWidth}><FormattedMessage {...messages.securityDepositAmountToHost} />: {claimRefundedDate}</th>
                                                    <td>
                                                        <CurrencyConverter
                                                            amount={claimPayout}
                                                            from={currency}
                                                        />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    }
                                </Col>
                            </Row>
                        </Panel>
                    </div>
                    <div className={s.spaceTop4}>
                        <p>
                            {siteName} <FormattedMessage {...messages.receiptInfo1} />{' '}
                            <FormattedMessage {...messages.receiptInfo2} /> {siteName}.{' '}
                            <FormattedMessage {...messages.receiptInfo3} /> {siteName}.
                        </p>
                    </div>
                </div>
            );
        }
    }
}

const mapState = (state) => ({
    siteName: state.siteSettings.data.siteName,
    userId: state.account.data.userId,
    currencyRates: state.currency
});

const mapDispatch = {};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(PaymentReceipt)));

// export default compose(
//     injectIntl,
//     withStyles(s),
//     (connect(mapState, mapDispatch)),
//     graphql(gql`
//       query getCountries {
//           getCountries{
//               id
//               countryCode
//               countryName
//               isEnable
//               dialCode
//           }
//       }
//   `, { options: { ssr: false } }),
//   )(PaymentReceipt);
