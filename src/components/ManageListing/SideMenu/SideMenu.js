import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SideMenu.css';
import {
  Button,
  Grid,
  Row,
  Col,
  Form,
  FormGroup,
  FormControl,
  ControlLabel
} from 'react-bootstrap';
import cx from 'classnames';
import * as FontAwesome from 'react-icons/lib/fa';

// Locale
import messages from '../../../locale/messages';

// Component 
import Link from '../../Link';
import history from '../../../core/history';

class SideMenu extends React.Component {
  static propTypes = {

  };

  handleClick(){
    history.push('/become-a-owner');
  }


  render() {
    let location;
    if (history.location) {
      location = history.location.pathname;
    }
    return (
      <Col xs={12} sm={3} md={3} lg={3} className={s.smPadding}>
        <ul className={cx(s.listContainer, 'listContainerRTL')}>
            <li className={cx({ [s.active]: location === "/cars" })}>
              <Link to={'/cars'} className={s.sideNavitem}>
                <FormattedMessage {...messages.yourListings} />
              </Link>
            </li>
            <li className={cx({ [s.active]: location === "/reservation/current" })}>
              <Link to={'/reservation/current'} className={s.sideNavitem}>
                <FormattedMessage {...messages.upcomingReservations} />
              </Link>
            </li>
            <li className={cx({ [s.active]: location === "/reservation/previous" })}>
              <Link to={'/reservation/previous'} className={s.sideNavitem}>
                <FormattedMessage {...messages.previousReservations} />
              </Link>
            </li>
        </ul>
        <Col xs={12} sm={7} md={7} lg={7} className={cx(s.noPadding, s.space2, s.spaceTop2)} >
          <FormGroup className={s.formGroup}>
              <Button 
                className={cx(s.button, s.btnPrimary)}
                onClick={this.handleClick}
              >
                <FormattedMessage {...messages.addListing} />
              </Button>
          </FormGroup>
        </Col>
      </Col>
    );
  }
}

export default withStyles(s)(SideMenu);
