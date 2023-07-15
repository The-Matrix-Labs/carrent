import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table, Tr, Td, Thead, Th } from 'reactable';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { graphql, gql, compose } from 'react-apollo';


// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './DocumentVerification.css';

import DocumentManagement from './DocumentManagementQuery.graphql';

// Send Email
import { sendEmail } from '../../../core/email/sendEmail';

//Document List
import FileList from './FileList';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../locale/messages';


const query = gql`query showAllDocument
{
  showAllDocument {
    id,
    email,
     profile{
          firstName
    }
    document{      
       fileName
        fileType
        documentStatus
    }
    verification{
      isIdVerification
    }
  }
}
`;


class DocumentVerification extends React.Component {

  static propTypes = {
    data: PropTypes.array,
    title: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  async handleUpdate(id, status, item) {
    const { mutate } = this.props;
    const { data } = await mutate({
      variables: {
        userId: id,
        isIdVerification: status
      },
      refetchQueries: [{ query }]
    });

    if (data.DocumentManagement.status === 'success') {
      let msg = 'Documents have been ';
      msg += (status) ? 'Approved!' : 'Rejected!';
      let content = {
        name: item.profile.firstName,
        verificationStatus: (status) ? 'approved' : 'rejected'
      }
      await sendEmail(item.email, 'documentVerification', content);
      toastr.success("Success!", msg);
    } else {
      toastr.error("Error!", "Something went wrong!" + data.DocumentManagement && data.DocumentManagement.errorMessage);
    }
  }


  render() {
    const { dataList, intl, title } = this.props;
    const { formatMessage } = this.props.intl;
    let path = "/images/document/";

    return (
      <div className={cx(s.pagecontentWrapper, 'pagecontentWrapperRTL')}>
        <h1 className={s.headerTitle}> <FormattedMessage {...messages.documentVerificationManagement} /></h1>
        <div className={cx('table-responsive', 'tableBorderRadiusAdmin', 'NewAdminResponsiveTable', 'NewResponsiveTableAdmin', 'tableOne')}>
          <Table className="table" noDataText={formatMessage(messages.noRecordFound)}>
            <Thead>
              <Th scope="col">{formatMessage(messages.sNoLabel)}</Th>
              <Th scope="col">{formatMessage(messages.userNameLabel)}</Th>
              <Th scope="col">{formatMessage(messages.userEmailLabel)}</Th>
              <Th scope="col">{formatMessage(messages.requestedFiles)}</Th>
              <Th scope="col">{formatMessage(messages.actionLabel)}</Th>
            </Thead>
            {
              dataList && dataList.map((value, key) => {
                let icon = value.fileType == 'application/pdf' ? 'PDF' : 'Image';
                return (
                  <Tr key={key}>
                    <Td data-label={formatMessage(messages.sNoLabel)} column={formatMessage(messages.sNoLabel)} data={key + 1} />
                    <Td data-label={formatMessage(messages.userNameLabel)} column={formatMessage(messages.userNameLabel)} data={value.profile.firstName} />
                    <Td data-label={formatMessage(messages.userEmailLabel)} column={formatMessage(messages.userEmailLabel)} data={value.email} />
                    <Td data-label={formatMessage(messages.requestedFiles)} column={formatMessage(messages.requestedFiles)}>
                      <FileList key={'f' + key} data={value.document} />
                    </Td>
                    <Td data-label={formatMessage(messages.actionLabel)} column={formatMessage(messages.actionLabel)}>
                      <div>
                        <a
                          href="javascript:void(0)"
                          onClick={() => this.handleUpdate(value.id, !value.verification.isIdVerification, value)}
                        >
                          <span>{value.verification.isIdVerification ? formatMessage(messages.documentReject) : formatMessage(messages.approve)}</span>
                        </a>
                      </div>
                    </Td>
                  </Tr>
                )
              })
            }
          </Table>
        </div>
      </div>
    );
  }

}

const mapState = (state) => ({
});

const mapDispatch = {

};

export default compose(injectIntl, withStyles(s), connect(mapState, mapDispatch), graphql(DocumentManagement, { options: { fetchPolicy: 'network-only' } }))(DocumentVerification);