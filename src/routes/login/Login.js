// General
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Login.css';
import bt from '../../../src/components/commonStyle.css';
import cx from 'classnames';
import {
  Button,
  Col
} from 'react-bootstrap';

// Components
import LoginForm from '../../components/LoginForm';
import SocialLogin from '../../components/SocialLogin';
import Link from '../../components/Link';

// Locale
import messages from '../../locale/messages';


class Login extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    warning: PropTypes.bool,
    formatMessage: PropTypes.func,
    refer: PropTypes.string
  };

  static defaultProps = {
    warning: false
  }

  render() {
    const { warning, refer } = this.props;
    let initialValues = {};
    let socialLoginRefer;
    let registerURL = '/register';
    if (refer) {
      initialValues = {
        refer
      };
      socialLoginRefer = refer;
      if (socialLoginRefer && socialLoginRefer != null) {
        socialLoginRefer = socialLoginRefer.indexOf('?') >= 0 ? socialLoginRefer.replaceAll('?', '------') : socialLoginRefer;
        socialLoginRefer = socialLoginRefer.indexOf('&') >= 0 ? socialLoginRefer.replaceAll('&', '--') : socialLoginRefer;
      }
      registerURL = '/register?refer=' + refer;
    }
    return (
      <div className={s.root}>
        <div className={s.container}>
          {
            warning && <div>
              <FormattedMessage {...messages.loginConfirmation} />
            </div>
          }
          <h1>{this.props.title}</h1>
          <SocialLogin refer={socialLoginRefer} />
          <strong className={s.lineThrough}>
            <FormattedMessage {...messages.or} />
          </strong>
          <LoginForm initialValues={initialValues} />
          <hr className={s.horizontalLineThrough} />
          <div className={cx(s.space1, s.formSection)}>
            <Col xs={12} sm={7} md={7} lg={7} className={cx(s.noPadding, bt.textAlignLeft, 'textAlignRightRTL')}>
              <Link className={cx(s.modalCaptionLink, s.modalCaptionLinkLarge)} to={registerURL} >
                <FormattedMessage {...messages.noAccount} />
              </Link>
            </Col>
            <Col xs={12} sm={5} md={5} lg={5} className={cx(s.noPadding, bt.textAlignRight, 'textAlignLeftRTL')}>
              <Link className={cx(bt.btnPrimaryBorder)} to={registerURL} >
                <FormattedMessage {...messages.signUp} />
              </Link>
            </Col>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s, bt)(Login);
