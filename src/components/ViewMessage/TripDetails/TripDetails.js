import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import moment from 'moment';

import {
	Button,
	Form,
	Grid,
	Row, FormGroup,
	Col,
	ControlLabel,
	FormControl,
	FieldGroup,
	Panel,
	Label
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../ViewMessage.css';
import * as FontAwesome from 'react-icons/lib/fa';

//Component
import PaymentDetails from './PaymentDetails';
import CancelDetails from './CancelDetails';
import Link from '../../Link';
import { formatTime } from '../../../helpers/formatting';

// Locale
import messages from '../../../locale/messages';
import ClaimDetails from './ClaimDetails';
import { convert } from '../../../helpers/currencyConvertion';
import HostClaimModal from '../../HostClaimModal/HostClaimModal';

class TripDetails extends Component {
	static propTypes = {
		formatMessage: PropTypes.any,
		listId: PropTypes.number.isRequired,
		userType: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		startDate: PropTypes.string.isRequired,
		endDate: PropTypes.string.isRequired,
		personCapacity: PropTypes.number.isRequired,
		basePrice: PropTypes.number.isRequired,
		delivery: PropTypes.number.isRequired,
		currency: PropTypes.string.isRequired,
		monthlyDiscount: PropTypes.number,
		weeklyDiscount: PropTypes.number,
		cancelData: PropTypes.shape({
			guestServiceFee: PropTypes.number,
			hostServiceFee: PropTypes.number,
			refundToGuest: PropTypes.number,
			payoutToHost: PropTypes.number,
			total: PropTypes.number,
			currency: PropTypes.string,
		}),
		reservationData: PropTypes.any,
	};

	static defaultProps = {
		title: '',
		startDate: null,
		endDate: null,
		personCapacity: 0,
		reservationData: null
	};

	state = { showModal: false };

	changeModalState = (status = false) => this.setState({ showModal: status });

	openModal = () => this.changeModalState(true);

	render() {
		const { title, startDate, endDate, personCapacity, listId, reservationData, startTime, endTime, refetchData } = this.props;
		const { formatMessage } = this.props.intl;
		const { basePrice, delivery, weeklyDiscount, monthlyDiscount, userType, currency, cancelData, currencyRates } = this.props;
		const { showModal, changeModalState, openModal } = this.props;
		let checkIn = startDate ? moment(startDate).format('ddd, Do MMM') : '';
		let checkOut = endDate ? moment(endDate).format('ddd, Do MMM') : '';
		let isCancelled = false, modalInitialValues = {}, checkOutDifference = 0;
		let formattedStartTime, formattedEndTime;
		if (cancelData) {
			isCancelled = true;
		}

		let startTimeValue = (reservationData && reservationData.startTime) ? reservationData.startTime : startTime;
		let endTimeValue = (reservationData && reservationData.endTime) ? reservationData.endTime : endTime
		formattedStartTime = formatTime(startTimeValue);
		formattedEndTime = formatTime(endTimeValue);

		if (reservationData) {
			modalInitialValues.securityDeposit = convert(currencyRates.base, currencyRates.rates, reservationData.securityDeposit, reservationData.currency, currencyRates.to).toFixed(2);
			if (reservationData.claimStatus && reservationData.claimStatus != 'pending') {
				modalInitialValues.claimAmount = convert(currencyRates.base, currencyRates.rates, reservationData.claimAmount, reservationData.currency, currencyRates.to).toFixed(2);
				modalInitialValues.claimReason = reservationData.claimReason;
				modalInitialValues.claimImages = reservationData.claimImages;
			}
			if (reservationData.reservationState == 'completed') checkOutDifference = moment().diff(moment(reservationData.checkOut), 'hour', true);
			if (cancelData && reservationData.reservationState == 'cancelled') {
				let todayDiff = moment().diff(moment(reservationData.checkIn), 'hour', true);
				if (todayDiff > 0) checkOutDifference = moment().diff(moment(cancelData.createdAt), 'hour', true);
			}
		}

		return (
			<div>
				<div className={cx(s.space4, s.spaceTop3, s.sidebarContainer)}>
					{showModal && reservationData && <HostClaimModal
						refetchData={refetchData}
						claimed={Boolean(reservationData.claimStatus && reservationData.claimStatus != 'pending')}
						reservationId={reservationData.id}
						show={showModal}
						currency={reservationData.currency}
						changeModalState={changeModalState}
						initialValues={modalInitialValues}
					/>}
					<div className={cx(s.space2, s.tripBorderTop)}>
						<h4><FormattedMessage {...messages.tripDetails} /></h4>
					</div>
					<div className={s.space4}>
						<a href={"/cars/" + listId} target="_blank" className={s.linkColor}>
							<h4 className={cx(s.noMargin, s.tripTitle)}>{title}</h4>
						</a>
					</div>
					<div className={s.space2}>
						<hr className={s.horizondalLine} />
						<Row className={cx(s.spaceTop3, s.space3)}>
							<Col xs={12} sm={12} className={cx(s.space1)}>
								<div className={cx(cx(s.tripText, 'textAlignRightRTL'))}>
									<span><FormattedMessage {...messages.checkIn} /></span>
								</div>
								<div className={cx(s.textGray, s.tripTime, 'textAlignLeftRTL')}>
									<span>{checkIn}</span>{' '}
									{formattedStartTime && <span>
										{formattedStartTime}
									</span>}
								</div>
							</Col>
							<Col xs={12} sm={12} className={cx(s.textLeft, s.space1)}>
								<div className={cx(s.tripText, 'textAlignRightRTL'
								)}>
									<span><FormattedMessage {...messages.checkOut} /></span>
								</div>
								<div className={cx(s.textGray, s.tripTime, 'textAlignLeftRTL')}>
									<span>{checkOut}</span> {' '}
									{formattedEndTime && <span>{formattedEndTime}</span>}
								</div>
							</Col>
						</Row>
						{/* <hr className={s.horizondalLine} /> */}
					</div>
					<div className={s.space2}>
						{/* <div className={cx(s.textGray, s.space1)}>
						<span><FormattedMessage {...messages.guests} /></span>
					</div>
					<div className={s.space3}>
						<span>{personCapacity} {personCapacity > 1 ? formatMessage(messages.guestsCapcity) : formatMessage(messages.guestCapcity)}</span>
					</div> */}
						<hr className={s.horizondalLine} />
						{
							!isCancelled && reservationData && <PaymentDetails
								userType={userType}
								startDate={startDate}
								endDate={endDate}
								basePrice={basePrice}
								delivery={delivery}
								weeklyDiscount={weeklyDiscount}
								monthlyDiscount={monthlyDiscount}
								currency={currency}
								reservationData={reservationData}
								checkOutDifference={checkOutDifference}
								openModal={openModal}
							/>
						}

						{
							isCancelled && reservationData && <CancelDetails
								userType={userType}
								cancelData={cancelData}
								reservationData={reservationData}
								checkOutDifference={checkOutDifference}
								openModal={openModal}
							/>
						}

					</div>
				</div>
			</div>
		);
	}
}

export default injectIntl(withStyles(s)(TripDetails));

