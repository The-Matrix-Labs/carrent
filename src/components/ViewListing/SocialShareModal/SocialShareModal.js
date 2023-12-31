// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './SocialShareModal.css';
import * as FontAwesome from 'react-icons/lib/fa';
import {
  Modal,
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap';

// Redux
import { connect } from 'react-redux';
import { openSocialShareModal, closeSocialShareModal } from '../../../actions/modalActions';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Link from '../../Link';

// Translation
import { FormattedMessage } from 'react-intl';

// Locale
import messages from '../../../locale/messages';

import SocialShare from '../SocialShare';
import { url } from '../../../config';
import { ShareButtons, generateShareIcon } from 'react-share';
import history from '../../../core/history';

// import imageOne from './mail.png';
const {
  FacebookShareButton,
  GooglePlusShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  EmailShareButton
} = ShareButtons;

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const GooglePlusIcon = generateShareIcon('google');
const LinkedinIcon = generateShareIcon('linkedin');
const EmailIcon = generateShareIcon('email');

class SocialShareModal extends Component {
  static propTypes = {
    closeSocialShareModal: PropTypes.func,
    socialshareModal: PropTypes.bool,
    openSocialShareModal: PropTypes.func,
    formatMessage: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      socialshareModalStatus: false,
      isFormOpen: false,
      value: 'Copy Link',
      copied: false,
    };
    this.openForm = this.openForm.bind(this);
    this.copyText = this.copyText.bind(this);
  }

  openForm() {
    this.setState({ isFormOpen: true });
  }

  componentDidMount() {
    const { socialshareModal } = this.props;
    if (socialshareModal === true) {
      this.setState({ socialshareModalStatus: true });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { socialshareModal } = nextProps;
    if (socialshareModal === true) {
      this.setState({ socialshareModalStatus: true });
    } else {
      this.setState({ socialshareModalStatus: false });
    }
  }

  async copyText() {

    this.setState({
      value: 'Link Copied',
      copied: true
    })

    setTimeout(() => {
      this.setState({
        value: 'Copy Link',
        copied: false
      })
    }, 2000)
  }

  render() {
    const { closeSocialShareModal, openSocialShareModal, listId, title, city, state, country, siteName } = this.props;
    const { socialshareModalStatus, isFormOpen } = this.state;
    let location = history.location ? history.location.pathname : null;
    var locationPath = location ? location.replace('/preview',''): null;
    
    const shareUrl = url + locationPath;
    let previewText =  `Check out this listing on ${siteName}!`;
    let bodyText =  `Check out this listing on ${siteName}!` + ' ' + shareUrl;


    return (
      <div>
        <Modal show={socialshareModalStatus} animation={false} onHide={closeSocialShareModal} dialogClassName={cx(s.signupModalContainer, 'signupModal', 'sharesocialModal')} >
          <Modal.Header closeButton className={cx(s.marginBottom24, 'customClosebutton', s.marginleftM5)}>
            {/* <Modal.Title><FormattedMessage {...messages.signup} /></Modal.Title> */}
          </Modal.Header>
          <Modal.Body bsClass={s.signupModalBody}>
            <div className={s.paddingbottom24}>
              <div className={s.share}>
              <FormattedMessage {...messages.share}/>
            </div>
              <div className={s.content}>
              <FormattedMessage {...messages.socialShareDesc} /> {siteName}:{' '}
                {title} <FormattedMessage {...messages.in} /> {city}, {state}, {country}
              </div>
            </div>
            <ListGroup className={'sharingsocial'}>
              <ListGroupItem tag="a" href={shareUrl} className={s.borderradiusNone}>
                <FacebookShareButton
                  url={shareUrl}
                >
                  <FontAwesome.FaFacebook className={cx(s.socialIcons, 'socialIconsRTL')} />
                  <FormattedMessage {...messages.facebook} />
                </FacebookShareButton>
              </ListGroupItem>
              <ListGroupItem tag="a" href={shareUrl}>
                <TwitterShareButton
                  url={shareUrl}
                  className={s.displayIcon}>
                  <FontAwesome.FaTwitter className={cx(s.socialIcons, 'socialIconsRTL')} />
                  <FormattedMessage {...messages.twitterLabel} />
                </TwitterShareButton>
              </ListGroupItem>
              <ListGroupItem tag="a" href={shareUrl}>
                <EmailShareButton
                  url={shareUrl}
                  subject={previewText}
                  body={bodyText}
                  className={s.displayIcon}>
                  <FontAwesome.FaEnvelope className={cx(s.socialIcons, 'socialIconsRTL')} />
                  <FormattedMessage {...messages.emailLabel} />
              </EmailShareButton>
              </ListGroupItem>
              <ListGroupItem tag="a" href='#'>
                <CopyToClipboard
                  text={shareUrl}
                  onCopy={() => this.copyText()}
                // onCopy={() => this.setState({
                //   value: 'Copied',
                //   copied: true 
                // })}
                >
                  <span>
                    <FontAwesome.FaCopy className={cx(s.socialIcons, 'socialIconsRTL')} />
                    {this.state.value === 'Copy Link' ?  <FormattedMessage {...messages.copyLink}/> :  <FormattedMessage {...messages.linkCopied}/> }</span>
                </CopyToClipboard>
              </ListGroupItem>
            </ListGroup>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}


const mapState = state => ({
  socialshareModal: state.modalStatus.isSocialShareModal,
  siteName: state.siteSettings.data.siteName
});

const mapDispatch = {
  closeSocialShareModal,
  openSocialShareModal,
};

export default withStyles(s)(connect(mapState, mapDispatch)(SocialShareModal));
