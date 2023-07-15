import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table, Tr, Td, Thead, Th } from 'reactable';
import { connect } from 'react-redux';

import { deleteAdminReview } from '../../../actions/siteadmin/AdminReviews/deleteAdminReview';
import Link from '../../../components/Link';
import { graphql, gql, compose } from 'react-apollo';

// Toaster
import { toastr } from 'react-redux-toastr';
import moment from 'moment';
import Confirm from 'react-confirm-bootstrap';

// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AdminReviewsManagement.css';

import { censorEmail, censorPhone } from '../../../helpers/secureEmail';

import StarRating from '../../StarRating';
import { FormControl } from 'react-bootstrap';
import CustomPagination from '../../CustomPagination';
import reviewsManagement from './reviewsManagement.graphql';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../locale/messages';

class AdminReviewsManagement extends React.Component {

  static propTypes = {
    data: PropTypes.array,
    editUser: PropTypes.any,
    deleteAdminReview: PropTypes.any,
    title: PropTypes.string.isRequired,
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
    this.paginationData = this.paginationData.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  paginationData(currentPage) {
    const { reviewsManagement: { refetch }, setStateVariable } = this.props;
    let variables = { currentPage };
    setStateVariable(variables);
    refetch(variables);
  }

  handleClick(searchList) {
    const { reviewsManagement: { refetch }, setStateVariable } = this.props;
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

  async deleteReview(id) {
    const { deleteAdminReview, setStateVariable } = this.props;
    const { reviewsManagement: { refetch } } = this.props;
    let variables = { currentPage: 1 };
    await deleteAdminReview(id);
    await setStateVariable(variables);
    await refetch(variables);
  }

  render() {
    const { editUser, deleteAdminReview, title } = this.props;
    const { currentPage } = this.props;
    const { reviewsManagement: { loading, reviewsManagement } } = this.props;
    const { formatMessage } = this.props.intl;


    return (
      <div className={cx(s.pagecontentWrapper, 'pagecontentWrapperRTL')}>
        <div className={s.contentBox}>
          <h1 className={s.headerTitle}><FormattedMessage {...messages.adminReviews} /></h1>
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
            <Table className={cx("table", 'topScrollbarTableContent')}
              noDataText={formatMessage(messages.noRecordFound)}
              sortable={true}>
              <Thead>
                <Th scope="col">{formatMessage(messages.carID)}</Th>
                <Th scope="col">{formatMessage(messages.carNameLabel)}</Th>
                <Th scope="col">{formatMessage(messages.reviewContentLabel)}</Th>
                <Th scope="col">{formatMessage(messages.ratingReviewLabel)}</Th>
                <Th scope="col">{formatMessage(messages.editLabel)}</Th>
                <Th scope="col">{formatMessage(messages.delete)}</Th>
              </Thead>
              {
                reviewsManagement && reviewsManagement.reviewsData.length > 0 && reviewsManagement.reviewsData.map((value, key) => {
                  return (
                    <Tr key={key}>
                      <Td data-label={formatMessage(messages.carID)} column={formatMessage(messages.carID)} data={value.listId} />
                      <Td data-label={formatMessage(messages.carNameLabel)} column={formatMessage(messages.carNameLabel)}>
                        <Link to={"/cars/" + value.listId}>
                          {
                            value.listData ? value.listData.title : 'Car is missing'
                          }
                        </Link>
                      </Td>
                      <Td data-label={formatMessage(messages.reviewContentLabel)} column={formatMessage(messages.reviewContentLabel)} data={value.reviewContent} />
                      <Td data-label={formatMessage(messages.ratingReviewLabel)} column={formatMessage(messages.ratingReviewLabel)}>
                        <StarRating className={s.reviewStar} value={value.rating} name={'review'} />
                      </Td>
                      <Td data-label={formatMessage(messages.editLabel)} column={formatMessage(messages.editLabel)}>
                        <Link to={"/siteadmin/edit-review/" + value.id}>
                          <FormattedMessage {...messages.editLabel} />
                        </Link>
                      </Td>
                      <Td data-label={formatMessage(messages.delete)} column={formatMessage(messages.delete)}>
                        <div>
                          <Confirm
                            onConfirm={() => this.deleteReview(value.id)}
                            body={formatMessage(messages.areYouSureDeleteWishList)}
                            confirmText={formatMessage(messages.confirmDelete)}
                            title={formatMessage(messages.deleteReviewLabel)}
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
            reviewsManagement && reviewsManagement.reviewsData && reviewsManagement.reviewsData.length > 0
            && <div>
              <CustomPagination
                total={reviewsManagement.count}
                currentPage={currentPage}
                defaultCurrent={1}
                defaultPageSize={10}
                change={this.paginationData}
                paginationLabel={formatMessage(messages.reviews)}
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
  deleteAdminReview,
};

export default compose(injectIntl,
  withStyles(s),
  connect(mapState, mapDispatch),
  graphql(reviewsManagement, {
    name: 'reviewsManagement',
    options: (props) => ({
      variables: {
        currentPage: props.currentPage,
        searchList: props.searchList,
      },
      fetchPolicy: 'network-only',
    })
  })
)(AdminReviewsManagement);