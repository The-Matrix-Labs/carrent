import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import moment from 'moment';
// Redux
import { connect } from 'react-redux';
import {
	Row,
	Col,
	Tooltip,
	OverlayTrigger
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../ViewMessage.css';
import * as FontAwesome from 'react-icons/lib/fa';

// Component
import CurrencyConverter from '../../CurrencyConverter';

// Helper
import { convert } from '../../../helpers/currencyConvertion';

// Locale
import messages from '../../../locale/messages';

class PaymentDetails extends Component {
	static propTypes = {
		formatMessage: PropTypes.any,
		userType: PropTypes.string.isRequired,
		basePrice: PropTypes.number.isRequired,
		delivery: PropTypes.number.isRequired,
		monthlyDiscount: PropTypes.number,
		weeklyDiscount: PropTypes.number,
		currency: PropTypes.string.isRequired,
		startDate: PropTypes.string.isRequired,
		endDate: PropTypes.string.isRequired,
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
		rates: PropTypes.object.isRequired
	};

	static defaultProps = {
		startDate: null,
		endDate: null,
		basePrice: 0,
		delivery: 0,
		monthlyDiscount: 0,
		weeklyDiscount: 0
	};

	render() {
		const { startDate, endDate, basePrice, delivery, currency, monthlyDiscount, weeklyDiscount, userType, endTime, startTime } = this.props;
		const { serviceFees, base, rates, checkOutDifference, openModal } = this.props;
		const { reservationData } = this.props;
		const { formatMessage } = this.props.intl;

		function LinkWithTooltip({ id, children, href, tooltip }) {
			return (
				<OverlayTrigger
					overlay={<Tooltip className={s.tooltip} id={id}>{tooltip}</Tooltip>}
					placement="top"
					delayShow={300}
					delayHide={150}
				>
					{/* <a href={href}>{children}</a> */}
					{children}
				</OverlayTrigger>
			);
		}

		let guestServiceFee = 0, hostServiceFee = 0;
		let currentDay, bookingSpecialPricing = [], isSpecialPriceAssigned = false;
		let isSpecialPricingAssinged = (reservationData && reservationData.bookingSpecialPricing && reservationData.bookingSpecialPricing.length > 0) ? true : false;
		let isSpecialPrice, isDayTotal = 0, isDelivery = 0;
		let isDiscount, isDiscountType, totalWithoutServiceFee = 0;
		let claimAmount = 0, claimStatus = 0, securityDeposit = 0, claimPayout = 0;
		if (reservationData) {
			claimStatus = reservationData.claimStatus;
			securityDeposit = reservationData.securityDeposit
			claimAmount = reservationData.claimAmount;
			claimPayout = reservationData.claimPayout;
		}

		let momentStartDate, momentEndDate, dayDifference, priceForDays = 0;
		let discount = 0, discountType, total = 0, hostEarnings = 0, isAverage = 0;

		if (startDate && endDate) {
			momentStartDate = moment(startDate).startOf('day');
			momentEndDate = moment(endDate).startOf('day');
			dayDifference = momentEndDate.diff(momentStartDate, 'days');
			dayDifference = dayDifference + 1;

			if (dayDifference > 0) {
				if (isSpecialPricingAssinged) {
					reservationData && reservationData.bookingSpecialPricing && reservationData.bookingSpecialPricing.length > 0 && reservationData.bookingSpecialPricing.map((item, index) => {
						priceForDays = priceForDays + Number(item.isSpecialPrice);
					});
				} else {
					priceForDays = Number(basePrice) * Number(dayDifference);
				}
			}
		}

		isAverage = Number(priceForDays) / Number(dayDifference);
		isDayTotal = isAverage.toFixed(2) * dayDifference;
		priceForDays = isDayTotal;
		isDiscount = reservationData && reservationData.discount;
		isDiscountType = reservationData && reservationData.discountType;
		isDelivery = reservationData && reservationData.delivery;

		if (dayDifference >= 7) {
			if (monthlyDiscount > 0 && dayDifference >= 28) {
				discount = isDiscount;
				discountType = isDiscountType;
			} else {
				if (weeklyDiscount > 0) {
					discount = isDiscount;
					discountType = isDiscountType;
				}
			}
		}
		totalWithoutServiceFee = (priceForDays + isDelivery) - discount;

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

		if (userType === 'owner') {
			total = (priceForDays + isDelivery) - discount;
		} else {
			total = (priceForDays + guestServiceFee + isDelivery + securityDeposit) - discount;
		}

		hostEarnings = total - hostServiceFee;

		return (
			<div>
				<h4 className={s.space2}>
					<span><FormattedMessage {...messages.payment} /></span>
				</h4>
				{
					<Row className={s.textGray}>
						<Col xs={7} sm={7} className={cx(s.textLeft, 'textAlignRightRTL')}>
							{
								isSpecialPricingAssinged && <LinkWithTooltip
									tooltip={formatMessage(messages.averageRate)}
									// href="#"
									id="tooltip-1"
								>
									<span className={cx(s.iconSection, s.toolTipColor)}>
										<FontAwesome.FaQuestion className={s.instantIcon} />
									</span>
								</LinkWithTooltip>
							}
							<div className={cx('directionLtr')}>
								<CurrencyConverter
									//amount={basePrice}
									amount={isAverage}
									from={currency}
								/>
								{' x'} {dayDifference} {dayDifference > 1 ? formatMessage(messages.nights) : formatMessage(messages.night)}
							</div>
							{/* {
								isSpecialPricingAssinged && <LinkWithTooltip
									tooltip="Average rate per day for your trip."
									// href="#"
									id="tooltip-1"
								>
									<span className={cx(s.iconSection, s.toolTipColor)}>
										<FontAwesome.FaQuestion className={s.instantIcon} />
									</span>
								</LinkWithTooltip>
							} */}
						</Col>
						<Col xs={5} sm={5} className={cx(s.textRight, 'textAlignLeftRTL')}>
							<CurrencyConverter
								amount={priceForDays}
								from={currency}
							/>
						</Col>

					</Row>
				}
				{
					delivery > 0 && isDelivery > 0 && <Row className={s.textGray}>
						<Col xs={7} sm={7} className={cx(s.textLeft, 'textAlignRightRTL')}>
							<span><FormattedMessage {...messages.cleaningFee} /></span>
						</Col>
						<Col xs={5} sm={5} className={cx(s.textRight, 'textAlignLeftRTL')}>
							<span>
								<CurrencyConverter
									amount={isDelivery}
									from={currency}
								/>
							</span>
						</Col>
					</Row>
				}

				{
					discount > 0 && <Row className={s.textGray}>
						<Col xs={7} sm={7} className={cx(s.textLeft, 'textAlignRightRTL')}>
							<span>{discountType}</span>
						</Col>
						<Col xs={5} sm={5} className={cx(s.textRight, s.discountText, 'textAlignLeftRTL')}>
							<span>
								- <CurrencyConverter
									amount={discount}
									from={currency}
								/>
							</span>
						</Col>
					</Row>
				}

				{
					userType === 'renter' && guestServiceFee > 0 && <Row className={s.textGray}>
						<Col xs={7} sm={7} className={cx(s.textLeft, 'textAlignRightRTL')}>
							<span><FormattedMessage {...messages.serviceFee} /></span>
						</Col>
						<Col xs={5} sm={5} className={cx(s.textRight, 'textAlignLeftRTL')}>
							<span>
								<CurrencyConverter
									amount={guestServiceFee}
									from={currency}
								/>
							</span>
						</Col>
					</Row>
				}

				{
					userType === 'renter' && securityDeposit > 0 && <Row className={s.textGray}>
						<Col xs={7} sm={7} className={cx(s.textLeft, 'textAlignRightRTL')}>
							<span><FormattedMessage {...messages.securityDeposit} /></span>
						</Col>
						<Col xs={5} sm={5} className={cx(s.textRight, 'textAlignLeftRTL')}>
							<span>
								<CurrencyConverter
									amount={securityDeposit}
									from={currency}
								/>
							</span>
						</Col>
					</Row>
				}

				{
					userType === 'renter' && <hr className={s.horizontalLine} />
				}

				<Row className={cx(s.textBold, s.spaceTop2)}>
					<Col xs={6} sm={6} className={cx(s.textLeft, 'textAlignRightRTL')}>
						<span><FormattedMessage {...messages.subTotal} /></span>
					</Col>
					<Col xs={6} sm={6} className={cx(s.textRight, 'textAlignLeftRTL')}>
						<span>
							<CurrencyConverter
								amount={total}
								from={currency}
							/>
						</span>
					</Col>
				</Row>

				{
					userType === 'owner' && hostServiceFee > 0 && <Row className={s.textGray}>
						<Col xs={6} sm={6} className={cx(s.textLeft, 'textAlignRightRTL')}>
							<span><FormattedMessage {...messages.serviceFee} /></span>
						</Col>
						<Col xs={6} sm={6} className={cx(s.textRight, 'textAlignLeftRTL')}>
							<span>
								-
								<CurrencyConverter
									amount={hostServiceFee}
									from={currency}
								/>
							</span>
						</Col>
					</Row>
				}

				{
					userType === 'owner' && <hr className={s.horizontalLine} />
				}


				{
					userType === 'owner' && <Row className={cx(s.textBold, s.spaceTop2, s.space3)}>
						<Col xs={6} sm={6} className={cx(s.textLeft, 'textAlignRightRTL')}>
							<span><FormattedMessage {...messages.youEarn} /></span>
						</Col>
						<Col xs={6} sm={6} className={cx(s.textRight, 'textAlignLeftRTL')}>
							<span>
								<CurrencyConverter
									amount={hostEarnings}
									from={currency}
								/>
							</span>
						</Col>
					</Row>
				}
				{
					userType === 'owner' && <hr className={s.horizontalLine} />
				}
				{
					userType === 'owner' && securityDeposit > 0 && <Row className={cx(s.spaceTop2, s.space3)}>
						<Col xs={6} sm={8} className={cx(s.textLeft, 'textAlignRightRTL')}>
							<span><FormattedMessage {...messages.securityDepositByRenter} /></span>
							{claimStatus == 'pending' && checkOutDifference > 0 && checkOutDifference < 24 && <a className={s.link} onClick={openModal}>{' ('}<FormattedMessage {...messages.claimDamage} />{')'}</a>}
							{claimAmount > 0 && <div className={s.spaceTop1}><a className={s.link} onClick={openModal}>{' ('}<FormattedMessage {...messages.claimDetails} />{')'}</a></div>}
						</Col>
						<Col xs={6} sm={4} className={cx(s.textRight, 'textAlignLeftRTL')}>
							<span>
								<CurrencyConverter
									amount={securityDeposit}
									from={currency}
								/>
							</span>
						</Col>
					</Row>
				}
				{
					userType === 'owner' && claimStatus === 'approved' && claimPayout > 0 && <Row className={cx(s.spaceTop2, s.space3)}>
						<Col xs={6} sm={8} className={cx(s.textLeft, 'textAlignRightRTL')}>
							<span><FormattedMessage {...messages.securityDepositAmountToHost} /></span>
						</Col>
						<Col xs={6} sm={4} className={cx(s.textRight, 'textAlignLeftRTL')}>
							<span>
								<CurrencyConverter
									amount={claimPayout}
									from={reservationData && reservationData.currency}
								/>
							</span>
						</Col>
					</Row>
				}
			</div>
		);
	}
}

const mapState = (state) => ({
	serviceFees: state.book.serviceFees,
	base: state.currency.base,
	rates: state.currency.rates
});

const mapDispatch = {
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(PaymentDetails)));

