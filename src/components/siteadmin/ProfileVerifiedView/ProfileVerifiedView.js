import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toastr } from 'react-redux-toastr';
import moment from 'moment';
import Confirm from 'react-confirm-bootstrap';



import { graphql, gql, compose } from 'react-apollo';

// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ProfileVerifiedView.css';
import cp from '../../../components/commonStyle.css';
import Link from '../../Link';

// Send Email
import { sendEmail } from '../../../core/email/sendEmail';

// Translation
import { FormattedMessage } from 'react-intl';
import messages from '../../../locale/messages';


import Avatar from '../../Avatar';

const query = gql`query($profileId: Int, $isUser: Boolean) {
    showUserProfile(profileId: $profileId, isUser: $isUser) {
      userId
      profileId
      firstName
      lastName
      dateOfBirth
      gender
      phoneNumber
      preferredLanguage
      preferredCurrency
      location
      info
      createdAt
      picture
      reviewsCount
      country
      profileBanStatus{
        email
      }
      userVerifiedInfo{
        isEmailConfirmed
        isIdVerification
        isGoogleConnected
        isFacebookConnected
        isPhoneVerified
      }
    }
  }`;

class ProfileVerifiedView extends React.Component {

    static propTypes = {
        data: PropTypes.array,
        title: PropTypes.string.isRequired,
        addListToRecommended: PropTypes.any.isRequired,
        removeListFromRecommended: PropTypes.any.isRequired,
    };

    static defaultProps = {
        data: {
            profileBanStatus: null,
            userVerifiedInfo: null
        }
    }

    constructor(props) {
        super(props);
    }


    render() {
        const { data, intl, title } = this.props;
        let isVerifiedInfo = data && data.userVerifiedInfo;
        // let isVerify = (data && data.userVerifiedInfo) && (data.userVerifiedInfo.isEmailConfirmed || data.userVerifiedInfo.isGoogleConnected || data.userVerifiedInfo.isIdVerification || data.userVerifiedInfo.isFacebookConnected || data.userVerifiedInfo.isPhoneVerified) ? true : false;
        let isVerify = (data && data.userVerifiedInfo) && (data.userVerifiedInfo.isEmailConfirmed || data.userVerifiedInfo.isGoogleConnected || data.userVerifiedInfo.isIdVerification || data.userVerifiedInfo.isPhoneVerified) ? true : false;

        let isEmail, isGoogle, isDocument, isFacebook, isSMS;

        if (isVerifiedInfo && data.userVerifiedInfo.isEmailConfirmed == true) {
            isEmail = "Email";
        }
        if (isVerifiedInfo && data.userVerifiedInfo.isGoogleConnected == true) {
            isGoogle = "Google";
        }

        // if (isVerifiedInfo && data.userVerifiedInfo.isFacebookConnected == true) {
        //     isFacebook = "Facebook";
        // }

        if (isVerifiedInfo && data.userVerifiedInfo.isIdVerification == true) {
            isDocument = "Document";
        }

        if (isVerifiedInfo && data.userVerifiedInfo.isPhoneVerified == true) {
            isSMS = "SMS";
        }

        let language;

        if (data.preferredLanguage == "id") {
            language = "Bahasa Indonesia"
        } else if (data.preferredLanguage == "ms") {
            language = "Bahasa Melayu"
        } else if (data.preferredLanguage == "ca") {
            language = "Català"
        } else if (data.preferredLanguage == "da") {
            language = "Dansk"
        } else if (data.preferredLanguage == "de") {
            language = "Deutsch"
        } else if (data.preferredLanguage == "en") {
            language = "English"
        } else if (data.preferredLanguage == "es") {
            language = "Español"
        } else if (data.preferredLanguage == "el") {
            language = "Eλληνικά"
        } else if (data.preferredLanguage == "fr") {
            language = "Français"
        } else if (data.preferredLanguage == "it") {
            language = "Italiano"
        } else if (data.preferredLanguage == "hu") {
            language = "Magyar"
        } else if (data.preferredLanguage == "nl") {
            language = "Nederlands"
        } else if (data.preferredLanguage == "no") {
            language = "Norsk"
        } else if (data.preferredLanguage == "pl") {
            language = "Polski"
        } else if (data.preferredLanguage == "pt") {
            language = "Português"
        } else if (data.preferredLanguage == "fi") {
            language = "Suomi"
        } else if (data.preferredLanguage == "sv") {
            language = "Svenska"
        } else if (data.preferredLanguage == "tr") {
            language = "Türkçe"
        } else if (data.preferredLanguage == "is") {
            language = "Íslenska"
        } else if (data.preferredLanguage == "cs") {
            language = "Čeština"
        } else if (data.preferredLanguage == "ru") {
            language = "Русский"
        } else if (data.preferredLanguage == "th") {
            language = "ภาษาไทย"
        } else if (data.preferredLanguage == "zh") {
            language = "中文 (简体)"
        } else if (data.preferredLanguage == "zh-TW") {
            language = "中文 (繁體)"
        } else if (data.preferredLanguage == "ja") {
            language = "日本語"
        } else {
            language = "한국어"
        }


        return (
            <div className={cx(s.pagecontentWrapper, 'pagecontentWrapperRTL')}>
                <div>
                    <h1 className={s.headerTitle}><FormattedMessage {...messages.profileVerifiedView} /></h1>
                    <div className={cx(s.space4, cp.textAlignRight, 'textAlignLeftRTL')}>
                        <Link to={"/siteadmin/users"} className={cx(cp.btnPrimaryBorder, cp.btnlarge)}>
                            <FormattedMessage {...messages.goBack} />
                        </Link>
                    </div>
                    <div className={s.profileViewMain}>
                        <div className={s.profileViewInner}>
                            <div className={cx(cp.labelTextNew, s.profileViewlabel)}>
                                <FormattedMessage {...messages.profilePicture} />
                            </div>
                            <div className={cx(s.profileViewMainContent)}>
                                {
                                    data && data.picture && <span>
                                        <img
                                            src={"/images/avatar/" + data.picture}
                                            width="110"
                                            height="auto"
                                        />
                                    </span>
                                }
                                {
                                    !data.picture && <span>
                                        <Avatar
                                            isUser
                                            height={200}
                                            width={200}
                                            className={s.profileAvatar}
                                        />
                                    </span>
                                }
                            </div>
                        </div>
                        <div className={s.profileViewInner}>
                            <span className={cx(cp.labelTextNew, s.profileViewlabel)}><FormattedMessage {...messages.firstName} /></span>
                            <span className={cx(s.profileViewMainContent)}>{data.firstName}</span>
                        </div>
                        <div className={s.profileViewInner}>
                            <span className={cx(cp.labelTextNew, s.profileViewlabel)}><FormattedMessage {...messages.lastName} /></span>
                            <span className={cx(s.profileViewMainContent)}>{data.lastName}</span>
                        </div>
                        {
                            data && data.dateOfBirth && <div className={s.profileViewInner}>
                                <span className={cx(cp.labelTextNew, s.profileViewlabel)}><FormattedMessage {...messages.dateOfBirthLabel} /></span>
                                <span className={cx(s.profileViewMainContent)}>{data.dateOfBirth}</span>
                            </div>
                        }
                        {
                            data && data.gender && <div className={s.profileViewInner}>
                                <span className={cx(cp.labelTextNew, s.profileViewlabel)}><FormattedMessage {...messages.gender} /></span>
                                <span className={cx(s.profileViewMainContent)}>{data.gender}</span>
                            </div>
                        }
                        {
                            data && data.profileBanStatus.email && <div className={s.profileViewInner}>
                                <span className={cx(cp.labelTextNew, s.profileViewlabel)}><FormattedMessage {...messages.emailLabel} /></span>
                                <span className={cx(s.profileViewMainContent)}>{data.profileBanStatus.email}</span>
                            </div>
                        }
                        {
                            data && data.phoneNumber && <div className={s.profileViewInner}>
                                <span className={cx(cp.labelTextNew, s.profileViewlabel)}><FormattedMessage {...messages.phoneNumber} /></span>
                                <span className={cx(s.profileViewMainContent)}>{data.phoneNumber}</span>
                            </div>
                        }
                       
                        {
                            data && data.info && <div className={s.profileViewInner}>
                                <span className={cx(cp.labelTextNew, s.profileViewlabel)}><FormattedMessage {...messages.bioInfo} /></span>
                                <span className={cx(s.profileViewMainContent)}>{data.info}</span>
                            </div>
                        }
                        {
                            data && data.location && <div className={s.profileViewInner}>
                                <span className={cx(cp.labelTextNew, s.profileViewlabel)}><FormattedMessage {...messages.location} /></span>
                                <span className={cx(s.profileViewMainContent)}>{data.location}</span>
                            </div>
                        }
                        {
                            isVerify && <div className={s.profileViewInner}>
                                <span className={cx(cp.labelTextNew, s.profileViewlabel)}><FormattedMessage {...messages.verification} /></span>
                                {
                                    <div className={cx(s.profileViewMainContent)}>
                                        <span>{isEmail}</span>
                                        {isGoogle && isGoogle && <span>,{' '}</span>}
                                        <span>{isGoogle}</span>
                                        {isDocument && isDocument && <span>, {' '}</span>}
                                        <span>{isDocument}</span>
                                        {/* {isFacebook && isFacebook && <span>, {' '}</span>}
                                        <span>{isFacebook}</span> */}
                                        {isSMS && isSMS && <span>, {' '}</span>}
                                        <span>{isSMS} </span>
                                    </div>
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }

}


export default compose(withStyles(s, cp))(ProfileVerifiedView);