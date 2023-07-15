import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Field, reduxForm } from 'redux-form';

// Redux
import { connect } from 'react-redux';

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
import s from './SearchSettingsForm.css';
import cp from '../../../components/commonStyle.css';

import submit from './submit';
import validate from './validate';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../locale/messages';

class SearchSettingsForm extends Component {

  static propTypes = {
    initialValues: PropTypes.object,
    title: PropTypes.string.isRequired,
  };

  UNSAFE_componentWillMount() {
    const { initialize, initialValues } = this.props;
    if (initialValues != undefined) {
      initialize(initialValues);
    }
  }

  renderFormControl = ({ input, label, type, meta: { touched, error }, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <FormGroup className={s.space3}>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <label className={cp.labelTextNew} >{label}</label>
          </Col>
          <Col xs={12} sm={12} md={12} lg={12}>
            <FormControl {...input} type={type} className={cx(className, cp.formControlInput)} />
            {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
          </Col>
        </Row>
      </FormGroup>
    );
  }

  renderFormControlSelect = ({ input, label, meta: { touched, error }, children, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <FormGroup className={s.space3}>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <label className={cp.labelTextNew} >{label}</label>
          </Col>
          <Col xs={12} sm={12} md={12} lg={12}>
            <div className={cx(s.select, s.currencyselect)}>
              <FormControl componentClass="select" {...input} className={cx(className, cp.formControlSelect)} >
                {children}
              </FormControl>
            </div>
          </Col>
        </Row>
      </FormGroup>
    )
  }


  render() {
    const { error, handleSubmit, submitting, dispatch, title } = this.props;
    const { base, availableCurrencies } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <div className={cx(s.pagecontentWrapper, 'pagecontentWrapperRTL')}>
        <div>
          <h1 className={s.headerTitle}><FormattedMessage {...messages.searchSettings} /></h1>
          <Col xs={12} sm={12} md={8} lg={7} className={s.blockcenter}>
            <div className={s.panelHeader}>
              <form onSubmit={handleSubmit(submit)}>
                {error && <strong>{formatMessage(error)}</strong>}
                <Field name="minPrice" type="text" component={this.renderFormControl} label={formatMessage(messages.minimumPrice)} />
                <Field name="maxPrice" type="text" component={this.renderFormControl} label={formatMessage(messages.maximumPrice)} />
                <Field name="priceRangeCurrency" className={s.formControlSelect} component={this.renderFormControlSelect} label={formatMessage(messages.priceRangeCurrency)} >
                  {
                    availableCurrencies != null && availableCurrencies.length > 0 && availableCurrencies.map((currency, key) => {
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
      </div>
    );
  }

}

SearchSettingsForm = reduxForm({
  form: 'SearchSettingsForm', // a unique name for this form
  validate
})(SearchSettingsForm);

const mapState = (state) => ({
  availableCurrencies: state.currency.availableCurrencies,
  base: state.currency.base,
});

const mapDispatch = {
};

export default injectIntl(withStyles(s, cp)(connect(mapState, mapDispatch)(SearchSettingsForm)));