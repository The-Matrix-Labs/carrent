import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Field, reduxForm } from 'redux-form';
import submit from './submit';
import validate from './validate';

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
import s from './StaticBlockForm.css';
import cp from '../../../components/commonStyle.css';
import BlockUploader from './BlockUploader';
import Uploader from './Uploader';
import CarBlockUploader from './CarBlockUploader';
import CounterBlockUploader from './CounterBlockUploader/CounterBlockUploader';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../locale/messages';

class StaticBlockForm extends Component {

  static propTypes = {
    initialValues: PropTypes.object,
    title: PropTypes.string.isRequired,
  };

  renderFormControlTextArea = ({ input, label, meta: { touched, error }, children, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <FormGroup className={s.space3}>
          <FormControl
            {...input}
            className={className}
            componentClass="textarea"
            rows='4'
          >
            {children}
          </FormControl>
          {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
        </FormGroup>
      </div>
    )
  }

  renderFormControl = ({ input, label, type, meta: { touched, error }, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <FormGroup className={s.space3}>
          <FormControl {...input} placeholder={label} type={type} className={cx(className, cp.formControlInput)} maxLength={80} />
          {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
        </FormGroup>
      </div>
    )
  }

  renderFormControlSelect({ input, label, placeholder, meta: { touched, error }, children, className, disabled }) {
    const { formatMessage } = this.props.intl;
    return (
      <FormGroup className={s.space3}>
        <FormControl disabled={disabled} componentClass="select" {...input} className={cx(className, cp.formControlSelect)}>
          {children}
        </FormControl>
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
      </FormGroup>
    )
  }

  render() {

    const { error, handleSubmit, submitting, dispatch, initialValues, title } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <div className={cx(s.pagecontentWrapper, 'pagecontentWrapperRTL')}>
        <div>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <h1 className={s.headerTitle}><FormattedMessage {...messages.staticInfoBlock} /></h1>
              <form onSubmit={handleSubmit(submit)}>
                {error && <strong>{formatMessage(error)}</strong>}
                <Row>
                  <Col lg={6} md={6} sm={12} xs={12}>
                    <Row>
                      <Col lg={12} md={12} sm={12} xs={12}>
                        <h3><FormattedMessage {...messages.bannerImageBlock} /> #1</h3>
                      </Col>
                      <Col xs={12} sm={12} md={12} lg={12}>
                        <label className={cp.labelTextNew} ><FormattedMessage {...messages.imageLabel} /></label>
                      </Col>
                      <Col xs={12} sm={12} md={12} lg={12}>
                        <CounterBlockUploader />
                      </Col>
                      <Col xs={12} sm={12} md={12} lg={12}>
                        <label className={cp.labelTextNew} ><FormattedMessage {...messages.headingLabel} /></label>
                      </Col>
                      <Col xs={12} sm={12} md={12} lg={12}>
                        <Field
                          name="carCounterTitle3"
                          component={this.renderFormControl}
                        />
                      </Col>
                      <Col xs={12} sm={12} md={12} lg={12}>
                        <label className={cp.labelTextNew} ><FormattedMessage {...messages.adminTitleLabel} /> #1</label>
                      </Col>
                      <Col xs={12} sm={12} md={12} lg={12}>
                        <Field
                          name="carCounterTitle1"
                          component={this.renderFormControl}
                        />
                      </Col>
                      <Col xs={12} sm={12} md={12} lg={12}>
                        <label className={cp.labelTextNew} ><FormattedMessage {...messages.contentLabel} /> #1</label>
                      </Col>
                      <Col xs={12} sm={12} md={12} lg={12}>
                        <Field
                          name="carCounterContent1"
                          component={this.renderFormControlTextArea}
                        />
                      </Col>
                      <Col xs={12} sm={12} md={12} lg={12}>
                        <label className={cp.labelTextNew} ><FormattedMessage {...messages.adminTitleLabel} /> #2</label>
                      </Col>
                      <Col xs={12} sm={12} md={12} lg={12}>
                        <Field
                          name="carCounterTitle2"
                          component={this.renderFormControl}
                        />
                      </Col>
                      <Col xs={12} sm={12} md={12} lg={12}>
                        <label className={cp.labelTextNew} ><FormattedMessage {...messages.contentLabel} /> #2</label>
                      </Col>
                      <Col xs={12} sm={12} md={12} lg={12}>
                        <Field
                          name="carCounterContent2"
                          component={this.renderFormControlTextArea}
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Col lg={6} md={6} sm={12} xs={12}>
                    <Row>
                      <Col lg={12} md={12} sm={12} xs={12}>
                        <h3><FormattedMessage {...messages.bannerImageBlock} /> #2</h3>
                      </Col>
                      <Col xs={12} sm={12} md={12} lg={12}>
                        <label className={cp.labelTextNew} ><FormattedMessage {...messages.imageLabel} /></label>
                      </Col>
                      <Col xs={12} sm={12} md={12} lg={12}>
                        <CarBlockUploader />
                      </Col>
                      <Col xs={12} sm={12} md={12} lg={12}>
                        <label className={cp.labelTextNew} ><FormattedMessage {...messages.adminTitleLabel} /> #1</label>
                      </Col>
                      <Col xs={12} sm={12} md={12} lg={12}>
                        <Field
                          name="carBlockTitle1"
                          component={this.renderFormControl}
                        />
                      </Col>
                      <Col xs={12} sm={12} md={12} lg={12}>
                        <label className={cp.labelTextNew} ><FormattedMessage {...messages.contentLabel} /> #1</label>
                      </Col>
                      <Col xs={12} sm={12} md={12} lg={12}>
                        <Field
                          name="carBlockTitle2"
                          component={this.renderFormControlTextArea}
                        />
                      </Col>
                      <Col xs={12} sm={12} md={12} lg={12}>
                        <label className={cp.labelTextNew} ><FormattedMessage {...messages.contentLabel} /> #2</label>
                      </Col>
                      <Col xs={12} sm={12} md={12} lg={12}>
                        <Field
                          name="carBlockContent1"
                          component={this.renderFormControlTextArea}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>

                <Row>
                  <Col lg={12} md={12} sm={12} xs={12}>
                    <h3><FormattedMessage {...messages.footerHeaderBlock} /></h3>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <label className={cp.labelTextNew} ><FormattedMessage {...messages.adminTitleLabel} /></label>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <Field
                      name="carTripTitle1"
                      type="text"
                      component={this.renderFormControl}
                    />
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <label className={cp.labelTextNew} ><FormattedMessage {...messages.contentLabel} /></label>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <Field
                      name="carTripContent1"
                      component={this.renderFormControlTextArea}
                    />
                  </Col>
                  <Col lg={6} md={6} sm={12} xs={12}>
                    <Row>
                      <Col lg={12} md={12} sm={12} xs={12}>
                        <h3><FormattedMessage {...messages.footerImageBlock} /> #1</h3>
                      </Col>
                      <Col xs={12} sm={12} md={12} lg={12}>
                        <label className={cp.labelTextNew} ><FormattedMessage {...messages.imageLabel} /></label>
                      </Col>
                      <Col xs={12} sm={12} md={12} lg={12}>
                        <BlockUploader />
                      </Col>
                      <Col xs={12} sm={12} md={12} lg={12}>
                        <label className={cp.labelTextNew} ><FormattedMessage {...messages.adminTitleLabel} /></label>
                      </Col>
                      <Col xs={12} sm={12} md={12} lg={12}>
                        <Field
                          name="carTripTitle2"
                          type="text"
                          component={this.renderFormControl}
                        />
                      </Col>
                      <Col xs={12} sm={12} md={12} lg={12}>
                        <label className={cp.labelTextNew} ><FormattedMessage {...messages.contentLabel} /></label>
                      </Col>
                      <Col xs={12} sm={12} md={12} lg={12}>
                        <Field
                          name="carTripContent2"
                          component={this.renderFormControlTextArea}
                        />
                      </Col>
                    </Row>
                  </Col>

                  <Col lg={6} md={6} sm={12} xs={12}>
                    <Row>
                      <Col lg={12} md={12} sm={12} xs={12}>
                        <h3><FormattedMessage {...messages.footerImageBlock} /> #2</h3>
                      </Col>
                      <Col xs={12} sm={12} md={12} lg={12}>
                        <label className={cp.labelTextNew} ><FormattedMessage {...messages.imageLabel} /></label>
                      </Col>
                      <Col xs={12} sm={12} md={12} lg={12}>
                        <Uploader />
                      </Col>
                      <Col xs={12} sm={12} md={12} lg={12}>
                        <label className={cp.labelTextNew} ><FormattedMessage {...messages.adminTitleLabel} /></label>
                      </Col>
                      <Col xs={12} sm={12} md={12} lg={12}>
                        <Field
                          name="carTripTitle3"
                          type="text"
                          component={this.renderFormControl}
                        />
                      </Col>
                      <Col xs={12} sm={12} md={12} lg={12}>
                        <label className={cp.labelTextNew} ><FormattedMessage {...messages.contentLabel} /></label>
                      </Col>
                      <Col xs={12} sm={12} md={12} lg={12}>
                        <Field
                          name="carTripContent3"
                          component={this.renderFormControlTextArea}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
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
            </Col>
          </Row>
        </div>
      </div>
    );
  }

}

StaticBlockForm = reduxForm({
  form: 'StaticBlockForm', // a unique name for this form
  validate
})(StaticBlockForm);

export default injectIntl(withStyles(s, cp)(StaticBlockForm));