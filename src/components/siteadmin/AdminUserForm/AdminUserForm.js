// General
import React, { Component } from 'react';
import {
  Button,
  FormGroup,
  FormControl,
} from 'react-bootstrap';

// Redux Form
import { Field, reduxForm, formValueSelector } from 'redux-form';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';

// Redux
import { connect } from 'react-redux';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './AdminUserForm.css';
import cp from '../../../components/commonStyle.css';

import validate from './validate';
import messages from '../../../locale/messages';
import { createAdminUser } from '../../../actions/siteadmin/AdminUser/manageAdminUser';

class AdminUserForm extends Component {

  static defaultProps = {
    roles: []
  };

  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  renderFormControl = ({ input, label, type, meta: { touched, error }, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <FormControl {...input} type={type} className={cx(className)} />
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
      </div>
    )
  }

  renderFormControlSelect = ({ input, label, meta: { touched, error }, children, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <FormControl componentClass="select" {...input} className={cx(className)} >
          {children}
        </FormControl>
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
      </div>
    )
  }

  async handleFormSubmit(values) {
    const { createAdminUser, paginationData } = this.props;
    const response = await createAdminUser(
      values.id,
      values.email,
      values.password,
      values.roleId
    );
    if (response && response.status === 200) {
      paginationData(1);
    }
  }

  render() {
    const { error, handleSubmit, submitting, id, roles } = this.props;
    const { formatMessage } = this.props.intl;
    return (
      <div className={cx(s.formMaxWidth, 'maxwidthcenter', 'empty', 'adminstyle')}>
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          {error && <strong>{formatMessage(error)}</strong>}
          <FormGroup className={s.space2}>
            <label className={cp.labelTextNew}><FormattedMessage {...messages.emailLabel} /></label>
            <Field
              name="email"
              type="text"
              component={this.renderFormControl}
              label={formatMessage(messages.emailLabel)}
              className={cp.formControlInput}
            />
          </FormGroup>
          <FormGroup className={s.space2}>
            <label className={cp.labelTextNew}><FormattedMessage {...messages.password} /></label>
            <Field
              name="password"
              type="password"
              component={this.renderFormControl}
              label={formatMessage(messages.password)}
              className={cp.formControlInput}
            />
            <p className={cx(s.userText, s.spaceTop1)}><FormattedMessage {...messages.adminUserDesc} /></p>
          </FormGroup>
          <FormGroup className={s.space3}>
            <label className={cp.labelTextNew}><FormattedMessage {...messages.roleLabel} /></label>
            <Field name="roleId" className={cx(s.formControlSelect, cp.formControlInput)}
              component={this.renderFormControlSelect}
            >
              <option value={''}>{formatMessage(messages.selectroleLabel)}</option>
              {
                roles && roles.results && roles.results.length > 0 && roles.results.map((item, key) => {
                  return (
                    <option value={item.id} key={key}>{item.name}</option>
                  )
                })
              }
            </Field>
          </FormGroup>
          <FormGroup className={s.space1}>
            <div className={cx(cp.textAlignRight, 'textAlignLeftRTL')}>
              <Button type="submit" disabled={submitting} className={cx(cp.btnPrimary, cp.btnlarge)}>
                {id ? <FormattedMessage {...messages.update} /> : <FormattedMessage {...messages.addLabel} />}
              </Button>
            </div>
          </FormGroup>
        </form>
      </div>
    )
  }

}

AdminUserForm = reduxForm({
  form: "AdminUserForm", // a unique name for this form
  validate,
})(AdminUserForm);

const selector = formValueSelector('AdminUserForm');

const mapState = (state) => ({
  id: selector(state, 'id')
});

const mapDispatch = {
  createAdminUser
};

export default injectIntl(withStyles(s, cp)(connect(mapState, mapDispatch)(AdminUserForm)));