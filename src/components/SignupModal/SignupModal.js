// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './SignupModal.css';
import {
  Button,
  Form,
  Row,
  FormGroup,
  Col,
  ControlLabel,
  FormControl,
  FieldGroup,
  Checkbox,
  Modal,
  Dropdown,
  DropdownButton,
  MenuItem,
  Image } from 'react-bootstrap';

// Redux
import { connect } from 'react-redux';
import { closeSignupModal, openLoginModal } from '../../actions/modalActions';

// Components
import SocialLogin from '../SocialLogin';
import RegisterForm from '../RegisterForm';
import Link from '../Link';

// Translation
import { FormattedMessage } from 'react-intl';

// Locale
import messages from '../../locale/messages';
import imageOne from './mail.png';

class SignupModal extends Component {
  static propTypes = {
    closeSignupModal: PropTypes.func,
    signupModal: PropTypes.bool,
    openLoginModal: PropTypes.func,
    formatMessage: PropTypes.func,
    siteName: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      signupModalStatus: false,
      isFormOpen: false,
    };
    this.openForm = this.openForm.bind(this);
  }

  openForm() {
    this.setState({ isFormOpen: true });
  }

  componentDidMount() {
    const { signupModal } = this.props;
    if (signupModal === true) {
      this.setState({ signupModalStatus: true });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { signupModal } = nextProps;
    if (signupModal === true) {
      this.setState({ signupModalStatus: true });
    } else {
      this.setState({ signupModalStatus: false });
    }
  }

  renderButtons() {
    return (
      <div>
        <SocialLogin />
        <strong className={s.lineThrough}>
          <FormattedMessage {...messages.or} />
        </strong>
        <FormGroup className={s.formGroup}>
          <Button className={cx(s.button, s.btnPrimary)} bsSize="large" onClick={() => this.openForm()} block>
            <Image src={imageOne} className={cx(s.iconPosition, 'iconPositionRTL')}responsive/><FormattedMessage {...messages.signupWithEmail} />
          </Button>
        </FormGroup>
      </div>
    );
  }

  renderForm() {
    return (
      <div>
        <RegisterForm />
        <strong className={s.lineThrough}>
          <FormattedMessage {...messages.or} />
        </strong>
        <div className={cx(s.formGroup, s.formSection)}>
          <Col xs={12} sm={12} md={12} lg={12} className={cx(s.noPadding, s.textAlignLeft)}>
            <p className={cx(s.noMargin, s.captionText, s.textAlignCenter)}>
              <FormattedMessage {...messages.signupWith} /> {' '}
              {/* <a href="/login/facebook" className={cx(s.modalCaptionLink, s.modalCaptionLinkLarge)}> 
                <FormattedMessage {...messages.facebook} /> 
              </a> {' '} */}
              {/* <FormattedMessage {...messages.or} /> {' '} */}
              <a href="/login/google" className={cx(s.modalCaptionLink, s.modalCaptionLinkLarge)}> 
                <FormattedMessage {...messages.google} /> 
              </a>
            </p>
          </Col>
        </div>
      </div>
    );
  }

  render() {
    const { closeSignupModal, openLoginModal, siteName } = this.props;
    const { signupModalStatus, isFormOpen } = this.state;

    return (
      <div>
        <Modal show={signupModalStatus} animation={false} onHide={closeSignupModal} dialogClassName={cx(s.signupModalContainer, 'signupModal','newModal')} >
        <div className={s.carImage}>

          </div>
          <div className={s.sectionBlock}>
          <Modal.Header closeButton>
            {/* <Modal.Title><FormattedMessage {...messages.signup} /></Modal.Title> */}
          </Modal.Header>
          <Modal.Body bsClass={s.signupModalBody}>
            <div className={s.root}>
             <div className={s.container}>
              <div className={s.welcomeHeading}>
              <FormattedMessage {...messages.dashBoardHeader} />{' '}{siteName}
              </div>
                {
                  isFormOpen && this.renderForm()
                }

                {
                  !isFormOpen && this.renderButtons()
                }

                <p className={s.captionText}>
                  <small>
                    <FormattedMessage {...messages.terms1} />
                    <span>&nbsp;<Link to={"/privacy"} onClick={closeSignupModal}><FormattedMessage {...messages.termsOfService} /></Link></span>
                  </small>
                </p>
                <div className={cx(s.formGroup, s.formSection)}>
                  <Col xs={12} sm={12} md={7} lg={7} className={cx(s.noPadding, s.textAlignLeft, s.smSpace, 'textAlignRightRTL')}>
                    <a href="#" className={cx(s.modalCaptionLink, s.modalCaptionLinkLarge)} onClick={openLoginModal}>
                      <FormattedMessage {...messages.alreadyHaveAccount} />
                    </a>
                  </Col>
                  <Col xs={12} sm={12} md={5} lg={5} className={cx(s.noPadding, s.textAlignRight)}>
                    <Button className={cx(s.button, s.btnPrimaryBorder, s.btnSmall)} bsSize="small" onClick={openLoginModal}>
                      <FormattedMessage {...messages.login} />
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
  signupModal: state.modalStatus.isSignupModalOpen,
  siteName: state.siteSettings.data.siteName,
});

const mapDispatch = {
  closeSignupModal,
  openLoginModal,
};

export default withStyles(s)(connect(mapState, mapDispatch)(SignupModal));
