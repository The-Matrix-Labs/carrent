import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table, Tr, Td, Th, Thead } from 'reactable';
import { connect } from 'react-redux';
import { FormControl } from 'react-bootstrap';
import { graphql, gql, compose } from 'react-apollo';

// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './PayoutManagement.css';

import CurrencyConverter from '../../CurrencyConverter';
import Link from '../../Link';

import CustomPagination from '../../CustomPagination';

//graphQL
import getAllPayoutsQuery from './getAllPayoutsQuery.graphql';
import { updatePayoutStatus } from '../../../actions/updatePayoutStatus';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../locale/messages';
//Helper
import formatReservationState from '../../../helpers/formatReservationState';

class PayoutManagement extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    getAllPayouts: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      refetch: PropTypes.any.isRequired,
      getTransactionHistory: PropTypes.shape({
        count: PropTypes.number.isRequired,
        reservationData: PropTypes.arrayOf(PropTypes.shape({
          id: PropTypes.number.isRequired,
          listId: PropTypes.number.isRequired,
          hostId: PropTypes.string.isRequired,
          guestId: PropTypes.string.isRequired,
          checkIn: PropTypes.string.isRequired,
          checkOut: PropTypes.string.isRequired,
          guestServiceFee: PropTypes.number.isRequired,
          hostServiceFee: PropTypes.number.isRequired,
          total: PropTypes.number.isRequired,
          currency: PropTypes.string.isRequired,
          reservationState: PropTypes.string.isRequired,
          listData: PropTypes.shape({
            title: PropTypes.string.isRequired
          }),
          hostData: PropTypes.shape({
            profileId: PropTypes.number.isRequired,
            firstName: PropTypes.string.isRequired
          }),
          hostPayout: PropTypes.shape({
            id: PropTypes.number.isRequired,
            payEmail: PropTypes.string.isRequired,
            methodId: PropTypes.number.isRequired,
            currency: PropTypes.string.isRequired,
            last4Digits: PropTypes.number
          }),
          hostTransaction: PropTypes.shape({
            id: PropTypes.number.isRequired,
          }),
          hostFailedTransaction: PropTypes.shape({
            id: PropTypes.number.isRequired,
          }),
          guestData: PropTypes.shape({
            profileId: PropTypes.number.isRequired,
            firstName: PropTypes.string.isRequired
          }),
          transaction: PropTypes.shape({
            payerEmail: PropTypes.string.isRequired,
            paymentType: PropTypes.string.isRequired,
            total: PropTypes.number.isRequired,
            currency: PropTypes.string.isRequired,
            paymentMethodId: PropTypes.number
          }),
          refundStatus: PropTypes.shape({
            id: PropTypes.number.isRequired,
            receiverEmail: PropTypes.string.isRequired,
            total: PropTypes.number.isRequired,
            currency: PropTypes.string.isRequired
          }),
          cancellationDetails: PropTypes.shape({
            refundToGuest: PropTypes.number.isRequired,
            payoutToHost: PropTypes.number.isRequired,
            total: PropTypes.number.isRequired,
            currency: PropTypes.string.isRequired,
            guestServiceFee: PropTypes.number.isRequired,
            hostServiceFee: PropTypes.number.isRequired,
          }),
        })),
      }),
    }).isRequired,
  }

  static defaultProps = {
    getAllPayouts: {
      loading: true,
      getAllPayoutReservation: {
        count: null,
        reservationData: []
      }
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      searchList: '',
      typing: false,
      typingTimeout: 0
    }
    this.paginationData = this.paginationData.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleHoldPayout = this.handleHoldPayout.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { getAllPayouts: { completed, loading } } = nextProps;
    const { searchList, currentPage } = this.state;
    const { getAllPayouts: { refetch } } = this.props;
    let variables = { currentPage, searchList };
    if (completed && !loading) {
      refetch(variables);
    }
  }

  paginationData(currentPage) {
    const { getAllPayouts: { refetch }, setStateVariable } = this.props;
    let variables = { currentPage };
    setStateVariable(variables);
    refetch(variables);
  }

  handleClick(searchList) {
    const { getAllPayouts: { refetch }, setStateVariable } = this.props;
    const { currentPage } = this.state;
    let variables = {
      currentPage: 1,
      searchList: searchList
    };
    setStateVariable(variables);
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

  handleHoldPayout(e, id, currentPage) {
    const { updatePayoutStatus, getAllPayouts: { refetch }, setStateVariable } = this.props;
    let isHold = e.target.value;
    isHold = isHold == "true" ? true : false;
    updatePayoutStatus(id, isHold);
    let variables = { currentPage };
    setStateVariable(variables);
    refetch(variables);
  }

  render() {
    const { title, } = this.props;
    const { getAllPayouts: { loading, getAllPayoutReservation, refetch } } = this.props;
    const { currentPage } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <div className={cx(s.pagecontentWrapper, 'pagecontentWrapperRTL')}>
        <div>
          <h1 className={s.headerTitle}><FormattedMessage {...messages.payOutManagement} /></h1>
          <div className={cx(s.exportSection)}>
            <div>
              <FormControl
                type="text"
                placeholder={formatMessage(messages.search)}
                onChange={(e) => this.handleSearchChange(e)}
                className={cx('searchInputControl', 'searchInputControlWidth')}
              />
            </div>
          </div>
          <div className={cx('table-responsive', 'NewAdminResponsiveTable', 'NewResponsiveTableAdmin', 'tableTwo', 'topScrollbarTable')}>
            <Table className={cx("table", 'topScrollbarTableContent')} noDataText={formatMessage(messages.noRecordFound)} sortable={true}>
              <Thead>
                <Th scope="col" column={formatMessage(messages.reservationId)} />
                <Th scope="col" column={formatMessage(messages.codeLabel)} />
                <Th scope="col" column={formatMessage(messages.adminListTitle)} />
                <Th scope="col" column={formatMessage(messages.ownerNameLabel)} />
                <Th scope="col" column={formatMessage(messages.payoutLabel)} />
                <Th scope="col" column={formatMessage(messages.reservationStatus)} />
                <Th scope="col" column={formatMessage(messages.payoutStatus)} />
                <Th scope="col" column={formatMessage(messages.holdPayout)} />
                <Th scope="col" column={formatMessage(messages.details)} />
              </Thead>
              {
                getAllPayoutReservation && getAllPayoutReservation.reservationData && getAllPayoutReservation.reservationData.length > 0 && getAllPayoutReservation.reservationData.map((item, index) => {
                  let payoutAmount = 0;
                  let status;
                  if (item.hostTransaction && item.hostTransaction.id) {
                    status = (messages.completedLabel);
                  } else if (item.hostFailedTransaction && item.hostFailedTransaction.id) {
                    status = (messages.failed);
                  } else if (item.hostPayout == null && item.hostTransaction == null && item.hostFailedTransaction == null) {
                    status = (messages.noPayoutMethod);
                  } else if (item.hostTransaction == null && item.hostFailedTransaction == null && item.reservationState == 'completed') {
                    status = (messages.messageStatus5);
                  } else if (item.reservationState == 'cancelled' && item.cancellationDetails && (item.cancellationDetails.payoutToHost == 0 || item.cancellationDetails.payoutToHost < 0)) {
                    status = (messages.closedLabel)
                  } else if (item.reservationState == 'cancelled' && item.cancellationDetails && item.cancellationDetails.payoutToHost > 0 && item.hostTransaction == null && item.hostFailedTransaction == null) {
                    status = (messages.messageStatus5);
                  } else {
                    status = (messages.messageStatus5);
                  }
                  if (item.reservationState == 'cancelled') {
                    payoutAmount = item.cancellationDetails && item.cancellationDetails.payoutToHost;
                  } else {
                    payoutAmount = item.total - item.hostServiceFee;
                  }

                  return (
                    <Tr key={index}>
                      <Td data-label={formatMessage(messages.reservationId)} column={formatMessage(messages.reservationId)} data={item.id} />
                      <Td data-label={formatMessage(messages.codeLabel)} column={formatMessage(messages.codeLabel)}>
                        {item.confirmationCode}
                      </Td>
                      {
                        item.listData && <Td data-label={formatMessage(messages.adminListTitle)} column={formatMessage(messages.adminListTitle)}>
                          <a href={"/cars/" + item.listId} target='_blank'>
                            {item.listData.title}
                          </a>
                        </Td>
                      }
                      {
                        !item.listData && <Td data-label={formatMessage(messages.adminListTitle)} column={formatMessage(messages.adminListTitle)} data={formatMessage(messages.dataMissing)} />
                      }
                      <Td data-label={formatMessage(messages.ownerNameLabel)} column={formatMessage(messages.ownerNameLabel)}>
                        {item.hostData && item.hostData.firstName}
                      </Td>
                      {
                        payoutAmount &&
                        <Td data-label={formatMessage(messages.payoutLabel)} column={formatMessage(messages.payoutLabel)}>
                          <CurrencyConverter
                            amount={payoutAmount}
                            from={item.currency}
                          />
                        </Td>
                      }
                      <Td className={s.ChangeToUpperCase} data-label={formatMessage(messages.reservationStatus)} column={formatMessage(messages.reservationStatus)} data={formatReservationState(item.reservationState)} />
                      <Td data-label={formatMessage(messages.payoutStatus)} column={formatMessage(messages.payoutStatus)}>
                        {
                          status && status.defaultMessage === 'Failed' ? <Link to={'/siteadmin/failed-payout/' + item.id}>{formatMessage(status)}</Link> : (status && status.id ? formatMessage(status) : status)
                        }
                      </Td>
                      <Td data-label={formatMessage(messages.holdPayout)} column={formatMessage(messages.holdPayout)}>
                        {
                          ((item && item.hostTransaction) || item.reservationState === 'expired'
                            || item.reservationState === 'declined') ? ' - ' : <select value={item.isHold} onChange={(e) => this.handleHoldPayout(e, item.id, currentPage)}>
                              <option value={true}>{formatMessage(messages.yesLabel)}</option>
                              <option value={false}>{formatMessage(messages.noLabel)}</option>
                            </select>
                        }
                      </Td>
                      <Td data-label={formatMessage(messages.details)} column={formatMessage(messages.details)}>
                        <Link to={"/siteadmin/viewpayout/" + item.id + '/payout'} >
                          <FormattedMessage {...messages.viewLabel} />
                        </Link>
                      </Td>
                    </Tr>
                  )
                })
              }
            </Table>
          </div>
          {
            getAllPayoutReservation && getAllPayoutReservation.reservationData && getAllPayoutReservation.reservationData.length > 0 &&
            <CustomPagination
              total={getAllPayoutReservation.count}
              currentPage={currentPage}
              defaultCurrent={1}
              defaultPageSize={10}
              change={this.paginationData}
              paginationLabel={formatMessage(messages.payoutsLabel)}
            />
          }
        </div>
      </div >
    )
  }
}

const mapState = (state) => ({
  completed: state.payout.completed,
  loading: state.payout.loading,
});

const mapDispatch = {
  updatePayoutStatus,
};
export default compose(injectIntl,
  withStyles(s),
  connect(mapState, mapDispatch),
  graphql(getAllPayoutsQuery, {
    name: 'getAllPayouts',
    options: (props) => ({
      variables: {
        currentPage: props.currentPage,
        searchList: props.searchList
      },
      fetchPolicy: 'network-only',
    })
  })
)(PayoutManagement);