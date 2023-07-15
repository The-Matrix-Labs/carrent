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
class Strict extends React.Component {

  static propTypes = {
    siteName: PropTypes.string.isRequired
  };

  render() {
    const { siteName } = this.props;
    return (
      <div className={s.strictPadding}>
        <div >
          <h3>
            <FormattedMessage {...messages.strctFull} />
          </h3>
          <ul className={s.subText}>
            <li>
              <FormattedMessage {...messages.strct1} />
            </li>
            <li>
              <FormattedMessage {...messages.theWord} />
              {' '}{siteName}{' '}
              <FormattedMessage {...messages.strct2} />
              {' '}{siteName}{' '}
              <FormattedMessage {...messages.strct3} />
            </li>
            <li>
              <FormattedMessage {...messages.strct4} />
            </li>
            <li>
              <FormattedMessage {...messages.strct5} />
              {' '}{siteName}{' '}
              <FormattedMessage {...messages.strct6} />
            </li>
            <li>{siteName}{' '}
              <FormattedMessage {...messages.strct7} /></li>

            <li>
              <FormattedMessage {...messages.strct8} />
            </li>
            <li>
              <FormattedMessage {...messages.strct9} />
              {' '}{siteName}{' '}
              <FormattedMessage {...messages.strct10} />
            </li>
            <li>
              <FormattedMessage {...messages.strct11} />
            </li>
          </ul>
        </div>
        <div className={cx(s.lineGraph, s.hidesm)}>
          <Row className={s.graphContainer}>
            <Col lg={4} md={4} sm={4} xs={12} className={cx(s.timeLine, s.semiRefund)}>
              <div className={s.timeLinePoint}>
                <Tooltip placement="top" id="tooltip-top" className={s.toolTop}>
                  <FormattedMessage {...messages.strctday} />
                </Tooltip>
                <div className={s.toolMarker}></div>
                <div className={s.toolLable}>
                  <FormattedMessage {...messages.strctdate} />
                  <br />
                  <FormattedMessage {...messages.strcttime} />
                </div>

              </div>
              <div className={s.FlexibleTop}>
                <p>
                  <FormattedMessage {...messages.strctdesc1} />
                </p>
              </div>
            </Col>
            <Col lg={4} md={4} sm={4} xs={12} className={cx(s.timeLine, s.nonRefund)}>
              <div className={s.timeLinePoint}>
                <Tooltip placement="top" id="tooltip-top" className={s.toolTop}>
                  <FormattedMessage {...messages.tripStarts} />
                </Tooltip>
                <div className={s.toolMarker}></div>
                <div className={s.toolLable}>
                  <FormattedMessage {...messages.strctdate2} />
                  <br />
                  <FormattedMessage {...messages.strcttime2} />
                </div>
              </div>
              <div className={s.FlexibleTop}>
                <p>
                  <FormattedMessage {...messages.strctdesc2} />
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
                  <FormattedMessage {...messages.strctdate3} />
                  <br />
                  <FormattedMessage {...messages.strcttime3} />
                </div>
              </div>
              <div className={s.FlexibleTop}>
                <p>
                  <FormattedMessage {...messages.strctdesc3} />
                </p>
              </div>
            </Col>
            <div className={s.toolText}>
              <FormattedMessage {...messages.Example} />
            </div>
          </Row>
        </div>
      </div>
    );
  }
}
export default withStyles(s)(Strict);