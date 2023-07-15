// General
import React from 'react';
import PropTypes from 'prop-types';
// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Register.css';
import bt from '../../../src/components/commonStyle.css';
import {
  Button,
  Col } from 'react-bootstrap';

// Components
import RegisterForm from '../../components/RegisterForm';
import SocialLogin from '../../components/SocialLogin';
import Link from '../../components/Link';

// Translation
import { FormattedMessage } from 'react-intl';

// Locale
import messages from '../../locale/messages';

class Register extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    refer: PropTypes.string
  };

  render() {
    const { refer } = this.props;
    let initialValues = {};
    let loginURL = '/login';
    if (refer) {
      initialValues = {
        refer
      };
      loginURL = '/login?refer=' + refer;
    }

    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{this.props.title}</h1>
          <SocialLogin refer={refer} />
          <strong className={s.lineThrough}>
            <FormattedMessage {...messages.or} />
          </strong>
          <RegisterForm initialValues={initialValues} />
          <p className={s.captionText}>
            <small>
              <FormattedMessage {...messages.terms1} />
              <span>&nbsp;<a href="/privacy"><FormattedMessage {...messages.termsOfService} /></a></span>
            </small>
          </p>

          <hr className={s.horizontalLineThrough} />

          <div className={cx(s.space1)}>
            <Col xs={12} sm={8} md={8} lg={8} className={cx(s.noPadding, bt.textAlignLeft, 'textAlignRightRTL')}>
            <Link className={cx(s.modalCaptionLink, s.modalCaptionLinkLarge)} to={loginURL}>
               <FormattedMessage {...messages.alreadyHaveAccount} />
            </Link>
            </Col>
            <Col xs={12} sm={4} md={4} lg={4} className={cx(s.noPadding, bt.textAlignRight, 'textAlignLeftRTL')}>
              <Link className={cx(bt.btnPrimaryBorder, bt.btnSmall, s.btnSmall)} to={loginURL}>
                 <FormattedMessage {...messages.login} />
              </Link>
            </Col>
          </div>

        </div>
      </div>
    );
  }
}

export default withStyles(s, bt)(Register);
