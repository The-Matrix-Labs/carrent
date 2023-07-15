import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Style
import {Col} from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './VerifiedInfo.css';
import * as FontAwesome from 'react-icons/lib/fa';

class AccountItem extends Component {

    static propTypes = {
       itemName: PropTypes.string.isRequired
    };
    render() {
        const { itemName } = this.props;
        return (
            <li className={cx(s.space2, 'verfiedRTL')}>
            <Col md={9} className={s.colMiddle}>
              <span>{itemName}</span>
            </Col>
            <Col md={3} className={s.colMiddle}>
              <FontAwesome.FaCheckCircle className={s.circleIcon} />
            </Col>
          </li>
        );
    }
}

export default withStyles(s) (AccountItem);