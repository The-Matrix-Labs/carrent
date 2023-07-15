import React from 'react';
import { Button, Col, ControlLabel, FormControl, FormGroup, Modal, Row, InputGroup } from 'react-bootstrap';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Field, formValueSelector, reduxForm } from 'redux-form';
import messages from '../../locale/messages';
import cx from 'classnames';

import s from './HostClaimModal.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import validate from './validate';
import updateClaimForHostMutation from './updateClaimForHost.graphql';
import Dropzone from './Dropzone';
import { graphql } from 'react-apollo';
import Loader from '../Loader/Loader';
import { convert, showCurrencySymbol } from '../../helpers/currencyConvertion';
import { toastr } from 'react-redux-toastr';
import CurrencyConverter from '../CurrencyConverter/CurrencyConverter';
import ClaimImagesSlider from './ClaimImagesSlider';
class HostClaimModal extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = { loading: false, claimImages: [], imageLoader: false };
        this.removeImage = this.removeImage.bind(this);
    }
    renderFormControl = ({ input, placeholder, type, meta: { touched, error }, className, disabled }) => {
        const { formatMessage } = this.props.intl;
        const { claimed, currency, currencyRates, toCurrency } = this.props;
        if (claimed || input.name == 'securityDeposit') {
            return (
                <div className={s.inputBox}>
                    <CurrencyConverter amount={Number(input.value)} from={currencyRates.to} />
                </div>
            )
        }
        return (
            <div className={'claimAddon'}>
                <InputGroup>
                    <InputGroup.Addon className={s.addonStyle}>
                        <span className={cx(s.symbolCss, 'symbolCssRTL')}>{showCurrencySymbol(toCurrency) == '' ?  toCurrency  : showCurrencySymbol(toCurrency)}</span>
                    </InputGroup.Addon>
                    <FormControl
                        {...input}
                        placeholder={placeholder}
                        type={type}
                        className={className}
                        disabled={disabled}
                    />
                </InputGroup>

                {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
            </div>
        )
    }
    renderFormControlTextArea = ({ input, placeholder, meta: { touched, error }, disabled, className }) => {
        const { formatMessage } = this.props.intl;
        return (
            <div>
                <FormControl
                    {...input}
                    className={className}
                    componentClass="textarea"
                    placeholder={placeholder}
                    disabled={disabled}
                    maxLength={250}
                />
                {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
            </div>
        );
    }
    async handleSubmit(values, dispatch) {
        const { updateClaimForHost, reservationId, refetchData, currencyRates, currency } = this.props;
        let claimAmount = convert(currencyRates.base, currencyRates.rates, values.claimAmount, currencyRates.to || currencyRates.base, currency);

        this.setState({ loading: true });
        const { data } = await updateClaimForHost({ variables: { reservationId, claimAmount, claimImages: values.claimImages, claimReason: values.claimReason } });

        if (data && data.updateClaimForHost && data.updateClaimForHost.status == 200) {
            toastr.success('Success!', 'Claim updated successfully')
            this.closeModal();
        } else {
            toastr.error('Oops!', 'Something went wrong');
            this.setState({ loading: false });
        }

        refetchData && refetchData();
    }

    async removeImage(image) {
        const { change, claimImages } = this.props;
        let updatedClaimImages = [...claimImages];
        this.setImageLoader(true);
        const resp = await fetch('/remove/claim/photos', {
            method: "POST", body: JSON.stringify({ filename: image }), credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const data = await resp.json();
        if (data && data.status == 200) {
            toastr.success('Success!', "Image removed successfully");
            if (Array.isArray(claimImages)) {
                let index = claimImages.findIndex(item => item == image);
                if (index > -1) updatedClaimImages.splice(index, 1);
            }
            change('claimImages', updatedClaimImages);
        }
        this.setImageLoader(false);

    }
    setImageLoader = status => this.setState({ imageLoader: status });
    closeModal = () => {
        const { changeModalState } = this.props;
        changeModalState(false);
    }
    render() {
        const { show, handleSubmit, claimImages, claimed } = this.props;
        const { formatMessage } = this.props.intl;
        const { loading, imageLoader } = this.state;
        return (
            <Modal show={show} onHide={this.closeModal} className={'hostClaminModal'}>
                <Modal.Header closeButton>
                    <h1>{claimed ? formatMessage(messages.claimDetails) : formatMessage(messages.claimDamage)}</h1>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit(this.handleSubmit)}>
                        <FormGroup className={cx(s.formGroup, s.space4)}>
                            <ControlLabel className={s.landingStep3}>
                                <FormattedMessage {...messages.depositAmount} />
                            </ControlLabel>
                            <Field
                                name="securityDeposit"
                                type="text"
                                component={this.renderFormControl}
                                placeholder={formatMessage(messages.depositAmount)}
                                disabled
                            />
                        </FormGroup>
                        <FormGroup className={cx(s.formGroup, s.space4)}>
                            <ControlLabel className={s.landingStep3}>
                                <FormattedMessage {...(messages[claimed ? "amountClaimedByOwner" : "claimAmount"])} />
                            </ControlLabel>
                            <Field
                                name="claimAmount"
                                type="text"
                                component={this.renderFormControl}
                                placeholder={formatMessage(messages.enterClaimAmount)}
                                disabled={claimed}
                                className={s.modalInputCommon}
                            />
                        </FormGroup>
                        <FormGroup className={cx(s.formGroup, s.space4)}>
                            <ControlLabel className={s.landingStep3}>
                                <FormattedMessage {...messages.reasonForClaim} />
                            </ControlLabel>
                            <Field
                                name="claimReason"
                                type="text"
                                component={this.renderFormControlTextArea}
                                placeholder={formatMessage(messages.enterClaimReason)}
                                disabled={claimed}
                                className={cx(s.modalInputCommon, s.textHeight)}
                            />
                        </FormGroup>

                        {!claimed && <FormGroup className={cx(s.formGroup, s.space4)}>
                            <ControlLabel className={s.landingStep3}>
                                <FormattedMessage {...messages.uploadClaimImage} />
                            </ControlLabel>
                            <div>{formatMessage(messages.uploadClaimImageInfo)}</div>
                            <Field
                                name="claimImages"
                                component={Dropzone}
                                errorMessageClass={s.errorMessage}
                                setImageLoader={this.setImageLoader}
                            />
                        </FormGroup>}

                        {
                            imageLoader && <Loader type={"text"} />
                        }

                        {
                            !imageLoader && claimImages && claimImages.length > 0 && <ClaimImagesSlider
                                data={claimImages}
                                slidesPerView={3} arrow
                                claimed={claimed}
                                removeImage={this.removeImage}
                            />
                        }

                        {!claimed && <div className={cx(s.alignRight, 'textAlignLeftRTL')}>
                            <Button onClick={this.closeModal} className={s.cancelBtn}>
                                {formatMessage(messages.cancel)}
                            </Button>
                            <div className={s.disPlayInline}>
                                <Loader
                                    type={"button"}
                                    buttonType={"submit"}
                                    label={formatMessage(messages.submit)}
                                    show={loading}
                                    disabled={loading}
                                    className={s.submitBtn}
                                />
                            </div>
                        </div>}

                    </form>
                </Modal.Body>
            </Modal>
        )
    }
}

HostClaimModal = reduxForm({
    form: 'HostClaimModalForm',
    validate
})(HostClaimModal);

const selector = formValueSelector('HostClaimModalForm');

const mapState = state => ({
    claimImages: selector(state, 'claimImages'),
    currencyRates: state.currency,
    toCurrency: state.currency.to,

});

const mapDispatch = {};

export default injectIntl(
    graphql(updateClaimForHostMutation, {
        name: 'updateClaimForHost'
    })(withStyles(s)(connect(mapState, mapDispatch)(HostClaimModal))));