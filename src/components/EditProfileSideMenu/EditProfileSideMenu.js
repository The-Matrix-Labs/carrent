import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, FormattedMessage } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './EditProfileSideMenu.css';
import {
    Button,
    Col
} from 'react-bootstrap';
import cx from 'classnames';

// Component
import Link from '../Link';

// Locale
import messages from '../../locale/messages';
import history from '../../core/history';

// Redux
import { connect } from 'react-redux';


class EditProfileSideMenu extends React.Component {
    render() {
        const { userData } = this.props;
        let isVerified;
        if (userData) {
            isVerified = userData.profileId;
        }
        let location;
        if (history.location) {
          location = history.location.pathname;
        }

        return (
            <div>
                <ul className={cx(s.listContainer, 'listContainerRTL')}>
                    <li className={cx({ [s.active]: location === "/user/edit" })}>
                        <Link
                            to={"/user/edit"}
                            className={s.sideNavitem}
                        >
                            <FormattedMessage {...messages.editProfile} />
                        </Link>
                    </li>
                    <li className={cx({ [s.active]: location === "/user/photo" })}>
                        <Link
                            to={"/user/photo"}
                            className={s.sideNavitem}
                        >
                            <FormattedMessage {...messages.profilePhoto} />
                        </Link>
                    </li>
                    <li className={cx({ [s.active]: location === "/user/verification" })}>
                        <Link
                            to={"/user/verification"}
                            className={s.sideNavitem}
                        >
                            <FormattedMessage {...messages.trustAndVerification} />
                        </Link>
                    </li>
                    <li className={cx({ [s.active]: location === "/user/reviews" })}>
                        <Link
                            to={"/user/reviews"}
                            className={s.sideNavitem}
                        >
                            <FormattedMessage {...messages.reviews} />
                        </Link>
                    </li>
                </ul>
                <Col
                    xs={12} sm={12} md={12} lg={12}
                    className={cx(s.noPadding, s.space3, s.spaceTop2)}
                >
                    <Link
                        to={"/users/show/" + isVerified}
                        className={cx(s.button, s.btnPrimary, s.btnlarge)}
                    >
                        <FormattedMessage {...messages.viewProfile} />
                    </Link>
                </Col>
            </div>
        );
    }
}

const mapState = (state) => ({
    userData: state.account.data,
});

const mapDispatch = {
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(EditProfileSideMenu)));