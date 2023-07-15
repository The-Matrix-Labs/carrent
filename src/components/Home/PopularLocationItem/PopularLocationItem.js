import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './PopularLocationItem.css';
import cx from 'classnames';
import * as FontAwesome from 'react-icons/lib/fa';
import { FormattedMessage, injectIntl } from 'react-intl';

// Component

import Link from '../../Link';
// Locale
import messages from '../../../locale/messages';
import ListPopularLocationPhoto from '../../ListPopularLocationCoverPhoto';
class PopularLocationHomeSlider extends React.Component {

  static propTypes = {
    formatMessage: PropTypes.func,
    id: PropTypes.number,
    location: PropTypes.string,
    locationAddress: PropTypes.string,
    image: PropTypes.string,
  };

  render() {
    const { id, location, locationAddress, image } = this.props;
    const { coverPhoto } = this.props;
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <Link to={'/s?&address=' + locationAddress + '&chosen=1'}>
          <div className={s.zoomContainer}>
            <ListPopularLocationPhoto
              className={cx(s.imageContent)}
              coverPhoto={coverPhoto}
              listPhotos={image}
              bgImage
            />
            <div className={s.infoContainer}>
              {location}
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

export default injectIntl(withStyles(s)(PopularLocationHomeSlider));
