import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, FormattedMessage } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './HomeKindofTrip.css';
import {
    Grid,
    Row,
    Col,
} from 'react-bootstrap';
import cx from 'classnames';

// Locale
import bannerone from './blockone.jpg';
import bannertwo from './blocktwo.jpg';
import messages from '../../../locale/messages';
import Loader from '../../Loader';


class HomeKindofTrip extends React.Component {
    static propTypes = {
        title: PropTypes.string,
        loading: PropTypes.bool,
    };

    render() {
        const { loading, staticInfo } = this.props;
        if (loading) {
            return <Loader type={"text"} />
        } else {
            return (
                <div className={s.container}>
                    <Grid fluid>
                        <div className={s.homeFind}>
                            <div className={s.homeFindHeader}>
                                {staticInfo && staticInfo.carTripTitle1}
                            </div>
                            <div className={s.homePara}>
                                {staticInfo && staticInfo.carTripContent1}
                            </div>
                            <Row>
                                <Col lg={6} md={6} sm={6} xs={12} className={s.spaceTop5}>
                                    <div className={s.homeFindLeft}>
                                        <div className={s.homeFindBg} style={{ backgroundImage: `url(/images/home/${staticInfo && staticInfo.carTripImage1})` }}>
                                        </div>
                                        <div className={s.homeFindSmall}>
                                            {staticInfo && staticInfo.carTripTitle2}
                                        </div>
                                        <div className={s.homeParaInner}>
                                            {staticInfo && staticInfo.carTripContent2}
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={6} md={6} sm={6} xs={12} className={cx(s.spaceTop5, s.paddingTopMobile)}>
                                    <div className={s.homeFindLeft}>
                                        <div className={s.homeFindBg} style={{ backgroundImage: `url(/images/home/${staticInfo && staticInfo.carTripImage2})` }}></div>
                                        <div className={s.homeFindSmallColor}>
                                            {staticInfo && staticInfo.carTripTitle3}
                                        </div>
                                        <div className={s.homeParaInner}>
                                            {staticInfo && staticInfo.carTripContent3}
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Grid>
                </div>
            );
        }
    }
}

export default withStyles(s)(HomeKindofTrip);
