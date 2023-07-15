import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table, Tr, Td, Thead, Th } from 'reactable';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import moment from 'moment';
import { FormControl } from 'react-bootstrap';
import { compose } from 'react-apollo';

// Redux Action
import { viewReceiptAdmin } from '../../../actions/Reservation/viewReceiptAdmin';

// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ReservationManagement.css';

// Components
import Payout from './Payout';
import Refund from './Refund';
import CurrencyConverter from '../../CurrencyConverter';
import Link from '../../Link';
import ModalForm from './ModalForm';
import CustomPagination from '../../CustomPagination';

//Images
import ExportImage from '../../../../public/AdminIcons/export.png';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../locale/messages';
//Helper
import formatReservationState from '../../../helpers/formatReservationState';
class ReservationManagement extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.shape({
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
    viewReceiptAdmin: PropTypes.any.isRequired,
  };

  static defaultProps = {
    data: {
      loading: true,
      getAllReservationAdmin: {
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
      typingTimeout: 0,
      selectedRefund: [],
      successRefund: [],
      selectedPayout: [],
      successPayout: [],
    };
    this.paginationData = this.paginationData.bind(this);
    this.changeState = this.changeState.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }



  changeState(type, value) {
    const { selectedRefund, successRefund, selectedPayout, successPayout } = this.state;
    const { searchList, currentPage, getAllReservationAdmin: { refetch } } = this.props;
    let variables = {};

    if (type === 'addRefund') {
      variables = { selectedRefund: [...selectedRefund, value] };
    }
    if (type === 'removeRefund') {
      let index = selectedRefund.findIndex(i => i === value);
      if (index === -1) return '';
      let data = [...selectedRefund];
      data.splice(index, 1)
      variables = { selectedRefund: data };
    }
    if (type === 'successRefund') {
      variables = { successRefund: [...successRefund, value] };
    }

    if (type === 'addPayout') {
      variables = { selectedPayout: [...selectedPayout, value] };
    }
    if (type === 'removePayout') {
      let index = selectedPayout.findIndex(i => i === value);
      if (index === -1) return '';
      let data = [...selectedPayout];
      data.splice(index, 1)
      variables = { selectedPayout: data };
    }
    if (type === 'successPayout') {
      variables = { successPayout: [...successPayout, value] };
      refetch({ currentPage, searchList });
    }
    this.setState(variables)
  }

  paginationData(currentPage) {
    const { getAllReservationAdmin: { refetch }, changeStateValues, searchList } = this.props;
    let variables = { currentPage, searchList };
    changeStateValues(variables);
    refetch(variables);
  }

  handleClick(searchList) {
    const { getAllReservationAdmin: { refetch }, changeStateValues } = this.props;
    let variables = {
      currentPage: 1,
      searchList: searchList
    };
    changeStateValues(variables);
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


  render() {
    const { getAllReservationAdmin: { getAllReservationAdmin }, currentPage, searchList } = this.props;
    const { selectedRefund, successRefund, selectedPayout, successPayout } = this.state;
    const { formatMessage } = this.props.intl;

    return (
      <div className={cx(s.pagecontentWrapper, 'pagecontentWrapperRTL')}>
        <ModalForm />
        <div>
          <h1 className={s.headerTitle}><FormattedMessage {...messages.panelReservation} /></h1>
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
                  href={`/export-admin-data?type=reservations&search=${searchList}`} className={cx(s.exportText, 'exportTextRTL')}>
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
                <Th scope="col">{formatMessage(messages.reservationId)}</Th>
                <Th scope="col">{formatMessage(messages.codeLabel)}</Th>
                <Th scope="col">{formatMessage(messages.status)}</Th>
                <Th scope="col">{formatMessage(messages.carNameLabel)}</Th>
                <Th scope="col">{formatMessage(messages.refundToRenter)}</Th>
                <Th scope="col">{formatMessage(messages.subTotalLabel)}</Th>
                <Th scope="col">{formatMessage(messages.payoutLabelAdmin)}</Th>
                <Th scope="col">{formatMessage(messages.details)}</Th>
              </Thead>
              {
                getAllReservationAdmin && getAllReservationAdmin.reservationData && getAllReservationAdmin.reservationData.length > 0 && getAllReservationAdmin.reservationData.map((value, index) => {
                  let subTotal = value.total + value.guestServiceFee;
                  return (
                    <Tr key={index}>
                      <Td data-label={formatMessage(messages.reservationId)} column={formatMessage(messages.reservationId)} data={value.id} />
                      <Td data-label={formatMessage(messages.codeLabel)} column={formatMessage(messages.codeLabel)}>
                        {value.confirmationCode}
                      </Td>
                      <Td className={s.ChangeToUpperCase} data-label={formatMessage(messages.status)} column={formatMessage(messages.status)} data={formatReservationState(value.reservationState)} />
                      {
                        value.listData && <Td data-label={formatMessage(messages.carNameLabel)} column={formatMessage(messages.carNameLabel)}>
                          <a href={"/cars/" + value.listId} target='_blank'>
                            {value.listData.title}
                          </a>
                        </Td>
                      }
                      {
                        !value.listData && <Td data-label={formatMessage(messages.carNameLabel)} column={formatMessage(messages.carNameLabel)} data={formatMessage(messages.carNameIsMissing)} />
                      }
                      <Td data-label={formatMessage(messages.refundToRenter)} column={formatMessage(messages.refundToRenter)}>
                        <Refund
                          id={value.id}
                          reservationState={value.reservationState}
                          transactionData={value.transaction}
                          refundData={value.refundStatus}
                          cancelData={value.cancellationDetails}
                          selectedRefund={selectedRefund}
                          changeState={this.changeState}
                          successRefund={successRefund}
                        />
                      </Td>
                      <Td data-label={formatMessage(messages.subTotalLabel)} column={formatMessage(messages.subTotalLabel)}>
                        <CurrencyConverter
                          amount={subTotal}
                          from={value.currency}
                        />
                      </Td>
                      <Td data-label={formatMessage(messages.payoutLabelAdmin)} column={formatMessage(messages.payoutLabelAdmin)}>
                        <Payout
                          hostId={value.hostId}
                          checkIn={value.checkIn}
                          id={value.id}
                          hostPayout={value.hostPayout}
                          amount={value.total}
                          currency={value.currency}
                          hostTransaction={value.hostTransaction}
                          reservationState={value.reservationState}
                          cancelData={value.cancellationDetails}
                          hostData={value.hostData}
                          hostServiceFee={value.hostServiceFee}
                          selectedPayout={selectedPayout}
                          successPayout={successPayout}
                          changeState={this.changeState}
                        />
                      </Td>
                      <Td data-label={formatMessage(messages.details)} column={formatMessage(messages.details)}>
                        <Link to={"/siteadmin/viewreservation/" + value.id + '/reservation'} >
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
});

const mapDispatch = {
  viewReceiptAdmin,
};

export default compose(injectIntl,
  withStyles(s),
  connect(mapState, mapDispatch)
)(ReservationManagement);