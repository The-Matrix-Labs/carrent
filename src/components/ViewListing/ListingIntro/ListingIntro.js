import React from 'react';
import PropTypes from 'prop-types';


// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ListingIntro.css';
import {
  Button,
  Grid,
  Row,
  Col,
  Form,
  FormGroup,
  FormControl,
  ControlLabel
} from 'react-bootstrap';
import cx from 'classnames';
import * as FontAwesome from 'react-icons/lib/fa';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';

// Locale
import messages from '../../../locale/messages';

// Component
import Avatar from '../../Avatar';
import StarRating from '../../StarRating';
import Link from '../../Link';

//Images

import cartype from './model-2.svg';
import gear from './transmission.svg';
import speed from './odometer.svg';
import year from './year.svg';
import make from './make.svg';
import model from './model.svg'




class ListingIntro extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    formatMessage: PropTypes.any,
    reviewsCount: PropTypes.number.isRequired,
    reviewsStarRating: PropTypes.number.isRequired,
  };

  render() {
    const { data } = this.props;
    const { formatMessage } = this.props.intl;
    const { reviewsCount, reviewsStarRating } = this.props;
    let starRatingValue = 0, transmission;
    if (reviewsCount > 0 && reviewsStarRating > 0) {
      starRatingValue = Number(reviewsStarRating / reviewsCount)
    }

    transmission = data.transmission == '1' ? 'Automatic' : 'Manual';

    return (
      <div>
        <Col xs={12} sm={12} md={12} lg={12} className={s.allPadding}>
          <Col xs={12} sm={9} md={9} lg={9}>
            <h1 className={cx(s.titleText, s.space1)}>
              {data.title != null ? data.title : data.settingsData && data.settingsData.length > 0 && data.settingsData[0].listsettings.itemName + ' ' + formatMessage(messages.in) + ' ' + data.city}
              <p className={cx(s.textMuted)}>
                {data.settingsData && data.settingsData.length > 0 && data.settingsData[2].listsettings.itemName}
              </p>
            </h1>
            <div className={cx(s.space2, 'visible-xs')}>
              <div className={s.displayTable}>
                <div className={s.displayTableCell}>
                  <div className={cx(s.profileAvatarSection, s.mobileBg)}>
                    <Avatar
                      source={data.user.profile.picture}
                      type={"small"}
                      title={data.user.profile.firstName}
                      className={s.profileAvatarMobile}
                      withLink
                      linkClassName={s.profileAvatarLink}
                      profileId={data.user.profile.profileId}
                    />
                  </div>
                  <p className={cx('text-center', s.noMargin)}>
                    <Link to={"/users/show/" + data.user.profile.profileId}>
                      <span className={cx(s.textMuted)}>
                        {data.user.profile.firstName}
                      </span>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </Col>
          <Col xs={12} sm={3} md={3} lg={3} className={'hidden-xs'}>
            <div className={cx(s.profileAvatarSection, s.mobileBg)}>
              <Avatar
                source={data.user.profile.picture}
                type={"small"}
                height={115}
                width={115}
                title={data.user.profile.firstName}
                className={s.profileAvatar}
                withLink
                linkClassName={s.profileAvatarLink}
                profileId={data.user.profile.profileId}
              />
            </div>
            <p className={cx('text-center')}>
              <Link to={"/users/show/" + data.user.profile.profileId}>
                <span className={cx(s.textMuted)}>
                  {data.user.profile.firstName}
                </span>
              </Link>
            </p>
          </Col>
        </Col>
        <Col lg={12} mg={12} sm={12} xs={12} className={cx(s.noPadding, s.borderBottom)}>
          <div className={s.displayFlex}>
            <div className={cx(s.displayInlineFlex, 'displayInlineFlexMbRTL')}>
              <img src={cartype} className={s.overviewIcon} />
              <div className={cx(s.textMutedNew)}>{formatMessage(messages.carType)}</div>
              <div>{data.settingsData[0].listsettings.itemName}</div>
            </div>
            <div className={s.displayInlineFlex}>
              <img src={make} className={s.overviewIcon} />
              <div className={cx(s.textMutedNew)}> {formatMessage(messages.whatTypeOfProperty)}</div>
              <div>{data.settingsData[3].listsettings.itemName}</div>
            </div>
            <div className={cx(s.displayInlineFlex, 'displayInlineFlexRTL')}>
              <img src={model} className={s.overviewIcon} />
              <div className={cx(s.textMutedNew)}> {formatMessage(messages.modelLabel)} </div>
              <div>{data.settingsData[1].listsettings.itemName}</div>
            </div>
            <div className={s.displayInlineFlex}>
              <img src={year} className={s.overviewIcon} />
              <div className={cx(s.textMutedNew)}>  {formatMessage(messages.year)} </div>
              <div>{data.settingsData[2].listsettings.itemName}</div>
            </div>
            <div className={cx(s.displayInlineFlex, 'displayInlineFlexMbRTL')}>
              <img src={gear} className={s.overviewIcon} />
              <div className={cx(s.textMutedNew)}> {formatMessage(messages.isPersonalHome)} </div>
              <div>{transmission}</div>
            </div>
            <div className={cx(s.displayInlineFlex, 'displayInlineFlexRTL', 'displayInlineFlexRTLMb')}>
              <img src={speed} className={s.overviewIcon} />
              <div className={cx(s.textMutedNew)}>  {formatMessage(messages.odometer)}  </div>
              <div>{data.settingsData[4].listsettings.itemName}</div>
            </div>
          </div>
        </Col>
      </div>
    );
  }
}

export default injectIntl(withStyles(s)(ListingIntro));
