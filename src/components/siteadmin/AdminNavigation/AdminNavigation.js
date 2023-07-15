import React from 'react';
import PropTypes from 'prop-types';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AdminNavigation.css';
import {
  Nav,
} from 'react-bootstrap';
// Redux
import { connect } from 'react-redux';
import { openHeaderModal } from '../../../actions/modalActions';
import { formatLocale } from '../../../helpers/formatLocale';
// Internal Components
import NavLink from '../../NavLink';
import Logout from '../../Logout';
import HeaderModal from '../../HeaderModal';

// Translation
import { FormattedMessage } from 'react-intl';
import messages from '../../../locale/messages';
//local
import languageIcon from '../../../../public/languageIcon.svg'
import cx from 'classnames';

class AdminNavigation extends React.Component {

  static propTypes = {
    className: PropTypes.string,
  };

  render() {
    const { openHeaderModal, currentLocale } = this.props;
    const { className } = this.props;
    return (
      <Nav pullRight>
        <NavLink
          noLink
          onClick={(e) => openHeaderModal('languageModal')}
          className={cx(s.mozCss, s.displayTabel)}
        >
          <span className={cx(s.displayTabelCell, s.languageIconLeft)}><img src={languageIcon} className={cx(s.languageIcon, 'languageIconRTL')}/></span>
          <span className={cx(s.displayTabelCell, s.lauageContent, 'lauageContentRTL')}>{formatLocale(currentLocale)}</span>
        </NavLink>
        <NavLink to="/" >
          <FormattedMessage {...messages.GotoMainSite} />
        </NavLink>
        <Logout />
        <HeaderModal modalType={'languageModal'} />
      </Nav>
    );
  }

}

const mapState = state => ({
  currentLocale: state.intl.locale
});
const mapDispatch = {
  openHeaderModal
};
export default withStyles(s)(connect(mapState, mapDispatch)(AdminNavigation));
