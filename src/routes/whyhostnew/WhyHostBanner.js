import React, { Component } from 'react';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './WhyHostBanner.css';
import {
    Button
} from 'react-bootstrap';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';

// Locale
import messages from '../../locale/messages';

// History
import history from '../../core/history';

// Actions
import {    
    openSignupModal
} from '../../actions/modalActions';

class WhyHostBanner extends Component {
    handleClick() {
        history.push('/become-a-owner?mode=new');
    }

    render() {
        const { openSignupModal, isAuthenticated, data } = this.props;
        return (
            <div>
                <div className={s.Banner} style={{ backgroundImage: `url(/images/home/${data && data.hostBannerImage1})` }}>
                    <div className={s.bannerText}>
                        <h1 className={s.mainText}>
                            { data && data.hostBannerTitle1}
                        </h1>
                        <p className={s.listText}>
                            { data && data.hostBannerContent1}
                        </p>
                        {
                            !isAuthenticated && <Button
                                className={s.listButton}
                                onClick={openSignupModal}
                            >
                                <FormattedMessage {...messages.whyhostButton} />
                            </Button>
                        }
                    </div>
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

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(WhyHostBanner)));
