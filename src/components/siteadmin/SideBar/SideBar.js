import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';

// Style
import {
	Button,
	Collapse
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SideBar.css';
import * as FontAwesome from 'react-icons/lib/fa';

// Component
import Link from '../../Link';
import history from '../../../core/history';

// Translation
import { FormattedMessage } from 'react-intl';
import messages from '../../../locale/messages';
import { adminLogout } from '../../../actions/siteadmin/logout';

//Images
import logoutIcon from '../../../../public/AdminIcons/ce2b5b26.svg';
import languageIcon from '../../../../public/languageIcon.svg';
import securityIcon from '../../../../public/SiteIcons/36-Shield.svg';
//local
import { openHeaderModal } from '../../../actions/modalActions';
import { formatLocale } from '../../../helpers/formatLocale';
import { validatePrivilege } from '../../../helpers/adminPrivileges';

class SideBar extends Component {

	static defaultProps = {
		isSuperAdmin: false,
		privileges: []
	};

	constructor(props) {
		super(props);
		this.state = {
			// step1: true,
			step1: false,
			step3: false,
			home: false,
			whyHost: false,
			location: '',
		};
		this.openMenu = this.openMenu.bind(this);
		this.openClose = this.openClose.bind(this);
	}

	componentDidMount() {
		this.setState({
			location: history.location.pathname
		});
	}

	componentDidUpdate(prevProps, prevState) {
		const { location } = this.props;
		if (prevState.location !== location) {
			this.setState({
				location
			})
		}
	}

	async openMenu() {
		this.setState({
			isOpen: 1,
		})
	}
	async openClose() {
		this.setState({
			isOpen: 0,
		})
	}

	render() {
		const { step1, step3, home, location } = this.state;
		const { adminLogout } = this.props;
		const { openHeaderModal, currentLocale, isSuperAdmin, privileges } = this.props;
		let reviewManagementArray = ['/siteadmin/reviews', '/siteadmin/reviews/edit-review/', '/siteadmin/write-reviews', '/siteadmin/edit-review/'];
		let homePageArray = ['/siteadmin/home/caption', '/siteadmin/home/banner', '/siteadmin/home/footer-block', '/siteadmin/popularlocation', '/siteadmin/home/static-info-block', '/siteadmin/home/home-banner', '/siteadmin/home/whychoose-section', '/siteadmin/home/mobileapps-section', '/siteadmin/popularlocation/add'];
		let whyBecomeHostPageArray = ['/siteadmin/whyHost/Block1', '/siteadmin/whyHost/Block2', '/siteadmin/whyHost/Block3',
			'/siteadmin/whyHost/Block4', '/siteadmin/whyHost/Block5', '/siteadmin/whyHost/Block6', '/siteadmin/whyHost/Block7'];
		let listSettingStep1 = ['/siteadmin/listsettings/1', '/siteadmin/listsettings/20', '/siteadmin/listsettings/3', '/siteadmin/listsettings/4',
			'/siteadmin/listsettings/10', '/siteadmin/listsettings/21'];
		let listSettingStep2 = ['/siteadmin/listsettings/13', '/siteadmin/listsettings/14', '/siteadmin/listsettings/15', '/siteadmin/listsettings/16',
			'/siteadmin/listsettings/18', '/siteadmin/listsettings/19'];
		let adminManagementArray = ['/siteadmin/admin-users', '/siteadmin/admin-roles'];

		return (
			<div className='adminCollapse'>
				<div className={cx(s.mobileHeader, 'visible-xs')}>
					<div onClick={() => this.openMenu()}>
						<div className={cx("hamburger")}>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
						</div>
					</div>
					<div>
						<Link to={''} onClick={() => adminLogout()} className={cx(s.logoutIconMobile, 'visible-xs visible-sm')}>
							<div className={cx(s.logoutIcon, 'logoutIconRTL')}><img src={logoutIcon} /></div>
						</Link>
					</div>
				</div>
				<div className={cx({ [s.menuOpen]: this.state.isOpen == 1 }, s.sidebarWrapper, 'adminScrollBar')}>
					<div className={cx({ [s.menuClose]: this.state.isOpen == 0 })}>
						<div className={cx(s.closeColor, 'visible-xs', 'closeColorMbRTL')} onClick={() => this.openClose()} >
							×
						</div>
					</div>
					<div className={cx(s.sidebarNavParent, "hidden-print")}>
						<div className={cx(s.sideBarWelcome)}>
							<span><FormattedMessage {...messages.welcomeAdmin} /></span>
						</div>
						<ul className={s.sidebarNav}>
							<li className={'visible-xs'}>
								<Link className={cx(s.sideNavitem, s.disPlayTable)} onClick={(e) => openHeaderModal('languageModal')}>
									<span><img src={languageIcon} className={cx(s.languageIcon, 'languageIconRTLAdmin')} /></span>
									<span>{formatLocale(currentLocale)}</span>
								</Link>
							</li>
							<li className={cx({ [s.active]: location == '/siteadmin' })}>
								<Link to={'/siteadmin'} className={s.sideNavitem} onClick={() => this.openClose()}>
									<FontAwesome.FaBarChart className={s.navigationIcon} />
									<span><FormattedMessage {...messages.dashboard} /></span>
								</Link>
							</li>
							{validatePrivilege(1, privileges) && <li className={cx({ [s.active]: location === '/siteadmin/settings/site' })}>
								<Link to={'/siteadmin/settings/site'} className={s.sideNavitem} onClick={() => this.openClose()}>
									<FontAwesome.FaCog className={s.navigationIcon} />
									<span><FormattedMessage {...messages.siteSettings} /></span>
								</Link>
							</li>}
							{
								isSuperAdmin && <div>
									<div>
										<div className={cx({ [s.active]: adminManagementArray.includes(location) })}>
											<Button
												bsStyle="link"
												className={cx(s.button, s.noPadding, s.sideNavitem, adminManagementArray.includes(location) ? [s.active] : '')}
												onClick={() => this.setState({
													subAdmin: !this.state.subAdmin
												})}>
												<FontAwesome.FaStar className={s.navigationIcon} />
												<span><FormattedMessage {...messages.manageAdmin} /></span>
												{
													this.state.subAdmin && <FontAwesome.FaAngleUp className={s.navigationIcon} />
												}

												{
													!this.state.subAdmin && <FontAwesome.FaAngleDown className={s.navigationIcon} />
												}

											</Button>
										</div>
										<Collapse in={this.state.subAdmin} className={s.subMenu}>
											<div>
												<li className={cx({ [s.active]: (location === '/siteadmin/admin-users') })}>
													<Link to={'/siteadmin/admin-users'} className={s.sideNavitem} onClick={() => this.openClose()}>
														<FontAwesome.FaArrowRight className={s.navigationIcon} />
														<span><FormattedMessage {...messages.manageAdminUsers} /></span>
													</Link>
												</li>

												<li className={cx({ [s.active]: location === '/siteadmin/admin-roles' })} >
													<Link to={'/siteadmin/admin-roles'} className={s.sideNavitem} onClick={() => this.openClose()}>
														<FontAwesome.FaArrowRight className={s.navigationIcon} />
														<span><FormattedMessage {...messages.manageAdminRoles} /></span>
													</Link>
												</li>
											</div>
										</Collapse>
									</div>
								</div>}
							{validatePrivilege(2, privileges) && <li className={cx({ [s.active]: (location === "/siteadmin/users" || location.startsWith('/siteadmin/profileView')) })}>
								<Link to={'/siteadmin/users'} className={s.sideNavitem} onClick={() => this.openClose()}>
									<FontAwesome.FaUser className={s.navigationIcon} />
									<span><FormattedMessage {...messages.manageUser} /></span>
								</Link>
							</li>}

							{validatePrivilege(3, privileges) && <li className={cx({ [s.active]: location === "/siteadmin/listings" })}>
								<Link to={'/siteadmin/listings'} className={s.sideNavitem} onClick={() => this.openClose()}>
									<FontAwesome.FaList className={s.navigationIcon} />
									<span><FormattedMessage {...messages.manageListing} /></span>
								</Link>
							</li>}

							{validatePrivilege(4, privileges) && <li className={cx({ [s.active]: (location === "/siteadmin/reservations" || location.startsWith('/siteadmin/viewreservation/')) })} >
								<Link to={'/siteadmin/reservations'} className={s.sideNavitem} onClick={() => this.openClose()}>
									<FontAwesome.FaPlane className={s.navigationIcon} />
									<span><FormattedMessage {...messages.manageReservations} /></span>
								</Link>
							</li>}

							{validatePrivilege(20, privileges) && <li className={cx({ [s.active]: (location === "/siteadmin/manage-security-deposit") })} >
								<Link to={'/siteadmin/manage-security-deposit'} className={s.sideNavitem} onClick={() => this.openClose()}>
									<img src={securityIcon} className={s.navigationImage}/>
									<span><FormattedMessage {...messages.manageSecurityDeposit} /></span>
								</Link>
							</li>}

							{validatePrivilege(5, privileges) && <li className={cx({ [s.active]: (location === "/siteadmin/user-reviews" || location.startsWith('/siteadmin/management-reviews/')) })}>
								<Link to={'/siteadmin/user-reviews'} className={s.sideNavitem} onClick={() => this.openClose()}>
									<FontAwesome.FaLineChart className={s.navigationIcon} />
									<span><FormattedMessage {...messages.reviewManagement} /></span>
								</Link>
							</li>}
							{validatePrivilege(6, privileges) && <li>
								<div>
									<div className={cx({ [s.active]: reviewManagementArray.includes(location) || location.startsWith('/siteadmin/edit-review/') })}>
										<Button
											bsStyle="link"
											className={cx(s.button, s.noPadding, s.sideNavitem, reviewManagementArray.includes(location) ? [s.active] : '')}
											onClick={() => this.setState({
												adminReview: !this.state.adminReview
											})}>
											<FontAwesome.FaStar className={s.navigationIcon} />
											<span><FormattedMessage {...messages.adminReviews} /></span>
											{
												this.state.adminReview && <FontAwesome.FaAngleUp className={s.navigationIcon} />
											}

											{
												!this.state.adminReview && <FontAwesome.FaAngleDown className={s.navigationIcon} />
											}

										</Button>
									</div>
									<Collapse in={this.state.adminReview} className={s.subMenu}>
										<div>
											<li className={cx({ [s.active]: (location === '/siteadmin/reviews' || location.startsWith('/siteadmin/edit-review/')) })}>
												<Link to={'/siteadmin/reviews'} className={s.sideNavitem} onClick={() => this.openClose()}>
													<FontAwesome.FaArrowRight className={s.navigationIcon} />
													<span><FormattedMessage {...messages.manageReviwes} /></span>
												</Link>
											</li>

											<li className={cx({ [s.active]: location === '/siteadmin/write-reviews' })} >
												<Link to={'/siteadmin/write-reviews'} className={s.sideNavitem} onClick={() => this.openClose()}>
													<FontAwesome.FaArrowRight className={s.navigationIcon} />
													<span><FormattedMessage {...messages.writeReviwes} /></span>
												</Link>
											</li>
										</div>
									</Collapse>
								</div>
							</li>}
							{validatePrivilege(7, privileges) && <li className={cx({ [s.active]: location === '/siteadmin/settings/servicefees' })}>
								<Link to={'/siteadmin/settings/servicefees'} className={s.sideNavitem} onClick={() => this.openClose()}>
									<FontAwesome.FaCreditCard className={s.navigationIcon} />
									<span><FormattedMessage {...messages.manageServiceFee} /></span>
								</Link>
							</li>}
							{validatePrivilege(8, privileges) && <li className={cx({ [s.active]: location === '/siteadmin/document' })}>
								<Link to={'/siteadmin/document'} className={s.sideNavitem} onClick={() => this.openClose()}>
									<FontAwesome.FaFile className={s.navigationIcon} />
									<span><FormattedMessage {...messages.documentverificaiton} /></span>
								</Link>
							</li>}

							{validatePrivilege(9, privileges) && <li className={cx({ [s.active]: location === '/siteadmin/messages' })}>
								<Link to={'/siteadmin/messages'} className={s.sideNavitem} onClick={() => this.openClose()}>
									<FontAwesome.FaInbox className={s.navigationIcon} />
									<span><FormattedMessage {...messages.messages} /></span>
								</Link>
							</li>}
							{validatePrivilege(10, privileges) && <li className={cx({ [s.active]: location === '/siteadmin/reportUser' })}>
								<Link to={'/siteadmin/reportUser'} className={s.sideNavitem} onClick={() => this.openClose()}>
									<FontAwesome.FaUserSecret className={s.navigationIcon} />
									<span><FormattedMessage {...messages.reportManagement} /></span>
								</Link>
							</li>}

							{validatePrivilege(11, privileges) && <li className={cx({ [s.active]: (location === '/siteadmin/payout' || location.startsWith('/siteadmin/viewpayout/')) })}>
								<Link to={'/siteadmin/payout'} className={s.sideNavitem} onClick={() => this.openClose()}>
									<FontAwesome.FaCreditCard className={s.navigationIcon} />
									<span><FormattedMessage {...messages.payOutManagement} /></span>
								</Link>
							</li>}

							{validatePrivilege(12, privileges) && <li className={cx({ [s.active]: location === '/siteadmin/payment-gateway-section' })}>
								<Link to={'/siteadmin/payment-gateway-section'} className={s.sideNavitem} onClick={() => this.openClose()}>
									<FontAwesome.FaCreditCard className={s.navigationIcon} />
									<span><FormattedMessage {...messages.managePaymentGateWay} /></span>
								</Link>
							</li>}

							{
								isSuperAdmin && <li className={cx({ [s.active]: location === '/siteadmin/currency' })}>
									<Link to={'/siteadmin/currency'} className={s.sideNavitem} onClick={() => this.openClose()}>
										<FontAwesome.FaMoney className={s.navigationIcon} />
										<span><FormattedMessage {...messages.manageCurrency} /></span>
									</Link>
								</li>}

							{validatePrivilege(14, privileges) && <li className={cx({ [s.active]: location === '/siteadmin/settings/search' })}>
								<Link to={'/siteadmin/settings/search'} className={s.sideNavitem} onClick={() => this.openClose()}>
									<FontAwesome.FaCogs className={s.navigationIcon} />
									<span><FormattedMessage {...messages.searchSettings} /></span>
								</Link>
							</li>}

							{
								isSuperAdmin && <li className={cx({ [s.active]: location === '/siteadmin/change/admin' })}>
									<Link to={'/siteadmin/change/admin'} className={s.sideNavitem} onClick={() => this.openClose()}>
										<FontAwesome.FaCogs className={s.navigationIcon} />
										<span><FormattedMessage {...messages.changePasswordLabel} /></span>
									</Link>
								</li>}

							{validatePrivilege(15, privileges) && <div>
								<div className={cx({ [s.active]: (location.startsWith('/siteadmin/edit/popularlocation') || homePageArray.includes(location)) })}>
									<Button
										bsStyle="link"
										className={cx(s.button, s.noPadding, s.sideNavitem)}
										onClick={() => this.setState({
											home: !this.state.home
										})}>
										<FontAwesome.FaHome className={s.navigationIcon} />
										<span><FormattedMessage {...messages.homePageSettings} /></span>
										{
											this.state.home && <FontAwesome.FaAngleUp className={s.navigationIcon} />
										}

										{
											!this.state.home && <FontAwesome.FaAngleDown className={s.navigationIcon} />
										}

									</Button>
								</div>
								<Collapse in={this.state.home} className={s.subMenu}>
									<div>
										<li className={cx({ [s.active]: location === '/siteadmin/home/caption' })}>
											<Link to={'/siteadmin/home/caption'} className={s.sideNavitem} onClick={() => this.openClose()}>
												<FontAwesome.FaArrowRight className={s.navigationIcon} />
												<span><FormattedMessage {...messages.bannerCaptionLabel} /></span>
											</Link>
										</li>

										<li className={cx({ [s.active]: location === '/siteadmin/home/banner' })}>
											<Link to={'/siteadmin/home/banner'} className={s.sideNavitem} onClick={() => this.openClose()}>
												<FontAwesome.FaArrowRight className={s.navigationIcon} />
												<span><FormattedMessage {...messages.imageBannerLabel} /></span>
											</Link>
										</li>
										<li className={cx({ [s.active]: location === '/siteadmin/home/footer-block' })}>
											<Link to={'/siteadmin/home/footer-block'} className={s.sideNavitem} onClick={() => this.openClose()}>
												<FontAwesome.FaArrowRight className={s.navigationIcon} />
												<span><FormattedMessage {...messages.footerBlockLabel} /></span>
											</Link>
										</li>
										<li className={cx({ [s.active]: (location === '/siteadmin/popularlocation' || location.startsWith('/siteadmin/edit/popularlocation/') || location.startsWith('/siteadmin/popularlocation/add')) })}>
											<Link to={'/siteadmin/popularlocation'} className={s.sideNavitem} onClick={() => this.openClose()}>
												<FontAwesome.FaArrowRight className={s.navigationIcon} />
												<span><FormattedMessage {...messages.managePopularLocations} /></span>
											</Link>
										</li>
										<li className={cx({ [s.active]: location === '/siteadmin/home/static-info-block' })}>
											<Link to={'/siteadmin/home/static-info-block'} className={s.sideNavitem} onClick={() => this.openClose()}>
												<FontAwesome.FaArrowRight className={s.navigationIcon} />
												<span><FormattedMessage {...messages.staticInfoBlock} /></span>
											</Link>
										</li>
									</div>
								</Collapse>
							</div>}

							{validatePrivilege(16, privileges) && <div>
								<div className={cx({ [s.active]: whyBecomeHostPageArray.includes(location) })}>
									<Button
										bsStyle="link"
										className={cx(s.button, s.noPadding, s.sideNavitem)}
										onClick={() => this.setState({
											whyHost: !this.state.whyHost
										})}>
										<FontAwesome.FaHome className={s.navigationIcon} />
										<span><FormattedMessage {...messages.whyBecomeOwnerPage} /></span>
										{
											this.state.whyHost && <FontAwesome.FaAngleUp className={s.navigationIcon} />
										}

										{
											!this.state.whyHost && <FontAwesome.FaAngleDown className={s.navigationIcon} />
										}

									</Button>
								</div>
								<Collapse in={this.state.whyHost} className={s.subMenu}>
									<div>
										<li className={cx({ [s.active]: location === '/siteadmin/whyHost/Block1' })}>
											<Link to={'/siteadmin/whyHost/Block1'} className={s.sideNavitem} onClick={() => this.openClose()}>
												<FontAwesome.FaArrowRight className={s.navigationIcon} />
												<span><FormattedMessage {...messages.blockLabel} /> 1</span>
											</Link>
										</li>
										<li className={cx({ [s.active]: location === '/siteadmin/whyHost/Block2' })}>
											<Link to={'/siteadmin/whyHost/Block2'} className={s.sideNavitem} onClick={() => this.openClose()}>
												<FontAwesome.FaArrowRight className={s.navigationIcon} />
												<span><FormattedMessage {...messages.blockLabel} /> 2</span>
											</Link>
										</li>
										<li className={cx({ [s.active]: location === '/siteadmin/whyHost/Block3' })}>
											<Link to={'/siteadmin/whyHost/Block3'} className={s.sideNavitem} onClick={() => this.openClose()}>
												<FontAwesome.FaArrowRight className={s.navigationIcon} />
												<span><FormattedMessage {...messages.blockLabel} /> 3</span>
											</Link>
										</li>
										<li className={cx({ [s.active]: location === '/siteadmin/whyHost/Block4' })}>
											<Link to={'/siteadmin/whyHost/Block4'} className={s.sideNavitem} onClick={() => this.openClose()}>
												<FontAwesome.FaArrowRight className={s.navigationIcon} />
												<span><FormattedMessage {...messages.blockLabel} /> 4</span>
											</Link>
										</li>
										<li className={cx({ [s.active]: location === '/siteadmin/whyHost/Block5' })}>
											<Link to={'/siteadmin/whyHost/Block5'} className={s.sideNavitem} onClick={() => this.openClose()}>
												<FontAwesome.FaArrowRight className={s.navigationIcon} />
												<span><FormattedMessage {...messages.blockLabel} /> 5</span>
											</Link>
										</li>
										<li className={cx({ [s.active]: location === '/siteadmin/whyHost/Block6' })}>
											<Link to={'/siteadmin/whyHost/Block6'} className={s.sideNavitem} onClick={() => this.openClose()}>
												<FontAwesome.FaArrowRight className={s.navigationIcon} />
												<span><FormattedMessage {...messages.blockLabel} /> 6</span>
											</Link>
										</li>
									</div>
								</Collapse>
							</div>}

							{validatePrivilege(17, privileges) && <div>
								<div className={cx({ [s.active]: listSettingStep1.includes(location) })}>
									<Button
										bsStyle="link"
										className={cx(s.button, s.noPadding, s.sideNavitem)}
										onClick={() => this.setState({
											step1: !this.state.step1
										})}>
										<FontAwesome.FaSliders className={s.navigationIcon} />
										<span><FormattedMessage {...messages.carSettingsForStep} />#1</span>
										{
											this.state.step1 && <FontAwesome.FaAngleUp className={s.navigationIcon} />
										}

										{
											!this.state.step1 && <FontAwesome.FaAngleDown className={s.navigationIcon} />
										}
									</Button>
								</div>
								<Collapse in={this.state.step1} className={s.subMenu}>
									<div>
										<li className={cx({ [s.active]: location === '/siteadmin/listsettings/1' })}>
											<Link to={"/siteadmin/listsettings/1"} className={s.sideNavitem} onClick={() => this.openClose()}>
												<FontAwesome.FaArrowRight className={s.navigationIcon} />
												<span><FormattedMessage {...messages.carType} /></span>
											</Link>
										</li>
										<li className={cx({ [s.active]: location === '/siteadmin/listsettings/20' })}>
											<Link to={"/siteadmin/listsettings/20"} className={s.sideNavitem} onClick={() => this.openClose()}>
												<FontAwesome.FaArrowRight className={s.navigationIcon} />
												<span><FormattedMessage {...messages.makeLabel} /></span>
											</Link>
										</li>
										<li className={cx({ [s.active]: location === '/siteadmin/listsettings/3' })}>
											<Link to={"/siteadmin/listsettings/3"} className={s.sideNavitem} onClick={() => this.openClose()}>
												<FontAwesome.FaArrowRight className={s.navigationIcon} />
												<span><FormattedMessage {...messages.modelLabel} /></span>
											</Link>
										</li>
										<li className={cx({ [s.active]: location === '/siteadmin/listsettings/4' })}>
											<Link to={"/siteadmin/listsettings/4"} className={s.sideNavitem} onClick={() => this.openClose()}>
												<FontAwesome.FaArrowRight className={s.navigationIcon} />
												<span><FormattedMessage {...messages.year} /></span>
											</Link>
										</li>
										<li className={cx({ [s.active]: location === '/siteadmin/listsettings/10' })}>
											<Link to={"/siteadmin/listsettings/10"} className={s.sideNavitem} onClick={() => this.openClose()}>
												<FontAwesome.FaArrowRight className={s.navigationIcon} />
												<span><FormattedMessage {...messages.carFeatures} /></span>
											</Link>
										</li>
										<li className={cx({ [s.active]: location === '/siteadmin/listsettings/21' })}>
											<Link to={"/siteadmin/listsettings/21"} className={s.sideNavitem} onClick={() => this.openClose()}>
												<FontAwesome.FaArrowRight className={s.navigationIcon} />
												<span><FormattedMessage {...messages.odometer} /></span>
											</Link>
										</li>
									</div>
								</Collapse>
							</div>}

							{validatePrivilege(17, privileges) && <div>
								<div className={cx({ [s.active]: listSettingStep2.includes(location) })}>
									<Button
										bsStyle="link"
										className={cx(s.button, s.noPadding, s.sideNavitem)}
										onClick={() => this.setState({
											step3: !this.state.step3
										})}>
										<FontAwesome.FaSliders className={s.navigationIcon} />
										<span><FormattedMessage {...messages.carSettingsForStep} />#3</span>
										{
											this.state.step3 && <FontAwesome.FaAngleUp className={s.navigationIcon} />
										}

										{
											!this.state.step3 && <FontAwesome.FaAngleDown className={s.navigationIcon} />
										}
									</Button>
								</div>
								<Collapse in={this.state.step3} className={s.subMenu}>
									<div>
										<li className={cx({ [s.active]: location === '/siteadmin/listsettings/13' })}>
											<Link to={"/siteadmin/listsettings/13"} className={s.sideNavitem} onClick={() => this.openClose()}>
												<FontAwesome.FaArrowRight className={s.navigationIcon} />
												<span><FormattedMessage {...messages.guestRequirements} /></span>
											</Link>
										</li>
										<li className={cx({ [s.active]: location === '/siteadmin/listsettings/14' })}>
											<Link to={"/siteadmin/listsettings/14"} className={s.sideNavitem} onClick={() => this.openClose()}>
												<FontAwesome.FaArrowRight className={s.navigationIcon} />
												<span><FormattedMessage {...messages.carRules} /></span>
											</Link>
										</li>
										<li className={cx({ [s.active]: location === '/siteadmin/listsettings/15' })}>
											<Link to={"/siteadmin/listsettings/15"} className={s.sideNavitem} onClick={() => this.openClose()}>
												<FontAwesome.FaArrowRight className={s.navigationIcon} />
												<span><FormattedMessage {...messages.reviewHowRentersBook} /></span>
											</Link>
										</li>
										{/* <li className={cx({ [s.active]: location === '/siteadmin/listsettings/16' })}>
											<Link to={"/siteadmin/listsettings/16"} className={s.sideNavitem} onClick={() => this.openClose()}>
												<FontAwesome.FaArrowRight className={s.navigationIcon} />
												<span><FormattedMessage {...messages.bookingNoticeTime} /></span>
											</Link>
										</li> */}
										<li className={cx({ [s.active]: location === '/siteadmin/listsettings/18' })}>
											<Link to={"/siteadmin/listsettings/18"} className={s.sideNavitem} onClick={() => this.openClose()}>
												<FontAwesome.FaArrowRight className={s.navigationIcon} />
												<span><FormattedMessage {...messages.minimumDays} /></span>
											</Link>
										</li>
										<li className={cx({ [s.active]: location === '/siteadmin/listsettings/19' })}>
											<Link to={"/siteadmin/listsettings/19"} className={s.sideNavitem} onClick={() => this.openClose()}>
												<FontAwesome.FaArrowRight className={s.navigationIcon} />
												<span><FormattedMessage {...messages.maximumDays} /></span>
											</Link>
										</li>
									</div>
								</Collapse>
							</div>}
							{validatePrivilege(18, privileges) && <li className={cx({ [s.active]: (location === '/siteadmin/content-management' || location.startsWith('/siteadmin/edit/page/') || location.startsWith('/siteadmin/page/add')) })}>
								<Link to={"/siteadmin/content-management"} className={s.sideNavitem} onClick={() => this.openClose()}>
									<FontAwesome.FaList className={s.navigationIcon} />
									<span><FormattedMessage {...messages.contentManagementLabel} /></span>
								</Link>
							</li>}
							{validatePrivilege(19, privileges) && <li className={cx({ [s.active]: (location === '/siteadmin/staticpage/management' || location.startsWith('/siteadmin/edit/staticpage/')) })}>
								<Link to={'/siteadmin/staticpage/management'} className={s.sideNavitem} onClick={() => this.openClose()}>
									<FontAwesome.FaList className={s.navigationIcon} />
									<span><FormattedMessage {...messages.staticContentManagement} /></span>
								</Link>
							</li>}
						</ul>
					</div>
				</div>
			</div>
		)
	}
}

const mapState = (state) => ({
	currentLocale: state.intl.locale,
	isSuperAdmin: state.runtime.isSuperAdmin,
	privileges: state.account.privileges && state.account.privileges.privileges && state.account.privileges.privileges,
});

const mapDispatch = {
	adminLogout,
	openHeaderModal
};
export default withStyles(s)(connect(mapState, mapDispatch)(SideBar));