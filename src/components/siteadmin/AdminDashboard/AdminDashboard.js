import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    Row,
    Col
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AdminDashboard.css';

// Translation
import { FormattedMessage } from 'react-intl';
import messages from '../../../locale/messages';

//Image
import totalUser from '../../../../public/AdminIcons/Totalusers.png';
import graphOne from '../../../../public/AdminIcons/total-user.png';
import totallast from '../../../../public/AdminIcons/last24hrsusers.png';
import graphTwo from '../../../../public/AdminIcons/last-24-hrs-users.png';
import totalMothe from '../../../../public/AdminIcons/last30dayusers.png';
import graphThree from '../../../../public/AdminIcons/last-30days-users.png';
import motheListing from '../../../../public/AdminIcons/last30dayslistings.svg';
import hourListing from '../../../../public/AdminIcons/last24hrslistings.svg';
import totalListing from '../../../../public/AdminIcons/Totallistings.svg';
import totalListingImage from '../../../../public/AdminIcons/total-listings-graph.png';
import reservationIcon from '../../../../public/AdminIcons/reservationicon.svg';

import UserImage from './user.jpg';
import TodayUser from './todayuser.jpg';
import Monthuser from './month.jpg';
import Listing from './totallisting.jpg';
import TodayList from './todaylist.jpg';
import Reserve from './reserve.jpg';
import Clock from './clock.jpg';


// Component
import DashboardTile from './DashboardTile';

class AdminDashboard extends Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        user: PropTypes.shape({
            loading: PropTypes.bool,
            getUserDashboard: PropTypes.shape({
                totalCount: PropTypes.number.isRequired,
                todayCount: PropTypes.number.isRequired,
                monthCount: PropTypes.number.isRequired,
            })
        }),
        listing: PropTypes.shape({
            loading: PropTypes.bool,
            getListingDashboard: PropTypes.shape({
                totalCount: PropTypes.number.isRequired,
                todayCount: PropTypes.number.isRequired,
                monthCount: PropTypes.number.isRequired,
            })
        }),
    };

    static defaultProps = {
        user: {
            loading: true
        },
        listing: {
            loading: true
        },
        reservation: {
            loading: true
        }
    };

    render() {
        const { user, listing, reservation, user: { getUserDashboard }, listing: { getListingDashboard }, reservation: { getReservationDashboard } } = this.props;
        if (user.getUserDashboard && listing.getListingDashboard && reservation.getReservationDashboard) {
            return (
                <div className={cx(s.pagecontentWrapper, s.bgColor, 'pagecontentWrapperRTL')}>
                    <div>
                        <h1 className={s.headerTitle}><FormattedMessage {...messages.adminDashboard} /></h1>
                        <Row>
                            <Col xs={12} md={12} sm={12} lg={12}>
                                <div className={s.wrapper}>
                                    <Row>
                                        <Col lg={4} md={4} sm={12} xs={12}>
                                            <div className={s.userBox}>
                                                <div className={cx(s.displayInline, s.userImg)}>
                                                    <img src={totalUser} />
                                                </div>
                                                <div className={cx(s.displayInline, s.userContent)}>
                                                    <h2><FormattedMessage {...messages.totalUsers} /></h2>
                                                    <div>{getUserDashboard.totalCount}</div>
                                                </div>
                                                <div className={s.graph}>
                                                    <img src={graphOne} />
                                                </div>
                                            </div>
                                        </Col>
                                        <Col lg={4} md={4} sm={12} xs={12}>
                                            <div className={cx(s.userBox, s.lastedBox)}>
                                                <div className={cx(s.displayInline, s.userImg)}>
                                                    <img src={totallast} />
                                                </div>
                                                <div className={cx(s.displayInline, s.userContent)}>
                                                    <h2><FormattedMessage {...messages.last24hoursUsers} /></h2>
                                                    <div>{getUserDashboard.todayCount}</div>
                                                </div>
                                                <div className={s.graph}>
                                                    <img src={graphTwo} />
                                                </div>
                                            </div>
                                        </Col>
                                        <Col lg={4} md={4} sm={12} xs={12}>
                                            <div className={cx(s.userBox, s.motheBox)}>
                                                <div className={cx(s.displayInline, s.userImg)}>
                                                    <img src={totalMothe} />
                                                </div>
                                                <div className={cx(s.displayInline, s.userContent)}>
                                                    <h2><FormattedMessage {...messages.last30daysUsers} /></h2>
                                                    <div>{getUserDashboard.monthCount}</div>
                                                </div>
                                                <div className={s.graph}>
                                                    <img src={graphThree} />
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row className={s.listingSectionMain}>
                                        <Col lg={4} md={4} sm={12} xs={12} className={s.mobileMargin}>
                                            <div className={s.motheListing}>
                                                <div className={cx(s.displayInline, s.listingImg, s.displayBlock)}>
                                                    <img src={motheListing} />
                                                </div>
                                                <div className={cx(s.displayInline, s.listingContent, s.displayBlock, 'listingContentRTL')}>
                                                    <h2><FormattedMessage {...messages.last30daysListings} /></h2>
                                                    <div>{getListingDashboard.monthCount}</div>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col lg={4} md={4} sm={12} xs={12} className={s.mobileMargin}>
                                            <div className={cx(s.motheListing)}>
                                                <div className={cx(s.displayInline, s.listingImg, s.displayBlock)}>
                                                    <img src={hourListing} />
                                                </div>
                                                <div className={cx(s.displayInline, s.listingContent, s.displayBlock, 'listingContentRTL')}>
                                                    <h2><FormattedMessage {...messages.last24hoursListings} /></h2>
                                                    <div>{getListingDashboard.todayCount}</div>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col lg={4} md={4} sm={12} xs={12} className={s.mobileMargin}>
                                            <div className={cx(s.motheListing)}>
                                                <div className={cx(s.displayInline, s.listingImg, s.displayBlock)}>
                                                    <img src={totalListing} />
                                                </div>
                                                <div className={cx(s.displayInline, s.listingContent, s.displayBlock, 'listingContentRTL')}>
                                                    <h2><FormattedMessage {...messages.totalListings} /></h2>
                                                    <div>{getListingDashboard.totalCount}</div>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row className={s.listingSectionMain}>
                                        <Col lg={4} md={4} sm={12} xs={12}>
                                            <div className={s.totalReservation}>
                                                <div className={s.reservationHeader}>
                                                    <div className={cx(s.reservationIcon)}><img src={reservationIcon} /></div>
                                                    <div className={cx(s.reservationContent)}><FormattedMessage {...messages.totalReservations} /></div>
                                                </div>
                                                <div className={s.reservationBottom}>
                                                    {getReservationDashboard.totalCount}
                                                </div>
                                                <div className={s.reservationCircle}></div>
                                            </div>
                                        </Col>
                                        <Col lg={4} md={4} sm={12} xs={12}>
                                            <div className={s.totalReservation}>
                                                <div className={s.reservationHeader}>
                                                    <div className={cx(s.reservationIcon)}><img src={reservationIcon} /></div>
                                                    <div className={cx(s.reservationContent)}><FormattedMessage {...messages.last24hoursReservations} /></div>
                                                </div>
                                                <div className={cx(s.reservationBottom, s.reservation24)}>
                                                    {getReservationDashboard.todayCount}
                                                </div>
                                                <div className={cx(s.reservationCircle, s.reservationCircle24)}></div>
                                            </div>
                                        </Col>
                                        <Col lg={4} md={4} sm={12} xs={12}>
                                            <div className={s.totalReservation}>
                                                <div className={s.reservationHeader}>
                                                    <div className={cx(s.reservationIcon)}><img src={reservationIcon} /></div>
                                                    <div className={cx(s.reservationContent)}><FormattedMessage {...messages.last30daysReservations} /></div>
                                                </div>
                                                <div className={cx(s.reservationBottom, s.reservation30)}>
                                                    {getReservationDashboard.monthCount}
                                                </div>
                                                <div className={cx(s.reservationCircle, s.reservationCircle30)}></div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            );
        } else {
            return (
                <div><FormattedMessage {...messages.loadingLabel} /></div>
            );
        }

    }
}

export default withStyles(s)(AdminDashboard);