import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Tr, Td, Thead, Th } from 'reactable';
import { connect } from 'react-redux';
import { deleteUser } from '../../../actions/siteadmin/users';
import Link from '../../../components/Link';

// Redux Action
import { updateBanServiceHistoryStatus } from '../../../actions/siteadmin/updateBanServiceHistoryStatus';

// Toaster
import { toastr } from 'react-redux-toastr';
import { graphql, gql, compose } from 'react-apollo';
import moment from 'moment';
import Confirm from 'react-confirm-bootstrap';

// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './UserManagement.css';
import cp from '../../../components/commonStyle.css';
import CustomPagination from '../../CustomPagination';
import usersQuery from './usersQuery.graphql';
import { FormControl } from 'react-bootstrap';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../locale/messages';

//Images
import ExportImage from '../../../../public/AdminIcons/export.png';

class UserManagement extends React.Component {
  static propTypes = {
    userManagement: PropTypes.array,
    editUser: PropTypes.any,
    deleteUser: PropTypes.any,
    title: PropTypes.string.isRequired,
    updateBanServiceHistoryStatus: PropTypes.any.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      currentPage: 1,
      searchList: '',
      typing: false,
      typingTimeout: 0
    }
    this.handleChange = this.handleChange.bind(this);
    this.paginationData = this.paginationData.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  async handleChange(e, userId, userMail, userName) {
    const { updateBanServiceHistoryStatus } = this.props;
    const { currentPage, searchList } = this.props;
    let id = userId;
    let banStatus = e.target.value;

    await updateBanServiceHistoryStatus(id, banStatus, userMail, userName, currentPage, searchList);
  }

  paginationData(currentPage) {
    const { userManagement: { refetch }, setStateVariable } = this.props;
    let variables = { currentPage };
    setStateVariable(variables);
    refetch(variables);
  }

  handleClick(searchList) {
    const { userManagement: { refetch }, setStateVariable } = this.props;
    const { currentPage } = this.state;
    let variables = {
      currentPage: 1,
      searchList: searchList
    };
    this.setState({ currentPage: 1 });
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

  async deleteChange(id, profileId, userType) {
    const { deleteUser } = this.props;
    const { userManagement: { refetch }, setStateVariable } = this.props;
    let variables = { currentPage: 1 };
    await deleteUser(id, profileId, userType);
    this.setState({ currentPage: 1 });
    await setStateVariable(variables);
    await refetch(variables);
  }

  render() {
    const { userManagement: { loading, userManagement } } = this.props;
    const { currentPage, searchList } = this.props;
    let userType = 'admin';
    const { formatMessage } = this.props.intl;

    return (
      <div className={cx(s.pagecontentWrapper, 'nobackground', 'pagecontentWrapperRTL')}>
        <div>
          <h1 className={s.headerTitle}><FormattedMessage {...messages.userManagement} /></h1>
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
                userManagement && userManagement.usersData && userManagement.usersData.length > 0 && <a href={`/export-admin-data?type=users&search=${searchList}`} className={cx(s.exportText, 'exportTextRTL')}>
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
              noDataText={formatMessage(messages.noRecordsFound)}
              sortable={true}
            >
              <Thead>
                <Th scope="col">{formatMessage(messages.profileID)}</Th>
                <Th scope="col">{formatMessage(messages.firstName)}</Th>
                <Th scope="col">{formatMessage(messages.lastName)}</Th>
                <Th scope="col">{formatMessage(messages.email)}</Th>
                <Th scope="col">{formatMessage(messages.phoneNumber)}</Th>
                <Th scope="col">{formatMessage(messages.createdDate)}</Th>
                <Th scope="col">{formatMessage(messages.viewLabel)}</Th>
                <Th scope="col">{formatMessage(messages.actionLabel)}</Th>
                <Th scope="col">{formatMessage(messages.delete)}</Th>
              </Thead>
              {
                userManagement && userManagement.usersData.length > 0 && userManagement.usersData.map((value, key) => {
                  let banStatus = value.userBanStatus;
                  let recordId = value.id;
                  let userMail = value.email;
                  let userName = value.profile && value.profile.firstName + ' ' + value.profile.lastName;
                  if (banStatus === 1) {
                    banStatus = "1";
                  } else if (banStatus === 0) {
                    banStatus = "0";
                  }
                  return (
                    <Tr key={key}>
                      <Td data-label={formatMessage(messages.profileID)} column={formatMessage(messages.profileID)} data={value.profile && value.profile.profileId} className={s.userVerticalAlign} />
                      <Td data-label={formatMessage(messages.firstName)} column={formatMessage(messages.firstName)} data={value.profile && value.profile.firstName} className={s.userVerticalAlign} />
                      <Td data-label={formatMessage(messages.lastName)} column={formatMessage(messages.lastName)} data={value.profile && value.profile.lastName} className={s.userVerticalAlign} />
                      <Td data-label={formatMessage(messages.email)} column={formatMessage(messages.email)} data={value.email} className={s.userVerticalAlign} />
                      <Td data-label={formatMessage(messages.phoneNumber)} column={formatMessage(messages.phoneNumber)} data={value.profile && value.profile.phoneNumber} className={s.userVerticalAlign} />
                      <Td data-label={formatMessage(messages.createdDate)} column={formatMessage(messages.createdDate)} data={moment(value.profile && value.profile.createdAt).format('MM/DD/YYYY')} className={cx(s.userVerticalAlign, 'paddingLeftRight')} />
                      <Td data-label={formatMessage(messages.viewLabel)} column={formatMessage(messages.viewLabel)} className={s.userVerticalAlign}>
                        <Link to={"/siteadmin/profileView/" + ((value.profile) ? value.profile.profileId : '')} >
                          <FormattedMessage {...messages.viewLabel} />
                        </Link>
                      </Td>
                      {
                        <Td data-label={formatMessage(messages.actionLabel)} column={formatMessage(messages.actionLabel)}>
                          <select name="userBanStatus" className={cx(s.formControlSelect, s.userVerticalAlign, s.btnMarginBottom)}
                            onChange={(e) => this.handleChange(e, recordId, userMail, userName)} value={banStatus}>
                            <option value="">{formatMessage(messages.selectLabel)}</option>
                            <option value="1">{formatMessage(messages.banLabel)}</option>
                            <option value="0">{formatMessage(messages.unBanLabel)}</option>
                          </select>
                        </Td>
                      }
                      <Td data-label={formatMessage(messages.delete)} column={formatMessage(messages.delete)}>
                        <div>
                          <Confirm
                            onConfirm={() => this.deleteChange(value.id, value.profile && value.profile.profileId, userType)}
                            body={formatMessage(messages.areYouSureDeleteWishList)}
                            confirmText={formatMessage(messages.confirmDelete)}
                            title={formatMessage(messages.deletingUser)}
                            cancelText={formatMessage(messages.cancel)}
                          >
                            <a href="javascript:void(0)"><FormattedMessage {...messages.delete} /></a>
                          </Confirm>
                        </div>
                      </Td>
                    </Tr>
                  )
                })
              }
            </Table>
          </div>
          {
            userManagement && userManagement.usersData && userManagement.usersData.length > 0
            && <div>
              <CustomPagination
                total={userManagement.count}
                currentPage={currentPage}
                defaultCurrent={1}
                defaultPageSize={10}
                change={this.paginationData}
                paginationLabel={formatMessage(messages.usersLabel)}
              />
            </div>
          }
        </div>
      </div>
    );
  }
}
const mapState = (state) => ({
});
const mapDispatch = {
  updateBanServiceHistoryStatus,
  deleteUser
};
export default compose(
  injectIntl,
  withStyles(s, cp),
  connect(mapState, mapDispatch),
  graphql(usersQuery, {
    name: 'userManagement',
    options: (props) => ({
      variables: {
        currentPage: props.currentPage,
        searchList: props.searchList,
      },
      fetchPolicy: 'network-only',
    })
  })
)(UserManagement);