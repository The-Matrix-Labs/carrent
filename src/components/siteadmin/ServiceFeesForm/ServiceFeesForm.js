import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';

import { Field, reduxForm } from 'redux-form';
import submit from './submit';
import validate from './validate';

// Style
import {
  Button,
  Row,
  FormGroup,
  Col,
  FormControl,
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ServiceFeesForm.css';
import cp from '../../../components/commonStyle.css';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../locale/messages';

class ServiceFeesForm extends Component {

  static propTypes = {
    initialValues: PropTypes.object,
    title: PropTypes.string.isRequired,
    base: PropTypes.string.isRequired,
    availableCurrencies: PropTypes.arrayOf(PropTypes.shape({
      symbol: PropTypes.string.isRequired
    })).isRequired
  };

  renderFormControl = ({ input, label, type, meta: { touched, error }, placeholder }) => {
    const { formatMessage } = this.props.intl;
    return (
      <FormGroup className={s.space3}>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <label className={cp.labelTextNew} >{label}</label>
          </Col>
          <Col xs={12} sm={12} md={12} lg={12}>
            <FormControl {...input} placeholder={placeholder} type={type} className={cp.formControlInput} />
            {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
          </Col>
        </Row>
      </FormGroup>
    );
  }

  renderFormControlSelect = ({ input, label, meta: { touched, error }, children }) => {
    const { formatMessage } = this.props.intl;
    return (
      <FormGroup className={s.space3}>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <label className={cp.labelTextNew} >{label}</label>
          </Col>
          <Col xs={12} sm={12} md={12} lg={12}>
            <div className={cx(s.select, s.currencyselect)}>
              <FormControl componentClass="select" {...input} className={cp.formControlSelect} >
                {children}
              </FormControl>
            </div>
            {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
          </Col>
        </Row>
      </FormGroup>
    )
  }

  render() {

    const { error, handleSubmit, submitting, dispatch, initialValues } = this.props;
    const { base, availableCurrencies } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <div className={cx(s.pagecontentWrapper, 'pagecontentWrapperRTL')}>
        <div>
          <h1 className={s.headerTitle}><FormattedMessage {...messages.serviceFeesSettings} /></h1>
          <Col xs={12} sm={12} md={8} lg={8} className={cx(s.blockcenter, 'adminRadioBtn')}>
            <div className={s.panelHeader}>
              <form onSubmit={handleSubmit(submit)}>
                {error && <strong>{formatMessage(error)}</strong>}
                <FormGroup className={s.space3}>
                  <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                      <label className={cp.labelTextNew}><FormattedMessage {...messages.renterFeeType} /></label>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12}>
                      <label className={cx(s.labelTextNew, cp.btnUPdate, cp.curserPointer)}>{' '}<Field name="guestType" component="input" type="radio" value="fixed" /><span className={cx(cp.radioBtn, 'radioBtnTextRTL')}><FormattedMessage {...messages.fixedPrice} /></span></label>
                      <label className={cx(s.labelTextNew, cp.btnModalDelete, cp.curserPointer, 'radioBtnRTL')}><Field name="guestType" component="input" type="radio" value="percentage" /><span className={cx(cp.radioBtn, 'radioBtnTextRTL')}><FormattedMessage {...messages.percentage} /></span></label>
                    </Col>
                  </Row>
                </FormGroup>
                <Field name="guestValue" type="text" component={this.renderFormControl} label={formatMessage(messages.renterServiceFee)} placeholder={formatMessage(messages.guestServiceFeePlacehold)} />
                <FormGroup className={s.space3}>
                  <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                      <label className={cp.labelTextNew}><FormattedMessage {...messages.carOwnerFeeType} /></label>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12}>
                      <label className={cx(s.labelTextNew, cp.btnUPdate, cp.curserPointer)}><Field name="hostType" component="input" type="radio" value="fixed" /><span className={cx(cp.radioBtn, 'radioBtnTextRTL')}><FormattedMessage {...messages.fixedPrice} /></span></label>
                      <label className={cx(s.labelTextNew, cp.btnModalDelete, cp.curserPointer, 'radioBtnRTL')}><Field name="hostType" component="input" type="radio" value="percentage" /><span className={cx(cp.radioBtn, 'radioBtnTextRTL')}><FormattedMessage {...messages.percentage} /></span></label>
                    </Col>
                  </Row>
                </FormGroup>
                <Field name="hostValue" type="text" component={this.renderFormControl} label={formatMessage(messages.carOwnerServiceFee)} placeholder={formatMessage(messages.guestServiceFeePlacehold)} />
                <Field name="currency" component={this.renderFormControlSelect} label={formatMessage(messages.currency)}>
                  <option value="">{formatMessage(messages.chooseCurrency)}</option>
                  {
                    availableCurrencies.map((currency, key) => {
                      if (currency.isEnable === true) {
                        return <option key={key} value={currency.symbol}>{currency.symbol}</option>
                      }
                    })
                  }
                </Field>
                <FormGroup className={s.noMargin}>
                  <Row>
                    <Col xs={12} sm={12} md={12} lg={12} className={cx(cp.textAlignRight, 'textAlignLeftRTL')}>
                      <Button className={cx(cp.btnPrimary, cp.btnlarge)} type="submit" disabled={submitting} ><FormattedMessage {...messages.save} /></Button>
                    </Col>
                  </Row>
                </FormGroup>
              </form>
            </div>
          </Col>
        </div>
      </div >
    );
  }

}

ServiceFeesForm = reduxForm({
  form: 'ServiceFeesForm', // a unique name for this form
  validate
})(ServiceFeesForm);

const mapState = (state) => ({
  availableCurrencies: state.currency.availableCurrencies,
  base: state.currency.base,
});

const mapDispatch = {
};

export default injectIntl(withStyles(s, cp)(connect(mapState, mapDispatch)(ServiceFeesForm)));