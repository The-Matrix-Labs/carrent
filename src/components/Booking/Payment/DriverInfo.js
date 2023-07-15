import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import cx from 'classnames';
import {
    FormGroup,
    FormControl,
    ControlLabel,
    Col,
    Row
} from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Payment.css';

// Helper
import PopulateData from '../../../helpers/populateData';

// Locale
import messages from '../../../locale/messages';
import CountryList from '../../CountryList';

class DriverInfo extends Component {

    static propTypes = {
        formatMessage: PropTypes.any,
        paymentType: PropTypes.number
    };

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {
            lookupData: {},
            countryCode: 'IN',
            country: '+91',
        }
        this.renderField = this.renderField.bind(this);
        this.renderFormControl = this.renderFormControl.bind(this);
        this.renderFormControlSelect = this.renderFormControlSelect.bind(this);
        this.renderCountryList = this.renderCountryList.bind(this);
    }

    UNSAFE_componentWillMount() {
        let now = new Date();
        let currentYear = now.getFullYear();
        let years = PopulateData.generateData(1920, currentYear, "desc");
        let months = PopulateData.generateData(0, 11);
        let days = PopulateData.generateData(1, 31);

        this.setState({
            lookupData: {
                years: years,
                months: months,
                days: days
            }
        });
    }

    renderField({ input, label, type, placeholder, meta: { touched, error, dirty }, disabled }) {
        const { formatMessage } = this.props.intl;
        return (
            <FormGroup className={cx(s.formGroup, s.space4)}>
                <FormControl disabled={disabled} {...input} componentClass="input" placeholder={placeholder} className={cx(s.formControlInput, s.paymentFormSelect)} />
                {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
            </FormGroup>
        );
    }

    renderFormControl({ input, label, type, placeholder, meta: { touched, error, dirty }, disabled }) {
        const { formatMessage } = this.props.intl;
        return (
            <FormGroup className={cx(s.formGroup, s.space4)}>
                <FormControl disabled={disabled} {...input} componentClass="input" placeholder={placeholder} className={cx(s.formControlInput, s.paymentFormSelect)} maxLength={16} />
                {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
            </FormGroup>
        );
    }

    renderFormControlSelect({ input, label, placeholder, meta: { touched, error }, children, className, disabled }) {
        const { formatMessage } = this.props.intl;
        return (
            <div className='paymenySelectRTL'>
            <FormGroup className={cx(s.formGroup, s.marginBottomNone, s.space4)}>
                <FormControl disabled={disabled} componentClass="select" {...input} className={s.paymentFormSelect} >
                    {children}
                </FormControl>
                {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
            </FormGroup>
            </div>
        )
    }

    renderCountryList({ input, label, meta: { touched, error }, children, className }) {
        const { formatMessage } = this.props.intl;
        return (
            <div className={cx(s.space4, 'paymenySelectRTL')}>
                <FormGroup className={cx(s.formGroup, s.marginBottomNone, s.noMarginBottom)}>
                    <CountryList input={input} className={cx(className, s.selectFormControl, s.paymentFormSelect, s.paymentFormSelectWidth)} isEmptyFirst />
                </FormGroup>
                {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
            </div>
        );
    }

    render() {
        const { handleSubmit, submitting, error, pristine, paymentType } = this.props;
        const { lookupData } = this.state;
        const { formatMessage } = this.props.intl;
        return (
            <div className={s.driverInfoPadding}>
                <Col lg={9} xs={12} md={10} sm={12} className={cx(s.creditCardForm, 'inputFocusColor')}>
                    <div className={s.creditCardFormSection}>
                        <Field className={s.noMargin}
                            name="licenseNumber"
                            component={this.renderFormControl}
                            placeholder={formatMessage(messages.licenseNumber)}
                            maxLength={16}
                        />
                        <Field name="firstName" component={this.renderField} placeholder={formatMessage(messages.firstName)} />
                        <Field name="middleName" component={this.renderField} placeholder={formatMessage(messages.middleName)} />
                        <Field name="lastName" component={this.renderField} placeholder={formatMessage(messages.lastName)} />
                    </div>
                    <div className={s.creditCardFormSection}>
                        <Col md={12} sm={12} xs={12} lg={12} className={s.noPadding}>
                            <p className={s.dob}>{formatMessage(messages.provideDOB)}:</p>
                            <Col md={4} sm={4} lg={4} xs={12} className={cx(s.paddingLeftNone, s.paddingRight7, s.responsiveMonth, 'responsiveMonthRTL')}>
                                <Field name="month" className={cx(s.formControlSelect, s.commonBorder)} component={this.renderFormControlSelect} >
                                    <option value="">{formatMessage(messages.month)}</option>
                                    {
                                        lookupData.months.map((item, key) => {
                                            return (
                                                <option key={key} value={item}>{item + 1}</option>
                                            )
                                        })
                                    }
                                </Field>
                            </Col>
                            <Col md={4} sm={4} lg={4} xs={12} className={cx(s.paddingNone, s.responsiveDay)}>
                                <Field name="day" component={this.renderFormControlSelect} className={cx(s.formControlSelect, s.noMargin)}>
                                    <option value="">{formatMessage(messages.day)}</option>
                                    {
                                        lookupData.days.map((item, key) => {
                                            return (
                                                <option key={key} value={item}>{item}</option>
                                            )
                                        })
                                    }
                                </Field>
                            </Col>
                            <Col md={4} sm={4} lg={4} xs={12} className={cx(s.paddingRightNone, s.paddingLeft7, s.responsiveYear)}>
                                <Field
                                    name="year" component={this.renderFormControlSelect} className={cx(s.formControlSelect, s.noMargin)}
                                >
                                    <option value="">{formatMessage(messages.expiryYear)}</option>
                                    {
                                        lookupData.years.map((item, key) => {
                                            return (
                                                <option key={key} value={item}>{item}</option>
                                            )
                                        })
                                    }
                                </Field>
                            </Col>
                        </Col>
                    </div>
                    <Field name="country" component={this.renderCountryList} className={cx(s.formControlSelect, 
                     s.jumboSelect, s.formControlSelectLarge, s.countrySelectIconPosition, s.noMarginBottom)} />
                </Col>
            </div>
        )
    }
}

const mapState = (state) => ({});

const mapDispatch = {};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(DriverInfo)));
