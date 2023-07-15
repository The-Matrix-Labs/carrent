import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { graphql, compose } from 'react-apollo';
// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './NavigationAfterLogin.css';
import {
  Navbar,
  Nav,
  NavDropdown,
  MenuItem,
} from 'react-bootstrap';
// Internal Components
import Link from '../Link';
import NavLink from '../NavLink';
import MenuItemLink from '../MenuItemLink';
import Avatar from '../Avatar';
import Logout from '../Logout';
import Message from '../Message';
import WishListModal from '../WishListModal';
import HeaderModal from '../HeaderModal';

// Graphql
import UserBanStatusQuery from './getUserBanStatus.graphql';
import CheckUserStatusQuery from './getCheckUserStatus.graphql';
// Graphql to check the user status deleted or not
import UserStatusQuery from './getUserStatus.graphql';
// Locale
import messages from '../../locale/messages';
// Redux
import { connect } from 'react-redux';

import { setUserLogout } from '../../actions/logout';
import CurrencyLanguageDropDown from '../CurrencyLanguageDropDown';

import { openHeaderModal } from '../../actions/modalActions';
// Helpers
import { showCurrencySymbol } from '../../helpers/currencyConvertion';
import { formatLocale } from '../../helpers/formatLocale';

class NavigationAfterLogin extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    setUserLogout: PropTypes.any,
    formatMessage: PropTypes.any,
    showMenu: PropTypes.bool,
    loginUserBanStatus: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      getUserBanStatus: PropTypes.shape({
        userBanStatus: PropTypes.number,
      }),
    }),
  };
  static defaultProps = {
    loginUserBanStatus: {
      loading: true,
      showMenu: true,
      getUserBanStatus: {
        userBanStatus: 0,
      },
    },
    userDeleteStatus: {
      userLoading: true,
      getUserStatus: {
        userStatus: null,
      },
    },
    checkLoginUserExist: {
      userExistloading: true,
      getCheckUserStatus: {
        userExistStatus: null,
      },
    }
  };
  render() {
    const { loginUserBanStatus: { loading, getUserBanStatus }, userDeleteStatus: { userLoading, getUserStatus } } = this.props;
    const { checkLoginUserExist: { userExistloading, getCheckUserStatus }, className, setUserLogout, wishListModal } = this.props;
    const { formatMessage } = this.props.intl;
    const { userData, showMenu, openHeaderModal } = this.props;
    const { toCurrency, baseCurrency, currentLocale } = this.props;
    let displayCurrency = toCurrency ? toCurrency : baseCurrency;

    let isVerified;
    if (userData) {
      isVerified = userData.profileId;
    }
    if (!userExistloading && getCheckUserStatus) {
      if (getCheckUserStatus.userExistStatus) {
        const isBrowser = typeof window !== 'undefined';
        if (isBrowser) {
          window.location.reload();
          setUserLogout();
        }
      }
    }
    if (!loading && getUserBanStatus) {
      if (getUserBanStatus.userBanStatus) {
        const isBrowser = typeof window !== 'undefined';
        if (isBrowser) {
          window.location.reload();
          setUserLogout();
        }
      }
    }
    if (!userLoading && getUserStatus) {
      if (getUserStatus.userStatus) {
        const isBrowser = typeof window !== 'undefined';
        if (isBrowser) {
          window.location.reload();
          setUserLogout();
        }
      }
    }

    return (
      <Nav pullRight className='normalHeader'>
         <HeaderModal modalType={'languageModal'} />
        <HeaderModal modalType={'currencyModal'} />
        <NavLink
          to="/"
          className={cx('visible-xs', s.breakPointScreen, s.newMenuDesign, 'borderNoneMb')}
        >
          <FormattedMessage {...messages.home} />
        </NavLink>
        <NavLink
          noLink
          onClick={(e) => openHeaderModal('languageModal')}
        >
          {formatLocale(currentLocale)}
        </NavLink>
        <NavLink
          noLink
          onClick={(e) => openHeaderModal('currencyModal')}
        >
          {showCurrencySymbol(displayCurrency, currentLocale) + displayCurrency}
        </NavLink>
        <NavLink
          to="/dashboard"
          className={cx('visible-xs', s.breakPointScreen)}
        >
          <FormattedMessage {...messages.dashboard} />
        </NavLink>
        <NavDropdown
          className={cx('hidden-xs', s.nonBreakPointScreen)}
          eventKey={3}
          title={formatMessage(messages.ownerText)}
          noCaret id="basic-nav-dropdown"
        >
          <MenuItemLink to="/cars">
            <FormattedMessage {...messages.manageListing} />
          </MenuItemLink>
          <MenuItemLink to="/become-a-owner?mode=new">
            <FormattedMessage {...messages.listyourCar} />
          </MenuItemLink>
          <MenuItemLink to="/reservation/current">
            <FormattedMessage {...messages.yourReservations} />
          </MenuItemLink>
          <MenuItemLink to="/user/transaction">
            <FormattedMessage {...messages.transactionHistory} />
          </MenuItemLink>
        </NavDropdown>
        <NavLink
          to={"/users/show/" + isVerified}
          className={cx('visible-xs', s.breakPointScreen)}
        >
          <FormattedMessage {...messages.profile} />
        </NavLink>
        <NavLink
          to="/user/payout"
          className={cx('visible-xs', s.breakPointScreen)}
        >
          <FormattedMessage {...messages.accountSettings} />
        </NavLink>
        <NavLink to="/wishlists" >
          <FormattedMessage {...messages.saved} />
        </NavLink>
        <NavLink to="/trips/current" >
          <FormattedMessage {...messages.trips} />
        </NavLink>
        <NavLink to="/cars" className={cx('visible-xs', s.breakPointScreen)}>
          <FormattedMessage {...messages.host} />
        </NavLink>
        <Message />
        <NavLink to="/help">
          <FormattedMessage {...messages.help} />
        </NavLink>
        <Logout className={cx('visible-xs', s.breakPointScreen)} />
        <NavDropdown
          className={cx('hidden-xs', s.nonBreakPointScreen)} eventKey={3} title={
            <Avatar
              isUser
              type={'small'}
              height={30}
              width={30}
              className={s.userAvatar}
            />
          } noCaret id="basic-nav-dropdown"
        >
          <MenuItemLink to="/dashboard">
            <FormattedMessage {...messages.dashboard} />
          </MenuItemLink>
          <MenuItemLink to="/user/edit">
            <FormattedMessage {...messages.editProfile} />
          </MenuItemLink>
          <MenuItemLink to="/user/payout">
            <FormattedMessage {...messages.accountSettings} />
          </MenuItemLink>
          <Logout />
        </NavDropdown>
        {
          wishListModal && <WishListModal />
        }
      </Nav>
    );
  }
}
const mapState = state => ({
  wishListModal: state.modalStatus.wishListModalOpen,
  userData: state.account.data,
  baseCurrency: state.currency.base,
  toCurrency: state.currency.to,
  currentLocale: state.intl.locale
});
const mapDispatch = {
  setUserLogout,
  openHeaderModal
};
export default
  compose(
    injectIntl,
    withStyles(s),
    graphql(UserBanStatusQuery, {
      name: 'loginUserBanStatus',
      options: {
        ssr: false,
        pollInterval: 5000,
      },
    }),
    graphql(UserStatusQuery, {
      name: 'userDeleteStatus',
      options: {
        ssr: false,
        pollInterval: 5000,
      },
    }),
    graphql(CheckUserStatusQuery, {
      name: 'checkLoginUserExist',
      options: {
        ssr: false,
        pollInterval: 5000,
      },
    }),
    (connect(mapState, mapDispatch)))(NavigationAfterLogin);
