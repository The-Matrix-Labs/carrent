import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table, Tr, Td, Thead, Th } from 'reactable';

// Redux
import { connect } from 'react-redux';
import { openListSettingsModal } from '../../../actions/siteadmin/modalActions';
import { graphql, gql, compose } from 'react-apollo';

// Redux Form
import { initialize } from 'redux-form';

// Toaster
import { toastr } from 'react-redux-toastr';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../locale/messages';

// Component
import ListSettingsModal from '../ListSettingsModal';
//import Link from '../../../components/Link';
import AddListSettingsForm from '../ListSettingsForm/AddListSettingsForm';
import EditListSettingsForm from '../ListSettingsForm/EditListSettingsForm';
import Loader from '../../Loader';

// Style
import cx from 'classnames';
import {
  Button,
  Col
} from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ListSettingsManagement.css';
import cp from '../../../components/commonStyle.css';
import CustomPagination from '../../CustomPagination';

import { getAdminListingSettings } from '../../../actions/siteadmin/getAdminListingSettings';

class ListSettingsManagement extends React.Component {

  static defaultProps = {
    loading: true
  };

  constructor(props) {
    super(props);
    this.paginationData = this.paginationData.bind(this);
  }

  async paginationData(currentPage, typeId) {
    const { getAdminListingSettings } = this.props;
    await getAdminListingSettings(typeId, currentPage);
  }

  renderTable(listSettingsTypeData, listSettingsData, count) {
    const { openListSettingsModal, page } = this.props;
    const { formatMessage } = this.props.intl;
    let currentTypeId = listSettingsTypeData && listSettingsTypeData.id;

    return (
      <div>
        <ListSettingsModal />
        <div className={s.space4}>
          <Button className={cx(cp.btnPrimary, cp.btnlarge)}
            onClick={() => openListSettingsModal({ typeId: listSettingsTypeData.id }, "AddListSettingsForm")}>            <FormattedMessage {...messages.addNewLabel} />
          </Button>
        </div>
        <div className={cx('table-responsive', 'tableBorderRadiusAdmin', 'NewAdminResponsiveTable', 'NewResponsiveTableAdmin', 'tableOne')}>
          <Table className="table"
            noDataText={formatMessage(messages.noRecordFound)}
            sortable={true}
            defaultSort={{ column: 'Settings ID', direction: 'desc' }}
          >
            <Thead>
              <Th scope="col">{formatMessage(messages.settingsIDLabel)}</Th>
              <Th scope="col">{formatMessage(messages.addNew)}</Th>
              <Th scope="col">{formatMessage(messages.status)}</Th>
              <Th scope="col">{formatMessage(messages.operationLabel)}</Th>
            </Thead>
            {
              listSettingsData && listSettingsData.length > 0 && listSettingsData.map(function (item, key) {
                let status = item.isEnable == 1 ? formatMessage(messages.enabledLabel) : formatMessage(messages.disabledLabel);
                return (
                  <Tr key={key}>
                    <Td data-label={formatMessage(messages.settingsIDLabel)} column={formatMessage(messages.settingsIDLabel)} data={item.id} />
                    <Td data-label={formatMessage(messages.addNew)} column={formatMessage(messages.addNew)} data={item.itemName} />
                    {
                      currentTypeId == 1 && <Td data-label={formatMessage(messages.addNewDescription)} column={formatMessage(messages.addNewDescription)}>
                        <span className={cx(s.nxtLineStyle)}>{item.itemDescription}</span>
                      </Td>
                    }
                    {
                      currentTypeId == 3 && <Td data-label={formatMessage(messages.makeLabel)} column={formatMessage(messages.makeLabel)} data={item.makeTypeLabel} />
                    }
                    <Td data-label={formatMessage(messages.status)} column={formatMessage(messages.status)} data={status} />
                    <Td data-label={formatMessage(messages.operationLabel)} column={formatMessage(messages.operationLabel)}>
                      <Button className={cx(cp.btnPrimaryBorder)} onClick={() => openListSettingsModal(item, "EditListSettingsForm")}>
                        <FormattedMessage {...messages.manageLabel} />
                      </Button>
                    </Td>
                  </Tr>
                )
              })
            }
          </Table>
        </div>
        {
          listSettingsData && listSettingsData.length > 0 && <div>
            <CustomPagination
              total={count}
              currentPage={page}
              defaultCurrent={1}
              defaultPageSize={10}
              change={(e) => this.paginationData(e, currentTypeId)}
              paginationLabel={formatMessage(messages.listSettings)}
            />
          </div>
        }
      </div>
    );

  }

  renderForm(listSettingsTypeData, listSettingsData) {
    return (
      <div>
        <EditListSettingsForm
          initialValues={listSettingsData && listSettingsData.length > 0 && listSettingsData[0]}
          fieldType={listSettingsTypeData.fieldType}
        />
      </div>
    );
  }

  render() {
    const { loading, adminListSettings } = this.props;
    let listSettingsTypeData, listSettingsData, count, errorMessage, status;

    if (!loading && adminListSettings) {
      status = adminListSettings.getAllAdminListSettings && adminListSettings.getAllAdminListSettings.status;
      if (status === 200) {
        listSettingsTypeData = adminListSettings.getAllAdminListSettings.listSettingsTypeData;
        listSettingsData = adminListSettings.getAllAdminListSettings.listSettingsData;
        count = adminListSettings.getAllAdminListSettings.count;
      } else {
        errorMessage = adminListSettings.getAllAdminListSettings.errorMessage;
      }
    }

    if (loading) {
      return <Loader type={"text"} />;
    } else {
      if (listSettingsTypeData.fieldType === "numberType") {
        return (
          <div className={cx(s.pagecontentWrapper, 'pagecontentWrapperRTL')}>
            <div className={s.contentBox}>
              <h1 className={s.headerTitle}>{listSettingsTypeData.typeLabel}</h1>
              {this.renderForm(listSettingsTypeData, listSettingsData)}
            </div>
          </div>
        )
      } else {
        return (
          <div className={cx(s.pagecontentWrapper, 'pagecontentWrapperRTL')}>
            <div className={s.contentBox}>
              <h1 className={s.headerTitle}>{listSettingsTypeData.typeLabel}</h1>
              {this.renderTable(listSettingsTypeData, listSettingsData, count)}
            </div>
          </div>
        )
      }
    }
  }
}

const mapState = (state) => ({
  loading: state.adminListSettingsData.loading,
  adminListSettings: state.adminListSettingsData.data,
  page: state.adminListSettingsData.currentPage
});

const mapDispatch = {
  openListSettingsModal,
  getAdminListingSettings
};

export default compose(
  injectIntl,
  withStyles(s, cp),
  connect(mapState, mapDispatch)
)(ListSettingsManagement);