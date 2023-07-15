import React from 'react';

import { Table, Tr, Td, Thead, Th } from 'reactable';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import moment from 'moment';
import { Button, FormControl } from 'react-bootstrap';
import { graphql, gql, compose } from 'react-apollo';

// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ManageSecurityDeposit.css';

// Components
import CurrencyConverter from '../../CurrencyConverter';
import Link from '../../Link';
import CustomPagination from '../../CustomPagination';

//graphql
import reservationsQuery from './reservationsQuery.graphql';

//Images
import ExportImage from '../../../../public/AdminIcons/export.png';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../locale/messages';
import { convert } from '../../../helpers/currencyConvertion';
import HostClaimModal from '../../HostClaimModal/HostClaimModal';
import AdminClaimModal from '../../AdminClaimModal/AdminClaimModal';
import { decode } from '../../../helpers/queryEncryption';

class ManageSecurityDeposit extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			currentPage: 1,
			searchList: '',
			typing: false,
			typingTimeout: 0,
			claimedModal: false,
			reservationId: null,
			claimType: 'all',
			adminClaimModal: false,
			reservationCurrency: 'USD'
		}
		this.paginationData = this.paginationData.bind(this);
		this.handleSearchChange = this.handleSearchChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	paginationData(currentPage) {
		const { getAllReservationAdmin: { refetch }, setStateVariable } = this.props;
		this.setState({ currentPage });
		let variables = { currentPage };
		setStateVariable(variables);
		refetch(variables);
	}

	handleClick(searchList) {
		const { getAllReservationAdmin: { refetch }, setStateVariable } = this.props;
		let variables = {
			currentPage: 1,
			searchList: searchList
		};
		this.setState(variables);
		setStateVariable(variables)
		refetch(variables);
	}

	handleSearchChange = (e) => {
		const self = this;
		if (self.state.typingTimeout) {
			clearTimeout(self.state.typingTimeout);
		}
		self.setState({
			searchList: e.target.value,
			typing: false,
			typingTimeout: setTimeout(function () {
				self.handleClick(self.state.searchList);
			}, 450)
		});
	}

	changeModalState = (status = false, reservationId) => this.setState({
		claimedModal: status,
		reservationId,
		currentPage: 1
	});

	onFilter = claimType => {
		const { getAllReservationAdmin: { refetch }, setStateVariable } = this.props;
		const { currentPage, searchList } = this.props;
		this.setState({ claimType, currentPage: 1 });
		setStateVariable({ claimType, currentPage: 1 })
		refetch({ currentPage: 1, searchList, claimType });
	}

	refetchData = () => {
		const { getAllReservationAdmin: { refetch } } = this.props;
		const { currentPage, searchList, claimType } = this.props;
		refetch({ currentPage, searchList, claimType });
	}

	openAdminClaimModal = (reservationId, reservationCurrency) => this.setState({ adminClaimModal: true, reservationId, reservationCurrency });
	closeAdminClaimModal = () => this.setState({ adminClaimModal: false, reservationId: null });

	render() {
		const { getAllReservationAdmin: { getAllReservationAdmin, refetch }, currencyRates } = this.props;
		const { claimedModal, reservationId, adminClaimModal, reservationCurrency } = this.state;
		const { currentPage, searchList, claimType } = this.props;
		const { formatMessage } = this.props.intl;
		let modalInitialValues = {};
		if (claimedModal && getAllReservationAdmin && getAllReservationAdmin.reservationData) {
			let reservationData = getAllReservationAdmin.reservationData.find(item => item.id == reservationId)
			if (reservationData) {
				modalInitialValues.securityDeposit = convert(currencyRates.base, currencyRates.rates, reservationData.securityDeposit, reservationData.currency, currencyRates.to).toFixed(2);
				if (reservationData.claimStatus && reservationData.claimStatus != 'pending') {
					modalInitialValues.claimAmount = convert(currencyRates.base, currencyRates.rates, reservationData.claimAmount, reservationData.currency, currencyRates.to).toFixed(2);
					modalInitialValues.claimReason = reservationData.claimReason;
					modalInitialValues.claimImages = reservationData.claimImages;
				}
			}

		}

		let adminClaimModalValues = {}, claimedByHost = false;
		if (reservationId && adminClaimModal) {
			let reservationData = getAllReservationAdmin.reservationData.find(item => item.id == reservationId)
			if (reservationData) {
				claimedByHost = reservationData.claimStatus == 'requested' || reservationData.claimStatus == 'approved';
				convert(currencyRates.base, currencyRates.rates, reservationData.securityDeposit, reservationData.currency, currencyRates.to)
				adminClaimModalValues.securityDeposit = convert(currencyRates.base, currencyRates.rates, reservationData.securityDeposit, reservationData.currency, currencyRates.to);
				if (reservationData.claimStatus == 'requested') adminClaimModalValues.claimAmount = convert(currencyRates.base, currencyRates.rates, reservationData.claimAmount, reservationData.currency, currencyRates.to);
			}
		}

		let claimActionLabel = '';
		if (claimType == 'all') claimActionLabel = formatMessage(messages.statusOrAction);
		else if (claimType == 'claimed') claimActionLabel = formatMessage(messages.status);
		else if (claimType == 'nonClaimed') claimActionLabel = formatMessage(messages.claimAction);


		return (
			<div className={cx(s.pagecontentWrapper, 'pagecontentWrapperRTL')}>
				{claimedModal && <HostClaimModal
					refetchData={this.refetchData}
					claimed
					reservationId={reservationId}
					show={claimedModal}
					currency={getAllReservationAdmin && getAllReservationAdmin.reservationData.currency}
					changeModalState={this.changeModalState}
					initialValues={modalInitialValues}
				/>}
				{
					adminClaimModal && <AdminClaimModal
						refetch={this.refetchData}
						show={adminClaimModal}
						claimedByHost={claimedByHost}
						closeModal={this.closeAdminClaimModal}
						initialValues={adminClaimModalValues}
						openHostModal={this.changeModalState}
						reservationId={reservationId}
						currency={reservationCurrency}
					/>
				}
				<div>
					<h1 className={s.headerTitle}><FormattedMessage {...messages.manageSecurityDeposit} /></h1>
					<div className={s.marginBottom}>
						<Button onClick={() => this.onFilter('all')} className={cx(s.btnPrimaryBorder, { [s.active]: (claimType == 'all') })}>
							{formatMessage(messages.claimAll)}
						</Button>
						<Button onClick={() => this.onFilter('claimed')} className={cx(s.btnPrimaryBorder, { [s.active]: (claimType == 'claimed') })}>
							{formatMessage(messages.claimedReservation)}
						</Button>
						<Button onClick={() => this.onFilter('nonClaimed')} className={cx(s.btnPrimaryBorder, { [s.active]: (claimType == 'nonClaimed') })}>
							{formatMessage(messages.nonClaimedReservation)}
						</Button>
					</div>
					<div className={cx(s.exportSection, s.exportSectionGridSub)}>
						<div>
							<FormControl
								type="text"
								placeholder={formatMessage(messages.search)}
								onChange={(e) => this.handleSearchChange(e)}
								className={cx('searchInputControl', 'searchInputControlWidth')}
							/>
						</div>
						<div>
							{
								getAllReservationAdmin && getAllReservationAdmin.reservationData && getAllReservationAdmin.reservationData.length > 0 && <a
									href={`/export-admin-data?type=security-deposit&search=${searchList}&filter=${claimType}`} className={cx(s.exportText, 'exportTextRTL')}>
									<span className={s.vtrMiddle}><FormattedMessage {...messages.exportDataIntoCSV} /></span>
									<span className={cx(s.exportLinkImg, 'exportLinkImgRTL')}>
										<img src={ExportImage} className={s.exportImg} />
									</span>
								</a>
							}
						</div>
					</div>
					<div className={cx('table-responsive', 'NewAdminResponsiveTable', 'NewResponsiveTableAdmin', 'tableTwo', 'topScrollbarTable')}>
						<Table className={cx("table", 'topScrollbarTableContent')}
							noDataText={formatMessage(messages.noRecordFound)}
							sortable={true}
						>
							<Thead>
								<Th scope="col">{formatMessage(messages.bookingId)}</Th>
								<Th scope="col">{formatMessage(messages.ownerDetails)}</Th>
								<Th scope="col">{formatMessage(messages.renterDetails)}</Th>
								<Th scope="col">{formatMessage(messages.bookingInformation)}</Th>
								<Th scope="col">{formatMessage(messages.securityDepositAmount)}</Th>
								<Th scope="col">{formatMessage(messages.amountClaimedByOwner)}</Th>
								<Th scope="col">{formatMessage(messages.securityDepositToHost)}</Th>
								<Th scope="col">{formatMessage(messages.securityDepositToGuest)}</Th>
								<Th scope="col">{formatMessage(messages.claimDetails)}</Th>
								<Th scope="col">{claimActionLabel}</Th>
							</Thead>
							{
								getAllReservationAdmin && getAllReservationAdmin.reservationData && getAllReservationAdmin.reservationData.length > 0 && getAllReservationAdmin.reservationData.map((value, index) => {
									let showRefund = false;
									if (value.reservationState === 'expired' || value.reservationState === 'cancelled' || value.reservationState === 'declined' || value.reservationState === 'completed') {
										showRefund = true;
									}
									return (
										<Tr key={index}>
											<Td data-label={formatMessage(messages.bookingId)} column={formatMessage(messages.bookingId)} data={value.id} />
											<Td data-label={formatMessage(messages.ownerDetails)} column={formatMessage(messages.ownerDetails)}>
												{value.hostData.firstName + ' - ' + decode(value.hostData.userData.email)}
											</Td>
											<Td data-label={formatMessage(messages.renterDetails)} column={formatMessage(messages.renterDetails)}  >
												{value.guestData.firstName + ' - ' + decode(value.guestData.userData.email)}
											</Td>

											<Td data-label={formatMessage(messages.bookingInformation)} column={formatMessage(messages.bookingInformation)} >
												<Link to={"/siteadmin/viewreservation/" + value.id + '/security-deposit'} >
													<FormattedMessage {...messages.viewLabel} />
												</Link>
											</Td>
											<Td data-label={formatMessage(messages.securityDepositAmount)} column={formatMessage(messages.securityDepositAmount)}>
												<CurrencyConverter
													amount={value.securityDeposit}
													from={value.currency}
												/>
											</Td>
											<Td data-label={formatMessage(messages.amountClaimedByOwner)} column={formatMessage(messages.amountClaimedByOwner)}>
												{value.claimAmount ? <CurrencyConverter
													amount={value.claimAmount}
													from={value.currency}
												/> : '-'}
											</Td>
											<Td data-label={formatMessage(messages.claimDetails)} column={formatMessage(messages.claimDetails)}>
												{value.claimAmount ? <Link onClick={() => this.changeModalState(true, value.id)}>{formatMessage(messages.viewLabel)}</Link> : '-'}
											</Td>
											<Td data-label={formatMessage(messages.securityDepositToHost)} column={formatMessage(messages.securityDepositToHost)}>
												{value.claimPayout > 0 ? <CurrencyConverter
													amount={value.claimPayout}
													from={value.currency}
												/> : '-'}
											</Td>
											<Td data-label={formatMessage(messages.securityDepositToGuest)} column={formatMessage(messages.securityDepositToGuest)}>
												{value.claimRefund > 0 ? <CurrencyConverter
													amount={value.claimRefund}
													from={value.currency}
												/> : '-'}
											</Td>
											<Td data-label={claimActionLabel} column={claimActionLabel}>

												{
													showRefund ? (value.claimStatus == 'pending' || value.claimStatus === 'requested') ? <a
														href="javascript:void(0)"
														onClick={() => this.openAdminClaimModal(value.id, value.currency)}
													>
														{formatMessage(messages.proceedToRefund)}
													</a> : (
														value.claimStatus == 'approved' ? <span>{formatMessage(messages.securityDepositClaimed)}</span> : <span>{formatMessage(messages.claimRefunded)}</span>
													) : <div> - </div>
												}

											</Td>
										</Tr>
									)
								})
							}
						</Table>
					</div>
					{
						getAllReservationAdmin && getAllReservationAdmin.reservationData && getAllReservationAdmin.reservationData.length > 0
						&& <div>
							<CustomPagination
								total={getAllReservationAdmin.count}
								currentPage={currentPage}
								defaultCurrent={1}
								defaultPageSize={10}
								change={this.paginationData}
								paginationLabel={formatMessage(messages.panelReservation)}
							/>
						</div>
					}
				</div>
			</div>
		);
	}

}

const mapState = (state) => ({
	completed: state.reservation.completed,
	loading: state.reservation.loading,
	currencyRates: state.currency
});

const mapDispatch = {
};

export default compose(injectIntl,
	withStyles(s),
	connect(mapState, mapDispatch),
	graphql(reservationsQuery, {
		name: 'getAllReservationAdmin',
		options: (props) => ({
			variables: {
				currentPage: props.currentPage,
				isClaimDetails: true,
				claimType: props.claimType,
				searchList: props.searchList
			},
			fetchPolicy: 'network-only',
		})
	})
)(ManageSecurityDeposit);