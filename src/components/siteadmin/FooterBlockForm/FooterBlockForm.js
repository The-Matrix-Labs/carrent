import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Field, reduxForm } from 'redux-form';
import submit from './submit';
import validate from './validate';
import { connect } from 'react-redux';

// Style
import cx from 'classnames';
import {
  Button,
  Row,
  FormGroup,
  Col,
  FormControl,
} from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './FooterBlockForm.css';
import cp from '../../../components/commonStyle.css';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../locale/messages';

class FooterBlockForm extends Component {

  static propTypes = {
    initialValues: PropTypes.object,
    title: PropTypes.string.isRequired,
  };

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
        <FormControl {...input} placeholder={label} type={type} className={cx(className, cp.formControlInput)} />
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
          <h1 className={s.headerTitle}><FormattedMessage {...messages.footerBlockLabel} /></h1>
          <Col xs={12} sm={12} md={8} lg={7} className={s.blockcenter}>
            <div className={s.panelHeader}>
              <form onSubmit={handleSubmit(submit)}>
                {error && <strong>{formatMessage(error)}</strong>}
                <FormGroup className={s.space3}>
                  <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                      <label className={cp.labelTextNew} ><FormattedMessage {...messages.adminTitleLabel} /> 1</label>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12}>
                      <Field
                        name="title1"
                        type="text"
                        component={this.renderFormControl}
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup className={s.space3}>
                  <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                      <label className={cp.labelTextNew} ><FormattedMessage {...messages.contentLabel} /> 1</label>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12}>
                      <Field
                        name="content1"
                        component={this.renderFormControlTextArea}
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup className={s.space3}>
                  <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                      <label className={cp.labelTextNew} ><FormattedMessage {...messages.adminTitleLabel} /> 2</label>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12}>
                      <Field
                        name="title2"
                        type="text"
                        component={this.renderFormControl}
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup className={s.space3}>
                  <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                      <label className={cp.labelTextNew} ><FormattedMessage {...messages.contentLabel} /> 2</label>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} >
                      <Field
                        name="content2"
                        component={this.renderFormControlTextArea}
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup className={s.space3}>
                  <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                      <label className={cp.labelTextNew} ><FormattedMessage {...messages.adminTitleLabel} /> 3</label>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12}>
                      <Field
                        name="title3"
                        type="text"
                        component={this.renderFormControl}
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup className={s.space3}>
                  <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                      <label className={cp.labelTextNew} ><FormattedMessage {...messages.contentLabel} /> 3</label>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12}>
                      <Field
                        name="content3"
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

FooterBlockForm = reduxForm({
  form: 'FooterBlockForm', // a unique name for this form
  validate
})(FooterBlockForm);

export default injectIntl(withStyles(s, cp)(FooterBlockForm));