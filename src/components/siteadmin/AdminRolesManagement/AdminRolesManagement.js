import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Tr, Td, Thead, Th } from 'reactable';
import { connect } from 'react-redux';
import { graphql, gql, compose } from 'react-apollo';
import { FormControl, Button } from 'react-bootstrap';
import { FormattedMessage, injectIntl } from 'react-intl';

// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AdminRolesManagement.css';
import cp from '../../../components/commonStyle.css';

import { openAdminRolesModal } from '../../../actions/siteadmin/modalActions';
import { deleteAdminRole } from '../../../actions/siteadmin/AdminRoles/manageAdminRoles';

import CustomPagination from '../../CustomPagination';
import AdminRolesModal from '../AdminRolesModal';
import Link from '../../Link';

import adminRolesQuery from './adminRolesQuery.graphql';

// Translation
import messages from '../../../locale/messages';
import debounce from '../../../helpers/debounce';

class AdminRolesManagement extends React.Component {

  static propTypes = {
    adminRoles: PropTypes.array,
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
    const { adminRoles: { refetch }, setStateVariable } = this.props;
    let variables = { currentPage };
    setStateVariable(variables);
    refetch(variables);
  }
  async handleDelete(id) {
    const { adminRoles: { refetch }, setStateVariable } = this.props;
    const { deleteAdminRole } = this.props;
    let variables = { currentPage: 1 };
    await deleteAdminRole(id);
    this.setState({ currentPage: 1 });
    await setStateVariable(variables);
    await refetch(variables);
  }
  handleKeywordSearch(searchList) { // Keyword search
    const { adminRoles: { refetch }, setStateVariable } = this.props;
    const { currentPage } = this.state;
    let variables = {
      currentPage: 1,
      searchList
    };
    setStateVariable(variables);
    refetch(variables);
  }

  render() {
    const { adminRoles, adminRoles: { loading, getAllAdminRoles } } = this.props;
    const { currentPage, openAdminRolesModal, deleteAdminRole } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <div className={cx(s.pagecontentWrapper, 'pagecontentWrapperRTL')}>
        <AdminRolesModal paginationData={this.paginationData} />

        <div>
          <h1 className={s.headerTitle}><FormattedMessage {...messages.manageAdminRoles} /></h1>
          <div className={s.space4}>
          <Button
            className={cx(cp.btnPrimary, cp.btnlarge)}
            onClick={() => openAdminRolesModal('add')}>
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
            <Table
              className="table"
              noDataText={formatMessage(messages.noRecordFound)}
              sortable={true}
            >
              <Thead>
                <Th scope="col">{formatMessage(messages.idLabel)}</Th>
                <Th scope="col">{formatMessage(messages.name)}</Th>
                <Th scope="col">{formatMessage(messages.descriptionAdminLabel)}</Th>
                <Th scope="col">{formatMessage(messages.editLabel)}</Th>
                <Th scope="col">{formatMessage(messages.delete)}</Th>
              </Thead>
              {
                adminRoles && getAllAdminRoles && getAllAdminRoles.count > 0 && getAllAdminRoles.results && getAllAdminRoles.results.map((value, key) => {
                  return (
                    <Tr key={key}>
                      <Td data-label={formatMessage(messages.idLabel)} column={formatMessage(messages.idLabel)} data={value.id} />
                      <Td data-label={formatMessage(messages.name)} column={formatMessage(messages.name)} data={value.name} />
                      <Td data-label={formatMessage(messages.descriptionAdminLabel)} column={formatMessage(messages.descriptionAdminLabel)} data={value.description} />
                      <Td data-label={formatMessage(messages.editLabel)} column={formatMessage(messages.editLabel)}>
                        <Link noLink onClick={() => openAdminRolesModal('edit', value)}><FormattedMessage {...messages.editLabel} /></Link>
                      </Td>
                      <Td data-label={formatMessage(messages.delete)} column={formatMessage(messages.delete)}>
                        <Link noLink onClick={() => this.handleDelete(value.id)}><FormattedMessage {...messages.delete} /></Link>
                      </Td>
                    </Tr>
                  )
                })
              }
              {
                adminRoles && getAllAdminRoles && getAllAdminRoles.count === 0 && <tr>
                  <td colSpan={4}>
                    <FormattedMessage {...messages.noResult} />
                  </td>
                </tr>
              }
            </Table>
          </div>
          {
            adminRoles && getAllAdminRoles && getAllAdminRoles.count > 0
            && <div>
              <CustomPagination
                total={getAllAdminRoles.count}
                currentPage={currentPage}
                defaultCurrent={1}
                defaultPageSize={10}
                change={this.paginationData}
                paginationLabel={formatMessage(messages.roles)}
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
  openAdminRolesModal,
  deleteAdminRole
};
export default compose(
  injectIntl,
  withStyles(s, cp),
  connect(mapState, mapDispatch),
  graphql(adminRolesQuery, {
    name: 'adminRoles',
    options: (props) => ({
      variables: {
        searchList: props.searchList,
        currentPage: props.currentPage,
      },
      fetchPolicy: 'network-only',
      ssr: true
    })
  }),
)(AdminRolesManagement);