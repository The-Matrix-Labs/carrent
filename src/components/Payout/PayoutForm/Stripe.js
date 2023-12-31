import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';

// Redux
import { connect } from 'react-redux';

// Redux Form
import {
    Field, reduxForm, formValueSelector, change,
    getFormSyncErrors, submit as submitForm, getFormValues
} from 'redux-form';

import {
    Button,
    FormGroup,
    Col,
    FormControl,
    Panel,
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { toastr } from 'react-redux-toastr';

// Stripe
import { injectStripe } from 'react-stripe-elements';

import s from '../Payout.css';

// Helpers
import validateStripe from './validateStripe';
import submit from './submit';
import { isEuropeCountry } from '../../../helpers/europeCountryHelpers';
import generateStripePayoutToken from '../../../helpers/generateStripePayoutToken';

// Redux actions
import { startPayoutLoading, stopPayoutLoading } from '../../../actions/Payout/addPayoutAction';

// Locale
import messages from '../../../locale/messages';

// Components
import Loader from '../../Loader';

class Stripe extends Component {
    static propTypes = {
        handleSubmit: PropTypes.any.isRequired,
        previousPage: PropTypes.any.isRequired,
        siteName: PropTypes.string.isRequired,
        formatMessage: PropTypes.any,
    };

    constructor(props) {
        super(props);
        this.handleSubmitAction = this.handleSubmitAction.bind(this);
    };

    static defaultProps = {
        businessType: 'individual'
    };

    renderField = ({ input, label, type, meta: { touched, error, dirty }, placeHolder }) => {
        const { formatMessage } = this.props.intl;
        return (
            <div className={s.space1}>
                <Col lg="4" md="4" sm="12" xs="12" className={cx(s.responsiveTextAlign, s.responsivePadding, 'textAlignLeftRTL')}>
                    <label className={s.labelText}>{label}</label>
                </Col>
                <Col lg="8" md="8" sm="12" xs="12" className={s.responsivePadding}>
                    <FormGroup className={s.formGroup}>
                        <FormControl
                            {...input}
                            componentClass="input"
                            className={cx(s.formControlInput, s.commonBorder, s.inputFormControl)}
                            placeholder={placeHolder}
                        />
                        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
                    </FormGroup>
                </Col>
            </div>
        );
    }

    renderSelectField = ({ input, label, type, meta: { touched, error, dirty }, children, placeHolder }) => {
        const { formatMessage } = this.props.intl;
        return (
            <div className={s.space1}>
                <Col lg="4" md="4" sm="12" xs="12" className={cx(s.responsiveTextAlign, s.responsivePadding, 'textAlignLeftRTL')}>
                    <label className={s.labelText}>{label}</label>
                </Col>
                <Col lg="8" md="8" sm="12" xs="12" className={s.responsivePadding}>
                    <FormGroup className={s.formGroup}>
                        <FormControl
                            {...input}
                            componentClass="select"
                            className={cx(s.formControlInput, s.commonBorder, s.inputFormControl)}
                            placeholder={placeHolder}
                        >
                            {children}
                        </FormControl>
                        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
                    </FormGroup>
                </Col>
            </div>
        );
    }

    async handleSubmitAction(event) {
        event.preventDefault();
        const { stripe, change, submitForm } = this.props;
        const { formValues, errors, startPayoutLoading, stopPayoutLoading } = this.props;
        let accountToken, personToken;

        if (errors && JSON.stringify(errors) !== '{}') { // If any error trigger the submit action to show the error messages
            submitForm('PayoutForm');
        }

        if ((!errors || (errors && JSON.stringify(errors) === '{}')) && formValues && stripe) {
            await startPayoutLoading();
            const generateTokens = await generateStripePayoutToken(stripe, formValues);
            if (generateTokens && generateTokens.status === 200) {
                accountToken = generateTokens.result && generateTokens.result.accountToken;
                personToken = generateTokens.result && generateTokens.result.personToken || null;
                await change('isTokenGenerated', true);
                await change('accountToken', accountToken);
                await change('personToken', personToken);
                await submitForm('PayoutForm');
            } else {
                toastr.error('Error!', generateTokens.errorMessage);
                await stopPayoutLoading();
            }
            return;
        }
    }

    render() {
        const { handleSubmit, pristine, previousPage, submitting, error } = this.props;
        const { base, availableCurrencies, siteName, payoutLoading, businessType, payoutCountry } = this.props;
        const { formatMessage } = this.props.intl;

        return (
            <div className={'inputFocusColor payoutSelectRTL'}>
                <form onSubmit={handleSubmit}>
                    <Panel className={s.panelHeader}
                        header={formatMessage(messages.addPayout)}
                        footer={
                            <div className={s.displayInline}>
                                <Button
                                    className={cx(s.button, s.btnlarge, s.btnPrimaryBorder, s.btnRight, 'payoutBackRTL')}
                                    onClick={previousPage}
                                >
                                    <FormattedMessage {...messages.back} />
                                </Button>
                                <div className={s.displayInline}>
                                    <Loader
                                        type={'button'}
                                        buttonType={'button'}
                                        className={cx(s.button, s.btnPrimary, s.btnlarge, s.displayInline)}
                                        disabled={pristine || submitting || error || payoutLoading}
                                        show={payoutLoading}
                                        label={formatMessage(messages.finish)}
                                        handleClick={this.handleSubmitAction}
                                    />
                                </div>
                            </div>
                        }>
                        <div className={s.panelBody}>
                            <Field
                                name="businessType"
                                component={this.renderSelectField}
                                label={formatMessage(messages.payoutType)}
                            >
                                <option value="individual">{formatMessage(messages.payoutIndividual)}</option>
                                <option value="company">{formatMessage(messages.payoutCompany)}</option>
                            </Field>

                            <Field
                                name="firstname"
                                component={this.renderField}
                                label={(businessType === 'individual' ? formatMessage(messages.payoutFirstName) : formatMessage(messages.payoutCompanyName))}
                                placeHolder={(businessType === 'individual' ? formatMessage(messages.payoutFirstName) : formatMessage(messages.payoutCompanyName))}
                            />

                            {
                                businessType && businessType === 'individual' && <Field
                                    name="lastname"
                                    component={this.renderField}
                                    label={formatMessage(messages.payoutLastName)}
                                    placeHolder={formatMessage(messages.payoutLastName)}
                                />
                            }

                            {
                                payoutCountry && ['US', 'CA', 'GB'].indexOf(payoutCountry) !== -1 &&
                                <Field
                                    name="routingNumber"
                                    component={this.renderField}
                                    label={payoutCountry === 'GB' ? formatMessage(messages.payoutSortNumber) : formatMessage(messages.payoutRouting)}
                                    placeHolder={payoutCountry === 'CA' ? "eg: 11000-000" : (payoutCountry === 'GB' ? "eg: 108800" : "eg: 110000000")}
                                />
                            }


                            <Field
                                name="accountNumber"
                                component={this.renderField}
                                label={isEuropeCountry(payoutCountry) ? formatMessage(messages.ibanNumber) : formatMessage(messages.accountNumber)}
                                placeHolder={isEuropeCountry(payoutCountry) ? `eg: ${payoutCountry}89370400440532013000` : (payoutCountry === 'GB' ? "eg: 00012345" : "eg: 000123456789")}
                            />

                            <Field
                                name="confirmAccountNumber"
                                component={this.renderField}
                                label={isEuropeCountry(payoutCountry) ? formatMessage(messages.confirmIbanNumber) : formatMessage(messages.confirmAccountNumber)}
                                placeHolder={isEuropeCountry(payoutCountry) ? `eg: ${payoutCountry}89370400440532013000` : (payoutCountry === 'GB' ? "eg: 00012345" : "eg: 000123456789")}
                            />

                            {
                                payoutCountry && payoutCountry === 'US' && businessType && businessType === 'individual' && <Field
                                    name="ssn4Digits"
                                    component={this.renderField}
                                    label={formatMessage(messages.ssn4Digits)}
                                    placeHolder={"1234"}
                                />
                            }

                            <div className={cx(s.infoBox)}>
                                <p>{formatMessage(messages.payoutStripeInfo)}</p>
                                <p>
                                    {formatMessage(messages.stripeTokenInfo1)}{' '}
                                    <a href={'https://stripe.com/connect-account/legal'} target={'_blank'}>{formatMessage(messages.stripeTokenInfo2)}</a>.
                            </p>
                            </div>
                        </div>
                    </Panel>
                </form>
            </div>
        );
    }
}

Stripe = reduxForm({
    form: 'PayoutForm', // a unique name for this form
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    validate: validateStripe,
    onSubmit: submit
})(Stripe);

const selector = formValueSelector('PayoutForm');

const mapState = (state) => ({
    siteName: state.siteSettings.data.siteName,
    availableCurrencies: state.currency.availableCurrencies,
    base: state.currency.base,
    payoutLoading: state.reservation.payoutLoading,
    businessType: selector(state, 'businessType'),
    payoutCountry: selector(state, 'country'),
    formValues: getFormValues('PayoutForm')(state),
    errors: getFormSyncErrors('PayoutForm')(state)
});

const mapDispatch = {
    submitForm,
    change,
    startPayoutLoading,
    stopPayoutLoading
};

export default injectStripe(injectIntl(withStyles(s)(connect(mapState, mapDispatch)(Stripe))));