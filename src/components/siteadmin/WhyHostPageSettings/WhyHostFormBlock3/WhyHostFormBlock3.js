import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import submit from './submit';
import validate from './validate';

import cx from 'classnames';
import {
  Button,
  Row,
  FormGroup,
  Col,
  FormControl,
} from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './WhyHostFormBlock3.css';
import cp from '../../../../components/commonStyle.css';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../../locale/messages';

class WhyHostFormBlock3 extends Component {

  renderFormControlTextArea = ({ input, label, meta: { touched, error }, children, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <FormControl
          {...input}
          className={className}
          componentClass="textarea"
          rows='4'
        >
          {children}
        </FormControl>
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
      </div>
    )
  }

  renderFormControl = ({ input, label, type, meta: { touched, error }, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <FormControl {...input} placeholder={label} type={type} className={cx(cp.formControlInput, className)} />
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
      </div>
    )
  }


  render() {

    const { error, handleSubmit, submitting, dispatch, initialValues, title } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <div className={cx(s.pagecontentWrapper, 'pagecontentWrapperRTL')}>
        <div>
          <h1 className={s.headerTitle}><FormattedMessage {...messages.WhyBecomeOwnerBlock3} /></h1>
          <Col xs={12} sm={12} md={8} lg={7} className={s.blockcenter}>
            <div className={s.panelHeader}>
              <form onSubmit={handleSubmit(submit)}>
                {error && <strong>{formatMessage(error)}</strong>}
                <FormGroup className={s.space3}>
                  <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                      <label className={cp.labelTextNew} ><FormattedMessage {...messages.whyBlockTitleLabel} /> 1</label>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12}>
                      <Field
                        name="whyBlockTitle1"
                        type="text"
                        component={this.renderFormControl}
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup className={s.space3}>
                  <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                      <label className={cp.labelTextNew} ><FormattedMessage {...messages.whyBlockContentLabel} /> 1</label>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12}>
                      <Field
                        name="whyBlockContent1"
                        component={this.renderFormControlTextArea}
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup className={s.space3}>
                  <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                      <label className={cp.labelTextNew} ><FormattedMessage {...messages.whyBlockTitleLabel} /> 2</label>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12}>
                      <Field
                        name="whyBlockTitle2"
                        type="text"
                        component={this.renderFormControl}
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup className={s.space3}>
                  <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                      <label className={cp.labelTextNew} ><FormattedMessage {...messages.whyBlockContentLabel} /> 2</label>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12}>
                      <Field
                        name="whyBlockContent2"
                        component={this.renderFormControlTextArea}
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup className={s.noMargin}>
                  <Row>
                    <Col xs={12} sm={12} md={12} lg={12} className={cx(cp.textAlignRight, 'textAlignLeftRTL')}>
                      <Button className={cx(cp.btnPrimary, cp.btnlarge)} type="submit" disabled={submitting}>
                        <FormattedMessage {...messages.save} />
                      </Button>
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

WhyHostFormBlock3 = reduxForm({
  form: 'WhyHostForm',
  validate
})(WhyHostFormBlock3);

export default injectIntl(withStyles(s, cp)(WhyHostFormBlock3));