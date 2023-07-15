import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { FormattedMessage, injectIntl } from 'react-intl';
// Redux
import { connect } from 'react-redux';
import {
	Row,
	Col
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../ViewMessage.css';
import * as FontAwesome from 'react-icons/lib/fa';

// Component
import CurrencyConverter from '../../CurrencyConverter';

// Locale
import messages from '../../../locale/messages';

class CancelDetails extends Component {
	static propTypes = {
		userType: PropTypes.string.isRequired,
		formatMessage: PropTypes.any,
		cancelData: PropTypes.shape({
			guestServiceFee: PropTypes.number,
			hostServiceFee: PropTypes.number,
			refundToGuest: PropTypes.number,
			payoutToHost: PropTypes.number,
			total: PropTypes.number,
			currency: PropTypes.string,
		})
	};

	render() {
		const { userType, reservationData, openModal, checkOutDifference } = this.props;
		const { cancelData: { cancellationPolicy, guestServiceFee, refundToGuest, payoutToHost, currency } } = this.props;
		const { reservationData: { total, hostServiceFee } } = this.props;
		let earnedAmount = 0, missedEarnings = 0, refund = 0, estimatedEarning = 0;
		earnedAmount = payoutToHost;
		refund = refundToGuest;
		missedEarnings = (total - hostServiceFee) - earnedAmount;
		estimatedEarning = total - hostServiceFee;
		let claimAmount = 0, claimStatus = 0, securityDeposit = 0, claimPayout = 0;
		if (reservationData) {
			claimStatus = reservationData.claimStatus;
			securityDeposit = reservationData.securityDeposit
			claimAmount = reservationData.claimAmount;
			claimPayout = reservationData.claimPayout;
		}

		return (
			<div className={s.spaceTop6}>

				{((userType === 'owner' && (estimatedEarning > 0 || earnedAmount > 0 || missedEarnings > 0 || securityDeposit > 0 || claimPayout > 0)) || (userType === 'renter' && refund > 0)) && <>
					<h4 className={s.space4}>
						<span><FormattedMessage {...messages.payment} /></span>
					</h4>

					{
						userType === 'owner' && estimatedEarning > 0 && <Row className={s.textBold}>
							<Col xs={7} sm={7} className={s.textLeft}>
								<span><FormattedMessage {...messages.estimatedEarnings} /></span>
							</Col>
							<Col xs={5} sm={5} className={s.textRight}>
								<span>
									<CurrencyConverter
										amount={estimatedEarning}
										from={currency}
									/>
								</span>
							</Col>
						</Row>
					}

					{
						userType === 'owner' && earnedAmount > 0 && <Row className={cx(s.textBold, s.spaceTop2)}>
							<Col xs={7} sm={7} className={s.textLeft}>
								<span><FormattedMessage {...messages.earnedAmount} /></span>
							</Col>
							<Col xs={5} sm={5} className={s.textRight}>
								<span>
									<CurrencyConverter
										amount={earnedAmount}
										from={currency}
									/>
								</span>
							</Col>
						</Row>
					}

					{
						userType === 'owner' && missedEarnings > 0 && <Row className={cx(s.textBold, s.spaceTop2)}>
							<Col xs={7} sm={7} className={s.textLeft}>
								<span><FormattedMessage {...messages.missedEarnings} /></span>
							</Col>
							<Col xs={5} sm={5} className={s.textRight}>
								<span>
									<CurrencyConverter
										amount={missedEarnings}
										from={currency}
									/>
								</span>
							</Col>
						</Row>
					}

					{
						userType === 'renter' && refund > 0 && <Row className={cx(s.textBold, s.spaceTop2)}>
							<Col xs={7} sm={7} className={s.textLeft}>
								<span><FormattedMessage {...messages.refundAmount} /></span>
							</Col>
							<Col xs={5} sm={5} className={s.textRight}>
								<span>
									<CurrencyConverter
										amount={refund}
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
								{securityDeposit > 0 && claimStatus == 'pending' && checkOutDifference > 0 && checkOutDifference < 24 && <a className={s.link} onClick={() => openModal()}>{' ('}<FormattedMessage {...messages.claimDamage} />{')'}</a>}
								{securityDeposit > 0 && claimAmount > 0 && <div className={s.spaceTop1}><a className={s.link} onClick={() => openModal()}>{' ('}<FormattedMessage {...messages.claimDetails} />{')'}</a></div>}
							</Col>
							<Col xs={6} sm={4} className={cx(s.textRight, 'textAlignLeftRTL')}>
								<span>
									<CurrencyConverter
										amount={securityDeposit}
										from={reservationData && reservationData.currency}
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
				</>}

			</div>
		);
	}
}

const mapState = (state) => ({
});

const mapDispatch = {
};

export default withStyles(s)(connect(mapState, mapDispatch)(CancelDetails));

