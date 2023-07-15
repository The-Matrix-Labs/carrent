import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table, Tr, Td, Thead, Th } from 'reactable';
import { connect } from 'react-redux';

import Link from '../../../components/Link';

import {
    updateReviewStatus
} from '../../../actions/siteadmin/UserReview/manageReviews';
import { FormControl } from 'react-bootstrap';
import moment from 'moment';
import Confirm from 'react-confirm-bootstrap';
import CustomPagination from '../../CustomPagination';

// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './UserReviewsManagement.css';

import { censorEmail, censorPhone } from '../../../helpers/secureEmail';

import StarRating from '../../StarRating';
// Translation
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../locale/messages';
class UserReviewsManagement extends React.Component {

    static propTypes = {
        data: PropTypes.array,
        editUser: PropTypes.func,
        title: PropTypes.string.isRequired,
        updateReviewStatus: PropTypes.func.isRequired,
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
        const { refetch } = this.props;
        let variables = { currentPage };
        this.setState({ currentPage });
        refetch(variables);
    }

    handleClick(searchList) {
        const { refetch } = this.props;
        const { currentPage } = this.state;
        let variables = {
            currentPage: 1,
            searchList: searchList
        };
        this.setState({ currentPage: 1 });
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
        const { data, editUser, title } = this.props;
        const { updateReviewStatus } = this.props;
        const { formatMessage } = this.props.intl;
        const { currentPage, searchList } = this.state;

        return (
            <div className={cx(s.pagecontentWrapper, 'pagecontentWrapperRTL')}>
                <div className={s.contentBox}>
                    <h1 className={s.headerTitle}><FormattedMessage {...messages.usersReviews} /></h1>
                    <div className={cx(s.exportSection, s.exportSectionGridSub)}>
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
                        <Table className={cx("table", 'topScrollbarTableContent')} noDataText={formatMessage(messages.noRecordFound)}>
                            <Thead>
                                <Th scope="col">{formatMessage(messages.listId)}</Th>
                                <Th scope="col">{formatMessage(messages.reviewContentLabel)}</Th>
                                <Th scope="col">{formatMessage(messages.adminListTitle)}</Th>
                                <Th scope="col">{formatMessage(messages.reservationConfirmCode)}</Th>
                                <Th scope="col">{formatMessage(messages.CheckInDate)}</Th>
                                <Th scope="col">{formatMessage(messages.CheckOutDate)}</Th>
                                <Th scope="col">{formatMessage(messages.SenderLabel)}</Th>
                                <Th scope="col">{formatMessage(messages.receiverLabel)}</Th>
                                <Th scope="col">{formatMessage(messages.ratingReviewLabel)}</Th>
                                <Th scope="col">{formatMessage(messages.reviewStatusLabel)}</Th>
                                <Th scope="col">{formatMessage(messages.reviewActionLabel)}</Th>
                                <Th scope="col">{formatMessage(messages.actionLabel)}</Th>
                            </Thead>
                            {
                                data && data.reviewsData.length > 0 && data.reviewsData.map(function (value, key) {
                                    let content = value.reviewContent;
                                    let reviewContent = content.slice(0, 10);
                                    let dots = '...'
                                    let isContent = false;
                                    if (content.length > 10) {
                                        isContent = true;
                                    } else {
                                        isContent = false;
                                    }
                                    let hostName = value.userData && value.userData.firstName;
                                    let guestName = value.authorData && value.authorData.firstName;
                                    let hostProfileId = value.userData && value.userData.profileId;
                                    let guestProfileId = value.authorData && value.authorData.profileId;
                                    let title = value.listData && value.listData.title ? value.listData.title : 'List is missing';
                                    let confirmationCode = value.singleReservationData && value.singleReservationData.confirmationCode ? value.singleReservationData.confirmationCode : '';
                                    let checkInDate = value.singleReservationData && value.singleReservationData.checkIn ? moment(value.singleReservationData.checkIn).format('DD-MM-YYYY') : '';
                                    let checkOutDate = value.singleReservationData && value.singleReservationData.checkOut ? moment(value.singleReservationData.checkOut).format('DD-MM-YYYY') : '';


                                    return (
                                        <Tr key={key}>
                                            <Td data-label={formatMessage(messages.listId)} column={formatMessage(messages.listId)} data={value.listId} />
                                            {
                                                isContent && <Td data-label={formatMessage(messages.reviewContentLabel)} column={formatMessage(messages.reviewContentLabel)}>
                                                    {reviewContent.concat(dots)}
                                                </Td>
                                            }
                                            {
                                                title && <Td data-label={formatMessage(messages.adminListTitle)} column={formatMessage(messages.adminListTitle)}>
                                                    <a href={"/cars/" + value.listId} target="_blank">
                                                        {title}
                                                    </a>
                                                </Td>
                                            }
                                            {
                                                confirmationCode && <Td data-label={formatMessage(messages.reservationConfirmCode)} column={formatMessage(messages.reservationConfirmCode)}>
                                                    {confirmationCode}
                                                </Td>
                                            }
                                            {
                                                checkInDate && <Td data-label={formatMessage(messages.CheckInDate)} column={formatMessage(messages.CheckInDate)}>
                                                    {checkInDate}
                                                </Td>
                                            }
                                            {
                                                checkOutDate && <Td data-label={formatMessage(messages.CheckOutDate)} column={formatMessage(messages.CheckOutDate)}>
                                                    {checkOutDate}
                                                </Td>
                                            }
                                            {
                                                !isContent && <Td data-label={formatMessage(messages.reviewContentLabel)} column={formatMessage(messages.reviewContentLabel)}>
                                                    {reviewContent}
                                                </Td>
                                            }

                                            {
                                                guestName && <Td data-label={formatMessage(messages.SenderLabel)} column={formatMessage(messages.SenderLabel)}>
                                                    <a href={"/users/show/" + guestProfileId} target="_blank">
                                                        {guestName}
                                                    </a>
                                                </Td>
                                            }

                                            {
                                                hostName && <Td data-label={formatMessage(messages.receiverLabel)} column={formatMessage(messages.receiverLabel)}>
                                                    <a href={"/users/show/" + hostProfileId} target="_blank">
                                                        {hostName}
                                                    </a>
                                                </Td>
                                            }

                                            <Td data-label={formatMessage(messages.ratingReviewLabel)} column={formatMessage(messages.ratingReviewLabel)}>
                                                <StarRating
                                                    className={s.reviewStar}
                                                    value={value.rating}
                                                    name={'review'}
                                                />
                                            </Td>

                                            {
                                                !value.isAdminEnable && <Td data-label={formatMessage(messages.reviewStatusLabel)} column={formatMessage(messages.reviewStatusLabel)}>
                                                    <FormattedMessage {...messages.disabledLabel} />
                                                </Td>
                                            }

                                            {
                                                value.isAdminEnable && <Td data-label={formatMessage(messages.reviewStatusLabel)} column={formatMessage(messages.reviewStatusLabel)}>
                                                    <FormattedMessage {...messages.enabledLabel} />
                                                </Td>
                                            }

                                            {
                                                !value.isAdminEnable && <Td data-label={formatMessage(messages.reviewActionLabel)} column={formatMessage(messages.reviewActionLabel)}>
                                                    <a href="javascript:void(0)" onClick={() => updateReviewStatus(value.id, 'enable', { currentPage, searchList })}>
                                                        <FormattedMessage {...messages.setToEnable} />
                                                    </a>
                                                </Td>
                                            }

                                            {
                                                value.isAdminEnable && <Td data-label={formatMessage(messages.reviewActionLabel)} column={formatMessage(messages.reviewActionLabel)}>
                                                    <a href="javascript:void(0)" onClick={() => updateReviewStatus(value.id, 'disable', { currentPage, searchList })}>
                                                        <FormattedMessage {...messages.setToDisable} />
                                                    </a>
                                                </Td>
                                            }

                                            <Td data-label={formatMessage(messages.actionLabel)} column={formatMessage(messages.actionLabel)}>
                                                <Link to={"/siteadmin/management-reviews/" + value.id}>
                                                    <FormattedMessage {...messages.editLabel} />
                                                </Link>
                                            </Td>
                                        </Tr>
                                    )
                                })
                            }
                        </Table>
                    </div>
                    {
                        data && data.reviewsData.length > 0
                        && <div>
                            <CustomPagination
                                total={data.count}
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
    updateReviewStatus
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(UserReviewsManagement)));