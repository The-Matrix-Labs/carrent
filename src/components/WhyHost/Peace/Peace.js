import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Button,
  Grid,
  Row,
  Col
} from 'react-bootstrap';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Peace.css';
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../locale/messages';

// Actions
import {
  openSignupModal
} from '../../../actions/modalActions';


class Peace extends Component {
  static propTypes = {
    formatMessage: PropTypes.any,
    refer: PropTypes.string,
    siteName: PropTypes.string.isRequired
  };

  render() {
    const { openSignupModal, isAuthenticated, data } = this.props;
    return (
      <div>
        <div className={s.easyImage}>
          <div>
            <Row>
              <Col xs={12} sm={12} md={12} lg={12}>
                <h3 className={cx(s.heading, s.center, s.marginbottom20)}>
                  {data && data.peaceTitleHeading}
                </h3>
                <Col xs={12} sm={6} md={6} lg={6} className={s.whyblock}>
                  <h4 className={s.common}>
                    {data && data.peaceTitle1}
                  </h4>
                  <hr class={s.hrsmall}></hr>
                  <p className={s.common}>
                    {data && data.peaceContent1}
                    {/* <div className={s.margintop20}> <a href="#">Learn More</a></div> */}
                  </p>
                </Col>

                <Col xs={12} sm={6} md={6} lg={6} className={s.whyblock}>
                  <h4 className={s.common}>
                    {data && data.peaceTitle2}
                  </h4>
                  <hr class={s.hrsmall}></hr>
                  <p className={s.common}>
                    {data && data.peaceContent2}
                    {/* <div className={s.margintop20}> <a href="#">Learn More</a></div> */}
                  </p>
                </Col>
              </Col>
            </Row>
          </div>
        </div>
        <div className={s.clrbcg}>
          <Grid fluid>
            <Col xs={12} sm={12} md={12} lg={12} className={s.center}>
              <h2 className={s.heading}>    {data && data.peaceTitle3}</h2>
              <h3>   {data && data.peaceContent3}</h3>
              {
                !isAuthenticated && <Button
                  className={s.tryButtonone}
                  onClick={openSignupModal}
                >
                  <FormattedMessage {...messages.peaceButton} />
                </Button>
              }
            </Col>
          </Grid>
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  isAuthenticated: state.runtime.isAuthenticated
});

const mapDispatch = {
    openSignupModal
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(Peace)));
