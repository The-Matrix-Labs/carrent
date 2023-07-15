import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux
import { graphql, compose } from 'react-apollo';

import { Field, reduxForm, reset } from 'redux-form';
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
import s from './AdminReviewsForm.css';
import cp from '../../../components/commonStyle.css';

// Component
import AdminStarRating from '../AdminStarRating';
import { toastr } from 'react-redux-toastr';
import Link from '../../Link';

// GraphQL
import WriteAdminReviewMutation from './WriteAdminReviewMutation.graphql';
import history from '../../../core/history';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../locale/messages';

class AdminReviewsForm extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    initialValues: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }

  renderFormControl = ({ input, label, type, meta: { touched, error }, className, placeholder }) => {
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

  renderFormControlTextArea = ({ input, label, meta: { touched, error }, className, children }) => {
    const { formatMessage } = this.props.intl;
    return (
      <FormGroup className={s.space3}>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <label className={cp.labelTextNew} >{label}</label>
          </Col>
          <Col xs={12} sm={12} md={12} lg={12}>
            <FormControl
              {...input}
              className={className}
              componentClass={"textarea"}
              rows='4'
            />
            {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
          </Col>
        </Row>
      </FormGroup>

    )
  }

  renderStarRating = ({ input, label, meta: { touched, error }, className, children }, value) => {
    const { formatMessage } = this.props.intl;
    return (
      <FormGroup className={s.space3}>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <label className={cp.labelTextNew} >{label}</label>
          </Col>
          <Col xs={12} sm={12} md={12} lg={12}>
            <span className={s.starSize}>
              <AdminStarRating
                name={input.name}
                change={input.onChange}
                value={input.value}
                editing={true}
              />
              {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
            </span>
          </Col>
        </Row>
      </FormGroup>

    )
  }

  async submitForm(values, dispatch) {
    const { mutate } = this.props;
    const { data } = await mutate({ variables: values });
    if (data && data.writeAdminReview) {
      if (data.writeAdminReview.status === '200') {
        if (values.id) {
          toastr.success("Updated Successfully!", "Admin review details updated successfully!");
        } else {
          toastr.success("Submitted Successfully!", "Admin review details submitted successfully!");
          dispatch(reset('AdminReviewsForm'));
        }
      } else if (data.writeAdminReview.status === '404') {
        toastr.error("Failed to update!", "List ID is not available!");
      } else {
        toastr.error("Failed to update!", "Your changes to admin review is failed!");
      }
      history.push('/siteadmin/reviews')
    }
  }

  render() {
    const { error, handleSubmit, submitting, title, initialValues } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <div className={cx(s.pagecontentWrapper, 'pagecontentWrapperRTL')}>
        <div>
          <h1 className={s.headerTitle}><FormattedMessage {...messages.adminReviews} /></h1>
          <Row>
            <Col xs={12} sm={12} md={8} lg={7} className={s.blockcenter}>
              {initialValues &&
                <div className={cx(s.space4, cp.textAlignRight, 'textAlignLeftRTL')}>
                  <Link to={'/siteadmin/reviews'} className={cx(cp.btnPrimaryBorder, cp.btnlarge)}>
                    <FormattedMessage {...messages.goBack} />
                  </Link>
                </div>
              }
              <div className={s.panelHeader}>
                <form onSubmit={handleSubmit(this.submitForm)}>
                  {error && <strong>{formatMessage(error)}</strong>}
                  <Field name="listId" type="text" component={this.renderFormControl} label={formatMessage(messages.carID)} />
                  <Field name="reviewContent" component={this.renderFormControlTextArea}  label={formatMessage(messages.reviewContentLabel)}/>
                  <Field name="rating" component={this.renderStarRating} label={formatMessage(messages.reviewRating)}  />
                  <FormGroup className={s.noMargin}>
                    <Row>
                      <Col xs={12} sm={12} md={12} lg={12} className={cx(cp.textAlignRight, 'textAlignLeftRTL')}>
                        <Button className={cx(cp.btnPrimary, cp.btnlarge)} type="submit" disabled={submitting}><FormattedMessage {...messages.submit} /></Button>
                      </Col>
                    </Row>
                  </FormGroup>
                </form>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }

}

AdminReviewsForm = reduxForm({
  form: 'AdminReviewsForm', // a unique name for this form
  validate
})(AdminReviewsForm);

export default compose(injectIntl, withStyles(s, cp), graphql(WriteAdminReviewMutation))(AdminReviewsForm);