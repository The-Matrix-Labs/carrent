import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';

import {
  Button, 
  Form, 
  Grid,
  Row, FormGroup,
  Col,
  ControlLabel,
  FormControl,
  FieldGroup,
  Panel,
  Label } from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Reservation.css';
import logoUrl from './logo-small.jpg';
import { decode } from '../../helpers/queryEncryption';

// Components
import ReservationItem from './ReservationItem';
import NoItem from './NoItem';
import CustomPagination from '../CustomPagination';

// Locale
import messages from '../../locale/messages';

class Reservation extends React.Component {

  static propTypes = {
    userType: PropTypes.string.isRequired,
    formatMessage: PropTypes.any,
    data: PropTypes.arrayOf(PropTypes.shape({
        id :PropTypes.number.isRequired,
        listId: PropTypes.number.isRequired,
        hostId: PropTypes.string.isRequired,
        guestId: PropTypes.string.isRequired,
        checkIn: PropTypes.string.isRequired,
        checkOut: PropTypes.string.isRequired,
        guests: PropTypes.number.isRequired,
        guestServiceFee: PropTypes.number.isRequired,
        hostServiceFee: PropTypes.number.isRequired,
        total: PropTypes.number.isRequired,
        currency: PropTypes.string.isRequired,
        reservationState: PropTypes.string.isRequired,
        messageData: PropTypes.shape({
          id: PropTypes.number.isRequired
        }),
        listData: PropTypes.shape({
          id: PropTypes.number.isRequired,
          title: PropTypes.string.isRequired,
          street: PropTypes.string.isRequired,
          city: PropTypes.string.isRequired,
          state: PropTypes.string.isRequired,
          country: PropTypes.string.isRequired,
          zipcode: PropTypes.string.isRequired,
        }),
        hostData: PropTypes.shape({
          profileId: PropTypes.number.isRequired,
          displayName: PropTypes.string.isRequired,
          picture: PropTypes.string,
          phoneNumber: PropTypes.string,
          userData: PropTypes.shape({
            email: PropTypes.string
          })
        }),
        guestData: PropTypes.shape({
          profileId: PropTypes.number.isRequired,
          displayName: PropTypes.string.isRequired,
          picture: PropTypes.string,
          phoneNumber: PropTypes.string,
          userData: PropTypes.shape({
            email: PropTypes.string
          })
        }),
    }))
  };

  static defaultProps = {
    data: []
  };

  render() {
    const { data, userType, refetchData } = this.props;
    if(data.length === 0) {
      return <NoItem userType={userType} />
    }

    let title;
    if(userType === 'owner') {
      title = "Your Reservation";
    } else {
      title = "Your Trips";
    }

    return (
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <div>
              {/* <thead>
                <tr className={s.rowBorder}>
                <th className={cx(s.sectionTitleLight, s.sectionTitleSpace, s.noBorder)}>
                  <FormattedMessage {...messages.status} />
                </th>
                <th className={cx(s.sectionTitleLight, s.sectionTitleSpace, s.noBorder)}>
                  <FormattedMessage {...messages.dateLocation} />
                </th>
                  <th className={cx(s.sectionTitleLight,s.sectionTitleSpace, s.noBorder)}>
                  {
                    userType === 'host' ? 'Guest' : 'Host'
                  }
                  </th>
                  <th className={cx(s.sectionTitleLight,s.sectionTitleSpace, s.noBorder)}>
                    <FormattedMessage {...messages.details} />
                  </th>
                </tr>
                </thead> */}
             
                {
                  data && data.map((item, index) => {
                    if(item.guestData && item.hostData && item.listData && item.messageData){
                      return <ReservationItem 
                        key={index} 
                        userType={userType}
                        threadId={item.messageData.id}
                        profileId={userType === 'owner' ? item.guestData.profileId : item.hostData.profileId}
                        displayName={userType === 'owner' ? item.guestData.displayName : item.hostData.displayName}
                        picture={userType === 'owner' ? item.guestData.picture : item.hostData.picture}
                        reservationId={item.id}
                        reservationState={item.reservationState}
                        checkIn={item.checkIn}
                        checkOut={item.checkOut}
                        guests={item.guests}
                        guestServiceFee={item.guestServiceFee}
                        hostServiceFee={item.hostServiceFee}
                        total={item.total}
                        currency={item.currency}
                        listId={item.listId}
                        title={item.listData.title}
                        street={item.listData.street}
                        city={item.listData.city}
                        state={item.listData.state}
                        country={item.listData.country}
                        zipcode={item.listData.zipcode}
                        phoneNumber={userType === 'owner' ? decode(item.guestData.phoneNumber) : decode(item.hostData.phoneNumber)}
                        email={userType === 'owner' ? decode(item.guestData.userData.email) : decode(item.hostData.userData.email)}
                        createdAt={item.createdAt}
                        data={item}
                        refetchData={refetchData}
                        cancellationDetails={item.cancellationDetails}
                      />
                    } else {
                        return <ReservationItem 
                          noList
                          key={index} 
                          userType={userType}
                          threadId={null}
                          profileId={null}
                          displayName={null}
                          picture={null}
                          reservationId={item.id}
                          reservationState={item.reservationState}
                          checkIn={item.checkIn}
                          checkOut={item.checkOut}
                          guests={item.guests}
                          guestServiceFee={item.guestServiceFee}
                          hostServiceFee={item.hostServiceFee}
                          total={item.total}
                          currency={item.currency}
                          listId={item.listId}
                          title={null}
                          street={null}
                          city={null}
                          state={null}
                          country={null}
                          zipcode={null}
                          phoneNumber={null}
                          email={null}
                          createdAt={item.createdAt}
                        />
                    }
                    
                  })
                }
                
             </div>
          </Col>
        </Row>
    );
  }
}

export default injectIntl(withStyles(s)(Reservation));
