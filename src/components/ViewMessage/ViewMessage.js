import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import { FormattedMessage, injectIntl } from 'react-intl';
// Redux
import { connect } from 'react-redux';
import {
  Grid,
  Row,
  Col,
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ViewMessage.css';
// Component
import UserDetail from './UserDetail';
import TripDetails from './TripDetails';
import ActionBlock from './ActionBlock';
import SendMessage from './SendMessage';
import ThreadItems from './ThreadItems';
import Loader from '../Loader';
import GuestHostDetails from './GuestHostDetails';
// Graphql
import GetThreadQuery from './GetThreadQuery.graphql';
import GetMoreThreadItemsQuery from './GetMoreThreadItemsQuery.graphql';
// Locale
import messages from '../../locale/messages';

import ClaimDetails from './TripDetails/ClaimDetails';
class ViewMessage extends React.Component {
  static propTypes = {
    formatMessage: PropTypes.any,
    threadId: PropTypes.number.isRequired,
    userType: PropTypes.string.isRequired,
    threadItemsData: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      getThread: PropTypes.shape({
        guestProfile: PropTypes.shape({
          profileId: PropTypes.number.isRequired,
          picture: PropTypes.string,
          displayName: PropTypes.string.isRequired,
          firstName: PropTypes.string.isRequired,
          location: PropTypes.string,
          reviewsCount: PropTypes.number,
          userVerification: PropTypes.object,
        }),
        guestUserData: PropTypes.shape({
          email: PropTypes.string.isRequired,
          userBanStatus: PropTypes.number,
        }),
        hostProfile: PropTypes.shape({
          profileId: PropTypes.number.isRequired,
          picture: PropTypes.string,
          displayName: PropTypes.string.isRequired,
          firstName: PropTypes.string.isRequired,
          location: PropTypes.string,
          reviewsCount: PropTypes.number,
          userVerification: PropTypes.object,
        }),
        hostUserData: PropTypes.shape({
          email: PropTypes.string.isRequired,
          userBanStatus: PropTypes.number,
        }),
        threadItemForType: PropTypes.shape({
          reservationId: PropTypes.number,
          startDate: PropTypes.string.isRequired,
          endDate: PropTypes.string.isRequired,
          personCapacity: PropTypes.number.isRequired,
          createdAt: PropTypes.string.isRequired,
          cancelData: PropTypes.shape({
            guestServiceFee: PropTypes.number,
            hostServiceFee: PropTypes.number,
            refundToGuest: PropTypes.number,
            payoutToHost: PropTypes.number,
            total: PropTypes.number,
            currency: PropTypes.string,
          })
        }),
        listData: PropTypes.shape({
          title: PropTypes.string.isRequired,
          listingData: PropTypes.shape({
            basePrice: PropTypes.number.isRequired,
            delivery: PropTypes.number.isRequired,
            currency: PropTypes.string.isRequired,
          }),
        }),
      }),
    }),
  };
  static defaultProps = {
    threadId: null,
  };
  constructor(props) {
    super(props);
    this.loadMore = this.loadMore.bind(this);
  }
  loadMore() {
    const { threadItemsData: { loading, getThread: { threadItems }, fetchMore }, threadId } = this.props;

    fetchMore({
      query: GetMoreThreadItemsQuery,
      variables: {
        threadId,
        offset: threadItems.length,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) { return previousResult; }
        return {
          getThread: {
            ...previousResult.getThread,
            threadItems: [...previousResult.getThread.threadItems, ...fetchMoreResult.getAllThreadItems],
          },
        };
      },
    });
  }
  state = { showModal: false };

  changeModalState = (status = false) => this.setState({ showModal: status });

  openModal = () => this.changeModalState(true);
  render() {
    const { threadItemsData: { loading, getThread, refetch }, userType, threadId, isAdminAuthenticated } = this.props;
    const { account, currencyRates } = this.props;
    const { showModal } = this.state;
    if (loading) {
      return <Loader type={'text'} />;
    }
    if (getThread && getThread.threadItemForType && getThread.hostProfile && getThread.guestProfile) {
      let receiverName = getThread.guestProfile.firstName;
      let hostUserBanStatus = getThread.hostUserData && getThread.hostUserData.userBanStatus;
      let guestUserBanStatus = getThread.guestUserData && getThread.guestUserData.userBanStatus;
      let senderName = getThread.hostProfile.firstName;
      let receiverType = 'renter', isListAvailable = false;
      let receiverEmail = getThread.guestUserData && getThread.guestUserData.email;
      if (userType === "renter") {
        receiverName = getThread.hostProfile.firstName;
        senderName = getThread.guestProfile.firstName;
        receiverType = 'owner';
        receiverEmail = getThread.hostUserData && getThread.hostUserData.email;
      }
      let listPublishStatus;
      const initialValues = {
        threadId,
        threadType: userType,
        type: 'message',
        receiverName,
        senderName,
        receiverType,
        receiverEmail
      };

      if (getThread && getThread.listData) {
        isListAvailable = true
      }

      if (getThread && getThread.listData) {
        listPublishStatus = getThread.listData.isPublished
      }

      return (
        <div>
          <Row>
            <Col lg={4} md={4} sm={5} xs={12} >
              <div className={cx(s.sidebarDesign, s.space4, 'hidden-xs')}>
                <UserDetail
                  profileId={userType === 'owner' ? getThread.guestProfile.profileId : getThread.hostProfile.profileId}
                  picture={userType === 'owner' ? getThread.guestProfile.picture : getThread.hostProfile.picture}
                  displayName={userType === 'owner' ? getThread.guestProfile.displayName : getThread.hostProfile.displayName}
                  location={userType === 'owner' ? getThread.guestProfile.location : getThread.hostProfile.location}
                  reviewsCount={userType === 'owner' ? getThread.guestProfile.reviewsCount : getThread.hostProfile.reviewsCount}
                  verifications={userType === 'owner' ? getThread.guestProfile.userVerification : getThread.hostProfile.userVerification}
                />
                {
                  isListAvailable && <TripDetails
                    listId={getThread.listId}
                    userType={userType}
                    title={getThread.listData && getThread.listData.title}
                    basePrice={getThread.listData && getThread.listData.listingData && getThread.listData.listingData.basePrice}
                    delivery={getThread.listData && getThread.listData.listingData && getThread.listData.listingData.delivery}
                    monthlyDiscount={getThread.listData && getThread.listData.listingData && getThread.listData.listingData.monthlyDiscount}
                    weeklyDiscount={getThread.listData && getThread.listData.listingData && getThread.listData.listingData.weeklyDiscount}
                    currency={getThread.listData && getThread.listData.listingData && getThread.listData.listingData.currency}
                    startDate={getThread.threadItemForType.startDate}
                    endDate={getThread.threadItemForType.endDate}
                    personCapacity={getThread.threadItemForType.personCapacity}
                    cancelData={getThread.threadItemForType.cancelData}
                    reservationData={getThread.threadItemForType.reservation || undefined}
                    startTime={getThread.threadItemForType.startTime}
                    endTime={getThread.threadItemForType.endTime}
                    currencyRates={currencyRates}
                    refetchData={refetch}
                    showModal={showModal}
                    changeModalState={this.changeModalState}
                    openModal={this.openModal}
                  />
                }
                {
                  !isListAvailable && <FormattedMessage {...messages.noList} />
                }
              </div>
              {
                userType == 'renter' && getThread.threadItemForType.reservation && (getThread.threadItemForType.reservation.claimStatus === 'fullyRefunded' || getThread.threadItemForType.reservation.claimStatus === 'approved') && <div className={cx(s.claimDesign, s.space4, 'hidden-xs')}>
                  <ClaimDetails reservationData={getThread.threadItemForType.reservation} openModal={this.openModal} />
                </div>
              }
            </Col>


            <Col lg={8} md={8} sm={7} xs={12} className={cx(s.space4, s.paddingRight)}>
              {
                !isAdminAuthenticated && !guestUserBanStatus && !hostUserBanStatus && <ActionBlock
                  threadType={userType}
                  actionType={getThread.threadItemForType.type}
                  threadId={threadId}
                  listId={getThread.listId}
                  reservationId={getThread.threadItemForType.reservationId}
                  startDate={getThread.threadItemForType.startDate}
                  endDate={getThread.threadItemForType.endDate}
                  personCapacity={getThread.threadItemForType.personCapacity}
                  createdAt={getThread.threadItemForType.createdAt}
                  hostDisplayName={getThread.hostProfile.displayName}
                  guestDisplayName={getThread.guestProfile.displayName}
                  guestEmail={getThread.guestUserData && getThread.guestUserData.email}
                  title={getThread.listData && getThread.listData.title}
                  listPublishStatus={listPublishStatus}
                  startTime={getThread.threadItemForType.startTime}
                  endTime={getThread.threadItemForType.endTime}
                />
              }
              <div className="hidden-xs">
                <GuestHostDetails
                  userType={userType}
                  threadId={threadId}
                  getThread={getThread}
                  account={account}
                />
              </div>
              {
                !isAdminAuthenticated && <SendMessage
                  initialValues={initialValues}
                  threadId={threadId}
                  profileId={userType === 'owner' ? getThread.hostProfile.profileId : getThread.guestProfile.profileId}
                  picture={userType === 'owner' ? getThread.hostProfile.picture : getThread.guestProfile.picture}
                  displayName={userType === 'owner' ? getThread.hostProfile.displayName : getThread.guestProfile.displayName}
                />
              }
              <ThreadItems
                userType={userType}
                threadId={threadId}
                data={getThread}
                loadMore={this.loadMore}
              />
            </Col>
            <Col lg={4} md={4} sm={4} xs={12} className={cx(s.sidebarDesign, s.space4, 'visible-xs')}>
              <UserDetail
                profileId={userType === 'owner' ? getThread.guestProfile.profileId : getThread.hostProfile.profileId}
                picture={userType === 'owner' ? getThread.guestProfile.picture : getThread.hostProfile.picture}
                displayName={userType === 'owner' ? getThread.guestProfile.displayName : getThread.hostProfile.displayName}
                location={userType === 'owner' ? getThread.guestProfile.location : getThread.hostProfile.location}
                reviewsCount={userType === 'owner' ? getThread.guestProfile.reviewsCount : getThread.hostProfile.reviewsCount}
                verifications={userType === 'owner' ? getThread.guestProfile.userVerification : getThread.hostProfile.userVerification}
              />
              {
                isListAvailable && <TripDetails
                  listId={getThread.listId}
                  userType={userType}
                  title={getThread.listData && getThread.listData.title}
                  basePrice={getThread.listData && getThread.listData.listingData && getThread.listData.listingData.basePrice}
                  delivery={getThread.listData && getThread.listData.listingData && getThread.listData.listingData.delivery}
                  monthlyDiscount={getThread.listData && getThread.listData.listingData && getThread.listData.listingData.monthlyDiscount}
                  weeklyDiscount={getThread.listData && getThread.listData.listingData && getThread.listData.listingData.weeklyDiscount}
                  currency={getThread.listData && getThread.listData.listingData && getThread.listData.listingData.currency}
                  startDate={getThread.threadItemForType.startDate}
                  endDate={getThread.threadItemForType.endDate}
                  personCapacity={getThread.threadItemForType.personCapacity}
                  cancelData={getThread.threadItemForType.cancelData}
                  reservationData={getThread.threadItemForType.reservation || undefined}
                  startTime={getThread.threadItemForType.startTime}
                  endTime={getThread.threadItemForType.endTime}
                  currencyRates={currencyRates}
                  refetchData={refetch}
                  changeModalState={this.changeModalState}
                  openModal={this.openModal}
                  showModal={showModal}
                />
              }
              {
                !isListAvailable && <FormattedMessage {...messages.noList} />
              }
            </Col>
            {
              userType == 'renter' && getThread.threadItemForType.reservation && (getThread.threadItemForType.reservation.claimStatus === 'fullyRefunded' || getThread.threadItemForType.reservation.claimStatus === 'approved') &&
              <Col lg={4} md={4} sm={4} xs={12} className={cx(s.claimDesign, s.space4, 'visible-xs')}>
                <ClaimDetails reservationData={getThread.threadItemForType.reservation} openModal={this.openModal} />
              </Col>
            }
          </Row>
        </div>
      );
    }
    return (
      <Grid>
        <Row>
          <Col md={7} mdPush={5} className={s.space4}>
            <FormattedMessage {...messages.noThreadFound} />
          </Col>
        </Row>
      </Grid>
    );
  }
}
const mapState = (state) => ({
  isAdminAuthenticated: state.runtime.isAdminAuthenticated,
  account: state.account.data,
  currencyRates: state.currency
});
const mapDispatch = {};
export default compose(
  withStyles(s),
  connect(mapState, mapDispatch),
  graphql(GetThreadQuery, {
    name: 'threadItemsData',
    options: props => ({
      variables: {
        threadId: props.threadId,
        threadType: props.userType,
      },
      ssr: false,
      //pollInterval: 5000,
      fetchPolicy: 'network-only',
    }),
  }),
)(ViewMessage);
