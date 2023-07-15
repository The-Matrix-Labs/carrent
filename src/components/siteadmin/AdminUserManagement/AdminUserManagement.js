import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table, Tr, Td, Thead, Th } from 'reactable';
import { connect } from 'react-redux';
import { FormControl, Button } from 'react-bootstrap';
import { graphql, gql, compose } from 'react-apollo';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';

// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AdminUserManagement.css';
import cp from '../../../components/commonStyle.css';

// Redux Actions
import { openAdminUserModal } from '../../../actions/siteadmin/modalActions';
import { deleteAdminUser } from '../../../actions/siteadmin/AdminUser/manageAdminUser';

// Components
import AdminUserModal from '../AdminUserModal';
import Link from '../../Link';
import CustomPagination from '../../CustomPagination';
import adminUserQuery from './adminUserQuery.graphql';
import adminRolesQuery from './adminRolesQuery.graphql';
import messages from '../../../locale/messages';
import debounce from '../../../helpers/debounce';

class AdminUserManagement extends React.Component {

  static propTypes = {
    adminUsers: PropTypes.array,
    title: PropTypes.string.isRequired,
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
    this.handleKeywordSearch = debounce(this.handleKeywordSearch.bind(this));
    this.handleDelete = this.handleDelete.bind(this);
  }
  paginationData(currentPage) {
    const { adminUsers: { refetch }, setStateVariable } = this.props;
    let variables = { currentPage };
    setStateVariable(variables);
    refetch(variables);
  }
  handleKeywordSearch(searchList) { // Keyword search
    const { adminUsers: { refetch }, setStateVariable } = this.props;
    const { currentPage } = this.state;
    let variables = {
      currentPage: 1,
      searchList
    };
    setStateVariable(variables);
    refetch(variables);
  }
  async handleDelete(id) {
    const { adminUsers: { refetch }, setStateVariable, deleteAdminUser } = this.props;
    let variables = { currentPage: 1 };
    await deleteAdminUser(id);
    await setStateVariable(variables);
    await refetch(variables);
  }

  render() {
    const { adminUsers, adminUsers: { loading, getAllAdminUsers } } = this.props;
    const { adminRoles: { getAdminRoles } } = this.props;
    const { openAdminUserModal, currentPage } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <div className={cx(s.pagecontentWrapper, 'pagecontentWrapperRTL')}>
        <AdminUserModal paginationData={this.paginationData} roles={getAdminRoles} />

        <div>
          <h1 className={s.headerTitle}><FormattedMessage {...messages.manageAdminUsers} /></h1>
          <div className={s.space4}>
            <Button
              className={cx(cp.btnPrimary, cp.btnlarge)}
              onClick={() => openAdminUserModal('add')}>
              <FormattedMessage {...messages.addNewLabel} />
            </Button>
          </div>
          <div className={cx(s.exportSection, s.exportSectionGridSub)}>
            <div>
              <FormControl
                type="text"
                placeholder={formatMessage(messages.search)}
                onChange={(e) => this.handleKeywordSearch(e.target && e.target.value)}
                className={cx('searchInputControl', 'searchInputControlWidth')}
              />
            </div>
          </div>

          <div className={cx('table-responsive', 'listing-table', 'NewAdminResponsiveTable', 'NewResponsiveTableAdmin', 'tableTwo')}>
            <Table className={'table'} noDataText={formatMessage(messages.noRecordFound)} sortable={true}>
              <Thead>
                <Th scope="col">{formatMessage(messages.emailLabel)}</Th>
                <Th scope="col">{formatMessage(messages.adminRoleLabel)}</Th>
                <Th scope="col">{formatMessage(messages.editLabel)}</Th>
                <Th scope="col">{formatMessage(messages.delete)}</Th>
              </Thead>
              {
                adminUsers && getAllAdminUsers && getAllAdminUsers.count > 0 && getAllAdminUsers.results && getAllAdminUsers.results.map((value, key) => {
                  return (
                    <Tr key={key}>
                      <Td data-label={formatMessage(messages.emailLabel)} column={formatMessage(messages.emailLabel)} data={value.email} />
                      <Td data-label={formatMessage(messages.adminRoleLabel)} column={formatMessage(messages.adminRoleLabel)} data={value.adminRole && value.adminRole.name} />
                      <Td data-label={formatMessage(messages.editLabel)} column={formatMessage(messages.editLabel)}>
                        <Link noLink onClick={() => openAdminUserModal('edit', value)}><FormattedMessage {...messages.editLabel} /></Link>
                      </Td>
                      <Td data-label={formatMessage(messages.delete)} column={formatMessage(messages.delete)}>
                        <Link noLink onClick={() => this.handleDelete(value.id)}><FormattedMessage {...messages.delete} /></Link>
                      </Td>
                    </Tr>
                  )
                })
              }
            </Table>
          </div>
          {
            adminUsers && getAllAdminUsers && getAllAdminUsers.count > 0
            && <div>
              <CustomPagination
                total={getAllAdminUsers.count}
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
  openAdminUserModal,
  deleteAdminUser
};
export default compose(
  injectIntl,
  withStyles(s, cp),
  connect(mapState, mapDispatch),
  graphql(adminUserQuery, {
    name: 'adminUsers',
    options: (props) => ({
      variables: {
        searchList: props.searchList,
        currentPage: props.currentPage,
      },
      fetchPolicy: 'network-only',
      ssr: true
    })
  }),
  graphql(adminRolesQuery, {
    name: 'adminRoles',
    options: {
      fetchPolicy: 'network-only',
      ssr: true
    }
  })
)(AdminUserManagement);