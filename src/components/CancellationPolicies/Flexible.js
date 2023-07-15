import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Tooltip
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { FormattedMessage } from 'react-intl';
import s from './CancellationPolicies.css';

// Locale
import messages from '../../locale/messages';
class Flexible extends React.Component {

  static propTypes = {
    siteName: PropTypes.string.isRequired
  };

  render() {
    const { siteName } = this.props;
    return (
      <div>
        <div >
          <h3><FormattedMessage {...messages.flexFull} />
          </h3>
          <ul className={s.subText}>
            <li>
              <FormattedMessage {...messages.flexible1} />
            </li>
            <li>
              <FormattedMessage {...messages.theWord} />
              {' '}{siteName}{' '}
              <FormattedMessage {...messages.flexible2} />
              {' '}{siteName}{' '}
              <FormattedMessage {...messages.flexible3} />
            </li>
            <li>
              <FormattedMessage {...messages.flexible4} />
            </li>
            <li>
              <FormattedMessage {...messages.flexible5} />
              {' '}{siteName}{' '}
              <FormattedMessage {...messages.flexible6} />
            </li>
            <li>
              {siteName}{' '}
              <FormattedMessage {...messages.flexible7} />
            </li>
            <li>
              <FormattedMessage {...messages.flexible8} />
            </li>
            <li>
              <FormattedMessage {...messages.flexible9} />
              {' '}{siteName}{' '}
              <FormattedMessage {...messages.flexible10} />
            </li>
            <li>
              <FormattedMessage {...messages.flexible11} />
            </li>
          </ul>
        </div>
        <div className={cx(s.lineGraph, s.hidesm)}>
          <Row className={s.graphContainer}>
            <Col lg={4} md={4} sm={4} xs={12} className={cx(s.timeLine, s.refund)}>
              <div className={s.timeLinePoint}>
                <Tooltip placement="top" id="tooltip-top" className={s.toolTop}>
                  <FormattedMessage {...messages.flexday} />
                </Tooltip>
                <div className={s.toolMarker}></div>
                <div className={s.toolLable}>
                  <FormattedMessage {...messages.flexdate} />
                  <br />
                  <FormattedMessage {...messages.flextime} />
                </div>
              </div>
              <div className={s.FlexibleTop}>
                <p>
                  <FormattedMessage {...messages.flexdesc1} />
                </p>
              </div>
            </Col>
            <Col lg={4} md={4} sm={4} xs={12} className={cx(s.timeLine, s.semiRefund)}>
              <div className={s.timeLinePoint}>
                <Tooltip placement="top" id="tooltip-top" className={s.toolTop}>
                  <FormattedMessage {...messages.tripStarts} />
                </Tooltip>
                <div className={s.toolMarker}></div>
                <div className={s.toolLable}>
                  <FormattedMessage {...messages.flexdate2} />
                  <br />
                  <FormattedMessage {...messages.flextime2} />
                </div>
              </div>
              <div className={s.FlexibleTop}>
                <p>
                  <FormattedMessage {...messages.flexdesc2} />
                </p>
              </div>
            </Col>
            <Col lg={4} md={4} sm={4} xs={12} className={cx(s.timeLine, s.nonRefund)} >
              <div className={s.timeLinePoint}>
                <Tooltip placement="top" id="tooltip-top" className={s.toolTop}>
                  <FormattedMessage {...messages.tripEnds} />
                </Tooltip>
                <div className={s.toolMarker}></div>
                <div className={s.toolLable}>
                  <FormattedMessage {...messages.flexdate3} />
                  <br />
                  <FormattedMessage {...messages.flextime3} />
                </div>
              </div>
              <div className={s.FlexibleTop}>
                <p>
                  <FormattedMessage {...messages.flexdesc3} />
                </p>
              </div>
            </Col>
            <div className={s.toolText}>
              <FormattedMessage {...messages.Example} />
            </div>
          </Row>
          <div className="clearBoth"></div>
        </div>

      </div>
    );
  }
}
export default withStyles(s)(Flexible);
