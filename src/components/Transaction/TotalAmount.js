import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import s from './Transaction.css';
import { convert } from '../../helpers/currencyConvertion';

// Locale
import messages from '../../locale/messages';

// Component
import CurrencyConverter from '../CurrencyConverter';

class TotalAmount extends Component {
	static propTypes = {
		className: PropTypes.string.isRequired,
		mode: PropTypes.string.isRequired
	};

	static defaultProps = {
		data: []
	};

	render() {
		const { className, mode, data, base, rates, toCurrency, totalData } = this.props;
		const { formatMessage } = this.props.intl;
		let label, currency, amount = 0, convertedTotal = 0, convertedHostService = 0, hostTotal = 0;
		if (mode === 'completed') {
			label = formatMessage(messages.paidOut);
			if (totalData && totalData.length > 0) {
				totalData.map((item) => {
					if (item.hostTransaction) {
						convertedTotal = convert(base, rates, item.hostTransaction.amount, item.hostTransaction.currency, toCurrency);
						amount = amount + convertedTotal;
						currency = item.hostTransaction.currency;
					}
				})
			}
		} else {
			label = formatMessage(messages.pendingPayouts);
			if (totalData && totalData.length > 0) {
				totalData.map((item) => {
					convertedTotal = convert(base, rates, item.total, item.currency, toCurrency);
					convertedHostService = convert(base, rates, item.hostServiceFee, item.currency, toCurrency);
					if (item.cancellationDetails && item.cancellationDetails.payoutToHost) hostTotal = item.cancellationDetails.payoutToHost
					else hostTotal = (convertedTotal - convertedHostService);

					amount = amount + hostTotal;
					currency = item.currency;
				})
			}
		}
		return (
			<h3 className={className}>
				<span>{label} : </span>
				<span>
					<CurrencyConverter
						amount={amount}
						from={toCurrency}
					/>
				</span>
			</h3>
		);
	}
}


const mapState = (state) => ({
	base: state.currency.base,
	rates: state.currency.rates,
	toCurrency: state.currency.to,
});

const mapDispatch = {
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(TotalAmount)));
