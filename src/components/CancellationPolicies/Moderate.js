import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Tooltip
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './CancellationPolicies.css';
import { FormattedMessage } from 'react-intl';

// Locale
import messages from '../../locale/messages';

class Moderate extends React.Component {

  static propTypes = {
    siteName: PropTypes.string.isRequired
  };

  render() {
    const { siteName } = this.props;
    return (
      <div>
        <div >
          <h3>
            <FormattedMessage {...messages.modeFull} />
          </h3>
          <ul className={s.subText}>
            <li>
              <FormattedMessage {...messages.mode1} />
            </li>
            <li>
              <FormattedMessage {...messages.theWord} />
              {' '}{siteName}{' '}
              <FormattedMessage {...messages.mode2} />
              {' '}{siteName}{' '}
              <FormattedMessage {...messages.mode3} />
            </li>
            <li>
              <FormattedMessage {...messages.mode4} />
            </li>
            <li>
              <FormattedMessage {...messages.mode5} />
              {' '}{siteName}{' '}
              <FormattedMessage {...messages.mode6} />
            </li>
            <li>{siteName}{' '}
              <FormattedMessage {...messages.mode7} /></li>
            <li>
              <FormattedMessage {...messages.mode8} />
            </li>
            <li>
              <FormattedMessage {...messages.mode9} />
              {' '}{siteName}{' '}
              <FormattedMessage {...messages.mode10} />
            </li>
            <li>
              <FormattedMessage {...messages.mode11} />
            </li>
          </ul>
        </div>
        <div className={cx(s.lineGraph, s.hidesm)}>
          <Row className={s.graphContainer}>
            <Col lg={4} md={4} sm={4} xs={12} className={cx(s.timeLine, s.refund)}>
              <div className={s.timeLinePoint}>
                <Tooltip placement="top" id="tooltip-top" className={s.toolTop}>
                  <FormattedMessage {...messages.modeday} />
                </Tooltip>
                <div className={s.toolMarker}></div>
                <div className={s.toolLable}>
                  <FormattedMessage {...messages.modedate} />
                  <br />
                  <FormattedMessage {...messages.modetime} />
                </div>

              </div>
              <div className={s.FlexibleTop}>
                <p>
                  <FormattedMessage {...messages.modedesc1} />
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
                  <FormattedMessage {...messages.modedate2} />
                  <br />
                  <FormattedMessage {...messages.modetime2} />
                </div>
              </div>
              <div className={s.FlexibleTop}>
                <p>
                  <FormattedMessage {...messages.modedesc2} />
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
                  <FormattedMessage {...messages.modedate3} />
                  <br />
                  <FormattedMessage {...messages.modetime3} />
                </div>
              </div>
              <div className={s.FlexibleTop}>
                <p>
                  <FormattedMessage {...messages.modedesc3} />
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
export default withStyles(s)(Moderate);