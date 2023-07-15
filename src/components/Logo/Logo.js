import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Link from '../Link';
import { FormattedMessage } from 'react-intl';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Logo.css';
import cx from 'classnames';
import history from '../../core/history';
import whitelogo from './web-logo.png';


// Locale
import messages from '../../locale/messages';


class Logo extends Component {
    static propTypes = {
        siteName: PropTypes.string.isRequired,
        logoImage: PropTypes.string,
        link: PropTypes.string,
        className: PropTypes.string,
        logoHeight: PropTypes.string,
        logoWidth: PropTypes.string, 
        showMenu: PropTypes.bool,
    };

    static defaultProps = {
    	siteName: null,
    	logoImage: null,
    	link: '/',
        logoHeight: '34',
        logoWidth: '34',
        showMenu: false,
    }

    

    render() {
        const { siteName, logoImage, link, className, logoHeight, logoWidth ,showMenu,layoutType, homePageLogo, homePageLogoHeight, homePageLogoWidth } = this.props;
        let defaultLogoHeight = logoHeight && logoHeight != null  ? logoHeight : '63';
        let defaultLogoWidth = logoWidth && logoWidth != null ? logoWidth : '250';
        let location = history.location ? history.location.pathname : null;
        if (history.location) {
            location = history.location.pathname;
        }
        
    	return (
    		<Link to={link} className={className}>
                 {
                    homePageLogo != null && location === '/' && layoutType != 2 &&

                    <img src={"images/logo/" + homePageLogo} className={cx(!showMenu ? 'displayBlock': 'displayNone') } height={homePageLogoHeight} width={homePageLogoWidth}/>

                }
                 {
                    logoImage != null && location === '/' &&  layoutType == 2 &&

                    <img src={"/images/logo/" + logoImage} className={cx(!showMenu ? 'displayBlock': 'displayNone') } height={defaultLogoHeight} width={defaultLogoWidth}/>

                }
                {
                    logoImage != null && location === '/' && showMenu &&

                    <img src={"/images/logo/" + logoImage} height={defaultLogoHeight} width={defaultLogoWidth} />

                }
    			{
    			logoImage != null && location !== '/' && location && <img src={"/images/logo/" + logoImage} height={defaultLogoHeight} width={defaultLogoWidth} />
    			}
    			{
    				logoImage === null && siteName != null && <span className={cx (s.logoColor, 'logoWhite')}>{siteName}</span>
    			}
    			{
    				logoImage === null && siteName === null && <span className={s.logoColor}>
                    <FormattedMessage {...messages.siteNamee} />
                    </span>
    			}
            </Link> 
        );
    }
}

const mapState = (state) => ({
	siteName: state.siteSettings.data.siteName,
	logoImage: state.siteSettings.data.Logo,
    logoHeight: state.siteSettings.data.logoHeight,
    logoWidth: state.siteSettings.data.logoWidth,
    layoutType:state.siteSettings.data.homePageType,
    homePageLogo: state.siteSettings.data.homePageLogo,
    homePageLogoHeight: state.siteSettings.data.homePageLogoHeight,
    homePageLogoWidth: state.siteSettings.data.homePageLogoWidth,
    showMenu: state.toggle.showMenu
});

const mapDispatch = {};

export default withStyles(s)(connect(mapState, mapDispatch)(Logo));
