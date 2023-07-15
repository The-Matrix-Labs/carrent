import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, reset } from 'redux-form';
import { graphql, gql, compose } from 'react-apollo';
import { toastr } from 'react-redux-toastr';
import { connect } from 'react-redux';

// Style
import {
  Button,
  FormGroup,
  Col,
  FormControl,
  Row
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ChangeAdminForm.css';
import cp from '../../../components/commonStyle.css';

import validate from './validate';
import { cpus } from 'os';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../locale/messages';

class ChangeAdminForm extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }

  renderFormControl = ({ input, label, type, meta: { touched, error }, className, note }) => {
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
            {
              note && <p className={s.userText}>{note}</p>
            }
          </Col>
        </Row>
      </FormGroup>
    );
  }

  async submitForm(values, dispatch) {
    const { mutate } = this.props;
    const { data } = await mutate({ variables: values });

    if (data && data.changeAdminUser) {
      if (data.changeAdminUser.status === '200') {
        toastr.success("Changed Successfully!", "Admin access details changed successfully!");
      } else if (data.changeAdminUser.status === 'email') {
        toastr.error("Failed to update!", "Oops! this email address is already exist.");
      } else {
        toastr.error("Failed to update!", "Your changes to admin access details is failed!");
      }
    }
    dispatch(reset('ChangeAdminForm'));
  }

  render() {

    const { error, handleSubmit, submitting, dispatch, title, isSuperAdmin } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <div className={cx(s.pagecontentWrapper, 'pagecontentWrapperRTL')}>
        <div>
          <h1 className={s.headerTitle}><FormattedMessage {...messages.changeAdminEmailPassword} /></h1>
          <Col xs={12} sm={12} md={8} lg={7} className={s.blockcenter}>
            <div className={s.panelHeader}>
              <form onSubmit={handleSubmit(this.submitForm)}>
                {error && <strong>{formatMessage(error)}</strong>}
                {isSuperAdmin && <Field name="email" type="text" component={this.renderFormControl}
                  label={formatMessage(messages.email)}
                  note={formatMessage(messages.changeAdminPasswordDesc)}
                />}
                <Field name="password" type="password" component={this.renderFormControl} label={formatMessage(messages.password)} />
                <Field name="confirmPassword" type="password" component={this.renderFormControl} label={formatMessage(messages.confirmPassword)} />
                <FormGroup className={s.noMargin}>
                  <Row>
                    <Col xs={12} sm={12} md={12} lg={12} className={cx(cp.textAlignRight, 'textAlignLeftRTL')}>
                      <Button className={cx(cp.btnPrimary, cpus.btnlarge)} type="submit" disabled={submitting} ><FormattedMessage {...messages.save} /></Button>
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

ChangeAdminForm = reduxForm({
  form: 'ChangeAdminForm', // a unique name for this form
  validate
})(ChangeAdminForm);


const mapState = (state) => ({
  isSuperAdmin: state.runtime.isSuperAdmin,
});

const mapDispatch = {};

export default compose(injectIntl,
  withStyles(s, cp),
  connect(mapState, mapDispatch),
  graphql(gql`
    mutation changeAdminUser($email: String, $password: String!) {
      changeAdminUser (email: $email, password: $password) {
        status
      }
    }
  `),
)(ChangeAdminForm);