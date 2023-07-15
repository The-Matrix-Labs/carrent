// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './LoginModal.css';
import bt from '../../../src/components/commonStyle.css';
import {
  Button,
  Form,
  FormGroup,
  Col,
  FormControl,
  Checkbox,
  Modal } from 'react-bootstrap';

// Redux
import { connect } from 'react-redux';
import { closeLoginModal, openSignupModal } from '../../actions/modalActions';

// Components
import SocialLogin from '../SocialLogin';
import LoginForm from '../LoginForm';
import Link from '../Link';

// Translation
import { FormattedMessage } from 'react-intl';

// Locale
import messages from '../../locale/messages';
//Image
import bgImage from '../../../public/siteImages/carBg.jpeg';


class LoginModal extends Component {
  static propTypes = {
    closeLoginModal: PropTypes.func,
    loginModal: PropTypes.bool,
    openSignupModal: PropTypes.func,
    formatMessage: PropTypes.func,
    siteName: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      loginModalStatus: false,
    };
  }

  componentDidMount() {
    const { loginModal } = this.props;
    if (loginModal === true) {
      this.setState({ loginModalStatus: true });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { loginModal } = nextProps;
    if (loginModal === true) {
      this.setState({ loginModalStatus: true });
    } else {
      this.setState({ loginModalStatus: false });
    }
  }

  render() {
    const { closeLoginModal, openSignupModal,siteName } = this.props;
    const { loginModalStatus } = this.state;

    return (
      <div>
        <Modal show={loginModalStatus} animation={false} onHide={closeLoginModal} dialogClassName={cx(s.logInModalContainer, 'loginModal','newModal')} >
      <div className={s.carImage} style={{ backgroundImage: `url(${bgImage})` }}>
        </div>
        <div className={s.sectionBlock}>
          <Modal.Header closeButton>
            {/* <Modal.Title><FormattedMessage {...messages.login} /></Modal.Title> */}
          </Modal.Header>
          <Modal.Body bsClass={s.logInModalBody}>

            <div className={s.root}>
              <div className={s.container}>
              <div className={s.welcomeHeading}>
              <FormattedMessage {...messages.dashBoardHeader} />
               {' '}{siteName}
              </div>
              <LoginForm />
                <strong className={s.lineThrough}><FormattedMessage {...messages.or} /></strong>
                <SocialLogin />
                {/* <hr className={s.horizontalLineThrough} /> */}
                <div className={cx(s.formGroup, s.formSection)}>
                  <Col xs={12} sm={7} md={7} lg={7} className={cx(s.noPadding, bt.textAlignLeft, 'textAlignRightRTL')}>
                    <a href="#" onClick={openSignupModal} className={cx(s.modalCaptionLink, s.modalCaptionLinkLarge)}>
                      <FormattedMessage {...messages.noAccount} />
                    </a>
                  </Col>
                  <Col xs={12} sm={12} md={5} lg={5} className={cx(s.noPadding, bt.textAlignRight, 'textAlignLeftRTL')}>
                    <Button className={cx(bt.btnPrimaryBorder)} bsSize="small" onClick={openSignupModal}>
                      <FormattedMessage {...messages.signUp} />
                    </Button>
                  </Col>
                </div>
              </div>
            </div>
          </Modal.Body>
        </div>
        </Modal>
      </div>
    );
  }
}


const mapState = state => ({
  loginModal: state.modalStatus.isLoginModalOpen,
  siteName: state.siteSettings.data.siteName,
});

const mapDispatch = {
  closeLoginModal,
  openSignupModal,
};

export default withStyles(s,bt)(connect(mapState, mapDispatch)(LoginModal));
